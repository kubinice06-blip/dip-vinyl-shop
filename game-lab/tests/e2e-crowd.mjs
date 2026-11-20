// game-lab/tests/e2e-crowd.mjs：活店第一階段 e2e（SPEC-H §12.4：LC1–LC10、LC16–LC20；棒 5）。網址一律帶 ?crowd=1（自動化瀏覽器預設關活店，§11.1）。
//   需要靜態伺服器：cd dip-vinyl-shop && python3 -m http.server 8765
//   LAB_BASE=http://localhost:8776 LAB_SIZES=390x664 node game-lab/tests/e2e-crowd.mjs
//
// 環境變數（另見 e2e-lib.mjs：LAB_URL／LAB_BASE、LAB_SIZES）：
//   LAB_LC      只跑這幾項（例 2,8；2A／2B＝只跑 LC2 的 60 秒那段／連 10 位門事件那段（LC3 跟著 2A）；TAPS＝e2e-taps #1／#4 在活店開著時再跑一次；SHOTS＝給店主的截圖）。沒給＝照尺寸跑全套
//   LAB_FULL    跑全套的尺寸（預設 390x664,375x548）；其他尺寸（430x932、360x640）只跑 LC8＋截圖（§12.4）
//   LAB_SHOTS   截圖／影片放哪（預設 系統暫存/e2e-crowd-shots）；LAB_VIDEO=1 另錄一段 12 秒來客畫面（390×664，crowd.webm）
//   LAB_BROWSER webkit＝只跑 LC2 的門事件那段（「每畫面 8 秒就按下一位」連 LAB_N 位，預設 10；iOS Safari 沒有 requestIdleCallback，§10 退路）
//
// 每一項印 PASS／FAIL；任何 FAIL → exit 1。主控台 0 錯誤算在每一項裡（擋 lore.json 那一段的「Failed to load resource」是瀏覽器印的，不算）。
//
//   LC1  第一次玩：標題、序章每一拍、收尾、第一趟第 1 位：w1–w3 全藏
//   LC2  來客畫面 60 秒（200 ms 取樣、fast）：10 秒內有門事件、有人換站、有人推門離開；≤3 人；老闆以外沒有人在口袋裡；停著的兩兩、跟 p／f／o ≥38×44；
//        走動的人 y≤250；主線客人與老闆走路的每一格沒有停著的人跟他身體框疊；平均人數 1.5–2.1。另：每畫面 8 秒就按下一位連 10 位，每個來客畫面 10 秒內都有門事件（WebKit 也跑這段）
//   LC3  門：兩次晃門 ≥1.1 秒；主線客人走進來那段沒有路人用門；路人用門不響鈴
//   LC4  點人：泡泡、名字、在舞台框內、不碰面板；fast=0：▼ 15 秒還在、最後一句 ≥5.9 秒；點 ▼＝下一句不開抽屜；最後一句時真點底下那張＝照常生效、泡泡收；點別的箱子＝泡泡收、照常走去翻
//   LC5  點走動中的人：停下、轉向、出泡泡、之後接著走；腳底 y<150 點下去不開聊天
//   LC6  輪替：連點 3 段不同、第 4 下 busy、第 5 下只冒汗；save.regulars.n 累加；重新整理 seen 還在；同一趟第二次遇到不再講 again
//   LC7  讓位（freezeAt c-soul 點 SOUL）與借過（freezeAt c-world 點 ROCK）
//   LC8  對決與領獎：開打先清切頭的、擋路的；老闆兩段路沒人；430×932 整個在橫條裡的人還在；領獎站著不動；回來客繼續走
//   LC9  攤位：原地照翻、沒人用門；宵夜老闆那段與 stSnack 沒人；同業站主放到 regular 時那格沒人；站主出場時沒人跟他身體框疊
//   LC10 周姐：摘句＝lore.json 原句＋出處行；擋 lore.json 改樣板、0 錯；第一次進門老闆說一次 expertIntro
//   LC16 ?crowd=0：沒有走動的人；主線客人照新路線（in→frontleft→duelE）
//   LC17 〔D〕過場卡（.cxcard）、樂歷頁開著時導演暫停
//   LC18 標題回訪：0–1 位、y≥189 的停留點；點得到、泡泡不擠到旁邊
//   LC19 第 3 位點老闆：小選單「聊聊」「賣給老闆」、沒有換王牌；聊聊＝C.ownerChat；點櫃檯＝直接賣
//   LC20 結帳：c-pay [264,224]、背對、拿著一張、老闆 busy；點櫃檯右半＝跟他聊、左半＝櫃檯
//   TAPS e2e-taps #1／#4（?crowd=1＋freezeAt c-soul、c-hiphop）：停留點的人不搶點
import fs from 'fs';
import os from 'os';
import path from 'path';
import { createRequire } from 'module';
import { launch, newPage, openTitle, Q, SIZES, record, results, sleep, seedRun, jsClick, waitScreen, tapHot, passLoot, prologueToDuel, duelReady, clearStall, tapReady } from './e2e-lib.mjs';
import { loadLib, crowdStops as stopsOf } from '../tools/check-shops.mjs';

const require = createRequire(import.meta.url);
const HERE = path.dirname(new URL(import.meta.url).pathname);
const LAB = path.resolve(HERE, '..');
const L = JSON.parse(fs.readFileSync(path.join(LAB, 'shops', 'dip.json'), 'utf8'));
const CT = require(path.join(LAB, 'content.js'));
const LORE = JSON.parse(fs.readFileSync(path.join(LAB, 'lore.json'), 'utf8'));
const SP = L.spots;
const STOPS = stopsOf(L);
const STOP = Object.fromEntries(STOPS.map(s => [s.id, s]));
const ONLY = process.env.LAB_LC ? new Set(process.env.LAB_LC.split(',').map(s => s.trim().toUpperCase().replace(/^LC/, ''))) : null;
const FULL = new Set((process.env.LAB_FULL || '390x664,375x548').split(','));
const SHOTS = process.env.LAB_SHOTS || path.join(os.tmpdir(), 'e2e-crowd-shots');
const BROWSER = process.env.LAB_BROWSER || 'chromium';
const NCYC = +(process.env.LAB_N || 10);
const K = 4;                              // ?fast=1 的倍速（ui.js speed()）：遊戲時間＝真時間×4
const DX = 38, DY = 44, BX = 20, BY = 14; // 兩個站著的人撞（§4.3）／身體疊在一起
const REG = new Set(Object.keys(CT.regulars));
const want = (id, size) => ONLY ? ONLY.has(String(id).toUpperCase()) : (FULL.has(size) ? id !== 'SHOTS' || size === '390x664' : (id === 8 || id === 'SHOTS'));
fs.mkdirSync(SHOTS, { recursive: true });

// 口袋（footprints.behind：老闆站的地方，客人不准進；check-shops 同一套算法）
const POCKETS = (() => {
  const { DipShop: DS } = loadLib(), OP = DS.O34 && DS.O34.PROPS, byId = new Map(L.props.filter(o => o.id).map(o => [o.id, o]));
  return Object.entries((L.footprints || {}).behind || {}).map(([id, xr]) => ({ id, rect: DS.pocketRect(byId.get(id), OP, { L, layout: L, state: {}, card: () => null }, xr) })).filter(p => p.rect);
})();
const inRect = (p, q) => p[0] > q[0] && p[0] < q[0] + q[2] && p[1] > q[1] && p[1] < q[1] + q[3];
const clash = (a, b) => Math.abs(a[0] - b[0]) < DX && Math.abs(a[1] - b[1]) < DY;
const body = (a, b) => Math.abs(a[0] - b[0]) < BX && Math.abs(a[1] - b[1]) < BY;
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const cutBy = (T, y) => T != null && y - 48 < T && T < y;   // 頭被對決橫條上緣切到（§3.1）
const atStop = xy => STOPS.find(s => Math.abs(s.x - xy[0]) <= 2 && Math.abs(s.y - xy[1]) <= 2) || null;
// 路線取樣（每 2 格一點）；身體框碰到 → true
function samplePts(pts) {
  const out = [];
  for (let i = 1; i < (pts || []).length; i++) { const a = pts[i - 1], b = pts[i], n = Math.max(1, Math.ceil(dist(a, b) / 2)); for (let k = 0; k <= n; k++) out.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]); }
  return out;
}
const onRoute = (pts, xy) => samplePts(pts).some(p => body(p, xy));

// ---- 頁面裡的量測（addInitScript）：舞台呼叫紀錄（door／pose／emote／hold／back／faceTo／walk／say／put）、onAction、200 ms 取樣器
function instrument() {
  window.__calls = []; window.__acts = []; window.__cs = []; window.__csMs = 200; window.__csOn = true;
  const gt = () => { try { const C = window.DipLabCrowd; return C && C._S ? Math.round(C._S().t) : null; } catch (_) { return null; } };
  const plain = x => { if (x == null || typeof x !== 'object') return typeof x === 'function' ? 'fn' : x; if (Array.isArray(x)) return x.map(plain); if (x.nodeType) return 'el'; const o = {}; for (const k in x) { const v = x[k]; if (typeof v !== 'function' && !(v && v.nodeType)) o[k] = plain(v); } return o; };
  const wrap = () => {
    const st = window.__lab && window.__lab.stage; if (!st || st.__cw) return;
    st.__cw = true;
    ['door', 'pose', 'emote', 'hold', 'back', 'faceTo', 'walk', 'say', 'put', 'hide'].forEach(m => {
      const f = st[m]; if (typeof f !== 'function') return;
      st[m] = function () { try { if (window.__calls.length < 40000) window.__calls.push({ t: Date.now(), g: gt(), m, a: [].slice.call(arguments).map(plain) }); } catch (_) {} return f.apply(this, arguments); };
    });
    const oa = st.onAction;
    st.onAction = function (a, hot) { window.__acts.push({ t: Date.now(), a, id: hot && hot.id }); return oa.apply(this, arguments); };
  };
  const pos = id => { try { const a = window.__lab.stage.pos(id); return a && !a.hidden && !a.outside ? [Math.round(a.x), Math.round(a.y)] : null; } catch (_) { return null; } };
  let last = 0;
  const tick = () => {
    wrap();
    const now = Date.now();
    if (!window.__csOn || now - last < window.__csMs - 5) return;
    last = now;
    const C = window.DipLabCrowd; if (!C || !window.__lab || !window.__lab.stage) return;
    let S; try { S = C.state(); } catch (_) { return; }
    window.__cs.push({ t: now, g: S.t, scr: window.__lab.screen(), mode: S.mode, paused: S.paused,
      sl: S.slots.filter(x => x.on).map(x => ({ s: x.slot, w: x.who, k: x.kind, ph: x.phase, at: x.at, st: x.stop, wk: x.walking, x: x.x, y: x.y, h: x.hidden, pass: x.pass })),
      p: pos('p'), o: pos('o'), f: pos('f') });
  };
  setInterval(tick, 25);
}
const INSTR = '(' + instrument.toString() + ')();';
const errs = page => page._errors.filter(e => !/Failed to load resource/.test(e));
const C = (page, fn, a) => page.evaluate(fn, a);
const cs = page => C(page, () => window.__cs.slice());
const calls = (page, m) => C(page, m => window.__calls.filter(c => !m || c.m === m), m);
const chatS = page => C(page, () => window.__lab.crowd.talk());
const crowdSt = page => C(page, () => window.__lab.crowd.state());
// 看得到的走動槽（hidden 不算）
const vis = s => s.sl.filter(x => !x.h && x.x != null);
// 每個取樣的 p／o／f 有沒有在動（跟前一個取樣比）
function moving(S) { for (let i = 0; i < S.length; i++) for (const k of ['p', 'o', 'f']) { const a = S[i][k], b = i ? S[i - 1][k] : null; S[i][k + 'M'] = !!(a && b && (a[0] !== b[0] || a[1] !== b[1])); } return S; }
// 泡泡資訊（聊天泡泡 .ds-say.chat）：名字行、字、▼、出處、pointer-events、在不在舞台框內、碰不碰來客面板的鈕與包包條、中心點最上層是不是泡泡
const bubble = page => C(page, () => {
  const b = document.querySelector('.ds-say.chat'); if (!b) return null;
  const r = b.getBoundingClientRect(), host = window.__lab.stage.host.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2, top = document.elementFromPoint(cx, cy);
  const panel = [...document.querySelectorAll('.lb-night button, .lb-bagline')].map(e => e.getBoundingClientRect()).filter(q => q.width && q.height);
  return { who: (b.querySelector('.who') || {}).textContent || null, tx: (b.querySelector('.tx') || {}).textContent || null, more: b.classList.contains('more'), side: b.classList.contains('side'),
    src: (b.querySelector('.src') || {}).textContent || null, pe: getComputedStyle(b).pointerEvents, w: Math.round(r.width),
    inStage: r.top >= host.top - 0.5 && r.bottom <= host.bottom + 0.5 && r.left >= host.left - 0.5 && r.right <= host.right + 0.5,
    hitPanel: panel.some(q => !(q.right <= r.left || q.left >= r.right || q.bottom <= r.top || q.top >= r.bottom)),
    topIsBubble: !!(top && top.closest && top.closest('.ds-say.chat')), rect: [r.left, r.top, r.right, r.bottom] };
});
// 美術格 → 頁面座標
const artToPage = (page, x, y) => C(page, ([x, y]) => { const st = window.__lab.stage, q = st.shop.hostCss(x + 0.5, y + 0.5), hb = st.host.getBoundingClientRect(); return [hb.left + q.x, hb.top + q.y]; }, [x, y]);
// 真點某個走動槽的人（熱點 cw-<slot> 看得到的那一點）
const tapPerson = (page, slot) => tapHot(page, slot ? `h => h.id === 'cw-${slot}'` : 'h => /^cw-/.test(h.id)');
async function shot(page, name) { try { await page.screenshot({ path: path.join(SHOTS, name) }); } catch (_) {} }

// 開一份存檔進來客畫面：o.seed（seedRun 的參數；預設第 2 位、提示都看過）、o.q（網址多帶的）、o.fast（false＝真速度）、o.dpr、o.route(page)（擋請求）、o.regulars（存檔裡的 save.regulars）
async function openNight(browser, w, h, o = {}) {
  const { ctx, page } = await newPage(browser, w, h, { dpr: o.dpr || 1 });
  await page.addInitScript(INSTR);
  if (o.route) await o.route(page);
  const q = Q((o.fast === false ? '' : '&fast=1') + (o.q != null ? o.q : '&crowd=1'));
  await openTitle(page, q);
  await seedRun(page, Object.assign({ idx: 1, seen: Object.assign({ crowdIntro: true, expertIntro: true }, (o.seed || {}).seen || {}) }, o.seed || {}, { seen: Object.assign({ crowdIntro: true, expertIntro: true }, (o.seed || {}).seen || {}) }));
  if (o.regulars) await C(page, r => { const s = JSON.parse(localStorage.getItem('dipGameLab_v1')); s.regulars = r; localStorage.setItem('dipGameLab_v1', JSON.stringify(s)); }, o.regulars);
  await openTitle(page, q);
  await jsClick(page, '[data-a=cont]');
  const ok = await waitScreen(page, 'night', 20000);
  await sleep(o.settle != null ? o.settle : 800);
  return { ctx, page, ok };
}
// 收掉唱片資訊與抽屜（點了箱子：等你走到、抽屜開了再關）
async function closeAll(page) {
  await page.waitForFunction(() => !!document.querySelector('#cardInfoMask') || !!document.querySelector('.ec-drawer'), null, { timeout: 4000 }).catch(() => {});
  await sleep(300);
  await C(page, () => { const x = document.querySelector('#ciClose'); if (x) x.click(); const d = document.querySelector('.ec-drawer [data-a=close]'); if (d) d.click(); });
  await page.waitForFunction(() => !document.querySelector('#cardInfoMask') && !document.querySelector('.ec-drawer') && !(window.DipLabEcon && window.DipLabEcon.isOpen && window.DipLabEcon.isOpen()), null, { timeout: 4000 }).catch(() => {});
  await sleep(600);
}
// 店裡清空、不再排推門（spawn 之後的人照常有自己的停留時間）
const quiet = page => C(page, () => { const c = window.__lab.crowd; c.close(); c.freezeAt([]); return true; });

// ===================================================================================== LC1
async function lc1(browser, w, h, size) {
  const { ctx, page } = await newPage(browser, w, h);
  await page.addInitScript(INSTR);
  try {
    await openTitle(page, Q('&fast=1&crowd=1'));
    const mode0 = await C(page, () => window.__lab.crowd.mode());
    await page.click('[data-a=quiet]');
    const duel = await prologueToDuel(page, 'direct');
    await duelReady(page);
    await C(page, () => window.__lab.forceWin());
    let night = false;
    for (let g = 0; g < 600 && !night; g++) {
      const s = await C(page, () => ({ scr: window.__lab.screen(), one: !!document.querySelector('#panel > .lb-sheet.one [data-i]'), rel: !!document.querySelector('.lb-sheet.relics [data-r]'),
        cx: !!document.querySelector('.lb-sheet.cxcard'), lv: !!document.querySelector('.lb-sheet.level [data-lv]'), nx: !!document.querySelector('.lb-dq .nx.on') }));
      if (s.scr === 'night') { night = true; break; }
      if (s.one) await jsClick(page, '#panel > .lb-sheet.one [data-i="0"]');
      else if (s.rel) await jsClick(page, '.lb-sheet.relics [data-r]');
      else if (s.cx) await jsClick(page, '.lb-sheet.cxcard .lb-btn[data-a=next]');
      else if (s.lv) await jsClick(page, '.lb-sheet.level [data-lv]');
      else if (s.nx) await jsClick(page, '.lb-dq');
      await sleep(s.one || s.rel || s.cx || s.lv ? 450 : 150);
    }
    await sleep(8000);   // 第一趟第 1 位的來客畫面（fast＝32 秒遊戲時間）
    const S = await cs(page), pos = await C(page, () => window.__lab.run && window.__lab.run.pos);
    const by = {}; S.forEach(s => { by[s.scr] = by[s.scr] || { n: 0, shown: 0 }; by[s.scr].n++; if (vis(s).length) by[s.scr].shown++; });
    const shown = S.filter(s => vis(s).length).length, modes = [...new Set(S.filter(s => s.scr === 'night').map(s => s.mode))];
    const e = errs(page);
    record('LC1', size, mode0 === 'off' && duel && night && pos === 1 && !shown && by.title && by.scene && by.night && modes.join() === 'off' && !e.length,
      `第一次的標題 ${mode0}；序章 → 男子 → 收尾 → 第 ${pos} 位來客（mode ${modes.join()}）：${S.length} 個取樣 w1–w3 露出來 ${shown}（${JSON.stringify(by)}）` + (e.length ? '；錯 ' + e.slice(0, 3).join(' | ') : ''));
  } catch (err) { record('LC1', size, false, 'error ' + err.message); }
  await ctx.close();
}

// ===================================================================================== LC2＋LC3（同一頁：來客畫面 60 秒）
function lc2Check(S, guest) {
  const bad = [];
  let nsum = 0, ns = 0;
  for (const s of S) {
    if (s.scr !== 'night') continue;
    const v = vis(s); nsum += v.length; ns++;
    if (v.length > 3) bad.push(['>3', s.t, v.length]);
    for (const x of v) {
      for (const pk of POCKETS) if (inRect([x.x, x.y], pk.rect)) bad.push(['pocket', pk.id, x.s, x.x, x.y]);
      if (x.y > 250) bad.push(['y>250', x.s, x.x, x.y, x.ph]);
    }
    const st = v.filter(x => !x.wk);
    for (let i = 0; i < st.length; i++) {
      for (let j = i + 1; j < st.length; j++) if (clash([st[i].x, st[i].y], [st[j].x, st[j].y])) bad.push(['pair', st[i].s, st[i].at, st[j].s, st[j].at]);
      for (const k of ['p', 'f', 'o']) {
        const q = s[k]; if (!q) continue;
        if (!s[k + 'M'] && clash([st[i].x, st[i].y], q)) bad.push(['near-' + k, st[i].s, st[i].at, q]);
        if (s[k + 'M'] && k !== 'p' && body([st[i].x, st[i].y], q)) bad.push(['body-' + k, st[i].s, st[i].at, q]);
      }
    }
  }
  return { bad, avg: ns ? nsum / ns : 0, ns };
}
async function lc2(browser, w, h, size) {
  const { ctx, page } = await openNight(browser, w, h, { settle: 0 });
  try {
    await sleep(60000);
    const S = moving(await cs(page)).filter(s => s.scr === 'night');
    const log = await C(page, () => window.__lab.crowd.doorLog());
    const doors = await calls(page, 'door');
    const scr = log.filter(x => x.kind === 'screen')[0];
    const ev = log.filter(x => (x.kind === 'in' || x.kind === 'out') && scr && x.g >= scr.g);
    const first = ev.length ? ev[0].g - scr.g : null;
    const outs = ev.filter(x => x.kind === 'out').length;
    // 有人換過停留點：同一個槽、同一位客人，at 換過（一次來店裡）
    const seq = {}; let moved = 0;
    for (const s of S) for (const x of s.sl) { const k = x.s + '#' + x.w; if (x.at && !x.wk) { const a = seq[k] || (seq[k] = []); if (a[a.length - 1] !== x.at) a.push(x.at); } }
    for (const k in seq) if (seq[k].length >= 2) moved++;
    const chk = lc2Check(S);
    const e = errs(page);
    const avgOk = chk.avg >= 1.5 && chk.avg <= 2.1;
    record('LC2', size, first != null && first <= 10000 && moved >= 1 && outs >= 1 && !chk.bad.length && avgOk && !e.length,
      `60 秒 ${chk.ns} 個取樣：第一次門事件 ${first} ms（遊戲時間）、推門 ${ev.length} 次（出門 ${outs}）、換站的 ${moved} 位、平均 ${chk.avg.toFixed(2)} 人（要 1.5–2.1）` +
      (chk.bad.length ? '；問題 ' + chk.bad.length + '：' + JSON.stringify(chk.bad.slice(0, 6)) : '；口袋、y≤250、兩兩 38×44、p/f/o、身體框 全 0') + (e.length ? '；錯 ' + e.slice(0, 3).join(' | ') : ''));
    // ---- LC3 門
    const sw = doors.filter(c => c.a[0] === 'swing' || c.a[0] === 'open');
    let minGap = Infinity; for (let i = 1; i < sw.length; i++) minGap = Math.min(minGap, (sw[i].t - sw[i - 1].t) * K);
    const loud = sw.filter(c => !(c.a[1] && c.a[1].quiet));
    const crowdEv = ev.concat(log.filter(x => (x.kind === 'in' || x.kind === 'out') && (!scr || x.g < scr.g)));
    const notQuiet = crowdEv.filter(x => !sw.some(c => Math.abs(c.t - x.t) <= 120 && c.a[1] && c.a[1].quiet));
    // 主線客人推門（響鈴那一下）到他站上對戰台＋1.2 秒（遊戲）：沒有路人用門
    const g0 = loud[0], arrive = g0 ? S.find(s => s.t >= g0.t && s.f && dist(s.f, SP.duelE) <= 2) : null;
    const during = g0 && arrive ? log.filter(x => (x.kind === 'in' || x.kind === 'out') && x.t >= g0.t && x.t <= arrive.t + 1200 / K) : [];
    record('LC3', size, sw.length >= 2 && minGap >= 1100 && loud.length === 1 && !notQuiet.length && g0 && arrive && !during.length && !e.length,
      `晃門 ${sw.length} 次、最短間隔 ${Math.round(minGap)} ms（遊戲，≥1100）；響鈴 ${loud.length} 次（主線客人）、路人用門 ${crowdEv.length} 次沒響鈴的 ${crowdEv.length - notQuiet.length}；` +
      `主線客人推門到站上對戰台 ${arrive ? (arrive.t - g0.t) * K : '?'} ms（遊戲）期間路人用門 ${during.length}`);
  } catch (err) { record('LC2', size, false, 'error ' + err.message); }
  await ctx.close();
}
// 「每畫面 hold 毫秒就按下一位」連 n 位：每個來客畫面 10 秒內（遊戲時間）都有一次門事件（LC2 後半；WebKit 也跑）
async function doorCycle(page, n, hold) {
  const per = [];
  for (let g = 0; g < 400 && per.length < n; g++) {
    const s = await C(page, () => ({ scr: window.__lab.screen(), step: window.__lab.run ? window.DipLabEngine.nextStep(window.__lab.run) : null, go: !!document.querySelector('[data-a=go]'), going: window.__lab.going(),
      nx: !!document.querySelector('.lb-dq .nx.on'), opt: !!document.querySelector('.lb-dq .lb-dqopt'), one: !!document.querySelector('#panel > .lb-sheet.one [data-i]'), cx: !!document.querySelector('.lb-sheet.cxcard'), lv: !!document.querySelector('.lb-sheet.level [data-lv]') }));
    if (s.scr === 'night' && s.step === 'stall') { await clearStall(page, { ms: 30000 }); continue; }
    if (s.scr === 'night' && s.go && s.step === 'fight' && !s.going) {
      const pos = await C(page, () => window.__lab.run.pos);
      await sleep(hold);
      const log = await C(page, () => window.__lab.crowd.doorLog());
      const scr = log.filter(x => x.kind === 'screen').pop();
      const ev = scr ? log.filter(x => (x.kind === 'in' || x.kind === 'out') && x.g >= scr.g) : [];
      per.push({ pos, first: ev.length ? ev[0].g - scr.g : null, kind: ev.length ? ev[0].kind : null });
      await jsClick(page, '[data-a=go]');
      await page.waitForFunction(() => window.__lab.screen() === 'duel' && window.__lab.rawDuel() && !window.__lab.going(), null, { timeout: 25000 }).catch(() => {});
      await sleep(300);
      await C(page, () => window.__lab.forceWin());
      await passLoot(page, {});
      continue;
    }
    if (s.scr === 'duel') { await C(page, () => window.__lab.rawDuel() && window.__lab.forceWin()); await sleep(500); continue; }
    if (s.scr === 'reward') { await passLoot(page, {}); continue; }
    if (s.cx) { await jsClick(page, '.lb-sheet.cxcard .lb-btn[data-a=next]'); await sleep(400); continue; }
    if (s.lv) { await jsClick(page, '.lb-sheet.level [data-lv]'); await sleep(400); continue; }
    if (s.one) { await sleep(400); await jsClick(page, '#panel > .lb-sheet.one [data-i="0"]'); await sleep(400); continue; }   // 藏家送的那張（解鎖）：收下
    if (s.scr === 'scene' && s.opt) { await sleep(350); await jsClick(page, '.lb-dq .lb-dqopt[data-i="0"]'); await sleep(300); continue; }   // 藏家進場「品味對決」
    if (s.scr === 'scene' && s.nx) { await jsClick(page, '.lb-dq'); await sleep(200); continue; }
    if (s.scr === 'end' || s.scr === 'title') break;
    if (process.env.LAB_DEBUG && g % 8 === 0) console.log('  cycle', JSON.stringify(s), JSON.stringify(await C(page, () => ({ sheets: [...document.querySelectorAll('.lb-sheet')].map(e => e.className), pending: window.__lab.run && window.__lab.run.pending && window.__lab.run.pending.type, tut: (document.getElementById('tut') || {}).className, dq: (document.querySelector('.lb-dq') || {}).outerHTML, pos: window.__lab.run && window.__lab.run.pos }))));
    await sleep(250);
  }
  return per;
}
async function lc2b(browser, w, h, size, label) {
  const { ctx, page } = await openNight(browser, w, h, { settle: 0 });
  try {
    const per = await doorCycle(page, NCYC, 8000);
    const bad = per.filter(x => x.first == null || x.first > 10000);
    const e = errs(page);
    const ric = await C(page, () => typeof window.requestIdleCallback);
    record('LC2' + (label || '') + ' 門事件', size, per.length >= NCYC && !bad.length && !e.length,
      `每畫面 8 秒就按下一位，${per.length} 個來客畫面（requestIdleCallback ${ric}）：第一次門事件（遊戲 ms）${per.map(x => '#' + x.pos + ' ' + x.first + (x.kind ? x.kind[0] : '')).join('、')}` +
      (bad.length ? '；超過 10 秒：' + JSON.stringify(bad) : '') + (e.length ? '；錯 ' + e.slice(0, 3).join(' | ') : ''));
  } catch (err) { record('LC2' + (label || '') + ' 門事件', size, false, 'error ' + err.message); }
  await ctx.close();
}

// ===================================================================================== LC4 點人（泡泡、▼、最後一句不擋封面）
async function lc4(browser, w, h, size) {
  const { ctx, page } = await openNight(browser, w, h);
  try {
    await C(page, () => window.__lab.crowd.freezeAt(['c-world']));
    await sleep(500);
    const hot = await tapPerson(page, 'w1');
    await sleep(500);
    const c1 = await chatS(page), b1 = await bubble(page);
    const acts0 = (await C(page, () => window.__acts.length));
    // 真點 ▼ 泡泡＝下一句、不開抽屜
    let b2 = null, c2 = null, drawer = null;
    if (b1 && b1.more) {
      await page.touchscreen.tap((b1.rect[0] + b1.rect[2]) / 2, (b1.rect[1] + b1.rect[3]) / 2); await sleep(400);
      c2 = await chatS(page); b2 = await bubble(page);
      drawer = await C(page, () => !!document.querySelector('.ec-drawer') || !!document.querySelector('#cardInfoMask'));
    }
    const acts1 = await C(page, () => window.__acts.length);
    // 最後一句：真點泡泡底下那一點（封面／箱子）→ 照常生效（onAction 是那個熱點）、泡泡收掉
    const under = b2 ? await C(page, r => {
      const st = window.__lab.stage, sh = st.shop, hb = st.host.getBoundingClientRect(), byId = {};
      (st.hotspots() || []).forEach(h => { byId[h.id] = h; });
      const pts = sh.hotPoints().map(q => ({ id: q.id, x: hb.left + q.x, y: hb.top + q.y })).filter(q => !/^cw-|^owner$/.test(q.id) && q.x > r[0] + 3 && q.x < r[2] - 3 && q.y > r[1] + 3 && q.y < r[3] - 3);
      const pref = pts.find(q => /^(bin|rack|poster|wall-record|crate)/.test(q.id) || /^(feature|sale)$/.test(q.id)) || pts[0];
      if (!pref) return null;
      const top = document.elementFromPoint(pref.x, pref.y);
      return Object.assign(pref, { action: byId[pref.id] && byId[pref.id].action, top: top === sh.canvas });
    }, b2.rect) : null;
    let after = null;
    if (under) {
      await C(page, () => { window.__acts = []; });
      await page.touchscreen.tap(under.x, under.y); await sleep(700);
      after = await C(page, () => ({ acts: window.__acts.slice(), bubble: !!document.querySelector('.ds-say.chat'), chat: window.__lab.crowd.talk(), info: !!document.querySelector('#cardInfoMask'), drawer: !!document.querySelector('.ec-drawer') }));
      await closeAll(page);
    }
    // 點別的箱子＝泡泡收掉、照常走去翻（抽屜打開）
    await C(page, () => { window.__lab.crowd.close(); window.__lab.crowd.freezeAt(['c-world']); });
    await sleep(400);
    await tapPerson(page, 'w1'); await sleep(500);
    const c3 = await chatS(page);
    await C(page, () => { window.__acts = []; });
    const bin = await tapHot(page, h => h.id === 'bin:elec');
    await sleep(300);
    const gone = !(await page.$('.ds-say.chat')) && !(await chatS(page));
    const opened = await page.waitForSelector('.ec-drawer', { timeout: 6000 }).then(() => true, () => false);
    const acts3 = await C(page, () => window.__acts.map(x => x.id));
    const e = errs(page);
    const okA = hot && c1 && c1.who === 'xiaoyu' && b1 && b1.who === CT.regulars.xiaoyu.name && b1.inStage && !b1.hitPanel && b1.more && b1.topIsBubble && b1.pe === 'auto';
    const okB = b2 && c2 && c2.i === 1 && !c2.more && !drawer && acts1 === acts0 && b2.pe === 'none' && !b2.topIsBubble && b2.inStage && !b2.hitPanel;
    const okC = under && under.top && after && after.acts.length && after.acts[0].id === under.id && !after.bubble && !after.chat;
    const okD = c3 && bin && gone && opened && acts3[0] === 'bin:elec';
    record('LC4', size, okA && okB && okC && okD && !e.length,
      `真點小魚：泡泡 ${JSON.stringify(b1 && { who: b1.who, more: b1.more, inStage: b1.inStage, hitPanel: b1.hitPanel, top: b1.topIsBubble, w: b1.w })}；點 ▼ → 第 ${c2 && c2.i + 1} 句、抽屜 ${drawer}、onAction 多 ${acts1 - acts0}、` +
      `最後一句 pointer-events ${b2 && b2.pe}；點底下 ${under && under.id}（最上層畫布 ${under && under.top}）→ ${JSON.stringify(after && { acts: after.acts.map(x => x.id), bubble: after.bubble, info: after.info, drawer: after.drawer })}；` +
      `點 ELECTRONIC → 泡泡收 ${gone}、抽屜 ${opened}（${acts3.join()}）` + (e.length ? '；錯 ' + e.slice(0, 3).join(' | ') : ''));
  } catch (err) { record('LC4', size, false, 'error ' + err.message); }
  await ctx.close();
  // fast=0：停多久
  const { ctx: c2x, page: p2 } = await openNight(browser, w, h, { fast: false, settle: 2500 });
  try {
    await C(p2, () => window.__lab.crowd.freezeAt(['c-world']));
    await sleep(400);
    await tapPerson(p2, 'w1'); await sleep(400);
    const first = await chatS(p2);
    await sleep(15000);
    const at15 = await chatS(p2), b15 = await bubble(p2);
    let lastMs = null, last = null;
    if (b15 && b15.more) {
      await p2.touchscreen.tap((b15.rect[0] + b15.rect[2]) / 2, (b15.rect[1] + b15.rect[3]) / 2);
      const t0 = Date.now(); await sleep(150); last = await chatS(p2);
      while (Date.now() - t0 < 14000) { if (!(await p2.$('.ds-say.chat'))) { lastMs = Date.now() - t0; break; } await sleep(100); }
    }
    const n = last ? Array.from(last.text).length : 0, want0 = Math.min(12000, Math.max(6000, 3000 + 200 * n));
    const e = errs(p2);
    record('LC4 停多久', size, first && first.more && at15 && at15.i === first.i && at15.more && b15 && lastMs != null && lastMs >= 5900 && lastMs <= want0 + 800 && !e.length,
      `fast=0：有 ▼ 的泡泡 15 秒後 ${at15 ? '還在（第 ' + (at15.i + 1) + ' 句）' : '不見了'}；點 ▼ 後最後一句（${n} 字）停 ${lastMs} ms（≥5900、規則 ${want0}）` + (e.length ? '；錯 ' + e.slice(0, 3).join(' | ') : ''));
  } catch (err) { record('LC4 停多久', size, false, 'error ' + err.message); }
  await c2x.close();
}

// ===================================================================================== LC5 點走動中的人
async function lc5(browser, w, h, size) {
  const { ctx, page } = await openNight(browser, w, h);
  try {
    await quiet(page);
    await C(page, () => window.__lab.crowd.spawn('datou', 'c-soul', { ms: 300 }));
    let walk = null; const t0 = Date.now();
    while (Date.now() - t0 < 8000) { const s = (await crowdSt(page)).slots.find(x => x.on); if (s && s.walking && s.y >= 160) { walk = s; break; } await sleep(40); }
    let res = null;
    if (walk) {
      await C(page, () => { window.__calls = []; });
      const hot = await tapPerson(page, walk.slot);
      await sleep(350);
      const s1 = (await crowdSt(page)).slots.find(x => x.slot === walk.slot), c1 = await chatS(page);
      await sleep(800);
      const s2 = (await crowdSt(page)).slots.find(x => x.slot === walk.slot);
      const cl = await calls(page);
      const face = cl.some(c => c.m === 'faceTo' && c.a[0] === walk.slot && c.a[1] === 'p'), talk = cl.some(c => c.m === 'pose' && c.a[0] === walk.slot && c.a[1] === 'talk');
      await C(page, () => window.__lab.crowd.close());
      await sleep(2000 / K + 900);
      const s3 = (await crowdSt(page)).slots.find(x => x.slot === walk.slot);
      res = { hot: hot && hot.id, stopped: !!(s1 && s2 && !s1.walking && s1.x === s2.x && s1.y === s2.y), who: c1 && c1.who, face, talk, resumed: !!(s3 && (s3.walking || (s3.at && s3.at !== 'c-soul') || s3.phase === 'out' || !s3.on)), s3: s3 && { at: s3.at, stop: s3.stop, phase: s3.phase, walking: s3.walking } };
    }
    // 腳底 y<150：點下去不開聊天。等一位自然走在後走道（換排、出門）；等不到就把人擺到後走道（leaving）
    await quiet(page);
    await C(page, () => window.__lab.crowd.spawn('akai', 'c-elec', { ms: 200 }));
    let hi = null; const t1 = Date.now();
    while (Date.now() - t1 < 10000) { const s = (await crowdSt(page)).slots.find(x => x.on && !x.hidden && x.y != null && x.y < 140 && x.y > 70 && x.x > 60); if (s) { hi = s; break; } await sleep(40); }
    let how = 'natural';
    if (!hi) { how = 'put'; await quiet(page); await C(page, () => { window.__lab.crowd.spawn('akai', 'c-elec', { freeze: true }); window.__lab.stage.put('w1', 'leaving'); }); await sleep(300); hi = (await crowdSt(page)).slots.find(x => x.on); }
    let hiRes = null;
    if (hi) {
      const pos = await C(page, id => { const p = window.__lab.stage.pos(id); return [Math.round(p.x), Math.round(p.y)]; }, hi.slot);
      const gone = await C(page, id => { const x = (window.__lab.stage.hotspots() || []).find(h => h.id === 'cw-' + id); return x ? !!x.gone : null; }, hi.slot);
      const [X, Y] = await artToPage(page, pos[0], pos[1] - 30);
      await C(page, () => { window.__acts = []; });
      await page.touchscreen.tap(X, Y); await sleep(300);
      const a = await C(page, () => ({ acts: window.__acts.map(x => x.a), chat: window.__lab.crowd.talk() }));
      hiRes = { how, at: pos, gone, acts: a.acts, chat: !!a.chat };
    }
    const e = errs(page);
    record('LC5', size, res && res.hot && res.stopped && res.who === 'datou' && res.face && res.talk && res.resumed && hiRes && hiRes.gone === true && !hiRes.chat && !hiRes.acts.some(x => /^talk:/.test(x)) && !e.length,
      `點走動中的大頭（${walk ? walk.x + ',' + walk.y : '沒走'}）：${JSON.stringify(res)}；腳底 y<150（${JSON.stringify(hiRes)}）` + (e.length ? '；錯 ' + e.slice(0, 3).join(' | ') : ''));
  } catch (err) { record('LC5', size, false, 'error ' + err.message); }
  await ctx.close();
}

// ===================================================================================== LC6 輪替
async function lc6(browser, w, h, size) {
  // 小魚以前（別趟）聊過 3 段：這一趟第一次遇到＝開場 again
  const regs = { v: 1, n: 3, met: { xiaoyu: { talks: 3, againAt: 'old#1', seen: {} } }, seen: { passer: [], owner: {} }, enc: { offered: 0, fought: 0, won: 0, lost: 0 } };
  const { ctx, page } = await openNight(browser, w, h, { regulars: regs });
  const seg = async () => {
    await tapPerson(page, 'w1'); await sleep(450);
    let s = await chatS(page); if (!s) return null;
    const out = { cat: s.cat, texts: [s.text] };
    for (let g = 0; g < 4 && s && s.more; g++) { await C(page, () => window.__lab.crowd.next()); await sleep(150); s = await chatS(page); if (s) out.texts.push(s.text); }
    return out;
  };
  try {
    await C(page, () => window.__lab.crowd.freezeAt(['c-world']));
    await sleep(400);
    const n0 = (await C(page, () => window.__lab.crowd.regulars())).n;
    const segs = [];
    for (let i = 0; i < 4; i++) segs.push(await seg());
    await C(page, () => { window.__calls = []; });
    await tapPerson(page, 'w1'); await sleep(450);
    const fifth = await chatS(page);
    const sweat = (await calls(page, 'emote')).some(c => c.a[0] === 'w1' && c.a[1] === 'sweat');
    await C(page, () => window.__lab.crowd.close()); await sleep(300);
    const before = await C(page, () => window.__lab.crowd.regulars());
    const stored = await C(page, () => JSON.parse(localStorage.getItem('dipGameLab_v1')).regulars);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-a=cont]', { state: 'visible', timeout: 10000 });
    await sleep(600);
    await jsClick(page, '[data-a=cont]');   // 重新整理回到標題 → 繼續試煉＝同一趟
    await waitScreen(page, 'night', 20000); await sleep(1000);
    const after = await C(page, () => window.__lab.crowd.regulars());
    // 同一趟第二次遇到（重新整理＝店裡重新開始，她再來一次）：開場不再講 again
    await C(page, () => window.__lab.crowd.freezeAt(['c-world']));
    await sleep(400);
    const again2 = await seg();
    const texts = segs.slice(0, 3).map(s => s && s.texts.join('｜'));
    const e = errs(page);
    const ok = segs.every(Boolean) && segs[0].cat === 'again' && new Set(texts).size === 3 && segs[1].cat !== segs[0].cat && segs[2].cat !== segs[1].cat && segs[3].cat === 'busy' && !fifth && sweat &&
      before.n - n0 >= 3 && JSON.stringify(stored.met.xiaoyu.seen) === JSON.stringify(before.met.xiaoyu.seen) && JSON.stringify(after.met.xiaoyu.seen) === JSON.stringify(before.met.xiaoyu.seen) && after.n === before.n &&
      again2 && again2.cat !== 'again' && again2.cat !== 'hello' && !e.length;
    record('LC6', size, ok, `連點小魚：${segs.map(s => s && s.cat).join('→')}、第 5 下 ${fifth ? '還出字' : '沒字'}（冒汗 ${sweat}）；n ${n0}→${before.n}；` +
      `重新整理 seen 一樣 ${JSON.stringify(after.met.xiaoyu.seen) === JSON.stringify(before.met.xiaoyu.seen)}（${JSON.stringify(after.met.xiaoyu.seen)}）；同一趟第二次遇到開場＝${again2 && again2.cat}` + (e.length ? '；錯 ' + e.slice(0, 3).join(' | ') : ''));
  } catch (err) { record('LC6', size, false, 'error ' + err.message); }
  await ctx.close();
}

// ===================================================================================== LC7 讓位與借過（真速度）
async function lc7(browser, w, h, size) {
  const { ctx, page } = await openNight(browser, w, h, { fast: false, settle: 3500 });
  const runCase = async (stop, bin) => {
    await C(page, s => window.__lab.crowd.freezeAt([s]), stop);
    await sleep(400);
    await C(page, () => { window.__cs = []; window.__csMs = 60; window.__calls = []; });
    const hot = await tapHot(page, `h => h.id === 'bin:${bin}'`);
    const opened = await page.waitForSelector('.ec-drawer', { timeout: 10000 }).then(() => true, () => false);
    const p = await C(page, () => { const a = window.__lab.stage.pos('p'); return [Math.round(a.x), Math.round(a.y)]; });
    const x = (await crowdSt(page)).slots.find(q => q.on);
    await sleep(1500);
    const S = await cs(page), cl = await calls(page);
    const xEnd = (await crowdSt(page)).slots.find(q => q.on);
    await C(page, () => { window.__csMs = 200; });
    await closeAll(page);
    return { hot: hot && hot.id, opened, p, x, xEnd, S, cl };
  };
  try {
    // 借過先跑（你從預設站位 browse 走去 ROCK，左排走道經過 c-world）；讓位後跑
    const ps = await runCase('c-world', 'rock');
    await C(page, () => window.__lab.crowd.clear());
    const y = await runCase('c-soul', 'soul');
    const soul = [STOP['c-soul'].x, STOP['c-soul'].y];
    const yOk = y.hot && y.opened && y.x && !clash(y.p, [y.x.x, y.x.y]) && dist([y.x.x, y.x.y], soul) >= 38;
    const wpos = [STOP['c-world'].x, STOP['c-world'].y];
    const stayed = ps.S.every(s => s.sl.filter(q => q.s === 'w1').every(q => q.x === wpos[0] && q.y === wpos[1]));
    const passSeen = ps.S.some(s => s.sl.some(q => q.s === 'w1' && q.pass));
    const faced = ps.cl.some(c => c.m === 'faceTo' && c.a[0] === 'w1' && c.a[1] === 'p');
    const resumed = ps.xEnd && !ps.xEnd.pass && ps.cl.filter(c => c.m === 'pose' && c.a[0] === 'w1').map(c => c.a[1]).pop() === 'dig';
    const e = errs(page);
    record('LC7', size, yOk && ps.hot && ps.opened && stayed && passSeen && faced && resumed && !e.length,
      `讓位：點 SOUL，你到站 ${y.p} 時客人在 ${y.x && [y.x.x, y.x.y]}（${y.x && y.x.at}，離 c-soul ${y.x ? dist([y.x.x, y.x.y], soul).toFixed(0) : '?'}）；` +
      `借過：點 ROCK，c-world 那位沒換位置 ${stayed}、借過 ${passSeen}、轉向你 ${faced}、之後接著翻 ${resumed}` + (e.length ? '；錯 ' + e.slice(0, 3).join(' | ') : ''));
  } catch (err) { record('LC7', size, false, 'error ' + err.message); }
  await ctx.close();
}

// ===================================================================================== LC8 對決與領獎
async function lc8(browser, w, h, size) {
  const { ctx, page } = await openNight(browser, w, h, { settle: 2500 });
  try {
    await quiet(page);
    // 擋老闆 counter→ref 的（c-hiphop、c-folk）、擋你 →duelP 的（c-folk）、c-world（390／360 被切頭；430 整個在橫條裡；375 整個在橫條外）
    await C(page, () => { const c = window.__lab.crowd; c.spawn('akai', 'c-hiphop', { ms: 120000 }); c.spawn('laochen', 'c-folk', { ms: 120000 }); c.spawn('afang', 'c-world', { ms: 120000 }); });
    await sleep(800);
    const routes = await C(page, () => ({ o: window.__lab.stage.route('counter', 'ref'), p: window.__lab.stage.route('p', 'duelP') }));
    await C(page, () => { window.__cs = []; window.__csMs = 100; });
    await jsClick(page, '[data-a=go]');
    await page.waitForFunction(() => window.__lab.screen() === 'duel' && window.__lab.rawDuel() && !window.__lab.going(), null, { timeout: 25000 }).catch(() => {});
    await sleep(1500);
    const T = await C(page, () => window.__lab.stage.camRect('strip').y);
    const st1 = await crowdSt(page);
    const Sd = moving(await cs(page));
    const v1 = st1.slots.filter(x => x.on && !x.hidden);
    const cut = v1.filter(x => cutBy(T, x.y));
    const onR = v1.filter(x => !x.walking && (onRoute(routes.o, [x.x, x.y]) || onRoute(routes.p, [x.x, x.y])));
    const bodyO = []; for (const s of Sd) for (const x of vis(s)) if (!x.wk && ((s.oM && body([x.x, x.y], s.o)) || (s.pM && body([x.x, x.y], s.p)))) bodyO.push([s.t, x.s, x.at]);
    const inStrip = v1.filter(x => x.y - 48 >= T);
    const keep430 = size === '430x932' ? v1.some(x => x.who === 'afang' && x.at === 'c-world' && !x.walking) : true;
    await shot(page, `lc8-duel-${size}.png`);
    // 領獎：還在的人站在停留點不動
    await C(page, () => window.__lab.forceWin());
    await page.waitForFunction(() => window.__lab.screen() === 'reward', null, { timeout: 15000 }).catch(() => {});
    await C(page, () => { window.__cs = []; });
    await sleep(2500);
    const Sr = moving(await cs(page)).filter(s => s.scr === 'reward');
    const rBad = [];
    for (let i = 0; i < Sr.length; i++) for (const x of vis(Sr[i])) {
      if (x.wk) rBad.push(['walk', x.s]); else if (!atStop([x.x, x.y])) rBad.push(['notStop', x.s, x.x, x.y]);
      const prev = i ? vis(Sr[i - 1]).find(q => q.s === x.s) : null; if (prev && (prev.x !== x.x || prev.y !== x.y)) rBad.push(['moved', x.s]);
      if (Sr[i].oM && body([x.x, x.y], Sr[i].o)) rBad.push(['body-o', x.s]);
    }
    const rModes = [...new Set(Sr.map(s => s.mode))];
    await C(page, () => { window.__cs = []; });
    const lr = await passLoot(page, {});
    await waitScreen(page, 'night', 15000);
    await sleep(10000 / K + 1500);
    const Sn = moving(await cs(page)).filter(s => s.scr === 'night');
    const nBad = []; for (const s of Sn) for (const x of vis(s)) if (!x.wk && s.oM && body([x.x, x.y], s.o)) nBad.push([s.t, x.s, x.at]);
    const log = await C(page, () => window.__lab.crowd.doorLog());
    const scr = log.filter(x => x.kind === 'screen').pop();
    const live = Sn.length && Sn[Sn.length - 1].mode === 'live' && (Sn.some(s => s.sl.some(x => x.wk)) || log.some(x => scr && x.g >= scr.g && (x.kind === 'in' || x.kind === 'out')));
    const e = errs(page);
    record('LC8', size, !cut.length && !onR.length && !bodyO.length && keep430 && !rBad.length && rModes.join() === 'still' && lr.ok && !nBad.length && live && !e.length,
      `橫條上緣 T=${T}：開打後看得到 ${v1.map(x => x.who + '@' + x.at + (x.walking ? '(走)' : '')).join('、') || '沒人'}，被切頭 ${cut.length}、站在老闆／你的路上 ${onR.length}、` +
      `走路時身體框疊 ${bodyO.length}、整個在橫條裡留著 ${inStrip.map(x => x.who).join('、') || '—'}${size === '430x932' ? '（阿芳還在 c-world 翻 ' + keep430 + '）' : ''}；` +
      `領獎（${rModes.join()}）${Sr.length} 個取樣問題 ${rBad.length}${rBad.length ? JSON.stringify(rBad.slice(0, 4)) : ''}；回來客：老闆回櫃檯身體框疊 ${nBad.length}、繼續走 ${!!live}` + (e.length ? '；錯 ' + e.slice(0, 3).join(' | ') : ''));
  } catch (err) { record('LC8', size, false, 'error ' + err.message); }
  await ctx.close();
}

// ===================================================================================== LC9 攤位（真速度）
async function lc9(browser, w, h, size) {
  const { ctx, page } = await openNight(browser, w, h, { fast: false, seed: { money: 9000 }, settle: 1500 });
  const SNACK = SP.stSnack, REGU = SP.regular;
  try {
    await quiet(page);
    await C(page, () => { const c = window.__lab.crowd; c.spawn('akai', 'c-rock', { ms: 120000 }); c.spawn('afang', 'c-pay', { ms: 120000 }); c.spawn('laochen', 'c-folk', { ms: 120000 }); });
    await C(page, () => {
      const r = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent;
      E.stallSession(r, Cn); r.pending.groups = [['snack', 'trade'], ['gig', 'dig']];
      window.__lab.money(9000); window.__lab.go('night');
    });
    await page.waitForFunction(() => window.DipLabStalls.state() && document.querySelector('.st-pick .st-row'), null, { timeout: 10000 }).catch(() => {});
    await sleep(1500);
    const log0 = (await C(page, () => window.__lab.crowd.doorLog())).length;
    const m0 = await C(page, () => window.__lab.crowd.mode());
    await C(page, () => { window.__cs = []; window.__csMs = 100; });
    const sel = '.st-pick .st-row[data-g="0"]';
    await tapReady(page, sel); await sleep(350); await tapReady(page, sel);
    const t0 = Date.now(), issues = [], seen = {};
    let routeO = null;
    while (Date.now() - t0 < 18000) {
      const s = await C(page, () => { const S = window.DipLabStalls.state(); return { kind: S && S.kind, phase: S && S.phase }; });
      if (s.kind === 'snack' && !routeO) routeO = await C(page, () => window.__lab.stage.route('counter', 'stSnack'));
      if (s.phase === 'station' && s.kind) seen[s.kind] = 1;
      if (s.phase === 'station' && s.kind && !seen['shot' + s.kind]) { seen['shot' + s.kind] = 1; await shot(page, `lc9-${s.kind}-${size}.png`); }
      if (s.phase === 'station' && (s.kind === 'snack' || s.kind === 'trade') && !seen['tap' + s.kind] && Date.now() - t0 > 1500) {
        await sleep(1500); seen['tap' + s.kind] = 1; await tapReady(page, '.lb-sheet.stall ' + (s.kind === 'snack' ? '[data-a=ok]' : '[data-a=done]'), 4000);
      }
      await sleep(200);
    }
    const S = moving(await cs(page));
    let kindAt = null;
    for (const s of S) {
      for (const x of vis(s)) {
        if (x.wk) continue;
        const xy = [x.x, x.y];
        if (s.oM && body(xy, s.o)) issues.push(['o-body', x.s, x.at]);
        if (s.f && body(xy, s.f)) issues.push(['f-body', x.s, x.at, s.f]);
        if (s.o && dist(s.o, SNACK) <= 2 && clash(xy, SNACK)) issues.push(['stSnack', x.s, x.at]);
        if (s.f && dist(s.f, REGU) <= 2 && clash(xy, REGU)) issues.push(['regular', x.s, x.at]);
        if (routeO && s.oM && dist(s.o, SP.counter) > 2 && onRoute(routeO, xy)) issues.push(['o-route', x.s, x.at]);   // 老闆在 counter↔stSnack 路上走的時候，路上沒有停著的人
      }
    }
    const modes = [...new Set(S.map(s => s.mode))];
    const log = await C(page, () => window.__lab.crowd.doorLog());
    const doors = log.slice(log0).filter(x => x.kind === 'in' || x.kind === 'out');
    const e = errs(page);
    record('LC9', size, m0 === 'still' && modes.join() === 'still' && seen.snack && seen.trade && !doors.length && !issues.length && !e.length,
      `攤位（${modes.join()}）：宵夜 ${!!seen.snack}、同業調貨 ${!!seen.trade}；用門 ${doors.length}；${S.length} 個取樣問題 ${issues.length}` + (issues.length ? JSON.stringify(issues.slice(0, 6)) : '（老闆那段、stSnack、regular、站主身體框全 0）') +
      (e.length ? '；錯 ' + e.slice(0, 3).join(' | ') : ''));
  } catch (err) { record('LC9', size, false, 'error ' + err.message); }
  await ctx.close();
}

// ===================================================================================== LC10 周姐
const loreHas = (art, text) => { const k = String(art || '').normalize('NFC').trim().toLowerCase(); return !!(LORE.a[k] && LORE.a[k].includes(text)); };
async function zhouSegs(page, o = {}) {
  const out = [];
  const stops = ['c-world', 'c-classical', 'c-folk', 'c-rock', 'c-soul', 'c-elec', 'c-hiphop', 'c-citypop'];
  for (let v = 0; v < (o.visits || 16); v++) {
    await C(page, s => { const c = window.__lab.crowd; c.close(); c.freezeAt([]); c.spawn('zhoujie', s, { freeze: true }); }, stops[v % stops.length]);
    await sleep(250);
    for (let i = 0; i < 3; i++) {
      await C(page, () => window.__lab.crowd.chat('zhoujie')); await sleep(o.wait || 700);
      let s = await chatS(page), g = 0; const seg = [];
      while (s && g++ < 5) {
        const b = await bubble(page);
        seg.push({ cat: s.cat, text: s.text, quote: s.quote, b });
        if (s.quote && o.onQuote) await o.onQuote(seg[seg.length - 1]);
        if (!s.more) break; await C(page, () => window.__lab.crowd.next()); await sleep(120); s = await chatS(page);
      }
      if (seg.length) out.push(seg);
      if (o.stop && o.stop(out)) return out;
    }
  }
  return out;
}
async function lc10(browser, w, h, size) {
  // (a) 摘句
  {
    const { ctx, page } = await openNight(browser, w, h);
    try {
      let shotN = 0;
      const segs = await zhouSegs(page, { onQuote: async () => { if (!shotN++) await shot(page, `lc10-quote-${size}.png`); }, stop: o => o.filter(s => s[0].cat === 'know' && s.some(x => x.quote)).length >= 3 });
      const know = segs.filter(s => s[0].cat === 'know'), q = know.filter(s => s.some(x => x.quote));
      const bad = q.map(s => s.find(x => x.quote)).filter(x => !(x.b && x.b.src && x.b.src.startsWith('藝人介紹・') && loreHas(x.b.src.replace(/^藝人介紹・/, ''), x.text) && x.b.inStage));
      const e = errs(page);
      record('LC10 摘句', size, q.length >= 1 && !bad.length && !e.length,
        `${segs.length} 段（知識 ${know.length}、摘句 ${q.length}）：摘句都是 lore.json 那位藝人的原句、下緣有出處行、在舞台框內 ${!bad.length}` +
        (q[0] ? `（例「${q[0].find(x => x.quote).text}」〔${q[0].find(x => x.quote).b.src}〕）` : '') + (bad.length ? '；不對：' + JSON.stringify(bad.slice(0, 2)) : '') + (e.length ? '；錯 ' + e.slice(0, 3).join(' | ') : ''));
    } catch (err) { record('LC10 摘句', size, false, 'error ' + err.message); }
    await ctx.close();
  }
  // (b) 擋 lore.json → 樣板、console 沒錯
  {
    const { ctx, page } = await openNight(browser, w, h, { route: p => p.route(/\/lore\.json(\?|$)/, r => r.abort()) });
    try {
      const segs = await zhouSegs(page, { visits: 8, wait: 500, stop: o => o.filter(s => s[0].cat === 'know').length >= 3 });
      const know = segs.filter(s => s[0].cat === 'know'), quotes = know.filter(s => s.some(x => x.quote));
      const req = await C(page, () => performance.getEntriesByType('resource').filter(e => /lore\.json/.test(e.name)).length);
      const e = errs(page);
      record('LC10 擋 lore.json', size, know.length >= 1 && !quotes.length && !e.length,
        `擋掉 lore.json：知識段 ${know.length} 段全用樣板（摘句 ${quotes.length}）${know[0] ? '，例「' + know[0].map(x => x.text).join('｜') + '」' : ''}；JS 錯 ${e.length}` + (e.length ? '：' + e.slice(0, 3).join(' | ') : ''));
    } catch (err) { record('LC10 擋 lore.json', size, false, 'error ' + err.message); }
    await ctx.close();
  }
  // (c) 她第一次進門：老闆說一次 expertIntro、她頭上閃星
  {
    const { ctx, page } = await openNight(browser, w, h, { seed: { seen: { crowdIntro: true, expertIntro: false } }, settle: 2500 });
    try {
      await C(page, () => { const s = window.__lab.save.seen; delete s.expertIntro; });
      await quiet(page);
      await C(page, () => window.__lab.crowd.spawn('zhoujie', 'c-world', { ms: 120000 }));
      let said = null, spark = false; const t0 = Date.now();
      while (Date.now() - t0 < 12000) { const c = await chatS(page); if (c && c.who === 'owner') { said = c; spark = await C(page, () => !!document.querySelector('.cw-spark')); break; } await sleep(150); }
      await C(page, () => window.__lab.crowd.close());
      const seen1 = await C(page, () => !!window.__lab.save.seen.expertIntro);
      await quiet(page);
      await C(page, () => window.__lab.crowd.spawn('zhoujie', 'c-classical', { ms: 120000 }));
      let twice = false; const t1 = Date.now();
      while (Date.now() - t1 < 6000) { const c = await chatS(page); if (c && c.who === 'owner' && c.text === CT.crowdUi.expertIntro) { twice = true; break; } await sleep(150); }
      const e = errs(page);
      record('LC10 第一次進門', size, said && said.text === CT.crowdUi.expertIntro && spark && seen1 && !twice && !e.length,
        `老闆說「${said && said.text}」、她頭上閃星 ${spark}、記成看過 ${seen1}、再來一次不再說 ${!twice}` + (e.length ? '；錯 ' + e.slice(0, 3).join(' | ') : ''));
    } catch (err) { record('LC10 第一次進門', size, false, 'error ' + err.message); }
    await ctx.close();
  }
}

// ===================================================================================== LC16 ?crowd=0
async function lc16(browser, w, h, size) {
  const { ctx, page } = await openNight(browser, w, h, { q: '&crowd=0', settle: 0 });
  try {
    await sleep(8000);
    const S = await cs(page);
    const shown = S.filter(s => vis(s).length).length, modes = [...new Set(S.filter(s => s.scr === 'night').map(s => s.mode))];
    const fw = (await calls(page, 'walk')).filter(c => c.a[0] === 'f').map(c => c.a[1]);
    const gin = fw.find(k => Array.isArray(k) && k.includes('duelE'));
    const st = await C(page, () => ({ on: window.__lab.crowd.on(), enc: window.__lab.crowd.enc(), sheet: !!document.querySelector('.lb-sheet.enc'), f: window.__lab.stage.pos('f') }));
    const e = errs(page);
    record('LC16', size, !st.on && modes.join() === 'off' && !shown && gin && gin.join() === 'in,frontleft,duelE' && st.f && dist([st.f.x, st.f.y], SP.duelE) <= 2 && st.enc == null && !st.sheet && !e.length,
      `?crowd=0：活店 ${st.on}、mode ${modes.join()}、w1–w3 露出來 ${shown}；主線客人走 ${JSON.stringify(gin)}、站在 duelE ${st.f && dist([st.f.x, st.f.y], SP.duelE).toFixed(1)}；切磋 ${st.enc}` + (e.length ? '；錯 ' + e.slice(0, 3).join(' | ') : ''));
  } catch (err) { record('LC16', size, false, 'error ' + err.message); }
  await ctx.close();
}

// ===================================================================================== LC17 〔D〕過場卡、樂歷頁開著＝導演暫停
async function frozenFor(page, ms) {
  const a = await crowdSt(page), l0 = (await C(page, () => window.__lab.crowd.doorLog())).length;
  await sleep(ms);
  const b = await crowdSt(page), l1 = (await C(page, () => window.__lab.crowd.doorLog())).length;
  const pa = a.slots.filter(x => x.on).map(x => [x.slot, x.x, x.y].join()), pb = b.slots.filter(x => x.on).map(x => [x.slot, x.x, x.y].join());
  return { paused: b.paused, dt: b.t - a.t, doors: l1 - l0, still: pa.join('|') === pb.join('|') && !b.slots.some(x => x.on && x.walking), n: pa.length, mode: b.mode };
}
async function lc17(browser, w, h, size) {
  // (a) 來客畫面開樂歷頁
  const { ctx, page } = await openNight(browser, w, h, { settle: 4000 });
  let ra = null, rb = null;
  try {
    await C(page, () => window.__lab.openPage('career')); await sleep(400);
    ra = await frozenFor(page, 3000);
    await C(page, () => { const b = document.querySelector('.lb-page [data-a=close]'); if (b) b.click(); }); await sleep(600);
    const st = await crowdSt(page); await sleep(1500); const st2 = await crowdSt(page);
    ra.resume = st2.t - st.t;
    ra.e = errs(page);
  } catch (err) { ra = { err: err.message }; }
  await ctx.close();
  // (b) 標題的過場卡（.cxcard）：C 波存檔開機入帳（e2e-career C1 的存檔形狀）
  {
    const { ctx: c2, page: p2 } = await newPage(browser, w, h);
    await p2.addInitScript(INSTR);
    try {
      const q = Q('&fast=1&crowd=1');
      await openTitle(p2, q);
      await C(p2, () => {
        const E = window.DipLabEngine, Cn = window.DipLabContent;
        const r = E.newRun(Cn, { seedKey: '20261106', runNo: 1, ace: 'pearl', prologue: false, relics: [] }); r.tut = false; const ch = E.bargainPolicy(r, Cn); if (ch) E.choose(r, Cn, ch); r.idx = 2; r.pos = 3;
        const runs = [{ seedKey: '20261104', runNo: 1, ace: 'hall', result: 'dead', reached: 25, bestStreak: 9, taken: 3, wins: 24, level: 6, checkpoints: [10, 20], lexp: { base: 447, gig: 200, home: 30 } },
          { seedKey: '20261105', runNo: 1, ace: 'pearl', result: 'dead', reached: 26, bestStreak: 9, taken: 3, wins: 25, level: 6, checkpoints: [10, 20], lexp: { base: 453, gig: 100, packet: 15 } }];
        const s = { v: 8, seen: { night: true, unlockHint: true, aceSwap: true, crowdIntro: true, expertIntro: true }, learned: {}, settings: { fastAnim: false, sound: false, autoNext: true }, player: null, run: r, runs,
          best: { far: 26, checkpoints: [10, 20], bestStreak: 9 }, shelf: {}, relics: [], tutorialDone: true, prologueDone: true, lastAce: 'pearl', lastBargain: null, lexpBank: { base: 900, gig: 300, home: 30, promo: 0, packet: 15, demo: 0, runs: 2 } };
        s.shelf[Cn.aces.pearl] = { at: 'e2e#1', seen: true, own: true, src: 'start' };
        (Cn.gifts.pearl || []).forEach(id => { s.shelf[id] = { at: 'e2e#1', seen: true, own: true, src: 'gift' }; });
        r.bag.forEach(id => { if (!s.shelf[id]) s.shelf[id] = { at: 'e2e#1', seen: false }; });
        localStorage.setItem('dipGameLab_v1', JSON.stringify(s));
      });
      await openTitle(p2, q);
      const card = await p2.waitForSelector('.lb-sheet.cxcard', { timeout: 6000 }).then(() => true, () => false);
      await sleep(300);
      rb = card ? await frozenFor(p2, 2500) : { card: false };
      rb.card = card;
      // 卡片點完：導演接著走
      for (let i = 0; i < 8 && await p2.$('.lb-sheet.cxcard'); i++) { await jsClick(p2, '.lb-sheet.cxcard .lb-btn[data-a=next]'); await sleep(450); }
      await C(p2, () => { const b = document.querySelector('.lb-page [data-a=close]'); if (b) b.click(); }); await sleep(500);
      const s0 = await crowdSt(p2); await sleep(1500); const s1 = await crowdSt(p2);
      rb.resume = s1.t - s0.t; rb.mode = s1.mode;
      rb.e = errs(p2);
    } catch (err) { rb = { err: err.message }; }
    await c2.close();
  }
  const okA = ra && !ra.err && ra.paused && ra.dt <= 260 && ra.doors === 0 && ra.still && ra.mode === 'live' && ra.resume > 1000 && !ra.e.length;
  const okB = rb && !rb.err && rb.card && rb.paused && rb.dt <= 260 && rb.doors === 0 && rb.still && rb.mode === 'calm' && rb.resume > 1000 && !rb.e.length;
  record('LC17', size, okA && okB, `來客畫面開樂歷頁 3 秒：${JSON.stringify(ra && { paused: ra.paused, 遊戲時鐘: ra.dt, 門: ra.doors, 不動: ra.still, n: ra.n, 關掉後: ra.resume, err: ra.err })}；` +
    `標題過場卡 2.5 秒：${JSON.stringify(rb && { card: rb.card, paused: rb.paused, 遊戲時鐘: rb.dt, 門: rb.doors, 不動: rb.still, mode: rb.mode, 點完後: rb.resume, err: rb.err })}` +
    ((ra && ra.e && ra.e.length) || (rb && rb.e && rb.e.length) ? '；錯 ' + [].concat(ra.e || [], rb.e || []).slice(0, 3).join(' | ') : ''));
}

// ===================================================================================== LC18 標題回訪
async function lc18(browser, w, h, size, o = {}) {
  const out = [];
  let tapped = null;
  for (const seed of ['20261106', '20261107', '20261108', '20261109', '20261110', '20261111']) {
    const { ctx, page } = await newPage(browser, w, h, { dpr: o.dpr || 1 });
    await page.addInitScript(INSTR);
    try {
      const q = Q('&crowd=1&fast=1', seed);
      await openTitle(page, q); await seedRun(page, { idx: 1, seedKey: seed, seen: { crowdIntro: true, expertIntro: true } }); await openTitle(page, q);
      await sleep(8000);
      const S = (await cs(page)).filter(s => s.scr === 'title');
      const max = Math.max(0, ...S.map(s => vis(s).length));
      const lowY = S.flatMap(s => vis(s).filter(x => !x.wk && (x.y < (CT.crowd.title || {}).minY || !atStop([x.x, x.y]))));   // 站著的人：y≥189 的停留點
      const modes = [...new Set(S.map(s => s.mode))];
      const r = { seed, max, low: lowY.length, modes: modes.join(), n: S.length };
      if (!tapped && max === 1) {
        const v = vis(S[S.length - 1])[0];
        if (v && !v.wk) {
          const hot = await tapPerson(page, v.s); await sleep(500);
          const b = await bubble(page), c = await chatS(page);
          if (o.shot) await shot(page, o.shot);
          tapped = { seed, who: v.w, at: v.at, hot: hot && hot.id, chat: c && c.who, side: b && b.side, inStage: b && b.inStage, w: b && b.w };
        }
      }
      r.e = errs(page);
      out.push(r);
    } catch (err) { out.push({ seed, err: err.message }); }
    await ctx.close();
    if (o.shot && tapped) break;
  }
  if (o.shot) return tapped;
  const bad = out.filter(r => r.err || r.max > 1 || r.low || r.modes !== 'calm' || (r.e && r.e.length));
  record('LC18', size, !bad.length && tapped && tapped.hot && tapped.chat && tapped.side === false && tapped.inStage,
    `標題回訪 ${out.length} 個種子：最多 ${Math.max(...out.map(r => r.max || 0))} 位、y<189 或不在停留點的取樣 ${out.reduce((a, r) => a + (r.low || 0), 0)}、mode ${[...new Set(out.map(r => r.modes))].join('／')}；` +
    `點人 ${JSON.stringify(tapped)}` + (bad.length ? '；不對：' + JSON.stringify(bad.slice(0, 3)) : ''));
}

// ===================================================================================== LC19 點老闆（第 3 位）
async function lc19(browser, w, h, size, o = {}) {
  const { ctx, page } = await openNight(browser, w, h, { seed: { idx: 2 }, settle: 3500, dpr: o.dpr || 1 });
  try {
    await quiet(page);
    const sw = await C(page, () => window.DipLabEngine.canSwitchAce(window.__lab.run, window.DipLabContent));
    const oh = await tapHot(page, h => h.id === 'owner');
    await page.waitForSelector('.lb-sheet.float.owner', { timeout: 3000 }).catch(() => {});
    await sleep(500);
    const menu = await C(page, () => { const s = document.querySelector('.lb-sheet.float.owner'); return s ? [...s.querySelectorAll('button[data-a]')].map(b => b.getAttribute('data-a') + ':' + b.textContent.trim()) : null; });
    if (o.shot) { await shot(page, o.shot); await ctx.close(); return; }
    await tapReady(page, '.lb-sheet.float.owner [data-a=talk]');
    await sleep(500);
    const c = await chatS(page), b = await bubble(page);
    const okText = c && CT.ownerChat.some(l => [].concat(l.text).includes(c.text));
    await C(page, () => window.__lab.crowd.close()); await sleep(400);
    await C(page, () => { window.__acts = []; });
    const ch = await tapHot(page, h => h.id === 'counter');
    const drawer = await page.waitForSelector('.ec-drawer', { timeout: 4000 }).then(() => true, () => false);
    const st = await C(page, () => ({ acts: window.__acts.map(x => x.a), menu: !!document.querySelector('.lb-sheet.float.owner') }));
    const e = errs(page);
    const keys = (menu || []).map(x => x.split(':')[0]);
    record('LC19', size, !sw && oh && keys.includes('talk') && keys.includes('osell') && !keys.includes('swap') && c && c.who === 'owner' && okText && b && b.who === '老闆' && ch && drawer && !st.menu && st.acts[0] === 'counter' && !e.length,
      `第 3 位點老闆：小選單 ${JSON.stringify(menu)}；聊聊 →「${c && c.text}」（C.ownerChat ${okText}、名字行 ${b && b.who}）；點櫃檯 → ${st.acts.join()}、直接開賣 ${drawer}、沒有選單 ${!st.menu}` + (e.length ? '；錯 ' + e.slice(0, 3).join(' | ') : ''));
  } catch (err) { record('LC19', size, false, 'error ' + err.message); }
  await ctx.close();
}

// ===================================================================================== LC20 結帳
async function lc20(browser, w, h, size) {
  const { ctx, page } = await openNight(browser, w, h, { settle: 5000 });
  try {
    await quiet(page);
    await page.waitForFunction(() => window.__lab.crowd.sayTill() <= Date.now(), null, { timeout: 8000 }).catch(() => {});
    await C(page, () => { window.__calls = []; window.__lab.crowd.spawn('akai', 'c-pay', { ms: 120000 }); });
    await sleep(500);
    const st = await C(page, () => { const p = window.__lab.stage.pos('w1'), s = window.__lab.crowd.state().slots.find(x => x.slot === 'w1'); return { x: Math.round(p.x), y: Math.round(p.y), dir: p.dir, holding: s.holding }; });
    const cl = await calls(page);
    const held = cl.some(c => c.m === 'hold' && c.a[0] === 'w1' && c.a[1] && c.a[1].sleeve);
    const busy = cl.some(c => c.m === 'pose' && c.a[0] === 'o' && c.a[1] === 'busy');
    // 櫃檯右半（他頭到腰那塊）＝跟他聊；左半＝櫃檯
    await C(page, () => { window.__acts = []; });
    const [rx, ry] = await artToPage(page, 268, 196);
    await page.touchscreen.tap(rx, ry); await sleep(500);
    const right = await C(page, () => ({ acts: window.__acts.map(x => x.a), chat: window.__lab.crowd.talk() }));
    await C(page, () => window.__lab.crowd.close()); await sleep(400);
    await C(page, () => { window.__acts = []; });
    const [lx, ly] = await artToPage(page, 224, 190);
    await page.touchscreen.tap(lx, ly);
    const drawer = await page.waitForSelector('.ec-drawer', { timeout: 4000 }).then(() => true, () => false);
    const left = await C(page, () => window.__acts.map(x => x.a));
    const e = errs(page);
    record('LC20', size, st.x === SP.regular[0] && st.y === SP.regular[1] && st.dir === 'back' && st.holding && held && busy && right.acts[0] === 'talk:akai' && right.chat && right.chat.who === 'akai' && left[0] === 'counter' && drawer && !e.length,
      `阿凱結帳：站 [${st.x},${st.y}]、${st.dir}、拿著 ${st.holding}（hold ${held}）、老闆 busy ${busy}；點櫃檯右半 → ${right.acts.join()}（${right.chat && right.chat.who}）；左半 → ${left.join()}、開賣 ${drawer}` + (e.length ? '；錯 ' + e.slice(0, 3).join(' | ') : ''));
  } catch (err) { record('LC20', size, false, 'error ' + err.message); }
  await ctx.close();
}

// ===================================================================================== TAPS：e2e-taps #1／#4，活店開著＋freezeAt c-soul、c-hiphop
async function taps(browser, w, h, size) {
  const { ctx, page } = await openNight(browser, w, h, { q: '&crowd=1&strict=1', settle: 1500 });
  try {
    await C(page, () => window.__lab.crowd.freezeAt(['c-soul', 'c-hiphop']));
    await sleep(600);
    await C(page, () => { const st = window.__lab.stage; window.__taps = []; st.onAction = (a, hot) => { window.__taps.push(hot && hot.id); }; });
    const S = await C(page, () => { const st = window.__lab.stage, sh = st.shop, hb = st.host.getBoundingClientRect(); return { host: [hb.left, hb.top], pts: sh.hotPoints(), hots: sh.hotList().filter(h => !h.occluder).map(h => ({ id: h.id, enabled: h.enabled, gone: !!h.gone })) }; });
    const topIsCanvas = (x, y) => C(page, ([x, y]) => document.elementFromPoint(x, y) === window.__lab.stage.shop.canvas, [x, y]);
    const tapGet = async (x, y) => { await C(page, () => { window.__taps = []; }); await page.touchscreen.tap(x, y); await sleep(40); return C(page, () => window.__taps.slice()); };
    const bad1 = [], cov = [];
    for (const p of S.pts) {
      const X = S.host[0] + p.x, Y = S.host[1] + p.y;
      if (!(await topIsCanvas(X, Y))) { cov.push(p.id); continue; }
      const got = await tapGet(X, Y);
      if (got.length !== 1 || got[0] !== p.id) bad1.push(p.id + '→' + JSON.stringify(got));
    }
    const ptIds = new Set(S.pts.map(p => p.id));
    const noPt = S.hots.filter(x => x.enabled && !x.gone && !ptIds.has(x.id)).map(x => x.id);
    const outOfView = await C(page, ids => { const sh = window.__lab.stage.shop; return ids.filter(id => !sh.hotRegion(id)); }, noPt);
    const lost = noPt.filter(id => !outOfView.includes(id));
    const people = S.pts.filter(p => /^cw-/.test(p.id)).map(p => p.id);
    record('TAPS #1', size, !bad1.length && !cov.length && !lost.length && people.length === 2,
      `活店開著、c-soul／c-hiphop 有人：hotPoints ${S.pts.length} 點（含人 ${people.join('、')}）真點都觸發自己` + (bad1.length ? '；錯 ' + bad1.join('、') : '') + (cov.length ? '；被 DOM 蓋住 ' + cov.join('、') : '') + (lost.length ? '；看得到卻沒點 ' + lost.join('、') : ''));
    const furn = await C(page, () => {
      const sh = window.__lab.stage.shop, DS = window.DipShop, hl = sh.hotList(), v = sh.view(), out = [];
      const props = []; hl.forEach(h => { if (h.prop && h.depth >= 0 && props.indexOf(h.prop) < 0) props.push(h.prop); });
      props.forEach(o => {
        const mine = hl.filter(h => h.prop === o);
        let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
        mine.forEach(h => h.shape.forEach(r => { x0 = Math.min(x0, r[0]); y0 = Math.min(y0, r[1]); x1 = Math.max(x1, r[0] + r[2]); y1 = Math.max(y1, r[1] + r[3]); }));
        y0 = Math.max(y0, v.y); y1 = Math.min(y1, v.y + v.h); x0 = Math.max(0, x0); x1 = Math.min(v.w, x1);
        if (x1 <= x0 || y1 <= y0) return;
        const w = x1 - x0, hh = y1 - y0, m = new Uint8Array(w * hh); let n = 0;
        for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const t = DS.hitTop(hl, x, y); if (t && t.prop === o) { m[(y - y0) * w + (x - x0)] = 1; n++; } }
        if (!n) return;
        const c = DS.regionCenter({ box: [x0, y0, w, hh], m, n }), q = sh.hostCss(c.x + 0.5, c.y + 0.5);
        out.push({ name: o.id || o.type, own: mine.filter(h => !h.occluder).map(h => h.id), art: [c.x, c.y], x: q.x, y: q.y });
      });
      return out;
    });
    const bad4 = [];
    for (const f of furn) {
      const X = S.host[0] + f.x, Y = S.host[1] + f.y;
      if (!(await topIsCanvas(X, Y))) continue;
      const got = await tapGet(X, Y);
      if (got.some(id => !f.own.includes(id))) bad4.push(f.name + JSON.stringify(f.art) + '→' + JSON.stringify(got));
      if (!f.own.length && got.length) bad4.push(f.name + '（不能點）→' + JSON.stringify(got));
    }
    const e = errs(page);
    record('TAPS #4', size, !bad4.length && furn.length >= 15 && !e.length, `${furn.length} 件家具可見區中心：只觸發自己或什麼都沒有` + (bad4.length ? '；錯 ' + bad4.join('、') : '') + (e.length ? '；錯 ' + e.slice(0, 3).join(' | ') : ''));
  } catch (err) { record('TAPS', size, false, 'error ' + err.message); }
  await ctx.close();
}

// ===================================================================================== 給店主的截圖（dpr 2）＋影片
async function shots(browser, w, h, size) {
  const made = [];
  // 1. 來客畫面：2–3 位熟客在走在翻＋一個聊天泡泡
  {
    const { ctx, page } = await openNight(browser, w, h, { dpr: 2, fast: false, settle: 5000 });
    try {
      await quiet(page);
      await C(page, () => { const c = window.__lab.crowd; c.spawn('xiaoyu', 'c-citypop', { ms: 60000 }); c.spawn('akai', 'c-elec', { ms: 60000 }); c.spawn('datou', 'c-folk', { ms: 600 }); });
      await sleep(900);
      await C(page, () => window.__lab.crowd.chat('xiaoyu'));
      for (let i = 0; i < 30; i++) { const s = (await crowdSt(page)).slots.find(x => x.on && x.who === 'datou'); if (s && s.walking && s.y > 120) break; await sleep(100); }
      await sleep(300);
      await shot(page, `crowd-night-${size}.png`); made.push(`crowd-night-${size}.png`);
      // 2. 結帳（c-pay：背對、拿著一張、老闆 busy）
      await quiet(page);
      await C(page, () => { const c = window.__lab.crowd; c.spawn('laochen', 'c-pay', { ms: 60000 }); c.spawn('xiaoyu', 'c-soul', { ms: 60000 }); c.spawn('afang', 'c-hiphop', { ms: 60000 }); });
      await sleep(1500);
      await shot(page, `crowd-pay-${size}.png`); made.push(`crowd-pay-${size}.png`);
    } catch (err) { made.push('night error ' + err.message); }
    await ctx.close();
  }
  // 3. 周姐摘句（含出處行）
  {
    const { ctx, page } = await openNight(browser, w, h, { dpr: 2 });
    try {
      let done = false;
      await zhouSegs(page, { onQuote: async () => { if (!done) { done = true; await sleep(250); await shot(page, `crowd-zhou-${size}.png`); made.push(`crowd-zhou-${size}.png`); } }, stop: () => done });
    } catch (err) { made.push('zhou error ' + err.message); }
    await ctx.close();
  }
  // 4. 老闆小選單（第 3 位）
  await lc19(browser, w, h, size, { dpr: 2, shot: `crowd-ownermenu-${size}.png` }); made.push(`crowd-ownermenu-${size}.png`);
  // 5. 標題回訪（有人、點了出泡泡）
  const t = await lc18(browser, w, h, size, { dpr: 2, shot: `crowd-title-${size}.png` }); made.push(`crowd-title-${size}.png ${JSON.stringify(t)}`);
  // 6. 影片（390×664、真速度 12 秒：推門、換箱、點人聊天）
  if (process.env.LAB_VIDEO === '1') {
    const vdir = path.join(SHOTS, 'video-tmp'); fs.mkdirSync(vdir, { recursive: true });
    // 存檔先在另一個 context 種好（storageState 帶過去），錄影那頁一開就按繼續：片頭只有一下標題
    const q = Q('&crowd=1');
    const pre = await newPage(browser, w, h);
    await openTitle(pre.page, q); await seedRun(pre.page, { idx: 1, seen: { crowdIntro: true, expertIntro: true } });
    const state = await pre.ctx.storageState(); await pre.ctx.close();
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, hasTouch: true, isMobile: true, storageState: state, recordVideo: { dir: vdir, size: { width: w, height: h } } });
    const page = await ctx.newPage(); page._errors = [];
    await page.addInitScript(INSTR);
    try {
      await page.goto(q, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('[data-a=cont]', { state: 'visible', timeout: 10000 });
      await jsClick(page, '[data-a=cont]'); await waitScreen(page, 'night', 20000);
      await sleep(6500);
      const v = (await crowdSt(page)).slots.find(x => x.on && !x.hidden && !x.walking && x.y >= 160);
      if (v) await tapPerson(page, v.slot);
      await sleep(3500);
      const b = await bubble(page); if (b && b.more) await page.touchscreen.tap((b.rect[0] + b.rect[2]) / 2, (b.rect[1] + b.rect[3]) / 2);
      await sleep(4000);
    } catch (err) { made.push('video error ' + err.message); }
    const vp = await page.video().path();
    await ctx.close();
    fs.copyFileSync(vp, path.join(SHOTS, 'crowd.webm')); made.push('crowd.webm');
  }
  record('SHOTS', size, !made.some(x => /error/.test(x)), made.join('、') + ' → ' + SHOTS);
}

// ===================================================================================== 主程式
const RUN = { 1: lc1, 2: lc2, 4: lc4, 5: lc5, 6: lc6, 7: lc7, 8: lc8, 9: lc9, 10: lc10, 16: lc16, 17: lc17, 18: lc18, 19: lc19, 20: lc20 };
let browser;
if (BROWSER === 'webkit') {
  let webkit; try { ({ webkit } = require('playwright')); } catch (_) { ({ webkit } = require('/opt/node-tools/node_modules/playwright')); }
  const o = {}; if (process.env.HTTPS_PROXY) o.proxy = { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' };
  browser = await webkit.launch(o);
} else browser = await launch();
try {
  for (const [w, h] of SIZES) {
    const size = `${w}x${h}`;
    if (BROWSER === 'webkit') { await lc2b(browser, w, h, size, '（WebKit）'); continue; }
    for (const id of [1, 2, '2b', 4, 5, 6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 'TAPS', 'SHOTS']) {
      const key = id === '2b' ? 2 : id;
      if (!want(key, size) && !(ONLY && ONLY.has(id === '2b' ? '2B' : id === 2 ? '2A' : '-'))) continue;
      if (ONLY && !ONLY.has('2') && ((id === 2 && !ONLY.has('2A')) || (id === '2b' && !ONLY.has('2B')))) continue;
      if (id === '2b') await lc2b(browser, w, h, size);
      else if (id === 'TAPS') await taps(browser, w, h, size);
      else if (id === 'SHOTS') await shots(browser, w, h, size);
      else await RUN[id](browser, w, h, size);
    }
  }
} finally { await browser.close(); }
const failed = results.filter(r => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} PASS` + (failed.length ? `，FAIL：${failed.map(r => r.n + '[' + r.size + ']').join(' ')}` : ''));
process.exit(failed.length ? 1 : 0);
