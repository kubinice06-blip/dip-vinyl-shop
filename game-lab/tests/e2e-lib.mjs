// game-lab/tests/e2e-lib.mjs：端對端測試的共用函式（SPEC-v4 §3.1 A3 交件 4）。A3。
// 從 tests/e2e.spec.mjs:59-234（v3）**複製**過來、改成可以 import 的模組；e2e.spec.mjs 第一波沒人擁有、不動它，
// 第二波由 B2 改成 import 這裡並刪掉自己那份。新的 e2e（e2e-taps、e2e-prologue、e2e-duel、e2e-econ）都從這裡拿。
//
//   import { launch, newPage, openTitle, Q, SIZES, record, results, sleep } from './e2e-lib.mjs';
//
// 環境變數：LAB_URL（整個網址，預設 http://localhost:8765/game-lab/index.html）或 LAB_BASE（伺服器根，例 http://localhost:8773）；
//          LAB_SIZES（預設四個驗收尺寸 390x664,375x548,430x932,360x640，SPEC-v4 §0.1）。
// 跟 e2e.spec.mjs 的差別（只有加、沒有改行為）：newPage 收 opts.dpr（給店主的截圖用 2）；openTitle／Q 的網址從 LAB_URL／LAB_BASE 來；
//   Q(extra) 第二個參數可以換種子；匯出 results／record／sleep／SEED／URL0／SIZES。
// v4（C 整合）：seedRun／seededContinue／prologueToDuel／walkTutorial／resolveHands／waitStep 換成 B2 在 e2e.spec 寫的 v4 版（存檔 v4、非序章的 run 先挑好特價箱、
//   特價區照真的經濟介面作答、教學六手 18 步）；另外匯出 answerBargain、advanceUntil、longPress、infoOpen、closeInfo、watchSay、econCalls、tapHot。
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch (_) { ({ chromium } = require('/opt/node-tools/node_modules/playwright')); }
export { chromium };

export const URL0 = process.env.LAB_URL || ((process.env.LAB_BASE ? process.env.LAB_BASE.replace(/\/+$/, '') : 'http://localhost:8765') + '/game-lab/index.html');
export const SIZES = (process.env.LAB_SIZES || '390x664,375x548,430x932,360x640').split(',').filter(Boolean).map(s => s.split('x').map(Number));
export const SEED = '20261106';
export const Q = (extra = '&fast=1', seed = SEED) => `${URL0}?debug=1&seed=${seed}${extra}`;
export const ALLOWED_LS = new Set(['dipGameLab_v1', 'dip:autoplay', 'dip:autoplay-consent', 'dipAutoplayHintSeen', 'dip:autoplay-hint']);
export const results = [];
export const sleep = ms => new Promise(r => setTimeout(r, ms));

export function launch() {
  const o = { args: ['--autoplay-policy=no-user-gesture-required'] };
  if (process.env.HTTPS_PROXY) o.proxy = { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' };
  return chromium.launch(o);
}
export async function newPage(browser, w, h, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: opts.dpr || 1, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  page._errors = []; page._requests = []; page._clicks = 0; page._loadFail = [];
  // 像素店把遠端封面縮進 canvas 要 CORS；偶爾某張圖的回應沒帶 ACAO，店裡改畫色塊。這種瀏覽器自己印的 CORS 訊息不算程式錯誤。
  let corsImg = 0;
  page.on('console', m => {
    if (m.type() !== 'error') return;
    const t = m.text();
    if (/^Access to image at 'https:\/\/[^']+' from origin '[^']+' has been blocked by CORS policy/.test(t)) { corsImg++; return; }
    if (corsImg > 0 && /^Failed to load resource: net::ERR_FAILED$/.test(t)) { corsImg--; return; }
    if (/^Failed to load resource:/.test(t)) { page._loadFail.push(t); return; }   // 收尾再跟遠端失敗的數目對帳
    page._errors.push(t);
  });
  page.on('pageerror', e => page._errors.push('pageerror: ' + e.message));
  page.on('request', r => page._requests.push(r.url()));
  // 遠端（封面 CDN、試聽、字型）偶爾回 4xx／5xx：那是網路，不是程式錯誤；本機檔案載不到才算
  page._badRemote = 0; page._badLocal = [];
  page.on('response', r => { if (r.status() < 400) return; const u = r.url(); if (/^https?:\/\/(localhost|127\.0\.0\.1)[:/]/.test(u)) page._badLocal.push(r.status() + ' ' + u); else page._badRemote++; });
  page.on('requestfailed', r => { const u = r.url(); if (!/^https?:\/\/(localhost|127\.0\.0\.1)[:/]/.test(u)) page._badRemote++; });
  if (opts.watchStorage) {
    await page.addInitScript(() => {
      window.__lsKeys = [];
      const orig = Storage.prototype.setItem;
      Storage.prototype.setItem = function (k, v) { try { if (this === window.localStorage) window.__lsKeys.push(String(k)); } catch (_) {} return orig.call(this, k, v); };
    });
  }
  return { ctx, page };
}
export function record(n, size, ok, detail) {
  results.push({ n, size, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  #${n} [${size}] ${detail}`);
}
// ---- 共用步驟 ----------------------------------------------------------------
export const screen = page => page.evaluate(() => window.__lab ? window.__lab.screen() : null);
export async function waitScreen(page, s, ms = 20000) {
  return page.waitForFunction(s => window.__lab && window.__lab.screen() === s, s, { timeout: ms }).then(() => true, () => false);
}
// el.click()（不用 page.tap：Playwright 會自動捲動，掩蓋版面問題；也不吃換畫面 380 ms 的防連點）
export const jsClick = (page, sel) => page.evaluate(s => { const e = document.querySelector(s); if (!e) return false; e.click(); return true; }, sel);
// 元素上「真的點得到」的一點（FIXLIST 11：手牌疊成扇形時每張只露出一條，中心可能被上面那張蓋住）：
//   先試中心；不行就在元素裡掃一圈，找 elementFromPoint 落在它（或它裡面）的那一點；都不行退回中心（例如教學的遮罩蓋著：點到遮罩＝點錯）
export const HIT_PT = `(function (el) {
  if (!el) return null; const b = el.getBoundingClientRect(); if (!b.width || !b.height) return null;
  const ok = (x, y) => { const t = document.elementFromPoint(x, y); return !!t && (t === el || el.contains(t)); };
  const cx = b.left + b.width / 2, cy = b.top + b.height / 2;
  if (ok(cx, cy)) return { x: cx, y: cy };
  for (const fy of [.5, .35, .65, .2, .8]) for (const fx of [.12, .2, .3, .06, .4, .5, .6, .7, .8, .9]) { const x = b.left + b.width * fx, y = b.top + b.height * fy; if (ok(x, y)) return { x, y }; }
  return { x: cx, y: cy };
})`;
export async function hitPoint(page, sel) {
  return page.evaluate(([s, src]) => {
    const el = s.startsWith('dt:') ? window.DipLabDuel.el(s.slice(3)) : document.querySelector(s);
    return (0, eval)(src)(el);
  }, [sel, HIT_PT]);
}
export async function tapAt(page, sel) {
  const r = await hitPoint(page, sel);
  if (!r) throw new Error('no element ' + sel);
  await page.touchscreen.tap(r.x, r.y); page._clicks++;
  return r;
}
export async function duelReady(page, ms = 20000) {
  return page.waitForFunction(() => {
    const D = window.DipLabDuel; if (!window.__lab || window.__lab.screen() !== 'duel' || !D || !D.debug || !D.api()) return false;
    const d = D.debug(); return d && d.enterDone && !D.api().busy() && d.phase === 'choose' && !d.held && !!document.querySelector('.dl [data-tut=hand] .tile');
  }, null, { timeout: ms }).then(() => true, () => false);
}
export async function openTitle(page, q) {
  const t0 = Date.now();
  await page.goto(q || Q(), { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[data-a=push],[data-a=cont]', { state: 'visible', timeout: 8000 });
  const ms = Date.now() - t0;
  await page.waitForFunction(() => !document.body.classList.contains('stage-wait'), null, { timeout: 6000 }).catch(() => {});
  await sleep(500);
  return ms;
}
export const noScroll = page => page.evaluate(() => {
  const a = document.getElementById('app'), de = document.documentElement;
  return { app: a.scrollHeight - a.clientHeight, docY: de.scrollHeight - innerHeight, docX: de.scrollWidth - innerWidth, appH: a.getBoundingClientRect().height, vh: innerHeight };
});
export const scrollOk = s => s.app <= 1 && s.docY <= 1 && s.docX <= 1;

// ---- v4 共用步驟（B2 寫在 e2e.spec，C 整合時搬進來；取代 v3 的 seedRun／prologueToDuel／walkTutorial） ------------------------
// 特價區用替身（tests/econ-stub.js）時，呼叫端把 page._econStub 設成 true：prologueToDuel 照真的面板算 4 下
// 特價區挑三張：替身會自己挑；真的經濟介面（econ.js 的抽屜）點前三張＋收下；外殼的備用面板也一樣
export async function answerBargain(page) {
  return page.evaluate(() => {
    const tog = [...document.querySelectorAll('.ec-drawer [data-a=tog]')];
    if (tog.length) {
      const sel = tog.filter(b => b.classList.contains('sel')).length;
      tog.filter(b => !b.classList.contains('sel')).slice(0, Math.max(0, 3 - sel)).forEach(b => b.click());
      const t = document.querySelector('.ec-drawer [data-a=take]:not([disabled])'); if (t) { t.click(); return 'real'; }
      return null;
    }
    const fb = [...document.querySelectorAll('.lb-sheet.bargain [data-pick]')];
    if (fb.length) { fb.slice(0, 3).forEach(b => b.click()); const ok = document.querySelector('.lb-sheet.bargain [data-a=ok]:not([disabled])'); if (ok) { ok.click(); return 'fallback'; } }
    return null;
  });
}
// 序章：選擇的 ▼ 亮才點；面板照最少點擊作答；mode 'direct'＝手伸進袋子（直接打）、'tut'＝看向老闆（教學）
//   o.until：'duel'（預設）｜'bargainDone'（特價區挑完就停）｜'acePicked'（挑完王牌、run 建好就停）
export async function prologueToDuel(page, mode = 'direct', tier = null, o = {}) {
  let bargainCounted = false;
  for (let guard = 0; guard < 1500; guard++) {
    const st = await page.evaluate(() => ({
      s: window.__lab && window.__lab.screen(), sheet: (document.querySelector('#panel > .lb-sheet') || {}).className || '',
      arming: !!document.querySelector('#panel > .lb-sheet.arming, .lb-dq .menu.arming'),
      menu: document.querySelectorAll('.lb-dq.hasmenu .lb-dqopt').length, choice: !!document.querySelector('.lb-dq .nx.on.choice'),
      ec: !!document.querySelector('.ec-drawer [data-a=tog]'), run: !!(window.__lab && window.__lab.run),
      picked: !!(window.__lab && window.__lab.run && window.__lab.run.shop && window.__lab.run.shop.bargainPicked)
    }));
    if (st.s === 'duel') return true;
    if (o.until === 'acePicked' && st.run) return true;
    if (st.picked && !bargainCounted && page._econStub) { page._clicks += 4; bargainCounted = true; }   // 替身自己挑：照真的面板算 4 下（3 張＋收下）
    if (o.until === 'bargainDone' && st.picked) return true;
    if (st.arming) { await sleep(100); continue; }
    if (st.ec || /bargain/.test(st.sheet)) { await sleep(300); if (await answerBargain(page)) { page._clicks += 4; bargainCounted = true; } await sleep(300); continue; }
    if (/guess/.test(st.sheet)) {
      await sleep(300);
      if (o.onGuess) { const f = o.onGuess; o.onGuess = null; await f(); }
      const sel = tier ? await page.evaluate(t => { const id = window.DipLabContent.aces[t]; return document.querySelector(`.lb-sheet.guess .lb-ct[data-cid="${id}"] [data-pick]`) ? `.lb-sheet.guess .lb-ct[data-cid="${id}"] [data-pick]` : null; }, tier) : null;
      await jsClick(page, sel || '.lb-sheet.guess [data-pick]'); page._clicks++; await sleep(250); continue;
    }
    if (/acepick/.test(st.sheet)) {
      await sleep(300);
      if (tier && !(await page.$(`.lb-sheet.acepick .lb-ct.sel[data-tier="${tier}"]`))) { await jsClick(page, `.lb-sheet.acepick .lb-ct[data-tier="${tier}"] .acex`); page._clicks++; await sleep(150); }
      await jsClick(page, '.lb-sheet.acepick [data-a=ok]'); page._clicks++; await sleep(250); continue;
    }
    if (/recs/.test(st.sheet)) { await sleep(300); await jsClick(page, '.lb-sheet.recs [data-a=ok]'); page._clicks++; await sleep(250); continue; }
    if (st.menu) {
      await sleep(350);
      const pick = st.menu > 1 ? (mode === 'tut' ? 0 : 1) : 0;
      await jsClick(page, `.lb-dq .lb-dqopt[data-i="${pick}"]`); page._clicks++; await sleep(250); continue;
    }
    if (st.choice && st.s === 'scene') { await jsClick(page, '.lb-dq'); page._clicks++; await sleep(150); continue; }
    await sleep(80);
  }
  return false;
}
// 頁面裡直接做一份 v4 存檔（engine.newRun；非序章的 run 先挑好特價箱，不然今晚來客一進去就先開特價區），重新整理後從標題「繼續今晚」
export async function seedRun(page, o = {}) {
  await page.evaluate(o => {
    const E = window.DipLabEngine, C = window.DipLabContent;
    const r = E.newRun(C, { seedKey: o.seedKey || '20261106', nightNo: 1, ace: o.ace || 'pearl', prologue: !!o.prologue, relics: o.relics || [] });
    r.tut = o.tut == null ? false : o.tut;
    if (o.bargain !== false) { const ch = E.bargainPolicy(r, C); if (ch) E.choose(r, C, ch); }
    if (o.idx != null) r.idx = o.idx;
    if (o.money != null) r.money = o.money;
    const s = { v: 4, seen: Object.assign({ night: true }, o.seen || {}), learned: {}, settings: { fastAnim: false, sound: false }, player: null, run: r, nights: [],
      best: { clears: 0, bySeedKey: {} }, shelf: {}, relics: [], unlocks: { secondNightTeaser: false }, tutorialDone: o.tutorialDone !== false, prologueDone: !o.prologue,
      lastAce: o.ace || 'pearl', lastBargain: null };
    [C.aces[r.ace]].concat(r.bag).forEach(id => { s.shelf[id] = { at: r.seedKey + '#1', seen: false }; });
    localStorage.setItem('dipGameLab_v1', JSON.stringify(s));
  }, o);
}
export async function seededContinue(page, o, q) {
  await openTitle(page, q);
  await seedRun(page, o);
  await openTitle(page, q);
  await jsClick(page, '[data-a=cont]');
}
// 一直點 ▼（場景裡）直到條件成立
export async function advanceUntil(page, fn, arg, ms = 30000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    if (await page.evaluate(fn, arg)) return true;
    if ((await screen(page)) === 'scene' && await page.$('.lb-dq .nx.on')) await jsClick(page, '.lb-dq');
    await sleep(150);
  }
  return false;
}
// 引擎直接結算 n 手（v4 策略的簽名是 (duel, R, mem, content)）
export async function resolveHands(page, n, policy = 'thoughtful') {
  await page.evaluate(([n, p]) => { const E = window.DipLabEngine, C = window.DipLabContent, d = window.__lab.rawDuel(), R = E.makeRng(7), mem = {}; for (let k = 0; k < n && !d.over; k++) E.resolveTurn(d, E.policies[p](d, R, mem, C)); }, [n, policy]);
}
// 長按（CDP 觸控）
export async function longPress(page, ctx, sel, ms = 700) {
  const r = await hitPoint(page, sel);
  if (!r) return false;
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: r.x, y: r.y }] });
  await sleep(ms);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  return true;
}
export const infoOpen = (page, ms = 2500) => page.waitForSelector('#cardInfoMask', { timeout: ms }).then(() => true, () => false);
export async function closeInfo(page) { await jsClick(page, '#ciClose'); await page.waitForSelector('#cardInfoMask', { state: 'detached', timeout: 2000 }).catch(() => {}); await sleep(150); }
// 舞台上說的話（老闆泡泡）：包一層 stage.say 記下來
export const watchSay = page => page.evaluate(() => {
  window.__said = [];
  window.__acts = [];
  const st = window.__lab.stage; if (!st || st.__sayW) return !!st;
  const o = st.say; st.say = function (id, t) { if (t) window.__said.push({ id, t: String(t) }); return o.apply(this, arguments); };
  const oa = st.onAction; st.onAction = function (a) { window.__acts.push(a); return oa.apply(this, arguments); };
  st.__sayW = true; return true;
});
export const econCalls = page => page.evaluate(() => (window.__econCalls || []).map(c => c.m));
// 真點一個舞台熱點：用 shop.hotPoints()（那個熱點看得到的那一塊裡一定點得到的點；A3）；點下去最上層要是舞台的畫布
export async function tapHot(page, pred) {
  const p = await page.evaluate(src => {
    const st = window.__lab.stage, sh = st.shop, hb = st.host.getBoundingClientRect(), f = new Function('h', 'return (' + src + ')(h)');
    const byId = {}; (st.hotspots() || []).forEach(h => { byId[h.id] = h; });
    for (const q of sh.hotPoints()) {
      const h = byId[q.id]; if (!h || !f(h)) continue;
      const x = hb.left + q.x, y = hb.top + q.y;
      if (y < 0 || y > innerHeight || x < 0 || x > innerWidth || document.elementFromPoint(x, y) !== sh.canvas) continue;
      return { x, y, id: h.id, action: h.action };
    }
    return null;
  }, String(pred));
  if (!p) return null;
  await page.touchscreen.tap(p.x, p.y);
  return p;
}

// ---- 教學（v4 六手 18 步）：照 DipLabTut 的步驟真點；回傳 {hands:[clash], log:[點錯的紀錄], learned}
export async function waitStep(page, id, ms = 15000) {
  await page.waitForFunction(id => { const t = window.DipLabTut.debug(); return t.shown === id && (t.mode === 'say' || t.mode === 'do'); }, id, { timeout: ms });
  await sleep(430);
}
export async function walkTutorial(page, w, h, variant = 'plain') {
  const tier = await page.evaluate(() => window.__lab.run.ace);
  const steps = await page.evaluate(t => window.DipLabTut._core.stepsFor(window.DipLabContent, t).map(s => ({ id: s.id, kind: s.kind, point: s.point, hand: s.hand, thr: !!(s.allow && s.allow.throw), atRes: s.kind === 'say' && (s.target || []).includes('result') })), tier);
  const dbg = () => page.evaluate(() => { const x = window.DipLabDuel.debug(); return { t: window.DipLabTut.debug(), d: x ? { n: x.n, sel: x.sel, held: x.held } : null }; });
  const log = [], callouts = [];
  let hands = null;
  for (const s of steps) {
    await waitStep(page, s.id, s.hand >= 5 ? 20000 : 15000);
    if (s.id === 'a3') hands = await page.evaluate(() => window.DipLabDuel.debug().hands.map(x => { const c = x.evs.find(e => e.t === 'clash'); return { n: c.n, kind: c.kind, toE: c.toE, toP: c.toP, blocked: c.blocked, pStar: c.pStar, ace: !!c.ace, pCard: c.pCard.id }; }));
    if (s.atRes) {      // 結算時講的步驟：浮框要看得到（盤面 hold 住時不能停在進場動畫的開頭）
      const cv = await page.evaluate(() => { const c = document.querySelector('.dl [data-tut="result"]'); if (!c) return null; const b = c.getBoundingClientRect(), cs = getComputedStyle(c); return { w: Math.round(b.width), h: Math.round(b.height), op: +cs.opacity, l2: (c.querySelector('.l2') || {}).textContent || '' }; });
      callouts.push(Object.assign({ step: s.id }, cv));
    }
    if (s.kind === 'say') { await page.touchscreen.tap(w / 2, h - 30); continue; }
    // FIXLIST 11：每手「點疊著的手牌（攤開）→ 點那張 → 點那個屬性（＝丟）」；手指照教學 debug().point 走
    if (!s.thr) {
      const fan = await page.evaluate(() => window.DipLabDuel.debug().spread === false);
      if (fan) {
        const pt = await page.evaluate(() => window.DipLabTut.debug().point);
        if (pt !== 'hand') log.push({ step: s.id, bad: 'fanned but finger on ' + pt });
        await tapAt(page, 'dt:hand');
        await page.waitForFunction(p => window.DipLabDuel.debug().spread === true && window.DipLabTut.debug().point === p, s.point, { timeout: 4000 }).catch(() => {});
        await sleep(250);
      }
      if (variant === 'wrong' && s.hand === 1) {
        // 第 1 手：攤開後點別張（在遮罩上）→「先點我指的這裡。」、沒浮起
        const n0 = (await dbg()).d.n;
        const wrongSel = await page.evaluate(pt => {
          const tgt = window.DipLabDuel.el(pt); if (!tgt) return null;
          const tile = tgt.closest('.tile');
          const c = [...document.querySelectorAll('.dl .tile .cvw')].find(x => x.closest('.tile') !== tile);
          return c ? '.dl [data-tut="' + c.dataset.tut + '"]' : null;
        }, s.point);
        if (wrongSel) {
          await tapAt(page, wrongSel); await sleep(250);
          const st = await dbg();
          log.push({ step: s.id, hand: 1, text: st.t.text, warn: st.t.warn, n: st.d.n, n0, sel: st.d.sel, shown: st.t.shown });
          await sleep(1700);
        }
      }
      await tapAt(page, 'dt:' + s.point);
      continue;
    }
    if (variant === 'wrong' && s.hand === 2) {
      // 第 2 手：浮起那張的別色屬性鈕（在遮罩上）→「先點我指的這裡。」、沒丟出去、還是那張浮著
      const n0 = (await dbg()).d.n;
      const wrongSel = await page.evaluate(pt => {
        const tgt = window.DipLabDuel.el(pt); if (!tgt) return null;
        const c = [...document.querySelectorAll('.dl .pop .ab')].find(x => x !== tgt);
        return c ? '.dl [data-tut="' + c.dataset.tut + '"]' : null;
      }, s.point);
      if (wrongSel) {
        await tapAt(page, wrongSel); await sleep(250);
        const st = await dbg();
        log.push({ step: s.id, hand: 2, text: st.t.text, warn: st.t.warn, n: st.d.n, n0, sel: st.d.sel, shown: st.t.shown });
        await sleep(1700);
      }
    }
    await tapAt(page, 'dt:' + s.point);
  }
  const learned = await page.waitForFunction(() => Object.keys(window.__lab.save.learned || {}).length >= 6, null, { timeout: 15000 }).then(() => page.evaluate(() => Object.keys(window.__lab.save.learned).sort()), () => page.evaluate(() => Object.keys(window.__lab.save.learned || {}).sort()));
  return { tier, hands, log, learned, callouts };
}
