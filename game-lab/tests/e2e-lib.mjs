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
export async function tapAt(page, sel) {
  const r = await page.evaluate(s => {
    const el = s.startsWith('dt:') ? window.DipLabDuel.el(s.slice(3)) : document.querySelector(s);
    if (!el) return null; const b = el.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 };
  }, sel);
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
// 序章：▼（選擇句）亮才點；面板出現就照最少點擊作答；mode 'direct'＝直接開打、'tut'＝帶教學
export async function prologueToDuel(page, mode = 'direct', tier = null) {
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
export async function seedRun(page, o = {}) {
  await page.evaluate(o => {
    const E = window.DipLabEngine, C = window.DipLabContent;
    const r = E.newRun(C, { seedKey: o.seedKey || '20261106', nightNo: 1, ace: o.ace || 'pearl', prologue: !!o.prologue, relics: o.relics || [] });
    r.goodEar = false; r.tut = o.tut == null ? false : o.tut;
    if (o.idx != null) r.idx = o.idx;
    const s = { v: 3, seen: Object.assign({ night: true, reveal: true }, o.seen || {}), learned: {}, settings: { fastAnim: false, sound: false }, player: null, run: r, nights: [],
      best: { clears: 0, bySeedKey: {} }, shelf: {}, relics: [], unlocks: { secondNightTeaser: false }, tutorialDone: o.tutorialDone !== false, prologueDone: !o.prologue, lastAce: o.ace || 'pearl' };
    [C.aces[r.ace]].concat(C.gifts[r.ace] || [], C.junk || []).forEach(id => { s.shelf[id] = { at: r.seedKey + '#1', seen: false }; });
    localStorage.setItem('dipGameLab_v1', JSON.stringify(s));
  }, o);
}
export async function seededContinue(page, o, q) {
  await openTitle(page, q);
  await seedRun(page, o);
  await openTitle(page, q);
  await jsClick(page, '[data-a=cont]');
}
export async function resolveHands(page, n, policy = 'oracle') {
  await page.evaluate(([n, p]) => { const E = window.DipLabEngine, d = window.__lab.rawDuel(); for (let k = 0; k < n && !d.over; k++) E.resolveTurn(d, E.policies[p](d)); }, [n, policy]);
}
export const noScroll = page => page.evaluate(() => {
  const a = document.getElementById('app'), de = document.documentElement;
  return { app: a.scrollHeight - a.clientHeight, docY: de.scrollHeight - innerHeight, docX: de.scrollWidth - innerWidth, appH: a.getBoundingClientRect().height, vh: innerHeight };
});
export const scrollOk = s => s.app <= 1 && s.docY <= 1 && s.docX <= 1;
// 教學 10 步（照 T 的 walk.cjs）：回傳 {hp:[...], end}
export async function waitStep(page, id, ms = 12000) {
  await page.waitForFunction(id => { const t = window.DipLabTut.debug(); return t.shown === id && (t.mode === 'say' || t.mode === 'do' || t.mode === 'soft'); }, id, { timeout: ms });
  await sleep(420);
}
export async function walkTutorial(page, w, h, variant = 'plain') {
  const dbg = () => page.evaluate(() => { const x = window.DipLabDuel.debug(); const v = x ? window.DipLabEngine.view(window.DipLabDuel.api().duel()) : null; return { t: window.DipLabTut.debug(), d: x ? { n: v.n, sel: x.sel, eHp: v.eHp, pHp: v.pHp, held: x.held } : null }; });
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
