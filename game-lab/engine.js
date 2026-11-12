// game-lab/engine.js — 品味對決 v4 pure rules engine (Agent A1).  SPEC-v4 §2.1（契約一字照做）、§2.2（content 由參數傳入）。
// No DOM, no Math.random, no Date. Every state object is plain JSON (save it as is); RNG = mulberry32 with its integer state in `.rng`.
// Browser: window.DipLabEngine ; Node: module.exports.  Content (content.js) is always passed in, never required.
//
// ============================================================================================================================
// API (VERSION 'lab-4'＝對決狀態；run.v === 5＝無限試煉)
// ----------------------------------------------------------------------------------------------------------------------------
// Constants  ATTRS ['c','o','h'] · ZH {c:'經典',o:'冷門',h:'硬蕊'} · ZH1 {c:'經',o:'冷',h:'硬'} · TIERS · TIER_AXIS · COLOR_RELIC
//            BEATS {o:'c',c:'h',h:'o'} (x beats BEATS[x]) · COUNTER_OF {c:'o',o:'h',h:'c'} (the attr that beats x) · beats(x,y)
//            CFG {playerHp 12, handSize 5, enemyHand 3, bagMax 8, retries 1, relicMax 3, threshold 2, maxRounds 6, aceStar 7,
//                 colorRelicBonus 1, dustcoverCut 1, cleanerTie 1, boostStar 1, bargainPick 3, mercy true}  (sim --set k=v 改這裡)
//            手牌 5 張＋王牌（FIXLIST 11：點牌才跳出三個屬性、平時疊成一排錯開；原版起手也是 5）；他的暗手維持 3 張。
//            你 12 聲望（無限試煉 §0；整趟帶著走，＝content.trial.youHp）；客人 12、藏家 14（content.trial.guestHp），一晚版的 9 對 20–28 不用了
// Cards      topAttr(card) 峰值軸，並列 c→o→h · peak(card) max(c,o,h) · deckMain(cards, taste) 牌單主屬性（並列峰值各算一票，票數並列照 taste）
// Clash      clash(p, e, {threshold}) p/e = {attr, star, ace} -> {kind, toE, toP, blocked: null|'gap', by: 'p'|'e'|null}
//              kind ∈ counter|countered|mirrorWin|mirrorLose|tie（mirror＝比星分出勝負，含「剋不動改比星」）
//              王牌沒有「不會被剋」（FIXLIST 2）：王牌＝那軸 7 星，照三相剋＋差 2 星門檻（≤5 星剋不動它；王牌對王牌照三相剋）。p.ace／e.ace 只是標記
//            playerAhead(pHp, pMax, eHp, eMax) 比聲望條剩幾成（hp÷max，一樣算你贏；FIXLIST 3）· hpPct(hp, max) 畫面用的 %（四捨五入、≥0）
//            pctPair(pHp, pMax, eHp, eMax) -> {p, e} 結果句的兩個 %（字串；整數一樣但勝負分得出來時改一位小數，數字永遠跟勝負一致）
//              （v3 墊片：clash(pStar, pAttr, eStar, eAttr) 也收，第二波 B2 改掉 ui.js 的舊呼叫後可刪）
// Duel       enemyDef(content, id, {tutorial, pos?, seedKey?, runNo?, playerAce?, bossAce?, planner?}) -> eDef（pos＝無限試煉第幾位：聲望／品味／底氣／
//              出招難度／說真話機率照位數曲線、牌組照 trialDeck、eDef.ace＝他帶的王牌）· playerDef(content, {bag, ace, relics, hp?, maxHp?, atk?, def?}) -> pDef
//            startDuel(pDef, eDef, {seed, enemyAce?, script?, hintTable?}) -> {duel, events}
//            品味／底氣（SPEC 無限試煉 §0；逐字照 curve harness core.cjs modded＋TAKEN.half）：你剋中（counter 且 toE>0）＋你的品味；
//              half(x, D) = max(ceil(x/2), x−D) 套在被扣的那方（他扣你：先＋他的品味再套你的底氣；你扣他：套他的底氣）。配件先算、再算這兩項；
//              notes 多 {stat:'atk'|'def'|'eAtk'|'eDef', n, text}（text＝C.trial.notes 代入 n）。preview 與 resolve 走同一個 outcome
//            legalActions(duel) · isLegal(duel, act)          act = {i:0..handSize−1（0..4）, attr} | {ace:true}
//            preview(duel, act, eSide) -> {kind,toE,toP,blocked,by,notes}   eSide = {i, attr}（他手牌第 i 張）| {attr, star, ace}（假設值）
//            resolveTurn(duel, act, {forcedPlay?:{i,attr}, debugOutcome?:{kind,toE,toP}}) -> Event[]   (illegal act → [] and nothing changes)
//            view(duel) -> 公開資訊（§2.1.5；不含他這手出哪張、哪色、有沒有唬人）；多 pAtk pDef eAtk eDef、eDeck（公開牌單的星數 {id,c,o,h,tier,plus}）、
//              honesty.qNow（這手放水後的說真話機率；策略用，畫面不寫）
//            bestChip(duel, attr, {ace}) · blockedChoice(duel, attr) -> {i, attr} | null（用 attr 出會被 'gap' 擋下的那張；教學第 5 手）
//            Events {t:'hand', n, hint:{attr, line}, eHandN, pile}
//                   {t:'clash', n, pCard, pAttr, pStar, pBase, ace, eCard, eAttr, eStar, eAce, kind, toE, toP, blocked, by, hint, bluff, notes, pHp, eHp}
//                   {t:'draw', i, card, reshuffled}     {t:'over', win, by:'hp'|'rounds'|'pile', pHp, eHp, pMax, eMax, pPct, ePct, pct:{p,e}}
//            勝負：誰的聲望先 ≤0 誰輸；兩邊同一手都 ≤0、六手打完（rounds）、他牌出完（pile）→ playerAhead（比聲望條剩幾成，一樣算你贏）
//            order per resolve: clash → draw (not after the ace) → over | hand
// Trial      無限試煉（run.v === 5；SPEC 無限試煉 §0–§2、map-engine §F）：序章打完＝第 1 位；一輪 5 位（一般 3、菁英、傳說藏家），打到輸為止；數字全在 content.trial
//            newRun(content, {seedKey, runNo（舊名 nightNo 照收）, ace, prologue?, relics?, bossAce?}) -> run    nextStep(run) → 'prologue'|'fight'|'duel'|'reward'|'level'|'retry'|null
//            current(run, content) · startFight(run, content, {tutorial?}) -> {duel, events, enemyId}   (run.duel already there → {…, events:[], resumed:true})
//            finishFight(run, content, duel?) -> {win, by, enemyId, met:[ids], offer, over, earn, pos, cls, heal, levelUps, checkpoint, aceWon}
//              贏：聲望 = min(上限, max(1, 剩下) + 3)；經驗 一般 2／菁英 3／藏家 4，滿「目前等級＋3」升一級（上限 +1、聲望 +1，再三選一）；連勝 +1；
//                打贏中繼點那一位（第 10、20、30、50、75、100 位，之後每 50）記進 run.checkpoints；打贏藏家 aceWon＝他的王牌（收進唱片櫃，畫面做）
//              輸：連勝歸 0；這一輪還能說情 → pending retry（同一位、同一副牌、聲望回到開打前 run.hpIn）；不能 → over 'dead'（沒有 'clear'）
//            順序：贏 → reward（挑唱片／配件）→ level（有升級才有，連升就連選）→ 下一位（第 5 位打完換新一輪：新面孔、說情重設、商店補貨）
//            classAt(pos) · roundOf(pos) · trialGuest(content, pos, cls) -> {hp, atk, def, planner, q} · trialDeck(content, id, pos, {seedKey, runNo, playerAce, bossAce})
//              -> {deck:[cards], ace, floor, buff, replaced}（換牌、加星、王牌全用 run 的雜湊 seedKey#runNo#pos，不碰對決亂數）
//            roundGuests(run, content) -> [{id, pos, cls, hp, atk, def, hasAce, done, cur}]（這一輪 5 位）· levelOffer(run, content) -> [{pick:'atk'|'def'|'hp', n}]×3
//            nextCheckpoint(pos, content?) · toCheckpoint(run, content?)（含目前這位還要贏幾位）· runSummary(run) -> {reached, bestStreak, taken, wins, level, checkpoints}
//            restock(run, content)（每輪開頭補貨：箱子、櫃檯、特價箱；扣掉包包裡的）· jumpTo(run, content, pos)（?debug=1 的 __lab：直接跳到第 n 位）
//            run 多 pos(1 起) round idx(輪內 0–4) order(這一輪 5 位) hp maxHp hpIn level xp atk def levelUps picks streak bestStreak checkpoints taken(收了幾張)
//            choose(run, content, ch) -> {ok, effects} | {ok:false, error}
//              ch: take／relic／skip／retry／end（v3）＋ bargainPick／buy／buyBargain／buyRelic（§2.1.6；錯的選擇完全不改 run）＋ level {pick:'atk'|'def'|'hp'}
//              賣回：buy {sellId}／buyBargain {sellIds} 只收包包裡、不是老闆送的（isGift）卡；送的 → error 'giftNoSell'
//              buyBargain {ids:[1–3], sellIds?}：每張照特價（bargainPriceOf）分開算、一次付總和；effects 每張 {gainCard, spend: 那張的價}
//            canShop(run) · canBargainPick(run)
//            runPolicy(run, content, {preferRelic}) · shopPolicy(run, content, 'none'|'smart') -> [ch] · bargainPolicy(run, content) -> ch
// Economy    台幣行情（FIXLIST 8＋X／Y 契約；數字在 content.economy，這裡的 ECON 是沒給時的預設）
//            categoryOf(card)：地區台灣 → 'tw'；否則第一個曲風（genre-tree 頂層十類，electronic → 'elec'）；對不到 → null · GENRE_BIN
//            rarityScore(card) ＝ c＋h＋(o===5 ? 1 : 0) · rarity(card) → 'common'≤5｜'rare'6｜'uncommon'7｜'epic'8｜'legendary'≥9｜'apex'（tier hall／pearl／heresy）
//              RARITY（由低到高）· FEATURE_RARITY ['epic','legendary'] · SHELF_RARITY ['common','rare','uncommon'] · SHOP_ORDER（上貨順序）
//            priceOf(content, card|id)：特價箱的卡＝bargainPriceOf；其他＝economy.price[rarity]（800／1000／1200／3000／4000；頂點 8000 先備好、不上架）
//            bargainPriceOf(content, card|id)：economy.bargain[最高星 1–3] ＝ 100／200／300 · relicPrice(content, id)：relics[id].price ?? economy.relicPrice（3000）
//            sellValue(content, card|relicId) ＝ floor(價 × sellRate 0.5) · moneyText(n) ＝ 千分位字串（1200 → '1,200'；C.shopUi 的字串自己帶 '$'）
//            isGift(run, content, id)：老闆送的（這一趟王牌那組的四張＋王牌本身）→ 不能賣回（FIXLIST 11 追加）；buy 的 sellId、buyBargain 的 sellIds 有它 → 'giftNoSell'。
//              客人丟的、買的、特價箱的照舊半價。拿獎勵時包包滿要「拿掉一張」（take 的 dropId）不是賣、不收錢，照舊可以選
//            run.shop（restock：newRun 與每輪開頭；種子＝seedKey#runNo#shop#輪，不碰 run.rng）：
//              { bins: { [key]: [ids] },     // content.bins（bins.js：每個 key { key, label, zh, pool, front }）的每一區：
//                                            //   feature 2–3 張（economy.featureStock；只抽史詩／傳奇）；jazz tw rock elec soul hiphop pop classical world folk blues
//                                            //   new picks 各 4–6 張（economy.stock；只抽普通／稀有／獨特）；照 SHOP_ORDER 上貨、全店同一輪不重複；
//                                            //   不上你的王牌、包包裡的、特價箱的、頂點卡；display:true 的區（舊牆面）不賣
//                relics: [ids],              // 櫃檯 2–3 件（economy.relicStock；relicShop.pool 扣掉身上的）
//                bargain: [ids],             // 特價箱 6 張＝經／冷／硬各 2（bargain.pool 9 張洗牌）
//                bargainPicked: boolean,     // 開局挑三張（免費）做過沒；只在第 1 位之前（canBargainPick：run.pos === 1）
//                firstGuestInside: boolean } // UI 用
// Policies   policies[name](duel, R, mem, content) -> act：random, high, counterHint, formula, mirrorHint, thoughtful, oracle, novice(=counterHint)
//            只有 oracle 讀 duel.plan／e.hand／e.pile；其他只看 view(duel)＋content。thoughtful 照 curve harness：讀實際（加星後）的公開牌單、
//            用放水後的 qNow、溢出傷害不算（打到 0 為止）、同分先取那軸星高的再取總星小的（tieHigh）
//            runPolicy 的升級照 harness MIX（A D A H D A X D A H；X＝引擎沒有「不加」，改拿聲望上限）
// ============================================================================================================================
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.DipLabEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const VERSION = 'lab-4';
  const RUN_V = 5;                                   // 無限試煉（v4 一晚版是 4；存檔 v4→v5 丟掉 run）
  const ATTRS = ['c', 'o', 'h'];
  const ZH = { c: '經典', o: '冷門', h: '硬蕊' };
  const ZH1 = { c: '經', o: '冷', h: '硬' };
  const BEATS = { o: 'c', c: 'h', h: 'o' };          // 冷剋經、經剋硬、硬剋冷：x beats BEATS[x]
  const COUNTER_OF = { c: 'o', o: 'h', h: 'c' };     // COUNTER_OF[x] = the attribute that beats x
  const beats = (x, y) => !!x && !!y && BEATS[x] === y;
  const TIERS = ['hall', 'pearl', 'heresy'];
  const TIER_AXIS = { hall: 'c', pearl: 'o', heresy: 'h' };
  const COLOR_RELIC = { c: 'obi', o: 'testpress', h: 'stylus' };          // X剋中多扣 1

  const CFG = {
    playerHp: 12,        // 無限試煉 §0：你 12 聲望（＝content.trial.youHp，check-content 對）；規則卡頁尾「你 12 聲望」照這個寫
    handSize: 5,         // FIXLIST 11：你的手牌 5 張（＋王牌格）；包包 8 張、打出一張補一張、牌堆抽完把丟過的洗回
    enemyHand: 3,        // 他的暗手維持 3 張（H5-A：他 3／4／5 張對通關率影響 ≤2 點，5 張反而讓 S2／S6 餘裕少 1–2 點）
    bagMax: 8, retries: 1, relicMax: 3,
    threshold: 2,        // D §5 規則 4：被剋方星數 − 剋方星數 ≥ 2 → 剋不動，改比星
    maxRounds: 6,        // D §5 規則 6：第 6 手結算完還沒人倒 → 比聲望條剩幾成（playerAhead），一樣算你贏
    aceStar: 7,
    colorRelicBonus: 1,  // 原版側標／神秘見本盤／黑膠唱針：那色剋中多扣 1
    dustcoverCut: 1,     // 防塵套：每場第一次被剋少扣 1
    cleanerTie: 1,       // 洗碟水：tie 時你扣他 1
    boostStar: 1,        // 重量盤／絕版編號標／內圈刻字：那色出招時 +1 星（王牌不加）
    bargainPick: 3,      // 每一趟開局特價箱挑 3 張（序章與再挑戰一趟都一樣；只在第 1 位之前）
    mercy: true,         // 原版 aiPlan 的 mercyLevel（你落後時他出招變鈍，roguelike.html:3618-3624）；sim 可 --set mercy=false 對照
  };
  // content 沒給時的預設（＝content.js 的 C.honesty／C.planners／C.economy／C.trial；直接呼叫 startDuel 的地方不傳 content 也不會壞）
  // 誠實度只在引擎裡（照實出的機率 q）；畫面上不寫任何誠實度字（FIXLIST 6，店主 2026-11-08 06:05）
  const HONESTY = { honest: { q: 1 }, sometimes: { q: 0.8 }, often: { q: 0.75 }, veteran: { q: 0.75 } };   // FIXLIST 10 平衡 R1（FIXLIST 11 H5-1 照用）
  const PLANNERS = { easy: { w: 0.45, nz: 2.4, mercy: false }, normal: { w: 0.6, nz: 1.4, mercy: true }, hard: { w: 0.7, nz: 0.8, mercy: true } };
  const DEFAULT_HINTS = { c: ['c1', 'c2', 'c3', 'c4', 'c5'], o: ['o1', 'o2', 'o3', 'o4', 'o5'], h: ['h1', 'h2', 'h3', 'h4', 'h5'] };
  // 台幣行情（FIXLIST 8＋X／Y 契約）：唱片照稀有度定價、特價箱每張照最高星、櫃檯配件一件 3000、賣回半價
  const ECON = { start: 1000, win: { prologue: 0, normal: 1500, elite: 2500, boss: 3750 },
    price: { common: 800, rare: 1000, uncommon: 1200, epic: 3000, legendary: 4000, apex: 8000 },
    bargain: { 1: 100, 2: 200, 3: 300 }, relicPrice: 3000, sellRate: 0.5, stock: [4, 6], featureStock: [2, 3], relicStock: [2, 3] };
  // 無限試煉（＝content.js 的 C.trial；沒給時的預設）。曲線 V3（../curve/curves.cjs：舊版 roguelike enemyForDepth 的形狀＋甲的斜率）
  const TRIAL = {
    classes: ['normal', 'normal', 'normal', 'elite', 'boss'],   // 一輪 5 位：一般 3、菁英、傳說藏家
    retry: 1, youHp: 12, heal: 3, guestHp: { normal: 12, elite: 12, boss: 14 },
    xp: { normal: 2, elite: 3, boss: 4 }, levelNeed: 3, levelHp: 1, picks: { atk: 1, def: 1, hp: 2 },
    checkpoints: [10, 20, 30, 50, 75, 100], checkpointEvery: 50,
    curve: {
      planner: { easyTo: 2, normalTo: 4 },                                         // 第 1–2 位 easy、3–4 normal、5 起 hard
      q: { easy: 1, normal: 0.85, feintBase: 0.18, feintStep: 0.05, feintFrom: 5, feintMax: 0.55 },   // hard：q＝1−min(.55, .18＋.05·max(0, 位−5))
      mercyFeint: 0.8,                                                              // 放水：唬人率 ×(1−0.8×mercy)（roguelike.html:3693-3695）
      atk: { lateFrom: 3, rate: 0.75, cap: 2, slopeFrom: 6, slopeEvery: 5, boss: 1, add: 0 },   // min(2, round(.75·late))＋⌊max(0, 位−6)/5⌋（藏家 +1）
      def: { lateFrom: 3, rate: 0.45, cap: 1, boss: 1, add: 0 },                                  // min(1, round(.45·late))（藏家 +1）
      deck: { floorBase: 3, floorRate: 0.7, floorMax: 13, minPool: 7, buffFrom: 3, buffEvery: 3, buffCap: 5, aceFrom: 5, aceRate: 0.15, aceMax: 0.6 },
    },
    tiers: [],
  };
  const POS_CLASSES = TRIAL.classes, PER_ROUND = POS_CLASSES.length;
  // 稀有度（CARD_GAME_DESIGN §5）：score＝經典＋硬蕊＋(冷門 5 ? 1 : 0)；≤5 普通、6 稀有、7 獨特、8 史詩、≥9 傳奇；頂點卡（殿堂／流亡／異端）＝頂點
  const RARITY = ['common', 'rare', 'uncommon', 'epic', 'legendary', 'apex'];
  const FEATURE_RARITY = ['epic', 'legendary'];            // 門口牆最靠門那格（FEATURE 店長推薦精選）只放這兩種
  const SHELF_RARITY = ['common', 'rare', 'uncommon'];     // 其他箱子、新進、店長推薦：一般稀有度
  // 上貨順序（全店同一輪不重複：先上的先拿）：FEATURE → 十一個分類箱 → 新進 → 店長推薦；不認得的鍵照字母排在最後
  const SHOP_ORDER = ['feature', 'jazz', 'tw', 'rock', 'elec', 'soul', 'hiphop', 'pop', 'classical', 'world', 'folk', 'blues', 'new', 'picks'];

  // ---------- RNG (mulberry32; state lives in the object so clones are deterministic) ----------
  function rng(st) {
    let a = st.rng = (st.rng + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  function makeRng(seed) { const o = { rng: seed | 0 }; return () => rng(o); }
  function shuffle(arr, st) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rng(st) * (i + 1)); const t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr; }
  const pickOne = (arr, st) => arr[Math.floor(rng(st) * arr.length)];
  function fnv1a32(str) { let h = 0x811c9dc5; str = String(str); for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); } return h >>> 0; }
  // 字串 → [0,1)：fnv1a32 再過 murmur3 的 fmix32（fnv 的低位元與高位元對相近的字串不夠亂；run 的雜湊都走這個）
  function hash01(str) { let h = fnv1a32(str); h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16; return (h >>> 0) / 4294967296; }
  const clone = o => JSON.parse(JSON.stringify(o));
  const star = (card, a) => (card && card[a]) | 0;
  const power = c => star(c, 'c') + star(c, 'o') + star(c, 'h');
  function tasteStr(t) { let s = Array.isArray(t) ? t.join('') : String(t || ''); s = s.split('').filter((x, k, a) => ATTRS.includes(x) && a.indexOf(x) === k).join(''); for (const a of ATTRS) if (!s.includes(a)) s += a; return s; }

  // ---------- 卡片 ----------
  function topAttr(card) { let b = 'c'; for (const a of ['o', 'h']) if (star(card, a) > star(card, b)) b = a; return b; }
  function peak(card) { return Math.max(star(card, 'c'), star(card, 'o'), star(card, 'h')); }
  // 牌單主屬性：每張卡的峰值軸算一票（並列的每一軸都算一票）；票數最多的那軸，並列照 taste
  function deckMain(cards, taste) {
    const t = tasteStr(taste), votes = { c: 0, o: 0, h: 0 };
    for (const c of cards || []) { if (!c) continue; const p = peak(c); for (const a of ATTRS) if (star(c, a) === p) votes[a]++; }
    let best = t[0];
    for (const a of t) if (votes[a] > votes[best]) best = a;
    return best;
  }
  const aceAxis = ace => ace ? (TIER_AXIS[ace.tier] || topAttr(ace)) : null;
  const isAce = c => !!(c && c.tier);
  const isAcePlay = (c, a) => isAce(c) && aceAxis(c) === a;                 // 王牌只在自己那軸算王牌
  const eStarOf = (c, a) => isAcePlay(c, a) ? CFG.aceStar : star(c, a);

  // ---------- 三相剋＋門檻：一手的結算（§2.1.3） ----------
  function clash(p, e, opts) {
    if (typeof p === 'number') { const x = arguments; return clash({ star: x[0], attr: x[1] }, { star: x[2], attr: x[3] }); }   // v3 墊片（ui.js 舊規則卡例子）
    const N = opts && opts.threshold != null ? opts.threshold : CFG.threshold;
    const ps = p.star | 0, es = e.star | 0;
    const cmp = (blocked, by) => {
      const d = ps - es;
      if (d > 0) return { kind: 'mirrorWin', toE: d, toP: 0, blocked, by };
      if (d < 0) return { kind: 'mirrorLose', toE: 0, toP: -d, blocked, by };
      return { kind: 'tie', toE: 0, toP: 0, blocked, by };
    };
    // 王牌沒有「不會被剋」（FIXLIST 2，店主 2026-11-08）：王牌只是 7 星，照三相剋＋差 2 星門檻；王牌對王牌一樣照三相剋
    if (p.attr === e.attr) return cmp(null, null);
    if (BEATS[p.attr] === e.attr) {                       // 你剋他
      if (es - ps >= N) return cmp('gap', 'p');
      return { kind: 'counter', toE: ps, toP: 0, blocked: null, by: 'p' };
    }
    if (ps - es >= N) return cmp('gap', 'e');             // 他剋你
    return { kind: 'countered', toE: 0, toP: es, blocked: null, by: 'e' };
  }

  // ---------- relics ----------
  function relicObj(r, content) {
    if (!r) return null;
    const id = typeof r === 'string' ? r : r.id;
    if (!id) return null;
    const d = typeof r === 'string' ? ((content && content.relics && content.relics[r]) || {}) : r;
    const o = { id, name: d.name || id, icon: d.icon || id, line: d.line || d.desc || '', note: d.note || '' };
    if (d.boost) o.boost = d.boost;
    if (d.v4 != null) o.v4 = !!d.v4;
    return o;
  }
  const hasRelic = (st, id) => st.p.relics.some(r => r.id === id);
  const noteOf = (st, id) => { const r = st.p.relics.find(x => x.id === id); return { relic: id, text: (r && r.note) || id }; };
  // 監聽耳機：v4 新效果（第一手他不唬人）只在 relic.v4 打開時生效（〔補〕⚠規則，預設不上架）
  const headphoneOn = st => st.p.relics.some(r => r.id === 'headphone' && r.v4 === true);

  // 加成與配件（§2.1.3 outcome）。pPlay/ePlay = {attr, star, ace}。純函式，除非 commit（只會改 dustUsed）
  function outcome(st, pPlay, ePlay, commit) {
    const notes = [];
    let ps = pPlay.star | 0;
    const boost = 'boost_' + pPlay.attr;
    if (!pPlay.ace && hasRelic(st, boost)) { ps += CFG.boostStar; notes.push(noteOf(st, boost)); }
    const r = clash({ attr: pPlay.attr, star: ps, ace: !!pPlay.ace }, { attr: ePlay.attr, star: ePlay.star | 0, ace: !!ePlay.ace });
    if (r.kind === 'counter' && hasRelic(st, COLOR_RELIC[pPlay.attr])) { r.toE += CFG.colorRelicBonus; notes.push(noteOf(st, COLOR_RELIC[pPlay.attr])); }
    if (r.kind === 'countered' && !st.p.dustUsed && hasRelic(st, 'dustcover')) {
      r.toP = Math.max(0, r.toP - CFG.dustcoverCut); notes.push(noteOf(st, 'dustcover'));
      if (commit) st.p.dustUsed = true;
    }
    if (r.kind === 'tie' && hasRelic(st, 'cleaner')) { r.toE += CFG.cleanerTie; notes.push(noteOf(st, 'cleaner')); }
    // 品味／底氣（無限試煉；逐字照 harness core.cjs modded＋TAKEN.half）：配件算完才加減
    const P = st.p, E = st.e, pA = P.atk | 0, pD = P.def | 0, eA = E.atk | 0, eD = E.def | 0;
    if (r.kind === 'counter' && r.toE > 0 && pA) { r.toE += pA; notes.push(statNote(st, 'atk', pA)); }
    if (r.toE > 0 && eD) { const v = half(r.toE, eD); if (v < r.toE) { notes.push(statNote(st, 'eDef', r.toE - v)); r.toE = v; } }
    if (r.toP > 0) {
      let x = r.toP;
      if (eA) { x += eA; notes.push(statNote(st, 'eAtk', eA)); }
      if (pD) { const v = half(x, pD); if (v < x) { notes.push(statNote(st, 'def', x - v)); x = v; } }
      r.toP = x;
    }
    r.notes = notes; r.pStar = ps;
    return r;
  }
  // 底氣最多擋一半：被扣 x、底氣 D → max(⌈x/2⌉, x−D)（variants TAKEN.half）
  const half = (x, D) => Math.max(Math.ceil(x / 2), x - D);
  // 結果行補的那句（C.trial.notes 由 playerDef 帶進對決；沒有字時 text 空、畫面不顯示）
  function statNote(st, stat, n) {
    const t = (st.noteText && st.noteText[stat]) || '';
    return { stat, n, text: t ? String(t).replace('{n}', n) : '' };
  }

  // ---------- duel creation ----------
  function cardFrom(content, id) { const c = content && content.cards && content.cards[id]; if (!c) throw new Error('engine: missing card ' + id); return c; }
  function hintTableOf(content) {
    const H = content && content.hints;
    if (!H || !ATTRS.every(a => Array.isArray(H[a]) && H[a].length)) return null;
    const t = {}; for (const a of ATTRS) t[a] = H[a].map(h => (h && typeof h === 'object') ? h.id : h).filter(Boolean);
    return t;
  }
  // enemyDef(content, id, {tutorial, pos, cls?, seedKey, runNo, playerAce, bossAce, planner}) — content enemy → eDef（§2.1.4）
  //   pos（無限試煉第幾位）：聲望、品味、底氣、出招難度、說真話機率照位數曲線（trialGuest；不再看角色），牌組照 trialDeck（eDef.ace＝他帶的王牌）；
  //     名字、小人、口頭禪、taste、誠實度的鍵照原角色。cls 沒給＝classAt(pos)
  //   沒給 pos（序章、教學、直接開打的對決）：聲望與牌單照 content；序章男子 easy、藏家 hard、其他 normal
  function enemyDef(content, id, o) {
    o = o || {};
    const E = content.enemies[id]; if (!E) throw new Error('engine: unknown enemy ' + id);
    const T = content.tutorial, tut = !!o.tutorial && !!T;
    const HT = content.honesty || HONESTY;
    const hk = HT[E.honesty] ? E.honesty : (E.prologue ? 'honest' : 'sometimes');
    const H = HT[hk] || HONESTY[hk];
    const pos = !E.prologue && Number.isInteger(o.pos) && o.pos > 0 ? o.pos : null;
    const cls = pos ? (POS_CLASSES.includes(o.cls) ? o.cls : classAt(pos)) : null;
    const g = pos ? trialGuest(content, pos, cls, o.tier) : null;
    let planner = o.planner || (g ? g.planner : E.prologue ? 'easy' : E.boss ? 'hard' : 'normal');
    const PL = content.planners || PLANNERS;
    const co = PL[planner] || PLANNERS[planner] || PLANNERS.normal;
    const d = { id, name: E.name, title: E.title || null, hp: tut ? T.hp : E.hp, taste: tasteStr(E.taste),
      deck: (E.deck || []).map(x => cardFrom(content, x)),
      honesty: hk, q: H.q, planner, coef: { w: co.w, nz: co.nz, mercy: !!co.mercy },
      elite: !!E.elite, boss: !!E.boss, atk: 0, def: 0, qMercy: trialCfg(content, o.tier).curve.mercyFeint, ace: null, pos: null, cls: null };
    if (g) {
      const td = trialDeck(content, id, pos, { seedKey: o.seedKey, runNo: o.runNo, playerAce: o.playerAce, bossAce: o.bossAce, cls, tier: o.tier });
      Object.assign(d, { hp: g.hp, atk: g.atk, def: g.def, q: g.q, deck: td.deck, ace: td.ace, pos, cls, elite: cls === 'elite', boss: cls === 'boss' });
    }
    return d;
  }
  // playerDef(content, {bag:[ids], ace:tier, relics:[ids], hp?, maxHp?, atk?, def?}) — a run (or anything shaped like it) → pDef
  //   run 帶著走的聲望（hp／maxHp）、品味（atk）、底氣（def）；沒有就 CFG.playerHp、0、0（教學重看、直接開打）
  function playerDef(content, src) {
    const hp = Number.isInteger(src.hp) && src.hp > 0 ? src.hp : CFG.playerHp;
    const maxHp = Number.isInteger(src.maxHp) && src.maxHp >= hp ? src.maxHp : Math.max(hp, CFG.playerHp);
    return { hp, maxHp, atk: src.atk | 0, def: src.def | 0, noteText: (((content || {}).trial || {}).notes) || null,
      bag: (src.bag || []).map(x => cardFrom(content, x)), ace: src.ace ? cardFrom(content, content.aces[src.ace]) : null,
      relics: (src.relics || []).map(r => relicObj(r, content)).filter(Boolean) };
  }
  function normScript(sc) {
    if (!sc || !Array.isArray(sc.plays)) return null;
    return { plays: sc.plays.map(p => ({ id: p.id, attr: p.attr })), hints: (sc.hints || []).slice(), hand: (sc.hand || []).slice(), draw: (sc.draw || []).slice() };
  }

  function startDuel(pDef, eDef, opts) {
    opts = opts || {};
    const sc = normScript(opts.script);
    const hp = pDef.hp || CFG.playerHp;
    const hk = HONESTY[eDef.honesty] ? eDef.honesty : 'honest';
    const co = eDef.coef || PLANNERS[eDef.planner] || PLANNERS.normal;
    const st = {
      v: VERSION, rng: (opts.seed >>> 0) || 1, n: 0, over: null,
      p: { hp, max: Math.max(hp, pDef.maxHp || hp), draw: [], hand: [], disc: [], ace: pDef.ace || null, aceUsed: false,
        relics: (pDef.relics || []).map(r => relicObj(r)).filter(Boolean).slice(0, CFG.relicMax), dustUsed: false, last: null,
        atk: pDef.atk | 0, def: pDef.def | 0 },
      e: { id: eDef.id, name: eDef.name, title: eDef.title || null, elite: !!eDef.elite, boss: !!eDef.boss,
        honesty: hk, q: eDef.q != null ? +eDef.q : HONESTY[hk].q, qMercy: eDef.qMercy != null ? +eDef.qMercy : 0,
        planner: eDef.planner || 'normal', coef: { w: co.w, nz: co.nz, mercy: !!co.mercy }, taste: tasteStr(eDef.taste),
        hp: eDef.hp, max: eDef.hp, atk: eDef.atk | 0, def: eDef.def | 0, deckIds: [], deckPub: [], pile: [], hand: [], thrown: [], last: null, deckSize: 0 },
      hintTable: opts.hintTable && ATTRS.every(a => Array.isArray(opts.hintTable[a]) && opts.hintTable[a].length) ? clone(opts.hintTable) : clone(DEFAULT_HINTS),
      noteText: pDef.noteText ? Object.assign({}, pDef.noteText) : null,
      script: sc, plan: null, last: null, log: [],
      stats: { hands: 0, counter: 0, countered: 0, mirror: 0, tie: 0, blocked: 0, blockedYou: 0, bluffs: 0, honest: 0, caught: 0, ace: 0, relicNotes: 0 },
    };
    const P = st.p, E = st.e;
    // 你的牌堆：script 的起手＋抽牌在前，剩下的照包包順序（有 script 不洗；教學第 5 手要抽到特價箱那幾張）；沒 script 整包洗
    const bag = (pDef.bag || []).filter(Boolean).slice();
    const takeIds = ids => { const out = []; for (const id of ids || []) { const k = bag.findIndex(c => c.id === id); if (k >= 0) out.push(bag.splice(k, 1)[0]); } return out; };
    if (sc) { const h = takeIds(sc.hand), d = takeIds(sc.draw); P.draw = h.concat(d, bag); }
    else P.draw = shuffle(bag, st);
    // 他的牌堆：牌單＋（藏家）你沒選的王牌；洗牌、不洗回（script：照 plays 的順序，其餘照牌單順序接在後面）
    const deck = (eDef.deck || []).slice();
    if (opts.enemyAce) deck.push(opts.enemyAce);
    E.deckSize = deck.length; E.deckIds = deck.map(c => c.id);
    E.deckPub = deck.map(c => ({ id: c.id, c: star(c, 'c'), o: star(c, 'o'), h: star(c, 'h'), tier: c.tier || null, plus: c.plus ? { attr: c.plus.attr, n: c.plus.n } : null }));   // 公開牌單的星數（加星後；view.eDeck）
    if (sc) {
      const first = []; for (const pl of sc.plays) { const k = deck.findIndex(c => c.id === pl.id); if (k >= 0) first.push(deck.splice(k, 1)[0]); }
      E.pile = first.concat(deck);
    } else E.pile = shuffle(deck, st);
    for (let i = 0; i < CFG.handSize; i++) P.hand.push(pull(st).card);
    const events = [];
    beginHand(st, events);
    return { duel: st, events };
  }

  // one card off your draw pile (reshuffles the discards when it runs out)
  function pull(st) {
    const P = st.p; let reshuffled = false;
    if (!P.draw.length && P.disc.length) { P.draw = shuffle(P.disc, st); P.disc = []; reshuffled = true; }
    return { card: P.draw.length ? P.draw.shift() : null, reshuffled };
  }

  // 手牌裡 a 軸星最大的那張（同星取三軸總和大的，再同取前面）；王牌只算在自己那一軸；noAce＝王牌不算
  function bestIdx(hand, a, noAce) {
    let bi = -1, bs = -1, bp = -1;
    for (let i = 0; i < hand.length; i++) {
      const c = hand[i]; if (!c) continue;
      if (isAce(c) && (noAce || aceAxis(c) !== a)) continue;
      const s = eStarOf(c, a), p = power(c);
      if (s > bs || (s === bs && p > bp)) { bi = i; bs = s; bp = p; }
    }
    return bi;
  }
  // 原版 mercyLevel（roguelike.html:3618-3624）：你落後越多，他出招越鈍
  function mercyOf(st) {
    const P = st.p, E = st.e;
    const pR = Math.max(0, P.hp) / (P.max || 1), eR = Math.max(0, E.hp) / (E.max || 1);
    let m = Math.max(0, eR - pR) * 1.3;
    if (P.hp <= 3) m += 0.35;
    return Math.min(1, m);
  }

  // 這手的說真話機率（放水後）：你落後時他少唬，唬人率 ×(1−qMercy×mercy)（舊版 roguelike.html:3693-3695，feintP×(1−0.8·mercy)）。
  //   只在出招難度有 mercy（normal／hard）且 CFG.mercy 時；不多取亂數（每手照樣 8 次）。view.honesty.qNow 給策略
  function qNowOf(st) {
    const E = st.e, co = E.coef || PLANNERS.normal, q = +E.q;
    if (!co.mercy || !CFG.mercy || !E.qMercy) return q;
    return 1 - (1 - q) * (1 - E.qMercy * mercyOf(st));
  }
  // 開手（§2.1.4）：他補牌 → 計畫屬性（原版 aiPlan 去掉相生／氣勢）→ 提示句 → 照實或唬人 → 出哪張。
  // RNG 每手固定 8 次（計畫 6＋提示 1＋照實 1），script／王牌／耳機都照取，讓 RNG 流不分支。
  function beginHand(st, events) {
    const E = st.e, P = st.p;
    st.n++;
    while (E.hand.length < CFG.enemyHand && E.pile.length) E.hand.push(E.pile.shift());
    const best = {}; for (const a of ATTRS) best[a] = bestIdx(E.hand, a, false);
    const co = E.coef || PLANNERS.normal, m = mercyOf(st), useMercy = !!co.mercy && !!CFG.mercy;
    let plan = null, ps = -Infinity;
    for (const a of ATTRS) {
      const u1 = rng(st), u2 = rng(st);
      if (best[a] < 0) continue;
      const s = co.w * eStarOf(E.hand[best[a]], a) + u1 * co.nz + (useMercy ? u2 * 5 * m : 0);
      if (plan === null || s > ps) { plan = a; ps = s; }
    }
    const uLine = rng(st), r = rng(st);
    const sc = st.script, sp = sc && sc.plays[st.n - 1];
    let idx = -1, attr, why;
    if (sp) {
      plan = sp.attr; attr = sp.attr; why = 'script';
      idx = E.hand.findIndex(c => c && c.id === sp.id);
      if (idx < 0) idx = bestIdx(E.hand, attr, true);
    } else if (plan !== null && isAce(E.hand[best[plan]])) {
      attr = plan; why = 'ace'; idx = best[plan];
    } else if (st.n === 1 && headphoneOn(st)) {
      attr = plan; why = 'headphone';
    } else if (r < qNowOf(st)) {
      attr = plan; why = 'honest';
    } else {
      attr = BEATS[plan]; why = 'bluff';
    }
    if (idx < 0) idx = bestIdx(E.hand, attr, true);       // 唬人絕不出王牌
    if (idx < 0) {                                        // 手上只剩王牌（理論上第 2 步已讓 plan＝王牌那軸）：照實出王牌
      idx = E.hand.findIndex(isAce); plan = attr = aceAxis(E.hand[idx]); why = 'ace';
    }
    // 提示句：照劇本，否則從那色的句子裡抽一句，不跟上一手同一句
    let line;
    if (sp && sc.hints[st.n - 1]) line = sc.hints[st.n - 1];
    else {
      const lines = (st.hintTable && st.hintTable[plan]) || DEFAULT_HINTS[plan];
      let k = Math.floor(uLine * lines.length);
      const prev = st.last && st.last.hint ? st.last.hint.line : null;
      if (lines.length > 1 && lines[k] === prev) k = (k + 1) % lines.length;
      line = lines[k];
    }
    st.plan = { hint: { attr: plan, line }, attr, idx, bluff: attr !== plan, why };
    events.push({ t: 'hand', n: st.n, hint: { attr: plan, line }, eHandN: E.hand.length, pile: E.pile.length });
  }

  function legalActions(st) {
    if (st.over) return [];
    const out = [];
    st.p.hand.forEach((c, i) => { if (c) for (const a of ATTRS) out.push({ i, attr: a }); });
    if (st.p.ace && !st.p.aceUsed) out.push({ ace: true, attr: aceAxis(st.p.ace) });
    return out;
  }
  function isLegal(st, act) {
    if (!st || st.over || !act) return false;
    if (act.ace) return !!st.p.ace && !st.p.aceUsed && (!act.attr || act.attr === aceAxis(st.p.ace));
    return Number.isInteger(act.i) && act.i >= 0 && act.i < st.p.hand.length && !!st.p.hand[act.i] && ATTRS.includes(act.attr);
  }
  function actPlay(st, act) {
    if (act.ace) { const a = aceAxis(st.p.ace); return { card: st.p.ace, attr: a, star: CFG.aceStar, ace: true }; }
    const card = st.p.hand[act.i];
    return { card, attr: act.attr, star: star(card, act.attr), ace: false };
  }
  // 他那一側：{i, attr}＝他手牌第 i 張；{attr, star, ace}＝假設值（策略估算用）
  function ePlayOf(st, eSide) {
    if (!eSide || !ATTRS.includes(eSide.attr)) return null;
    if (Number.isInteger(eSide.i)) { const c = st.e.hand[eSide.i]; if (!c) return null; return { card: c, attr: eSide.attr, star: eStarOf(c, eSide.attr), ace: isAcePlay(c, eSide.attr) }; }
    return { card: null, attr: eSide.attr, star: eSide.star | 0, ace: !!eSide.ace };
  }

  // 結果預告（純函式）：不變式 resolveTurn 的 clash ＝ preview(st0, act, {i: plan.idx, attr: plan.attr})
  function preview(st, act, eSide) {
    if (!isLegal(st, act)) return null;
    const e = ePlayOf(st, eSide); if (!e) return null;
    const r = outcome(st, actPlay(st, act), e, false);
    return { kind: r.kind, toE: r.toE, toP: r.toP, blocked: r.blocked, by: r.by, notes: r.notes };
  }

  function resolveTurn(st, act, opts) {
    opts = opts || {};
    if (!isLegal(st, act) || !st.plan) return [];
    const P = st.p, E = st.e, plan = st.plan, events = [];
    const fp = opts.forcedPlay;
    const eSide = (fp && Number.isInteger(fp.i) && E.hand[fp.i] && ATTRS.includes(fp.attr)) ? { i: fp.i, attr: fp.attr } : { i: plan.idx, attr: plan.attr };
    const pPlay = actPlay(st, act), ePlay = ePlayOf(st, eSide), eCard = ePlay.card;
    let r;
    if (opts.debugOutcome) {
      const d = opts.debugOutcome;
      r = { kind: d.kind, toE: d.toE | 0, toP: d.toP | 0, blocked: d.blocked || null, by: d.by || null, notes: [], pStar: pPlay.star };
    } else r = outcome(st, pPlay, ePlay, true);
    E.hp -= r.toE; P.hp -= r.toP;
    const hint = { attr: plan.hint.attr, line: plan.hint.line }, bluff = ePlay.attr !== hint.attr;
    const S = st.stats;
    S.hands++; if (act.ace) S.ace++; S.relicNotes += r.notes.length;
    if (r.kind === 'counter') S.counter++; else if (r.kind === 'countered') S.countered++; else if (r.kind === 'tie') S.tie++; else S.mirror++;
    if (r.blocked) { S.blocked++; if (r.by === 'p') S.blockedYou++; }
    if (bluff) { S.bluffs++; if (r.kind !== 'countered') S.caught++; } else S.honest++;
    const sum = { n: st.n, pCard: pPlay.card, pAttr: pPlay.attr, pStar: r.pStar, pBase: pPlay.star, ace: !!act.ace,
      eCard, eAttr: ePlay.attr, eStar: ePlay.star, eAce: ePlay.ace,
      kind: r.kind, toE: r.toE, toP: r.toP, blocked: r.blocked, by: r.by, hint, bluff, notes: r.notes };
    st.last = sum;
    st.log.push({ n: st.n, pAttr: pPlay.attr, eAttr: ePlay.attr, hint: hint.attr, bluff, why: plan.why, kind: r.kind, toE: r.toE, toP: r.toP, blocked: r.blocked });
    events.push(Object.assign({ t: 'clash' }, sum, { pHp: P.hp, eHp: E.hp }));
    P.last = pPlay.attr; E.last = ePlay.attr;
    E.thrown.push(eCard); E.hand.splice(eSide.i, 1); st.plan = null;
    if (act.ace) P.aceUsed = true;
    else {
      P.disc.push(P.hand[act.i]);
      const d = pull(st); P.hand[act.i] = d.card;
      events.push({ t: 'draw', i: act.i, card: d.card, reshuffled: d.reshuffled });
    }
    if (P.hp <= 0 || E.hp <= 0) return finish(st, 'hp', events);
    if (st.n >= CFG.maxRounds) return finish(st, 'rounds', events);
    if (!E.hand.length && !E.pile.length) return finish(st, 'pile', events);
    beginHand(st, events);
    return events;
  }
  // 比聲望（FIXLIST 3，店主 2026-11-08 選 1）：比「聲望條剩幾成」＝剩餘聲望÷滿血，高的贏；一樣算你贏。
  //   全引擎只有這一個比法：六手打完、他牌出完、兩邊同一手都 ≤0（負數也照比例比）、策略的終局估值都呼叫它。
  //   交叉相乘，不用浮點：pHp/pMax ≥ eHp/eMax ⇔ pHp·eMax ≥ eHp·pMax（max 一律 > 0）
  function playerAhead(pHp, pMax, eHp, eMax) {
    const pm = pMax > 0 ? pMax : 1, em = eMax > 0 ? eMax : 1;
    return pHp * em >= eHp * pm;
  }
  // 畫面用：聲望條剩幾 %（四捨五入、不顯示負數）
  function hpPct(hp, max) { return Math.max(0, Math.round(100 * hp / (max > 0 ? max : 1))); }
  // 結果句用的一對 %（字串）：整數；整數一樣大但其實分得出高低時（例：你 9/10＝90%、他 28/31≈90.3%）兩邊都改一位小數，畫面上的數字永遠跟勝負一致
  function pctPair(pHp, pMax, eHp, eMax) {
    const p = hpPct(pHp, pMax), e = hpPct(eHp, eMax);
    const exactTie = playerAhead(pHp, pMax, eHp, eMax) && playerAhead(eHp, eMax, pHp, pMax);
    if (p !== e || exactTie || (pHp <= 0 && eHp <= 0)) return { p: String(p), e: String(e) };
    const one = (hp, max) => (Math.max(0, Math.round(1000 * hp / (max > 0 ? max : 1))) / 10).toFixed(1);
    return { p: one(pHp, pMax), e: one(eHp, eMax) };
  }
  // 聲望 ≤0 就輸；兩邊同一手都 ≤0、六手打完、他牌出完 → playerAhead
  function finish(st, by, events) {
    const P = st.p, E = st.e;
    const cmp = playerAhead(P.hp, P.max, E.hp, E.max);
    const win = by === 'hp' ? ((P.hp <= 0 && E.hp <= 0) ? cmp : E.hp <= 0) : cmp;
    st.over = { win, by }; st.plan = null;
    events.push({ t: 'over', win, by, pHp: P.hp, eHp: E.hp, pMax: P.max, eMax: E.max, pPct: hpPct(P.hp, P.max), ePct: hpPct(E.hp, E.max), pct: pctPair(P.hp, P.max, E.hp, E.max) });
    return events;
  }

  // 公開資訊（§2.1.5）：提示只給屬性（畫面上不得寫出屬性名）與句子 id；揭曉前不給他出哪張、哪色、有沒有唬人
  function view(st) {
    const P = st.p, E = st.e;
    const aceLive = P.aceUsed ? null : P.ace;
    const pl = st.over ? null : st.plan;
    return {
      n: st.n, maxRounds: CFG.maxRounds, over: st.over ? { win: st.over.win, by: st.over.by } : null,
      pHp: P.hp, pMax: P.max, eHp: E.hp, eMax: E.max,
      eId: E.id, eName: E.name, eTitle: E.title, elite: E.elite, boss: E.boss,
      honesty: { key: E.honesty, q: E.q, qNow: pl ? qNowOf(st) : null },
      hint: pl ? { attr: pl.hint.attr, line: pl.hint.line } : null,
      eHandN: E.hand.length, pile: E.pile.length, pileMax: E.deckSize,
      eDeckIds: E.deckIds.slice(), eThrownIds: E.thrown.map(c => c.id),
      hand: P.hand.slice(), ace: aceLive, aceCard: P.ace, aceAxis: aceAxis(P.ace), aceUsed: P.aceUsed,
      last: st.last, relics: P.relics.map(r => Object.assign({}, r)), dustUsed: P.dustUsed,
      pAtk: P.atk | 0, pDef: P.def | 0, eAtk: E.atk | 0, eDef: E.def | 0,
      eDeck: (E.deckPub || []).map(x => Object.assign({}, x, { plus: x.plus ? Object.assign({}, x.plus) : null })),
    };
  }

  function bestChip(st, attr, o) {
    let best = null, bs = -1;
    if (o && o.ace && st.p.ace && !st.p.aceUsed && aceAxis(st.p.ace) === attr) { best = { ace: true, attr }; bs = CFG.aceStar; }
    st.p.hand.forEach((c, i) => { if (c && star(c, attr) > bs) { bs = star(c, attr); best = { i, attr }; } });
    return best;
  }
  // 手牌裡用 attr 出、對上「他這手的提示屬性、他手牌該軸最大星」會被 blocked:'gap' 的那張（最左）；沒有 → null（教學第 5 手的手指）
  function blockedChoice(st, attr) {
    if (!st || st.over || !st.plan || !ATTRS.includes(attr)) return null;
    const h = st.plan.hint.attr, bi = bestIdx(st.e.hand, h, false);
    if (bi < 0) return null;
    const c = st.e.hand[bi], e = { attr: h, star: eStarOf(c, h), ace: isAcePlay(c, h) };
    for (let i = 0; i < st.p.hand.length; i++) {
      if (!st.p.hand[i]) continue;
      if (outcome(st, actPlay(st, { i, attr }), e, false).blocked === 'gap') return { i, attr };
    }
    return null;
  }

  // ============================================================================================================================
  // 無限試煉（SPEC 無限試煉 §0–§2）：序章打完＝第 1 位；一輪 5 位（一般 3、菁英、傳說藏家），打到輸為止。
  //   錢、包包、配件、王牌整趟帶著走；商店每輪補貨一次；老闆說情每輪 1 次；聲望帶到下一場、打贏回 3。數字全在 content.trial
  // ============================================================================================================================
  // C.trial（沒給的欄位用 TRIAL 預設）；run.tier＞0 時再疊 C.trial.tiers[tier−1]（之後的難度階梯：每一階是部分覆寫，只改資料）
  function trialCfg(content, tier) {
    const src = (content && content.trial) || {};
    const out = Object.assign({}, TRIAL, src);
    const curve = {};
    for (const k of Object.keys(TRIAL.curve)) curve[k] = typeof TRIAL.curve[k] === 'object' ? Object.assign({}, TRIAL.curve[k], (src.curve || {})[k]) : ((src.curve || {})[k] != null ? src.curve[k] : TRIAL.curve[k]);
    out.curve = curve;
    out.guestHp = Object.assign({}, TRIAL.guestHp, src.guestHp); out.xp = Object.assign({}, TRIAL.xp, src.xp); out.picks = Object.assign({}, TRIAL.picks, src.picks);
    const ov = tier > 0 && Array.isArray(out.tiers) ? out.tiers[tier - 1] : null;
    if (ov) {
      for (const k of Object.keys(ov)) {
        if (k === 'curve') { for (const c of Object.keys(ov.curve || {})) curve[c] = typeof curve[c] === 'object' ? Object.assign({}, curve[c], ov.curve[c]) : ov.curve[c]; }
        else if (ov[k] && typeof ov[k] === 'object' && !Array.isArray(ov[k]) && out[k] && typeof out[k] === 'object') out[k] = Object.assign({}, out[k], ov[k]);
        else out[k] = ov[k];
      }
    }
    return out;
  }
  // 第幾位 → 類別（每 5 位：一般 3、菁英、藏家）、第幾輪
  const classAt = pos => POS_CLASSES[((Math.max(1, pos | 0) - 1) % PER_ROUND)];
  const roundOf = pos => Math.ceil(Math.max(1, pos | 0) / PER_ROUND);
  // 客人曲線 V3（../curve/curves.cjs：atkV3f、defV3f、oldQ、oldDiff；聲望固定 12、藏家 14）
  function trialGuest(content, pos, cls, tier) {
    const T = trialCfg(content, tier), K = T.curve, d = Math.max(1, pos | 0);
    cls = POS_CLASSES.includes(cls) ? cls : classAt(d);
    const boss = cls === 'boss', P = K.planner, Q = K.q, A = K.atk, D = K.def;
    const planner = d <= P.easyTo ? 'easy' : d <= P.normalTo ? 'normal' : 'hard';
    const q = planner === 'easy' ? Q.easy : planner === 'normal' ? Q.normal : 1 - Math.min(Q.feintMax, Q.feintBase + Q.feintStep * Math.max(0, d - Q.feintFrom));
    const atk = Math.min(A.cap, Math.round(A.rate * Math.max(0, d - A.lateFrom))) + Math.floor(Math.max(0, d - A.slopeFrom) / A.slopeEvery) + (boss ? A.boss : 0) + (A.add | 0);
    const def = Math.min(D.cap, Math.round(D.rate * Math.max(0, d - D.lateFrom))) + (boss ? D.boss : 0) + (D.add | 0);
    return { hp: T.guestHp[cls], atk: Math.max(0, atk), def: Math.max(0, def), planner, q: Math.round(q * 1e6) / 1e6 };
  }
  // 客人牌組越來越好（curve harness core.cjs bcDeck，V3：加星上限 5）：
  //   三軸總星低於下限 min(13, 3＋⌊0.7×位⌋) 的換成池子裡夠格的（照雜湊排序；王牌不進池）；主軸加 ⌊max(0, 位−3)/3⌋ 星（上限 5，王牌不加）；
  //   藏家帶你們都沒選的那張王牌（run.bossAce）；一般客人第 5 位起帶王牌機率 min(60%, 15%×(位−4))（你沒選的兩張之一）。
  //   加星的卡保留原 id（獎勵、唱片資訊、估星都照 id 找），另加 plus {attr, n}。全部用 run 的雜湊（seedKey#runNo#pos），不碰對決亂數
  const POOL_CACHE = typeof WeakMap === 'function' ? new WeakMap() : null;
  function trialPool(content) {
    const cards = content.cards || {};
    if (POOL_CACHE && POOL_CACHE.has(cards)) return POOL_CACHE.get(cards);
    const p = Object.keys(cards).sort().map(id => cards[id]).filter(c => c && !c.tier);
    if (POOL_CACHE) POOL_CACHE.set(cards, p);
    return p;
  }
  function trialDeck(content, id, pos, o) {
    o = o || {};
    const T = trialCfg(content, o.tier), K = T.curve.deck, d = Math.max(1, pos | 0);
    const E = content.enemies[id]; if (!E) throw new Error('engine: unknown enemy ' + id);
    const cls = POS_CLASSES.includes(o.cls) ? o.cls : classAt(d);
    const base = (E.deck || []).map(x => cardFrom(content, x));
    const tag = String(o.seedKey || 'lab') + '#' + (o.runNo || 1) + '#' + d;
    const u = s => hash01(tag + '|' + s);
    const fl = Math.min(K.floorMax, K.floorBase + Math.floor(K.floorRate * d));
    const pool = trialPool(content);
    let bag = pool.filter(c => power(c) >= fl); if (bag.length < K.minPool) bag = pool;
    const deck = [], used = new Set();
    for (const c of base) if (power(c) >= fl) { deck.push(c); used.add(c.id); }
    if (deck.length < base.length) {
      const pr = bag.filter(c => !used.has(c.id)).map(c => [u(id + '|' + c.id), c]).sort((a, b) => a[0] - b[0] || (a[1].id < b[1].id ? -1 : 1));
      for (const [, c] of pr) { if (deck.length >= base.length) break; deck.push(c); used.add(c.id); }
    }
    const b = Math.floor(Math.max(0, d - K.buffFrom) / K.buffEvery);
    // 每張都是他自己的一份（換來的牌可能跟你包包裡的是同一張唱片：對決狀態裡不共用物件）
    const out = deck.map(c => {
      const m = topAttr(c), s0 = star(c, m), nv = b && !c.tier ? Math.min(K.buffCap, Math.max(s0, s0 + b)) : s0;
      return nv === s0 ? Object.assign({}, c) : Object.assign({}, c, { [m]: nv, plus: { attr: m, n: nv - s0 } });
    });
    let ace = null;
    const aces = content.aces || {};
    if (cls === 'boss') ace = o.bossAce && aces[o.bossAce] ? cardFrom(content, aces[o.bossAce]) : null;
    else {
      const p = d >= K.aceFrom ? Math.min(K.aceMax, K.aceRate * (d - K.aceFrom + 1)) : 0;
      if (p > 0 && u('ace') < p) {
        const others = TIERS.filter(t => t !== o.playerAce && aces[t]);
        if (others.length) ace = cardFrom(content, aces[others[Math.floor(u('acepick') * others.length) % others.length]]);
      }
    }
    return { deck: out, ace, floor: fl, buff: b, replaced: base.length - deck.filter(c => base.includes(c)).length };
  }
  // 中繼點：打贏第 10、20、30、50、75、100 位，之後每 50 位
  function checkpointsOf(content) { const T = trialCfg(content); return { list: (T.checkpoints || []).slice().sort((a, b) => a - b), every: T.checkpointEvery | 0 }; }
  function nextCheckpoint(pos, content) {
    const { list, every } = checkpointsOf(content), d = Math.max(1, pos | 0);
    for (const c of list) if (c >= d) return c;
    const last = list.length ? list[list.length - 1] : 0;
    if (!(every > 0)) return null;
    return last + Math.max(1, Math.ceil((d - last) / every)) * every;
  }
  const isCheckpoint = (pos, content) => nextCheckpoint(pos, content) === pos;
  // 離下個中繼點還有幾位（含目前這位：第 7 位時、中繼點第 10 位 → 4）
  function toCheckpoint(run, content) { const c = nextCheckpoint(run.pos, content); return c == null ? null : c - run.pos + 1; }

  function econ(content) {
    const e = (content && content.economy) || {};
    return { start: e.start != null ? e.start : ECON.start, win: Object.assign({}, ECON.win, e.win || {}), price: Object.assign({}, ECON.price, e.price || {}),
      bargain: Object.assign({}, ECON.bargain, e.bargain || {}), relicPrice: e.relicPrice != null ? e.relicPrice : ECON.relicPrice,
      sellRate: e.sellRate != null ? e.sellRate : ECON.sellRate,
      stock: e.stock || ECON.stock, featureStock: e.featureStock || ECON.featureStock, relicStock: e.relicStock || ECON.relicStock };
  }
  const relicOk = (content, id) => !!(content.relics && content.relics[id]) && content.relics[id].v4 !== false;
  const cardOf = (content, id) => (content.cards && content.cards[id]) || null;
  const uniq = a => a.filter((x, k) => a.indexOf(x) === k);

  // 第 r 輪的 5 位：一般客人從 C.normals 挑 3 位不重複（先挑上一輪沒來的）、菁英從 C.elites（上一輪沒來的優先）、藏家最後。
  //   種子＝seedKey#runNo#r<輪>（不碰 run.rng：同一天同一趟的客人不管挑哪張王牌都一樣）
  function roundOrder(content, seedKey, runNo, r, prev) {
    const N = content.normals || [], EL = content.elites || [], B = content.boss || 'boss';
    if (r > 1 && !prev) prev = roundOrder(content, seedKey, runNo, r - 1, null);
    prev = prev || [];
    const st = { rng: fnv1a32(String(seedKey) + '#' + runNo + '#r' + r) || 1 };
    const sh = shuffle(N.slice(), st), fresh = sh.filter(x => !prev.includes(x)), seen = sh.filter(x => prev.includes(x));
    const normals = fresh.concat(seen).slice(0, PER_ROUND - 2);
    const eFresh = EL.filter(x => !prev.includes(x)), ePool = eFresh.length ? eFresh : EL;
    const elite = ePool.length ? ePool[Math.floor(rng(st) * ePool.length)] : null;
    return normals.concat([elite, B]).filter(Boolean);
  }

  function newRun(content, o) {
    o = o || {};
    const seedKey = String(o.seedKey || 'lab'), runNo = o.runNo || o.nightNo || 1;
    const ace = TIERS.includes(o.ace) ? o.ace : 'hall';
    const tier = Math.max(0, o.tier | 0), T = trialCfg(content, tier), EC = econ(content);
    const run = {
      v: RUN_V, seedKey, runNo, tier, rng: fnv1a32(seedKey + '#' + runNo) || 1, ace, bossAce: null,
      bag: ((content.gifts || {})[ace] || []).slice(),
      relics: (o.relics || []).filter((id, k, a) => relicOk(content, id) && a.indexOf(id) === k).slice(0, CFG.relicMax),
      pos: 1, round: 1, order: roundOrder(content, seedKey, runNo, 1, null), idx: 0,
      prologue: (o.prologue != null ? !!o.prologue : runNo === 1) ? 'pending' : null,
      retryLeft: T.retry, pending: null, duel: null, duelEnemy: null, over: null,
      hp: T.youHp, maxHp: T.youHp, hpIn: T.youHp, level: 1, xp: 0, atk: 0, def: 0, levelUps: 0, picks: [],
      streak: 0, bestStreak: 0, checkpoints: [], taken: 0, aceWon: false,
      money: EC.start,
      shop: { bins: {}, relics: [], bargain: [], bargainPicked: false, firstGuestInside: false },
      stats: { wins: 0, beaten: 0, fights: 0, hands: 0, retries: 0, taken: [], met: [], relicsGot: [], lostAt: null,
        earned: 0, spent: 0, bought: [], sold: [], relicsBought: [], relicsSold: [] },
    };
    run.taken = run.bag.length;                                   // 收了幾張：老闆送的也算（裁定 9）
    const others = TIERS.filter(t => t !== ace);
    run.bossAce = others.includes(o.bossAce) ? o.bossAce : pickOne(others, run);
    restock(run, content);
    return run;
  }
  // 補貨（newRun 與每輪開頭；種子＝seedKey#runNo#shop#輪，不碰 run.rng）
  //   每一區從 bins.js 的 pool 抽：FEATURE 2–3 張（只抽史詩／傳奇）、其他每區 4–6 張（只抽普通／稀有／獨特；新進與店長推薦本來就不限曲風）；
  //   全店同一輪不重複（照 SHOP_ORDER 先上的先拿）；不上：你的王牌、包包裡的、特價箱的、頂點卡。display:true 的舊牆面區只展示、不賣
  //   櫃檯：relicShop 扣掉身上的；特價箱 6 張＝經／冷／硬各 2（池子扣掉包包裡的，不夠就少擺）
  function restock(run, content) {
    const EC = econ(content), st = { rng: fnv1a32(run.seedKey + '#' + run.runNo + '#shop#' + (run.round || 1)) || 1 };
    const SH = run.shop || (run.shop = { bins: {}, relics: [], bargain: [], bargainPicked: false, firstGuestInside: false });
    const taken = new Set([content.aces && content.aces[run.ace], ...run.bag, ...(((content.bargain || {}).pool) || [])].filter(Boolean));
    const span = (lohi, fallback) => { const lo = (lohi && lohi[0]) | 0 || fallback[0], hi = (lohi && lohi[1]) | 0 || fallback[1]; return lo + Math.floor(rng(st) * (Math.max(hi, lo) - lo + 1)); };
    const B = content.bins || {};
    const keys = SHOP_ORDER.filter(k => B[k]).concat(Object.keys(B).filter(k => !SHOP_ORDER.includes(k)).sort());
    SH.bins = {};
    for (const key of keys) {
      const b = B[key]; if (!b || b.display) continue;
      const feat = key === 'feature', ok = feat ? FEATURE_RARITY : SHELF_RARITY;
      const pool = uniq(b.pool || []).filter(id => !taken.has(id) && cardOf(content, id) && ok.includes(rarity(cardOf(content, id))));
      shuffle(pool, st);
      const got = pool.slice(0, Math.min(feat ? span(EC.featureStock, ECON.featureStock) : span(EC.stock, ECON.stock), pool.length));
      SH.bins[key] = got;
      for (const id of got) taken.add(id);
    }
    const rp = (((content.relicShop || {}).pool) || []).filter(id => relicOk(content, id) && !run.relics.includes(id));
    shuffle(rp, st);
    SH.relics = rp.slice(0, Math.min(span(EC.relicStock, ECON.relicStock), rp.length));
    const bp = (((content.bargain || {}).pool) || []).filter(id => cardOf(content, id) && !run.bag.includes(id));
    shuffle(bp, st);
    const by = { c: [], o: [], h: [] };
    for (const id of bp) by[topAttr(cardOf(content, id))].push(id);
    const out = [];
    for (let k = 0; k < 2; k++) for (const a of ATTRS) if (by[a][k]) out.push(by[a][k]);
    SH.bargain = out;
    return SH;
  }
  function current(run, content) {
    if (run.duel && run.duelEnemy) return run.duelEnemy;
    if (run.pending && run.pending.enemyId) return run.pending.enemyId;
    return run.prologue === 'pending' ? ((content && content.prologueEnemy) || 'man') : run.order[run.idx];
  }
  function nextStep(run) {
    if (run.pending) return run.pending.type === 'reward' ? 'reward' : run.pending.type === 'level' ? 'level' : 'retry';
    if (run.over) return null;
    if (run.duel) return 'duel';
    return run.prologue === 'pending' ? 'prologue' : 'fight';
  }
  // 這一位的客人設定（畫面的來客那排、shopPolicy、startFight 共用）
  function guestDef(run, content, id, pos) {
    return enemyDef(content, id, { pos, cls: classAt(pos), seedKey: run.seedKey, runNo: run.runNo, playerAce: run.ace, bossAce: run.bossAce, tier: run.tier });
  }
  function startFight(run, content, o) {
    o = o || {};
    if (run.duel) return { duel: run.duel, events: [], enemyId: run.duelEnemy || run.duel.e.id, resumed: true };   // a saved fight in progress (or over but not finished)
    if (run.over || run.pending) return null;
    const enemyId = current(run, content);
    if (!enemyId) return null;
    const prologue = run.prologue === 'pending';
    const tut = !!o.tutorial && prologue && !!content.tutorial;
    const eDef = prologue ? enemyDef(content, enemyId, { tutorial: tut }) : guestDef(run, content, enemyId, run.pos);
    const opts = { seed: (Math.floor(rng(run) * 4294967296) >>> 0) || 1, hintTable: hintTableOf(content) };
    if (eDef.ace) opts.enemyAce = eDef.ace;
    else if (eDef.boss && run.bossAce) opts.enemyAce = cardFrom(content, content.aces[run.bossAce]);
    if (tut && content.tutorial.script) opts.script = content.tutorial.script[run.ace] || null;
    if (!Number.isInteger(run.hp) || run.hp < 1) run.hp = run.maxHp || CFG.playerHp;
    run.hpIn = run.hp;                                        // 說情重打從這裡開始（裁定 8）
    const r = startDuel(playerDef(content, run), eDef, opts);
    run.duel = r.duel; run.duelEnemy = enemyId;
    return { duel: r.duel, events: r.events, enemyId };
  }
  // 升級：經驗滿「目前等級＋3」升一級；每升一級聲望上限 +1、現有聲望也 +1，再三選一（levelUps 記還沒選的次數）
  function gainXp(run, T, n) {
    run.xp += n; let ups = 0;
    while (run.xp >= run.level + T.levelNeed) { run.xp -= run.level + T.levelNeed; run.level++; run.maxHp += T.levelHp; run.hp += T.levelHp; run.levelUps++; ups++; }
    return ups;
  }
  function finishFight(run, content, duel) {
    duel = duel || run.duel;
    if (!duel || !duel.over) return { error: 'notOver' };
    const enemyId = run.duelEnemy || duel.e.id;
    const E = content.enemies[enemyId] || {};
    const S = run.stats, win = duel.over.win, T = trialCfg(content, run.tier);
    const prologue = run.prologue === 'pending' && enemyId === (content.prologueEnemy || 'man');
    const cls = prologue ? 'prologue' : classAt(run.pos), pos = run.pos;
    S.fights++; S.hands += duel.stats.hands;
    const met = uniq(duel.e.thrown.map(c => c.id));
    for (const id of met) if (!S.met.includes(id)) S.met.push(id);
    run.duel = null; run.duelEnemy = null;
    let earn = 0, heal = 0, ups = 0, checkpoint = null, aceWon = null;
    if (win) {
      S.wins++;
      earn = Math.max(0, econ(content).win[cls] | 0);
      run.money += earn; S.earned += earn;
      if (prologue) {
        run.prologue = 'done';
        run.hp = run.maxHp;                                   // 裁定 1：序章打完聲望回滿，第 1 位從滿血開始
        const cards = (E.drop ? [E.drop] : []).filter(id => !run.bag.includes(id) && content.cards[id]);
        const relics = (((content.rewards || {}).prologueRelics) || []).filter(id => !run.relics.includes(id));
        run.pending = { type: 'reward', enemyId, prologue: true, cards, relics, need: 'cardThenRelic', cardDone: !cards.length, relicDone: !relics.length };
      } else {
        S.beaten++;
        run.hp = Math.min(run.maxHp, Math.max(1, duel.p.hp) + T.heal);   // 打贏回 3（不超過上限）
        heal = run.hp - Math.max(1, duel.p.hp);
        ups = gainXp(run, T, T.xp[cls] | 0);
        run.streak++; if (run.streak > run.bestStreak) run.bestStreak = run.streak;
        if (isCheckpoint(pos, content) && !run.checkpoints.includes(pos)) { run.checkpoints.push(pos); checkpoint = pos; }
        if (cls === 'boss' && content.aces && content.aces[run.bossAce]) {
          aceWon = content.aces[run.bossAce];                 // 藏家的王牌收進唱片櫃（畫面做；同一張每輪都送，只算一次「收了」）
          if (!run.aceWon) { run.aceWon = true; run.taken++; }
        }
        const cards = met.filter(id => content.cards[id] && !content.cards[id].tier && !run.bag.includes(id));
        let relics = [];
        if (cls === 'elite' || cls === 'boss') {
          const pool = (((content.rewards || {}).relicPool) || Object.keys(content.relics || {})).filter(id => relicOk(content, id) && !run.relics.includes(id));
          if (pool.length) relics = [pickOne(pool, run)];
        }
        run.pending = { type: 'reward', enemyId, prologue: false, pos, cls, cards, relics, need: relics.length ? 'cardOrRelic' : 'card', cardDone: !cards.length, relicDone: !relics.length, aceWon };
      }
      settle(run, content);
    } else {
      if (!prologue) run.streak = 0;
      run.hp = run.hpIn;                                      // 輸了不寫回：說情從開打前的聲望重打
      if (prologue) run.pending = { type: 'retry', enemyId, free: true };
      else if (run.retryLeft > 0) run.pending = { type: 'retry', enemyId, free: false, pos };
      else {
        run.over = 'dead';
        S.lostAt = { enemyId, pos, round: run.round, idx: run.idx, cls, n: duel.n, last: duel.last };
      }
    }
    return { win, by: duel.over.by, enemyId, met, offer: run.pending, over: run.over, earn, pos, cls, heal, levelUps: ups, checkpoint, aceWon };
  }
  // 獎勵收完：有升級就先選（連升就連選），選完才到下一位
  function settle(run, content) {
    const p = run.pending;
    if (!p || p.type !== 'reward' || !p.cardDone || !p.relicDone) return;
    if (!p.prologue && run.levelUps > 0) { run.pending = null; run.pending = { type: 'level', enemyId: p.enemyId, pos: p.pos, level: run.level - run.levelUps + 1, offer: levelOffer(run, content) }; return; }
    advance(run, p, content);
  }
  // 三選一：第一格固定是品味或底氣（照 run 的雜湊），其他照 品味→底氣→聲望上限
  function levelOffer(run, content) {
    if (run.pending && run.pending.type === 'level' && Array.isArray(run.pending.offer)) return run.pending.offer.map(x => Object.assign({}, x));
    const T = trialCfg(content, run.tier), k = (run.picks || []).length;
    const first = hash01(run.seedKey + '#' + run.runNo + '#lv' + (k + 1)) < 0.5 ? 'atk' : 'def';
    return [first].concat(['atk', 'def', 'hp'].filter(x => x !== first)).map(pick => ({ pick, n: T.picks[pick] | 0 }));
  }
  // 下一位（第 5 位打完：新一輪的 5 位、說情重設、商店補貨）
  function advance(run, p, content) {
    run.pending = null;
    if (p && p.prologue) return;
    run.pos++;
    run.idx = (run.pos - 1) % PER_ROUND;
    if (run.idx === 0) {
      const prev = run.order;
      run.round = roundOf(run.pos);
      run.order = roundOrder(content, run.seedKey, run.runNo, run.round, prev);
      run.retryLeft = trialCfg(content, run.tier).retry;
      restock(run, content);
    }
  }
  // ?debug=1 的 __lab：直接跳到第 n 位（序章算完成、特價箱算挑過；聲望、等級不動）
  function jumpTo(run, content, pos) {
    pos = Math.max(1, pos | 0);
    run.duel = null; run.duelEnemy = null; run.pending = null; run.over = null;
    if (run.prologue === 'pending') run.prologue = 'done';
    if (run.shop) run.shop.bargainPicked = true;
    run.pos = pos; run.round = roundOf(pos); run.idx = (pos - 1) % PER_ROUND;
    run.order = roundOrder(content, run.seedKey, run.runNo, run.round, null);
    run.retryLeft = trialCfg(content, run.tier).retry;
    if (!Number.isInteger(run.hp) || run.hp < 1) run.hp = run.maxHp;
    restock(run, content);
    return run;
  }
  // 這一輪 5 位（來客那排）：{id, pos, cls, hp, atk, def, hasAce, done, cur}
  function roundGuests(run, content) {
    const p = run.pending, beat = !!(p && (p.type === 'reward' || p.type === 'level') && !p.prologue);
    const first = (run.round - 1) * PER_ROUND + 1;
    return (run.order || []).map((id, i) => {
      const pos = first + i, g = guestDef(run, content, id, pos);
      return { id, pos, cls: classAt(pos), hp: g.hp, atk: g.atk, def: g.def, hasAce: !!g.ace || (classAt(pos) === 'boss' && !!run.bossAce),
        done: i < run.idx || (i === run.idx && beat), cur: i === run.idx };
    });
  }
  // 結算：走到第幾位、最多連贏幾位、收了幾張
  function runSummary(run) {
    const S = run.stats || {};
    return { reached: run.pos | 0, bestStreak: run.bestStreak | 0, taken: run.taken | 0, wins: S.beaten | 0, level: run.level | 0, checkpoints: (run.checkpoints || []).slice() };
  }

  // ---------- 稀有度、價格與時機 ----------
  function rarityScore(card) { return star(card, 'c') + star(card, 'h') + (star(card, 'o') === 5 ? 1 : 0); }
  function rarity(card) {
    if (!card) return null;
    if (TIERS.includes(card.tier)) return 'apex';
    const s = rarityScore(card);
    return s <= 5 ? 'common' : s === 6 ? 'rare' : s === 7 ? 'uncommon' : s === 8 ? 'epic' : 'legendary';
  }
  // 分類箱（X／Y 契約）：第一個曲風標籤＝genre-tree.json 頂層十類（electronic → elec）；地區台灣一律 tw（地區優先）。new／picks／feature 不看分類
  const GENRE_BIN = { rock: 'rock', jazz: 'jazz', electronic: 'elec', soul: 'soul', hiphop: 'hiphop', classical: 'classical', folk: 'folk', pop: 'pop', world: 'world', blues: 'blues' };
  function categoryOf(card) {
    if (!card) return null;
    if (card.region === 'tw') return 'tw';
    return GENRE_BIN[((card.genres || [])[0]) || ''] || null;
  }
  const cardArg = (content, card) => typeof card === 'string' ? cardOf(content, card) : card;
  const inBargain = (content, id) => ((((content && content.bargain) || {}).pool) || []).includes(id);
  // 特價箱每張的價：照最高星 1／2／3 → 100／200／300（序章那次挑三張免費）；峰值 >3 照 3 算
  function bargainPriceOf(content, card) {
    const c = cardArg(content, card);
    if (!c || TIERS.includes(c.tier)) return null;
    const p = econ(content).bargain[Math.max(1, Math.min(3, peak(c)))];
    return p != null ? p : null;
  }
  // 這張在這間店的價：特價箱的照特價（賣回也照它算半價，不會一買一賣賺錢）；其他照稀有度（頂點 8000：表先備好，v4 不上架）
  function priceOf(content, card) {
    const c = cardArg(content, card);
    if (!c) return null;
    if (inBargain(content, c.id)) return bargainPriceOf(content, c);
    const p = econ(content).price[rarity(c)];
    return p != null ? p : null;
  }
  function relicPrice(content, id) {
    const r = content && content.relics && content.relics[id];
    if (!r) return null;
    return r.price != null ? r.price : econ(content).relicPrice;
  }
  function sellValue(content, x) {
    const p = typeof x === 'string' ? relicPrice(content, x) : priceOf(content, x);
    return p == null ? 0 : Math.floor(p * econ(content).sellRate);
  }
  // 老闆送的不能賣回（FIXLIST 11 追加）：這一趟王牌那組的四張禮物（content.gifts[run.ace]）＋王牌本身。別組的禮物卡如果是客人丟的或買的，照舊能賣
  function isGift(run, content, x) {
    const id = x && typeof x === 'object' ? x.id : x;
    if (!run || !id || !content) return false;
    return id === ((content.aces || {})[run.ace]) || (((content.gifts || {})[run.ace]) || []).includes(id);
  }
  // 畫面上的錢：千分位（1200 → '1,200'）。C.shopUi 的字串自己帶 '$'，UI 代入 {n} 時用這個
  function moneyText(n) {
    const v = Math.round(+n || 0), s = String(Math.abs(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (v < 0 ? '-' : '') + s;
  }
  const shopOf = run => run.shop || { bins: {}, relics: [], bargain: [], bargainPicked: false };
  function canShop(run) { return !!run && !run.over && !run.pending && !run.duel && run.prologue !== 'pending' && !!shopOf(run).bargainPicked; }
  // 特價箱免費挑三張：只在第 1 位之前（裁定 4；之後每輪補貨、要買）
  function canBargainPick(run) { return !!run && !shopOf(run).bargainPicked && !run.duel && !run.over && run.pos === 1; }

  function choose(run, content, ch) {
    const effects = [];
    const fail = error => ({ ok: false, error, effects: [] });
    const p = run.pending;
    if (!ch || !ch.type) return fail('badChoice');
    const rew = p && p.type === 'reward' ? p : null;
    const S = run.stats, EC = econ(content), SH = shopOf(run);
    switch (ch.type) {
      case 'take': {
        if (!rew || rew.cardDone) return fail('noCardOffer');
        if (!rew.cards.includes(ch.cardId)) return fail('notOffered');
        if (run.bag.includes(ch.cardId)) return fail('owned');
        if (run.bag.length >= CFG.bagMax) {
          if (!ch.dropId || !run.bag.includes(ch.dropId)) return fail('bagFull');
          run.bag.splice(run.bag.indexOf(ch.dropId), 1); effects.push({ loseCard: ch.dropId });
        }
        run.bag.push(ch.cardId); S.taken.push(ch.cardId); run.taken++; effects.push({ gainCard: ch.cardId });
        rew.cardDone = true; if (rew.need === 'cardOrRelic') rew.relicDone = true;
        settle(run, content); return { ok: true, effects };
      }
      case 'relic': {
        if (!rew || rew.relicDone) return fail('noRelicOffer');
        if (!rew.relics.includes(ch.relicId)) return fail('notOffered');
        if (run.relics.includes(ch.relicId)) return fail('owned');
        if (run.relics.length >= CFG.relicMax) {
          if (!ch.dropRelicId || !run.relics.includes(ch.dropRelicId)) return fail('relicsFull');
          run.relics.splice(run.relics.indexOf(ch.dropRelicId), 1); effects.push({ loseRelic: ch.dropRelicId });
        }
        run.relics.push(ch.relicId); S.relicsGot.push(ch.relicId); effects.push({ gainRelic: ch.relicId });
        rew.relicDone = true; if (rew.need === 'cardOrRelic') rew.cardDone = true;
        settle(run, content); return { ok: true, effects };
      }
      case 'skip': {
        if (!rew) return fail('nothingToSkip');
        if (rew.need === 'cardOrRelic' || rew.need === 'card') { rew.cardDone = true; rew.relicDone = true; }
        else if (!rew.cardDone) rew.cardDone = true; else rew.relicDone = true;
        effects.push({ skip: true });
        settle(run, content); return { ok: true, effects };
      }
      case 'retry': {
        if (!p || p.type !== 'retry') return fail('noRetry');
        if (!p.free) run.retryLeft--;
        S.retries++; run.pending = null; run.hp = run.hpIn;          // 裁定 8：同一位、同一副牌、聲望回到開打前
        effects.push({ retry: p.enemyId, free: !!p.free });
        return { ok: true, effects };
      }
      case 'end': {
        if (!p || p.type !== 'retry') return fail('noRetry');
        run.pending = null; run.over = 'dead';
        S.lostAt = { enemyId: p.enemyId, pos: run.pos, round: run.round, idx: run.idx, cls: run.prologue === 'pending' ? 'prologue' : classAt(run.pos) };
        effects.push({ end: true });
        return { ok: true, effects };
      }
      // 升級三選一（pending level）：品味 +1、底氣 +1、聲望上限 +2（現有聲望也 +2）；連升就再開一次，選完才到下一位
      case 'level': {
        if (!p || p.type !== 'level') return fail('noLevel');
        const o = (p.offer || []).find(x => x && x.pick === ch.pick);
        if (!o) return fail('notOffered');
        const n = o.n | 0;
        if (o.pick === 'atk') run.atk += n; else if (o.pick === 'def') run.def += n; else { run.maxHp += n; run.hp += n; }
        run.picks.push(o.pick); run.levelUps = Math.max(0, run.levelUps - 1);
        effects.push({ level: o.pick, n });
        run.pending = null;
        if (run.levelUps > 0) run.pending = { type: 'level', enemyId: p.enemyId, pos: p.pos, level: run.level - run.levelUps + 1, offer: levelOffer(run, content) };
        else advance(run, null, content);
        return { ok: true, effects };
      }
      // ---- 經濟（§2.1.6）：先驗完全部條件，才動 run ----
      case 'bargainPick': {
        if (!canBargainPick(run)) return fail('notNow');
        const ids = ch.ids;
        if (!Array.isArray(ids) || ids.length !== CFG.bargainPick || new Set(ids).size !== ids.length) return fail('badCount');
        if (!ids.every(id => SH.bargain.includes(id) && cardOf(content, id))) return fail('notInStock');
        if (ids.some(id => run.bag.includes(id))) return fail('owned');
        if (run.bag.length + ids.length > CFG.bagMax) return fail('bagFull');
        for (const id of ids) { run.bag.push(id); SH.bargain.splice(SH.bargain.indexOf(id), 1); run.taken++; effects.push({ gainCard: id }); }
        SH.bargainPicked = true;
        return { ok: true, effects };
      }
      case 'buy': {
        if (!canShop(run)) return fail('notNow');
        const stock = SH.bins[ch.key];
        if (!Array.isArray(stock) || !stock.includes(ch.cardId) || !cardOf(content, ch.cardId)) return fail('notInStock');
        if (run.bag.includes(ch.cardId)) return fail('owned');
        const price = priceOf(content, ch.cardId);
        if (price == null) return fail('notInStock');
        let sell = null;
        if (ch.sellId != null) { if (!run.bag.includes(ch.sellId) || !cardOf(content, ch.sellId)) return fail('badSell'); if (isGift(run, content, ch.sellId)) return fail('giftNoSell'); sell = ch.sellId; }
        else if (run.bag.length >= CFG.bagMax) return fail('bagFull');
        const earn = sell ? sellValue(content, cardOf(content, sell)) : 0;
        if (run.money + earn < price) return fail('noMoney');
        if (sell) { run.bag.splice(run.bag.indexOf(sell), 1); run.money += earn; S.earned += earn; S.sold.push(sell); effects.push({ loseCard: sell, earn }); }
        run.money -= price; S.spent += price;
        run.bag.push(ch.cardId); stock.splice(stock.indexOf(ch.cardId), 1); S.bought.push(ch.cardId); run.taken++;
        effects.push({ gainCard: ch.cardId, spend: price });
        return { ok: true, effects };
      }
      case 'buyBargain': {
        if (!canShop(run)) return fail('notNow');
        const ids = ch.ids;
        if (!Array.isArray(ids) || ids.length < 1 || ids.length > CFG.bargainPick || new Set(ids).size !== ids.length) return fail('badCount');
        if (!ids.every(id => SH.bargain.includes(id) && cardOf(content, id))) return fail('notInStock');
        if (ids.some(id => run.bag.includes(id))) return fail('owned');
        const sells = ch.sellIds == null ? [] : ch.sellIds;
        if (!Array.isArray(sells)) return fail('badSell');
        const need = Math.max(0, run.bag.length + ids.length - CFG.bagMax);
        if (sells.length < need) return fail('bagFull');
        if (sells.length > need || new Set(sells).size !== sells.length || !sells.every(id => run.bag.includes(id) && cardOf(content, id))) return fail('badSell');
        if (sells.some(id => isGift(run, content, id))) return fail('giftNoSell');
        const each = ids.map(id => bargainPriceOf(content, id));
        if (each.some(p => p == null)) return fail('notInStock');
        const earn = sells.reduce((s, id) => s + sellValue(content, cardOf(content, id)), 0), price = each.reduce((s, p) => s + p, 0);
        if (run.money + earn < price) return fail('noMoney');
        for (const id of sells) { const v = sellValue(content, cardOf(content, id)); run.bag.splice(run.bag.indexOf(id), 1); run.money += v; S.earned += v; S.sold.push(id); effects.push({ loseCard: id, earn: v }); }
        run.money -= price; S.spent += price;
        ids.forEach((id, k) => { run.bag.push(id); SH.bargain.splice(SH.bargain.indexOf(id), 1); S.bought.push(id); run.taken++; effects.push({ gainCard: id, spend: each[k] }); });
        return { ok: true, effects };
      }
      case 'buyRelic': {
        if (!canShop(run)) return fail('notNow');
        if (!SH.relics.includes(ch.relicId) || !relicOk(content, ch.relicId)) return fail('notInStock');
        if (run.relics.includes(ch.relicId)) return fail('owned');
        const price = relicPrice(content, ch.relicId);
        if (price == null) return fail('notInStock');
        let sell = null;
        if (ch.sellRelicId != null) { if (!run.relics.includes(ch.sellRelicId)) return fail('badSell'); sell = ch.sellRelicId; }
        else if (run.relics.length >= CFG.relicMax) return fail('relicsFull');
        const earn = sell ? sellValue(content, sell) : 0;
        if (run.money + earn < price) return fail('noMoney');
        if (sell) { run.relics.splice(run.relics.indexOf(sell), 1); run.money += earn; S.earned += earn; S.relicsSold.push(sell); effects.push({ loseRelic: sell, earn }); }
        run.money -= price; S.spent += price;
        run.relics.push(ch.relicId); SH.relics.splice(SH.relics.indexOf(ch.relicId), 1); S.relicsBought.push(ch.relicId);
        effects.push({ gainRelic: ch.relicId, spend: price });
        return { ok: true, effects };
      }
    }
    return fail('badChoice');
  }

  const LEVEL_MIX = ['atk', 'def', 'atk', 'hp', 'def', 'atk', 'hp', 'def', 'atk', 'hp'];   // variants MIX（X→hp）
  // a reasonable player's choice for whatever the run waits on (sim, __lab autoplay)
  function runPolicy(run, content, o) {
    o = o || {};
    const preferRelic = o.preferRelic !== false;
    const p = run.pending;
    if (!p) return null;
    if (p.type === 'retry') return { type: 'retry' };
    if (p.type === 'level') {                                  // harness MIX：A D A H D A X D A H（X＝引擎沒有「不加」→ 聲望上限）
      const mix = o.levelMix || LEVEL_MIX, want = mix[(run.picks || []).length % mix.length];
      const offer = p.offer || [], pick = (offer.find(x => x.pick === want) || offer[0] || {}).pick;
      return pick ? { type: 'level', pick } : null;
    }
    const cOf = id => content.cards[id];
    const pickRelic = () => {
      const left = p.relics.filter(id => !run.relics.includes(id));
      if (!left.length || run.relics.length >= CFG.relicMax) return null;
      return { type: 'relic', relicId: p.prologue ? left[fnv1a32(run.seedKey + '#relic#' + run.runNo) % left.length] : left[0] };
    };
    if (p.need === 'cardOrRelic' && preferRelic) { const r = pickRelic(); if (r) return r; }
    if (!p.cardDone) {
      const best = p.cards.slice().sort((a, b) => peak(cOf(b)) - peak(cOf(a)) || power(cOf(b)) - power(cOf(a)))[0];
      if (!best) return { type: 'skip' };
      if (run.bag.length < CFG.bagMax) return { type: 'take', cardId: best };
      const weakest = run.bag.slice().sort((a, b) => power(cOf(a)) - power(cOf(b)) || peak(cOf(a)) - peak(cOf(b)))[0];
      if (power(cOf(weakest)) >= power(cOf(best))) return { type: 'skip' };
      return { type: 'take', cardId: best, dropId: weakest };
    }
    if (!p.relicDone) return pickRelic() || { type: 'skip' };
    return { type: 'skip' };
  }
  // 特價箱挑三張（sim 的「三色各一、同色挑峰值大的」）：c、o、h 各挑一張；某色沒有就從剩下的挑峰值大的補
  function bargainPolicy(run, content) {
    if (!canBargainPick(run)) return null;
    const left = shopOf(run).bargain.filter(id => cardOf(content, id) && !run.bag.includes(id));
    const better = (a, b) => peak(cardOf(content, b)) - peak(cardOf(content, a)) || power(cardOf(content, b)) - power(cardOf(content, a));
    const ids = [];
    for (const a of ATTRS) { const c = left.filter(id => !ids.includes(id) && topAttr(cardOf(content, id)) === a).sort(better)[0]; if (c) ids.push(c); }
    for (const id of left.slice().sort(better)) if (ids.length < CFG.bargainPick && !ids.includes(id)) ids.push(id);
    return ids.length === CFG.bargainPick ? { type: 'bargainPick', ids } : null;
  }
  // 兩位客人之間怎麼買（§2.1.6）：'none' 不買；'smart' 看下一位客人的牌單（無限試煉：換牌、加星後，含他帶的王牌）主屬性 M，買 COUNTER_OF[M] 軸 ≥4 星、而且比包包裡該軸最強那張更強的唱片
  //   （包包滿就賣總星最少的那張；老闆送的不能賣，跳過），錢夠且還有空位就買加成 COUNTER_OF[M] 的配件
  function shopPolicy(run, content, mode) {
    if (mode !== 'smart' || !canShop(run)) return [];
    const r = clone(run), out = [];
    const id = r.order[r.idx], E = id && content.enemies[id];
    if (!E) return [];
    const g = guestDef(r, content, id, r.pos);                // 實際的牌（換牌、加星後）＋他帶的王牌（藏家、第 5 位起的一般客人）
    const deck = g.deck.slice();
    if (g.ace) deck.push(g.ace);
    const T = COUNTER_OF[deckMain(deck, E.taste)];
    for (let guard = 0; guard < 8; guard++) {
      const bagBest = r.bag.reduce((m, x) => Math.max(m, star(cardOf(content, x), T)), 0);
      const cands = [];
      for (const key of Object.keys(r.shop.bins)) for (const cid of r.shop.bins[key]) {
        const c = cardOf(content, cid);
        if (c && star(c, T) >= 4 && star(c, T) > bagBest) cands.push({ key, cid, c, price: priceOf(content, c) });
      }
      cands.sort((a, b) => star(b.c, T) - star(a.c, T) || power(b.c) - power(a.c) || a.price - b.price);
      let bought = false;
      for (const x of cands) {
        const ch = { type: 'buy', key: x.key, cardId: x.cid };
        if (r.bag.length >= CFG.bagMax) {
          ch.sellId = r.bag.filter(x => !isGift(r, content, x)).sort((a, b) => power(cardOf(content, a)) - power(cardOf(content, b)) || peak(cardOf(content, a)) - peak(cardOf(content, b)))[0];   // 老闆送的不能賣
          if (ch.sellId == null) continue;
        }
        if (choose(r, content, ch).ok) { out.push(ch); bought = true; break; }
      }
      if (!bought) break;
    }
    const rid = 'boost_' + T;
    if (r.shop.relics.includes(rid) && r.relics.length < CFG.relicMax) {
      const ch = { type: 'buyRelic', relicId: rid };
      if (choose(r, content, ch).ok) out.push(ch);
    }
    return out;
  }

  // ============================================================================================================================
  // 玩家策略（§2.1.7）：policies[name](duel, R, mem, content) -> act。只有 oracle 讀 duel.plan／e.hand／e.pile。
  // ============================================================================================================================
  function pubOpts(v) {
    const os = [];
    v.hand.forEach((c, i) => { if (c) for (const a of ATTRS) os.push({ act: { i, attr: a }, card: c, attr: a, star: star(c, a), ace: false }); });
    if (v.ace) os.push({ act: { ace: true }, card: v.ace, attr: v.aceAxis, star: CFG.aceStar, ace: true });
    return os;
  }
  function pickMax(os) { let b = null; for (const o of os) if (!b || o.star > b.star) b = o; return b; }
  const onAxis = (os, a) => pickMax(os.filter(o => o.attr === a));
  const fallbackR = st => makeRng(((st.rng | 0) ^ 0x9e3779b9) + (st.n | 0));
  // 他各軸星數估計：公開牌單扣掉已亮過的，該軸前三大的平均（四捨五入）。星數讀 view.eDeck（實際、加星後的牌；curve harness core.cjs estStars）
  function estStars(v, content) {
    const left = v.eDeckIds.slice();
    for (const id of v.eThrownIds) { const k = left.indexOf(id); if (k >= 0) left.splice(k, 1); }
    const pub = {}; for (const x of v.eDeck || []) pub[x.id] = x;
    const cards = left.map(id => pub[id] || (content && content.cards && content.cards[id])).filter(Boolean);
    const est = {};
    for (const a of ATTRS) {
      const top = cards.map(c => star(c, a)).sort((x, y) => y - x).slice(0, 3);
      est[a] = top.length ? Math.round(top.reduce((s, x) => s + x, 0) / top.length) : 3;
    }
    return est;
  }
  // 一手的值：扣他的 − 他扣你的（打到 0 為止，溢出不算：harness 的 overkill clip）；這手會分勝負就 ±20
  function valueOf(v, r, terminal) {
    const p2 = v.pHp - r.toP, e2 = v.eHp - r.toE, ahead = playerAhead(p2, v.pMax, e2, v.eMax);
    let val = Math.min(r.toE, Math.max(0, v.eHp)) - Math.min(r.toP, Math.max(0, v.pHp));
    if (p2 <= 0 || e2 <= 0) val += ((p2 <= 0 && e2 <= 0) ? ahead : e2 <= 0) ? 20 : -20;
    else if (terminal) val += ahead ? 20 : -20;
    return val;
  }
  // 期望值一步最佳；同分先取出的那軸星高的（harness tieHigh：都能 KO 時不挑最弱、被 6 星剋不動的那張），再取總星小的（省大牌）
  function evPick(st, v, os, dist, aceCost) {
    const terminal = v.n >= v.maxRounds || (v.eHandN + v.pile) <= 1;
    let best = null, bv = -Infinity, bp = Infinity, bs = -Infinity;
    for (const o of os) {
      let ev = 0;
      for (const d of dist) { if (!d.p) continue; const r = preview(st, o.act, d.side); if (r) ev += d.p * valueOf(v, r, terminal); }
      if (o.ace && !terminal) ev -= aceCost;
      const pw = power(o.card), ps = o.star;
      if (ev > bv + 1e-9 || (Math.abs(ev - bv) <= 1e-9 && (ps > bs || (ps === bs && pw < bp)))) { best = o; bv = ev; bp = pw; bs = ps; }
    }
    return best;
  }
  const policyFns = {
    random: (st, R) => { R = R || fallbackR(st); const acts = legalActions(st); return acts[Math.floor(R() * acts.length)] || null; },
    // 只出最大星：手牌＋王牌裡星最大的那一手（王牌算 7 → 第一手就丟）
    high: st => { const b = pickMax(pubOpts(view(st))); return b ? b.act : null; },
    // 永遠剋提示：COUNTER_OF[提示] 軸最大的那張；那軸最大 ≤1 星就改 high
    counterHint: st => {
      const v = view(st), os = pubOpts(v); if (!os.length) return null;
      const o = v.hint ? onAxis(os, COUNTER_OF[v.hint.attr]) : null;
      return (o && o.star > 1 ? o : pickMax(os)).act;
    },
    // 兩步公式：上一手你出的是 COUNTER_OF[上一手提示] → 這手出提示同色最大的；否則同 counterHint
    formula: st => {
      const v = view(st), os = pubOpts(v); if (!os.length) return null;
      if (!v.hint) return pickMax(os).act;
      const L = v.last, two = !!(L && L.hint && L.pAttr === COUNTER_OF[L.hint.attr]);
      const o = onAxis(os, two ? v.hint.attr : COUNTER_OF[v.hint.attr]);
      return (o && o.star > 1 ? o : pickMax(os)).act;
    },
    // 跟提示同色（對照組）
    mirrorHint: st => { const v = view(st), os = pubOpts(v); if (!os.length) return null; const o = v.hint ? onAxis(os, v.hint.attr) : null; return (o || pickMax(os)).act; },
    // 會讀的：他這手 {提示: q, BEATS[提示]: 1−q}（q＝放水後的 qNow：知道他落後時少唬）；他各軸星數用公開牌單估；王牌在非最後一手扣 2
    thoughtful: (st, R, mem, content) => {
      const v = view(st), os = pubOpts(v); if (!os.length) return null;
      if (!v.hint) return pickMax(os).act;
      const hq = v.honesty || {}, q = hq.qNow != null ? hq.qNow : hq.q != null ? hq.q : 1, h = v.hint.attr, est = estStars(v, content);
      const dist = [{ p: q, side: { attr: h, star: est[h], ace: false } }, { p: 1 - q, side: { attr: BEATS[h], star: est[BEATS[h]], ace: false } }];
      return evPick(st, v, os, dist, 2).act;
    },
    // 先知：知道他這手出哪張、哪色（王牌成本 0.5）
    oracle: st => {
      const v = view(st), os = pubOpts(v); if (!os.length) return null;
      if (!st.plan) return pickMax(os).act;
      return evPick(st, v, os, [{ p: 1, side: { i: st.plan.idx, attr: st.plan.attr } }], 0.5).act;
    },
  };
  policyFns.novice = policyFns.counterHint;
  const policies = policyFns;

  return { VERSION, RUN_V, ATTRS, ZH, ZH1, BEATS, COUNTER_OF, beats, TIERS, TIER_AXIS, COLOR_RELIC, CFG, HONESTY, PLANNERS, TRIAL,
    RARITY, FEATURE_RARITY, SHELF_RARITY, SHOP_ORDER,
    rng, makeRng, shuffle, fnv1a32, hash01, clone, star, power, aceAxis, topAttr, peak, deckMain, clash, relicObj, playerAhead, hpPct,
    enemyDef, playerDef, startDuel, beginHand, legalActions, isLegal, preview, resolveTurn, view, bestChip, blockedChoice,
    newRun, current, nextStep, startFight, finishFight, choose, canShop, canBargainPick,
    trialCfg, classAt, roundOf, trialGuest, trialDeck, roundGuests, levelOffer, nextCheckpoint, toCheckpoint, runSummary, restock, jumpTo, half, hintTableOf,
    rarity, rarityScore, categoryOf, GENRE_BIN, pctPair, priceOf, bargainPriceOf, relicPrice, sellValue, isGift, moneyText,
    runPolicy, shopPolicy, bargainPolicy, policies };
});
