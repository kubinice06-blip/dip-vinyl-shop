// game-lab/tests/e2e.spec.mjs — 品味對決 v2 Playwright 端到端測試（SPEC-v2 §9.3：#1–#16 保留＋#17–#29 新增）。Agent U。
// 純 node 腳本（不用 @playwright/test）：node game-lab/tests/e2e.spec.mjs
//   需要靜態伺服器：cd dip-vinyl-shop && python3 -m http.server 8765
//   環境變數：LAB_URL（預設 http://localhost:8765/game-lab/index.html）
//            LAB_SIZES（預設 "390x664,375x548,360x640,390x844"）：手機情境（hasTouch、isMobile、DPR 1）
//            LAB_ONLY（例 "1,17,22"）：只跑這幾個
//            LAB_FULL=1：每個尺寸都跑全部情境（預設：版面相關的 #1 #3 #4 #6 #17 #22 #24 #27 #29 四個尺寸都跑，
//                       其餘流程情境只在第一個尺寸跑；它們跟尺寸無關，省時間）
// 每個情境印 PASS／FAIL；任何一個 FAIL → exit 1。只有 Chromium（沒有 WebKit）：WebKit 的風險用 DOM 斷言守（#23 #24 #25）。
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch (_) { ({ chromium } = require('/opt/node-tools/node_modules/playwright')); }

const URL0 = process.env.LAB_URL || 'http://localhost:8765/game-lab/index.html';
const SIZES = (process.env.LAB_SIZES || '390x664,375x548,360x640,390x844').split(',').filter(Boolean).map(s => s.split('x').map(Number));
const ONLY = process.env.LAB_ONLY ? new Set(process.env.LAB_ONLY.split(',').map(Number)) : null;
const FULL = process.env.LAB_FULL === '1';
const LAYOUT = new Set([1, 3, 4, 6, 17, 22, 24, 27, 29]);
const SEED = '20261106';
const Q = extra => `${URL0}?debug=1&seed=${SEED}${extra === undefined ? '&fast=1' : extra}`;
const ALLOWED_LS = new Set(['dipGameLab_v1', 'dip:autoplay', 'dip:autoplay-consent', 'dipAutoplayHintSeen', 'dip:autoplay-hint']);
const results = [];
const sleep = ms => new Promise(r => setTimeout(r, ms));

function launch() {
  const o = { args: ['--autoplay-policy=no-user-gesture-required'] };
  if (process.env.HTTPS_PROXY) o.proxy = { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' };
  return chromium.launch(o);
}
async function newPage(browser, w, h, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, hasTouch: true, isMobile: true });
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
let FIRST = true;
const want = n => (!ONLY || ONLY.has(n)) && (FULL || FIRST || LAYOUT.has(n));
const wantAny = (...ns) => ns.some(want);

// ---- 共用步驟 ----------------------------------------------------------------
const screen = page => page.evaluate(() => window.__lab ? window.__lab.screen() : null);
async function clickCount(page, sel) { await page.click(sel); page._clicks++; }
// el.click()（不用 page.tap：Playwright 會自動捲動，掩蓋版面問題）
const jsClick = (page, sel) => page.evaluate(s => { const e = document.querySelector(s); if (!e) return false; e.click(); return true; }, sel);
async function duelReady(page, ms = 20000) {
  return page.waitForFunction(() => {
    const D = window.DipLabDuel; if (!window.__lab || window.__lab.screen() !== 'duel' || !D || !D.debug || !D.api()) return false;
    const d = D.debug(); return d && d.enterDone && !D.api().busy() && d.phase === 'choose' && !!document.querySelector('[data-tut=hand] .tile');
  }, null, { timeout: ms }).then(() => true, () => false);
}
// 序章：▼（選擇句）亮才點；面板出現就照最少點擊作答；開打選「直接開打（我會玩）」（mode 'tut'＝帶教學）
async function prologueToDuel(page, marks = {}, mode = 'direct') {
  const t0 = marks.t0 || Date.now();
  for (let guard = 0; guard < 600; guard++) {
    const st = await page.evaluate(() => ({
      s: window.__lab && window.__lab.screen(),
      guess: !!document.querySelector('.lb-sheet.guess [data-pick]'), ace: !!document.querySelector('.lb-sheet.acepick [data-a=ok]'),
      menu: document.querySelectorAll('.lb-dq.hasmenu .lb-dqopt').length, next: !!document.querySelector('.lb-dq .nx.on.choice'),
      duel: window.__lab && window.__lab.screen() === 'duel'
    }));
    if (st.duel) { const ok = mode === 'tut' ? true : await duelReady(page); marks.duelReady = Date.now() - t0; return ok; }
    if (st.guess) { if (!marks.firstPanel) { marks.firstPanel = Date.now() - t0; marks.panel = 'guess'; } await sleep(420); await clickCount(page, '.lb-sheet.guess [data-pick] >> nth=0'); await sleep(250); continue; }
    if (st.ace) {
      if (!marks.firstPanel) { marks.firstPanel = Date.now() - t0; marks.panel = 'acePick'; }
      await sleep(420);
      if (marks.tier) { const t = await page.$(`.lb-sheet.acepick .lb-ct[data-tier="${marks.tier}"] .ar, .lb-sheet.acepick .lb-ct[data-tier="${marks.tier}"] .acex`); if (t) { await t.click(); page._clicks++; await sleep(150); } }
      await clickCount(page, '.lb-sheet.acepick [data-a=ok]'); await sleep(250); continue;
    }
    if (st.menu) {
      await sleep(420);
      const pickDirect = st.menu > 1 && mode !== 'tut';
      await clickCount(page, `.lb-dq .lb-dqopt[data-i="${pickDirect ? 1 : 0}"]`); await sleep(250); continue;
    }
    if (st.next && st.s === 'scene') { await clickCount(page, '.lb-dq'); await sleep(200); continue; }
    await sleep(120);
  }
  return false;
}
async function openAndPush(page, q, which = 'push') {
  const t0 = Date.now();
  await page.goto(q || Q(), { waitUntil: 'domcontentloaded' });
  await page.waitForSelector(`[data-a=${which}]`, { state: 'visible', timeout: 5000 });
  const titleMs = Date.now() - t0;
  await sleep(150);
  await clickCount(page, `[data-a=${which}]`);
  return { t0, titleMs };
}
// 場景裡：▼ 亮就點，直到條件成立
async function advanceUntil(page, pred, ms = 40000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (await page.evaluate(pred)) return true;
    const nx = await page.$('.lb-dq .nx.on');
    if (nx && !(await page.$('.lb-dq.hasmenu'))) { try { await page.click('.lb-dq', { timeout: 1000 }); } catch (_) {} }
    await sleep(150);
  }
  return false;
}
async function playHand(page) {
  return page.evaluate(async () => {
    const api = window.DipLabDuel.api(); const d = window.__lab.rawDuel();
    if (!d || d.over) return true;
    await api.play(window.DipLabEngine.policies.ev(d));
    return !!(window.__lab.rawDuel() && window.__lab.rawDuel().over);
  });
}
const waitIdle = page => page.waitForFunction(() => !window.DipLabDuel.api() || (!window.DipLabDuel.api().busy() && window.DipLabDuel.debug().phase !== 'resolve'), null, { timeout: 15000 }).catch(() => {});
// 第一次進地圖的軟提示（tutorial.js firstTime 'map'，兩句、點一下換句）：點舞台左上角的牆收掉
async function dismissSoft(page) {
  for (let i = 0; i < 4; i++) {
    const soft = await page.evaluate(() => !!(window.DipLabTut && window.DipLabTut.debug && window.DipLabTut.debug().soft));
    if (!soft) return;
    await page.mouse.click(8, 40); await sleep(350);
  }
}
async function infoCheck(page) {
  const ok = await page.waitForSelector('#cardInfoMask', { timeout: 3000 }).then(() => true, () => false);
  if (!ok) return { ok: false };
  await sleep(250);
  const r = await page.evaluate(() => {
    const m = document.getElementById('cardInfoMask'), b = document.getElementById('ciClose').getBoundingClientRect();
    return { lab: (m.querySelector('.lab') || {}).textContent, rows: m.querySelectorAll('.stats .st').length, closeIn: b.top >= 0 && b.bottom <= innerHeight + 0.5,
      cover: !!m.querySelector('.cov'), album: (m.querySelector('.al') || {}).textContent || '', artist: (m.querySelector('.ar') || {}).textContent || '',
      player: !!m.querySelector('.lb-mini-player') || /沒有試聽/.test(m.textContent) };
  });
  await page.click('#ciClose'); await sleep(300);
  const closed = !(await page.$('#cardInfoMask'));
  return Object.assign(r, { ok: r.lab === '唱片資訊' && r.rows === 3 && r.closeIn && closed && r.cover && !!r.album });
}
// 按鈕斷行（#24）：每顆可見按鈕逐字量行；不准行尾是「（」「「」、不准整行只剩「）」「」」、不准 keep-all
async function lineBreaks(page) {
  return page.evaluate(() => {
    const bad = [];
    const btns = [...document.querySelectorAll('button, .lb-btn, [role=button]')].filter(b => { const r = b.getBoundingClientRect(); const s = getComputedStyle(b); return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none'; });
    for (const b of btns) {
      if (getComputedStyle(b).wordBreak === 'keep-all') bad.push('keep-all:' + b.textContent.trim().slice(0, 12));
      const lines = []; let cur = null;
      const walker = document.createTreeWalker(b, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) {
        const t = n.textContent;
        for (let i = 0; i < t.length; i++) {
          if (!t[i].trim()) continue;
          const rg = document.createRange(); rg.setStart(n, i); rg.setEnd(n, i + 1);
          const rc = rg.getClientRects()[0]; if (!rc || !rc.width) continue;
          const top = Math.round(rc.top);
          if (!cur || Math.abs(top - cur.top) > rc.height * 0.6) { cur = { top, s: '' }; lines.push(cur); }
          cur.s += t[i];
        }
      }
      // 同一顆鈕裡分成標籤＋副標兩段：各自一行，不算斷行
      lines.forEach((l, k) => {
        if (k < lines.length - 1 && /[（「]$/.test(l.s)) bad.push('ends「' + l.s + '」');
        if (/^[）」]+$/.test(l.s)) bad.push('orphan「' + l.s + '」');
      });
    }
    return { n: btns.length, bad };
  });
}

// ---- 情境 ----------------------------------------------------------------------
async function runSize(browser, [W, H]) {
  const size = `${W}x${H}`;
  // A：1、2、3、4、5、6、14、17、18（對決部分）、22、7、23、24、18（押盤）、11、12（同一個分頁）
  if (wantAny(1, 2, 3, 4, 5, 6, 7, 11, 12, 14, 17, 18, 22, 23, 24)) {
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
      if (want(3)) record(3, size, ok && marks.duelReady <= 90000 && page._clicks <= 12, `first hand operable at ${marks.duelReady} ms, clicks ${page._clicks}`);
      // 4：選一張盤後：手牌 4＋王牌、屬性鈕 3 顆、全部在畫面內、不捲動
      if (want(4)) {
        await jsClick(page, '[data-tut=hand-0]');
        await page.waitForSelector('[data-tut=attrs] .ab[data-a]', { timeout: 5000 }).catch(() => {});
        const r = await page.evaluate(() => {
          const n = { hand: document.querySelectorAll('[data-tut=hand] .tile:not([data-tut=hand-ace])').length, ace: document.querySelectorAll('[data-tut=hand-ace]').length, attrs: document.querySelectorAll('[data-tut=attrs] .ab[data-a]').length };
          let maxB = 0; for (const s of ['[data-tut=e-rec]', '[data-tut=e-intent]', '[data-tut=result]', '[data-tut=hand] .tile', '[data-tut=attrs] .ab']) for (const e of document.querySelectorAll(s)) maxB = Math.max(maxB, e.getBoundingClientRect().bottom);
          const tiles = [...document.querySelectorAll('[data-tut=hand] .tile')].map(e => e.getBoundingClientRect());
          const app = document.getElementById('app');
          return { n, maxB: Math.round(maxB), ih: innerHeight, maxR: Math.round(Math.max(...tiles.map(t => t.right))), minL: Math.round(Math.min(...tiles.map(t => t.left))), iw: innerWidth,
            scroll: document.scrollingElement.scrollHeight > innerHeight + 1 || app.scrollHeight > app.clientHeight + 1 };
        });
        const ok4 = r.maxB <= r.ih && r.n.hand === 4 && r.n.attrs === 3 && r.n.ace === 1 && !r.scroll && r.maxR <= r.iw && r.minL >= 0;
        record(4, size, ok4, `max bottom ${r.maxB}/${r.ih}, hand right ${r.maxR}/${r.iw}, counts ${JSON.stringify(r.n)}, scroll ${r.scroll}`);
        await page.evaluate(() => window.DipLabDuel.select(null)); await sleep(200);   // 再點一下＝唱片資訊（B09），取消選取用 API
      }
      // 5：浮層不吃點擊（舞台名牌、泡泡、飄字、吐司、fx 層）
      if (want(5)) {
        await page.evaluate(() => { const s = window.__lab.stage; if (s) s.say('f', '「測試泡泡」', { ms: 3000 }); });
        await sleep(120);
        await page.click('[data-tut=hand-1]', { timeout: 3000 });
        const sel = await page.evaluate(() => { const c = document.querySelector('[data-tut=hand-1]'); return !!c && c.classList.contains('sel'); });
        const pe = await page.evaluate(() => [...document.querySelectorAll('.ds-say, .ds-tag, .ds-float, .ds-label, .ds-opt, .lb-toast, .dlfx-layer, .lb-plate, .lb-fly')].map(e => getComputedStyle(e).pointerEvents));
        record(5, size, sel && pe.length > 0 && pe.every(x => x === 'none'), `card selected ${sel}; overlays ${pe.length} pointer-events ${JSON.stringify([...new Set(pe)])}`);
        await page.evaluate(() => window.DipLabDuel.select(null)); await sleep(150);
      }
      // 6：字級（.key ≥12px）與點擊區（面板與彈窗的按鈕 ≥44；頂欄用 ::after 撐高、對決盤面 D 自管，不量）
      if (want(6)) page._keys6 = await measureKeys(page);
      // 14：唱片資訊（長按手牌）：封面、藝人、專輯、唱機；關掉後對決狀態不變
      if (want(14)) {
        const before = await page.evaluate(() => JSON.stringify(window.__lab.duel()));
        const box = await (await page.$('[data-tut=hand-2]')).boundingBox();
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 3);
        await page.mouse.down(); await sleep(650); await page.mouse.up();
        const info = await infoCheck(page);
        const after = await page.evaluate(() => ({ v: JSON.stringify(window.__lab.duel()), s: window.__lab.screen() }));
        record(14, size, info.ok && info.player && after.s === 'duel' && after.v === before, `info ${info.ok} 「${info.artist}《${info.album}》」 player ${info.player}; state unchanged ${after.v === before}`);
      }
      // 18（對決）：他拿出的盤、手牌第二下 → 唱片資訊
      const info18 = {};
      if (want(18)) {
        await jsClick(page, '[data-tut=e-rec] .cvb'); info18.erec = (await infoCheck(page)).ok;
        await jsClick(page, '[data-tut=hand-0]'); await sleep(250); await jsClick(page, '[data-tut=hand-0]'); info18.hand2 = (await infoCheck(page)).ok;
        await page.evaluate(() => window.DipLabDuel.select(null)); await sleep(200);
      }
      // 17、22：打三手，每手都量
      const r17 = { hands: 0, bad: [] }, r22 = { checks: 0, bad: [] };
      const measure22 = async ph => {
        const m = await page.evaluate(() => { const a = document.querySelector('[data-tut=attrs]'); const b = a ? a.getBoundingClientRect().bottom : 0; return { b: Math.round(b), ih: innerHeight, sw: document.documentElement.scrollWidth, iw: innerWidth }; });
        r22.checks++; if (m.b > m.ih || m.sw > m.iw) r22.bad.push(`${ph}:${m.b}/${m.ih},${m.sw}/${m.iw}`);
      };
      if (wantAny(17, 22, 18)) {
        for (let k = 0; k < 3; k++) {
          await measure22('choose');
          const act = await page.evaluate(() => window.DipLabEngine.policies.ev(window.__lab.rawDuel()));
          if (act.type === 'card') {
            await page.evaluate(i => window.DipLabDuel.select(i), act.i); await sleep(250); await measure22('attr');
          }
          const pr = page.evaluate(a => window.DipLabDuel.api().play(a), act);
          await sleep(400); await measure22('resolve');
          await pr;
          await page.waitForFunction(() => window.DipLabDuel.debug().phase !== 'resolve', null, { timeout: 10000 }).catch(() => {});
          await measure22('result');
          const s = await page.evaluate(() => {
            const D = window.DipLabDuel.debug(); const tags = [...document.querySelectorAll('.ds-tag')].map(t => ({ p: t.classList.contains('p'), x: t.getBoundingClientRect().left, txt: t.textContent }));
            const e = document.querySelector('[data-tut=slot-e]'), p = document.querySelector('[data-tut=slot-p]');
            return { over: !!(window.__lab.rawDuel() || {}).over, e: D.slots.e, p: D.slots.p, eImg: !!(e && e.querySelector('img.cv, .ultbox, .cv')), pImg: !!(p && p.querySelector('img.cv, .ultbox, .cv')), tags };
          });
          if (s.over) break;
          r17.hands++;
          const tagE = s.tags.find(t => !t.p), tagP = s.tags.find(t => t.p);
          if (!s.eImg || !s.pImg) r17.bad.push(`h${k + 1}:cover`);
          if (!/^他・/.test(s.e.who || '') || !/^你・/.test(s.p.who || '')) r17.bad.push(`h${k + 1}:who ${s.e.who}/${s.p.who}`);
          if (!s.e.badge || !s.p.badge) r17.bad.push(`h${k + 1}:badge`);
          if (!tagE || !tagP || !(tagP.x > tagE.x) || tagP.txt.trim() !== '你') r17.bad.push(`h${k + 1}:tags ${JSON.stringify(s.tags)}`);
          await duelReady(page, 8000);
          const kept = await page.evaluate(() => { const D = window.DipLabDuel.debug(); return { e: D.slots.e, p: D.slots.p }; });
          if (!kept.e.card || !kept.p.card || !kept.e.dim || !kept.p.dim) r17.bad.push(`h${k + 1}:kept ${JSON.stringify(kept)}`);
          if (want(18) && k === 0) {
            await jsClick(page, '[data-tut=slot-e]'); info18.slotE = (await infoCheck(page)).ok;
            await jsClick(page, '[data-tut=slot-p]'); info18.slotP = (await infoCheck(page)).ok;
            const box = await (await page.$('[data-tut=hand-1]')).boundingBox();
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 3); await page.mouse.down(); await sleep(650); await page.mouse.up();
            info18.long = (await infoCheck(page)).ok;
            const rack = await page.evaluate(() => { const h = (window.__lab.stage.hotspots() || []).find(x => /^rack:/.test(x.id)); return h ? h.id : null; });
            if (rack) { await page.evaluate(id => window.__lab.stage.tap(id), rack); info18.wall = (await infoCheck(page)).ok; } else info18.wall = 'n/a (no wall record in strip)';
          }
        }
        if (want(17)) record(17, size, r17.hands >= 2 && !r17.bad.length, `hands checked ${r17.hands}; problems ${JSON.stringify(r17.bad)}`);
        if (want(22)) record(22, size, r22.checks >= 8 && !r22.bad.length, `phases checked ${r22.checks}; overflow ${JSON.stringify(r22.bad)}`);
      }
      // 7：序章打贏 → 押盤翻開 → 配件三選一 → 地圖
      if (wantAny(7, 6, 11, 12, 18, 23, 24)) {
        await page.evaluate(() => window.__lab.autoplay('ev', { until: 'duelEnd' }));
        const sawStake = await advanceUntil(page, () => !!document.querySelector('.lb-sheet.stake .card3d.shown'), 60000);
        let sawRelic = false, map = false;
        if (sawStake) {
          await page.waitForSelector('.lb-sheet.stake [data-i="0"]:not([disabled])', { state: 'visible', timeout: 8000 }).catch(() => {});
          await sleep(450);
          if (want(23)) {
            const f = await page.evaluate(() => {
              const back = document.querySelector('.lb-sheet.stake .card3d .back');
              // 鏡像＝行列式為負（scaleX<0 或 rotateY 過 90°）；純旋轉（轉盤圖示）不算
              const neg = [...document.querySelectorAll('.lb-sheet.stake, .lb-sheet.stake *')].filter(e => { const t = getComputedStyle(e).transform; if (!t || t === 'none') return false; const m = /matrix(3d)?\(([^)]+)\)/.exec(t); if (!m) return false; const v = m[2].split(',').map(Number); const det = m[1] ? v[0] * v[5] - v[1] * v[4] : v[0] * v[3] - v[1] * v[2]; return det < 0 || (m[1] && v[0] < 0 && v[5] > 0); }).length;
              const css3d = [...document.querySelectorAll('.lb-sheet.stake *')].filter(e => { const s = getComputedStyle(e); return s.transformStyle === 'preserve-3d' || s.backfaceVisibility === 'hidden'; }).length;
              return { vis: back && getComputedStyle(back).visibility, neg, css3d };
            });
            record(23, size, f.vis === 'hidden' && f.neg === 0 && f.css3d === 0, `back visibility ${f.vis}, mirrored transforms ${f.neg}, 3d/backface ${f.css3d}`);
          }
          if (want(24)) page._lb = [await lineBreaks(page)];
          if (want(18)) { await jsClick(page, '.lb-sheet.stake .card3d'); info18.stake = (await infoCheck(page)).ok; }
          runSize._infoA = info18;
          await page.click('.lb-sheet.stake [data-i="0"]');
          sawRelic = await advanceUntil(page, () => !!document.querySelector('.lb-sheet.relics [data-r]'), 30000);
          if (sawRelic) {
            await sleep(450);
            if (want(6)) page._keys6b = await measureKeys(page);
            if (want(24)) page._lb.push(await lineBreaks(page));
            await page.click('.lb-sheet.relics [data-r] >> nth=0');
            map = await advanceUntil(page, () => window.__lab.screen() === 'map' && !!document.querySelector('.lb-node.can'), 30000);
          }
        }
        if (want(7)) record(7, size, sawStake && sawRelic && map, `stake flip ${sawStake}, relic pick ${sawRelic}, map ${map}`);
        if (map) {
          await sleep(900);
          await dismissSoft(page);
          if (want(6)) page._keys6c = await measureKeys(page);
          if (want(24)) { await page.click('.lb-node.can >> nth=0'); await sleep(500); page._lb.push(await lineBreaks(page)); await page.click('.lb-sheet.float [data-a=close] >> nth=-1').catch(() => {}); await sleep(200); }
          if (want(18)) {
            await page.evaluate(() => window.__lab.openPage('shelf')); await sleep(400);
            await jsClick(page, '.lb-page .lb-wall .lb-cv'); info18.shelf = (await infoCheck(page)).ok;
            await page.click('.lb-page [data-a=close]'); await sleep(200);
            // 挖箱三張之一
            const col = await page.evaluate(() => { const r = window.__lab.run; for (const c of r.map.cols) if (c.col >= r.col && c.nodes.some(n => n.type === 'crate')) return c.col; return null; });
            if (col != null) {
              await page.evaluate(c => window.__lab.skipTo(c), col); await sleep(600);
              const nid = await page.evaluate(() => { const r = window.__lab.run; return r.map.cols.find(c => c.col === r.col).nodes.find(n => n.type === 'crate').id; });
              await page.click(`.lb-node[data-n="${nid}"]`); await page.click('.lb-sheet.float [data-a=go]');
              await page.waitForSelector('.lb-sheet.crate [data-k="jazz"]', { timeout: 8000 }); await sleep(450);
              await page.click('.lb-sheet.crate [data-k="jazz"]');
              await page.waitForSelector('.lb-sheet.cratecard .lb-ct .lb-cv', { timeout: 5000 }); await sleep(450);
              if (want(24)) page._lb.push(await lineBreaks(page));
              await jsClick(page, '.lb-sheet.cratecard .lb-ct .lb-cv'); info18.crate = (await infoCheck(page)).ok;
              await page.click('.lb-sheet.cratecard [data-a=none]'); await page.waitForSelector('.lb-sheet.done [data-a=next]'); await sleep(450);
              await page.click('.lb-sheet.done [data-a=next]'); await sleep(400);
            } else info18.crate = 'n/a';
          }
        }
        if (want(6)) {
          const all = [page._keys6, page._keys6b, page._keys6c].filter(Boolean);
          const small = all.flatMap(x => x.small), tiny = all.flatMap(x => x.tiny);
          record(6, size, all.length >= 2 && small.length === 0 && tiny.length === 0, `.key checked ${all.reduce((a, x) => a + x.nKeys, 0)}, <12px ${small.length} ${JSON.stringify(small.slice(0, 4))}; buttons checked ${all.reduce((a, x) => a + x.nBtn, 0)}, <44px ${tiny.length} ${JSON.stringify(tiny.slice(0, 6))}`);
        }
      }
      if (want(24)) {
        const t = await (async () => { const all = page._lb || []; return { n: all.reduce((a, x) => a + x.n, 0), bad: all.flatMap(x => x.bad) }; })();
        record(24, size, t.n > 10 && !t.bad.length, `buttons measured ${t.n}; bad breaks ${JSON.stringify(t.bad.slice(0, 6))}`);
      }
      if (want(18) && FIRST) page._info18 = info18;
      if (want(11)) {
        const keys = await page.evaluate(() => ({ set: [...new Set(window.__lsKeys || [])], all: Object.keys(localStorage) }));
        const bad = keys.set.filter(k => !ALLOWED_LS.has(k)).concat(keys.all.filter(k => k === 'dipRogueMeta_v2' || /^dipRogueMeta/.test(k)));
        record(11, size, keys.set.includes('dipGameLab_v1') && bad.length === 0, `setItem keys ${JSON.stringify(keys.set)}; disallowed ${JSON.stringify(bad)}`);
      }
      if (want(12)) {
        const bad = page._requests.filter(u => /firestore\.googleapis\.com|firebase|gstatic\.com\/firebasejs|\/data\/apple-audio-runtime/.test(u));
        record(12, size, bad.length === 0, `${page._requests.length} requests; forbidden ${bad.length} ${JSON.stringify(bad.slice(0, 3))}`);
      }
      if (want(18)) page._info18A = info18;
      page._errA = page._errors.slice();
      await ctx.close();
      runSize._infoA = info18;
    } catch (e) { record(0, size, false, 'flow A crashed: ' + e.message.split('\n')[0]); await ctx.close(); }
  }
  // B：8 序章打輸 → 「……再一場。」→ 重打可操作
  if (want(8)) {
    const { ctx, page } = await newPage(browser, W, H);
    try {
      await openAndPush(page, Q(), 'quiet');
      await prologueToDuel(page, {});
      await page.evaluate(() => window.__lab.forceLose());
      const said = await page.waitForFunction(() => /……再一場。/.test((document.querySelector('.lb-dq .tx') || {}).textContent || ''), null, { timeout: 10000 }).then(() => true, () => false);
      const t1 = Date.now();
      const ready = await duelReady(page, 15000);
      const v = ready ? await page.evaluate(() => window.__lab.duel()) : null;
      record(8, size, said && ready && v && v.hand === 1 && v.p.hp === v.p.maxHp, `「……再一場。」 ${said}; duel operable again ${ready} after ${Date.now() - t1} ms; hand ${v && v.hand}, hp ${v && v.p.hp}/${v && v.p.maxHp}`);
    } catch (e) { record(8, size, false, 'crashed: ' + e.message.split('\n')[0]); }
    await ctx.close();
  }
  // C：9／29 一整晚（autoplay 到 end，0 console error）＋動畫時間（?fast=0 抽 5 手）；13 再來一夜；18（結算封面牆）
  if (wantAny(9, 13, 29, 18)) {
    const { ctx, page } = await newPage(browser, W, H);
    try {
      await openAndPush(page, Q(), 'quiet');
      await page.evaluate(() => window.__lab.autoplay('ev', { until: 'end' }));
      const end = await page.waitForFunction(() => window.__lab.screen() === 'end', null, { timeout: 240000 }).then(() => true, () => false);
      const info = await page.evaluate(() => ({ over: window.__lab.run && window.__lab.run.over, trail: window.__lab.trail().filter((x, i, a) => a[i - 1] !== x).join('>') }));
      if (want(29)) record(29, size, end && page._errors.length === 0, `night to end ${end} (${info.over}); console errors ${page._errors.length} ${JSON.stringify(page._errors.slice(0, 2))}`);
      if (want(18) && end) {
        await sleep(800);
        await jsClick(page, '.lb-panel.end .lb-wall .lb-cv'); const ok = (await infoCheck(page)).ok;
        const A = runSize._infoA || {};
        const all = Object.assign({}, A, { endWall: ok });
        const vals = Object.values(all);
        const need = ['erec', 'hand2', 'slotE', 'slotP', 'long', 'stake', 'shelf', 'crate', 'endWall'];
        const missing = need.filter(k => all[k] !== true && all[k] !== 'n/a');
        record(18, size, missing.length === 0 && (all.wall === true || /^n\/a/.test(String(all.wall))), `opened from ${JSON.stringify(all)}; failed ${JSON.stringify(missing)}`);
        void vals;
      }
      let ms = [];
      if (want(9)) {
        const { ctx: c2, page: p2 } = await newPage(browser, W, H);
        await openAndPush(p2, Q('&fast=0'), 'quiet');
        await prologueToDuel(p2, {});
        if (await duelReady(p2, 60000)) {
          for (let i = 0; i < 6; i++) {
            const r = await p2.evaluate(async () => {
              const d = window.__lab.rawDuel(); if (!d || d.over) return null;
              const api = window.DipLabDuel.api(); const t = performance.now();
              await api.play(window.DipLabEngine.policies.ev(d));
              const dbg = window.DipLabDuel.debug();
              return { ms: dbg && dbg.ms != null ? dbg.ms : performance.now() - t, over: !!(window.__lab.rawDuel() && window.__lab.rawDuel().over) };
            });
            if (!r) break; if (r.over) break; ms.push(Math.round(r.ms));   // 打倒那一手多了大章＋退場，不算在一手的時間裡
            await duelReady(p2, 10000);
          }
        }
        const errs9 = page._errors.concat(p2._errors);
        await c2.close();
        const okAnim = ms.length >= 3 && ms.every(x => x <= 2300);
        record(9, size, end && errs9.length === 0 && okAnim, `night to end ${end} (${info.over}); console errors ${errs9.length}; anim ms ${JSON.stringify(ms)}`);
      }
      if (want(13) && end) {
        await page.waitForSelector('[data-a=again]', { timeout: 5000 });
        const t1 = Date.now();
        await page.click('[data-a=again]');
        await advanceUntil(page, () => !!document.querySelector('.lb-sheet.acepick [data-a=ok]'), 10000);
        await sleep(420);
        await page.click('.lb-sheet.acepick [data-a=ok]');
        const ok = await page.waitForFunction(() => window.__lab.screen() === 'map' && window.__lab.run && window.__lab.run.col === 1 && !!document.querySelector('.lb-node.can'), null, { timeout: 10000 }).then(() => true, () => false);
        const dt = Date.now() - t1;
        record(13, size, ok && dt <= 10000, `map c1 clickable ${ok} in ${dt} ms (night #${await page.evaluate(() => window.__lab.run && window.__lab.run.nightNo)})`);
      } else if (want(13)) record(13, size, false, 'never reached end screen');
    } catch (e) { record(9, size, false, 'crashed: ' + e.message.split('\n')[0]); }
    await ctx.close();
  }
  // D：10 續玩（對決中重新整理 → 繼續今晚 → view 相同）
  if (want(10)) {
    const { ctx, page } = await newPage(browser, W, H);
    try {
      await openAndPush(page, Q(), 'quiet');
      await prologueToDuel(page, {});
      for (let i = 0; i < 2; i++) { if (await playHand(page)) break; await duelReady(page, 10000); }
      const before = await page.evaluate(() => JSON.stringify(window.__lab.duel()));
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForSelector('[data-a=cont]', { timeout: 5000 });
      await page.click('[data-a=cont]');
      const ready = await duelReady(page, 15000);
      const after = ready ? await page.evaluate(() => JSON.stringify(window.__lab.duel())) : null;
      record(10, size, ready && after === before, `resumed ${ready}; view identical ${after === before} (hand ${before && JSON.parse(before).hand})`);
    } catch (e) { record(10, size, false, 'crashed: ' + e.message.split('\n')[0]); }
    await ctx.close();
  }
  // E：15 換面板防連點、28 店裡可點、27 無縫接軌、16 標題推門不丟今晚＋散場中重新整理不丟紀錄
  if (wantAny(15, 16, 27, 28)) {
    const { ctx, page } = await newPage(browser, W, H);
    try {
      await page.goto(Q(), { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('[data-a=quiet]', { timeout: 5000 });
      await page.click('[data-a=quiet]');
      await page.evaluate(() => window.__lab.autoplay('ev', { until: 'map' }));
      await page.waitForFunction(() => window.__lab.screen() === 'map' && window.DipLabEngine.nextStep(window.__lab.run) === 'move', null, { timeout: 90000 });
      await page.evaluate(() => window.__lab.stop()); await sleep(1500);
      await dismissSoft(page);
      if (want(28)) {
        // 這一欄有挖箱：點店裡的箱子 → 開預覽；沒有：老闆一句、不開預覽
        const cols = await page.evaluate(() => window.__lab.run.map.cols.map(c => ({ col: c.col, crate: c.nodes.some(n => n.type === 'crate') })));
        const yes = cols.find(c => c.crate && c.col >= 1), no = cols.find(c => !c.crate && c.col >= 1);
        let okYes = null, okNo = null;
        if (yes) {
          await page.evaluate(c => window.__lab.skipTo(c), yes.col); await sleep(700);
          await page.evaluate(() => window.__lab.stage.interact('map'));
          await page.evaluate(() => window.__lab.stage.tap('crate-jazz')); await sleep(400);
          okYes = await page.evaluate(() => !!document.querySelector('.lb-sheet.float.preview [data-a=go]'));
          await page.click('.lb-sheet.float [data-a=close] >> nth=-1').catch(() => {}); await sleep(200);
        }
        if (no) {
          await page.evaluate(c => window.__lab.skipTo(c), no.col); await sleep(700);
          await page.evaluate(() => window.__lab.stage.tap('crate-jazz')); await sleep(400);
          okNo = await page.evaluate(() => !document.querySelector('.lb-sheet.float.preview') && !![...document.querySelectorAll('.ds-say')].find(e => getComputedStyle(e).display !== 'none'));
        }
        record(28, size, okYes === true && okNo === true, `crate column → preview ${okYes}; no crate → owner bubble, no preview ${okNo}`);
      }
      if (want(15)) {
        await page.evaluate(() => window.__lab.skipTo(2)); await sleep(500);
        const cid = await page.evaluate(() => { const r = window.__lab.run; const n = r.map.cols.find(c => c.col === r.col).nodes.find(x => x.type === 'crate'); return n ? n.id : null; });
        if (!cid) record(15, size, false, 'no crate node in column 2 for this seed');
        else {
          await page.click(`.lb-node[data-n="${cid}"]`); await page.click('.lb-sheet.float [data-a=go]');
          await page.waitForSelector('.lb-sheet.crate [data-k="tw"]', { timeout: 8000 }); await sleep(450);
          const d0 = await page.evaluate(() => window.__lab.run.deck.length);
          const box = await page.evaluate(() => { const b = document.querySelector('.lb-sheet.crate [data-k="tw"]').getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; });
          await page.mouse.click(box.x, box.y); await sleep(90); await page.mouse.click(box.x, box.y); await sleep(600);
          const r = await page.evaluate(() => ({ deck: window.__lab.run.deck.length, step: window.DipLabEngine.nextStep(window.__lab.run), sheet: !!document.querySelector('.lb-sheet.cratecard') }));
          record(15, size, r.deck === d0 && r.step === 'crateCard' && r.sheet, `crate double-tap: deck ${d0}→${r.deck}, step ${r.step}, cards shown ${r.sheet}`);
          await page.click('.lb-sheet.cratecard [data-a=none]'); await page.waitForSelector('.lb-sheet.done [data-a=next]'); await sleep(450);
          await page.click('.lb-sheet.done [data-a=next]');
          await page.waitForFunction(() => window.__lab.screen() === 'map', null, { timeout: 5000 }); await sleep(400);
        }
      }
      if (want(27)) {
        // 地圖 → 對決 → 押盤 → 地圖：#stage canvas 同一個節點；進場時 #stage 高度單調收到橫條
        const fid = await page.evaluate(() => { const r = window.__lab.run; for (const c of r.map.cols) if (c.col >= r.col && c.nodes.some(n => n.enemyId && n.type === 'fight')) return c.col; return null; });
        if (fid != null) await page.evaluate(c => window.__lab.skipTo(c), fid);
        await sleep(800);
        await page.evaluate(() => { window.__c0 = document.querySelector('#stage canvas'); window.__hs = []; const tick = () => { window.__hs.push(document.getElementById('stage').offsetHeight); if (window.__hs.length < 400) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
        const nid = await page.evaluate(() => { const r = window.__lab.run; return r.map.cols.find(c => c.col === r.col).nodes.find(n => n.type === 'fight').id; });
        await page.click(`.lb-node[data-n="${nid}"]`); await page.click('.lb-sheet.float [data-a=go]');
        const inDuel = await duelReady(page, 15000);
        const hs = await page.evaluate(() => window.__hs.slice());
        const strip = await page.evaluate(() => document.getElementById('stage').offsetHeight);
        const i0 = hs.findIndex((h, i) => i > 0 && h < hs[i - 1]);
        const seg = i0 > 0 ? hs.slice(i0 - 1) : hs;
        let mono = true; for (let i = 1; i < seg.length; i++) if (seg[i] > seg[i - 1]) mono = false;
        await page.evaluate(() => window.__lab.forceWin());
        const stake = await page.waitForSelector('.lb-sheet.stake .card3d.shown', { timeout: 15000 }).then(() => true, () => false);
        await sleep(400);
        if (stake) { await page.click('.lb-sheet.stake [data-i="1"]').catch(() => page.click('.lb-sheet.stake [data-i="0"]')); }
        const relic = await page.$('.lb-sheet.relics [data-r]'); if (relic) await relic.click();
        const back = await page.waitForFunction(() => window.__lab.screen() === 'map', null, { timeout: 15000 }).then(() => true, () => false);
        const same = await page.evaluate(() => document.querySelector('#stage canvas') === window.__c0);
        record(27, size, inDuel && mono && same && back && stake && hs[0] > strip + 100, `canvas same node ${same}; #stage ${hs[0]}→${strip} monotonic ${mono} (${seg.length} frames); stake ${stake}; back to map ${back}`);
      }
      if (want(16)) {
        await page.click('.lb-top [aria-label=暫停選單]'); await page.click('.lb-modal [data-a=title]');
        await page.waitForSelector('[data-a=cont]', { timeout: 5000 });
        await page.click('[data-a=push]'); await sleep(300);
        const kept = await page.evaluate(() => ({ s: window.__lab.screen(), run: !!(window.__lab.run && !window.__lab.run.over) }));
        await page.click('[data-a=cont]');
        await page.waitForFunction(() => window.__lab.screen() === 'map', null, { timeout: 5000 }); await sleep(500);
        let fid = await page.evaluate(() => { const r = window.__lab.run; const c = r.map.cols.find(x => x.col === r.col); const n = c && c.nodes.find(x => x.enemyId && x.type !== 'boss'); return n ? n.id : null; });
        if (!fid) { await page.evaluate(() => window.__lab.skipTo(3)); await sleep(500); fid = await page.evaluate(() => { const r = window.__lab.run; const n = r.map.cols.find(x => x.col === r.col).nodes.find(x => x.enemyId && x.type !== 'boss'); return n ? n.id : null; }); }
        await page.click(`.lb-node[data-n="${fid}"]`); await page.click('.lb-sheet.float [data-a=go]');
        await page.waitForFunction(() => window.__lab.screen() === 'duel', null, { timeout: 10000 }); await sleep(1200);
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
  // F：19 教學三張王牌、20 擋錯招、21 直接開打
  if (wantAny(19, 20)) {
    for (const tier of ['hall', 'pearl', 'heresy']) {
      const { ctx, page } = await newPage(browser, W, H);
      try {
        await openAndPush(page, Q(), 'quiet');
        const ok = await prologueToDuel(page, { tier }, 'tut');
        const r = await walkTutorial(page, W, H, tier === 'hall' && want(20));
        if (want(20) && tier === 'hall') record(20, size, r.wrong && r.wrong.blocked && /先點我指的這裡/.test(r.wrong.text || ''), `wrong card at 1-4: hand ${r.wrong && r.wrong.hand0}→${r.wrong && r.wrong.hand1}, bubble 「${r.wrong && r.wrong.text}」`);
        if (want(19)) record(19, size, ok && r.over === 'win' && r.pHpSame && r.done && page._errors.length === 0, `${tier}: steps ${r.steps}, result ${r.result}, over ${r.over}, 你 ${r.pHp0}→${r.pHp1}, tutorialDone ${r.done}, errors ${page._errors.length}${r.note ? ', ' + r.note : ''}`);
      } catch (e) { record(19, size, false, tier + ' crashed: ' + e.message.split('\n')[0]); }
      await ctx.close();
    }
  }
  if (want(21)) {
    const { ctx, page } = await newPage(browser, W, H);
    try {
      await openAndPush(page, Q(), 'quiet');
      await prologueToDuel(page, {});
      await jsClick(page, '[data-tut=hand-0]'); await sleep(300);
      const r = await page.evaluate(() => ({ svg: !!document.querySelector('#tut svg'), active: !!(window.DipLabTut && window.DipLabTut.active()), hp: window.__lab.duel().e.hp, max: window.__lab.duel().e.maxHp,
        pv: document.querySelectorAll('[data-tut=attrs] .ab .pv').length }));
      record(21, size, !r.svg && !r.active && r.hp === 16 && r.max === 16 && r.pv > 0, `tutorial mask ${r.svg}, lesson active ${r.active}, 男子 ${r.hp}/${r.max}, preview lines ${r.pv}`);
    } catch (e) { record(21, size, false, 'crashed: ' + e.message.split('\n')[0]); }
    await ctx.close();
  }
  // G：25 預覽站浮鈕、26 聲音狀態誠實
  if (wantAny(25, 26)) {
    const { ctx, page } = await newPage(browser, W, H);
    try {
      await openAndPush(page, Q(), 'push');
      if (want(25)) {
        const r = await page.evaluate(() => { const b = document.createElement('button'); b.className = 'dipprev-badge'; b.textContent = 'x'; document.body.appendChild(b); const d = getComputedStyle(b).display; b.remove(); return { d, cls: document.body.classList.contains('in-battle') }; });
        record(25, size, r.d === 'none' && r.cls, `.dipprev-badge display ${r.d}; body.in-battle ${r.cls}`);
      }
      if (want(26)) {
        const started = await page.evaluate(async () => { const f = window.DipLabFx; const c = window.DipLabContent.cards['fishmans-long-season']; return f.music.play(c, { fadeMs: 50 }); });
        await sleep(400);
        // 畫面上的「播放中」：⏸ 選單第一行（用 DipLabUI.openSettings 打開，不產生觸碰，免得觸碰本身就把音樂叫回來）
        const shown = () => page.evaluate(() => { window.DipLabUI.openSettings(); const np = document.querySelector('.lb-modal .lb-np'); const on = !!(np && np.classList.contains('on')); const pl = window.DipLabFx.music.playing(); document.querySelector('.lb-modal [data-a=resume]').click(); return { on, pl }; });
        const s0 = await shown();
        await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); });
        await sleep(300);
        const s1 = await shown();
        await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => false }); document.dispatchEvent(new Event('visibilitychange')); });
        await sleep(300);
        const s2 = await shown();   // 回前景、還沒碰：不在放，畫面也不說在放
        await page.mouse.click(W / 2, 16); await sleep(2500);   // 下一次觸碰（頂欄標題，不會觸發任何按鈕）
        const s3 = await shown();
        const ok = started ? (s0.on && s0.pl && !s1.pl && !s1.on && !s2.pl && !s2.on && s3.pl && s3.on) : (!s0.on && !s0.pl);
        record(26, size, ok, `play ok ${started}; before ${JSON.stringify(s0)}, hidden ${JSON.stringify(s1)}, visible ${JSON.stringify(s2)}, after tap ${JSON.stringify(s3)}`);
      }
    } catch (e) { record(26, size, false, 'crashed: ' + e.message.split('\n')[0]); }
    await ctx.close();
  }
}
// 教學：照著 DipLabTut 的步驟走（說明步點空白、操作步點手指指的地方）；hall 時順便試一次點錯（#20）
async function walkTutorial(page, W, H, tryWrong) {
  const out = { steps: 0, wrong: null };
  out.pHp0 = await page.evaluate(() => window.__lab.duel() ? window.__lab.duel().p.hp : null);
  const t0 = Date.now(); let last = null; out.minHp = out.pHp0;
  while (Date.now() - t0 < 200000) {
    const st = await page.evaluate(() => ({ s: window.__lab.screen(), over: (window.__lab.rawDuel() || {}).over || null, hp: window.__lab.duel() ? window.__lab.duel().p.hp : null, d: window.DipLabTut && window.DipLabTut.debug ? window.DipLabTut.debug() : null,
      sel: window.DipLabDuel && window.DipLabDuel.debug && window.DipLabDuel.debug() ? String(window.DipLabDuel.debug().sel) + window.DipLabDuel.debug().phase : '' }));
    if (st.hp != null && out.minHp != null) out.minHp = Math.min(out.minHp, st.hp);
    if (st.over) { out.over = st.over; break; }
    if (st.s !== 'duel') break;
    const d = st.d;
    if (!d || !d.active || !d.shown || !d.text || !['say', 'do', 'soft', 'modal'].includes(d.mode)) { await sleep(100); continue; }
    const key = d.shown + '|' + d.mode + '|' + d.text + '|' + st.sel;   // 同一步可能要點兩下（2-3：先選盤、再選冷門）
    if (key === last) { await sleep(100); continue; }
    await sleep(380);
    const d2 = await page.evaluate(() => window.DipLabTut.debug());
    if (d2.shown !== d.shown) continue;
    last = key; out.steps++;
    if (d.mode === 'say') { await page.mouse.click(W / 2, H - 10); continue; }
    if (d.mode === 'modal') { const cb = await page.$('#ciClose'); if (cb) await cb.click(); continue; }   // 1-9：唱片資訊開著，點「關閉」
    if (tryWrong && !out.wrong && d.shown === '1-4') {
      const hand0 = await page.evaluate(() => window.__lab.duel().hand);
      const pt = await page.evaluate(() => { const e = window.DipLabDuel.el('hand-1'); const b = e.getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; });
      await page.mouse.click(pt[0], pt[1]); await sleep(250);
      const w = await page.evaluate(() => ({ text: window.DipLabTut.debug().text, sel: window.DipLabDuel.debug().sel, hand: window.__lab.duel().hand }));
      out.wrong = { hand0, hand1: w.hand, text: w.text, blocked: w.hand === hand0 && (w.sel == null || w.sel !== 1) };
      await sleep(1700);
    }
    const pt = await page.evaluate(() => { const h = document.querySelector('#tut .tut-hand'); if (!h || h.hidden || !h.getBoundingClientRect().width) return null; const r = h.getBoundingClientRect(); return [r.left + 12, r.top + 2]; });
    if (d.shown === '2-3' && d.mode === 'do' && await page.evaluate(() => window.DipLabDuel.api().phase()) === 'choose') {
      const c = await page.evaluate(() => { const e = window.DipLabDuel.el('hand-0'); const b = e.getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; });
      await page.mouse.click(c[0], c[1]); continue;
    }
    if (d.shown === '1-9' || /close/.test(String(d.shown))) { const cb = await page.$('#ciClose'); if (cb) { await cb.click(); continue; } }
    if (!pt) { await page.mouse.click(W / 2, H / 2); continue; }
    await page.mouse.click(pt[0], pt[1]);
  }
  await page.waitForFunction(() => window.__lab.screen() !== 'duel', null, { timeout: 20000 }).catch(() => {});
  const fin = await page.evaluate(() => ({ done: !!window.__lab.save.tutorialDone }));
  out.done = fin.done;
  out.pHp1 = out.minHp;
  out.pHpSame = out.minHp === out.pHp0;
  out.result = await page.evaluate(() => window.DipLabTut && window.DipLabTut.debug ? window.DipLabTut.debug().state : null);
  return out;
}
async function measureKeys(page) {
  return page.evaluate(() => {
    const vis = e => { const r = e.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false; const s = getComputedStyle(e); return s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.05; };
    const small = [], tiny = [];
    const keys = [...document.querySelectorAll('.key')].filter(vis);
    for (const e of keys) { const fs = parseFloat(getComputedStyle(e).fontSize); if (fs < 12) small.push((e.className || e.tagName) + ':' + fs); }
    // 頂欄（32px，::after 把點擊區撐到 44）與對決盤面（duel.css 自己的尺寸規格）不在這裡量；唱片資訊的平台鈕是原版 8px 樣式
    const btns = [...document.querySelectorAll('#app button, .lb-modal button, [role=button]')].filter(b => vis(b) && !b.closest('.lb-top, .dl, .lb-strip, .lb-tl, .drawmask'));
    for (const b of btns) { const r = b.getBoundingClientRect(); if (r.width < 43.5 || r.height < 35.5) tiny.push((b.className || b.tagName).toString().slice(0, 30) + ':' + Math.round(r.width) + 'x' + Math.round(r.height)); }
    // 對決：手牌與屬性鈕（主要操作）要 ≥44
    for (const b of document.querySelectorAll('.dl [data-tut=hand] .tile, .dl [data-tut=attrs] .ab')) { if (!vis(b)) continue; const r = b.getBoundingClientRect(); if (r.width < 43.5 || r.height < 43.5) tiny.push('duel:' + (b.className || '').toString().slice(0, 20) + ':' + Math.round(r.width) + 'x' + Math.round(r.height)); }
    return { nKeys: keys.length, nBtn: btns.length, small, tiny, screen: window.__lab && window.__lab.screen() };
  });
}

(async () => {
  const browser = await launch();
  const t0 = Date.now();
  for (const s of SIZES) { await runSize(browser, s); FIRST = false; }
  await browser.close();
  const fail = results.filter(r => !r.ok);
  console.log(`\n${results.length - fail.length}/${results.length} passed in ${Math.round((Date.now() - t0) / 1000)} s`);
  if (fail.length) { console.log('FAILED:', fail.map(f => `#${f.n}[${f.size}]`).join(' ')); process.exitCode = 1; }
})().catch(e => { console.error(e); process.exit(1); });
