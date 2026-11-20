// game-lab/tests/e2e-fac.mjs：第 D 波棒二「三流派」（?fac=1 試做旗標）端對端測試（scratchpad v5/wave-d SPEC-D §3.2–§3.5、§3.9–§3.10、§6-3、§10.2 F1–F8；介面契約 build2/CONTRACT.md）。
//   需要靜態伺服器（repo 根目錄）：python3 -m http.server 8765
//   node game-lab/tests/e2e-fac.mjs
//   環境變數（見 e2e-lib.mjs）：LAB_BASE／LAB_URL；LAB_SIZES（這支預設 390x664,375x548）；FAC_ONLY＝只跑這幾項（例 2,4）
//
// 數字與字照規格寫死（不從 content 讀數字，免得引擎跟資料一起錯也過；畫面字從 C.factions 讀，跟規格的字逐字比）：
//   經典流「比」同色大 2 星以上扣整張、同色平手扣 1；冷門流「借」剋他一定剋得動、扣他那張、被剋多扣 1；異端流「拆」。
//   第二招：吸血一場最多回 2；反傷被剋他也扣 2、一場最多 2 次。本派格每 5 級（Lv5、10、15、20…）第 4 格、佔那一級（不加屬性）；中繼點選秀不出。
//   換一格（?fac=1&apex=1）：冷門 theirStar／pThr →「這手抓到他唬你，多扣 2。」
//
// 每個尺寸：
//   1  F1 開局派系卡：
//      a 序章第一次挑（新存檔、?fac=1；猜錯今晚那張）：.lb-sheet.acepick.fac 三張派系卡、預設停冷門、冷門「新手推薦」、經典「前期較難」、異端不標；
//        每張：名號「經典流・比」、軸「經 7」、一句定位、被動（黑）＋代價（灰）字＝C.factions、送的四張縮圖、「熟練 Lv1」；面板不捲、大鈕在畫面裡；
//        390 寬三欄（點哪張選哪張）；375 寬一次一張（軌道比可視寬、真的滑一下＝換到下一張、三個點跟著亮）；挑冷門 →「就這一派」→ run.ace pearl、run.fac 有（createRun 帶 fac:true）
//      b 換派（點老闆；冷門、經典解鎖，異端鎖）：沒有新手標；點（375＝點下方的點）鎖住的異端 → 選中的不變、異端 .peek、（390）說明那行「異端流還鎖著…」／（375）大鈕 .off 按了不關；
//        改挑經典 →「就這一派」→ run.ace hall、run.fac 還在、picks 空
//   5  F5 序章那場沒有被動（接 1a：一路到序章對決）：run.fac 有、duel.p.fac 沒有、頂欄沒有一字圖示、打完整場每手 clash 沒有 fac、結果行沒有任何流派小字、沒有第一次那句、save.seen.facFirst 沒記
//   2  F2 結果行（__lab.duelLab，經典、沒拿本派選項）：同色大 2 星那手 →「正面對決：扣整張 n」（n＝這手扣他的＝clash.toE）＋第一次那句（C.factions.hall.first）、
//      save.seen.facFirst.hall；頂欄一字圖示「比」（≥40×32）→ 點了本派說明（名號、被動、代價）；下一次觸發沒有第一次那句
//   4  F4 第二招上限：
//      a 經典＋吸血（聲望先扣到有空間）：整張那手回聲望（「吸血：回 n 聲望」）、累計回滿 2 之後再整張＝沒有吸血、facN.leech ≤ 2、view.fac.left.leech 0、本派說明「吸血這場還能回 0」
//      b 冷門＋反傷：被剋三手 → 前兩手「反傷：他也扣 2」、他聲望各 −2；第 3 手 clash.fac 沒有 thorn、他聲望不動、facN.thorn 2；每手「被剋：多扣 1」；第一次那句是冷門那句
//   3  F3 升到 Lv5（真的一趟、?fac=1、經典）：打贏 → 升級面板 4 格（前三格固定 品味→底氣→聲望上限（第 I 波 SPEC-I §7.1）、最後一格 [data-lv=fac][data-id]、圖示「比」、名字、「本派」、一句、「不加屬性」、沒有 undefined／NaN、
//      不捲、每格 ≥44）、老闆「這一級可以學一招本派的。」→ 點本派格：送 {type:'level', pick:'fac', id}、run.fac.picks[id] 1、品味／底氣／聲望上限都沒動、run.picks 最後 'fac:<id>'、
//      吐司「本派・<名>」→ 我的狀態「本派：<名>」→ 重新整理還在
//   6  F6 ?fac=1&apex=1：標題兩個章（>600px 高「頂點卡試做」＋「流派試做」並排不重疊；≤600px 只剩一顆「流派＋頂點卡試做」）、只開 ?fac=1 一顆「流派試做」、標題不捲；
//      content 換一格退回只標示（apexSwap.on false）時兩個都開＝章下小字「頂點卡跟流派一起試：有幾張還沒換能力」在畫面裡（只開一個沒有；現在 on true＝沒有小字）；
//      冷門帶派別的 run（對照表：頁面上把 on 打開再測）：挑王牌面板點 theirStar 那張 → 說明＝「這手抓到他唬你，多扣 2。」＋「跟流派一起試，這張換過能力」、角上時機＝這手；按住＝唱片資訊也是換過的；
//      同一份存檔拿掉 run.fac（沒帶派別的 run）＝原本的能力、沒有換過那行
//   7  F7 ?fac=1 開的 run 在沒旗標的頁面續玩（R-F9）：標題沒有「流派試做」、__lab.fac() false → 來客 → 開打：duel.p.fac 照樣有、頂欄「借」、
//      剋他那手「借他的份量：扣他 n」（n＝clash.toE）；我的狀態「本派：反傷」；存回去 run.fac 還在
//   8  F8 中繼點開局＋?fac=1：選秀每一題升級都只有三格、順序固定 品味→底氣→聲望上限（沒有 [data-lv=fac]、pending.offer 沒有 fac，含 Lv4→5 那題）、選秀送 {pick:'fac'} 被拒（'bad'）；
//      到第 10 位後 Lv19 打贏 → Lv20 升級面板第 4 格本派照出
//   每項最後看主控台 0 錯誤。任何 FAIL → exit 1。
import { launch, newPage, SIZES as SIZES0, record, results, sleep, Q, SEED, jsClick, tapAt, tapReady, waitScreen, noScroll, scrollOk, openTitle, seedRun,
  prologueToDuel, passLoot, watchSay, longPress, infoOpen, closeInfo, answerBargain } from './e2e-lib.mjs';

const SIZES = process.env.LAB_SIZES ? SIZES0 : [[390, 664], [375, 548]];
const ONLY = (process.env.FAC_ONLY || '').split(',').filter(Boolean).map(Number);
const want = n => !ONLY.length || ONLY.includes(n);
const C = (page, f, a) => page.evaluate(f, a);
const fill = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (o[k] != null ? o[k] : m));
const errs = page => (page._errors || []).filter(e => !/favicon/.test(e));
const errTx = page => `錯誤 ${errs(page).length}${errs(page).length ? '：' + errs(page).slice(0, 2).join(' / ') : ''}`;
const J = x => JSON.stringify(x);
const QF = (x = '') => Q('&fast=1&fac=1' + x);
const TIERS = ['hall', 'pearl', 'heresy'];

// ---- 規格的字（SPEC-D §3.1、§3.9、§4.2、§6-3；寫死，跟 content 逐字比）----
const SPEC = {
  title: { hall: '經典流', pearl: '冷門流', heresy: '異端流' }, icon: { hall: '比', pearl: '借', heresy: '拆' },
  newbie: { pearl: '新手推薦', hall: '前期較難' },
  notes: { full: '正面對決：扣整張 {n}', tieCost: '平手算你輸 {n}', borrow: '借他的份量：扣他 {n}', underdog: '以小搏大：扣他 {n}', cCost: '被剋：多扣 {n}',
    crit: '拆穿！多扣 {n}', crit2: '爆擊！多扣 {n}', heal: '回 {n} 聲望', loseCost: '比星輸：多扣 {n}', leech: '吸血：回 {n} 聲望', thorn: '反傷：他也扣 {n}' },
  badge: '流派試做', badgeBoth: '流派＋頂點卡試做', pickTag: '本派', pickNote: '不加屬性', pickFirst: '這一級可以學一招本派的。',
  swapTheirStar: '這手抓到他唬你，多扣 2。'
};
// 畫面字（content）
const FT = page => C(page, () => { const Cn = window.DipLabContent, F = Cn.factions, o = { ui: Object.assign({}, F.ui), notes: Object.assign({}, F.notes), aceTitle: Object.assign({}, Cn.aceTitle), aceIcon: Object.assign({}, Cn.aceIcon || {}),
  aceNewbie: Object.assign({}, Cn.aceNewbie || {}), lockedNote: Cn.trial && Cn.trial.ui ? Cn.trial.ui.aceLockedNote : '', aceLocked: Cn.trial && Cn.trial.ui ? Cn.trial.ui.aceLocked : '', axis: Object.assign({}, Cn.aceAxis), gifts: {} };
  for (const t of ['hall', 'pearl', 'heresy']) { o[t] = { name: F[t].name, icon: F[t].icon, tagline: F[t].tagline, passive: F[t].passive, cost: F[t].cost, first: F[t].first, picks: F[t].picks.map(p => ({ id: p.id, name: p.name, text: p.text, second: !!p.second })) }; o.gifts[t] = (Cn.gifts[t] || []).length; }
  return o; });
const stored = page => C(page, () => JSON.parse(localStorage.getItem('dipGameLab_v1') || 'null'));
// 吐司：一出現就記（升級選完 300 ms 就換畫面）
async function watchToasts(page) {
  await page.addInitScript(() => {
    window.__toasts = [];
    const start = () => new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.classList && n.classList.contains('lb-toast')) window.__toasts.push(n.textContent); })))
      .observe(document.documentElement, { childList: true, subtree: true });
    if (document.documentElement) start(); else document.addEventListener('DOMContentLoaded', start);
  });
}
// E.choose 收到的（畫面 doChoose 送什麼）：ui 的 E 是同一個物件，包一層就記得到
const watchChoose = page => C(page, () => {
  const E = window.DipLabEngine; window.__chooses = [];
  if (E.__chooseW) return true;
  const o = E.choose; E.choose = function (r, Cn, ch) { try { window.__chooses.push(JSON.parse(JSON.stringify(ch))); } catch (_) {} return o.apply(this, arguments); };
  E.__chooseW = true; return true;
});

// ---- 開局派系卡 ----
const facSheet = page => C(page, () => {
  const s = document.querySelector('.lb-sheet.acepick'); if (!s) return null;
  const rail = s.querySelector('.fx-rail'), ok = s.querySelector('[data-a=ok]'), okR = ok.getBoundingClientRect(), sr = s.getBoundingClientRect(), rr = rail ? rail.getBoundingClientRect() : null;
  const tx = (c, q) => { const e = c.querySelector(q); return e ? e.textContent : null; };
  const cards = [...s.querySelectorAll('.lb-ct')].map(c => { const b = c.getBoundingClientRect(); return { t: c.dataset.tier, fxc: c.classList.contains('fxc'), sel: c.classList.contains('sel'), locked: c.classList.contains('locked'), peek: c.classList.contains('peek'),
    nm: tx(c, '.fx-nm'), ax: tx(c, '.fx-ax'), tag: tx(c, '.fx-tag'), pas: tx(c, '.fx-pas'), pasB: tx(c, '.fx-pas b'), cost: tx(c, '.fx-cost'), costB: tx(c, '.fx-cost b'), nb: tx(c, '.nbtag'), lk: tx(c, '.fx-lk'),
    gifts: c.querySelectorAll('.fx-gift .lb-cv').length, prof: tx(c, '.fx-prof'), cover: !!c.querySelector('.fx-cv'),
    l: Math.round(b.left), r: Math.round(b.right), w: Math.round(b.width), h: Math.round(b.height),
    pasColor: (e => e ? getComputedStyle(e).color : null)(c.querySelector('.fx-pas')), costColor: (e => e ? getComputedStyle(e).color : null)(c.querySelector('.fx-cost')) }; });
  const det = s.querySelector('.detail');
  return { fac: s.classList.contains('fac'), cards, sel: (s.querySelector('.lb-ct.sel') || { dataset: {} }).dataset.tier || null,
    narrow: !!rail && rail.scrollWidth > rail.clientWidth + 4, railW: rail ? [rail.scrollWidth, rail.clientWidth] : null, railL: rr ? [Math.round(rr.left), Math.round(rr.right)] : null,
    dots: [...s.querySelectorAll('.fx-dots [data-dot]')].map(b => b.dataset.dot + (b.classList.contains('on') ? '*' : '') + (b.classList.contains('lk') ? '!' : '')),
    det: det && !det.hidden ? det.textContent : '', okTx: ok.textContent, okOff: ok.classList.contains('off'), okIn: okR.top >= 0 && okR.bottom <= innerHeight + 0.5, okH: Math.round(okR.height),
    sh: s.scrollHeight, ch: s.clientHeight, top: Math.round(sr.top), bottom: Math.round(sr.bottom), vh: innerHeight, vw: innerWidth, docX: document.documentElement.scrollWidth - innerWidth };
});
// 新存檔（?fac=1）：推門 → 序章一路點到挑王牌面板；guess＝猜哪一派的那張（今晚那張是經典＝種子 20261106）
async function toAcepick(page, guess) {
  await jsClick(page, '[data-a=quiet]');
  for (let g = 0; g < 900; g++) {
    const st = await C(page, () => ({ sheet: (document.querySelector('#panel > .lb-sheet') || {}).className || '', choice: !!document.querySelector('.lb-dq .nx.on.choice'), menu: document.querySelectorAll('.lb-dq.hasmenu .lb-dqopt').length,
      arming: !!document.querySelector('#panel > .lb-sheet.arming, .lb-dq .menu.arming') }));
    if (/acepick/.test(st.sheet) && !st.arming) return true;
    if (st.arming) { await sleep(100); continue; }
    if (/guess/.test(st.sheet)) { await sleep(350); await C(page, t => { const id = window.DipLabContent.aces[t]; const ct = [...document.querySelectorAll('.lb-sheet.guess .lb-ct')].find(x => x.dataset.cid === id); if (ct) ct.querySelector('[data-pick]').click(); }, guess); await sleep(1300); continue; }
    if (st.menu) { await sleep(350); await jsClick(page, '.lb-dq .lb-dqopt[data-i="0"]'); await sleep(250); continue; }
    if (st.choice) { await jsClick(page, '.lb-dq'); await sleep(150); continue; }
    await sleep(100);
  }
  return false;
}
// 真的滑一下軌道（觸控拖曳：touchStart → 12 次 touchMove → touchEnd，瀏覽器自己捲、scroll-snap 自己停；dx<0＝往左滑＝看下一張）
//   （CDP Input.synthesizeScrollGesture 在這個 Chromium（isMobile＋hasTouch 情境）完全不捲，換成逐點的觸控事件）
async function swipeRail(page, ctx, dx) {
  const r = await C(page, () => { const e = document.querySelector('.lb-sheet.acepick .fx-rail'); if (!e) return null; const b = e.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + Math.min(b.height / 2, 80), l0: e.scrollLeft }; });
  if (!r) return null;
  const cdp = await ctx.newCDPSession(page);
  const x0 = Math.round(r.x - dx / 2), y0 = Math.round(r.y), steps = 12;
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x0, y: y0 }] });
  for (let k = 1; k <= steps; k++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: Math.round(x0 + dx * k / steps), y: y0 }] }); await sleep(16); }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await cdp.detach().catch(() => {});
  await sleep(900);
  const l1 = await C(page, () => document.querySelector('.lb-sheet.acepick .fx-rail').scrollLeft);
  return { l0: r.l0, l1 };
}

// ---- 對決 ----
const dReady = (page, ms = 20000) => page.waitForFunction(() => {
  const D = window.DipLabDuel; if (!D || !D.api() || !D.debug()) return false; const d = D.debug(), raw = window.__lab.rawDuel();
  return !!raw && (raw.over || (d.enterDone && !D.api().busy() && d.phase === 'choose' && !d.held && !D.api().waiting()));
}, null, { timeout: ms }).then(() => true, () => false);
// 找一手：kind＝'full'（同色、你大他 ≥2 星）｜'countered'（他剋你、你不比他大 2 星以上＝剋得動）｜'counter'（你剋他；冷門永遠剋得動）
async function findHand(page, kind) {
  return C(page, kind => {
    const d = window.__lab.rawDuel(), B = window.DipLabEngine.BEATS || { o: 'c', c: 'h', h: 'o' };   // B[x]＝x 剋的那色
    const st = (c, a) => (c && c[a]) | 0, beats = a => Object.keys(B).find(x => B[x] === a);
    let best = null;
    for (let i = 0; i < d.p.hand.length; i++) for (let j = 0; j < d.e.hand.length; j++) for (const a of ['c', 'o', 'h']) {
      const p = d.p.hand[i], e = d.e.hand[j]; if (!p || !e || st(p, a) < 1) continue;
      if (kind === 'full' && st(e, a) >= 1 && st(p, a) >= st(e, a) + 2) { const s = st(p, a) * 10 - st(e, a); if (!best || s > best.s) best = { i, j, a, ea: a, s }; }
      if (kind === 'countered') { const ea = beats(a); if (st(e, ea) >= 1 && st(p, a) <= st(e, ea) + 1) { const s = 10 - st(p, a); if (!best || s > best.s) best = { i, j, a, ea, s }; } }
      if (kind === 'counter') { const ea = B[a]; if (st(e, ea) >= 1) { const s = st(e, ea) * 10 - st(p, a); if (!best || s > best.s) best = { i, j, a, ea, s }; } }
    }
    return best;
  }, kind);
}
// 出一手（h.j≥0＝他照這張這色出）→ 等揭曉（停住等點或已換手）→ 讀那手：clash、結果行（小字、第一次那句）、雙方聲望
async function playRead(page, h) {
  const n0 = await C(page, () => window.DipLabDuel.debug().hands.length);
  const before = await C(page, () => { const d = window.__lab.rawDuel(); return { pHp: d.p.hp, eHp: d.e.hp }; });
  await dReady(page, 15000);
  await C(page, h => { if (h.j != null && h.j >= 0) window.__lab.duelLab.setNext({ i: h.j, attr: h.ea }); window.DipLabDuel.play({ i: h.i, attr: h.a }); }, h);
  await page.waitForFunction(n0 => { const D = window.DipLabDuel, d = D.debug(), raw = window.__lab.rawDuel(); return d.hands.length > n0 && (D.api().waiting() || !raw || raw.over || (!D.api().busy() && d.phase === 'choose')); }, n0, { timeout: 15000 }).catch(() => {});
  await sleep(300);
  return C(page, ([n0, before]) => {
    const D = window.DipLabDuel, H = D.debug().hands[n0], raw = window.__lab.rawDuel() || window.__lab.duelLab.duel, cl = H ? H.evs.find(e => e.t === 'clash') : null;
    const c = document.querySelector('.dl .callout'), L = raw && raw.log ? raw.log[raw.log.length - 1] : null;
    return { cl: cl ? { kind: cl.kind, toE: cl.toE, toP: cl.toP, heal: cl.heal, fac: cl.fac || null, pAttr: cl.pAttr, eAttr: cl.eAttr, pStar: cl.pStar, eStar: cl.eStar,
        notes: (cl.notes || []).map(x => typeof x === 'string' ? x : { fac: x.fac, kind: x.kind, n: x.n, text: x.text }) } : null,
      ct: H ? { notes: H.ct.notes.slice(), first: H.ct.first || null, l2: H.ct.l2 } : null,
      dom: c ? { on: c.classList.contains('on'), ns: [...c.querySelectorAll('.l2 .ns')].map(x => x.textContent), f1: (c.querySelector('.l2 .ns.f1') || {}).textContent || null } : null,
      before, after: raw ? { pHp: raw.p.hp, eHp: raw.e.hp, over: !!raw.over } : null, facN: raw && raw.p.facN ? Object.assign({}, raw.p.facN) : null,
      left: (() => { try { const v = window.DipLabEngine.view(raw); return v && v.fac ? Object.assign({}, v.fac.left) : null; } catch (_) { return null; } })(), log: L ? { fac: L.fac || null } : null };
  }, [n0, before]);
}
// 停住等點：點盤面放行，等到能出下一手（或打完）
//   （停住後 500 ms 內的點不算：HOLD_GUARD；點了還停著就再點）
async function release(page) {
  for (let k = 0; k < 12 && await C(page, () => window.DipLabDuel.api().waiting()); k++) { await sleep(k ? 350 : 600); await jsClick(page, '.dl .dl-t'); await sleep(150); }
  return dReady(page, 15000);
}
// 墊一手（找不到要的那種時）：照 thoughtful 出，他照他的
async function filler(page) {
  const act = await C(page, () => { const E = window.DipLabEngine, Cn = window.DipLabContent, d = window.__lab.rawDuel(); const a = E.policies.thoughtful(d, E.makeRng(5), {}, Cn); return a && !a.ace && !a.apex ? { i: a.i, a: a.attr } : (x => ({ i: x.i, a: x.attr }))(E.legalActions(d).filter(x => !x.ace && !x.apex)[0]); });
  const r = await playRead(page, Object.assign({ j: -1 }, act));
  await release(page);
  return r;
}
// 開一場測試對決（__lab.duelLab）；o 照 duelLab.start；setHp＝開打後把你的聲望調到這個數（給回聲望留空間）
async function labDuel(page, o, setHp) {
  await C(page, o => window.__lab.duelLab.start(o), o);
  const ok = await dReady(page, 20000);
  if (setHp != null) await C(page, n => { const d = window.__lab.rawDuel(); d.p.hp = n; }, setHp);
  await sleep(200);
  return ok;
}
// 從標題走到對決（點「開打」→ 對白一路點、選單選第一個）
async function goFight(page) {
  await page.waitForSelector('[data-a=go]', { timeout: 15000 });
  await jsClick(page, '[data-a=go]');
  for (let g = 0; g < 200; g++) {
    if (await C(page, () => window.__lab.screen() === 'duel' && !!window.__lab.rawDuel())) break;
    if (await page.$('.lb-dq.hasmenu .lb-dqopt')) { await sleep(400); await jsClick(page, '.lb-dq .lb-dqopt[data-i="0"]'); await sleep(300); continue; }
    if (await page.$('.lb-dq .nx.on')) await jsClick(page, '.lb-dq');
    await sleep(200);
  }
  return dReady(page, 20000);
}
// 打贏這一場之後一路到升級面板（戰利品列「不收」、寶箱照第一個）；回 true＝升級面板（能點）出來了
async function toLevelSheet(page, ms = 30000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    if (await C(page, () => !!document.querySelector('.lb-sheet.level [data-lv]') && !document.querySelector('.lb-sheet.level.arming'))) return true;
    if (await C(page, () => !!document.querySelector('#panel > .lb-sheet.one [data-i]'))) { await sleep(300); await tapReady(page, '#panel > .lb-sheet.one [data-i="0"]'); await sleep(400); continue; }
    if (await C(page, () => !!document.querySelector('#panel .lb-sheet.reward'))) { await passLoot(page, { until: 'choice', ms: 8000 }); await sleep(400); continue; }
    if (await C(page, () => window.__lab.screen() === 'scene' && !!document.querySelector('.lb-dq .nx.on'))) await jsClick(page, '.lb-dq');
    await sleep(250);
  }
  return false;
}
const levelSheet = page => C(page, () => {
  const s = document.querySelector('.lb-sheet.level'); if (!s) return null; const r = window.__lab.run, p = r && r.pending;
  const bs = [...s.querySelectorAll('[data-lv]')];
  return { title: (s.querySelector('h3') || {}).textContent || '', n: bs.length, lv: bs.map(b => b.dataset.lv + (b.dataset.id ? ':' + b.dataset.id : '')), n4: !!s.querySelector('.lb-opts.n4'),
    fac: bs.filter(b => b.dataset.lv === 'fac').map(b => ({ id: b.dataset.id, fi: (b.querySelector('.fi') || {}).textContent || '', nm: (b.querySelector('.nm') || {}).textContent || '', ds: (b.querySelector('.ds') || {}).textContent || '',
      nv: (b.querySelector('.nv') || {}).textContent || '', tag: (b.querySelector('.nm small') || {}).textContent || '', h: Math.round(b.getBoundingClientRect().height) })),
    hs: bs.map(b => Math.round(b.getBoundingClientRect().height)), undef: /undefined|NaN/.test(s.textContent), sh: s.scrollHeight, ch: s.clientHeight, bottom: Math.round(s.getBoundingClientRect().bottom), vh: innerHeight,
    offer: p && p.offer ? JSON.parse(JSON.stringify(p.offer)) : null, type: p ? p.type : null, level: p ? p.level : null };
});

async function runSize(browser, w, h) {
  const size = `${w}x${h}`, narrowWant = w < 390;

  // ---------------------------------------------------------------- 1 F1 開局派系卡（＋5 F5 序章那場沒有被動）
  if (want(1) || want(5)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await openTitle(page, QF());
      await C(page, () => localStorage.clear());
      await openTitle(page, QF());
      const X = await FT(page);
      const flag = await C(page, () => window.__lab.fac());
      const up = await toAcepick(page, 'heresy');            // 猜錯（今晚那張是經典）
      await sleep(700);
      const s0 = await facSheet(page);
      // 挑別張再回冷門：390＝點卡；375＝真的滑一下（看下一張）、點下面的點回來
      let mv = null, s1 = null, s2 = null;
      if (s0 && s0.narrow) {
        mv = await swipeRail(page, ctx, -Math.round(w * 0.8));
        await sleep(400); s1 = await facSheet(page);
        await tapAt(page, '.lb-sheet.acepick .fx-dots [data-dot="pearl"]'); await sleep(900);
        s2 = await facSheet(page);
      } else if (s0) {
        await tapAt(page, '.lb-sheet.acepick .lb-ct[data-tier="hall"] .fx-tag'); await sleep(400); s1 = await facSheet(page);
        await tapAt(page, '.lb-sheet.acepick .lb-ct[data-tier="pearl"] .fx-tag'); await sleep(400); s2 = await facSheet(page);
      }
      await tapReady(page, '.lb-sheet.acepick [data-a=ok]');
      await page.waitForFunction(() => !!(window.__lab.run && window.__lab.run.ace) && !document.querySelector('.lb-sheet.acepick'), null, { timeout: 8000 }).catch(() => {});
      const r1 = await C(page, () => { const r = window.__lab.run; return r ? { ace: r.ace, fac: r.fac ? JSON.parse(JSON.stringify(r.fac)) : null, prologue: r.prologue } : null; });
      const w1 = [];
      if (!flag) w1.push('__lab.fac() 不是 true');
      if (!up || !s0) w1.push('挑王牌面板沒出來');
      else {
        if (!s0.fac) w1.push('不是派系卡（.acepick.fac）');
        if (s0.cards.length !== 3 || !s0.cards.every(c => c.fxc && c.cover)) w1.push(`派系卡 ${s0.cards.length} 張`);
        if (s0.sel !== 'pearl') w1.push(`預設停 ${s0.sel}（要冷門）`);
        for (const c of s0.cards) {
          const t = c.t;
          if (c.nm !== SPEC.title[t] + '・' + SPEC.icon[t]) w1.push(`${t} 名號「${c.nm}」`);
          if (!/^(經|冷|硬) 7$/.test(c.ax || '')) w1.push(`${t} 軸「${c.ax}」`);
          if (c.tag !== X[t].tagline || !c.tag) w1.push(`${t} 定位「${c.tag}」`);
          if (c.pas !== X.ui.passive + X[t].passive || c.cost !== X.ui.cost + X[t].cost) w1.push(`${t} 被動／代價「${c.pas}」「${c.cost}」`);
          if (c.pasColor === c.costColor) w1.push(`${t} 被動跟代價同色（${c.pasColor}；代價要灰）`);
          if ((c.nb || '') !== (SPEC.newbie[t] || '')) w1.push(`${t} 新手標「${c.nb}」`);
          if (c.gifts !== X.gifts[t] || X.gifts[t] !== 4) w1.push(`${t} 送的縮圖 ${c.gifts}／${X.gifts[t]}`);
          if (c.prof !== fill(X.ui.profOnly, { n: 1 })) w1.push(`${t} 熟練「${c.prof}」`);
          if (c.locked) w1.push(`${t} 新帳號第一次挑卻鎖著`);
        }
        if (X.aceNewbie.pearl !== SPEC.newbie.pearl || X.aceNewbie.hall !== SPEC.newbie.hall || X.aceNewbie.heresy) w1.push(`C.aceNewbie ${J(X.aceNewbie)}`);
        if (s0.okTx !== X.ui.pickGo || !s0.okIn || s0.okH < 44) w1.push(`大鈕「${s0.okTx}」在畫面裡 ${s0.okIn} 高 ${s0.okH}`);
        if (s0.sh > s0.ch + 1 || s0.bottom > s0.vh + 0.5 || s0.docX > 1) w1.push(`面板捲（${s0.sh}/${s0.ch}、底 ${s0.bottom}/${s0.vh}、橫捲 ${s0.docX}）`);
        if (s0.narrow !== narrowWant) w1.push(`一次一張 ${s0.narrow}（寬 ${w}）`);
        if (narrowWant) {
          if (J(s0.dots.filter(d => /\*/.test(d))) !== J(['pearl*'])) w1.push(`點 ${J(s0.dots)}`);
          if (!mv || !(mv.l1 > mv.l0 + 40)) w1.push(`滑不動（${J(mv)}）`);
          if (!s1 || s1.sel === 'pearl' || !s1.dots.some(d => d === s1.sel + '*')) w1.push(`滑完選中 ${s1 && s1.sel}、點 ${s1 && J(s1.dots)}`);
          if (!s2 || s2.sel !== 'pearl' || !s2.dots.includes('pearl*')) w1.push(`點回冷門 ${s2 && s2.sel} ${s2 && J(s2.dots)}`);
        } else {
          if (s0.cards.some(c => c.r > s0.vw + 0.5 || c.l < -0.5)) w1.push('三欄有卡出畫面');
          if (!s1 || s1.sel !== 'hall' || !s2 || s2.sel !== 'pearl') w1.push(`點卡換選 ${s1 && s1.sel}→${s2 && s2.sel}`);
        }
        if (!s0.det || s0.det.indexOf('解鎖') < 0) w1.push(`說明那行「${s0.det}」（序章第一次挑要寫初始流派）`);
      }
      if (!r1 || r1.ace !== 'pearl' || J(r1.fac) !== J({ picks: {}, tal: {}, trialNodes: {} })) w1.push(`run ${J(r1)}`);
      if (want(1)) record(1, size, !w1.length && !errs(page).length, `${w1.join('；') || 'ok'}；面板 ${J(s0 && { sel: s0.sel, narrow: s0.narrow, rail: s0.railW, dots: s0.dots, nb: s0.cards.map(c => c.t + ':' + (c.nb || '')), sh: [s0.sh, s0.ch], ok: [s0.okIn, s0.okH] })}；` +
        `滑 ${J(mv)} → ${s1 && s1.sel} → ${s2 && s2.sel}；run ${J(r1)}；${errTx(page)}`);

      // ---- 5 F5：一路到序章那場、打完整場
      if (want(5)) {
        const w5 = [];
        const got = await prologueToDuel(page, 'direct');
        await dReady(page, 20000);
        const d0 = await C(page, () => { const r = window.__lab.run, d = r && r.duel; return { pro: r && r.prologue, fac: !!(r && r.fac), dFac: d ? d.p.fac || null : 'noduel', fx: d ? !!d.p.fx : null, facN: d ? !!d.p.facN : null, facNotes: d ? !!d.facNotes : null,
          chip: !!document.querySelector('#top [data-a=fac]') }; });
        const hands = [];
        for (let k = 0; k < 10; k++) {
          if (await C(page, () => { const d = window.__lab.rawDuel(); return !d || !!d.over; })) break;
          if (!(await dReady(page, 15000))) break;
          if (await C(page, () => { const d = window.__lab.rawDuel(); return !d || !!d.over; })) break;
          const act = await C(page, () => { const E = window.DipLabEngine, d = window.__lab.rawDuel(); const x = E.legalActions(d).filter(a => !a.ace && !a.apex)[0]; return x ? { i: x.i, a: x.attr } : null; });
          if (!act) break;
          hands.push(await playRead(page, Object.assign({ j: -1 }, act)));
          await release(page);
        }
        const S = await stored(page);
        const allNs = hands.flatMap(x => (x.dom ? x.dom.ns : []).concat(x.ct ? x.ct.notes : []));
        const facTexts = Object.values(SPEC.notes).map(t => t.split('{n}')[0]);
        if (!got) w5.push('沒到序章對決');
        if (!d0.pro || d0.pro !== 'pending' || !d0.fac) w5.push(`序章 run ${J(d0)}（run.fac 要有）`);
        if (d0.dFac || d0.fx || d0.facN || d0.facNotes || d0.chip) w5.push(`序章那場有派別 ${J(d0)}`);
        if (hands.length < 3) w5.push(`只打了 ${hands.length} 手`);
        if (hands.some(x => !x.cl || x.cl.fac || x.cl.notes.some(n => n && typeof n === 'object' && n.fac))) w5.push('有 clash 帶 fac');
        if (allNs.some(t => facTexts.some(f => t.indexOf(f) >= 0) || Object.values(X).some(v => v && v.first && t.indexOf(v.first) >= 0))) w5.push(`結果行有流派小字 ${J(allNs)}`);
        if (hands.some(x => x.ct && x.ct.first) || hands.some(x => x.dom && x.dom.f1)) w5.push('有第一次那句');
        if (S && S.seen && S.seen.facFirst && Object.keys(S.seen.facFirst).length) w5.push(`facFirst 記了 ${J(S.seen.facFirst)}`);
        record(5, size, !w5.length && !errs(page).length, `${w5.join('；') || 'ok'}；序章 ${J(d0)}；打了 ${hands.length} 手（${hands.map(x => x.cl && x.cl.kind).join(',')}）；小字 ${J(allNs.slice(0, 6))}；${errTx(page)}`);
      }
    } catch (e) { record(want(1) ? 1 : 5, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 1b 換派（點老闆；異端鎖著）
  if (want(1)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await openTitle(page, QF());
      await seedRun(page, { ace: 'pearl', idx: 0, ownAces: ['pearl', 'hall'] });
      await C(page, () => { const s = JSON.parse(localStorage.getItem('dipGameLab_v1')); s.run.fac = { picks: {}, tal: {}, trialNodes: {} }; localStorage.setItem('dipGameLab_v1', JSON.stringify(s)); });
      await openTitle(page, QF());
      const X = await FT(page);
      await jsClick(page, '[data-a=cont]'); await waitScreen(page, 'night'); await sleep(1500);
      await C(page, () => window.__lab.stageAction('talk:owner')); await sleep(600);
      await tapReady(page, '.lb-sheet.owner [data-a=swap]');
      await page.waitForSelector('.lb-sheet.acepick .lb-ct', { timeout: 6000 }).catch(() => {});
      await sleep(700);
      const s0 = await facSheet(page);
      // 點鎖住的異端（375：點下方第三個點＝滑到那張）
      if (s0 && s0.narrow) await tapAt(page, '.lb-sheet.acepick .fx-dots [data-dot="heresy"]'); else await tapAt(page, '.lb-sheet.acepick .lb-ct[data-tier="heresy"] .fx-tag');
      await sleep(900);
      const s1 = await facSheet(page);
      let s1b = null;
      if (s0 && s0.narrow) { await tapAt(page, '.lb-sheet.acepick [data-a=ok]'); await sleep(600); s1b = await facSheet(page); }
      // 改挑經典 → 就這一派
      if (s0 && s0.narrow) await tapAt(page, '.lb-sheet.acepick .fx-dots [data-dot="hall"]'); else await tapAt(page, '.lb-sheet.acepick .lb-ct[data-tier="hall"] .fx-tag');
      await sleep(900);
      const s2 = await facSheet(page);
      await tapReady(page, '.lb-sheet.acepick [data-a=ok]');
      await page.waitForFunction(() => !document.querySelector('.lb-sheet.acepick'), null, { timeout: 6000 }).catch(() => {});
      await sleep(800);
      const r1 = await C(page, () => { const r = window.__lab.run; return { ace: r.ace, fac: r.fac ? JSON.parse(JSON.stringify(r.fac)) : null }; });
      const w1 = [];
      if (!s0) w1.push('換派面板沒出來');
      else {
        if (!s0.fac || s0.cards.some(c => c.nb)) w1.push(`派系卡 ${s0.fac}、新手標 ${J(s0.cards.map(c => c.nb))}`);
        const lk = s0.cards.find(c => c.t === 'heresy');
        if (!lk || !lk.locked || lk.lk !== X.aceLocked || s0.cards.filter(c => c.locked).length !== 1) w1.push(`鎖住的 ${J(s0.cards.map(c => c.t + (c.locked ? '!' : '') + ':' + (c.lk || '')))}`);
        if (s0.sel !== 'pearl') w1.push(`預設 ${s0.sel}（要這一趟的冷門）`);
        if (s0.sh > s0.ch + 1 || !s0.okIn) w1.push(`面板捲 ${s0.sh}/${s0.ch} 大鈕 ${s0.okIn}`);
        if (s0.narrow !== narrowWant) w1.push(`一次一張 ${s0.narrow}`);
        if (s0.cards.find(c => c.t === 'pearl').prof !== fill(X.ui.profOnly, { n: 1 })) w1.push(`熟練「${s0.cards.find(c => c.t === 'pearl').prof}」`);
      }
      if (!s1 || s1.sel !== 'pearl' || !s1.cards.find(c => c.t === 'heresy').peek) w1.push(`點鎖住的 → 選中 ${s1 && s1.sel}、peek ${s1 && J(s1.cards.map(c => c.t + (c.peek ? '*' : '')))}`);
      else if (narrowWant) {
        if (!s1.okOff) w1.push('一次一張滑到鎖住的：大鈕沒有 .off');
        if (!s1b || !s1b.sel || s1b.sel !== 'pearl') w1.push(`鎖住時按大鈕面板關了 ${J(s1b && s1b.sel)}`);
      } else if (s1.det !== fill(X.lockedNote, { title: X.aceTitle.heresy })) w1.push(`說明「${s1.det}」`);
      if (!s1 || s1.sh > s1.ch + 1 || !s1.okIn) w1.push(`點鎖住的之後面板捲 ${s1 && s1.sh}/${s1 && s1.ch}`);
      if (!s2 || s2.sel !== 'hall' || s2.okOff) w1.push(`改挑經典 ${s2 && s2.sel} off ${s2 && s2.okOff}`);
      if (r1.ace !== 'hall' || !r1.fac || J(r1.fac.picks) !== '{}') w1.push(`run ${J(r1)}`);
      record('1b', size, !w1.length && !errs(page).length, `${w1.join('；') || 'ok'}；面板 ${J(s0 && { sel: s0.sel, narrow: s0.narrow, locked: s0.cards.filter(c => c.locked).map(c => c.t) })}；點鎖住的 ${J(s1 && { sel: s1.sel, det: s1.det, off: s1.okOff })}；` +
        `改挑 ${s2 && s2.sel} → run ${J(r1)}；${errTx(page)}`);
    } catch (e) { record('1b', size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 2 F2 結果行（經典，正面對決）＋ 4 F4 第二招上限
  if (want(2) || want(4)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      const QH = Q('&fac=1');                                 // 不加 ?fast=1：快轉會讓揭曉自己換手（autoNext），這裡要照真玩家停住等點、看結果框
      await openTitle(page, QH);
      await C(page, () => localStorage.clear());
      await openTitle(page, QH);
      const X = await FT(page);
      // ---- F2：經典、沒拿本派選項
      if (want(2)) {
        const w2 = [];
        let ok0 = false, r = null, r2 = null, chip = null, info = null, seed = 0;
        for (const sd of [7, 11, 23, 31, 47]) {
          ok0 = await labDuel(page, { ace: 'hall', enemy: 'copycat', seed: sd, pos: 8, hold: true, hp: 40, ehp: 60 });
          seed = sd; r = null; r2 = null;
          for (let k = 0; k < 6 && !(r && r2); k++) {
            if (await C(page, () => !!window.__lab.rawDuel().over)) break;
            const hh = await findHand(page, 'full');
            if (!hh) { await filler(page); continue; }
            if (!chip) chip = await C(page, () => { const b = document.querySelector('#top [data-a=fac]'); if (!b) return null; const q = b.getBoundingClientRect(); return { tx: b.textContent, w: Math.round(q.width), h: Math.round(q.height), aria: b.getAttribute('aria-label') }; });
            const x = await playRead(page, hh);
            if (x.cl) { if (!r) r = x; else if (x.cl.fac && x.cl.fac.full) r2 = x; }
            await release(page);
          }
          if (r && r2) break;
        }
        // 頂欄一字圖示 → 本派說明
        if (await page.$('#top [data-a=fac]')) {
          await tapAt(page, '#top [data-a=fac]'); await sleep(600);
          info = await C(page, () => { const p = document.querySelector('.lb-modal .pane.facinfo'); return p ? p.innerText : null; });
          await C(page, () => { const b = document.querySelector('.lb-modal [data-x]'); if (b) b.click(); }); await sleep(300);
        }
        const S = await stored(page);
        const full = x => x && x.cl && x.cl.fac && x.cl.fac.full === 1;
        if (!ok0) w2.push('測試對決沒開起來');
        if (!full(r)) w2.push(`同色大 2 星那手沒有 full：${J(r && r.cl)}`);
        else {
          const want1 = fill(SPEC.notes.full, { n: r.cl.toE });
          if (!(r.cl.toE > 0)) w2.push(`toE ${r.cl.toE}`);
          if (!r.cl.notes.some(n => n && n.kind === 'full' && n.text === want1 && n.n === r.cl.toE)) w2.push(`notes ${J(r.cl.notes)}（要「${want1}」）`);
          if (!r.dom || !r.dom.on || !r.dom.ns.some(t => t.replace(/・$/, '') === want1)) w2.push(`結果框小字 ${J(r.dom)}（要「${want1}」）`);
          if (r.dom && r.dom.f1 !== X.hall.first) w2.push(`第一次那句「${r.dom && r.dom.f1}」`);
          if (X.notes.full !== SPEC.notes.full) w2.push(`C.factions.notes.full「${X.notes.full}」`);
        }
        if (!(S && S.seen && S.seen.facFirst && S.seen.facFirst.hall)) w2.push(`facFirst ${J(S && S.seen && S.seen.facFirst)}`);
        if (!full(r2)) w2.push(`第二手整張沒找到 ${J(r2 && r2.cl)}`);
        else if (r2.dom && r2.dom.f1) w2.push(`第二次觸發又有第一次那句「${r2.dom.f1}」`);
        if (!chip || chip.tx !== SPEC.icon.hall || chip.w < 40 || chip.h < 32 || chip.aria !== fill(X.ui.infoTitle, { name: SPEC.title.hall, icon: SPEC.icon.hall })) w2.push(`頂欄圖示 ${J(chip)}`);
        if (!info || info.indexOf(X.hall.passive) < 0 || info.indexOf(X.hall.cost) < 0 || info.indexOf(SPEC.title.hall + '・' + SPEC.icon.hall) < 0) w2.push(`本派說明 ${J(info)}`);
        record(2, size, !w2.length && !errs(page).length, `${w2.join('；') || 'ok'}；種子 ${seed}；第一手 ${J(r && { cl: r.cl && { kind: r.cl.kind, toE: r.cl.toE, fac: r.cl.fac, star: [r.cl.pStar, r.cl.eStar] }, ns: r.dom && r.dom.ns, f1: r.dom && r.dom.f1 })}；` +
          `第二手 ${J(r2 && { fac: r2.cl && r2.cl.fac, f1: r2.dom && r2.dom.f1 })}；圖示 ${J(chip)}；${errTx(page)}`);
      }
      // ---- F4a：經典＋吸血（一場最多回 2）
      if (want(4)) {
        const w4 = [];
        let seq = [], seed = 0, after = null;
        for (const sd of [7, 11, 23, 31, 47, 59]) {
          await labDuel(page, { ace: 'hall', enemy: 'copycat', seed: sd, pos: 8, hold: true, hp: 40, ehp: 80, facPicks: { h_leech: 1 } }, 20);
          seed = sd; seq = []; after = null;
          for (let k = 0; k < 6; k++) {
            if (await C(page, () => !!window.__lab.rawDuel().over)) break;
            const hh = await findHand(page, 'full');
            if (!hh) { await filler(page); continue; }
            const x = await playRead(page, hh);
            if (!x.cl || !x.cl.fac || !x.cl.fac.full) { await release(page); continue; }
            seq.push(x);
            const tot = seq.reduce((a, y) => a + ((y.cl && y.cl.fac && y.cl.fac.leech) ? (y.cl.heal | 0) : 0), 0);
            if (tot >= 2 && seq.length >= 2 && seq[seq.length - 1].cl.fac && !seq[seq.length - 1].cl.fac.leech) { after = x; await release(page); break; }
            await release(page);
          }
          if (after) break;
        }
        let infoL = null;
        if (await page.$('#top [data-a=fac]')) {
          await tapAt(page, '#top [data-a=fac]'); await sleep(600);
          infoL = await C(page, () => { const p = document.querySelector('.lb-modal .pane.facinfo'); return p ? p.innerText : null; });
          await C(page, () => { const b = document.querySelector('.lb-modal [data-x]'); if (b) b.click(); }); await sleep(300);
        }
        const lee = seq.filter(x => x.cl && x.cl.fac && x.cl.fac.leech);
        const totL = lee.reduce((a, x) => a + (x.cl.heal | 0), 0);
        if (!after) w4.push(`吸血回滿 2 之後沒等到下一手整張（${seq.length} 手整張、回 ${totL}）`);
        if (totL !== 2) w4.push(`吸血累計回 ${totL}（要 2）`);
        for (const x of lee) {
          const t = fill(SPEC.notes.leech, { n: x.cl.heal });
          if (!(x.cl.heal > 0) || !x.cl.notes.some(n => n && n.kind === 'leech' && n.text === t) || !x.dom.ns.some(s => s.replace(/・$/, '') === t)) w4.push(`吸血那手 ${J({ heal: x.cl.heal, notes: x.cl.notes, ns: x.dom.ns })}（要「${t}」）`);
          if (x.after.pHp - x.before.pHp !== x.cl.heal) w4.push(`聲望 ${x.before.pHp}→${x.after.pHp}（回 ${x.cl.heal}）`);
        }
        if (after && (after.cl.notes.some(n => n && n.kind === 'leech') || after.dom.ns.some(s => s.indexOf('吸血') >= 0))) w4.push(`回滿之後還有吸血字 ${J(after.dom.ns)}`);
        const last = seq[seq.length - 1];
        if (!last || !last.facN || last.facN.leech > 2) w4.push(`facN ${J(last && last.facN)}`);
        if (!last || !last.left || last.left.leech !== 0) w4.push(`view.fac.left ${J(last && last.left)}`);
        if (!infoL || infoL.indexOf(fill(X.ui.leftLeech, { n: 0 })) < 0) w4.push(`本派說明 ${J(infoL)}（要「${fill(X.ui.leftLeech, { n: 0 })}」）`);
        record('4a', size, !w4.length && !errs(page).length, `${w4.join('；') || 'ok'}；種子 ${seed}；整張 ${seq.length} 手：${seq.map(x => `扣 ${x.cl.toE}${x.cl.fac.leech ? ' 回 ' + x.cl.heal : ''}`).join('、')}；facN ${J(last && last.facN)}；${errTx(page)}`);

        // ---- F4b：冷門＋反傷（一場最多 2 次）
        const w4b = [];
        let cs = [], seedB = 0;
        for (const sd of [7, 11, 23, 31, 47, 59]) {
          await labDuel(page, { ace: 'pearl', enemy: 'copycat', seed: sd, pos: 8, hold: true, hp: 60, ehp: 80, facPicks: { p_thorn: 1 } });
          seedB = sd; cs = [];
          for (let k = 0; k < 6 && cs.length < 3; k++) {
            if (await C(page, () => !!window.__lab.rawDuel().over)) break;
            const hh = await findHand(page, 'countered');
            if (!hh) { await filler(page); continue; }
            const x = await playRead(page, hh);
            if (x.cl && x.cl.kind === 'countered') cs.push(x);
            await release(page);
          }
          if (cs.length >= 3) break;
        }
        const thornT = fill(SPEC.notes.thorn, { n: 2 }), cCostT = fill(SPEC.notes.cCost, { n: 1 });
        if (cs.length < 3) w4b.push(`被剋只湊到 ${cs.length} 手`);
        cs.slice(0, 3).forEach((x, k) => {
          const th = !!(x.cl.fac && x.cl.fac.thorn), dE = x.before.eHp - x.after.eHp;
          if (k < 2 && (!th || dE !== 2 || !x.dom.ns.some(s => s.replace(/・$/, '') === thornT))) w4b.push(`第 ${k + 1} 次被剋：反傷 ${th}、他 −${dE}、小字 ${J(x.dom.ns)}`);
          if (k === 2 && (th || dE !== 0 || x.dom.ns.some(s => s.indexOf('反傷') >= 0))) w4b.push(`第 3 次被剋：反傷 ${th}、他 −${dE}、小字 ${J(x.dom.ns)}`);
          if (!x.cl.fac || !x.cl.fac.cCost || !x.dom.ns.some(s => s.replace(/・$/, '') === cCostT)) w4b.push(`第 ${k + 1} 次被剋沒有「${cCostT}」${J(x.dom.ns)}`);
        });
        if (cs[0] && cs[0].dom.f1 !== X.pearl.first) w4b.push(`冷門第一次那句「${cs[0].dom.f1}」`);
        const lastB = cs[cs.length - 1];
        if (!lastB || !lastB.facN || lastB.facN.thorn !== 2) w4b.push(`facN ${J(lastB && lastB.facN)}`);
        if (!lastB || !lastB.left || lastB.left.thorn !== 0) w4b.push(`view.fac.left ${J(lastB && lastB.left)}`);
        record('4b', size, !w4b.length && !errs(page).length, `${w4b.join('；') || 'ok'}；種子 ${seedB}；被剋 ${cs.length} 手：${cs.map(x => `他 −${x.before.eHp - x.after.eHp}${x.cl.fac && x.cl.fac.thorn ? '（反傷）' : ''}`).join('、')}；facN ${J(lastB && lastB.facN)}；${errTx(page)}`);
      }
    } catch (e) { record(want(2) ? 2 : '4a', size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 3 F3 升到 Lv5 → 升級面板第 4 格本派
  if (want(3)) {
    const { ctx, page } = await newPage(browser, w, h);
    await watchToasts(page);
    try {
      await openTitle(page, QF());
      await seedRun(page, { ace: 'hall', idx: 2, level: 4 });
      await C(page, () => { const E = window.DipLabEngine, Cn = window.DipLabContent, s = JSON.parse(localStorage.getItem('dipGameLab_v1')); const T = E.trialCfg(Cn, s.run.tier);
        s.run.fac = { picks: {}, tal: {}, trialNodes: {} }; s.run.xp = s.run.level + T.levelNeed - 1; localStorage.setItem('dipGameLab_v1', JSON.stringify(s)); });
      await openTitle(page, QF());
      const X = await FT(page);
      await jsClick(page, '[data-a=cont]'); await waitScreen(page, 'night'); await sleep(800);
      await watchSay(page); await watchChoose(page);
      const fought = await goFight(page);
      await C(page, () => window.__lab.forceWin());
      const up = await toLevelSheet(page);
      await sleep(700);
      const L = await levelSheet(page);
      const said = await C(page, () => (window.__said || []).map(x => x.t));
      const before = await C(page, () => { const r = window.__lab.run; return { atk: r.atk, def: r.def, maxHp: r.maxHp, hp: r.hp, level: r.level }; });
      const fid = L && L.fac[0] ? L.fac[0].id : null;
      const P = fid ? X.hall.picks.find(p => p.id === fid) : null;
      if (fid) await tapReady(page, `.lb-sheet.level [data-lv="fac"][data-id="${fid}"]`);
      await page.waitForFunction(() => !document.querySelector('.lb-sheet.level') || !window.__lab.run.pending || window.__lab.run.pending.type !== 'level', null, { timeout: 6000 }).catch(() => {});
      await sleep(400);
      const after = await C(page, () => { const r = window.__lab.run; return { atk: r.atk, def: r.def, maxHp: r.maxHp, hp: r.hp, level: r.level, picks: JSON.parse(JSON.stringify(r.fac.picks)), last: r.picks[r.picks.length - 1], seenPick: !!window.__lab.save.seen.facPick }; });
      const chs = await C(page, () => (window.__chooses || []).filter(c => c && c.type === 'level'));
      const tst = await C(page, () => (window.__toasts || []).slice());
      await waitScreen(page, 'night', 15000); await sleep(900);
      await jsClick(page, '[data-a=me]'); await sleep(600);
      const me = await C(page, () => (document.querySelector('.lb-sheet.me') || {}).innerText || null);
      await openTitle(page, QF());
      const S = await stored(page);
      const w3 = [];
      if (!fought) w3.push('沒開打');
      if (!up || !L) w3.push('升級面板沒出來');
      else {
        if (L.level !== 5 || L.title.indexOf('5') < 0) w3.push(`升到 Lv${L.level}「${L.title}」`);
        if (L.n !== 4 || L.lv[3] !== 'fac:' + fid || L.fac.length !== 1 || !L.n4) w3.push(`格子 ${J(L.lv)} n4 ${L.n4}`);
        if (J(L.lv.slice(0, 3)) !== '["atk","def","hp"]') w3.push(`前三格順序 ${J(L.lv)}（要 品味→底氣→聲望上限，第 I 波 SPEC-I §7.1）`);
        if (!L.offer || L.offer.length !== 4 || J(L.offer[3]) !== J({ pick: 'fac', id: fid }) || L.offer.slice(0, 3).some(o => o.pick === 'fac')) w3.push(`offer ${J(L.offer)}`);
        if (!P) w3.push(`本派格 id ${fid} 不是經典的`);
        else {
          const b = L.fac[0];
          if (b.fi !== SPEC.icon.hall || b.nm.indexOf(P.name) !== 0 || b.tag !== SPEC.pickTag || b.ds !== P.text || b.nv !== SPEC.pickNote) w3.push(`本派格 ${J(b)}`);
        }
        if (L.undef) w3.push('面板有 undefined／NaN');
        if (L.sh > L.ch + 1 || L.bottom > L.vh + 0.5) w3.push(`升級面板捲（${L.sh}/${L.ch}、底 ${L.bottom}/${L.vh}）`);
        if (L.hs.some(x => x < 44)) w3.push(`格子高 ${J(L.hs)}`);
      }
      if (!said.includes(SPEC.pickFirst) || X.ui.pickFirst !== SPEC.pickFirst) w3.push(`老闆沒說「${SPEC.pickFirst}」${J(said.slice(-3))}`);
      if (!chs.some(c => c.pick === 'fac' && c.id === fid && Object.keys(c).sort().join() === 'id,pick,type')) w3.push(`送出 ${J(chs)}`);
      if (!fid || J(after.picks) !== J({ [fid]: 1 }) || after.last !== 'fac:' + fid) w3.push(`run.fac.picks ${J(after.picks)}、picks 最後 ${after.last}`);
      if (after.atk !== before.atk || after.def !== before.def || after.maxHp !== before.maxHp || after.hp !== before.hp || after.level !== 5) w3.push(`屬性動了 ${J(before)} → ${J(after)}`);
      if (!after.seenPick) w3.push('save.seen.facPick 沒記');
      if (P && !tst.includes(SPEC.pickTag + '・' + P.name)) w3.push(`吐司 ${J(tst)}`);
      if (!P || !me || me.indexOf(fill(X.ui.mine, { list: P.name })) < 0) w3.push(`我的狀態 ${J(me)}`);
      if (!S || !S.run || !S.run.fac || !(fid && S.run.fac.picks[fid] === 1)) w3.push(`存檔 run.fac ${J(S && S.run && S.run.fac)}`);
      record(3, size, !w3.length && !errs(page).length, `${w3.join('；') || 'ok'}；面板 ${J(L && { level: L.level, lv: L.lv, fac: L.fac, sh: [L.sh, L.ch], hs: L.hs })}；送出 ${J(chs.slice(-1))}；${J(before)}→${J(after)}；吐司 ${J(tst.slice(0, 3))}；${errTx(page)}`);
    } catch (e) { record(3, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 6 F6 ?fac=1&apex=1：標題章、換一格
  if (want(6)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      const plates = {};
      for (const [k, q] of [['fac', '&fac=1'], ['both', '&fac=1&apex=1'], ['apex', '&apex=1']]) {
        await openTitle(page, Q('&fast=1' + q)); await sleep(500);
        plates[k] = await C(page, () => {
          const pl = document.querySelector('.lb-plate'); const vis = s => { const e = pl && pl.querySelector(s); if (!e) return null; const cs = getComputedStyle(e), r = e.getBoundingClientRect();
            return cs.display === 'none' || cs.visibility === 'hidden' || !r.width ? 'none' : { tx: e.textContent, l: Math.round(r.left), r: Math.round(r.right), t: Math.round(r.top), b: Math.round(r.bottom) }; };
          return { fac: vis('.fac'), apx: vis('.apx'), both: vis('.both'), mix: vis('small.mix'), flags2: !!(pl && pl.classList.contains('flags2')), flag: window.__lab.fac(), apex: window.__lab.apex(),
            swapOn: (window.DipLabContent.factions.apexSwap || {}).on !== false, mixTx: window.DipLabContent.factions.ui.apexMixed };
        });
        plates[k].scroll = await noScroll(page);
      }
      const big = h > 600, w6 = [];
      const P = plates, inV = x => x && x !== 'none' && x.l >= 0 && x.r <= w + 0.5 && x.t >= 0 && x.b <= h + 0.5;
      if (!P.fac.flag || P.fac.apex || !inV(P.fac.fac) || P.fac.fac.tx !== SPEC.badge || P.fac.apx || P.fac.both) w6.push(`?fac=1 章 ${J(P.fac)}`);
      if (!P.both.flag || !P.both.apex || !P.both.flags2) w6.push(`兩個都開 ${J(P.both)}`);
      else if (big) {
        if (!inV(P.both.fac) || !inV(P.both.apx) || P.both.fac.tx !== SPEC.badge || P.both.both !== 'none') w6.push(`>600px 兩顆章 ${J(P.both)}`);
        else if (!(P.both.fac.r <= P.both.apx.l || P.both.apx.r <= P.both.fac.l || P.both.fac.b <= P.both.apx.t || P.both.apx.b <= P.both.fac.t)) w6.push(`兩顆章重疊 ${J(P.both)}`);
      } else if (!inV(P.both.both) || P.both.both.tx !== SPEC.badgeBoth || P.both.fac !== 'none' || P.both.apx !== 'none') w6.push(`≤600px 要合成一顆 ${J(P.both)}`);
      if (P.apex.flag || P.apex.fac || P.apex.both || !inV(P.apex.apx)) w6.push(`只開 ?apex=1 ${J(P.apex)}`);
      // 換一格退回只標示（content apexSwap.on false；棒二 sim F9）：兩個都開＝章下小字 apexMixed、在畫面裡；只開一個、或對照表開著＝沒有小字
      if (P.both.swapOn ? P.both.mix : (!inV(P.both.mix) || P.both.mix.tx !== P.both.mixTx)) w6.push(`只標示小字（apexSwap.on ${!P.both.swapOn ? 'false' : 'true'}）${J(P.both.mix)}`);
      if (P.fac.mix || P.apex.mix) w6.push(`只開一個旗標不該有只標示小字 ${J([P.fac.mix, P.apex.mix])}`);
      for (const k of Object.keys(P)) if (!scrollOk(P[k].scroll)) w6.push(`${k} 標題捲 ${J(P[k].scroll)}`);
      record('6a', size, !w6.length && !errs(page).length, `${w6.join('；') || 'ok'}；${J({ fac: P.fac.fac, both: [P.both.fac, P.both.apx, P.both.both], mix: P.both.mix })}；${errTx(page)}`);
    } catch (e) { record('6a', size, false, 'error ' + e.message); }
    await ctx.close();
    // 換一格：冷門帶派別的 run、挑王牌面板＋唱片資訊（content 退回只標示＝apexSwap.on false 時，頁面上先把 on 打開再測對照表；改回 on true 也照過）
    const { ctx: ctx2, page: p2 } = await newPage(browser, w, h);
    try {
      const QA = Q('&fast=1&fac=1&apex=1');
      await openTitle(p2, QA);
      // theirStar 那張（照 ops 換的；不挑 apexSwap.cards 另外指定的，也不挑預設那張 Zodiac：只收到預設那張時點老闆沒得換、挑王牌面板不會開）
      const CID = await C(p2, () => { const E = window.DipLabEngine, Cn = window.DipLabContent, S = (Cn.factions.apexSwap.pearl || {}).cards || {};
        return E.apexList(Cn, 'pearl').map(x => x.card).filter(id => { const A = E.abilityOf(Cn, id); return A && A.op === 'theirStar' && !S[A.id] && id !== Cn.aces.pearl; })[0] || null; });
      const orig = await C(p2, id => { const A = window.DipLabEngine.abilityOf(window.DipLabContent, id); return A ? { text: A.text, timing: A.timing, name: A.name } : null; }, CID);
      const look = async (withFac) => {
        await seedRun(p2, { ace: 'pearl', idx: 0, ownAces: ['pearl'], ownIds: [CID], seen: { apexPick: true } });
        await C(p2, f => { const s = JSON.parse(localStorage.getItem('dipGameLab_v1')); if (f) s.run.fac = { picks: {}, tal: {}, trialNodes: {} }; else delete s.run.fac; localStorage.setItem('dipGameLab_v1', JSON.stringify(s)); }, withFac);
        await openTitle(p2, QA); await C(p2, () => { window.DipLabContent.factions.apexSwap.on = true; }); await jsClick(p2, '[data-a=cont]');
        await waitScreen(p2, 'night'); await sleep(1300);
        await C(p2, () => window.__lab.stageAction('talk:owner')); await sleep(600);
        await tapReady(p2, '.lb-sheet.owner [data-a=swap]');
        await p2.waitForSelector('.lb-sheet.apxpick .apx-c', { timeout: 9000 }).catch(() => {});
        await sleep(600);
        if (await p2.$('.lb-sheet.apxpick [data-tab="pearl"]:not(.on)')) { await tapAt(p2, '.lb-sheet.apxpick [data-tab="pearl"]'); await sleep(300); }
        await tapAt(p2, `.lb-sheet.apxpick .apx-c[data-cid="${CID}"]`); await sleep(500);
        const det = await C(p2, cid => { const s = document.querySelector('.lb-sheet.apxpick'); if (!s) return null; const d = s.querySelector('.apx-det');
          return { det: d ? d.textContent : '', swp: (s.querySelector('.apx-det .fx-swp') || {}).textContent || null, tm: (s.querySelector(`.apx-c[data-cid="${cid}"] .tm`) || {}).textContent || '', tmCls: ((s.querySelector(`.apx-c[data-cid="${cid}"] .tm`) || {}).className || ''),
            sh: s.scrollHeight, ch: s.clientHeight, ab: window.DipLabEngine.apexAbilityOf(window.DipLabContent, cid, window.__lab.run) }; }, CID);
        const ok = await longPress(p2, ctx2, `.lb-sheet.apxpick .apx-c[data-cid="${CID}"]`, 700);
        const inf = ok && await infoOpen(p2);
        const ci = inf ? await C(p2, () => { const a = document.querySelector('#cardInfoMask .apx'); return a ? { tx: a.textContent, sw: (a.querySelector('.sw') || {}).textContent || null } : null; }) : null;
        if (inf) await closeInfo(p2);
        return { det, ci };
      };
      const A = await look(true), B = await look(false);
      const w6 = [];
      if (!CID || !orig) w6.push('冷門找不到 theirStar 那張');
      if (!A.det || A.det.det.indexOf(SPEC.swapTheirStar) < 0 || A.det.swp !== '跟流派一起試，這張換過能力' || A.det.ab.op !== 'critAdd' || !A.det.ab.swapped) w6.push(`帶派別 面板 ${J(A.det)}`);
      if (A.det && !/hand/.test(A.det.tmCls)) w6.push(`角上時機 ${A.det.tm}（${A.det.tmCls}）`);
      if (A.det && A.det.sh > A.det.ch + 1) w6.push(`面板捲 ${A.det.sh}/${A.det.ch}`);
      if (!A.ci || A.ci.tx.indexOf(SPEC.swapTheirStar) < 0 || A.ci.sw !== '跟流派一起試，這張換過能力') w6.push(`帶派別 唱片資訊 ${J(A.ci)}`);
      if (!B.det || B.det.det.indexOf(orig.text) < 0 || B.det.det.indexOf(SPEC.swapTheirStar) >= 0 || B.det.swp || B.det.ab.swapped || B.det.ab.op !== 'theirStar') w6.push(`沒帶派別 面板 ${J(B.det)}（要原本「${orig && orig.text}」）`);
      if (!B.ci || B.ci.tx.indexOf(orig.text) < 0 || B.ci.sw) w6.push(`沒帶派別 唱片資訊 ${J(B.ci)}`);
      record('6b', size, !w6.length && !errs(p2).length, `${w6.join('；') || 'ok'}；${CID}（原本「${orig && orig.text}」）；帶派別 ${J(A.det && { det: A.det.det, swp: A.det.swp, tm: A.det.tm })} 資訊 ${J(A.ci)}；沒帶 ${J(B.det && { det: B.det.det, swp: B.det.swp })}；${errTx(p2)}`);
    } catch (e) { record('6b', size, false, 'error ' + e.message); }
    await ctx2.close();
  }

  // ---------------------------------------------------------------- 7 F7 ?fac=1 開的 run 在沒旗標的頁面續玩
  if (want(7)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await openTitle(page, QF());
      await seedRun(page, { ace: 'pearl', idx: 1, autoNext: false });
      await C(page, () => { const s = JSON.parse(localStorage.getItem('dipGameLab_v1')); s.run.fac = { picks: { p_thorn: 1 }, tal: {}, trialNodes: {} }; s.seen.facFirst = { pearl: 1 }; localStorage.setItem('dipGameLab_v1', JSON.stringify(s)); });
      const QN = Q('');                                       // 沒旗標、不快轉（存檔 autoNext 關＝揭曉後停住等點）
      await openTitle(page, QN);
      const X = await FT(page);
      const t0 = await C(page, () => ({ flag: window.__lab.fac(), plate: !!document.querySelector('.lb-plate .fac, .lb-plate .both') }));
      await jsClick(page, '[data-a=cont]'); await waitScreen(page, 'night'); await sleep(900);
      await jsClick(page, '[data-a=me]'); await sleep(600);
      const me = await C(page, () => (document.querySelector('.lb-sheet.me') || {}).innerText || null);
      await C(page, () => { const b = document.querySelector('.lb-sheet.me [data-a=close], .lb-sheet.me .x'); if (b) b.click(); }); await sleep(400);
      const fought = await goFight(page);
      const d0 = await C(page, () => { const d = window.__lab.rawDuel(); return d ? { fac: d.p.fac || null, thorn: d.p.fx ? d.p.fx.thorn : null, chip: (document.querySelector('#top [data-a=fac]') || {}).textContent || null } : null; });
      let r = null;
      for (let k = 0; k < 6 && !r; k++) {
        if (await C(page, () => !!window.__lab.rawDuel().over)) break;
        const hh = await findHand(page, 'counter');
        if (!hh) { await filler(page); continue; }
        r = await playRead(page, hh);
      }
      const S = await stored(page);
      const w7 = [];
      if (t0.flag || t0.plate) w7.push(`沒旗標的標題 ${J(t0)}`);
      if (!me || me.indexOf(fill(X.ui.mine, { list: '反傷' })) < 0) w7.push(`我的狀態 ${J(me)}`);
      if (!fought || !d0 || d0.fac !== 'pearl' || d0.thorn !== 2 || d0.chip !== SPEC.icon.pearl) w7.push(`對決 ${J(d0)}`);
      const k0 = r && r.cl && r.cl.fac ? (r.cl.fac.borrow ? 'borrow' : r.cl.fac.underdog ? 'underdog' : null) : null;
      if (!k0) w7.push(`剋他那手沒有借／以小搏大 ${J(r && r.cl)}`);
      else {
        const t = fill(SPEC.notes[k0], { n: r.cl.toE });
        if (r.cl.kind !== 'counter' || !r.dom.ns.some(s => s.replace(/・$/, '') === t)) w7.push(`結果行 ${J(r.dom)}（要「${t}」）`);
      }
      if (!S || !S.run || !S.run.fac || S.run.fac.picks.p_thorn !== 1 || !S.run.duel || S.run.duel.p.fac !== 'pearl') w7.push(`存檔 ${J(S && S.run && { fac: S.run.fac, dFac: S.run.duel && S.run.duel.p.fac })}`);
      record(7, size, !w7.length && !errs(page).length, `${w7.join('；') || 'ok'}；標題 ${J(t0)}；對決 ${J(d0)}；那手 ${J(r && { kind: r.cl.kind, toE: r.cl.toE, fac: r.cl.fac, ns: r.dom && r.dom.ns })}；${errTx(page)}`);
    } catch (e) { record(7, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 8 F8 中繼點開局＋?fac=1：選秀沒有本派格、Lv20 照出
  if (want(8)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await openTitle(page, QF());
      await seedRun(page, { ace: 'hall', idx: 0 });
      await C(page, () => {
        const s = JSON.parse(localStorage.getItem('dipGameLab_v1')), Cn = window.DipLabContent;
        s.run = null; s.prologueDone = true; s.best = { far: 14, checkpoints: [10], bestStreak: 3 };
        s.runs = [{ seedKey: '20261105', runNo: 1, ace: 'hall', result: 'dead', reached: 14, bestStreak: 3, taken: 2, wins: 5 }];
        s.v = 6; Object.values(Cn.aces).forEach(id => { s.shelf[id] = { at: '20261105#1', seen: true, own: true, src: 'boss' }; });
        (Cn.gifts.hall || []).forEach(id => { s.shelf[id] = Object.assign(s.shelf[id] || { at: '20261105#1', seen: true }, { own: true, src: 'gift' }); });
        localStorage.setItem('dipGameLab_v1', JSON.stringify(s));
      });
      await openTitle(page, QF());
      await jsClick(page, '[data-a=quiet]');
      const t0 = Date.now();
      while (Date.now() - t0 < 30000 && !(await page.$('.lb-sheet.st-cp [data-cp]'))) {
        if (await page.$('.lb-sheet.seeds [data-a=none]')) { await jsClick(page, '.lb-sheet.seeds [data-a=none]'); await sleep(300); continue; }
        await C(page, () => { const nx = document.querySelector('.lb-dq .nx.on'); if (nx) document.querySelector('.lb-dq').click(); });
        await sleep(250);
      }
      await sleep(400);
      await tapReady(page, '.lb-sheet.st-cp [data-cp="10"]');
      await page.waitForSelector('.lb-sheet.st-draft [data-dpick], .lb-sheet.level [data-lv]', { timeout: 10000 }).catch(() => {});
      const lv = [], w8 = [];
      let rej = null;
      for (let g = 0; g < 16; g++) {
        const s = await C(page, () => document.querySelector('.lb-sheet.st-draft [data-dpick]') ? 'card' : (document.querySelector('.lb-sheet.level [data-lv]') && !document.querySelector('.lb-sheet.level.arming')) ? 'level' : null);
        if (!s) { if (await C(page, () => window.__lab.run.pending && window.__lab.run.pending.type === 'draft')) { await sleep(300); continue; } break; }
        if (s === 'level') {
          const L = await levelSheet(page);
          const p = await C(page, () => { const r = window.__lab.run, p = r.pending; return { type: p.type, offer: p.offer ? JSON.parse(JSON.stringify(p.offer)) : null, level: r.level, fac: !!r.fac }; });
          lv.push({ n: L.n, lv: L.lv, toLv: p.level + 1, offer: p.offer && p.offer.offer ? p.offer.offer.map(o => o.pick) : null, fac: p.fac });
          if (!rej) rej = await C(page, () => { const E = window.DipLabEngine, Cn = window.DipLabContent, r = JSON.parse(JSON.stringify(window.__lab.run)); const id = Cn.factions[r.ace].picks[0].id;
            const a = E.choose(r, Cn, { type: 'draft', pick: 'fac', id }), b = E.choose(JSON.parse(JSON.stringify(window.__lab.run)), Cn, { type: 'level', pick: 'fac', id }); return { draft: a, level: b }; });
        }
        await tapReady(page, s === 'card' ? '.lb-sheet.st-draft [data-dpick]' : '.lb-sheet.level [data-lv]');
        await sleep(700);
      }
      // 特價箱 → 來客（第 10 位）
      const t1 = Date.now();
      while (Date.now() - t1 < 30000 && (await C(page, () => window.__lab.screen())) !== 'night') {
        if (await page.$('.ec-drawer [data-a=tog]')) { await sleep(300); await answerBargain(page); await sleep(500); continue; }
        await C(page, () => { const nx = document.querySelector('.lb-dq .nx.on'); if (nx) document.querySelector('.lb-dq').click(); });
        await sleep(250);
      }
      await sleep(1000);
      const n10 = await C(page, () => { const r = window.__lab.run; return { pos: r.pos, from: r.cpFrom, level: r.level, fac: r.fac ? JSON.parse(JSON.stringify(r.fac)) : null, picks: r.picks.slice() }; });
      // Lv19 → 打贏第 10 位 → Lv20
      await C(page, () => { const E = window.DipLabEngine, Cn = window.DipLabContent, r = window.__lab.run, T = E.trialCfg(Cn, r.tier); r.level = 19; r.xp = r.level + T.levelNeed - 1; });   // 畫面那份 run（live）
      const fought = await goFight(page);
      await C(page, () => window.__lab.forceWin());
      const up = await toLevelSheet(page, 40000);
      await sleep(600);
      const L20 = await levelSheet(page);
      if (!lv.length) w8.push('選秀沒有升級題');
      if (lv.some(x => x.n !== 3 || x.lv.some(v => /^fac/.test(v)) || (x.offer && x.offer.includes('fac')))) w8.push(`選秀有本派格 ${J(lv)}`);
      if (lv.some(x => J(x.lv) !== '["atk","def","hp"]' || J(x.offer) !== J(x.lv))) w8.push(`選秀升級順序 ${J(lv.map(x => x.lv))}（要每題 品味→底氣→聲望上限，第 I 波 SPEC-I §7.1）`);
      if (!lv.some(x => x.toLv === 5)) w8.push(`選秀沒有 Lv4→5 那題 ${J(lv.map(x => x.toLv))}`);
      if (lv.some(x => !x.fac)) w8.push('選秀時 run.fac 不在');
      if (!rej || rej.draft.ok !== false || rej.draft.error !== 'bad') w8.push(`選秀送 fac ${J(rej && rej.draft)}`);
      if (n10.pos !== 10 || n10.from !== 10 || !n10.fac || J(n10.fac.picks) !== '{}' || n10.picks.some(p => /^fac/.test(p))) w8.push(`第 10 位 ${J(n10)}`);
      if (!fought || !up || !L20) w8.push(`Lv20 升級面板沒出來（開打 ${fought}、面板 ${up}）`);
      else if (L20.level !== 20 || L20.n !== 4 || !/^fac:/.test(L20.lv[3]) || J(L20.offer[3]) !== J({ pick: 'fac', id: L20.lv[3].slice(4) }) || L20.undef || L20.sh > L20.ch + 1 ||
        J(L20.lv.slice(0, 3)) !== '["atk","def","hp"]') w8.push(`Lv20 面板 ${J(L20)}`);
      record(8, size, !w8.length && !errs(page).length, `${w8.join('；') || 'ok'}；選秀升級 ${J(lv.map(x => ({ to: x.toLv, n: x.n, offer: x.offer })))}；拒 ${J(rej)}；第 10 位 ${J({ pos: n10.pos, level: n10.level })}；Lv20 ${J(L20 && { level: L20.level, lv: L20.lv, sh: [L20.sh, L20.ch] })}；${errTx(page)}`);
    } catch (e) { record(8, size, false, 'error ' + e.message); }
    await ctx.close();
  }
}

const browser = await launch();
for (const [w, h] of SIZES) await runSize(browser, w, h);
await browser.close();
const fails = results.filter(r => !r.ok);
console.log(`\n${results.length - fails.length}/${results.length} PASS`);
if (fails.length) { fails.forEach(f => console.log(`FAIL #${f.n} [${f.size}] ${f.detail}`)); process.exit(1); }
