// game-lab/tests/e2e.spec.mjs：品味對決 v4 端對端測試（SPEC-v4 §5.5；B2）。保留 v3 的情境編號，內容換成 v4；v5 無限試煉（SPEC 無限試煉 §4 第二棒）改 #7 #9 #11 #13 #33，加 #45–#48。
// 純 node 腳本（不用 @playwright/test）：
//   LAB_BASE=http://localhost:8782 node game-lab/tests/e2e.spec.mjs
//   共用函式從 tests/e2e-lib.mjs（A3）import：launch／newPage／openTitle／duelReady／tapAt／noScroll…；網址讀 LAB_URL 或 LAB_BASE。
//   環境變數：LAB_SIZES（預設四個驗收尺寸 390x664,375x548,430x932,360x640）、LAB_ONLY（例 "1,3,19"）、
//            LAB_FULL=1：每個尺寸都跑全部情境（預設：版面情境＋店主點名的流程四個尺寸都跑，其餘流程只在第一個尺寸跑；
//                       #19 在第一個尺寸跑三張王牌，其他尺寸只跑流亡（含 #20 擋錯招））
//            LAB_ECON：'stub'｜'real'（預設：game-lab/econ.js 在就用真的，不在就用 tests/econ-stub.js 替身——B3 的經濟介面在 C 整合時才進來）
// 試聽一律換成 20 秒的無聲 WAV（不靠網路）。每個情境印 PASS／FAIL；任何一個 FAIL → exit 1。只有 Chromium。
//
// 情境（v4，§5.5）：
//   1 開頁：標題 2.5 s 內、兩顆推門鈕在畫面內、沒有捲動
//   3 推門到第一手（猜歌、挑王牌、收下四張、特價三張、收下、接受對決（手伸進袋子））≤16 下（特價區用替身時照真的面板算 4 下）
//   4 對決版面（v4 名字）：e-hint e-rec tri rounds 手牌（疊成一排的 5 張＋王牌）的下緣都 ≤ innerHeight；點一張打開之後三顆屬性鈕也在畫面裡；誠實度名牌看不到（D §5）
//   6 點擊區：屬性鈕 ≥44×44、手牌封面 ≥44×44、頂欄鈕 ≥40×44；數字 ≥12px（FIXLIST 11：沒有星鈕列、沒有丟！）
//   7 序章打贏 → 地上的唱片撿起面板（沒有標題字，只有封面、藝人《專輯》、兩顆鈕）→ 配件三選一 → 來客（第 1 輪五顆頭像）且第一位客人已在店裡
//   8 序章打輸 →「……再一場。」→ 同一位男子、聲望回滿
//   9 一整趟 autoplay('thoughtful',{until:'end'})：序章 → 打到第 4 位以後 __lab.loseNext(1,{noRetry})（無限試煉不會自己結束）→ 結算三件事（走到第 n 位・最多連贏・收了幾張）、
//     升級三選一由 autoplay 自動挑（picks＝等級−1）、標題紀錄「最遠」→ 13 再挑戰一趟（挑王牌 → 走到特價箱挑三張 → 來客、包包 7、runNo 2；上一趟的配件還在）
//  10 續玩：打到第 2 手重新整理 → 繼續試煉 → 同一場、同一手
//  11 存檔只寫 dipGameLab_v1、版本 5；v3 存檔被安全丟掉；v4 存檔遷移（唱片櫃、配件留著，一晚的 run 丟掉，nights → runs）
//  12 網路：沒有 Firebase
//  14 長按手牌封面＝唱片資訊（疊著也行）；點一下＝在那張打開、再點一下＝收回（都不開唱片資訊；v5 手風琴）
//  16 標題有存檔時點兩下店門＝繼續試煉
//  17 他在上、你在下；舞台他左你右、老闆在中間；一台唱盤在兩人中間
//  18 每張專輯都開得了唱片資訊：手牌（長按）、王牌（長按）、牌桌兩張、猜歌面板、挑唱片面板、唱片櫃、牆上的（抽屜與特價箱：真的經濟介面才測）
//  19 教學三王牌六手照課表：每手 kind／toE／toP＝C.tutorial.expect、第 6 手 KO、學到 L1–L6、tutorialDone
//  20 教學擋錯招：第 1 手點疊著那排的別張、第 2 手點打開那張的別色屬性鈕（都在遮罩上）→「先點我指的這裡。」、手數不前進（第 1 手沒打開、第 2 手沒丟出去）
//  21 直接開打：沒有遮罩、男子 10 聲望；21b 教學程式不在（canTutorial 假）：兩顆鈕都在，第 0 顆照課表出牌（他 18、第一手 Mylo Xyloto）、沒有遮罩
//  22 不捲動：標題、對決、來客、挑唱片、規則卡、撿起面板（升級面板、結算：#46、#48）
//  27 無縫接軌：來客 → 對決 → 挑唱片 → 來客，#stage canvas 是同一個節點；黑條只在 #stage 裡、≤1.6 s
//  29 主控台 0 錯誤
//  33 老闆說情：輸一次 → 同一位、聲望回到開打前（帶傷 9/12 進場 → 重打還是 9）；再輸 → 散場（結算）
//  35 跳過教學＋重新整理不會重開教學
//  36 ⏸ 回標題會結束教學；之後的直接開打不被教學劫持
//  37 連點安全：推門 ×2、下一位 ×2、台北 ×2
//  38 傳說藏家登場卡擋點擊、點一下提早收掉
//  39 規則卡六行＝D 規則卡逐字、頁尾聲望代入（你開局 12 聲望（升級會加）、品味／底氣那句）、不捲動；公告＝規則卡；重看教學帶得起來
//  40 375×548 等矮螢幕：有存檔時「再按一次就放棄這一趟」那行在畫面內
//  41（新）贏一位 →「+$1,500」吐司（千分位，FIXLIST 8）、來客顯示錢
//  42（新）序章與對決中真點箱子 → 老闆泡泡「打完再翻。」、不開抽屜
//  43（新）櫃檯：來客＝配件面板（openRelicShop）、序章＝老闆一句
//  44（新）序章途中重新整理：特價箱還沒挑 → 從頭開始；挑過了 → 直接到對決
//  45（v5）來客：頂欄只寫「第 n 位」（沒有時間、打烊、今晚）；「第 R 輪」＋離下個中繼點還有 N 位＋說情剩幾次；五顆頭像寫第 n 位（照 engine.roundGuests）；
//      下一位鈕「下一位：第 n 位　名字 ▸」；聲望那顆＝run.hp/maxHp，點開看等級、經驗、品味、底氣、上限；不捲動
//  46（v5）升級三選一：打贏 → 收唱片 → 升級面板（三顆大鈕、第一顆是品味或底氣、沒有「算了」、不捲動）；連升兩級＝面板開兩次；選完到下一位；重新整理回到升級面板
//  47（v5）打倒傳說藏家（第 5 位）：他的王牌收進唱片櫃 → 領獎 → 下一輪（第 6 位、五張新面孔、說情重設）；沒有結算畫面；
//      第二輪再打倒他（第 10 位）：不再演送牌那段、領獎畫面也不補說那句（審查 #18、#2）
//  48（v5）中繼點＋吐司＋結算：__lab.jump(第 9 位) 打贏 →「+$…・聲望 +n」吐司在領獎畫面看得到 ≥1 秒 → 走到第 10 位＝來客畫面的中繼點吐司（看得到 ≥1 秒）、save.best.checkpoints、
//      離下個中繼點還有 10 位；跳到第 23 位、loseNext → 結算三件事（走到第 23 位、最多連贏、收了幾張）、中繼點那行、牆一排、底下兩顆鈕不用捲；
//      再挑戰一趟前標題「最遠：第 23 位」、「看上一趟結算」
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { launch, newPage as newPage0, record, results, sleep, Q, SIZES, ALLOWED_LS, screen, waitScreen, jsClick, tapAt, duelReady, openTitle, noScroll, scrollOk,
  answerBargain, prologueToDuel as prologueToDuel4, seedRun as seedRun4, seededContinue as seededContinue4, advanceUntil, resolveHands, longPress, infoOpen, closeInfo,
  watchSay, econCalls, tapHot, waitStep, walkTutorial as walkTutorial4 } from './e2e-lib.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const LAB = path.resolve(HERE, '..');
const ONLY = process.env.LAB_ONLY ? new Set(process.env.LAB_ONLY.split(',').map(Number)) : null;
const YOU_HP = createRequire(import.meta.url)(path.join(LAB, 'engine.js')).CFG.playerHp;   // 你的聲望（FIXLIST 11 H5-1：9）
const FULL = process.env.LAB_FULL === '1';
const LAYOUT = new Set([1, 3, 4, 6, 10, 16, 17, 18, 19, 20, 22, 27, 29, 33, 35, 36, 39, 40, 41, 42, 45, 46, 48]);
const ECON = process.env.LAB_ECON || (fs.existsSync(path.join(LAB, 'econ.js')) ? 'real' : 'stub');
const STUB = fs.readFileSync(path.join(HERE, 'econ-stub.js'), 'utf8');
// D §5 規則卡六行（店主拍板，逐字；第 6 行照 FIXLIST 2／3 改：王牌沒有「不會被剋」、六手比聲望條剩幾成）
const RULE_LINES = [
  '每張專輯有經典／冷門／硬蕊三個星數。',
  '每一手，你和他各暗中挑一張專輯、一個屬性，同時亮出。',
  '冷門剋經典、經典剋硬蕊、硬蕊剋冷門：剋中，就用你那個屬性的星數扣他聲望。',
  '被剋的一方高 2 星以上，剋不動，改成比星數。',
  '沒有相剋就比星數，高的扣差額；一樣大不扣。',
  '提示會暗示他這手的打算，但有些人會唬你。王牌 7 星，一場用一次。六手內沒分出勝負，比誰的聲望條剩得多。'
];
let FIRST = true;
const want = n => (!ONLY || ONLY.has(n)) && (FULL || FIRST || LAYOUT.has(n));

// 無聲 WAV（試聽一律換成它）
function silentWav(sec = 1, rate = 8000) {
  const n = sec * rate, b = Buffer.alloc(44 + n * 2);
  b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVE', 8); b.write('fmt ', 12); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
  b.writeUInt32LE(rate, 24); b.writeUInt32LE(rate * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(n * 2, 40);
  return b;
}
const WAV = silentWav(20);
async function newPage(browser, w, h, o = {}) {
  const r = await newPage0(browser, w, h, o);
  r.page._econStub = ECON === 'stub';
  if (ECON === 'stub') {
    await r.page.route(/\/game-lab\/econ\.js(\?|$)/, rt => rt.fulfill({ contentType: 'application/javascript', body: STUB }));
    await r.page.route(/\/game-lab\/econ\.css(\?|$)/, rt => rt.fulfill({ contentType: 'text/css', body: '' }));
  }
  if (o.noTutorial) await r.page.route(/\/game-lab\/tutorial\.js(\?|$)/, rt => rt.fulfill({ contentType: 'application/javascript', body: '/* e2e #21b：教學程式不在 */' }));
  await r.page.route(/^https:\/\/audio-ssl\.itunes\.apple\.com\//, rt => rt.fulfill({ status: 200, contentType: 'audio/wav', headers: { 'access-control-allow-origin': '*' }, body: WAV }));
  return r;
}

// =============================================================================== 情境
async function run() {
  console.log(`e2e.spec v4：${SIZES.map(s => s.join('x')).join(', ')}；經濟介面＝${ECON === 'stub' ? '替身（tests/econ-stub.js）' : 'game-lab/econ.js'}`);
  const browser = await launch();
  for (const [w, h] of SIZES) {
    const size = `${w}x${h}`;
    const errsBySize = [];
    const track = page => errsBySize.push(page);

    // #1 開頁 ＋ #22 標題不捲動
    if (want(1)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        const ms = await openTitle(page);
        const r = await page.evaluate(() => { const a = document.querySelector('[data-a=push]').getBoundingClientRect(), b = document.querySelector('[data-a=quiet]').getBoundingClientRect(); return { a: a.bottom, b: b.bottom, vh: innerHeight, plate: !!document.querySelector('.lb-plate') }; });
        const sc = await noScroll(page);
        record(1, size, ms < 2500 && r.a <= r.vh && r.b <= r.vh && r.plate && scrollOk(sc), `title ${ms} ms, buttons bottom ${Math.round(r.a)}/${Math.round(r.b)} ≤ ${r.vh}, scroll ${JSON.stringify(sc)}`);
      } catch (e) { record(1, size, false, e.message); }
      await ctx.close();
    }

    // #3 推門到第一手 ＋ #4 版面 ＋ #6 點擊區 ＋ #17 兩邊分明 ＋ #22 對決不捲動 ＋ #14 長按 ＋ #18（猜歌面板、對決的封面）
    if (want(3) || want(4) || want(6) || want(17) || want(14) || want(18) || want(22)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await openTitle(page);
        page._clicks = 0;
        await page.click('[data-a=quiet]'); page._clicks++;
        // #18 猜歌面板的封面（看一眼再作答，不算點擊數）
        let guessInfo = 'skip';
        const onGuess = async () => {
          await sleep(300);
          const ok0 = await jsClick(page, '.lb-sheet.guess .lb-ct [data-info][data-cid]');
          guessInfo = ok0 ? await infoOpen(page) : 'missing';
          if (guessInfo === true) await closeInfo(page);
        };
        const ok = await prologueToDuel4(page, 'direct', null, { onGuess: want(18) ? onGuess : null });
        const ready = ok && await duelReady(page);
        if (want(3)) record(3, size, ready && page._clicks <= 16, `prologue → first hand in ${page._clicks} taps (≤16; ready=${ready})`);
        if (ready) {
          if (want(4)) {
            const r = await page.evaluate(() => {
              const names = ['e-hint', 'e-rec', 'tri', 'rounds', 'hand', 'hand-ace', 'hand-0', 'hand-1', 'hand-2', 'hand-3', 'hand-4'];
              const out = {}; names.forEach(n => { const e = document.querySelector('.dl [data-tut="' + n + '"]'); out[n] = e ? Math.round(e.getBoundingClientRect().bottom) : -1; });
              const hon = document.querySelector('.dl [data-tut="e-honesty"]');
              const honVis = !!hon && hon.getBoundingClientRect().height > 0 && getComputedStyle(hon).display !== 'none' && !hon.hidden;
              const hint = (document.querySelector('.dl [data-tut="e-hint"] .tx') || {}).textContent || '';
              return { out, vh: innerHeight, honVis, hint, attrWord: /經典|冷門|硬蕊/.test(hint), old: document.querySelectorAll('.dl .chip, .dl [data-tut=throw]').length };
            });
            // 點第 0 張（打開）：三顆屬性鈕都在畫面裡
            await tapAt(page, 'dt:card-0'); await sleep(300);
            const ab = await page.evaluate(() => [...document.querySelectorAll('.dl .pop .ab')].map(b => { const r = b.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.bottom)]; }));
            await page.evaluate(() => window.DipLabDuel.select(null)); await sleep(250);
            const bad = Object.entries(r.out).filter(([k, v]) => v < 0 || v > r.vh);
            record(4, size, !bad.length && ab.length === 3 && ab.every(([t, b]) => t >= 0 && b <= r.vh) && !r.old && !r.honVis && r.hint && !r.attrWord, `bottoms ${JSON.stringify(r.out)} ≤ ${r.vh}; 屬性鈕 ${JSON.stringify(ab)}; 舊星鈕／丟！${r.old}; honesty visible ${r.honVis}; hint「${r.hint}」${bad.length ? ' BAD ' + JSON.stringify(bad) : ''}`);
          }
          if (want(6)) {
            await tapAt(page, 'dt:card-1'); await sleep(300);
            const r = await page.evaluate(() => {
              const small = [];
              const hit = el => { const b = el.getBoundingClientRect(); let w0 = b.width, h0 = b.height;
                for (const ps of ['::before', '::after']) { const cs = getComputedStyle(el, ps); if (!cs || cs.content === 'none' || cs.position !== 'absolute' || cs.pointerEvents === 'none') continue;
                  const t = parseFloat(cs.top) || 0, bt = parseFloat(cs.bottom) || 0, l = parseFloat(cs.left) || 0, r = parseFloat(cs.right) || 0;
                  h0 = Math.max(h0, b.height - Math.min(0, t) - Math.min(0, bt)); w0 = Math.max(w0, b.width - Math.min(0, l) - Math.min(0, r)); }
                return { w: w0, h: h0 }; };
              const abs = document.querySelectorAll('.dl .pop .ab');
              if (abs.length !== 3) small.push('屬性鈕 ' + abs.length + ' 顆');
              abs.forEach(c => { const b = hit(c); if (b.w < 43.5 || b.h < 43.5) small.push(c.dataset.tut + ' ' + Math.round(b.w) + 'x' + Math.round(b.h)); });
              document.querySelectorAll('.dl .tile .cvw').forEach(c => { const b = c.getBoundingClientRect(); if (b.width < 43.5 || b.height < 43.5) small.push(c.dataset.tut + ' ' + Math.round(b.width) + 'x' + Math.round(b.height)); });
              document.querySelectorAll('#top button').forEach(b0 => { const b = b0.getBoundingClientRect(); const cs = getComputedStyle(b0, '::after'); const hh = b.height + (parseFloat(cs.top) < 0 ? -parseFloat(cs.top) * 2 : 0); if (b.width < 40 || hh < 44) small.push('top ' + b0.textContent + ' ' + Math.round(b.width) + 'x' + Math.round(hh)); });
              const fonts = []; document.querySelectorAll('.dl .pop .ab, .dl [data-tut=e-hp], .dl [data-tut=p-hp]').forEach(e => { const fs = parseFloat(getComputedStyle(e).fontSize); if (fs < 12) fonts.push(e.dataset.tut + ' ' + fs); });
              return { small, fonts };
            });
            await page.evaluate(() => window.DipLabDuel.select(null)); await sleep(250);
            record(6, size, !r.small.length && !r.fonts.length, `small ${JSON.stringify(r.small).slice(0, 200)} fonts ${JSON.stringify(r.fonts)}`);
          }
          if (want(17)) {
            const r = await page.evaluate(() => {
              const e = document.querySelector('.dl [data-tut=e-hud]').getBoundingClientRect(), p = document.querySelector('.dl [data-tut=p-hud]').getBoundingClientRect();
              const st = window.__lab.stage, x = id => { const a = st && st.anchor(id); return a ? a.getBoundingClientRect().left : NaN; };
              const L = st.layout, decks = (L.props || []).filter(q => q.type === 'duelDeck');
              const d = decks[0], mid = d ? d.x + d.w / 2 : NaN, sE = L.spots.duelE, sP = L.spots.duelP;
              const handInE = !!document.querySelector('.dl [data-tut=e-hud] .ab, .dl [data-tut=e-hud] .tile');
              return { eAbove: e.top < p.top, f: x('f'), o: x('o'), p: x('p'), decks: decks.length, deckMid: mid, between: d && Math.abs(mid - (sE[0] + sP[0]) / 2) <= 1 && sE[0] < d.x && sP[0] > d.x + d.w, handInE };
            });
            record(17, size, r.eAbove && r.f < r.o && r.o < r.p && r.decks === 1 && r.between && !r.handInE, JSON.stringify(r));
          }
          if (want(14)) {
            const sel0 = await page.evaluate(() => window.DipLabDuel.debug().sel);
            await longPress(page, ctx, '.dl [data-tut=card-1]');
            const open = await infoOpen(page, 3000);
            const sel1 = await page.evaluate(() => window.DipLabDuel.debug().sel);
            if (open) await closeInfo(page);
            // 點一下＝在那張打開；再點一下打開的那張＝收回（都不開唱片資訊）
            await tapAt(page, '.dl [data-tut=card-0]'); await sleep(400);
            const sel2 = await page.evaluate(() => window.DipLabDuel.debug().sel);
            const tapOpen1 = !!(await page.$('#cardInfoMask'));
            await tapAt(page, '.dl [data-tut=card-0]'); await sleep(400);
            const tapOpen = tapOpen1 || !!(await page.$('#cardInfoMask'));
            const sel3 = await page.evaluate(() => window.DipLabDuel.debug().sel);
            await page.evaluate(() => window.DipLabDuel.select(null));
            record(14, size, open && !sel1 && !sel0 && !tapOpen && sel2 && sel2.i === 0 && !sel3, `疊著長按 → 唱片資訊 ${open}（沒選到 ${!sel1}）；tap → 打開 ${JSON.stringify(sel2)}；再 tap → 收回 ${!sel3}；info ${tapOpen}`);
          }
          if (want(22)) { const sc = await noScroll(page); record(22, size, scrollOk(sc), `duel scroll ${JSON.stringify(sc)}`); }
          if (want(18)) {
            const opened = { guess: guessInfo }, closedAtOnce = [];
            // 長按：放開手指之後 400 ms 唱片資訊還要開著（H3／RV11-1：放開補送的 click 不能落到「關閉」或串流鈕上）。
            //   疊著的第 0 張與王牌、打開的那張（整張露出來，在畫面最底下＝「關閉」那條的位置）、打開時旁邊疊著的一張都要驗
            await page.evaluate(() => { window.__infoEv = []; window.DipLabDuel.on('info', w => window.__infoEv.push(w)); window.__navs = 0; window.addEventListener('click', e => { if (!e.defaultPrevented && e.target.closest && e.target.closest('a[href]')) { window.__navs++; e.preventDefault(); } }); });   // 冒泡到 window 還沒被擋＝真的會開連結（唱片資訊擋下的那一下到不了這裡）
            const lpCases = [['hand', '.dl [data-tut=card-0]', 'hand', null], ['ace', '.dl [data-tut=card-ace]', 'hand-ace', null],
              ['open', '.dl [data-tut=card-1]', 'hand', 1], ['beside', '.dl [data-tut=card-3]', 'hand', 2]];
            for (const [k, sel, where, prep] of lpCases) {
              await page.evaluate(p => { const D = window.DipLabDuel; D.select(null); if (p != null) D.select(p); }, prep);
              await sleep(prep ? 350 : 250);
              await page.evaluate(() => { window.__infoEv.length = 0; });
              await longPress(page, ctx, sel);
              await sleep(400);
              const mask = !!(await page.$('#cardInfoMask'));
              const ev = await page.evaluate(() => window.__infoEv.slice());
              opened[k] = mask;
              if (!mask && ev.includes(where)) closedAtOnce.push(k);
              if (mask) await closeInfo(page);
            }
            await page.evaluate(() => window.DipLabDuel.select(null));
            const navs = await page.evaluate(() => window.__navs);
            if (navs) { opened.links = false; closedAtOnce.push('串流連結 ' + navs); }
            // 牌桌兩張：揭曉後（他那格翻面、t≈280 ms）到換手前（t≈2060 ms）在牌桌上；出牌前的牌桌是蓋著的封套＋你選的預覽（店主 FIXLIST 9）。
            // 開唱片資訊時盤面會停住，所以兩張依序點得到
            await page.evaluate(() => { window.DipLabDuel.play({ i: 0, attr: 'c' }); });   // 不等整手演完（play 的 Promise 演完才 resolve）
            await page.waitForFunction(() => !!document.querySelector('.dl .slot.e[data-card]') && !!document.querySelector('.dl .slot.p[data-card]'), null, { timeout: 8000 }).catch(() => {});
            await sleep(120);
            for (const [k, s] of [['slotE', '.dl [data-tut=slot-e] .cv'], ['slotP', '.dl [data-tut=slot-p] .cv']]) {
              const ok1 = await jsClick(page, s); opened[k] = ok1 ? await infoOpen(page) : 'missing'; if (opened[k] === true) await closeInfo(page);
            }
            record(18, size, Object.values(opened).every(v => v === true), `duel covers ${JSON.stringify(opened)}${closedAtOnce.length ? '（放開手指就被關掉：' + closedAtOnce.join('、') + '）' : ''}`);
          }
        } else {
          for (const n of [4, 6, 17, 14, 18, 22]) if (want(n)) record(n, size, false, 'duel not ready');
        }
      } catch (e) { record(3, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #27 無縫接軌 ＋ #22 今晚來客／挑唱片不捲動 ＋ #18（挑唱片面板）＋ #41 贏錢
    if (want(27) || want(41)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue4(page, { ace: 'pearl', idx: 0 }, Q(''));
        await waitScreen(page, 'night');
        const money0 = await page.evaluate(() => window.__lab.run.money);
        await page.evaluate(() => { const c = document.querySelector('#stage canvas'); window.__cv0 = c; window.__enc = []; window.__toasts = [];
          new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => {
            if (n.classList && n.classList.contains('lb-toast')) window.__toasts.push(n.textContent);
            if (n.classList && n.classList.contains('enc2')) { const st = document.getElementById('stage'); window.__enc.push({ t: performance.now(), inStage: st.contains(n), board: false }); const rec = window.__enc[window.__enc.length - 1]; const iv = setInterval(() => { if (document.querySelector('.lb-duelwrap .dl')) rec.board = true; if (!n.isConnected) { rec.ms = performance.now() - rec.t; clearInterval(iv); } }, 30); }
          }))).observe(document.body, { childList: true, subtree: true }); });
        await sleep(600);
        const scN = await noScroll(page);
        await jsClick(page, '[data-a=go]');
        await waitScreen(page, 'duel');
        await duelReady(page, 20000);
        const enc = await page.evaluate(() => window.__enc);
        await resolveHands(page, 2, 'thoughtful');
        await page.evaluate(() => window.__lab.forceWin());
        await waitScreen(page, 'reward');
        await sleep(1200);
        const scR = await noScroll(page);
        const rew = await page.evaluate(() => { const b = document.querySelector('.lb-sheet.reward [data-pick]'); if (!b) return null; const r = b.getBoundingClientRect(); const f = document.querySelector('.lb-sheet.reward .foot').getBoundingClientRect(); return { btnBottom: r.bottom, footTop: f.top, vh: innerHeight }; });
        await jsClick(page, '.lb-sheet.reward .lb-ct [data-info][data-cid]');
        const info = await infoOpen(page);
        if (info) await closeInfo(page);
        await jsClick(page, '.lb-sheet.reward [data-pick]');
        await waitScreen(page, 'night');
        await sleep(600);
        const same = await page.evaluate(() => document.querySelector('#stage canvas') === window.__cv0 && !!window.__cv0 && window.__cv0.isConnected);
        const e0 = enc[0] || {};
        if (want(27)) record(27, size, same && e0.inStage && e0.board && (e0.ms || 0) <= 1600 && rew && rew.btnBottom <= rew.footTop + 1 && info, `same canvas ${same}; bars inStage=${e0.inStage} boardVisibleDuring=${e0.board} ${Math.round(e0.ms || 0)} ms; reward btn ${rew && Math.round(rew.btnBottom)} ≤ foot ${rew && Math.round(rew.footTop)}; reward cover info ${info}`);
        if (want(22)) record(22, size, scrollOk(scN) && scrollOk(scR), `night ${JSON.stringify(scN)} reward ${JSON.stringify(scR)}`);
        if (want(41)) {
          const r = await page.evaluate(() => ({ money: window.__lab.run.money, shown: (document.querySelector('[data-tut=money]') || {}).textContent || '', toasts: window.__toasts.slice(), win: window.DipLabContent.economy.win.normal }));
          const tst = '+$' + r.win.toLocaleString('en-US');
          record(41, size, r.money === money0 + r.win && r.toasts.some(t => t.indexOf(tst) >= 0) && r.shown.replace(/\s/g, '').indexOf('$' + r.money.toLocaleString('en-US')) >= 0, `money ${money0} → ${r.money} (+${r.win}); toast ${JSON.stringify(r.toasts)}; night shows「${r.shown}」`);
        }
      } catch (e) { record(27, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #40 有存檔的標題：「再按一次就放棄今晚」在畫面內；第二下才放棄
    if (want(40)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await openTitle(page); await seedRun4(page, { ace: 'hall', idx: 1 }); await openTitle(page);
        await page.click('[data-a=push]');
        await sleep(200);
        const r = await page.evaluate(() => { const w0 = document.querySelector('.lb-warn'); const b = w0.getBoundingClientRect(); return { vis: getComputedStyle(w0).visibility, bottom: b.bottom, vh: innerHeight, run: !!window.__lab.run, s: window.__lab.screen() }; });
        const sc = await noScroll(page);
        record(40, size, r.vis === 'visible' && r.bottom <= r.vh && r.run && r.s === 'title' && scrollOk(sc), `warn ${r.vis} bottom ${Math.round(r.bottom)} ≤ ${r.vh}; run kept ${r.run}; scroll ${JSON.stringify(sc)}`);
      } catch (e) { record(40, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #7 序章打贏 → 地上的唱片撿起面板 → 配件三選一 → 今晚來客（第一位客人已在店裡）
    if (want(7)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await openTitle(page);
        await page.click('[data-a=quiet]');
        await prologueToDuel4(page, 'direct');
        await duelReady(page);
        await page.evaluate(() => window.DipLabDuel.autoplay('thoughtful'));
        const card = await advanceUntil(page, () => !!document.querySelector('#panel > .lb-sheet.one [data-i]'), null, 90000);
        await sleep(500);
        const one = card ? await page.evaluate(() => { const s = document.querySelector('#panel > .lb-sheet.one'); return { title: !!s.querySelector('.hd h3'), notitle: s.classList.contains('notitle'), text: s.textContent.replace(/\s+/g, ' ').trim(), btns: s.querySelectorAll('.btns [data-i]').length, cover: !!s.querySelector('.lb-cv, img') }; }) : null;
        const scOne = await noScroll(page);
        await jsClick(page, '#panel > .lb-sheet.one [data-i="0"]');
        const relic = await advanceUntil(page, () => !!document.querySelector('.lb-sheet.relics [data-r]'), null, 40000);
        const rel = relic ? await page.evaluate(() => [...document.querySelectorAll('.lb-sheet.relics [data-r]')].map(b => b.getAttribute('data-r'))) : [];
        await sleep(450);
        if (relic) await jsClick(page, '.lb-sheet.relics [data-r="stylus"]');
        const night = await advanceUntil(page, () => window.__lab.screen() === 'night', null, 60000);
        await sleep(1500);
        const st = await page.evaluate(() => { const r = window.__lab.run, s = window.__lab.stage, f = s.pos('f'), at = s.layout.spots.atdoor; return { relics: r.relics, bag: r.bag, inside: r.shop.firstGuestInside, heads: document.querySelectorAll('[data-tut=night] .nc').length, f: f && { x: Math.round(f.x), y: Math.round(f.y), hidden: !!f.hidden }, atdoor: at, r1: s.pos('r1') && !s.pos('r1').hidden }; });
        const near = st.f && !st.f.hidden && Math.hypot(st.f.x - st.atdoor[0], st.f.y - st.atdoor[1]) <= 3;
        const ok = card && one && !one.title && one.notitle && /Fishmans|Long Season/i.test(one.text) && one.btns === 2 && one.cover && scrollOk(scOne) &&
          rel.join(',') === 'dustcover,stylus,cleaner' && night && st.relics.join() === 'stylus' && st.bag.includes('fishmans-long-season') && st.bag.length === 8 && st.heads === 5 && st.inside && near && st.r1;
        record(7, size, ok, `pickup ${JSON.stringify(one && { title: one.title, notitle: one.notitle, btns: one.btns, text: one.text.slice(0, 50) })}; relics offered ${rel}; night ${night}; ${JSON.stringify(st)}`);
      } catch (e) { record(7, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #8 序章打輸 →「……再一場。」→ 同一位男子、聲望回滿
    if (want(8)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await openTitle(page);
        await page.click('[data-a=quiet]');
        await prologueToDuel4(page, 'direct');
        await duelReady(page);
        await page.evaluate(() => window.__lab.forceLose());
        let said = false;
        for (let g = 0; g < 100; g++) { said = await page.evaluate(() => /再一場/.test((document.querySelector('.lb-dq .tx') || {}).textContent || '')); if (said) break; await sleep(100); }
        const back = await waitScreen(page, 'duel', 20000);
        await duelReady(page);
        const v = await page.evaluate(() => window.__lab.duel());
        record(8, size, said && back && v.eId === 'man' && v.pHp === YOU_HP && v.eHp === v.eMax, `said ${said}, back ${back}, ${v && v.eId} p ${v && v.pHp} e ${v && v.eHp}/${v && v.eMax}`);
      } catch (e) { record(8, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #9 一整趟 ＋ #13 再挑戰一趟 ＋ #11 存檔隔離 ＋ #12 網路
    if (want(9) || want(13) || want(11) || want(12)) {
      const { ctx, page } = await newPage(browser, w, h, { watchStorage: true }); track(page);
      try {
        await openTitle(page);
        await page.click('[data-a=quiet]');
        await sleep(300);
        await page.evaluate(() => window.__lab.autoplay('thoughtful', { until: 'end', guess: 'right' }));
        // 特價區開局挑三張也由 autoplay 自己挑（審查 #4：不再靠測試替它按）。無限試煉不會自己結束：走到第 4 位以後下一場強制輸（說情也用掉；兩場＝說情重設了也一樣輸）
        let end = false, lose = 0;
        const t0 = Date.now();
        while (!end && Date.now() - t0 < 240000) {
          end = (await screen(page)) === 'end';
          if (!end && !lose && await page.evaluate(() => !!(window.__lab.run && window.__lab.run.pos >= 4))) lose = await page.evaluate(() => (window.__lab.loseNext(2, { noRetry: true }), window.__lab.run.pos));
          if (!end) await sleep(400);
        }
        await sleep(800);
        await page.evaluate(() => window.__lab.loseNext(0));
        const r = await page.evaluate(() => { const R = window.__lab.run, S = window.__lab.save; return { over: R.over, pos: R.pos, level: R.level, picks: (R.picks || []).length, taken: R.taken, streak: R.bestStreak,
          rows: [...document.querySelectorAll('.lb-sum li')].map(li => li.textContent.replace(/\s+/g, ' ').trim()), again: !!document.querySelector('[data-a=again]'), runs: S.runs.length, far: S.best.far,
          txt: document.getElementById('app').textContent, trail: window.__lab.trail(), relics: S.relics.slice() }; });
        const sawNight = r.trail.filter(s => s === 'night').length, sawReward = r.trail.includes('reward');
        const rowsOk = r.rows.length === 3 && r.rows[0].indexOf('第 ' + r.pos + ' 位') >= 0 && r.rows[1].indexOf(r.streak + ' 位') >= 0 && r.rows[2].indexOf(r.taken + ' 張') >= 0;
        const noNight = !/今晚|打烊|\d\d:\d\d/.test(r.txt);
        if (want(9)) record(9, size, end && r.over === 'dead' && rowsOk && r.again && r.runs === 1 && r.far === r.pos && r.pos >= 4 && sawNight >= 4 && sawReward && r.level >= 2 && r.picks === r.level - 1 && noNight,
          `end ${end} ${r.over} at 第 ${r.pos} 位 (loseNext from ${lose}); rows ${JSON.stringify(r.rows)}; best.far ${r.far}; Lv ${r.level} picks ${r.picks}; night×${sawNight}, reward ${sawReward}; 沒有一晚字 ${noNight}`);
        if (want(13)) {
          await page.evaluate(() => window.__lab.stop());
          await jsClick(page, '[data-a=again]');
          const ace = await advanceUntil(page, () => !!document.querySelector('.lb-sheet.acepick [data-a=ok]'), null, 20000);
          await sleep(450);
          await jsClick(page, '.lb-sheet.acepick [data-a=ok]');
          let n2 = false; const t1 = Date.now();
          while (!n2 && Date.now() - t1 < 20000) { n2 = (await screen(page)) === 'night'; if (!n2) { await answerBargain(page); await sleep(200); } }
          await sleep(500);
          const rr = await page.evaluate(() => !window.__lab.run ? { noRun: true, s: window.__lab.screen(), beat: window.__lab.beat, trail: window.__lab.trail().slice(-5), sheet: (document.querySelector('#panel > .lb-sheet') || {}).className || null, calls: (window.__econCalls || []).map(c => c.m) } : ({ prologue: window.__lab.run.prologue, runNo: window.__lab.run.runNo, pos: window.__lab.run.pos, hp: window.__lab.run.hp, relics: window.__lab.run.relics, bag: window.__lab.run.bag.length, picked: window.__lab.run.shop.bargainPicked, trail: window.__lab.trail().slice(-4) }));
          const ms = Date.now() - t1;
          record(13, size, ace && n2 && rr.prologue == null && rr.runNo === 2 && rr.pos === 1 && rr.hp === YOU_HP && rr.bag === 7 && rr.picked && JSON.stringify(rr.relics) === JSON.stringify(r.relics), `再挑戰一趟 → acePick ${ace} → night ${n2} (${ms} ms); ${JSON.stringify(rr)}; relics last run ${JSON.stringify(r.relics)}`);
        }
        if (want(11)) {
          const ks = await page.evaluate(() => ({ keys: [...new Set(window.__lsKeys)], v: JSON.parse(localStorage.getItem('dipGameLab_v1')).v }));
          const bad = ks.keys.filter(k => !ALLOWED_LS.has(k));
          // v3 存檔：版本不對 → 整份丟掉、不壞
          await page.evaluate(() => localStorage.setItem('dipGameLab_v1', JSON.stringify({ v: 3, run: { v: 3, bag: [], order: ['man'], relics: [], stats: {}, ace: 'hall' }, settings: { sound: false }, shelf: { x: 1 }, tutorialDone: true })));
          await openTitle(page, Q());
          const old = await page.evaluate(() => ({ v: window.__lab.save.v, run: window.__lab.save.run, cont: !!document.querySelector('[data-a=cont]'), push: !!document.querySelector('[data-a=push]') }));
          // v4 存檔（一晚版）：照裁定 12 遷移——唱片櫃、配件、偏好留著；一晚的 run 丟掉；nights → runs；best → { far, checkpoints, bestStreak }
          await page.evaluate(() => {
            const C = window.DipLabContent, id = C.aces.hall;
            localStorage.setItem('dipGameLab_v1', JSON.stringify({ v: 4, seen: { night: true }, learned: { L1: true }, settings: { fastAnim: true, sound: false }, player: null,
              run: { v: 4, bag: [], order: ['copycat'], relics: [], stats: {}, ace: 'hall', times: ['22:00'] }, nights: [{ seedKey: '20261106', nightNo: 1, ace: 'hall', result: 'clear', reached: '02:00', wins: 6, taken: [id] }],
              best: { clears: 1, bySeedKey: { 20261106: 1 } }, shelf: { [id]: { at: '20261106#1', seen: true } }, relics: ['stylus'], unlocks: { secondNightTeaser: true },
              tutorialDone: true, prologueDone: true, lastAce: 'hall', lastBargain: null }));
          });
          await openTitle(page, Q());
          const mig = await page.evaluate(() => { const S = window.__lab.save; return { v: S.v, run: S.run, shelf: Object.keys(S.shelf).length, relics: S.relics, runs: S.runs.length, runNo: S.runs[0] && S.runs[0].runNo, best: S.best, nights: 'nights' in S, unlocks: 'unlocks' in S, learned: !!S.learned.L1, fast: S.settings.fastAnim, cont: !!document.querySelector('[data-a=cont]'), push: !!document.querySelector('[data-a=push]'), lastAce: S.lastAce, runSeq: (S.runSeq || {})['20261106'] }; });
          await openTitle(page, Q());
          mig.lastAce2 = await page.evaluate(() => window.__lab.save.lastAce);
          const migOk = mig.v === 5 && !mig.run && mig.shelf === 1 && mig.relics.join() === 'stylus' && mig.runs === 1 && mig.runNo === 1 && mig.best.far === 0 && Array.isArray(mig.best.checkpoints) && !mig.nights && !mig.unlocks && mig.learned && mig.fast && !mig.cont && mig.push &&
            mig.lastAce === 'hall' && mig.runSeq === 1 && mig.lastAce2 === 'hall';   // 審查 #1：lastAce 遷移後、重新整理後都留著；#5：同一天第幾趟的計數器從舊的一晚接著數
          record(11, size, !bad.length && ks.v === 5 && old.v === 5 && !old.run && !old.cont && old.push && migOk, `keys ${JSON.stringify(ks.keys)} v${ks.v}; old v3 save → ${JSON.stringify(old)}; v4 save → ${JSON.stringify(mig)}`);
        }
        if (want(12)) {
          const fb = page._requests.filter(u => /firebase|firestore|googleapis\.com\/identitytoolkit/i.test(u));
          record(12, size, !fb.length, `firebase requests ${fb.length}`);
        }
      } catch (e) { record(9, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #10 續玩（對決第 2 手）＋ #16 店門點兩下＝繼續今晚
    if (want(10) || want(16)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue4(page, { ace: 'hall', idx: 1 });
        await waitScreen(page, 'night'); await sleep(500);
        await jsClick(page, '[data-a=go]');
        await duelReady(page);
        await page.evaluate(() => window.DipLabDuel.play({ i: 0, attr: 'o' }));
        await page.waitForFunction(() => window.DipLabDuel.debug().n === 2 && !window.DipLabDuel.api().busy(), null, { timeout: 12000 });
        const before = await page.evaluate(() => { const v = window.__lab.duel(); return { n: v.n, e: v.eId, eHp: v.eHp, pHp: v.pHp, hint: v.hint && v.hint.line }; });
        await openTitle(page);
        if (want(16)) {
          const hot = await page.evaluate(() => { const st = window.__lab.stage; const r = st && st.hotRect && st.hotRect('door'); return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null; });
          if (hot) { await page.touchscreen.tap(hot.x, hot.y); await sleep(600); await page.touchscreen.tap(hot.x, hot.y); }
          else { await page.evaluate(() => window.__lab.stageAction('door')); await sleep(600); await page.evaluate(() => window.__lab.stageAction('door')); }
        } else await jsClick(page, '[data-a=cont]');
        await duelReady(page);
        const after = await page.evaluate(() => { const v = window.__lab.duel(); return { n: v.n, e: v.eId, eHp: v.eHp, pHp: v.pHp, hint: v.hint && v.hint.line, trail: window.__lab.trail() }; });
        const same = before.n === after.n && before.e === after.e && before.eHp === after.eHp && before.hint === after.hint;
        if (want(10)) record(10, size, same, `before ${JSON.stringify(before)} after ${JSON.stringify({ n: after.n, e: after.e, eHp: after.eHp, hint: after.hint })}`);
        if (want(16)) record(16, size, same && !after.trail.includes('scene'), `door ×2 → ${after.trail.join('>')}`);
      } catch (e) { record(10, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #19 教學三王牌 ＋ #20 擋錯招（流亡那一輪）
    if (want(19) || want(20)) {
      for (const tier of (FIRST || FULL ? ['hall', 'pearl', 'heresy'] : ['pearl'])) {
        const { ctx, page } = await newPage(browser, w, h); track(page);
        try {
          const variant = tier === 'pearl' && want(20) ? 'wrong' : 'plain';
          if (tier === 'hall') {
            // 走真的序章：「看向老闆」
            await openTitle(page, Q(''));
            await page.click('[data-a=quiet]');
            await prologueToDuel4(page, 'tut', tier);
          } else {
            await seededContinue4(page, { ace: tier, prologue: true, tut: true, tutorialDone: false, seen: {} }, Q(''));
          }
          await waitScreen(page, 'duel');
          const res = await walkTutorial4(page, w, h, variant);
          const C = await page.evaluate(t => ({ exp: window.DipLabContent.tutorial.expect[t], hp: window.DipLabContent.tutorial.hp, atRes: window.DipLabContent.tutorial.steps.filter(s => s.kind === 'say' && (s.target || []).includes('result')).length }), tier);
          const done = await page.waitForFunction(() => window.__lab.save.tutorialDone === true, null, { timeout: 20000 }).then(() => true, () => false);
          const handsOk = res.hands && res.hands.length === 6 && res.hands.every((c, k) => c.kind === C.exp[k].kind && (C.exp[k].toE == null || c.toE === C.exp[k].toE) && (k === 4 ? c.toP === 5 - c.pStar && c.blocked === 'gap' : c.toP === C.exp[k].toP)) && res.hands[5].ace;
          const ko = await page.waitForFunction(() => window.__lab.screen() === 'scene' || (window.__lab.run && window.__lab.run.pending), null, { timeout: 20000 }).then(() => true, () => false);
          const callOk = res.callouts.length === C.atRes && res.callouts.every(c => c && c.op > 0.95 && c.w >= 150 && c.l2);
          if (want(19)) record(19, size, handsOk && done && ko && callOk && res.learned.join() === 'L1,L2,L3,L4,L5,L6', `${tier}: callouts ${callOk ? 'ok' : JSON.stringify(res.callouts)}; hands ${JSON.stringify((res.hands || []).map(c => c.kind + ':' + c.toE + '/' + c.toP))}; learned ${res.learned}; tutorialDone ${done}; KO→收尾 ${ko}`);
          if (variant === 'wrong') {
            // 第 1 手點疊著那排的別張：沒打開；第 2 手點別色屬性鈕：沒丟出去、還是那張開著（v5 手風琴）
            const ok = res.log.length === 2 && res.log.every(l => l.text === '先點我指的這裡。' && l.warn && l.n === l.n0 && (l.hand === 1 ? !l.sel : !!l.sel));
            record(20, size, ok, JSON.stringify(res.log));
          }
        } catch (e) { record(19, size, false, `${tier} error ${e.message}`); }
        await ctx.close();
      }
    }

    // #21 直接開打：沒有教學、男子 10 聲望
    if (want(21)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await openTitle(page);
        await page.click('[data-a=quiet]');
        await prologueToDuel4(page, 'direct');
        await duelReady(page);
        await sleep(600);
        const r = await page.evaluate(() => ({ v: window.__lab.duel(), holes: window.DipLabTut.debug().holes, active: window.DipLabTut.active() }));
        record(21, size, r.v.eHp === 10 && r.v.eMax === 10 && !r.active && !r.holes, `man ${r.v.eHp}/${r.v.eMax}, tut active ${r.active}, holes ${r.holes}`);
      } catch (e) { record(21, size, false, 'error ' + e.message); }
      await ctx.close();
      // #21b 教學程式不在（canTutorial 假）：兩顆鈕都在；第 0 顆照課表出牌、沒有遮罩
      const p2 = await newPage(browser, w, h, { noTutorial: true }); track(p2.page);
      try {
        const page = p2.page;
        await openTitle(page);
        await page.click('[data-a=quiet]');
        let menu = 0;
        const t0 = Date.now();
        // 走到選單（記下有幾顆）
        await prologueToDuel4(page, 'direct', null, { until: 'bargainDone' });
        while (Date.now() - t0 < 60000) { menu = await page.evaluate(() => document.querySelectorAll('.lb-dq.hasmenu .lb-dqopt').length); if (menu) break; if (await page.$('.lb-dq .nx.on.choice')) await jsClick(page, '.lb-dq'); await sleep(150); }
        await sleep(400);
        await jsClick(page, '.lb-dq .lb-dqopt[data-i="0"]');
        await duelReady(page, 30000);
        await page.evaluate(() => window.DipLabDuel.play(window.DipLabEngine.policies.thoughtful(window.__lab.rawDuel(), window.DipLabEngine.makeRng(1), {}, window.DipLabContent)));
        await page.waitForFunction(() => window.DipLabDuel.debug().n >= 2 && !window.DipLabDuel.api().busy(), null, { timeout: 12000 }).catch(() => {});
        const r = await page.evaluate(() => ({ tut: typeof window.DipLabTut, mask: !!document.querySelector('#tut svg'), d: window.__lab.duel(), thrown: window.__lab.rawDuel().e.thrown.map(c => c.id), script: !!window.__lab.rawDuel().script }));
        record('21b', size, menu === 2 && r.tut === 'undefined' && !r.mask && r.d.eMax === 18 && r.script && r.thrown[0] === 'coldplay-mylo-xyloto', `buttons ${menu}; DipLabTut ${r.tut}; mask ${r.mask}; man ${r.d.eHp}/${r.d.eMax}; script ${r.script}; his first ${r.thrown[0]}`);
      } catch (e) { record('21b', size, false, 'error ' + e.message); }
      await p2.ctx.close();
    }

    // #33 老闆說情：輸一次 → 同一位、聲望回到開打前（帶傷 9/12 進場）；再輸 → 散場（結算）
    if (want(33)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        const HP_IN = YOU_HP - 3;
        await seededContinue4(page, { ace: 'pearl', idx: 1, hp: HP_IN });
        await waitScreen(page, 'night');
        const eid = await page.evaluate(() => window.__lab.run.order[1]);
        await jsClick(page, '[data-a=go]');
        await duelReady(page);
        await resolveHands(page, 1, 'thoughtful');
        await page.evaluate(() => window.__lab.forceLose());
        const menu = await page.waitForSelector('.lb-dq.hasmenu .lb-dqopt[data-i="0"]', { timeout: 20000 }).then(() => true, () => false);
        const txt = menu ? await page.evaluate(() => document.querySelector('.lb-dq').textContent) : '';
        const items = menu ? await page.evaluate(() => [...document.querySelectorAll('.lb-dq .lb-dqopt')].map(b => b.textContent.trim())) : [];
        const want0 = await page.evaluate(() => window.DipLabContent.trial.ui.retryMenu);
        await sleep(450);
        await jsClick(page, '.lb-dq .lb-dqopt[data-i="0"]');
        await duelReady(page);
        const v = await page.evaluate(() => ({ d: window.__lab.duel(), left: window.__lab.run.retryLeft }));
        await page.evaluate(() => window.__lab.forceLose());
        const end = await waitScreen(page, 'end', 30000);
        const o = await page.evaluate(() => ({ over: window.__lab.run.over, rows: document.querySelectorAll('.lb-sum li').length }));
        const menuOk = items.length === 2 && items[0].indexOf(want0[0].replace(/^▶\s*/, '')) >= 0 && items[1].indexOf(want0[1]) >= 0;
        record(33, size, menu && /再一場/.test(txt) && menuOk && v.d.eId === eid && v.d.pHp === HP_IN && v.d.pMax === YOU_HP && v.left === 0 && end && o.over === 'dead' && o.rows === 3,
          `menu ${menu} ${JSON.stringify(items)}; retry vs ${v.d.eId} (want ${eid}) pHp ${v.d.pHp}/${v.d.pMax} (want ${HP_IN}) left ${v.left}; 2nd loss → end ${end} (${JSON.stringify(o)})`);
      } catch (e) { record(33, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #35 跳過教學＋重新整理不會重開教學
    if (want(35)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue4(page, { ace: 'heresy', prologue: true, tut: true, tutorialDone: false, seen: {} }, Q(''));
        await waitScreen(page, 'duel');
        await page.waitForFunction(() => window.DipLabTut.active(), null, { timeout: 15000 });
        await page.waitForFunction(() => { const b = document.querySelector('.tut-skip'); return b && !b.hidden; }, null, { timeout: 10000 }).catch(() => {});
        await sleep(400);
        const viaBtn = await jsClick(page, '.tut-skip');
        if (!viaBtn) await page.evaluate(() => window.DipLabTut.skip());
        await page.waitForFunction(() => window.__lab.save.tutorialDone === true, null, { timeout: 5000 }).catch(() => {});
        await duelReady(page);
        await page.evaluate(() => window.DipLabDuel.play({ i: 0, attr: 'c' }));
        await page.waitForFunction(() => window.DipLabDuel.debug().n === 2 && !window.DipLabDuel.api().busy(), null, { timeout: 12000 });
        await openTitle(page, Q(''));
        await jsClick(page, '[data-a=cont]');
        await duelReady(page);
        await sleep(800);
        const r = await page.evaluate(() => ({ n: window.__lab.duel().n, active: window.DipLabTut.active(), done: window.__lab.save.tutorialDone, tut: window.__lab.run.tut }));
        record(35, size, r.n === 2 && !r.active && r.done === true, `skip via button ${viaBtn}; after reload ${JSON.stringify(r)}`);
      } catch (e) { record(35, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #36 ⏸ 回標題會結束教學；重新推門 → 直接開打不被劫持
    if (want(36)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue4(page, { ace: 'hall', prologue: true, tut: true, tutorialDone: false, seen: {} }, Q(''));
        await waitScreen(page, 'duel');
        await page.waitForFunction(() => window.DipLabTut.active() && window.DipLabTut.debug().shown === 'm2', null, { timeout: 20000 }).catch(() => {});
        await jsClick(page, '#top [data-a=pause]'); await sleep(400);
        await jsClick(page, '.lb-modal [data-a=title]');
        await waitScreen(page, 'title');
        const a1 = await page.evaluate(() => window.DipLabTut.active());
        await sleep(400);
        await page.click('[data-a=quiet]'); await sleep(450); await page.click('[data-a=quiet]');
        await prologueToDuel4(page, 'direct');
        await duelReady(page);
        await sleep(500);
        const r = await page.evaluate(() => ({ active: window.DipLabTut.active(), holes: window.DipLabTut.debug().holes, tut: window.__lab.run.tut }));
        await tapAt(page, 'dt:card-1'); await sleep(300);
        const sel = await page.evaluate(() => window.DipLabDuel.debug().sel);
        record(36, size, !a1 && !r.active && !r.holes && !!sel, `after ⏸ title active=${a1}; direct duel ${JSON.stringify(r)} sel ${JSON.stringify(sel)}`);
      } catch (e) { record(36, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #37 連點安全：推門 ×2、下一位 ×2、台北 ×2
    if (want(37)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await openTitle(page);
        const tb = await page.evaluate(() => { const b = document.querySelector('#top [data-a=taipei]').getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; });
        await page.touchscreen.tap(tb.x, tb.y); await sleep(120); await page.touchscreen.tap(tb.x, tb.y);
        await sleep(1500);
        const t1 = await page.evaluate(() => window.__lab.trail().join('>'));
        await openTitle(page);
        const pb = await page.evaluate(() => { const b = document.querySelector('[data-a=quiet]').getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; });
        await page.touchscreen.tap(pb.x, pb.y); await sleep(90); await page.touchscreen.tap(pb.x, pb.y);
        await sleep(1200);
        const t2 = await page.evaluate(() => window.__lab.trail().join('>'));
        await seedRun4(page, { ace: 'pearl', idx: 0 }); await openTitle(page); await jsClick(page, '[data-a=cont]');
        await waitScreen(page, 'night'); await sleep(600);
        const gb = await page.evaluate(() => { const b = document.querySelector('[data-a=go]').getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; });
        await page.touchscreen.tap(gb.x, gb.y); await sleep(100); await page.touchscreen.tap(gb.x, gb.y);
        await duelReady(page);
        const t3 = await page.evaluate(() => window.__lab.trail().join('>'));
        const ok = t1 === 'title>taipei' && t2 === 'title>scene' && /night>duel$/.test(t3) && (t3.match(/duel/g) || []).length === 1;
        record(37, size, ok, `taipei×2: ${t1}; push×2: ${t2}; go×2: ${t3}`);
      } catch (e) { record(37, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #38 傳說藏家登場卡：盤面 hold、卡吃點擊、點一下提早收掉
    if (want(38)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue4(page, { ace: 'heresy', idx: 4 });
        await waitScreen(page, 'night'); await sleep(500);
        await jsClick(page, '[data-a=go]');
        await waitScreen(page, 'scene');
        for (let g = 0; g < 150 && !(await page.$('.lb-dq.hasmenu .lb-dqopt')); g++) { if (await page.$('.lb-dq .nx.on')) await jsClick(page, '.lb-dq'); await sleep(200); }
        await sleep(450);
        await jsClick(page, '.lb-dq .lb-dqopt');
        const mask = await page.waitForSelector('#dlfxBossMask', { timeout: 8000 }).then(() => true, () => false);
        const r1 = await page.evaluate(() => ({ held: window.DipLabDuel.debug() && window.DipLabDuel.debug().held, pe: getComputedStyle(document.getElementById('dlfxBossMask')).pointerEvents }));
        await sleep(700);
        const chip = await page.evaluate(() => { const c = document.querySelector('.dl [data-tut="hand"]'); if (!c) return null; const b = c.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; });
        if (chip) await page.touchscreen.tap(chip.x, chip.y);
        await sleep(100);
        const sel = await page.evaluate(() => window.DipLabDuel.debug().sel || (window.DipLabDuel.debug().open != null ? 'open' : null));
        const gone = await page.waitForSelector('#dlfxBossMask', { state: 'detached', timeout: 1500 }).then(() => true, () => false);
        const ready = await duelReady(page, 8000);
        record(38, size, mask && r1.held >= 1 && r1.pe === 'auto' && !sel && gone && ready, `mask ${mask} ${JSON.stringify(r1)}; tap selected ${JSON.stringify(sel)}; closed early ${gone}; board ready ${ready}`);
      } catch (e) { record(38, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #39 規則卡（六行逐字、頁尾代入、不捲動）＋ 公告＝規則卡 ＋ 重看教學 ＋ #18（唱片櫃、牆上的）＋ #43 櫃檯（今晚來客）
    if (want(39) || want(18) || want(43)) {
      let night43 = null;
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue4(page, { ace: 'pearl', idx: 0 });
        await waitScreen(page, 'night'); await sleep(600);
        // 學會六張小卡（規則卡最長的樣子）
        await page.evaluate(() => { window.__lab.save.learned = { L1: true, L2: true, L3: true, L4: true, L5: true, L6: true }; });
        await jsClick(page, '#top [data-a=help]'); await sleep(500);
        const rc = await page.evaluate(() => {
          const m = document.querySelector('.lb-modal'), p = m.querySelector('.pane').getBoundingClientRect();
          return { lines: [...document.querySelectorAll('.lb-rules .rl li > div')].map(d => d.textContent), foot: document.querySelector('.lb-rules .rfoot').textContent, mScroll: m.scrollHeight - m.clientHeight, bottom: p.bottom, vh: innerHeight,
            replay: !!m.querySelector('[data-a=replay]'), learned: m.querySelectorAll('.lb-learned span').length, contentLines: window.DipLabContent.rules.lines };
        });
        const linesOk = JSON.stringify(rc.lines) === JSON.stringify(RULE_LINES) && JSON.stringify(rc.contentLines) === JSON.stringify(RULE_LINES);
        // 頁尾：開局聲望（升級會加）＋品味／底氣在做什麼（審查 #11、#13）
        const footOk = !/[{}]/.test(rc.foot) && rc.foot.includes('你開局 ' + YOU_HP + ' 聲望（升級會加）') && /品味/.test(rc.foot) && /最多擋一半/.test(rc.foot);
        await jsClick(page, '.lb-modal [data-x]'); await sleep(300);
        await page.evaluate(() => window.__lab.stageAction('poster:event')); await sleep(300);
        const posterRules = !!(await page.$('.lb-modal .lb-rules')); await jsClick(page, '.lb-modal [data-x]'); await sleep(300);
        // #43 櫃檯（今晚來客、可以買）＝配件面板
        if (want(43)) {
          await page.evaluate(() => { window.__econCalls && (window.__econCalls.length = 0); });
          await page.evaluate(() => window.__lab.stageAction('counter')); await sleep(500);
          const calls = await econCalls(page);
          const drawer = !!(await page.$('.ec-drawer'));
          const okNight = ECON === 'stub' ? calls.includes('openRelicShop') : drawer;
          await page.evaluate(() => { const E = window.DipLabEcon; if (E && E.close) E.close(); });
          await sleep(300);
          night43 = { okNight, calls, drawer };
        }
        const opened = {};
        const tryInfo = async (key, sel) => {
          const ok = await jsClick(page, sel); if (!ok) { opened[key] = 'missing'; return; }
          opened[key] = await infoOpen(page);
          if (opened[key] === true) await closeInfo(page);
        };
        // 牆上的唱片（真的點舞台上的熱點）
        const wall = await tapHot(page, h => /^wall-record:/.test(h.action));
        if (wall) { opened.wall = await infoOpen(page); if (opened.wall) await closeInfo(page); } else opened.wall = 'no hotspot';
        // 唱片櫃
        await page.evaluate(() => window.__lab.openPage('shelf')); await sleep(400);
        await tryInfo('shelf', '.lb-page.shelf .lb-cv');
        await jsClick(page, '.lb-page [data-a=close]'); await sleep(300);
        // 真的經濟介面：抽屜與特價箱的封面
        if (ECON === 'real') {
          await page.evaluate(() => window.__lab.stageAction('crate:jazz')); await sleep(900);
          await tryInfo('drawer', '.ec-drawer [data-a=info]');
          await page.evaluate(() => { const E = window.DipLabEcon; if (E && E.close) E.close(); }); await sleep(400);
        }
        // 重看教學（規則卡的鈕）
        await jsClick(page, '#top [data-a=help]'); await sleep(400);
        await jsClick(page, '.lb-modal [data-a=replay]');
        const replay = await page.waitForFunction(() => window.__lab.screen() === 'duel' && window.DipLabTut.active(), null, { timeout: 15000 }).then(() => true, () => false);
        const rbag = replay ? await page.evaluate(() => window.DipLabDuel.api().duel().p.draw.length + window.DipLabDuel.api().duel().p.hand.length) : 0;
        if (want(39)) record(39, size, linesOk && footOk && rc.mScroll <= 1 && rc.bottom <= rc.vh && rc.replay && rc.learned === 6 && posterRules && replay && rbag === 7,
          `rule lines verbatim ${linesOk}; foot「${rc.foot}」; scroll ${rc.mScroll}, pane bottom ${Math.round(rc.bottom)} ≤ ${rc.vh}; learned ${rc.learned}; poster→rules ${posterRules}; replay ${replay} (bag ${rbag})`);
        if (want(18)) record(18, size, Object.values(opened).every(v => v === true), `shop/shelf covers ${JSON.stringify(opened)}`);
        if (want(43)) {
          // 序章：櫃檯＝老闆一句
          const p2 = await newPage(browser, w, h); track(p2.page);
          let okScene = false, said = [];
          try {
            await openTitle(p2.page); await p2.page.click('[data-a=quiet]');
            await p2.page.waitForFunction(() => window.__lab.screen() === 'scene' && window.__lab.beat && /^O[3-9]$/.test(window.__lab.beat), null, { timeout: 30000 }).catch(() => {});
            await watchSay(p2.page);
            await p2.page.evaluate(() => { window.__econCalls && (window.__econCalls.length = 0); window.__lab.stageAction('counter'); });
            await sleep(400);
            said = await p2.page.evaluate(() => window.__said.map(x => x.id + ':' + x.t));
            const want0 = await p2.page.evaluate(() => window.DipLabContent.shopLines.ownerHint.scene);
            const calls = await econCalls(p2.page);
            okScene = said.includes('o:' + want0) && !calls.includes('openRelicShop') && !(await p2.page.$('.ec-drawer'));
          } catch (e) { said = ['error ' + e.message]; }
          await p2.ctx.close();
          const n43 = night43 || {};
          record(43, size, n43.okNight && okScene, `night counter → relic shop ${n43.okNight} (${JSON.stringify(n43.calls)}); prologue counter → owner line ${okScene} (${JSON.stringify(said)})`);
        }
      } catch (e) { record(39, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #42 序章與對決中真點箱子 → 老闆「打完再翻。」、不開抽屜
    if (want(42)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await openTitle(page);
        await page.click('[data-a=quiet]');
        await page.waitForFunction(() => window.__lab.screen() === 'scene' && window.__lab.beat === 'O3', null, { timeout: 30000 }).catch(() => {});
        await page.waitForFunction(() => !!document.querySelector('.lb-dq .nx.on'), null, { timeout: 20000 }).catch(() => {});
        await watchSay(page);
        await page.evaluate(() => { window.__econCalls && (window.__econCalls.length = 0); });
        const want0 = await page.evaluate(() => window.DipLabContent.shopLines.binBusy);
        const hot1 = await tapHot(page, h => /^(crate|bin):/.test(h.action) && !/sale/.test(h.action));
        await sleep(500);
        const s1 = await page.evaluate(() => window.__said.map(x => x.id + ':' + x.t));
        const c1 = await econCalls(page);
        const d1 = !!(await page.$('.ec-drawer'));
        await prologueToDuel4(page, 'direct');
        await duelReady(page);
        await page.waitForFunction(() => !window.__lab.going(), null, { timeout: 8000 }).catch(() => {});
        await sleep(300);
        await watchSay(page);
        const hot2 = await tapHot(page, h => /^(crate|bin):/.test(h.action));
        await sleep(500);
        const s2 = await page.evaluate(() => window.__said.map(x => x.id + ':' + x.t));
        const c2 = await econCalls(page);
        const d2 = !!(await page.$('.ec-drawer'));
        const ok1 = !!hot1 && s1.includes('o:' + want0) && !c1.some(m => /open/.test(m)) && !d1;
        const ok2 = !hot2 || (s2.includes('o:' + want0) && !c2.some(m => /open/.test(m)) && !d2);
        record(42, size, ok1 && ok2, `scene: tap ${hot1 && hot1.id} → said ${JSON.stringify(s1)} econ ${JSON.stringify(c1)} drawer ${d1}; duel: tap ${hot2 ? hot2.id : '（舞台橫條上看不到箱子）'} → said ${JSON.stringify(s2)} drawer ${d2}`);
      } catch (e) { record(42, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #44 序章途中重新整理：特價箱還沒挑 → 從頭開始；挑過了、還沒按「接受對決」→ 從 O14（八張放上櫃檯）接著演到兩顆鈕（RT-6），按了才進對決
    if (want(44)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await openTitle(page);
        await page.click('[data-a=quiet]');
        // （a）王牌挑好（run 建了）、特價箱還沒挑
        await prologueToDuel4(page, 'direct', null, { until: 'acePicked' });
        const a0 = await page.evaluate(() => ({ picked: window.__lab.run.shop.bargainPicked, prologue: window.__lab.run.prologue }));
        await openTitle(page);
        await jsClick(page, '[data-a=cont]');
        const fromStart = await page.waitForFunction(() => window.__lab.screen() === 'scene' && /^O[1-3]$/.test(window.__lab.beat || ''), null, { timeout: 15000 }).then(() => true, () => false);
        const beatA = await page.evaluate(() => window.__lab.beat);
        // （b）一路到特價箱挑完 → 重新整理 → 從 O14 接著演、停在兩顆「接受對決」→ 按第二顆 → 對決（不是教學）
        await prologueToDuel4(page, 'direct', null, { until: 'bargainDone' });
        const b0 = await page.evaluate(() => ({ picked: window.__lab.run.shop.bargainPicked, bag: window.__lab.run.bag.length }));
        await sleep(300);
        await openTitle(page);
        await jsClick(page, '[data-a=cont]');
        const atO14 = await page.waitForFunction(() => window.__lab.screen() === 'scene' && /^O1[4-9]$|^O2[01]$/.test(window.__lab.beat || ''), null, { timeout: 15000 }).then(() => true, () => false);
        const beatB = await page.evaluate(() => window.__lab.beat);
        const menu = await advanceUntil(page, () => document.querySelectorAll('.lb-dq .lb-dqopt').length === 2, null, 40000);
        if (menu) { await jsClick(page, '.lb-dq .lb-dqopt:nth-child(2)'); }
        const toDuel = menu && await waitScreen(page, 'duel', 20000);
        const tut = await page.evaluate(() => window.__lab.run && window.__lab.run.tut);
        const trail = await page.evaluate(() => window.__lab.trail().join('>'));
        record(44, size, !a0.picked && a0.prologue === 'pending' && fromStart && b0.picked && b0.bag === 7 && atO14 && menu && toDuel && tut === false, `before pick ${JSON.stringify(a0)} → reload → beat ${beatA} (from start ${fromStart}); after pick ${JSON.stringify(b0)} → reload → beat ${beatB}、兩顆鈕 ${menu}、第二顆 → duel ${toDuel}（tut ${tut}）；${trail}`);
      } catch (e) { record(44, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #45 來客（v5）：頂欄只寫第 n 位、第 R 輪＋離下個中繼點、五顆頭像第 n 位、下一位鈕、聲望那顆（點開看等級…）、不捲動
    if (want(45)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue4(page, { ace: 'hall', pos: 7, hp: 10, maxHp: 14, level: 3, atk: 1, def: 1 });
        await waitScreen(page, 'night'); await sleep(900);
        const r = await page.evaluate(() => {
          const E = window.DipLabEngine, C = window.DipLabContent, R = window.__lab.run, U = C.trial.ui, f = (t, o) => String(t).replace(/\{(\w+)\}/g, (m, k) => o[k] != null ? o[k] : m);
          const g = E.roundGuests(R, C);
          return { top: document.querySelector('#top .tt, #top').textContent.replace(/\s+/g, ' ').trim(), nh: document.querySelector('.lb-night .nh').textContent.replace(/\s+/g, ' ').trim(),
            ps: [...document.querySelectorAll('[data-tut=night] .nc .ps')].map(x => x.textContent.trim()), want: g.map(x => f(U.pos, { n: x.pos })),
            cls: [...document.querySelectorAll('[data-tut=night] .nc')].map(x => (x.classList.contains('boss') ? 'B' : x.classList.contains('elite') ? 'E' : '') + (x.classList.contains('cur') ? '*' : '') + (x.classList.contains('done') ? '✓' : '')),
            go: document.querySelector('[data-a=go]').textContent.trim(), goWant: f(U.next, { n: R.pos, name: C.enemies[R.order[R.idx]].name }),
            round: f(U.round, { r: R.round }), toCp: f(U.toCheckpoint, { n: E.toCheckpoint(R, C) }), retry: f(U.retryLeft, { n: R.retryLeft }),
            hp: (document.querySelector('.lb-bagline [data-a=me]') || {}).textContent || '', hpWant: f(U.hp, { n: R.hp, max: R.maxHp }), pos: R.pos, round0: R.round,
            app: document.getElementById('app').textContent };
        });
        const sc = await noScroll(page);
        await jsClick(page, '.lb-bagline [data-a=me]'); await sleep(500);
        const me = await page.evaluate(() => { const s = document.querySelector('.lb-sheet.float.me'); return s ? s.textContent.replace(/\s+/g, ' ') : null; });
        const meWant = await page.evaluate(() => { const U = window.DipLabContent.trial.ui, R = window.__lab.run; return [U.level.replace('{n}', R.level), U.atk.replace('{n}', R.atk), U.def.replace('{n}', R.def), U.maxHp.replace('{n}', R.maxHp)]; });
        const ok = r.pos === 7 && r.round0 === 2 && /^第 7 位/.test(r.top) && !/:|：\d|今晚|打烊/.test(r.top) && r.nh.indexOf(r.round) === 0 && r.nh.indexOf(r.toCp) > 0 && r.nh.indexOf(r.retry) > 0 &&
          JSON.stringify(r.ps) === JSON.stringify(r.want) && r.cls.join() === '✓,*,,E,B' && r.go === r.goWant && r.hp.replace(/\s/g, '') === r.hpWant.replace(/\s/g, '') &&
          !/今晚|打烊|\d\d:\d\d/.test(r.app) && scrollOk(sc) && me && meWant.every(x => me.indexOf(x) >= 0);
        record(45, size, ok, `top「${r.top}」; nh「${r.nh}」; heads ${JSON.stringify(r.ps)} ${r.cls.join(',')}; go「${r.go}」; hp「${r.hp.trim()}」; me「${me}」; scroll ${JSON.stringify(sc)}`);
      } catch (e) { record(45, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #46 升級三選一（v5）：連升兩級＝面板開兩次（第一格品味或底氣、沒有「算了」、不捲動）；重新整理回到升級面板；選完到下一位
    if (want(46)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue4(page, { ace: 'pearl', idx: 1 });
        await waitScreen(page, 'night'); await sleep(500);
        // 等級 1 要 4、等級 2 要 5：經驗 8＋打贏一般 2＝10 → 連升兩級
        await page.evaluate(() => { window.__lab.run.xp = 8; });
        await jsClick(page, '[data-a=go]');
        await duelReady(page);
        await page.evaluate(() => window.__lab.forceWin());
        await waitScreen(page, 'reward'); await sleep(1200);
        await jsClick(page, '.lb-sheet.reward [data-pick]');
        const p1 = await page.waitForSelector('.lb-sheet.level [data-lv]', { timeout: 10000 }).then(() => true, () => false);
        await sleep(800);
        const L1 = await page.evaluate(() => { const s = document.querySelector('.lb-sheet.level'), L = window.DipLabContent.trial.levelUp, R = window.__lab.run;
          return { title: s.querySelector('h3').textContent, want: L.title.replace('{n}', R.pending.level), lv: [...s.querySelectorAll('[data-lv]')].map(b => b.dataset.lv), nm: [...s.querySelectorAll('[data-lv] .nm')].map(b => b.textContent),
            names: [L.atk, L.def, L.hp], cancel: !!s.querySelector('[data-a=cancel],[data-a=skip]'), sub: s.querySelector('.hd .sub').textContent, autoSub: L.sub, level: R.level, ups: R.levelUps,
            btnBottom: Math.max(...[...s.querySelectorAll('[data-lv]')].map(b => b.getBoundingClientRect().bottom)), vh: innerHeight }; });
        const sc1 = await noScroll(page);
        // 重新整理：回到升級面板
        await openTitle(page);
        await jsClick(page, '[data-a=cont]');
        const back = await page.waitForSelector('.lb-sheet.level [data-lv]', { timeout: 15000 }).then(() => true, () => false);
        await sleep(800);
        const before = await page.evaluate(() => ({ maxHp: window.__lab.run.maxHp, hp: window.__lab.run.hp }));
        await jsClick(page, '.lb-sheet.level [data-lv="hp"]');
        const p2 = await page.waitForFunction(() => { const s = document.querySelector('.lb-sheet.level [data-lv]'); return s && window.__lab.run.levelUps === 1 && window.__lab.run.picks.length === 1; }, null, { timeout: 10000 }).then(() => true, () => false);
        await sleep(800);
        const L2 = await page.evaluate(() => ({ title: document.querySelector('.lb-sheet.level h3').textContent, maxHp: window.__lab.run.maxHp, hp: window.__lab.run.hp }));
        await jsClick(page, '.lb-sheet.level [data-lv="atk"]');
        const night = await waitScreen(page, 'night', 10000);
        await sleep(500);
        const fin = await page.evaluate(() => { const R = window.__lab.run; return { pos: R.pos, level: R.level, picks: R.picks.slice(), atk: R.atk, ups: R.levelUps }; });
        const ok = p1 && L1.title === L1.want && L1.lv.length === 3 && /^(atk|def)$/.test(L1.lv[0]) && L1.lv.slice().sort().join() === 'atk,def,hp' && L1.nm.every(n => L1.names.includes(n)) && !L1.cancel &&
          L1.sub.indexOf(L1.autoSub) === 0 && L1.level === 3 && L1.ups === 2 && L1.btnBottom <= L1.vh && scrollOk(sc1) && back && p2 && L2.maxHp === before.maxHp + 2 && L2.hp === before.hp + 2 &&
          night && fin.pos === 3 && fin.level === 3 && fin.picks.join() === 'hp,atk' && fin.atk === 1 && fin.ups === 0;
        record(46, size, ok, `1st「${L1.title}」${L1.lv} ${JSON.stringify(L1.nm)} sub「${L1.sub}」 Lv ${L1.level} ups ${L1.ups}; bottom ${Math.round(L1.btnBottom)} ≤ ${L1.vh}; scroll ${JSON.stringify(sc1)}; reload → panel ${back}; hp pick ${before.maxHp}→${L2.maxHp}; 2nd「${L2.title}」; → night ${night} ${JSON.stringify(fin)}`);
      } catch (e) { record(46, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #47 打倒傳說藏家（v5）：王牌收進唱片櫃 → 領獎 → 下一輪（第 6 位、新面孔、說情重設）；沒有結算畫面
    if (want(47)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue4(page, { ace: 'heresy', idx: 4 });
        await waitScreen(page, 'night'); await sleep(500);
        const r0 = await page.evaluate(() => { const R = window.__lab.run; R.retryLeft = 0; return { order: R.order.slice(), bossAce: window.DipLabContent.aces[R.bossAce], shelf: !!window.__lab.save.shelf[window.DipLabContent.aces[R.bossAce]] }; });
        await jsClick(page, '[data-a=go]');
        await waitScreen(page, 'scene');
        for (let g = 0; g < 150 && !(await page.$('.lb-dq.hasmenu .lb-dqopt')); g++) { if (await page.$('.lb-dq .nx.on')) await jsClick(page, '.lb-dq'); await sleep(200); }
        await sleep(450);
        await jsClick(page, '.lb-dq .lb-dqopt');
        await waitScreen(page, 'duel');
        await page.waitForFunction(() => window.__lab.rawDuel() && !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
        await sleep(600);
        await page.evaluate(() => window.__lab.forceWin());
        // 藏家那句＋他用過的那張（收進唱片櫃）
        const stake = await advanceUntil(page, () => !!document.querySelector('#panel > .lb-sheet.one [data-i]'), null, 30000);
        const one = stake ? await page.evaluate(() => ({ cid: (document.querySelector('#panel > .lb-sheet.one [data-cid]') || {}).getAttribute ? document.querySelector('#panel > .lb-sheet.one [data-cid]').getAttribute('data-cid') : null, txt: document.querySelector('#panel > .lb-sheet.one').textContent, said: (document.querySelector('.lb-dq .tx') || {}).textContent || '' })) : null;
        const shelf1 = await page.evaluate(id => !!window.__lab.save.shelf[id], r0.bossAce);
        await sleep(400);
        if (stake) await jsClick(page, '#panel > .lb-sheet.one [data-i="0"]');
        const rew = await waitScreen(page, 'reward', 15000);
        await sleep(1200);
        await page.evaluate(() => { const b = document.querySelector('.lb-sheet.reward [data-a=skip]'); if (b) b.click(); });
        // 有升級就挑第一個
        for (let g = 0; g < 40 && (await screen(page)) !== 'night'; g++) { await page.evaluate(() => { const b = document.querySelector('.lb-sheet.level [data-lv]'); if (b && !document.querySelector('.lb-sheet.level.arming')) b.click(); }); await sleep(300); }
        const night = (await screen(page)) === 'night';
        await sleep(600);
        const r1 = await page.evaluate(() => { const R = window.__lab.run; return { pos: R.pos, round: R.round, idx: R.idx, order: R.order.slice(), retry: R.retryLeft, over: R.over, ps: [...document.querySelectorAll('[data-tut=night] .nc .ps')].map(x => x.textContent.trim()), trail: window.__lab.trail() }; });
        const fresh = r1.order.slice(0, 3).filter(id => !r0.order.includes(id)).length;
        const trail1 = r1.trail.slice(r1.trail.lastIndexOf('duel'));
        // 第二輪再打倒他（審查 #18、#2）：同一張王牌已經在唱片櫃 → 不再演送牌那段，直接領獎；領獎畫面他也不再補說「這張，送你」
        await watchSay(page);
        await page.evaluate(() => { window.__lab.jump(10); window.__lab.run.retryLeft = 0; });
        await waitScreen(page, 'night'); await sleep(500);
        await jsClick(page, '[data-a=go]');
        await waitScreen(page, 'scene');
        for (let g = 0; g < 150 && !(await page.$('.lb-dq.hasmenu .lb-dqopt')); g++) { if (await page.$('.lb-dq .nx.on')) await jsClick(page, '.lb-dq'); await sleep(200); }
        await sleep(450); await jsClick(page, '.lb-dq .lb-dqopt');
        await waitScreen(page, 'duel');
        await page.waitForFunction(() => window.__lab.rawDuel() && !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
        await sleep(600);
        await page.evaluate(() => window.__lab.forceWin());
        const rew2 = await waitScreen(page, 'reward', 15000);
        await sleep(2600);
        const r2 = await page.evaluate(() => { const t = window.__lab.trail(); return { tail: t.slice(t.lastIndexOf('duel')), one: !!document.querySelector('#panel > .lb-sheet.one'), said: (window.__said || []).filter(x => x.id === 'f').map(x => x.t), lose: [].concat((window.DipLabContent.lines[window.DipLabContent.boss] || {}).lose || [])[0] || '' }; });
        const noGift = rew2 && r2.tail.join() === 'duel,reward' && !r2.one && !!r2.lose && !r2.said.some(t => t.indexOf(r2.lose) >= 0);
        const ok = stake && one && one.cid === r0.bossAce && shelf1 && rew && night && r1.pos === 6 && r1.round === 2 && r1.idx === 0 && r1.retry === 1 && !r1.over && r1.ps[0] === '第 6 位' && r1.ps[4] === '第 10 位' && fresh >= 1 && !r1.trail.includes('end') &&
          trail1.slice(0, 3).join() === 'duel,scene,reward' && noGift;
        record(47, size, ok, `ace panel ${one && one.cid} (want ${r0.bossAce}, on shelf ${shelf1}) said「${one && one.said}」; reward ${rew}; night ${night}; ${JSON.stringify({ pos: r1.pos, round: r1.round, retry: r1.retry, ps: r1.ps })}; 新面孔 ${fresh}/3 (${r0.order.slice(0, 3)} → ${r1.order.slice(0, 3)}); 1st ${trail1.join('>')}; 2nd boss ${r2.tail.join('>')} panel ${r2.one} said ${JSON.stringify(r2.said)}`);
      } catch (e) { record(47, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #48 中繼點＋吐司＋結算＋標題紀錄（v5）：第 9 位打贏 → 錢的吐司（領獎畫面）、走到第 10 位 → 中繼點吐司（來客畫面）都真的看得到 ≥1 秒（審查 #0、#3）；
    //   跳到第 23 位、loseNext → 結算（牆一排、唱片櫃／出門看看在底下那列、不用捲；審查 #12）；標題「最遠：第 23 位」
    if (want(48)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        // 不加 fast=1：吐司照真人玩的時間（fast 是 4 倍速，吐司只留 0.5 秒）
        await seededContinue4(page, { ace: 'pearl', pos: 9 }, Q(''));
        await waitScreen(page, 'night'); await sleep(500);
        const toCp0 = await page.evaluate(() => window.DipLabEngine.toCheckpoint(window.__lab.run, window.DipLabContent));
        // 吐司看不看得到：每一顆記下出現、開始淡出（.out）或被拿掉的時間，和在畫面裡時的位置與不透明度
        await page.evaluate(() => {
          window.__toasts = [];
          const seen = new Map();
          const look = () => { document.querySelectorAll('#app .lb-toast').forEach(n => {
            let t = seen.get(n); if (!t) { t = { text: n.textContent, add: performance.now(), end: null, vis: 0, screen: window.__lab.screen() }; seen.set(n, t); window.__toasts.push(t); }
            const r = n.getBoundingClientRect(), cs = getComputedStyle(n);
            if (!n.classList.contains('out') && r.width > 0 && r.top >= 0 && r.bottom <= innerHeight && cs.visibility !== 'hidden' && +cs.opacity > 0.5) t.vis = performance.now() - t.add;
            if (n.classList.contains('out') && t.end == null) t.end = performance.now() - t.add;
          }); seen.forEach((t, n) => { if (!n.isConnected && t.end == null) t.end = performance.now() - t.add; }); };
          new MutationObserver(look).observe(document.getElementById('app'), { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
          setInterval(look, 50);
        });
        await jsClick(page, '[data-a=go]');
        await duelReady(page);
        await page.waitForFunction(() => window.__lab.rawDuel() && !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
        await sleep(400);
        await page.evaluate(() => window.__lab.forceWin());
        await waitScreen(page, 'reward', 15000); await sleep(1800);
        await page.evaluate(() => { const b = document.querySelector('.lb-sheet.reward [data-a=skip]'); if (b) b.click(); });
        for (let g = 0; g < 40 && (await screen(page)) !== 'night'; g++) { await page.evaluate(() => { const b = document.querySelector('.lb-sheet.level [data-lv]'); if (b && !document.querySelector('.lb-sheet.level.arming')) b.click(); }); await sleep(300); }
        await sleep(2400);
        const cp = await page.evaluate(() => { const U = window.DipLabContent.trial.ui, R = window.__lab.run;
          return { toasts: window.__toasts.map(t => ({ text: t.text, vis: Math.round(t.vis), end: t.end == null ? null : Math.round(t.end), screen: t.screen })), best: window.__lab.save.best.checkpoints.slice(), run: R.checkpoints.slice(), pos: R.pos,
            want: U.checkpoint.replace('{n}', 10), money: window.DipLabContent.shopUi.earned.replace('{n}', ''), nh: document.querySelector('.lb-night .nh').textContent, toCp: U.toCheckpoint.replace('{n}', window.DipLabEngine.toCheckpoint(R, window.DipLabContent)), toCpN: window.DipLabEngine.toCheckpoint(R, window.DipLabContent) }; });
        const tCp = cp.toasts.find(t => t.text.indexOf(cp.want) >= 0), tMoney = cp.toasts.find(t => t.text.indexOf(cp.money) === 0);
        // 跳到第 23 位、下一場強制輸（說情也用掉）→ 結算
        await page.evaluate(() => { window.__lab.jump(23); window.__lab.loseNext(1, { noRetry: true }); });
        await waitScreen(page, 'night'); await sleep(500);
        await jsClick(page, '[data-a=go]');
        await duelReady(page);
        await page.evaluate(() => window.DipLabDuel.play({ i: 0, attr: 'c' }));
        const end = await advanceUntil(page, () => window.__lab.screen() === 'end', null, 40000);
        await sleep(1200);
        const r = await page.evaluate(() => { const S = window.DipLabContent.summary, R = window.__lab.run, sum = window.DipLabEngine.runSummary(R);
          const vis = sel => { const e = document.querySelector(sel); if (!e) return false; const b = e.getBoundingClientRect(), x = b.left + b.width / 2, y = b.top + b.height / 2; const top = document.elementFromPoint(x, y); return b.bottom <= innerHeight && b.top >= 0 && !!top && (top === e || e.contains(top)); };
          const wall = [...document.querySelectorAll('.lb-wall > *')].map(e => Math.round(e.getBoundingClientRect().top));
          return { h1: document.querySelector('.lb-endhero .lb-h1').textContent, title: S.title, rows: [...document.querySelectorAll('.lb-sum li')].map(li => li.textContent.replace(/\s+/g, ' ').trim()), sum,
            cps: (document.querySelector('.lb-cps') || {}).textContent || '', cpsWant: S.checkpoints.replace('{list}', '10'), again: (document.querySelector('[data-a=again]') || {}).textContent || '', againWant: S.again,
            far: window.__lab.save.best.far, runs: window.__lab.save.runs.length, top: document.querySelector('#top').textContent,
            btns: { shelf: vis('.lb-endbtns [data-a=shelf]'), taipei: vis('.lb-endbtns [data-a=taipei]'), again: vis('[data-a=again]') }, wallRows: new Set(wall).size, wallN: wall.length,
            scr: (() => { const s = document.querySelector('.lb-screen.end .lb-scroll'); return s ? s.scrollHeight - s.clientHeight : -1; })() }; });
        const sc = await noScroll(page);
        await openTitle(page);
        const t = await page.evaluate(() => ({ foot: [...document.querySelectorAll('.lb-foot')].map(x => x.textContent).join('|'), want: window.DipLabContent.summary.best.replace('{n}', 23), last: (document.querySelector('[data-a=end]') || {}).textContent || '', lastWant: window.DipLabContent.trial.ui.lastSummary,
          top: document.querySelector('#top .tt').textContent.trim(), game: window.DipLabContent.trial.ui.game }));
        const ok = toCp0 === 1 && tMoney && tMoney.vis >= 1000 && tMoney.screen === 'reward' && tCp && tCp.vis >= 1000 && tCp.screen === 'night' && cp.pos === 10 && cp.best.includes(10) && cp.run.includes(10) &&
          cp.toCpN === 10 && cp.nh.indexOf(cp.toCp) >= 0 &&
          end && r.h1 === r.title && r.rows.length === 3 && r.rows[0].indexOf('第 23 位') >= 0 &&
          r.cps === r.cpsWant && r.again === r.againWant && r.far === 23 && r.runs === 1 && /^第 23 位/.test(r.top.trim()) && scrollOk(sc) && r.btns.shelf && r.btns.taipei && r.btns.again && r.wallRows === 1 && r.scr <= 1 &&
          t.foot.indexOf(t.want) >= 0 && t.last === t.lastWant && t.top === t.game;
        record(48, size, ok, `toCheckpoint at 9 = ${toCp0}, at 10 = ${cp.toCpN}「${cp.nh}」; toasts ${JSON.stringify(cp.toasts)}; best.checkpoints ${cp.best}; end ${end}「${r.h1}」 rows ${JSON.stringify(r.rows)}「${r.cps}」 again「${r.again}」 btns ${JSON.stringify(r.btns)} wall ${r.wallN}/${r.wallRows} row(s) scroll ${r.scr}; far ${r.far}; scroll ${JSON.stringify(sc)}; title「${t.top}」「${t.foot}」「${t.last}」`);
      } catch (e) { record(48, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #29 主控台 0 錯誤（這個尺寸開過的所有頁面）
    if (want(29)) {
      const all = errsBySize.flatMap(p => (p._errors || []).concat((p._badLocal || []).map(x => 'local ' + x), (p._loadFail || []).slice(p._badRemote || 0)));
      record(29, size, !all.length, all.length ? all.slice(0, 5).join(' | ') : '0 errors');
    }
    FIRST = false;
  }
  await browser.close();
  const fail = results.filter(r => !r.ok);
  console.log(`\n${results.length - fail.length}/${results.length} PASS`);
  if (fail.length) { console.log('FAILED: ' + fail.map(r => `#${r.n}[${r.size}]`).join(' ')); process.exit(1); }
}
run().catch(e => { console.error(e); process.exit(1); });
