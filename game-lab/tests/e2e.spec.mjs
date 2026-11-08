// game-lab/tests/e2e.spec.mjs：品味對決 v4 端對端測試（SPEC-v4 §5.5；B2）。保留 v3 的情境編號，內容換成 v4。
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
//   4 對決版面（v4 名字）：e-hint e-rec tri rounds 手牌（疊成一排的 5 張＋王牌）的下緣都 ≤ innerHeight；攤開、浮起之後三顆屬性鈕也在畫面裡；誠實度名牌看不到（D §5）
//   6 點擊區：屬性鈕 ≥44×44、攤開的封面 ≥44×44、頂欄鈕 ≥40×44；數字 ≥12px（FIXLIST 11：沒有星鈕列、沒有丟！）
//   7 序章打贏 → 地上的唱片撿起面板（沒有標題字，只有封面、藝人《專輯》、兩顆鈕）→ 配件三選一 → 今晚來客且第一位客人已在店裡
//   8 序章打輸 →「……再一場。」→ 同一位男子、聲望回滿
//   9 一整晚 autoplay('thoughtful',{until:'end'}) → 結算三件事 → 13 再來一夜（挑王牌 → 走到特價箱挑三張 → 今晚來客、包包 7；上一晚的配件還在）
//  10 續玩：打到第 2 手重新整理 → 繼續今晚 → 同一場、同一手
//  11 存檔只寫 dipGameLab_v1、版本 4；v3 存檔被安全丟掉
//  12 網路：沒有 Firebase
//  14 長按手牌封面＝唱片資訊（疊著也行）；點一下＝攤開／浮起（不開）
//  16 標題有存檔時點兩下店門＝繼續今晚
//  17 他在上、你在下；舞台他左你右、老闆在中間；一台唱盤在兩人中間
//  18 每張專輯都開得了唱片資訊：手牌（長按）、王牌（長按）、牌桌兩張、猜歌面板、挑唱片面板、唱片櫃、牆上的（抽屜與特價箱：真的經濟介面才測）
//  19 教學三王牌六手照課表：每手 kind／toE／toP＝C.tutorial.expect、第 6 手 KO、學到 L1–L6、tutorialDone
//  20 教學擋錯招：第 1 手攤開後點別張、第 2 手點浮起那張的別色屬性鈕（都在遮罩上）→「先點我指的這裡。」、手數不前進（第 1 手沒浮起、第 2 手沒丟出去）
//  21 直接開打：沒有遮罩、男子 10 聲望；21b 教學程式不在（canTutorial 假）：兩顆鈕都在，第 0 顆照課表出牌（他 18、第一手 Mylo Xyloto）、沒有遮罩
//  22 不捲動：標題、對決、今晚來客、挑唱片、規則卡、撿起面板
//  27 無縫接軌：今晚來客 → 對決 → 挑唱片 → 今晚來客，#stage canvas 是同一個節點；黑條只在 #stage 裡、≤1.6 s
//  29 主控台 0 錯誤
//  33 老闆說情：輸一次 → 同一位重開、聲望 10；再輸 → 散場
//  35 跳過教學＋重新整理不會重開教學
//  36 ⏸ 回標題會結束教學；之後的直接開打不被教學劫持
//  37 連點安全：推門 ×2、下一位 ×2、台北 ×2
//  38 傳說藏家登場卡擋點擊、點一下提早收掉
//  39 規則卡六行＝D 規則卡逐字、頁尾聲望代入、不捲動；公告＝規則卡；重看教學帶得起來
//  40 375×548 等矮螢幕：有存檔時「再按一次就放棄今晚」那行在畫面內
//  41（新）贏一位 →「+$1,500」吐司（千分位，FIXLIST 8）、今晚來客顯示錢
//  42（新）序章與對決中真點箱子 → 老闆泡泡「打完再翻。」、不開抽屜
//  43（新）櫃檯：今晚來客＝配件面板（openRelicShop）、序章＝老闆一句
//  44（新）序章途中重新整理：特價箱還沒挑 → 從頭開始；挑過了 → 直接到對決
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
const LAYOUT = new Set([1, 3, 4, 6, 10, 16, 17, 18, 19, 20, 22, 27, 29, 33, 35, 36, 39, 40, 41, 42]);
const ECON = process.env.LAB_ECON || (fs.existsSync(path.join(LAB, 'econ.js')) ? 'real' : 'stub');
const STUB = fs.readFileSync(path.join(HERE, 'econ-stub.js'), 'utf8');
// D §5 規則卡六行（店主拍板，逐字；第 6 行照 FIXLIST 2／3 改：王牌沒有「不會被剋」、六手比聲望條剩幾成）
const RULE_LINES = [
  '每張專輯有經典／冷門／硬蕊三個星數。',
  '每一手，你和他各暗中挑一張專輯、一個屬性，同時亮出。',
  '冷剋經、經剋硬、硬剋冷：剋中，就用你那個屬性的星數扣他聲望。',
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
            // 攤開、浮起第 0 張：三顆屬性鈕都在畫面裡
            await tapAt(page, 'dt:hand'); await sleep(300); await tapAt(page, 'dt:card-0'); await sleep(300);
            const ab = await page.evaluate(() => [...document.querySelectorAll('.dl .pop .ab')].map(b => { const r = b.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.bottom)]; }));
            await page.evaluate(() => window.DipLabDuel.spread(false)); await sleep(250);
            const bad = Object.entries(r.out).filter(([k, v]) => v < 0 || v > r.vh);
            record(4, size, !bad.length && ab.length === 3 && ab.every(([t, b]) => t >= 0 && b <= r.vh) && !r.old && !r.honVis && r.hint && !r.attrWord, `bottoms ${JSON.stringify(r.out)} ≤ ${r.vh}; 屬性鈕 ${JSON.stringify(ab)}; 舊星鈕／丟！${r.old}; honesty visible ${r.honVis}; hint「${r.hint}」${bad.length ? ' BAD ' + JSON.stringify(bad) : ''}`);
          }
          if (want(6)) {
            await tapAt(page, 'dt:hand'); await sleep(300); await tapAt(page, 'dt:card-1'); await sleep(300);
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
            await page.evaluate(() => window.DipLabDuel.spread(false)); await sleep(250);
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
            // 點一下＝攤開；再點一張＝浮起（都不開唱片資訊）
            await tapAt(page, '.dl [data-tut=card-0]'); await sleep(400);
            const sp = await page.evaluate(() => window.DipLabDuel.debug().spread);
            await tapAt(page, '.dl [data-tut=card-0]'); await sleep(400);
            const tapOpen = !!(await page.$('#cardInfoMask'));
            const sel2 = await page.evaluate(() => window.DipLabDuel.debug().sel);
            await page.evaluate(() => window.DipLabDuel.spread(false));
            record(14, size, open && !sel1 && !sel0 && sp && !tapOpen && sel2 && sel2.i === 0, `疊著長按 → 唱片資訊 ${open}（沒選到 ${!sel1}）；tap → 攤開 ${sp}；tap → 浮起 ${JSON.stringify(sel2)}, info ${tapOpen}`);
          }
          if (want(22)) { const sc = await noScroll(page); record(22, size, scrollOk(sc), `duel scroll ${JSON.stringify(sc)}`); }
          if (want(18)) {
            const opened = { guess: guessInfo }, closedAtOnce = [];
            // 長按：盤面送出 'info' 就算開了（放開手指補送的 click 落在唱片資訊的遮罩外面會把它關掉——cardinfo.js／duel.js 的事，見 notes-B2 請求；這裡另外記下來）
            await page.evaluate(() => { window.__infoEv = []; window.DipLabDuel.on('info', w => window.__infoEv.push(w)); });
            for (const [k, sel, where] of [['hand', '.dl [data-tut=card-0]', 'hand'], ['ace', '.dl [data-tut=card-ace]', 'hand-ace']]) {
              await page.evaluate(() => { window.__infoEv.length = 0; });
              await longPress(page, ctx, sel);
              const mask = await infoOpen(page, 1500);
              const ev = await page.evaluate(() => window.__infoEv.slice());
              opened[k] = mask || ev.includes(where);
              if (!mask && ev.includes(where)) closedAtOnce.push(k);
              if (mask) await closeInfo(page);
            }
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

    // #9 一整晚 ＋ #13 再來一夜 ＋ #11 存檔隔離 ＋ #12 網路
    if (want(9) || want(13) || want(11) || want(12)) {
      const { ctx, page } = await newPage(browser, w, h, { watchStorage: true }); track(page);
      try {
        await openTitle(page);
        await page.click('[data-a=quiet]');
        await sleep(300);
        await page.evaluate(() => window.__lab.autoplay('thoughtful', { until: 'end', guess: 'right' }));
        // 經濟介面是真的時，特價區要人挑（替身自己挑）
        let end = false;
        const t0 = Date.now();
        while (!end && Date.now() - t0 < 240000) {
          end = (await screen(page)) === 'end';
          if (!end && ECON === 'real') await answerBargain(page);
          if (!end) await sleep(400);
        }
        await sleep(800);
        const r = await page.evaluate(() => ({ over: window.__lab.run.over, rows: [...document.querySelectorAll('.lb-sum li')].map(li => li.textContent.replace(/\s+/g, ' ').trim()), again: !!document.querySelector('[data-a=again]'), nights: window.__lab.save.nights.length, trail: window.__lab.trail(), relics: window.__lab.save.relics.slice() }));
        const sawNight = r.trail.filter(s => s === 'night').length, sawReward = r.trail.includes('reward');
        if (want(9)) record(9, size, end && r.rows.length === 3 && r.again && r.nights === 1 && sawNight >= 2 && (sawReward || r.over === 'dead'), `end ${end} ${r.over}; rows ${JSON.stringify(r.rows)}; night×${sawNight}, reward ${sawReward}`);
        if (want(13)) {
          await page.evaluate(() => window.__lab.stop());
          await jsClick(page, '[data-a=again]');
          const ace = await advanceUntil(page, () => !!document.querySelector('.lb-sheet.acepick [data-a=ok]'), null, 20000);
          await sleep(450);
          await jsClick(page, '.lb-sheet.acepick [data-a=ok]');
          let n2 = false; const t1 = Date.now();
          while (!n2 && Date.now() - t1 < 20000) { n2 = (await screen(page)) === 'night'; if (!n2) { await answerBargain(page); await sleep(200); } }
          await sleep(500);
          const rr = await page.evaluate(() => !window.__lab.run ? { noRun: true, s: window.__lab.screen(), beat: window.__lab.beat, trail: window.__lab.trail().slice(-5), sheet: (document.querySelector('#panel > .lb-sheet') || {}).className || null, calls: (window.__econCalls || []).map(c => c.m) } : ({ prologue: window.__lab.run.prologue, nightNo: window.__lab.run.nightNo, relics: window.__lab.run.relics, bag: window.__lab.run.bag.length, picked: window.__lab.run.shop.bargainPicked, trail: window.__lab.trail().slice(-4) }));
          const ms = Date.now() - t1;
          record(13, size, ace && n2 && rr.prologue == null && rr.nightNo === 2 && rr.bag === 7 && rr.picked && JSON.stringify(rr.relics) === JSON.stringify(r.relics), `再來一夜 → acePick ${ace} → night ${n2} (${ms} ms); ${JSON.stringify(rr)}; relics last night ${JSON.stringify(r.relics)}`);
        }
        if (want(11)) {
          const ks = await page.evaluate(() => ({ keys: [...new Set(window.__lsKeys)], v: JSON.parse(localStorage.getItem('dipGameLab_v1')).v }));
          const bad = ks.keys.filter(k => !ALLOWED_LS.has(k));
          // v3 存檔：版本不對 → 整份丟掉、不壞
          await page.evaluate(() => localStorage.setItem('dipGameLab_v1', JSON.stringify({ v: 3, run: { v: 3, bag: [], order: ['man'], relics: [], stats: {}, ace: 'hall' }, settings: { sound: false }, shelf: { x: 1 }, tutorialDone: true })));
          await openTitle(page, Q());
          const old = await page.evaluate(() => ({ v: window.__lab.save.v, run: window.__lab.save.run, cont: !!document.querySelector('[data-a=cont]'), push: !!document.querySelector('[data-a=push]') }));
          record(11, size, !bad.length && ks.v === 4 && old.v === 4 && !old.run && !old.cont && old.push, `keys ${JSON.stringify(ks.keys)} v${ks.v}; old v3 save → ${JSON.stringify(old)}`);
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
          const C = await page.evaluate(t => ({ exp: window.DipLabContent.tutorial.expect[t], hp: window.DipLabContent.tutorial.hp }), tier);
          const done = await page.waitForFunction(() => window.__lab.save.tutorialDone === true, null, { timeout: 20000 }).then(() => true, () => false);
          const handsOk = res.hands && res.hands.length === 6 && res.hands.every((c, k) => c.kind === C.exp[k].kind && (C.exp[k].toE == null || c.toE === C.exp[k].toE) && (k === 4 ? c.toP === 5 - c.pStar && c.blocked === 'gap' : c.toP === C.exp[k].toP)) && res.hands[5].ace;
          const ko = await page.waitForFunction(() => window.__lab.screen() === 'scene' || (window.__lab.run && window.__lab.run.pending), null, { timeout: 20000 }).then(() => true, () => false);
          const callOk = res.callouts.length === 5 && res.callouts.every(c => c && c.op > 0.95 && c.w >= 150 && c.l2);
          if (want(19)) record(19, size, handsOk && done && ko && callOk && res.learned.join() === 'L1,L2,L3,L4,L5,L6', `${tier}: callouts ${callOk ? 'ok' : JSON.stringify(res.callouts)}; hands ${JSON.stringify((res.hands || []).map(c => c.kind + ':' + c.toE + '/' + c.toP))}; learned ${res.learned}; tutorialDone ${done}; KO→收尾 ${ko}`);
          if (variant === 'wrong') {
            // 第 1 手點別張：沒浮起；第 2 手點別色屬性鈕：沒丟出去、還是那張浮著（FIXLIST 11）
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

    // #33 老闆說情：輸一次 → 同一位重開、聲望 10；再輸 → 散場
    if (want(33)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue4(page, { ace: 'pearl', idx: 1 });
        await waitScreen(page, 'night');
        const eid = await page.evaluate(() => window.__lab.run.order[1]);
        await jsClick(page, '[data-a=go]');
        await duelReady(page);
        await resolveHands(page, 1, 'thoughtful');
        await page.evaluate(() => window.__lab.forceLose());
        const menu = await page.waitForSelector('.lb-dq.hasmenu .lb-dqopt[data-i="0"]', { timeout: 20000 }).then(() => true, () => false);
        const txt = menu ? await page.evaluate(() => document.querySelector('.lb-dq').textContent) : '';
        await sleep(450);
        await jsClick(page, '.lb-dq .lb-dqopt[data-i="0"]');
        await duelReady(page);
        const v = await page.evaluate(() => ({ d: window.__lab.duel(), left: window.__lab.run.retryLeft }));
        await page.evaluate(() => window.__lab.forceLose());
        const end = await waitScreen(page, 'end', 30000);
        const o = await page.evaluate(() => window.__lab.run.over);
        record(33, size, menu && /再一場/.test(txt) && v.d.eId === eid && v.d.pHp === YOU_HP && v.left === 0 && end && o === 'dead', `menu ${menu}; retry vs ${v.d.eId} (want ${eid}) pHp ${v.d.pHp} left ${v.left}; 2nd loss → end ${end} (${o})`);
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
        await tapAt(page, 'dt:hand'); await sleep(300); await tapAt(page, 'dt:card-1'); await sleep(300);
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
        const sel = await page.evaluate(() => window.DipLabDuel.debug().sel || (window.DipLabDuel.debug().spread ? 'spread' : null));
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
        const footOk = !/[{}]/.test(rc.foot) && rc.foot.includes('你 ' + YOU_HP + ' 聲望');
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
