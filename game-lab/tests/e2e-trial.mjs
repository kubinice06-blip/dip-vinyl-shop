// game-lab/tests/e2e-trial.mjs：第 D 波棒三「試煉階級」＋「派樹」（?fac=1）端對端測試（scratchpad v5/wave-d SPEC-D §3.6–§3.7、§5、§10.2；契約 build3/CONTRACT.md）。
//   需要靜態伺服器（repo 根目錄）：python3 -m http.server 8765
//   node game-lab/tests/e2e-trial.mjs
//   環境變數（見 e2e-lib.mjs）：LAB_BASE／LAB_URL；LAB_SIZES（這支預設 390x664,375x548）；TRIAL_ONLY＝只跑這幾項（例 2,3）；
//   TRIAL_SHOTS＝截圖資料夾（dpr 2：推門那列、試煉階級面板、開階過場卡、派樹分頁）
//
// 字照規格寫死（不從 content 讀，免得引擎跟資料一起錯也過）：第 1 階「什麼都不露的提示多 5%。」；過關＝走到第 21 位（打倒第 20 位傳說藏家）；
//   樂歷 ×(1＋0.1k)；第 k 階＝前 k 條全部算。畫面字（第 {k} 階、試煉階級…）從 C.trial.ui 讀、跟規格的字逐字比。
//
// 每個尺寸：
//   1  T1 新帳號看不到：(a) 沒存檔的新帳號標題沒有推門那列；(b) 老帳號（Lv12、最遠 34）沒開過試煉：沒有推門那列、第一行照舊「最遠：第 34 位」、樂歷頁解鎖區沒有試煉那行；
//      推門 → 來客：run.tier 0、來客條沒有「第 k 階」小標、「再挑戰一趟」沒有階；(c) 旗標關樂歷頁沒有分頁（派樹不出）
//   2  T2＋T6b 開階：從第 10 位開（中繼點）的一趟、第 0 階 → 跳到第 20 位（傳說藏家）真的打倒 → 一路到第 21 位 → 輸：save.trial.open 1、best[0] 21、runs[k] 沒有 tier；
//      結算「走到」那行沒有「第 k 階・」；「再挑戰一趟」→ 過場卡「開了第 1 階：什麼都不露的提示多 5%。」＋「推門前在標題選第幾階；這一階樂歷 ×1.1。」→ 下一趟 run.tier 0（pick 不動）
//   3  T3 推門那列（open 3、pick 0、best {0:34,1:25,2:22}；有一趟在打＋?apex=1＝最擠那組）：‹ 灰、› 亮 → 真點 › 三下＝第 3 階、› 灰、pick 3 存檔；‹ 一下＝第 2 階；
//      第一行最遠短版「最遠 34（第 2 階 22）」跟著換；>600px 下面那行「這一階：…」「另外 1 條 ›」；≤600px 跟樂歷第二行同一列（不重疊、都在畫面裡）；
//      標題不捲、每顆 ≥44 高；點中間 → 「試煉階級」面板：第 0–3 階＋第 4 階鎖（「打倒第 20 位藏家開下一階」）、第 1、2 階「過關」、第 1 階「最遠第 25 位」、第 3 階「還沒打過」、
//      選中的「已選」；點第 1 階 → pick 1、關掉後標題那列「第 1 階」；重新整理還是第 1 階
//   4  T4＋T5 第 k 階那一趟（open 3、pick 2）：推門 → 來客條「第 1 輪」旁「第 2 階」、run.tier 2 → 開打：頂欄小字有「第 2 階」→ 輸到結算：「第 2 階・走到第 n 位」同一行、
//      結算不捲、「再挑戰一趟・第 2 階」；runs[k].tier 2、best[2]＝max；樂歷 gain.mul 1.2、total＝round((基本＋破紀錄＋路線)×1.2)；明細「×1.2 第 2 階」
//   5  T6a 中繼點從第 50 位開（open 1、pick 1）：走到第 60 位輸 → open 還是 1（沒打第 20 位那場）、best[1] 60
//   6  派樹（?fac=1；經典熟練 Lv6＝5 派點）：樂歷頁分頁「天賦｜派樹」→ 派樹：「經典流的派樹」「派點 5」、九格（收藏三格鎖：之後開放／鎮店盤上線後開、沒有＋－）、
//      挑著學「先點「先聲奪人」」＋灰；真點：先聲奪人＋ → 派點 4；挑著學＋ → 2；口碑＋ → 0、口碑＋灰；先聲奪人－ → 吐司「先退「挑著學」」、樹不變；口碑－；
//      點先聲奪人的格子 → 展開說明（「本派格先出「初版」。」＋初版的說明）；全部重配 → 樹空、派點 5；再點先聲奪人、挑著學 → 關頁、推門 → run.fac.tal {a1:1,a2:1}；
//      每列 ≥44、＋－ 44×44；（沒 ?fac=1 的樂歷頁沒有分頁：#1c）
//   7  挑著學的升級面板（?fac=1、樹 a2）：Lv4 差一點升級 → 打贏 → 升到 Lv5 面板 5 顆（3 屬性＋2 本派、[data-lv=fac] 兩顆、不同項）、不捲、每顆 ≥44
//   每項最後看主控台 0 錯誤。任何 FAIL → exit 1。
import fs from 'fs';
import { launch, newPage, SIZES as SIZES0, record, results, sleep, Q, jsClick, tapAt, waitScreen, noScroll, scrollOk, openTitle,
  answerBargain, passLoot, clearStall, tapReady } from './e2e-lib.mjs';

const SIZES = process.env.LAB_SIZES ? SIZES0 : [[390, 664], [375, 548]];
const ONLY = (process.env.TRIAL_ONLY || '').split(',').filter(Boolean).map(Number);
const want = n => !ONLY.length || ONLY.includes(n);
const SHOTS = process.env.TRIAL_SHOTS || '';
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
const C = (page, f, a) => page.evaluate(f, a);
const fill = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (o[k] != null ? o[k] : m));
const errs = page => (page._errors || []).filter(e => !/favicon/.test(e));
const errTx = page => `錯誤 ${errs(page).length}${errs(page).length ? '：' + errs(page).slice(0, 2).join(' / ') : ''}`;
const J = x => JSON.stringify(x);
const TIER1 = '什麼都不露的提示多 5%。';                       // 規格 §5.2 第 1 階（定稿字：「多 5%」）
const shot = async (page, name) => { if (SHOTS) { await sleep(350); await page.screenshot({ path: `${SHOTS}/${name}.png` }); } };
const TU = page => C(page, () => Object.assign({}, window.DipLabContent.trial.ui, { tiers: window.DipLabContent.trial.tiers.map(x => ({ name: x.name, text: x.text })),
  career: Object.assign({}, window.DipLabContent.career.ui), F: Object.assign({}, window.DipLabContent.factions.ui), summary: Object.assign({}, window.DipLabContent.summary), aceTitle: Object.assign({}, window.DipLabContent.aceTitle) }));

// 一份 v8 存檔（D 版形狀）：o.career、o.trial、o.run（{ace, from, tier, fac, tal, set}；沒給＝沒有進行中的）、o.runs、o.best、o.lastAce、o.own（再收 n 張能當種子的）
async function seedSave(page, o) {
  await page.evaluate(o => {
    const E = window.DipLabEngine, Cn = window.DipLabContent;
    const career = Object.assign({ key: 'e2e-trial', xp: 6600, spent: {}, off: false, prof: { hall: 0, pearl: 0, heresy: 0 }, tree: { hall: {}, pearl: {}, heresy: {} }, drawn: [], got: [], banked: true, lastGain: null }, o.career || {});
    const lv = E.careerLevel(Cn, career.xp).level; career.drawn = []; for (let n = 2; n <= lv; n++) career.drawn.push(n);
    const ace = (o.run && o.run.ace) || o.lastAce || 'hall';
    let r = null;
    if (o.run) {
      const ro = { seedKey: o.run.seedKey || '20261106', runNo: 1, ace, prologue: false, relics: [] };
      if (o.run.from) ro.from = o.run.from;
      if (o.run.tier) ro.tier = o.run.tier;
      if (o.run.fac) { ro.fac = true; ro.facTal = o.run.tal || {}; }
      r = E.newRun(Cn, ro);
      r.tut = false; r.farBefore = (o.best && o.best.far) | 0;
      for (let g = 0; g < 40 && r.pending && r.pending.type === 'draft'; g++) { const ch = E.runPolicy(r, Cn); if (!ch || !E.choose(r, Cn, ch).ok) break; }
      const ch = E.bargainPolicy(r, Cn); if (ch) E.choose(r, Cn, ch);
      Object.assign(r, o.run.set || {});
    }
    const s = { v: 8, seen: { night: true, unlockHint: true, aceSwap: true, lv1: true, facPick: true }, learned: {}, settings: { fastAnim: false, sound: false, autoNext: true }, player: null, run: r,
      runs: o.runs || [{ seedKey: '20261101', runNo: 1, ace, result: 'dead', reached: 34, bestStreak: 6, taken: 5, wins: 33, level: 8, checkpoints: [10, 20, 30] }],
      best: o.best || { far: 34, checkpoints: [10, 20, 30], bestStreak: 6 }, shelf: {}, relics: [], tutorialDone: true, prologueDone: true, lastAce: ace, lastBargain: null, career };
    if (o.trial) s.trial = o.trial;
    s.shelf[Cn.aces[ace]] = { at: 'e2e#1', seen: true, own: true, src: 'start' };
    (Cn.gifts[ace] || []).forEach(id => { s.shelf[id] = { at: 'e2e#1', seen: true, own: true, src: 'gift' }; });
    if (r) r.bag.forEach(id => { if (!s.shelf[id]) s.shelf[id] = { at: 'e2e#1', seen: false }; });
    localStorage.setItem('dipGameLab_v1', JSON.stringify(s));
  }, o);
}
const stored = page => C(page, () => JSON.parse(localStorage.getItem('dipGameLab_v1') || 'null'));
async function waitDuel(page, ms = 25000) {
  const ok = await page.waitForFunction(() => window.__lab && window.__lab.screen() === 'duel' && window.__lab.rawDuel() && !window.__lab.rawDuel().over && !window.__lab.going(), null, { timeout: ms }).then(() => true, () => false);
  await sleep(450); return ok;
}
const nightReady = (page, ms = 25000) => page.waitForFunction(() => window.__lab && window.__lab.screen() === 'night' && !!document.querySelector('.lb-night [data-a=go]') && !window.__lab.going(), null, { timeout: ms }).then(() => true, () => false);
// 標題「推門」／結算「再挑戰一趟」之後走到來客：挑種子（不挑）、過場卡記下來點掉、特價箱照點、對白往下
async function driveToNight(page, ms = 45000) {
  const t0 = Date.now(), cards = [];
  while (Date.now() - t0 < ms) {
    if (await C(page, () => window.__lab.screen() === 'night' && !!document.querySelector('.lb-night [data-a=go]') && !window.__lab.going())) { await sleep(500); return { ok: true, cards }; }
    const cx = await C(page, () => { const c = document.querySelector('.lb-sheet.cxcard .cx-card'); if (!c) return null;
      return { tier: c.getAttribute('data-tier'), hd: (c.querySelector('.cx-hd b') || {}).textContent || '', sub: (c.querySelector('.cx-open.tr') || {}).textContent || '' }; });
    if (cx) { cards.push(cx); if (SHOTS && cx.tier && !page._cxShot) { page._cxShot = true; await shot(page, page._shotName || 'card'); } await jsClick(page, '.lb-sheet.cxcard .lb-btn[data-a=next]'); await sleep(350); continue; }
    if (await page.$('.lb-sheet.seeds [data-a=none]')) { await sleep(300); await jsClick(page, '.lb-sheet.seeds [data-a=none]'); await sleep(300); continue; }
    if (await page.$('.lb-sheet.st-cp [data-cp="1"]')) { await sleep(300); await jsClick(page, '.lb-sheet.st-cp [data-cp="1"]'); await sleep(300); continue; }   // 「從哪裡開始？」：第 1 位
    if (await answerBargain(page)) { await sleep(300); continue; }
    if (await page.$('.lb-dq .nx.on')) await jsClick(page, '.lb-dq');
    await sleep(200);
  }
  return { ok: false, cards };
}
// 一路往下走（打贏、收獎、升級、藏家、攤位），直到 stop(狀態) 回 true；duel＝forceWin
async function driveUntil(page, stop, ms = 90000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    const s = await C(page, () => ({ scr: window.__lab.screen(), pos: window.__lab.run && window.__lab.run.pos, step: window.__lab.run ? window.DipLabEngine.nextStep(window.__lab.run) : null,
      go: !!document.querySelector('.lb-night [data-a=go]'), going: window.__lab.going(), duel: !!(window.__lab.rawDuel() && !window.__lab.rawDuel().over),
      nx: !!document.querySelector('.lb-dq .nx.on'), opt: !!document.querySelector('.lb-dq .lb-dqopt'), one: !!document.querySelector('#panel > .lb-sheet.one [data-i]'),
      cx: !!document.querySelector('.lb-sheet.cxcard'), lv: !!document.querySelector('.lb-sheet.level [data-lv]') && !document.querySelector('.lb-sheet.level.arming') }));
    if (stop(s)) return { ok: true, s };
    if (s.scr === 'night' && s.step === 'stall') { await clearStall(page, { ms: 30000 }); continue; }
    if (s.scr === 'night' && s.go && s.step === 'fight' && !s.going) { await jsClick(page, '.lb-night [data-a=go]'); await sleep(500); continue; }
    if (s.scr === 'duel' && s.duel && !s.going) { await sleep(300); await C(page, () => window.__lab.rawDuel() && window.__lab.forceWin()); await sleep(500); continue; }
    if (s.scr === 'reward') { await passLoot(page, { ms: 8000 }); continue; }
    if (s.cx) { await jsClick(page, '.lb-sheet.cxcard .lb-btn[data-a=next]'); await sleep(350); continue; }
    if (s.lv) { await jsClick(page, '.lb-sheet.level [data-lv]'); await sleep(400); continue; }
    if (s.one) { await sleep(300); await jsClick(page, '#panel > .lb-sheet.one [data-i="0"]'); await sleep(400); continue; }
    if (s.opt) { await sleep(300); await jsClick(page, '.lb-dq .lb-dqopt[data-i="0"]'); await sleep(300); continue; }
    if (s.nx) { await jsClick(page, '.lb-dq'); await sleep(200); continue; }
    if (s.scr === 'end' || s.scr === 'title') return { ok: false, s };
    await sleep(250);
  }
  return { ok: false, s: null };
}
// 在來客畫面：這一位直接輸、不說情 → 結算
async function loseHere(page) {
  await C(page, () => { const r = window.__lab.run; r.retryLeft = 0; r.plea = 0; r.safety = false; });
  if (!(await nightReady(page))) return false;
  await jsClick(page, '.lb-night [data-a=go]');
  const t0 = Date.now();
  while (Date.now() - t0 < 40000) {
    const s = await C(page, () => ({ scr: window.__lab.screen(), duel: !!(window.__lab.rawDuel() && !window.__lab.rawDuel().over), going: window.__lab.going(), nx: !!document.querySelector('.lb-dq .nx.on'), opt: !!document.querySelector('.lb-dq .lb-dqopt') }));
    if (s.scr === 'end') { await sleep(1200); return true; }
    if (s.scr === 'duel' && s.duel && !s.going) { await sleep(300); await C(page, () => window.__lab.forceLose()); await sleep(500); continue; }
    if (s.opt) { await jsClick(page, '.lb-dq .lb-dqopt[data-i="0"]'); await sleep(300); continue; }
    if (s.nx) { await jsClick(page, '.lb-dq'); await sleep(200); continue; }
    await sleep(250);
  }
  return false;
}
// 標題推門那列的狀態
const titleState = page => C(page, () => {
  const R = e => { if (!e) return null; const r = e.getBoundingClientRect(); return { l: Math.round(r.left), r: Math.round(r.right), t: Math.round(r.top), b: Math.round(r.bottom), h: Math.round(r.height), w: Math.round(r.width) }; };
  const row = document.querySelector('.lb-foot.tierrow'), box = document.querySelector('.lb-panel.title .lb-screen');
  const nw = document.querySelector('.lb-foot.tiernew'), cx = document.querySelector('.lb-foot.cxline button');
  return { row: !!row, k: row ? +row.getAttribute('data-k') : null, mid: row ? (row.querySelector('.tr-mid').innerText || '').replace(/\s+/g, ' ').trim() : '',
    dn: row ? { dis: row.querySelector('[data-a=tierDn]').disabled, R: R(row.querySelector('[data-a=tierDn]')) } : null,
    up: row ? { dis: row.querySelector('[data-a=tierUp]').disabled, R: R(row.querySelector('[data-a=tierUp]')) } : null,
    midR: row ? R(row.querySelector('.tr-mid')) : null, nw: nw && getComputedStyle(nw).display !== 'none' ? { t: (nw.querySelector('.t') || {}).textContent || '', more: (nw.querySelector('.tr-more') || {}).textContent || '' } : null,
    cx: R(cx), info: (document.querySelector('.lb-foot.info .t') || document.querySelector('.lb-foot.info') || {}).textContent || '', sh: box && box.scrollHeight, ch: box && box.clientHeight, vw: innerWidth, vh: innerHeight };
});
const sheetState = page => C(page, () => {
  const p = document.querySelector('.lb-modal .pane.trialsheet'); if (!p) return null;
  return { h2: (p.querySelector('h2') || {}).textContent || '', rows: [...p.querySelectorAll('.tr-list li')].map(li => ({ lock: li.classList.contains('lock'), on: li.classList.contains('on'),
    hd: (li.querySelector('.hd b') || {}).textContent || '', tx: (li.querySelector('.tx') || {}).textContent || '', rc: (li.querySelector('.rc') || {}).textContent || '', m: (li.querySelector('.hd .m') || {}).textContent || '',
    ck: (li.querySelector('.hd .ck') || {}).textContent || '', h: Math.round(li.getBoundingClientRect().height) })) };
});

async function runSize(browser, w, h) {
  const size = `${w}x${h}`, dpr = SHOTS ? 2 : 1, tag = `${w}`;

  // ---------------------------------------------------------------- 1 T1 新帳號看不到
  if (want(1)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await openTitle(page, Q());
      const a = await titleState(page);
      await seedSave(page, { career: { xp: 6600 } });
      await openTitle(page, Q()); await sleep(800);
      const x = await TU(page);
      const b = await titleState(page);
      await C(page, () => window.__lab.openPage('career')); await sleep(600);
      const pg = await C(page, () => ({ trl: !!document.querySelector('.lb-page .cx-trl'), tabs: !!document.querySelector('.lb-page .cx-tabs'), tree: !!document.querySelector('.lb-page .tr-page') }));
      await jsClick(page, '.lb-page [data-a=close]'); await sleep(500);
      await jsClick(page, '[data-a=quiet]');
      const dn = await driveToNight(page);
      const r = await C(page, () => ({ tier: window.__lab.run.tier, hasTierKey: 'tier' in window.__lab.run, tag: !!document.querySelector('.lb-night .nh .tg.tier'), top: (document.querySelector('#top .tt') || {}).textContent || '' }));
      const st = await stored(page);
      const ok = !a.row && !b.row && b.info.startsWith(fill(x.summary.best, { n: 34 })) && !/階/.test(b.info) && !pg.trl && !pg.tabs && !pg.tree &&
        dn.ok && r.tier === 0 && !r.tag && !/階/.test(r.top) && st.trial && st.trial.open === 0 && st.trial.pick === 0;
      record(1, size, ok && !errs(page).length, `新存檔 推門那列 ${a.row}；老帳號（open 0）推門那列 ${b.row} 第一行「${b.info}」；樂歷頁 ${J(pg)}；推門 → 來客 ${dn.ok} ${J(r)}；存檔 trial ${J(st.trial)}；${errTx(page)}`);
    } catch (e) { record(1, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 2 T2＋T6b 從第 10 位開、第 0 階 → 打倒第 20 位藏家 → 開了第 1 階
  if (want(2)) {
    const { ctx, page } = await newPage(browser, w, h, { dpr });
    page._shotName = `card-${tag}`;
    try {
      await openTitle(page, Q());
      await seedSave(page, { career: { xp: 6600 }, run: { ace: 'hall', from: 10, set: { hp: 60, maxHp: 60, hpIn: 60, atk: 4, def: 2 } } });
      await openTitle(page, Q());
      const x = await TU(page);
      const r0 = await C(page, () => ({ cpFrom: window.__lab.run.cpFrom, tier: window.__lab.run.tier }));
      await jsClick(page, '[data-a=cont]');
      await nightReady(page);
      await C(page, () => window.__lab.jump(20, { hp: 60, maxHp: 60 }));
      await nightReady(page);
      const to21 = await driveUntil(page, s => s.scr === 'night' && s.pos === 21 && s.go && !s.going && s.step === 'fight');
      const lost = await loseHere(page);
      const st = await stored(page);
      const ent = st.runs[st.runs.length - 1];
      const end = await C(page, () => ({ tp: !!document.querySelector('.lb-sum .tp'), again: (document.querySelector('[data-a=again]') || {}).textContent || '' }));
      await jsClick(page, '[data-a=again]');
      const dn = await driveToNight(page);
      const tc = dn.cards.filter(c => c.tier);
      const r1 = await C(page, () => ({ tier: window.__lab.run.tier, from: window.__lab.run.cpFrom || null }));
      const st2 = await stored(page);
      const hdWant = fill(x.tierOpen, { k: 1, text: TIER1 }), subWant = fill(x.tierOpenSub, { m: '1.1' });
      const ok = r0.cpFrom === 10 && r0.tier === 0 && to21.ok && lost && st.trial.open === 1 && st.trial.best[0] === 21 && st.trial.pick === 0 && ent.reached === 21 && ent.from === 10 && !('tier' in ent) &&
        !end.tp && end.again === x.summary.again && tc.length === 1 && tc[0].tier === '1' && tc[0].hd === hdWant && tc[0].hd === '開了第 1 階：' + TIER1 && tc[0].sub === subWant &&
        dn.ok && r1.tier === 0 && st2.trial.open === 1 && st2.trial.pick === 0;
      record(2, size, ok && !errs(page).length, `開局 ${J(r0)} → 第 21 位 ${to21.ok} → 輸 ${lost}；trial ${J(st.trial)}、runs ${J({ reached: ent.reached, from: ent.from, tier: ent.tier })}；結算 ${J(end)}；` +
        `再挑戰 → 過場卡 ${J(dn.cards)}（要「${hdWant}」「${subWant}」）→ 下一趟 ${J(r1)} trial ${J(st2.trial)}；${errTx(page)}`);
    } catch (e) { record(2, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 3 T3 推門那列 ‹ ›、第一行最遠短版、面板（最擠：有一趟在打＋?apex=1）
  if (want(3)) {
    const { ctx, page } = await newPage(browser, w, h, { dpr });
    const QA = Q('&fast=1&apex=1');
    try {
      await openTitle(page, QA);
      await seedSave(page, { career: { xp: 6600 }, run: { ace: 'hall', set: { idx: 3, pos: 4 } }, trial: { open: 3, pick: 0, best: { 0: 34, 1: 25, 2: 22 } } });
      await openTitle(page, QA); await sleep(1200);
      const x = await TU(page);
      const t0 = await titleState(page);
      const sc0 = await noScroll(page);
      const ups = [];
      for (let i = 0; i < 3; i++) { await tapAt(page, '.lb-foot.tierrow [data-a=tierUp]'); await sleep(350); ups.push(await titleState(page)); }
      const s3 = await stored(page);
      await tapAt(page, '.lb-foot.tierrow [data-a=tierDn]'); await sleep(350);
      const t2 = await titleState(page);
      await shot(page, `title-${tag}`);
      const sc2 = await noScroll(page);
      // 面板
      await tapAt(page, '.lb-foot.tierrow .tr-mid'); await sleep(600);
      const sh = await sheetState(page);
      await shot(page, `tiersheet-${tag}`);
      await C(page, () => { const b = document.querySelector('.lb-modal .pane.trialsheet .tr-list li:nth-child(2) [data-k]'); if (b) b.scrollIntoView({ block: 'center' }); }); await sleep(200);
      await tapAt(page, '.lb-modal .pane.trialsheet .tr-list li:nth-child(2) [data-k]'); await sleep(400);
      const sh1 = await sheetState(page);
      await jsClick(page, '.lb-modal [data-x]'); await sleep(500);
      const t1 = await titleState(page);
      const s1 = await stored(page);
      await openTitle(page, QA); await sleep(1000);
      const tR = await titleState(page);
      const tierN = k => fill(x.tierN, { k });
      const inV = R => R && R.t >= 0 && R.b <= h + 0.5 && R.l >= 0 && R.r <= w + 0.5;
      const big = R => R && R.h >= 44 && R.w >= 40;
      const short = h <= 600;
      // ≤600px：樂歷第二行跟推門那列同一列（上緣一樣、左右不重疊）；>600px：推門那列在樂歷第二行上面、下面那行「這一階：…」
      const lay = s => short ? (s.cx && s.midR && Math.abs(s.cx.t - s.midR.t) <= 1 && s.cx.r <= s.dn.R.l + 0.5 && !s.nw) : (s.cx && s.midR && s.midR.b <= s.cx.t + 0.5 && !!s.nw);
      const okRow = t0.row && t0.k === 0 && t0.dn.dis && !t0.up.dis && t0.mid.includes(x.tierZero) && ups.map(s => s.k).join() === '1,2,3' && ups[2].up.dis && !ups[2].dn.dis &&
        ups[2].mid.includes(tierN(3)) && ups[2].mid.includes(fill(x.tierReward, { m: '1.3' })) && s3.trial.pick === 3 && t2.k === 2 &&
        t0.info.startsWith('最遠 34（第 2 階 22）') && ups[0].info.startsWith('最遠 34（第 1 階 25）') && t2.info.startsWith('最遠 34（第 2 階 22）') &&
        (short || (t2.nw && t2.nw.t === fill(x.tierNew, { text: x.tiers[1].text }) && t2.nw.more === fill(x.tierMore, { n: 1 }) + ' ›')) &&
        [t0, t2].every(s => s.sh - s.ch <= 1 && lay(s) && big(s.dn.R) && big(s.up.R) && big(s.midR) && inV(s.dn.R) && inV(s.up.R) && inV(s.midR) && inV(s.cx)) && scrollOk(sc0) && scrollOk(sc2);
      const rows = sh && sh.rows;
      const okSheet = sh && sh.h2 === x.tierRow && rows.length === 5 && rows[4].lock && rows[4].rc === x.tierHow && rows[4].hd === tierN(4) + '・' + x.tiers[3].name &&
        rows[0].hd === x.tierZero && rows[1].hd === tierN(1) + '・' + x.tiers[0].name && rows[1].tx === TIER1 && rows[1].rc === x.tierPassed + '・' + fill(x.tierFar, { n: 25 }) &&
        rows[2].rc.startsWith(x.tierPassed) && rows[3].rc === x.tierNone && rows[2].on && rows[2].ck === x.tierPicked && rows[1].m === fill(x.tierReward, { m: '1.1' }) &&
        rows.filter(r => !r.lock).every(r => r.h >= 44) && sh1 && sh1.rows[1].on && !sh1.rows[2].on;
      const okAfter = t1.k === 1 && s1.trial.pick === 1 && tR.k === 1 && tR.mid.includes(tierN(1));
      record(3, size, okRow && okSheet && okAfter && !errs(page).length, `起 ${J(t0)} ${J(sc0)}；› ×3 ${J(ups.map(s => [s.k, s.mid, s.up.dis, s.info]))} 存 pick ${s3.trial.pick}；‹ ${J(t2)}；` +
        `面板 ${J(sh)} → 點第 1 階 ${J(sh1 && sh1.rows.map(r => r.on))} → 標題 ${t1.k} 存 ${s1.trial.pick} 重新整理 ${tR.k}；${errTx(page)}`);
    } catch (e) { record(3, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 4 T4＋T5 第 2 階那一趟
  if (want(4)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await openTitle(page, Q());
      await seedSave(page, { career: { xp: 6600 }, trial: { open: 3, pick: 2, best: { 0: 34, 1: 25, 2: 22 } } });
      await openTitle(page, Q()); await sleep(800);
      const x = await TU(page);
      await jsClick(page, '[data-a=quiet]');
      const dn = await driveToNight(page);
      const n = await C(page, () => ({ tier: window.__lab.run.tier, tag: (document.querySelector('.lb-night .nh .tg.tier') || {}).textContent || '', nh: (document.querySelector('.lb-night .nh') || {}).textContent || '' }));
      await jsClick(page, '.lb-night [data-a=go]');
      const d = await waitDuel(page);
      const top = await C(page, () => (document.querySelector('#top .tt') || {}).textContent || '');
      await C(page, () => { const r = window.__lab.run; r.retryLeft = 0; r.plea = 0; r.safety = false; window.__lab.forceLose(); });
      let ended = false; for (let g = 0; g < 80 && !ended; g++) { ended = await C(page, () => window.__lab.screen() === 'end'); if (!ended) { if (await page.$('.lb-dq .nx.on')) await jsClick(page, '.lb-dq'); await sleep(250); } }
      await sleep(1200);
      const e = await C(page, () => { const li = document.querySelector('.lb-sum li'); const tp = li && li.querySelector('.tp'); const r1 = tp && tp.getBoundingClientRect(), r2 = li && li.querySelector('b').getBoundingClientRect();
        return { li: li ? li.textContent : '', tp: tp ? tp.textContent : '', same: !!(r1 && r2 && Math.abs((r1.top + r1.bottom) / 2 - (r2.top + r2.bottom) / 2) < 8), again: (document.querySelector('[data-a=again]') || {}).textContent || '' }; });
      const sc = await noScroll(page);
      const box = await C(page, () => { const s = document.querySelector('.lb-screen.end .lb-scroll'); return s ? s.scrollHeight - s.clientHeight : 0; });
      const st = await stored(page), ent = st.runs[st.runs.length - 1], g = ent.gain || {};
      await jsClick(page, '[data-a=cxp]'); await sleep(500);
      const parts = await C(page, () => [...document.querySelectorAll('.cx-parts li')].map(li => li.textContent));
      const tierTag = fill(x.tierTag, { k: 2 });
      const ok = dn.ok && n.tier === 2 && n.tag === tierTag && d && top.includes(tierTag) && ended && e.tp === fill(x.career.tierPre, { k: 2 }) && e.same && e.li.startsWith(e.tp + '走到') &&
        e.again === x.summary.again + '・' + tierTag && scrollOk(sc) && box <= 1 && ent.tier === 2 && st.trial.best[2] === Math.max(22, ent.reached) && st.trial.open === 3 && st.trial.pick === 2 &&
        g.mul === 1.2 && g.total === Math.round((g.base + g.record + g.route) * 1.2) && parts.includes(fill(x.career.partTier, { m: 1.2, k: 2 }));
      record(4, size, ok && !errs(page).length, `來客 ${dn.ok} ${J(n)}；頂欄「${top}」；結算 ${J(e)} ${J(sc)} 捲 ${box}；runs ${J({ tier: ent.tier, reached: ent.reached })} trial ${J(st.trial)}；gain ${J(g)} 明細 ${J(parts)}；${errTx(page)}`);
    } catch (e) { record(4, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 5 T6a 中繼點從第 50 位開：走到第 60 位不開下一階
  if (want(5)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await openTitle(page, Q());
      await seedSave(page, { career: { xp: 6600 }, run: { ace: 'hall', from: 50, tier: 1 }, trial: { open: 1, pick: 1, best: { 0: 34 } }, best: { far: 60, checkpoints: [10, 20, 30, 40, 50], bestStreak: 6 } });
      await openTitle(page, Q());
      const r0 = await C(page, () => ({ cpFrom: window.__lab.run.cpFrom, tier: window.__lab.run.tier }));
      await jsClick(page, '[data-a=cont]');
      await nightReady(page);
      await C(page, () => window.__lab.jump(60));
      const lost = await loseHere(page);
      const st = await stored(page), ent = st.runs[st.runs.length - 1];
      const ok = r0.cpFrom === 50 && r0.tier === 1 && lost && ent.reached === 60 && ent.from === 50 && ent.tier === 1 && st.trial.open === 1 && st.trial.best[1] === 60;
      record(5, size, ok && !errs(page).length, `開局 ${J(r0)} → 第 60 位輸 ${lost}；runs ${J({ reached: ent.reached, from: ent.from, tier: ent.tier })}；trial ${J(st.trial)}（open 要還是 1）；${errTx(page)}`);
    } catch (e) { record(5, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 6 派樹（?fac=1）點／退
  if (want(6)) {
    const { ctx, page } = await newPage(browser, w, h, { dpr });
    const QF = Q('&fast=1&fac=1');
    try {
      await openTitle(page, QF);
      await seedSave(page, { career: { xp: 6600, prof: { hall: 7500, pearl: 0, heresy: 0 } } });
      await openTitle(page, QF); await sleep(800);
      const x = await TU(page);
      await tapAt(page, '.lb-foot.cxline button'); await sleep(700);
      const tabs = await C(page, () => [...document.querySelectorAll('.lb-page .cx-tabs [data-tab]')].map(b => ({ t: b.textContent, on: b.classList.contains('on'), h: Math.round(b.getBoundingClientRect().height) })));
      await tapAt(page, '.lb-page .cx-tabs [data-tab=tree]'); await sleep(500);
      const tree = page2 => C(page2, () => {
        const pg = document.querySelector('.lb-page .tr-page'); if (!pg) return null;
        return { ace: pg.getAttribute('data-ace'), head: (pg.querySelector('.cx-head .lv') || {}).textContent || '', pts: (pg.querySelector('.cx-head .pts') || {}).textContent || '',
          nodes: [...pg.querySelectorAll('.tr-node')].map(li => ({ id: li.getAttribute('data-id'), nm: (li.querySelector('.nm b') || {}).textContent || '', st: (li.querySelector('.st') || {}).textContent || '',
            now: (li.querySelector('.now') || {}).textContent || '', buy: li.querySelector('[data-tbuy]') ? !li.querySelector('[data-tbuy]').disabled : null, sell: li.querySelector('[data-tsell]') ? !li.querySelector('[data-tsell]').disabled : null,
            open: li.classList.contains('open'), ds: getComputedStyle(li.querySelector('.ds')).display !== 'none' ? li.querySelector('.ds').textContent : '', h: Math.round(li.getBoundingClientRect().height),
            pm: [...li.querySelectorAll('.pm .lb-btn')].map(b => { const r = b.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; }) })),
          tree: JSON.parse(localStorage.getItem('dipGameLab_v1')).career.tree.hall };
      });
      const t0 = await tree(page);
      await shot(page, `tree-${tag}`);
      const tap = async sel => { await C(page, s => { const e = document.querySelector(s); if (e) e.scrollIntoView({ block: 'center' }); }, sel); await sleep(150); await tapAt(page, sel); await sleep(400); };
      const N = id => `.lb-page .tr-node[data-id="${id}"]`;
      await tap(N('a1') + ' [data-tbuy]'); const t1 = await tree(page);
      await tap(N('a2') + ' [data-tbuy]'); const t2 = await tree(page);
      await tap(N('a3') + ' [data-tbuy]'); const t3 = await tree(page);
      await C(page, () => { window.__toasts = []; const o = new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.classList && n.classList.contains('lb-toast')) window.__toasts.push(n.textContent); }))); o.observe(document.body, { childList: true, subtree: true }); });
      await tap(N('a1') + ' [data-tsell]'); await sleep(200);
      const toasts = await C(page, () => (window.__toasts || []).slice()); const t4 = await tree(page);
      await tap(N('a3') + ' [data-tsell]'); const t5 = await tree(page);
      await tap(N('a1') + ' .tx'); const t6 = await tree(page);
      await shot(page, `tree-open-${tag}`);
      await tap('.lb-page [data-a=trespec]'); const t7 = await tree(page);
      await tap(N('a1') + ' [data-tbuy]'); await tap(N('a2') + ' [data-tbuy]'); const t8 = await tree(page);
      await jsClick(page, '.lb-page [data-a=close]'); await sleep(600);
      await jsClick(page, '[data-a=quiet]');
      const dn = await driveToNight(page);
      const tal = await C(page, () => window.__lab.run.fac && window.__lab.run.fac.tal);
      const nd = (t, id) => t.nodes.filter(n => n.id === id)[0];
      const pts = n => fill(x.F.treePoints, { n });
      const okTabs = tabs.length === 2 && tabs[0].t.startsWith(x.career.tabTalent) && tabs[1].t.startsWith(x.F.treeTab) && tabs[0].on && tabs.every(b => b.h >= 44);
      const ok0 = t0 && t0.ace === 'hall' && t0.head === fill(x.F.treeOf, { title: x.aceTitle.hall }) && t0.pts === pts(5) && t0.nodes.length === 9 &&
        ['c1', 'c2', 'c3'].every(id => nd(t0, id).buy === null && nd(t0, id).sell === null) && nd(t0, 'c1').st === x.F.treeSoon && nd(t0, 'c2').st === x.F.treeSoonApex &&
        nd(t0, 'a2').st.includes(fill(x.F.treeNeed, { name: nd(t0, 'a1').nm })) && nd(t0, 'a2').buy === false && nd(t0, 'a1').buy === true && nd(t0, 'a1').sell === false && nd(t0, 'a1').st === fill(x.F.treeCost, { n: 1 }) &&
        t0.nodes.every(n => n.h >= 44 && n.pm.every(p => p[0] >= 44 && p[1] >= 44)) && !nd(t0, 'a1').ds;
      const okBuy = t1.pts === pts(4) && J(t1.tree) === J({ a1: 1 }) && t2.pts === pts(2) && J(t2.tree) === J({ a1: 1, a2: 1 }) && t3.pts === pts(0) && J(t3.tree) === J({ a1: 1, a2: 1, a3: 1 }) &&
        nd(t3, 'a3').buy === false && nd(t3, 'a3').now === fill(x.F.treeLv, { k: 1, max: 3 }) &&
        toasts.includes(fill(x.F.treeDep, { name: nd(t0, 'a2').nm })) && J(t4.tree) === J(t3.tree) && J(t5.tree) === J({ a1: 1, a2: 1 }) &&
        nd(t6, 'a1').open && nd(t6, 'a1').ds.includes('本派格先出「初版」。') && nd(t6, 'a1').ds.includes('扣整張那手，再多扣 1。') &&
        J(t7.tree) === '{}' && t7.pts === pts(5) && J(t8.tree) === J({ a1: 1, a2: 1 }) && dn.ok && J(tal) === J({ a1: 1, a2: 1 });
      record(6, size, okTabs && ok0 && okBuy && !errs(page).length, `分頁 ${J(tabs)}；派樹 ${J(t0 && { head: t0.head, pts: t0.pts, nodes: t0.nodes.map(n => [n.id, n.nm, n.st, n.buy, n.sell, n.h]) })}；` +
        `點 ${[t1, t2, t3].map(t => t.pts + J(t.tree)).join(' → ')}；退先聲奪人 吐司 ${J(toasts)} 樹 ${J(t4.tree)}；退口碑 ${J(t5.tree)}；展開 ${J(nd(t6, 'a1').ds)}；重配 ${J(t7.tree)} ${t7.pts}；再點 ${J(t8.tree)} → 推門 tal ${J(tal)}；${errTx(page)}`);
    } catch (e) { record(6, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 7 挑著學：升級面板 5 顆
  if (want(7)) {
    const { ctx, page } = await newPage(browser, w, h, { dpr });
    const QF = Q('&fast=1&fac=1');
    try {
      await openTitle(page, QF);
      await seedSave(page, { career: { xp: 6600, prof: { hall: 7500, pearl: 0, heresy: 0 }, tree: { hall: { a1: 1, a2: 1 }, pearl: {}, heresy: {} } }, run: { ace: 'hall', fac: true, tal: { a1: 1, a2: 1 }, set: { idx: 1, pos: 2 } } });
      await openTitle(page, QF);
      await jsClick(page, '[data-a=cont]');
      await nightReady(page);
      // Lv4、差 1 經驗升級（E.xpNeed 照現在的曲線）
      await C(page, () => { const r = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent; r.level = 4; const T = E.trialCfg(Cn, r.tier); r.xp = Math.max(0, E.xpNeed(T, 4) - 1); });
      await jsClick(page, '.lb-night [data-a=go]');
      await waitDuel(page);
      await C(page, () => window.__lab.forceWin());
      // 戰利品列「不收」→ 升級面板
      await page.waitForFunction(() => !!document.querySelector('#panel .lb-sheet.reward [data-a=skip]') || !!document.querySelector('.lb-sheet.level [data-lv]'), null, { timeout: 20000 }).catch(() => {});
      if (await page.$('#panel .lb-sheet.reward [data-a=skip]')) { await page.waitForFunction(() => { const L = window.DipLabLoot && window.DipLabLoot.state(); return !L || (L.open && L.flipped.every(Boolean) && !L.busy); }, null, { timeout: 10000 }).catch(() => {}); await tapReady(page, '#panel .lb-sheet.reward [data-a=skip]'); }
      const lvOk = await page.waitForFunction(() => !!document.querySelector('.lb-sheet.level [data-lv]') && !document.querySelector('.lb-sheet.level.arming'), null, { timeout: 15000 }).then(() => true, () => false);
      await sleep(600);
      const P = await C(page, () => {
        const s = document.querySelector('.lb-sheet.level'), r = window.__lab.run;
        const bs = [...s.querySelectorAll('[data-lv]')].map(b => { const R = b.getBoundingClientRect(); return { lv: b.getAttribute('data-lv'), id: b.getAttribute('data-id'), h: Math.round(R.height), t: Math.round(R.top), b: Math.round(R.bottom) }; });
        return { n: bs.length, bs, offer: (r.pending && r.pending.offer || []).map(o => o.pick + (o.id ? ':' + o.id : '')), lvl: r.pending && r.pending.level, sh: s.scrollHeight - s.clientHeight, cls: s.querySelector('.lb-opts').className, txt: s.textContent };
      });
      await shot(page, `level5-${tag}`);
      const facs = P.bs.filter(b => b.lv === 'fac');
      const ok = lvOk && P.lvl === 5 && P.n === 5 && facs.length === 2 && facs[0].id !== facs[1].id && facs[0].id === 'h_first' && /n5/.test(P.cls) && P.sh <= 1 &&
        P.bs.every(b => b.h >= 44 && b.t >= 0 && b.b <= h + 0.5) && !/undefined|NaN/.test(P.txt);
      record(7, size, ok && !errs(page).length, `升級面板 ${lvOk} ${J(P)}；${errTx(page)}`);
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
