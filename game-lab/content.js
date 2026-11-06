/* content.js：品味對決・試做版的純資料（SPEC §7.2）。Agent B。
 *
 * 瀏覽器：讀 window.DipLabCards（cards.js 先載入），輸出 window.DipLabContent。
 * Node：require('./cards.js')，module.exports = 同一份物件。
 * 只有資料，沒有邏輯；engine.js 只讀不改。
 *
 * 文案慣例（店主規則）：
 *   - script 的 Beat.text：說話者的台詞包在「」裡（同現行 RPG_BEATS）；旁白第二人稱「你」、不加「」。
 *   - lines.*（對決泡泡、老闆小聲提點）：不加「」，由 UI 決定怎麼框。
 *   - 不用破折號；櫃檯、硬蕊、發燒配件、唱片資訊；「派對」不出現。
 *   - 每一句都有來源標記：script 的 Beat.tag；lines／hints 的標記在 lineTags／hintTags（同形狀、平行的表）。
 *     標記值：'原句'＝現行 roguelike.html 一字不改、'拍板'＝店主親定、'新'＝試做版新寫、
 *            '新:A'～'新:D'＝取自四份概念稿（同樣是新句、待店主過目）。lint-copy.mjs 依此產生 LINES-REVIEW.md。
 *   - {lastAttr} 由 UI 代入 ZH 名稱（經典／冷門／硬蕊）。
 */
(function (root, factory) {
  var cards = (typeof module === 'object' && module.exports) ? require('./cards.js') : root.DipLabCards;
  var content = factory(cards || {});
  if (typeof module === 'object' && module.exports) module.exports = content;
  else root.DipLabContent = content;
})(typeof self !== 'undefined' ? self : this, function (CARDS) {
  'use strict';
  var C = {};
  C.version = 'lab-1';
  C.cards = CARDS;

  // ===================================================================
  // 王牌、耳朵、老闆送的四張、門口一百塊三張（§3.5、§4.2）
  // ===================================================================
  C.aces = { hall: 'radiohead-ok-computer', pearl: 'barney-wilen-zodiac', heresy: 'swans-filth' };
  C.aceTitle = { hall: '殿堂', pearl: '流亡', heresy: '異端' };          // 王牌名（附錄 D）
  C.aceAxis = { hall: 'c', pearl: 'o', heresy: 'h' };                    // 7 星那軸
  C.ears = {
    hall:   { name: '老派耳朵', desc: '出經典多回 1 聲望' },
    pearl:  { name: '挖盤狂',   desc: '出冷門多 +1 氣勢' },
    heresy: { name: '噪音信徒', desc: '硬蕊剋中多 +1 傷害' }
  };
  C.acePassives = {
    hall:   { name: '眾望所歸', desc: '打出時他氣勢 −2' },
    pearl:  { name: '私盤特攻', desc: '剋中時氣勢 +4' },
    heresy: { name: '終極解構', desc: '打出時他氣勢歸零' }
  };
  C.gifts = {
    hall:   ['david-bowie-low', 'vashti-bunyan-just-another-diamond-day', 'scott-walker-tilt', 'can-ege-bamyasi'],
    pearl:  ['karen-dalton-in-my-own-time', 'bark-psychosis-hex', '黃小楨-賞味期限', '傷心欲絕-我愛您'],
    heresy: ['the-velvet-underground-white-light-white-heat', 'melt-banana-speak-squeak-creak', 'pharoah-sanders-tauhid', 'einsturzende-neubauten-halber-mensch']
  };
  C.junk = ['david-bowie-never-let-me-down', 'miles-davis-you-re-under-arrest', 'devo-oh-no-it-s-devo'];
  C.junkLabel = '門口一百塊三張';

  // ===================================================================
  // 發燒配件（12 件，§3.8；icon＝PIX_ICONS_LV 的鍵，畫 [icon][0]）
  // ===================================================================
  C.relics = {
    dustcover:  { id: 'dustcover',  name: '防塵套',     icon: 'dustcover',  desc: '每場第一次被剋，傷害減一半。' },
    stylus:     { id: 'stylus',     name: '黑膠唱針',   icon: 'stylus',     desc: '每場第一次剋中，傷害 +2。' },
    cleaner:    { id: 'cleaner',    name: '洗碟水',     icon: 'cleaner',    desc: '每場勝利多回 3 聲望。' },
    headphone:  { id: 'headphone',  name: '監聽耳機',   icon: 'headphone',  desc: '每場開打，他的「？」格直接翻開。',
                  line: '戴上這個。誰在說謊，聽得出來。', lineTag: '新' },
    gauge:      { id: 'gauge',      name: '針壓計',     icon: 'gauge',      desc: '「盯」格一律當「真」。' },
    pointcard:  { id: 'pointcard',  name: '會員集點卡', icon: 'pointcard',  desc: '贏了多一個選項：再挑一張他的盤。' },
    obi:        { id: 'obi',        name: '原版側標',   icon: 'obi',        desc: '撞招贏時，傷害 +2。' },
    testpress:  { id: 'testpress',  name: '神秘見本盤', icon: 'testpress',  desc: '今晚第一次倒下時，以 6 聲望站起來。' },
    adapter45:  { id: 'adapter45',  name: '45 轉接環',  icon: 'adapter45',  desc: '每場開局氣勢 +2。' },
    matrix:     { id: 'matrix',     name: '內圈刻字',   icon: 'matrix',     desc: '品味輾壓傷害 +2。' },
    isolation:  { id: 'isolation',  name: '絕緣避震墊', icon: 'isolation',  desc: '割捨防禦多擋 2。' },
    firstpress: { id: 'firstpress', name: '首刻盤',     icon: 'firstpress', desc: '相生 3 連的傷害再 +2。' }
  };
  C.relicFallback = { hp: 4, label: '回 4 聲望' };   // 已有那件時改給這個（§3.8）

  // ===================================================================
  // 點播、地圖時間（§3.7、§2.6）
  // ===================================================================
  C.requests = { 'g:jazz': '爵士', 'g:electronic': '電子', 'g:folk': '民謠', 'y:<1980': '1980 年以前', 'y:>=2000': '2000 年以後', 'r:tw': '台灣', 'r:jp': '日本' };
  C.map = { times: ['21:30', '22:00', '22:40', '23:20', '00:10', '01:00', '02:00'] };

  // ===================================================================
  // 卡池（§3.9、§4.3）
  // ===================================================================
  C.pools = {
    crate: {
      jazz:  ['joe-harriott-free-form', 'andrew-cyrille-what-about', 'kenny-wheeler-gnu-high', '明田川荘之-yamazaki-blues', '菊地雅章-end-for-the-beginning', 'kenny-burrell-midnight-blue'],
      tw:    ['交工樂隊-我等就來唱山歌', '傷心欲絕-還是偶爾想要偉大', '林生祥-種樹', '老王樂隊-暮夜徐行', '美秀集團-amazing-show-多色寶山大王', '大象體操-elephant-gym-角度'],
      noise: ['merzbow-noisembryo', 'masonna-mademoiselle-anne-sanglante-ou-notre-nymphomanie-aur', 'melt-banana-scratch-or-stitch', 'peter-brotzmann-nipples', 'venetian-snares-detrimentalist', 'sunn-o-life-metal']
    },
    crateLabels: { jazz: '爵士區', tw: '台灣區', noise: '噪音區' },
    gold: ['barney-wilen-moshi', 'john-zorn-cobra', 'hermeto-pascoal-zabumbe-bum-a', 'tony-scott-the-indonesian-all-stars-djanger-bali', '富樫雅彦-we-now-create-music-for-strings-winds-and-percussions'],
    goldChance: 0.1,
    listen: ['fela-kuti-zombie', 'brian-eno-ambient-1-music-for-airports', 'merzbow-1930', 'bill-evans-waltz-for-debby', 'daft-punk-random-access-memories', 'vashti-bunyan-just-another-diamond-day', 'melt-banana-speak-squeak-creak', 'caetano-veloso-transa', '宇多田ヒカル-first-love'],
    tier1Relics: ['dustcover', 'stylus', 'cleaner'],
    eliteRelics: ['matrix', 'isolation', 'firstpress', 'headphone', 'gauge', 'obi', 'adapter45', 'testpress', 'pointcard']
  };

  // ===================================================================
  // 敵人（10 位，§4.1；數字都在 §8.2 模擬過，改了要重跑 sim.mjs）
  //   disc／phases[].disc：6 格字 id（true 真、feint 晃、copy 跟、grudge 報、eye 盯、hidden ？）
  //   ultAttr：'c'|'o'|'h'，或 'reflectable'（＝你的王牌剋得到的屬性）／'unreflectable'（＝剋你王牌那軸的屬性）
  //   stakePool：押盤池；Boss 是空陣列，因為他押的是「你沒選的那張王牌」（opts.enemyAce，見 §4.1、§7.1）
  // ===================================================================
  var T = 'true', F = 'feint', K = 'copy', G = 'grudge', Y = 'eye', H = 'hidden';
  C.enemies = {
    man: {
      id: 'man', name: '男子', title: null, spr: 'e0', avatar: null,
      blurb: '只聽排行榜。惱羞會反著出。',
      hp: 16, qi0: 0, qiRate: 0, ultAt: 99, ultAttr: 'c', taste: 'coh',
      disc: [T, T, T, T, T, F], hidden: null,
      phases: [{ atHp: 12, disc: [T, T, F, F, F, F] }],
      quirk: null, stake: [1, 1, 2, 2, 3],
      deck: ['coldplay-mylo-xyloto', 'westlife-coast-to-coast', 'imagine-dragons-night-visions', 'katy-perry-prism', 'oasis-be-here-now', 'linkin-park-one-more-light'],
      stakePool: ['fishmans-long-season'], relicOffer: null, requests: [],
      prologue: true, voice: { freq: 659, wave: 'square' }
    },
    copycat: {
      id: 'copycat', name: '那張我有', title: '文青同好', spr: 'e1', avatar: null,
      blurb: '你上一手出什麼，他就跟著出。',
      hp: 18, qi0: 0, qiRate: 0, ultAt: 6, ultAttr: 'c', taste: 'coh',
      disc: [K, K, T, T, G, F], hidden: null,
      phases: [{ atHp: 9, disc: [K, K, K, G, F, F] }],
      quirk: null, stake: null,
      deck: ['billie-eilish-when-we-all-fall-asleep-where-do-we-go', 'lorde-melodrama', 'beach-house-teen-dream', 'mitski-be-the-cowboy', 'weyes-blood-titanic-rising', 'japanese-breakfast-jubilee', 'clairo-immunity'],
      stakePool: ['宇多田ヒカル-first-love', 'nick-drake-bryter-layter'], relicOffer: 'pointcard', requests: ['y:>=2000', 'g:folk'],
      voice: { freq: 523, wave: 'square' }
    },
    already: {
      id: 'already', name: '我早就聽過', title: '社團學長', spr: 'e2', avatar: null,
      blurb: '專剋你上一手。還藏一手。',
      hp: 18, qi0: 0, qiRate: 0, ultAt: 6, ultAttr: 'h', taste: 'hco',
      disc: [G, G, T, F, H, H], hidden: K,
      phases: [{ atHp: 9, disc: [G, G, G, F, H, H] }],
      quirk: null, stake: null,
      deck: ['talk-talk-laughing-stock', 'robert-wyatt-rock-bottom', 'duster-stratosphere', 'broadcast-tender-buttons', 'squarepusher-ultravisitor', 'autechre-tri-repetae', 'xiu-xiu-fabulous-muscles'],
      stakePool: ['kate-bush-the-dreaming'], relicOffer: 'headphone', requests: ['g:electronic', 'y:<1980'],
      voice: { freq: 440, wave: 'square' }
    },
    needle: {
      id: 'needle', name: '針壓強迫症', title: '品味行家', spr: 'e6', avatar: null,
      blurb: '剋你手上最大張的那一軸。',
      hp: 18, qi0: 0, qiRate: 0, ultAt: 6, ultAttr: 'c', taste: 'coh',
      disc: [Y, Y, T, F, H, H], hidden: G,
      phases: [{ atHp: 9, disc: [Y, Y, Y, F, H, H] }],
      quirk: null, stake: null,
      deck: ['dire-straits-brothers-in-arms', 'steely-dan-gaucho', 'toto-toto-iv', 'boz-scaggs-silk-degrees', 'bill-evans-waltz-for-debby', 'art-pepper-art-pepper-meets-the-rhythm-section', 'kenny-burrell-midnight-blue'],
      stakePool: ['nick-drake-bryter-layter'], relicOffer: 'gauge', requests: ['g:jazz', 'y:<1980'],
      voice: { freq: 587, wave: 'triangle' }
    },
    skip: {
      id: 'skip', name: '跳針王', title: '二手店老闆', spr: 'e4', avatar: null,
      blurb: '不剋他，跳針就越疊越大聲。',
      hp: 18, qi0: 0, qiRate: 0, ultAt: 6, ultAttr: 'c', taste: 'coh',
      disc: [T, T, T, F, F, K], hidden: null,
      phases: [{ atHp: 9, disc: [T, T, T, F, F, F] }],
      quirk: { type: 'skip', step: 2, max: 6 }, stake: null,
      deck: ['the-band-music-from-big-pink', 'fela-kuti-zombie', 'caetano-veloso-transa', 'stevie-wonder-innervisions', 'herbie-hancock-maiden-voyage', 'john-coltrane-blue-train', 'daft-punk-random-access-memories'],
      stakePool: ['shuggie-otis-inspiration-information'], relicOffer: 'obi', requests: ['g:jazz', 'g:folk'],
      voice: { freq: 330, wave: 'square', jitter: 20 }
    },
    broke: {
      id: 'broke', name: '月底吃土', title: null, spr: null,
      avatar: { head: 'cap', hair: 'u', shirt: 'r', pants: 'd', skin: 's' },
      blurb: '什麼都想要一點，被逼急會全押。',
      hp: 14, qi0: 0, qiRate: 0, ultAt: 6, ultAttr: 'o', taste: 'och',
      disc: [T, F, K, G, Y, H], hidden: F,
      phases: [{ atHp: 6, ultAt: 4, disc: [T, F, K, G, Y, F] }],
      quirk: null, stake: null,
      deck: ['美秀集團-amazing-show-電火王', 'deca-joins-鳥鳥鳥', '宇宙人-地球漫步', '老王樂隊-吾日三省吾身', '陳珊妮-完美的呻吟', '雷光夏-summer-lei-黑暗之光', '生祥樂隊-圍庄'],
      stakePool: ['林生祥-種樹'], relicOffer: 'testpress', requests: ['r:tw', 'y:>=2000'],
      voice: { freq: 494, wave: 'square' }
    },
    buyer: {
      id: 'buyer', name: '剁手黨', title: null, spr: null,
      avatar: { head: 'fedora', hair: 'k', shirt: 'g', pants: 'k', skin: 't' },
      blurb: '氣勢漲得快，常放品味輾壓。',
      hp: 18, qi0: 0, qiRate: 2, ultAt: 6, ultAttr: 'reflectable', taste: 'coh',
      disc: [T, T, F, G, K, Y], hidden: null,
      phases: [{ atHp: 9, disc: [T, F, F, G, K, Y] }],
      quirk: null, stake: null,
      deck: ['mogwai-young-team', 'explosions-in-the-sky-the-earth-is-not-a-cold-dead-place', 'sigur-ros-takk', 'sigur-ros-von', 'william-basinski-the-disintegration-loops', 'brian-eno-ambient-1-music-for-airports', 'swans-soundtracks-for-the-blind'],
      stakePool: ['mogwai-come-on-die-young'], relicOffer: 'adapter45', requests: ['g:electronic', 'r:jp'],
      voice: { freq: 554, wave: 'square' }
    },
    label: {
      id: 'label', name: '冷門仙人', title: '地下廠牌主理人', spr: 'e5', avatar: null,
      blurb: '愛虛晃，氣勢漲得快。',
      hp: 22, qi0: 0, qiRate: 2, ultAt: 6, ultAttr: 'reflectable', taste: 'hoc',
      disc: [F, F, G, T, K, H], hidden: Y,
      phases: [{ atHp: 11, disc: [F, F, F, G, Y, T] }],
      quirk: null, stake: null,
      deck: ['merzbow-1930', 'this-heat-repeat', 'keiji-haino-watashi-dake', 'ruins-pallaschtom', 'dalek-negro-necro-nekros', '廢五金-廢五金', 'sunn-o-white1', 'lightning-bolt-wonderful-rainbow'],
      stakePool: ['roscoe-mitchell-sextet-sound'], relicOffer: null, requests: ['r:jp', 'r:tw'],
      elite: true, voice: { freq: 294, wave: 'sine' }
    },
    critic: {
      id: 'critic', name: '名盤守門員', title: '資深樂評', spr: 'e3', avatar: null,
      blurb: '盯你最大張，偶爾虛晃。',
      hp: 22, qi0: 0, qiRate: 2, ultAt: 6, ultAttr: 'reflectable', taste: 'ohc',
      disc: [Y, Y, G, T, F, H], hidden: K,
      phases: [{ atHp: 11, disc: [Y, Y, Y, G, F, K] }],
      quirk: null, stake: null,
      deck: ['tim-buckley-starsailor', 'throbbing-gristle-20-jazz-funk-greats', 'black-midi-schlagenheim', 'faust-faust-iv', 'silver-apples-silver-apples', 'popol-vuh-in-den-garten-pharaos', 'neu-neu', 'sun-ra-space-is-the-place'],
      stakePool: ['glenn-branca-the-ascension'], relicOffer: null, requests: ['y:<1980', 'g:electronic'],
      elite: true, voice: { freq: 392, wave: 'square' }
    },
    boss: {
      id: 'boss', name: '傳說藏家', title: null, spr: 'boss', avatar: null,
      blurb: 'A 面混著騙；翻面後盯你最大張，還帶著你沒選的那張王牌。',
      hp: 26, qi0: 2, qiRate: 1, ultAt: 7, ultAttr: 'unreflectable', taste: 'coh',   // A2 balance: 24→26 (SPEC §8.2 step ①)
      disc: [T, F, F, G, K, H], hidden: Y,
      phases: [{ atHp: 12, disc: [Y, Y, F, F, G, T], starPlus: 1, addAce: true }],
      quirk: null, stake: null,
      deck: ['交工樂隊-我等就來唱山歌', 'alice-coltrane-journey-in-satchidananda', 'shuggie-otis-inspiration-information', 'popol-vuh-hosianna-mantra', 'cornelius-fantasma', '坂本龍一-async', 'merzbow-venereology', 'kenny-wheeler-gnu-high'],
      stakePool: [], stakeIsUnchosenAce: true, relicOffer: null, requests: ['r:tw', 'g:jazz', 'r:jp'],
      boss: true, phaseLabels: ['A 面', 'B 面'], voice: { freq: 147, wave: 'sine' }
    }
  };
  C.normals = ['copycat', 'already', 'needle', 'skip', 'broke', 'buyer'];
  C.elites = ['label', 'critic'];
  C.prologueEnemy = 'man';
  C.boss = 'boss';
  C.voices = { owner: { freq: 196, wave: 'square' }, narrator: null };   // 打字機嗶聲（§4.1 末）

  // ===================================================================
  // 劇本（§2.3、§2.7）。Beat = { who, text, stage?, ui?, music?, prompt?, if?, stamp?, quietText?, tag }
  //   who：''＝旁白、'老闆'、'男子'、'藏家'、'player'
  //   stage：p／o／f＝站位鍵（RPG_POS）；door：'swing'|'open'|'shut'；notes／oBusy／anger：bool；oPath：走位陣列；fSpr：門口那位的小人鍵；
  //          give：'ace'|'gifts'|'junk'＝封面飛進王牌格／手牌列的演出（不開面板）
  //   ui：這句是「選擇句」，補完後亮 ▼，玩家點一下才展開面板（§2.2）：
  //       'guess' 猜歌、'acePick' 挑王牌、'retort' 回嘴（選項＝C.retorts，選完把 reply 當成男子的一句播出）、
  //       'duel' 進對決、'stake' 押盤翻開、'relic' 發燒配件三選一、'map' 進地圖
  //   music：'tonight' 開始播今晚那張（三張王牌之一）、'stake' 播押盤、'stop' 淡出
  //   prompt：面板上方的提示字（同現行 RPG_BEATS 的 prompt）
  //   if：條件句，只有符合時才播：'guessRight' 猜中、'guessWrong' 猜錯、'firstClear' 第一次通關；沒有 if 的一律播
  //   stamp：這句播出時一起蓋的章（例：好耳朵）
  //   quietText：靜音（或試聽沒出聲）時改用的文字
  // ===================================================================
  function P_START() { return { p: 'door', o: 'counter', f: 'out', door: 'swing' }; }
  var acePickBeat = { who: '', text: '（點封套換著聽，挑一張帶走。）', ui: 'acePick', tag: '新' };
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
    { who: '', text: '一名男子走進來。他的視線，落在你手上的那幾張專輯上。', stage: { f: 'in', p: 'atdoor', door: 'shut' }, tag: '原句' },
    { who: '男子', text: '「……這品味，也敢出來丟臉？」', tag: '原句' },
    { who: '', text: '你的憤怒表露無遺。', stage: { anger: true }, ui: 'retort', tag: '原句' },
    { who: '', text: '老闆不發一語，緩步走出櫃檯，站在兩人之間。', stage: { oPath: ['aisle', 'between'], anger: false }, tag: '拍板' },
    { who: '老闆', text: '「既然雙方都不服氣，不如來一場品味對決如何？」', ui: 'duel', prompt: '▶ 品味對決', tag: '原句' }
  ];
  C.script = {
    // 第一次玩（有聲音）：P1–P16，猜歌 → 挑王牌 → 回嘴 → 對決
    prologue: prologueHead.concat([
      { who: '老闆', text: P5, ui: 'guess', prompt: '剛才那段，是哪一張？', tag: '原句' },
      { who: '老闆', text: '「……你眼光真不錯。」老闆終於抬起頭來，看著你。', if: 'guessRight', stage: { oBusy: false },
        stamp: '好耳朵：今晚每場開局氣勢 +1', tag: '原句' },
      { who: '老闆', text: '「不是這張。不過，你挑的這張也不壞。」', if: 'guessWrong', stage: { oBusy: false }, tag: '新' },
      acePickBeat
    ], prologueTail),
    // 沒開聲音（安靜地推門、音訊被擋、2.5 秒內試聽沒出聲）：猜歌整段跳過，P5 直接進挑王牌，不給好耳朵
    quietPrologue: prologueHead.map(function (b) { return b.music ? { who: b.who, text: b.text, stage: b.stage, tag: b.tag } : b; }).concat([
      { who: '老闆', text: P5, ui: 'acePick', prompt: '（挑一張帶走。）', stage: { oBusy: false }, tag: '原句' }
    ], prologueTail),
    // 序章收尾（贏了男子）：押盤 Fishmans 翻開 → 發燒配件三選一
    epilogueWin: [
      { who: '男子', text: '「……哼。」他把自己的唱片塞回袋子裡，看都不看你一眼。', stage: { p: 'atdoor', o: 'between', f: 'in', fSpr: 'e0', anger: false, notes: false }, tag: '原句' },
      { who: '男子', text: '「搵休督欸丟！」', tag: '原句' },
      { who: '', text: '他的袋子裡掉出一張盤。', stage: { f: 'out', door: 'swing' }, ui: 'stake', music: 'stake', tag: '新' },
      { who: '老闆', text: '「……他每個禮拜都來聽這張。」', stage: { o: 'between' }, tag: '新' },
      { who: '老闆', text: '「我看你對音樂脈絡，很有天份。」', tag: '原句' },
      { who: '老闆', text: '「我這邊有一些被我淘汰的設備，你挑一個，帶回去吧。」', ui: 'relic', prompt: '（老闆從長桌底下拖出一個木箱。）', tag: '原句' }
    ],
    // 配件挑完 → 今晚的地圖
    afterPrologue: [
      { who: '', text: '你正要道謝，門又開了。', stage: { f: 'door', door: 'open' }, tag: '原句' },
      { who: '老闆', text: '「今晚是交流夜。人會越來越多。」', ui: 'map', tag: '新' }
    ],
    // 02:00 打烊前，傳說藏家推門
    bossEnter: [
      { who: '', text: '這時，門開了。', stage: { p: 'atdoor', o: 'counter', f: 'door', fSpr: 'boss', door: 'open' }, tag: '原句' },
      { who: '藏家', text: '「聽說這裡有個新來的，品味不錯？」', stage: { f: 'in', door: 'shut' }, stamp: '三十年的耳朵，不會騙人。', ui: 'duel', prompt: '▶ 品味對決', tag: '原句' }
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
    // 再來一夜（≤10 秒）：門 swing → 三張王牌 → 地圖 c1
    again: [
      { who: '老闆', text: '「……又是你。」', stage: P_START(), tag: '新' },
      { who: '', text: '（點封套換著聽，挑一張帶走。）', quietText: '（挑一張帶走。）', ui: 'acePick', tag: '新' }
    ]
  };

  // 玩家第一次有台詞（P13 的回嘴）；reply 由男子說，當成一句 Beat 播出
  C.retorts = [
    { label: '你耳機裡那張，是《Mylo Xyloto》吧。', reply: '「……那張也是 Coldplay 好嗎！」', tag: '新' },
    { label: '……（把唱片抱緊）', reply: '「哼，抱那麼緊，怕被笑喔？」', tag: '新' }
  ];

  // ===================================================================
  // 台詞（§4.1 台詞表）。lines[誰][鍵]＝字串或字串陣列；lineTags 同形狀，記每句的來源標記。
  //   鍵：intro 開場、bubble 喊氣場時的口頭禪（每手隨機一句、不連續重複）、countered 被你剋中、hit 剋中你、
  //       faceChange 變臉、habit ？第一次翻開、ultWarn 殺氣騰騰那手、aceOut（Boss）王牌翻出、lose 你贏時、win 你輸時
  // ===================================================================
  function L(text, tag) { return { _t: text, _g: tag }; }
  var RAW_LINES = {
    owner: {
      retry: L('……再一場。', '新'),                       // 序章輸了，3 秒內同牌組重打
      gold: L('這張……本來沒要賣的。', '新'),               // 挖箱翻出店主私藏金邊盤
      listenRight: L('對，就是這張。', '新'),              // 試聽機猜中
      listenWrong: L('是這張。下次就認得了。', '新'),        // 試聽機猜錯
      tea: L('茶還燙，慢慢喝。', '新'),                     // 櫃檯：喝杯茶
      wash: L('洗乾淨了，聲音會回來一點。', '新'),          // 櫃檯：洗一張盤
      bagFull: L('包包滿了。先拿一張出來。', '新')           // 包包 12 張，要先丟一張
    },
    player: {
      revive: L('還沒完。', '新')                           // 神秘見本盤站起來
    },
    man: {
      intro: L('……這品味，也敢出來丟臉？', '原句'),
      bubble: [L('這張排行榜第一名欸。', '新:C'), L('大家都在聽這個啦。', '新')],
      countered: [L('你那什麼？聽都沒聽過。', '新:B')],
      hit: [L('看吧，大家都聽這個。', '新')],
      faceChange: L('你很會嘛？再出{lastAttr}試試看！', '新:A'),
      lose: [L('……哼。', '原句'), L('搵休督欸丟！', '原句')],
      win: L('回家多聽兩年再來啦。', '新:A')
    },
    copycat: {
      intro: L('欸你那張哪裡買的？', '新:C'),
      bubble: [L('我也有！我也有！', '新:D'), L('最近大家都在聽這種的吧？', '新:A')],
      countered: [L('等等，我先查一下這張是誰。', '新:D')],
      hit: [L('你剛剛那招，我學起來了。', '新:C')],
      faceChange: L('欸你剛那張叫什麼？我馬上下單。', '新:D'),
      ultWarn: L('這張我也有，而且是彩膠。', '新'),
      lose: [L('我回去也要買一張。', '新:A')],
      win: L('那張我有，兩張。', '新')
    },
    already: {
      intro: L('這張？我高中就聽過了。', '新:D'),
      bubble: [L('真正懂的人都知道……', '新:D'), L('學弟，這張要聽原版。', '新:A')],
      countered: [L('哼。這招我早就聽過。', '新:D')],
      hit: [L('你放的我都有，我的還是日版側標。', '新:B')],
      faceChange: L('這張日本盤有 bonus track，你知道嗎？', '新:D'),
      habit: L('……其實我也想聽聽看你那張。', '新'),
      ultWarn: L('這張的初版，我也有。', '新'),
      lose: [L('……這張我真的沒聽過。可以借我嗎？', '新:B')],
      win: L('回去把黑膠版聽完再來。', '新:A')
    },
    needle: {
      intro: L('你這張是幾版？', '新:D'),
      bubble: [L('我的器材比較準。', '新:D')],
      countered: [L('一定是你的唱針沒調好。', '新:D')],
      hit: [L('你最大那張，我盯很久了。', '新')],
      faceChange: L('你的唱針該換了。', '新:D'),
      habit: L('剛剛那手，我記下來了。', '新'),
      ultWarn: L('針壓兩克，剛剛好。', '新'),
      lose: [L('……我回去重新校正。', '新:D')],
      win: L('先把唱臂調平再來。', '新')
    },
    skip: {
      intro: L('欸，這段剛剛是不是聽過了？', '新:B'),
      bubble: [L('我這台唱盤很有個性。', '新:B'), L('看看就好，不要摸。', '新:A')],
      countered: [L('……喔，順了。', '新')],
      hit: [L('跳針啦！', '新:B')],
      faceChange: L('少年仔，這張你阿公那時陣就在聽了。', '新:C'),
      ultWarn: L('這段再來一次！', '新'),
      lose: [L('……我真的該換唱針了。', '新:B')],
      win: L('好聽的段落，就是要多聽幾次。', '新')
    },
    broke: {
      intro: L('這個月又爆預算了……', '新:D'),
      bubble: [L('隨便啦，反正都刷了。', '新:D')],
      countered: [L('我的伙食費……', '新:D')],
      hit: [L('這張是我這個月的便當錢。', '新')],
      faceChange: L('這個月的伙食費，全押了！', '新:D'),
      habit: L('其實我根本還沒拆封。', '新'),
      ultWarn: L('信用卡，刷下去！', '新'),
      lose: [L('這張……先寄放你那邊。', '新:D')],
      win: L('贏了，這禮拜可以吃滷肉飯加蛋。', '新')
    },
    buyer: {
      intro: L('這三張我都買兩份，一份聽、一份收。', '新:B'),
      bubble: [L('月底？月底再說。', '新:B')],
      countered: [L('沒關係，我再買一張。', '新')],
      hit: [L('又入手一張！', '新:B')],
      faceChange: L('限量彩膠，最後一張了喔。', '新:D'),
      ultWarn: L('全部帶走，不用包！', '新'),
      lose: [L('……我先去領個錢。', '新:B')],
      win: L('謝謝光臨，下次請早。', '新')
    },
    label: {
      intro: L('這張全世界只壓了三百張。我有兩張。', '新:B'),
      bubble: [L('你沒聽過很正常。', '新:B'), L('拿主流盤來？', '新:A')],
      countered: [L('嗯，有點東西。', '新:D')],
      hit: [L('這張壓了三百張，到現在還賣不完。', '新:A')],
      faceChange: L('這張的母帶，只有我有。', '新:D'),
      habit: L('你手上那張，我們廠牌也發過。', '新'),
      ultWarn: L('音量開到十一。', '新:D'),
      lose: [L('……下一批，算你一張。', '新:A')],
      win: L('旋律太多了，下次少一點。', '新')
    },
    critic: {
      intro: L('我寫過這張的樂評。', '新:A'),
      bubble: [L('這張我在專欄寫過三千字。', '新:C')],
      countered: [L('……我會寫進專欄。', '新:A')],
      hit: [L('三顆星，不能再多。', '新:A')],
      faceChange: L('你懂什麼叫脈絡嗎？', '新:C'),
      habit: L('你那張，我也給過五顆星。', '新'),
      ultWarn: L('這篇樂評，今晚就上稿。', '新'),
      lose: [L('……這張，我重寫一篇。', '新')],
      win: L('回去把年表背熟。', '新')
    },
    boss: {
      intro: L('聽說這裡有個新來的，品味不錯？', '原句'),
      stampSub: L('三十年的耳朵，不會騙人。', '原句'),      // 出場蓋章的副標
      bubble: [L('你猜，我這手是真的嗎？', '新:A')],
      countered: [L('有意思。', '新')],
      hit: [L('這張，我三十年前就有了。', '新:B')],
      faceChange: L('……翻面。讓我看看你手上拿的是什麼。', '新:A'),
      habit: L('你最大那張，我也有。', '新'),
      ultWarn: L('收藏是一種病。我病了五十年。', '新:C'),
      aceOut: L('這張，我只在打烊之後放。', '新:B'),
      lose: [L('……這張，送你。三十年前，我也是這樣拿到的。', '新:A')],
      win: L('我的木箱裡，沒有一張爛盤。', '原句')
    }
  };
  function pick(raw, which) {
    if (raw && typeof raw === 'object' && '_t' in raw) return which === 't' ? raw._t : raw._g;
    if (Array.isArray(raw)) return raw.map(function (x) { return pick(x, which); });
    var o = {}; for (var k in raw) o[k] = pick(raw[k], which); return o;
  }
  C.lines = pick(RAW_LINES, 't');
  C.lineTags = pick(RAW_LINES, 'g');

  // ===================================================================
  // 不擋手的教學（§2.5）：老闆頭上的小泡泡，≤20 字，一個存檔只出一次
  // ===================================================================
  C.hints = {
    h_counter: '他喊經典。冷門剋經典。',
    h_forecast: '格子顏色＝他會出的；數字＝結果。',
    h_face: '他惱羞了。四格是「晃」。',
    h_feint: '晃：出剋你剋招的那個。',
    h_ult: '氣勢滿了。現在放，或存到更痛。',
    h_ace: '王牌每場一次，被剋就白用。',
    h_eult: '他要輾壓。出剋它的盤割捨防禦。',
    h_reflect: '你的王牌剋得到它：七星回擊。',
    h_chain: '相生：經→冷→硬→經，加氣勢。',
    h_request: '點播的盤，出招 +2。',
    h_copy: '跟＝出你上一手。',
    h_grudge: '報＝剋你上一手。',
    h_eye: '盯＝剋你最大張。',
    h_hidden: '？＝還沒看過的習慣。',
    h_skip: '不剋他，跳針就越疊越大聲。',
    h_hegemony: '王牌被剋：這手互不傷害。'
  };
  C.hintTags = {};
  Object.keys(C.hints).forEach(function (k) { C.hintTags[k] = '新'; });
  // 觸發條件（給 duel.js／ui.js 對照用；判斷仍由 UI 依事件做）
  C.hintWhen = {
    h_counter: '序章第 1 手', h_forecast: '第一次點選一張盤', h_face: '第一次變臉', h_feint: '第一次揭曉到晃',
    h_ult: '你第一次氣勢 ≥6', h_ace: '序章第 2 手', h_eult: '第一次看到殺氣騰騰', h_reflect: '第一次「你的王牌剋得到他的輾壓」',
    h_chain: '第一次接成 2 連', h_request: '第一次有點播的對決', h_copy: '第一次看到「跟」格', h_grudge: '第一次看到「報」格',
    h_eye: '第一次看到「盯」格', h_hidden: '第一次看到 ？ 格', h_skip: '第一次遇到跳針王', h_hegemony: '第一次出現霸權'
  };

  // 「？」小抄（右上，隨時可開，≤200 字；上方另畫一張相剋三角圖）
  C.help = '冷門剋經典・經典剋硬蕊・硬蕊剋冷門。剋中：賭注＋（你的星－他那張同屬性的星，不會是負的）。撞招：同屬性比星，差多少打多少。相生：經→冷→硬→經，2 連 +1 氣勢、3 連 +2 氣勢再 +2 傷害。氣場唱盤：六格隨機落一格。真＝照喊的出；晃＝出剋你剋招的；跟＝出你上一手；報＝剋你上一手；盯＝剋你最大張；？＝還沒看過。氣勢 6 起可放品味輾壓：傷害＝當下氣勢，他這手作廢。';
  C.helpTag = '新';

  // 第一次通關後的剪影預告（§2.7、§6.8）
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

  // ===================================================================
  // 事件（7 則，§4.4；每晚抽 2；後果先寫在選項上，沒有隨機結果）
  //   Event = { id, title, text, tag, options:[{ label, note, result, needsCard?, minDeck?, effects:EffectSpec[] }] }
  //   note＝選項鈕第二行的後果小字（12px）；result＝選完之後的一句。
  //   EffectSpec：{hp:n} | {nextStartQi:n} | {giveAwayPicked:true}（從包包挑一張送出） | {gainRelic:id, elseHp:n}
  //             | {gainFromPool:'crate'|'gold', minus1?:true}（先亮出再收進包包；minus1＝三軸各 −1，最低 1，標「九成新」）
  //             | {starUpPicked:'h'}（從包包挑一張，那軸 +1，上限 5）
  //   needsCard：要先從包包挑一張盤；minDeck：包包至少要幾張才可選（送盤＝6，送完仍 ≥5）
  // ===================================================================
  C.events = [
    { id: 'delivery', title: '躲雨的外送員', tag: '新',
      text: '外送員衝進來躲雨，耳機漏音大到整間店都聽得到。',
      options: [
        { label: '借他毛巾', note: '回 4 聲望', result: '他點點頭，雨還在下。', effects: [{ hp: 4 }] },
        { label: '推薦他一張', note: '從包包挑一張送他，下一場開局氣勢 +3（包包 6 張以上）', result: '他說下次會來買。',
          needsCard: true, minDeck: 6, effects: [{ giveAwayPicked: true }, { nextStartQi: 3 }] }
      ] },
    { id: 'auntie', title: '滷味攤阿姨', tag: '新',
      text: '隔壁滷味攤的阿姨來借插座，順手塞給你一包米血。',
      options: [
        { label: '吃', note: '回 5 聲望', result: '米血還是熱的。', effects: [{ hp: 5 }] },
        { label: '回送她一張盤', note: '從包包挑一張送她，拿到「會員集點卡」（已有則回 5 聲望；包包 6 張以上）',
          result: '她從圍裙口袋掏出一張集點卡：「這間我很熟，拿去。」',
          needsCard: true, minDeck: 6, effects: [{ giveAwayPicked: true }, { gainRelic: 'pointcard', elseHp: 5 }] }
      ] },
    { id: 'cat', title: '店貓', tag: '新',
      text: '店貓睡在你想翻的那箱上。',
      options: [
        { label: '等牠醒', note: '回 3 聲望', result: '牠伸了個懶腰，換到隔壁那箱繼續睡。', effects: [{ hp: 3 }] },
        { label: '輕輕抽出來', note: '拿到那箱最上面那張（先亮給你看），被抓一下 −3 聲望', result: '抽出來了。手背多了三條紅線。',
          effects: [{ gainFromPool: 'crate' }, { hp: -3 }] }
      ] },
    { id: 'rsd', title: '明天要不要排', tag: '新',
      text: '一位客人在櫃檯問大家：明天 RSD 要不要去排？',
      options: [
        { label: '陪他去排', note: '−4 聲望，得到一張店主私藏金邊盤（先亮給你看）', result: '老闆聽到了，默默從櫃檯底下抽出一張盤，推到你面前。',
          effects: [{ hp: -4 }, { gainFromPool: 'gold' }] },
        { label: '反正明年會再版', note: '回 2 聲望，下一場開局氣勢 +1', result: '客人想了想：「也是。」',
          effects: [{ hp: 2 }, { nextStartQi: 1 }] }
      ] },
    { id: 'analog', title: '類比還是數位', tag: '新',
      text: '兩個大叔在櫃檯前吵類比跟數位，吵到要你評評理。',
      options: [
        { label: '站類比', note: '包包裡一張盤的硬蕊 +1（你挑，上限 5），吵到口乾 −2 聲望', result: '類比大叔拍拍你的肩。你嗓子啞了。',
          needsCard: true, effects: [{ starUpPicked: 'h' }, { hp: -2 }] },
        { label: '站數位', note: '下一場開局氣勢 +3', result: '數位大叔請你喝了一罐咖啡。', effects: [{ nextStartQi: 3 }] },
        { label: '默默走開', note: '回 2 聲望', result: '他們吵到現在，都沒發現你走了。', effects: [{ hp: 2 }] }
      ] },
    { id: 'firstpress', title: '這張是不是初版', tag: '新',
      text: '有人拿著你手上的盤問：「這張是不是初版？」',
      options: [
        { label: '自信地說是', note: '下一場開局氣勢 +3', result: '他肅然起敬。你自己也不太確定。', effects: [{ nextStartQi: 3 }] },
        { label: '老實說不知道', note: '回 3 聲望', result: '「我也不知道。」他笑了。', effects: [{ hp: 3 }] }
      ] },
    { id: 'ninetynine', title: '九成新', tag: '新',
      text: '客人把手機遞過來：網拍寫「九成新，聽不到十次」。',
      options: [
        { label: '下標', note: '得到一張盤（先亮給你看），但三軸各 −1（最低 1，盤上標「九成新」）', result: '寄來了。封套上有一圈咖啡漬。',
          effects: [{ gainFromPool: 'crate', minus1: true }] },
        { label: '算了', note: '什麼都沒發生', result: '你把手機還給他。', effects: [] }
      ] }
  ];

  return C;
});
