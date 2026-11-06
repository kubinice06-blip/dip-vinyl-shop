// game-lab/tests/e2e.spec.mjs — 品味對決・試做版 Playwright 端到端測試（SPEC §8.3，14 個情境）。Agent D。
// 純 node 腳本（不用 @playwright/test）：node game-lab/tests/e2e.spec.mjs
//   環境變數：LAB_URL（預設 http://localhost:8765/game-lab/index.html）、LAB_SIZES（預設 "390x844,390x660"）、LAB_ONLY（例 "1,2,9"）、
//            LAB_NARROW（#4 的窄手機版面，預設 "375x667,360x740"；空字串＝不跑）
//   評審修正後加的：#4（窄手機：手牌列每張都在螢幕內）、#15（換面板防連點）、#16（標題推門不丟今晚、散場中重新整理不丟紀錄）
//   需要靜態伺服器：cd dip-vinyl-shop && python3 -m http.server 8765
// 每個情境印 PASS／FAIL；任何一個 FAIL → exit 1。
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch (_) { ({ chromium } = require('/opt/node-tools/node_modules/playwright')); }

const URL0 = process.env.LAB_URL || 'http://localhost:8765/game-lab/index.html';
const SIZES = (process.env.LAB_SIZES || '390x844,390x660').split(',').map(s => s.split('x').map(Number));
const NARROW = (process.env.LAB_NARROW != null ? process.env.LAB_NARROW : '375x667,360x740').split(',').filter(Boolean).map(s => s.split('x').map(Number));
const ONLY = process.env.LAB_ONLY ? new Set(process.env.LAB_ONLY.split(',').map(Number)) : null;
const SEED = '20261106';
const Q = (extra) => `${URL0}?debug=1&seed=${SEED}${extra === undefined ? '&fast=1' : extra}`;
const ALLOWED_LS = new Set(['dipGameLab_v1', 'dip:autoplay', 'dip:autoplay-consent', 'dipAutoplayHintSeen', 'dip:autoplay-hint']);
const results = [];
const sleep = ms => new Promise(r => setTimeout(r, ms));

function launch() {
  const o = { args: ['--autoplay-policy=no-user-gesture-required'] };
  if (process.env.HTTPS_PROXY) o.proxy = { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' };
  return chromium.launch(o);
}
async function newPage(browser, w, h, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, hasTouch: false });
  const page = await ctx.newPage();
  page._errors = []; page._requests = []; page._clicks = 0;
  page.on('console', m => { if (m.type() === 'error') page._errors.push(m.text()); });
  page.on('pageerror', e => page._errors.push('pageerror: ' + e.message));
  page.on('request', r => page._requests.push(r.url()));
  if (opts.watchStorage) {
    await page.addInitScript(() => {
      window.__lsKeys = [];
      const orig = Storage.prototype.setItem;
      Storage.prototype.setItem = function (k, v) { try { if (this === window.localStorage) window.__lsKeys.push(String(k)); } catch (_) {} return orig.call(this, k, v); };
    });
  }
  return { ctx, page };
}
function record(n, size, ok, detail) {
  results.push({ n, size, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  #${n} [${size}] ${detail}`);
}
const want = n => !ONLY || ONLY.has(n);

// ---- 共用步驟 ----------------------------------------------------------------
async function screen(page) { return page.evaluate(() => window.__lab ? window.__lab.screen() : null); }
async function clickCount(page, sel) { await page.click(sel); page._clicks++; }
// 序章：只在 ▼（選擇句）亮起時點；面板出現就照最少點擊作答；直到對決第一手可操作
async function prologueToDuel(page, marks = {}) {
  const t0 = marks.t0 || Date.now();
  for (let guard = 0; guard < 400; guard++) {
    const st = await page.evaluate(() => ({
      s: window.__lab && window.__lab.screen(),
      guess: !!document.querySelector('.lb-sheet.guess'), ace: !!document.querySelector('.lb-sheet.acepick'),
      menu: !!document.querySelector('.lb-dq.hasmenu .lb-dqopt'), next: !!document.querySelector('.lb-dq .nx.on.choice'),
      ready: !!(window.DipLabDuel && window.DipLabDuel.debug && window.DipLabDuel.debug() && window.DipLabDuel.debug().introDone && !window.DipLabDuel.api().busy() && document.querySelector('.dl-hand .dl-card'))
    }));
    if (st.s === 'duel' && st.ready) { marks.duelReady = Date.now() - t0; return true; }
    if (st.guess) { if (!marks.firstPanel) marks.firstPanel = Date.now() - t0; marks.panel = 'guess'; await clickCount(page, '.lb-sheet.guess .lb-ct >> nth=0'); await sleep(250); continue; }
    if (st.ace) { if (!marks.firstPanel) { marks.firstPanel = Date.now() - t0; marks.panel = 'acePick'; } await clickCount(page, '.lb-sheet.acepick [data-a=ok]'); await sleep(250); continue; }
    if (st.menu) { await clickCount(page, '.lb-dq .lb-dqopt >> nth=0'); await sleep(250); continue; }
    if (st.next && st.s === 'scene') { await clickCount(page, '.lb-dq'); await sleep(200); continue; }
    await sleep(120);
  }
  return false;
}
async function openAndPush(page, q) {
  const t0 = Date.now();
  await page.goto(q || Q(), { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[data-a=push]', { state: 'visible', timeout: 5000 });
  const titleMs = Date.now() - t0;
  await clickCount(page, '[data-a=push]');
  return { t0, titleMs };
}
// 等場景裡下一個 ▼ 或面板，必要時點 ▼
async function advanceUntil(page, pred, ms = 30000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (await page.evaluate(pred)) return true;
    const nx = await page.$('.lb-dq .nx.on.choice');
    if (nx && !(await page.$('.lb-dq.hasmenu'))) { try { await page.click('.lb-dq', { timeout: 1000 }); } catch (_) {} }
    await sleep(150);
  }
  return false;
}
async function duelReady(page, ms = 15000) {
  return page.waitForFunction(() => window.__lab && window.__lab.screen() === 'duel' && window.DipLabDuel && window.DipLabDuel.debug() && window.DipLabDuel.debug().introDone && !window.DipLabDuel.api().busy() && document.querySelector('.dl-hand .dl-card'), null, { timeout: ms }).then(() => true, () => false);
}
async function playHands(page, n) {
  for (let i = 0; i < n; i++) {
    const over = await page.evaluate(async () => {
      const api = window.DipLabDuel.api(); const d = window.__lab.rawDuel();
      if (!d || d.over) return true;
      const act = window.DipLabEngine.policies.ev(d);
      await api.play(act);
      return !!(window.__lab.rawDuel() && window.__lab.rawDuel().over);
    });
    if (over) return;
    await page.waitForFunction(() => !window.DipLabDuel.api() || !window.DipLabDuel.api().busy(), null, { timeout: 15000 }).catch(() => {});
  }
}

// ---- 情境 ----------------------------------------------------------------------
async function runSize(browser, [W, H]) {
  const size = `${W}x${H}`;
  // A：1、2、3、4、5、6、14、11、12、7（同一個分頁）
  {
    const { ctx, page } = await newPage(browser, W, H, { watchStorage: true });
    try {
      const { t0, titleMs } = await openAndPush(page);
      await sleep(50);
      if (want(1)) {
        const ov = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth }));
        record(1, size, titleMs <= 2000 && page._errors.length === 0 && ov.sw <= ov.iw, `title ${titleMs} ms, console errors ${page._errors.length}, scrollWidth ${ov.sw}/${ov.iw}`);
      }
      const marks = { t0 };
      const ok = await prologueToDuel(page, marks);
      if (want(2)) record(2, size, !!marks.firstPanel && marks.firstPanel <= 30000, `first panel (${marks.panel || 'none'}) at ${marks.firstPanel} ms`);
      if (want(3)) record(3, size, ok && marks.duelReady <= 90000 && page._clicks <= 10, `first hand operable at ${marks.duelReady} ms, clicks ${page._clicks}`);
      // 4：390×660 版面（兩種尺寸都量）
      if (want(4)) {
        await page.click('.dl-hand .dl-card[data-i="0"]');
        await page.waitForSelector('.dl-attrs .dl-ab', { timeout: 5000 });
        const r = await page.evaluate(() => {
          const sels = { record: '.dl-rec', disc: '.dl-disc', banner: '.dl-ban', ace: '.dl-hand .dl-ace', hand: '.dl-hand .dl-card:not(.dl-ace)', attrs: '.dl-attrs .dl-ab' };
          const out = {}; let maxB = 0, n = {};
          for (const k in sels) { const els = [...document.querySelectorAll(sels[k])]; n[k] = els.length; for (const e of els) { const b = e.getBoundingClientRect().bottom; out[k] = Math.max(out[k] || 0, Math.round(b)); maxB = Math.max(maxB, b); } }
          const sc = document.scrollingElement; const app = document.getElementById('app');
          return { out, n, maxB: Math.round(maxB), scroll: sc.scrollHeight > innerHeight + 1 || app.scrollHeight > app.clientHeight + 1, ih: innerHeight };
        });
        const ok4 = r.maxB <= r.ih && r.n.hand === 4 && r.n.attrs === 3 && r.n.ace === 1 && !r.scroll;
        record(4, size, ok4, `max bottom ${r.maxB} (limit ${r.ih}), counts ${JSON.stringify(r.n)}, scroll ${r.scroll}`);
        await page.click('.dl-hand .dl-card[data-i="0"]');   // 取消選取
        await sleep(200);
      }
      // 5：浮層不吃點擊（老闆提示泡泡顯示中點手牌）
      if (want(5)) {
        const bubble = await page.evaluate(() => { const b = document.querySelector('.dl-bub'); return b ? getComputedStyle(b).pointerEvents : null; });
        // 讓一個泡泡一定在畫面上：點選一張盤會觸發 h_forecast（第一次）或至少他的口頭禪泡泡在
        const anyBubble = await page.$('.dl-bub');
        await page.click('.dl-hand .dl-card[data-i="1"]', { timeout: 3000 });
        const sel = await page.evaluate(() => { const c = document.querySelector('.dl-hand .dl-card[data-i="1"]'); return !!c && c.classList.contains('sel'); });
        const pe = await page.evaluate(() => [...document.querySelectorAll('.dl-bub, .lb-say, .lb-stamp, .lb-toast, .dlfx-layer')].map(e => getComputedStyle(e).pointerEvents));
        record(5, size, sel && !!anyBubble && pe.every(x => x === 'none'), `bubble present ${!!anyBubble} (pointer-events ${bubble}), card selected ${sel}, overlay pointer-events ${JSON.stringify([...new Set(pe)])}`);
        await page.click('.dl-hand .dl-card[data-i="1"]'); await sleep(150);
      }
      // 6：字級與點擊區（對決＋場景＋地圖的 .key、所有可見按鈕）
      if (want(6)) {
        await page.click('.dl-hand .dl-card[data-i="0"]'); await sleep(250);
        const r = await measureKeys(page);
        await page.click('.dl-hand .dl-card[data-i="0"]'); await sleep(150);
        page._keys6 = r;
      }
      // 14：唱片資訊（長按手牌）
      if (want(14)) {
        const before = await page.evaluate(() => JSON.stringify(window.__lab.duel()));
        const box = await (await page.$('.dl-hand .dl-card[data-i="2"]')).boundingBox();
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down(); await sleep(650); await page.mouse.up();
        const m = await page.waitForSelector('.lb-modal .lb-info', { timeout: 3000 }).then(() => true, () => false);
        const info = m ? await page.evaluate(() => {
          const p = document.querySelector('.lb-modal .lb-info');
          return { cover: !!p.querySelector('.lb-cv img, .lb-cv .alt'), album: (p.querySelector('.meta .al') || {}).textContent || '', artist: (p.querySelector('.meta .ar') || {}).textContent || '',
            play: !!p.querySelector('[data-act=play]') || /沒有試聽/.test(p.textContent) };
        }) : null;
        if (m) { await page.click('.lb-modal [data-act=close]'); await sleep(250); }
        const after = await page.evaluate(() => ({ v: JSON.stringify(window.__lab.duel()), modal: !!document.querySelector('.lb-modal'), s: window.__lab.screen() }));
        const ok14 = m && info.cover && info.album && info.artist && info.play && !after.modal && after.s === 'duel' && after.v === before;
        record(14, size, !!ok14, `modal ${m}, ${info ? `cover ${info.cover}, 「${info.artist}《${info.album}》」, ▶ ${info.play}` : ''}; closed ${!after.modal}, state unchanged ${after.v === before}`);
      }
      // 7：序章打贏 → 押盤翻開 → 配件三選一 → 地圖
      if (want(7) || want(11) || want(12) || want(6)) {
        await page.evaluate(() => window.__lab.autoplay('ev'));
        const sawStake = await advanceUntil(page, () => !!document.querySelector('.lb-sheet.stake .card3d'), 30000);
        let sawRelic = false, map = false;
        if (sawStake) {
          await page.waitForSelector('.lb-sheet.stake [data-i="0"]:not([disabled])', { state: 'visible', timeout: 8000 }).catch(() => {});
          await sleep(300);
          await page.click('.lb-sheet.stake [data-i="0"]');
          sawRelic = await advanceUntil(page, () => !!document.querySelector('.lb-sheet.relics [data-r]'), 20000);
          if (sawRelic) {
            if (want(6)) page._keys6b = await measureKeys(page);
            await page.click('.lb-sheet.relics [data-r] >> nth=0');
            map = await advanceUntil(page, () => window.__lab.screen() === 'map' && !!document.querySelector('.lb-node.can'), 20000);
          }
        }
        if (want(7)) record(7, size, sawStake && sawRelic && map, `stake flip ${sawStake}, relic pick ${sawRelic}, map ${map}`);
        if (want(6)) {
          if (map) page._keys6c = await measureKeys(page);
          const all = [page._keys6, page._keys6b, page._keys6c].filter(Boolean);
          const small = all.flatMap(x => x.small), tiny = all.flatMap(x => x.tiny);
          const nKeys = all.reduce((a, x) => a + x.nKeys, 0), nBtn = all.reduce((a, x) => a + x.nBtn, 0);
          record(6, size, nKeys > 0 && small.length === 0 && tiny.length === 0, `.key checked ${nKeys}, <12px ${small.length} ${JSON.stringify(small.slice(0, 4))}; buttons checked ${nBtn}, <44px ${tiny.length} ${JSON.stringify(tiny.slice(0, 6))}`);
        }
      }
      if (want(11)) {
        const keys = await page.evaluate(() => ({ set: [...new Set(window.__lsKeys || [])], all: Object.keys(localStorage) }));
        const bad = keys.set.filter(k => !ALLOWED_LS.has(k)).concat(keys.all.filter(k => k === 'dipRogueMeta_v2' || /^dipRogueMeta/.test(k)));
        record(11, size, keys.set.includes('dipGameLab_v1') && bad.length === 0, `setItem keys ${JSON.stringify(keys.set)}; disallowed ${JSON.stringify(bad)}`);
      }
      if (want(12)) {
        const bad = page._requests.filter(u => /firestore\.googleapis\.com|firebase|gstatic\.com\/firebasejs|\/data\/apple-audio-runtime/.test(u));
        record(12, size, bad.length === 0, `${page._requests.length} requests; forbidden ${bad.length} ${JSON.stringify(bad.slice(0, 3))}`);
      }
    } catch (e) { record(0, size, false, 'flow A crashed: ' + e.message.split('\n')[0]); }
    await ctx.close();
  }
  // B：8 序章打輸 → 「……再一場。」→ 重打可操作
  if (want(8)) {
    const { ctx, page } = await newPage(browser, W, H);
    try {
      await openAndPush(page);
      await prologueToDuel(page, {});
      await page.evaluate(() => window.__lab.forceLose());
      const said = await page.waitForFunction(() => /……再一場。/.test((document.querySelector('.lb-dq .tx') || {}).textContent || ''), null, { timeout: 8000 }).then(() => true, () => false);
      const t1 = Date.now();
      const ready = await duelReady(page, 12000);
      const v = ready ? await page.evaluate(() => window.__lab.duel()) : null;
      record(8, size, said && ready && v && v.hand === 1 && v.p.hp === v.p.maxHp, `「……再一場。」 ${said}; duel operable again ${ready} after ${Date.now() - t1} ms; hand ${v && v.hand}, hp ${v && v.p.hp}/${v && v.p.maxHp}`);
    } catch (e) { record(8, size, false, 'crashed: ' + e.message.split('\n')[0]); }
    await ctx.close();
  }
  // C：9 一整晚（autoplay 到 end，console 0 error）＋ 動畫時間（?fast=0 抽 5 手）
  if (want(9) || want(13)) {
    const { ctx, page } = await newPage(browser, W, H);
    try {
      await openAndPush(page);
      await page.evaluate(() => window.__lab.autoplay('ev', { until: 'end' }));
      const end = await page.waitForFunction(() => window.__lab.screen() === 'end', null, { timeout: 180000 }).then(() => true, () => false);
      const info = await page.evaluate(() => ({ over: window.__lab.run && window.__lab.run.over, trail: window.__lab.trail().filter((x, i, a) => a[i - 1] !== x).join('>') }));
      const errs9 = page._errors.slice();
      let ms = [];
      if (want(9)) {
        const { ctx: c2, page: p2 } = await newPage(browser, W, H);
        await openAndPush(p2, Q('&fast=0'));
        await p2.evaluate(() => window.__lab.autoplay('ev', { until: 'duel' }));
        if (await duelReady(p2, 90000)) {
          for (let i = 0; i < 5; i++) {
            const r = await p2.evaluate(async () => {
              const d = window.__lab.rawDuel(); if (!d || d.over) return null;
              const api = window.DipLabDuel.api(); const t = performance.now();
              await api.play(window.DipLabEngine.policies.ev(d));
              const dbg = window.DipLabDuel.debug();
              return { ms: dbg && dbg.ms != null ? dbg.ms : performance.now() - t, over: !!(window.__lab.rawDuel() && window.__lab.rawDuel().over) };
            });
            if (!r) break; ms.push(Math.round(r.ms)); if (r.over) break;
            await p2.waitForFunction(() => window.DipLabDuel.api() && !window.DipLabDuel.api().busy(), null, { timeout: 10000 }).catch(() => {});
          }
        }
        errs9.push(...p2._errors);
        await c2.close();
        const okAnim = ms.length >= 3 && ms.every(x => x <= 2300);
        record(9, size, end && errs9.length === 0 && okAnim, `night to end ${end} (${info.over}); console errors ${errs9.length} ${JSON.stringify(errs9.slice(0, 2))}; anim ms ${JSON.stringify(ms)}`);
      }
      // 13：再來一夜 ≤10 秒到地圖 c1 可點
      if (want(13) && end) {
        await page.waitForSelector('[data-a=again]', { timeout: 5000 });
        const t1 = Date.now();
        await page.click('[data-a=again]');
        await page.waitForSelector('.lb-sheet.acepick [data-a=ok]', { timeout: 10000 });
        await page.click('.lb-sheet.acepick [data-a=ok]');
        const ok = await page.waitForFunction(() => window.__lab.screen() === 'map' && window.__lab.run && window.__lab.run.col === 1 && !!document.querySelector('.lb-node.can'), null, { timeout: 10000 }).then(() => true, () => false);
        const dt = Date.now() - t1;
        const nn = await page.evaluate(() => window.__lab.run && window.__lab.run.nightNo);
        record(13, size, ok && dt <= 10000, `map c1 clickable ${ok} in ${dt} ms (night #${nn})`);
      } else if (want(13)) record(13, size, false, 'never reached end screen');
    } catch (e) { record(9, size, false, 'crashed: ' + e.message.split('\n')[0]); }
    await ctx.close();
  }
  // D：10 續玩（對決中重新整理 → 繼續今晚 → view 相同）
  if (want(10)) {
    const { ctx, page } = await newPage(browser, W, H);
    try {
      await openAndPush(page);
      await prologueToDuel(page, {});
      await playHands(page, 2);
      await page.waitForFunction(() => !window.DipLabDuel.api().busy(), null, { timeout: 10000 });
      const before = await page.evaluate(() => JSON.stringify(window.__lab.duel()));
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForSelector('[data-a=cont]', { timeout: 5000 });
      await page.click('[data-a=cont]');
      const ready = await duelReady(page, 15000);
      const after = ready ? await page.evaluate(() => JSON.stringify(window.__lab.duel())) : null;
      const h = before && JSON.parse(before).hand;
      record(10, size, ready && after === before, `resumed ${ready}; view identical ${after === before} (hand ${h})`);
    } catch (e) { record(10, size, false, 'crashed: ' + e.message.split('\n')[0]); }
    await ctx.close();
  }
  // E：15 換面板防連點（挖箱：點箱子連點兩下，第二下不會直接拿走沒看過的那張）、16 標題推門不丟今晚＋散場中重新整理不丟紀錄
  if (want(15) || want(16)) {
    const { ctx, page } = await newPage(browser, W, H);
    try {
      await page.goto(Q(), { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('[data-a=quiet]', { timeout: 5000 });
      await page.click('[data-a=quiet]');
      await page.evaluate(() => window.__lab.autoplay('ev', { until: 'map' }));
      await page.waitForFunction(() => window.__lab.screen() === 'map' && window.DipLabEngine.nextStep(window.__lab.run) === 'move', null, { timeout: 60000 });
      await page.evaluate(() => window.__lab.stop()); await sleep(300);
      if (want(15)) {
        await page.evaluate(() => window.__lab.skipTo(2)); await sleep(400);
        await page.click('.lb-node[data-n="c2a"]'); await page.click('.lb-sheet.preview [data-a=go]');
        await page.waitForSelector('.lb-sheet.crate [data-k="tw"]', { timeout: 5000 }); await sleep(450);
        const d0 = await page.evaluate(() => window.__lab.run.deck.length);
        const box = await page.evaluate(() => { const b = document.querySelector('.lb-sheet.crate [data-k="tw"]').getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; });
        await page.mouse.click(box.x, box.y); await sleep(90); await page.mouse.click(box.x, box.y); await sleep(600);
        const r = await page.evaluate(() => ({ deck: window.__lab.run.deck.length, step: window.DipLabEngine.nextStep(window.__lab.run), sheet: !!document.querySelector('.lb-sheet.cratecard') }));
        record(15, size, r.deck === d0 && r.step === 'crateCard' && r.sheet, `crate double-tap: deck ${d0}→${r.deck}, step ${r.step}, cards shown ${r.sheet}`);
        await page.click('.lb-sheet.cratecard [data-a=none]'); await page.waitForSelector('.lb-sheet.done [data-a=next]'); await sleep(450);
        await page.click('.lb-sheet.done [data-a=next]');
        await page.waitForFunction(() => window.__lab.screen() === 'map', null, { timeout: 5000 }); await sleep(300);
      }
      if (want(16)) {
        await page.click('.lb-top [aria-label=暫停選單]'); await page.click('.lb-modal [data-a=title]');
        await page.waitForSelector('[data-a=cont]', { timeout: 5000 });
        await page.click('[data-a=push]'); await sleep(300);
        const kept = await page.evaluate(() => ({ s: window.__lab.screen(), run: !!(window.__lab.run && !window.__lab.run.over) }));
        await page.click('[data-a=cont]');
        await page.waitForFunction(() => window.__lab.screen() === 'map', null, { timeout: 5000 }); await sleep(300);
        const fight = await page.evaluate(() => { const r = window.__lab.run; const c = r.map.cols.find(x => x.col === r.col); const n = c && c.nodes.find(x => x.enemyId && x.type !== 'boss'); return n ? n.id : null; });
        if (!fight) await page.evaluate(() => window.__lab.skipTo(3));
        const fid = fight || 'c3a';
        await sleep(300);
        await page.click(`.lb-node[data-n="${fid}"]`); await page.click('.lb-sheet.preview [data-a=go]');
        await page.waitForFunction(() => window.__lab.screen() === 'duel', null, { timeout: 10000 }); await sleep(800);
        await page.evaluate(() => window.__lab.forceLose());
        await page.waitForFunction(() => window.__lab.screen() === 'scene', null, { timeout: 5000 }); await sleep(300);
        await page.reload({ waitUntil: 'domcontentloaded' }); await page.waitForSelector('[data-a=push]', { timeout: 5000 });
        const rec = await page.evaluate(() => ({ nights: window.__lab.save.nights.length, cont: !!document.querySelector('[data-a=cont]'), end: !!document.querySelector('[data-a=end]') }));
        record(16, size, kept.s === 'title' && kept.run && rec.nights === 1 && !rec.cont && rec.end, `推門 once keeps the run ${kept.run}; reload in the 散場 scene → nights ${rec.nights}, 看今晚結算 ${rec.end}`);
      }
      if (page._errors.length) record(15, size, false, 'console errors ' + JSON.stringify(page._errors.slice(0, 2)));
    } catch (e) { record(want(15) ? 15 : 16, size, false, 'crashed: ' + e.message.split('\n')[0]); }
    await ctx.close();
  }
}
// 窄手機（375、360）：只量 #4 版面，加上「手牌列每張盤都在螢幕內」
async function narrowSize(browser, [W, H]) {
  const size = `${W}x${H}`;
  const { ctx, page } = await newPage(browser, W, H);
  try {
    await openAndPush(page);
    const ok = await prologueToDuel(page, {});
    await page.click('.dl-hand .dl-card[data-i="0"]');
    await page.waitForSelector('.dl-attrs .dl-ab', { timeout: 5000 });
    const r = await page.evaluate(() => {
      const iw = innerWidth, ih = innerHeight;
      const cards = [...document.querySelectorAll('.dl-hand .dl-card')].map(e => e.getBoundingClientRect());
      const sels = ['.dl-rec', '.dl-disc', '.dl-ban', '.dl-hand .dl-card', '.dl-attrs .dl-ab'];
      let maxB = 0; for (const s of sels) for (const e of document.querySelectorAll(s)) maxB = Math.max(maxB, e.getBoundingClientRect().bottom);
      return { n: cards.length, maxR: Math.round(Math.max(...cards.map(c => c.right))), minL: Math.round(Math.min(...cards.map(c => c.left))), maxB: Math.round(maxB), iw, ih, sw: document.documentElement.scrollWidth };
    });
    record(4, size, ok && r.n >= 4 && r.maxR <= r.iw && r.minL >= 0 && r.maxB <= r.ih && r.sw <= r.iw, `narrow: ${r.n} cards, right ${r.maxR}/${r.iw}, bottom ${r.maxB}/${r.ih}, scrollWidth ${r.sw}`);
  } catch (e) { record(4, size, false, 'crashed: ' + e.message.split('\n')[0]); }
  await ctx.close();
}
async function measureKeys(page) {
  return page.evaluate(() => {
    const vis = e => { const r = e.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false; const s = getComputedStyle(e); return s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.05; };
    const small = [], tiny = [];
    const keys = [...document.querySelectorAll('.key')].filter(vis);
    for (const e of keys) { const fs = parseFloat(getComputedStyle(e).fontSize); if (fs < 12) small.push((e.className || e.tagName) + ':' + fs); }
    const btns = [...document.querySelectorAll('#app button, .lb-modal button, [role=button]')].filter(vis);
    for (const b of btns) { const r = b.getBoundingClientRect(); if (r.width < 43.5 || r.height < 43.5) tiny.push((b.className || b.tagName).toString().slice(0, 30) + ':' + Math.round(r.width) + 'x' + Math.round(r.height)); }
    return { nKeys: keys.length, nBtn: btns.length, small, tiny, screen: window.__lab && window.__lab.screen() };
  });
}

(async () => {
  const browser = await launch();
  const t0 = Date.now();
  for (const s of SIZES) await runSize(browser, s);
  if (want(4)) for (const s of NARROW) await narrowSize(browser, s);
  await browser.close();
  const fail = results.filter(r => !r.ok);
  console.log(`\n${results.length - fail.length}/${results.length} passed in ${Math.round((Date.now() - t0) / 1000)} s`);
  if (fail.length) { console.log('FAILED:', fail.map(f => `#${f.n}[${f.size}]`).join(' ')); process.exitCode = 1; }
})().catch(e => { console.error(e); process.exit(1); });
