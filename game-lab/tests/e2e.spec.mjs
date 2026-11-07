// game-lab/tests/e2e.spec.mjs：品味對決 v3 Playwright 端到端測試（SPEC-v3 §11.3＋v2 外殼 bug 回歸）。Agent U。
// 純 node 腳本（不用 @playwright/test）：node game-lab/tests/e2e.spec.mjs
//   需要靜態伺服器：cd dip-vinyl-shop && python3 -m http.server 8765
//   環境變數：LAB_URL（預設 http://localhost:8765/game-lab/index.html）
//            LAB_SIZES（預設 "390x664,375x548,360x640,390x844"）：手機情境（hasTouch、isMobile、DPR 1）
//            LAB_ONLY（例 "1,3,19"）：只跑這幾個
//            LAB_FULL=1：每個尺寸都跑全部情境（預設：版面情境 #1 #3 #4 #6 #17 #22 #27 #29 #40 四個尺寸都跑，流程情境只在第一個尺寸跑）
// 每個情境印 PASS／FAIL；任何一個 FAIL → exit 1。只有 Chromium（沒有 WebKit）。
//
// 情境（v3）：
//   1 開頁：標題 2.5 s 內、兩顆推門鈕在畫面內、沒有捲動
//   3 推門到第一手 ≤10 下（猜歌、挑王牌、回嘴、直接開打）；盤面可以出牌
//   4 對決版面：e-habit e-rec e-stars tri 4 張手牌 全部星鈕 throw 的下緣都 ≤ innerHeight
//   6 點擊區：星鈕 ≥28×44、其他鈕 ≥44×44；數字 ≥12px
//   7 序章打贏 → 掉出來的那張 → 發燒配件三選一（防塵套／黑膠唱針／洗碟水）→ 今晚來客（沒有押盤、沒有翻牌）
//   8 序章打輸 →「……再一場。」→ 同一位男子、聲望回滿
//   9 一整晚（自動遊玩）→ 結算三件事 →（13）再來一夜 → 挑王牌 → 今晚來客（沒有序章）
//  10 續玩：打到第 2 手重新整理 → 繼續今晚 → 同一場、同一手
//  11 存檔隔離：只寫 dipGameLab_v1（版本 3）；舊版存檔安全丟掉
//  12 網路：沒有 Firebase
//  14 長按手牌封面＝唱片資訊
//  16 標題有存檔時點兩下店門＝繼續今晚，不會放棄今晚（B-title-door-abandons-run）
//  17 兩邊分明：他在上（底線淺灰）你在下（頂線黑）；舞台他左你右
//  18 每一張專輯都開唱片資訊：他亮出的、slot-e、slot-p、手牌、王牌、挑唱片面板、唱片櫃、牆上的、箱子、試聽機；點星鈕不開
//  19 教學三王牌：10 步照指示點；每手後聲望照 C.tutorial.expect；save.tutorialDone
//  20 教學擋錯招：第 4 步點錯星鈕、第 9 步點非硬蕊 →「先點我指的這裡。」、手數不前進
//  21 直接開打：沒有教學遮罩、男子 10 聲望
//  22 不捲動：每個畫面 #app 沒有被撐出可視高、沒有橫向捲動
//  27 無縫接軌：今晚來客 → 對決 → 挑唱片 → 今晚來客，#stage canvas 是同一個節點；黑條只在 #stage 裡、≤1.6 s
//  29 主控台 0 錯誤
//  30 結果預告＝引擎 preview
//  31 急了換字（菁英聲望 ≤ 一半）
//  32 唱片丟完（force 7 手同色比星）→ by pile、你贏
//  33 老闆說情：輸一次 → 同一位重開、聲望 10；再輸 → 散場
//  34 盤面沒有舊機制
//  35 跳過教學＋重新整理不會重開教學（B-skip-reload）
//  36 ⏸ 回標題會結束教學；之後的直接開打不被教學劫持（B-stale-lesson-hijack）
//  37 連點安全：推門 ×2、下一位 ×2、台北 ×2
//  38 傳說藏家登場卡擋點擊、點一下提早收掉
//  39 規則卡：六行＋例子＝engine.clash；店內熱點（公告、箱子、試聽機、老闆）
//  40 375×548 等矮螢幕：有存檔時「再按一次就放棄今晚」那行在畫面內（B-title-375-clipped）
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch (_) { ({ chromium } = require('/opt/node-tools/node_modules/playwright')); }

const URL0 = process.env.LAB_URL || 'http://localhost:8765/game-lab/index.html';
const SIZES = (process.env.LAB_SIZES || '390x664,375x548,360x640,390x844').split(',').filter(Boolean).map(s => s.split('x').map(Number));
const ONLY = process.env.LAB_ONLY ? new Set(process.env.LAB_ONLY.split(',').map(Number)) : null;
const FULL = process.env.LAB_FULL === '1';
const LAYOUT = new Set([1, 3, 4, 6, 17, 22, 27, 29, 40]);
const SEED = '20261106';
const Q = (extra = '&fast=1') => `${URL0}?debug=1&seed=${SEED}${extra}`;
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
  // 像素店把遠端封面縮進 canvas 要 CORS；偶爾某張圖的回應沒帶 ACAO，店裡改畫色塊。這種瀏覽器自己印的 CORS 訊息不算程式錯誤。
  let corsImg = 0;
  page.on('console', m => {
    if (m.type() !== 'error') return;
    const t = m.text();
    if (/^Access to image at 'https:\/\/[^']+' from origin '[^']+' has been blocked by CORS policy/.test(t)) { corsImg++; return; }
    if (corsImg > 0 && /^Failed to load resource: net::ERR_FAILED$/.test(t)) { corsImg--; return; }
    page._errors.push(t);
  });
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

// ---- 共用步驟 ----------------------------------------------------------------
const screen = page => page.evaluate(() => window.__lab ? window.__lab.screen() : null);
async function waitScreen(page, s, ms = 20000) {
  return page.waitForFunction(s => window.__lab && window.__lab.screen() === s, s, { timeout: ms }).then(() => true, () => false);
}
// el.click()（不用 page.tap：Playwright 會自動捲動，掩蓋版面問題；也不吃換畫面 380 ms 的防連點）
const jsClick = (page, sel) => page.evaluate(s => { const e = document.querySelector(s); if (!e) return false; e.click(); return true; }, sel);
async function tapAt(page, sel) {
  const r = await page.evaluate(s => {
    const el = s.startsWith('dt:') ? window.DipLabDuel.el(s.slice(3)) : document.querySelector(s);
    if (!el) return null; const b = el.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 };
  }, sel);
  if (!r) throw new Error('no element ' + sel);
  await page.touchscreen.tap(r.x, r.y); page._clicks++;
  return r;
}
async function duelReady(page, ms = 20000) {
  return page.waitForFunction(() => {
    const D = window.DipLabDuel; if (!window.__lab || window.__lab.screen() !== 'duel' || !D || !D.debug || !D.api()) return false;
    const d = D.debug(); return d && d.enterDone && !D.api().busy() && d.phase === 'choose' && !d.held && !!document.querySelector('.dl [data-tut=hand] .tile');
  }, null, { timeout: ms }).then(() => true, () => false);
}
async function openTitle(page, q) {
  const t0 = Date.now();
  await page.goto(q || Q(), { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[data-a=push],[data-a=cont]', { state: 'visible', timeout: 8000 });
  const ms = Date.now() - t0;
  await page.waitForFunction(() => !document.body.classList.contains('stage-wait'), null, { timeout: 6000 }).catch(() => {});
  await sleep(500);
  return ms;
}
// 序章：▼（選擇句）亮才點；面板出現就照最少點擊作答；mode 'direct'＝直接開打、'tut'＝帶教學
async function prologueToDuel(page, mode = 'direct', tier = null) {
  for (let guard = 0; guard < 800; guard++) {
    const st = await page.evaluate(() => ({
      s: window.__lab && window.__lab.screen(),
      guess: !!document.querySelector('.lb-sheet.guess [data-pick]'), ace: !!document.querySelector('.lb-sheet.acepick [data-a=ok]'),
      menu: document.querySelectorAll('.lb-dq.hasmenu .lb-dqopt').length, next: !!document.querySelector('.lb-dq .nx.on.choice'),
      arming: !!document.querySelector('.lb-sheet.arming, .lb-dq .menu.arming')
    }));
    if (st.s === 'duel') return true;
    if (st.arming) { await sleep(120); continue; }
    if (st.guess) { await sleep(300); await page.click('.lb-sheet.guess [data-pick] >> nth=0'); page._clicks++; await sleep(250); continue; }
    if (st.ace) {
      await sleep(300);
      if (tier) { const sel = `.lb-sheet.acepick .lb-ct[data-tier="${tier}"] .acex`; const cur = await page.$(`.lb-sheet.acepick .lb-ct.sel[data-tier="${tier}"]`); if (!cur) { await page.click(sel); page._clicks++; await sleep(150); } }
      await page.click('.lb-sheet.acepick [data-a=ok]'); page._clicks++; await sleep(250); continue;
    }
    if (st.menu) {
      await sleep(300);
      const pick = st.menu > 1 ? (mode === 'tut' ? 0 : 1) : 0;
      const isDuelMenu = await page.evaluate(() => /品味對決/.test(document.querySelector('.lb-dq .menu').textContent));
      await page.click(`.lb-dq .lb-dqopt[data-i="${isDuelMenu ? pick : 0}"]`); page._clicks++; await sleep(250); continue;
    }
    if (st.next && st.s === 'scene') { await page.click('.lb-dq'); page._clicks++; await sleep(150); continue; }
    await sleep(100);
  }
  return false;
}
// 頁面裡直接做一份存檔（engine.newRun），重新整理後從標題「繼續今晚」
async function seedRun(page, o = {}) {
  await page.evaluate(o => {
    const E = window.DipLabEngine, C = window.DipLabContent;
    const r = E.newRun(C, { seedKey: o.seedKey || '20261106', nightNo: 1, ace: o.ace || 'pearl', prologue: !!o.prologue, relics: o.relics || [] });
    r.goodEar = false; r.tut = o.tut == null ? false : o.tut;
    if (o.idx != null) r.idx = o.idx;
    const s = { v: 3, seen: Object.assign({ night: true, reveal: true }, o.seen || {}), learned: {}, settings: { fastAnim: false, sound: false }, player: null, run: r, nights: [],
      best: { clears: 0, bySeedKey: {} }, shelf: {}, relics: [], unlocks: { secondNightTeaser: false }, tutorialDone: o.tutorialDone !== false, prologueDone: !o.prologue, lastAce: o.ace || 'pearl' };
    localStorage.setItem('dipGameLab_v1', JSON.stringify(s));
  }, o);
}
async function seededContinue(page, o, q) {
  await openTitle(page, q);
  await seedRun(page, o);
  await openTitle(page, q);
  await jsClick(page, '[data-a=cont]');
}
async function resolveHands(page, n, policy = 'oracle') {
  await page.evaluate(([n, p]) => { const E = window.DipLabEngine, d = window.__lab.rawDuel(); for (let k = 0; k < n && !d.over; k++) E.resolveTurn(d, E.policies[p](d)); }, [n, policy]);
}
const noScroll = page => page.evaluate(() => {
  const a = document.getElementById('app'), de = document.documentElement;
  return { app: a.scrollHeight - a.clientHeight, docY: de.scrollHeight - innerHeight, docX: de.scrollWidth - innerWidth, appH: a.getBoundingClientRect().height, vh: innerHeight };
});
const scrollOk = s => s.app <= 1 && s.docY <= 1 && s.docX <= 1;
// 教學 10 步（照 T 的 walk.cjs）：回傳 {hp:[...], end}
async function waitStep(page, id, ms = 12000) {
  await page.waitForFunction(id => { const t = window.DipLabTut.debug(); return t.shown === id && (t.mode === 'say' || t.mode === 'do' || t.mode === 'soft'); }, id, { timeout: ms });
  await sleep(420);
}
async function walkTutorial(page, w, h, variant = 'plain') {
  const dbg = () => page.evaluate(() => { const x = window.DipLabDuel.debug(); return { t: window.DipLabTut.debug(), d: x ? { n: x.n, sel: x.sel, eHp: x.view.eHp, pHp: x.view.pHp, held: x.held } : null }; });
  const hp = [], log = [];
  for (const id of ['t1', 't2', 't3']) { await waitStep(page, id); await page.touchscreen.tap(w / 2, h - 30); }
  await waitStep(page, 't4');
  if (variant === 'wrong') {
    const wrongSel = await page.evaluate(() => { const b = window.DipLabDuel.el('chip:best:o'); const all = [...document.querySelectorAll('.dl .chip')].filter(x => x !== b && x.dataset.a !== 'o'); return all.length ? '[data-tut="' + all[0].dataset.tut + '"]' : null; });
    const n0 = (await dbg()).d.n;
    await tapAt(page, '.dl ' + wrongSel); await sleep(250);
    const st = await dbg();
    log.push({ step: 't4', text: st.t.text, n: st.d.n, n0, sel: st.d.sel });
    await sleep(1700);
  }
  await tapAt(page, 'dt:chip:best:o');
  await waitStep(page, 't5');
  await tapAt(page, '.dl [data-tut="throw"]');
  await waitStep(page, 't6');
  hp.push((await dbg()).d.eHp);
  await sleep(500);
  await page.touchscreen.tap(w / 2, h / 2);
  await waitStep(page, 't7', 14000);
  await tapAt(page, 'dt:chip:best:c');
  await waitStep(page, 't8');
  await tapAt(page, '.dl [data-tut="throw"]');
  await page.waitForFunction(() => window.DipLabDuel.debug().n >= 3, null, { timeout: 9000 });
  hp.push((await dbg()).d.eHp);
  await waitStep(page, 't9', 14000);
  if (variant === 'wrong') {
    const n0 = (await dbg()).d.n;
    await tapAt(page, '.dl [data-tut="chip-0-o"]'); await sleep(250);
    const st = await dbg();
    log.push({ step: 't9', text: st.t.text, n: st.d.n, n0, sel: st.d.sel });
    await sleep(1700);
  }
  const hsel = await page.evaluate(() => { const v = window.DipLabDuel.debug().view; let bi = -1, bs = -1; v.hand.forEach((c, i) => { if (c && c.h > bs) { bs = c.h; bi = i; } }); return '[data-tut="chip-' + bi + '-h"]'; });
  await tapAt(page, '.dl ' + hsel); await sleep(300);
  await tapAt(page, '.dl [data-tut="throw"]');
  await page.waitForFunction(() => window.DipLabDuel.debug().n >= 4, null, { timeout: 9000 });
  hp.push((await dbg()).d.eHp);
  await waitStep(page, 't10', 14000);
  await tapAt(page, 'dt:chip:best:o'); await sleep(320);
  await tapAt(page, '.dl [data-tut="throw"]');
  return { hp, log };
}

// =============================================================================== 情境
async function run() {
  const browser = await launch();
  for (const [w, h] of SIZES) {
    const size = `${w}x${h}`;
    const errsBySize = [];
    const track = page => errsBySize.push(page);

    // #1 開頁 ＋ #22 標題不捲動
    if (want(1)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        const ms = await openTitle(page);
        const r = await page.evaluate(() => { const a = document.querySelector('[data-a=push]').getBoundingClientRect(), b = document.querySelector('[data-a=quiet]').getBoundingClientRect(); return { a: a.bottom, b: b.bottom, vh: innerHeight, plate: !!document.querySelector('.lb-plate') }; });
        const sc = await noScroll(page);
        record(1, size, ms < 2500 && r.a <= r.vh && r.b <= r.vh && r.plate && scrollOk(sc), `title ${ms} ms, buttons bottom ${Math.round(r.a)}/${Math.round(r.b)} ≤ ${r.vh}, scroll ${JSON.stringify(sc)}`);
      } catch (e) { record(1, size, false, e.message); }
      await ctx.close();
    }

    // #3 推門到第一手 ≤10 下 ＋ #4 版面 ＋ #6 點擊區 ＋ #17 兩邊分明 ＋ #22 對決不捲動 ＋ #34 沒有舊機制 ＋ #30 預覽＝引擎 ＋ #14 長按 ＋ #18（對決的封面）
    if (want(3) || want(4) || want(6) || want(17) || want(30) || want(34) || want(14) || want(18)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await openTitle(page);
        page._clicks = 0;
        await page.click('[data-a=quiet]'); page._clicks++;
        const ok = await prologueToDuel(page, 'direct');
        const ready = ok && await duelReady(page);
        if (want(3)) record(3, size, ready && page._clicks <= 10, `prologue → first hand in ${page._clicks} taps (ready=${ready})`);
        if (ready) {
          if (want(4)) {
            const r = await page.evaluate(() => {
              const names = ['e-habit', 'e-rec', 'e-stars', 'tri', 'hand-ace', 'hand-0', 'hand-1', 'hand-2', 'throw'];
              const out = {}; names.forEach(n => { const e = document.querySelector('.dl [data-tut="' + n + '"]'); out[n] = e ? Math.round(e.getBoundingClientRect().bottom) : -1; });
              const chips = [...document.querySelectorAll('.dl .chip')].map(c => Math.round(c.getBoundingClientRect().bottom));
              return { out, chipMax: Math.max(...chips), chips: chips.length, vh: innerHeight };
            });
            const bad = Object.entries(r.out).filter(([k, v]) => v < 0 || v > r.vh);
            record(4, size, !bad.length && r.chipMax <= r.vh && r.chips >= 10, `bottoms ${JSON.stringify(r.out)} chips ${r.chips} max ${r.chipMax} ≤ ${r.vh}${bad.length ? ' BAD ' + JSON.stringify(bad) : ''}`);
          }
          if (want(6)) {
            const r = await page.evaluate(() => {
              const small = [];
              document.querySelectorAll('.dl .chip').forEach(c => { const b = c.getBoundingClientRect(); if (b.width < 27.5 || b.height < 44) small.push(c.dataset.tut + ' ' + Math.round(b.width) + 'x' + Math.round(b.height)); });
              const th = document.querySelector('.dl [data-tut=throw]').getBoundingClientRect();
              if (th.width < 44 || th.height < 40) small.push('throw ' + Math.round(th.width) + 'x' + Math.round(th.height));
              document.querySelectorAll('#top button').forEach(b0 => { const b = b0.getBoundingClientRect(); const cs = getComputedStyle(b0, '::after'); const hh = b.height + (parseFloat(cs.top) < 0 ? -parseFloat(cs.top) * 2 : 0); if (b.width < 40 || hh < 44) small.push('top ' + b0.textContent + ' ' + Math.round(b.width) + 'x' + Math.round(hh)); });
              const fonts = []; document.querySelectorAll('.dl .chip, .dl [data-tut=e-hp], .dl [data-tut=p-hp]').forEach(e => { const fs = parseFloat(getComputedStyle(e).fontSize); if (fs < 12) fonts.push(e.dataset.tut + ' ' + fs); });
              return { small, fonts };
            });
            record(6, size, !r.small.length && !r.fonts.length, `small ${JSON.stringify(r.small).slice(0, 200)} fonts ${JSON.stringify(r.fonts)}`);
          }
          if (want(17)) {
            const r = await page.evaluate(() => {
              const e = document.querySelector('.dl [data-tut=e-hud]').getBoundingClientRect(), p = document.querySelector('.dl [data-tut=p-hud]').getBoundingClientRect();
              const se = document.querySelector('.dl [data-tut=slot-e]').getBoundingClientRect(), sp = document.querySelector('.dl [data-tut=slot-p]').getBoundingClientRect();
              const st = window.__lab.stage; const f = st && st.anchor('f'), pa = st && st.anchor('p');
              const fx = f ? f.getBoundingClientRect().left : 0, px = pa ? pa.getBoundingClientRect().left : 1;
              const handInE = !!document.querySelector('.dl [data-tut=e-hud] .chip');
              return { eAbove: e.top < p.top, slots: se.left < sp.left, stage: fx < px, handInE, top: document.querySelector('#top .tt').textContent };
            });
            record(17, size, r.eAbove && r.slots && r.stage && !r.handInE, JSON.stringify(r));
          }
          if (want(34)) {
            const r = await page.evaluate(() => {
              const old = ['e-qi', 'p-qi', 'e-intent', 'stake', 'ult', 'chain', 'attrs'].filter(n => document.querySelector('[data-tut="' + n + '"]'));
              const tx = document.querySelector('.dl').textContent;
              const words = ['氣勢', '輾壓', '賭注', '相生', '配件'].filter(w0 => tx.indexOf(w0) >= 0);
              return { old, words };
            });
            record(34, size, !r.old.length && !r.words.length, JSON.stringify(r));
          }
          if (want(30)) {
            const r = await page.evaluate(() => {
              const E = window.DipLabEngine, D = window.DipLabDuel, d = window.__lab.rawDuel(); const bad = []; let n = 0;
              const chips = [...document.querySelectorAll('.dl .chip')];
              for (const c of chips) {
                const t = c.dataset.tut; const m = /^chip-(\d|ace)(?:-([coh]))?$/.exec(t); if (!m) continue;
                const act = m[1] === 'ace' ? { ace: true } : { i: +m[1], attr: m[2] };
                D.select(m[1] === 'ace' ? 'ace' : +m[1], m[1] === 'ace' ? undefined : m[2]);
                const pv = E.preview(d, act);
                for (const a of ['c', 'o', 'h']) {
                  const ui = (document.querySelector('.dl [data-tut=e-star-' + a + '] .ans') || {}).textContent || '';
                  const o = pv[a]; const want0 = o.toE > 0 ? '他 −' + o.toE : o.toP > 0 ? '你 −' + o.toP : '沒事';
                  n++; if (ui.replace(/\s+/g, ' ').trim().indexOf(want0) < 0) bad.push(t + ':' + a + ' ui=' + ui + ' want=' + want0);
                }
              }
              D.select(null);
              return { n, bad };
            });
            record(30, size, r.n >= 30 && !r.bad.length, `${r.n} answers checked, bad ${JSON.stringify(r.bad.slice(0, 4))}`);
          }
          if (want(14)) {
            const r = await page.evaluate(() => { const c = document.querySelector('.dl [data-tut=hand-1] .cv, .dl [data-tut=hand-1] img'); const b = c.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; });
            await page.mouse.move(r.x, r.y);
            const cdp = await ctx.newCDPSession(page);
            await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: r.x, y: r.y }] });
            await sleep(700);
            await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
            const open = await page.waitForSelector('#cardInfoMask', { timeout: 3000 }).then(() => true, () => false);
            record(14, size, open, `long-press hand cover → 唱片資訊 ${open}`);
            if (open) { await jsClick(page, '#ciClose'); await sleep(300); }
          }
          if (want(18)) {
            const opened = {};
            const tryInfo = async (key, sel) => {
              const ok = await page.evaluate(s => { const e = document.querySelector(s); if (!e) return false; e.click(); return true; }, sel);
              if (!ok) { opened[key] = 'missing'; return; }
              opened[key] = await page.waitForSelector('#cardInfoMask', { timeout: 2500 }).then(() => true, () => false);
              if (opened[key] === true) { await jsClick(page, '#ciClose'); await page.waitForSelector('#cardInfoMask', { state: 'detached', timeout: 2000 }).catch(() => {}); await sleep(150); }
            };
            await tryInfo('his', '.dl [data-tut=e-cover] img, .dl [data-tut=e-cover] .cv, .dl [data-tut=e-cover]');
            await tryInfo('hand', '.dl [data-tut=hand-0] .cv, .dl [data-tut=hand-0] img');
            await tryInfo('ace', '.dl [data-tut=hand-ace] .cv, .dl [data-tut=hand-ace] img');
            // 星鈕不開
            await jsClick(page, '.dl [data-tut="chip-0-c"]'); await sleep(400);
            const chipOpen = !!(await page.$('#cardInfoMask'));
            await page.evaluate(() => window.DipLabDuel.select(null));
            // 丟一手：牌桌兩張
            await page.evaluate(() => window.DipLabDuel.play({ i: 0, attr: 'c' }));
            await page.waitForFunction(() => window.DipLabDuel.debug().n >= 2 && !window.DipLabDuel.api().busy(), null, { timeout: 12000 }).catch(() => {});
            await sleep(300);
            await tryInfo('slotE', '.dl [data-tut=slot-e] .cv, .dl [data-tut=slot-e] img');
            await tryInfo('slotP', '.dl [data-tut=slot-p] .cv, .dl [data-tut=slot-p] img');
            const ok = Object.values(opened).every(v => v === true) && !chipOpen;
            record(18, size, ok, `duel covers ${JSON.stringify(opened)} chipOpensInfo=${chipOpen}`);
          }
          if (want(22)) { const sc = await noScroll(page); record(22, size, scrollOk(sc), `duel scroll ${JSON.stringify(sc)}`); }
        } else {
          for (const n of [4, 6, 17, 30, 34, 14, 18]) if (want(n)) record(n, size, false, 'duel not ready');
        }
      } catch (e) { record(3, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #27 無縫接軌（今晚來客 → 對決 → 挑唱片 → 今晚來客；同一個 canvas；黑條只在 #stage 裡）＋ #22 今晚來客／挑唱片不捲動 ＋ #18（挑唱片面板）
    if (want(27)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue(page, { ace: 'pearl', idx: 0 }, Q(''));
        await waitScreen(page, 'night');
        await page.evaluate(() => { const c = document.querySelector('#stage canvas'); window.__cv0 = c; window.__enc = []; new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.classList && n.classList.contains('enc2')) { const st = document.getElementById('stage'); window.__enc.push({ t: performance.now(), inStage: st.contains(n), board: false }); const rec = window.__enc[window.__enc.length - 1]; const iv = setInterval(() => { if (document.querySelector('.lb-duelwrap .dl')) rec.board = true; if (!n.isConnected) { rec.ms = performance.now() - rec.t; clearInterval(iv); } }, 30); } }))).observe(document.body, { childList: true, subtree: true }); });
        await sleep(600);
        const scN = await noScroll(page);
        await jsClick(page, '[data-a=go]');
        await waitScreen(page, 'duel');
        await duelReady(page, 20000);
        const enc = await page.evaluate(() => window.__enc);
        await resolveHands(page, 3);
        await page.evaluate(() => window.__lab.forceWin());
        await waitScreen(page, 'reward');
        await sleep(1200);
        const scR = await noScroll(page);
        const rew = await page.evaluate(() => { const b = document.querySelector('.lb-sheet.reward [data-pick]'); if (!b) return null; const r = b.getBoundingClientRect(); const f = document.querySelector('.lb-sheet.reward .foot').getBoundingClientRect(); return { btnBottom: r.bottom, footTop: f.top, vh: innerHeight }; });
        // 挑唱片面板的封面開唱片資訊
        await jsClick(page, '.lb-sheet.reward .lb-ct .lb-cv');
        const info = await page.waitForSelector('#cardInfoMask', { timeout: 2500 }).then(() => true, () => false);
        if (info) { await jsClick(page, '#ciClose'); await sleep(300); }
        await jsClick(page, '.lb-sheet.reward [data-pick]');
        await waitScreen(page, 'night');
        const same = await page.evaluate(() => document.querySelector('#stage canvas') === window.__cv0 && !!window.__cv0 && window.__cv0.isConnected);
        const e0 = enc[0] || {};
        const ok = same && e0.inStage && e0.board && (e0.ms || 0) <= 1600 && rew && rew.btnBottom <= rew.footTop + 1 && info;
        record(27, size, ok, `same canvas ${same}; bars inStage=${e0.inStage} boardVisibleDuring=${e0.board} ${Math.round(e0.ms || 0)} ms; reward btn ${rew && Math.round(rew.btnBottom)} ≤ foot ${rew && Math.round(rew.footTop)}; reward cover info ${info}`);
        if (want(22)) record(22, size, scrollOk(scN) && scrollOk(scR), `night ${JSON.stringify(scN)} reward ${JSON.stringify(scR)}`);
      } catch (e) { record(27, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #40 有存檔的標題：「再按一次就放棄今晚」在畫面內；第二下才放棄
    if (want(40)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await openTitle(page); await seedRun(page, { ace: 'hall', idx: 1 }); await openTitle(page);
        await page.click('[data-a=push]');
        await sleep(200);
        const r = await page.evaluate(() => { const w0 = document.querySelector('.lb-warn'); const b = w0.getBoundingClientRect(); return { vis: getComputedStyle(w0).visibility, bottom: b.bottom, vh: innerHeight, run: !!window.__lab.run, s: window.__lab.screen() }; });
        const sc = await noScroll(page);
        record(40, size, r.vis === 'visible' && r.bottom <= r.vh && r.run && r.s === 'title' && scrollOk(sc), `warn ${r.vis} bottom ${Math.round(r.bottom)} ≤ ${r.vh}; run kept ${r.run}; scroll ${JSON.stringify(sc)}`);
      } catch (e) { record(40, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // ---- 流程情境（第一個尺寸） -------------------------------------------------
    // #7 序章打贏 → 掉出來的那張 → 配件三選一 → 今晚來客
    if (want(7)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await openTitle(page);
        await page.click('[data-a=quiet]');
        await prologueToDuel(page, 'direct');
        await duelReady(page);
        await page.evaluate(() => window.DipLabDuel.autoplay('novice'));
        const card = await page.waitForSelector('.lb-sheet.one', { timeout: 60000 }).then(() => true, () => false);
        const cardTxt = card ? await page.evaluate(() => document.querySelector('.lb-sheet.one').textContent) : '';
        await sleep(500);
        await jsClick(page, '.lb-sheet.one [data-i="0"]');
        // 繼續播到配件面板（▼ 才點）
        let relic = false;
        for (let g = 0; g < 200 && !relic; g++) { relic = !!(await page.$('.lb-sheet.relics [data-r]')); if (!relic) { const nx = await page.$('.lb-dq .nx.on'); if (nx) await jsClick(page, '.lb-dq'); await sleep(150); } }
        const rel = relic ? await page.evaluate(() => [...document.querySelectorAll('.lb-sheet.relics [data-r]')].map(b => b.getAttribute('data-r'))) : [];
        await sleep(450);
        if (relic) await jsClick(page, '.lb-sheet.relics [data-r="stylus"]');
        let night = false;
        for (let g = 0; g < 200 && !night; g++) { night = (await screen(page)) === 'night'; if (!night) { const nx = await page.$('.lb-dq .nx.on'); if (nx) await jsClick(page, '.lb-dq'); await sleep(150); } }
        const st = await page.evaluate(() => ({ relics: window.__lab.run.relics, bag: window.__lab.run.bag, heads: document.querySelectorAll('[data-tut=night] .nc').length, flip: !!document.querySelector('.lb-flip, .card3d') }));
        const ok = card && /Fishmans|Long Season/i.test(cardTxt) && rel.join(',') === 'dustcover,stylus,cleaner' && night && st.relics.join() === 'stylus' && st.bag.indexOf('fishmans-long-season') >= 0 && st.heads === 5 && !st.flip;
        record(7, size, ok, `card panel ${card} (${cardTxt.slice(0, 40)}), relics offered ${rel}, night ${night}, ${JSON.stringify({ relics: st.relics, heads: st.heads, bag: st.bag.length })}`);
      } catch (e) { record(7, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #8 序章打輸 →「……再一場。」→ 同一位男子、聲望回滿
    if (want(8)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await openTitle(page);
        await page.click('[data-a=quiet]');
        await prologueToDuel(page, 'direct');
        await duelReady(page);
        await page.evaluate(() => window.__lab.forceLose());
        let said = false;
        for (let g = 0; g < 100; g++) { said = await page.evaluate(() => /再一場/.test((document.querySelector('.lb-dq .tx') || {}).textContent || '')); if (said) break; await sleep(100); }
        const back = await waitScreen(page, 'duel', 20000);
        await duelReady(page);
        const v = await page.evaluate(() => window.__lab.duel());
        record(8, size, said && back && v.eId === 'man' && v.pHp === 10 && v.eHp === v.eMax, `said ${said}, back ${back}, ${v && v.eId} p ${v && v.pHp} e ${v && v.eHp}/${v && v.eMax}`);
      } catch (e) { record(8, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #9 一整晚 ＋ #13 再來一夜 ＋ #11 存檔隔離 ＋ #12 網路
    if (want(9) || want(13) || want(11) || want(12)) {
      const { ctx, page } = await newPage(browser, w, h, { watchStorage: true }); track(page);
      try {
        await openTitle(page);
        await page.click('[data-a=quiet]');
        await sleep(300);
        await page.evaluate(() => window.__lab.autoplay('oracle', { until: 'end' }));
        const end = await waitScreen(page, 'end', 180000);
        await sleep(800);
        const r = await page.evaluate(() => ({ over: window.__lab.run.over, rows: [...document.querySelectorAll('.lb-sum li')].map(li => li.textContent.replace(/\s+/g, ' ').trim()), again: !!document.querySelector('[data-a=again]'), nights: window.__lab.save.nights.length, trail: window.__lab.trail() }));
        const sawNight = r.trail.filter(s => s === 'night').length, sawReward = r.trail.includes('reward');
        if (want(9)) record(9, size, end && r.rows.length === 3 && r.again && r.nights === 1 && sawNight >= 4 && sawReward, `end ${end} ${r.over}; rows ${JSON.stringify(r.rows)}; night×${sawNight}, reward ${sawReward}`);
        if (want(13)) {
          await jsClick(page, '[data-a=again]');
          const ace = await page.waitForSelector('.lb-sheet.acepick [data-a=ok]', { timeout: 20000 }).then(() => true, () => false);
          await sleep(450);
          await jsClick(page, '.lb-sheet.acepick [data-a=ok]');
          const n2 = await waitScreen(page, 'night', 15000);
          const rr = await page.evaluate(() => ({ prologue: window.__lab.run.prologue, nightNo: window.__lab.run.nightNo, relics: window.__lab.run.relics }));
          record(13, size, ace && n2 && rr.prologue == null && rr.nightNo === 2, `再來一夜 → acePick ${ace} → night ${n2}; ${JSON.stringify(rr)}`);
        }
        if (want(11)) {
          const ks = await page.evaluate(() => ({ keys: [...new Set(window.__lsKeys)], v: JSON.parse(localStorage.getItem('dipGameLab_v1')).v }));
          const bad = ks.keys.filter(k => !ALLOWED_LS.has(k));
          // 舊版存檔：v:1 → 丟掉、不壞
          await page.evaluate(() => localStorage.setItem('dipGameLab_v1', JSON.stringify({ v: 1, run: { map: { cols: [] }, deck: [], hp: 3 }, settings: { sound: false }, shelf: { x: 1 } })));
          await openTitle(page, Q());
          const old = await page.evaluate(() => ({ v: window.__lab.save.v, run: window.__lab.save.run, cont: !!document.querySelector('[data-a=cont]'), push: !!document.querySelector('[data-a=push]') }));
          record(11, size, !bad.length && ks.v === 3 && old.v === 3 && !old.run && !old.cont && old.push, `keys ${JSON.stringify(ks.keys)} v${ks.v}; old v1 save → ${JSON.stringify(old)}`);
        }
        if (want(12)) {
          const fb = page._requests.filter(u => /firebase|firestore|googleapis\.com\/identitytoolkit/i.test(u));
          record(12, size, !fb.length, `firebase requests ${fb.length}`);
        }
      } catch (e) { record(9, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #10 續玩（對決第 2 手）＋ #16 店門點兩下＝繼續今晚
    if (want(10) || want(16)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue(page, { ace: 'hall', idx: 1 });
        await waitScreen(page, 'night'); await sleep(500);
        await jsClick(page, '[data-a=go]');
        await duelReady(page);
        await page.evaluate(() => window.DipLabDuel.play({ i: 0, attr: 'o' }));
        await page.waitForFunction(() => window.DipLabDuel.debug().n === 2 && !window.DipLabDuel.api().busy(), null, { timeout: 12000 });
        const before = await page.evaluate(() => { const v = window.__lab.duel(); return { n: v.n, e: v.eId, eHp: v.eHp, pHp: v.pHp, card: v.eCard.id }; });
        await openTitle(page);
        if (want(16)) {
          // 店門（舞台熱點）點兩下：有存檔＝繼續今晚
          const hot = await page.evaluate(() => { const st = window.__lab.stage; const r = st && st.hotRect && st.hotRect('door'); return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null; });
          if (hot) { await page.touchscreen.tap(hot.x, hot.y); await sleep(600); await page.touchscreen.tap(hot.x, hot.y); }
          else { await page.evaluate(() => window.__lab.stageAction('door')); await sleep(600); await page.evaluate(() => window.__lab.stageAction('door')); }
        } else await jsClick(page, '[data-a=cont]');
        await duelReady(page);
        const after = await page.evaluate(() => { const v = window.__lab.duel(); return { n: v.n, e: v.eId, eHp: v.eHp, pHp: v.pHp, card: v.eCard.id, trail: window.__lab.trail() }; });
        const same = before.n === after.n && before.e === after.e && before.eHp === after.eHp && before.card === after.card;
        if (want(10)) record(10, size, same, `before ${JSON.stringify(before)} after ${JSON.stringify({ n: after.n, e: after.e, eHp: after.eHp, card: after.card })}`);
        if (want(16)) record(16, size, same && !after.trail.includes('scene'), `door ×2 → ${after.trail.join('>')}`);
      } catch (e) { record(10, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #19 教學三王牌 ＋ #20 擋錯招（流亡那一輪）
    if (want(19) || want(20)) {
      for (const tier of ['hall', 'pearl', 'heresy']) {
        const { ctx, page } = await newPage(browser, w, h); track(page);
        try {
          const variant = tier === 'pearl' && want(20) ? 'wrong' : 'plain';
          if (tier === 'hall') {
            // 走真的序章：▶ 品味對決
            await openTitle(page, Q(''));
            await page.click('[data-a=quiet]');
            await prologueToDuel(page, 'tut', tier);
          } else {
            await seededContinue(page, { ace: tier, prologue: true, tut: true, tutorialDone: false, seen: {} }, Q(''));
          }
          await waitScreen(page, 'duel');
          const res = await walkTutorial(page, w, h, variant);
          const C = await page.evaluate(() => ({ exp: window.DipLabContent.tutorial.expect, hp: window.DipLabContent.tutorial.hp }));
          const exp = C.exp[tier]; const want0 = [C.hp - exp[0], C.hp - exp[0] - exp[1], C.hp - exp[0] - exp[1] - exp[2]];
          const done = await page.waitForFunction(() => window.__lab.save.tutorialDone === true, null, { timeout: 20000 }).then(() => true, () => false);
          if (want(19)) record(19, size, JSON.stringify(res.hp) === JSON.stringify(want0) && done, `${tier}: eHp ${JSON.stringify(res.hp)} want ${JSON.stringify(want0)}; tutorialDone ${done}`);
          if (variant === 'wrong') {
            const ok = res.log.length === 2 && res.log.every(l => l.text === '先點我指的這裡。' && l.n === l.n0 && !l.sel);
            record(20, size, ok, JSON.stringify(res.log));
          }
        } catch (e) { record(19, size, false, `${tier} error ${e.message}`); }
        await ctx.close();
      }
    }

    // #21 直接開打：沒有教學、男子 10 聲望
    if (want(21)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await openTitle(page);
        await page.click('[data-a=quiet]');
        await prologueToDuel(page, 'direct');
        await duelReady(page);
        const r = await page.evaluate(() => ({ v: window.__lab.duel(), holes: window.DipLabTut.debug().holes, active: window.DipLabTut.active(), svg: !!document.querySelector('#tut svg:not([style*="none"])') && getComputedStyle(document.querySelector('#tut svg')).display !== 'none' }));
        record(21, size, r.v.eHp === 10 && r.v.eMax === 10 && !r.active && !r.holes, `man ${r.v.eHp}/${r.v.eMax}, tut active ${r.active}, holes ${r.holes}`);
      } catch (e) { record(21, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #31 急了換字（冷門仙人）
    if (want(31)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue(page, { ace: 'pearl', idx: 3 });
        await waitScreen(page, 'night');
        const elite = await page.evaluate(() => window.__lab.run.order[3]);
        await jsClick(page, '[data-a=go]');
        await duelReady(page);
        const line0 = await page.evaluate(() => document.querySelector('.dl [data-tut=e-habit]').textContent);
        await page.evaluate(() => window.__lab.force({ kind: 'counter', toE: 3, toP: 0 }));
        let switched = false, bubble = false;
        const off = await page.evaluate(() => { window.__bub = ''; const st = window.__lab.stage; const o = st.say; st.say = function (id, t, x) { if (id === 'f' && t) window.__bub += t + '|'; return o.apply(this, arguments); }; return true; });
        for (let k = 0; k < 6 && !switched; k++) {
          await duelReady(page, 15000);
          await page.evaluate(() => window.DipLabDuel.play({ i: 0, attr: 'c' }));
          await sleep(2600);
          switched = await page.evaluate(() => window.__lab.duel().switched);
        }
        await sleep(800);
        const r = await page.evaluate(() => ({ line: document.querySelector('.dl [data-tut=e-habit]').textContent, bub: window.__bub, v: window.__lab.duel() }));
        const C2 = await page.evaluate(e => { const C = window.DipLabContent, en = C.enemies[e]; return { l2: C.habits[en.phase2].line, sw: (C.lines[e] || {}).switch || '……急了。' }; }, elite);
        bubble = r.bub.indexOf(C2.sw) >= 0;
        await page.evaluate(() => window.__lab.force(null));
        record(31, size, switched && r.line !== line0 && r.line.indexOf(C2.l2) >= 0 && bubble, `${elite}: ${line0} → ${r.line}; bubble ${bubble} (${r.bub.slice(0, 60)}) eHp ${r.v.eHp}/${r.v.eMax}`);
      } catch (e) { record(31, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #32 唱片丟完：7 手同色比星（你 +1）→ by pile、你贏
    if (want(32)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue(page, { ace: 'hall', idx: 0 });
        await waitScreen(page, 'night');
        await jsClick(page, '[data-a=go]');
        await duelReady(page);
        await page.evaluate(() => { window.__over = null; window.DipLabDuel.on('over', r => { window.__over = { win: r.win, by: r.by }; }); window.__lab.force({ kind: 'mirrorWin', toE: 1, toP: 0 }); });
        for (let k = 0; k < 9; k++) {
          const over = await page.evaluate(() => window.__over);
          if (over) break;
          if (!(await duelReady(page, 8000))) continue;
          await page.evaluate(() => { const v = window.__lab.duel(); const i = v.hand.findIndex(Boolean); window.DipLabDuel.play({ i, attr: 'c' }); });
          await sleep(1200);
        }
        await page.waitForFunction(() => window.__over, null, { timeout: 10000 }).catch(() => {});
        const r = await page.evaluate(() => ({ over: window.__over, stamp: document.body.textContent.indexOf(window.DipLabContent.duelText.pileOut) >= 0 }));
        await page.evaluate(() => window.__lab.force(null));
        record(32, size, !!r.over && r.over.by === 'pile' && r.over.win === true, JSON.stringify(r));
      } catch (e) { record(32, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #33 老闆說情：輸一次 → 同一位重開、聲望 10；再輸 → 散場
    if (want(33)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue(page, { ace: 'pearl', idx: 1 });
        await waitScreen(page, 'night');
        const eid = await page.evaluate(() => window.__lab.run.order[1]);
        await jsClick(page, '[data-a=go]');
        await duelReady(page);
        await resolveHands(page, 1);
        await page.evaluate(() => window.__lab.forceLose());
        const menu = await page.waitForSelector('.lb-dq.hasmenu .lb-dqopt[data-i="0"]', { timeout: 20000 }).then(() => true, () => false);
        const txt = menu ? await page.evaluate(() => document.querySelector('.lb-dq').textContent) : '';
        await sleep(450);
        await jsClick(page, '.lb-dq .lb-dqopt[data-i="0"]');
        await duelReady(page);
        const v = await page.evaluate(() => ({ d: window.__lab.duel(), left: window.__lab.run.retryLeft }));
        await page.evaluate(() => window.__lab.forceLose());
        const end = await waitScreen(page, 'end', 30000);
        const o = await page.evaluate(() => window.__lab.run.over);
        record(33, size, menu && /再一場/.test(txt) && v.d.eId === eid && v.d.pHp === 10 && v.left === 0 && end && o === 'dead', `menu ${menu}; retry vs ${v.d.eId} (want ${eid}) pHp ${v.d.pHp} left ${v.left}; 2nd loss → end ${end} (${o})`);
      } catch (e) { record(33, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #35 跳過教學＋重新整理不會重開教學
    if (want(35)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue(page, { ace: 'heresy', prologue: true, tut: true, tutorialDone: false, seen: {} }, Q(''));
        await waitScreen(page, 'duel');
        await page.waitForFunction(() => window.DipLabTut.active(), null, { timeout: 15000 });
        await page.waitForFunction(() => { const b = document.querySelector('.tut-skip'); return b && !b.hidden; }, null, { timeout: 10000 }).catch(() => {});
        await sleep(400);
        const viaBtn = await jsClick(page, '.tut-skip');
        if (!viaBtn) await page.evaluate(() => window.DipLabTut.skip());
        await page.waitForFunction(() => window.__lab.save.tutorialDone === true, null, { timeout: 5000 }).catch(() => {});
        await duelReady(page);
        await page.evaluate(() => window.DipLabDuel.play({ i: 0, attr: 'c' }));
        await page.waitForFunction(() => window.DipLabDuel.debug().n === 2 && !window.DipLabDuel.api().busy(), null, { timeout: 12000 });
        await openTitle(page, Q(''));
        await jsClick(page, '[data-a=cont]');
        await duelReady(page);
        await sleep(800);
        const r = await page.evaluate(() => ({ n: window.__lab.duel().n, active: window.DipLabTut.active(), done: window.__lab.save.tutorialDone, tut: window.__lab.run.tut }));
        record(35, size, r.n === 2 && !r.active && r.done === true, `skip via button ${viaBtn}; after reload ${JSON.stringify(r)}`);
      } catch (e) { record(35, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #36 ⏸ 回標題會結束教學；重新推門 → 直接開打不被劫持
    if (want(36)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue(page, { ace: 'hall', prologue: true, tut: true, tutorialDone: false, seen: {} }, Q(''));
        await waitScreen(page, 'duel');
        await page.waitForFunction(() => window.DipLabTut.active() && window.DipLabTut.debug().shown === 't2', null, { timeout: 20000 }).catch(() => {});
        await jsClick(page, '#top [data-a=pause]'); await sleep(400);
        await jsClick(page, '.lb-modal [data-a=title]');
        await waitScreen(page, 'title');
        const a1 = await page.evaluate(() => window.DipLabTut.active());
        await sleep(400);
        await page.click('[data-a=quiet]'); await sleep(200); await page.click('[data-a=quiet]');
        await prologueToDuel(page, 'direct');
        await duelReady(page);
        await sleep(500);
        const r = await page.evaluate(() => ({ active: window.DipLabTut.active(), holes: window.DipLabTut.debug().holes, tut: window.__lab.run.tut }));
        await tapAt(page, '.dl [data-tut="chip-1-c"]'); await sleep(300);
        const sel = await page.evaluate(() => window.DipLabDuel.debug().sel);
        record(36, size, !a1 && !r.active && !r.holes && !!sel, `after ⏸ title active=${a1}; direct duel ${JSON.stringify(r)} sel ${JSON.stringify(sel)}`);
      } catch (e) { record(36, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #37 連點安全：推門 ×2、下一位 ×2、台北 ×2
    if (want(37)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await openTitle(page);
        const tb = await page.evaluate(() => { const b = document.querySelector('#top [data-a=taipei]').getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; });
        await page.touchscreen.tap(tb.x, tb.y); await sleep(120); await page.touchscreen.tap(tb.x, tb.y);
        await sleep(1500);
        const t1 = await page.evaluate(() => window.__lab.trail().join('>'));
        await openTitle(page);
        const pb = await page.evaluate(() => { const b = document.querySelector('[data-a=quiet]').getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; });
        await page.touchscreen.tap(pb.x, pb.y); await sleep(90); await page.touchscreen.tap(pb.x, pb.y);
        await sleep(1200);
        const t2 = await page.evaluate(() => window.__lab.trail().join('>'));
        await seedRun(page, { ace: 'pearl', idx: 0 }); await openTitle(page); await jsClick(page, '[data-a=cont]');
        await waitScreen(page, 'night'); await sleep(600);
        const gb = await page.evaluate(() => { const b = document.querySelector('[data-a=go]').getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; });
        await page.touchscreen.tap(gb.x, gb.y); await sleep(100); await page.touchscreen.tap(gb.x, gb.y);
        await duelReady(page);
        const t3 = await page.evaluate(() => window.__lab.trail().join('>'));
        const ok = t1 === 'title>taipei' && t2 === 'title>scene' && /night>duel$/.test(t3) && (t3.match(/duel/g) || []).length === 1;
        record(37, size, ok, `taipei×2: ${t1}; push×2: ${t2}; go×2: ${t3}`);
      } catch (e) { record(37, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #38 傳說藏家登場卡：盤面 hold、卡吃點擊、點一下提早收掉
    if (want(38)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue(page, { ace: 'heresy', idx: 4 });
        await waitScreen(page, 'night'); await sleep(500);
        await jsClick(page, '[data-a=go]');
        await waitScreen(page, 'scene');
        await page.waitForSelector('.lb-dq.hasmenu .lb-dqopt', { timeout: 30000 }).catch(async () => {});
        for (let g = 0; g < 80 && !(await page.$('.lb-dq.hasmenu .lb-dqopt')); g++) { if (await page.$('.lb-dq .nx.on')) await jsClick(page, '.lb-dq'); await sleep(200); }
        await sleep(450);
        await jsClick(page, '.lb-dq .lb-dqopt');
        const mask = await page.waitForSelector('#dlfxBossMask', { timeout: 8000 }).then(() => true, () => false);
        const r1 = await page.evaluate(() => ({ held: window.DipLabDuel.debug() && window.DipLabDuel.debug().held, pe: getComputedStyle(document.getElementById('dlfxBossMask')).pointerEvents }));
        await sleep(700);
        // 點在星鈕的位置：被登場卡吃掉、不會選到；同時登場卡提早收掉
        const chip = await page.evaluate(() => { const c = document.querySelector('.dl [data-tut="chip-0-c"]'); if (!c) return null; const b = c.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; });
        if (chip) await page.touchscreen.tap(chip.x, chip.y);
        await sleep(100);
        const sel = await page.evaluate(() => window.DipLabDuel.debug().sel);
        const gone = await page.waitForSelector('#dlfxBossMask', { state: 'detached', timeout: 1500 }).then(() => true, () => false);
        const ready = await duelReady(page, 8000);
        record(38, size, mask && r1.held >= 1 && r1.pe === 'auto' && !sel && gone && ready, `mask ${mask} ${JSON.stringify(r1)}; tap selected ${JSON.stringify(sel)}; closed early ${gone}; board ready ${ready}`);
      } catch (e) { record(38, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #39 規則卡（六行＋例子＝engine.clash）＋店內熱點 ＋ #18（唱片櫃、牆上的、箱子、試聽機）
    if (want(39) || want(18)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue(page, { ace: 'pearl', idx: 0 });
        await waitScreen(page, 'night'); await sleep(600);
        await jsClick(page, '#top [data-a=help]'); await sleep(400);
        const rc = await page.evaluate(() => {
          const C = window.DipLabContent, E = window.DipLabEngine, ex = C.rules.example;
          const rows = [...document.querySelectorAll('.lb-rules .out > div')].map(d => d.textContent.replace(/\s+/g, ' '));
          const e = C.cards[ex.eCard], p = C.cards[ex.pCard], pa = ex.pAttr;
          const exp = ['o', 'h', 'c'].map(a => E.clash(p[pa], pa, e[a], a)).map(r => r.toE ? '他 −' + r.toE : r.toP ? '你 −' + r.toP : '沒事');
          return { lines: document.querySelectorAll('.lb-rules .rl li').length, rows, exp, foot: document.querySelector('.lb-rules .rfoot').textContent };
        });
        const rowsOk = rc.rows.length === 3 && rc.exp.every((x, i) => rc.rows[i].indexOf(x) >= 0);
        await jsClick(page, '.lb-modal [data-x]'); await sleep(300);
        // 店內熱點
        const hs = await page.evaluate(() => (window.__lab.stage.hotspots() || []).map(h => h.action));
        await page.evaluate(() => window.__lab.stageAction('poster:event')); await sleep(300);
        const posterRules = !!(await page.$('.lb-modal .lb-rules')); await jsClick(page, '.lb-modal [data-x]'); await sleep(300);
        await page.evaluate(() => window.__lab.stageAction('crate:jazz')); await sleep(400);
        const bin = !!(await page.$('.lb-sheet.bin .lb-ct'));
        const opened = {};
        const tryInfo = async (key, sel) => {
          const ok = await jsClick(page, sel); if (!ok) { opened[key] = 'missing'; return; }
          opened[key] = await page.waitForSelector('#cardInfoMask', { timeout: 2500 }).then(() => true, () => false);
          if (opened[key] === true) { await jsClick(page, '#ciClose'); await sleep(250); }
        };
        await tryInfo('bin', '.lb-sheet.bin .lb-ct .lb-cv');
        await page.evaluate(() => { const s = document.querySelector('.lb-sheet.float'); if (s) s.remove(); });
        await page.evaluate(() => window.__lab.stageAction('listen')); await sleep(400);
        const booth = !!(await page.$('.lb-sheet.booth [data-pick]'));
        await tryInfo('booth', '.lb-sheet.booth .lb-ct .lb-cv');
        await page.evaluate(() => { const s = document.querySelector('.lb-sheet.float'); if (s) s.remove(); });
        // 牆上的唱片（真的點舞台上的熱點）
        const wall = await page.evaluate(() => { const st = window.__lab.stage; const h = (st.hotspots() || []).find(x => /^wall-record:/.test(x.action)); if (!h) return null; const r = st.hotRect(h.id); return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2, id: h.id } : null; });
        if (wall) { await page.touchscreen.tap(wall.x, wall.y); opened.wall = await page.waitForSelector('#cardInfoMask', { timeout: 2500 }).then(() => true, () => false); if (opened.wall) { await jsClick(page, '#ciClose'); await sleep(250); } }
        else opened.wall = 'no hotspot';
        // 老闆：一句
        await page.evaluate(() => window.__lab.stageAction('talk:owner')); await sleep(200);
        // 唱片櫃
        await page.evaluate(() => window.__lab.openPage('shelf')); await sleep(300);
        await tryInfo('shelf', '.lb-page.shelf .lb-cv');
        await jsClick(page, '.lb-page [data-a=close]');
        const ok18 = Object.values(opened).every(v => v === true);
        if (want(39)) record(39, size, rc.lines === 6 && rowsOk && posterRules && bin && booth, `rule lines ${rc.lines}; example rows ${JSON.stringify(rc.rows)} want ${JSON.stringify(rc.exp)}; poster→rules ${posterRules}; bin ${bin}; booth ${booth}; hotspots ${[...new Set(hs.map(a => a.split(':')[0]))].join(',')}`);
        if (want(18)) record(18, size, ok18, `shop/shelf covers ${JSON.stringify(opened)}`);
      } catch (e) { record(39, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #29 主控台 0 錯誤（這個尺寸開過的所有頁面）
    if (want(29)) {
      const all = errsBySize.flatMap(p => p._errors || []);
      record(29, size, !all.length, all.length ? all.slice(0, 5).join(' | ') : '0 errors');
    }
    FIRST = false;
  }
  await browser.close();
  const fail = results.filter(r => !r.ok);
  console.log(`\n${results.length - fail.length}/${results.length} PASS`);
  if (fail.length) { console.log('FAILED: ' + fail.map(r => `#${r.n}[${r.size}]`).join(' ')); process.exit(1); }
}
run().catch(e => { console.error(e); process.exit(1); });
