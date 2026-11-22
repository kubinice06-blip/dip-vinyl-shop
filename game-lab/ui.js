/* game-lab/ui.js：品味對決 v4：外殼與所有非對決畫面。SPEC-v3 §9、§10.5；v4＝SPEC-v4 §2.5.2–§2.5.7（B2）：
 *   逐句執行器（beat runner：步驟依序、點一下只快轉正在做的那一步、▼ 在動作做完才亮、⏩ 快轉到下一個選擇）、
 *   v4 劇本（content.js C.script：原版 25 句（第一句 11-10 改成開頭旁白 C.intro）＋店主改的句子；猜歌、挑王牌、老闆翻箱、特價區三張、八張入袋、後走道嗆聲、兩顆接受對決）、
 *   每個人都用走的（劇情裡不瞬移；翻箱在箱子前）、序章藏起熟客、存檔 v5（錢、這一輪的貨、聲望與等級）、經濟介面接點（DipLabEcon，econ.js）。
 *
 * 版面：#app ＝ #top（32px 頂欄）＋ #stage（常駐像素店舞台，整個 session 只 mount 一次）＋ #panel（每個畫面的面板）。
 *   go(screen) 只做三件事：換 #top、stage.camera(鏡頭)＋擺小人、換 #panel。舞台不重建，所以門、雨、正在放的唱片、店裡的人都連續。
 * 無限試煉（v5，店主 11-12；SPEC 無限試煉 §0）：標題（像素店）→ 序章劇本（店主定稿句）→ 猜歌／挑王牌 → 教學對決 → 收尾（掉出來的盤、發燒配件三選一）
 *   → 來客（這一輪五顆頭像：第 n 位、一般 3、菁英、傳說藏家）→ 對決（無縫推近；黑條只蓋在舞台上）→ 贏了挑他一張唱片（菁英／藏家：唱片或配件）
 *   → 升級三選一（有升級才有）→ 下一位 → 傳說藏家（打倒＝他的王牌收進唱片櫃）→ 下一輪新面孔 → …打到輸為止 → 結算（走到第幾位、最多連贏、收了幾張）→ 再挑戰一趟。
 *   沒有時間、沒有打烊；頂欄只寫「第 n 位」。聲望帶到下一場、打贏回 3；老闆說情每輪一次（輸了重打同一位）；
 *   架上唱片每位客人之間從這一輪的「一檔貨」換一批、打完藏家整檔換新（第 B 波 SPEC-B §3）；櫃檯配件、特價箱每輪。
 * 對決交給 duel.js（DipLabDuel.mount 在 #panel 裡）；規則全在 engine.js（newRun／startFight／finishFight／choose）。
 * 唱片資訊：cardinfo.js（DipLabCardInfo.open）。畫面上每一張封面點一下就開。
 * 規則：
 *  - 只寫 localStorage 'dipGameLab_v1'（存檔版本 7；另有小鍵 .bringKey、今日推薦 .daily、升級前備份 .bak6；v4 存檔照 §1 裁定 12 遷移：留唱片櫃、偏好、小人、配件，丟掉一晚的 run；更舊的安全丟掉）；不用 Firebase；不 DipPlayer.mount。
 *  - 從唱片櫃挑牌開局（店主 11-13；SPEC 從唱片櫃挑牌開局）：唱片櫃分「擁有」（save.shelf[id].own＋src：'gift' 老闆送的／'run' 一趟留一張（店內取得金框）／'boss' 藏家王牌）
 *    與「認識」（照舊）；第二趟起老闆那句說完、走去特價箱之前挑種子（最多 3 張）；打贏客人領獎前念掉落旁白（C.script.drop）；結算「這一趟帶走一張」。
 *    存檔 v5 → v6：原本的唱片櫃都留成「認識」；挑過的王牌那幾組送的四張、打倒藏家拿到的王牌算擁有（migrate5）。
 *  - 整支包在 IIFE 裡，只掛 window.DipLabUI（＋?debug=1 的 window.__lab）。
 *  - UI 不算傷害、不讀 intent：所有數字都來自 DipLabEngine。
 *  - 浮層（泡泡、章、飛卡、吐司、標題牌）pointer-events:none；只有面板、彈窗、教學遮罩、藏家登場卡吃點擊。
 */
(function () {
  'use strict';
  var W = window, D = document;
  var E = null, C = null;
  var KEY = 'dipGameLab_v1';
  var SAVE_V = 8;                                   // v2 是 1、v3 是 3、v4 是 4（一晚版）；v5＝無限試煉：v4 遷移（丟 run、nights → runs、best → 最遠），更舊的整份丟掉（只留聲音偏好與小人）
                                                    // v8＝第 C 波（SPEC-C §2.4）：只改版號（舊分頁讀到 stall／draft 的 pending 會判壞丟整趟；升版後舊頁 s.v > SAVE_V＝唯讀），升級前原字串留 .bak7
                                                    // v6＝從唱片櫃挑牌開局：唱片櫃多「擁有」（own／src）；v5 → v6 照裁定 10 遷移（migrate5），v4 先遷到 v5 再接著遷
                                                    // v7＝卡片 id 改主站 catalogId（SPEC-B §2）：v4–v6 先 migrateIds 再照舊 migrate4／5
  var QS = {};
  try { new URLSearchParams(location.search).forEach(function (v, k) { QS[k] = v; }); } catch (_) {}
  var DEBUG = QS.debug === '1';
  var FAST = QS.fast === '1';
  var ZH = { c: '經典', o: '冷門', h: '硬蕊' }, ZH1 = { c: '經', o: '冷', h: '硬' };
  var ATTRS = ['c', 'o', 'h'];
  var TIERS = ['hall', 'pearl', 'heresy'];

  // ======================================================================= 小工具
  function FX() { return W.DipLabFx || null; }
  function CI() { return W.DipLabCardInfo || null; }
  function TUT() { return W.DipLabTut || null; }
  function DUEL() { return W.DipLabDuel || null; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); }
  // 屬性選擇器的值（catalogId 可能有 "；SPEC-B §1.6）
  function cssEsc(s) { s = String(s == null ? '' : s); return W.CSS && CSS.escape ? CSS.escape(s) : s.replace(/["\\]/g, '\\$&'); }
  function el(tag, cls, html) { var e = D.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function qs(sel, root) { return (root || D).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || D).querySelectorAll(sel)); }
  function now() { return Date.now(); }
  function speed() { return FAST ? 4 : (save && save.settings && save.settings.fastAnim ? 2 : 1); }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, Math.max(0, ms / speed())); }); }
  function rnd(n) { return Math.floor(Math.random() * n); }
  function pickR(a) { return a[rnd(a.length)]; }
  function shuffled(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = rnd(i + 1), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function card(id) { return (C && id && C.cards[id]) || null; }
  function sfx(n, o) { var f = FX(); if (f && f.sfx) try { f.sfx(n, o); } catch (e) { console.error(e); } }
  function stopEv(e) { if (e) e.stopPropagation(); }
  function rm() { var f = FX(); try { return !!(f && f.reducedMotion && f.reducedMotion()); } catch (_) { return false; } }
  function soundOn() { var f = FX(); try { return !!(f && f.soundOn && f.soundOn()); } catch (_) { return false; } }
  function line(k, sub) { var L = C && C.shopLines; var v = L && L[k]; if (sub != null && v && typeof v === 'object' && !Array.isArray(v)) v = v[sub]; return typeof v === 'string' ? v : ''; }
  function todayKey() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function seedKey() { return UI.seedOverride || (QS.seed ? String(QS.seed) : todayKey()); }
  function fill(s, o) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return o && o[k] != null ? o[k] : m; }); }
  // 無限試煉的畫面字（content.js C.trial.ui；{x} 由這裡代入）
  function TU(k, o) { var U = (C && C.trial && C.trial.ui) || {}; return fill(U[k] || '', o); }
  // 第 C 波畫面字（C.waveC.ui）：{n} 是錢就先 moneyText（${n} 的 $ 是字面錢號）
  function WU(k, o) { var U = (C && C.waveC && C.waveC.ui) || {}; return fill(U[k] || '', o); }
  // 客人稱號的寫法（第 A 波 3；審查 A-6）：「○○級」（C.trial.ui.titleFmt）——稱號多半就是別的客人的名字，照原字掛會看成兩個人名；null＝不顯示
  function titleTx(t) { return t ? (TU('titleFmt', { t: t }) || t) : ''; }
  // 來客條的說情（SPEC-D §2.8-7）：有樂歷的備用說情＝「說情剩 1・備用 1」（這一輪的用完也照出）；沒有＝照舊「老闆說情 剩 1 次」
  function pleaText(r) {
    var U = (C && C.career && C.career.ui) || {};
    if ((r.plea | 0) > 0 && U.pleaLeft) return fill(U.pleaLeft, { n: r.retryLeft | 0 }) + fill(U.pleaSpare || '', { n: r.plea | 0 });
    return r.retryLeft > 0 ? TU('retryLeft', { n: r.retryLeft }) : '';
  }
  // 從唱片櫃挑牌開局的畫面字（content.js C.seeds.ui）
  function SU(k, o) { var U = (C && C.seeds && C.seeds.ui) || {}; return fill(U[k] || '', o); }
  // 頂欄（店主 11-12：只寫第幾位，不寫時間）：還沒有 run＝「品味對決」；序章（含收尾）＝「序章」；之後「第 n 位<small>第 R 輪</small>」，對決時小字加「・菁英／傳說藏家」
  function inPrologue(r) { return !r || !Number.isInteger(r.pos) || r.prologue === 'pending' || !!(r.pending && r.pending.prologue); }
  function posLabel(r, cls) {
    if (!r) return esc(TU('game'));                 // 還沒有這一趟（標題、序章開頭、再挑戰一趟挑王牌前）：「品味對決」（沒有日期、沒有雨夜；審查 #14）
    if (inPrologue(r)) return esc(TU('prologue'));
    if (r.pending && r.pending.type === 'draft' && r.cpFrom > 1) return esc(WU('cpFrom', { n: r.cpFrom }));   // 第 C 波：中繼點開局選秀中（pos 還是 1）＝「這一趟從第 N 位開始」
    var sub = TU('round', { r: r.round }) + (cls === 'elite' ? '・' + TU('elite') : cls === 'boss' ? '・' + TU('boss') : '');
    var nb = toRecordN(r);                          // 離最遠紀錄 3 位內：「再贏 N 位破紀錄」（第 A 波 4；打的當下就亮）
    if (!nb) return esc(TU('pos', { n: r.pos })) + '<small>' + esc(sub) + '</small>';
    // 有「再贏 N 位破紀錄」：整列 flex，放不下先切「第 R 輪・傳說藏家」那段（省略號），破紀錄那句一定完整（審查 A-14：三位數位數的藏家對決，375 寬被切成「破紀…」）
    return '<span class="tw">' + esc(TU('pos', { n: r.pos })) + '<small class="sb">' + esc(sub) + '</small><small class="rec" data-tut="to-record">' + esc(TU('toRecord', { n: nb })) + '</small></span>';
  }
  // 第一次來客的四句（tutorial firstTime 'night'）：泡泡避開對戰台（客人走過去站在那裡等你、到了說開場那句；night 鏡頭貼底，對戰台在店景最下面一條，
  //   原本泡泡放在名單正上方剛好蓋住，審查 A-11）→ 放不下就放到店景上面那段空白
  var NIGHT_INTRO_O = { keep: ['shop:deck'] };
  // 再贏幾位破紀錄（＝走到第 最遠＋1 位）：1–3 才回（離紀錄 3 位內）；沒有紀錄（第一趟）、已經破了、這一趟結束了＝0
  var REC_NEAR = 3;
  function toRecordN(r) {
    var far = r ? r.farBefore | 0 : 0;
    if (!r || far <= 0 || r.over || !Number.isInteger(r.pos)) return 0;
    var n = far + 1 - r.pos;
    var pd = r.pending && r.pending.type;
    if (pd === 'reward' || pd === 'level') n -= 1;   // 這一位剛打贏、還在領獎／升級（r.pos 還沒往前）：已經贏了，少算一位（審查 A-5）
    return n >= 1 && n <= REC_NEAR ? n : 0;
  }
  function dt(k, o) { var T = (C && C.duelText) || {}; return fill(T[k] || '', o); }
  // 經典／冷門／硬蕊 三個字上屬性色（esc 之後再換）
  // 相剋寫全名（店主 11-12）：屬性第一個字照屬性色、第二個字黑；「剋」灰（牌桌小抄同一套，duel.js cheatHTML）
  function tintBeats(s) {
    var one = function (w) { return '<b class="' + ({ 經典: 'c', 冷門: 'o', 硬蕊: 'h' })[w] + '">' + w.charAt(0) + '</b>' + w.charAt(1); };
    // 只染「A剋B」那三組（整組不斷行）；「剋中」的剋照常黑
    return esc(s).replace(/(經典|冷門|硬蕊)剋(經典|冷門|硬蕊)/g, function (m, a, b) { return '<span class="pr">' + one(a) + '<span class="kx">剋</span>' + one(b) + '</span>'; });
  }
  function colorZh(s) { return esc(s).replace(/經典|冷門|硬蕊/g, function (w) { var a = w === '經典' ? 'c' : w === '冷門' ? 'o' : 'h'; return '<b class="' + a + '">' + w + '</b>'; }); }

  // ======================================================================= 存檔
  var save = null;
  function defSave() {
    return { v: SAVE_V, seen: {}, learned: {}, settings: { fastAnim: false, sound: null, autoNext: false, bgm: null, musicVol: 0.5, bgmSrc: 'bag' }, player: null, run: null, runs: [], runSeq: {},
      best: { far: 0, checkpoints: [], bestStreak: 0 }, shelf: {}, relics: [],
      tutorialDone: false, prologueDone: false, lastAce: null, lastBargain: null, bring: null,   // bring：主站「帶去店裡對決」帶來的那張（{id, at}；下一趟開局挑種子排第一、預設勾好，用一次就清）
      want: [],
      // 第 C 波（SPEC-C §2.4）：樂歷記帳（C 波只記、D 波一次入帳；base＝15×實際打過的位數＋8×最多連贏）、寶箱保底計數（跨趟）、上線後記的本機計數（只記不讀）
      lexpBank: { base: 0, gig: 0, home: 0, promo: 0, packet: 0, demo: 0, runs: 0 }, chestDry: 0,
      wcLog: { ground: 0, lootRows: 0, leave: 0, sessions: 0, resumeInStall: 0 },
      // 第 D 波（SPEC-D §2.5；SAVE_V 不升，維持 8：只多 career、trial 兩個鍵，C 版頁面讀到照留）：樂歷（等級、點數由 xp／spent 算、不存）、試煉階級（棒三才用）
      career: { key: '', xp: 0, spent: {}, off: false, prof: { hall: 0, pearl: 0, heresy: 0 }, tree: { hall: {}, pearl: {}, heresy: {} }, drawn: [], got: [], banked: false, lastGain: null },
      trial: { open: 0, pick: 0, best: {} },
      // 活店（SPEC-H §8；SAVE_V 不升：只多 regulars 一個頂層鍵）：n＝總共聊過幾段（輪替雜湊）、met＝見過的熟客（talks、againAt、每一類最近講過的句子）、
      //   seen＝路人共用環與老闆按類、enc＝一輩子切磋戰績（第二階段；只給台詞條件用）
      regulars: { v: 1, n: 0, met: {}, seen: { passer: [], owner: {} }, enc: { offered: 0, fought: 0, won: 0, lost: 0 } } };   // want：想要清單（你家的控制台在星圖上挑到、還沒擁有的；v5 第六項第三期，先只記、不影響進貨；不用升存檔版本：舊存檔缺這個鍵就補空的）
  }
  var posInt = function (x) { return typeof x === 'number' && Math.floor(x) === x && x >= 1; };
  function validRun(r) {
    try {
      if (!r || typeof r !== 'object' || r.v !== E.RUN_V) return false;
      if (!Array.isArray(r.bag) || !Array.isArray(r.order) || !r.order.length || !Array.isArray(r.relics) || !r.stats || TIERS.indexOf(r.ace) < 0) return false;
      // v4：錢（有限、非負整數）與這一輪的貨（§2.1.6）
      if (typeof r.money !== 'number' || !isFinite(r.money) || r.money < 0 || Math.floor(r.money) !== r.money) return false;
      var sh = r.shop;
      if (!sh || typeof sh !== 'object' || !sh.bins || typeof sh.bins !== 'object' || !Array.isArray(sh.relics) || !Array.isArray(sh.bargain) || typeof sh.bargainPicked !== 'boolean') return false;
      if (Object.keys(sh.bins).some(function (k) { return !Array.isArray(sh.bins[k]); })) return false;
      if (r.order.some(function (id) { return !C.enemies[id]; })) return false;
      if (r.bag.some(function (id) { return !card(id); })) return false;
      // v5 無限試煉：第幾位／第幾輪／輪內第幾位對得上，聲望 1..上限，等級、品味、底氣是整數
      if (!posInt(r.pos) || !posInt(r.round) || r.round !== E.roundOf(r.pos) || r.idx !== (r.pos - 1) % E.TRIAL.classes.length || r.idx >= r.order.length) return false;
      if (!posInt(r.maxHp) || !posInt(r.hp) || r.hp > r.maxHp || !posInt(r.level) || !(r.atk >= 0) || !(r.def >= 0) || !Array.isArray(r.checkpoints)) return false;
      var p = r.pending;
      if (p && !/^(reward|retry|level|stall|draft)$/.test(p.type)) return false;
      if (p && p.type === 'reward' && (!Array.isArray(p.cards) || !Array.isArray(p.relics))) return false;
      // 第 C 波（SPEC-C §2.4）：戰利品列／寶箱（reward 有 kind）、今天的攤位、中繼點開局選秀
      if (p && p.type === 'reward' && p.kind && !Array.isArray(p.src)) return false;
      if (p && p.type === 'stall' && !(Array.isArray(p.groups) && Array.isArray(p.q) && Number.isInteger(p.k) && Array.isArray(p.post) && (p.pick === null || p.pick === undefined || [0, 1, -1].indexOf(p.pick) >= 0))) return false;
      if (p && p.type === 'draft' && !(p.offer && typeof p.offer === 'object')) return false;
      if (r.found != null && !Array.isArray(r.found)) return false;
      if (p && p.type === 'level' && (!Array.isArray(p.offer) || !p.offer.length)) return false;
      if (r.duel && (!r.duel.e || !r.duel.p)) return false;
      // 從唱片櫃挑牌開局：種子、這一趟進過包包／客人掉落的記錄（舊的 run 沒有：引擎自己補）
      if (['seeds', 'gifts', 'entered', 'drops'].some(function (k) { return r[k] != null && !Array.isArray(r[k]); })) return false;
      if (r.kept != null && typeof r.kept !== 'string') return false;
      // 第 D 波（SPEC-D §2.5；CONTRACT §1）：樂歷帶進局的欄位只驗型別（舊 run 沒有＝照舊）
      if (r.talent != null && !(r.talent && typeof r.talent === 'object' && !Array.isArray(r.talent))) return false;
      if (r.plea != null && !(Number.isInteger(r.plea) && r.plea >= 0)) return false;
      if (['xpMul', 'xpFrac', 'payMul', 'goldAdd'].some(function (k) { return r[k] != null && !(typeof r[k] === 'number' && isFinite(r[k])); })) return false;
      if (r.relicPick != null && !Number.isInteger(r.relicPick)) return false;
      // 第 I 波 I-1 翻面（CONTRACT §5、§7）：留到下一位的 run.encCarry 只收 null 或 {give: again|star|hit}；壞的設 null（不判整趟不合法、不升 RUN_V）
      // 第 I 波 I-2（SPEC-I §10；CONTRACT §1）：上場／耐聽的鍵只驗型別；不對＝交給 fixRun（engine fixLineup）修，不判整趟不合法、不升 RUN_V
      var arr = function (k) { return r[k] == null || Array.isArray(r[k]); }, int = function (k) { return r[k] == null || Number.isInteger(r[k]); };
      if (!(r.lineup === null || arr('lineup')) || !arr('bench') || !arr('lineupFresh') || !arr('rested') || !(r.lineupDue == null || typeof r.lineupDue === 'boolean') ||
        !int('lineupFrom') || !int('lineupBonus') || !int('wearPos') || !(r.wear == null || (r.wear && typeof r.wear === 'object' && !Array.isArray(r.wear) &&
          Object.keys(r.wear).every(function (k) { var w = r.wear[k]; return w && Number.isInteger(w.g) && Number.isInteger(w.n) && w.g >= 0 && w.n >= 0; })))) fixRun(r);
      if ('encCarry' in r && !(r.encCarry === null || (r.encCarry && typeof r.encCarry === 'object' && ['again', 'star', 'hit'].indexOf(r.encCarry.give) >= 0))) r.encCarry = null;
      // SPEC-B §2.3 寬鬆：run.want 壞＝清空（loadSave 會重同步）、shop.lot 壞＝拿掉（fixLot 重抽），不判整趟不合法
      if (r.want != null && !(Array.isArray(r.want) && r.want.every(function (x) { return typeof x === 'string'; }))) r.want = [];
      var rd = r.retryDeck;
      if (rd != null && !(rd && typeof rd === 'object' && posInt(rd.pos) && typeof rd.id === 'string' && Array.isArray(rd.ids) && rd.ids.length && rd.ids.every(function (x) { return typeof x === 'string' && card(x); }))) delete r.retryDeck;
      var lt = sh.lot;
      if (lt != null && !(lt && typeof lt === 'object' && lt.bins && typeof lt.bins === 'object' && !Array.isArray(lt.bins) &&
          Object.keys(lt.bins).every(function (k) { return Array.isArray(lt.bins[k]) && lt.bins[k].every(function (x) { return typeof x === 'string'; }); }) &&
          lt.cur && typeof lt.cur === 'object' && Object.keys(lt.cur).every(function (k) { return Number.isInteger(lt.cur[k]) && lt.cur[k] >= 0; }) &&
          Array.isArray(lt.gone) && lt.gone.every(function (x) { return typeof x === 'string'; }))) delete sh.lot;
      if (!r.over && !E.nextStep(r)) return false;
      return true;
    } catch (_) { return false; }
  }
  // v4（一晚版）→ v5（SPEC 無限試煉 §1 裁定 12）：留唱片櫃、看過的、學會的、偏好、小人、教學／序章做過沒、上次的王牌與特價三張、配件；
  //   一晚的 run 丟掉；nights → runs（舊的一晚記成 legacy，只拿來數「同一天第幾趟」）；best → { far, checkpoints, bestStreak }（一晚版沒有位數，從 0 起）
  function migrate4(s) {
    var d = defSave(), o = { v: 5 };                  // 先遷成 v5，再交給 migrate5 遷到 v6
    ['seen', 'learned', 'settings', 'shelf'].forEach(function (k) { o[k] = s[k] && typeof s[k] === 'object' && !Array.isArray(s[k]) ? s[k] : d[k]; });
    o.player = s.player && typeof s.player === 'object' ? s.player : null;
    ['tutorialDone', 'prologueDone'].forEach(function (k) { o[k] = s[k] === true; });
    o.lastAce = TIERS.indexOf(s.lastAce) >= 0 ? s.lastAce : null;
    o.lastBargain = s.lastBargain || null;
    o.relics = Array.isArray(s.relics) ? s.relics : [];
    o.run = null;
    o.runs = (Array.isArray(s.nights) ? s.nights : []).filter(function (n) { return n && typeof n === 'object'; }).map(function (n) {
      return { seedKey: String(n.seedKey || ''), runNo: n.nightNo | 0, ace: n.ace || null, result: n.result || null, reached: 0, bestStreak: 0, taken: Array.isArray(n.taken) ? n.taken.length : 0, wins: n.wins | 0, legacy: true };
    });
    // 同一天開過幾趟（只增不減的計數器；舊的一晚也算，新的一趟從下一號開始）
    o.runSeq = {};
    o.runs.forEach(function (n) { if (n.seedKey) o.runSeq[n.seedKey] = Math.max(o.runSeq[n.seedKey] | 0, n.runNo | 0, runsIn(o.runs, n.seedKey)); });
    o.best = d.best;
    UI.migrated = true;
    return o;
  }
  // v5（無限試煉）→ v6（從唱片櫃挑牌開局 §1 裁定 10）：原本的唱片櫃都留成「認識」；「擁有」給——
  //   挑過的王牌那幾組老闆送的四張（src 'gift'；看 runs[]、lastAce、進行中的 run）、
  //   打倒藏家拿到的王牌（src 'boss'；runs[] 走到第 6 位以後＝打倒過第 5 位的藏家，那一趟藏家帶的王牌照 engine.bossAceFor 算；進行中的 run 看 aceWon）。
  //   一晚版遷過來的（legacy）沒有位數：result 'clear'（v4 打烊＝打倒藏家、clearFlow 把他的王牌收進唱片櫃）才算，王牌看唱片櫃——
  //   那一晚（at＝seedKey#runNo）第一次認識、又不是自己挑的那張王牌的頂點卡；剛好一張才給（v4 newRun 的亂數順序不同，bossAceFor 算不出來；審查 #2）。
  //   進行中的 run 照留（引擎自己補種子／記錄的欄位）
  function migrate5(s) {
    var o = {}; Object.keys(s).forEach(function (k) { o[k] = s[k]; }); o.v = 6;     // v7 那步在 loadSave
    var src = s.shelf && typeof s.shelf === 'object' && !Array.isArray(s.shelf) ? s.shelf : {}, sh = {};
    Object.keys(src).forEach(function (id) { var e = src[id]; sh[id] = { at: e && typeof e.at === 'string' ? e.at : '', seen: !!(e && e.seen) }; });
    var own = function (id, from, at) {
      if (!card(id)) return;
      var e = sh[id] || (sh[id] = { at: at || '', seen: true });
      if (!e.own) { e.own = true; e.src = from; }
    };
    var runs = Array.isArray(s.runs) ? s.runs.filter(function (n) { return n && typeof n === 'object'; }) : [];
    var r = s.run && typeof s.run === 'object' ? s.run : null;
    var aces = [];
    runs.map(function (n) { return n.ace; }).concat([s.lastAce, r && r.ace]).forEach(function (t) { if (TIERS.indexOf(t) >= 0 && aces.indexOf(t) < 0) aces.push(t); });
    aces.forEach(function (t) { (C.gifts[t] || []).forEach(function (id) { own(id, 'gift'); }); });
    var aceIds = TIERS.map(function (t) { return C.aces[t]; });
    runs.forEach(function (n) {
      if (TIERS.indexOf(n.ace) < 0 || !n.seedKey) return;
      var tag = n.seedKey + '#' + (n.runNo || 1);
      if (n.legacy) {
        if (n.result !== 'clear') return;
        var won = aceIds.filter(function (id) { return id && id !== C.aces[n.ace] && sh[id] && sh[id].at === tag; });
        if (won.length === 1) own(won[0], 'boss', tag);
        return;
      }
      if ((n.reached | 0) <= 5) return;
      own(C.aces[E.bossAceFor(n.seedKey, n.runNo || 1, n.ace)], 'boss', tag);
    });
    if (r && r.aceWon && TIERS.indexOf(r.bossAce) >= 0) own(C.aces[r.bossAce], 'boss');
    o.shelf = sh;
    UI.migrated6 = true;
    return o;
  }
  // ---- v7：舊 slug → catalogId（SPEC-B §2.2）。表＝C.legacyIds()；走訪＝engine mapIds（只換整個字串剛好是舊 slug 的鍵與值→可重入）；
  //   player、settings 以外全走（含 run 與打到一半的對決）；唱片櫃鍵撞在一起用 mergeShelf 合
  function migrateIds(s) {
    var L = C.legacyIds(), o = {};
    Object.keys(s).forEach(function (k) {
      o[k] = (k === 'player' || k === 'settings') ? s[k] : E.mapIds(s[k], L, k === 'shelf' ? mergeShelf : undefined);
    });
    return o;
  }
  // seedKey#runNo 比早晚（趟數照數字）；空的不算
  function tagCmp(x, y) { var a = String(x).split('#'), b = String(y).split('#'); if (a[0] !== b[0]) return a[0] < b[0] ? -1 : 1; return (parseInt(a[1], 10) || 0) - (parseInt(b[1], 10) || 0); }
  function earlierTag(x, y) { x = typeof x === 'string' ? x : ''; y = typeof y === 'string' ? y : ''; if (!x) return y; if (!y) return x; return tagCmp(y, x) < 0 ? y : x; }
  // 同一張舊、新兩格合一：own 或、src 取擁有（都有取早的）、at／ownAt 取早的、seen 或
  function mergeShelf(a, b) {
    var ok = function (e) { return e && typeof e === 'object' && !Array.isArray(e); };
    if (!ok(a)) return b; if (!ok(b)) return a;
    var ao = a.own === true, bo = b.own === true, x = { at: earlierTag(a.at, b.at), seen: !!(a.seen || b.seen) };
    if (ao || bo) {
      var oa = earlierTag(ao ? a.ownAt : '', bo ? b.ownAt : ''), w = ao && bo ? (oa && oa === b.ownAt && oa !== a.ownAt ? b : a) : ao ? a : b;
      x.own = true; x.src = w.src; if (oa) x.ownAt = oa;
    }
    return x;
  }
  // 升級前原字串留在 .bak6（v4–6 → 7；SPEC-B §2.5）／.bak7（v7 → 8；SPEC-C §2.4）：沒有才寫；程式不讀，回滾手動救
  function backupOnce(raw, k) {
    k = KEY + '.' + (k || 'bak6');
    try { if (typeof raw === 'string' && raw && W.localStorage.getItem(k) == null) W.localStorage.setItem(k, raw); } catch (_) { /* 寫不進去：照樣升級 */ }
  }
  // 升級失敗／比這版新：唯讀，只帶不含卡 id 的身分欄位（不被當新玩家；SPEC-B §2.1 B1）
  function keepShell(d, s) {
    if (!s || typeof s !== 'object' || Array.isArray(s)) return d;
    try { if (s.player && typeof s.player === 'object' && !Array.isArray(s.player) && s.player.avatar && typeof s.player.avatar === 'object') d.player = Object.assign({}, s.player); } catch (_) {}
    try { if (s.settings && typeof s.settings.sound === 'boolean') d.settings.sound = s.settings.sound; } catch (_) {}
    if (s.prologueDone === true) d.prologueDone = true;
    if (s.tutorialDone === true) d.tutorialDone = true;
    if (TIERS.indexOf(s.lastAce) >= 0) d.lastAce = s.lastAce;
    return d;
  }
  function loadSave() {
    var s = null, raw = null;
    try { raw = W.localStorage.getItem(KEY); if (raw) s = JSON.parse(raw); } catch (_) { s = null; }
    var d = defSave();
    // cards-pool.js 沒載到：照玩但不存（不然新卡的格子、想要、包包會被濾掉再寫回；SPEC-B G3）
    if (!C.poolLoaded) { UI.saveReadOnly = true; UI.poolMissing = true; }
    if (s && typeof s === 'object' && typeof s.v === 'number' && s.v > SAVE_V) { UI.saveReadOnly = true; return keepShell(d, s); }   // 比這版新：不覆寫
    // 換 id 先跑（migrate4／5 拿 catalogId 比存檔裡的 id）
    var oldV = s && typeof s === 'object' && (s.v === 4 || s.v === 5 || s.v === 6);
    if (oldV) {
      backupOnce(raw);
      try { s = migrateIds(s); } catch (e) { console.error(e); UI.saveReadOnly = true; UI.migrateFail = true; return keepShell(d, s); }
    }
    if (s && typeof s === 'object' && s.v === 4) s = migrate4(s);
    if (s && typeof s === 'object' && s.v === 5) s = migrate5(s);
    if (s && typeof s === 'object' && s.v === 6) { s.v = 7; UI.migrated7 = true; }   // boot 寫回一次
    // v7 → 8（第 C 波，SPEC-C §2.4）：只改版號；原字串留 .bak7（v6 以前遷上來的不寫：那份原字串在 .bak6）
    if (s && typeof s === 'object' && s.v === 7) { if (!oldV) backupOnce(raw, 'bak7'); s.v = SAVE_V; UI.migrated8 = true; }
    if (!s || typeof s !== 'object' || s.v !== SAVE_V) {
      // 舊版（v1／v2 的 v:1、v3）：規則與資料形狀都不一樣，整份丟掉；只帶走聲音偏好與小人（不是遊戲狀態）
      if (s && typeof s === 'object') {
        try { if (s.settings && typeof s.settings.sound === 'boolean') d.settings.sound = s.settings.sound; } catch (_) {}
        try { if (s.player && s.player.avatar && typeof s.player.avatar === 'object') d.player = { name: '你', avatar: s.player.avatar }; } catch (_) {}
        UI.discardedOld = true;
      }
      return d;
    }
    // 第 D 波（SPEC-D §2.5）：C 波的 v8 存檔第一次建 career（沒有這個鍵）：原字串留 .bak8（只是備份，程式不讀；v7 以前遷上來的原字串已經在 .bak6／.bak7）
    if (!oldV && !UI.migrated8 && raw && !(s.career && typeof s.career === 'object' && !Array.isArray(s.career))) backupOnce(raw, 'bak8');
    // 型別不對就換回預設；預設是 null 的欄位（player、run、lastAce、lastBargain）可以存 null 以外的值（審查 #1：lastAce 'hall' 不再被洗成 null），下面各自驗
    for (var k in d) {
      if (s[k] === undefined) { s[k] = d[k]; continue; }
      if (d[k] === null) continue;
      if (s[k] === null || typeof s[k] !== typeof d[k] || Array.isArray(s[k]) !== Array.isArray(d[k])) s[k] = d[k];
    }
    if (TIERS.indexOf(s.lastAce) < 0) s.lastAce = null;
    if (s.player != null && (typeof s.player !== 'object' || Array.isArray(s.player))) s.player = null;
    if (s.run != null && typeof s.run !== 'object') s.run = null;
    // 同一天第幾趟的計數器（審查 #5）：只留正整數
    var rq = {}; Object.keys(s.runSeq).forEach(function (k2) { if (posInt(s.runSeq[k2])) rq[k2] = s.runSeq[k2]; }); s.runSeq = rq;
    // 上次序章挑的特價箱三張（重看教學用；不合法就當沒有）
    if (s.lastBargain != null && !(Array.isArray(s.lastBargain) && s.lastBargain.length === 3 && s.lastBargain.every(function (id) { return typeof id === 'string' && card(id); }))) s.lastBargain = null;
    // 主站帶來的那張（v5 第六項第一期）：不是 {id}、卡不在了、是王牌（帶不進來）就當沒有
    if (s.bring != null && !validBring(s.bring)) s.bring = null;
    bringSeen = bringKey(s.bring);
    s.settings = Object.assign({}, d.settings, s.settings || {});
    var b = s.best && typeof s.best === 'object' ? s.best : {};
    s.best = { far: Math.max(0, b.far | 0), bestStreak: Math.max(0, b.bestStreak | 0),
      checkpoints: (Array.isArray(b.checkpoints) ? b.checkpoints : []).filter(posInt).filter(function (x) { return !E.isCheckpoint || E.isCheckpoint(x, C); })   // 第 C 波：打到就永久開＝只留真的中繼點（舊版本記到的別的位數丟掉；CRITIQUE 4.4）
        .filter(function (x, i, a) { return a.indexOf(x) === i; }).sort(function (x, y) { return x - y; }) };
    // 第 C 波（SPEC-C §2.4）：樂歷記帳、寶箱保底、上線後記——數字不對就歸零
    var nn = function (x) { return typeof x === 'number' && isFinite(x) && x > 0 ? Math.floor(x) : 0; };
    var lb = s.lexpBank && typeof s.lexpBank === 'object' && !Array.isArray(s.lexpBank) ? s.lexpBank : {};
    s.lexpBank = {}; Object.keys(d.lexpBank).forEach(function (k2) { s.lexpBank[k2] = nn(lb[k2]); });
    s.chestDry = nn(s.chestDry);
    var wl = s.wcLog && typeof s.wcLog === 'object' && !Array.isArray(s.wcLog) ? s.wcLog : {};
    s.wcLog = {}; Object.keys(d.wcLog).forEach(function (k2) { s.wcLog[k2] = nn(wl[k2]); });
    if (!Array.isArray(s.runs)) s.runs = [];
    if (!Array.isArray(s.relics)) s.relics = [];
    s.relics = s.relics.filter(function (id) { return C.relics && C.relics[id]; }).slice(0, 3);
    fixRun(s.run);                                    // 第 I 波 I-2（SPEC-I §10）：上場／耐聽的鍵先整理（型別錯的修、不在包包的拿掉；開關關著＝整組拿掉），不判整趟不合法
    if (s.run && !validRun(s.run)) {
      // 不過＝先丟打到一半的對決再驗；還不過才丟整趟（SPEC-B §2.2）
      var r0 = s.run;
      if (r0 && typeof r0 === 'object' && !Array.isArray(r0) && (r0.duel || r0.duelEnemy)) { r0.duel = null; r0.duelEnemy = null; if (posInt(r0.hpIn)) r0.hp = r0.hpIn; }
      if (!validRun(r0)) s.run = null;
    }
    // 主屬性（第 A 波 6）以前存的進行中 run：這一輪開打過＝照舊牌組打完這一輪（說情重打＝同一副牌），下一輪起才照主屬性組牌（engine fixMain；合併審查 11-16）
    if (s.run && E.fixMain) { try { E.fixMain(s.run); } catch (_) {} }
    // 這一輪的貨跟現在的箱子對不上（v5 店面改版前存的：有 pop、沒有 citypop／indierock／indiepop）：只補缺的區、丟掉沒有的區（同種子，每次載入一樣）
    if (s.run && E.fixBins) { try { E.fixBins(s.run, C); } catch (_) { /* 補不了就照舊：那一區點了說賣完 */ } }
    // 停在「開局特價箱還沒挑」的舊存檔（店主 11-16 換特價箱之前存的）：箱子還擺換下來的舊牌（三軸加起來 6–7）→ 用現在的池子重擺（同種子，每次載入一樣）
    if (s.run && E.fixBargain) { try { E.fixBargain(s.run, C); } catch (_) { /* 重擺不了就照舊 */ } }
    // 收音機（v5 第六項第二期）：舊存檔沒有 shop.radio＝這一輪還沒轉；壞掉的（不是 {cell, id}、格子或卡不在了）當作沒轉
    if (s.run && s.run.shop) { var rd = s.run.shop.radio; if (rd != null && !(rd && typeof rd === 'object' && card(rd.id) && C.tunes && C.tunes.colors && C.tunes.colors[rd.cell])) s.run.shop.radio = null; if (rd === undefined) s.run.shop.radio = null; }
    // 唱片櫃（v6）：每一格 {at, seen, own?, src?}；擁有的 src 只認 gift／run／boss
    var shf = {};
    Object.keys(s.shelf).forEach(function (id) {
      var e = s.shelf[id]; if (!e || typeof e !== 'object' || Array.isArray(e)) return;
      var x = { at: typeof e.at === 'string' ? e.at : '', seen: !!e.seen };
      if (e.own === true) { x.own = true; x.src = SHELF_SRC.indexOf(e.src) >= 0 ? e.src : 'gift'; if (typeof e.ownAt === 'string') x.ownAt = e.ownAt; }
      shf[id] = x;
    });
    s.shelf = shf;
    // 解鎖制（店主 11-16；scratchpad v5/unlock BRIEF 第 6 條）：已解鎖的派＝save.lastAce ∪ 唱片櫃擁有頂點卡的派；?apex=1 擁有的試做卡＝唱片櫃擁有的（只認識的不算）。
    //   lastAce 那派預設那張補記成擁有（src 'start'）：之後換到別派，那派也不會鎖回去。每次載入都跑（新規則的存檔不會有要補的）；有補＝UI.migratedUnlock
    if (E.unlockMigrate && TIERS.indexOf(s.lastAce) >= 0) {
      try {
        E.unlockMigrate(C, function (id) { return !!(shf[id] && shf[id].own); }, s.lastAce).own.forEach(function (id) {
          var e = shf[id] || (shf[id] = { at: '', seen: true });
          if (!e.own) { e.own = true; e.src = 'start'; UI.migratedUnlock = true; }
        });
      } catch (_) { /* 補不了就照舊：lastAce 那派照樣算解鎖（unlockedTiers 的 start） */ }
    }
    // 進行中的舊 run（沒有 run.unlock）：補上開局快照（之後換王牌只能換解鎖的、藏家照被剋鏈帶卡）
    if (s.run && E.fixUnlock) { try { E.fixUnlock(s.run, C, unlockArgs(s)); } catch (_) {} }
    // 升版前停在待說情／打到一半的對決：照舊卡池釘住這位的牌單（說情重打＝同一副牌；engine pinOldDeck）
    if (s.run && oldV && E.pinOldDeck) { try { E.pinOldDeck(s.run, C, C.legacyIds()); } catch (_) {} }
    // 今日推薦自癒（SPEC-B B2）：daily.log 收過的卡唱片櫃沒擁有（舊碼分頁蓋掉）→ 補成擁有 src daily；要在想要清理之前
    (UI.daily && Array.isArray(UI.daily.log) ? UI.daily.log : []).forEach(function (x) {
      var c = x && card(x.id); if (!c || c.tier) return;
      var e = shf[x.id] || (shf[x.id] = { at: x.day || '', seen: true });
      if (!e.own) { e.own = true; e.src = 'daily'; e.ownAt = x.day || ''; UI.migrated7 = true; }
    });
    // 想要清單：卡還在、不重複、已經擁有的拿掉（收進唱片櫃了就不用想要了）；最多 200 張
    s.want = s.want.filter(function (id, i, a) { return typeof id === 'string' && card(id) && a.indexOf(id) === i && !(shf[id] && shf[id].own); }).slice(-200);
    // run.want 照清理過的重同步，再 fixLot（它讀 run.want；SPEC-B B6）
    if (s.run) { s.run.want = s.want.slice(-200); if (E.fixLot) { try { E.fixLot(s.run, C); } catch (_) { /* 抽不了就照舊：下一位照舊補貨 */ } } }
    // 第 C 波（SPEC-C §2.2、§2.4；CONTRACT §6）：舊 run 補欄位；不在卡池的卡 id 濾掉（站的貨濾光＝重進那一站、選秀題 <2 張＝重出）
    if (s.run && E.fixWaveC) { try { E.fixWaveC(s.run, C, { bestFar: s.best.far, chestDry: s.chestDry }); } catch (e) { console.error(e); } }
    // 活店第二階段（切磋，CONTRACT §6）：run.spar／run.stats.spar 形狀不對就刪；'offer' 但不是這一位＝刪；'fighting' 留著給來客畫面判作廢
    if (s.run && E.fixEnc) { try { E.fixEnc(s.run, C); } catch (e) { console.error(e); } }
    // 第 D 波棒二（CONTRACT §1）：帶派別的 run 整理（形狀、不認得的本派選項、待選升級裡不認得或拿過的本派格）；沒有 run.fac＝不動
    if (s.run && s.run.fac != null && E.fixFac) { try { E.fixFac(s.run, C); } catch (e) { console.error(e); } }
    // 第 D 波（SPEC-D §2.5；CONTRACT §3.1-1）：樂歷整理（型別、spent 截上限、點數不夠全退、prof／tree／drawn）；抽盤雜湊的 key 空的就補（＝seedKey()）
    if (E.careerFix) { try { s.career = E.careerFix(C, s.career); } catch (e) { console.error(e); s.career = d.career; } }
    if (!s.career.key) s.career.key = seedKey();
    // 退版期間（C 版頁面的 SHELF_SRC 沒有 'lexp'）被洗成「老闆送的」的樂歷盤：照 career.got 補回來源（抽的時候一定是還沒擁有，所以原本就是 lexp）
    (s.career.got || []).forEach(function (id) { var e = shf[id]; if (e && e.own && e.src === 'gift') e.src = 'lexp'; });
    var tr = s.trial && typeof s.trial === 'object' && !Array.isArray(s.trial) ? s.trial : {};
    var tOpen = nn(tr.open), tb = {};
    if (tr.best && typeof tr.best === 'object' && !Array.isArray(tr.best)) Object.keys(tr.best).forEach(function (k2) { if (nn(tr.best[k2])) tb[k2] = nn(tr.best[k2]); });
    s.trial = { open: tOpen, pick: Math.min(nn(tr.pick), tOpen), best: tb };
    s.regulars = fixRegulars(s.regulars);                     // 活店（SPEC-H §8）：形狀不對的欄位換回預設
    return s;
  }
  // 今日推薦存獨立鍵 .daily（舊碼整份寫回碰不到；SPEC-B §4.1）。UI.daily；改之前先 loadDaily() 重讀
  var DAILY_KEY = KEY + '.daily', DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
  function loadDaily() {
    var o = null;
    try { var raw = W.localStorage.getItem(DAILY_KEY); if (raw) o = JSON.parse(raw); } catch (_) { o = null; }
    if (!o || typeof o !== 'object' || Array.isArray(o)) return (UI.daily = null);
    var nn = function (x) { return typeof x === 'number' && Math.floor(x) === x && x >= 0 ? x : 0; };
    var c = typeof o.id === 'string' ? card(o.id) : null;
    return (UI.daily = { day: typeof o.day === 'string' && DAY_RE.test(o.day) ? o.day : '', id: c && !c.tier ? o.id : null, took: !!o.took,
      stamps: nn(o.stamps), claimed: nn(o.claimed),
      log: (Array.isArray(o.log) ? o.log : []).filter(function (x) { return x && typeof x === 'object' && typeof x.id === 'string'; }).map(function (x) {
        return { day: typeof x.day === 'string' && DAY_RE.test(x.day) ? x.day : '', id: x.id, k: x.k === 'claim' ? 'claim' : 'take' };
      }).slice(-60) });
  }
  function saveDaily() {
    if (UI.saveReadOnly || UI.noSave || !UI.daily) return;
    try { W.localStorage.setItem(DAILY_KEY, JSON.stringify(UI.daily)); } catch (_) { /* 寫不進去不影響遊戲 */ }
  }
  // 今日推薦集點卡（SPEC-B §4）：序章做完、不唯讀才有；日期只往前（晚 >2 天＝壞值）；改之前先 loadDaily() 重讀
  function dailyOn() { return !!(save && save.prologueDone && !UI.saveReadOnly); }
  function dayNum(k) { var m = DAY_RE.test(k || '') && k.split('-'); return m ? Date.UTC(+m[0], m[1] - 1, +m[2]) / 864e5 : NaN; }
  function dailyTunes() {   // 擁有最常見的兩個頻率（不到 5 張＝[]）
    var n = {}, k = 0;
    ownedIds().forEach(function (id) { var c = card(id); if (!c || c.tier) return; k++; if (c.tune) n[c.tune] = (n[c.tune] | 0) + 1; });
    return k < 5 ? [] : Object.keys(n).sort(function (a, b) { return n[b] - n[a] || (a < b ? -1 : 1); }).slice(0, 2);
  }
  function dailyTick() {
    if (!dailyOn() || !E.dailyPick) return false;
    var day = todayKey(), d = loadDaily() || (UI.daily = { day: '', id: null, took: false, stamps: 1, claimed: 0, log: [] });
    if (dayNum(d.day) - dayNum(day) > 2) d.day = '';
    if (!(day > d.day)) return false;
    try { d.id = E.dailyPick(C, { day: day, known: function (id) { return !!save.shelf[id]; }, owned: ownFn(), want: save.want, tunes: dailyTunes() }); } catch (e) { console.error(e); d.id = null; }
    d.day = day; d.took = false; UI.dailyNew = true; UI.dailyNagged = false;   // 新的一張（含跨午夜沒重新整理）：重新提醒一次
    saveDaily();
    return true;
  }
  function dailyCard() { var d = dailyOn() && UI.daily; return d && d.day === todayKey() && d.id && !d.took ? card(d.id) : null; }   // 今天的、還沒收
  function dropWant(id) { var i = save.want.indexOf(id); if (i < 0) return; save.want.splice(i, 1); if (save.run) save.run.want = save.want.slice(-200); }
  function dailyLog(d, id, k) { d.log.push({ day: todayKey(), id: id, k: k }); d.log = d.log.slice(-60); }
  function dailyTake() {
    var d = dailyOn() && loadDaily();
    if (!d || !d.id || d.took || !card(d.id)) return false;
    shelfOwn(d.id, 'daily'); dropWant(d.id);
    d.took = true; d.stamps++; dailyLog(d, d.id, 'take');
    saveDaily(); persist();
    return true;
  }
  function dailyRewards(d) { try { return E.dailyReward ? E.dailyReward(C, { n: d.claimed, owned: ownFn() }) : []; } catch (e) { console.error(e); return []; } }
  function dailyClaim(id) {
    var d = dailyOn() && loadDaily();
    if (!d || d.stamps < 7 || dailyRewards(d).indexOf(id) < 0) return false;   // 別的分頁剛換過：三張不一樣了
    shelfOwn(id, 'daily'); dropWant(id);
    d.stamps -= 7; d.claimed++; dailyLog(d, id, 'claim');
    saveDaily(); persist();
    return true;
  }
  function persist() {
    if (UI.saveReadOnly || UI.noSave) return;
    syncBring();
    try {
      W.localStorage.setItem(KEY, JSON.stringify(save)); bringSeen = bringKey(save.bring);
      W.localStorage.setItem(BRING_KEY, bringSeen);
    } catch (_) { /* 寫不進去不影響遊戲 */ }
  }
  // 主站帶來的那張（save.bring）跨分頁同步（審查：遊戲 A →「在頻率光譜找它」→ 光譜分頁 →「帶去店裡對決」開出遊戲分頁 C；
  //   C 收下寫進存檔，A 還開著、記憶體裡是舊的。A 一存檔整份寫回去就把它蓋掉）。bringSeen＝這個分頁上次讀到／寫進去的那張；
  //   存檔裡的跟它不一樣＝別的分頁收了新的（或用掉了）→ 改用存檔裡的。只同步 bring，其他欄位照舊（同一份存檔兩個分頁都在玩，後存的贏）
  //   小鍵 .bringKey＝上次 persist 的 bringKey：等於 bringSeen＝沒人動過，不 parse 整份（SPEC-B C6；舊碼分頁不寫它，接受）
  var bringSeen = '', BRING_KEY = KEY + '.bringKey';
  // 帶得進來＝卡在、不是頂點、不是傳奇（主線 M2：帶傳奇讓新手前三位太好打；史詩照帶）
  function bringOk(id) { var c = card(id); return !!c && E.canSeed(C, id) && E.rarity(c) !== 'legendary'; }
  function validBring(b) { return !!(b && typeof b === 'object' && typeof b.id === 'string' && bringOk(b.id)); }
  function bringKey(b) { return b ? b.id + '@' + b.at : ''; }
  function syncBring() {
    if (!save || UI.saveReadOnly || UI.noSave) return;
    var s = null;
    try {
      var bk = W.localStorage.getItem(BRING_KEY);
      if (bk !== null && bk === bringSeen) return;
      var raw = W.localStorage.getItem(KEY); if (!raw) return; s = JSON.parse(raw);
    } catch (_) { return; }
    if (!s || typeof s !== 'object' || s.v !== SAVE_V) return;
    var b = validBring(s.bring) ? { id: s.bring.id, at: s.bring.at } : null;
    if (bringKey(b) === bringSeen) return;               // 沒有別的分頁動過：這個分頁的（可能剛收下、剛用掉）照舊
    save.bring = b; bringSeen = bringKey(b);
  }
  // 唱片櫃：at＝哪一趟第一次認識（seedKey#runNo）；seen＝打開唱片櫃看過了沒（NEW 只標「這一趟新認識、還沒看過」的，ART-17）
  function runTag(r) { r = r || save.run; return r ? r.seedKey + '#' + (r.runNo || 1) : seedKey(); }
  function shelfAdd(id) {
    if (!id || !card(id) || save.shelf[id]) return false;
    save.shelf[id] = { at: runTag(), seen: false };
    return true;
  }
  function isNewOnShelf(id) { var s = save.shelf[id]; return !!(s && !s.seen && s.at === runTag()); }
  // 擁有（從唱片櫃挑牌開局 §1 裁定 4）：src 'gift' 老闆送的（挑過那個王牌，那四張）、'run' 一趟留一張（店內取得：金框）、'boss' 打倒藏家拿到的王牌
  //   'start' 初始流派那張頂點卡（解鎖制，店主 11-16：新玩家第一次挑的那派；舊存檔＝save.lastAce 那派，loadSave 補）。
  //   已經擁有的不改來源。回傳這次是不是剛擁有
  //   'daily' 今日推薦（不是金框）
  //   'lexp' 樂歷升級抽到的（第 D 波 SPEC-D §2.2；不是金框、可當種子）
  //   'enc' 切磋贏來的（活店第二階段 SPEC-H §7.5、§8；唱片櫃模式收下的；不是金框、可當種子）
  var SHELF_SRC = ['gift', 'run', 'boss', 'start', 'daily', 'lexp', 'enc'];
  function shelfOwn(id, src) {
    if (!id || !card(id)) return false;
    shelfAdd(id);
    var e = save.shelf[id];
    if (e.own) return false;
    e.own = true; e.src = SHELF_SRC.indexOf(src) >= 0 ? src : 'gift'; e.ownAt = runTag();
    return true;
  }
  function isOwned(id) { var e = save.shelf[id]; return !!(e && e.own); }
  function isStore(id) { var e = save.shelf[id]; return !!(e && e.own && e.src === 'run'); }     // 店內取得（金框）
  function isLexp(id) { var e = save.shelf[id]; return !!(e && e.own && e.src === 'lexp'); }     // 第 D 波：樂歷升級抽到的
  function isEncSrc(id) { var e = save.shelf[id]; return !!(e && e.own && e.src === 'enc'); }    // 活店：切磋贏來的
  function ownedIds() { return Object.keys(save.shelf).filter(function (id) { return card(id) && isOwned(id); }); }
  // 可以當種子的＝擁有、而且不是頂點卡（頂點卡只展示）
  function seedableIds() { return ownedIds().filter(function (id) { return E.canSeed(C, id); }); }
  // ---- 解鎖制（店主 11-16「流派的頂點卡要透過遊戲蒐集才能解鎖」；scratchpad v5/unlock CONTRACT）：引擎從唱片櫃的「擁有」算（引擎不碰存檔）
  //   sv 沒給＝目前的 save（loadSave 裡還沒設好 save，傳正在讀的那份）
  function ownFn(sv) { sv = sv || save; return function (id) { var e = sv && sv.shelf && sv.shelf[id]; return !!(e && e.own); }; }
  function lastTier(sv) { sv = sv || save; return sv && TIERS.indexOf(sv.lastAce) >= 0 ? sv.lastAce : null; }
  // 已解鎖的派（擁有那派任一張頂點卡＋目前在玩的那派 lastAce）；一派都沒有＝新玩家，第一次挑的那派是初始流派
  function unlockedNow(sv) { return E.unlockedTiers ? E.unlockedTiers(C, ownFn(sv), { start: lastTier(sv) }) : TIERS.slice(); }
  // 擁有的頂點卡（?apex=1 挑王牌只能挑這些）：唱片櫃擁有的＋已解鎖各派預設那張
  function apexOwnedNow(sv) { return E.ownedApex ? E.ownedApex(C, ownFn(sv), { tiers: unlockedNow(sv) }) : []; }
  // newRun／fixUnlock 的解鎖參數：已解鎖的派、初始流派、旗標開時擁有的頂點卡（旗標只看網址，每次載入照現在的旗標同步進 run）
  function unlockArgs(sv, start) { var o = { unlocked: unlockedNow(sv), start: start || lastTier(sv) }; if (UI.apex) o.apexOwned = apexOwnedNow(sv); return o; }
  // 介面棒（scratchpad v5/unlock CONTRACT 第 4 節）：流派名稱的代入值。第 D 波（SPEC-D §3.1）：名字＝經典流／冷門流／異端流（本身就帶軸），多給一字圖示 {icon}（比／借／拆）
  function tierVars(t) { return { title: (C.aceTitle || {})[t] || '', axis: ZH[(C.aceAxis || {})[t]] || '', icon: (C.aceIcon || {})[t] || '' }; }
  // 這一趟能換的（引擎 aceChoices：已解鎖的派；旗標開＝擁有的頂點卡）。沒有解鎖制的舊引擎＝三派都能換
  function choicesOf(r) {
    var ch = r && E.aceChoices ? E.aceChoices(r, C) : null;
    return { tiers: ch && Array.isArray(ch.tiers) && ch.tiers.length ? ch.tiers : TIERS.slice(), apex: ch && Array.isArray(ch.apex) ? ch.apex : null };
  }
  // 點老闆有沒有東西可以換：別的派解鎖了，或（旗標開）同一派收到別張
  function canSwapAny(r) {
    var ch = choicesOf(r);
    if (ch.tiers.length > 1) return true;
    return !!(UI.apex && ch.apex && ch.apex.filter(function (id) { return E.tierOfApex ? E.tierOfApex(C, id) === r.ace : true; }).length > 1);
  }
  // 解鎖進度一行（標題、唱片櫃、樂歷頁）：「流派 1／3・下一派：經典流」；?apex=1 再加「頂點卡 n／45」。新玩家（一派都沒有）＝空字串
  function unlockLine() {
    var un = unlockedNow(); if (!un.length) return '';
    var out = [TU('unlockProg', { n: un.length })];
    var nx = E.nextUnlock ? E.nextUnlock(un) : null;
    if (nx) out.push(TU('unlockNext', tierVars(nx)));
    if (UI.apex && E.apexCards) out.push(TU('apexProg', { n: apexOwnedNow().length, total: E.apexCards(C).length }));
    return out.join('・');
  }

  // ======================================================================= 樂歷（第 D 波棒一；scratchpad v5/wave-d SPEC-D §2、build1/CONTRACT.md）
  //   save.career＝{key, xp, spent, off, prof, tree, drawn, banked, lastGain}；等級、點數由引擎 Career 段算（careerLevel／careerPoints），畫面只寫回 xp／spent／off／prof／drawn。
  //   入口：標題第二行（Lv2 起）、結算頁那一行（明細 modal 裡「看樂歷頁」）、唱片櫃頁頭「樂歷」。過場卡（升級、抽盤、開階）在結算主鈕之後、開機入帳之後
  function CU(k, o) { var U = (C && C.career && C.career.ui) || {}; return fill(U[k] || '', o); }
  function careerOk() { return !!(E && E.careerLevel && E.talentArgs && E.careerGain && C && C.career && save && save.career); }
  function careerLv() { return careerOk() ? E.careerLevel(C, save.career.xp) : { level: 1, into: 0, need: 100, total: 0 }; }
  function careerPts() { return careerOk() ? E.careerPoints(C, save.career) : { level: 1, total: 0, spent: 0, left: 0 }; }
  // 下一趟開局帶進 newRun 的（talentArgs：Lv8 前只有錢類；關樂歷＝{}）
  function careerArgs() { if (!careerOk()) return {}; try { return E.talentArgs(C, save.career) || {}; } catch (e) { console.error(e); return {}; } }
  function seedMaxNow() { return careerArgs().seedMax || E.CFG.seedMax; }
  function ladderName(k) { return ((C.career && C.career.ui && C.career.ui.ladder) || {})[k] || ''; }
  // 細進度條（這一級 into／need）
  function careerBar(lv, cls) {
    var p = lv && lv.need > 0 ? Math.max(0, Math.min(100, Math.round(lv.into * 100 / lv.need))) : 100;
    return '<span class="cx-bar' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><i style="width:' + p + '%"></i></span>';
  }
  // 升級（from → to）：每一級 n（≥2、沒抽過）抽一張盤進唱片櫃（擁有、src 'lexp'；沒得抽就跳過、不補），記進 career.drawn（沒抽到也記，免得重抽）。
  //   回 [{lv, id（抽到的｜null）, lad:[剛好這一級開的階梯 key]}]（過場卡用）
  function careerUps(from, to) {
    var c = save.career, out = [];
    if (!Array.isArray(c.drawn)) c.drawn = [];
    for (var n = Math.max(2, (from | 0) + 1); n <= (to | 0); n++) {
      var id = null;
      if (c.drawn.indexOf(n) < 0) {
        try { id = E.careerDraw(C, c.key, n, ownFn()); } catch (e) { console.error(e); }
        if (!(id && card(id) && shelfOwn(id, 'lexp'))) id = null;
        c.drawn.push(n);
        if (id) { if (!Array.isArray(c.got)) c.got = []; if (c.got.indexOf(id) < 0) c.got.push(id); }   // 退版到 C 版頁面會把 src 'lexp' 洗成 'gift'：loadSave 照這張單補回
      }
      var lad = []; try { lad = (E.ladderAt(C, n) || []).map(function (L) { return L.key; }).filter(ladderName); } catch (_) {}
      out.push({ lv: n, id: id, lad: lad });
    }
    return out;
  }
  // 開機入帳（SPEC-D §2.6；CONTRACT §3.1-2）：C 波 lexpBank 有非 0＝C 版頁面記的（升級前、退版期間）→ 照總額截、熟練度分派、lexpBank 金額鍵歸零（runs 計數照留）。
  //   先寫 career、再清 lexpBank、最後 persist 一次（中途當機＝下次再入）；入過帳的 runs[k] 標 banked（退版期間又記的下次只算沒標的）。吐司＋升級過場在標題畫面
  //   第 I 波 I-0 審查：曲線補級（careerRecurveBoot）在入帳之前跑——用入帳前的 xp 算舊曲線等級（＝drawn 抽到的那級）；入帳之後才算的話，
  //   入帳的 from 是新曲線等級、補級的 from 是入帳後的舊曲線等級，「舊曲線等級＋1…新曲線等級」那幾級兩邊都算進 from、永遠不抽
  function careerBoot() {
    if (!careerOk() || !E.careerDeposit || UI.saveReadOnly) return;
    careerRecurveBoot();
    var d = null; try { d = E.careerDeposit(C, save); } catch (e) { console.error(e); }
    if (!d) return;
    var c = save.career;
    c.xp = d.xp; c.prof = d.prof;
    (d.runs || []).forEach(function (k) { if (save.runs[k] && typeof save.runs[k] === 'object') save.runs[k].banked = 1; });
    ['base'].concat(E.LEXP_ROUTE || ['gig', 'home', 'promo', 'packet', 'demo']).forEach(function (k) { save.lexpBank[k] = 0; });
    UI.careerDeposit = { n: d.total, from: d.from, to: d.to, first: !!d.first };
    c.banked = true;
    UI.careerQ = (UI.careerQ || []).concat(careerUps(d.from, d.to));   // 補級的過場卡（低的那幾級）排在前面
    persist();
  }
  // 曲線改了（第 I 波 I-0；SPEC-I §7.5）：同樣的 xp 在新曲線可能高一級（2,000 從 Lv6 變 Lv7）——跨過、還沒抽過盤的那幾級補抽（careerUps 照 drawn 跳過抽過的），
  //   標題吐司「樂歷算法改了，補你 n 級。」＋過場卡。補完 drawn 就有 → 下次開機 missing 空、不再吐司（不用旗標）。點數由 xp 算、自動多
  function careerRecurveBoot() {
    if (!careerOk() || !E.careerRecurve || UI.saveReadOnly) return;
    var rc = null; try { rc = E.careerRecurve(C, save.career); } catch (e) { console.error(e); }
    if (!rc || !rc.missing || !rc.missing.length) return;
    var ups = careerUps(rc.from, rc.to).filter(function (x) { return rc.missing.indexOf(x.lv) >= 0; });
    UI.careerRecurve = { n: rc.missing.length };
    UI.careerQ = (UI.careerQ || []).concat(ups);
    persist();
  }
  // 一趟結束（recordRun）：這一趟的樂歷直接入帳（SPEC-D §2.1、§2.6-6；不再寫 lexpBank），熟練度記那派（落後 ×2），升級抽盤；明細留在 career.lastGain（at＝這一趟）
  function careerRecord(r, sum, ent, why) {
    var c = save.career, g;
    // 放棄（重新推門）：沒有新手 ×2；站著的那一位還沒打完就不算那一位（棒一審查：放棄刷樂歷）
    var quit = why === 'abandon', open = quit && !(E.posFought && E.posFought(r));
    // 第 I 波 I-0（SPEC-I §7.3 a）：新帳號第一趟（save.runs 還沒有任何一趟；這一趟 push 進去之前判）樂歷保底到 lexp.firstLv（放棄也給：一個帳號只有一次）
    var first = !(save.runs || []).some(function (e) { return e && typeof e === 'object'; });
    try { g = E.careerGain(C, sum, { best: r.farBefore | 0, tier: r.tier | 0, quit: quit, open: open, first: first }); } catch (e) { console.error(e); return; }
    ent.gain = { base: g.base, record: g.record, route: g.route, cut: g.cut, mul: g.mul, total: g.total };
    if (quit) ent.gain.quit = 1;
    if (g.first > 0) ent.gain.first = g.first;
    if (r.tier) ent.tier = r.tier | 0;
    if (r.careerOff) ent.off = 1;
    var lv0 = careerLv().level;
    c.xp = (+c.xp || 0) + g.total;
    var pg = { prof: c.prof, add: 0, lag: false, stamps: 0, levelUps: 0 };
    try { pg = E.profGain(C, c.prof, r.ace, g.total); c.prof = pg.prof; } catch (e) { console.error(e); }
    var lv1 = careerLv().level;
    c.lastGain = Object.assign({ at: runTag(r), ace: r.ace, off: !!r.careerOff, prof: { add: pg.add, lag: !!pg.lag, stamps: pg.stamps | 0, levelUps: pg.levelUps | 0 } }, g);
    var ups = careerUps(lv0, lv1), q = ups.slice();
    if ((pg.levelUps | 0) > 0) q.push({ prof: r.ace, n: E.profLevel(C, c.prof[r.ace]).level });
    if (why === 'abandon') { if (lv1 > lv0) toastAfter(CU('lvUp', { n: lv1 }), 'gold'); return; }   // 放棄（重新推門）：接著就開新的一趟，不演過場卡，吐司說一聲
    UI.careerQ = (UI.careerQ || []).concat(q);
  }
  // 這一趟的明細：剛結束那趟＝career.lastGain；舊的（重新整理、看上一趟結算）照 runSummary 重算（沒有熟練那行）。
  //   C 版頁面打完、記進 lexpBank 的那一趟（runs 裡那筆有 lexp 沒 gain）：開機入帳是一筆總額（照總額截、沒有破紀錄與 ×2），沒有這一趟自己的數字 → null（結算頁不出那一行）
  function gainOf(r) {
    var L = save.career && save.career.lastGain, tag = runTag(r), o = { best: r.farBefore | 0, tier: r.tier | 0 };
    if (L && L.at === tag && typeof L.total === 'number') return L;
    for (var i = save.runs.length - 1; i >= 0; i--) {
      var e = save.runs[i];
      if (e && typeof e === 'object' && e.seedKey + '#' + (e.runNo || 1) === tag) {
        if (!e.gain) return null;
        if (e.gain.quit) { o.quit = true; o.open = !(E.posFought && E.posFought(r)); }   // 放棄的那一趟照 careerRecord 的算法重算（沒有 ×2、沒打完的那位不算）
        if (e.gain.first) o.first = true;                                                  // 第 I 波 I-0：第一趟保底（careerRecord 記的 gain.first）
        break;
      }
    }
    try { return E.careerGain(C, E.runSummary(r), o); } catch (_) { return null; }
  }
  // 結算明細（點「樂歷 +n ›」）：走了幾位・最多連贏（0 不出）・破紀錄・路線（已到上限）・×階級・新手 ×2・熟練蓋章・關樂歷；底下這一級進度＋「看樂歷頁」
  function careerGainSheet(r) {
    var g = gainOf(r); if (!g) return;
    var K = E.careerCfg(C), X = K.lexp, sum = E.runSummary(r), from = sum.from > 1 ? sum.from : 1;
    var fought = typeof g.fought === 'number' ? g.fought : Math.max(0, (sum.reached | 0) - from + 1), bs = sum.bestStreak | 0;
    var parts = [CU('partPos', { k: fought, n: X.pos * fought })];
    if (bs > 0) parts.push(CU('partStreak', { k: bs, n: X.streak * bs }));
    if (g.record) parts.push(CU('partRecord', { n: g.record }));
    if (g.route || g.cut) parts.push(CU('partRoute', { n: g.route }) + (g.cut > 0 ? CU('partCut') : ''));
    if (g.tier) parts.push(CU('partTier', { m: g.tierMul, k: g.tier }));
    if (g.low > 1) parts.push(CU('partLow', { n: X.lowBelow, m: g.low }));
    if (g.first > 0) parts.push(CU('partFirst', { n: X.firstLv }));                       // 第 I 波 I-0：「第一趟：樂歷保底到 Lv2」
    var pr = g.prof && g.prof.stamps > 0 ? CU('partProf', { title: (C.aceTitle || {})[g.ace] || '', n: g.prof.stamps }) : '';
    var lv = careerLv();
    var html = '<div class="cx-gain"><div class="lb-h1">' + esc(CU('gainTitle', { n: g.total })) + '</div>' +
      '<ul class="cx-parts">' + parts.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
      (g.cut > 0 ? '<p class="sub">' + esc(CU('routeCap')) + '</p>' : '') +
      (pr ? '<p class="sub cx-prof">' + esc(pr) + '</p>' : '') + (g.off ? '<p class="sub">' + esc(CU('partOff')) + '</p>' : '') +
      '<div class="cx-lvrow"><b>' + esc(CU('title', { n: lv.level })) + '</b><span class="n">' + esc(CU('bar', { a: lv.into, b: lv.need })) + '</span></div>' + careerBar(lv, 'big') +
      '<button type="button" class="lb-btn wide key cx-topage" data-a="cxpage">' + esc(CU('toPage')) + '</button></div>';
    var m = modal('cxgain', html);
    var b = qs('[data-a=cxpage]', m); if (b) b.addEventListener('click', function (e) { stopEv(e); sfx('tick'); closeModal(); openPage('career'); });
  }
  // 過場卡（SPEC-D §2.8-4）：一次一張、點一下下一張；熟練升級接在最後一張。
  //   第 I 波 I-0（SPEC-I §7.3 d）：一次升兩級以上（第一趟可能 4 級）合成一張清單卡「升到 Lv5！」＋天賦點 +n＋抽到的盤縮圖一列＋「新開：…」（有新開的階梯才出），停住等點。
  //   最後一張有「去點天賦」（有沒點的點數才出）＋「繼續」。回 Promise：'talent'｜'done'
  function careerCards(q) {
    q = (q || []).slice(); UI.careerQ = [];
    var lvs = q.filter(function (x) { return x && x.lv; }), profs = q.filter(function (x) { return x && x.prof; });
    var cards = lvs.length > 1 ? [{ list: lvs.length, lv: lvs[lvs.length - 1].lv, ids: lvs.map(function (x) { return x.id; }).filter(Boolean),
      lad: [].concat.apply([], lvs.map(function (x) { return x.lad || []; })) }] : lvs.slice();
    if (profs.length && !cards.length) cards.push({ profOnly: true });
    if (!cards.length) return Promise.resolve('done');
    return new Promise(function (res) {
      var i = 0, s = null;
      function profHTML() { return profs.map(function (x) { return '<p class="cx-open prof">' + esc(CU('profUp', { title: (C.aceTitle || {})[x.prof] || '', n: x.n })) + '</p>'; }).join(''); }
      function draw() {
        var k = cards[i], last = i === cards.length - 1, P = careerPts();
        var ids = k.list ? k.ids : (k.id ? [k.id] : []), many = ids.length > 1;
        var h = '<div class="cx-card' + (k.list ? ' list' : '') + '" data-a="next">' +
          (k.profOnly ? '' : '<div class="cx-hd"><b>' + esc(k.list ? CU('lvList', { n: k.lv }) : CU('lvUp', { n: k.lv })) + '</b>' + (k.list ? '<span class="sub">' + esc(CU('lvPts', { n: k.list })) + '</span>' : '') + '</div>') +
          (ids.length ? '<div class="cx-got' + (many ? ' many' : '') + '"><span class="cvs">' + ids.slice(0, 6).map(function (id) { return coverHTML(card(id), { info: false, badge: false }); }).join('') + '</span>' +
            '<span class="tx"><b>' + esc(many ? CU('drawGotN', { n: ids.length }) : CU('drawGot')) + '</b>' + (!many && card(ids[0]) ? '<small>' + esc(card(ids[0]).artist + '《' + card(ids[0]).album + '》') + '</small>' : '') + '</span></div>' : '') +
          (k.list ? (k.lad.length ? '<p class="cx-open">' + esc(CU('lvNew', { list: k.lad.map(ladderName).filter(Boolean).join('、') })) + '</p>' : '')
            : (k.lad || []).map(function (key) { return '<p class="cx-open">' + esc(CU('ladderOpen', { name: ladderName(key) })) + '</p>'; }).join('')) +
          (last ? profHTML() : '') +
          '<div class="foot' + (last && P.left > 0 ? ' two' : '') + '">' + (last && P.left > 0 ? '<button type="button" class="lb-btn key" data-a="talent">' + esc(CU('goTalent')) + '</button>' : '') +
          '<button type="button" class="lb-btn pri key" data-a="next">' + esc(CU('cardNext')) + '</button></div>' +
          (cards.length > 1 ? '<span class="cx-n" aria-hidden="true">' + (i + 1) + '／' + cards.length + '</span>' : '') + '</div>';
        if (s && s.isConnected) { s.innerHTML = h; focusFirst(s); } else { s = floatSheet(h, 'cxcard'); s.addEventListener('click', onClick); }
        sfx(i ? 'tick' : 'win');
        autoAct(function () { var b = qs('[data-a=next].lb-btn', s); if (b) b.click(); }, 400);
      }
      function close(v) { if (s) { s.remove(); syncFloat(); } res(v); }
      function onClick(e) {
        var a = e.target.closest && e.target.closest('[data-a]'); if (!a) return;
        var act = a.getAttribute('data-a');
        if (act === 'talent') { sfx('tick'); close('talent'); return; }
        if (act !== 'next') return;
        if (i < cards.length - 1) { i++; draw(); } else close('done');
      }
      draw();
    });
  }
  // 一趟裡就看得到樂歷（第 I 波 I-0；SPEC-I §7.3 b、CONTRACT §4）：攤位面板標題列底下一條細條「樂歷 這一趟 至少 +n」＋這一趟結束會到的等級與進度條（I-3a 起搬到市集頂列）。
  //   n＝engine careerLive（不乘新手 ×2、沒有第一趟保底、還沒打的這一位不算＝現在放棄也拿得到；攤位之間只會越來越多）；只顯示，入帳照舊在一趟結束（recordRun）。
  //   跨過一級的那一刻（算出的等級比上次畫的大）：細條金色閃、寫「Lv n！這一趟結束就能點天賦」，停 ≥3 秒、之後點一下收回原本那行；不另跳老闆泡泡。
  //   上次畫的等級記在記憶體（UI.liveLv[runTag]；這一趟在這一頁開的＝開局等級）：重新整理後第一次只畫、不閃
  var LIVE_HOLD = 3000;
  function careerLiveOf(r) {
    if (!r || !careerOk() || !E.careerLive || inPrologue(r) || !CU('live')) return null;
    var L = null; try { L = E.careerLive(C, r, { best: r.farBefore | 0, tier: r.tier | 0, xp: save.career.xp }); } catch (e) { console.error(e); return null; }
    if (!L || !(L.n > 0)) return null;
    var mem = UI.liveLv || (UI.liveLv = {}), tag = runTag(r), prev = mem[tag], up = typeof prev === 'number' && L.level > prev;
    mem[tag] = Math.max(L.level, typeof prev === 'number' ? prev : 0);
    var p = L.need > 0 ? Math.max(0, Math.min(100, Math.round(L.into * 100 / L.need))) : 100;
    var norm = CU('live', { n: L.n }), upTx = CU('liveUp', { n: L.level });
    var html = '<div class="cx-live' + (up ? ' up' : '') + '" data-a="cxlive" role="status" data-lv="' + L.level + '" data-n="' + L.n + '">' +
      '<span class="t">' + esc(up ? upTx : norm) + '</span><span class="lv">' + esc(CU('liveLv', { n: L.level })) + '</span>' +
      '<span class="cx-bar sm" aria-hidden="true"><i style="width:' + p + '%"></i></span></div>';
    return { html: html, up: up, live: L, norm: norm };
  }
  function careerLiveBind(node, o) {
    if (!node || !o.up) return;
    var t0 = now();
    sfx('ding');
    node.addEventListener('click', function (e) {
      stopEv(e);
      if (!node.classList.contains('up') || now() - t0 < LIVE_HOLD / (FAST ? 4 : 1)) return;   // 停 ≥3 秒（?fast=1 照速度縮）才收
      node.classList.remove('up'); var t = qs('.t', node); if (t) t.textContent = o.norm;
    });
  }
  // 標題第二行（SPEC-D §2.8-3；Lv2 起）：「樂歷 Lv 7・下一個：Lv8 戰力天賦 ›」（矮螢幕＝「樂歷 Lv 7 ›」；整行可點＝開樂歷頁）；有沒點的點數＝Lv 後面小圓點
  function careerLineHTML() {
    if (!careerOk() || firstEver()) return '';
    var lv = careerLv(); if (lv.level < 2) return '';
    var nx = null; try { nx = E.ladderNext(C, lv.level); } catch (_) {}
    var dot = careerPts().left > 0 ? '<i class="cx-dot" aria-hidden="true"></i>' : '';
    var mark = function (t) { return esc(t).replace('\u0001', lv.level + dot); };
    var full = nx && ladderName(nx.key) ? CU('line', { n: '\u0001', m: nx.lv, name: ladderName(nx.key) }) : CU('lineAll', { n: '\u0001' });
    return '<p class="lb-foot cxline"><button type="button" class="key" data-a="career" aria-label="' + esc(full.replace('\u0001', lv.level)) + '">' +
      '<span class="full">' + mark(full) + '</span><span class="short">' + mark(CU('lineShort', { n: '\u0001' })) + '</span></button></p>';
  }
  // 樂歷頁（openPage('career')；SPEC-D §2.8-2）：頭（Lv、進度條、天賦點）→ 天賦表（一類一組，＋／－ 44×44）→ 全部重配 → 關掉樂歷（Lv10+）→ 解鎖階梯 → 流派與攤位 → 熟練度
  function renderCareer(pg) {
    var sc0 = qs('.lb-scroll', pg), keepTop = sc0 ? sc0.scrollTop : 0;
    pg.innerHTML = '';
    var c = save.career, K = E.careerCfg(C), U = (C.career && C.career.ui) || {}, lv = careerLv(), P = careerPts();
    var bar = el('div', 'lb-top page', '<div class="tt">' + esc(CU('page')) + '</div><button type="button" class="lnk" data-a="close">關閉</button>');
    pg.appendChild(bar);
    qs('[data-a=close]', bar).addEventListener('click', function (e) { stopEv(e); closePage(); });
    var nm = function (id) { return (U.names || {})[id] || id; };
    var powerOpen = K.talents.filter(function (T) { return T && T.cat === 'power'; }).reduce(function (m, T) { return Math.min(m, T.open | 0); }, 99);
    function row(T) {
      var k = (c.spent || {})[T.id] | 0, open = !T.soon && lv.level >= (T.open | 0), maxed = T.max > 0 && k >= T.max;
      var cost = maxed ? 0 : E.talentCost(C, T.id, k + 1);
      var fx = fill((U.fx || {})[T.id] || '', { n: T.id === 'money' ? E.moneyText(K.talentFx.money) : '' });
      var state = T.soon ? CU('soon') : !open ? CU('lock', { n: T.open }) : maxed ? CU('maxed') : CU('cost', { n: cost });
      var canBuy = open && !maxed && P.left >= cost, canSell = k > 0;
      return '<div class="cx-row' + (T.soon ? ' soon' : !open ? ' lock' : '') + '" data-id="' + esc(T.id) + '"><div class="tx">' +
        '<div class="nm"><b>' + esc(nm(T.id)) + '</b>' + (open || k ? '<span class="now">' + esc(CU('now', { n: k })) + '</span>' : '') + '</div>' +
        '<div class="fx">' + esc(fx) + (T.cat === 'money' && !T.soon ? '<span class="mo">' + esc(CU('moneyOnly')) + '</span>' : '') + '</div>' +
        '<div class="st">' + (!open && !T.soon ? lockIcon(10) : '') + esc(state) + '</div></div>' +
        (T.soon ? '' : '<div class="pm"><button type="button" class="lb-btn key" data-sell="' + esc(T.id) + '" aria-label="' + esc(nm(T.id) + ' ' + CU('sell')) + '"' + (canSell ? '' : ' disabled') + '>－</button>' +
          '<button type="button" class="lb-btn key" data-buy="' + esc(T.id) + '" aria-label="' + esc(nm(T.id) + ' ' + CU('buy')) + '"' + (canBuy ? '' : ' disabled') + '>＋</button></div>') + '</div>';
    }
    var groups = (U.groups || []).map(function (G) {
      var rows = K.talents.filter(function (T) { return T && (G.cats || []).indexOf(T.cat) >= 0; }).map(row).join('');
      if (G.key === 'safe') rows += '<div class="cx-row auto"><div class="tx"><div class="nm"><b>' + esc(nm('safety')) + '</b><span class="now">' + esc(CU('auto')) + '</span></div><div class="fx">' + esc((U.fx || {}).safety || '') + '</div></div></div>';
      return rows ? '<section class="cx-grp"><div class="lb-h2">' + esc(G.name) + '</div>' + rows + '</section>' : '';
    }).join('');
    // 解鎖階梯：已開的打勾、下一個亮、之後的灰。第 I 波 I-0（SPEC-I §7.3 d、CRITIQUE 9-2）：只畫做好的格——soon（「之後開放」、還沒有等級的）不畫
    var nx = E.ladderNext(C, lv.level), lad = E.ladderList(C, lv.level).filter(function (L) { return ladderName(L.key) && !L.soon && L.lv > 0; }).map(function (L) {
      var cls = L.open ? 'on' : (nx && L.lv === nx.lv) ? 'next' : 'off';
      return '<li class="' + cls + (L.soon ? ' soon' : '') + '"><span class="ck" aria-hidden="true">' + (L.open ? '✓' : '') + '</span><span class="t">' +
        esc(L.soon ? ladderName(L.key) : CU('ladderRow', { n: L.lv, name: ladderName(L.key) })) + '</span>' + (L.soon ? '<span class="s">' + esc(CU('soon')) + '</span>' : '') + '</li>';
    }).join('');
    var un = unlockedNow(), unl = unlockLine(), stl = ladderLine();
    var prof = un.map(function (t) {
      var p = E.profLevel(C, (c.prof || {})[t]);
      return '<li><b>' + esc((C.aceTitle || {})[t] || '') + '</b><span>' + esc(CU('prof', { n: p.level, s: p.stamps, per: p.per })) + '</span></li>';
    }).join('');
    var offRow = lv.level >= (K.offFrom | 0) ? '<button type="button" class="cx-off key" data-a="off" aria-pressed="' + (c.off ? 'true' : 'false') + '"><span class="tx"><b>' + esc(CU('off')) + '</b><small>' + esc(CU('offSub')) + '</small></span>' +
      '<span class="sw' + (c.off ? ' on' : '') + '">' + esc(CU(c.off ? 'offSwOn' : 'offSw')) + '</span></button>' : '';   // 狀態字「照用／關掉」（不用 swHTML 的開／關：雙重否定）
    var last = c.lastGain && typeof c.lastGain.total === 'number' ? CU('lastLine', { n: c.lastGain.total }) : '';
    var body = el('div', 'lb-scroll');
    body.innerHTML = '<div class="lb-pad cx-page">' +
      '<div class="cx-head"><b class="lv">' + esc(CU('title', { n: lv.level })) + '</b><span class="pts' + (P.left > 0 ? ' has' : '') + '">' + esc(CU('points', { n: Math.max(0, P.left) })) + '</span></div>' +
      careerBar(lv, 'big') + '<p class="sub cx-nx"><span>' + esc(CU('bar', { a: lv.into, b: lv.need })) + '</span><span>' + esc(CU('nextLv', { n: Math.max(0, lv.need - lv.into) })) + '</span></p>' +
      (lv.level < powerOpen ? '<p class="note cx-later">' + esc(CU('powerLater', { n: powerOpen })) + '</p>' : '') +
      (last ? '<p class="sub cx-last">' + esc(last) + '</p>' : '') + '<p class="sub cx-nr">' + esc(CU('nextRun')) + '</p>' +
      groups +
      '<div class="cx-respec"><button type="button" class="lb-btn wide key" data-a="respec"' + ((P.spent | 0) > 0 ? '' : ' disabled') + '>' + esc(CU('respec')) + '</button></div>' +
      offRow +
      '<section class="cx-grp"><div class="lb-h2">' + esc(CU('ladderTitle')) + '</div><ul class="cx-ladder">' + lad + '</ul><p class="sub">' + esc(CU('drawRow')) + '</p></section>' +
      (unl || stl ? '<section class="cx-grp"><div class="lb-h2">' + esc(CU('unlockTitle')) + '</div>' + (unl ? '<p class="sub lb-unl">' + lockIcon(10, true) + esc(unl) + '</p>' : '') + (stl ? '<p class="sub cx-stl">' + esc(stl) + '</p>' : '') + '</section>' : '') +
      (prof ? '<section class="cx-grp"><div class="lb-h2">' + esc(CU('profTitle')) + '</div><ul class="cx-prof">' + prof + '</ul></section>' : '') +
      '</div>';
    pg.appendChild(body);
    if (keepTop) body.scrollTop = keepTop;
    body.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-buy],[data-sell],[data-a]'); if (!b || b.disabled) return;
      var res = null;
      if (b.hasAttribute('data-buy')) {
        res = E.talentBuy(C, save.career, b.getAttribute('data-buy'));
        if (!res.ok) { sfx('tick'); toast(res.error === 'points' ? CU('noPoints') : res.error === 'max' ? CU('maxed') : CU('lock', { n: (E.talentDef(C, b.getAttribute('data-buy')) || {}).open || '' })); return; }
        sfx('select');
      } else if (b.hasAttribute('data-sell')) {
        res = E.talentSell(C, save.career, b.getAttribute('data-sell')); if (!res.ok) return; sfx('tick');
      } else {
        var act = b.getAttribute('data-a');
        if (act === 'respec') { res = E.careerRespec(C, save.career); sfx('tick'); toast(CU('respecDone')); }
        else if (act === 'off') { save.career.off = !save.career.off; sfx('tick'); persist(); renderCareer(pg); return; }
        else return;
      }
      save.career = res.career; persist(); renderCareer(pg);
    });
  }

  // ======================================================================= 像素小人、配件圖示
  // LAB_SPR＝roguelike.html 的 SPR 整段（依賴 dip-character.js 的 sprRows；不宣告它的同名全域）
  var LAB_SPR = null;
  function labSpr() {
    if (LAB_SPR) return LAB_SPR;
    if (typeof W.sprRows !== 'function') return {};
    var sr = W.sprRows;
    LAB_SPR = {
      e0: sr(['.....gggggg.....', '.....kkkkkk.....', '....kkkkkkkk....', '...gksssssskg...', '...gssksskssg...', '....ssssssss....', '.....ssssss.....'], 'w', 'b'),
      e1: sr(['................', '.....nnnnnn.....', '....nnnnnnnn....', '....nssssssn....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'], 'e', 'k', { 7: '....rrrrrrrr....' }),
      e2: sr(['................', '.....bbbbbb.....', '....bbbbbbbbbb..', '....kssssssk....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'], 'w', 'k'),
      e3: sr(['................', '......pppp......', '....pppppppp....', '....kssssssk....', '....ekkeekke....', '....ssssssss....', '.....ssssss.....'], 'e', 'k'),
      e4: sr(['................', '................', '.....ssssss.....', '....ssssssss....', '....ssksskss....', '....sdssssds....', '.....dddddd.....'], 'w', 'd', { 8: '...wggggggggw...', 9: '...sggggggggs...', 10: '...sggggggggs...', 11: '....gggggggg....' }),
      e5: sr(['................', '.....kkkkkk.....', '....kkkkkkkk....', '...kksssssskk...', '...kksksskskk...', '...kssssssssk...', '.....ssssss.....'], 'k', 'k'),
      e6: sr(['................', '.....oooooo.....', '.....oooooo.....', '...oooooooooo...', '....ssksskss....', '....ssssssss....', '.....ssssss.....'], 'p', 'k'),
      e7: sr(['....y.y..y.y....', '....yyyyyyyy....', '....kkkkkkkk....', '....kssssssk....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'], 'p', 'p'),
      boss: sr(['.....kkkkkk.....', '.....kkkkkk.....', '.....kkkkkk.....', '...kkkkkkkkkk...', '....ssssssss....', '....sskssyys....', '.....ssssss.....'], 'k', 'k', { 7: '....kkwrrwkk....', 8: '...kkkwrrwkkk...' })
    };
    LAB_SPR.owner = sr(['................', '.....dddddd.....', '....dddddddd....', '....dssssssd....', '....ekkeekke....', '....sdssssds....', '.....dddddd.....'], 'w', 'd', { 8: '...wnnnnnnnnw...', 9: '...snnnnnnnns...', 10: '...snnnnnnnns...', 11: '....nnnnnnnn....' });
    return LAB_SPR;
  }
  // 發燒配件圖示（roguelike.html PIX_ICONS_LV[icon][0]；v3 的六件＋v4 櫃檯的三件屬性加成：重量盤／絕版編號標／內圈刻字）
  var LAB_ICONS = {
    stylus: ['............', '.........kk.', '........kk..', '.......kk...', '......kk....', '.....kk.....', '....kk......', '...kk.......', '..kk........', '.kkk........', '.kkd........', '............'],
    dustcover: ['............', '..dddddddd..', '.d........d.', '.d.kkkkkk.d.', '.d.k....k.d.', '.d.kkkkkk.d.', '.d........d.', '.dddddddddd.', '.kkkkkkkkkk.', '............', '............', '............'],
    testpress: ['............', '...kkkkkk...', '..kkkkkkkk..', '.kkkwwwwkkk.', '.kkwwwwwwkk.', '.kkwwwwwwkk.', '.kkwwwwwwkk.', '.kkwwwwwwkk.', '.kkwwwwwwkk.', '.kkkwwwwkkk.', '..kkkkkkkk..', '...kkkkkk...'],
    cleaner: ['....kkk.....', '...kkkkk....', '...kk.......', '...kkkk.....', '...kwwk.....', '..kwwwwk....', '..kwwwwk....', '..kwwwwk....', '..kwbbwk....', '..kwbbwk....', '..kkkkkk....', '............'],
    obi: ['....kkkk....', '....kwwk....', '....kwwk....', '....kwwk....', '....kkwk....', '....kwwk....', '....kwkk....', '....kwwk....', '....kkwk....', '....kwwk....', '....kkkk....', '............'],
    headphone: ['............', '....kkkk....', '...kk..kk...', '..kk....kk..', '..k......k..', '..k......k..', '.kkk....kkk.', '.kkk....kkk.', '.kkk....kkk.', '.kkk....kkk.', '............', '............'],
    heavy180: ['............', '...kkkkkk...', '..kkkkkkkk..', '.kkkkkkkkkk.', '.kkkkddkkkk.', '.kkkd..dkkk.', '.kkkd..dkkk.', '.kkkkddkkkk.', '.kkkkkkkkkk.', '..kkkkkkkk..', '...kkkkkk...', '............'],
    numbered: ['............', '.kkkkkkkkk..', '.kwwwwwwwk..', '.kwkwwkwwk..', '.kwwwwwwwk..', '.kwwkwkwwk..', '.kwwwwwwwk..', '.kkkkkkkkk..', '....kk......', '....kk......', '............', '............'],
    // 流派解鎖（店主 11-16）：鎖住的派／沒收到的頂點卡（鎖頭），打倒藏家解鎖那一下（打開的鎖）
    lock: ['............', '....kkkk....', '...kk..kk...', '...k....k...', '...k....k...', '..kkkkkkkk..', '..kyyyyyyk..', '..kyykkyyk..', '..kyykkyyk..', '..kyyyyyyk..', '..kkkkkkkk..', '............'],
    unlock: ['.....kkkk...', '....kk..kk..', '....k....k..', '....k.......', '....k.......', '..kkkkkkkk..', '..kyyyyyyk..', '..kyykkyyk..', '..kyykkyyk..', '..kyyyyyyk..', '..kkkkkkkk..', '............'],
    sleeve: ['............', '.kkkkkkkkk..', '.kwwwwwwwkk.', '.kw.kkk.wkk.', '.kwk...kwkk.', '.kwk...kwkk.', '.kw.kkk.wkk.', '.kwwwwwwwkk.', '.kkkkkkkkkk.', '..kkkkkkkk..', '............', '............'],   // 第 I 波 I-2 唱片袋側袋（替補格）
    matrix: ['............', '...kkkkkk...', '..kkkkkkkk..', '.kkkkkkkkkk.', '.kw.....wkk.', '.kkkddddkkk.', '.kkkd..dkkk.', '.kkkddddkkk.', '.kkkkkkkkkk.', '..kkkkkkkk..', '...kkkkkk...', '............']
  };
  function pix(rows, size, cls) { return (typeof W.pixArtHTML === 'function' && rows) ? W.pixArtHTML(rows, size, cls) : ''; }
  function relicOf(id) { return (C && C.relics && C.relics[id]) || null; }
  function lockIcon(size, open) { return pix(LAB_ICONS[open ? 'unlock' : 'lock'], size || 14, 'lk') || '<span class="lk-tx" aria-hidden="true">' + (open ? '開' : '鎖') + '</span>'; }
  function relicIcon(id, size) {
    var r = relicOf(id); var rows = r && LAB_ICONS[r.icon];
    var h = rows ? pix(rows, size || 24) : '';
    return h || '<span class="lb-ri">' + esc((r && r.name || '?').slice(0, 1)) + '</span>';
  }
  function sprRowsOf(key) {
    if (key && typeof key === 'object') return (typeof W.avatarRows === 'function') ? W.avatarRows(key) : null;
    var S = labSpr(); return S[key] || S.e0;
  }
  // 捏角色存的是 DipLabChars v2 spec（沒有 head 欄位）：HTML 頭像交給 DipLabChars.svg
  function v2svg(key, size, crop) { var CH = W.DipLabChars; if (!(key && typeof key === 'object' && !Array.isArray(key) && !('head' in key) && CH && CH.svg)) return null; try { return CH.svg(key, size, { crop: crop }); } catch (e) { console.error(e); return null; } }
  function sprHTML(key, size) { var v = v2svg(key, size || 96, 'full'); if (v) return v; var rows = sprRowsOf(key); return rows ? pix(rows, size || 96) : ''; }
  function headHTML(key, size) { var v = v2svg(key, size || 30, 'bust'); if (v) return v; var rows = sprRowsOf(key); return rows ? pix(rows.slice(0, 10), size || 30) : ''; }   // 頭＋肩
  function enemySpr(en) { return en ? (en.avatar || en.spr || 'e0') : 'e0'; }
  function playerAv() { return (save.player && save.player.avatar) || (C.avatarsFallback && C.avatarsFallback[0]) || { head: 'neat' }; }
  function ensurePlayer() {
    if (save.player && save.player.avatar) return;
    var me = null; try { me = W.DipChar && W.DipChar.load(); } catch (_) {}
    save.player = { name: '你', avatar: me && me.avatar ? me.avatar : pickR(C.avatarsFallback || [{ head: 'neat' }]) };
  }

  // ======================================================================= 常駐舞台（DipLabStage）
  // 舞台還沒好（或載入失敗）時，所有呼叫都是空操作：遊戲照樣能玩
  function stg(m) {
    var s = UI.stage; if (!s || typeof s[m] !== 'function') return null;
    var a = Array.prototype.slice.call(arguments, 1);
    try { return s[m].apply(s, a); } catch (e) { console.error(e); return null; }
  }
  function stgP() { var r = stg.apply(null, arguments); return (r && typeof r.then === 'function') ? r.then(null, function (e) { console.error(e); }) : Promise.resolve(r); }
  // 鏡頭：name＝full|reward|strip；screen＝矮螢幕規則；panelMin＝面板至少要多高（量出來的，B-title-375-clipped）
  // 面板內容本身要多高（不算被撐開的空白）：暫時讓它長成內容的高度量一次
  function naturalH(node) {
    var st = node.style, keep = [st.bottom, st.flex, st.height, st.maxHeight];
    st.bottom = 'auto'; st.flex = 'none'; st.height = 'auto'; st.maxHeight = 'none';
    var h = node.offsetHeight;
    st.bottom = keep[0]; st.flex = keep[1]; st.height = keep[2]; st.maxHeight = keep[3];
    return h;
  }
  function cam(name, screen, ms, panelMin, growPanel) {
    UI.camName = name; UI.camSheet = false;
    if (ms == null) ms = UI.camQuick ? 0 : 450;
    var o = { ms: Math.round(ms / speed()), screen: screen };
    if (panelMin != null) o.panelMin = panelMin;
    if (growPanel != null) o.growPanel = growPanel;
    return stgP('camera', name, o).then(function (r) { floorSoon(); return r; });   // 鏡頭停下來才看得到店的最下面：地板照停下來的樣子再量一次（V5 F4）
  }
  // 矮螢幕的鏡頭從牆頂往下裁（anchor bottom）：店裡看得到的人頭頂被裁掉時，鏡頭往上移到頭頂留 4 格（高度、倍率不變）
  function keepHeads(ms, pad) {
    pad = pad == null ? 4 : pad;      // 頭上有表情圖示（O19 憤怒）時多留一個圖示高（V07：375×548 圖示上半截被裁）
    var sh = UI.stage && UI.stage.shop; if (!sh || typeof sh.view !== 'function' || typeof sh.headY !== 'function') return;
    var v = sh.view(), top = Infinity;
    ['p', 'o', 'f'].forEach(function (id) { var a = stg('pos', id); if (a && !a.hidden && !a.outside && stg('has', id)) top = Math.min(top, sh.headY(id)); });
    if (!isFinite(top) || top - pad >= v.y) return;
    var to = { y: Math.max(0, Math.floor(top - pad)), h: v.h };
    try { if (ms > 0 && typeof sh.tweenView === 'function') sh.tweenView(to, Math.round(ms / speed())); else sh.setView(to); } catch (e) { console.error(e); }
  }
  function anchorOf(id) { return stg('anchor', id); }
  // 老闆講話：記下他那句什麼時候收（UI.oSayTill；泡泡照速度縮）——客人走到對戰台（arriveTable）碰到老闆還在講，等他講完才說開場那句（合併審查 11-16）
  function stageSay(id, text, tone, ms) {
    if (!text) return;
    ms = ms == null ? 2600 : ms;
    stg('say', id, text, { tone: tone || (id === 'o' ? 'owner' : null), ms: ms });
    if (id === 'o') UI.oSayTill = ms ? Date.now() + ms / speed() : 0;
  }
  // 一句話要停多久（＝duel.js readMs：1.4 秒＋每字 0.14 秒，最多 6.5 秒）
  function sayMs(t) { return Math.min(6500, 1400 + 140 * String(t || '').length); }
  function place(id, spot, spr) {
    if (spr === 'player') spr = playerAv();
    stg('put', id, spot, spr); stg('hide', id, false); stg('sil', id, false);
  }
  function hideActor(id) { if (UI.stage && stg('has', id)) stg('hide', id, true); }
  function resetPoses() { ['p', 'f', 'o'].forEach(function (id) { stg('pose', id, null); stg('emote', id, null); stg('say', id, null); }); stg('untag'); UI.oSayTill = 0; }

  // ======================================================================= 封面、三軸、卡片
  function coverSrc(c) { return c ? (c.localCover || c.coverUrl || '') : ''; }
  // 封面失敗 onerror＝DipCoverErr（econ.js 定義；1.5 秒後重試一次，再失敗才移除；SPEC-B C7）
  function rarityCls(c) {
    if (!c) return '';
    if (c.tier) return 'ace ' + c.tier;
    if (c.gold) return 'r-gold';
    var s = (c.c || 0) + (c.h || 0) + ((c.o || 0) >= 5 ? 1 : 0);
    return s >= 9 ? 'r-legendary' : s >= 8 ? 'r-epic' : s >= 7 ? 'r-uncommon' : s >= 6 ? 'r-rare' : 'r-common';
  }
  // 封面：點一下＝唱片資訊（data-info）。img 一律 draggable=false
  function coverHTML(c, o) {
    o = o || {};
    if (!c) return '<span class="lb-cv empty"></span>';
    var st = o.size ? ' style="width:' + o.size + 'px;height:' + o.size + 'px"' : '';
    var badge = '';
    if (c.tier && o.badge !== false) badge = '<span class="badge ' + c.tier + '">' + esc((C.apexTierName || C.aceTitle || {})[c.tier] || '') + '</span>';   // 頂點卡等級名（殿堂／流亡／異端；第 D 波流派名改成經典流…之後不再借 aceTitle）
    else if (c.gold && o.badge !== false) badge = '<span class="badge gold">私藏</span>';
    // COPY-16：跟唱片櫃「這一趟新認識」同一個詞；NEW 留給新進那一箱。o.newText：打倒藏家收到新的頂點卡＝「新收藏」（解鎖制，C.trial.ui.newOwn）
    if (o.isNew) badge += '<span class="badge new">' + esc(o.newText || '新認識') + '</span>';
    // 店內取得（一趟留一張收進唱片櫃的；店主 11-13 §0）：金框＋底下「店內取得」
    if (o.store) badge += '<span class="badge store">' + esc(SU('storeTag')) + '</span>';
    else if (o.lexp) badge += '<span class="badge lexp">' + esc((C.career && C.career.ui && C.career.ui.srcLexp) || '') + '</span>';   // 第 D 波：樂歷升級抽到的（唱片櫃、挑種子）
    else if (o.enc) badge += '<span class="badge enc">' + esc((C.crowdUi && C.crowdUi.encSrc) || '') + '</span>';   // 活店：切磋贏來的（唱片櫃、挑種子）
    if (o.brought) badge += '<span class="badge bring">' + esc(SU('pickBrought')) + '</span>';   // 主站「帶去店裡對決」帶來的（挑種子面板第一張）
    var src = coverSrc(c);
    return '<span class="lb-cv ' + (o.frame === false ? '' : rarityCls(c)) + (o.store ? ' store' : '') + (o.sel ? ' sel' : '') + '"' + st + (o.info === false ? '' : ' data-info="1" data-cid="' + esc(c.id) + '"') +
      ' role="img" aria-label="' + esc(c.artist + '《' + c.album + '》') + '"><span class="alt" aria-hidden="true">' + esc(c.album) + '</span>' +
      (src ? '<img alt="" src="' + esc(src) + '" loading="lazy" draggable="false" onerror="DipCoverErr(this)">' : '') + badge + '</span>';
  }
  function starsHTML(c, o) {
    o = o || {};
    if (!c) return '';
    return '<span class="stars' + (o.cls ? ' ' + o.cls : '') + '">' + ATTRS.map(function (a) {
      return '<b class="' + a + (o.mark === a ? ' mk' : '') + '"><i>' + ZH1[a] + '</i>' + (c[a] || 0) + '</b>';
    }).join('') + '</span>';
  }
  function tileHTML(c, o) {
    o = o || {};
    if (!c) return '';
    var cls = 'lb-ct' + (o.sel ? ' sel' : '') + (o.cls ? ' ' + o.cls : '');
    return '<div class="' + cls + '" data-cid="' + esc(c.id) + '"' + (o.data ? ' ' + o.data : '') + '>' + coverHTML(c, o) +
      (o.text === false ? '' : '<div class="ar">' + esc(c.artist) + '</div><div class="al">' + esc(c.album) + '</div>') +
      (o.stars === false ? '' : starsHTML(c)) + (o.extra || '') +
      (o.pick ? '<button type="button" class="lb-pickb key" data-pick="' + esc(c.id) + '"' + (o.disabled ? ' disabled' : '') + '>' + esc(o.pick) + '</button>' : '') + '</div>';
  }
  function info(c, o) {
    var ci = CI(); if (!c || !ci) return Promise.resolve();
    if (typeof c === 'string') c = card(c);
    return ci.open(c, o || {});
  }
  // 封面點一下＝唱片資訊（capture：先於面板自己的「選」處理）
  function bindInfoTaps(root) {
    if (!root || root._infoBound) return; root._infoBound = true;
    root.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-info][data-cid]');
      if (!t || !root.contains(t)) return;
      e.stopPropagation(); e.preventDefault();
      if (t.closest('.arming')) return;
      sfx('tick');
      info(t.getAttribute('data-cid'), { from: UI.screen });
    }, true);
    root.addEventListener('contextmenu', function (e) { if (e.target.closest && e.target.closest('.lb-cv,[data-cid]')) e.preventDefault(); });
  }

  // ======================================================================= 頂欄（32px）、彈窗
  // 換畫面後 380 ms 內的頂欄點擊不算（B-topbar-doubletap-pingpong：台北 ×2 進去又出來）
  function topTapOk(e) { return !(e && e.isTrusted && now() - (UI.screenAt || 0) < 380); }
  // 只換頂欄左邊那段字（鈕不動）：中繼點開局 createRun 之後，選秀中頂欄就寫「這一趟從第 N 位開始」（場景是 save.run 還是 null 時畫的）
  function topLabel() { var tt = UI.top && qs('.tt', UI.top); if (tt) tt.innerHTML = posLabel(save.run); }
  function setTop(left, o) {
    o = o || {};
    var bar = UI.top; bar.innerHTML = '';
    bar.appendChild(el('div', 'tt', left));
    if (o.chips) o.chips.forEach(function (c) { bar.insertAdjacentHTML('beforeend', c); });
    if (o.links) o.links.forEach(function (l) {
      var b = el('button', 'lnk', esc(l[0])); b.type = 'button'; b.setAttribute('data-a', l[2] || '');
      b.addEventListener('click', function (e) { stopEv(e); if (UI.going || !topTapOk(e)) return; l[1](); });
      bar.appendChild(b);
    });
    if (o.skip) { var sk = el('button', 'ti skip', '<span class="ff" aria-hidden="true"></span>'); sk.type = 'button'; sk.setAttribute('aria-label', '快轉到下一個選擇'); sk.addEventListener('click', function (e) { stopEv(e); o.skip(); }); bar.appendChild(sk); }
    if (o.help) { var hb = el('button', 'ti', '?'); hb.type = 'button'; hb.setAttribute('aria-label', '規則'); hb.setAttribute('data-tut', 'help'); hb.setAttribute('data-a', 'help'); hb.addEventListener('click', function (e) { stopEv(e); if (UI.going || !topTapOk(e)) return; openRules(); }); bar.appendChild(hb); }
    if (o.pause) { var pb = el('button', 'ti', '<span class="pz" aria-hidden="true"></span>'); pb.type = 'button'; pb.setAttribute('aria-label', '暫停選單'); pb.setAttribute('data-a', 'pause'); pb.addEventListener('click', function (e) { stopEv(e); if (UI.going || !topTapOk(e)) return; openSettings(); }); bar.appendChild(pb); }
  }
  // 彈窗開在對決上：盤面 hold（計時與動畫停住、不收點擊；B-pause-not-pausing）
  function duelHold(on) { var Dl = DUEL(); if (UI.screen === 'duel' && Dl && Dl.hold && Dl.api && Dl.api()) { try { Dl.hold(on); return true; } catch (e) { console.error(e); } } return false; }
  function modal(cls, html, onClose, o) {
    o = o || {};
    closeModal();
    var m = el('div', 'lb-modal');
    m.innerHTML = '<div class="pane ' + (cls || '') + '" role="dialog" aria-modal="true">' + html + (o.foot === false ? '' : '<div class="mfoot"><button type="button" class="lb-btn pri wide" data-x="1">關閉</button></div>') + '</div>';
    var held = duelHold(true);
    var close = function () {
      if (m.parentNode) m.remove(); UI.modal = null;
      if (m._off) m._off.forEach(function (f) { try { f(); } catch (_) {} });
      if (held) { held = false; duelHold(false); }
      if (onClose) onClose();
    };
    m.addEventListener('click', function (e) { if (e.target === m) close(); });
    var xb = qs('[data-x]', m); if (xb) xb.addEventListener('click', function (e) { stopEv(e); close(); });
    m._keyH = function (e) { if (e.key === 'Escape' && UI.modal && UI.modal.el === m && !(CI() && CI().isOpen())) { e.preventDefault(); close(); } };
    D.addEventListener('keydown', m._keyH);
    m._off = [function () { D.removeEventListener('keydown', m._keyH); }];
    D.body.appendChild(m);
    bindInfoTaps(m);
    guardClicks(m);
    UI.modal = { el: m, close: close };
    return m;
  }
  function closeModal() { if (UI.modal) { var c = UI.modal.close; UI.modal = null; c(); } }

  // ---- 規則卡（「?」；SPEC-v3 §0，圖 v3/final/rule-card.png）：三角＋六行＋一個例子＋學會的規則＋重看教學
  function triSVG() {
    var t = function (x, y, s) { return '<text x="' + x + '" y="' + y + '" font-size="' + s + '" font-weight="900" text-anchor="middle" fill="#111">剋</text>'; };
    var n = function (cx, cy, col, ch) { return '<circle cx="' + cx + '" cy="' + cy + '" r="36" fill="' + col + '"/><text x="' + cx + '" y="' + (cy + 12) + '" font-size="32" font-weight="900" text-anchor="middle" fill="#fff">' + ch + '</text>'; };
    return '<svg class="tri" viewBox="0 0 280 236" role="img" aria-label="冷門剋經典，經典剋硬蕊，硬蕊剋冷門">' +
      '<defs><marker id="lbRuleAh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#111"/></marker></defs>' +
      '<line x1="72" y1="162" x2="119" y2="78" stroke="#111" stroke-width="4" marker-end="url(#lbRuleAh)"/>' +
      '<line x1="161" y1="78" x2="208" y2="162" stroke="#111" stroke-width="4" marker-end="url(#lbRuleAh)"/>' +
      '<line x1="196" y1="196" x2="88" y2="196" stroke="#111" stroke-width="4" marker-end="url(#lbRuleAh)"/>' +
      t(80, 112, 17) + t(200, 112, 17) + t(140, 224, 17) +
      n(140, 44, '#1f5fae', '經') + n(232, 196, '#c11628', '硬') + n(48, 196, '#6a3fa0', '冷') + '</svg>';
  }
  function learnedHTML() {
    var L = (C.tutorial && C.tutorial.learned) || null, got = save.learned || {};
    if (!L) return '';
    var names = Object.keys(L).filter(function (k) { return got[k]; }).map(function (k) { return L[k]; });
    try { var T = TUT(); if (T && T.learned) T.learned().forEach(function (t) { if (names.indexOf(t) < 0) names.push(t); }); } catch (_) {}
    var ttl = (C.tutorial.ui && C.tutorial.ui.learnedTitle) || '學會的規則';
    return names.length ? '<div class="lb-h3">' + esc(ttl) + '</div><div class="lb-learned">' + names.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' : '';
  }
  // 規則卡（「?」小抄）：D §5 的六行一字不改（編號由這裡加；第 6 行 54 字，自動換行）；頁尾的 {normal}／{elite}／{boss} 代入 C.rules.hpText
  function rulesHTML() {
    var R = C.rules || {};
    // 頂點卡試做（?apex=1）：第 6 行的「王牌 7 星，一場用一次。」換成輔助卡那句、頁尾第 2 行換成打贏回 winHeal（C.rules 本身一字不動；旗標關照舊）
    var apx = function (s, i) { return !UI.apex ? s : String(s).replace('王牌 7 星，一場用一次。', AU('rule')); };   // 六行逐字（店主拍板）：翻面例外寫在翻面那段的開頭（encRuleHTML）
    var lines = (R.lines || []).map(function (s, i) { s = apx(s, i); return '<li><span class="n">' + (i + 1) + '</span><div>' + (i === 0 ? colorZh(s) : i === 2 ? tintBeats(s) : esc(s)) + '</div></li>'; }).join('');
    var foot = (R.foot || []).slice();
    if (UI.apex && foot.length > 1) foot[1] = AU('rulesFoot', { hp: (C.trial && C.trial.youHp) || '', heal: AX().winHeal, normal: '{normal}', boss: '{boss}' });
    return '<div class="lb-rules"><h1>' + esc(R.title || '品味對決・規則') + '</h1>' + triSVG() +
      '<ol class="rl">' + lines + '</ol>' +
      (R.why ? '<p class="rwhy">' + whyHTML(R.why) + '</p>' : '') +      // 六行下面另起一段「為什麼這樣剋」（店主 11-12；六行一字不動）
      relEncHTML(R.relics) +   // 發燒配件一句＋第 I 波翻面（修正輪：併成同一段接著寫，規則卡四個尺寸不捲；「翻面」兩字加粗）
      (luRuleHTML() ? '<p class="rrel rlu">' + luRuleHTML() + '</p>' : '') +   // 第 I 波 I-2：上場＋耐聽一段（開關開著才有）
      '<div class="rfoot">' + foot.map(function (t) { return esc(fill(t, R.hpText || {})); }).join('<br>') + '</div></div>';
  }
  // 第 I 波修正輪：規則卡的翻面段寫具體的：這一趟那張王牌的翻面句（沒有 run＝經典流那句／頂點卡寫通用句）＋「剛好打完就留到下一位。」
  function encRuleHTML() {
    if (!encOn()) return '';
    var r = save && save.run, t = '';
    try {
      if (UI.apex) { var id = r && TIERS.indexOf(r.ace) >= 0 ? aceIdOf(r) : null; t = id ? apexEncLine((r.fac && E.apexAbilityOf ? E.apexAbilityOf(C, id, r) : E.abilityOf(C, id)) || null) : ''; }
      else t = aceEncLine(r && TIERS.indexOf(r.ace) >= 0 ? r.ace : 'hall', !!(r && r.fac));
    } catch (_) { t = ''; }
    if (!t) t = EU('ruleApex');
    var nm = EU('name') + '：';                          // 開頭「翻面：」→「翻面（例外）：」：第 6 行「王牌…一場用一次」的例外（六行店主拍板、一字不改，例外寫在這段）
    if (t && EU('ruleHead') && t.indexOf(nm) === 0) t = EU('ruleHead') + '：' + t.slice(nm.length);
    return t ? whyHTML(t + EU('ruleCarry')) : '';
  }
  function relEncHTML(rel) {
    var enc = encRuleHTML();
    if (!rel && !enc) return '';
    return '<p class="rrel' + (enc ? ' wenc' : '') + '">' + (rel ? esc(rel) : '') + (enc ? (rel ? '<span class="sp" aria-hidden="true">　</span>' : '') + '<span class="renc">' + enc + '</span>' : '') + '</p>';
  }
  function whyHTML(t) { var i = String(t).indexOf('：'); return i > 0 ? '<b>' + esc(t.slice(0, i)) + '</b>' + esc(t.slice(i)) : esc(t); }
  function tutLabel(k, d) { var u = C && C.tutorial && C.tutorial.ui; return (u && typeof u[k] === 'string' && u[k]) || d; }
  function openRules() {
    var canReplay = canTutorial() && UI.screen !== 'duel' && !UI.tutReplay;
    // 「重看教學」跟「關閉」同一列（規則卡四個尺寸都不捲動，§3.2 B2）
    var m = modal('lb-help', rulesHTML() + learnedHTML() + '<div class="mfoot' + (canReplay ? ' two' : '') + '">' +
      (canReplay ? '<button type="button" class="lb-btn" data-a="replay">' + esc(tutLabel('replay', '重看教學')) + '</button>' : '') +
      '<button type="button" class="lb-btn pri' + (canReplay ? '' : ' wide') + '" data-x="1">關閉</button></div>', null, { foot: false });
    var rb = qs('[data-a=replay]', m);
    if (rb) rb.addEventListener('click', function (e) { stopEv(e); closeModal(); replayTutorial(); });
    return m;
  }
  // ---- ⏸ 暫停選單
  function nowPlayingLine() {
    var f = FX(), c = f && f.music && f.music.current && f.music.current();
    var on = !!(f && f.music && f.music.playing && f.music.playing());
    if (!c) return '';
    return '<button type="button" class="lb-np' + (on ? ' on' : '') + '" data-a="np" data-cid="' + esc(c.id) + '"><span class="rec" aria-hidden="true"></span><span class="k">' + (on ? '播放中' : '暫停中') + '</span><b>' + esc(c.artist) + '《' + esc(c.album) + '》</b></button>';
  }
  function swHTML(on) { return '<span class="sw' + (on ? ' on' : '') + '">' + (on ? '開' : '關') + '</span>'; }
  function openSettings() {
    var S = save.settings, armed = false;
    var T = TUT(), tutOn = !!(T && T.active && T.active());
    var html = '<h2>暫停</h2>' + nowPlayingLine() + '<div class="lb-menu">' +
      '<button type="button" class="lb-btn pri big" data-a="resume">繼續</button>' +
      (UI.tutReplay ? '<button type="button" class="lb-btn big" data-a="endreplay">結束重看</button>' : (UI.screen !== 'title' ? '<button type="button" class="lb-btn big" data-a="title">回標題（存檔）</button>' : '')) +
      '<div class="row"><button type="button" class="lb-btn big" data-a="shelf">唱片櫃</button><button type="button" class="lb-btn big" data-a="rules">規則</button>' +
      (canCharEdit() && UI.screen !== 'duel' && !tutOn ? '<button type="button" class="lb-btn big" data-a="char">捏角色</button>' : '') + '</div>' +
      // 第 I 波：聲音｜背景音樂｜音樂音量 一列三格、（樂歷 Lv5 起）背景音樂放、說明小字；動畫加速｜揭曉後自動換手 併成一列（375×548 不用捲；審查 L12）
      '<div class="row snd3"><button type="button" class="lb-btn big sp" data-a="snd">聲音 ' + swHTML(soundOn()) + '</button>' + bgmRowsHTML() + '</div>' + bgmMoreHTML() +
      '<div class="row tog2"><button type="button" class="lb-btn big sp" data-a="fast">動畫加速 ' + swHTML(S.fastAnim) + '</button>' +
      '<button type="button" class="lb-btn big sp" data-a="autonext">揭曉後自動換手 ' + swHTML(S.autoNext) + '</button></div>' +   // 11-17：關＝結果停住等你點一下（預設）；開＝照時間自己換手
      (tutOn ? '<button type="button" class="lb-btn big" data-a="skiptut">' + esc(tutLabel('skipTut', '跳過教學')) + '</button>' : (canTutorial() && UI.screen !== 'duel' ? '<button type="button" class="lb-btn big" data-a="replay">' + esc(tutLabel('replay', '重看教學')) + '</button>' : '')) +
      '<button type="button" class="lb-btn big ghost" data-a="reset">重置試做版存檔</button></div>';
    var m = modal('lb-pause', html, null, { foot: false });
    var f = FX();
    var syncNp = function () { var b = qs('[data-a=np]', m), h = nowPlayingLine(); if (b) { if (h) b.outerHTML = h; else b.remove(); } };
    var off = f && f.music && f.music.onChange ? f.music.onChange(syncNp) : null;
    if (off) m._off.push(off);
    m.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b) return;
      var a = b.getAttribute('data-a');
      if (a === 'resume') closeModal();
      else if (a === 'np') { info(b.getAttribute('data-cid'), { from: 'pause' }); }
      else if (a === 'title') { closeModal(); persist(); go('title'); }
      else if (a === 'endreplay') { closeModal(); endReplay(); }
      else if (a === 'shelf') { closeModal(); persist(); openPage('shelf'); }
      else if (a === 'rules') { closeModal(); openRules(); }
      else if (a === 'char') { closeModal(); openCharEdit(); }
      else if (a === 'snd') {
        var want = !soundOn(); var fx = FX();
        if (fx && fx.setSound) try { fx.setSound(want); } catch (err) { console.error(err); }
        save.settings.sound = want; persist();
        b.innerHTML = '聲音 ' + swHTML(soundOn());
        if (want) bgmResume(600); else npSync();
      } else if (a === 'bgm') {
        S.bgm = !bgmOn(); persist();
        b.innerHTML = esc(BU('bgm')) + ' ' + swHTML(bgmOn());
        bgmToggled();
      } else if (a === 'mvol') {
        var VV = bgmVols(); S.musicVol = VV[(VV.indexOf(bgmVol()) + 1) % VV.length]; persist();
        var fxv = FX(); if (fxv && fxv.music && fxv.music.setVolume) try { fxv.music.setVolume(S.musicVol); } catch (err) { console.error(err); }
        b.innerHTML = esc(BU('vol')) + ' <span class="sw on">' + esc(bgmVolName()) + '</span>';
      } else if (a === 'bsrc') {
        S.bgmSrc = S.bgmSrc === 'both' ? 'bag' : 'both'; persist();
        b.innerHTML = esc(BU('src')) + ' <span class="sw on">' + esc(BU(S.bgmSrc === 'both' ? 'srcBoth' : 'srcBag')) + '</span>';
      } else if (a === 'fast') {
        S.fastAnim = !S.fastAnim; persist();
        b.innerHTML = '動畫加速 ' + swHTML(S.fastAnim);
        var fx2 = FX(); if (fx2 && fx2.setSpeed) fx2.setSpeed(speed());
        if (UI.screen === 'duel' && DUEL() && DUEL().rerender) try { DUEL().rerender(); } catch (err) { console.error(err); }
      } else if (a === 'autonext') {
        S.autoNext = !S.autoNext; persist();             // 對決停住中打開：關掉選單就放行（duel.js hold(false) 看 settings().autoNext）
        b.innerHTML = '揭曉後自動換手 ' + swHTML(S.autoNext);
      } else if (a === 'skiptut') { closeModal(); try { TUT().skip(); } catch (err) { console.error(err); } }
      else if (a === 'replay') { closeModal(); replayTutorial(); }
      else if (a === 'reset') {
        if (!armed) { armed = true; b.textContent = '再按一次：真的清掉唱片櫃與存檔'; b.classList.add('armed'); return; }
        var keepSound = save.settings.sound, keepPlayer = save.player, keepBgm = save.settings.bgm, keepVol = save.settings.musicVol;
        leaveDuel();
        save = defSave(); save.settings.sound = keepSound; save.settings.bgm = keepBgm; save.settings.musicVol = keepVol; save.player = keepPlayer; persist(); closeModal();
        go('title');
      }
    });
  }

  // ---- 捏角色（charedit.js：DipLabCharEdit；沒載到就不出現入口）
  function canCharEdit() { return !!(W.DipLabCharEdit && W.DipLabCharEdit.open && W.DipLabChars); }
  function openCharEdit() {
    if (!canCharEdit() || UI.charEd) return;
    ensurePlayer();
    var done = function () { UI.charEd = null; };
    try {
      UI.charEd = W.DipLabCharEdit.open(D.body, { name: save.player.name, spec: save.player.avatar }, {
        onSave: function (r) {
          save.player.name = r.name; save.player.avatar = r.spec; persist(); done();
          if (UI.stage && stg('has', 'p')) stg('sprite', 'p', 'player');   // 店裡的你馬上換裝
        },
        onCancel: done
      });
    } catch (e) { console.error(e); done(); }
  }

  // ======================================================================= 路由
  var UI = { screen: null, params: null, modal: null, stage: null, dlg: null, auto: null, trail: [], seedOverride: null, timers: [], going: false,
    top: null, stageHost: null, panel: null, decor: [], camName: 'full', offs: [], screenAt: 0, force: null, timeline: [] };
  var SCREENS = {};
  function app() { return D.getElementById('app'); }
  function later(fn, ms) { var t = setTimeout(fn, ms / speed()); UI.timers.push(t); return t; }
  function unmountDuel() { var Dl = DUEL(); if (Dl && Dl.unmount) { try { Dl.unmount(); } catch (_) {} } }
  // 離開對決（⏸ 回標題、重置、重看結束、打完）：教學一定收掉（B-stale-lesson-hijack），唱盤區清乾淨
  function leaveDuel() {
    var T = TUT();
    try { if (T && T.abort) T.abort(); } catch (e) { console.error(e); }
    unmountDuel();
    UI.tutReplay = null;
    stg('clearClash', 0);
    if (UI.stage && typeof UI.stage.duelOut === 'function') { try { UI.stage.duelOut({ camera: UI.camName === 'strip' ? 'strip' : UI.camName, ms: 0, interact: 'none' }); } catch (e) { console.error(e); } }
    stg('untag');
  }
  function cleanup() {
    if (UI.dlg) { UI.dlg.cancel(); UI.dlg = null; }
    if (UI.dropFloor) { UI.dropFloor = false; stg('floorRecord', null); }   // 掉落旁白留在地上的那張
    if (UI.ghostRelease && UI.screen === 'duel') UI.ghostRelease();   // 對決畫面換走（還沒滑進來就離開）：對白框一起收
    UI.timers.forEach(clearTimeout); UI.timers = [];
    UI.offs.forEach(function (f) { try { f(); } catch (_) {} }); UI.offs = [];
    UI.decor.forEach(function (d) { if (d && d.remove) d.remove(); }); UI.decor = [];
    qsa('.lb-sheet.float, .lb-toast:not(.keep)', app()).forEach(function (s) { s.remove(); });   // .keep：換畫面前剛出的吐司（打贏的錢、升級、中繼點）留到自己的時間到（審查 #0）
    UI.going = false; UI.lastAct = null;
    closeModal();
    var ci = CI(); if (ci && ci.isOpen()) ci.close();
    stg('highlight', []); stg('clearStamps');
    var T = TUT(); if (T && T.dismissSoft) try { T.dismissSoft(); } catch (_) {}
    var X = econ(); if (X && typeof X.close === 'function') try { X.close(); } catch (e) { console.error(e); }
  }
  function go(id, params) {
    if (UI.screen === 'duel' && id !== 'duel') leaveDuel();
    if (UI.tune) closeTuneConsole(true);              // 你家的控制台（全螢幕星圖）開著就收掉
    cleanup();
    closePage(true);
    UI.screen = id; UI.params = params || {}; UI.screenAt = now();
    UI.trail.push(id); if (UI.trail.length > 120) UI.trail.shift();
    app().setAttribute('data-screen', id);
    D.body.setAttribute('data-screen', id);
    var p = UI.panel; p.className = 'lb-panel'; p.removeAttribute('style'); p.innerHTML = '';
    var f = FX(); if (f && f.rainStop && id !== 'title' && id !== 'scene') try { f.rainStop(); } catch (_) {}
    if (id === 'title' || id === 'night') dailyTick();
    try { SCREENS[id](UI.params); } catch (e) { console.error(e); }
    if (UI.screen === id) crowdSync(id, UI.params);   // 活店（SPEC-H §3.1）：畫面掛好才切導演模式（巢狀 go 已經切過就不再切）
    bgmSync();                                       // 第 I 波背景音樂：進／出輪播畫面（來客、領獎、說情）
    if (id === 'title') mediaKick();
    mediaRetry();
    flushAfter();                                    // 排給「下一個畫面」的吐司：畫面掛好才出（審查 #0）
    floorSoon();
    UI.camQuick = false;
    // 自動玩到「來客」：今天的攤位也是來客畫面，但攤位逛完（回到平常的來客）才算到（第 C 波：舊的自動玩照樣一路玩過攤位）
    if (UI.auto && UI.auto.until === id && !(id === 'night' && save && save.run && E.nextStep(save.run) === 'stall')) UI.auto = null;
  }
  // 面板換內容：舊的往下淡出 150 ms（對白框 → 盤面）
  //   o.hold（序章「接受對決」→ 遇敵）：對白框（老闆最後那句）留著，等盤面滑進來（UI.ghostRelease()，SCREENS.duel 的 push）才淡出；最多留 5 秒（整合版面 b）
  function ghostPanel(o) {
    o = o || {};
    var p = UI.panel; if (!p || !p.firstChild) return;
    if (rm() && !o.hold) return;
    var r = p.getBoundingClientRect(), ar = app().getBoundingClientRect();
    // 不超出 #app 的下緣（RT-14：留著的對白框比 #app 低 18px，#app 量到可以捲）
    var gTop = Math.round(r.top - ar.top), gH = Math.max(0, Math.min(Math.round(r.height), Math.floor(ar.height) - gTop));
    var g = el('div', 'lb-ghost'); g.style.cssText = 'top:' + gTop + 'px;height:' + gH + 'px';
    while (p.firstChild) g.appendChild(p.firstChild);
    app().appendChild(g);
    var gone = false, safety = 0;
    var fade = function () {
      if (gone) return; gone = true; clearTimeout(safety);
      if (UI.ghostRelease === fade) UI.ghostRelease = null;
      var a = (!rm() && g.animate) ? g.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, easing: 'ease-in', fill: 'forwards' }) : null;   // 只淡出、不往下移（往下移會超出 #app，RT-14）
      setTimeout(function () { g.remove(); }, a ? 180 : 0);
    };
    if (!o.hold) return fade();
    if (UI.ghostRelease) UI.ghostRelease();
    UI.ghostRelease = fade;
    safety = setTimeout(fade, 5000);
  }

  // ======================================================================= 場景（scene）：舞台 full＋對白窗＋包包條
  function buildScene(p) {
    p = p || {};
    setTop(posLabel(save.run), { links: p.recap ? rcLinks() : null, skip: function () { if (UI.dlg) UI.dlg.skip(); }, help: !!p.help, pause: !!p.pause });
    var panel = UI.panel; panel.classList.add('scene');
    var dq = el('div', 'lb-dq narr', '<div class="nm"></div><div class="tx" aria-live="polite"></div><div class="nx" aria-hidden="true">▼</div><div class="menu"></div>');
    panel.appendChild(dq);
    var strip = null;
    if (p.strip !== false) { strip = el('div', 'lb-strip'); panel.appendChild(strip); }
    cam('full', 'scene', p.camMs);
    stg('interact', 'scene');
    if (p.p) place('p', p.p, 'player');
    if (p.f === 'hide') hideActor('f'); else if (p.f) { place('f', p.f, p.fSpr || null); stg('sil', 'f', p.f === 'out'); }
    if (p.o) place('o', p.o, 'owner');
    if (p.door) stg('door', p.door);
    var sc = { panel: panel, box: dq, dq: dq, strip: strip, stripState: p.stripState || null };
    if (strip) renderStrip(sc);
    var f = FX(); if (soundOn() && f && f.rainStart) try { f.rainStart(); } catch (_) {}
    return sc;
  }
  function stripFromRun() { var r = save.run; if (!r) return { ace: null, bag: [] }; return { ace: aceIdOf(r), bag: r.bag.slice() }; }
  function isBargain(id) { return !!(C.bargain && C.bargain.pool && C.bargain.pool.indexOf(id) >= 0); }
  function renderStrip(sc) {
    if (!sc.strip) return;
    var s = sc.stripState || stripFromRun();
    var slot = function (id, cls, key) {
      var c = card(id);
      return '<div class="slot' + cls + (c ? ' filled' : '') + '" data-slot="' + key + '"' + (c ? ' data-info="1" data-cid="' + esc(id) + '" role="button" aria-label="' + esc(c.artist + '《' + c.album + '》') + '"' : '') + '>' +
        (c ? '<img alt="" draggable="false" src="' + esc(coverSrc(c)) + '" onerror="DipCoverErr(this)">' : '') + '</div>';
    };
    var h = '<span class="lab">包包</span>' + slot(s.ace, ' ace', 'ace') + '<span class="sep"></span>';
    var seeds = (save.run && save.run.seeds) || [];
    // 包包不限張數（店主 11-16）：這一條最多排 8 格；超過 8 張排前 7 張，第 8 格寫「+N」（其餘幾張；整個包包在來客的包包面板看）
    var more = s.bag.length > 8 ? s.bag.length - 7 : 0, nSlot = more ? 7 : Math.max(7, Math.min(8, s.bag.length));
    for (var i = 0; i < nSlot; i++) h += slot(s.bag[i], (isBargain(s.bag[i]) ? ' junk' : '') + (s.bag[i] && seeds.indexOf(s.bag[i]) >= 0 ? ' seed' : ''), i);
    if (more) h += '<span class="slot more" aria-label="' + esc(bagText(s.bag.length)) + '">+' + more + '</span>';
    sc.strip.innerHTML = h;
  }
  // 一張封面從 from 飛到 to（from／to＝元素或畫面上的矩形）；回 { done: Promise, cancel() }。cancel＝直接到終點（不飛了）
  function rectOfAny(x) { return !x ? null : (typeof x.getBoundingClientRect === 'function' ? x.getBoundingClientRect() : x); }
  function flyCover(c, from, to, delay) {
    var f = null, t1 = 0, t2 = 0, res0 = null, settled = false;
    var done = new Promise(function (res) { res0 = res; });
    var fin = function () { if (settled) return; settled = true; clearTimeout(t1); clearTimeout(t2); if (f) f.remove(); res0(); };
    var a = rectOfAny(from), b = rectOfAny(to);
    if (!a || !b || !c || rm()) { t1 = setTimeout(fin, (delay || 0) / speed()); return { done: done, cancel: fin }; }
    var S0 = 40;
    f = el('div', 'lb-fly');
    f.style.cssText = 'left:' + (a.left + a.width / 2 - S0 / 2) + 'px;top:' + (a.top + a.height * 0.3) + 'px;width:' + S0 + 'px;height:' + S0 + 'px;background-image:url("' + coverSrc(c).replace(/"/g, '%22') + '");opacity:0';
    D.body.appendChild(f);
    var dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height * 0.3 + S0 / 2), sc = b.width / S0;
    var dur = 520 / speed();
    t1 = setTimeout(function () {
      if (settled) return;
      sfx('flip');
      var an = f.animate ? f.animate([{ transform: 'translate(0,0) scale(.6)', opacity: 0 }, { transform: 'translate(' + dx * 0.15 + 'px,' + (dy * 0.15 - 30) + 'px) scale(1.05)', opacity: 1, offset: 0.3 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sc + ')', opacity: 1 }], { duration: dur, easing: 'cubic-bezier(.3,.7,.3,1)', fill: 'forwards' }) : null;
      if (an) an.onfinish = fin;
      t2 = setTimeout(fin, dur + 200);
    }, (delay || 0) / speed());
    return { done: done, cancel: fin };
  }

  // ======================================================================= 逐句執行器（beat runner；SPEC-v4 §2.5.3；打字機 28 ms、▼、⏩）
  // 一句：套 set → 依序做完 pre → 開始打字、同時依序做 act → 字打完而且 act 做完才亮 ▼（有 ui 的句子以「選擇」樣式亮，點一下才開面板）。
  // 點一下＝只把「正在做的那一步」（目前在跑的葉節點；par 底下每一支各自的那一步）快轉到終點，下一步照常開始、照常速度；字還在打就順便補完。
  // ⏩＝依序把每一句的 set／pre／act 一步一步快轉到終點（不打字），停在下一個有 ui 的句子。UI.auto（e2e／autoplay）＝每一步一開始就收尾、每句停 120 ms。
  // 時間軸（UI.timeline，§5.4）：{t, beat, ev}；ev＝start／pre／typed／act／next／ui／step（每一步結束：how＝done 自己做完、tap 點一下、ff 快轉）
  function voiceOf(who) {
    if (who === '老闆') return C.voices && C.voices.owner;
    if (who === '男子') return C.enemies.man.voice;
    if (who === '藏家' || who === C.enemies.boss.name) return C.enemies.boss.voice;
    return null;
  }
  function tlog(beat, ev, extra) {
    var e = { t: now(), beat: beat || null, ev: ev };
    if (extra) for (var k in extra) e[k] = extra[k];
    UI.timeline.push(e);
    if (UI.timeline.length > 4000) UI.timeline.splice(0, UI.timeline.length - 4000);
  }
  function stepLabel(s) {
    if (!s) return '';
    var to = s.to ? [].concat(s.to).map(function (x) { return Array.isArray(x) ? '[' + x.join(',') + ']' : x; }).join('>') : '';
    return [s.do, s.id || '', s.name || s.mode || s.kind || '', to || (s.at || '')].filter(Boolean).join(' ').trim() + (s.ms ? ' ' + s.ms + 'ms' : '');
  }
  function Dialogue(sc, ctx) {
    var st = { cancelled: false, typing: false, timer: null, finish: null, onTap: null, ff: false, choiceWait: false, inUi: false, beat: null };
    var active = [];                                   // 正在跑的葉節點（點一下只快轉這些）
    var dq = sc.dq, nm = qs('.nm', dq), tx = qs('.tx', dq), nx = qs('.nx', dq), menu = qs('.menu', dq);
    ctx = ctx || {}; ctx.flags = ctx.flags || {};
    var never = function () { return new Promise(function () {}); };
    function tap() {
      if (st.cancelled) return;
      var hit = false;
      if (active.length) { active.slice().forEach(function (L) { L.finish('tap'); }); hit = true; }
      if (st.typing && st.finish) { st.finish(); hit = true; }
      if (hit) return;
      if (st.onTap) st.onTap();
    }
    dq.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('.menu button')) return; tap(); });
    var keyH = function (e) {
      if (UI.dlg !== api || UI.modal || (CI() && CI().isOpen()) || (e.key !== ' ' && e.key !== 'Enter')) return;
      if (qs('.lb-sheet', UI.panel) || (e.target && e.target.closest && e.target.closest('button'))) return;
      e.preventDefault(); tap();
    };
    D.addEventListener('keydown', keyH);
    function setWho(who) {
      nm.textContent = who === 'player' ? '你' : (who || '');      // NP-16：你說話的名牌一律寫「你」
      dq.classList.toggle('narr', !who);
      dq.classList.toggle('foe', who === '男子');
      dq.classList.toggle('boss', who === '藏家' || who === (C.enemies.boss || {}).name);
    }
    function typeText(text, voice) {
      return new Promise(function (res) {
        var n = 0; st.typing = true; tx.textContent = '';
        var done = function () { if (st.timer) clearInterval(st.timer); st.timer = null; st.typing = false; st.finish = null; tx.textContent = text; res(); };
        st.finish = done;
        if (st.ff || !text || UI.auto) return done();
        var f = FX();
        st.timer = setInterval(function () {
          if (st.cancelled) { clearInterval(st.timer); return; }
          n++; tx.textContent = text.slice(0, n);
          if (voice && f && n % 2 === 0) try { f.blip(voice.freq, voice.wave, voice.jitter); } catch (_) {}
          if (n >= text.length) done();
        }, 28 / speed());
      });
    }
    function waitTap(ms) {
      return new Promise(function (res) {
        var t = null;
        var fin = function () { if (t) clearTimeout(t); st.onTap = null; res(); };
        st.onTap = fin;
        if (ms != null) t = setTimeout(fin, ms / speed());
      });
    }
    function showNext(on, choice) { nx.classList.toggle('on', !!on); nx.classList.toggle('choice', !!choice); }
    // ---- '@' 值：執行器代入（劇本不寫死人名）
    function resolve(v) {
      if (typeof v !== 'string' || v.charAt(0) !== '@') return v;
      var r = save.run;
      if (v === '@man') return enemySpr(C.enemies[C.prologueEnemy || 'man']);
      if (v === '@guest') { var g = r && r.order[r.idx]; return g ? enemySpr(C.enemies[g]) : 'e1'; }
      if (v === '@gift') return r ? (C.gifts[r.ace] || [])[0] || null : null;
      if (v === '@drop') return ctx.stakeId || null;
      return v;
    }
    function resolveWhat(w) {
      if (!w || typeof w !== 'object') return w || null;
      var o = {}; for (var k in w) o[k] = resolve(w[k]);
      return o.sleeve === null ? null : o;
    }
    function sprOf(id, spr) { spr = resolve(spr); return spr === 'player' ? playerAv() : spr; }
    // ---- set：開口前立即套用
    function applySet(s) {
      if (!s) return;
      var k;
      if (s.sprite) for (k in s.sprite) stg('sprite', k, sprOf(k, s.sprite[k]));
      if (s.put) for (k in s.put) place(k, s.put[k], k === 'p' ? 'player' : k === 'o' ? 'owner' : null);
      if (s.hide) for (k in s.hide) stg('hide', k, !!s.hide[k]);
      if (s.sil) for (k in s.sil) stg('sil', k, !!s.sil[k]);
      if (s.pose) for (k in s.pose) stg('pose', k, s.pose[k] || null);
      if (s.emote) { var anyEm = false; for (k in s.emote) { stg('emote', k, s.emote[k] || null); if (s.emote[k]) anyEm = true; } if (anyEm) keepHeads(200, 22); }
      if ('notes' in s) stg('play', !!s.notes);
      if (s.door) { var dq0 = ctx.quietDoor && s.door === 'swing'; if (dq0) ctx.quietDoor = false; stg('door', s.door === 'shut' ? 'close' : s.door, dq0 ? { quiet: true } : undefined); }
      if (s.stamp && !st.ff) {
        var parts = String(s.stamp).split('：');
        // 長的一句在逗號換行（R-09：「三十年的耳朵，不／會騙人。」斷在字中間）
        var main = parts[0].length > 8 ? parts[0].replace('，', '，\n') : parts[0];
        stg('stamp', main, parts[1] || '', st.beatWho === ((C.enemies.boss || {}).name || '傳說藏家') ? 'ink' : 'gold', 2400);
        sfx('readHit');
      }
    }
    function music(kind) {
      var f = FX(); if (!f || !f.music) return;
      if (kind === 'tonight' && ctx.tonightId) {
        if (!f.soundOn()) { ctx.quiet = true; return; }
        var settled = false;
        f.music.play(card(ctx.tonightId), { fadeMs: 1500 }).then(function (ok) { settled = true; if (!ok) ctx.quiet = true; else ctx.heard = true; }, function () { settled = true; ctx.quiet = true; });
        setTimeout(function () { if (!settled) ctx.quiet = true; }, 2500);
      } else if (kind === 'stake' && ctx.stakeId && f.soundOn()) { try { f.music.play(card(ctx.stakeId), { fadeMs: 1500 }); } catch (_) {} }
      else if (kind === 'stop' || (kind && typeof kind === 'object' && kind.stop != null)) {
        try { f.music.stop({ fadeMs: typeof kind === 'object' ? kind.stop : 1500 }); } catch (_) {}
      }
    }
    // ---- 步驟（葉節點有 finish；par／seq 由子步驟組成）
    function runSteps(list) {
      list = list || [];
      return list.reduce(function (p, s) { return p.then(function () { return st.cancelled ? never() : runStep(s); }); }, Promise.resolve());
    }
    function runStep(s) {
      if (!s || st.cancelled) return st.cancelled ? never() : Promise.resolve();
      if (s.do === 'par') return Promise.all((s.steps || []).map(runStep));
      if (s.do === 'seq') return runSteps(s.steps);
      return leaf(s);
    }
    function leaf(s) {
      var L = { step: s, done: false, onFinish: null }, res0 = null;
      var pr = new Promise(function (res) { res0 = res; });
      L.end = function (how) {
        if (L.done) return; L.done = true;
        var i = active.indexOf(L); if (i >= 0) active.splice(i, 1);
        tlog(st.beat, 'step', { step: stepLabel(s), how: how || 'done' });
        res0();
      };
      L.finish = function (how) { if (L.done) return; if (L.onFinish) try { L.onFinish(); } catch (e) { console.error(e); } L.end(how || 'tap'); };
      startLeaf(s, L);
      if (!L.done) {
        active.push(L);
        if (st.ff || UI.auto) L.finish(st.ff ? 'ff' : 'auto');
      }
      return pr;
    }
    function startLeaf(s, L) {
      var sp = speed(), id = s.id, t = 0;
      switch (s.do) {
        case 'walk': {
          var to = [].concat(s.to || []).map(resolve);
          var w = stgP('walk', id, to, s.speed || (C.blocking && C.blocking.speed) || 54);
          L.onFinish = function () { stg('finish', id); };
          w.then(function () { L.end('done'); });
          return;
        }
        case 'pose':
          stg('pose', id, s.name || null);
          if (!s.ms) return L.end('done');
          t = setTimeout(function () { stg('pose', id, null); L.end('done'); }, s.ms / sp);
          L.onFinish = function () { clearTimeout(t); stg('pose', id, null); };
          return;
        case 'emote': stg('emote', id, s.kind || null, s.ms); return L.end('done');
        case 'wait':
          t = setTimeout(function () { L.end('done'); }, (s.ms || 0) / sp);
          L.onFinish = function () { clearTimeout(t); };
          return;
        case 'door': stg('door', s.mode === 'shut' ? 'close' : s.mode); return L.end('done');
        case 'face': stg('faceTo', id, resolve(s.to)); return L.end('done');
        case 'hold': stg('hold', id, resolveWhat(s.what)); return L.end('done');
        case 'hide': stg('hide', id, s.on !== false); return L.end('done');
        case 'sfx': sfx(s.name); return L.end('done');
        case 'floor': {
          var dc = card(resolve(s.card || '@drop'));
          if (dc) stg('floorRecord', s.at, { attr: E.topAttr ? E.topAttr(dc) : 'c', card: dc.id });
          return L.end('done');
        }
        case 'give': return giveStep(s, L);
        default: console.warn('[ui] unknown step', s); return L.end('done');
      }
    }
    // O14：王牌＋老闆四張＋特價箱三張（run.bag 的順序，王牌先）從櫃檯一張一張飛進包包條；最後一張落位才算完成
    function giveStep(s, L) {
      var r = save.run;
      if (!r || !sc.strip) { sc.stripState = null; renderStrip(sc); return L.end('done'); }
      var ids = [aceIdOf(r)].concat(r.bag);
      var got = { ace: null, bag: [] };
      sc.stripState = got; renderStrip(sc);
      var from = stg('hotRect', s.from || 'counter') || anchorOf('o');
      var slots = ids.map(function (id, i) { return qs(i === 0 ? '[data-slot=ace]' : '[data-slot="' + (i - 1) + '"]', sc.strip); });
      var gap = s.gap == null ? 250 : s.gap, left = ids.length;
      var flies = ids.map(function (id, i) {
        var fl = flyCover(card(id), from, slots[i], i * gap);
        fl.done.then(function () {
          if (L.done) return;
          if (i === 0) got.ace = id; else got.bag[i - 1] = id;
          renderStrip(sc);
          if (--left <= 0) { sc.stripState = null; renderStrip(sc); L.end('done'); }
        });
        return fl;
      });
      L.onFinish = function () { flies.forEach(function (fl) { fl.cancel(); }); sc.stripState = null; renderStrip(sc); };
    }
    // 選項要的空間：只把舞台往上收到放得下（ART-12：不換 reward 鏡頭、不留一大塊黑）；收完人頭不能被裁掉（375×548 的 O21：後走道三個人）
    function roomFor() {
      if (!UI.stage) return;
      var need = Math.ceil(naturalH(dq) + 30);
      if (UI.panel.clientHeight >= need) return;
      cam('full', 'scene', 260, need).then(function () { keepHeads(200); });
    }
    function textOf(b) {
      var t = b.text;
      if (t && typeof t === 'object') t = t[ctx.tonightTier] || t.hall || '';
      return ctx.vars ? fill(t, ctx.vars) : String(t || '');      // {x}：再挑戰一趟的 {ace}（這一趟王牌的專輯名；店主 11-13）
    }
    function runBeat(b, onUi) {
      st.beat = b.id || null; st.beatWho = b.who;
      tlog(st.beat, 'start');
      stg('clearStamps');
      setWho(''); tx.textContent = ''; showNext(false);
      applySet(b.set);
      if (b.music) music(b.music);
      return runSteps(b.pre).then(function () {
        if (st.cancelled) return never();
        tlog(st.beat, 'pre');
        setWho(b.who);
        var text = textOf(b);
        var typed = typeText(text, voiceOf(b.who)).then(function () { tlog(st.beat, 'typed'); });
        var acted = runSteps(b.act).then(function () { tlog(st.beat, 'act'); });
        return Promise.all([typed, acted]).then(function () { return text; });
      }).then(function (text) {
        if (st.cancelled) return never();
        if (b.ui) {
          st.ff = false;
          showNext(true, true); tlog(st.beat, 'next', { choice: true });
          st.choiceWait = true;
          autoAct(function () { tap(); }, 120);
          return waitTap().then(function () {
            st.choiceWait = false; showNext(false);
            tlog(st.beat, 'ui', { ui: b.ui });
            st.inUi = true;
            return Promise.resolve(onUi ? onUi(b.ui, b) : null).then(function (v) { st.inUi = false; return v; });
          });
        }
        showNext(true, false); tlog(st.beat, 'next');
        // NP-11：自動前進給足閱讀時間（約每秒 6–7 字）；點一下就走。⏩ 快轉中不停
        var ms = st.ff ? 0 : UI.auto ? 120 : b.ms > 0 ? b.ms : Math.min(6500, 1400 + 140 * text.length);   // b.ms：劇本指定（再挑戰一趟不等太久）
        return waitTap(ms).then(function () { showNext(false); });
      });
    }
    var api = {
      ctx: ctx,
      get beat() { return st.beat; },
      cancel: function () { st.cancelled = true; if (st.timer) clearInterval(st.timer); active.slice().forEach(function (L) { L.onFinish = null; }); active = []; D.removeEventListener('keydown', keyH); },
      tap: tap,
      // ⏩：正在做的步驟收尾，之後每一步一開始就收尾、不打字、不等 ▼，停在下一個有 ui 的句子（字顯示完整）
      skip: function () {
        if (st.cancelled || st.inUi || st.choiceWait) return;
        st.ff = true;
        active.slice().forEach(function (L) { L.finish('ff'); });
        if (st.typing && st.finish) st.finish();
        if (st.onTap) st.onTap();
      },
      clear: function () { setWho(''); tx.textContent = ''; showNext(false); },
      hold: function () { showNext(false); },
      // 不在句子裡的走位（O21 選完走到唱盤）：一樣可以點一下快轉正在走的人、⏩ 一路快轉
      steps: function (list, label) {
        st.beat = label || null; tlog(st.beat, 'start');
        return runSteps(list).then(function () { tlog(st.beat, 'act'); st.ff = false; });
      },
      menu: function (items, o) {
        o = o || {};
        return new Promise(function (res) {
          menu.innerHTML = '';
          guardClicks(menu);
          items.forEach(function (it, i) {
            var sub = o.subs && o.subs[i];      // 按鈕下方一行小字（O21 跳過教學；店主 11-12）
            var b = el('button', 'lb-dqopt key' + (sub ? ' has-sub' : ''), '<span class="cur" aria-hidden="true">▸</span>' +
              (sub ? '<span class="mt">' + esc(String(it).replace(/^▶\s*/, '')) + '<small class="sub">' + esc(sub) + '</small></span>' : esc(String(it).replace(/^▶\s*/, ''))));
            b.type = 'button'; b.setAttribute('data-i', i);
            b.addEventListener('click', function (e) {
              stopEv(e); if (menu._done) return; menu._done = true;
              sfx('tick'); menu.innerHTML = ''; dq.classList.remove('hasmenu'); UI.panel.classList.remove('menu-open');
              if (UI.camName === 'full' && UI.screen === 'scene') cam('full', 'scene', 260);
              res(i);
            });
            menu.appendChild(b);
          });
          menu._done = false;
          dq.classList.add('hasmenu');
          UI.panel.classList.add('menu-open');
          requestAnimationFrame(roomFor);
          focusFirst(menu, '.lb-dqopt');
          autoAct(function () { var b = qs('button[data-i="' + (o.autoIndex || 0) + '"]', menu) || qs('button', menu); if (b) b.click(); });
        });
      },
      say: function (who, text, o) { return api.run([{ who: who, text: text, tag: '新' }], o); },
      // ui 回呼裡、開面板之前，用同一個對白框再念幾句（序章收尾：E4「他走了」→ 掉落旁白 G1 → 撿起面板；店主 11-13 §0）：念的時候 ⏩ 照常可用
      aside: function (beats) {
        var was = st.inUi; st.inUi = false;
        return api.run(beats || []).then(function (v) { st.inUi = was; return v; });
      },
      run: function (beats, onUi) {
        var i = 0;
        var next = function () {
          if (st.cancelled) return never();
          if (i >= beats.length) { st.ff = false; return Promise.resolve(); }
          var b = beats[i++];
          if (b.if && !ctx.flags[b.if]) return next();
          if (ctx.skipBeat && ctx.skipBeat(b)) return next();
          return runBeat(b, onUi).then(next);
        };
        return next();
      }
    };
    UI.dlg = api;
    return api;
  }
  // 自動遊玩（__lab.autoplay）：每個決策點登記成 UI.lastAct（只有最新的一個有效）
  function autoAct(fn, ms) {
    var wrapped = function () { if (UI.lastAct !== wrapped) return; fn(); };
    UI.lastAct = wrapped;
    if (UI.auto) setTimeout(function () { if (UI.auto) wrapped(); }, (ms || 160) / speed());
  }

  // ======================================================================= 面板（sheet）
  // 防連點：剛換上的面板 GUARD_MS 內真人的點擊不算（自動遊玩的 el.click() 不受影響）
  var GUARD_MS = FAST ? 160 : 380;
  // 連點（V5-play-5）：在對白框上連點跳字，下一個選項（猜歌、挑王牌、老闆的四張、接受對決）就在手指底下冒出來，380 ms 一過連點的下一下就替玩家選了。
  //   連點中的一下（跟上一下按下隔不到 SERIES_MS）、而且這一串在面板出現之前就開始了＝不算；停一下再點照常（教學 RV11-4 同一個想法）
  var SERIES_MS = FAST ? 140 : 350, downLast = -1e9, downSeries = -1e9;
  D.addEventListener('pointerdown', function () { var t = now(); if (t - downLast >= SERIES_MS) downSeries = t; downLast = t; }, true);
  function guardClicks(node) {
    node.classList.add('arming');
    node._shownAt = now();
    // node._armUntil（選填）：鏡頭還在動、鈕還會移位時延長（RT-13：挑唱片面板進場 400 ms 內「收這張」往下滑 150 px）
    var disarm = function () { var left = (node._armUntil || 0) - now(); if (left > 0) setTimeout(disarm, left); else node.classList.remove('arming'); };
    setTimeout(disarm, GUARD_MS);
    if (node._guarded) return;
    node._guarded = true;
    node.addEventListener('click', function (e) {
      if (e.isTrusted && (node.classList.contains('arming') || (e.detail && downSeries < node._shownAt))) { e.stopImmediatePropagation(); e.preventDefault(); }
    }, true);
  }
  function focusFirst(root, sel) {
    requestAnimationFrame(function () {
      if (!root.isConnected) return;
      var ae = D.activeElement; if (ae && ae !== D.body && root.contains(ae)) return;
      var b = qsa(sel || 'button:not([disabled])', root).find(function (x) { var cs = getComputedStyle(x); return cs.visibility !== 'hidden' && cs.display !== 'none'; });
      if (b) try { b.focus({ preventScroll: true }); } catch (_) {}
    });
  }
  // 面板蓋在 #panel 上；場景裡開面板時鏡頭換 reward，讓面板有 260px 以上
  function sheet(html, cls, o) {
    o = o || {};
    qsa(':scope > .lb-sheet', UI.panel).forEach(function (s) { s.remove(); });
    var s = el('div', 'lb-sheet' + (cls ? ' ' + cls : ''), html);
    s.addEventListener('click', stopEv);
    guardClicks(s);
    bindInfoTaps(s);
    UI.sheetNeed = 0;
    UI.panel.appendChild(s);
    UI.panel.classList.add('sheeted');
    clearTimeout(UI.camBack); UI.camBack = 0;
    if (UI.screen === 'scene' && o.cam !== false && UI.camName !== 'reward' && !floorRoom(260)) cam('reward', 'reward', 380);
    focusFirst(s);
    return s;
  }
  // 面板內容比 reward 鏡頭留的高：量出來要多高，舞台就收到放得下（最多讓到可視高的 72%）；放不下整間店就收成對決那條（人都還在畫面裡）
  function roomForSheet(s) {
    var vh = W.visualViewport ? Math.min(W.innerHeight, W.visualViewport.height) : W.innerHeight;
    var nat = Math.ceil(naturalH(s) + 4), need = Math.min(Math.round(vh * 0.72), Math.max(260, nat));
    if (UI.camName === 'full' && floorRoom(need)) return;
    UI.sheetNeed = need; floorSoon();               // 地板讓到 0 還不夠：鏡頭收；地板不能再把讓出來的高補回去（不然面板還是一樣矮）
    // 收成橫條：橫條往上長到面板剛好放得下內容（不然面板照橫條的高、內容下面空一大塊白；V5-play-8：375 老闆的四張空 65–120 px）
    if (vh - 32 - need < 210) { cam('strip', 'reward', 380, null, Math.max(need, nat)); return; }
    // reward 鏡頭固定從第 40 列起：高螢幕上面板要的高讓完還有剩，剩的會變成店景下面一條空地板、店頂照樣被裁（V5 F3）。
    //   這時改用 full 鏡頭帶 panelMin：只裁真的放不下的那幾列（full 量出來比 reward 高＝沒有縮小倍率、看到的列比 reward 多）
    var st = UI.stage, fh = 0, rh = 0;
    if (st && typeof st.camCssH === 'function') { try { fh = st.camCssH('full', { panelMin: need }); rh = st.camCssH('reward', { panelMin: need }); } catch (_) {} }
    if (fh > rh + 2) { cam('full', 'reward', 380, need); UI.camSheet = true; }
    else cam('reward', 'reward', 380, need);
  }
  // 高螢幕接著木地板（V03）時開面板：面板要的高從延伸的地板讓出來，鏡頭照舊看整間店（RH-5：原本換 reward 鏡頭把店景上緣裁掉 58 px，
  //   讓出來的高又被地板補回去，舞台一樣高、只是少看到牆上的架子）。地板不夠讓才換鏡頭
  function floorRoom(need) {
    var fx = UI.floorX = floorNow();
    if (!(fx > 0) || UI.screen !== 'scene' || !UI.panel) return false;
    if (UI.panel.clientHeight + fx < need) return false;
    UI.sheetNeed = need;
    fitFloor();
    return true;
  }
  function camBackSoon() {
    var shrunk = function () { return UI.camName === 'reward' || UI.camName === 'strip' || UI.camSheet; };   // camSheet＝為了面板裁過的 full（F3）
    if (UI.screen !== 'scene' || !shrunk()) return;
    var scr0 = UI.screen;
    clearTimeout(UI.camBack);
    UI.camBack = setTimeout(function () { UI.camBack = 0; if (UI.screen === scr0 && !qs(':scope > .lb-sheet', UI.panel) && shrunk()) cam('full', 'scene', 380); }, 160);
  }
  function closeSheet(s) {
    if (!s) return;
    if (s.parentNode) s.remove();
    if (!qs(':scope > .lb-sheet', UI.panel)) { UI.panel.classList.remove('sheeted'); if (UI.sheetNeed) { UI.sheetNeed = 0; floorSoon(); } camBackSoon(); }
  }
  // 浮在舞台下緣的小面板（來客的頭像、箱子、試聽機、包包、配件）
  function floatSheet(html, cls) {
    qsa('.lb-sheet.float', app()).forEach(function (s) { s.remove(); });
    var s = el('div', 'lb-sheet float' + (cls ? ' ' + cls : ''), html);
    s.addEventListener('click', stopEv);
    guardClicks(s);
    bindInfoTaps(s);
    app().appendChild(s);
    s.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('[data-a=close]')) { s.remove(); syncFloat(); if (BGM.zone) bgmResume(); } });   // 第 I 波：試聽機、收音機面板關掉＝沒歌在放就接回輪播
    syncFloat();
    if (!UI.floatMo && W.MutationObserver) { UI.floatMo = new MutationObserver(syncFloat); UI.floatMo.observe(app(), { childList: true }); }
    focusFirst(s);
    return s;
  }
  function syncFloat() { D.body.classList.toggle('lb-float-open', !!qs(':scope > .lb-sheet.float', app())); }
  function playingTag() {
    var f = FX(); var on = !!(f && f.music && f.music.playing && f.music.playing());
    return on ? '<span class="lb-playing"><span class="rec" aria-hidden="true"></span>播放中</span>' : '';
  }
  function watchPlaying(host) {
    var f = FX(); if (!f || !f.music || !f.music.onChange || !host) return;
    var upd = function () { if (!host.isConnected) return; host.innerHTML = playingTag(); };
    upd();
    var off1 = f.music.onChange(upd), off2 = f.onSound ? f.onSound(upd) : null;
    UI.offs.push(off1); if (off2) UI.offs.push(off2);
    var iv = setInterval(upd, 1500); UI.offs.push(function () { clearInterval(iv); });
  }

  // 猜歌（O7；只亮封面、藝人、專輯，不亮星數）：封面＝唱片資訊、「是這張」＝作答；音樂不換。選完 900 ms 亮對錯
  function guessPanel(sc, ctx, beat) {
    return new Promise(function (res) {
      var ids = shuffled(TIERS.map(function (t) { return C.aces[t]; }));
      var s = sheet('<div class="hd"><h3>' + esc((beat && beat.prompt) || '') + '</h3><span class="np"></span></div>' +
        '<div class="lb-trio">' + ids.map(function (id) { return tileHTML(card(id), { stars: false, frame: false, badge: false, pick: '是這張' }); }).join('') + '</div>' +
        '<p class="note">點封面看唱片資訊。</p>', 'guess');      // R-07：試做版加的「音樂會繼續放，不會換歌。」拿掉
      watchPlaying(qs('.np', s));
      var done = false;
      s.addEventListener('click', function (e) {
        var t = e.target.closest && e.target.closest('.lb-ct'); if (!t || done) return;
        done = true;
        var id = t.getAttribute('data-cid'), right = id === ctx.tonightId;
        qsa('.lb-ct', s).forEach(function (x) { var xid = x.getAttribute('data-cid'); x.classList.toggle('right', xid === ctx.tonightId); x.classList.toggle('wrong', xid !== ctx.tonightId && xid === id); });
        sfx(right ? 'readHit' : 'tick');
        ctx.flags.guessRight = right; ctx.flags.guessWrong = !right; ctx.guessed = tierOfCard(id);
        setTimeout(function () { closeSheet(s); res(right); }, 900 / speed());
      });
      autoAct(function () { var b = UI.auto && UI.auto.guess ? qs('.lb-ct[data-cid="' + cssEsc(UI.auto.guess === 'right' ? ctx.tonightId : ids.filter(function (x) { return x !== ctx.tonightId; })[0]) + '"] [data-pick]', s) : qs('[data-pick]', s); if (b) b.click(); });
    });
  }
  // 唱盤前（教學那條路；C.tutorial.intro）：老闆攤開猜歌那三張（三軸各 7 星），一句一句講，一句亮一條箭頭（相剋圖＝盤面那張，DipLabDuel.triSVG）。
  //   點面板任何地方＝下一句（每句出現 280 ms 內的點不算，防連點跳句）；不點也會照對白框的閱讀時間往下走。講完把最後一句留在對白框，接著遇敵
  function tutIntroPanel(sc) {
    var I = C.tutorial && C.tutorial.intro, lines = (I && I.lines) || [];
    if (!lines.length) return Promise.resolve();
    var DU = W.DipLabDuel, gloss = C.aceGloss || {};
    return new Promise(function (res) {
      var html = '<div class="lb-trio">' + TIERS.map(function (t) {
        var c = card(C.aces[t]), ax = C.aceAxis[t];
        if (!c) return '';
        return '<div class="lb-ct ax-' + ax + '" data-tier="' + t + '">' + coverHTML(c, { info: false, badge: false }) +
          '<div class="ar">' + esc(c.artist) + '</div><div class="al one">' + esc(c.album) + '</div>' +
          '<div class="axl"><b class="' + ax + '">' + ZH[ax] + ' 7</b></div>' + (gloss[t] ? '<div class="gl">' + esc(gloss[t]) + '</div>' : '') + '</div>';
      }).join('') + '</div>' +
        '<div class="row"><div class="tri3" aria-hidden="true"></div>' +
        '<button type="button" class="say"><span class="nm">' + esc((I && I.who) || '老闆') + '</span><span class="tx"></span><span class="nx" aria-hidden="true">▼</span></button></div>';
      var s = sheet(html, 'tutintro');
      var tri = qs('.tri3', s), tx = qs('.say .tx', s), k = -1, at = 0, timer = 0, done = false;
      function show() {
        var L = lines[k], on = [].concat(L.tri || []);
        tx.innerHTML = (String(L.text || '').match(/[^，。！？]+[，。！？」]*/g) || []).map(function (g) { return '<span class="sg">' + esc(g) + '</span>'; }).join('');   // 只在標點後面換行
        if (tri) tri.innerHTML = DU && DU.triSVG ? DU.triSVG(on, 'lbti') : '';
        // 亮哪幾張：lit 'all'＝三張各亮自己那一色；一條箭頭＝那兩張亮、第三張淡
        var lit = L.lit === 'all' || on.length !== 1 ? ATTRS.slice() : [on[0][0], on[0][1]];
        qsa('.lb-ct', s).forEach(function (x) { var ax = C.aceAxis[x.getAttribute('data-tier')]; x.classList.toggle('lit', lit.indexOf(ax) >= 0); x.classList.toggle('dim', lit.indexOf(ax) < 0); });
        at = now();
        clearTimeout(timer);
        timer = setTimeout(next, Math.min(6500, 1400 + 140 * (L.text || '').length) / speed());
        autoAct(next, 160);
      }
      function next() {
        if (done) return;
        if (++k >= lines.length) {
          done = true; clearTimeout(timer);
          // 最後一句留在對白框（面板收掉後不要閃回 O21 那句），直到盤面滑進來
          var dq = sc && sc.dq; if (dq) { var nm = qs('.nm', dq), t2 = qs('.tx', dq); if (nm) nm.textContent = (I && I.who) || '老闆'; if (t2) t2.textContent = lines[lines.length - 1].text || ''; dq.classList.remove('narr', 'foe', 'boss'); }
          closeSheet(s); res(); return;
        }
        if (k > 0) sfx('tick');
        show();
      }
      s.addEventListener('click', function () { if (done || now() - at < 280) return; next(); });
      next();
      roomForSheet(s);
    });
  }
  // 挑王牌（O9；再挑戰一趟）：三張王牌（經典流・經 7…）；點封面下面那行＝選、封面＝唱片資訊、「就這張」確認。不切歌（D §2：音樂播到私人收藏那句說完）
  //   預設選中＝猜歌時選的那張（猜對＝今晚那張）
  //   解鎖制（店主 11-16）：ctx.open＝能挑的派（沒給＝三派；新玩家第一次挑＝初始流派）；鎖住的派封面灰掉、下面那行換成鎖頭＋「打倒傳說藏家解鎖」，點了只說明、不選。
  //   ctx.noTut＝不是序章那一趟（跳過序章的新存檔三選一）：不寫「教學這場照舊 7 星」
  //   審查 11-16：序章 O9 新玩家第一次挑（ctx.noTut 沒設、一派都還沒解鎖）＝說明那行最後多一行「挑了就是初始流派…」；
  //   ctx.cancel＝標題多一顆 ✕（跳過序章的新存檔三選一：這一下會定下初始流派，按錯可以退回標題）→ 回 null
  function acePickPanel(sc, ctx, beat) {
    if (UI.fac && FAC()) return facPickPanel(sc, ctx, beat);   // 第 D 波棒二（?fac=1）：三張派系卡（SPEC-D §3.9）；旗標關照舊三選一
    return new Promise(function (res) {
      var open = (ctx.open || TIERS).filter(function (t) { return TIERS.indexOf(t) >= 0; }); if (!open.length) open = TIERS.slice();
      var first = !unlockedNow().length;                // 一派都還沒解鎖＝新帳號第一次挑（＝初始流派）
      var fresh = !ctx.noTut && first;                   // 序章新玩家第一次挑＝初始流派
      // 第 D 波（SPEC-D §3.9、§14-1 建議 B）：第一次挑派、沒猜中今晚那張＝預設停在冷門流（經典流送的牌前期最難）；猜中照舊停在猜中那派
      var sel = first ? ((ctx.flags && ctx.flags.guessRight && ctx.guessed) || 'pearl') : (ctx.guessed || ctx.defaultTier || 'hall');
      if (open.indexOf(sel) < 0) sel = open.indexOf(save.lastAce) >= 0 ? save.lastAce : open[0];   // 猜中的／今晚那派還鎖著：預設選你解鎖的
      var NB = first ? (C.aceNewbie || {}) : {};         // 新手推薦標（冷門「新手推薦」、經典「前期較難」、異端不標；只在第一次挑）
      var html = '<div class="hd"><h3>' + esc((beat && beat.prompt) || '') + '</h3><span class="np"></span>' +
        (ctx.cancel ? '<button type="button" class="x" data-a="close" aria-label="關閉">✕</button>' : '') + '</div><div class="lb-trio">' +
        TIERS.map(function (t) {
          var c = card(C.aces[t]), ax = C.aceAxis[t], lk = open.indexOf(t) < 0;
          return tileHTML(c, { sel: t === sel, cls: lk ? 'locked' : '', stars: false, text: false, badge: false, data: 'data-tier="' + t + '"' + (lk ? ' data-locked="1"' : ''),      // 名號寫在下面那行，封面角不再蓋標（V13：異端標蓋住 SWANS）
            extra: (lk ? '<span class="lockov" aria-hidden="true">' + lockIcon(22) + '</span>' : '') +
              (NB[t] && !lk ? '<span class="nbtag ' + t + '">' + esc(NB[t]) + '</span>' : '') +
              '<button type="button" class="acex"' + (lk ? ' aria-disabled="true"' : '') + '><span class="' + ax + '">' + esc(C.aceTitle[t]) + '・' + ZH1[ax] + ' 7</span>' +
              (lk ? '<span class="al one lockt">' + lockIcon(11) + esc(TU('aceLocked')) + '</span>' : '<span class="al one">' + esc(c.album) + '</span>') + '</button>' });
        }).join('') + '</div><p class="note detail"></p><div class="foot"><button type="button" class="lb-btn pri big wide key" data-a="ok">就這張</button></div>';
      var s = sheet(html, 'acepick');
      // 焦點放在「就這張」：不要讓第一行名號（經典流）的焦點框跟選中的那張同時亮（V01 兩個框）
      var okb = qs('[data-a=ok]', s); if (okb) try { okb.focus({ preventScroll: true }); } catch (_) {}
      watchPlaying(qs('.np', s));
      var det = qs('.detail', s);
      function mark(peek) {
        qsa('.lb-ct', s).forEach(function (x) { x.classList.toggle('sel', x.getAttribute('data-tier') === sel); x.classList.toggle('peek', x.getAttribute('data-tier') === peek); });
        if (peek) { det.innerHTML = '<span class="lockt">' + lockIcon(12) + esc(TU('aceLockedNote', tierVars(peek))) + '</span>'; return; }   // 點了鎖住的那派：只說明
        var c = card(C.aces[sel]), ax = C.aceAxis[sel];
        var gl = (C.aceGloss || {})[sel];   // 括號裡白話講這軸 7 星是什麼（店主 11-12）
        det.innerHTML = '<b>' + esc(C.aceTitle[sel]) + '</b>：' + esc(c.artist + '《' + c.album + '》') + '。<b class="' + ax + '">' + ZH[ax] + ' 7</b>' + (gl ? esc('（' + gl + '）') : '') + '，一場用一次' + (!first && aceEncLine(sel) ? esc(EU('exc')) : '') + '。' +   // 第 I 波修正輪：下面接翻面那行時寫「（翻面例外）」
          (UI.apex && !ctx.noTut ? '<span class="apx-tut">' + esc(AU('tag')) + '・' + esc(AU('tutNote')) + '</span>' : '') +   // 頂點卡試做：教學那場照舊 7 星（FRAME 1.6），寫明
          (fresh ? '<span class="lockt fp">' + lockIcon(11) + esc(TU('firstPickNote')) + '</span>' : '') +   // 這一挑定下初始流派，其他兩派要打倒傳說藏家（審查 11-16）
          (!first && aceEncLine(sel) ? '<span class="enc" data-tut="enc-pick">' + esc(aceEncLine(sel)) + '</span>' : '');   // 第 I 波翻面（新玩家第一次挑不寫）
      }
      mark();
      roomForSheet(s);                   // 三張＋名號＋說明那行＋「就這張」：舞台讓出放得下的高，不用在面板裡捲（V01）。說明那行先填好再量（矮螢幕它沒有最小高，空著量＝0；V5-play-7）
      var done = false;
      s.addEventListener('click', function (e) {
        if (done) return;
        var t = e.target.closest && e.target.closest('.lb-ct');
        if (t && !(e.target.closest('[data-a=ok]'))) {
          var tier = t.getAttribute('data-tier');
          if (open.indexOf(tier) < 0) { sfx('tick'); mark(tier); return; }      // 鎖住的派：不選，說明怎麼解鎖
          if (tier === sel) { mark(); return; }
          sel = tier; sfx('select'); mark();
          return;
        }
        if (e.target.closest && e.target.closest('[data-a=ok]')) { done = true; sfx('select'); closeSheet(s); ctx.acePicked = true; res(sel); }
        else if (ctx.cancel && e.target.closest && e.target.closest('[data-a=close]')) { done = true; sfx('tick'); closeSheet(s); res(null); }
      });
      autoAct(function () {
        if (UI.auto && UI.auto.ace && UI.auto.ace !== sel) { var b0 = qs('.lb-ct[data-tier="' + UI.auto.ace + '"] .acex', s); if (b0) b0.click(); }
        var b = qs('[data-a=ok]', s); if (b) b.click();
      }, 260);
    });
  }
  // 開局派系卡（第 D 波棒二 ?fac=1；SPEC-D §3.9）：三張派系卡——本派王牌封面（?apex=1＝上次挑的那張）＋「經典流・比」＋軸 → 一句定位 → 被動（黑）＋代價（灰）
  //   → 送的四張縮圖 →「熟練 Lv3・最遠第 34 位」。≥390 寬三欄縮小版、點哪張選哪張；375 寬（放不下三欄）一次一張、左右滑＋下方三個點，滑到哪張選哪張。
  //   鎖住的派：卡片灰、鎖頭、「打倒傳說藏家解鎖」，點了（滑到）只說明、「就這一派」按不下去。新手推薦標、第一次挑派預設停冷門、ctx.cancel／noTut 照 acePickPanel。
  //   class 照舊（.lb-sheet.acepick、.lb-ct[data-tier]、.acex、[data-a=ok]、.detail）：e2e 的 prologueToDuel、autoAct 不用改
  function facPickPanel(sc, ctx, beat) {
    return new Promise(function (res) {
      var open = (ctx.open || TIERS).filter(function (t) { return TIERS.indexOf(t) >= 0; }); if (!open.length) open = TIERS.slice();
      var first = !unlockedNow().length, fresh = !ctx.noTut && first;
      var sel = first ? ((ctx.flags && ctx.flags.guessRight && ctx.guessed) || 'pearl') : (ctx.guessed || ctx.defaultTier || 'hall');
      if (open.indexOf(sel) < 0) sel = open.indexOf(save.lastAce) >= 0 ? save.lastAce : open[0];
      var NB = first ? (C.aceNewbie || {}) : {};
      var cardHTML = function (t) {
        var D0 = facDef(t) || {}, aid = (UI.apex && lastAceIdFor(t)) || C.aces[t], c = card(aid) || card(C.aces[t]), ax = C.aceAxis[t], lk = open.indexOf(t) < 0;
        if (!c) return '';
        var gifts = (C.gifts[t] || []).map(function (id) { return coverHTML(card(id), { info: false, badge: false }); }).join('');
        return '<div class="lb-ct fxc' + (t === sel ? ' sel' : '') + (lk ? ' locked' : '') + '" data-cid="' + esc(c.id) + '" data-tier="' + t + '"' + (lk ? ' data-locked="1"' : '') + '>' +
          '<div class="fx-cv">' + coverHTML(c, { badge: false }) + (lk ? '<span class="lockov" aria-hidden="true">' + lockIcon(22) + '</span>' : '') +
            (NB[t] && !lk ? '<span class="nbtag ' + t + '">' + esc(NB[t]) + '</span>' : '') + '</div>' +
          '<div class="fx-tx"><button type="button" class="acex"' + (lk ? ' aria-disabled="true"' : '') + '><span class="fx-nm ' + ax + '">' + esc((C.aceTitle[t] || '') + '・' + ((C.aceIcon || {})[t] || '')) + '</span>' +
              '<span class="fx-ax ' + ax + '">' + ZH1[ax] + ' 7</span></button>' +
            (lk ? '<span class="fx-lk lockt">' + lockIcon(11) + esc(TU('aceLocked')) + '</span>' : '') +
            '<p class="fx-tag">' + facNw(D0.tagline) + '</p>' +
            '<p class="fx-pas"><b>' + esc(FU('passive')) + '</b>' + facNw(D0.passive) + '</p>' +
            '<p class="fx-cost"><b>' + esc(FU('cost')) + '</b>' + facNw(D0.cost) + '</p></div>' +
          '<div class="fx-ft"><span class="fx-gift" aria-hidden="true">' + gifts + '</span><span class="fx-prof">' + esc(facProfLine(t)).split('・').map(function (x, i, a) { return '<span class="nw">' + x + (i < a.length - 1 ? '・' : '') + '</span>'; }).join('') + '</span></div>' +
        '</div>';
      };
      var html = '<div class="hd"><h3>' + esc((beat && beat.prompt) || '') + '</h3><span class="np"></span>' +
        (ctx.cancel ? '<button type="button" class="x" data-a="close" aria-label="關閉">✕</button>' : '') + '</div>' +
        '<div class="fx-rail">' + TIERS.map(cardHTML).join('') + '</div>' +
        '<div class="fx-dots">' + TIERS.map(function (t) { return '<button type="button" data-dot="' + t + '" aria-label="' + esc(C.aceTitle[t] || '') + '"><i></i></button>'; }).join('') + '</div>' +
        '<p class="note detail" hidden></p><div class="foot"><button type="button" class="lb-btn pri big wide key" data-a="ok">' + esc(FU('pickGo') || '就這張') + '</button></div>';
      var s = sheet(html, 'acepick fac');
      var okb = qs('[data-a=ok]', s); if (okb) try { okb.focus({ preventScroll: true }); } catch (_) {}
      watchPlaying(qs('.np', s));
      var rail = qs('.fx-rail', s), det = qs('.detail', s), peekT = null, syncTill = 0;
      var narrow = function () { return rail.scrollWidth > rail.clientWidth + 4; };   // 375：一次一張（style.css ≤389px）
      var cardOf = function (t) { return qs('.lb-ct[data-tier="' + t + '"]', rail); };
      // 一次一張時：滑到哪張（卡片中心最靠近軌道中心的那張）
      var shown = function () {
        var rr = rail.getBoundingClientRect(), mid = rr.left + rr.width / 2, best = null, bd = 1e9;
        TIERS.forEach(function (t) { var e = cardOf(t); if (!e) return; var b = e.getBoundingClientRect(), dd = Math.abs(b.left + b.width / 2 - mid); if (dd < bd) { bd = dd; best = t; } });
        return best;
      };
      var showCard = function (t, smooth) {
        var e = cardOf(t); if (!e || !narrow()) return;
        syncTill = now() + (smooth ? 500 : 120);
        var left = e.offsetLeft - (rail.clientWidth - e.offsetWidth) / 2;
        try { rail.scrollTo({ left: left, behavior: smooth && !rm() ? 'smooth' : 'auto' }); } catch (_) { rail.scrollLeft = left; }
      };
      function mark() {
        qsa('.lb-ct', rail).forEach(function (x) { var t = x.getAttribute('data-tier'); x.classList.toggle('sel', t === sel); x.classList.toggle('peek', t === peekT); x.setAttribute('aria-current', t === sel ? 'true' : 'false'); });
        var vis = narrow() ? (peekT || sel) : null;
        qsa('.fx-dots [data-dot]', s).forEach(function (b) { var t = b.getAttribute('data-dot'); b.classList.toggle('on', t === vis); b.classList.toggle('lk', open.indexOf(t) < 0); });
        var nw = narrow();
        // 點了鎖住的那派：說明怎麼解鎖（一次一張時卡上已經寫了「打倒傳說藏家解鎖」、大鈕按不下去，說明那行不再長出來＝面板不變高）
        var tx = peekT ? (nw ? '' : '<span class="lockt">' + lockIcon(12) + esc(TU('aceLockedNote', tierVars(peekT))) + '</span>')
          : (UI.apex && !ctx.noTut ? '<span class="apx-tut">' + esc(AU('tag')) + '・' + esc(AU('tutNote')) + '</span>' : '') +
            (fresh ? '<span class="lockt fp">' + lockIcon(11) + esc(TU('firstPickNote')) + '</span>' : '') +
            (!first && !UI.apex && aceEncLine(sel, true) ? '<span class="enc" data-tut="enc-pick">' + esc(aceEncLine(sel, true)) + '</span>' : '');   // 第 I 波修正輪：翻面那行（異端 ?fac=1 換條件；新玩家第一次挑不寫）
        det.innerHTML = tx; det.hidden = !tx;
        okb.classList.toggle('off', !!peekT && nw);              // 一次一張、滑到鎖住的那派：大鈕按不下去（按了只響一下）
        okb.setAttribute('aria-disabled', okb.classList.contains('off') ? 'true' : 'false');
      }
      // 讓高（棒二測試 e2e-fac #1b）：roomForSheet 的 reward／full 鏡頭舞台最矮約 230–234 px，面板要 vh−32−234～vh−32−210 那一段（390×664 換派、熟練那行沒折行＝415）
      //   讓不出來、面板捲 13 px＝跟 apexPickPanel 的 fit() 一樣收成對決那條（面板照內容高）
      function fit() {
        roomForSheet(s);
        var vh = W.visualViewport ? Math.min(W.innerHeight, W.visualViewport.height) : W.innerHeight, nat = Math.ceil(naturalH(s) + 4);
        if (UI.camName !== 'strip' && vh - 32 - nat < 240) cam('strip', 'reward', 380, null, nat);
      }
      function pick(t, quiet) {
        if (open.indexOf(t) < 0) { if (peekT !== t) { peekT = t; if (!quiet) sfx('tick'); mark(); if (s.scrollHeight > s.clientHeight + 1) fit(); } return; }   // 鎖住的派：不選，說明怎麼解鎖（說明那行長出來放不下＝再讓一次高）
        var was = sel; peekT = null; sel = t;
        if (was !== t && !quiet) sfx('select');
        mark();
      }
      mark();
      fit();                                // 三欄（或一張）＋說明＋大鈕：舞台讓出放得下的高（同 acePickPanel）
      later(function () { if (s.isConnected) { showCard(sel, false); mark(); } }, 0);
      var scT = 0;
      rail.addEventListener('scroll', function () {
        if (!narrow()) return;
        clearTimeout(scT);
        scT = setTimeout(function () { if (!s.isConnected || now() < syncTill) return; var t = shown(); if (t && t !== (peekT || sel)) pick(t, false); }, 90);
      }, { passive: true });
      var done = false;
      s.addEventListener('click', function (e) {
        if (done) return;
        var dot = e.target.closest && e.target.closest('[data-dot]');
        if (dot) { var dt = dot.getAttribute('data-dot'); pick(dt, false); showCard(dt, true); return; }
        var c0 = e.target.closest && e.target.closest('.lb-ct');
        if (c0 && rail.contains(c0)) { var t = c0.getAttribute('data-tier'); pick(t, false); showCard(t, true); return; }
        if (e.target.closest && e.target.closest('[data-a=ok]')) {
          if (okb.classList.contains('off')) { sfx('tick'); return; }
          done = true; sfx('select'); closeSheet(s); ctx.acePicked = true; res(sel); return;
        }
        if (ctx.cancel && e.target.closest && e.target.closest('[data-a=close]')) { done = true; sfx('tick'); closeSheet(s); res(null); }
      });
      autoAct(function () {
        if (UI.auto && UI.auto.ace && UI.auto.ace !== sel) { var b0 = qs('.lb-ct[data-tier="' + UI.auto.ace + '"] .acex', s); if (b0) b0.click(); }
        var b = qs('[data-a=ok]', s); if (b) b.click();
      }, 260);
    });
  }
  // ======================================================================= 第 D 波棒二：三流派（?fac=1；scratchpad v5/wave-d SPEC-D §3.2–§3.5、§3.9–§3.10、§6-3；介面契約 build2/CONTRACT.md）
  //   旗標只看網址（UI.fac）→ createRun 多傳 fac:true；之後一切跟著 run.fac 走（存在 run 裡：沒開旗標的頁面續玩照樣生效＝R-F9）。
  //   畫面：標題旗標章、開局派系卡（facPickPanel）、升級面板第 4 格（levelPanel）、我的狀態一行（meSheet）、對決頂欄一字圖示＋本派說明（facInfo）、
  //   結果行第一次觸發那句（duelHooks.facFirst）、?fac=1&apex=1 換過能力的頂點卡（apexPickPanel、cardinfo）。
  //   旗標關、run 沒有 fac：這一段的函式不是沒被叫，就是回 null／空字串（畫面一字不變）
  function FAC() { return E && typeof E.facCfg === 'function' ? E.facCfg(C) : null; }
  function FU(k, o) { var F = FAC(), U = (F && F.ui) || {}; return fill(U[k] || '', o); }
  function facBoot() {
    UI.fac = QS.fac === '1' && !!FAC() && typeof E.facFxOf === 'function';
    // 第一次觸發被動或代價那手的老闆小提示（tutorial.js 照 C.coachTips 找字；duel.js 只在有派別的對決送 tip_fac）
    if (FAC() && FU('firstTip')) { if (!C.coachTips) C.coachTips = {}; if (!C.coachTips.tip_fac) C.coachTips.tip_fac = FU('firstTip'); }
  }
  function facDef(t) { var F = FAC(); return F && TIERS.indexOf(t) >= 0 && F[t] && typeof F[t] === 'object' ? F[t] : null; }
  function facPickOf(t, id) { var D0 = facDef(t); return D0 && Array.isArray(D0.picks) ? D0.picks.filter(function (x) { return x && x.id === id; })[0] || null : null; }
  // 這一趟拿過的本派選項（名字）：照 content 的順序
  function facMine(r) {
    var D0 = r && r.fac && facDef(r.ace), got = (r && r.fac && r.fac.picks) || {};
    return D0 ? (D0.picks || []).filter(function (x) { return x && got[x.id] > 0; }).map(function (x) { return x.name; }) : [];
  }
  // 流派說明字（派系卡、本派說明、升級第 4 格）：數字連前面兩個字、單位、句尾標點包成不折行（「回 2 聲望。」「多扣 1，」「最多 2。」「經典 +1 星」；審查 棒二 斷行）
  function facNw(s) { return esc(s || '').replace(/([\u4e00-\u9fff]{1,2} ?)?[+−]?\d+( ?(聲望|星數|星|位|次))?[。，、；]?/g, function (m) { return '<span class="nw">' + m + '</span>'; }); }
  function facMineLine(r) { var m = facMine(r); return m.length ? FU('mine', { list: m.join('、') }) : FU('mineNone'); }
  // 派系卡最下面那行：「熟練 Lv3・最遠第 34 位」（最遠＝這一派打過最遠的那一趟；還沒打過＝只寫熟練）
  function facProfLine(t) {
    var lv = 1; try { lv = E.profLevel(C, ((save.career && save.career.prof) || {})[t]).level; } catch (_) {}
    var far = 0; (save.runs || []).forEach(function (x) { if (x && x.ace === t && (x.reached | 0) > far) far = x.reached | 0; });
    return FU(far ? 'profFar' : 'profOnly', { n: lv, far: far });
  }
  // ======================================================================= 第 I 波 I-1「翻面」（王牌條件加成；SPEC-I §1.6；契約 wave-i/build1/CONTRACT.md）
  //   字一律 C.encore.ui（店主 11-20 改名：玩家看得到的不寫「安可」）。對決裡的籤、金框、結果句那行在 duel.js；這裡管吐司、老闆第一次那句、領獎小字、說明句
  function EU(k, o) { var U = (C.encore && C.encore.ui) || {}; return fill(U[k] || '', o); }
  function encOn() { return !!(C.encore && C.encore.on !== false && typeof E.encoreLine === 'function'); }
  // 7 星王牌的說明句（挑王牌面板、唱片資訊）：「翻面：丟出之後看穿他一次，王牌回到手上（6 星）。」；fac＝這一趟開 ?fac=1（異端換連剋）
  function aceEncLine(tier, fac) { if (!encOn()) return ''; try { return E.encoreLine(C, E.aceEncoreOf(C, tier, !!fac), { ace: true }); } catch (_) { return ''; } }
  // 頂點卡的說明句（挑王牌面板）：abilityOf／apexAbilityOf 的複本帶 encore
  function apexEncLine(A) { if (!encOn() || !A || !A.encore) return ''; try { return E.encoreLine(C, A.encore); } catch (_) { return ''; } }
  // 吐司「翻面！《OK Computer》可以再丟一次」：停 3 秒（真實時間，不吃加速：字要停得夠久）、點了就收；同一時間只有一顆
  function encToast(text) {
    if (!text) return null;
    qsa('.lb-toast.enc', app()).forEach(function (x) { x.remove(); });
    var t = el('div', 'lb-toast enc', esc(text).replace(/(《[^》]*》)/, '<span class="nw">$1</span>'));
    t.setAttribute('role', 'status'); t.dataset.tut = 'enc-toast';
    var gone = false, out = function () { if (gone) return; gone = true; t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); };
    t.addEventListener('click', function (e) { stopEv(e); out(); });
    app().appendChild(t);
    setTimeout(out, 3000);
    return t;
  }
  // 翻面成立那手揭曉收起之後（duel.js hooks.encore）：王牌／能力回來了＝吐司；這場已經打完（留到下一位）＝不出（領獎畫面寫）。
  //   第一次（save.seen.encore）老闆說一句。教學重看、假的 run 不管
  //   老闆小提示（#tutTip；第一次丟王牌那句常常就在同一手）也在舞台那條：等它收掉才出吐司，不疊字；老闆第一次那句排在吐司收掉之後
  function encoreAfter(p, ev, o) {
    if (!ev || p.fakeRun || UI.tutReplay) return;
    var d = p.res && p.res.duel, toast0 = !o.over && ev.give === 'again' ? EU('toast', { album: o.album || '', verb: o.verb || '' }) : '';
    var first = save.seen && !save.seen.encore && EU('first') ? EU('first') : '';   // 說出口了才記（這場剛好打完、換畫面了＝下次再說）
    var t0 = Date.now(), alive = function () { return UI.screen === 'duel' && save.run && (!d || save.run.duel === d || (UI.duelLab && UI.duelLab.duel === d)); };
    var tipOn = function () { var b = D.querySelector('#tutTip .tut-tip'); return !!(b && !b.hidden); };
    var phase = function () { try { var X = DUEL(), g = X && X.debug && X.debug(); return g ? g.phase : null; } catch (_) { return null; } };
    //   小提示會一則接一則（收掉 400 ms 後下一則）：要安靜 600 ms 以上才算沒了；最多等 16 秒。等到的時候王牌／能力已經又用掉了＝吐司不出（字會是錯的）
    var chose = 0, quietAt = 0;                      // 換到挑牌（小提示只在挑牌時出：tutorial.js pumpTips）之後再等，看它有沒有排上來
    var still = function () { var q = d && d.p && d.p.enc; return !d || !q || q.state === 'hit'; };
    var go = function () {
      if (!alive()) return;
      var ph = phase(), now = Date.now(), late = now - t0 > 16000;
      if (!late && ph && ph !== 'choose' && ph !== 'over') { UI.timers.push(setTimeout(go, 150)); return; }
      if (!late && ph === 'choose' && !chose) { chose = now; quietAt = now; UI.timers.push(setTimeout(go, 350)); return; }
      if (tipOn()) quietAt = 0; else if (!quietAt) quietAt = now;
      if (!late && (!quietAt || now - quietAt < 600)) { UI.timers.push(setTimeout(go, 200)); return; }
      if (toast0 && still()) encToast(toast0);
      if (first) UI.timers.push(setTimeout(function () { if (!alive() || save.seen.encore) return; save.seen.encore = true; persist(); stageSay('o', first, 'owner', 2800); }, toast0 ? 3200 : 0));
    };
    UI.timers.push(setTimeout(go, 200));
  }
  // 領獎畫面（戰利品列、舊的領獎面板）標題列下面一行金色小字「翻面留到下一位」：這一趟有留下來的翻面（run.encCarry）才有；停著、不另跳
  function encCarryHd(html) {
    var r = save.run;
    if (!r || !r.encCarry || !encOn() || !EU('carry')) return html;
    var tag = '<p class="lb-enccarry" data-tut="enc-carry">' + esc(EU('carry')) + '</p>';
    var k = html.indexOf('</div>');               // 第一個 </div>＝標題列 .hd 收尾
    return k >= 0 && /^<div class="hd">/.test(html) ? html.slice(0, k + 6) + tag + html.slice(k + 6) : tag + html;
  }

  // 結果行第一次觸發那句（SPEC-D §3.2；CONTRACT §2）：這一派第一次有被動或代價觸發的那手＝C.factions[派].first（記 save.seen.facFirst[派]）
  function facFirstLine(p, cl) {
    var d = p && p.res && p.res.duel, t = d && d.p && d.p.fac, D0 = facDef(t);
    if (!D0 || !D0.first || !cl || !cl.fac || !Object.keys(cl.fac).length || p.fakeRun || UI.tutReplay) return null;
    if (!save.seen.facFirst || typeof save.seen.facFirst !== 'object' || Array.isArray(save.seen.facFirst)) save.seen.facFirst = {};
    if (save.seen.facFirst[t]) return null;
    save.seen.facFirst[t] = 1; persist();
    return D0.first;
  }
  // 對決頂欄的一字圖示（比／借／拆；SPEC-D §3.10）：有派別的對決才有；點了＝本派說明（facInfo）
  function facChipHTML(d) {
    var t = d && d.p && d.p.fac, D0 = facDef(t); if (!D0) return '';
    var ax = (C.aceAxis || {})[t] || '';
    return '<button type="button" class="ti fac ' + esc(ax) + '" data-a="fac" data-tut="fac" aria-label="' + esc(FU('infoTitle', { name: D0.name || '', icon: D0.icon || '' })) + '"><span class="fi">' + esc(D0.icon || '') + '</span></button>';
  }
  // 本派說明（對決中：彈窗，盤面 hold）：標題「經典流・比」、被動（黑）、代價（灰）、本派選項、這場第二招還剩幾（view(duel).fac.left）
  function facInfo(d) {
    var v = null; try { v = d ? E.view(d) : null; } catch (_) { v = null; }
    var f = v && v.fac, D0 = f && facDef(f.tier); if (!D0) return;
    var r = save.run, left = f.left || {}, rows = [];
    if (left.leech != null) rows.push(FU('leftLeech', { n: left.leech }));
    if (left.thorn != null) rows.push(FU('leftThorn', { n: left.thorn }));
    var ax = (C.aceAxis || {})[f.tier] || '';
    // 審查 棒二：本派選項改掉代價（有人記得＝被剋不多扣、爆擊＝比星輸不多扣）→ 代價那行劃掉、標「已取消」（看這場的 fx，不是派別原文）；
    //   拿過的本派選項逐項列「名字：說明」（加多扣、回更多、每場第一次不扣…照實寫，不再只列名字）
    var fx = f.fx || {}, fx0 = D0.fx || {}, costOff = ['tieCost', 'counteredCost', 'loseCost'].some(function (k) { return fx0[k] > 0 && !(fx[k] > 0); });
    var mine = r && r.fac && r.duel === d ? (D0.picks || []).filter(function (x) { return x && ((r.fac.picks || {})[x.id] > 0); }) : null;
    var html = '<h2><span class="fi ' + esc(ax) + '">' + esc(D0.icon || '') + '</span>' + esc(FU('infoTitle', { name: D0.name || '', icon: D0.icon || '' })) + '</h2>' +
      (D0.tagline ? '<p class="fx-tag">' + facNw(D0.tagline) + '</p>' : '') +
      '<p class="fx-pas"><b>' + esc(FU('passive')) + '</b>' + facNw(D0.passive) + '</p>' +
      '<p class="fx-cost' + (costOff ? ' off' : '') + '"><b>' + esc(FU('cost')) + '</b>' + (costOff ? '<s>' + facNw(D0.cost) + '</s><em>' + esc(FU('costOff')) + '</em>' : facNw(D0.cost)) + '</p>' +
      (mine ? (mine.length ? '<div class="fx-mine"><b>' + esc(FU('pickTag')) + '</b><ul>' + mine.map(function (x) { return '<li><i>' + esc(x.name) + '</i>' + facNw(x.text) + '</li>'; }).join('') + '</ul></div>'
        : '<p class="fx-mine">' + esc(FU('mineNone')) + '</p>') : '') +
      rows.map(function (x) { return '<p class="fx-left">' + esc(x) + '</p>'; }).join('');
    sfx('tick');
    modal('facinfo', html);
  }

  // ======================================================================= 頂點卡純輔助卡試做（?apex=1；scratchpad v5/apextrial FRAME 第 7 節、CONTRACT）
  //   旗標只看網址（UI.apex），不存進存檔：同一份存檔不加旗標打開＝現行 7 星王牌。旗標關時這一段只有 cardVis／poolIds 會走（把試做的 42 張當作不存在）。
  //   序章照舊（三張預設王牌 7 星教學）；序章打完、第 1 位開打前老闆說一句 → 挑王牌面板（三派 → 那派 15 張挑一張；每份存檔一次，save.seen.apexPick）；
  //   之後想換＝點老闆（同一個面板）。下一趟沿用（save.lastAceId，跟 save.lastAce 一樣）。
  function AX() { return (C && C.apexTrial) || null; }
  function AU(k, o) { var U = (AX() && AX().ui) || {}; return fill(U[k] || '', o); }
  function apexBoot() {
    UI.apexOnly = {};
    (C.apexTrialOnly || []).forEach(function (id) { UI.apexOnly[id] = true; });
    UI.apex = QS.apex === '1' && !!AX() && typeof E.apexList === 'function' && typeof E.activateApex === 'function';
    // 第 I 波修正輪：翻面開著時「王牌一場用一次」那兩則小提示換成寫了翻面例外的（C.encore.ui.tipAce／tipApex）
    if (encOn() && C.coachTips) { if (EU('tipAce')) C.coachTips.tip_ace = EU('tipAce'); }
    if (!UI.apex) return;
    // 一次性老闆小提示（tutorial.js 照 C.coachTips 找字）：旗標下多兩則（tip_apex、tip_apexMiss）
    var tips = AX().tips || {}; if (!C.coachTips) C.coachTips = {};
    Object.keys(tips).forEach(function (k) { if (!C.coachTips[k]) C.coachTips[k] = tips[k]; });
    if (encOn() && EU('tipApex')) C.coachTips.tip_apex = EU('tipApex');
  }
  // 這一趟帶的王牌（卡 id）：旗標下＝挑的那張（engine.apexAceId：沒挑過、舊存檔＝那派預設）；旗標關＝那派預設
  function aceIdOf(r) { return !r ? null : UI.apex ? E.apexAceId(r, C) : C.aces[r.ace]; }
  // 旗標關時，只有試做才用到的 42 張（C.apexTrialOnly）當作不存在：唱片櫃「認識過 m／N」、依專輯名找卡、給主站的卡池（CONTRACT 第 8 節）
  function cardVis(id) { return !!card(id) && (UI.apex || !(UI.apexOnly && UI.apexOnly[id])); }
  function poolIds() { return Object.keys(C.cards).filter(cardVis); }
  function apexPickOk(tier, id) { return !!id && TIERS.indexOf(tier) >= 0 && E.apexList(C, tier).some(function (x) { return x && x.card === id; }); }
  function lastAceIdFor(tier) { return apexPickOk(tier, save.lastAceId) && apexOwnedNow().indexOf(save.lastAceId) >= 0 ? save.lastAceId : null; }   // 解鎖制：要擁有（只認識的不算）
  // 挑王牌面板（FRAME 7.2）：標題＋「頂點卡試做」小字 → 三派分頁 → 那派 15 張封面 5×3（角上小字：這手／整場／留著）→ 藝人《專輯》／能力名・時機：說明 →「就這張」
  //   點封面＝選；按住封面＝唱片資訊（多一塊「王牌能力」）。切到別派＝換流派：下面多一行灰字「老闆送的那幾張也跟著換」。
  //   o：{tier, aceId, canSwitch, open, owned}；回 {tier, aceId}
  //   解鎖制（店主 11-16）：o.open＝能切的派（鎖住的分頁上鎖、點了只說明）、o.owned＝收到的頂點卡（沒收到的灰掉＋鎖頭，點了寫「還沒收到：打倒傳說藏家收集」、不能選）；
  //   分頁裡第二行「已收 n／15」。沒給＝舊行為（三派、15 張都能挑）
  //   審查 11-16：沒點別的時候，這派有沒收到的（或有鎖住的派）＝灰字那行寫「有鎖的還沒收到：打倒傳說藏家收集」（原本要先點一張鎖住的才看得到）；
  //   點了沒收到的那張（說明換成那張）＝大鈕寫「還是帶《選中那張》」（按下去帶的是選中那張，不是說明裡那張）；
  //   分頁兩行的 class 用 cnt2（原本的 two 撞到 .lb-sheet .two 的通用規則 display:flex;gap:8px，字頂出框線）
  function apexPickPanel(o) {
    o = o || {};
    return new Promise(function (res) {
      var t0 = TIERS.indexOf(o.tier) >= 0 ? o.tier : 'hall', id0 = apexPickOk(t0, o.aceId) ? o.aceId : C.aces[t0];
      var tier = t0, sel = id0, peek = null, TM = (AX().ui && AX().ui.timing) || {};
      var open = Array.isArray(o.open) && o.open.length ? o.open.slice() : TIERS.slice(); if (open.indexOf(t0) < 0) open.push(t0);
      var owned = Array.isArray(o.owned) ? o.owned.slice() : null;
      var has = function (id) { return !owned || owned.indexOf(id) >= 0 || id === id0; };
      var tabs = o.canSwitch === false ? [t0] : TIERS;
      var html = '<div class="hd"><h3>' + esc(AU('pickTitle')) + '</h3><span class="apx-tag">' + esc(AU('tag')) + '</span></div>' +
        '<div class="apx-tabs" role="tablist">' + tabs.map(function (t) {
          var lk = open.indexOf(t) < 0, all = E.apexList(C, t).filter(function (x) { return x && card(x.card); });
          var cnt = owned && !lk ? '<span class="tc">' + esc(AU('got', { n: all.filter(function (x) { return has(x.card); }).length, total: all.length })) + '</span>' : '';   // 這派收了幾張
          return '<button type="button" class="key' + (lk ? ' locked' : '') + (cnt ? ' cnt2' : '') + '" role="tab" data-tab="' + t + '"' + (lk ? ' aria-disabled="true"' : '') + '><span class="tn">' + (lk ? lockIcon(11) : '') + esc(C.aceTitle[t]) + '</span>' + cnt + '</button>';
        }).join('') + '</div>' +
        '<div class="apx-grid" role="listbox"></div><p class="note detail apx-det"></p>' + (encOn() ? '<p class="note apx-enc" data-tut="enc-pick" role="button" tabindex="0"></p>' : '') + '<p class="note apx-sw" hidden>' + esc(TU('aceSwapSub')) + '</p>' +
        '<div class="foot"><button type="button" class="lb-btn pri big wide key" data-a="ok"></button></div>';
      var s = sheet(html, 'apxpick' + (owned ? ' unl' : ''));
      var grid = qs('.apx-grid', s), det = qs('.apx-det', s), sw = qs('.apx-sw', s), okb = qs('[data-a=ok]', s), encP = qs('.apx-enc', s);   // encP：第 I 波翻面那行
      // 第 D 波棒二（?fac=1&apex=1 同開；SPEC-D §6-3）：帶派別的 run＝照「三家換一格」換過的能力（時機、說明）；沒有 run.fac＝abilityOf 逐字照舊
      var abOf = function (cid) { var r0 = save.run; return (r0 && r0.fac && E.apexAbilityOf ? E.apexAbilityOf(C, cid, r0) : E.abilityOf(C, cid)) || null; };
      if (okb) try { okb.focus({ preventScroll: true }); } catch (_) {}
      function renderGrid() {
        grid.innerHTML = E.apexList(C, tier).map(function (x) {
          var c = card(x.card); if (!c) return '';
          var mine = has(c.id), xs = save.run && save.run.fac ? abOf(c.id) : null; if (xs) x = xs;   // 第 D 波棒二：換過的時機（角上小字）
          return '<button type="button" class="apx-c' + (mine ? '' : ' unowned') + '" role="option" data-cid="' + esc(c.id) + '" data-ab="' + esc(x.id) + '"' + (mine ? '' : ' aria-disabled="true"') +
            ' aria-label="' + esc(c.artist + '《' + c.album + '》：' + x.name + (mine ? '' : '（' + AU('notYet') + '）')) + '">' +
            coverHTML(c, { info: false, badge: false }) + (mine ? '' : '<span class="lockov" aria-hidden="true">' + lockIcon(16) + '</span>') + '<span class="tm ' + esc(x.timing) + '">' + esc(TM[x.timing] || '') + '</span></button>';
        }).join('');
      }
      // 這派有沒收到的、或有鎖住的派（灰字那行的「有鎖的還沒收到」）；大鈕裡的專輯名太長就截（鈕一行放得下）
      function anyLocked() { return !!owned && (tabs.some(function (t) { return open.indexOf(t) < 0; }) || E.apexList(C, tier).some(function (x) { return x && card(x.card) && !has(x.card); })); }
      // 留著型：說明本來就以「留著：」開頭，pickLine 又帶時機「留著」→ 去掉說明開頭那個（第 I 波修正輪）
      function holdText(A) { var t = String(A.text || ''), h = (TM.hold || '') + '：'; return A.timing === 'hold' && h.length > 1 && t.indexOf(h) === 0 ? t.slice(h.length) : t; }
      function shortAlbum(a) { a = String(a || ''); return a.length > 14 ? a.slice(0, 13) + '…' : a; }
      function mark() {
        qsa('.apx-tabs [data-tab]', s).forEach(function (b) { var on = b.getAttribute('data-tab') === tier; b.classList.toggle('on', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
        qsa('.apx-c', grid).forEach(function (b) { var id = b.getAttribute('data-cid'), on = id === sel; b.classList.toggle('sel', on); b.classList.toggle('peek', id === peek); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
        // 說明＝選中的那張；點了沒收到的那張＝那張（能力照寫，知道在收什麼）。怎麼拿／怎麼解鎖寫在換派灰字那一行（位置本來就留著，面板不長高）
        var pk = peek && peek.indexOf('tab:') === 0 ? peek.slice(4) : null, cid = peek && !pk ? peek : sel, c = card(cid) || {}, A = abOf(cid) || {};
        det.innerHTML = '<span class="ar">' + esc((c.artist || '') + '《' + (c.album || '') + '》') + '</span>' +
          '<span class="ab">' + esc(AU('pickLine', { name: '\u0001', timing: TM[A.timing] || '', text: holdText(A) })).replace('\u0001', '<b>' + esc(A.name || '') + '</b>') +
          (A.swapped ? '<small class="fx-swp">' + esc(FU('swapped')) + '</small>' : '') + '</span>';   // 第 D 波棒二：換過能力的那張補一行小字
        if (encP) { encP.textContent = apexEncLine(A); encP.classList.remove('full'); }   // 第 I 波翻面：一行（太長截斷，點了看全文）
        if (peek) { sw.innerHTML = lockIcon(11) + esc(pk ? TU('aceLockedNote', tierVars(pk)) : AU('notYet') + '：' + AU('lockCard')); sw.classList.add('lockt'); sw.classList.remove('soft'); sw.hidden = false; }
        else if (tier === t0 && anyLocked()) { sw.innerHTML = lockIcon(11) + esc(AU('lockNote')); sw.classList.add('lockt'); sw.classList.add('soft'); sw.hidden = false; }
        else { sw.textContent = TU('aceSwapSub'); sw.classList.remove('lockt'); sw.classList.remove('soft'); sw.hidden = tier === t0; }
        okb.textContent = peek && !pk ? AU('pickKeep', { album: shortAlbum((card(sel) || {}).album) }) : tier === t0 && sel === id0 ? AU('pickSame') : AU('pickGo');
      }
      // 15 張封面比一般面板高：full 鏡頭讓不出那麼多（舞台最矮約 234 px；390×664 會差 18 px 要捲）＝收成對決那條，面板照內容高，不用捲。
      //   說明三行、換派灰字一行的高在 CSS 先留好（點別張、切分頁不長高）；萬一還是比面板高（字型沒載到、字很長），再量一次讓高（審查 11-16：原本只在打開時量一次）
      function fit() {
        roomForSheet(s);
        var vh = W.visualViewport ? Math.min(W.innerHeight, W.visualViewport.height) : W.innerHeight, nat = Math.ceil(naturalH(s) + 4);
        if (UI.camName !== 'strip' && vh - 32 - nat < 240) cam('strip', 'reward', 380, null, nat);
      }
      function refit() { if (s.parentNode && s.scrollHeight > s.clientHeight + 1) fit(); }
      renderGrid(); mark();
      fit();
      // 按住封面＝唱片資訊（放開的那一下不算「選」）
      var lp = null, swallow = false;
      var lpOff = function () { if (lp) { clearTimeout(lp.h); lp = null; } };
      grid.addEventListener('pointerdown', function (e) {
        swallow = false; lpOff();
        var b = e.target.closest && e.target.closest('.apx-c'); if (!b || (e.button != null && e.button > 0)) return;
        var me = lp = { x: e.clientX, y: e.clientY, h: setTimeout(function () { if (lp !== me) return; lp = null; swallow = true; sfx('tick'); info(b.getAttribute('data-cid'), { from: 'apexPick' }); }, 450) };
      });
      grid.addEventListener('pointermove', function (e) { if (lp && (Math.abs(e.clientX - lp.x) > 10 || Math.abs(e.clientY - lp.y) > 10)) lpOff(); });
      ['pointerup', 'pointercancel'].forEach(function (k) { grid.addEventListener(k, lpOff); });
      grid.addEventListener('contextmenu', function (e) { e.preventDefault(); });
      var done = false;
      s.addEventListener('click', function (e) {
        if (done) return;
        var tb = e.target.closest && e.target.closest('[data-tab]');
        if (tb) {
          var t = tb.getAttribute('data-tab');
          if (open.indexOf(t) < 0) { peek = 'tab:' + t; sfx('tick'); mark(); refit(); return; }   // 鎖住的派：不切，說明怎麼解鎖
          if (t === tier) { if (peek) { peek = null; mark(); } return; }
          tier = t; peek = null; sel = t === t0 ? id0 : C.aces[t]; sfx('select'); renderGrid(); mark(); refit(); return;
        }
        var cb = e.target.closest && e.target.closest('.apx-c');
        if (cb) {
          if (swallow) { swallow = false; return; }
          var id = cb.getAttribute('data-cid');
          if (!has(id)) { peek = id; sfx('tick'); mark(); refit(); return; }                        // 沒收到的：不選，說明怎麼拿
          if (id === sel && !peek) return;
          sel = id; peek = null; sfx('select'); mark(); refit(); return;
        }
        if (encP && e.target.closest && e.target.closest('.apx-enc')) { encP.classList.toggle('full'); refit(); return; }   // 第 I 波翻面那行：截斷的點了看全文
        if (e.target.closest && e.target.closest('[data-a=ok]')) { done = true; lpOff(); sfx('select'); closeSheet(s); res({ tier: tier, aceId: sel }); }
      });
      autoAct(function () {
        var want = UI.auto && UI.auto.apexId;
        if (want && want !== sel) { var wt = TIERS.filter(function (t) { return apexPickOk(t, want); })[0]; if (wt && wt !== tier) { var tb0 = qs('[data-tab="' + wt + '"]', s); if (tb0) tb0.click(); } var b0 = qs('.apx-c[data-cid="' + cssEsc(want) + '"]', s); if (b0) b0.click(); }
        var b = qs('[data-a=ok]', s); if (b) b.click();
      }, 260);
    });
  }
  // 換王牌（旗標下；點老闆、或第一次開旗標時自動跳）：同一派換另一張＝只換王牌（送的四張不動）；換派＝送的四張跟著換（engine.switchAce）。
  //   挑的那張記成「認識」（頂點卡只展示）；下一趟沿用（save.lastAce／lastAceId）
  function apexSwapFlow(first) {
    var r = save.run;
    if (!r || UI.going || !E.canSwitchAce(r, C)) return;
    UI.going = true;
    var fromT = r.ace, fromId = aceIdOf(r), ch = choicesOf(r);
    apexPickPanel({ tier: fromT, aceId: fromId, open: ch.tiers, owned: ch.apex }).then(function (pick) {   // 解鎖制：鎖住的派、沒收到的頂點卡上鎖（engine.aceChoices）
      UI.going = false;
      if (save.run !== r || UI.screen !== 'night') return;
      var res = pick && (pick.tier !== fromT || pick.aceId !== fromId) ? E.switchAce(r, C, pick.tier, { aceId: pick.aceId }) : null;
      var ok = !!(res && res.ok), lockedErr = !!(res && !res.ok && (res.error === 'locked' || res.error === 'notOwned'));
      if (ok) {
        save.lastAce = r.ace;
        if (r.ace !== fromT) (C.gifts[r.ace] || []).forEach(function (id) { shelfOwn(id, 'gift'); });
        var got = runGot(r);
        res.effects.forEach(function (f) { var k = f.loseCard ? got.indexOf(f.loseCard) : -1; if (k >= 0) got.splice(k, 1); if (f.gainCard) gotCard(r, f.gainCard); });
      }
      save.lastAceId = aceIdOf(r);
      shelfAdd(save.lastAceId);
      persist();
      UI.keepP = true; UI.quietNight = true; go('night');   // 重畫來客畫面：這一次不排第一次來客的提示（第一次挑王牌時改到下面，等老闆那句、吐司收掉再出）
      if (ok) {
        stageSay('o', line(r.ace !== fromT ? 'aceDone' : 'aceKeep'), 'owner', 2600);
        toast(TU('aceSwapped', { album: (card(save.lastAceId) || {}).album || '' }));
      } else if (lockedErr) stageSay('o', line('aceLockedSay'), 'owner', 2600);   // 畫面已經擋了（保險）
      else if (!first) stageSay('o', line('aceSame'), 'owner', 2600);
      // 第一次挑王牌（序章剛打完的新玩家）：第一次來客的教學泡泡晚一點出——原本三則訊息（吐司、老闆、教學）疊在一起（審查 11-16）
      if (first && !save.seen.night && !UI.auto) later(function () {
        if (UI.screen !== 'night' || save.seen.night || save.run !== r || qs(':scope > .lb-sheet', UI.panel)) return;
        var T = TUT(); if (T && T.firstTime) try { T.firstTime('night', ['night-box', 'night-next'], NIGHT_INTRO_O); } catch (e) { console.error(e); }
      }, ok ? 2900 + 450 * speed() : 700);   // 老闆那句 2600／吐司 1900（照速度縮）＋吐司淡出 400 ms（不縮）都收掉之後
    });
  }
  // 序章打完（或舊存檔第一次開旗標）、第 1 位開打前：老闆先說一句，再跳挑王牌面板（每份存檔一次）。
  //   回 'panel'＝這一次來客畫面交給它；'said'＝老闆只說了那句（沒得挑），第一次來客的提示等它說完；false＝沒事
  //   解鎖制（審查 11-16）：只收到一張（canSwapAny 不成立：新玩家、或跳過序章剛三選一完）＝不跳面板（原本跳出 15 格只有 1 張能選、14 張鎖著，
  //   跳過序章那條還會連挑兩次）。老闆那句照說（王牌從這裡起改當輔助卡）；怎麼收別張交給 lockHint 那則一次性吐司
  function apexIntroOnNight(r) {
    if (!UI.apex || UI.auto || (save.seen && save.seen.apexPick) || !E.canSwitchAce(r, C)) return false;
    save.seen.apexPick = true; persist();
    var can = canSwapAny(r);
    if (can) UI.going = true;
    stg('emote', 'o', 'excl', 2200);
    stageSay('o', AU('intro').replace(/^「|」$/g, ''), 'owner', 3200);
    if (!can) return 'said';
    later(function () { UI.going = false; if (UI.screen === 'night' && save.run === r) apexSwapFlow(true); }, 1900);
    return 'panel';
  }
  // 老闆的四張（O12）：四張封面＋各自的推薦語；封面＝唱片資訊；鈕「收下這四張」只是確認（入袋在 O14 櫃檯看過之後）
  function recsPanel(ids, beat) {
    return new Promise(function (res) {
      var html = '<div class="hd"><h3>' + esc((beat && beat.prompt) || '') + '</h3></div><div class="lb-recs">' +
        ids.map(function (id) {
          var c = card(id); if (!c) return '';
          return '<div class="rc" data-cid="' + esc(c.id) + '">' + coverHTML(c, { size: 48 }) + '<div class="t"><div class="ar">' + esc(c.artist) + '</div><div class="al">' + esc(c.album) + '</div>' +
            starsHTML(c) + (c.pitch ? '<p class="pt">' + esc(c.pitch) + '</p>' : '') + '</div></div>';
        }).join('') + '</div><div class="foot"><button type="button" class="lb-btn pri big wide key" data-a="ok">' + esc((beat && beat.button) || '收下這四張') + '</button></div>';
      var s = sheet(html, 'recs', { cam: false });
      roomForSheet(s);
      var done = false;
      s.addEventListener('click', function (e) {
        if (done || !(e.target.closest && e.target.closest('[data-a=ok]'))) return;
        done = true; sfx('select'); closeSheet(s); res(true);
      });
      autoAct(function () { var b = qs('[data-a=ok]', s); if (b) b.click(); }, 200);
    });
  }
  // 特價區挑三張（O13；再挑戰一趟開局）：經濟介面 DipLabEcon.bargainPick（B3）。econ.js 沒載到時用最簡單的備用面板（照樣讓玩家自己挑，不替玩家選）
  function econ() { var X = W.DipLabEcon; return X && typeof X === 'object' ? X : null; }
  function bargainPickFlow(prompt) {
    var r = save.run;
    if (!r || !E.canBargainPick(r)) return Promise.resolve(null);
    var X = econ();
    if (X && typeof X.bargainPick === 'function') {
      UI.econBusy = true; fitFloor();                  // 來客的木地板先收（抽屜上面照 R2 是舞台黑；V5-play-4）
      var autoIds = null;
      var pr = Promise.resolve().then(function () { return X.bargainPick({ prompt: prompt }); }).then(null, function (e) { console.error(e); return null; })
        .then(function (ids) { UI.econBusy = false; floorSoon(); if (save.run && E.canBargainPick(save.run)) return bargainFallback(prompt); return ids || autoIds; });
      // 自動遊玩（__lab.autoplay）：照 engine.bargainPolicy 挑完、收掉抽屜（審查 #4：econ.js 在的時候 autoplay 不會卡在開局挑三張）
      autoAct(function () {
        var rr = save.run; if (!rr || !E.canBargainPick(rr)) return;
        var ch = E.bargainPolicy ? E.bargainPolicy(rr, C) : null;
        if (!ch || !Array.isArray(ch.ids)) ch = { type: 'bargainPick', ids: rr.shop.bargain.slice(0, E.CFG.bargainPick || 3) };
        var res = doChoose({ type: 'bargainPick', ids: ch.ids.slice() });
        if (res && res.ok) { autoIds = ch.ids.slice(); try { X.close(); } catch (e) { console.error(e); } }
      }, 600);
      return pr;
    }
    console.error('[ui] DipLabEcon.bargainPick 不在：用備用的挑三張面板');
    return bargainFallback(prompt);
  }
  function bargainFallback(prompt) {
    return new Promise(function (res) {
      var r = save.run, n = E.CFG.bargainPick || 3, picked = [];
      var html = '<div class="hd"><h3>' + esc(prompt || '') + '</h3></div><div class="lb-pick">' +
        r.shop.bargain.map(function (id) { return tileHTML(card(id), { text: false, pick: '挑這張' }); }).join('') + '</div>' +
        '<div class="foot"><button type="button" class="lb-btn pri big wide key" data-a="ok" disabled>' + esc((C.shopUi && C.shopUi.bargainTake) || '收下這三張') + '</button></div>';
      var s = sheet(html, 'bargain');
      var ok = qs('[data-a=ok]', s), done = false;
      s.addEventListener('click', function (e) {
        if (done) return;
        var t = e.target.closest && e.target.closest('[data-pick]');
        if (t) {
          var id = t.getAttribute('data-pick'), k = picked.indexOf(id);
          if (k >= 0) picked.splice(k, 1); else if (picked.length < n) picked.push(id);
          qsa('.lb-ct', s).forEach(function (x) { x.classList.toggle('sel', picked.indexOf(x.getAttribute('data-cid')) >= 0); });
          ok.disabled = picked.length !== n; sfx('tick'); return;
        }
        if (e.target.closest && e.target.closest('[data-a=ok]') && picked.length === n) {
          done = true; sfx('select');
          var res1 = doChoose({ type: 'bargainPick', ids: picked.slice() });
          closeSheet(s); res(res1 && res1.ok ? picked : null);
        }
      });
      autoAct(function () {
        var ch = E.bargainPolicy ? E.bargainPolicy(save.run, C) : null, ids = (ch && ch.ids) || r.shop.bargain.slice(0, n);
        ids.forEach(function (id) { var b = qs('.lb-ct[data-cid="' + cssEsc(id) + '"] [data-pick]', s); if (b) b.click(); });
        ok.click();
      }, 200);
    });
  }
  // 一張唱片攤開（序章地上那張、打倒藏家時他送的那張）：封面 140＋三軸＋按鈕。title 為 null 時不畫標題列（D §2：男子掉的那張 那張不加敘述）
  function cardPanel(c, opts) {
    opts = opts || {};
    return new Promise(function (res) {
      // opts.unlock：{tier, title, sub}＝打倒藏家、新的一派解鎖（鎖頭打開＋大字；scratchpad v5/unlock）
      var U = opts.unlock;
      var html = (opts.title ? '<div class="hd"><h3>' + esc(opts.title) + '</h3><span class="np"></span></div>' : '') +
        (U ? '<div class="lb-unlock ' + esc(U.tier) + '" role="status"><span class="lk">' + lockIcon(26) + lockIcon(26, true) + '</span><span class="t"><b>' + esc(U.title) + '</b><small>' + esc(U.sub || '') + '</small></span></div>' : '') +
        '<div class="lb-one">' + coverHTML(c, { size: U ? 112 : 132, isNew: !!opts.isNew, newText: opts.newText }) +
        '<div class="meta"><div class="ar">' + esc(c.artist) + '</div><div class="al">' + esc(c.album) + '</div><div class="yr">' + esc(c.year || '') + '</div>' +
        starsHTML(c, { cls: 'big' }) + '<span class="sub">點封面：唱片資訊</span></div></div>' +
        (opts.note ? '<p class="msg">' + esc(opts.note) + '</p>' : '') +
        '<div class="btns">' + (opts.buttons || []).map(function (b, i) {
          return '<button type="button" class="lb-btn big col' + (b.pri ? ' pri' : '') + '" data-i="' + i + '"><span class="lb">' + esc(b.label) + '</span>' + (b.sub ? '<span class="sub">' + esc(b.sub) + '</span>' : '') + '</button>';
        }).join('') + '</div>';
      var s = sheet(html, 'one' + (opts.title ? '' : ' notitle') + (U ? ' unlock' : ''));
      if (U || opts.note) roomForSheet(s);   // 多了解鎖那塊／收到新的一張那行：舞台讓出放得下的高（不用在面板裡捲才看到「收進唱片櫃」）
      if (opts.title) watchPlaying(qs('.np', s));
      var f = FX(); if (f && f.music && soundOn() && c.previewUrl) try { f.music.play(c, { fadeMs: 1500 }); } catch (_) {}
      stg('play', true);
      var done = false;
      s.addEventListener('click', function (e) {
        var b = e.target.closest && e.target.closest('[data-i]'); if (!b || done) return;
        done = true; sfx('select');
        var v = opts.buttons[+b.getAttribute('data-i')];
        closeSheet(s); res(v.value);
      });
      autoAct(function () { var b = qs('[data-i="' + (opts.autoIndex || 0) + '"]', s); if (b) b.click(); }, 200);
    });
  }
  // 發燒配件挑一件（序章收尾三選一；也用在「配件滿了，先放一件回去」）
  // o.cell（第 D 波 SPEC-D §2.8-6：樂歷 Lv10 菁英／藏家配件三選一）：一列三格的小格（圖示＋名字兩行＋效果三行，放不下的看 title 全文）
  function relicButtonsHTML(ids, attr, o) {
    var cell = !!(o && o.cell);
    return ids.map(function (id) {
      var r = relicOf(id); if (!r) return '';
      if (cell) return '<button type="button" class="lb-btn lb-relic cell" ' + attr + '="' + esc(id) + '" title="' + esc(r.name + '：' + r.desc) + '"><span class="pix">' + relicIcon(id, 24) + '</span><span class="nm key">' + esc(r.name) + '</span><span class="ds">' + esc(r.desc) + '</span></button>';
      return '<button type="button" class="lb-btn big lb-relic" ' + attr + '="' + esc(id) + '"><span class="pix">' + relicIcon(id, 30) + '</span><span class="tx"><span class="nm key">' + esc(r.name) + '</span><span class="ds">' + esc(r.desc) + '</span></span></button>';
    }).join('');
  }
  function relicPanel(choices, opts) {
    opts = opts || {};
    return new Promise(function (res) {
      var html = '<div class="hd"><h3>' + esc(opts.prompt || '挑一件發燒配件') + '</h3></div>' +
        '<p class="note">' + esc((C.rules && C.rules.relics) || '自動生效，最多帶三件。') + '</p>' +
        '<div class="lb-opts">' + relicButtonsHTML(choices, 'data-r') + '</div>' +
        (opts.cancel ? '<div class="foot"><button type="button" class="lb-btn wide" data-a="cancel">' + esc(opts.cancel) + '</button></div>' : '');
      var s = sheet(html, 'relics');
      roomForSheet(s);                       // 三件配件＋「算了」：舞台讓出放得下的高（V02）
      var done = false;
      s.addEventListener('click', function (e) {
        if (done) return;
        var b = e.target.closest && e.target.closest('[data-r]');
        if (b) { done = true; sfx('select'); closeSheet(s); res(b.getAttribute('data-r')); return; }
        if (e.target.closest && e.target.closest('[data-a=cancel]')) { done = true; closeSheet(s); res(null); }
      });
      autoAct(function () { var id = opts.autoId; var b = id ? qs('[data-r="' + id + '"]', s) : qs('[data-r]', s); if (b) b.click(); });
    });
  }

  // ======================================================================= 吐司（z 40；唱片資訊開著時排隊）
  var toastQ = [];
  function toast(text, cls) {
    if (!text) return;
    var ci = CI();
    if (ci && ci.isOpen()) { toastQ.push([text, cls]); return; }
    // 錢（−$3,000）與短詞（進包包）不拆到兩行（V11：「…，−」／「$3,000」看起來像賺錢）
    //   主站帶來的那張（標題吐司）：「在櫃檯等你：」「先跟老闆走一趟，」「下一趟（開局可以）帶來」各自不拆（審查：360／375 寬斷成「下一／趟帶…」；第 I 波 §A-3：種子說「帶來」、「上場」只指這一輪挑的那幾張）
    var html = esc(text).replace(/[−+-]\$[\d,]+/g, function (m) { return '<span class="nw">' + m + '</span>'; })
      .replace(/(進包包|賣掉|拿出來了|放回去了|在櫃檯等你：|先跟老闆走一趟，|下一趟(?:開局可以)?帶來|那一箱。)/g, '<span class="nw">$1</span>');
    var t = el('div', 'lb-toast' + (cls ? ' ' + cls : ''), html);
    // 同時好幾個（贏錢＋聲望 +3、中繼點）：往下疊，不蓋在同一個位置
    var prev = qsa('.lb-toast:not(.out)', app());
    app().appendChild(t);
    if (prev.length) { var ar = app().getBoundingClientRect(), y = 0; prev.forEach(function (x) { y = Math.max(y, x.getBoundingClientRect().bottom - ar.top); }); t.style.top = Math.round(y + 6) + 'px'; }
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, (/(^| )long( |$)/.test(cls || '') ? 3800 : 1900) / speed());   // long：句子長的（主站帶來的那張）多留一下
  }
  function flushToasts() { var q = toastQ; toastQ = []; q.forEach(function (x, i) { setTimeout(function () { toast(x[0], x[1]); }, i * 300); }); }
  // 排到下一個畫面掛好之後才出的吐司（打贏的錢＋聲望、走到中繼點）：go() 跑完 SCREENS[id] 才 flush；帶 .keep，接著再換畫面也不被 cleanup 拿掉（審查 #0）
  var afterQ = [];
  function toastAfter(text, cls) { if (text) afterQ.push([text, 'keep' + (cls ? ' ' + cls : '')]); }
  function flushAfter() { var q = afterQ; afterQ = []; q.forEach(function (x) { if (x[0] === CASH) cashRise(x[1].from, x[1].to); else toast(x[0], x[1]); }); }
  // 錢跳數字入帳（第 A 波 4，規劃書三＋四 ②「錢跳數字入帳，加錢幣聲」）：頂欄下面一顆金色小條「+$1,500 $600→$2,100」：數字從舊的跳到新的
  //   （約 0.8 秒、5 下錢幣聲一次比一次高），停 1.6 秒再淡出；減少動態＝直接寫新的、只響一聲。.keep：接著換畫面也留著
  var CASH = {};
  function cashAfter(from, to) { afterQ.push([CASH, { from: from, to: to }]); }
  //   花錢（to < from；第 C 波攤位買東西）：同一條改寫「−$3,000」、數字往下數、不金色、不響錢幣聲（看起來不能像賺錢）
  function cashRise(from, to) {
    from = Math.max(0, from | 0); to = Math.max(0, to | 0);
    qsa('.lb-toast.cash', app()).forEach(function (x) { x.remove(); });
    var spend = to < from;
    var lbl = spend ? fill(((C.waveC && C.waveC.ui) || {}).spent || '−${n}', { n: E.moneyText(from - to) }) : fill((C.shopUi && C.shopUi.earned) || '+${n}', { n: E.moneyText(to - from) });
    var t = el('div', 'lb-toast cash keep ' + (spend ? 'spend' : 'gold'), '<span class="ce">' + esc(lbl) + '</span>' +
      '<b class="cv">' + esc(fill((C.shopUi && C.shopUi.money) || '${n}', { n: E.moneyText(from) })) + '</b>');
    t.setAttribute('role', 'status');
    var prev = qsa('.lb-toast:not(.out):not(.cash)', app());
    app().appendChild(t);
    if (prev.length) { var ar = app().getBoundingClientRect(), y = 0; prev.forEach(function (x) { y = Math.max(y, x.getBoundingClientRect().bottom - ar.top); }); t.style.top = Math.round(y + 6) + 'px'; }
    var cv = qs('.cv', t), show = function (n) { cv.textContent = fill((C.shopUi && C.shopUi.money) || '${n}', { n: E.moneyText(n) }); };
    var steps = rm() ? 1 : 12, k = 0, dt = 800 / steps;
    var tick = function () {
      k++; show(k >= steps ? to : Math.round(from + (to - from) * (1 - Math.pow(1 - k / steps, 2))));
      if (!spend && (k === steps || (k % 3 === 0))) sfx('coin', { k: Math.min(4, Math.floor(k / 3)) });
      if (k < steps) setTimeout(tick, dt / speed()); else { t.classList.add('done'); setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, 1600 / speed()); }
    };
    setTimeout(tick, 120 / speed());
    return t;
  }
  // 經驗跳數字（第 C 波 SPEC-C §4.1，戰利品列的音符飛進頂上）：錢那條下面一顆小條「+2 經驗 3/5」，數字從舊的跳到新的（每跳一下「啵」一次比一次高）；
  //   o＝{gain, from, to, need, up}（ui onDuelEnd xpInfo；升級那場跳到滿）。減少動態＝直接寫新的
  function xpRise(o) {
    if (!o || !(o.gain > 0)) return null;
    qsa('.lb-toast.xp', app()).forEach(function (x) { x.remove(); });
    var txt = function (n) { return TU('xp', { n: n, need: o.need }); };
    var t = el('div', 'lb-toast xp keep', '<span class="ce">+' + (o.gain | 0) + '</span><b class="cv">' + esc(txt(o.from)) + '</b>');
    t.setAttribute('role', 'status');
    var prev = qsa('.lb-toast:not(.out):not(.xp)', app());
    app().appendChild(t);
    if (prev.length) { var ar = app().getBoundingClientRect(), y = 0; prev.forEach(function (x) { y = Math.max(y, x.getBoundingClientRect().bottom - ar.top); }); t.style.top = Math.round(y + 6) + 'px'; }
    var cv = qs('.cv', t), from = o.from | 0, to = o.to | 0, steps = rm() ? 1 : Math.max(1, Math.min(6, to - from)), k = 0;
    var tick = function () {
      k++; cv.textContent = txt(k >= steps ? to : Math.round(from + (to - from) * k / steps));
      sfx('pop', { k: Math.min(6, k + 1) });
      if (k < steps) setTimeout(tick, 130 / speed()); else { t.classList.add('done'); setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, 1600 / speed()); }
    };
    setTimeout(tick, 120 / speed());
    return t;
  }
  // 這場的經驗（finishFight 之後）：{gain, from, to, need, up}；升級的那場＝從升級前的數跳到滿（接著升級面板）
  //   第 I 波 I-0（SPEC-I §7.2）：每一級要多少照 engine xpNeed（Lv1→2＝trial.firstNeed 2；之後 等級＋levelNeed）
  function trialT(r) { return (E.trialCfg ? E.trialCfg(C, r && r.tier) : C.trial) || {}; }
  function xpNeedOf(T, level) { return E.xpNeed ? E.xpNeed(T, level) : (level | 0) + (T.levelNeed | 0); }
  function xpInfo(r, out) {
    var T = trialT(r), g = ((T.xp || {})[out.cls]) | 0, ups = out.levelUps | 0;
    if (!(g > 0)) return null;
    if (!ups) return { gain: g, from: Math.max(0, (r.xp | 0) - g), to: r.xp | 0, need: xpNeedOf(T, r.level | 0) };
    var L0 = (r.level | 0) - ups, tot = r.xp | 0;
    for (var l = L0; l < (r.level | 0); l++) tot += xpNeedOf(T, l);
    return { gain: g, from: Math.max(0, tot - g), to: xpNeedOf(T, L0), need: xpNeedOf(T, L0), up: true };
  }
  function effectsText(effects) {
    var out = [];
    (effects || []).forEach(function (f) {
      if (f.gainCard) out.push('《' + ((card(f.gainCard) || {}).album || '') + '》進包包');
      if (f.loseCard) out.push('《' + ((card(f.loseCard) || {}).album || '') + '》拿出來了');
      if (f.gainRelic) out.push('拿到「' + ((relicOf(f.gainRelic) || {}).name || '') + '」');
      if (f.loseRelic) out.push('「' + ((relicOf(f.loseRelic) || {}).name || '') + '」放回去了');
    });
    return out.join('・');
  }
  // 上線後記（SPEC-C §15；save.wcLog）：計數 +1（ground 點地上東西、lootRows、leave 今天不逛了、sessions 攤位場數、resumeInStall 攤位中回來續玩）
  function wcLog(k) { var L = save.wcLog || (save.wcLog = {}); L[k] = (L[k] | 0) + 1; }
  function doChoose(ch) {
    var r = save.run;
    var prologue = r && r.prologue === 'pending';
    var st0 = !!r && E.nextStep(r) === 'stall';
    var res = E.choose(r, C, ch);
    if (!res.ok) console.warn('choose error', res.error, ch);
    if (res.ok && !st0 && r && E.nextStep(r) === 'stall') wcLog('sessions');   // 攤位場數：這一下把攤位開出來了才算一場（重畫、重新整理不算）
    if (res.ok && ch && ch.type === 'bargainPick' && prologue) save.lastBargain = ch.ids.slice();   // 重看教學用（§2.5.5）
    (res.effects || []).forEach(function (f) {
      if (f.gainCard) { shelfAdd(f.gainCard); gotCard(r, f.gainCard); }
      if (Array.isArray(f.shelf)) f.shelf.forEach(shelfAdd);          // 第 C 波公關片：進唱片櫃「認識」（不是擁有，CRITIQUE 3.5）
    });
    save.relics = r.relics.slice(0, 3);          // 身上的配件帶到下一趟（engine 建議；最多三件）
    persist();
    return res;
  }
  // 這一趟收進包包的唱片（結算那面牆；張數照 engine run.taken）：老闆送的、特價、獎勵、買的、藏家的王牌
  //   舊的 run（存檔、__lab 做的）沒有 r.got：用老闆送的＋包包＋獎勵＋買的湊
  function runGot(r) {
    if (!Array.isArray(r.got)) r.got = [].concat(C.gifts[r.ace] || [], r.bag || [], (r.stats && r.stats.taken) || [], (r.stats && r.stats.bought) || []).filter(function (id, i, a) { return a.indexOf(id) === i; });
    return r.got;
  }
  function gotCard(r, id) { if (!r || !id) return; var g = runGot(r); if (g.indexOf(id) < 0) g.push(id); }
  // 收一張進包包：包包不限張數（店主 11-16「手牌不要只限八張，可以無限多直到結束才重置」）——不用先拿一張出來，直接收（engine take 不給 dropId）
  function takeCard(cardId) {
    var res = doChoose({ type: 'take', cardId: cardId });
    return Promise.resolve(res && res.ok ? res : null);
  }
  function takeRelic(relicId, autoDrop) {
    var r = save.run;
    if (r.relics.length < E.CFG.relicMax) return Promise.resolve(doChoose({ type: 'relic', relicId: relicId }));
    // 老闆那句就是面板標題；不再另外在舞台上冒同一句（泡泡貼在舞台右緣會被切掉）
    return relicPanel(r.relics, { prompt: (C.lines.owner && C.lines.owner.relicFull) || '配件最多帶三件。先放一件回去。', cancel: '算了，不換了', autoId: autoDrop })
      .then(function (dropId) { return dropId ? doChoose({ type: 'relic', relicId: relicId, dropRelicId: dropId }) : null; });
  }

  // ======================================================================= title
  function firstEver() { return !save.prologueDone && !(save.runs && save.runs.length); }
  function shelfCount() { return { n: Object.keys(save.shelf).filter(cardVis).length, total: poolIds().length }; }   // 旗標關：試做的 42 張不算（CONTRACT 第 8 節）
  // 「繼續試煉」的副字：第 7 位・二手店老闆（序章收尾（撿唱片、挑配件）也還是序章，RT-7）
  function runWhere(r) {
    if (!r) return '';
    if (inPrologue(r)) return TU('prologue');
    if (r.pending && r.pending.type === 'draft' && r.cpFrom > 1) return TU('pos', { n: r.cpFrom }) + '・' + WU('cpWhere');   // 第 C 波：中繼點開局選秀中（pos 還是 1）
    var id = E.current(r, C), en = C.enemies[id];
    return TU('pos', { n: r.pos }) + (en ? '・' + en.name : '');
  }
  // 標題小籤：沒收＝今日推薦《…》、收過＝集點卡 n／7
  function dailyChip() {
    var d = dailyOn() && UI.daily, D7 = C.daily || {}, c = dailyCard();
    if (!d || d.day !== todayKey()) return '';
    return (c ? fill(D7.titleChip, { album: c.album }) : fill(D7.stamps, { n: Math.min(7, d.stamps) })) + ' ▸';
  }
  // 收下／換完獎勵：標題那顆小籤當場換字（不等下次畫標題；驗收：收了還寫「今日推薦」像沒收到）
  function dailyChipSync() {
    var b = UI.screen === 'title' && UI.panel && qs('.dl-chip [data-a=daily]', UI.panel); if (!b) return;
    var t = dailyChip(); if (t) b.textContent = t; else b.parentNode.remove();
  }
  SCREENS.title = function () {
    var r = save.run, hasRun = !!(r && !r.over), overRun = !!(r && r.over);
    setTop(esc(TU('game')), { links: (canCharEdit() ? [['捏角色', openCharEdit, 'char']] : []).concat([['唱片櫃', function () { openPage('shelf'); }, 'shelf'], ['台北', function () { go('taipei', { back: 'title' }); }, 'taipei']]), help: true });
    var panel = UI.panel; panel.classList.add('title');
    var sh = shelfCount();
    // 紀錄（店主 11-12）：「最遠：第 23 位」＋唱片櫃
    var far = save.best.far | 0;
    // 第 D 波（SPEC-D §2.3）：最遠那一趟是關樂歷打的＝最遠旁標「關樂歷」；現在關著＝第一行最後小字「樂歷關」
    var farOff = far > 0 && careerOk() && save.runs.some(function (x) { return x && x.off && (x.reached | 0) === far; });
    var infoLine = [far ? fill((C.summary && C.summary.best) || '', { n: far }) + (farOff ? '・' + CU('offBest') : '') : '', sh.n ? '唱片櫃 ' + sh.n + '／' + sh.total : ''].filter(Boolean).join('・');
    var offNow = careerOk() && save.career.off ? '<small class="cx-offon">' + esc(CU('offOn')) + '</small>' : '';
    var hint = line('titleHint'), where = runWhere(r);
    var h = '<div class="lb-tbtns">';
    if (hasRun) {
      h += '<button type="button" class="lb-btn pri big wide col key" data-a="cont">' + esc(TU('cont')) + '<span class="sub">' + esc(where) + '</span></button>' +
        '<div class="row"><button type="button" class="lb-btn key" data-a="push">重新推門</button><button type="button" class="lb-btn key" data-a="quiet">安靜地重新推門</button></div>' +
        '<p class="lb-warn" aria-live="polite">' + esc(TU('abandonWarn', { where: where })) + '</p>';
    } else {
      h += '<button type="button" class="lb-btn pri big wide key" data-a="push">推門（有聲音）▸</button>' +
        '<button type="button" class="lb-btn big wide key" data-a="quiet">安靜地推門</button>' +
        (overRun ? '<button type="button" class="lb-btn wide" data-a="end">' + esc(TU('lastSummary')) + '</button>' : '');
    }
    // 頂點卡試做（?apex=1，店主 11-16）：跳過序章、直接開打（不走旁白、捏人、序章、挑種子；特價箱照策略自動挑三張）→ 來客畫面跳挑王牌面板
    //   新存檔（一派都還沒解鎖）：小字改成「先挑你的初始流派」（這一下會定下初始流派；審查 11-16）
    if (UI.apex) h += '<button type="button" class="lb-btn wide col key" data-a="skip">' + esc(AU('skip')) + '<span class="sub">' + esc(AU(unlockedNow().length ? 'skipSub' : 'skipSubFirst')) + '</span></button>';
    // 第 D 波（SPEC-D §2.8-3）：既有三行（最遠＋唱片櫃、流派進度、攤位階梯）合成兩行——第二行＝樂歷（整行可點＝樂歷頁），流派進度、攤位階梯搬進樂歷頁。
    //   樂歷還沒到 Lv2（新帳號、序章那一趟）不出第二行，照舊出流派進度與攤位階梯
    var cxl = careerLineHTML();
    var unl = cxl ? '' : unlockLine();                   // 解鎖進度（店主 11-16）：「流派 1／3・下一派：經典流」；新玩家不出
    var lad = cxl || firstEver() ? '' : ladderLine();   // 第 C 波（SPEC-C §5.3）：店內攤位解鎖階梯一行「店內攤位 2/6｜再走 5 位開錄音室」
    var dc = dailyChip();
    h += '</div>' + (dc ? '<p class="lb-foot dl-chip"><button type="button" data-a="daily">' + esc(dc) + '</button></p>' : '') +
      (hint && !hasRun ? '<p class="lb-foot hint">' + esc(hint) + '</p>' : '') + (infoLine || offNow ? '<p class="lb-foot sm info">' + esc(infoLine) + offNow + '</p>' : '') + cxl +
      (unl ? '<p class="lb-foot sm unl">' + lockIcon(10, true) + esc(unl) + '</p>' : '') +
      (lad ? '<p class="lb-foot sm ladder">' + esc(lad) + '</p>' : '') +
      (UI.discardedOld ? '<p class="lb-foot sm">規則改版了，舊的存檔已經清掉。</p>' : '') +
      // 唯讀一行（SPEC-B §2.1；兩個都有只出升級失敗）
      (UI.migrateFail || UI.poolMissing ? '<p class="lb-foot sm ro">' + esc(SU(UI.migrateFail ? 'migrateFail' : 'poolMissing')) + '</p>' : '');
    var box = el('div', 'lb-screen' + (hasRun && UI.apex ? ' runapex' : ''), h); panel.appendChild(box);   // runapex：矮螢幕收起今日推薦小籤（style.css 棒一審查）
    // 今天剛發推薦：老闆說一句（真的說出口才算提醒過＝來客那邊這次不再說；0.9 秒內就離開標題＝來客那邊說）
    if (UI.dailyNew && dailyCard()) { UI.dailyNew = false; later(function () { if (UI.screen === 'title' && !UI.intro && !UI.dailyNagged && dailyCard()) { UI.dailyNagged = true; stageSay('o', line('dailyNew'), 'owner', 3000); } }, 900); }
    // 舊存檔第一次載入（解鎖制以前的存檔；loadSave 補了 lastAce 那派那張）：吐司說一次規則改了
    if (UI.migratedUnlock) { UI.migratedUnlock = false; toast(TU('unlockMigrated'), 'keep long'); }
    // 第 D 波（SPEC-D §2.6-5）：開機入帳的吐司（第一次「你之前的樂歷我都記著呢…」、之後「上次的樂歷補記給你…」），升級接過場卡
    if (UI.careerDeposit || UI.careerRecurve) {
      var cd = UI.careerDeposit, crv = UI.careerRecurve; UI.careerDeposit = null; UI.careerRecurve = null;
      if (cd) toast(CU(cd.first ? 'depositFirst' : 'depositMore', { n: cd.n, to: cd.to }), 'keep long');
      if (crv) toast(CU('recurve', { n: crv.n }), 'keep long gold');                    // 第 I 波 I-0：曲線改了補級
      if ((UI.careerQ || []).length) later(function () {
        if (UI.screen !== 'title' || UI.going || UI.intro || UI.modal || UI.page) return;
        careerCards(UI.careerQ).then(function (v) { if (v === 'talent' && UI.screen === 'title' && !UI.going) openPage('career'); });
      }, 1400);
    }
    // 主站「帶去店裡對決」帶進來（開機讀 ?card=）：吐司說明一次（第一次玩的人要先走完序章那一趟）
    if (UI.bringToast != null) {
      var bt = UI.bringToast; UI.bringToast = null;
      if (bt.charAt(0) === '!' && !card(bt)) toast(SU('bringLegend', { album: (card(bt.slice(1)) || {}).album || '' }), 'keep long');
      else if (bt) toast(SU(firstEver() ? 'bringToastFirst' : 'bringToast', { album: (card(bt) || {}).album || '' }), 'keep long');
      else toast(SU('bringMissing'), 'keep');
    }
    // 面板量出來要多高，舞台就收到放得下（B-title-375-clipped：警告那行永遠在畫面裡）
    var need = Math.max(130, Math.ceil(naturalH(box) + 8));
    cam('full', 'title', (UI.firstScreen || UI.camQuick) ? 0 : 450, need);
    stg('interact', 'title');
    place('o', 'counter', 'owner'); stg('pose', 'o', 'busy');
    hideActor('f'); hideActor('q1'); hideActor('q2');
    // 店裡的熟客（活店，SPEC-H §3.1）：第一次（接著是序章）店裡只有老闆；回訪 0–1 位站著翻＝crowdSync（go 跑完畫面才切）
    place('p', 'out', 'player'); stg('sil', 'p', true);
    stg('door', 'close'); stg('play', true); stg('dim', 1);
    // 旗標章：?apex=1「頂點卡試做」（右上）；第 D 波棒二 ?fac=1「流派試做」（只開它＝右上；兩個都開＝左上、兩顆並排）。
    //   矮螢幕（≤600px 高，375×548 標題區零餘裕：棒一 FINAL §3-3）兩個都開＝合成一顆「流派＋頂點卡試做」（style.css 照高度切）；章都是絕對定位、不佔面板高
    var fac2 = UI.fac && UI.apex, mixed = fac2 && FAC() && FAC().apexSwap && FAC().apexSwap.on === false;   // 換一格退回「只標示」：章下小字（CONTRACT §5）
    var plate = el('div', 'lb-plate' + (fac2 ? ' flags2' : ''), '<b>品味對決<i>・</i>試做</b><small>dip vinyl game lab</small>' + (UI.apex ? '<span class="apx">' + esc(AU('tag')) + '</span>' : '') +
      (UI.fac ? '<span class="fac">' + esc(FU('badge')) + '</span>' : '') + (fac2 ? '<span class="both">' + esc(FU('badgeBoth')) + '</span>' : '') +
      (mixed ? '<small class="mix">' + esc(FU('apexMixed')) + '</small>' : ''));
    app().appendChild(plate); UI.decor.push(plate);
    //   只標示小字（mixed）多一行：整塊往上提那一行的高，牌底照舊停在原處（不壓到下面的推門鈕；棒二 sim 退回只標示）
    var placePlate = function () { if (!plate.isConnected) return; var sh0 = UI.stageHost.getBoundingClientRect(), ar = app().getBoundingClientRect(), mx = mixed ? plate.querySelector('small.mix') : null;
      plate.style.top = Math.max(36, Math.round(sh0.bottom - ar.top - 26 - (mx ? mx.offsetHeight + 2 : 0))) + 'px'; };
    placePlate(); if (W.ResizeObserver) { var ro = new ResizeObserver(placePlate); ro.observe(UI.stageHost); UI.offs.push(function () { ro.disconnect(); }); }
    var armed = null, armedAt = 0;
    box.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b || UI.going) return;
      var act = b.getAttribute('data-a');
      if (act === 'push' || act === 'quiet') {
        if (hasRun && armed === act && now() - armedAt < 300) return;          // 一次觸控算成兩下：不算第二下
        if (hasRun && armed !== act) {
          armed = act; armedAt = now();
          qsa('[data-a=push],[data-a=quiet]', box).forEach(function (x) { x.classList.toggle('armed', x === b); });
          b.textContent = act === 'push' ? '再按一次：重新推門' : '再按一次：安靜地重新推門';
          box.classList.add('warned');
          sfx('tick');
          return;
        }
        pushDoor(act === 'push');
      } else if (act === 'skip') {
        if (hasRun && armed !== 'skip') {                                    // 有一趟在打：跟重新推門一樣，再按一次才放棄
          armed = 'skip'; armedAt = now();
          qsa('[data-a=push],[data-a=quiet],[data-a=skip]', box).forEach(function (x) { x.classList.toggle('armed', x === b); });
          b.textContent = AU('skipAgain'); box.classList.add('warned'); sfx('tick');
          return;
        }
        if (hasRun && now() - armedAt < 300) return;
        skipToApex();
      } else if (act === 'end') go('end');
      else if (act === 'daily') { sfx('tick'); openBooth(); }
      else if (act === 'career') { sfx('tick'); openPage('career'); }
      else if (act === 'cont') {
        UI.going = true;
        var f = FX(); var want = save.settings.sound === true;
        if (f) { try { if (f.init) f.init(); f.unlockFromGesture(want); } catch (_) {} }
        if (save.run && !save.run.over && E.nextStep(save.run) === 'stall') wcLog('resumeInStall');   // 上線後記（SPEC-C §15）：在攤位中關掉 App、回來續玩（選組前也算）
        ensurePlayer(); resumeRun();
      }
    });
  };
  // 店內攤位解鎖階梯（第 C 波 SPEC-C §5.3；engine.stallLadder 看最遠紀錄）：「店內攤位 2/6｜再走 5 位開錄音室」；全開＝「店內攤位 6/6」
  function ladderLine() {
    if (!E.stallLadder || !C.waveC) return '';
    var L = null; try { L = E.stallLadder(C, save.best.far | 0); } catch (_) { return ''; }
    if (!L) return '';
    var nm = function (k) { return ((C.waveC && C.waveC.stations) || {})[k] || k; };
    return L.next ? WU('ladder', { a: L.n, b: L.total, n: L.next.left, name: nm(L.next.id) }) : WU('ladderAll', { a: L.n, b: L.total });
  }
  // 跳過序章、直接玩輔助卡版（?apex=1，店主 11-16）：放棄進行中的那一趟 → 開一趟非序章的（王牌沿用上次那派／那張，沒有就經典流預設）
  //   → 特價箱照引擎策略自動挑三張 → 來客畫面；挑王牌面板由 apexIntroOnNight 跳（每次走這條路都跳，讓你換一張再打）
  //   解鎖制（店主 11-16）：從沒挑過派的新存檔（unlockedNow() 是空的）先三選一挑初始流派（老闆說「先挑一派…」），挑了才開這一趟
  //   審查 11-16：三選一開著時把標題招牌收起來（舞台縮小後招牌會移到面板標題上，蓋住「其他流派，打倒傳說藏家再解鎖」那句）；
  //   面板右上 ✕＝不挑、回標題（招牌回來；這一下會定下初始流派，按錯可以退）
  function skipToApex() {
    if (UI.going || !UI.apex) return;
    var f = FX(), want = save.settings.sound !== false;
    if (f) { try { if (f.init) f.init(); f.unlockFromGesture(want); if (f.setSpeed) f.setSpeed(speed()); } catch (e) { console.error(e); } }
    if (save.settings.sound == null) save.settings.sound = want;
    ensurePlayer();
    if (!unlockedNow().length) {
      UI.going = true;
      tlog('apex', 'firstPick', {});
      var plate = qs('.lb-plate', app()); if (plate) plate.style.visibility = 'hidden';
      acePickPanel(null, { defaultTier: tierOfCard(tonightId()) || 'hall', noTut: true, cancel: true }, { prompt: TU('firstPick') }).then(function (tier) {
        UI.going = false;
        if (UI.screen !== 'title') return;
        if (!tier) { tlog('apex', 'firstPickCancel', {}); go('title'); return; }     // ✕：不挑，標題重畫（招牌、按鈕回來）
        skipStart(TIERS.indexOf(tier) >= 0 ? tier : 'hall');
      });
      return;
    }
    skipStart(TIERS.indexOf(save.lastAce) >= 0 ? save.lastAce : unlockedNow()[0]);
  }
  function skipStart(tier) {
    abandonRun(save.run); save.run = null;
    createRun({ ace: tier, prologue: false, seeds: [] });
    var r = save.run;
    if (r && E.canBargainPick(r)) {
      var ch = E.bargainPolicy ? E.bargainPolicy(r, C) : null;
      var ids = (ch && Array.isArray(ch.ids)) ? ch.ids : r.shop.bargain.slice(0, E.CFG.bargainPick || 3);
      var res = E.choose(r, C, { type: 'bargainPick', ids: ids.slice() });
      if (res && res.ok) res.effects.forEach(function (x) { if (x.gainCard) gotCard(r, x.gainCard); });
    }
    save.seen.apexPick = false;                          // 每次走這條路都跳挑王牌面板
    persist();
    tlog('apex', 'skip', { tier: tier });
    go('night');
  }
  function pushDoor(withSound) {
    if (UI.going) return;
    UI.going = true;
    var f = FX();
    if (f) { try { if (f.init) f.init(); f.unlockFromGesture(withSound); if (f.setSpeed) f.setSpeed(speed()); } catch (e) { console.error(e); } }
    save.settings.sound = withSound;
    ensurePlayer(); persist();
    stg('sil', 'p', false);
    if (firstEver() && withSound && f && f.music && f.music.preload) {
      try { f.music.preload([card(tonightId())].filter(Boolean)); } catch (e) { console.error(e); }
    }
    if (firstEver()) { if (introWanted()) playIntro(); else startPrologue(); }
    else startAgain();
  }
  // ---- 開頭旁白＋玻璃倒影捏人（店主 11-10 定稿；只在第一次推門）：黑幕兩句 → 捏人（玻璃門上的倒影，「先隨便」可略過）→ 序章從 O2 接下去
  //   捏過人（save.seen.glass）、序章中途放棄又推門：只念第一句就接 O2。網站上捏過的小人（dip-character）＝預設（ensurePlayer）
  //   ?debug=1 預設不演（既有 e2e 從 O2 開始）；&intro=1 才演（tests/e2e-intro.mjs）
  function introWanted() { return !!(C.intro && C.intro.lines && C.intro.lines.length) && !(DEBUG && QS.intro !== '1'); }
  function playIntro() {
    var IN = C.intro, lines = IN.lines.slice(0, (save.seen.glass || !canCharEdit()) ? 1 : 2);
    var veil = el('div', 'lb-intro', '<p class="tx" aria-live="polite"></p><span class="nx" aria-hidden="true">▼</span>');
    veil.setAttribute('role', 'dialog'); veil.setAttribute('aria-modal', 'true'); veil.setAttribute('aria-label', '開頭旁白'); veil.tabIndex = -1;
    app().appendChild(veil); UI.intro = veil;
    // 底下的標題畫面（頂欄、舞台、按鈕）Tab 不到、讀屏讀不到；收尾時還原
    var inerted = [].slice.call(app().children).filter(function (c) { return c !== veil && !c.hasAttribute('inert'); });
    inerted.forEach(function (c) { c.setAttribute('inert', ''); });
    try { veil.focus({ preventScroll: true }); } catch (_) {}
    var tx = qs('.tx', veil), nx = qs('.nx', veil), i = -1, armed = false, ended = false, tm = 0;
    // 計時器自己管（不放 UI.timers）：舞台晚到時開機會再 go('title') 一次，cleanup() 不能把旁白的計時器清掉（審查 F7）
    var timers = [];
    var after = function (fn, ms) { var t = setTimeout(fn, Math.max(0, ms) / speed()); timers.push(t); return t; };
    var f = FX(); if (soundOn() && f && f.rainStart) try { f.rainStart(); } catch (_) {}
    tlog('intro', 'start', { lines: lines.length });
    function next() {
      if (ended) return;
      clearTimeout(tm); armed = false; nx.classList.remove('on');
      i++;
      if (i >= lines.length) return lines.length > 1 ? glassEdit() : finish();
      tx.classList.remove('in'); void tx.offsetWidth;
      tx.textContent = lines[i].text; tx.classList.add('in'); veil.setAttribute('data-line', lines[i].id);
      tlog('intro', 'line', { id: lines[i].id });
      if (i === 0) after(function () { sfx('bell'); }, 900);          // 「門上的鈴鐺清脆一響」（O2 的門晃不再響第二次，ctx.quietDoor）
      after(function () { armed = true; nx.classList.add('on'); }, UI.auto ? 0 : 700);
      tm = after(next, UI.auto ? 120 : Math.min(6500, 1400 + 140 * lines[i].text.length));   // 跟對白一樣：給足閱讀時間自己走，點一下就走
    }
    veil.addEventListener('click', function () { if (armed && !veil.classList.contains('edit')) next(); });
    veil.addEventListener('keydown', function (e) {
      if (veil.classList.contains('edit') || (e.key !== 'Enter' && e.key !== ' ')) return;
      e.preventDefault(); if (armed) next();
    });
    var ed = null;
    function glassEdit() {
      veil.classList.add('edit'); tx.textContent = '';
      ensurePlayer();
      var host = el('div', 'lb-intro-ed'); veil.appendChild(host);
      // 剛冒出來的捏人畫面先不收點擊：I2 上連點兩下，第二下會按到底下的「完成」（審查 F0）
      host.style.pointerEvents = 'none';
      timers.push(setTimeout(function () { host.style.pointerEvents = ''; }, 600));   // 真人的連點是實際時間，不跟動畫加速縮短
      var gone = false;
      var proceed = function (r, skip) {
        if (gone || ended) return false; gone = true;
        if (r && r.spec) { save.player.name = r.name; save.player.avatar = r.spec; }
        save.seen.glass = true; persist();
        tlog('intro', 'glass', { skip: !!skip });
        finish();
        return false;                                       // 捏人畫面留著，跟黑幕一起淡進店裡（不閃白，審查 F1）
      };
      try {
        ed = W.DipLabCharEdit.open(host, { name: save.player.name, spec: save.player.avatar }, {
          title: IN.title, scene: 'glass', skip: IN.skip,
          onSave: function (r) { return proceed(r, false); },
          // 「先隨便」／Esc：畫面上現在這個就是你（沒動過＝網站上的小人或隨機給的那個），不丟掉已經改的
          onCancel: function () { return proceed(ed ? ed.get() : null, true); }
        });
      } catch (e) { console.error(e); }
      UI.charEd = ed;
      if (!ed) return proceed(null, true);
      try { ed.el.tabIndex = -1; ed.el.focus({ preventScroll: true }); } catch (_) {}
      autoAct(function () { if (ed) proceed(ed.get(), true); });   // 自動遊玩：先隨便
    }
    function finish() {
      if (ended) return; ended = true;
      timers.forEach(clearTimeout); timers = [];
      inerted.forEach(function (c) { c.removeAttribute('inert'); });
      startPrologue({ fromIntro: true });                   // 黑幕底下先換好店裡；劇本等黑幕淡完才開始（O2 老闆抬頭看得到）
      veil.classList.add('out');
      setTimeout(function () {
        if (ed) { try { ed.close(); } catch (_) {} }
        if (UI.charEd === ed) UI.charEd = null;
        veil.remove(); if (UI.intro === veil) UI.intro = null;
      }, rm() ? 0 : INTRO_FADE);
    }
    after(next, 40);                                        // 空的 live region 先掛上去，第一句下一刻再填（讀屏才念得到）
  }
  var INTRO_FADE = 750;
  // ======================================================================= 開新的一趟（無限試煉：同一天第幾趟＝runNo；配件照 v4 帶到下一趟，最多 3 件，裁定 7）
  function runsIn(runs, k) { return runs.filter(function (n) { return n && n.seedKey === k; }).length; }
  function runsFor(k) { return runsIn(save.runs, k); }
  // 同一天第幾趟（runNo）：save.runSeq[seedKey] 只增不減（審查 #5：runs 只留 50 筆，數陣列會卡在 51 → 之後每一趟都一模一樣）
  function nextRunNo(k) {
    var Q = save.runSeq || (save.runSeq = {});
    var n = Math.max(Q[k] | 0, runsFor(k)) + 1;
    delete Q[k]; Q[k] = n;                                   // 最近用的排最後；只留最近 40 天
    var ks = Object.keys(Q); while (ks.length > 40) delete Q[ks.shift()];
    return n;
  }
  function createRun(o) {
    var k = seedKey();
    // 種子（第二趟起；序章那一趟不挑）：只收擁有、不是頂點卡的（引擎再擋一次）；主站帶來的那張（save.bring）不用擁有，這一趟可以當種子
    var brought = o.prologue ? null : bringNow();
    var seeds = o.prologue ? [] : (o.seeds || []).filter(function (id) { return (isOwned(id) || id === brought) && E.canSeed(C, id); });
    // 帶來的那張用一次就沒了（不管這次有沒有當種子）；當種子的算認識（包包裡有它），不算擁有（一趟留一張的候選照舊不列種子）
    var tookBring = !o.prologue && !!brought && seeds.indexOf(brought) >= 0;
    if (!o.prologue && save.bring) save.bring = null;
    // 解鎖制（店主 11-16）：一派都還沒解鎖＝新玩家，這次挑的就是初始流派（預設那張下面記成擁有，src 'start'）；
    //   有解鎖的派、卻挑了鎖著的（介面該擋；保險）→ 改用上次那派／第一個解鎖的派
    var un = unlockedNow(), first = !un.length;
    if (!first && un.indexOf(o.ace) < 0) o.ace = un.indexOf(save.lastAce) >= 0 ? save.lastAce : un[0];
    var nro = { seedKey: k, runNo: nextRunNo(k), ace: o.ace, prologue: !!o.prologue, relics: o.prologue ? [] : (save.relics || []).slice(0, 3), seeds: seeds,
      want: (save.want || []).slice(-200) };       // 想要清單快照（SPEC-B §5.2）
    // 第 C 波（SPEC-C §3.4、§4.7、§4.8）：最遠紀錄（攤位解鎖）、寶箱保底（跨趟）、新手保底（上一趟沒到第 10 位；含新帳號第一趟；中繼點開局不給）、中繼點開局
    var from = !o.prologue && posInt(o.from) && o.from > 1 ? o.from : 0, lastRun = save.runs.length ? save.runs[save.runs.length - 1] : null;
    nro.bestFar = save.best.far | 0; nro.chestDry = save.chestDry | 0;
    nro.safety = !from && (!lastRun || (lastRun.reached | 0) < 10);
    if (from) nro.from = from;
    if (!from && !lastRun) nro.firstRun = true;        // 第 I 波 I-2（CONTRACT §0）：新帳號第一趟＝沒有上一趟（上場制 firstRunFrom 起；開關關著引擎不看）
    if (UI.apex && !o.prologue && lastAceIdFor(o.ace)) nro.aceId = lastAceIdFor(o.ace);   // 頂點卡試做：沿用上次挑的那張（旗標關時不加這欄）
    if (UI.fac) nro.fac = true;                        // 第 D 波棒二（?fac=1；CONTRACT §1）：存進 run.fac（序章那場引擎自己不給；之後續玩照 run，不看網址）。旗標關時不加這欄
    // 第 D 波（SPEC-D §2.3、§2.4；CONTRACT §3.1-5）：樂歷天賦與階梯（talent／seedMax／relicPick／goldAdd；Lv8 前只有錢類、關樂歷＝什麼都不給）。序章那一趟不給
    if (!o.prologue) Object.assign(nro, careerArgs());
    UI.careerQ = [];                                   // 新的一趟開了：上一趟沒演完的過場卡不再演（抽到的盤早就收進唱片櫃）
    if (E.unlockedTiers) Object.assign(nro, unlockArgs(null, first ? o.ace : null));
    var r = E.newRun(C, nro);
    if (careerOk()) (UI.liveLv || (UI.liveLv = {}))[runTag(r)] = careerLv().level;   // 第 I 波 I-0：攤位頂列樂歷細條的起點（這一趟跨過一級才閃）
    r.tut = null;                                     // tut：null＝還沒選、true＝老闆帶的那場（教學）、false＝直接打／教學結束
    r.farBefore = save.best.far | 0;                  // 結算的「新紀錄」：跟開這一趟之前的最遠比
    if (!o.prologue && careerOk() && save.career.off) r.careerOff = true;   // 關樂歷那一趟（recordRun 記 runs[k].off；樂歷照拿）
    r.got = r.bag.slice();                            // 這一趟收進包包的（老闆送的、種子也算，裁定 9）
    save.run = r; save.lastAce = o.ace;
    if (first) shelfOwn(C.aces[o.ace], 'start');            // 新玩家：初始流派預設那張算擁有（＝那派解鎖；之後換派也不會鎖回去）
    // 當種子帶來的那張記成「這一趟認識的」（at＝這一趟 seedKey#runNo，NEW 章、「這一趟新認識」才找得到；審查：之前在 save.run 設好前記，at 少了 #runNo）
    if (tookBring) shelfAdd(brought);
    // 挑過這個王牌：那組送的四張算擁有（src 'gift'，不是金框；種子佔掉的那幾格也算）；王牌本身照舊只是認識（頂點卡維持老闆三選一）
    shelfAdd(aceIdOf(r)); (C.gifts[o.ace] || []).forEach(function (id) { shelfOwn(id, 'gift'); });
    persist();
    return r;
  }
  function tierOfCard(id) { for (var i = 0; i < TIERS.length; i++) if (C.aces[TIERS[i]] === id) return TIERS[i]; return null; }
  function tonightId() { return C.aces[TIERS[E.fnv1a32(seedKey() + '#tonight') % 3]]; }
  // ---- 序章（D §2）：推門 → 今晚那張響起＋兩句描述 → 猜歌 → 挑王牌 → 老闆翻箱、四張 → 特價區三張 → 櫃檯八張入袋 → 後走道嗆聲 → 兩顆接受對決
  //   沒開聲音（安靜地推門）照同一份劇本：描述照念、猜歌照猜，只是不出聲（v3 的 quietPrologue 分支已刪）
  //   o.fromIntro（開頭旁白接過來）：門鈴旁白已經響過，O2 的門晃不再響；劇本等黑幕淡完（INTRO_FADE）才開始
  function startPrologue(o) {
    o = o || {};
    var tonight = tonightId();
    var ctx = { flags: {}, quiet: !soundOn(), tonightId: tonight, tonightTier: tierOfCard(tonight), defaultTier: tierOfCard(tonight), quietDoor: !!o.fromIntro };
    abandonRun(save.run); save.run = null; persist();
    go('scene', { p: 'door', f: 'hide', o: 'counter', noCrowd: true, stripState: { ace: null, bag: [] }, start: function (sc) {
      var dlg = Dialogue(sc, ctx);
      var run = function () { dlg.run(C.script.prologue, function (ui, b) { return prologueUi(ui, b, sc, dlg, ctx); }); };
      if (o.fromIntro && !rm() && !UI.auto) later(run, INTRO_FADE * speed()); else run();
    } });
  }
  // 挑王牌之後只建 run（包包 4 張），不畫包包條：封面要等 O14 櫃檯看過才飛進來
  //   解鎖制（店主 11-16）：新玩家三派都能挑（第一次挑＝初始流派）；已經有解鎖的派（序章中途放棄又重來）＝只能挑解鎖的
  function acePickAndCreate(sc, ctx, b, prologue) {
    var un = unlockedNow(); ctx.open = un.length ? un : null;
    return acePickPanel(sc, ctx, b).then(function (tier) { createRun({ ace: tier, prologue: prologue }); return tier; });
  }
  function resumePrologueAfterBargain() {
    var tonight = tonightId();
    var ctx = { flags: {}, quiet: !soundOn(), tonightId: tonight, tonightTier: tierOfCard(tonight), defaultTier: tierOfCard(tonight), acePicked: true };
    var seen = false;
    ctx.skipBeat = function (b) { if (b.id === 'O14') seen = true; return !seen; };
    go('scene', { p: 'sale', f: 'hide', o: 'counter', noCrowd: true, stripState: { ace: null, bag: [] }, start: function (sc) {
      var dlg = Dialogue(sc, ctx);
      dlg.run(C.script.prologue, function (ui, b) { return prologueUi(ui, b, sc, dlg, ctx); });
    } });
  }
  function canTutorial() { var T = TUT(); return !!(C && C.tutorial && C.tutorial.script && T && typeof T.duelHooks === 'function' && typeof T.startDuelLesson === 'function'); }
  function prologueUi(ui, b, sc, dlg, ctx) {
    if (ui === 'guess') return guessPanel(sc, ctx, b);
    if (ui === 'acePick') return acePickAndCreate(sc, ctx, b, true);
    if (ui === 'recs') { var r0 = save.run; return recsPanel(r0 ? (C.gifts[r0.ace] || []) : [], b); }
    if (ui === 'bargain') return bargainPickFlow(b.prompt);
    if (ui === 'duel') {
      // 兩顆一律出現（D §2）：第 0 顆「看向老闆」＝老闆帶的那場（教學；教學程式不在時照課表打、只是沒有遮罩）、第 1 顆「手伸進袋子」＝直接打
      var items = (Array.isArray(b.prompts) && b.prompts.length) ? b.prompts.slice(0, 2) : [b.prompt || '▶ 品味對決'];
      var autoI = items.length > 1 ? (UI.auto && UI.auto.tut ? 0 : 1) : 0;
      return dlg.menu(items, { autoIndex: autoI, subs: Array.isArray(b.promptSubs) ? b.promptSubs.slice(0, 2) : null }).then(function (i) {
        var r = save.run; if (!r) return go('title');
        var tut = items.length > 1 && i === 0;
        r.tut = tut; persist();
        // 整合版面 b：對話框不清空——老闆那句（O21）留著，三人走到唱盤、遇敵，一直到盤面滑進來（ghostPanel hold）；只收掉 ▼
        dlg.hold();
        // 選完才走：老闆帶路到唱盤後面、兩人到兩側，三人站定才遇敵（D §3）
        return dlg.steps((C.blocking && C.blocking.toDuel) || [], 'toDuel').then(function () {
          // 教學那條路：三人站定後，老闆攤開猜歌那三張講相剋的道理（店主 11-12）；跳過教學那條路不受影響
          return tut ? tutIntroPanel(sc) : null;
        }).then(function () {
          beginFight({ tutorial: tut, overlay: tut && canTutorial(), enter: true, prewalked: true });
          return new Promise(function () {});
        });
      });
    }
    return Promise.resolve();
  }
  // ---- 再挑戰一趟（≤10 秒）：門晃 → 老闆一句「老樣子，《王牌》。」（店主 11-13：開局不再挑王牌，沿用 save.lastAce；想換＝來客畫面第 1 位開打前點老闆）
  //   →（第二趟起）從唱片櫃挑種子 → 走到特價箱挑三張（D §2「第一個自己決定牌組的選擇」）→ 來客（第 1 位）
  function startAgain() {
    var tier = TIERS.indexOf(save.lastAce) >= 0 ? save.lastAce : 'hall';
    var aceId = (UI.apex && lastAceIdFor(tier)) || C.aces[tier];      // 頂點卡試做：上次挑的那張（旗標關＝那派預設）
    var ctx = { flags: {}, quiet: !soundOn(), defaultTier: tier, vars: { ace: (card(aceId) || {}).album || '' } };
    abandonRun(save.run); save.run = null; persist();
    go('scene', { p: 'door', f: 'hide', o: 'counter', stripState: { ace: aceId, bag: [] }, start: function (sc) {
      var dlg = Dialogue(sc, ctx);
      dlg.run(C.script.again).then(function () {
        // 老闆那句說完、走去特價箱之前：從唱片櫃挑種子（店主 11-13 §1 裁定 2；櫃裡沒有能帶的就跳過）
        //   第 C 波（SPEC-C §4.7）：挑完種子多一步「從哪裡開始？」（第 1 位＋打到過的中繼點；只有第 1 位不出現）
        return seedPickFlow(tier).then(function (seeds) {
          return cpPickFlow().then(function (from) { createRun({ ace: tier, prologue: false, seeds: seeds, from: from }); topLabel(); });
        });
      }).then(function () {
        dlg.clear();
        return draftFlow(sc);                           // 中繼點開局：快速選秀補到下限（撿盤 k、升級 m；沒有就直接過）
      }).then(function () {
        return dlg.steps((C.blocking && C.blocking.toSale) || [], 'toSale');
      }).then(function () {
        return bargainPickFlow((C.shopUi && C.shopUi.bargainPrompt) || '');
      }).then(function () { go('night'); });
    } });
  }
  // ---- 中繼點開局（第 C 波 SPEC-C §4.7；stalls.js 的面板）：「從哪裡開始？」→ N；選秀（pending draft）做完才往特價箱走
  function cpPickFlow() {
    var X = W.DipLabStalls;
    if (!UI.stallsOk || !X || !X.cpPick) return Promise.resolve(1);
    return X.cpPick().then(function (n) { return posInt(n) ? n : 1; }, function () { return 1; });
  }
  function draftFlow(sc) {
    var r = save.run, X = W.DipLabStalls;
    if (!r || !r.pending || r.pending.type !== 'draft') return Promise.resolve();
    if (!UI.stallsOk || !X || !X.draft) return Promise.resolve();
    return X.draft({ sc: sc });
  }
  // 選秀途中重新整理（resumeRun step 'draft'）：回到店裡（櫃檯前），從存好的那一題接著選 → 走去特價箱 → 來客（第 N 位）
  function draftResume() {
    var r = save.run;
    if (!UI.stallsOk) { save.run = null; persist(); return go('title'); }
    go('scene', { p: 'pay', f: 'hide', o: 'counter', stripState: stripFromRun(), start: function (sc) {
      var dlg = Dialogue(sc, {});
      draftFlow(sc).then(function () {
        if (!save.run || save.run !== r || E.nextStep(r) === 'draft') return;
        return dlg.steps((C.blocking && C.blocking.toSale) || [], 'toSale').then(function () {
          return bargainPickFlow((C.shopUi && C.shopUi.bargainPrompt) || '');
        }).then(function () { go('night'); });
      });
    } });
  }
  // ---- 挑種子（店主 11-13 §0 種子制；§1 裁定 2、3、12）：第二趟起，老闆那句說完、走去特價箱之前。在店裡（舞台照舊），面板列出唱片櫃裡
  //   「擁有、不是頂點卡」的唱片（封面＋三色星數；店內取得金框），點選最多 3 張 →「就這幾張 ▸」；三色篩選；「先不挑」＝全用老闆送的。
  //   沒挑的格子用老闆送的（這次挑的王牌那組）補。矮螢幕不捲頁（面板內可捲）。自動遊玩：照最高星挑（engine.seedPolicy）
  //   審查 #3：這次王牌那組送的不列（帶了也一樣會送，挑了等於沒挑）；扣掉之後沒有能帶的就不開面板。
  //   審查 #4：標題列（張數）＋說明那行黏在面板頂；帶滿了，沒選的鈕變淡（aria-disabled）、張數變紅，再點吐司說明。
  //   審查 #8：篩選＝那一色是這張最高的（平手兩色都算）。審查 #10：選了＝墨色框＋✓ 章（跟店內取得的金框分開）
  function seedPool(tier) {
    syncBring();                                        // 別的分頁剛收下的（或用掉的）以存檔為準
    var gift = C.gifts[tier] || [];
    var pool = seedableIds().filter(function (id) { return gift.indexOf(id) < 0; });
    // 主站「帶去店裡對決」帶來的那張（v5 第六項第一期）：不在這次王牌那組送的（送的照樣會進包包）就排第一（seedPickFlow 預設勾好）
    var b = bringNow(tier);
    if (b) { pool = pool.filter(function (id) { return id !== b; }); pool.unshift(b); }
    return pool;
  }
  // 主站帶來、這一趟可以當種子的那張：合法（卡在、不是王牌）、而且不在這次王牌那組送的四張裡；沒有回 null
  function bringNow(tier) {
    var b = save && save.bring && save.bring.id;
    if (!b || !bringOk(b)) return null;
    if (tier && (C.gifts[tier] || []).indexOf(b) >= 0) return null;
    return b;
  }
  // 開機讀 ?card=<catalogId>（主站「帶去店裡對決」）：收進 save.bring、參數從網址拿掉；標題吐司。
  //   含 | 照主站 cardIdOf 正規化；不含＝舊 slug 照表換。唯讀：拿掉參數、不收不吐司（SPEC-B §2.4）
  function takeBring() {
    if (QS.card == null) return;
    var v = String(QS.card), raw = rawParam('card'); delete QS.card;
    try { var u = new URL(location.href); u.searchParams.delete('card'); history.replaceState(history.state, '', u.pathname + u.search + u.hash); } catch (_) {}
    if (UI.saveReadOnly) return;
    var id = bringIdOf(v, raw);
    if (bringOk(id)) { save.bring = { id: id, at: now() }; UI.bringToast = id; persist(); }
    else if (card(id) && E.canSeed(C, id)) UI.bringToast = '!' + id;   // 傳奇（M2）：不收，吐司說明（'!' 前綴；吐司那邊再驗「不是一張卡」，id 本身以 ! 開頭也不誤判）
    else UI.bringToast = '';      // 查不到、王牌（帶不進來）：吐司說店裡沒有
  }
  function catalogIdNorm(v) { return String(v).toLowerCase().replace(/\//g, '-').trim(); }
  // 網址參數原字串（只解 %XX，+ 照原樣）；解不開回 null
  function rawParam(name) {
    try {
      var ps = location.search.replace(/^\?/, '').split('&');
      for (var i = 0; i < ps.length; i++) {
        var j = ps[i].indexOf('='), k = j < 0 ? ps[i] : ps[i].slice(0, j);
        if (decodeURIComponent(k.replace(/\+/g, ' ')) === name) return decodeURIComponent(j < 0 ? '' : ps[i].slice(j + 1));
      }
    } catch (_) {}
    return null;
  }
  // ?card= → id；查不到又有空白（沒編碼的 + 變空白）→ 試原字串、再試空白換 +（SPEC-B A5）
  function bringIdOf(v, raw) {
    var L = C.legacyIds ? C.legacyIds() : {};
    var look = function (x) { return x.indexOf('|') >= 0 ? catalogIdNorm(x) : (Object.prototype.hasOwnProperty.call(L, x) ? L[x] : x); };
    var id = look(v);
    if (card(id) || v.indexOf(' ') < 0) return id;
    var alt = [raw, v.replace(/ /g, '+')];
    for (var i = 0; i < alt.length; i++) { if (typeof alt[i] === 'string' && alt[i] !== v) { var a = look(alt[i]); if (card(a)) return a; } }
    return id;
  }
  function topAxes(c) { var m = Math.max(c.c || 0, c.o || 0, c.h || 0); return ATTRS.filter(function (a) { return (c[a] || 0) === m; }); }
  function seedPickFlow(tier) {
    var pool = seedPool(tier);
    if (!pool.length) return Promise.resolve([]);
    var max = seedMaxNow(), giftN = (C.gifts[tier] || []).length || 4;   // 第 D 波：樂歷 Lv12 起 4 格（talentArgs.seedMax）
    pool.sort(function (a, b) { var A = card(a), B = card(b); return E.peak(B) - E.peak(A) || E.power(B) - E.power(A) || (a < b ? -1 : a > b ? 1 : 0); });
    var brought = bringNow(tier);
    if (brought && pool.indexOf(brought) >= 0) { pool.splice(pool.indexOf(brought), 1); pool.unshift(brought); }   // 主站帶來的排第一、預設勾好
    else brought = null;
    return new Promise(function (res) {
      var picked = brought ? [brought] : [], filter = 'all', done = false;
      var flt = [['all', SU('pickAll')]].concat(ATTRS.map(function (a) { return [a, ZH[a]]; }));
      var html = '<div class="sdtop"><div class="hd"><h3>' + esc(SU('pickTitle')) + '</h3><span class="sub cnt" aria-live="polite"></span></div>' +
        '<p class="note sdn">' + esc(SU('pickSub', { max: max, n: giftN })) + '</p></div>' +
        '<div class="lb-filters sd" role="group">' + flt.map(function (f) { return '<button type="button" class="lb-btn' + (f[0] === 'all' ? ' on' : ' ' + f[0]) + '" data-f="' + f[0] + '">' + esc(f[1]) + '</button>'; }).join('') + '</div>' +
        '<div class="lb-rgrid lb-seeds">' + pool.map(function (id) {
          var c = card(id);
          return tileHTML(c, { store: isStore(id), lexp: isLexp(id), enc: isEncSrc(id), brought: id === brought, cls: 'ax-' + E.topAttr(c) + (id === brought ? ' brought' : ''), data: 'data-ax="' + topAxes(c).join(' ') + '"', pick: SU('pickTake') });
        }).join('') + '</div>' +
        '<p class="sub lb-sdempty" hidden>' + esc(SU('pickEmpty')) + '</p>' +
        '<div class="foot two"><button type="button" class="lb-btn" data-a="none">' + esc(SU('pickNone')) + '</button>' +
        '<button type="button" class="lb-btn pri key" data-a="ok">' + esc(SU('pickGo')) + '</button></div>';
      var s = sheet(html, 'seeds');
      var note = qs('.sdn', s), cnt = qs('.cnt', s), okb = qs('[data-a=ok]', s);
      function mark(warn) {
        var full = picked.length >= max;
        qsa('.lb-seeds .lb-ct', s).forEach(function (t) {
          var id = t.getAttribute('data-cid'), on = picked.indexOf(id) >= 0;
          t.classList.toggle('sel', on);
          t.classList.toggle('off', filter !== 'all' && (' ' + t.getAttribute('data-ax') + ' ').indexOf(' ' + filter + ' ') < 0);
          var b = qs('[data-pick]', t);
          if (b) {
            b.textContent = on ? SU('picked') : SU('pickTake'); b.setAttribute('aria-pressed', on ? 'true' : 'false');
            if (full && !on) b.setAttribute('aria-disabled', 'true'); else b.removeAttribute('aria-disabled');
          }
        });
        s.classList.toggle('full', full);
        qsa('[data-f]', s).forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-f') === filter); });
        var empty = !qsa('.lb-seeds .lb-ct:not(.off)', s).length, em = qs('.lb-sdempty', s);
        if (em) em.hidden = !empty;
        cnt.textContent = SU('pickCount', { n: picked.length, max: max });
        cnt.classList.toggle('full', full);
        okb.disabled = !picked.length;
        note.textContent = warn ? SU('pickFull', { max: max }) : SU('pickSub', { max: max, n: giftN });
        note.classList.toggle('warn', !!warn);
      }
      mark();
      roomForSheet(s);
      s.addEventListener('click', function (e) {
        if (done) return;
        var f = e.target.closest && e.target.closest('[data-f]');
        if (f) { filter = f.getAttribute('data-f'); sfx('tick'); mark(); return; }
        var pk = e.target.closest && e.target.closest('[data-pick]');
        if (pk) {
          var id = pk.getAttribute('data-pick'), i = picked.indexOf(id);
          if (i >= 0) { picked.splice(i, 1); sfx('tick'); mark(); return; }
          if (picked.length >= max) {
            // 帶滿了還點（面板捲到下面、頂上那行看不到也一樣）：吐司說明；同一則不疊
            sfx('tick'); mark(true);
            qsa('.lb-toast.sdfull', app()).forEach(function (x) { x.remove(); });
            toast(SU('pickFullToast', { max: max }), 'sdfull');
            return;
          }
          picked.push(id); sfx('select'); mark(); return;
        }
        var a = e.target.closest && e.target.closest('[data-a]');
        if (!a) return;
        var act = a.getAttribute('data-a');
        if (act === 'ok' && !picked.length) return;
        if (act === 'ok' || act === 'none') { done = true; sfx('select'); closeSheet(s); res(act === 'ok' ? picked.slice() : []); }
      });
      autoAct(function () {
        picked = E.seedPolicy(C, pool, max, max); mark();
        var b = qs(picked.length ? '[data-a=ok]' : '[data-a=none]', s); if (b) b.click();
      }, 260);
    });
  }
  // ---- 續玩：序章途中（特價區還沒挑 → 序章從頭；挑過了 → 直接到男子那場）
  function resumeRun() {
    var r = save.run;
    if (!r) return go('title');
    var step = E.nextStep(r);
    if (step === 'reward') return r.pending.prologue ? epilogueFlow(true) : go('reward');
    if (step === 'level') return go('reward');                        // 升級三選一還沒選完（重新整理）：回到領獎那個鏡頭開升級面板
    if (step === 'retry') return retryFlow({ enemyId: r.pending.enemyId, resumed: true });
    if (r.over) return go('end');
    if (step === 'duel') return beginFight({});
    if (step === 'prologue') {
      if (E.canBargainPick(r)) return (firstEver() && introWanted()) ? playIntro() : startPrologue();   // 序章整段重來＝跟再推一次門一樣（捏過人就只念 I1）
      // 特價區挑完、還沒按兩顆「接受對決」（r.tut 還沒定）：從 O14（八張放上櫃檯）接著演到兩顆鈕，不直接開打（RT-6）
      if (r.tut == null && !r.duel) return resumePrologueAfterBargain();
      return beginFight({ tutorial: r.tut === true || (r.tut == null && !save.tutorialDone), overlay: canTutorial() });
    }
    if (step === 'fight') return go('night');
    // 第 C 波（SPEC-C §2.4、CRITIQUE 1.1）：今天的攤位＝來客畫面（底部換成攤位面板，SCREENS.night 放行）；中繼點開局選秀＝選秀面板。
    //   不認得的 step 才走到下面把整趟刪掉
    if (step === 'stall') { if (UI.stallsOk) return go('night'); return stallBridge(r); }
    if (step === 'draft') return draftResume();
    save.run = null; persist(); go('title');
  }
  // stalls.js 沒載到（舊快取、載入失敗）：今天的攤位照「今天不逛了」帶過（錄音室自動、寄賣領取不拿），不要把整趟刪掉
  function stallBridge(r) {
    for (var g = 0; g < 8 && E.nextStep(r) === 'stall'; g++) {
      if (luStallStep(r)) { var lp = r.pending.lineup; if (!E.choose(r, C, { type: 'stall', act: 'lineup', ids: (lp.pick || []).slice(), bench: (lp.bench || []).slice() }).ok) break; continue; }   // 第 I 波 I-2：收攤前的上場那一步＝「幫我挑」
      var cur = r.pending.cur, k = cur && cur.kind;
      var res = E.choose(r, C, k === 'studio' ? { type: 'stallAct', act: 'ok' } : k === 'consignGet' ? { type: 'stallAct', act: 'skip' } : { type: 'stallLeave' });
      if (!res || !res.ok) { console.warn('stall bridge', res && res.error); break; }
    }
    persist();
    if (E.nextStep(r) === 'fight') return go('night');
    save.run = null; persist(); go('title');
  }

  // ======================================================================= 對決（duel.js；進場／退場編排）
  function preloadDuel(duel) {
    try {
      var seen = {};
      var walk = function (o, depth) {
        if (!o || depth > 2) return;
        Object.keys(o).forEach(function (k) {
          var v = o[k];
          if (Array.isArray(v)) v.forEach(function (c) { if (c && c.id && !seen[c.id]) { seen[c.id] = 1; var s = coverSrc(c); if (s) { var im = new Image(); im.src = s; } } });
        });
      };
      walk(duel.e, 0); walk(duel.p, 0);
    } catch (e) { console.error(e); }
  }
  function beginFight(o) {
    o = o || {};
    var r = save.run; if (!r) return go('title');
    // 老闆帶的那場（教學）：引擎照 C.tutorial.script 出牌；遮罩與手指要教學程式在（overlay），不在時照課表打、只是沒有遮罩（§2.5.7）
    var tutorial = !!o.tutorial && r.prologue === 'pending' && !r.duel;
    var res = null;
    var fo = { tutorial: tutorial }; if (UI.apex) fo.apex = true;       // 頂點卡試做：每次開打都帶旗標（不存進 run；序章那場引擎自己不開）
    try { res = E.startFight(r, C, fo); } catch (e) { console.error(e); }
    if (!res || !res.duel) { console.error('startFight failed'); persist(); return go(r.over ? 'end' : 'night'); }
    if (!res.resumed) r.tut = tutorial;
    persist();
    preloadDuel(res.duel);
    if (res.duel.over) return onDuelEnd({ duel: res.duel });           // 打完了但還沒結算（重新整理在結尾那 2 秒）
    UI.ending = null;
    var tutOn = r.tut === true && !save.tutorialDone && canTutorial() && o.overlay !== false;
    var enter = !!o.enter && !res.resumed;
    if (enter) ghostPanel({ hold: !!o.prewalked });
    go('duel', { res: res, enemyId: res.enemyId, enter: enter, quick: !!o.quick && !res.resumed, tutorial: tutOn, prewalked: !!o.prewalked && !res.resumed });
  }
  function duelHooks(p) {
    var T = TUT(), tut = null;
    if (p.tutorial && canTutorial()) { try { tut = T.duelHooks(); } catch (e) { console.error(e); tut = null; } }
    return {
      stage: UI.stage,
      cardInfo: function (c, o) { return info(c, o); },
      hint: function (id, targets) { if (UI.tutReplay || !T || !T.hintHook) return; try { T.hintHook(id, targets); } catch (e) { console.error(e); } },
      // autoNext（11-17）：false＝揭曉後停住等點（真玩家預設）；?fast=1、__lab.duelLab 的測試對決（沒給 start({hold:true})）照現行時序
      settings: function () { var lab = UI.duelLab && p.res && UI.duelLab.duel === p.res.duel && !UI.duelLab.hold; return { fastAnim: !!save.settings.fastAnim || FAST, autoNext: !!save.settings.autoNext || FAST || !!lab }; },
      onEvent: function () {},
      player: { name: '你', avatar: playerAv() },
      relicIcon: function (id, size) { return relicIcon(id, size); },
      resolveOpts: function () {
        var o = UI.force ? { debugOutcome: UI.force } : {};
        var lo = loseOutcome(save.run && save.run.duel); if (lo) o.debugOutcome = lo;
        // ?debug=1 的 __lab.duelLab.setNext({i,attr})：他下一手照這個出（e2e-duel 的 index.html 版；＝duel-harness 的 __h.setNext）
        var nx = UI.nextPlay; UI.nextPlay = null;
        var d = save.run && save.run.duel;
        if (nx && d && d.e && d.e.hand[nx.i] && /^[coh]$/.test(nx.attr)) o.forcedPlay = { i: nx.i, attr: nx.attr };
        return o;
      },
      tut: tut,
      // 盤面淡出之前：教學那場等老闆講完（tut.settled）；打贏而且這場會升級＝先跳「升級！Lv n」章（第 I 波 I-0，levelChapter）
      beforeEnd: function (result) {
        var a = null; if (tut && T.settled) { try { a = T.settled(); } catch (_) { a = null; } }
        return Promise.resolve(a).then(function () { return levelChapter(p, result); });
      },
      endText: function (result, def) { return endStamp(p, result, def); },
      facFirst: function (cl) { return facFirstLine(p, cl); },   // 第 D 波棒二：這一派第一次觸發那手，結果行補一句（duel.js 只在 clash 有 fac 時問）
      encore: function (ev, o) { encoreAfter(p, ev, o || {}); }  // 第 I 波翻面：成立那手揭曉收起之後（duel.js encAfter）
    };
  }
  // 打完的大章（第 A 波 4）：剩 1–2 聲望贏下＝「險勝！」（金章；副標照舊）、老闆補一句；打贏而且連勝 ≥2＝大章下面跳「連勝 n」。
  //   序章、教學、重看教學、__lab.duelLab 的測試對決不改
  var CLOSE_HP = 2;
  function endStamp(p, result, def) {
    var r = save.run, duel = result && result.duel;
    if (!r || p.fakeRun || p.tutorial || p.enc || UI.tutReplay || inPrologue(r) || (UI.duelLab && duel === UI.duelLab.duel) || !result || !result.win) return null;   // 切磋不改大章（不算連勝）
    var out = Object.assign({}, def), hp = result.pHp | 0, close = hp >= 1 && hp <= CLOSE_HP;
    if (close) {
      out.title = TU('closeWin') || out.title; out.cls = 'gold close';
      // 他打完說的那句（盤面左邊的泡泡，約 1.8 秒）說完才換老闆，兩個泡泡不疊；藏家打完不說話（送牌那段才說）
      var boss = !!(C.enemies[duel && duel.e && duel.e.id] || {}).boss;
      var at = boss ? 380 : 1850;
      // 他那句收掉才換老闆（泡泡不疊）；兩邊頭上的名牌（他的名字、「你」）先收掉：375×548 的店景條只有約 80 px，老闆的泡泡跟名牌同一高度、會被蓋住（審查 A-7）
      later(function () { if (UI.screen !== 'duel') return; if (!boss) stg('say', 'f', null); stg('untag'); stageSay('o', line('closeWin'), 'owner', 2200); }, at);
      out.holdMs = at + 1500;                          // 大章停到老闆那句看得到（duel.js 照速度縮）
    }
    var st = (r.streak | 0) + 1;                       // 引擎 finishFight 之後才 +1：這一場打贏後的連勝
    if (st >= 2) out.chip = TU('streak', { n: st });   // 「連勝 +1（4 連勝）」（原本「連勝 4 +1」會讀成 4 加 1，審查 A-13）
    return close || out.chip ? out : null;
  }
  // 升級章（第 I 波 I-0；SPEC-I §7.2、CRITIQUE 9-5「升級面板接在戰利品列後面、看起來像獎勵的一部分」）：打贏那一手的大章之後、盤面淡出之前，
  //   這場會升級（照 engine gainXp 在複本上先算：經驗、等級、xpMul 都照 run）就蓋一張金章「升級！Lv n」（連升幾級寫最後那級），停住、點了收（▼ 輕跳＝duel.js 揭曉停住那行）；
  //   接著才是戰利品列 → 升級面板。存檔 autoNext 開、?fast=1：照讀秒自己走（點了照樣收）。序章、教學、重看教學、__lab.duelLab、輸了＝不出
  //   直接結算（__lab.forceWin、重新整理在結尾那 2 秒）不經過這裡＝不出章
  function levelChapter(p, result) {
    var r = save.run, duel = result && result.duel;
    if (!r || p.fakeRun || p.tutorial || p.enc || UI.tutReplay || inPrologue(r) || (UI.duelLab && duel === UI.duelLab.duel) || !result || !result.win || !E.gainXp) return null;   // 切磋不給經驗
    var T = trialT(r), c = { xp: r.xp | 0, level: r.level | 0, xpMul: r.xpMul, xpFrac: r.xpFrac, maxHp: 0, hp: 0, levelUps: 0 }, ups = 0;
    try { ups = E.gainXp(c, T, ((T.xp || {})[E.classAt(r.pos)]) | 0); } catch (e) { console.error(e); return null; }
    var L = (C.trial && C.trial.levelUp) || {}, host = qs('.dl', UI.panel);
    if (!(ups > 0) || !L.chapter || !host) return null;
    return new Promise(function (res) {
      var ch = el('div', 'lb-lvch', '<div class="st"><b>' + esc(fill(L.chapter, { n: c.level })) + '</b></div>' +
        '<p class="tap"><span>' + esc(DTX('tapOn', '')) + '</span> <i aria-hidden="true">▼</i></p>');
      ch.setAttribute('role', 'button'); ch.setAttribute('tabindex', '0'); ch.setAttribute('data-a', 'lvch');
      ch.setAttribute('aria-label', fill(L.chapter, { n: c.level }));
      host.appendChild(ch);
      UI.lvch = { level: c.level, ups: ups, at: now() };
      sfx('ding');
      var auto = !!(save.settings && save.settings.autoNext) || FAST, done = false, t0 = now(), guard = FAST ? 160 : 450;
      var go2 = function () { if (done) return; done = true; D.removeEventListener('keydown', onKey, true); ch.classList.add('out'); setTimeout(function () { ch.remove(); }, 200); res(); };
      var onKey = function (e) { if (!ch.isConnected) { D.removeEventListener('keydown', onKey, true); return go2(); } if ((e.key === 'Enter' || e.key === ' ') && now() - t0 > guard) { stopEv(e); e.preventDefault(); go2(); } };
      ch.addEventListener('click', function (e) { stopEv(e); if (now() - t0 > guard) go2(); });
      D.addEventListener('keydown', onKey, true);
      try { ch.focus({ preventScroll: true }); } catch (_) {}
      if (auto) setTimeout(go2, (FAST ? 500 : 1800));
      autoAct(function () { go2(); }, 300);
    });
  }
  // 對決的頂欄：「第 n 位<small>第 R 輪・菁英／傳說藏家</small>」；序章男子（含重看教學的 fakeRun）＝「序章」
  function duelTitle(eid, r, p) {
    var CC = (p && p.view) || C, en = CC.enemies[eid] || {};
    if (p && p.enc) return esc(SPU('encTop', { name: en.name || '' })) + (SPU('encTopSub') ? '<small>' + esc(SPU('encTopSub')) + '</small>' : '');   // 切磋（SPEC-H §7.3-7）：「切磋・{name}」（沒有第幾位）＋小字「短局」（審查修正 p2b）
    if (en.prologue || eid === (C.prologueEnemy || 'man') || inPrologue(r)) return esc(TU('prologue'));
    return posLabel(r, E.classAt(r.pos));
  }
  // 盤面最終高度：螢幕高 − 頂欄 − 橫條（舞台 strip 鏡頭的 CSS 高）
  function stripCssH() {
    var st = UI.stage, vh = W.visualViewport ? Math.min(W.innerHeight, W.visualViewport.height) : W.innerHeight;
    if (!st) return vh < 600 ? 84 : 120;
    try {
      if (typeof st.camCssH === 'function') { var hh = st.camCssH('strip'); if (hh > 40) return hh; }   // strip 的 grow：高螢幕橫條往上長（整合版面 c）
      var L = st.layout, v = st.view();
      var nm = (W.DipLabStage && W.DipLabStage.pickCamera) ? W.DipLabStage.pickCamera('strip', L.cameras, vh) : 'strip';
      var c = L.cameras[nm] || L.cameras.strip;
      var h = Math.round(c.h * (v.baseDev || v.dev) / (v.dpr || 1));
      return h > 40 ? h : (vh < 600 ? 84 : 120);
    } catch (_) { return vh < 600 ? 84 : 120; }
  }
  SCREENS.duel = function (p) {
    // 切磋（SPEC-H §7.3-7）：對手是熟客（C.enemies 沒有他）——敵方資料、精靈圖、duel.js 的 content 一律讀 p.view（engine encView；不然 enemySpr({}) 回 e0）
    var CC = p.view || C, r = p.fakeRun || save.run, eid = p.enemyId, en = CC.enemies[eid] || {};
    // 頂欄「紀錄」（11-17 這場紀錄）：第 1 手揭曉後才出（duel.js recapReady）；教學、重看教學不出
    var fch = facChipHTML(p.res && p.res.duel);          // 第 D 波棒二：有派別的對決＝頂欄多一字圖示（比／借／拆），點了＝本派說明
    setTop(duelTitle(eid, r, p), { help: true, pause: true, chips: fch ? [fch] : null, links: p.tutorial || p.replay ? [] : [[DTX('rcLink', '紀錄'), function () { var Dl = DUEL(); if (Dl && Dl.recap) Dl.recap('list'); }, 'recap']] });
    var fcb = fch && qs('[data-a=fac]', UI.top);
    if (fcb) fcb.addEventListener('click', function (e) { stopEv(e); if (UI.going || !topTapOk(e)) return; facInfo((save.run && save.run.duel) || p.res.duel); });
    var rcSync = function () { var b = qs('[data-a=recap]', UI.top), Dl = DUEL(), a = Dl && Dl.api && Dl.api(); if (b) b.hidden = !(a && a.recapReady && a.recapReady()); };
    rcSync();
    var panel = UI.panel; panel.classList.add('duel');
    var wrap = el('div', 'lb-duelwrap'); panel.appendChild(wrap);
    var foeSpr = enemySpr(en);
    // 上一場的勝利曲（或來客時放的試聽）淡掉：不要壓在這場每一手的落針與 NOW 小窗底下（RT-9）
    var fxm = FX(); if (fxm && fxm.music && fxm.music.playing && fxm.music.playing()) try { fxm.music.stop({ fadeMs: 900 }); } catch (e) { console.error(e); }
    resetPoses(); hideActor('q1'); hideActor('q2'); stg('sil', 'f', false); stg('sil', 'p', false);
    stg('sprite', 'f', foeSpr);
    var enter = !!p.enter && !UI.auto, quick = !!p.quick && !UI.auto;
    var opts = {
      duel: p.res.duel, events: p.res.events || [], run: r, content: CC, enter: enter || quick,
      onEnd: function (result) { onDuelEnd(result); },
      onSave: function () { if (save.run && !UI.tutReplay) persist(); },   // 切磋：run.duel 本來就沒寫（對決不存；重新整理＝作廢）
      hooks: duelHooks(p)
    };
    var boss = !!en.boss && enter;
    // 頂點卡試做：序章那場照舊 7 星王牌——開打時吐司寫明一次（FRAME 1.6；老闆帶的那場有教學泡泡，不疊吐司：挑王牌那行已經寫了）
    if (UI.apex && !UI.auto && (inPrologue(r) || en.prologue) && !p.replay && !p.tutorial) later(function () { if (UI.screen === 'duel') toast(AU('tag') + '・' + AU('tutNote')); }, enter ? 1600 : 300);
    var mountBoard = function () {
      var Dl = DUEL();
      if (Dl && typeof Dl.mount === 'function') { try { Dl.mount(wrap, opts); } catch (e) { console.error(e); stubDuel(wrap, opts); } }
      else stubDuel(wrap, opts);
      if (Dl && Dl.on) { rcSync(); UI.offs.push(Dl.on('resolved', function () { later(rcSync, 0); })); }
      if (p.tutorial && opts.hooks.tut) startLesson(r.ace, !!p.replay);
      if (boss) duelHold(true);                                   // 藏家登場卡收掉之前，盤面不能出牌（B-boss-intro-passthrough）
      if (UI.auto) later(autoDuel, 400);
    };
    var afterIn = function () {
      if (UI.screen !== 'duel' || !wrap.isConnected) return;
      wrap.classList.remove('entering'); wrap.style.height = '';
      UI.going = false;
      if (!boss) return;
      var f = FX();
      var intro = (f && f.bossIntro) ? Promise.resolve().then(function () { return f.bossIntro({ spriteHtml: sprHTML('boss', 72), title: en.name, sub: (C.lines.boss && C.lines.boss.stampSub) || '', tapToClose: true }); }) : Promise.resolve();
      intro.then(null, function (e) { console.error(e); }).then(function () { if (UI.screen === 'duel') duelHold(false); });
    };
    if (!enter && !quick) {
      // 續玩／中途回來：直接是橫條，不播進場
      place('f', 'duelE', foeSpr); place('p', 'duelP', 'player'); place('o', stg('spot', 'ref') ? 'ref' : 'counter', 'owner'); stg('door', 'close');
      stg('interact', 'duel');
      cam('strip', 'duel', 0);
      mountBoard();
      return;
    }
    // 進場：「！」＋閃白＋黑條（店主拍板的遇敵特效）只蓋在舞台上（O2／ART-03）；鏡頭推近與盤面從下方滑入都看得到。整段約 1.4 s
    var appH = app().clientHeight, finalH = Math.max(200, appH - 32 - stripCssH());
    wrap.classList.add('entering'); wrap.style.height = finalH + 'px';
    var f = FX(), foeAnc = anchorOf('f');
    UI.going = true;
    stg('interact', 'duel');
    UI.camName = 'strip'; UI.camSheet = false;
    var walkIn = null, pushed = false;
    var push = function () {
      if (pushed || UI.screen !== 'duel' || !wrap.isConnected) return;
      pushed = true;
      mountBoard();
      if (UI.ghostRelease) UI.ghostRelease();                  // 序章：老闆那句對白留到盤面滑進來才淡出（整合版面 b）
      walkIn = new Promise(function (res) {
        var go2 = function () {
          if (UI.stage && typeof UI.stage.duelIn === 'function') stgP('duelIn', { foe: foeSpr, ms: Math.round(760 / speed()) }).then(res, res);
          else cam('strip', 'duel', 760).then(res, res);
        };
        if (W.requestAnimationFrame) requestAnimationFrame(go2); else go2();
      });
    };
    var enc = null;
    if (enter) { try { enc = (f && f.encounter2) ? f.encounter2(foeAnc, { onPush: push, host: UI.stageHost }) : null; } catch (e) { console.error(e); enc = null; } }
    if (!enc) { push(); enc = Promise.resolve(); }
    enc.then(function () { push(); return walkIn; }).then(afterIn, afterIn);
  };
  function startLesson(tier, replay) {
    var T = TUT();
    try {
      var pr = T.startDuelLesson({ tier: tier, replay: !!replay });
      if (pr && pr.then) pr.then(function (how) {
        UI.tutResult = how;
        if (replay) return;
        if (how === 'done' || how === 'skipped' || how === 'released') {
          save.tutorialDone = true;                       // B-skip-reload：跳過之後重新整理不會再開教學
          if (save.run) save.run.tut = false;
          persist();
        }
      }, function (e) { console.error(e); });
    } catch (e) { console.error(e); }
  }
  // 打完：duel.js 的大章＋盤面淡出已經做完 → 結算、下一個畫面
  function onDuelEnd(result) {
    var duel = (result && result.duel) || (save.run && save.run.duel);
    // __lab.duelLab 開的測試對決：記下結果、盤面停在大章（＝duel-harness 的 noend），不結算、不換畫面
    if (UI.duelLab && duel && duel === UI.duelLab.duel) { var ov = duel.over || {}, rs = result || {}; UI.duelLab.ended = { over: rs.over || (ov.win ? 'win' : 'lose'), win: rs.win != null ? !!rs.win : !!ov.win, by: rs.by || ov.by, pHp: rs.pHp != null ? rs.pHp : duel.p.hp, eHp: rs.eHp != null ? rs.eHp : duel.e.hp }; return; }
    if (UI.tutReplay) return endReplay();
    if (duel && duel.spar) return encEnd(result);       // 切磋（SPEC-H §7.3-8）：不叫 finishFight（不當主線記帳）；頂欄、endStamp、loseOutcome、r.lastFight 都不碰
    var r = save.run;
    if (!r || !duel || !duel.over || UI.ending === duel) return;
    UI.ending = duel;
    if (UI.loseDuel === duel) { UI.loseDuel = null; UI.loseNext = Math.max(0, (UI.loseNext | 0) - 1); }
    var wasTut = r.tut === true, firstBoss = !r.aceWon;   // engine 打倒藏家才設 run.aceWon（這一趟第一次）
    // 這場紀錄（11-17）：打完存一份進 run（結算、領獎、說情那段的頂欄「紀錄」看得到；重新整理也在；下一場打完換掉）。序章／教學不存
    if (!inPrologue(r) && !wasTut) { try { r.lastFight = fightRecap(duel); } catch (e) { console.error(e); r.lastFight = null; } }
    var out = null, dry0 = r.chestDry | 0;              // 第 C 波：寶箱保底計數（打之前；保底那箱掀蓋前老闆提醒，SPEC-C §4.2）
    try { out = E.finishFight(r, C, duel); } catch (e) { console.error(e); }
    if (!out || out.error) { console.error('finishFight', out && out.error); persist(); return go(r.over ? 'end' : 'night'); }
    if (wasTut && out.win) save.tutorialDone = true;     // 教學那場打贏（含教學步驟中 KO）：B-tut-done-not-persisted
    r.tut = false;
    (out.met || []).forEach(shelfAdd);
    var aceNew = false;
    // 新章：解鎖制的 run 照引擎 out.aceNew（開局時還沒擁有＝真的多一張；試做卡在挑王牌面板看過也算新）；舊的 run 照舊看唱片櫃有沒有這張
    if (out.aceWon) { aceNew = out.aceNew != null ? !!out.aceNew && !isOwned(out.aceWon) : !save.shelf[out.aceWon]; shelfOwn(out.aceWon, 'boss'); gotCard(r, out.aceWon); }   // 打倒藏家：他的王牌收進唱片櫃、算擁有（src 'boss'；頂點卡只展示，不能當種子）（裁定 5；每輪都送，「收了」只算一次）
    // 第 C 波（SPEC-C §4.1、§4.2）：戰利品列／寶箱（pending reward 有 kind）。寶箱保底計數寫回存檔（跨趟；CONTRACT §2 chestDry）
    var lootP = out.offer && out.offer.type === 'reward' && out.offer.kind && !out.offer.prologue ? out.offer : null;
    if (lootP && lootP.kind === 'chest' && typeof r.chestDry === 'number') save.chestDry = r.chestDry;
    if (lootP && save.wcLog) save.wcLog.lootRows = (save.wcLog.lootRows | 0) + 1;   // 上線後記（SPEC-C §15）：戰利品列／寶箱出了幾次
    persist();
    // 錢跳數字入帳＋錢幣聲（第 A 波 4，取代 1.9 秒的「+$…」吐司）：下一個畫面（領獎／藏家那段）掛好才出；聲望 +3 照舊一顆吐司（審查 #0）
    //   第 C 波：紅包、踢館帖那筆 finishFight 已經入帳（out.packetCash／dareCash）：起點扣回來（CRITIQUE 1.9b），那一段在戰利品列／寶箱再演；
    //   戰利品列的酬勞也在面板裡「錢袋飛進頂上」那一下才跳（loot.js，1.35 秒）
    var pkC = out.packetCash | 0, dareC = out.dareCash | 0;
    if (lootP && W.DipLabLoot && UI.lootOk) {
      UI.lootOut = { p: lootP, earn: out.earn | 0, packetCash: pkC, dareCash: dareC, money: r.money | 0, xp: lootP.kind === 'loot' ? xpInfo(r, out) : null,
        pity: lootP.kind === 'chest' && (lootP.apexSlot || []).length > 0 && dry0 >= (((E.wcCfg ? E.wcCfg(C) : {}).chest || {}).pity | 0) };
      if (lootP.kind === 'chest' && out.earn > 0) cashAfter(r.money - out.earn - dareC, r.money - dareC);
    } else if (out.earn > 0) cashAfter(r.money - out.earn - pkC - dareC, r.money);
    if (out.heal > 0) toastAfter(TU('heal', { n: out.heal }), 'gold');
    // 差一點摘要（第 A 波 4）：輸了記下他剩幾聲望、第幾手被翻盤（結算畫面用；說情再打贏就換掉）
    if (!out.win && !inPrologue(r)) r.lastLoss = lossInfo(duel); else if (out.win) r.lastLoss = null;
    stg('untag');
    if (UI.auto && UI.auto.until === 'duelEnd') UI.auto = null;
    var off = out.offer;
    if (off && off.type === 'retry') return retryFlow(out);
    if (off && off.prologue) return epilogueFlow(false);
    // 藏家：這一趟第一次打倒他才演送牌那段（他的王牌收進唱片櫃）；之後每輪同一張、已經在櫃子裡了：直接領獎／升級（審查 #18）
    if (out.aceWon && (out.aceFirst != null ? out.aceFirst : firstBoss)) return bossDownFlow(out, aceNew);   // 解鎖制：每輪的藏家可以帶不同張，這一趟第一次收這張才演
    if (off && (off.type === 'reward' || off.type === 'level')) return go('reward');
    if (r.over) { recordRun(r); return deadFlow(out); }
    go('night');
  }
  // 中繼點（第 10、20、30、50、75、100 位，之後每 50）：走到就記（SPEC §0；engine advance 記進 run.checkpoints，來客畫面出吐司、記進 save.best；票之後再做）
  function noteCheckpoint(pos) {
    var B = save.best;
    if (!posInt(pos) || B.checkpoints.indexOf(pos) >= 0) return;
    B.checkpoints.push(pos); B.checkpoints.sort(function (a, b) { return a - b; });
  }
  // 差一點摘要（第 A 波 4；規劃書三＋四「都是真的資訊，不造假」）：輸掉那場他剩幾聲望（eHp／eMax）、翻盤那一手（flip：{k, kind, p, e}｜null）。
  //   翻盤＝你那一手之前領先（聲望條比例比他高），那一手之後落後、到最後都沒再追回來。
  //   每手打完的聲望直接用 duel.log 的 pHp／eHp（引擎第 A 波審查起記；頂點卡回聲望也算進去）；開打前＝第 1 手的 pHp＋toP−heal、eHp＋toE。
  //   舊的對決（log 沒有 pHp：升版前開打、續玩打完的）才照舊從結尾用 toP／toE 往回推
  function lossInfo(d) {
    if (!d || !d.p || !d.e) return null;
    var log = (d.log || []).slice(), pM = d.p.max || 1, eM = d.e.max || 1, hp = [];
    var exact = log.length > 0 && log.every(function (L) { return typeof L.pHp === 'number' && typeof L.eHp === 'number'; });
    if (exact) {
      for (var j = 0; j < log.length; j++) hp[j + 1] = [log[j].pHp, log[j].eHp];
      hp[0] = [log[0].pHp + (log[0].toP | 0) - (log[0].heal | 0), log[0].eHp + (log[0].toE | 0)];
    } else {
      var p = d.p.hp, e = d.e.hp;
      for (var i = log.length - 1; i >= 0; i--) { hp[i + 1] = [p, e]; p += log[i].toP | 0; e += log[i].toE | 0; }
      hp[0] = [p, e];
    }
    var cmp = function (x) { var a = x[0] * eM, b = x[1] * pM; return a > b ? 1 : a < b ? -1 : 0; }, flip = null;
    for (var k = log.length; k >= 1; k--) {
      if (cmp(hp[k]) >= 0) break;                      // 這一手之後沒落後：再往前的不算「翻盤」
      if (cmp(hp[k - 1]) > 0) { var L = log[k - 1]; flip = { k: k, kind: L.kind, p: L.pAttr, e: L.eAttr }; break; }
    }
    return { eHp: Math.max(0, d.e.hp | 0), eMax: eM, flip: flip, at: d.e.id || null };
  }
  // ---- 這場紀錄（11-17；scratchpad v5/recap DESIGN §C）：打完的那場存進 run.lastFight，結算畫面的頂欄「紀錄」用 recap.js 同一個面板開在 modal 裡。
  //   log＝引擎 duel.log 的複本（每手的字由 recap.js 經 duel.js clashText 重排，不另外造字）；cards＝這場出過的唱片（封面、藝人、專輯；卡池換了也看得到）
  function DTX(k, d) { var t = C && C.duelText && C.duelText[k]; return typeof t === 'string' ? t : d; }
  function fightRecap(d) {
    if (!d || !d.p || !d.e || !Array.isArray(d.log) || !d.log.length) return null;
    var pools = [d.p.hand, d.p.draw, d.p.disc, [d.p.ace], d.e.thrown, d.e.hand, d.e.pile], cards = {};
    var find = function (id) { for (var i = 0; i < pools.length; i++) { var a = pools[i] || []; for (var j = 0; j < a.length; j++) if (a[j] && a[j].id === id) return a[j]; } return card(id); };
    d.log.forEach(function (L) {
      [L && L.pId, L && L.eId].forEach(function (id) {
        if (!id || cards[id]) return; var c = find(id); if (!c) return;
        cards[id] = { id: c.id, artist: c.artist || '', album: c.album || '' };
        if (c.localCover) cards[id].localCover = c.localCover; if (c.coverUrl) cards[id].coverUrl = c.coverUrl;
      });
    });
    return { eid: d.e.id || null, name: d.e.name || '', log: JSON.parse(JSON.stringify(d.log)), pMax: d.p.max, eMax: d.e.max, maxRounds: (E.CFG && E.CFG.maxRounds) || 6,
      over: d.over ? { win: !!d.over.win, by: d.over.by || null } : null, apex: !!d.apexMode, cards: cards };
  }
  function rcLinks() {
    var r = save.run, F = r && r.lastFight;
    if (!F || !Array.isArray(F.log) || !F.log.length || !W.DipLabRecap || !DUEL() || !DUEL()._fmt) return [];
    return [[DTX('rcLink', '紀錄'), function () { openFightRecap('list'); }, 'recap']];
  }
  function openFightRecap(view, k) {
    var r = save.run, F = r && r.lastFight, RC = W.DipLabRecap, Dl = DUEL();
    if (!F || !RC || !Dl || !Dl._fmt) return null;
    var T = Dl._fmt.text(C);
    var cardOf = function (id) { return card(id) || (F.cards && F.cards[id]) || null; };
    var rows = RC.rowsOf(F.log, { T: T, hints: C.hints, hintLines: C.hintLines, cardOf: cardOf, pMax: F.pMax, eMax: F.eMax, U: F.apex ? ((C.apexTrial && C.apexTrial.ui) || {}) : undefined });
    var m = modal('lb-recap', '', null, { foot: false });
    var pane = qs('.pane', m);
    pane.setAttribute('aria-label', T('rcListDone'));
    RC.mount(pane, { rows: rows, view: view || 'list', k: k, max: F.maxRounds || 6, T: T, title: T('rcListDone'),
      onCard: function (side, row) { var d = row && row[side]; if (d && d.card) info(card(d.card.id) || d.card, { attr: d.attr, from: 'recap-' + side }); },
      onClose: function () { if (UI.modal && UI.modal.el === m) closeModal(); } });
    tlog('recap', 'open', { n: rows.length });
    return m;
  }
  // 這一趟結束（倒下、到這裡就好；放棄＝why 'abandon'）：記進 runs，更新最遠／最多連贏／中繼點（標題「最遠：第 23 位」）
  //   序章裡放棄不記（還沒走到第 1 位）
  function recordRun(r, why) {
    if (!r || r.recorded || (!r.over && why !== 'abandon')) return;
    if (!r.over && inPrologue(r)) return;
    r.recorded = true;
    var sum = E.runSummary(r), B = save.best;
    r.newRecord = (r.farBefore | 0) > 0 && sum.reached > (r.farBefore | 0);
    B.far = Math.max(B.far | 0, sum.reached);
    B.bestStreak = Math.max(B.bestStreak | 0, sum.bestStreak);
    sum.checkpoints.forEach(noteCheckpoint);
    var ent = { seedKey: r.seedKey, runNo: r.runNo, ace: r.ace, result: r.over || why, reached: sum.reached, bestStreak: sum.bestStreak, taken: sum.taken, wins: sum.wins, level: sum.level, checkpoints: sum.checkpoints,
      seeds: (r.seeds || []).slice() };
    // 第 C 波（SPEC-C §2.4、§4.7）：從第幾位開始、這一趟的樂歷記帳（C 波只記；D 波一次入帳）。放棄那一趟也照記
    if (sum.from != null) ent.from = sum.from;
    if (sum.lexp && typeof sum.lexp === 'object') ent.lexp = Object.assign({}, sum.lexp);
    // 第 D 波（SPEC-D §2.6-6；CONTRACT §3.1-3）：樂歷直接入帳（ent.gain、career.xp、熟練度、升級抽盤），lexpBank 不再寫（欄位留給 C 版頁面）
    if (careerOk()) careerRecord(r, sum, ent, why);
    else if (ent.lexp) {
      var LB = save.lexpBank || (save.lexpBank = {});
      Object.keys(sum.lexp).forEach(function (k) { var v = sum.lexp[k]; if (typeof v === 'number' && v > 0) LB[k] = (LB[k] | 0) + Math.floor(v); });
      LB.runs = (LB.runs | 0) + 1;
    }
    save.runs.push(ent);
    if (save.runs.length > 50) save.runs = save.runs.slice(-50);
    save.prologueDone = true;
    save.relics = r.relics.slice(0, 3);
    persist();
  }
  function abandonRun(r) { if (r && !r.over) recordRun(r, 'abandon'); }
  // 場景：對決結束後的那個位置（他在左、你在右、老闆在唱盤後面 ref），鏡頭拉回全景；序章那晚熟客一直藏著
  function afterDuelScene(eid, o, start) {
    var en = C.enemies[eid] || {};
    var r = save.run;
    // 店裡的人（活店 §3.1）：序章那場＝藏（noCrowd）；其他＝還在店裡的站著翻、不進不出（still）
    go('scene', Object.assign({ p: 'duelP', f: 'duelE', fSpr: enemySpr(en), o: 'ref', camMs: 600, noCrowd: !!(r && r.prologue === 'pending'), crowd: 'still', start: function (sc) {
      stg('pose', 'p', null); stg('pose', 'f', null);
      start(sc);
    } }, o || {}));
  }
  // ---- 輸了：序章男子免費再一場；客人每輪一次老闆說情（同一位、同一副牌，聲望回到開打前，裁定 8）
  function retryFlow(out) {
    var r = save.run, eid = out.enemyId, p = r.pending, free = !!(p && p.free);
    if (p && p.safety) return safetyFlow(out);
    afterDuelScene(eid, { recap: true, bgm: true }, function (sc) {   // bgm：說情時也輪播（第 I 波 §4.2-1）
      var dlg = Dialogue(sc, {});
      var winLine = C.lines[eid] && C.lines[eid].win;
      var beats = [];
      // 他贏你那句：盤面打完已經冒過泡泡（COPY-02），這裡只在重新整理回來（沒看到泡泡）時說；序章男子沒有這句（COPY-01）
      if (winLine && out.resumed) beats.push({ who: C.enemies[eid].name, text: '「' + [].concat(winLine)[0] + '」' });
      var OL = C.lines.owner || {};
      beats.push({ who: '老闆', text: '「' + ((free ? OL.retry : (OL.retryAsk || OL.retry)) || '……再一場。') + '」' });
      // 第 D 波（SPEC-D §2.7、§2.8-7）：這一輪的說情用完、用樂歷存的備用說情（pending.plea）：老闆多一句、第一顆不寫「這一輪只有一次」
      var plea = !free && !!(p && p.plea);
      if (plea && OL.retryPlea) beats.push({ who: '老闆', text: '「' + OL.retryPlea + '」' });
      dlg.run(beats).then(function () {
        if (free) { doChoose({ type: 'retry' }); return beginFight({ quick: true }); }
        var menu = ((C.trial && C.trial.ui && C.trial.ui.retryMenu) || []).slice(0, 2);
        if (plea && CU('pleaMenu')) menu[0] = CU('pleaMenu');
        return dlg.menu(menu, { autoIndex: 0 }).then(function (i) {
          if (i === 0) { doChoose({ type: 'retry' }); beginFight({ quick: true }); return; }
          doChoose({ type: 'end' }); recordRun(save.run); deadFlow({ enemyId: eid });
        });
      });
    });
  }
  // ---- 新手保底（第 C 波 SPEC-C §4.8；CRITIQUE 2.3）：上一趟沒到第 10 位（含新帳號第一趟）、這一趟第 1 位輸了＝老闆一句「第一位不算，再來一次。」＋一顆「再來一次」；
  //   不扣說情、不顯示說情次數、只救一次（引擎 pending retry free＋safety）。序章男子那條（free、直接重打）不走這裡
  function safetyFlow(out) {
    var eid = out.enemyId;
    afterDuelScene(eid, { recap: true, bgm: true }, function (sc) {
      var dlg = Dialogue(sc, {});
      var winLine = C.lines[eid] && C.lines[eid].win, beats = [];
      if (winLine && out.resumed) beats.push({ who: C.enemies[eid].name, text: '「' + [].concat(winLine)[0] + '」' });
      beats.push({ who: '老闆', text: '「' + WU('safety') + '」' });
      dlg.run(beats).then(function () {
        return dlg.menu([WU('safetyBtn')], { autoIndex: 0 }).then(function () { doChoose({ type: 'retry' }); beginFight({ quick: true }); });
      });
    });
  }
  // ---- 序章收尾（D §2 E1–E11）：他走出門、地上留一張盤 → 掉落旁白「對方似乎掉落了什麼……」（C.script.drop，同一個對白框；店主 11-13 §0：
  //   男子那張 Eminem 在他牌組裡＝客人掉落，engine 記進 run.drops；取代 DECISIONS-v4 的「撿起面板之前沒有旁白」）→ 撿起面板 → 老闆走到你面前 →
  //   長桌的木箱、發燒配件三選一 → 第一位客人推門 → 來客。重新整理回來從 E4 接著演，旁白一樣會念
  function epilogueFlow(resumed) {
    var r = save.run;
    save.prologueDone = true; persist();             // 序章打贏了：之後放棄這一趟也不會再從序章開始
    afterDuelScene('man', { fSpr: enemySpr(C.enemies[C.prologueEnemy || 'man']), noCrowd: true }, function (sc) {
      var pend0 = r.pending;
      var dropId = pend0 && pend0.cards && pend0.cards[0];
      var ctx = { flags: {}, stakeId: dropId };
      // 重新整理回來：已經做完的面板那一段不再演（他已經走了；配件挑過了就從 E8 接）
      if (resumed) {
        var cardDone = !pend0 || pend0.cardDone || !pend0.cards.length, relicDone = !pend0 || pend0.relicDone || !pend0.relics.length;
        var from = !cardDone ? 'E4' : !relicDone ? 'E5' : 'E8', seen = false;
        ctx.skipBeat = function (b) { if (b.id === from) seen = true; return !seen; };
        if (cardDone) hideActor('f');
        if (!cardDone && card(dropId)) stg('floorRecord', 'duelE', { attr: E.topAttr(card(dropId)), card: dropId });
      }
      var dlg = Dialogue(sc, ctx);
      dlg.run(C.script.epilogueWin, function (ui, b) {
        var pend = save.run.pending;
        if (ui === 'stake') {
          if (!pend || pend.cardDone || !pend.cards.length) { stg('floorRecord', null); return Promise.resolve(); }
          var c = card(pend.cards[0]);
          // 掉落旁白（店主 11-13 §0、§1 裁定 7）：E4 念完、撿起面板之前，同一個對白框念 G1（地上那張盤 E4 一開始就放好了）
          var dropBeats = (C.script && C.script.drop) || [];
          return dlg.aside(dropBeats).then(function () {
            // D §2：撿起面板沒有任何敘述標題，只有封面、藝人《專輯》、兩顆鈕（「不用了」底下：沒收的也算認識，審查 #5）
            return cardPanel(c, { title: null, isNew: true, buttons: [
              { label: '收進包包', sub: bagText(save.run.bag.length), value: 'take', pri: true },
              { label: '不用了', sub: SU('stakeSkipSub'), value: 'skip' }] });
          }).then(function (v) {
            shelfAdd(c.id);
            stg('floorRecord', null);
            if (v === 'take') return takeCard(c.id).then(function (res) { if (!res) doChoose({ type: 'skip' }); else toast(effectsText(res.effects)); sc.stripState = null; renderStrip(sc); });
            doChoose({ type: 'skip' });
          });
        }
        if (ui === 'relic') {
          pend = save.run.pending;
          if (!pend || pend.relicDone || !pend.relics.length) return Promise.resolve();
          var auto = E.runPolicy ? E.runPolicy(save.run, C) : null;
          return relicPanel(pend.relics, { prompt: b.prompt || '挑一件發燒配件', autoId: auto && auto.relicId }).then(function (id) {
            if (!id) { doChoose({ type: 'skip' }); return; }
            return takeRelic(id).then(function (res) { if (res) toast(effectsText(res.effects)); else doChoose({ type: 'skip' }); });
          });
        }
        if (ui === 'map') {
          // E10 推門進來的那位就是第 1 位客人：來客畫面裡他已經在店裡（不剪影、不再推門）
          var rr = save.run;
          if (rr && rr.shop) rr.shop.firstGuestInside = true;
          save.prologueDone = true; persist();
          go('night'); return new Promise(function () {});
        }
        return Promise.resolve();
      });
    });
  }
  // ---- 打倒傳說藏家（每一輪；裁定 5：原本打烊那段的送牌搬到這裡）：他用過的那張王牌（你當初沒選的）翻開、收進唱片櫃 → 領獎 → 升級 → 下一輪
  //   解鎖制（店主 11-16）：他那張讓新的一派解鎖（out.aceUnlock）＝面板多一塊「解鎖了經典流」（鎖頭打開的小演出＋下一趟開局怎麼換）；
  //   沒解鎖新派、但收到新的一張（旗標開：同一派或別派的試做卡；out.aceNew）＝「收進唱片櫃，下一趟開局可以換」
  function bossDownFlow(out, isNew) {
    var aceId = out.aceWon, un = out.aceUnlock && TIERS.indexOf(out.aceUnlock) >= 0 ? out.aceUnlock : null;
    var gain = !un && UI.apex && !!out.aceNew;
    if (un) tlog('unlock', 'tier', { tier: un, card: aceId });
    afterDuelScene(out.enemyId, { o: 'counter' }, function (sc) {
      var dlg = Dialogue(sc, { flags: {}, stakeId: aceId });
      dlg.run(C.script.bossDown || [], function (ui) {
        if (ui === 'stake' && card(aceId)) {
          var p = cardPanel(card(aceId), { title: '他用過的那張', isNew: !!isNew, newText: (un || gain) ? TU('newOwn') : null,
            unlock: un ? { tier: un, title: TU('unlocked', tierVars(un)), sub: TU('unlockedSub') } : null,
            note: gain ? AU('gotNew') : null, buttons: [{ label: '收進唱片櫃', value: 'ok', pri: true }] });
          if (un) later(function () { sfx('win'); }, 650);              // 鎖頭打開那一下
          return p;
        }
        return Promise.resolve();
      }).then(function () {
        // 第 D 波（SPEC-D §3.6）：第一次解鎖某派＝那派熟練度先蓋兩章（老闆「老客人，先蓋兩個章。」；那派玩過、給過就不再給）
        var pf = null;
        if (un && careerOk() && E.profFirst) { try { pf = E.profFirst(C, save.career.prof, un); } catch (e) { console.error(e); } if (pf && pf.add > 0) { save.career.prof = pf.prof; persist(); } else pf = null; }
        go('reward', { said: true });     // 他那句剛說完：領獎畫面不再補說（審查 #2）
        if (un) toast(TU('unlocked', tierVars(un)), 'gold');   // 領獎畫面再提醒一次（面板收掉之後）
        if (pf && (C.lines.owner || {}).profFirst) later(function () { if (UI.screen === 'reward') stageSay('o', C.lines.owner.profFirst, 'owner', 2600); }, 1200);
      });
    });
  }
  // ---- 散場：你坐在地上，老闆一句
  function deadFlow(out) {
    go('scene', { p: 'duelP', o: 'counter', camMs: 600, recap: true, crowd: 'still', start: function (sc) {
      stg('pose', 'f', null);
      guestOut().then(function () { hideActor('f'); });
      var dlg = Dialogue(sc, {});
      dlg.run(C.script.dead).then(function () { go('end'); });
    } });
  }
  // ---- 傳說藏家進門（每輪第 5 位）
  function bossEnterFlow() {
    go('scene', { p: 'duelP', f: 'out', fSpr: 'boss', o: 'counter', crowd: 'still', start: function (sc) {
      var dlg = Dialogue(sc, {});
      dlg.run(C.script.bossEnter, function (ui, b) {
        if (ui === 'duel') return dlg.menu([b.prompt || '▶ 品味對決']).then(function () { stg('clearStamps'); beginFight({ enter: true }); return new Promise(function () {}); });
        return Promise.resolve();
      });
    } });
  }
  // ---- 重看教學（規則卡／⏸）：不跑劇情、不寫存檔、沒有獎勵
  function replayTutorial() {
    var T = TUT();
    if (!canTutorial() || UI.screen === 'duel' || !T.replayDuel) return;
    var tier = save.lastAce || (save.run && save.run.ace) || 'hall';
    // 包包＝老闆四張＋特價箱三張（上次序章挑的那三張；沒有就 c、o、h 各第一張）——第 5 手才抽得到「冷 ≤3」那張（§2.5.5）
    var last = save.lastBargain || null;
    var res; try { res = T.replayDuel(C, tier, 7, { bargain: last }); } catch (e) { console.error(e); return; }
    var bag = T.replayBag ? T.replayBag(C, tier, last) : (C.gifts[tier] || []).slice();
    var back = UI.screen === 'night' ? 'night' : (save.run && !save.run.over ? 'resume' : 'title');
    go('duel', { res: res, enemyId: C.prologueEnemy || 'man', enter: true, tutorial: true, replay: true, fakeRun: { ace: tier, bag: bag, retryLeft: 1, relics: [], idx: 0 } });
    UI.tutReplay = { back: back };
  }
  function endReplay() {
    var back = (UI.tutReplay && UI.tutReplay.back) || 'title';
    leaveDuel();
    resetPoses();
    if (back === 'resume') resumeRun(); else if (back === 'night' && save.run && !save.run.over) go('night'); else go('title');
  }

  // ======================================================================= reward：贏了挑他一張唱片（菁英／藏家：唱片或一件配件）→ 升級三選一（有升級才有，連升就連選）→ 下一位
  SCREENS.reward = function () {
    var r = save.run, p = r && r.pending;
    if (!p || (p.type !== 'reward' && p.type !== 'level')) return resumeRun();
    if (p.prologue) return epilogueFlow(true);
    var en = C.enemies[p.enemyId] || {};
    setTop(esc(TU('pos', { n: r.pos })) + '<small>' + esc(en.name || '') + '</small>', { links: rcLinks(), help: true, pause: true });
    UI.panel.classList.add('reward');
    wornFirst(p);                                      // 第 I 波 I-2：第一次聽膩，老闆說一句（save.seen.wear）
    stg('interact', 'reward');
    stg('pose', 'f', null); stg('pose', 'p', null);
    place('p', 'duelP', 'player'); place('o', 'counter', 'owner');
    if (!stg('has', 'f')) place('f', 'duelE', enemySpr(en));
    stg('sprite', 'f', enemySpr(en)); stg('hide', 'f', false); stg('sil', 'f', false);
    var lose = (C.lines[p.enemyId] && C.lines[p.enemyId].lose) || [];
    var fromDuel = UI.trail.length >= 2 && UI.trail[UI.trail.length - 2] === 'duel';   // 盤面打完那一下已經說過了（COPY-02）；重新整理回來才在這裡說
    // 藏家：他那句（送你那張）只在第一次打倒他的送牌那段說；領獎畫面一律不補（審查 #2、#18）
    var said = fromDuel || !!(UI.params && UI.params.said) || p.cls === 'boss';
    if (!said && lose.length) later(function () { stageSay('f', [].concat(lose)[0], null, 2200); }, 300);
    var cards = (p.cards || []).map(card).filter(Boolean), relics = (p.relics || []).filter(relicOf);
    // 第 C 波（SPEC-C §4.1、§4.2）：pending 有 kind＝戰利品列（loot）／寶箱（chest），交給 loot.js 演；沒有 kind＝升版前存的舊形狀，照舊路
    var LT = p.type === 'reward' && p.kind && W.DipLabLoot && UI.lootOk ? W.DipLabLoot : null;
    var dropping = !LT && p.type === 'reward' && cards.length && !p.cardDone;      // 掉落旁白：他早一點轉身走，地上那張盤才看得到
    later(function () { stg('door', 'open'); guestOut().then(function () { hideActor('f'); stg('door', 'close'); }); }, LT ? 300 : dropping ? 900 : 1700);   // 戰利品列：0 秒他就轉身走（字幕同時出）
    var busy = false;
    // 面板（配件滿按「算了」回來時重畫這一張：sheet() 開新面板會把它拿掉；RT-1）
    function showSheet() {
      var rr = save.run;
      var bagLine = bagText(rr.bag.length);           // 包包不限張數（店主 11-16）：只寫張數
      // 有唱片又有配件：配件放進底下那條、跟「都不要」並排，矮螢幕也不用捲才看得到（RT-3）
      var footRelic = cards.length && relics.length;
      var html = '<div class="hd"><h3>' + (cards.length ? '他丟過的唱片：挑一張收進包包' : '他沒有能收的唱片') + '</h3><span class="sub">' + esc(bagLine) + '</span></div>' +
        (cards.length ? '<div class="lb-rgrid' + (cards.length > 4 ? ' rows2' : '') + '">' + cards.map(function (c) { return tileHTML(c, { pick: '收這張', isNew: isNewOnShelf(c.id) }); }).join('') + '</div>' +
          '<p class="note">' + esc(SU('rewardNote')) + '</p>' : '') +      // 沒收的只算「認識」，不是「我的收藏」（審查 #5）
        (relics.length && !footRelic ? '<div class="lb-h3">挑一件發燒配件</div><div class="lb-opts">' + relicButtonsHTML(relics, 'data-r') + '</div>' : '') +
        (footRelic && relics.length > 1 ? '<div class="lt-rel3"><span class="cap">或改拿一件發燒配件</span><div class="row3">' + relicButtonsHTML(relics, 'data-r', { cell: true }) + '</div></div>' +
          '<div class="foot"><button type="button" class="lb-btn wide lt-skip sm" data-a="skip">都不要</button></div>'
          : footRelic ? '<div class="foot two rel"><div class="orr"><span class="cap">或改拿一件發燒配件</span>' + relicButtonsHTML(relics, 'data-r') + '</div>' +
          '<button type="button" class="lb-btn" data-a="skip">都不要</button></div>'
          : '<div class="foot"><button type="button" class="lb-btn wide" data-a="skip">' + (cards.length || relics.length ? '都不要' : '繼續') + '</button></div>');
      var s = sheet(wornHd(encCarryHd(html)), 'reward');      // 第 I 波翻面：「翻面留到下一位」小字；I-2：「《…》聽膩了」小字
      fitRewardSheet(s);
      s.addEventListener('click', function (e) {
        if (busy) return;
        var pk = e.target.closest && e.target.closest('[data-pick]');
        var rl = e.target.closest && e.target.closest('[data-r]');
        if (pk) { busy = true; sfx('select'); takeCard(pk.getAttribute('data-pick')).then(finish); return; }
        if (rl) { busy = true; sfx('select'); takeRelic(rl.getAttribute('data-r')).then(finish); return; }
        if (e.target.closest && e.target.closest('[data-a=skip]')) { busy = true; finish(doChoose({ type: 'skip' })); }
      });
      autoAct(function () {
        var ch = E.runPolicy(save.run, C) || { type: 'skip' };
        if (ch.type === 'take') { busy = true; takeCard(ch.cardId).then(finish); }
        else if (ch.type === 'relic') { busy = true; takeRelic(ch.relicId, ch.dropRelicId).then(finish); }
        else { busy = true; finish(doChoose({ type: 'skip' })); }
      }, 300);
      return s;
    }
    var finish = function (res) {
      clearDrop();                                                          // 地上那張（掉落旁白）收掉
      if (res && res.effects) toast(effectsText(res.effects), 'keep');      // 接著 300 ms 換畫面：留到時間到（審查 #0）
      var rr = save.run;
      if (rr.pending && rr.pending.type === 'reward') { busy = false; if (UI.screen === 'reward') { if (LT) LT.redraw(); else showSheet(); } return; }   // 還沒選完（配件滿了按「算了」）：挑唱片的面板放回來
      if (rr.pending && rr.pending.type === 'level') return later(levelNext, 300);
      if (rr.over) { recordRun(rr); return later(function () { go('end'); }, 300); }
      later(function () { go('night'); }, 300);
    };
    // 升級三選一：選完還有（連升）就再開一次；選完到下一位（來客；打完藏家＝下一輪新面孔）
    var levelNext = function () {
      if (UI.screen !== 'reward') return;
      var rr = save.run;
      if (!rr || !rr.pending || rr.pending.type !== 'level') return later(function () { go('night'); }, 300);
      levelPanel(rr).then(function (pick) {
        var fid = /^fac:/.test(pick) ? pick.slice(4) : null;    // 第 D 波棒二：本派格（CONTRACT §3：{type:'level', pick:'fac', id}）
        var res = doChoose(fid ? { type: 'level', pick: 'fac', id: fid } : { type: 'level', pick: pick });
        if (res && res.ok) toast(fid ? FU('pickTag') + '・' + ((facPickOf(rr.ace, fid) || {}).name || '') : ((C.trial && C.trial.levelUp) || {})[pick] || '', 'gold keep');   // 選完 300 ms 就到來客：吐司留滿自己的時間（審查 #0）
        levelNext();
      });
    };
    if (p.type === 'level') { later(levelNext, 300); return; }
    // 戰利品列／寶箱（loot.js）：剛打完才有 out（onDuelEnd 的 UI.lootOut：錢、經驗、紅包、踢館帖、保底）；重新整理回來＝null（同一列直接翻開、不再演錢）
    if (LT) {
      var lo = UI.lootOut && UI.lootOut.p === p ? UI.lootOut : null; UI.lootOut = null;
      try { LT[p.kind === 'chest' ? 'chestFlow' : 'lootFlow']({ p: p, out: lo, finish: finish }); } catch (e) { console.error(e); showSheet(); }
      return;
    }
    // 掉落旁白（店主 11-13 §0、§1 裁定 7）：有能收的唱片才念「對方似乎掉落了什麼……」，他站的地方留一張平躺的唱片（照序章收尾 E4）；念完才開挑唱片的面板
    if (dropping) return dropNarration(cards, showSheet);
    showSheet();
  };
  // 領獎面板（舊的挑唱片、戰利品列、寶箱）：面板量出來要多高，舞台就收到放得下（最多讓到可視高的 72%）：收這張的鈕不被底下那條蓋住
  function fitRewardSheet(s) {
    var vh = W.visualViewport ? Math.min(W.innerHeight, W.visualViewport.height) : W.innerHeight;
    var needR = Math.min(Math.round(vh * 0.72), Math.max(260, Math.ceil(naturalH(s) + 4)));
    if (vh - 32 - needR < 210) cam('strip', 'reward', 600);       // 放不下整間店：收成對決那條（你和他都還在畫面裡），不要把店縮成一小塊
    else cam('reward', 'reward', 600, needR);
    s._armUntil = now() + 620 / speed();                            // 鏡頭收完、鈕停在最後的位置才收點擊（RT-13）
  }
  // 掉落旁白：對白框（旁白）念 C.script.drop，點一下或時間到才往下；面板收掉時地上的唱片一起收（finish → clearDrop）
  function dropNarration(cards, then) {
    var beats = (C.script && C.script.drop) || [];
    var c0 = cards[0];
    if (c0) stg('floorRecord', 'duelE', { attr: E.topAttr(c0), card: c0.id });
    UI.dropFloor = !!c0;
    if (!beats.length) return then();
    var scr = UI.screen;
    cam('full', 'scene', 600);                       // 看得到整間店：他往門口走、地上那張盤
    var dq = el('div', 'lb-dq narr drop', '<div class="nm"></div><div class="tx" aria-live="polite"></div><div class="nx" aria-hidden="true">▼</div><div class="menu"></div>');
    UI.panel.appendChild(dq);
    // 高螢幕（430×932）：對白框照內容長，舞台往下接木地板吃掉剩下的高，框貼底（跟一般對白框一樣；審查 #7）。鏡頭停下來時 cam() 會再量一次
    UI.dropDq = dq; floorSoon();
    var dlg = Dialogue({ panel: UI.panel, box: dq, dq: dq, strip: null }, {});
    dlg.run(beats).then(function () {
      if (UI.dropDq === dq) UI.dropDq = null;
      if (UI.screen !== scr || UI.dlg !== dlg) return;
      dlg.cancel(); UI.dlg = null; dq.remove();
      then();
    });
  }
  function clearDrop() { if (UI.dropFloor) { UI.dropFloor = false; stg('floorRecord', null); } }
  // 升級面板（SPEC 無限試煉 §0）：「升級：Lv 4」＋「聲望上限 +1（自動）」；三顆大鈕（engine.levelOffer：固定 品味→底氣→聲望 順序，店主 11-20），沒有「算了」
  //   o（第 C 波中繼點開局選秀）：{ title, offer }＝標題換成「補到第 N 位：升級 i/m」、選項用選秀那一題的
  // 升級面板的本派格（第 D 波棒二；SPEC-D §3.5、CONTRACT §3）：本派一字圖示＋名字（小標「本派」、第二招）＋一句＋右邊灰字「不加屬性」；data-lv="fac" data-id
  function facLvlHTML(r, o) {
    var D0 = facDef(r && r.ace), P = facPickOf(r && r.ace, o.id); if (!D0 || !P) return '';
    var ax = (C.aceAxis || {})[r.ace] || '';
    return '<button type="button" class="lb-btn big lb-lvl fac" data-lv="fac" data-id="' + esc(P.id) + '"><span class="fi ' + esc(ax) + '" aria-hidden="true">' + esc(D0.icon || '') + '</span>' +
      '<span class="tx"><span class="nm key">' + esc(P.name) + '<small>' + esc(FU('pickTag')) + '</small>' + (P.second ? '<small class="sc">' + esc(FU('second')) + '</small>' : '') + '</span>' +
      '<span class="ds">' + facNw(P.text) + '</span></span><span class="nv">' + esc(FU('pickNote')) + '</span></button>';
  }
  // 第一次升級那句（第 I 波 I-0 審查）：打贏第 1 位就升級之後，升級面板緊接在戰利品列後面——戰利品列第一次那句（firstLoot；375 寬改成吐司）、
  //   「唱片櫃 +2」、錢那條這些吐司還在，或老闆／熟客還在講 → 每 0.25 秒看一次，都收掉才說（最多等 8 秒）。
  //   面板先收掉（已經挑了）＝不說、不記 seen（下次升級再說）；說了才記 save.seen.lv1
  function firstLvSay(s, text, open) {
    var t0 = Date.now(), cap = 8000 / speed();
    (function tick() {
      if (!s || !s.isConnected || (open && !open()) || save.seen.lv1) return;
      var busy = sayTill() > Date.now() || qsa('.lb-toast:not(.out)', app()).length > 0;
      if (busy && Date.now() - t0 < cap) { later(tick, 250); return; }
      save.seen.lv1 = true; persist(); stageSay('o', text, 'owner', sayMs(text));
    })();
  }
  function noRunYet() { return !(save.runs || []).some(function (e) { return e && typeof e === 'object'; }); }   // 新帳號第一趟（這一趟還沒記進 runs）
  function levelPanel(r, o2) {
    var p = r.pending, L = (C.trial && C.trial.levelUp) || {};
    var now = { atk: r.atk | 0, def: r.def | 0, hp: r.maxHp | 0 };
    var offer = (o2 && o2.offer) || p.offer || [], ttl = (o2 && o2.title) || fill(L.title, { n: p.level });
    // 第 I 波 I-0（SPEC-I §7.2）：自動加的聲望上限照 engine levelHpAt——升到 Lv2 那次是 0（firstHp），那一行「聲望上限 +1（自動）」不出
    var lvFrom = o2 ? (r.level | 0) : (p.level | 0) - 1, autoHp = E.levelHpAt ? E.levelHpAt(trialT(r), lvFrom) : 1;
    return new Promise(function (res) {
      var html = '<div class="hd' + (o2 ? '' : ' lvup') + '"><h3>' + esc(ttl) + '</h3><span class="sub">' + esc([autoHp > 0 ? L.sub : '', TU('hp', { n: r.hp, max: r.maxHp })].filter(Boolean).join('・')) + '</span></div>' +
        '<div class="lb-opts' + (offer.some(function (o) { return o && o.pick === 'fac'; }) ? ' n4' : '') + '">' + offer.map(function (o) {   // n4：多了本派格（矮螢幕收緊一點，style.css）
          if (o && o.pick === 'fac') return facLvlHTML(r, o);         // 第 D 波棒二：本派格（第 4 格；不進屬性那段：now／L[pick+'Sub'] 對 fac 是 undefined）
          return '<button type="button" class="lb-btn big lb-lvl" data-lv="' + esc(o.pick) + '"><span class="tx"><span class="nm key">' + esc(L[o.pick] || o.pick) + '</span><span class="ds">' + esc(fill(L[o.pick + 'Sub'] || '', { n: o.n | 0 })) + '</span></span>' +
            '<span class="nv">' + now[o.pick] + ' → ' + (now[o.pick] + (o.n | 0)) + '</span></button>';
        }).join('') + '</div>';
      var s = sheet(html, 'level');
      roomForSheet(s);
      // 第 D 波棒二：第一次出現本派格（Lv5）老闆說一句（每份存檔一次）
      if (!o2 && offer.some(function (o) { return o && o.pick === 'fac'; }) && !save.seen.facPick && FU('pickFirst')) { save.seen.facPick = true; persist(); stageSay('o', FU('pickFirst'), 'owner', 2600); }
      // 第 I 波 I-0（SPEC-I §7.2）：第一次升級（每份存檔一次，save.seen.lv1）老闆說一句「打贏就會升級，挑一項，這一趟都有效。」；選秀不算。
      //   審查：只給第一趟（save.runs 還沒有任何一趟；老存檔沒有 seen.lv1 也不說）；戰利品列第一次那句、吐司還在就等它們收掉才說（firstLvSay）
      else if (!o2 && !save.seen.lv1 && L.first && noRunYet()) firstLvSay(s, L.first, function () { return !done; });   // done：已經挑了（面板收的動畫還連著也不說）
      var done = false;
      s.addEventListener('click', function (e) {
        var b = e.target.closest && e.target.closest('[data-lv]'); if (!b || done) return;
        var lv = b.getAttribute('data-lv');
        done = true; sfx('select'); closeSheet(s); res(lv === 'fac' ? 'fac:' + (b.getAttribute('data-id') || '') : lv);   // 本派格回 'fac:<id>'（levelNext 送 {pick:'fac', id}）
      });
      autoAct(function () {
        var ch = E.runPolicy(save.run, C) || {};
        var b = (ch.pick === 'fac' && ch.id ? qs('[data-lv="fac"][data-id="' + cssEsc(ch.id) + '"]', s) : null) || qs('[data-lv="' + (ch.pick || '') + '"]', s) || qs('[data-lv]', s); if (b) b.click();
      }, 260);
    });
  }

  // ======================================================================= 來客（SPEC-v3 §9：店內底部一條，五顆頭像，打完的變黑，下一位金框；v4：錢、熟客出現、第一位客人已在店裡；
  //   v5 無限試煉：這一輪 5 位（頭像下寫第 n 位，第 5 位紅框傳說藏家；打完藏家整排換成下一輪的新面孔＝滾動）、離下個中繼點還有幾位、說情剩幾次、聲望那顆）
  function moneyHTML(n) { var X = econ(); if (X && typeof X.moneyHTML === 'function') try { return X.moneyHTML(n); } catch (e) { console.error(e); } return fill((C.shopUi && C.shopUi.money) || '${n}', { n: E.moneyText(n | 0) }); }
  // 包包張數（店主 11-16 包包不限張數：只寫張數，不寫上限）：「包包 9 張」（C.shopUi.bag）；包包條那顆數字粗體
  function SHU(k, o) { return fill((C.shopUi && C.shopUi[k]) || '', o); }
  function bagText(n) { return fill((C.shopUi && C.shopUi.bag) || '包包 {n} 張', { n: n }); }
  function bagBtnHTML(n) { var t = (C.shopUi && C.shopUi.bag) || '包包 {n} 張', k = t.indexOf('{n}'); return k < 0 ? esc(fill(t, { n: n })) : esc(t.slice(0, k)) + '<b>' + n + '</b>' + esc(t.slice(k + 3)); }
  // 人已經在店裡、看得到：走過去（不瞬移）；不在店裡（藏著、在門外）才直接擺上去
  function settle(id, spot, spr) {
    var at = stg('pos', id), sp = stg('spot', spot);
    if (!UI.camQuick && at && !at.hidden && !at.outside && stg('has', id) && sp) {
      if (spr) stg('sprite', id, spr === 'player' ? playerAv() : spr);
      stg('sil', id, false);
      if (Math.round(at.x) !== sp[0] || Math.round(at.y) !== sp[1]) stgP('walk', id, [spot], (C.blocking && C.blocking.speed) || 54);
      return;
    }
    place(id, spot, spr);
  }
  // 你要走去的站位旁邊站著人（來客畫面、門邊等的第一位客人 f）：他走到另一個空的等候位（atdoor／wait），兩個人不疊在一起（RT-12）
  var ROOM_DX = 38, ROOM_DY = 44;
  // （第 A 波 1 之前：第一位客人站門邊 atdoor／試聽桌前 wait 等你＝waitSpot；現在客人一律走到對戰台 duelE 等，見 guestToTable）
  function makeRoom(to) {
    crowdCall('yield', to);                                   // 活店（SPEC-H §4.3）：停在你要去的那格的客人先讓開（同一排另一格，沒有就出門）
    if (UI.screen !== 'night' || !to || !stg('has', 'f')) return;
    if (save.run && (UI.atTable === tableKey(save.run) || UI.atTable === sparKey(save.run))) return;   // 在對戰台等你的客人（第 A 波 1；切磋的熟客也是）：那是他的位置，不讓開
    var f = stg('pos', 'f'); if (!f || f.hidden || f.outside) return;
    var near = function (a) { return a && Math.abs(a[0] - to[0]) < ROOM_DX && Math.abs(a[1] - to[1]) < ROOM_DY; };
    if (!near([f.x, f.y])) return;
    var alt = ['wait', 'atdoor'].map(function (k) { return [k, stg('spot', k)]; }).filter(function (x) { return x[1] && !near(x[1]); })[0];
    if (alt) stgP('walk', 'f', [alt[0]], (C.blocking && C.blocking.speed) || 54);
  }
  // ---- 挑戰者在對戰台等（第 A 波 1）：UI.atTable＝已經走到對戰台的那一位（runTag@第幾位）——來客畫面重畫（關抽屜、換王牌、重新整理）時他就站在那裡，
  //   不再推門一次；第一次輪到他才推門、走進來（in → duelE），到了說他的開場那句
  function tableKey(r) { return runTag(r) + '@' + r.pos; }
  function guestWaits(r) { var id = r && r.order && r.order[r.idx], en = id && C.enemies[id]; return !!(en && !en.boss); }
  function guestToTable(r) {
    var id = r.order[r.idx], en = C.enemies[id] || {}, spr = enemySpr(en), key = tableKey(r);
    var inside = !!(r.shop && r.shop.firstGuestInside) && r.idx === 0;
    if (inside) { r.shop.firstGuestInside = false; persist(); }
    var at = stg('pos', 'f');
    // 已經走進來了（或自動遊玩、鏡頭快轉）：站到（走回）對戰台；序章收尾推門進來的那位（還在門邊）從原地走過去
    if (UI.atTable === key || inside || UI.auto || UI.camQuick) {
      var seen = UI.atTable === key; UI.atTable = key;
      if (!seen && inside && at && !at.hidden && !at.outside && stg('has', 'f')) {
        stg('sprite', 'f', spr); stg('sil', 'f', false);
        var gin0 = guestRoute('in');
        crowdCall('clearRoute', stg('route', 'f', gin0), { who: 'f' });
        stgP('walk', 'f', gin0, TABLE_WALK).then(function () { arriveTable(key, id); });
        return;
      }
      settle('f', 'duelE', spr); stg('sil', 'f', false); stg('door', 'close');
      return;
    }
    UI.atTable = key;
    // 主線客人的路（SPEC-H §4.2）：in → frontleft → duelE（走 frontleft 才不會穿過島邊左排翻箱的人）；活店關著也照這條走。
    //   活店：先清路（只會碰到試聽桌那格）、到站＋1.2 秒前門不給路人用
    var gin = guestRoute('in');
    stg('door', 'swing'); place('f', 'door', spr); stg('sil', 'f', false);
    crowdCall('clearRoute', stg('route', 'door', gin), { who: 'f', door: true });
    stgP('walk', 'f', gin, TABLE_WALK).then(function () { arriveTable(key, id); });
  }
  // 主線客人進出的路（dip.json crowd.guest；沒有就用規格的那兩條）
  function guestRoute(k) {
    var g = stg('crowdGuest');
    if (g && Array.isArray(g[k]) && g[k].length) return g[k].slice();
    return k === 'in' ? ['in', 'frontleft', 'duelE'] : ['frontleft', 'in', 'door', 'leave'];
  }
  // 主線客人打完出門（輸了的他、或你倒下後他走）：frontleft → in → door → leave（反過來走進場那條），先清路
  function guestOut() {
    var go2 = guestRoute('out');
    crowdCall('clearRoute', stg('route', 'f', go2), { who: 'f' });
    return stgP('walk', 'f', go2);
  }
  var TABLE_WALK = 90;                                         // 客人走到對戰台的速度（shop 預設 36；推門到對戰台約 2 秒）
  function arriveTable(key, id) {
    if (UI.screen !== 'night' || UI.atTable !== key || UI.going) return;
    var f = stg('pos', 'f'), sp = stg('spot', 'duelE');                 // 半路被別的走路接手（來客畫面重畫）也會 resolve：真的站到了才說話
    if (!f || !sp || Math.abs(f.x - sp[0]) > 1 || Math.abs(f.y - sp[1]) > 1) return;
    stg('door', 'close');
    stg('faceTo', 'f', 'duelP');                               // 面向對戰台另一邊（你站上去的位置）
    tableIntro(key, id);
  }
  // 客人站到對戰台的開場那句（1.8 秒）：老闆還在講（?apex=1 跳過序章、只收到一張＝apexIntroOnNight 'said'，老闆那句 3.2 秒）＝等他講完再說，
  //   不讓兩個人同時講話（合併審查 11-16：main 的 sayMs 只把提示往後挪，客人走到對戰台約 1.4 秒就開口）
  function tableIntro(key, id) {
    if (UI.screen !== 'night' || UI.atTable !== key || UI.going) return;
    var intro = C.lines[id] && C.lines[id].intro;
    if (!intro || qs('.ec-drawer', app())) return;
    var wait = sayTill() - Date.now();                          // 活店（SPEC-H §5.2）：老闆或店裡有人正在跟你聊，等他講完
    var chatW = (+crowdCall('chatTill') || 0) - Date.now();    // 聊天（有 ▼ 的泡泡點了才換）可能提早收：每秒再看一次，不白等 20 秒
    if (wait > 0) { later(function () { tableIntro(key, id); }, ((chatW > (UI.oSayTill || 0) - Date.now() ? Math.min(wait, 1000) : wait) + 250) * speed()); return; }
    stageSay('f', [].concat(intro)[0], null, 1800);
    UI.fSayTill = Date.now() + 1800 / speed();                 // 挑戰者開場那句講到什麼時候（shopNotes 等他講完：審查修正 p2b，切磋收完老闆跟主線客人同時開口）
  }
  // ---- 切磋（＝店主說的遭遇戰；SPEC-H §7.3，棒 4b；引擎 run.spar，scratchpad v5/liveshop/p2/CONTRACT.md）：熟客走到對戰台嗆你（f 演他；這一位主線客人在門外等）
  //   → 點他或點對戰台開邀請面板（encSheet）→ 來一盤＝短局（duel.js 讀 p.view）→ 贏了戰利品列（loot.js 的 enc）；改天、30 秒沒理他、打完＝他去左排翻一下再走、主線客人推門。
  //   UI.atTable＝'enc#'＋tableKey（不是主線客人的鍵：之後 guestToTable 照常演主線客人推門；arriveTable／tableIntro／makeRoom 對他不成立）。
  //   UI.enc＝{ key, who, pos, phase:'walk'（走過去）|'table'（在對戰台等）|'fight'|'loot'（打贏還沒收）|'leave'（說完那句就走）|'gone', waited（等你的遊戲毫秒）, dare（嗆那句） }
  //   畫面另擋（引擎不管）：活店關著（?crowd=0、自動化瀏覽器）、自動遊玩 UI.auto 不開邀請、不寫 run.spar。走動槽的交接在 crowd.js（handOff／takeBack／encDecline）
  var ENC_Q = (function () { var o = {}; try { new URLSearchParams(location.search).getAll('enc').join(',').split(',').forEach(function (k) { k = k.trim(); if (k) o[k] = true; }); } catch (_) {} return o; })();
  function encQ(k) { return DEBUG && !!ENC_Q[k]; }
  function SPU(k, o) { return fill((C.crowdUi && C.crowdUi[k]) || '', o); }   // 切磋的介面字（C.crowdUi）；不叫 CU：CU 是樂歷的（:555，同名函式宣告會蓋掉樂歷那個，樂歷頁、結算、標題第二行全變空字）
  function sparKey(r) { return 'enc#' + tableKey(r); }
  function sparCash() { return E.moneyText(((E.wcCfg ? E.wcCfg(C) : {}).loot || {}).skipCash | 0); }
  // 切磋讀的 content（encOffer／choose／encStart／encFinish 都吃這一份）：?debug=1&enc=force＝這一位一定有邀請（從第 1 位、每輪、這一位）；enc=bag＝包包模式（可以寫 enc=force,bag）；
  //   __lab.crowd.enc(who)＝這一位、指定誰（encW 只留他）。都沒有＝C（正式：C.encounter.on 打開才有）
  function SC(r) {
    var F = UI.encForce && r && UI.encForce.pos === r.pos && UI.encForce.tag === runTag(r) ? UI.encForce : null, X = null;
    if (encQ('force') || F) X = { on: true, p: 1, from: 1, slots: [r ? r.idx | 0 : 0] };
    if (encQ('bag')) X = Object.assign(X || {}, { reward: 'bag' });
    if (!X) return C;
    var out = Object.assign({}, C, { encounter: Object.assign({}, C.encounter, X) });
    if (F && F.who && C.regulars && C.regulars[F.who]) {
      var R2 = {}; Object.keys(C.regulars).forEach(function (k) { R2[k] = Object.assign({}, C.regulars[k], { encW: k === F.who ? 1 : 0 }); });
      out.regulars = R2;
    }
    return out;
  }
  // 活店這一位是 live（跟 crowdSync 的 night 同一個判斷）＋不是自動遊玩＝才開邀請
  function crowdLive(r) {
    if (!r || !save.prologueDone || E.nextStep(r) !== 'fight') return false;
    var first = !(save.runs && save.runs.length), from = (C.crowd && C.crowd.firstRunFrom) || 2;
    return !(first && r.pos < from);
  }
  function sparOk(r) { return !!r && !UI.auto && crowdChatOn() && crowdLive(r); }
  function encLootPending(r) { return !!r && E.encPending(r) === 'loot'; }
  // 他的切磋句（C.chat；棒 3d）：來客畫面講的那幾句＝引擎 encView 沒釘給對決的那些（E.SPAR_LINE_IDS：嗆 01／02 在這裡、03 在盤面；「唱片你挑」encLose-01、安慰 encWin-02 在這裡）
  function sparLines(who, cat) {
    var L = (C.chat || []).filter(function (l) { return l && l.who === who && l.cat === cat; }), P = E.SPAR_LINE_IDS || {}, pins = [];
    Object.keys(P).forEach(function (k) { var x = P[k]; if (Array.isArray(x) && x[0] === cat) pins.push(who + '-' + cat + '-' + x[1]); });
    var rest = L.filter(function (l) { return pins.indexOf(l.id) < 0; });
    return rest.length ? rest : L;
  }
  function sparText(l) { return l ? [].concat(l.text).filter(function (t) { return typeof t === 'string'; }).join('') : ''; }
  // 挑一句：照聊天的輪替（chatPick 硬指定分類）；見過的熟客記進 save.regulars.met[who].seen（沒見過的不建 met：第一次聊天的開場那句照留）
  function sparPick(who, cat) { return sparText(sparPickL(who, cat)); }
  // 挑一句（回 C.chat 那一筆；out＝說完會直接出門那種，審查修正 p2b）
  function sparPickL(who, cat) {
    var L = sparLines(who, cat); if (!L.length) return null;
    var K = W.DipCrowdCore, reg = regsOf(), m = reg.met[who] || null, r = save.run, res = null;
    try { res = K && K.chatPick ? K.chatPick({ who: who, pool: L, seen: m ? m.seen : {}, n: (reg.n | 0) + (r ? r.pos | 0 : 0), ctx: { cat: cat, met: true } }) : null; } catch (e) { console.error(e); }
    var l = res && res.lines && res.lines[0];
    if (l && m && res.seen && !Array.isArray(res.seen)) { m.seen = res.seen; UI.chatDirty = true; }
    return l || L[0];
  }
  // 打完回來客畫面他說的那句：你贏了＝「他輸了」那類（唱片你挑）；你輸了＝「他贏了」那類。
  //   mixed＝戰利品列裡有不是他的唱片（他的你大多收過了，用卡池補）：不講「我的唱片隨你挑」那種（C.chat own:true；審查修正 p2b）
  function sparEndLine(who, youWon, mixed) {
    var L = sparLines(who, youWon ? 'encLose' : 'encWin');
    if (youWon) { var M = L.filter(function (l) { return mixed ? !l.own : !!l.own; }); if (M.length) L = M; }
    return sparText(L[0]);
  }
  // 唱片櫃模式：他那 7 張你還沒收的有幾張（包包模式：包包裡沒有的）——邀請面板、戰利品列判「是不是全是他的唱片」
  function sparHisLeft(r, who, mode) {
    var d = (C.regulars[who] && C.regulars[who].enc && C.regulars[who].enc.deck) || [];
    return d.filter(function (id) { return card(id) && (mode === 'bag' ? r.bag.indexOf(id) < 0 : !isOwned(id)); }).length;
  }
  // 說一句就走的那句停多久（SPEC-H §5.3 最後一句：clamp(3000＋200×字數, 6000, 12000)；?fast=1 ÷4、動畫加速不吃）→ 真實毫秒（審查修正 p2b：原本 max(2600, sayMs) 只停 3–4 秒）
  function sparHoldMs(text) {
    var B = (C.crowd && C.crowd.bubble) || {}, nb = function (v, d) { return typeof v === 'number' && v > 0 ? v : d; };
    return Math.min(nb(B.max, 12000), Math.max(nb(B.min, 6000), nb(B.base, 3000) + nb(B.perChar, 200) * chatLen(text || ''))) / (FAST ? 4 : 1);
  }
  function sparChoose(ch) {
    var r = save.run, res = null;
    try { res = E.choose(r, SC(r), ch); } catch (e) { console.error(e); res = { ok: false, error: 'throw' }; }
    if (!res.ok) console.warn('spar choose', res.error, ch);
    (res.effects || []).forEach(function (f) { if (f.gainCard) { shelfAdd(f.gainCard); gotCard(r, f.gainCard); } });
    persist();
    return res;
  }
  // 來客畫面要畫這一位（SCREENS.night，guestToTable 之前）：熟客佔著對戰台＝回 true（主線客人在門外等、q1 是他）
  function sparNight(r) {
    try {
      var pend = E.encPending(r), S = r.spar, key = sparKey(r);
      if (pend === 'fighting') return sparVoid(r);                       // 重新整理在打（§7.3-9）：這場作廢，不能靠重整重打到贏
      if (pend === 'loot') return sparLootNight(r);                      // 打贏還沒收：重開戰利品列
      var back = UI.encBack && UI.encBack.key === key ? UI.encBack : null; UI.encBack = null;
      if (back && S && S.state === 'lost' && S.pos === r.pos) return sparLeaveLine(r, S.who, sparEndLine(S.who, false));   // 他贏了那句（安慰）
      // 說那句說到一半重畫（關抽屜、收完唱片）：照剩下的時間講完再走；他正在走回停留點：主線客人照樣等他走到（審查修正 p2b：原本回 null＝主線客人馬上推門、在走道對穿）
      if (UI.enc && UI.enc.key === key && UI.enc.phase === 'leave') { sparLeaveShow(r, key); return true; }
      if (UI.enc && UI.enc.key === key && UI.enc.phase === 'gone') { sparAwait(r, key); return true; }
      if (pend === 'offer') {
        if (sparOk(r)) return sparTable(r, S.who, false);
        sparChoose({ type: 'encDecline' }); return null;                 // 活店關了（?crowd=0 重載、自動遊玩）：邀請收尾（不收的話說情重打同一位又會出來）
      }
      if (!sparOk(r) || UI.atTable === tableKey(r)) return null;          // 主線客人已經走到對戰台了：這一位不開
      if (S && S.pos === r.pos) return null;                             // 這一位開過了（改天、沒理他、打完、作廢）
      var SCr = SC(r);
      if (!E.encOffer(r, SCr)) return null;
      var res = E.choose(r, SCr, { type: 'encOpen' });
      if (!res || !res.ok || !r.spar) return null;
      regsOf().enc.offered++;
      persist();                                                         // 開邀請當下就存（§8）
      return sparTable(r, r.spar.who, true);
    } catch (e) { console.error(e); sparFail(r); return null; }
  }
  // 他在對戰台等（邀請中）：第一次＝從停留點走過去（不在店裡＝推門、響鈴）；重畫＝照樣站著；重新整理回來＝直接站在對戰台、再嗆一次
  function sparTable(r, who, fresh) {
    var R = C.regulars[who]; if (!R) return null;
    var key = sparKey(r), look = R.look, seen = UI.atTable === key, at = stg('pos', 'f');
    if (!UI.enc || UI.enc.key !== key) UI.enc = { key: key, who: who, pos: r.pos, phase: 'walk', waited: 0, dare: '', talk: 0 };
    UI.atTable = key;
    var here = at && !at.hidden && !at.outside && stg('has', 'f');
    if (seen && here) {
      crowdCall('encMark', who);
      if (UI.enc.phase === 'walk') return true;                          // 還在走過去（重畫）：那一趟照走，到了照說
      settle('f', 'duelE', look); stg('sil', 'f', false); stg('door', 'close');
      sparAtTable(r, key, false);
      return true;
    }
    if (!fresh) {                                                        // 重新整理、換畫面回來：直接站在對戰台等
      crowdCall('encMark', who);
      place('f', 'duelE', look); stg('door', 'close');
      UI.enc.phase = 'table'; UI.enc.talk = Date.now() + 200 / speed() + 1000;   // 馬上要再嗆一次：「正在播放」字卡先等（npHold）
      later(function () { sparAtTable(r, key, true); }, 200);
      return true;
    }
    UI.enc.phase = 'walk'; UI.enc.talk = Date.now() + 8000 / speed();   // 走過去、到了嗆一句：「正在播放」字卡先等（npHold；走不到最多等這麼久）
    var h = crowdCall('handOff', who), legs = h && h.legs;
    if (legs) {                                                          // 他正在店裡：從停留點走過去（右排走上面，不從中島下面）
      stg('sprite', 'f', look); stg('sil', 'f', false);
      crowdCall('clearRoute', stg('route', 'f', legs), { who: 'f' });
    } else {                                                             // 不在店裡：推門、響鈴（這是一件事）
      legs = guestRoute('in');
      stg('door', 'swing'); place('f', 'door', look); stg('sil', 'f', false);
      crowdCall('clearRoute', stg('route', 'door', legs), { who: 'f', door: true });
    }
    stgP('walk', 'f', legs, TABLE_WALK).then(function () { sparArrive(key); });
    return true;
  }
  function sparArrive(key) {
    var r = save.run;
    if (UI.screen !== 'night' || !r || UI.atTable !== key || !UI.enc || UI.enc.key !== key || UI.enc.phase !== 'walk' || UI.going) return;
    var f = stg('pos', 'f'), sp = stg('spot', 'duelE');                 // 半路被別的走路接手也會 resolve：真的站到了才算
    if (!f || !sp || Math.abs(f.x - sp[0]) > 1 || Math.abs(f.y - sp[1]) > 1) return;
    UI.enc.phase = 'table';
    stg('door', 'close');
    sparAtTable(r, key, true);
  }
  // 到站（§7.3-3）：面向你、頭上「！」1.2 秒、聊天泡泡說嗆那句；頭上一個熱點（點他＝開邀請面板）；開始數「30 秒沒理他」
  function sparAtTable(r, key, say) {
    if (UI.screen !== 'night' || !UI.enc || UI.enc.key !== key || save.run !== r) return;
    var who = UI.enc.who, R = C.regulars[who] || {};
    stg('faceTo', 'f', 'duelP');
    stg('addHot', { id: 'cw-enc', follow: 'f', rel: [-12, -46, 24, 28], action: 'talk:enc', label: R.name || '', pri: 3, minY: 150 });   // 有名牌、會閃（審查修正 p2b：原本 noLabel／noSparkle，新玩家找不到）
    sparWait(r, key);
    if (!say) return;
    stg('emote', 'f', 'excl', 1200);
    if (!UI.enc.dare) UI.enc.dare = sparPick(who, 'encDare');
    var tries = 0;
    UI.enc.talk = Date.now() + 1200 / speed() + 1000;                    // 1.2 秒後嗆：「正在播放」字卡先等（npHold；第 I 波第三輪審查 F4）
    var go2 = function () {
      if (UI.screen !== 'night' || !UI.enc || UI.enc.key !== key || UI.enc.phase !== 'table' || UI.going || qs('.lb-sheet.float.enc', app())) return;
      if (sayTill() > Date.now() && tries++ < 12) { UI.enc.talk = Date.now() + 500 + 1000; later(go2, 500 * speed()); return; }   // 老闆或店裡有人正在講：等他講完（最多 6 秒）
      UI.enc.talk = Date.now() + 1000;                                   // 聊天泡泡出來之前那一下（之後 npChat 接手）
      if (!crowdCall('encSay', who, UI.enc.dare)) { stageSay('f', UI.enc.dare, null, Math.max(2600, sayMs(UI.enc.dare))); UI.enc.talk = Date.now() + Math.max(2600, sayMs(UI.enc.dare)) / speed(); }
      sparHint(r, key, who);
    };
    later(go2, 1200);
  }
  // 第一次有熟客來嗆（一輩子一次，save.seen.encHint）：他那句講完，老闆說一句「點他決定打不打，直接叫下一位就是改天」（審查修正 p2b：邀請要點他才看得到、大鈕按下去就等於改天）
  function sparHint(r, key, who) {
    var tx = SPU('encHint', { name: (C.regulars[who] || {}).name || '' });
    if (!tx || save.seen.encHint || UI.auto) return;
    var hold = function (ms) { if (UI.enc && UI.enc.key === key) UI.enc.talk = Math.max(UI.enc.talk || 0, Date.now() + ms); };   // 老闆這句講完之前「正在播放」字卡先等（npHold；第 I 波第三輪審查 F5：字卡剛擺好、老闆那句半拍後疊上來）
    hold(800 / speed() + 1000);
    var tries = 0, go3 = function () {
      if (UI.screen !== 'night' || !UI.enc || UI.enc.key !== key || UI.enc.phase !== 'table' || UI.going || save.seen.encHint) return;
      if ((sayTill() > Date.now() || qs('.lb-sheet.float', app())) && tries++ < 40) { hold(500 + 1000); later(go3, 500 * speed()); return; }   // 他還在講、面板開著：等
      save.seen.encHint = true; persist();
      stg('emote', 'o', 'excl', 1200);
      stageSay('o', tx, 'owner', sparHoldMs(tx) * speed());   // 停多久照聊天最後一句（§5.3；stageSay 會 ÷speed，sparHoldMs 已是真實毫秒）
      hold(sparHoldMs(tx) + 300);
    };
    later(go3, 800);
  }
  // 30 秒沒理他（§7.3-5）：只數他站在對戰台等、而且什麼都沒開的時間（抽屜、面板（含邀請面板）、頁面、唱片資訊、教學泡泡、你正在走去開打都不算；分頁藏到背景不算）
  function sparWait(r, key) {
    var lapse = (E.sparCfg ? E.sparCfg(SC(r)) : {}).lapse || 30000, last = Date.now();
    var iv = setInterval(function () {
      var t = Date.now(), dt = Math.min(1000, t - last) * speed(); last = t;
      if (UI.screen !== 'night' || save.run !== r || !UI.enc || UI.enc.key !== key || UI.enc.phase !== 'table' || E.encPending(r) !== 'offer') { clearInterval(iv); return; }
      if (crowdPaused() || qs('.lb-sheet.float', app())) return;
      UI.enc.waited += dt;
      if (UI.enc.waited >= lapse) { clearInterval(iv); sparDecline(true); }
    }, 250);
    UI.offs.push(function () { clearInterval(iv); });
  }
  // 點他（talk:enc）或點對戰台：開邀請面板（§7.3-4）；回 true＝這一下是切磋的
  function sparTap() {
    var r = save.run;
    if (UI.screen !== 'night' || !r || !UI.enc || UI.enc.key !== sparKey(r)) return false;
    if (UI.enc.phase !== 'table' || E.encPending(r) !== 'offer') return UI.enc.phase === 'walk';   // 還在走過去：這一下先不理（到了再點）
    sfx('tick'); crowdCall('chatClose');
    sparSheet(r);
    return true;
  }
  // 邀請面板：頭像＋「{name}想跟你切磋一盤」、風險一行、獎勵一行（唱片櫃／包包）、「來一盤」「改天」；✕＝先關面板（他繼續等）
  function sparSheet(r) {
    var who = r.spar.who, R = C.regulars[who] || {}, mode = E.sparMode ? E.sparMode(SC(r)) : 'shelf';
    // 獎勵那行：他的唱片你還沒收的夠三張＝「挑一張{name}的唱片」；不夠（戰利品列會用卡池補）＝不說是他的（審查修正 p2b）
    var his = sparHisLeft(r, who, mode) >= (((E.wcCfg ? E.wcCfg(C) : {}).loot || {}).n || 3), rk = (mode === 'bag' ? 'encRewardBag' : 'encRewardShelf') + (his ? '' : 'Any');
    var html = '<div class="hd"><h3>' + esc(SPU('encTitle', { name: R.name })) + '</h3><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
      '<div class="pv-who en-who"><div class="av">' + headHTML(R.look, 30) + '</div><div class="en-tx"><p class="en-risk">' + esc(SPU('encRisk')) + '</p>' +
      '<p class="en-short">' + esc(SPU('encShort')) + '</p>' +   // 短局（審查修正 p2b：一開打聲望變三分之二，新玩家以為被扣了）
      '<p class="en-rew">' + esc(SPU(rk, { name: R.name, cash: sparCash() })) + '</p></div></div>' +
      '<div class="two"><button type="button" class="lb-btn pri big key" data-a="encYes">' + esc(SPU('encBtnYes')) + '</button>' +
      '<button type="button" class="lb-btn big key" data-a="encNo">' + esc(SPU('encBtnNo')) + '</button></div>';
    var s = floatSheet(html, 'enc');
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a=encYes],[data-a=encNo]'); if (!b || UI.going) return;
      s.remove(); syncFloat();
      if (b.getAttribute('data-a') === 'encYes') sparAccept(); else sparDecline(false);
    });
    return s;
  }
  // 來一盤（§7.3-7）：encAccept → 先存檔 → 清對戰區 → encStart → 你走到 duelP → go('duel', {enc, view})
  function sparAccept() {
    var r = save.run; if (!r || UI.going || !UI.enc || E.encPending(r) !== 'offer') return;
    var res = sparChoose({ type: 'encAccept' });                         // sparChoose 存檔：重新整理在打＝作廢（§7.3-9）
    if (!res.ok) return sparFail(r);
    regsOf().enc.fought++; persist();
    UI.going = true; UI.sellNudge = null;
    sfx('select');
    qsa('.lb-sheet.float', app()).forEach(function (s) { s.remove(); }); syncFloat();
    var T = TUT(); if (T && T.dismissSoft) try { T.dismissSoft(); } catch (_) {}
    stg('removeHot', 'cw-enc'); crowdCall('chatClose');
    UI.enc.phase = 'fight';
    var s = null; try { s = E.encStart(r, SC(r), { apex: !!UI.apex }); } catch (e) { console.error(e); }
    if (!s || !s.duel) { E.encVoid(r); persist(); UI.going = false; return sparFail(r); }
    UI.enc.duel = s.duel;
    preloadDuel(s.duel);
    crowdCall('clearDuel');
    var start = function () {
      if (UI.screen !== 'night' || save.run !== r) return;
      ghostPanel({});
      go('duel', { res: s, enemyId: s.enemyId, enc: true, view: s.view, enter: true });
    };
    var p = stg('pos', 'p'), sp = stg('spot', 'duelP');
    if (!p || p.hidden || p.outside || !sp || (Math.round(p.x) === sp[0] && Math.round(p.y) === sp[1])) { later(start, 200); return; }
    stg('pose', 'p', null);
    stgP('walk', 'p', ['duelP'], 110).then(start);
  }
  // 改天（lapse＝30 秒沒理他）：encDecline → 他說「改天」或「沒理他」那句 → 說完去左排翻一下再走 → 主線客人推門
  function sparDecline(lapse) {
    var r = save.run; if (!r || !UI.enc || UI.enc.phase !== 'table' || E.encPending(r) !== 'offer') return;
    qsa('.lb-sheet.float.enc', app()).forEach(function (s) { s.remove(); }); syncFloat();
    var who = r.spar.who, res = sparChoose(lapse ? { type: 'encDecline', lapse: true } : { type: 'encDecline' });
    if (!res.ok) return sparFail(r);
    var l = sparPickL(who, lapse ? 'encLapse' : 'encNo');
    sparLeaveLine(r, who, sparText(l), !!(l && l.out));
  }
  // 說一句就走（改天、沒理他、他贏了、作廢）：在對戰台把那句講完（SPEC-H §5.3 最後一句的時間：6–12 秒，sparHoldMs）再交回走動槽 → 他走到停留點 → 主線客人推門。
  //   out＝那句講的是要走了（「老人家先告退」那種，C.chat out:true）：說完直接出門，不去翻箱（審查修正 p2b）。text 空＝不說、馬上走（收完唱片）
  function sparLeaveLine(r, who, text, out) {
    var R = C.regulars[who]; if (!R) return null;
    var key = sparKey(r);
    if (!UI.enc || UI.enc.key !== key) UI.enc = { key: key, who: who, pos: r.pos, phase: 'leave', waited: 0, dare: '' };
    UI.enc.phase = 'leave';
    UI.enc.leaveText = text || '';
    UI.enc.leaveEnd = Date.now() + (text ? sparHoldMs(text) : 0);
    UI.enc.leaveOut = !!out;
    sparLeaveShow(r, key);
    return true;
  }
  // 他站在對戰台講那句（重畫時再叫一次：照剩下的時間再講，到時間才走）
  function sparLeaveShow(r, key) {
    var E0 = UI.enc, who = E0.who, R = C.regulars[who] || {};
    UI.atTable = key;
    stg('removeHot', 'cw-enc');
    crowdCall('encMark', who);
    var at = stg('pos', 'f');
    if (!at || at.hidden || at.outside || !stg('has', 'f')) place('f', 'duelE', R.look);
    else { stg('sprite', 'f', R.look); stg('sil', 'f', false); }
    stg('door', 'close');
    stg('faceTo', 'f', 'duelP');
    var left = Math.max(0, (E0.leaveEnd || 0) - Date.now()), text = E0.leaveText;
    // 下一拍才講：從 SCREENS.night 叫進來時，go() 跑完畫面會先收掉所有聊天泡泡（crowdSync）。剩不到 0.4 秒就不再冒一次
    if (text && left > 400) later(function () {
      if (UI.screen === 'night' && UI.enc === E0 && E0.phase === 'leave' && !crowdCall('encSay', who, text, { ms: left * (FAST ? 4 : 1) })) stageSay('f', text, null, left * speed());
    }, 0);
    later(function () { if (UI.enc === E0) sparGo(r, key); }, (left + 60) * speed());   // later() 會 ÷speed：換回真實毫秒
  }
  // 他離開對戰台（改天、說完那句、收完獎勵）：走動槽在 f 的位置接手、f 藏 → 他走到停留點（或走出門）→ 主線客人照常推門
  function sparGo(r, key) {
    if (UI.screen !== 'night' || save.run !== r || !UI.enc || UI.enc.key !== key) return;
    if (UI.enc.phase === 'gone') return sparAwait(r, key);
    UI.enc.phase = 'gone';
    stg('removeHot', 'cw-enc');
    var id = crowdCall('takeBack', null, UI.enc.who, UI.enc.leaveOut ? { out: true } : undefined);
    if (!id) { hideActor('f'); crowdCall('encClear'); }
    UI.atTable = null;
    UI.enc.slot = id || null; UI.enc.goneAt = Date.now();
    sparAwait(r, key);
  }
  //   他走到停留點（或走出門）之前主線客人先不推門：左排上面兩格、走出門都要經過主線客人進來的那條走道，同時走＝在一人寬的走道對穿（最多等 6 秒）。
  //   重畫來客畫面（關抽屜）會清掉計時：sparNight 看到 phase gone 再叫一次接著等
  function sparAwait(r, key) {
    var E0 = UI.enc, id = E0.slot;
    var go2 = function () { if (UI.screen !== 'night' || save.run !== r || UI.going || UI.atTable) return; if (UI.enc === E0) UI.enc = null; sparQueue(r, true); guestToTable(r); };
    var done = function () {
      if (!id || Date.now() - (E0.goneAt || 0) > 6000 / speed()) return true;
      var S0 = crowdCall('state'), sl = S0 && (S0.slots || []).filter(function (x) { return x.slot === id; })[0];
      return !sl || !sl.on || !sl.walking;
    };
    if (done()) { later(go2, 0); return; }                               // 下一拍：從 SCREENS.night 叫進來時，門外排隊的剪影等它畫完再換
    var iv = setInterval(function () { if (UI.enc !== E0 || done()) { clearInterval(iv); if (UI.enc === E0) go2(); } }, 100);
    UI.offs.push(function () { clearInterval(iv); });
  }
  // 門外排隊的剪影：熟客佔著對戰台＝這一位主線客人＋下一位；他走了＝下一位＋再下一位
  function sparQueue(r, gone) {
    var q = gone ? [r.order[r.idx + 1], r.order[r.idx + 2]] : [r.order[r.idx], r.order[r.idx + 1]];
    if (q[0]) { place('q1', 'q1', enemySpr(C.enemies[q[0]])); stg('sil', 'q1', true); } else hideActor('q1');
    if (q[1]) { place('q2', 'q2', enemySpr(C.enemies[q[1]])); stg('sil', 'q2', true); } else hideActor('q2');
  }
  // 邀請中（或說完那句還沒走）直接按「下一位」、點客人頭像開打（§7.3-6；順序寫死）：同步記帳（encDecline）、他說一句改天（不等點）、走動槽接手、f 藏、他往 frontleft 走；
  //   回 Promise：他離開對戰台 ≥38 格才 resolve（nextGuest 這時才把主線客人 place 到對戰台：f 是藏著的，不會在他身上原地換臉；LC12）
  function sparInterrupt(r) {
    if (UI.enc && UI.enc.key === sparKey(r) && UI.enc.phase === 'gone') return sparClearP(UI.enc);   // 他正走回停留點：離開對戰台 ≥38 格才讓主線客人站上去
    if (!UI.enc || UI.enc.key !== sparKey(r) || !/^(walk|table|leave)$/.test(UI.enc.phase)) return null;
    var who = UI.enc.who, text = '', out = !!UI.enc.leaveOut;
    qsa('.lb-sheet.float.enc', app()).forEach(function (s) { s.remove(); }); syncFloat();
    if (E.encPending(r) === 'offer') { var res = sparChoose({ type: 'encDecline' }); if (res.ok) { var l = sparPickL(who, 'encNo'); text = sparText(l); out = !!(l && l.out); } }
    UI.enc.phase = 'gone';
    stg('removeHot', 'cw-enc');
    // 他邊走邊說那句：聊天泡泡（換畫面就收，不帶進對決畫面——審查修正 p2b）
    var p = crowdCall('encActive') ? crowdCall('encDecline', 'next', { text: text, ms: text ? sparHoldMs(text) * (FAST ? 4 : 1) : 0, out: out }) : null;
    if (!p || typeof p.then !== 'function') { hideActor('f'); crowdCall('encClear'); p = Promise.resolve(); }
    UI.atTable = null;
    UI.enc = null;
    return p;
  }
  // 他（走動槽）離開對戰台 ≥38 格、或不在了、或 2 秒（÷speed）→ resolve
  function sparClearP(E0) {
    var id = E0.slot, sp = stg('spot', 'duelE'), t0 = Date.now();
    UI.enc = null;
    if (!id || !sp) return Promise.resolve();
    return new Promise(function (res) {
      var iv = setInterval(function () {
        var q = stg('pos', id);
        if (!q || q.hidden || Math.hypot(q.x - sp[0], q.y - sp[1]) >= 38 || Date.now() - t0 > 2000 / speed()) { clearInterval(iv); res(); }
      }, 30);
    });
  }
  // 重新整理在打（§7.3-9）：這場作廢（encVoid → 存檔），他在對戰台說作廢那句再走；活店關著＝只出一顆吐司
  function sparVoid(r) {
    var who = r.spar.who;
    E.encVoid(r); persist();
    if (!crowdChatOn() || !C.regulars[who]) { toastAfter(SPU('encVoidNote')); return null; }
    var l = sparPickL(who, 'encVoid');
    return sparLeaveLine(r, who, sparText(l), !!(l && l.out));
  }
  // 打贏還沒收（來客畫面、導演 still）：你留在 duelP、他在對戰台說「他輸了」那句（唱片你挑）→ 戰利品列（loot.js enc；鏡頭照領獎 fitRewardSheet）。重畫／重新整理＝重開
  function sparLootNight(r) {
    var S = r.spar, who = S.who, R = C.regulars[who]; if (!R) return null;
    var key = sparKey(r), back = UI.encBack && UI.encBack.key === key ? UI.encBack : null; UI.encBack = null;
    if (!UI.enc || UI.enc.key !== key) UI.enc = { key: key, who: who, pos: r.pos, phase: 'loot', waited: 0, dare: '' };
    UI.enc.phase = 'loot';
    UI.atTable = key;
    crowdCall('encMark', who);
    var at = stg('pos', 'f');
    if (!at || at.hidden || at.outside || !stg('has', 'f')) place('f', 'duelE', R.look); else { stg('sprite', 'f', R.look); stg('sil', 'f', false); }
    stg('faceTo', 'f', 'duelP');
    var line0 = UI.enc.loseSaid ? '' : sparEndLine(who, true, (S.loot && S.loot.src || []).indexOf('fill') >= 0);
    UI.enc.loseSaid = true;
    // 泡泡放他頭頂，不放身體旁（sideIfCover 9＝頭頂蓋到箱子也不移；審查修正 p2b：放旁邊會整個蓋住站在 duelP 的你，挑唱片那 6–12 秒你只剩腳）
    if (line0) later(function () { if (UI.screen === 'night' && UI.enc && UI.enc.key === key && !crowdCall('encSay', who, line0, { sideIfCover: 9 })) stageSay('f', line0, null, Math.max(2600, sayMs(line0))); }, back ? 300 : 500);
    later(function () { sparLootOpen(r, key, !!back); }, 300);
    return true;
  }
  function sparLootOpen(r, key, fresh) {
    if (UI.screen !== 'night' || save.run !== r || !UI.enc || UI.enc.key !== key || !encLootPending(r)) return;
    var S = r.spar, R = C.regulars[S.who] || {}, mode = S.mode === 'bag' ? 'bag' : 'shelf', LT = W.DipLabLoot && UI.lootOk ? W.DipLabLoot : null;
    var p = { cards: (S.loot.cards || []).filter(function (id) { return !!card(id); }), src: [], skipCash: ((E.wcCfg ? E.wcCfg(C) : {}).loot || {}).skipCash | 0, enc: true };
    p.src = p.cards.map(function (id) { return S.loot.src[S.loot.cards.indexOf(id)] || 'fill'; });
    if (!LT || !p.cards.length) { console.error('spar loot: no loot.js'); sparLootDone(sparChoose({ type: 'encSkip' })); return; }
    // 盤面上他的牌補過星（第 15 位起補到下限）：戰利品列下面寫一行「收下的是原本的星數」（審查修正 p2b：收進來看起來比剛剛打你的那張弱很多）
    var dk = null; try { dk = E.encDef(r, SC(r), S.who).deck; } catch (e) { console.error(e); }
    var boosted = !!dk && p.cards.some(function (id) { var c = card(id), d = dk.filter(function (x) { return x.id === id; })[0]; return !!c && !!d && (d.c !== c.c || d.o !== c.o || d.h !== c.h); });
    try {
      LT.lootFlow({ p: p, out: fresh ? { earn: 0, packetCash: 0, money: r.money | 0, xp: null } : null, finish: sparLootDone,
        enc: { mode: mode, title: SPU((mode === 'bag' ? 'encLootBag' : 'encLootShelf') + (p.src.indexOf('fill') >= 0 ? 'Any' : ''), { name: R.name }), skip: SPU('encSkip', { cash: sparCash() }),   // 有不是他的唱片（卡池補的）＝標題不說「他的唱片」
          note: boosted ? SPU('encLootNote', { name: R.name }) : '',
          take: function (id) { return Promise.resolve(sparTake(id)); }, skipFn: function () { return sparChoose({ type: 'encSkip' }); }, owned: function (id) { return isOwned(id); } } });
    } catch (e) { console.error(e); sparLootDone(sparChoose({ type: 'encSkip' })); }
  }
  // 收這張：唱片櫃模式＝引擎只記 run.spar.taken，這裡 shelfOwn(id,'enc')（已擁有＝只認識）＋吐司；包包模式＝引擎走主線拿牌記帳（sparChoose 補唱片櫃認識、這一趟收了）
  function sparTake(id) {
    var r = save.run, mode = r && r.spar && r.spar.mode;
    var res = sparChoose({ type: 'encTake', id: id });
    if (!res.ok) return null;
    if (mode !== 'bag') { shelfOwn(id, 'enc'); persist(); toast(SPU('encShelfToast'), 'keep'); }
    return res;
  }
  // 收完／拿錢：他去左排翻一下再走、主線客人推門（重畫來客畫面：sparNight 看到 phase leave＝馬上走）
  function sparLootDone(res) {
    var r = save.run; if (!r) return;
    if (res && res.effects) { var tx = effectsText(res.effects); if (tx) toast(tx, 'keep'); }
    if (encLootPending(r)) { if (UI.screen === 'night' && W.DipLabLoot) W.DipLabLoot.redraw(); return; }   // 沒收成（不該發生）：同一列放回來
    if (UI.enc && UI.enc.key === sparKey(r)) { UI.enc.phase = 'leave'; UI.enc.leaveText = ''; UI.enc.leaveEnd = 0; UI.enc.leaveOut = false; }   // 重畫來客畫面：sparNight 看到 leave＝他走、主線客人等他走到停留點才推門
    later(function () { go('night'); }, 300);
  }
  // 打完（onDuelEnd 第一行分流）：encFinish（只寫 run.spar）→ 存檔 → 回來客畫面。不叫 finishFight；頂欄、endStamp、loseOutcome、r.lastFight 都不碰
  function encEnd(result) {
    var r = save.run, duel = result && result.duel;
    if (!r || !duel || !duel.over || UI.ending === duel) return;
    UI.ending = duel;
    var fin = null; try { fin = E.encFinish(r, SC(r), duel); } catch (e) { console.error(e); }
    if (!fin || fin.error) { console.error('encFinish', fin && fin.error); if (E.encPending(r) === 'fighting') E.encVoid(r); persist(); UI.enc = null; return go('night'); }
    var reg = regsOf(); if (fin.win) reg.enc.won++; else reg.enc.lost++;
    persist();
    stg('untag');
    UI.encBack = { key: sparKey(r), win: !!fin.win };
    if (UI.enc) UI.enc.phase = fin.win ? 'loot' : 'back';
    go('night');
  }
  // 出錯保底（§7.3-10）：f 藏、他直接藏（走動槽不接手）、UI.atTable 清掉、主線客人站到對戰台；run 的主線欄位本來就沒被動過
  function sparFail(r) {
    try { stg('removeHot', 'cw-enc'); qsa('.lb-sheet.float.enc', app()).forEach(function (s) { s.remove(); }); syncFloat(); } catch (_) {}
    try { if (r && E.encPending(r) === 'offer') sparChoose({ type: 'encDecline' }); } catch (e) { console.error(e); }   // 邀請收尾（不收的話主線開打後說情重打同一位，他又會站出來；審查修正 p2b）
    hideActor('f'); crowdCall('encClear');
    UI.atTable = null; UI.enc = null;
    if (!r || UI.screen !== 'night' || E.nextStep(r) !== 'fight' || !guestWaits(r)) return;
    var en = C.enemies[r.order[r.idx]] || {};
    UI.atTable = tableKey(r); settle('f', 'duelE', enemySpr(en)); stg('sil', 'f', false);
    sparQueue(r, true);
  }
  // 來客條頭像角落的小記號（第 C 波）：算命看過的這一輪藏家（run.fortune）、接了踢館帖的那一輪（run.dare）
  function stallMarks(g) {
    var I = W.DipLabStalls && W.DipLabStalls._icons; if (!I || g.done) return '';
    return (g.fortune ? '<span class="st-mk ft">' + pix(I.fortune, 12) + '</span>' : '') + (g.dare ? '<span class="st-mk dr">' + pix(I.dare, 12) + '</span>' : '');
  }
  // 錢、包包、配件那一條（來客畫面、今天的攤位共用）
  function bagLineInner(r) {
    return '<button type="button" class="me" data-a="me" data-tut="hp">' + hpChipHTML(r) + '</button>' +
      '<span class="money" data-tut="money">' + moneyHTML(r.money) + '</span><button type="button" class="bag" data-a="bag">' + bagBtnHTML(r.bag.length) + '</button>' +
      // 發燒配件：有配件只放圖示（一件才加名字，放不下就省略號）；沒有才寫「發燒配件（還沒有）」（審查 #10：聲望那顆加進來以後，窄螢幕放不下）
      '<button type="button" class="rl" data-a="relics" aria-label="發燒配件">' + (r.relics.length ? r.relics.map(function (id) { return '<span class="ri">' + relicIcon(id, 16) + '</span>'; }).join('') + (r.relics.length === 1 ? '<span class="rn">' + esc(relicOf(r.relics[0]).name) + '</span>' : '') : '<span class="k">發燒配件</span><span class="rn">（還沒有）</span>') + '</button>';
  }
  function bagLineHTML(r) { return '<div class="lb-bagline">' + bagLineInner(r) + '</div>'; }
  // ---- 今天的攤位（第 C 波 SPEC-C §4.3；pending stall）：來客畫面照畫（頂欄、舞台、錢與包包那條），「第 n 輪」底下那塊換成攤位面板（stalls.js；「下一位」不畫）。
  //   這一輪的客人還在門外排隊（第 1 位等攤位逛完才推門走到對戰台）；f 給站主用（同業老闆、算命阿姨、遞帖的）
  function stallNight(r) {
    setTop(posLabel(r), { help: true, pause: true });
    var panel = UI.panel; panel.classList.add('night', 'stall');
    stg('interact', 'map');
    resetPoses(); stg('sil', 'p', false);
    settle('o', 'counter', 'owner');
    if (UI.keepP && stg('has', 'p')) UI.keepP = false; else { UI.keepP = false; settle('p', UI.lastSpot || 'browse', 'player'); }   // 續玩（標題「繼續」）：你在門外 → 站回店裡；有 cur 的話 stalls.js 直接放到那一站
    hideActor('f'); stg('door', 'close'); UI.atTable = null;   // f 這時給站主用：之前排的客人開場白不要說到站主頭上
    var q = [r.order[r.idx], r.order[r.idx + 1]];
    if (q[0]) { place('q1', 'q1', enemySpr(C.enemies[q[0]])); stg('sil', 'q1', true); } else hideActor('q1');
    if (q[1]) { place('q2', 'q2', enemySpr(C.enemies[q[1]])); stg('sil', 'q2', true); } else hideActor('q2');
    var toCp = E.toCheckpoint(r, C), live = careerLiveOf(r);
    var h = '<div class="lb-night st-night" data-tut="night-box"><div class="nh"><b>' + esc(TU('round', { r: r.round })) + '</b><span class="sub">' +
        esc([toCp != null ? TU('toCheckpoint', { n: toCp }) : '', pleaText(r)].filter(Boolean).join('・')) + '</span></div>' + (live ? live.html : '') +
      '<div class="st-slot"></div></div>' + bagLineHTML(r);
    var box = el('div', 'lb-screen', h); panel.appendChild(box);
    guardClicks(box);
    if (live) careerLiveBind(qs('.cx-live', box), live);
    box.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.lb-bagline [data-a]'); if (!b || UI.going) return;
      var a = b.getAttribute('data-a');
      if (a === 'me') meSheet(save.run); else if (a === 'bag') bagSheet(save.run); else if (a === 'relics') relicSheet(save.run);
    });
    try { W.DipLabStalls.night({ r: r, slot: qs('.st-slot', box), box: box }); } catch (e) { console.error(e); stallBridge(r); }
  }
  // ======================================================================= 第 I 波 I-2：上場＋耐聽（scratchpad v5/wave-i SPEC-I §3、§5、§10；引擎契約 build2/CONTRACT.md）
  //   開關＝C.lineup.on／C.wear.on（兩個一起；出貨 false）；施工期間 ?lineup=1 開機設 true（lineupBoot）。之後一切跟著 run 走（E.lineupOn(run)／E.wearOn(run)）：
  //   沒開的 run 這一段的函式不是沒被叫，就是回空字串／false（畫面一字不變）。
  //   上場面板（luPanel）＝sheet()（蓋住來客那塊、包包格自己捲）：mode 'stall'＝攤位收尾那一步（pending stall 多 lineup 鍵）、'due'＝run.lineupDue（沒攤位的換輪、
  //     中繼點選秀完、上場那張賣掉後補空格＝keep）。前期省一下（quiet）＝不出面板、直接送「幫我挑」、吐司一句。
  //   來客畫面上場列（luRowHTML）：來客條與開打鈕之間一列（上場 5 張＋替補格；點了開包包）。換上場（lineupSwap）：包包面板新的那張、戰利品列的小鈕 → luSwapSheet。
  //   耐聽點（earDotsHTML，style.css .lb-ear）：包包、上場面板、戰利品列、櫃檯賣給老闆；手牌只畫兩種記號（duel.js）。領獎小字（wornHd）、第一次聽膩老闆那句（save.seen.wear）
  function LU(k, o) { var U = (C && C.lineup && C.lineup.ui) || {}; return fill(U[k] || '', o); }
  function WR(k, o) { var U = (C && C.wear && C.wear.ui) || {}; return fill(U[k] || '', o); }
  function lineupBoot() { if (QS.lineup === '1' && C.lineup && C.wear) { C.lineup.on = true; C.wear.on = true; } }   // 施工期間試玩：跟 sim --lineup on 一樣只改 content 的開關
  function luOn(r) { return !!(r && E && typeof E.lineupOn === 'function' && E.lineupOn(r)); }
  function wrOn(r) { return !!(r && E && typeof E.wearOn === 'function' && E.wearOn(r)); }
  function luLive(r) { return luOn(r) && typeof E.luRound === 'function' && E.luRound(r); }          // 這一輪是上場制（第 lineupFrom 位那一輪起）
  function luN() { return Math.max(1, ((E.luCfg ? E.luCfg(C) : C.lineup) || {}).n | 0 || 5); }
  function luMode() { return ((E.luCfg ? E.luCfg(C) : C.lineup) || {}).benchMode || 'worn'; }
  // 讀檔整理（SPEC-I §10 fixRun；validRun 之前）：上場鍵型別錯的修、不在包包的拿掉；開關關著＝這些鍵整組拿掉（退回現況）
  function fixRun(r) { if (r && typeof r === 'object' && !Array.isArray(r) && Array.isArray(r.bag) && E.fixLineup) { try { E.fixLineup(r, C); } catch (e) { console.error(e); } } }
  // 一張唱片的耐聽：left＝還剩幾格、n＝聽膩幾層
  function wearOf(r, id) {
    var W0 = (E.wearCfg ? E.wearCfg(C) : C.wear) || {}, G = Math.max(1, W0.grooves | 0), mx = Math.max(0, W0.maxLayers | 0);
    var w = r && r.wear && r.wear[id], n = w ? Math.max(0, Math.min(mx, w.n | 0)) : 0, g = w ? Math.max(0, Math.min(G, w.g | 0)) : 0;
    return { left: G - g, n: n, G: G, max: mx, used: !!w && (g > 0 || n > 0) };
  }
  // 耐聽 7 顆小點（亮＝還剩的格）＋聽膩幾層（紅字 −n）；耐聽關＝空字串
  function earDotsHTML(r, id) {
    if (!wrOn(r) || !card(id)) return '';
    var w = wearOf(r, id), d = '';
    for (var i = 0; i < w.G; i++) d += '<i' + (i < w.left ? ' class="on"' : '') + '></i>';
    return '<span class="lb-ear' + (w.n ? ' worn' : '') + '" role="img" aria-label="' + esc(WR('ear', { n: w.left, max: w.G }) + (w.n ? '・' + WR('worn', { n: w.n }) : '')) + '">' + d + (w.n ? '<b>' + esc('−' + w.n) + '</b>' : '') + '</span>';
  }
  // 小封面（上場列、面板的格子）：聽膩＝紅字 −n＋淡灰斜紋；再一次就膩＝一顆黃點
  function luMini(r, id, o) {
    o = o || {};
    var c = card(id); if (!c) return '<span class="lu-mini empty">' + esc(o.empty || '') + '</span>';
    var w = wrOn(r) ? wearOf(r, id) : null, mk = '';
    if (w && w.n > 0) mk = '<b class="lu-wn">' + esc('−' + w.n) + '</b>';
    else if (w && w.left === 1 && w.n < w.max) mk = '<i class="lu-al" aria-hidden="true"></i>';
    return '<span class="lu-mini' + (w && w.n ? ' worn' : '') + '">' + coverHTML(c, { info: false, badge: false }) + mk + '</span>';
  }
  // 攤位收尾的上場那一步：pending stall 有 lineup 鍵、選過組、q 走完、沒有站在開（engine 停在這一步，nextStep 還是 'stall'）
  function luStallStep(r) {
    var p = r && r.pending;
    return !!(p && p.type === 'stall' && p.lineup && typeof p.lineup === 'object' && p.pick != null && Array.isArray(p.q) && p.k >= p.q.length && !p.cur && luOn(r));
  }
  // 沒有攤位時（換輪、中繼點選秀完、上場那張賣掉）：來客畫面一進來就開面板
  function luDueNow(r) { return luOn(r) && r.lineupDue === true && luLive(r) && !r.pending && !r.duel && !r.over && E.nextStep(r) === 'fight'; }
  // 來客畫面的上場列（來客條與開打鈕之間）：上場那幾張＋替補格；點了開包包（新拿到的在那裡換上場）
  function luRowHTML(r) {
    if (!luLive(r) || !Array.isArray(r.lineup)) return '';
    var n = luN(), bn = E.benchN ? E.benchN(r, C) : 0, L = r.lineup.filter(function (id) { return r.bag.indexOf(id) >= 0; }), B = (r.bench || []).filter(function (id) { return r.bag.indexOf(id) >= 0; });
    var cells = '', bench = '', names = [];
    for (var i = 0; i < n; i++) { cells += luMini(r, L[i], { empty: LU('empty') }); if (L[i]) names.push((card(L[i]) || {}).album || ''); }
    for (var j = 0; j < bn; j++) bench += luMini(r, B[j]);
    return '<button type="button" class="lb-lurow' + (bn ? ' hasb' : '') + '" data-a="lineup" data-tut="lineup-row" aria-label="' + esc(LU('slot') + '：' + names.join('、')) + '">' +
      '<span class="lk">' + esc(LU('slot')) + '</span><span class="cs">' + cells + '</span>' +
      (bn ? '<span class="lk bn">' + esc(LU('bench')) + '</span><span class="cs bn" aria-label="' + esc(LU(luMode() === 'swap' ? 'benchHintSwap' : 'benchHint')) + '">' + bench + '</span>' : '') + '</button>' +
      (bn ? '<p class="lu-bh">' + esc(LU(luMode() === 'swap' ? 'benchHintSwap' : 'benchHint')) + '</p>' : '');
  }
  // ---- 上場面板（SPEC-I §5.4）：頂＝這一輪還沒打的客人（主屬性色點、算命／踢館帖的記號）；中＝n 格（＋替補虛線格）；下＝包包格（自己捲）；底＝幫我挑／就這五張
  var LP = null;
  function luPanel(r, mode) {
    var bag = r.bag.filter(card), keep = mode === 'due' && Array.isArray(r.lineup) ? r.lineup.filter(function (id) { return bag.indexOf(id) >= 0; }) : [];
    var pk = mode === 'stall' && r.pending && r.pending.lineup ? r.pending.lineup : null, P0 = E.lineupPolicy(r, C) || { ids: [], bench: [] };
    var ok = function (a) { return Array.isArray(a) && a.every(function (id) { return bag.indexOf(id) >= 0; }); };
    var ids = pk && ok(pk.pick) && pk.pick.length === Math.min(luN(), bag.length) ? pk.pick.slice() : P0.ids.slice();
    var bench = keep.length ? (r.bench || []).filter(function (id) { return bag.indexOf(id) >= 0 && ids.indexOf(id) < 0; }) : pk && ok(pk.bench) ? pk.bench.slice() : P0.bench.slice();
    LP = { r: r, mode: mode, ids: ids, bench: bench.filter(function (id) { return ids.indexOf(id) < 0; }), sel: null, keep: keep, n: luN(), bn: E.benchN(r, C) };
    var s = sheet(luPanelHTML(), 'lineup');
    s.addEventListener('click', luPanelClick);
    luFit(s);
    // 第一次（save.seen.lineup）：老闆說一句；舞台收成橫條（矮螢幕）看不到老闆＝改一顆吐司
    if (!save.seen.lineup && !UI.auto) { save.seen.lineup = true; persist(); later(function () { if (!LP || UI.screen !== 'night') return; if (UI.camName === 'strip') toast(LU('first'), 'keep long'); else stageSay('o', LU('first'), 'owner', 4200); }, 450); }
    autoAct(function () { var b = qs('.lb-sheet.lineup [data-a=luGo]', UI.panel); if (b) b.click(); }, 300);
    return s;
  }
  // 面板量出來要多高，舞台就收到放得下（最多讓到可視高的 72%；矮螢幕收成橫條＝roomForSheet，包包格在面板裡自己捲）；預設焦點放「就這五張」（一下確定）
  function luFit(s) {
    roomForSheet(s);
    var g = qs('[data-a=luGo]', s); if (g) requestAnimationFrame(function () { try { if (g.isConnected) g.focus({ preventScroll: true }); } catch (_) {} });
  }
  function luAt(k) { return k < LP.n ? LP.ids[k] : LP.bench[k - LP.n]; }
  function luLocked(k) { return k < LP.n && LP.keep.indexOf(LP.ids[k]) >= 0; }
  function luPanelHTML() {
    var r = LP.r, n = LP.n;
    var gs = E.roundGuests(r, C).filter(function (g) { return !g.done; }).map(function (g) {
      var en = C.enemies[g.id] || {};
      return '<span class="lu-g' + (g.cls === 'elite' ? ' elite' : g.cls === 'boss' ? ' boss' : '') + '" aria-label="' + esc(TU('pos', { n: g.pos }) + ' ' + (en.name || '') + (g.main && E.ZH ? ' ' + TU('mainAttr', { attr: E.ZH[g.main] }) : '')) + '">' +
        '<span class="hd">' + headHTML(enemySpr(en), 22) + stallMarks(g) + '</span>' + (g.main ? '<i class="dt ' + esc(g.main) + '" aria-hidden="true"></i>' : '') + '</span>';
    }).join('');
    var slot = function (k) {
      var id = luAt(k), c = card(id), bench = k >= n, on = LP.sel === k, lock = luLocked(k);
      return '<button type="button" class="lu-slot' + (bench ? ' bn' : '') + (on ? ' sel' : '') + (lock ? ' lock' : '') + (c ? '' : ' empty') + '" data-slot="' + k + '" aria-pressed="' + on + '"' +
        ' aria-label="' + esc((bench ? LU('bench') : LU('slot')) + ' ' + (c ? c.artist + '《' + c.album + '》' : LU('empty'))) + '">' +
        (c ? luMini(r, id) + starsHTML(c, { cls: 'sm' }) + earDotsHTML(r, id) : '<span class="lu-mini empty">' + esc(bench ? LU('bench') : LU('empty')) + '</span>') + '</button>';
    };
    var slots = ''; for (var k = 0; k < n + LP.bn; k++) slots += slot(k);
    var fresh = r.lineupFresh || [];
    var lay = function (id) { return wrOn(r) ? wearOf(r, id).n : 0; };
    var order = r.bag.filter(card).slice().sort(function (a, b) { return lay(b) - lay(a) || r.bag.indexOf(a) - r.bag.indexOf(b); });   // 聽膩的排前面（§3.6）
    var tiles = order.map(function (id) {
      var c = card(id), on = LP.ids.indexOf(id) >= 0, bn = LP.bench.indexOf(id) >= 0;
      var tg = (on ? '<span class="lu-tg on">' + esc(LU('onTag')) + '</span>' : bn ? '<span class="lu-tg bn">' + esc(LU('bench')) + '</span>' : '') +
        (fresh.indexOf(id) >= 0 ? '<span class="lu-tg nw">' + esc(LU('newTag')) + '</span>' : '');
      return '<button type="button" class="lu-bt' + (on ? ' on' : bn ? ' onb' : '') + '" data-id="' + esc(id) + '" aria-label="' + esc(c.artist + '《' + c.album + '》' + (on ? '・' + LU('onTag') : bn ? '・' + LU('bench') : '')) + '">' +
        '<span class="cv">' + coverHTML(c, { info: false, badge: false }) + tg + '</span>' + starsHTML(c, { cls: 'sm' }) + earDotsHTML(r, id) + '</button>';
    }).join('');
    var tip = LP.bn ? LU(luMode() === 'swap' ? 'benchHintSwap' : 'benchHint') : '';
    return '<div class="hd"><h3>' + esc(LP.keep.length ? LU('due') : LU('title', { n: n })) + '</h3></div>' +
      '<div class="lu-gs" role="group" aria-label="' + esc(LU('guests')) + '">' + gs + '</div>' +
      '<div class="lu-slots' + (LP.bn ? ' b' + LP.bn : '') + '">' + slots + '</div>' +
      '<p class="lu-tip">' + esc(LU('pickHint')) + (tip ? '<span class="b">' + esc(tip) + '</span>' : '') + '</p>' +
      '<div class="lu-bag">' + tiles + '</div>' +
      '<div class="two lu-foot"><button type="button" class="lb-btn big" data-a="luAuto">' + esc(LU('auto')) + '</button><button type="button" class="lb-btn pri big key" data-a="luGo">' + esc(LU('go')) + '</button></div>';
  }
  function luRedraw() {
    var s = qs('.lb-sheet.lineup', UI.panel); if (!s || !LP) return;
    var g = qs('.lu-bag', s), y = g ? g.scrollTop : 0;
    s.innerHTML = luPanelHTML();
    var g2 = qs('.lu-bag', s); if (g2) g2.scrollTop = y;
  }
  // 分數最低、沒鎖的那一格（沒選格子就點包包＝換掉它；SPEC-I §5.3）
  function luWorst() {
    var r = LP.r, ms = E.luMains(r, C), k = null, lo = Infinity;
    for (var i = 0; i < LP.n; i++) {
      if (!LP.ids[i]) return i;
      if (luLocked(i)) continue;
      var v = E.luScoreOf(r, C, LP.ids[i], ms); if (v < lo) { lo = v; k = i; }
    }
    return k;
  }
  function luSet(k, id) { if (k < LP.n) LP.ids[k] = id; else LP.bench[k - LP.n] = id; }
  // 點包包一張：已經在格子裡＝選它（有選別格＝兩格對調）；不在＝放進選中的那格（沒選＝分數最低那格）
  function luPut(id) {
    var n = LP.n, i = LP.ids.indexOf(id), b = LP.bench.indexOf(id), cur = i >= 0 ? i : b >= 0 ? n + b : -1, sel = LP.sel;
    if (cur >= 0) {
      if (sel == null || sel === cur) { LP.sel = sel === cur || luLocked(cur) ? null : cur; sfx('tick'); return; }
      var v = luAt(sel);
      if ((luLocked(cur) && sel >= n) || (luLocked(sel)) || (!v && cur < n)) { sfx('tick'); return; }   // 一輪中途補空格：原本上場的不能換下；上場不能空一格
      luSet(sel, id); luSet(cur, v);
    } else {
      var k = sel != null ? sel : luWorst(); if (k == null || luLocked(k)) { sfx('tick'); return; }
      if (k >= n && k - n > LP.bench.length) k = n + LP.bench.length;
      luSet(k, id);
    }
    LP.bench = LP.bench.filter(Boolean); LP.sel = null; sfx('select');
  }
  function luPanelClick(e) {
    if (!LP) return;
    var t = e.target.closest && e.target.closest('[data-slot],[data-id],[data-a]'); if (!t) return;
    if (t.hasAttribute('data-slot')) { var k = +t.getAttribute('data-slot'); sfx('tick'); LP.sel = LP.sel === k || luLocked(k) ? null : k; luRedraw(); return; }
    if (t.hasAttribute('data-id')) { luPut(t.getAttribute('data-id')); luRedraw(); return; }
    var a = t.getAttribute('data-a');
    if (a === 'luAuto') { var P = E.lineupPolicy(LP.r, C) || {}; LP.ids = (P.ids || []).slice(); LP.bench = LP.keep.length ? LP.bench.filter(function (id) { return LP.ids.indexOf(id) < 0; }) : (P.bench || []).slice(); LP.sel = null; sfx('select'); luRedraw(); return; }
    if (a === 'luGo') luCommit();
  }
  function luCommit() {
    if (!LP) return;
    var ids = LP.ids.slice(), bench = LP.bench.filter(Boolean);
    var res = doChoose(LP.mode === 'stall' ? { type: 'stall', act: 'lineup', ids: ids, bench: bench } : { type: 'lineup', ids: ids, bench: bench });
    if (!res || !res.ok) { var P = E.lineupPolicy(LP.r, C) || {}; LP.ids = (P.ids || []).slice(); LP.bench = (P.bench || []).slice(); LP.sel = null; luRedraw(); return; }
    sfx('select'); LP = null;
    UI.keepP = true; go('night');
  }
  // 前期省一下（SPEC-I §5.4）：不出面板，直接用「幫我挑」、吐司一句。回 true＝送了
  function luQuiet(r, ch) {
    var res = doChoose(ch); if (!res || !res.ok) return false;
    toastAfter(LU('quiet'));
    return true;
  }
  // 攤位收尾那一步（照 stallNight 的場景：這一輪的客人還在門外）：quiet＝直接送、回來客畫面；不然開面板
  function luStallNight(r) {
    var lp = r.pending.lineup;
    if (lp.quiet && luQuiet(r, { type: 'stall', act: 'lineup', ids: (lp.pick || []).slice(), bench: (lp.bench || []).slice() })) { UI.keepP = true; return go('night'); }
    setTop(posLabel(r), { help: true, pause: true });
    var panel = UI.panel; panel.classList.add('night');
    stg('interact', 'map');
    resetPoses(); stg('sil', 'p', false);
    settle('o', 'counter', 'owner');
    if (UI.keepP && stg('has', 'p')) UI.keepP = false; else { UI.keepP = false; settle('p', UI.lastSpot || 'browse', 'player'); }
    hideActor('f'); stg('door', 'close'); UI.atTable = null;
    var q = [r.order[r.idx], r.order[r.idx + 1]];
    if (q[0]) { place('q1', 'q1', enemySpr(C.enemies[q[0]])); stg('sil', 'q1', true); } else hideActor('q1');
    if (q[1]) { place('q2', 'q2', enemySpr(C.enemies[q[1]])); stg('sil', 'q2', true); } else hideActor('q2');
    var box = el('div', 'lb-screen', '<div class="lb-night"><div class="nh"><b>' + esc(TU('round', { r: r.round })) + '</b></div></div>' + bagLineHTML(r));
    panel.appendChild(box);
    luPanel(r, 'stall');
  }
  // 一輪中途換上場（SPEC-I §5.2-4 b）：剛拿到的那張換掉上場的一張（被換下的回包包）。o.after＝換完（或不換）之後叫
  function luSwapOk(r, id) {
    var p = r && r.pending;
    return luLive(r) && Array.isArray(r.lineup) && !r.over && !r.duel && (!p || p.type === 'reward' || p.type === 'level') &&
      (r.lineupFresh || []).indexOf(id) >= 0 && r.bag.indexOf(id) >= 0 && r.lineup.indexOf(id) < 0;
  }
  function luSwapSheet(inId) {
    var r = save.run, c = card(inId);
    if (!c || !luSwapOk(r, inId)) return Promise.resolve(false);
    return new Promise(function (res) {
      var n = luN(), L = r.lineup.filter(function (id) { return r.bag.indexOf(id) >= 0; }), cells = '';
      for (var i = 0; i < n; i++) {
        var x = card(L[i]);
        cells += x ? '<button type="button" class="lu-slot" data-out="' + esc(L[i]) + '" aria-label="' + esc(LU('swapIn') + '：' + x.artist + '《' + x.album + '》') + '">' + luMini(r, L[i]) + starsHTML(x, { cls: 'sm' }) + earDotsHTML(r, L[i]) + '</button>'
          : '<button type="button" class="lu-slot empty" data-out="" aria-label="' + esc(LU('empty')) + '"><span class="lu-mini empty">' + esc(LU('empty')) + '</span></button>';
      }
      var html = '<div class="hd"><h3>' + esc(LU('swapWhich')) + '</h3><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
        '<div class="lu-in">' + coverHTML(c, { info: false, badge: false, size: 40 }) + '<span class="t"><b>' + esc(c.album) + '</b>' + starsHTML(c, { cls: 'sm' }) + '</span></div>' +
        '<div class="lu-slots">' + cells + '</div>' +
        '<div class="two"><button type="button" class="lb-btn big wide" data-a="close">' + esc(LU('swapNo')) + '</button></div>';
      var s = floatSheet(html, 'luswap'), done = false;
      var fin = function (v) { if (done) return; done = true; if (s.isConnected) { s.remove(); syncFloat(); } res(v); };
      s.addEventListener('click', function (e) {
        var b = e.target.closest && e.target.closest('[data-out],[data-a=close]'); if (!b) return;
        if (!b.hasAttribute('data-out')) return fin(false);
        var out = b.getAttribute('data-out') || null, rs = doChoose({ type: 'lineupSwap', inId: inId, outId: out });
        if (rs && rs.ok) { sfx('select'); toast(LU('swapped', { album: c.album })); }
        fin(!!(rs && rs.ok));
      });
      // ✕ 與 floatSheet 自己的關閉（data-a=close 已經移掉面板）：也算不換
      var mo = W.MutationObserver ? new MutationObserver(function () { if (!s.isConnected) { mo.disconnect(); fin(false); } }) : null;
      if (mo) mo.observe(app(), { childList: true });
      autoAct(function () { fin(false); }, 200);
    });
  }
  // 領獎畫面（戰利品列、舊的領獎面板）標題列下面一行小字：這場有唱片聽膩了（pending.worn；停住、跟其他獎勵字一起）
  function wornHd(html) {
    var r = save.run, p = r && r.pending, w = p && p.type === 'reward' && Array.isArray(p.worn) ? p.worn.filter(function (x) { return x && card(x.id); }) : [];
    if (!w.length || !wrOn(r) || !WR('got')) return html;
    var tag = '<p class="lb-worn" data-tut="worn">' + w.map(function (x) { return esc(WR('got', { album: card(x.id).album, n: x.n | 0 })); }).join('<br>') + '</p>';
    var k = html.indexOf('</div>');
    return k >= 0 && /^<div class="hd">/.test(html) ? html.slice(0, k + 6) + tag + html.slice(k + 6) : tag + html;
  }
  // 第一次聽膩：老闆說一句（save.seen.wear；領獎畫面）
  function wornFirst(p) {
    if (!p || !Array.isArray(p.worn) || !p.worn.length || save.seen.wear || UI.auto || !WR('first')) return;
    save.seen.wear = true; persist();
    later(function () { if (UI.screen === 'reward') stageSay('o', WR('first'), 'owner', 4200); }, 2400);
  }
  // 規則卡那一段（上場制開著才有；跟翻面那段一樣併在配件那段後面，規則卡不捲）
  function luRuleHTML() { return C.lineup && C.lineup.on && LU('rule') ? esc(LU('rule') + (C.wear && C.wear.on ? WR('rule') : '')) : ''; }

  SCREENS.night = function () {
    var r = save.run;
    if (!r) return go('title');
    if (r.over && !r.pending) return go('end');
    // 第 C 波（SPEC-C §2.4、§4.3；CRITIQUE 1.1）：今天的攤位放行——照畫來客畫面，底部換成攤位面板（stalls.js）
    var nstep = E.nextStep(r);
    if (nstep === 'stall' && luStallStep(r)) return luStallNight(r);   // 第 I 波 I-2：攤位逛完、收攤前的上場那一步
    if (nstep === 'stall' && UI.stallsOk) return stallNight(r);
    if (nstep !== 'fight') return resumeRun();
    // 第 I 波 I-2：換輪沒攤位／中繼點選秀完（lineupDue、還沒挑）＋前期省一下＝直接用「幫我挑」（上場列照新的畫）
    if (luDueNow(r) && !Array.isArray(r.lineup) && E.lineupQuiet && E.lineupQuiet(r, C)) { var P0 = E.lineupPolicy(r, C); if (P0) luQuiet(r, { type: 'lineup', ids: P0.ids, bench: P0.bench }); }
    setTop(posLabel(r), { help: true, pause: true });
    // 走到中繼點（SPEC §0「走到就記」）：到了這一位的來客畫面出一次吐司、記進 save.best（重新整理回來沒看過也補一次）
    if (r.checkpoints.indexOf(r.pos) >= 0 && r.cpShown !== r.pos) { r.cpShown = r.pos; noteCheckpoint(r.pos); persist(); toastAfter(TU('checkpoint', { n: r.pos }), 'gold'); }
    var panel = UI.panel; panel.classList.add('night');
    stg('interact', 'map');
    resetPoses(); stg('sil', 'p', false);
    settle('o', 'counter', 'owner');
    if (encLootPending(r)) { UI.keepP = false; place('p', 'duelP', 'player'); }   // 切磋打贏還沒收（§7.3-8）：你留在對戰台那一邊，跟領獎畫面一樣
    else if (UI.keepP && stg('has', 'p')) UI.keepP = false; else { UI.keepP = false; settle('p', UI.lastSpot || 'browse', 'player'); }
    // 挑戰者進門直接走到對戰台等你（第 A 波 1；店主 11-16）：這一位推門進來、走到對戰台（duelE）站著；門外排的是再下一位。
    //   序章收尾 E10 推門進來的那位＝第 1 位：已經在店裡，從門邊走過去。傳說藏家照舊在門外（他有自己的進場那段，bossEnterFlow）
    var nx = r.order[r.idx], waits = guestWaits(r);
    // 切磋（SPEC-H §7.3）：熟客佔著對戰台（邀請、打完回來、作廢那句）＝這一位主線客人先在門外等（q1＝他，同藏家那條）
    var sp = waits ? sparNight(r) : null;
    var q = waits && !sp ? [r.order[r.idx + 1], r.order[r.idx + 2]] : [nx, r.order[r.idx + 1]];
    if (waits && !sp) guestToTable(r); else if (!waits) { hideActor('f'); stg('door', 'close'); }
    if (q[0]) { place('q1', 'q1', enemySpr(C.enemies[q[0]])); stg('sil', 'q1', true); } else hideActor('q1');
    if (q[1]) { place('q2', 'q2', enemySpr(C.enemies[q[1]])); stg('sil', 'q2', true); } else hideActor('q2');
    var row = E.roundGuests(r, C).map(function (g, i) {
      var en = C.enemies[g.id] || {}, pl = TU('pos', { n: g.pos });
      // 稱號（第 A 波 3；engine guestTitle：每 2 位換一次、藏家／跟名字一樣＝null）：頭像下緣一塊小名牌（壓在頭像上，不多佔一行：375×548 店景不再縮）
      //   「○○級」（titleTx）；放不下的用短寫（C.trial.titlesShort：地下廠牌主理人 → 廠牌主理人；aria-label 照全名）；6 字以上的名牌收一號（.lg），其他 10 px
      var tt = titleTx(g.title), ts = titleTx(g.title && ((C.trial || {}).titlesShort || {})[g.title] || g.title);
      return '<button type="button" class="nc' + (g.done ? ' done' : '') + (g.skip ? ' skip' : '') + (g.cur ? ' cur' : '') + (g.cls === 'elite' ? ' elite' : '') + (g.cls === 'boss' ? ' boss' : '') + '" data-i="' + i + '" data-tut="night-' + i + '" aria-label="' + esc(pl + ' ' + en.name + (tt ? ' ' + tt : '') + (g.fortune ? ' ' + ((C.waveC || {}).stations || {}).fortune : '') + (g.dare ? ' ' + ((C.waveC || {}).stations || {}).dare : '')) + '">' +
        '<span class="ps">' + esc(pl) + '</span><span class="hd">' + headHTML(enemySpr(en), 30) + (g.done ? '<span class="ok" aria-hidden="true">✓</span>' : '') + stallMarks(g) + '</span>' +
        (ts ? '<span class="tl' + (ts.length >= 6 ? ' lg' : '') + '">' + esc(ts) + '</span>' : '') + '<span class="nm">' + esc(en.name || '') + '</span></button>';     // 名字一律寫身分（FIXLIST 6；COPY-15）：菁英／藏家用頭像的框分
    }).join('');
    var nen = C.enemies[nx] || {}, toCp = E.toCheckpoint(r, C), luRow = luRowHTML(r);   // 第 I 波 I-2：上場列（上場制那幾輪；關著＝空字串）
    var h = '<div class="lb-night' + (luRow ? ' lu' : '') + '" data-tut="night-box"><div class="nh"><b>' + esc(TU('round', { r: r.round })) + '</b><span class="sub">' +
        esc([toCp != null ? TU('toCheckpoint', { n: toCp }) : '', pleaText(r)].filter(Boolean).join('・')) + '</span></div>' +
      '<div class="nrow" data-tut="night">' + row + '</div>' + luRow +
      '<button type="button" class="lb-btn pri big wide key" data-a="go" data-tut="night-next">' + esc(TU('next', { n: r.pos, name: nen.name || '' })) + '</button></div>' +
      bagLineHTML(r);
    var box = el('div', 'lb-screen', h); panel.appendChild(box);
    guardClicks(box);
    // 鏡頭 night（layout 有才用；沒有 stage 退回 full）：放不下整間店時從牆頂往下裁、留下面（第 A 波 1：客人在對戰台等你，唱盤區要看得到；
    //   原本 anchor top 留門口牆 FEATURE／PICKS 的名牌）。minH 290：375×548 門口牆的封面、門照樣點得到，名牌被裁掉
    cam('night', 'map', 600, Math.max(170, Math.ceil(naturalH(box) + 6)));
    box.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a],[data-i]'); if (!b || UI.going) return;
      if (b.hasAttribute('data-i')) { sfx('tick'); guestSheet(+b.getAttribute('data-i')); return; }
      var a = b.getAttribute('data-a');
      if (a === 'go') nextGuest();
      else if (a === 'me') meSheet(r);
      else if (a === 'bag' || a === 'lineup') bagSheet(r);
      else if (a === 'relics') relicSheet(r);
    });
    // 再挑戰一趟挑到一半（重新整理、關掉）：特價區還沒挑 → 先挑完才叫得了第 1 位客人（§2.5.2；只在第 1 位之前，裁定 4）
    if (E.canBargainPick(r)) {
      UI.going = true;
      later(function () {
        if (UI.screen !== 'night') return;
        bargainPickFlow((C.shopUi && C.shopUi.bargainPrompt) || '').then(function () { UI.going = false; if (UI.screen === 'night') go('night'); });
      }, 300);
      return;
    }
    // 頂點卡試做（?apex=1）：這份存檔第一次開旗標、第 1 位開打前＝老闆說一句、跳挑王牌面板（apexIntroOnNight；旗標關時不走）
    //   沒得挑（只收到一張）＝老闆只說那句：下面的提示都晚 sayMs 再出（不跟老闆那句疊）
    // 第 I 波 I-2：要挑上場（換輪沒攤位、中繼點選秀完、上場那張賣掉）＝來客畫面一進來就開上場面板（蓋住來客那塊；其他提示等下一次來客畫面）
    if (luDueNow(r)) { luPanel(r, 'due'); return; }
    var intro = apexIntroOnNight(r);
    if (intro === 'panel') return;
    var sayMs = intro === 'said' ? 2600 : 0;
    // 換王牌的一次性提示（店主 11-13；save.seen.aceSwap）：第 1 位開打前、第一次來客的提示（nightIntro）看過之後才出——老闆頭上閃一下＋吐司「想換王牌，點老闆。」
    //   解鎖制（店主 11-16）：沒東西可換（只解鎖一派）先不提示，等第一次打倒傳說藏家解鎖了別派再說
    var aceHintNow = !sp && save.seen.night && !save.seen.aceSwap && !UI.auto && E.canSwitchAce(r, C) && canSwapAny(r);
    if (aceHintNow) later(function () {
      if (UI.screen !== 'night' || !save.run || !E.canSwitchAce(save.run, C) || !canSwapAny(save.run) || save.seen.aceSwap) return;
      save.seen.aceSwap = true; persist();
      stg('emote', 'o', 'excl', 2600);
      toast(TU('aceHint'));
    }, 700 + sayMs);
    var quiet = UI.quietNight || !!sp; UI.quietNight = false;  // 剛換完王牌重畫：這一次不再排第一次來客的提示（審查：三則訊息疊在一起）；切磋的熟客在對戰台時也不排（下一次來客畫面再說）
    // 櫃檯提示（counterSell）與流派還鎖著（lockHint）同一次只出一則、也不會永遠擋掉對方（主線合併 11-16：原本「包包賣回的提示優先、同一次不疊」，
    //   第 A 波把包包賣回提示換成櫃檯提示）：
    //   ① 櫃檯提示先排：兩位客人之間、包包 ≥ BAG_HINT_AT 張才成立；出過記 seen.counterSell（自己打開過「賣給老闆」也記）＝之後不再擋 lockHint
    //   ② lockHint 只在第 1 位開打前成立：同一次櫃檯提示真的出了（sellHinted）就不出、下一趟第 1 位再出；櫃檯提示這次沒出成（面板開著）＝lockHint 照樣出
    //   平常撞不到：第一晚櫃檯提示要等老闆四句看過（seen.night），lockHint 等四句看完才出；第一趟第 1 位包包 8 張（櫃檯提示不成立）。
    //   只有第二趟起帶 3 張種子開局（包包 10 張）、lockHint 還沒出過時兩則都成立
    var sellHintNow = !aceHintNow && !quiet && save.seen.night && !save.seen.counterSell && !UI.auto && E.canShop(r) && r.bag.length >= BAG_HINT_AT;
    var sellHinted = false;
    // 「拿去櫃檯賣給老闆」的一次性提示（save.seen.counterSell；第 A 波 5：移出包包只走櫃檯）：第一次來客的提示看過之後、兩位客人之間、包包長到 BAG_HINT_AT 張以上——
    //   老闆頭上閃一下（！）＋櫃檯描框一下＋吐司「包包越塞越滿？拿去櫃檯賣給老闆，半價。」（不提示的話牌組只會越收越大）。
    //   自己打開過「賣給老闆」就不再出；同一次不跟換王牌的提示疊。
    //   鍵換成 counterSell（審查 A-2）：舊版的 seen.bagSell 在舊提示出過、或兩位客人之間點開包包就設了——玩過舊版的人會永遠看不到新的賣法
    //   提示出過之後，這一次來客畫面點櫃檯直接開「賣給老闆」分頁（UI.sellNudge；描框的是櫃檯，點了卻開配件＝審查 A-9）
    if (sellHintNow) later(function () {
      var rr = save.run;
      if (UI.screen !== 'night' || !rr || save.seen.counterSell || !E.canShop(rr) || rr.bag.length < BAG_HINT_AT || qs('.lb-sheet.float', app()) || qs('.ec-drawer', app())) return;
      sellHinted = true;
      save.seen.counterSell = true; persist();
      UI.sellNudge = rr;
      stg('emote', 'o', 'excl', 2600);
      stg('highlight', [{ ids: ['counter'] }]); later(function () { if (UI.screen === 'night' && !qs('.ec-drawer', app())) stg('highlight', []); }, 2600);
      toast(SHU('bagSellHint'), 'long');
    }, 700 + sayMs);
    // 流派還鎖著的一次性提示（審查 11-16；save.seen.unlockHint）：只解鎖一派（沒得換）、第 1 位開打前＝老闆頭上閃一下＋吐司
    //   「其他流派還鎖著：打倒傳說藏家，解鎖經典流。」（序章 O9 那一挑定下初始流派，之前畫面上沒地方講其他派怎麼來；矮螢幕標題那行又收起來）。
    //   跟「想換王牌」那則不會同時成立；跟櫃檯提示見上面（櫃檯提示先，同一次出了就不疊）。第一晚（第一次來客的老闆四句還沒看過）＝等那幾句看完才出
    if (!aceHintNow && !quiet && !UI.auto && !save.seen.unlockHint && E.canSwitchAce(r, C) && !canSwapAny(r)) {
      var lockHint = function () {      // 回 true＝不用再等（出了，或已經不適用）
        if (UI.screen !== 'night' || save.run !== r || save.seen.unlockHint || sellHinted || !E.canSwitchAce(r, C) || canSwapAny(r)) return true;
        var tt = D.getElementById('tut');
        if (!save.seen.night || UI.going || (tt && /\bon\b/.test(tt.className)) || qs(':scope > .lb-sheet', UI.panel) || qs('.lb-sheet.float', app())) return false;
        var nx = E.nextUnlock ? E.nextUnlock(unlockedNow()) : null; if (!nx) return true;
        save.seen.unlockHint = true; persist();
        stg('emote', 'o', 'excl', 2600);
        toast(TU('lockHint', tierVars(nx)), 'long');
        return true;
      };
      if (save.seen.night) later(lockHint, 700 + sayMs + (sellHintNow ? 60 : 0));   // 櫃檯提示排在前面：同一個時間點先讓它出
      else { var lhIv = setInterval(function () { if (lockHint()) clearInterval(lhIv); }, 400); UI.offs.push(function () { clearInterval(lhIv); }); }
    }
    if (!quiet) shopNotes(r, 700 + sayMs);
    if (!save.seen.night && !UI.auto && !quiet) later(function () {
      if (UI.screen !== 'night') return;
      // 整個名單（含「第 n 輪」那行）當目標：泡泡放在名單上面，不蓋標題（RT-11）
      var T = TUT(); if (T && T.firstTime) try { T.firstTime('night', ['night-box', 'night-next'], NIGHT_INTRO_O); } catch (e) { console.error(e); }
    }, 700 + sayMs);
    autoAct(function () { var b = qs('[data-a=go]', box); if (b) b.click(); }, 300);
  };
  // 來客畫面的店內通知（SPEC-B §3.7、§4.6、§5.3）：lotAll、lotHint、想要的上架（lot.told）、今日推薦沒收；一次一則，等沒有教學／面板／吐司才出
  function shopNotes(r, ms) {
    if (UI.auto) return;
    var L = r.shop && r.shop.lot, Q = [];
    if (L && L.src === 'all' && !save.seen.lotAll) Q.push(function () { save.seen.lotAll = true; persist(); stageSay('o', line('lotAll'), 'owner', 2800); return true; });
    if (L && r.idx > 0 && !save.seen.lotHint) Q.push(function () { save.seen.lotHint = true; persist(); stg('emote', 'o', 'excl', 2600); toast(line('lotHint'), 'long'); return true; });
    Q.push(function () { return wantNote(r); });
    Q.push(function () { if (UI.dailyNagged || !dailyCard() || !E.canShop(r)) return false; UI.dailyNagged = true; UI.dailyNew = false; stageSay('o', line('dailyNew'), 'owner', 2600); return true; });
    var wait = Math.ceil(ms / speed() / 300), iv = setInterval(function () {   // 數拍子（測試會定住 Date）
      if (UI.screen !== 'night' || save.run !== r) return clearInterval(iv);
      var tt = D.getElementById('tut'), ci = CI(), X = econ();
      if (--wait > 0 || UI.going || UI.modal || UI.page || (tt && /\bon\b/.test(tt.className)) || (ci && ci.isOpen()) || (X && X.isOpen && X.isOpen()) ||
        qs('.lb-sheet', app()) || qs('.lb-toast:not(.out)', app()) || (+crowdCall('chatTill') || 0) > Date.now() || (UI.fSayTill || 0) > Date.now()) return;   // 活店：店裡有人正在跟你聊、挑戰者正在講開場那句，等他講完
      while (Q.length) if (Q.shift()()) { wait = Math.ceil(3000 / speed() / 300); return; }
      clearInterval(iv);
    }, 300);
    UI.offs.push(function () { clearInterval(iv); });
  }
  function wantNote(r) {
    var L = r.shop.lot; if (!L || !Array.isArray(L.want) || !L.want.length) return false;
    if (!Array.isArray(L.told)) L.told = [];
    var hit = [], B = r.shop.bins || {};
    Object.keys(B).forEach(function (k) { (B[k] || []).forEach(function (id) { if (L.want.indexOf(id) >= 0 && L.told.indexOf(id) < 0 && r.want && r.want.indexOf(id) >= 0 && card(id)) hit.push([id, k]); }); });
    if (!hit.length) return false;
    hit.forEach(function (x) { L.told.push(x[0]); }); persist();
    var B2 = C.bins || {}, keys = hit.map(function (x) { return x[1]; }).filter(function (k, i, a) { return a.indexOf(k) === i; });
    var b = B2[hit[0][1]] || {};
    // 箱子道具上的名牌是英文（JAZZ）：吐司帶英文、單張再括中文
    toast(hit.length > 1 ? SHU('wantOnShelfN', { n: hit.length, bins: keys.map(function (k) { return (B2[k] || {}).label || (B2[k] || {}).zh || k; }).join('、') })
      : SHU('wantOnShelf', { album: card(hit[0][0]).album, bin: b.label && b.zh ? b.label + '（' + b.zh + '）' : (b.zh || b.label || '') }), 'long');
    return true;
  }
  // 聲望那顆（來客的錢那條最左）：「聲望 10/14」，數字粗體、「聲望」兩字小一號
  function hpChipHTML(r) { return esc(TU('hp', { n: r.hp, max: r.maxHp })).replace(/^([^\d]*?)\s*(\d+\/\d+)/, function (m, k, n) { return (k ? '<span class="k">' + k + '</span>' : '') + '<b>' + n + '</b>'; }); }
  // 點聲望那顆：等級、經驗、聲望、品味、底氣、聲望上限（品味／底氣：店主暫定的名字；旁邊一句說它在做什麼，審查 #11）
  function meSheet(r) {
    var need = xpNeedOf(trialT(r), r.level | 0);                     // 第 I 波 I-0：Lv1→2 只要 firstNeed
    var row = function (t, sub) { return '<li><b>' + esc(t) + '</b>' + (sub ? '<span class="sub">' + esc(sub) + '</span>' : '') + '</li>'; };
    var html = '<div class="hd"><h3>' + esc(TU('level', { n: r.level })) + '</h3><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
      '<ul class="lb-me">' + row(TU('hp', { n: r.hp, max: r.maxHp })) + row(TU('xp', { n: r.xp, need: need })) +
      row(TU('atk', { n: r.atk }), TU('atkHelp', { n: r.atk | 0 })) + row(TU('def', { n: r.def }), TU('defHelp', { n: r.def | 0 })) + row(TU('maxHp', { n: r.maxHp })) +
      (r.fac && facDef(r.ace) ? row(facMineLine(r)) : '') + '</ul>';     // 第 D 波棒二：「本派：識貨、吸血」（帶派別的 run 才有）
    floatSheet(html, 'me');
  }
  // 客人的常聽頻率（v5 第六項第二期）：「常聽 ● 暴躁」（C.enemies[id].tune；顏色、名字照 C.tunes）。只上色、不進規則
  function guestTuneHTML(en) {
    var T = C.tunes || {}, k = en && en.tune, col = T.colors && T.colors[k];
    if (!col) return '';
    return '<div class="bl tn" data-tune="' + esc(k) + '"><b>' + esc(T.guest || '') + '</b><i style="--tn:' + esc(col) + '" aria-hidden="true"></i>' + esc((T.names || {})[k] || '') + '</div>';
  }
  // 點頭像：他是第幾位、名字、聲望（品味／底氣大於 0 才寫）、帶不帶王牌、口頭禪、常聽頻率
  function guestSheet(i) {
    var r = save.run, g = E.roundGuests(r, C)[i], id = g && g.id, en = C.enemies[id]; if (!en) return;
    var cur = g.cur, done = g.done, ln = (C.lines[id] && C.lines[id].line) || en.line || '';
    // 菁英／傳說藏家的籤：名字本身就是這個詞（傳說藏家）就不再加（審查 #15）
    var tag = function (t) { return t && t !== en.name ? '<span class="gtag">' + esc(t) + '</span>' : ''; };
    var tags = tag(g.cls === 'elite' ? TU('elite') : g.cls === 'boss' ? TU('boss') : '') + (g.hasAce ? tag(TU('hasAce')) : '');
    // 稱號（第 A 波 3）：不跟菁英／帶王牌放同一排小籤（看起來像分類，審查 A-6）——另起一行「稱號：○○級」
    var ttl = g.title ? '<div class="bl tl">' + esc(TU('titleLine', { t: titleTx(g.title) })) + '</div>' : '';
    // 聲望一行；品味／底氣各一行、後面一句說它在做什麼（客人的品味：扣到你就多扣；底氣跟你的一樣；審查 #11）
    var bl = ttl + '<div class="bl">' + esc('聲望 ' + g.hp) + '</div>' +
      (g.atk ? '<div class="bl st"><b>' + esc(TU('atk', { n: g.atk })) + '</b>' + esc(TU('eAtkHelp', { n: g.atk })) + '</div>' : '') +
      (g.def ? '<div class="bl st"><b>' + esc(TU('def', { n: g.def })) + '</b>' + esc(TU('defHelp', { n: g.def })) + '</div>' : '') +
      // 常出哪一色（第 A 波 6：客人主屬性，engine roundGuests[i].main）：「常出：冷門」，屬性字上三軸色
      (g.main && E.ZH && E.ZH[g.main] ? '<div class="bl ma" data-main="' + esc(g.main) + '">' + colorZh(TU('mainAttr', { attr: E.ZH[g.main] })) + '</div>' : '') + guestTuneHTML(en);
    // 解鎖制（店主 11-16）：傳說藏家帶哪張（run.bossCard，每輪可以不同）、打倒他會解鎖哪一派／收到這張（舊的 run 沒有 run.unlock：不寫，照舊）
    var bc = g.cls === 'boss' && r.unlock && r.bossCard ? card(r.bossCard) : null;
    if (bc) {
      var bt = E.tierOfApex ? E.tierOfApex(C, bc.id) : null, chs = choicesOf(r);
      var gain = bt && chs.tiers.indexOf(bt) < 0 ? TU('bossUnlock', tierVars(bt)) : (UI.apex && chs.apex && chs.apex.indexOf(bc.id) < 0 ? TU('bossCollect') : '');
      bl += '<div class="bl st boss-ace"><b>' + esc(TU('bossCarry', { album: bc.album })) + '</b>' + esc(gain) + '</div>';
    }
    var html = '<div class="hd"><h3>' + esc(TU('pos', { n: g.pos }) + '・' + (done ? TU('guestDone') : cur ? TU('guestCur') : g.skip ? WU('cpSkip') : TU('guestLater'))) + '</h3><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
      '<div class="pv-who"><div class="av">' + headHTML(enemySpr(en), 30) + '</div><div><b class="key">' + esc(en.name) + '</b>' +   // FIXLIST 6：只有名字（沒有副標、沒有誠實度）
      tags + bl + '</div></div>' +
      (ln ? '<div class="lb-habit"><span class="tx">' + esc([].concat(ln)[0]) + '</span></div>' : '') +
      '<div class="two">' + (cur ? '<button type="button" class="lb-btn pri big key" data-a="go">就他了</button>' : '') + '<button type="button" class="lb-btn big key" data-a="close">' + (cur ? '再看看' : '關閉') + '</button></div>';
    var s = floatSheet(html, 'guest');
    s.addEventListener('click', function (e) {
      if (!(e.target.closest && e.target.closest('[data-a=go]'))) return;
      // 攤位還沒逛完（第 C 波 SPEC-C §4.3-6）：「就他了」跟對戰台、箱子一樣回「先逛完今天的攤位。」，面板留著
      if (save.run && E.nextStep(save.run) === 'stall') { sfx('tick'); toast(WU('busy')); return; }
      s.remove(); syncFloat(); nextGuest();
    });
  }
  // 下一位推門進來：門 swing、他走進來說一句（推門那句），接著無縫推近成對決
  function nextGuest() {
    var r = save.run;
    if (!UI.going && r && luDueNow(r) && UI.screen === 'night') { sfx('tick'); luPanel(r, 'due'); return; }   // 第 I 波 I-2：還沒挑上場（面板被別的小面板蓋掉了）＝先挑
    if (UI.going || !r || E.nextStep(r) !== 'fight') return;
    if (encLootPending(r)) return go('night');     // 切磋打贏還沒收／沒拿錢（§7.3-8）：「下一位」被擋、重開戰利品列
    UI.going = true; UI.sellNudge = null;          // 開打：櫃檯那個「點了直接開賣給老闆」只在提示出過的那一次來客畫面
    sfx('select');
    qsa('.lb-sheet.float', app()).forEach(function (s) { s.remove(); }); syncFloat();
    var T = TUT(); if (T && T.dismissSoft) try { T.dismissSoft(); } catch (_) {}
    var id = r.order[r.idx], en = C.enemies[id] || {};
    if (en.boss) { later(function () { bossEnterFlow(); }, 200); return; }
    if (r.shop && r.shop.firstGuestInside) { r.shop.firstGuestInside = false; persist(); }
    // 切磋邀請中（熟客在對戰台）直接按「下一位」（SPEC-H §7.3-6；順序寫死）：他說一句改天、走動槽接手、往 frontleft 走；他離開對戰台 ≥38 格（clearP）才把主線客人放上去
    var clearP = sparInterrupt(r);
    if (!clearP && E.encPending(r) === 'offer') sparChoose({ type: 'encDecline' });   // 邀請還開著但畫面沒在演（重新整理後活店關著、出錯保底）：收尾，說情重打同一位不再出（審查修正 p2b）
    if (clearP) clearP.then(function () { if (UI.screen !== 'night' || save.run !== r) return; UI.atTable = tableKey(r); place('f', 'duelE', enemySpr(en)); stg('door', 'close'); sparQueue(r, true); });
    // 他在對戰台等（第 A 波 1）：你走到對戰台（duelP）就開打；他還在路上就一起過去（duelIn 把兩個人放到位）
    else if (UI.atTable !== tableKey(r)) { UI.atTable = tableKey(r); settle('f', 'duelE', enemySpr(en)); stg('sil', 'f', false); }
    var start = function () { if (UI.screen === 'night' && save.run === r) beginFight({ enter: true }); };
    crowdCall('clearDuel');                                   // 活店（SPEC-H §3.1）：開打清對戰區（被橫條切頭的、擋老闆去裁判與你走去對戰台的先走開）
    var p = stg('pos', 'p'), sp = stg('spot', 'duelP');
    if (UI.auto || !p || p.hidden || p.outside || !sp || (Math.round(p.x) === sp[0] && Math.round(p.y) === sp[1])) { later(function () { Promise.resolve(clearP).then(start); }, UI.auto ? 120 : 200); return; }
    stg('pose', 'p', null);
    Promise.all([stgP('walk', 'p', ['duelP'], 110), clearP]).then(start);   // 你同一時間就開始走：不讓你多等（走過去本來就要 0.7 秒以上）
  }
  // 包包（來客畫面包包條點開）：王牌＋包包每一張，只看、點封面開唱片資訊（第 A 波 5：移出包包只走櫃檯「賣給老闆」，包包面板不給賣）。
  //   包包不限張數（店主 11-16「可以無限多直到結束才重置」）：張數多了面板自己捲（標題列黏在上面），375×548 也不爆版。
  //   老闆送的、櫃裡帶來的標小籤；兩位客人之間說明那行指去櫃檯（C.shopUi.bagNote）
  var BAG_HINT_AT = 10;                                        // 「拿去櫃檯賣給老闆」的一次性提示：包包幾張以上才出（開局 7 張、序章那一趟 8 張；打贏兩三位之後）
  function bagSheet(r) {
    var tag = function (cls, t) { return '<span class="sdtag' + (cls ? ' ' + cls : '') + '">' + esc(t) + '</span>'; };
    var shop = E.canShop(r);
    var tiles = tileHTML(card(aceIdOf(r)), { text: false }) + r.bag.map(function (id) {
      var c = card(id); if (!c) return '';
      var sd = E.isSeed(r, C, id), gf = shop && !sd && E.isGift(r, C, id);   // 從唱片櫃帶來的（種子）：小籤「櫃裡帶來」；老闆送的：逛店時標「老闆送的」
      return tileHTML(c, { text: false, store: isStore(id), cls: (sd ? 'seed' : gf ? 'gift' : '') + luBagCls(r, id), extra: luBagTag(r, id) + (sd ? tag('', SHU('seedTag')) : gf ? tag('gf', SHU('giftTag')) : '') + luBagExtra(r, id) });
    }).join('');
    var note = shop ? '<p class="sub bgnote">' + esc(SHU('bagNote')) + '</p>' : '';
    var html = '<div class="hd"><h3>' + esc(bagText(r.bag.length)) + '</h3>' + (shop ? '<span class="bgmoney">' + moneyHTML(r.money) + '</span>' : '') +
      '<button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
      '<p class="sub">點封面看唱片資訊。王牌另外放，不佔包包。</p>' + note + '<div class="lb-pick">' + tiles + '</div>';
    var s = floatSheet(html, 'bag tall' + (luOn(r) || wrOn(r) ? ' lu' : ''));
    // 第 I 波 I-2：新拿到的那張「換上場」→ 換掉哪一張？（換完重畫來客畫面的上場列）
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-swap]'); if (!b) return;
      sfx('tick'); s.remove(); syncFloat();
      luSwapSheet(b.getAttribute('data-swap')).then(function (ok) { if (ok && UI.screen === 'night' && save.run === r) { UI.keepP = true; go('night'); } });
    });
    return s;
  }
  // 包包面板每一張（第 I 波 I-2；開關關著＝空字串）：上場／替補小籤、耐聽點、休息中、新拿到的「換上場」
  function luBagCls(r, id) { return luLive(r) && Array.isArray(r.lineup) && r.lineup.indexOf(id) >= 0 ? ' lu-on' : ''; }
  function luBagTag(r, id) {
    if (!luLive(r) || !Array.isArray(r.lineup)) return '';
    var t = r.lineup.indexOf(id) >= 0 ? LU('onTag') : (r.bench || []).indexOf(id) >= 0 ? LU('bench') : '';
    return t ? '<span class="sdtag lu">' + esc(t) + '</span>' : '';
  }
  function luBagExtra(r, id) {
    var h = earDotsHTML(r, id);
    if (wrOn(r) && luLive(r) && Array.isArray(r.lineup) && r.lineup.indexOf(id) < 0 && (r.rested || []).indexOf(id) >= 0 && wearOf(r, id).used) h += '<span class="sdtag rest">' + esc(WR('resting')) + '</span>';
    if (luSwapOk(r, id) && E.canShop(r)) h += '<button type="button" class="lb-pickb key lu-sw" data-swap="' + esc(id) + '">' + esc(LU('swapIn')) + '</button>';
    return h;
  }
  function relicSheet(r) {
    var html = '<div class="hd"><h3>發燒配件</h3><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
      '<p class="sub">' + esc((C.rules && C.rules.relics) || '') + '</p><div class="lb-opts">' + (r.relics.length ? r.relics.map(function (id) {
        var x = relicOf(id);
        return '<div class="lb-relic static"><span class="pix">' + relicIcon(id, 30) + '</span><span class="tx"><span class="nm">' + esc(x.name) + '</span><span class="ds">' + esc(x.desc) + '</span></span></div>';
      }).join('') : '<p class="sub">還沒有。序章收尾、打贏菁英或藏家，或兩位客人之間到櫃檯買。</p>') + '</div>';
    floatSheet(html, 'relics');
  }

  // ---- 來客畫面點老闆（店主 11-13：開局不再挑王牌，想換跟老闆說＝換流派）：這一趟第 1 位開打前（engine.canSwitchAce）＝小選單「聊聊／換一張王牌」；
  //   打過第 1 位之後照舊只說一句（輪流提醒「下一趟開門前再說」）
  //   第 A 波 5：兩位客人之間點老闆＝櫃檯「賣給老闆」（移出包包只走這裡）；第 1 位開打前的小選單多一顆「賣給老闆」
  function counterSell() { sfx('tick'); econCall('openCounterSell'); }
  //   活店（SPEC-H §5.4；viaOwner＝點的是老闆、不是櫃檯，而且活店開著）：打過第 1 位之後點老闆也開小選單「聊聊／賣給老闆」（換一張王牌那顆不畫）；
  //   「聊聊」＝C.ownerChat 一段（ownerChatBeat）。活店關著（?crowd=0、自動化瀏覽器）或點櫃檯＝照現行
  function ownerTalk(viaOwner) {
    var r = save.run; if (!r) return;
    var sellOk = E.canShop(r) && !!econ() && typeof econ().openCounterSell === 'function';
    var live = !!viaOwner && crowdChatOn();
    if (!E.canSwitchAce(r, C) && live) {
      sfx('tick');
      var hm = '<div class="hd"><h3>' + esc(TU('owner')) + '</h3><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
        '<button type="button" class="lb-btn big wide key lb-ownertalk" data-a="talk">' + esc(TU('aceTalk')) + '</button>' +
        (sellOk ? '<button type="button" class="lb-btn big wide key lb-ownersell" data-a="osell">' + esc(SHU('sellTab')) + '</button>' : '');
      var s2 = floatSheet(hm, 'owner');
      s2.addEventListener('click', function (e) {
        var b = e.target.closest && e.target.closest('[data-a=talk],[data-a=osell]'); if (!b) return;
        s2.remove(); syncFloat();
        if (b.getAttribute('data-a') === 'osell') counterSell(); else ownerChatBeat();
      });
      return;
    }
    if (!E.canSwitchAce(r, C)) {
      if (sellOk) { counterSell(); return; }
      UI.ownerN = (UI.ownerN | 0) + 1;
      stageSay('o', (UI.ownerN % 2 ? line('aceLater') : '') || line('ownerHint', 'night'), 'owner', 2600);
      return;
    }
    sfx('tick');
    if (!save.seen.aceSwap) { save.seen.aceSwap = true; persist(); }   // 自己來找老闆了：「想換王牌，點老闆。」的提示不用再出
    var T = TUT(); if (T && T.dismissSoft) try { T.dismissSoft(); } catch (_) {}
    var a = card(aceIdOf(r)) || {};
    // 解鎖制（店主 11-16）：沒東西可換（只解鎖一派；旗標開＝這派也只收到一張）→「換一張王牌」改成說明、按不下去
    var can = canSwapAny(r);
    var swapB = can ? '<button type="button" class="lb-btn pri big key col" data-a="swap">' + esc(TU('aceSwap')) + '<span class="sub">' + esc(TU('aceSwapSub')) + '</span></button>'
      : '<button type="button" class="lb-btn big col ow-none" disabled><span class="lb">' + lockIcon(12) + esc(UI.apex ? AU('noneMore') : TU('aceSwapNone')) + '</span>' +
        '<span class="sub">' + esc(UI.apex ? AU('lockCard') : TU('aceLocked')) + '</span></button>';
    var html = '<div class="hd"><h3>' + esc(TU('owner')) + '</h3><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
      '<p class="sub ow-now">' + esc(TU('aceNow', { title: (C.aceTitle || {})[r.ace] || '', album: a.album || '' })) + '</p>' +
      '<div class="two lb-ownermenu"><button type="button" class="lb-btn big key" data-a="talk">' + esc(TU('aceTalk')) + '</button>' + swapB + '</div>' +
      (sellOk ? '<button type="button" class="lb-btn big wide key lb-ownersell" data-a="osell">' + esc(SHU('sellTab')) + '</button>' : '');
    var s = floatSheet(html, 'owner');
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a=talk],[data-a=swap],[data-a=osell]'); if (!b) return;
      s.remove(); syncFloat();
      if (b.getAttribute('data-a') === 'osell') counterSell();
      else if (b.getAttribute('data-a') === 'talk') { if (live) ownerChatBeat(); else stageSay('o', line('ownerHint', 'night'), 'owner', 2600); }
      else if (UI.apex) apexSwapFlow(false);           // 頂點卡試做：三派 → 那派 15 張挑一張
      else aceSwapFlow();
    });
  }
  // 換一張王牌：現有的王牌三選一（標題＝老闆那句「想換一張？」、預設選中現在這張）；選同一張＝不換。換了：包包裡送的那幾張跟著換（engine.switchAce）、
  //   新王牌與那組送的記成擁有（src gift，跟 createRun 一樣）、下一趟沿用（save.lastAce）
  //   解鎖制（店主 11-16）：只能挑已解鎖的派（engine.aceChoices）；鎖住的上鎖、點不了
  function aceSwapFlow() {
    var r = save.run;
    if (!r || UI.going || !E.canSwitchAce(r, C)) return;
    UI.going = true;
    var from = r.ace;
    acePickPanel(null, { defaultTier: from, open: choicesOf(r).tiers, noTut: true }, { prompt: TU('aceAsk') }).then(function (tier) {
      UI.going = false;
      if (save.run !== r || UI.screen !== 'night') return;
      var res = tier && tier !== from ? E.switchAce(r, C, tier) : null;
      if (res && !res.ok && (res.error === 'locked' || res.error === 'notOwned')) { UI.keepP = true; UI.quietNight = true; go('night'); stageSay('o', line('aceLockedSay'), 'owner', 2600); return; }
      if (res && res.ok) {
        save.lastAce = tier;
        shelfAdd(C.aces[tier]); (C.gifts[tier] || []).forEach(function (id) { shelfOwn(id, 'gift'); });
        var got = runGot(r);
        res.effects.forEach(function (f) { var k = f.loseCard ? got.indexOf(f.loseCard) : -1; if (k >= 0) got.splice(k, 1); if (f.gainCard) gotCard(r, f.gainCard); });
        persist();
      }
      UI.keepP = true; UI.quietNight = true; go('night');
      stageSay('o', line(res && res.ok ? 'aceDone' : 'aceSame'), 'owner', 2600);
      if (res && res.ok) toast(TU('aceSwapped', { album: (card(C.aces[tier]) || {}).album || '' }));
    });
  }

  // ======================================================================= 店裡的東西點了會怎樣（牆上唱片＝唱片資訊、箱子＝翻、試聽機＝放一張、老闆／店貓＝一句）
  function boothIds() {
    var r = save.run, out = [], add = function (id) { var c = cardVis(id) ? card(id) : null; if (c && c.previewUrl && out.indexOf(id) < 0) out.push(id); };   // 旗標關：試做的 42 張不列（CONTRACT 第 8 節）
    if (r) { add(aceIdOf(r)); r.bag.forEach(add); }
    Object.keys(save.shelf).reverse().forEach(add);
    return out.slice(0, 24);
  }
  // 試聽機放一張（沒開聲音先開）
  function boothPlay(c) {
    var f = FX(); if (!c || !f || !f.music) return;
    if (!soundOn()) { try { if (f.init) f.init(); if (f.setSound) f.setSound(true); else f.unlockFromGesture(true); } catch (err) { console.error(err); } save.settings.sound = true; persist(); }
    try { f.music.play(c, { fadeMs: 900 }); } catch (err) { console.error(err); }
    stg('play', true);
  }
  // 試聽機上面那塊（SPEC-B §4.6）：今日推薦＋集點卡；媒體沒到＝名字卡、▶ 停用，dip:media 重畫
  function dailyHTML(stampAt, hint) {
    var d = UI.daily, D7 = C.daily || {}, c = d.id && card(d.id), T = C.tunes || {};
    var h = '<div class="lb-daily">' + (hint ? '<p class="dl-hint">' + esc(D7.hint) + '</p>' : '') + '<b class="dl-ttl">' + esc(D7.title) + '</b>';
    if (c) {
      var col = (T.colors || {})[c.tune];
      h += '<div class="dl-row">' + coverHTML(c, { badge: false }) + '<div class="dl-tx"><div class="ar">' + esc(c.artist) + '</div><div class="al">' + esc(c.album) + '</div>' +
        '<div class="dl-mt">' + starsHTML(c) + (col ? '<span class="dl-tn"><i style="--tn:' + esc(col) + '" aria-hidden="true"></i>' + esc((T.names || {})[c.tune] || '') + '</span>' : '') + '</div></div>' +
        '<div class="dl-act"><button type="button" class="dl-play" data-a="dplay" aria-label="播放試聽"' + (c.previewUrl ? '' : ' disabled') + '>▶</button>' +
        (d.took ? '<span class="dl-done">' + esc(D7.tomorrow) + '</span>' : '<button type="button" class="lb-btn pri dl-take" data-a="dtake">' + esc(D7.take) + '</button>') + '</div></div>';
    } else h += '<p class="dl-none">' + esc(D7.none) + '</p>';
    var n = d.stamps, k = Math.min(7, n), cells = '';
    for (var i = 0; i < 7; i++) cells += '<span class="dl-st' + (i < k ? ' on' : '') + (i === stampAt ? ' new' : '') + '">' + (i ? '' : '<small>' + esc(D7.firstStamp) + '</small>') + '</span>';
    return h + '<div class="dl-card"><span class="dl-n">' + esc(fill(D7.stamps, { n: k })) + (n > 7 ? '<small>+' + (n - 7) + '</small>' : '') + '</span>' +
      '<span class="dl-cells" aria-hidden="true">' + cells + '</span>' + (n >= 7 ? '<button type="button" class="lb-btn gold dl-claim" data-a="dclaim">' + esc(D7.claim) + '</button>' : '') + '</div></div>';
  }
  function openBooth() {
    dailyTick();
    var ids = boothIds(), dl = dailyOn() && UI.daily && UI.daily.day === todayKey(), hint = dl && !save.seen.dailyHint;
    if (!ids.length && !dl) { stageSay('o', line('boothEmpty') || '唱片櫃還空著。', 'owner', 2400); return; }
    var html = '<div class="hd"><h3>試聽機</h3><span class="np"></span><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' + (dl ? dailyHTML(-1, hint) : '') +
      (ids.length ? '<p class="sub">' + esc(line('booth') || '挑一張你唱片櫃裡的，放來聽聽。') + '</p><div class="lb-pick booth">' + ids.map(function (id) { return tileHTML(card(id), { text: false, stars: false, pick: '放這張' }); }).join('') + '</div>' : '');
    var s = floatSheet(html, 'booth tall');
    if (hint) { save.seen.dailyHint = true; persist(); }
    watchPlaying(qs('.np', s));
    if (UI.screen === 'night' || UI.screen === 'title') { crowdCall('yield', 'listen'); stgP('walk', 'p', ['listen'], 110).then(function () { UI.lastSpot = 'listen'; }); }
    var redraw = function (at) { var x = qs('.lb-daily', s); if (x && UI.daily) x.outerHTML = dailyHTML(at, hint); };
    if (dl) { var onMedia = function () { if (s.isConnected) redraw(-1); }; D.addEventListener('dip:media', onMedia); UI.offs.push(function () { D.removeEventListener('dip:media', onMedia); }); }
    s.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-a=dplay],[data-a=dtake],[data-a=dclaim]');
      if (a) {
        var k = a.getAttribute('data-a');
        if (k === 'dplay') { boothPlay(card(UI.daily && UI.daily.id)); return; }
        if (k === 'dclaim') { sfx('tick'); openDailyClaim(); return; }
        if (dailyTake()) { sfx('slam'); redraw(Math.min(7, UI.daily.stamps) - 1); toast((C.daily || {}).taken); dailyChipSync(); } else redraw(-1);
        return;
      }
      var b = e.target.closest && e.target.closest('[data-pick]'); if (!b) return;
      var c = card(b.getAttribute('data-pick')); if (!c) return;
      qsa('.lb-ct', s).forEach(function (x) { x.classList.toggle('sel', x === b.closest('.lb-ct')); });
      boothPlay(c);
    });
  }
  // 換獎勵三選一（engine.dailyReward）；關掉不挑＝格子不扣
  function openDailyClaim() {
    var d = dailyOn() && loadDaily(), D7 = C.daily || {};
    if (!d || d.stamps < 7) return openBooth();
    var s = floatSheet('<div class="hd"><h3>' + esc(D7.claimTitle) + '</h3><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
      '<div class="lb-trio dl-claim">' + dailyRewards(d).map(function (id) { return tileHTML(card(id), { pick: D7.take }); }).join('') + '</div>', 'dclaim');
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-pick]'); if (!b) return;
      var ok = dailyClaim(b.getAttribute('data-pick'));
      if (ok) { sfx('slam'); toast(D7.claimed, 'long'); dailyChipSync(); }
      openBooth();
    });
  }
  // 收音機轉頻率（v5 第六項第二期，店主 11-15）：兩位客人之間（canShop）、每輪一次；八格色點＋名字，抽不到的那格反灰；
  //   轉到就播那張的試聽（照 openBooth：沒開聲音先開）、放進這一輪的特價箱第一格（照原價，engine.bargainPriceIn）。交易走 doChoose({type:'radio', cell})
  function radioText(k, o) { var R = C.radio || {}; return fill(R[k] || '', o || {}); }
  function openRadio() {
    var r = save.run;
    if (!r || UI.screen !== 'night' || !E.canShop(r)) { toast(radioText('later')); return; }
    var T = C.tunes || {}, order = T.order || [];
    var s = floatSheet('<div class="hd"><h3>' + esc(radioText('title')) + '</h3><span class="np"></span><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div><div class="rd-body"></div>', 'radio');
    var body = qs('.rd-body', s);
    watchPlaying(qs('.np', s));
    var render = function (justGot) {
      var R = r.shop && r.shop.radio, used = !!R, rc = R ? card(R.id) : null;
      // 電台那張這一輪已經買走（不在特價箱）：不再叫人「去特價箱看看」、不寫「照原價」；在包包＝「已經收進包包了」，賣掉了＝「已經不在特價箱了」
      var stocked = !!(rc && ((r.shop && r.shop.bargain) || []).indexOf(R.id) >= 0), inBag = !!(rc && (r.bag || []).indexOf(R.id) >= 0);
      var cells = order.map(function (k) {
        var n = used ? 0 : (E.radioPool ? E.radioPool(r, C, k).length : 0), off = used ? (R.cell !== k) : !n, on = used && R.cell === k;
        return '<button type="button" class="rd-cell' + (on ? ' on' : '') + (off && !on ? ' off' : '') + '" data-cell="' + esc(k) + '"' + (used || !n ? ' disabled' : '') +
          ' aria-label="' + esc((T.names || {})[k] || k) + (off && !on && !used ? '：' + radioText('empty') : '') + '"><i style="--tn:' + esc((T.colors || {})[k] || '#ccc') + '" aria-hidden="true"></i><span>' + esc((T.names || {})[k] || k) + '</span></button>';
      }).join('');
      var got = rc ? '<div class="rd-got">' + tileHTML(rc, { text: false, stars: false, cls: 'rd-cv' }) +
          '<div class="rd-tx"><b>' + esc(justGot ? radioText('got', { album: rc.album }) : radioText('usedSub', { name: (T.names || {})[R.cell] || '', album: rc.album })) + '</b>' +
          '<span class="sub">' + esc(rc.artist) + '</span>' + (stocked ? '<button type="button" class="lb-btn pri" data-a="toBargain">' + esc(radioText('toBargain')) + '</button>' : '<span class="rd-gone">' + esc(radioText(inBag ? 'bagged' : 'gone')) + '</span>') + '</div></div>' : '';
      body.innerHTML = '<p class="sub">' + esc(used && !justGot ? radioText('used') : radioText('prompt')) + (rc && !stocked ? '' : '<small class="rd-price">' + esc(radioText('price')) + '</small>') + '</p>' +
        '<div class="lb-radio" role="group" aria-label="' + esc(T.label || '') + '">' + cells + '</div>' + got;
    };
    render(false);
    if (UI.screen === 'night') { crowdCall('yield', 'radio'); stgP('walk', 'p', ['radio'], 110).then(function () { UI.lastSpot = 'radio'; }); }
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-cell],[data-a=toBargain]'); if (!b || b.disabled) return;
      if (b.getAttribute('data-a') === 'toBargain') { s.remove(); syncFloat(); sfx('tick'); econCall('openBargain'); return; }
      var res = doChoose({ type: 'radio', cell: b.getAttribute('data-cell') });
      if (!res.ok) { toast(radioText(res.error === 'used' ? 'used' : res.error === 'empty' ? 'empty' : 'later')); render(false); return; }
      var c = card(r.shop.radio.id), f = FX();
      // 沒開聲音：先開（照 openBooth），轉台聲才聽得到
      if (c && f && f.music && !soundOn()) { try { if (f.init) f.init(); if (f.setSound) f.setSound(true); else f.unlockFromGesture(true); } catch (err) { console.error(err); } save.settings.sound = true; persist(); }
      sfx('tune');
      if (c && f && f.music) later(function () { try { f.music.play(c, { fadeMs: 900 }); } catch (err) { console.error(err); } stg('play', true); }, 420);   // 轉台聲先走完再放
      render(true);
    });
  }
  // 牆上手繪的封面（不在卡池裡）：卡池有同一張就開那張；沒有就開一張只有名字的唱片資訊（不給星）
  function paintedCard(id, label) {
    var m = /^(.*?)《(.*)》\s*$/.exec(String(label || '')), artist = m ? m[1].trim() : String(label || '').trim(), album = m ? m[2].trim() : '';
    var lo = function (x) { return String(x || '').toLowerCase().replace(/[^a-z0-9\u3040-\u9fff]/g, ''); };
    if (album) for (var k in C.cards) { if (!cardVis(k)) continue; var c = C.cards[k]; if (lo(c.album) === lo(album) && (!artist || lo(c.artist).indexOf(lo(artist)) >= 0 || lo(artist).indexOf(lo(c.artist)) >= 0)) return c; }
    return { id: 'painted:' + id, artist: artist, album: album || artist, painted: true, c: 0, o: 0, h: 0 };
  }
  // 經濟介面（econ.js，B3）：沒載到就在主控台說一聲、什麼都不開（不丟例外）
  function econCall(m, arg) {
    var X = econ();
    if (!X || typeof X[m] !== 'function') { console.warn('[ui] DipLabEcon.' + m + ' 不在'); return Promise.resolve(); }
    var T = TUT(); if (T && T.dismissSoft) try { T.dismissSoft(); } catch (_) {}     // 抽屜開了：來客的老闆小提示收掉，不蓋抽屜的標題、錢、✕（RT-11）
    UI.econBusy = true; fitFloor();                    // 來客接的木地板先收掉：抽屜的對焦照原本的舞台高（V5-play-4）
    var done = function () { UI.econBusy = false; };
    // 抽屜／櫃檯關掉才 resolve：重畫來客的錢與包包；你的人物留在箱子／櫃檯前（notes-B3 請求 4：不要走回 browse）
    return Promise.resolve().then(function () { return X[m](arg); }).then(function () { done(); if (UI.screen === 'night' && save.run) { UI.keepP = true; go('night'); } else floorSoon(); }, function (e) { done(); floorSoon(); console.error(e); });
  }
  function onStageAction(action, hot) {
    if (!action) return;
    var ci = CI(); if (ci && ci.isOpen()) return;
    if (UI.modal || UI.page || UI.going) return;
    var scr = UI.screen, m;
    if ((m = /^wall-record:(.+)$/.exec(action))) { info(m[1], { from: 'stage' }); return; }
    if ((m = /^wall-painted:(.+)$/.exec(action))) { info(paintedCard(m[1], hot && hot.label), { from: 'stage' }); return; }
    // 你家（聆聽室）：房間裡的熱點自己處理（走過去才開面板）；台北地圖的小房子＝回你家
    if (scr === 'home') { homeAction(action); return; }
    if (action === 'home' && scr === 'taipei') { goHome(UI.taipeiBack || 'title'); return; }
    if (action === 'now') { var f = FX(), c = f && f.music && f.music.current && f.music.current(); if (c) info(c, { from: 'stage' }); return; }
    // 活店（SPEC-H §5.1）：點熟客、路人＝聊天（talk:<熟客 id>｜talk:passer；跟著人走的熱點只在來客、標題回訪、攤位點得到）
    if (action === 'talk:enc') { sparTap(); return; }                  // 切磋：點對戰台上的熟客＝邀請面板（§7.3-4）
    if ((m = /^talk:(?!owner$)([a-z0-9]+)$/.exec(action))) { crowdCall('talk', m[1], hot); return; }
    if (action === 'talk:owner' || action === 'owner') crowdCall('chatClose');   // 點老闆＝收掉客人的泡泡（同時只有一個人在講）
    // 今天的攤位（第 C 波 SPEC-C §4.3-6）：箱子、收音機、櫃檯、對戰台＝「先逛完今天的攤位。」；試聽機照開今日推薦、門口照看客人、老闆照聊
    if (scr === 'night' && save.run && E.nextStep(save.run) === 'stall' && /^(?:(?:crate|bin):.+|radio|counter|duel)$/.test(action)) {
      if (W.DipLabStalls && W.DipLabStalls.busy && W.DipLabStalls.busy(action)) return;
      sfx('tick'); toast(WU('busy')); return;
    }
    // 對戰台（第 A 波 1）：來客畫面＝走過去開打（跟「下一位」一樣）；其他畫面不理
    if (action === 'duel') { if (scr === 'night' && save.run && E.nextStep(save.run) === 'fight' && !sparTap()) nextGuest(); return; }   // 切磋邀請中＝開邀請面板，不叫 nextGuest（§7.3-4）
    // 櫃檯：來客、兩位客人之間＝配件櫃（B3 的經濟介面）；其他畫面照舊老闆一句
    //   「拿去櫃檯賣給老闆」的提示剛出過（還沒打開過賣給老闆）：點櫃檯直接開「賣給老闆」分頁
    if (action === 'counter' && scr === 'night' && save.run && E.canShop(save.run) && econ() && econ().openRelicShop) { sfx('tick'); econCall('openRelicShop', UI.sellNudge === save.run ? { tab: 'sell' } : undefined); return; }
    // 來客畫面點老闆：第 1 位開打前＝「聊聊／換一張王牌」（店主 11-13）
    //   活店（SPEC-H §5.4）：點老闆＝一律開小選單（聊聊／賣給老闆；第 1 位開打前多換一張王牌）；點櫃檯照舊（ownerTalk 不帶參數＝現行）
    if ((action === 'talk:owner' || action === 'owner' || action === 'counter') && scr === 'night' && save.run) { if (E.nextStep(save.run) === 'stall') { stageSay('o', WU('stallHint'), 'owner', 2400); return; } ownerTalk(action !== 'counter'); return; }
    if (action === 'talk:owner' || action === 'counter' || action === 'owner') { stageSay('o', line('ownerHint', scr === 'scene' ? 'scene' : scr) || line('ownerHint', 'night'), 'owner', 2600); return; }
    if (action === 'cat') { var ct = line('cat'); if (ct) stageSay('o', ct, 'owner', 1600); return; }
    if ((m = /^shop:(.+)$/.exec(action))) { if (scr === 'taipei' && m[1] === 'dip') backFromTaipei(); return; }
    if (action === 'locked') { var lk = line('locked'); if (lk) toast(lk); return; }
    // 箱子（crate:<key>，§2.5.2）：序章／對決／領獎中＝老闆一句「打完再翻。」；來客與標題＝翻箱（特價區另一個面板）
    if ((m = /^(?:crate|bin):(.+)$/.exec(action))) {
      if (scr === 'duel' || scr === 'scene' || scr === 'reward') { stageSay('o', line('binBusy') || '打完再翻。', 'owner', 1600); return; }
      if (scr !== 'night' && scr !== 'title') return;
      var key = m[1], known = key === 'sale' || !!(C.bins && C.bins[key]);
      if (!known) { console.warn('[ui] 不認得的箱子', key); return; }
      sfx('tick');
      if (scr === 'night' && save.run && E.canBargainPick(save.run)) { bargainPickFlow((C.shopUi && C.shopUi.bargainPrompt) || '').then(function () { if (UI.screen === 'night') go('night'); }); return; }
      econCall(key === 'sale' ? 'openBargain' : 'openBin', key === 'sale' ? undefined : key);
      return;
    }
    if (scr === 'duel' || scr === 'scene' || scr === 'reward') return;      // 這些畫面只開唱片資訊與老闆那句
    if (action === 'listen' || action === 'booth') { sfx('tick'); openBooth(); return; }
    if (action === 'radio') { sfx('tick'); openRadio(); return; }
    if (/^poster/.test(action)) { sfx('tick'); openRules(); return; }
    if (action === 'door') {
      if (scr === 'title') { var cb = qs('[data-a=cont]', UI.panel) || qs('[data-a=push]', UI.panel); if (cb) cb.click(); return; }   // B-title-door-abandons-run：有存檔＝繼續試煉
      if (scr === 'night' && save.run) { sfx('tick'); guestSheet(save.run.idx); }
    }
  }

  // ======================================================================= end（這一趟結束：走到第幾位、最多連贏幾位、收了幾張；店主 11-12「走到第 23 位・最多連贏 12 位・收了 9 張」）
  // 一行：模板「收了 {n} 張」→ 左「收了」、右「9 張」；「走到第 {n} 位」→ 左「走到」、右「第 23 位」（「第」跟數字放一起）
  function sumRow(tpl, o, tag) {
    var k = String(tpl).split('{')[0].trim(), full = fill(tpl, o), k2 = k.replace(/第$/, '');
    return '<li><span class="k">' + esc(k2) + '</span><b>' + (tag ? '<span class="nr">' + esc(tag) + '</span>' : '') + esc(full.slice(full.indexOf(k2) + k2.length).trim()) + '</b></li>';
  }
  // 走到那一列：新紀錄（紅籤）或「差 N 位破紀錄」（金框小籤）
  function sumRowNear(tpl, o, tag, near) {
    var row = sumRow(tpl, o, tag);
    if (tag || !near) return row;
    return row.replace('<b>', '<b><span class="nr near" data-tut="to-break">' + esc(fill((C.summary || {}).toBreak, { n: near })) + '</span>');
  }
  var NEAR_FAR = 5;                                   // 差幾位以內才寫「差 N 位破紀錄」
  function nearMiss(r, sum) {
    var far = r.farBefore | 0; if (far <= 0 || r.newRecord) return 0;
    var n = far + 1 - (sum.reached | 0);
    return n >= 1 && n <= NEAR_FAR ? n : 0;
  }
  // 輸掉那場：他剩的聲望夠少（≤3 或 ≤ 四分之一）才寫「他只剩 X 聲望」；有翻盤那一手就接「第 n 手被硬剋冷翻盤」（被剋）／「第 n 手被他翻盤」（比星輸）
  function closeLine(r) {
    var L = r && r.lastLoss, S = C.summary || {}; if (!L || !S.closeHp) return '';
    var la = r.stats && r.stats.lostAt; if (la && L.at && la.enemyId !== L.at) return '';
    var parts = [];
    if (L.eHp >= 1 && L.eHp <= Math.max(3, Math.ceil((L.eMax || 12) / 4))) parts.push(fill(S.closeHp, { n: L.eHp }));
    var f = L.flip, Z = E.ZH || {};
    if (f) parts.push(f.kind === 'countered' && Z[f.e] && Z[f.p] ? fill(S.flipBy, { k: f.k, e: Z[f.e], p: Z[f.p] }) : fill(S.flipAt, { k: f.k }));
    return parts.join('，');
  }
  // 結算那面牆只排一排（審查 #12）：4 張以內全放；多的放最近收的 3 張＋「+N」（點了開唱片櫃）
  function wallHTML(got) {
    var show = got.length <= 4 ? got : got.slice(-3).reverse();
    var more = got.length - show.length;
    return '<div class="lb-wall">' + show.map(function (id) { return coverHTML(card(id), {}); }).join('') +
      (more > 0 ? '<button type="button" class="lb-more" data-a="shelf" aria-label="' + esc(fill((C.summary || {}).more || '', { n: more })) + '"><b>+' + more + '</b></button>' : '') + '</div>';
  }
  SCREENS.end = function () {
    var r = save.run;
    if (!r || !r.over) return go('title');
    recordRun(r);
    var S = C.summary || {}, sum = E.runSummary(r), la = r.stats.lostAt;
    setTop(posLabel(r), { links: rcLinks(), help: true, pause: true });
    var panel = UI.panel; panel.classList.add('end');
    cam('strip', 'end', 600);                               // ART-07：結算用小鏡頭，三件事不用捲
    stg('interact', 'none');
    resetPoses(); hideActor('f'); hideActor('q1'); hideActor('q2');
    place('o', 'counter', 'owner');
    place('p', 'duelP', 'player'); stg('pose', 'p', 'sit');
    var lostEn = la && C.enemies[la.enemyId];
    var got = runGot(r).filter(card);                    // 這一趟收進包包的那幾張
    var keep = keepHTML(r);                              // 一趟留一張（有候選或已經帶走：取代那面牆；矮螢幕也不用捲）
    var cps = sum.checkpoints.slice().sort(function (x, y) { return x - y; });
    // 這一趟有進過包包／客人掉的，但「我的收藏」裡都有了：說一聲為什麼沒有「帶走一張」。不另起一行——跟中繼點併成同一行（審查 #6：375×548 被底下那排鈕切掉）
    var allOwned = !keep && !!((r.entered || []).length || (r.drops || []).length);
    var cpLine = [sum.from > 1 ? WU('cpFrom', { n: sum.from }) : '', cps.length ? fill(S.checkpoints, { list: cps.join('、') }) : '', allOwned ? SU('keepNone') : ''].filter(Boolean);   // 第 C 波：中繼點開局那趟「這一趟從第 N 位開始」
    // 差一點摘要（第 A 波 4）：走到那一列「差 N 位破紀錄」（1–5 位）；輸給誰那行後面「他只剩 X 聲望，第 n 手被○剋○翻盤」（真的資訊，不造假）
    var near = nearMiss(r, sum), cl = closeLine(r);
    // 第 D 波（SPEC-D §2.8-4）：樂歷那一行＝標題同一列右邊「樂歷 +612 ›」＋細進度條（不多佔一行：375×548 原本就壓到剛好）；點了開明細。升級、抽盤放主鈕之後的過場卡
    var cg = careerOk() ? gainOf(r) : null;
    var cxBtn = cg ? '<button type="button" class="lb-cxp key" data-a="cxp"><span class="t">' + esc(CU('endLine', { n: cg.total })) + '</span>' + careerBar(careerLv()) + '</button>' : '';
    var h = '<div class="lb-scroll"><div class="lb-pad"><div class="lb-endhero"><div class="cx-hrow"><div class="lb-h1">' + esc(S.title || '') + '</div>' + cxBtn + '</div>' +
      (lostEn ? '<p class="sub">輸給「' + esc(lostEn.name) + '」' + (cl ? '：<span class="close" data-tut="close-loss">' + colorZh(cl) + '</span>' : '') + '</p>' : '') + '</div>' +
      '<ul class="lb-sum">' +
      sumRowNear(S.reached, { n: sum.reached }, r.newRecord ? S.newRecord : '', near) + sumRow(S.streak, { n: sum.bestStreak }) + sumRow(S.taken, { n: sum.taken }) + '</ul>' +
      (cpLine.length ? '<p class="sub lb-cps' + (allOwned ? ' lb-keepnone' : '') + '">' + cpLine.map(function (t, i) { return '<span class="' + (allOwned && i === cpLine.length - 1 ? 'kn' : 'cp') + '">' + esc(t) + '</span>'; }).join('<span class="dot" aria-hidden="true">・</span>') + '</p>' : '') +
      (keep || (got.length ? wallHTML(got) : '<p class="sub">' + esc(S.none || '') + '</p>'));
    // 唱片櫃／出門看看：併進底下固定那一列（「再挑戰一趟」上面），矮螢幕也不用捲（審查 #12）
    h += '</div></div><div class="foot lb-endbtns"><div class="row"><button type="button" class="lb-btn key" data-a="shelf">唱片櫃</button><button type="button" class="lb-btn key" data-a="taipei">' + esc(line('taipeiLink') || '出門看看（台北地圖・預告）') + '</button></div>' +
      '<button type="button" class="lb-btn pri big wide key" data-a="again">' + esc(S.again || '') + '</button></div>';
    var box = el('div', 'lb-screen end', h); panel.appendChild(box);
    sfx('lose');
    box.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b || UI.going) return;
      var act = b.getAttribute('data-a');
      if (act === 'again') {
        UI.going = true;
        var f = FX(); if (f && save.settings.sound && !f.soundOn()) try { f.unlockFromGesture(true); } catch (_) {}
        // 第 D 波（SPEC-D §2.8-4）：升級、抽到的盤、開了下一階 → 先一張一張過場卡；「去點天賦」＝開樂歷頁、留在結算（再按一次再挑戰）
        careerCards(UI.careerQ).then(function (v) {
          if (UI.screen !== 'end') { UI.going = false; return; }
          if (v === 'talent') { UI.going = false; openPage('career'); return; }
          stg('dim', 1); stg('pose', 'p', null);
          startAgain();
        });
      } else if (act === 'cxp') { sfx('tick'); careerGainSheet(r); }
      else if (act === 'shelf') openPage('shelf');
      else if (act === 'taipei') go('taipei', { back: 'end' });
      else if (act === 'keep') { sfx('tick'); keepSheet(r); }
    });
    if (UI.auto && UI.auto.until === 'end') UI.auto = null;
  };
  // ---- 一趟留一張（店主 11-13 §0；§1 裁定 6）：候選＝這一趟進過包包的（獎勵、買的、特價箱的；送的、種子不算）＋客人掉落（獎勵候選，沒拿的也算）；
  //   已經擁有的、頂點卡不列（engine.keepCandidates）。可以不拿。拿了＝擁有、src 'run'（店內取得：金框），一趟只能一次（engine.keepOne：run.kept）
  function keepIds(r) { return E.keepCandidates(r, C, save.shelf); }
  function keepHTML(r) {
    var kc = r.kept && card(r.kept);
    if (kc) return '<div class="lb-keep done">' + coverHTML(kc, { store: true }) + '<span class="tx"><b>' + esc(SU('keepTitle')) + '</b><small>' + esc(SU('keepDone', { album: kc.album })) + '</small></span></div>';
    var ids = keepIds(r);
    if (!ids.length) return '';
    var mini = ids.slice(-3).reverse().map(function (id) { return coverHTML(card(id), { info: false, badge: false }); }).join('');
    return '<button type="button" class="lb-keep key" data-a="keep"><span class="tx"><b>' + esc(SU('keepTitle')) + ' ▸</b><small>' + esc(SU('keepCount', { n: ids.length })) + '</small></span>' +
      '<span class="mini" aria-hidden="true">' + mini + '</span></button>';
  }
  function keepSheet(r) {
    var ids = keepIds(r);
    if (!ids.length || r.kept) return;
    var html = '<div class="hd"><h3>' + esc(SU('keepTitle')) + '</h3></div>' +
      '<p class="note">' + esc(SU('keepSub')) + '</p>' +
      '<div class="lb-rgrid lb-keeps">' + ids.map(function (id) {
        var drop = (r.entered || []).indexOf(id) < 0;
        return tileHTML(card(id), { pick: SU('keepPick'), extra: '<span class="src' + (drop ? ' drop' : '') + '">' + esc(SU(drop ? 'fromDrop' : 'fromBag')) + '</span>' });
      }).join('') + '</div>' +
      '<div class="foot"><button type="button" class="lb-btn wide" data-a="close">' + esc(SU('keepLater')) + '</button></div>';
    var s = sheet(html, 'keep');
    var done = false;
    s.addEventListener('click', function (e) {
      if (done) return;
      var pk = e.target.closest && e.target.closest('[data-pick]');
      if (pk) {
        var id = pk.getAttribute('data-pick'), res = E.keepOne(r, C, id, save.shelf);
        if (!res.ok) { console.warn('keepOne', res.error, id); return; }
        done = true; sfx('select');
        shelfOwn(id, 'run');
        if (save.runs.length) { var last = save.runs[save.runs.length - 1]; if (last && last.seedKey === r.seedKey && last.runNo === r.runNo) last.kept = id; }
        persist();
        closeSheet(s);
        toast(SU('keepDone', { album: card(id).album }), 'gold');
        rerenderKeep(r);
        return;
      }
      if (e.target.closest && e.target.closest('[data-a=close]')) { done = true; closeSheet(s); }
    });
  }
  // 帶走之後：結算那一塊換成金框的那張（不重畫整個結算，不重放聲音）
  function rerenderKeep(r) {
    var old = qs('.lb-screen.end .lb-keep', UI.panel); if (!old) return;
    var box = el('div', '', keepHTML(r)), nw = box.firstChild;
    if (nw) old.parentNode.replaceChild(nw, old);
  }

  // ======================================================================= 台北地圖預告（同一個渲染器換一份 JSON）
  SCREENS.taipei = function (p) {
    UI.taipeiBack = p.back || 'title';
    // 你家（v5 第六項第三期）：地圖上的小房子；點不準、讀屏的人用頂欄這顆（做同一件事）
    setTop('台北踢館地圖<small>預告・示意</small>', { links: [[line('homeBtn') || '你家', function () { if (!UI.backing) goHome(UI.taipeiBack || 'title'); }, 'home'], [line('backToShop') || '回店裡', backFromTaipei, 'back']] });
    var panel = UI.panel; panel.classList.add('taipei');
    panel.innerHTML = '<div class="lb-pad"><p class="lb-tp"><b>dip vinyl（本店）</b>：' + esc(line('taipeiHere') || '你在這。') + '</p>' +
      (line('taipeiNote') ? '<p class="sub">' + esc(line('taipeiNote')) + '</p>' : '') + '</div>';
    UI.going = true;
    stgP('load', 'taipei', { camera: 'full', screen: 'taipei' }).then(function () {
      if (UI.screen !== 'taipei') return;
      UI.going = false;
      stg('interact', 'taipei'); place('p', 'here', 'player');
    });
  };
  function backFromTaipei() {
    if (UI.backing) return;
    UI.backing = true; UI.going = true;
    var back = UI.taipeiBack || 'title';
    stgP('load', 'dip', { camera: 'full', screen: back === 'end' ? 'end' : 'title' }).then(function () {
      UI.backing = false;
      place('o', 'counter', 'owner');
      if (back === 'end' && save.run && save.run.over) go('end'); else go('title');
    });
  }

  // ======================================================================= 你家（聆聽室，v5 第六項第三期第一步；map-room.md §6、§7、§9）
  // 台北地圖的小房子 → 斜俯視的房間（shops/home.json，kind:room）：唱片架（唱片櫃裡擁有的，分頁面板每頁 12 張）、唱盤（點唱片試聽、放完接下一張收藏）、
  //   小控制台（推近成全螢幕一層，載主站 ../dip-tune.js 的頻率光譜星圖：收藏亮、其他暗；選到你的＝放上唱盤，不是你的＝加進想要清單 save.want，先只記）、門（回本店）。
  //   點家具＝先走過去再開面板（照翻箱）；頂欄下面三顆 DOM 鈕做同一件事（給點不準、讀屏的人）。不碰規則、經濟。
  var HOME_PAGE = 12;                                   // 唱片架分頁：每頁 12 張（六欄兩排）
  var TUNE_V = 74;                                      // ../dip-tune.js 的 ?v＝主站 index.html 那個號（主站改 dip-tune 時這裡跟著加）
  var TUNE_WAIT = 15000;                                // 等 dip-tune.js 最多 15 秒（慢的手機網路 65 KB 壓縮後約 2 秒）：等不到就吐司、收回
  // 擁有的唱片，照唱片櫃頁的排法：店內取得 → 藏家王牌 → 老闆送的（同一類最近收的在前）
  function homeOwnedIds() {
    var ORD = { run: 0, boss: 1, start: 1, daily: 2, lexp: 2, gift: 3 };
    return Object.keys(save.shelf).filter(card).reverse().filter(isOwned).sort(function (a, b) { return (ORD[save.shelf[a].src] | 0) - (ORD[save.shelf[b].src] | 0); });
  }
  function homePlayable() { return homeOwnedIds().filter(function (id) { return !!(card(id) || {}).previewUrl; }); }
  function homeLayout() {
    var SG = W.DipLabStage;
    var p = SG && SG.loadLayout ? SG.loadLayout('home') : Promise.reject(new Error('DipLabStage 不在'));
    return p.then(function (L) {
      var own = homeOwnedIds();
      (L.props || []).forEach(function (o) { if (o.type === 'ledge' && o.fill === 'owned') { var n = (o.n || 7) * Math.max(1, o.rows || 1); o.cards = own.slice(0, n); while (o.cards.length < n) o.cards.push(null); } });
      return L;
    });
  }
  function soundUp() {
    var f = FX(); if (!f || soundOn()) return;
    try { if (f.init) f.init(); if (f.setSound) f.setSound(true); else f.unlockFromGesture(true); } catch (err) { console.error(err); }
    save.settings.sound = true; persist();
  }
  // 唱盤上那張：正在出聲的那張（放完接下一張也跟著換）；沒在出聲＝你最後放上去的那張（還在抓試聽：照轉；抓不到或停了：抬著針），
  //   都沒有才看「唱盤上那張」（靜音時 music 只換那張）。不能直接看 music.current()：剛按「放唱盤」時它還是上一首（抓檔中）
  //   「你最後放上去的那張」只記你擁有的（裁定：不是你的只進想要清單，不上唱盤）；控制台開著時不動（店景凍住、面板蓋著，星圖試聽的那張不是你放上唱盤的）
  function deckRec(id, state) { var c = card(id); return c ? { rec: { card: id, attr: E.topAttr(c), kind: c.tier ? 'ace' : null }, state: state } : null; }
  function homeSyncDeck() {
    if (UI.screen !== 'home' || !UI.stage || UI.going || UI.tune) return;
    var f = FX(), c = f && f.music && f.music.current && f.music.current(), on = !!(c && card(c.id) && f.music.playing()), d = null;
    var pend = !!(UI.homeDeckId && card(UI.homeDeckId) && UI.homeDeckAt && now() - UI.homeDeckAt < 4000 && !(on && c.id === UI.homeDeckId));   // 剛放上去、還在抓試聽：先顯示它（上一首還在響也一樣）
    if (pend) d = deckRec(UI.homeDeckId, 'spin');
    else if (on) { if (isOwned(c.id)) UI.homeDeckId = c.id; d = deckRec(c.id, 'spin'); }
    else if (UI.homeDeckId && isOwned(UI.homeDeckId)) d = deckRec(UI.homeDeckId, 'armMid');
    else if (c && isOwned(c.id)) d = deckRec(c.id, 'armMid');
    stg('deck', d);
    // 面板上「唱盤上」那一行（小封面＋專輯＋藝人；點封面＝唱片資訊）；唱盤空著：有能放的才寫「點唱盤挑一張」，沒有就不出這一行（點了只會吐司「沒東西放」）
    var np = qs('.lb-homenp', UI.panel), id = d && d.rec.card, idle = !d && homePlayable().length > 0, key = (id || '') + '|' + (d ? d.state : idle ? 'idle' : '');
    if (np && np._k !== key) {
      np._k = key;
      var cc = id && card(id);
      np.innerHTML = cc ? coverHTML(cc, { size: 40, badge: false }) + '<div class="tx"><span class="k">' + esc(line('homeNow')) + (d.state === 'spin' ? '<span class="rec" aria-hidden="true"></span>' : '') + '</span><b>' + esc(cc.album) + '</b><span class="ar">' + esc(cc.artist) + '</span></div>'
        : idle ? '<p class="sub">' + esc(line('homeIdle')) + '</p>' : '';
    }
  }
  function homePut(id, o) {
    o = o || {};
    var c = card(id), f = FX(); if (!c) return;
    soundUp();
    UI.homeDeckId = id; UI.homeDeckAt = now();
    stg('deck', deckRec(id, 'spin'));
    if (f && f.music) { try { f.music.play(c, { fadeMs: 900 }); } catch (err) { console.error(err); } }
    if (!o.quiet) toast(fill(line('homeOnDeck'), { album: c.album }));
  }
  function goHome(back) {
    if (UI.going || UI.backing) return;
    sfx('tick');
    go('home', { back: back || 'title' });
  }
  SCREENS.home = function (p) {
    UI.homeBack = p.back || UI.homeBack || 'title';
    UI.homeTok = (UI.homeTok | 0) + 1;
    setTop(esc(line('homeTitle') || '你家') + '<small>' + esc(line('homeSub') || '聆聽室') + '</small>',
      { links: [['台北', function () { go('taipei', { back: UI.homeBack }); }, 'taipei'], [line('backToShop') || '回店裡', backFromHome, 'back']] });
    var panel = UI.panel; panel.classList.add('home');
    var own = homeOwnedIds();
    panel.innerHTML = '<div class="lb-pad"><p class="lb-tp">' + esc(own.length ? line('homeNote') : line('homeEmpty')) + '</p>' +
      '<div class="lb-homebtns" role="group" aria-label="' + esc(line('homeSub') || '聆聽室') + '">' +
      [['shelf', line('homeShelf')], ['deck', line('homeDeck')], ['console', line('homeConsole')]].map(function (b) { return '<button type="button" class="lb-btn key" data-a="' + b[0] + '">' + esc(b[1]) + '</button>'; }).join('') +
      '</div><div class="lb-homenp" aria-live="polite"></div>' +
      (own.length ? '<p class="sub">' + esc(SU('shelfOwn', { n: own.length })) + (save.want.length ? '・' + esc(fill(line('homeWantN'), { n: save.want.length })) : '') + '</p>' : '') + '</div>';
    qs('.lb-pad', panel).addEventListener('click', function (e) {   // 掛在這個畫面自己的元素上（#panel 每個畫面共用，掛在它上面會一次一次疊）
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b || UI.screen !== 'home') return;
      var a = b.getAttribute('data-a');
      homeAction(a === 'shelf' ? 'shelf:own' : a === 'deck' ? 'deck:play' : a === 'console' ? 'tune' : '');
    });
    UI.going = true;
    var tok = UI.homeTok, f = FX();
    homeLayout().then(function (L) { return stgP('load', L, { camera: 'full', screen: 'home' }); }).then(function () {
      if (UI.screen !== 'home' || UI.homeTok !== tok) return;
      UI.going = false;
      stg('interact', 'home');
      place('p', 'door', 'player');
      homeSyncDeck();
      stgP('walk', 'p', ['in'], 120);
    });
    if (f && f.music && f.music.onChange) { UI.offs.push(f.music.onChange(homeSyncDeck)); if (f.onSound) UI.offs.push(f.onSound(homeSyncDeck)); }
    var iv = setInterval(homeSyncDeck, 1500); UI.offs.push(function () { clearInterval(iv); });
  };
  // 房間的熱點與 DOM 鈕：先走到家具前（照翻箱「走過去才開」），走到了、這中間沒有又點別的，才開面板
  function homeAction(action) {
    if (UI.screen !== 'home' || UI.going || UI.tune || UI.modal || UI.page) return;
    var to = { 'shelf:own': 'atShelf', 'deck:play': 'atDeck', tune: 'atConsole', 'shop:dip': 'door' }[action];
    if (!to) return;
    sfx('tick');
    qsa('.lb-sheet.float', app()).forEach(function (s) { s.remove(); }); syncFloat();
    var tok = UI.homeTok = (UI.homeTok | 0) + 1;
    // 第一次開控制台要下載四樣（dip-tune 0.2 MB、three 0.6 MB、座標 0.6 MB、面板圖 0.7 MB）：一點控制台就先抓程式（走過去的路上）；不在進房間時就抓：只來聽唱片的人不用多下載
    if (action === 'tune') tunePrefetch();
    stgP('walk', 'p', [to], 130).then(function () {
      if (UI.screen !== 'home' || UI.homeTok !== tok || UI.tune) return;
      if (action === 'shelf:own') openHomeShelf(0);
      else if (action === 'deck:play') openHomeDeck();
      else if (action === 'tune') openTuneConsole();
      else if (action === 'shop:dip') backFromHome();
    });
  }
  function backFromHome() {
    if (UI.backing) return;
    if (UI.tune) closeTuneConsole(true);
    UI.backing = true; UI.going = true;
    var back = UI.homeBack || 'title';
    stg('door', 'swing', { quiet: true });
    stgP('load', 'dip', { camera: 'full', screen: back === 'end' ? 'end' : 'title' }).then(function () {
      UI.backing = false;
      place('o', 'counter', 'owner');
      if (back === 'end' && save.run && save.run.over) go('end'); else go('title');
    });
  }
  // 唱片架（分頁）：六欄兩排一頁 12 張；點封面＝唱片資訊，「放唱盤」＝放上唱盤試聽
  function openHomeShelf(pg) {
    var own = homeOwnedIds(), pages = Math.max(1, Math.ceil(own.length / HOME_PAGE));
    pg = Math.max(0, Math.min(pages - 1, pg | 0));
    var ids = own.slice(pg * HOME_PAGE, (pg + 1) * HOME_PAGE), f = FX(), cur = f && f.music && f.music.current && f.music.current();
    var html = '<div class="hd"><h3>' + esc(line('homeShelf')) + '</h3><span class="sub">' + esc(SU('shelfOwn', { n: own.length })) + '</span><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
      (own.length ? '<p class="sub">' + esc(line('homeShelfSub')) + '</p>' +
        '<div class="lb-pick hshelf">' + ids.map(function (id) { var c = card(id); return tileHTML(c, { text: false, stars: false, store: isStore(id), pick: line('homePut') || '放唱盤', disabled: !c.previewUrl, sel: !!(cur && cur.id === id) }); }).join('') + '</div>' +
        (pages > 1 ? '<div class="lb-pager"><button type="button" class="lb-btn" data-pg="' + (pg - 1) + '"' + (pg ? '' : ' disabled') + ' aria-label="上一頁">‹</button><span class="pn" aria-live="polite">' + (pg + 1) + '／' + pages + '</span>' +
          '<button type="button" class="lb-btn" data-pg="' + (pg + 1) + '"' + (pg < pages - 1 ? '' : ' disabled') + ' aria-label="下一頁">›</button></div>' : '') +
        (save.want.length ? '<p class="sub sm">' + esc(fill(line('homeWantN'), { n: save.want.length })) + '</p>' : '')
        : '<p class="sub">' + esc(line('homeEmpty')) + '</p>');
    var s = floatSheet(html, 'hshelf tall');
    s.setAttribute('data-page', String(pg));
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-pg],[data-pick]'); if (!b || b.disabled) return;
      if (b.hasAttribute('data-pg')) { sfx('tick'); openHomeShelf(+b.getAttribute('data-pg')); return; }
      var id = b.getAttribute('data-pick');
      qsa('.lb-ct', s).forEach(function (x) { x.classList.toggle('sel', x === b.closest('.lb-ct')); });
      homePut(id);
    });
  }
  // 唱盤（照試聽機 openBooth）：擁有、有試聽的；選了就放上唱盤（店景的唱盤 NOW 小窗換那張、轉起來）
  function openHomeDeck() {
    var ids = homePlayable();
    if (!ids.length) { toast(line('homeDeckEmpty')); return; }
    var f = FX(), cur = f && f.music && f.music.current && f.music.current();
    var html = '<div class="hd"><h3>' + esc(line('homeDeck')) + '</h3><span class="np"></span><button type="button" class="lb-btn hdb" data-a="stop">' + esc(line('homeStop') || '停') + '</button><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
      '<p class="sub">' + esc(line('homeDeckSub')) + '</p><div class="lb-pick booth">' + ids.map(function (id) { return tileHTML(card(id), { text: false, stars: false, pick: '放這張', sel: !!(cur && cur.id === id) }); }).join('') + '</div>';
    var s = floatSheet(html, 'booth hdeck tall');
    watchPlaying(qs('.np', s));
    s.addEventListener('click', function (e) {
      var st = e.target.closest && e.target.closest('[data-a=stop]');
      if (st) { var f2 = FX(); UI.homeDeckId = null; UI.homeDeckAt = 0; if (f2 && f2.music) f2.music.stop({ fadeMs: 600 }); stg('deck', null); qsa('.lb-ct', s).forEach(function (x) { x.classList.remove('sel'); }); return; }
      var b = e.target.closest && e.target.closest('[data-pick]'); if (!b) return;
      qsa('.lb-ct', s).forEach(function (x) { x.classList.toggle('sel', x === b.closest('.lb-ct')); });
      homePut(b.getAttribute('data-pick'), { quiet: true });
    });
  }

  // ---- 小控制台：推近成頻率光譜的星圖（主站 ../dip-tune.js，同一份；不搬進 game-lab、不複製）
  // ms：等多久就當失敗（請求卡住不回時不要永遠等；逾時後那支程式若晚到，下次 tuneLib 直接用）
  function loadScript(src, ms) {
    return new Promise(function (res, rej) {
      var sc = D.createElement('script'), tm = ms ? setTimeout(function () { rej(new Error('載入逾時 ' + src)); }, ms) : 0;
      sc.src = src; sc.async = true;
      sc.onload = function () { clearTimeout(tm); res(); };
      sc.onerror = function () { clearTimeout(tm); sc.remove(); rej(new Error('載入失敗 ' + src)); };
      D.head.appendChild(sc);
    });
  }
  function threeReady() {
    if (W.THREE && W.THREE.OrbitControls) return Promise.resolve();
    if (!UI.threeP) UI.threeP = (W.THREE ? Promise.resolve() : loadScript('../vendor/three-r128.min.js')).then(function () { if (!W.THREE.OrbitControls) return loadScript('../vendor/three-r128-OrbitControls.js'); })
      .catch(function (e) { UI.threeP = null; console.warn('[home]', e); });
    return UI.threeP;
  }
  function tuneLib() {
    if (W.DipTune) return Promise.resolve(W.DipTune);
    if (!UI.tuneLibP) UI.tuneLibP = loadScript('../dip-tune.js?v=' + TUNE_V, TUNE_WAIT).then(function () { if (!W.DipTune) throw new Error('DipTune 沒載到'); return W.DipTune; }, function (e) { UI.tuneLibP = null; throw e; });
    return UI.tuneLibP;
  }
  // 點了控制台、人還在走過去：先抓 dip-tune.js 與 three（座標檔與面板圖等 DipTune.start() 建星圖時才抓，跟 three 一起等）
  function tunePrefetch() {
    try { threeReady(); tuneLib().catch(function () {}); } catch (_) {}
  }
  function catalogId(c) { return ((c.artist || '') + '|' + (c.album || '')).toLowerCase().replace(/\//g, '-').trim(); }   // ＝主站 cardIdOf
  // 星圖那張 → 遊戲的卡（id 就是 catalogId）
  function tuneCardOf(o) { return o ? (card(o._gid) || card(catalogId(o))) : null; }
  function coverAbs(c) { var u = coverSrc(c); if (!u) return ''; try { return new URL(u, location.href).href; } catch (_) { return u; } }
  // 播放器轉接（dip-tune 的 cfg.player）：playAlbum → fx.js music.play；不掛主站 DipPlayer（遊戲規則：絕不 DipPlayer.mount，fx.js 也不借它的 AudioContext）
  //   onStateChange 回報 {status:'loading'|'playing'|'stopped'|'error', artist, album}：一首自然放完（music.onEnded）＝stopped，收藏電台靠它換下一張
  function tunePlayer() {
    var subs = [], st = null, tok = 0, f = FX();
    var emit = function (x) { st = x; subs.slice().forEach(function (cb) { try { cb(x); } catch (e) { console.error(e); } }); };
    if (f && f.music && f.music.onEnded) f.music.onEnded(function (c) { if (UI.tune && st && st.status === 'playing' && c && st.id === c.id) emit({ status: 'stopped', code: '', artist: st.artist, album: st.album, id: c.id }); });
    return {
      playAlbum: function (o) {
        if (!UI.tune) return Promise.resolve(false);   // 控制台已經收掉（例如建星圖途中按 ↩）：星圖晚到的試聽不准出聲、不開聲音、不上唱盤
        var c = tuneCardOf(o), my = ++tok, fx = FX();
        if (!c || !c.previewUrl || !fx || !fx.music) { emit({ status: 'error', code: 'NO-PREVIEW', artist: o && o.artist, album: o && o.album }); return Promise.resolve(false); }
        if (!soundOn()) { soundUp(); }
        emit({ status: 'loading', artist: c.artist, album: c.album, id: c.id });
        return Promise.resolve(fx.music.play(c, { fadeMs: 600, exclusive: true })).then(function (ok) {
          if (my === tok) emit(ok ? { status: 'playing', artist: c.artist, album: c.album, id: c.id } : { status: 'error', code: '', artist: c.artist, album: c.album, id: c.id });
          return ok;
        });
      },
      stop: function () { tok++; var fx = FX(); if (fx && fx.music) fx.music.stop({ fadeMs: 400 }); if (st && st.status !== 'stopped') emit({ status: 'stopped', code: '', artist: st.artist, album: st.album, id: st.id }); },
      audioContext: function () { var fx = FX(); return fx && fx.audioContext ? fx.audioContext() : null; },
      onStateChange: function (cb) { subs.push(cb); if (st) { try { cb(st); } catch (_) {} } return function () { subs = subs.filter(function (x) { return x !== cb; }); }; },
      debugState: function () { return { code: (st && st.code) || '' }; }
    };
  }
  function tuneConfigure(DT) {
    if (UI.tuneCfg) return;
    UI.tuneCfg = true;
    // 封面／試聽讀活的卡（媒體晚到也補上；SPEC-B B7）；dip-tune 會寫回 coverUrl → setter 存 _cv／_pv
    var pool = { cards: poolIds().map(function (id) { var c = C.cards[id];
      var o = { artist: c.artist, album: c.album, classic: c.c, obscurity: c.o, accessibility: c.h, tier: c.tier || undefined, year: c.year || 0, genres: (c.genres || []).slice(), _gid: id, _cv: '', _pv: '' };
      Object.defineProperty(o, 'coverUrl', { enumerable: true, configurable: true, get: function () { return this._cv || coverAbs(card(this._gid)); }, set: function (v) { this._cv = v || ''; } });
      Object.defineProperty(o, 'previewUrl', { enumerable: true, configurable: true, get: function () { return this._pv || (card(this._gid) || {}).previewUrl || ''; }, set: function (v) { this._pv = v || ''; } });
      return o; }), apex: {} };
    DT.configure({
      host: function () { return UI.tuneHost; },
      threeReady: threeReady,
      loadCardPool: function () { return Promise.resolve(pool); },
      cardIdOf: function (a, b) { return catalogId({ artist: a, album: b }); },
      player: tunePlayer(),
      resolveCover: function (c) { return Promise.resolve(coverAbs(card(c && c._gid)) || (c && c.coverUrl) || ''); },
      listCover: function (c) { return Promise.resolve(coverAbs(card(c && c._gid)) || (c && c.coverUrl) || ''); },
      audioPref: function () { return save.settings.sound !== false; },
      setAudioPref: function (on) { var f = FX(); if (on) soundUp(); else if (f && f.setSound) { try { f.setSound(false); } catch (_) {} save.settings.sound = false; persist(); } },
      onFirstGesture: function (on) { if (on) soundUp(); },
      onGesture: function (on) { if (on) soundUp(); },
      onBack: function () { closeTuneConsole(); },
      onResult: function (r) { tuneResult(r); }
    });
  }
  // 收藏亮、其他暗：唱片櫃擁有的推進星圖（setMine；鍵＝主站 cardIdOf）。0 張＝不開（整片星空照常亮，挑到的都加進想要清單）
  function tuneMine(DT) {
    if (typeof DT.setMine !== 'function') return;
    var own = homeOwnedIds();
    try {
      if (own.length) DT.setMine(new Map(own.map(function (id) { return [id, 1]; })), { on: true });
      else { DT.setMine(null); DT.setMine(new Map()); }
    } catch (e) { console.error(e); }
  }
  function tuneResult(r) {
    var c = tuneCardOf(r && r.card);
    if (!c) return;
    UI.tuneLast = c.id;
    if (isOwned(c.id)) {   // 是你的：收掉星圖、回房間，放上唱盤（星圖上正在試聽的就是這張＝不重播，接著放）
      closeTuneConsole().then(function () { homePut(c.id); });
      return;
    }
    var had = save.want.indexOf(c.id) >= 0;
    if (!had) { save.want.push(c.id); if (save.want.length > 200) save.want.shift(); if (save.run) save.run.want = save.want.slice(-200); persist(); }
    toast(fill(line(had ? 'homeWantAgain' : 'homeWant'), { album: c.album }), 'keep');
    // 留在星圖上：當成「從結果頁回到星圖」（同一張不重播）
    var DT = W.DipTune; if (DT && UI.tune) setTimeout(function () { if (UI.tune) tuneStart(DT); }, 60);
  }
  // DipTune.start()：第一次會建星圖（抓座標檔、等 three，慢的網路要好幾秒）。建的途中收掉又重開：等那一次跑完再 start（不然同一組 DOM 建兩次＝兩條星圖迴圈、輪子與搜尋的監聽兩份）；
  //   跑完時控制台已經收掉：再 stop 一次（建完它會挑最近那張、0.7 秒後試聽；收掉那時 stop 過了，但那時還沒挑）
  function tuneStart(DT) {
    var p = UI.tuneStartP = Promise.resolve(UI.tuneStartP).then(function () {
      if (!UI.tune) return;
      var r = DT.start();
      tuneBackBtn(UI.tuneHost, true);   // build() 一開頭就把面板畫好了（還在等資料）：返回鍵先改名、給焦點
      return r;
    }).catch(function (e) { console.error(e); }).then(function () {
      if (!UI.tune) try { DT.stop(); } catch (e) { console.error(e); }
      if (UI.tuneStartP === p) UI.tuneStartP = null;
    });
    return p;
  }
  // 星圖的返回鍵是主站那顆（讀屏與滑鼠提示寫主站頁名「回找一張來聽」）：遊戲裡改叫「回房間」、看得到字（樣式在 style.css 的 #labTune .tune-back）
  function tuneBackBtn(host, focus) {
    var bk = host && qs('#tuneBack', host); if (!bk) return;
    var t = line('homeTuneBack') || '回房間';
    if (bk.getAttribute('data-lb') !== '1') { bk.setAttribute('data-lb', '1'); bk.setAttribute('aria-label', t); bk.title = t; bk.innerHTML = '<span aria-hidden="true">↩</span>' + esc(t); }
    var a = D.activeElement;
    if (focus && !(a && a !== D.body && a !== bk && host.contains(a))) try { bk.focus({ preventScroll: true }); } catch (_) {}   // 已經在星圖裡點了別的（例如搜尋框）就不搶
  }
  function tuneKey(e) { if (e.key === 'Escape' && UI.tune && !(CI() && CI().isOpen())) { e.preventDefault(); closeTuneConsole(); } }
  // 推近：舞台以控制台為中心放大＋淡出（減少動態＝150 ms 淡入淡出），接著蓋上全螢幕一層、DipTune.start()；店景迴圈停掉（被蓋住了不用畫）
  function openTuneConsole() {
    if (UI.tune || UI.screen !== 'home') return;
    var host = UI.tuneHost;
    if (!host) {
      host = UI.tuneHost = el('div', 'lb-tune'); host.id = 'labTune'; host.setAttribute('role', 'dialog'); host.setAttribute('aria-label', line('homeConsole') || '控制台'); host.hidden = true; app().appendChild(host);
      host.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('[data-a=tuneBack]'); if (b) closeTuneConsole(); });
    } else if (!host.isConnected) app().appendChild(host);
    // 星圖還沒畫（第一次開、dip-tune.js 還在路上）：先放遊戲自己的「載入中」＋「回房間」，不然是一整片空的黑幕、觸控出不去；dip-tune 的 build() 會整個換掉
    if (!qs('#tuneApp', host)) host.innerHTML = '<div class="lb-tune-wait"><p role="status">' + esc(line('homeTuneLoading')) + '</p><button type="button" class="lb-btn" data-a="tuneBack">' + esc(line('homeTuneBack')) + '</button></div>';
    var tok = UI.homeTok, t0 = now(), sh = UI.stageHost, r = stg('hotRect', 'console'), hb = sh.getBoundingClientRect();
    UI.tune = { at: t0, tok: tok, focus: D.activeElement };
    D.body.classList.add('lb-tune-open');
    D.addEventListener('keydown', tuneKey, true);
    var reduced = rm();
    if (r && r.width) sh.style.transformOrigin = Math.round(r.left + r.width / 2 - hb.left) + 'px ' + Math.round(r.top + r.height / 2 - hb.top) + 'px';
    sh.classList.add(reduced ? 'lb-zoom-fade' : 'lb-zoom-in');
    var zoomed = new Promise(function (res) { setTimeout(res, reduced ? 150 : 380); });
    var lib = tuneLib();
    lib.catch(function () {});   // 載入失敗在推近那 0.38 秒內就回來（預抓已經失敗、這裡重抓）：先接住，不然算沒人處理的錯誤；真的處理在下面
    // 新卡媒體還沒到：現在抓、一起等（同一個 15 秒；逾時照開，星圖讀活的卡）
    var media = Promise.race([mediaTry(), new Promise(function (res) { setTimeout(res, TUNE_WAIT); })]);   // 這一次抓到或失敗就開，最多等 15 秒
    return zoomed.then(function () {
      if (!UI.tune || UI.tune.at !== t0) return;
      sh.classList.remove('lb-zoom-in', 'lb-zoom-fade'); sh.classList.add('lb-zoomed');   // 放大完：藏起來（不留著 2.6 倍的變形，#app 量起來才不會多出一截）
      stg('freeze', true);
      host.hidden = false; host.classList.add('in');
      var wb = qs('.lb-tune-wait [data-a=tuneBack]', host); if (wb) try { wb.focus({ preventScroll: true }); } catch (_) {}
      return lib.then(function (DT) { return media.then(function () { return DT; }); }).then(function (DT) {
        if (!UI.tune || UI.tune.at !== t0) return;
        tuneConfigure(DT);
        return tuneStart(DT).then(function () {
          if (!UI.tune || UI.tune.at !== t0) return;
          tuneMine(DT);
          tuneBackBtn(host, true);
        });
      }, function (e) { if (!UI.tune || UI.tune.at !== t0) return; console.error(e); toast(line('homeTuneFail')); closeTuneConsole(); });   // 已經收掉（按了回房間）就不吐司、不記
    });
  }
  // 收掉：DipTune.stop()（停試聽、音效、iOS 內建瀏覽器的鎖）、藏起那一層（不移除：dip-tune 記著裡面的元素，下次開直接重用）、解凍店景、反向縮回
  function closeTuneConsole(instant) {
    if (!UI.tune) return Promise.resolve();
    var t = UI.tune; UI.tune = null;
    D.removeEventListener('keydown', tuneKey, true);
    D.body.classList.remove('lb-tune-open');
    try { if (W.DipTune) W.DipTune.stop(); } catch (e) { console.error(e); }
    var host = UI.tuneHost; if (host) { host.hidden = true; host.classList.remove('in'); }
    stg('freeze', false);
    var sh = UI.stageHost;
    sh.classList.remove('lb-zoom-in', 'lb-zoom-fade', 'lb-zoomed');
    if (t.focus && t.focus.isConnected && t.focus !== D.body) try { t.focus.focus({ preventScroll: true }); } catch (_) {}   // 焦點回到開控制台之前的那顆鈕（讀屏、鍵盤）
    if (instant || rm()) { sh.style.transformOrigin = ''; homeSyncDeck(); return Promise.resolve(); }
    sh.classList.add('lb-zoom-out');
    return new Promise(function (res) { setTimeout(function () { sh.classList.remove('lb-zoom-out'); sh.style.transformOrigin = ''; homeSyncDeck(); res(); }, 320); });
  }

  // ======================================================================= 唱片櫃（整頁蓋在舞台上；舞台不重掛）
  function openPage(kind, p) {
    p = p || {};
    closePage(true);
    var pg = el('div', 'lb-page ' + kind);
    pg.setAttribute('role', 'dialog');
    app().appendChild(pg);
    UI.page = { el: pg, kind: kind };
    bindInfoTaps(pg);
    var held = duelHold(true); UI.page.held = held;
    if (kind === 'career' && careerOk()) renderCareer(pg); else renderShelf(pg, p.filter || 'all');   // 第 D 波：樂歷頁同一個殼
  }
  function closePage(swap) {                         // swap：openPage 換頁時先關舊的（不重畫底下的畫面）
    var pg = UI.page; if (!pg) return;
    UI.page = null;
    if (pg.kind === 'shelf') { Object.keys(save.shelf).forEach(function (id) { save.shelf[id].seen = true; }); persist(); }
    pg.el.remove();
    if (pg.held) duelHold(false);
    // 樂歷頁關掉：標題的第二行（Lv、下一個、小圓點）、第一行「樂歷關」照現在的重畫
    if (swap !== true && pg.kind === 'career' && UI.screen === 'title' && !UI.going && !UI.intro) { UI.camQuick = true; go('title'); }
  }
  // 從唱片櫃挑牌開局（§1 裁定 11）：上面「我的收藏 n 張」（擁有，可以帶來開局；店內取得金框；頂點卡只展示），下面「認識過 m／289」（原本那面牆）。點封面照舊開唱片資訊
  //   擁有的排法：店內取得的在前（最近帶走的先），再來藏家的王牌、老闆送的
  // 唱片櫃頁：兩面牆各先畫 SHELF_BATCH 張，捲到離牆底 600 px 內再補下一批（捲動時每幀看一次；快速滑過、牆底已經在上面＝補上並把捲動位置往下挪同樣的高度）；
  //   篩選只重畫「認識過」那面牆（驗收：認識 3,000 張整頁一次畫要 2.6 秒）
  var SHELF_BATCH = 120;
  function renderShelf(pg, filter) {
    pg.innerHTML = '';
    var total = poolIds().length;                       // 旗標關：試做的 42 張不算（分母維持 316）
    var ids = Object.keys(save.shelf).filter(cardVis).reverse();
    var SRC_ORDER = { run: 0, boss: 1, start: 1, daily: 2, lexp: 2, gift: 3 };
    var own = ids.filter(isOwned).sort(function (a, b) { return (SRC_ORDER[save.shelf[a].src] | 0) - (SRC_ORDER[save.shelf[b].src] | 0); });
    var cxb = careerOk() && !firstEver() ? '<button type="button" class="lnk cx" data-a="career">' + esc(CU('shelfBtn')) + '</button>' : '';   // 第 D 波（SPEC-D §2.8-1）：唱片櫃頁頭的樂歷入口
    var bar = el('div', 'lb-top page', '<div class="tt">唱片櫃<small>' + esc(SU('shelfOwn', { n: own.length })) + '・' + esc(SU('shelfKnown', { n: ids.length, total: total })) + '</small></div>' + cxb + '<button type="button" class="lnk" data-a="close">關閉</button>');
    pg.appendChild(bar);
    qs('[data-a=close]', bar).addEventListener('click', function (e) { stopEv(e); closePage(); });
    if (cxb) qs('[data-a=career]', bar).addEventListener('click', function (e) { stopEv(e); sfx('tick'); openPage('career'); });
    var body = el('div', 'lb-scroll');
    body.style.overflowAnchor = 'none';                // 補牌時捲動位置自己挪（Chrome 的捲動錨點會再挪一次）
    body.innerHTML = '<div class="lb-pad">' +
      (unlockLine() ? '<p class="sub lb-unl">' + lockIcon(10, true) + esc(unlockLine()) + '</p>' : '') +    // 解鎖進度（店主 11-16）
      '<section class="lb-own"><div class="lb-h2">' + esc(SU('shelfOwn', { n: own.length })) + '<small>' + esc(SU('shelfOwnSub')) + '</small></div>' +
      (own.length ? '<div class="lb-wall own"></div><div class="lb-wmore" data-more="own" aria-hidden="true"></div>' : '<p class="sub">' + esc(SU('shelfOwnEmpty')) + '</p>') + '</section>' +
      '<section class="lb-known"><div class="lb-h2">' + esc(SU('shelfKnown', { n: ids.length, total: total })) + '<small>' + esc(SU('shelfKnownSub')) + '</small></div>' +
      '<div class="lb-filters">' + [['all', '全部'], ['new', TU('shelfNew')], ['ace', '王牌']].map(function (f) { return '<button type="button" class="lb-btn' + (filter === f[0] ? ' on' : '') + '" data-f="' + f[0] + '">' + f[1] + '</button>'; }).join('') + '</div>' +
      '<div class="lb-kw"></div>' +
      '<p class="sub" style="margin-top:14px">點封面＝唱片資訊。</p></section></div>';
    pg.appendChild(body);
    // walls[kind] = {list, n（畫了幾張）, wall, more（牆後面的空格）, cov（一張的 HTML）}
    var walls = {}, raf = 0;
    function fill(w) {
      var to = Math.min(w.list.length, w.n + SHELF_BATCH);
      if (to > w.n) { w.wall.insertAdjacentHTML('beforeend', w.list.slice(w.n, to).map(w.cov).join('')); w.n = to; }
      if (w.n >= w.list.length && w.more) { w.more.remove(); w.more = null; }
    }
    function check() {
      raf = 0;
      if (!body.isConnected) return;
      var box = body.getBoundingClientRect(), again = false;
      ['own', 'known'].forEach(function (k) {
        var w = walls[k]; if (!w || !w.more) return;
        var r = w.more.getBoundingClientRect();
        if (r.top > box.bottom + 600) return;
        var above = r.bottom < box.top, h0 = body.scrollHeight;
        fill(w);
        if (above) body.scrollTop += body.scrollHeight - h0;    // 補在畫面上方：看到的那幾張不跟著跳
        if (w.more) again = true;
      });
      if (again) soon();
    }
    function soon() { if (!raf) raf = (W.requestAnimationFrame || function (f) { return setTimeout(f, 16); })(check); }
    body.addEventListener('scroll', soon, { passive: true });
    function setWall(kind, list, cov) {
      var w = walls[kind] = { list: list, n: 0, cov: cov, wall: qs('.lb-wall.' + kind, body), more: qs('[data-more=' + kind + ']', body) };
      if (w.wall) fill(w);
    }
    if (own.length) setWall('own', own, function (id) { return coverHTML(card(id), { store: isStore(id), lexp: isLexp(id), enc: isEncSrc(id) }); });
    function setKnown(f) {
      var shown = ids.filter(function (id) { return f === 'new' ? isNewOnShelf(id) : f === 'ace' ? !!card(id).tier : true; });
      qs('.lb-kw', body).innerHTML = shown.length ? '<div class="lb-wall known"></div><div class="lb-wmore" data-more="known" aria-hidden="true"></div>' : '<p class="sub">' + (ids.length ? '這一格是空的。' : '還沒認識任何一張。推門進去吧。') + '</p>';
      walls.known = null;
      if (shown.length) setWall('known', shown, function (id) { return coverHTML(card(id), { isNew: isNewOnShelf(id), store: isStore(id) }); });
      [].forEach.call(body.querySelectorAll('.lb-filters [data-f]'), function (b) { b.classList.toggle('on', b.getAttribute('data-f') === f); });
      soon();
    }
    setKnown(filter);
    body.addEventListener('click', function (e) { var f = e.target.closest && e.target.closest('[data-f]'); if (f) setKnown(f.getAttribute('data-f')); });
  }

  // ======================================================================= scene 路由
  SCREENS.scene = function (p) {
    var sc = buildScene(p);
    bindInfoTaps(UI.panel);
    if (p.start) { try { p.start(sc); } catch (e) { console.error(e); } }
  };

  // ======================================================================= 暫代對決（duel.js 不在時才用）
  function stubDuel(wrap, opts) {
    var d = opts.duel, done = false;
    var body = el('div', 'lb-pad');
    wrap.appendChild(body);
    function render() {
      var v = E.view(d);
      body.innerHTML = '<p><b>' + esc(v.eName) + '</b> 聲望 ' + v.eHp + '／' + v.eMax + '</p><p>你 聲望 ' + v.pHp + '／' + v.pMax + '・第 ' + v.n + ' 手</p>' +
        '<div class="lb-opts"><button type="button" class="lb-btn big" data-a="one">出一手（照名牌）</button><button type="button" class="lb-btn pri big" data-a="all">打完這場</button></div>';
    }
    function step() { if (d.over) return; E.resolveTurn(d, E.policies.novice(d)); if (opts.onSave) opts.onSave(d); }
    function finish() { if (done || !d.over) return; done = true; opts.onEnd({ over: d.over.win ? 'win' : 'lose', duel: d }); }
    body.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b) return;
      if (b.getAttribute('data-a') === 'one') step(); else { var g = 0; while (!d.over && g++ < 60) step(); }
      if (d.over) finish(); else render();
    });
    render();
  }
  function autoDuel() {
    var r = save.run, d = r && r.duel;
    if (!UI.auto || !d || UI.screen !== 'duel') return;
    var Dl = DUEL();
    if (UI.auto.animated && Dl && typeof Dl.autoplay === 'function') { try { Dl.autoplay(UI.auto.policy || 'novice'); return; } catch (e) { console.error(e); } }
    var pol = E.policies[UI.auto.policy] || E.policies.novice, R = E.makeRng(7), mem = {};
    var g = 0;
    while (!d.over && g++ < 80) { var lo = loseOutcome(d), dbg = lo || UI.force; var evs = E.resolveTurn(d, pol(d, R, mem, C), dbg ? { debugOutcome: dbg } : undefined); if (!evs || !evs.length) break; }
    persist();
    unmountDuel();
    onDuelEnd({ duel: d });
  }

  // ======================================================================= 除錯鉤子（?debug=1）
  // __lab.loseNext：這一場（無限試煉的真對決；序章、重看教學、對決實驗室不算）第一手就被扣到 0
  function loseOutcome(d) {
    if (!(UI.loseNext > 0) || !d || UI.tutReplay || (UI.duelLab && d === UI.duelLab.duel) || inPrologue(save.run)) return null;
    UI.loseDuel = d;
    return { kind: 'countered', toE: 0, toP: 99 };
  }
  function kick() {
    if (!UI.auto) return;
    if (UI.screen === 'duel') return autoDuel();
    if (UI.lastAct) UI.lastAct();
  }
  function installDebug() {
    W.__lab = {
      get run() { return save.run; },
      get save() { return save; },
      get stage() { return UI.stage; },
      // 第 I 波背景音樂（tests/e2e-bgm.mjs）：輪播狀態、佇列
      bgm: function (geo) {
        var P = UI.playlist;
        if (geo) { var pop = BGM.pop; return { R: npRadio(), V: npView(), B: npBlocks(), w: pop ? pop.offsetWidth : 0, h: pop ? pop.offsetHeight : 0 }; }   // 泡泡擺放的量測（收音機、鏡頭、不能蓋的）
        return { zone: BGM.zone, first: BGM.first, cur: BGM.cur, mine: BGM.mine, idle: BGM.idle, hidPend: BGM.hidPend, loading: BGM.loading, fetched: BGM.fetched, retry: !!BGM.retryT, popOpen: BGM.popOpen, popAt: BGM.popAt, popLvl: BGM.popLvl, popTap: BGM.popTap, closeWhy: BGM.closeWhy || null, popTry: !!BGM.popTry,
          icMode: BGM.icMode, on: bgmOn(), snd: sndState(), cell: bgmCell(), shelfOpen: bgmShelfOpen(),
          pl: P ? { key: P.key, cycle: P.cycle, queue: P.queue.slice(), bag: (P.bag || []).slice(), last: P.last, front: P.front } : null };
      },
      // 活店（SPEC-H §11.3）：state、spawn(who, stop, o)、freezeAt([stop])、doorLog()、clear()、mode()
      crowd: {
        state: function () { return crowdCall('state'); },
        spawn: function (who, stop, o) { return crowdCall('spawn', who, stop, o); },
        freezeAt: function (ids) { return crowdCall('freezeAt', ids); },
        doorLog: function () { return crowdCall('doorLog') || []; },
        clear: function () { return crowdCall('clear'); },
        mode: function () { return crowdCall('mode'); },
        on: function () { return !!UI.crowdOk && crowdOn(); },
        // 聊天（§5）：chat(slot 或熟客 id)＝點那個人（跟真點同一條路）；talk＝現在誰在講、第幾泡；next＝下一句（點 ▼）；close＝收掉；
        //   owner()＝老闆聊聊一段；regulars()＝save.regulars 複本；enc＝第二階段（切磋）才有
        chat: function (id) {
          var S0 = crowdCall('state'), sl = S0 && (S0.slots || []).filter(function (x) { return x.on && (x.slot === id || x.who === id); })[0];
          if (!sl) return null;
          onStageAction('talk:' + (/^passer/.test(sl.who) ? 'passer' : sl.who), { id: 'cw-' + sl.slot, follow: sl.slot });
          return crowdCall('chatState');
        },
        talk: function () { return crowdCall('chatState'); },
        next: function () { return crowdCall('chatNext'); },
        close: function () { crowdCall('chatClose'); return null; },
        owner: function () { ownerChatBeat(); return crowdCall('chatState'); },
        sayTill: function () { return sayTill(); },
        regulars: function () { return JSON.parse(JSON.stringify(save.regulars || null)); },
        // 切磋（棒 4b）：enc(who)＝這一位馬上開一個切磋邀請、指定誰（同一位開過的先清掉；主線客人已經在對戰台＝換成他）；enc()＝只看狀態
        //   回 { spar（run.spar 複本）, pending（encPending）, ui（UI.enc）, atTable, crowd（導演的 S.enc）, sheet（邀請面板開著）, mode（這次的獎勵模式） }；這一趟沒有切磋＝null
        enc: function (who) {
          var r = save.run; if (!r) return null;
          if (who != null) {
            if (!C.regulars || !C.regulars[who] || UI.screen !== 'night' || E.nextStep(r) !== 'fight' || !guestWaits(r)) return null;
            var pd = E.encPending(r);
            if (pd === 'loot' || pd === 'fighting') return null;
            if (r.spar && r.spar.pos === r.pos) { delete r.spar; persist(); }
            if (UI.enc && UI.enc.key === sparKey(r) && crowdCall('encActive')) { crowdCall('takeBack', null, UI.enc.who); }
            UI.enc = null;
            UI.encForce = { pos: r.pos, tag: runTag(r), who: who };
            if (UI.atTable === tableKey(r)) { UI.atTable = null; hideActor('f'); }
            go('night');
          }
          var u = UI.enc && UI.enc.key === sparKey(r) ? UI.enc : null;
          if (!r.spar && !u) return null;                            // 這一趟沒有切磋（?crowd=0、開關關著、還沒開過）＝null（同第一階段的空殼）
          return { spar: r.spar ? JSON.parse(JSON.stringify(r.spar)) : null, pending: E.encPending(r), atTable: UI.atTable, sheet: !!qs('.lb-sheet.float.enc', app()),
            ui: u ? { key: u.key, who: u.who, pos: u.pos, phase: u.phase, waited: Math.round(u.waited || 0), dare: u.dare || '', talk: u.talk || 0 } : null,
            crowd: ((crowdCall('state') || {}).enc) || null, mode: E.sparMode ? E.sparMode(SC(r)) : null, ok: sparOk(r) };
        }
      },
      duel: function () { return save.run && save.run.duel ? E.view(save.run.duel) : null; },
      rawDuel: function () { return save.run && save.run.duel; },
      screen: function () { return UI.screen; },
      trail: function () { return UI.trail.slice(); },
      cam: function () { return UI.camName; },
      going: function () { return !!UI.going; },
      autoplay: function (policy, o) { o = o || {}; UI.auto = { policy: policy || 'novice', until: o.until || 'duelEnd', animated: !!o.animated, tut: !!o.tut, ace: o.ace || null, guess: o.guess || null, apexId: o.apexId || null }; kick(); return true; },
      stop: function () { UI.auto = null; },
      seed: function (n) { UI.seedOverride = String(n); return seedKey(); },
      // 讓之後每一手都照這個結果（e2e #32：7 手同色 → 唱片丟完）；null 取消
      force: function (o) { UI.force = o || null; return UI.force; },
      // 直接跳到第 pos 位（SPEC 無限試煉 §1 裁定 11；engine.jumpTo：序章算完成、特價箱算挑過、清掉進行中的對決與待選；聲望、等級不動）
      //   o：{hp, maxHp, atk, def, level, xp, retryLeft, money} 直接改（e2e 測結算、品味／底氣標籤）
      jump: function (pos, o) {
        var r = save.run; if (!r) return false;
        o = o || {};
        leaveDuel(); UI.ending = null;
        E.jumpTo(r, C, pos);
        ['maxHp', 'hp', 'atk', 'def', 'level', 'xp', 'retryLeft', 'money'].forEach(function (k) { if (o[k] != null) r[k] = Math.max(0, o[k] | 0); });
        if (r.maxHp < 1) r.maxHp = 1;
        r.hp = Math.max(1, Math.min(r.hp, r.maxHp));
        save.prologueDone = true; persist(); go('night'); return true;
      },
      // 舊名：跳到這一輪第 idx 位（0 起）
      skipTo: function (idx) { var r = save.run; if (!r) return false; return W.__lab.jump((r.round - 1) * 5 + Math.max(0, Math.min(4, idx | 0)) + 1); },
      // 下一場強制輸（n 場，預設 1；o.noRetry＝這一輪的說情也用掉，輸了直接結算）：無限試煉不會自己結束，e2e 用它測結算
      loseNext: function (n, o) {
        UI.loseNext = Math.max(0, n == null ? 1 : n | 0); UI.loseDuel = null;
        if (o && o.noRetry && save.run) { save.run.retryLeft = 0; persist(); }
        return UI.loseNext;
      },
      forceLose: function () {
        var r = save.run, d = r && r.duel; if (!d) return false;
        d.p.hp = 0; d.over = { win: false, by: 'hp', pHp: 0, eHp: d.e.hp }; persist();
        unmountDuel(); onDuelEnd({ duel: d }); return true;
      },
      forceWin: function () {
        var r = save.run, d = r && r.duel; if (!d) return false;
        d.e.hp = 0; d.over = { win: true, by: 'hp', pHp: d.p.hp, eHp: 0 }; persist();
        unmountDuel(); onDuelEnd({ duel: d }); return true;
      },
      info: function (id) { return info(id, { from: 'debug' }); },
      // 從唱片櫃挑牌開局（e2e）：唱片櫃裡擁有的、能當種子的；own(ids, src) 直接收進唱片櫃（擁有）；keepIds＝結算「這一趟帶走一張」的候選
      owned: function () { return ownedIds(); },
      seedable: function () { return seedableIds(); },
      seedPool: function (tier) { return seedPool(tier); },          // 挑種子面板會列的（扣掉這次王牌那組送的，審查 #3）
      own: function (ids, src) { [].concat(ids || []).forEach(function (id) { shelfOwn(id, src || 'run'); }); persist(); return ownedIds(); },
      keepIds: function () { return save.run ? keepIds(save.run) : []; },
      rules: openRules, openPage: openPage, go: go, replayTutorial: replayTutorial, stageAction: onStageAction,
      apex: function () { return !!UI.apex; }, aceId: function () { return save.run ? aceIdOf(save.run) : null; },   // 頂點卡試做（?apex=1）
      fac: function () { return !!UI.fac; },             // 第 D 波棒二三流派（?fac=1）：旗標開沒開（run 帶不帶派別看 run.fac）
      // 你家（聆聽室，v5 第六項第三期）：擁有的排法、想要清單、控制台開著沒、唱盤上那張
      home: { owned: function () { return homeOwnedIds(); }, want: function () { return save.want.slice(); }, tune: function () { return !!UI.tune; }, deck: function () { return UI.homeDeckId || null; }, last: function () { return UI.tuneLast || null; },
        close: function () { return closeTuneConsole(); }, ended: function (id) { onMusicEnded(card(id)); return UI.homeNext || null; } },
      // v4（§2.5.2）：設錢、這一輪的貨、逐句執行器的時間軸（§5.4）、經濟介面
      money: function (n) { var r = save.run; if (!r) return null; r.money = Math.max(0, Math.floor(+n || 0)); persist(); return r.money; },
      shop: function () { return save.run ? save.run.shop : null; },
      timeline: function () { return UI.timeline.slice(); },
      tap: function () { if (UI.dlg) UI.dlg.tap(); },
      get beat() { return UI.dlg ? UI.dlg.beat : null; },
      get econ() { return econ(); },
      // 測試對決（e2e-duel 的 index.html 版，C 整合；＝dev/duel-harness.html 的 build()／start()）：
      //   duelLab.start({enemy, seed, ace, hp, hpNow, ehp, relics, pos, atk, def, eAtk, eDef, hold, encore, encCarry})：直接在 index.html 的對決畫面開一場（包包＝禮物＋特價箱每色第一張；
      //     沒給 pos＝角色本來的聲望與牌單、出招 normal；pos＝照無限試煉第 pos 位的曲線；atk／def＝你的品味／底氣、eAtk／eDef＝蓋掉他的），打完停在大章不結算；
      //     hold:true＝照真玩家揭曉後停住等點（11-17；沒給＝照現行時序）
      //   duelLab.setNext({i,attr})：他下一手照這個出；duelLab.ended：打完的結果 {over, win, by, pHp, eHp}
      duelLab: {
        start: function (o) { return duelLabStart(o || {}); },
        setNext: function (spec) { UI.nextPlay = spec && typeof spec === 'object' ? spec : null; return UI.nextPlay; },
        get ended() { return UI.duelLab ? UI.duelLab.ended : null; },
        set ended(v) { if (UI.duelLab) UI.duelLab.ended = v; },
        get duel() { return UI.duelLab ? UI.duelLab.duel : null; }
      }
    };
  }
  function duelLabStart(o) {
    var ace = C.aces[o.ace] ? o.ace : 'hall', eid = C.enemies[o.enemy] ? o.enemy : 'copycat';
    var r = save.run;
    if (!r || r.over || r.prologue === 'pending') {
      r = E.newRun(C, { seedKey: 'duel-lab', runNo: 1, ace: ace, prologue: false, relics: [] });
      var ch = E.bargainPolicy ? E.bargainPolicy(r, C) : null; if (ch) E.choose(r, C, ch);
      save.run = r; save.prologueDone = true; save.tutorialDone = true;
    }
    leaveDuel(); UI.ending = null; UI.force = null; UI.nextPlay = null; UI.auto = null;
    var en = C.enemies[eid], pos = !en.prologue && +o.pos >= 1 ? Math.floor(+o.pos) : null;
    var eDef = E.enemyDef(C, eid, pos ? { pos: pos, seedKey: 'duel-lab', runNo: 1, playerAce: ace } : {});
    if (o.ehp != null) eDef.hp = +o.ehp;
    if (o.eAtk != null) eDef.atk = Math.max(0, o.eAtk | 0);
    if (o.eDef != null) eDef.def = Math.max(0, o.eDef | 0);
    var pick3 = ['c', 'o', 'h'].map(function (a) { return ((C.bargain && C.bargain.pool) || []).filter(function (id) { return C.cards[id] && E.topAttr(C.cards[id]) === a; })[0]; }).filter(Boolean);
    var pSrc = { bag: (C.gifts[ace] || []).concat(pick3), ace: ace, relics: Array.isArray(o.relics) ? o.relics.slice(0, 3) : [], atk: o.atk | 0, def: o.def | 0 };   // relics：e2e-duel #1g（屬性鈕與「你」那一列的發燒配件）
    var apex = UI.apex && o.apex !== false;             // 頂點卡試做（?apex=1）：王牌＝o.aceId 那張（那派名單裡；沒給＝預設）、純輔助卡
    if (apex && apexPickOk(ace, o.aceId)) pSrc.aceId = o.aceId;
    var po = apex ? { apex: true } : null;
    // 第 D 波棒二（?fac=1）：測試對決也帶派別（o.fac false＝不帶；o.facPicks＝{id:1} 這幾項本派選項算拿過，e2e 量第二招上限用）
    if (UI.fac && o.fac !== false && TIERS.indexOf(ace) >= 0) { pSrc.fac = { picks: o.facPicks && typeof o.facPicks === 'object' ? Object.assign({}, o.facPicks) : {} }; po = Object.assign(po || {}, { fac: true }); }
    // 第 I 波 I-1 翻面（e2e-encore）：o.encore true＝跟主線對決一樣帶翻面（startFight 的 opts.encore）；o.encCarry＝上一場留下來的 give（'again'|'star'|'hit'）
    var enc = o.encore === true && typeof E.encoreOf === 'function' && !!C.encore && C.encore.on !== false;
    if (enc) po = Object.assign(po || {}, { encore: true });
    var pDef = po ? E.playerDef(C, pSrc, po) : E.playerDef(C, pSrc);
    if (o.hp != null) pDef.hp = pDef.maxHp = +o.hp;
    if (o.hpNow != null) pDef.hp = Math.max(1, Math.min(pDef.maxHp || pDef.hp, +o.hpNow));   // 開打時聲望沒滿（回聲望型的測試）
    var seed = (+o.seed >>> 0) || 1, opts = { seed: seed, hintTable: E.hintTableOf ? E.hintTableOf(C) : undefined };
    if (apex) opts.apex = true;
    if (enc) { opts.encore = true; if (typeof o.encCarry === 'string') opts.encCarry = { give: o.encCarry }; }
    if (!opts.hintTable) { var ht = {}; ['c', 'o', 'h'].forEach(function (a) { ht[a] = ((C.hints || {})[a] || []).map(function (h) { return h.id; }); }); opts.hintTable = ht; }
    if (eDef.ace) opts.enemyAce = eDef.ace;
    else if (eDef.boss) { var others = E.TIERS.filter(function (t) { return t !== ace; }); opts.enemyAce = C.cards[C.aces[others[seed % 2]]]; }
    var res = E.startDuel(pDef, eDef, opts);
    r.duel = res.duel; r.duelEnemy = eid; r.pending = null;
    UI.duelLab = { duel: res.duel, ended: null, hold: !!o.hold };   // hold：照真玩家停住等點（e2e 測停住用；預設不停）
    UI.going = false;
    go('duel', { res: { duel: res.duel, events: res.events, enemyId: eid }, enemyId: eid });
    return true;
  }

  // ======================================================================= boot
  function buildShell() {
    var a = app(); a.innerHTML = '';
    UI.top = el('div', 'lb-top'); UI.top.id = 'top';
    UI.stageHost = el('div', 'lb-stage'); UI.stageHost.id = 'stage';
    UI.panel = el('div', 'lb-panel'); UI.panel.id = 'panel';
    a.appendChild(UI.top); a.appendChild(UI.stageHost); a.appendChild(UI.panel);
    bindInfoTaps(UI.panel);
    // V03：面板（與裡面的對白框、包包條）高度一變就重算店景下面要不要接木地板
    try { UI.floorRO = new ResizeObserver(function () { floorSoon(); }); UI.floorRO.observe(UI.panel); } catch (_) {}
    W.addEventListener('resize', floorSoon);
  }
  // V03：高螢幕的序章／尾聲（scene）——店景在寬度上已經是整間店，不能再大；面板照內容高之後下面剩的空白，
  //   改成店裡的木地板往下延伸（舞台變高、對白框與包包條緊接在地板下面），不留一大片白。其他畫面一律不延伸。
  function floorSoon() { if (UI.floorRaf) return; UI.floorRaf = requestAnimationFrame(function () { UI.floorRaf = 0; fitFloor(); }); }
  // 現在真的畫出來的木地板（鏡頭在動、還沒看到店的最下面時是 0；停下來之後 shop 照最後要的那個高畫）：
  //   UI.floorX 跟著它，不跟著「上一次 floorExt 回了什麼」——鏡頭移動中回 0、停下來卻畫了 181 px，floorX 一直是 0，
  //   之後開面板 floorRoom 以為沒地板可讓、換 reward 鏡頭把店頂裁掉，地板又長回來（V5 F4：尾聲撿 Fishmans 那張）
  function floorNow() {
    var sh = UI.stage && UI.stage.shop;
    if (sh && typeof sh.view === 'function') { try { return sh.view().ext || 0; } catch (_) {} }
    return UI.floorX || 0;
  }
  function fitFloor() {
    var st = UI.stage; if (!st || typeof st.floorExt !== 'function') return;
    var cur = UI.floorX = floorNow();
    // 來客也接（V5-play-4：430×932 錢／包包那行下面空 193 px 白）；抽屜（econ）開著、面板蓋了 sheet 時不接——抽屜上面的空隙照 R2 是舞台黑
    var night = UI.screen === 'night' && !UI.econBusy && !qs(':scope > .lb-sheet', UI.panel || D.body);
    // 領獎前的掉落旁白（只有對白框、面板還沒開）：一樣接地板（審查 #7）
    var drop = UI.screen === 'reward' && !!UI.dropDq && UI.dropDq.parentNode === UI.panel && !qs(':scope > .lb-sheet', UI.panel || D.body);
    if ((UI.screen !== 'scene' && !night && !drop) || !UI.panel) { UI.floorX = 0; st.floorExt(0); return; }   // 要過、還沒畫出來的也收掉（floorExt(0) 已經是 0 就不重畫）
    var p = UI.panel, pr = p.getBoundingClientRect(); if (!pr.height) return;
    var cs = getComputedStyle(p), need = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0) + 10;   // 包包條下面留 10 px
    for (var i = 0; i < p.children.length; i++) {
      var c = p.children[i], cc = getComputedStyle(c);
      if (cc.position === 'absolute' || cc.position === 'fixed' || cc.display === 'none') continue;
      if (UI.floorRO && !c.__floorObs) { try { UI.floorRO.observe(c); c.__floorObs = true; } catch (_) {} }
      need += (night ? naturalH(c) : c.getBoundingClientRect().height) + (parseFloat(cc.marginTop) || 0) + (parseFloat(cc.marginBottom) || 0);   // 來客那塊被面板撐滿：量內容本身
    }
    if (UI.sheetNeed && qs(':scope > .lb-sheet', p)) need = Math.max(need, UI.sheetNeed);   // 面板開著：至少讓出面板要的高（RH-5）
    var want = Math.max(0, Math.floor(cur + pr.height - need));
    if (want < 24) want = 0;                         // 一點點的空不值得接地板
    if (Math.abs(want - cur) < 2) return;
    UI.floorX = st.floorExt(want);
  }
  function mountStage() {
    if (!W.DipLabStage || !W.DipLabStage.mount) return Promise.resolve(null);
    return W.DipLabStage.mount(UI.stageHost, {
      shop: 'dip', cards: C.cards, coverBase: './', sprites: labSpr(), player: function () { return save && save.player ? playerAv() : { head: 'neat' }; },
      camera: 'full', screen: 'title', speed: speed, onAction: onStageAction
    }).then(function (st) { UI.stage = st; st.onAction = onStageAction; configTut(); configEcon(); configLoot(); configStalls(); configCrowd(); return st; }, function (e) { console.error(e); UI.stageHost.classList.add('nostage'); configEcon(); configLoot(); configStalls(); return null; });
  }
  // 戰利品列＋寶箱（loot.js，第 C 波 SPEC-C §4.1、§4.2）：交易一律走 doChoose（take／relic／skip），面板、鏡頭、錢跳數字用這裡的
  function configLoot() {
    var X = W.DipLabLoot; if (!X || typeof X.configure !== 'function' || UI.lootOk) return;
    var rectAt = function (x, y) { return { left: x - 20, top: y - 20, width: 40, height: 40 }; };
    try {
      X.configure({ content: C, engine: E,
        run: function () { return save.run; },
        alive: function () { return !!save.run && (UI.screen === 'reward' || (UI.screen === 'night' && encLootPending(save.run))); },   // 切磋的戰利品列在來客畫面（§7.3-8）
        // 面板頂邊的演出層（字幕、錢袋、音符）：掛在 #app、top 釘在舞台下緣（舞台 z 3 壓過面板；鏡頭收放時跟著走），換畫面 cleanup 收掉
        overlay: function (node) {
          app().appendChild(node); UI.decor.push(node);
          var put = function () { if (!node.isConnected) return; var sh = UI.stageHost.getBoundingClientRect(), ar = app().getBoundingClientRect(); node.style.top = Math.round(sh.bottom - ar.top) + 'px'; };
          put(); if (W.ResizeObserver) { var ro = new ResizeObserver(put); ro.observe(UI.stageHost); UI.offs.push(function () { ro.disconnect(); }); }
          return node;
        },
        sheet: function (html, cls) { return sheet(/(^| )enc( |$)/.test(cls || '') ? html : wornHd(encCarryHd(html)), cls); },   // 第 I 波 I-2：這場聽膩的小字（切磋那列不寫：切磋不耗耐聽）   // 第 I 波翻面：「翻面留到下一位」小字（切磋那列不寫：那場沒有翻面）
        fit: fitRewardSheet,
        after: function (fn, ms) { var t = setTimeout(fn, Math.max(0, ms | 0)); UI.timers.push(t); return t; },   // 換畫面 cleanup 清掉；ms 由 loot.js 自己照速度算
        sfx: function (n, o) { sfx(n, o); },
        say: function (id, t, ms) { stageSay(id, t, id === 'o' ? 'owner' : null, ms); var a = UI.stageHost ? qsa('.ds-say', UI.stageHost) : []; return a.length ? a[a.length - 1] : null; },
        unsay: function (id) { stg('say', id, null); },
        stageRect: function () { return UI.stageHost ? UI.stageHost.getBoundingClientRect() : null; },
        emote: function (id, k, ms) { stg('emote', id, k, ms); },
        toast: toast, cashRise: cashRise, cashAfter: cashAfter, xpRise: xpRise,
        coverHTML: function (c, o) { return coverHTML(c, o); }, starsHTML: function (c, o) { return starsHTML(c, o); }, relicButtonsHTML: relicButtonsHTML,
        bagText: bagText, rewardNote: function () { return SU('rewardNote'); },
        bagGain: function (id) { try { return E.bagGain ? E.bagGain(save.run, C, id) : 0; } catch (e) { return 0; } },
        take: takeCard, relic: takeRelic, skip: function () { return doChoose({ type: 'skip' }); },
        shelfAdd: shelfAdd, shelfHas: function (id) { return !!(save.shelf && save.shelf[id]); },
        seen: function (k) { return !!(save.seen && save.seen[k]); }, markSeen: function (k) { if (!save.seen) save.seen = {}; save.seen[k] = true; persist(); },
        fly: function (c, from, to) { return flyCover(c, from, to, 0).done; },
        wallRect: function () { var r = UI.stageHost.getBoundingClientRect(); return rectAt(r.left + r.width / 2, r.top + Math.min(40, r.height / 4)); },
        bagRect: function () { var a = app().getBoundingClientRect(); return rectAt(a.left + a.width / 2, a.bottom - 30); },
        topRect: function () { var a = app().getBoundingClientRect(); return { left: a.left + a.width / 2 - 40, top: a.top + 40, width: 80, height: 26 }; },
        auto: autoAct, policy: function () { return E.runPolicy(save.run, C); },
        anim: function () { return { fast: !!(save.settings && save.settings.fastAnim), k: FAST ? 4 : 1, rm: rm() }; },
        floor: function (id) { var c = card(id); if (!c) return; stg('floorRecord', 'duelE', { attr: E.topAttr(c) }); UI.dropFloor = true; },
        log: function (k) { wcLog(k); persist(); },
        // 第 I 波 I-2 上場＋耐聽（上場制關＝null／false／''）：↑ 比上場最弱那張強、第一次那句、收這張＋換上場、耐聽點
        luUp: function (id) {
          var r = save.run; if (!luLive(r) || !Array.isArray(r.lineup) || !r.lineup.length || !E.luScoreOf) return null;
          var ms = E.luMains(r, C), lo = Math.min.apply(null, r.lineup.map(function (x) { return E.luScoreOf(r, C, x, ms); }));
          return { up: E.luScoreOf(r, C, id, ms) > lo + 1e-9, text: LU('upHint') };
        },
        // 第一次那句：下一輪是上場制才換（第 1 輪收的到第 2 輪還是整包上場＝照舊那句「包包越厚，好牌越難抽到」才是真話）
        luFirst: function () { var r = save.run, per = (E.TRIAL && E.TRIAL.classes && E.TRIAL.classes.length) || 5; return luOn(r) && (r.round | 0) * per + 1 >= (r.lineupFrom | 0) && LU('firstLoot') ? LU('firstLoot') : null; },
        swapOk: function () { var r = save.run; return luLive(r) && Array.isArray(r.lineup) && (r.idx | 0) < 4 && UI.screen === 'reward'; },   // 這一輪最後一位（藏家）收完就換輪（重挑上場）：不給
        swapIn: function (id) { return luSwapSheet(id); },
        earDots: function (id) { return earDotsHTML(save.run, id); }
      });
      UI.lootOk = true;
    } catch (e) { console.error(e); }
  }
  // 今天的攤位＋中繼點開局（stalls.js，第 C 波 SPEC-C §4.3–§4.7）：交易一律走 doChoose（stallPick／stallAct／stallLeave／draft）
  function configStalls() {
    var X = W.DipLabStalls; if (!X || typeof X.configure !== 'function' || UI.stallsOk) return;
    try {
      X.configure({ content: C, engine: E,
        run: function () { return save.run; }, persist: persist, choose: doChoose,
        alive: function () { return UI.screen === 'night' && !!save.run; },
        stg: stg, stgP: stgP, cam: cam, sheet: function (html, cls) { return sheet(html, cls); }, closeSheet: closeSheet, room: roomForSheet,
        naturalH: naturalH, vh: function () { return W.visualViewport ? Math.min(W.innerHeight, W.visualViewport.height) : W.innerHeight; },
        say: function (id, t, ms) { stageSay(id, t, id === 'o' ? 'owner' : null, ms); }, toast: toast, sfx: function (n, o) { sfx(n, o); }, cashRise: cashRise,
        after: function (fn, ms) { var t = setTimeout(fn, Math.max(0, ms | 0)); UI.timers.push(t); return t; },
        anim: function () { return { fast: !!(save.settings && save.settings.fastAnim), k: FAST ? 4 : 1, rm: rm() }; },
        auto: autoAct, autoOn: function () { return !!UI.auto; }, policy: function () { return E.cPolicy(save.run, C); },
        coverHTML: function (c, o) { return coverHTML(c, o); }, starsHTML: function (c, o) { return starsHTML(c, o); }, tileHTML: function (c, o) { return tileHTML(c, o); },
        relicButtonsHTML: relicButtonsHTML, relicName: function (id) { return (relicOf(id) || {}).name || ''; }, pix: pix,
        relicOf: relicOf, relicIcon: function (id, size) { return relicIcon(id, size); },
        relicPanel: relicPanel, levelPanel: levelPanel,
        play: function (c) { var f = FX(); if (c && c.previewUrl && soundOn() && f && f.music && f.music.play) try { f.music.play(c, { fadeMs: 600 }); } catch (e) { console.error(e); } },
        bgmFront: function (id) { bgmFront(id); },   // 第 I 波：「店裡唱盤」放上去那張＝插到背景音樂佇列最前面、馬上放
        // 錢、包包、配件那條（今天的攤位底部）照最新的 run 重畫
        refresh: function () { var b = qs('.lb-panel.stall .lb-bagline', app()); if (b && save.run) b.innerHTML = bagLineInner(save.run); },
        done: function () { if (UI.screen === 'night' && save.run) { UI.keepP = true; go('night'); } },
        setSpot: function (k) { if (k) UI.lastSpot = k; },
        enemySpr: function (id) { return enemySpr(C.enemies[id]); },
        log: function (k) { wcLog(k); persist(); },
        checkpoints: function () { return (save.best.checkpoints || []).slice(); },
        renderStrip: function (sc) { if (sc) { sc.stripState = null; renderStrip(sc); } }
      });
      UI.stallsOk = true;
    } catch (e) { console.error(e); }
  }
  // 經濟介面（econ.js，B3；§2.5.2）：舞台好了、第一個畫面之前接上一次
  function configEcon() {
    var X = econ(); if (!X || typeof X.configure !== 'function' || UI.econOk) return;
    UI.econOk = true;
    try {
      X.configure({ content: C, engine: E, stage: UI.stage, run: function () { return save.run; }, choose: doChoose,
        info: function (c) { var ci = CI(); return ci ? ci.open(c, { from: 'econ' }) : Promise.resolve(); },
        sfx: function (n, o) { sfx(n, o); }, toast: toast, app: app, makeRoom: makeRoom,
        // 櫃檯「賣給老闆」分頁打開過：「拿去櫃檯賣給老闆」的一次性提示不用再出（第 A 波 5）
        onSellOpen: function () { UI.sellNudge = null; if (!save.seen.counterSell) { save.seen.counterSell = true; persist(); } },
        // 第 I 波 I-2（上場制關＝''）：櫃檯賣給老闆的格子標「上場」／「替補」、畫耐聽點（賣掉上場那張＝那一格空著，下一位開打前補）
        luTag: function (id) { var r = save.run; return luLive(r) && Array.isArray(r.lineup) ? (r.lineup.indexOf(id) >= 0 ? LU('onTag') : (r.bench || []).indexOf(id) >= 0 ? LU('bench') : '') : ''; },
        earDots: function (id) { return earDotsHTML(save.run, id); } });
    } catch (e) { console.error(e); }
  }
  // ======================================================================= 活店（SPEC-H 棒 4：導演在 crowd.js；這裡只接開關、模式、暫停與幾個讓位點）
  //   開關（§11.1）：正式站預設開；自動化瀏覽器（navigator.webdriver＝Playwright e2e、截圖腳本）預設關；?crowd=0 全關、?crowd=1 強制開
  function crowdOn() {
    if (QS.crowd === '0') return false;
    if (QS.crowd === '1') return true;
    if (C && C.crowd && C.crowd.on === false) return false;
    try { if (W.navigator && W.navigator.webdriver) return false; } catch (_) {}
    return true;
  }
  function crowdCall(m) {
    var K = UI.crowdOk ? W.DipLabCrowd : null; if (!K || typeof K[m] !== 'function') return null;
    try { return K[m].apply(K, Array.prototype.slice.call(arguments, 1)); } catch (e) { console.error(e); return null; }
  }
  function configCrowd() {
    var K = W.DipLabCrowd; if (!K || typeof K.configure !== 'function' || UI.crowdOk) return;
    UI.crowdOk = true;
    try {
      K.configure({ on: crowdOn(), content: C, stage: function () { return UI.stage; }, speed: speed, reduced: rm, paused: crowdPaused,
        seqTag: function () { var CC = W.DipCrowdCore; return save && save.run && CC ? CC.seqTag(save.run) : null; },
        titleTag: function () { var CC = W.DipCrowdCore; return CC ? CC.titleTag((save.runs || []).length, seedKey()) : 'title'; },
        ownerFree: crowdOwnerFree, shelfCard: crowdShelfCard,
        // 聊天（§5）：挑句與存檔在這裡（crowdChat）；泡泡、停多久、一次幾段在 crowd.js。fastK＝只有 ?fast=1 的 ÷4（動畫加速不吃，§5.3）
        chat: crowdChat, chatEnd: crowdChatEnd, fastK: function () { return FAST ? 4 : 1; }, hint: crowdHint, quiet: crowdQuiet });
    } catch (e) { console.error(e); }
  }
  // 暫停（§3.1）：抽屜、浮動面板（切磋邀請面板除外）、頁面、〔D〕過場卡（也是浮動面板）、教學泡泡、唱片資訊、你正在走去開打（UI.going）、分頁藏到背景
  function crowdPaused() {
    if (D.hidden || UI.going || UI.page || UI.modal || UI.intro || UI.tune) return true;
    var a = app(); if (!a) return false;
    if (qs('.ec-drawer', a)) return true;
    var X = econ(); try { if (X && X.isOpen && X.isOpen()) return true; } catch (_) {}
    if (qsa('.lb-sheet.float', a).some(function (s) { return !s.classList.contains('enc'); })) return true;
    var tt = D.getElementById('tut'); if (tt && /\bon\b/.test(tt.className)) return true;
    var ci = CI(); try { if (ci && ci.isOpen()) return true; } catch (_) {}
    return false;
  }
  // 客人拿著翻到的那張去櫃檯前結帳（§4.2）：老闆在講話、老闆選單或櫃檯面板開著、老闆不在櫃檯（宵夜、裁判）＝這次不結帳
  function crowdOwnerFree() {
    if (sayTill() > Date.now()) return false;
    var a = app(); if (a && qs('.lb-sheet.float.owner', a)) return false;
    var X = econ(); try { if (X && X.isOpen && X.isOpen()) return false; } catch (_) {}
    var o = stg('pos', 'o'), sp = stg('spot', 'counter');
    return !!(o && sp && !o.hidden && Math.abs(o.x - sp[0]) < 2 && Math.abs(o.y - sp[1]) < 2);
  }
  // 那箱架上的一張（run.shop.bins[那箱]；沒有＝不拿）
  function crowdShelfCard(bin, u) {
    var r = save && save.run, a = r && r.shop && r.shop.bins && r.shop.bins[bin];
    if (!Array.isArray(a) || !a.length) return null;
    var id = a[Math.min(a.length - 1, Math.floor((u || 0) * a.length))];
    return card(id) ? id : null;
  }
  // 畫面 → 導演模式（§3.1 畫面表）：go() 跑完畫面才切
  function crowdSync(id, p) {
    if (!UI.crowdOk || !W.DipLabCrowd) return;
    p = p || {};
    crowdCall('chatClose');                                    // 換畫面（含來客畫面重畫）＝聊天泡泡收掉（§3.1、§5.3）；人和位置照留
    crowdChatEnd();
    if (id !== 'night') stg('removeHot', 'cw-enc');            // 切磋：對戰台上那位熟客的熱點只在來客畫面（重畫來客畫面時 sparAtTable 再加回去）
    var r = save && save.run, mode = 'off', o = {};
    if (id === 'title') mode = firstEver() ? 'off' : 'calm';                     // 第一次＝冷清（接著是序章）；回訪＝0–1 位站著翻
    else if (id === 'night') {
      // 第一次玩的那一趟從第 2 位才開（第 1 位前面是教學提示、特價箱、王牌提示）；之後每一趟從第 1 位就開
      var first = !(save.runs && save.runs.length), from = (C.crowd && C.crowd.firstRunFrom) || 2, stp = r ? E.nextStep(r) : null;
      if (r && save.prologueDone && !(first && r.pos < from)) {
        if (stp === 'fight') mode = encLootPending(r) ? 'still' : 'live';   // 切磋打贏的戰利品列＝照領獎畫面：店裡的人站著不動（§7.3-8）
        else if (stp === 'stall') { mode = 'still'; o.reserve = ['c-pay']; }   // 今天的攤位：原地照翻、不進不出；c-pay 給同業調貨的站主
      }
    }
    else if (id === 'duel') { mode = 'still'; o.duel = true; o.camMs = 760; }   // 開打清對戰區、鏡頭收完還被切頭的先藏
    else if (id === 'reward') mode = 'still';
    else if (id === 'scene') mode = p.noCrowd ? 'off' : (p.crowd || 'off');     // 序章、收尾、再挑戰開場＝藏；對決後場景（非序章）＝still
    else if (id === 'home' || id === 'taipei') { crowdCall('stop', { keep: true }); return; }   // 換店：藏起來、記著誰在哪，回來照放
    if (mode === 'off') crowdCall('stop'); else crowdCall('start', mode, o);
  }
  // ---- 活店聊天（SPEC-H §5、§6.4、§8）：導演（crowd.js）點人時叫 crowdChat(who, info) → { bubbles:[{text, quote?, src?}], cat }（周姐要讀 lore.json 時回 Promise）。
  //   挑句＝DipCrowdCore.chatPick（輪替、need、空格）；這裡組 ctx（這一趟的事、記得你、架上那張、周姐那張卡）、填空格、記 save.regulars（只標 dirty，收泡泡或換畫面才存）。
  //   空格填不出來一律 null（chatPick 判掉那句），不准拿預設字補（C.crowdFact）；樣板填完超過 maxFilled 字的那句這次不用（§5.4）
  function crowdChatOn() { return !!(UI.crowdOk && W.DipLabCrowd && crowdOn()); }
  function chatLen(s) { return (Array.from ? Array.from(String(s)) : String(s).split('')).length; }
  function chatTexts(l) { return Array.isArray(l.text) ? l.text : [l.text]; }
  function chatFill(t, v) { return String(t).replace(/\{([a-zA-Z]+)\}/g, function (m0, k) { return v && v[k] != null ? String(v[k]) : m0; }); }
  var CHAT_TPL = { shelf: 1, fact: 1, loreIn: 1, loreOut: 1 };
  function chatPool(pool, v) {
    var max = (C.crowdFact && C.crowdFact.maxFilled) || 40;
    return pool.filter(function (l) {
      if (!CHAT_TPL[l.cat]) return true;
      return chatTexts(l).every(function (t) { var f = chatFill(t, v); return /\{[a-zA-Z]+\}/.test(f) || chatLen(f) <= max; });
    });
  }
  // 這一趟的事（trip 類台詞的 need；標題回訪沒有 run＝null → trip 不出）
  function chatTrip(r) {
    var far = r.farBefore | 0;
    return { pos: r.pos, streak: r.streak | 0, hpHalf: r.hp * 2 <= r.maxHp, retried: !!(r.stats && (r.stats.retries | 0) > 0),
      dare: !!(r.dare && E.roundOf && r.dare.round === E.roundOf(r.pos)), bag: (r.bag || []).length, ace: r.ace,
      firstRun: !(save.runs && save.runs.length), newFar: far > 0 && r.pos > far,
      encWon: !!(r.stats && r.stats.spar && (r.stats.spar.won | 0) > 0), encLost: !!(r.stats && r.stats.spar && (r.stats.spar.lost | 0) > 0) };   // 這一趟切磋贏過／輸過（trip 的 need，棒 3d）
  }
  // 卡片空格（C.crowdFact）：年份 1950 以前（多半是錄音、作曲年）、其他地區、三軸並列或都 <4 → null
  function factVars(c, binLabel) {
    var F = C.crowdFact || {}, ok = typeof c.year === 'number' && c.year >= (F.minYear || 1950);
    var ax = ['c', 'o', 'h'].map(function (k) { return [k, +c[k] || 0]; }).sort(function (a, b) { return b[1] - a[1]; });
    return { artist: c.artist || null, album: c.album || null, year: ok ? c.year : null, decade: ok ? Math.floor(c.year / 10) * 10 : null,
      genre: (F.genre || {})[(c.genres || [])[0]] || null, bin: binLabel || null, region: (F.region || {})[c.region] || null,
      tune: ((C.tunes && C.tunes.names) || {})[c.tune] || null,
      axis: ax[0][1] >= (F.axisMin || 4) && ax[0][1] > ax[1][1] ? (F.axis || {})[ax[0][0]] || null : null };
  }
  // 行家摘句（game-lab/lore.json，§6.3）：周姐第一次要講知識段才載；2.5 秒逾時、失敗不快取（下次再試），這一段改用欄位樣板
  var ASSET_V = (function () { try { var s = D.querySelector('script[src*="ui.js"]'), m = s && /[?&]v=([^&]+)/.exec(s.getAttribute('src') || ''); return m ? m[1] : ''; } catch (_) { return ''; } })();
  function loreKey(a) { var s = String(a == null ? '' : a); try { s = s.normalize('NFC'); } catch (_) {} return s.trim().toLowerCase(); }
  function loreOf(c) { var L = UI.lore; return L && L.a && c ? (Array.isArray(L.a[loreKey(c.artist)]) && L.a[loreKey(c.artist)].length ? L.a[loreKey(c.artist)] : null) : null; }
  function loadLore() {
    if (UI.lore) return Promise.resolve(UI.lore);
    if (UI.loreP) return UI.loreP;
    if (typeof W.fetch !== 'function' || Date.now() - (UI.loreFailAt || 0) < 30000) return Promise.resolve(null);   // 剛失敗過：30 秒內這幾段直接用樣板，不一直重打
    var ctl = null; try { ctl = W.AbortController ? new AbortController() : null; } catch (_) { ctl = null; }
    var tm = 0;
    var to = new Promise(function (res) { tm = setTimeout(function () { if (ctl) try { ctl.abort(); } catch (_) {} res(null); }, 2500); });
    var get = W.fetch('lore.json' + (ASSET_V ? '?v=' + encodeURIComponent(ASSET_V) : ''), ctl ? { signal: ctl.signal } : {})
      .then(function (r) { return r && r.ok ? r.json() : null; }).catch(function () { return null; });
    UI.loreP = Promise.race([get, to]).then(function (j) {
      clearTimeout(tm); UI.loreP = null;
      if (j && typeof j === 'object' && j.a && typeof j.a === 'object') UI.lore = j; else UI.loreFailAt = Date.now();
      return UI.lore || null;
    });
    return UI.loreP;
  }
  // 同一張卡這一趟只講一次（記憶體，不存檔）
  function loreSaid() {
    var K = W.DipCrowdCore, tag = save.run && K ? K.tripTag(save.run) : 'title';
    if (!UI.loreSaid || UI.loreSaid.tag !== tag) UI.loreSaid = { tag: tag, ids: {} };
    return UI.loreSaid.ids;
  }
  // 周姐挑哪張卡（§6.4，依序挑到第一個有東西的）：① 她停的那箱架上的 ② NOW 正在放的 ③ 你包包裡的（非王牌、非頂點卡）
  function zhouGroups(r, bin) {
    var said = loreSaid(), G = [];
    var bins = r && r.shop && r.shop.bins, lab = bin && C.bins && C.bins[bin] ? C.bins[bin].label : null;
    G.push((bin && bins && Array.isArray(bins[bin]) ? bins[bin] : []).map(function (id) { return { id: id, onShelf: !!lab, bin: lab }; }));
    var f = FX(), cur = null; try { cur = f && f.music && f.music.current && f.music.current(); } catch (_) {}
    G.push(cur && cur.id ? [{ id: cur.id }] : []);
    var ace = r ? aceIdOf(r) : null;
    G.push((r && Array.isArray(r.bag) ? r.bag : []).filter(function (id) { var c = card(id); return id !== ace && c && !c.tier; }).map(function (id) { return { id: id }; }));
    return G.map(function (g) { return g.filter(function (x) { return card(x.id) && !said[x.id]; }); });
  }
  function zhouPick(G, n, pred) {
    var K = W.DipCrowdCore;
    for (var i = 0; i < G.length; i++) {
      var a = pred ? G[i].filter(pred) : G[i];
      if (a.length) return a[Math.min(a.length - 1, Math.floor(K.hash01(n + '#zhoujie#card#' + i + (pred ? '#lore' : '')) * a.length))];
    }
    return null;
  }
  function zhouCard(x, quotes) {
    var c = card(x.id);
    return { id: x.id, o: c.o, h: c.h, c: c.c, onShelf: !!x.onShelf, lore: !!quotes, quotes: quotes || null, vars: factVars(c, x.onShelf ? x.bin : null), artist: c.artist };
  }
  function regsOf() { if (!save.regulars || typeof save.regulars !== 'object' || !save.regulars.met) save.regulars = fixRegulars(save.regulars); return save.regulars; }
  function crowdChat(who, info) {
    info = info || {};
    var K = W.DipCrowdCore; if (!K || typeof K.chatPick !== 'function' || !save) return null;
    var R = C.regulars || {}, reg = regsOf(), r = save.run, night = !!r && UI.screen === 'night';
    if (who !== 'owner' && who !== 'passer' && !R[who]) return null;
    var trip = night ? chatTrip(r) : null;
    var runTag = night ? K.tripTag(r) : K.titleDayTag(seedKey());   // 標題回訪：同一天第一次才講開場那句
    var runs = save.runs || [], last = runs.length ? (runs[runs.length - 1] || {}).reached | 0 : 0, far = save.best ? save.best.far | 0 : 0;
    var vars = { title: trip ? (C.aceTitle || {})[r.ace] || null : null, pos: trip ? r.pos : null, last: last > 0 ? last : null, far: far > 0 ? far : null };
    UI.chatRecent = UI.chatRecent || {};
    var ctx = { talk: C.crowd && C.crowd.talk, runs: runs.length, trip: trip, metIds: Object.keys(reg.met), visit: info.cats || [], at: info.at || null,
      vars: vars, recent: UI.chatRecent[who] || [] };
    var pool = who === 'owner' ? (C.ownerChat || []) : (C.chat || []), seen, m = null;
    if (who === 'owner') seen = reg.seen.owner;
    else if (who === 'passer') seen = reg.seen.passer;
    else { m = reg.met[who] || null; seen = m ? m.seen : {}; ctx.met = !!m; ctx.talks = m ? m.talks : 0; ctx.againAt = m ? m.againAt : ''; ctx.runTag = runTag; }
    if (info.busy) ctx.cat = 'busy';
    var expert = !!(R[who] && R[who].expert);
    // 架上（shelf）：他停那箱架上的一張；只講那張的專輯名、藝人（不說稀有度、星數、剋誰；§5.6）
    var bins = r && r.shop && r.shop.bins, shelf = info.bin && bins && Array.isArray(bins[info.bin]) ? bins[info.bin].filter(function (id) { return !!card(id); }) : [];
    if (shelf.length) {
      ctx.shelf = shelf;
      if (!expert && who !== 'owner') { var sc = card(shelf[Math.min(shelf.length - 1, Math.floor(K.hash01(reg.n + '#' + who + '#shelf') * shelf.length))]); vars.album = sc.album; vars.artist = sc.artist; }
    }
    var pick = function (kc) {
      var v = Object.assign({}, kc ? kc.vars : {}, vars);
      return K.chatPick({ who: who, pool: chatPool(pool, v), seen: seen, n: reg.n, ctx: Object.assign({}, ctx, kc ? { card: kc } : {}) });
    };
    var done = function (res, kc) {
      if (!res || !res.lines || !res.lines.length) return null;
      reg.n++;
      if (who === 'owner') reg.seen.owner = res.seen && !Array.isArray(res.seen) ? res.seen : reg.seen.owner;
      else if (who === 'passer') reg.seen.passer = Array.isArray(res.seen) ? res.seen : reg.seen.passer;
      else {
        reg.met[who] = K.noteChat(reg.met[who], res, runTag);
        // 同一次來已經打過招呼（標題認識了他、按繼續他還在店裡）：這一趟算遇過了，之後再來也不講開場那句
        if ((info.cats || []).some(function (c) { return c === 'hello' || c === 'again'; })) reg.met[who].againAt = String(runTag);
      }
      UI.chatRecent[who] = res.recent || [];
      UI.chatDirty = true;
      var v = Object.assign({}, kc ? kc.vars : {}, vars), out = [];
      var quote = null;
      if (res.mode === 'lore' && kc && kc.quotes) {
        quote = { text: kc.quotes[Math.min(kc.quotes.length - 1, Math.floor(K.hash01(reg.n + '#zhoujie#q') * kc.quotes.length))], quote: true,
          src: chatFill((C.crowdUi && C.crowdUi.src) || '{artist}', { artist: kc.artist }) };
      }
      res.lines.forEach(function (l, i) {
        if (quote && i === res.quoteAt) { out.push(quote); quote = null; }
        chatTexts(l).forEach(function (t) { out.push({ text: chatFill(t, v) }); });
      });
      if (quote) out.push(quote);
      if (kc && res.cat === 'know') loreSaid()[kc.id] = true;
      return { bubbles: out, cat: res.cat };
    };
    if (!expert || info.busy) return done(pick(null), null);
    // 周姐：先用欄位樣板的卡乾挑一次；挑到知識段才去讀 lore.json（不先載、不拖慢開店），讀到了改從「有摘句的藝人」挑卡（摘句 80／樣板 20）
    var G = zhouGroups(r, info.bin), fx = zhouPick(G, reg.n), plain = fx ? zhouCard(fx, null) : null;
    var res0 = pick(plain);
    if (!res0 || res0.cat !== 'know') return done(res0, plain);
    return loadLore().then(function () {
      var lx = UI.lore ? zhouPick(G, reg.n, function (x) { return !!loreOf(card(x.id)); }) : null;
      if (!lx) return done(res0, plain);
      var kc = zhouCard(lx, loreOf(card(lx.id))), rk = pick(kc);
      return rk ? done(rk, kc) : done(res0, plain);
    });
  }
  // 收泡泡、換畫面時才存（聊天計數只標 dirty；§8）
  function crowdChatEnd() { if (UI.chatDirty) { UI.chatDirty = false; persist(); } }
  // 第一次的提示（§3.2）：dry＝只問要不要講；不然記 save.seen、存檔、回那句（老闆用聊天泡泡講）
  function crowdHint(kind, dry) {
    var key = kind === 'intro' ? 'crowdIntro' : kind === 'expertIntro' ? 'expertIntro' : null;
    var text = key && C.crowdUi && C.crowdUi[kind];
    if (!key || !text || !save || !save.seen || save.seen[key]) return dry ? false : null;
    if (dry) return true;
    save.seen[key] = true; persist();
    return text;
  }
  // 老闆其他話講完、沒有別人在講（挑戰者開場白、教學泡泡）
  function crowdQuiet() {
    if ((UI.oSayTill || 0) > Date.now()) return false;
    var a = app(); return !(a && (qs('.ds-say:not(.chat)', a) || qs('.lb-toast:not(.out)', a) || qs('.lb-sheet', a)));   // 店內通知（吐司）、面板也算在講
  }
  // UI.sayTill（§5.2）：老闆或任何聊天中的人講到幾時（挑戰者走到對戰台的開場白等它、客人去結帳看它）
  function sayTill() { return Math.max(UI.oSayTill || 0, +crowdCall('chatTill') || 0); }
  // 老闆「聊聊」：C.ownerChat 一段；一個空檔最多 3 段（同熟客），之後回到 ownerHint
  function ownerChatBeat() {
    var K = W.DipCrowdCore, tag = save.run && K ? K.seqTag(save.run) : '';
    if (!UI.ownerChatN || UI.ownerChatN.tag !== tag) UI.ownerChatN = { tag: tag, n: 0 };
    var max = (C.crowd && C.crowd.talk && C.crowd.talk.beatsPerVisit) || 3;
    if (UI.ownerChatN.n < max && crowdChatOn() && crowdCall('ownerTalk')) { UI.ownerChatN.n++; return; }
    stageSay('o', line('ownerHint', 'night'), 'owner', 2600);
  }
  // 存檔 save.regulars（§8；不升 SAVE_V）：不是物件 → 預設；數字不是非負整數 → 0；againAt 不是字串或超過 40 字 → ''；
  //   seen 每一類只留字串、最多 64 筆（執行期再照池子大小砍、不認得的 id chatPick 自己丟）；met 只留 C.regulars 的鍵
  function fixRegulars(x) {
    var R = C.regulars || {}, o = x && typeof x === 'object' && !Array.isArray(x) ? x : {};
    var nn = function (v) { return typeof v === 'number' && isFinite(v) && v >= 0 && Math.floor(v) === v ? v : 0; };
    var obj = function (v) { return v && typeof v === 'object' && !Array.isArray(v) ? v : {}; };
    var ids = function (a) { return (Array.isArray(a) ? a : []).filter(function (s) { return typeof s === 'string'; }).slice(-64); };
    var cats = function (v) { var out = {}; v = obj(v); Object.keys(v).forEach(function (k) { if (Array.isArray(v[k])) out[k] = ids(v[k]); }); return out; };
    var met = {}, M = obj(o.met);
    Object.keys(M).forEach(function (id) {
      if (!R[id] || !M[id] || typeof M[id] !== 'object' || Array.isArray(M[id])) return;
      var e = M[id];
      met[id] = { talks: nn(e.talks), againAt: typeof e.againAt === 'string' && e.againAt.length <= 40 ? e.againAt : '', seen: cats(e.seen) };
    });
    var sn = obj(o.seen), en = obj(o.enc);
    return { v: 1, n: nn(o.n), met: met, seen: { passer: ids(sn.passer), owner: cats(sn.owner) },
      enc: { offered: nn(en.offered), fought: nn(en.fought), won: nn(en.won), lost: nn(en.lost) } };
  }
  // iOS < 15.4 沒有 svh：100vh 會比可視區高。改用可視高。
  function svhFallback() {
    var ok = false; try { ok = !!(W.CSS && CSS.supports && CSS.supports('height', '100svh')); } catch (_) {}
    if (ok) return;
    var fit = function () { var a = app(); if (!a) return; var h = W.visualViewport ? Math.min(W.innerHeight, W.visualViewport.height) : W.innerHeight; if (h > 0) a.style.height = Math.round(h) + 'px'; };
    fit(); W.addEventListener('resize', fit); if (W.visualViewport) W.visualViewport.addEventListener('resize', fit);
  }
  function configTut() {
    var T = TUT(); if (!T || typeof T.configure !== 'function') return;
    try {
      T.configure({ stage: UI.stage, content: C, save: function () { return UI.tutReplay ? (UI.replaySave || (UI.replaySave = { seen: {}, learned: {} })) : save; }, persist: persist,
        onEnd: function (how) { if ((how === 'done' || how === 'skipped' || how === 'released') && !UI.tutReplay) { save.tutorialDone = true; if (save.run) save.run.tut = false; persist(); } } });
    } catch (e) { console.error(e); }
  }
  // ======================================================================= 背景音樂（第 I 波 §4；店主 11-20 第 4 點「平時沒有對戰的時候 播放自己唱片包裡的專輯 隨機輪流放 並且在收音機那邊彈出顯示正在播放的音樂」）
  //   哪些畫面：有 run 的來客（含攤位）、領獎、說情（go('scene', {bgm:true})）。對決、序章與劇本、你家、台北地圖、結算、標題都不輪播（正在放的那首放完就停）。
  //   放什麼：這一趟包包裡有試聽的（王牌、頂點卡不放；卡池的卡等 cards-media.json 套上才有試聽）；樂歷 Lv5 起 ⏸ 可選「包包＋唱片櫃」＝每輪包包放完多一張唱片櫃的。
  //   UI.playlist（只在記憶體，重新整理重洗）：hash01(seedKey#runNo#bgm#第幾輪) 排序、照順序放、每張放過一次才重洗（已在快取的排前面、剛放完那張不排第一）；
  //     這一輪新收進包包的插到最前面；賣掉的跳過；攤位「店裡唱盤」放上去那張（bgmFront）馬上放、佇列接著。
  //   優先序：玩家點的（試聽機、唱片資訊、收音機轉頻率、店裡唱盤、你家）＞劇本＞勝利曲＞輪播：輪播只在沒有歌在放時接下一首
  //     （自然放完 400 ms 後；maxMs 淡出靠 fx music.onIdle 1.5 秒；唱片資訊、試聽機、收音機面板關掉 1.5 秒後看一次）。
  //   抓不到跳下一首（連試 3 首都不行＝60 秒後再試）；行動網路、一次造訪新抓滿 30 首＝只放快取裡的；10 分鐘沒點畫面＝淡出停，下一次點擊接著放；
  //   跟著 iPhone 靜音鍵（fx play 的 session 'ambient'）。⏸：背景音樂 開／關（save.settings.bgm；沒設＝開，saveData 時關）、音樂音量（musicVol）、Lv5 起 背景音樂放（bgmSrc）。
  //   收音機旁（.np-ic／.np-pop，DOM，不畫進 canvas）：♪ 小圖示（有歌時一直在；聲音或背景音樂關＝灰、沒字；這次造訪還沒點過畫面＝「點我放歌」）＋
  //     「♪ 正在播放／藝人《專輯》」泡泡：第一首、點 ♪、或距離上一次展開 ≥2 分鐘又換了一張才展開，停 6 秒；試聽機、收音機面板、唱片資訊開著時不展開；
  //     位置照順序試收音機上方、左下、正左、正下，選第一個整個在鏡頭裡、不蓋小熱點（牆上封面、海報、櫃檯「正在放」）、名牌、泡泡、吐司、熟客人物矩形、底部面板的；
  //     自動展開擺不下再試一次「可以蓋小熱點、照樣不蓋人」（post 審查：360／375 上方那兩格一定撞牆上封面）；都不行＝只有小圖示（不吃掉第一首／2 分鐘的額度，8 秒內再試）；
  //     點 ♪ 才依序放寬（不看人物 → 也不看小熱點）。鏡頭在動、熟客在聊天、聊天剛收 0.6 秒內、切磋挑戰者走過來到嗆完（第一次再加老闆提示講完）（自動展開）＝等（等的不算進 8 秒，最多多等 20 秒；第三輪審查 F4／F5）；聊天中點 ♪＝避開聊天泡泡擺。
  //     ♪ 被鏡頭夾到上緣往下移、點擊區疊到點得到的小熱點＝藏起來（第三輪審查 F3：切磋戰利品列）。
  //     展開中：走過的熟客不擠掉（只有名牌、泡泡、面板、出鏡頭才換位置／收）；被吐司疊到＝淡掉、計時停住，吐司走了再出來；還沒停滿就被擠掉＝額度退回、這首再排一次。
  //     熟客聊天泡泡優先：聊天泡泡一出來，展開中的泡泡收成小圖示。泡泡只是字卡（不擋點擊：兩尺寸每個候選位置都蓋得到挖寶箱的點擊點）；
  //     第二行「藝人《專輯》」一行截斷，放不下的展開 1.1 秒後慢慢捲到尾巴（post 審查：專輯名多半在被截掉的那段）。
  //     點 ♪＝展開 6 秒、泡泡開著再點 ♪＝那張的唱片資訊（第 I 波修正輪，審查 L11）。♪ 在名牌、泡泡底下（z 4），右上角被泡泡疊到就換位置。
  //   只顯示卡片欄位（藝人《專輯》），不寫曲名（沒有資料，不編）。櫃檯唱盤的封面跟著正在放的那張（stage.setNow；對決中不換、停了回 dip.json 那張）。
  //   ftok＝fx 那一次 play 的號碼（cancel 用）；hidPend＝切背景期間有一首該接沒接（回前景點一下接著放）；liveAt＝最後一次確定在響；tapWant＝點 ♪ 時還沒響（響了再展開）
  //   popLvl／popIdx＝展開中那個位置放寬到第幾層（NP_LV）／第幾個候選；popTap＝這次是點 ♪ 開的；popPrev＝展開前的「第一首／上一次展開」（提早被擠掉＝退回額度）；
  //   popChat＝展開時熟客已經在聊天（點 ♪ 開的：那一段聊天不收，下一段聊天出來才收）；popRe＝這首提早收掉後已經再排過一次；mqT＝第二行捲動的計時；
  //   popEnd＝該收的時刻（被吐司藏起來的時間往後延）；duckAt＝開始被吐司藏起來的時刻；closeWhy＝上一次提早收的原因（e2e／除錯看）；raf、camKey、camAt＝每一格看鏡頭動了沒（最後動的時間）；radioSt／radioArt＝收音機熱點的美術座標（找一次）
  var BGM = { zone: false, first: false, cur: null, mine: false, tok: 0, ftok: 0, loading: false, fails: 0, retryT: 0, resumeT: 0, idleT: 0, idle: false, hidPend: false, fetched: 0, liveAt: -1e9, tapWant: 0, lastOn: null, chatAt: -1e9,
    popAt: -1e9, popT: 0, popOpen: false, popId: null, popTry: null, popLvl: 0, popTap: false, popIdx: 0, popPrev: null, popChat: false, popRe: false, mqT: 0, popEnd: 0, duckAt: 0, ic: null, pop: null, icMode: null, iv: 0, raf: 0, camKey: '', camAt: -1e9, radioSt: null, radioArt: null };
  function BU(k, o) { var U = (C && C.bgm && C.bgm.ui) || {}; return fill(typeof U[k] === 'string' ? U[k] : '', o || {}); }
  function bgmCfg(k, d) { var v = C && C.bgm && C.bgm[k]; return typeof v === 'number' && isFinite(v) ? v : d; }
  function bgmOn() {
    var b = save && save.settings && save.settings.bgm; if (b === true || b === false) return b;
    try { return !(W.navigator.connection && W.navigator.connection.saveData); } catch (_) { return true; }
  }
  function bgmVols() { var V = C && C.bgm && C.bgm.vols; return Array.isArray(V) && V.length === 3 ? V : [0.3, 0.5, 0.7]; }
  function bgmVol() { var V = bgmVols(), v = save && save.settings && save.settings.musicVol; return V.indexOf(v) >= 0 ? v : V[1]; }
  function bgmVolName() { var N = (C.bgm && C.bgm.ui && C.bgm.ui.volNames) || [], i = bgmVols().indexOf(bgmVol()); return N[i] || ''; }
  function bgmShelfOpen() {
    if (!careerOk() || !E.ladderList) return false;
    try { return E.ladderList(C, careerLv().level).some(function (L) { return L.key === 'bgmShelf' && L.open; }); } catch (_) { return false; }
  }
  // 行動網路（沒有 navigator.connection 的瀏覽器照 Wi-Fi 算）
  function bgmCell() { try { var n = W.navigator.connection; return !!(n && (n.type === 'cellular' || /^(slow-2g|2g|3g)$/.test(n.effectiveType || ''))); } catch (_) { return false; } }
  // 'on'｜'locked'（偏好開著、這次造訪還沒點過畫面）｜'off'（玩家自己關了聲音）
  function sndState() {
    var f = FX(); if (!f || (save && save.settings && save.settings.sound === false)) return 'off';
    try { return f.soundState ? f.soundState() : (f.soundOn() ? 'on' : 'off'); } catch (_) { return 'off'; }
  }
  function bgmZoneNow() {
    var r = save && save.run, s = UI.screen;
    if (!r || r.prologue === 'pending' || UI.tune || UI.tutReplay) return false;
    return s === 'night' || s === 'reward' || (s === 'scene' && !!(UI.params && UI.params.bgm));
  }
  // 有歌在放（或已經接上、context 正在 resume）／在抓：輪播不另外開一首
  function bgmBusy() { var f = FX(); try { return !!(f && f.music && (f.music.playing() || (f.music.loading && f.music.loading()) || (f.music.session && f.music.session() && !bgmHidden()))); } catch (_) { return false; } }
  // fx 那首接上了（回前景點一下時 AudioContext 還在 resume，playing() 會晚一拍才是 true）
  function bgmSounding() { var f = FX(); try { return !!(f && f.music && (f.music.playing() || (f.music.session && f.music.session() && !bgmHidden()))); } catch (_) { return false; } }
  function bgmHidden() { try { return !!D.hidden; } catch (_) { return false; } }
  // ---- 佇列
  function plAces() { return TIERS.map(function (t) { return C.aces[t]; }); }
  // 王牌、頂點卡不放（§4.2-2）：三張預設王牌、這一趟的王牌（?apex=1 挑了頂點卡當王牌＝那張）、有 tier 的頂點卡（E.canSeed 為 false；?apex=1 打倒藏家拿到的；第三輪審查 F2）
  function plSkip(id) { var r = save.run; return id === aceIdOf(r) || plAces().indexOf(id) >= 0 || !E.canSeed(C, id); }
  function plBag() {
    var r = save.run, out = [];
    (r.bag || []).forEach(function (id) { var c = card(id); if (c && c.previewUrl && cardVis(id) && out.indexOf(id) < 0 && !plSkip(id)) out.push(id); });
    return out;
  }
  function plShelf(P) {
    if (save.settings.bgmSrc !== 'both' || !bgmShelfOpen()) return [];
    var h = function (id) { return E.hash01(P.key + '#bgmShelf#' + id); };
    return Object.keys(save.shelf || {}).filter(function (id) { var c = card(id); return c && c.previewUrl && isOwned(id) && cardVis(id) && P.bag.indexOf(id) < 0 && !plSkip(id); })
      .sort(function (a, b) { return h(a) - h(b); });
  }
  function plCached(id) { var f = FX(), c = card(id); try { return !!(f && f.music && f.music.cached && c && c.previewUrl && f.music.cached(c.previewUrl)); } catch (_) { return false; } }
  // 快取裡有（抓完了或正在抓）＝這一下不會多一次下載
  function plInCache(id) { var f = FX(), c = card(id); try { return !!(f && f.music && c && c.previewUrl && (f.music.inCache ? f.music.inCache(c.previewUrl) : f.music.cached(c.previewUrl))); } catch (_) { return false; } }
  function plOnlyCached() { return bgmCell() || BGM.fetched >= bgmCfg('fetchMax', 30); }
  function plState() {
    var r = save.run, key = r.seedKey + '#' + r.runNo, P = UI.playlist;
    if (!P || P.key !== key) P = UI.playlist = { key: key, cycle: 0, queue: [], known: null, last: null, front: null, shelfDue: false, shelfN: 0, bag: [] };
    var bag = plBag();
    if (!P.known) { P.known = {}; bag.forEach(function (id) { P.known[id] = 1; }); }
    else bag.forEach(function (id) { if (!P.known[id]) { P.known[id] = 1; P.queue = [id].concat(P.queue.filter(function (x) { return x !== id; })); } });   // 這一輪新收的：插到最前面
    P.queue = P.queue.filter(function (id) { return bag.indexOf(id) >= 0; });                                                                                 // 賣掉的跳過
    P.bag = bag;
    return P;
  }
  function plShuffle(P) {
    P.cycle++;
    var h = function (id) { return E.hash01(P.key + '#bgm#' + P.cycle + '#' + id); };
    var q = P.bag.slice().sort(function (a, b) { return h(a) - h(b); });
    q = q.filter(plCached).concat(q.filter(function (id) { return !plCached(id); }));   // 已在快取的排前面
    if (q.length > 1 && q[0] === P.last) q.push(q.shift());                             // 剛放完那張不排第一
    P.queue = q; P.shelfDue = true;
  }
  // 下一首：take＝拿走（輪到它了）；false＝只看（預抓）
  function plNext(take) {
    if (!save.run) return null;
    var P = plState(), ok = plOnlyCached() ? plCached : function () { return true; };
    if (P.front) { var fr = P.front; if (take) { P.front = null; P.last = fr; } return fr; }
    var pick = function () { for (var i = 0; i < P.queue.length; i++) if (ok(P.queue[i])) return take ? P.queue.splice(i, 1)[0] : P.queue[i]; return null; };
    var id = pick();
    if (!id && take) {
      if (P.shelfDue) { P.shelfDue = false; var sh = plShelf(P).filter(ok); if (sh.length) id = sh[P.shelfN++ % sh.length]; }   // 包包放完一輪：唱片櫃一張（Lv5 包包＋唱片櫃）
      if (!id && P.bag.length) { plShuffle(P); id = pick(); }
    }
    if (id && take) P.last = id;
    return id;
  }
  // ---- 放
  function bgmNext(o) {
    o = o || {};
    var f = FX(); if (!f || !f.music || !BGM.zone || !save.run) return;
    clearTimeout(BGM.retryT); BGM.retryT = 0; clearTimeout(BGM.resumeT); BGM.resumeT = 0;
    if (!bgmOn() || BGM.idle || sndState() === 'off') { npSync(); return; }
    // 切到背景（審查 H1）：背景裡排著的計時器（接回、重試、放完接下一首）到點也叫到這裡——不放、不拿佇列（B13 切背景停）；回前景點一下再接著放（bgmTap）
    if (bgmHidden()) { BGM.hidPend = true; return; }
    var P = plState();
    try { if (f.music.cacheFor) f.music.cacheFor(P.bag.length + (plShelf(P).length ? 1 : 0)); } catch (_) {}
    var id = plNext(true), c = id ? card(id) : null;
    if (!c) { BGM.cur = null; BGM.mine = false; BGM.liveAt = -1e9; npSync(); return; }   // 沒有可放的（卡池媒體還沒到、行動網路沒有下載過的）：不輪播、不出泡泡
    var tok = ++BGM.tok, why = {}, p = null;
    // 一次造訪新抓上限（審查 M6）：照「這一下會不會真的下載」算——逾時放棄的那首 fetch 照樣整首下載完，也要算
    if (!plInCache(id)) BGM.fetched++;
    BGM.cur = id; BGM.mine = true; BGM.loading = true;
    // giveUpMs：背景音樂沒有動畫要對拍，抓檔等久一點（慢網路 1 MB 要 3 秒上下；fx 預設 2.5 秒會讓每首都逾時、每 3 首停 60 秒）
    try { p = f.music.play(c, { fadeMs: bgmCfg('fadeIn', 1200), session: o.front ? undefined : 'ambient', exclusive: !!o.front, giveUpMs: bgmCfg('giveUpMs', 12000), why: why }); } catch (e) { console.error(e); }
    BGM.ftok = why.tok || 0;
    npSync();
    bgmWatch(tok, id, p, why);
  }
  // 等輪播那一次 play 的結果（bgmNext 自己放的、bgmAdopt 接管 fx 接回的那一次）
  function bgmWatch(tok, id, p, why) {
    Promise.resolve(p).then(function (ok) {
      if (tok !== BGM.tok) return;
      BGM.loading = false; BGM.ftok = 0;
      if (ok) { BGM.fails = 0; bgmPreload(); npSync(); return; }
      if (why.r === 'silent' || why.r === 'hidden') { npSync(); return; }             // 還沒點過畫面／抓到一半切背景：唱盤上那張換了、不出聲（回前景點一下 fx 從頭放這張）
      if (why.r === 'stale') { if (BGM.cur === id) BGM.mine = false; npSync(); return; }   // 玩家點的蓋過去了
      if (!BGM.zone) return;
      BGM.fails++;                                                                     // 抓不到：跳下一首；連 3 首都不行＝60 秒後再試
      if (BGM.fails >= bgmCfg('tries', 3)) {
        BGM.fails = 0; BGM.cur = null; BGM.mine = false; BGM.liveAt = -1e9; npSync();
        BGM.retryT = setTimeout(function () { BGM.retryT = 0; bgmKick(); }, bgmCfg('retryMs', 60000));
        return;
      }
      bgmNext();
    }, function () { if (tok === BGM.tok) { BGM.loading = false; BGM.ftok = 0; } });
  }
  // fx 接回唱盤上那張（music.onResume：「點我放歌」、聲音重開、回前景點一下）：是輪播那張（'ambient'）＝交給輪播管——
  //   抓不到照樣跳下一首、離開輪播畫面／關背景音樂時作廢（第 I 波 post 審查 K：不然慢網路點了「點我放歌」2.5 秒放棄之後就沒人接、一直沒聲音）
  function bgmAdopt(info) {
    if (!info || info.session !== 'ambient' || !info.card || !info.p || !BGM.zone) return;
    clearTimeout(BGM.retryT); BGM.retryT = 0; clearTimeout(BGM.resumeT); BGM.resumeT = 0;
    var tok = ++BGM.tok, id = info.card.id;
    BGM.cur = id; BGM.mine = true; BGM.loading = true; BGM.ftok = info.tok || 0;
    npSync();
    bgmWatch(tok, id, info.p, info.why || {});
  }
  // 取消還在抓的那首輪播（離開輪播畫面、⏸ 關背景音樂、閒置停；審查 H2／M3）：fx 那一次 play 作廢（抓完也不響）、那張放回佇列最前面（下次接著）
  function bgmCancel() {
    if (!BGM.loading) return;
    var f = FX(), id = BGM.cur;
    BGM.tok++; BGM.loading = false;
    try { if (BGM.ftok && f && f.music && f.music.cancel) f.music.cancel(BGM.ftok); } catch (_) {}
    BGM.ftok = 0;
    plBack(id);
    BGM.cur = null; BGM.mine = false;
  }
  // 那張沒放到就作廢了：放回佇列最前面（下次接著；還在包包裡、佇列裡沒有才放）
  function plBack(id) { var P = UI.playlist; if (id && P && P.queue.indexOf(id) < 0 && (P.bag || []).indexOf(id) >= 0) P.queue.unshift(id); }
  // 輪播那首（'ambient'）停掉；玩家點的、店裡唱盤照放。沒在響、但切背景時記下的（回前景會從頭放）是輪播的＝也清掉
  function bgmStopAmbient(ms) {
    var f = FX(); if (!f || !f.music) return;
    try {
      var ss = f.music.session ? f.music.session() : null, pd = f.music.pending ? f.music.pending() : null;
      if (ss === 'ambient') f.music.stop({ fadeMs: ms });
      else if (!ss && pd && pd.session === 'ambient') f.music.stop({ fadeMs: 0 });
    } catch (_) {}
  }
  // 預抓下一首（只抓一首；背景音樂關、行動網路、新抓滿上限、閒置、切背景、已在快取＝不抓）
  function bgmPreload() {
    var f = FX(); if (!f || !f.music || !f.music.preload || !BGM.zone || !bgmOn() || BGM.idle || bgmHidden() || !soundOn() || plOnlyCached()) return;
    var id = plNext(false), c = id ? card(id) : null;
    if (!c || id === BGM.cur || plInCache(id)) return;
    BGM.fetched++;
    try { f.music.preload([c]); } catch (_) {}
  }
  // 進輪播畫面、重畫：沒有歌在放就放下一首（沒點過畫面＝只換唱盤上那張）
  function bgmStart() {
    var f = FX(); if (!f || !f.music || !BGM.zone) return;
    npSync();
    if (!bgmOn() || BGM.idle || BGM.retryT || BGM.loading) return;
    var st = sndState(); if (st === 'off') return;
    if (st === 'locked') { if (!f.music.current()) bgmNext(); return; }
    if (bgmBusy()) { bgmResume(4000); return; }   // 勝利曲、玩家點的在放：等它放完（抓不到不會發 ended：4 秒後再看一次）
    bgmNext();
  }
  // 玩家點的那首放完、唱片資訊／試聽機／收音機面板關掉：一會兒後沒有歌在放就接回輪播（佇列接著）
  function bgmResume(ms) {
    clearTimeout(BGM.resumeT);
    BGM.resumeT = setTimeout(function () { BGM.resumeT = 0; bgmKick(); }, ms == null ? bgmCfg('resumeMs', 1500) : ms);
  }
  // 到點再看一次：沒有歌＝放下一首；輪播自己那首在抓＝等它的結果（bgmWatch）；別人那首（玩家點的）還在抓、沒在響＝過 1.5 秒再看
  //   （抓不到不會發 ended／idle：不再看一次，輪播就整條停到下一次換畫面；第 I 波 post 審查 A）。在響＝放完會發 ended／idle
  function bgmKick() {
    if (!BGM.zone || BGM.loading) return;
    if (!bgmBusy()) { bgmNext(); return; }
    if (!bgmSounding()) bgmResume(1500);
  }
  // 「店裡唱盤」攤（stalls.js）放上去那張：插到佇列最前面、馬上放；不在輪播畫面或背景音樂關＝照舊直接放
  function bgmFront(id) {
    var c = card(id), f = FX(); if (!c || !f || !f.music) return;
    if (!BGM.zone || !bgmOn() || !save.run) { if (c.previewUrl && soundOn()) try { f.music.play(c, { fadeMs: 600 }); } catch (e) { console.error(e); } return; }
    var P = plState(); P.queue = P.queue.filter(function (x) { return x !== id; }); P.front = id;
    BGM.idle = false;
    bgmNext({ front: true });
  }
  // ⏸「背景音樂」切了：關＝還在抓的那首作廢、正在響的輪播停（審查 M3）；玩家點的照放
  function bgmToggled() {
    if (bgmOn()) { BGM.idle = false; if (BGM.zone) bgmStart(); return; }
    clearTimeout(BGM.retryT); BGM.retryT = 0; clearTimeout(BGM.resumeT); BGM.resumeT = 0;
    bgmCancel(); bgmStopAmbient(800);
    BGM.cur = null; BGM.mine = false; npClose(true); npSync();
  }
  // 換畫面（go 的最後）：進／出輪播畫面
  function bgmSync() {
    if (!save) return;
    if (UI.screen !== 'duel') { var f = FX(), cur = null; try { cur = f && f.music && f.music.current ? f.music.current() : null; } catch (_) {} stg('setNow', cur ? cur.id : null); }   // 對決裡響起的勝利曲：出了對決才換上櫃檯
    if (!bgmZoneNow()) { if (BGM.zone) bgmLeave(); return; }
    if (!BGM.zone) { BGM.zone = true; BGM.first = true; BGM.camKey = ''; BGM.camAt = now(); npLoop(true); }   // camAt：進畫面的鏡頭移動常常晚一兩格才開始，先當它在動
    bgmStart();
  }
  // 出輪播畫面：排著的接回／重試收掉、還在抓的那首作廢（不然抓完會在對決、標題、劇本裡響起來；審查 H2）；audioSession 切回 'playback'（對決音效不跟著靜音鍵；審查 M4）
  function bgmLeave() {
    BGM.zone = false; BGM.first = false; BGM.fails = 0; BGM.hidPend = false; BGM.tapWant = 0;
    clearTimeout(BGM.retryT); BGM.retryT = 0; clearTimeout(BGM.resumeT); BGM.resumeT = 0;
    bgmCancel();
    var f = FX();
    // 唱盤上留著的是輪播那首、但已經沒在響（放完、接下一首的空檔）＝收掉（對決、標題的 ⏸ 不會寫「暫停中」那張、回前景也不會又放它）；還在響＝照舊放完
    //   唱盤上還沒有任何一張、但 fx 記著輪播那首要接回（新開頁第一首還在抓時 ⏸ 關聲音：mute() 記成 pending 'ambient'、M.card 還是空的）＝也清掉
    //   （第 I 波第三輪審查 F1：不然在對決裡打開聲音，fx 照 'ambient' 放輪播那首、audioSession 被切成跟著靜音鍵）；別人那首還在抓＝不動（stop 會把它作廢）
    try { var pd = f && f.music && f.music.pending ? f.music.pending() : null, cu = f && f.music && f.music.current ? f.music.current() : null,
      ld = !!(f && f.music && f.music.loading && f.music.loading());
      var clr = !cu && !ld && pd && pd.session === 'ambient';   // 那首一聲都沒響過＝清掉之後放回佇列最前面（跟 bgmCancel 一樣，這一輪不會少放一張）
      if (!bgmSounding() && ((cu && (cu.id === BGM.cur || cu.id === BGM.lastOn || (pd && pd.session === 'ambient'))) || clr)) { f.music.stop({ fadeMs: 0 }); if (clr) plBack(pd.card.id); } } catch (_) {}
    try { if (f && f.sessionPlayback) f.sessionPlayback(); } catch (_) {}   // 輪播那首還在響（回標題）＝fx 先不切，下一次點畫面再切（bgmTap）
    npLoop(false); npClose(true); npHide();
  }
  // fx music.onChange：櫃檯唱盤換封面；輪播那首真的響了＝看要不要展開泡泡
  function bgmOnChange(c) {
    if (UI.screen !== 'duel') stg('setNow', c ? c.id : null);   // 對決中不換；停了回 dip.json 那張
    if (!BGM.zone) return;
    var f = FX(), on = !!(c && bgmSounding()), amb = false;
    try { amb = on && !!f.music.session && f.music.session() === 'ambient'; } catch (_) {}
    if (amb) BGM.cur = c.id;                                      // fx 自己接回來的輪播（回前景點一下、聲音重開、唱片資訊關掉）也是輪播的：⏸ 關背景音樂、閒置停得掉（審查 M5）
    BGM.mine = !!(c && BGM.cur && c.id === BGM.cur);
    if (on) BGM.liveAt = now();
    if (on && BGM.mine) BGM.lastOn = c.id;                       // 最後一首真的響過的輪播（離開輪播畫面時唱盤上還是它、又沒在響＝收掉）
    if (on && BGM.tapWant > now()) { BGM.tapWant = 0; npOpen(c, { tap: true }); }   // 點 ♪ 時還在抓／換歌空檔：響了再展開
    else if (BGM.mine && on) {
      if (BGM.first || now() - BGM.popAt >= bgmCfg('popGap', 120000)) npOpen(c);
      else npBump();
    } else if (on) npBump();
    if (BGM.popOpen && c && BGM.popId !== c.id && BGM.pop) npText(c);   // 展開中換了歌：字跟著換（不重新計時）
    npSync();
  }
  // 點畫面（document 捕獲）：閒置計時重算；閒置停了、切背景期間該接下一首的＝接著放
  function bgmTap() {
    clearTimeout(BGM.idleT);
    BGM.idleT = setTimeout(bgmIdleOut, bgmCfg('idleMs', 600000));
    if (!BGM.zone) { var f = FX(); try { if (f && f.sessionPlayback) f.sessionPlayback(); } catch (_) {} }   // 出了輪播畫面、輪播那首放完之後的第一下：切回 'playback'（審查 M4）
    if (!BGM.idle && !BGM.hidPend) return;
    BGM.idle = false; BGM.hidPend = false;
    if (!BGM.zone) return;
    // 等這一下的其他捕獲處理跑完再看（fx 回前景那一下會先把切走時那首從頭放）：已經有歌在放／在抓＝不另外開一首（審查 M5）
    setTimeout(function () { if (BGM.zone) bgmStart(); }, 0);
  }
  // 10 分鐘沒點畫面：還在抓的作廢、輪播那首淡出停、不再預抓；下一次點擊接著放
  function bgmIdleOut() {
    BGM.idle = true;
    clearTimeout(BGM.retryT); BGM.retryT = 0; clearTimeout(BGM.resumeT); BGM.resumeT = 0;
    if (BGM.zone) {
      bgmCancel();
      var f = FX(); try { if (f && f.music && f.music.session && f.music.session() === 'ambient') f.music.stop({ fadeMs: 2000 }); } catch (_) {}
    }
    npClose(true); npSync();
  }
  // ---- 收音機旁：♪ 小圖示＋「正在播放」泡泡
  //   泡泡只是字卡（pointer-events none；審查 L11）：底下的挖寶箱、熟客照點得到。要看那張的唱片資訊＝泡泡開著時再點一次 ♪
  function npMount() {
    var host = UI.stage && UI.stageHost; if (!host) return false;
    if (!BGM.ic || !BGM.ic.isConnected) {
      if (BGM.ic && BGM.ic.parentNode) BGM.ic.remove();
      var ic = BGM.ic = D.createElement('button'); ic.type = 'button'; ic.className = 'np-ic'; ic.style.display = 'none'; BGM.icMode = null;
      ic.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        var f = FX(); if (!f || !f.music) return;
        if (BGM.icMode === 'tap') {                                    // 點我放歌＝手勢：解鎖、開始出聲（唱盤上那張接著放）
          try { if (f.init) f.init(); f.unlockFromGesture(true); } catch (err) { console.error(err); }
          save.settings.sound = true; persist(); npSync(); bgmResume(600); return;
        }
        if (BGM.icMode !== 'on') return;
        var c = null, on = bgmSounding(); try { c = f.music.current(); } catch (_) {}
        if (BGM.popOpen && c && on) { var id = c.id; npClose(true); if (card(id)) info(id, { from: 'np' }); return; }   // 泡泡開著再點 ♪＝那張的唱片資訊
        npBump();                                                      // 先有回饋（擺不下、熟客在聊天時也看得到點到了）
        if (c && on) npOpen(c, { tap: true });
        else BGM.tapWant = now() + 4000;                                // 還在抓／換歌空檔：響了再展開
      });
      host.appendChild(ic);
    }
    if (!BGM.pop || !BGM.pop.isConnected) {
      if (BGM.pop && BGM.pop.parentNode) BGM.pop.remove();
      var pop = BGM.pop = D.createElement('div'); pop.className = 'np-pop'; pop.style.display = 'none'; pop.setAttribute('role', 'status'); pop.setAttribute('aria-live', 'polite');
      host.appendChild(pop);
    }
    return true;
  }
  function npHide() { if (BGM.ic) BGM.ic.style.display = 'none'; if (BGM.pop) BGM.pop.style.display = 'none'; BGM.icMode = null; }
  // 收音機熱點（舞台 host 的 CSS 座標）；沒有（你家）＝null。美術座標只找一次（每一格鏡頭移動都要算）
  function npRadio() {
    var st = UI.stage, h = null; if (!st || !st.hotspots || !st.cssOf) return null;
    if (BGM.radioSt !== st || !BGM.radioArt) {
      try { h = (st.hotspots() || []).filter(function (x) { return x.id === 'radio'; })[0]; } catch (_) { h = null; }
      BGM.radioSt = st; BGM.radioArt = h && h.rect ? h.rect.slice() : null;
    }
    var R = BGM.radioArt; if (!R) return null;
    var a = st.cssOf(R[0], R[1]), b = st.cssOf(R[0] + R[2], R[1] + R[3]);
    return { l: a.x, t: a.y, r: b.x, b: b.y, w: b.x - a.x, h: b.y - a.y };
  }
  // 鏡頭現在看得到的那一塊（host CSS）
  function npView() {
    var st = UI.stage, host = UI.stageHost, v = null; if (!st || !st.view || !host) return null;
    try { v = st.view(); } catch (_) { v = null; } if (!v) return null;
    var a = st.cssOf(0, v.y), b = st.cssOf(v.w || 292, v.y + v.h);
    return { l: Math.max(0, a.x), t: Math.max(0, a.y), r: Math.min(host.clientWidth, b.x), b: Math.min(host.clientHeight, b.y) };
  }
  // 熟客聊天泡泡在畫面上（聊天優先：不展開、展開中的收起來；審查 M8）
  function npChat() { var host = UI.stageHost; return !!host && qsa('.ds-say.chat', host).some(function (e) { var r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; }); }
  // 泡泡不能蓋的（lv＝第幾層，NP_LV）：一律＝名牌、所有泡泡、吐司（第 I 波 post：領獎「唱片櫃 +2」疊在字上）、底部面板；
  //   lv 0 再加 小熱點（牆上封面、海報、櫃檯「正在放」、店貓；收音機本身不算）、熟客與路人的人物矩形；lv 1 不看人物；lv 2 人物、小熱點都不看；
  //   lv 3 不看小熱點、照樣不蓋人（泡泡只是字卡、不擋點擊：小熱點底下照點得到；人不蓋＝活店照看得到人）。
  //   自動展開：lv 0 → lv 3（第 I 波 post 審查：360／375 收音機上方那兩格一定撞牆上封面，左／左下／下又是熟客站的地方，只用 lv 0 第一首常常整首不出）；
  //   點 ♪：lv 0 → 1 → 2（審查 M7：點了要有東西）。展開中：原位置只要不蓋名牌／泡泡／吐司／面板就留著（走過的熟客不擠掉；post 審查）
  var NP_LV = [{ hot: true, ppl: true }, { hot: true, ppl: false }, { hot: false, ppl: false }, { hot: false, ppl: true }];
  var NP_AUTO = [0, 3], NP_TAP = [0, 1, 2];
  // npToasts：吐司（app 上、z 40；host CSS）。擺的時候避開；展開中被吐司疊到＝先藏起來等它走（npDuck），不換位置、不收
  function npToasts() {
    var ap = app(), host = UI.stageHost, out = []; if (!ap || !host) return out;
    var hb = host.getBoundingClientRect();
    qsa('.lb-toast', ap).forEach(function (e) { var r = e.getBoundingClientRect(); if (r.width > 0 && r.height > 0) out.push({ l: r.left - hb.left, t: r.top - hb.top, r: r.right - hb.left, b: r.bottom - hb.top }); });
    return out;
  }
  function npBlocks(lv, noToast) {
    var L = NP_LV[lv || 0] || NP_LV[0];
    var st = UI.stage, host = UI.stageHost, hb = host.getBoundingClientRect(), out = [];
    var rel = function (r) { return { l: r.left - hb.left, t: r.top - hb.top, r: r.right - hb.left, b: r.bottom - hb.top }; };
    if (L.hot) try {
      (st.hotspots() || []).forEach(function (h) {
        if (!h.rect || h.id === 'radio' || h.dyn || h.visible === false || h.rect[2] * h.rect[3] > 600) return;
        var a = st.cssOf(h.rect[0], h.rect[1]), b = st.cssOf(h.rect[0] + h.rect[2], h.rect[1] + h.rect[3]); out.push({ l: a.x, t: a.y, r: b.x, b: b.y });
      });
    } catch (_) {}
    qsa('.ds-tag, .ds-say', host).forEach(function (e) { var r = e.getBoundingClientRect(); if (r.width > 0 && r.height > 0) out.push(rel(r)); });
    if (!noToast) out = out.concat(npToasts());
    var cw = W.DipLabCrowd;
    if (L.ppl && cw && cw.state && st.anchor) {
      try { (cw.state().slots || []).forEach(function (s) { if (!s.on || s.hidden) return; var a = st.anchor(s.slot), r = a && a.getBoundingClientRect(); if (r && r.width > 0) out.push(rel(r)); }); } catch (_) {}
    }
    var p = UI.panel && UI.panel.getBoundingClientRect(); if (p && p.height > 0) out.push({ l: -1e4, t: p.top - hb.top, r: 1e4, b: 1e4 });
    return out;
  }
  // 候選位置照順序：收音機上方（窗框那一帶；置中、靠右對齊）→ 左下（右上角對著收音機；貼齊收音機中線、左緣）→ 正左（置中、對齊上緣、往下半個收音機）→ 正下
  //   同一個方向多試幾個對齊（375×548 牆上封面一格一格排得很密，只試一個點常常整排都撞到）
  function npCands(R, w, h, V) {
    var g = 6, cx = (R.l + R.r) / 2, cy = (R.t + R.b) / 2, mid = function (x) { return Math.max(V.l + 2, Math.min(V.r - 2 - w, x)); };
    return [
      { k: 'up', l: mid(cx - w / 2), t: R.t - g - h },
      { k: 'up', l: mid(R.r - w), t: R.t - g - h },
      { k: 'dl', l: Math.min(R.l + R.w / 2, V.r - 2) - w, t: R.b + g },
      { k: 'dl', l: R.l - 2 - w, t: R.b + g },
      { k: 'lf', l: R.l - g - w, t: cy - h / 2 },
      { k: 'lf', l: R.l - g - w, t: R.t },
      { k: 'lf', l: R.l - g - w, t: R.t + R.h / 2 },
      { k: 'dn', l: mid(cx - w / 2), t: R.b + g }
    ];
  }
  function npFits(c, w, h, V, B) {
    var a = { l: c.l, t: c.t, r: c.l + w, b: c.t + h };
    if (a.l < V.l || a.t < V.t || a.r > V.r || a.b > V.b) return false;
    for (var i = 0; i < B.length; i++) { var o = B[i]; if (a.l < o.r + 2 && a.r > o.l - 2 && a.t < o.b + 2 && a.b > o.t - 2) return false; }
    return true;
  }
  function npPut(c, i, w, h, R) {
    var pop = BGM.pop, cx = (R.l + R.r) / 2, cy = (R.t + R.b) / 2;
    pop.style.left = Math.round(c.l) + 'px'; pop.style.top = Math.round(c.t) + 'px'; pop.setAttribute('data-at', c.k);
    pop.style.setProperty('--tx', Math.round(Math.max(10, Math.min(w - 10, cx - c.l))) + 'px');
    pop.style.setProperty('--ty', Math.round(Math.max(8, Math.min(h - 8, cy - c.t))) + 'px');
    BGM.popIdx = i;
  }
  // 照順序擺（order＝層的順序：自動展開 NP_AUTO、點 ♪ NP_TAP）；擺得下＝回那一層，不然 -1
  function npPlace(order) {
    var pop = BGM.pop, R = npRadio(), V = npView(); if (!pop || !R || !V) return -1;
    var w = pop.offsetWidth, h = pop.offsetHeight; if (!w || !h) return -1;
    var cs = npCands(R, w, h, V);
    for (var k = 0; k < order.length; k++) {
      var B = npBlocks(order[k]);
      for (var i = 0; i < cs.length; i++) if (npFits(cs[i], w, h, V, B)) { npPut(cs[i], i, w, h, R); return order[k]; }
    }
    return -1;
  }
  // 展開中：原本那個位置（跟著收音機重算）只要還不蓋名牌、泡泡、吐司、面板、還在鏡頭裡就留著（不跳來跳去；審查 L13；走過的熟客不擠掉：泡泡不擋點擊；post 審查），
  //   回那個位置現在擺得下的最嚴那一層；不然照這次展開的順序換一個，都不行＝-1（收起來）
  function npKeep() {
    var pop = BGM.pop, R = npRadio(), V = npView(), order = BGM.popTap ? NP_TAP : NP_AUTO; if (!pop || !R || !V) return -1;
    var w = pop.offsetWidth, h = pop.offsetHeight, cs = npCands(R, w, h, V), c = cs[BGM.popIdx];
    if (c) { var ks = [0, 3, 1, 2]; for (var k = 0; k < ks.length; k++) if (npFits(c, w, h, V, npBlocks(ks[k], true))) { npPut(c, BGM.popIdx, w, h, R); return ks[k]; } }
    return npPlace(order);
  }
  // 試聽機、收音機面板、唱片資訊（或 ⏸、整頁）開著：不展開
  function npBlocked() { var ci = CI(); return !!((ci && ci.isOpen && ci.isOpen()) || UI.modal || UI.page || qs('.lb-sheet.float.booth, .lb-sheet.float.radio', app())); }
  // 自動展開先等（第 I 波第三輪審查 F4／F5）：熟客在聊天；聊天剛收不到 popChatGap（下一句、老闆接話常常緊接著出來，字卡先擺好就會被疊到）；
  //   活店切磋：挑戰者正走向對戰台、到了還沒嗆、第一次的老闆提示（sparHint）還沒講完（UI.enc.talk＝那一段講到幾時；sparTable／sparAtTable／sparHint 寫）
  function npHold() {
    var t = now();
    if (npChat()) { BGM.chatAt = t; return true; }
    if (t - BGM.chatAt < bgmCfg('popChatGap', 600)) return true;
    var e = UI.enc;
    return !!(e && UI.screen === 'night' && (e.phase === 'walk' || e.phase === 'table') && (e.talk || 0) > t);
  }
  // 要展開（第一首、隔 2 分鐘、點 ♪）：記下來，鏡頭停了、熟客沒在聊天、擺得下才真的出（npTry；每 300 ms 再看一次，到 until 為止）。
  //   真的出了才算「展開過」（BGM.first、popAt；擺不下不吃掉第一首、2 分鐘的額度；審查 M7）
  function npOpen(c, o) {
    o = o || {};
    if (!c || !BGM.zone || !npMount()) return false;
    if (!o.tap && npBlocked()) return false;
    BGM.popTry = { id: c.id, tap: !!o.tap, until: now() + (o.tap ? bgmCfg('popTapWait', 6000) : bgmCfg('popWait', 8000)) };
    if (!o.re) BGM.popRe = false;
    npTry();
    return true;
  }
  function npTry() {
    var T = BGM.popTry; if (!T || !BGM.pop) return;
    if (BGM.popOpen) { BGM.popTry = null; return; }
    var f = FX(), cur = null, on = bgmSounding(); try { cur = f.music.current(); } catch (_) {}
    if (!cur || cur.id !== T.id || BGM.icMode !== 'on') { BGM.popTry = null; return; }
    // 自動展開：馬上就有人要開口（挑戰者走向對戰台、到了還沒嗆、第一次的老闆提示還沒講、聊天剛收）＝先等，等的這段不算進 8 秒（最多多等 popHoldMax）
    //   （第 I 波第三輪審查 F4／F5：字卡 1.3 秒出、挑戰者一嗆就收＝「字一閃就沒了」；聊天一收字卡馬上擺好、老闆那句半拍後疊上來）
    if (!T.tap && npHold()) {
      if (!T.cap) T.cap = now() + bgmCfg('popHoldMax', 20000);
      if (now() < T.cap) { T.until = Math.max(T.until, Math.min(T.cap, now() + 3000)); return; }
    }
    if (now() > T.until) { BGM.popTry = null; return; }
    // 等：還沒響、面板開著、熟客在聊天（自動展開；審查 M8）、鏡頭還在動（停了 0.4 秒才算停；審查 L13）。
    //   點 ♪ 的不等聊天：避開聊天泡泡擺（聊天泡泡要玩家點 ▼ 才走，等 6 秒常常等不到；post 審查）
    if (!on || npBlocked() || (npChat() && !T.tap) || now() - BGM.camAt < 400) return;
    var pop = BGM.pop; npText(cur);
    pop.classList.remove('on'); pop.style.visibility = 'hidden'; pop.style.display = '';
    var lv = npPlace(T.tap ? NP_TAP : NP_AUTO);
    if (lv < 0) { pop.style.display = 'none'; pop.style.visibility = ''; return; }
    BGM.popLvl = lv; BGM.popTap = !!T.tap; npShow(cur);
  }
  function npShow(c) {
    var pop = BGM.pop;
    pop.style.visibility = ''; void pop.offsetWidth; pop.classList.add('on');
    BGM.popPrev = { first: BGM.first, at: BGM.popAt };
    BGM.popOpen = true; BGM.popId = c.id; BGM.popTry = null; BGM.popAt = now(); BGM.first = false; BGM.popChat = npChat();
    BGM.popEnd = now() + bgmCfg('popMs', 6000); BGM.duckAt = 0; pop.classList.remove('duck');
    clearTimeout(BGM.popT); BGM.popT = setTimeout(function () { npClose(); }, bgmCfg('popMs', 6000));
    npMarquee();
    npSync();
  }
  // 第二行「藝人《專輯》」放不下（一行截斷）：展開 1.1 秒後慢慢往左捲到尾巴（專輯名多半在被截掉的那段；post 審查），停在尾巴到收起來。減少動態＝不捲
  function npMarquee() {
    clearTimeout(BGM.mqT); BGM.mqT = 0;
    var b = BGM.pop && BGM.pop.querySelector('b'); if (!b || rm()) return;
    b.style.transition = 'none'; b.style.textIndent = '0px';
    BGM.mqT = setTimeout(function () {
      BGM.mqT = 0; if (!BGM.popOpen || !b.isConnected) return;
      var ov = b.scrollWidth - b.clientWidth; if (ov <= 1) return;
      var d = Math.min(bgmCfg('mqMaxS', 3.2), Math.max(1.2, ov / bgmCfg('mqPxS', 40)));
      BGM.pop.style.width = BGM.pop.offsetWidth + 'px';   // 寬度先定住：text-indent 會改內容寬，泡泡跟著縮＝位置每一格都在變
      b.style.transition = 'text-indent ' + d.toFixed(2) + 's linear'; b.style.textIndent = -Math.ceil(ov + 2) + 'px';
    }, bgmCfg('mqDelay', 1100));
  }
  // 展開中的泡泡被擠掉（熟客聊天泡泡出來、吐司、鏡頭）、還沒停滿就收：這次不算展開過（第一首、2 分鐘的額度退回）；
  //   自動展開的再排一次（這首還在放就照規則再試 8 秒：聊天完、吐司走了再出來；一首只再排一次）
  function npEarly() { npEarlyAt(now()); }
  // shownTil：看得到的最後一刻（被吐司藏起來的那段不算看過）
  function npEarlyAt(shownTil) {
    if (!BGM.popOpen || !BGM.popPrev || shownTil - BGM.popAt >= bgmCfg('popMs', 6000) * 0.6) return;
    BGM.first = BGM.popPrev.first; BGM.popAt = BGM.popPrev.at;
    var id = BGM.popId, tap = BGM.popTap, f = FX(), c = null; try { c = f && f.music ? f.music.current() : null; } catch (_) {}
    npClose();
    if (!tap && !BGM.popRe && c && c.id === id) { BGM.popRe = true; npOpen(c, { re: true }); }
  }
  function npText(c) {
    var pop = BGM.pop, nm = c.artist + '《' + c.album + '》';
    pop.style.width = '';
    pop.innerHTML = '<span class="k"><i aria-hidden="true">♪</i>' + esc(BU('np')) + '</span><b>' + esc(nm) + '</b>';
    pop.setAttribute('aria-label', BU('np') + '：' + nm); pop.setAttribute('data-cid', c.id);
    if (BGM.popOpen) { BGM.popId = c.id; npMarquee(); }
  }
  function npClose(quick) {
    clearTimeout(BGM.popT); BGM.popT = 0; BGM.popTry = null; clearTimeout(BGM.mqT); BGM.mqT = 0; BGM.duckAt = 0;
    var was = BGM.popOpen; BGM.popOpen = false; BGM.popId = null;
    var pop = BGM.pop; if (!pop) return;
    pop.classList.remove('on'); pop.classList.remove('duck');
    if (quick || !was || rm()) pop.style.display = 'none';
    else setTimeout(function () { if (!BGM.popOpen) pop.style.display = 'none'; }, 200);
    if (BGM.ic && BGM.ic.classList) BGM.ic.classList.remove('open');
  }
  // 換歌但不展開：♪ 輕跳一下（不出字）
  function npBump() {
    var ic = BGM.ic; if (!ic || ic.style.display === 'none' || rm()) return;
    ic.classList.remove('bump'); void ic.offsetWidth; ic.classList.add('bump');
    setTimeout(function () { ic.classList.remove('bump'); }, 700);
  }
  // 有歌（在響、在抓、換歌的空檔 3 秒內）：♪ 才是「有歌」的樣子（審查 L9：沒聲音時點 ♪ 不能說「正在播放」上一首）
  function npLive() {
    if (bgmSounding()) { BGM.liveAt = now(); return true; }
    var f = FX(); try { if (BGM.loading || (f && f.music && f.music.loading && f.music.loading())) return true; } catch (_) {}
    return !BGM.retryT && now() - BGM.liveAt < 3000;
  }
  // ♪ 小圖示的樣子與位置：off＝灰（聲音或背景音樂關，沒字）、tap＝「點我放歌」、on＝有歌（輪播或玩家點的）、''＝藏起來（沒有在放）
  function npSync() {
    if (!BGM.zone) { npHide(); return; }
    if (!npMount()) return;
    var f = FX(), st = sndState(), cur = null; try { cur = f && f.music && f.music.current ? f.music.current() : null; } catch (_) {}
    var mode = (!bgmOn() || st === 'off') ? 'off' : st === 'locked' ? (cur ? 'tap' : '') : npLive() ? 'on' : '';
    var ic = BGM.ic;
    if (mode !== BGM.icMode) {
      BGM.icMode = mode;
      ic.innerHTML = '<i aria-hidden="true">♪</i>' + (mode === 'tap' ? '<span>' + esc(BU('tapPlay')) + '</span>' : '');
      ic.setAttribute('aria-label', mode === 'tap' ? BU('tapPlay') : BU('icon'));
      ic.tabIndex = mode === 'off' ? -1 : 0;
    }
    ic.className = 'np-ic' + (mode ? ' ' + mode : '') + (BGM.popOpen ? ' open' : '') + (ic.classList.contains('bump') ? ' bump' : '');
    if (!mode || mode === 'off' || mode === 'tap') npClose(true);
    npPosIc();
  }
  // ♪ 擺在收音機右上角（不蓋收音機熱點的中心：真點收音機＝點那一下；375×548 收音機只有 24 px 寬 → e2e-econ #28）；
  //   右邊放不下（「點我放歌」膠囊約 76 px；審查 L10）＝改試收音機正上方、正下方（靠收音機右緣）、正左，挑第一個在鏡頭裡、不蓋牆上封面等小熱點、名牌、泡泡、面板的；
  //   都不行＝正下方（不出鏡頭、不蓋收音機熱點中心）
  function npPosIc() {
    var ic = BGM.ic; if (!ic) return;
    var R = BGM.icMode ? npRadio() : null, V = R ? npView() : null;
    if (!R || !V || R.b < V.t + 4 || R.t > V.b - 4) { ic.style.display = 'none'; return; }
    ic.style.display = '';
    var w = ic.offsetWidth || 20, h = ic.offsetHeight || 22;
    var nat = R.t - 4, l = Math.max(V.l + 2, R.l + R.w / 2 + 4, Math.min(V.r - 2, R.r + 14) - w), t = Math.max(V.t + 2, nat);   // nat＝沒被鏡頭夾的時候 ♪ 的上緣
    var wide = l + w > V.r - 2, say = !wide && npSayHit({ l: l, t: t, r: l + w, b: t + h });
    // 右邊放不下，或熟客／老闆的泡泡、名牌疊到右上角那個位置（post 審查：♪ 蓋住聊天泡泡的字、吃掉 ▼ 那一點）＝換位置；泡泡疊到又都換不了＝留在原位（z 在泡泡底下）
    if (wide || say) {
      var ra = Math.max(V.l + 2, Math.min(R.r, V.r - 2) - w), cy = (R.t + R.b) / 2;
      var cs = [{ l: ra, t: R.t - 2 - h }, { l: ra, t: R.b + 4 }, { l: R.l - 4 - w, t: cy - h / 2 }], B = npBlocks(1), pick = null;
      for (var i = 0; i < cs.length && !pick; i++) if (npFits(cs[i], w, h, V, B)) pick = cs[i];
      if (pick || wide) {
        pick = pick || cs[1];
        nat = pick.t; l = Math.max(V.l + 2, pick.l); t = Math.max(V.t + 2, Math.min(V.b - 2 - h, pick.t));
      }
    }
    // 鏡頭把收音機上半截裁掉（切磋戰利品列照領獎鏡頭收）、♪ 被夾在鏡頭上緣往下移：連點擊區（::before 上 4、下 5、右 12）一起疊到點得到的小熱點（牆上封面…）＝藏起來
    //   （第 I 波第三輪審查 F3：375 ♪ 整個壓在 rack:steely dan 上、點封面開成 ♪ 字卡）；主線領獎畫面熱點是關的＝照舊留著
    if (t > nat + 0.5 && npIcHot({ l: l, t: t - 4, r: l + w + 12, b: t + h + 5 })) { ic.style.display = 'none'; return; }
    ic.style.left = Math.round(l) + 'px'; ic.style.top = Math.round(t) + 'px';
  }
  // 那一塊（host CSS）疊到點得到的小熱點（跟 npBlocks 的小熱點同一套：牆上封面、海報、櫃檯「正在放」、店貓；收音機、跟著人走的、大的不算）
  function npIcHot(a) {
    var st = UI.stage, sh = st && st.shop, L = null; if (!sh || !sh.hotList || !st.cssOf) return false;
    try { L = sh.hotList() || []; } catch (_) { return false; }
    return L.some(function (h) {
      if (!h || !h.enabled || h.occluder || h.dyn || h.id === 'radio' || !h.rect || h.rect[2] * h.rect[3] > 600) return false;
      var p = st.cssOf(h.rect[0], h.rect[1]), q = st.cssOf(h.rect[0] + h.rect[2], h.rect[1] + h.rect[3]);
      return a.l < q.x && a.r > p.x && a.t < q.y && a.b > p.y;
    });
  }
  // 展開中被吐司（領獎「唱片櫃 +2」、提示）疊到：先淡掉、6 秒的計時停住，吐司走了再出來、接著算（post 審查：吐司字跟泡泡字疊在一起）；
  //   藏超過 6 秒（一直留著的提示吐司）＝收起來、算提早收（npEarly：額度退回、再排一次＝換個不撞吐司的位置）
  function npDuck() {
    var pop = BGM.pop; if (!pop || !BGM.popOpen) return;
    var r = pop.getBoundingClientRect(), hb = UI.stageHost.getBoundingClientRect(), a = { l: r.left - hb.left, t: r.top - hb.top, r: r.right - hb.left, b: r.bottom - hb.top };
    var hit = npToasts().some(function (o) { return a.l < o.r && a.r > o.l && a.t < o.b && a.b > o.t; });
    if (hit && !BGM.duckAt) { BGM.duckAt = now(); pop.classList.add('duck'); clearTimeout(BGM.popT); BGM.popT = 0; }
    else if (hit && now() - BGM.duckAt > bgmCfg('popMs', 6000)) { BGM.closeWhy = 'toast'; npEarlyAt(BGM.duckAt); if (BGM.popOpen) npClose(); }
    else if (!hit && BGM.duckAt) {
      BGM.popEnd += now() - BGM.duckAt; BGM.duckAt = 0; pop.classList.remove('duck');
      clearTimeout(BGM.popT); BGM.popT = setTimeout(function () { npClose(); }, Math.max(300, BGM.popEnd - now()));
    }
  }
  // ♪ 那一塊（host CSS）疊到熟客／老闆的泡泡或名牌
  function npSayHit(a) {
    var host = UI.stageHost; if (!host) return false;
    var hb = host.getBoundingClientRect();
    return qsa('.ds-tag, .ds-say', host).some(function (e) { var r = e.getBoundingClientRect(); if (!(r.width > 0 && r.height > 0)) return false;
      var o = { l: r.left - hb.left, t: r.top - hb.top, r: r.right - hb.left, b: r.bottom - hb.top };
      return a.l < o.r + 2 && a.r > o.l - 2 && a.t < o.b + 2 && a.b > o.t - 2; });
  }
  // 輪播畫面上每 300 ms：♪ 的樣子、要展開的再試一次；展開中＝熟客聊天泡泡出來、面板打開就收，被名牌、泡泡擋到就換位置（都不行就收）、被吐司疊到就先藏著
  function npTick() {
    if (!BGM.zone) return;
    npSync();
    if (npChat()) BGM.chatAt = now();   // 聊天最後一次還在的時刻（npHold：聊天剛收先等一拍）
    if (BGM.popTry && !BGM.popOpen) { npTry(); return; }
    if (!BGM.popOpen || !BGM.pop) return;
    // 熟客聊天泡泡出來＝收（聊天優先）；點 ♪ 時已經在聊的那一段不收（避開它擺），聊完了下一段出來才收
    var ch = npChat();
    if (npBlocked() || (ch && !BGM.popChat)) { BGM.closeWhy = ch ? 'chat' : 'panel'; npEarly(); if (BGM.popOpen) npClose(); return; }
    if (!ch) BGM.popChat = false;
    var lv = npKeep(); if (lv < 0) { BGM.closeWhy = 'tick'; npEarly(); if (BGM.popOpen) npClose(); } else { BGM.popLvl = lv; npDuck(); }
  }
  // 每一格：鏡頭動了（進畫面的鏡頭移動、面板開關）＝♪ 跟著收音機走、展開中的泡泡跟著搬（擺不下就收）；記下最後動的時間（動的時候不展開；審查 L13）
  function npFrame() {
    BGM.raf = 0; if (!BGM.zone) return;
    BGM.raf = W.requestAnimationFrame(npFrame);
    var st = UI.stage, host = UI.stageHost, v = null; if (!st || !st.view || !host) return;
    try { v = st.view(); } catch (_) { v = null; } if (!v) return;
    var k = [v.y, v.h, v.x, v.w, v.scale, host.clientWidth, host.clientHeight].join(',');
    if (k === BGM.camKey) return;
    var first = !BGM.camKey; BGM.camKey = k; if (!first) BGM.camAt = now();
    if (!BGM.ic || !BGM.icMode) return;
    npPosIc();
    if (BGM.popOpen && BGM.pop) { var lv = npKeep(); if (lv < 0) { BGM.closeWhy = 'cam'; npEarly(); if (BGM.popOpen) npClose(true); } else { BGM.popLvl = lv; npDuck(); } }
  }
  function npLoop(on) {
    clearInterval(BGM.iv); BGM.iv = 0;
    if (BGM.raf && W.cancelAnimationFrame) W.cancelAnimationFrame(BGM.raf); BGM.raf = 0;
    if (on) { BGM.iv = setInterval(npTick, 300); if (W.requestAnimationFrame) BGM.raf = W.requestAnimationFrame(npFrame); }
  }
  // ⏸ 選單：「聲音」同一列的 背景音樂 開／關＋音樂音量 小／中／大；下面 Lv5 起 背景音樂放 包包／包包＋唱片櫃、說明小字
  function bgmRowsHTML() {
    return '<button type="button" class="lb-btn big sp" data-a="bgm">' + esc(BU('bgm')) + ' ' + swHTML(bgmOn()) + '</button>' +
      '<button type="button" class="lb-btn big sp" data-a="mvol">' + esc(BU('vol')) + ' <span class="sw on">' + esc(bgmVolName()) + '</span></button>';
  }
  function bgmMoreHTML() {
    var both = save.settings.bgmSrc === 'both';
    return (bgmShelfOpen() ? '<button type="button" class="lb-btn big sp" data-a="bsrc">' + esc(BU('src')) + ' <span class="sw on">' + esc(BU(both ? 'srcBoth' : 'srcBag')) + '</span></button>' : '') +
      '<p class="lb-bgmnote">' + esc(BU('note')) + '</p>';
  }
  // 一首試聽自然放完（fx.js music.onEnded）：對決以外接下一首（來客／領獎／說情＝背景音樂佇列的下一首（第 I 波）、你家＝下一張收藏），其他畫面重播同一首
  function onMusicEnded(c) {
    var f = FX();
    if (!c || !f || !f.music || UI.screen === 'duel' || !soundOn() || UI.tune) return;   // 你家的控制台開著：星圖的電台自己接下一張（轉接器回報 stopped）
    if (BGM.zone) { setTimeout(function () { bgmKick(); }, 400); return; }
    if (BGM.mine && BGM.cur === c.id && UI.screen !== 'home') { BGM.mine = false; return; }   // 輪播那首在不輪播的畫面放完：不重播（你家照舊接唱片架）
    var next = c;
    // 你家：唱盤放完接下一張收藏（照唱片架的順序，最後一張接回第一張）
    if (UI.screen === 'home') { var hp = homePlayable(), hi = hp.indexOf(c.id); if (hp.length) next = card(hp[(hi + 1) % hp.length]) || c; UI.homeNext = next.id; }
    setTimeout(function () { if (UI.screen !== 'duel' && soundOn()) try { f.music.play(next, { fadeMs: 1200 }); } catch (e) { console.error(e); } }, 400);
  }
  // ======================================================================= 新卡封面／試聽（SPEC-B §1.6、C3/C4）
  //   標題畫好後閒置 fetch cards-media.json?v=poolVersion → 閒置時 attachMedia → 發 'dip:media'。版本不合不重試；
  //   逾時看「卡住」不看「慢」：20 秒內沒拿到回應標頭、或之後 20 秒都沒收到新的一段就放棄；總共最多 5 分鐘
  //     （驗收：原本 20 秒連 body 一起算，128 kbps 跟店牆封面搶頻寬時快抓完就被砍、再從頭抓）
  //   網路失敗 5 秒後重試一次；之後換畫面再試，但要隔 15、30、60… 秒，一次開頁最多抓 MEDIA_MAX 次（降速吃到飽不要每換畫面燒 300 KB）
  //   mediaReady()：套好 true、不合／沒卡池 false、網路失敗不 resolve。mediaTry()：這一次抓的結果（成功 true、失敗 false；聆聽室控制台等它）
  var MEDIA = { kicked: false, busy: false, bad: false, fails: 0, tries: 0, next: 0, p: null, done: null, cur: null };
  var MEDIA_MAX = 6;
  function mono() { return W.performance && performance.now ? performance.now() : now(); }   // 退避計時（e2e 會把 Date 定住）
  function mediaReady() {
    if (!MEDIA.p) MEDIA.p = new Promise(function (res) { MEDIA.done = res; });
    if (C && C.mediaReady) MEDIA.done(true);
    else if (!C || !C.poolLoaded || MEDIA.bad) MEDIA.done(false);
    return MEDIA.p;
  }
  function idle(fn, ms) {
    if (W.requestIdleCallback) { try { W.requestIdleCallback(function () { fn(); }, { timeout: 2000 }); return; } catch (_) {} }
    setTimeout(fn, ms);
  }
  function mediaKick() {
    if (MEDIA.kicked) return; MEDIA.kicked = true;
    idle(function () { mediaLoad(); }, 300);
  }
  function mediaRetry() { if (MEDIA.kicked && MEDIA.fails >= 2 && MEDIA.tries < MEDIA_MAX && mono() >= MEDIA.next) mediaLoad(); }
  // 聆聽室控制台：還沒到就現在抓（不等退避；次數照算），等這一次的結果；抓不了（次數用完、版本不合）＝不等
  function mediaTry() {
    if (C && C.mediaReady) return Promise.resolve(true);
    MEDIA.kicked = true;
    if (!MEDIA.busy && MEDIA.tries < MEDIA_MAX) mediaLoad();
    return MEDIA.busy && MEDIA.cur ? MEDIA.cur : Promise.resolve(!!(C && C.mediaReady));
  }
  // 一段一段讀 body（每收到一段 kick 重設「卡住」計時）；沒有串流的瀏覽器照 r.json()（只剩總共 5 分鐘那道）
  function mediaJson(r, kick) {
    if (!r.body || typeof r.body.getReader !== 'function' || !W.TextDecoder) return r.json();
    var rd = r.body.getReader(), dec = new TextDecoder(), parts = [];
    function pump() {
      return rd.read().then(function (x) {
        if (x.done) { parts.push(dec.decode()); return JSON.parse(parts.join('')); }
        kick(); parts.push(dec.decode(x.value, { stream: true }));
        return pump();
      });
    }
    return pump();
  }
  function mediaLoad() {
    if (!C || !C.poolLoaded || !C.poolVersion || C.mediaReady || MEDIA.busy || MEDIA.bad || !W.fetch) { mediaReady(); return; }
    MEDIA.busy = true; MEDIA.tries++;
    var fin, ac = W.AbortController ? new AbortController() : null, abort = function () { if (ac) ac.abort(); };
    MEDIA.cur = new Promise(function (res) { fin = res; });
    var tm = setTimeout(abort, 20000), cap = setTimeout(abort, 300000), opt = {};
    var kick = function () { clearTimeout(tm); tm = setTimeout(abort, 20000); };
    if (ac) opt.signal = ac.signal;
    W.fetch('cards-media.json?v=' + encodeURIComponent(C.poolVersion), opt).then(function (r) {
      kick();
      if (!r.ok) throw new Error('cards-media.json HTTP ' + r.status);
      return mediaJson(r, kick);
    }).then(function (m) {
      clearTimeout(tm); clearTimeout(cap);
      return new Promise(function (res) { idle(function () { var n = 0; try { n = C.attachMedia(m); } catch (e) { console.error(e); } res(n); }, 0); });
    }).then(function (n) {
      MEDIA.busy = false;
      if (!n) { MEDIA.bad = true; console.warn('[media] cards-media.json 版本或列數跟 cards-pool.js 不合，不套（新卡先用專輯名字卡）'); mediaReady(); fin(false); return; }
      mediaReady(); fin(true);
      try { D.dispatchEvent(new CustomEvent('dip:media', { detail: { n: n } })); } catch (e) { console.error(e); }
    }).catch(function (e) {
      clearTimeout(tm); clearTimeout(cap); MEDIA.busy = false; MEDIA.fails++;
      console.warn('[media]', e && e.message ? e.message : e);
      if (MEDIA.fails === 1) setTimeout(mediaLoad, 5000);
      else MEDIA.next = mono() + 15000 * Math.pow(2, Math.min(4, MEDIA.fails - 2));
      fin(false);
    });
  }
  function boot() {
    if (UI.booted) return; UI.booted = true;
    E = W.DipLabEngine; C = W.DipLabContent;
    if (!E || !C || !app() || !E.newRun) { if (app()) app().innerHTML = '<div class="lb-boot">載入失敗，請重新整理。</div>'; return; }
    apexBoot();
    facBoot();                                         // 第 D 波棒二：三流派（?fac=1）
    lineupBoot();                                      // 第 I 波 I-2：上場＋耐聽（施工期間 ?lineup=1；要在 loadSave 之前：讀檔整理照 content 的開關）
    D.body.classList.add('in-battle');
    svhFallback();
    loadDaily();                                       // loadSave 拿它的 log 自癒唱片櫃
    save = loadSave();
    takeBring();
    careerBoot();                                      // 第 D 波（SPEC-D §2.6）：C 版頁面記的樂歷（lexpBank）入帳；每次開機都看，全 0 就不做
    var f = FX();
    if (f) { try { if (f.init) f.init(); if (f.setSpeed) f.setSpeed(speed()); } catch (e) { console.error(e); } }
    // 對決以外：一首試聽自然放完就接下一首（背景音樂佇列；你家＝下一張收藏）
    if (f && f.music && f.music.onEnded) f.music.onEnded(onMusicEnded);
    // 第 I 波背景音樂：音量、maxMs 淡出後接回、櫃檯唱盤與收音機旁的 ♪、聲音開關、閒置計時
    if (f && f.music) {
      try { if (f.music.setVolume) f.music.setVolume(bgmVol()); } catch (e) { console.error(e); }
      if (f.music.onIdle) f.music.onIdle(function () { bgmKick(); });
      if (f.music.onChange) f.music.onChange(bgmOnChange);
      if (f.music.onResume) f.music.onResume(bgmAdopt);
    }
    if (f && f.onSound) f.onSound(function () { if (BGM.zone) npSync(); });
    D.addEventListener('pointerdown', bgmTap, true); D.addEventListener('keydown', bgmTap, true); bgmTap();
    // 出了輪播畫面後的點擊（click＝iOS 認得的手勢）：audioSession 切回 'playback'、舊 iOS 的循環靜音 <audio> 再開（審查 M4）
    D.addEventListener('click', function () { if (!BGM.zone && f && f.sessionPlayback) try { f.sessionPlayback(); } catch (_) {} }, true);
    var ci = CI();
    if (ci) {
      ci.config({ onSoundUnlock: function () { save.settings.sound = true; persist(); }, cardOf: function (id) { return card(id); } });
      if (UI.apex) ci.config({ apex: true });          // 頂點卡試做：頂點卡的唱片資訊多一塊「王牌能力」（旗標關時不設，一字不變）
      ci.config({ run: function () { return save.run; } });   // 第 D 波棒二：帶派別的 run＝王牌能力照換一格（cardinfo apexOf 走 apexAbilityOf）；第 I 波修正輪：一律設（?fac=1 單開、續玩沒帶旗標時 7 星王牌翻面句照 run.fac 換條件）
      ci.on('close', function () { flushToasts(); if (BGM.zone) bgmResume(); });   // 第 I 波：唱片資訊的試聽收掉了＝1.5 秒後接回輪播
    }
    labSpr();
    // 第 C 波（SPEC-C §5.2、CRITIQUE 1.8）：引擎抽金邊盤、公關片時先扣唱片櫃擁有的、公關片偏常聽的兩個頻率（呼叫時才讀存檔；sim 不設）
    if (E.setCtx) { try { E.setCtx({ owned: function (id) { return isOwned(id); }, tunes: function () { try { return dailyTunes(); } catch (_) { return []; } } }); } catch (e) { console.error(e); } }
    if (DEBUG) installDebug();
    buildShell();
    configTut();
    if (UI.discardedOld || UI.migratedUnlock || UI.migrated7 || UI.migrated8) persist();   // 第 C 波 v7 → 8：版號寫回一次   // 解鎖制遷移、v7 換 id／自癒寫回去：下次載入不再補、不再提示
    // 跨午夜回到前景：發今天的推薦；停在標題沒開東西就重畫
    D.addEventListener('visibilitychange', function () {
      if (D.visibilityState !== 'visible' || !save || !dailyTick()) return;
      if (UI.screen === 'title' && !UI.going && !UI.intro && !UI.modal && !UI.page && !qs('.lb-sheet', app()) && !(econ() && econ().isOpen())) { UI.camQuick = true; go('title'); }
    });
    // 舞台最多等 1.2 s：標題要在 2 s 內出來；晚到的舞台照樣接上（B-slow-stage-empty-scene：標題的鈕等舞台好了才收點擊）
    var started = false;
    var start = function () { if (started) return; started = true; UI.firstScreen = true; go('title'); UI.firstScreen = false; };
    var stageReady = false;
    mountStage().then(function (st) {
      stageReady = true;
      if (!started) start();
      else if (st && UI.screen === 'title' && !UI.intro) { UI.camQuick = true; go('title'); }   // 開頭旁白中不重畫標題（審查 F7）
      D.body.classList.remove('stage-wait');
    });
    setTimeout(function () { if (!stageReady) D.body.classList.add('stage-wait'); start(); setTimeout(function () { D.body.classList.remove('stage-wait'); }, 2500); }, 1200);
  }
  W.DipLabUI = { boot: boot, go: go, info: info, openRules: openRules, openHelp: openRules, openSettings: openSettings, openPage: openPage,
    sprite: sprHTML, relicIcon: relicIcon, labSpr: labSpr, get stage() { return UI.stage; }, get save() { return save; }, get screen() { return UI.screen; } };
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot); else setTimeout(boot, 0);
})();
