/* content.js：品味對決 v4 的純資料（SPEC-v4 §2.2、§4；第一波 A1）。
 *
 * 瀏覽器：讀 window.DipLabCards（cards.js 先載入）與 window.DipLabBins（bins.js，可沒有），輸出 window.DipLabContent。
 * Node：require('./cards.js')、try require('./bins.js')，module.exports = 同一份物件。
 * 只有資料，沒有邏輯；engine.js 只讀不改。
 *
 * v4：三相剋＋門檻 N=2（被剋方高 2 星以上剋不動，改比星）、對手暗選（提示＋誠實度，會唬人）、王牌 7 星（一場一次；沒有「不會被剋」，FIXLIST 2）、
 *     六手上限（比聲望條剩幾成，FIXLIST 3）；拿掉脾氣、急了、翻面、B 面。
 *     經濟（FIXLIST 8 台幣行情）：贏了拿錢、箱子買唱片（照稀有度定價）、櫃檯買配件、特價箱。
 * v5 無限試煉（店主 11-12；SPEC 無限試煉 §0）：沒有時間、沒有打烊；一輪 5 位，打到輸為止；錢、包包、配件、王牌整趟帶著走（C.trial）。
 *
 * 第一波（A1）：§2.2.2–§2.2.10 的資料。第二波（B2）：v4 劇本（C.script、C.tonightLines、C.blocking，§2.5.4）、
 *   刪掉 v3 外殼墊片（junk、habits、retorts、v3 劇本、bins[*].ids）；教學步驟（C.tutorial.steps／learned／ui）第二波第 2 階段改。
 *
 * 文案慣例（店主規則）：
 *   - script 的 Beat.text：說話者的台詞包在「」裡（同現行 RPG_BEATS）；旁白第二人稱「你」、不加「」。
 *   - lines.*（舞台泡泡）：不加「」，由 UI 決定怎麼框。
 *   - 不用破折號；櫃檯、硬蕊、發燒配件、唱片資訊；「派對」不出現。
 *   - 每一句都有來源標記：script 的 Beat.tag；lines／shopLines 的標記在 lineTags／shopLineTags（同形狀、平行的表）；
 *     其他字串用自己的 tag 欄位或 xxxTag。
 *     標記值：'原句'＝現行 roguelike.html 一字不改、'店主'＝DECISIONS-v4 裡店主寫／核可的字（逐字比對 tools/owner-lines-v4.json）、
 *     '拍板'＝店主親定（v3）、'新'＝試做版新寫、'新:A'～'新:D'＝取自概念稿（同樣待店主過目）。
 */
(function (root, factory) {
  var node = typeof module === 'object' && module.exports;
  var cards = node ? require('./cards.js') : root.DipLabCards;
  var bins = node ? (function () { try { return require('./bins.js'); } catch (_) { return {}; } })() : root.DipLabBins;
  var content = factory(cards || {}, bins || {});
  if (node) module.exports = content;
  else root.DipLabContent = content;
})(typeof self !== 'undefined' ? self : this, function (CARDS, BINS) {
  'use strict';
  var C = {};
  C.version = 'lab-4';
  C.cards = CARDS;
  function L(text, tag) { return { _t: text, _g: tag }; }
  function pick(raw, which) {
    if (raw && typeof raw === 'object' && '_t' in raw) return which === 't' ? raw._t : raw._g;
    if (Array.isArray(raw)) return raw.map(function (x) { return pick(x, which); });
    var o = {}; for (var k in raw) o[k] = pick(raw[k], which); return o;
  }

  // ===================================================================
  // 王牌、老闆送的四張（§4.2）、特價箱（§4.3）。每一晚包包開局＝老闆四張；特價箱挑三張後 7 張；最多 8 張（不含王牌）
  // ===================================================================
  C.aces = { hall: 'radiohead-ok-computer', pearl: 'barney-wilen-zodiac', heresy: 'swans-filth' };
  C.aceTitle = { hall: '殿堂', pearl: '流亡', heresy: '異端' };          // 王牌名（附錄 D）
  C.aceGloss = { hall: '大家都聽過的名盤', pearl: '沒幾個人聽過', heresy: '難入耳，越前衛越高' };   // 三軸 7 星的白話（挑王牌那行括號、唱盤前三張的小字；店主 11-12）
  C.aceGlossTag = '新';
  C.aceAxis = { hall: 'c', pearl: 'o', heresy: 'h' };                    // 7 星那軸（王牌只能丟這一軸）
  C.gifts = {
    hall:   ['david-bowie-low', 'vashti-bunyan-just-another-diamond-day', 'scott-walker-tilt', 'beverly-glenn-copeland-keyboard-fantasies'],
    pearl:  ['charles-brackeen-rhythm-x', 'bark-psychosis-hex', '黃小楨-賞味期限', '傷心欲絕-我愛您'],
    heresy: ['the-velvet-underground-white-light-white-heat', 'melt-banana-speak-squeak-creak', 'pharoah-sanders-tauhid', 'magma-mekanik-destruktiw-kommandoh']
  };
  // 特價箱：9 張（峰值 ≤3、冷門 ≤3、topAttr 經／冷／硬各 3）；每晚擺 6 張＝每色 2 張（engine newRun）
  C.bargain = {
    label: '特價',
    pool: ['blur-the-great-escape', 'oasis-dig-out-your-soul', 'david-bowie-never-let-me-down',
      'the-velvet-underground-squeeze', 'stevie-wonder-eivets-rednow', 'the-kinks-preservation-act-1',
      'metallica-reload', 'weezer-van-weezer', 'ramones-halfway-to-sanity']
  };
  C.bargainTag = '新';

  // ===================================================================
  // 誠實度（D §5：照實出的機率 q）與出招難度（原版 aiPlan 的係數，roguelike.html:3650-3660，拿掉相生與氣勢）
  //   誠實度只在引擎裡用，畫面上不寫任何誠實度的字（店主 2026-11-08 06:05「不用寫什麼提示大多可信 看了很煩」，FIXLIST 6）；
  //   玩家從結果句「他唬你！」自己體會。
  // ===================================================================
  C.honesty = {
    honest:    { q: 1 },     // 序章男子
    sometimes: { q: 0.8 },   // 一般客人
    often:     { q: 0.75 },  // 菁英（R1：原 .7）
    veteran:   { q: 0.75 }   // 傳說藏家（R1：原 .6；藏家聲望 ≥22 時 .6 單場掉到 44%，過不了 S7 下限 45%）
  };
  C.planners = {
    easy:   { w: 0.45, nz: 2.4, mercy: false },   // 原版 easy：星×0.45＋U(0,2.4)，不鈍化
    normal: { w: 0.6,  nz: 1.4, mercy: true },    // 原版 normal：星×0.6＋U(0,1.4)
    hard:   { w: 0.7,  nz: 0.8, mercy: true }     // 原版 hard：星×0.7＋U(0,0.8)
  };
  // 出招難度跟著位數走（無限試煉曲線 V3，C.trial.curve.planner：第 1–2 位 easy、3–4 normal、5 起 hard＝原版 enemyForDepth）；
  //   C.honesty 只剩序章男子與直接開打的對決在用（無限試煉的說真話機率照位數，C.trial.curve.q）。一晚版的 C.plannerByDepth 拿掉了

  // ===================================================================
  // 發燒配件（9 件；全部被動、自動生效、最多帶 3 件；照 v3 帶到下一晚）
  //   desc＝說明（點圖示時看）；note＝生效那手結果行補的一句（engine 的 clash.notes[].text）
  //   價錢：一律 C.economy.relicPrice（$3,000 一件，FIXLIST 8）；序章／獎勵拿到的只用來算賣回（半價）。要個別定價再在這裡加 price
  //   boost＝出那色時 +1 星（engine outcome；王牌不加）；v4:false＝v4 哪裡都拿不到（engine newRun 濾掉）
  //   icon＝ui.js LAB_ICONS（roguelike.html PIX_ICONS_LV）的鍵；heavy180／numbered／matrix 由 B2 加進 LAB_ICONS
  //   序章收尾三選一：防塵套／黑膠唱針／洗碟水；菁英、藏家打贏：他丟過的唱片挑一張，或改拿 rewards.relicPool 裡的一件；櫃檯只賣三件加成
  // ===================================================================
  C.relics = {
    dustcover: { id: 'dustcover', name: '防塵套',     icon: 'dustcover', desc: '每場第一次被剋少扣 1。', note: '防塵套：少扣 1',      tag: '新' },
    stylus:    { id: 'stylus',    name: '黑膠唱針',   icon: 'stylus',    desc: '硬蕊剋中多扣 1。',       note: '黑膠唱針：多扣 1',    tag: '新' },
    cleaner:   { id: 'cleaner',   name: '洗碟水',     icon: 'cleaner',   desc: '同色同星時你扣他 1。',   note: '洗碟水：他 −1',       tag: '新' },
    obi:       { id: 'obi',       name: '原版側標',   icon: 'obi',       desc: '經典剋中多扣 1。',       note: '原版側標：多扣 1',    tag: '新' },
    testpress: { id: 'testpress', name: '神秘見本盤', icon: 'testpress', desc: '冷門剋中多扣 1。',       note: '神秘見本盤：多扣 1',  tag: '新' },
    // 〔補〕⚠規則：v3 效果靠名牌脾氣，v4 已無脾氣；新效果（第一手他不唬人）等店主決定，預設哪裡都拿不到（SPEC-v4 §2.2.6、§5.7 #7）
    headphone: { id: 'headphone', name: '監聽耳機',   icon: 'headphone', desc: '每場第一手他不唬人。',   note: '監聽耳機：他照實出',  v4: false, tag: '新' },
    boost_c:   { id: 'boost_c',   name: '180g 重量盤', icon: 'heavy180', desc: '經典出招時 +1 星。',     note: '重量盤：+1 星',       boost: 'c', tag: '新' },
    boost_o:   { id: 'boost_o',   name: '絕版編號標', icon: 'numbered',  desc: '冷門出招時 +1 星。',     note: '絕版編號標：+1 星',   boost: 'o', tag: '新' },
    boost_h:   { id: 'boost_h',   name: '內圈刻字',   icon: 'matrix',    desc: '硬蕊出招時 +1 星。',     note: '內圈刻字：+1 星',     boost: 'h', tag: '新' }
  };
  C.relicMax = 3;
  C.rewards = {
    prologueRelics: ['dustcover', 'stylus', 'cleaner'],
    relicPool: ['obi', 'testpress', 'stylus', 'dustcover', 'cleaner']
  };
  C.relicShop = { pool: ['boost_c', 'boost_o', 'boost_h'] };     // 櫃檯只賣三件屬性加成（D §6）

  // ===================================================================
  // 經濟（台幣行情，FIXLIST 8＋X／Y 契約；整趟無限試煉帶著走，輸了開新一趟才歸零）。畫面一律寫千分位（$1,200；engine.moneyText）
  //   唱片照稀有度定價（engine.rarity：score＝經典＋硬蕊＋(冷門=5 ? 1 : 0)；≤5 普通、6 稀有、7 獨特、8 史詩、≥9 傳奇；頂點卡＝頂點）
  //   箱子／新進／店長推薦只上普通～獨特（$800–1,200）；門口牆最靠門那格 FEATURE 只上史詩 $3,000／傳奇 $4,000；頂點 $8,000 先備好、v4 不上架（王牌是老闆送的）
  //   特價箱每張照最高星 $100／200／300（序章挑三張照舊免費）；櫃檯配件一件 $3,000；賣回一律半價
  //   start／win＝sim.mjs --n 3000 校準（dev/notes-X.md、dev/sim-v4.json）；其他是店主定的價，不拿來校準
  //   win.boss：打贏藏家不再打烊，給菁英的 1.5 倍（主線裁定 3，真人試玩再調）
  // ===================================================================
  C.economy = {
    start: 1000,                                                  // 開局的錢（校準）
    win:   { prologue: 0, normal: 1500, elite: 2500, boss: 3750 },   // 贏一位客人拿多少（校準；序章 0、藏家＝菁英 ×1.5）
    price: { common: 800, rare: 1000, uncommon: 1200, epic: 3000, legendary: 4000, apex: 8000 },
    bargain: { 1: 100, 2: 200, 3: 300 },                          // 特價箱每張，照那張最高星
    relicPrice: 3000,                                             // 櫃檯配件一件
    sellRate: 0.5,                                                // 半價賣回
    stock: [4, 6], featureStock: [2, 3], relicStock: [2, 3]       // 每區 4–6 張（FEATURE 2–3 張）、櫃檯 2–3 件
  };
  C.rarityZh = { common: '普通', rare: '稀有', uncommon: '獨特', epic: '史詩', legendary: '傳奇', apex: '頂點' };   // CARD_GAME_DESIGN §5 的名字
  C.rarityTag = '店主';
  // 店裡的箱子（bins.js，由 tools/bake-cards.mjs 產生；沒有 bins.js 時是空的）。
  //   X／Y 契約：每個 key { key, label, zh, pool, front }：jazz tw rock elec soul hiphop pop classical world folk blues new feature picks
  //   引擎照 pool 上這一輪的貨（engine restock，每輪開頭補貨）；front＝畫在道具上的封面（Y）；名牌英文 label、點了看 zh
  C.bins = {};
  (function () {
    var B = (BINS && BINS.shops && BINS.shops.dip) || (BINS && BINS.bins) || {};
    Object.keys(B).forEach(function (k) {
      var b = B[k], o = {};
      if (!b || typeof b !== 'object' || !Array.isArray(b.pool)) return;
      for (var x in b) o[x] = b[x];
      C.bins[k] = o;
    });
  })();

  // ===================================================================
  // 無限試煉（店主 11-12 拍板；SPEC 無限試煉 §0，engine.js trialCfg 讀這份，沒寫的欄位用 engine TRIAL 預設）
  //   序章打完＝第 1 位；一輪 5 位：一般 3、第 4 位菁英、第 5 位傳說藏家；打完藏家接下一輪新面孔；打到輸為止。
  //   你 12 聲望、帶到下一場、打贏回 3（不超過上限）；客人 12、藏家 14。老闆說情每輪 1 次；商店每輪補貨一次。
  //   局內升級：贏一般 +2 經驗、菁英 +3、藏家 +4；升下一級要「目前等級＋3」；每升一級聲望上限 +1（現有聲望也 +1），再三選一（picks）。
  //   中繼點：打贏第 10、20、30、50、75、100 位，之後每 50 位（票之後再做）。
  //   curve＝難度曲線 V3（../curve/curves.cjs；照店主舊版 roguelike enemyForDepth 的形狀，第 6 位之後客人品味每 5 位 +1）。改難度只改這裡；
  //   tiers＝之後的難度階梯（像 Monster Train 的 Covenant）：第 k 階＝tiers[k−1]，是 curve／guestHp… 的部分覆寫，例 { curve: { atk: { add: 1 } } }
  // ===================================================================
  C.trial = {
    classes: ['normal', 'normal', 'normal', 'elite', 'boss'],
    retry: 1,                                       // 老闆說情每輪 1 次（同一位、同一副牌、聲望回到開打前）
    youHp: 12, heal: 3,                             // 你 12 聲望；打贏回 3（＝engine CFG.playerHp）
    guestHp: { normal: 12, elite: 12, boss: 14 },
    xp: { normal: 2, elite: 3, boss: 4 }, levelNeed: 3, levelHp: 1,
    picks: { atk: 1, def: 1, hp: 2 },               // 三選一：品味 +1、底氣 +1、聲望上限 +2（現有聲望也 +2）
    checkpoints: [10, 20, 30, 50, 75, 100], checkpointEvery: 50,
    curve: {
      planner: { easyTo: 2, normalTo: 4 },          // 出招難度：第 1–2 位 easy、第 3–4 位 normal、第 5 位起 hard（C.planners）
      // 說真話機率 q：easy 1、normal 0.85、hard 1−min(0.55, 0.18＋0.05×max(0, 位−5))（第 5 位 0.82、第 13 位起封底 0.45）
      q: { easy: 1, normal: 0.85, feintBase: 0.18, feintStep: 0.05, feintFrom: 5, feintMax: 0.55 },
      mercyFeint: 0.8,                              // 放水：你落後時他少唬，唬人率 ×(1−0.8×mercy)（舊版 roguelike.html:3693-3695）
      // 客人品味（他這手扣到你才加，再扣你的底氣）：min(2, round(0.75×max(0, 位−3)))＋⌊max(0, 位−6)/5⌋，藏家 +1；add＝之後難度階梯用
      atk: { lateFrom: 3, rate: 0.75, cap: 2, slopeFrom: 6, slopeEvery: 5, boss: 1, add: 0 },
      // 客人底氣（最多擋一半）：min(1, round(0.45×max(0, 位−3)))，藏家 +1
      def: { lateFrom: 3, rate: 0.45, cap: 1, boss: 1, add: 0 },
      // 客人牌組：三軸總星下限 min(13, 3＋⌊0.7×位⌋)（低於的換掉）；主軸加 ⌊max(0, 位−3)/3⌋ 星、上限 5；
      //   藏家必帶王牌；一般客人第 5 位起帶王牌機率 min(60%, 15%×(位−4))
      deck: { floorBase: 3, floorRate: 0.7, floorMax: 13, minPool: 7, buffFrom: 3, buffEvery: 3, buffCap: 5, aceFrom: 5, aceRate: 0.15, aceMax: 0.6 }
    },
    tiers: [],
    // ---- 畫面字（{x} 由畫面代入；第二棒 ui.js 用）----
    ui: {
      prologue: '序章',
      pos: '第 {n} 位',                              // 頂欄只寫這個（店主：不寫時間）
      round: '第 {r} 輪',
      elite: '菁英', boss: '傳說藏家',
      toCheckpoint: '離下個中繼點還有 {n} 位',
      checkpoint: '中繼點：第 {n} 位',               // 打贏中繼點那一位的吐司
      retryLeft: '老闆說情 剩 {n} 次',
      next: '下一位：第 {n} 位　{name} ▸',
      guestDone: '打過了', guestCur: '下一位', guestLater: '還沒輪到',
      hasAce: '帶王牌',
      hp: '聲望 {n}/{max}',
      heal: '聲望 +{n}',                             // 打贏回 3 的吐司
      level: 'Lv {n}', xp: '經驗 {n}/{need}', atk: '品味 {n}', def: '底氣 {n}', maxHp: '聲望上限 {n}',
      atkShort: '品 {n}', defShort: '底 {n}',        // 對決「你／他」那列的小籤（大於 0 才顯示）
      cont: '繼續試煉 ▸', abandon: '放棄這一趟', abandonWarn: '再按一次就放棄這一趟（{where}），從頭推門。', lastSummary: '看上一趟結算',
      retryMenu: ['▶ 再一場（這一輪只有一次）', '到這裡就好'],
      shelfNew: '這一趟新認識'
    },
    // 升級三選一（第一格固定是品味或底氣；engine.levelOffer）。字是店主暫定的名字（品味／底氣），句子新寫
    levelUp: { title: '升級：Lv {n}', sub: '聲望上限 +1（自動）', atk: '品味 +1', def: '底氣 +1', hp: '聲望上限 +2', atkSub: '只加在剋中', defSub: '最多擋一半', hpSub: '現在的聲望也 +2' },
    // 結果行補的一句（engine outcome 的 notes；{n}＝多扣／少扣幾點）
    notes: { atk: '品味：多扣 {n}', def: '底氣：少扣 {n}', eAtk: '他的品味：多扣 {n}', eDef: '他的底氣：少扣 {n}' }
  };
  C.trialTag = '新';

  // ===================================================================
  // 客人（10 位；SPEC-v4 §2.2.3、§4.1。聲望＝sim.mjs --n 3000 校準後的值（男子固定 10、教學 18），過程見 dev/notes-X.md、dev/notes-R1.md、dev/notes-H1.md）
  //   FIXLIST 11 平衡 H5-1（手牌 5 張；主線 2026-11-08 選案，scratchpad/v4/balance/H5A/results.md）：
  //   無限試煉不用這裡的 hp（照 C.trial.guestHp：12／14）；這裡的 hp 只剩直接開打的對決（?debug=1 的對決實驗室、sim S7）在用。
  //   一般 25（社團學長、二手店老闆 20）、菁英 主理人 25／樂評 26、藏家 28——聲望 一般 ≤ 菁英 ≤ 藏家（sim HP 檢查）；一晚版你 9。
  //   手牌 3 → 5 張讓「剋不到」的手從約 19% 降到 12%，R1 的數字通關率變 87%（超過 85）、KO 60%：你 −1 聲望壓通關率（約 −7 點），
  //   客人聲望往上加把多出來的 KO 收回（59.8% → 47.8%）。社團學長、二手店老闆是最難的兩位（單場約 79%），放低到 20 讓一般客人差距 ≤20 點。
  //   出招難度（C.plannerByDepth）與唬人率（C.honesty）照 R1 不動。R1（手牌 3 張）是 你 10、一般 22（社團學長 21）、菁英 22／24、藏家 24。
  //   name：一看就知道是誰、偏好什麼的身分（FIXLIST 6，店主 2026-11-08 06:03）；原本的綽號＋副標（title）併掉，沒有 title 欄
  //   honesty：C.honesty 的鍵（男子老實、一般客人偶爾唬人、菁英愛唬人、藏家老江湖；只在引擎裡，不上畫面）；無限試煉的出招難度與說真話機率跟著位數走（C.trial.curve）
  //   taste：三軸並列時的順序（只當並列順序）；deck：7 張真唱片（藏家 6 張＋你沒選的那張王牌，由 engine 加；男子 6 張）。無限試煉照位數換牌、加星（engine trialDeck）
  //   line：口頭禪（開場泡泡，= lines[id].line）；drop：序章男子打輸掉出來的那張
  // ===================================================================
  C.enemies = {
    man: {
      id: 'man', name: '男子', spr: 'e0', avatar: null,
      honesty: 'honest', hp: 10, taste: 'coh',
      deck: ['coldplay-mylo-xyloto', 'imagine-dragons-night-visions', 'limp-bizkit-results-may-vary', '老王樂隊-暮夜徐行',
        'eminem-the-eminem-show', 'katy-perry-prism'],
      drop: 'fishmans-long-season', prologue: true, voice: { freq: 659, wave: 'square' }
    },
    copycat: {
      id: 'copycat', name: '文青同好', spr: 'e1', avatar: null,
      honesty: 'sometimes', hp: 25, taste: 'och',
      deck: ['beach-house-teen-dream', 'weyes-blood-titanic-rising', 'mitski-be-the-cowboy', 'billie-eilish-when-we-all-fall-asleep-where-do-we-go',
        'low-double-negative', 'sophie-oil-of-every-pearl-s-un-insides', '大象體操-elephant-gym-角度'],
      voice: { freq: 523, wave: 'square' }
    },
    already: {
      id: 'already', name: '社團學長', spr: 'e2', avatar: null,
      honesty: 'sometimes', hp: 20, taste: 'hco',
      deck: ['don-slepian-sea-of-bliss', 'harold-budd-abandoned-cities', 'demetrio-stratos-metrodora',
        'etron-fou-leloublan-les-trois-fou-s-perdegagnent-au-pays-des', 'nocturnal-emissions-fruiting-body', 'eivind-aarset-electronique-noire',
        'yezda-urfa-boris'],
      voice: { freq: 440, wave: 'square' }
    },
    needle: {
      id: 'needle', name: '音響發燒友', spr: 'e6', avatar: null,
      honesty: 'sometimes', hp: 25, taste: 'coh',
      deck: ['steely-dan-gaucho', 'art-pepper-art-pepper-meets-the-rhythm-section', 'bill-evans-waltz-for-debby', 'kenny-burrell-midnight-blue',
        'roscoe-mitchell-sextet-sound', 'john-zorn-cobra', 'andrew-cyrille-what-about'],
      voice: { freq: 587, wave: 'triangle' }
    },
    skip: {
      id: 'skip', name: '二手店老闆', spr: 'e4', avatar: null,
      honesty: 'sometimes', hp: 20, taste: 'coh',
      deck: ['roberto-goyeneche-cantor-de-mi-barrio', 'amalia-rodrigues-gostava-de-ser-quem-era', 'king-sunny-ade-aura',
        'washington-phillips-the-key-to-the-kingdom', 'otha-turner-the-rising-star-fife-drum-band-everybody-holleri',
        'tony-scott-the-indonesian-all-stars-djanger-bali', 'barney-wilen-moshi'],
      voice: { freq: 330, wave: 'square', jitter: 20 }
    },
    broke: {
      id: 'broke', name: '地下樂團吉他手', spr: null,
      avatar: { head: 'cap', hair: 'u', shirt: 'r', pants: 'd', skin: 's' },
      honesty: 'sometimes', hp: 25, taste: 'och',
      deck: ['血肉果汁機-flesh-juicer-golden太子bro', '血肉果汁機-flesh-juicer-深海童話', '閃靈-失竊千年',
        '血肉果汁機-flesh-juicer-血肉宮建宮蓋廟演唱會', '閃靈-永劫輪迴', '閃靈-醒靈寺大決戰', '林強-驚蟄'],
      voice: { freq: 494, wave: 'square' }
    },
    buyer: {
      id: 'buyer', name: '前衛樂迷', spr: null,
      avatar: { head: 'fedora', hair: 'k', shirt: 'g', pants: 'k', skin: 't' },
      honesty: 'sometimes', hp: 25, taste: 'coh',
      deck: ['swans-soundtracks-for-the-blind', 'venetian-snares-making-orange-things', 'nurse-with-wound-homotopy-to-marie',
        'ryoji-ikeda-mort-aux-vaches', 'sunn-o-white1', 'sigur-ros-von', 'william-basinski-the-disintegration-loops'],
      voice: { freq: 554, wave: 'square' }
    },
    label: {
      id: 'label', name: '地下廠牌主理人', spr: 'e5', avatar: null,
      honesty: 'often', hp: 25, taste: 'ohc',
      deck: ['廢五金-廢五金', '明田川荘之-yamazaki-blues', '菊地雅章-end-for-the-beginning', 'keiji-haino-watashi-dake',
        'harry-roesli-gang-philosophy-gang', 'c-o-b-moyshe-mcstiff-and-the-tartan-lancers-of-the-sacred-he', 'pholas-dactylus-concerto-delle-menti'],
      elite: true, voice: { freq: 294, wave: 'sine' }
    },
    critic: {
      id: 'critic', name: '資深樂評', spr: 'e3', avatar: null,
      honesty: 'often', hp: 26, taste: 'ohc',
      deck: ['tim-buckley-starsailor', 'throbbing-gristle-20-jazz-funk-greats', 'black-midi-schlagenheim', 'faust-faust-iv',
        'neu-neu', 'sun-ra-space-is-the-place', 'the-plastic-people-of-the-universe-egon-bondy-s-happy-hearts'],
      elite: true, voice: { freq: 392, wave: 'square' }
    },
    boss: {
      id: 'boss', name: '傳說藏家', spr: 'boss', avatar: null,
      honesty: 'veteran', hp: 28, taste: 'coh',
      deck: ['交工樂隊-我等就來唱山歌', 'ganelin-trio-ancora-da-capo', 'luis-russell-the-luis-russell-story-1929-1934',
        'raw-material-time-is', 'alexander-von-schlippenbach-globe-unity', '裸のラリーズ-the-oz-tapes'],
      boss: true, voice: { freq: 147, wave: 'sine' }
    }
  };
  C.normals = ['copycat', 'already', 'needle', 'skip', 'broke', 'buyer'];
  C.elites = ['label', 'critic'];
  C.prologueEnemy = 'man';
  // 客人牌組裡的店主私藏（金邊）：客人丟出來、你收下的那張不標「私藏」（COPY-12：私藏＝老闆的；Barney Wilen、Tony Scott 在二手店老闆、John Zorn 在音響發燒友手上）
  (function () {
    var mine = {}; Object.keys(C.gifts || {}).forEach(function (t) { (C.gifts[t] || []).forEach(function (id) { mine[id] = 1; }); });
    Object.keys(C.enemies || {}).forEach(function (eid) { (C.enemies[eid].deck || []).forEach(function (id) { var c = C.cards[id]; if (c && c.gold && !mine[id]) c.gold = false; }); });
  })();
  C.boss = 'boss';

  // A3-M2 換牌（SPEC-v4 §3.1 A1 交件 5(b)、§6.7；理由與模擬見 dev/notes-A1.md）：already 的 Pauline Anna Strom／Gigi Masin 換成
  //   Don Slepian／Harold Budd，skip 的 Mina／Dorival Caymmi 換成 Roberto Goyeneche／King Sunny Adé（冷 5 → 嚴格冷 4，位置不變），
  //   S7（一般客人單場最高減最低 ≤20 點）與 S4（≤3 手 ≤5%）才能一起過。A3-M2 已烘進 cards.js，上面的牌單直接寫新卡。

  C.voices = { owner: { freq: 196, wave: 'square' }, narrator: null };   // 打字機嗶聲

  // ===================================================================
  // 今晚那張（三張王牌之一，日期種子決定）的兩句音樂描述（D §2 猜歌第 2 步；店主草稿，逐字收在 tools/owner-lines-v4.json）
  //   序章 O5a／O5b 依今晚那張的 tier 取（Beat.text 是 {hall, pearl, heresy} 物件）；沒開聲音也照樣念，玩家聽描述也猜得出來
  // ===================================================================
  C.tonightLines = {
    hall: ['清脆的吉他分解和弦，底下墊著一層像機器運轉的電子聲。', '一個又高又細的男聲飄在上面，聽起來疲憊又不安。'],
    pearl: ['一支薩克斯風自顧自地吹，旋律說斷就斷。', '鼓和貝斯不照拍子走，像在跟它鬥嘴。'],
    heresy: ['鼓一下一下砸下來，像有人在敲鐵門。', '低音一直磨同一個音，一個男聲在吼，聽不出在唱什麼。']
  };
  C.tonightLinesTag = '店主';

  // ===================================================================
  // 劇本（SPEC-v4 §2.5.3、§2.5.4；D §2、§3）。ui.js 的逐句執行器（beat runner）照這份演，不寫死人名與站位。
  //   Beat = { id, who, text, tag, if?, set?, pre?, act?, music?, ui?, prompt?, prompts?, button? }
  //     id：'O1'…'O21'、'E1'…'E11'、'B1'…（測試與時間軸用）
  //     who：''＝旁白、'老闆'、'男子'、'藏家'、'？？？'、'player'
  //     text：字串，或 { hall, pearl, heresy }＝依今晚那張（C.tonightLines）
  //     tag：'原句'（roguelike.html RPG_BEATS／TUT_EPILOGUE_BEATS 一字不差）、'店主'（owner-lines-v4.json 逐字）、'新'
  //     if：'guessRight' 猜中、'guessWrong' 猜錯；沒有 if 的一律播
  //     set：開口前立即套用 { put:{id:spot}, door:'open'|'swing'|'close', notes:bool, sprite:{id:spr}, hide:{id:bool}, sil:{id:bool},
  //          pose:{id:name|null}, emote:{id:kind|null}, stamp:'主字：副字' }
  //     pre：開口前依序做完的步驟（對話框空著、不打字）；act：跟打字同時開始、依序做的步驟。▼ 等字打完而且 act 做完才亮
  //     music：'tonight' 開始播今晚那張、'stake' 播那張盤、{ stop: fadeMs } 淡出（在 set 那一刻開始）
  //     ui：選擇句（▼ 以選擇樣式亮，點一下才開面板）：'guess' 猜歌、'acePick' 挑王牌、'recs' 老闆的四張、'bargain' 特價區挑三張、
  //         'duel' 兩顆接受對決、'stake' 地上那張盤、'relic' 發燒配件三選一、'map' 進今晚來客
  //     prompt：面板上方那行字；prompts：選單的鈕（duel）；button：面板的確認鈕（recs）
  //   Step = { do:'walk', id, to:[spot|[x,y]…], speed? } | { do:'pose', id, name, ms? } | { do:'emote', id, kind, ms? } | { do:'wait', ms }
  //        | { do:'door', mode } | { do:'face', id, to } | { do:'hold', id, what } | { do:'hide', id, on } | { do:'give', from, gap }
  //        | { do:'floor', at } | { do:'sfx', name } | { do:'par', steps } | { do:'seq', steps }
  //   人物：p＝你、o＝老闆、f＝門口進來的那位、r1＝熟客（序章與收尾藏起來）。
  //   '@' 開頭的值由執行器代入：'@man' 序章男子的小人、'@guest' 今晚第一位客人的小人、'@gift' 老闆送的第一張（依你挑的王牌）
  //   走路：序章與收尾預設速度 C.blocking.speed（54＝1.5 倍）；O20「緩步」36。一律用走的（不瞬移）；翻箱（dig）一定在走到之後
  // ===================================================================
  function walk(id, to, speed) { var s = { do: 'walk', id: id, to: [].concat(to) }; if (speed) s.speed = speed; return s; }
  function pose(id, name, ms) { var s = { do: 'pose', id: id, name: name }; if (ms) s.ms = ms; return s; }
  function face(id, to) { return { do: 'face', id: id, to: to }; }
  function wait(ms) { return { do: 'wait', ms: ms }; }
  function door(mode) { return { do: 'door', mode: mode }; }
  function hold(id, what) { return { do: 'hold', id: id, what: what }; }
  function hide(id, on) { return { do: 'hide', id: id, on: on }; }
  function sfx(name) { return { do: 'sfx', name: name }; }
  function par() { return { do: 'par', steps: [].slice.call(arguments) }; }
  function seq() { return { do: 'seq', steps: [].slice.call(arguments) }; }
  function tonight(k) { return { hall: C.tonightLines.hall[k], pearl: C.tonightLines.pearl[k], heresy: C.tonightLines.heresy[k] }; }

  C.blocking = {
    speed: 54,
    // O21 選完「接受對決」（不加台詞；對話框留著老闆那句，到盤面滑進來才收，整合版面 b）：老闆帶路走到唱盤後面，兩人走到唱盤兩側；三人站定才播遇敵特效（D §3）
    toDuel: [par(walk('o', 'ref'), seq(wait(400), par(walk('f', 'duelE'), walk('p', 'duelP'))))],
    // 再挑戰一趟：挑完王牌，走到門邊的特價箱挑三張（§2.5.2）
    toSale: [walk('p', 'sale')]
  };

  // 開頭旁白＋玻璃倒影捏人（店主 11-10 定稿；只在第一次推門）：黑幕兩句 → 捏人（玻璃門上的倒影）→ 序章從 O2 接下去
  //   第一次推門但捏過人（序章中途放棄、又推一次門）：只念第一句，直接接 O2
  C.intro = {
    lines: [
      { id: 'I1', text: '雨下個不停。巷子深處，有人輕輕推開那扇半掩的門，門上的鈴鐺清脆一響，隨即被雨聲吞沒。', tag: '店主' },
      { id: 'I2', text: '玻璃門晃了晃，映出推門的人。', tag: '店主' }
    ],
    title: '玻璃上的你',
    skip: '先隨便'
  };

  C.script = {
    // 序章（O1–O21）：原版 RPG_BEATS 為底（D §2）。猜歌七步、四張、特價區三張、八張、兩顆接受對決
    prologue: [
      // 原本的 O1「下著雨。你推開……鈴鐺，響了一聲。」拿掉：內容已經在開頭旁白（C.intro，店主 11-10）；它的站位搬到 O2
      { id: 'O2', who: '', text: '櫃檯後面的老闆抬頭看了你一眼，又低下頭，繼續整理手上的唱片。', tag: '原句',
        set: { put: { p: 'door', o: 'counter' }, hide: { f: true, r1: true }, door: 'swing', pose: { o: 'busy' } },
        act: [pose('o', null), wait(600), pose('o', 'busy')] },
      { id: 'O3', who: '', text: '你自己逛自己的。一排排的黑膠，大部分連名字都沒看過。', tag: '原句', act: [walk('p', 'browse')] },
      { id: 'O4', who: '', text: '這時候，店裡的音響傳出一段旋律。', tag: '原句', set: { notes: true }, music: 'tonight' },
      { id: 'O5a', who: '', text: tonight(0), tag: '店主' },
      { id: 'O5b', who: '', text: tonight(1), tag: '店主' },
      { id: 'O6', who: '', text: '你抬起頭。老闆正把一張唱片放上唱盤。櫃檯上還攤著兩張，封套邊緣磨損嚴重，顯然塵封已久。', tag: '原句',
        act: [face('p', 'o')] },
      { id: 'O7', who: '老闆', text: '「這三張，是我這裡最貴的三張。」他沒抬頭。「你覺得，現在播的是哪張？」', tag: '店主',
        ui: 'guess', prompt: '你覺得，現在播的是哪張？' },
      { id: 'O8r', who: '老闆', text: '「……你眼光真不錯。」老闆終於抬起頭來，看著你。', tag: '原句', if: 'guessRight', set: { pose: { o: null } } },
      { id: 'O8w', who: '老闆', text: '「可惜啊。」老闆終於抬起頭來，看著你。', tag: '店主', if: 'guessWrong', set: { pose: { o: null } } },
      { id: 'O9', who: '老闆', text: '「跟你很有緣，挑一張送你。」', tag: '店主', ui: 'acePick', prompt: '（挑一張。）' },
      // 音樂播到這句說完（D：私人收藏那句「之後」才停）
      { id: 'O10', who: '老闆', text: '「這張是我的私人收藏。今天讓給你。」', tag: '原句' },
      // 老闆走到長桌（dig1）翻、再到 dig2 翻，拿著唱片；O14 走回櫃檯看過才入袋（包包條在那之前一律空）
      { id: 'O11', who: '', text: '老闆不發一語，走出櫃檯，在那張長桌上的木箱裡翻翻找找。', tag: '原句', set: { notes: false }, music: { stop: 1500 },
        act: [walk('o', 'dig1'), pose('o', 'dig', 1000), walk('o', 'dig2'), pose('o', 'dig', 1000), hold('o', { sleeve: '@gift' })] },
      { id: 'O12', who: '老闆', text: '「這四張也很適合你。收下吧。」', tag: '店主', pre: [face('o', 'p')],
        ui: 'recs', prompt: '（老闆把四張盤遞給你。）', button: '收下這四張' },
      { id: 'O13', who: '老闆', text: '「特價區那邊，隨便挑三張。」', tag: '店主', act: [walk('p', 'sale')], ui: 'bargain', prompt: '（挑三張。）' },
      { id: 'O14', who: '', text: '你把八張唱片放到櫃檯上。老闆一張一張看過，替你收進紙袋。', tag: '店主',
        pre: [par(walk('p', 'pay'), seq(walk('o', 'counter'), hold('o', null)))],
        act: [pose('o', 'busy'), { do: 'give', from: 'counter', gap: 250 }, pose('o', null)] },
      { id: 'O15', who: '', text: '你抱著紙袋，心滿意足，往門口走去。', tag: '原句', act: [walk('p', 'leaving')] },
      { id: 'O16', who: '', text: '這時，門開了。', tag: '原句', set: { sprite: { f: '@man' }, put: { f: 'door' }, hide: { f: false }, sil: { f: false }, door: 'open' } },
      // 嗆聲在後走道（門邊）：誰都還不去唱盤
      { id: 'O17', who: '', text: '一名男子走進來。他的視線，落在你手上的那幾張專輯上。', tag: '原句',
        act: [walk('f', 'atdoor'), door('close'), face('f', 'p'), face('p', 'f')] },
      { id: 'O18', who: '男子', text: '「……這品味，也敢出來丟臉？」', tag: '原句' },
      { id: 'O19', who: '', text: '你的憤怒表露無遺。', tag: '原句', set: { emote: { p: 'anger' } }, act: [sfx('faceChange')] },
      { id: 'O20', who: '', text: '老闆不發一語，緩步走出櫃檯，站在兩人之間。', tag: '原句', set: { emote: { p: null } }, act: [walk('o', 'mid', 36)] },
      // 兩顆都是接受：第 0 顆＝老闆帶的教學那場、第 1 顆＝直接打；沒有「轉身離開」。選完照 C.blocking.toDuel 走到唱盤
      { id: 'O21', who: '老闆', text: '「既然雙方都不服氣，不如來一場品味對決如何？」', tag: '原句', ui: 'duel',
        prompts: ['▶ 接受對決（看向老闆）', '▶ 接受對決（手伸進袋子，準備出招）'], promptSubs: ['', '跳過教學'] }   // promptSubs：按鈕下方的小字（店主 11-12：不接在括號後面）
    ],
    // 序章收尾（贏了男子；人物起點 p duelP、f duelE、o ref）：原版 TUT_EPILOGUE_BEATS 十一句
    //   E4 他真的走出門（走到門口門才晃），地上留一張盤（男子的 drop，Fishmans）→ 撿起面板（沒有旁白、沒有敘述標題）
    epilogueWin: [
      { id: 'E1', who: '', text: '對決結束。店裡安靜了幾秒。', tag: '原句', set: { hide: { r1: true } } },
      { id: 'E2', who: '男子', text: '「……哼。」他把自己的唱片塞回袋子裡，看都不看你一眼。', tag: '原句', act: [face('f', 'p')] },
      { id: 'E3', who: '男子', text: '「搵休督欸丟！」', tag: '原句' },
      { id: 'E4', who: '', text: '門上的鈴鐺又響了一聲。他走了。', tag: '原句',
        act: [{ do: 'floor', at: 'duelE' }, walk('f', 'door'), door('swing'), wait(200), walk('f', 'out'), hide('f', true)], ui: 'stake' },
      { id: 'E5', who: '老闆', text: '「年輕人。」老闆看著你，慢慢點了點頭。', tag: '原句', pre: [walk('o', 'visit'), face('o', 'p')] },
      { id: 'E6', who: '老闆', text: '「我看你對音樂脈絡，很有天份。」', tag: '原句' },
      { id: 'E7', who: '老闆', text: '「我這邊有一些被我淘汰的設備，你挑一個，帶回去吧。」', tag: '原句',
        act: [walk('o', 'dig1'), pose('o', 'dig', 1000)], ui: 'relic', prompt: '（老闆從長桌底下拖出一個木箱。）' },
      { id: 'E8', who: '老闆', text: '「年輕人，有空再來這邊走走，與大家交流音樂。」', tag: '原句', pre: [walk('o', 'visit'), face('o', 'p')] },
      { id: 'E9', who: '', text: '你正要道謝，門又開了。', tag: '原句', set: { sprite: { f: '@guest' }, put: { f: 'door' }, hide: { f: false }, sil: { f: false }, door: 'open' } },
      { id: 'E10', who: '？？？', text: '「聽說這裡有個新來的，品味不錯？」', tag: '原句', act: [walk('f', 'atdoor'), door('close')] },
      { id: 'E11', who: '', text: '無止盡的品味試煉，開始了。', tag: '原句', ui: 'map' }
    ],
    // 每輪第 5 位，傳說藏家推門（B2＝原版 BOSS_LINES[0]；出場蓋章＝BOSS_LINES[4]）
    bossEnter: [
      { id: 'B1', who: '', text: '這時，門開了。', tag: '原句', set: { sprite: { f: 'boss' }, put: { f: 'door' }, hide: { f: false }, sil: { f: false }, door: 'open' } },
      { id: 'B2', who: '傳說藏家', text: '「讓我看看你的品味有幾兩重。」', tag: '原句', set: { stamp: '三十年的耳朵，不會騙人。' },
        act: [walk('f', 'atdoor'), door('close')], ui: 'duel', prompt: '▶ 品味對決' }
    ],
    // 打倒傳說藏家（每一輪；原本打烊那段的送牌搬過來，主線裁定 5）：他用過的那張王牌（你當初沒選的）翻開、播放、收進唱片櫃；接著領獎、升級、下一輪
    bossDown: [
      { id: 'C1', who: '傳說藏家', text: '「……這張，送你。三十年前，我也是這樣拿到的。」', tag: '新:A', ui: 'stake', music: 'stake' }
    ],
    // 散場（倒下，這一趟結束）
    dead: [
      { id: 'D1', who: '老闆', text: '「……就到這裡吧。」', tag: '新', music: { stop: 1500 } }
    ],
    // 再挑戰一趟（≤10 秒）：門晃 → 挑王牌 → 走到特價箱挑三張（C.blocking.toSale）→ 來客
    again: [
      { id: 'A1', who: '老闆', text: '「……又是你。」', tag: '新', set: { put: { p: 'door', o: 'counter' }, hide: { f: true }, door: 'swing' },
        ui: 'acePick', prompt: '（挑一張。）' }
    ]
  };

  // ===================================================================
  // 台詞（舞台泡泡）。lines[誰][鍵]＝字串或字串陣列；lineTags 同形狀，記每句的來源標記。
  //   line 口頭禪（開場泡泡）、intro 進門那句、lose 你贏時（他說）、win 你輸時（他說）；v4 拿掉 switch（急了／翻面）與 man.jabBubble
  //   owner：retry 老闆說情（輸了重打同一位）、bagFull 包包滿 8 張、relicFull 配件滿 3 件
  // ===================================================================
  var RAW_LINES = {
    owner: {
      retry: L('……再一場。', '新'),                 // 序章男子輸了（免費、不用選）
      retryAsk: L('……要不要再一場？', '新'),         // 客人輸了：接著是「再一場（這一輪只有一次）／到這裡就好」兩顆（C.trial.ui.retryMenu；COPY-07：不要連說三次「再一場」）
      bagFull: L('包包滿了。先拿一張出來。', '新'),
      relicFull: L('配件最多帶三件。先放一件回去。', '新')
    },
    // 序章男子：只有原版的句子（D §2：試做版自己加的口頭禪、贏你那句拿掉；COPY-01）。lose＝E2／E3 原句（收尾對白講，盤面不再冒泡泡）
    man: {
      intro: L('……這品味，也敢出來丟臉？', '原句'),
      lose: [L('……哼。', '原句'), L('搵休督欸丟！', '原句')]
    },
    copycat: {
      line: L('你手上那幾張，我應該都有。', '新'),          // COPY-03：開打前就會說，不能是對你出的招的反應
      intro: L('欸你那張哪裡買的？', '新:C'),
      lose: [L('我回去也要買一張。', '新:A')],
      win: L('那張我有，兩張。', '新')
    },
    already: {
      line: L('你包包裡那些，社團都放過了。', '新'),        // COPY-03
      intro: L('這張？我高中就聽過了。', '新:D'),
      lose: [L('……這張我真的沒聽過。可以借我嗎？', '新:B')],
      win: L('黑膠版聽完了沒？還沒吧。', '新')        // COPY-17：少一句「回去…再來」
    },
    needle: {
      line: L('你手上那張，我盯很久了。', '新'),
      intro: L('你這張是幾版？', '新:D'),
      lose: [L('……我回去重新校正。', '新:D')],
      win: L('先把唱臂調平再來。', '新')
    },
    skip: {
      line: L('這張在我店裡放了十年，沒人問過。', '新'),
      intro: L('你手上那張，我收的時候才五十塊。', '新'),
      lose: [L('……下次這張，我要開高一點。', '新')],
      win: L('這張你出得太早了。', '新')                // COPY-17
    },
    broke: {
      line: L('這段吉他，我練了一整個暑假。', '新'),
      intro: L('剛從練團室出來，耳朵還在嗡嗡叫。', '新'),
      lose: [L('……回去再練一百遍。', '新')],
      win: L('週末來看我們的場，報我名字。', '新')
    },
    buyer: {
      line: L('這張你聽得完嗎？', '新'),
      intro: L('這張四十分鐘只有一個音。很好聽。', '新'),
      lose: [L('……原來你也聽到最後。', '新')],
      win: L('耳朵還沒打開，回去再磨。', '新')
    },
    label: {
      line: L('你以為我會出最大的？', '新'),
      intro: L('這張是我們廠牌的第一號。封套是我自己摺的。', '新'),   // R-04：原句含提示關鍵字「只壓了三百張」
      lose: [L('……下一批，算你一張。', '新:A')],
      win: L('旋律太多了，下次少一點。', '新')
    },
    critic: {
      line: L('你這手，我會寫進專欄。', '新'),              // COPY-06／R-04：不用提示關鍵字（名盤）
      intro: L('我寫過這張的樂評。', '新:A'),
      lose: [L('……這張，我重寫一篇。', '新')],
      win: L('這段樂史，你漏了一頁。', '新')            // COPY-17
    },
    boss: {
      line: L('……這張，我也有。', '新'),
      intro: L('讓我看看你的品味有幾兩重。', '原句'),          // BOSS_LINES[0]（roguelike.html:3555）去掉引號
      stampSub: L('三十年的耳朵，不會騙人。', '原句'),      // 出場蓋章的副標
      lose: [L('……這張，送你。三十年前，我也是這樣拿到的。', '新:A')],
      win: L('我的木箱裡，沒有一張爛盤。', '原句')
    }
  };
  C.lines = pick(RAW_LINES, 't');
  C.lineTags = pick(RAW_LINES, 'g');
  Object.keys(C.enemies).forEach(function (k) { if (C.lines[k] && C.lines[k].line) C.enemies[k].line = C.lines[k].line; });

  // ===================================================================
  // 提示句（§2.2.4）：他這手「計畫」出的屬性 → 一句動作或短句，帶一個可以學的關鍵字，**不寫屬性名**。
  //   hintKeywords＝D §5 的關鍵字族（tag 店主，只是參考清單，不是限制）；hints 每色 5 句：13 句＝D §5 草稿一字不差（tag 店主）、c1／c3 改過（tag 新，draft＝原文，LINES-REVIEW 另列）
  //   key 必填、必為 text 的子字串；揭曉後的結果句用它教「『key』是 X」（duelText.bluff／honest）
  //   startFight 把 hints 的 id 組成 hintTable 傳進 startDuel；duel 裡只存 id
  // ===================================================================
  C.hintKeywords = { c: ['名盤', '紀念版', '大家都聽過'], o: ['絕版', '自主發行', '沒人聽過'], h: ['噪音', '聽不懂', '實驗'] };
  C.hintKeywordsTag = '店主';
  C.hints = {
    c: [
      { id: 'c1', text: '「這張，大家都聽過吧？」', key: '大家都聽過', tag: '新', draft: '「這張，你總聽過吧？」' },   // draft＝D §5 店主草稿原文（改成含關鍵字「大家都聽過」；等店主決定，R-03／COPY-05）
      { id: 'c2', text: '他抽出一張週年紀念版。', key: '紀念版', tag: '店主' },
      { id: 'c3', text: '他哼起那段大家都會唱的副歌。', key: '大家都會唱', tag: '新', draft: '他哼起全場都會唱的那段副歌。' },
      { id: 'c4', text: '他翻到「百大名盤」那一頁。', key: '名盤', tag: '店主' },
      { id: 'c5', text: '他把那張名盤擦得發亮。', key: '名盤', tag: '店主' }
    ],
    o: [
      { id: 'o1', text: '他嘴角藏著「你沒聽過吧」的笑。', key: '沒聽過', tag: '店主' },
      { id: 'o2', text: '他從箱底挖出一張自主發行盤。', key: '自主發行', tag: '店主' },   // 店主 11-12（v5 教學）：白版 → 自主發行
      { id: 'o3', text: '「這張只壓了三百張。」', key: '只壓了三百張', tag: '店主' },
      { id: 'o4', text: '他翻著一本手寫的絕版清單。', key: '絕版', tag: '店主' },
      { id: 'o5', text: '「這張，網路上查不到。」', key: '查不到', tag: '店主' }
    ],
    h: [
      { id: 'h1', text: '他露出「越難懂越屌」的眼神。', key: '難懂', tag: '店主' },
      { id: 'h2', text: '他耳機漏出一陣刺耳的噪音。', key: '噪音', tag: '店主' },
      { id: 'h3', text: '「聽不懂？那就對了。」', key: '聽不懂', tag: '店主' },
      { id: 'h4', text: '封套上只有一片雜訊。', key: '雜訊', tag: '店主' },
      { id: 'h5', text: '他說，要聽就聽實驗的。', key: '實驗', tag: '店主' }
    ]
  };

  // ===================================================================
  // 一次性老闆小提示（每種一輩子只出一次，不擋點擊，5 秒；≤20 字）。鍵＝duel.js hooks.hint(id) 的 id。
  // ===================================================================
  C.coachTips = {
    tip_mirror: '同色比星數，多的扣差額。',
    tip_bluff: '嘴上說名盤，手上不一定是。',
    tip_block: '差 2 星以上，剋不動。',
    tip_ace: '王牌 7 星，一場用一次。',
    tip_rounds: '六手沒分勝負，比聲望條剩幾成。'
  };
  C.coachTipWhen = {
    tip_mirror: '第一次同色比星（含同色同星）', tip_bluff: '第一次被唬', tip_block: '第一次剋不動（你或他）',
    tip_ace: '第一次丟王牌', tip_rounds: '第一次打到第 6 手'
  };
  C.coachTipTags = {};
  Object.keys(C.coachTips).forEach(function (k) { C.coachTipTags[k] = '新'; });

  // ===================================================================
  // 對決盤面上的字（§2.2.7；A1 寫字、B1 組句。{x} 由 UI 代入）
  //   結果三行：l1 規則句（counter／countered／blockedYou／blockedHim／mirror／tie）、l2 扣多少（hitE／hitP）、
  //   l3 關鍵字那句（bluff／honest；key 為 null 時用 bluffNoKey／honestNoKey）
  //   {a}＝你出的屬性中文（王牌前面加「王牌」）、{b}／{e}＝他出的、{hint}＝提示屬性中文、{key}＝C.hints 的 key
  //   王牌沒有「不會被剋」了（FIXLIST 2）：王牌被 ≤5 星剋＝差 2 星以上剋不動，走 blockedYou／blockedHim；aceYou／aceHim 刪掉
  //   六手打完（FIXLIST 3）：roundsScore 的 {p}／{e}＝聲望條剩幾 %（over 事件的 pct＝engine.pctPair），{who}＝你／他；兩邊比例一樣（算你贏）用 roundsEven
  // ===================================================================
  C.duelText = {
    hintLabel: '提示', sleeve: '蓋著', rounds: '第 {n}／{max} 手', hp: '聲望', aceSlot: '王牌', aceWord: '王牌',
    he: '他・', you: '你・', slotE: '他丟的', slotP: '你丟的', lastPrefix: '上一手', pileLeft: '他還有 {n} 張',
    counter: '{a}剋{b}，命中！', countered: '{b}剋{a}，被剋了。',
    blockedYou: '{a}剋{b}，但他高你 2 星以上，剋不動。比星數，', blockedHim: '{b}剋{a}，但你高他 2 星以上，他剋不動。比星數，',
    mirror: '同樣是{a}，比星數，', tie: '一樣大，不扣。',
    hitE: '他 −{n}', hitP: '你 −{n}',
    bluff: '他唬你！『{key}』是{hint}，他出的是{e}。', honest: '『{key}』是{hint}，他照實出。',
    bluffNoKey: '他唬你！提示是{hint}，他出的是{e}。', honestNoKey: '提示是{hint}，他照實出。',
    koWin: '品味勝出', koWinSub: '你贏了【{name}】。', koLose: '聲望歸零',
    roundsOut: '六手打完，比聲望條', roundsScore: '你剩 {p}%，他剩 {e}%：{who}贏', roundsEven: '你剩 {p}%，他剩 {e}%：一樣，算你贏',
    tapOn: '點一下繼續'   // 唬你／剋不動的結果框停住時（店主 11-12：看不清楚被唬了什麼）
  };
  C.duelTextTag = '新';
  // 牌桌小抄（點相剋圖打開；店主 11-12）：[左欄, 右欄]，左欄寫全名；duel.js 只把屬性第一個字上色、第二個字黑、剋灰（店主 11-12）
  C.cheatSheet = [['冷門剋經典', '大家都聽過的不稀奇'], ['經典剋硬蕊', '再難入耳也比不過名盤'], ['硬蕊剋冷門', '再冷門，碰上真硬的也得低頭'], ['差 2 星以上', '剋不動，比星數']];
  C.cheatSheetTag = '新';

  // ===================================================================
  // 規則卡（§2.2.8；「?」小抄與標題畫面共用）。lines＝D §5 規則卡六行，第 6 行照 FIXLIST 2／3 改（tag 店主；畫面上的編號由 UI 加）
  //   foot 的 {normal}／{elite}／{boss}：由 UI 代入 hpText（同一級聲望都一樣寫單一數字，不一樣寫「最小–最大」）
  // ===================================================================
  C.rules = {
    title: '品味對決・規則',
    lines: [
      '每張專輯有經典／冷門／硬蕊三個星數。',
      '每一手，你和他各暗中挑一張專輯、一個屬性，同時亮出。',
      '冷門剋經典、經典剋硬蕊、硬蕊剋冷門：剋中，就用你那個屬性的星數扣他聲望。',   // 店主 11-12：屬性寫全名（畫面上第一個字照屬性色、第二個字黑、剋灰，ui.js rulesHTML）
      '被剋的一方高 2 星以上，剋不動，改成比星數。',
      '沒有相剋就比星數，高的扣差額；一樣大不扣。',
      '提示會暗示他這手的打算，但有些人會唬你。王牌 7 星，一場用一次。六手內沒分出勝負，比誰的聲望條剩得多。'
    ],
    why: '為什麼這樣剋：冷門笑經典太大眾，經典壓得住難懂的硬蕊，硬蕊拆穿只是沒人聽過的冷門。',   // 六行下面另起一段（店主 11-12；六行一字不動）
    relics: '發燒配件：自動生效，最多帶三件。',
    foot: ['點專輯再點屬性出牌；按住封面看唱片資訊。', '你 12 聲望，打贏回 3；客人 {normal}、傳說藏家 {boss}。']
  };
  C.rulesTag = '新';          // title／relics／foot
  C.rulesLinesTag = '店主';   // lines（六行）
  // hpText：無限試煉的客人聲望（C.trial.guestHp；頁尾 {normal}／{elite}／{boss}）
  C.rules.hpText = { normal: String(C.trial.guestHp.normal), elite: String(C.trial.guestHp.elite), boss: String(C.trial.guestHp.boss) };

  // ===================================================================
  // 序章男子那場的教學（§2.2.10）。A1 寫規則資料：hp／plays／hints／lessons／script／expect；B2（第二波）寫 steps／learned／ui。
  //   他六手照 plays 出（全部都在男子的牌單裡）、提示照 hints（只用帶 D 族詞的句子），課表：比星數 → 冷剋經 → 經剋硬 → 硬剋冷 → 差 2 星剋不動 → 王牌。
  //   你（FIXLIST 11：手牌 5 張；男子的暗手照舊 3 張）：script.hand＝老闆四張、照出牌順序排（第 1–4 手各出一張，第 k 手出第 k 格），draw 空；
  //     起手第 5 張＝特價箱挑的第 1 張（有 script 不洗牌：包包照挑的順序接在四張後面）。每手出掉的那格補牌：第 1 手後補特價箱第 2 張（第 1 格）、
  //     第 2 手後補第 3 張（第 2 格）、之後牌堆空了把丟過的禮物洗回來補第 3、4 格。所以：
  //     - 第 1–4 手要教的那張都還在手上（第 k 格到第 k 手才出、才被換掉）；
  //     - 第 5 手手牌＝[特價箱第 2 張, 第 3 張, 洗回的禮物, 洗回的禮物, 特價箱第 1 張]：engine.blockedChoice 找最左那張＝特價箱的（冷門 ≤3，對他的經典 5 剋不動）；
  //     - 第 6 手王牌 KO。挑哪三張、洗回哪兩張都一樣（tutorial.test：三王牌 × 84 種 × 四種點法）。
  //   pick：每手手指指哪張、用哪個屬性（{id, attr}｜'blocked:o'＝engine.blockedChoice(duel,'o')｜'ace'）
  //   expect：每手結果（第 5 手 toP＝5−那張的冷門星，只寫 kind 與 blocked）。前四手他扣 16／14／16 < 18 ≤ 加上第 6 手
  // ===================================================================
  var TUT_PLAYS = [
    { id: 'coldplay-mylo-xyloto', attr: 'c' }, { id: 'imagine-dragons-night-visions', attr: 'c' }, { id: 'limp-bizkit-results-may-vary', attr: 'h' },
    { id: '老王樂隊-暮夜徐行', attr: 'o' }, { id: 'eminem-the-eminem-show', attr: 'c' }, { id: 'katy-perry-prism', attr: 'c' }
  ];
  var TUT_HINTS = ['c5', 'c2', 'h2', 'o2', 'c4', 'c2'];
  var TUT_HANDS = {
    hall: {
      hand: ['david-bowie-low', 'beverly-glenn-copeland-keyboard-fantasies', 'vashti-bunyan-just-another-diamond-day', 'scott-walker-tilt'], draw: [],
      pick: [{ id: 'david-bowie-low', attr: 'c' }, { id: 'beverly-glenn-copeland-keyboard-fantasies', attr: 'o' }, { id: 'vashti-bunyan-just-another-diamond-day', attr: 'c' },
        { id: 'scott-walker-tilt', attr: 'h' }, 'blocked:o', 'ace']
    },
    pearl: {
      hand: ['bark-psychosis-hex', '黃小楨-賞味期限', 'charles-brackeen-rhythm-x', '傷心欲絕-我愛您'], draw: [],
      pick: [{ id: 'bark-psychosis-hex', attr: 'c' }, { id: '黃小楨-賞味期限', attr: 'o' }, { id: 'charles-brackeen-rhythm-x', attr: 'c' },
        { id: '傷心欲絕-我愛您', attr: 'h' }, 'blocked:o', 'ace']
    },
    heresy: {
      hand: ['the-velvet-underground-white-light-white-heat', 'magma-mekanik-destruktiw-kommandoh', 'pharoah-sanders-tauhid', 'melt-banana-speak-squeak-creak'], draw: [],
      pick: [{ id: 'the-velvet-underground-white-light-white-heat', attr: 'c' }, { id: 'magma-mekanik-destruktiw-kommandoh', attr: 'o' }, { id: 'pharoah-sanders-tauhid', attr: 'c' },
        { id: 'melt-banana-speak-squeak-creak', attr: 'h' }, 'blocked:o', 'ace']
    }
  };
  var GAP5 = { kind: 'mirrorLose', blocked: 'gap' };
  C.tutorial = {
    hp: 18,
    plays: TUT_PLAYS,
    hints: TUT_HINTS,
    lessons: ['mirror', 'oc', 'ch', 'ho', 'block', 'ace'],
    script: {},
    expect: {
      hall: [{ kind: 'mirrorWin', toE: 3, toP: 0 }, { kind: 'counter', toE: 4, toP: 0 }, { kind: 'counter', toE: 5, toP: 0 },
        { kind: 'counter', toE: 4, toP: 0 }, GAP5, { kind: 'mirrorWin', toE: 5, toP: 0 }],
      pearl: [{ kind: 'mirrorWin', toE: 3, toP: 0 }, { kind: 'counter', toE: 4, toP: 0 }, { kind: 'counter', toE: 4, toP: 0 },
        { kind: 'counter', toE: 3, toP: 0 }, GAP5, { kind: 'counter', toE: 7, toP: 0 }],
      heresy: [{ kind: 'mirrorWin', toE: 3, toP: 0 }, { kind: 'counter', toE: 4, toP: 0 }, { kind: 'counter', toE: 4, toP: 0 },
        { kind: 'counter', toE: 5, toP: 0 }, GAP5, { kind: 'mirrorWin', toE: 5, toP: 0, blocked: 'gap' }]
    },
    // ---- 以下 steps／learned／ui 由 B2 寫（§2.5.5）：六手各教一件事；FIXLIST 11（H2）改成「點那張 → 點那個屬性（＝丟）」 ----
    //   'card:pick'＝這一手 script[tier].pick 那張的封面、'pick'＝那張那個屬性的屬性鈕（tutorial.js stepsFor 代入：{id,attr}→card:id:<id>／chip:id:<id>:<attr>、
    //   'blocked:o'→card:／chip:blocked:o、'ace'→card-ace／chip-ace）。allow.pick：點那張那步＝只放行那張；點屬性那步（allow.throw）＝只放行那一顆。
    //   點那張那步（v5 手風琴）：手牌疊著，洞與手指指那張露出來的那一條；點了就在那張打開，下一步指屬性鈕。
    //   每手：（說明）→ 點那張 → 點那個屬性（丟出去）→（結算浮框出現時講，target 含 result）。learn＝這步做完就學到哪張小卡。
    //   第 1 手前一句說明提示；第 1 手結算後老闆點破關鍵字一次（提示 c5「他把那張名盤擦得發亮。」→「名盤」＝經典；規劃書，不是 D，列 §5.7）。
    steps: [
      { id: 'm1', kind: 'say', target: ['e-hint'], text: '上面這句是提示，暗示他這手要出什麼。', bubble: 'below', tag: '新' },
      { id: 'm2', kind: 'do', target: ['card:pick'], point: 'card:pick', allow: { pick: true }, text: '先出這張：點一下。', bubble: 'above', tag: '新' },
      { id: 'm3', kind: 'do', target: ['pick'], point: 'pick', look: ['card:pick'], allow: { pick: true, throw: true }, text: '他炫名盤，你也拿名盤：比星數。', bubble: 'above', tag: '新' },
      { id: 'm4', kind: 'say', target: ['result'], text: '同色比星數，多的扣差額。', learn: 'L1', tag: '新' },
      { id: 'm5', kind: 'say', target: ['result'], text: '『名盤』就是經典。提示裡會藏這種字。', tag: '新' },
      // v5（店主 11-12）：第 2–5 手「讀提示（說明）→ 講道理（點牌）→ 出牌（點屬性）→ 結算再講一次」
      { id: 'k0', kind: 'say', target: ['e-hint'], text: '『紀念版』：他要拿大家都聽過的壓你。', bubble: 'below', tag: '新' },
      { id: 'k1', kind: 'do', target: ['card:pick'], point: 'card:pick', allow: { pick: true }, tri: ['oc'], text: '大家都聽過的，不稀奇。出這張。', bubble: 'above', tag: '新' },
      { id: 'k2', kind: 'do', target: ['pick'], point: 'pick', look: ['card:pick'], allow: { pick: true, throw: true }, tri: ['oc'], text: '出冷門。', bubble: 'above', tag: '新' },
      { id: 'k3', kind: 'say', target: ['result'], text: '剋中！冷門剋經典，用你那顆星扣他。', learn: 'L2', tag: '新' },
      { id: 'c0', kind: 'say', target: ['e-hint'], text: '『噪音』：他要拿難懂的嚇你。', bubble: 'below', tag: '新' },
      { id: 'c1', kind: 'do', target: ['card:pick'], point: 'card:pick', allow: { pick: true }, tri: ['ch'], text: '再難入耳，也比不過名盤。出這張。', bubble: 'above', tag: '新' },
      { id: 'c2', kind: 'do', target: ['pick'], point: 'pick', look: ['card:pick'], allow: { pick: true, throw: true }, tri: ['ch'], text: '出經典。', bubble: 'above', tag: '新' },
      { id: 'c3', kind: 'say', target: ['result'], text: '經典剋硬蕊：名盤是時間淬煉過的。', learn: 'L3', tag: '新' },
      { id: 'h0', kind: 'say', target: ['e-hint'], text: '『自主發行』：他要拿沒人聽過的唬你。', bubble: 'below', tag: '新' },
      { id: 'h1', kind: 'do', target: ['card:pick'], point: 'card:pick', allow: { pick: true }, tri: ['ho'], text: '沒人聽過，不代表厲害。出這張。', bubble: 'above', tag: '新' },
      { id: 'h2', kind: 'do', target: ['pick'], point: 'pick', look: ['card:pick'], allow: { pick: true, throw: true }, tri: ['ho'], text: '出硬蕊。', bubble: 'above', tag: '新' },
      { id: 'h3', kind: 'say', target: ['result'], text: '硬蕊剋冷門：稀有，不等於有料。', learn: 'L4', tag: '新' },
      // 指相剋圖（結算時講：target 含 result，洞連相剋圖一起框、三條箭頭都亮）
      { id: 'h4', kind: 'say', target: ['result', 'tri'], tri: ['oc', 'ch', 'ho'], text: '他炫哪一種，你就拿剋它的那種回。', tag: '新' },
      { id: 'b0', kind: 'say', target: ['e-hint'], text: '這次是真正的大名盤。', bubble: 'below', tag: '新' },
      { id: 'b1', kind: 'do', target: ['card:pick'], point: 'card:pick', allow: { pick: true }, tri: ['oc'], text: '拿特價箱這張冷門，戳戳看。', bubble: 'above', tag: '新' },
      { id: 'b2', kind: 'do', target: ['pick'], point: 'pick', look: ['card:pick'], allow: { pick: true, throw: true }, tri: ['oc'], text: '出冷門。', bubble: 'above', tag: '新' },
      { id: 'b3', kind: 'say', target: ['result'], text: '差太多了：他高你 2 星以上，戳不動。', learn: 'L5', tag: '新' },
      { id: 'b4', kind: 'say', target: ['result'], text: '剋不動，就改比星數。', tag: '新' },
      { id: 'a1', kind: 'do', target: ['card:pick'], point: 'card:pick', allow: { pick: true }, text: '最後一手。丟王牌：7 星，一場用一次。', bubble: 'above', tag: '新' },
      { id: 'a2', kind: 'do', target: ['pick'], point: 'pick', look: ['card:pick'], allow: { pick: true, throw: true }, text: '丟！', bubble: 'above', tag: '新' },
      { id: 'a3', kind: 'say', target: ['result'], learn: 'L6', tag: '新',
        text: { hall: '同色比星數，7 比 2，他 −5。', pearl: '冷門剋經典，王牌 7 星，他 −7。', heresy: '經典剋硬蕊，但你高 2 星以上，剋不動：他 −5。' } }   // a3.heresy：COPY-04 照結果句的講法、寫出扣多少（tutorial.test 對 toE）
    ],
    learned: { L1: '同色比星數', L2: '冷門剋經典：大家都聽過的不稀奇', L3: '經典剋硬蕊：比不過名盤', L4: '硬蕊剋冷門：稀有不等於有料', L5: '差 2 星以上：剋不動', L6: '王牌 7 星，一場用一次' },
    // 唱盤前（只在「看向老闆」那條路；三人站定後、遇敵前）：老闆攤開猜歌那三張（三軸各 7 星），一句亮一條箭頭（店主 11-12，v5 教學 A 案）
    //   lit：'all'＝三張各亮自己那一色；tri：亮哪幾條箭頭（'oc' 冷→經、'ch' 經→硬、'ho' 硬→冷）；三張的小字＝C.aceGloss
    intro: {
      who: '老闆',
      lines: [
        { id: 'T1', text: '「這三張，各據一座山頭。」', lit: 'all' },
        { id: 'T2', text: '「其實每張唱片三種都有，只是有高有低。」', lit: 'all' },
        { id: 'T3', text: '「大家都聽過的，碰上沒人聽過的，就不稀奇了。」', tri: ['oc'] },
        { id: 'T4', text: '「再難入耳，也比不過時間淬煉的名盤。」', tri: ['ch'] },
        { id: 'T5', text: '「再冷門，碰上真正硬的也得甘拜下風。」', tri: ['ho'] },
        { id: 'T6', text: '「他炫哪一種，你就拿剋它的那種回他。」', tri: ['oc', 'ch', 'ho'], lit: 'all' }
      ]
    },
    introTag: '新',
    ui: { who: '老闆', learnedPrefix: '學會了：', wrong: '先點我指的這裡。', skipTut: '跳過教學', replay: '重看教學', learnedTitle: '學會的規則' },
    uiTag: '新'
  };
  ['hall', 'pearl', 'heresy'].forEach(function (t) {
    var H = TUT_HANDS[t];
    C.tutorial.script[t] = {
      plays: TUT_PLAYS.map(function (p) { return { id: p.id, attr: p.attr }; }), hints: TUT_HINTS.slice(),
      hand: H.hand.slice(), draw: H.draw.slice(),
      pick: H.pick.map(function (p) { return typeof p === 'string' ? p : { id: p.id, attr: p.attr }; })
    };
  });

  // ===================================================================
  // 店裡熱點的一句話、來客、台北地圖預告（ui.js 讀這些鍵，沒有的鍵就不出那句）。來源標記在 shopLineTags（同形狀）。
  // ===================================================================
  var RAW_SHOP = {
    cat: L('……喵。', '新'),
    poster: L('冷門剋經典，經典剋硬蕊，硬蕊剋冷門。', '新'),   // 公告：點了開規則卡
    locked: L('這間還沒開。', '新'),
    binBusy: L('打完再翻。', '店主'),                           // 序章／對決中點箱子（D §6）
    ownerHint: {
      title: L('外面雨大，進來坐。', '新'),
      scene: L('慢慢看，不趕你。', '新'),
      night: L('客人一個一個來。', '新'),
      duel: L('先看提示那句。', '新'),
      reward: L('收好，別折到封套。', '新')
    },
    nightIntro: [L('客人一個一個來，打到輸為止。', '新'), L('客人跟剛才那位不一樣，有時會唬你。', '新'), L('贏了有錢，兩位客人之間可以去箱子買唱片。', '新')],
    bin: L('點封面看唱片資訊、試聽。', '新'),
    booth: L('挑一張你唱片櫃裡的，放來聽聽。', '新'),
    boothEmpty: L('唱片櫃還空著。贏一場再來聽。', '新'),
    titleHint: L('點店裡的東西看看：牆上的唱片、箱子、試聽機', '新'),
    taipeiHere: L('你在這', '新'),
    taipeiNote: L('其他店還沒開。之後一家一家開，每家的箱子、客人、老闆都不一樣。', '新'),
    taipeiLink: L('出門看看（台北地圖・預告）', '新'),
    backToShop: L('回店裡', '新')
  };
  C.shopLines = pick(RAW_SHOP, 't');
  C.shopLineTags = pick(RAW_SHOP, 'g');
  C.shopLineWho = { cat: '店貓', poster: '老闆', locked: '（畫面字）', binBusy: '老闆', ownerHint: '老闆', nightIntro: '老闆', bin: '老闆', booth: '老闆', boothEmpty: '老闆',
    titleHint: '（畫面字）', taipeiHere: '（畫面字）', taipeiNote: '（畫面字）', taipeiLink: '（畫面字）', backToShop: '（畫面字）' };

  // 經濟介面的字（B3 用；{x} 由 UI 代入；${n} 的 $ 是錢的符號，{n} 一律代入千分位字串 engine.moneyText(n)：$1,200）
  C.shopUi = {
    money: '${n}',
    binTitle: '{label}',
    buy: '買 ${n}',
    noMoney: '錢不夠',
    bagFull: '包包滿了：先賣一張，半價 ${n}',
    sellPick: '賣這張',
    sellPickN: '賣這 {k} 張',        // 要賣兩張以上（特價箱一次買三張、包包放不下；RT-10）
    giftTag: '老闆送的',             // 先賣子面板：老闆送的（王牌那組四張；engine.isGift）不能賣，標這三個字、不能選（FIXLIST 11 追加）
    bought: '《{album}》進包包，−${n}',
    sold: '《{album}》賣掉，+${n}',
    relicTitle: '櫃檯的配件',
    relicFull: '配件最多三件：先賣一件，半價 ${n}',
    relicBought: '拿到「{name}」，−${n}',
    bargainTitle: '特價區',
    bargainPrompt: '（挑三張。）',
    bargainTake: '收下這三張',
    bargainBuy: '買下 ${n}',                                      // {n}＝挑的那幾張特價加起來（engine.bargainPriceOf；每張 $100／200／300）
    bargainEach: '${n}',                                          // 特價箱每張封面下的價（engine.bargainPriceOf）
    bargainEmpty: '特價區賣完了，下一輪再補。',
    close: '關閉',
    earned: '+${n}',
    // B3 econ.js 用到的字（notes-B3 請求 7；econ.js 有同字後備）
    bag: '包包 {n}/{max}',
    binEmpty: '這一箱賣完了，下一輪再補。',
    owned: '包包裡有了',
    bagFullN: '包包放不下：先賣 {k} 張，半價 ${n}',
    moneyShort: '錢不夠：先賣一張，半價 ${n}',
    sellFirst: '先賣一張',
    relicSell: '賣這件',
    relicSold: '「{name}」賣掉，+${n}',
    relicEmpty: '櫃檯的配件賣完了，下一輪再補。',
    relicMoneyShort: '錢不夠：先賣一件，半價 ${n}',
    relicSellFirst: '先賣一件',
    bargainHint: '挑一到三張',                                     // 特價箱（之後買）還沒挑時的鈕
    bargainFree: '這次免費',                                       // 序章／開局挑三張：每張的特價劃掉
    prev: '上一張',
    next: '下一張',
    infoAria: '唱片資訊、試聽'
  };
  C.shopUiTag = '新';

  // 結算（這一趟結束）：「走到第 23 位・最多連贏 12 位・收了 9 張」（店主 11-12）；標題畫面的紀錄「最遠：第 23 位」
  C.summary = { title: '試煉結束', reached: '走到第 {n} 位', streak: '最多連贏 {n} 位', taken: '收了 {n} 張', wins: '贏了 {n} 位', none: '這一趟沒收唱片',
    best: '最遠：第 {n} 位', newRecord: '新紀錄', checkpoints: '中繼點：第 {list} 位', again: '再挑戰一趟' };
  C.summaryTag = '新';

  // ===================================================================
  // 新玩家沒有 DipChar 時的名字與造型（roguelike.html RANDOM_NAMES 去掉敵人用掉的 8 個）
  // ===================================================================
  C.names = [
    '慢轉33', '七吋魂', '內圈溝', 'B面控', '除塵刷', '靜電剋星', '唱針殺手', '原盤至上',
    '買了沒拆', '又敗一張', '整箱扛回家', '折扣區之王', '特價箱撿寶', '二手店幽靈', '跳蚤市場王', '唱片行釘子戶',
    '初回限定', '限量編號', '再版也買', '雙碟主義', '封套派',
    '只聽前奏', '副歌之前', '試聽三分鐘', '一次聽完', 'A面就睡', '邊聽邊睡', '聽過但忘了', '沒聽過欸',
    '金耳朵', '木耳朵', '地下鼴鼠', '排行榜絕緣', '低頻怪', '音場派', '退燒中', '燒不完'
  ];
  // dip-character.js avatarRows() 的零件：head∈AVATAR_HEADS、hair／shirt／pants／skin∈AVATAR_COLORS
  C.avatarsFallback = [
    { head: 'neat',   hair: 'k', shirt: 'b', pants: 'k', skin: 's' },
    { head: 'bob',    hair: 'd', shirt: 'y', pants: 'b', skin: 'v' },
    { head: 'spike',  hair: 'o', shirt: 'n', pants: 'k', skin: 't' },
    { head: 'long',   hair: 'k', shirt: 'p', pants: 'd', skin: 's' },
    { head: 'beanie', hair: 'c', shirt: 'w', pants: 'n', skin: 'u' },
    { head: 'phones', hair: 'm', shirt: 'k', pants: 'e', skin: 'v' }
  ];

  return C;
});
