// game-lab/tests/e2e-market.mjs：第 I 波 I-3a 市集殼（scratchpad v5/wave-i SPEC-I §6.8、§6.7 M5／P3、§10；引擎契約 build3/CONTRACT.md）端對端測試。測試棒。
//   SPEC-I §6.8 說它「取代 e2e-stall」：施工期間出貨 C.waveC.stall.mode 還是 'pick'（C 波二選一＝緊急退回），e2e-stall 照測 pick；這支一律帶 ?market=1（＝市集）。
//   11-23 主線開旗標（mode 'market' 出貨）：這支不再帶 ?market=1（照出貨預設＝市集）；C 波對照（#12 的 pick 那組）帶 ?market=0；e2e-stall 一律帶 ?market=0。
//   I-3b 的攤（唱片醫生、熱美式／高粱、轉蛋機）與算命心情題在 #15（11-23 I-3b 畫面棒）。
//   需要靜態伺服器：cd dip-vinyl-shop && python3 -m http.server 8765
//   node game-lab/tests/e2e-market.mjs
//   環境變數（見 e2e-lib.mjs）：LAB_BASE／LAB_URL；LAB_SIZES（這支預設 390x664,375x548）；MK_ONLY＝只跑這幾項（例 1,4）；
//     MARKET_PREV＝「上一版頁面」的 git ref（第 8 項退版；預設 630cffbca＝I-3a 開工時的 main，?v=95）：game-lab-prev/ 底下的請求由這支直接用
//     `git show <ref>:game-lab/<檔>` 回應（跟 game-lab/ 同源＝localStorage 共用；同 e2e-lineup 的 LINEUP_PREV）
//
// 攤位格、攤位面板的鈕一律真點（touchscreen.tap 打在看得到的那一點）；把 run 擺到某一場市集前（跳位、開市集）用 engine。
// 每個尺寸：
//   1  §6.8-1 每一趟第一個市集（真的打完第 5 位藏家 → 寶箱 → 升級之後）：沒有左右兩列、固定 5 攤＋錄音室（免費）一次攤開、月亮 3 顆全亮、
//      頂列有樂歷細條（.cx-live 搬進月亮那列）；鏡頭 market、亮起的島台格在面板上方、頂欄下方看得到（量矩形）；小人只走一次到 browse；
//      P3 每趟第一個市集必點 ≤2：收攤 → 確認（這一趟第一次、剩 3 個時段）先按「再逛逛」不動 → 收攤＋確認 → +$900、錄音室沒去＝自動錄 demo（樂歷 +15、吐司）→ 來客畫面「下一位」
//   2  §6.8-2 算命攤翻籤（第一個市集：藏家／菁英／誰帶王牌）：打開就翻第一張（不扣錢、月亮 −1）→ 第 2 張 $1,000 → 第 3 張 $2,000；翻滿停住等點（2 秒後還在）
//      → 「記下了」回攤位格、這攤打勾；籤的內容跟 guestDef 牌組（＝trialDeck／deckPub）對得上；島台三張籤；收攤後籤記在來客條那幾位頭像上、點頭像看得到那一句
//   3  §6.8-2 凶籤（打完第 40 位那一輪，固定種子表裡天然出凶籤；也有「菁英最大那張」）：第 3 張＝凶籤（紅框）→ 那位一般客人品味 +1（guestDef）、
//      收攤後他的頭像紅標「凶」、點頭像紅字那一句；「菁英最大那張」＝菁英牌組裡總星最大（加星後、不含王牌）那張、頭像面板寫專輯名
//   4  冬瓜茶（飲料攤）、小物攤（配件那半）、挖寶攤不自己翻（等點）、回攤位不扣時段、時段用完的格子、點島台那一箱＝進那一攤、點收音機＝「先逛完今晚的市集。」：
//      冬瓜茶聲望 +fair.drinks.tea.hp（不超過上限；sim 棒 11-22 定 2）、只有冬瓜茶一杯、免費、月亮 −1、自動回攤位格；挖寶 2.5 秒後還蓋著 → 回攤位（不扣）→ 再進同一批 →
//      （v6 第 7 條盲挑，店主 11-28）沒有「再翻一次」、背面寫那色星數 ≥5 → 點一張＝只翻那張、收進包包、另外兩張還蓋著（沒有鈕）、停住等點「回攤位」→ 自動回；小物攤兩件 $3,000 → 買一件自動回；
//      時段用完：沒去過的格子灰、點了出「今晚的時段用完了。」、收攤鈕不寫錢、直接收（不問）
//   5  §6.8-4 錄音室兩種＋中繼點：沒旗標＝點錄音室格直接錄 demo（樂歷 +15、不扣時段、不出面板）；?fac=1＝試錄派樹下一格（面板＝studioOffer、挑一格 trialNodes／tal、不扣時段）
//      → 下一個中繼點那條路線不再出；中繼點 7 格（5 攤＋黑膠特賣＋錄音室）、月亮 4 顆、黑膠特賣（改名）「回攤位」不扣
//   6  §6.8-5 收攤：這一趟第一次但只剩 1 個時段＝不問、+$300；第二次收攤（剩 3 個）不問、+$900；P3 一般輪必點 ≤2（收攤＋就這五張）、中繼點 ≤3（+$1,200、自動 demo）
//   7  §6.7 M5 全點一般輪 ≤10 下：會讀的策略（engine cPolicy，跟畫面「自動」同一個；全點＝每個時段都用掉〔slotMin −9〕、算命翻滿〔flips 3〕、錢夠）照它的選擇真點，
//      從攤位格出現點到「下一位」出現（含收攤、上場面板「就這五張」＝P3 也算它）；挖寶「收這張」＝翻那一張＋收（2 下）；算命翻滿＝打開＋2 張＋「記下了」（停住等點）。
//      第 15、25 位之後兩輪都量（固定種子表：第 25 位之後那輪策略在同業調貨買兩張＋回攤位）
//      主線裁定（11-23 RULING「I-3a 市集殼收尾」M5 判法）：上場面板「就這五張」那一下歸 P3（#6）、不算市集點擊 → 判「市集點擊 ≤10」、上場面板那一下 ≤1
//   8  §6.8-6 退版：市集 pending 的存檔（攤位格、一攤開著〔算命翻了第 1 張〕兩種）→ 上一版頁面（main，沒有市集）載入 → run 不作廢、照 C 波跑一組（挖寶＋宵夜）→ 回來客、主控台 0 錯；
//      回新頁面照常（沒有 pending、0 錯）
//   9  §6.8-7 重新整理停在攤位面板：挖寶開著（翻了一張、沒收）→ 重新整理 → 同一攤同一批貨、月亮數對、這攤沒打勾；算命翻到第 2 張 → 重新整理 → 兩張翻開、第 3 張的鈕、月亮 −1
//   10 §6.8-8 版面（兩尺寸；375×548 為準）：攤位格（第一個市集 6 格、樂歷 Lv4＋寄賣領取＋踢館帖 9 格）與每一種攤位面板：店不捲、面板 ≤ 可視高 55%、不蓋頂欄、
//      攤位格每格 ≥100×64、鈕 ≥44 px（攤位格、收攤、面板底部的鈕、翻籤、飲料、試錄格）；攤位格、算命、飲料、錄音室面板自己不捲
//   11 §6.8-9 活店（?crowd=1）：島邊三位熟客 → 開市集 → 導演 market 模式（still＋market 旗標）、12 秒內島邊一個人都沒有、沒人站在亮起的島台格前；
//      逛攤（進出兩攤）6 秒後還是沒人回島邊；收攤 → market 旗標收起
//   12 樂歷階梯（§11 第 7 列；市集模式才列、才給）：Lv7 帳號開一趟（talentArgs）→ run.marketTiles 6／fortuneFree 1／digN 4；一般輪 6 攤；算命第 2 張「免費」不扣錢；
//      挖寶四張（第 4 張不限色）；?market=0（C 波）同一個帳號 talentArgs 沒有這三鍵、ladderList 不列、第一個市集照 C 波兩列
//   14 修正棒（11-22 審查）：扣時段的格子右上小月亮、第二行不寫「免費」（不花錢／打開就翻一張）、免費攤才有「免費」角標、頂列「時段」；挖寶「點一張翻開」（翻了一張收掉）；
//      冬瓜茶島台倒一杯（isle.pour）、市集吐司靠右上（.mk）；算命翻滿而且沒別的攤＝「記下了，收攤」一下收攤；踢館帖／錄音室試錄有「回攤位」（不扣、還能再進）；
//      時段用完＝島台只亮免費攤；寄賣那張還在外面＝寄賣攤寫原因、鈕灰；375 店裡唱盤／黑膠特賣「回攤位」看得到（底那條黏底）
//   13 抽攤規則（§6.2-6、-7、-8；content stall.fair）：三個種子 × 打完第 5〜200 位每一輪：第一個市集＝固定組＋錄音室；一般輪 5 攤（marketTiles 6＝6 攤）不重複、
//      只出 weights 裡的、花錢攤 ≤ paidMax、至少一攤藍框、公關片／寄賣照解鎖位數；中繼點＝5 攤＋黑膠特賣＋錄音室、時段 4；畫面藍框格＝stall.blue
//   15 第 I 波 I-3b（?newstalls=1；算命攤接心情題庫）：a 唱片醫生、b 飲料三杯＋來客條杯子＋對決底氣、c 轉蛋六格、d 算命心情題、e 新面板版面（細節見那一段）
//   #1–#14 一律帶 &mood=0（算命攤不接題庫＝題庫抓不到的退路＝I-3a 原樣）
//      （I-3b 測試棒 11-23 補）f 高粱（換掉熱美式、品味 +1、每位第一次被剋多扣 1、第二次不扣、杯子 2→1→沒了）、g 切磋不扣杯數（?crowd=1&enc=force；切磋裡照樣底氣 +1）、
//      h 題庫抓不到（路由擋 ../mood-quiz.json＝照 I-3a 翻籤；擋 ../mood-bank.json＝三題照問、翻滿照 I-3a 停住）、i 想要清單滿 200（只唸不加、寫那句）、a 加引擎「第 4 張重壓被擋」（pressMax）
//   16 §6.7 M5 全點（?newstalls=1、算命接題庫＝出貨的樣子）：照 #7 的判法（cPolicy slotMin −9、flips 3；上場面板那一下歸 P3；11-27 主線 M5 改判：每攤做滿 ≤7、一般輪市集點擊 ≤16），第 15、25 位之後兩輪（照抽）
//      ＋打完第 35 位那輪（一般輪）固定 唱片醫生／小物攤（轉蛋）／算命／飲料／挖寶、主力聽膩＋新到一張（新三攤一定被策略挑到）；逐攤點擊數、不算題庫多問那一下的點擊數只列
//   每項最後看主控台 0 錯誤。任何 FAIL → exit 1。
import path from 'path';
import { execFileSync } from 'child_process';
import { launch, newPage, SIZES as SIZES0, record, results, sleep, Q, URL0, SEED, jsClick, waitScreen, duelReady, tapAt, tapReady, seededContinue, openTitle, advanceUntil,
  noScroll, scrollOk, passLoot, stallState, clearStall, luSkip, seedRun, tapHot } from './e2e-lib.mjs';

const SIZES = process.env.LAB_SIZES ? SIZES0 : [[390, 664], [375, 548]];
const ONLY = (process.env.MK_ONLY || '').split(',').filter(Boolean).map(Number);
const want = n => !ONLY.length || ONLY.includes(n);
const C = (page, f, a) => page.evaluate(f, a);
const J = x => JSON.stringify(x);
const errs = page => (page._errors || []).filter(e => !/favicon/.test(e));
const errTxt = page => `錯誤 ${errs(page).length}${errs(page).length ? '：' + errs(page).slice(0, 2).join(' / ').slice(0, 200) : ''}`;
const fill = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (o[k] != null ? o[k] : m));
const mtx = n => Number(n).toLocaleString('en-US');
const QM = (x = '') => Q('&fast=1&mood=0&newstalls=0' + x);   // 第 I 波 I-3a（11-23）出貨＝市集（content stall.mode 'market'）：不再帶 ?market=1（原本 '&fast=1&market=1'），照出貨預設跑
//   I-3b 開旗標（11-27，fair.newStalls 出貨 true）：#1–#14 驗的是 I-3a 市集殼 → 一律帶 &newstalls=0（同 engine.test #37 的 MK 拷貝新攤關）；新攤在 #15／#16
//   第 I 波 I-3b（11-23）：算命攤接心情題庫（不看 newStalls）＝翻每一張先問一題。#1–#14 測的是 I-3a 那條路＝題庫抓不到（?mood=0，同一條退路），一律帶 &mood=0；
//   題庫那條路、唱片醫生、熱美式／高粱、轉蛋機在 #15（?newstalls=1；不帶 mood=0）
// 字（C.waveC.ui＋攤名：市集模式 fairStations 蓋過 stations）
const UI = page => C(page, () => { const W = window.DipLabContent.waveC; return Object.assign({}, W.ui, { st: Object.assign({}, W.stations, W.fairStations), fair: W.stall.fair, gearPrice: W.stall.gearPrice, demoLexp: W.stall.demoLexp, heal: (window.DipLabContent.trial.ui || {}).heal }); });

// 頁面一載入就記吐司（.lb-toast）
async function watchToasts(page) {
  await page.addInitScript(() => {
    window.__toasts = []; window.__toastKilled = [];               // killed＝還沒淡出（沒有 .out）就被拿掉＝玩家看不到（修正棒：收攤 demo 吐司原本同一毫秒被清掉）
    const start = () => new MutationObserver(ms => ms.forEach(m => { m.addedNodes.forEach(n => { if (n.classList && n.classList.contains('lb-toast')) window.__toasts.push(n.textContent); });
      m.removedNodes.forEach(n => { if (n.classList && n.classList.contains('lb-toast') && !n.classList.contains('out')) window.__toastKilled.push(n.textContent); }); }))
      .observe(document.documentElement, { childList: true, subtree: true });
    if (document.documentElement) start(); else document.addEventListener('DOMContentLoaded', start);
  });
}
const toasts = page => C(page, () => (window.__toasts || []).slice());
const toastMark = page => C(page, () => (window.__toasts || []).length);
const toastsSince = (page, k) => C(page, k => (window.__toasts || []).slice(k), k);

// 種一趟（第 1 位、hall）→ 標題「繼續」→ 來客畫面。o.q：網址；o.extra：多塞幾張進包包（上場制那幾輪要挑）
async function start(page, o = {}) {
  await seededContinue(page, Object.assign({ ace: 'hall', idx: 0, autoNext: true }, o.seed || {}), o.q || QM());
  await waitScreen(page, 'night', 20000); await sleep(800);
  if (o.extra) await C(page, n => { const r = window.__lab.run, Cn = window.DipLabContent; const ex = Object.keys(Cn.cards).filter(id => !Cn.cards[id].tier && !Cn.cards[id].pool && r.bag.indexOf(id) < 0).slice(30, 30 + n); r.bag.push(...ex); window.__lab.money(r.money); }, o.extra);
}
// 把 run 擺到「打完第 after 位」那一場市集（engine.jumpTo → 改 run → stallSession → 改 pending → 存檔 → 來客畫面）
//   o.money；o.run（蓋進 run 的欄位，stallSession 之前）；o.fac（run.fac 空樹）；o.tiles（蓋掉攤位格：[攤…]，免費格照 o.free）；o.leave（這一趟已收攤幾次）
async function marketAt(page, after, o = {}) {
  const r0 = await C(page, o => {
    const r = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent;
    E.jumpTo(r, Cn, o.after + 1);
    if (o.run) Object.assign(r, o.run);
    if (o.fac) r.fac = { picks: {}, tal: {}, trialNodes: {} };
    E.stallSession(r, Cn);
    const p = r.pending;
    if (o.tiles) { p.free = (o.free || []).slice(); p.tiles = o.tiles.concat(p.free); }
    if (o.leave != null) r.stats.c.leave = o.leave;
    window.__lab.money(o.money != null ? o.money : 20000);       // 順便存檔
    window.__lab.go('night');
    return { mode: p.mode, tiles: p.tiles.slice(), free: p.free.slice(), slots: p.slots, left: p.left, first: p.first, cp: p.cp, pos: r.pos, due: r.lineupDue === true };
  }, Object.assign({ after }, o));
  await gridReady(page);
  await sleep(500);
  return r0;
}
// 攤位格／面板畫好之後鏡頭還會動 0.3 秒（fitPick／cam，面板高度跟著變、格子跟著移）：位置連續 3 次（每 80 ms）沒動才算停好（真點才不會點到移位前的那一格）
const settle = (page, sel, ms = 2500) => page.waitForFunction(([sel]) => {
  const e = document.querySelector(sel); if (!e) return false;
  const b = e.getBoundingClientRect(), k = [b.left, b.top, b.width, b.height].map(Math.round).join(','), W = window;
  if (W.__stK !== k) { W.__stK = k; W.__stN = 0; return false; }
  return ++W.__stN >= 3;
}, [sel], { timeout: ms, polling: 80 }).then(() => true, () => false);
const gridReady = (page, ms = 10000) => page.waitForFunction(() => { const s = window.DipLabStalls.state(); return !!s && s.mode === 'market' && s.phase === 'grid' && !!document.querySelector('.st-mk .st-mt') && !document.querySelector('.lb-sheet.stall'); }, null, { timeout: ms })
  .then(() => settle(page, '.st-mk .st-mgrid')).then(() => true, () => false);
const sheetReady = (page, kind, ms = 8000) => page.waitForFunction(k => { const s = window.DipLabStalls.state(), e = document.querySelector('.lb-sheet.stall.st-mk.st-k-' + k); return !!s && (s.phase === 'station' || s.phase === 'hold') && !!e && !e.closest('.arming') && !e.classList.contains('arming'); }, kind, { timeout: ms })
  .then(() => settle(page, '.lb-sheet.stall.st-mk.st-k-' + kind)).then(() => true, () => false);
// 市集的狀態（pending、畫面、月亮、攤位格）
const mk = page => C(page, () => {
  const r = window.__lab.run, p = r && r.pending, s = window.DipLabStalls.state(), sh = document.querySelector('.lb-sheet.stall.st-mk');
  const moons = sel => { const m = [...document.querySelectorAll(sel)]; return { n: m.length, lit: m.filter(x => !x.classList.contains('off')).length }; };
  return {
    screen: window.__lab.screen(), cam: window.__lab.cam(), money: r ? r.money : null, hp: r ? r.hp : null, maxHp: r ? r.maxHp : null, pos: r ? r.pos : null,
    mode: p && p.type === 'stall' ? (p.mode || 'pick') : null,
    p: p && p.type === 'stall' && p.mode === 'market' ? { tiles: p.tiles.slice(), free: p.free.slice(), slots: p.slots, left: p.left, went: Object.assign({}, p.went), acts: Object.assign({}, p.acts), seen: Object.keys(p.seen || {}), cur: p.cur ? p.cur.kind : null, key: p.cur ? p.cur.key : null, cards: p.cur && p.cur.cards ? p.cur.cards.slice() : null, n: p.cur ? p.cur.n : null } : null,
    phase: s ? s.phase : null, hold: !!(s && s.hold), kind: s ? s.kind : null,
    grid: [...document.querySelectorAll('.st-mk .st-mt')].map(b => ({ k: b.getAttribute('data-k'), nm: (b.querySelector('.nm') || {}).textContent || '', pr: (b.querySelector('.pr') || {}).textContent || '', fr: !!b.querySelector('.fr'), went: b.classList.contains('went'), dis: b.disabled, off: b.getAttribute('aria-disabled') === 'true', ck: !!b.querySelector('.ck') })),
    leave: (document.querySelector('.st-mk [data-a=leave]') || {}).textContent || null, leavePri: !!document.querySelector('.st-mk .st-mleave.pri'),
    moons: moons('.st-mk .st-mtop .st-moon'), sheetMoons: moons('.lb-sheet.stall.st-mk .st-shd .st-moon'),
    sheet: sh ? { kind: (sh.className.match(/st-k-(\w+)/) || [])[1], name: (sh.querySelector('.st-shd h3 span') || {}).textContent || '' } : null,
    ask: (document.querySelector('.st-mk .st-ask') || {}).textContent || null, rows: document.querySelectorAll('.st-pick .st-row').length,
    go: !!document.querySelector('[data-a=go]'), lineup: !!document.querySelector('#panel > .lb-sheet.lineup')
  };
});
// 點不到（tapReady 等 5 秒還被蓋著／不在）＝記下是誰蓋住（page._miss），細節裡印出來
async function tapOr(page, sel) {
  const ok = await tapReady(page, sel);
  if (!ok) {
    const why = await C(page, sel => {
      const e = document.querySelector(sel); if (!e) return { sel, none: true, st: window.DipLabStalls && window.DipLabStalls.state() };
      const b = e.getBoundingClientRect(), t = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2);
      return { sel, rect: [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)], dis: !!e.disabled, arming: !!e.closest('.arming'), on: t ? (t.id || t.className || t.tagName).toString().slice(0, 60) : null, st: window.DipLabStalls && window.DipLabStalls.state() };
    }, sel);
    (page._miss || (page._miss = [])).push(why);
  }
  return ok;
}
const missTxt = page => (page._miss && page._miss.length ? `；點不到 ${J(page._miss.slice(0, 3)).slice(0, 600)}` : '');
async function enter(page, kind) {
  await settle(page, '.st-mk .st-mgrid');
  await tapOr(page, `.st-mk .st-mt[data-k="${kind}"]`);
  await page.waitForFunction(k => { const s = window.DipLabStalls.state(); return !s || s.phase !== 'grid' || (window.__lab.run.pending && window.__lab.run.pending.went[k]); }, kind, { timeout: 5000 }).catch(() => {});
  await sleep(350);
}
// 面板裡的鈕：375×548 面板 ≤55%、放不下的面板自己捲（店裡唱盤、黑膠特賣…）——鈕在面板可視範圍外＝先把面板捲到看得到（＝玩家用手指捲），記在 window.__scrolled
async function tapIn(page, sel) {
  await C(page, sel => {
    const e = document.querySelector(sel), sh = e && e.closest('.lb-sheet'); if (!e || !sh) return;
    const a = e.getBoundingClientRect(), b = sh.getBoundingClientRect();
    if (a.top >= b.top - 0.5 && a.bottom <= b.bottom + 0.5) return;
    sh.scrollTop += a.bottom > b.bottom ? a.bottom - b.bottom + 4 : a.top - b.top - 4;
    (window.__scrolled || (window.__scrolled = [])).push(sel);
  }, sel);
  return tapOr(page, sel);
}
const tapSheet = async (page, sel) => { const ok = await tapIn(page, '.lb-sheet.stall.st-mk ' + sel); await sleep(350); return ok; };
// 收攤（收攤鈕 → 有確認就按「收攤」）→ 市集收掉；上場面板開著＝照預設按「就這五張」。回 { asked, taps, cash, lineup }
async function leaveMarket(page, o = {}) {
  const m0 = await C(page, () => window.__lab.run.money), c0 = page._clicks;
  await tapOr(page, '.st-mk [data-a=leave]');
  await sleep(400);
  const ask = await C(page, () => (document.querySelector('.st-mk .st-ask') || {}).textContent || null);
  if (ask) { await tapOr(page, '.st-ask [data-a=leaveYes]'); await sleep(300); }
  await page.waitForFunction(() => { const p = window.__lab.run.pending; return !(p && p.type === 'stall'); }, null, { timeout: 8000 }).catch(() => {});
  const m1 = await C(page, () => window.__lab.run.money);
  const lu = o.keepLineup ? false : await luSkip(page, 2500);
  const go = await page.waitForFunction(() => window.__lab.screen() === 'night' && !!document.querySelector('[data-a=go]') && !document.querySelector('#panel > .lb-sheet.lineup'), null, { timeout: 8000 }).then(() => true, () => false);
  return { ask, taps: page._clicks - c0, cash: m1 - m0, lineup: lu, go };
}
// 島台幾何：亮起（沒去過）的那幾箱看得到的那一塊（美術座標 → CSS）的上下緣 vs 面板上緣、頂欄下緣
const isleGeo = page => C(page, () => {
  const S = window.__lab.stage, X = window.DipLabStalls, rr = e => e ? e.getBoundingClientRect() : null;
  const stage = rr(document.getElementById('stage')), top = rr(document.querySelector('.lb-top')), sheet = rr(document.querySelector('.lb-sheet.stall'));
  const ask = rr(document.querySelector('.st-night')) || rr(document.querySelector('.lb-panel'));
  const panelTop = sheet ? sheet.top : ask ? ask.top : null;
  const cells = X.isle().filter(c => !c.went).map(c => { const R = S.shop.hotRegion(c.hot), b = R ? R.box : null; if (!b) return { k: c.kind, hot: c.hot, none: true };
    return { k: c.kind, hot: c.hot, y0: Math.round(S.cssOf(0, b[1]).y + stage.top), y1: Math.round(S.cssOf(0, b[1] + b[3]).y + stage.top) }; });
  return { panelTop: panelTop == null ? null : Math.round(panelTop), topBot: top ? Math.round(top.bottom) : 0, cells, state: S.isleState() };
});
const isleOk = g => g.cells.length > 0 && g.cells.every(c => !c.none && c.y1 <= g.panelTop + 1 && c.y0 >= g.topBot - 1);
// 版面：店不捲、面板高、頂欄、鈕高（主要的鈕；牌卡裡的小鈕不算）、攤位格每格大小、面板自己捲不捲
const layout = page => C(page, () => {
  const a = document.getElementById('app'), de = document.documentElement, rr = e => e.getBoundingClientRect();
  const all = [...document.querySelectorAll('.lb-sheet.stall')], sheet = all[all.length - 1] || null, top = document.querySelector('.lb-top'), vh = window.visualViewport ? Math.min(innerHeight, visualViewport.height) : innerHeight;
  const foot = sheet && sheet.querySelector('.foot'), footVis = !foot || rr(foot).bottom <= rr(sheet).bottom + 0.5;
  const vis = e => { const b = rr(e); return b.width > 0 && b.height > 0 && getComputedStyle(e).visibility !== 'hidden'; };
  const sel = '.st-mk .st-mt, .st-mk .st-mleave, .st-ask .lb-btn, .lb-sheet.stall.st-mk .foot .lb-btn, .lb-sheet.stall.st-mk .st-slip .lb-btn, .lb-sheet.stall.st-mk .st-cup, .lb-sheet.stall.st-mk .st-node, .lb-sheet.stall.st-mk .lb-opts > .lb-btn, .lb-sheet.stall.st-mk .lb-tabs button';
  const btns = [...document.querySelectorAll(sel)].filter(vis).map(b => { const r = rr(b); return { c: (b.className || '').split(' ').slice(0, 3).join('.'), a: b.getAttribute('data-a') || b.getAttribute('data-k') || '', w: Math.round(r.width), h: Math.round(r.height) }; });
  const tiles = [...document.querySelectorAll('.st-mk .st-mt')].filter(vis).map(b => { const r = rr(b); return [Math.round(r.width), Math.round(r.height)]; });
  const grid = document.querySelector('.st-pick.st-mk');
  return { app: a.scrollHeight - a.clientHeight, docY: de.scrollHeight - innerHeight, docX: de.scrollWidth - innerWidth, vh: Math.round(vh), nSheets: all.length, footVis,
    sheetH: sheet ? Math.round(rr(sheet).height) : null, sheetTop: sheet ? Math.round(rr(sheet).top) : null, sheetScroll: sheet ? sheet.scrollHeight - sheet.clientHeight : 0,
    topBot: top ? Math.round(rr(top).bottom) : 0, btns, small: btns.filter(b => b.h < 44), tiles, gridScroll: grid ? grid.scrollHeight - grid.clientHeight : 0,
    gridIn: grid ? rr(grid).bottom <= innerHeight + 1 && rr(grid).top >= 0 : null };
});

// ---- 上一版頁面（MARKET_PREV 的 game-lab，路徑 game-lab-prev/）----
const HERE = path.dirname(new URL(import.meta.url).pathname);
const REPO = path.resolve(HERE, '../..');
const PREV = process.env.MARKET_PREV || '630cffbca5e37fdb9ff862611eb246bc335ce497';
const D_DIR = new URL('.', URL0), P_DIR = new URL('../game-lab-prev/', D_DIR);
const QP = (extra = '&fast=1') => `${P_DIR.href}index.html?debug=1&seed=${SEED}${extra}`;
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
  await ctx.route(u => u.origin === P_DIR.origin && u.pathname.startsWith(P_DIR.pathname), async route => {
    const p = decodeURIComponent(new URL(route.request().url()).pathname.slice(P_DIR.pathname.length)) || 'index.html';
    const b = p.includes('..') ? null : prevFile(p);
    if (!b) return route.fulfill({ status: 404, body: '' });
    return route.fulfill({ status: 200, contentType: MIME[path.extname(p).toLowerCase()] || 'application/octet-stream', body: b });
  });
}

// 打藏家（第 5 位）：照 e2e-stall
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
// 這一輪 5 位的牌組（guestDef：trialDeck 那一副、加星後；王牌另列）＋這一輪的籤應該寫什麼（引擎外重算一次）
const roundTruth = page => C(page, () => {
  const r = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent, r0 = (r.round - 1) * 5;
  const gs = r.order.map((id, j) => { const pos = r0 + j + 1, g = E.guestDef(r, Cn, id, pos), cls = E.classAt(pos);
    const ace = g.ace ? g.ace.id : cls === 'boss' && (r.bossCard || r.bossAce) ? (r.bossCard || Cn.aces[r.bossAce]) : null;
    const n = { c: 0, o: 0, h: 0 }; g.deck.forEach(c => { n[E.topAttr(c)]++; });
    const best = g.deck.slice().sort((x, y) => E.power(y) - E.power(x) || (x.id < y.id ? -1 : x.id > y.id ? 1 : 0))[0];
    return { pos, id, cls, ratio: n, ace, aceAttr: ace ? E.topAttr(Cn.cards[ace]) : null, atk: g.atk, omen: !!g.omen, deck: g.deck.map(c => c.id),
      top: best ? { card: best.id, c: E.star(best, 'c'), o: E.star(best, 'o'), h: E.star(best, 'h') } : null };
  });
  // 拿掉凶籤再算一次品味（凶籤那位 +omenAtk）
  const r2 = JSON.parse(JSON.stringify(r)); if (Array.isArray(r2.fortune)) r2.fortune = r2.fortune.filter(f => f.slip !== 'omen');
  gs.forEach(g => { g.atk0 = E.guestDef(r2, Cn, g.id, g.pos).atk; });
  return { r0, round: r.round, gs, fortune: JSON.parse(JSON.stringify(r.fortune)) };
});
// 籤 vs 重算的牌組
function slipOk(sl, T) {
  const g = pos => T.gs.find(x => x.pos === pos);
  if (!sl || sl.round !== T.round) return false;
  if (sl.slip === 'boss' || sl.slip === 'elite') { const x = g(sl.pos); return !!x && x.cls === sl.slip && x.id === sl.id && J(x.ratio) === J(sl.ratio) && (sl.slip !== 'boss' || sl.ace === x.ace); }
  if (sl.slip === 'aces') { const want = T.gs.filter(x => x.ace).map(x => ({ pos: x.pos, id: x.id, ace: x.ace, attr: x.aceAttr })); return J(want) === J(sl.list); }
  if (sl.slip === 'top') { const x = g(sl.pos); return !!x && x.cls === 'elite' && !!x.top && x.top.card === sl.card && x.top.c === sl.c && x.top.o === sl.o && x.top.h === sl.h && x.deck.includes(sl.card) && sl.card !== x.ace; }
  if (sl.slip === 'omen') { const x = g(sl.pos); return !!x && x.cls === 'normal' && x.id === sl.id && x.atk === x.atk0 + sl.atk && x.omen; }
  return false;
}
// 收攤後的來客條：每位頭像的籤標（ft）、凶標（om）、讀屏字
const guestMarks = page => C(page, () => [...document.querySelectorAll('.lb-night .nc')].map(b => ({ i: +b.getAttribute('data-i'), ft: !!b.querySelector('.st-mk.ft'), om: (b.querySelector('.st-mk.om') || {}).textContent || '', aria: b.getAttribute('aria-label') || '' })));
async function guestLines(page, i) {
  await tapReady(page, `.lb-night .nc[data-i="${i}"]`);
  await page.waitForSelector('.lb-sheet.float.guest', { timeout: 4000 }).catch(() => {});
  await sleep(400);
  const L = await C(page, () => [...document.querySelectorAll('.lb-sheet.float.guest .bl.ft')].map(x => ({ t: x.textContent, om: x.classList.contains('om') })));
  if (await page.$('.lb-sheet.float.guest [data-a=close]')) { await tapReady(page, '.lb-sheet.float.guest [data-a=close]'); await sleep(400); }
  return L;
}
// 會讀的策略（cPolicy）的一步 → 真點哪一顆（回 選擇器陣列；挖寶收這張＝先翻那張）
async function policyTaps(page, o) {
  return C(page, o => {
    const r = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent, p = r.pending, s = window.DipLabStalls.state();
    if (!p || p.type !== 'stall') return { done: true };
    const S = '.lb-sheet.stall.st-mk ';
    // 第 I 波 I-3b（#16；newStalls 關著、?mood=0 時這三條不會成立）：蛋掉出來了＝點蛋（轉滿那一下攤子關了也一樣）；算命心情題（打開前那一題、每翻一張前那一題）＝點第一個選項
    if (s && s.gacha && s.gacha.phase === 'egg') return { sel: [S + '[data-a=egg]'], ch: 'egg' };
    if (s && s.gacha && s.gacha.phase === 'spin') return { wait: true };
    if (s && (s.ask || s.moodQ)) return document.querySelector(S + '[data-mo]') ? { sel: [S + '[data-mo="0"]'], ch: 'mood' } : { wait: true };
    if (s && s.hold) return { sel: ['[data-a=noted],[data-a=notedLeave]'], ch: document.querySelector('[data-a=notedLeave]') ? 'notedLeave' : 'noted' };   // 修正棒：時段用完、沒別的攤＝「記下了，收攤」
    if (document.querySelector('.st-mk .st-ask')) return { sel: ['.st-ask [data-a=leaveYes]'], ch: 'leaveYes', grid: true };
    const ch = E.cPolicy(r, Cn, o); if (!ch) return { none: true };
    const q = id => '"' + String(id).replace(/["\\]/g, '\\$&') + '"';
    const docOn = id => (s && s.doc && s.doc.id === id ? [] : [S + `[data-doc=${q(id)}]`]);   // I-3b 唱片醫生：清潔墊上不是那張＝先點上面那一列換
    if (ch.type === 'stallEnter') return { sel: [`.st-mk .st-mt[data-k="${ch.kind}"]`], ch: 'enter ' + ch.kind, grid: true };
    if (ch.type === 'stallLeave') return { sel: ['.st-mk [data-a=leave]'], ch: 'leave', grid: true };
    const a = ch.act, cur = p.cur;
    switch (a) {
      case 'flip': return { sel: [S + '.st-slip.next .lb-btn[data-a=flip]'], ch: a };
      case 'wash': return { sel: docOn(ch.cardId).concat([S + '[data-a=wash]']), ch: a };                                  // I-3b
      case 'press': {   // 11-27 修正棒：點上面那一列「只能壓」的那張＝直接挑軸（不用再點「重壓」）
        const sw = docOn(ch.cardId), only = sw.length && !(cur.worn || []).includes(ch.cardId);
        return { sel: sw.concat(only ? [] : [S + '[data-a=press]'], [S + `[data-ax="${ch.attr}"]`]), ch: a + ' ' + ch.attr };
      }
      case 'gacha': return { sel: [S + '[data-a=gacha]'], ch: a };                                                       // 蛋：下一步（egg）
      case 'drink': return { sel: [S + `[data-drink="${ch.kind}"]`], ch: a };
      case 'take': {
        if (cur.kind === 'dig' && cur.blind) return { sel: [S + `[data-dig="${cur.cards.indexOf(ch.cardId)}"]`], ch: a + ' dig' };   // v6 盲挑：點那張背面＝收（之後停住等點「回攤位」＝hold）
        if (cur.kind === 'dig') { const i = cur.cards.indexOf(ch.cardId), up = !document.querySelector(S + `.st-c.st-down[data-k="${i}"]`); return { sel: (up ? [] : [S + `[data-flip="${i}"]`]).concat([S + `[data-take="${ch.cardId}"]`]), ch: a + ' dig' }; }
        return { sel: [S + `[data-take="${ch.cardId}"]`], ch: a };
      }
      case 'reroll': return { sel: [S + '[data-a=reroll]'], ch: a };
      case 'buyRelic': return { sel: [S + `[data-relic="${ch.relicId}"]`], ch: a };
      case 'relic': return { sel: [S + `[data-wrelic="${ch.relicId}"]`], ch: a };
      case 'buy': return { sel: [S + `[data-buy="${ch.cardId}"]`], ch: a };
      case 'ok': return { sel: [ch.cardId != null ? S + `[data-home="${ch.cardId}"]` : S + '[data-a=ok]'], ch: a };
      case 'consign': return { sel: [S + `[data-consign="${ch.cardId}"]`], ch: a };
      case 'tickets': {
        if (ch.n === 0) return { sel: [S + '[data-a=back]'], ch: 'back' };
        const keep = document.querySelector(S + '[data-a=gigKeep]') && E.gigKeepN(r, Cn) === ch.n;
        return { sel: keep ? [S + '[data-a=gigKeep]'] : Array(Math.max(0, ch.n - 1)).fill(S + '[data-a=gigPlus]').concat([S + '[data-a=gigBuy]']), ch: a + ' ' + ch.n };
      }
      case 'record': return { sel: [S + `[data-node="${ch.node}"]`], ch: a };
      case 'accept': return { sel: [S + `[data-dare="${ch.mode}"]`], ch: a };
      case 'decline': return { sel: [S + '[data-a=decline]'], ch: a };
      case 'done': return { sel: [S + (cur.kind === 'market' ? '[data-a=done]' : '[data-a=back]')], ch: a };
      default: return { sel: [S + '[data-a=back]'], ch: a };
    }
  }, o);
}

// ---- 第 I 波 I-3b 測試棒（#15f–#15i、#16）共用
// 來客條每位頭像下的小杯子（熱美式／高粱；最前面那位寫還剩幾位）
const cupsOf = page => C(page, () => [...document.querySelectorAll('.lb-night .nc')].map(n => { const c = n.querySelector('.st-cupm'); return c ? (c.textContent || 'c') : ''; }));
// 來客畫面「下一位」→ 對決開打
async function toDuel(page) {
  await tapReady(page, '[data-a=go]');
  await advanceUntil(page, () => window.__lab.screen() === 'duel' && !!window.__lab.rawDuel(), null, 30000);
  await page.waitForFunction(() => window.__lab.rawDuel() && !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
}
// 直接打贏這位 → 戰利品 → 回來客畫面（上場面板照預設）
async function winOne(page) {
  await C(page, () => window.__lab.forceWin());
  await passLoot(page, {});
  await page.waitForSelector('[data-a=go]', { timeout: 15000 }).catch(() => {}); await luSkip(page, 1500); await sleep(600);
}
// 對決裡的飲料（主線：E.view(run.duel)；切磋：對決畫面的 view）：view.drink、品味／底氣（對照：同一份 run 拿掉飲料的 playerDef）、品／底後面的小杯子與紅點（高粱那一下還沒扣）
const drinkView = page => C(page, () => {
  const E = window.DipLabEngine, Cn = window.DipLabContent, r = window.__lab.run, d = window.__lab.rawDuel(), dbg = window.DipLabDuel && window.DipLabDuel.debug && window.DipLabDuel.debug();
  const v = d ? E.view(d) : dbg && dbg.view; if (!v) return {};   // 切磋那場不在 run.duel：照對決畫面那一份 view
  const r2 = JSON.parse(JSON.stringify(r)); r2.drink = null; const b = E.playerDef(Cn, r2), ic = document.querySelector('.dl [data-st="drink"]');
  return { drink: v.drink || null, pAtk: v.pAtk | 0, pDef: v.pDef | 0, bAtk: b.atk | 0, bDef: b.def | 0, cup: !!ic, dot: !!(ic && ic.classList.contains('pen')) };
});
// 這一手「你被剋」的出法（你出 X、他出剋 X 的 Y＝setNext）：同一份對決的拷貝結算一次（＝預期）＋拿掉高粱再算一次（base）；先挑兩者剛好差 1 的（底氣折半可能吃掉那 1）
const counteredPlan = page => C(page, () => {
  const E = window.DipLabEngine, d = window.__lab.rawDuel(), beats = { o: 'c', c: 'h', h: 'o' }, cand = [];
  if (!d || d.over) return null;
  for (let i = 0; i < d.p.hand.length; i++) for (const X of ['c', 'o', 'h']) {
    if (!d.p.hand[i] || !E.isLegal(d, { i, attr: X })) continue;
    const Y = Object.keys(beats).find(k => beats[k] === X);
    for (let j = 0; j < d.e.hand.length; j++) {
      if (!d.e.hand[j]) continue;
      const a = JSON.parse(JSON.stringify(d)), ev = (E.resolveTurn(a, { i, attr: X }, { forcedPlay: { i: j, attr: Y } }) || []).find(e => e.t === 'clash');
      if (!ev || ev.kind !== 'countered' || !(ev.toP >= 1) || a.over) continue;
      const b = JSON.parse(JSON.stringify(d)); b.p.drinkPen = 0;
      const eb = (E.resolveTurn(b, { i, attr: X }, { forcedPlay: { i: j, attr: Y } }) || []).find(e => e.t === 'clash');
      cand.push({ i, X, j, Y, toP: ev.toP, base: eb ? eb.toP : null, notes: (ev.notes || []).filter(n => n && n.drink).map(n => n.text) });
    }
  }
  return cand.find(c => c.toP === c.base + 1) || cand[0] || null;
});
// 照計畫真點一手（點那張 → 點那色）：回 結果行（kind、toP、結果行小字）＋聲望實際掉多少（dp）
async function playPlan(page, pl) {
  const n0 = await C(page, p => { window.__lab.duelLab.setNext({ i: p.j, attr: p.Y }); return window.__lab.rawDuel().n; }, pl);
  const hp0 = await C(page, () => window.__lab.rawDuel().p.hp);
  await tapAt(page, `dt:card-${pl.i}`); await sleep(300);
  await tapAt(page, `.dl [data-tut="chip-${pl.i}-${pl.X}"]`);
  await page.waitForFunction(n0 => { const d = window.DipLabDuel.debug(), cl = d && d.last && (d.last.evs || []).find(e => e.t === 'clash'); return !!cl && cl.n === n0 && d.last.ui && d.last.ui.call.on; }, n0, { timeout: 8000 }).catch(() => {});
  const res = await C(page, () => { const d = window.DipLabDuel.debug(), cl = d && d.last && (d.last.evs || []).find(e => e.t === 'clash'); return cl ? { n: cl.n, kind: cl.kind, toP: cl.toP, notes: ((d.last.ct || {}).notes || []).slice() } : null; });
  await duelReady(page, 15000); await sleep(300);
  if (res) res.dp = hp0 - (await C(page, () => window.__lab.rawDuel().p.hp));
  return res;
}
// 算命心情題走一遍（點算命攤 → 三題各點一個 → 翻滿停住）：回 三題、心情、那張、段落是不是題庫原文、心情結果有沒有畫
async function moodFlow(page) {
  await enter(page, 'fortune');
  const qs = [];
  for (let k = 0; k < 3; k++) {
    if (!(await page.waitForSelector('.lb-sheet.stall [data-mo]', { timeout: 8000 }).then(() => true, () => false))) break;
    await settle(page, '.lb-sheet.stall');
    const q = await C(page, () => window.DipLabStalls.state().moodQ); qs.push(q);
    await tapSheet(page, `[data-mo="${k}"]`);
    await page.waitForFunction(q => { const s = window.DipLabStalls.state(); return !!s && (s.hold || (!!s.moodQ && s.moodQ !== q)); }, q, { timeout: 6000 }).catch(() => {});
  }
  const hold = await page.waitForFunction(() => { const s = window.DipLabStalls.state(); return !!s && s.hold; }, null, { timeout: 8000 }).then(() => true, () => false);
  await page.waitForSelector('.lb-sheet.stall .st-moodr', { timeout: 4000 }).catch(() => {});
  await settle(page, '.lb-sheet.stall'); await sleep(600);
  return C(page, async qs => {
    const r = window.__lab.run, s = window.DipLabStalls.state(), sh = document.querySelector('.lb-sheet.stall'), Cn = window.DipLabContent, E = window.DipLabEngine;
    const ps = (sh && sh.querySelector('.st-moodr .ps') || {}).textContent || '';
    let inBank = null, mood = null;
    try { const qz = await (await fetch('../mood-quiz.json')).json(), bk = await (await fetch('../mood-bank.json')).json(), c = s.mood && Cn.cards[s.mood.id], key = c ? (c.artist + '|' + c.album).toLowerCase() : '';
      mood = E.moodOf(qz, r.pending.moodAns); inBank = !!(bk.passages[key] && (bk.passages[key][s.mood && s.mood.mood] || []).includes(ps)); } catch (_) {}
    return { qs, hold: !!s.hold, moodr: !!(sh && sh.querySelector('.st-moodr')), mood: s.mood ? s.mood.mood : null, mood2: mood, id: s.mood ? s.mood.id : null, inBank, ans: r.pending.moodAns || null,
      noted: !!(sh && sh.querySelector('[data-a=noted],[data-a=notedLeave]')), ok: qs.length === 3 && new Set(qs).size === 3 && !!s.hold && !!s.mood && s.mood.mood === mood && inBank === true };
  }, qs);
}

async function runSize(browser, w, h) {
  const size = `${w}x${h}`;

  // ---------------------------------------------------------------- 1 每一趟第一個市集（真的打完第 5 位）＋P3 ≤2＋收攤確認
  if (want(1)) {
    const { ctx, page } = await newPage(browser, w, h); await watchToasts(page);
    try {
      await start(page, { seed: { idx: 4 } });
      const x = await UI(page);
      // 小人的走位（stage.walk／put 的 'p'）：從這裡起記
      await C(page, () => { const st = window.__lab.stage; window.__pw = []; ['walk', 'put'].forEach(m => { const o = st[m]; st[m] = function (id, to) { if (id === 'p') window.__pw.push([m, Array.isArray(to) ? to.join('>') : String(to)]); return o.apply(this, arguments); }; }); });
      await beatBoss(page);
      await passLoot(page, {});                                    // 寶箱不收 → 升級 → 來客畫面（市集）
      const gOk = await gridReady(page, 15000);
      await sleep(1600);                                           // 走到島台、鏡頭停好
      const s0 = await mk(page);
      const lx = await C(page, () => ({ top: !!document.querySelector('.st-mk .st-mtop .st-lxs .cx-live'), outside: [...document.querySelectorAll('.cx-live')].filter(e => !e.closest('.st-mtop')).length }));
      const geo = await isleGeo(page);
      const sc = await noScroll(page);
      const p0 = await C(page, () => { const p = window.__lab.stage.pos('p'), sp = window.__lab.stage.spot('browse'); return { p: [Math.round(p.x), Math.round(p.y)], sp, w: window.__pw.slice() }; });
      // 逛一攤（飲料：冬瓜茶）＝小人不再走
      await C(page, () => { window.__pw = []; window.__lab.run.hp = Math.max(1, window.__lab.run.maxHp - 4); });
      await enter(page, 'snack'); await tapSheet(page, '[data-drink=tea]'); await gridReady(page);
      const walk2 = await C(page, () => window.__pw.slice());
      // P3：收攤 → 確認（第一次、剩 2 個時段）先按「再逛逛」→ 不動；再收攤＋確認
      const k0 = await toastMark(page), c0 = page._clicks, m0 = await C(page, () => window.__lab.run.money), lx0 = await C(page, () => Object.values(window.__lab.run.lexp || {}).reduce((a, b) => a + b, 0));
      await tapReady(page, '.st-mk [data-a=leave]'); await sleep(500);
      const ask1 = await C(page, () => (document.querySelector('.st-mk .st-ask p') || {}).textContent || null);
      await tapReady(page, '.st-ask [data-a=leaveNo]'); await sleep(500);
      const back = await mk(page);
      const c1 = page._clicks;
      await tapReady(page, '.st-mk [data-a=leave]'); await sleep(500);
      const ask2 = await C(page, () => (document.querySelector('.st-mk .st-ask p') || {}).textContent || null);
      await tapReady(page, '.st-ask [data-a=leaveYes]');
      const night = await page.waitForFunction(() => window.__lab.screen() === 'night' && !!document.querySelector('[data-a=go]') && !(window.__lab.run.pending && window.__lab.run.pending.type === 'stall'), null, { timeout: 10000 }).then(() => true, () => false);
      const taps = page._clicks - c1;
      await sleep(600);
      const a = await C(page, () => ({ money: window.__lab.run.money, lexp: Object.values(window.__lab.run.lexp || {}).reduce((a, b) => a + b, 0), cam: window.__lab.cam(), leave: window.__lab.run.stats.c.leave, lineup: !!document.querySelector('#panel > .lb-sheet.lineup') }));
      const tt = await toastsSince(page, k0);
      const killed = await C(page, () => (window.__toastKilled || []).slice());
      const want6 = ['dig', 'fortune', 'snack', 'warehouse', 'home'].concat(['studio']);
      const okLook = gOk && s0.mode === 'market' && s0.rows === 0 && J(s0.p.tiles) === J(want6) && J(s0.p.free) === J(['studio']) && s0.p.slots === 3 && s0.p.left === 3 &&
        J(s0.grid.map(t => t.k)) === J(want6) && J(s0.grid.map(t => t.nm)) === J(want6.map(k => x.st[k])) && s0.grid.filter(t => t.fr).map(t => t.k).join() === 'studio' &&
        s0.moons.n === 3 && s0.moons.lit === 3 && !s0.go && lx.top && !lx.outside && scrollOk(sc) && s0.leave === fill(x.mkLeave, { n: mtx(900) });
      const okCam = s0.cam === 'market' && isleOk(geo) && geo.cells.length === 6;
      // 只走一次＝市集開了以後小人只往 browse 走（不像 C 波逐站走）：走位全部是 browse（來客畫面重畫時途中再下一次同一個終點也算同一趟）、逛攤時不再動、最後站在 browse
      const pw = p0.w.slice(p0.w.findIndex(c => c[0] === 'walk' || c[1] === 'browse'));
      const okWalk = Math.abs(p0.p[0] - p0.sp[0]) <= 2 && Math.abs(p0.p[1] - p0.sp[1]) <= 2 && pw.length >= 1 && pw.every(c => c[1] === 'browse') && !walk2.length;
      const okP3 = ask1 === fill(x.mkLeaveAsk, { k: 2, n: mtx(x.fair.slotCash) }) && back.phase === 'grid' && back.p.left === 2 && back.money === m0 && ask2 === ask1 && night && taps <= 2 &&
        a.money - m0 === 2 * x.fair.slotCash && a.lexp - lx0 === x.demoLexp && tt.includes(fill(x.mkDemoAuto, { n: x.demoLexp })) && !killed.includes(fill(x.mkDemoAuto, { n: x.demoLexp })) && a.leave === 1 && a.cam !== 'market';
      record(1, size, okLook && okCam && okWalk && okP3 && !errs(page).length,
        `攤位格 ${J(s0.grid.map(t => t.nm + (t.fr ? '(免費)' : '')))}、兩列 ${s0.rows}、月亮 ${s0.moons.lit}/${s0.moons.n}、樂歷細條在頂列 ${lx.top}（外面 ${lx.outside}）、收攤鈕「${s0.leave}」、店捲 ${J(sc)}；` +
        `鏡頭 ${s0.cam}、島台 ${geo.cells.length} 格在面板（${geo.panelTop}）上方／頂欄（${geo.topBot}）下方 ${isleOk(geo)} ${J(geo.cells.map(c => [c.k, c.y0, c.y1]))}；` +
        `小人 ${J(p0.p)}＝browse ${J(p0.sp)}、走位 ${J(p0.w)}（市集開了以後 ${J(pw)}）、逛攤後走位 ${J(walk2)}；` +
        `P3：確認「${ask1}」→ 再逛逛（${back.phase}、剩 ${back.p.left}）→ 收攤＋確認 ${taps} 下 → +$${a.money - m0}、樂歷 +${a.lexp - lx0}（自動 demo 吐司 ${tt.includes(fill(x.mkDemoAuto, { n: x.demoLexp }))}）、` +
        `回來客 ${night}、leave ${a.leave}、鏡頭 ${a.cam}；${errTxt(page)}${missTxt(page)}`);
    } catch (e) { record(1, size, false, 'exception ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 2 算命攤翻籤（第一個市集：藏家／菁英／誰帶王牌）
  if (want(2)) {
    const { ctx, page } = await newPage(browser, w, h); await watchToasts(page);
    try {
      await start(page);
      const x = await UI(page);
      const m = await marketAt(page, 5, { money: 9000 });
      const fp = x.fair.fortune.price;
      const st = [];
      await enter(page, 'fortune'); await sheetReady(page, 'fortune'); await sleep(400);
      st.push(await mk(page));
      const look1 = await C(page, () => { const s = document.querySelector('.lb-sheet.stall.st-k-fortune'); return { up: s.querySelectorAll('.st-slip.up').length, next: (s.querySelector('.st-slip.next .lb-btn[data-a=flip]') || {}).textContent || '', warn: (s.querySelector('.st-slip .warn') || {}).textContent || '' }; });
      await tapSheet(page, '.st-slip.next .lb-btn[data-a=flip]'); await sleep(300);
      st.push(await mk(page));
      const look2 = await C(page, () => { const s = document.querySelector('.lb-sheet.stall.st-k-fortune'); return { up: s.querySelectorAll('.st-slip.up').length, next: (s.querySelector('.st-slip.next .lb-btn[data-a=flip]') || {}).textContent || '' }; });
      await tapSheet(page, '.st-slip.next .lb-btn[data-a=flip]');
      await sleep(2000);                                           // 翻滿：停住等點（2 秒後還在）
      st.push(await mk(page));
      const look3 = await C(page, () => { const s = document.querySelector('.lb-sheet.stall.st-k-fortune'); return s ? { up: s.querySelectorAll('.st-slip.up').length, noted: (s.querySelector('[data-a=noted]') || {}).textContent || '', next: s.querySelectorAll('.st-slip.next').length } : null; });
      const isl = await C(page, () => window.__lab.stage.isleState());
      const T = await roundTruth(page);
      await tapSheet(page, '[data-a=noted]'); const g4 = await gridReady(page);
      st.push(await mk(page));
      const sl = T.fortune || [];
      // 收攤 → 來客條的籤標、點頭像的那一句
      const lv = await leaveMarket(page);
      await sleep(500);
      const marks = await guestMarks(page);
      const want = {}; sl.forEach(f => { (f.slip === 'aces' ? f.list.map(y => y.pos) : [f.pos]).forEach(pos => { want[pos - T.r0 - 1] = true; }); });
      const marksOk = marks.length === 5 && marks.every(g => g.ft === !!want[g.i] && !g.om) && marks.filter(g => g.ft).every(g => g.aria.includes(x.st.fortune));
      const bossI = T.gs.findIndex(g => g.cls === 'boss'), bossSl = sl.find(f => f.slip === 'boss');
      const bl = await guestLines(page, bossI);
      const bossLine = bossSl ? fill(x.mkSlipBoss, bossSl.ratio) : null;
      const s = st;
      const okFlow = m.first && s[0].sheet && s[0].sheet.kind === 'fortune' && s[0].sheet.name === x.st.fortune && s[0].p.n === 1 && s[0].money === 9000 && s[0].p.left === 2 && s[0].p.went.fortune === 1 &&
        s[0].sheetMoons.lit === 2 && look1.up === 1 && look1.next === fill(x.mkFlip, { n: mtx(fp[1]) }) &&
        s[1].p.n === 2 && s[1].money === 9000 - fp[1] && s[1].p.left === 2 && look2.up === 2 && look2.next === fill(x.mkFlip, { n: mtx(fp[2]) }) &&
        s[2].hold && s[2].phase === 'hold' && s[2].p.cur === null && s[2].money === 9000 - fp[1] - fp[2] && look3 && look3.up === 3 && look3.noted === x.fortuneOk && !look3.next &&
        g4 && s[3].phase === 'grid' && s[3].grid.find(t => t.k === 'fortune').went && s[3].grid.find(t => t.k === 'fortune').ck && s[3].moons.lit === 2;
      const okSlips = sl.length === 3 && J(sl.map(f => f.slip).sort()) === J(['aces', 'boss', 'elite']) && sl.every(f => slipOk(f, T)) &&
        !!isl && !!isl.slips && J(isl.slips.faces) === J(sl.map(f => f.slip)) && isl.slips.total === 3;
      const okMarks = lv.go && marksOk && bl.some(l => l.t.includes(bossLine) && !l.om);
      record(2, size, okFlow && okSlips && okMarks && !errs(page).length,
        `第一個市集 ${m.first}；打開＝翻第 1 張（翻開 ${look1.up}、錢 ${s[0].money}、月亮 ${s[0].p.left}/3、面板月亮 ${s[0].sheetMoons.lit}）、下一顆「${look1.next}」、第 3 張「${look1.warn}」；` +
        `第 2 張 −$${9000 - s[1].money}（「${look2.next}」）；第 3 張 −$${s[1].money - s[2].money} → 停住 2 秒 ${s[2].phase}（cur ${s[2].p.cur}、翻開 ${look3 && look3.up}、「${look3 && look3.noted}」）→ 攤位格、打勾 ${s[3].grid.find(t => t.k === 'fortune').ck}；` +
        `籤 ${J(sl.map(f => f.slip + (f.pos ? '@' + f.pos : '')))} 對得上牌組 ${sl.map(f => slipOk(f, T)).join('/')}；島台 ${J(isl && isl.slips)}；` +
        `收攤 ${J(lv)} → 頭像籤標 ${J(marks.map(g => g.ft ? g.i : null).filter(v => v != null))}（應 ${J(Object.keys(want).map(Number))}）、藏家那一句 ${bl.some(l => l.t.includes(bossLine))}；${errTxt(page)}${missTxt(page)}`);
    } catch (e) { record(2, size, false, 'exception ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 3 凶籤＋菁英最大那張（打完第 40 位那一輪）
  if (want(3)) {
    const { ctx, page } = await newPage(browser, w, h); await watchToasts(page);
    try {
      await start(page, { extra: 3 });
      const x = await UI(page);
      const m = await marketAt(page, 40, { money: 20000, leave: 1 });
      await enter(page, 'fortune'); await sheetReady(page, 'fortune');
      await tapSheet(page, '.st-slip.next .lb-btn[data-a=flip]');
      await tapSheet(page, '.st-slip.next .lb-btn[data-a=flip]'); await sleep(600);
      const s = await mk(page);
      const om = await C(page, () => { const e = document.querySelector('.lb-sheet.stall.st-k-fortune .st-slip.omen'); return e ? { t: e.textContent, red: getComputedStyle(e).borderTopColor } : null; });
      const T = await roundTruth(page);
      await tapSheet(page, '[data-a=noted]'); await gridReady(page);
      const sl = T.fortune || [], omen = sl.find(f => f.slip === 'omen'), top = sl.find(f => f.slip === 'top');
      const lv = await leaveMarket(page);
      await sleep(500);
      const marks = await guestMarks(page);
      const oi = omen ? omen.pos - T.r0 - 1 : -1, ti = top ? top.pos - T.r0 - 1 : -1;
      const ol = oi >= 0 ? await guestLines(page, oi) : [];
      const tl = ti >= 0 ? await guestLines(page, ti) : [];
      const album = top && top.card ? await C(page, id => window.DipLabContent.cards[id].album, top.card) : '';
      const og = omen ? T.gs.find(g => g.pos === omen.pos) : null;
      const okOmen = !!omen && sl.indexOf(omen) === 2 && s.hold && !!om && om.t.includes(fill(x.mkOmen, { pos: omen.pos, n: omen.atk })) && omen.atk === x.fair.fortune.omenAtk && slipOk(omen, T) &&
        !!og && og.atk === og.atk0 + 1 && marks[oi] && marks[oi].om === x.mkOmenTag && marks[oi].aria.includes(x.mkOmenTag) &&
        ol.some(l => l.om && l.t === fill(x.mkOmen, { pos: omen.pos, n: omen.atk }));
      const okTop = !!top && slipOk(top, T) && tl.some(l => l.t === fill(x.mkSlipTopIs, { album })) && marks[ti] && marks[ti].ft;
      record(3, size, m.tiles.includes('fortune') && okOmen && okTop && lv.go && !errs(page).length,
        `打完第 40 位：攤位格 ${J(m.tiles)}；籤 ${J(sl.map(f => f.slip + (f.pos ? '@' + f.pos : '')))}；凶籤（第 3 張 ${omen ? sl.indexOf(omen) === 2 : '-'}）紅框「${om && om.t}」、第 ${omen && omen.pos} 位品味 ${og && og.atk0}→${og && og.atk}（guestDef）、` +
        `頭像「${marks[oi] && marks[oi].om}」、讀屏含凶 ${!!(marks[oi] && marks[oi].aria.includes(x.mkOmenTag))}、點頭像紅字 ${ol.some(l => l.om)}；` +
        `菁英最大那張 ${top && top.card}（${top && [top.c, top.o, top.h].join('/')}）對得上 ${top && slipOk(top, T)}、頭像面板「${(tl.find(l => !l.om) || {}).t || ''}」；收攤 ${J(lv)}；${errTxt(page)}${missTxt(page)}`);
    } catch (e) { record(3, size, false, 'exception ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 4 冬瓜茶、小物攤、挖寶不自己翻、回攤位不扣、時段用完、點島台、點收音機
  if (want(4)) {
    const { ctx, page } = await newPage(browser, w, h); await watchToasts(page);
    try {
      await start(page, { extra: 3 });
      const x = await UI(page);
      const m = await marketAt(page, 35, { money: 20000, leave: 1, tiles: ['dig', 'gear', 'snack', 'home', 'promo'] });
      // 點收音機＝「先逛完今晚的市集。」
      let k0 = await toastMark(page);
      await C(page, () => window.__lab.stageAction('radio')); await sleep(400);
      const busyT = await toastsSince(page, k0);
      // 冬瓜茶：聲望 maxHp−2 → +2（不超過上限）、免費、月亮 −1、自動回
      await C(page, () => { const r = window.__lab.run; r.hp = r.maxHp - 2; window.__lab.money(r.money); });
      const h0 = await mk(page);
      await enter(page, 'snack'); await sheetReady(page, 'snack');
      const tea = await C(page, () => { const b = [...document.querySelectorAll('.lb-sheet.stall.st-k-snack [data-drink]')]; return b.length === 1 && b[0].getAttribute('data-drink') === 'tea' ? b[0].textContent : 'drinks:' + b.map(x => x.getAttribute('data-drink')).join(','); });
      const e1 = await mk(page);
      k0 = await toastMark(page);
      await tapSheet(page, '[data-drink=tea]'); const g1 = await gridReady(page);
      const t1 = await mk(page), teaT = await toastsSince(page, k0);
      // 挖寶：點島台那一箱（第 1 格）＝進挖寶攤；2.5 秒後還蓋著；回攤位（不扣）→ 再進同一批
      const isle = await C(page, () => window.DipLabStalls.isle());
      await C(page, hot => window.__lab.stageAction(hot), isle[0].hot); await sheetReady(page, 'dig');
      await sleep(2500);
      const d1 = await mk(page);
      const down1 = await C(page, () => document.querySelectorAll('.lb-sheet.stall.st-k-dig .st-c.st-down').length);
      await tapSheet(page, '[data-a=back]'); await gridReady(page);
      const d2 = await mk(page);
      await enter(page, 'dig'); await sheetReady(page, 'dig');
      const d3 = await mk(page);
      // v6 第 7 條盲挑：沒有「再翻一次」；背面那行＝顏色＋星數（≥5）；點第 2 張背面＝只翻那張、收進包包，另外兩張還蓋著、沒有鈕；停住等點「回攤位」
      const bl = await C(page, (x) => { const s = document.querySelector('.lb-sheet.stall.st-k-dig'), cur = window.__lab.run.pending.cur, E = window.DipLabEngine, Cn = window.DipLabContent;
        return { blind: !!cur.blind, reroll: !!s.querySelector('[data-a=reroll]'), note: (s.querySelector('.st-dtap') || {}).textContent || '', picks: s.querySelectorAll('[data-dig]').length,
          backs: [...s.querySelectorAll('.st-c.st-down .st-dcol')].map(e => e.textContent), want: cur.cards.map(id => { const c = Cn.cards[id], a = E.topAttr(c); return x.digBack.replace('{attr}', E.ZH[a]).replace('{n}', c[a]); }),
          five: cur.cards.every(id => { const c = Cn.cards[id]; return c[E.topAttr(c)] >= 5; }) }; }, x);
      const take = d3.p.cards[1];
      await tapSheet(page, '[data-dig="1"]'); await sleep(500);
      const sh = await C(page, (id) => { const s = document.querySelector('.lb-sheet.stall.st-k-dig'), r = window.__lab.run, st = window.DipLabStalls.state();
        return { got: s ? s.querySelectorAll('.st-c.st-got').length : -1, gotId: s && s.querySelector('.st-c.st-got') ? s.querySelector('.st-c.st-got').getAttribute('data-cid') : null, down: s ? s.querySelectorAll('.st-c.st-down.st-left').length : -1,
          btns: s ? s.querySelectorAll('[data-dig],[data-take]').length : -1, note: s ? (s.querySelector('.st-dtap') || {}).textContent : '', hold: st && st.hold, digGot: st && st.digGot,
          inBag: r.pending.cur === null && r.bag.includes(id), others: window.__lab.run.bag.filter(x => x !== id).length }; }, take);
      const othersIn = await C(page, (ids) => ids.some(id => window.__lab.run.bag.includes(id)), d3.p.cards.filter(id => id !== take));
      const down2 = sh.down;
      await tapSheet(page, '[data-a=noted]'); await gridReady(page);
      const d4 = await mk(page), bag1 = await C(page, id => window.__lab.run.bag.includes(id), take);
      // 小物攤：兩件 $3,000 → 買一件＝自動回、時段用完
      await enter(page, 'gear'); await sheetReady(page, 'gear');
      const gr = await C(page, () => { const p = window.__lab.run.pending; return { relics: p.cur.relics.slice(), btns: [...document.querySelectorAll('.lb-sheet.stall.st-k-gear [data-relic]')].map(b => b.getAttribute('data-relic')), name: (document.querySelector('.lb-sheet.stall.st-k-gear .st-shd h3 span') || {}).textContent }; });
      const mg0 = await C(page, () => window.__lab.run.money);
      await tapSheet(page, `[data-relic="${gr.btns[0]}"]`); await gridReady(page);
      const g5 = await mk(page), rel = await C(page, id => window.__lab.run.relics.includes(id), gr.btns[0]);
      // 時段用完：沒去過的格灰、點了出吐司、收攤不寫錢、不問
      k0 = await toastMark(page);
      await tapReady(page, '.st-mk .st-mt[data-k="home"]'); await sleep(500);
      const noSlot = await toastsSince(page, k0), g6 = await mk(page);
      const lv = await leaveMarket(page);
      const okTea = tea === fill(x.mkTea, { n: 2 }) && e1.p.left === 3 && g1 && t1.hp === t1.maxHp && t1.hp - h0.hp === 2 && t1.money === h0.money && t1.p.left === 2 && t1.p.went.snack === 1 && t1.phase === 'grid' &&
        teaT.some(t => t === fill(x.heal || '聲望 +{n}', { n: 2 }));
      const okBlind = bl.blind && !bl.reroll && bl.note === x.digPick && bl.picks === 6 && J(bl.backs) === J(bl.want) && bl.five &&
        sh.got === 1 && sh.gotId === take && sh.btns === 0 && sh.hold && sh.digGot === 1 && sh.inBag && !othersIn && sh.note === fill(x.digLeft, { n: 2 });
      const okDig = isle[0].kind === 'dig' && d1.sheet && d1.sheet.kind === 'dig' && down1 === 3 && d1.p.left === 2 && d2.p.left === 2 && !d2.p.went.dig && d2.p.seen.includes('dig') &&
        J(d3.p.cards) === J(d1.p.cards) && d3.p.key === d1.p.key && okBlind && down2 === 2 && d4.p.left === 1 && d4.p.went.dig === 1 && bag1 && d4.phase === 'grid';
      const okGear = gr.name === x.st.gear && gr.relics.length === 2 && J(gr.btns) === J(gr.relics) && g5.money === mg0 - x.gearPrice && rel && g5.p.left === 0 && g5.phase === 'grid';
      const okNo = g5.grid.filter(t => !t.went).every(t => t.off) && noSlot.includes(x.mkNoSlot) && g6.phase === 'grid' && g5.leave === x.mkLeaveNone && g5.leavePri && !lv.ask && lv.cash === 0 && lv.go;
      record(4, size, busyT.includes(x.mkBusy) && okTea && okDig && okGear && okNo && !errs(page).length,
        `點收音機 ${J(busyT)}；冬瓜茶「${tea}」聲望 ${h0.hp}→${t1.hp}/${t1.maxHp}、錢 ${h0.money}→${t1.money}、月亮 ${e1.p.left}→${t1.p.left}、自動回 ${t1.phase}；` +
        `點島台 ${isle[0].hot}→${d1.sheet && d1.sheet.kind}、2.5 秒後蓋著 ${down1}/3、回攤位月亮 ${d2.p.left}（seen ${d2.p.seen}）、再進同一批 ${J(d3.p.cards) === J(d1.p.cards)}；盲挑 ${bl.blind}、再翻鈕 ${bl.reroll}、「${bl.note}」、背面 ${J(bl.backs)}（5 星 ${bl.five}）→ 點第 2 張：翻開 ${sh.got}（${sh.gotId === take}）、` +
        `還蓋著 ${down2}、剩下的鈕 ${sh.btns}、停住 ${sh.hold}、「${sh.note}」、包包 ${sh.inBag}（另外兩張 ${othersIn ? '也進了' : '沒進'}）→ 回攤位 包包 ${bag1}、月亮 ${d4.p.left}；` +
        `小物攤「${gr.name}」${gr.relics.length} 件 −$${mg0 - g5.money} → 配件 ${rel}、月亮 ${g5.p.left}、自動回 ${g5.phase}；時段用完：灰格 ${g5.grid.filter(t => !t.went && t.off).map(t => t.k)}、點了 ${J(noSlot)}、收攤鈕「${g5.leave}」、問 ${!!lv.ask}、+$${lv.cash}；${errTxt(page)}${missTxt(page)}`);
    } catch (e) { record(4, size, false, 'exception ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 5 錄音室兩種＋中繼點（黑膠特賣）
  if (want(5)) {
    const out = {};
    { // 沒旗標：錄 demo
      const { ctx, page } = await newPage(browser, w, h); await watchToasts(page);
      try {
        await start(page);
        const x = await UI(page);
        await marketAt(page, 5, { money: 9000 });
        const lx0 = await C(page, () => Object.values(window.__lab.run.lexp || {}).reduce((a, b) => a + b, 0)), k0 = await toastMark(page);
        let sheet = false;
        await tapReady(page, '.st-mk .st-mt[data-k="studio"]');
        for (let i = 0; i < 10; i++) { if (await page.$('.lb-sheet.stall.st-k-studio')) sheet = true; await sleep(100); }
        await gridReady(page);
        const s = await mk(page), lx1 = await C(page, () => Object.values(window.__lab.run.lexp || {}).reduce((a, b) => a + b, 0)), tt = await toastsSince(page, k0);
        out.demo = { ok: !sheet && s.p.went.studio === 1 && s.p.left === 3 && lx1 - lx0 === x.demoLexp && tt.includes(fill(x.demo, { n: x.demoLexp })) && s.grid.find(t => t.k === 'studio').went && !errs(page).length,
          d: `沒旗標：面板 ${sheet}、樂歷 +${lx1 - lx0}、吐司 ${J(tt)}、月亮 ${s.p.left}/3、打勾 ${s.grid.find(t => t.k === 'studio').went}；${errTxt(page)}` };
      } catch (e) { out.demo = { ok: false, d: 'exception ' + e.message }; }
      await ctx.close();
    }
    { // ?fac=1：試錄；中繼點；黑膠特賣
      const { ctx, page } = await newPage(browser, w, h); await watchToasts(page);
      try {
        await start(page, { q: QM('&fac=1'), extra: 3 });
        const x = await UI(page);
        const m = await marketAt(page, 10, { money: 20000, fac: true });
        const s0 = await mk(page);
        const offer = await C(page, () => window.DipLabEngine.studioOffer(window.__lab.run, window.DipLabContent).map(n => n.id));
        // 黑膠特賣：進去 → 「回攤位」不扣
        await enter(page, 'market'); await sheetReady(page, 'market');
        const sale = await C(page, () => { const s = document.querySelector('.lb-sheet.stall.st-k-market'); return { name: (s.querySelector('.st-shd h3 span') || {}).textContent, done: (s.querySelector('[data-a=done]') || {}).textContent }; });
        await tapSheet(page, '[data-a=done]'); await gridReady(page);
        const s1 = await mk(page);
        // 錄音室：試錄面板
        await enter(page, 'studio'); await sheetReady(page, 'studio');
        const panel = await C(page, () => { const s = document.querySelector('.lb-sheet.stall.st-k-studio'); return { nodes: [...s.querySelectorAll('.st-node[data-node]')].map(b => b.getAttribute('data-node')), left: [...s.querySelectorAll('.note')].map(n => n.textContent), demo: (s.querySelector('[data-a=ok]') || {}).textContent }; });
        const k0 = await toastMark(page);
        const nd = panel.nodes[0];
        await tapSheet(page, `.st-node[data-node="${nd}"]`); await gridReady(page);
        const s2 = await mk(page), tt = await toastsSince(page, k0);
        const fac = await C(page, () => JSON.parse(JSON.stringify(window.__lab.run.fac)));
        const lv1 = await leaveMarket(page);
        // 下一個中繼點（打完第 20 位）：試過的那條路線不再出
        await marketAt(page, 20, { money: 20000 });
        const offer2 = await C(page, () => window.DipLabEngine.studioOffer(window.__lab.run, window.DipLabContent).map(n => n.id));
        await enter(page, 'studio'); await sheetReady(page, 'studio');
        const panel2 = await C(page, () => { const s = document.querySelector('.lb-sheet.stall.st-k-studio'); return { nodes: [...s.querySelectorAll('.st-node[data-node]')].map(b => b.getAttribute('data-node')), left: [...s.querySelectorAll('.note')].map(n => n.textContent) }; });
        await tapSheet(page, '[data-a=ok]'); await gridReady(page);
        const pathOf = id => String(id).replace(/\d+$/, '');
        const relayTiles = s0.p.tiles.filter(k => !s0.p.free.includes(k));
        out.fac = { ok: m.cp && s0.p.slots === 4 && s0.moons.n === 4 && s0.moons.lit === 4 && relayTiles.length === 6 && relayTiles[5] === 'market' && J(s0.p.free) === J(['studio']) && s0.grid.length === 7 &&
            s0.grid.find(t => t.k === 'market').nm === x.st.market && sale.name === x.st.market && sale.done === x.mkBack && s1.p.left === 4 && !s1.p.went.market &&
            offer.length >= 1 && J(panel.nodes) === J(offer) && panel.left.includes(fill(x.mkStudioLeft, { n: x.fair.studioMax })) && panel.demo === fill(x.mkStudioDemo, { n: x.demoLexp }) &&
            fac.trialNodes[nd] === 1 && fac.tal[nd] === 1 && s2.p.left === 4 && s2.p.went.studio === 1 && tt.some(t => t.startsWith(fill(x.mkRecord, { name: '' }))) && lv1.go &&
            !offer2.some(id => pathOf(id) === pathOf(nd)) && J(panel2.nodes) === J(offer2) && panel2.left.includes(fill(x.mkStudioLeft, { n: x.fair.studioMax - 1 })) && !errs(page).length,
          d: `?fac=1 中繼點 ${m.cp}：攤位格 ${J(s0.grid.map(t => t.nm))}、月亮 ${s0.moons.lit}/${s0.moons.n}；黑膠特賣「${sale.name}」鈕「${sale.done}」→ 月亮 ${s1.p.left}；` +
            `試錄面板 ${J(panel.nodes)}＝studioOffer ${J(offer)}、${J(panel.left)} → 錄 ${nd}：trialNodes ${J(fac.trialNodes)}、tal ${J(fac.tal)}、月亮 ${s2.p.left}、吐司 ${J(tt)}；` +
            `第 20 位之後 ${J(panel2.nodes)}（studioOffer ${J(offer2)}）、${J(panel2.left)}；${errTxt(page)}` };
      } catch (e) { out.fac = { ok: false, d: 'exception ' + e.message }; }
      await ctx.close();
    }
    record(5, size, out.demo.ok && out.fac.ok, out.demo.d + '｜' + out.fac.d);
  }

  // ---------------------------------------------------------------- 6 收攤：第一次但剩 1＝不問；第二次不問；P3 一般輪 ≤2、中繼點 ≤3
  if (want(6)) {
    const { ctx, page } = await newPage(browser, w, h); await watchToasts(page);
    try {
      await start(page, { extra: 3 });
      const x = await UI(page);
      // 第一次收攤、剩 1 個時段（冬瓜茶、公關片）
      await marketAt(page, 15, { money: 9000 });
      const t15 = await mk(page);
      await enter(page, 'snack'); await tapSheet(page, '[data-drink=tea]'); await gridReady(page);
      await enter(page, 'promo'); await tapSheet(page, '[data-a=ok]'); await gridReady(page);
      const s1 = await mk(page);
      const l1 = await leaveMarket(page);
      const lv1 = await C(page, () => window.__lab.run.stats.c.leave);
      // 第二次收攤（一般輪、剩 3）：不問、+$900；必點＝收攤＋就這五張
      await marketAt(page, 25, { money: 9000 });
      const s2 = await mk(page);
      const l2 = await leaveMarket(page);
      // 中繼點（打完第 30 位）：+$1,200、錄音室沒去＝自動 demo；必點 ≤3
      await marketAt(page, 30, { money: 9000 });
      const s3 = await mk(page);
      const k0 = await toastMark(page);
      const l3 = await leaveMarket(page);
      const tt = await toastsSince(page, k0);
      const ok = t15.p.left === 3 && s1.p.left === 1 && s1.leave === fill(x.mkLeave, { n: mtx(300) }) && !l1.ask && l1.cash === 300 && l1.go && lv1 === 1 &&
        s2.p.left === 3 && !l2.ask && l2.cash === 900 && l2.lineup && l2.taps <= 2 && l2.go &&
        s3.p.slots === 4 && !l3.ask && l3.cash === 1200 && l3.taps <= 3 && l3.go && tt.includes(fill(x.mkDemoAuto, { n: x.demoLexp }));
      record(6, size, ok && !errs(page).length,
        `第一次收攤剩 ${s1.p.left}（「${s1.leave}」）：問 ${!!l1.ask}、+$${l1.cash}、leave ${lv1}；第二次（一般輪、剩 ${s2.p.left}）：問 ${!!l2.ask}、+$${l2.cash}、上場面板 ${l2.lineup}、必點 ${l2.taps} 下；` +
        `中繼點（剩 ${s3.p.left}）：問 ${!!l3.ask}、+$${l3.cash}、自動 demo ${tt.includes(fill(x.mkDemoAuto, { n: x.demoLexp }))}、必點 ${l3.taps} 下；${errTxt(page)}${missTxt(page)}`);
    } catch (e) { record(6, size, false, 'exception ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 7 M5 全點一般輪 ≤10 下（會讀的策略、每個時段都用掉、算命翻滿）
  if (want(7)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await start(page, { extra: 3 });
      const runs = [];
      for (const after of [15, 25]) {
        await marketAt(page, after, { money: 30000, leave: 1 });
        const s0 = await mk(page);
        const c0 = page._clicks, log = [];
        let ok = true, lu = 0;
        for (let g = 0; g < 40; g++) {
          if (await C(page, () => window.__lab.screen() === 'night' && !!document.querySelector('[data-a=go]') && !(window.__lab.run.pending && window.__lab.run.pending.type === 'stall') && !document.querySelector('#panel > .lb-sheet.lineup'))) break;
          if (await page.$('#panel > .lb-sheet.lineup [data-a=luGo]')) { const k0 = page._clicks; await tapReady(page, '#panel > .lb-sheet.lineup [data-a=luGo]'); lu += page._clicks - k0; log.push('luGo'); await sleep(600); continue; }
          const st = await C(page, () => { const s = window.DipLabStalls.state(); return s ? s.phase : null; });
          if (st !== 'grid' && st !== 'station' && st !== 'hold' && st !== 'leave') { await sleep(250); continue; }
          if (st === 'station' && !(await C(page, () => { const e = document.querySelector('.lb-sheet.stall.st-mk'); return !!e && !e.classList.contains('arming'); }))) { await sleep(200); continue; }
          const t = await policyTaps(page, { slotMin: -9, flips: 3 });
          if (t.done) { await sleep(300); continue; }
          if (t.none || !t.sel) { ok = false; log.push('none'); break; }
          log.push(t.ch);
          for (const s of t.sel) { if (!(await tapIn(page, s))) { ok = false; log.push('miss ' + s); break; } await sleep(300); }
          if (!ok) break;
          await sleep(400);
        }
        const s1 = await mk(page);
        runs.push({ after, taps: page._clicks - c0, lu, log, ok: ok && s1.go && !s1.mode, used: s0.p.slots, tiles: s0.p.tiles });
      }
      // 主線裁定（RULING「I-3a 市集殼收尾」11-23）：M5 判法＝上場面板「就這五張」那一下歸 P3（#6 照算）、不算市集點擊；市集點擊（攤位格出現到收攤）≤10。
      //   原本 max(taps) ≤10（taps 含 luGo）。上場面板那一下另外要 ≤1（P3 的上場那一下）
      const max = Math.max(...runs.map(r => r.taps - r.lu)), maxAll = Math.max(...runs.map(r => r.taps));
      record(7, size, runs.every(r => r.ok && r.lu <= 1) && max <= 10 && !errs(page).length,
        `M5 全點（cPolicy slotMin −9、flips 3、錢 $30,000）：` + runs.map(r => `第 ${r.after} 位之後 ${J(r.tiles)} → 市集 ${r.taps - r.lu} 下＋上場面板 ${r.lu} 下 ${J(r.log)}${r.ok ? '' : '（沒走完）'}`).join('；') +
        `；市集最多 ${max} 下（≤10；含上場面板 ${maxAll}）；${errTxt(page)}${missTxt(page)}`);
    } catch (e) { record(7, size, false, 'exception ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 8 退版：市集存檔 → 上一版頁面
  if (want(8)) {
    const { ctx, page } = await newPage(browser, w, h); await servePrev(ctx);
    try {
      if (!prevFile('index.html') || !prevFile('ui.js')) throw new Error(`上一版頁面拿不到（git show ${PREV}:game-lab/…；設 MARKET_PREV）`);
      const res = [];
      for (const v of ['grid', 'cur']) {
        page._errors.length = 0;
        await start(page, { extra: 3 });
        await marketAt(page, 15, { money: 20000 });
        await enter(page, 'fortune'); await sheetReady(page, 'fortune');
        if (v === 'grid') { await tapSheet(page, '[data-a=back]'); await gridReady(page); await enter(page, 'snack'); await tapSheet(page, '[data-drink=tea]'); await gridReady(page); }
        const s0 = await C(page, () => { const s = JSON.parse(localStorage.getItem('dipGameLab_v1')), p = s.run.pending; return { pos: s.run.pos, mode: p.mode, groups: p.groups, q: p.q, k: p.k, post: p.post, pick: p.pick, cur: p.cur ? p.cur.kind : null, left: p.left, fortune: Array.isArray(s.run.fortune) }; });
        const newErr = errs(page).length;
        // 上一版頁面
        page._errors.length = 0;
        await openTitle(page, QP());
        const c0 = await C(page, () => ({ cont: !!document.querySelector('[data-a=cont]'), ver: [...document.scripts].map(s => s.src).filter(s => /ui\.js/.test(s)).join() }));
        await jsClick(page, '[data-a=cont]');
        await page.waitForFunction(() => window.__lab && window.__lab.screen() === 'night' && !!window.DipLabStalls.state(), null, { timeout: 15000 }).catch(() => {});
        await sleep(1500);
        const o0 = await stallState(page);
        const cl = await clearStall(page, { ms: 25000 });
        await sleep(500);
        const o1 = await C(page, () => { const r = window.__lab.run; return { run: !!r, over: r && r.over, pend: r && r.pending ? r.pending.type : null, pos: r && r.pos, go: !!document.querySelector('[data-a=go]') }; });
        const prevErr = errs(page).slice();
        // 回新頁面
        page._errors.length = 0;
        await openTitle(page, QM()); await jsClick(page, '[data-a=cont]'); await waitScreen(page, 'night', 15000); await sleep(1200);
        await luSkip(page, 1500);
        const n1 = await C(page, () => { const r = window.__lab.run; return { run: !!r, pend: r && r.pending ? r.pending.type : null, go: !!document.querySelector('[data-a=go]'), pos: r && r.pos }; });
        res.push({ v, ok: s0.mode === 'market' && J(s0.groups) === J([['dig', 'snack']]) && s0.q.length === 0 && s0.k === 0 && s0.pick === null && !newErr && c0.cont && /game-lab-prev\/ui\.js/.test(c0.ver) &&
            o0.stall && (v === 'grid' ? o0.rows === 1 && o0.st && o0.st.phase === 'pick' : o0.st && o0.st.phase === 'station' && o0.st.kind === 'fortune') && cl.ok && o1.run && !o1.over && !o1.pend && o1.pos === s0.pos && o1.go && !prevErr.length &&
            n1.run && !n1.pend && n1.go && n1.pos === s0.pos && !errs(page).length,
          d: `${v}：存檔 ${J(s0)} → 上一版 ${J({ cont: c0.cont, ver: (c0.ver.match(/\?v=\d+/) || [''])[0] })} 畫 ${o0.st && o0.st.phase}${v === 'grid' ? '（兩列→' + o0.rows + ' 列）' : '（' + (o0.st && o0.st.kind) + '）'} → 不逛了 ${J(cl)} → ${J(o1)}、主控台 ${prevErr.length}${prevErr.length ? '：' + prevErr.slice(0, 2).join(' / ').slice(0, 160) : ''}；回新頁面 ${J(n1)}、${errTxt(page)}` });
      }
      record(8, size, res.every(r => r.ok), res.map(r => r.d).join('｜'));
    } catch (e) { record(8, size, false, 'exception ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 9 重新整理停在攤位面板
  if (want(9)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await start(page, { extra: 3 });
      await marketAt(page, 35, { money: 20000, leave: 1, tiles: ['dig', 'fortune', 'snack', 'gear', 'home'] });
      await enter(page, 'snack'); await tapSheet(page, '[data-drink=tea]'); await gridReady(page);
      await enter(page, 'dig'); await sheetReady(page, 'dig');
      const a0 = await mk(page);                                           // v6 盲挑：開著（還沒挑）就重新整理＝回來還是蓋著（不能靠重新整理偷看）
      await openTitle(page, QM()); await jsClick(page, '[data-a=cont]');
      const re1 = await sheetReady(page, 'dig', 12000); await sleep(800);
      const a1 = await mk(page);
      const up1 = await C(page, () => document.querySelectorAll('.lb-sheet.stall.st-k-dig .st-c:not(.st-down)').length), dn1 = await C(page, () => document.querySelectorAll('.lb-sheet.stall.st-k-dig .st-c.st-down .st-back[data-dig]').length);
      await tapSheet(page, '[data-a=back]'); await gridReady(page);
      const a2 = await mk(page);
      // 算命翻到第 2 張 → 重新整理
      await enter(page, 'fortune'); await sheetReady(page, 'fortune');
      await tapSheet(page, '.st-slip.next .lb-btn[data-a=flip]'); await sleep(400);
      const b0 = await mk(page);
      await openTitle(page, QM()); await jsClick(page, '[data-a=cont]');
      const re2 = await sheetReady(page, 'fortune', 12000); await sleep(800);
      const b1 = await mk(page);
      const fl = await C(page, () => { const s = document.querySelector('.lb-sheet.stall.st-k-fortune'); return { up: s.querySelectorAll('.st-slip.up').length, next: s.querySelectorAll('.st-slip.next .lb-btn[data-a=flip]').length }; });
      const ok = re1 && a1.p.cur === 'dig' && a1.p.key === a0.p.key && J(a1.p.cards) === J(a0.p.cards) && a1.p.left === a0.p.left && a1.p.left === 2 && a1.sheetMoons.lit === 2 && !a1.p.went.dig && up1 === 0 && dn1 === 3 && a1.cam === 'market' &&
        a2.phase === 'grid' && a2.moons.lit === 2 && a2.grid.find(t => t.k === 'snack').went && !a2.grid.find(t => t.k === 'dig').went &&
        re2 && b1.p.cur === 'fortune' && b1.p.n === 2 && b1.p.left === b0.p.left && b0.p.left === 1 && b1.sheetMoons.lit === 1 && fl.up === 2 && fl.next === 1 && b1.money === b0.money;
      record(9, size, ok && !errs(page).length,
        `挖寶開著（還沒挑）重新整理 → 面板 ${re1}、同一批 ${J(a1.p.cards) === J(a0.p.cards)}、月亮 ${a1.p.left}（面板 ${a1.sheetMoons.lit}）、沒打勾 ${!a1.p.went.dig}、翻開 ${up1}／蓋著能挑 ${dn1}（盲挑：回來還是蓋著）、鏡頭 ${a1.cam}；` +
        `回攤位：月亮 ${a2.moons.lit}、飲料打勾 ${a2.grid.find(t => t.k === 'snack').went}；算命第 2 張後重新整理 → 面板 ${re2}、翻了 ${b1.p.n}（畫 ${fl.up}）、下一張鈕 ${fl.next}、月亮 ${b1.p.left}、錢 ${b0.money}→${b1.money}；${errTxt(page)}${missTxt(page)}`);
    } catch (e) { record(9, size, false, 'exception ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 10 版面（攤位格、每一種攤位面板）
  if (want(10)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await start(page, { q: QM('&fac=1'), extra: 3 });
      const rows = [], bad = [], hidden = [];
      const check = async (tag, o = {}) => {
        await sleep(350);
        const L = await layout(page);
        if (o.kind && !(await page.$('.lb-sheet.stall.st-mk.st-k-' + o.kind))) { bad.push(tag + ' 面板沒開'); rows.push(tag + ' 面板沒開'); return; }
        const fit = L.app <= 1 && L.docY <= 1 && L.docX <= 1;
        const sheetOk = L.sheetH == null || (L.sheetH <= Math.round(L.vh * 0.55) + 1 && L.sheetTop >= L.topBot - 1);
        const tilesOk = L.tiles.every(t => t[0] >= 100 && t[1] >= 64);
        const own = !o.noScroll || (L.sheetH == null ? L.gridScroll <= 1 : L.sheetScroll <= 1);
        const ok = fit && sheetOk && tilesOk && !L.small.length && own && (L.gridIn !== false) && L.nSheets <= 1;
        if (!L.footVis) hidden.push(tag);
        rows.push(`${tag} ${L.sheetH != null ? 'h' + L.sheetH + '/' + Math.round(L.vh * 0.55) : 'grid'}${L.small.length ? ' 小鈕' + J(L.small.slice(0, 3)) : ''}${fit ? '' : ' 店捲' + J([L.app, L.docY, L.docX])}${tilesOk ? '' : ' 格' + J(L.tiles)}${own ? '' : ' 自己捲' + (L.sheetH == null ? L.gridScroll : L.sheetScroll)}${sheetOk ? '' : ' 面板' + J([L.sheetTop, L.topBot])}${L.nSheets > 1 ? ' 面板 ' + L.nSheets + ' 張' : ''}${L.footVis ? '' : ' 底鈕要捲'}`);
        if (!ok) bad.push(tag);
      };
      // 第一個市集：攤位格、算命（翻開一張／翻滿停住）、飲料、挖寶、倉庫、唱盤、錄音室 demo（沒面板）
      await marketAt(page, 5, { money: 20000, fac: false });
      await check('第一個市集格', { noScroll: true });
      await tapReady(page, '.st-mk [data-a=leave]'); await sleep(500);
      const askOn = !!(await page.$('.st-mk .st-ask [data-a=leaveNo]'));
      await check('收攤確認', { noScroll: true });
      if (!askOn) bad.push('收攤確認沒出');
      await tapOr(page, '.st-ask [data-a=leaveNo]'); await gridReady(page);
      await C(page, () => { window.__lab.run.hp = window.__lab.run.maxHp - 5; });
      for (const k of ['dig', 'warehouse', 'home', 'snack']) { await enter(page, k); await sheetReady(page, k); await check(k, { kind: k, noScroll: k === 'snack' }); await tapSheet(page, '[data-a=back]'); await gridReady(page); }
      await enter(page, 'fortune'); await sheetReady(page, 'fortune'); await check('fortune1', { kind: 'fortune', noScroll: true });
      await tapSheet(page, '.st-slip.next .lb-btn[data-a=flip]'); await tapSheet(page, '.st-slip.next .lb-btn[data-a=flip]'); await sleep(400); await check('fortune 停住', { kind: 'fortune', noScroll: true });
      await tapSheet(page, '[data-a=noted]'); await gridReady(page);
      // 一般輪（樂歷 Lv4＋寄賣領取＋踢館帖＝9 格）：同業調貨、小物攤、演唱會、公關片、寄賣、寄賣領取、踢館帖
      await marketAt(page, 35, { money: 20000, leave: 1, run: { marketTiles: 6 }, tiles: ['trade', 'gear', 'gig', 'promo', 'consign', 'snack'], free: ['consignGet', 'dare'] });
      await C(page, () => { const r = window.__lab.run; r.consign = { card: r.bag[r.bag.length - 1], due: r.round }; r.pending.seen = {}; window.__lab.money(r.money); });
      await check('Lv4 9 格', { noScroll: true });
      for (const k of ['trade', 'gear', 'gig', 'promo', 'consign', 'dare']) { await enter(page, k); await sheetReady(page, k); await check(k, { kind: k }); await tapSheet(page, k === 'dare' ? '[data-a=decline]' : '[data-a=back]'); await gridReady(page); }
      // 中繼點：黑膠特賣、錄音室試錄（?fac=1）
      await marketAt(page, 10, { money: 20000, fac: true });
      await check('中繼點格', { noScroll: true });
      await enter(page, 'market'); await sheetReady(page, 'market'); await check('黑膠特賣', { kind: 'market' }); await tapSheet(page, '[data-a=done]'); await gridReady(page);
      await enter(page, 'studio'); await sheetReady(page, 'studio'); await check('錄音室試錄', { kind: 'studio', noScroll: true });
      // 面板底部的鈕（回攤位）要捲才看得到：照「放不下面板自己捲」記下來、不擋（規格沒寫底鈕一定要在可視範圍）
      record(10, size, !bad.length && !errs(page).length, `${bad.length ? '不合：' + bad.join('、') + '；' : ''}${hidden.length ? '（記錄）底鈕要捲：' + hidden.join('、') + '；' : ''}${rows.join('；')}；${errTxt(page)}${missTxt(page)}`);
    } catch (e) { record(10, size, false, 'exception ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 11 活店（?crowd=1）：熟客不站島台格
  if (want(11)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await start(page, { q: QM('&crowd=1'), extra: 3 });
      await C(page, () => { window.__lab.jump(6); }); await sleep(1500);
      const fz = await C(page, () => window.__lab.crowd.freezeAt(['c-elec', 'c-folk', 'c-rock']));
      const islandStops = ['c-rock', 'c-soul', 'c-citypop', 'c-world', 'c-elec', 'c-hiphop', 'c-classical', 'c-folk'];
      const on0 = (fz && fz.slots ? fz.slots.filter(s => s.on) : []).filter(s => islandStops.includes(s.at) || islandStops.includes(s.stop)).length;
      await C(page, () => { const r = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent; E.stallSession(r, Cn); window.__lab.money(20000); window.__lab.go('night'); });
      await gridReady(page);
      const t0 = Date.now(); let st;
      for (;;) { st = await C(page, () => window.__lab.crowd.state()); if (!st.slots.some(s => s.on && s.walking) || Date.now() - t0 > 12000) break; await sleep(300); }
      const secs = ((Date.now() - t0) / 1000).toFixed(1);
      const near = async () => C(page, isl => {
        const S = window.__lab.stage, st = window.__lab.crowd.state(), on = st.slots.filter(s => s.on && s.phase !== 'out');
        const lit = window.DipLabStalls.isle().filter(c => !c.went).map(c => { const b = S.bins().find(x => x.hotId === c.hot); return b ? b.stand : null; }).filter(Boolean);
        return { mode: st.mode, market: st.market, island: on.filter(s => isl.includes(s.at) || isl.includes(s.stop)).map(s => s.who + '@' + (s.at || s.stop)), near: on.filter(s => lit.some(p => Math.abs(p[0] - s.x) < 20 && Math.abs(p[1] - s.y) < 14)).map(s => s.who), n: on.length };
      }, islandStops);
      const n1 = await near();
      // 逛兩攤（進出）6 秒：還是沒人回島邊
      const tiles = await C(page, () => window.__lab.run.pending.tiles.filter(k => !window.__lab.run.pending.free.includes(k)));
      await enter(page, tiles[0]); await sleep(1500); await tapSheet(page, '[data-a=back]'); await gridReady(page);
      await enter(page, tiles[1]); await sleep(1500); await tapSheet(page, '[data-a=back]'); await gridReady(page);
      await sleep(3000);
      const n2 = await near();
      const lv = await leaveMarket(page);
      await sleep(800);
      const n3 = await C(page, () => { const st = window.__lab.crowd.state(); return { mode: st.mode, market: st.market }; });
      record(11, size, on0 >= 1 && n1.mode === 'still' && n1.market && !n1.island.length && !n1.near.length && !n2.island.length && !n2.near.length && lv.go && !n3.market && !errs(page).length,
        `凍在島邊 ${on0} 位 → 開市集 ${secs} 秒後：導演 ${n1.mode}／market ${n1.market}、島邊 ${J(n1.island)}、亮格前 ${J(n1.near)}（店裡 ${n1.n} 位）；逛兩攤後 島邊 ${J(n2.island)}、亮格前 ${J(n2.near)}；` +
        `收攤 ${lv.go} → 導演 ${n3.mode}／market ${n3.market}；${errTxt(page)}${missTxt(page)}`);
    } catch (e) { record(11, size, false, 'exception ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 12 樂歷階梯 Lv4／Lv6／Lv7（市集模式才列、才給）
  if (want(12)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      const out = {};
      for (const mode of ['market', 'pick']) {
        await openTitle(page, Q('&fast=1' + (mode === 'market' ? '' : '&market=0')));   // 11-23 出貨＝市集：市集那組不帶旗標（原本 &market=1），C 波那組照帶 ?market=0
        out[mode] = await C(page, mode => {
          const E = window.DipLabEngine, Cn = window.DipLabContent;
          let xp = 0; for (; xp < 100000 && E.careerLevel(Cn, xp).level < 7; xp += 50);
          const career = { key: 'e2e-market', xp, spent: {}, off: false, prof: { hall: 0, pearl: 0, heresy: 0 }, tree: { hall: {}, pearl: {}, heresy: {} }, drawn: [], got: [], banked: true, lastGain: null };
          const ta = E.talentArgs(Cn, career) || {};
          const lad = E.ladderList(Cn, 7).filter(L => ['tile6', 'fortune2', 'dig4'].includes(L.key)).map(L => L.key + (L.open ? '+' : '-'));
          const r = E.newRun(Cn, Object.assign({ seedKey: '20261106', runNo: 1, ace: 'hall', prologue: false, relics: [] }, ta));
          r.tut = false; const ch = E.bargainPolicy(r, Cn); if (ch) E.choose(r, Cn, ch);
          const s = { v: 8, seen: { night: true, unlockHint: true, aceSwap: true }, learned: {}, settings: { fastAnim: false, sound: false, autoNext: true }, player: null, run: r, runs: [],
            best: { far: 0, checkpoints: [], bestStreak: 0 }, shelf: {}, relics: [], tutorialDone: true, prologueDone: true, lastAce: 'hall', lastBargain: null, career };
          s.shelf[Cn.aces.hall] = { at: 'e2e#1', seen: true, own: true, src: 'start' }; (Cn.gifts.hall || []).forEach(id => { s.shelf[id] = { at: 'e2e#1', seen: true, own: true, src: 'gift' }; });
          r.bag.forEach(id => { if (!s.shelf[id]) s.shelf[id] = { at: 'e2e#1', seen: false }; });
          localStorage.setItem('dipGameLab_v1', JSON.stringify(s));
          return { lv: E.careerLevel(Cn, xp).level, ta: ['marketTiles', 'fortuneFree', 'digN'].filter(k => k in ta).map(k => k + '=' + ta[k]), run: ['marketTiles', 'fortuneFree', 'digN'].filter(k => k in r).map(k => k + '=' + r[k]), lad };
        }, mode);
        if (mode === 'market') {
          await openTitle(page, QM()); await jsClick(page, '[data-a=cont]'); await waitScreen(page, 'night', 15000); await sleep(1000);
          // 一般輪：6 攤；找一輪有挖寶、算命的（固定種子表）
          const after = await C(page, () => { const E = window.DipLabEngine, Cn = window.DipLabContent; for (let a = 15; a <= 100; a += 5) { const r = JSON.parse(JSON.stringify(window.__lab.run)); E.jumpTo(r, Cn, a + 1); E.stallSession(r, Cn); const p = r.pending; if (!p.cp && p.tiles.includes('dig') && p.tiles.includes('fortune')) return a; } return null; });
          const m = await marketAt(page, after, { money: 20000, leave: 1 });
          const g = await mk(page);
          await enter(page, 'fortune'); await sheetReady(page, 'fortune');
          const btn = await C(page, () => (document.querySelector('.lb-sheet.stall.st-k-fortune .st-slip.next .lb-btn[data-a=flip]') || {}).textContent || '');
          const m0 = await C(page, () => window.__lab.run.money);
          await tapSheet(page, '.st-slip.next .lb-btn[data-a=flip]'); await sleep(300);
          const m1 = await C(page, () => window.__lab.run.money);
          await tapSheet(page, '[data-a=back]'); await gridReady(page);
          await enter(page, 'dig'); await sheetReady(page, 'dig');
          const dig = await C(page, () => ({ cards: window.__lab.run.pending.cur.cards.length, tiles: document.querySelectorAll('.lb-sheet.stall.st-k-dig .st-c').length }));
          const x = await UI(page);
          out.play = { after, paid: m.tiles.filter(k => !m.free.includes(k)).length, btn, ok: btn === x.mkFlipFree && m1 === m0, dig, grid: g.grid.length };
        } else {
          await openTitle(page, Q('&fast=1&market=0')); await jsClick(page, '[data-a=cont]'); await waitScreen(page, 'night', 15000); await sleep(800);
          await C(page, () => { const r = window.__lab.run, E = window.DipLabEngine, Cn = window.DipLabContent; E.jumpTo(r, Cn, 6); E.stallSession(r, Cn); window.__lab.money(9000); window.__lab.go('night'); });
          await page.waitForSelector('.st-pick .st-row', { timeout: 8000 }).catch(() => {});
          await sleep(600);
          out.pickUi = await C(page, () => ({ rows: document.querySelectorAll('.st-pick .st-row').length, mk: !!document.querySelector('.st-mk'), mode: window.__lab.run.pending && window.__lab.run.pending.mode || null }));
        }
      }
      const M = out.market, P = out.pick, pl = out.play;
      const ok = M.lv >= 7 && J(M.ta) === J(['marketTiles=6', 'fortuneFree=1', 'digN=4']) && J(M.run) === J(M.ta) && J(M.lad) === J(['tile6+', 'fortune2+', 'dig4+']) &&
        pl.paid === 6 && pl.ok && pl.dig.cards === 4 && pl.dig.tiles === 4 &&
        !P.ta.length && !P.run.length && !P.lad.length && out.pickUi.rows === 2 && !out.pickUi.mk && !out.pickUi.mode;
      record(12, size, ok && !errs(page).length,
        `市集模式 Lv${M.lv}：talentArgs ${J(M.ta)}、run ${J(M.run)}、階梯 ${J(M.lad)}；第 ${pl.after} 位之後 ${pl.paid} 攤（格 ${pl.grid}）、算命第 2 張「${pl.btn}」錢 ${pl.ok ? '不動' : '動了'}、挖寶 ${pl.dig.cards} 張（畫 ${pl.dig.tiles}）；` +
        `?market=0：talentArgs ${J(P.ta)}、run ${J(P.run)}、階梯 ${J(P.lad)}、第一個市集 ${J(out.pickUi)}；${errTxt(page)}${missTxt(page)}`);
    } catch (e) { record(12, size, false, 'exception ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 14 修正棒（11-22 審查）
  if (want(14)) {
    const { ctx, page } = await newPage(browser, w, h); await watchToasts(page);
    try {
      await start(page, { q: QM('&fac=1'), extra: 3 });
      const x = await UI(page), out = {};
      // 格子的字、月亮角標、頂列「時段」
      await marketAt(page, 5, { money: 20000, fac: true });
      out.g = await C(page, () => [...document.querySelectorAll('.st-mk .st-mt')].map(b => ({ k: b.getAttribute('data-k'), pr: (b.querySelector('.pr') || {}).textContent, mo: !!b.querySelector('.mo'), fr: !!b.querySelector('.fr') })));
      out.sw = await C(page, () => (document.querySelector('.st-mk .st-mtop .st-sw') || {}).textContent || null);
      const okTiles = out.g.length === 6 && out.g.every(t => t.k === 'studio' ? t.fr && !t.mo : t.mo && !t.fr && t.pr !== x.priceFree) && out.g.find(t => t.k === 'fortune').pr === x.mkFortuneTile && out.sw === x.mkSlotWord;
      // 挖寶：還蓋著＝寫出來要點（v6 第 7 條盲挑：字換成「挑一張，選了才知道是什麼。」、沒有「點一張翻開」的翻牌鈕；挑了就停住翻開那張＝#4 驗）
      await enter(page, 'dig'); await sheetReady(page, 'dig');
      const d0 = await C(page, () => { const e = document.querySelector('.lb-sheet.stall .st-dtap'); return e ? { t: e.textContent, hid: e.hidden } : null; });
      const d1 = await C(page, () => !document.querySelector('.lb-sheet.stall [data-flip]') && document.querySelectorAll('.lb-sheet.stall .st-back[data-dig]').length === 3);
      await tapSheet(page, '[data-a=back]'); await gridReady(page);
      const okDig = d0 && d0.t === x.digPick && !d0.hid && d1 === true;
      // 店裡唱盤：「回攤位」不用捲就看得到
      await enter(page, 'home'); await sheetReady(page, 'home');
      const fh = await C(page, () => { const s = document.querySelector('.lb-sheet.stall'), f = s && s.querySelector('.foot [data-a=back]'); if (!f) return null; const a = f.getBoundingClientRect(), b = s.getBoundingClientRect(); return a.bottom <= b.bottom + 0.5 && a.top >= b.top; });
      await tapSheet(page, '[data-a=back]'); await gridReady(page);
      // 冬瓜茶：島台倒一杯、吐司靠右上
      await C(page, () => { window.__lab.run.hp = Math.max(1, window.__lab.run.maxHp - 4); });
      const k0 = await toastMark(page);
      await enter(page, 'snack'); await sheetReady(page, 'snack'); await tapSheet(page, '[data-drink=tea]'); await sleep(200);
      const pour = await C(page, () => { const I = window.__lab.stage.shop.state.isle, X = window.DipLabStalls.isle().find(c => c.kind === 'snack'); return { pour: I && I.pour ? I.pour.hot : null, hot: X ? X.hot : null, mk: [...document.querySelectorAll('.lb-toast.mk')].map(t => t.textContent) }; });
      await gridReady(page);
      const okTea = pour.pour && pour.pour === pour.hot && (await toastsSince(page, k0)).includes(fill(x.heal, { n: x.fair.drinks.tea.hp }));
      // 錄音室試錄：回攤位（不扣、還能再進）
      await marketAt(page, 10, { money: 20000, fac: true, leave: 1 });
      await enter(page, 'studio'); await sheetReady(page, 'studio');
      const sb = await C(page, () => !!document.querySelector('.lb-sheet.stall .foot [data-a=back]'));
      await tapSheet(page, '[data-a=back]'); await gridReady(page);
      const s1 = await mk(page); await enter(page, 'studio'); const reS = await sheetReady(page, 'studio'); await tapSheet(page, '[data-a=back]'); await gridReady(page);
      const okStudio = sb && !s1.p.went.studio && s1.p.left === 4 && reS;
      // 踢館帖：回攤位（不扣、還能再進）→ 時段用完＝島台只亮免費攤
      await marketAt(page, 35, { money: 20000, leave: 1, tiles: ['trade', 'gear', 'gig', 'promo', 'dig'], free: ['dare'] });
      await enter(page, 'dare'); await sheetReady(page, 'dare');
      const db = await C(page, () => [...document.querySelectorAll('.lb-sheet.stall .foot button')].map(b => b.getAttribute('data-a')));
      await tapSheet(page, '[data-a=back]'); await gridReady(page);
      const s2 = await mk(page); await enter(page, 'dare'); const reD = await sheetReady(page, 'dare'); await tapSheet(page, '[data-a=back]'); await gridReady(page);
      await C(page, () => { window.__lab.run.pending.left = 0; window.__lab.go('night'); }); await gridReady(page); await sleep(300);
      const hi = await C(page, () => { const X = window.DipLabStalls.isle(), H = ((window.__lab.stage.shop.state.hi || [])[0] || { hots: [] }).hots.map(h => h.id); return { hi: H, dare: (X.find(c => c.kind === 'dare') || {}).hot }; });
      const okDare = J(db) === J(['decline', 'back']) && !s2.p.went.dare && s2.p.left === 3 && reD && J(hi.hi) === J([hi.dare]);
      // 算命翻滿、時段用完、沒別的攤：「記下了，收攤」一下收攤
      await marketAt(page, 15, { money: 20000, leave: 1, tiles: ['fortune', 'dig', 'snack', 'gear', 'gig'], free: [] });
      await C(page, () => { window.__lab.run.pending.left = 1; window.__lab.go('night'); }); await gridReady(page);
      await enter(page, 'fortune'); await sheetReady(page, 'fortune');
      await tapSheet(page, '.st-slip.next .lb-btn[data-a=flip]'); await tapSheet(page, '.st-slip.next .lb-btn[data-a=flip]'); await sleep(400);
      const nl = await C(page, () => { const b = document.querySelector('.lb-sheet.stall [data-a=notedLeave]'); return b ? b.textContent : null; });
      const c0 = page._clicks; await tapSheet(page, '[data-a=notedLeave]');
      const gone = await page.waitForFunction(() => !(window.__lab.run.pending && window.__lab.run.pending.type === 'stall'), null, { timeout: 6000 }).then(() => true, () => false);
      const nTap = page._clicks - c0;
      await luSkip(page, 2500);
      const okNoted = nl === x.mkNotedLeave && gone && nTap === 1;
      // 寄賣那張還在外面：寄賣攤寫原因、鈕灰
      await marketAt(page, 20, { money: 20000, leave: 1, tiles: ['consign', 'dig', 'snack', 'gear', 'gig'], free: [] });
      await C(page, () => { const r = window.__lab.run, id = r.bag[r.bag.length - 1]; r.bag.pop(); r.consign = { card: id, due: r.round + 2 }; window.__lab.money(r.money); window.__lab.go('night'); }); await gridReady(page);
      await enter(page, 'consign'); await sheetReady(page, 'consign');
      const cb = await C(page, () => { const s = document.querySelector('.lb-sheet.stall'); return { note: (s.querySelector('.note') || {}).textContent, dis: [...s.querySelectorAll('[data-consign]')].every(b => b.disabled), n: s.querySelectorAll('[data-consign]').length }; });
      await tapSheet(page, '[data-a=back]'); await gridReady(page);
      const okConsign = cb.note === x.mkConsignBusy && cb.n > 0 && cb.dis;
      record(14, size, okTiles && okDig && fh && okTea && okStudio && okDare && okNoted && okConsign && !errs(page).length,
        `格子 ${J(out.g.map(t => t.k + ':' + t.pr + (t.mo ? '☾' : '') + (t.fr ? '[免費]' : '')))}、頂列「${out.sw}」 ${okTiles}；挖寶提示 ${J(d0)}、沒有翻牌鈕＋三張可挑 ${d1}；店裡唱盤回攤位看得到 ${fh}；` +
        `冬瓜茶倒一杯 ${pour.pour}（飲料攤 ${pour.hot}）、右上吐司 ${J(pour.mk)}；試錄回攤位 ${sb}（去過 ${!!s1.p.went.studio}、時段 ${s1.p.left}、再進 ${reS}）；` +
        `踢館帖底鈕 ${J(db)}（去過 ${!!s2.p.went.dare}、時段 ${s2.p.left}、再進 ${reD}）、時段用完島台亮 ${J(hi.hi)}；記下了收攤「${nl}」收掉 ${gone}、${nTap} 下；寄賣 ${J(cb)}；${errTxt(page)}${missTxt(page)}`);
    } catch (e) { record(14, size, false, 'exception ' + e.message); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 15 第 I 波 I-3b 市集新攤（?newstalls=1）＋算命攤心情題（題庫那條路；SPEC-I §6.3、§6.8；契約 build3b/CONTRACT.md）
  //   a 唱片醫生：清潔墊預設最膩那張；洗＝聽膩清掉、−$800、月亮 −1、字留在面板（停住）；不是這一輪新到的那張「重壓」灰、寫原因；換新到的 → 重壓先選軸 → 那軸 +1、−$2,000、做滿 2 件停住等點 → 回攤位；
  //     封面「壓」（包包面板、上場列）；這一趟壓滿 3 張＝重壓灰、寫「這一趟已經壓滿 3 張」
  //   b 飲料：第一個市集只有冬瓜茶；一般輪一排三杯；熱美式 −$1,500 → 來客條頭像下杯子、最前面那位寫「3」→ 對決裡底氣 +1（view.drink）→ 打完一位變「2」
  //   c 轉蛋：六格各固定一次（fair.gacha.cells 改成那一格）：點搖桿 −$1,000 → 蛋掉出來、停住（1.5 秒後還在、結果還沒畫、錢還沒進）→ 點蛋打開 → 效果與字對；第 2 顆 $2,000、轉滿「今晚轉夠了」
  //   d 算命心情題：點算命攤＝先問一題（還沒進攤：月亮不動、不翻）→ 選一個＝翻第 1 張（moodAns[0]＝{q,o}）→ 第 2、3 張前各問一題（不重複）→ 翻滿：第 3 張那一行＋心情名（quiz.moods）＋
  //     一段原文（＝mood-bank 那一段，一字不改）＋那張進想要清單 → 停住 1.5 秒 → 記下了回攤位；全點的下數（打開＋三題＋記下了）只列
  //   e 版面（每個新面板）：店不捲、面板 ≤ 可視高 55%（+1）、不蓋頂欄、鈕 ≥44
  if (want(15)) {
    const { ctx, page } = await newPage(browser, w, h); await watchToasts(page);
    const QN = (x = '') => Q('&fast=1&newstalls=1' + x);
    const lays = [], bad = [];
    // 新面板的版面＋清潔墊上面那一列沒被壓扁（≥44）、新鈕（清潔墊那列、選軸、三杯、搖桿、蛋、心情選項）≥44、面板自己捲幾 px（只列）
    const lay = async tag => {
      const L = await layout(page);
      const X = await C(page, () => { const sh = [...document.querySelectorAll('.lb-sheet.stall')].pop(), rr = e => e.getBoundingClientRect(), row = sh && sh.querySelector('.st-drow');
        const nb = sh ? [...sh.querySelectorAll('.st-dmini, [data-ax], .st-cup3, [data-a=gacha], [data-a=egg], [data-mo], .st-dbtn')].map(b => [b.getAttribute('data-a') || b.getAttribute('data-mo') || b.className.split(' ')[0], Math.round(rr(b).width), Math.round(rr(b).height)]).filter(b => b[1] < 44 || b[2] < 44) : [];
        return { row: row ? row.clientHeight : null, nb, scroll: sh ? sh.scrollHeight - sh.clientHeight : 0 }; });
      lays.push([tag, L.sheetH, X.scroll]);
      if (!(L.app <= 0 && L.docY <= 0 && L.sheetH <= Math.round(L.vh * 0.55) + 1 && (L.sheetTop == null || L.sheetTop >= L.topBot) && !L.small.length && !X.nb.length && (X.row == null || X.row >= 44)))
        bad.push([tag, L.sheetH, L.vh, L.sheetTop, L.topBot, L.app, J(L.small.slice(0, 3)), J(X)]);
    };
    const sheetTx = () => C(page, () => { const s = document.querySelector('.lb-sheet.stall'); return s ? s.textContent : ''; });
    try {
      await start(page, { q: QN(), extra: 3 });
      const x = await UI(page);
      // ---- a 唱片醫生
      const s0 = await marketAt(page, 20, { money: 9000, leave: 1, tiles: ['doctor', 'snack', 'gear', 'fortune', 'dig'], free: [] });
      const ids = await C(page, () => { const r = window.__lab.run; r.wear = r.wear || {}; r.wear[r.bag[0]] = { g: 2, n: 1 }; r.wear[r.bag[1]] = { g: 3, n: 0 }; r.lineupFresh = [r.bag[2], r.bag[3]]; window.__lab.money(9000); window.__lab.go('night'); return r.bag.slice(0, 4); });
      await gridReady(page);
      await enter(page, 'doctor'); await sheetReady(page, 'doctor'); await lay('doctor');
      const d0 = await C(page, () => { const s = window.DipLabStalls.state(), sh = document.querySelector('.lb-sheet.stall'), pb = sh.querySelector('[data-a=press]');
        return { sel: s.doc && s.doc.id, row: [...sh.querySelectorAll('[data-doc]')].map(b => b.getAttribute('data-doc')), pressDis: !!(pb && pb.disabled), pressTx: pb ? pb.textContent : '', left: window.__lab.run.pending.left }; });
      await tapSheet(page, '[data-a=wash]');
      const d1 = await C(page, k => { const r = window.__lab.run, s = window.DipLabStalls.state(); return { wear: r.wear[k] || null, money: r.money, left: r.pending.left, open: !!(r.pending.cur && r.pending.cur.kind === 'doctor'), msg: s.doc && s.doc.msg }; }, ids[0]);
      await lay('doctorWashed');
      await tapSheet(page, `[data-doc="${ids[2]}"]`);   // 11-27 修正棒：只能壓的那張點了直接挑軸（沒有「重壓」那一下）
      if (!(await page.$('.lb-sheet.stall [data-ax]'))) await tapSheet(page, '[data-a=press]');
      await lay('doctorAxis');
      const ax = await C(page, () => { const b = [...document.querySelectorAll('.lb-sheet.stall [data-ax]')].find(x => !x.disabled); return b ? b.getAttribute('data-ax') : null; });
      const star0 = await C(page, ([k, a]) => window.DipLabContent.cards[k][a], [ids[2], ax]);
      await tapSheet(page, `[data-ax="${ax}"]`); await sleep(1500);
      const d2 = await C(page, k => { const r = window.__lab.run, s = window.DipLabStalls.state(), E = window.DipLabEngine; return { plus: r.plus && r.plus[k], pressN: r.pressN, money: r.money, hold: s.phase, eff: E.effCard(window.DipLabContent, r, k), ptag: !!document.querySelector('.lb-sheet.stall .st-mat .st-ptag'), msg: s.doc && s.doc.msg }; }, ids[2]);
      await lay('doctorHold');
      await tapSheet(page, '[data-a=noted]'); const gb = await gridReady(page);
      const wentD = await C(page, () => !!window.__lab.run.pending.went.doctor);
      const okDoc = d0.sel === ids[0] && d0.row.includes(ids[2]) && d0.pressDis && d0.pressTx.includes(x.mkPressOnlyNew) && !d1.wear && d1.money === 9000 - x.fair.doctor.wash && d1.left === s0.left - 1 && d1.open && d1.msg === x.mkWashed &&
        d2.plus && d2.plus[ax] === 1 && d2.pressN === 1 && d2.money === d1.money - x.fair.doctor.press && d2.hold === 'hold' && d2.eff[ax] === Math.min(5, star0 + 1) && d2.eff.pressed === ax && d2.ptag && gb && wentD;
      // 壓滿 3 張：重壓灰、寫原因；包包面板「壓」
      await marketAt(page, 25, { money: 9000, leave: 1, tiles: ['doctor', 'snack', 'gear', 'fortune', 'dig'], free: [] });
      await C(page, k => { const r = window.__lab.run; r.pressN = 3; r.lineupFresh = [r.bag[3]]; r.wear = {}; window.__lab.money(9000); window.__lab.go('night'); }, ids[3]); await gridReady(page);
      await enter(page, 'doctor'); await sheetReady(page, 'doctor');
      const d3 = await C(page, () => { const pb = document.querySelector('.lb-sheet.stall [data-a=press]'); return { dis: !!(pb && pb.disabled), tx: pb ? pb.textContent : '' }; });
      // 第 4 張重壓被擋（引擎；在 run 的拷貝上試，畫面那顆鈕已經灰）：這一輪新到的那張照樣 pressMax、錢與 plus 不動
      const blk = await C(page, k => { const E = window.DipLabEngine, Cn = window.DipLabContent, r = JSON.parse(JSON.stringify(window.__lab.run)), m0 = r.money;
        const res = E.choose(r, Cn, { type: 'stallAct', act: 'press', cardId: k, attr: 'c' }) || {}; return { ok: !!res.ok, error: res.error || null, pressN: r.pressN, money: r.money === m0, plus: !!(r.plus && r.plus[k]) }; }, ids[3]);
      await tapSheet(page, '[data-a=back]'); await gridReady(page);
      const okMax = d3.dis && d3.tx.includes(fill(x.mkPressMax, { n: x.fair.doctor.pressMax })) && !blk.ok && blk.error === 'pressMax' && blk.pressN === 3 && blk.money && !blk.plus;
      await tapReady(page, '.lb-bagline [data-a=bag]'); await sleep(700);
      const bagTag = await C(page, k => { const t = document.querySelector(`.lb-sheet [data-cid="${k.replace(/"/g, '\\"')}"] .ptag`); return !!t; }, ids[2]);
      await C(page, () => { document.querySelectorAll('.lb-sheet [data-a=close], .lb-sheet [data-x]').forEach(b => b.click()); }); await sleep(400);
      record('15a', size, okDoc && okMax && bagTag && !errs(page).length,
        `清潔墊預設 ${d0.sel === ids[0]}、一列 ${d0.row.length} 張、舊盤重壓灰 ${d0.pressDis}「${d0.pressTx}」；洗 → 聽膩 ${J(d1.wear)}、$${d1.money}、月亮 ${s0.left}→${d1.left}、面板還開 ${d1.open}「${d1.msg}」；` +
        `重壓 ${ax} → plus ${J(d2.plus)}、pressN ${d2.pressN}、$${d2.money}、${star0}→${d2.eff[ax]}、停住 1.5 秒 ${d2.hold}、壓標 ${d2.ptag}「${d2.msg}」→ 回攤位 ${gb}、打勾 ${wentD}；壓滿 ${J(d3)}、第 4 張（引擎）${J(blk)}；包包「壓」 ${bagTag}；${errTxt(page)}${missTxt(page)}`);

      // ---- b 飲料
      await marketAt(page, 5, { money: 9000, leave: 1 });
      const first = await C(page, () => { const p = window.__lab.run.pending, E = window.DipLabEngine, Cn = window.DipLabContent; return { first: p.first, tiles: p.tiles.slice() }; });
      let firstMenu = null;
      if (first.tiles.includes('snack')) { await enter(page, 'snack'); await sheetReady(page, 'snack'); firstMenu = await C(page, () => [...document.querySelectorAll('.lb-sheet.stall [data-drink]')].map(b => b.getAttribute('data-drink'))); await tapSheet(page, '[data-a=back]'); await gridReady(page); }
      const s1 = await marketAt(page, 20, { money: 9000, leave: 1, tiles: ['snack', 'doctor', 'gear', 'fortune', 'dig'], free: [] });
      await C(page, () => { window.__lab.run.hp = Math.max(1, window.__lab.run.maxHp - 4); window.__lab.money(9000); window.__lab.go('night'); }); await gridReady(page);
      await enter(page, 'snack'); await sheetReady(page, 'snack'); await lay('snack3');
      const menu = await C(page, () => [...document.querySelectorAll('.lb-sheet.stall [data-drink]')].map(b => b.getAttribute('data-drink')));
      await tapSheet(page, '[data-drink="coffee"]'); await gridReady(page);
      const dk = await C(page, () => ({ drink: window.__lab.run.drink, money: window.__lab.run.money }));
      const lv = await leaveMarket(page);
      const cups0 = await C(page, () => [...document.querySelectorAll('.lb-night .nc')].map(n => { const c = n.querySelector('.st-cupm'); return c ? (c.textContent || 'c') : ''; }));
      // 對決：底氣 +1、view.drink
      await tapReady(page, '[data-a=go]');
      await advanceUntil(page, () => window.__lab.screen() === 'duel' && !!window.__lab.rawDuel(), null, 30000);
      await page.waitForFunction(() => window.__lab.rawDuel() && !window.__lab.going(), null, { timeout: 15000 }).catch(() => {});
      const dv = await C(page, () => { const E = window.DipLabEngine, Cn = window.DipLabContent, r = window.__lab.run, v = E.view(window.__lab.rawDuel()); const r2 = JSON.parse(JSON.stringify(r)); r2.drink = null; return { drink: v.drink, pDef: v.pDef, base: E.playerDef(Cn, r2).def }; });
      await C(page, () => window.__lab.forceWin());
      await passLoot(page, {});
      await page.waitForSelector('[data-a=go]', { timeout: 15000 }).catch(() => {}); await luSkip(page, 1500); await sleep(600);
      const cups1 = await C(page, () => [...document.querySelectorAll('.lb-night .nc')].map(n => { const c = n.querySelector('.st-cupm'); return c ? (c.textContent || 'c') : ''; }));
      const left1 = await C(page, () => window.__lab.run.drink);
      const okDrink = (!firstMenu || J(firstMenu) === J(['tea'])) && J(menu) === J(['tea', 'coffee', 'sorghum']) && dk.drink && dk.drink.kind === 'coffee' && dk.drink.left === 3 && dk.money === 9000 - x.fair.drinks.coffee.price &&
        cups0.filter(Boolean).length === 3 && cups0.find(Boolean) === '3' && dv.drink && dv.drink.kind === 'coffee' && dv.pDef === dv.base + x.fair.drinks.coffee.def && left1 && left1.left === 2 && cups1.filter(Boolean).length === 2 && cups1.find(Boolean) === '2';
      record('15b', size, okDrink && lv.go && !errs(page).length,
        `第一個市集 ${first.first}（飲料攤 ${first.tiles.includes('snack')}）只擺 ${J(firstMenu)}；一般輪 ${J(menu)}；熱美式 ${J(dk.drink)} $${dk.money} → 來客條 ${J(cups0)}；對決 ${J(dv)}；打完一位 ${J(left1)} 來客條 ${J(cups1)}；${errTxt(page)}${missTxt(page)}`);

      // ---- c 轉蛋（六格各固定一次）
      const cellRes = [];
      for (const cell of ['gold', 'cash', 'heal', 'relic', 'bump', 'ouch']) {
        await marketAt(page, 21, { money: 9000, leave: 1, tiles: ['gear', 'doctor', 'snack', 'fortune', 'dig'], free: [] });
        const b0 = await C(page, c => { const r = window.__lab.run; window.DipLabContent.waveC.stall.fair.gacha.cells = [c]; r.hp = Math.max(4, r.maxHp - 5); r.relics = r.relics.slice(0, 1); window.__lab.money(9000); window.__lab.go('night'); return { bag: r.bag.length, hp: r.hp, max: r.maxHp, relics: r.relics.length, money: 9000, fortune: (r.fortune || []).length }; }, cell);
        await gridReady(page);
        await enter(page, 'gear'); await sheetReady(page, 'gear'); if (cell === 'gold') await lay('gacha');
        // relic 格：引擎從配件池（扣掉擁有的）照雜湊挑第 1 件，剛好是攤上擺的那兩件之一＝改給 relicCash（不是配件格滿；交主線）。這裡先把攤上那兩件拿掉，測「轉到一件配件」那條路
        if (cell === 'relic') await C(page, () => { window.__lab.run.pending.cur.relics = []; });
        await tapSheet(page, '[data-a=gacha]');
        await page.waitForSelector('.lb-sheet.stall [data-a=egg]', { timeout: 5000 }).catch(() => {});
        await sleep(1500); if (cell === 'gold') await lay('gachaEgg');
        const e0 = await C(page, () => { const s = window.DipLabStalls.state(), sh = document.querySelector('.lb-sheet.stall'); return { ph: s.gacha && s.gacha.phase, res: !!sh.querySelector('.st-gres'), mn: (sh.querySelector('.st-shd .mn') || {}).textContent || '', money: window.__lab.run.money }; });
        await tapSheet(page, '[data-a=egg]');
        const e1 = await C(page, () => { const r = window.__lab.run, s = window.DipLabStalls.state(), sh = document.querySelector('.lb-sheet.stall'); return { ph: s.gacha && s.gacha.phase, cell: s.gacha && s.gacha.cell, tx: (sh.querySelector('.st-gres') || {}).textContent || '', bag: r.bag.length, hp: r.hp, relics: r.relics.length, money: r.money, fortune: (r.fortune || []).filter(f => f.src === 'gacha'), last: r.pending.cur && r.pending.cur.gacha && r.pending.cur.gacha.last }; });
        const L = e1.last || {}, mny = 9000 - x.fair.gacha.price[0];
        const effOk = cell === 'gold' ? e1.bag === b0.bag + 1 && e1.tx.includes(x.mkGachaGold) : cell === 'cash' ? e1.money === mny + x.fair.gacha.cash && e1.tx.includes(fill(x.mkGachaCash.replace('${n}', '$' + mtx(x.fair.gacha.cash)), {})) :
          cell === 'heal' ? e1.hp === b0.max && e1.tx.includes(x.mkGachaHeal) : cell === 'relic' ? e1.relics === b0.relics + 1 && e1.tx.includes(x.mkGachaRelic) :
          cell === 'bump' ? e1.fortune.length === 1 && e1.tx.includes(fill(x.mkGachaBump, { pos: e1.fortune[0].pos, n: x.fair.gacha.bumpAtk })) : e1.hp === b0.hp - x.fair.gacha.ouch && e1.tx.includes(fill(x.mkGachaOuch, { n: x.fair.gacha.ouch }));
        const hideOk = cell !== 'cash' || (e0.mn.includes(mtx(mny)) && e0.money === mny + x.fair.gacha.cash);
        cellRes.push({ cell, egg: e0.ph === 'egg' && !e0.res, open: e1.ph === 'open' && e1.cell === cell, effOk, hideOk });
        if (cell === 'bump') {                                       // 第 2 顆 $2,000 → 轉滿「今晚轉夠了」；收攤後來客條那位頭像「轉」
          await tapSheet(page, '[data-a=gacha]'); await page.waitForSelector('.lb-sheet.stall [data-a=egg]', { timeout: 5000 }).catch(() => {}); await tapSheet(page, '[data-a=egg]');
          const e2 = await C(page, () => ({ money: window.__lab.run.money, tx: (document.querySelector('.lb-sheet.stall') || {}).textContent || '', lever: !!document.querySelector('.lb-sheet.stall [data-a=gacha]') }));
          cellRes.push({ cell: 'second', ok: e2.money === mny - x.fair.gacha.price[1] && !e2.lever && e2.tx.includes(x.mkGachaMax) });
          await tapSheet(page, '[data-a=back]'); await gridReady(page);
          await leaveMarket(page);
          const gm = await guestMarks(page);
          cellRes.push({ cell: 'bumpTag', ok: gm.filter(g => g.om === x.mkBumpTag).length === 1 });
          continue;
        }
        const bk = (await page.$('.lb-sheet.stall [data-a=back]')) ? '[data-a=back]' : '[data-a=noted]';
        await tapSheet(page, bk); await gridReady(page);
      }
      await C(page, () => { window.DipLabContent.waveC.stall.fair.gacha.cells = ['gold', 'cash', 'heal', 'relic', 'bump', 'ouch']; });
      const okG = cellRes.every(c => c.ok !== false && (c.ok === true || (c.egg && c.open && c.effOk && c.hideOk)));
      record('15c', size, okG && !errs(page).length, `${J(cellRes)}；${errTxt(page)}${missTxt(page)}`);
      // 15c2 配件格照規格（CONTRACT §2.3「配件一件（配件格滿 3 件＝改給 $2,000）」）：配件還沒滿、配件池還有攤上那兩件以外的，就要給一件配件、不能改給錢。
      //   上面 15c 的 relic 格先把攤上兩件拿掉才轉（畫面棒 11-23：引擎 wcRelics(…, 1) 先取 1 件再扣掉攤上的＝取到攤上那件就變成錢）；這裡不拿掉、引擎直接試
      //   打完第 21〜60 位每一場（run 拷貝；小物攤＋轉蛋固定 relic 格、配件只留 1 件）：數「配件沒滿、池裡還有別件，卻給了錢」幾場
      const rc = await C(page, () => {
        const E = window.DipLabEngine, Cn = window.DipLabContent, F = Cn.waveC.stall.fair, keep = F.gacha.cells.slice(), out = { n: 0, cash: [], relic: 0 };
        F.gacha.cells = ['relic'];
        try {
          for (let after = 21; after <= 60; after++) {
            const r = JSON.parse(JSON.stringify(window.__lab.run)); r.pending = null; r.duel = null;
            E.jumpTo(r, Cn, after + 1); r.relics = r.relics.slice(0, 1); r.money = 99999; E.stallSession(r, Cn);
            const p = r.pending; if (!p || p.mode !== 'market') continue;
            p.free = []; p.tiles = ['gear', 'doctor', 'snack', 'fortune', 'dig'];
            if (!(E.choose(r, Cn, { type: 'stallEnter', kind: 'gear' }) || {}).ok || !p.cur || !p.cur.gacha) continue;
            const shown = (p.cur.relics || []).slice(), res = E.choose(r, Cn, { type: 'stallAct', act: 'gacha' }) || {}, ef = (res.effects || []).find(e => e && e.gacha != null) || {};
            out.n++; if (ef.relic) out.relic++; else out.cash.push({ after, shown, cash: ef.cash });
          }
        } finally { F.gacha.cells = keep; }
        return out;
      });
      record('15c2', size, rc.n >= 30 && !rc.cash.length,
        `打完第 21〜60 位 ${rc.n} 場、配件只有 1 件：給配件 ${rc.relic}、改給錢 ${rc.cash.length}${rc.cash.length ? ' ' + J(rc.cash.slice(0, 4)) : ''}（應為 0：engine.js 轉蛋 relic 格 wcRelics(…, 1, true) 先取 1 件再扣掉攤上的）`);

      // ---- d 算命心情題
      const s4 = await marketAt(page, 22, { money: 9000, leave: 1, tiles: ['fortune', 'doctor', 'snack', 'gear', 'dig'], free: [] });
      const want0 = await C(page, () => window.__lab.home.want().length);
      const c0 = page._clicks;
      await enter(page, 'fortune');
      await page.waitForSelector('.lb-sheet.stall [data-mo]', { timeout: 8000 }).catch(() => {}); await settle(page, '.lb-sheet.stall'); await lay('mood0');
      const q0 = await C(page, () => { const r = window.__lab.run, s = window.DipLabStalls.state(); return { ask: !!s.ask, q: s.moodQ, left: r.pending.left, cur: r.pending.cur, n: document.querySelectorAll('.lb-sheet.stall [data-mo]').length, tx: (document.querySelector('.lb-sheet.stall .qq') || {}).textContent || '' }; });
      const qs = [q0.q];
      await tapSheet(page, '[data-mo="1"]'); await page.waitForSelector('.lb-sheet.stall [data-mo]', { timeout: 6000 }).catch(() => {}); await settle(page, '.lb-sheet.stall'); await lay('mood1');
      const q1 = await C(page, () => { const r = window.__lab.run, s = window.DipLabStalls.state(); return { q: s.moodQ, left: r.pending.left, n: r.pending.cur && r.pending.cur.n, ans: r.pending.moodAns }; });
      qs.push(q1.q);
      await tapSheet(page, '[data-mo="0"]'); await page.waitForSelector('.lb-sheet.stall [data-mo]', { timeout: 6000 }).catch(() => {}); await settle(page, '.lb-sheet.stall'); await lay('mood2');
      qs.push(await C(page, () => window.DipLabStalls.state().moodQ));
      await tapSheet(page, '[data-mo="2"]');
      await page.waitForSelector('.lb-sheet.stall .st-moodr', { timeout: 8000 }).catch(() => {}); await settle(page, '.lb-sheet.stall'); await sleep(1500); await lay('moodR');
      const mr = await C(page, async () => {
        const r = window.__lab.run, s = window.DipLabStalls.state(), sh = document.querySelector('.lb-sheet.stall');
        const qz = await (await fetch('../mood-quiz.json')).json(), bk = await (await fetch('../mood-bank.json')).json(), E = window.DipLabEngine, Cn = window.DipLabContent;
        const mood = E.moodOf(qz, r.pending.moodAns), c = s.mood && Cn.cards[s.mood.id], key = c ? (c.artist + '|' + c.album).toLowerCase() : '';
        const ps = (sh.querySelector('.st-moodr .ps') || {}).textContent || '';
        return { phase: s.phase, mood: s.mood, want: s.mood && window.__lab.home.want().includes(s.mood.id), name: (sh.querySelector('.st-moodr .is') || {}).textContent || '', wantName: qz.moods[mood].name, mood2: mood,
          inBank: !!(bk.passages[key] && (bk.passages[key][s.mood && s.mood.mood] || []).includes(ps)), ps: ps.length, seen: (r.moodSeen || []).slice(), ans: r.pending.moodAns };
      });
      await tapSheet(page, '[data-a=noted],[data-a=notedLeave]');
      const back = await gridReady(page);
      const taps = page._clicks - c0;
      const okMood = q0.ask && q0.q && !q0.cur && q0.left === s4.left && q0.n === 4 && q0.tx && q1.n === 1 && q1.left === s4.left - 1 && q1.ans && q1.ans[0] && q1.ans[0].q === q0.q && q1.ans[0].o === 1 &&
        new Set(qs).size === 3 && mr.phase === 'hold' && mr.mood && mr.mood.mood === mr.mood2 && mr.name.includes(mr.wantName) && mr.inBank && mr.want && J(mr.seen.slice(-3)) === J(qs) && back;
      record('15d', size, okMood && !errs(page).length,
        `打開前先問 ${q0.ask}（月亮 ${s4.left}→${q0.left}、cur ${q0.cur}、選項 ${q0.n}「${q0.tx}」）→ 選一個＝翻第 1 張 ${q1.n}、月亮 ${q1.left}、moodAns ${J(q1.ans)}；三題 ${J(qs)}；` +
        `翻滿：心情「${mr.name}」（${mr.mood2}）、段落在題庫原文 ${mr.inBank}（${mr.ps} 字）、想要清單 ${mr.want}（${want0}→）、停住 ${mr.phase} → 回攤位 ${back}；全點（打開＋三題＋記下了）${taps} 下（I-3a 翻籤 4 下）；${errTxt(page)}${missTxt(page)}`);

      // ---- f 高粱（一般輪；手上有熱美式＝高粱那杯寫「會換掉手上那杯熱美式」→ 點高粱換掉）：來客條兩位杯子、最前面寫「2」→ 對決：品味 +1、杯子紅點（view.drink.pen 1）
      //   → 第一次被剋（setNext 他出剋你那色）：扣的＝同一份對決拿掉高粱的 preview＋1、結果行「高粱後勁：多扣 1」、紅點熄 → 第二次被剋：不多扣、沒那句
      //   → 打完這位杯子剩 1 → 下一位又是第一次（pen 1、品味 +1）→ 打完杯子沒了
      await marketAt(page, 20, { money: 9000, leave: 1, tiles: ['snack', 'doctor', 'gear', 'fortune', 'dig'], free: [] });
      //   聲望拉到 40（這一位品味 5：被剋一手扣 10；要連挨兩手被剋才量得到「第二次不多扣」）
      await C(page, () => { const r = window.__lab.run; r.drink = { kind: 'coffee', left: 2 }; r.maxHp = Math.max(r.maxHp, 40); r.hp = r.maxHp; window.__lab.money(9000); window.__lab.go('night'); }); await gridReady(page);
      await enter(page, 'snack'); await sheetReady(page, 'snack'); await lay('snackSwap');
      const sw = await C(page, () => [...document.querySelectorAll('.lb-sheet.stall [data-drink]')].map(b => [b.getAttribute('data-drink'), (b.querySelector('.sw') || {}).textContent || '']));
      await tapSheet(page, '[data-drink="sorghum"]'); await gridReady(page);
      const sk = await C(page, () => ({ drink: window.__lab.run.drink, money: window.__lab.run.money }));
      const lvS = await leaveMarket(page);
      const sc0 = await cupsOf(page);
      await toDuel(page); const dr1 = await duelReady(page, 20000); await sleep(400);
      const sv0 = await drinkView(page);
      const pl1 = await counteredPlan(page);
      const h1 = pl1 ? await playPlan(page, pl1) : null;
      const sv1 = await drinkView(page);
      const pl2 = await counteredPlan(page);
      const h2 = pl2 ? await playPlan(page, pl2) : null;
      const pen = fill(x.mkPenNote, { n: x.fair.drinks.sorghum.pen });
      await winOne(page);
      const sc1 = await cupsOf(page), sd1 = await C(page, () => window.__lab.run.drink);
      await toDuel(page); await duelReady(page, 20000); await sleep(400);
      const sv2 = await drinkView(page);
      await winOne(page);
      const sc2 = await cupsOf(page), sd2 = await C(page, () => window.__lab.run.drink);
      const SG = x.fair.drinks.sorghum;
      const okSorg = J(sw.find(b => b[0] === 'sorghum')) === J(['sorghum', fill(x.mkDrinkSwap, { name: x.drinkNames.coffee })]) && J(sw.find(b => b[0] === 'tea')) === J(['tea', '']) &&
        sk.drink && sk.drink.kind === 'sorghum' && sk.drink.left === SG.n && sk.money === 9000 - SG.price && lvS.go &&
        sc0.filter(Boolean).length === SG.n && sc0.find(Boolean) === String(SG.n) && dr1 &&
        sv0.drink && sv0.drink.kind === 'sorghum' && sv0.drink.pen === SG.pen && sv0.pAtk === sv0.bAtk + SG.atk && sv0.pDef === sv0.bDef && sv0.cup && sv0.dot &&
        !!pl1 && pl1.toP === pl1.base + SG.pen && J(pl1.notes) === J([pen]) && h1 && h1.kind === 'countered' && h1.toP === pl1.toP && h1.notes.includes(pen) && h1.dp === pl1.toP &&
        sv1.drink && sv1.drink.pen === 0 && sv1.cup && !sv1.dot &&
        !!pl2 && pl2.toP === pl2.base && !pl2.notes.length && h2 && h2.kind === 'countered' && h2.toP === pl2.toP && !h2.notes.includes(pen) && h2.dp === pl2.toP &&
        sd1 && sd1.kind === 'sorghum' && sd1.left === SG.n - 1 && sc1.filter(Boolean).length === SG.n - 1 && sc1.find(Boolean) === String(SG.n - 1) &&
        sv2.drink && sv2.drink.pen === SG.pen && sv2.pAtk === sv2.bAtk + SG.atk && sv2.dot && sd2 === null && !sc2.filter(Boolean).length;
      record('15f', size, okSorg && !errs(page).length,
        `三杯 ${J(sw)}；手上熱美式 → 高粱 ${J(sk)}、來客條 ${J(sc0)}；對決 ${J(sv0)}；第一次被剋 預期 ${pl1 && pl1.base}+${SG.pen}=${pl1 && pl1.toP}${J(pl1 && pl1.notes)} → 實際 ${J(h1)}、之後 ${J(sv1)}；` +
        `第二次被剋 預期 ${pl2 && pl2.toP}（拿掉高粱 ${pl2 && pl2.base}）→ 實際 ${J(h2)}；打完一位 ${J(sd1)} 來客條 ${J(sc1)}；下一位 ${J(sv2)}；再打完 ${J(sd2)} 來客條 ${J(sc2)}；${errTxt(page)}${missTxt(page)}`);

      // ---- i 想要清單滿 200：算命心情題照問、翻滿照唸，那張不進清單、寫「想要清單滿了…」
      await marketAt(page, 23, { money: 9000, leave: 1, tiles: ['fortune', 'doctor', 'snack', 'gear', 'dig'], free: [] });
      const wfull = await C(page, () => { const Cn = window.DipLabContent, s = window.__lab.save, ids = Object.keys(Cn.cards).filter(id => !Cn.cards[id].tier).slice(1000, 1200);
        s.want = ids; window.__lab.money(9000); window.__lab.go('night'); return s.want.length; });
      await gridReady(page);
      const mf = await moodFlow(page);
      const wf = await C(page, id => ({ n: window.__lab.home.want().length, has: window.__lab.home.want().includes(id), tx: (document.querySelector('.lb-sheet.stall .st-moodr .pk small') || {}).textContent || '', st: (window.DipLabStalls.state().mood || {}).want }), mf.id);
      await tapSheet(page, '[data-a=noted],[data-a=notedLeave]'); const gbI = await gridReady(page);
      record('15i', size, wfull === 200 && mf.ok && wf.n === 200 && !wf.has && wf.st === 'full' && wf.tx === x.mkMoodWantFull && gbI && !errs(page).length,
        `清單 ${wfull} 張 → 三題 ${J(mf.qs)}、心情 ${mf.mood}、那張 ${mf.id}（段落原文 ${mf.inBank}）→ 清單 ${wf.n} 張、有那張 ${wf.has}、「${wf.tx}」（${wf.st}）→ 回攤位 ${gbI}；${errTxt(page)}${missTxt(page)}`);

      // ---- e 版面
      record('15e', size, !bad.length && !errs(page).length, `${J(lays)}${bad.length ? '；不合 ' + J(bad) : ''}；${errTxt(page)}`);
    } catch (e) { record('15', size, false, 'exception ' + e.message + ' ' + (e.stack || '').split('\n')[1]); }
    await ctx.close();
  }

  // ---- 15g 切磋不扣杯數（SPEC-I §6.3「切磋不扣杯數」、§8；?crowd=1&enc=force：熟客在店裡逛，點他聊天開邀請面板（v6 第 3 條））：手上熱美式 3 位 → 切磋裡照樣底氣 +1（view.drink）→ 打完（輸）回來客畫面：杯數、來客條杯子、位數都沒動
  if (want(15)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      const q = Q('&fast=1&newstalls=1&mood=0&crowd=1&enc=force');
      await openTitle(page, q);
      const seen = await C(page, () => { const Cn = window.DipLabContent, o = { crowdIntro: true, expertIntro: true, lotHint: true }; Object.keys(Cn.coachTips || {}).concat(Object.keys(Cn.hints || {})).forEach(k => { o[k] = true; }); return o; });
      await seedRun(page, { idx: 1, seen });
      await C(page, () => { const s = JSON.parse(localStorage.getItem('dipGameLab_v1')); s.run.drink = { kind: 'coffee', left: 3 }; localStorage.setItem('dipGameLab_v1', JSON.stringify(s)); });
      await openTitle(page, q); await jsClick(page, '[data-a=cont]'); await waitScreen(page, 'night', 20000);
      let s0 = null; const t0 = Date.now();
      const roamAt = () => C(page, () => { const e = window.__lab.crowd && window.__lab.crowd.enc ? window.__lab.crowd.enc() : null, w = e && e.ui && e.ui.phase === 'roam' ? e.ui.who : null;
        const q = w && window.__lab.crowd.state().slots.find(x => x.on && x.who === w && !x.hidden && x.phase === 'stay' && !x.walking && x.y >= 150); return q ? Object.assign(e, { slot: q.slot }) : null; });
      while (Date.now() - t0 < 20000) { const e = await roamAt(); if (e) { s0 = e; break; } await sleep(150); }
      await sleep(400);
      const x = await UI(page);
      const r0 = await C(page, () => ({ drink: window.__lab.run.drink, pos: window.__lab.run.pos, idx: window.__lab.run.idx }));
      const ca = await cupsOf(page);
      let hot = null, sheet = false;
      for (let k = 0; k < 3 && !sheet; k++) {
        const e = k ? await roamAt() : s0; if (!e) { await sleep(500); continue; }
        hot = await tapHot(page, 'h => h.id === "cw-' + e.slot + '"');
        sheet = await page.waitForSelector('.lb-sheet.float.enc', { timeout: 3000 }).then(() => true, () => false);
      }
      await sleep(450);
      await C(page, () => window.__lab.force({ kind: 'counter', toE: 0, toP: 99 }));
      await tapReady(page, '.lb-sheet.float.enc [data-a=encYes]');
      const ready = await duelReady(page, 20000); await sleep(600);
      const dv = await drinkView(page), sp0 = await C(page, () => window.__lab.run.spar && window.__lab.run.spar.state);
      await C(page, () => window.DipLabDuel.autoplay && window.DipLabDuel.autoplay('thoughtful'));
      const back = await waitScreen(page, 'night', 60000);
      await C(page, () => window.__lab.force(null));
      await page.waitForFunction(() => window.__lab.run.spar && window.__lab.run.spar.state === 'lost', null, { timeout: 5000 }).catch(() => {});
      await sleep(900);
      const r1 = await C(page, () => ({ drink: window.__lab.run.drink, pos: window.__lab.run.pos, idx: window.__lab.run.idx, spar: window.__lab.run.spar && window.__lab.run.spar.state }));
      const cb = await cupsOf(page);
      const CF = x.fair.drinks.coffee;
      record('15g', size, !!s0 && !!hot && sheet && ready && sp0 === 'fighting' && dv.drink && dv.drink.kind === 'coffee' && dv.pDef === dv.bDef + CF.def && dv.cup && back && r1.spar === 'lost' &&
        J(r1.drink) === J({ kind: 'coffee', left: 3 }) && J(r0.drink) === J(r1.drink) && r1.pos === r0.pos && r1.idx === r0.idx && ca.filter(Boolean).length === 3 && ca.find(Boolean) === '3' && J(cb) === J(ca) && !errs(page).length,
        `熟客邀 ${!!s0}（${s0 && s0.ui && s0.ui.who}）、點他 ${hot && hot.id}、面板 ${sheet}；切磋前 ${J(r0)} 來客條 ${J(ca)}；切磋裡 ${J(dv)}（${sp0}）→ 打完 ${back} ${J(r1)} 來客條 ${J(cb)}；${errTxt(page)}`);
    } catch (e) { record('15g', size, false, 'exception ' + e.message + ' ' + (e.stack || '').split('\n')[1]); }
    await ctx.close();
  }

  // ---- 15h 題庫抓不到（路由擋掉）：擋 ../mood-quiz.json＝點算命攤照 I-3a 直接打開（翻第一張、不問、扣時段）、第 2／3 張照 I-3a 翻籤鈕、翻滿照 I-3a 停住；同一頁下一個市集也一樣（不再試）
  //   擋 ../mood-bank.json（題目抓得到）＝三題照問、照翻；翻滿沒有段落＝照 I-3a 停住（不畫心情、想要清單不動）
  if (want(15)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      const QN = (z = '') => Q('&fast=1&newstalls=1' + z);
      const res = [];
      await page.route(/\/mood-quiz\.json(\?.*)?$/, r => r.abort());
      await start(page, { q: QN(), extra: 3 });
      for (const after of [22, 23]) {
        const s5 = await marketAt(page, after, { money: 9000, leave: 1, tiles: ['fortune', 'doctor', 'snack', 'gear', 'dig'], free: [] });
        await enter(page, 'fortune');
        await page.waitForFunction(() => { const p = window.__lab.run.pending; return !!(p && p.cur && p.cur.kind === 'fortune'); }, null, { timeout: 8000 }).catch(() => {});
        await sheetReady(page, 'fortune');
        const f0 = await C(page, () => { const r = window.__lab.run, s = window.DipLabStalls.state(), sh = document.querySelector('.lb-sheet.stall'); return { st: s.moodSt, ask: !!s.ask, n: r.pending.cur && r.pending.cur.n, left: r.pending.left, mo: sh ? sh.querySelectorAll('[data-mo]').length : -1, flip: !!(sh && sh.querySelector('.st-slip.next .lb-btn[data-a=flip]')) }; });
        await tapSheet(page, '.st-slip.next .lb-btn[data-a=flip]'); await sleep(400);
        await tapSheet(page, '.st-slip.next .lb-btn[data-a=flip]');
        await page.waitForFunction(() => { const s = window.DipLabStalls.state(); return !!s && s.hold; }, null, { timeout: 6000 }).catch(() => {});
        await sleep(1500);
        const f1 = await C(page, () => { const s = window.DipLabStalls.state(), r = window.__lab.run, sh = document.querySelector('.lb-sheet.stall'); return { hold: !!s.hold, moodr: !!document.querySelector('.st-moodr'), noted: !!(sh && sh.querySelector('[data-a=noted],[data-a=notedLeave]')), up: sh ? sh.querySelectorAll('.st-slip.up').length : 0, ans: r.pending.moodAns || null, seen: (r.moodSeen || []).length }; });
        await tapSheet(page, '[data-a=noted],[data-a=notedLeave]'); const gb = await gridReady(page);
        res.push({ after, ok: f0.st === -1 && !f0.ask && f0.n === 1 && f0.left === s5.left - 1 && f0.mo === 0 && f0.flip && f1.hold && !f1.moodr && f1.noted && f1.up === 3 && !f1.ans && f1.seen === 0 && gb, f0, f1 });
      }
      await page.unroute(/\/mood-quiz\.json(\?.*)?$/);
      // 題庫抓得到、段落抓不到
      await page.route(/\/mood-bank\.json(\?.*)?$/, r => r.abort());
      await start(page, { q: QN(), extra: 3 });
      await marketAt(page, 22, { money: 9000, leave: 1, tiles: ['fortune', 'doctor', 'snack', 'gear', 'dig'], free: [] });
      const w0 = await C(page, () => window.__lab.home.want().length);
      const mb = await moodFlow(page);
      const w1 = await C(page, () => window.__lab.home.want().length);
      await tapSheet(page, '[data-a=noted],[data-a=notedLeave]'); const gbB = await gridReady(page);
      const okB = mb.qs.length === 3 && new Set(mb.qs).size === 3 && mb.hold && !mb.moodr && !mb.mood && mb.noted && Array.isArray(mb.ans) && mb.ans.filter(Boolean).length === 3 && w1 === w0 && gbB;
      record('15h', size, res.every(r => r.ok) && okB && !errs(page).length,
        `擋題目：${res.map(r => `第 ${r.after} 位之後 ${J(r.f0)} → 翻滿 ${J(r.f1)}`).join('；')}；擋段落：三題 ${J(mb.qs)}、停住 ${mb.hold}、畫心情 ${mb.moodr}、moodAns ${J(mb.ans)}、想要清單 ${w0}→${w1}、回攤位 ${gbB}；${errTxt(page)}${missTxt(page)}`);
    } catch (e) { record('15h', size, false, 'exception ' + e.message + ' ' + (e.stack || '').split('\n')[1]); }
    await ctx.close();
  }

  // ---------------------------------------------------------------- 16 §6.7 M5 全點（市集新攤開著、算命接題庫）：照 #7 的判法
  if (want(16)) {
    const { ctx, page } = await newPage(browser, w, h);
    try {
      await start(page, { q: Q('&fast=1&newstalls=1'), extra: 3 });
      const runs = [];
      const plans = [{ after: 15 }, { after: 25 }, { after: 35, tiles: ['doctor', 'gear', 'fortune', 'snack', 'dig'], prep: true }];   // 第 20、30 位是中繼點（不是一般輪）
      for (const P of plans) {
        await marketAt(page, P.after, { money: 30000, leave: 1, tiles: P.tiles, free: P.tiles ? [] : undefined });
        if (P.prep) await C(page, () => { const r = window.__lab.run, L = (Array.isArray(r.lineup) && r.lineup.length ? r.lineup : r.bag).slice(0, 2), nw = r.bag.filter(id => L.indexOf(id) < 0).slice(-1);
          r.wear = r.wear || {}; r.wear[L[0]] = { g: 3, n: 1 }; r.lineupFresh = (r.lineupFresh || []).concat(nw); window.__lab.money(30000); window.__lab.go('night'); });
        await gridReady(page); await sleep(400);
        const s0 = await mk(page);
        const c0 = page._clicks, log = [], per = {};
        let ok = true, lu = 0, cur = null, idle = 0;
        for (let g = 0; g < 80; g++) {
          if (await C(page, () => window.__lab.screen() === 'night' && !!document.querySelector('[data-a=go]') && !(window.__lab.run.pending && window.__lab.run.pending.type === 'stall') && !document.querySelector('#panel > .lb-sheet.lineup'))) break;
          if (await page.$('#panel > .lb-sheet.lineup [data-a=luGo]')) { const k0 = page._clicks; await tapReady(page, '#panel > .lb-sheet.lineup [data-a=luGo]'); lu += page._clicks - k0; log.push('luGo'); await sleep(600); continue; }
          const st = await C(page, () => { const s = window.DipLabStalls.state(); return s ? s.phase : null; });
          if (st !== 'grid' && st !== 'station' && st !== 'hold' && st !== 'leave') { await sleep(250); continue; }
          if (st === 'station' && !(await C(page, () => { const e = document.querySelector('.lb-sheet.stall.st-mk'); return !!e && !e.classList.contains('arming'); }))) { await sleep(200); continue; }
          const t = await policyTaps(page, { slotMin: -9, flips: 3, keep: true });   // keep：全點的點法看一眼值得做就直接做（engine mkKeep；sim 預設不走）
          if (t.done) { await sleep(300); continue; }
          if (t.wait) { if (++idle > 40) { ok = false; log.push('stuck'); break; } await sleep(200); continue; }
          idle = 0;
          if (t.none || !t.sel) { ok = false; log.push('none'); break; }
          if (/^enter /.test(t.ch)) cur = t.ch.slice(6);
          log.push(t.ch);
          const k0 = page._clicks;
          for (const s of t.sel) { if (!(await tapIn(page, s))) { ok = false; log.push('miss ' + s); break; } await sleep(300); }
          per[t.grid && !/^enter /.test(t.ch) ? '收攤' : cur || '?'] = (per[t.grid && !/^enter /.test(t.ch) ? '收攤' : cur || '?'] || 0) + page._clicks - k0;
          if (!ok) break;
          await sleep(400);
        }
        const s1 = await mk(page);
        runs.push({ after: P.after, taps: page._clicks - c0, lu, per, log, ok: ok && s1.go && !s1.mode, tiles: s0.p.tiles, slots: s0.p.slots, cp: s0.cp, mood: log.filter(c => c === 'mood').length ? 1 : 0, ns: await C(page, () => { const r = window.__lab.run; return { drink: r.drink || null, pressN: r.pressN || 0 }; }) });
      }
      const max = Math.max(...runs.map(r => r.taps - r.lu)), maxAll = Math.max(...runs.map(r => r.taps));
      const newOnes = runs.reduce((a, r) => a.concat(r.log.filter(c => /enter (doctor|gear)|^(wash|press|gacha|egg|mood)|^drink/.test(c))), []);
      const perMax = Math.max(...runs.map(r => Math.max(0, ...Object.values(r.per))));   // 11-27 主線 M5 改判：每攤做滿 ≤7、一般輪全點 ≤16
      record(16, size, runs.every(r => r.ok && r.lu <= 1 && !r.cp) && max <= 16 && perMax <= 7 && !errs(page).length,
        `M5 全點（?newstalls=1、算命接題庫；cPolicy slotMin −9、flips 3、錢 $30,000）：` + runs.map(r => `第 ${r.after} 位之後${r.cp ? '（中繼點）' : ''} ${J(r.tiles)} 時段 ${r.slots} → 市集 ${r.taps - r.lu} 下（不算題庫多問的那一下 ${r.taps - r.lu - r.mood}）＋上場面板 ${r.lu} 下 逐攤 ${J(r.per)} ${J(r.log)}${r.ok ? '' : '（沒走完）'}`).join('；') +
        `；市集最多 ${max} 下（≤16；含上場面板 ${maxAll}）、單攤最多 ${perMax} 下（≤7）；新攤動作 ${newOnes.length} 下；${errTxt(page)}${missTxt(page)}`);
    } catch (e) { record(16, size, false, 'exception ' + e.message + ' ' + (e.stack || '').split('\n')[1]); }
    await ctx.close();
  }
}

// ---------------------------------------------------------------- 13 抽攤規則（引擎；在頁面裡跑，只跑一次）
async function drawRules(browser) {
  const { ctx, page } = await newPage(browser, 390, 664);
  try {
    await start(page, { extra: 3 });
    const res = await C(page, () => {
      const E = window.DipLabEngine, Cn = window.DipLabContent, ST = Cn.waveC.stall, F = ST.fair, U = ST.unlock || {}, bad = [];
      let n = 0, cps = 0, n6 = 0;
      for (const seedKey of ['20261106', '777', '4242']) for (const six of [false, true]) {
        const base = E.newRun(Cn, { seedKey, runNo: 1, ace: 'hall', prologue: false, relics: [] }); base.tut = false;
        const ch = E.bargainPolicy(base, Cn); if (ch) E.choose(base, Cn, ch);
        for (let after = 5; after <= 200; after += 5) {
          const r = JSON.parse(JSON.stringify(base)); if (six) r.marketTiles = 6;
          E.jumpTo(r, Cn, after + 1); E.stallSession(r, Cn);
          const p = r.pending, paid = p.tiles.filter(k => !p.free.includes(k)), tag = seedKey + (six ? '/6' : '') + '#' + after;
          if (p.mode !== 'market') { bad.push(tag + ' mode ' + p.mode); continue; }
          if (p.first) {
            if (after !== 5 || JSON.stringify(paid) !== JSON.stringify(F.first) || JSON.stringify(p.free) !== JSON.stringify(['studio']) || p.slots !== F.slots) bad.push(tag + ' first ' + JSON.stringify(p.tiles));
            continue;
          }
          const core = p.cp ? paid.filter(k => k !== 'market') : paid;
          if (p.cp) { cps++; if (paid[paid.length - 1] !== 'market' || !p.free.includes('studio') || p.slots !== F.relaySlots) bad.push(tag + ' relay ' + JSON.stringify(p.tiles)); }
          else if (p.slots !== F.slots || p.free.includes('studio')) bad.push(tag + ' slots ' + p.slots);
          const want = !p.cp && six ? 6 : F.tiles;
          if (six && !p.cp) n6++;
          if (core.length !== want || new Set(core).size !== core.length) bad.push(tag + ' n ' + JSON.stringify(core));
          if (core.some(k => !(F.weights[k] > 0))) bad.push(tag + ' kind ' + JSON.stringify(core));
          if (core.filter(k => ST.paid.includes(k)).length > F.paidMax) bad.push(tag + ' paid ' + JSON.stringify(core));
          if (!core.some(k => ST.blue.includes(k))) bad.push(tag + ' blue ' + JSON.stringify(core));
          for (const k of Object.keys(U)) if (core.includes(k) && after < U[k]) bad.push(tag + ' unlock ' + k);
          if (p.free.includes('dare') && (p.cp || after < ST.dare.from)) bad.push(tag + ' dare');
          n++;
        }
      }
      return { n, cps, n6, bad };
    });
    // 畫面：藍框格＝stall.blue
    await marketAt(page, 25, { money: 20000, leave: 1 });
    const g = await C(page, () => ({ blue: window.DipLabContent.waveC.stall.blue, tiles: [...document.querySelectorAll('.st-mk .st-mt')].map(b => [b.getAttribute('data-k'), b.classList.contains('blue')]) }));
    const okBlue = g.tiles.every(([k, b]) => b === g.blue.includes(k));
    record(13, '390x664', !res.bad.length && res.n > 200 && res.cps > 10 && okBlue && !errs(page).length,
      `一般輪 ${res.n} 場（其中 6 攤 ${res.n6}）＋中繼點 ${res.cps} 場：不合 ${res.bad.length}${res.bad.length ? ' ' + J(res.bad.slice(0, 6)) : ''}；畫面藍框 ${J(g.tiles)} 對 stall.blue ${okBlue}；${errTxt(page)}${missTxt(page)}`);
  } catch (e) { record(13, '390x664', false, 'exception ' + e.message); }
  await ctx.close();
}

const browser = await launch();
for (const [w, h] of SIZES) await runSize(browser, w, h);
if (want(13)) await drawRules(browser);
await browser.close();
const fail = results.filter(r => !r.ok);
console.log(`\n${results.length - fail.length}/${results.length} 通過`);
process.exit(fail.length ? 1 : 0);
