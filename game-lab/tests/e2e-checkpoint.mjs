// game-lab/tests/e2e-checkpoint.mjs：第 C 波 中繼點開局、新手保底、存檔升 v8（SPEC-C §2.4、§4.7、§4.8、§11.2）端對端測試。測試棒。
//   需要靜態伺服器：cd dip-vinyl-shop && python3 -m http.server 8765
//   node game-lab/tests/e2e-checkpoint.mjs
//   環境變數（見 e2e-lib.mjs）：LAB_BASE／LAB_URL；LAB_SIZES（這支預設 390x664,375x548）；CP_ONLY＝只跑這幾項（例 1,3）；
//     CP_OLD_REF＝「舊版頁面」用哪一版（git ref；預設 6bd8586d6＝第 C 波開工時的 main，存檔 v7）；CP_OLD_ROOT＝直接給舊版的 repo 根（有 game-lab/、dip-character.js、dip-player.js）
//
// 每個尺寸：
//   1  中繼點開局：存檔塞 best.checkpoints [10, 12]（12 不是中繼點，載入時濾掉）→ 推門 →「從哪裡開始？」只列第 1、10 位 → 選第 10 位 →
//      選秀「補到第 10 位：挑一張唱片 1/2」→ 第 1 題選完重新整理：還在選秀（第 2 題）→ 撿盤 2＋升級 4 題（標題 1/4…4/4；每題三格固定 品味→底氣→聲望上限，第 I 波 SPEC-I §7.1）→ 特價箱 →
//      第 10 位（傳說藏家）、等級 5、換王牌鈕在（點老闆）→ 打贏 → 寶箱 → 攤位沒有市集、錄音室（開局那一位不算中繼點攤位）→ 第 11 位輸 → 結算「這一趟從第 10 位開始」、runs 記 from 10
//   2  新手保底：新帳號（沒有 runs）第 1 位輸 → 老闆「第一位不算，再來一次。」＋一顆「再來一次」（沒有說情選單、不扣說情）→ 重打；再輸＝照舊說情選單
//   3  舊存檔（舊版頁面＝CP_OLD_REF，同一個網域 /oldlab/ 底下）：v7 停在舊的挑唱片面板 → 新版載入：升 v8、.bak7＝原字串、run 還在、照舊路（「都不要」）走完那一個獎勵 → 來客 → 開打；
//      v7 停在來客畫面 → 新版：同一位、照樣開打；v8 存檔給舊版頁面讀：唯讀、推門也不覆寫
//   4  卡 id 不在卡池（4.3）：站的貨、寄賣、撿來的、戰利品列裡塞一個不存在的 id → 載入不炸、那張濾掉、照樣做完
//   每項最後看主控台 0 錯誤。任何 FAIL → exit 1。
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { launch, newPage, SIZES as SIZES0, record, results, sleep, Q, URL0, jsClick, waitScreen, duelReady, tapAt, tapReady, seedRun, seededContinue, openTitle, advanceUntil, answerBargain,
  passLoot, stallState, clearStall, resolveHands } from './e2e-lib.mjs';

const SIZES = process.env.LAB_SIZES ? SIZES0 : [[390, 664], [375, 548]];
const ONLY = (process.env.CP_ONLY || '').split(',').filter(Boolean).map(Number);
const want = n => !ONLY.length || ONLY.includes(n);
const C = (page, f, a) => page.evaluate(f, a);
const errs = page => (page._errors || []).filter(e => !/favicon/.test(e));
const errTxt = page => `錯誤 ${errs(page).length}${errs(page).length ? '：' + errs(page).slice(0, 2).join(' / ') : ''}`;
const fill = (s, o) => String(s).replace(/\$?\{(\w+)\}/g, (m, k) => (o[k] != null ? (m[0] === '$' ? '$' : '') + o[k] : m));
const UI = page => C(page, () => Object.assign({}, window.DipLabContent.waveC.ui, { st: window.DipLabContent.waveC.stations }));
const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..', '..');
const OLD_REF = process.env.CP_OLD_REF || '6bd8586d6';

// 舊版頁面（第 C 波以前，存檔 v7）：從 git 拿那一版的 game-lab＋兩支共用 js 到暫存資料夾；同一個網域 /oldlab/ 底下由 Playwright 直接從磁碟回應（localStorage 跟新版共用）
function oldRoot() {
  if (process.env.CP_OLD_ROOT) return path.resolve(process.env.CP_OLD_ROOT);
  const dir = path.join(os.tmpdir(), 'dip-oldlab-' + OLD_REF.replace(/[^\w.-]/g, '_'));
  if (fs.existsSync(path.join(dir, 'game-lab', 'index.html'))) return dir;
  fs.mkdirSync(dir, { recursive: true });
  execSync(`git -C "${REPO}" archive ${OLD_REF} game-lab dip-character.js dip-player.js | tar -x -C "${dir}"`, { stdio: ['ignore', 'ignore', 'pipe'] });
  return dir;
}
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
async function routeOld(ctx, root) {
  const origin = new URL(URL0).origin;
  await ctx.route(u => u.origin === origin && u.pathname.startsWith('/oldlab/'), async route => {
    const p = decodeURIComponent(new URL(route.request().url()).pathname).slice('/oldlab'.length), f = path.resolve(root, '.' + p);
    if (!f.startsWith(root + path.sep)) return route.fulfill({ status: 403, body: '' });
    try { return route.fulfill({ status: 200, contentType: MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', body: fs.readFileSync(f) }); } catch (_) { return route.fulfill({ status: 404, body: '' }); }
  });
}
const oldQ = (extra = '&fast=1') => `${new URL(URL0).origin}/oldlab/game-lab/index.html?debug=1&seed=20261106${extra}`;

// 標題 → 推門（安靜）→ 一路點對白 ▼ 直到 cond 成立（挑種子面板出來就「先不挑」）
async function pushUntil(page, cond, ms = 30000) {
  await jsClick(page, '[data-a=quiet]');
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    if (await C(page, cond)) return true;
    if (await page.$('.lb-sheet.seeds [data-a=none]')) { await jsClick(page, '.lb-sheet.seeds [data-a=none]'); await sleep(300); continue; }
    await C(page, () => { const nx = document.querySelector('.lb-dq .nx.on'); if (nx) document.querySelector('.lb-dq').click(); });
    await sleep(250);
  }
  return false;
}
// 存檔：上一趟打到第 far 位、走過的中繼點 cps；runs 一筆（新手保底看上一趟有沒有到第 10 位）；ownAll＝三派都解鎖（換王牌鈕）
async function oldSave(page, o) {
  await openTitle(page, Q('&fast=1'));
  await seedRun(page, { ace: 'hall', idx: 0 });
  await C(page, o => {
    const s = JSON.parse(localStorage.getItem('dipGameLab_v1')), Cn = window.DipLabContent;
    s.run = null; s.prologueDone = true; s.best = { far: o.far, checkpoints: o.cps, bestStreak: 3 };
    s.runs = o.runs ? [{ seedKey: '20261105', runNo: 1, ace: 'hall', result: 'dead', reached: o.far, bestStreak: 3, taken: 2, wins: 5 }] : [];
    if (o.ownAll) { s.v = 6; Object.values(Cn.aces).forEach(id => { s.shelf[id] = { at: '20261105#1', seen: true, own: true, src: 'boss' }; }); (Cn.gifts.hall || []).forEach(id => { s.shelf[id] = Object.assign(s.shelf[id] || { at: '20261105#1', seen: true }, { own: true, src: 'gift' }); }); }
    localStorage.setItem('dipGameLab_v1', JSON.stringify(s));
  }, o);
  await openTitle(page, Q('&fast=1'));
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
// 輸掉這一位（loseNext；o.noRetry＝說情也用掉）→ 回 true＝到了結算
async function loseHere(page, noRetry) {
  await C(page, n => window.__lab.loseNext(1, n ? { noRetry: true } : undefined), noRetry);
  await page.waitForSelector('[data-a=go]', { timeout: 15000 });
  await jsClick(page, '[data-a=go]');
  await duelReady(page, 25000);
  await C(page, () => window.DipLabDuel.play({ i: 0, attr: 'c' }));
}

async function runSize(browser, w, h) {
  const size = `${w}x${h}`;
  const QF = Q('&fast=1');

  // ---------------------------------------------------------------- 1 中繼點開局
  if (want(1)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await oldSave(page, { far: 14, cps: [10, 12], runs: true, ownAll: true });
      const x = await UI(page);
      const cps = await C(page, () => window.__lab.save.best.checkpoints.slice());
      const okCp = await pushUntil(page, () => !!document.querySelector('.lb-sheet.st-cp [data-cp]'));
      await sleep(400);
      const opts = await C(page, () => [...document.querySelectorAll('.lb-sheet.st-cp [data-cp]')].map(b => [b.getAttribute('data-cp'), b.textContent]));
      const cpTitle = await C(page, () => (document.querySelector('.lb-sheet.st-cp h3') || {}).textContent || '');
      await tapReady(page, '.lb-sheet.st-cp [data-cp="10"]');
      await page.waitForSelector('.lb-sheet.st-draft [data-dpick]', { timeout: 10000 }).catch(() => {});
      await sleep(400);
      const d1 = await C(page, () => { const R = window.__lab.run, p = R.pending; return { type: p && p.type, k: p && p.k, m: p && p.m, ck: p && p.ck, pos: R.pos, from: R.cpFrom, h3: (document.querySelector('.lb-sheet.st-draft h3') || {}).textContent || '', top: (document.querySelector('#top .tt') || {}).textContent || '' }; });
      const pick1 = await C(page, () => document.querySelector('.lb-sheet.st-draft [data-dpick]').getAttribute('data-dpick'));
      await tapReady(page, '.lb-sheet.st-draft [data-dpick]'); await sleep(700);
      // 選秀第 2 題重新整理：還在選秀
      await openTitle(page, QF); await jsClick(page, '[data-a=cont]');
      await page.waitForSelector('.lb-sheet.st-draft [data-dpick]', { timeout: 12000 }).catch(() => {});
      await sleep(400);
      const d2 = await C(page, () => { const p = window.__lab.run && window.__lab.run.pending; return { type: p && p.type, ck: p && p.ck, h3: (document.querySelector('.lb-sheet.st-draft h3') || {}).textContent || '', top: (document.querySelector('#top .tt') || {}).textContent || '' }; });
      const titles = [d2.h3], orders = [];
      for (let g = 0; g < 12; g++) {
        const s = await C(page, () => document.querySelector('.lb-sheet.st-draft [data-dpick]') ? 'card' : (document.querySelector('.lb-sheet.level [data-lv]') && !document.querySelector('.lb-sheet.level.arming')) ? 'level' : null);
        if (!s) { if (await C(page, () => window.__lab.run.pending && window.__lab.run.pending.type === 'draft')) { await sleep(300); continue; } break; }
        if (s === 'level') titles.push(await C(page, () => document.querySelector('.lb-sheet.level h3').textContent));
        if (s === 'level') orders.push(await C(page, () => [...document.querySelectorAll('.lb-sheet.level [data-lv]')].map(b => b.dataset.lv).join()));   // 第 I 波 SPEC-I §7.1：選秀的升級題也固定 品味→底氣→聲望上限
        await tapReady(page, s === 'card' ? '.lb-sheet.st-draft [data-dpick]' : '.lb-sheet.level [data-lv]');
        await sleep(700);
      }
      // 特價箱 → 來客（第 10 位）
      const t0 = Date.now();
      while (Date.now() - t0 < 30000 && (await C(page, () => window.__lab.screen())) !== 'night') {
        if (await page.$('.ec-drawer [data-a=tog]')) { await sleep(300); await answerBargain(page); await sleep(500); continue; }
        await C(page, () => { const nx = document.querySelector('.lb-dq .nx.on'); if (nx) document.querySelector('.lb-dq').click(); });
        await sleep(250);
      }
      await sleep(1200);
      const n10 = await C(page, () => { const R = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent; return { pos: R.pos, from: R.cpFrom, level: R.level, boss: Cn.enemies[R.order[R.idx]].boss === true, swap: E.canSwitchAce(R, Cn), safety: !!R.safety, bargain: !!(R.shop && R.shop.bargainPicked) }; });
      const found1 = await C(page, id => (window.__lab.run.found || []).includes(id), pick1);
      await C(page, () => window.__lab.stageAction('talk:owner')); await sleep(600);
      const swapBtn = await C(page, () => { const b = document.querySelector('.lb-sheet.owner [data-a=swap]'); return !!b && !b.disabled; });
      await C(page, () => { const b = document.querySelector('.lb-sheet.owner [data-a=close]'); if (b) b.click(); }); await sleep(300);
      // 打贏第 10 位 → 寶箱 → 攤位（不是中繼點攤位：沒有市集、錄音室）
      await beatBoss(page);
      await passLoot(page, {});
      await page.waitForSelector('.st-pick .st-row', { timeout: 15000 }).catch(() => {});
      await sleep(500);
      const st = await stallState(page);
      await clearStall(page);
      // 第 11 位輸 → 結算「這一趟從第 10 位開始」
      await loseHere(page, true);
      const end = await advanceUntil(page, () => window.__lab.screen() === 'end', null, 40000);
      await sleep(1200);
      const e = await C(page, () => { const S = window.__lab.save, r = S.runs[S.runs.length - 1] || {}; return { txt: (document.querySelector('.lb-screen.end') || {}).textContent || '', from: r.from, lexp: r.lexp || null, far: S.best.far }; });
      const wantTitles = [fill(x.draftCard, { n: 10, i: 2, k: 2 })].concat([1, 2, 3, 4].map(i => fill(x.draftLevel, { n: 10, i, m: 4 })));
      const ok = JSON.stringify(cps) === '[10]' && okCp && cpTitle === x.cpTitle && JSON.stringify(opts) === JSON.stringify([['1', x.cpFirst], ['10', fill(x.cpAt, { n: 10 })]]) &&
        d1.type === 'draft' && d1.k === 2 && d1.m === 4 && d1.from === 10 && d1.h3 === fill(x.draftCard, { n: 10, i: 1, k: 2 }) &&
        d2.type === 'draft' && d2.ck === 1 && JSON.stringify(titles) === JSON.stringify(wantTitles) && orders.length === 4 && orders.every(o => o === 'atk,def,hp') &&
        n10.pos === 10 && n10.from === 10 && n10.boss && n10.swap && swapBtn && found1 && !n10.safety && n10.bargain &&
        st.stall && st.p && !st.p.cp && !st.p.q.includes('market') && !(st.p.post || []).includes('market') && !(st.p.post || []).includes('studio') &&
        end && e.txt.indexOf(fill(x.cpFrom, { n: 10 })) >= 0 && e.from === 10 && e.lexp && e.lexp.base > 0;
      record(1, size, ok && !errs(page).length, `checkpoints ${JSON.stringify(cps)}；「${cpTitle}」${JSON.stringify(opts)}；選秀 ${JSON.stringify(d1)}；重新整理 ${JSON.stringify(d2)}；題目 ${JSON.stringify(titles)}；升級題順序 ${JSON.stringify(orders)}；` +
        `第 10 位 ${JSON.stringify(n10)} 撿的算撿來的 ${found1}、換王牌鈕 ${swapBtn}；之後攤位 cp ${st.p && st.p.cp} post ${JSON.stringify(st.p && st.p.post)}；結算 ${end} from ${e.from} lexp ${JSON.stringify(e.lexp)}；${errTxt(page)}`);
    } catch (e) { record(1, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 2 新手保底
  if (want(2)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await oldSave(page, { far: 0, cps: [], runs: false });
      const x = await UI(page);
      await pushUntil(page, () => !!document.querySelector('.ec-drawer [data-a=tog]') || window.__lab.screen() === 'night', 30000);
      for (let g = 0; g < 60 && (await C(page, () => window.__lab.screen())) !== 'night'; g++) {
        if (await page.$('.ec-drawer [data-a=tog]')) { await sleep(300); await answerBargain(page); }
        await C(page, () => { const nx = document.querySelector('.lb-dq .nx.on'); if (nx) document.querySelector('.lb-dq').click(); });
        await sleep(300);
      }
      await waitScreen(page, 'night', 15000); await sleep(800);
      const s0 = await C(page, () => ({ safety: window.__lab.run.safety, retry: window.__lab.run.retryLeft, pos: window.__lab.run.pos }));
      await loseHere(page, false);
      const got = await advanceUntil(page, () => !!document.querySelector('.lb-dq.hasmenu .lb-dqopt'), null, 40000);
      await sleep(500);
      const m = await C(page, () => ({ opts: [...document.querySelectorAll('.lb-dq .lb-dqopt')].map(b => b.textContent.trim()), tx: (document.querySelector('.lb-dq .tx') || {}).textContent || '', retry: window.__lab.run.retryLeft, p: window.__lab.run.pending && { type: window.__lab.run.pending.type, safety: !!window.__lab.run.pending.safety } }));
      await tapReady(page, '.lb-dq .lb-dqopt');
      const again = await waitScreen(page, 'duel', 15000);
      await duelReady(page, 20000);
      const a = await C(page, () => ({ retry: window.__lab.run.retryLeft, safety: !!window.__lab.run.safety, pos: window.__lab.run.pos }));
      // 再輸一次：照舊說情選單（兩顆）
      await C(page, () => window.__lab.loseNext(1));
      await C(page, () => window.DipLabDuel.play({ i: 0, attr: 'c' }));
      await advanceUntil(page, () => !!document.querySelector('.lb-dq.hasmenu .lb-dqopt'), null, 40000);
      await sleep(400);
      const m2 = await C(page, () => ({ opts: [...document.querySelectorAll('.lb-dq .lb-dqopt')].map(b => b.textContent.trim()), tx: (document.querySelector('.lb-dq .tx') || {}).textContent || '' }));
      const ok = s0.safety && s0.pos === 1 && got && m.opts.length === 1 && m.opts[0].indexOf(x.safetyBtn) >= 0 && m.tx.indexOf(x.safety) >= 0 && m.retry === s0.retry && m.p && m.p.safety &&
        again && a.retry === s0.retry && a.pos === 1 && m2.opts.length === 2 && m2.tx.indexOf(x.safety) < 0;
      record(2, size, ok && !errs(page).length, `新帳號 ${JSON.stringify(s0)}；第 1 位輸 →「${m.tx}」鈕 ${JSON.stringify(m.opts)}、說情 ${s0.retry}→${m.retry}；再來一次 → ${again} ${JSON.stringify(a)}；再輸 → ${JSON.stringify(m2.opts)}「${m2.tx}」；${errTxt(page)}`);
    } catch (e) { record(2, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 3 舊存檔（v7 ↔ v8）
  if (want(3)) {
    let root = null;
    try { root = oldRoot(); } catch (e) { console.log(`SKIP  #3 [${size}] 拿不到舊版（${OLD_REF}）：${e.message.split('\n')[0]}`); }
    if (root) {
      const { ctx, page } = await newPage(browser, w, h);
      try {
        await routeOld(ctx, root);
        const v = { };
        // (a) 舊版：停在挑唱片面板（舊形狀的 pending reward）
        await openTitle(page, oldQ());
        await seedRun(page, { ace: 'hall', idx: 0, autoNext: true });
        await openTitle(page, oldQ()); await jsClick(page, '[data-a=cont]');
        await waitScreen(page, 'night', 20000); await sleep(600);
        await jsClick(page, '[data-a=go]'); await duelReady(page, 25000);
        await resolveHands(page, 1, 'thoughtful');            // 舊版的獎勵候選＝他這一場丟過的：先打一手
        await sleep(300);
        await C(page, () => window.__lab.forceWin());
        await waitScreen(page, 'reward', 15000); await sleep(1500);
        const raw7 = await C(page, () => localStorage.getItem('dipGameLab_v1'));
        const o7 = JSON.parse(raw7);
        v.a7 = { v: o7.v, type: o7.run && o7.run.pending && o7.run.pending.type, kind: o7.run && o7.run.pending && o7.run.pending.kind || null };
        // 新版載入
        await openTitle(page, QF);
        const n8 = await C(page, () => { const raw = localStorage.getItem('dipGameLab_v1'), s = JSON.parse(raw); return { v: s.v, bak: localStorage.getItem('dipGameLab_v1.bak7'), run: !!s.run, type: s.run && s.run.pending && s.run.pending.type, cont: !!document.querySelector('[data-a=cont]') }; });
        await jsClick(page, '[data-a=cont]');
        await waitScreen(page, 'reward', 15000);
        await page.waitForSelector('.lb-sheet.reward [data-a=skip]', { timeout: 10000 }).catch(() => {});
        await sleep(500);
        const sh = await C(page, () => ({ lt: !!document.querySelector('.lb-sheet.reward.lt-sheet'), skip: (document.querySelector('.lb-sheet.reward [data-a=skip]') || {}).textContent || '' }));
        const pl = await passLoot(page, {});
        await sleep(500);
        const go1 = await page.$('[data-a=go]');
        if (go1) { await jsClick(page, '[data-a=go]'); }
        const duel1 = await duelReady(page, 25000);
        const raw8 = await C(page, () => localStorage.getItem('dipGameLab_v1'));
        const okA = v.a7.v === 7 && v.a7.type === 'reward' && !v.a7.kind && n8.v === 8 && n8.bak === raw7 && n8.run && n8.type === 'reward' && n8.cont && !sh.lt && sh.skip === '都不要' && pl.ok && pl.screen === 'night' && !!go1 && duel1;
        // (b) 舊版停在來客畫面 → 新版：同一位、照樣開打
        await C(page, () => { localStorage.removeItem('dipGameLab_v1'); localStorage.removeItem('dipGameLab_v1.bak7'); });
        await openTitle(page, oldQ());
        await seedRun(page, { ace: 'hall', idx: 1, autoNext: true });
        await openTitle(page, oldQ()); await jsClick(page, '[data-a=cont]');
        await waitScreen(page, 'night', 20000); await sleep(800);
        const rawN = await C(page, () => localStorage.getItem('dipGameLab_v1'));
        const oN = JSON.parse(rawN);
        await openTitle(page, QF); await jsClick(page, '[data-a=cont]');
        const nightB = await waitScreen(page, 'night', 15000); await sleep(600);
        const b = await C(page, () => ({ v: window.__lab.save.v, pos: window.__lab.run && window.__lab.run.pos, bak: localStorage.getItem('dipGameLab_v1.bak7') }));
        await jsClick(page, '[data-a=go]');
        const duelB = await duelReady(page, 25000);
        const okB = oN.v === 7 && nightB && b.v === 8 && b.pos === oN.run.pos && b.bak === rawN && duelB;
        // (c) v8 給舊版讀：唯讀、推門也不覆寫
        await C(page, raw => localStorage.setItem('dipGameLab_v1', raw), raw8);
        await openTitle(page, oldQ()); await sleep(1500);
        const c1 = await C(page, () => localStorage.getItem('dipGameLab_v1'));
        await jsClick(page, '[data-a=quiet]'); await sleep(2500);
        await C(page, () => { const nx = document.querySelector('.lb-dq .nx.on'); if (nx) document.querySelector('.lb-dq').click(); }); await sleep(1500);
        const c2 = await C(page, () => localStorage.getItem('dipGameLab_v1'));
        const okC = c1 === raw8 && c2 === raw8 && JSON.parse(c2).v === 8;
        record(3, size, okA && okB && okC && !errs(page).length, `舊版 ${OLD_REF}：(a) v7 停在 ${JSON.stringify(v.a7)} → 新版 v ${n8.v}、.bak7＝原字串 ${n8.bak === raw7}、run ${n8.run}（${n8.type}）→ 舊面板 ${!sh.lt}「${sh.skip}」→ ${pl.screen} → 開打 ${duel1}；` +
          `(b) v7 來客第 ${oN.run && oN.run.pos} 位 → 新版 v ${b.v} 第 ${b.pos} 位、.bak7 ${b.bak === rawN}、開打 ${duelB}；(c) v8 給舊版讀：載入後 ${c1 === raw8}、推門後 ${c2 === raw8}；${errTxt(page)}`);
      } catch (e) { record(3, size, false, 'error ' + e.message); }
      await ctx.close();
    }
  }

  // ---------------------------------------------------------------- 4 卡 id 不在卡池（CRITIQUE 4.3）
  if (want(4)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await seededContinue(page, { ace: 'hall', idx: 0, autoNext: true }, QF);
      await waitScreen(page, 'night', 20000); await sleep(600);
      const BAD = 'nope-artist|nope-album';
      // (a) 站的貨、寄賣、撿來的
      await C(page, bad => {
        window.__lab.jump(16);
        const r = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent;
        E.stallSession(r, Cn); r.pending.groups = [['dig', 'snack'], ['gig', 'promo']];
        E.choose(r, Cn, { type: 'stallPick', group: 0 });
        r.pending.cur.cards[0] = bad;
        r.consign = { card: bad, due: r.round + 2 };
        r.found = (r.found || []).concat([bad]);
        window.__lab.money(r.money);
      }, BAD);
      await openTitle(page, QF); await jsClick(page, '[data-a=cont]');
      await waitScreen(page, 'night', 15000);
      const okSt = await page.waitForFunction(() => { const s = window.DipLabStalls.state(); return !!s && s.phase === 'station' && !!document.querySelector('.lb-sheet.stall'); }, null, { timeout: 10000 }).then(() => true, () => false);
      const a = await C(page, bad => { const r = window.__lab.run, p = r.pending; return { cur: p && p.cur && p.cur.kind, cards: p && p.cur && p.cur.cards, bad: JSON.stringify(r).indexOf(bad) >= 0, consign: r.consign, tiles: document.querySelectorAll('.lb-sheet.stall .st-c').length }; }, BAD);
      const cl = await clearStall(page);
      // (b) 戰利品列裡一張不存在的
      await C(page, () => window.__lab.jump(17));
      await waitScreen(page, 'night', 10000); await sleep(500);
      await jsClick(page, '[data-a=go]'); await duelReady(page, 25000); await sleep(300);
      await C(page, () => window.__lab.forceWin());
      await waitScreen(page, 'reward', 15000); await sleep(800);
      const c0 = await C(page, bad => { const r = window.__lab.run; r.pending.cards[0] = bad; window.__lab.money(r.money); return r.pending.cards.slice(); }, BAD);
      await openTitle(page, QF); await jsClick(page, '[data-a=cont]');
      await waitScreen(page, 'reward', 15000);
      await page.waitForSelector('.lb-sheet.reward.lt-sheet', { timeout: 8000 }).catch(() => {});
      await sleep(400);
      const b = await C(page, bad => ({ cards: window.__lab.run.pending.cards.slice(), tiles: document.querySelectorAll('.lb-sheet.reward .lt-c').length, bad: JSON.stringify(window.__lab.run).indexOf(bad) >= 0 }), BAD);
      const pl = await passLoot(page, {});
      const ok = okSt && a.cur === 'dig' && Array.isArray(a.cards) && a.cards.length === 2 && !a.bad && a.consign && a.consign.card === null && a.consign.due > 0 && a.tiles === 2 && cl.ok &&
        b.cards.length === 2 && b.tiles === 2 && !b.bad && pl.ok && pl.screen === 'night';
      record(4, size, ok && !errs(page).length, `站的貨塞壞 id → 載入 ${okSt} ${a.cur} 剩 ${a.cards && a.cards.length} 張（畫 ${a.tiles}）、寄賣 ${JSON.stringify(a.consign)}（壞的那張濾掉、寄賣照樣到期領）、存檔裡還有壞 id ${a.bad} → 不逛了 ${cl.ok}；` +
        `戰利品列塞壞 id ${c0.length}→${b.cards.length} 張（畫 ${b.tiles}）、還有壞 id ${b.bad} → 不收 ${pl.screen}；${errTxt(page)}`);
    } catch (e) { record(4, size, false, 'error ' + e.message); }
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
