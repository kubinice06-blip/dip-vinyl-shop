// game-lab/tests/e2e-career.mjs：第 D 波棒一「樂歷」端對端測試（scratchpad v5/wave-d SPEC-D §2、§3.1、§3.9、§10.2 C1–C10；build1/CONTRACT.md）。
//   需要靜態伺服器（repo 根目錄）：python3 -m http.server 8765
//   node game-lab/tests/e2e-career.mjs
//   環境變數（見 e2e-lib.mjs）：LAB_BASE／LAB_URL；LAB_SIZES（這支預設 390x664,375x548）；CAREER_ONLY＝只跑這幾項（例 1,3）；
//   CAREER_PREV＝「C 版頁面」的 git ref（第 7、8 項；預設 8e1731b9f＝第 C 波合併後的 main，?v=82、SAVE_V 8、只記 lexpBank）：
//     game-lab-c/ 底下的請求由這支直接用 `git show <ref>:game-lab/<檔>` 回應（跟 game-lab/ 同源＝localStorage 共用，才測得到退版／跨版）
//
// 數字照規格寫死（不從 content 讀，免得引擎跟資料一起錯也過）：一趟＝round((15×打過的位數＋8×最多連贏＋破紀錄 30＋路線) × (沒到第 10 位、帳號也還沒走到過、不是放棄 ? 2 : 1))、
//   路線＝min(min(演唱會, ⌊0.25×基本⌋)＋其他四項, ⌊0.40×基本⌋)；Lv n→n+1 要 100n（n<10）、之後 1,000（第 I 波 I-0：前 7 級改照表 100／150／250／350／500／650／800，見下 CURVE）；點數＝等級−1；戰力天賦第 k 級 6k 點、Lv8 開，備用說情 15 點 Lv20。
//
// 每個尺寸：
//   1  C1 開機入帳冪等＋存檔不升版：C 波 v8 存檔（沒有 career、lexpBank 有記帳、runs 兩趟記了 lexp）→ 標題吐司「你之前的樂歷我都記著呢。樂歷 +1170，升到 Lv 5。」、
//      career.xp＝1170（照總額截）、熟練度逐趟截、餘數給 lastAce、lexpBank 金額鍵歸零（runs 計數留著）、兩趟標 banked、Lv2–5 各抽一張（src lexp）、
//      過場卡 3 張（Lv2、Lv3、再升 2 級；最後一張有「去點天賦」）、存回去還是 v8、.bak8＝原字串；重新整理＝不再入帳、不再吐司、沒有過場卡；標題第二行「樂歷 Lv 5・下一個：Lv8 戰力天賦 ›」＋小圓點
//   2  C2 結算頁：輸掉 → 標題同一列「樂歷 +n ›」n＝careerGain＝規格公式＝runs[k].gain.total＝career.xp 增加的量；再畫一次結算不重記；375×548 不捲；
//      點開明細（走了幾位・最多連贏・破紀錄・還沒走到第 10 位 ×2）；「再挑戰一趟」→ 過場卡（Lv5＋抽到的盤＋去點天賦）→ 去點天賦＝樂歷頁、留在結算；
//      重新整理後 xp 不變、「看上一趟結算」數字一樣；再按「再挑戰一趟」沒有過場卡、照常開下一趟
//   2b 結算最擠的組合也不捲（375×548）：輸給誰＋翻盤＋中繼點開局＋兩個中繼點＋帶走一張；「這一趟的唱片都有了」（出那面牆）＋一個中繼點（＝e2e.spec #48 的狀態）
//   3  C3 樂歷頁（Lv6）：標題第二行點進去；頭「樂歷 Lv 6」「天賦點 5」、頂端「戰力天賦 Lv8 開…」；戰力四項＋稀有率灰（樂歷 Lv8 開）、備用說情（Lv20 開）、
//      之後開放四項沒有＋／－；開局錢、酬勞「（只多錢，不會變強）」；沒有關樂歷開關（Lv10 起）；每列 ≥44、＋／－ 44×44；真點＋開局錢 3 次 → 已滿、＋灰；
//      ＋酬勞、－開局錢、全部重配（吐司）→ 點數照算、存進存檔；Lv9：品味能點（6 點）、底氣點數不夠＋灰
//   4  C4 下一趟開局照天賦（Lv29：品味 1、聲望 1、備用說情、開局錢 1）：標題「推門」→ 挑種子 4 格（「最多帶 4 張」、點 5 張只收 4）→ 來客：
//      run.talent、品味 +1、聲望上限 +2、底氣不變、錢 +$500、run.plea 1、relicPick 3、goldAdd 0.01、種子 4 張＝送的全換掉（包包前 4 張＝種子）；來客條「說情剩 1・備用 1」
//   9  C9 備用說情（接 4 那一趟，第 1 位）：輸 → 新手保底（free、safety，不吃說情；C 波那顆「再來一次」）→ 輸 → 這一輪的說情（選單「再一場（這一輪只有一次）」）→ 輸 →
//      備用說情（pending.plea、老闆「這是你存的那次說情，用完就沒了。」、選單第一顆「再一場（用掉備用說情）」）→ run.plea 0 → 輸 → 結算；
//      另一份存檔（retryLeft 0、plea 1）來客條「說情剩 0・備用 1」
//   5  C5 關掉樂歷（Lv12）：樂歷頁開關（Lv10 起才有）→ 存檔 off、標題第一行「樂歷關」→ 推門：種子回 3 格（「最多帶 3 張」）、沒有 talent／relicPick／goldAdd、
//      品味＝新帳號 → 打完 runs[k].off＝1、樂歷照拿、明細「這一趟關樂歷（樂歷照拿）」→ 重新整理：最遠旁「關樂歷」
//   6  C6 標題兩行（最長那組：有一趟在打＋關樂歷＋最遠是關樂歷那趟＋有沒點的點數；6b 再加 ?apex=1 跳過序章那顆鈕）：整個標題不捲、第二行在畫面裡、≥44 高、
//      ≤600px 高是短版「樂歷 Lv 12 ›」、其他是「樂歷 Lv 12・下一個：Lv15 …」；真點第二行＝樂歷頁；唱片櫃頁頭「樂歷」也進得去；Lv1 的帳號沒有第二行
//      （規格 C6 的「試煉最遠」是棒三）；6c（棒二）再加 ?fac=1：兩個旗標章（>600px 高兩顆不重疊、≤600px 合成一顆「流派＋頂點卡試做」），章在面板上緣以上
//   7  C7 退版：D 存檔（career、天賦開的 run）用 C 版頁面載入 → 不唯讀、照玩、輸掉 → 存回去還是 v8、career 原封不動、lexpBank 有新記帳、runs[k] 有 lexp 沒 gain →
//      回 D 版：吐司「上次的樂歷補記給你。樂歷 +n。」、xp 只加這一次、只有那一趟標 banked、lexpBank 歸零
//   8  C8 跨版那一趟：C 版頁面開的 run（記了路線 home 30）→ D 版載入（建 career、寫 .bak8、lexpBank 全 0＝不入帳）→ 打完：runs[k].gain＝規格公式（路線截在 ⌊0.4×基本⌋、cut 記差額）、
//      lexpBank 沒動、career.xp 只加一次；重新整理不再加
//   10 C10 演唱會買票面板：「每張樂歷 +20・這一趟還能算 3 張（越往後走越多）」（n＝gigRoom＝⌊(⌊0.25×基本⌋−已算)/20⌋）；已算到上限 →「這一趟的演唱會樂歷已到上限，買票只算聽歌」
//   11 新手第一次挑派（SPEC-D §3.9、§14-1 B）：序章猜錯（猜異端那張）→ 挑王牌面板預設停冷門流、冷門「新手推薦」、經典「前期較難」、異端不標、名號「經典流・經 7」；
//      猜對（今晚是經典那張）→ 停在經典流（標照出）；不是第一次挑（點老闆換）沒有標
//   12 放棄那一趟（棒一審查）：標題連按兩下「重新推門」→ runs 那筆 abandon、第 1 位 0 場＝樂歷 0；第 4 位還沒打＝只算打過的 3 位、沒有新手 ×2（gain.quit 1）
//      （第 I 波 I-0：種一趟之前的紀錄＝不是新帳號第一趟）
//   第 I 波 I-0（scratchpad v5/wave-i SPEC-I §7.2、§7.3、§7.5、§7.7；build0/CONTRACT.md）。樂歷曲線照新表（前 7 級 100／150／250／350／500／650／800）：
//   13 第一趟保底：新帳號（runs 空）第一趟第 1 位就輸 → 樂歷 +100（＝升到 Lv2）、runs[k].gain.first、明細最後一行「第一趟：樂歷保底到 Lv2」、「再挑戰一趟」→ Lv2 那張；
//      13b 第一趟走很遠（一次升兩級以上）→ 一張清單卡「樂歷 Lv n！」＋「天賦點 +k」＋抽到的 k 張縮圖（「抽到 k 張，收進唱片櫃」）＋去點天賦
//   14 攤位頂列樂歷細條（不快轉）：第一次畫（重新整理後的 run）只畫不閃「樂歷 這一趟 至少 +n」＋Lv 1＋進度條（n＝現在放棄也拿得到的：站著的這一位還沒打不算；I-0 審查）；
//      推進到跨一級 → 金色「樂歷 Lv 2！這一趟結束就能點天賦」、
//      停 ≥3 秒（3 秒內點不收、之後點了收回原本那行）、沒有另跳老闆泡泡、career.xp 不動（只顯示）；攤位的列都在畫面裡、不捲
//   15 升級章（不快轉、autoNext 關＝真玩家）：第 1 位打贏 →「升級！Lv2」章停在盤面上（≥3 秒、畫面還是對決）→ 點了 → 戰利品列 → 升級面板「升到 Lv2：挑一項，這一趟都有效」、
//      沒有「聲望上限 +1（自動）」、三格 品味→底氣→聲望上限、老闆說一次「打贏就會升級…」（save.seen.lv1）；挑品味 → 聲望上限不變；第 2 位打贏（2/5 經驗）沒有章。
//      I-0 審查：戰利品列等到老闆第一次那句（firstLoot；375 寬是吐司）出來再過 1 秒才按「不收」→ 升級面板那句等吐司、泡泡都收掉才說（說的那一刻沒有吐司、沒有 firstLoot 泡泡）
//   16 曲線改了補級：棒一帳號 xp 2,000（舊曲線 Lv6、drawn 2–6）→ 開機吐司「樂歷算法改了，補你 1 級。」、Lv7 補抽一張（drawn 有 7）、過場卡 Lv7；
//      重新整理不再吐司、沒有卡；樂歷頁 Lv7、天賦點 6、階梯只有做好的格（沒有「之後開放」）；
//      16b（I-0 審查）同一次開機又入帳又補級：xp 250（舊 Lv2、新 Lv3、drawn [2]）＋lexpBank 50 → 兩個吐司、Lv3 補抽（drawn [2,3]）、xp 300；重新整理不再補
//   17 升級面板三格固定（§7.1、§7.7）：兩個種子、Lv1→3 與 Lv6→8 各連升兩級（forceWin）→ 每次面板 品味→底氣→聲望上限＝pending.offer、標題「升到 Lv n」、
//      升到 Lv2 那次沒有「聲望上限 +1（自動）」；挑了聲望上限之後第二次順序不變（?fac=1 第 4 格本派：e2e-fac F3／F8；選秀：e2e-checkpoint #1、e2e-fac F8）
//   18 新帳號真的走第一趟（不種存檔、快轉）：序章那場真的打贏＝沒有章、沒有升級面板、runs 空 → 第 1 位真的打贏：章（對決畫面）→ 戰利品列 → 升級面板（Lv2、三格固定、
//      沒有自動 +1、老闆第一次那句、seen.lv1）→ 挑品味聲望上限不變 → 第 2–5 位 → 第一個攤位頂列細條金色「樂歷 Lv 2！」、沒有另跳泡泡、xp 還是 0 → 第 6 位輸：gain＝規格（新手 ×2、沒有保底那筆）
//   19 老存檔（runs 有一趟、seen 沒有 lv1）第 1 位打贏升級：面板照出、老闆不說第一次那句、seen.lv1 不記（I-0 審查）
//   CAREER_SHOTS＝截圖資料夾（dpr 2；給店主：第 1 位打完的升級章、第一趟結算升級、樂歷頁）
//   每項最後看主控台 0 錯誤。任何 FAIL → exit 1。
import path from 'path';
import { execFileSync } from 'child_process';
import { launch, newPage, SIZES as SIZES0, record, results, sleep, Q, URL0, SEED, jsClick, tapAt, waitScreen, noScroll, scrollOk, openTitle, seedRun,
  answerBargain, watchSay, tapReady, duelReady, passLoot, clearStall, prologueToDuel } from './e2e-lib.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const REPO = path.resolve(HERE, '../..');
const SIZES = process.env.LAB_SIZES ? SIZES0 : [[390, 664], [375, 548]];
const ONLY = (process.env.CAREER_ONLY || '').split(',').filter(Boolean).map(Number);
const want = n => !ONLY.length || ONLY.includes(n);
const PREV = process.env.CAREER_PREV || '8e1731b9f1f3a3924568ac5c8703b20bcdafef24';
const C = (page, f, a) => page.evaluate(f, a);
const fill = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (o[k] != null ? o[k] : m));
const errs = page => (page._errors || []).filter(e => !/favicon/.test(e));
const errTx = page => `錯誤 ${errs(page).length}${errs(page).length ? '：' + errs(page).slice(0, 2).join(' / ') : ''}`;
const J = x => JSON.stringify(x);
const XP2 = 1340;                                                                       // #2 的起點（新曲線 Lv5；Lv6 要 1,350）
const SHOTS = process.env.CAREER_SHOTS || '';
async function shot(page, size, name) { if (SHOTS) { try { await page.screenshot({ path: path.join(SHOTS, `${size}-${name}.png`) }); } catch (_) {} } }
const RUN0 = { seedKey: '20261101', runNo: 1, ace: 'hall', result: 'dead', reached: 1, bestStreak: 0, taken: 0, wins: 0, level: 1, checkpoints: [] };   // 「之前打過一趟」

// ---- 規格公式（SPEC-D §2.1、§2.2、§2.6；寫死） ----
const capped = L => { const B = L.base | 0, v = k => L[k] | 0; return { base: B, route: Math.min(Math.min(v('gig'), Math.floor(0.25 * B)) + v('home') + v('promo') + v('packet') + v('demo'), Math.floor(0.40 * B)) }; };
// 第 I 波 I-0（SPEC-I §7.3 c）：前 7 級照表 100／150／250／350／500／650／800（累計 Lv2 100、Lv5 850、Lv7 2,000、Lv8 2,800 不變），之後照舊 100n（n<10）、1,000
const CURVE = [100, 150, 250, 350, 500, 650, 800];
const needOf = lv => lv <= CURVE.length ? CURVE[lv - 1] : lv < 10 ? 100 * lv : 1000;
const levelOf = xp => { let lv = 1; for (;;) { const need = needOf(lv); if (xp < need) return lv; xp -= need; lv++; } };
const xpAt = lv => { let s = 0; for (let n = 1; n < lv; n++) s += needOf(n); return s; };
// 一趟：ent＝runs[k]（reached、bestStreak、from、lexp）、best＝開局前的最遠；o.quit＝放棄（沒有 ×2）、o.open＝放棄時站著那一位沒打完（少算那一位）
//   新手 ×2 只給「這一趟沒到第 10 位、帳號也還沒走到過第 10 位（best < 10）、不是放棄」的那一趟（棒一審查：放棄／故意輸在第 9 位刷樂歷）
function gainSpec(ent, best, o = {}) {
  const from = ent.from > 1 ? ent.from : 1, reached = ent.reached | 0;
  const base = 15 * Math.max(0, reached - from + 1 - (o.open ? 1 : 0)) + 8 * (ent.bestStreak | 0);
  const record = best > 0 && reached > best ? 30 : 0;
  const route = capped(Object.assign({}, ent.lexp || {}, { base })).route;
  const mul = reached < 10 && best < 10 && !o.quit ? 2 : 1;
  return { base, record, route, mul, total: Math.round((base + record + route) * mul) };
}

// ---- C 版頁面（CAREER_PREV 的 game-lab，路徑 game-lab-c/）----
const D_DIR = new URL('.', URL0), C_DIR = new URL('../game-lab-c/', D_DIR);
const QC = (extra = '&fast=1') => `${C_DIR.href}index.html?debug=1&seed=${SEED}${extra}`;
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8' };
const prevCache = new Map();
function prevFile(p) {
  if (prevCache.has(p)) return prevCache.get(p);
  let b = null;
  try { b = execFileSync('git', ['-C', REPO, 'show', PREV + ':game-lab/' + p], { maxBuffer: 512 << 20, stdio: ['ignore', 'pipe', 'ignore'] }); } catch (_) { b = null; }
  prevCache.set(p, b); return b;
}
async function servePrev(ctx) {
  await ctx.route(u => u.origin === C_DIR.origin && u.pathname.startsWith(C_DIR.pathname), async route => {
    const p = decodeURIComponent(new URL(route.request().url()).pathname.slice(C_DIR.pathname.length)) || 'index.html';
    const b = p.includes('..') ? null : prevFile(p);
    if (!b) return route.fulfill({ status: 404, body: '' });
    return route.fulfill({ status: 200, contentType: MIME[path.extname(p).toLowerCase()] || 'application/octet-stream', body: b });
  });
}

// ---- 共用 ----
// 吐司：頁面一載入就記（開機入帳的吐司在第一個畫面就出）
async function watchToasts(page) {
  await page.addInitScript(() => {
    window.__toasts = [];
    const start = () => new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.classList && n.classList.contains('lb-toast')) window.__toasts.push(n.textContent); })))
      .observe(document.documentElement, { childList: true, subtree: true });
    if (document.documentElement) start(); else document.addEventListener('DOMContentLoaded', start);
  });
}
const toasts = page => C(page, () => (window.__toasts || []).slice());
const CU = page => C(page, () => { const Cn = window.DipLabContent; return Object.assign({}, Cn.career.ui, { aceTitle: Object.assign({}, Cn.aceTitle), aceNewbie: Object.assign({}, Cn.aceNewbie || {}), best: Cn.summary.best,
  retryMenu: Cn.trial.ui.retryMenu.slice(), retryPlea: Cn.lines.owner.retryPlea, pickSub: Cn.seeds.ui.pickSub, gigPer: Cn.waveC.stall.gig.lexp }); });
const stored = page => C(page, () => JSON.parse(localStorage.getItem('dipGameLab_v1') || 'null'));
// 一份 v8 存檔（D 版形狀）：o.career（null＝沒有這個鍵＝C 波存檔）、o.run（{ace, idx, talent:true＝照 career 的 talentArgs 開, set:{…}}；沒給＝沒有進行中的）、
//   o.runs、o.best、o.lexpBank、o.lastAce、o.own（再收 n 張能當種子的，src run）。這派預設那張（start）、送的（gift）算擁有
async function seedCareer(page, o) {
  await page.evaluate(o => {
    const E = window.DipLabEngine, Cn = window.DipLabContent;
    const career = o.career === null ? null : Object.assign({ key: 'e2e-career', xp: 0, spent: {}, off: false, prof: { hall: 0, pearl: 0, heresy: 0 }, tree: { hall: {}, pearl: {}, heresy: {} }, drawn: [], banked: true, lastGain: null }, o.career || {});
    // 第 I 波 I-0：沒指定 drawn＝到現在這一級都抽過（新曲線；不然開機會跑「樂歷算法改了，補你 n 級」那段，#16 另測）
    if (career && !(o.career && 'drawn' in o.career)) { const lv = E.careerLevel(Cn, career.xp).level; career.drawn = []; for (let n = 2; n <= lv; n++) career.drawn.push(n); }
    let r = null;
    const ace = (o.run && o.run.ace) || o.lastAce || 'hall';
    if (o.run) {
      const ro = Object.assign({ seedKey: o.run.seedKey || '20261106', runNo: 1, ace, prologue: false, relics: [] }, o.run.talent && career && E.talentArgs ? E.talentArgs(Cn, career) : {});
      r = E.newRun(Cn, ro);
      r.tut = false; r.farBefore = (o.best && o.best.far) | 0;
      const ch = E.bargainPolicy(r, Cn); if (ch) E.choose(r, Cn, ch);
      if (o.run.idx != null) { r.idx = o.run.idx; r.pos = (r.round - 1) * 5 + o.run.idx + 1; }
      Object.assign(r, o.run.set || {});
    }
    const s = { v: 8, seen: { night: true, unlockHint: true, aceSwap: true }, learned: {}, settings: { fastAnim: false, sound: false, autoNext: true }, player: null, run: r, runs: o.runs || [],
      best: o.best || { far: 0, checkpoints: [], bestStreak: 0 }, shelf: {}, relics: [], tutorialDone: true, prologueDone: true, lastAce: o.lastAce || ace, lastBargain: null };
    if (career) s.career = career;
    if (o.lexpBank) s.lexpBank = o.lexpBank;
    s.shelf[Cn.aces[ace]] = { at: 'e2e#1', seen: true, own: true, src: 'start' };
    (Cn.gifts[ace] || []).forEach(id => { s.shelf[id] = { at: 'e2e#1', seen: true, own: true, src: 'gift' }; });
    if (o.own) Object.keys(Cn.cards).filter(id => E.canSeed(Cn, id) && !Cn.cards[id].tier && !(Cn.gifts[ace] || []).includes(id)).slice(0, o.own).forEach(id => { s.shelf[id] = { at: 'e2e#1', seen: true, own: true, src: 'run' }; });
    if (r) r.bag.forEach(id => { if (!s.shelf[id]) s.shelf[id] = { at: 'e2e#1', seen: false }; });
    localStorage.setItem('dipGameLab_v1', JSON.stringify(s));
  }, o);
}
// 等對決能操作（畫面 duel、有一場還沒打完、沒在換畫面）
async function waitDuel(page, ms = 25000) {
  const ok = await page.waitForFunction(() => window.__lab && window.__lab.screen() === 'duel' && window.__lab.rawDuel() && !window.__lab.rawDuel().over && !window.__lab.going(), null, { timeout: ms }).then(() => true, () => false);
  await sleep(450); return ok;
}
// 點 ▼ 往下走，直到對決／選單／結算；記下對白框出現過的字
async function advance(page, ms = 30000) {
  const t0 = Date.now(), said = [];
  while (Date.now() - t0 < ms) {
    const s = await C(page, () => ({ scr: window.__lab.screen(), duel: !!(window.__lab.rawDuel() && !window.__lab.rawDuel().over), going: window.__lab.going(),
      menu: [...document.querySelectorAll('.lb-dq.hasmenu .lb-dqopt')].map(b => b.textContent), nx: !!document.querySelector('.lb-dq .nx.on'), tx: (document.querySelector('.lb-dq .tx') || {}).textContent || '' }));
    if (s.tx && !said.includes(s.tx)) said.push(s.tx);
    if (s.scr === 'end') return { at: 'end', said };
    if (s.scr === 'duel' && s.duel && !s.going) { await sleep(450); return { at: 'duel', said }; }
    if (s.menu.length) { await sleep(400); return { at: 'menu', said, menu: s.menu.map(t => t.replace(/^▸/, '').trim()) }; }
    if (s.nx) await jsClick(page, '.lb-dq');
    await sleep(180);
  }
  return { at: 'timeout', said };
}
// 這一場輸掉：當下（finishFight 是同步的）記 pending、說情次數
const loseNow = page => C(page, () => { window.__lab.forceLose(); const r = window.__lab.run; return { p: r.pending ? JSON.parse(JSON.stringify(r.pending)) : null, retryLeft: r.retryLeft, plea: r.plea, over: r.over || null }; });
// 一路輸到結算（說情選單選「到這裡就好」；新手保底只有一顆就點它）
async function loseToEnd(page, ms = 60000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    const a = await advance(page, Math.max(1000, ms - (Date.now() - t0)));
    if (a.at === 'end') { await sleep(1200); return true; }
    if (a.at === 'duel') { await loseNow(page); await sleep(300); continue; }
    if (a.at === 'menu') { await jsClick(page, `.lb-dq .lb-dqopt[data-i="${a.menu.length > 1 ? 1 : 0}"]`); await sleep(400); continue; }   // 新手保底只有一顆「再來一次」
    return false;
  }
  return false;
}
// 來客畫面（「下一位」那顆）準備好
const nightReady = (page, ms = 25000) => page.waitForFunction(() => window.__lab && window.__lab.screen() === 'night' && !!document.querySelector('.lb-night [data-a=go]') && !window.__lab.going(), null, { timeout: ms }).then(() => true, () => false);
// 標題「推門」／結算「再挑戰一趟」之後走到來客畫面：挑種子（onSeeds 處理）、過場卡點掉、特價箱照點、對白往下
async function driveToNight(page, onSeeds, ms = 45000) {
  const t0 = Date.now(); let seeds = null, cards = 0;
  while (Date.now() - t0 < ms) {
    if (await C(page, () => window.__lab.screen() === 'night' && !!document.querySelector('.lb-night [data-a=go]'))) { await sleep(500); return { ok: true, seeds, cards }; }
    if (await page.$('.lb-sheet.cxcard')) { cards++; await jsClick(page, '.lb-sheet.cxcard .lb-btn[data-a=next]'); await sleep(350); continue; }
    if (!seeds && await page.$('.lb-sheet.seeds .lb-ct')) { await sleep(450); seeds = onSeeds ? await onSeeds(page) : true; if (await page.$('.lb-sheet.seeds [data-a=none]')) { /* onSeeds 沒關＝先不挑 */ if (!onSeeds) await jsClick(page, '.lb-sheet.seeds [data-a=none]'); } await sleep(300); continue; }
    if (await answerBargain(page)) { await sleep(300); continue; }
    if (await page.$('.lb-dq .nx.on.choice')) await jsClick(page, '.lb-dq');
    await sleep(200);
  }
  return { ok: false, seeds, cards };
}
// 挑種子面板：記下「最多帶 n 張」那行、點 5 張（只會收 max 張）、就這樣開始
async function pickSeeds(page) {
  const st = await C(page, () => { const s = document.querySelector('.lb-sheet.seeds'); return { sub: (s.querySelector('.sdn') || {}).textContent || '', tiles: s.querySelectorAll('.lb-ct').length }; });
  await C(page, () => [...document.querySelectorAll('.lb-sheet.seeds [data-pick]')].slice(0, 5).forEach(b => b.click()));
  await sleep(250);
  st.picked = await C(page, () => document.querySelectorAll('.lb-sheet.seeds .lb-ct.sel').length);
  await jsClick(page, '.lb-sheet.seeds [data-a=ok]');
  return st;
}
// 新帳號的開局數字（引擎什麼都不給＝現況）
const base0 = (page, ace) => C(page, a => { const r = window.DipLabEngine.newRun(window.DipLabContent, { seedKey: 'e2e-base', runNo: 1, ace: a }); return { atk: r.atk, def: r.def, maxHp: r.maxHp, hp: r.hp, money: r.money }; }, ace);
const ownSeedable = (page, n, ace) => C(page, ([n, a]) => { const E = window.DipLabEngine, Cn = window.DipLabContent;
  const ids = Object.keys(Cn.cards).filter(id => E.canSeed(Cn, id) && !Cn.cards[id].tier && !(Cn.gifts[a] || []).includes(id) && !window.__lab.save.shelf[id]).slice(0, n); window.__lab.own(ids, 'run'); return ids; }, [n, ace]);

async function runSize(browser, w, h) {
  const size = `${w}x${h}`;

  // ---------------------------------------------------------------- 1 C1 開機入帳冪等＋存檔不升版
  if (want(1)) {
    const { ctx, page } = await newPage(browser, w, h); await watchToasts(page);
    try {
      await openTitle(page, Q());
      const runs = [{ seedKey: '20261104', runNo: 1, ace: 'hall', result: 'dead', reached: 25, bestStreak: 9, taken: 3, wins: 24, level: 6, checkpoints: [10, 20], lexp: { base: 447, gig: 200, home: 30 } },
        { seedKey: '20261105', runNo: 1, ace: 'pearl', result: 'dead', reached: 26, bestStreak: 9, taken: 3, wins: 25, level: 6, checkpoints: [10, 20], lexp: { base: 453, gig: 100, packet: 15 } }];
      const LB = { base: 900, gig: 300, home: 30, promo: 0, packet: 15, demo: 0, runs: 2 };
      await seedCareer(page, { career: null, run: { ace: 'pearl', idx: 2 }, runs, best: { far: 26, checkpoints: [10, 20], bestStreak: 9 }, lexpBank: LB, lastAce: 'pearl' });
      const raw0 = await C(page, () => localStorage.getItem('dipGameLab_v1'));
      await openTitle(page, Q()); await sleep(1900);
      const x = await CU(page);
      // 規格：總額＝900＋min(min(300,225)＋30＋15, 360)＝1170；熟練 hall＝447＋min(min(200,111)＋30,178)＝588、pearl＝453＋115＝568＋餘數 14＝582
      const tot = capped(LB), total = tot.base + tot.route, r1 = capped(runs[0].lexp), r2 = capped(runs[1].lexp);
      const prof = { hall: r1.base + r1.route, pearl: r2.base + r2.route + (total - (r1.base + r1.route) - (r2.base + r2.route)), heresy: 0 };
      const toLv = levelOf(total);
      const d = await C(page, () => { const S = window.__lab.save; return { xp: S.career.xp, prof: S.career.prof, banked: S.career.banked, drawn: S.career.drawn.slice(), lb: S.lexpBank, runsB: S.runs.map(x => x.banked || 0),
        lexpCards: Object.keys(S.shelf).filter(id => S.shelf[id].own && S.shelf[id].src === 'lexp').length, bak8: localStorage.getItem('dipGameLab_v1.bak8'), v: JSON.parse(localStorage.getItem('dipGameLab_v1')).v,
        storedXp: JSON.parse(localStorage.getItem('dipGameLab_v1')).career.xp }; });
      const t1 = await toasts(page);
      // 過場卡：一張一張點，記每張的標題、張數標、最後一張的鈕（第 I 波 I-0：一次升兩級以上合成一張清單卡「樂歷 Lv 5！」）
      const cards = [];
      for (let i = 0; i < 6 && await page.waitForSelector('.lb-sheet.cxcard', { timeout: i ? 1500 : 4000 }).then(() => true, () => false); i++) {
        cards.push(await C(page, () => { const s = document.querySelector('.lb-sheet.cxcard'); return { hd: (s.querySelector('.cx-hd b') || {}).textContent || '', n: (s.querySelector('.cx-n') || {}).textContent || '', got: !!s.querySelector('.cx-got'),
          talent: !!s.querySelector('[data-a=talent]'), inView: (() => { const b = s.querySelector('.lb-btn[data-a=next]').getBoundingClientRect(); return b.top >= 0 && b.bottom <= innerHeight && b.height >= 44; })() }; }));
        await jsClick(page, '.lb-sheet.cxcard .lb-btn[data-a=next]'); await sleep(450);
      }
      await sleep(500);
      const line = await C(page, () => { const b = document.querySelector('.lb-foot.cxline button'); return b ? { t: b.innerText.trim(), dot: !!b.querySelector('.cx-dot') } : null; });
      const lineWant = h > 600 ? fill(x.line, { n: toLv, m: 8, name: x.ladder.power }) : fill(x.lineShort, { n: toLv });
      // 重新整理：不再入帳
      await openTitle(page, Q()); await sleep(2200);
      const t2 = await toasts(page);
      const d2 = await C(page, () => ({ xp: window.__lab.save.career.xp, card: !!document.querySelector('.lb-sheet.cxcard'), lb: window.__lab.save.lexpBank, v: JSON.parse(localStorage.getItem('dipGameLab_v1')).v }));
      const zero = L => ['base', 'gig', 'home', 'promo', 'packet', 'demo'].every(k => L[k] === 0) && L.runs === 2;
      const ok = t1.includes(fill(x.depositFirst, { n: total, to: toLv })) && d.xp === total && d.storedXp === total && J(d.prof) === J(prof) && d.banked === true && zero(d.lb) && J(d.runsB) === '[1,1]' &&
        J(d.drawn) === J([2, 3, 4, 5].filter(n => n <= toLv)) && d.lexpCards === 4 && d.v === 8 && d.bak8 === raw0 &&
        cards.length === 1 && cards[0].hd === fill(x.lvList, { n: toLv }) && cards[0].n === '' && cards[0].got && cards[0].inView && cards[0].talent && line && line.t === lineWant && line.dot &&
        !t2.some(t => t === fill(x.depositFirst, { n: total, to: toLv }) || t.startsWith(fill(x.depositMore, { n: '' }).slice(0, 8))) && d2.xp === total && !d2.card && zero(d2.lb) && d2.v === 8;
      record(1, size, ok && !errs(page).length, `入帳 ${J(Object.assign({}, d, { bak8: d.bak8 === raw0 }))}（要 xp ${total}、Lv${toLv}、熟練 ${J(prof)}）；吐司 ${J(t1)}；過場卡 ${J(cards)}；第二行 ${J(line)}（要「${lineWant}」）；重新整理 ${J(d2)} 吐司 ${J(t2)}；${errTx(page)}`);
    } catch (e) { record(1, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 2 C2 結算頁
  if (want(2)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await openTitle(page, Q());
      await seedCareer(page, { career: { xp: XP2 }, run: { ace: 'hall', idx: 3 }, runs: [{ seedKey: '20261101', runNo: 1, ace: 'hall', result: 'dead', reached: 2, bestStreak: 1, taken: 0, wins: 1, level: 1, checkpoints: [] }],
        best: { far: 2, checkpoints: [], bestStreak: 1 } });
      await openTitle(page, Q()); await jsClick(page, '[data-a=cont]');
      await nightReady(page);
      const x = await CU(page);
      await C(page, () => { window.__lab.run.farBefore = 2; window.__lab.loseNext(1, { noRetry: true }); });
      await jsClick(page, '[data-a=go]');
      await waitDuel(page);
      const ended = await loseToEnd(page);
      await sleep(600);
      const e0 = await C(page, () => { const S = window.__lab.save, r = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent, s = document.querySelector('.lb-screen.end .lb-scroll'), b = document.querySelector('.lb-cxp'), br = b && b.getBoundingClientRect();
        return { cxp: b ? b.querySelector('.t').textContent : null, bar: !!(b && b.querySelector('.cx-bar')), sh: s.scrollHeight, ch: s.clientHeight, btn: br && { top: Math.round(br.top), bottom: Math.round(br.bottom), h: Math.round(br.height) },
          xp: S.career.xp, ent: S.runs[S.runs.length - 1], eng: E.careerGain(Cn, E.runSummary(r), { best: r.farBefore | 0, tier: r.tier | 0 }).total, drawn: S.career.drawn.slice() }; });
      const sc = await noScroll(page);
      const spec = gainSpec(e0.ent, 2);
      // 再畫一次結算：不重記
      await C(page, () => window.__lab.go('end')); await sleep(900);
      const e1 = await C(page, () => ({ xp: window.__lab.save.career.xp, runs: window.__lab.save.runs.length, cxp: (document.querySelector('.lb-cxp .t') || {}).textContent }));
      // 明細
      await jsClick(page, '[data-a=cxp]'); await sleep(500);
      const m = await C(page, () => { const g = document.querySelector('.lb-modal .cx-gain'); return g ? { h1: g.querySelector('.lb-h1').textContent, li: [...g.querySelectorAll('.cx-parts li')].map(x => x.textContent), page: !!g.querySelector('[data-a=cxpage]') } : null; });
      await jsClick(page, '.lb-modal [data-x]'); await sleep(400);
      const from = e0.ent.from > 1 ? e0.ent.from : 1;
      const nPos = e0.ent.reached - from + 1;
      const liWant = [fill(x.partPos, { k: nPos, n: 15 * nPos })].concat(e0.ent.bestStreak > 0 ? [fill(x.partStreak, { k: e0.ent.bestStreak, n: 8 * e0.ent.bestStreak })] : []).concat(spec.record ? [fill(x.partRecord, { n: spec.record })] : [])
        .concat(spec.route ? [fill(x.partRoute, { n: spec.route })] : []).concat([fill(x.partLow, { n: 10, m: 2 })]);
      // 再挑戰一趟 → 過場卡（xp 1340＋這一趟 ≥1350＝Lv6；第 I 波 I-0 新曲線）→ 去點天賦
      await jsClick(page, '[data-a=again]');
      const up = await page.waitForSelector('.lb-sheet.cxcard', { timeout: 4000 }).then(() => true, () => false);
      await sleep(400);
      const k0 = await C(page, () => { const s = document.querySelector('.lb-sheet.cxcard'); return s ? { hd: (s.querySelector('.cx-hd b') || {}).textContent, got: (s.querySelector('.cx-got b') || {}).textContent || '', cv: s.querySelectorAll('.cx-got .lb-cv').length,
        talent: (s.querySelector('[data-a=talent]') || {}).textContent || null, n: (s.querySelector('.cx-n') || {}).textContent || '' } : null; });
      await jsClick(page, '.lb-sheet.cxcard [data-a=talent]'); await sleep(900);
      const k1 = await C(page, () => ({ page: !!document.querySelector('.lb-page .cx-page'), scr: window.__lab.screen(), card: !!document.querySelector('.lb-sheet.cxcard'), shelfLexp: Object.keys(window.__lab.save.shelf).filter(id => window.__lab.save.shelf[id].src === 'lexp') }));
      await jsClick(page, '.lb-page [data-a=close]'); await sleep(600);
      const scr2 = await C(page, () => window.__lab.screen());
      // 重新整理：xp 不變；「看上一趟結算」數字一樣
      await openTitle(page, Q());
      const e2 = await C(page, () => ({ xp: window.__lab.save.career.xp, end: !!document.querySelector('[data-a=end]') }));
      await jsClick(page, '[data-a=end]'); await waitScreen(page, 'end'); await sleep(900);
      const e3 = await C(page, () => ({ xp: window.__lab.save.career.xp, cxp: (document.querySelector('.lb-cxp .t') || {}).textContent }));
      // 最擠的組合（輸給誰＋翻盤一行＋中繼點＋帶走一張）：375×548 也不捲（版面專用，數字不看）
      await C(page, () => { const r = window.__lab.run; r.lastLoss = { eHp: 2, eMax: 25, flip: { k: 3, kind: 'countered', p: 'c', e: 'h' }, at: r.stats.lostAt && r.stats.lostAt.enemyId }; r.checkpoints = [10, 20]; r.cpFrom = 10; window.__lab.go('end'); });
      await sleep(1200);
      const endBox = () => C(page, () => { const s = document.querySelector('.lb-screen.end .lb-scroll'); return { sh: s.scrollHeight, ch: s.clientHeight, xp: window.__lab.save.career.xp, close: !!document.querySelector('.lb-endhero .close'), cps: !!document.querySelector('.lb-cps'),
        keep: !!document.querySelector('.lb-keep'), wall: !!document.querySelector('.lb-screen.end .lb-wall'), hero: Math.round(document.querySelector('.lb-endhero').getBoundingClientRect().height) }; });
      const worst = await endBox();
      const scW = await noScroll(page);
      // 換成「這一趟的唱片都有了」（沒有帶走一張那顆鈕，改出這一趟那面牆）＋一個中繼點（不是中繼點開局）＝e2e.spec #48 的狀態（C 版 375×548 剛好 319/319 不捲）。
      //   中繼點開局＋兩個中繼點（那行折成兩行）＋那面牆 C 版就溢出 10px，不在這裡判
      await C(page, () => { const r = window.__lab.run; delete r.cpFrom; r.checkpoints = [10]; window.__lab.own(window.__lab.keepIds(), 'run'); window.__lab.go('end'); }); await sleep(1000);
      const worst2 = await endBox();
      const scW2 = await noScroll(page);
      // 再挑戰一趟：過場卡已經演過（重新整理後也不會再演），照常開下一趟
      await jsClick(page, '[data-a=again]'); await sleep(2200);
      const after = await C(page, () => ({ card: !!document.querySelector('.lb-sheet.cxcard'), scr: window.__lab.screen() }));
      const total = e0.ent.gain && e0.ent.gain.total;
      const ok = ended && e0.cxp === fill(x.endLine, { n: spec.total }) && e0.bar && total === spec.total && e0.eng === spec.total && e0.xp === XP2 + spec.total && e0.sh - e0.ch <= 1 && scrollOk(sc) &&
        e0.btn && e0.btn.top >= 0 && e0.btn.bottom <= h && e0.btn.h >= 44 && e0.drawn.includes(6) && levelOf(e0.xp) === 6 &&
        e1.xp === e0.xp && e1.cxp === e0.cxp && m && m.h1 === fill(x.gainTitle, { n: spec.total }) && J(m.li) === J(liWant) && m.page &&
        up && k0 && k0.hd === fill(x.lvUp, { n: 6 }) && k0.got === x.drawGot && k0.cv === 1 && k0.talent === x.goTalent && k0.n === '' && k1.page && k1.scr === 'end' && !k1.card && k1.shelfLexp.length === 1 &&
        scr2 === 'end' && e2.xp === e0.xp && e2.end && e3.xp === e0.xp && e3.cxp === e0.cxp && !after.card && after.scr !== 'end';
      const okW = worst.sh - worst.ch <= 1 && worst.xp === e0.xp && worst.close && worst.cps && worst.keep && scrollOk(scW) && worst2.sh - worst2.ch <= 1 && worst2.xp === e0.xp && worst2.close && worst2.cps && !worst2.keep && worst2.wall && scrollOk(scW2);
      record(2, size, ok && !errs(page).length, `結算「${e0.cxp}」gain ${J(e0.ent.gain)} 引擎 ${e0.eng}、規格 ${J(spec)}、xp ${XP2}→${e0.xp}、捲 ${e0.sh}/${e0.ch} ${J(sc)}、鈕 ${J(e0.btn)}；再畫 ${J(e1)}；明細 ${J(m)}（要 ${J(liWant)}）；` +
        `過場卡 ${up} ${J(k0)} → 去點天賦 ${J(k1)} → 關頁 ${scr2}；重新整理 ${J(e2)} → 看上一趟 ${J(e3)}；再一趟 ${J(after)}；${errTx(page)}`);
      record('2b', size, okW, `結算最擠（輸給誰＋翻盤＋中繼點）＋帶走一張 ${J(worst)} ${J(scW)}；＋都有了（那面牆）${J(worst2)} ${J(scW2)}`);
    } catch (e) { record(2, size, false, 'error ' + e.message); record('2b', size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 3 C3 樂歷頁
  if (want(3)) {
    const { ctx, page } = await newPage(browser, w, h); await watchToasts(page);
    try {
      await openTitle(page, Q());
      await seedCareer(page, { career: { xp: 2000 }, runs: [{ seedKey: '20261101', runNo: 1, ace: 'hall', result: 'dead', reached: 12, bestStreak: 4, taken: 1, wins: 11, level: 3, checkpoints: [10] }], best: { far: 12, checkpoints: [10], bestStreak: 4 } });
      await openTitle(page, Q()); await sleep(600);
      const x = await CU(page);
      await tapAt(page, '.lb-foot.cxline button'); await sleep(700);
      const p0 = await C(page, () => {
        const pg = document.querySelector('.lb-page'); if (!pg || !pg.querySelector('.cx-page')) return null;
        const row = id => { const r = pg.querySelector(`.cx-row[data-id="${id}"]`); if (!r) return null; const b = r.querySelector('[data-buy]'), s = r.querySelector('[data-sell]'), rb = r.getBoundingClientRect(), bb = b && b.getBoundingClientRect();
          return { cls: r.className.replace('cx-row', '').trim(), st: (r.querySelector('.st') || {}).textContent || '', mo: (r.querySelector('.fx .mo') || {}).textContent || '', buy: b ? !b.disabled : null, sell: s ? !s.disabled : null, h: Math.round(rb.height), bw: bb ? [Math.round(bb.width), Math.round(bb.height)] : null }; };
        const ids = ['atk', 'def', 'hp', 'xp', 'plea', 'money', 'pay', 'rare', 'piggy', 'reroll', 'ban', 'intel'];
        const rows = {}; ids.forEach(id => { rows[id] = row(id); });
        return { lv: (pg.querySelector('.cx-head .lv') || {}).textContent, pts: (pg.querySelector('.cx-head .pts') || {}).textContent, later: (pg.querySelector('.cx-later') || {}).textContent || '', off: !!pg.querySelector('[data-a=off]'),
          respec: !(pg.querySelector('[data-a=respec]') || {}).disabled, rows, safety: !!pg.querySelector('.cx-row.auto'), ladder: pg.querySelectorAll('.cx-ladder li').length,
          ladSoon: pg.querySelectorAll('.cx-ladder li.soon').length + [...pg.querySelectorAll('.cx-ladder li')].filter(li => /之後開放/.test(li.textContent)).length };
      });
      const sc0 = await noScroll(page);
      // 真點＋開局錢（捲到看得到再點）×3
      const tapBuy = async id => { await C(page, i => document.querySelector(`.lb-page [data-buy="${i}"]`).scrollIntoView({ block: 'center' }), id); await sleep(150); await tapAt(page, `.lb-page [data-buy="${id}"]`); await sleep(350); };
      for (let i = 0; i < 3; i++) await tapBuy('money');
      const st = page => C(page, () => ({ spent: Object.assign({}, window.__lab.save.career.spent), stored: JSON.parse(localStorage.getItem('dipGameLab_v1')).career.spent, pts: (document.querySelector('.lb-page .cx-head .pts') || {}).textContent,
        money: (() => { const r = document.querySelector('.lb-page .cx-row[data-id="money"]'); return { buy: !r.querySelector('[data-buy]').disabled, st: r.querySelector('.st').textContent }; })() }));
      const a1 = await st(page);
      await jsClick(page, '.lb-page [data-buy="pay"]'); await sleep(300);
      const a2 = await st(page);
      await jsClick(page, '.lb-page [data-sell="money"]'); await sleep(300);
      const a3 = await st(page);
      await C(page, () => { window.__toasts.length = 0; }); await jsClick(page, '.lb-page [data-a=respec]'); await sleep(400);
      const a4 = await st(page), t4 = await toasts(page);
      // 戰力天賦鎖住：點了也不動（disabled）；引擎直接買＝locked
      const lockEng = await C(page, () => ['atk', 'def', 'hp', 'xp', 'rare', 'plea'].map(id => window.DipLabEngine.talentBuy(window.DipLabContent, window.__lab.save.career, id).error).join());
      await jsClick(page, '.lb-page [data-a=close]'); await sleep(700);
      const tl = await C(page, () => ({ scr: window.__lab.screen(), page: !!document.querySelector('.lb-page'), dot: !!document.querySelector('.lb-foot.cxline .cx-dot') }));
      // Lv9：戰力天賦開了
      await C(page, () => { const s = JSON.parse(localStorage.getItem('dipGameLab_v1')); s.career.xp = 3600; s.career.spent = {}; localStorage.setItem('dipGameLab_v1', JSON.stringify(s)); });
      await openTitle(page, Q()); await sleep(400);
      await C(page, () => window.__lab.openPage('career')); await sleep(600);
      const b0 = await C(page, () => ({ lv: (document.querySelector('.lb-page .cx-head .lv') || {}).textContent, later: !!document.querySelector('.lb-page .cx-later'), atkCls: document.querySelector('.lb-page .cx-row[data-id="atk"]').className,
        atk: !document.querySelector('.lb-page [data-buy="atk"]').disabled, plea: !document.querySelector('.lb-page [data-buy="plea"]').disabled }));
      await jsClick(page, '.lb-page [data-buy="atk"]'); await sleep(300);
      const b1 = await C(page, () => ({ spent: Object.assign({}, window.__lab.save.career.spent), pts: document.querySelector('.lb-page .cx-head .pts').textContent, def: !document.querySelector('.lb-page [data-buy="def"]').disabled,
        atkCost: document.querySelector('.lb-page .cx-row[data-id="atk"] .st').textContent }));
      const R = p0 && p0.rows, lock8 = ['atk', 'def', 'hp', 'xp', 'rare'];
      const ok = p0 && p0.lv === fill(x.title, { n: 7 }) && p0.pts === fill(x.points, { n: 6 }) && p0.later === fill(x.powerLater, { n: 8 }) && !p0.off && !p0.respec && p0.safety && p0.ladder === 8 && p0.ladSoon === 0 &&
        lock8.every(id => R[id] && /lock/.test(R[id].cls) && R[id].buy === false && R[id].st === fill(x.lock, { n: 8 })) && R.plea && /lock/.test(R.plea.cls) && R.plea.st === fill(x.lock, { n: 20 }) && R.plea.buy === false &&
        ['money', 'pay'].every(id => R[id] && R[id].cls === '' && R[id].mo === x.moneyOnly && R[id].buy === true && R[id].st === fill(x.cost, { n: 1 })) &&
        ['piggy', 'reroll', 'ban', 'intel'].every(id => R[id] && /soon/.test(R[id].cls) && R[id].buy === null && R[id].st === x.soon) &&
        Object.values(R).every(r => r && r.h >= 44 && (!r.bw || (r.bw[0] >= 44 && r.bw[1] >= 44))) && scrollOk(sc0) &&
        a1.spent.money === 3 && J(a1.stored) === J(a1.spent) && a1.pts === fill(x.points, { n: 3 }) && !a1.money.buy && a1.money.st === x.maxed &&
        a2.spent.pay === 1 && a2.pts === fill(x.points, { n: 2 }) && a3.spent.money === 2 && a3.pts === fill(x.points, { n: 3 }) && a3.money.buy &&
        J(a4.spent) === '{}' && J(a4.stored) === '{}' && a4.pts === fill(x.points, { n: 6 }) && t4.includes(x.respecDone) && lockEng === 'locked,locked,locked,locked,locked,locked' &&
        tl.scr === 'title' && !tl.page && tl.dot && b0.lv === fill(x.title, { n: 9 }) && !b0.later && !/lock/.test(b0.atkCls) && b0.atk && !b0.plea &&
        b1.spent.atk === 1 && b1.pts === fill(x.points, { n: 2 }) && !b1.def && b1.atkCost === fill(x.cost, { n: 12 });
      record(3, size, ok && !errs(page).length, `樂歷頁 ${J(p0)} ${J(sc0)}；開局錢 ×3 ${J(a1)}；酬勞 ${J(a2)}；退一級 ${J(a3)}；重配 ${J(a4)} 吐司 ${J(t4)}；引擎買鎖住的 ${lockEng}；關頁 ${J(tl)}；Lv9 ${J(b0)} → 品味 ${J(b1)}；${errTx(page)}`);
    } catch (e) { record(3, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 4 C4 下一趟開局照天賦 ＋ 9 C9 備用說情（同一趟）
  if (want(4) || want(9)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await openTitle(page, Q());
      // Lv29（28 點）：品味 1（6）、聲望 1（6）、備用說情（15）、開局錢 1（1）
      await seedCareer(page, { career: { xp: 23500, spent: { atk: 1, hp: 1, plea: 1, money: 1 } }, runs: [] });
      await openTitle(page, Q());
      const x = await CU(page);
      await ownSeedable(page, 6, 'hall');
      const b = await base0(page, 'hall');
      await jsClick(page, '[data-a=push]');
      const dn = await driveToNight(page, pickSeeds);
      const r = await C(page, () => { const r = window.__lab.run, Cn = window.DipLabContent; return { talent: r.talent || null, atk: r.atk, def: r.def, maxHp: r.maxHp, hp: r.hp, money: r.money, spent: r.stats.spent | 0, earned: r.stats.earned | 0,
        plea: r.plea, relicPick: r.relicPick, goldAdd: r.goldAdd, seeds: (r.seeds || []).slice(), bag4: r.bag.slice(0, 4), giftsIn: r.bag.filter(id => Cn.gifts.hall.includes(id)).length, safety: !!r.safety, retryLeft: r.retryLeft,
        bar: (document.querySelector('.lb-night .nh .sub') || {}).textContent || '' }; });
      const barWant = fill(x.pleaLeft, { n: 1 }) + fill(x.pleaSpare, { n: 1 });
      if (want(4)) {
        const ok4 = dn.ok && dn.seeds && dn.seeds.sub === fill(x.pickSub, { n: 4, max: 4 }) && dn.seeds.picked === 4 && J(r.talent) === J({ atk: 1, hp: 1, plea: 1, money: 1 }) &&
          r.atk === b.atk + 1 && r.def === b.def && r.maxHp === b.maxHp + 2 && r.money + r.spent - r.earned === b.money + 500 && r.plea === 1 && r.relicPick === 3 && r.goldAdd === 0.01 &&
          r.seeds.length === 4 && J(r.bag4) === J(r.seeds) && r.giftsIn === 0 && r.bar.includes(barWant);
        record(4, size, ok4 && !errs(page).length, `到來客 ${J(dn)}；新帳號 ${J(b)}；這一趟 ${J(r)}（來客條要含「${barWant}」）；${errTx(page)}`);
      }
      if (want(9)) {
        // 第 1 位：輸 ×4（保底 → 這一輪的說情 → 備用說情 → 死）
        const seq = [];
        await jsClick(page, '[data-a=go]');
        let ok9 = await waitDuel(page);
        for (let k = 0; k < 4 && ok9; k++) {
          const l = await loseNow(page);
          const a = await advance(page);
          const step = { p: l.p && { free: !!l.p.free, safety: !!l.p.safety, plea: !!l.p.plea }, over: l.over, at: a.at, menu: a.menu || null, said: a.said.filter(t => /老闆|「/.test(t)).slice(-3) };
          if (a.at === 'menu') { await jsClick(page, '.lb-dq .lb-dqopt[data-i="0"]'); await sleep(300); step.after = await C(page, () => ({ retryLeft: window.__lab.run.retryLeft, plea: window.__lab.run.plea })); await waitDuel(page); }
          else if (a.at === 'duel') step.after = await C(page, () => ({ retryLeft: window.__lab.run.retryLeft, plea: window.__lab.run.plea }));
          step.plSaid = a.said.some(t => t.includes(x.retryPlea));
          seq.push(step);
          if (a.at === 'end' || a.at === 'timeout') break;
        }
        const m0 = x.retryMenu.map(t => t.replace(/^▶\s*/, '')), pm = x.pleaMenu.replace(/^▶\s*/, '');
        const [s1, s2, s3, s4] = seq;
        const flow = s1 && s1.p && s1.p.free && s1.p.safety && !s1.p.plea && (s1.at === 'duel' || (s1.at === 'menu' && s1.menu.length === 1 && !s1.menu.includes(m0[0]))) && s1.after.retryLeft === 1 && s1.after.plea === 1 && !s1.plSaid &&
          s2 && s2.p && !s2.p.free && !s2.p.plea && s2.at === 'menu' && J(s2.menu) === J(m0) && s2.after.retryLeft === 0 && s2.after.plea === 1 && !s2.plSaid &&
          s3 && s3.p && !s3.p.free && s3.p.plea && s3.at === 'menu' && s3.menu[0] === pm && s3.menu[1] === m0[1] && s3.plSaid && s3.after.retryLeft === 0 && s3.after.plea === 0 &&
          s4 && !s4.p && s4.over && s4.at === 'end';
        // 另一份：這一輪的說情用完、還有備用＝來客條「說情剩 0・備用 1」
        await seedCareer(page, { career: { xp: 23500, spent: { plea: 1 } }, run: { ace: 'hall', idx: 2, set: { plea: 1, retryLeft: 0, safety: false } }, runs: [] });
        await openTitle(page, Q()); await jsClick(page, '[data-a=cont]'); await nightReady(page);
        const bar0 = await C(page, () => (document.querySelector('.lb-night .nh .sub') || {}).textContent || '');
        const bar0Want = fill(x.pleaLeft, { n: 0 }) + fill(x.pleaSpare, { n: 1 });
        ok9 = ok9 && flow && r.bar.includes(barWant) && bar0.includes(bar0Want);
        record(9, size, ok9 && !errs(page).length, `來客條「${r.bar}」；輸了的順序 ${J(seq)}；retryLeft 0＋備用 1 的來客條「${bar0}」（要含「${bar0Want}」）；${errTx(page)}`);
      }
    } catch (e) { if (want(4)) record(4, size, false, 'error ' + e.message); if (want(9)) record(9, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 5 C5 關掉樂歷
  if (want(5)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await openTitle(page, Q());
      await seedCareer(page, { career: { xp: 6500, spent: { atk: 1, money: 1 } }, runs: [] });
      await openTitle(page, Q());
      const x = await CU(page);
      await ownSeedable(page, 6, 'hall');
      await C(page, () => window.__lab.openPage('career')); await sleep(600);
      const o0 = await C(page, () => { const b = document.querySelector('.lb-page [data-a=off]'); return b ? { pressed: b.getAttribute('aria-pressed'), t: (b.querySelector('b') || {}).textContent, h: Math.round(b.getBoundingClientRect().height) } : null; });
      await jsClick(page, '.lb-page [data-a=off]'); await sleep(400);
      const o1 = await C(page, () => ({ pressed: document.querySelector('.lb-page [data-a=off]').getAttribute('aria-pressed'), off: window.__lab.save.career.off, stored: JSON.parse(localStorage.getItem('dipGameLab_v1')).career.off }));
      await jsClick(page, '.lb-page [data-a=close]'); await sleep(700);
      const t0 = await C(page, () => (document.querySelector('.lb-foot.info .cx-offon') || {}).textContent || '');
      const b = await base0(page, 'hall'), xp0 = 6500;
      await jsClick(page, '[data-a=push]');
      const dn = await driveToNight(page, pickSeeds);
      const r = await C(page, () => { const r = window.__lab.run; return { talent: r.talent || null, atk: r.atk, maxHp: r.maxHp, relicPick: r.relicPick || null, goldAdd: r.goldAdd || null, plea: r.plea || 0, off: !!r.careerOff, seeds: (r.seeds || []).length }; });
      await C(page, () => window.__lab.loseNext(3, { noRetry: true }));
      await jsClick(page, '[data-a=go]');
      const ended = await loseToEnd(page);
      const e = await C(page, () => { const S = window.__lab.save, ent = S.runs[S.runs.length - 1] || {}; return { off: ent.off, gain: ent.gain && ent.gain.total, xp: S.career.xp, far: S.best.far, reached: ent.reached, scr: window.__lab.screen(), runs: S.runs.length }; });
      await jsClick(page, '[data-a=cxp]'); await sleep(500);
      const m = await C(page, () => [...document.querySelectorAll('.lb-modal .cx-gain p.sub')].map(p => p.textContent));
      await jsClick(page, '.lb-modal [data-x]'); await sleep(300);
      await openTitle(page, Q()); await sleep(400);
      const t1 = await C(page, () => ({ info: (document.querySelector('.lb-foot.info') || {}).textContent || '', offon: (document.querySelector('.lb-foot.info .cx-offon') || {}).textContent || '' }));
      const infoWant = fill(x.best, { n: e.far }) + '・' + x.offBest;
      const ok = o0 && o0.pressed === 'false' && o0.t === x.off && o0.h >= 44 && o1.pressed === 'true' && o1.off === true && o1.stored === true && t0 === x.offOn &&
        dn.ok && dn.seeds && dn.seeds.sub === fill(x.pickSub, { n: 4, max: 3 }) && dn.seeds.picked === 3 && r.seeds === 3 && !r.talent && r.atk === b.atk && r.maxHp === b.maxHp && !r.relicPick && !r.goldAdd && !r.plea && r.off &&
        ended && e.off === 1 && e.gain > 0 && e.xp === xp0 + e.gain && e.far === e.reached && m.includes(x.partOff) && t1.info.startsWith(infoWant) && t1.offon === x.offOn;
      record(5, size, ok && !errs(page).length, `開關 ${J(o0)} → ${J(o1)}；標題「${t0}」；到來客 ${J(dn)}；這一趟 ${J(r)}（新帳號 ${J(b)}）；打完 ${ended} ${J(e)} 明細 ${J(m)}；重新整理 ${J(t1)}（要「${infoWant}…」）；${errTx(page)}`);
    } catch (e) { record(5, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 6 C6 標題兩行（最長那組）；6b 再加 ?apex=1（跳過序章那顆鈕）；6c 再加 ?fac=1（兩個旗標章）
  if (want(6)) {
    const seed6 = page => seedCareer(page, { career: { xp: 6600, off: true }, run: { ace: 'hall', idx: 3 },
      runs: [{ seedKey: '20261101', runNo: 1, ace: 'hall', result: 'dead', reached: 14, bestStreak: 6, taken: 5, wins: 13, level: 4, checkpoints: [10], off: 1 }], best: { far: 14, checkpoints: [10], bestStreak: 6 } });
    const title6 = page => C(page, () => {
      const box = document.querySelector('.lb-panel.title .lb-screen') || document.querySelector('#panel .lb-screen'), b = document.querySelector('.lb-foot.cxline button'), r = b && b.getBoundingClientRect();
      return { cont: !!document.querySelector('[data-a=cont]'), skip: !!document.querySelector('[data-a=skip]'), sh: box && box.scrollHeight, ch: box && box.clientHeight, line: b && b.innerText.trim(), dot: !!(b && b.querySelector('.cx-dot')),
        top: r && Math.round(r.top), bottom: r && Math.round(r.bottom), h: r && Math.round(r.height), info: (document.querySelector('.lb-foot.info') || {}).textContent || '', offon: !!document.querySelector('.lb-foot.info .cx-offon'),
        unl: !!document.querySelector('.lb-foot.unl'), lad: !!document.querySelector('.lb-foot.ladder') };
    });
    // 6c（棒二）：再加 ?fac=1＝兩個旗標章（SPEC-D §10.2 C6「兩個旗標章」；棒一 375×548 標題區 292/292 零餘裕，章不能把標題擠高）：
    //   >600px 高「流派試做」「頂點卡試做」兩顆、不重疊；≤600px 只剩一顆「流派＋頂點卡試做」；章都在面板上緣以上（不蓋標題那塊）
    for (const [apex, fac] of [[false, false], [true, false], [true, true]]) {
      const n = fac ? '6c' : apex ? '6b' : 6, QA = Q('&fast=1' + (apex ? '&apex=1' : '') + (fac ? '&fac=1' : ''));
      const { ctx, page } = await newPage(browser, w, h);
      try {
        await openTitle(page, QA);
        await seed6(page);
        await openTitle(page, QA); await sleep(1200);
        const x = await CU(page);
        const t = await title6(page);
        const sc = await noScroll(page);
        const lineWant = h > 600 ? fill(x.line, { n: 12, m: 15, name: x.ladder.gold }) : fill(x.lineShort, { n: 12 });
        let opened = false;
        try { await tapAt(page, '.lb-foot.cxline button'); await sleep(700); opened = await C(page, () => !!document.querySelector('.lb-page .cx-page')); } catch (_) { opened = false; }
        let more = '', okMore = true;
        if (!apex) {
          // 唱片櫃頁頭的「樂歷」小鈕（SPEC-D §2.8-1）也進得去
          await jsClick(page, '.lb-page [data-a=close]'); await sleep(600);
          await C(page, () => window.__lab.openPage('shelf')); await sleep(600);
          const sb = await C(page, () => { const b = document.querySelector('.lb-page .lb-top [data-a=career]'); return b ? b.textContent : null; });
          if (sb) await jsClick(page, '.lb-page .lb-top [data-a=career]');
          await sleep(600);
          const viaShelf = await C(page, () => !!document.querySelector('.lb-page .cx-page') && document.querySelectorAll('.lb-page').length === 1);
          // Lv1（序章打完、樂歷還沒到 Lv2）：沒有第二行
          await seedCareer(page, { career: { xp: 60 }, runs: [{ seedKey: '20261101', runNo: 1, ace: 'hall', result: 'dead', reached: 2, bestStreak: 1, taken: 0, wins: 1, level: 1, checkpoints: [] }], best: { far: 2, checkpoints: [], bestStreak: 1 } });
          await openTitle(page, Q()); await sleep(500);
          const lv1 = await C(page, () => ({ cx: !!document.querySelector('.lb-foot.cxline'), lad: !!document.querySelector('.lb-foot.ladder') }));
          okMore = sb === x.shelfBtn && viaShelf && !lv1.cx && lv1.lad;
          more = `；唱片櫃頁頭「${sb}」→ 樂歷頁 ${viaShelf}；Lv1 ${J(lv1)}`;
        }
        let okFlag = true;
        if (fac) {
          const pl = await C(page, () => { const R = s => { const e = document.querySelector('.lb-plate ' + s); if (!e) return null; const r = e.getBoundingClientRect(); return getComputedStyle(e).display === 'none' || !r.width ? 'none' : { tx: e.textContent, l: r.left, r: r.right, t: r.top, b: r.bottom }; };
            const p = document.querySelector('#panel').getBoundingClientRect(); return { fac: R('.fac'), apx: R('.apx'), both: R('.both'), pTop: p.top, flag: window.__lab.fac() }; });
          const inV = c => c && c !== 'none' && c.l >= 0 && c.r <= w + 0.5 && c.t >= 0 && c.b <= pl.pTop + 0.5;
          okFlag = pl.flag && (h > 600 ? inV(pl.fac) && inV(pl.apx) && pl.both === 'none' && (pl.fac.r <= pl.apx.l || pl.apx.r <= pl.fac.l)
            : inV(pl.both) && pl.fac === 'none' && pl.apx === 'none');
          more += `；旗標章 ${J(pl)}`;
        }
        const ok = t.cont && t.skip === apex && t.sh - t.ch <= 1 && scrollOk(sc) && t.line === lineWant && t.dot && t.top >= 0 && t.bottom <= h && t.h >= 44 &&
          t.info.includes(x.offBest) && t.offon && !t.unl && !t.lad && opened && okMore && okFlag;
        record(n, size, ok && !errs(page).length, `標題${apex ? '（?apex=1' + (fac ? '&fac=1' : '') + '）' : ''} ${J(t)} ${J(sc)}（第二行要「${lineWant}」）；真點第二行 → 樂歷頁 ${opened}${more}；${errTx(page)}`);
      } catch (e) { record(n, size, false, 'error ' + e.message); }
      await ctx.close();
    }
  }

  // ---------------------------------------------------------------- 7 C7 退版（D 存檔 → C 版頁面玩一趟 → 回 D 版補記）
  if (want(7)) {
    const { ctx, page } = await newPage(browser, w, h); await watchToasts(page); await servePrev(ctx);
    try {
      if (!prevFile('index.html') || !prevFile('ui.js')) throw new Error(`C 版頁面拿不到（git show ${PREV}:game-lab/…；設 CAREER_PREV）`);
      await openTitle(page, Q());
      const career = { xp: 6500, spent: { atk: 1, money: 1 }, prof: { hall: 900, pearl: 0, heresy: 0 }, drawn: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] };
      await seedCareer(page, { career, run: { ace: 'hall', idx: 3, talent: true }, runs: [{ seedKey: '20261101', runNo: 1, ace: 'hall', result: 'dead', reached: 14, bestStreak: 6, taken: 5, wins: 13, level: 4, checkpoints: [10], gain: { base: 258, record: 0, route: 0, cut: 0, mul: 1, total: 258 } }],
        best: { far: 14, checkpoints: [10], bestStreak: 6 } });
      // 樂歷抽到的兩張（src lexp、career.got 記著）：C 版頁面的 SHELF_SRC 沒有 lexp，載入會洗成 gift；回 D 版要照 got 補回來（棒一審查）
      const lexpIds = await C(page, () => { const s = JSON.parse(localStorage.getItem('dipGameLab_v1')), E = window.DipLabEngine, Cn = window.DipLabContent;
        const ids = Object.keys(Cn.cards).sort().filter(id => E.canSeed(Cn, id) && !Cn.cards[id].tier && !s.shelf[id]).slice(0, 2);
        ids.forEach(id => { s.shelf[id] = { at: 'e2e#1', seen: true, own: true, src: 'lexp', ownAt: 'e2e#1' }; }); s.career.got = ids.slice();
        localStorage.setItem('dipGameLab_v1', JSON.stringify(s)); return ids; });
      await openTitle(page, Q()); await sleep(500);
      const d0 = await C(page, () => ({ career: JSON.parse(localStorage.getItem('dipGameLab_v1')).career, talent: window.__lab.run.talent || null, atk: window.__lab.run.atk }));
      // C 版頁面
      await openTitle(page, QC());
      const c0 = await C(page, () => ({ ro: !!document.querySelector('.lb-foot.ro'), cont: !!document.querySelector('[data-a=cont]'), career: !!window.__lab.save.career, atk: window.__lab.run && window.__lab.run.atk,
        ver: [...document.scripts].map(s => s.src).filter(s => /ui\.js/.test(s)).join() }));
      await jsClick(page, '[data-a=cont]'); await nightReady(page);
      await C(page, () => window.__lab.loseNext(3, { noRetry: true }));
      await jsClick(page, '[data-a=go]');
      const endedC = await loseToEnd(page);
      await sleep(800);
      const c1 = await C(page, ids => { const s = JSON.parse(localStorage.getItem('dipGameLab_v1')); return { v: s.v, career: s.career, lb: s.lexpBank, ent: s.runs[s.runs.length - 1], src: ids.map(id => s.shelf[id] && s.shelf[id].src) }; }, lexpIds);
      // 回 D 版
      await openTitle(page, Q()); await sleep(1500);
      const x = await CU(page), t = await toasts(page);
      const d1 = await C(page, ids => { const S = window.__lab.save; return { xp: S.career.xp, banked: S.runs.map(r => r.banked || 0), lb: S.lexpBank, stored: JSON.parse(localStorage.getItem('dipGameLab_v1')).career.xp,
        src: ids.map(id => S.shelf[id] && S.shelf[id].src), own: ids.every(id => S.shelf[id] && S.shelf[id].own) }; }, lexpIds);
      // 「看上一趟結算」：那一趟是 C 版頁面記的（runs 那筆沒有 gain，開機入帳一筆總額收了）→ 結算頁不出「樂歷 +n」（不會跟入帳的數字對不上；棒一審查）
      let ce = null;
      if (await page.$('[data-a=end]')) { await jsClick(page, '[data-a=end]'); await waitScreen(page, 'end'); await sleep(900); ce = await C(page, () => ({ scr: window.__lab.screen(), cxp: !!document.querySelector('.lb-cxp'), xp: window.__lab.save.career.xp })); }
      const add = c1.lb ? (b => b.base + b.route)(capped(c1.lb)) : -1;
      const zero = L => ['base', 'gig', 'home', 'promo', 'packet', 'demo'].every(k => L[k] === 0);
      const ok = J(d0.career.spent) === J(career.spent) && J(d0.talent) === J({ atk: 1, money: 1 }) && !c0.ro && c0.cont && c0.career && c0.atk === d0.atk && /game-lab-c\/ui\.js\?v=82/.test(c0.ver) && endedC &&
        c1.v === 8 && J(c1.career) === J(d0.career) && c1.lb && c1.lb.base > 0 && c1.ent && c1.ent.lexp && !c1.ent.gain && lexpIds.length === 2 && J(d0.career.got) === J(lexpIds) && J(c1.src) === '["gift","gift"]' &&
        add > 0 && t.includes(fill(x.depositMore, { n: add })) && d1.xp === 6500 + add && d1.stored === d1.xp && J(d1.banked) === '[0,1]' && zero(d1.lb) && J(d1.src) === '["lexp","lexp"]' && d1.own &&
        ce && ce.scr === 'end' && !ce.cxp && ce.xp === d1.xp;
      record(7, size, ok && !errs(page).length, `D 存檔 ${J(d0)}；C 版頁面 ${J(c0)} 打完 ${endedC} → 存檔 ${J({ v: c1.v, careerSame: J(c1.career) === J(d0.career), lb: c1.lb, ent: c1.ent && { lexp: c1.ent.lexp, gain: c1.ent.gain } })}；` +
        `回 D 版 吐司 ${J(t)}（要「${fill(x.depositMore, { n: add })}」）${J(d1)}；樂歷盤來源 C 版 ${J(c1.src)} → D 版 ${J(d1.src)}；看上一趟結算 ${J(ce)}（不出樂歷那行）；${errTx(page)}`);
    } catch (e) { record(7, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 8 C8 跨版那一趟（C 版開、D 版打完）
  if (want(8)) {
    const { ctx, page } = await newPage(browser, w, h); await watchToasts(page); await servePrev(ctx);
    try {
      if (!prevFile('index.html') || !prevFile('ui.js')) throw new Error(`C 版頁面拿不到（git show ${PREV}:game-lab/…；設 CAREER_PREV）`);
      await openTitle(page, QC());
      await seedRun(page, { ace: 'pearl', idx: 3 });                          // C 版引擎開的 run（v5 存檔，C 版頁面載入時遷到 v8）
      await openTitle(page, QC()); await sleep(400);
      await C(page, () => { const r = window.__lab.run; r.lexp = Object.assign({}, r.lexp || {}, { home: 30 }); window.__lab.money(r.money); });   // 這一趟記了一筆路線（店裡唱盤 +30），money() 順手 persist
      const c0 = await C(page, () => { const s = JSON.parse(localStorage.getItem('dipGameLab_v1')); return { v: s.v, career: 'career' in s, lexp: s.run && s.run.lexp, lb: s.lexpBank }; });
      const raw0 = await C(page, () => localStorage.getItem('dipGameLab_v1'));
      // D 版
      await openTitle(page, Q()); await sleep(1200);
      const t0 = await toasts(page);
      const d0 = await C(page, () => ({ xp: window.__lab.save.career.xp, bak8: localStorage.getItem('dipGameLab_v1.bak8'), card: !!document.querySelector('.lb-sheet.cxcard') }));
      await jsClick(page, '[data-a=cont]'); await nightReady(page);
      const farBefore = await C(page, () => window.__lab.run.farBefore | 0);
      await C(page, () => window.__lab.loseNext(3, { noRetry: true }));
      await jsClick(page, '[data-a=go]');
      const ended = await loseToEnd(page);
      const d1 = await C(page, () => { const S = window.__lab.save; return { xp: S.career.xp, lb: S.lexpBank, ent: S.runs[S.runs.length - 1] }; });
      await openTitle(page, Q()); await sleep(1500);
      const d2 = await C(page, () => ({ xp: window.__lab.save.career.xp, card: !!document.querySelector('.lb-sheet.cxcard') }));
      const t2 = await toasts(page);
      const spec = d1.ent ? gainSpec(d1.ent, farBefore) : null;
      const zeroLB = L => ['base', 'gig', 'home', 'promo', 'packet', 'demo', 'runs'].every(k => (L[k] | 0) === 0);
      const x = await CU(page), dep = fill(x.depositFirst, { n: '' }).slice(0, 6);
      const ok = c0.v === 8 && !c0.career && c0.lexp && c0.lexp.home === 30 && zeroLB(c0.lb) && d0.xp === 0 && d0.bak8 === raw0 && !d0.card && !t0.some(t => t.startsWith(dep)) &&
        ended && d1.ent && d1.ent.gain && spec && spec.route === Math.min(30, Math.floor(0.4 * spec.base)) && d1.ent.gain.route === spec.route && d1.ent.gain.cut === 30 - spec.route && d1.ent.gain.total === spec.total && d1.ent.lexp && zeroLB(d1.lb) && d1.xp === spec.total && d2.xp === d1.xp && !d2.card && !t2.some(t => t.startsWith(dep));
      record(8, size, ok && !errs(page).length, `C 版存檔 ${J(c0)}；D 版載入 ${J({ xp: d0.xp, bak8: d0.bak8 === raw0, card: d0.card })} 吐司 ${J(t0)}；打完 ${ended} ${J({ xp: d1.xp, lb: d1.lb, gain: d1.ent && d1.ent.gain, lexp: d1.ent && d1.ent.lexp })}（規格 ${J(spec)}）；` +
        `重新整理 ${J(d2)} 吐司 ${J(t2)}；${errTx(page)}`);
    } catch (e) { record(8, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 10 C10 演唱會買票面板
  if (want(10)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await openTitle(page, Q());
      await seedCareer(page, { career: { xp: 2000 }, run: { ace: 'hall', idx: 1 }, runs: [] });
      await openTitle(page, Q()); await jsClick(page, '[data-a=cont]'); await nightReady(page);
      const x = await CU(page);
      await C(page, () => { window.__lab.jump(16); const r = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent; r.bestStreak = 5; r.lexp = Object.assign({}, r.lexp || {}, { gig: 0 });
        E.stallSession(r, Cn); r.pending.groups = [['gig', 'promo'], ['snack', 'dig']]; window.__lab.money(20000); window.__lab.go('night'); });
      await page.waitForFunction(() => document.querySelector('.st-pick .st-row'), null, { timeout: 10000 }).catch(() => {});
      await sleep(700);
      await tapReady(page, '.st-pick .st-row[data-g="0"]'); await sleep(400); await tapReady(page, '.st-pick .st-row[data-g="0"]'); await sleep(400);
      const up = await page.waitForFunction(() => !!document.querySelector('.lb-sheet.stall.st-k-gig .st-lx'), null, { timeout: 12000 }).then(() => true, () => false);
      await sleep(500);
      const g0 = await C(page, () => { const r = window.__lab.run; return { lx: (document.querySelector('.lb-sheet.stall .st-lx') || {}).textContent || '', full: document.querySelector('.lb-sheet.stall .st-lx').classList.contains('full'),
        room: window.DipLabEngine.gigRoom(r, window.DipLabContent), pos: r.pos, from: r.cpFrom || 1, streak: r.bestStreak, gig: (r.lexp || {}).gig | 0 }; });
      const B = 15 * (g0.pos - (g0.from > 1 ? g0.from : 1) + 1) + 8 * g0.streak, nSpec = Math.max(0, Math.floor((Math.floor(0.25 * B) - g0.gig) / x.gigPer));
      // 已算到上限（照現在的基本）→ 換一句
      await C(page, () => { window.__lab.run.lexp.gig = 9999; });
      await jsClick(page, '.lb-sheet.stall [data-a=gigPlus]'); await sleep(400);
      const g1 = await C(page, () => ({ lx: (document.querySelector('.lb-sheet.stall .st-lx') || {}).textContent || '', full: document.querySelector('.lb-sheet.stall .st-lx').classList.contains('full') }));
      const ok = up && nSpec === 3 && g0.room === nSpec && g0.lx === fill(x.gigRoom, { per: x.gigPer, n: nSpec }) && !g0.full && g1.lx === x.gigFull && g1.full;
      record(10, size, ok && !errs(page).length, `演唱會 ${up} ${J(g0)}（規格 n ${nSpec}）；到上限 ${J(g1)}；${errTx(page)}`);
    } catch (e) { record(10, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 11 新手第一次挑派：預設冷門＋新手推薦標
  if (want(11)) {
    const res = {};
    for (const [label, guess] of [['wrong', 'heresy'], ['right', 'hall']]) {        // 種子 20261106：今晚那張是經典流（hall）的
      const { ctx, page } = await newPage(browser, w, h);
      try {
        await openTitle(page, Q());
        await C(page, () => localStorage.clear());
        await openTitle(page, Q());
        const tonight = await C(page, s => ['hall', 'pearl', 'heresy'][window.DipLabEngine.fnv1a32(s + '#tonight') % 3], SEED).catch(() => null);
        await jsClick(page, '[data-a=quiet]');
        let up = false;
        for (let g = 0; g < 700 && !up; g++) {
          const st = await C(page, () => ({ sheet: (document.querySelector('#panel > .lb-sheet') || {}).className || '', choice: !!document.querySelector('.lb-dq .nx.on.choice'), menu: document.querySelectorAll('.lb-dq.hasmenu .lb-dqopt').length,
            arming: !!document.querySelector('#panel > .lb-sheet.arming, .lb-dq .menu.arming') }));
          if (/acepick/.test(st.sheet)) { up = true; break; }
          if (st.arming) { await sleep(100); continue; }
          if (/guess/.test(st.sheet)) { await sleep(350); await C(page, t => { const id = window.DipLabContent.aces[t]; const ct = [...document.querySelectorAll('.lb-sheet.guess .lb-ct')].find(x => x.dataset.cid === id); if (ct) ct.querySelector('[data-pick]').click(); }, guess); await sleep(1300); continue; }
          if (st.menu) { await sleep(350); await jsClick(page, '.lb-dq .lb-dqopt[data-i="0"]'); await sleep(250); continue; }
          if (st.choice) { await jsClick(page, '.lb-dq'); await sleep(150); continue; }
          await sleep(100);
        }
        await sleep(600);
        res[label] = await C(page, () => { const s = document.querySelector('.lb-sheet.acepick'); if (!s) return null;
          return { sel: (s.querySelector('.lb-ct.sel') || {}).dataset.tier, tags: Object.fromEntries([...s.querySelectorAll('.lb-ct')].map(c => [c.dataset.tier, (c.querySelector('.nbtag') || {}).textContent || ''])),
            acex: Object.fromEntries([...s.querySelectorAll('.lb-ct')].map(c => [c.dataset.tier, (c.querySelector('.acex span') || {}).textContent || ''])), okIn: (() => { const b = s.querySelector('[data-a=ok]').getBoundingClientRect(); return b.top >= 0 && b.bottom <= innerHeight; })() }; });
        res[label].tonight = tonight; res[label].errs = errs(page).length; res[label].errTx = errTx(page);
        if (label === 'wrong') res.x = await CU(page);
      } catch (e) { res[label] = { error: e.message }; }
      await ctx.close();
    }
    // 不是第一次挑（解鎖了兩派、點老闆換）：沒有標
    const { ctx, page } = await newPage(browser, w, h);
    let later = null;
    try {
      await openTitle(page, Q());
      await seedRun(page, { ace: 'hall', idx: 0, ownAces: ['pearl'] });
      await openTitle(page, Q());
      await jsClick(page, '[data-a=cont]'); await waitScreen(page, 'night'); await sleep(1500);
      await C(page, () => window.__lab.stageAction('talk:owner')); await sleep(500);
      await jsClick(page, '.lb-sheet.owner [data-a=swap]');
      const upL = await page.waitForSelector('.lb-sheet.acepick .lb-ct', { timeout: 5000 }).then(() => true, () => false);
      later = await C(page, () => ({ tags: document.querySelectorAll('.lb-sheet.acepick .nbtag').length, sel: (document.querySelector('.lb-sheet.acepick .lb-ct.sel') || {}).dataset.tier }));
      later.up = upL; later.errs = errs(page).length;
    } catch (e) { later = { error: e.message }; }
    await ctx.close();
    const x = res.x || {}, W = res.wrong || {}, R = res.right || {};
    const tagsOk = t => t && t.pearl === x.aceNewbie.pearl && t.hall === x.aceNewbie.hall && t.heresy === '';
    const acexOk = a => a && ['hall', 'pearl', 'heresy'].every(t => a[t].startsWith(x.aceTitle[t] + '・') && / 7$/.test(a[t]) && !/殿堂|流亡|派/.test(a[t]));
    const ok = W.tonight === 'hall' && W.sel === 'pearl' && tagsOk(W.tags) && acexOk(W.acex) && W.okIn && !W.errs && R.sel === 'hall' && tagsOk(R.tags) && R.okIn && !R.errs && later && later.up && later.tags === 0 && later.sel === 'hall' && !later.errs;
    record(11, size, ok, `猜錯（猜異端）${J(W)}；猜對（經典）${J(R)}；點老闆換 ${J(later)}`);
  }

  // ---------------------------------------------------------------- 12 放棄那一趟（標題連按兩下「重新推門」；棒一審查：放棄刷樂歷）
  //   第 1 位、0 場：樂歷 0（不是 15×1×2＝30）；第 4 位還沒打（打了 3 位、最多連贏 3）：15×3＋8×3＝69、沒有 ×2；runs 那筆 result abandon、gain.quit 1
  if (want(12)) {
    const out = {};
    for (const [label, idx, streak, want0] of [['pos1', 0, 0, 0], ['pos4', 3, 3, 15 * 3 + 8 * 3]]) {
      const { ctx, page } = await newPage(browser, w, h);
      try {
        await openTitle(page, Q());
        await seedCareer(page, { career: { xp: 0 }, run: { ace: 'hall', idx, set: { bestStreak: streak, streak } }, runs: [RUN0] });   // 第 I 波 I-0：有一趟之前的（新帳號第一趟保底 #13 另測）
        await openTitle(page, Q()); await sleep(400);
        const b0 = await C(page, () => ({ xp: window.__lab.save.career.xp, pos: window.__lab.run.pos, cont: !!document.querySelector('[data-a=cont]') }));
        await jsClick(page, '[data-a=push]'); await sleep(500); await jsClick(page, '[data-a=push]'); await sleep(1500);
        const a = await C(page, () => { const S = JSON.parse(localStorage.getItem('dipGameLab_v1')), L = S.runs[S.runs.length - 1] || {}; return { xp: S.career.xp, result: L.result, reached: L.reached, gain: L.gain || null, runs: S.runs.length }; });
        const spec = gainSpec({ reached: a.reached, bestStreak: streak, lexp: {} }, 0, { quit: true, open: true });
        out[label] = Object.assign({ b0, want: want0, spec: spec.total }, a, { errs: errs(page).length });
        out[label].ok = b0.cont && b0.pos === idx + 1 && a.result === 'abandon' && a.runs === 2 && a.gain && a.gain.total === want0 && spec.total === want0 && a.gain.mul === 1 && a.gain.quit === 1 && !a.gain.first && a.xp === want0 && !errs(page).length;
      } catch (e) { out[label] = { error: e.message, ok: false }; }
      await ctx.close();
    }
    record(12, size, out.pos1.ok && out.pos4.ok, `第 1 位 0 場放棄 ${J(out.pos1)}；第 4 位還沒打就放棄 ${J(out.pos4)}`);
  }

  // ---------------------------------------------------------------- 13 第一趟保底（SPEC-I §7.3 a）＋13b 清單卡（§7.3 d）
  if (want(13)) {
    for (const [label, jump, streak] of [['13', 0, 0], ['13b', 46, 20]]) {
      const { ctx, page } = await newPage(browser, w, h, { dpr: SHOTS ? 2 : 1 });
      try {
        await openTitle(page, Q());
        await seedCareer(page, { career: { xp: 0 }, run: { ace: 'hall', idx: 0 }, runs: [] });
        await openTitle(page, Q()); await jsClick(page, '[data-a=cont]'); await nightReady(page);
        const x = await CU(page);
        if (jump) await C(page, ([j, k]) => { window.__lab.jump(j); const r = window.__lab.run; r.bestStreak = k; r.streak = k; window.__lab.money(r.money); window.__lab.go('night'); }, [jump, streak]);
        if (jump) await nightReady(page);
        await C(page, () => window.__lab.loseNext(1, { noRetry: true }));
        await jsClick(page, '[data-a=go]');
        const ended = await loseToEnd(page);
        await sleep(600);
        const e0 = await C(page, () => { const S = window.__lab.save, b = document.querySelector('.lb-cxp'); return { cxp: b ? b.querySelector('.t').textContent : null, xp: S.career.xp, ent: S.runs[S.runs.length - 1], runs: S.runs.length }; });
        await shot(page, size, label === '13' ? '6-first-end' : '8-first-far-end');
        const spec = gainSpec(e0.ent, 0), total = Math.max(spec.total, xpAt(2)), lv = levelOf(total);
        await jsClick(page, '[data-a=cxp]'); await sleep(500);
        const m = await C(page, () => { const g = document.querySelector('.lb-modal .cx-gain'); return g ? { h1: g.querySelector('.lb-h1').textContent, li: [...g.querySelectorAll('.cx-parts li')].map(t => t.textContent) } : null; });
        if (label === '13') await shot(page, size, '7-first-detail');
        await jsClick(page, '.lb-modal [data-x]'); await sleep(400);
        await jsClick(page, '[data-a=again]');
        const up = await page.waitForSelector('.lb-sheet.cxcard', { timeout: 4000 }).then(() => true, () => false);
        await sleep(500);
        const k0 = await C(page, () => { const s = document.querySelector('.lb-sheet.cxcard'); if (!s) return null; const b = s.querySelector('.lb-btn[data-a=next]').getBoundingClientRect();
          return { hd: (s.querySelector('.cx-hd b') || {}).textContent, sub: (s.querySelector('.cx-hd .sub') || {}).textContent || '', got: (s.querySelector('.cx-got b') || {}).textContent || '', cv: s.querySelectorAll('.cx-got .lb-cv').length,
            talent: !!s.querySelector('[data-a=talent]'), n: (s.querySelector('.cx-n') || {}).textContent || '', inView: b.top >= 0 && b.bottom <= innerHeight && b.height >= 44 }; });
        await shot(page, size, label === '13' ? '7b-first-card' : '9-first-listcard');
        const drawn = await C(page, () => window.__lab.save.career.drawn.slice());
        const firstLine = fill(x.partFirst, { n: 2 });
        let ok;
        if (label === '13') ok = ended && e0.ent.gain && e0.ent.gain.total === 100 && e0.ent.gain.first === 100 - spec.total && spec.total < 100 && e0.xp === 100 && e0.runs === 1 && e0.cxp === fill(x.endLine, { n: 100 }) &&
          m && m.h1 === fill(x.gainTitle, { n: 100 }) && m.li[m.li.length - 1] === firstLine &&
          up && k0 && k0.hd === fill(x.lvUp, { n: 2 }) && k0.got === x.drawGot && k0.cv === 1 && k0.n === '' && k0.talent && k0.inView && J(drawn) === '[2]';
        else ok = ended && e0.ent.gain && e0.ent.gain.total === spec.total && !e0.ent.gain.first && spec.total >= xpAt(3) && e0.xp === spec.total && lv >= 3 && !m.li.includes(firstLine) &&
          up && k0 && k0.hd === fill(x.lvList, { n: lv }) && k0.sub === fill(x.lvPts, { n: lv - 1 }) && k0.cv >= 2 && k0.cv <= lv - 1 && k0.got === fill(x.drawGotN, { n: k0.cv }) && k0.n === '' && k0.talent && k0.inView &&
          J(drawn) === J(Array.from({ length: lv - 1 }, (_, i) => i + 2));
        record(label, size, ok && !errs(page).length, `打完 ${ended} 結算「${e0.cxp}」gain ${J(e0.ent.gain)}（規格未保底 ${spec.total}、要 ${total}＝Lv${lv}）xp ${e0.xp}；明細 ${J(m)}；過場卡 ${up} ${J(k0)}；drawn ${J(drawn)}；${errTx(page)}`);
      } catch (e) { record(label, size, false, 'error ' + e.message); }
      await ctx.close();
    }
  }

  // ---------------------------------------------------------------- 14 攤位頂列樂歷細條（SPEC-I §7.3 b；不快轉＝停 3 秒照真的時間）
  if (want(14)) {
    const QN = Q('');
    const { ctx, page } = await newPage(browser, w, h, { dpr: SHOTS ? 2 : 1 });
    try {
      await openTitle(page, QN);
      await seedCareer(page, { career: { xp: 0 }, run: { ace: 'hall', idx: 0 }, runs: [RUN0] });
      await openTitle(page, QN); await jsClick(page, '[data-a=cont]'); await nightReady(page);
      const x = await CU(page);
      await C(page, () => { window.__said = []; const st = window.__lab.stage; if (!st.__sayW) { const o = st.say; st.say = function (id, t) { if (t) window.__said.push({ id, t: String(t) }); return o.apply(this, arguments); }; st.__sayW = true; } });
      const stallAt = async (pos, wins, streak) => {
        await C(page, ([p, wv, k]) => { window.__lab.jump(p); const r = window.__lab.run; r.stats.wins = wv; r.bestStreak = k; r.streak = k; window.DipLabEngine.stallSession(r, window.DipLabContent); window.__lab.money(r.money); window.__lab.go('night'); }, [pos, wins, streak]);
        await page.waitForFunction(() => window.DipLabStalls.state() && (document.querySelector('.st-pick .st-row') || document.querySelector('.lb-sheet.stall')), null, { timeout: 10000 }).catch(() => {});
        await sleep(900);
      };
      const strip = () => C(page, () => { const s = document.querySelector('.cx-live'); if (!s) return null; const r = s.getBoundingClientRect(), run = window.__lab.run, S = window.__lab.save;
        const L = window.DipLabEngine.careerLive(window.DipLabContent, run, { best: run.farBefore | 0, tier: run.tier | 0, xp: S.career.xp });
        // I-0 審查：細條＝現在放棄（重新推門）也拿得到的（ui careerRecord：quit、站著的這一位還沒打不算）
        const E = window.DipLabEngine, quit = E.careerGain(window.DipLabContent, E.runSummary(run), { best: run.farBefore | 0, tier: run.tier | 0, quit: true, open: !E.posFought(run) }).total;
        const rows = [...document.querySelectorAll('.st-pick .st-row, .st-pick [data-a=leave]')].map(e => e.getBoundingClientRect().bottom), bl = document.querySelector('.lb-bagline').getBoundingClientRect();
        return { up: s.classList.contains('up'), t: s.querySelector('.t').textContent, lv: +s.dataset.lv, L, quit, n: +s.dataset.n, top: Math.round(r.top), bottom: Math.round(r.bottom), w: Math.round(r.width), sw: s.scrollWidth - s.clientWidth,
          rowsIn: rows.length > 0 && Math.max(...rows) <= bl.top + 1, xp: S.career.xp }; });
      await stallAt(6, 5, 0);
      const s1 = await strip(), sc1 = await noScroll(page);
      await shot(page, size, '4-stall-live');
      await stallAt(11, 10, 6);
      const t0 = Date.now(), s2 = await strip();
      await shot(page, size, '5-stall-liveup');
      await sleep(Math.max(0, 1200 - (Date.now() - t0)));
      await tapAt(page, '.cx-live'); await sleep(200);
      const s3 = await strip();
      await sleep(Math.max(0, 3300 - (Date.now() - t0)));
      await tapAt(page, '.cx-live'); await sleep(250);
      const s4 = await strip();
      const said = await C(page, () => window.__said.filter(o => o.id === 'o').map(o => o.t));
      // 重新整理（攤位還在）：第一次畫＝不閃
      await openTitle(page, QN); await jsClick(page, '[data-a=cont]');
      await page.waitForFunction(() => document.querySelector('.cx-live'), null, { timeout: 15000 }).catch(() => {});
      await sleep(600);
      const s5 = await strip();
      const ok = s1 && !s1.up && s1.lv === 1 && s1.L.level === 1 && s1.L.n > 0 && s1.t === fill(x.live, { n: s1.L.n }) && s1.sw <= 0 && s1.rowsIn && scrollOk(sc1) &&
        s1.n === s1.quit && s1.L.n === s1.n && s2 && s2.n === s2.quit && s2.L.n === s2.n &&
        s2 && s2.up && s2.lv === 2 && s2.t === fill(x.liveUp, { n: 2 }) && s2.rowsIn && s3 && s3.up && s4 && !s4.up && s4.t === fill(x.live, { n: s2.L.n }) &&
        !said.some(t => /Lv|樂歷/.test(t)) && s4.xp === 0 && s5 && !s5.up && s5.lv === 2;
      record(14, size, ok && !errs(page).length, `第一次 ${J(s1)} ${J(sc1)}；跨級 ${J(s2)}；1.2 秒點 ${J(s3 && { up: s3.up, t: s3.t })}；3.3 秒點 ${J(s4 && { up: s4.up, t: s4.t })}；老闆 ${J(said)}；重新整理 ${J(s5 && { up: s5.up, lv: s5.lv })}；${errTx(page)}`);
    } catch (e) { record(14, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 15 升級章＋第一次升級（SPEC-I §7.2；不快轉、autoNext 關）
  if (want(15)) {
    const QN = Q('');
    const { ctx, page } = await newPage(browser, w, h, { dpr: SHOTS ? 2 : 1 }); await watchToasts(page);
    try {
      await openTitle(page, QN);
      await seedRun(page, { ace: 'pearl', idx: 0, autoNext: false });
      await openTitle(page, QN); await jsClick(page, '[data-a=cont]'); await nightReady(page); await sleep(500);
      const L = await C(page, () => Object.assign({}, window.DipLabContent.trial.levelUp));
      // 每句記下說的那一刻畫面上還有哪些吐司、哪些泡泡（I-0 審查：第一次升級那句不能被戰利品列第一次那句的吐司蓋住、也不能把那句的泡泡收掉）
      await C(page, () => { window.__said = []; const st = window.__lab.stage; if (!st.__sayW) { const o = st.say; st.say = function (id, t) { if (t) window.__said.push({ id, t: String(t), at: Date.now(),
        toasts: [...document.querySelectorAll('.lb-toast:not(.out)')].map(e => e.textContent), bub: [...document.querySelectorAll('.ds-say')].map(e => e.textContent) }); return o.apply(this, arguments); }; st.__sayW = true; } });
      const firstLoot = await C(page, () => window.DipLabContent.waveC.ui.firstLoot.split('$')[0].split('{')[0]);   // 「包包越厚，好牌越難抽到。不收也有 」
      const r0 = await C(page, () => { const r = window.__lab.run; return { level: r.level, xp: r.xp, maxHp: r.maxHp, hp: r.hp }; });
      // 打一場（這一手一定剋中、扣到 0）；揭曉停住就點他的名牌
      const win = async () => {
        await tapReady(page, '[data-a=go]');
        await duelReady(page, 25000);
        await page.waitForFunction(() => !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
        await sleep(400);
        await C(page, () => { window.__lab.force({ kind: 'counter', toE: 99, toP: 0 }); const E = window.DipLabEngine, Cn = window.DipLabContent, d = window.__lab.rawDuel(); window.DipLabDuel.api().play(E.policies.thoughtful(d, E.makeRng(9), {}, Cn)); });
        let ch = null, t1 = 0;
        for (let g = 0; g < 100; g++) {
          if (await page.$('.dl .lb-lvch')) { t1 = Date.now(); ch = await C(page, () => ({ t: document.querySelector('.dl .lb-lvch .st').textContent, scr: window.__lab.screen(), screen: window.__lab.screen() })); break; }
          if (await C(page, () => window.__lab.screen() === 'reward')) break;
          if (await C(page, () => window.DipLabDuel.api() && window.DipLabDuel.api().waiting())) await tapAt(page, '.dl .dl-e .nmrow').catch(() => {});
          await sleep(200);
        }
        return { ch, t1 };
      };
      const w1 = await win();
      await sleep(600); await shot(page, size, '1-levelup-chapter');
      await sleep(Math.max(0, 3200 - (Date.now() - w1.t1)));
      const held = await C(page, () => ({ ch: !!document.querySelector('.dl .lb-lvch'), scr: window.__lab.screen(), lvl: window.__lab.run.level }));
      if (w1.ch) await tapAt(page, '.dl .lb-lvch');
      const toReward = await waitScreen(page, 'reward', 10000);
      const loot = await page.waitForSelector('.lb-sheet.reward', { timeout: 8000 }).then(() => true, () => false);
      await page.waitForFunction(() => { const L = window.DipLabLoot && window.DipLabLoot.state(); return !L || (L.open && L.flipped.every(Boolean) && !L.busy); }, null, { timeout: 10000 }).catch(() => {});
      await sleep(400); await shot(page, size, '2-levelup-loot');
      // 像真玩家看一下戰利品列：等老闆第一次那句（firstLoot；375 寬是吐司）出來、再過 1 秒才按「不收」→ 升級面板開的時候那句還在
      const lootSaid = await page.waitForFunction(() => window.__lab.save.seen.firstLoot, null, { timeout: 8000 }).then(() => true, () => false);
      await sleep(1000);
      await tapReady(page, '.lb-sheet.reward [data-a=skip]');
      const lvUp = await page.waitForSelector('.lb-sheet.level [data-lv]', { timeout: 8000 }).then(() => true, () => false);
      const tLv = Date.now(), seen0 = await C(page, () => !!window.__lab.save.seen.lv1);
      const lvSaid = await page.waitForFunction(() => window.__lab.save.seen.lv1, null, { timeout: 10000, polling: 100 }).then(() => true, () => false);
      const waited = Date.now() - tLv;
      await sleep(1200); await shot(page, size, '3-levelup-panel');
      const p = await C(page, () => { const s = document.querySelector('.lb-sheet.level'); if (!s) return null; const b = [...s.querySelectorAll('[data-lv]')].map(x => x.getBoundingClientRect());
        return { h3: s.querySelector('.hd h3').textContent, sub: s.querySelector('.hd .sub').textContent, order: [...s.querySelectorAll('[data-lv]')].map(x => x.dataset.lv), inView: b.every(r => r.top >= 0 && r.bottom <= innerHeight && r.height >= 44),
          seen: !!window.__lab.save.seen.lv1, stored: !!JSON.parse(localStorage.getItem('dipGameLab_v1')).seen.lv1 }; });
      const said1 = await C(page, () => window.__said.filter(o => o.id === 'o').map(o => o.t));
      const at1 = await C(page, t => window.__said.filter(o => o.t === t), L.first);
      const loot1 = await C(page, t => window.__said.filter(o => o.t.indexOf(t) === 0).length + (window.__toasts || []).filter(x => x.indexOf(t) === 0).length, firstLoot);
      await tapReady(page, '.lb-sheet.level [data-lv="atk"]');
      await nightReady(page); await sleep(600);
      const r1 = await C(page, () => { const r = window.__lab.run; return { level: r.level, xp: r.xp, maxHp: r.maxHp, atk: r.atk }; });
      // 第 2 位：2/5 經驗，不升級＝沒有章
      const w2 = await win();
      const toReward2 = await waitScreen(page, 'reward', 12000);
      const r2 = await C(page, () => { const r = window.__lab.run; return { level: r.level, xp: r.xp }; });
      const said = fill(L.first, {});
      const ok = w1.ch && w1.ch.t === fill(L.chapter, { n: 2 }) && w1.ch.scr === 'duel' && held.ch && held.scr === 'duel' && toReward && loot && lvUp &&
        p && p.h3 === fill(L.title, { n: 2 }) && p.sub.indexOf(L.sub) < 0 && J(p.order) === '["atk","def","hp"]' && p.inView && p.seen && p.stored && said1.filter(t => t === said).length === 1 &&
        lootSaid && loot1 >= 1 && !seen0 && lvSaid && at1.length === 1 && !at1[0].toasts.length && !at1[0].bub.some(t => t.indexOf(firstLoot) === 0) &&
        r0.level === 1 && r1.level === 2 && r1.xp === 0 && r1.maxHp === r0.maxHp && r1.atk === 1 && !w2.ch && toReward2 && r2.level === 2 && r2.xp === 2;
      record(15, size, ok && !errs(page).length, `第 1 位 章 ${J(w1.ch)}、3.2 秒 ${J(held)} → 戰利品列 ${toReward}/${loot}（firstLoot ${lootSaid}×${loot1}）→ 升級面板 ${lvUp} ${J(p)}；` +
        `第一次那句 面板開時 seen ${seen0}、等 ${waited} ms 才說、說的那一刻 ${J(at1.map(o => ({ toasts: o.toasts, bub: o.bub })))}；老闆 ${J(said1)}；開打前 ${J(r0)} → 挑品味 ${J(r1)}；第 2 位 章 ${J(w2.ch)} ${J(r2)}；${errTx(page)}`);
    } catch (e) { record(15, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 16 曲線改了補級（SPEC-I §7.5）＋樂歷頁
  if (want(16)) {
    const { ctx, page } = await newPage(browser, w, h, { dpr: SHOTS ? 2 : 1 }); await watchToasts(page);
    try {
      await openTitle(page, Q());
      await seedCareer(page, { career: { xp: 2000, drawn: [2, 3, 4, 5, 6] }, runs: [RUN0], best: { far: 1, checkpoints: [], bestStreak: 0 } });
      await openTitle(page, Q()); await sleep(1900);
      const x = await CU(page), t1 = await toasts(page);
      const card = await page.waitForSelector('.lb-sheet.cxcard', { timeout: 4000 }).then(() => true, () => false);
      const k0 = card ? await C(page, () => { const s = document.querySelector('.lb-sheet.cxcard'); return { hd: (s.querySelector('.cx-hd b') || {}).textContent, cv: s.querySelectorAll('.cx-got .lb-cv').length }; }) : null;
      if (card) { await jsClick(page, '.lb-sheet.cxcard .lb-btn[data-a=next]'); await sleep(500); }
      const d1 = await C(page, () => { const S = window.__lab.save; return { drawn: S.career.drawn.slice(), lexp: Object.keys(S.shelf).filter(id => S.shelf[id].src === 'lexp').length, stored: JSON.parse(localStorage.getItem('dipGameLab_v1')).career.drawn }; });
      await C(page, () => { window.__toasts.length = 0; });
      await openTitle(page, Q()); await sleep(2000);
      const t2 = await toasts(page), card2 = !!(await page.$('.lb-sheet.cxcard'));
      await C(page, () => window.__lab.openPage('career')); await sleep(700);
      const pg = await C(page, () => { const P = document.querySelector('.lb-page'); return P ? { lv: (P.querySelector('.cx-head .lv') || {}).textContent, pts: (P.querySelector('.cx-head .pts') || {}).textContent, lad: [...P.querySelectorAll('.cx-ladder li')].map(li => li.textContent), soon: P.querySelectorAll('.cx-ladder li.soon').length } : null; });
      await shot(page, size, '10-career-page');
      await C(page, () => { const s = document.querySelector('.lb-page .lb-scroll'), l = document.querySelector('.lb-page .cx-ladder'); if (s && l) s.scrollTop = l.getBoundingClientRect().top - s.getBoundingClientRect().top + s.scrollTop - 60; }); await sleep(300);
      await shot(page, size, '11-career-ladder');
      // 16b（I-0 審查）：同一次開機又入帳（lexpBank 有 C 版頁面記的 50）又補級：xp 250（舊曲線 Lv2、新曲線 Lv3、drawn [2]）→ 補級先跑（照入帳前的 xp）→ Lv3 補抽一張；
      //   入帳 +50 → 300 還是 Lv3（不再抽）；兩個吐司都出、過場卡 Lv3；重新整理不再補
      await C(page, () => { window.__toasts.length = 0; });
      await seedCareer(page, { career: { xp: 250, drawn: [2] }, runs: [RUN0], best: { far: 1, checkpoints: [], bestStreak: 0 }, lexpBank: { base: 50, gig: 0, home: 0, promo: 0, packet: 0, demo: 0, runs: 1 } });
      await openTitle(page, Q()); await sleep(1900);
      const t3 = await toasts(page);
      const card3 = await page.waitForSelector('.lb-sheet.cxcard', { timeout: 4000 }).then(() => true, () => false);
      const k3 = card3 ? await C(page, () => (document.querySelector('.lb-sheet.cxcard .cx-hd b') || {}).textContent) : null;
      if (card3) { await jsClick(page, '.lb-sheet.cxcard .lb-btn[data-a=next]'); await sleep(500); }
      const d3 = await C(page, () => { const S = window.__lab.save; return { xp: S.career.xp, drawn: S.career.drawn.slice(), bank: S.lexpBank.base, stored: JSON.parse(localStorage.getItem('dipGameLab_v1')).career.drawn }; });
      await C(page, () => { window.__toasts.length = 0; });
      await openTitle(page, Q()); await sleep(1500);
      const t4 = await toasts(page), card4 = !!(await page.$('.lb-sheet.cxcard'));
      const ok16b = t3.includes(fill(x.recurve, { n: 1 })) && t3.includes(fill(x.depositMore, { n: 50 })) && card3 && k3 === fill(x.lvUp, { n: 3 }) &&
        d3.xp === 300 && J(d3.drawn) === '[2,3]' && J(d3.stored) === '[2,3]' && d3.bank === 0 && !t4.length && !card4;
      const ok = t1.includes(fill(x.recurve, { n: 1 })) && card && k0 && k0.hd === fill(x.lvUp, { n: 7 }) && J(d1.drawn) === '[2,3,4,5,6,7]' && J(d1.stored) === J(d1.drawn) && d1.lexp <= 1 &&
        !t2.some(t => t === fill(x.recurve, { n: 1 })) && !card2 && pg && pg.lv === fill(x.title, { n: 7 }) && pg.pts === fill(x.points, { n: 6 }) && pg.soon === 0 && pg.lad.length === 8 && pg.lad.filter(t => t.indexOf(x.ladder.bgmShelf) >= 0).length === 1 && !pg.lad.some(t => /之後開放/.test(t)) && ok16b;
      record(16, size, ok && !errs(page).length, `吐司 ${J(t1)}；卡 ${card} ${J(k0)}；${J(d1)}；重新整理 吐司 ${J(t2)} 卡 ${card2}；樂歷頁 ${J(pg)}；` +
        `16b 入帳＋補級 吐司 ${J(t3)} 卡 ${card3} ${J(k3)} ${J(d3)}；重新整理 吐司 ${J(t4)} 卡 ${card4}；${errTx(page)}`);
    } catch (e) { record(16, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 17 升級面板三格固定（SPEC-I §7.1、§7.7「新」；快轉、forceWin＝不出章）
  //   兩個種子、兩段等級（Lv1→3、Lv6→8）各打贏一位連升兩級：每一次面板 DOM＝[品味, 底氣, 聲望上限]＝pending.offer 的順序、名字照 content、標題「升到 Lv n」；
  //   第一次挑聲望上限、第二次挑底氣 → 第二次面板順序不變；升到 Lv2 那次沒有「聲望上限 +1（自動）」，其他有
  if (want(17)) {
    const out = [];
    for (const [seedKey, lv0] of [['20261106', 1], ['20261121', 6]]) {
      const { ctx, page } = await newPage(browser, w, h);
      const o = { seedKey, lv0, panels: [] };
      try {
        await openTitle(page, Q());
        await seedRun(page, { seedKey, ace: 'pearl', idx: 1, level: lv0 });
        // 經驗＝這兩級要的－打贏這一位給的（剛好連升兩級、剩 0）
        o.xp = await C(page, L => { const E = window.DipLabEngine, Cn = window.DipLabContent, s = JSON.parse(localStorage.getItem('dipGameLab_v1')), r = s.run, T = E.trialCfg(Cn, r.tier);
          r.xp = E.xpNeed(T, L) + E.xpNeed(T, L + 1) - ((T.xp || {})[E.classAt(r.pos)] | 0); localStorage.setItem('dipGameLab_v1', JSON.stringify(s)); return r.xp; }, lv0);
        await openTitle(page, Q()); await jsClick(page, '[data-a=cont]'); await nightReady(page);
        const L = await C(page, () => Object.assign({}, window.DipLabContent.trial.levelUp));
        await tapReady(page, '[data-a=go]');
        await duelReady(page, 25000);
        await C(page, () => window.__lab.forceWin());
        await waitScreen(page, 'reward', 15000);
        await passLoot(page, { until: 'choice', ms: 10000 });
        for (const [i, pick] of [[0, 'hp'], [1, 'def']]) {
          const up = await page.waitForFunction(k => !!document.querySelector('.lb-sheet.level [data-lv]') && !document.querySelector('.lb-sheet.level.arming') &&
            window.__lab.run.pending && window.__lab.run.pending.type === 'level' && window.__lab.run.picks.length === k, i, { timeout: 12000 }).then(() => true, () => false);
          await sleep(500);
          const P = up ? await C(page, () => { const s = document.querySelector('.lb-sheet.level'), r = window.__lab.run, p = r.pending;
            return { h3: s.querySelector('.hd h3').textContent, sub: s.querySelector('.hd .sub').textContent, dom: [...s.querySelectorAll('[data-lv]')].map(b => b.dataset.lv),
              nm: [...s.querySelectorAll('[data-lv] .nm')].map(b => b.textContent), offer: (p.offer || []).map(x => x.pick), to: p.level, level: r.level }; }) : null;
          const want0 = lv0 + 1 + i;
          o.panels.push(Object.assign({ up, ok: !!P && J(P.dom) === '["atk","def","hp"]' && J(P.offer) === J(P.dom) && J(P.nm) === J([L.atk, L.def, L.hp]) && P.to === want0 &&
            P.h3 === fill(L.title, { n: want0 }) && (want0 === 2 ? P.sub.indexOf(L.sub) < 0 : P.sub.indexOf(L.sub) === 0) && P.level === lv0 + 2 }, P));
          if (up) await tapReady(page, `.lb-sheet.level [data-lv="${pick}"]`);
        }
        await nightReady(page, 15000);
        o.end = await C(page, () => { const r = window.__lab.run; return { level: r.level, xp: r.xp, picks: r.picks.slice(-2), pending: r.pending ? r.pending.type : null }; });
        o.ok = o.panels.length === 2 && o.panels.every(p => p.ok) && o.end.level === lv0 + 2 && o.end.xp === 0 && J(o.end.picks) === '["hp","def"]' && !errs(page).length;
      } catch (e) { o.error = e.message; o.ok = false; }
      o.errs = errs(page).length;
      out.push(o);
      await ctx.close();
    }
    record(17, size, out.every(o => o.ok), out.map(o => `種子 ${o.seedKey} Lv${o.lv0}（xp ${o.xp}）面板 ${J(o.panels.map(p => p.ok ? p.dom.join('/') + '→Lv' + p.to : Object.assign({}, p, { ok: undefined })))} → ${J(o.end)}${o.error ? ' error ' + o.error : ''}；錯誤 ${o.errs}`).join('｜'));
  }

  // ---------------------------------------------------------------- 19 老存檔第一次升級不說新手那句（I-0 審查；SPEC-I §7.2「第一次（第一趟）」）
  //   I-0 以前的存檔：runs 已經有一趟、seen 沒有 lv1 → 第 1 位打贏升到 Lv2：升級面板照出、老闆不說「打贏就會升級…」、seen.lv1 不記
  if (want(19)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await openTitle(page, Q());
      await seedRun(page, { ace: 'pearl', idx: 0 });
      await C(page, R0 => { const s = JSON.parse(localStorage.getItem('dipGameLab_v1')); s.runs = [R0]; localStorage.setItem('dipGameLab_v1', JSON.stringify(s)); }, RUN0);
      await openTitle(page, Q()); await jsClick(page, '[data-a=cont]'); await nightReady(page);
      const L = await C(page, () => Object.assign({}, window.DipLabContent.trial.levelUp));
      await C(page, () => { window.__said = []; const st = window.__lab.stage; if (!st.__sayW) { const o = st.say; st.say = function (id, t) { if (t) window.__said.push({ id, t: String(t) }); return o.apply(this, arguments); }; st.__sayW = true; } });
      await tapReady(page, '[data-a=go]');
      await duelReady(page, 25000);
      await C(page, () => window.__lab.forceWin());
      await waitScreen(page, 'reward', 15000);
      await passLoot(page, { until: 'choice', ms: 10000 });
      const up = await page.waitForSelector('.lb-sheet.level [data-lv]', { timeout: 12000 }).then(() => true, () => false);
      await sleep(6000);
      const o = await C(page, t => ({ said: window.__said.filter(x => x.t === t).length, seen: !!window.__lab.save.seen.lv1, runs: window.__lab.save.runs.length, level: window.__lab.run.pending && window.__lab.run.pending.level }), L.first);
      if (up) await tapReady(page, '.lb-sheet.level [data-lv="atk"]');
      await nightReady(page, 15000);
      const ok = up && o.said === 0 && !o.seen && o.runs === 1 && o.level === 2;
      record(19, size, ok && !errs(page).length, `升級面板 ${up}；6 秒內 ${J(o)}；${errTx(page)}`);
    } catch (e) { record(19, size, false, 'error ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 18 新帳號真的走第一趟（SPEC-I §7.2、§7.3 b、§7.7；不種存檔、快轉）
  //   序章（直接打）那場真的出牌打贏：沒有「升級！」章、沒有升級面板、到第 1 位時 runs 還是空的；
  //   第 1 位真的出牌打贏 →「升級！Lv2」章（對決畫面、在戰利品列之前；快轉照讀秒自己收）→ 戰利品列 → 升級面板（升到 Lv2、品味→底氣→聲望上限、沒有自動 +1 那行）、
  //   老闆第一次那句、save.seen.lv1 → 挑品味：聲望上限、聲望不變；第 2–5 位打完（forceWin＝不出章）→ 第一個攤位頂列細條金色「樂歷 Lv 2！這一趟結束就能點天賦」（＝careerLive、開局 Lv1）、
  //   沒有另跳老闆泡泡、career.xp 還是 0 → 第 6 位輸到結算 → runs 一筆、gain＝規格公式（新手 ×2；≥100 沒有保底那筆）、career.xp＝total
  if (want(18)) {
    const { ctx, page } = await newPage(browser, w, h);
    await page.addInitScript(() => {
      window.__ev = [];
      const look = n => {
        if (!n || n.nodeType !== 1) return;
        const r = window.__lab && window.__lab.run, base = { scr: window.__lab ? window.__lab.screen() : null, pos: r ? r.pos : null, pro: r ? r.prologue || null : null, at: Date.now() };
        const all = [n].concat([...n.querySelectorAll('.lb-lvch, .lb-sheet.reward, .lb-sheet.level')]);
        all.forEach(e => {
          if (!e.classList) return;
          if (e.classList.contains('lb-lvch')) window.__ev.push(Object.assign({ k: 'ch', t: (e.querySelector('.st') || e).textContent }, base));
          else if (e.classList.contains('lb-sheet') && e.classList.contains('reward')) window.__ev.push(Object.assign({ k: 'loot' }, base));
          else if (e.classList.contains('lb-sheet') && e.classList.contains('level')) window.__ev.push(Object.assign({ k: 'lv' }, base));
        });
      };
      const start = () => new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(look))).observe(document.documentElement, { childList: true, subtree: true });
      if (document.documentElement) start(); else document.addEventListener('DOMContentLoaded', start);
    });
    // 點到下一個停點（stop(s) 為真就回 s）：戰利品列「不收」、升級面板第一格、撿唱片第一張、配件第一件、過場卡繼續、對白往下
    const drain = async (stop, ms = 60000) => {
      const t0 = Date.now();
      while (Date.now() - t0 < ms) {
        const s = await C(page, () => { const r = window.__lab.run, p = r && r.pending; return { scr: window.__lab.screen(), one: !!document.querySelector('#panel > .lb-sheet.one [data-i]'),
          rel: !!document.querySelector('.lb-sheet.relics [data-r]'), rw: !!document.querySelector('#panel .lb-sheet.reward'), cx: !!document.querySelector('.lb-sheet.cxcard'),
          lv: !!document.querySelector('.lb-sheet.level [data-lv]') && !document.querySelector('.lb-sheet.level.arming'), nx: !!document.querySelector('.lb-dq .nx.on'),
          stall: !!(p && p.type === 'stall'), live: !!document.querySelector('.cx-live'), go: !!document.querySelector('.lb-night [data-a=go]') && !window.__lab.going(), pos: r ? r.pos : null }; });
        if (stop(s)) return s;
        if (s.rw) { await passLoot(page, { until: 'choice', ms: 8000 }); continue; }
        if (s.one) await jsClick(page, '#panel > .lb-sheet.one [data-i="0"]');
        else if (s.rel) await jsClick(page, '.lb-sheet.relics [data-r]');
        else if (s.cx) await jsClick(page, '.lb-sheet.cxcard .lb-btn[data-a=next]');
        else if (s.lv) await tapReady(page, '.lb-sheet.level [data-lv]');
        else if (s.nx) await jsClick(page, '.lb-dq');
        await sleep(s.one || s.rel || s.cx || s.lv ? 450 : 150);
      }
      return null;
    };
    // 真的出一手（這一手一定剋中、扣到 0），等離開對決畫面；揭曉停住就點他的名牌
    const playWin = async () => {
      const ready = await duelReady(page, 25000);
      await C(page, () => { window.__lab.force({ kind: 'counter', toE: 99, toP: 0 }); const E = window.DipLabEngine, Cn = window.DipLabContent, d = window.__lab.rawDuel();
        window.DipLabDuel.api().play(E.policies.thoughtful(d, E.makeRng(9), {}, Cn)); });
      let left = false;
      for (let g = 0; g < 200 && !left; g++) {
        left = await C(page, () => window.__lab.screen() !== 'duel');
        if (!left && await C(page, () => !!(window.DipLabDuel.api() && window.DipLabDuel.api().waiting()))) await tapAt(page, '.dl .dl-e .nmrow').catch(() => {});
        if (!left) await sleep(200);
      }
      await C(page, () => window.__lab.force(null));
      return ready && left;
    };
    try {
      await openTitle(page, Q());
      const fresh = await C(page, () => ({ runs: window.__lab.save.runs.length, xp: window.__lab.save.career.xp, lv1: !!window.__lab.save.seen.lv1 }));
      await page.click('[data-a=quiet]');
      const toDuel = await prologueToDuel(page, 'direct');
      await watchSay(page);
      const proWin = await playWin();
      const n1 = await drain(s => s.scr === 'night' && s.go, 90000);
      const p1 = await C(page, () => { const S = window.__lab.save, r = S.run; return { pos: r.pos, pro: r.prologue, level: r.level, xp: r.xp, maxHp: r.maxHp, hp: r.hp, runs: S.runs.length, live: !!document.querySelector('.cx-live') }; });
      const evPro = await C(page, () => window.__ev.slice());
      // 第 1 位：真的打贏
      const L = await C(page, () => Object.assign({}, window.DipLabContent.trial.levelUp));
      const x = await CU(page);
      await tapReady(page, '[data-a=go]');
      const w1 = await playWin();
      const rw = await waitScreen(page, 'reward', 15000);
      await passLoot(page, { until: 'choice', ms: 10000 });
      const lvUp = await page.waitForFunction(() => !!document.querySelector('.lb-sheet.level [data-lv]') && !document.querySelector('.lb-sheet.level.arming'), null, { timeout: 12000 }).then(() => true, () => false);
      // I-0 審查：第一次升級那句等吐司（錢那條、戰利品列那句）收掉才說 → 等它說了（快轉最多約 2 秒）
      await page.waitForFunction(() => window.__lab.save.seen.lv1, null, { timeout: 6000, polling: 100 }).catch(() => {});
      await sleep(300);
      const P = lvUp ? await C(page, () => { const s = document.querySelector('.lb-sheet.level'), r = window.__lab.run;
        return { h3: s.querySelector('.hd h3').textContent, sub: s.querySelector('.hd .sub').textContent, dom: [...s.querySelectorAll('[data-lv]')].map(b => b.dataset.lv), level: r.level, maxHp: r.maxHp, hp: r.hp,
          seen: !!window.__lab.save.seen.lv1, stored: !!(JSON.parse(localStorage.getItem('dipGameLab_v1')).seen || {}).lv1 }; }) : null;
      if (lvUp) await tapReady(page, '.lb-sheet.level [data-lv="atk"]');
      await nightReady(page, 15000);
      const r1 = await C(page, () => { const r = window.__lab.run; return { pos: r.pos, level: r.level, xp: r.xp, maxHp: r.maxHp, hp: r.hp, atk: r.atk }; });
      const ev1 = await C(page, () => window.__ev.slice());
      const said1 = await C(page, () => window.__said.filter(o => o.id === 'o').map(o => o.t));
      // 第 2–5 位：forceWin（不出章），點過戰利品列、升級面板、藏家那位的掉落，到第一個攤位
      const wins = [];
      let st = null;
      for (let k = 2; k <= 5 && !st; k++) {
        // 藏家那位（第 5 位）先有一段開場對白＋選單：點第一顆
        const g0 = await tapReady(page, '[data-a=go]', 8000);
        for (let g = 0; g < 200; g++) {
          if (await C(page, () => window.__lab.screen() === 'duel' && !!window.__lab.rawDuel())) break;
          if (await page.$('.lb-dq.hasmenu .lb-dqopt')) { await sleep(400); await jsClick(page, '.lb-dq .lb-dqopt[data-i="0"]'); await sleep(300); continue; }
          if (await page.$('.lb-dq .nx.on')) await jsClick(page, '.lb-dq');
          await sleep(200);
        }
        const dr = await duelReady(page, 25000);
        const fw = await C(page, () => window.__lab.forceWin());
        wins.push(g0 && dr && fw);
        const s = await drain(s => s.scr === 'night' && (s.live || (s.go && !s.stall)), 90000);
        if (k === 5) st = s;
      }
      await sleep(600);
      const said0 = await C(page, () => window.__said.length);
      const strip = await C(page, () => { const s = document.querySelector('.cx-live'); if (!s) return null; const run = window.__lab.run, S = window.__lab.save;
        const Lv = window.DipLabEngine.careerLive(window.DipLabContent, run, { best: run.farBefore | 0, tier: run.tier | 0, xp: S.career.xp });
        return { up: s.classList.contains('up'), t: s.querySelector('.t').textContent, lv: +s.dataset.lv, L: Lv, pos: run.pos, xp: S.career.xp, stall: !!(run.pending && run.pending.type === 'stall') }; });
      await sleep(1500);
      const saidSt = await C(page, n => window.__said.slice(n).filter(o => o.id === 'o').map(o => o.t), said0);
      // 第 6 位輸到結算
      await clearStall(page);
      await nightReady(page, 15000);
      await C(page, () => window.__lab.loseNext(1, { noRetry: true }));
      await jsClick(page, '[data-a=go]');
      const ended = await loseToEnd(page);
      const e0 = await C(page, () => { const S = window.__lab.save; return { xp: S.career.xp, runs: S.runs.length, ent: S.runs[S.runs.length - 1] }; });
      const spec = e0.ent ? gainSpec(e0.ent, 0) : { total: -1 };
      // 事件順序：序章沒有章／升級面板；第 1 位那場：章（對決畫面）→ 戰利品列 → 升級面板
      const chPro = evPro.filter(e => e.k === 'ch' || e.k === 'lv');
      const ev1New = ev1.slice(evPro.length), iCh = ev1New.findIndex(e => e.k === 'ch'), iLoot = ev1New.findIndex(e => e.k === 'loot'), iLv = ev1New.findIndex(e => e.k === 'lv');
      const ch = iCh >= 0 ? ev1New[iCh] : null;
      const ok = fresh.runs === 0 && fresh.xp === 0 && !fresh.lv1 && toDuel && proWin && n1 && !chPro.length && p1.pos === 1 && p1.pro === 'done' && p1.level === 1 && p1.xp === 0 && p1.runs === 0 && !p1.live &&
        w1 && rw && ch && ch.t === fill(L.chapter, { n: 2 }) && ch.scr === 'duel' && ev1New.filter(e => e.k === 'ch').length === 1 && iLoot > iCh && iLv > iLoot &&
        lvUp && P && P.h3 === fill(L.title, { n: 2 }) && P.sub.indexOf(L.sub) < 0 && J(P.dom) === '["atk","def","hp"]' && P.level === 2 && P.maxHp === p1.maxHp && P.seen && P.stored &&
        said1.filter(t => t === L.first).length === 1 && r1.pos === 2 && r1.level === 2 && r1.xp === 0 && r1.maxHp === p1.maxHp && r1.atk === 1 &&
        wins.length === 4 && wins.every(Boolean) && st && st.stall && strip && strip.stall && strip.pos === 6 && strip.up && strip.L.from === 1 && strip.L.level === 2 && strip.lv === 2 &&
        strip.t === fill(x.liveUp, { n: 2 }) && strip.xp === 0 && !saidSt.some(t => /Lv|樂歷/.test(t)) &&
        ended && e0.runs === 1 && e0.ent && e0.ent.gain && e0.ent.gain.total === spec.total && spec.total >= xpAt(2) && !e0.ent.gain.first && e0.xp === spec.total;
      record(18, size, ok && !errs(page).length, `新帳號 ${J(fresh)}；序章 對決 ${toDuel} 打贏 ${proWin} → 第 1 位 ${n1 && true} ${J(p1)}、序章事件 ${J(chPro)}；` +
        `第 1 位 打贏 ${w1} 章 ${J(ch)}（順序 章 ${iCh}／戰利品 ${iLoot}／升級 ${iLv}）面板 ${J(P)} 老闆 ${J(said1)} → ${J(r1)}；第 2–5 位 ${J(wins)} → 攤位細條 ${J(strip)} 老闆 ${J(saidSt)}；` +
        `第 6 位輸 ${ended} ${J({ xp: e0.xp, runs: e0.runs, gain: e0.ent && e0.ent.gain })}（規格 ${spec.total}）；${errTx(page)}`);
    } catch (e) { record(18, size, false, 'error ' + e.message); }
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
