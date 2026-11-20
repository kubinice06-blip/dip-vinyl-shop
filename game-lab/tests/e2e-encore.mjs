// game-lab/tests/e2e-encore.mjs：第 I 波 I-1「翻面」（王牌條件加成；程式裡叫 encore；scratchpad v5/wave-i SPEC-I §1.6、§1.9；契約 build1/CONTRACT.md）端對端測試。
//   店主 11-20 改名：玩家看得到的字一律叫「翻面」，不准出現「安可」（每項最後掃整頁的字）。
//   需要靜態伺服器：cd <repo 根> && python3 -m http.server 8765
//   LAB_BASE=http://localhost:8765 node game-lab/tests/e2e-encore.mjs
//   環境變數（見 e2e-lib.mjs）：LAB_BASE／LAB_URL；LAB_SIZES（這支預設 390x664,375x548）；ENC_ONLY＝只跑這幾項（例 1,3）；LAB_SHOTS＝目錄 → 另存截圖（dpr 2）
//
// 每個尺寸（真點：page.touchscreen.tap；造條件用 __lab.force（debugOutcome，caught:true＝看穿）與 duelLab.setNext（他這手出哪張哪色））：
//   1  預設模式（duelLab encore:true，經典 OK Computer）：開打王牌格灰籤「看穿→再丟」；丟王牌那手造看穿 → 結果框多一行「翻面！王牌回到手上（6 星）」、
//      王牌格回來變金（.enc.lit）、屬性鈕「王牌 經 6」、預覽「你・經典 6」、吐司「翻面！《OK Computer》可以再丟一次」停 ≥3 秒；
//      再丟（6 星）→ 王牌格不在手牌、沒有籤；同一場再看穿 → 不再翻面（log 沒有 enc、王牌格沒回來）
//   2  預設模式・留到下一位（真的一趟：種存檔、來客 → 開打）：丟王牌那手沒看穿 → 王牌格留著變淡（.ghost）、灰籤；點它＝上面一行說明（不能丟）；
//      下一手造看穿而且打贏這場 → 領獎畫面標題下「翻面留到下一位」（run.encCarry {give:'again'}）→ 下一位開打王牌格金籤「翻面×1」→
//      丟原王牌（7 星）→ 王牌回到手上 6 星（金）→ 再丟 → 收起；打贏 → 領獎沒有那行小字 → 再下一位王牌格灰籤（沒有留下來的）
//   3  ?apex=1 OK Computer（聲望 6／12 開打）：發動回 2 → 發動那手造看穿不翻面 → 下一手造看穿 → 能力格回到可以發動（data-apex can、金籤）、
//      結果框「翻面！再發動一次」、吐司「…可以再發動一次」點了就收 → 再發動回 2 → 籤收起；apexHist[0].heal 2、apexOn.heal 2；
//      上一手詳情第 1、3 手（兩次發動那手）都有「王牌：回 2 聲望」那句。滿聲望（11／12 開打）：發動回 1 → 造看穿翻面 → 發動鈕灰、寫原因
//   4  ?apex=1 Glenn Gould（整場型：比星多算 1）：發動 → 下一手造看穿 → 王牌格籤「下一手 +1 星」（金）、engine preview 的 notes 有「翻面：+1 星」→
//      那手出牌 clash notes 有那句 → 打完籤收起
//   5  ?apex=1 Lou Reed《Metal Machine Music》（異端整場型 critLeech：連剋 → 下一手剋中多扣 2）：發動、連剋兩手（debugOutcome counter）→
//      籤「下一手剋中多扣 2」→ 那手他唬你、你剋中（setNext）：扣的＝同一份對決去掉翻面的 preview（已含倍數）＋2（＝「(原本×倍數)＋2」）、結果句有「翻面：剋中多扣 2」
//   6  版面（每個尺寸）：王牌格的籤在王牌格裡、不壓到提示框；吐司在舞台那條（不蓋盤面）；結果框那行在結果框裡；變淡王牌格的說明框在畫面裡
//   7  說明：唱片資訊（7 星王牌「王牌翻面：丟出之後…」；?apex=1 頂點卡「王牌翻面：看穿他一次…」）、規則卡一段「翻面：…」（不捲）、
//      ?apex=1 挑王牌面板三派 45 張逐一點（收到的＝選、沒收到的＝看說明）：「翻面：…」一行＝engine encoreLine、一行放得下（面板不捲、「就這張」在畫面裡）；點那行＝看全文
//   每項最後看主控台 0 錯誤、畫面上的字沒有「安可」。任何 FAIL → exit 1。
import fs from 'fs';
import { launch, newPage, SIZES as SIZES0, record, results, sleep, openTitle, Q, duelReady, tapAt, hitPoint, jsClick, waitScreen, seededContinue, seedRun, passLoot,
  longPress, infoOpen, closeInfo, noScroll, scrollOk } from './e2e-lib.mjs';

const SIZES = process.env.LAB_SIZES ? SIZES0 : [[390, 664], [375, 548]];
const ONLY = (process.env.ENC_ONLY || '').split(',').filter(Boolean).map(Number);
const want = n => !ONLY.length || ONLY.includes(n);
const SHOTS = process.env.LAB_SHOTS ? process.env.LAB_SHOTS.replace(/\/+$/, '') + '/' : null;
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
const C = (page, f, a) => page.evaluate(f, a);
const OKC = 'radiohead|ok computer', GOULD = 'glenn gould|bach: the goldberg variations (1955)', MMM = 'lou reed|metal machine music';
const short = x => JSON.stringify(x).slice(0, 400);
const errs = page => page._errors.filter(e => !/favicon/.test(e));
async function shot(page, name) { if (SHOTS) await page.screenshot({ path: SHOTS + name }); }
const noAnko = page => C(page, () => !(document.body.innerText || '').includes('安可'));

// 吐司（.lb-toast.enc）出現、加 .out（開始淡出）的時間
async function watchToasts(page) {
  await C(page, () => {
    window.__encT = [];
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => {
      if (!n.classList || !n.classList.contains('lb-toast') || !n.classList.contains('enc')) return;
      const rec = { t: n.textContent, at: performance.now(), out: null };
      window.__encT.push(rec);
      new MutationObserver(() => { if (rec.out == null && n.classList.contains('out')) rec.out = performance.now(); }).observe(n, { attributes: true, attributeFilter: ['class'] });
    }))).observe(document.getElementById('app'), { childList: true });
  });
}
const toasts = page => C(page, () => (window.__encT || []).map(x => ({ t: x.t, ms: x.out == null ? null : Math.round(x.out - x.at), age: Math.round(performance.now() - x.at) })));
async function waitToast(page, k, ms = 22000) { return page.waitForFunction(k => (window.__encT || []).length > k, k, { timeout: ms }).then(() => true, () => false); }

// 王牌格的狀態
const aceTile = page => C(page, () => {
  const t = document.querySelector('.dl .tiles .tile[data-i="ace"]'); if (!t) return { has: false };
  const g = t.querySelector('.enctag'), r = t.getBoundingClientRect(), gr = g ? g.getBoundingClientRect() : null;
  return { has: true, cls: t.className, apex: t.dataset.apex || null, tag: g ? g.textContent : null, tagCls: g ? g.className : null, enc: g ? g.dataset.enc : null,
    rect: [r.left, r.top, r.right, r.bottom], tagRect: gr ? [gr.left, gr.top, gr.right, gr.bottom] : null };
});
const V = page => C(page, () => { const d = window.__lab.rawDuel(); return d ? window.DipLabEngine.view(d) : null; });
const lastHand = page => C(page, () => { const g = window.DipLabDuel.debug(); const h = g && g.last; return h ? { n: h.n, ct: h.ct, evs: h.evs.map(e => ({ t: e.t, give: e.give, src: e.src, heal: e.heal, notes: e.notes })) } : null; });
async function lab(page, o) { await C(page, o => window.__lab.duelLab.start(o), o); await duelReady(page, 15000); await sleep(300); }
async function force(page, o) { await C(page, o => window.__lab.force(o), o || null); }
// 出手牌第 i 張（那張最高的那色）；回這手打完（換手好了）或打完整場
async function throwCard(page, i = 0) {
  await tapAt(page, `dt:card-${i}`); await sleep(220);
  await tapAt(page, '.dl .hand .pop .ab.top');
  return settle(page);
}
async function throwAce(page) {
  await tapAt(page, 'dt:card-ace'); await sleep(220);
  const chip = await C(page, () => { const b = document.querySelector('.dl [data-tut="chip-ace"]'); const s = document.querySelector('.dl .slot.p.pre .num'); return b ? { n: b.querySelector('b').textContent, pre: s ? s.textContent : null } : null; });
  if (!chip) return { chip: null };
  await tapAt(page, '.dl [data-tut="chip-ace"]');
  await settle(page);
  return { chip };
}
async function settle(page) {
  await sleep(200);
  return page.waitForFunction(() => { const D = window.DipLabDuel, g = D && D.debug && D.debug(); if (!g) return true; return (g.phase === 'choose' && !g.busy) || g.phase === 'over' || window.__lab.screen() !== 'duel'; }, null, { timeout: 15000 }).then(() => true, () => false);
}
async function fireApex(page) {
  await tapAt(page, 'dt:card-ace'); await sleep(420);            // 能力框打開 300 ms 內的點擊不算（duel.js 防連點）
  const box = await C(page, () => { const b = document.querySelector('.dl .apx-box'); if (!b || b.hidden) return null; const g = b.querySelector('.go'), e = b.querySelector('.enc'); return { go: !!g && !g.disabled, enc: e ? e.textContent : null, full: !!b.querySelector('.full') }; });
  if (box && box.go) { await tapAt(page, '.dl .apx-box .go'); await sleep(300); }
  else await C(page, () => window.DipLabDuel.api().apex(false));
  return box;
}
// 真的看穿（不用 debugOutcome：結果句、王牌那句照真的算）：他這手明指／半指、手牌第 i 張最高那色 X 剋 Y、Y 是看得出來的唬、他手牌有一張出 Y 你剋得中 → setNext 後出 i。
//   這手提示是不露（沒有唬可以看穿）＝改用 force caught（回 'forced'）
async function catchHand(page) {
  const pl = await C(page, () => {
    const d = window.__lab.rawDuel(), E = window.DipLabEngine, BE = { o: 'c', c: 'h', h: 'o' }, h = d.plan.hint;
    for (let i = 0; i < d.p.hand.length; i++) {
      const c = d.p.hand[i]; if (!c) continue;
      const X = E.topAttr(c), Y = BE[X];
      if (!(h.kind === 'one' ? Y !== h.attr : h.kind === 'half' ? Y === h.not : false)) continue;
      for (let j = 0; j < d.e.hand.length; j++) { const p = E.preview(d, { i, attr: X }, { i: j, attr: Y }); if (p && p.kind === 'counter' && p.toE > 0) return { i, j, X, Y }; }
    }
    return null;
  });
  if (!pl) { await force(page, { kind: 'counter', toE: 1, toP: 0, caught: true }); await throwCard(page, 0); await force(page, null); return 'forced'; }
  await C(page, p => window.__lab.duelLab.setNext({ i: p.j, attr: p.Y }), pl);
  await tapAt(page, `dt:card-${pl.i}`); await sleep(220);
  await tapAt(page, `.dl [data-tut="chip-${pl.i}-${pl.X}"]`);
  await settle(page);
  return 'real';
}
const inside = (a, b, pad = 1) => !!a && !!b && a[0] >= b[0] - pad && a[1] >= b[1] - pad && a[2] <= b[2] + pad && a[3] <= b[3] + pad;
const meets = (a, b) => !!a && !!b && a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
const rectOf = (page, sel) => C(page, s => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return r.width ? [r.left, r.top, r.right, r.bottom] : null; }, sel);

async function runSize(browser, w, h) {
  const size = `${w}x${h}`;
  // ---------------------------------------------------------------- 1：預設模式・丟王牌那手看穿 → 王牌回到手上 6 星
  if (want(1) || want(6)) {
    const { ctx, page } = await newPage(browser, w, h, { dpr: SHOTS ? 2 : 1 });
    try {
      await openTitle(page, Q('&fast=1'));
      await watchToasts(page);
      await lab(page, { ace: 'hall', enemy: 'copycat', seed: 2, encore: true });
      const U = await C(page, () => window.DipLabContent.encore.ui);
      const t0 = await aceTile(page), v0 = await V(page);
      await shot(page, `${size}-1a-idle.png`);
      await force(page, { kind: 'counter', toE: 2, toP: 0, caught: true });
      const a1 = await throwAce(page);
      await force(page, null);
      const h1 = await lastHand(page), t1 = await aceTile(page), v1 = await V(page);
      const gotT = await waitToast(page, 0);
      await shot(page, `${size}-1b-back.png`);
      // 王牌又可以丟：打開看星數（不丟）
      await tapAt(page, 'dt:card-ace'); await sleep(250);
      const pre6 = await C(page, () => { const b = document.querySelector('.dl [data-tut="chip-ace"]'), s = document.querySelector('.dl .slot.p.pre .num'); return { chip: b ? b.querySelector('b').textContent : null, pre: s ? s.textContent : null }; });
      await shot(page, `${size}-1c-six.png`);
      // 版面（6）：籤在王牌格裡、不壓提示框；吐司在盤面上面
      const lay = await C(page, () => {
        const R = s => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return r.width ? [r.left, r.top, r.right, r.bottom] : null; };
        return { tag: R('.dl .tile[data-i="ace"] .enctag'), tile: R('.dl .tile[data-i="ace"]'), hint: R('.dl .hint'), board: R('.dl'), toast: R('.lb-toast.enc'), vw: innerWidth, vh: innerHeight };
      });
      await C(page, () => window.DipLabDuel.select(null));
      await sleep(3600);
      const ts = await toasts(page);
      // 再丟（6 星，不看穿）→ 收起
      await force(page, { kind: 'counter', toE: 1, toP: 0, caught: false });
      const a2 = await throwAce(page);
      await force(page, null);
      const t2 = await aceTile(page), v2 = await V(page);
      // 同一場再看穿（手牌）→ 不再翻面
      await force(page, { kind: 'counter', toE: 1, toP: 0, caught: true });
      await throwCard(page, 0);
      await force(page, null);
      const h3 = await lastHand(page), t3 = await aceTile(page), v3 = await V(page);
      const fails = [];
      if (!(t0.has && t0.tag === '看穿→再丟' && /\bwait\b/.test(t0.tagCls) && v0.enc && v0.enc.state === 'idle')) fails.push('開打 ' + short([t0, v0 && v0.enc]));
      if (!(a1.chip && a1.chip.n === '7')) fails.push('第一次丟 7 星 ' + short(a1));
      if (!(h1 && h1.ct.encLine === '翻面！王牌回到手上（6 星）' && h1.evs.some(e => e.t === 'encore' && e.give === 'again' && e.src === 'hit'))) fails.push('結果框 ' + short(h1 && [h1.ct.encLine, h1.evs]));
      if (!(t1.has && /\benc\b/.test(t1.cls) && /\blit\b/.test(t1.cls) && /\blit\b/.test(t1.tagCls || '') && v1.aceStar === 6 && v1.enc.state === 'hit')) fails.push('王牌回來 ' + short([t1, v1 && v1.enc]));
      if (!(pre6.chip === '6' && pre6.pre === '6')) fails.push('6 星 ' + short(pre6));
      if (!(gotT && ts.length === 1 && ts[0].t === '翻面！《OK Computer》可以再丟一次' && ts[0].ms >= 2950)) fails.push('吐司 ' + short(ts));
      if (!(a2.chip && a2.chip.n === '6' && !t2.has && v2.enc.state === 'done' && v2.aceUsed)) fails.push('再丟收起 ' + short([a2, t2, v2 && v2.enc]));
      if (!(h3 && !h3.evs.some(e => e.t === 'encore') && !h3.ct.encLine && !t3.has && v3.enc.state === 'done')) fails.push('再看穿不再翻面 ' + short([h3 && h3.evs, t3]));
      const anko = await noAnko(page), er = errs(page);
      if (want(1)) record(1, size, !fails.length && anko && !er.length, fails.length ? fails.join('；') : `灰籤「${t0.tag}」→ 看穿「${h1.ct.encLine}」金、經 6、吐司 ${ts[0].ms} ms → 再丟收起、再看穿不翻面${anko ? '' : '；有「安可」'}${er.length ? '；主控台 ' + er.join(' | ') : ''}`);
      if (want(6)) {
        const f6 = [];
        if (!(inside(lay.tag, lay.tile) && !meets(lay.tag, lay.hint))) f6.push('籤 ' + short([lay.tag, lay.tile, lay.hint]));
        if (!(lay.toast && !meets(lay.toast, lay.board) && lay.toast[0] >= 0 && lay.toast[2] <= lay.vw)) f6.push('吐司 ' + short([lay.toast, lay.board]));
        record('6a', size, !f6.length, f6.length ? f6.join('；') : `籤 ${short(lay.tag)} 在王牌格裡、不壓提示框；吐司 ${short(lay.toast)} 在盤面上面`);
      }
    } catch (e) { record(1, size, false, 'error ' + e.message); }
    await ctx.close();
  }
  // ---------------------------------------------------------------- 2：預設模式・留到下一位（真的一趟）
  if (want(2) || want(6)) {
    const { ctx, page } = await newPage(browser, w, h, { dpr: SHOTS ? 2 : 1 });
    try {
      await seededContinue(page, { ace: 'hall', idx: 0 }, Q('&fast=1'));
      await waitScreen(page, 'night'); await sleep(500);
      await jsClick(page, '[data-a=go]');
      await duelReady(page, 25000);
      await page.waitForFunction(() => !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
      await sleep(300);
      const fails = [];
      const pos0 = await C(page, () => window.__lab.run.pos);
      const t0 = await aceTile(page);
      await force(page, { kind: 'counter', toE: 1, toP: 0, caught: false });
      await throwAce(page);
      await force(page, null);
      const tg = await aceTile(page), vg = await V(page);
      // 點變淡的王牌格＝說明（不能丟）
      await tapAt(page, 'dt:card-ace'); await sleep(300);
      const tip = await C(page, () => { const p = document.querySelector('.dl .dl-pop'), b = document.querySelector('.dl [data-tut="chip-ace"]'); const r = p && !p.hidden ? p.getBoundingClientRect() : null; return { tx: p && !p.hidden ? p.textContent : null, chip: !!b, rect: r ? [r.left, r.top, r.right, r.bottom] : null, vw: innerWidth, vh: innerHeight }; });
      await shot(page, `${size}-2a-ghost.png`);
      const line = await C(page, () => window.DipLabEngine.encoreLine(window.DipLabContent, window.DipLabEngine.aceEncoreOf(window.DipLabContent, 'hall', false), { ace: true }));
      if (!(tg.has && /\bghost\b/.test(tg.cls) && tg.tag === '看穿→再丟' && /\bwait\b/.test(tg.tagCls) && vg.enc.state === 'wait' && vg.aceUsed)) fails.push('丟了在等 ' + short([tg, vg && vg.enc]));
      if (!(tip.tx === line && !tip.chip)) fails.push('點變淡王牌格 ' + short([tip, line]));
      if (want(6)) record('6b', size, !!tip.rect && tip.rect[0] >= 0 && tip.rect[2] <= tip.vw && tip.rect[1] >= 0, `說明框 ${short(tip.rect)}（畫面 ${tip.vw}×${tip.vh}）`);
      // 下一手看穿而且打贏 → 留到下一位
      await force(page, { kind: 'counter', toE: 99, toP: 0, caught: true });
      await throwCard(page, 0);
      await force(page, null);
      await waitScreen(page, 'reward', 20000); await sleep(1500);
      const rw = await C(page, () => { const p = document.querySelector('#panel .lb-sheet.reward .lb-enccarry'); return { tx: p ? p.textContent : null, carry: window.__lab.run.encCarry, vis: !!p && p.getBoundingClientRect().height > 0 }; });
      await shot(page, `${size}-2b-carry.png`);
      if (!(rw.tx === '翻面留到下一位' && rw.vis && rw.carry && rw.carry.give === 'again')) fails.push('領獎小字 ' + short(rw));
      await passLoot(page);
      await waitScreen(page, 'night', 20000); await sleep(500);
      await jsClick(page, '[data-a=go]');
      await duelReady(page, 25000);
      await page.waitForFunction(() => !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
      await sleep(300);
      const tc = await aceTile(page), vc = await V(page), pos1 = await C(page, () => window.__lab.run.pos);
      await shot(page, `${size}-2c-carrytag.png`);
      await force(page, { kind: 'counter', toE: 1, toP: 0, caught: false });
      const ac1 = await throwAce(page);
      await force(page, null);
      const tb = await aceTile(page), vb = await V(page);
      await force(page, { kind: 'counter', toE: 1, toP: 0, caught: false });
      const ac2 = await throwAce(page);
      await force(page, null);
      const td = await aceTile(page), vd = await V(page);
      if (!(pos1 === pos0 + 1 && tc.has && tc.tag === '翻面×1' && /\blit\b/.test(tc.tagCls) && vc.enc.state === 'carry' && vc.enc.carry)) fails.push('下一位金籤 ' + short([pos0, pos1, tc, vc && vc.enc]));
      if (!(ac1.chip && ac1.chip.n === '7' && tb.has && /\blit\b/.test(tb.cls) && vb.aceStar === 6 && vb.enc.state === 'hit')) fails.push('丟原王牌 → 6 星回來 ' + short([ac1, tb, vb && vb.enc]));
      if (!(ac2.chip && ac2.chip.n === '6' && !td.has && vd.enc.state === 'done')) fails.push('再丟收起 ' + short([ac2, td, vd && vd.enc]));
      // 打贏（沒有留下來的）→ 領獎沒有小字 → 再下一位灰籤
      await C(page, () => window.__lab.forceWin());
      await waitScreen(page, 'reward', 20000); await sleep(1500);
      const rw2 = await C(page, () => ({ p: !!document.querySelector('#panel .lb-enccarry'), carry: window.__lab.run.encCarry }));
      await passLoot(page);
      await waitScreen(page, 'night', 20000); await sleep(500);
      await jsClick(page, '[data-a=go]');
      await duelReady(page, 25000); await sleep(400);
      const tn = await aceTile(page), vn = await V(page);
      if (!(!rw2.p && rw2.carry == null && tn.has && tn.tag === '看穿→再丟' && /\bwait\b/.test(tn.tagCls) && vn.enc.state === 'idle')) fails.push('再下一位 ' + short([rw2, tn, vn && vn.enc]));
      const anko = await noAnko(page), er = errs(page);
      if (want(2)) record(2, size, !fails.length && anko && !er.length, fails.length ? fails.join('；') : `第 ${pos0} 位：變淡灰籤、點了「${tip.tx}」→ 看穿打贏 → 領獎「${rw.tx}」→ 第 ${pos1} 位金籤「${tc.tag}」→ 7 星 → 6 星回來 → 收起 → 下一位灰籤${anko ? '' : '；有「安可」'}${er.length ? '；主控台 ' + er.join(' | ') : ''}`);
    } catch (e) { record(2, size, false, 'error ' + e.message); }
    await ctx.close();
  }
  // ---------------------------------------------------------------- 3：?apex=1 OK Computer 再發動一次
  if (want(3)) {
    const { ctx, page } = await newPage(browser, w, h, { dpr: SHOTS ? 2 : 1 });
    try {
      await openTitle(page, Q('&fast=1&apex=1'));
      await watchToasts(page);
      await lab(page, { ace: 'hall', aceId: OKC, enemy: 'copycat', seed: 3, encore: true, hpNow: 6 });
      const fails = [];
      const t0 = await aceTile(page);
      const b1 = await fireApex(page);
      const how1 = await catchHand(page);
      const h1 = await lastHand(page), t1 = await aceTile(page), v1 = await V(page);
      await shot(page, `${size}-3a-apexwait.png`);
      const how2 = await catchHand(page);
      const h2 = await lastHand(page), t2 = await aceTile(page), v2 = await V(page);
      const gotT = await waitToast(page, 0);
      await shot(page, `${size}-3b-apexlit.png`);
      // 吐司點了就收
      const tr = await rectOf(page, '.lb-toast.enc');
      if (tr) await page.touchscreen.tap((tr[0] + tr[2]) / 2, (tr[1] + tr[3]) / 2);
      await sleep(250);
      const ts = await toasts(page);
      // 再發動 → 回 2
      const hp0 = v2.pHp;
      const b2 = await fireApex(page);
      const vF = await V(page);
      await throwCard(page, 0);
      const t3 = await aceTile(page), v3 = await V(page);
      const raw = await C(page, () => { const d = window.__lab.rawDuel(); return { hist: d.p.apexHist.map(x => x.heal), on: d.p.apexOn && d.p.apexOn.heal, apexAt2: d.stats.apexAt2 }; });
      // 上一手詳情：第 1 手、第 3 手（兩次發動那手）都有回 2 那句（發動在出牌前、另外按的：回聲望記在 apexOn／apexHist 與那手的結果句）
      const rcAt = async k => { await C(page, k => window.DipLabDuel.api().recap('hand', k), k); await sleep(350); const t = await C(page, () => { const p = document.querySelector('.dl .dl-rc'); return p ? p.textContent : null; }); await C(page, () => window.DipLabDuel.api().recap(false)); await sleep(200); return t; };
      const rc1 = await rcAt(1), rc = await rcAt(3);
      const healNote = await C(page, () => (window.DipLabContent.apexTrial.notes.heal || '').replace('{d}', 2).replace('{h}', 2));
      if (!(t0.tag === '看穿→再一次' && /\bwait\b/.test(t0.tagCls) && b1 && b1.go && b1.enc === '翻面：看穿他一次，再發動一次。')) fails.push('開打 ' + short([t0, b1]));
      if (!(h1 && !h1.evs.some(e => e.t === 'encore') && t1.apex === 'used' && /\bwait\b/.test(t1.tagCls || '') && v1.enc.state === 'wait')) fails.push('發動那手不算 ' + short([h1 && h1.evs, t1, v1 && v1.enc]));
      if (!(h2 && h2.ct.encLine === '翻面！再發動一次' && t2.apex === 'can' && /\blit\b/.test(t2.tagCls || '') && v2.apex.can && !v2.apex.used)) fails.push('下一手看穿 → 能力回來 ' + short([h2 && h2.ct.encLine, t2, v2 && v2.apex]));
      if (!(gotT && ts.length === 1 && ts[0].t === '翻面！《OK Computer》可以再發動一次' && ts[0].ms != null && ts[0].ms < 1500)) fails.push('吐司點了收 ' + short(ts));
      if (!(b2 && b2.go && vF.pHp === hp0 + 2 && !t3.tag && v3.enc.state === 'done' && raw.hist[0] === 2 && raw.on === 2 && raw.apexAt2 === 3)) fails.push('再發動回 2 ' + short([b2, hp0, vF.pHp, t3, v3 && v3.enc, raw]));
      if (!(rc && healNote && rc.includes(healNote) && (how1 === 'forced' || (rc1 && rc1.includes(healNote))))) fails.push('上一手詳情 ' + short([how1, healNote, rc1, rc]));
      // 滿聲望：發動回 1 → 造看穿翻面 → 發動鈕灰、寫原因
      await lab(page, { ace: 'hall', aceId: OKC, enemy: 'copycat', seed: 4, encore: true, hpNow: 11 });
      await fireApex(page);
      await force(page, { kind: 'counter', toE: 1, toP: 0, caught: false });
      await throwCard(page, 0);
      await force(page, { kind: 'counter', toE: 1, toP: 0, caught: true });
      await throwCard(page, 0);
      await force(page, null);
      const tF = await aceTile(page), vFull = await V(page);
      const bF = await fireApex(page);
      const fullTx = await C(page, () => window.DipLabContent.apexTrial.ui.full);
      if (!(vFull.enc.state === 'hit' && vFull.apex.full && !vFull.apex.can && bF && !bF.go && bF.full && /\blit\b/.test(tF.tagCls || ''))) fails.push('滿聲望 ' + short([vFull && vFull.enc, vFull && vFull.apex, bF, tF, fullTx]));
      const anko = await noAnko(page), er = errs(page);
      record(3, size, !fails.length && anko && !er.length, fails.length ? fails.join('；') : `OK Computer（看穿 ${how1}／${how2}）：發動那手看穿不翻面 → 下一手看穿「${h2.ct.encLine}」、能力格 can、吐司點了 ${ts[0].ms} ms 收 → 再發動 ${hp0}→${vF.pHp}、apexHist ${raw.hist}；滿聲望發動鈕灰${anko ? '' : '；有「安可」'}${er.length ? '；主控台 ' + er.join(' | ') : ''}`);
    } catch (e) { record(3, size, false, 'error ' + e.message); }
    await ctx.close();
  }
  // ---------------------------------------------------------------- 4：?apex=1 Gould（整場型）→ 下一手 +1 星
  if (want(4)) {
    const { ctx, page } = await newPage(browser, w, h, { dpr: SHOTS ? 2 : 1 });
    try {
      await openTitle(page, Q('&fast=1&apex=1'));
      await lab(page, { ace: 'hall', aceId: GOULD, enemy: 'copycat', seed: 5, encore: true });
      const fails = [];
      await fireApex(page);
      await force(page, { kind: 'counter', toE: 1, toP: 0, caught: false });
      await throwCard(page, 0);
      await force(page, { kind: 'counter', toE: 1, toP: 0, caught: true });
      await throwCard(page, 0);
      await force(page, null);
      const h2 = await lastHand(page), t2 = await aceTile(page), v2 = await V(page);
      await shot(page, `${size}-4a-next.png`);
      const pv = await C(page, () => { const d = window.__lab.rawDuel(), E = window.DipLabEngine, a = E.legalActions(d).find(x => !x.ace && !x.apex); const p = E.preview(d, a, { i: d.plan.idx, attr: d.plan.attr }) || {}; return { a, notes: (p.notes || []).map(n => n.text || n) }; });
      await throwCard(page, 0);
      const h3 = await lastHand(page), t3 = await aceTile(page), v3 = await V(page);
      if (!(h2 && h2.ct.encLine === '翻面！下一手 +1 星' && t2.tag === '下一手 +1 星' && /\blit\b/.test(t2.tagCls || '') && v2.enc.next === 'star')) fails.push('看穿 → 下一手 ' + short([h2 && h2.ct.encLine, t2, v2 && v2.enc]));
      if (!pv.notes.includes('翻面：+1 星')) fails.push('preview ' + short(pv));
      const cn = h3 && (h3.evs.find(e => e.t === 'clash') || {}).notes || [];
      if (!(cn.some(n => (n.text || n) === '翻面：+1 星') && h3.ct.notes.includes('翻面：+1 星') && !t3.tag && v3.enc.state === 'done')) fails.push('那手 ' + short([cn, t3, v3 && v3.enc]));
      const anko = await noAnko(page), er = errs(page);
      record(4, size, !fails.length && anko && !er.length, fails.length ? fails.join('；') : `Gould：看穿 → 籤「${t2.tag}」→ preview 與結果句有「翻面：+1 星」→ 打完收起${anko ? '' : '；有「安可」'}${er.length ? '；主控台 ' + er.join(' | ') : ''}`);
    } catch (e) { record(4, size, false, 'error ' + e.message); }
    await ctx.close();
  }
  // ---------------------------------------------------------------- 5：?apex=1 Metal Machine Music（異端整場型）→ 連剋 → 下一手剋中多扣 2（倍數之後）
  if (want(5)) {
    const { ctx, page } = await newPage(browser, w, h, { dpr: SHOTS ? 2 : 1 });
    try {
      await openTitle(page, Q('&fast=1&apex=1'));
      await lab(page, { ace: 'heresy', aceId: MMM, enemy: 'copycat', seed: 6, encore: true });
      const fails = [];
      await fireApex(page);
      await force(page, { kind: 'counter', toE: 1, toP: 0 });
      await throwCard(page, 0);
      await force(page, { kind: 'counter', toE: 1, toP: 0 });
      await throwCard(page, 0);
      await force(page, null);
      const h2 = await lastHand(page), t2 = await aceTile(page), v2 = await V(page);
      await shot(page, `${size}-5a-hit.png`);
      // 他唬你、你剋中：挑手牌第 i 張的最高那色 X，他出被 X 剋的那色 Y（≠ 提示色＝看得出來的唬）、他手牌裡有那色的牌
      const plan = await C(page, () => {
        const d = window.__lab.rawDuel(), E = window.DipLabEngine, BE = { o: 'c', c: 'h', h: 'o' }, h = d.plan.hint;
        for (let i = 0; i < d.p.hand.length; i++) {
          const c = d.p.hand[i]; if (!c) continue;
          const X = E.topAttr(c), Y = BE[X];
          if (h.kind === 'one' ? Y === h.attr : h.kind === 'half' ? Y !== h.not : true) continue;
          for (let j = 0; j < d.e.hand.length; j++) {
            const cl = JSON.parse(JSON.stringify(d)); cl.p.enc.state = 'done';
            const p0 = E.preview(cl, { i, attr: X }, { i: j, attr: Y }), p1 = E.preview(d, { i, attr: X }, { i: j, attr: Y });
            if (p0 && p0.kind === 'counter' && p0.toE > 0) return { i, j, X, Y, toE0: p0.toE, toE1: p1.toE, n1: (p1.notes || []).map(n => n.text || n) };
          }
        }
        return null;
      });
      if (!plan) fails.push('找不到他唬你、你剋中的那手');
      else {
        await C(page, p => window.__lab.duelLab.setNext({ i: p.j, attr: p.Y }), plan);
        await tapAt(page, `dt:card-${plan.i}`); await sleep(220);
        await tapAt(page, `.dl [data-tut="chip-${plan.i}-${plan.X}"]`);
        await settle(page);
        const h3 = await lastHand(page), t3 = await aceTile(page);
        const cl = h3 && h3.evs.find(e => e.t === 'clash');
        if (!(cl && cl.notes && cl.notes.some(n => (n.text || n) === '翻面：剋中多扣 2') && h3.ct.notes.includes('翻面：剋中多扣 2'))) fails.push('結果句 ' + short(h3 && h3.ct.notes));
        const toE = await C(page, () => { const d = window.__lab.rawDuel(); return d.log[d.log.length - 1].toE; });
        if (!(toE === plan.toE0 + 2 && plan.toE1 === toE)) fails.push('扣分 ' + short({ toE, plan }));
        if (t3.tag) fails.push('那手打完籤沒收 ' + short(t3));
        if (!fails.length) plan.toE = toE;
      }
      if (!(h2 && h2.ct.encLine === '翻面！下一手剋中多扣 2' && t2.tag === '下一手剋中多扣 2' && /\blit\b/.test(t2.tagCls || '') && v2.enc.next === 'hit')) fails.push('連剋 → 籤 ' + short([h2 && h2.ct.encLine, t2, v2 && v2.enc]));
      const anko = await noAnko(page), er = errs(page);
      record(5, size, !fails.length && anko && !er.length, fails.length ? fails.join('；') : `MMM：連剋 → 籤「${t2.tag}」→ 拆穿那手扣 ${plan.toE}＝去掉翻面的 ${plan.toE0}（含倍數）＋2${anko ? '' : '；有「安可」'}${er.length ? '；主控台 ' + er.join(' | ') : ''}`);
    } catch (e) { record(5, size, false, 'error ' + e.message); }
    await ctx.close();
  }
  // ---------------------------------------------------------------- 7：說明（唱片資訊、規則卡、頂點卡挑王牌面板）
  if (want(7)) {
    const { ctx, page } = await newPage(browser, w, h, { dpr: SHOTS ? 2 : 1 });
    try {
      const fails = [];
      await openTitle(page, Q('&fast=1'));
      await lab(page, { ace: 'hall', enemy: 'copycat', seed: 2, encore: true });
      await longPress(page, ctx, 'dt:card-ace', 700);
      const i1 = await infoOpen(page) ? await C(page, () => { const e = document.querySelector('#cardInfoMask .drawcard > .enc'); return e ? e.textContent : null; }) : 'no-info';
      await shot(page, `${size}-7a-info.png`);
      await closeInfo(page);
      if (i1 !== '王牌翻面：丟出之後看穿他一次，王牌回到手上（6 星）。') fails.push('7 星王牌唱片資訊 ' + short(i1));
      await C(page, () => window.__lab.rules()); await sleep(500);
      const rl = await C(page, () => { const m = document.querySelector('.lb-modal'), p = m && m.querySelector('.renc'), pane = m && m.querySelector('.pane'); return { tx: p ? p.textContent : null, sc: pane ? pane.scrollHeight - pane.clientHeight : null, msc: m ? m.scrollHeight - m.clientHeight : null }; });
      const rule = await C(page, () => window.DipLabContent.encore.ui.rule);
      await shot(page, `${size}-7b-rules.png`);
      await C(page, () => { const b = document.querySelector('.lb-modal [data-x]'); if (b) b.click(); }); await sleep(300);
      if (!(rl.tx === rule && (rl.sc == null || rl.sc <= 1) && (rl.msc == null || rl.msc <= 1))) fails.push('規則卡 ' + short(rl));
      // ?apex=1：頂點卡唱片資訊、挑王牌面板
      await openTitle(page, Q('&fast=1&apex=1'));
      await lab(page, { ace: 'hall', aceId: OKC, enemy: 'copycat', seed: 2, encore: true });
      await longPress(page, ctx, 'dt:card-ace', 700);
      const i2 = await infoOpen(page) ? await C(page, () => { const e = document.querySelector('#cardInfoMask .apx .enc'); return e ? e.textContent : null; }) : 'no-info';
      await closeInfo(page);
      if (i2 !== '王牌翻面：看穿他一次，再發動一次。') fails.push('頂點卡唱片資訊 ' + short(i2));
      await openTitle(page, Q('&fast=1&apex=1'));
      await seedRun(page, { ace: 'heresy', idx: 0, ownAces: ['hall', 'pearl'], ownIds: [] });
      await openTitle(page, Q('&fast=1&apex=1'));
      await jsClick(page, '[data-a=cont]');
      await waitScreen(page, 'night');
      const up = await page.waitForSelector('.lb-sheet.apxpick .apx-c', { timeout: 9000 }).then(() => true, () => false);
      let bad = [], n = 0, worst = 0;
      if (up) {
        await sleep(600);
        for (const t of ['heresy', 'hall', 'pearl']) {
          await tapAt(page, `.lb-sheet.apxpick [data-tab="${t}"]`); await sleep(220);
          const ids = await C(page, () => [...document.querySelectorAll('.lb-sheet.apxpick .apx-c')].map(b => b.dataset.cid));
          for (const id of ids) {
            await tapAt(page, `.lb-sheet.apxpick .apx-c[data-cid="${id.replace(/"/g, '\\"')}"]`); await sleep(120);
            const st = await C(page, id => { const s = document.querySelector('.lb-sheet.apxpick'), e = s.querySelector('.apx-enc'), E = window.DipLabEngine, Cn = window.DipLabContent; const A = E.abilityOf(Cn, id);
              const ok = s.querySelector('[data-a=ok]').getBoundingClientRect();
              return { tx: e ? e.textContent : null, want: A && A.encore ? E.encoreLine(Cn, A.encore) : null, sc: s.scrollHeight - s.clientHeight, okIn: ok.bottom <= innerHeight && ok.top >= 0, oneLine: e ? e.getBoundingClientRect().height < 22 : false }; }, id);
            n++; worst = Math.max(worst, st.sc);
            if (!(st.tx && st.tx === st.want && st.sc <= 1 && st.okIn && st.oneLine)) bad.push(id + ' ' + short(st));
          }
        }
        await shot(page, `${size}-7c-apxpick.png`);
        // 點那行＝看全文（再點收回）
        await tapAt(page, '.lb-sheet.apxpick .apx-enc'); await sleep(150);
        const full = await C(page, () => document.querySelector('.lb-sheet.apxpick .apx-enc').classList.contains('full'));
        if (!full) bad.push('點那行沒展開');
      } else bad.push('挑王牌面板沒跳');
      if (bad.length) fails.push('頂點卡挑王牌面板：' + bad.slice(0, 4).join('；'));
      const anko = await noAnko(page), er = errs(page);
      record(7, size, !fails.length && anko && !er.length, fails.length ? fails.join('；') : `唱片資訊兩種、規則卡一段（不捲）、挑王牌面板 ${n} 張逐一點（最大捲動 ${worst}）${anko ? '' : '；有「安可」'}${er.length ? '；主控台 ' + er.join(' | ') : ''}`);
    } catch (e) { record(7, size, false, 'error ' + e.message); }
    await ctx.close();
  }
}

const browser = await launch();
try { for (const [w, h] of SIZES) await runSize(browser, w, h); }
finally { await browser.close(); }
const bad = results.filter(r => !r.ok);
console.log(`\n${results.length - bad.length}/${results.length} PASS`);
process.exit(bad.length ? 1 : 0);
