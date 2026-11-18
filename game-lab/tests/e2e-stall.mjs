// game-lab/tests/e2e-stall.mjs：第 C 波 今天的攤位（店內攤位二選一；SPEC-C §4.3–§4.5、§8 P3、§11.2）端對端測試。測試棒。
//   需要靜態伺服器：cd dip-vinyl-shop && python3 -m http.server 8765
//   node game-lab/tests/e2e-stall.mjs
//   環境變數（見 e2e-lib.mjs）：LAB_BASE／LAB_URL；LAB_SIZES（這支預設 390x664,375x548）；STALL_ONLY＝只跑這幾項（例 1,4）
//
// 選組、各站的鈕一律真點（touchscreen.tap 打在看得到的那一點；底部的列不用 evaluate 直接叫）；把 run 擺到某一場攤位前的那一步（跳位、開攤位）用 __lab／engine。
// 每個尺寸：
//   1  第一趟（真的打完第 5 位藏家 → 寶箱 → 升級之後）：底部「今天的攤位」兩列（每列 ≥44 px、站牌 2 塊）、「下一位」不畫；點左列＝預覽（左列亮、右列暗、
//      店裡那兩站的角落亮）→ 再點一次＝確定 → 小人走到第 ① 站（挖寶攤）的角落、面板升起 → 第 ② 站（窗邊算命：走到 leaving、阿姨在窗邊）→
//      錄音室自動帶過一行「錄了一段 demo。樂歷 +15」（第 D 波拿掉「之後開放」）→ 回來客畫面、「下一位」出現。P3：第一趟必點 ≤4 下（秒數只印）
//   2  一般輪（打完第 15 位）：攤位中真點箱子／收音機／櫃檯／對戰台＝「先逛完今天的攤位。」、試聽機照開今日推薦；選組前「今天不逛了」→ 先確認 →
//      「再看看」不動 →「不逛了」+$2,000 → 回來客；P3 另一場：一般輪必點 ≤4 下（預覽、確定、每站一下）
//   3  選組後「今天不逛了」：做完第 ① 站、在第 ② 站按 → 確認 → +$1,000（剩一站）→ 回來客
//   4  重新整理：選組前（回到選組、同兩組）、站中（同一站同一批貨、人直接站在那裡）、寄賣領取時（先到櫃檯領、同三張；領完回到選組）：run 都還在
//   5  中繼點那輪（打完第 10 位）：兩站之後黑膠市集（四分頁：唱片／器材／門票／福袋）→ 錄音室；門票價錢梯（$3,000、再一張 $4,000）、「買到剩 $4,000」；
//      P3：中繼點必點 ≤7 下（不含市集裡自選的）
//   6  踢館帖（打完第 35 位、固定種子表裡第一個會出踢館帖的）：第 ② 站門口遞帖 → 接「狠角色」→ 這一輪客人品味 +1（點頭像看得到）、來客條頭像有踢館帖記號
//   7  自動玩一路過戰利品列、寶箱、攤位（第 4 位起到第 7 位）
//   每項最後看主控台 0 錯誤。任何 FAIL → exit 1。
import { launch, newPage, SIZES as SIZES0, record, results, sleep, Q, jsClick, waitScreen, duelReady, tapAt, tapReady, seededContinue, openTitle, advanceUntil, noScroll, scrollOk,
  tapHot, passLoot, stallState, clearStall } from './e2e-lib.mjs';

const SIZES = process.env.LAB_SIZES ? SIZES0 : [[390, 664], [375, 548]];
const ONLY = (process.env.STALL_ONLY || '').split(',').filter(Boolean).map(Number);
const want = n => !ONLY.length || ONLY.includes(n);
const C = (page, f, a) => page.evaluate(f, a);
const errs = page => (page._errors || []).filter(e => !/favicon/.test(e));
const errTxt = page => `錯誤 ${errs(page).length}${errs(page).length ? '：' + errs(page).slice(0, 2).join(' / ') : ''}`;
const fill = (s, o) => String(s).replace(/\$?\{(\w+)\}/g, (m, k) => (o[k] != null ? (m[0] === '$' ? '$' : '') + o[k] : m));
const money = n => '$' + Number(n).toLocaleString('en-US');
const UI = page => C(page, () => Object.assign({}, window.DipLabContent.waveC.ui, { st: window.DipLabContent.waveC.stations, ln: window.DipLabContent.waveC.stationLines }));
// 各站「一下就做完」那顆（SPEC-C §4.4；P3 每站一下）
const ONE = { dig: '[data-a=skip]', trade: '[data-a=done]', gear: '[data-a=done]', snack: '[data-a=ok]', gig: '[data-a=gigNone]', promo: '[data-a=ok]', fortune: '[data-a=ok]',
  consign: '[data-a=pass]', consignGet: '[data-a=pass]', home: '[data-a=ok]', dare: '[data-a=decline]', warehouse: '[data-a=pass]', market: '[data-a=done]' };

// 吐司、店裡亮的角落（stage.highlight）、老闆泡泡：都記下來
async function watch(page) {
  await C(page, () => {
    const W = window;
    W.__toasts = []; W.__hl = [];
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.classList && n.classList.contains('lb-toast')) W.__toasts.push(n.textContent); })))
      .observe(document.getElementById('app'), { childList: true, subtree: true });
    const st = W.__lab.stage;
    if (!st.__hlW) { const o = st.highlight; st.highlight = function (list) { W.__hl.push([].concat(...(list || []).map(g => g.ids || []))); return o.apply(this, arguments); }; st.__hlW = true; }
  });
}
const toasts = page => C(page, () => window.__toasts.slice());
// 把 run 擺到「打完第 after 位」那場攤位前（跳位、開攤位；o.groups 蓋掉兩組、o.money 錢、o.consign 寄賣到期）→ 來客畫面（攤位）
async function stallAt(page, after, o = {}) {
  await C(page, o => {
    window.__lab.jump(o.after + 1);
    const r = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent;
    if (o.consign) r.consign = { card: r.bag[r.bag.length - 1], due: r.round };
    E.stallSession(r, Cn);
    if (o.groups) r.pending.groups = o.groups;
    window.__lab.money(o.money != null ? o.money : r.money);        // 順便存檔
    window.__lab.go('night');
  }, Object.assign({ after }, o));
  await page.waitForFunction(() => window.DipLabStalls.state() && (document.querySelector('.st-pick .st-row') || document.querySelector('.lb-sheet.stall')), null, { timeout: 10000 }).catch(() => {});
  await sleep(700);
}
// 等某一站的面板（走過去、面板升起）
async function waitStation(page, kind, ms = 12000) {
  return page.waitForFunction(k => { const s = window.DipLabStalls.state(); return !!s && s.phase === 'station' && s.kind === k && !!document.querySelector('.lb-sheet.stall.st-k-' + k); }, kind, { timeout: ms }).then(() => true, () => false);
}
// 逛完回到來客：「下一位」出現、pending 清掉
async function waitNight(page, ms = 15000) {
  return page.waitForFunction(() => window.__lab.screen() === 'night' && !!document.querySelector('[data-a=go]') && !(window.__lab.run.pending && window.__lab.run.pending.type === 'stall'), null, { timeout: ms }).then(() => true, () => false);
}
// 點一列兩下（預覽、確定）；回 { preview: {on, dim, hl}, picked }
async function pickRow(page, g) {
  const sel = `.st-pick .st-row[data-g="${g}"]`;
  await C(page, () => { window.__hl = []; });
  await tapReady(page, sel); await sleep(350);
  const pv = await C(page, g => { const rows = [...document.querySelectorAll('.st-pick .st-row')]; return { on: rows.map(r => r.classList.contains('on')), dim: rows.map(r => r.classList.contains('dim')), hl: (window.__hl[window.__hl.length - 1] || []).slice(), pick: window.__lab.run.pending.pick }; }, g);
  await tapReady(page, sel); await sleep(200);
  const picked = await C(page, () => window.__lab.run.pending && window.__lab.run.pending.pick);
  return { preview: pv, picked };
}
// 這一站點一下做完（ONE 表）
async function oneTap(page, kind) {
  const sel = '.lb-sheet.stall ' + ONE[kind];
  await page.waitForSelector(sel, { timeout: 5000 });
  await sleep(150);
  await tapReady(page, sel);
  await sleep(300);
}
async function winGuest(page) {
  await page.waitForSelector('[data-a=go]', { timeout: 15000 }); await sleep(300);
  await tapReady(page, '[data-a=go]'); await duelReady(page, 25000); await sleep(300);
  await C(page, () => window.__lab.forceWin());
}
async function beatBoss(page) {
  await page.waitForSelector('[data-a=go]', { timeout: 15000 });
  await jsClick(page, '[data-a=go]');
  await waitScreen(page, 'scene');
  for (let g = 0; g < 150 && !(await page.$('.lb-dq.hasmenu .lb-dqopt')); g++) { if (await page.$('.lb-dq .nx.on')) await jsClick(page, '.lb-dq'); await sleep(200); }
  await sleep(450); await jsClick(page, '.lb-dq .lb-dqopt');
  await waitScreen(page, 'duel');
  await page.waitForFunction(() => window.__lab.rawDuel() && !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
  await sleep(600);
  await C(page, () => window.__lab.forceWin());
  await advanceUntil(page, () => !!document.querySelector('#panel > .lb-sheet.one [data-i]') || window.__lab.screen() === 'reward', null, 30000);
  if (await page.$('#panel > .lb-sheet.one [data-i]')) { await sleep(300); await tapReady(page, '#panel > .lb-sheet.one [data-i="0"]'); }
}
const reloadCont = async (page, q) => { await openTitle(page, q); await jsClick(page, '[data-a=cont]'); await waitScreen(page, 'night', 15000); await sleep(1200); };

async function runSize(browser, w, h) {
  const size = `${w}x${h}`;
  const QF = Q('&fast=1');

  // ---------------------------------------------------------------- 1 第一趟：真的打完第 5 位
  if (want(1)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await seededContinue(page, { ace: 'hall', idx: 4, autoNext: true }, QF);
      await waitScreen(page, 'night', 20000); await sleep(700);
      const x = await UI(page);
      await beatBoss(page);
      await passLoot(page, {});                                    // 寶箱不收 → 升級 → 來客畫面（攤位）
      await page.waitForSelector('.st-pick .st-row', { timeout: 15000 }).catch(() => {});
      await watch(page); await sleep(600);
      const s0 = await stallState(page);
      const look = await C(page, () => { const rows = [...document.querySelectorAll('.st-pick .st-row')];
        return { title: (document.querySelector('.st-pick .st-hd b') || {}).textContent || '', rows: rows.map(r => { const b = r.getBoundingClientRect(); return { h: Math.round(b.height), w: Math.round(b.width), tiles: [...r.querySelectorAll('.st-tile .nm')].map(t => t.textContent), inView: b.top >= 0 && b.bottom <= innerHeight }; }),
          post: (document.querySelector('.st-pick .st-post') || {}).textContent || '', p0: window.__lab.stage.pos('p') }; });
      const sc0 = await noScroll(page);
      page._clicks = 0; const t0 = Date.now();
      const pk = await pickRow(page, 0);
      const okDig = await waitStation(page, 'dig');
      await page.waitForFunction(() => { const s = document.querySelector('.lb-sheet.stall'); return !!s && s.getAnimations().every(a => a.playState !== 'running'); }, null, { timeout: 3000 }).catch(() => {});   // 面板升起停了才量
      const at1 = await C(page, () => { const st = window.__lab.stage, p = st.pos('p'), hs = st.hotspots() || [], lit = window.__hl[window.__hl.length - 1] || [];
        const c = lit.map(id => hs.find(h => h.id === id)).filter(Boolean).map(h => [h.rect[0] + h.rect[2] / 2, h.rect[1] + h.rect[3] / 2]);
        const d = c.length ? Math.min(...c.map(q => Math.hypot(q[0] - p.x, q[1] - p.y))) : 999;
        const s = document.querySelector('.lb-sheet.stall'), b = s.getBoundingClientRect();
        return { p: { x: Math.round(p.x), y: Math.round(p.y) }, d: Math.round(d), lit, name: (s.querySelector('.hd h3 span') || {}).textContent, line: (s.querySelector('.st-line span') || {}).textContent, sheetIn: b.bottom <= innerHeight + 1, down: s.querySelectorAll('.st-down').length }; });
      await oneTap(page, 'dig');
      const okFt = await waitStation(page, 'fortune');
      const at2 = await C(page, () => { const st = window.__lab.stage, p = st.pos('p'), sp = st.spot('leaving'), f = st.pos('f'); return { p: [Math.round(p.x), Math.round(p.y)], sp, f: f && !f.hidden ? [Math.round(f.x), Math.round(f.y)] : null }; });
      await oneTap(page, 'fortune');
      const back = await waitNight(page, 15000);
      const secs = ((Date.now() - t0) / 1000).toFixed(1);
      const taps = page._clicks;
      const tt = await toasts(page);
      const a = await C(page, () => ({ fortune: window.__lab.run.fortune, lexp: window.__lab.run.lexp || {}, go: !!document.querySelector('[data-a=go]') }));
      const demo = fill(x.demo, { n: 15 });
      const okLook = s0.stall && s0.p.first && JSON.stringify(s0.p.groups) === JSON.stringify([['dig', 'fortune'], ['warehouse', 'home']]) && s0.rows === 2 && !s0.go && look.title === x.stallTitle &&
        look.rows.every(r => r.h >= 44 && r.tiles.length === 2 && r.inView) && look.rows[0].tiles.join() === [x.st.dig, x.st.fortune].join() && scrollOk(sc0);
      const okPick = JSON.stringify(pk.preview.on) === '[true,false]' && JSON.stringify(pk.preview.dim) === '[false,true]' && pk.preview.pick === null && pk.preview.hl.length >= 2 && pk.preview.hl.includes('bin:blues') && pk.picked === 0;
      const okWalk = okDig && at1.name === x.st.dig && at1.line === '「' + x.ln.dig + '」' && at1.sheetIn && at1.down === 3 && at1.d <= 70 &&
        okFt && at2.p[0] === at2.sp[0] && at2.p[1] === at2.sp[1] && !!at2.f;
      const ok = okLook && okPick && okWalk && back && a.go && tt.includes(demo) && !!a.fortune && taps <= 4;
      record(1, size, ok && !errs(page).length, `第一趟兩組 ${JSON.stringify(s0.p && s0.p.groups)}＋${JSON.stringify(s0.p && s0.p.post)}；底部「${look.title}」列 ${JSON.stringify(look.rows)}、下一位 ${s0.go}；` +
        `預覽 亮 ${JSON.stringify(pk.preview.on)} 暗 ${JSON.stringify(pk.preview.dim)} 店裡亮 ${JSON.stringify(pk.preview.hl)} → 確定 ${pk.picked}；① ${at1.name}「${at1.line}」小人 ${JSON.stringify(at1.p)} 離亮的角落 ${at1.d} px、蓋牌 ${at1.down}；` +
        `面板在畫面裡 ${at1.sheetIn}；② 算命 小人 ${JSON.stringify(at2.p)}＝leaving ${JSON.stringify(at2.sp)}、阿姨 ${JSON.stringify(at2.f)}、run.fortune ${JSON.stringify(a.fortune)}；錄音室「${demo}」${tt.includes(demo)}；回來客 ${back}；P3 必點 ${taps} 下（≤4）、${secs} 秒；${errTxt(page)}`);
    } catch (e) { record(1, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 2 一般輪：擋箱子等、試聽機照開；選組前不逛了；P3
  if (want(2)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await seededContinue(page, { ace: 'hall', idx: 0, autoNext: true }, QF);
      await waitScreen(page, 'night', 20000); await sleep(700);
      const x = await UI(page);
      await watch(page);
      await stallAt(page, 15, { groups: [['snack', 'promo'], ['gig', 'dig']], money: 9000 });
      const s0 = await stallState(page);
      // 攤位中點箱子／收音機／櫃檯／對戰台：先逛完今天的攤位；試聽機：今日推薦照開
      const hits = {};
      for (const [k, pred] of [['crate', h => /^(crate|bin):/.test(h.action)], ['radio', h => h.action === 'radio'], ['counter', h => h.action === 'counter'], ['duel', h => h.action === 'duel']]) {
        await C(page, () => { window.__toasts = []; });
        const p = await tapHot(page, pred);
        await sleep(450);
        hits[k] = p ? (await toasts(page)).filter(t => t === x.busy).length : 'none';
        await C(page, () => document.querySelectorAll('.lb-sheet.float').forEach(s => s.remove()));
      }
      const pb = await tapHot(page, h => h.action === 'listen' || h.action === 'booth');
      const booth = pb ? await page.waitForSelector('.lb-sheet.booth', { timeout: 4000 }).then(() => true, () => false) : 'none';
      if (booth === true) { await jsClick(page, '.lb-sheet.booth [data-a=close]'); await sleep(400); }
      const s1 = await stallState(page);
      // 選組前：今天不逛了 → 確認 → 再看看（不動）→ 不逛了（+$2,000）
      const m0 = s1.money;
      await tapReady(page, '.st-pick [data-a=leave]'); await sleep(350);
      const ask = await C(page, () => ({ t: (document.querySelector('.st-ask p') || {}).textContent || '', yes: (document.querySelector('.st-ask [data-a=leaveYes]') || {}).textContent, no: (document.querySelector('.st-ask [data-a=leaveNo]') || {}).textContent }));
      await tapReady(page, '.st-ask [data-a=leaveNo]'); await sleep(350);
      const s2 = await stallState(page);
      await tapReady(page, '.st-pick [data-a=leave]'); await sleep(350);
      await tapReady(page, '.st-ask [data-a=leaveYes]');
      const back = await waitNight(page, 15000);
      const m1 = await C(page, () => window.__lab.run.money);
      const okBusy = hits.crate === 1 && hits.radio === 1 && hits.counter === 1 && hits.duel === 1 && booth === true && s1.stall && s1.p.pick === null;
      const okLeave = ask.t === fill(x.leaveAsk, { n: '1,000' }) && ask.yes === x.leaveYes && ask.no === x.leaveNo && s2.stall && s2.p.pick === null && s2.rows === 2 && s2.money === m0 && back && m1 === m0 + 2000;
      // P3 一般輪：另一場（打完第 20 位不是一般輪 → 第 25 位）真點預覽、確定、每站一下
      await stallAt(page, 25, { groups: [['snack', 'promo'], ['gig', 'dig']], money: 9000 });
      page._clicks = 0; const t0 = Date.now();
      const pk = await pickRow(page, 0);
      const okA = await waitStation(page, 'snack'); await oneTap(page, 'snack');
      const okB = await waitStation(page, 'promo'); await oneTap(page, 'promo');
      const back2 = await waitNight(page, 15000);
      const taps = page._clicks, secs = ((Date.now() - t0) / 1000).toFixed(1);
      const okP3 = pk.picked === 0 && okA && okB && back2 && taps <= 4;
      record(2, size, okBusy && okLeave && okP3 && !errs(page).length, `一般輪 ${JSON.stringify(s0.p && s0.p.groups)}（cp ${s0.p && s0.p.cp}）；點了出「${x.busy}」${JSON.stringify(hits)}、試聽機今日推薦 ${booth}；` +
        `不逛了「${ask.t}」${ask.no}/${ask.yes} → 再看看 pick ${s2.p && s2.p.pick}、錢 ${s2.money}（${m0}）→ 不逛了 ${m0}→${m1}、回來客 ${back}；P3 一般輪 ${taps} 下（≤4）、${secs} 秒；${errTxt(page)}`);
    } catch (e) { record(2, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 3 選組後不逛了（第 ② 站，剩一站 +$1,000）
  if (want(3)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await seededContinue(page, { ace: 'hall', idx: 0, autoNext: true }, QF);
      await waitScreen(page, 'night', 20000); await sleep(700);
      const x = await UI(page);
      await stallAt(page, 15, { groups: [['snack', 'gig'], ['promo', 'trade']], money: 9000 });
      await pickRow(page, 1);
      const okA = await waitStation(page, 'promo'); await oneTap(page, 'promo');
      const okB = await waitStation(page, 'trade');
      const m0 = await C(page, () => window.__lab.run.money);
      await tapReady(page, '.lb-sheet.stall [data-a=leave]'); await sleep(350);
      const ask = await C(page, () => (document.querySelector('.lb-sheet.stall .st-ask p') || {}).textContent || '');
      await tapReady(page, '.lb-sheet.stall [data-a=leaveYes]');
      const back = await waitNight(page, 15000);
      const m1 = await C(page, () => window.__lab.run.money);
      record(3, size, okA && okB && ask === fill(x.leaveAsk, { n: '1,000' }) && back && m1 === m0 + 1000 && !errs(page).length, `選組後（第 ② 站同業調貨）不逛了「${ask}」→ ${m0}→${m1}（+1,000）、回來客 ${back}；${errTxt(page)}`);
    } catch (e) { record(3, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 4 重新整理：選組前、站中、寄賣領取
  if (want(4)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await seededContinue(page, { ace: 'hall', idx: 0, autoNext: true }, QF);
      await waitScreen(page, 'night', 20000); await sleep(700);
      // 選組前
      await stallAt(page, 15, { groups: [['dig', 'snack'], ['gig', 'promo']], money: 9000 });
      const a0 = await stallState(page);
      await reloadCont(page, QF);
      const a1 = await stallState(page);
      const okPick = a1.stall && a1.p.pick === null && a1.rows === 2 && JSON.stringify(a1.p.groups) === JSON.stringify(a0.p.groups) && !a1.go;
      // 站中（挖寶攤）：同一站同一批貨、人直接站在那裡、面板開著
      await pickRow(page, 0);
      await waitStation(page, 'dig');
      const b0 = await stallState(page);
      const p0 = await C(page, () => { const p = window.__lab.stage.pos('p'); return [Math.round(p.x), Math.round(p.y)]; });
      await reloadCont(page, QF);
      const okSt = await waitStation(page, 'dig', 8000);
      const b1 = await stallState(page);
      const p1 = await C(page, () => { const p = window.__lab.stage.pos('p'); return [Math.round(p.x), Math.round(p.y)]; });
      const okMid = okSt && b1.p.cur === 'dig' && b1.p.key === b0.p.key && JSON.stringify(b1.p.cards) === JSON.stringify(b0.p.cards) && JSON.stringify(p1) === JSON.stringify(p0) && b1.p.pick === 0;
      await clearStall(page);
      // 寄賣到期：選組前先到櫃檯領（同三張），重新整理照樣；領完回到選組
      await stallAt(page, 25, { consign: true, money: 9000 });
      const okC0 = await waitStation(page, 'consignGet');
      const c0 = await stallState(page);
      await reloadCont(page, QF);
      const okC1 = await waitStation(page, 'consignGet', 8000);
      const c1 = await stallState(page);
      await tapReady(page, '.lb-sheet.stall [data-take]');
      await page.waitForSelector('.st-pick .st-row', { timeout: 10000 }).catch(() => {});
      await sleep(400);
      const c2 = await stallState(page);
      const okCons = okC0 && okC1 && c1.p.key === c0.p.key && JSON.stringify(c1.p.cards) === JSON.stringify(c0.p.cards) && c2.stall && c2.p.pick === null && c2.rows === 2 && c2.p.cur === null;
      await clearStall(page);
      const run = await C(page, () => !!window.__lab.run && !window.__lab.run.over);
      record(4, size, okPick && okMid && okCons && run && !errs(page).length, `選組前重新整理：選組 ${a1.p && a1.p.pick}、兩組一樣 ${a1.p && JSON.stringify(a1.p.groups) === JSON.stringify(a0.p.groups)}；` +
        `站中：${b1.p && b1.p.cur} 同一批貨 ${b1.p && JSON.stringify(b1.p.cards) === JSON.stringify(b0.p.cards)}、小人 ${JSON.stringify(p0)}→${JSON.stringify(p1)}；` +
        `寄賣簿 ${okC0}/${okC1} 同三張 ${c1.p && JSON.stringify(c1.p.cards) === JSON.stringify(c0.p.cards)} → 領完回選組 ${c2.p && c2.p.pick === null}（${c2.rows} 列）；run 還在 ${run}；${errTxt(page)}`);
    } catch (e) { record(4, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 5 中繼點那輪：市集四分頁、門票價錢梯、買到剩 $4,000、錄音室；P3 ≤7
  if (want(5)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await seededContinue(page, { ace: 'hall', idx: 0, autoNext: true }, QF);
      await waitScreen(page, 'night', 20000); await sleep(700);
      const x = await UI(page);
      await watch(page);
      await stallAt(page, 10, { groups: [['snack', 'dig'], ['promo', 'trade']], money: 20000 });
      const s0 = await stallState(page);
      const postTx = await C(page, () => (document.querySelector('.st-pick .st-post') || {}).textContent || '');
      page._clicks = 0; let extra = 0; const t0 = Date.now();
      await pickRow(page, 0);
      const okA = await waitStation(page, 'snack'); await oneTap(page, 'snack');
      const okB = await waitStation(page, 'dig'); await oneTap(page, 'dig');
      const okM = await waitStation(page, 'market');
      const tabs = await C(page, () => [...document.querySelectorAll('.lb-sheet.stall .st-tabs [data-tab]')].map(b => b.textContent));
      // 門票分頁（自選的，不算 P3）：價錢梯、買到剩 $4,000
      const c0 = page._clicks;
      await tapReady(page, '.lb-sheet.stall .st-tabs [data-tab="2"]'); await sleep(300);
      const g1 = await C(page, () => (document.querySelector('.lb-sheet.stall [data-a=gigBuy]') || {}).textContent || '');
      await tapReady(page, '.lb-sheet.stall [data-a=gigPlus]'); await sleep(250);
      const g2 = await C(page, () => (document.querySelector('.lb-sheet.stall [data-a=gigBuy]') || {}).textContent || '');
      const keep = await C(page, () => ({ t: (document.querySelector('.lb-sheet.stall [data-a=gigKeep]') || {}).textContent || '', n: window.DipLabEngine.gigKeepN(window.__lab.run, window.DipLabContent), m: window.__lab.run.money, tk: window.__lab.run.tickets | 0 }));
      await tapReady(page, '.lb-sheet.stall [data-a=gigKeep]'); await sleep(400);
      const k1 = await C(page, () => ({ m: window.__lab.run.money, tk: window.__lab.run.tickets | 0, next: window.DipLabEngine.gigPrice(window.__lab.run, window.DipLabContent, 1) }));
      extra = page._clicks - c0;
      await oneTap(page, 'market');
      const back = await waitNight(page, 15000);
      const taps = page._clicks - extra, secs = ((Date.now() - t0) / 1000).toFixed(1);
      const tt = await toasts(page);
      const okTk = g1 === fill(x.gigBuy, { k: 1, n: '3,000' }) && g2 === fill(x.gigBuy, { k: 2, n: '7,000' }) && keep.n >= 1 && keep.t.indexOf(fill(x.gigKeep, { n: '4,000' })) === 0 &&
        k1.tk === keep.tk + keep.n && k1.m >= 4000 && k1.m - k1.next < 4000;
      const ok = s0.p.cp && JSON.stringify(s0.p.post) === '["market","studio"]' && postTx === fill(x.then, { list: [x.st.market, x.st.studio].join('・') }) && okA && okB && okM &&
        JSON.stringify(tabs) === JSON.stringify(x.marketTabs) && okTk && back && tt.includes(fill(x.demo, { n: 15 })) && taps <= 7;
      record(5, size, ok && !errs(page).length, `中繼點 cp ${s0.p && s0.p.cp} 之後「${postTx}」；市集分頁 ${JSON.stringify(tabs)}；門票「${g1}」→「${g2}」；「${keep.t}」買 ${keep.n} 張 ${keep.m}→${k1.m}（下一張 ${k1.next}）；` +
        `錄音室 ${tt.includes(fill(x.demo, { n: 15 }))}；回來客 ${back}；P3 中繼點 ${taps} 下（≤7，市集自選 ${extra} 下不算）、${secs} 秒；${errTxt(page)}`);
    } catch (e) { record(5, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 6 踢館帖：接狠角色 → 這一輪品味 +1
  if (want(6)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await openTitle(page, QF);
      // 固定種子表：第一個「打完第 35 位那場攤位有踢館帖」的
      const seed = await C(page, () => { const E = window.DipLabEngine, Cn = window.DipLabContent;
        for (let i = 1; i <= 80; i++) { const k = 'dare' + i, r = E.newRun(Cn, { seedKey: k, runNo: 1, ace: 'hall', prologue: false, relics: [] }); const ch = E.bargainPolicy(r, Cn); if (ch) E.choose(r, Cn, ch);
          E.jumpTo(r, Cn, 36); E.stallSession(r, Cn); const g = r.pending && r.pending.groups; if (g && g.some(x => x[1] === 'dare')) return { k, groups: g }; }
        return null; });
      if (!seed) throw new Error('no dare seed');
      const { seedRun } = await import('./e2e-lib.mjs');
      await seedRun(page, { ace: 'hall', idx: 0, autoNext: true, seedKey: seed.k });
      await openTitle(page, QF); await jsClick(page, '[data-a=cont]');
      await waitScreen(page, 'night', 20000); await sleep(700);
      const x = await UI(page);
      await stallAt(page, 35, { money: 9000 });
      const s0 = await stallState(page);
      const g = s0.p.groups.findIndex(gr => gr[1] === 'dare');
      const atk0 = await C(page, () => window.DipLabEngine.roundGuests(window.__lab.run, window.DipLabContent).map(q => q.atk | 0));
      await pickRow(page, g);
      const k1 = s0.p.groups[g][0];
      const okA = await waitStation(page, k1); await oneTap(page, k1);
      const okD = await waitStation(page, 'dare');
      const d0 = await C(page, () => { const s = document.querySelector('.lb-sheet.stall'), f = window.__lab.stage.pos('f'), p = window.__lab.stage.pos('p'), sp = window.__lab.stage.spot('atdoor');
        return { line: (s.querySelector('.st-line span') || {}).textContent, tough: (s.querySelector('[data-dare=tough]') || {}).textContent, f: !!f && !f.hidden, p: [Math.round(p.x), Math.round(p.y)], sp }; });
      await tapReady(page, '.lb-sheet.stall [data-dare=tough]');
      const back = await waitNight(page, 15000);
      const a = await C(page, () => ({ dare: window.__lab.run.dare, atk: window.DipLabEngine.roundGuests(window.__lab.run, window.DipLabContent).map(q => q.atk | 0), marks: document.querySelectorAll('[data-tut=night] .st-mk.dr').length }));
      await tapReady(page, '[data-tut=night] .nc[data-i="0"]'); await sleep(500);
      const gs = await C(page, () => [...document.querySelectorAll('.lb-sheet.guest .bl.st b')].map(b => b.textContent));
      const wantAtk = await C(page, n => window.DipLabContent.trial.ui.atk.replace('{n}', n), a.atk[0]);
      const ok = okA && okD && d0.line === '「' + x.ln.dare + '」' && d0.tough === fill(x.dareTough, { n: 1 }) && d0.f && d0.p[0] === d0.sp[0] && d0.p[1] === d0.sp[1] &&
        back && a.dare && a.dare.mode === 'tough' && a.atk.every((v, i) => v === atk0[i] + 1) && a.marks >= 1 && gs.includes(wantAtk);
      record(6, size, ok && !errs(page).length, `種子 ${seed.k} 兩組 ${JSON.stringify(s0.p.groups)}；門口「${d0.line}」小人 ${JSON.stringify(d0.p)}＝atdoor ${JSON.stringify(d0.sp)}、遞帖的在 ${d0.f}；接「${d0.tough}」→ dare ${JSON.stringify(a.dare)}；` +
        `品味 ${JSON.stringify(atk0)}→${JSON.stringify(a.atk)}；來客條記號 ${a.marks}；點頭像 ${JSON.stringify(gs)}（要「${wantAtk}」）；${errTxt(page)}`);
    } catch (e) { record(6, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 7 自動玩一路過戰利品列、寶箱、攤位
  if (want(7)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await seededContinue(page, { ace: 'hall', idx: 3, autoNext: true, hp: 80, maxHp: 80, atk: 4, def: 2 }, QF);   // 打得贏（這一項看的是自動玩會不會卡在戰利品列、寶箱、攤位，不是勝率）
      await waitScreen(page, 'night', 20000); await sleep(500);
      await C(page, () => { window.__seen = []; setInterval(() => { const p = window.__lab.run && window.__lab.run.pending; const k = p ? p.type + (p.kind ? ':' + p.kind : '') : ''; if (k && window.__seen[window.__seen.length - 1] !== k) window.__seen.push(k); }, 50); });
      await C(page, () => window.__lab.autoplay('thoughtful', { until: 'never' }));
      const t0 = Date.now(); let pos = 0;
      while (Date.now() - t0 < 120000) { pos = await C(page, () => window.__lab.run && window.__lab.run.pos); if (pos >= 7) break; await sleep(500); }
      await C(page, () => window.__lab.stop());
      const seen = await C(page, () => window.__seen.slice());
      const ok = pos >= 7 && seen.includes('reward:loot') && seen.includes('reward:chest') && seen.includes('stall');
      record(7, size, ok && !errs(page).length, `自動玩：到第 ${pos} 位、經過 ${JSON.stringify(seen)}、${((Date.now() - t0) / 1000).toFixed(1)} 秒；${errTxt(page)}`);
    } catch (e) { record(7, size, false, 'error ' + e.message); }
    await ctx.close();
  }
}

const browser = await launch();
try {
  for (const [w, h] of SIZES) await runSize(browser, w, h);
} finally {
  await browser.close();
}
const fail = results.filter(r => !r.ok);
console.log(`\n${results.length - fail.length}/${results.length} PASS` + (fail.length ? `；FAIL：${fail.map(r => '#' + r.n + ' ' + r.size).join(', ')}` : ''));
process.exit(fail.length ? 1 : 0);
