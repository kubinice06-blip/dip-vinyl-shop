// game-lab/tests/e2e-apex.mjs：頂點卡純輔助卡試做（?apex=1）端對端測試。介面棒（scratchpad v5/apextrial：FRAME 第 7 節、CONTRACT）。
//   需要靜態伺服器：cd dip-vinyl-shop && python3 -m http.server 8765
//   node game-lab/tests/e2e-apex.mjs
//   環境變數（見 e2e-lib.mjs）：LAB_BASE／LAB_URL；LAB_SIZES（這支預設 390x664,375x548）；APEX_ONLY＝只跑這幾項（例 1,4）
//
// 每個尺寸（真點：page.touchscreen.tap；網址帶 ?apex=1，第 6 項不帶）：
//   1  開局挑王牌：存一份第 1 位開打前的 run（異端）→ 繼續 → 來客畫面老闆說「接下來，王牌不上場比星…」→ 自動跳挑王牌面板：
//      角上小字「頂點卡試做」、三派分頁、那派 15 張（預設那張選中、角上時機小字）、兩行說明、「就帶這張」；面板不捲出畫面（375×548 也不用捲）、鈕在畫面裡；
//      按住封面＝唱片資訊（多一塊「王牌能力」）；點別張（非預設）→ 說明換、鈕「就這張」；切到流亡 → 灰字「老闆送的那幾張也跟著換」→ 切回；
//      挑《'77 Live》→ run.aceId、save.lastAceId、老闆「好，就帶這張。」、吐司「王牌換成《'77 Live》」；送的四張沒換
//   2  點老闆換王牌：真點老闆 → 小選單「現在帶的：異端《'77 Live》」→ 換一張王牌 → 同一個面板（異端分頁、'77 Live 選中、「就帶這張」）→ 切到殿堂、挑 Thriller →
//      run.ace hall、aceId Thriller、包包前四張換成殿堂送的、老闆「好，換這張。送你的也一起換了。」
//   3  對決：王牌格＝輔助卡格（金框、data-apex=can）；不能拿來比星（engine isLegal／legalActions 沒有王牌、api.play({ace}) 不出手、點它不跳屬性鈕）；
//      點它＝能力框（能力名・時機、說明、「王牌不比星。」、「發動」；左右不超出 16 px；不蓋提示框）；點框外＝收起、沒有發動
//   4  發動再出一張專輯：「發動」→ 提示框下面「王牌《Thriller》：史上最暢銷」、王牌格發亮「這手」、手數不變；照他會被剋的那一色出（他這手指定）→
//      結果框的數字與「王牌：你 +1 星，多賺 n」跟引擎一樣（同一份對決複本先算；沒王牌的對照少扣 n）；揭曉後王牌格「用過」、再點只寫「這場用過了」
//   5  其他時機（__lab.duelLab）：留著型（鄧麗君）封面角小金點；整場型（Filth）發動後下一手仍發亮「整場」；回聲望（OK Computer）被扣過之後發動＝聲望條長回來、
//      飄字「聲望 +n」、結果句「王牌：回 n 聲望」；看穿（'77 Live）提示框蓋章「真話／唬人！」跟引擎一致
//   6  旗標下的規則卡、標題、唱片資訊：標題牌角上「頂點卡試做」；規則卡第 6 行換成「王牌不比星：…」、頁尾「打贏回 4」、不捲動；按住王牌格＝唱片資訊有「王牌能力」
//   7  不開旗標：挑王牌畫面跟現在一樣（老闆 → 換一張王牌＝三張王牌三選一、沒有分頁與 15 張；來客畫面不自動跳；王牌格照舊可以丟、屬性鈕「王牌 硬 7」；
//      規則卡照舊「王牌 7 星」；唱片資訊沒有「王牌能力」；唱片櫃分母 316）
//   8  序章（旗標開）：挑王牌那行寫「頂點卡試做・教學這場王牌照舊 7 星…」、序章那場照舊 7 星（view 沒有 apex、王牌可以丟）、開打吐司寫明；
//      序章打完回到來客畫面 → 老闆說那句 → 自動跳挑王牌面板 → 挑 → 老闆＋吐司先出、第一次來客的教學泡泡等它們收掉才出（不三則疊在一起）（只在 390 跑：整段序章約 1 分鐘）
//   9  審查 11-16 的版面與字（旗標開）：挑王牌面板三派 45 張逐一點，說明三行與換派灰字都在「就這張」那列上面、不被切、面板不捲；
//      看穿的章不疊在提示句上（16 場）；發動那行專輯名太長只截專輯名、能力名看得到、點唱片就收掉；回聲望滿聲望＝「發動」灰掉＋寫原因；
//      結果句：彈回兩邊都扣寫兩個數字、比星輸王牌免扣不寫「一樣大」、他丟他的王牌補「他的王牌照舊 7 星」（旗標關時這三種都不會出現）；藏家真的丟王牌那手也有那句
//   10 不開旗標：這份存檔開旗標時挑過的試做卡（記成認識）不會出現在試聽機的清單（試做的 42 張當作不存在）
//   11 跳過序章（店主 11-16）：新存檔標題有「跳過序章，直接開打」→ 點 → 來客畫面第 1 位、非序章、包包 7 張（送的 4＋特價箱 3）、跳挑王牌面板（15 張）；
//      挑完回來客；有一趟在打時第一下只變「再按一次…」不換局，第二下才開新的一趟；不開旗標時沒有這顆鈕
//   每項最後看主控台 0 錯誤。任何 FAIL → exit 1。
import { launch, newPage, SIZES as SIZES0, record, results, sleep, Q, jsClick, waitScreen, noScroll, scrollOk, duelReady, tapAt, hitPoint,
  seededContinue, seedRun, watchSay, tapHot, longPress, infoOpen, closeInfo, openTitle, prologueToDuel, advanceUntil } from './e2e-lib.mjs';

const SIZES = process.env.LAB_SIZES ? SIZES0 : [[390, 664], [375, 548]];
const ONLY = (process.env.APEX_ONLY || '').split(',').filter(Boolean).map(Number);
const want = n => !ONLY.length || ONLY.includes(n);
const QA = (extra = '') => Q('&fast=1&apex=1' + extra);
const C = (page, f, a) => page.evaluate(f, a);
const RALLIZES = 'les-rallizes-denudes-77-live', THRILLER = 'michael-jackson-thriller', TENG = '鄧麗君-teresa-teng-淡淡幽情';

function track(page) { page._errors = page._errors || []; }
const errs = page => page._errors.filter(e => !/favicon/.test(e));
async function watchToasts(page) {
  await page.evaluate(() => { window.__toasts = []; new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.classList && n.classList.contains('lb-toast')) window.__toasts.push(n.textContent); }))).observe(document.getElementById('app'), { childList: true }); });
}
const U = page => C(page, () => Object.assign({}, window.DipLabContent.apexTrial.ui, { aceSwapSub: window.DipLabContent.trial.ui.aceSwapSub, aceSwapped: window.DipLabContent.trial.ui.aceSwapped, aceAsk: window.DipLabContent.trial.ui.aceAsk,
  aceDone: window.DipLabContent.shopLines.aceDone, aceKeep: window.DipLabContent.shopLines.aceKeep, aceNow: window.DipLabContent.trial.ui.aceNow }));
// 挑王牌面板的狀態
const pickState = page => C(page, () => {
  const s = document.querySelector('.lb-sheet.apxpick'); if (!s) return null;
  const okb = s.querySelector('[data-a=ok]'), ok = okb.getBoundingClientRect(), sr = s.getBoundingClientRect();
  const cs = [...s.querySelectorAll('.apx-c')], c0 = cs[0] ? cs[0].getBoundingClientRect() : { width: 0 };
  return { title: (s.querySelector('.hd h3') || {}).textContent || '', tag: (s.querySelector('.apx-tag') || {}).textContent || '',
    tabs: [...s.querySelectorAll('[data-tab]')].map(b => b.dataset.tab + (b.classList.contains('on') ? '*' : '')), n: cs.length, sel: (s.querySelector('.apx-c.sel') || { dataset: {} }).dataset.cid || null,
    tm: cs.map(b => (b.querySelector('.tm') || {}).textContent || ''), det: (s.querySelector('.apx-det') || {}).textContent || '', sw: !s.querySelector('.apx-sw').hidden, okt: okb.textContent,
    okIn: ok.top >= 0 && ok.bottom <= innerHeight && ok.height >= 44, sheetScroll: s.scrollHeight - s.clientHeight, inView: sr.top >= 0 && sr.bottom <= innerHeight + 0.5, cw: Math.round(c0.width) };
});
const expDet = (page, id) => C(page, id => { const E = window.DipLabEngine, Cn = window.DipLabContent, c = Cn.cards[id], A = E.abilityOf(Cn, id), U = Cn.apexTrial.ui;
  return c.artist + '《' + c.album + '》' + U.pickLine.replace('{name}', A.name).replace('{timing}', U.timing[A.timing]).replace('{text}', A.text); }, id);
async function toNightWithPanel(page) {
  await openTitle(page, QA());
  await seedRun(page, { ace: 'heresy', idx: 0 });
  await openTitle(page, QA());
  await watchSay(page); await watchToasts(page);          // 老闆那句在來客畫面一畫出來就說：先包好再按「繼續」
  await jsClick(page, '[data-a=cont]');
  await waitScreen(page, 'night');
  return page.waitForSelector('.lb-sheet.apxpick .apx-c', { timeout: 9000 }).then(() => true, () => false);
}

async function runSize(browser, w, h) {
  const size = `${w}x${h}`;
  // ---------------------------------------------------------------- 1–4：同一趟（開局挑 → 點老闆換 → 對決）
  if (want(1) || want(2) || want(3) || want(4)) {
    const { ctx, page } = await newPage(browser, w, h); track(page);
    try {
      const up = await toNightWithPanel(page);
      const u = await U(page);
      await sleep(600);
      const said0 = await C(page, () => window.__said.map(x => x.t));
      const p0 = await pickState(page), sc0 = await noScroll(page);
      const def = await C(page, () => window.DipLabContent.aces.heresy);
      const det0 = await expDet(page, def);
      // 按住封面＝唱片資訊（多一塊王牌能力）
      await longPress(page, ctx, `.lb-sheet.apxpick .apx-c[data-cid="${RALLIZES}"]`, 700);
      const inf = await infoOpen(page);
      const infAb = inf ? await C(page, () => { const a = document.querySelector('#cardInfoMask .apx'); return a ? a.textContent : ''; }) : '';
      const selAfterLp = (await pickState(page) || {}).sel;
      if (inf) await closeInfo(page);
      await sleep(250);
      // 點別張
      await tapAt(page, `.lb-sheet.apxpick .apx-c[data-cid="${RALLIZES}"]`); await sleep(250);
      const p1 = await pickState(page), det1 = await expDet(page, RALLIZES);
      // 切到流亡 → 灰字；切回
      await tapAt(page, '.lb-sheet.apxpick [data-tab="pearl"]'); await sleep(250);
      const p2 = await pickState(page);
      const pearlDef = await C(page, () => window.DipLabContent.aces.pearl);
      await tapAt(page, '.lb-sheet.apxpick [data-tab="heresy"]'); await sleep(250);
      await tapAt(page, `.lb-sheet.apxpick .apx-c[data-cid="${RALLIZES}"]`); await sleep(250);
      const bag0 = await C(page, () => window.__lab.run.bag.slice());
      await tapAt(page, '.lb-sheet.apxpick [data-a=ok]'); await sleep(1300);
      const a1 = await C(page, () => ({ scr: window.__lab.screen(), ace: window.__lab.run.ace, aceId: window.__lab.run.aceId, last: window.__lab.save.lastAceId, lastAce: window.__lab.save.lastAce,
        seen: !!window.__lab.save.seen.apexPick, bag: window.__lab.run.bag.slice(), said: window.__said.map(x => x.t), toasts: window.__toasts.slice(), album: window.DipLabContent.cards['les-rallizes-denudes-77-live'].album,
        known: !!window.__lab.save.shelf['les-rallizes-denudes-77-live'], panel: !!document.querySelector('.lb-sheet.apxpick') }));
      const ok1 = up && said0.some(t => t === u.intro.replace(/^「|」$/g, '')) && p0 && p0.tag === u.tag && p0.title === u.pickTitle && p0.tabs.join() === 'hall,pearl,heresy*' && p0.n === 15 && p0.sel === def &&
        p0.tm.every(t => ['這手', '整場', '留著'].includes(t)) && p0.det === det0 && p0.okt === u.pickSame && p0.okIn && p0.sheetScroll <= 1 && p0.inView && p0.cw >= 44 && scrollOk(sc0) &&
        inf && infAb.includes(u.infoTitle) && infAb.includes('赤裸裸') && selAfterLp === def &&
        p1.sel === RALLIZES && p1.det === det1 && p1.okt === u.pickGo && !p1.sw &&
        p2.tabs.join() === 'hall,pearl*,heresy' && p2.sel === pearlDef && p2.sw && p2.okt === u.pickGo && p2.n === 15 &&
        a1.scr === 'night' && a1.ace === 'heresy' && a1.aceId === RALLIZES && a1.last === RALLIZES && a1.lastAce === 'heresy' && a1.seen && a1.known && !a1.panel &&
        JSON.stringify(a1.bag) === JSON.stringify(bag0) && a1.said.includes(u.aceKeep) && a1.toasts.includes(u.aceSwapped.replace('{album}', a1.album));
      if (want(1)) record(1, size, ok1 && !errs(page).length, `自動跳 ${up}；老闆 ${JSON.stringify(said0)}；面板 ${JSON.stringify(p0)} ${JSON.stringify(sc0)}；按住→資訊 ${inf}「${infAb.slice(0, 30)}」sel 不變 ${selAfterLp === def}；` +
        `點別張 ${JSON.stringify({ sel: p1.sel, okt: p1.okt, det: p1.det === det1 })}；流亡分頁 ${JSON.stringify({ tabs: p2.tabs, sel: p2.sel, sw: p2.sw })}；挑完 ${JSON.stringify(a1)}；錯誤 ${errs(page).length}`);

      // ---- 2 點老闆換王牌（換派）
      await sleep(1200);
      const hot = await tapHot(page, x => x.action === 'talk:owner'); await sleep(600);
      const menu = await C(page, () => { const s = document.querySelector('.lb-sheet.float.owner'); return s ? (s.querySelector('.ow-now') || {}).textContent || '' : null; });
      await jsClick(page, '.lb-sheet.owner [data-a=swap]');
      const up2 = await page.waitForSelector('.lb-sheet.apxpick .apx-c', { timeout: 5000 }).then(() => true, () => false);
      await sleep(500);
      const q0 = await pickState(page);
      await tapAt(page, '.lb-sheet.apxpick [data-tab="hall"]'); await sleep(250);
      await tapAt(page, `.lb-sheet.apxpick .apx-c[data-cid="${THRILLER}"]`); await sleep(250);
      const q1 = await pickState(page);
      await page.evaluate(() => { window.__said.length = 0; window.__toasts.length = 0; });
      await tapAt(page, '.lb-sheet.apxpick [data-a=ok]'); await sleep(1300);
      const a2 = await C(page, () => { const R = window.__lab.run, Cn = window.DipLabContent; return { ace: R.ace, aceId: R.aceId, last: window.__lab.save.lastAceId, lastAce: window.__lab.save.lastAce, bag4: R.bag.slice(0, 4), gifts: Cn.gifts.hall.slice(), said: window.__said.map(x => x.t), toasts: window.__toasts.slice(), album: Cn.cards['michael-jackson-thriller'].album }; });
      const ok2 = !!hot && menu === u.aceNow.replace('{title}', '異端').replace('{album}', a1.album) && up2 && q0.tabs.join() === 'hall,pearl,heresy*' && q0.sel === RALLIZES && q0.okt === u.pickSame &&
        q1.sel === THRILLER && q1.sw && q1.tabs.join() === 'hall*,pearl,heresy' &&
        a2.ace === 'hall' && a2.aceId === THRILLER && a2.last === THRILLER && a2.lastAce === 'hall' && JSON.stringify(a2.bag4) === JSON.stringify(a2.gifts) && a2.said.includes(u.aceDone) && a2.toasts.includes(u.aceSwapped.replace('{album}', a2.album));
      if (want(2)) record(2, size, ok2 && !errs(page).length, `點老闆 ${hot && hot.id} → 「${menu}」；面板 ${up2} ${JSON.stringify({ tabs: q0.tabs, sel: q0.sel, okt: q0.okt })} → 殿堂 ${JSON.stringify({ sel: q1.sel, sw: q1.sw })}；換完 ${JSON.stringify(a2)}`);

      // ---- 3 對決：輔助卡格、不能比星、能力框
      await jsClick(page, '[data-a=go]');
      const ready = await duelReady(page);
      await sleep(400);
      const t0 = await C(page, () => {
        const E = window.DipLabEngine, d = window.__lab.rawDuel(), tl = document.querySelector('.dl .tile[data-i=ace]');
        return { mode: !!d.apexMode, tile: tl ? tl.className : null, st: tl ? tl.dataset.apex : null, legalAce: E.isLegal(d, { ace: true }) || E.isLegal(d, { ace: true, attr: 'c' }), anyAce: E.legalActions(d).some(a => a.ace), n: d.n,
          aceCard: d.p.ace && d.p.ace.id, best: E.bestChip(d, 'c', { ace: true }) };
      });
      const playAce = await C(page, () => window.DipLabDuel.api().play({ ace: true }).then(x => x));
      await sleep(200);
      const n1 = await C(page, () => window.__lab.rawDuel().n);
      await tapAt(page, 'dt:card-ace'); await sleep(350);
      const box = await C(page, () => {
        const b = document.querySelector('.dl .apx-box'), hi = document.querySelector('.dl .hint'); if (!b || b.hidden) return null;
        const r = b.getBoundingClientRect(), hr = hi.getBoundingClientRect(), go = b.querySelector('.go');
        return { t: b.textContent, l: r.left, r: r.right, top: r.top, bottom: r.bottom, hTop: hr.top, hBottom: hr.bottom, chips: document.querySelectorAll('.dl .pop .ab').length, popHidden: document.querySelector('.dl .pop').hidden,
          go: go ? { t: go.textContent, h: go.getBoundingClientRect().height } : null, on: document.querySelector('.dl .tile[data-i=ace]').classList.contains('apxon') };
      });
      const abil = await C(page, () => window.DipLabEngine.abilityOf(window.DipLabContent, 'michael-jackson-thriller'));
      // 點框外（他那一塊）＝收起、沒有發動
      await tapAt(page, '.dl .dl-e .nm'); await sleep(250);
      const closed = await C(page, () => ({ hidden: document.querySelector('.dl .apx-box').hidden, used: !!window.__lab.rawDuel().p.aceUsed, can: window.DipLabEngine.canApex(window.__lab.rawDuel()) }));
      const boxOk = box && box.t.includes(abil.name) && box.t.includes(u.timing.hand) && box.t.includes(abil.text) && box.t.includes(u.noStar) && box.go && box.go.t === u.use && box.go.h >= 44 &&
        box.l >= 16 - 0.5 && box.r <= w - 16 + 0.5 && box.chips === 0 && box.popHidden && box.on && (box.bottom <= box.hTop || box.top >= box.hBottom);
      const ok3 = ready && t0.mode && /\bapx\b/.test(t0.tile) && t0.st === 'can' && !t0.legalAce && !t0.anyAce && t0.aceCard === THRILLER && !(t0.best && t0.best.ace) && playAce === false && n1 === t0.n &&
        boxOk && closed.hidden && !closed.used && closed.can;
      if (want(3)) record(3, size, ok3 && !errs(page).length, `對決 ${ready}；王牌格 ${JSON.stringify(t0)}；play({ace}) ${playAce}、手數 ${t0.n}→${n1}；能力框 ${JSON.stringify(box)}；點框外 ${JSON.stringify(closed)}`);

      // ---- 4 發動 → 出一張專輯
      await tapAt(page, 'dt:card-ace'); await sleep(450);
      await tapAt(page, '.dl .apx-box .go'); await sleep(350);
      const f0 = await C(page, () => { const D = window.DipLabDuel.debug(), d = window.__lab.rawDuel(); return { ui: D.ui, n: d.n, used: !!d.p.aceUsed, on: d.p.apexOn, can: window.DipLabEngine.canApex(d), tile: (document.querySelector('.dl .tile[data-i=ace] .apxs') || {}).textContent || '' }; });
      // 照他會被剋的那一色出：我的手牌第 0 張最高那色 X；他那手指定一張 X 剋得動的 Y（同一份對決複本先算，含沒有王牌的對照）
      const plan = await C(page, () => {
        const E = window.DipLabEngine, d = window.__lab.rawDuel(), beats = { o: 'c', c: 'h', h: 'o' };
        for (let i = 0; i < d.p.hand.length; i++) {
          const c = d.p.hand[i]; if (!c) continue;
          for (const X of ['c', 'o', 'h']) {
            if (!E.isLegal(d, { i, attr: X })) continue;
            const Y = beats[X];
            for (let j = 0; j < d.e.hand.length; j++) {
              if (!d.e.hand[j]) continue;
              const cl = JSON.parse(JSON.stringify(d)), ev = E.resolveTurn(cl, { i, attr: X }, { forcedPlay: { i: j, attr: Y } }).find(e => e.t === 'clash');
              if (!ev || ev.kind !== 'counter' || !ev.apex || !ev.apex.hit) continue;
              const b = JSON.parse(JSON.stringify(d)); b.p.apexOn = null; b.apexMode = false;
              const evb = E.resolveTurn(b, { i, attr: X }, { forcedPlay: { i: j, attr: Y } }).find(e => e.t === 'clash');
              return { i, X, j, Y, toE: ev.toE, toP: ev.toP, note: (ev.notes || []).map(n => n.text || n).join('・'), apex: ev.apex, baseE: evb.toE, card: c.id };
            }
          }
        }
        return null;
      });
      let res = null;
      if (plan) {
        await C(page, p => window.__lab.duelLab.setNext({ i: p.j, attr: p.Y }), plan);
        await tapAt(page, `dt:card-${plan.i}`); await sleep(300);
        await tapAt(page, `.dl [data-tut="chip-${plan.i}-${plan.X}"]`);
        await page.waitForFunction(() => { const d = window.DipLabDuel.debug(); return d.last && d.last.ui && d.last.ui.call.on; }, null, { timeout: 8000 }).catch(() => {});
        res = await C(page, () => { const d = window.DipLabDuel.debug(), cl = d.last.evs.find(e => e.t === 'clash'); return { call: d.last.ui.call, notes: d.last.ct.notes, toE: cl.toE, apex: cl.apex }; });
      }
      await duelReady(page, 15000); await sleep(300);
      const after = await C(page, () => { const tl = document.querySelector('.dl .tile[data-i=ace]'); return { st: tl && tl.dataset.apex, lab: (tl && tl.querySelector('.apxs') || {}).textContent || '' }; });
      await tapAt(page, 'dt:card-ace'); await sleep(350);
      const usedBox = await C(page, () => { const b = document.querySelector('.dl .apx-box'); return b && !b.hidden ? { t: b.textContent, go: !!b.querySelector('.go') } : null; });
      await tapAt(page, 'dt:card-ace'); await sleep(200);
      const exNote = plan ? await C(page, p => window.DipLabContent.apexTrial.notes.star.replace('{d}', p.apex.d), plan) : '';
      const ok4 = f0.ui.apxf === u.fired.replace('{album}', 'Thriller').replace('{name}', abil.name) && f0.tile === u.timing.hand && f0.used && f0.on && f0.on.n === t0.n && !f0.can && f0.n === t0.n &&
        !!plan && !!res && res.toE === plan.toE && res.call.l2 === '他 −' + plan.toE && res.notes.includes(exNote) && res.call.notes.includes(exNote) && plan.apex.dE >= 1 && plan.toE - plan.baseE === plan.apex.dE &&
        after.st === 'used' && after.lab === u.used && usedBox && usedBox.t.includes(u.usedNote) && !usedBox.go;
      if (want(4)) record(4, size, ok4 && !errs(page).length, `發動 ${JSON.stringify({ apxf: f0.ui.apxf, tile: f0.tile, n: f0.n, on: f0.on })}；出 ${plan && plan.card} ${plan && plan.X}（他 ${plan && plan.Y}）→ ` +
        `${JSON.stringify(res && { l2: res.call.l2, notes: res.notes })}（預期 他 −${plan && plan.toE}、沒王牌 −${plan && plan.baseE}、「${exNote}」）；揭曉後 ${JSON.stringify(after)}；再點 ${JSON.stringify(usedBox)}；錯誤 ${errs(page).length}${errs(page).length ? '：' + errs(page).slice(0, 2).join(' / ') : ''}`);
    } catch (e) { for (const n of [1, 2, 3, 4]) if (want(n)) record(n, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 5：其他時機（__lab.duelLab）
  if (want(5)) {
    const { ctx, page } = await newPage(browser, w, h); track(page);
    try {
      await openTitle(page, QA());
      const lab = (o) => C(page, o => window.__lab.duelLab.start(o), o).then(() => duelReady(page));
      // 留著型
      await lab({ ace: 'hall', aceId: TENG, enemy: 'copycat', seed: 3 });
      await sleep(300);
      const hold = await C(page, () => { const tl = document.querySelector('.dl .tile[data-i=ace]'); return { cls: tl.className, dot: !!tl.querySelector('.apxdot'), live: window.DipLabDuel.debug().view.apex.live }; });
      // 整場型：Filth
      await lab({ ace: 'heresy', enemy: 'copycat', seed: 4 });
      await sleep(300);
      await tapAt(page, 'dt:card-ace'); await sleep(400); await tapAt(page, '.dl .apx-box .go'); await sleep(300);
      const d1 = await C(page, () => ({ lab: (document.querySelector('.dl .tile[data-i=ace] .apxs') || {}).textContent || '', st: document.querySelector('.dl .tile[data-i=ace]').dataset.apex }));
      await tapAt(page, 'dt:card-0'); await sleep(250);
      const top = await C(page, () => (document.querySelector('.dl .pop .ab.top') || { dataset: {} }).dataset.a);
      await tapAt(page, `.dl .pop .ab[data-a="${top}"]`);
      await duelReady(page, 15000); await sleep(300);
      const d2 = await C(page, () => ({ lab: (document.querySelector('.dl .tile[data-i=ace] .apxs') || {}).textContent || '', st: document.querySelector('.dl .tile[data-i=ace]').dataset.apex, live: window.DipLabDuel.debug().view.apex.live, n: window.__lab.rawDuel().n }));
      // 回聲望：OK Computer。先讓他剋一手（扣聲望），再發動
      await lab({ ace: 'hall', enemy: 'copycat', seed: 5 });
      await sleep(300);
      const pl = await C(page, () => { const E = window.DipLabEngine, d = window.__lab.rawDuel(), beats = { o: 'c', c: 'h', h: 'o' };
        for (let i = 0; i < d.p.hand.length; i++) for (const X of ['c', 'o', 'h']) { if (!d.p.hand[i] || !E.isLegal(d, { i, attr: X })) continue; const Y = Object.keys(beats).find(k => beats[k] === X);
          for (let j = 0; j < d.e.hand.length; j++) { if (!d.e.hand[j]) continue; const cl = JSON.parse(JSON.stringify(d)), ev = E.resolveTurn(cl, { i, attr: X }, { forcedPlay: { i: j, attr: Y } }).find(e => e.t === 'clash'); if (ev && ev.toP >= 1 && !(cl.over)) return { i, X, j, Y }; } }
        return null; });
      if (pl) { await C(page, p => window.__lab.duelLab.setNext({ i: p.j, attr: p.Y }), pl); await tapAt(page, `dt:card-${pl.i}`); await sleep(250); await tapAt(page, `.dl [data-tut="chip-${pl.i}-${pl.X}"]`); await duelReady(page, 15000); await sleep(300); }
      const hp0 = await C(page, () => { const d = window.__lab.rawDuel(); return { hp: d.p.hp, max: d.p.max }; });
      await page.evaluate(() => { window.__fl = []; new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.classList && n.classList.contains('fl')) window.__fl.push(n.textContent); }))).observe(document.querySelector('.dl .dl-fx'), { childList: true }); });
      await tapAt(page, 'dt:card-ace'); await sleep(400); await tapAt(page, '.dl .apx-box .go'); await sleep(700);
      const hp1 = await C(page, () => ({ hp: window.__lab.rawDuel().p.hp, num: document.querySelector('.dl .dl-p .hpn .num').textContent, fl: window.__fl.slice(), w: parseFloat(document.querySelector('.dl .dl-p .hp .fill').style.width) }));
      const want5 = Math.min(2, hp0.max - hp0.hp);
      await tapAt(page, 'dt:card-0'); await sleep(250);
      const top2 = await C(page, () => (document.querySelector('.dl .pop .ab.top') || { dataset: {} }).dataset.a);
      await tapAt(page, `.dl .pop .ab[data-a="${top2}"]`);
      await page.waitForFunction(() => { const d = window.DipLabDuel.debug(); return d.last && d.last.ui && d.last.ui.call.on; }, null, { timeout: 8000 }).catch(() => {});
      const hn = await C(page, () => window.DipLabDuel.debug().last.ct.notes);
      const healNote = await C(page, n => window.DipLabContent.apexTrial.notes.heal.replace('{d}', n), want5);
      // 看穿：'77 Live
      await lab({ ace: 'heresy', aceId: RALLIZES, enemy: 'copycat', seed: 6 });
      await sleep(300);
      await tapAt(page, 'dt:card-ace'); await sleep(400); await tapAt(page, '.dl .apx-box .go'); await sleep(300);
      const rv = await C(page, () => { const d = window.__lab.rawDuel(), st = document.querySelector('.dl .hint .apxst:not([hidden])'); return { bluff: !!d.plan.bluff, stamp: st ? st.textContent : '', cls: st ? st.className : '', view: window.DipLabDuel.debug().view.apexReveal }; });
      const uu = await U(page);
      const ok5 = /\bhold\b/.test(hold.cls) && hold.dot && hold.live === 'hold' &&
        d1.st === 'live' && d1.lab === uu.timing.duel && d2.st === 'live' && d2.lab === uu.timing.duel && d2.live === 'on' && d2.n === 2 &&
        !!pl && hp0.hp < hp0.max && want5 > 0 && hp1.hp === hp0.hp + want5 && hp1.num === `${hp1.hp}/${hp0.max}` && hp1.fl.includes(uu.healToast.replace('{n}', want5)) && hn.includes(healNote) &&
        rv.view === (rv.bluff ? 'bluff' : 'honest') && rv.stamp === (rv.bluff ? uu.revealBluff : uu.revealHonest);
      record(5, size, ok5 && !errs(page).length, `留著 ${JSON.stringify(hold)}；整場 ${JSON.stringify(d1)} → 下一手 ${JSON.stringify(d2)}；回聲望 ${JSON.stringify(hp0)} → ${JSON.stringify(hp1)}（預期 +${want5}）結果句 ${JSON.stringify(hn)}；看穿 ${JSON.stringify(rv)}；錯誤 ${errs(page).length}${errs(page).length ? '：' + errs(page).slice(0, 2).join(' / ') : ''}`);
    } catch (e) { record(5, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 6：旗標下的標題、規則卡、唱片資訊
  if (want(6)) {
    const { ctx, page } = await newPage(browser, w, h); track(page);
    try {
      await openTitle(page, QA());
      const u = await U(page);
      const plate = await C(page, () => (document.querySelector('.lb-plate .apx') || {}).textContent || '');
      const total = await C(page, () => ({ cards: Object.keys(window.DipLabContent.cards).length }));
      await C(page, () => window.__lab.rules()); await sleep(400);
      const rl = await C(page, () => { const m = document.querySelector('.lb-modal .lb-help'); if (!m) return null; const li = [...m.querySelectorAll('.rl li')].map(x => x.textContent); return { l6: li[5] || '', foot: (m.querySelector('.rfoot') || {}).textContent || '', sc: m.scrollHeight - m.clientHeight }; });
      const sc = await noScroll(page);
      await jsClick(page, '.lb-modal [data-x]'); await sleep(300);
      await C(page, () => window.__lab.duelLab.start({ ace: 'pearl', enemy: 'copycat', seed: 2 })); await duelReady(page); await sleep(300);
      await longPress(page, ctx, 'dt:card-ace', 700);
      const inf = await infoOpen(page);
      const ci = inf ? await C(page, () => { const m = document.querySelector('#cardInfoMask'); return { apx: (m.querySelector('.apx') || {}).textContent || '', ns: (m.querySelector('.apxns') || {}).textContent || '', dim: !!m.querySelector('.stats.apxdim') }; }) : null;
      const ab = await C(page, () => window.DipLabEngine.abilityOf(window.DipLabContent, window.DipLabContent.aces.pearl));
      if (inf) await closeInfo(page);
      const ok6 = plate === u.tag && rl && rl.l6.includes(u.rule) && !rl.l6.includes('王牌 7 星') && rl.foot.includes('打贏回 4') && rl.sc <= 1 && scrollOk(sc) &&
        inf && ci.apx.includes(u.infoTitle) && ci.apx.includes(ab.name) && ci.apx.includes(ab.text) && ci.ns === u.noStar && ci.dim;
      record(6, size, ok6 && !errs(page).length, `標題牌「${plate}」；規則卡 ${JSON.stringify(rl)} ${JSON.stringify(sc)}；唱片資訊 ${JSON.stringify(ci)}（卡池 ${total.cards}）`);
    } catch (e) { record(6, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 7：不開旗標＝跟現在一樣
  if (want(7)) {
    const { ctx, page } = await newPage(browser, w, h); track(page);
    try {
      await seededContinue(page, { ace: 'hall', idx: 0 }, Q());
      await waitScreen(page, 'night');
      await sleep(2600);
      const auto = await C(page, () => !!document.querySelector('.lb-sheet.apxpick'));
      await C(page, () => window.__lab.stageAction('talk:owner')); await sleep(500);
      await jsClick(page, '.lb-sheet.owner [data-a=swap]');
      const up = await page.waitForSelector('.lb-sheet.acepick .lb-ct', { timeout: 5000 }).then(() => true, () => false);
      await sleep(400);
      const pk = await C(page, () => { const s = document.querySelector('.lb-sheet.acepick'); return { h3: (s.querySelector('.hd h3') || {}).textContent || '', n: s.querySelectorAll('.lb-ct').length, tiers: [...s.querySelectorAll('.lb-ct')].map(x => x.dataset.tier).join(),
        apx: s.querySelectorAll('[class*="apx"]').length, acex: [...s.querySelectorAll('.acex')].map(x => x.textContent), det: (s.querySelector('.detail') || {}).textContent || '', apexFlag: window.__lab.apex() }; });
      const aceAsk = await C(page, () => window.DipLabContent.trial.ui.aceAsk);
      await jsClick(page, '.lb-sheet.acepick [data-a=ok]'); await sleep(800);
      const plate = await C(page, () => !!document.querySelector('.lb-plate .apx'));
      await jsClick(page, '[data-a=go]'); await duelReady(page); await sleep(300);
      const t = await C(page, () => { const d = window.__lab.rawDuel(), tl = document.querySelector('.dl .tile[data-i=ace]'); return { mode: d.apexMode, tile: tl && tl.className, legal: window.DipLabEngine.legalActions(d).some(a => a.ace), view: 'apex' in window.DipLabDuel.debug().view }; });
      await tapAt(page, 'dt:card-ace'); await sleep(300);
      const chip = await C(page, () => { const b = document.querySelector('.dl [data-tut=chip-ace]'); return b ? b.textContent : null; });
      await longPress(page, ctx, 'dt:card-ace', 700);
      const inf = await infoOpen(page);
      const ci = inf ? await C(page, () => ({ apx: !!document.querySelector('#cardInfoMask .apx'), ns: !!document.querySelector('#cardInfoMask .apxns') })) : null;
      if (inf) await closeInfo(page);
      await C(page, () => window.__lab.rules()); await sleep(300);
      const l6 = await C(page, () => { const li = document.querySelectorAll('.lb-modal .rl li'); return li[5] ? li[5].textContent : ''; });
      const shelf = await C(page, () => window.__lab.save && Object.keys(window.DipLabContent.cards).length);
      const ok7 = !auto && up && pk.h3 === aceAsk && pk.n === 3 && pk.tiers === 'hall,pearl,heresy' && pk.apx === 0 && pk.acex.every(x => / 7/.test(x)) && !pk.apexFlag &&
        !plate && !t.mode && /\bace\b/.test(t.tile) && !/\bapx\b/.test(t.tile) && t.legal && !t.view && chip && /7/.test(chip) && inf && !ci.apx && !ci.ns && l6.includes('王牌 7 星');
      record(7, size, ok7 && !errs(page).length, `沒旗標：來客自動跳 ${auto}；換王牌面板 ${up} ${JSON.stringify(pk)}；標題牌小字 ${plate}；對決 ${JSON.stringify(t)} 屬性鈕「${chip}」；唱片資訊 ${JSON.stringify(ci)}；規則第 6 行「${l6}」`);
      // 唱片櫃分母 316（試做的 42 張旗標關時不算）
      await jsClick(page, '.lb-modal [data-x]'); await sleep(200);
      await C(page, () => window.__lab.openPage('shelf')); await sleep(500);
      const sh = await C(page, () => (document.querySelector('.lb-top.page .tt small') || {}).textContent || '');
      const only = await C(page, () => window.DipLabContent.apexTrialOnly.length);
      record(7.1, size, /／316/.test(sh) && only === 42 && shelf === 358, `唱片櫃「${sh}」（cards ${shelf}、試做 ${only} 張）`);
    } catch (e) { record(7, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 9：審查 11-16 的版面與字（旗標開）
  if (want(9)) {
    const { ctx, page } = await newPage(browser, w, h); track(page);
    try {
      const up = await toNightWithPanel(page);
      const u = await U(page);
      await sleep(500);
      // (a) 三派 × 15 張逐一點：說明、換派灰字都在「就這張」那列上面、不被切；面板不捲、在畫面裡
      const pk = up ? await C(page, async () => {
        const s = document.querySelector('.lb-sheet.apxpick'), out = { n: 0, bad: [] };
        const meas = (tag) => {
          const foot = s.querySelector('.foot').getBoundingClientRect(), det = s.querySelector('.apx-det'), dr = det.getBoundingClientRect(), sw = s.querySelector('.apx-sw'), wr = sw.getBoundingClientRect(), sr = s.getBoundingClientRect();
          const ab = det.querySelector('.ab'), abr = ab ? ab.getBoundingClientRect() : dr;
          const ok = dr.bottom <= foot.top + 0.5 && abr.bottom <= foot.top + 0.5 && det.scrollHeight <= det.clientHeight + 1 && (sw.hidden || wr.bottom <= foot.top + 0.5) && s.scrollHeight - s.clientHeight <= 1 && sr.bottom <= innerHeight + 0.5;
          out.n++; if (!ok) out.bad.push({ tag, det: [Math.round(dr.top), Math.round(dr.bottom), det.scrollHeight, det.clientHeight], ab: Math.round(abr.bottom), sw: sw.hidden ? null : [Math.round(wr.top), Math.round(wr.bottom)], foot: Math.round(foot.top), sc: s.scrollHeight - s.clientHeight });
        };
        const wait = ms => new Promise(r => setTimeout(r, ms));
        for (const t of ['hall', 'pearl', 'heresy']) {
          s.querySelector(`[data-tab="${t}"]`).click(); await wait(80);
          for (const b of [...s.querySelectorAll('.apx-c')]) { b.click(); await wait(40); meas(t + ':' + b.dataset.cid); }
        }
        s.querySelector('[data-tab="heresy"]').click(); await wait(80);
        const def = window.DipLabContent.aces.heresy; s.querySelector(`.apx-c[data-cid="${def}"]`).click(); await wait(60);
        return out;
      }) : null;
      if (up) { await jsClick(page, '.lb-sheet.apxpick [data-a=ok]'); await sleep(900); }
      const ok9a = up && pk && pk.n === 45 && !pk.bad.length;
      record('9a', size, ok9a && !errs(page).length, `挑王牌面板 45 張逐一點：${pk && pk.n} 個狀態、蓋住 ${pk && pk.bad.length} ${pk && pk.bad.length ? JSON.stringify(pk.bad.slice(0, 3)) : ''}`);

      const lab = (o) => C(page, o => window.__lab.duelLab.start(o), o).then(() => duelReady(page));
      // (b) 看穿的章不疊在提示句上（16 場）
      const st = [];
      for (let seed = 1; seed <= 16; seed++) {
        await lab({ ace: 'heresy', aceId: RALLIZES, enemy: 'copycat', seed });
        await sleep(200);
        await tapAt(page, 'dt:card-ace'); await sleep(300); await tapAt(page, '.dl .apx-box .go'); await sleep(250);
        st.push(await C(page, () => {
          const hi = document.querySelector('.dl .hint'), tx = hi.querySelector('.tx'), a = hi.querySelector('.apxst:not([hidden])');
          if (!a) return { none: true };
          const r = a.getBoundingClientRect(), t = tx.getBoundingClientRect(), h = hi.getBoundingClientRect();
          // 提示句每一個字的框
          const rg = document.createRange(); rg.selectNodeContents(tx); const rects = [...rg.getClientRects()];
          const hitText = rects.some(q => !(r.left >= q.right - 0.5 || r.right <= q.left + 0.5 || r.top >= q.bottom - 0.5 || r.bottom <= q.top + 0.5));
          return { hitText, clip: tx.scrollHeight > tx.clientHeight + 1, inBox: r.right <= h.right + 0.5 && r.left >= h.left - 0.5, t: tx.textContent, stamp: a.textContent };
        }));
      }
      const ok9b = st.length === 16 && st.every(x => !x.none && !x.hitText && !x.clip && x.inBox);
      record('9b', size, ok9b && !errs(page).length, `看穿蓋章 16 場：疊字 ${st.filter(x => x.hitText).length}、提示句被切 ${st.filter(x => x.clip).length}、章出框 ${st.filter(x => !x.inBox).length}、沒章 ${st.filter(x => x.none).length}；例 ${JSON.stringify(st[8])}`);

      // (c) 發動那行：專輯名很長（Goldberg）只截專輯名，能力名看得到；點唱片就收掉、相剋圖那行出來；層級在結果框下面
      const GOULD = 'glenn-gould-bach-the-goldberg-variations-1955';
      await lab({ ace: 'hall', aceId: GOULD, enemy: 'copycat', seed: 21 });
      await sleep(200);
      await tapAt(page, 'dt:card-ace'); await sleep(300); await tapAt(page, '.dl .apx-box .go'); await sleep(200);
      const f1 = await C(page, () => {
        const f = document.querySelector('.dl .apxf'); if (!f || f.hidden) return null;
        const r = f.getBoundingClientRect(), a = f.querySelector('.f1'), ar = a ? a.getBoundingClientRect() : { right: 1e9, width: 0 }, al = f.querySelector('.al');
        return { t: f.textContent, f1: a ? a.textContent : '', nameIn: ar.width > 0 && ar.right <= r.right + 0.5, alClip: al ? al.scrollWidth > al.clientWidth : false,
          z: +getComputedStyle(f).zIndex, zc: +getComputedStyle(document.querySelector('.dl .callout')).zIndex };
      });
      const gname = await C(page, id => window.DipLabEngine.abilityOf(window.DipLabContent, id).name, GOULD);
      await tapAt(page, 'dt:card-0'); await sleep(250);
      const f2 = await C(page, () => ({ apxf: !document.querySelector('.dl .apxf') || document.querySelector('.dl .apxf').hidden, leg: !document.querySelector('.dl .trileg').hidden }));
      const ok9c = !!f1 && f1.f1.includes(gname) && f1.nameIn && f1.z < f1.zc && f1.t === u.fired.replace('{album}', 'Bach: The Goldberg Variations (1955)').replace('{name}', gname) && f2.apxf && f2.leg;
      record('9c', size, ok9c && !errs(page).length, `發動那行 ${JSON.stringify(f1)}；點唱片後 ${JSON.stringify(f2)}`);

      // (d) 回聲望（OK Computer）滿聲望：「發動」灰掉、寫原因；按了也不會用掉
      await lab({ ace: 'hall', enemy: 'copycat', seed: 31 });
      await sleep(200);
      await tapAt(page, 'dt:card-ace'); await sleep(350);
      const hb = await C(page, () => { const b = document.querySelector('.dl .apx-box'), go = b && b.querySelector('.go'), d = window.__lab.rawDuel();
        return b && !b.hidden ? { full: (b.querySelector('.full') || {}).textContent || '', dis: !!(go && go.disabled), hp: d.p.hp, max: d.p.max, tile: document.querySelector('.dl .tile[data-i=ace]').dataset.apex } : null; });
      await C(page, () => { const g = document.querySelector('.dl .apx-box .go'); if (g) g.click(); }); await sleep(250);
      const hb2 = await C(page, () => ({ used: !!window.__lab.rawDuel().p.aceUsed }));
      await tapAt(page, '.dl .dl-e .nm'); await sleep(200);
      const ok9d = !!hb && hb.hp === hb.max && hb.full === u.full && hb.dis && hb.tile !== 'can' && !hb2.used;
      record('9d', size, ok9d && !errs(page).length, `滿聲望回聲望 ${JSON.stringify(hb)}；按了 ${JSON.stringify(hb2)}`);

      // (e) 結果句（_fmt.clashText 用頁面上的字）：彈回兩邊都扣、比星輸免扣、他的王牌；旗標關（事件沒有 apex 鍵）時照舊
      const fx = await C(page, () => {
        const F = window.DipLabDuel._fmt, T = F.text(window.DipLabContent), H = window.DipLabContent.hints, n = (o) => Object.assign({ pAttr: 'c', eAttr: 'o', pStar: 3, eStar: 3, notes: [] }, o);
        return {
          both: F.clashText(n({ kind: 'countered', toE: 1, toP: 2, apex: { op: 'bounce' }, notes: [{ apex: 'x', text: '王牌：彈回去 1' }] }), T, H),
          free: F.clashText(n({ kind: 'mirrorLose', pAttr: 'c', eAttr: 'c', toE: 0, toP: 0, apex: { op: 'loseZero' } }), T, H),
          eace: F.clashText(n({ kind: 'mirrorWin', pAttr: 'h', eAttr: 'h', toE: 2, toP: 0, eAce: true, apex: null }), T, H),
          offTie: F.clashText(n({ kind: 'mirrorLose', pAttr: 'c', eAttr: 'c', toE: 0, toP: 0 }), T, H),
          offAce: F.clashText(n({ kind: 'mirrorWin', pAttr: 'h', eAttr: 'h', toE: 2, toP: 0, eAce: true }), T, H),
          tie: T('tie')
        };
      });
      const ok9e = fx.both.l2 === u.hitBoth.replace('{p}', 2).replace('{e}', 1) && fx.both.cls === 'r' && fx.free.l2 === u.loseFree && fx.free.l2 !== fx.tie &&
        fx.eace.notes.includes(u.eAceNote) && fx.offTie.l2 === fx.tie && !fx.offAce.notes.includes(u.eAceNote);
      record('9e', size, ok9e && !errs(page).length, `結果句 ${JSON.stringify({ both: [fx.both.l2, fx.both.cls], free: fx.free.l2, eace: fx.eace.notes, offTie: fx.offTie.l2, offAce: fx.offAce.notes })}`);

      // (f) 藏家真的丟他的王牌那手：結果行有「他的王牌照舊 7 星」
      let bo = null;
      for (let seed = 7; seed <= 30 && !bo; seed++) {
        await lab({ ace: 'hall', enemy: 'boss', seed });
        const j = await C(page, () => { const d = window.__lab.rawDuel(); const j = d.e.hand.findIndex(c => c && c.tier); return j >= 0 ? { j, ax: window.DipLabEngine.TIER_AXIS[d.e.hand[j].tier] } : null; });
        if (!j) continue;
        await sleep(200);
        await C(page, p => window.__lab.duelLab.setNext({ i: p.j, attr: p.ax }), j);
        await tapAt(page, 'dt:card-0'); await sleep(250);
        const top = await C(page, () => (document.querySelector('.dl .pop .ab.top') || { dataset: {} }).dataset.a);
        await tapAt(page, `.dl .pop .ab[data-a="${top}"]`);
        await page.waitForFunction(() => { const d = window.DipLabDuel.debug(); return d.last && d.last.ui && d.last.ui.call.on; }, null, { timeout: 8000 }).catch(() => {});
        bo = await C(page, () => { const d = window.DipLabDuel.debug(), cl = d.last.evs.find(e => e.t === 'clash'); return { seed: 0, eAce: !!cl.eAce, notes: d.last.ct.notes, call: d.last.ui.call.notes || '' }; });
        bo.seed = seed;
      }
      const ok9f = !!bo && bo.eAce && bo.notes.includes(u.eAceNote);
      record('9f', size, ok9f && !errs(page).length, `藏家丟王牌 ${JSON.stringify(bo)}`);
    } catch (e) { for (const k of ['9a', '9b', '9c', '9d', '9e', '9f']) record(k, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 10：不開旗標：試做卡不進試聽機
  if (want(10)) {
    const { ctx, page } = await newPage(browser, w, h); track(page);
    try {
      await seededContinue(page, { ace: 'heresy', idx: 0 }, Q());
      await waitScreen(page, 'night');
      await sleep(600);
      const has = await C(page, id => { const c = window.DipLabContent.cards[id]; window.__lab.save.shelf[id] = { at: 'r1', seen: true }; return !!(c && c.previewUrl) && window.DipLabContent.apexTrialOnly.includes(id); }, RALLIZES);
      await C(page, () => window.__lab.stageAction('booth')); await sleep(600);
      const ids = await C(page, () => [...document.querySelectorAll('.lb-sheet.booth [data-pick]')].map(b => b.getAttribute('data-pick')));
      const ok10 = has && ids.length > 0 && !ids.includes(RALLIZES);
      const leak = await C(page, ids => ids.filter(id => window.DipLabContent.apexTrialOnly.includes(id)), ids);
      record(10, size, ok10 && !leak.length && !errs(page).length, `旗標關、唱片櫃有試做卡（有試聽 ${has}）→ 試聽機 ${ids.length} 張、試做卡 ${JSON.stringify(leak)}`);
    } catch (e) { record(10, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 8：序章（旗標開；只跑第一個尺寸）
  if (want(8) && w === SIZES[0][0] && h === SIZES[0][1]) {
    const { ctx, page } = await newPage(browser, w, h); track(page);
    try {
      await openTitle(page, QA());
      await page.evaluate(() => {
        window.__acepick = ''; window.__toasts = [];
        new MutationObserver(() => { const d = document.querySelector('.lb-sheet.acepick .detail'); if (d && d.textContent) window.__acepick = d.textContent; }).observe(document.body, { childList: true, subtree: true, characterData: true });
        new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.classList && n.classList.contains('lb-toast')) window.__toasts.push(n.textContent); }))).observe(document.getElementById('app'), { childList: true });
      });
      await page.click('[data-a=quiet]');
      const toDuel = await prologueToDuel(page, 'direct');
      const ready = toDuel && await duelReady(page);
      await sleep(2200);
      const pd = await C(page, () => { const d = window.__lab.rawDuel(), v = window.DipLabDuel.debug().view; return { mode: !!d.apexMode, hasApex: 'apex' in v, ace: !!v.ace, star: v.ace ? Math.max(v.ace.c, v.ace.o, v.ace.h) : 0, legal: window.DipLabEngine.legalActions(d).some(a => a.ace), toasts: window.__toasts.slice(), pick: window.__acepick }; });
      const u = await U(page);
      await page.evaluate(() => window.DipLabDuel.autoplay('thoughtful'));
      const card = await advanceUntil(page, () => !!document.querySelector('#panel > .lb-sheet.one [data-i]'), null, 90000);
      await sleep(500);
      if (card) await jsClick(page, '#panel > .lb-sheet.one [data-i="0"]');
      const relic = await advanceUntil(page, () => !!document.querySelector('.lb-sheet.relics [data-r]'), null, 40000);
      await sleep(450);
      if (relic) await jsClick(page, '.lb-sheet.relics [data-r]');
      const night = await advanceUntil(page, () => window.__lab.screen() === 'night', null, 60000);
      if (night) await watchSay(page);
      const up = night && await page.waitForSelector('.lb-sheet.apxpick .apx-c', { timeout: 9000 }).then(() => true, () => false);
      const said = await C(page, () => (window.__said || []).map(x => x.t));
      const ps = up ? await pickState(page) : null;
      const tier = await C(page, () => window.__lab.run && window.__lab.run.ace);
      // 挑一張（同一派換另一張）→ 老闆那句＋吐司先出；第一次來客的教學泡泡等吐司收掉才出（不三則疊在一起；照遊戲速度，不寫死秒數）
      let st1 = null;
      if (up) {
        await page.evaluate(() => { window.__said.length = 0; window.__toasts.length = 0; });
        const other = await C(page, () => { const b = [...document.querySelectorAll('.lb-sheet.apxpick .apx-c')][4]; return b ? b.dataset.cid : null; });
        if (other) await tapAt(page, `.lb-sheet.apxpick .apx-c[data-cid="${other}"]`);
        await sleep(200);
        await tapAt(page, '.lb-sheet.apxpick [data-a=ok]');
        st1 = await C(page, () => new Promise(done => {
          const t0 = performance.now(); let firstToast = null;
          const iv = setInterval(() => {
            const t = document.getElementById('tut'), b = t && t.querySelector('.tut-bub'), on = !!(t && /\bon\b/.test(t.className) && b && !b.hidden), toast = !!document.querySelector('.lb-toast');
            if (toast && firstToast == null) firstToast = Math.round(performance.now() - t0);
            const ms = Math.round(performance.now() - t0);
            if (on || ms > 9000) { clearInterval(iv); done({ at: on ? ms : null, toastNow: toast, firstToast, tx: on ? (b.querySelector('.tx') || {}).textContent || '' : '', said: window.__said.map(x => x.t), toasts: window.__toasts.slice() }); }
          }, 25);
        }));
      }
      const intro0 = await C(page, () => [].concat(window.DipLabContent.shopLines.nightIntro || [])[0] || '');
      const ok8 = ready && !pd.mode && !pd.hasApex && pd.ace && pd.star === 7 && pd.legal && pd.pick.includes(u.tutNote) && pd.toasts.some(t => t.includes(u.tutNote)) &&
        night && up && ps.tabs.includes(tier + '*') && ps.n === 15 &&
        !!st1 && st1.at != null && !st1.toastNow && st1.firstToast != null && st1.firstToast < st1.at && st1.said.includes(u.aceKeep) && st1.toasts.some(t => t.startsWith(u.aceSwapped.split('{')[0])) && !!intro0 && st1.tx.includes(intro0.slice(0, 6));
      record(8, size, ok8 && !errs(page).length, `序章挑王牌那行「${pd.pick}」；序章對決 ${JSON.stringify({ mode: pd.mode, hasApex: pd.hasApex, star: pd.star, legal: pd.legal })} 吐司 ${JSON.stringify(pd.toasts)}；` +
        `打完 → 來客 ${night}、老闆 ${JSON.stringify(said.slice(-2))}、面板 ${up} ${ps && JSON.stringify({ tabs: ps.tabs, n: ps.n })}；挑完 ${JSON.stringify(st1)}；錯誤 ${errs(page).length}${errs(page).length ? '：' + errs(page).slice(0, 2).join(' / ') : ''}`);
    } catch (e) { record(8, size, false, 'error ' + e.message); }
    await ctx.close();
  }
  // ---------------------------------------------------------------- 11：跳過序章、直接玩輔助卡版
  if (want(11)) {
    const { ctx, page } = await newPage(browser, w, h); track(page);
    try {
      await openTitle(page, QA());
      const u = await U(page);
      const has = await C(page, () => { const b = document.querySelector('[data-a=skip]'); return b ? b.textContent : ''; });
      await tapAt(page, '[data-a=skip]');
      const night = await waitScreen(page, 'night');
      const up = await page.waitForSelector('.lb-sheet.apxpick .apx-c', { timeout: 9000 }).then(() => true, () => false);
      await sleep(400);
      const p0 = await pickState(page);
      const r0 = await C(page, () => { const r = window.__lab.run; return { pos: r.pos, pro: !!r.prologue, bag: r.bag.length, picked: !!(r.shop && r.shop.bargainPicked), no: r.runNo }; });
      await tapAt(page, '.lb-sheet.apxpick [data-a=ok]'); await sleep(1300);
      const after = await C(page, () => ({ scr: window.__lab.screen(), panel: !!document.querySelector('.lb-sheet.apxpick') }));
      // 有一趟在打：回標題 → 第一下只變字、第二下才換局
      await openTitle(page, QA());
      const no1 = await C(page, () => window.__lab.run.runNo);
      await tapAt(page, '[data-a=skip]'); await sleep(300);
      const armed = await C(page, () => ({ t: (document.querySelector('[data-a=skip]') || {}).textContent || '', scr: window.__lab.screen() }));
      await sleep(350);
      await tapAt(page, '[data-a=skip]');
      const night2 = await waitScreen(page, 'night');
      const no2 = await C(page, () => window.__lab.run.runNo);
      const ok = has.includes(u.skip.replace(' ▸', '')) && night && up && p0 && p0.n === 15 && r0.pos === 1 && !r0.pro && r0.bag === 7 && r0.picked &&
        after.scr === 'night' && !after.panel && armed.t === u.skipAgain && armed.scr === 'title' && night2 && no2 !== no1;
      record(11, size, ok && !errs(page).length, `鈕「${has}」；來客 ${night}、面板 ${up} ${p0 && p0.n}；run ${JSON.stringify(r0)}；挑完 ${JSON.stringify(after)}；有一趟時第一下 ${JSON.stringify(armed)}；第二下 ${night2} runNo ${no1}→${no2}；錯誤 ${errs(page).length}`);
    } catch (e) { record(11, size, false, 'error ' + e.message); }
    await ctx.close();
    const o = await newPage(browser, w, h); track(o.page);
    try {
      await openTitle(o.page, Q());
      const n = await C(o.page, () => document.querySelectorAll('[data-a=skip]').length);
      record(11, size + '/off', n === 0 && !errs(o.page).length, `不開旗標：跳過鈕 ${n} 顆`);
    } catch (e) { record(11, size + '/off', false, 'error ' + e.message); }
    await o.ctx.close();
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
