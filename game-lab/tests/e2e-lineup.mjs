// game-lab/tests/e2e-lineup.mjs：第 I 波 I-2 上場＋耐聽（scratchpad v5/wave-i SPEC-I §3.9、§5.9；引擎契約 build2/CONTRACT.md §8）端對端測試。介面棒寫 1–6、測試棒補 7–14。
//   需要靜態伺服器：cd dip-vinyl-shop && python3 -m http.server 8765
//   node game-lab/tests/e2e-lineup.mjs
//   環境變數（見 e2e-lib.mjs）：LAB_BASE／LAB_URL；LAB_SIZES（這支預設 390x664,375x548）；LU_ONLY＝只跑這幾項（例 1,4）；
//     LINEUP_PREV＝「上一版頁面」的 git ref（第 14 項退版；預設 30a749e63＝I-2 開工時的 main，?v=92）：game-lab-prev/ 底下的請求由這支直接用
//     `git show <ref>:game-lab/<檔>` 回應（跟 game-lab/ 同源＝localStorage 共用；同 e2e-career 的 CAREER_PREV）
//
// 施工期間上場制要 ?lineup=1 才開（C.lineup.on／C.wear.on 出貨 false）；這支一律帶 ?lineup=1，第 1 項另外確認沒帶＝一字不變。
// 數字照 content（上場制第 lineupFrom＝11 位那一輪起＝第 3 輪；CONTRACT §9 施工量過從 6 改 11，§5.9「打到第 5 位」「第 6–10 位」跟著是「第 10 位」「第 6–10 位」）。
//   1  旗標關（沒 ?lineup=1；content 出貨改開之後，頁面一載入就把 C.lineup.on／C.wear.on 蓋回 false＝模擬關著）：第 11 位來客畫面沒有上場面板、沒有上場列；run 沒有上場鍵；換輪攤位 pending 沒有 lineup 鍵、逛完直接回來客（逐字現況）
//   2  換輪沒攤位（跳到第 11 位＝lineupDue）：上場面板一進來就開、預設五張＝engine.lineupPolicy、按「就這五張」（真點）→ 上場列五張、
//      開打後手牌恰好是那五張（＋王牌）、view.lineup；出一手之後手牌還是那五張、沒有滑入動畫（Element.animate 沒有 translateY(40px)）。
//      375×548：面板不捲（包包格自己捲）、鈕 ≥44、頭像列不被切、上場列不擋來客條與開打鈕、店不捲
//   3  攤位收尾那一步（第 16 位的攤位「今天不逛了」）：攤位收掉後跳上場面板、pending 停在 stall＋lineup；重新整理照畫回面板；點格子＋點包包一張＝換掉；
//      「幫我挑」回到預設；送出＝pending 清掉、上場照選的
//   4  耐聽記號：上場那幾張設「再一次就膩」（g 6）、一張聽膩（n 1）→ 手牌黃點、紅字 −1＋斜紋、打開那張主打軸屬性鈕 −1（紅字不蓋星數：矩形不相交）；
//      自動打完 → 領獎畫面小字「《…》聽膩了（−1）…」；包包面板耐聽點、上場小籤
//   5  一輪中途賣掉上場那張（櫃檯賣給老闆）→ 下一位開打前跳面板（標題「上場少一張」、原本上場的鎖著）→ 補一張
//   6  替補格（配件唱片袋側袋）：面板 6 格、上場列多一格替補；戰利品列「換上場」→ 收這張＋換掉哪一張？→ 換好、吐司「《…》換上場」0.7 秒後還看得到
//   7  §5.9-1／-2、§3.9-4：第 6 位（第 2 輪）不出面板、整包上場、有滑入動畫（對照組）、出牌不算耐聽；真的打完第 10 位藏家 → 攤位逛完 → 上場面板（預設＝pending pick＝lineupPolicy）
//      → 就這五張 → 第 11 位手牌恰好那五張、出一手還是那五張、沒有滑入；newRun 新帳號第一趟／第二趟的 lineupFrom
//   8  §5.9-3 前期省一下：包包 6 張、沒新的、沒聽膩 → 換輪沒攤位（lineupDue）與攤位那一步都不出面板、出吐司「這一輪照上一輪的五張…」、上場＝lineupPolicy；
//      包包 6 張但有一張聽膩 → 照樣出面板
//   9  §3.9-1／-2／-6 真的出牌（__lab.force 每手剋中 1、他打不到你；DipLabDuel.play 指定那張）：同一張出 6 次 → 下一位手牌黃點；第 7 次 → 聽膩一層
//      （領獎小字 −1、包包面板 −1 且 7 點回滿〔§3.3-3 格子回滿重新數〕、手牌紅字 −1＋主打軸 −1 星、屬性鈕紅字不蓋星數）；第 14 次 → −2、7 點全暗（最多層＝停在空的）；
//      第 21 次 → 不再扣（沒有領獎小字、還是 −2）；重新整理照留
//   10 §3.9-3／-6 坐板凳：一張聽膩的整輪沒上場（包包面板「休息中・下一輪回滿」、重新整理照留）→ 換輪後聽膩全清、7 點全亮；上場打過的那張照留
//   11 §3.9-4 說情重打那場出牌不算：第一場出 3 次（記 3 格）→ 輸 → 說情重打（對決沒有 wearOn）出 4 次 → 還是 3 格、沒有聽膩
//   12 §5.9-5 替補（出貨 benchMode 'worn'＝聽膩時自動頂上；手動換是原案 'swap'，沒上）：上場列替補格＋小字；上場那張聽膩 → 開打前替補自動頂上、手牌還是 5 張；
//      下一位沒有更膩的 → 不換；樂歷 Lv3（run.lineupBonus）也有替補格
//   13 §5.9-4 一輪中途收新唱片（戰利品列「收這張」）→ 兩位客人之間包包面板「換上場」（只有新的那張有）→ 換掉一張、吐司 0.7 秒後還看得到 → 下一位手牌有它
//   14 §5.9-7 退版：存檔停在攤位收尾的上場那一步（pending stall＋lineup 鍵）→ 上一版頁面（main，沒有上場制）載入 → run 不作廢、攤位收掉回來客、主控台 0 錯誤
//      → 回新頁面 → lineupDue 照開面板
//   每項最後看主控台 0 錯誤。任何 FAIL → exit 1。
import path from 'path';
import { execFileSync } from 'child_process';
import { launch, newPage, SIZES as SIZES0, record, results, sleep, Q, URL0, SEED, jsClick, waitScreen, duelReady, tapReady, seedRun, openTitle, noScroll, scrollOk, lootReady, clearStall, passLoot, advanceUntil } from './e2e-lib.mjs';

const SIZES = process.env.LAB_SIZES ? SIZES0 : [[390, 664], [375, 548]];
const ONLY = (process.env.LU_ONLY || '').split(',').filter(Boolean).map(Number);
const want = n => !ONLY.length || ONLY.includes(n);
const C = (page, f, a) => page.evaluate(f, a);
const J = x => JSON.stringify(x);
const errs = page => (page._errors || []).filter(e => !/favicon/.test(e));
const errTxt = page => `錯誤 ${errs(page).length}${errs(page).length ? '：' + errs(page).slice(0, 2).join(' / ') : ''}`;
const QL = (x = '') => Q('&fast=1&lineup=1' + x);
const inter = (a, b) => !!a && !!b && a.left < b.right - 0.5 && b.left < a.right - 0.5 && a.top < b.bottom - 0.5 && b.top < a.bottom - 0.5;
const fill = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (o[k] != null ? o[k] : m));
const sorted = a => (a || []).slice().sort();

// 頁面一載入就記：吐司（.lb-toast）、手牌的滑入動畫（duel.js renderHand slideNew：.cvw 的 Element.animate translateY(40px)）
async function watch(page) {
  await page.addInitScript(() => {
    window.__toasts = []; window.__slides = [];
    const start = () => new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.classList && n.classList.contains('lb-toast')) window.__toasts.push(n.textContent); })))
      .observe(document.documentElement, { childList: true, subtree: true });
    if (document.documentElement) start(); else document.addEventListener('DOMContentLoaded', start);
    const oa = Element.prototype.animate;
    Element.prototype.animate = function (kf) {
      try { if (/translateY\(40px\)/.test(JSON.stringify(kf || '')) && this.closest && this.closest('.dl') && this.closest('.tile')) window.__slides.push(this.closest('.tile').getAttribute('data-card')); } catch (_) {}
      return oa.apply(this, arguments);
    };
  });
}
const toasts = page => C(page, () => (window.__toasts || []).slice());
// 旗標關：content.js 一設 window.DipLabContent 就把兩個開關蓋回 false（出貨 false 時什麼都不改；出貨改 true 之後第 1 項照樣測「關著＝逐字現況」）
async function forceOff(page) {
  await page.addInitScript(() => {
    let v; Object.defineProperty(window, 'DipLabContent', { configurable: true, get() { return v; },
      set(x) { v = x; try { if (x && x.lineup) x.lineup.on = false; if (x && x.wear) x.wear.on = false; } catch (_) {} } });
  });
}

// 種一趟（第 pos 位、可給配件、多塞幾張進包包、改 run）→ 標題「繼續」
//   o.extra：多塞幾張進包包；o.bag：包包留幾張（從後面拿掉，送的留著）；o.patch：直接蓋進 s.run 的欄位
async function start(page, o = {}) {
  const q = o.q || QL();
  await openTitle(page, q);
  await seedRun(page, Object.assign({ ace: 'pearl', pos: o.pos || 11 }, o.seed || {}));
  await C(page, o => {
    const s = JSON.parse(localStorage.getItem('dipGameLab_v1')), Cn = window.DipLabContent;
    if (o.extra) { const ex = Object.keys(Cn.cards).filter(id => !Cn.cards[id].tier && !Cn.cards[id].pool && s.run.bag.indexOf(id) < 0).slice(30, 30 + o.extra); s.run.bag.push(...ex); }
    if (o.bag) s.run.bag = s.run.bag.slice(0, o.bag);
    if (o.patch) Object.assign(s.run, o.patch);
    localStorage.setItem('dipGameLab_v1', JSON.stringify(s));
  }, o);
  await openTitle(page, q);
  await jsClick(page, '[data-a=cont]');
  await waitScreen(page, 'night', 15000);
  await sleep(1200);
}
async function reload(page, q) { await openTitle(page, q || QL()); await jsClick(page, '[data-a=cont]'); await waitScreen(page, 'night', 15000); await sleep(1200); }
const panelOpen = (page, ms = 8000) => page.waitForFunction(() => !!document.querySelector('#panel > .lb-sheet.lineup [data-a=luGo]') && !document.querySelector('.lb-sheet.lineup.arming'), null, { timeout: ms }).then(() => true, () => false);
const panelIds = page => C(page, () => [...document.querySelectorAll('.lb-sheet.lineup .lu-slot')].map(b => b.getAttribute('aria-label')));
async function commit(page) { await tapReady(page, '.lb-sheet.lineup [data-a=luGo]'); await page.waitForFunction(() => !document.querySelector('.lb-sheet.lineup') && !!document.querySelector('[data-a=go]'), null, { timeout: 8000 }).catch(() => {}); await sleep(500); }
async function toNight(page) {
  for (let g = 0; g < 80; g++) {
    const sc = await C(page, () => window.__lab.screen());
    if (sc === 'night' && (await page.$('[data-a=go]')) && !(await page.$('.lb-sheet.lineup'))) return true;
    await C(page, () => { const b = document.querySelector('.lb-sheet.level [data-lv]'); if (b && !document.querySelector('.lb-sheet.level.arming')) b.click(); });
    await sleep(300);
  }
  return false;
}
// 攤位「今天不逛了」一路點到收攤；上場制那幾輪停在上場那一步＝面板出來就回 'panel'；沒攤位／收完回來客＝'night'
async function stallOut(page, ms = 25000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    const s = await C(page, () => { const r = window.__lab.run, p = r && r.pending;
      return { panel: !!document.querySelector('#panel > .lb-sheet.lineup [data-a=luGo]') && !document.querySelector('.lb-sheet.lineup.arming'), stall: !!(p && p.type === 'stall'),
        go: !!document.querySelector('[data-a=go]'), scr: window.__lab.screen(), cur: p && p.cur ? p.cur.kind : null, pick: p ? p.pick : null }; });
    if (s.panel) return 'panel';
    if (!s.stall && s.scr === 'night' && s.go) return 'night';
    if (await page.$('.st-ask [data-a=leaveYes]')) { await tapReady(page, '.st-ask [data-a=leaveYes]'); await sleep(500); continue; }
    if (s.stall && s.cur === 'consignGet' && s.pick != null && (await page.$('.lb-sheet.stall [data-a=pass]'))) { await tapReady(page, '.lb-sheet.stall [data-a=pass]'); await sleep(500); continue; }
    const lv = (await page.$('.lb-sheet.stall [data-a=leave]')) ? '.lb-sheet.stall [data-a=leave]' : (await page.$('.st-pick [data-a=leave]')) ? '.st-pick [data-a=leave]' : null;
    if (lv) { await tapReady(page, lv); await sleep(400); continue; }
    await C(page, () => { const b = document.querySelector('.lb-sheet.level [data-lv]'); if (b && !document.querySelector('.lb-sheet.level.arming')) b.click(); });
    await sleep(300);
  }
  return 'timeout';
}
// 開打：真點「下一位」；藏家先有一段場景（點 ▼ 一句一句過、選單點「品味對決」）→ 等到可以出牌
async function goFight(page, ms = 30000) {
  await tapReady(page, '[data-a=go]');
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    const sc = await C(page, () => window.__lab.screen());
    if (sc === 'duel') return duelReady(page, Math.max(1000, ms - (Date.now() - t0)));
    if (sc === 'scene' && (await page.$('.lb-dq.hasmenu .lb-dqopt[data-i="0"]')) && !(await page.$('.lb-dq .menu.arming'))) { await sleep(350); await jsClick(page, '.lb-dq .lb-dqopt[data-i="0"]'); await sleep(300); continue; }   // 藏家：「品味對決」
    if (sc === 'scene' && (await page.$('.lb-dq .nx.on'))) await jsClick(page, '.lb-dq');
    await sleep(150);
  }
  return false;
}
// 打完到領獎畫面：藏家打完先有一段場景（點 ▼）、收頂點卡那張小面板（點第一顆）→ 領獎畫面、三張翻完
async function toReward(page, ms = 40000) {
  await advanceUntil(page, () => !!document.querySelector('#panel > .lb-sheet.one [data-i]') || window.__lab.screen() === 'reward', null, ms);
  if (await page.$('#panel > .lb-sheet.one [data-i]')) { await sleep(300); await tapReady(page, '#panel > .lb-sheet.one [data-i="0"]'); }
  await waitScreen(page, 'reward', 20000); await lootReady(page, 15000); await sleep(400);
}
// 對決：等到可以出牌（或已經不在對決）
const choosable = (page, ms = 20000) => page.waitForFunction(() => { const D = window.DipLabDuel, d = D && D.debug && D.debug(); return (d && d.phase === 'choose' && !D.api().busy() && !d.held) || window.__lab.screen() !== 'duel'; }, null, { timeout: ms }).then(() => true, () => false);
// 出指定那張（屬性照它最高那軸）：等這手結算完（log 多一筆）再等下一手可以出／打完
async function playId(page, id) {
  await choosable(page);
  const n0 = await C(page, id => {
    const v = window.__lab.duel(), d = window.__lab.rawDuel(); if (!v || !d || d.over) return -1;
    const i = v.hand.findIndex(c => c && c.id === id); if (i < 0) return -2;
    const n = d.log.length; window.DipLabDuel.play({ i, attr: window.DipLabEngine.topAttr(v.hand[i]) }); return n;
  }, id);
  if (n0 < 0) return n0;
  await page.waitForFunction(n => { const d = window.__lab.rawDuel(); return !d || d.log.length > n; }, n0, { timeout: 15000 }).catch(() => {});
  await choosable(page, 25000);
  return n0 + 1;
}
// 這一場：出 id k 次（他每手被剋 1、打不到你：最多 6 手、第 6 手打完比聲望你贏）；k < 6 或還沒打完＝forceWin。回到領獎畫面就回
async function fightPlays(page, id, k) {
  const ok = await goFight(page); await sleep(300);
  let played = 0;
  for (let j = 0; j < k; j++) { const r = await playId(page, id); if (r < 0) break; played++; }
  if (await C(page, () => window.__lab.screen() === 'duel' && !!window.__lab.rawDuel() && !window.__lab.rawDuel().over)) await C(page, () => window.__lab.forceWin());
  await toReward(page);
  return { ok, played };
}
// 領獎畫面：pending.worn、小字
const rewardWorn = page => C(page, () => { const p = window.__lab.run.pending; return { worn: p && p.worn ? p.worn.slice() : null, tx: (document.querySelector('.lb-sheet.reward .lb-worn') || {}).textContent || '' }; });
// 包包面板裡那一張：耐聽亮幾顆、−n、休息中、換上場鈕、耐聽點跟星數不相交
async function bagTile(page, id) {
  await jsClick(page, '.lb-lurow'); await page.waitForSelector('.lb-sheet.bag .lb-pick', { timeout: 5000 }).catch(() => {}); await sleep(400);
  const t = await C(page, id => {
    const el = [...document.querySelectorAll('.lb-sheet.bag .lb-ct')].find(e => e.getAttribute('data-cid') === id); if (!el) return null;
    const ear = el.querySelector('.lb-ear'), st = el.querySelector('.stars'), R = e => { if (!e) return null; const r = e.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom }; };
    return { on: ear ? ear.querySelectorAll('i.on').length : -1, dots: ear ? ear.querySelectorAll('i').length : -1, wn: ear && ear.querySelector('b') ? ear.querySelector('b').textContent : '',
      rest: (el.querySelector('.sdtag.rest') || {}).textContent || '', sw: !!el.querySelector('[data-swap]'), er: R(ear), sr: R(st) };
  }, id);
  if (t) t.clash = inter(t.er, t.sr);
  const sws = await C(page, () => [...document.querySelectorAll('.lb-sheet.bag [data-swap]')].map(b => b.getAttribute('data-swap')));
  return Object.assign(t || {}, { sws });
}
async function closeBag(page) { await C(page, () => { const b = document.querySelector('.lb-sheet.bag [data-a=close]'); if (b) b.click(); }); await sleep(400); }
// 上場面板裡那一張（包包格）
const panelTile = (page, id) => C(page, id => {
  const el = [...document.querySelectorAll('.lb-sheet.lineup .lu-bt')].find(e => e.getAttribute('data-id') === id); if (!el) return null;
  const ear = el.querySelector('.lb-ear');
  return { on: ear ? ear.querySelectorAll('i.on').length : -1, worn: !!ear && ear.classList.contains('worn'), wn: ear && ear.querySelector('b') ? ear.querySelector('b').textContent : '', inLu: el.classList.contains('on') };
}, id);
// 面板裡讓 id 上場（不在就點第 0 格再點它）
async function panelPut(page, id) {
  const t = await panelTile(page, id); if (!t || t.inLu) return !!t;
  await tapReady(page, '.lb-sheet.lineup [data-slot="0"]'); await sleep(250);
  await tapReady(page, `.lb-sheet.lineup .lu-bt[data-id="${id.replace(/"/g, '\\"')}"]`); await sleep(300);
  const t2 = await panelTile(page, id); return !!(t2 && t2.inLu);
}
// 換輪攤位（引擎直接擺：跳到第 pos 位〔換輪那一刻〕→ 開攤位 → 回來客畫面）；不經 __lab.jump（它先 go('night')，lineupDue 會先被畫面處理掉）
const stallAt = (page, pos) => C(page, pos => { const r = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent; E.jumpTo(r, Cn, pos); E.stallSession(r, Cn); window.__lab.money(r.money); window.__lab.go('night'); return { lu: !!(r.pending && r.pending.lineup), quiet: !!(r.pending && r.pending.lineup && r.pending.lineup.quiet) }; }, pos);

// ---- 上一版頁面（LINEUP_PREV 的 game-lab，路徑 game-lab-prev/）----
const HERE = path.dirname(new URL(import.meta.url).pathname);
const REPO = path.resolve(HERE, '../..');
const PREV = process.env.LINEUP_PREV || '30a749e63ca698b0dacf960e28766b849a2748c5';
const D_DIR = new URL('.', URL0), P_DIR = new URL('../game-lab-prev/', D_DIR);
const QP = (extra = '&fast=1') => `${P_DIR.href}index.html?debug=1&seed=${SEED}${extra}`;
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8' };
const prevCache = new Map();
function prevFile(p) {
  if (prevCache.has(p)) return prevCache.get(p);
  let b = null;
  try { b = execFileSync('git', ['-C', REPO, 'show', PREV + ':game-lab/' + p], { maxBuffer: 512 << 20, stdio: ['ignore', 'pipe', 'ignore'] }); } catch (_) { b = null; }
  prevCache.set(p, b); return b;
}
async function servePrev(ctx) {
  await ctx.route(u => u.origin === P_DIR.origin && u.pathname.startsWith(P_DIR.pathname), async route => {
    const p = decodeURIComponent(new URL(route.request().url()).pathname.slice(P_DIR.pathname.length)) || 'index.html';
    const b = p.includes('..') ? null : prevFile(p);
    if (!b) return route.fulfill({ status: 404, body: '' });
    return route.fulfill({ status: 200, contentType: MIME[path.extname(p).toLowerCase()] || 'application/octet-stream', body: b });
  });
}

async function runSize(browser, w, h) {
  const size = `${w}x${h}`;
  // ---- 1 旗標關＝一字不變
  if (want(1)) {
    const { ctx, page } = await newPage(browser, w, h); await forceOff(page);
    try {
      await start(page, { q: Q('&fast=1') });
      const s = await C(page, () => { const r = window.__lab.run; return { panel: !!document.querySelector('.lb-sheet.lineup'), row: !!document.querySelector('.lb-lurow'), keys: ['lineup', 'bench', 'lineupFresh', 'lineupDue', 'wear', 'rested', 'lineupFrom'].filter(k => k in r), go: !!document.querySelector('[data-a=go]') }; });
      // 換輪攤位（第 16 位）：pending 沒有 lineup 鍵；逛完（今天不逛了）直接回來客、沒有面板
      const st = await stallAt(page, 16); await sleep(1200);
      const out = await stallOut(page);
      const s2 = await C(page, () => { const r = window.__lab.run; return { pend: !!r.pending, panel: !!document.querySelector('.lb-sheet.lineup'), row: !!document.querySelector('.lb-lurow'), keys: ['lineup', 'bench', 'lineupFresh', 'lineupDue', 'wear', 'rested', 'lineupFrom'].filter(k => k in r) }; });
      record(1, size, !s.panel && !s.row && !s.keys.length && s.go && !st.lu && out === 'night' && !s2.pend && !s2.panel && !s2.row && !s2.keys.length && !errs(page).length,
        `旗標關：面板 ${s.panel}、上場列 ${s.row}、上場鍵 [${s.keys}]、下一位 ${s.go}；第 16 位攤位 pending.lineup ${st.lu}、逛完 ${out}、面板 ${s2.panel}、上場列 ${s2.row}、上場鍵 [${s2.keys}]；${errTxt(page)}`);
    } catch (e) { record(1, size, false, 'exception ' + e.message); }
    await ctx.close();
  }
  // ---- 2 lineupDue：面板、預設、就這五張、手牌、不滑入
  if (want(2)) {
    const { ctx, page } = await newPage(browser, w, h); await watch(page);
    try {
      await start(page, { pos: 11 });
      const open = await panelOpen(page);
      const pol = await C(page, () => window.DipLabEngine.lineupPolicy(window.__lab.run, window.DipLabContent).ids);
      const lay = await C(page, () => {
        const s = document.querySelector('.lb-sheet.lineup'), g = s && s.querySelector('.lu-bag'), btns = [...s.querySelectorAll('button')].filter(b => b.closest('.lu-foot') || b.classList.contains('lu-slot'));
        const r = s.getBoundingClientRect(), gs = s.querySelector('.lu-gs'), gr = gs && gs.getBoundingClientRect();
        // 頭像列不被切：整列在面板裡、不橫捲、每顆頭像都在列裡
        const heads = gs ? [...gs.querySelectorAll('.lu-g')].map(e => e.getBoundingClientRect()) : [];
        const headsIn = !!gr && heads.length > 0 && heads.every(b => b.left >= gr.left - 0.5 && b.right <= gr.right + 0.5 && b.top >= gr.top - 0.5 && b.bottom <= gr.bottom + 0.5);
        return { sheetScroll: s.scrollHeight - s.clientHeight, gridOk: !!g && getComputedStyle(g).overflowY === 'auto', minBtn: Math.min(...btns.map(b => b.getBoundingClientRect().height)), bottom: Math.round(r.bottom), vh: innerHeight,
          heads: heads.length, headsIn, gsIn: !!gr && gr.top >= r.top - 0.5 && gr.bottom <= r.bottom + 0.5 && gr.left >= r.left - 0.5 && gr.right <= r.right + 0.5, gsX: gs ? gs.scrollWidth - gs.clientWidth : 99 };
      });
      const guests = await C(page, () => window.DipLabEngine.roundGuests(window.__lab.run, window.DipLabContent).filter(g => !g.done).length);
      const sc0 = await noScroll(page);
      await commit(page);
      const n = await C(page, () => {
        const r = window.__lab.run, row = document.querySelector('.lb-lurow'), go = document.querySelector('[data-a=go]'), nr = document.querySelector('.lb-night .nrow'), bl = document.querySelector('.lb-bagline');
        const R = e => e && e.getBoundingClientRect();
        return { lineup: r.lineup, due: r.lineupDue, cells: row ? row.querySelectorAll('.cs .lu-mini').length : 0, rowH: row ? Math.round(R(row).height) : 0,
          overlap: [nr, go, bl].some(e => row && e && (R(row).top < R(e).bottom - 0.5 && R(e).top < R(row).bottom - 0.5)), blBottom: bl ? Math.round(R(bl).bottom) : 0, vh: innerHeight };
      });
      const sc1 = await noScroll(page);
      await tapReady(page, '[data-a=go]'); await duelReady(page, 25000); await sleep(400);
      const h0 = await C(page, () => { const v = window.__lab.duel(); window.__slides = []; return { lineup: !!v.lineup, ids: v.hand.filter(Boolean).map(c => c.id).sort() }; });
      await C(page, () => window.DipLabDuel.play({ i: 0, attr: window.DipLabEngine.topAttr(window.__lab.duel().hand[0]) }));
      await page.waitForFunction(() => { const D = window.DipLabDuel, d = D && D.debug && D.debug(); return (d && d.phase === 'choose' && !D.api().busy()) || window.__lab.screen() !== 'duel'; }, null, { timeout: 20000 }).catch(() => {});
      await sleep(300);
      const h1 = await C(page, () => { const v = window.__lab.duel(); return v ? v.hand.filter(Boolean).map(c => c.id).sort() : null; });
      const slides = await C(page, () => window.__slides.slice());
      const want5 = pol.slice().sort();
      const ok = open && J(n.lineup) === J(pol) && !n.due && n.cells === 5 && n.rowH >= 44 && !n.overlap && n.blBottom <= n.vh + 0.5 &&
        lay.sheetScroll <= 1 && lay.gridOk && lay.minBtn >= 44 && lay.bottom <= lay.vh + 0.5 && lay.heads === guests && lay.headsIn && lay.gsIn && lay.gsX <= 1 && scrollOk(sc0) && scrollOk(sc1) &&
        h0.lineup && J(h0.ids) === J(want5) && (!h1 || J(h1) === J(want5)) && !slides.length && !errs(page).length;
      record(2, size, ok, `面板 ${open}、預設＝lineupPolicy ${J(n.lineup) === J(pol)}、面板捲 ${lay.sheetScroll}／包包格捲 ${lay.gridOk}、最矮鈕 ${Math.round(lay.minBtn)}、頭像 ${lay.heads}/${guests} 不被切 ${lay.headsIn && lay.gsIn && lay.gsX <= 1}；` +
        `上場列 ${n.cells} 格 ${n.rowH}px、擋到 ${n.overlap}、包包條底 ${n.blBottom}/${n.vh}；手牌＝上場 ${J(h0.ids) === J(want5)}（view.lineup ${h0.lineup}）、出一手後 ${h1 ? J(h1) === J(want5) : '打完了'}、滑入 ${slides.length}；${errTxt(page)}`);
    } catch (e) { record(2, size, false, 'exception ' + e.message); }
    await ctx.close();
  }
  // ---- 3 攤位收尾那一步
  if (want(3)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await start(page, { pos: 12, extra: 4 });
      if (await panelOpen(page)) await commit(page);
      await C(page, () => { const r = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent; window.__lab.jump(16); E.stallSession(r, Cn); window.__lab.money(r.money); window.__lab.go('night'); });
      await sleep(1200);
      const cs = await clearStall(page, { ms: 12000 });       // 旗標開：pending 停在上場那一步（clearStall 等不到攤位收掉＝timeout，照預期）
      const open = await panelOpen(page);
      const p0 = await C(page, () => { const p = window.__lab.run.pending; return p && { type: p.type, lu: !!p.lineup, done: p.k >= p.q.length, cur: p.cur, pick: p.lineup && p.lineup.pick }; });
      await openTitle(page, QL()); await jsClick(page, '[data-a=cont]'); await waitScreen(page, 'night', 15000);
      const re = await panelOpen(page);
      await tapReady(page, '.lb-sheet.lineup [data-slot="0"]'); await sleep(250);
      const inId = await C(page, () => { const t = document.querySelector('.lb-sheet.lineup .lu-bt:not(.on):not(.onb)'); return t && t.getAttribute('data-id'); });
      await tapReady(page, `.lb-sheet.lineup .lu-bt[data-id="${inId.replace(/"/g, '\\"')}"]`); await sleep(250);
      const sw = await C(page, () => [...document.querySelectorAll('.lb-sheet.lineup .lu-bt.on')].map(b => b.getAttribute('data-id')));
      await tapReady(page, '.lb-sheet.lineup [data-a=luAuto]'); await sleep(250);
      const back = await C(page, () => [...document.querySelectorAll('.lb-sheet.lineup .lu-bt.on')].map(b => b.getAttribute('data-id')).sort());
      await tapReady(page, '.lb-sheet.lineup [data-slot="0"]'); await sleep(200);
      await tapReady(page, `.lb-sheet.lineup .lu-bt[data-id="${inId.replace(/"/g, '\\"')}"]`); await sleep(250);
      await commit(page);
      const p1 = await C(page, () => { const r = window.__lab.run; return { pend: r.pending, lineup: r.lineup, due: r.lineupDue }; });
      const ok = open && re && p0 && p0.type === 'stall' && p0.lu && p0.done && !p0.cur && sw.includes(inId) && J(back) === J(p0.pick.slice().sort()) &&
        !p1.pend && p1.lineup && p1.lineup[0] === inId && !p1.due && !errs(page).length;
      record(3, size, ok, `攤位收掉後面板 ${open}（clearStall ${cs.ok ? 'ok' : cs.why}）、pending ${J(p0 && { type: p0.type, lu: p0.lu, done: p0.done })}、重新整理照畫 ${re}；換格 ${sw.includes(inId)}、幫我挑回預設 ${J(back) === J(p0.pick.slice().sort())}；送出 pending ${p1.pend ? 'X' : '清掉'}、第一格 ${p1.lineup && p1.lineup[0] === inId}；${errTxt(page)}`);
    } catch (e) { record(3, size, false, 'exception ' + e.message); }
    await ctx.close();
  }
  // ---- 4 耐聽記號
  if (want(4)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await start(page, { pos: 12 });
      if (await panelOpen(page)) await commit(page);
      await C(page, () => { const r = window.__lab.run; r.wear[r.lineup[0]] = { g: 0, n: 1 }; for (let i = 1; i < 5; i++) r.wear[r.lineup[i]] = { g: 6, n: 0 }; window.__lab.money(r.money); window.__lab.go('night'); });
      await sleep(900);
      const row = await C(page, () => ({ wn: document.querySelectorAll('.lb-lurow .lu-wn').length, al: document.querySelectorAll('.lb-lurow .lu-al').length }));
      await tapReady(page, '[data-a=go]'); await duelReady(page, 25000); await sleep(500);
      const hd = await C(page, () => ({ worn: document.querySelectorAll('.dl .hand .tile.worn .wn').length, al: document.querySelectorAll('.dl .hand .tile.almost .al').length }));
      await C(page, () => { const t = document.querySelector('.dl .hand .tile.worn .cvw'); if (t) t.click(); });
      await sleep(500);
      const chip = await C(page, () => {
        const b = [...document.querySelectorAll('.dl .pop .ab')].find(x => x.querySelector('.wn')); if (!b) return null;
        const R = e => { const r = e.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom }; };
        return { tx: b.textContent, wn: R(b.querySelector('.wn')), key: R(b.querySelector('b.key')) };
      });
      await C(page, () => window.__lab.autoplay('thoughtful', { until: 'duelEnd' }));
      await waitScreen(page, 'reward', 60000); await lootReady(page, 15000); await sleep(600);
      const rw = await C(page, () => { const p = window.__lab.run.pending; return { worn: p && p.worn, tx: (document.querySelector('.lb-sheet.reward .lb-worn') || {}).textContent || '' }; });
      const okRw = !!rw.worn && rw.worn.length >= 1 && rw.worn.every(x => rw.tx.includes('聽膩了（−' + x.n + '）'));
      await C(page, () => { const b = document.querySelector('.lt-sheet [data-a=skip]'); if (b) b.click(); });
      const back = await toNight(page);
      await jsClick(page, '.lb-lurow'); await sleep(600);
      const bag = await C(page, () => ({ ear: document.querySelectorAll('.lb-sheet.bag .lb-ear').length, on: document.querySelectorAll('.lb-sheet.bag .sdtag.lu').length, n: window.__lab.run.bag.length }));
      const ok = row.wn === 1 && row.al === 4 && hd.worn === 1 && hd.al >= 1 && !!chip && /−1/.test(chip.tx) && !inter(chip.wn, chip.key) && okRw && back && bag.ear === bag.n && bag.on === 5 && !errs(page).length;
      record(4, size, ok, `上場列 −1 ${row.wn}／黃點 ${row.al}；手牌 −1 ${hd.worn}／黃點 ${hd.al}；屬性鈕「${chip && chip.tx}」紅字不蓋星數 ${chip && !inter(chip.wn, chip.key)}；` +
        `領獎小字 ${okRw}（${rw.tx.slice(0, 40)}）；包包耐聽點 ${bag.ear}/${bag.n}、上場小籤 ${bag.on}；${errTxt(page)}`);
    } catch (e) { record(4, size, false, 'exception ' + e.message); }
    await ctx.close();
  }
  // ---- 5 賣掉上場那張 → 補空格
  if (want(5)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await start(page, { pos: 12, extra: 3 });
      if (await panelOpen(page)) await commit(page);
      const sold = await C(page, () => {
        const r = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent;
        const id = r.lineup.find(x => { const q = E.sellQuote(r, Cn, x); return q && q.ok && !q.reclaim; }) || r.lineup.find(x => { const q = E.sellQuote(r, Cn, x); return q && q.ok; });
        const res = E.choose(r, Cn, { type: 'sell', cardId: id }); window.__lab.money(r.money); window.__lab.go('night');
        return { id, ok: res.ok, err: res.error, due: r.lineupDue, left: r.lineup.length };
      });
      const open = await panelOpen(page);
      const t = await C(page, () => ({ h: (document.querySelector('.lb-sheet.lineup h3') || {}).textContent, lock: document.querySelectorAll('.lb-sheet.lineup .lu-slot.lock').length }));
      await commit(page);
      const r1 = await C(page, () => { const r = window.__lab.run; return { lineup: r.lineup.length, due: r.lineupDue }; });
      const due = await C(page, () => window.DipLabContent.lineup.ui.due);
      record(5, size, sold.ok && sold.due && sold.left === 4 && open && t.h === due && t.lock === 4 && r1.lineup === 5 && !r1.due && !errs(page).length,
        `賣掉上場那張 ${sold.ok}${sold.err ? '（' + sold.err + '）' : ''}、lineupDue ${sold.due}、剩 ${sold.left}；面板 ${open}「${t.h}」鎖 ${t.lock} 格；補完 ${r1.lineup} 張、due ${r1.due}；${errTxt(page)}`);
    } catch (e) { record(5, size, false, 'exception ' + e.message); }
    await ctx.close();
  }
  // ---- 6 替補格＋戰利品列換上場
  if (want(6)) {
    const { ctx, page } = await newPage(browser, w, h); await watch(page);
    try {
      await start(page, { pos: 12, extra: 3, seed: { relics: ['sleeve'] } });
      const open = await panelOpen(page);
      const slots = await C(page, () => document.querySelectorAll('.lb-sheet.lineup .lu-slot').length);
      await commit(page);
      const row = await C(page, () => ({ bench: window.__lab.run.bench.length, cells: document.querySelectorAll('.lb-lurow .cs.bn .lu-mini').length }));
      await tapReady(page, '[data-a=go]'); await duelReady(page, 25000); await sleep(400);
      await C(page, () => window.__lab.forceWin());
      await waitScreen(page, 'reward', 30000); await lootReady(page, 15000); await sleep(500);
      const inId = await C(page, () => { const b = document.querySelector('.lt-sheet [data-swap]'); return b && b.getAttribute('data-swap'); });
      if (inId) await tapReady(page, `.lt-sheet [data-swap="${inId.replace(/"/g, '\\"')}"]`);
      const sheet = await page.waitForSelector('.lb-sheet.float.luswap [data-out]', { timeout: 6000 }).then(() => true, () => false);
      const outId = await C(page, () => { const b = document.querySelector('.lb-sheet.float.luswap [data-out]'); return b && b.getAttribute('data-out'); });
      await C(page, () => { window.__toasts = []; });
      if (sheet) await tapReady(page, '.lb-sheet.float.luswap [data-out]');
      await sleep(700);
      const r1 = await C(page, () => window.__lab.run.lineup.slice());
      const sw = await C(page, N => window.DipLabContent.lineup.ui.swapped.replace('{album}', (window.DipLabContent.cards[N] || {}).album || ''), inId);
      const tw = await C(page, () => [...document.querySelectorAll('.lb-toast')].map(t => t.textContent)), tAdd = await toasts(page);   // 換好的吐司：有出過、0.7 秒後還在
      const back = await toNight(page);
      record(6, size, open && slots === 6 && row.bench === 1 && row.cells === 1 && !!inId && sheet && r1.includes(inId) && !r1.includes(outId) && back && tw.some(t => t.includes(sw)) && !errs(page).length,
        `替補：面板 ${slots} 格、上場列替補 ${row.cells}；戰利品列換上場 ${!!inId}、小面板 ${sheet}、換進 ${r1.includes(inId)}／換下 ${!r1.includes(outId)}、吐司 出過 ${tAdd.some(t => t.includes(sw))}／0.7 秒後還在 ${tw.some(t => t.includes(sw))}、回來客 ${back}；${errTxt(page)}`);
    } catch (e) { record(6, size, false, 'exception ' + e.message); }
    await ctx.close();
  }
  // ---- 7 第 6–10 位整包上場、不算耐聽；真的打完第 10 位 → 攤位 → 上場面板 → 第 11 位手牌＝那五張
  if (want(7)) {
    const { ctx, page } = await newPage(browser, w, h); await watch(page);
    try {
      await start(page, { pos: 6 });
      const fr = await C(page, () => { const E = window.DipLabEngine, Cn = window.DipLabContent;
        return { first: E.newRun(Cn, { seedKey: 'x', runNo: 1, ace: 'pearl', firstRun: true }).lineupFrom, second: E.newRun(Cn, { seedKey: 'x', runNo: 2, ace: 'pearl' }).lineupFrom, want1: Cn.lineup.firstRunFrom, want2: Cn.lineup.from, run: window.__lab.run.lineupFrom }; });
      const n6 = await C(page, () => ({ panel: !!document.querySelector('.lb-sheet.lineup'), row: !!document.querySelector('.lb-lurow'), due: window.__lab.run.lineupDue, lineup: window.__lab.run.lineup, bag: window.__lab.run.bag.length }));
      await goFight(page); await sleep(400);
      const d6 = await C(page, () => { const v = window.__lab.duel(), d = window.__lab.rawDuel(); window.__slides = [];
        return { lineup: !!v.lineup, wearOn: !!d.wearOn, plays: 'plays' in d.p, pool: d.p.hand.filter(Boolean).length + d.p.draw.length + d.p.disc.length }; });
      const id6 = await C(page, () => window.__lab.duel().hand[0].id);
      await playId(page, id6); await sleep(300);
      const sl6 = await C(page, () => window.__slides.slice());
      await C(page, () => { if (window.__lab.screen() === 'duel' && window.__lab.rawDuel() && !window.__lab.rawDuel().over) window.__lab.forceWin(); });
      await toReward(page);
      const w6 = await C(page, () => ({ wear: window.__lab.run.wear, worn: (window.__lab.run.pending || {}).worn || null }));
      await passLoot(page);
      // 第 10 位（第 2 輪藏家）：打完 → 換輪 → 攤位 → 上場那一步
      await C(page, () => window.__lab.jump(10)); await waitScreen(page, 'night'); await sleep(1200);
      const n10 = await C(page, () => ({ panel: !!document.querySelector('.lb-sheet.lineup'), row: !!document.querySelector('.lb-lurow') }));
      await goFight(page); await sleep(400);
      const d10 = await C(page, () => { const v = window.__lab.duel(), d = window.__lab.rawDuel(); return { lineup: !!v.lineup, wearOn: !!d.wearOn }; });
      await C(page, () => window.__lab.forceWin());
      await toReward(page);
      await passLoot(page);
      const out = await stallOut(page);
      const p0 = await C(page, () => { const r = window.__lab.run, p = r.pending; return { pos: r.pos, type: p && p.type, pick: p && p.lineup ? p.lineup.pick : null, pol: window.DipLabEngine.lineupPolicy(r, window.DipLabContent).ids,
        slots: [...document.querySelectorAll('.lb-sheet.lineup .lu-slot')].map(b => b.getAttribute('aria-label')) }; });
      const ids0 = await C(page, () => window.__lab.run.pending.lineup.pick.slice());
      await commit(page);
      const r11 = await C(page, () => ({ lineup: window.__lab.run.lineup, pend: !!window.__lab.run.pending, pos: window.__lab.run.pos }));
      await goFight(page); await sleep(400);
      const h0 = await C(page, () => { const v = window.__lab.duel(), d = window.__lab.rawDuel(); window.__slides = []; return { lineup: !!v.lineup, wearOn: !!d.wearOn, ids: v.hand.filter(Boolean).map(c => c.id).sort() }; });
      const id11 = await C(page, () => window.__lab.duel().hand[2].id);
      await playId(page, id11); await sleep(300);
      const h1 = await C(page, () => { const v = window.__lab.duel(); return { ids: v ? v.hand.filter(Boolean).map(c => c.id).sort() : null, slides: window.__slides.slice() }; });
      const okFrom = fr.first === fr.want1 && fr.second === fr.want2 && fr.run === fr.want2 && fr.want1 === 11;
      const ok6 = !n6.panel && !n6.row && !n6.due && n6.lineup === null && !d6.lineup && !d6.wearOn && !d6.plays && d6.pool === n6.bag && sl6.length >= 1 && J(w6.wear) === '{}' && !w6.worn;
      const ok10 = !n10.panel && !n10.row && !d10.lineup && !d10.wearOn && out === 'panel' && p0.pos === 11 && p0.type === 'stall' && J(p0.pick) === J(p0.pol) && p0.slots.length === 5;
      const ok11 = J(r11.lineup) === J(ids0) && !r11.pend && h0.lineup && h0.wearOn && J(h0.ids) === J(sorted(ids0)) && J(h1.ids) === J(sorted(ids0)) && !h1.slides.length;
      record(7, size, okFrom && ok6 && ok10 && ok11 && !errs(page).length,
        `lineupFrom 新帳號 ${fr.first}／第二趟 ${fr.second}（content ${fr.want1}／${fr.want2}）；第 6 位 面板 ${n6.panel}、上場列 ${n6.row}、手牌池 ${d6.pool}/${n6.bag}（整包）、view.lineup ${d6.lineup}、wearOn ${d6.wearOn}、滑入 ${sl6.length}（對照組）、` +
        `出牌後 wear ${J(w6.wear)}；第 10 位 面板 ${n10.panel}、wearOn ${d10.wearOn}；打完 → 攤位 → ${out}（第 ${p0.pos} 位）、預設＝pick＝lineupPolicy ${J(p0.pick) === J(p0.pol)}、5 格 ${p0.slots.length}；` +
        `就這五張 → 第 ${r11.pos} 位手牌＝上場 ${J(h0.ids) === J(sorted(ids0))}、wearOn ${h0.wearOn}、出一手後 ${J(h1.ids) === J(sorted(ids0))}、滑入 ${h1.slides.length}；${errTxt(page)}`);
    } catch (e) { record(7, size, false, 'exception ' + e.message); }
    await ctx.close();
  }
  // ---- 8 前期省一下（包包 6 張）
  if (want(8)) {
    const { ctx, page } = await newPage(browser, w, h); await watch(page);
    try {
      await start(page, { pos: 12, bag: 6 });
      const quietTx = await C(page, () => window.DipLabContent.lineup.ui.quiet);
      await sleep(1500);
      const a = await C(page, () => { const r = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent;
        return { bag: r.bag.length, panel: !!document.querySelector('.lb-sheet.lineup'), lineup: r.lineup, due: r.lineupDue, row: !!document.querySelector('.lb-lurow'), go: !!document.querySelector('[data-a=go]') }; });
      const t1 = await toasts(page);
      // 攤位那一步（換輪＝第 16 位）：pending.lineup.quiet → 逛完不出面板、吐司、pending 清掉、上場＝lineupPolicy
      await C(page, () => { window.__toasts = []; });
      const st = await stallAt(page, 16); await sleep(1200);
      const pol16 = await C(page, () => { const r = window.__lab.run; return r.pending && r.pending.lineup ? r.pending.lineup.pick.slice() : null; });
      const out = await stallOut(page);
      await sleep(1200);
      const b = await C(page, () => { const r = window.__lab.run; return { pend: !!r.pending, panel: !!document.querySelector('.lb-sheet.lineup'), lineup: r.lineup, due: r.lineupDue }; });
      const t2 = await toasts(page);
      // 包包 6 張但有一張聽膩 → 照樣出面板（第 21 位換輪）
      await C(page, () => { const r = window.__lab.run; r.wear[r.bag[r.bag.length - 1]] = { g: 0, n: 1 }; window.__lab.money(r.money); });
      const st3 = await stallAt(page, 21); await sleep(1200);
      const out3 = await stallOut(page);
      const pol = a.lineup;
      const okA = a.bag === 6 && !a.panel && Array.isArray(a.lineup) && a.lineup.length === 5 && !a.due && a.row && a.go && t1.some(x => x.includes(quietTx));
      const okB = st.lu && st.quiet && out === 'night' && !b.pend && !b.panel && J(b.lineup) === J(pol16) && !b.due && t2.some(x => x.includes(quietTx));
      const okC = st3.lu && !st3.quiet && out3 === 'panel';
      record(8, size, okA && okB && okC && !errs(page).length,
        `包包 ${a.bag} 張、lineupDue：面板 ${a.panel}、上場 ${a.lineup && a.lineup.length} 張、吐司 ${t1.some(x => x.includes(quietTx))}；攤位那一步 quiet ${st.quiet} → ${out}、面板 ${b.panel}、pending ${b.pend}、上場＝pick ${J(b.lineup) === J(pol16)}、吐司 ${t2.some(x => x.includes(quietTx))}；` +
        `有一張聽膩 → quiet ${st3.quiet}、${out3}；${errTxt(page)}`);
    } catch (e) { record(8, size, false, 'exception ' + e.message); }
    await ctx.close();
  }
  // ---- 9 真的出牌：6 次黃點、7 次 −1、14 次 −2、21 次不再扣；重新整理照留
  if (want(9)) {
    const { ctx, page } = await newPage(browser, w, h); await watch(page);
    try {
      await start(page, { pos: 12 });
      if (await panelOpen(page)) await commit(page);
      const X = await C(page, () => window.__lab.run.lineup[0]);
      const base = await C(page, X => { const c = window.DipLabContent.cards[X] || window.DipLabEngine.cardOf(window.DipLabContent, X), E = window.DipLabEngine; const a = E.topAttr(c); return { a, s: c[a], album: c.album }; }, X);
      await C(page, () => window.__lab.force({ kind: 'counter', toE: 1, toP: 0 }));
      const wearOf = () => C(page, X => window.__lab.run.wear[X] || null, X);
      const steps = [];
      // 第 12 位：出 6 次（打滿 6 手、比聲望你贏）
      const f1 = await fightPlays(page, X, 6); const w1 = await wearOf(); const r1 = await rewardWorn(page);
      steps.push(`12 位出 ${f1.played} 次 → ${J(w1)}、小字 ${r1.worn ? 'X' : '無'}`);
      await passLoot(page); await toNight(page);
      const al = await C(page, X => { const r = window.__lab.run, k = r.lineup.indexOf(X), m = document.querySelectorAll('.lb-lurow .cs .lu-mini')[k]; return !!(m && m.querySelector('.lu-al')); }, X);
      // 第 13 位：手牌黃點 → 出第 7 次 → 聽膩一層
      await goFight(page); await sleep(300);
      const hAl = await C(page, X => { const t = document.querySelector(`.dl .hand .tile[data-card="${X.replace(/"/g, '\\"')}"]`); return { al: !!(t && t.classList.contains('almost') && t.querySelector('.al')), worn: !!(t && t.classList.contains('worn')) }; }, X);
      await choosable(page);
      const p7 = await playId(page, X);
      await C(page, () => { if (window.__lab.screen() === 'duel' && window.__lab.rawDuel() && !window.__lab.rawDuel().over) window.__lab.forceWin(); });
      await toReward(page);
      const w2 = await wearOf(); const r2 = await rewardWorn(page);
      const got1 = await C(page, ([X, n]) => window.DipLabContent.wear.ui.got.replace('{album}', window.DipLabContent.cards[X] ? window.DipLabContent.cards[X].album : '').replace('{n}', n), [X, 1]);
      steps.push(`13 位黃點 ${hAl.al} → 第 7 次 → ${J(w2)}、小字「${r2.tx.slice(0, 30)}」`);
      await passLoot(page); await toNight(page);
      const b1 = await bagTile(page, X); await closeBag(page);
      // 第 14 位：手牌紅字 −1、主打軸 −1 星；屬性鈕紅字不蓋星數；出 6 次
      await goFight(page); await sleep(300);
      const h14 = await C(page, ([X, a]) => {
        const v = window.__lab.duel(), c = v.hand.find(x => x && x.id === X), t = document.querySelector(`.dl .hand .tile[data-card="${X.replace(/"/g, '\\"')}"]`);
        return { worn: c && c.worn, star: c && c[a], axis: c && c.wornAxis, wn: t && t.querySelector('.wn') ? t.querySelector('.wn').textContent : '', sk: !!(t && t.querySelector('.sk')), al: !!(t && t.querySelector('.al')) };
      }, [X, base.a]);
      await C(page, X => { const t = document.querySelector(`.dl .hand .tile[data-card="${X.replace(/"/g, '\\"')}"] .cvw`); if (t) t.click(); }, X); await sleep(500);
      const chip = await C(page, () => {
        const b = [...document.querySelectorAll('.dl .pop .ab')].find(x => x.querySelector('.wn')); if (!b) return null;
        const R = e => { const r = e.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom }; };
        return { a: b.getAttribute('data-a'), tx: b.textContent, wn: R(b.querySelector('.wn')), key: R(b.querySelector('b.key')) };
      });
      let pl = 0; for (let j = 0; j < 6; j++) { if ((await playId(page, X)) < 0) break; pl++; }
      await toReward(page);
      const w3 = await wearOf(); const r3 = await rewardWorn(page);
      steps.push(`14 位 −${h14.worn}（${base.a} ${base.s}→${h14.star}）出 ${pl} 次 → ${J(w3)}、小字 ${r3.worn ? 'X' : '無'}`);
      await passLoot(page); await toNight(page);
      // 第 15 位（藏家）：出第 14 次 → −2、7 點全暗
      const f4 = await fightPlays(page, X, 1); const w4 = await wearOf(); const r4 = await rewardWorn(page);
      steps.push(`15 位出 ${f4.played} 次 → ${J(w4)}、小字「${r4.tx.slice(0, 30)}」`);
      await passLoot(page);
      const out = await stallOut(page);            // 換輪：X 這一輪有上場＝不是坐板凳，聽膩照留
      const pt = await panelTile(page, X);
      const put = await panelPut(page, X);
      await commit(page);
      // 第 16 位：−2、沒有黃點（最多層）；出 6 次；第 17 位出 1 次＝第 21 次：不再扣
      await goFight(page); await sleep(300);
      const h16 = await C(page, ([X, a]) => { const v = window.__lab.duel(), c = v.hand.find(x => x && x.id === X), t = document.querySelector(`.dl .hand .tile[data-card="${X.replace(/"/g, '\\"')}"]`);
        return { worn: c && c.worn, star: c && c[a], wn: t && t.querySelector('.wn') ? t.querySelector('.wn').textContent : '', al: !!(t && t.querySelector('.al')) }; }, [X, base.a]);
      pl = 0; for (let j = 0; j < 6; j++) { if ((await playId(page, X)) < 0) break; pl++; }
      await toReward(page);
      const w5 = await wearOf(); const r5 = await rewardWorn(page);
      await passLoot(page); await toNight(page);
      const f6 = await fightPlays(page, X, 1); const w6 = await wearOf(); const r6 = await rewardWorn(page);
      steps.push(`16 位 −${h16.worn}（${base.s}→${h16.star}）出 ${pl} 次 → ${J(w5)}；17 位出 ${f6.played} 次 → ${J(w6)}、小字 ${r6.worn ? 'X' : '無'}`);
      await passLoot(page); await toNight(page);
      await C(page, () => window.__lab.force(null));
      // 重新整理：聽膩、格數照留；上場列 −2
      await reload(page);
      const rl = await C(page, X => { const r = window.__lab.run, k = r.lineup.indexOf(X), m = document.querySelectorAll('.lb-lurow .cs .lu-mini')[k]; return { wear: r.wear[X], wn: m && m.querySelector('.lu-wn') ? m.querySelector('.lu-wn').textContent : '' }; }, X);
      const b2 = await bagTile(page, X); await closeBag(page);
      const okA = J(w1) === J({ g: 6, n: 0 }) && !r1.worn && al && hAl.al && !hAl.worn;
      const okB = J(w2) === J({ g: 0, n: 1 }) && J(r2.worn) === J([{ id: X, n: 1 }]) && r2.tx.includes(got1) && b1.on === 7 && b1.dots === 7 && b1.wn === '−1' && !b1.clash;
      const okC = h14.worn === 1 && h14.star === Math.max(1, base.s - 1) && h14.axis === base.a && h14.wn === '−1' && h14.sk && !h14.al && !!chip && chip.a === base.a && /−1/.test(chip.tx) && !inter(chip.wn, chip.key) && pl >= 0 &&
        J(w3) === J({ g: 6, n: 1 }) && !r3.worn;
      const okD = J(w4) === J({ g: 7, n: 2 }) && J(r4.worn) === J([{ id: X, n: 2 }]) && r4.tx.includes('（−2）') && out === 'panel' && !!pt && pt.on === 0 && pt.worn && pt.wn === '−2' && put;
      const okE = h16.worn === 2 && h16.star === Math.max(1, base.s - 2) && h16.wn === '−2' && !h16.al && J(w5) === J({ g: 7, n: 2 }) && !r5.worn && J(w6) === J({ g: 7, n: 2 }) && !r6.worn;
      const okF = J(rl.wear) === J({ g: 7, n: 2 }) && rl.wn === '−2' && b2.on === 0 && b2.wn === '−2' && !b2.clash;
      record(9, size, okA && okB && okC && okD && okE && okF && !errs(page).length,
        `${steps.join('；')}；上場列黃點 ${al}；包包 −1 時亮 ${b1.on}/${b1.dots}、紅字不蓋星數 ${!b1.clash}；屬性鈕 ${chip && chip.a}「${chip && chip.tx}」不相交 ${chip && !inter(chip.wn, chip.key)}、斜紋 ${h14.sk}；` +
        `換輪面板 ${out} 亮 ${pt && pt.on}「${pt && pt.wn}」；重新整理 ${J(rl.wear)}「${rl.wn}」、包包亮 ${b2.on}；[A${okA ? '✓' : '✗'} B${okB ? '✓' : '✗'} C${okC ? '✓' : '✗'} D${okD ? '✓' : '✗'} E${okE ? '✓' : '✗'} F${okF ? '✓' : '✗'}]；${errTxt(page)}`);
    } catch (e) { record(9, size, false, 'exception ' + e.message); }
    await ctx.close();
  }
  // ---- 10 坐板凳回滿
  if (want(10)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await start(page, { pos: 15, extra: 2 });
      const open = await panelOpen(page);
      const ids = await C(page, () => { const r = window.__lab.run, L = window.DipLabEngine.lineupPolicy(r, window.DipLabContent).ids; return { X: r.bag.find(id => L.indexOf(id) < 0), Y: L[0] }; });
      await commit(page);
      await C(page, o => { const r = window.__lab.run; r.wear[o.X] = { g: 3, n: 1 }; r.wear[o.Y] = { g: 2, n: 1 }; window.__lab.money(r.money); }, ids);
      await reload(page);
      const a = await C(page, o => { const r = window.__lab.run; return { X: r.wear[o.X], Y: r.wear[o.Y], rested: r.rested.includes(o.X), inLu: r.lineup.includes(o.X), panel: !!document.querySelector('.lb-sheet.lineup') }; }, ids);
      const restTx = await C(page, () => window.DipLabContent.wear.ui.resting);
      const bx = await bagTile(page, ids.X); await closeBag(page);
      const by = await bagTile(page, ids.Y); await closeBag(page);
      await goFight(page); await sleep(300);
      await C(page, () => window.__lab.forceWin());
      await toReward(page);
      await passLoot(page);
      const out = await stallOut(page);
      const b = await C(page, o => { const r = window.__lab.run; return { X: r.wear[o.X] || null, Y: r.wear[o.Y] || null, pos: r.pos }; }, ids);
      const px = await panelTile(page, ids.X), py = await panelTile(page, ids.Y);
      const ok = open && J(a.X) === J({ g: 3, n: 1 }) && J(a.Y) === J({ g: 2, n: 1 }) && a.rested && !a.inLu && !a.panel && bx.rest === restTx && bx.wn === '−1' && !by.rest &&
        out === 'panel' && b.pos === 16 && b.X === null && J(b.Y) === J({ g: 2, n: 1 }) && !!px && px.on === 7 && !px.worn && !!py && py.worn && py.wn === '−1' && !errs(page).length;
      record(10, size, ok, `板凳那張 ${J(a.X)}（rested ${a.rested}、上場 ${a.inLu}）重新整理照留；包包「${bx.rest}」${bx.wn}、上場那張休息標 ${by.rest ? 'X' : '無'}；打完第 15 位 → 換輪 ${out}（第 ${b.pos} 位）：` +
        `板凳那張 ${J(b.X)}、面板亮 ${px && px.on}/7 −${px && px.worn ? 'X' : '0'}；上場那張 ${J(b.Y)}「${py && py.wn}」；${errTxt(page)}`);
    } catch (e) { record(10, size, false, 'exception ' + e.message); }
    await ctx.close();
  }
  // ---- 11 說情重打不算
  if (want(11)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await start(page, { pos: 12 });
      if (await panelOpen(page)) await commit(page);
      const X = await C(page, () => window.__lab.run.lineup[0]);
      await C(page, () => window.__lab.force({ kind: 'counter', toE: 1, toP: 0 }));
      await goFight(page); await sleep(300);
      const d0 = await C(page, () => ({ wearOn: !!window.__lab.rawDuel().wearOn, left: window.__lab.run.retryLeft }));
      let p1 = 0; for (let j = 0; j < 3; j++) { if ((await playId(page, X)) < 0) break; p1++; }
      await C(page, () => window.__lab.forceLose());
      const menu = await page.waitForSelector('.lb-dq.hasmenu .lb-dqopt[data-i="0"]', { timeout: 20000 }).then(() => true, () => false);
      const w0 = await C(page, X => ({ wear: window.__lab.run.wear[X] || null, pend: (window.__lab.run.pending || {}).type }), X);
      await sleep(450);
      await jsClick(page, '.lb-dq .lb-dqopt[data-i="0"]');
      await duelReady(page, 25000); await sleep(300);
      const d1 = await C(page, () => { const d = window.__lab.rawDuel(); return { wearOn: !!d.wearOn, plays: !!d.p.plays, pos: window.__lab.run.pos, wearPos: window.__lab.run.wearPos }; });
      let p2 = 0; for (let j = 0; j < 4; j++) { if ((await playId(page, X)) < 0) break; p2++; }
      await C(page, () => { if (window.__lab.screen() === 'duel' && window.__lab.rawDuel() && !window.__lab.rawDuel().over) window.__lab.forceWin(); });
      await toReward(page);
      const w1 = await C(page, X => window.__lab.run.wear[X] || null, X); const rw = await rewardWorn(page);
      await C(page, () => window.__lab.force(null));
      record(11, size, d0.wearOn && p1 === 3 && menu && J(w0.wear) === J({ g: 3, n: 0 }) && w0.pend === 'retry' && !d1.wearOn && !d1.plays && d1.wearPos === d1.pos && p2 === 4 && J(w1) === J({ g: 3, n: 0 }) && !rw.worn && !rw.tx && !errs(page).length,
        `第一場 wearOn ${d0.wearOn} 出 ${p1} 次 → 輸 → ${J(w0)}；說情 ${menu} → 重打 wearOn ${d1.wearOn}、plays ${d1.plays} 出 ${p2} 次 → 打完 ${J(w1)}、領獎小字 ${rw.worn ? 'X' : '無'}；${errTxt(page)}`);
    } catch (e) { record(11, size, false, 'exception ' + e.message); }
    await ctx.close();
  }
  // ---- 12 替補（benchMode 'worn'）：聽膩自動頂上；不膩不換；樂歷 Lv3 也有替補格
  if (want(12)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await start(page, { pos: 12, extra: 3, seed: { relics: ['sleeve'] } });
      const open = await panelOpen(page);
      const mode = await C(page, () => window.DipLabContent.lineup.benchMode);
      await commit(page);
      const s0 = await C(page, () => { const r = window.__lab.run; return { L: r.lineup.slice(), B: r.bench.slice() }; });
      await C(page, L0 => { const r = window.__lab.run; r.wear[L0] = { g: 0, n: 1 }; window.__lab.money(r.money); window.__lab.go('night'); }, s0.L[0]);
      await sleep(1000);
      const row = await C(page, () => ({ bh: (document.querySelector('.lu-bh') || {}).textContent || '', want: window.DipLabContent.lineup.ui.benchHint, cells: document.querySelectorAll('.lb-lurow .cs.bn .lu-mini').length }));
      await goFight(page); await sleep(300);
      const s1 = await C(page, () => { const r = window.__lab.run, v = window.__lab.duel(); return { L: r.lineup.slice(), B: r.bench.slice(), auto: (r.stats || {}).benchAuto | 0, hand: v.hand.filter(Boolean).map(c => c.id).sort() }; });
      await C(page, () => window.__lab.forceWin());
      await toReward(page);
      await passLoot(page); await toNight(page);
      const rowB = await C(page, () => { const m = document.querySelector('.lb-lurow .cs.bn .lu-mini'); return !!(m && m.querySelector('.lu-wn')); });
      await goFight(page); await sleep(300);
      const s2 = await C(page, () => { const r = window.__lab.run, v = window.__lab.duel(); return { L: r.lineup.slice(), B: r.bench.slice(), auto: (r.stats || {}).benchAuto | 0, hand: v.hand.filter(Boolean).map(c => c.id).sort() }; });
      await C(page, () => window.__lab.forceWin());
      await toReward(page);
      // 樂歷 Lv3（run.lineupBonus 1、沒有側袋）：面板也是 6 格
      await start(page, { pos: 12, extra: 3, patch: { lineupBonus: 1 } });
      const lv = await C(page, () => ({ bn: window.DipLabEngine.benchN(window.__lab.run, window.DipLabContent), slots: document.querySelectorAll('.lb-sheet.lineup .lu-slot').length, relic: window.__lab.run.relics.includes('sleeve') }));
      const ok = open && mode === 'worn' && s0.B.length === 1 && row.bh === row.want && row.cells === 1 &&
        s1.L.includes(s0.B[0]) && !s1.L.includes(s0.L[0]) && J(s1.B) === J([s0.L[0]]) && s1.auto === 1 && J(s1.hand) === J(sorted(s1.L)) && s1.hand.length === 5 &&
        rowB && J(s2.L) === J(s1.L) && J(s2.B) === J(s1.B) && s2.auto === 1 && J(s2.hand) === J(sorted(s2.L)) && lv.bn === 1 && lv.slots === 6 && !lv.relic && !errs(page).length;
      record(12, size, ok, `benchMode ${mode}；上場列替補 ${row.cells} 格、小字「${row.bh}」；上場那張聽膩 → 開打前頂上 ${s1.L.includes(s0.B[0])}、換下去 ${J(s1.B) === J([s0.L[0]])}、benchAuto ${s1.auto}、手牌 ${s1.hand.length} 張＝上場 ${J(s1.hand) === J(sorted(s1.L))}；` +
        `下一位不換 ${J(s2.L) === J(s1.L)}（替補格 −1 ${rowB}）；樂歷 Lv3 替補 ${lv.bn}、面板 ${lv.slots} 格；${errTxt(page)}`);
    } catch (e) { record(12, size, false, 'exception ' + e.message); }
    await ctx.close();
  }
  // ---- 13 一輪中途收新唱片 → 包包面板換上場
  if (want(13)) {
    const { ctx, page } = await newPage(browser, w, h); await watch(page);
    try {
      await start(page, { pos: 12 });
      if (await panelOpen(page)) await commit(page);
      await goFight(page); await sleep(300);
      await C(page, () => window.__lab.forceWin());
      const lt = await passLoot(page, { take: true, until: 'choice' });
      await toNight(page);
      const N = lt.picked;
      const a = await C(page, N => { const r = window.__lab.run; return { fresh: r.lineupFresh.slice(), inBag: r.bag.includes(N), inLu: r.lineup.includes(N), L: r.lineup.slice() }; }, N);
      const bt = await bagTile(page, N);
      const sel = N ? `.lb-sheet.bag [data-swap="${N.replace(/"/g, '\\"')}"]` : null;
      if (sel) await tapReady(page, sel);
      const sheet = await page.waitForSelector('.lb-sheet.float.luswap [data-out]', { timeout: 6000 }).then(() => true, () => false);
      const outId = await C(page, () => { const b = document.querySelector('.lb-sheet.float.luswap [data-out]'); return b && b.getAttribute('data-out'); });
      await C(page, () => { window.__toasts = []; });
      if (sheet) await tapReady(page, '.lb-sheet.float.luswap [data-out]');
      await sleep(700);
      const b = await C(page, N => { const r = window.__lab.run, row = document.querySelector('.lb-lurow'); return { L: r.lineup.slice(), row: row ? row.getAttribute('aria-label') : '' }; }, N);
      const sw = await C(page, N => window.DipLabContent.lineup.ui.swapped.replace('{album}', (window.DipLabContent.cards[N] || {}).album || ''), N);
      const tw = await C(page, () => [...document.querySelectorAll('.lb-toast')].map(t => t.textContent));   // 0.7 秒後還在畫面上
      const tAdd = await toasts(page);                                                                        // 有出過（MutationObserver）
      await goFight(page); await sleep(300);
      const hand = await C(page, () => window.__lab.duel().hand.filter(Boolean).map(c => c.id).sort());
      const album = await C(page, N => (window.DipLabContent.cards[N] || {}).album || '', N);
      const ok = !!N && a.inBag && !a.inLu && a.fresh.includes(N) && bt.sw && J(bt.sws) === J([N]) && sheet && b.L.includes(N) && !b.L.includes(outId) && b.L.length === 5 && b.row.includes(album) &&
        tw.some(t => t.includes(sw)) && J(hand) === J(sorted(b.L)) && !errs(page).length;
      record(13, size, ok, `收這張 ${N ? 'ok' : 'X'}（lineupFresh ${a.fresh.includes(N)}）；包包面板換上場鈕 ${J(bt.sws && bt.sws.length)} 顆、只有新的那張 ${J(bt.sws) === J([N])}；小面板 ${sheet} → 換進 ${b.L.includes(N)}／換下 ${!b.L.includes(outId)}、吐司 出過 ${tAdd.some(t => t.includes(sw))}／0.7 秒後還在 ${tw.some(t => t.includes(sw))}；` +
        `下一位手牌＝上場 ${J(hand) === J(sorted(b.L))}；${errTxt(page)}`);
    } catch (e) { record(13, size, false, 'exception ' + e.message); }
    await ctx.close();
  }
  // ---- 14 退版：上場那一步的存檔 → 上一版頁面
  if (want(14)) {
    const { ctx, page } = await newPage(browser, w, h); await servePrev(ctx);
    try {
      if (!prevFile('index.html') || !prevFile('ui.js')) throw new Error(`上一版頁面拿不到（git show ${PREV}:game-lab/…；設 LINEUP_PREV）`);
      await start(page, { pos: 12, extra: 4 });
      if (await panelOpen(page)) await commit(page);
      await stallAt(page, 16); await sleep(1200);
      const out0 = await stallOut(page);
      const s0 = await C(page, () => { const r = window.__lab.run, p = r.pending; return { lu: !!(p && p.lineup), done: !!p && p.k >= p.q.length, cur: p && p.cur, due: r.lineupDue, pos: r.pos }; });
      // 上一版頁面
      await openTitle(page, QP());
      const c0 = await C(page, () => ({ cont: !!document.querySelector('[data-a=cont]'), run: !!window.__lab.run, ver: [...document.scripts].map(s => s.src).filter(s => /ui\.js/.test(s)).join() }));
      await jsClick(page, '[data-a=cont]');
      const night = await page.waitForFunction(() => window.__lab && window.__lab.screen() === 'night' && !!document.querySelector('[data-a=go]') && !(window.__lab.run && window.__lab.run.pending), null, { timeout: 20000 }).then(() => true, () => false);
      const c1 = await C(page, () => { const r = window.__lab.run; return { run: !!r, over: r && r.over, pend: r && r.pending ? r.pending.type : null, pos: r && r.pos, scr: window.__lab.screen() }; });
      const prevErr = errs(page).slice(); page._errors.length = 0;
      // 回新頁面：lineupDue 照開面板
      await openTitle(page, QL()); await jsClick(page, '[data-a=cont]'); await waitScreen(page, 'night', 15000);
      const re = await panelOpen(page);
      const d1 = await C(page, () => ({ due: window.__lab.run.lineupDue, pend: !!window.__lab.run.pending }));
      if (re) await commit(page);
      const L = await C(page, () => window.__lab.run.lineup);
      record(14, size, out0 === 'panel' && s0.lu && s0.done && !s0.cur && c0.cont && c0.run && /game-lab-prev\/ui\.js/.test(c0.ver) && night && c1.run && !c1.over && !c1.pend && c1.pos === s0.pos && !prevErr.length &&
        re && d1.due && !d1.pend && Array.isArray(L) && L.length === 5 && !errs(page).length,
        `存檔停在上場那一步 ${out0}（${J(s0)}）；上一版頁面 ${J({ cont: c0.cont, run: c0.run, ver: (c0.ver.match(/\?v=\d+/) || [''])[0] })} → 回來客 ${night} ${J(c1)}、主控台 ${prevErr.length}${prevErr.length ? '：' + prevErr.slice(0, 2).join(' / ').slice(0, 160) : ''}；` +
        `回新頁面 lineupDue ${d1.due} → 面板 ${re}、上場 ${L && L.length} 張；${errTxt(page)}`);
    } catch (e) { record(14, size, false, 'exception ' + e.message); }
    await ctx.close();
  }
}

const browser = await launch();
for (const [w, h] of SIZES) await runSize(browser, w, h);
await browser.close();
const fail = results.filter(r => !r.ok);
console.log(`\n${results.length - fail.length}/${results.length} 通過`);
process.exit(fail.length ? 1 : 0);
