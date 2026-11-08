/* content.js：品味對決 v4 的純資料（SPEC-v4 §2.2、§4；第一波 A1）。
 *
 * 瀏覽器：讀 window.DipLabCards（cards.js 先載入）與 window.DipLabBins（bins.js，可沒有），輸出 window.DipLabContent。
 * Node：require('./cards.js')、try require('./bins.js')，module.exports = 同一份物件。
 * 只有資料，沒有邏輯；engine.js 只讀不改。
 *
 * v4：三相剋＋門檻 N=2（被剋方高 2 星以上剋不動，改比星）、對手暗選（提示＋誠實度，會唬人）、王牌 7 星不會被剋、六手上限；
 *     拿掉脾氣、急了、翻面、B 面。經濟：贏了拿錢、箱子買唱片、櫃檯買配件、特價箱；錢與買的唱片打烊歸零，配件照 v3 帶到下一晚。
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
  // 誠實度（D §5；名牌上的那個詞，tag 店主）與出招難度（原版 aiPlan 的係數，roguelike.html:3650-3660，拿掉相生與氣勢）
  // ===================================================================
  C.honesty = {
    honest:    { zh: '老實', q: 1 },
    sometimes: { zh: '偶爾唬人', q: 0.8 },
    often:     { zh: '愛唬人', q: 0.7 },
    veteran:   { zh: '老江湖', q: 0.6 }
  };
  C.honestyTag = '店主';
  C.planners = {
    easy:   { w: 0.45, nz: 2.4, mercy: false },   // 原版 easy：星×0.45＋U(0,2.4)，不鈍化
    normal: { w: 0.6,  nz: 1.4, mercy: true },    // 原版 normal：星×0.6＋U(0,1.4)
    hard:   { w: 0.7,  nz: 0.8, mercy: true }     // 原版 hard：星×0.7＋U(0,0.8)
  };
  // 原版 enemyForDepth：d<3 easy、d<5 normal、其餘 hard（roguelike.html:3480），index＝run.idx（今晚第幾位客人，0 起）；序章男子固定 easy
  C.plannerByDepth = ['easy', 'easy', 'normal', 'normal', 'hard'];

  // ===================================================================
  // 發燒配件（9 件；全部被動、自動生效、最多帶 3 件；照 v3 帶到下一晚）
  //   desc＝說明（點圖示時看）；note＝生效那手結果行補的一句（engine 的 clash.notes[].text）；price＝櫃檯價（序章／獎勵拿到的只用來算賣回）
  //   三件加成 1200 → 1000（sim 校準，S6；仍 > 5 星唱片 $800）
  //   boost＝出那色時 +1 星（engine outcome；王牌不加）；v4:false＝v4 哪裡都拿不到（engine newRun 濾掉）
  //   icon＝ui.js LAB_ICONS（roguelike.html PIX_ICONS_LV）的鍵；heavy180／numbered／matrix 由 B2 加進 LAB_ICONS
  //   序章收尾三選一：防塵套／黑膠唱針／洗碟水；菁英、藏家打贏：他丟過的唱片挑一張，或改拿 rewards.relicPool 裡的一件；櫃檯只賣三件加成
  // ===================================================================
  C.relics = {
    dustcover: { id: 'dustcover', name: '防塵套',     icon: 'dustcover', desc: '每場第一次被剋少扣 1。', note: '防塵套：少扣 1',      price: 900,  tag: '新' },
    stylus:    { id: 'stylus',    name: '黑膠唱針',   icon: 'stylus',    desc: '硬蕊剋中多扣 1。',       note: '黑膠唱針：多扣 1',    price: 1000, tag: '新' },
    cleaner:   { id: 'cleaner',   name: '洗碟水',     icon: 'cleaner',   desc: '同色同星時你扣他 1。',   note: '洗碟水：他 −1',       price: 900,  tag: '新' },
    obi:       { id: 'obi',       name: '原版側標',   icon: 'obi',       desc: '經典剋中多扣 1。',       note: '原版側標：多扣 1',    price: 1000, tag: '新' },
    testpress: { id: 'testpress', name: '神秘見本盤', icon: 'testpress', desc: '冷門剋中多扣 1。',       note: '神秘見本盤：多扣 1',  price: 1000, tag: '新' },
    // 〔補〕⚠規則：v3 效果靠名牌脾氣，v4 已無脾氣；新效果（第一手他不唬人）等店主決定，預設哪裡都拿不到（SPEC-v4 §2.2.6、§5.7 #7）
    headphone: { id: 'headphone', name: '監聽耳機',   icon: 'headphone', desc: '每場第一手他不唬人。',   note: '監聽耳機：他照實出',  price: 1000, v4: false, tag: '新' },
    boost_c:   { id: 'boost_c',   name: '180g 重量盤', icon: 'heavy180', desc: '經典出招時 +1 星。',     note: '重量盤：+1 星',       price: 1000, boost: 'c', tag: '新' },
    boost_o:   { id: 'boost_o',   name: '絕版編號標', icon: 'numbered',  desc: '冷門出招時 +1 星。',     note: '絕版編號標：+1 星',   price: 1000, boost: 'o', tag: '新' },
    boost_h:   { id: 'boost_h',   name: '內圈刻字',   icon: 'matrix',    desc: '硬蕊出招時 +1 星。',     note: '內圈刻字：+1 星',     price: 1000, boost: 'h', tag: '新' }
  };
  C.relicMax = 3;
  C.rewards = {
    prologueRelics: ['dustcover', 'stylus', 'cleaner'],
    relicPool: ['obi', 'testpress', 'stylus', 'dustcover', 'cleaner']
  };
  C.relicShop = { pool: ['boost_c', 'boost_o', 'boost_h'] };     // 櫃檯只賣三件屬性加成（D §6）

  // ===================================================================
  // 經濟（§2.2.5；一晚內有效，打烊歸零）。sim.mjs --n 3000 校準後的值（只動 SPEC-v4 §2.2.5 的旋鈕表；D §6 的獎金與唱片價維持起始值）
  // ===================================================================
  C.economy = {
    start: 300,                                                 // 〔補〕開局的錢（校準：0 → 300，讓「會買的」在第 3 位客人前買得起加成配件，S6）
    win:   { prologue: 0, normal: 300, elite: 500, boss: 0 },   // normal／elite＝D §6 起始值；prologue／boss＝〔補〕
    price: { 1: 100, 2: 100, 3: 200, 4: 400, 5: 800 },          // 價格看最高星；3–5★＝D §6 起始值；1、2★＝〔補〕
    sellRate: 0.5,                                              // 半價賣回
    bargainPrice: 100,                                          // 特價箱 $100、最多三張
    stock: [4, 6], relicStock: [2, 3]                           // 每箱 4–6 張、櫃檯 2–3 件
  };
  // 店裡的箱子（bins.js，由 tools/bake-cards.mjs 產生；沒有 bins.js 時是空的）。引擎只從非 display 區上貨；區名在 shops/dip.json
  C.bins = {};
  (function () {
    var B = (BINS && BINS.shops && BINS.shops.dip) || {};
    Object.keys(B).forEach(function (k) {
      var b = B[k], o = {};
      for (var x in b) o[x] = b[x];
      C.bins[k] = o;
    });
  })();

  // ===================================================================
  // 今晚來客（一般 6 抽 3、菁英 2 抽 1、藏家最後；日期種子；每晚一次老闆說情）
  // ===================================================================
  C.night = { prologueTime: '21:30', times: ['22:00', '22:40', '23:20', '00:10', '02:00'], normals: 3, retry: 1, label: '今晚來客', closing: '打烊' };
  C.nightTag = '新';

  // ===================================================================
  // 客人（10 位；SPEC-v4 §2.2.3、§4.1。聲望＝sim.mjs --n 3000 校準後的值（範圍 12–20；男子固定 10、教學 18），過程見 dev/notes-A1.md）
  //   honesty：C.honesty 的鍵（男子老實、一般客人偶爾唬人、菁英愛唬人、藏家老江湖）；出招難度跟著場次走（C.plannerByDepth），客人沒有自己的 planner
  //   taste：三軸並列時的順序（只當並列順序）；deck：7 張真唱片（藏家 6 張＋你沒選的那張王牌，由 engine 加；男子 6 張）
  //   line：口頭禪（開場泡泡，= lines[id].line）；drop：序章男子打輸掉出來的那張
  // ===================================================================
  C.enemies = {
    man: {
      id: 'man', name: '男子', title: null, spr: 'e0', avatar: null,
      honesty: 'honest', hp: 10, taste: 'coh',
      deck: ['coldplay-mylo-xyloto', 'imagine-dragons-night-visions', 'limp-bizkit-results-may-vary', '老王樂隊-暮夜徐行',
        'eminem-the-eminem-show', 'katy-perry-prism'],
      drop: 'fishmans-long-season', prologue: true, voice: { freq: 659, wave: 'square' }
    },
    copycat: {
      id: 'copycat', name: '那張我有', title: '文青同好', spr: 'e1', avatar: null,
      honesty: 'sometimes', hp: 18, taste: 'och',
      deck: ['beach-house-teen-dream', 'weyes-blood-titanic-rising', 'mitski-be-the-cowboy', 'billie-eilish-when-we-all-fall-asleep-where-do-we-go',
        'low-double-negative', 'sophie-oil-of-every-pearl-s-un-insides', '大象體操-elephant-gym-角度'],
      voice: { freq: 523, wave: 'square' }
    },
    already: {
      id: 'already', name: '我早就聽過', title: '社團學長', spr: 'e2', avatar: null,
      honesty: 'sometimes', hp: 17, taste: 'hco',
      deck: ['don-slepian-sea-of-bliss', 'harold-budd-abandoned-cities', 'demetrio-stratos-metrodora',
        'etron-fou-leloublan-les-trois-fou-s-perdegagnent-au-pays-des', 'nocturnal-emissions-fruiting-body', 'eivind-aarset-electronique-noire',
        'yezda-urfa-boris'],
      voice: { freq: 440, wave: 'square' }
    },
    needle: {
      id: 'needle', name: '針壓強迫症', title: '品味行家', spr: 'e6', avatar: null,
      honesty: 'sometimes', hp: 19, taste: 'coh',
      deck: ['steely-dan-gaucho', 'art-pepper-art-pepper-meets-the-rhythm-section', 'bill-evans-waltz-for-debby', 'kenny-burrell-midnight-blue',
        'roscoe-mitchell-sextet-sound', 'john-zorn-cobra', 'andrew-cyrille-what-about'],
      voice: { freq: 587, wave: 'triangle' }
    },
    skip: {
      id: 'skip', name: '跳針王', title: '二手店老闆', spr: 'e4', avatar: null,
      honesty: 'sometimes', hp: 17, taste: 'coh',
      deck: ['roberto-goyeneche-cantor-de-mi-barrio', 'amalia-rodrigues-gostava-de-ser-quem-era', 'king-sunny-ade-aura',
        'washington-phillips-the-key-to-the-kingdom', 'otha-turner-the-rising-star-fife-drum-band-everybody-holleri',
        'tony-scott-the-indonesian-all-stars-djanger-bali', 'barney-wilen-moshi'],
      voice: { freq: 330, wave: 'square', jitter: 20 }
    },
    broke: {
      id: 'broke', name: '月底吃土', title: null, spr: null,
      avatar: { head: 'cap', hair: 'u', shirt: 'r', pants: 'd', skin: 's' },
      honesty: 'sometimes', hp: 20, taste: 'och',
      deck: ['血肉果汁機-flesh-juicer-golden太子bro', '血肉果汁機-flesh-juicer-深海童話', '閃靈-失竊千年',
        '血肉果汁機-flesh-juicer-血肉宮建宮蓋廟演唱會', '閃靈-永劫輪迴', '閃靈-醒靈寺大決戰', '林強-驚蟄'],
      voice: { freq: 494, wave: 'square' }
    },
    buyer: {
      id: 'buyer', name: '剁手黨', title: null, spr: null,
      avatar: { head: 'fedora', hair: 'k', shirt: 'g', pants: 'k', skin: 't' },
      honesty: 'sometimes', hp: 20, taste: 'coh',
      deck: ['swans-soundtracks-for-the-blind', 'venetian-snares-making-orange-things', 'nurse-with-wound-homotopy-to-marie',
        'ryoji-ikeda-mort-aux-vaches', 'sunn-o-white1', 'sigur-ros-von', 'william-basinski-the-disintegration-loops'],
      voice: { freq: 554, wave: 'square' }
    },
    label: {
      id: 'label', name: '冷門仙人', title: '地下廠牌主理人', spr: 'e5', avatar: null,
      honesty: 'often', hp: 17, taste: 'ohc',
      deck: ['廢五金-廢五金', '明田川荘之-yamazaki-blues', '菊地雅章-end-for-the-beginning', 'keiji-haino-watashi-dake',
        'harry-roesli-gang-philosophy-gang', 'c-o-b-moyshe-mcstiff-and-the-tartan-lancers-of-the-sacred-he', 'pholas-dactylus-concerto-delle-menti'],
      elite: true, voice: { freq: 294, wave: 'sine' }
    },
    critic: {
      id: 'critic', name: '名盤守門員', title: '資深樂評', spr: 'e3', avatar: null,
      honesty: 'often', hp: 20, taste: 'ohc',
      deck: ['tim-buckley-starsailor', 'throbbing-gristle-20-jazz-funk-greats', 'black-midi-schlagenheim', 'faust-faust-iv',
        'neu-neu', 'sun-ra-space-is-the-place', 'the-plastic-people-of-the-universe-egon-bondy-s-happy-hearts'],
      elite: true, voice: { freq: 392, wave: 'square' }
    },
    boss: {
      id: 'boss', name: '傳說藏家', title: null, spr: 'boss', avatar: null,
      honesty: 'veteran', hp: 16, taste: 'coh',
      deck: ['交工樂隊-我等就來唱山歌', 'ganelin-trio-ancora-da-capo', 'luis-russell-the-luis-russell-story-1929-1934',
        'raw-material-time-is', 'alexander-von-schlippenbach-globe-unity', '裸のラリーズ-the-oz-tapes'],
      boss: true, voice: { freq: 147, wave: 'sine' }
    }
  };
  C.normals = ['copycat', 'already', 'needle', 'skip', 'broke', 'buyer'];
  C.elites = ['label', 'critic'];
  C.prologueEnemy = 'man';
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
  //     if：'guessRight' 猜中、'guessWrong' 猜錯、'firstClear' 第一次通關；沒有 if 的一律播
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
    // O21 選完「接受對決」（不加台詞、對話框清空）：老闆帶路走到唱盤後面，兩人走到唱盤兩側；三人站定才播遇敵特效（D §3）
    toDuel: [par(walk('o', 'ref'), seq(wait(400), par(walk('f', 'duelE'), walk('p', 'duelP'))))],
    // 再來一夜：挑完王牌，走到門邊的特價箱挑三張（§2.5.2）
    toSale: [walk('p', 'sale')]
  };

  C.script = {
    // 序章（O1–O21）：原版 RPG_BEATS 為底（D §2）。猜歌七步、四張、特價區三張、八張、兩顆接受對決
    prologue: [
      { id: 'O1', who: '', text: '下著雨。你推開巷子裡那間唱片行的門。門上的鈴鐺，響了一聲。', tag: '原句',
        set: { put: { p: 'door', o: 'counter' }, hide: { f: true, r1: true }, door: 'swing', pose: { o: 'busy' } } },
      { id: 'O2', who: '', text: '櫃檯後面的老闆抬頭看了你一眼，又低下頭，繼續整理手上的唱片。', tag: '原句',
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
        prompts: ['▶ 接受對決（看向老闆）', '▶ 接受對決（手伸進袋子，準備出招）'] }
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
    // 02:00 打烊前，傳說藏家推門（B2＝原版 BOSS_LINES[0]；出場蓋章＝BOSS_LINES[4]）
    bossEnter: [
      { id: 'B1', who: '', text: '這時，門開了。', tag: '原句', set: { sprite: { f: 'boss' }, put: { f: 'door' }, hide: { f: false }, sil: { f: false }, door: 'open' } },
      { id: 'B2', who: '藏家', text: '「讓我看看你的品味有幾兩重。」', tag: '原句', set: { stamp: '三十年的耳朵，不會騙人。' },
        act: [walk('f', 'atdoor'), door('close')], ui: 'duel', prompt: '▶ 品味對決' }
    ],
    // 通關：他用過的那張王牌（你當初沒選的）翻開、播放、收進唱片櫃
    clear: [
      { id: 'C1', who: '藏家', text: '「……這張，送你。三十年前，我也是這樣拿到的。」', tag: '新:A', ui: 'stake', music: 'stake' },
      { id: 'C2', who: '', text: '對街新開了一間黑膠潮流館。', tag: '新', if: 'firstClear', set: { stamp: '第二夜（尚未開放）' } }
    ],
    // 散場（倒下）
    dead: [
      { id: 'D1', who: '老闆', text: '「……今晚就到這。」', tag: '新', music: { stop: 1500 } }
    ],
    // 再來一夜（≤10 秒）：門晃 → 挑王牌 → 走到特價箱挑三張（C.blocking.toSale）→ 今晚來客
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
      retry: L('……再一場。', '新'),
      bagFull: L('包包滿了。先拿一張出來。', '新'),
      relicFull: L('配件最多帶三件。先放一件回去。', '新')
    },
    man: {
      line: L('這張排行榜第一名欸。', '新:C'),
      intro: L('……這品味，也敢出來丟臉？', '原句'),
      lose: [L('……哼。', '原句'), L('搵休督欸丟！', '原句')],
      win: L('回家多聽兩年再來啦。', '新:A')
    },
    copycat: {
      line: L('你出這個？那張我也有。', '新'),
      intro: L('欸你那張哪裡買的？', '新:C'),
      lose: [L('我回去也要買一張。', '新:A')],
      win: L('那張我有，兩張。', '新')
    },
    already: {
      line: L('你剛那招，我早就聽過了。', '新'),
      intro: L('這張？我高中就聽過了。', '新:D'),
      lose: [L('……這張我真的沒聽過。可以借我嗎？', '新:B')],
      win: L('回去把黑膠版聽完再來。', '新:A')
    },
    needle: {
      line: L('你手上那張，我盯很久了。', '新'),
      intro: L('你這張是幾版？', '新:D'),
      lose: [L('……我回去重新校正。', '新:D')],
      win: L('先把唱臂調平再來。', '新')
    },
    skip: {
      line: L('跳、跳、跳……又跳針了。', '新'),
      intro: L('欸，這段剛剛是不是聽過了？', '新:B'),
      lose: [L('……我真的該換唱針了。', '新:B')],
      win: L('好聽的段落，就是要多聽幾次。', '新')
    },
    broke: {
      line: L('什麼都想要一點。', '新'),
      intro: L('這個月又爆預算了……', '新:D'),
      lose: [L('這張……先寄放你那邊。', '新:D')],
      win: L('贏了，這禮拜可以吃滷肉飯加蛋。', '新')
    },
    buyer: {
      line: L('這張剛剁的，看清楚。', '新'),
      intro: L('這三張我都買兩份，一份聽、一份收。', '新:B'),
      lose: [L('……我先去領個錢。', '新:B')],
      win: L('這張歸我了。刷卡。', '新')
    },
    label: {
      line: L('你以為我會出最大的？', '新'),
      intro: L('這張全世界只壓了三百張。我有兩張。', '新:B'),
      lose: [L('……下一批，算你一張。', '新:A')],
      win: L('旋律太多了，下次少一點。', '新')
    },
    critic: {
      line: L('名盤就是名盤。', '新'),
      intro: L('我寫過這張的樂評。', '新:A'),
      lose: [L('……這張，我重寫一篇。', '新')],
      win: L('回去把年表背熟。', '新')
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
  //   hintKeywords＝D §5 的關鍵字族（tag 店主，只是參考清單，不是限制）；hints 每色 5 句（主線草稿，tag 新，進 LINES-REVIEW）
  //   key 必填、必為 text 的子字串；揭曉後的結果句用它教「『key』是 X」（duelText.bluff／honest）
  //   startFight 把 hints 的 id 組成 hintTable 傳進 startDuel；duel 裡只存 id
  // ===================================================================
  C.hintKeywords = { c: ['名盤', '紀念版', '大家都聽過'], o: ['絕版', '白版', '沒人聽過'], h: ['噪音', '聽不懂', '實驗'] };
  C.hintKeywordsTag = '店主';
  C.hints = {
    c: [
      { id: 'c1', text: '「這張，大家都聽過吧？」', key: '大家都聽過', tag: '新' },
      { id: 'c2', text: '他抽出一張週年紀念版。', key: '紀念版', tag: '新' },
      { id: 'c3', text: '他哼起那段大家都會唱的副歌。', key: '大家都會唱', tag: '新' },
      { id: 'c4', text: '他翻到「百大名盤」那一頁。', key: '名盤', tag: '新' },
      { id: 'c5', text: '他把那張名盤擦得發亮。', key: '名盤', tag: '新' }
    ],
    o: [
      { id: 'o1', text: '他嘴角藏著「你沒聽過吧」的笑。', key: '沒聽過', tag: '新' },
      { id: 'o2', text: '他從箱底挖出一張白版。', key: '白版', tag: '新' },
      { id: 'o3', text: '「這張只壓了三百張。」', key: '只壓了三百張', tag: '新' },
      { id: 'o4', text: '他翻著一本手寫的絕版清單。', key: '絕版', tag: '新' },
      { id: 'o5', text: '「這張，網路上查不到。」', key: '查不到', tag: '新' }
    ],
    h: [
      { id: 'h1', text: '他露出「越難懂越屌」的眼神。', key: '難懂', tag: '新' },
      { id: 'h2', text: '他耳機漏出一陣刺耳的噪音。', key: '噪音', tag: '新' },
      { id: 'h3', text: '「聽不懂？那就對了。」', key: '聽不懂', tag: '新' },
      { id: 'h4', text: '封套上只有一片雜訊。', key: '雜訊', tag: '新' },
      { id: 'h5', text: '他說，要聽就聽實驗的。', key: '實驗', tag: '新' }
    ]
  };

  // ===================================================================
  // 一次性老闆小提示（每種一輩子只出一次，不擋點擊，5 秒；≤20 字）。鍵＝duel.js hooks.hint(id) 的 id。
  // ===================================================================
  C.coachTips = {
    tip_mirror: '同一色比星，多的扣差額。',
    tip_bluff: '提示不一定是真的。',
    tip_block: '差 2 星以上，剋不動。',
    tip_ace: '王牌不會被剋。',
    tip_rounds: '六手內沒分勝負，比聲望。'
  };
  C.coachTipWhen = {
    tip_mirror: '第一次同色比星（含同色同星）', tip_bluff: '第一次被唬', tip_block: '第一次剋不動（你或他）',
    tip_ace: '第一次王牌擋下相剋', tip_rounds: '第一次打到第 6 手'
  };
  C.coachTipTags = {};
  Object.keys(C.coachTips).forEach(function (k) { C.coachTipTags[k] = '新'; });

  // ===================================================================
  // 對決盤面上的字（§2.2.7；A1 寫字、B1 組句。{x} 由 UI 代入）
  //   結果三行：l1 規則句（counter／countered／blockedYou／blockedHim／aceYou／aceHim／mirror／tie）、l2 扣多少（hitE／hitP）、
  //   l3 關鍵字那句（bluff／honest；key 為 null 時用 bluffNoKey／honestNoKey）
  //   {a}＝你出的屬性中文（王牌前面加「王牌」）、{b}／{e}＝他出的、{hint}＝提示屬性中文、{key}＝C.hints 的 key
  // ===================================================================
  C.duelText = {
    pickHint: '點一張專輯', picked: '選好了：', again: '點別的星換屬性，或按丟', throwBtn: '丟！', waiting: '演完就換下一手（點畫面跳過）',
    hintLabel: '提示', sleeve: '蓋著', rounds: '第 {n}／{max} 手', hp: '聲望', aceSlot: '王牌', aceUsed: '用過', aceWord: '王牌',
    he: '他・', you: '你・', slotE: '他丟的', slotP: '你丟的', lastPrefix: '上一手', pileLeft: '他還有 {n} 張',
    counter: '{a}剋{b}，命中！', countered: '{b}剋{a}，被剋了。',
    blockedYou: '{a}剋{b}，但他高你 2 星以上，剋不動。比星數，', blockedHim: '{b}剋{a}，但你高他 2 星以上，他剋不動。比星數，',
    aceYou: '{b}剋{a}，但王牌不會被剋。比星數，', aceHim: '{a}剋{b}，但他的王牌不會被剋。比星數，',
    mirror: '同樣是{a}，比星數，', tie: '一樣大，不扣。',
    hitE: '他 −{n}', hitP: '你 −{n}',
    bluff: '他唬你！『{key}』是{hint}，他出的是{e}。', honest: '『{key}』是{hint}，他照實出。',
    bluffNoKey: '他唬你！提示是{hint}，他出的是{e}。', honestNoKey: '提示是{hint}，他照實出。',
    koWin: '品味勝出', koWinSub: '你贏了【{name}】。', koLose: '聲望歸零', koLoseRetry: '老闆：……再一場。',
    roundsOut: '六手打完，比聲望', roundsScore: '你 {p} 比 他 {e}：{who}贏'
  };
  C.duelTextTag = '新';

  // ===================================================================
  // 規則卡（§2.2.8；「?」小抄與標題畫面共用）。lines＝D §5 規則卡六行一字不改（tag 店主；畫面上的編號由 UI 加）
  //   foot 的 {normal}／{elite}／{boss}：由 UI 代入 hpText（同一級聲望都一樣寫單一數字，不一樣寫「最小–最大」）
  // ===================================================================
  C.rules = {
    title: '品味對決・規則',
    lines: [
      '每張專輯有經典／冷門／硬蕊三個星數。',
      '每一手，你和他各暗中挑一張專輯、一個屬性，同時亮出。',
      '冷剋經、經剋硬、硬剋冷：剋中，就用你那個屬性的星數扣他聲望。',
      '被剋的一方高 2 星以上，剋不動，改成比星數。',
      '沒有相剋就比星數，高的扣差額；一樣大不扣。',
      '提示會暗示他這手的打算，但有些人會唬你。王牌 7 星、不會被剋，一場用一次。六手內沒分出勝負，比剩下的聲望。'
    ],
    relics: '發燒配件：自動生效，最多帶三件。',
    foot: ['點專輯選牌；按住封面看唱片資訊。', '你 10 聲望；客人 {normal}、菁英 {elite}、傳說藏家 {boss}。']
  };
  C.rulesTag = '新';          // title／relics／foot
  C.rulesLinesTag = '店主';   // lines（六行）
  (function () {
    var span = function (ids) {
      var hs = ids.map(function (id) { return C.enemies[id] ? C.enemies[id].hp : null; }).filter(function (x) { return x != null; });
      if (!hs.length) return '';
      var lo = Math.min.apply(null, hs), hi = Math.max.apply(null, hs);
      return lo === hi ? String(lo) : lo + '–' + hi;
    };
    C.rules.hpText = { normal: span(C.normals), elite: span(C.elites), boss: span([C.boss]) };
  })();

  // ===================================================================
  // 序章男子那場的教學（§2.2.10）。A1 寫規則資料：hp／plays／hints／lessons／script／expect；B2（第二波）寫 steps／learned／ui。
  //   他六手照 plays 出（全部都在男子的牌單裡）、提示照 hints（只用帶 D 族詞的句子），課表：比星數 → 冷剋經 → 經剋硬 → 硬剋冷 → 差 2 星剋不動 → 王牌。
  //   你：前四手只用老闆送的四張（script.hand＋draw）；第 5 手抽到的一定是特價箱挑的那三張之一（冷門 ≤3，對他的經典 5 剋不動）；第 6 手王牌 KO。
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
      hand: ['david-bowie-low', 'beverly-glenn-copeland-keyboard-fantasies', 'vashti-bunyan-just-another-diamond-day'], draw: ['scott-walker-tilt'],
      pick: [{ id: 'david-bowie-low', attr: 'c' }, { id: 'beverly-glenn-copeland-keyboard-fantasies', attr: 'o' }, { id: 'vashti-bunyan-just-another-diamond-day', attr: 'c' },
        { id: 'scott-walker-tilt', attr: 'h' }, 'blocked:o', 'ace']
    },
    pearl: {
      hand: ['bark-psychosis-hex', '黃小楨-賞味期限', '傷心欲絕-我愛您'], draw: ['charles-brackeen-rhythm-x'],
      pick: [{ id: 'bark-psychosis-hex', attr: 'c' }, { id: '黃小楨-賞味期限', attr: 'o' }, { id: 'charles-brackeen-rhythm-x', attr: 'c' },
        { id: '傷心欲絕-我愛您', attr: 'h' }, 'blocked:o', 'ace']
    },
    heresy: {
      hand: ['the-velvet-underground-white-light-white-heat', 'magma-mekanik-destruktiw-kommandoh', 'pharoah-sanders-tauhid'], draw: ['melt-banana-speak-squeak-creak'],
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
        { kind: 'counter', toE: 5, toP: 0 }, GAP5, { kind: 'mirrorWin', toE: 5, toP: 0, blocked: 'ace' }]
    },
    // ---- 以下 steps／learned／ui 由 B2 寫（§2.5.5）：六手各教一件事 ----
    //   target／point 的 'pick'＝這一手 script[tier].pick 指的那顆（tutorial.js stepsFor 代入：{id,attr}→chip:id:<id>:<attr>、'blocked:o'→chip:blocked:o、'ace'→王牌）；
    //   'tile:pick'＝那顆所在的整格（封面＋星鈕；點封面也算，只要選到的屬性對）。allow.pick＝只放行那一顆。
    //   每手：（說明）→ 點那顆 → 丟！ →（結算浮框出現時講，target 含 result）。learn＝這步做完就學到哪張小卡。
    //   第 1 手前一句說明提示；第 1 手結算後老闆點破關鍵字一次（提示 c5「他把那張名盤擦得發亮。」→「名盤」＝經典；規劃書，不是 D，列 §5.7）。
    steps: [
      { id: 'm1', kind: 'say', target: ['e-hint'], text: '上面這句是提示，暗示他這手要出什麼。', bubble: 'below', tag: '新' },
      { id: 'm2', kind: 'do', target: ['tile:pick'], point: 'pick', allow: { pick: true }, text: '先出這張的經典，跟他比星數。', bubble: 'above', tag: '新' },
      { id: 'm3', kind: 'do', target: ['pick', 'throw'], point: 'throw', allow: { throw: true }, text: '丟！', bubble: 'above', tag: '新' },
      { id: 'm4', kind: 'say', target: ['result'], text: '同色就比星數，多的扣差額。', learn: 'L1', tag: '新' },
      { id: 'm5', kind: 'say', target: ['result'], text: '『名盤』就是經典。提示裡會藏這種字。', tag: '新' },
      { id: 'k1', kind: 'do', target: ['tile:pick'], point: 'pick', allow: { pick: true }, tri: ['oc'], text: '冷門剋經典：點這顆冷門。', bubble: 'above', tag: '新' },
      { id: 'k2', kind: 'do', target: ['pick', 'throw'], point: 'throw', allow: { throw: true }, tri: ['oc'], text: '丟！', bubble: 'above', tag: '新' },
      { id: 'k3', kind: 'say', target: ['result'], text: '剋中：用你那顆星扣他。', learn: 'L2', tag: '新' },
      { id: 'c1', kind: 'do', target: ['tile:pick'], point: 'pick', allow: { pick: true }, tri: ['ch'], text: '經典剋硬蕊：點這顆經典。', bubble: 'above', tag: '新' },
      { id: 'c2', kind: 'do', target: ['pick', 'throw'], point: 'throw', allow: { throw: true }, tri: ['ch'], text: '丟！', learn: 'L3', bubble: 'above', tag: '新' },
      { id: 'h1', kind: 'do', target: ['tile:pick'], point: 'pick', allow: { pick: true }, tri: ['ho'], text: '硬蕊剋冷門：點這顆硬蕊。', bubble: 'above', tag: '新' },
      { id: 'h2', kind: 'do', target: ['pick', 'throw'], point: 'throw', allow: { throw: true }, tri: ['ho'], text: '丟！', learn: 'L4', bubble: 'above', tag: '新' },
      { id: 'b1', kind: 'do', target: ['tile:pick'], point: 'pick', allow: { pick: true }, tri: ['oc'], text: '又是『名盤』。出這張冷門試試。', bubble: 'above', tag: '新' },
      { id: 'b2', kind: 'do', target: ['pick', 'throw'], point: 'throw', allow: { throw: true }, tri: ['oc'], text: '丟！', bubble: 'above', tag: '新' },
      { id: 'b3', kind: 'say', target: ['result'], text: '他高你 2 星以上，剋不動，改比星數。', learn: 'L5', tag: '新' },
      { id: 'a1', kind: 'do', target: ['tile:pick'], point: 'pick', allow: { pick: true }, text: '最後一手。丟王牌：7 星，一場一次。', bubble: 'above', tag: '新' },
      { id: 'a2', kind: 'do', target: ['pick', 'throw'], point: 'throw', allow: { throw: true }, text: '丟！', bubble: 'above', tag: '新' },
      { id: 'a3', kind: 'say', target: ['result'], learn: 'L6', tag: '新',
        text: { hall: '同色比星數，7 比 2，他 −5。', pearl: '冷門剋經典，王牌 7 星，他 −7。', heresy: '經典剋硬蕊，但 7 星剋不動：比星數。' } }
    ],
    learned: { L1: '同色比星數', L2: '冷門剋經典', L3: '經典剋硬蕊', L4: '硬蕊剋冷門', L5: '差 2 星剋不動', L6: '王牌 7 星、不會被剋' },
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
  // 店裡熱點的一句話、今晚來客、台北地圖預告（ui.js 讀這些鍵，沒有的鍵就不出那句）。來源標記在 shopLineTags（同形狀）。
  // ===================================================================
  var RAW_SHOP = {
    cat: L('……喵。', '新'),
    poster: L('冷門剋經典，經典剋硬蕊，硬蕊剋冷門。', '新'),   // 公告：點了開規則卡
    locked: L('這間還沒開。', '新'),
    binBusy: L('打完再翻。', '店主'),                           // 序章／對決中點箱子（D §6）
    ownerHint: {
      title: L('外面雨大，進來坐。', '新'),
      scene: L('慢慢看，不趕你。', '新'),
      night: L('今晚的客人，一個一個來。', '新'),
      duel: L('先看提示那句。', '新'),
      reward: L('收好，別折到封套。', '新')
    },
    nightIntro: [L('今晚的客人，一個一個來。', '新'), L('贏了有錢，兩位客人之間可以去箱子買唱片。', '新')],
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

  // 經濟介面的字（B3 用；{x} 由 UI 代入；${n} 的 $ 是錢的符號）
  C.shopUi = {
    money: '${n}',
    binTitle: '{label}',
    buy: '買 ${n}',
    noMoney: '錢不夠',
    bagFull: '包包滿了：先賣一張，半價 ${n}',
    sellPick: '賣這張',
    bought: '《{album}》進包包，−${n}',
    sold: '《{album}》賣掉，+${n}',
    relicTitle: '櫃檯的配件',
    relicFull: '配件最多三件：先賣一件，半價 ${n}',
    relicBought: '拿到「{name}」，−${n}',
    bargainTitle: '特價區',
    bargainPrompt: '（挑三張。）',
    bargainTake: '收下這三張',
    bargainBuy: '$100：最多挑三張',
    bargainEmpty: '特價區今晚賣完了。',
    close: '關閉',
    earned: '+${n}'
  };
  C.shopUiTag = '新';

  // 結算三件事
  C.summary = { reached: '走到 {time}', wins: '贏了 {n} 位', taken: '收了', none: '這晚沒收唱片', again: '再來一夜' };
  C.summaryTag = '新';

  // 第一次通關後的剪影預告
  C.secondNight = { name: '增值哥', title: '對街潮流館', line: '對街新開了一間黑膠潮流館。', label: '第二夜（尚未開放）', tag: '新' };

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
