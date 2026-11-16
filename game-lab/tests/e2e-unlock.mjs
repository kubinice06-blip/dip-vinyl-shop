// game-lab/tests/e2e-unlock.mjs：流派與頂點卡靠遊戲解鎖（店主 11-16「換流派只能每局一開始；流派的頂點卡要透過遊戲蒐集才能解鎖」）端對端測試。
//   介面棒（scratchpad v5/unlock：BRIEF、CONTRACT 第 4 節）。需要靜態伺服器：cd dip-vinyl-shop && python3 -m http.server 8765
//   node game-lab/tests/e2e-unlock.mjs
//   環境變數（見 e2e-lib.mjs）：LAB_BASE／LAB_URL；LAB_SIZES（這支預設 390x664,375x548）；UNLOCK_ONLY＝只跑這幾項（例 1,3）；
//   UNLOCK_SHOTS＝截圖資料夾（390×664 那一輪、deviceScaleFactor 2：鎖住的派、旗標開挑王牌面板（部分已收）、解鎖演出）
//
// 每個尺寸：
//   1  新存檔只有初始派（旗標關）：上次挑流亡的存檔（解鎖制以前的 v5）→ 標題吐司「流派改成打倒傳說藏家才解鎖…」一次、流亡那張補記成擁有（src start）；
//      來客畫面：沒有「想換王牌，點老闆。」的提示；點老闆小選單「換一張王牌」換成「其他流派還鎖著／打倒傳說藏家解鎖」（按不下去、不捲）；
//      引擎 switchAce 到殿堂＝locked；唱片櫃最上面一行「流派 1／3・下一派：殿堂（經典）」
//   2  鎖住的派點不了（旗標關）：殿堂＋已解鎖流亡的存檔 → 點老闆 → 換一張王牌 → 三選一：異端灰掉、中間一把鎖、下面「打倒傳說藏家解鎖」；
//      點異端＝不選、說明那行「異端（硬蕊）還鎖著…」；「就這張」在畫面裡、不捲；選殿堂＝照舊（老闆「那就照舊。」）
//   3  打倒藏家掉被剋那派並解鎖（旗標關）：流亡、第 5 位（藏家）→ 點藏家頭像「帶的王牌《OK Computer》打倒他，解鎖殿堂派（經典）」→ 打倒 →
//      送牌那段：他那張是殿堂預設那張、上面一塊「解鎖了殿堂派（經典）／下一趟開局，點老闆就能換。」、封面角「新收藏」→ 收進唱片櫃 → 領獎吐司 →
//      唱片櫃殿堂那張擁有（src boss）、已解鎖＝殿堂、流亡；下一輪（第 10 位）藏家帶異端那張（殿堂剋異端）；唱片櫃那行「流派 2／3・下一派：異端（硬蕊）」
//   4  旗標開時沒擁有的卡不能挑（?apex=1）：異端＋殿堂解鎖、收過《'77 Live》《Scum》的存檔 → 第 1 位前自動跳挑王牌面板：流亡分頁上鎖、異端「已收 3／15」、
//      沒收到的 12 張灰＋鎖；點沒收到的＝不選、灰字「還沒收到：打倒傳說藏家收集」；點流亡分頁＝不切、灰字「流亡（冷門）還鎖著…」；挑《'77 Live》＝照舊換；
//      引擎 switchAce 挑沒收到的＝notOwned、挑流亡＝locked
//   5  旗標開、新玩家只有一張：點老闆小選單「還沒收到別張王牌／打倒傳說藏家收集」（按不下去）
//   6  旗標開、三派都開之後打倒藏家：他帶一張你還沒收到的試做卡（先挑別派）→ 送牌那段沒有解鎖那塊、寫「收進唱片櫃，下一趟開局可以換」、封面角「新收藏」→ 擁有
//   每項最後看主控台 0 錯誤。任何 FAIL → exit 1。
import fs from 'fs';
import path from 'path';
import { launch, newPage, SIZES as SIZES0, record, results, sleep, Q, jsClick, waitScreen, noScroll, scrollOk, duelReady, tapAt,
  seedRun, watchSay, openTitle, advanceUntil } from './e2e-lib.mjs';

const SIZES = process.env.LAB_SIZES ? SIZES0 : [[390, 664], [375, 548]];
const ONLY = (process.env.UNLOCK_ONLY || '').split(',').filter(Boolean).map(Number);
const want = n => !ONLY.length || ONLY.includes(n);
const SHOTS = process.env.UNLOCK_SHOTS || '';
const QA = (extra = '') => Q('&fast=1&apex=1' + extra);
const C = (page, f, a) => page.evaluate(f, a);
const RALLIZES = 'les-rallizes-denudes-77-live', SCUM = 'napalm-death-scum';

const errs = page => (page._errors || []).filter(e => !/favicon/.test(e));
// 吐司：頁面一載入就記（標題畫面的一次性吐司在第一個畫面就出）
async function watchToastsEarly(page) {
  await page.addInitScript(() => {
    window.__toasts = [];
    const start = () => new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.classList && n.classList.contains('lb-toast')) window.__toasts.push(n.textContent); })))
      .observe(document.documentElement, { childList: true, subtree: true });
    if (document.documentElement) start(); else document.addEventListener('DOMContentLoaded', start);
  });
}
const TX = page => C(page, () => { const Cn = window.DipLabContent; return Object.assign({}, Cn.trial.ui, { apx: Cn.apexTrial.ui, aceSame: Cn.shopLines.aceSame, aceTitle: Cn.aceTitle, aces: Object.assign({}, Cn.aces) }); });
const fill = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (o[k] != null ? o[k] : m));
const tv = (t, x) => ({ title: x.aceTitle[t], axis: { hall: '經典', pearl: '冷門', heresy: '硬蕊' }[t] });
async function shot(page, name, w, h) {
  if (!SHOTS || w !== 390 || h !== 664) return null;
  fs.mkdirSync(SHOTS, { recursive: true });
  const f = path.join(SHOTS, name + '.png');
  await page.screenshot({ path: f });
  return f;
}
// 存檔裡的解鎖狀態（引擎從唱片櫃的「擁有」算）
const unl = page => C(page, () => { const S = window.__lab.save, Cn = window.DipLabContent, own = id => !!(S.shelf[id] && S.shelf[id].own);
  return { tiers: window.DipLabEngine.unlockedTiers(Cn, own, { start: S.lastAce }).join(), run: window.__lab.run && window.__lab.run.unlock ? window.__lab.run.unlock.tiers.join() : null }; });
// 打倒第 pos 位（藏家）：開打 → 對白 → 品味對決 → 強制贏 → 等送牌那段的面板
async function beatBoss(page) {
  await jsClick(page, '[data-a=go]');
  await waitScreen(page, 'scene');
  for (let g = 0; g < 150 && !(await page.$('.lb-dq.hasmenu .lb-dqopt')); g++) { if (await page.$('.lb-dq .nx.on')) await jsClick(page, '.lb-dq'); await sleep(200); }
  await sleep(450);
  await jsClick(page, '.lb-dq .lb-dqopt');
  await waitScreen(page, 'duel');
  await page.waitForFunction(() => window.__lab.rawDuel() && !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
  await sleep(600);
  await page.evaluate(() => window.__lab.forceWin());
  return advanceUntil(page, () => !!document.querySelector('#panel > .lb-sheet.one [data-i]'), null, 30000);
}
const onePanel = page => C(page, () => {
  const s = document.querySelector('#panel > .lb-sheet.one'); if (!s) return null;
  const u = s.querySelector('.lb-unlock'), b = s.querySelector('[data-i="0"]').getBoundingClientRect();
  return { cid: (s.querySelector('.lb-one [data-cid]') || { getAttribute: () => null }).getAttribute('data-cid'), unlock: u ? u.textContent : null, unlockCls: u ? u.className : '',
    msg: (s.querySelector('.msg') || {}).textContent || '', badge: (s.querySelector('.badge.new') || {}).textContent || '', h3: (s.querySelector('.hd h3') || {}).textContent || '',
    btnIn: b.top >= 0 && b.bottom <= innerHeight, sc: s.scrollHeight - s.clientHeight };
});
// 領獎 → 升級 → 來客
async function rewardToNight(page) {
  await waitScreen(page, 'reward', 15000);
  await sleep(1200);
  await page.evaluate(() => { const b = document.querySelector('.lb-sheet.reward [data-a=skip]') || document.querySelector('.lb-sheet.reward [data-pick]'); if (b) b.click(); });
  for (let g = 0; g < 40 && (await C(page, () => window.__lab.screen())) !== 'night'; g++) { await page.evaluate(() => { const b = document.querySelector('.lb-sheet.level [data-lv]'); if (b && !document.querySelector('.lb-sheet.level.arming')) b.click(); }); await sleep(300); }
  return (await C(page, () => window.__lab.screen())) === 'night';
}

async function runSize(browser, w, h) {
  const size = `${w}x${h}`;
  const dpr = SHOTS && w === 390 && h === 664 ? 2 : 1;

  // ---------------------------------------------------------------- 1 新存檔只有初始派（旗標關）
  if (want(1)) {
    const { ctx, page } = await newPage(browser, w, h); await watchToastsEarly(page);
    try {
      await openTitle(page, Q());
      await seedRun(page, { ace: 'pearl', idx: 0 });              // v5 存檔（解鎖制以前）：上次挑流亡
      await openTitle(page, Q());
      await sleep(300);
      const x = await TX(page);
      const t1 = await C(page, () => window.__toasts.slice());
      const st = await C(page, () => { const S = window.__lab.save, Cn = window.DipLabContent; return { e: S.shelf[Cn.aces.pearl] || null, stored: JSON.parse(localStorage.getItem('dipGameLab_v1')).v }; });
      const u0 = await unl(page);
      // 再整理一次：不再補、不再提示
      await page.evaluate(() => { window.__toasts.length = 0; });
      await openTitle(page, Q());
      const t2 = await C(page, () => window.__toasts.slice());
      await watchSay(page);
      await jsClick(page, '[data-a=cont]');
      await waitScreen(page, 'night'); await sleep(2200);
      const hint = await C(page, () => ({ toasts: window.__toasts.slice(), seen: !!window.__lab.save.seen.aceSwap }));
      await C(page, () => window.__lab.stageAction('talk:owner')); await sleep(500);
      const menu = await C(page, () => { const s = document.querySelector('.lb-sheet.float.owner'); if (!s) return null;
        const b = s.querySelector('.ow-none'), r = b ? b.getBoundingClientRect() : null;
        return { swap: !!s.querySelector('[data-a=swap]'), none: b ? b.textContent : null, dis: !!(b && b.disabled), inView: !!r && r.top >= 0 && r.bottom <= innerHeight && r.height >= 44 }; });
      const scM = await noScroll(page);
      if (menu && menu.none) await C(page, () => { const b = document.querySelector('.lb-sheet.owner .ow-none'); if (b) b.click(); });
      await sleep(300);
      const after = await C(page, () => ({ pick: !!document.querySelector('.lb-sheet.acepick'), eng: window.DipLabEngine.switchAce(JSON.parse(JSON.stringify(window.__lab.run)), window.DipLabContent, 'hall').error }));
      await C(page, () => { const b = document.querySelector('.lb-sheet.owner [data-a=close]'); if (b) b.click(); });
      await C(page, () => window.__lab.openPage('shelf')); await sleep(500);
      const line = await C(page, () => (document.querySelector('.lb-page .lb-unl') || {}).textContent || '');
      const wantLine = fill(x.unlockProg, { n: 1 }) + '・' + fill(x.unlockNext, tv('hall', x));
      const ok = t1.includes(x.unlockMigrated) && !t2.includes(x.unlockMigrated) && st.e && st.e.own === true && st.e.src === 'start' && st.stored === 6 &&
        u0.tiers === 'pearl' && u0.run === 'pearl' && !hint.toasts.includes(x.aceHint) && !hint.seen &&
        menu && !menu.swap && menu.none === x.aceSwapNone + x.aceLocked && menu.dis && menu.inView && scrollOk(scM) && !after.pick && after.eng === 'locked' && line === wantLine;
      record(1, size, ok && !errs(page).length, `遷移吐司 ${t1.includes(x.unlockMigrated)}（再整理 ${t2.includes(x.unlockMigrated)}）、流亡那張 ${JSON.stringify(st.e)} v${st.stored}；解鎖 ${JSON.stringify(u0)}；` +
        `換王牌提示 ${hint.toasts.includes(x.aceHint)}（seen ${hint.seen}）；點老闆 ${JSON.stringify(menu)} ${JSON.stringify(scM)} → 點了 ${JSON.stringify(after)}；唱片櫃「${line}」（要「${wantLine}」）；錯誤 ${errs(page).length}${errs(page).length ? '：' + errs(page).slice(0, 2).join(' / ') : ''}`);
    } catch (e) { record(1, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 2 鎖住的派點不了（旗標關）
  if (want(2)) {
    const { ctx, page } = await newPage(browser, w, h, { dpr });
    try {
      await openTitle(page, Q());
      await seedRun(page, { ace: 'hall', idx: 0, ownAces: ['pearl'] });
      await openTitle(page, Q());
      await watchSay(page);
      await jsClick(page, '[data-a=cont]');
      await waitScreen(page, 'night'); await sleep(1500);
      const x = await TX(page);
      await C(page, () => window.__lab.stageAction('talk:owner')); await sleep(500);
      await jsClick(page, '.lb-sheet.owner [data-a=swap]');
      const up = await page.waitForSelector('.lb-sheet.acepick .lb-ct', { timeout: 5000 }).then(() => true, () => false);
      await sleep(500);
      const pk = await C(page, () => { const s = document.querySelector('.lb-sheet.acepick'), ok = s.querySelector('[data-a=ok]').getBoundingClientRect(), t = s.querySelector('.lb-ct[data-tier="heresy"]');
        return { locked: [...s.querySelectorAll('.lb-ct.locked')].map(x => x.dataset.tier).join(), ov: !!t.querySelector('.lockov'), lt: (t.querySelector('.lockt') || {}).textContent || '', sel: (s.querySelector('.lb-ct.sel') || {}).dataset.tier,
          okIn: ok.top >= 0 && ok.bottom <= innerHeight, sc: s.scrollHeight - s.clientHeight }; });
      const sc = await noScroll(page);
      await tapAt(page, '.lb-sheet.acepick .lb-ct[data-tier="heresy"] .acex'); await sleep(300);
      const tap = await C(page, () => ({ sel: (document.querySelector('.lb-sheet.acepick .lb-ct.sel') || {}).dataset.tier, det: (document.querySelector('.lb-sheet.acepick .detail') || {}).textContent || '', peek: !!document.querySelector('.lb-sheet.acepick .lb-ct.peek[data-tier="heresy"]') }));
      const f1 = await shot(page, 'unlock-1-locked-tier', w, h);
      await tapAt(page, '.lb-sheet.acepick [data-a=ok]'); await sleep(900);
      const res = await C(page, () => ({ ace: window.__lab.run.ace, said: window.__said.map(x => x.t), pick: !!document.querySelector('.lb-sheet.acepick') }));
      const ok = up && pk.locked === 'heresy' && pk.ov && pk.lt === x.aceLocked && pk.sel === 'hall' && pk.okIn && pk.sc <= 1 && scrollOk(sc) &&
        tap.sel === 'hall' && tap.peek && tap.det === fill(x.aceLockedNote, tv('heresy', x)) && res.ace === 'hall' && !res.pick && res.said.includes(x.aceSame);
      record(2, size, ok && !errs(page).length, `面板 ${up} ${JSON.stringify(pk)} ${JSON.stringify(sc)}；點異端 ${JSON.stringify(tap)}；就這張 ${JSON.stringify(res)}${f1 ? '；截圖 ' + f1 : ''}；錯誤 ${errs(page).length}`);
    } catch (e) { record(2, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 3 打倒藏家掉被剋那派並解鎖（旗標關）
  if (want(3)) {
    const { ctx, page } = await newPage(browser, w, h, { dpr }); await watchToastsEarly(page);
    try {
      await openTitle(page, Q());
      await seedRun(page, { ace: 'pearl', idx: 4 });               // 第 5 位＝傳說藏家；只有流亡
      await openTitle(page, Q());
      await jsClick(page, '[data-a=cont]');
      await waitScreen(page, 'night'); await sleep(800);
      const x = await TX(page);
      const r0 = await C(page, () => { const R = window.__lab.run; R.retryLeft = 0; return { bossCard: R.bossCard, tiers: R.unlock && R.unlock.tiers.join() }; });
      // 點藏家頭像：帶哪張、打倒他解鎖哪一派
      await jsClick(page, '[data-tut=night] [data-i="4"]'); await sleep(400);
      const gs = await C(page, () => (document.querySelector('.lb-sheet.float.guest .boss-ace') || {}).textContent || '');
      await C(page, () => { const b = document.querySelector('.lb-sheet.float.guest [data-a=close]'); if (b) b.click(); }); await sleep(300);
      const hallAlbum = await C(page, () => window.DipLabContent.cards[window.DipLabContent.aces.hall].album);
      const wantGs = fill(x.bossCarry, { album: hallAlbum }) + fill(x.bossUnlock, tv('hall', x));
      const stake = await beatBoss(page);
      await sleep(1500);                                             // 鎖頭打開的小演出（0.6 s 起、0.45 s）
      const one = stake ? await onePanel(page) : null;
      const f3 = await shot(page, 'unlock-3-boss-unlock', w, h);
      await page.evaluate(() => { window.__toasts.length = 0; });
      if (stake) await jsClick(page, '#panel > .lb-sheet.one [data-i="0"]');
      const rew = await waitScreen(page, 'reward', 15000); await sleep(500);
      const t1 = await C(page, () => window.__toasts.slice());
      const s1 = await C(page, () => { const S = window.__lab.save, Cn = window.DipLabContent; return S.shelf[Cn.aces.hall] || null; });
      const u1 = await unl(page);
      const night = await rewardToNight(page);
      await page.evaluate(() => { window.__lab.jump(10); window.__lab.run.retryLeft = 0; });
      await waitScreen(page, 'night'); await sleep(300);
      const r2 = await C(page, () => ({ pos: window.__lab.run.pos, bossCard: window.__lab.run.bossCard, heresy: window.DipLabContent.aces.heresy }));
      await C(page, () => window.__lab.openPage('shelf')); await sleep(500);
      const line = await C(page, () => (document.querySelector('.lb-page .lb-unl') || {}).textContent || '');
      const unlockTxt = fill(x.unlocked, tv('hall', x)) + x.unlockedSub;
      const ok = r0.bossCard === x.aces.hall && r0.tiers === 'pearl' && gs === wantGs && stake && one && one.cid === x.aces.hall && one.unlock === unlockTxt && /\bhall\b/.test(one.unlockCls) &&
        one.badge === x.newOwn && one.btnIn && one.sc <= 1 && rew && t1.includes(fill(x.unlocked, tv('hall', x))) && s1 && s1.own === true && s1.src === 'boss' &&
        u1.tiers === 'hall,pearl' && night && r2.pos === 10 && r2.bossCard === r2.heresy && line === fill(x.unlockProg, { n: 2 }) + '・' + fill(x.unlockNext, tv('heresy', x));
      record(3, size, ok && !errs(page).length, `第 1 輪藏家帶 ${r0.bossCard}（解鎖 ${r0.tiers}）、頭像「${gs}」；送牌那段 ${JSON.stringify(one)}；領獎吐司 ${JSON.stringify(t1)}；殿堂那張 ${JSON.stringify(s1)}；` +
        `解鎖 ${JSON.stringify(u1)}；第 ${r2.pos} 位藏家帶 ${r2.bossCard}；唱片櫃「${line}」${f3 ? '；截圖 ' + f3 : ''}；錯誤 ${errs(page).length}${errs(page).length ? '：' + errs(page).slice(0, 2).join(' / ') : ''}`);
    } catch (e) { record(3, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 4 旗標開時沒擁有的卡不能挑
  if (want(4)) {
    const { ctx, page } = await newPage(browser, w, h, { dpr });
    try {
      await openTitle(page, QA());
      await seedRun(page, { ace: 'heresy', idx: 0, ownAces: ['hall'], ownIds: [RALLIZES, SCUM] });
      await openTitle(page, QA());
      await watchSay(page);
      await jsClick(page, '[data-a=cont]');
      await waitScreen(page, 'night');
      const up = await page.waitForSelector('.lb-sheet.apxpick .apx-c', { timeout: 9000 }).then(() => true, () => false);
      await sleep(600);
      const x = await TX(page);
      const st = () => C(page, () => { const s = document.querySelector('.lb-sheet.apxpick'); if (!s) return null; const ok = s.querySelector('[data-a=ok]').getBoundingClientRect();
        return { tabs: [...s.querySelectorAll('[data-tab]')].map(b => b.dataset.tab + (b.classList.contains('on') ? '*' : '') + (b.classList.contains('locked') ? '!' : '')).join(), tc: (s.querySelector('[data-tab].on .tc') || {}).textContent || '',
          unowned: [...s.querySelectorAll('.apx-c.unowned')].map(b => b.dataset.cid), sel: (s.querySelector('.apx-c.sel') || { dataset: {} }).dataset.cid || null, peek: (s.querySelector('.apx-c.peek') || { dataset: {} }).dataset.cid || null,
          sw: s.querySelector('.apx-sw').hidden ? '' : s.querySelector('.apx-sw').textContent, okIn: ok.top >= 0 && ok.bottom <= innerHeight, sc: s.scrollHeight - s.clientHeight }; });
      const p0 = await st();
      const sc = await noScroll(page);
      const other = p0 && p0.unowned[0];
      if (other) await tapAt(page, `.lb-sheet.apxpick .apx-c[data-cid="${other}"]`);
      await sleep(300);
      const p1 = await st();
      const f4 = await shot(page, 'unlock-2-apex-panel', w, h);
      await tapAt(page, '.lb-sheet.apxpick [data-tab="pearl"]'); await sleep(300);
      const p2 = await st();
      await tapAt(page, `.lb-sheet.apxpick .apx-c[data-cid="${RALLIZES}"]`); await sleep(300);
      const p3 = await st();
      await tapAt(page, '.lb-sheet.apxpick [data-a=ok]'); await sleep(1300);
      const res = await C(page, ([o]) => { const R = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent, cp = () => JSON.parse(JSON.stringify(R));
        return { ace: R.ace, aceId: R.aceId, notOwned: E.switchAce(cp(), Cn, 'heresy', { aceId: o }).error, locked: E.switchAce(cp(), Cn, 'pearl').error, can: E.canSwitchAce(R, Cn) }; }, [other]);
      const ok = up && p0 && p0.tabs === 'hall,pearl!,heresy*' && p0.tc === fill(x.apx.got, { n: 3, total: 15 }) && p0.unowned.length === 12 && !p0.unowned.includes(RALLIZES) && !p0.unowned.includes(SCUM) &&
        p0.sel === x.aces.heresy && p0.okIn && p0.sc <= 1 && scrollOk(sc) &&
        p1.sel === x.aces.heresy && p1.peek === other && p1.sw === x.apx.notYet + '：' + x.apx.lockCard &&
        p2.tabs === 'hall,pearl!,heresy*' && p2.sw === fill(x.aceLockedNote, tv('pearl', x)) &&
        p3.sel === RALLIZES && !p3.peek && res.ace === 'heresy' && res.aceId === RALLIZES && res.can && res.notOwned === 'notOwned' && res.locked === 'locked';
      record(4, size, ok && !errs(page).length, `面板 ${up} ${JSON.stringify(Object.assign({}, p0, { unowned: p0 && p0.unowned.length }))} ${JSON.stringify(sc)}；點沒收到的 ${JSON.stringify(p1 && { sel: p1.sel, peek: p1.peek, sw: p1.sw })}；` +
        `點流亡分頁 ${JSON.stringify(p2 && { tabs: p2.tabs, sw: p2.sw })}；挑'77 Live ${JSON.stringify(p3 && { sel: p3.sel, peek: p3.peek })} → ${JSON.stringify(res)}${f4 ? '；截圖 ' + f4 : ''}；錯誤 ${errs(page).length}`);
    } catch (e) { record(4, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 5 旗標開、新玩家只有一張：點老闆沒得換
  if (want(5)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await openTitle(page, QA());
      await seedRun(page, { ace: 'hall', idx: 0, seen: { apexPick: true } });     // 挑王牌面板看過了（不自動跳）
      await openTitle(page, QA());
      await jsClick(page, '[data-a=cont]');
      await waitScreen(page, 'night'); await sleep(1200);
      const x = await TX(page);
      const auto = await C(page, () => !!document.querySelector('.lb-sheet.apxpick'));
      await C(page, () => window.__lab.stageAction('talk:owner')); await sleep(500);
      const menu = await C(page, () => { const s = document.querySelector('.lb-sheet.float.owner'); if (!s) return null; const b = s.querySelector('.ow-none'); return { swap: !!s.querySelector('[data-a=swap]'), none: b ? b.textContent : null, dis: !!(b && b.disabled) }; });
      const ok = !auto && menu && !menu.swap && menu.none === x.apx.noneMore + x.apx.lockCard && menu.dis;
      record(5, size, ok && !errs(page).length, `自動跳 ${auto}；點老闆 ${JSON.stringify(menu)}；錯誤 ${errs(page).length}`);
    } catch (e) { record(5, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 6 旗標開、三派都開之後：藏家帶一張還沒收到的試做卡
  if (want(6)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await openTitle(page, QA());
      await seedRun(page, { ace: 'heresy', idx: 4, ownAces: ['hall', 'pearl'] });
      await openTitle(page, QA());
      await jsClick(page, '[data-a=cont]');
      await waitScreen(page, 'night'); await sleep(800);
      const x = await TX(page);
      const r0 = await C(page, () => { const R = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent; R.retryLeft = 0;
        return { card: R.bossCard, tier: E.tierOfApex(Cn, R.bossCard), trial: Cn.apexTrialOnly.includes(R.bossCard), owned: !!(window.__lab.save.shelf[R.bossCard] || {}).own }; });
      await jsClick(page, '[data-tut=night] [data-i="4"]'); await sleep(400);
      const gs = await C(page, () => (document.querySelector('.lb-sheet.float.guest .boss-ace') || {}).textContent || '');
      await C(page, () => { const b = document.querySelector('.lb-sheet.float.guest [data-a=close]'); if (b) b.click(); }); await sleep(300);
      const album = await C(page, id => window.DipLabContent.cards[id].album, r0.card);
      const stake = await beatBoss(page);
      await sleep(600);
      const one = stake ? await onePanel(page) : null;
      if (stake) await jsClick(page, '#panel > .lb-sheet.one [data-i="0"]');
      await waitScreen(page, 'reward', 15000); await sleep(300);
      const s1 = await C(page, id => window.__lab.save.shelf[id] || null, r0.card);
      const ok = r0.trial && !r0.owned && r0.tier && r0.tier !== 'heresy' && gs === fill(x.bossCarry, { album }) + x.bossCollect &&
        stake && one && one.cid === r0.card && one.unlock == null && one.msg === x.apx.gotNew && one.badge === x.newOwn && one.btnIn && s1 && s1.own === true && s1.src === 'boss';
      record(6, size, ok && !errs(page).length, `藏家帶 ${JSON.stringify(r0)}、頭像「${gs}」；送牌那段 ${JSON.stringify(one)}；收下 ${JSON.stringify(s1)}；錯誤 ${errs(page).length}${errs(page).length ? '：' + errs(page).slice(0, 2).join(' / ') : ''}`);
    } catch (e) { record(6, size, false, 'error ' + e.message); }
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
