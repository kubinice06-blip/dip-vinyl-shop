// game-lab/tests/e2e-loot.mjs：第 C 波 戰利品列＋藏家寶箱（SPEC-C §4.1、§4.2、§11.2）端對端測試。測試棒。
//   需要靜態伺服器：cd dip-vinyl-shop && python3 -m http.server 8765
//   node game-lab/tests/e2e-loot.mjs
//   環境變數（見 e2e-lib.mjs）：LAB_BASE／LAB_URL；LAB_SIZES（這支預設 390x664,375x548）；LOOT_ONLY＝只跑這幾項（例 1,7）
//
// 每個尺寸（全部真點：touchscreen.tap 打在看得到的那一點；正常速度＝網址不加 fast=1）：
//   1  打贏第 1 位（種子 lt106：金邊盤＋紅包「酬勞再給一次」）：字幕「對方似乎掉落了什麼……」（店主句一字不改）0 秒出、1.8 秒淡掉不用點；
//      錢袋、音符、紅包從面板頂邊跳出；三張蓋牌（金邊那張蓋著就有金邊）1.5 秒前不翻、1.5 秒起自己翻完；蓋牌、「不收」≥44×44；頂欄「紀錄」在；
//      錢的起點對（CRITIQUE 1.9b：酬勞那段從開打前的錢起跳、紅包另一段接著跳，不多算）；第一次出戰利品列老闆說一次「包包越厚…」（save.seen.firstLoot）；
//      「不收（+$400）」→ 錢 +400、三張都進唱片櫃「認識」、浮字「唱片櫃 +n」（n＝新認識的張數）；面板不捲動
//   2  接著第 2 位：收一張（翻開才能按）→ 進包包、記進 run.found；老闆那句不再說；櫃檯「賣給老闆」那張價籤「賣給老闆 $400（撿來的）」→ 賣掉 +$400、found 拿掉
//   3  菁英（第 4 位）：多一行「或改拿一件發燒配件」→ 改拿配件（配件 +1、包包不變）；配件滿 3 件：點配件 → 先選一件賣掉的面板 →「算了」→ 回到同一列（同三張、都翻開）→ 不收
//   4  減少動態（prefers-reduced-motion）：面板一出來三張就翻開、沒有翻牌動畫
//   5  「動畫加速」開著：0.6 秒起自己翻（1.2 秒內翻完）、字幕 0.9 秒淡掉
//   6  重新整理：停在同一列同三張（直接翻開、不再演錢）、頂欄「紀錄」還在；不收照樣 +$400、回來客
//   7  打完第 5 位（藏家、保底那箱 chestDry 5）：先演第一次收頂點卡（#465 送牌那段）→ 木箱（底下寫「這箱有好東西。」）1.2 秒自己掀 → 三張每 0.35 秒翻一張；
//      有一格鎮店盤格（src apex，C 波畫成金邊）、沒有頂點卡；保底計數歸 0（存檔 chestDry）；三條路：收這張／改拿一件配件／不收（+$400）（同一箱存檔各走一次，
//      後兩條是重新整理回來的那一箱）→ 升級 → 今天的攤位（來客畫面、run 還在）→ 再重新整理：run 還在、還是攤位（resumeRun 不刪整趟）
//   每項最後看主控台 0 錯誤。任何 FAIL → exit 1。
import { launch, newPage, SIZES as SIZES0, record, results, sleep, Q, jsClick, waitScreen, duelReady, tapAt, seededContinue, openTitle, advanceUntil, noScroll, scrollOk,
  watchSay, passLoot, lootState, lootReady, stallState, resolveHands } from './e2e-lib.mjs';

const SIZES = process.env.LAB_SIZES ? SIZES0 : [[390, 664], [375, 548]];
const ONLY = (process.env.LOOT_ONLY || '').split(',').filter(Boolean).map(Number);
const want = n => !ONLY.length || ONLY.includes(n);
const C = (page, f, a) => page.evaluate(f, a);
const DBG = process.env.LOOT_DEBUG ? (...a) => console.log('  ·', ...a) : () => {};
const errs = page => (page._errors || []).filter(e => !/favicon/.test(e));
const errTxt = page => `錯誤 ${errs(page).length}${errs(page).length ? '：' + errs(page).slice(0, 2).join(' / ') : ''}`;
const fill = (s, o) => String(s).replace(/\$?\{(\w+)\}/g, (m, k) => (o[k] != null ? (m[0] === '$' ? '$' : '') + o[k] : m));
const money = n => '$' + Number(n).toLocaleString('en-US');
const UI = page => C(page, () => Object.assign({}, window.DipLabContent.waveC.ui, { drop: window.DipLabContent.script.drop[0].text, foundSellN: window.DipLabContent.waveC.ui.foundSell }));

// 戰利品列的時間線記錄器：面板、字幕、蓋牌翻開、錢那條（cashRise）、浮字（吐司）各記下出現的時間（performance.now）
async function watchLoot(page) {
  await C(page, () => {
    const W = window, T = W.__lt = { sheet: null, cap: null, capOut: null, capGone: null, flipAll: null, firstUp: null, cash: [], toasts: [], downGold: 0, downN: 0, items: [], sizes: null };
    const now = () => performance.now();
    const look = () => {
      const s = document.querySelector('#panel .lb-sheet.reward.lt-sheet');
      if (s && T.sheet == null) {
        T.sheet = now(); T.downN = s.querySelectorAll('.lt-c.down').length; T.downGold = s.querySelectorAll('.lt-c.down.gold').length;
        const bx = sel => [...s.querySelectorAll(sel)].map(b => { const r = b.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; });
        T.sizes = { flip: bx('[data-flip]'), skip: bx('[data-a=skip]') };
      }
      const cap = document.querySelector('.lt-cap');
      if (cap && T.cap == null) { T.cap = now(); T.capText = cap.textContent; }
      if (cap && cap.classList.contains('out') && T.capOut == null) T.capOut = now();
      if (T.cap != null && !cap && T.capGone == null) T.capGone = now();
      if (s && T.firstUp == null && s.querySelector('.lt-c.up')) T.firstUp = now();
      const L = W.DipLabLoot && W.DipLabLoot.state();
      if (s && L && T.flipAll == null && L.flipped.every(Boolean) && s.querySelectorAll('.lt-c.up').length === L.flipped.length) T.flipAll = now();
      document.querySelectorAll('.lt-it').forEach(n => { if (!T.items.includes(n.className.replace(/\s*(pre|in|gone)\b/g, ''))) T.items.push(n.className.replace(/\s*(pre|in|gone)\b/g, '')); });
    };
    new MutationObserver(ms => {
      ms.forEach(m => m.addedNodes.forEach(n => {
        if (!n.classList) return;
        if (n.classList.contains('lb-toast') && n.classList.contains('cash')) T.cash.push({ t: now(), ce: (n.querySelector('.ce') || {}).textContent, cv0: (n.querySelector('.cv') || {}).textContent });
        else if (n.classList.contains('lb-toast')) T.toasts.push({ t: now(), text: n.textContent });
      }));
      look();
    }).observe(document.getElementById('app'), { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    T.iv = setInterval(look, 30);
  });
}
const ltT = page => C(page, () => { const T = window.__lt; const z = T.sheet || 0; const rel = x => (x == null ? null : Math.round(x - z));
  return { sheet: T.sheet != null, cap: rel(T.cap), capOut: rel(T.capOut), capGone: rel(T.capGone), capText: T.capText, firstUp: rel(T.firstUp), flipAll: rel(T.flipAll), downN: T.downN, downGold: T.downGold,
    cash: T.cash.map(c => ({ t: rel(c.t), ce: c.ce, cv0: c.cv0 })), toasts: T.toasts.map(c => ({ t: rel(c.t), text: c.text })), items: T.items, sizes: T.sizes }; });

// 來客畫面 → 下一位 → 對決 → 直接打贏（一般／菁英）
async function winGuest(page) {
  await page.waitForSelector('[data-a=go]', { timeout: 15000 });
  await sleep(300);
  await tapAt(page, '[data-a=go]');
  const ok = await duelReady(page, 25000);
  await resolveHands(page, 1, 'thoughtful');        // 打一手再贏：這場有紀錄（頂欄「紀錄」）
  await sleep(300);
  await C(page, () => window.__lab.forceWin());
  return ok;
}
// 藏家：下一位 → 進場對白 →「品味對決」→ 打贏 → 送牌那段（第一次收這張）的面板
async function beatBoss(page) {
  await page.waitForSelector('[data-a=go]', { timeout: 15000 });
  await jsClick(page, '[data-a=go]');
  await waitScreen(page, 'scene');
  for (let g = 0; g < 150 && !(await page.$('.lb-dq.hasmenu .lb-dqopt')); g++) { if (await page.$('.lb-dq .nx.on')) await jsClick(page, '.lb-dq'); await sleep(200); }
  await sleep(450);
  await jsClick(page, '.lb-dq .lb-dqopt');
  await waitScreen(page, 'duel');
  await page.waitForFunction(() => window.__lab.rawDuel() && !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
  await sleep(600);
  await C(page, () => window.__lab.forceWin());
  return advanceUntil(page, () => !!document.querySelector('#panel > .lb-sheet.one [data-i]') || window.__lab.screen() === 'reward', null, 30000);
}
async function setFast(page, on) {
  await C(page, on => { const s = JSON.parse(localStorage.getItem('dipGameLab_v1')); s.settings = Object.assign({}, s.settings, { fastAnim: !!on }); localStorage.setItem('dipGameLab_v1', JSON.stringify(s)); }, on);
}
// 存檔裡塞好 → 重新整理 → 標題「繼續」
async function contFrom(page, raw, q) {
  await openTitle(page, q);
  await C(page, raw => localStorage.setItem('dipGameLab_v1', raw), raw);
  await openTitle(page, q);
  await jsClick(page, '[data-a=cont]');
}
const recapLink = page => C(page, () => { const b = document.querySelector('#top [data-a=recap]'); if (!b) return false; const r = b.getBoundingClientRect(); return r.width > 0 && r.top >= 0; });

async function runSize(browser, w, h) {
  const size = `${w}x${h}`;

  // ---------------------------------------------------------------- 1＋2 第 1 位不收、第 2 位收一張、櫃檯撿來的價籤
  if (want(1) || want(2)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await seededContinue(page, { ace: 'hall', idx: 0, autoNext: true, seedKey: 'lt106' }, Q(''));
      await waitScreen(page, 'night', 20000); await sleep(800);
      const x = await UI(page);
      await watchSay(page);
      const m0 = await C(page, () => window.__lab.run.money);
      const seen0 = await C(page, () => !!window.__lab.save.seen.firstLoot);
      await watchLoot(page);
      await winGuest(page);
      await waitScreen(page, 'reward', 15000);
      await page.waitForFunction(() => window.__lt.flipAll != null, null, { timeout: 8000 }).catch(() => {});
      const p1 = await C(page, () => { const p = window.__lab.run.pending; return { kind: p.kind, cards: p.cards.slice(), src: p.src.slice(), packet: p.packet, skipCash: p.skipCash, money: window.__lab.run.money }; });
      const sc1 = await noScroll(page);
      const sheetSc = await C(page, () => { const s = document.querySelector('.lb-sheet.reward'); return s.scrollHeight - s.clientHeight; });
      const rc1 = await recapLink(page);
      // 錢、經驗兩條收掉之後老闆說一次（約 1.35＋3 秒）
      await page.waitForFunction(() => window.__lab.save.seen.firstLoot, null, { timeout: 8000 }).catch(() => {});
      await sleep(300);
      const said = await C(page, t => (window.__said || []).filter(s => s.t === t).length + window.__lt.toasts.filter(s => s.text === t).length, fill(x.firstLoot, { n: '400' }));
      const T = await ltT(page);
      if (want(1)) {
        // 不收（+$400）：真點
        const shelf0 = await C(page, ids => ids.map(id => !!window.__lab.save.shelf[id]), p1.cards);
        const newN = shelf0.filter(v => !v).length;
        const mA = await C(page, () => window.__lab.run.money);
        const tapped = await tapAt(page, '.lb-sheet.reward [data-a=skip]').then(() => true, () => false);
        await page.waitForFunction(() => { const p = window.__lab.run.pending; return !p || p.type !== 'reward'; }, null, { timeout: 5000 }).catch(() => {});
        await sleep(200);
        const a1 = await C(page, ids => ({ money: window.__lab.run.money, shelf: ids.map(id => !!window.__lab.save.shelf[id]), bagHas: ids.filter(id => window.__lab.run.bag.includes(id)).length, toasts: window.__lt.toasts.map(t => t.text) }), p1.cards);
        const gold = p1.src.filter(s => s === 'gold').length;
        const pk = p1.packet && p1.packet.kind === 'cash' ? p1.packet.n : 0;
        // 錢那條：第一段（酬勞）從開打前的錢起跳；第二段（紅包）接著第一段的終點起跳
        const earn = p1.money - m0 - pk;
        const c0 = T.cash[0] || {}, c1 = T.cash[1] || {};
        const cashOk = T.cash.length >= 1 && c0.cv0 === money(m0) && c0.ce === '+' + money(earn) && (!pk || (T.cash.length >= 2 && c1.cv0 === money(m0 + earn) && c1.ce === '+' + money(pk)));
        const sz = T.sizes || { flip: [], skip: [] };
        const big = sz.flip.length === 3 && sz.flip.every(([bw, bh]) => bw >= 44 && bh >= 44) && sz.skip.every(([bw, bh]) => bw >= 44 && bh >= 44);
        const plus = a1.toasts.filter(t => t === fill(x.shelfPlus, { n: newN })).length;
        const ok = p1.kind === 'loot' && p1.cards.length === 3 && T.capText === x.drop && x.drop === '對方似乎掉落了什麼……' && T.cap != null && T.cap <= 300 &&
          T.capOut != null && T.capOut >= 1500 && T.capOut <= 2300 && T.capGone != null && T.capGone <= 2800 &&
          T.downN === 3 && T.downGold === gold && gold >= 1 && T.firstUp != null && T.firstUp >= 1400 && T.flipAll != null && T.flipAll <= 2700 &&
          T.items.some(c => /\bbag\b/.test(c)) && T.items.some(c => /\bnote\b/.test(c)) && (!pk || T.items.some(c => /\bpk\b/.test(c))) &&
          cashOk && big && rc1 && scrollOk(sc1) && sheetSc <= 1 && !seen0 && said === 1 &&
          tapped && a1.money === mA + 400 && a1.shelf.every(Boolean) && a1.bagHas === 0 && (newN === 0 || plus === 1);
        record(1, size, ok && !errs(page).length, `字幕「${T.capText}」${T.cap}→淡 ${T.capOut}→收 ${T.capGone} ms（不用點）；蓋牌 ${T.downN}（金邊蓋著 ${T.downGold}／src gold ${gold}）第一張翻 ${T.firstUp}、翻完 ${T.flipAll} ms；` +
          `跳出 ${JSON.stringify(T.items)}；錢 ${m0}→${p1.money}（酬勞 ${earn}、紅包 ${pk}）那條 ${JSON.stringify(T.cash)} ${cashOk}；鈕 ${JSON.stringify(sz)} ≥44 ${big}；紀錄 ${rc1}；捲動 ${JSON.stringify(sc1)}/${sheetSc}；` +
          `老闆那句 ${said} 次；不收 → 錢 ${mA}→${a1.money}、唱片櫃 ${JSON.stringify(a1.shelf)}（新 ${newN}，浮字 ${plus}）；${errTxt(page)}`);
      } else await passLoot(page, {});
      if (want(2)) {
        DBG('2 start', await C(page, () => window.__lab.screen()));
        await passLoot(page, { until: 'night', ms: 4000 });       // 1 沒跑時：這裡把第 1 位過掉
        DBG('2 night?', await C(page, () => window.__lab.screen()));
        await waitScreen(page, 'night', 15000); await sleep(800);
        await C(page, () => { window.__said = []; window.__lt.toasts = []; });
        await winGuest(page);
        DBG('2 won');
        const pl = await passLoot(page, { take: true, until: 'choice' });
        DBG('2 took', JSON.stringify(pl));
        await sleep(300);
        const a2 = await C(page, id => ({ bag: window.__lab.run.bag.includes(id), found: (window.__lab.run.found || []).includes(id) }), pl.picked);
        await passLoot(page, {});
        await waitScreen(page, 'night', 15000); await sleep(800);
        const said2 = await C(page, t => (window.__said || []).filter(s => s.t === t).length + window.__lt.toasts.filter(s => s.text === t).length, fill(x.firstLoot, { n: '400' }));
        DBG('2 counter');
        // 櫃檯（真點熱點）→ 賣給老闆 → 撿來的那張：價籤「賣給老闆 $400（撿來的）」→ 賣掉
        await C(page, () => window.DipLabEcon.openRelicShop({ tab: 'sell' })); await sleep(900);
        const tile = await C(page, id => { const b = document.querySelector('.ec-cs[data-cid="' + CSS.escape(id) + '"]'); return b ? { tag: (b.querySelector('.ec-sv') || {}).textContent || '', aria: b.getAttribute('aria-label') || '' } : null; }, pl.picked);
        if (tile) await tapAt(page, `.ec-cs[data-cid="${pl.picked.replace(/"/g, '\\"')}"]`);
        await sleep(400);
        const go = await C(page, () => (document.querySelector('[data-a=cgo]') || {}).textContent || '');
        const mB = await C(page, () => window.__lab.run.money);
        if (go) await tapAt(page, '[data-a=cgo]');
        await sleep(600);
        const a3 = await C(page, id => ({ money: window.__lab.run.money, bag: window.__lab.run.bag.includes(id), found: (window.__lab.run.found || []).includes(id) }), pl.picked);
        await C(page, () => window.DipLabEcon.close()); await sleep(300);
        const ok = pl.ok && !!pl.picked && a2.bag && a2.found && said2 === 0 && !!tile && go === fill(x.foundSellN, { n: '400' }) && go === '賣給老闆 $400（撿來的）' &&
          a3.money === mB + 400 && !a3.bag && !a3.found;
        record(2, size, ok && !errs(page).length, `收 ${pl.picked} → 包包 ${a2.bag}、found ${a2.found}；老闆那句再說 ${said2} 次；櫃檯格 ${JSON.stringify(tile)}、確認鈕「${go}」→ 賣掉 ${mB}→${a3.money}、包包 ${a3.bag}、found ${a3.found}；${errTxt(page)}`);
      }
    } catch (e) { record(want(1) ? 1 : 2, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 3 菁英：改拿配件；配件滿 3 件「算了」回同一列
  if (want(3)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await seededContinue(page, { ace: 'hall', idx: 3, autoNext: true }, Q('&fast=1'));
      await waitScreen(page, 'night', 20000); await sleep(600);
      const x = await UI(page);
      const cls = await C(page, () => window.DipLabEngine.roundGuests(window.__lab.run, window.DipLabContent)[3].cls);
      const snap = await C(page, () => localStorage.getItem('dipGameLab_v1'));
      await winGuest(page);
      await waitScreen(page, 'reward', 15000); await lootReady(page);
      const s0 = await C(page, () => { const s = document.querySelector('.lb-sheet.reward'); return { cap: (s.querySelector('.orr .cap') || {}).textContent || '', r: [...s.querySelectorAll('[data-r]')].map(b => b.getAttribute('data-r')), relics: window.__lab.run.relics.slice(), bag: window.__lab.run.bag.length, need: window.__lab.run.pending.need || null }; });
      const pl = await passLoot(page, { relic: true });
      const a = await C(page, () => ({ relics: window.__lab.run.relics.slice(), bag: window.__lab.run.bag.length, scr: window.__lab.screen() }));
      const okA = cls === 'elite' && s0.cap === x.orRelic && s0.r.length >= 1 && pl.ok && a.relics.length === s0.relics.length + 1 && a.relics.includes(pl.picked) && a.bag === s0.bag && a.scr === 'night';
      // 配件滿 3 件：點配件 → 先選一件賣掉 →「算了」→ 回到同一列 → 不收
      const full = await C(page, raw => { const s = JSON.parse(raw); s.run.relics = ['dustcover', 'stylus', 'boost_c'].filter(id => window.DipLabContent.relics[id]); return JSON.stringify(s); }, snap);
      await contFrom(page, full, Q('&fast=1'));
      await waitScreen(page, 'night', 20000); await sleep(600);
      await winGuest(page);
      await waitScreen(page, 'reward', 15000); await lootReady(page);
      const c0 = await C(page, () => window.__lab.run.pending.cards.slice());
      await tapAt(page, '.lb-sheet.reward [data-r]');
      const panel = await page.waitForSelector('.lb-sheet.relics', { timeout: 5000 }).then(() => true, () => false);
      if (panel) await tapAt(page, '.lb-sheet.relics [data-a=cancel]');
      await page.waitForSelector('.lb-sheet.reward.lt-sheet', { timeout: 5000 }).catch(() => {});
      await sleep(400);
      const back = await C(page, () => ({ cards: window.__lab.run.pending && window.__lab.run.pending.cards.slice(), st: window.DipLabLoot.state(), up: document.querySelectorAll('.lb-sheet.reward .lt-c.up').length, relics: window.__lab.run.relics.length }));
      const m1 = await C(page, () => window.__lab.run.money);
      const sk = await passLoot(page, {});
      const m2 = await C(page, () => window.__lab.run.money);
      const okB = panel && JSON.stringify(back.cards) === JSON.stringify(c0) && back.up === 3 && back.st && back.st.flipped.every(Boolean) && back.relics === 3 && sk.ok && m2 === m1 + 400;
      record(3, size, okA && okB && !errs(page).length, `第 4 位 ${cls}：「${s0.cap}」配件 ${JSON.stringify(s0.r)} → 改拿 ${pl.picked}：配件 ${s0.relics.length}→${a.relics.length}、包包 ${s0.bag}→${a.bag}、${a.scr}；` +
        `滿 3 件：先賣一件的面板 ${panel} →「算了」回同一列 ${JSON.stringify(back.cards) === JSON.stringify(c0)}（翻開 ${back.up}）→ 不收 ${m1}→${m2}；${errTxt(page)}`);
    } catch (e) { record(3, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 4 減少動態
  if (want(4)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await seededContinue(page, { ace: 'hall', idx: 0, autoNext: true, seedKey: 'lt106' }, Q(''));
      await waitScreen(page, 'night', 20000); await sleep(800);
      await watchLoot(page);
      await winGuest(page);
      await waitScreen(page, 'reward', 15000);
      await page.waitForFunction(() => window.__lt.sheet != null, null, { timeout: 8000 }).catch(() => {});
      const T = await ltT(page);
      const st = await C(page, () => ({ L: window.DipLabLoot.state(), up: document.querySelectorAll('.lb-sheet.reward .lt-c.up').length, turn: document.querySelectorAll('.lb-sheet.reward .lt-c.turn').length, pick: document.querySelectorAll('.lb-sheet.reward [data-pick]:not([disabled])').length }));
      const sk = await passLoot(page, {});
      const ok = T.downN === 0 && st.up === 3 && st.turn === 0 && st.pick === 3 && st.L && st.L.flipped.every(Boolean) && T.flipAll != null && T.flipAll <= 150 && sk.ok && sk.screen === 'night';
      record(4, size, ok && !errs(page).length, `減少動態：面板一出來蓋著 ${T.downN}、翻開 ${st.up}（${T.flipAll} ms）、翻牌動畫 ${st.turn}、收這張可按 ${st.pick}；不收 → ${sk.screen}；${errTxt(page)}`);
    } catch (e) { record(4, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 5 動畫加速
  if (want(5)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await openTitle(page, Q(''));
      const { seedRun } = await import('./e2e-lib.mjs');
      await seedRun(page, { ace: 'hall', idx: 0, autoNext: true, seedKey: 'lt106' });
      await setFast(page, true);
      await openTitle(page, Q('')); await jsClick(page, '[data-a=cont]');
      await waitScreen(page, 'night', 20000); await sleep(800);
      const fast = await C(page, () => !!window.__lab.save.settings.fastAnim);
      await watchLoot(page);
      await winGuest(page);
      await waitScreen(page, 'reward', 15000);
      await page.waitForFunction(() => window.__lt.flipAll != null && window.__lt.capOut != null, null, { timeout: 6000 }).catch(() => {});
      const T = await ltT(page);
      const sk = await passLoot(page, {});
      const ok = fast && T.downN === 3 && T.firstUp != null && T.firstUp >= 500 && T.flipAll != null && T.flipAll <= 1200 && T.capOut != null && T.capOut >= 700 && T.capOut <= 1300 && sk.ok;
      record(5, size, ok && !errs(page).length, `動畫加速 ${fast}：第一張翻 ${T.firstUp}、翻完 ${T.flipAll} ms（≤1200）；字幕淡 ${T.capOut} ms；${errTxt(page)}`);
    } catch (e) { record(5, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 6 重新整理：同一列同三張
  if (want(6)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await seededContinue(page, { ace: 'hall', idx: 0, autoNext: true, seedKey: 'lt302' }, Q(''));
      await waitScreen(page, 'night', 20000); await sleep(800);
      await winGuest(page);
      await waitScreen(page, 'reward', 15000); await sleep(500);
      const c0 = await C(page, () => window.__lab.run.pending.cards.slice());
      await openTitle(page, Q('')); await jsClick(page, '[data-a=cont]');
      await waitScreen(page, 'reward', 15000);
      await page.waitForSelector('.lb-sheet.reward.lt-sheet', { timeout: 8000 }).catch(() => {});
      await sleep(250);
      const r1 = await C(page, () => ({ cards: window.__lab.run.pending.cards.slice(), kind: window.__lab.run.pending.kind, L: window.DipLabLoot.state(), up: document.querySelectorAll('.lb-sheet.reward .lt-c.up').length,
        drops: document.querySelectorAll('.lt-it').length, cap: !!document.querySelector('.lt-cap'), cash: document.querySelectorAll('.lb-toast.cash').length }));
      const rc = await recapLink(page);
      const m1 = await C(page, () => window.__lab.run.money);
      const sk = await passLoot(page, {});
      const m2 = await C(page, () => window.__lab.run.money);
      const ok = JSON.stringify(r1.cards) === JSON.stringify(c0) && r1.kind === 'loot' && r1.up === 3 && r1.L && r1.L.flipped.every(Boolean) && r1.drops === 0 && !r1.cap && r1.cash === 0 && rc && sk.ok && sk.screen === 'night' && m2 === m1 + 400;
      record(6, size, ok && !errs(page).length, `重新整理：同三張 ${JSON.stringify(r1.cards) === JSON.stringify(c0)}、直接翻開 ${r1.up}、不再演錢（錢袋 ${r1.drops}、字幕 ${r1.cap}、錢那條 ${r1.cash}）、紀錄 ${rc}；不收 ${m1}→${m2}、${sk.screen}；${errTxt(page)}`);
    } catch (e) { record(6, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 7 藏家寶箱（保底那箱）三條路
  if (want(7)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await seededContinue(page, { ace: 'hall', idx: 4, autoNext: true }, Q(''));
      await waitScreen(page, 'night', 20000); await sleep(800);
      const x = await UI(page);
      await C(page, () => { window.__lab.run.chestDry = 5; window.__lab.save.chestDry = 5; });
      await watchLoot(page);
      const got = await beatBoss(page);
      const one = await C(page, () => !!document.querySelector('#panel > .lb-sheet.one [data-i]'));
      if (one) { await sleep(400); await tapAt(page, '#panel > .lb-sheet.one [data-i="0"]'); }
      await waitScreen(page, 'reward', 15000);
      await page.waitForSelector('.lb-sheet.reward.lt-sheet', { timeout: 8000 }).catch(() => {});
      await sleep(150);
      const shut = await C(page, () => { const cr = document.querySelector('.lb-sheet.reward .lt-crate'); return { crate: !!cr, pity: cr ? (cr.querySelector('.pt') || {}).textContent || '' : '', L: window.DipLabLoot.state(), kind: window.__lab.run.pending.kind }; });
      const snap = await C(page, () => localStorage.getItem('dipGameLab_v1'));
      const t0 = Date.now();
      await page.waitForFunction(() => { const L = window.DipLabLoot.state(); return L && L.open; }, null, { timeout: 4000 }).catch(() => {});
      const tOpen = Date.now() - t0;
      await page.waitForFunction(() => { const L = window.DipLabLoot.state(); return L && L.open && L.flipped.every(Boolean); }, null, { timeout: 5000 }).catch(() => {});
      const tAll = Date.now() - t0;
      const p = await C(page, () => { const R = window.__lab.run, p = R.pending, Cn = window.DipLabContent; return { cards: p.cards.slice(), src: p.src.slice(), apexSlot: (p.apexSlot || []).slice(),
        apexCards: p.cards.filter(id => (Cn.cards[id] || {}).tier || (Cn.apexTrialOnly || []).includes(id)).length, dry: R.chestDry, saveDry: window.__lab.save.chestDry, gold: document.querySelectorAll('.lb-sheet.reward .lt-c.gold').length }; });
      const okShow = got && one && shut.crate && shut.kind === 'chest' && shut.pity === x.chestPity && !shut.L.open && tOpen >= 700 && tOpen <= 2200 && tAll <= 3800 &&
        p.cards.length === 3 && p.src.includes('apex') && p.apexCards === 0 && p.dry === 0 && p.saveDry === 0 && p.gold >= 1;
      // 三條路：收這張（剛打完那箱）／改拿配件、不收（重新整理回來那一箱）
      const paths = [];
      for (const how of ['take', 'relic', 'skip']) {
        if (how !== 'take') {
          await contFrom(page, snap, Q(''));
          await waitScreen(page, 'reward', 15000); await lootReady(page);
        }
        const b0 = await C(page, () => ({ money: window.__lab.run.money, bag: window.__lab.run.bag.length, relics: window.__lab.run.relics.length, btn: (document.querySelector('.lb-sheet.reward .orr .cap') || {}).textContent || '' }));
        const pl = await passLoot(page, how === 'take' ? { take: true } : how === 'relic' ? { relic: true } : {});
        await sleep(600);
        const a = await stallState(page);
        const b1 = await C(page, () => ({ money: window.__lab.run && window.__lab.run.money, bag: window.__lab.run && window.__lab.run.bag.length, relics: window.__lab.run && window.__lab.run.relics.length,
          found: window.__lab.run && (window.__lab.run.found || []).length, run: !!window.__lab.run }));
        // 再重新整理：run 還在、還是今天的攤位
        await openTitle(page, Q('')); await jsClick(page, '[data-a=cont]');
        await waitScreen(page, 'night', 15000); await sleep(900);
        const rr = await stallState(page);
        const okP = pl.ok && a.screen === 'night' && a.stall && a.rows === 2 && !a.go && b1.run &&
          (how === 'take' ? b1.bag === b0.bag + 1 && b1.found >= 1 : how === 'relic' ? b1.relics === b0.relics + 1 && b1.bag === b0.bag && b0.btn === x.chestRelic : b1.money === b0.money + 400 && b1.bag === b0.bag) &&
          rr.stall && rr.screen === 'night' && rr.rows === 2;
        paths.push(`${how} ${okP}（錢 ${b0.money}→${b1.money}、包包 ${b0.bag}→${b1.bag}、配件 ${b0.relics}→${b1.relics}；之後 ${a.screen} 攤位 ${a.stall}/${a.rows} 列；重新整理 ${rr.screen} 攤位 ${rr.stall}）`);
        if (!okP) paths.ok = false;
      }
      record(7, size, okShow && paths.ok !== false && !errs(page).length, `送牌那段 ${one}；木箱 ${shut.crate}「${shut.pity}」${tOpen} ms 自己掀、${tAll} ms 翻完；${JSON.stringify(p)}；${paths.join('；')}；${errTxt(page)}`);
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
