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
//     升級三選一由 autoplay 自動挑（picks＝等級−1）、標題紀錄「最遠」→ 13 再挑戰一趟（店主 11-13：不挑王牌，老闆說「老樣子，《王牌》。」沿用 save.lastAce →
//     走到特價箱挑三張 → 來客、包包 7、runNo 2、王牌＝上一趟那張；上一趟的配件還在；整段沒有挑王牌面板）
//  10 續玩：打到第 2 手重新整理 → 繼續試煉 → 同一場、同一手
//  11 存檔只寫 dipGameLab_v1（＋第 B 波的 .bringKey／.daily／.bak6 小鍵）、版本 8（第 C 波）；v3 存檔被安全丟掉；v4 存檔遷移（唱片櫃、配件留著，一晚的 run 丟掉，nights → runs）
//  12 網路：沒有 Firebase
//  14 長按手牌封面＝唱片資訊（疊著也行）；點一下＝在那張打開、再點一下＝收回（都不開唱片資訊；v5 手風琴）
//  16 標題有存檔時點兩下店門＝繼續試煉
//  17 他在上、你在下；舞台他左你右、老闆在中間；一台唱盤在兩人中間
//  18 每張專輯都開得了唱片資訊：手牌（長按）、王牌（長按）、牌桌兩張、上一手小列兩張（第 2 手：點一下＝上一手詳情、詳情裡點兩張封面（11-17）；長按他那張；放開手指後還開著）、猜歌面板、挑唱片面板、唱片櫃、牆上的（抽屜與特價箱：真的經濟介面才測）
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
//  （從唱片櫃挑牌開局，店主 11-13；SPEC 從唱片櫃挑牌開局 §3）
//  49 掉落旁白：打贏客人（他丟過牌）→ 領獎前對白框念「對方似乎掉落了什麼……」（＝C.script.drop），面板之後才出來；掉落的唱片全在他這一場的實際牌單（trialDeck）裡、記進 run.drops
//  50 結算帶走一張：「這一趟帶走一張」鈕（取代那面牆，不捲動）→ 面板（候選＝engine.keepCandidates：擁有的、頂點卡不列）→ 帶走 → 唱片櫃擁有（src run）＋金框「店內取得」
//     （結算那塊、唱片櫃頁「我的收藏」都是金框）；只能帶一次
//  51 第二趟挑種子：再挑戰一趟 →（不挑王牌，沿用 save.lastAce＝pearl）→ 挑種子面板（擁有、不是頂點卡；三色篩選；最多 3 張；面板內可捲、整頁不捲）→ 就這幾張 → 特價箱 → 來客：
//     包包＝種子＋老闆送的補到 4 張＋特價箱 3 張＝7、run.seeds＝挑的；序章那一趟不挑
//  52 種子（第 A 波 5：移出包包只走櫃檯「賣給老闆」）：錢不夠時箱子的鈕停用「錢不夠 $n・去櫃檯賣唱片」、沒有先賣子面板；引擎 buy 帶種子 sellId → counterOnly、
//     單獨 sell 種子 → ok（$0、reclaim seed）；包包面板種子標「櫃裡帶來」、整個包包沒有「賣」鈕；櫃檯「賣給老闆」：種子那格「交還老闆」→ 交還：$0、不再是種子、老闆說一句
//  53 存檔 v5 → v7（第 B 波 SAVE_V 7；v5→v6 的規則照舊）：原本的唱片櫃都留成「認識」；挑過的王牌那幾組送的四張（gift）、打倒藏家拿到的王牌（boss，照 engine.bossAceFor）算擁有；進行中的 run 照留
//     解鎖制（店主 11-16）：lastAce 那派預設那張補記成擁有（src 'start'）；舊 run 補快照（已解鎖＝lastAce ∪ 擁有頂點卡的派，打倒過藏家＝那張算這一趟收的）
//  （換王牌，店主 11-13：開局不再三選一、沿用上次那張；想換跟老闆說）
//  54 第 1 位開打前：來客畫面一次性提示（老闆頭上閃一下＋吐司「想換王牌，點老闆。」，save.seen.aceSwap，只出一次）→ 真點老闆＝小選單「聊聊／換一張王牌」（不捲動）
//     → 聊聊＝老闆照舊說一句 → 換一張王牌＝挑王牌面板（標題「想換一張？」、預設選中現在那張、不捲動）→ 換 pearl：包包送的四張原位換、特價箱不動、
//     save.lastAce、新那組算擁有（gift）、老闆說換好了＋吐司 → 再換選同一張＝不換（老闆「那就照舊。」）→ 打過第 1 位（第 2 位）點老闆：沒有選單、直接開櫃檯「賣給老闆」（第 A 波 5）
//     解鎖制（店主 11-16）：存檔先放好流亡那張（pearl 解鎖）；異端（heresy）還鎖著＝面板上鎖、點了不選、說明那行寫「打倒傳說藏家解鎖」
//  （第 A 波，店主 11-16「全部開始做吧」）
//  57 客人走到對戰台等你（真點「對戰台」開打）、來客條稱號、客人資訊「常出：○○」、頂欄「再贏 N 位破紀錄」、對決名字旁稱號；讀對了／看穿了、越讀越響；
//     險勝章＋連勝 +1＋老闆補一句、錢跳數字入帳；差一點摘要（差 N 位破紀錄、他只剩 X 聲望、第 n 手被○剋○翻盤）
//  （包包不限張數，店主 11-16）
//  56 包包 8 張打贏 → 挑唱片面板小字「包包 8 張」→ 收這張＝直接進包包（第 9 張；沒有「挑一張拿出來」面板）；包包 20 張再打贏 → 第 21 張也一樣；包包條「包包 21 張」
//  （主站互通入口，v5 第六項第一期，店主 11-15）
//  55 主站「帶去店裡對決」：?card=<遊戲卡 id>（第一次玩）→ 網址的 card 拿掉、save.bring、標題吐司（先走一趟那句）→ 序章算走完、唱片櫃有幾張比它強的 →
//     再推門＝第二趟挑種子：第一張是它、已勾、封面「帶來的」、1／3、不捲動 → 就這幾張 → 開局包包第一張是它、run.seeds、save.bring 清空、認識不算擁有；
//     ?card=王牌 →「店裡沒有這張唱片。」、不收；舊 slug（第 B 波以前的連結）照表換成 catalogId 收下；不是第一次玩 → 下一趟那句；
//     唱片資訊「在頻率光譜找它 ↗」：在頻率那行、/tune/?q=藝人 專輯、新分頁、不是 .streaming-btn、點了開新分頁、回來聲音還在（dip-player 沒關自動試聽）
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { launch, newPage as newPage0, record, results, sleep, Q, SIZES, ALLOWED_LS, screen, waitScreen, jsClick, tapAt, hitPoint, duelReady, openTitle, noScroll, scrollOk,
  answerBargain, prologueToDuel as prologueToDuel4, seedRun as seedRun4, seededContinue as seededContinue4, advanceUntil, resolveHands, longPress, infoOpen, closeInfo,
  watchSay, econCalls, tapHot, waitStep, walkTutorial as walkTutorial4, lootReady, passLoot, clearStall, lootState, stallState, passCards, luSkip } from './e2e-lib.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const LAB = path.resolve(HERE, '..');
const ONLY = process.env.LAB_ONLY ? new Set(process.env.LAB_ONLY.split(',').map(Number)) : null;
const YOU_HP = createRequire(import.meta.url)(path.join(LAB, 'engine.js')).CFG.playerHp;   // 你的聲望（FIXLIST 11 H5-1：9）
const FULL = process.env.LAB_FULL === '1';
const LAYOUT = new Set([1, 3, 4, 6, 10, 16, 17, 18, 19, 20, 22, 27, 29, 33, 35, 36, 39, 40, 41, 42, 45, 46, 48, 49, 50, 51, 52, 54, 55, 57]);
const SHOTS = process.env.LAB_SHOTS || '';      // 設了就把 #55 的挑種子面板、唱片資訊截圖存到這個資料夾（給店主看）
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
// 掉落旁白（從唱片櫃挑牌開局，店主 11-13）：領獎畫面先念「對方似乎掉落了什麼……」（他有能收的唱片才有）；點一下跳過，等到面板（挑唱片／升級）出來
async function pastDrop(page, ms = 5000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    const st = await page.evaluate(() => ({ dq: !!document.querySelector('.lb-dq.drop .nx.on'), sheet: !!document.querySelector('#panel > .lb-sheet') }));
    if (st.sheet) return lootReady(page, Math.max(1000, ms - (Date.now() - t0)));   // 第 C 波：戰利品列（不念旁白、字幕不用點）三張蓋牌翻完才算過了掉落那段（SPEC-C §4.1）
    if (st.dq) await jsClick(page, '.lb-dq.drop');
    await sleep(120);
  }
  return false;
}
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
              // 頂欄按鈕：藏起來的不算（11-17 對決中的「紀錄」第 1 手揭曉前不出）
              document.querySelectorAll('#top button').forEach(b0 => { if (b0.hidden) return; const b = b0.getBoundingClientRect(); const cs = getComputedStyle(b0, '::after'); const hh = b.height + (parseFloat(cs.top) < 0 ? -parseFloat(cs.top) * 2 : 0); if (b.width < 40 || hh < 44) small.push('top ' + b0.textContent + ' ' + Math.round(b.width) + 'x' + Math.round(hh)); });
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
            // 上一手小列（店主 11-16）：第 2 手開始時牌桌最上面那列＝第 1 手兩張；長按他那張開唱片資訊（where＝last-e）；
            //   11-17 起點一下＝上一手詳情（.dl-rc），詳情裡真點兩張封面開唱片資訊（where＝recap-e／recap-p）；放開手指 400 ms 後還開著
            const n2 = await duelReady(page, 15000) && await page.evaluate(() => { const x = window.DipLabDuel.debug(); return x.n === 2 && !x.view.over; });
            if (!n2) opened.last = 'no hand 2';
            else {
              for (const [k, side, how] of [['lastE', 'e', 'tap'], ['lastP', 'p', 'tap'], ['lastLong', 'e', 'long']]) {
                await page.evaluate(() => { window.__infoEv.length = 0; });
                const sel = `.dl .lastplay .lp.${side}`;
                let where = 'last-' + side, panel = null;
                if (how === 'long') await longPress(page, ctx, sel);
                else {
                  const r0 = await hitPoint(page, sel); if (r0) await page.touchscreen.tap(r0.x, r0.y);
                  panel = await page.waitForSelector('.dl .dl-rc', { timeout: 2500 }).then(() => true, () => false);
                  await sleep(250);
                  const r1 = panel ? await hitPoint(page, `.dl .dl-rc [data-rc-card="${side}"]`) : null;
                  if (r1) await page.touchscreen.tap(r1.x, r1.y);
                  where = 'recap-' + side;
                }
                const open0 = await infoOpen(page, 2500);
                await sleep(400);
                const mask = !!(await page.$('#cardInfoMask'));
                const ev = await page.evaluate(() => window.__infoEv.slice());
                opened[k] = open0 && mask && ev.includes(where) && panel !== false ? true : (panel === false ? 'no recap panel' : (open0 ? 'closed' : 'missing')) + ' ' + ev.join(',');
                if (open0 && !mask) closedAtOnce.push(k);
                if (mask) await closeInfo(page);
                if (panel) { await page.evaluate(() => { const b = document.querySelector('.dl .dl-rc [data-rc=x]'); if (b) b.click(); }); await sleep(200); }
              }
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
        await pastDrop(page);
        await sleep(1200);
        const scR = await noScroll(page);
        const rew = await page.evaluate(() => { const b = document.querySelector('.lb-sheet.reward [data-pick]'); if (!b) return null; const r = b.getBoundingClientRect(); const f = document.querySelector('.lb-sheet.reward .foot').getBoundingClientRect(); return { btnBottom: r.bottom, footTop: f.top, vh: innerHeight }; });
        await jsClick(page, '.lb-sheet.reward .lb-ct [data-info][data-cid]');
        const info = await infoOpen(page);
        if (info) await closeInfo(page);
        await jsClick(page, '.lb-sheet.reward [data-pick]');
        // 第 I 波 I-0（SPEC-I §7.2）：第 1 位打贏就升到 Lv2＝收完唱片接升級面板（挑第一格），才回來客
        for (let g = 0; g < 40 && (await screen(page)) !== 'night'; g++) { await page.evaluate(() => { const b = document.querySelector('.lb-sheet.level [data-lv]'); if (b && !document.querySelector('.lb-sheet.level.arming')) b.click(); }); await sleep(300); }
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
        // 第 A 波 1：推門進來的第 1 位從門邊直接走到對戰台（duelE）等你（不再停在門邊 atdoor）
        await page.waitForFunction(() => { const s = window.__lab.stage, f = s.pos('f'), d = s.layout.spots.duelE; return f && !f.hidden && Math.hypot(f.x - d[0], f.y - d[1]) <= 3; }, null, { timeout: 8000 }).catch(() => {});
        await sleep(300);
        const st = await page.evaluate(() => { const r = window.__lab.run, s = window.__lab.stage, f = s.pos('f'), at = s.layout.spots.duelE; return { relics: r.relics, bag: r.bag, inside: r.shop.firstGuestInside, heads: document.querySelectorAll('[data-tut=night] .nc').length, f: f && { x: Math.round(f.x), y: Math.round(f.y), hidden: !!f.hidden }, duelE: at }; });
        const near = st.f && !st.f.hidden && Math.hypot(st.f.x - st.duelE[0], st.f.y - st.duelE[1]) <= 3;
        const ok = card && one && !one.title && one.notitle && /Eminem/i.test(one.text) && one.btns === 2 && one.cover && scrollOk(scOne) &&
          rel.join(',') === 'dustcover,stylus,cleaner' && night && st.relics.join() === 'stylus' && st.bag.includes("eminem|the eminem show") && st.bag.length === 8 && st.heads === 5 && !st.inside && near;   // r1 退役（SPEC-H §2.4）：店裡固定的熟客拿掉，webdriver 預設關活店，來客畫面不再有站樁的人
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
          // 審查 #3：挑種子面板不列這次王牌那組送的；扣掉之後沒有能帶的（上一趟只擁有那組）＝不開面板、直接走去特價箱
          const expSeeds = await page.evaluate(() => window.__lab.seedPool(window.__lab.save.lastAce || 'hall').length > 0);
          const last = await page.evaluate(() => { const t = window.__lab.save.lastAce, C = window.DipLabContent; return { tier: t, want: C.script.again[1].text.replace('{ace}', C.cards[C.aces[t]].album) }; });
          await jsClick(page, '[data-a=again]');
          await passCards(page);                  // 第 D 波：升級過場卡（樂歷 Lv 2…）一張一張點掉
          // 店主 11-13：開局不再挑王牌——老闆一句「老樣子，《王牌》。」（A2）就往下走；整段不該出現挑王牌面板
          let n2 = false, sawSeeds = false, sawAce = false, a2 = ''; const t1 = Date.now();
          while (!n2 && Date.now() - t1 < 25000) {
            n2 = (await screen(page)) === 'night';
            const st = await page.evaluate(() => ({ ace: !!document.querySelector('.lb-sheet.acepick'), beat: window.__lab.beat, tx: (document.querySelector('.lb-dq .tx') || {}).textContent || '' }));
            if (st.ace) sawAce = true;
            if (st.beat === 'A2' && st.tx.length >= a2.length) a2 = st.tx;
            // 第二趟起老闆那句說完先挑種子（有能帶的才開）：這裡「先不挑」（#51 測挑的那條路）
            if (!n2 && await page.$('.lb-sheet.seeds [data-a=none]')) { sawSeeds = true; await sleep(450); await jsClick(page, '.lb-sheet.seeds [data-a=none]'); await sleep(250); continue; }
            if (!n2) { await answerBargain(page); await sleep(200); }
          }
          await sleep(500);
          const rr = await page.evaluate(() => !window.__lab.run ? { noRun: true, s: window.__lab.screen(), beat: window.__lab.beat, trail: window.__lab.trail().slice(-5), sheet: (document.querySelector('#panel > .lb-sheet') || {}).className || null, calls: (window.__econCalls || []).map(c => c.m) } : ({ prologue: window.__lab.run.prologue, runNo: window.__lab.run.runNo, pos: window.__lab.run.pos, hp: window.__lab.run.hp, relics: window.__lab.run.relics, bag: window.__lab.run.bag.length, picked: window.__lab.run.shop.bargainPicked, ace: window.__lab.run.ace, lastAce: window.__lab.save.lastAce, trail: window.__lab.trail().slice(-4) }));
          const ms = Date.now() - t1;
          record(13, size, !sawAce && a2 === last.want && rr.ace === last.tier && rr.lastAce === last.tier && sawSeeds === expSeeds && n2 && rr.prologue == null && rr.runNo === 2 && rr.pos === 1 && rr.hp === YOU_HP && rr.bag === 7 && rr.picked && JSON.stringify(rr.relics) === JSON.stringify(r.relics),
            `再挑戰一趟 → 挑王牌面板 ${sawAce}（不該有）→ 老闆「${a2}」（要「${last.want}」）→ 挑種子（先不挑）${sawSeeds}（該不該開 ${expSeeds}）→ night ${n2} (${ms} ms); 王牌 ${rr.ace}＝上一趟 ${last.tier}; ${JSON.stringify(rr)}; relics last run ${JSON.stringify(r.relics)}`);
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
          const mig = await page.evaluate(() => { const S = window.__lab.save, C = window.DipLabContent, id = C.aces.hall; return { v: S.v, run: S.run, shelf: Object.keys(S.shelf).length, known: !!S.shelf[id] && !!S.shelf[id].own && S.shelf[id].src === 'start', giftsOwn: C.gifts.hall.every(g => S.shelf[g] && S.shelf[g].own && S.shelf[g].src === 'gift'), relics: S.relics, runs: S.runs.length, runNo: S.runs[0] && S.runs[0].runNo, best: S.best, nights: 'nights' in S, unlocks: 'unlocks' in S, learned: !!S.learned.L1, fast: S.settings.fastAnim, cont: !!document.querySelector('[data-a=cont]'), push: !!document.querySelector('[data-a=push]'), lastAce: S.lastAce, runSeq: (S.runSeq || {})['20261106'] }; });
          await openTitle(page, Q());
          mig.lastAce2 = await page.evaluate(() => window.__lab.save.lastAce);
          // v4 → v5 → v6：唱片櫃那張留成「認識」；挑過的王牌（lastAce hall）那組送的四張算擁有（一晚版沒有位數：不算打倒藏家）
          //   解鎖制（店主 11-16）：那張（殿堂預設）就是 lastAce 那派的頂點卡＝載入時補記成擁有（src start），known 改看這個
          const migOk = mig.v === 8 && !mig.run && mig.shelf === 5 && mig.known && mig.giftsOwn && mig.relics.join() === 'stylus' && mig.runs === 1 && mig.runNo === 1 && mig.best.far === 0 && Array.isArray(mig.best.checkpoints) && !mig.nights && !mig.unlocks && mig.learned && mig.fast && !mig.cont && mig.push &&
            mig.lastAce === 'hall' && mig.runSeq === 1 && mig.lastAce2 === 'hall';   // 審查 #1：lastAce 遷移後、重新整理後都留著；#5：同一天第幾趟的計數器從舊的一晚接著數
          record(11, size, !bad.length && ks.v === 8 && old.v === 8 && !old.run && !old.cont && old.push && migOk, `keys ${JSON.stringify(ks.keys)} v${ks.v}; old v3 save → ${JSON.stringify(old)}; v4 save → ${JSON.stringify(mig)}`);
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
        record('21b', size, menu === 2 && r.tut === 'undefined' && !r.mask && r.d.eMax === 18 && r.script && r.thrown[0] === "coldplay|mylo xyloto", `buttons ${menu}; DipLabTut ${r.tut}; mask ${r.mask}; man ${r.d.eHp}/${r.d.eMax}; script ${r.script}; his first ${r.thrown[0]}`);
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

    // #46 升級三選一（v5）：連升兩級＝面板開兩次（兩次都是 品味→底氣→聲望上限（第 I 波固定順序）、沒有「算了」、不捲動）；重新整理回到升級面板；選完到下一位
    if (want(46)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue4(page, { ace: 'pearl', idx: 1 });
        await waitScreen(page, 'night'); await sleep(500);
        // 第 I 波 I-0（SPEC-I §7.2）：等級 1 要 2（firstNeed）、等級 2 要 5：經驗 8＋打贏一般 2＝10 → 連升兩級（剩 3）。升到 Lv2 那次不自動加聲望上限（小字不出）、Lv3 那次照舊出
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
        const L2 = await page.evaluate(() => ({ title: document.querySelector('.lb-sheet.level h3').textContent, sub: document.querySelector('.lb-sheet.level .hd .sub').textContent, maxHp: window.__lab.run.maxHp, hp: window.__lab.run.hp,
          lv: [...document.querySelectorAll('.lb-sheet.level [data-lv]')].map(b => b.dataset.lv) }));
        await jsClick(page, '.lb-sheet.level [data-lv="atk"]');
        const night = await waitScreen(page, 'night', 10000);
        await sleep(500);
        const fin = await page.evaluate(() => { const R = window.__lab.run; return { pos: R.pos, level: R.level, picks: R.picks.slice(), atk: R.atk, ups: R.levelUps }; });
        // 第 I 波（SPEC-I §7.1、§7.7）：三格固定 品味→底氣→聲望上限（原本前兩格每次 50% 對調），連升兩級第二次面板順序一樣
        const ok = p1 && L1.title === L1.want && L1.lv.join() === 'atk,def,hp' && L2.lv.join() === 'atk,def,hp' && L1.nm.join() === L1.names.join() && !L1.cancel &&
          L1.sub.indexOf(L1.autoSub) < 0 && L2.sub.indexOf(L1.autoSub) === 0 && L1.level === 3 && L1.ups === 2 && L1.btnBottom <= L1.vh && scrollOk(sc1) && back && p2 && L2.maxHp === before.maxHp + 2 && L2.hp === before.hp + 2 &&
          night && fin.pos === 3 && fin.level === 3 && fin.picks.join() === 'hp,atk' && fin.atk === 1 && fin.ups === 0;
        record(46, size, ok, `1st「${L1.title}」${L1.lv}／2nd ${L2.lv} ${JSON.stringify(L1.nm)} sub「${L1.sub}」 2nd sub「${L2.sub}」 Lv ${L1.level} ups ${L1.ups}; bottom ${Math.round(L1.btnBottom)} ≤ ${L1.vh}; scroll ${JSON.stringify(sc1)}; reload → panel ${back}; hp pick ${before.maxHp}→${L2.maxHp}; 2nd「${L2.title}」; → night ${night} ${JSON.stringify(fin)}`);
      } catch (e) { record(46, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #47 打倒傳說藏家（v5）：王牌收進唱片櫃 → 領獎 → 下一輪（第 6 位、新面孔、說情重設）；沒有結算畫面
    if (want(47)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        // 解鎖制（店主 11-16）：三派都解鎖了（存檔先放好殿堂、流亡那兩張）＝旗標關時藏家照舊帶 run.bossAce 那張、每輪同一張（被剋鏈那段在 tests/e2e-unlock.mjs）
        await seededContinue4(page, { ace: 'heresy', idx: 4, ownAces: ['hall', 'pearl'] });
        await waitScreen(page, 'night'); await sleep(500);
        const r0 = await page.evaluate(() => { const R = window.__lab.run, id = R.bossCard || window.DipLabContent.aces[R.bossAce]; R.retryLeft = 0; return { order: R.order.slice(), bossAce: id, legacy: id === window.DipLabContent.aces[R.bossAce], shelf: !!window.__lab.save.shelf[id] }; });
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
        await clearStall(page);          // 第 C 波（SPEC-C §4.3）：打完藏家（換輪）先逛今天的攤位，逛完才是下一輪的來客條；這裡照「今天不逛了」帶過
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
        const ok = stake && one && one.cid === r0.bossAce && r0.legacy && shelf1 && rew && night && r1.pos === 6 && r1.round === 2 && r1.idx === 0 && r1.retry === 1 && !r1.over && r1.ps[0] === '第 6 位' && r1.ps[4] === '第 10 位' && fresh >= 1 && !r1.trail.includes('end') &&
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
        await waitScreen(page, 'reward', 15000);
        // 第 C 波（SPEC-C §4.1）：戰利品列的錢 1.35 秒才飛進頂上（錢那條這時才出）：照舊等玩家看 1.8 秒，從錢那條出來起算
        await page.waitForFunction(() => window.__toasts.some(t => t.screen === 'reward' && /^\+\$/.test(t.text)), null, { timeout: 6000 }).catch(() => {});
        await sleep(1800);
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
        await luSkip(page);                                    // 第 I 波 I-2（出貨上場制開）：跳到第 23 位＝這一輪要挑上場，面板照預設帶過
        await jsClick(page, '[data-a=go]');
        await duelReady(page);
        await page.evaluate(() => window.DipLabDuel.play({ i: 0, attr: 'c' }));
        const end = await advanceUntil(page, () => window.__lab.screen() === 'end', null, 40000);
        await sleep(1200);
        const r = await page.evaluate(() => { const S = window.DipLabContent.summary, R = window.__lab.run, sum = window.DipLabEngine.runSummary(R);
          const vis = sel => { const e = document.querySelector(sel); if (!e) return false; const b = e.getBoundingClientRect(), x = b.left + b.width / 2, y = b.top + b.height / 2; const top = document.elementFromPoint(x, y); return b.bottom <= innerHeight && b.top >= 0 && !!top && (top === e || e.contains(top)); };
          const wall = [...document.querySelectorAll('.lb-wall > *')].map(e => Math.round(e.getBoundingClientRect().top));
          // 一趟留一張（從唱片櫃挑牌開局）：有候選時那面牆換成「這一趟帶走一張」那顆鈕（一樣一排、不用捲）
          const keep = vis('.lb-keep[data-a=keep]');
          return { h1: document.querySelector('.lb-endhero .lb-h1').textContent, title: S.title, rows: [...document.querySelectorAll('.lb-sum li')].map(li => li.textContent.replace(/\s+/g, ' ').trim()), sum,
            cps: (document.querySelector('.lb-cps .cp') || {}).textContent || '', cpsWant: S.checkpoints.replace('{list}', '10'), again: (document.querySelector('[data-a=again]') || {}).textContent || '', againWant: S.again,
            far: window.__lab.save.best.far, runs: window.__lab.save.runs.length, top: document.querySelector('#top').textContent,
            btns: { shelf: vis('.lb-endbtns [data-a=shelf]'), taipei: vis('.lb-endbtns [data-a=taipei]'), again: vis('[data-a=again]') }, wallRows: new Set(wall).size, wallN: wall.length, keep,
            scr: (() => { const s = document.querySelector('.lb-screen.end .lb-scroll'); return s ? s.scrollHeight - s.clientHeight : -1; })() }; });
        const sc = await noScroll(page);
        // 審查 #6：有中繼點＋這一趟的唱片「我的收藏」都有了（沒有「帶走一張」）→ 那句併進中繼點那行；矮螢幕不被底下那排鈕切掉、不用捲
        await page.evaluate(() => { window.__lab.own(window.__lab.keepIds(), 'run'); window.__lab.go('end'); });
        await sleep(900);
        const ao = await page.evaluate(() => { const U = window.DipLabContent.seeds.ui, kn = document.querySelector('.lb-cps .kn'), eb = document.querySelector('.lb-endbtns');
          return { kn: kn ? kn.textContent : '', want: U.keepNone, keep: !!document.querySelector('.lb-keep'), cp: (document.querySelector('.lb-cps .cp') || {}).textContent || '',
            knBottom: kn ? Math.round(kn.getBoundingClientRect().bottom) : 0, btnTop: eb ? Math.round(eb.getBoundingClientRect().top) : 0,
            scr: (() => { const x = document.querySelector('.lb-screen.end .lb-scroll'); return x ? x.scrollHeight - x.clientHeight : -1; })() }; });
        const scAo = await noScroll(page);
        const aoOk = ao.kn === ao.want && !ao.keep && ao.cp === r.cpsWant && ao.knBottom > 0 && ao.knBottom <= ao.btnTop && ao.scr <= 1 && scrollOk(scAo);
        await openTitle(page);
        const t = await page.evaluate(() => ({ foot: [...document.querySelectorAll('.lb-foot')].map(x => x.textContent).join('|'), want: window.DipLabContent.summary.best.replace('{n}', 23), last: (document.querySelector('[data-a=end]') || {}).textContent || '', lastWant: window.DipLabContent.trial.ui.lastSummary,
          top: document.querySelector('#top .tt').textContent.trim(), game: window.DipLabContent.trial.ui.game }));
        const ok = toCp0 === 1 && tMoney && tMoney.vis >= 1000 && tMoney.screen === 'reward' && tCp && tCp.vis >= 1000 && tCp.screen === 'night' && cp.pos === 10 && cp.best.includes(10) && cp.run.includes(10) &&
          cp.toCpN === 10 && cp.nh.indexOf(cp.toCp) >= 0 &&
          end && r.h1 === r.title && r.rows.length === 3 && r.rows[0].indexOf('第 23 位') >= 0 &&
          r.cps === r.cpsWant && r.again === r.againWant && r.far === 23 && r.runs === 1 && /^第 23 位/.test(r.top.trim()) && scrollOk(sc) && r.btns.shelf && r.btns.taipei && r.btns.again && (r.keep ? r.wallRows === 0 : r.wallRows === 1) && r.scr <= 1 &&
          t.foot.indexOf(t.want) >= 0 && t.last === t.lastWant && t.top === t.game && aoOk;
        record(48, size, ok, `都有了＋中繼點 ${JSON.stringify(ao)} ${aoOk}；toCheckpoint at 9 = ${toCp0}, at 10 = ${cp.toCpN}「${cp.nh}」; toasts ${JSON.stringify(cp.toasts)}; best.checkpoints ${cp.best}; end ${end}「${r.h1}」 rows ${JSON.stringify(r.rows)}「${r.cps}」 again「${r.again}」 btns ${JSON.stringify(r.btns)} wall ${r.wallN}/${r.wallRows} row(s) keep ${r.keep} scroll ${r.scr}; far ${r.far}; scroll ${JSON.stringify(sc)}; title「${t.top}」「${t.foot}」「${t.last}」`);
      } catch (e) { record(48, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #49–#52 從唱片櫃挑牌開局（店主 11-13）：同一趟接著做——掉落旁白（#49）→ 結算帶走一張（#50）→ 第二趟挑種子（#51）→ 種子不能賣（#52）
    if (want(49) || want(50) || want(51) || want(52)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      let stage = '49';
      try {
        // v5 存檔（seedRun）：遷到 v6 時，上次挑的王牌（hall）那組送的四張算擁有
        await seededContinue4(page, { ace: 'hall', pos: 2 }, Q());
        await waitScreen(page, 'night'); await sleep(500);
        // ---- #49 掉落旁白：他丟過一張牌才打贏（forceWin），領獎前先念旁白
        await jsClick(page, '[data-a=go]'); await duelReady(page); await sleep(200);
        await page.evaluate(() => window.DipLabDuel.play({ i: 0, attr: 'c' }));
        await duelReady(page);
        const before = await page.evaluate(() => { const R = window.__lab.run, d = window.__lab.rawDuel(); return { id: R.duelEnemy, pos: R.pos, thrown: d.e.thrown.map(c => c.id),
          deck: window.DipLabEngine.trialDeck(window.DipLabContent, R.duelEnemy, R.pos, { seedKey: R.seedKey, runNo: R.runNo, playerAce: R.ace, bossAce: R.bossAce, tier: R.tier }).deck.map(c => c.id) }; });
        await page.evaluate(() => window.__lab.forceWin());
        await waitScreen(page, 'reward', 15000);
        // 第 C 波（SPEC-C §4.1、§11.3）：掉落旁白換成戰利品列的字幕（同一句店主原句、0 秒出、不用點、1.8 秒淡掉）；面板同時出來（三張蓋牌）。
        //   三張＝他整副牌裡抽（至少 1 張這場沒出過，src unplayed）；金邊／補位那格從卡池來；三張都記進 drops
        let narr = null;
        for (let g = 0; g < 60 && !(narr && narr.text); g++) { narr = await page.evaluate(() => ({ text: (document.querySelector('.lt-cap') || {}).textContent || '', sheet: !!document.querySelector('.lb-sheet.reward'), dq: !!document.querySelector('.lb-dq.drop') })); if (!narr.text) await sleep(50); }
        await sleep(60);
        const n2 = await page.evaluate(() => ({ text: (document.querySelector('.lt-cap') || {}).textContent || '', want: window.DipLabContent.script.drop[0].text, sheet: !!document.querySelector('.lb-sheet.reward.lt-sheet'),
          cards: window.__lab.run.pending.cards.slice(), src: (window.__lab.run.pending.src || []).slice(), drops: window.__lab.run.drops.slice() }));
        const capGone = await page.waitForFunction(() => !document.querySelector('.lt-cap'), null, { timeout: 4000 }).then(() => true, () => false);   // 不用點，自己淡掉
        const sheet49 = await lootReady(page) && !!(await page.$('.lb-sheet.reward [data-pick]'));
        // 捲動：面板升起、錢袋與蓋牌彈出、翻牌那幾下（CSS 動畫，彈跳時會多出幾 px）都停了才量（舊版量的是旁白那一刻，面板還沒出來）
        await page.waitForFunction(() => { const s = document.querySelector('.lb-sheet.reward'); return !!s && s.getAnimations({ subtree: true }).every(a => a.playState !== 'running'); }, null, { timeout: 4000 }).catch(() => {});
        const sc49 = await noScroll(page);
        const dqGone = await page.evaluate(() => !document.querySelector('.lb-dq.drop'));
        const fromDeck = n2.cards.every((id, i) => n2.src[i] === 'gold' || n2.src[i] === 'fill' || before.deck.includes(id));
        const srcOk = n2.cards.every((id, i) => n2.src[i] !== 'played' || before.thrown.includes(id)) && n2.cards.every((id, i) => n2.src[i] !== 'unplayed' || !before.thrown.includes(id)) && n2.src.includes('unplayed');
        if (want(49)) record(49, size, narr.text.length > 0 && !narr.dq && n2.text === n2.want && n2.want === '對方似乎掉落了什麼……' && n2.sheet && capGone && sheet49 && dqGone && n2.cards.length === 3 &&
          fromDeck && srcOk && n2.cards.every(id => n2.drops.includes(id)) && scrollOk(sc49),
          `字幕「${n2.text}」（面板同時出來 ${n2.sheet}、舊旁白框 ${narr.dq}）→ 不用點自己淡掉 ${capGone} → 翻完可收 ${sheet49}；掉落 ${JSON.stringify(n2.cards)} src ${JSON.stringify(n2.src)} ⊂ 他這一場的牌單 ${fromDeck}、出過／沒出過對得上 ${srcOk}、記進 drops ${n2.cards.every(id => n2.drops.includes(id))}；scroll ${JSON.stringify(sc49)}`);
        // 收一張（進過包包）→ 升級 → 來客
        await sleep(700);
        const took = await page.evaluate(() => { const b = document.querySelector('.lb-sheet.reward [data-pick]'); if (!b) return null; b.click(); return b.getAttribute('data-pick'); });
        for (let g = 0; g < 40 && (await screen(page)) !== 'night'; g++) { await page.evaluate(() => { const b = document.querySelector('.lb-sheet.level [data-lv]'); if (b && !document.querySelector('.lb-sheet.level.arming')) b.click(); }); await sleep(250); }
        // ---- #50 結算帶走一張
        stage = '50';
        await page.evaluate(() => { window.__lab.own([window.DipLabContent.aces.pearl], 'boss'); window.__lab.jump(12); window.__lab.loseNext(1, { noRetry: true }); });
        await waitScreen(page, 'night'); await sleep(400);
        await luSkip(page);                                    // 第 I 波 I-2：跳到第 12 位＝上場面板照預設帶過
        await jsClick(page, '[data-a=go]'); await duelReady(page);
        await page.evaluate(() => window.DipLabDuel.play({ i: 0, attr: 'c' }));
        await advanceUntil(page, () => window.__lab.screen() === 'end', null, 40000);
        await sleep(1200);
        const e0 = await page.evaluate(() => { const R = window.__lab.run, S = window.__lab.save, C = window.DipLabContent, E = window.DipLabEngine;
          const vis = sel => { const e = document.querySelector(sel); if (!e) return false; const b = e.getBoundingClientRect(), top = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2); return b.bottom <= innerHeight && b.top >= 0 && !!top && (top === e || e.contains(top)); };
          return { keep: vis('.lb-keep[data-a=keep]'), again: vis('[data-a=again]'), ids: window.__lab.keepIds(), want: E.keepCandidates(R, C, S.shelf), entered: R.entered.slice(), drops: R.drops.slice(),
            owned: window.__lab.owned(), scr: (() => { const x = document.querySelector('.lb-screen.end .lb-scroll'); return x ? x.scrollHeight - x.clientHeight : -1; })() }; });
        const sc50 = await noScroll(page);
        await jsClick(page, '.lb-keep[data-a=keep]'); await sleep(700);
        const ks = await page.evaluate(() => ({ tiles: [...document.querySelectorAll('.lb-sheet.keep .lb-ct')].map(t => t.dataset.cid), x: (() => { const s = document.querySelector('.lb-sheet.keep'); return s ? s.getBoundingClientRect().bottom : 0; })() }));
        const sc50b = await noScroll(page);
        const kid = await page.evaluate(() => { const b = document.querySelector('.lb-sheet.keep [data-pick]'); if (!b) return null; b.click(); return b.getAttribute('data-pick'); });
        await sleep(700);
        const k1 = await page.evaluate(id => { const S = window.__lab.save, R = window.__lab.run; return { kept: R.kept, shelf: S.shelf[id] || null, done: !!document.querySelector('.lb-keep.done .lb-cv.store[data-cid="' + CSS.escape(id) + '"]'), btn: !!document.querySelector('.lb-keep[data-a=keep]'),
          again: window.DipLabEngine.keepOne(R, window.DipLabContent, window.__lab.keepIds()[0] || 'x', S.shelf).error, runKept: (S.runs[S.runs.length - 1] || {}).kept }; }, kid);
        await jsClick(page, '.lb-endbtns [data-a=shelf]'); await sleep(600);
        const sp = await page.evaluate(id => ({ own: !!document.querySelector('.lb-wall.own .lb-cv.store[data-cid="' + CSS.escape(id) + '"]'), ownN: document.querySelectorAll('.lb-wall.own .lb-cv').length, owned: window.__lab.owned().length,
          known: !!document.querySelector('.lb-wall.known .lb-cv[data-cid="' + CSS.escape(id) + '"]'), h: [...document.querySelectorAll('.lb-page .lb-h2')].map(x => x.textContent) }), kid);
        await jsClick(page, '.lb-page [data-a=close]'); await sleep(300);
        const aceIds = await page.evaluate(() => Object.values(window.DipLabContent.aces));   // 第 B 波：卡片 id 改 catalogId（含 | 與空白），不再寫死王牌 id 的正規式
        const apexOut = aceIds.length === 3 && e0.ids.every(id => !aceIds.includes(id)) && await page.evaluate(ids => ids.every(id => !window.DipLabContent.cards[id].tier), e0.ids);
        const okKeepIds = JSON.stringify(e0.ids) === JSON.stringify(e0.want) && e0.ids.length > 0 && e0.ids.every(id => !e0.owned.includes(id) && (e0.entered.includes(id) || e0.drops.includes(id))) && (!took || e0.ids.includes(took) || e0.owned.includes(took));
        if (want(50)) record(50, size, e0.keep && e0.again && e0.scr <= 1 && scrollOk(sc50) && okKeepIds && JSON.stringify(ks.tiles) === JSON.stringify(e0.ids) && scrollOk(sc50b) &&
          kid && k1.kept === kid && k1.shelf && k1.shelf.own === true && k1.shelf.src === 'run' && k1.done && !k1.btn && k1.again === 'kept' && k1.runKept === kid && sp.own && sp.known && sp.ownN === sp.owned && apexOut,
          `結算鈕 ${e0.keep}（scroll ${e0.scr}、${JSON.stringify(sc50)}）；候選 ${e0.ids.length}（＝keepCandidates ${okKeepIds}；擁有的不列、頂點卡不列）；帶走 ${kid} → own ${JSON.stringify(k1.shelf)}、結算金框 ${k1.done}、再帶一次 ${k1.again}；唱片櫃「我的收藏」金框 ${sp.own}（${sp.ownN}＝${sp.owned}）${JSON.stringify(sp.h)}`);
        // ---- #51 第二趟挑種子
        stage = '51';
        // 面板列的＝唱片櫃能當種子的、扣掉這次王牌（pearl）那組送的（審查 #3）
        const pool = await page.evaluate(() => window.__lab.seedPool('pearl'));
        const giftOut = await page.evaluate(() => window.__lab.seedable().filter(id => window.DipLabContent.gifts.pearl.includes(id)));
        // 店主 11-13：開局不再挑王牌，沿用上次那張（save.lastAce）。上一趟（hall）當作跟老闆換成了 pearl → 這一趟就是 pearl（#54 測真的換）
        await page.evaluate(() => { window.__lab.save.lastAce = 'pearl'; });
        await jsClick(page, '[data-a=again]');
        await passCards(page);                    // 第 D 波：升級過場卡
        const seedsUp = await page.waitForSelector('.lb-sheet.seeds .lb-ct', { timeout: 15000 }).then(() => true, () => false);
        const ace = !(await page.$('.lb-sheet.acepick'));                 // 沒有挑王牌面板
        await sleep(600);
        const sp0 = await page.evaluate(() => { const C = window.DipLabContent, E = window.DipLabEngine;
          const tiles = [...document.querySelectorAll('.lb-sheet.seeds .lb-ct')].map(t => t.dataset.cid);
          return { tiles, apex: tiles.filter(id => C.cards[id].tier).length, stars: document.querySelectorAll('.lb-sheet.seeds .lb-ct .stars').length, filters: [...document.querySelectorAll('.lb-sheet.seeds [data-f]')].map(b => b.textContent),
            go: (document.querySelector('.lb-sheet.seeds [data-a=ok]') || {}).textContent || '', none: (document.querySelector('.lb-sheet.seeds [data-a=none]') || {}).textContent || '', okDis: document.querySelector('.lb-sheet.seeds [data-a=ok]').disabled,
            foot: (() => { const f = document.querySelector('.lb-sheet.seeds .foot'); const b = f.getBoundingClientRect(); return b.bottom <= innerHeight + 1 && b.top >= 0; })(), store: document.querySelectorAll('.lb-sheet.seeds .lb-cv.store').length,
            sub: document.querySelector('.lb-sheet.seeds .sdn').textContent, subWant: C.seeds.ui.pickSub.replace('{n}', C.gifts.pearl.length).replace('{max}', 3),
            U: C.seeds.ui }; });
        const sc51 = await noScroll(page);
        // 三色篩選（審查 #8）：那一色是這張最高的（平手兩色都算）。第一張的最高色 → 只剩最高色含它的（張數對得上）；沒有任何一張以它為最高的那一色 → 空的那句
        const MX = `c => { const m = Math.max(c.c || 0, c.o || 0, c.h || 0); return ['c', 'o', 'h'].filter(a => (c[a] || 0) === m); }`;
        const ax = await page.evaluate(MX => { const mx = eval(MX); return mx(window.DipLabContent.cards[document.querySelector('.lb-sheet.seeds .lb-ct').dataset.cid])[0]; }, MX);
        await jsClick(page, `.lb-sheet.seeds [data-f=${ax}]`); await sleep(200);
        const fo = await page.evaluate(MX => { const mx = eval(MX); return [...document.querySelectorAll('.lb-sheet.seeds .lb-ct')].filter(t => getComputedStyle(t).display !== 'none').map(t => mx(window.DipLabContent.cards[t.dataset.cid]).join('')); }, MX);
        const foWant = await page.evaluate(({ pool, ax, MX }) => { const mx = eval(MX); return pool.filter(id => mx(window.DipLabContent.cards[id]).includes(ax)).length; }, { pool, ax, MX });
        const noneAx = await page.evaluate(({ pool, MX }) => { const mx = eval(MX); return ['c', 'o', 'h'].find(a => !pool.some(id => mx(window.DipLabContent.cards[id]).includes(a))) || null; }, { pool, MX });
        let emptyOk = true;
        if (noneAx) { await jsClick(page, `.lb-sheet.seeds [data-f=${noneAx}]`); await sleep(200); emptyOk = await page.evaluate(() => { const e = document.querySelector('.lb-sheet.seeds .lb-sdempty'); return !!e && !e.hidden && e.textContent === window.DipLabContent.seeds.ui.pickEmpty; }); }
        await jsClick(page, '.lb-sheet.seeds [data-f=all]'); await sleep(200);
        // 點四張：只收三張、第四張說最多 3 張（審查 #4：吐司；滿了沒選的鈕 aria-disabled、張數變紅；捲到底標題列還看得到。審查 #10：選了＝墨色框＋✓ 章）
        const tried = await page.evaluate(() => [...document.querySelectorAll('.lb-sheet.seeds [data-pick]')].slice(0, 4).map(b => { b.click(); return b.getAttribute('data-pick'); }));
        await sleep(200);
        const sel = await page.evaluate(() => { const s = document.querySelector('.lb-sheet.seeds'), cnt = s.querySelector('.cnt'), t0 = s.querySelector('.lb-ct.sel');
          s.scrollTop = s.scrollHeight;
          const cb = cnt.getBoundingClientRect(), sb = s.getBoundingClientRect(), hit = document.elementFromPoint(cb.left + cb.width / 2, cb.top + cb.height / 2);
          return { sel: [...s.querySelectorAll('.lb-ct.sel')].map(t => t.dataset.cid), cnt: cnt.textContent, note: s.querySelector('.sdn').textContent, okDis: s.querySelector('[data-a=ok]').disabled,
            toast: [...document.querySelectorAll('.lb-toast')].map(x => x.textContent), toastWant: window.DipLabContent.seeds.ui.pickFullToast.replace('{max}', 3),
            dis: [...s.querySelectorAll('.lb-ct:not(.sel) [data-pick]')].map(b => b.getAttribute('aria-disabled')), selDis: [...s.querySelectorAll('.lb-ct.sel [data-pick]')].map(b => b.getAttribute('aria-disabled')),
            red: getComputedStyle(cnt).color, gray: getComputedStyle(s.querySelector('.sdn.warn') || cnt).color,
            stuck: cb.top >= sb.top - 1 && cb.bottom <= sb.bottom && !!hit && (hit === cnt || cnt.contains(hit)), scrolled: s.scrollTop,
            check: t0 ? getComputedStyle(t0, '::before').content : '', outline: t0 ? getComputedStyle(t0.querySelector('.lb-cv')).outlineColor : '' }; });
        await page.evaluate(() => { const s = document.querySelector('.lb-sheet.seeds'); if (s) s.scrollTop = 0; });
        await jsClick(page, '.lb-sheet.seeds [data-a=ok]');
        let nn = false; const t1 = Date.now();
        while (!nn && Date.now() - t1 < 20000) { nn = (await screen(page)) === 'night'; if (!nn) { await answerBargain(page); await sleep(200); } }
        await sleep(500);
        const rr = await page.evaluate(() => { const R = window.__lab.run, C = window.DipLabContent; return { bag: R.bag.slice(), seeds: R.seeds.slice(), gifts: C.gifts[R.ace], ace: R.ace, runNo: R.runNo, picked: R.shop.bargainPicked, prologue: R.prologue }; });
        const wantSeeds = tried.slice(0, 3), fill = rr.gifts.filter(g => !wantSeeds.includes(g)).slice(0, 4 - wantSeeds.length);
        const bagOk = JSON.stringify(rr.bag.slice(0, 4)) === JSON.stringify(wantSeeds.concat(fill)) && rr.bag.length === 7 && JSON.stringify(rr.seeds) === JSON.stringify(wantSeeds) && rr.picked;
        if (want(51)) record(51, size, ace && seedsUp && JSON.stringify(sp0.tiles.slice().sort()) === JSON.stringify(pool.slice().sort()) && sp0.apex === 0 && sp0.stars === sp0.tiles.length && sp0.store >= 1 &&
          sp0.filters.join() === [sp0.U.pickAll, '經典', '冷門', '硬蕊'].join() && sp0.go === sp0.U.pickGo && sp0.none === sp0.U.pickNone && sp0.okDis && sp0.foot && scrollOk(sc51) && fo.length === foWant && fo.length > 0 && fo.every(a => a.includes(ax)) && emptyOk &&
          JSON.stringify(sel.sel.slice().sort()) === JSON.stringify(wantSeeds.slice().sort()) && sel.cnt === '3／3' && sel.note.indexOf('最多帶 3 張') >= 0 && !sel.okDis && nn && bagOk && rr.runNo === 2 && rr.prologue == null && rr.ace === 'pearl' &&
          sp0.tiles.every(id => !giftOut.includes(id)) && sp0.sub === sp0.subWant && sel.toast.includes(sel.toastWant) && sel.dis.length > 0 && sel.dis.every(x => x === 'true') && sel.selDis.every(x => x === null) &&
          sel.red === 'rgb(193, 22, 40)' && sel.stuck && /✓/.test(sel.check) && sel.outline === 'rgb(17, 17, 17)',
          `挑種子面板 ${seedsUp}：${sp0.tiles.length} 張（＝唱片櫃能當種子的 ${pool.length}；頂點卡 ${sp0.apex}、金框 ${sp0.store}）、篩選 ${sp0.filters.join('／')}（${ax} → ${fo.join('')}／${foWant}；沒有的那色 ${noneAx}：空的那句 ${emptyOk}）、點四張 → 選 ${sel.sel.length}「${sel.cnt}」「${sel.note}」吐司 ${JSON.stringify(sel.toast)} 沒選的 aria-disabled ${sel.dis.join()} 張數 ${sel.red} 捲到 ${sel.scrolled} 標題列看得到 ${sel.stuck} 選了 ${sel.check} ${sel.outline}；不列 pearl 送的 ${JSON.stringify(giftOut)}；副標「${sp0.sub}」；scroll ${JSON.stringify(sc51)}；` +
          `包包 ${JSON.stringify(rr.bag)}（種子＋送的補到 4 ${bagOk}）`);
        // ---- #52 種子（第 A 波 5：移出包包只走櫃檯「賣給老闆」）：包包補到 8 張、錢不夠 → 箱子裡買一張＝鈕停用「錢不夠…・去櫃檯賣唱片」、沒有先賣子面板；
        //      引擎 buy 帶種子 sellId → counterOnly、單獨 sell 種子 → ok（$0、reclaim seed）；包包面板種子標「櫃裡帶來」、整個包包都沒有「賣」鈕；
        //      櫃檯「賣給老闆」：種子那格「交還老闆」、點了問「把《…》交還老闆？」→ 交還：$0、包包 −1、不再是種子、老闆說「你自己的那張？…」
        stage = '52';
        const setup = await page.evaluate(() => { const R = window.__lab.run, C = window.DipLabContent, E = window.DipLabEngine;
          const extra = Object.keys(C.cards).filter(id => !C.cards[id].tier && !R.bag.includes(id) && !Object.values(R.shop.bins).flat().includes(id) && !C.bargain.pool.includes(id) && !(C.bargain.retired || []).includes(id)).slice(0, 8 - R.bag.length);
          R.bag.push(...extra);
          const key = 'jazz', id = R.shop.bins[key][0], sd = R.seeds[0], price = E.priceOf(C, C.cards[id]);
          window.__lab.money(Math.max(0, price - 100));                                   // 錢不夠（差 $100）
          const cp = () => JSON.parse(JSON.stringify(R));
          const s1 = E.choose(cp(), C, { type: 'sell', cardId: sd });
          return { key, id, sd, price, eng: E.choose(cp(), C, { type: 'buy', key, cardId: id, sellId: sd }).error, engSell: s1.ok ? JSON.stringify(s1.effects) : s1.error, bag: R.bag.length, go: C.shopUi.goCounter }; });
        await page.evaluate(() => window.__lab.stageAction('crate:jazz'));
        const drawer = await page.waitForFunction(() => window.DipLabEcon.debug().open && document.querySelector('.ec-drawer [data-a=buy]'), null, { timeout: 9000 }).then(() => true, () => false);
        await sleep(450);
        const bb = await page.evaluate(() => { const b = document.querySelector('.ec-drawer [data-a=buy]'); return { dis: b.disabled, t: b.textContent.replace(/\s+/g, '') }; });
        await jsClick(page, '.ec-drawer [data-a=buy]'); await sleep(400);
        const sub = await page.evaluate(() => window.DipLabEcon.debug().sub);
        await page.evaluate(() => { const E = window.DipLabEcon; if (E && E.close) E.close(); }); await sleep(600);
        // 包包面板（兩位客人之間）：種子標「櫃裡帶來」；整個包包沒有「賣」鈕
        await waitScreen(page, 'night'); await sleep(300);
        await jsClick(page, '.lb-bagline [data-a=bag]'); await sleep(500);
        const sds52 = await page.evaluate(() => window.__lab.run.seeds.slice());
        const tag = await page.evaluate(() => window.DipLabContent.shopUi.seedTag);
        const bp = await page.evaluate(sds => { const s = document.querySelector('.lb-sheet.float.bag'); if (!s) return null;
          const t = id => [...s.querySelectorAll('.lb-ct')].find(x => x.getAttribute('data-cid') === id);
          return { seeds: sds.map(id => { const x = t(id); return x ? (x.querySelector('.sdtag') || {}).textContent || '' : null; }), sell: s.querySelectorAll('[data-pick]').length }; }, sds52);
        await page.evaluate(() => { const s = document.querySelector('.lb-sheet.float.bag [data-a=close]'); if (s) s.click(); }); await sleep(200);
        // 櫃檯「賣給老闆」：種子交還老闆
        await page.evaluate(() => { window.DipLabEcon.openCounterSell(); });
        const sOpen = await page.waitForFunction(() => { const d = window.DipLabEcon.debug(); return d.open && d.tab === 'sell' && document.querySelector('.ec-drawer .ec-cs'); }, null, { timeout: 12000 }).then(() => true, () => false);
        await sleep(400);
        const sdTile = await page.evaluate(sd => { const t = document.querySelector(`.ec-drawer .ec-cs[data-cid="${sd}"]`); return t ? { seed: t.classList.contains('seed'), sv: (t.querySelector('.ec-sv') || {}).textContent || '', dis: t.disabled } : null; }, setup.sd);
        await watchSay(page);
        await page.evaluate(sd => { const b = document.querySelector(`.ec-drawer .ec-cs[data-cid="${sd}"]`); if (b) b.click(); }, setup.sd); await sleep(250);
        const ask = await page.evaluate(() => ({ line: (document.querySelector('.ec-drawer .ec-line .tx') || document.querySelector('.ec-drawer .ec-line') || {}).textContent || '', go: (document.querySelector('.ec-drawer [data-a=cgo]') || {}).textContent || '' }));
        const m0 = await page.evaluate(() => window.__lab.run.money);
        await jsClick(page, '.ec-drawer [data-a=cgo]'); await sleep(500);
        const back = await page.evaluate(sd => { const R = window.__lab.run, C = window.DipLabContent, E = window.DipLabEngine;
          return { money: R.money, bag: R.bag.length, has: R.bag.includes(sd), seed: E.isSeed(R, C, sd), said: (window.__said || []).map(x => x.t), want: C.shopLines.reclaimSeed, album: C.cards[sd].album, toast: [...document.querySelectorAll('.lb-toast')].map(t => t.textContent) }; }, setup.sd);
        await page.evaluate(() => { const E = window.DipLabEcon; if (E && E.close) E.close(); }); await sleep(600);
        if (want(52)) record(52, size, setup.eng === 'counterOnly' && /"reclaim":"seed"/.test(setup.engSell) && /"earn":0/.test(setup.engSell) && setup.bag === 8 && drawer && bb.dis && bb.t.indexOf(setup.go) > 0 && !sub &&
          bp && bp.seeds.length === 3 && bp.seeds.every(x => x === tag) && bp.sell === 0 &&
          sOpen && sdTile && sdTile.seed && !sdTile.dis && sdTile.sv === '交還老闆' && ask.line === '把《' + back.album + '》交還老闆？' && ask.go.trim() === '交還老闆' &&
          back.money === m0 && back.bag === setup.bag - 1 && !back.has && !back.seed && back.said.includes(back.want) && back.toast.includes('《' + back.album + '》交還老闆'),
          `引擎買時賣種子 → ${setup.eng}、單獨賣種子 → ${setup.engSell}；錢不夠（《${setup.id}》$${setup.price}）→ 鈕停用 ${bb.dis}「${bb.t}」、子面板 ${JSON.stringify(sub)}；` +
          `包包面板：種子 ${JSON.stringify(bp && bp.seeds)}、賣鈕 ${bp && bp.sell} 個；賣給老闆：種子那格 ${JSON.stringify(sdTile)}、「${ask.line}」「${ask.go.trim()}」→ $${m0} → $${back.money}、包包 ${back.bag}、還是種子 ${back.seed}、老闆「${back.said.slice(-1)}」`);
      } catch (e) { record(+stage, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #53 存檔 v5 → v6（只在第一個尺寸跑）
    if (want(53)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await openTitle(page, Q());
        const ref = await page.evaluate(() => {
          const C = window.DipLabContent, E = window.DipLabEngine;
          const r = E.newRun(C, { seedKey: '20261106', runNo: 3, ace: 'heresy', prologue: false }); E.choose(r, C, E.bargainPolicy(r, C)); E.jumpTo(r, C, 7); r.aceWon = true;
          const known = C.enemies.copycat.deck[0];
          const s = { v: 5, seen: { night: true }, learned: {}, settings: { fastAnim: false, sound: false }, player: null, run: r,
            runs: [{ seedKey: '20261101', runNo: 1, ace: 'hall', result: 'dead', reached: 12, bestStreak: 11, taken: 9, wins: 11 }, { seedKey: '20261102', runNo: 2, ace: 'hall', result: 'dead', reached: 3, bestStreak: 2, taken: 7, wins: 2 },
              { seedKey: '20261020', runNo: 1, ace: 'pearl', result: 'clear', reached: 0, legacy: true }],
            runSeq: { 20261101: 1 }, best: { far: 12, checkpoints: [10], bestStreak: 11 }, shelf: { [known]: { at: '20261101#1', seen: true }, [C.aces.hall]: { at: '20261101#1', seen: true } }, relics: [],
            tutorialDone: true, prologueDone: true, lastAce: 'heresy', lastBargain: null };
          localStorage.setItem('dipGameLab_v1', JSON.stringify(s));
          return { known, boss1: C.aces[E.bossAceFor('20261101', 1, 'hall')], boss2: C.aces[E.bossAceFor('20261102', 2, 'hall')], bossRun: C.aces[r.bossAce], start: C.aces.heresy, aces: Object.assign({}, C.aces), gifts: { hall: C.gifts.hall, pearl: C.gifts.pearl, heresy: C.gifts.heresy } };
        });
        await openTitle(page, Q());
        const m = await page.evaluate(() => { const S = window.__lab.save, R = S.run; return { v: S.v, shelf: S.shelf, run: !!S.run, runV: S.run && S.run.v, cont: !!document.querySelector('[data-a=cont]'), far: S.best.far, stored: JSON.parse(localStorage.getItem('dipGameLab_v1')).v,
          unlock: R && R.unlock ? R.unlock.tiers.slice().sort().join() : null, won: R && Array.isArray(R.acesWon) ? R.acesWon.length : -1 }; });
        const own = id => !!(m.shelf[id] && m.shelf[id].own);
        const ok = m.v === 8 && m.run && m.cont && m.far === 12 && !own(ref.known) && !!m.shelf[ref.known] &&
          ref.gifts.hall.every(id => own(id) && m.shelf[id].src === 'gift') && ref.gifts.heresy.every(id => own(id) && m.shelf[id].src === 'gift') &&
          ref.gifts.pearl.every(id => own(id) && m.shelf[id].src === 'gift') &&        // 一晚版（legacy）那趟也挑過王牌：送的四張一樣算擁有（只是沒有位數，不算打倒藏家）
          own(ref.boss1) && m.shelf[ref.boss1].src === 'boss' && own(ref.bossRun) && m.shelf[ref.bossRun].src === 'boss' &&
          (ref.boss2 === ref.boss1 || ref.boss2 === ref.bossRun || ref.boss2 === ref.start || !own(ref.boss2)) &&
          // 解鎖制（店主 11-16；BRIEF 第 6 條）：lastAce（heresy）那派預設那張補記成擁有（src 'start'，已經擁有的不改來源）；進行中的舊 run 補快照：
          //   已解鎖＝lastAce ∪ 唱片櫃擁有頂點卡的派（藏家王牌 src 'boss'）、打倒過藏家（aceWon）＝那張算這一趟收的
          own(ref.start) && (m.shelf[ref.start].src === 'start' || ref.start === ref.boss1 || ref.start === ref.bossRun) &&
          m.unlock === ['heresy'].concat([ref.boss1, ref.bossRun].map(id => Object.keys(ref.aces).find(t => ref.aces[t] === id))).filter((t, i, a) => t && a.indexOf(t) === i).sort().join() && m.won === 1;
        // 審查 #2：一晚版（legacy）result 'clear'＝那晚打倒過藏家：那晚第一次認識、不是自己挑的那張王牌的頂點卡算擁有（src 'boss'）；'dead' 那晚不算
        await page.evaluate(() => {
          const C = window.DipLabContent;
          localStorage.setItem('dipGameLab_v1', JSON.stringify({ v: 5, seen: {}, learned: {}, settings: { fastAnim: false, sound: false }, player: null, run: null,
            runs: [{ seedKey: '20261020', runNo: 1, ace: 'pearl', result: 'clear', reached: 0, legacy: true }, { seedKey: '20261021', runNo: 1, ace: 'hall', result: 'dead', reached: 0, legacy: true }],
            runSeq: {}, best: { far: 0, checkpoints: [], bestStreak: 0 }, relics: [], tutorialDone: true, prologueDone: true, lastAce: 'hall', lastBargain: null,
            shelf: { [C.aces.pearl]: { at: '20261020#1', seen: true }, [C.aces.heresy]: { at: '20261020#1', seen: true }, [C.aces.hall]: { at: '20261021#1', seen: true } } }));
        });
        await openTitle(page, Q());
        const lg = await page.evaluate(() => { const S = window.__lab.save, C = window.DipLabContent, e = id => S.shelf[id] || null;
          return { v: S.v, heresy: e(C.aces.heresy), pearl: e(C.aces.pearl), hall: e(C.aces.hall),
            unl: window.DipLabEngine.unlockedTiers(C, id => !!(S.shelf[id] && S.shelf[id].own), { start: S.lastAce }).slice().sort().join() }; });
        // 解鎖制：lastAce（hall）那派預設那張補記成擁有（src 'start'）；自己挑過的 pearl（一晚版那趟）照舊只是認識（流派解鎖照 lastAce ∪ 擁有頂點卡的派：hall、heresy）
        const lgOk = lg.v === 8 && lg.heresy && lg.heresy.own === true && lg.heresy.src === 'boss' && lg.pearl && !lg.pearl.own && lg.hall && lg.hall.own === true && lg.hall.src === 'start' && lg.unl === 'hall,heresy';
        record(53, size, ok && lgOk, `解鎖制：lastAce 那張 ${JSON.stringify(m.shelf[ref.start])}、舊 run 補快照 ${m.unlock}（收了 ${m.won} 張）、第二份存檔解鎖 ${lg.unl}；一晚版 clear 那晚的藏家王牌 ${JSON.stringify(lg.heresy)}、自己挑的 ${JSON.stringify(lg.pearl)}、dead 那晚 ${JSON.stringify(lg.hall)}；v${m.v}（localStorage 還是 v${m.stored}：下一次寫入才換）；認識那張 own=${own(ref.known)}；hall／heresy 送的 own；pearl（一晚版那趟）own=${ref.gifts.pearl.every(own)}；藏家王牌 ${ref.boss1} ${JSON.stringify(m.shelf[ref.boss1])}、這一趟打倒的 ${ref.bossRun} ${JSON.stringify(m.shelf[ref.bossRun])}、第 3 位就倒的那趟 ${ref.boss2} own=${own(ref.boss2)}；進行中的 run 留著 ${m.run}`);
      } catch (e) { record(53, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #54 換王牌（店主 11-13）：第 1 位開打前點老闆換；打過第 1 位就不行
    //   解鎖制（店主 11-16）：只能換解鎖的派＝存檔先放好流亡（pearl）那張頂點卡（打倒藏家拿到的）；異端（heresy）還鎖著：面板上鎖、點了不選
    if (want(54)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue4(page, { ace: 'hall', idx: 0, ownAces: ['pearl'] }, Q(''));
        await waitScreen(page, 'night');
        await watchSay(page);
        await page.evaluate(() => { window.__toasts = []; new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.classList && n.classList.contains('lb-toast')) window.__toasts.push(n.textContent); }))).observe(document.getElementById('app'), { childList: true }); });
        await sleep(1500);
        const U = await page.evaluate(() => Object.assign({}, window.DipLabContent.trial.ui, { aceDone: window.DipLabContent.shopLines.aceDone, aceSame: window.DipLabContent.shopLines.aceSame, aceLater: window.DipLabContent.shopLines.aceLater, night: window.DipLabContent.shopLines.ownerHint.night }));
        const hint = await page.evaluate(() => ({ toasts: window.__toasts.slice(), seen: !!window.__lab.save.seen.aceSwap }));
        const hintOk = hint.toasts.includes(U.aceHint) && hint.seen;
        // 真點老闆（熱點 talk:owner）→ 小選單
        await sleep(1200);
        const hot = await tapHot(page, h => h.action === 'talk:owner');
        await sleep(600);
        const menu = await page.evaluate(() => { const s = document.querySelector('.lb-sheet.float.owner'); if (!s) return null;
          const b = [...s.querySelectorAll('[data-a=talk],[data-a=swap]')].map(x => { const r = x.getBoundingClientRect(); return { a: x.dataset.a, t: x.textContent, ok: r.top >= 0 && r.bottom <= innerHeight && r.height >= 44 }; });
          return { b, now: (s.querySelector('.ow-now') || {}).textContent || '' }; });
        const scM = await noScroll(page);
        const menuOk = !!hot && !!menu && menu.b.length === 2 && menu.b.every(x => x.ok) && menu.b[0].t === U.aceTalk && menu.b[1].t.indexOf(U.aceSwap) === 0 && menu.now.indexOf('《') > 0 && scrollOk(scM);
        // 聊聊＝照舊說一句
        await jsClick(page, '.lb-sheet.owner [data-a=talk]'); await sleep(400);
        const talk = await page.evaluate(() => ({ open: !!document.querySelector('.lb-sheet.owner'), said: window.__said.map(x => x.t) }));
        const talkOk = !talk.open && talk.said.includes(U.night);
        // 換一張王牌 → 挑王牌面板（標題＝老闆那句、預設選中 hall）→ pearl
        const before = await page.evaluate(() => { const R = window.__lab.run; return { bag: R.bag.slice(), taken: R.taken, money: R.money }; });
        await page.evaluate(() => window.__lab.stageAction('talk:owner')); await sleep(500);
        await jsClick(page, '.lb-sheet.owner [data-a=swap]');
        const pickUp = await page.waitForSelector('.lb-sheet.acepick .lb-ct', { timeout: 5000 }).then(() => true, () => false);
        await sleep(500);
        const pk = await page.evaluate(() => { const s = document.querySelector('.lb-sheet.acepick'); const ok = s.querySelector('[data-a=ok]').getBoundingClientRect();
          return { h3: (s.querySelector('.hd h3') || {}).textContent || '', sel: (s.querySelector('.lb-ct.sel') || {}).dataset.tier || null, n: s.querySelectorAll('.lb-ct').length, okIn: ok.bottom <= innerHeight && ok.top >= 0,
            locked: [...s.querySelectorAll('.lb-ct.locked')].map(x => x.dataset.tier).join() }; });
        const scP = await noScroll(page);
        await jsClick(page, '.lb-sheet.acepick .lb-ct[data-tier="heresy"] .acex'); await sleep(150);      // 鎖住的：不選，說明那行寫怎麼解鎖
        const lockTap = await page.evaluate(() => ({ sel: (document.querySelector('.lb-sheet.acepick .lb-ct.sel') || {}).dataset.tier || null, det: (document.querySelector('.lb-sheet.acepick .detail') || {}).textContent || '' }));
        await jsClick(page, '.lb-sheet.acepick .lb-ct[data-tier="pearl"] .acex'); await sleep(150);
        await jsClick(page, '.lb-sheet.acepick [data-a=ok]');
        await sleep(900);
        const sw = await page.evaluate(() => { const R = window.__lab.run, S = window.__lab.save, C = window.DipLabContent, E = window.DipLabEngine;
          return { scr: window.__lab.screen(), ace: R.ace, bag: R.bag.slice(), gifts: R.gifts.slice(), want: C.gifts.pearl.slice(), lastAce: S.lastAce, taken: R.taken, money: R.money,
            own: C.gifts.pearl.every(id => S.shelf[id] && S.shelf[id].own && S.shelf[id].src === 'gift'), aceKnown: !!S.shelf[C.aces.pearl], bossOk: R.bossAce !== R.ace,
            stored: JSON.parse(localStorage.getItem('dipGameLab_v1')).run.ace, album: C.cards[C.aces.pearl].album, said: window.__said.map(x => x.t), toasts: window.__toasts.slice(), can: E.canSwitchAce(R, C),
            bagN: (document.querySelector('.lb-bagline [data-a=bag] b') || {}).textContent || '' }; });
        const lockOk = pk.locked === 'heresy' && lockTap.sel === 'hall' && lockTap.det.indexOf(U.aceLocked) >= 0;
        const swOk = pickUp && pk.h3 === U.aceAsk && pk.sel === 'hall' && pk.n === 3 && pk.okIn && lockOk && scrollOk(scP) && sw.scr === 'night' && sw.ace === 'pearl' &&
          JSON.stringify(sw.bag) === JSON.stringify(sw.want.concat(before.bag.slice(4))) && JSON.stringify(sw.gifts) === JSON.stringify(sw.want) && sw.lastAce === 'pearl' && sw.taken === before.taken && sw.money === before.money &&
          sw.own && sw.aceKnown && sw.bossOk && sw.stored === 'pearl' && sw.said.includes(U.aceDone) && sw.toasts.includes(U.aceSwapped.replace('{album}', sw.album)) && sw.can && sw.bagN === String(sw.bag.length);   // 包包條只寫張數（「包包 <b>n</b> 張」，店主 11-16 包包不限張數）
        // 再換一次、選同一張（pearl）＝不換
        await page.evaluate(() => window.__lab.stageAction('talk:owner')); await sleep(500);
        await jsClick(page, '.lb-sheet.owner [data-a=swap]');
        await page.waitForSelector('.lb-sheet.acepick .lb-ct', { timeout: 5000 }).catch(() => {}); await sleep(450);
        const sel2 = await page.evaluate(() => (document.querySelector('.lb-sheet.acepick .lb-ct.sel') || {}).dataset.tier || null);
        await jsClick(page, '.lb-sheet.acepick [data-a=ok]'); await sleep(700);
        const same = await page.evaluate(() => ({ ace: window.__lab.run.ace, bag: window.__lab.run.bag.slice(), said: window.__said.map(x => x.t) }));
        const sameOk = sel2 === 'pearl' && same.ace === 'pearl' && JSON.stringify(same.bag) === JSON.stringify(sw.bag) && same.said.includes(U.aceSame);
        // 打過第 1 位 → 第 2 位：點老闆沒有選單、老闆說下一趟再換；引擎也不給換；提示不再出
        await jsClick(page, '[data-a=go]'); await duelReady(page);
        const midFight = await page.evaluate(() => window.DipLabEngine.canSwitchAce(window.__lab.run, window.DipLabContent));
        await page.evaluate(() => window.__lab.forceWin());
        await waitScreen(page, 'reward', 15000); await pastDrop(page); await sleep(400);
        await page.evaluate(() => { const b = document.querySelector('.lb-sheet.reward [data-a=skip]') || document.querySelector('.lb-sheet.reward [data-pick]'); if (b) b.click(); });
        for (let g = 0; g < 40 && (await screen(page)) !== 'night'; g++) { await page.evaluate(() => { const b = document.querySelector('.lb-sheet.level [data-lv]'); if (b && !document.querySelector('.lb-sheet.level.arming')) b.click(); }); await sleep(300); }
        await sleep(800);
        await page.evaluate(() => { window.__said.length = 0; window.__toasts.length = 0; });
        const hot2 = await tapHot(page, h => h.action === 'talk:owner');
        await sleep(600);
        // 第 A 波 5：兩位客人之間點老闆＝櫃檯「賣給老闆」（不再只說「下一趟開門前再說」）
        await page.waitForFunction(() => { const d = window.DipLabEcon.debug(); return d.open && d.tab === 'sell'; }, null, { timeout: 12000 }).catch(() => {});
        const late = await page.evaluate(() => ({ pos: window.__lab.run.pos, menu: !!document.querySelector('.lb-sheet.owner'), pick: !!document.querySelector('.lb-sheet.acepick'), said: window.__said.map(x => x.t), toasts: window.__toasts.slice(),
          sell: window.DipLabEcon.debug().tab === 'sell' && !!document.querySelector('.ec-drawer .ec-cs'),
          can: window.DipLabEngine.canSwitchAce(window.__lab.run, window.DipLabContent), eng: window.DipLabEngine.switchAce(JSON.parse(JSON.stringify(window.__lab.run)), window.DipLabContent, 'hall').error, ace: window.__lab.run.ace }));
        await page.evaluate(() => window.DipLabEcon.close()); await sleep(400);
        const lateOk = !midFight && !!hot2 && late.pos === 2 && !late.menu && !late.pick && late.sell && !late.can && late.eng === 'notNow' && late.ace === 'pearl' && !late.toasts.includes(U.aceHint);
        record(54, size, hintOk && menuOk && talkOk && swOk && sameOk && lateOk,
          `提示 ${hintOk} ${JSON.stringify(hint.toasts)}；點老闆 ${hot && hot.id} → 選單 ${menuOk} ${JSON.stringify(menu)} ${JSON.stringify(scM)}；聊聊 ${talkOk} ${JSON.stringify(talk.said)}；` +
          `換王牌面板 ${pickUp}「${pk.h3}」sel ${pk.sel} 鎖住 ${pk.locked}（點了 ${JSON.stringify(lockTap)}）${JSON.stringify(scP)} → ${swOk} ${JSON.stringify({ ace: sw.ace, bag: sw.bag, lastAce: sw.lastAce, own: sw.own, said: sw.said, toasts: sw.toasts, bagN: sw.bagN })}；` +
          `同一張 ${sameOk}；打過第 1 位 ${lateOk} ${JSON.stringify({ midFight, pos: late.pos, menu: late.menu, sell: late.sell, said: late.said, can: late.can, eng: late.eng })}`);
      } catch (e) { record(54, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #55 主站「帶去店裡對決」帶來的那張＋唱片資訊「在頻率光譜找它」（v5 第六項第一期）
    if (want(55)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        const BR = "xtc|skylarking";
        // 新分頁到主站頻率光譜：換成空白頁（只驗網址；不在這裡載主站）
        await ctx.route(/\/tune\/\?q=/, rt => rt.fulfill({ contentType: 'text/html', body: '<!doctype html><meta charset="utf-8"><title>tune</title>' }));
        await page.addInitScript(() => { window.__toasts = []; new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.classList && n.classList.contains('lb-toast')) window.__toasts.push(n.textContent); })))
          .observe(document, { childList: true, subtree: true }); });
        // 1. 第一次玩（沒有存檔）帶卡進來
        await openTitle(page, Q('&fast=1&card=' + encodeURIComponent(BR)));
        await sleep(300);
        const a = await page.evaluate(BR => { const U = window.DipLabContent.seeds.ui, al = window.DipLabContent.cards[BR].album, ls = JSON.parse(localStorage.getItem('dipGameLab_v1') || 'null');
          return { search: location.search, href: location.href, bring: window.__lab.save.bring, ls: ls && ls.bring, toasts: window.__toasts.slice(), want: U.bringToastFirst.replace('{album}', al), U }; }, BR);
        const aOk = !/[?&]card=/.test(a.search) && /debug=1/.test(a.search) && a.bring && a.bring.id === BR && a.ls && a.ls.id === BR && a.toasts.includes(a.want);
        // 2. 序章那一趟算走完（第二趟起才挑種子）＋唱片櫃有四張比它強的（排序本來會在它前面）；重新整理：不再收、不再吐司
        const strong = await page.evaluate(BR => { const C = window.DipLabContent, E = window.DipLabEngine;
          const ids = Object.keys(C.cards).filter(id => !C.cards[id].tier && !C.gifts.hall.includes(id) && id !== BR).sort((x, y) => E.peak(C.cards[y]) - E.peak(C.cards[x]) || E.power(C.cards[y]) - E.power(C.cards[x])).slice(0, 4);
          const s = window.__lab.save; s.prologueDone = true; s.tutorialDone = true; s.lastAce = 'hall';
          s.runs = [{ seedKey: 'e2e', runNo: 1, ace: 'hall', result: 'lose', reached: 3, bestStreak: 1, taken: 5, wins: 1 }];
          window.__lab.own([C.aces.hall], 'start');          // 解鎖制：序章挑殿堂＝初始流派那張擁有（createRun 會記；不然重新整理會當舊存檔補記、出一次吐司）
          window.__lab.own(ids, 'run'); return ids; }, BR);
        await openTitle(page, Q('&fast=1'));
        const b0 = await page.evaluate(() => ({ bring: window.__lab.save.bring, toasts: window.__toasts.slice() }));
        // 3. 推門 → 再挑戰一趟 → 挑種子面板
        await jsClick(page, '[data-a=push]');
        const up = await page.waitForSelector('.lb-sheet.seeds .lb-ct', { timeout: 20000 }).then(() => true, () => false);
        await sleep(700);
        const sd = await page.evaluate(() => { const s = document.querySelector('.lb-sheet.seeds'); if (!s) return null; const t = [...s.querySelectorAll('.lb-ct')];
          return { tiles: t.map(x => x.dataset.cid), sel: t.filter(x => x.classList.contains('sel')).map(x => x.dataset.cid), badge: (t[0].querySelector('.badge.bring') || {}).textContent || '',
            cnt: s.querySelector('.cnt').textContent, okDis: s.querySelector('[data-a=ok]').disabled, pressed: (t[0].querySelector('[data-pick]') || {}).getAttribute && t[0].querySelector('[data-pick]').getAttribute('aria-pressed'),
            badgeIn: (() => { const b = t[0].querySelector('.badge.bring'); if (!b) return false; const r = b.getBoundingClientRect(), c = t[0].querySelector('.lb-cv').getBoundingClientRect(); return r.left >= c.left - 1 && r.right <= c.right + 1 && r.top >= c.top - 1; })() }; });
        const scS = await noScroll(page);
        if (SHOTS) await page.screenshot({ path: path.join(SHOTS, `wave2-c-seeds-${size}.png`) });
        const sdOk = up && !!sd && sd.tiles[0] === BR && sd.sel.length === 1 && sd.sel[0] === BR && sd.badge === a.U.pickBrought && sd.badgeIn && sd.cnt === '1／3' && !sd.okDis && sd.pressed === 'true' &&
          strong.every(id => sd.tiles.includes(id)) && scrollOk(scS);
        // 4. 就這幾張 → 特價箱 → 來客：包包第一張是它、run.seeds、save.bring 清空、認識不算擁有
        await jsClick(page, '.lb-sheet.seeds [data-a=ok]');
        let nn = false; const t1 = Date.now();
        while (!nn && Date.now() - t1 < 20000) { nn = (await screen(page)) === 'night'; if (!nn) { await answerBargain(page); await sleep(200); } }
        await sleep(500);
        const rr = await page.evaluate(BR => { const R = window.__lab.run, S = window.__lab.save, ls = JSON.parse(localStorage.getItem('dipGameLab_v1') || 'null');
          return { bag: R.bag.slice(), seeds: R.seeds.slice(), runNo: R.runNo, tag: R.seedKey + '#' + (R.runNo || 1), bring: S.bring, lsBring: ls && ls.bring, shelf: S.shelf[BR] || null }; }, BR);
        // 帶上場的那張記成這一趟認識的（at＝seedKey#runNo：NEW 章、「這一趟新認識」找得到；審查：之前少了 #runNo）
        const runOk = nn && rr.bag[0] === BR && rr.bag.length === 7 && JSON.stringify(rr.seeds) === JSON.stringify([BR]) && rr.bring === null && rr.lsBring === null && rr.shelf && !rr.shelf.own && rr.shelf.at === rr.tag;
        // 5. 唱片資訊「在頻率光譜找它 ↗」
        const snd0 = await page.evaluate(() => ({ on: window.DipLabFx.soundOn(), pref: window.DipPlayer && window.DipPlayer.autoplayPreference ? window.DipPlayer.autoplayPreference() : null }));
        await page.evaluate(BR => { window.__lab.info(BR); }, BR);
        await page.waitForSelector('#cardInfoMask .ci-tune', { timeout: 5000 }).catch(() => {});
        await sleep(500);
        const ci = await page.evaluate(BR => { const l = document.querySelector('#cardInfoMask .ci-tune'); if (!l) return null; const c = window.DipLabContent.cards[BR], r = l.getBoundingClientRect(), row = l.closest('.tn');
          const mk = document.getElementById('cardInfoMask');
          return { href: l.getAttribute('href'), want: '/tune/?q=' + encodeURIComponent(c.artist + ' ' + c.album), target: l.target, rel: l.rel, text: l.textContent, stream: l.classList.contains('streaming-btn'), row: !!row && !!row.dataset.tune,
            inView: r.left >= 0 && r.right <= innerWidth && r.top >= 0 && r.bottom <= innerHeight, h: Math.round(r.height), w: Math.round(r.width), oneLine: row ? Math.round(row.getBoundingClientRect().height) : 0, scrollX: mk.scrollWidth - mk.clientWidth }; }, BR);
        if (SHOTS) await page.screenshot({ path: path.join(SHOTS, `wave2-c-cardinfo-${size}.png`) });
        const popP = ctx.waitForEvent('page', { timeout: 6000 }).then(p => p, () => null);
        await tapAt(page, '#cardInfoMask .ci-tune');
        const pop = await popP; const popUrl = pop ? pop.url() : '';
        if (pop) { await pop.waitForLoadState('domcontentloaded').catch(() => {}); await pop.close().catch(() => {}); }
        await page.bringToFront(); await sleep(500);
        const snd1 = await page.evaluate(() => ({ on: window.DipLabFx.soundOn(), pref: window.DipPlayer && window.DipPlayer.autoplayPreference ? window.DipPlayer.autoplayPreference() : null, ss: sessionStorage.getItem('dip:autoplay'), open: !!document.getElementById('cardInfoMask') }));
        await closeInfo(page);
        const ciOk = !!ci && ci.href === ci.want && ci.target === '_blank' && /noopener/.test(ci.rel) && ci.text === '在頻率光譜找它 ↗' && !ci.stream && ci.row && ci.inView && ci.h >= 30 && ci.oneLine <= 16 && ci.scrollX <= 1 &&
          !!pop && popUrl.indexOf(ci.want.replace(/^\//, '')) >= 0 && snd0.on === true && snd1.on === true && snd1.pref !== 'off' && snd1.ss !== 'off' && snd1.open;
        // 6. ?card=王牌 → 店裡沒有、不收；?card=（不是第一次玩）→ 下一趟那句
        await page.evaluate(() => { window.__toasts.length = 0; });
        await openTitle(page, Q('&fast=1&card=' + encodeURIComponent("radiohead|ok computer")));
        const bad = await page.evaluate(() => ({ search: location.search, bring: window.__lab.save.bring, toasts: window.__toasts.slice(), want: window.DipLabContent.seeds.ui.bringMissing }));
        // 6b. 舊 slug 連結（第 B 波以前主站產生的）照表換成 catalogId 收下（SPEC-B §2.4；W1a-7 留給 WP5）
        await openTitle(page, Q('&fast=1&card=bob-dylan-john-wesley-harding'));
        const g1 = await page.evaluate(() => ({ search: location.search, bring: window.__lab.save.bring }));
        await openTitle(page, Q('&fast=1&card=' + encodeURIComponent("bob dylan|john wesley harding")));
        const g2 = await page.evaluate(() => ({ search: location.search, bring: window.__lab.save.bring, toasts: window.__toasts.slice(), want: window.DipLabContent.seeds.ui.bringToast.replace('{album}', window.DipLabContent.cards["bob dylan|john wesley harding"].album) }));
        const badOk = !/card=/.test(bad.search) && bad.bring === null && bad.toasts.includes(bad.want) && !/card=/.test(g2.search) && g2.bring && g2.bring.id === "bob dylan|john wesley harding" && g2.toasts.includes(g2.want) &&
          !/card=/.test(g1.search) && !!g1.bring && g1.bring.id === "bob dylan|john wesley harding";
        // 7. 兩個分頁（審查）：遊戲分頁 A 開著（記憶體裡是剛才那張 Dylan）→ 主站「帶去店裡對決」開出遊戲分頁 C 收下 BR；
        //    C 開著時 A 存一次檔（不准把 C 收的蓋掉）→ 關掉 C → A 推門：挑種子第一張是 BR
        const Cp = await ctx.newPage(); track(Cp);
        await openTitle(Cp, Q('&fast=1&card=' + encodeURIComponent(BR)));
        const c7 = await Cp.evaluate(() => (JSON.parse(localStorage.getItem('dipGameLab_v1') || 'null') || {}).bring || null);
        await page.bringToFront();
        const a7 = await page.evaluate(() => { window.__lab.own([], 'run'); return { mem: window.__lab.save.bring, ls: (JSON.parse(localStorage.getItem('dipGameLab_v1') || 'null') || {}).bring || null }; });
        await Cp.close();
        await jsClick(page, '[data-a=push]'); await sleep(450); await jsClick(page, '[data-a=push]');   // 這一趟還沒打完：按兩下才重新推門
        const up7 = await page.waitForSelector('.lb-sheet.seeds .lb-ct', { timeout: 20000 }).then(() => true, () => false);
        await sleep(500);
        const sd7 = await page.evaluate(() => { const t = [...document.querySelectorAll('.lb-sheet.seeds .lb-ct')]; return { first: t[0] && t[0].dataset.cid, sel: t.filter(x => x.classList.contains('sel')).map(x => x.dataset.cid),
          ls: (JSON.parse(localStorage.getItem('dipGameLab_v1') || 'null') || {}).bring || null }; });
        const twoOk = !!c7 && c7.id === BR && !!a7.ls && a7.ls.id === BR && !!a7.mem && a7.mem.id === BR && up7 && sd7.first === BR && sd7.sel.length === 1 && sd7.sel[0] === BR && !!sd7.ls && sd7.ls.id === BR;
        record(55, size, aOk && b0.bring && b0.bring.id === BR && !b0.toasts.length && sdOk && runOk && ciOk && badOk && twoOk,
          `收下 ${aOk}（網址 ${a.search}、吐司 ${JSON.stringify(a.toasts)}）、重新整理 ${JSON.stringify(b0)}；挑種子 ${sdOk} ${JSON.stringify(sd && { first: sd.tiles[0], n: sd.tiles.length, sel: sd.sel, badge: sd.badge, badgeIn: sd.badgeIn, cnt: sd.cnt })} ${JSON.stringify(scS)}；` +
          `開局 ${runOk} ${JSON.stringify({ bag0: rr.bag[0], n: rr.bag.length, seeds: rr.seeds, bring: rr.bring, shelf: rr.shelf })}；唱片資訊 ${ciOk} ${JSON.stringify(ci)} 新分頁 ${popUrl} 聲音 ${JSON.stringify(snd0)}→${JSON.stringify(snd1)}；` +
          `王牌／舊 slug／第二次 ${badOk} ${JSON.stringify(bad.toasts)} ${g1.bring && g1.bring.id} ${JSON.stringify(g2.toasts)}；` +
          `兩個分頁 ${twoOk} ${JSON.stringify({ c: c7 && c7.id, aLs: a7.ls && a7.ls.id, aMem: a7.mem && a7.mem.id, first: sd7.first, sel: sd7.sel, ls: sd7.ls && sd7.ls.id })}`);
      } catch (e) { record(55, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #56 包包不限張數（店主 11-16）：包包 8 張打贏 → 挑唱片面板小字「包包 8 張」→ 收這張＝直接進包包（第 9 張，沒有「挑一張拿出來」面板）；
    //     包包 20 張再打贏一位 → 收第 21 張也一樣；來客包包條「包包 21 張」
    if (want(56)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue4(page, { ace: 'hall', pos: 2 }, Q());
        await waitScreen(page, 'night'); await sleep(500);
        const pad = n => page.evaluate(n => { const R = window.__lab.run, C = window.DipLabContent, E = window.DipLabEngine;
          const used = new Set([C.aces[R.ace], ...R.bag, ...Object.values(R.shop.bins).flat(), ...R.shop.bargain, ...C.bargain.pool, ...(C.bargain.retired || [])]);
          const extra = Object.keys(C.cards).filter(id => !C.cards[id].tier && !used.has(id) && E.priceOf(C, C.cards[id]) != null).slice(0, n - R.bag.length);
          R.bag.push(...extra); return R.bag.length; }, n);
        const winTake = async () => {
          await jsClick(page, '[data-a=go]'); await duelReady(page); await sleep(200);
          await page.evaluate(() => window.DipLabDuel.play({ i: 0, attr: 'c' }));   // 他丟一張：才有唱片可以撿
          await duelReady(page);
          await page.evaluate(() => window.__lab.forceWin());
          await waitScreen(page, 'reward', 15000);
          for (let g = 0; g < 60; g++) {
            if (await page.$('.lb-sheet.reward [data-pick]')) break;
            if (await page.$('.lb-dq.drop .nx.on')) await jsClick(page, '.lb-dq.drop');
            await sleep(150);
          }
          await sleep(800);
          const pre = await page.evaluate(() => ({ sub: (document.querySelector('.lb-sheet.reward .hd .sub') || {}).textContent || '', bag: window.__lab.run.bag.length,
            pick: (document.querySelector('.lb-sheet.reward [data-pick]') || {}).getAttribute ? document.querySelector('.lb-sheet.reward [data-pick]').getAttribute('data-pick') : null }));
          await tapAt(page, '.lb-sheet.reward [data-pick]');
          let dropSheet = false;
          for (let g = 0; g < 40 && (await screen(page)) !== 'night'; g++) {
            if (await page.$('.lb-sheet.drop')) dropSheet = true;
            await page.evaluate(() => { const b = document.querySelector('.lb-sheet.level [data-lv]'); if (b && !document.querySelector('.lb-sheet.level.arming')) b.click(); });
            await sleep(250);
          }
          await sleep(500);
          const post = await page.evaluate(() => ({ bag: window.__lab.run.bag.slice(), line: ((document.querySelector('.lb-bagline [data-a=bag]') || {}).textContent || '').replace(/\s+/g, ''),
            toasts: [...document.querySelectorAll('.lb-toast')].map(t => t.textContent).join('|') }));
          return { pre, post, dropSheet, scr: await screen(page) };
        };
        const n8 = await pad(8);
        const a = await winTake();
        const okA = n8 === 8 && a.pre.bag === 8 && a.pre.sub === '包包 8 張' && !!a.pre.pick && !a.dropSheet && a.scr === 'night' && a.post.bag.length === 9 && a.post.bag.includes(a.pre.pick) && a.post.line === '包包9張';
        const n20 = await pad(20);
        const b = await winTake();
        const okB = n20 === 20 && b.pre.sub === '包包 20 張' && !!b.pre.pick && !b.dropSheet && b.scr === 'night' && b.post.bag.length === 21 && b.post.bag.includes(b.pre.pick) && b.post.line === '包包21張';
        record(56, size, okA && okB, `包包 ${n8}：小字「${a.pre.sub}」→ 收《${a.pre.pick}》→ 拿出來面板 ${a.dropSheet}、${a.scr}、包包 ${a.post.bag.length}（有那張 ${a.post.bag.includes(a.pre.pick)}）、包包條「${a.post.line}」；` +
          `包包 ${n20}：小字「${b.pre.sub}」→ 收《${b.pre.pick}》→ 拿出來面板 ${b.dropSheet}、${b.scr}、包包 ${b.post.bag.length}、包包條「${b.post.line}」`);
      } catch (e) { record(56, size, false, 'error ' + e.message); }
      await ctx.close();
    }

    // #57 第 A 波（店主 11-16「全部開始做吧」）：
    //   (a) 挑戰者進門直接走到對戰台（duelE）等你；來客條每顆頭像下寫稱號（＝engine roundGuests[i].title，null 不寫）；客人資訊「常出：○○」（主屬性上色）＋稱號小籤；
    //       頂欄離最遠紀錄 3 位內「再贏 N 位破紀錄」；真點舞台上的「對戰台」→ 你走到 duelP → 開打；他名字旁稱號＝view.eTitle
    //   (b) 讀對了就說出來（剋中＝「讀對了。」／看穿唬人＝「你看穿了！」）、越讀越響（連續剋中音一次比一次高、第三次停格）
    //   (c) 險勝章（剩 1–2 聲望贏下＝「險勝！」）＋連勝 +1 小章＋老闆補一句；錢跳數字入帳（領獎畫面頂欄下的金色小條，數字跳到新的錢）
    //   (d) 差一點摘要：輸掉（說情用完）→ 結算「走到」那一列「差 N 位破紀錄」、輸給誰那行「他只剩 X 聲望，第 n 手被○剋○翻盤」；不捲動
    if (want(57)) {
      const { ctx, page } = await newPage(browser, w, h); track(page);
      try {
        await seededContinue4(page, { ace: 'hall', pos: 13 }, Q());
        await waitScreen(page, 'night');
        await page.evaluate(() => { const r = window.__lab.run; r.farBefore = 14; r.streak = 3; window.__lab.go('night'); });
        const atTable = await page.waitForFunction(() => { const s = window.__lab.stage, f = s.pos('f'), d = s.layout.spots.duelE; return f && !f.hidden && Math.hypot(f.x - d[0], f.y - d[1]) <= 1; }, null, { timeout: 10000 }).then(() => true, () => false);
        await sleep(400);
        const nt = await page.evaluate(() => { const R = window.__lab.run, C = window.DipLabContent, E = window.DipLabEngine, G = E.roundGuests(R, C);
          const tf = t => t ? C.trial.ui.titleFmt.replace('{t}', t) : null;   // 稱號寫成「○○級」（審查 A-6）；來客條放不下的用短寫（C.trial.titlesShort）
          return { tl: [...document.querySelectorAll('[data-tut=night] .nc')].map(n => (n.querySelector('.tl') || {}).textContent || null), want: G.map(g => tf(g.title && ((C.trial.titlesShort || {})[g.title] || g.title))), cur: G.find(g => g.cur),
            curT: tf((G.find(g => g.cur) || {}).title), tline: C.trial.ui.titleLine,
            top: document.querySelector('#top .tt').textContent, rec: C.trial.ui.toRecord.replace('{n}', 2), fv: (() => { const f = window.__lab.stage.pos('f'), a = document.querySelector('#stage') || document.body; return !!f; })() }; });
        const scN = await noScroll(page);
        // 客人資訊
        await jsClick(page, '[data-tut=night] .nc.cur'); await sleep(500);
        const gs = await page.evaluate(() => { const s = document.querySelector('.lb-sheet.float.guest'); if (!s) return null; const ma = s.querySelector('.bl.ma');
          return { ma: ma ? ma.textContent : '', cls: ma ? (ma.querySelector('b') || {}).className : '', tags: [...s.querySelectorAll('.gtag')].map(t => t.textContent), tl: (s.querySelector('.bl.tl') || {}).textContent || null }; });
        const mainZh = await page.evaluate(m => window.DipLabEngine.ZH[m], nt.cur.main);
        await jsClick(page, '.lb-sheet.float.guest [data-a=close]'); await sleep(300);
        const okA1 = atTable && JSON.stringify(nt.tl) === JSON.stringify(nt.want) && nt.want.some(Boolean) && nt.tl[4] === null && nt.top.indexOf(nt.rec) >= 0 && scrollOk(scN) &&
          gs && gs.ma === '常出：' + mainZh && gs.cls === nt.cur.main && (nt.curT ? gs.tl === nt.tline.replace('{t}', nt.curT) : gs.tl === null) && !gs.tags.some(t => nt.want.includes(t) || (nt.cur.title && t === nt.cur.title));
        // 真點對戰台 → 你走到 duelP → 開打
        const hot = await tapHot(page, x => x.id === 'deck' || x.action === 'duel');
        const walked = await page.waitForFunction(() => { const s = window.__lab.stage, p = s.pos('p'), d = s.layout.spots.duelP; return p && Math.hypot(p.x - d[0], p.y - d[1]) <= 1; }, null, { timeout: 8000 }).then(() => true, () => false);
        await duelReady(page);
        await page.waitForFunction(() => window.__lab.rawDuel() && !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
        await sleep(500);
        const dv = await page.evaluate(() => { const d = window.DipLabDuel.debug(), t = document.querySelector('.dl-e .ttl'); return { eTitle: d.view.eTitle, ttl: t && !t.hidden ? t.textContent : null, eMain: d.view.eMain, top: document.querySelector('#top .tt').textContent }; });
        const okA2 = !!hot && walked && dv.eTitle === nt.cur.title && (dv.ttl === nt.curT || (!dv.eTitle && dv.ttl === null)) && dv.eMain === nt.cur.main && dv.top.indexOf(nt.rec) >= 0;
        // (b) 連續剋中三手
        await page.evaluate(() => window.__lab.force({ kind: 'counter', toE: 2 }));
        const hands = [];
        for (let k = 0; k < 3; k++) {
          await page.evaluate(() => window.DipLabDuel.play({ i: 0, attr: 'c' }));
          await page.waitForFunction(n => { const d = window.DipLabDuel.debug(); return d && d.hands.length > n && d.hands[d.hands.length - 1].ui; }, k, { timeout: 8000 }).catch(() => {});
          hands.push(await page.evaluate(() => { const d = window.DipLabDuel.debug(), hd = d.hands[d.hands.length - 1]; return { l1: hd.ui.call.l1, bluff: !!(hd.evs.find(e => e.t === 'clash') || {}).bluff, saw: !!(hd.ct && hd.ct.saw), read: d.readRun, snd: d.sounds[d.sounds.length - 1] }; }));
          await page.waitForFunction(() => { const d = window.DipLabDuel.debug(); return d && d.phase === 'choose'; }, null, { timeout: 15000 }).catch(() => {});
        }
        const DT = await page.evaluate(() => window.DipLabContent.duelText);
        // 11-17 提示分級：半指那手他出的不是打算那色、但也不是他說不出那色＝照實（事件 bluff 真、結果句「讀對了。」）→ 看結果句算的「看穿」（ct.saw），不看事件的 bluff
        const okB = hands.length === 3 && hands.every((x, k) => x.read === k + 1 && (x.saw ? x.l1.indexOf('你看穿了！') === 0 : x.l1.indexOf(DT.readRight) === 0)) &&
          hands[0].snd === 'readHit@1.000' && hands[1].snd === 'readHit@1.122' && hands[2].snd === 'readHit@1.260+stop';
        // (c) 險勝：你剩 2、這一手扣他到 0
        await watchSay(page);
        await page.evaluate(() => { window.__stamp = null; window.__cash = []; const d = window.__lab.rawDuel(); d.p.hp = 2; window.__lab.force({ kind: 'counter', toE: 40 });
          setInterval(() => { const x = window.DipLabDuel.debug(); if (x && x.stamp && x.stamp.text) window.__stamp = x.stamp; document.querySelectorAll('.lb-toast.cash').forEach(t => { if (!window.__cash.includes(t.textContent)) window.__cash.push(t.textContent); }); }, 40); });
        const money0 = await page.evaluate(() => window.__lab.run.money);
        await page.evaluate(() => window.DipLabDuel.play({ i: 0, attr: 'c' }));
        await page.waitForFunction(() => window.__stamp, null, { timeout: 12000 }).catch(() => {});
        await waitScreen(page, 'reward', 20000); await sleep(3000);
        const cz = await page.evaluate(() => ({ stamp: window.__stamp, said: (window.__said || []).filter(x => x.id === 'o').map(x => x.t), cash: window.__cash.slice(), money: window.__lab.run.money, U: window.DipLabContent.trial.ui, L: window.DipLabContent.shopLines.closeWin, M: window.DipLabEngine.moneyText }));
        const earn = await page.evaluate(m0 => window.__lab.run.money - m0, money0), mt = await page.evaluate(n => window.DipLabEngine.moneyText(n), cz.money);
        const okC = !!cz.stamp && cz.stamp.text === cz.U.closeWin && cz.stamp.chip === cz.U.streak.replace('{n}', 4) && /gold/.test(cz.stamp.cls) && cz.said.includes(cz.L) &&
          earn > 0 && cz.cash.some(t => t.indexOf('+$') === 0) && cz.cash.some(t => t.endsWith('$' + mt));
        // (d) 差一點：下一位（第 14 位）打輸、說情用完 → 結算
        await page.evaluate(() => { const b = document.querySelector('.lb-sheet.reward [data-a=skip]'); if (b) b.click(); });
        for (let g = 0; g < 50 && (await screen(page)) !== 'night'; g++) { if (await page.$('.lb-dq.drop .nx.on')) await jsClick(page, '.lb-dq.drop'); await page.evaluate(() => { const b = document.querySelector('.lb-sheet.reward [data-a=skip]') || document.querySelector('.lb-sheet.level [data-lv]'); if (b && !document.querySelector('.lb-sheet.level.arming')) b.click(); }); await sleep(250); }
        await page.evaluate(() => { const r = window.__lab.run; r.retryLeft = 0; r.farBefore = r.pos + 1; window.__lab.go('night'); });   // 再贏 2 位才破
        await sleep(600);
        await jsClick(page, '[data-a=go]'); await duelReady(page);
        await page.waitForFunction(() => window.__lab.rawDuel() && !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
        await sleep(300);
        // 第 1 手你剋中扣到他剩 2（你領先）→ 第 2 手被剋、你歸零（翻盤）
        await page.evaluate(() => { const d = window.__lab.rawDuel(); window.__lab.force({ kind: 'counter', toE: d.e.hp - 2 }); });
        await page.evaluate(() => window.DipLabDuel.play({ i: 0, attr: 'c' }));
        await page.waitForFunction(() => { const d = window.DipLabDuel.debug(); return d && d.phase === 'choose' && d.n >= 2; }, null, { timeout: 15000 }).catch(() => {});
        await page.evaluate(() => { const d = window.__lab.rawDuel(); window.__lab.force({ kind: 'countered', toP: d.p.hp }); });
        await page.evaluate(() => window.DipLabDuel.play({ i: 0, attr: 'c' }));
        const end = await advanceUntil(page, () => window.__lab.screen() === 'end', null, 40000);
        await sleep(1000);
        const ed = await page.evaluate(() => { const S = window.DipLabContent.summary, R = window.__lab.run, Z = window.DipLabEngine.ZH, L = R.lastLoss;
          const sub = document.querySelector('.lb-endhero .sub'), nr = document.querySelector('.lb-sum .nr.near');
          return { near: nr ? nr.textContent : '', nearWant: S.toBreak.replace('{n}', 2), close: ((sub && sub.querySelector('.close')) || {}).textContent || '', L,
            closeWant: L && L.flip ? S.closeHp.replace('{n}', L.eHp) + '，' + S.flipBy.replace('{k}', L.flip.k).replace('{e}', Z[L.flip.e]).replace('{p}', Z[L.flip.p]) : '',
            scr: (() => { const s = document.querySelector('.lb-screen.end .lb-scroll'); return s ? s.scrollHeight - s.clientHeight : -1; })() }; });
        const scE = await noScroll(page);
        const okD = end && ed.near === ed.nearWant && !!ed.L && ed.L.eHp === 2 && ed.L.flip && ed.L.flip.k === 2 && ed.L.flip.kind === 'countered' && ed.close === ed.closeWant && ed.scr <= 1 && scrollOk(scE);
        record(57, size, okA1 && okA2 && okB && okC && okD,
          `(a) 客人走到對戰台 ${atTable}；稱號 ${JSON.stringify(nt.tl)}＝${JSON.stringify(nt.want)}；頂欄「${nt.top}」；客人資訊「${gs && gs.ma}」(${gs && gs.cls})「${gs && gs.tl}」籤 ${JSON.stringify(gs && gs.tags)}；` +
          `真點 ${hot && hot.id} → 走到 duelP ${walked}、對決稱號「${dv.ttl}」(view ${dv.eTitle})、常出 ${dv.eMain}、頂欄「${dv.top}」；` +
          `(b) ${hands.map(x => x.l1.slice(0, 6) + '…/' + x.snd).join('、')}；(c) 大章 ${JSON.stringify(cz.stamp)}、老闆「${cz.said.slice(-1)}」、錢條 ${JSON.stringify(cz.cash.slice(-2))}（+$${earn}）；` +
          `(d) 結算 ${end}：「${ed.near}」「${ed.close}」lastLoss ${JSON.stringify(ed.L)}、捲動 ${ed.scr}`);
      } catch (e) { record(57, size, false, 'error ' + e.message); }
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
