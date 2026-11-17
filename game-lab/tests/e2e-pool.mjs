// game-lab/tests/e2e-pool.mjs：第 B 波（SPEC-B §6.3）端對端測試——5,000 張卡池＋catalogId、存檔 v7 遷移、主站帶卡（?card=）、一檔貨、想要清單、
//   今日推薦集點卡、媒體延後（cards-media.json）、首屏位元組、聆聽室、效能。WP5。
//   需要靜態伺服器（repo 根）：python3 -m http.server 8765
//   LAB_BASE=http://localhost:8765 node game-lab/tests/e2e-pool.mjs
//   環境變數（見 e2e-lib.mjs）：LAB_URL 或 LAB_BASE、LAB_SIZES（預設四個驗收尺寸）；
//     POOL_ONLY＝只跑這幾項（例 "P1,P3,P1c,M2"）；
//     畫面類（P1、P3–P10、P10b）每個尺寸都跑；邏輯 fixture（P1b–P1g、P2、P11、P12、M2）只在 390x664 跑（LAB_SIZES 沒有 390x664 就不跑）；
//     P9 的計時（Fast 3G，branch／main 交錯）只在 390x664 跑：LAB_MAIN_BASE＝main 的伺服器根（例 http://localhost:8774）；沒給只量 branch。
//       POOL_P9_RUNS＝每邊幾次（預設 7）。首屏位元組每個尺寸都量（硬門檻：主線 M1 760 → 併 #480 780 → 併 #491 800 KB gz）。
//
// 舊存檔一律「現在的引擎造一份 v7 形狀 → catalogId 反查回舊 slug（tools/legacy-ids.json）→ 寫成 v6／v5／v4」，所以 fixture 跟著卡池走、不寫死張數。
//
// 畫面類（每個尺寸）：
//   P1  v6 舊存檔（唱片櫃 own gift／run／boss／start＋認識、想要 3、bring、lastBargain、lastAceId、runs[]（seeds／kept／aces）、進行中 run（包包、shop.bins、
//       特價箱、收音機、stats、打到一半的對決））→ v 7、存檔字串 0 個舊 slug；唱片櫃頁「我的收藏」張數、「認識過 n」跟遷移前一樣；bak6 逐字＝原字串；
//       進行中 run 的欄位都換成 catalogId、補上一檔貨；「繼續」把這一位打完 → 下一位；再整理不再遷、bak6 不變
//   P3  ?card=：catalogId 含 "、'、非 ASCII、空白（有編碼）、+（有編碼／沒編碼）、%（有／沒編碼）、&、大小寫與前後空白；舊 slug 照表換；不在卡池、王牌 →「店裡沒有」；
//       主站頻率光譜「帶去店裡對決」那行（repo 根 index.html：game-lab/?card=encodeURIComponent(_gameId)、_gameId＝cardIdOf）產生的連結回到同一張；
//       唯讀存檔（卡池沒載到）帶 ?card= → 網址參數拿掉、不收、不吐司收下
//   P4  一檔貨：第 1 位架上 47 張（每箱 3、FEATURE 2）、全在策展池；買一張 → 進 gone、打完第 1 位回店那一箱換了、之後第 2–5 位都不再上架；
//       ?debug=1 跳到第 6 位 → lot.no 2、src 'all'、架上有策展池以外的卡；重新整理架子一樣；localStorage 只寫允許的鍵
//   P5  一次性提示 lotHint：第 2 位出一次（seen.lotHint）、第 3 位不再出；空箱兩種字（這一位賣完 binEmpty／這一檔賣完 binEmptyLot）
//   P6  想要清單：找一個第 1 檔就中的 seed（Node 端同一支 engine）→ 架上有它、吐司「你想要的《…》上架了」一次（lot.told）、抽屜「你想要的」籤＋縮圖角；reload 不再吐司
//   P7  今日推薦（page.clock 定在 2026-11-16）：標題小籤＋老闆一句 → 點小籤開試聽機（集點卡 1／7）→ 收下 → 唱片櫃擁有 src daily、格子 2／7、吐司 →
//       同日 reload 不換 → 11-17 新的一張 → 撥回 11-15 不發不壞 → day '2099-01-01' 當壞值照發 → 跨午夜 visibilitychange 發新的；
//       stamps 7 → 換獎勵三選一（經冷硬各一、史詩〔驗收改：不給傳奇〕、沒擁有）→ 擁有 src daily → 下一趟挑種子列得到它；唯讀（卡池 404）不發、序章前不發；
//       兩個分頁：A 收下／換獎勵後，B 不重新整理直接收／換 → 格子數對（改之前先重讀）
//   P8  媒體延後：cards-media.json 延 12 秒 → 標題照常、抽屜裡的精選新卡先是專輯名字卡、到了封面補上；正常（請求帶 ?v=poolVersion、dip:media 4,677）；
//       404 → 照玩、5 秒後重試、沒有未捕捉例外；v 不同的 JSON → 不套、沒有例外
//   P9  首屏：index.html 同步載的 script＋stylesheet 逐檔 gzip -9 合計 ≤ 800 KB（主線 M1 760，併 #480 跟著 main 基底 +20；硬門檻）；計時 Fast 3G 量標題鈕可點（參考，只在 390x664）
//   P10 聆聽室：星圖關掉收藏開關、挑到一張精選新卡（不是你的）→ save.want 有它（catalogId）、吐司；收藏亮、挑到擁有的（精選新卡）→ 收回、放上唱盤
//   P10b 媒體晚到：開控制台前的請求都 404、開控制台那一下重抓的扣住（≤19 秒，載入器 20 秒放棄）→ 控制台照 15 秒逾時先開 → 星圖上的精選新卡先沒有封面試聽 →
//       放行、媒體到 → 同一個物件的封面、試聽補上（試聽可播）
// 邏輯 fixture（只在 390x664）：
//   P1b v4 存檔（nights；舊 slug）→ v7、存檔 0 個舊 slug、唱片櫃＝那幾格的 catalogId＋lastAce 那組送的
//   P1c 遷移失敗（addInitScript 把 DipLabEngine.mapIds 換成丟例外）→ 標題「存檔升級失敗」那行、不是捏人／序章、能開始玩、主鍵逐字不變、bak6 原字串
//   P1d 混合存檔：同一張舊 slug 與 catalogId 兩格（own run／只 seen）＋想要兩種寫法 → 合成一格（own、src run、at 取早的）、想要不重複；
//       daily 鍵 log 收過一張、主鍵（v6）沒有那張 → 唱片櫃補成擁有 src daily、主鍵寫回
//   P1e 待說情（pending retry）的 v6 → 遷完照樣說情重打、同一位、同一批貨、同一副牌（run.retryDeck＝舊卡池 oldDeckIds；fixture 用新引擎造，牌單另照舊卡池算）；待領獎（pending reward）的 v6 → 獎勵是 catalogId、挑得到、回來客
//   P1f ?apex=1 的 v6：lastAceId、run.aceId、run.unlock.apex、run.acesWon、run.bossCard 都換成 catalogId；?apex=1 照常開、第 5 位藏家照常帶他那張
//   P1g 序章途中（prologue pending、特價箱還沒挑）的 v6 → fixBargain＋fixLot 都跑、接著挑特價箱、序章打得完（撿 Eminem、挑配件、來客）
//   P2  v5 存檔 → v7：老闆送的、藏家王牌照 migrate5 記成擁有（id 是 catalogId）
//   P11 效能（CPU 4× 節流）：來客畫面重畫（go('night')，10 次中位）、「認識 3,000 張」存檔的 persist()（10 次中位）；寫進報告，>50 ms 印 NOTE、不失敗
//   P12 cards-pool.js 404 → 標題 poolMissing 那行、玩得了（推門開局）、主鍵逐字不變
//   M2  主站帶卡擋傳奇（主線 M2）：?card=傳奇 → 不收、吐司 seeds.ui.bringLegend；?card=史詩 → 收下；存檔裡帶著傳奇的 bring → 載入時丟掉
//   P13 唱片櫃頁分批畫（驗收）：認識 1,001／擁有 201 → 開頁各 120 張、捲到底全到、切王牌只重畫認識那面、點封面照開
//   P14 對決複本的封面（驗收）：媒體 404 時開打 → 重新整理媒體到 → 他出的精選新卡畫封面（duel.js 查活的卡），不是名字卡
// 每一項印 PASS／FAIL（NOTE 不算）；任何 FAIL → exit 1。
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { launch, newPage, openTitle, Q, URL0, SIZES, record, results, sleep, jsClick, waitScreen, duelReady, resolveHands, ALLOWED_LS, prologueToDuel, advanceUntil, passLoot } from './e2e-lib.mjs';

const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const CN = require(path.join(LAB, 'content.js')), EN = require(path.join(LAB, 'engine.js'));   // 跟頁面同一支引擎、同一份卡池（造 fixture、找 seed）
const LEGACY = JSON.parse(fs.readFileSync(path.join(LAB, 'tools/legacy-ids.json'), 'utf8'));   // {舊 slug: catalogId}
const REV = Object.fromEntries(Object.entries(LEGACY).map(([k, v]) => [v, k]));
const KEY = 'dipGameLab_v1', DK = KEY + '.daily';
const ONLY = process.env.POOL_ONLY ? new Set(process.env.POOL_ONLY.split(',').map(s => s.trim())) : null;
const want = k => !ONLY || ONLY.has(k);
const LOGIC_SIZE = '390x664';
const MAIN_BASE = (process.env.LAB_MAIN_BASE || '').replace(/\/+$/, '');
const P9_RUNS = +(process.env.POOL_P9_RUNS || 7);
const FIRST_KB = 800;                                   // 首屏 gzip 硬門檻（SPEC-B C2 740 → 主線 M1 760 → 併 #480 780→ 併 #491 800（main 基底 +14.5 KB：recap.js 等））
// 門檻管的是第 B 波自己加的量（main 首屏＋約 120 KB）：M1 是 main 合併 A 波後基底 619→639 跟著 +20；#480 讓 main 656.8（+17.7），第 B 波增量沒變
//   （併前 753.3−639.1＝114.2、併後 771.3−656.8＝114.5）→ 照 M1 再 +20。C.hintLines 延後載只省約 6.8 KB，單獨也過不了 760（scratchpad v5/wave-b/merge/FIX.md）
const notes = [];
const note = (id, size, s) => { notes.push(`${id} [${size}] ${s}`); console.log(`NOTE  ${id} [${size}] ${s}`); };

// ---- 共用 ----------------------------------------------------------------------------------------------------
function toOld(x) {
  if (Array.isArray(x)) return x.map(toOld);
  if (x && typeof x === 'object') { const o = {}; for (const k of Object.keys(x)) o[REV[k] || k] = toOld(x[k]); return o; }
  return typeof x === 'string' && REV[x] ? REV[x] : x;
}
const slugHits = raw => Object.keys(LEGACY).filter(k => raw.includes(JSON.stringify(k)));
const clone = o => JSON.parse(JSON.stringify(o));
const sameJ = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const errs = page => (page._errors || []).filter(e => !/favicon/.test(e));
const errTxt = page => { const e = errs(page); return `錯誤 ${e.length}${e.length ? '：' + e.slice(0, 2).join(' | ') : ''}`; };
const C = CN, E = EN;
const CORE = Object.keys(C.cards).filter(id => !C.cards[id].pool && !C.cards[id].tier && E.canSeed(C, id));
const POOLC = Object.keys(C.cards).filter(id => C.cards[id].pool);
const CORE_N = Object.keys(require(path.join(LAB, 'cards.js'))).length;   // cards.js 永遠只有核心（368）
const ACE = C.aces;                                    // {hall, pearl, heresy}
const SU = C.seeds.ui, SH = C.shopUi, SL = C.shopLines, D7 = C.daily;
const fill = (t, o) => String(t).replace(/\{(\w+)\}/g, (m, k) => (o[k] != null ? o[k] : m));
const RALLIZES = "les rallizes dénudés|'77 live", THRILLER = 'michael jackson|thriller';
// 序章做完、人物、解鎖制那派那張（不然載入時補記、多一則吐司）；seen 把會擋路的一次性提示都算看過（各項自己再拿掉要測的）
const BASE7 = (o = {}) => Object.assign({ v: 7, seen: { night: true, aceSwap: true, counterSell: true, unlockHint: true }, learned: {}, settings: { fastAnim: false, sound: false },
  player: { name: '你', avatar: { head: 'neat' } }, run: null, runs: [{ seedKey: '20261105', runNo: 1, ace: 'pearl', result: 'dead', reached: 3, bestStreak: 1, taken: 5, wins: 2 }],
  runSeq: {}, best: { far: 3, checkpoints: [], bestStreak: 1 }, shelf: { [ACE.pearl]: { at: '20261105#1', seen: true, own: true, src: 'start' } }, relics: [],
  tutorialDone: true, prologueDone: true, lastAce: 'pearl', lastBargain: null, bring: null, want: [] }, o);
// 非序章的 run：挑好特價箱（不然來客一進去先開特價區）
function newRun(o) {
  const r = E.newRun(C, Object.assign({ runNo: 1, ace: 'pearl', prologue: false, relics: [], want: [] }, o));
  r.tut = false;
  if (!o.prologue) { const ch = E.bargainPolicy(r, C); if (ch) E.choose(r, C, ch); }
  return r;
}

let browser;
async function fresh(w, h, o = {}) {
  const r = await newPage(browser, w, h, o);
  await r.page.addInitScript(() => {
    window.__says = []; window.__toasts = [];
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => {
      if (n.nodeType !== 1 || !n.classList) return;
      if (n.classList.contains('ds-say')) window.__says.push(n.textContent);
      if (n.classList.contains('lb-toast')) window.__toasts.push(n.textContent);
    }))).observe(document, { childList: true, subtree: true });
  });
  return r;
}
// 這個分頁第一次載入前寫好 localStorage（之後 reload 不再寫）；extra＝其他鍵
async function seedLS(page, main, extra = {}) {
  await page.addInitScript(([raw, extra]) => {
    if (sessionStorage.getItem('__seeded')) return;
    localStorage.clear();
    if (raw != null) localStorage.setItem('dipGameLab_v1', raw);
    for (const k of Object.keys(extra)) localStorage.setItem(k, extra[k]);
    sessionStorage.setItem('__seeded', '1');
  }, [main == null ? null : typeof main === 'string' ? main : JSON.stringify(main), extra]);
}
const toasts = page => page.evaluate(() => window.__toasts.slice());
const says = page => page.evaluate(() => window.__says.slice());
const lsMain = page => page.evaluate(k => localStorage.getItem(k), KEY);
const daily = page => page.evaluate(k => JSON.parse(localStorage.getItem(k) || 'null'), DK);
const chipText = page => page.evaluate(() => (document.querySelector('.dl-chip button') || {}).textContent || '');
const titleReady = page => page.waitForSelector('[data-a=push],[data-a=cont]', { state: 'visible', timeout: 10000 }).then(() => true, () => false);
async function reloadTitle(page) { await page.reload({ waitUntil: 'domcontentloaded' }); const ok = await titleReady(page); await sleep(700); return ok; }
// 標題 →「繼續」→ 來客畫面
async function contNight(page) {
  await jsClick(page, '[data-a=cont]');
  const ok = await waitScreen(page, 'night', 20000);
  await sleep(600);
  return ok;
}
// 來客畫面 → 對決 → 直接打贏 → 領獎（挑第一張／升級）→ 回來客
async function winGuest(page) {
  let s = await page.evaluate(() => window.__lab.screen());
  if (s === 'night') { await sleep(500); await jsClick(page, '[data-a=go]'); await waitScreen(page, 'duel', 20000); }
  const ready = await duelReady(page, 20000);
  await resolveHands(page, 1, 'thoughtful');
  await page.evaluate(() => window.__lab.forceWin());
  const rew = await waitScreen(page, 'reward', 20000);
  // 第 C 波（SPEC-C §11.3）：戰利品列三張蓋牌翻完才能收 → passLoot 真點收第一張、升級照點第一顆，直到來客
  const pl = rew ? await passLoot(page, { take: true, ms: 20000 }) : null;
  const night = !!pl && pl.screen === 'night';
  await sleep(600);
  return ready && rew && night;
}
// 標題推門（安靜）→ 有一趟（挑種子面板出來就不帶、特價區照舊）；回 {run, s}
async function startPlay(page) {
  await page.evaluate(() => { const b = document.querySelector('[data-a=quiet]') || document.querySelector('[data-a=push]'); if (b) b.click(); });
  const t0 = Date.now();
  while (Date.now() - t0 < 12000) {
    const st = await page.evaluate(() => ({ run: !!(window.__lab && window.__lab.run), s: window.__lab.screen(), pro: window.__lab.run ? window.__lab.run.prologue : null }));
    if (st.run && st.s !== 'title') return st;
    if (await page.$('.lb-sheet.seeds [data-a=none]')) await jsClick(page, '.lb-sheet.seeds [data-a=none]');
    await sleep(300);
  }
  return page.evaluate(() => ({ run: !!window.__lab.run, s: window.__lab.screen(), pro: window.__lab.run ? window.__lab.run.prologue : null }));
}
const shelfNow = page => page.evaluate(() => JSON.parse(JSON.stringify(window.__lab.run.shop.bins)));
const lotNow = page => page.evaluate(() => JSON.parse(JSON.stringify(window.__lab.run.shop.lot)));
// 唱片櫃頁（我的收藏張數、「認識過 n」）
async function shelfPage(page) {
  await page.evaluate(() => window.__lab.openPage('shelf'));
  await page.waitForSelector('.lb-page.shelf', { timeout: 5000 }).catch(() => {});
  await sleep(400);
  const r = await page.evaluate(() => {
    const pg = document.querySelector('.lb-page.shelf'); if (!pg) return null;
    const h = (pg.querySelector('.lb-known .lb-h2') || {}).textContent || '', m = h.match(/(\d+)／(\d+)/);
    return { own: pg.querySelectorAll('.lb-wall.own .lb-cv').length, known: m ? +m[1] : -1, total: m ? +m[2] : -1, h };
  });
  await jsClick(page, '.lb-page [data-a=close]'); await sleep(300);
  return r;
}
async function binText(page, key) {
  return page.evaluate(async k => {
    window.DipLabEcon.openBin(k);
    for (let i = 0; i < 40 && !document.querySelector('.ec-drawer'); i++) await new Promise(z => setTimeout(z, 100));
    await new Promise(z => setTimeout(z, 500));
    const t = (document.querySelector('.ec-drawer .ec-empty') || {}).textContent || null;
    window.DipLabEcon.close();
    await new Promise(z => setTimeout(z, 500));
    return t;
  }, key);
}

// ---- 畫面類 --------------------------------------------------------------------------------------------------
// P1 v6 舊存檔
function fixtureP1() {
  const r = newRun({ seedKey: '20261106', runNo: 2, ace: 'pearl', seeds: [CORE[5]], want: [CORE[10], CORE[11], CORE[12]] });
  E.jumpTo(r, C, 3);
  let radio = null;
  for (const cell of (C.tunes.order || [])) { const x = E.choose(r, C, { type: 'radio', cell }); if (x && x.ok) { radio = cell; break; } }
  r.money = Math.max(r.money, 6000);
  const sp = E.shopPolicy(r, C, 'smart'), b = (Array.isArray(sp) ? sp : [sp]).find(x => x && x.type === 'buy');
  if (b) E.choose(r, C, b);
  E.startFight(r, C, {});
  const R = E.makeRng(7), mem = {};
  for (let k = 0; k < 2 && !r.duel.over; k++) E.resolveTurn(r.duel, E.policies.thoughtful(r.duel, R, mem, C));
  r.farBefore = 0; r.got = r.bag.slice();
  const at = r.seedKey + '#' + r.runNo, shelf = {};
  r.bag.forEach(id => { shelf[id] = { at, seen: false }; });
  (C.gifts.pearl || []).forEach(id => { shelf[id] = { at: '20261105#1', seen: true, own: true, src: 'gift', ownAt: '20261105#1' }; });
  shelf[CORE[20]] = { at: '20261105#1', seen: true, own: true, src: 'run', ownAt: '20261105#1' };
  shelf[ACE.hall] = { at: '20261105#1', seen: true, own: true, src: 'boss', ownAt: '20261105#1' };
  shelf[ACE.pearl] = { at: '', seen: true, own: true, src: 'start' };
  shelf[CORE[30]] = { at: '20261105#1', seen: true };
  shelf['gone-old-card-x'] = { at: '20261105#1', seen: true, own: true, src: 'gift' };   // 早就移掉的卡：照舊濾掉
  const s = BASE7({ seen: { night: true }, run: r, shelf, runSeq: { 20261105: 1, 20261106: 2 }, best: { far: 7, checkpoints: [], bestStreak: 3 },
    runs: [{ seedKey: '20261105', runNo: 1, ace: 'pearl', result: 'dead', reached: 7, bestStreak: 3, taken: 2, wins: 5, seeds: [CORE[20]], kept: CORE[20], aces: [ACE.pearl] }],
    lastBargain: r.shop.bargain.slice(0, 3), bring: { id: CORE.filter(id => E.rarity(C.cards[id]) !== 'legendary')[40], at: 1763300000000 }, want: [CORE[10], CORE[11], CORE[12]], lastAceId: ACE.pearl });
  const ids = Object.keys(shelf).filter(id => C.cards[id]);
  const v6 = toOld(s); v6.v = 6;
  delete v6.run.shop.lot; delete v6.run.want;                 // v6（B 波以前）沒有一檔貨、run.want
  return { s, v6, raw6: JSON.stringify(v6), nOwn: ids.filter(id => shelf[id].own).length, nKnown: ids.length, pos: r.pos, radio, bought: (b || {}).id || null };
}
async function P1(w, h, size) {
  const fx = fixtureP1();
  const oldN = slugHits(fx.raw6).length;
  const { ctx, page } = await fresh(w, h);
  try {
    await seedLS(page, fx.raw6);
    await openTitle(page, Q());
    await sleep(400);
    const a = await page.evaluate(() => {
      const raw = localStorage.getItem('dipGameLab_v1'), s = window.__lab.save, R = s.run;
      return { raw, bak: localStorage.getItem('dipGameLab_v1.bak6'), v: s.v, vRaw: JSON.parse(raw).v, want: s.want, bring: s.bring && s.bring.id, lastAceId: s.lastAceId, lastBargain: s.lastBargain,
        runs0: s.runs[0], run: R ? { pos: R.pos, duel: !!R.duel && !R.duel.over, bag: R.bag, lot: !!(R.shop && R.shop.lot), want: R.want, radio: R.shop.radio, bargain: R.shop.bargain, bins: R.shop.bins, bought: R.stats.bought } : null,
        cont: !!document.querySelector('[data-a=cont]'), ro: !!document.querySelector('.lb-foot.ro') };
    });
    const left = slugHits(a.raw);
    record('P1-1', size, a.v === 8 && a.vRaw === 8 && left.length === 0 && oldN > 0,
      `v6 存檔 ${oldN} 個舊 slug → v ${a.v}（存檔字串 v ${a.vRaw}），剩舊 slug ${left.length} 個${left.length ? '：' + left.slice(0, 3).join('、') : ''}`);
    const pg = await shelfPage(page);
    record('P1-2', size, !!pg && pg.own === fx.nOwn && pg.known === fx.nKnown,
      `唱片櫃頁：我的收藏 ${pg && pg.own}（遷移前 ${fx.nOwn}）、認識過 ${pg && pg.known}（遷移前 ${fx.nKnown}）「${pg && pg.h}」`);
    record('P1-3', size, a.bak === fx.raw6, `bak6 逐字＝遷移前原字串 ${a.bak === fx.raw6}（長度 ${a.bak ? a.bak.length : 0}／${fx.raw6.length}）`);
    const R0 = fx.s.run, inPool = ids => (ids || []).every(id => !!C.cards[id]);
    const runOk = !!a.run && a.run.duel && a.run.pos === fx.pos && sameJ(a.run.bag, R0.bag) && inPool(a.run.bag) && a.run.lot && sameJ(a.run.want, fx.s.want) &&
      sameJ(a.run.bargain, R0.shop.bargain) && sameJ(a.run.bins, R0.shop.bins) && sameJ(a.run.radio, R0.shop.radio) && sameJ(a.run.bought, R0.stats.bought);
    const tops = { want: sameJ(a.want, fx.s.want), bring: a.bring === fx.s.bring.id, lastAceId: a.lastAceId === fx.s.lastAceId, lastBargain: sameJ(a.lastBargain, fx.s.lastBargain),
      runs0: !!a.runs0 && sameJ(a.runs0.seeds, fx.s.runs[0].seeds) && a.runs0.kept === fx.s.runs[0].kept && sameJ(a.runs0.aces, fx.s.runs[0].aces) };
    const topOk = Object.values(tops).every(Boolean);
    record('P1-4', size, runOk && topOk && a.cont && !a.ro,
      `進行中 run：第 ${a.run && a.run.pos} 位、對決 ${a.run && a.run.duel}、包包／特價箱／架子／收音機（${fx.radio}）／買過的都換成 catalogId ${runOk}、一檔貨補上 ${a.run && a.run.lot}；` +
      `want／bring／lastAceId／lastBargain／runs[0] seeds·kept·aces ${topOk}${topOk ? '' : ' ' + JSON.stringify(tops) + ' ' + JSON.stringify({ want: a.want, bring: a.bring, lab: a.lastBargain, runs0: a.runs0 })}；繼續鈕 ${a.cont}、唯讀行 ${a.ro}`);
    // 繼續 → 把這一位打完
    await jsClick(page, '[data-a=cont]');
    let scr = null; const t0 = Date.now();
    while (Date.now() - t0 < 20000) { scr = await page.evaluate(() => window.__lab.screen()); if (scr === 'duel' || scr === 'night') break; await sleep(200); }
    const done = await winGuest(page);
    const fin = await page.evaluate(() => { const raw = localStorage.getItem('dipGameLab_v1'); const s = JSON.parse(raw); return { raw, v: s.v, pos: s.run && s.run.pos }; });
    const left2 = slugHits(fin.raw);
    record('P1-5', size, done && fin.v === 8 && fin.pos === fx.pos + 1 && left2.length === 0 && !errs(page).length,
      `繼續 → 打完這一位 ${done}（存檔第 ${fin.pos} 位、v ${fin.v}、舊 slug ${left2.length}）；${errTxt(page)}`);
    await openTitle(page, Q());
    const again = await page.evaluate(() => ({ v: window.__lab.save.v, bak: localStorage.getItem('dipGameLab_v1.bak6') }));
    record('P1-6', size, again.v === 8 && again.bak === fx.raw6, `再整理：v ${again.v}、bak6 沒被覆寫 ${again.bak === fx.raw6}`);
  } finally { await ctx.close(); }
}

// P3 ?card=
const MAIN_CASES = ['bonnie "prince" billy|i see a darkness', "miles davis|cookin' with the miles davis quintet", '黃小楨|賞味期限', 'art pepper|art pepper + eleven',
  'kaytranada|99.9%', 'sly & the family stone|fresh'];
async function mainCardIdOf() {
  // 主站（repo 根 index.html）的 cardIdOf 與「帶去店裡對決」那行：照它的程式產生連結（不另寫一份）
  const origin = new URL(URL0).origin, base = URL0.replace(/\/game-lab\/[^/]*$/, '/');
  let src = '';
  try { src = await (await fetch(base + 'index.html')).text(); } catch (_) { src = ''; }
  if (!src && process.env.LAB_ROOT) src = fs.readFileSync(path.join(process.env.LAB_ROOT, 'index.html'), 'utf8');
  const m = src.match(/function cardIdOf\(artist, album\) \{[\s\S]*?\n  \}/);
  const link = /href="game-lab\/\?card=\$\{encodeURIComponent\(result\._gameId\)\}"/.test(src);
  const fn = m ? new Function('return (' + m[0] + ')')() : null;
  return { fn, link, base, origin };
}
async function P3(w, h, size) {
  const cases = [
    ['quote', '&card=' + encodeURIComponent('bonnie "prince" billy|i see a darkness'), 'bonnie "prince" billy|i see a darkness'],
    ['apos', '&card=' + encodeURIComponent("miles davis|cookin' with the miles davis quintet"), "miles davis|cookin' with the miles davis quintet"],
    ['cjk', '&card=' + encodeURIComponent('黃小楨|賞味期限'), '黃小楨|賞味期限'],
    ['space', '&card=' + encodeURIComponent('david bowie|low'), 'david bowie|low'],
    ['plus-enc', '&card=' + encodeURIComponent('art pepper|art pepper + eleven'), 'art pepper|art pepper + eleven'],
    ['plus-raw', '&card=art pepper|art pepper + eleven', 'art pepper|art pepper + eleven'],
    ['pct-enc', '&card=' + encodeURIComponent('kaytranada|99.9%'), 'kaytranada|99.9%'],
    ['pct-raw', '&card=kaytranada|99.9%', 'kaytranada|99.9%'],
    ['amp', '&card=' + encodeURIComponent('sly & the family stone|fresh'), 'sly & the family stone|fresh'],
    ['case', '&card=' + encodeURIComponent('  David Bowie|Low '), 'david bowie|low'],
    ['slug', '&card=daft-punk-random-access-memories', 'daft punk|random access memories'],
    ['missing', '&card=' + encodeURIComponent('nobody|nothing'), null],
    ['ace', '&card=' + encodeURIComponent(ACE.hall), null]
  ];
  const mm = await mainCardIdOf();
  const { ctx, page } = await fresh(w, h);
  const raw = JSON.stringify(BASE7());
  const got = [];
  try {
    await openTitle(page, Q());
    const go = async url => {
      await page.evaluate(raw => { localStorage.clear(); localStorage.setItem('dipGameLab_v1', raw); }, raw);
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await titleReady(page); await sleep(700);
      return page.evaluate(() => ({ bring: window.__lab.save.bring && window.__lab.save.bring.id, url: location.search, toast: window.__toasts.slice(),
        stored: (JSON.parse(localStorage.getItem('dipGameLab_v1')).bring || {}).id || null, bk: localStorage.getItem('dipGameLab_v1.bringKey') }));
    };
    for (const [name, q, exp] of cases) {
      const r = await go(Q() + q);
      const al = exp ? C.cards[exp].album : '';
      const tOk = exp ? r.toast.includes(fill(SU.bringToast, { album: al })) : r.toast.includes(SU.bringMissing);
      const ok = (exp ? r.bring === exp && r.stored === exp && !!r.bk && r.bk.startsWith(exp + '@') : !r.bring && !r.stored) && !/[?&]card=/.test(r.url) && tOk;
      got.push(ok);
      if (!ok) record('P3-' + name, size, false, `收到 ${JSON.stringify(r.bring)}（要 ${JSON.stringify(exp)}）、存檔 ${JSON.stringify(r.stored)}、小鍵 ${JSON.stringify(r.bk)}、網址 ${r.url}、吐司 ${JSON.stringify(r.toast)}`);
    }
    record('P3-1', size, got.every(Boolean) && !errs(page).length, `?card= ${cases.length} 種寫法（" ' 中文 空白 +編碼 +沒編碼 %編碼 %沒編碼 & 大小寫 舊slug 不在卡池 王牌）全對 ${got.filter(Boolean).length}／${cases.length}；${errTxt(page)}`);
    // 主站那行產生的連結
    const mOk = [];
    for (const id of MAIN_CASES) {
      const c = C.cards[id], gid = mm.fn ? mm.fn(c.artist, c.album) : null;
      const url = mm.base + 'game-lab/?card=' + encodeURIComponent(gid) + '&debug=1&seed=20261106&fast=1';
      const r = await go(url);
      mOk.push(gid === id && r.bring === id);
      if (!(gid === id && r.bring === id)) note('P3-2', size, `${id}：主站 cardIdOf → ${JSON.stringify(gid)}、收到 ${JSON.stringify(r.bring)}`);
    }
    record('P3-2', size, !!mm.fn && mm.link && mOk.length === MAIN_CASES.length && mOk.every(Boolean),
      `主站 cardIdOf ${!!mm.fn}、「帶去店裡對決」那行 game-lab/?card=encodeURIComponent(_gameId) ${mm.link}；${MAIN_CASES.length} 張（" ' 中文 + % &）回到同一張 ${mOk.filter(Boolean).length}`);
  } finally { await ctx.close(); }
  // 唯讀（卡池 404）＋?card=
  const p2 = await fresh(w, h);
  try {
    await p2.page.route(/cards-pool\.js/, r => r.fulfill({ status: 404, body: '' }));
    const raw7 = JSON.stringify(BASE7({ shelf: { 'david bowie|low': { at: '20261105#1', seen: true, own: true, src: 'run' }, [ACE.pearl]: { at: '', seen: true, own: true, src: 'start' } } }));
    await seedLS(p2.page, raw7);
    await openTitle(p2.page, Q() + '&card=' + encodeURIComponent('sly & the family stone|fresh'));
    const r = await p2.page.evaluate(() => ({ url: location.search, bring: window.__lab.save.bring, toast: window.__toasts.slice(), raw: localStorage.getItem('dipGameLab_v1'), ro: (document.querySelector('.lb-foot.ro') || {}).textContent || '' }));
    const bad = r.toast.filter(t => /櫃檯等你|店裡沒有/.test(t));
    record('P3-3', size, !/card=/.test(r.url) && !r.bring && !bad.length && r.raw === raw7 && r.ro === SU.poolMissing,
      `唯讀（卡池 404）帶 ?card=：網址拿掉 ${!/card=/.test(r.url)}、不收 ${!r.bring}、不吐司收下 ${!bad.length}（${JSON.stringify(r.toast)}）、主鍵不變 ${r.raw === raw7}、唯讀行「${r.ro}」`);
  } finally { await p2.ctx.close(); }
}

// P4 一檔貨
async function P4(w, h, size) {
  const r0 = newRun({ seedKey: 'p4-' + size, runNo: 1, ace: 'pearl' });
  const { ctx, page } = await fresh(w, h, { watchStorage: true });
  try {
    await seedLS(page, BASE7({ run: r0, seen: { night: true, aceSwap: true, counterSell: true, unlockHint: true, lotHint: true } }));
    await openTitle(page, Q());
    const nn = await contNight(page);
    const s1 = await shelfNow(page), l1 = await lotNow(page);
    const counts = Object.keys(s1).map(k => s1[k].length), total = counts.reduce((a, b) => a + b, 0);
    const shape = Object.keys(s1).length === 16 && s1.feature.length === 2 && Object.keys(s1).filter(k => k !== 'feature').every(k => s1[k].length === 3);
    const inCur = Object.keys(s1).every(k => s1[k].every(id => (C.bins[k].pool || []).includes(id)));
    record('P4-1', size, nn && total === 47 && shape && inCur && l1.no === 1 && l1.src === 'cur',
      `第 1 位：架上 ${total} 張（每箱 3、FEATURE ${s1.feature && s1.feature.length}：${shape}）、全在策展池 ${inCur}、lot.no ${l1.no} src ${l1.src}`);
    // 買一張（爵士箱抽屜第一張）
    await page.evaluate(() => window.__lab.money(99999));
    const key = Object.keys(s1).find(k => k !== 'feature' && s1[k].length) || 'jazz';
    await page.evaluate(k => { window.DipLabEcon.openBin(k); }, key);
    await page.waitForSelector('.ec-drawer [data-a=buy]', { timeout: 10000 }).catch(() => {});
    await sleep(500);
    const id = await page.evaluate(() => { const d = window.DipLabEcon.debug(); return d.ids[d.idx]; });
    const bag0 = await page.evaluate(() => window.__lab.run.bag.length);
    await page.evaluate(() => { const b = document.querySelector('.ec-drawer [data-a=buy]'); if (b) b.click(); });
    await sleep(500);
    const b1 = await page.evaluate(id => ({ bag: window.__lab.run.bag.length, gone: window.__lab.run.shop.lot.gone.includes(id), onShelf: Object.values(window.__lab.run.shop.bins).flat().includes(id) }), id);
    await page.evaluate(() => window.DipLabEcon.close()); await sleep(600);
    record('P4-2', size, b1.bag === bag0 + 1 && b1.gone && !b1.onShelf, `買 ${id}（${key}）：包包 ${bag0}→${b1.bag}、進 gone ${b1.gone}、架上沒了 ${!b1.onShelf}`);
    // 打完第 1 位 → 第 2 位：那一箱換了；之後第 2–5 位都不上架
    const won = await winGuest(page);
    const s2 = await shelfNow(page), pos2 = await page.evaluate(() => window.__lab.run.pos), l2 = await lotNow(page);
    const changed = s1[key].every(x => !s2[key].includes(x));
    const seen = [Object.values(s2).flat().includes(id)];
    for (const p of [3, 4, 5]) {
      await page.evaluate(p => window.__lab.jump(p), p); await waitScreen(page, 'night'); await sleep(300);
      seen.push(await page.evaluate(id => Object.values(window.__lab.run.shop.bins).flat().includes(id), id));
    }
    const l5 = await lotNow(page);
    const keys0 = await page.evaluate(() => [...new Set(window.__lsKeys || [])]);
    record('P4-3', size, won && pos2 === 2 && changed && l2.gone.includes(id) && seen.every(x => !x) && l5.no === 1,
      `打完第 1 位 ${won} → 第 ${pos2} 位：${key} ${JSON.stringify(s1[key])} → ${JSON.stringify(s2[key])}（整箱換了 ${changed}）；第 2 位 gone 有它 ${l2.gone.includes(id)}；買走那張第 2–5 位上架 ${JSON.stringify(seen)}；第 5 位 lot.no ${l5.no}`);
    // 第 6 位（第 2 輪）：新的一檔、全卡池
    await page.evaluate(() => window.__lab.jump(6)); await waitScreen(page, 'night'); await sleep(500);
    const s6 = await shelfNow(page), l6 = await lotNow(page);
    const cur = new Set(Object.values(C.bins).flatMap(b => b.pool || []));
    const outside = Object.values(s6).flat().filter(x => !cur.has(x));
    record('P4-4', size, l6.no === 2 && l6.src === 'all' && outside.length > 0 && outside.every(x => !!C.cards[x]),
      `第 6 位：lot.no ${l6.no}、src ${l6.src}、架上策展池以外 ${outside.length} 張（例 ${outside[0]}）`);
    const reTitle = await reloadTitle(page);
    const nn2 = await contNight(page);
    const s6b = await shelfNow(page);
    const keys = [...new Set(keys0.concat(await page.evaluate(() => window.__lsKeys || [])))];
    const badKeys = keys.filter(k => !ALLOWED_LS.has(k));
    record('P4-5', size, reTitle && nn2 && sameJ(s6, s6b) && !badKeys.length && !errs(page).length,
      `重新整理 → 繼續：架子一樣 ${sameJ(s6, s6b)}；localStorage 鍵 ${JSON.stringify(keys)}（不該寫的 ${JSON.stringify(badKeys)}）；${errTxt(page)}`);
  } finally { await ctx.close(); }
}

// P5 lotHint、空箱兩種字
async function P5(w, h, size) {
  const r0 = newRun({ seedKey: 'p5-' + size, runNo: 1, ace: 'pearl' });
  const { ctx, page } = await fresh(w, h);
  try {
    await seedLS(page, BASE7({ run: r0 }));
    await openTitle(page, Q());
    await contNight(page);
    await sleep(3500);
    const t1 = (await toasts(page)).filter(t => t === SL.lotHint).length;
    await page.evaluate(() => window.__lab.jump(2)); await waitScreen(page, 'night');
    await page.waitForFunction(t => window.__toasts.includes(t), SL.lotHint, { timeout: 12000 }).catch(() => {});
    const seen2 = await page.evaluate(() => !!window.__lab.save.seen.lotHint);
    const t2 = (await toasts(page)).filter(t => t === SL.lotHint).length;
    await sleep(3000);
    await page.evaluate(() => window.__lab.jump(3)); await waitScreen(page, 'night'); await sleep(6000);
    const t3 = (await toasts(page)).filter(t => t === SL.lotHint).length;
    record('P5-1', size, t1 === 0 && t2 === 1 && seen2 && t3 === 1, `lotHint：第 1 位 ${t1} 次、第 2 位 ${t2} 次（seen ${seen2}）、第 3 位後累計 ${t3} 次`);
    // 空箱：這一位架上清空（檔裡還有）→ binEmpty；檔裡也沒了 → binEmptyLot
    const k = 'citypop';
    await page.evaluate(k => { window.__lab.run.shop.bins[k] = []; }, k);
    const e1 = await binText(page, k);
    await page.evaluate(k => { const r = window.__lab.run; r.shop.lot.gone.push(...r.shop.lot.bins[k]); r.shop.bins[k] = []; }, k);
    const e2 = await binText(page, k);
    record('P5-2', size, e1 === SH.binEmpty && e2 === SH.binEmptyLot && !errs(page).length, `空箱：檔裡還有「${e1}」／這一檔也沒了「${e2}」；${errTxt(page)}`);
  } finally { await ctx.close(); }
}

// P6 想要清單（Node 端同一支 engine 找 seed：第 1 檔擲中、在第 1 位架上，只中一張）
function findWantSeed() {
  const wl = C.bins.jazz.pool.slice(0, 3).concat(C.bins.rock.pool.slice(0, 3));
  for (let i = 0; i < 600; i++) {
    const r = newRun({ seedKey: 'w' + i, runNo: 1, ace: 'pearl', want: wl });
    const on = Object.values(r.shop.bins).flat().filter(id => r.shop.lot.want.includes(id));
    if (on.length === 1) { const key = Object.keys(r.shop.bins).find(k => r.shop.bins[k].includes(on[0])); return { r, wl, id: on[0], key }; }
  }
  return null;
}
async function P6(w, h, size) {
  const f = findWantSeed();
  if (!f) { record('P6-0', size, false, '600 個 seed 找不到第 1 位架上中一張的'); return; }
  const { ctx, page } = await fresh(w, h);
  try {
    await seedLS(page, BASE7({ run: f.r, want: f.wl, seen: { night: true, aceSwap: true, counterSell: true, unlockHint: true, lotHint: true } }));
    await openTitle(page, Q());
    await contNight(page);
    const msg = fill(SH.wantOnShelf, { album: C.cards[f.id].album, bin: C.bins[f.key].label + '（' + C.bins[f.key].zh + '）' });   // 店裡名牌英文＋中文（驗收）
    const shown = await page.waitForFunction(m => window.__toasts.includes(m), msg, { timeout: 15000 }).then(() => true, () => false);
    const n1 = await page.evaluate(() => ({ told: window.__lab.run.shop.lot.told.slice() }));
    record('P6-1', size, shown && n1.told.includes(f.id), `seed ${f.r.seedKey}：${f.id}（${f.key}）在第 1 位架上；吐司「${msg}」${shown}；lot.told ${JSON.stringify(n1.told)}`);
    await sleep(800);
    await page.evaluate(k => { window.DipLabEcon.openBin(k); }, f.key);
    await page.waitForSelector('.ec-drawer', { timeout: 8000 }).catch(() => {});
    await sleep(600);
    const i = await page.evaluate(id => window.DipLabEcon.debug().ids.indexOf(id), f.id);
    if (i >= 0) { await page.evaluate(i => { const t = document.querySelector('.ec-drawer .ec-th[data-i="' + i + '"]'); if (t) t.click(); }, i); await sleep(300); }
    const dr = await page.evaluate(() => ({ tag: (document.querySelector('.ec-drawer .ec-want') || {}).textContent || '', th: document.querySelectorAll('.ec-drawer .ec-th.ec-w').length }));
    await page.evaluate(() => window.DipLabEcon.close()); await sleep(500);
    record('P6-2', size, dr.tag === SH.wantTag && dr.th === 1, `抽屜：籤「${dr.tag}」、縮圖粉角 ${dr.th}`);
    await reloadTitle(page);
    await contNight(page); await sleep(6000);
    const t2 = (await toasts(page)).filter(t => t === msg).length;
    record('P6-3', size, t2 === 0 && !errs(page).length, `reload 後不再吐司（${t2} 次）；${errTxt(page)}`);
  } finally { await ctx.close(); }
}

// P7 今日推薦
const T12 = d => new Date(d + 'T12:00:00');
async function P7(w, h, size) {
  {
    const { ctx, page } = await fresh(w, h);
    try {
      await page.clock.setFixedTime(T12('2026-11-16'));
      await seedLS(page, BASE7());
      await openTitle(page, Q());
      await sleep(1600);
      const t1 = await chipText(page), sy = await says(page), d1 = await daily(page);
      record('P7-1', size, !!d1 && d1.day === '2026-11-16' && d1.stamps === 1 && !!d1.id && !d1.took && !C.cards[d1.id].tier && t1.startsWith(D7.title + '：《') && sy.includes(SL.dailyNew),
        `標題小籤「${t1}」；daily ${JSON.stringify(d1 && { day: d1.day, id: d1.id, stamps: d1.stamps })}；老闆 ${JSON.stringify(sy)}`);
      await jsClick(page, '.dl-chip button'); await sleep(900);
      const p1 = await page.evaluate(() => { const b = document.querySelector('.lb-sheet.float.booth .lb-daily'); return { open: !!b, take: !!(b && b.querySelector('[data-a=dtake]')), st: b ? b.querySelectorAll('.dl-st.on').length : -1, lbl: b ? (b.querySelector('.dl-n') || {}).textContent : '' }; });
      await jsClick(page, '.lb-daily [data-a=dtake]'); await sleep(700);
      const p2 = await page.evaluate(id => { const b = document.querySelector('.lb-daily'); return { st: b ? b.querySelectorAll('.dl-st.on').length : -1, shelf: window.__lab.save.shelf[id] || null }; }, d1.id);
      const d2 = await daily(page), tt = await toasts(page);
      record('P7-2', size, p1.open && p1.take && p1.st === 1 && p1.lbl === fill(D7.stamps, { n: 1 }) && p2.st === 2 && !!p2.shelf && p2.shelf.own && p2.shelf.src === 'daily' && d2.took && d2.stamps === 2 && tt.includes(D7.taken),
        `試聽機 ${JSON.stringify(p1)} → 收下：格子 ${p2.st}、唱片櫃 ${JSON.stringify(p2.shelf)}、stamps ${d2.stamps}、吐司 ${tt.includes(D7.taken)}`);
      await reloadTitle(page);
      const d3 = await daily(page), t2 = await chipText(page);
      await page.clock.setFixedTime(T12('2026-11-17')); await reloadTitle(page);
      const d4 = await daily(page), t3 = await chipText(page);
      await page.clock.setFixedTime(T12('2026-11-15')); await reloadTitle(page);
      const d5 = await daily(page), t4 = await chipText(page);
      record('P7-3', size, d3.id === d1.id && d3.took && t2 === fill(D7.stamps, { n: 2 }) + ' ▸' && d4.day === '2026-11-17' && d4.id && d4.id !== d1.id && !d4.took && d4.stamps === 2 && t3.startsWith(D7.title) &&
        d5.day === '2026-11-17' && d5.id === d4.id && t4 === '' && !errs(page).length,
        `同日 reload 不換 ${d3.id === d1.id}（小籤「${t2}」）；11-17 新的 ${d4.id !== d1.id}（「${t3}」）；撥回 11-15：day ${d5.day} 不換 ${d5.id === d4.id}、小籤「${t4}」；${errTxt(page)}`);
      await page.evaluate(k => { const d = JSON.parse(localStorage.getItem(k)); d.day = '2099-01-01'; localStorage.setItem(k, JSON.stringify(d)); }, DK);
      await page.clock.setFixedTime(T12('2026-11-18')); await reloadTitle(page);
      const d6 = await daily(page);
      await page.clock.setFixedTime(T12('2026-11-19'));
      await page.evaluate(() => { Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' }); document.dispatchEvent(new Event('visibilitychange'));
        Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'visible' }); document.dispatchEvent(new Event('visibilitychange')); });
      await sleep(900);
      const d7 = await daily(page), t5 = await chipText(page);
      record('P7-4', size, d6.day === '2026-11-18' && !!d6.id && !d6.took && d7.day === '2026-11-19' && d7.id !== d6.id && t5.startsWith(D7.title) && !errs(page).length,
        `day 2099 當壞值 → ${d6.day} 照發；跨午夜 visibilitychange → ${d7.day} 新的 ${d7.id !== d6.id}、小籤「${t5}」；${errTxt(page)}`);
    } finally { await ctx.close(); }
  }
  // 換獎勵：stamps 7
  {
    const { ctx, page } = await fresh(w, h);
    try {
      await page.clock.setFixedTime(T12('2026-11-16'));
      await seedLS(page, BASE7({ seen: Object.assign(BASE7().seen, { dailyHint: true }) }), { [DK]: JSON.stringify({ day: '2026-11-15', id: null, took: true, stamps: 7, claimed: 0, log: [] }) });
      await openTitle(page, Q());
      await jsClick(page, '.dl-chip button'); await sleep(900);
      const st = await page.evaluate(() => { const b = document.querySelector('.lb-daily'); return { claim: !!(b && b.querySelector('[data-a=dclaim]')), st: b ? b.querySelectorAll('.dl-st.on').length : -1 }; });
      await jsClick(page, '.lb-daily [data-a=dclaim]'); await sleep(700);
      const ids = await page.evaluate(() => [...document.querySelectorAll('.lb-sheet.dclaim [data-pick]')].map(b => b.getAttribute('data-pick')));
      const tops = ids.map(id => { const k = C.cards[id], m = Math.max(k.c, k.o, k.h); return ['c', 'o', 'h'].filter(a => k[a] === m); });
      const cov = ['c', 'o', 'h'].every(a => tops.some(t => t.includes(a)));
      const rar = ids.map(id => E.rarity(C.cards[id]));
      await page.evaluate(() => { const b = document.querySelector('.lb-sheet.dclaim [data-pick]'); if (b) b.click(); }); await sleep(700);
      const d = await daily(page), tt = await toasts(page);
      const own = await page.evaluate(id => ({ e: window.__lab.save.shelf[id] || null, seedable: window.__lab.seedable().includes(id) }), ids[0]);
      record('P7-5', size, st.claim && st.st === 7 && ids.length === 3 && new Set(ids).size === 3 && cov && rar.every(x => x === 'epic') &&
        d.stamps === 0 && d.claimed === 1 && !!own.e && own.e.own && own.e.src === 'daily' && own.seedable && tt.includes(D7.claimed) && !errs(page).length,
        `換獎勵鈕 ${st.claim}、格子 ${st.st}；三選一 ${JSON.stringify(ids)}（經冷硬各一 ${cov}、${rar.join('／')}）→ 挑第一張：stamps ${d.stamps} claimed ${d.claimed}、唱片櫃 ${JSON.stringify(own.e)}、挑種子列得到 ${own.seedable}；${errTxt(page)}`);
    } finally { await ctx.close(); }
  }
  // 唯讀不發、序章前不發
  for (const k of ['ro', 'pro']) {
    const { ctx, page } = await fresh(w, h);
    try {
      await page.clock.setFixedTime(T12('2026-11-16'));
      if (k === 'ro') await page.route(/cards-pool\.js/, r => r.fulfill({ status: 404, body: '' }));
      await seedLS(page, k === 'ro' ? BASE7() : BASE7({ prologueDone: false, runs: [] }));
      await openTitle(page, Q()); await sleep(600);
      const d = await daily(page), chip = await page.evaluate(() => !!document.querySelector('.dl-chip'));
      record('P7-6' + (k === 'ro' ? 'a' : 'b'), size, d === null && !chip, `${k === 'ro' ? '唯讀（卡池 404）' : '序章沒做完'}：daily 鍵 ${JSON.stringify(d)}、小籤 ${chip}`);
    } finally { await ctx.close(); }
  }
  // 兩個分頁：A 收下 → B（沒重新整理）再收；兩邊 stamps 7 → B 先開好換獎勵、A 換掉 → B 再挑
  {
    const { ctx, page: A } = await fresh(w, h);
    try {
      await ctx.clock.setFixedTime(T12('2026-11-16'));
      await seedLS(A, BASE7({ seen: Object.assign(BASE7().seen, { dailyHint: true }) }), { [DK]: JSON.stringify({ day: '2026-11-15', id: null, took: true, stamps: 6, claimed: 0, log: [] }) });
      await openTitle(A, Q());
      const B = await ctx.newPage(); B._errors = []; B.on('pageerror', e => B._errors.push('pageerror: ' + e.message));
      await openTitle(B, Q());
      for (const p of [A, B]) { await jsClick(p, '.dl-chip button'); await sleep(900); }
      await A.bringToFront(); await jsClick(A, '.lb-daily [data-a=dtake]'); await sleep(600);
      await B.bringToFront(); await jsClick(B, '.lb-daily [data-a=dtake]'); await sleep(600);
      const d1 = await daily(A);
      const take1 = d1.log.filter(x => x.k === 'take').length;
      // 都 7 格了：B 打開換獎勵（三張還在），A 先換掉；B 再挑 → 不換（先重讀）
      await A.bringToFront(); await jsClick(A, '.lb-daily [data-a=dclaim]'); await sleep(600);
      await B.bringToFront(); await jsClick(B, '.lb-daily [data-a=dclaim]'); await sleep(600);
      const bIds = await B.evaluate(() => [...document.querySelectorAll('.lb-sheet.dclaim [data-pick]')].map(b => b.getAttribute('data-pick')));
      await A.bringToFront(); await A.evaluate(() => { const b = document.querySelector('.lb-sheet.dclaim [data-pick]'); if (b) b.click(); }); await sleep(700);
      await B.bringToFront(); await B.evaluate(() => { const b = document.querySelectorAll('.lb-sheet.dclaim [data-pick]')[1]; if (b) b.click(); }); await sleep(700);
      const d2 = await daily(A);
      const claims = d2.log.filter(x => x.k === 'claim');
      const ownB = await B.evaluate(id => (window.__lab.save.shelf[id] || {}).own || false, bIds[1]);
      record('P7-7', size, d1.stamps === 7 && take1 === 1 && bIds.length === 3 && d2.stamps === 0 && d2.claimed === 1 && claims.length === 1 && !ownB && !errs(A).length && !B._errors.length,
        `兩個分頁：A 收下、B 再收 → stamps ${d1.stamps}（6＋1）、收下紀錄 ${take1} 筆；A 換獎勵、B（面板早就開著）再挑 → stamps ${d2.stamps}、claimed ${d2.claimed}、換獎勵紀錄 ${claims.length} 筆、B 那張沒變擁有 ${!ownB}`);
    } finally { await ctx.close(); }
  }
}

// P8 媒體延後
async function P8(w, h, size) {
  // 延 12 秒：標題照常 → 第 6 位（全卡池那一檔）的抽屜裡精選新卡先是名字卡 → 媒體到了封面補上
  {
    const r0 = newRun({ seedKey: 'p8-' + size, runNo: 1, ace: 'pearl' });
    E.jumpTo(r0, C, 6);
    const key = Object.keys(r0.shop.bins).find(k => r0.shop.bins[k].some(id => C.cards[id].pool && C.cards[id].coverUrl));
    const pid = key ? r0.shop.bins[key].find(id => C.cards[id].pool && C.cards[id].coverUrl) : null;
    const { ctx, page } = await fresh(w, h);
    try {
      await page.addInitScript(() => { window.__media = []; document.addEventListener('dip:media', e => window.__media.push(e.detail && e.detail.n)); });
      await page.route(/cards-media\.json/, async r => { await new Promise(z => setTimeout(z, 12000)); await r.continue(); });
      await seedLS(page, BASE7({ run: r0, seen: { night: true, aceSwap: true, counterSell: true, unlockHint: true, lotHint: true, lotAll: true } }));
      const ms = await openTitle(page, Q());
      await contNight(page);
      await page.evaluate(k => { window.DipLabEcon.openBin(k); }, key);
      await page.waitForSelector('.ec-drawer', { timeout: 8000 }).catch(() => {});
      await sleep(400);
      const i = await page.evaluate(id => window.DipLabEcon.debug().ids.indexOf(id), pid);
      if (i >= 0) await page.evaluate(i => { const t = document.querySelector('.ec-drawer .ec-th[data-i="' + i + '"]'); if (t) t.click(); }, i);
      await sleep(300);
      const cv = () => page.evaluate(() => { const c = document.querySelector('.ec-drawer .ec-cv'); return c ? { alt: (c.querySelector('.ec-alt') || {}).textContent || '', img: !!c.querySelector('img[src]'), ready: !!window.DipLabContent.mediaReady } : null; });
      const before = await cv();
      await page.waitForFunction(() => window.__media.length > 0, null, { timeout: 15000 }).catch(() => {});
      await sleep(600);
      const after = await cv();
      const mev = await page.evaluate(() => window.__media.slice());
      await page.evaluate(() => window.DipLabEcon.close());
      record('P8-1', size, !!pid && ms < 8000 && !!before && before.alt === C.cards[pid].album && !before.img && !before.ready && !!after && after.img && after.ready && mev.length === 1 && !errs(page).length,
        `延 12 秒：標題 ${ms} ms；${key} 抽屜《${pid && C.cards[pid].album}》到之前 ${JSON.stringify(before)} → dip:media ${JSON.stringify(mev)} 之後 ${JSON.stringify(after)}；${errTxt(page)}`);
    } finally { await ctx.close(); }
  }
  for (const mode of ['ok', '404', 'badv']) {
    const { ctx, page } = await fresh(w, h);
    try {
      await page.addInitScript(() => { window.__media = []; document.addEventListener('dip:media', e => window.__media.push(e.detail && e.detail.n)); });
      if (mode === '404') await page.route(/cards-media\.json/, r => r.fulfill({ status: 404, body: '' }));
      if (mode === 'badv') await page.route(/cards-media\.json/, r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ v: 'deadbeef', rows: [] }) }));
      await seedLS(page, BASE7());
      const ms = await openTitle(page, Q());
      const t0 = Date.now(); let st = null;
      while (Date.now() - t0 < (mode === 'ok' ? 8000 : 7500)) { st = await page.evaluate(() => ({ ready: !!window.DipLabContent.mediaReady, ev: window.__media.slice() })); if (st.ready) break; await sleep(300); }
      const reqs = page._requests.filter(u => /cards-media\.json/.test(u));
      const pv = await page.evaluate(() => window.DipLabContent.poolVersion);
      // 照玩：推門（安靜）→ 有一趟
      const sp = await startPlay(page), play = sp.run ? sp.s : 'no run';
      let ok;
      if (mode === 'ok') ok = st.ready && st.ev.length === 1 && st.ev[0] === POOLN && reqs.length === 1 && reqs[0].endsWith('cards-media.json?v=' + pv);
      else if (mode === '404') ok = !st.ready && !st.ev.length && reqs.length >= 2;    // 5 秒後重試一次
      else ok = !st.ready && !st.ev.length && reqs.length >= 1;
      record('P8-' + mode, size, ok && ms < 8000 && sp.run && !errs(page).length,
        `${mode}：標題 ${ms} ms；mediaReady ${st.ready}、dip:media ${JSON.stringify(st.ev)}、請求 ${reqs.length} 次 ${reqs[0] ? reqs[0].replace(/^.*\//, '') : ''}；推門後 ${play}；${errTxt(page)}`);
    } finally { await ctx.close(); }
  }
}
const POOLN = POOLC.length;

// P9 首屏
async function firstBytes(base) {
  const lab = base.replace(/\/+$/, '') + '/game-lab/';
  const html = await (await fetch(lab + 'index.html')).text();
  const files = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).concat([...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(m => m[1]));
  let gz = 0, raw = 0; const per = {};
  for (const f of files) {
    const b = Buffer.from(await (await fetch(new URL(f, lab).href)).arrayBuffer());
    const g = zlib.gzipSync(b, { level: 9 }).length; per[f.replace(/\?.*$/, '')] = g; gz += g; raw += b.length;
  }
  return { files: files.length, gz, raw, per };
}
async function loadTime(base, w, h) {
  const { ctx, page } = await newPage(browser, w, h);
  try {
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 562.5, downloadThroughput: (1.6 * 1024 * 1024 / 8) * 0.9, uploadThroughput: (750 * 1024 / 8) * 0.9 });   // Chrome DevTools「Fast 3G」
    const t0 = Date.now();
    await page.goto(base.replace(/\/+$/, '') + '/game-lab/index.html?seed=20261106', { waitUntil: 'commit', timeout: 120000 });
    await page.waitForSelector('[data-a=push],[data-a=cont]', { state: 'visible', timeout: 120000 });
    return Date.now() - t0;
  } catch (e) { return null; } finally { await ctx.close(); }
}
const med = a => { const s = a.filter(x => x != null).sort((x, y) => x - y); return s.length ? s[Math.floor((s.length - 1) / 2)] : null; };
async function P9(w, h, size) {
  const base = URL0.replace(/\/game-lab\/[^/]*$/, '');
  const fb = await firstBytes(base);
  const kb = fb.gz / 1024;
  record('P9-1', size, fb.files > 10,   // 店主 11-17「我從沒有限定檔案上限」：首屏大小只印參考（門檻那個數只是對照），不算失敗
    `首屏 ${fb.files} 檔 gzip -9 合計 ${kb.toFixed(1)} KB（參考 ${FIRST_KB}，不擋）；raw ${(fb.raw / 1024).toFixed(1)} KB；cards-pool.js ${((fb.per['cards-pool.js'] || 0) / 1024).toFixed(1)} KB gz`);
  if (size !== LOGIC_SIZE) return;
  const br = [], mn = [];
  for (let i = 0; i < P9_RUNS; i++) {
    br.push(await loadTime(base, w, h));
    if (MAIN_BASE) mn.push(await loadTime(MAIN_BASE, w, h));
  }
  const mb = MAIN_BASE ? await firstBytes(MAIN_BASE).catch(() => null) : null;
  const s = `Fast 3G 標題鈕可點：branch 中位 ${med(br)} ms ${JSON.stringify(br)}` + (MAIN_BASE ? `；main 中位 ${med(mn)} ms ${JSON.stringify(mn)}（main 首屏 ${mb ? (mb.gz / 1024).toFixed(1) : '?'} KB gz）；差 ${med(br) != null && med(mn) != null ? med(br) - med(mn) : '?'} ms` : '；沒給 LAB_MAIN_BASE，不量 main');
  record('P9-2', size, br.every(x => x != null), s + '（參考，不設門檻）');
  note('P9-2', size, s);
}

// P10 聆聽室（星圖）
async function enterHome(page) {
  await jsClick(page, '#top [data-a=taipei]');
  await waitScreen(page, 'taipei', 8000);
  await page.waitForFunction(() => !window.__lab.going() && window.__lab.stage.shopId === 'taipei', null, { timeout: 8000 }).catch(() => {});
  await sleep(450);
  await jsClick(page, '#top [data-a=home]');
  const ok = await page.waitForFunction(() => window.__lab.screen() === 'home' && !window.__lab.going() && window.__lab.stage.shopId === 'home', null, { timeout: 15000 }).then(() => true, () => false);
  await sleep(800);
  return ok;
}
const tuneOpen = page => page.waitForFunction(() => window.DipTune && window.DipTune.state.built && window.DipTune.state.visible && window.__lab.home.tune() && !document.getElementById('labTune').hidden, null, { timeout: 45000 }).then(() => true, () => false);
async function openConsole(page) { await jsClick(page, '#panel .lb-homebtns [data-a=console]'); const ok = await tuneOpen(page); await sleep(1000); return ok; }
const deckCard = page => page.evaluate(() => { const d = window.__lab.stage.clashState().deck; return d && d.rec ? d.rec.card : null; });
// 精選新卡（有封面、試聽）當擁有的
function ownedPool(n) { return POOLC.filter(id => C.cards[id].previewUrl && C.cards[id].coverUrl && !C.cards[id].tier).slice(0, n); }
async function P10(w, h, size) {
  const own = ownedPool(6);
  const shelf = Object.assign({}, BASE7().shelf); own.forEach(id => { shelf[id] = { at: '20261105#1', seen: true, own: true, src: 'daily' }; });
  const { ctx, page } = await fresh(w, h);
  try {
    await seedLS(page, BASE7({ shelf }));
    await openTitle(page, Q());
    await page.waitForFunction(() => !!window.DipLabContent.mediaReady, null, { timeout: 15000 }).catch(() => {});
    const home = await enterHome(page);
    // 1 挑不是你的精選新卡 → 想要清單
    let w1 = null, opened = false;
    for (let attempt = 0; attempt < 5; attempt++) {
      opened = await openConsole(page);
      if (!opened) break;
      w1 = await page.evaluate(async () => {
        if (window.DipTune.mine.on) document.querySelector('#labTune #tuneMineBtn').click();
        await new Promise(r => setTimeout(r, 500));
        const C = window.DipLabContent.cards, owned = new Set(window.__lab.home.owned());
        let pc = null;
        for (let k = 0; k < 40; k++) { window.DipTune.randomPick(); await new Promise(r => setTimeout(r, 700)); pc = window.DipTune.previewCard; if (pc && C[pc._gid] && C[pc._gid].pool && !owned.has(pc._gid)) break; }
        const b = document.querySelector('#labTune #tuneDraw'); if (b && !b.disabled) b.click();
        await new Promise(r => setTimeout(r, 1000));
        const last = window.__lab.home.last();
        return { last, pool: !!(last && C[last] && C[last].pool), owned: last ? owned.has(last) : null, want: window.__lab.home.want(), tune: window.__lab.home.tune(), album: last && C[last] ? C[last].album : '' };
      });
      if (w1.pool && w1.owned === false) break;
      if (w1.tune) await page.evaluate(() => document.querySelector('#labTune #tuneBack').click());
      await page.waitForFunction(() => !window.__lab.home.tune(), null, { timeout: 6000 }).catch(() => {});
      await sleep(600);
    }
    const tt = await toasts(page);
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('dipGameLab_v1')).want);
    record('P10-1', size, home && opened && !!w1 && w1.pool && w1.owned === false && w1.want.includes(w1.last) && saved.includes(w1.last) && w1.last.includes('|') && tt.includes(fill(SL.homeWant, { album: w1.album })),
      `你家 ${home}、星圖 ${opened}；挑到精選新卡 ${w1 && w1.last}（不是你的 ${w1 && w1.owned === false}）→ 想要清單 ${w1 && w1.want.includes(w1.last)}（存檔 ${saved.includes(w1 && w1.last)}）、吐司 ${w1 && tt.includes(fill(SL.homeWant, { album: w1.album }))}`);
    if (w1 && w1.tune) { await page.evaluate(() => document.querySelector('#labTune #tuneBack').click()); await page.waitForFunction(() => !window.__lab.home.tune(), null, { timeout: 6000 }).catch(() => {}); await sleep(600); }
    // 2 收藏亮、挑到擁有的 → 收回、放上唱盤
    let w2 = null;
    for (let attempt = 0; attempt < 5; attempt++) {
      if (!(await openConsole(page))) break;
      w2 = await page.evaluate(async () => {
        if (!window.DipTune.mine.on) document.querySelector('#labTune #tuneMineBtn').click();
        await new Promise(r => setTimeout(r, 600));
        window.DipTune.randomPick(); await new Promise(r => setTimeout(r, 1500));
        const b = document.querySelector('#labTune #tuneDraw'); if (b && !b.disabled) b.click();
        return { mine: window.DipTune.mine.on };
      });
      const closed = await page.waitForFunction(() => !window.__lab.home.tune() && document.getElementById('labTune').hidden, null, { timeout: 6000 }).then(() => true, () => false);
      await sleep(800);
      w2.last = await page.evaluate(() => window.__lab.home.last()); w2.closed = closed; w2.deck = await deckCard(page);
      if (closed && own.includes(w2.last)) break;
      if (!closed) { await page.evaluate(() => { const b = document.querySelector('#labTune #tuneBack'); if (b) b.click(); }); await sleep(800); }
    }
    record('P10-2', size, !!w2 && w2.mine && w2.closed && own.includes(w2.last) && w2.deck === w2.last && !errs(page).length,
      `收藏亮（${own.length} 張精選新卡）→ 挑到 ${w2 && w2.last}（是你的 ${w2 && own.includes(w2.last)}）→ 收回 ${w2 && w2.closed}、唱盤 ${w2 && w2.deck}；${errTxt(page)}`);
  } finally { await ctx.close(); }
}
async function P10b(w, h, size) {
  // 媒體載入器每次抓 20 秒就放棄（ui.js mediaLoad）：開控制台之前的請求一律 404（＝還沒到）；開控制台那一下重抓的那個請求扣住，
  //   等控制台照 15 秒逾時先開好、量過「還沒有封面」再放行（最晚抓了 19 秒放行，不撞 20 秒逾時）＝「媒體延 ~16–19 秒、控制台先開」
  const cand = POOLC.filter(id => C.cards[id].coverUrl && C.cards[id].previewUrl).slice(0, 30);
  const { ctx, page } = await fresh(w, h);
  try {
    await page.addInitScript(() => { window.__media = []; document.addEventListener('dip:media', e => window.__media.push(Date.now())); });
    let armed = false, held = 0, heldAt = 0, release = null;
    const gate = new Promise(r => { release = r; });
    await page.route(/cards-media\.json/, async r => {
      if (!armed) return r.fulfill({ status: 404, body: '' });
      held++; heldAt = Date.now();
      await Promise.race([gate, new Promise(z => setTimeout(z, 19000))]);
      await r.continue().catch(() => {});
    });
    await seedLS(page, BASE7());
    await openTitle(page, Q());
    await sleep(6000);                                     // 標題那次＋5 秒後重試都 404
    const home = await enterHome(page);
    armed = true;
    const tc = Date.now();
    await jsClick(page, '#panel .lb-homebtns [data-a=console]');
    const built = await tuneOpen(page);
    const tBuilt = Date.now() - tc;
    const probe = () => page.evaluate(ids => {
      const C = window.DipLabContent.cards;
      return ids.map(id => { const o = (window.DipTune.findCards(C[id].album) || []).find(x => x && x._gid === id); return o ? { id, cv: o.coverUrl || '', pv: o.previewUrl || '' } : { id, missing: true }; });
    }, cand);
    const before = await probe();
    const pre = { ready: await page.evaluate(() => !!window.DipLabContent.mediaReady), ev: await page.evaluate(() => window.__media.length), heldMs: heldAt ? Date.now() - heldAt : -1 };
    release();
    await page.waitForFunction(() => window.__media.length > 0, null, { timeout: 15000 }).catch(() => {});
    await sleep(800);
    const after = await probe();
    const pairs = before.map((b, i) => [b, after[i]]).filter(([b, a]) => !b.missing && !a.missing);
    const fixed = pairs.filter(([b, a]) => !b.cv && !b.pv && a.cv && a.pv);
    const one = fixed[0] && fixed[0][1];
    const play = one ? await page.evaluate(id => { try { const r = window.DipLabFx.music.play(window.DipLabContent.cards[id], { exclusive: true }); return r && typeof r.then === 'function' ? 'promise' : String(r); } catch (e) { return 'throw ' + e.message; } }, one.id) : null;
    await sleep(500);
    await page.evaluate(() => { const b = document.querySelector('#labTune #tuneBack'); if (b) b.click(); });
    record('P10b', size, home && built && tBuilt >= 13000 && held >= 1 && !pre.ready && pre.ev === 0 && pairs.length >= 10 && fixed.length >= 10 && play != null && !/^throw/.test(play) && !errs(page).length,
      `控制台 ${tBuilt} ms 才開（等媒體 15 秒逾時）、那時媒體 ${pre.ready}（扣住的請求 ${held} 個、已扣 ${pre.heldMs} ms）；星圖上 ${pairs.length} 張精選新卡，媒體到了同一個物件補上封面＋試聽 ${fixed.length} 張（例 ${one && one.id}）；試聽 ${play}${fixed.length ? '' : '；前 3 張 ' + JSON.stringify(pairs.slice(0, 3)).slice(0, 600)}；${errTxt(page)}`);
  } finally { await ctx.close(); }
}

// ---- 邏輯 fixture（390x664） --------------------------------------------------------------------------------------
async function P1b(w, h, size) {
  const gifted = new Set(Object.values(C.gifts).flat()), free = CORE.filter(id => !gifted.has(id) && REV[id]);
  const k1 = free[3], k2 = free[7], ace = ACE.hall;
  const v4 = toOld({ v: 4, seen: { night: true }, learned: { L1: true }, settings: { fastAnim: true, sound: false }, player: null,
    run: { v: 4, bag: [k1], order: ['copycat'], relics: [], stats: {}, ace: 'hall', times: ['22:00'] }, nights: [{ seedKey: '20261106', nightNo: 1, ace: 'hall', result: 'clear', reached: '02:00', wins: 6, taken: [ace, k1] }],
    best: { clears: 1, bySeedKey: { 20261106: 1 } }, shelf: { [ace]: { at: '20261106#1', seen: true }, [k1]: { at: '20261106#1', seen: true }, [k2]: { at: '20261106#1', seen: false } },
    relics: ['stylus'], unlocks: { secondNightTeaser: true }, tutorialDone: true, prologueDone: true, lastAce: 'hall', lastBargain: null });
  const raw = JSON.stringify(v4), oldN = slugHits(raw).length;
  const { ctx, page } = await fresh(w, h);
  try {
    await seedLS(page, raw);
    await openTitle(page, Q());
    const m = await page.evaluate(() => { const S = window.__lab.save; return { raw: localStorage.getItem('dipGameLab_v1'), v: S.v, keys: Object.keys(S.shelf).sort(), run: !!S.run, runs: S.runs.length, own: Object.keys(S.shelf).filter(k => S.shelf[k].own).sort() }; });
    const wantKeys = [...new Set([ace, k1, k2].concat(C.gifts.hall))].sort();
    record('P1b', size, oldN >= 3 && m.v === 8 && slugHits(m.raw).length === 0 && sameJ(m.keys, wantKeys) && !m.run && m.runs === 1 && m.own.includes(ace) && C.gifts.hall.every(g => m.own.includes(g)) && !m.own.includes(k1) && !errs(page).length,
      `v4（${oldN} 個舊 slug）→ v ${m.v}、剩舊 slug ${slugHits(m.raw).length}；唱片櫃 ${m.keys.length} 格＝那三格＋殿堂送的 ${sameJ(m.keys, wantKeys)}；擁有 ${m.own.length}；run 丟掉 ${!m.run}、nights→runs ${m.runs}；${errTxt(page)}`);
  } finally { await ctx.close(); }
}
const BASE6 = () => toOld(Object.assign(BASE7({ shelf: { 'david bowie|low': { at: '20261105#1', seen: true, own: true, src: 'run', ownAt: '20261105#1' }, [ACE.pearl]: { at: '', seen: true, own: true, src: 'start' } },
  want: ['daft punk|random access memories'] }), { v: 6 }));
async function P1c(w, h, size) {
  const raw = JSON.stringify(BASE6());
  const { ctx, page } = await fresh(w, h);
  try {
    await seedLS(page, raw);
    await page.addInitScript(() => {
      let eng = null;
      Object.defineProperty(window, 'DipLabEngine', { configurable: true, get() { return eng; }, set(v) { if (v) v.mapIds = function () { throw new Error('測試：mapIds 壞了'); }; eng = v; } });
    });
    await openTitle(page, Q());
    const t = await page.evaluate(() => ({ ro: [...document.querySelectorAll('.lb-foot.ro')].map(e => e.textContent).join('|'), pd: window.__lab.save.prologueDone, player: !!window.__lab.save.player, lastAce: window.__lab.save.lastAce,
      raw: localStorage.getItem('dipGameLab_v1'), bak: localStorage.getItem('dipGameLab_v1.bak6') }));
    const sp = await startPlay(page);
    const after = Object.assign(sp, await page.evaluate(() => ({ raw: localStorage.getItem('dipGameLab_v1'), ce: !!document.querySelector('.ce-root,#charEdit,.lb-charedit') })));
    const pe = errs(page).filter(e => !/mapIds 壞了/.test(e));
    record('P1c', size, t.ro === SU.migrateFail && t.pd && t.player && t.lastAce === 'pearl' && t.raw === raw && t.bak === raw && after.raw === raw && !after.ce && after.run && after.pro !== 'pending' && after.s !== 'title' && !pe.length,
      `唯讀行「${t.ro}」、人物 ${t.player}、序章做過 ${t.pd}；主鍵逐字不變 ${t.raw === raw}（推門後 ${after.raw === raw}）、bak6 原字串 ${t.bak === raw}；推門 → ${after.s}（run ${after.run}、prologue ${after.pro}、捏人 ${after.ce}）；錯誤 ${pe.length}`);
  } finally { await ctx.close(); }
}
async function P1d(w, h, size) {
  const s6 = BASE6();
  s6.shelf = { 'david-bowie-low': { at: '20261105#2', seen: false, own: true, src: 'run', ownAt: '20261105#2' }, 'david bowie|low': { at: '20261104#1', seen: true },
    'daft-punk-random-access-memories': { at: '20261103#1', seen: true }, [REV[ACE.pearl]]: { at: '', seen: true, own: true, src: 'start' } };
  s6.want = ['daft-punk-random-access-memories', 'daft punk|random access memories', '112|112'];
  const raw = JSON.stringify(s6);
  const dl = JSON.stringify({ day: '2026-11-15', id: '112|112', took: true, stamps: 2, claimed: 0, log: [{ day: '2026-11-15', id: '112|112', k: 'take' }] });
  const { ctx, page } = await fresh(w, h);
  try {
    await page.clock.setFixedTime(T12('2026-11-15'));   // daily 鍵那天＝今天：不發新的（只看遷移有沒有動它）
    await seedLS(page, raw, { [DK]: dl });
    await openTitle(page, Q());
    const r = await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('dipGameLab_v1')); return { v: s.v, low: s.shelf['david bowie|low'], dp: s.shelf['daft punk|random access memories'], d112: s.shelf['112|112'], want: s.want, keys: Object.keys(s.shelf).length,
      old: Object.keys(s.shelf).filter(k => k.indexOf('|') < 0), daily: localStorage.getItem('dipGameLab_v1.daily') }; });
    const ok = r.v === 8 && !!r.low && r.low.own && r.low.src === 'run' && r.low.at === '20261104#1' && r.low.seen === true && !!r.dp && !r.dp.own && !!r.d112 && r.d112.own && r.d112.src === 'daily' &&
      sameJ(r.want, ['daft punk|random access memories']) && r.keys === 4 && !r.old.length && r.daily === dl && !errs(page).length;
    record('P1d', size, ok, `Low 兩格合一 ${JSON.stringify(r.low)}；Daft Punk ${JSON.stringify(r.dp)}；daily log 補 112 ${JSON.stringify(r.d112)}；want ${JSON.stringify(r.want)}（兩種寫法合一、擁有了拿掉）；唱片櫃 ${r.keys} 格、舊鍵 ${r.old.length}；daily 鍵沒動 ${r.daily === dl}；${errTxt(page)}`);
  } finally { await ctx.close(); }
}
async function P1e(w, h, size) {
  // 待說情
  {
    const r = newRun({ seedKey: '20261107', runNo: 2, ace: 'hall' });
    E.jumpTo(r, C, 3);
    E.startFight(r, C, {});
    const eid = r.duelEnemy || r.duel.e.id;
    const R = E.makeRng(3), mem = {}; E.resolveTurn(r.duel, E.policies.thoughtful(r.duel, R, mem, C));
    r.duel.p.hp = 0; r.duel.over = { win: false, by: 'hp', pHp: 0, eHp: r.duel.e.hp };
    E.finishFight(r, C);
    const bins = clone(r.shop.bins), pend = clone(r.pending);
    const oldIds = E.oldDeckIds(r, C, LEGACY, eid, 3);   // 舊卡池（323 張、舊 slug）會選出的牌（驗收 F1：遷完說情重打＝這副）
    const v6 = toOld(BASE7({ run: r, shelf: { [ACE.hall]: { at: '', seen: true, own: true, src: 'start' } }, lastAce: 'hall' })); v6.v = 6; delete v6.run.shop.lot; delete v6.run.want;
    const { ctx, page } = await fresh(w, h);
    try {
      await seedLS(page, JSON.stringify(v6));
      await openTitle(page, Q());
      const a = await page.evaluate(() => { const R = window.__lab.run; return { v: window.__lab.save.v, pend: R && R.pending, pos: R && R.pos, bins: R && R.shop.bins, lot: !!(R && R.shop.lot), rd: R && R.retryDeck }; });
      await jsClick(page, '[data-a=cont]');
      const menu = await advanceUntil(page, () => !!document.querySelector('.lb-dq .lb-dqopt[data-i="0"]'), null, 25000);
      await sleep(400);
      await jsClick(page, '.lb-dq .lb-dqopt[data-i="0"]');
      const duel = await waitScreen(page, 'duel', 20000);
      await sleep(500);
      const b = await page.evaluate(() => { const R = window.__lab.run; return { eid: R.duelEnemy || (R.duel && R.duel.e.id), pos: R.pos, bins: R.shop.bins, deck: R.duel ? R.duel.e.deckIds.slice() : null }; });
      const pinOk = !!oldIds && !!a.rd && a.rd.pos === 3 && a.rd.id === eid && sameJ(a.rd.ids, oldIds) && !!b.deck && sameJ(b.deck.slice(0, oldIds.length), oldIds);
      record('P1e-1', size, pend.type === 'retry' && a.v === 8 && a.pend && a.pend.type === 'retry' && a.pos === 3 && sameJ(a.bins, bins) && a.lot && menu && duel && b.eid === eid && b.pos === 3 && sameJ(b.bins, bins) && pinOk && !errs(page).length,
        `v6 待說情 → v ${a.v}、pending ${a.pend && a.pend.type}、第 ${a.pos} 位、架子＝catalogId 版 ${sameJ(a.bins, bins)}、補一檔貨 ${a.lot}、釘舊牌單 ${!!a.rd}；繼續 → 說情選單 ${menu} → 重打 ${duel}：同一位 ${b.eid === eid}（${b.eid}）、第 ${b.pos} 位、同一批貨 ${sameJ(b.bins, bins)}、牌單＝舊卡池那副 ${pinOk}；${errTxt(page)}`);
    } finally { await ctx.close(); }
  }
  // 待領獎
  {
    const r = newRun({ seedKey: '20261108', runNo: 2, ace: 'hall' });
    E.jumpTo(r, C, 3);
    E.startFight(r, C, {});
    const R = E.makeRng(5), mem = {};
    for (let k = 0; k < 2 && !r.duel.over; k++) E.resolveTurn(r.duel, E.policies.thoughtful(r.duel, R, mem, C));
    r.duel.e.hp = 0; r.duel.over = { win: true, by: 'hp', pHp: r.duel.p.hp, eHp: 0 };
    E.finishFight(r, C);
    const pend = clone(r.pending);
    const v6 = toOld(BASE7({ run: r, shelf: { [ACE.hall]: { at: '', seen: true, own: true, src: 'start' } }, lastAce: 'hall' })); v6.v = 6; delete v6.run.shop.lot; delete v6.run.want;
    const { ctx, page } = await fresh(w, h);
    try {
      await seedLS(page, JSON.stringify(v6));
      await openTitle(page, Q());
      const a = await page.evaluate(() => { const R = window.__lab.run; return { pend: R && R.pending }; });
      await jsClick(page, '[data-a=cont]');
      const sheet = await page.waitForSelector('.lb-sheet.reward [data-pick]', { timeout: 20000 }).then(() => true, () => false);
      const pick = await page.evaluate(() => { const b = document.querySelector('.lb-sheet.reward [data-pick]'); return b ? b.getAttribute('data-pick') : null; });
      const night = await advanceUntil(page, () => { if (window.__lab.screen() === 'night') return true; const b = document.querySelector('.lb-sheet.reward [data-pick]') || document.querySelector('.lb-sheet [data-lv]'); if (b) b.click(); return false; }, null, 25000);
      const bag = await page.evaluate(() => window.__lab.run.bag.slice());
      record('P1e-2', size, pend.type === 'reward' && pend.cards.length > 0 && !!a.pend && a.pend.type === 'reward' && sameJ(a.pend.cards, pend.cards) && a.pend.cards.every(id => id.includes('|')) && sheet && night && (!pick || bag.includes(pick)) && !errs(page).length,
        `v6 待領獎 → 獎勵 ${JSON.stringify(a.pend && a.pend.cards)}（catalogId ${a.pend && sameJ(a.pend.cards, pend.cards)}）；繼續 → 挑 ${pick} → 來客 ${night}、進包包 ${!pick || bag.includes(pick)}；${errTxt(page)}`);
    } finally { await ctx.close(); }
  }
}
async function P1f(w, h, size) {
  const apex = [ACE.hall, ACE.pearl, ACE.heresy, RALLIZES, THRILLER];
  const r = newRun({ seedKey: '20261109', runNo: 2, ace: 'heresy', unlocked: ['heresy', 'hall', 'pearl'], start: 'heresy', apexOwned: apex, aceId: RALLIZES });
  r.acesWon = [THRILLER];
  E.jumpTo(r, C, 3);
  const shelf = {}; apex.forEach(id => { shelf[id] = { at: '20261105#1', seen: true, own: true, src: id === ACE.heresy ? 'start' : 'boss' }; });
  const v7 = BASE7({ run: r, shelf, lastAce: 'heresy', lastAceId: RALLIZES });
  const v6 = toOld(v7); v6.v = 6; delete v6.run.shop.lot; delete v6.run.want;
  const raw = JSON.stringify(v6), oldN = slugHits(raw).length;
  const { ctx, page } = await fresh(w, h);
  try {
    await seedLS(page, raw);
    await openTitle(page, Q('&fast=1&apex=1'));
    const a = await page.evaluate(() => { const S = window.__lab.save, R = S.run, E = window.DipLabEngine, C = window.DipLabContent;
      return { raw: localStorage.getItem('dipGameLab_v1'), v: S.v, apex: window.__lab.apex(), lastAceId: S.lastAceId, aceId: R && R.aceId, unlock: R && R.unlock && R.unlock.apex, won: R && R.acesWon, cur: R && E.apexAceId(R, C) }; });
    const nn = await contNight(page);
    await page.evaluate(() => window.__lab.jump(5)); await waitScreen(page, 'night'); await sleep(400);
    const b = await page.evaluate(() => { const E = window.DipLabEngine, C = window.DipLabContent, R = JSON.parse(JSON.stringify(window.__lab.run));
      E.startFight(R, C, {}); return { cls: E.classAt(R.pos), card: R.bossCard, tier: E.tierOfApex(C, R.bossCard), deck: R.duel.e.deckIds.includes(R.bossCard) }; });
    const ok = oldN > 0 && a.v === 8 && slugHits(a.raw).length === 0 && a.apex && a.lastAceId === RALLIZES && a.aceId === RALLIZES && a.cur === RALLIZES && sameJ([...(a.unlock || [])].sort(), [...apex].sort()) && sameJ(a.won, [THRILLER]) &&
      nn && b.cls === 'boss' && !!b.card && !!b.tier && b.deck && !errs(page).length;
    record('P1f', size, ok, `?apex=1 v6（${oldN} 個舊 slug）→ v ${a.v}、剩 ${slugHits(a.raw).length}；lastAceId ${a.lastAceId}、run.aceId ${a.aceId}（帶的 ${a.cur}）、unlock.apex ${JSON.stringify(a.unlock)}、acesWon ${JSON.stringify(a.won)}；來客 ${nn}；第 5 位藏家帶 ${b.card}（${b.tier}、在牌組 ${b.deck}）；${errTxt(page)}`);
  } finally { await ctx.close(); }
}
async function P1g(w, h, size) {
  const r = E.newRun(C, { seedKey: '20261110', runNo: 1, ace: 'hall', prologue: true, relics: [], want: [] });
  const shelf = {}; (C.gifts.hall || []).forEach(id => { shelf[id] = { at: '20261110#1', seen: false, own: true, src: 'gift' }; });
  shelf[ACE.hall] = { at: '20261110#1', seen: false, own: true, src: 'start' };
  const v6 = toOld(BASE7({ run: r, shelf, prologueDone: false, tutorialDone: false, runs: [], lastAce: 'hall', seen: {} })); v6.v = 6; delete v6.run.shop.lot; delete v6.run.want;
  const raw = JSON.stringify(v6);
  const { ctx, page } = await fresh(w, h);
  try {
    await seedLS(page, raw);
    await openTitle(page, Q());
    const a = await page.evaluate(() => { const R = window.__lab.run, E = window.DipLabEngine, C = window.DipLabContent;
      return { v: window.__lab.save.v, pro: R && R.prologue, can: R && E.canBargainPick(R), bargain: R && R.shop.bargain, ok: R && R.shop.bargain.every(id => !!C.cards[id]), lot: !!(R && R.shop.lot), lotOk: R && R.shop.lot ? E.lotOk(R, C) !== false : false }; });
    await jsClick(page, '[data-a=cont]');
    const toDuel = await prologueToDuel(page, 'direct');
    const picked = await page.evaluate(() => !!(window.__lab.run && window.__lab.run.shop.bargainPicked));
    await duelReady(page, 20000);
    await page.evaluate(() => window.DipLabDuel.autoplay('thoughtful'));
    const card = await advanceUntil(page, () => !!document.querySelector('#panel > .lb-sheet.one [data-i]'), null, 90000);
    await sleep(500);
    await jsClick(page, '#panel > .lb-sheet.one [data-i="0"]');
    const relic = await advanceUntil(page, () => !!document.querySelector('.lb-sheet.relics [data-r]'), null, 40000);
    await sleep(450);
    if (relic) await jsClick(page, '.lb-sheet.relics [data-r]');
    const night = await advanceUntil(page, () => window.__lab.screen() === 'night', null, 60000);
    const z = await page.evaluate(() => ({ pro: window.__lab.run && window.__lab.run.prologue, bag: window.__lab.run ? window.__lab.run.bag.length : 0, raw: localStorage.getItem('dipGameLab_v1') }));
    record('P1g', size, a.v === 8 && a.pro === 'pending' && a.can && a.ok && a.bargain.length === 6 && a.lot && toDuel && picked && card && relic && night && z.pro === 'done' && slugHits(z.raw).length === 0 && !errs(page).length,
      `v6 序章途中 → v ${a.v}、prologue ${a.pro}、能挑特價箱 ${a.can}（${a.bargain && a.bargain.length} 張都在卡池 ${a.ok}）、一檔貨 ${a.lot}；挑特價箱 ${picked} → 對決 ${toDuel} → 撿唱片 ${card} → 配件 ${relic} → 來客 ${night}（prologue ${z.pro}、包包 ${z.bag}）；${errTxt(page)}`);
  } finally { await ctx.close(); }
}
async function P2(w, h, size) {
  const r = E.newRun(C, { seedKey: '20261106', runNo: 3, ace: 'heresy', prologue: false }); E.choose(r, C, E.bargainPolicy(r, C)); E.jumpTo(r, C, 7); r.aceWon = true;
  delete r.want; if (r.shop) delete r.shop.lot;
  const known = C.enemies.copycat.deck[0];
  const s = { v: 5, seen: { night: true }, learned: {}, settings: { fastAnim: false, sound: false }, player: null, run: r,
    runs: [{ seedKey: '20261101', runNo: 1, ace: 'hall', result: 'dead', reached: 12, bestStreak: 11, taken: 9, wins: 11 }, { seedKey: '20261102', runNo: 2, ace: 'hall', result: 'dead', reached: 3, bestStreak: 2, taken: 7, wins: 2 }],
    runSeq: { 20261101: 1 }, best: { far: 12, checkpoints: [10], bestStreak: 11 }, shelf: { [known]: { at: '20261101#1', seen: true }, [ACE.hall]: { at: '20261101#1', seen: true } }, relics: [],
    tutorialDone: true, prologueDone: true, lastAce: 'heresy', lastBargain: null };
  const raw = JSON.stringify(toOld(s)), oldN = slugHits(raw).length;
  const boss1 = ACE[E.bossAceFor('20261101', 1, 'hall')], bossRun = ACE[r.bossAce];
  const { ctx, page } = await fresh(w, h);
  try {
    await seedLS(page, raw);
    await openTitle(page, Q());
    const m = await page.evaluate(() => ({ raw: localStorage.getItem('dipGameLab_v1'), v: window.__lab.save.v, shelf: window.__lab.save.shelf, cont: !!document.querySelector('[data-a=cont]') }));
    const own = (id, src) => !!(m.shelf[id] && m.shelf[id].own && (!src || m.shelf[id].src === src));
    const ok = oldN > 0 && m.v === 8 && slugHits(m.raw).length === 0 && m.cont && !!m.shelf[known] && !own(known) && C.gifts.hall.every(id => own(id, 'gift')) && C.gifts.heresy.every(id => own(id, 'gift')) &&
      own(boss1, 'boss') && own(bossRun, 'boss') && own(ACE.heresy) && Object.keys(m.shelf).every(k => k.includes('|')) && !errs(page).length;
    record('P2', size, ok, `v5（${oldN} 個舊 slug）→ v ${m.v}、剩 ${slugHits(m.raw).length}；認識 ${known} 沒擁有 ${!own(known)}；殿堂／異端送的 src gift ${C.gifts.hall.every(id => own(id, 'gift')) && C.gifts.heresy.every(id => own(id, 'gift'))}；` +
      `藏家王牌 ${boss1}／${bossRun} src boss ${own(boss1, 'boss') && own(bossRun, 'boss')}；lastAce 那派 ${own(ACE.heresy)}；鍵全是 catalogId ${Object.keys(m.shelf).every(k => k.includes('|'))}；${errTxt(page)}`);
  } finally { await ctx.close(); }
}
async function P11(w, h, size) {
  const r = newRun({ seedKey: 'p11', runNo: 1, ace: 'pearl' });
  E.jumpTo(r, C, 3);
  const shelf = Object.assign({}, BASE7().shelf);
  POOLC.filter(id => !C.cards[id].tier).slice(0, 3000).forEach(id => { shelf[id] = { at: '20261105#1', seen: true }; });
  const { ctx, page } = await fresh(w, h);
  try {
    await seedLS(page, BASE7({ run: r, shelf, seen: { night: true, aceSwap: true, counterSell: true, unlockHint: true, lotHint: true, lotAll: true } }));
    await openTitle(page, Q());
    await contNight(page); await sleep(2000);
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    const t = await page.evaluate(async () => {
      const go = [], per = [];
      for (let i = 0; i < 10; i++) { const a = performance.now(); window.__lab.go('night'); go.push(performance.now() - a); await new Promise(z => setTimeout(z, 250)); }
      const m0 = window.__lab.run.money;
      for (let i = 0; i < 10; i++) { const a = performance.now(); window.__lab.money(m0); per.push(performance.now() - a); await new Promise(z => setTimeout(z, 100)); }
      const md = a => a.slice().sort((x, y) => x - y)[Math.floor((a.length - 1) / 2)];
      return { go: Math.round(md(go) * 10) / 10, per: Math.round(md(per) * 10) / 10, known: Object.keys(window.__lab.save.shelf).length, kb: Math.round(localStorage.getItem('dipGameLab_v1').length / 1024) };
    });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    const s = `CPU 4×：來客畫面重畫 go('night') 中位 ${t.go} ms；唱片櫃 ${t.known} 格（存檔 ${t.kb} KB）persist() 中位 ${t.per} ms`;
    record('P11', size, t.known > 3000 && !errs(page).length, s + `（參考；>50 ms 回報主線）；${errTxt(page)}`);
    note('P11', size, s + (t.go > 50 || t.per > 50 ? '　⚠ 超過 50 ms：回報主線' : ''));
  } finally { await ctx.close(); }
}
async function P12(w, h, size) {
  const raw = JSON.stringify(BASE7({ shelf: { '108|songs of separation': { at: '20261105#1', seen: true, own: true, src: 'daily' }, 'david bowie|low': { at: '20261105#1', seen: true, own: true, src: 'run' },
    [ACE.pearl]: { at: '', seen: true, own: true, src: 'start' } }, want: ['112|112'] }));
  const { ctx, page } = await fresh(w, h);
  try {
    await page.route(/cards-pool\.js/, r => r.fulfill({ status: 404, body: '' }));
    await seedLS(page, raw);
    await openTitle(page, Q());
    const t = await page.evaluate(() => ({ ro: [...document.querySelectorAll('.lb-foot.ro')].map(e => e.textContent).join('|'), pl: window.DipLabContent.poolLoaded, n: Object.keys(window.DipLabContent.cards).length, raw: localStorage.getItem('dipGameLab_v1') }));
    const a = Object.assign(await startPlay(page), { raw: await lsMain(page) });
    record('P12', size, t.ro === SU.poolMissing && t.pl === false && t.n === CORE_N && t.raw === raw && a.raw === raw && a.run && a.s !== 'title' && !errs(page).length,
      `卡池 404：唯讀行「${t.ro}」、poolLoaded ${t.pl}、卡 ${t.n}；主鍵逐字不變 ${t.raw === raw}（推門後 ${a.raw === raw}）；推門 → ${a.s}（run ${a.run}）；${errTxt(page)}`);
  } finally { await ctx.close(); }
}
async function M2(w, h, size) {
  const LEG = CORE.find(id => E.rarity(C.cards[id]) === 'legendary'), EPIC = 'david bowie|low';
  const { ctx, page } = await fresh(w, h);
  try {
    const raw = JSON.stringify(BASE7());
    await openTitle(page, Q());
    const go = async q => {
      await page.evaluate(raw => { localStorage.clear(); localStorage.setItem('dipGameLab_v1', raw); }, raw);
      await page.goto(Q() + q, { waitUntil: 'domcontentloaded' });
      await titleReady(page); await sleep(700);
      return page.evaluate(() => ({ bring: window.__lab.save.bring && window.__lab.save.bring.id, url: location.search, toast: window.__toasts.slice(), stored: (JSON.parse(localStorage.getItem('dipGameLab_v1')).bring || {}).id || null }));
    };
    const a = await go('&card=' + encodeURIComponent(LEG));
    const b = await go('&card=' + encodeURIComponent(EPIC));
    const legMsg = fill(SU.bringLegend, { album: C.cards[LEG].album });
    // 存檔裡帶著傳奇（舊版收下的）→ 載入時丟掉、挑種子不排它
    await page.evaluate(([raw, id]) => { const s = JSON.parse(raw); s.bring = { id, at: 1 }; localStorage.clear(); localStorage.setItem('dipGameLab_v1', JSON.stringify(s)); }, [raw, LEG]);
    await page.goto(Q(), { waitUntil: 'domcontentloaded' }); await titleReady(page); await sleep(600);
    const c = await page.evaluate(() => ({ bring: window.__lab.save.bring }));
    record('M2', size, E.rarity(C.cards[LEG]) === 'legendary' && !a.bring && !a.stored && !/card=/.test(a.url) && a.toast.includes(legMsg) && !a.toast.includes(SU.bringMissing) &&
      E.rarity(C.cards[EPIC]) === 'epic' && b.bring === EPIC && b.stored === EPIC && c.bring === null && !errs(page).length,
      `?card=傳奇 ${LEG}：不收 ${!a.bring}、吐司「${a.toast.join('｜')}」（要「${legMsg}」）；?card=史詩 ${EPIC}：收下 ${b.bring === EPIC}；存檔帶傳奇 → 丟掉 ${c.bring === null}；${errTxt(page)}`);
  } finally { await ctx.close(); }
}

// P13 唱片櫃頁分批畫（驗收）：認識 1,001 張（擁有 201）→ 開頁兩面牆各先 120 張、標題數字照全部算；捲到底 → 兩面牆全到；
//   切「王牌」只重畫認識那面（我的收藏不動）；點封面照開唱片資訊
async function P13(w, h, size) {
  const ids = POOLC.slice(0, 1000), shelf = {};
  ids.forEach((id, i) => { shelf[id] = i < 200 ? { at: '20261105#1', seen: true, own: true, src: 'run', ownAt: '20261105#1' } : { at: '20261105#1', seen: true }; });
  shelf[ACE.pearl] = { at: '20261105#1', seen: true, own: true, src: 'start' };
  const nOwn = 201, nKnown = 1001;
  const { ctx, page } = await fresh(w, h);
  try {
    await seedLS(page, BASE7({ shelf }));
    await openTitle(page, Q());
    await page.evaluate(() => window.__lab.openPage('shelf'));
    await page.waitForSelector('.lb-page.shelf', { timeout: 5000 }).catch(() => {});
    await sleep(400);
    const cnt = () => page.evaluate(() => ({ own: document.querySelectorAll('.lb-wall.own .lb-cv').length, known: document.querySelectorAll('.lb-wall.known .lb-cv').length,
      more: document.querySelectorAll('.lb-wmore').length, h: ((document.querySelector('.lb-known .lb-h2') || {}).textContent || '').match(/(\d+)／/) }));
    const a = await cnt();
    for (let k = 0; k < 200; k++) {
      const done = await page.evaluate(() => { const b = document.querySelector('.lb-page .lb-scroll'); b.scrollTop = b.scrollHeight; return !document.querySelector('.lb-wmore'); });
      if (done) break;
      await sleep(80);
    }
    const b = await cnt();
    await jsClick(page, '.lb-page [data-f=ace]'); await sleep(250);
    const c = await cnt();
    await jsClick(page, '.lb-page [data-f=all]'); await sleep(250);
    await page.evaluate(() => { document.querySelector('.lb-page .lb-scroll').scrollTop = 0; });
    const info = await page.evaluate(() => { const cv = document.querySelector('.lb-wall.known .lb-cv[data-cid]'); if (!cv) return false; cv.click(); return true; }) && await page.waitForSelector('#cardInfoMask', { timeout: 2500 }).then(() => true, () => false);
    record('P13', size, a.own === 120 && a.known === 120 && !!a.h && +a.h[1] === nKnown && b.own === nOwn && b.known === nKnown && b.more === 0 && c.known === 1 && c.own === nOwn && info && !errs(page).length,
      `開頁 我的收藏 ${a.own}／認識過 ${a.known} 張（標題 ${a.h && a.h[1]}）→ 捲到底 ${b.own}／${b.known}（要 ${nOwn}／${nKnown}）→ 切王牌 認識 ${c.known}、收藏 ${c.own}；點封面開唱片資訊 ${info}；${errTxt(page)}`);
  } finally { await ctx.close(); }
}
// P14 對決複本的封面（驗收）：媒體 404 時開打（存檔裡他那副牌的精選新卡沒有封面）→ 重新整理、媒體正常 → 繼續打（真點出牌）→ 他出那幾張時畫封面、不是專輯名字卡
async function P14(w, h, size) {
  const r = newRun({ seedKey: '20261107', runNo: 2, ace: 'pearl' }); E.jumpTo(r, C, 4);
  const eid = r.order[r.idx], pool = E.guestDef(r, C, eid, r.pos).deck.filter(c => C.cards[c.id].pool).map(c => c.id);
  const albums = pool.map(id => C.cards[id].album);
  const { ctx, page } = await fresh(w, h);
  try {
    let block = true;
    await page.route(/cards-media\.json/, rt => block ? rt.fulfill({ status: 404, body: '' }) : rt.continue());
    await seedLS(page, BASE7({ run: r, seen: Object.assign(BASE7().seen, { lotHint: true, lotAll: true }) }));
    await openTitle(page, Q());
    await contNight(page); await sleep(500);
    await jsClick(page, '[data-a=go]');
    await waitScreen(page, 'duel', 20000); await duelReady(page, 20000); await sleep(500);
    const nul = await page.evaluate(ids => { const st = window.__lab.save.run.duel; return [].concat(st.e.pile || [], st.e.hand || []).filter(c => c && ids.includes(c.id) && !c.coverUrl).length; }, pool);
    block = false;
    await reloadTitle(page);
    const media = await page.waitForFunction(() => !!window.DipLabContent.mediaReady, null, { timeout: 20000 }).then(() => true, () => false);
    await jsClick(page, '[data-a=cont]');
    await waitScreen(page, 'duel', 25000); await duelReady(page, 20000); await sleep(600);
    await page.evaluate(() => { window.__cv = { noimg: [], img: [] }; new MutationObserver(ms => { for (const m of ms) for (const n of m.addedNodes) { if (n.nodeType !== 1) continue; for (const e of [n, ...n.querySelectorAll('*')]) { if (e.matches('.cv.noimg')) window.__cv.noimg.push(e.textContent); if (e.tagName === 'IMG' && e.classList.contains('cv')) window.__cv.img.push(e.alt); } } }).observe(document.body, { childList: true, subtree: true }); });
    let hands = 0;
    for (let k = 0; k < 8; k++) {
      if (await page.evaluate(() => { const d = window.__lab.save.run && window.__lab.save.run.duel; return !d || !!d.over; })) break;
      const t0 = Date.now(); let ok = false;
      while (Date.now() - t0 < 8000) { if (await page.$('[data-tut="card-0"]')) { ok = true; break; } await sleep(200); }
      if (!ok) break;
      await jsClick(page, '[data-tut="card-0"]'); await sleep(350);
      if (!(await jsClick(page, '[data-tut^="chip-0-"].top') || await jsClick(page, '[data-tut^="chip-0-"]'))) break;
      hands++; await sleep(2600);
    }
    const cv = await page.evaluate(() => window.__cv);
    const named = cv.noimg.filter(t => albums.includes(t)), shown = [...new Set(cv.img)].filter(a => albums.some(al => a.includes('《' + al + '》')));
    record('P14', size, pool.length > 0 && nul === pool.length && media && hands > 0 && shown.length > 0 && !named.length && !errs(page).length,
      `${eid} 的牌裡精選新卡 ${pool.length} 張、媒體 404 開打時沒封面 ${nul}；重新整理媒體到 ${media}；打 ${hands} 手：他出的精選新卡畫封面 ${shown.length}（${shown.join('、')}）、名字卡 ${named.length}；${errTxt(page)}`);
  } finally { await ctx.close(); }
}

// ---- 主程式 --------------------------------------------------------------------------------------------------
const SCREEN_T = [['P1', P1], ['P3', P3], ['P4', P4], ['P5', P5], ['P6', P6], ['P7', P7], ['P8', P8], ['P9', P9], ['P10', P10], ['P10b', P10b]];
const LOGIC_T = [['P1b', P1b], ['P1c', P1c], ['P1d', P1d], ['P1e', P1e], ['P1f', P1f], ['P1g', P1g], ['P2', P2], ['P11', P11], ['P12', P12], ['M2', M2], ['P13', P13], ['P14', P14]];
browser = await launch();
try {
  for (const [w, h] of SIZES) {
    const size = w + 'x' + h;
    const list = SCREEN_T.concat(size === LOGIC_SIZE ? LOGIC_T : []);
    for (const [id, fn] of list) {
      if (!want(id)) continue;
      const t0 = Date.now();
      try { await fn(w, h, size); } catch (e) { record(id, size, false, 'error ' + (e && e.stack ? e.stack.split('\n').slice(0, 3).join(' / ') : e)); }
      console.log(`      ${id} [${size}] ${((Date.now() - t0) / 1000).toFixed(0)} s`);
    }
  }
} finally { await browser.close(); }
const bad = results.filter(r => !r.ok);
if (notes.length) console.log('\nNOTE（參考數字）：\n' + notes.map(s => '  ' + s).join('\n'));
console.log(`\n${results.length - bad.length}/${results.length} PASS${bad.length ? '；FAIL：' + bad.map(r => r.n + ' ' + r.size).join('、') : ''}`);
process.exit(bad.length ? 1 : 0);
