/* content.js：品味對決 v3 的純資料（SPEC-v3 §3、§6、§8、§9、§10.2；Agent R）。
 *
 * 瀏覽器：讀 window.DipLabCards（cards.js 先載入），輸出 window.DipLabContent。
 * Node：require('./cards.js')，module.exports = 同一份物件。
 * 只有資料，沒有邏輯；engine.js 只讀不改。
 *
 * v3：三相剋當核心。拿掉氣勢、輾壓、賭注、相生、六格唱盤、點播、事件、挖箱、試聽機、櫃檯、讀人圖鑑、耳朵專長、王牌被動。
 *     發燒配件留下 6 件（店主：「配件系統可以留 只是不要影響遊玩體驗」）：全部被動、自動生效、一句話貼著三相剋，最多帶 3 件。
 *
 * 文案慣例（店主規則）：
 *   - script 的 Beat.text：說話者的台詞包在「」裡（同現行 RPG_BEATS）；旁白第二人稱「你」、不加「」。
 *   - lines.*（舞台泡泡）：不加「」，由 UI 決定怎麼框。
 *   - 不用破折號；櫃檯、硬蕊、發燒配件、唱片資訊；「派對」不出現。
 *   - 每一句都有來源標記：script 的 Beat.tag；lines／shopLines 的標記在 lineTags／shopLineTags（同形狀、平行的表）；
 *     其他字串（habits、relics、coachTips、rules、tutorial.steps、duelText）用自己的 tag 欄位或 xxxTag。
 *     標記值：'原句'＝現行 roguelike.html 一字不改、'拍板'＝店主親定、'新'＝試做版新寫、'新:A'～'新:D'＝取自概念稿（同樣待店主過目）。
 */
(function (root, factory) {
  var cards = (typeof module === 'object' && module.exports) ? require('./cards.js') : root.DipLabCards;
  var content = factory(cards || {});
  if (typeof module === 'object' && module.exports) module.exports = content;
  else root.DipLabContent = content;
})(typeof self !== 'undefined' ? self : this, function (CARDS) {
  'use strict';
  var C = {};
  C.version = 'lab-3';
  C.cards = CARDS;
  function L(text, tag) { return { _t: text, _g: tag }; }
  function pick(raw, which) {
    if (raw && typeof raw === 'object' && '_t' in raw) return which === 't' ? raw._t : raw._g;
    if (Array.isArray(raw)) return raw.map(function (x) { return pick(x, which); });
    var o = {}; for (var k in raw) o[k] = pick(raw[k], which); return o;
  }

  // ===================================================================
  // 王牌、老闆送的四張、門口一百塊三張（包包開局 7 張，最多 8 張，不含王牌）
  // ===================================================================
  C.aces = { hall: 'radiohead-ok-computer', pearl: 'barney-wilen-zodiac', heresy: 'swans-filth' };
  C.aceTitle = { hall: '殿堂', pearl: '流亡', heresy: '異端' };          // 王牌名（附錄 D）
  C.aceAxis = { hall: 'c', pearl: 'o', heresy: 'h' };                    // 7 星那軸（王牌只能丟這一軸）
  C.gifts = {
    hall:   ['david-bowie-low', 'vashti-bunyan-just-another-diamond-day', 'scott-walker-tilt', 'can-ege-bamyasi'],
    pearl:  ['karen-dalton-in-my-own-time', 'bark-psychosis-hex', '黃小楨-賞味期限', '傷心欲絕-我愛您'],
    heresy: ['the-velvet-underground-white-light-white-heat', 'melt-banana-speak-squeak-creak', 'pharoah-sanders-tauhid', 'einsturzende-neubauten-halber-mensch']
  };
  C.junk = ['david-bowie-never-let-me-down', 'miles-davis-you-re-under-arrest', 'devo-oh-no-it-s-devo'];
  C.junkLabel = '門口一百塊三張';

  // ===================================================================
  // 脾氣（名牌上那一句；SPEC-v3 §3）。判斷邏輯在 engine.js HABITS，這裡只有字。
  //   每一種都是「看畫面上的一樣東西，在三角上轉一格」。label：名牌左邊的黑底小字。
  // ===================================================================
  C.habits = {
    honest: { zh: '老實', line: '只認排行榜：丟他那張最大的星。', tag: '新' },
    copy:   { zh: '跟風', line: '你上一手丟什麼，他就跟著丟。', tag: '新' },
    grudge: { zh: '記仇', line: '專丟剋你上一手的那種。', tag: '新' },
    repeat: { zh: '跳針', line: '上一手丟什麼，這手還丟什麼。', tag: '新' },
    rot:    { zh: '輪流', line: '照三角的箭頭輪著丟：冷→經→硬→冷。', tag: '新' },
    bluff:  { zh: '虛晃', line: '亮最大的星嚇你，丟的是剋你的那招。', tag: '新' },
    eye:    { zh: '盯手', line: '盯著你手上最大的星，丟剋它的。', tag: '新' }
  };
  C.habitLabels = { base: '脾氣', switched: '急了' };
  C.habitLabelsTag = '新';
  // 急了／翻面之後，名牌整句（只有文字、不分標籤的地方用；盤面上是「標籤＋habits[phase2].line」）
  C.phase2Lines = {
    label: '急了：上一手丟什麼，這手還丟什麼。',
    critic: '急了：專丟剋你上一手的那種。',
    boss: 'B 面：專丟剋你上一手的那種。'
  };
  C.phase2LinesTag = '新';

  // ===================================================================
  // 發燒配件（6 件；店主 11-07：「配件系統可以留 只是不要影響遊玩體驗」）
  //   全部被動、自動生效、對戰中不增加任何選擇；最多帶 3 件；只在你那側顯示小圖示。
  //   desc＝說明（點圖示時看）；note＝生效那手結果行補的一句（engine 的 clash.notes[].text）。
  //   icon＝ui.js LAB_ICONS（roguelike.html PIX_ICONS_LV）的鍵。判斷在 engine.js outcome()。
  //   序章收尾三選一：防塵套／黑膠唱針／洗碟水（店主認可的那一段，效果改寫成貼著三相剋的一句）。
  //   菁英、藏家打贏：他丟過的唱片挑一張，或改拿一件配件（rewards.relicPool 裡你還沒有的，種子決定是哪件）。
  // ===================================================================
  C.relics = {
    dustcover: { id: 'dustcover', name: '防塵套',     icon: 'dustcover', desc: '每場第一次被剋少扣 1。', note: '防塵套：少扣 1', tag: '新' },
    stylus:    { id: 'stylus',    name: '黑膠唱針',   icon: 'stylus',    desc: '硬蕊剋中多扣 1。',       note: '黑膠唱針：多扣 1', tag: '新' },
    cleaner:   { id: 'cleaner',   name: '洗碟水',     icon: 'cleaner',   desc: '同色同星時你扣他 1。',   note: '洗碟水：他 −1', tag: '新' },
    obi:       { id: 'obi',       name: '原版側標',   icon: 'obi',       desc: '經典剋中多扣 1。',       note: '原版側標：多扣 1', tag: '新' },
    testpress: { id: 'testpress', name: '神秘見本盤', icon: 'testpress', desc: '冷門剋中多扣 1。',       note: '神秘見本盤：多扣 1', tag: '新' },
    headphone: { id: 'headphone', name: '監聽耳機',   icon: 'headphone', desc: '每場第一手他照名牌丟。', note: '監聽耳機：他照名牌丟', tag: '新' }
  };
  C.relicMax = 3;
  C.rewards = {
    prologueRelics: ['dustcover', 'stylus', 'cleaner'],
    relicPool: ['obi', 'testpress', 'stylus', 'dustcover', 'cleaner', 'headphone']
  };

  // ===================================================================
  // 今晚來客（SPEC-v3 §9）：一般 6 抽 3、菁英 2 抽 1、藏家最後；日期種子；每晚一次老闆說情
  // ===================================================================
  C.night = { prologueTime: '21:30', times: ['22:00', '22:40', '23:20', '00:10', '02:00'], normals: 3, retry: 1, label: '今晚來客', closing: '打烊' };
  C.nightTag = '新';

  // ===================================================================
  // 客人（10 位；SPEC-v3 §3 的表。數字都在 sim.mjs 模擬過，改了要重跑）
  //   habit／phase2：C.habits 的鍵；p：照脾氣率（沒寫＝engine CFG.habitP 0.4；男子 1）；hp：一般 14、菁英 16、藏家 18、男子 10（教學 14）。SPEC-v3 原案 13／15／17；發燒配件加回來之後各 +1（sim.mjs 門檻照舊，見 README）
  //   taste：三軸並列時誰算「最大的星」的順序；deck：7 張真唱片（藏家 6 張＋你沒選的那張王牌，由 engine 加）
  //   line：口頭禪（開場泡泡，= lines[id].line）；drop：序章男子打輸掉出來的那張
  // ===================================================================
  C.enemies = {
    man: {
      id: 'man', name: '男子', title: null, spr: 'e0', avatar: null,
      habit: 'honest', p: 1, hp: 10, taste: 'coh',
      deck: ['coldplay-mylo-xyloto', 'westlife-coast-to-coast', 'imagine-dragons-night-visions', 'katy-perry-prism', 'oasis-be-here-now', 'linkin-park-one-more-light'],
      drop: 'fishmans-long-season', prologue: true, voice: { freq: 659, wave: 'square' }
    },
    copycat: {
      id: 'copycat', name: '那張我有', title: '文青同好', spr: 'e1', avatar: null,
      habit: 'copy', hp: 14, taste: 'och',
      deck: ['beach-house-teen-dream', 'weyes-blood-titanic-rising', 'mitski-be-the-cowboy', 'billie-eilish-when-we-all-fall-asleep-where-do-we-go',
        '老王樂隊-暮夜徐行', '傷心欲絕-還是偶爾想要偉大', '大象體操-elephant-gym-角度'],
      voice: { freq: 523, wave: 'square' }
    },
    already: {
      id: 'already', name: '我早就聽過', title: '社團學長', spr: 'e2', avatar: null,
      habit: 'grudge', hp: 14, taste: 'hco',
      deck: ['talk-talk-laughing-stock', 'robert-wyatt-rock-bottom', 'duster-stratosphere', 'broadcast-tender-buttons', 'squarepusher-ultravisitor',
        'autechre-tri-repetae', 'xiu-xiu-fabulous-muscles'],
      voice: { freq: 440, wave: 'square' }
    },
    needle: {
      id: 'needle', name: '針壓強迫症', title: '品味行家', spr: 'e6', avatar: null,
      habit: 'eye', hp: 14, taste: 'coh',
      deck: ['steely-dan-gaucho', 'art-pepper-art-pepper-meets-the-rhythm-section', 'bill-evans-waltz-for-debby', 'kenny-burrell-midnight-blue',
        'andrew-cyrille-what-about', 'roscoe-mitchell-sextet-sound', 'john-zorn-cobra'],
      voice: { freq: 587, wave: 'triangle' }
    },
    skip: {
      id: 'skip', name: '跳針王', title: '二手店老闆', spr: 'e4', avatar: null,
      habit: 'repeat', hp: 14, taste: 'coh',
      deck: ['barney-wilen-moshi', 'hermeto-pascoal-zabumbe-bum-a', 'tony-scott-the-indonesian-all-stars-djanger-bali', 'joe-harriott-free-form',
        '富樫雅彦-we-now-create-music-for-strings-winds-and-percussions', 'caetano-veloso-transa', 'fela-kuti-zombie'],
      voice: { freq: 330, wave: 'square', jitter: 20 }
    },
    broke: {
      id: 'broke', name: '月底吃土', title: null, spr: null,
      avatar: { head: 'cap', hair: 'u', shirt: 'r', pants: 'd', skin: 's' },
      habit: 'rot', hp: 14, taste: 'och',
      deck: ['美秀集團-amazing-show-電火王', 'deca-joins-鳥鳥鳥', '宇宙人-地球漫步', '老王樂隊-吾日三省吾身', '陳珊妮-完美的呻吟', '雷光夏-summer-lei-黑暗之光', '生祥樂隊-圍庄'],
      voice: { freq: 494, wave: 'square' }
    },
    buyer: {
      id: 'buyer', name: '剁手黨', title: null, spr: null,
      avatar: { head: 'fedora', hair: 'k', shirt: 'g', pants: 'k', skin: 't' },
      habit: 'bluff', hp: 14, taste: 'coh',
      deck: ['mogwai-young-team', 'explosions-in-the-sky-the-earth-is-not-a-cold-dead-place', 'sigur-ros-takk', 'sigur-ros-von',
        'william-basinski-the-disintegration-loops', 'brian-eno-ambient-1-music-for-airports', 'swans-soundtracks-for-the-blind'],
      voice: { freq: 554, wave: 'square' }
    },
    label: {
      id: 'label', name: '冷門仙人', title: '地下廠牌主理人', spr: 'e5', avatar: null,
      habit: 'bluff', phase2: 'repeat', phase2Label: '急了', hp: 16, taste: 'ohc',
      deck: ['廢五金-廢五金', '明田川荘之-yamazaki-blues', '菊地雅章-end-for-the-beginning', 'keiji-haino-watashi-dake', 'sunn-o-white1',
        'this-heat-repeat', 'silver-apples-silver-apples'],
      elite: true, voice: { freq: 294, wave: 'sine' }
    },
    critic: {
      id: 'critic', name: '名盤守門員', title: '資深樂評', spr: 'e3', avatar: null,
      habit: 'honest', phase2: 'grudge', phase2Label: '急了', hp: 16, taste: 'ohc',
      deck: ['tim-buckley-starsailor', 'throbbing-gristle-20-jazz-funk-greats', 'black-midi-schlagenheim', 'faust-faust-iv',
        'popol-vuh-in-den-garten-pharaos', 'neu-neu', 'sun-ra-space-is-the-place'],
      elite: true, voice: { freq: 392, wave: 'square' }
    },
    boss: {
      id: 'boss', name: '傳說藏家', title: null, spr: 'boss', avatar: null,
      habit: 'copy', habitLabel: 'A 面', phase2: 'grudge', phase2Label: 'B 面', hp: 18, taste: 'coh',
      deck: ['交工樂隊-我等就來唱山歌', 'alice-coltrane-journey-in-satchidananda', 'shuggie-otis-inspiration-information', 'popol-vuh-hosianna-mantra',
        'cornelius-fantasma', '坂本龍一-async'],
      boss: true, voice: { freq: 147, wave: 'sine' }
    }
  };
  C.normals = ['copycat', 'already', 'needle', 'skip', 'broke', 'buyer'];
  C.elites = ['label', 'critic'];
  C.prologueEnemy = 'man';
  C.boss = 'boss';
  C.voices = { owner: { freq: 196, wave: 'square' }, narrator: null };   // 打字機嗶聲

  // ===================================================================
  // 劇本（§2.3、§2.7）。Beat = { who, text, stage?, ui?, music?, prompt?, if?, stamp?, quietText?, tag }
  //   who：''＝旁白、'老闆'、'男子'、'藏家'、'player'
  //   stage：p／o／f＝站位鍵（RPG_POS）；door：'swing'|'open'|'shut'；notes／oBusy／anger：bool；oPath：走位陣列；fSpr：門口那位的小人鍵；
  //          give：'ace'|'gifts'|'junk'＝封面飛進王牌格／手牌列的演出（不開面板）
  //   ui：這句是「選擇句」，補完後亮 ▼，玩家點一下才展開面板（§2.2）：
  //       'guess' 猜歌、'acePick' 挑王牌、'retort' 回嘴（選項＝C.retorts，選完把 reply 當成男子的一句播出）、
  //       'duel' 進對決、'stake' 亮出那張盤（序章：挑一張收進包包；打烊：藏家送的王牌進唱片櫃）、'relic' 發燒配件三選一、
  //       'map' 進「今晚來客」（v3 沒有分岔地圖，鍵名沿用）
  //   music：'tonight' 開始播今晚那張（三張王牌之一）、'stake' 播那張盤、'stop' 淡出
  //   prompt：面板上方的提示字（同現行 RPG_BEATS 的 prompt）
  //   if：條件句，只有符合時才播：'guessRight' 猜中、'guessWrong' 猜錯、'firstClear' 第一次通關；沒有 if 的一律播
  //   stamp：這句播出時一起蓋的章（例：好耳朵）
  //   quietText：靜音（或試聽沒出聲）時改用的文字
  // ===================================================================
  function P_START() { return { p: 'door', o: 'counter', f: 'out', door: 'swing' }; }
  // NP-01：點封套開的是唱片資訊，換選要點封套下面那行字（ui.js 若改成點封套就換選，這句照樣成立）
  var acePickBeat = { who: '', text: '（點封套下面的字換著聽，挑一張帶走。）', ui: 'acePick', tag: '新' };
  var prologueHead = [
    { who: '', text: '下著雨。你推開巷子裡那間唱片行的門。門上的鈴鐺，響了一聲。', stage: P_START(), tag: '原句' },
    { who: '', text: '這時候，店裡的音響傳出一段旋律。', stage: { notes: true }, music: 'tonight', tag: '原句' },
    { who: '', text: '……很迷人。你停下腳步，不自覺跟著點起頭來。', stage: { p: 'browse' }, tag: '原句' },
    { who: '', text: '你抬起頭。老闆正把一張唱片放上唱盤。櫃檯上還攤著兩張，封套邊緣磨損嚴重，顯然塵封已久。', stage: { oBusy: true }, tag: '拍板' }
  ];
  var P5 = '「這三張，是我這裡最貴的三張。」他沒抬頭。「剛才那段，你覺得是哪一張？」';
  var prologueTail = [
    { who: '老闆', text: '「這張是我的私人收藏。今天讓給你。」', stage: { give: 'ace' }, tag: '原句' },
    { who: '老闆', text: '「這四張也很適合你。跟你有緣，收下吧。」', stage: { oPath: ['aisle', 'dig1', 'dig2', 'dig3'], give: 'gifts' }, tag: '原句' },
    { who: '老闆', text: '「門口那箱一百塊三張，順手帶著。」', stage: { oPath: ['frontleft', 'aisle', 'counter'], give: 'junk' }, tag: '新' },
    { who: '', text: '這時，門開了。', stage: { f: 'door', door: 'open' }, tag: '原句' },
    // v2 像素店：他走到 duelE、你站 duelP（對峙的位置就是對決的位置，進對決時只推鏡頭；U 04:05）
    { who: '', text: '一名男子走進來。他的視線，落在你手上的那幾張專輯上。', stage: { f: 'duelE', p: 'duelP', door: 'shut' }, tag: '原句' },
    { who: '男子', text: '「……這品味，也敢出來丟臉？」', tag: '原句' },
    { who: '', text: '你的憤怒表露無遺。', stage: { anger: true }, ui: 'retort', tag: '原句' },
    { who: '', text: '老闆不發一語，緩步走出櫃檯，站在兩人之間。', stage: { oPath: ['aisle', 'between'], anger: false }, tag: '拍板' },
    // v2（SPEC-v2 §6.4）：補完後亮 ▼，再點一下出兩顆鈕：prompts[0]＝帶教學、prompts[1]＝不帶教學（男子照舊 16／12、預覽開著）
    { who: '老闆', text: '「既然雙方都不服氣，不如來一場品味對決如何？」', ui: 'duel', prompt: '▶ 品味對決', prompts: ['▶ 品味對決', '▶ 直接開打（我會玩）'], tag: '原句' }
  ];
  C.script = {
    // 第一次玩（有聲音）：P1–P16，猜歌 → 挑王牌 → 回嘴 → 對決
    prologue: prologueHead.concat([
      { who: '老闆', text: P5, ui: 'guess', prompt: '剛才那段，是哪一張？', tag: '原句' },
      { who: '老闆', text: '「……你眼光真不錯。」老闆終於抬起頭來，看著你。', if: 'guessRight', stage: { oBusy: false },
        stamp: '好耳朵', tag: '原句' },
      { who: '老闆', text: '「不是這張。不過，你挑的這張也不壞。」', if: 'guessWrong', stage: { oBusy: false }, tag: '新' },
      acePickBeat
    ], prologueTail),
    // 沒開聲音（安靜地推門、音訊被擋、2.5 秒內試聽沒出聲）：猜歌整段跳過，P5 直接進挑王牌，不給好耳朵
    quietPrologue: prologueHead.map(function (b) { return b.music ? { who: b.who, text: b.text, stage: b.stage, tag: b.tag } : b; }).concat([
      { who: '老闆', text: P5, ui: 'acePick', prompt: '（挑一張帶走。）', stage: { oBusy: false }, tag: '原句' }
    ], prologueTail),
    // 序章收尾（贏了男子）：他掉出 Fishmans（finishFight 的 offer.cards）→ 發燒配件三選一（offer.relics＝rewards.prologueRelics）
    epilogueWin: [
      { who: '男子', text: '「……哼。」他把自己的唱片塞回袋子裡，看都不看你一眼。', stage: { p: 'duelP', o: 'between', f: 'duelE', fSpr: 'e0', anger: false, notes: false }, tag: '原句' },
      { who: '男子', text: '「搵休督欸丟！」', tag: '原句' },
      { who: '', text: '他的袋子裡掉出一張盤。', stage: { f: 'out', door: 'swing' }, ui: 'stake', music: 'stake', tag: '新' },
      { who: '老闆', text: '「……他每個禮拜都來聽這張。」', stage: { o: 'between' }, tag: '新' },
      { who: '老闆', text: '「我看你對音樂脈絡，很有天份。」', tag: '原句' },
      // 店主 09-08：箱子放在折疊長桌上、桌下放黑籃。老闆走到長桌（dig1）再拖出木箱，這句原文才對得上畫面（O3）
      { who: '老闆', text: '「我這邊有一些被我淘汰的設備，你挑一個，帶回去吧。」', stage: { oPath: ['dig1'] }, ui: 'relic', prompt: '（老闆從長桌底下拖出一個木箱。）', tag: '原句' }
    ],
    // 配件挑完 → 今晚來客
    afterPrologue: [
      { who: '', text: '你正要道謝，門又開了。', stage: { f: 'door', door: 'open' }, tag: '原句' },
      { who: '老闆', text: '「今晚是交流夜。人會越來越多。」', ui: 'map', tag: '新' }
    ],
    // 02:00 打烊前，傳說藏家推門
    bossEnter: [
      { who: '', text: '這時，門開了。', stage: { p: 'duelP', o: 'counter', f: 'door', fSpr: 'boss', door: 'open' }, tag: '原句' },
      { who: '藏家', text: '「聽說這裡有個新來的，品味不錯？」', stage: { f: 'duelE', door: 'shut' }, stamp: '三十年的耳朵，不會騙人。', ui: 'duel', prompt: '▶ 品味對決', tag: '原句' }
    ],
    // 通關：他用過的那張王牌（你當初沒選的）翻開、播放、收進唱片櫃
    clear: [
      { who: '藏家', text: '「……這張，送你。三十年前，我也是這樣拿到的。」', ui: 'stake', music: 'stake', tag: '新:A' },
      { who: '老闆', text: '「年輕人，有空再來這邊走走，與大家交流音樂。」', tag: '原句' },
      { who: '', text: '對街新開了一間黑膠潮流館。', if: 'firstClear', stamp: '第二夜（尚未開放）', tag: '新' }
    ],
    // 散場（倒下）
    dead: [
      { who: '老闆', text: '「……今晚就到這。」', music: 'stop', tag: '新' }
    ],
    // 再來一夜（≤10 秒）：門 swing → 三張王牌 → 今晚來客
    again: [
      { who: '老闆', text: '「……又是你。」', stage: P_START(), tag: '新' },
      { who: '', text: '（點封套下面的字換著聽，挑一張帶走。）', quietText: '（挑一張帶走。）', ui: 'acePick', tag: '新' }
    ]
  };

  // 玩家第一次有台詞（P13 的回嘴）；reply 由男子說，當成一句 Beat 播出
  C.retorts = [
    { label: '你耳機裡那張，是《Mylo Xyloto》吧。', reply: '「……那張也是 Coldplay 好嗎！」', tag: '新' },
    { label: '……（把唱片抱緊）', reply: '「哼，抱那麼緊，怕被笑喔？」', tag: '新' }
  ];


  // ===================================================================
  // 台詞（舞台泡泡）。lines[誰][鍵]＝字串或字串陣列；lineTags 同形狀，記每句的來源標記。
  //   v3 只留：line 口頭禪（開場泡泡，SPEC-v3 §3）、intro 進門那句、switch 急了／翻面、lose 你贏時（他說）、win 你輸時（他說）
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
      jabBubble: L('……對啦，就這張。', '新'),            // 回嘴選了《Mylo Xyloto》：第一手他亮出的正是這張（startFight firstRecordId）
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
      switch: L('……急了。', '新'),
      lose: [L('……下一批，算你一張。', '新:A')],
      win: L('旋律太多了，下次少一點。', '新')
    },
    critic: {
      line: L('名盤就是名盤。', '新'),
      intro: L('我寫過這張的樂評。', '新:A'),
      switch: L('……急了。', '新'),
      lose: [L('……這張，我重寫一篇。', '新')],
      win: L('回去把年表背熟。', '新')
    },
    boss: {
      line: L('……這張，我也有。', '新'),
      intro: L('聽說這裡有個新來的，品味不錯？', '原句'),
      stampSub: L('三十年的耳朵，不會騙人。', '原句'),      // 出場蓋章的副標
      switch: L('……換面。', '新'),
      lose: [L('……這張，送你。三十年前，我也是這樣拿到的。', '新:A')],
      win: L('我的木箱裡，沒有一張爛盤。', '原句')
    }
  };
  C.lines = pick(RAW_LINES, 't');
  C.lineTags = pick(RAW_LINES, 'g');
  Object.keys(C.enemies).forEach(function (k) { if (C.lines[k] && C.lines[k].line) C.enemies[k].line = C.lines[k].line; });

  // ===================================================================
  // 一次性老闆小提示（SPEC-v3 §6；每種一輩子只出一次，不擋點擊，5 秒）。鍵＝duel.js hooks.hint(id) 的 id。
  // ===================================================================
  C.coachTips = {
    tip_mirror: '同一色比星，多的扣差額。',
    tip_offhabit: '他這手沒照脾氣。十手大概六手會照。',
    tip_read: '看穿：他照脾氣丟，被你剋中。',
    tip_switch: '他急了，脾氣換了一句，照新的讀。',
    tip_eye: '他盯的是你掛「盯」的那顆星。'
  };
  C.coachTipWhen = {
    tip_mirror: '第一次同色比星（含同色同星）', tip_offhabit: '第一次他沒照脾氣', tip_read: '第一次看穿',
    tip_switch: '第一次急了／翻面', tip_eye: '第一次遇到盯手'
  };
  C.hints = C.coachTips;          // 舊名（tutorial.js／ui.js 讀 hints 也拿得到）
  C.hintWhen = C.coachTipWhen;
  C.hintTags = {};
  Object.keys(C.coachTips).forEach(function (k) { C.hintTags[k] = '新'; });

  // ===================================================================
  // 對決盤面上的字（SPEC-v3 §4、§6；duel.js 可直接用，{x} 由 UI 代入）
  // ===================================================================
  C.duelText = {
    firstHand: '第一手：他多半丟最大的星。',
    pickHint: '點一顆星選牌',
    picked: '選好了：',
    again: '再點一次，或按丟',
    throwBtn: '丟！',
    pileLeft: '還有 {n} 張',
    lastPrefix: '上一手',
    shows: '他亮出',
    he: '他・', you: '你・',
    prevE: '他的上一手', prevP: '你的上一手',
    seeThrough: '看穿！',
    counter: '{who}{ace}{a}剋{b}',            // 你・冷門剋經典／他・經典剋硬蕊／你・王牌冷門剋經典
    aceWord: '王牌',
    mirror: '同一色比星　{x} 比 {y}',
    tie: '同一色、一樣多',
    nothing: '沒事',
    hitE: '他 −{n}', hitP: '你 −{n}',
    badgeWin: '勝', badgeLose: '負', badgeTie: '平',
    eyeMark: '盯',
    koWin: '品味勝出', koWinSub: '你贏了【{name}】。',
    koLose: '聲望歸零', koLoseRetry: '老闆：……再一場。',
    pileOut: '他的唱片丟完了', pileScore: '你 {p} 比 他 {e}：{who}贏',
    switchBubble: '……急了。',
    hp: '聲望', aceSlot: '王牌', aceOnce: '王牌 7 星・每場一次'
  };
  C.duelTextTag = '新';

  // ===================================================================
  // 規則卡（SPEC-v3 §0；「?」小抄與標題畫面共用；圖：v3/final/rule-card.png）
  // ===================================================================
  C.rules = {
    title: '品味對決・規則',
    sub: '三相剋決定每一手',
    lines: [
      '冷門剋經典，經典剋硬蕊，硬蕊剋冷門。',
      '他先亮出這手的唱片；你點自己唱片上的一顆星，兩邊一起丟。',
      '剋中的一方，用自己那顆星扣對方聲望；同一色就比星，多的扣差額。',
      '他名牌上那句是他的脾氣，他多半照著丟。',
      '王牌一軸 7 星，每場只能丟一次。',
      '聲望先歸零的輸；他的唱片丟完，聲望多的贏。'
    ],
    example: {
      title: '例：對「那張我有」', enemy: 'copycat', habit: 'copy',
      read: ['你上一手丟了冷門，所以他多半也丟冷門。', '硬蕊剋冷門：這手丟硬蕊。'],
      eLabel: '他亮出', eCard: 'weyes-blood-titanic-rising',
      pLabel: '你點', pCard: 'bark-psychosis-hex', pAttr: 'h',
      rowLabel: '他丟{attr} {n}'                   // 例子底下三行：他丟冷門 2／硬蕊 2／經典 5 → 結果由 engine.clash 算
    },
    relics: '發燒配件：自動生效，最多帶三件。',
    foot: ['點任何一張專輯＝唱片資訊。', '你 10 聲望；客人 14、菁英 16、傳說藏家 18。']
  };
  C.rulesTag = '新';

  // ===================================================================
  // 序章引導教學（SPEC-v3 §8；tutorial.js 讀這份）。對手＝序章男子，脾氣老實（照脾氣 100%），聲望 14。
  //   他的唱片照劇本翻：Coldplay 2/1/1 → Sigur Rós《Von》3/2/4 → 老王樂隊《暮夜徐行》3/4/2 → Imagine Dragons 3/1/1 → 其餘。
  //   你的手牌照劇本：三手都是剋中、不會掉血。傷害：殿堂 3+5+4、流亡 4+5+3、異端 3+5+5，第四手任何剋中都收得掉。
  //   script[tier]＝engine.startDuel 的 opts.script（startFight(run, C, {tutorial:true}) 會自己帶）。
  //   steps：kind：say＝說明（點任何地方繼續）、do＝操作（只有 allow 的動作有效）、soft＝建議（壓暗 40%，不擋）。
  //     target：data-tut 名稱（duel.js）；'chip:best:<attr>'＝你手牌上那一色最大的星（engine.bestChip，**不含王牌**，並列取最左）。
  //     allow：{chip:{i:'best'|'any'|0..2, attr}} 選星；{throw:true} 丟（再點同一顆星也算）；{ace:true}；{info:'slot-e'}；{close:true}
  //     tri：要亮的三角邊（'oc' 冷剋經、'ch' 經剋硬、'ho' 硬剋冷）；point：手指（沒寫＝target[0]；false＝不給手指）；
  //     learn：這步結束後飛一張「學會了：…」小卡進頂欄「?」。每句 ≤25 字。
  // ===================================================================
  var TUT_RECORDS = ['coldplay-mylo-xyloto', 'sigur-ros-von', '老王樂隊-暮夜徐行', 'imagine-dragons-night-visions',
    'westlife-coast-to-coast', 'katy-perry-prism', 'oasis-be-here-now'];
  var TUT_ATTRS = ['c', 'h', 'o', 'c'];
  var TUT_HANDS = {
    hall:   { hand: ['vashti-bunyan-just-another-diamond-day', 'david-bowie-low', 'scott-walker-tilt'],
              draw: ['can-ege-bamyasi', 'david-bowie-never-let-me-down', 'miles-davis-you-re-under-arrest', 'devo-oh-no-it-s-devo'] },
    pearl:  { hand: ['黃小楨-賞味期限', 'bark-psychosis-hex', 'karen-dalton-in-my-own-time'],
              draw: ['傷心欲絕-我愛您', 'devo-oh-no-it-s-devo', 'miles-davis-you-re-under-arrest', 'david-bowie-never-let-me-down'] },
    heresy: { hand: ['pharoah-sanders-tauhid', 'the-velvet-underground-white-light-white-heat', 'melt-banana-speak-squeak-creak'],
              draw: ['einsturzende-neubauten-halber-mensch', 'devo-oh-no-it-s-devo', 'miles-davis-you-re-under-arrest', 'david-bowie-never-let-me-down'] }
  };
  C.tutorial = {
    hp: 14,
    records: TUT_RECORDS,
    attrs: TUT_ATTRS,
    hands: TUT_HANDS,
    script: {},
    expect: { hall: [3, 5, 4], pearl: [4, 5, 3], heresy: [3, 5, 5] },     // 前三手他扣多少（照手指點最大的星）
    steps: [
      { id: 't1', kind: 'say', target: ['e-habit'], text: '這是他的脾氣。他多半照著丟。', bubble: 'below', tag: '新' },
      { id: 't2', kind: 'say', target: ['e-stars'], text: '只認排行榜：他會丟最大的星，經典。', colorChars: true, bubble: 'below', tag: '新' },
      { id: 't3', kind: 'say', target: ['tri'], tri: ['oc'], text: '冷門剋經典。', tag: '新' },
      { id: 't4', kind: 'do', target: ['chip:best:o'], allow: { chip: { i: 'best', attr: 'o' } }, tri: ['oc'], text: '點這顆冷門。', bubble: 'above', tag: '新' },
      { id: 't5', kind: 'do', target: ['chip:best:o', 'throw'], point: 'throw', allow: { throw: true }, tri: ['oc'], text: '再點一下，丟！', bubble: 'above', tag: '新' },
      { id: 't6', kind: 'say', target: ['result'], text: '剋中：用你那顆星扣他。', learn: 'L1', tag: '新' },
      { id: 't7', kind: 'do', target: ['chip:best:c'], allow: { chip: { i: 'best', attr: 'c' } }, tri: ['ch'], text: '他最大的是硬蕊。經典剋硬蕊。', bubble: 'above', tag: '新' },
      { id: 't8', kind: 'do', target: ['chip:best:c', 'throw'], point: 'throw', allow: { throw: true }, tri: ['ch'], text: '丟！', learn: 'L2', bubble: 'above', tag: '新' },
      { id: 't9', kind: 'do', target: ['hand'], point: false, allow: { chip: { i: 'any', attr: 'h' }, throw: true }, tri: ['ho'], text: '冷門最大。剋冷門的是哪個？', learn: 'L3', bubble: 'above', tag: '新' },
      { id: 't10', kind: 'soft', target: ['hand-ace'], text: '王牌 7 星，每場一次。接下來自己來。', learn: 'L4', tag: '新' }
    ],
    learned: { L1: '冷門剋經典', L2: '經典剋硬蕊', L3: '硬蕊剋冷門', L4: '王牌：7 星，每場一次' },
    ui: {
      who: '老闆', learnedPrefix: '學會了：', wrong: '先點我指的這裡。',
      skipTut: '跳過教學', replay: '重看教學', start: '▶ 品味對決', skip: '▶ 直接開打（我會玩）', learnedTitle: '學會的規則'
    },
    uiTag: '新'
  };
  ['hall', 'pearl', 'heresy'].forEach(function (t) {
    C.tutorial.script[t] = { records: TUT_RECORDS.slice(), attrs: TUT_ATTRS.slice(), hand: TUT_HANDS[t].hand.slice(), draw: TUT_HANDS[t].draw.slice() };
  });

  // ===================================================================
  // 店裡熱點的一句話、今晚來客、台北地圖預告（ui.js 讀這些鍵，沒有的鍵就不出那句）
  //   牆上的唱片＝唱片資訊；箱子＝翻那一箱（bins，點封面＝唱片資訊，沒有遊戲效果）；試聽機＝放一張你唱片櫃裡的；老闆／店貓＝一句話。
  //   來源標記在 shopLineTags（同形狀）。
  // ===================================================================
  var RAW_SHOP = {
    cat: L('……喵。', '新'),
    poster: L('冷門剋經典，經典剋硬蕊，硬蕊剋冷門。', '新'),   // 公告：點了開規則卡
    locked: L('這間還沒開。', '新'),
    ownerHint: {
      title: L('外面雨大，進來坐。', '新'),
      scene: L('慢慢看，不趕你。', '新'),
      night: L('今晚的客人，一個一個來。', '新'),
      duel: L('先看他名牌上那句。', '新'),
      reward: L('收好，別折到封套。', '新')
    },
    nightIntro: [L('今晚的客人，一個一個來。', '新'), L('點頭像，先看他的脾氣。', '新')],
    bin: L('慢慢翻。點封面看唱片資訊。', '新'),
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
  C.shopLineWho = { cat: '店貓', poster: '老闆', locked: '（畫面字）', ownerHint: '老闆', nightIntro: '老闆', bin: '老闆', booth: '老闆', boothEmpty: '老闆',
    titleHint: '（畫面字）', taipeiHere: '（畫面字）', taipeiNote: '（畫面字）', taipeiLink: '（畫面字）', backToShop: '（畫面字）' };

  // 店裡三個箱子（只給翻；點封面＝唱片資訊，沒有遊戲效果）
  C.bins = {
    jazz:  { label: '爵士區', ids: ['joe-harriott-free-form', 'andrew-cyrille-what-about', 'kenny-wheeler-gnu-high', '明田川荘之-yamazaki-blues', '菊地雅章-end-for-the-beginning', 'kenny-burrell-midnight-blue'] },
    tw:    { label: '台灣區', ids: ['交工樂隊-我等就來唱山歌', '傷心欲絕-還是偶爾想要偉大', '林生祥-種樹', '老王樂隊-暮夜徐行', '美秀集團-amazing-show-多色寶山大王', '大象體操-elephant-gym-角度'] },
    noise: { label: '噪音區', ids: ['merzbow-noisembryo', 'masonna-mademoiselle-anne-sanglante-ou-notre-nymphomanie-aur', 'melt-banana-scratch-or-stitch', 'peter-brotzmann-nipples', 'venetian-snares-detrimentalist', 'sunn-o-life-metal'] }
  };

  // 結算三件事（SPEC-v3 §9）
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
