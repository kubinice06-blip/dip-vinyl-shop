/* content.js：品味對決 v4 的純資料（SPEC-v4 §2.2、§4；第一波 A1）。
 *
 * 瀏覽器：讀 window.DipLabCards（cards.js 先載入）、window.DipLabPool（cards-pool.js，可沒有）與 window.DipLabBins（bins.js，可沒有），輸出 window.DipLabContent，
 *   並把 window.DipLabCards 換成展開後的整池（C.cards；cardinfo.js、stage.js 呼叫當下才讀它）。
 * Node：require('./cards.js')、try require('./cards-pool.js')、try require('./bins.js')，module.exports = 同一份物件；展開後再 try 套 ./cards-media.json（封面、試聽）。
 *   require('./cards.js') 永遠只有核心 368 張（C.cards 是另一個新物件）；要整池一律讀 require('./content.js').cards。
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
  // 精選新卡（第 B 波 SPEC-B §1.3；cards-pool.js，bake-cards.mjs --pool-only 產生）：沒有＝只有核心 368 張（dev harness 不載；正式頁沒載到 C.poolLoaded false → ui.js 整份唯讀）
  var pool = node ? (function () { try { return require('./cards-pool.js'); } catch (_) { return null; } })() : (root.DipLabPool || null);
  var content = factory(cards || {}, bins || {}, pool);
  if (node) {
    // Node（sim、tests、tools）：封面／試聽也套上（瀏覽器由 ui.js 在標題畫好後 fetch cards-media.json 再套）
    try { content.attachMedia(require('./cards-media.json')); } catch (_) {}
    module.exports = content;
  } else {
    root.DipLabContent = content;
    root.DipLabCards = content.cards;     // 整池（新物件）；cards.js 的匯出物件不動
  }
})(typeof self !== 'undefined' ? self : this, function (CARDS, BINS, POOL) {
  'use strict';
  var C = {};
  C.version = 'lab-4';
  // 卡池（第 B 波 SPEC-B §1.2／§1.3）：核心 368 張（cards.js）＋精選新卡（cards-pool.js 展開，pool: true）。C.cards 是新物件（不改 cards.js 的匯出）。
  C.cards = Object.assign({}, CARDS);
  // 卡片 id（第 B 波 SPEC-B §1.1）：一律是主站 catalogId＝(藝人+'|'+專輯).toLowerCase()、斜線換連字號（＝主站 index.html cardIdOf、bake-cards.mjs catalogId、
  //   dip-tune.js idOf、主站唱片櫃 Firestore 文件 id）。含 | 與空白，可能有 ' " & + % 等字元：進網址要 encodeURIComponent、進 CSS 選擇器要 CSS.escape。
  C.catalogId = function (a, b) { return ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim(); };
  // 舊卡片 id（第 B 波之前的 bake slug；舊存檔、舊 ?card= 連結會帶）：藝人-專輯 去重音、小寫、非英數中日文換 -、去頭尾 -、截 60 字（照抄 bake-cards.mjs oldSlug）。
  //   舊 slug 一定沒有 |、catalogId 一定有 | → 一眼分得出新舊，遷移可重入。
  C.oldSlug = function (a, b) {
    return (a + '-' + b).normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase()
      .replace(/[^a-z0-9㐀-鿿぀-ヿ]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  };
  // 舊 id 對照表 { 舊 slug: catalogId }：執行期從核心卡（!c.pool；王牌、頂點試做都算）的藝人／專輯推（不帶檔、0 byte），第一次呼叫才算、之後快取。
  //   核心卡日後改名、推不出原本的舊 slug 時，把 { 舊 slug: catalogId } 手寫補在 legacyExtra。
  //   tools/legacy-ids.json 是 B 波換 id 當下凍結的一份（368 筆）：check-content 比對「推出來的＋legacyExtra」＝它，一筆不同就失敗（防改名讓老存檔遷不過去）。
  //   I-1（11-20 店主挑頂點輔助卡）：換下的 6 張離開遊戲（cards.js 沒有了）→ 舊 slug 照樣對到主站 catalogId（legacyExtra；C.apexRetired＝這幾張，check-content 不要求在 C.cards）；
  //   換上的 6 張是 B 波以後才進核心的卡，沒有舊 slug（C.legacyNone：不推）。
  C.legacyExtra = {
    '陳綺貞-cheer-chen-讓我想一想': '陳綺貞 cheer chen|讓我想一想', '周杰倫-范特西': '周杰倫|范特西', 'kendrick-lamar-to-pimp-a-butterfly': 'kendrick lamar|to pimp a butterfly',
    '羅大佑-之乎者也': '羅大佑|之乎者也', '夾子電動大樂隊-地下人': '夾子電動大樂隊|地下人', 'blue-notes-blue-notes-for-mongezi': 'blue notes|blue notes for mongezi'
  };
  C.apexRetired = ['陳綺貞 cheer chen|讓我想一想', '周杰倫|范特西', 'kendrick lamar|to pimp a butterfly', '羅大佑|之乎者也', '夾子電動大樂隊|地下人', 'blue notes|blue notes for mongezi'];
  C.legacyNone = { 'guru|jazzmatazz, vol. 1': 1, 'slum village|fan-tas-tic, volume 1': 1, "art blakey and the jazz messengers|moanin'": 1,
    '濁水溪公社|台客的復仇': 1, '生活向上委員会|生活向上委員会ニューヨーク支部': 1, 'モア|モア': 1 };
  var legacyMap = null;
  C.legacyIds = function () {
    if (legacyMap) return legacyMap;
    var m = {};
    Object.keys(C.cards).forEach(function (id) {
      var c = C.cards[id];
      if (c && !c.pool && !C.legacyNone[id]) m[C.oldSlug(c.artist, c.album)] = C.catalogId(c.artist, c.album);
    });
    for (var k in C.legacyExtra) if (Object.prototype.hasOwnProperty.call(C.legacyExtra, k)) m[k] = C.legacyExtra[k];
    legacyMap = m;
    return m;
  };
  // 精選新卡展開（SPEC-B §1.3）：cards-pool.js（照欄存：art 藝人索引差、alb、year、c、o、h、bin、tune、gen、reg；bake-cards.mjs 檔頭）→ C.cards 每張
  //   { id, artist, album, year, genres, region, c, o, h, tier: null, coverUrl: null, localCover: null, previewUrl: '', tags, pitch: null, tune, bin, pool: true }
  //   tags 照 bake 公式（g:曲風、y:<1980／y:>=2000、r:地區）。pool: true＝不是核心卡（shop.js 填空封面池、check 用；engine 不讀）。
  //   撞到核心的鍵 → throw（bake 的 POOL-DUP-CORE 已擋，雙保險）。再叫一次（R3 備案 boot 晚展開、重試）不會重複：已展開的新卡照原物件留著。
  //   回展開張數；設 C.poolVersion（內容雜湊）、C.poolLoaded（列數＝n）。之後要叫 C.deriveAll(C)（箱子的 all），content.js 載入時自己叫過一次。
  C.poolVersion = null;
  C.poolLoaded = false;
  C.mediaReady = false;
  var poolOrder = [];        // cards-pool.js 的順序 → 卡 id（cards-media.json 同順序）
  var POOL_COLS = ['art', 'alb', 'year', 'c', 'o', 'h', 'bin', 'tune', 'gen', 'reg'];
  C.expandPool = function (pool) {
    if (!pool || !(pool.n > 0) || !POOL_COLS.every(function (k) { return Array.isArray(pool[k]) && pool[k].length === pool.n; })) return 0;
    var A = pool.A || [], K = pool.K || [], T = pool.T || [], G = pool.G || [], R = pool.R || [];
    var order = [], n = 0, ai = 0;
    for (var i = 0; i < pool.n; i++) {
      ai += pool.art[i];
      var artist = A[ai], album = pool.alb[i], id = C.catalogId(artist, album);
      var old = C.cards[id];
      if (old && !old.pool) throw new Error('cards-pool.js：' + id + ' 撞到核心卡（重烘 bake-cards.mjs --pool-only）');
      order.push(id);
      if (old) continue;
      var genres = (pool.gen[i] || []).map(function (k) { return G[k]; }), year = pool.year[i], region = R[pool.reg[i]] || 'xx';
      var tags = genres.map(function (g) { return 'g:' + g; })
        .concat(year < 1980 ? ['y:<1980'] : year >= 2000 ? ['y:>=2000'] : [])
        .concat(region !== 'xx' ? ['r:' + region] : []);
      C.cards[id] = { id: id, artist: artist, album: album, year: year, genres: genres, region: region, c: pool.c[i], o: pool.o[i], h: pool.h[i], tier: null,
        coverUrl: null, localCover: null, previewUrl: '', tags: tags, pitch: null, tune: T[pool.tune[i]] || null, bin: K[pool.bin[i]], pool: true };
      n++;
    }
    poolOrder = order;
    C.poolVersion = pool.v || null;
    C.poolLoaded = true;      // 每一欄都在、長度都＝n（上面驗過；沒過回 0、poolLoaded 留 false）
    return n;
  };
  // 封面／試聽（SPEC-B §1.3；cards-media.json { v, rows:[[封面碼, 試聽碼]] }，順序同 cards-pool.js）：解碼照 bake-cards.mjs coverOf／previewOf。
  //   版本不合（m.v ≠ C.poolVersion：快取到舊檔）或列數不合 → 不套、回 0；否則原地寫進同一張卡物件（不換物件），回套用張數、設 C.mediaReady。
  //   冪等：同一份套兩次結果一樣（重試、兩個請求先後到都不會錯）。
  var CAA = 'https://coverartarchive.org/', PREVIEW_BASE = 'https://audio-ssl.itunes.apple.com/itunes-assets/';
  function coverOf(k) {
    k = String(k || ''); var t = k.charAt(0), r = k.slice(1), i;
    if (t === 'c') return CAA + 'release/' + r + '/front-250';
    if (t === 'g') return CAA + 'release-group/' + r + '/front-250';
    if (t === 'C') { i = r.indexOf('/'); return CAA + 'release/' + r.slice(0, i) + '/' + r.slice(i + 1) + '-250.jpg'; }
    if (t === 'a') return 'https://is' + r.charAt(0) + '-ssl.mzstatic.com/image/thumb/' + r.slice(1) + '/300x300bb.jpg';
    if (t === 's') return 'https://i.scdn.co/image/ab67616d00001e02' + r;
    if (t === 'u') return r;
    return '';
  }
  function previewOf(k) { return !k ? '' : /^https:\/\//.test(k) ? k : PREVIEW_BASE + k; }
  C.attachMedia = function (m) {
    if (!m || !C.poolVersion || m.v !== C.poolVersion || !Array.isArray(m.rows) || m.rows.length !== poolOrder.length) return 0;
    var n = 0;
    for (var i = 0; i < m.rows.length; i++) {
      var c = C.cards[poolOrder[i]], row = m.rows[i] || [];
      if (!c || !c.pool) continue;
      c.coverUrl = coverOf(row[0]) || null;
      c.previewUrl = previewOf(row[1]);
      n++;
    }
    C.mediaReady = true;
    return n;
  };
  if (POOL) C.expandPool(POOL);

  function L(text, tag) { return { _t: text, _g: tag }; }
  function pick(raw, which) {
    if (raw && typeof raw === 'object' && '_t' in raw) return which === 't' ? raw._t : raw._g;
    if (Array.isArray(raw)) return raw.map(function (x) { return pick(x, which); });
    var o = {}; for (var k in raw) o[k] = pick(raw[k], which); return o;
  }

  // ===================================================================
  // 王牌、老闆送的四張（§4.2）、特價箱（§4.3）。每一趟包包開局＝老闆四張（第二趟起種子佔掉幾格）；特價箱挑三張後 7 張；包包不限張數（店主 11-16；engine CFG.bagMax＝Infinity），一趟結束才重置
  // ===================================================================
  C.aces = { hall: "radiohead|ok computer", pearl: "barney wilen|zodiac", heresy: "swans|filth" };
  // 第 D 波（SPEC-D §3.1；預設就換，不跟旗標）：流派名＝經典流／冷門流／異端流（店主 11-16 定的新名稱，原本括號帶著的「殿堂（經典）」拿掉）；
  //   一字圖示 aceIcon（比／借／拆：對決頂欄王牌格旁、開局派系卡）。殿堂／流亡／異端只留給頂點卡等級名（apexTierName：唱片櫃頂點卡標、C.apexTrial 的 grade）
  C.aceTitle = { hall: '經典流', pearl: '冷門流', heresy: '異端流' };    // 流派名（{title}；挑王牌面板、解鎖、換王牌那行）
  C.aceIcon = { hall: '比', pearl: '借', heresy: '拆' };
  C.apexTierName = { hall: '殿堂', pearl: '流亡', heresy: '異端' };      // 頂點卡等級名（唱片櫃、卡角的章；原本借用 aceTitle）
  // 新手推薦標（SPEC-D §3.9，§14-1 建議 B）：只在序章第一次挑派時標；冷門「新手推薦」、經典「前期較難」，異端不標（不寫機率、百分比；不跟 ?fac=1）
  C.aceNewbie = { pearl: '新手推薦', hall: '前期較難' };
  C.aceNewbieTag = '新';
  C.aceGloss = { hall: '大家都聽過的名盤', pearl: '沒幾個人聽過', heresy: '難入耳，越前衛越高' };   // 三軸 7 星的白話（挑王牌那行括號、唱盤前三張的小字；店主 11-12）
  C.aceGlossTag = '新';
  C.aceAxis = { hall: 'c', pearl: 'o', heresy: 'h' };                    // 7 星那軸（王牌只能丟這一軸）
  C.gifts = {
    // 店主 11-13：經典那組要有名一點（原本除了 Bowie 都偏冷門）→ Daft Punk、Miles Davis 第一代經典五重奏《Cookin'》、Brian Eno；Bowie 留著
    hall:   ["david bowie|low", "daft punk|random access memories", "miles davis|cookin' with the miles davis quintet", "brian eno|ambient 1: music for airports"],
    pearl:  ["charles brackeen|rhythm x", "bark psychosis|hex", "黃小楨|賞味期限", "傷心欲絕|我愛您"],
    heresy: ["the velvet underground|white light-white heat", "melt-banana|speak squeak creak", "pharoah sanders|tauhid", "magma|mëkanïk dëstruktïw kömmandöh"]
  };
  // 特價箱（店主 11-16：「三張特價，星星最高三，加起來不高於五」）：12 張，每張最高星 ≤3、三軸加起來 ≤5（check-content 驗）。
  //   「色」＝engine.bargainLane：峰值那軸，並列時取後面那軸（硬→冷→經）。全卡池符合的 402 張照 topAttr 分只有冷 1、硬 3（經 398），
  //   所以冷、硬兩條用並列的牌補（經 2＝冷 2 的 2/2/1 算冷、經 2＝硬 2 的 2/1/2 算硬；特價箱價籤兩軸都亮）。經／冷／硬各 4 張，
  //   每條第一張是 topAttr 純色（重看教學、對決試玩照 topAttr 找三色）。每輪擺 6 張＝每色 2 張（engine restock：各色洗牌取前兩張、池子扣掉包包裡的）；冷門都 ≤3（教學第 5 手剋不動）
  //   retired＝換下來的舊特價箱（v4 那 9 張扣掉留下的 2 張）：舊存檔的包包、這一輪的特價箱可能還有 → 照特價算價（priceOf／賣回半價）、不上架、收音機不抽
  C.bargain = {
    label: '特價',
    pool: ["oasis|dig out your soul", "lady gaga|artpop", "arcade fire|everything now", "the strokes|angles",
      "queensrÿche|take cover", "david bowie|never let me down", "megadeth|risk", "kiss|hot in the shade",
      "limp bizkit|gold cobra", "eminem|revival", "daft punk|human after all", "the weeknd|kiss land"],
    retired: ["blur|the great escape", "the velvet underground|squeeze", "stevie wonder|eivets rednow", "the kinks|preservation act 1",
      "metallica|reload", "weezer|van weezer", "ramones|halfway to sanity"]
  };
  C.bargainTag = '新';

  // ===================================================================
  // 頻率（v5 規劃書第六項第二期，店主 11-15「五六全做」）：每張卡的 tune＝主站頻率光譜的八格之一（cards.js 烘焙時從 data/mood/card-moods.json 判格）。
  //   只上色、不進戰鬥規則（engine 的 outcome／星數不准讀 tune）：對決提示籤前的小圓點（客人常聽頻率）、唱片資訊「頻率 ● 暴躁」、客人資訊「常聽 ● 暴躁」、收音機轉頻率。
  //   值照抄主站（check-content 會比對，走鐘只警告）：order＝dip-tune.js ORDER、names＝card-moods.json names、colors＝dip-tune.js CELL_COLOR（店主 10-22 定稿，給深色底設計的：
  //   遊戲白底上淺色格要靠圓點的 1 px 墨框；不另調色票）。遊戲頁不載 dip-tune.js（3D 星圖＋600 KB 資料）。
  //   頻率色跟三軸色撞（暴躁≈經典藍、頹靡≈冷門紫、沸騰≈硬蕊紅）：只用小圓點＋中文名，不染字、不染框。
  // ===================================================================
  C.tunes = {
    label: '頻率',                                       // 唱片資訊那一行「頻率 ● 暴躁」（主站結果頁同一個寫法）
    guest: '常聽',                                       // 客人資訊那一行「常聽 ● 暴躁」
    guestAria: '常聽頻率：{name}',                        // 提示籤前那顆圓點的讀屏字／title
    order: ['calm', 'still', 'languid', 'decay', 'lift', 'crisp', 'boil', 'charge'],
    names: { calm: '放鬆', still: '平靜', languid: '恍惚', decay: '頹靡', lift: '雀躍', crisp: '冷冽', boil: '沸騰', charge: '暴躁' },
    colors: { calm: '#f2cf5b', lift: '#ff9a3c', boil: '#ff4d3a', languid: '#e8578f', still: '#5ee6f0', crisp: '#bfe8ff', charge: '#4f8dff', decay: '#9b6bff' }
  };
  C.tunesTag = '新';
  // 收音機「轉頻率」（第六項第二期；店主 11-15）：兩位客人之間、每輪一次，挑一格頻率，抽一張那格的唱片放進這一輪的特價箱（照原價，不是特價）。{x} 由畫面代入
  C.radio = {
    title: '收音機',
    prompt: '轉一個頻率，抽一張放進這一輪的特價箱。',
    price: '電台那張照原價。',
    got: '特價箱多了一張《{album}》。',
    used: '這一輪已經轉過了。',
    usedSub: '這一輪轉到{name}：《{album}》',
    empty: '這個頻率抽不到唱片了。',
    later: '兩位客人之間才能轉。',
    tag: '電台',                                         // 特價箱那一格的小籤
    toBargain: '去特價箱看看',
    bagged: '已經收進包包了。',                           // 電台那張這一輪買走了（在包包）：取代「去特價箱看看」
    gone: '已經不在特價箱了。'                           // 買走又賣掉了
  };
  C.radioTag = '新';

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
    easy:   { w: 0.45, nz: 2.4, mercy: false },   // 原版 easy：星×0.45＋U(0,2.4)，不鈍化（mercy＝出招變鈍；放水唬人 trial.curve.mercyFeint 三種都吃，主線 11-16）
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
  //   X／Y 契約：每個 key { key, label, zh, pool, front }：jazz tw rock elec soul hiphop citypop classical world folk indierock indiepop blues new feature picks（v5 店面改版：pop → citypop、加 indierock／indiepop）
  //   一檔貨（第 B 波 SPEC-B §3）：每輪（打完藏家）抽一檔，第 1 檔從 pool（策展池，bins.js）、第 2 檔起從 all（全卡池：每張卡的 bin＝k，
  //   核心卡的 bin 來自 bake、精選新卡來自 cards-pool.js；C.deriveAll 推）；每位客人從這一檔輪流上架。front＝畫在道具上的封面（Y，固定門面、不跟貨走）；名牌英文 label、點了看 zh
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
  // 每箱的全卡池 all（SPEC-B §1.5【定稿 E1】）：content.bins 每箱 all＝content.cards 裡 bin＝k 的卡 id（排序）。
  //   content.js 載入時叫一次；sim --data 換掉 C.cards／C.bins 之後、engine.test 的假箱子也要叫（假卡沒有 bin → all 空 → engine 退回 pool）。
  C.deriveAll = function (content) {
    content = content || C;
    var by = {}, cs = content.cards || {}, bs = content.bins || {};
    Object.keys(cs).forEach(function (id) { var b = cs[id] && cs[id].bin; if (b) (by[b] = by[b] || []).push(id); });
    Object.keys(bs).forEach(function (k) { if (bs[k] && typeof bs[k] === 'object') bs[k].all = (by[k] || []).slice().sort(); });
    return content;
  };
  C.deriveAll(C);
  // 一檔貨的數字（SPEC-B §3.2；engine 有同名預設 LOT，沒給時用）：一檔 size 張＝每箱底 floor＋照全卡池各箱張數比例（最大餘數法）、FEATURE feature 張；
  //   每位客人架上每箱 show 張（FEATURE featureShow）；firstCurated＝第 1 檔從策展池；想要清單每張每檔擲 wantP、一檔最多 wantMax 張（§5）。
  //   on: false＝回到每輪補貨（economy.stock／featureStock、從 pool 抽；sim 對照與緊急關閉用）
  C.lot = { on: true, size: 100, floor: 5, feature: 6, show: 3, featureShow: 2, firstCurated: true, wantP: 0.35, wantMax: 3 };

  // ===================================================================
  // 無限試煉（店主 11-12 拍板；SPEC 無限試煉 §0，engine.js trialCfg 讀這份，沒寫的欄位用 engine TRIAL 預設）
  //   序章打完＝第 1 位；一輪 5 位：一般 3、第 4 位菁英、第 5 位傳說藏家；打完藏家接下一輪新面孔；打到輸為止。
  //   你 12 聲望、帶到下一場、打贏回 3（不超過上限）；客人 12、藏家 14。老闆說情每輪 1 次；架上唱片每位客人換一批（一檔貨，C.lot）、配件與特價箱每輪補一次。
  //   局內升級：贏一般 +2 經驗、菁英 +3、藏家 +4；升下一級要「目前等級＋3」；每升一級聲望上限 +1（現有聲望也 +1），再三選一（picks）。
  //   中繼點：打贏第 10、20、30、50、75、100 位，之後每 50 位（票之後再做）。
  //   curve＝難度曲線 V3（../curve/curves.cjs；照店主舊版 roguelike enemyForDepth 的形狀，第 6 位之後客人品味每 5 位 +1）＋11-16 前期加難（只動第 1–4 位）。改難度只改這裡；
  //   tiers＝之後的難度階梯（像 Monster Train 的 Covenant）：第 k 階＝tiers[k−1]，是 curve／guestHp… 的部分覆寫，例 { curve: { atk: { add: 1 } } }
  // ===================================================================
  C.trial = {
    classes: ['normal', 'normal', 'normal', 'elite', 'boss'],
    retry: 1,                                       // 老闆說情每輪 1 次（同一位、同一副牌、聲望回到開打前）
    youHp: 12, heal: 3,                             // 你 12 聲望；打贏回 3（＝engine CFG.playerHp）
    guestHp: { normal: 12, elite: 12, boss: 14 },
    // 客人補償（[[第幾位起, +n], …]，可多段、照位數遞增；[]＝關）。第 C 波（SPEC-C §5.5）：第 31 位起一般／菁英 12→13、藏家 14→15。
    //   第 D 波 V3（SPEC-D §4.3，預設就上）：第 51 位起每 5 位再 +1（一般客人第 50 位 13、第 100 位 23、第 150 位 33；藏家 +2）。
    //   產生法＝[[31,1]].concat(range(51, 301, 5).map(p => [p, 1]))；新帳號到第 50 位逐字不變。理由：樂歷戰力天賦（SPEC-D §13-1）
    guestHpSteps: [[31, 1], [51, 1], [56, 1], [61, 1], [66, 1], [71, 1], [76, 1], [81, 1], [86, 1], [91, 1], [96, 1], [101, 1], [106, 1],
      [111, 1], [116, 1], [121, 1], [126, 1], [131, 1], [136, 1], [141, 1], [146, 1], [151, 1], [156, 1], [161, 1], [166, 1], [171, 1],
      [176, 1], [181, 1], [186, 1], [191, 1], [196, 1], [201, 1], [206, 1], [211, 1], [216, 1], [221, 1], [226, 1], [231, 1], [236, 1],
      [241, 1], [246, 1], [251, 1], [256, 1], [261, 1], [266, 1], [271, 1], [276, 1], [281, 1], [286, 1], [291, 1], [296, 1]],
    xp: { normal: 2, elite: 3, boss: 4 }, levelNeed: 3, levelHp: 1,
    picks: { atk: 1, def: 1, hp: 2 },               // 三選一：品味 +1、底氣 +1、聲望上限 +2（現有聲望也 +2）
    checkpoints: [10, 20, 30, 50, 75, 100], checkpointEvery: 50,
    curve: {
      // 前期加難（店主 11-16「前期太簡單了，沒有挑戰性」）：只動第 1–4 位，第 5 位起跟 V3 逐位一樣。
      //   原本第 1–2 位說真話 1（永遠不唬）、品味第 4 位、底氣第 5 位才有，照提示剋就送分；現在第 1 位就會唬人（品味、底氣仍 0，要讀出唬人才贏得穩）、
      //   第 2 位品味 1、第 3–4 位品味 2 底氣 1、唬人 25%（有放水）。sim smart：新手第 1–3 位死 1.5%→約 9%、會讀的約 1%（T1／T1b）
      //   第 A 波合併（11-16）：客人第 1 位起照主屬性組牌＋easy 也吃放水唬人，n 2000 掉到 6.8%（T1 下限 8%）→ q.easy 0.8→0.75＝第 1–4 位都 0.75（n 1000／2000／4000：10.4／8.6／9.4%）
      planner: { easyTo: 2, normalTo: 4 },          // 出招難度：第 1–2 位 easy（出招不鈍化）、第 3–4 位 normal、第 5 位起 hard（C.planners）
      // 說真話機率 q：easy 0.75、normal 0.72、hard 1−min(0.40, 0.25＋0.05×max(0, 位−5))（第 5 位 0.75、6 位 0.70、7 位 0.65、第 8 位起封底 0.60）
      //   11-17 店主「讀牌太簡單、舊版難度剛好」（scratchpad v5/harder/DESIGN.md §2.2）：原本 normal 0.75、hard 0.82→0.45（第 13 位起）。
      //   難度改由「客人讀你」「兩種唬人」「提示分級」（下面 read、hintMix）撐，q 只微調：前 10 位每手都可能被唬，後段不再靠「十手有六手唬你」
      q: { easy: 0.75, normal: 0.72, feintBase: 0.25, feintStep: 0.05, feintFrom: 5, feintMax: 0.40 },
      // 客人讀你（11-17；engine beginHand、relOf／streakOf／rhoOf）：第 from 位起，他看你上一手（明指那手）怎麼應付提示
      //   （照提示剋＝counter／跟提示同色＝mirror／防他唬人＝third），這手有 ρ 的機率出「剋你照舊那招」的顏色；連兩手同一種應對 ρ×streakMul（上限 cap）。
      //   ρ：第 3–4 位 normal 0.30、第 5 位 hard 0.45，每位 +step 0.02、封頂 max 0.55（第 10 位）；藏家再 +boss。放水時 ρ×(1−mercy×放水程度)（舊版 roguelike.html:3652）。
      //   beta：基本唬人走「剋你剋法」（BEATS[提示]＝現行唬法）的比例，其餘出「剋提示色本身」那色：每手三色都可能，沒有永遠安全的牌（第 from 位起；之前＝1）。
      //   hit：第 from 位起，他沒照提示出、又剋中你＝被唬到，多扣 n（結果小字 notes.feint）。watch：第 1 手讀你上一場（第二波給傳說藏家用，現在關）。
      //   sim smart n 1000（DESIGN §1.3）：會讀的 到第 10 位 95%、新手 27%（現況 97／95）；舊腦袋（會算機率、不知道會被讀）72%
      read: { from: 3, rho: { normal: 0.30, hard: 0.45, step: 0.02, max: 0.55, boss: 0 }, streakMul: 2, cap: 0.90, beta: 0.65, mercy: 0.7, hit: { from: 5, n: 1 }, watch: false },
      // 提示分級（11-17）：明指（一句指一色）／半指（只說他不出哪一色）／不露（沒有提示）。半指：第 3–4 位 15%、第 5 位 20%、每位 +1 點、封頂 30%；
      //   不露：第 6 位 5%、每位 +2 點、封頂 15%。半指、不露那手，下一手他不讀你（你沒有可以被讀的應對）
      hintMix: { half: { from: 3, normal: 0.15, hard: 0.20, step: 0.01, max: 0.30 }, none: { from: 6, base: 0.05, step: 0.02, max: 0.15 } },
      // 放水：你落後時他少唬，唬人率 ×(1−0.8×mercy)（舊版 roguelike.html:3693-3695）。三種出招難度都吃（主線 11-16「放水前期保留」：
      //   前期加難後第 1–2 位 easy 也會唬，原本 easy 不放水＝落後時照樣 20% 唬你；現在跟 normal／hard 同一套）；出招變鈍仍只有 normal／hard（C.planners.mercy）
      mercyFeint: 0.8,
      // 放水前期保留、後期照機率（店主 11-16 選 C；engine mercyPAt）：第 1–10 位每手都放水（第 1–2 位 easy 也算）；第 11 位起每手照機率才放水，
      //   p＝max(min, p0 − step×⌊(位−from)/every⌋)：第 11–15 位 90%、16–20 位 80%…第 46 位起 20%（畫面不顯示；同一場同一手一定一樣）
      mercyP: { from: 11, p0: 0.9, step: 0.1, every: 5, min: 0.2 },
      // 出招偏主屬性（第 A 波 6 審查；engine beginHand）：第 from 位起，他挑這手要打哪色時，主屬性那色的星數多算 n 星（只改他挑哪色，不改牌、不多取亂數）。
      //   牌組照主屬性組了（mainShare），出招仍看手上哪色星最高；池子大多是經典星高的牌，不偏的話第 4–10 位仍約 38％ 出經典。
      //   第 1–3 位不偏：偏了以後他少出硬蕊、多出你難剋的色，新手第 1–3 位死亡率翻倍（T1）。n 0＝不偏
      mainBias: { from: 4, n: 1.5 },
      // 客人品味（他這手扣到你才加，再扣你的底氣）：min(2, round(0.75×max(0, 位−1)))＋⌊max(0, 位−6)/5⌋，藏家 +1；add＝之後難度階梯用
      //   lateFrom 1（V3 是 3）：第 1 位 0、第 2 位 1、第 3 位起 2（第 5 位起跟 V3 一樣）
      atk: { lateFrom: 1, rate: 0.75, cap: 2, slopeFrom: 6, slopeEvery: 5, boss: 1, add: 0 },
      // 客人底氣（最多擋一半）：min(1, round(0.45×max(0, 位−1)))，藏家 +1（lateFrom 1：第 3 位起 1；V3 是第 5 位起）
      def: { lateFrom: 1, rate: 0.45, cap: 1, boss: 1, add: 0 },
      // 客人牌組：三軸總星下限 min(13, 3＋⌊0.7×位⌋)（低於的換掉）；主軸加 ⌊max(0, 位−3)/3⌋ 星、上限 5；
      //   藏家必帶王牌；一般客人第 5 位起帶王牌機率 min(60%, 15%×(位−4))
      //   mainShare：客人主屬性（第 A 波 6，店主問「為何對手都打經典」）：每位客人有主屬性，同一輪一般 3 位經／冷／硬各一、菁英與藏家照種子輪（engine roundMains）；
      //     牌組至少 round(0.7×張數) 張是主屬性那軸最高的牌（他自己的先留，不夠從池子補）、其他格子另外兩軸輪流補，加星加在主屬性那軸。0＝只標示、不改牌組
      deck: { floorBase: 3, floorRate: 0.7, floorMax: 13, minPool: 7, buffFrom: 3, buffEvery: 3, buffCap: 5, aceFrom: 5, aceRate: 0.15, aceMax: 0.6, mainShare: 0.7 }
    },
    // 客人稱號（第 A 波 3；舊版 roguelike.html enemyForDepth 的 titles，原字照搬）：每 titleEvery 位換一次，第 15 位起停在品味之神。
    //   顯示在來客條與對決他名字旁（engine guestTitle：傳說藏家不掛稱號〔舊版藏家的稱號就是「傳說藏家」〕、跟他的名字一樣的不重複掛）
    titles: ['音樂小白', '文青同好', '社團學長', '資深樂評', '二手店老闆', '地下廠牌主理人', '品味行家', '品味之神'],
    titleEvery: 2,
    // 來客條頭像下的小名牌放不下的（「地下廠牌主理人級」8 字，360–375 寬一格約 65–68 px，跟隔壁的名牌黏在一起）→ 只在來客條用短寫；對決、客人資訊照原字
    titlesShort: { 地下廠牌主理人: '廠牌主理人' },
    tiers: [],
    // ---- 畫面字（{x} 由畫面代入；第二棒 ui.js 用）----
    ui: {
      game: '品味對決',                              // 標題、還沒開這一趟時的頂欄（沒有日期、沒有雨夜）
      prologue: '序章',
      pos: '第 {n} 位',                              // 頂欄只寫這個（店主：不寫時間）
      round: '第 {r} 輪',
      elite: '菁英', boss: '傳說藏家',
      toCheckpoint: '離下個中繼點還有 {n} 位',
      checkpoint: '中繼點：第 {n} 位',               // 走到中繼點那一位（來客畫面）的吐司
      retryLeft: '老闆說情 剩 {n} 次',
      next: '下一位：第 {n} 位　{name} ▸',
      guestDone: '打過了', guestCur: '下一位', guestLater: '還沒輪到',
      hasAce: '帶王牌',
      hp: '聲望 {n}/{max}',
      heal: '聲望 +{n}',                             // 打贏回 3 的吐司
      level: 'Lv {n}', xp: '經驗 {n}/{need}', atk: '品味 {n}', def: '底氣 {n}', maxHp: '聲望上限 {n}',
      atkShort: '品 {n}', defShort: '底 {n}',        // 對決「你／他」那列的小籤（大於 0 才顯示）
      // 品味／底氣在做什麼（聲望那顆點開、客人頭像點開；{n}＝點數）：你的品味只加在剋中，客人的品味只要扣到你就加；底氣兩邊一樣
      atkHelp: '剋中時多扣他 {n}', defHelp: '被扣時少扣 {n}（最多擋一半）', eAtkHelp: '扣到你就多扣 {n}',
      cont: '繼續試煉 ▸', abandon: '放棄這一趟', abandonWarn: '再按一次就放棄這一趟（{where}），從頭推門。', lastSummary: '看上一趟結算',
      retryMenu: ['▶ 再一場（這一輪只有一次）', '到這裡就好'],
      shelfNew: '這一趟新認識',
      // 換王牌（店主 11-13：開局沿用上次那張；第 1 位開打前，來客畫面點老闆才換）。aceAsk＝換王牌面板的標題（老闆說的）
      owner: '老闆', aceTalk: '聊聊', aceSwap: '換一張王牌', aceSwapSub: '老闆送的那幾張也跟著換',
      aceNow: '現在帶的：{title}《{album}》', aceAsk: '「想換一張？」', aceHint: '想換王牌，點老闆。', aceSwapped: '王牌換成《{album}》',
      // 客人主屬性（第 A 波 6）：客人資訊那一行；{attr}＝engine.ZH[main]（經典／冷門／硬蕊；roundGuests[i].main、view.eMain）
      mainAttr: '常出：{attr}',
      // 客人稱號（第 A 波 3）的寫法：{t}＝C.trial.titles 的字（engine guestTitle）。稱號 8 個裡 5 個就是客人的名字（文青同好、資深樂評…），
      //   照原字掛會跟同一排別人的名字撞、看起來像兩個人名（審查 A-6）→ 一律寫成「○○級」（品味等級，不是名字）：來客條名牌、對決他名字旁；客人資訊另起一行 titleLine
      titleFmt: '{t}級', titleLine: '稱號：{t}',
      // 第 A 波 4（演出與字）：對決頂欄離最遠紀錄 3 位內（{n}＝再贏幾位才破）；打贏時大章下的連勝（{n}＝打贏這位之後的連勝）；剩 1–2 聲望贏下的大章
      toRecord: '再贏 {n} 位破紀錄', streak: '連勝 +1（{n} 連勝）', closeWin: '險勝！',
      // 流派解鎖（店主 11-16「流派的頂點卡要透過遊戲蒐集才能解鎖」）：新玩家只有第一次挑的那派（初始流派），其他派打倒傳說藏家才解鎖（被剋鏈：冷門流→經典流→異端流→冷門流）。
      //   {title}＝經典流／冷門流／異端流（C.aceTitle）、{axis}＝經典／冷門／硬蕊、{icon}＝比／借／拆。第 D 波（SPEC-D §3.1）：名字本身就帶軸，樣板拿掉「派」與「（{axis}）」
      aceLocked: '打倒傳說藏家解鎖',                                  // 挑王牌面板：鎖住那派封面下面那行；點老闆小選單「換一張王牌」換不了時的小字
      aceLockedNote: '{title}還鎖著，打倒傳說藏家解鎖。',               // 挑王牌面板：點了鎖住的那派，說明那行
      aceSwapNone: '其他流派還鎖著',                                  // 點老闆小選單：只有一派能挑時，「換一張王牌」改成這句（按不下去）
      firstPick: '「先挑一派。其他流派，打倒傳說藏家再解鎖。」',        // 跳過序章（?apex=1）的新存檔：先三選一挑初始流派（面板標題，老闆說的）
      firstPickNote: '挑了就是初始流派。其他兩派，打倒傳說藏家解鎖。',   // 序章 O9 挑王牌（新玩家第一次挑）：說明那行最後一行（審查 11-16：這一挑會定下初始流派，原本沒講）
      lockHint: '其他流派還鎖著：打倒傳說藏家，解鎖{title}。',   // 只解鎖一派時，第 1 位開打前的一次性吐司（第一晚等老闆四句看完才出；同一次櫃檯賣給老闆的提示出了就不出、下次再說；save.seen.unlockHint）
      unlocked: '解鎖了{title}',                                       // 打倒傳說藏家、他那張讓新的一派解鎖（送牌那段的大字、吐司）
      unlockedSub: '下一趟開局，點老闆就能換。',
      newOwn: '新收藏',                                                // 送牌那段封面角的章：這張是新收進「我的收藏」的（原本的章寫「新認識」）
      unlockMigrated: '流派改成打倒傳說藏家才解鎖。你現在這派照舊。',   // 舊存檔第一次載入（解鎖制以前的存檔），標題畫面吐司一次
      unlockProg: '流派 {n}／3',                                       // 標題畫面紀錄那行、唱片櫃：解鎖進度
      unlockNext: '下一派：{title}',                                   // 接在進度後面：下一次打倒傳說藏家會解鎖哪一派
      apexProg: '頂點卡 {n}／{total}',                                 // ?apex=1：收了幾張頂點卡（標題、唱片櫃）
      bossCarry: '帶的王牌《{album}》',                                 // 點傳說藏家的頭像：他這一輪帶哪張（每輪可以不同）
      bossUnlock: '打倒他，解鎖{title}',                               //   接在後面：打倒他會解鎖哪一派
      bossCollect: '打倒他，這張就收進唱片櫃'                           //   ?apex=1、三派都開之後：他帶的是你還沒收到的那張
    },
    // 升級三選一（第一格固定是品味或底氣；engine.levelOffer）。字是店主暫定的名字（品味／底氣），句子新寫
    //   atkSub／defSub／hpSub 的 {n}＝這一格加幾點（C.trial.picks）
    levelUp: { title: '升級：Lv {n}', sub: '聲望上限 +1（自動）', atk: '品味 +1', def: '底氣 +1', hp: '聲望上限 +2', atkSub: '剋中時多扣他 {n}', defSub: '被扣時少扣 {n}（最多擋一半）', hpSub: '現在的聲望也 +{n}' },
    // 結果行補的一句（engine outcome 的 notes；{n}＝多扣／少扣幾點）
    notes: { atk: '品味：多扣 {n}', def: '底氣：少扣 {n}', eAtk: '他的品味：多扣 {n}', eDef: '他的底氣：少扣 {n}', feint: '被唬到：多扣 {n}' }   // feint：11-17 被唬到多扣（C.trial.curve.read.hit）
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
  //   tune：常聽頻率（C.tunes 八格之一；只上色：對決提示籤前的小圓點、客人資訊「常聽」那行；不進戰鬥規則）。主線 11-15 裁定：底牌星數加權多數決
  //     （每張的權重＝三軸星數總和 c＋o＋h；無限試煉照位數換牌，這裡固定看 deck 底牌，不在執行期重算），並列或撞格人工分散、每格最多 2 位：
  //       男子 沸騰 13（多數）｜文青同好 恍惚（頹靡 20／雀躍 19／恍惚 18 幾乎三格並列 → 分到沒人的恍惚；Beach House、Weyes Blood 的夢幻感）
  //       社團學長 冷冽 25（多數）｜音響發燒友 冷冽 40（多數；冷冽滿 2 位）｜二手店老闆 放鬆 55（多數）｜地下樂團吉他手 暴躁 51（多數）
  //       前衛樂迷 頹靡 28（多數）｜地下廠牌主理人 沸騰（暴躁 24＝冷冽 24 並列、兩格都已滿 2 位 → 第三名沸騰 13）
  //       資深樂評 暴躁 44（多數；暴躁滿 2 位）｜傳說藏家 雀躍（暴躁 39 第一但撞格：吉他手 71%、樂評 58%、藏家 51% 佔比最低 → 第二名雀躍 25）
  //     每格人數：沸騰 2、冷冽 2、暴躁 2、放鬆 1、恍惚 1、頹靡 1、雀躍 1、平靜 0。
  // ===================================================================
  C.enemies = {
    man: {
      id: 'man', name: '男子', spr: 'e0', avatar: null,
      honesty: 'honest', hp: 10, taste: 'coh', tune: 'boil',
      // 店主 11-13：掉落的必須是他牌組裡的專輯 → 改成掉 Eminem《The Eminem Show》（原本就在他牌組；Fishmans 不再出現），讓他某一手打出來，打完掉在地上
      deck: ["coldplay|mylo xyloto", "imagine dragons|night visions", "limp bizkit|results may vary", "老王樂隊|暮夜徐行",
        "eminem|the eminem show", "katy perry|prism"],
      drop: "eminem|the eminem show", sig: { id: "eminem|the eminem show", n: 2 },   // sig：直接開打那條路第 2 手一定出這張（教學那條路照 TUT_PLAYS 第 5 手）
      prologue: true, voice: { freq: 659, wave: 'square' }
    },
    copycat: {
      id: 'copycat', name: '文青同好', spr: 'e1', avatar: null,
      honesty: 'sometimes', hp: 25, taste: 'och', tune: 'languid',
      deck: ["beach house|teen dream", "weyes blood|titanic rising", "mitski|be the cowboy", "billie eilish|when we all fall asleep, where do we go?",
        "low|double negative", "sophie|oil of every pearl's un-insides", "大象體操 elephant gym|角度"],
      voice: { freq: 523, wave: 'square' }
    },
    already: {
      id: 'already', name: '社團學長', spr: 'e2', avatar: null,
      honesty: 'sometimes', hp: 20, taste: 'hco', tune: 'crisp',
      deck: ["don slepian|sea of bliss", "harold budd|abandoned cities", "demetrio stratos|metrodora",
        "étron fou leloublan|les trois fou's perdégagnent (au pays des...)", "nocturnal emissions|fruiting body", "eivind aarset|électronique noire",
        "yezda urfa|boris"],
      voice: { freq: 440, wave: 'square' }
    },
    needle: {
      id: 'needle', name: '音響發燒友', spr: 'e6', avatar: null,
      honesty: 'sometimes', hp: 25, taste: 'coh', tune: 'crisp',
      deck: ["steely dan|gaucho", "art pepper|art pepper meets the rhythm section", "bill evans|waltz for debby", "kenny burrell|midnight blue",
        "roscoe mitchell sextet|sound", "john zorn|cobra", "andrew cyrille|what about?"],
      voice: { freq: 587, wave: 'triangle' }
    },
    skip: {
      id: 'skip', name: '二手店老闆', spr: 'e4', avatar: null,
      honesty: 'sometimes', hp: 20, taste: 'coh', tune: 'calm',
      deck: ["roberto goyeneche|cantor de mi barrio", "amália rodrigues|gostava de ser quem era", "king sunny adé|aura",
        "washington phillips|the key to the kingdom", "otha turner & the rising star fife & drum band|everybody hollerin' goat",
        "tony scott & the indonesian all stars|djanger bali", "barney wilen|moshi"],
      voice: { freq: 330, wave: 'square', jitter: 20 }
    },
    broke: {
      id: 'broke', name: '地下樂團吉他手', spr: null,
      avatar: { head: 'cap', hair: 'u', shirt: 'r', pants: 'd', skin: 's' },
      honesty: 'sometimes', hp: 25, taste: 'och', tune: 'charge',
      deck: ["血肉果汁機 flesh juicer|golden太子bro", "血肉果汁機 flesh juicer|深海童話", "閃靈|失竊千年",
        "血肉果汁機 flesh juicer|血肉宮建宮蓋廟演唱會", "閃靈|永劫輪迴", "閃靈|醒靈寺大決戰", "林強|驚蟄"],
      voice: { freq: 494, wave: 'square' }
    },
    buyer: {
      id: 'buyer', name: '前衛樂迷', spr: null,
      avatar: { head: 'fedora', hair: 'k', shirt: 'g', pants: 'k', skin: 't' },
      honesty: 'sometimes', hp: 25, taste: 'coh', tune: 'decay',
      deck: ["swans|soundtracks for the blind", "venetian snares|making orange things", "nurse with wound|homotopy to marie",
        "ryoji ikeda|mort aux vaches", "sunn o)))|white1", "sigur rós|von", "william basinski|the disintegration loops"],
      voice: { freq: 554, wave: 'square' }
    },
    label: {
      id: 'label', name: '地下廠牌主理人', spr: 'e5', avatar: null,
      honesty: 'often', hp: 25, taste: 'ohc', tune: 'boil',
      deck: ["廢五金|廢五金", "明田川荘之|yamazaki blues", "菊地雅章|end for the beginning", "keiji haino|watashi dake?",
        "harry roesli gang|philosophy gang", "c.o.b.|moyshe mcstiff and the tartan lancers of the sacred heart", "pholas dactylus|concerto delle menti"],
      elite: true, voice: { freq: 294, wave: 'sine' }
    },
    critic: {
      id: 'critic', name: '資深樂評', spr: 'e3', avatar: null,
      honesty: 'often', hp: 26, taste: 'ohc', tune: 'charge',
      deck: ["tim buckley|starsailor", "throbbing gristle|20 jazz funk greats", "black midi|schlagenheim", "faust|faust iv",
        "neu!|neu!", "sun ra|space is the place", "the plastic people of the universe|egon bondy's happy hearts club banned"],
      elite: true, voice: { freq: 392, wave: 'square' }
    },
    boss: {
      id: 'boss', name: '傳說藏家', spr: 'boss', avatar: null,
      honesty: 'veteran', hp: 28, taste: 'coh', tune: 'lift',
      deck: ["交工樂隊|我等就來唱山歌", "ganelin trio|ancora da capo", "luis russell|the luis russell story 1929-1934",
        "raw material|time is...", "alexander von schlippenbach|globe unity", "裸のラリーズ|the oz tapes"],
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
  //     ms：沒有 ui 的句子自動前進的毫秒數（沒給＝照字數；點一下照樣走）；text 裡的 {x} 由執行器代入（again 的 {ace}＝這一趟王牌的專輯名）
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
    // 再挑戰一趟：老闆說「老樣子」（王牌固定，點老闆才換），走到門邊的特價箱挑三張（§2.5.2）
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
    //   E4 他真的走出門（走到門口門才晃），地上留一張盤（男子的 drop，Eminem）→ 掉落旁白（C.script.drop，ui.js 在撿起面板前念）→ 撿起面板（沒有敘述標題）
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
    // 打贏客人、進領獎之前（店主 11-13 §0：掉落台詞）：客人掉的唱片一定是他這一場的牌（engine finishFight 的獎勵候選）；有能收的唱片才念
    drop: [
      { id: 'G1', who: '', text: '對方似乎掉落了什麼……', tag: '店主' }
    ],
    // 再挑戰一趟（≤10 秒）：門晃 → 老闆說你帶的還是上次那張（店主 11-13：開局不再挑王牌；想換，來客畫面點老闆）→（第二趟起）從唱片櫃挑種子（C.seeds）
    //   → 走到特價箱挑三張（C.blocking.toSale）→ 來客
    again: [
      { id: 'A1', who: '老闆', text: '「……又是你。」', tag: '新', set: { put: { p: 'door', o: 'counter' }, hide: { f: true }, door: 'swing' }, ms: 1600 },
      { id: 'A2', who: '老闆', text: '「老樣子，《{ace}》。」', tag: '新', ms: 2400 }
    ]
  };

  // ===================================================================
  // 台詞（舞台泡泡）。lines[誰][鍵]＝字串或字串陣列；lineTags 同形狀，記每句的來源標記。
  //   line 口頭禪（開場泡泡）、intro 進門那句、lose 你贏時（他說）、win 你輸時（他說）；v4 拿掉 switch（急了／翻面）與 man.jabBubble
  //   owner：retry 老闆說情（輸了重打同一位）、relicFull 配件滿 3 件（包包不限張數之後沒有「包包滿」那句，店主 11-16）
  // ===================================================================
  var RAW_LINES = {
    owner: {
      retry: L('……再一場。', '新'),                 // 序章男子輸了（免費、不用選）
      retryAsk: L('……要不要再一場？', '新'),         // 客人輸了：接著是「再一場（這一輪只有一次）／到這裡就好」兩顆（C.trial.ui.retryMenu；COPY-07：不要連說三次「再一場」）
      relicFull: L('配件最多帶三件。先放一件回去。', '新'),
      // 第 D 波（SPEC-D §2.7、§2.8-7）：這一輪的說情用完了、用樂歷存的備用說情（pending.plea）時，接在 retryAsk 那段（retryFlow）
      retryPlea: L('這是你存的那次說情，用完就沒了。', '新'),
      // 第 D 波（SPEC-D §3.6，R-F6）：第一次解鎖某派，熟練度先蓋兩章（避開今日推薦的「集點卡」）
      profFirst: L('老客人，先蓋兩個章。', '新')
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
      line: L('來，看看你帶的貨。', '新'),              // 11-17 審查：開場泡泡跟第 1 手提示框同屏，不講唱片冷不冷（原句「這張在我店裡放了十年，沒人問過。」像冷門提示）
      intro: L('你手上那張，我收的時候才五十塊。', '新'),
      lose: [L('……下次這張，我要開高一點。', '新')],
      win: L('這張你出得太早了。', '新')                // COPY-17
    },
    broke: {
      line: L('打完我還要趕去練團。', '新'),            // 11-17 審查：同上（原句「這段吉他，我練了一整個暑假。」跟他的經典提示「這段 solo，我國中就會彈了」同一種說法）
      intro: L('剛從練團室出來，耳朵還在嗡嗡叫。', '新'),
      lose: [L('……回去再練一百遍。', '新')],
      win: L('週末來看我們的場，報我名字。', '新')
    },
    buyer: {
      line: L('別急，我們慢慢來。', '新'),                    // 11-17 審查：同上（原句「這張你聽得完嗎？」是硬蕊提示的「聽完／聽不完」說法）
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
  //   key 必填、必為 text 的子字串；揭曉後的結果句用它教「『key』是 X」（duelText.bluff／honest）——11-17 起只有教學那場（有劇本）念關鍵字；
  //   正式對局這 15 句也算明指通用句（下面 C.hintLines.one 接在後面），結果句改 honestPlain／bluffPlain（不念關鍵字，提示句不再是對照表）
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
  // 提示句庫（11-17 店主「提示詞很單調，看來看去都這幾句，多一點，自然平順的口吻」；scratchpad v5/harder DESIGN §3、LINES.md）
  //   one＝明指（一句指一色；上面 C.hints 的 15 句也算明指通用句、教學照舊用那 15 句）；half＝半指（鍵＝他「不出」的那色）；none＝不露（不指任何色）
  //   voice：沒寫＝誰都會講；有寫＝只有那位客人（C.enemies 的鍵）會講。form：act 動作｜say 說出口（要有「」）｜look 神情（只給 lint 與審稿用）
  //   engine beginHand 照這裡的 id 選句（一趟內盡量不重複：run.hintSeen）；duel.js 用 id 找字。不寫屬性名、不寫關鍵字對照（結果句不念關鍵字）
  // ===================================================================
  C.hintLines = {
    one: {
      // 明指・經典（61 句）
      c: [
        { id: 'c06', text: '他抽出一張封面誰都認得的。', form: 'act', tag: '新' },
        { id: 'c07', text: '「你爸應該也有一張。」', form: 'say', tag: '新' },
        { id: 'c08', text: '他輕輕哼起電台天天放的那段。', form: 'act', tag: '新' },
        { id: 'c09', text: '「這首，KTV 一定點得到。」', form: 'say', tag: '新' },
        { id: 'c10', text: '「前奏一下，大家就知道是哪首。」', form: 'say', tag: '新' },
        { id: 'c11', text: '「喜宴上，一定聽得到這首。」', form: 'say', tag: '新' },
        { id: 'c12', text: '他手上那張，已經是第八次再版。', form: 'act', tag: '新' },
        { id: 'c13', text: '「當年的獎，幾乎都被它拿走了。」', form: 'say', tag: '新' },
        { id: 'c14', text: '「小時候家裡天天在放這張。」', form: 'say', tag: '新' },
        { id: 'c15', text: '他從最顯眼的那一排抽出一張。', form: 'act', tag: '新' },
        { id: 'c16', text: '「隨便問路人，都知道這張。」', form: 'say', tag: '新' },
        { id: 'c17', text: '「畢業典禮，每年都放這首。」', form: 'say', tag: '新' },
        { id: 'c18', text: '他把封面轉向你，你一眼就認出來。', form: 'act', tag: '新' },
        { id: 'c19', text: '「這首，我阿嬤也會跟著唱。」', form: 'say', tag: '新' },
        { id: 'c20', text: '「早餐店的收音機，天天在放這首。」', form: 'say', tag: '新' },
        { id: 'c21', text: '豪華盒裝版，裡面還附海報。', form: 'act', tag: '新' },
        { id: 'c22', text: '「聽了幾十年，還是不會膩。」', form: 'say', tag: '新' },
        { id: 'c23', text: '「音樂課本裡，就有寫這張。」', form: 'say', tag: '新' },
        { id: 'c24', text: '他一哼，你不自覺就接了下一句。', form: 'act', tag: '新' },
        { id: 'c25', text: '「排行榜上，它待了一整年。」', form: 'say', tag: '新' },
        { id: 'c26', text: '他把一張燙金的精選輯擺上檯面。', form: 'act', tag: '新' },
        { id: 'c27', text: '「誰家的唱片櫃，都有這一張。」', form: 'say', tag: '新' },
        { id: 'c28', text: '「好幾部電影，都用過這首。」', form: 'say', tag: '新' },
        { id: 'c29', text: '「翻唱的版本，多到數不完。」', form: 'say', tag: '新' },
        { id: 'c30', text: '「畢旅的遊覽車上，大家都搶著唱。」', form: 'say', tag: '新' },
        { id: 'c31', text: '「尾牙每年都有人上台唱這首。」', form: 'say', tag: '新' },
        { id: 'c32', text: '「歷年的榜單，它從來沒缺席過。」', form: 'say', tag: '新' },
        { id: 'c33', text: '「以前一堆人的手機鈴聲，就是這首。」', form: 'say', tag: '新' },
        { id: 'c34', text: '他吹起口哨，那段旋律誰都熟。', form: 'act', tag: '新' },
        { id: 'c35', text: '「拍廣告的，最愛拿這首來用。」', form: 'say', tag: '新' },
        { id: 'c36', text: '「五十週年，又出了一次紀念版。」', form: 'say', tag: '新' },
        { id: 'c37', text: '「不用試聽，閉著眼睛買就對了。」', form: 'say', tag: '新' },
        { id: 'c38', text: '「這首副歌，你一定唱過。」', form: 'say', tag: '新' },
        { id: 'c39', text: '「入門第一張，就是它。」', form: 'say', tag: '新' },
        { id: 'c40', text: '「滿街的 T 恤，都印過這張封面。」', form: 'say', tag: '新' },
        { id: 'c41', text: '他翻出一張唱片行永遠不缺貨的。', form: 'act', tag: '新' },
        { id: 'c42', text: '「演唱會最後一首，全場都在等它。」', form: 'say', tag: '新' },
        { id: 'c43', text: '「不認識這張，會被笑喔。」', form: 'say', tag: '新' },
        { id: 'c44', text: '「那個封面，被模仿過無數次。」', form: 'say', tag: '新' },
        { id: 'c45', text: '側標上印著「銷售破百萬」。', form: 'act', tag: '新' },
        { id: 'c46', text: '他笑著看你，像在等你一起唱。', form: 'look', tag: '新' },
        { id: 'c47', text: '他指了指封套上的金唱片貼紙。', form: 'act', tag: '新' },
        { id: 'c48', text: '「買來送人，最不會出錯的一張。」', form: 'say', tag: '新' },
        { id: 'c-copycat-1', text: '「大家都在推，我當然也買了。」', voice: 'copycat', form: 'say', tag: '新' },
        { id: 'c-copycat-2', text: '「我發限動放這首，一堆人按愛心。」', voice: 'copycat', form: 'say', tag: '新' },
        { id: 'c-already-1', text: '「社團新生，第一張都聽這個。」', voice: 'already', form: 'say', tag: '新' },
        { id: 'c-already-2', text: '「社辦那台唱盤，最常放的就是這張。」', voice: 'already', form: 'say', tag: '新' },
        { id: 'c-needle-1', text: '「每場音響展，都在放這張。」', voice: 'needle', form: 'say', tag: '新' },
        { id: 'c-needle-2', text: '「同一張，我買過五個版本。」', voice: 'needle', form: 'say', tag: '新' },
        { id: 'c-skip-1', text: '「我店裡一年可以賣掉二十張。」', voice: 'skip', form: 'say', tag: '新' },
        { id: 'c-skip-2', text: '「這張啊，每次收貨都收得到。」', voice: 'skip', form: 'say', tag: '新' },
        { id: 'c-broke-1', text: '「這首，我們團練暖身都在彈。」', voice: 'broke', form: 'say', tag: '新' },
        { id: 'c-broke-2', text: '「這段 solo，我國中就會彈了。」', voice: 'broke', form: 'say', tag: '新' },
        { id: 'c-buyer-1', text: '「偶爾，也要聽聽大家都在聽的。」', voice: 'buyer', form: 'say', tag: '新' },
        { id: 'c-buyer-2', text: '「太流行了，但我承認它好聽。」', voice: 'buyer', form: 'say', tag: '新' },
        { id: 'c-label-1', text: '「它賣的，比我們全廠牌加起來還多。」', voice: 'label', form: 'say', tag: '新' },
        { id: 'c-label-2', text: '「當年賣到缺貨，我看了很羨慕。」', voice: 'label', form: 'say', tag: '新' },
        { id: 'c-critic-1', text: '「樂史課的第一堂，就講這張。」', voice: 'critic', form: 'say', tag: '新' },
        { id: 'c-critic-2', text: '「輪不到我評，大家早就評過了。」', voice: 'critic', form: 'say', tag: '新' },
        { id: 'c-boss-1', text: '「當年，人手一張。」', voice: 'boss', form: 'say', tag: '新' },
        { id: 'c-boss-2', text: '「我年輕的時候，滿街都在放。」', voice: 'boss', form: 'say', tag: '新' }
      ],
      // 明指・冷門（58 句）
      o: [
        { id: 'o06', text: '他抽出一張標籤是手寫的。', form: 'act', tag: '新' },
        { id: 'o07', text: '「問了三家店，都說沒有。」', form: 'say', tag: '新' },
        { id: 'o08', text: '他亮出一張試壓盤，封膜都還在。', form: 'act', tag: '新' },
        { id: 'o09', text: '「從來沒有再版過。」', form: 'say', tag: '新' },
        { id: 'o10', text: '「海外郵購，等了三個月才到。」', form: 'say', tag: '新' },
        { id: 'o11', text: '封套是影印的，邊邊還歪了。', form: 'look', tag: '新' },
        { id: 'o12', text: '「當年只在演出現場賣。」', form: 'say', tag: '新' },
        { id: 'o13', text: '「這個團，只出過這一張就散了。」', form: 'say', tag: '新' },
        { id: 'o14', text: '封套上蓋著「宣傳用」的章。', form: 'act', tag: '新' },
        { id: 'o15', text: '「跳蚤市場翻了一下午，才翻到它。」', form: 'say', tag: '新' },
        { id: 'o16', text: '「上網搜，只會搜到我的貼文。」', form: 'say', tag: '新' },
        { id: 'o17', text: '他從牛皮紙袋裡抽出一張唱片。', form: 'act', tag: '新' },
        { id: 'o18', text: '「全台灣，可能就這一張。」', form: 'say', tag: '新' },
        { id: 'o19', text: '「出它的小廠牌，早就倒了。」', form: 'say', tag: '新' },
        { id: 'o20', text: '他翻到背面，上面手寫編號 47。', form: 'act', tag: '新' },
        { id: 'o21', text: '「拍賣網上，從來沒看過有人賣。」', form: 'say', tag: '新' },
        { id: 'o22', text: '標籤全白，一個字都沒印。', form: 'act', tag: '新' },
        { id: 'o23', text: '「知道這張的人，一隻手數得完。」', form: 'say', tag: '新' },
        { id: 'o24', text: '「當年沒人理，現在大家在找。」', form: 'say', tag: '新' },
        { id: 'o25', text: '「原版的價錢，比我的機車還貴。」', form: 'say', tag: '新' },
        { id: 'o26', text: '「拿三張跟人換，才換到這張。」', form: 'say', tag: '新' },
        { id: 'o27', text: '「當年只在南部發過。」', form: 'say', tag: '新' },
        { id: 'o28', text: '「樂手自己都不記得錄過這張。」', form: 'say', tag: '新' },
        { id: 'o29', text: '他翻出一張你在店裡從沒看過的。', form: 'act', tag: '新' },
        { id: 'o30', text: '「排行榜？從來沒上過。」', form: 'say', tag: '新' },
        { id: 'o31', text: '「從資源回收場救回來的。」', form: 'say', tag: '新' },
        { id: 'o32', text: '「是留學生從國外帶回來的。」', form: 'say', tag: '新' },
        { id: 'o33', text: '「只在深夜電台放過一次。」', form: 'say', tag: '新' },
        { id: 'o34', text: '「連唱片行的人都沒看過。」', form: 'say', tag: '新' },
        { id: 'o35', text: '他壓低聲音：「很少人知道這張。」', form: 'say', tag: '新' },
        { id: 'o36', text: '「當年只印了一批，沒有第二批。」', form: 'say', tag: '新' },
        { id: 'o37', text: '「錄音室流出來的，沒正式發過。」', form: 'say', tag: '新' },
        { id: 'o38', text: '「封面是樂手自己剪貼的。」', form: 'say', tag: '新' },
        { id: 'o39', text: '他從一疊沒標價的唱片裡抽出一張。', form: 'act', tag: '新' },
        { id: 'o40', text: '「年份到現在都還查不出來。」', form: 'say', tag: '新' },
        { id: 'o41', text: '「台灣從來沒進過貨。」', form: 'say', tag: '新' },
        { id: 'o42', text: '他捧著那張，像怕它碎掉。', form: 'look', tag: '新' },
        { id: 'o43', text: '「樂手的名字，你應該第一次聽到。」', form: 'say', tag: '新' },
        { id: 'o44', text: '「好不容易，才等到有人釋出。」', form: 'say', tag: '新' },
        { id: 'o45', text: '「發行量？大概幾十張吧。」', form: 'say', tag: '新' },
        { id: 'o-copycat-1', text: '「朋友去東京挖回來的，只有一張。」', voice: 'copycat', form: 'say', tag: '新' },
        { id: 'o-copycat-2', text: '「排了一整晚，才買到這張。」', voice: 'copycat', form: 'say', tag: '新' },
        { id: 'o-already-1', text: '「學弟妹應該都沒聽過吧。」', voice: 'already', form: 'say', tag: '新' },
        { id: 'o-already-2', text: '「社辦找不到，是我高中挖到的。」', voice: 'already', form: 'say', tag: '新' },
        { id: 'o-needle-1', text: '「日本首版，側標都還在。」', voice: 'needle', form: 'say', tag: '新' },
        { id: 'o-needle-2', text: '「這版的母帶，後來燒掉了。」', voice: 'needle', form: 'say', tag: '新' },
        { id: 'o-skip-1', text: '「我收過一次，就再也沒看過。」', voice: 'skip', form: 'say', tag: '新' },
        { id: 'o-skip-2', text: '「這張，我從來不擺上架。」', voice: 'skip', form: 'say', tag: '新' },
        { id: 'o-broke-1', text: '「前輩團的，自己錄自己賣。」', voice: 'broke', form: 'say', tag: '新' },
        { id: 'o-broke-2', text: '「表演完，在門口跟樂手買的。」', voice: 'broke', form: 'say', tag: '新' },
        { id: 'o-buyer-1', text: '「錄音帶轉的，原版早就沒了。」', voice: 'buyer', form: 'say', tag: '新' },
        { id: 'o-buyer-2', text: '「這張，我找了七年。」', voice: 'buyer', form: 'say', tag: '新' },
        { id: 'o-label-1', text: '「這批，我們只壓了一百張。」', voice: 'label', form: 'say', tag: '新' },
        { id: 'o-label-2', text: '「封面是我們一張一張手印的。」', voice: 'label', form: 'say', tag: '新' },
        { id: 'o-critic-1', text: '「當年的樂評，只有我寫過它。」', voice: 'critic', form: 'say', tag: '新' },
        { id: 'o-critic-2', text: '「樂史上，它只佔一個註腳。」', voice: 'critic', form: 'say', tag: '新' },
        { id: 'o-boss-1', text: '「全世界，剩不到十張。」', voice: 'boss', form: 'say', tag: '新' },
        { id: 'o-boss-2', text: '「這張，我等了三十年才等到。」', voice: 'boss', form: 'say', tag: '新' }
      ],
      // 明指・硬蕊（62 句）
      h: [
        { id: 'h06', text: '「聽完這張，要休息一下。」', form: 'say', tag: '新' },
        { id: 'h07', text: '「一首就二十分鐘，還沒有歌詞。」', form: 'say', tag: '新' },
        { id: 'h08', text: '「沒有一個音是準的。」', form: 'say', tag: '新' },
        { id: 'h09', text: '「放出來，鄰居會來敲門。」', form: 'say', tag: '新' },
        { id: 'h10', text: '唱針一放，喇叭先爆了一聲。', form: 'act', tag: '新' },
        { id: 'h11', text: '「聽完，耳鳴了三天。」', form: 'say', tag: '新' },
        { id: 'h12', text: '「沒有旋律，只有聲音。」', form: 'say', tag: '新' },
        { id: 'h13', text: '封面是一張在尖叫的臉。', form: 'look', tag: '新' },
        { id: 'h14', text: '「鼓手好像在拆鼓。」', form: 'say', tag: '新' },
        { id: 'h15', text: '「聽沒兩分鐘，頭就開始痛。」', form: 'say', tag: '新' },
        { id: 'h16', text: '「吉他失真到聽不出是吉他。」', form: 'say', tag: '新' },
        { id: 'h17', text: '「裡面有一段，是拿電鑽錄的。」', form: 'say', tag: '新' },
        { id: 'h18', text: '「一半是即興，一半是吵架。」', form: 'say', tag: '新' },
        { id: 'h19', text: '他翻開附贈的樂譜，上面只有幾條線。', form: 'act', tag: '新' },
        { id: 'h20', text: '「開車的時候，千萬別放這張。」', form: 'say', tag: '新' },
        { id: 'h21', text: '「聽到一半，你會以為唱盤壞了。」', form: 'say', tag: '新' },
        { id: 'h22', text: '「人聲全部用吼的。」', form: 'say', tag: '新' },
        { id: 'h23', text: '「錄音師錄完這張就辭職了。」', form: 'say', tag: '新' },
        { id: 'h24', text: '「不是壞掉，本來就這樣。」', form: 'say', tag: '新' },
        { id: 'h25', text: '他手指在檯面上亂敲，完全沒拍子。', form: 'act', tag: '新' },
        { id: 'h26', text: '「薩克斯風吹得像在慘叫。」', form: 'say', tag: '新' },
        { id: 'h27', text: '「先做好心理準備，再放。」', form: 'say', tag: '新' },
        { id: 'h28', text: '「聽起來像隔壁在裝潢。」', form: 'say', tag: '新' },
        { id: 'h29', text: '「整張聽起來，像收音機沒對到台。」', form: 'say', tag: '新' },
        { id: 'h30', text: '「一放，連貓都躲起來。」', form: 'say', tag: '新' },
        { id: 'h31', text: '「放給爸媽聽，會被罵。」', form: 'say', tag: '新' },
        { id: 'h32', text: '「錄的是鐵片互相刮的聲音。」', form: 'say', tag: '新' },
        { id: 'h33', text: '「我聽到第五次，才聽完一整張。」', form: 'say', tag: '新' },
        { id: 'h34', text: '全黑的封套，只有一行白字。', form: 'look', tag: '新' },
        { id: 'h35', text: '「節拍數到七，就亂掉了。」', form: 'say', tag: '新' },
        { id: 'h36', text: '「每一首都像在打架。」', form: 'say', tag: '新' },
        { id: 'h37', text: '「聽得懂這張的人，都怪怪的。」', form: 'say', tag: '新' },
        { id: 'h38', text: '「歌詞只有一個字，喊了十分鐘。」', form: 'say', tag: '新' },
        { id: 'h39', text: '「嬰兒聽了會哭的那種。」', form: 'say', tag: '新' },
        { id: 'h40', text: '「在廢棄工廠裡錄的。」', form: 'say', tag: '新' },
        { id: 'h41', text: '他戴上耳機，馬上往後一縮。', form: 'look', tag: '新' },
        { id: 'h42', text: '他從包包裡掏出一副耳塞。', form: 'act', tag: '新' },
        { id: 'h43', text: '他一試聽，旁邊的人都退了一步。', form: 'act', tag: '新' },
        { id: 'h44', text: '「音量開到一半，就夠你受了。」', form: 'say', tag: '新' },
        { id: 'h45', text: '「這種東西，越聽越不像音樂。」', form: 'say', tag: '新' },
        { id: 'h46', text: '封套背面，畫滿看不懂的符號。', form: 'look', tag: '新' },
        { id: 'h47', text: '他做了個摀耳朵的動作，自己先笑了。', form: 'act', tag: '新' },
        { id: 'h48', text: '「聽完以後，安靜都變得很好聽。」', form: 'say', tag: '新' },
        { id: 'h49', text: '「錄音的時候，麥克風燒掉兩支。」', form: 'say', tag: '新' },
        { id: 'h-copycat-1', text: '「我聽不完，但封面很好看。」', voice: 'copycat', form: 'say', tag: '新' },
        { id: 'h-copycat-2', text: '「大家說它很吵，我才去買的。」', voice: 'copycat', form: 'say', tag: '新' },
        { id: 'h-already-1', text: '「放社辦，學弟妹都跑光。」', voice: 'already', form: 'say', tag: '新' },
        { id: 'h-already-2', text: '「高一聽不懂，聽到高三才懂。」', voice: 'already', form: 'say', tag: '新' },
        { id: 'h-needle-1', text: '「這張的高頻，聽了牙齒會酸。」', voice: 'needle', form: 'say', tag: '新' },
        { id: 'h-needle-2', text: '「拿來測喇叭，差點把它燒了。」', voice: 'needle', form: 'say', tag: '新' },
        { id: 'h-skip-1', text: '「放在店裡，客人聽兩秒就走。」', voice: 'skip', form: 'say', tag: '新' },
        { id: 'h-skip-2', text: '「每次試聽，都有人叫我關掉。」', voice: 'skip', form: 'say', tag: '新' },
        { id: 'h-broke-1', text: '「破音開到最大，音箱都在抖。」', voice: 'broke', form: 'say', tag: '新' },
        { id: 'h-broke-2', text: '「照這張的彈法，弦一定斷。」', voice: 'broke', form: 'say', tag: '新' },
        { id: 'h-buyer-1', text: '「要關燈聽，聽到你怕。」', voice: 'buyer', form: 'say', tag: '新' },
        { id: 'h-buyer-2', text: '「耳朵打不開的，撐不過第一首。」', voice: 'buyer', form: 'say', tag: '新' },
        { id: 'h-label-1', text: '「母帶是我們故意弄破的。」', voice: 'label', form: 'say', tag: '新' },
        { id: 'h-label-2', text: '「發的時候，通路嫌太吵不收。」', voice: 'label', form: 'say', tag: '新' },
        { id: 'h-critic-1', text: '「我寫了三千字，還是沒寫懂。」', voice: 'critic', form: 'say', tag: '新' },
        { id: 'h-critic-2', text: '「聽到一半，我的耳朵先投降。」', voice: 'critic', form: 'say', tag: '新' },
        { id: 'h-boss-1', text: '「當年在店裡放，有人來砸門。」', voice: 'boss', form: 'say', tag: '新' },
        { id: 'h-boss-2', text: '「三十年前，就把人嚇跑了。」', voice: 'boss', form: 'say', tag: '新' }
      ]
    },
    half: {
      // 半指・他不出經典（22 句）
      c: [
        { id: 'nc01', text: '他把暢銷榜那疊推到一邊。', form: 'act', tag: '新' },
        { id: 'nc02', text: '「想聽大家都聽過的？下次吧。」', form: 'say', tag: '新' },
        { id: 'nc03', text: '「這手不走流行路線。」', form: 'say', tag: '新' },
        { id: 'nc04', text: '他的手從精選輯上面滑過去。', form: 'act', tag: '新' },
        { id: 'nc05', text: '「不會是電台在放的那種。」', form: 'say', tag: '新' },
        { id: 'nc06', text: '「要唱 KTV 金曲，自己去包廂。」', form: 'say', tag: '新' },
        { id: 'nc07', text: '他跳過了紀念版那一櫃。', form: 'act', tag: '新' },
        { id: 'nc08', text: '「這手，你跟著唱不了。」', form: 'say', tag: '新' },
        { id: 'nc09', text: '「你家架上也有的，我幹嘛出？」', form: 'say', tag: '新' },
        { id: 'nc10', text: '他把封面誰都認得的那張收起來。', form: 'act', tag: '新' },
        { id: 'nc11', text: '「今天不考音樂課本。」', form: 'say', tag: '新' },
        { id: 'nc12', text: '「不用往大家都知道的那邊猜。」', form: 'say', tag: '新' },
        { id: 'nc13', text: '「我沒去翻你爸媽的唱片櫃。」', form: 'say', tag: '新' },
        { id: 'nc-copycat-1', text: '「這次我不跟風。」', voice: 'copycat', form: 'say', tag: '新' },
        { id: 'nc-already-1', text: '「我早就聽膩新生入門那幾張了。」', voice: 'already', form: 'say', tag: '新' },
        { id: 'nc-needle-1', text: '「不放音響行拿來試機的那幾張。」', voice: 'needle', form: 'say', tag: '新' },
        { id: 'nc-skip-1', text: '「好賣的貨，我留著做生意。」', voice: 'skip', form: 'say', tag: '新' },
        { id: 'nc-broke-1', text: '「團練暖身曲？彈到爛了，跳過。」', voice: 'broke', form: 'say', tag: '新' },
        { id: 'nc-buyer-1', text: '「我的耳朵會自動跳過主流。」', voice: 'buyer', form: 'say', tag: '新' },
        { id: 'nc-label-1', text: '「這手不跟大廠拚銷量。」', voice: 'label', form: 'say', tag: '新' },
        { id: 'nc-critic-1', text: '「排行榜的東西，我寫到不想寫了。」', voice: 'critic', form: 'say', tag: '新' },
        { id: 'nc-boss-1', text: '「人手一張的？那太好猜了。」', voice: 'boss', form: 'say', tag: '新' }
      ],
      // 半指・他不出冷門（22 句）
      o: [
        { id: 'no01', text: '他連箱底看都沒看。', form: 'act', tag: '新' },
        { id: 'no02', text: '「今天不挖寶。」', form: 'say', tag: '新' },
        { id: 'no03', text: '「壓箱寶沒帶出門。」', form: 'say', tag: '新' },
        { id: 'no04', text: '他把限量那盒又鎖了回去。', form: 'act', tag: '新' },
        { id: 'no05', text: '他碰都沒碰手寫標籤那疊。', form: 'act', tag: '新' },
        { id: 'no06', text: '「這手，不考你冷知識。」', form: 'say', tag: '新' },
        { id: 'no07', text: '「網路上一查就有。」', form: 'say', tag: '新' },
        { id: 'no08', text: '他把那本郵購目錄闔上。', form: 'act', tag: '新' },
        { id: 'no09', text: '「稀有盤，我才捨不得拿出來。」', form: 'say', tag: '新' },
        { id: 'no10', text: '「試壓盤？想都別想。」', form: 'say', tag: '新' },
        { id: 'no11', text: '「不是什麼絕版貨。」', form: 'say', tag: '新' },
        { id: 'no12', text: '他從沒標價的那箱前面走開。', form: 'act', tag: '新' },
        { id: 'no13', text: '「誰挖得比較深，下次再比。」', form: 'say', tag: '新' },
        { id: 'no-copycat-1', text: '「國外帶回來的？還在我朋友那。」', voice: 'copycat', form: 'say', tag: '新' },
        { id: 'no-already-1', text: '「我高中挖到的寶，只放給自己聽。」', voice: 'already', form: 'say', tag: '新' },
        { id: 'no-needle-1', text: '「難找的首版，鎖在防潮箱裡。」', voice: 'needle', form: 'say', tag: '新' },
        { id: 'no-skip-1', text: '「櫃檯底下的私藏，今天不見客。」', voice: 'skip', form: 'say', tag: '新' },
        { id: 'no-broke-1', text: '「現場才買得到的，剛好借給鼓手。」', voice: 'broke', form: 'say', tag: '新' },
        { id: 'no-buyer-1', text: '「找了七年的那張？還不到時候。」', voice: 'buyer', form: 'say', tag: '新' },
        { id: 'no-label-1', text: '「限量盤？連我自己都還沒拆。」', voice: 'label', form: 'say', tag: '新' },
        { id: 'no-critic-1', text: '「冷僻盤我寫夠了，換個話題。」', voice: 'critic', form: 'say', tag: '新' },
        { id: 'no-boss-1', text: '「今天不動木箱最底下那層。」', voice: 'boss', form: 'say', tag: '新' }
      ],
      // 半指・他不出硬蕊（22 句）
      h: [
        { id: 'nh01', text: '他把音量轉小。', form: 'act', tag: '新' },
        { id: 'nh02', text: '「今天不吵你。」', form: 'say', tag: '新' },
        { id: 'nh03', text: '他把耳塞收回口袋。', form: 'act', tag: '新' },
        { id: 'nh04', text: '「不會刺耳，別緊張。」', form: 'say', tag: '新' },
        { id: 'nh05', text: '他把黑色封套那疊塞回櫃子。', form: 'act', tag: '新' },
        { id: 'nh06', text: '「鄰居不用來敲門。」', form: 'say', tag: '新' },
        { id: 'nh07', text: '「放心，這手你聽得懂。」', form: 'say', tag: '新' },
        { id: 'nh08', text: '「不拿你的耳朵做實驗。」', form: 'say', tag: '新' },
        { id: 'nh09', text: '「這次喇叭撐得住。」', form: 'say', tag: '新' },
        { id: 'nh10', text: '「耳朵可以放假了。」', form: 'say', tag: '新' },
        { id: 'nh11', text: '「這手，不會嚇到人。」', form: 'say', tag: '新' },
        { id: 'nh12', text: '「旋律，這手還是有的。」', form: 'say', tag: '新' },
        { id: 'nh13', text: '他把會讓人耳鳴的那張收了起來。', form: 'act', tag: '新' },
        { id: 'nh-copycat-1', text: '「太吵的，我朋友都不聽。」', voice: 'copycat', form: 'say', tag: '新' },
        { id: 'nh-already-1', text: '「學弟妹在，吵的先不放。」', voice: 'already', form: 'say', tag: '新' },
        { id: 'nh-needle-1', text: '「不想讓擴大機受苦。」', voice: 'needle', form: 'say', tag: '新' },
        { id: 'nh-skip-1', text: '「吵的放下去，客人會跑光。」', voice: 'skip', form: 'say', tag: '新' },
        { id: 'nh-broke-1', text: '「今天不插電。」', voice: 'broke', form: 'say', tag: '新' },
        { id: 'nh-buyer-1', text: '「好啦，放過你的耳朵。」', voice: 'buyer', form: 'say', tag: '新' },
        { id: 'nh-label-1', text: '「怕吵到你，最吵的那張沒帶。」', voice: 'label', form: 'say', tag: '新' },
        { id: 'nh-critic-1', text: '「不想再寫三千字的樂評了。」', voice: 'critic', form: 'say', tag: '新' },
        { id: 'nh-boss-1', text: '「砸門那張？改天再砸。」', voice: 'boss', form: 'say', tag: '新' }
      ]
    },
    // 不露（42 句）
    none: [
      { id: 'x01', text: '他看了你一眼，什麼也沒說。', form: 'look', tag: '新' },
      { id: 'x02', text: '他把內袋抽出一半，又推回去。', form: 'act', tag: '新' },
      { id: 'x03', text: '「你先。」', form: 'say', tag: '新' },
      { id: 'x04', text: '他手指輕輕敲著檯面。', form: 'act', tag: '新' },
      { id: 'x05', text: '他喝了一口茶，一點也不急。', form: 'act', tag: '新' },
      { id: 'x06', text: '「這手，你自己猜。」', form: 'say', tag: '新' },
      { id: 'x07', text: '「不告訴你。」', form: 'say', tag: '新' },
      { id: 'x08', text: '他眨了眨眼，看不出在想什麼。', form: 'look', tag: '新' },
      { id: 'x09', text: '他盯著你的手，等你先動。', form: 'look', tag: '新' },
      { id: 'x10', text: '「看你的囉。」', form: 'say', tag: '新' },
      { id: 'x11', text: '他推了推眼鏡。', form: 'act', tag: '新' },
      { id: 'x12', text: '他翻了翻，挑了一張，沒讓你看。', form: 'act', tag: '新' },
      { id: 'x13', text: '「說了就不好玩了。」', form: 'say', tag: '新' },
      { id: 'x14', text: '他背過身去挑了一張。', form: 'act', tag: '新' },
      { id: 'x15', text: '他看向窗外，像在想別的事。', form: 'look', tag: '新' },
      { id: 'x16', text: '「猜猜看啊。」', form: 'say', tag: '新' },
      { id: 'x17', text: '他聳聳肩。', form: 'act', tag: '新' },
      { id: 'x18', text: '他用手掌蓋住那張的封面。', form: 'act', tag: '新' },
      { id: 'x19', text: '「你覺得呢？」', form: 'say', tag: '新' },
      { id: 'x20', text: '他把唱片疊好，抽了一張蓋著。', form: 'act', tag: '新' },
      { id: 'x21', text: '「祕密。」', form: 'say', tag: '新' },
      { id: 'x22', text: '他伸了個懶腰，慢慢挑。', form: 'act', tag: '新' },
      { id: 'x23', text: '他把手插進口袋，靠在檯邊。', form: 'act', tag: '新' },
      { id: 'x24', text: '「嗯……」他想了很久。', form: 'say', tag: '新' },
      { id: 'x-copycat-1', text: '「欸你先出，我再決定。」', voice: 'copycat', form: 'say', tag: '新' },
      { id: 'x-copycat-2', text: '他偷瞄你手上那疊。', voice: 'copycat', form: 'look', tag: '新' },
      { id: 'x-already-1', text: '「這手先不講，免得你學起來。」', voice: 'already', form: 'say', tag: '新' },
      { id: 'x-already-2', text: '「學長出什麼，你猜啊。」', voice: 'already', form: 'say', tag: '新' },
      { id: 'x-needle-1', text: '他拿絨布擦唱片，擦了很久。', voice: 'needle', form: 'act', tag: '新' },
      { id: 'x-needle-2', text: '「等一下，我先除個靜電。」', voice: 'needle', form: 'say', tag: '新' },
      { id: 'x-skip-1', text: '他翻著帳本，頭也沒抬。', voice: 'skip', form: 'act', tag: '新' },
      { id: 'x-skip-2', text: '「年輕人，你先。」', voice: 'skip', form: 'say', tag: '新' },
      { id: 'x-broke-1', text: '他抖著腳，等你先出。', voice: 'broke', form: 'act', tag: '新' },
      { id: 'x-broke-2', text: '他把撥片在指間轉來轉去。', voice: 'broke', form: 'act', tag: '新' },
      { id: 'x-buyer-1', text: '「答案，你自己聽。」', voice: 'buyer', form: 'say', tag: '新' },
      { id: 'x-buyer-2', text: '他盯著天花板，一動也不動。', voice: 'buyer', form: 'look', tag: '新' },
      { id: 'x-label-1', text: '「這手是商業機密。」', voice: 'label', form: 'say', tag: '新' },
      { id: 'x-label-2', text: '他低頭滑手機，回了一封信。', voice: 'label', form: 'act', tag: '新' },
      { id: 'x-critic-1', text: '他翻開筆記本，寫了幾個字。', voice: 'critic', form: 'act', tag: '新' },
      { id: 'x-critic-2', text: '「先看你怎麼出，我再下筆。」', voice: 'critic', form: 'say', tag: '新' },
      { id: 'x-boss-1', text: '他閉上眼睛，好像在聽什麼。', voice: 'boss', form: 'look', tag: '新' },
      { id: 'x-boss-2', text: '他摸著木箱的邊，不急。', voice: 'boss', form: 'act', tag: '新' }
    ]
  };
  C.hintLinesTag = '新';

  // ===================================================================
  // 一次性老闆小提示（每種一輩子只出一次，不擋點擊，5 秒；≤20 字）。鍵＝duel.js hooks.hint(id) 的 id。
  // ===================================================================
  C.coachTips = {
    tip_mirror: '同色比星數，多的扣差額。',
    tip_bluff: '嘴上說名盤，手上不一定是。',
    tip_block: '差 2 星以上，剋不動。',
    tip_ace: '王牌 7 星，一場用一次。',
    tip_rounds: '六手沒分勝負，比聲望條剩幾成。',
    tip_lastplay: '上一手留在上面，點開看細節。',   // 店主 11-16「打完要把上一手的專輯留在檯面上」；11-17 點一下改開上一手詳情（按住照舊是唱片資訊）
    // 11-17 讀牌加難（DESIGN §2.3）：客人會讀你上一手、提示分級、被唬到多扣
    tip_read: '他會記得你上一手怎麼出。',
    tip_half: '這句只說他不出哪一種。',
    tip_none: '這手他不露口風。',
    tip_hit: '被他唬到，多扣 1。'
  };
  C.coachTipWhen = {
    tip_mirror: '第一次同色比星（含同色同星）', tip_bluff: '第一次被唬', tip_block: '第一次剋不動（你或他）',
    tip_ace: '第一次丟王牌', tip_rounds: '第一次打到第 6 手', tip_lastplay: '第一次出現上一手小列（第 2 手；點開＝上一手詳情）',
    tip_read: '第一次被他讀到（他照你上一手的應付方式剋你）', tip_half: '第一次看到半指的提示（只說他不出哪一種）', tip_none: '第一次看到不露的提示（這手沒給提示）',
    tip_hit: '第一次被唬到多扣'
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
    tapOn: '點一下繼續',   // 唬你／剋不動的結果框停住時（店主 11-12：看不清楚被唬了什麼）
    // 讀對了就說出來（第 A 波 4，規劃書三＋四 ①）：剋中他（照實出）結果句前加 readRight；他唬人、你照他真正出的剋中＝seeThrough（取代「他唬你！」那句）
    readRight: '讀對了。', seeThrough: '你看穿了！『{key}』是{hint}，他出的是{e}。', seeThroughNoKey: '你看穿了！提示是{hint}，他出的是{e}。',
    lpAria: '上一手{who}丟的：{t}，點一下看這手細節，按住看唱片資訊',   // 上一手小列的讀屏字（店主 11-16；11-17 點一下改開上一手詳情）；{who}＝他／你，{t}＝藝人《專輯》
    lpAriaInfo: '上一手{who}丟的：{t}，點一下看唱片資訊',   // 教學那場：小列點一下照舊開唱片資訊（教學不開上一手詳情）
    // 11-17 讀牌加難（DESIGN §2.3）：結果句不念關鍵字（背對照表沒得背；上面 bluff／honest／seeThrough 那幾句只剩教學那場用）。{e}＝他出的
    //   honestPlain＝他照實（明指；半指＝他沒出他說不出的那色）；bluffPlain＝他唬你；seeThroughPlain＝你剋中他真正那張；
    //   readHit＝他照你上一手的應付方式剋你（clash why read／readHonest），l3 依你上一手：readCounter 照提示剋／readMirror 跟提示同色／readThird 防他唬人
    honestPlain: '他照實出。', bluffPlain: '他唬你！他出的是{e}。', seeThroughPlain: '你看穿了！他出的是{e}。',
    readHit: '他讀到你了！他出的是{e}。',
    readCounter: '你上一手照提示剋，他就在等這招。', readMirror: '你上一手跟提示同色，他換了一招。', readThird: '你防他唬人，他偏偏照實來。',
    // 11-17 上一手細節（店主「上一場發生了什麼事的細節還是來不及看清楚，一閃就沒了」；scratchpad v5/recap）：
    //   揭曉後停住等點（tapOn 那行）；點上一手小列＝上一手詳情；頂欄「紀錄」＝這場每一手一行。結果字一律是上面那些結果句（recap.js 經 clashText 重排），這裡只有面板的框字
    //   rcHand／rcOf＝詳情頂列「第 n 手／6」；rcAfter＝這手打完雙方的聲望（log 的 pHp／eHp；不單寫「打完」：遊戲裡多指整場，審查 11-17）；rcCounter…rcTie＝紀錄每列的結果詞；rcBluff／rcSaw／rcRead＝籤（＝結果句的唬你／看穿／讀到）
    rcLink: '紀錄', rcList: '這場紀錄', rcListDone: '上一場紀錄', rcCount: '{n} 手', rcAll: '全部', rcEmpty: '第 1 手揭曉後才有紀錄。',
    rcHand: '第 {n} 手', rcOf: '／{max}', rcAfter: '這手打完　你 {p}／{pm}　他 {e}／{em}', rcVs: '對', rcNone: '不扣',
    rcCounter: '你剋中', rcCountered: '被他剋', rcGapYou: '剋不動', rcGapHim: '他剋不動', rcMirrorWin: '比星贏', rcMirrorLose: '比星輸', rcTie: '平手',
    rcBluff: '被唬', rcSaw: '看穿', rcRead: '被讀到',
    rcPrev: '前一手', rcNext: '後一手', rcClose: '關閉', rcCover: '{t}，點一下看唱片資訊'
  };
  C.duelTextTag = '新';
  // 牌桌小抄（點相剋圖打開；店主 11-12）：[左欄, 右欄]，左欄寫全名；duel.js 只把屬性第一個字上色、第二個字黑、剋灰（店主 11-12）
  C.cheatSheet = [['冷門剋經典', '大家都聽過的不稀奇'], ['經典剋硬蕊', '再難入耳也比不過名盤'], ['硬蕊剋冷門', '再冷門，碰上真硬的也得低頭'], ['差 2 星以上', '剋不動，比星數']];
  C.cheatSheetTag = '新';
  // 選屬性時相剋圖旁那一行（v5 規劃書第二項的小尾巴；店主 11-15 開工）：{a}＝你選的屬性、{b}＝它剋的、{c}＝剋它的。
  //   duel.js 把屬性第一個字上色、第二個字黑（同小抄）；「剋」綠、「怕」紅＝相剋圖亮的綠箭頭（你剋得到）／紅箭頭（剋你的）
  C.triLegend = '{a}：剋{b}｜怕{c}';
  C.triLegendTag = '新';

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
    // foot[1] 的數字照 C.trial（開局聲望、打贏回幾點）；foot[2]＝品味／底氣（無限試煉升級加的；對決名字列的「品」「底」小籤）
    foot: ['點專輯再點屬性出牌；按住封面看唱片資訊。', '你開局 ' + C.trial.youHp + ' 聲望（升級會加），打贏回 ' + C.trial.heal + '；客人 {normal}、傳說藏家 {boss}。',
      '品味：剋中多扣，客人扣到就多扣；底氣：被扣少扣，最多擋一半。']   // 一行放得下（375 寬）：規則卡四個尺寸不捲動
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
    { id: "coldplay|mylo xyloto", attr: 'c' }, { id: "imagine dragons|night visions", attr: 'c' }, { id: "limp bizkit|results may vary", attr: 'h' },
    { id: "老王樂隊|暮夜徐行", attr: 'o' }, { id: "eminem|the eminem show", attr: 'c' }, { id: "katy perry|prism", attr: 'c' }
  ];
  var TUT_HINTS = ['c5', 'c2', 'h2', 'o2', 'c4', 'c2'];
  var TUT_HANDS = {
    hall: {
      // 店主 11-13 換成有名的：第 1 手 Random Access Memories 經典 5（比星數 −3）、第 2 手 Cookin' 冷門 2（冷剋經 −2）、第 3 手 Low 經典 5（經剋硬 −5）、
      //   第 4 手 Music for Airports 硬蕊 3（硬剋冷 −3；他的冷門 4 沒高 2 星，剋得動）；前四手 13、第 6 手王牌 −5，剛好 18 KO
      hand: ["daft punk|random access memories", "miles davis|cookin' with the miles davis quintet", "david bowie|low", "brian eno|ambient 1: music for airports"], draw: [],
      pick: [{ id: "daft punk|random access memories", attr: 'c' }, { id: "miles davis|cookin' with the miles davis quintet", attr: 'o' }, { id: "david bowie|low", attr: 'c' },
        { id: "brian eno|ambient 1: music for airports", attr: 'h' }, 'blocked:o', 'ace']
    },
    pearl: {
      hand: ["bark psychosis|hex", "黃小楨|賞味期限", "charles brackeen|rhythm x", "傷心欲絕|我愛您"], draw: [],
      pick: [{ id: "bark psychosis|hex", attr: 'c' }, { id: "黃小楨|賞味期限", attr: 'o' }, { id: "charles brackeen|rhythm x", attr: 'c' },
        { id: "傷心欲絕|我愛您", attr: 'h' }, 'blocked:o', 'ace']
    },
    heresy: {
      hand: ["the velvet underground|white light-white heat", "magma|mëkanïk dëstruktïw kömmandöh", "pharoah sanders|tauhid", "melt-banana|speak squeak creak"], draw: [],
      pick: [{ id: "the velvet underground|white light-white heat", attr: 'c' }, { id: "magma|mëkanïk dëstruktïw kömmandöh", attr: 'o' }, { id: "pharoah sanders|tauhid", attr: 'c' },
        { id: "melt-banana|speak squeak creak", attr: 'h' }, 'blocked:o', 'ace']
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
      hall: [{ kind: 'mirrorWin', toE: 3, toP: 0 }, { kind: 'counter', toE: 2, toP: 0 }, { kind: 'counter', toE: 5, toP: 0 },
        { kind: 'counter', toE: 3, toP: 0 }, GAP5, { kind: 'mirrorWin', toE: 5, toP: 0 }],
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
    // 換王牌（店主 11-13）：換完、選同一張、打過第 1 位之後點老闆（不給換了）
    aceDone: L('好，換這張。送你的也一起換了。', '新'),
    aceSame: L('那就照舊。', '新'),
    aceLater: L('想換王牌？下一趟開門前再說。', '新'),
    aceKeep: L('好，就帶這張。', '新'),                          // 頂點卡試做（?apex=1）：同一派換另一張頂點卡（送的四張沒換）
    aceLockedSay: L('那張還沒到手。打倒傳說藏家再說。', '新'),      // 解鎖制（店主 11-16）：換到鎖住的派／沒收到的頂點卡（畫面已經擋，保險）
    // 第 1 句講對戰台（第 A 波 1：客人走過去等你，你走過去／點對戰台就開打；審查 A-11）；第 4 句：移出包包只能在兩位客人之間去櫃檯賣給老闆
    //   （第 A 波 5；店主 11-16「就是 Monster Train 的方式」）——這四句是老闆自己講的，用「我」（審查 A-13）
    nightIntro: [L('客人在對戰台等，走過去就開打，輸了才停。', '新'), L('客人跟剛才那位不一樣，有時會唬你。', '新'), L('贏了有錢，兩位客人之間可以去箱子買唱片。', '新'),
      L('用不到的唱片，拿來櫃檯，我半價收。', '新')],
    // 第 A 波：險勝（剩 1–2 聲望贏下，大章換「險勝！」時老闆補一句）；櫃檯交還老闆送的／櫃裡帶來的（$0）那一下老闆說的
    closeWin: L('好險，差一點就輸了。', '新'),
    reclaimGift: L('送你的，我先收回來。', '新'),
    reclaimSeed: L('你自己的那張？我先替你收著。', '新'),
    bin: L('點封面看唱片資訊、試聽。', '新'),
    booth: L('挑一張你唱片櫃裡的，放來聽聽。', '新'),
    boothEmpty: L('唱片櫃還空著。贏一場再來聽。', '新'),
    titleHint: L('點店裡的東西看看：牆上的唱片、箱子、試聽機', '新'),
    taipeiHere: L('你在這', '新'),
    taipeiNote: L('其他店還沒開。之後一家一家開，每家的箱子、客人、老闆都不一樣。', '新'),
    taipeiLink: L('出門看看（台北地圖・預告）', '新'),
    backToShop: L('回店裡', '新'),
    // 你家（聆聽室，v5 第六項第三期第一步）：台北地圖的小房子、房間的頂欄與面板、唱片架、唱盤、控制台（頻率光譜的星圖）、想要清單
    homeBtn: L('你家', '新'),
    homeTitle: L('你家', '新'),
    homeSub: L('聆聽室', '新'),
    homeNote: L('點唱片架、唱盤、控制台，會走過去打開。', '新'),
    homeEmpty: L('唱片架還空著。推門玩一趟，帶走的唱片會擺在這裡。', '新'),
    homeShelf: L('唱片架', '新'),
    homeDeck: L('唱盤', '新'),
    homeConsole: L('控制台', '新'),
    homeShelfSub: L('點封面看唱片資訊，按「放唱盤」就放來聽。', '新'),
    homeDeckSub: L('挑一張放上唱盤。放完接下一張收藏。', '新'),
    homeDeckEmpty: L('唱片架還空著，唱盤沒東西放。', '新'),
    homePut: L('放唱盤', '新'),
    homeOnDeck: L('放上唱盤：《{album}》', '新'),
    homeStop: L('停', '新'),
    homeNow: L('唱盤上', '新'),
    homeIdle: L('唱盤空著。點唱盤挑一張來放。', '新'),
    homeWantN: L('想要清單 {n} 張', '新'),
    homeWant: L('《{album}》加進想要清單。', '新'),
    homeWantAgain: L('《{album}》已經在想要清單裡。', '新'),
    homeTuneFail: L('控制台開不起來，等一下再試。', '新'),
    homeTuneLoading: L('控制台開機中…', '新'),
    homeTuneBack: L('回房間', '新'),
    // 一檔貨（第 B 波 SPEC-B §3.7）：第一次在兩位客人之間換過貨（save.seen.lotHint）；第一次碰到全卡池那一檔（save.seen.lotAll，第 2 輪開頭）
    lotHint: L('每位客人走了，每一箱都換上新的一排；打完傳說藏家，整批貨換新。', '新'),   // 驗收：原本「換幾張」，實際每箱整排換
    lotAll: L('新的一批到了，這批是從倉庫深處挖出來的。', '新'),
    // 今日推薦（SPEC-B §4.6）：當天第一次到標題、或兩位客人之間還沒收（一趟一次）
    dailyNew: L('今天幫你留了一張，放在試聽機。', '新')
  };
  C.shopLines = pick(RAW_SHOP, 't');
  C.shopLineTags = pick(RAW_SHOP, 'g');
  C.shopLineWho = { cat: '店貓', poster: '老闆', locked: '（畫面字）', binBusy: '老闆', ownerHint: '老闆', nightIntro: '老闆', bin: '老闆', booth: '老闆', boothEmpty: '老闆',
    aceDone: '老闆', aceSame: '老闆', aceLater: '老闆', aceKeep: '老闆', aceLockedSay: '老闆', closeWin: '老闆', reclaimGift: '老闆', reclaimSeed: '老闆',
    titleHint: '（畫面字）', taipeiHere: '（畫面字）', taipeiNote: '（畫面字）', taipeiLink: '（畫面字）', backToShop: '（畫面字）',
    homeBtn: '（畫面字）', homeTitle: '（畫面字）', homeSub: '（畫面字）', homeNote: '（畫面字）', homeEmpty: '（畫面字）', homeShelf: '（畫面字）', homeDeck: '（畫面字）',
    homeConsole: '（畫面字）', homeShelfSub: '（畫面字）', homeDeckSub: '（畫面字）', homeDeckEmpty: '（畫面字）', homePut: '（畫面字）', homeOnDeck: '（畫面字）', homeStop: '（畫面字）', homeNow: '（畫面字）', homeIdle: '（畫面字）',
    homeWantN: '（畫面字）', homeWant: '（畫面字）', homeWantAgain: '（畫面字）', homeTuneFail: '（畫面字）',
    homeTuneLoading: '（畫面字）', homeTuneBack: '（畫面字）', lotHint: '老闆', lotAll: '老闆', dailyNew: '老闆' };

  // 經濟介面的字（B3 用；{x} 由 UI 代入；${n} 的 $ 是錢的符號，{n} 一律代入千分位字串 engine.moneyText(n)：$1,200）
  C.shopUi = {
    money: '${n}',
    binTitle: '{label}',
    buy: '買 ${n}',
    noMoney: '錢不夠',
    giftTag: '老闆送的',             // 老闆送的（王牌那組四張；engine.isGift）：包包面板、櫃檯「賣給老闆」的小籤（交還老闆，$0）
    seedTag: '櫃裡帶來',             // 從唱片櫃帶來的種子（engine.isSeed）：包包面板、櫃檯「賣給老闆」的小籤（交還老闆，$0）
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
    // 一檔貨（第 B 波 SPEC-B §3.7）：抽屜空箱兩種字照 engine.lotLeft 選；C.lot.on false 時用舊字 binEmptyRound
    binEmptyLot: '這一批的這一箱賣完了，打完傳說藏家整批換新。',
    binEmptyRound: '這一箱賣完了，下一輪再補。',
    // 想要清單（SPEC-B §5.3）：抽屜稀有度籤旁的小籤；第一次上架的吐司（{bin}＝店裡箱子的英文名牌＋中文，例「JAZZ（爵士）」；
    //   多張用 wantOnShelfN，{bins}＝幾個箱子的英文名牌「JAZZ、SOUL」；驗收：只講中文箱名對不上店裡的名牌、多張沒說在哪）
    wantTag: '你想要的',
    wantOnShelf: '你想要的《{album}》上架了，在{bin}那一箱。',
    wantOnShelfN: '你想要的 {n} 張上架了：{bins}。',
    close: '關閉',
    earned: '+${n}',
    // B3 econ.js 用到的字（notes-B3 請求 7；econ.js 有同字後備）
    bag: '包包 {n} 張',                 // 包包不限張數（店主 11-16）：只寫張數，不寫上限（抽屜標題、來客包包條、領獎面板）
    binEmpty: '這一箱賣完了，下一位客人來之前會換一批。',   // 一檔貨（SPEC-B §3.7）：這一檔這一箱還有貨（沒貨了＝binEmptyLot）
    owned: '包包裡有了',
    relicSell: '賣這件',
    relicSold: '「{name}」賣掉，+${n}',
    relicEmpty: '櫃檯的配件賣完了，下一輪再補。',
    relicMoneyShort: '錢不夠：先賣一件，半價 ${n}',
    relicSellFirst: '先賣一件',
    bargainHint: '挑一到三張',                                     // 特價箱（之後買）還沒挑時的鈕
    bargainFree: '這次免費',                                       // 序章／開局挑三張：每張的特價劃掉
    prev: '上一張',
    next: '下一張',
    infoAria: '唱片資訊、試聽',
    // 櫃檯賣給老闆（第 A 波 5；店主 11-16「要去櫃檯賣給老闆才能移出包包，這也是在局中備戰時發生，就是 Monster Train 的方式」）：
    //   移出包包只走櫃檯（engine.choose sell＋sellQuote）；櫃檯抽屜兩個分頁「配件／賣給老闆」。一般唱片半價；老闆送的、櫃裡帶來的交還老闆（$0）
    relicTab: '配件', sellTab: '賣給老闆',
    sellTitle: '賣給老闆',
    sellNote: '半價收。老闆送的、櫃裡帶來的交還老闆。',
    sellAsk: '賣掉《{album}》？',            // 點一張：底下那條先問一次
    sellGo: '賣給老闆 +${n}',
    reclaimAsk: '把《{album}》交還老闆？',
    reclaimGo: '交還老闆',
    reclaimTag: '交還老闆',                  // 送的／種子那格封面下的字（不寫錢）
    reclaimed: '《{album}》交還老闆',          // 吐司
    sellNo: '算了',
    sellInfo: '唱片資訊',                    // 賣給老闆：選了一張，底下那條旁邊的小鈕（開唱片資訊、試聽；審查 A-8）
    bagSellMin: '包包至少留 {n} 張，手牌才補得滿。',   // {n}＝engine.CFG.handSize（engine 'bagMin'）
    goCounter: '去櫃檯賣唱片',               // 箱子／特價箱錢不夠：鈕下面的小字（買唱片時不能順手賣，engine 'counterOnly'）
    // 包包面板（來客畫面點「包包」）：只看、點封面開唱片資訊；說明那行指去櫃檯
    bagNote: '不要的唱片：兩位客人之間，拿去櫃檯賣給老闆。',
    bagSellHint: '包包越塞越滿？拿去櫃檯賣給老闆，半價。'   // 一次性提示（save.seen.bagSell）：兩位客人之間、包包 10 張以上，老闆頭上閃一下＋吐司
  };
  C.shopUiTag = '新';

  // ===================================================================
  // 從唱片櫃挑牌開局（店主 11-13；SPEC 從唱片櫃挑牌開局）：唱片櫃分「擁有」（我的收藏）與「認識」；第二趟起開局從收藏挑最多 3 張種子，
  //   其餘老闆送的、特價箱補；每一趟結束從這一趟進過包包、客人掉落的唱片帶走一張（店內取得：金框）。{x} 由畫面代入
  //   掉落旁白（店主句）在 C.script.drop；賣回擋種子的字在 C.shopUi（seedTag／seedNoSell）
  // ===================================================================
  C.seeds = {
    ui: {
      pickTitle: '從唱片櫃帶唱片來開局',
      pickSub: '開局 {n} 張：你帶的，加上老闆送的補滿（最多帶 {max} 張）',   // n＝老闆送的那組幾張（4）；這次王牌那組不列（照樣會送，審查 #3）
      pickCount: '{n}／{max}',
      pickTake: '帶這張',
      picked: '✓ 帶了',
      pickGo: '就這幾張 ▸',
      pickNone: '先不挑',
      pickAll: '全部',
      pickEmpty: '這個顏色最強的，還沒有收藏。',                   // 篩選＝那一色是這張最高的（平手兩色都算，審查 #8）
      pickFull: '最多帶 {max} 張。先取消一張。',
      pickFullToast: '已經帶滿 {max} 張，先取消一張再換。',   // 滿了還點：吐司（面板捲到下面也看得到，審查 #4）
      keepTitle: '這一趟帶走一張',
      keepSub: '收進「我的收藏」，下一趟可以帶來開局。',
      keepPick: '帶走這張',
      keepCount: '{n} 張可以挑：進過包包的、客人掉的',
      keepLater: '先不帶',
      keepDone: '《{album}》收進「我的收藏」了',
      keepNone: '這一趟的唱片，「我的收藏」裡都有了。',
      fromBag: '進過包包',
      fromDrop: '客人掉的',
      shelfOwn: '我的收藏 {n} 張',
      shelfOwnSub: '可以帶來開局；王牌只展示。',
      shelfOwnEmpty: '還沒有收藏。挑過的王牌那組、每一趟帶走的，都會收進來。',
      shelfKnown: '認識過 {n}／{total}',
      shelfKnownSub: '客人丟的、你收的、老闆送的都算。',            // 360／375 寬也排一行（審查 #9）
      // 「認識」的說法（唱片櫃＝「我的收藏」＋「認識過」兩段；沒收的只是認識，不能帶來開局，審查 #5）。包包不限張數之後沒有「挑一張拿出來」（店主 11-16）
      rewardNote: '點封面看唱片資訊、試聽。沒收的也都算認識了。',
      stakeSkipSub: '也算認識了',
      storeTag: '店內取得',
      // 主站頻率光譜「帶去店裡對決」帶來的那張（v5 第六項第一期）：下一趟開局挑種子排第一、預設勾好；不用擁有，用一次就沒了（不進戰鬥規則、不動平衡）
      pickBrought: '帶來的',                                            // 挑種子面板那張封面左上的小籤
      bringToast: '《{album}》在櫃檯等你：下一趟開局可以帶上場',          // 標題畫面吐司（網址 ?card= 收下時）
      bringToastFirst: '《{album}》在櫃檯等你：先跟老闆走一趟，下一趟帶上場',   // 第一次玩（接著是序章，序章那一趟不挑種子）
      bringMissing: '店裡沒有這張唱片。',                                 // ?card= 查不到或是王牌（帶不進來）
      bringLegend: '《{album}》是傳奇唱片，帶上場太好打，店裡不收；史詩以下都能帶。',   // ?card= 是傳奇（主線 M2：不收；史詩照帶）
      // 存檔唯讀（第 B 波 SPEC-B §2.1、附錄 A）：標題 lb-foot 一行；兩個都有只出 migrateFail
      migrateFail: '存檔升級失敗，這次先不存檔；重新整理再試一次。',      // 卡片 id 換 catalogId 那一步丟例外（整份唯讀、不覆寫）
      poolMissing: '唱片沒有全部載到，這次先不存檔；重新整理再試一次。'   // cards-pool.js 沒載到（C.poolLoaded false）
    }
  };
  C.seedsTag = '新';

  // ===================================================================
  // 今日推薦集點卡（第 B 波 SPEC-B §4；店主 11-16「每日上線可收到推薦新專輯，蒐集一週給獎勵」）：每天第一次來，老闆在試聽機留一張你還沒認識的；
  //   收下＝擁有（唱片櫃 src daily）、蓋一格；滿七格三選一換一張史詩（不給傳奇：帶上場太好打，主線 M2）。不必連續、不歸零。{x} 由畫面代入
  // ===================================================================
  C.daily = {
    title: '今日推薦',
    hint: '每天第一次來，我留一張你還沒認識的唱片在這裡。收下就是你的，下一趟可以帶上場；蓋滿七格，換一張好盤。',   // 第一次打開（save.seen.dailyHint）
    take: '收下',
    taken: '收進唱片櫃了',
    tomorrow: '明天再來，我再幫你留一張。',          // 收過之後那顆鈕的灰字（老闆第一人稱，跟 hint 同一個口吻；驗收）
    none: '今天店裡沒有你還沒聽過的了。',             // 沒候選（E.dailyPick 回 null）
    stamps: '集點卡 {n}／7',
    firstStamp: '見面禮',                          // 第一格角落小字（第一次建立先送一格；新玩家也有，所以不寫「老客人」；驗收）
    claim: '換獎勵',
    claimTitle: '挑一張帶回家',
    claimed: '收進唱片櫃，下一趟可以帶上場。',          // 換完的吐司
    titleChip: '今日推薦：《{album}》'                // 標題 lb-foot 的小籤（沒收時；收過＝stamps）
  };
  C.dailyTag = '新';

  // 結算（這一趟結束）：「走到第 23 位・最多連贏 12 位・收了 9 張」（店主 11-12）；標題畫面的紀錄「最遠：第 23 位」
  C.summary = { title: '試煉結束', reached: '走到第 {n} 位', streak: '最多連贏 {n} 位', taken: '收了 {n} 張', wins: '贏了 {n} 位', none: '這一趟沒收唱片',
    best: '最遠：第 {n} 位', newRecord: '新紀錄', checkpoints: '中繼點：第 {list} 位', again: '再挑戰一趟',
    more: '還有 {n} 張，點了開唱片櫃',                 // 結算那面牆只排一排，多的收成「+N」那格（讀屏念這句）
    // 差一點摘要（第 A 波 4，規劃書三＋四「都是真的資訊，不造假」）：走到的那一列後面的小籤；輸掉那場他剩的聲望與翻盤那一手
    toBreak: '差 {n} 位破紀錄', closeHp: '他只剩 {n} 聲望', flipBy: '第 {k} 手被{e}剋{p}翻盤', flipAt: '第 {k} 手被他翻盤' };
  C.summaryTag = '新';

  // ===================================================================
  // 第 C 波：獎勵與店內攤位（店主 11-16「全部開始做吧」；規格 scratchpad v5/wave-c SPEC-C；engine.js WAVEC 是同一份預設、全關，wcCfg 逐層合併）
  //   loot  每打贏一位一般／菁英：戰利品列（三張蓋牌挑一、不收 +$200；15% 金邊盤、6% 紅包）
  //   chest 打贏藏家：寶箱（三張；8% 鎮店盤格〔九第二波前＝金邊盤〕、30% 金邊；連 5 箱沒有鎮店盤格下一箱必有，跨趟）；藏家帶的頂點卡照 #465 直接收下，寶箱不放頂點卡
  //   stall 每打完一輪：今天的攤位二選一（花錢站每組最多 1、四站至少一個藍框；第一趟固定；中繼點多市集＋錄音室；這一趟第 30 位起 35% 踢館帖）
  //   safety 新手保底（上一趟沒到第 10 位：第 1 位輸了免費重打一次）；draft 中繼點開局快速選秀（null＝照公式）
  //   撿來的盤（戰利品列、寶箱、挖寶攤、倉庫、寄賣領回、選秀收的）櫃檯賣回一律＝不收的錢（$200）；樂歷 C 波只記帳（save.lexpBank），D 波一次入帳
  //   ui：畫面字（{n} 等由畫面代入；錢先 E.moneyText）
  // ===================================================================
  // 驗收修正（2026-11-17，D2）：新帳號第一趟一定有新手保底（ui createRun），帶保底量新手到第 10 位 33.5%（≤33% 不過）；
  //   多的幾點幾乎全來自戰利品列的錢（不收、紅包；全歸 0＝28.2%）→ 不收 $400→$200（寶箱、挖寶攤同；撿來的賣回照「＝不收」也是 $200）、紅包 12%→6%：31.9%
  C.waveC = {
    loot: { on: true, n: 3, gold: 0.15, packet: 0.06, packetCash: 0.7, packetLexp: 15, skipCash: 200 },
    chest: { on: true, n: 3, apex: 0.08, gold: 0.30, pity: 5, dareN: 4, dareCash: 5000, skipCash: 200 },
    pools: { goldPlus: 2, goldMin: 10, goldCap: 12, goodPlus: 1, goodMin: 9, goodCap: 12, powerMin: 6, powerCap: 11, colorMin: 30 },
    stall: {
      on: true,
      weights: { dig: 3, trade: 2, gear: 2, snack: 2, gig: 2, promo: 2, fortune: 1.5, consign: 1, home: 1 },
      unlock: { promo: 10, consign: 15, dare: 30 },               // promo／consign 看 max(最遠紀錄, 剛打完第幾位)；dare 只給解鎖階梯顯示（出不出照 dare.from）
      first: [['dig', 'fortune'], ['warehouse', 'home']],          // 第一趟（每一趟打完第 5 位）固定；後面再接錄音室（宵夜換窗邊算命，§14-4）
      paid: ['trade', 'gear', 'gig'], blue: ['gig', 'promo', 'home'],   // 花錢站每組最多 1 個；四站至少一個藍框（樂歷站）
      leaveCash: 1000, reroll: 500, skipCash: 200, tradeN: 3, gearN: 2, gearPrice: 3000, snackHp: 3,
      gig: { base: 3000, step: 1000, lexp: 20, keep: 4000 },       // 第 k 張 $3,000＋$1,000×(k−1)，整趟累計；keep＝「買到剩 $4,000」
      promoN: 3, promoLexp: 10, homeLexp: 30, demoLexp: 15, consignRounds: 2,
      market: { cards: 6, gear: 3, bag: { price: 2500, n: 3, apex: 0.06, max: 1 } },
      dare: { from: 30, p: 0.35, tough: { atk: 1 }, tank: { hp: 4 } },   // from 看「這一趟剛打完第幾位」，不看最遠紀錄
      digNames: [                                                  // 攤名＝曲風／地區 ×3（不是篩選）；lit＝店裡跟著亮的箱（shops/dip.json prop id）
        { id: 'jazzTeacher', genres: ['jazz'], lit: ['crate-jazz'] },
        { id: 'bandRoom', genres: ['rock'], lit: ['isl-0a'] },
        { id: 'djAbroad', genres: ['electronic', 'hiphop'], lit: ['isl-0b', 'isl-1b'] },
        { id: 'oldRadio', region: ['tw', 'zh'], lit: ['crate-tw'] },
        { id: 'grandpa', genres: ['pop', 'soul', 'blues'], lit: ['isl-1a', 'winbin'] },
        { id: 'classicalStudy', genres: ['classical'], lit: ['isl-2b'] },
        { id: 'backpacker', genres: ['world'], lit: ['isl-3a'] },
        { id: 'closedShop', lit: [] }] },                          // 不加權
    safety: { on: true },
    draft: { k: null, m: null, mLess: 1, mRate: null },          // 中繼點開局選秀：升級 m＝round(期望等級−1−mLess)（比從頭打少一級）；mRate 給數字＝舊公式 round(mRate×(L−1))
    ui: {
      // 戰利品列（掉落字幕沿用 C.script.drop G1，店主句一字不改）
      take: '收這張',
      skip: '不收（+${n}）',
      orRelic: '或改拿一件發燒配件',                              // 菁英（relic）
      firstLoot: '包包越厚，好牌越難抽到。不收也有 ${n}。',         // 老闆，第一次出戰利品列說一次（save.seen）
      foundSell: '賣給老闆 ${n}（撿來的）',                        // 櫃檯價籤：撿來的一律＝不收的錢（$200）
      foundTag: '撿來的',                                          // 櫃檯「賣給老闆」格子上的小籤（介面 A 加；確認鈕寫 foundSell）
      packetCash: '酬勞再給一次',
      packetLexp: '樂歷 +{n}',                                    // 第 D 波：樂歷入帳了（SPEC-D §2.6-7、§2.8-5），不寫「之後開放」
      // 戰利品列、寶箱的面板（介面 A 加；loot.js）
      lootTitle: '他掉的唱片：挑一張收進包包',
      lootFlip: '點一下翻開',                                       // 蓋著那張的說明（讀屏、小字）
      xpGain: '經驗 +{n}',                                          // 音符旁邊那個數
      upHint: '收了包包會變強',                                     // 角落「↑」（bagScore 會漲才畫）
      shelfPlus: '唱片櫃 +{n}',                                     // 不收：三張飛向唱片牆
      chestTitle: '藏家的木箱：挑一張收進包包',
      chestOpen: '點一下掀開',
      // 寶箱
      chestRelic: '改拿一件配件',                                  // 寶箱第二顆鈕（relic）
      chestPity: '這箱有好東西。',
      dareDone: '踢館帖撐完 +${n}',
      // 今天的攤位（底部面板）
      stallTitle: '今天的攤位',
      stallHint: '選一邊，另一邊今天就收了。',
      left: '左邊', right: '右邊', pickThis: '就這組',
      priceFree: '免費', priceFrom: '${n} 起', priceLexp: '樂歷',
      leave: '今天不逛了（剩下每攤 +${n}）',
      leaveAsk: '今天不逛了？剩下的攤位每攤給你 ${n}。',
      leaveYes: '不逛了', leaveNo: '再看看',
      busy: '先逛完今天的攤位。',                                   // 攤位中點箱子、收音機、櫃檯、對戰台
      done: '逛完了',
      spent: '−${n}',                                               // 攤位花錢時頂上那條（跳錢條，往下數；賺錢照舊 shopUi.earned）
      lexpLater: '樂歷 +{n}',                                     // 攤位（公關片、店裡唱盤、演唱會）的樂歷吐司；鍵名沿用 C 波
      // 各站的鈕與小字
      reroll: '再翻一次（${n}）',
      sellOne: '賣一張給他',
      relicFull: '配件滿 3 件，先選一件半價賣掉。',                  // 器材行、市集器材（relic）
      snackBtn: '聲望 +{n}',
      snackFull: '聲望滿了，吃完就走',                               // 宵夜：聲望已滿時那顆鈕（按了 +0，照實寫）
      snackFullTag: '免費・聲望已滿',                                // 選組那列的站牌第三行（聲望滿了，選之前就看得出來）
      snackFullToast: '聲望本來就滿了。',
      gigBuy: '買 {k} 張（${n}）',
      gigKeep: '買到剩 ${n}',
      gigKeepN: '買到剩 ${n}（{k} 張）',                              // 演唱會：括號＝留 $4,000 之後買得起幾張
      gigNone: '先不買',
      promoNote: '收進唱片櫃，認識一下。',
      fortuneRatio: '他牌組裡：經典 {c} 張・冷門 {o} 張・硬蕊 {h} 張',
      fortuneAce: '他帶的王牌',
      consignPick: '挑一張寄賣',
      consignBack: '寄賣到期，三張挑一張。',
      homePick: '挑一張放上去',
      // 踢館帖：加的是這一輪 5 位對手（不是你）；面板寫撐完有什麼
      dareTough: '接：狠角色（這輪 5 位品味各 +{n}）', dareTank: '接：耐打（這輪 5 位聲望各 +{n}）', dareNo: '不接',
      dareReward: '撐完這一輪：藏家的木箱 {k} 張挑一（保證一張金邊），再加 ${n}。',
      dareToughOn: '接了踢館帖：這輪客人品味各 +{n}', dareTankOn: '接了踢館帖：這輪客人聲望各 +{n}',
      marketTabs: ['唱片', '器材', '門票', '福袋'],
      bagBuy: '福袋 ${n}',
      bagNote: '開出 {k} 張史詩以上，挑一張收進包包；每次市集限買 {m} 個。',   // 市集福袋分頁的說明
      bagSold: '今天的福袋賣完了',
      bagPick: '福袋開出這幾張，挑一張收進包包。',
      bagFirst: '先從福袋挑一張',                                    // 福袋開了還沒挑：「逛完了」換成這句、按不下去（不然 $2,500 白花）
      demo: '錄了一段 demo。樂歷 +{n}',                            // 錄音室（C 波自動帶過，浮一行）
      // 各站面板補的鈕（介面 B 加；stalls.js）
      rareTag: '同業珍品',                                          // 同業調貨那格史詩／傳奇的小籤
      sellFor: '賣 +${n}',                                          // 「賣一張給他」每張的鈕（撿來的＝不收的錢、送的／種子寫「交還老闆」）
      pass: '先不拿',                                               // 老闆的倉庫、寄賣領回：不拿（沒有錢）
      promoOk: '收進唱片櫃',
      fortuneOk: '記下了',
      homePut: '放這張', homeNone: '不放了',                       // 店裡唱盤：挑一張放上去／不放（樂歷照記）
      consignNone: '先不寄',
      then: '之後：{list}',                                         // 選組那塊標題旁：選完兩站之後還有的（市集、錄音室）
      // 新手保底
      safety: '第一位不算，再來一次。', safetyBtn: '再來一次',
      // 中繼點開局
      cpTitle: '從哪裡開始？', cpFirst: '第 1 位（從頭）', cpAt: '第 {n} 位（中繼點）',
      draftCard: '補到第 {n} 位：挑一張唱片 {i}/{k}', draftLevel: '補到第 {n} 位：升級 {i}/{m}',
      cpFrom: '這一趟從第 {n} 位開始',                             // 結算頁
      cpWhere: '中繼點開局',                                        // 標題「繼續試煉 ▸第 N 位・中繼點開局」（選秀途中；pos 還是 1）
      cpSkip: '這一趟沒遇到',                                       // 中繼點開局：這一輪第 N 位之前那幾位（點頭像）
      // 解鎖階梯（標題頁、結算頁一行；E.stallLadder）
      ladder: '店內攤位 {a}/{b}｜再走 {n} 位開{name}', ladderAll: '店內攤位 {a}/{b}'
    },
    // 站名（底部面板站牌、小面板標題、解鎖階梯 {name}）
    stations: { stall: '攤位', dig: '挖寶攤', trade: '同業調貨', gear: '器材行', snack: '宵夜', gig: '演唱會', promo: '公關片', fortune: '窗邊算命',
      consign: '寄賣', consignGet: '寄賣簿', home: '店裡唱盤', dare: '踢館帖', warehouse: '老闆的倉庫', market: '黑膠市集', studio: '錄音室' },
    // 站主一句（≤16 字）
    stationLines: { dig: '一箱翻到底，喜歡就帶走。', trade: '這幾張我只賣懂的人。', gear: '這批唱針剛到，要不要？', snack: '先吃碗麵線，再回去拚。',
      gig: '今晚這場，聽完再顧店。', promo: '公關片來了，聽聽看。', fortune: '下個藏家？我看看……', consign: '放這裡，兩輪後回來換。',
      home: '放一張，把今天記下來。', dare: '下一輪都是來踢館的，接不接？', warehouse: '倉庫翻到的，挑一件帶走。', market: '攤位全擺出來了，慢慢挑。' },
    // 挖寶攤攤名（全部虛構，不放真實店名）
    digTitles: { jazzTeacher: '退休老師的爵士櫃', bandRoom: '解散樂團的團練室', djAbroad: '要出國的 DJ', oldRadio: '老電台的片庫',
      grandpa: '阿公的西洋老歌', classicalStudy: '古典樂迷的書房', backpacker: '背包客的世界音樂', closedShop: '收掉的小唱片行' }
  };
  C.waveCTag = '新';

  // ===================================================================
  // 第 D 波：樂歷（局外成長；SPEC-D §2、§4.1，scratchpad v5/wave-d）——預設就開。engine.js CAREER 是同一份預設，careerCfg 逐層合併（物件逐鍵、陣列整個換）
  //   一趟拿多少（careerGain）＝round((基本＋破紀錄＋路線) × (1＋0.1×試煉階級) × (這趟沒走到第 10 位 ? 2 : 1))
  //     基本＝15×實際打過的位數＋8×最多連贏（＝C 波 LEXP_BASE）；破紀錄 +30（最遠紀錄 >0 才給）；路線＝演唱會 ≤ 基本 25%、五項合計 ≤ 基本 40%（執行期截斷）
  //     lowMul／lowBelow＝新手補貼（SPEC-D §14-2 建議 B：沒走到第 10 位那趟樂歷 ×2；lowMul 1＝關）
  //   等級（careerLevel）：Lv n→n+1 要 100n（n<10），之後每級 1,000（累計 Lv2 100、Lv5 1,000、Lv10 4,500、Lv20 14,500）；每升一級 +1 天賦點、抽一張盤進唱片櫃
  //   天賦（talents；cost [a,'k']＝第 k 級 a×k 點、[a,'flat']＝每級 a 點、[a,'k+1']＝第 k 級 a＋k−1 點；max 0＝不封頂；open＝樂歷幾級開；soon＝D 波不做、畫灰）
  //     戰力（品味、底氣、聲望）6k 點、Lv8 開——規劃書價（1＋⌊(k−1)/5⌋、Lv5 開）一點戰力就讓深度差太多，多趟第 5 趟中位就到第 130 位（SPEC-D §11.4、§11.5）
  //   解鎖階梯（ladder；照等級自動開、不花點）：relicPick＝菁英／藏家配件三選一、seedMax＝種子格、goldAdd＝戰利品列金邊機率 +n（加在 C.waveC.loot.gold）
  //   熟練度（prof；每派一條，預設就記）：一章 150、十章一級；落後（<最高那派一半）×2；第一次解鎖先蓋兩章；派點與派樹在 ?fac=1（棒三）
  // ===================================================================
  C.career = {
    lexp: { pos: 15, streak: 8, record: 30, caps: { gig: 0.25, route: 0.40 }, tierMul: 0.10, lowMul: 2, lowBelow: 10 },
    curve: { tri: 100, triTo: 10, after: 1000 },
    draw: { every5: 'epic', epicFrom: 10, other: ['rare', 'uncommon'] },   // Lv10、15、20…史詩；其他稀有／獨特各半（Lv5 也是稀有／獨特：戰力相關的一律 Lv8 以後）
    talentFx: { atk: 1, def: 1, hp: 2, xp: 0.10, plea: 1, money: 500, pay: 0.10, rare: 0.02 },
    talents: [
      { id: 'atk', cat: 'power', cost: [6, 'k'], max: 0, open: 8 }, { id: 'def', cat: 'power', cost: [6, 'k'], max: 0, open: 8 },
      { id: 'hp', cat: 'power', cost: [6, 'k'], max: 0, open: 8 }, { id: 'xp', cat: 'xp', cost: [3, 'k'], max: 2, open: 8 },
      { id: 'plea', cat: 'safe', cost: [15, 'flat'], max: 1, open: 20 },
      { id: 'money', cat: 'money', cost: [1, 'flat'], max: 3, open: 2 }, { id: 'pay', cat: 'money', cost: [1, 'flat'], max: 3, open: 2 },
      { id: 'rare', cat: 'luck', cost: [2, 'flat'], max: 3, open: 8 },
      { id: 'piggy', cat: 'money', cost: [1, 'flat'], max: 3, open: 2, soon: true }, { id: 'reroll', cat: 'luck', cost: [2, 'flat'], max: 3, open: 2, soon: true },
      { id: 'ban', cat: 'luck', cost: [2, 'flat'], max: 3, open: 2, soon: true }, { id: 'intel', cat: 'info', cost: [2, 'k+1'], max: 2, open: 5, soon: true }
    ],
    ladder: [
      { lv: 2, key: 'talents' }, { lv: 8, key: 'power' }, { lv: 10, key: 'relic3', relicPick: 3 }, { lv: 10, key: 'off' },
      { lv: 12, key: 'seed4', seedMax: 4 }, { lv: 15, key: 'gold', goldAdd: 0.01 }, { lv: 20, key: 'plea' },
      { lv: 0, key: 'seed5', soon: true }, { lv: 0, key: 'relicsNew', soon: true }, { lv: 0, key: 'regulars', soon: true }, { lv: 0, key: 'outfit', soon: true }
    ],
    offFrom: 10,                                                  // 樂歷 Lv10 起樂歷頁才有「下一趟的樂歷 照用／關掉」開關（＝ladder 的 off）
    prof: { stamp: 150, per: 10, lagMul: 2, lagBelow: 0.5, firstStamps: 2, pointFrom: 2,
      auto: [{ lv: 3, key: 'sigil', soon: true }, { lv: 5, key: 'tier3' }, { lv: 7, key: 'giftSwap', soon: true }, { lv: 10, key: 'outfit', soon: true }] },
    // 畫面字（{x} 由畫面代入；錢先 E.moneyText）。groups＝樂歷頁天賦表一類一組（cats＝talents[].cat）
    ui: {
      // 樂歷頁（openPage('career')；SPEC-D §2.8-2）
      page: '樂歷', title: '樂歷 Lv {n}', bar: '{a}／{b}', points: '天賦點 {n}', nextLv: '下一級還要 {n}',
      groups: [{ key: 'power', name: '戰力', cats: ['power'] }, { key: 'money', name: '錢與經驗', cats: ['money', 'xp'] },
        { key: 'luck', name: '運氣', cats: ['luck', 'info'] }, { key: 'safe', name: '安全網', cats: ['safe'] }],
      names: { atk: '開局品味', def: '開局底氣', hp: '開局聲望', xp: '局內經驗', plea: '備用說情', money: '開局錢', pay: '酬勞', rare: '稀有率',
        piggy: '存錢筒', reroll: '重抽', ban: '封掉', intel: '客人底細', safety: '新手保底' },
      fx: { atk: '每級開局品味 +1', def: '每級開局底氣 +1', hp: '每級開局聲望上限 +2，現有的也 +2', xp: '每級局內經驗 +10%',
        plea: '每趟一次，這一輪的說情用完才用', money: '每級開局多 ${n}', pay: '每級打贏的錢 +10%', rare: '每級戰利品列金邊機率 +2%',
        piggy: '輸了剩下的錢 10% 帶到下一趟', reroll: '每趟多一次重抽', ban: '每趟封掉一件配件或一張盤', intel: '看他牌組三色比例',   // ban：配件＝relic
        safety: '上一趟沒到第 10 位，第一位輸了免費再一次' },
      moneyOnly: '（只多錢，不會變強）',                             // 開局錢、酬勞兩列效果句後面的灰字（CRITIQUE 4.4）
      powerLater: '戰力天賦 Lv{n} 開，點數先存著也可以',              // Lv8 前天賦頁頂端
      now: '現在 {n} 級', cost: '下一級 {n} 點', maxed: '已滿', auto: '自動', lock: '樂歷 Lv{n} 開', soon: '之後開放',
      respec: '全部重配（免費）', respecDone: '點數都退回來了。',
      // 解鎖階梯（已開的打勾、下一個亮、之後的灰）
      ladderTitle: '解鎖階梯', ladderRow: 'Lv{n} {name}',
      ladder: { talents: '天賦頁', power: '戰力天賦', relic3: '菁英、藏家的配件三選一', off: '可以關掉樂歷', seed4: '種子格 4 格',
        gold: '戰利品列金邊機率 +1%', plea: '備用說情', seed5: '種子格 5 格', relicsNew: '新配件', regulars: '新常客', outfit: '捏角色新服裝' },
      drawRow: '每升一級：抽一張盤進唱片櫃（Lv10 起每 5 級史詩）',
      // 關掉樂歷（Lv10 起、只在樂歷頁；下一趟起生效）
      off: '下一趟的樂歷', offSub: '關掉＝天賦、種子格、配件三選一、金邊全部回到新帳號。樂歷照拿。', offOn: '樂歷關', offBest: '關樂歷',   // 配件三選一＝relicPick
      offSw: '照用', offSwOn: '關掉',                              // 開關右邊的狀態字（不用「開／關」：「關掉樂歷：關」會讀成雙重否定）
      // 標題頁第二行（整行可點＝開樂歷頁；高 ≤600px 用 lineShort）
      line: '樂歷 Lv {n}・下一個：Lv{m} {name} ›', lineAll: '樂歷 Lv {n} ›', lineShort: '樂歷 Lv {n} ›', shelfBtn: '樂歷',
      bestTier: '最遠 {n}（第 {k} 階 {m}）',                        // 試煉階級開了以後第一行的短版（棒三）
      // 結算頁一行＋明細抽屜（SPEC-D §2.8-4）
      endLine: '樂歷 +{n} ›', tierPre: '第 {k} 階・',
      partPos: '走了 {k} 位 +{n}', partStreak: '最多連贏 {k} 場 +{n}', partRecord: '破紀錄 +{n}', partRoute: '路線 +{n}', partCut: '（已到上限）',
      partTier: '×{m} 第 {k} 階', partLow: '還沒走到第 {n} 位：樂歷 ×{m}', partProf: '{title} 蓋了 {n} 個章', partOff: '這一趟關樂歷（樂歷照拿）',
      routeCap: '路線樂歷已到上限',
      // 主鈕之後的過場卡（一次一張、最多 3 張，其餘合成一句）
      lvUp: '樂歷 Lv {n}！天賦點 +1', lvMore: '再升 {n} 級', drawGot: '抽到一張，收進唱片櫃', ladderOpen: '開了：{name}', goTalent: '去點天賦',
      profUp: '{title} 熟練 Lv{n}',
      // 開機入帳（careerDeposit）的吐司
      depositFirst: '老闆：你之前的樂歷我都記著呢。樂歷 +{n}，升到 Lv {to}。', depositMore: '老闆：上次的樂歷補記給你。樂歷 +{n}。',
      // 演唱會買票面板（C 波站牌「每張樂歷 +20」那行；n＝E.gigRoom，照現在的基本樂歷算，是下限）
      gigRoom: '每張樂歷 +{per}・這一趟還能算 {n} 張（越往後走越多）', gigFull: '這一趟的演唱會樂歷已到上限，買票只算聽歌',
      // 來客條說情（C.trial.ui.retryLeft 那格；有備用說情時後面接 pleaSpare）
      pleaLeft: '說情剩 {n}', pleaSpare: '・備用 {n}',
      // 熟練度（派系卡、樂歷頁）
      prof: '熟練 Lv{n}・章 {s}／{per}',
      srcLexp: '樂歷抽到的',                                        // 唱片櫃來源（src 'lexp'）
      // 第 D 波棒一介面補的字（ui.js）：樂歷頁的鈕與小標、結算明細、過場卡、備用說情那顆
      buy: '加一級', sell: '退一級', noPoints: '天賦點不夠', profTitle: '熟練度', unlockTitle: '流派與攤位',
      lastLine: '上一趟 樂歷 +{n}', nextRun: '改了下一趟開局才算',
      gainTitle: '這一趟的樂歷 +{n}', toPage: '看樂歷頁 ›', cardNext: '繼續', cardTap: '點一下看下一張',
      pleaMenu: '▶ 再一場（用掉備用說情）'                          // 備用說情那次的第一顆（C.trial.ui.retryMenu[0] 寫「這一輪只有一次」，這次不是）
    }
  };
  C.careerTag = '新';

  // ===================================================================
  // 頂點卡純輔助卡試做（店主 11-15「三流派先各挑十～二十張賦予特殊能力試試看；純輔助卡，不是七星卡」；只在網址 ?apex=1 生效）。
  //   規格：scratchpad v5/apextrial（FRAME.md 框架、ABILITIES.json 平衡表、CONTRACT.md 給畫面的 API）。旗標關時沒有任何程式讀這一節。
  //   開旗標：你的王牌不比星、一場發動一次、出唱片前發動、不佔這一手（那手照樣出一張唱片）；藏家／客人帶的王牌照舊 7 星（試做待定）。序章照舊 7 星教學。
  //   hall／pearl／heresy：每派 15 張，順序＝挑王牌面板 5×3；第 1 張＝C.aces[tier]（預設那張：舊存檔、沒挑過的都用它）。
  //   每張 { card（cards.js id）, id（能力 id，全表唯一；存檔、統計、e2e 用）, name（≤8 字）, text（≤25 字）, timing 'hand' 這手｜'duel' 整場｜'hold' 留著,
  //          op（engine APEX_OPS 的原語；'combo'＝params.ops 幾個原語合一）, params（範圍見 engine APEX_OPS，check-content 擋）,
  //          hold（只有 timing 'hold'：{op, params}＝還沒發動前每手都有的小效果；發動＝放掉它、換這手的 op）,
  //          grade／power（Simulate 棒實量：會讀的深度中位 ÷ 同派現行 7 星王牌 %，N=600、封頂 200，scratchpad sim-results.md；引擎不讀）, fact（典故出處，不上畫面） }
  //   數字照模擬調過（11-16）：比星多算 2→3（我們與他們、夏日音牆、口是心非、讓我想一想）、拆穿回血 ×2→×1（四面回授、年度結算）、彈回只在被剋時（流亡者回敬、浪打回頭）
  //   winHeal：旗標下打贏回幾聲望（現行 C.trial.heal 3；FRAME 方案 B／Balance 棒建議 4：純輔助卡補不回 7 星那手保住的聲望，改這一個數字就能拿掉）
  //   頂點卡只放王牌格（engine：不進客人牌組、箱子、收音機、種子）；這 42 張新卡（C.apexTrialOnly）旗標關時畫面要當作不存在（唱片櫃分母等，見 CONTRACT.md）
  // ===================================================================
  C.apexTrial = {
    winHeal: 4,
    hall: [
      { card: "radiohead|ok computer", id: 'okc-airbag', name: '安全氣囊', text: '氣囊救了你一命：回 2 聲望。', timing: 'hand', op: 'heal', params: { n: 2 }, hold: null,
        grade: '主力（預設）', power: 89, fact: '開場曲〈Airbag〉唱的是車禍生還（An airbag saved my life）；回聲望＝保住帶著走的聲望。預設那張：新手第 1 手就用也不浪費。' },
      { card: "glenn gould|bach: the goldberg variations (1955)", id: 'gould-variations', name: '三十段變奏', text: '一段詠嘆調變三十次：這場比星多算 1。', timing: 'duel', op: 'mirrorPlus', params: { n: 1 }, hold: null,
        grade: '主力', power: 87, fact: '《郭德堡變奏曲》＝一段詠嘆調＋30 段變奏，最後詠嘆調再回來；1955 年錄音是顧爾德的第一張唱片。一個主題撐全曲＝一個效果撐整場。' },
      { card: "miles davis|kind of blue", id: 'kob-so-what', name: '那又怎樣', text: '比輸了又怎樣：這手比星輸了不扣。', timing: 'hand', op: 'loseZero', params: {}, hold: null,
        grade: '特色', power: 79, fact: '開場曲〈So What〉＝那又怎樣。敢「疑」、跟他正面比，輸了不扣；「信」那條路照樣會被剋。' },
      { card: "the beatles|abbey road", id: 'abbey-carry-weight', name: '扛起重擔', text: '這場比星多算 1，被剋少扣 1。', timing: 'duel', op: 'combo', params: { ops: [{ op: 'mirrorPlus', params: { n: 1 } }, { op: 'shield', params: { n: 1 } }] }, hold: null,
        grade: '主力', power: 94, fact: 'B 面組曲裡的〈Carry That Weight〉：比星有份量、被剋也扛得住一點（少扣最少扣 1）。' },
      { card: "pink floyd|the dark side of the moon", id: 'dsotm-us-them', name: '我們與他們', text: '正面比個高下：這手比星多算 3。', timing: 'hand', op: 'mirrorPlus', params: { n: 3 }, hold: null,
        grade: '主力', power: 86, fact: '〈Us and Them〉＝我們與他們，正面比。留到正面對決那手才用。' },
      { card: "bob marley & the wailers|exodus", id: 'exodus-lights-low', name: '調暗燈光', text: '燈光調暗一點：這手他的唱片少 1 星。', timing: 'hand', op: 'eStar', params: { n: 1 }, hold: null,
        grade: '主力', power: 85, fact: '專輯裡的〈Turn Your Lights Down Low〉：把他那張的光調暗一格。' },
      { card: "大滝詠一|a long vacation", id: 'longvac-wall', name: '夏日音牆', text: '音牆疊得厚：這手比星多算 3。', timing: 'hand', op: 'mirrorPlus', params: { n: 3 }, hold: null,
        grade: '主力', power: 86, fact: '大瀧詠一學 Phil Spector「音牆」的厚實編曲；封面是永井博的泳池插畫。聲音疊得厚＝正面比多兩星份量。' },
      { card: "michael jackson|thriller", id: 'thriller-bestseller', name: '史上最暢銷', text: '名盤份量最重：這手你的唱片 +1 星。', timing: 'hand', op: 'star', params: { n: 1 }, hold: null,
        grade: '明星', power: 100, fact: '金氏世界紀錄列為史上最暢銷的專輯：「名盤講份量」最直接的一張。殿堂唯一的 +1 星（模擬要盯的那張）。' },
      { card: "鄧麗君 teresa teng|淡淡幽情", id: 'teng-longlast', name: '但願人長久', text: '留著：被剋少扣 1；發動：這手他少 1 星。', timing: 'hold', op: 'eStar', params: { n: 1 }, hold: { op: 'shield', params: { n: 1 } },
        grade: '特色', power: 83, fact: '整張把古典詩詞譜成歌，〈但願人長久〉唱的是蘇軾〈水調歌頭〉：留得越久越好，捨得放才換一次大的。' },
      { card: "張雨生|口是心非", id: 'chang-two-faced', name: '口是心非', text: '他說的不算：這手比星多算 3，輸了不扣。', timing: 'hand', op: 'combo', params: { ops: [{ op: 'mirrorPlus', params: { n: 3 } }, { op: 'loseZero', params: {} }] }, hold: null,
        grade: '主力', power: 86, fact: '同名曲〈口是心非〉：嘴上說的跟心裡想的不一樣，正好是唬人。不信提示、直接正面比；「信」那條路照樣會被剋。' },
      { card: "guru|jazzmatazz, vol. 1", id: 'jazzmatazz-live', name: '真人進棚', text: '留著：同色同星扣他 1；發動：這手比星多算 3。', timing: 'hold', op: 'mirrorPlus', params: { n: 3 }, hold: { op: 'tieWin', params: { n: 1 } },
        grade: '特色', power: 88, fact: 'Guru 說 Jazzmatazz 的構想是把原本被取樣的那些樂手真的請進錄音室（Donald Byrd、Roy Ayers 等現場演奏，他在上面饒舌；data/artist-intros guru）。留著＝取樣那份小份量，發動＝正主進棚。I-1 換下《讓我想一想》，能力照同一個原語（power 沿用，未重量）。' },
      { card: "daft punk|discovery", id: 'discovery-stronger', name: '更快更強', text: '更硬更好更快更強：這場比星多算 1。', timing: 'duel', op: 'mirrorPlus', params: { n: 1 }, hold: null,
        grade: '主力', power: 87, fact: '〈Harder, Better, Faster, Stronger〉；整張專輯後來配成一整部動畫電影《Interstella 5555》（2003）：一整張＝一整場。' },
      { card: "slum village|fan-tas-tic, volume 1", id: 'slum-offbeat', name: '錯開的拍子', text: '拍子故意錯開：這手他的唱片少 1 星。', timing: 'hand', op: 'eStar', params: { n: 1 }, hold: null,
        grade: '主力', power: 85, fact: 'Slum Village 的聲音核心是 Jay Dee（J Dilla）在 MPC 上手動敲擊、讓元素錯位，做出非直拍也非搖擺的「第三種時間感」（data/artist-intros slum village、j dilla）。拍子不踩在格子上，他那張就對不準。I-1 換下《范特西》，能力照同一個原語。' },
      { card: "art blakey and the jazz messengers|moanin'", id: 'moanin-press-roll', name: '雷鳴滾奏', text: '鼓聲一路推到底：這場比星多算 1。', timing: 'duel', op: 'mirrorPlus', params: { n: 1 }, hold: null,
        grade: '主力', power: 87, fact: 'Art Blakey 的鼓以雷鳴般的 press roll 著稱，協助確立 hard bop、把鼓推上獨奏位置（data/artist-intros art blakey and the jazz messengers）。鼓在後面撐一整晚＝整場有效。I-1 換下《To Pimp a Butterfly》，能力照同一個原語。' },
      { card: "濁水溪公社|台客的復仇", id: 'loh-taike', name: '台客的復仇', text: '台客回來討公道：這手他的唱片少 1 星。', timing: 'hand', op: 'eStar', params: { n: 1 }, hold: null,
        grade: '主力', power: 85, fact: '濁水溪公社自稱走「台客」路線，把龐克、噪音、民謠與那卡西揉在一起，以台語寫社會亂象與基層生活（data/artist-intros 濁水溪公社）；盤名就是台客的復仇。I-1 換下《之乎者也》（店主 11-20 退出頂點卡），能力照同一個原語。' }
    ],
    pearl: [
      { card: "barney wilen|zodiac", id: 'zodiac-borrow', name: '黃道借星', text: '借他的星：這場你剋他一律剋得動，扣你我較大的星數。', timing: 'duel', op: 'theirStar', params: {}, hold: null,
        grade: '明星（預設）', power: 103, fact: '法國次中音薩克斯風手，年輕時吹過 Miles Davis《死刑台與電梯》配樂；1966 年這張轉進自由爵士。黃道＝星座：借他那張的星來扣他。' },
      { card: "beyond|再見理想", id: 'beyond-selffund', name: '自掏腰包', text: '硬碰大牌：這場你剋他一律剋得動，扣你我較大的星數。', timing: 'duel', op: 'theirStar', params: {}, hold: null,
        grade: '明星', power: 103, fact: '出道前自己出錢錄、以卡帶發行的第一張：沒有唱片公司撐腰，照樣跟大牌硬碰。' },
      { card: "harry roesli|ken arok", id: 'kenarok-rise', name: '草莽稱王', text: '草莽挑王：這場你剋他，他高你 3 星以上才剋不動。', timing: 'duel', op: 'pThr', params: { n: 3 }, hold: null,
        grade: '主力', power: 90, fact: '印尼搖滾歌劇，取材爪哇傳說：Ken Arok 出身草莽、奪位開創新王朝。小人物也剋得動高他一截的對手。' },
      { card: "生活向上委員会|生活向上委員会ニューヨーク支部", id: 'seikatsu-ny', name: '紐約支部', text: '闖蕩紐約：這場你剋他，他高你 3 星以上才剋不動。', timing: 'duel', op: 'pThr', params: { n: 3 }, hold: null,
        grade: '主力', power: 90, fact: '梅津和時隻身前往紐約，投入下東城的 loft 爵士圈；1975 年他與原田依幸在那裡結識 Ahmed Abdullah、William Parker 等人，錄下這張（data/artist-intros 梅津和時、生活向上委員会）。外地來的小團也剋得動大場面。I-1 換下《地下人》，能力照同一個原語。' },
      { card: "灰野敬二|滲有無", id: 'haino-seep', name: '滲透', text: '滲過去：這場你剋他，他高你 3 星以上才剋不動。', timing: 'duel', op: 'pThr', params: { n: 3 }, hold: null,
        grade: '主力', power: 90, fact: '盤名的「滲」：聲音一點一點滲過去，他靠星數築起的「剋不動」那道牆被滲穿。' },
      { card: "楊祖珺|楊祖珺", id: 'yang-unbanned', name: '禁不掉', text: '禁不掉：這場你剋他，他高你 3 星以上才剋不動。', timing: 'duel', op: 'pThr', params: { n: 3 }, hold: null,
        grade: '主力', power: 90, fact: '唱過李雙澤〈美麗島〉的民歌手；那首歌後來成了禁歌，她轉進社運：想擋也擋不住。（只講那首歌，不說這張專輯被禁）' },
      { card: "嘉手苅林昌|嘉手苅林昌", id: 'kadekaru-shima', name: '島唄之神', text: '老神在在：這場你剋他，他高你 3 星以上才剋不動。', timing: 'duel', op: 'pThr', params: { n: 3 }, hold: null,
        grade: '主力', power: 90, fact: '被稱為「島唄之神」的沖繩民謠歌手：老神在在，一把三線也壓得住比他大的對手。（原本的「留著」型字寫不清楚，改成整場剋得動）' },
      { card: "モア|モア", id: 'moa-matsuri', name: '祭典之歌', text: '這場被剋時，扣你的星有一半彈回去扣他。', timing: 'duel', op: 'bounce', params: { lose: false }, hold: null,
        grade: '新手向', power: 66, fact: '1983 年日本私製盤，〈まつりの歌〉分成 Part 1、Part 2 放在 A、B 兩面（Discogs https://www.discogs.com/release/20594359）：打過來的，有一半在另一面還回去。I-1 換下《Blue Notes for Mongezi》，能力照同一個原語。' },
      { card: "小久保隆|get at the wave", id: 'kokubo-wave', name: '浪打回頭', text: '這場被剋時，扣你的星有一半彈回去扣他。', timing: 'duel', op: 'bounce', params: { lose: false }, hold: null,
        grade: '新手向', power: 66, fact: '日本環境音樂。盤名的浪：打過來的浪有一半退回去。' },
      { card: "derek bailey|solo guitar volume 1", id: 'bailey-solo', name: '一把吉他', text: '一把吉他：這手你剋他一律剋得動，扣你我較大的星數。', timing: 'hand', op: 'theirStar', params: {}, hold: null,
        grade: '特色（看時機）', power: 69, fact: '自由即興吉他宗師的第一張獨奏（1971，他參與創辦的 Incus 發行）：一個人一把吉他，正面對上整個傳統。' },
      { card: "gorilla biscuits|demo 1987", id: 'gb-demo', name: '一卷 demo', text: '這手你剋他一律剋得動，扣你我較大的星數。', timing: 'hand', op: 'theirStar', params: {}, hold: null,
        grade: '特色（看時機）', power: 69, fact: '紐約硬蕊樂團出道前的一卷 demo 帶：最小的發行形式，扣的卻是大牌的份量。' },
      { card: "高柳昌行|eclipse-侵蝕", id: 'takayanagi-erode', name: '侵蝕', text: '以彼之道：這手你剋他一律剋得動，扣你我較大的星數。', timing: 'hand', op: 'theirStar', params: {}, hold: null,
        grade: '特色（看時機）', power: 69, fact: '盤名「侵蝕」：拿他自己那張的份量反過來蝕掉他（以彼之道，還施彼身）。日本自由爵士吉他手。' },
      { card: "1976|late summer of 1976 不插電現場實況", id: '1976-unplugged', name: '不插電', text: '拔掉插頭：這手你剋他一律剋得動，扣你我較大的星數。', timing: 'hand', op: 'theirStar', params: {}, hold: null,
        grade: '特色（看時機）', power: 69, fact: '拔掉插頭、音量最小的一場，照樣扣得到大牌的份量。台灣獨立樂團。' },
      { card: "black renaissance|body, mind and spirit", id: 'blackren-heal', name: '身心靈', text: '身心靈都養回來：回 2 聲望。', timing: 'hand', op: 'heal', params: { n: 2 }, hold: null,
        grade: '主力', power: 97, fact: '盤名就是身、心、靈：回聲望＝養回來。Harry Whitaker 帶的一次性錄音，靈性爵士的冷門聖杯。' },
      { card: "alton ellis|a new day", id: 'alton-newday', name: '新的一天', text: '新的一天重新站起來：回 2 聲望。', timing: 'hand', op: 'heal', params: { n: 2 }, hold: null,
        grade: '主力', power: 97, fact: '盤名「新的一天」＝重新站起來、回一口氣。rocksteady 教父。' }
    ],
    heresy: [
      { card: "swans|filth", id: 'filth-expose', name: '揭穿髒招', text: '唬人是髒招：這場抓到他唬你，扣加倍。', timing: 'duel', op: 'crit', params: { mult: 2 }, hold: null,
        grade: '主力（預設）', power: 88, fact: 'Swans 第一張錄音室專輯，以極慢、極重、極大音量出名。Filth＝骯髒：他唬你是髒招，揭穿就加倍奉還。' },
      { card: "ornette coleman|free jazz: a collective improvisation", id: 'freejazz-double', name: '雙四重奏', text: '兩組四重奏齊上：這場抓到他唬你，扣加倍。', timing: 'duel', op: 'crit', params: { mult: 2 }, hold: null,
        grade: '主力', power: 88, fact: '兩組四重奏各佔立體聲左右聲道，一整首集體即興佔滿兩面黑膠（封面開窗是 Jackson Pollock 的畫）。兩組＝加倍，一整首＝整場。' },
      { card: "captain beefheart & his magic band|trout mask replica", id: 'trout-mask-off', name: '撕下面具', text: '面具撕下來：這場抓到他唬你，扣加倍。', timing: 'duel', op: 'crit', params: { mult: 2 }, hold: null,
        grade: '主力', power: 88, fact: '專輯名＝鱒魚面具複製品，封面上 Beefheart 戴著一顆魚頭；Frank Zappa 製作。唬人就是戴面具，撕下來。' },
      { card: "discharge|hear nothing see nothing say nothing", id: 'hnsnsn-hear-nothing', name: '什麼都不聽', text: '他說的都不聽：這場抓到他唬你，扣三倍。', timing: 'duel', op: 'crit', params: { mult: 3 }, hold: null,
        grade: '主力', power: 89, fact: 'Discharge 第一張專輯，D-beat 這個名字就來自這個團。專輯名三個 Nothing＝三倍；「不聽」他的提示，正好就是「疑」。' },
      { card: "lou reed|metal machine music", id: 'mmm-feedback', name: '四面回授', text: '回授：這場抓到他唬你，扣到的一半回你聲望。', timing: 'duel', op: 'critLeech', params: { mult: 1 }, hold: null,
        grade: '主力', power: 93, fact: '雙張黑膠四面全是吉他回授疊出來的噪音。回授＝訊號繞回自己：扣到他的，有一半繞回你身上；四面一口氣放完＝整場。' },
      { card: "throbbing gristle|the second annual report", id: 'tg-annual-report', name: '年度結算', text: '對帳：這場抓到他唬你，扣到的一半回你聲望。', timing: 'duel', op: 'critLeech', params: { mult: 1 }, hold: null,
        grade: '主力', power: 93, fact: 'TG 第一張專輯，由自家 Industrial Records 發行，「工業音樂」這個詞就從這個廠牌來。專輯名＝第二份年度報告：整場記帳，抓到唬人那筆，一半入你口袋。' },
      { card: "alvin lucier|i am sitting in a room", id: 'lucier-room', name: '一遍又一遍', text: '一遍遍錄回來：這場抓到他唬你，扣到的一半回你聲望。', timing: 'duel', op: 'critLeech', params: { mult: 1 }, hold: null,
        grade: '主力', power: 93, fact: '念一段話錄下來，放回房間再錄，一遍又一遍，到最後只剩房間的共振。一遍遍「回來」＝整場回聲望。' },
      { card: "les rallizes dénudés|'77 live", id: 'rallizes-denuded', name: '赤裸裸', text: '剝個精光：照出這手提示是真話還是唬人。', timing: 'hand', op: 'reveal', params: {}, hold: null,
        grade: '明星', power: 117, fact: '1977 年 3 月在東京立川的現場錄音，1991 年才發行；團名的 Dénudés 是法文「剝光、赤裸」。現場盤＝台下看得一清二楚。' },
      { card: "ryoji ikeda|+--", id: 'ikeda-plusminus', name: '正負號', text: '非正即負：照出這手提示是真話還是唬人。', timing: 'hand', op: 'reveal', params: {}, hold: null,
        grade: '明星', power: 117, fact: '池田亮司用正弦波、高頻脈衝做的專輯，名字就是「正或負」：照出來只給二選一的答案，真或唬。' },
      { card: "非常階段|蔵六の奇病", id: 'hijokaidan-exit', name: '逃生梯', text: '先走逃生梯：回 2 聲望。', timing: 'hand', op: 'heal', params: { n: 2 }, hold: null,
        grade: '主力', power: 100, fact: '團名「非常階段」＝日文的緊急逃生梯；《蔵六の奇病》是日本噪音早期經典。打不下去先走逃生梯，保住帶著走的聲望。異端裡新手也有感的一張。' },
      { card: "einstürzende neubauten|kollaps", id: 'neubauten-collapse', name: '一拆就塌', text: '謊話一拆就塌：這場抓到他唬你，扣加倍。', timing: 'duel', op: 'crit', params: { mult: 2 }, hold: null,
        grade: '主力', power: 88, fact: '團名＝倒塌的新建築，第一張專輯 Kollaps＝崩塌，拿廢鐵、電鑽當樂器。他的謊話一拆就塌。' },
      { card: "零與聲音解放組織|z.s.l.o.", id: 'zslo-zero', name: '往零推', text: '往零推一格：這手他的唱片少 1 星。', timing: 'hand', op: 'eStar', params: { n: 1 }, hold: null,
        grade: '主力', power: 94, fact: '林其蔚等人在 1990 年代初組成的台灣噪音先驅。團名的「零」：把他那張往零推一格。異端頂點卡裡唯一的台灣盤。' },
      { card: "sunn o)))|black one", id: 'sunn-low-end', name: '低頻壓頂', text: '低頻壓下來：這手他的唱片少 1 星。', timing: 'hand', op: 'eStar', params: { n: 1 }, hold: null,
        grade: '主力', power: 94, fact: '以極大音量、拉得極長的低頻聞名，台上披連帽長袍、滿台煙霧：噪音蓋過他，壓下去一顆星。' },
      { card: "napalm death|scum", id: 'scum-one-second', name: '一秒鐘', text: '一秒就結束：這手抓到他唬你，扣三倍。', timing: 'hand', op: 'crit', params: { mult: 3 }, hold: null,
        grade: '特色', power: 72, fact: '常被當成 grindcore 的起點；裡面的〈You Suffer〉只有一秒多，金氏世界紀錄列為最短的歌。一秒＝只有這一手。' },
      { card: "peter brötzmann|machine gun", id: 'brotzmann-machine-gun', name: '機關槍', text: '留著：剋中多扣 1；發動：這手抓到他唬你扣三倍。', timing: 'hold', op: 'crit', params: { mult: 3 }, hold: { op: 'counterPlus', params: { n: 1 } },
        grade: '特色', power: 80, fact: '1968 年的八重奏錄音，歐洲自由爵士代表作，名字就叫機關槍：平常一發一發點放（剋中多扣 1），發動就整排掃出去。' }
    ],
    // 畫面字（FRAME 第 7 節；{x} 由畫面代入）
    ui: {
      slot: '王牌', use: '發動', used: '用過', usedNote: '這場用過了', noStar: '王牌不比星。',
      timing: { hand: '這手', duel: '整場', hold: '留著' },
      rule: '你的王牌不比星，每場發動一次；客人的照舊 7 星。',     // 一句話規則（規則卡第 6 行；藏家、第 5 位起的客人帶的王牌照舊 7 星比星，審查 11-16）
      intro: '「接下來，王牌不上場比星，改成一場幫你一次。」',       // 序章打完、第 1 位開打前，老闆說（然後跳挑王牌面板）
      pickTitle: '「這派的王牌有十五張，挑一張帶著。」', pickGo: '就這張', pickSame: '就帶這張',
      pickLine: '{name}・{timing}：{text}',                           // 挑王牌面板第二行：能力名・時機：說明
      infoTitle: '王牌能力',                                          // 唱片資訊多一塊
      revealHonest: '真話', revealBluff: '唬人！',                    // 看穿：提示框上蓋的章
      fired: '王牌《{album}》：{name}',                              // 發動那一刻提示框下面跳的一行
      healToast: '聲望 +{n}',                                         // 回聲望（發動當下）
      rulesFoot: '你開局 {hp} 聲望（升級會加），打贏回 {heal}；客人 {normal}、傳說藏家 {boss}。',   // 規則卡頁尾第 2 行（旗標下；{heal}＝winHeal）
      // 介面棒加的（ui.js）：tag＝標題牌與挑王牌面板角上的小字；tutNote＝序章挑王牌那行、教學那場開打的吐司（教學照舊 7 星，FRAME 1.6）
      tag: '頂點卡試做', tutNote: '教學這場王牌照舊 7 星，之後改當輔助卡。',
      // 審查 11-16 補的：full＝只會回聲望的王牌在聲望滿時（不能發動）能力框那行；結果框：hitBoth＝同一手兩邊都扣（彈回）、loseFree＝比星輸了但王牌免扣、
      //   eAceNote＝他丟的是他帶的王牌（照舊 7 星比星）時結果行補的一句
      full: '聲望是滿的，掉了再用。', hitBoth: '你 −{p}，他 −{e}', loseFree: '你輸了，但不扣。', eAceNote: '他的王牌照舊 7 星',
      // 店主 11-16「給我一個可以跳過序章、直接玩輔助卡版本的選項」：標題畫面多一顆鈕（只在 ?apex=1）；skipSub＝鈕下的小字
      skip: '跳過序章，直接開打 ▸', skipSub: '輔助卡試做・挑一張王牌就開始', skipAgain: '再按一次：放棄這一趟、直接開打',
      skipSubFirst: '輔助卡試做・先挑你的初始流派',   // 新存檔（一派都還沒解鎖）：鈕下的小字（審查 11-16：這一下會定下初始流派）
      // 頂點卡也要收集（店主 11-16）：一開始只有初始流派預設那張；每打倒一位傳說藏家，收他帶的那張。挑王牌面板沒收到的灰掉、上鎖
      got: '已收 {n}／{total}',                    // 挑王牌面板：這派收了幾張
      notYet: '還沒收到', lockCard: '打倒傳說藏家收集',   // 挑王牌面板：點了沒收到的那張，說明那行（「還沒收到：打倒傳說藏家收集」）；點老闆小選單換不了時的小字
      lockNote: '有鎖的還沒收到：打倒傳說藏家收集',       // 挑王牌面板：沒點別的時候灰字那行（這派有沒收到的、或有鎖住的派；審查 11-16：原本要先點一張鎖住的才看得到）
      pickKeep: '還是帶《{album}》',                       // 挑王牌面板：點了沒收到的那張（說明換成那張）時的大鈕＝按下去帶的是原本選中那張（審查 11-16）
      gotNew: '收進唱片櫃，下一趟開局可以換',        // 打倒傳說藏家收到新的一張（沒有解鎖新的一派時）
      noneMore: '還沒收到別張王牌'                   // 點老闆小選單：一派一張、沒得換時「換一張王牌」改成這句
    },
    // 一次性老闆小提示（旗標下多兩則；≤20 字）
    tips: { tip_apex: '王牌一場發動一次，不佔這一手。', tip_apexMiss: '王牌要碰到條件才有用。' },
    // 結果行補的一句（engine outcome 的 notes：{apex, op, src, d, h, text}；{d}＝這手王牌替你多賺／少扣幾點、{h}＝回幾聲望、{name}＝能力名）
    //   combo（兩個原語合一）用 combo；none＝發動那手沒碰到條件；noneHonest＝拆穿類發動那手他沒唬你
    notes: {
      heal: '王牌：回 {d} 聲望',
      star: '王牌：你 +1 星，多賺 {d}', eStar: '王牌：他少 1 星，多賺 {d}', mirrorPlus: '王牌：比星多算，多賺 {d}',
      loseZero: '王牌：比星輸了不扣，少扣 {d}', tieWin: '王牌：同色同星，他 −{d}',
      shield: '王牌：被剋少扣 {d}', halfIn: '王牌：被剋減半，少扣 {d}',
      theirStar: '王牌：以小搏大，多賺 {d}', pThr: '王牌：剋得動了，多賺 {d}', bounce: '王牌：彈回去 {d}',
      crit: '王牌：拆穿！多扣 {d}', critLeech: '王牌：拆穿！多扣 {d}，回 {h} 聲望', leech: '王牌：拆穿！回 {h} 聲望', leechFull: '王牌：拆穿！聲望是滿的，沒回到',
      counterPlus: '王牌：剋中多扣 {d}', counterMult: '王牌：剋中加倍，多扣 {d}',
      combo: '王牌：{name}，多賺 {d}',
      none: '王牌：這手沒碰到，沒作用', noneHonest: '王牌：他這手沒唬你，沒作用'
    },
    holdNotes: { shield: '王牌（留著）：被剋少扣 {d}', tieWin: '王牌（留著）：同色同星，他 −{d}', counterPlus: '王牌（留著）：剋中多扣 {d}' }
  };
  C.apexTrialTag = '新';
  // 只有試做才用到的 42 張（三派 15 張扣掉 C.aces）：旗標關時畫面當作不存在（唱片櫃「認識過 m／N」的 N、搜尋、匯出給主站的卡池…）
  C.apexTrialOnly = [];
  ['hall', 'pearl', 'heresy'].forEach(function (t) { C.apexTrial[t].forEach(function (x) { if (x.card !== C.aces[t]) C.apexTrialOnly.push(x.card); }); });

  // ===================================================================
  // 第 I 波 I-1「安可」（店主 11-20「每個王牌 發動條件加成 比如 補血的ok computer可以多家條件 如果看穿對手 可以再次發動」；
  //   規格 scratchpad v5/wave-i SPEC-I §1、附錄 Y；給畫面／sim 的契約 wave-i/build1/CONTRACT.md）。
  //   每張王牌＝原本的效果＋一條安可「{條件}，{加成}」：讀對了才有、一場一次、條件成立時這場剛好打完就留到下一位（只留一場）。
  //   on＝總開關（sim --encore off＝false：兩半都關＝現況逐字）。預設 7 星王牌那半：主線對決自動有（序章、切磋沒有）；頂點卡那半跟 ?apex=1。
  //   aceStar＝7 星王牌安可那一次是幾星（7 星會變簡單：SPEC-I 附錄 Z4 會讀的到第 50 位 +2.6 點、6 星 +0.4；11-20 修正輪 6→5：會湊條件的策略 6 星 一般玩家 +1.75，build1/FIX.md R2）；star／hit／heal＝三種加成的數字；lowPct＝背水的門檻（聲望剩幾 %）。
  //   aces＝三張預設 7 星王牌：丟出之後看穿他一次 → 王牌回到手上（5 星）；facHeresy＝?fac=1 時異端改同色比贏（異端被動本來就吃拆穿，看穿不給三份；連剋新手照提示剋就成立，不是讀牌獎勵）。
  //   byFamily＝頂點卡的家族預設（鍵＝'原語:時機'；combo 看第一個原語、留著型照發動那個原語的 hand；'*:hand'／'*:duel'＝沒列到的）：
  //     when＝經典、冷門的條件，heresy＝異端的（沒寫＝同 when），give＝加成。C.apexTrial 某張要跟家族不同才寫 encore:{when, give}（AN3 逐張量過再改，只改資料）。
  //   條件 when：caught 看穿他一次（＝結果句「你看穿了！」：他這手是看得出來的唬、你剋中）｜combo2 連剋兩手｜sameWin 同色比贏一次｜lowhp 聲望剩三成以下（只配回聲望型）。
  //     頂點卡發動那手不算（從下一手起）；7 星王牌丟出去那手就算。
  //   加成 give：again 再發動一次（手型、留著型；7 星王牌＝王牌回到手上）｜star 下一手 +1 星｜hit 下一手剋中多扣 2（在倍數之後、他的底氣之前）｜heal 回 2 聲望（當場、跟同一手其他回聲望取大）。
  // ===================================================================
  C.encore = {
    on: true, aceStar: 5, carry: true, star: 1, hit: 2, heal: 2, lowPct: 30,
    aces: { hall: { when: 'caught', give: 'again' }, pearl: { when: 'caught', give: 'again' }, heresy: { when: 'caught', give: 'again' } },
    facHeresy: 'sameWin',
    // 11-20 修正輪（build1/FIX.md R1–R3；量測 build1/fix/）：連剋兩手量起來不是讀牌獎勵（新手照提示剋就成立 52–57%）→ 全換掉：冷門、經典看穿，異端同色比贏（照出真假、回聲望例外：看穿）；
    //   會回聲望的翻面（回聲望型再發動、回 2）與整場 +1 星，--apex 逐張量起來會讀的到第 50 位 +5～+11 點（OK Computer +6.0、モア +10.9）→ 整場型與回聲望手型一律「下一手剋中多扣 2」（OKC +0.8）；
    //   手型再發動逐張量：他少 1 星／你 +1 星／照出真假再來一次也太強（Exodus 一般玩家中位 +4、鄧麗君 +4.1、Thriller 一般 +4、Z.S.L.O. +3.4、Rallizes +8.9）→ 同樣改「下一手剋中多扣 2」；
    //   比星多算（DSOTM、大滝、口是心非、Jazzmatazz）、比星輸不扣（Kind of Blue）、這手剋得動（冷門四張）、拆穿三倍（Napalm、Machine Gun）照留「再發動一次」（−1.6～+0.2）
    byFamily: {
      'heal:hand': { when: 'caught', give: 'hit' },
      'star:hand': { when: 'sameWin', give: 'hit' },
      'eStar:hand': { when: 'sameWin', give: 'hit' },
      'mirrorPlus:hand': { when: 'caught', give: 'again' },
      'tieWin:hand': { when: 'caught', give: 'again' },
      'loseZero:hand': { when: 'caught', give: 'again' },
      'theirStar:hand': { when: 'caught', heresy: 'sameWin', give: 'again' },
      'reveal:hand': { when: 'caught', give: 'hit' },
      'crit:hand': { when: 'sameWin', give: 'again' },
      'critAdd:hand': { when: 'caught', heresy: 'sameWin', give: 'again' },
      '*:hand': { when: 'caught', heresy: 'sameWin', give: 'again' },
      'mirrorPlus:duel': { when: 'caught', give: 'hit' },
      'theirStar:duel': { when: 'caught', heresy: 'sameWin', give: 'hit' },
      'pThr:duel': { when: 'caught', heresy: 'sameWin', give: 'hit' },
      'bounce:duel': { when: 'caught', give: 'hit' },
      'crit:duel': { when: 'caught', give: 'hit' },
      'critAdd:duel': { when: 'caught', heresy: 'sameWin', give: 'hit' },
      'critLeech:duel': { when: 'sameWin', give: 'hit' },
      '*:duel': { when: 'caught', heresy: 'sameWin', give: 'hit' }
    },
    // 畫面字（{n}＝加成的數字、{star}＝翻面那張王牌幾星、{album}＝王牌專輯名、{verb}＝發動｜丟；engine encoreLine／encoreTag 會代入條件句與加成句）
    //   店主 11-20 改名：玩家看得到的字一律叫「翻面」（唱片翻到 B 面再來一次），不叫「安可」（lint-copy 擋）；程式識別字（encore）照舊
    ui: {
      name: '翻面',
      when: { caught: '看穿他一次', combo2: '連剋兩手', sameWin: '同色比贏一次', lowhp: '聲望剩三成以下' },
      give: { again: '再發動一次', ace: '王牌回到手上（{star} 星）', star: '下一手 +{n} 星', hit: '下一手剋中多扣 {n}', heal: '回 {n} 聲望' },
      tpl: '翻面：{when}，{give}。',                 // 頂點卡：「翻面：看穿他一次，再發動一次。」
      aceTpl: '翻面：丟出之後{when}，{give}。',      // 7 星王牌：「翻面：丟出之後看穿他一次，王牌回到手上（5 星）。」
      tagWhen: { caught: '看穿', combo2: '連剋', sameWin: '同色贏', lowhp: '背水' },
      tagGive: { again: '再一次', ace: '再丟', star: '+{n} 星', hit: '多扣 {n}', heal: '回 {n}' },
      tag: '{when}→{give}',                          // 王牌格下方的籤（灰＝還在等、金＝翻面了）
      lit: '翻面！{give}',                            // 成立那手：結果句多一行小字
      litCarry: '翻面！留到下一位',                    // 成立那手剛好打完這場（王牌這時不回來；修正輪）
      toast: '翻面！《{album}》可以再{verb}一次', verbApex: '發動', verbAce: '丟',
      next: { star: '下一手 +{n} 星', hit: '下一手剋中多扣 {n}' },   // 王牌格下方小字（加成等著用的時候）
      note: { star: '翻面：+{n} 星', hit: '翻面：剋中多扣 {n}' },    // 吃加成那手的結果句小字（engine outcome 的 notes）
      healToast: '翻面：聲望 +{n}',
      carry: '翻面留到下一位',                         // 領獎畫面小字（這場剛好打完）
      carryTag: '翻面×1',                              // 下一場王牌格的金籤
      infoTitle: '王牌翻面',                           // 唱片資訊「王牌能力」區多一行的標題
      first: '「看到沒？讀對了，唱片翻到 B 面再來一次。」',   // 第一次翻面成立（save.seen.encore），老闆說
      // 規則卡翻面那段（11-20 修正輪：寫具體的）＝這一趟王牌的翻面句（engine encoreLine）＋ruleCarry；?apex=1 還沒有這一趟＝ruleApex
      ruleApex: '翻面：做到王牌下方籤上寫的條件，就有加成。',
      ruleCarry: '剛好打完就留到下一位。',                   // 規則卡翻面句後面接這句
      ruleHead: '翻面（例外）',                              // 規則卡翻面那段開頭（「翻面：」換成這個）：第 6 行「王牌 7 星，一場用一次」的例外（六行店主拍板、不改字）
      exc: '（翻面例外）',                                  // 「王牌…一場用一次」後面補（規則卡第 6 行、挑王牌面板、老闆小提示）
      tipAce: '王牌 7 星，一場用一次（翻面例外）。',         // 老闆小提示 tip_ace（翻面開著時換掉 C.coachTips 那句；≤20 字）
      tipApex: '王牌一場發動一次（翻面例外），不佔這手。',   // ?apex=1 老闆小提示 tip_apex（同上）
      stamp: '翻面！',                                  // 成立那手：你頭上飄的小章
      recap: '翻面'                                     // 上一手詳情／這場紀錄：成立那手的章
    }
  };
  C.encoreTag = '新';

  // ===================================================================
  // 第 D 波棒二：三流派（網址 ?fac=1 試做旗標；scratchpad v5/wave-d SPEC-D §3.2–§3.5、§3.9–§3.10、§4.2、§6-3；給畫面／sim 的契約 build2/CONTRACT.md）。
  //   旗標關（run 沒有 fac）時沒有任何程式讀這一節。名稱、一字圖示照 C.aceTitle／C.aceIcon（預設就換，不跟旗標）。
  //   fx＝核心被動＋代價（engine outcome 的派別路；鍵名見 engine facFxOf）；picks＝本派選項（升級第 4 格：每 levelEvery 級一次、佔那一級的屬性；
  //   哪一項先出＝雜湊，每項一趟最多 1 次；第 5 項 second＝第二招）；priority 只給棒三錄音室試錄的策略用（本派格不看它）。
  //   notes＝結果行小字（{n}：full／borrow／underdog＝這手扣他的總數；crit／crit2／loseCost／cCost／tieCost＝多扣的那一份；heal／leech＝回幾聲望；thorn＝他也扣幾）。
  //   數字：SPEC-D §4.2 定稿（異端拆穿多扣 1、回 2，比星輸多扣 1：§14-3 主線照建議）。棒二 sim n 4000 重量（F1–F9），沒過只調這裡的數字。
  // ===================================================================
  C.factions = {
    on: true, levelEvery: 5, occupy: true,
    notes: { full: '正面對決：扣整張 {n}', tieCost: '平手算你輸 {n}', borrow: '借他的份量：扣他 {n}', underdog: '以小搏大：扣他 {n}', cCost: '被剋：多扣 {n}',
      crit: '拆穿！多扣 {n}', crit2: '爆擊！多扣 {n}', heal: '回 {n} 聲望', loseCost: '比星輸：多扣 {n}', leech: '吸血：回 {n} 聲望', thorn: '反傷：他也扣 {n}' },
    // ?fac=1&apex=1 同開才用（SPEC-D §6-3「三家換一格」）：engine apexAbilityOf 換掉那張的 op／params／text（name、典故不動；C.apexTrial 本身不改）。
    //   ops＝這個原語的卡都換（冷門 theirStar／pThr＝被動已有；異端 crit／critLeech＝被動已有／七不收）；cards＝指定那張（優先）。timing：留著型照舊留著
    //   數字（拆穿多扣 2、比星多算 2）＝規格起點，棒二 sim F9 量；on false＝退回只標示（ui.apexMixed；對照表留著，on 改回 true 就換）
    //   棒二 sim（build2/SIM.md）：規格起點的 Zodiac「這手他少 1 星」一場省 1 點、累積起來冷門 32→42（F9 1.31 ✗；eStar 範圍 [1,1] 調不動）；
    //   退回只標示＝直接同開 35／32／20（1.75，異端跟提示同色 13.2%）比換一格更不平 → 棒二審查定案：Zodiac 不另外指定、照家族換「拆穿多扣 2」，
    //   異端照換「比星多算 2」：n4000 會讀的 35／31／32（1.13 ✓）、異端跟提示同色 8.1%（build2/FINAL.md）
    apexSwap: {
      on: true,
      notes: { critAdd: '王牌：拆穿！多扣 {d}', leechFac: '王牌：拆穿！回聲望跟流派取大，不另加' },   // leechFac：拆穿回血那手回的被流派蓋過（取大）＝這張沒另外回（只開 on false 時碰得到）
      pearl: {
        ops: { theirStar: { op: 'critAdd', params: { n: 2 }, timing: 'hand', text: '這手抓到他唬你，多扣 2。' },
               pThr: { op: 'critAdd', params: { n: 2 }, timing: 'hand', text: '這手抓到他唬你，多扣 2。' } }
      },
      heresy: {
        ops: { crit: { op: 'mirrorPlus', params: { n: 2 }, timing: 'hand', text: '這手比星多算 2。' },
               critLeech: { op: 'mirrorPlus', params: { n: 2 }, timing: 'hand', text: '這手比星多算 2。' } },
        cards: { 'brotzmann-machine-gun': { op: 'mirrorPlus', params: { n: 2 }, timing: 'hold', text: '留著：剋中多扣 1；發動：這手比星多算 2。' } }
      }
    },
    hall: { name: '經典流', icon: '比', deepCell: 'honest',
      tagline: '正面跟他比份量。', passive: '同色大他 2 星以上：扣他你這張的整張星數。', cost: '同色平手：你扣 1。',
      read: '先看這色有沒有比他大 2 星。', first: '經典流：同色大他 2 星，扣整張；同色平手，你扣 1。',
      fx: { mirrorWinFull: 1, fullMin: 2, tieCost: 1 },
      picks: [
        { id: 'h_eye', name: '識貨', op: 'starPlus', axis: 'c', n: 1, text: '你的經典 +1 星（王牌不加）。' },
        { id: 'h_first', name: '初版', op: 'fullPlus', n: 1, text: '扣整張那手，再多扣 1。' },
        { id: 'h_old', name: '老派', op: 'tieFree', text: '每場第一次同色平手，你不扣。' },
        { id: 'h_seen', name: '見過世面', op: 'counteredCut', n: 2, text: '每場第一次被剋，少扣 2（最少扣 1）。' },
        { id: 'h_leech', name: '吸血', op: 'leech', max: 2, second: true, text: '扣整張那手，扣到的一半回聲望，一場最多 2。' } ],
      priority: ['h_leech', 'h_eye', 'h_first', 'h_seen', 'h_old'] },
    pearl: { name: '冷門流', icon: '借', deepCell: 'caught',
      tagline: '借他的份量，只讀真假。', passive: '你剋他一定剋得動，扣他那張的星數；他大你 2 星以上那手不加品味。', cost: '被剋：多扣 1。',
      read: '只讀真假，信的時候丟最小那張。', first: '冷門流：剋他一定剋得動，扣他那張；被剋多扣 1。',
      fx: { counterAlways: 1, underdogNoAtk: 1, counteredCost: 1 },
      picks: [
        { id: 'p_remember', name: '有人記得', op: 'cCostFree', text: '被剋不再多扣 1。' },
        { id: 'p_bench', name: '冷板凳', op: 'counteredCut', n: 2, text: '每場第一次被剋，少扣 2（最少扣 1）。' },
        { id: 'p_regular', name: '熟客', op: 'lowHeal', n: 2, text: '聲望不到一半時，打贏多回 2。' },
        { id: 'p_hp', name: '地下串連', op: 'maxHp', n: 3, text: '聲望上限 +3，現有聲望也 +3。' },
        { id: 'p_thorn', name: '反傷', op: 'thorn', n: 2, max: 2, second: true, text: '被剋時他也扣 2，一場最多 2 次。' } ],
      priority: ['p_thorn', 'p_remember', 'p_bench', 'p_regular', 'p_hp'] },
    heresy: { name: '異端流', icon: '拆', deepCell: 'honest',
      tagline: '賭他在唬，拆穿他。', passive: '他唬你、你剛好剋中（拆穿）：多扣 1，回 2 聲望。', cost: '比星輸：多扣 1。',
      read: '賭他在唬；他少唬的時候就信。', first: '異端流：拆穿多扣 1、回 2 聲望；比星輸多扣 1。',
      fx: { critMult: 1, critPre: 1, critHeal: 2, loseCost: 1 },
      picks: [
        { id: 'x_crack', name: '破音', op: 'critPrePlus', n: 1, text: '拆穿那手再多扣 1。' },
        { id: 'x_echo', name: '回音', op: 'critHealPlus', n: 1, text: '拆穿那手再多回 1 聲望。' },
        { id: 'x_thick', name: '臉皮厚', op: 'loseFree', text: '每場第一次比星輸，不多扣。' },
        { id: 'x_dist', name: '失真', op: 'starPlus', axis: 'h', n: 1, text: '你的硬蕊 +1 星（王牌不加）。' },
        { id: 'x_crit', name: '爆擊', op: 'critSafe', n: 1, second: true, text: '拆穿再多扣 1，比星輸不再多扣。' } ],
      priority: ['x_crit', 'x_dist', 'x_crack', 'x_echo', 'x_thick'] },
    // 畫面字（ui.js：標題旗標章、開局派系卡、升級面板第 4 格、頂欄圖示的本派說明、我的狀態；{x} 由畫面代入）
    ui: {
      badge: '流派試做', badgeBoth: '流派＋頂點卡試做',                 // 標題旗標章（?fac=1）；≤600px 跟 ?apex=1 合成一顆
      passive: '被動', cost: '代價', second: '第二招',                   // 派系卡、本派說明的小標
      pickTag: '本派', pickNote: '不加屬性',                             // 升級第 4 格：小標、灰字小註（拿了這一級不加屬性）
      pickFirst: '這一級可以學一招本派的。',                             // Lv5 第一次出現第 4 格時老闆說
      mine: '本派：{list}', mineNone: '本派：還沒學',                    // 我的狀態那一行（{list}＝拿過的本派選項名，用「、」接）
      costOff: '已取消',                                                 // 本派說明：本派選項取消了代價（有人記得、爆擊）時，代價那行劃掉、後面標這兩字（審查 棒二）
      infoTitle: '{name}・{icon}',                                       // 頂欄一字圖示點開的標題
      leftLeech: '吸血這場還能回 {n} 聲望', leftThorn: '反傷這場還剩 {n} 次',   // 本派說明：這場第二招還剩幾
      firstTip: '點頂欄這個字，看本派的被動和代價。',                    // 第一次觸發被動或代價那手的老闆小提示（指頂欄一字圖示 data-tut=fac；提示出來時結果框已收，審查 棒二：原本叫人看結果行小字，那時看不到）
      pickGo: '就這一派',                                                // 開局派系卡的大鈕（棒二介面）
      profFar: '熟練 Lv{n}・最遠第 {far} 位', profOnly: '熟練 Lv{n}',    // 派系卡最下面那行（這一派打過最遠的那一趟；還沒打過＝只寫熟練）
      swapped: '跟流派一起試，這張換過能力',                             // ?fac=1&apex=1：換過能力的頂點卡（挑王牌面板、唱片資訊）
      apexMixed: '頂點卡跟流派一起試：有幾張還沒換能力'                 // 退回「只標示」時（apexSwap.on false）標題旗標章下的小字
    }
  };
  C.factionsTag = '新';

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
