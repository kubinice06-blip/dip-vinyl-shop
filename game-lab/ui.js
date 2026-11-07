/* game-lab/ui.js — 品味對決 v2：外殼與所有非對決畫面（Agent U）。SPEC-v2 §2、§3.7、§4.4、§5.4–5.6、§8。
 *
 * 版面（§2）：#app ＝ #top（32px 頂欄）＋ #stage（常駐像素店舞台，整個 session 只 mount 一次）＋ #panel（每個畫面的面板）。
 *   go(screen) 只做三件事：換 #top、stage.camera(鏡頭)＋擺小人、換 #panel。舞台不重建，所以門、雨、正在放的唱片、店裡的人都連續。
 *   唱片櫃／讀人圖鑑是蓋在舞台與面板上的整頁（.lb-page），舞台照樣在底下，不重掛。
 * 對決（§3）交給 duel.js（DipLabDuel.mount 在 #panel 裡）；進場／退場的鏡頭與面板編排在這裡（§3.7）：
 *   「！」＋黑條（fx.encounter2，店主拍板的遇敵特效）與鏡頭推近同時跑，整段約 1.5 s。
 * 唱片資訊（§4）：cardinfo.js（DipLabCardInfo.open）。畫面上每一張封面點一下就開（§4.4）。
 * 規則：
 *  - 只寫 localStorage 'dipGameLab_v1'；不用 Firebase；不 DipPlayer.mount；執行期網路只有封面、試聽、/album-desc（DESC_OK 網域）。
 *  - 不宣告 dip-character.js 的同名全域（PIX_PAL、SPR_BODY、AVATAR_*）；整支包在 IIFE 裡，只掛 window.DipLabUI（＋?debug=1 的 window.__lab）。
 *  - UI 不算傷害：所有數字都來自 DipLabEngine；UI 不讀 intent.cellIdx。
 *  - 浮層（泡泡、章、飛卡、吐司、標題牌）pointer-events:none；只有面板、彈窗、教學遮罩吃點擊。
 *  - 不用 emoji 當圖示（⏸ 用 CSS 兩條直線、聲音收進 ⏸ 選單、配件用像素圖示）。
 */
(function () {
  'use strict';
  var W = window, D = document;
  var E = null, C = null;                         // DipLabEngine / DipLabContent（boot 時取）
  var KEY = 'dipGameLab_v1';
  var QS = {};
  try { new URLSearchParams(location.search).forEach(function (v, k) { QS[k] = v; }); } catch (_) {}
  var DEBUG = QS.debug === '1';
  var FAST = QS.fast === '1';
  var ZH = { c: '經典', o: '冷門', h: '硬蕊' }, ZH1 = { c: '經', o: '冷', h: '硬' };
  var TIERS = ['hall', 'pearl', 'heresy'];
  var TIER_AXIS = { hall: 'c', pearl: 'o', heresy: 'h' };

  // ======================================================================= 小工具
  function FX() { return W.DipLabFx || null; }
  function CI() { return W.DipLabCardInfo || null; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); }
  function el(tag, cls, html) { var e = D.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function qs(sel, root) { return (root || D).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || D).querySelectorAll(sel)); }
  function speed() { return FAST ? 4 : (save && save.settings && save.settings.fastAnim ? 2 : 1); }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, Math.max(0, ms / speed())); }); }
  function rnd(n) { return Math.floor(Math.random() * n); }
  function pickR(a) { return a[rnd(a.length)]; }
  function shuffled(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = rnd(i + 1), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function card(id) { return (C && C.cards[id]) || null; }
  function cardM(id) { var r = save && save.run; return r ? (E.cardWithMods(C, id, r.cardMods && r.cardMods[id]) || card(id)) : card(id); }
  function sfx(n, o) { var f = FX(); if (f) try { f.sfx(n, o); } catch (e) { console.error(e); } }
  function stopEv(e) { if (e) { e.stopPropagation(); } }
  function rm() { var f = FX(); try { return !!(f && f.reducedMotion && f.reducedMotion()); } catch (_) { return false; } }
  function soundOn() { var f = FX(); try { return !!(f && f.soundOn && f.soundOn()); } catch (_) { return false; } }
  function line(k, sub) { var L = C && C.shopLines; var v = L && L[k]; if (sub != null && v && typeof v === 'object') v = v[sub]; return typeof v === 'string' ? v : ''; }
  function todayKey() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function seedKey() { return UI.seedOverride || (QS.seed ? String(QS.seed) : todayKey()); }
  function dateLabel(k) { var m = /^(\d{4})-?(\d{2})-?(\d{2})$/.exec(String(k || '')); return m ? m[2] + '/' + m[3] : String(k || ''); }
  function nightLabel(run) { return run ? esc(dateLabel(run.seedKey)) + ' 的雨夜<small>#' + run.nightNo + '</small>' : esc(dateLabel(seedKey())) + ' 的雨夜'; }

  // ======================================================================= 存檔（SPEC-v1 §7.6；v2 加 world、tutorialDone）
  var save = null;
  function defSave() {
    return { v: 1, seen: {}, settings: { fastAnim: false, sound: null }, player: null, run: null, nights: [],
      best: { score: 0, clears: 0, bySeedKey: {} }, shelf: {}, book: {}, unlocks: { secondNightTeaser: false },
      world: { at: 'dip', open: ['dip'], cleared: [] }, tutorialDone: false };
  }
  var RUN_SV = 1;        // run 的存檔格式版本：對不上就不續玩
  var NODE_STEPS = /^(crate|crateCard|listen|listenKeep|event|rest)$/;
  function validRun(r) {
    try {
      if (!r || typeof r !== 'object') return false;
      if (r.sv != null && r.sv !== RUN_SV) return false;
      if (!r.map || !Array.isArray(r.map.cols) || !r.map.cols.length || !Array.isArray(r.deck) || typeof r.hp !== 'number' || !Array.isArray(r.visited) || !r.stats) return false;
      var p = r.pending;
      if (p && !/^(duel|reward|node)$/.test(p.type)) return false;
      if (p && !E.findNode(r, p.nodeId)) return false;
      if (p && p.type === 'node' && !NODE_STEPS.test(p.step || '')) return false;
      if (p && p.type === 'reward' && !p.offer) return false;
      if (!r.over && !E.nextStep(r)) return false;
      return true;
    } catch (_) { return false; }
  }
  function loadSave() {
    var s = null;
    try { var raw = W.localStorage.getItem(KEY); if (raw) s = JSON.parse(raw); } catch (_) { s = null; }
    var d = defSave();
    if (s && typeof s === 'object' && typeof s.v === 'number' && s.v > 1) { UI.saveReadOnly = true; return d; }
    if (!s || typeof s !== 'object' || s.v !== 1) return d;
    for (var k in d) if (s[k] == null || typeof s[k] !== typeof d[k]) s[k] = d[k];
    s.settings = Object.assign({}, d.settings, s.settings || {});
    s.best = Object.assign({}, d.best, s.best || {});
    if (!s.best.bySeedKey || typeof s.best.bySeedKey !== 'object') s.best.bySeedKey = {};
    s.unlocks = Object.assign({}, d.unlocks, s.unlocks || {});
    s.world = Object.assign({}, d.world, s.world || {}); s.world.at = 'dip';
    if (!Array.isArray(s.nights)) s.nights = [];
    if (s.run && !validRun(s.run)) s.run = null;
    return s;
  }
  function persist() {
    if (UI.saveReadOnly || UI.noSave) return;
    try { W.localStorage.setItem(KEY, JSON.stringify(save)); } catch (_) { /* 寫不進去不影響遊戲 */ }
  }
  function knownHabits() { var o = {}; for (var id in save.book) { var b = save.book[id]; if (b && b.habits && b.habits.length) o[id] = true; } return o; }
  function knownCards() { var o = {}; for (var id in save.shelf) o[id] = true; return o; }
  function shelfAdd(id) {
    if (!id || !card(id) || save.shelf[id]) return false;
    save.shelf[id] = { first: (save.run && save.run.seedKey) || seedKey(), heard: false, isNew: true };
    return true;
  }
  function shelfSync() { var r = save.run; if (!r || !r.stats) return; (r.stats.metIds || []).forEach(shelfAdd); }
  function bookOf(id) {
    var b = save.book[id];
    if (!b) b = save.book[id] = { met: true, beaten: 0, lost: 0, habits: [] };
    if (!Array.isArray(b.habits)) b.habits = [];
    return b;
  }
  function bookHabit(enemyId, glyph) { if (!enemyId || !glyph) return; var b = bookOf(enemyId); if (b.habits.indexOf(glyph) < 0) b.habits.push(glyph); }

  // ======================================================================= 像素小人、配件圖示
  // LAB_SPR＝roguelike.html L1378–1426 的 SPR 整段（依賴 dip-character.js 的 sprRows；不宣告它的同名全域）
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
      boss: sr(['.....kkkkkk.....', '.....kkkkkk.....', '.....kkkkkk.....', '...kkkkkkkkkk...', '....ssssssss....', '....sskssyys....', '.....ssssss.....'], 'k', 'k', { 7: '....kkwrrwkk....', 8: '...kkkwrrwkkk...' }),
      guard: sr(['................', '.....kkkkkk.....', '....kkkkkkkk....', '....kssssssk....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'], 'b', 'k'),
      digger: sr(['................', '.....nnnnnn.....', '..nnnnnnnnnn....', '....kssssssk....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'], 'n', 'd'),
      heretic: sr(['....k.k..k.k....', '....kkkkkkkk....', '....kkkkkkkk....', '....kssssssk....', '....ssksskss....', '....ssssssss....', '.....ssssss.....'], 'r', 'k')
    };
    LAB_SPR.brokenrec = ['............', '...kk.kkk...', '..kkk.kkkk..', '.kkkk.kkkkk.', '.kkkkg.kkkk.', '.kkkg..gkkk.', '.kkkg..gkkk.', '.kkkk.gkkkk.', '.kkkk.kkkkk.', '..kkk.kkkk..', '...kkkkkk...', '............'];
    LAB_SPR.owner = sr(['................', '.....dddddd.....', '....dddddddd....', '....dssssssd....', '....ekkeekke....', '....sdssssds....', '.....dddddd.....'], 'w', 'd', { 8: '...wnnnnnnnnw...', 9: '...snnnnnnnns...', 10: '...snnnnnnnns...', 11: '....nnnnnnnn....' });
    return LAB_SPR;
  }
  // 配件圖示：roguelike.html PIX_ICONS_LV[icon][0]
  var LAB_ICONS = {
    stylus: ['............', '.........kk.', '........kk..', '.......kk...', '......kk....', '.....kk.....', '....kk......', '...kk.......', '..kk........', '.kkk........', '.kkd........', '............'],
    dustcover: ['............', '..dddddddd..', '.d........d.', '.d.kkkkkk.d.', '.d.k....k.d.', '.d.kkkkkk.d.', '.d........d.', '.dddddddddd.', '.kkkkkkkkkk.', '............', '............', '............'],
    testpress: ['............', '...kkkkkk...', '..kkkkkkkk..', '.kkkwwwwkkk.', '.kkwwwwwwkk.', '.kkwwwwwwkk.', '.kkwwwwwwkk.', '.kkwwwwwwkk.', '.kkwwwwwwkk.', '.kkkwwwwkkk.', '..kkkkkkkk..', '...kkkkkk...'],
    pointcard: ['............', '............', '.kkkkkkkkkk.', '.kwwwwwwwwk.', '.kwgwwwwwwk.', '.kwwwwwwwwk.', '.kwwwwwwwwk.', '.kwwwwwwwwk.', '.kwwwwwkkwk.', '.kkkkkkkkkk.', '............', '............'],
    adapter45: ['............', '....kkkk....', '..kkkkkkkk..', '..kk....kk..', '.kk......kk.', '.kk......kk.', '.kk......kk.', '.kk......kk.', '..kk....kk..', '..kkkkkkkk..', '....kkkk....', '............'],
    cleaner: ['....kkk.....', '...kkkkk....', '...kk.......', '...kkkk.....', '...kwwk.....', '..kwwwwk....', '..kwwwwk....', '..kwwwwk....', '..kwbbwk....', '..kwbbwk....', '..kkkkkk....', '............'],
    obi: ['....kkkk....', '....kwwk....', '....kwwk....', '....kwwk....', '....kkwk....', '....kwwk....', '....kwkk....', '....kwwk....', '....kkwk....', '....kwwk....', '....kkkk....', '............'],
    gauge: ['............', '..kkkkkkkk..', '.k........k.', '.k...kk...k.', '.k...kk...k.', '.k....k...k.', '.kkkkkkkkkk.', '....kkkk....', '............', '............', '............', '............'],
    heavy180: ['............', '...kkkkkk...', '..kkkkkkkk..', '.kkkkkkkkkk.', '.kkkkddkkkk.', '.kkkd..dkkk.', '.kkkd..dkkk.', '.kkkkddkkkk.', '.kkkkkkkkkk.', '..kkkkkkkk..', '...kkkkkk...', '............'],
    matrix: ['............', '...kkkkkk...', '..kkkkkkkk..', '.kkkkkkkkkk.', '.kw.....wkk.', '.kkkddddkkk.', '.kkkd..dkkk.', '.kkkddddkkk.', '.kkkkkkkkkk.', '..kkkkkkkk..', '...kkkkkk...', '............'],
    headphone: ['............', '....kkkk....', '...kk..kk...', '..kk....kk..', '..k......k..', '..k......k..', '.kkk....kkk.', '.kkk....kkk.', '.kkk....kkk.', '.kkk....kkk.', '............', '............'],
    isolation: ['............', '............', '............', '.kkkkkkkkkk.', '...d....d...', '...d....d...', '...d....d...', '.kkkkkkkkkk.', '............', '............', '............', '............'],
    firstpress: ['............', '...kkkkkk...', '..kkkkkkkk..', '.kkkkkkkkkk.', '.kkkkkkkkkk.', '.kkkkggkkkk.', '.kkkkggkkkk.', '.kkkkkkkkkk.', '.kkkkkkkkkk.', '..kkkkkkkk..', '...kkkkkk...', '............']
  };
  function pix(rows, size, cls) { return (typeof W.pixArtHTML === 'function' && rows) ? W.pixArtHTML(rows, size, cls) : ''; }
  function relicIcon(id, size) {
    var r = C && C.relics[id]; var rows = r && LAB_ICONS[r.icon];
    return rows ? pix(rows, size || 24) : '<span class="lb-ri">' + esc((r && r.name || '?').slice(0, 1)) + '</span>';
  }
  function sprRowsOf(key) {
    if (key && typeof key === 'object') return (typeof W.avatarRows === 'function') ? W.avatarRows(key) : null;
    var S = labSpr(); return S[key] || S.e0;
  }
  function sprHTML(key, size) { var rows = sprRowsOf(key); return rows ? pix(rows, size || 96) : ''; }
  function headHTML(key, size) { var rows = sprRowsOf(key); return rows ? pix(rows.slice(0, 10), size || 30) : ''; }   // 頭＋肩（地圖節點、預覽）
  function enemySpr(enemy) { return enemy ? (enemy.avatar || enemy.spr || 'e0') : 'e0'; }
  function playerAv() { return (save.player && save.player.avatar) || (C.avatarsFallback && C.avatarsFallback[0]) || { head: 'neat' }; }
  function playerName() { return (save.player && save.player.name) || '你'; }
  function ensurePlayer() {
    if (save.player && save.player.avatar) return;
    var me = null; try { me = W.DipChar && W.DipChar.load(); } catch (_) {}
    var av = me && me.avatar ? me.avatar : pickR(C.avatarsFallback || [{ head: 'neat' }]);
    var nm = me && me.name ? me.name : pickR(C.names || ['你']);
    save.player = { name: nm, avatar: av };
  }

  // ======================================================================= 常駐舞台（DipLabStage；§2、§5.3）
  // 舞台還沒好（或載入失敗）時，所有呼叫都是空操作：遊戲照樣能玩
  function stg(m) {
    var s = UI.stage; if (!s || typeof s[m] !== 'function') return null;
    var a = Array.prototype.slice.call(arguments, 1);
    try { return s[m].apply(s, a); } catch (e) { console.error(e); return null; }
  }
  function stgP() { var r = stg.apply(null, arguments); return (r && typeof r.then === 'function') ? r.then(null, function (e) { console.error(e); }) : Promise.resolve(r); }
  // 鏡頭：name＝full|reward|strip；screen 決定矮螢幕規則的面板最少高
  function cam(name, screen, ms) {
    UI.camName = name;
    if (ms == null) ms = UI.camQuick ? 0 : 450;
    return stgP('camera', name, { ms: Math.round(ms / speed()), screen: screen });
  }
  function anchorOf(id) { return stg('anchor', id); }
  function stageSay(id, text, tone, ms) { if (text) stg('say', id, text, { tone: tone || (id === 'o' ? 'owner' : null), ms: ms == null ? 2600 : ms }); }
  // 小人站位：put 一次就留在舞台上，換畫面不會消失；每個畫面只擺需要的
  function place(id, spot, spr) { stg('put', id, spot, spr); stg('hide', id, false); }
  function hideActor(id) { if (UI.stage && stg('has', id)) stg('hide', id, true); }
  function resetPoses() { ['p', 'f', 'o'].forEach(function (id) { stg('pose', id, null); stg('emote', id, null); stg('say', id, null); }); stg('untag'); }

  // ======================================================================= 封面、三軸、卡片
  var ATTRS = ['c', 'o', 'h'];
  function coverSrc(c) { return c ? (c.localCover || c.coverUrl || '') : ''; }
  function rarityCls(c) {
    if (!c) return '';
    if (c.tier) return 'ace ' + c.tier;
    if (c.gold) return 'r-gold';
    var s = (c.c || 0) + (c.h || 0) + ((c.o || 0) >= 5 ? 1 : 0);
    return s >= 9 ? 'r-legendary' : s >= 8 ? 'r-epic' : s >= 7 ? 'r-uncommon' : s >= 6 ? 'r-rare' : 'r-common';
  }
  // 封面：點一下＝唱片資訊（data-info）。img 一律 draggable=false（B06）
  function coverHTML(c, o) {
    o = o || {};
    if (!c) return '<span class="lb-cv"></span>';
    var st = o.size ? ' style="width:' + o.size + 'px;height:' + o.size + 'px"' : '';
    var badge = '';
    if (c.tier && o.badge !== false) badge = '<span class="badge ' + c.tier + '">' + esc((C.aceTitle || {})[c.tier] || '') + '</span>';
    else if (c.gold && o.badge !== false) badge = '<span class="badge gold">私藏</span>';
    if (o.isNew) badge += '<span class="badge new">NEW</span>';
    if (c.washed) badge += '<span class="badge mod">洗過</span>';
    else if (c.worn) badge += '<span class="badge mod">九成新</span>';
    var src = coverSrc(c);
    return '<span class="lb-cv ' + (o.frame === false ? '' : rarityCls(c)) + (o.sel ? ' sel' : '') + '"' + st + (o.info === false ? '' : ' data-info="1" data-cid="' + esc(c.id) + '"') +
      ' role="img" aria-label="' + esc(c.artist + '《' + c.album + '》') + '"><span class="alt" aria-hidden="true">' + esc(c.album) + '</span>' +
      (src ? '<img alt="" src="' + esc(src) + '" loading="lazy" draggable="false" onerror="this.remove()">' : '') + badge + '</span>';
  }
  // 三軸一行：經5冷3硬3（字＋色一起出現）
  function starsHTML(c, o) {
    o = o || {};
    if (!c) return '';
    var base = o.base || null;
    return '<span class="stars' + (o.cls ? ' ' + o.cls : '') + '">' + ATTRS.map(function (a) {
      var up = base && (c[a] || 0) > (base[a] || 0);
      return '<b class="' + a + (up ? ' up' : '') + '"><i>' + ZH1[a] + '</i>' + (c[a] || 0) + '</b>';
    }).join('') + '</span>';
  }
  // 卡片：封面（點＝資訊）＋藝人／專輯＋三軸＋「選這張」。點卡片其他地方＝選（§4.4）
  function tileHTML(c, o) {
    o = o || {};
    if (!c) return '';
    var cls = 'lb-ct' + (o.sel ? ' sel' : '') + (o.cls ? ' ' + o.cls : '');
    return '<div class="' + cls + '" data-cid="' + esc(c.id) + '"' + (o.data ? ' ' + o.data : '') + '>' + coverHTML(c, o) +
      (o.text === false ? '' : '<div class="ar">' + esc(c.artist) + '</div><div class="al">' + esc(c.album) + '</div>') +
      (o.stars === false ? '' : starsHTML(c, { base: o.base })) + (o.extra || '') +
      (o.pick ? '<button type="button" class="lb-pickb key" data-pick="' + esc(c.id) + '"' + (o.disabled ? ' disabled' : '') + '>' + esc(o.pick) + '</button>' : '') + '</div>';
  }
  function info(c, o) {
    var ci = CI(); if (!c || !ci) return Promise.resolve();
    if (typeof c === 'string') c = cardM(c) || card(c);
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
  function setTop(left, o) {
    o = o || {};
    var bar = UI.top; bar.innerHTML = '';
    bar.appendChild(el('div', 'tt', left));
    if (o.chips) o.chips.forEach(function (c) { bar.insertAdjacentHTML('beforeend', c); });
    if (o.hp && save.run) bar.insertAdjacentHTML('beforeend', '<span class="lb-hpchip' + (save.run.hp <= save.run.maxHp * 0.3 ? ' low' : '') + '">聲望 <b>' + save.run.hp + '/' + save.run.maxHp + '</b></span>');
    if (o.links) o.links.forEach(function (l) { var b = el('button', 'lnk', esc(l[0])); b.type = 'button'; b.setAttribute('data-a', l[2] || ''); b.addEventListener('click', function (e) { stopEv(e); if (UI.going) return; l[1](); }); bar.appendChild(b); });
    if (o.skip) { var sk = el('button', 'ti skip', '<span class="ff" aria-hidden="true"></span>'); sk.type = 'button'; sk.setAttribute('aria-label', '快轉到下一個選擇'); sk.addEventListener('click', function (e) { stopEv(e); o.skip(); }); bar.appendChild(sk); }
    if (o.help) { var hb = el('button', 'ti', '?'); hb.type = 'button'; hb.setAttribute('aria-label', '小抄'); hb.setAttribute('data-tut', 'help'); hb.addEventListener('click', function (e) { stopEv(e); if (UI.going) return; openHelp(); }); bar.appendChild(hb); }
    if (o.pause) { var pb = el('button', 'ti', '<span class="pz" aria-hidden="true"></span>'); pb.type = 'button'; pb.setAttribute('aria-label', '暫停選單'); pb.addEventListener('click', function (e) { stopEv(e); if (UI.going) return; openSettings(); }); bar.appendChild(pb); }
    if (o.close) { var cb = el('button', 'lnk', esc(o.closeLabel || '關閉')); cb.type = 'button'; cb.setAttribute('aria-label', '關閉'); cb.setAttribute('data-a', 'close'); cb.addEventListener('click', function (e) { stopEv(e); o.close(); }); bar.appendChild(cb); }
  }
  function modal(cls, html, onClose) {
    closeModal();
    var m = el('div', 'lb-modal');
    m.innerHTML = '<div class="pane ' + (cls || '') + '" role="dialog" aria-modal="true">' + html + '<div class="mfoot"><button type="button" class="lb-btn pri wide" data-x="1">關閉</button></div></div>';
    var close = function () { if (m.parentNode) m.remove(); UI.modal = null; if (m._off) m._off.forEach(function (f) { try { f(); } catch (_) {} }); if (onClose) onClose(); };
    m.addEventListener('click', function (e) { if (e.target === m) close(); });
    qs('[data-x]', m).addEventListener('click', function (e) { stopEv(e); close(); });
    D.body.appendChild(m);
    UI.modal = { el: m, close: close };
    return m;
  }
  function closeModal() { if (UI.modal) { var c = UI.modal.close; UI.modal = null; c(); } }
  // ---- 小抄（相剋三角＋短表；最下面「重看教學」）
  function triSVG() {
    return '<svg class="tri" viewBox="0 0 220 150" role="img" aria-label="相剋三角：冷門剋經典、經典剋硬蕊、硬蕊剋冷門">' +
      '<defs>' + ['c', 'o', 'h'].map(function (a) { var col = { c: '#1f5fae', o: '#6a3fa0', h: '#c11628' }[a]; return '<marker id="lbAh' + a + '" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="' + col + '"/></marker>'; }).join('') + '</defs>' +
      '<text x="110" y="18" text-anchor="middle" font-size="14" font-weight="700" fill="#6a3fa0">冷門</text>' +
      '<text x="24" y="142" text-anchor="middle" font-size="14" font-weight="700" fill="#1f5fae">經典</text>' +
      '<text x="196" y="142" text-anchor="middle" font-size="14" font-weight="700" fill="#c11628">硬蕊</text>' +
      '<line x1="98" y1="28" x2="36" y2="118" stroke="#6a3fa0" stroke-width="2.5" marker-end="url(#lbAho)"/>' +
      '<line x1="50" y1="137" x2="166" y2="137" stroke="#1f5fae" stroke-width="2.5" marker-end="url(#lbAhc)"/>' +
      '<line x1="184" y1="118" x2="122" y2="28" stroke="#c11628" stroke-width="2.5" marker-end="url(#lbAhh)"/></svg>';
  }
  function learnedHTML() {
    var L = (C.tutorial && C.tutorial.learned) || null, got = save.learned || {};
    if (!L) return '';
    var names = Object.keys(L).filter(function (k) { return got[k]; }).map(function (k) { return L[k]; });
    try { if (W.DipLabTut && W.DipLabTut.learned) W.DipLabTut.learned().forEach(function (t) { if (names.indexOf(t) < 0) names.push(t); }); } catch (_) {}
    var ttl = (C.tutorial.ui && C.tutorial.ui.learnedTitle) || '學會的規則';
    return names.length ? '<div class="lb-h3">' + esc(ttl) + '</div><div class="lb-learned">' + names.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' : '';
  }
  function openHelp() {
    var rows = C.helpRows || [], gl = C.helpGlyphs || [];
    var body = rows.length ? '<dl class="lb-gl">' + rows.map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('') + '</dl>' +
      (gl.length ? '<div class="lb-h3">他會出的字</div><div class="lb-glt">' + gl.map(function (g) { return '<span class="lb-glyph' + (g[0] === '晃' ? ' feint' : g[0] === '？' ? ' hidden' : '') + '">' + esc(g[0]) + '</span><span>' + esc(g[1]) + '</span>'; }).join('') + '</div>' : '')
      : '<p>' + esc(C.help) + '</p>';
    var canReplay = canTutorial() && UI.screen !== 'duel';
    var m = modal('lb-help', '<h2>小抄</h2>' + triSVG() + body + learnedHTML() +
      (canReplay ? '<button type="button" class="lb-btn wide" data-a="replay">' + esc(tutLabel('replay', '重看教學')) + '</button>' : ''));
    var rb = qs('[data-a=replay]', m);
    if (rb) rb.addEventListener('click', function (e) { stopEv(e); closeModal(); replayTutorial(); });
  }
  // ---- ⏸ 暫停選單（聲音、動畫加速、唱片櫃、讀人圖鑑、重看／跳過教學、重置）
  function nowPlayingLine() {
    var f = FX(), c = f && f.music && f.music.current && f.music.current();
    var on = !!(f && f.music && f.music.playing && f.music.playing());
    if (!c) return '';
    return '<button type="button" class="lb-np' + (on ? ' on' : '') + '" data-a="np" data-cid="' + esc(c.id) + '"><span class="rec" aria-hidden="true"></span><span class="k">' + (on ? '播放中' : '暫停中') + '</span><b>' + esc(c.artist) + '《' + esc(c.album) + '》</b></button>';
  }
  function tutLabel(k, d) { var u = C && C.tutorial && C.tutorial.ui; return (u && typeof u[k] === 'string' && u[k]) || d; }
  function swHTML(on) { return '<span class="sw' + (on ? ' on' : '') + '">' + (on ? '開' : '關') + '</span>'; }
  function openSettings() {
    var S = save.settings, armed = false;
    var tutOn = !!(W.DipLabTut && W.DipLabTut.active && W.DipLabTut.active());
    var html = '<h2>暫停</h2>' + nowPlayingLine() + '<div class="lb-menu">' +
      '<button type="button" class="lb-btn pri big" data-a="resume">繼續</button>' +
      (UI.screen !== 'title' && !UI.tutReplay ? '<button type="button" class="lb-btn big" data-a="title">回標題（存檔）</button>' : '') +
      '<div class="row"><button type="button" class="lb-btn big" data-a="shelf">唱片櫃</button><button type="button" class="lb-btn big" data-a="book">讀人圖鑑</button></div>' +
      '<button type="button" class="lb-btn big sp" data-a="snd">聲音 ' + swHTML(soundOn()) + '</button>' +
      '<button type="button" class="lb-btn big sp" data-a="fast">動畫加速 ' + swHTML(S.fastAnim) + '</button>' +
      (tutOn ? '<button type="button" class="lb-btn big" data-a="skiptut">' + esc(tutLabel('skipTut', '跳過教學')) + '</button>' : (canTutorial() && UI.screen !== 'duel' ? '<button type="button" class="lb-btn big" data-a="replay">' + esc(tutLabel('replay', '重看教學')) + '</button>' : '')) +
      '<button type="button" class="lb-btn big ghost" data-a="reset">重置試做版存檔</button></div>';
    var m = modal('', html);
    var f = FX();
    var syncNp = function () { var b = qs('[data-a=np]', m), h = nowPlayingLine(); if (b) { if (h) b.outerHTML = h; else b.remove(); } };
    var off = f && f.music && f.music.onChange ? f.music.onChange(syncNp) : null;
    m._off = off ? [off] : [];
    m.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b) return;
      var a = b.getAttribute('data-a');
      if (a === 'resume') closeModal();
      else if (a === 'np') { info(b.getAttribute('data-cid'), { from: 'pause' }); }
      else if (a === 'title') { closeModal(); persist(); unmountDuel(); go('title'); }
      else if (a === 'shelf' || a === 'book') { closeModal(); persist(); openPage(a); }
      else if (a === 'snd') {
        var want = !soundOn(); var fx = FX();
        if (fx && fx.setSound) try { fx.setSound(want); } catch (err) { console.error(err); }
        save.settings.sound = want; persist();
        b.innerHTML = '聲音 ' + swHTML(soundOn());
      } else if (a === 'fast') {
        S.fastAnim = !S.fastAnim; persist();
        b.innerHTML = '動畫加速 ' + swHTML(S.fastAnim);
        var fx2 = FX(); if (fx2 && fx2.setSpeed) fx2.setSpeed(speed());
        if (UI.screen === 'duel' && W.DipLabDuel && W.DipLabDuel.rerender) try { W.DipLabDuel.rerender(); } catch (err) { console.error(err); }
      } else if (a === 'skiptut') { closeModal(); try { W.DipLabTut.skip(); } catch (err) { console.error(err); } }
      else if (a === 'replay') { closeModal(); replayTutorial(); }
      else if (a === 'reset') {
        if (!armed) { armed = true; b.textContent = '再按一次：真的清掉唱片櫃與圖鑑'; b.classList.add('pri'); return; }
        var keepSound = save.settings.sound;
        save = defSave(); save.settings.sound = keepSound; persist(); closeModal();
        unmountDuel(); go('title');
      }
    });
  }

  // ======================================================================= 路由
  var UI = { screen: null, params: null, modal: null, stage: null, dlg: null, auto: null, trail: [], seedOverride: null, timers: [], going: false,
    top: null, stageHost: null, panel: null, decor: [], camName: 'full', pendingSeen: {}, offs: [] };
  var SCREENS = {};
  function app() { return D.getElementById('app'); }
  function later(fn, ms) { var t = setTimeout(fn, ms / speed()); UI.timers.push(t); return t; }
  function unmountDuel() { if (W.DipLabDuel && W.DipLabDuel.unmount) { try { W.DipLabDuel.unmount(); } catch (_) {} } }
  function cleanup() {
    if (UI.dlg) { UI.dlg.cancel(); UI.dlg = null; }
    UI.timers.forEach(clearTimeout); UI.timers = [];
    UI.offs.forEach(function (f) { try { f(); } catch (_) {} }); UI.offs = [];
    UI.decor.forEach(function (d) { if (d && d.remove) d.remove(); }); UI.decor = [];
    qsa('.lb-sheet.float', app()).forEach(function (s) { s.remove(); });
    UI.going = false; UI.lastAct = null;
    closeModal();
    var ci = CI(); if (ci && ci.isOpen()) ci.close();
    stg('highlight', []); stg('clearStamps');
  }
  function go(id, params) {
    if (UI.screen === 'duel' && id !== 'duel') unmountDuel();
    cleanup();
    closePage(true);
    UI.screen = id; UI.params = params || {};
    UI.trail.push(id); if (UI.trail.length > 80) UI.trail.shift();
    app().setAttribute('data-screen', id);
    D.body.setAttribute('data-screen', id);
    var p = UI.panel; p.className = 'lb-panel'; p.removeAttribute('style'); p.innerHTML = '';
    var f = FX(); if (f && f.rainStop && id !== 'title' && id !== 'scene') try { f.rainStop(); } catch (_) {}
    try { SCREENS[id](UI.params); } catch (e) { console.error(e); }
    UI.camQuick = false;
    if (UI.auto && UI.auto.until === id) UI.auto = null;
  }
  // 面板換內容：舊的往下淡出 150 ms（對白框 → 盤面、節點預覽 → 走過去）
  function ghostPanel() {
    var p = UI.panel; if (!p || !p.firstChild || rm()) return;
    var r = p.getBoundingClientRect(), ar = app().getBoundingClientRect();
    var g = el('div', 'lb-ghost'); g.style.cssText = 'top:' + Math.round(r.top - ar.top) + 'px;height:' + Math.round(r.height) + 'px';
    while (p.firstChild) g.appendChild(p.firstChild);
    app().appendChild(g);
    var a = g.animate ? g.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(18px)' }], { duration: 150, easing: 'ease-in', fill: 'forwards' }) : null;
    setTimeout(function () { g.remove(); }, a ? 180 : 0);
  }

  // ======================================================================= 場景（scene）：舞台 full＋對白窗＋包包條
  function buildScene(p) {
    p = p || {};
    var chips = [];
    if (save.run && save.run.goodEar) chips.push('<span class="chip gold">好耳朵</span>');
    setTop(nightLabel(save.run), { chips: chips, skip: function () { if (UI.dlg) UI.dlg.skip(); }, help: !!p.help });
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
    if (p.fSil != null) stg('sil', 'f', !!p.fSil);
    var sc = { panel: panel, box: dq, dq: dq, strip: strip, stripState: p.stripState || null };
    if (strip) renderStrip(sc);
    var f = FX(); if (soundOn() && f.rainStart) try { f.rainStart(); } catch (_) {}
    return sc;
  }
  function stripFromRun() { var r = save.run; if (!r) return { ace: null, bag: [] }; return { ace: C.aces[r.aceTier], bag: r.deck.slice() }; }
  function renderStrip(sc) {
    if (!sc.strip) return;
    var s = sc.stripState || stripFromRun();
    var slot = function (id, cls, key) {
      var c = id && cardM(id);
      return '<div class="slot' + cls + (c ? ' filled' : '') + '" data-slot="' + key + '"' + (c ? ' data-info="1" data-cid="' + esc(id) + '" role="button" aria-label="' + esc(c.artist + '《' + c.album + '》') + '"' : '') + '>' +
        (c ? '<img alt="" draggable="false" src="' + esc(coverSrc(c)) + '" onerror="this.remove()">' : '') + '</div>';
    };
    var h = '<span class="lab">包包</span>' + slot(s.ace, ' ace', 'ace') + '<span class="sep"></span>';
    for (var i = 0; i < Math.min(7, Math.max(7, s.bag.length)); i++) h += slot(s.bag[i], C.junk.indexOf(s.bag[i]) >= 0 ? ' junk' : '', i);
    if (s.bag.length > 7) h += '<span class="tag">+' + (s.bag.length - 7) + '</span>';
    else if (s.label) h += '<span class="tag">' + esc(s.label) + '</span>';
    sc.strip.innerHTML = h;
  }
  function flyCover(c, fromEl, toEl, delay) {
    return new Promise(function (res) {
      if (!fromEl || !toEl || !c || rm()) return res();
      var a = fromEl.getBoundingClientRect(), b = toEl.getBoundingClientRect();
      var S0 = 40, f = el('div', 'lb-fly');
      f.style.cssText = 'left:' + (a.left + a.width / 2 - S0 / 2) + 'px;top:' + (a.top + a.height * 0.3) + 'px;width:' + S0 + 'px;height:' + S0 + 'px;background-image:url("' + coverSrc(c).replace(/"/g, '%22') + '");opacity:0';
      D.body.appendChild(f);
      var dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height * 0.3 + S0 / 2), sc = b.width / S0;
      var dur = 520 / speed();
      setTimeout(function () {
        sfx('flip');
        var an = f.animate([{ transform: 'translate(0,0) scale(.6)', opacity: 0 }, { transform: 'translate(' + dx * 0.15 + 'px,' + (dy * 0.15 - 30) + 'px) scale(1.05)', opacity: 1, offset: 0.3 },
          { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sc + ')', opacity: 1 }], { duration: dur, easing: 'cubic-bezier(.3,.7,.3,1)', fill: 'forwards' });
        var fin = function () { f.remove(); res(); };
        an.onfinish = fin; setTimeout(function () { if (f.isConnected) fin(); }, dur + 200);
      }, (delay || 0) / speed());
    });
  }
  function giveCards(sc, kind, instant) {
    var r = save.run; if (!r || !sc.strip) return Promise.resolve();
    var s = sc.stripState || (sc.stripState = { ace: null, bag: [] });
    var ids = kind === 'ace' ? [C.aces[r.aceTier]] : kind === 'gifts' ? (C.gifts[r.aceTier] || []) : (C.junk || []);
    var from = anchorOf('o');
    var jobs = ids.map(function (id, k) {
      var slot = kind === 'ace' ? qs('[data-slot=ace]', sc.strip) : qs('[data-slot="' + (s.bag.length + k) + '"]', sc.strip);
      if (instant) return Promise.resolve();
      return flyCover(card(id), from, slot, k * 140);
    });
    return Promise.all(jobs).then(function () {
      if (kind === 'ace') s.ace = ids[0]; else s.bag = s.bag.concat(ids);
      if (kind === 'junk') s.label = C.junkLabel;
      renderStrip(sc);
    });
  }

  // ======================================================================= 對白（RPG 對話窗；打字機 28 ms、▼、⏩）
  function voiceOf(who) {
    if (who === '老闆') return C.voices && C.voices.owner;
    if (who === '男子') return C.enemies.man.voice;
    if (who === '藏家') return C.enemies.boss.voice;
    return null;
  }
  function Dialogue(sc, ctx) {
    var st = { cancelled: false, typing: false, timer: null, finish: null, onTap: null, skipping: false };
    var dq = sc.dq, nm = qs('.nm', dq), tx = qs('.tx', dq), nx = qs('.nx', dq), menu = qs('.menu', dq);
    ctx = ctx || {}; ctx.flags = ctx.flags || {};
    function tap() {
      if (st.cancelled) return;
      if (st.typing && st.finish) { st.finish(); return; }
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
      var name = who === 'player' ? playerName() : who;
      nm.textContent = name || '';
      dq.classList.toggle('narr', !who);
      dq.classList.toggle('foe', who === '男子');
      dq.classList.toggle('boss', who === '藏家');
    }
    function typeText(text, voice) {
      return new Promise(function (res) {
        var n = 0; st.typing = true; tx.textContent = '';
        var done = function () { if (st.timer) clearInterval(st.timer); st.timer = null; st.typing = false; st.finish = null; tx.textContent = text; res(); };
        st.finish = done;
        if (st.skipping || !text) return done();
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
        if (st.skipping && ms != null) fin();
      });
    }
    function showNext(on, choice) { nx.classList.toggle('on', !!on); nx.classList.toggle('choice', !!choice); }
    function applyStage(sg, instant) {
      if (!sg) return Promise.resolve();
      var jobs = [];
      if (sg.fSpr) stg('sprite', 'f', sg.fSpr);
      if (sg.oPath) {
        if (instant) place('o', sg.oPath[sg.oPath.length - 1], 'owner');
        else {
          var dig = sg.oPath.some(function (k) { return /^dig/.test(k); });
          stg('hide', 'o', false);
          if (dig) stg('pose', 'o', 'dig');
          jobs.push(stgP('walk', 'o', sg.oPath).then(function () { stg('pose', 'o', null); }));
        }
      } else if (sg.o) place('o', sg.o, 'owner');
      if (sg.p) place('p', sg.p, 'player');
      if (sg.f) {
        if (sg.f === 'out') { place('f', 'out'); stg('sil', 'f', true); }
        else {
          var at = stg('pos', 'f');
          stg('sil', 'f', false);
          if (!instant && at && !at.hidden && stg('has', 'f')) {
            stg('hide', 'f', false);
            jobs.push(stgP('walk', 'f', at.outside ? ['door', sg.f] : [sg.f]));
          } else place('f', sg.f);
        }
      }
      if (sg.door) stg('door', sg.door === 'shut' ? 'close' : (instant && sg.door === 'swing' ? 'close' : sg.door));
      if ('notes' in sg) stg('play', !!sg.notes);
      if ('oBusy' in sg) stg('pose', 'o', sg.oBusy ? 'busy' : null);
      if ('anger' in sg) { stg('emote', 'p', sg.anger ? 'anger' : null); if (sg.anger) sfx('faceChange'); }
      if (sg.give) jobs.push(giveCards(sc, sg.give, instant));
      return Promise.all(jobs);
    }
    function music(kind) {
      var f = FX(); if (!f) return;
      if (kind === 'tonight' && ctx.tonightId) {
        var c = card(ctx.tonightId);
        if (!f.soundOn()) { ctx.quiet = true; return; }
        var settled = false;
        f.music.play(c, { fadeMs: 1500 }).then(function (ok) { settled = true; if (!ok) ctx.quiet = true; else ctx.heard = true; });
        setTimeout(function () { if (!settled) ctx.quiet = true; }, 2500);
      } else if (kind === 'stop') { try { f.music.stop({ fadeMs: 1500 }); } catch (_) {} }
    }
    var api = {
      ctx: ctx,
      cancel: function () { st.cancelled = true; if (st.timer) clearInterval(st.timer); D.removeEventListener('keydown', keyH); },
      skip: function () { if (st.cancelled) return; st.skipping = true; if (st.typing && st.finish) st.finish(); if (st.onTap && !st.choiceWait) st.onTap(); },
      menu: function (items, o) {
        o = o || {};
        return new Promise(function (res) {
          menu.innerHTML = '';
          guardClicks(menu);
          items.forEach(function (it, i) {
            var b = el('button', 'lb-dqopt key', '<span class="cur" aria-hidden="true">▸</span>' + esc(String(it).replace(/^▶\s*/, '')));
            b.type = 'button'; b.setAttribute('data-i', i);
            b.addEventListener('click', function (e) { stopEv(e); sfx('tick'); menu.innerHTML = ''; dq.classList.remove('hasmenu'); UI.panel.classList.remove('menu-open'); camBackSoon(); res(i); });
            menu.appendChild(b);
          });
          dq.classList.add('hasmenu');
          // 選項需要空間：包包條先收起來、鏡頭收成 reward（面板 296px 以上）
          UI.panel.classList.add('menu-open');
          clearTimeout(UI.camBack); UI.camBack = 0;
          if (UI.camName !== 'reward') cam('reward', 'reward', 300);
          focusFirst(menu, '.lb-dqopt');
          autoAct(function () { var b = qs('button[data-i="' + (o.autoIndex || 0) + '"]', menu) || qs('button', menu); if (b) b.click(); });
        });
      },
      say: function (who, text, o) { return api.run([{ who: who, text: text }], o); },
      run: function (beats, onUi) {
        var i = 0;
        var next = function () {
          if (st.cancelled) return new Promise(function () {});
          if (i >= beats.length) return Promise.resolve();
          var b = beats[i++];
          if (b.if && !ctx.flags[b.if]) return next();
          if (b.ui === 'acePick' && ctx.acePicked) return next();
          stg('clearStamps');
          var instant = st.skipping && !b.ui;
          var p0 = applyStage(b.stage, st.skipping);
          if (b.music) music(b.music);
          if (b.stamp && !instant) {
            var parts = String(b.stamp).split('：');
            stg('stamp', parts[0], parts[1] || '', b.who === '藏家' ? 'ink' : 'gold', 0);
            sfx('readHit');
          }
          if (instant) return p0.then(next);
          setWho(b.who);
          var text = (ctx.quiet && b.quietText) ? b.quietText : b.text;
          showNext(false);
          return typeText(text, voiceOf(b.who)).then(function () {
            if (b.ui) {
              st.skipping = false;
              var autoOpen = b.ui === 'acePick' && !b.who;
              var opener = autoOpen ? wait(350) : (showNext(true, true), st.choiceWait = true, autoAct(function () { tap(); }, 120), waitTap());
              return opener.then(function () { st.choiceWait = false; showNext(false); return p0; })
                .then(function () { return onUi ? onUi(b.ui, b) : null; }).then(next);
            }
            showNext(true, false);
            var ms = Math.min(3500, 900 + 90 * text.length);
            if (UI.auto) ms = 120;
            return Promise.all([p0, waitTap(ms)]).then(next);
          });
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
  // 換面板的防連點（R1）：剛換上的面板 GUARD_MS 內真人的點擊不算（自動遊玩的 b.click() 不受影響）
  var GUARD_MS = FAST ? 160 : 380;
  function guardClicks(node) {
    node.classList.add('arming');
    setTimeout(function () { node.classList.remove('arming'); }, GUARD_MS);
    if (node._guarded) return;
    node._guarded = true;
    node.addEventListener('click', function (e) { if (e.isTrusted && node.classList.contains('arming')) { e.stopImmediatePropagation(); e.preventDefault(); } }, true);
  }
  function focusFirst(root, sel) {
    requestAnimationFrame(function () {
      if (!root.isConnected) return;
      var ae = D.activeElement; if (ae && ae !== D.body && root.contains(ae)) return;
      var b = qsa(sel || 'button:not([disabled])', root).find(function (x) { var cs = getComputedStyle(x); return cs.visibility !== 'hidden' && cs.display !== 'none'; });
      if (b) try { b.focus({ preventScroll: true }); } catch (_) {}
    });
  }
  // 面板蓋在 #panel 上（對白窗、時間軸收在底下）；場景裡開面板時鏡頭換 reward，讓面板有 296px 以上
  function sheet(html, cls, o) {
    o = o || {};
    qsa(':scope > .lb-sheet', UI.panel).forEach(function (s) { s.remove(); });
    var s = el('div', 'lb-sheet' + (cls ? ' ' + cls : ''), html);
    s.addEventListener('click', stopEv);
    guardClicks(s);
    UI.panel.appendChild(s);
    UI.panel.classList.add('sheeted');
    clearTimeout(UI.camBack); UI.camBack = 0;
    if (UI.screen === 'scene' && o.cam !== false && UI.camName !== 'reward') cam('reward', 'reward', 380);
    focusFirst(s);
    return s;
  }
  function camBackSoon() {
    if (UI.screen !== 'scene' || UI.camName !== 'reward') return;
    var scr0 = UI.screen;
    clearTimeout(UI.camBack);
    UI.camBack = setTimeout(function () { UI.camBack = 0; if (UI.screen === scr0 && !qs(':scope > .lb-sheet', UI.panel) && !UI.panel.classList.contains('menu-open') && UI.camName === 'reward') cam('full', 'scene', 380); }, 160);
  }
  function closeSheet(s) {
    if (!s) return;
    if (s.parentNode) s.remove();
    if (!qs(':scope > .lb-sheet', UI.panel)) {
      UI.panel.classList.remove('sheeted');
      camBackSoon();
      qsa(':scope > .lb-tl, :scope > .lb-bagline', UI.panel).forEach(guardClicks);
    }
  }
  // 浮在舞台下緣的預覽面板（地圖：點節點／點店裡亮的東西）
  function floatSheet(html, cls) {
    qsa('.lb-sheet.float', app()).forEach(function (s) { s.remove(); });
    var s = el('div', 'lb-sheet float' + (cls ? ' ' + cls : ''), html);
    s.addEventListener('click', stopEv);
    guardClicks(s);
    bindInfoTaps(s);
    app().appendChild(s);
    focusFirst(s);
    return s;
  }
  function playingTag() {
    var f = FX(); var on = !!(f && f.music && f.music.playing && f.music.playing());
    return on ? '<span class="lb-playing"><span class="rec" aria-hidden="true"></span>播放中</span>' : '';
  }
  // 「● 播放中」只在真的在放時顯示（B05／B13）：跟著 FX().music 的狀態更新
  function watchPlaying(host) {
    var f = FX(); if (!f || !f.music || !f.music.onChange) return;
    var upd = function () { if (!host.isConnected) return; host.innerHTML = playingTag(); };
    upd();
    var off1 = f.music.onChange(upd), off2 = f.onSound ? f.onSound(upd) : null;
    UI.offs.push(off1); if (off2) UI.offs.push(off2);
    var iv = setInterval(upd, 1500); UI.offs.push(function () { clearInterval(iv); });
  }

  // 猜歌（只亮封面、藝人、專輯，不亮星數）：封面＝唱片資訊、卡片其他地方或「是這張」＝作答
  function guessPanel(sc, ctx, beat) {
    return new Promise(function (res) {
      var ids = shuffled(TIERS.map(function (t) { return C.aces[t]; }));
      var s = sheet('<div class="hd"><h3>' + esc(beat.prompt || '剛才那段，是哪一張？') + '</h3><span class="np"></span></div>' +
        '<div class="lb-trio">' + ids.map(function (id) { return tileHTML(card(id), { stars: false, frame: false, badge: false, pick: '是這張' }); }).join('') + '</div>' +
        '<p class="note">音樂會繼續放，不會換歌。點封面看唱片資訊。</p>', 'guess');
      watchPlaying(qs('.np', s));
      var done = false;
      s.addEventListener('click', function (e) {
        var t = e.target.closest && e.target.closest('.lb-ct'); if (!t || done) return;
        done = true;
        var id = t.getAttribute('data-cid'), right = id === ctx.tonightId;
        qsa('.lb-ct', s).forEach(function (x) { var xid = x.getAttribute('data-cid'); x.classList.toggle('right', xid === ctx.tonightId); x.classList.toggle('wrong', xid !== ctx.tonightId && xid === id); });
        sfx(right ? 'readHit' : 'tick');
        ctx.flags.guessRight = right; ctx.flags.guessWrong = !right;
        setTimeout(function () { closeSheet(s); res(right); }, 900 / speed());
      });
      autoAct(function () { var b = qs('[data-pick]', s); if (b) b.click(); });
    });
  }
  // 挑王牌：卡片＝換聽（選）、封面＝唱片資訊、「就這張」確認（sticky）
  function acePickPanel(sc, ctx, beat) {
    return new Promise(function (res) {
      var f = FX();
      var sel = ctx.defaultTier || 'hall';
      var prompt = ctx.quiet ? ((beat && (beat.prompt && /挑一張帶走/.test(beat.prompt) ? beat.prompt : beat.quietText)) || '（挑一張帶走。）') : ((beat && beat.prompt) || (beat && beat.text) || '（點封套換著聽，挑一張帶走。）');
      var html = '<div class="hd"><h3>' + esc(prompt) + '</h3><span class="np"></span></div><div class="lb-trio">' +
        TIERS.map(function (t) {
          var c = card(C.aces[t]), ax = C.aceAxis[t];
          return tileHTML(c, { sel: t === sel, stars: false, text: false, data: 'data-tier="' + t + '"',
            extra: '<div class="acex"><span class="' + ax + '">' + esc(C.aceTitle[t]) + '・' + ZH[ax] + ' 7</span></div><div class="al one">' + esc(c.album) + '</div>' });
        }).join('') + '</div><p class="note detail"></p><div class="foot"><button type="button" class="lb-btn pri big wide key" data-a="ok">就這張</button></div>';
      var s = sheet(html, 'acepick');
      watchPlaying(qs('.np', s));
      var det = qs('.detail', s);
      function mark() {
        qsa('.lb-ct', s).forEach(function (x) { var on = x.getAttribute('data-tier') === sel; x.classList.toggle('sel', on); });
        det.innerHTML = '<b>' + esc(C.ears[sel].name) + '</b>：' + esc(C.ears[sel].desc) + '　<b>' + esc(C.acePassives[sel].name) + '</b>：' + esc(C.acePassives[sel].desc);
      }
      mark();
      s.addEventListener('click', function (e) {
        var t = e.target.closest && e.target.closest('.lb-ct');
        if (t) {
          var tier = t.getAttribute('data-tier'); if (tier === sel) return;
          sel = tier; sfx('select'); mark();
          if (f && f.soundOn && f.soundOn()) f.music.play(card(C.aces[sel]), { fadeMs: 1500 });
          return;
        }
        if (e.target.closest && e.target.closest('[data-a=ok]')) { sfx('select'); closeSheet(s); ctx.acePicked = true; res(sel); }
      });
      autoAct(function () { var b = qs('[data-a=ok]', s); if (b) b.click(); }, 260);
    });
  }
  // 發燒配件三選一
  function relicPanel(sc, choices, opts) {
    opts = opts || {};
    return new Promise(function (res) {
      var html = '<div class="hd"><h3>' + esc(opts.prompt || '挑一件發燒配件') + '</h3></div><div class="lb-opts">' +
        (choices.length ? choices : [null]).map(function (id) {
          if (!id) return '<button type="button" class="lb-btn big key" data-r="">' + esc((C.relicFallback && C.relicFallback.label) || '回 4 聲望') + '</button>';
          var r = C.relics[id];
          return '<button type="button" class="lb-btn big lb-relic" data-r="' + esc(id) + '"><span class="pix">' + relicIcon(id, 30) + '</span><span class="tx"><span class="nm key">' + esc(r.name) + '</span><span class="ds">' + esc(r.desc) + '</span></span></button>';
        }).join('') + '</div>';
      var s = sheet(html, 'relics');
      s.addEventListener('click', function (e) {
        var b = e.target.closest && e.target.closest('[data-r]'); if (!b) return;
        sfx('select'); closeSheet(s); res(b.getAttribute('data-r') || null);
      });
      autoAct(function () { var pick = E.routePolicy(save.run, C); var id = pick && pick.relicId; var b = id ? qs('[data-r="' + id + '"]', s) : qs('[data-r]', s); if (b) b.click(); });
    });
  }
  // 包包滿了：先丟一張（點卡片＝拿出來；封面＝唱片資訊；sticky 取消）
  function dropPanel(sc, incomingId) {
    return new Promise(function (res) {
      var r = save.run;
      var html = '<div class="hd"><h3>' + esc(C.lines.owner.bagFull || '包包滿了。先拿一張出來。') + '</h3></div>' +
        '<p class="msg">要放進來的是《' + esc((card(incomingId) || {}).album || '') + '》。挑一張拿出來，它會留在唱片櫃。</p>' +
        '<div class="lb-pick">' + r.deck.map(function (id) { return tileHTML(cardM(id), { text: false, pick: '拿出來' }); }).join('') + '</div>' +
        '<div class="foot"><button type="button" class="lb-btn wide" data-a="cancel">算了，不放了</button></div>';
      var s = sheet(html, 'drop');
      s.addEventListener('click', function (e) {
        var t = e.target.closest && e.target.closest('.lb-ct');
        if (t) { sfx('tick'); closeSheet(s); res(t.getAttribute('data-cid')); return; }
        if (e.target.closest && e.target.closest('[data-a=cancel]')) { closeSheet(s); res(null); }
      });
      autoAct(function () { var pick = E.routePolicy(save.run, C); var id = pick && pick.dropId; var b = id ? qs('.lb-ct[data-cid="' + id + '"] [data-pick]', s) : qs('[data-pick]', s); if (b) b.click(); });
    });
  }
  // 從包包挑一張（事件送盤／洗盤）
  function pickCardPanel(sc, title, filterFn, opts) {
    opts = opts || {};
    return new Promise(function (res) {
      var r = save.run;
      var html = '<div class="hd"><h3>' + esc(title) + '</h3></div>' + (opts.msg ? '<p class="msg">' + opts.msg + '</p>' : '') +
        '<div class="lb-pick">' + r.deck.map(function (id) { var ok = !filterFn || filterFn(id); return tileHTML(cardM(id), { text: false, cls: ok ? '' : 'dis', pick: '選這張', disabled: !ok }); }).join('') + '</div>' +
        '<div class="foot"><button type="button" class="lb-btn wide" data-a="cancel">返回</button></div>';
      var s = sheet(html, 'pick');
      s.addEventListener('click', function (e) {
        var t = e.target.closest && e.target.closest('.lb-ct');
        if (t && !t.classList.contains('dis')) { sfx('select'); closeSheet(s); res(t.getAttribute('data-cid')); return; }
        if (e.target.closest && e.target.closest('[data-a=cancel]')) { closeSheet(s); res(null); }
      });
      autoAct(function () { var id = opts.autoId; var b = id ? qs('.lb-ct[data-cid="' + id + '"] [data-pick]', s) : qs('[data-pick]:not([disabled])', s); if (b) b.click(); });
    });
  }
  // 押盤翻開（§8.3）：壓扁換面（scaleX 1→0 換面 0→1；不用 3D，不可能鏡像：B01）
  function stakePanel(sc, cardId, opts) {
    opts = opts || {};
    return new Promise(function (res) {
      var c = card(cardId), isNew = !!opts.isNew, f = FX();
      var meta = '<div class="meta"><div class="ar">' + esc(c.artist) + '</div><div class="al">' + esc(c.album) + '</div><div class="yr">' + esc(c.year || '') + '</div>' +
        starsHTML(c, { cls: 'big' }) + '<button type="button" class="lnk" data-info="1" data-cid="' + esc(c.id) + '">點封面：唱片資訊</button></div>';
      var html = '<div class="hd"><h3>' + esc(opts.title || '他押的那張') + '</h3><span class="np"></span></div>' +
        '<div class="lb-flip"><div class="card3d" data-info="1" data-cid="' + esc(c.id) + '" role="button" aria-label="' + esc(c.artist + '《' + c.album + '》唱片資訊') + '"><div class="in">' +
        '<div class="back" aria-hidden="true"><span class="vinyl"></span></div>' +
        '<div class="face"><img alt="" draggable="false" src="' + esc(coverSrc(c)) + '" onerror="this.remove()"><span class="alt">' + esc(c.album) + '</span>' + (isNew ? '<span class="new">NEW</span>' : '') + '</div>' +
        '</div></div>' + meta + '</div>' +
        (opts.note ? '<p class="msg">' + opts.note + '</p>' : '') +
        '<div class="btns' + ((opts.buttons || []).length > 2 ? ' three' : '') + '">' + (opts.buttons || []).map(function (b, i) {
          return '<button type="button" class="lb-btn big col' + (b.pri ? ' pri' : '') + '" data-i="' + i + '"' + (b.disabled ? ' disabled' : '') + '><span class="lb">' + esc(b.label) + '</span>' + (b.sub ? '<span class="sub">' + esc(b.sub) + '</span>' : '') + '</button>';
        }).join('') + '</div>';
      var s = sheet(html, 'stake');
      watchPlaying(qs('.np', s));
      var box = qs('.card3d', s), inn = qs('.card3d .in', s), btns = qs('.btns', s);
      btns.style.visibility = 'hidden';
      var spd = speed();
      var reveal = function () {
        box.classList.add('shown');
        btns.style.visibility = '';
        focusFirst(btns);
        if (f && f.music && soundOn()) f.music.play(c, { fadeMs: 1500 });
        stg('play', true);
        autoAct(function () { var b = qs('[data-i="' + (opts.autoIndex || 0) + '"]', s); if (b && !b.disabled) b.click(); else { b = qs('[data-i]:not([disabled])', s); if (b) b.click(); } }, 200);
      };
      if (rm() || !inn.animate) setTimeout(reveal, 150);
      else {
        setTimeout(function () {
          inn.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(-3deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(0)' }], { duration: 240 / spd, iterations: 2 });
          setTimeout(function () {
            sfx('flip');
            var half = 160 / spd;
            var a1 = inn.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], { duration: half, easing: 'ease-in', fill: 'forwards' });
            a1.onfinish = function () {
              box.classList.add('shown');            // 中點換面：背面藏、封面現
              var a2 = inn.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: half, easing: 'ease-out', fill: 'forwards' });
              a2.onfinish = function () { a1.cancel(); a2.cancel(); reveal(); };
            };
          }, 520 / spd);
        }, 220 / spd);
      }
      s.addEventListener('click', function (e) {
        var b = e.target.closest && e.target.closest('[data-i]'); if (!b || b.disabled) return;
        sfx('select');
        var v = opts.buttons[+b.getAttribute('data-i')];
        Promise.resolve(v.onPick ? v.onPick() : true).then(function (ok) { if (ok === false) return; closeSheet(s); res(v.value); });
      });
    });
  }

  // ======================================================================= 吐司（z 40；唱片資訊開著時排隊：O4）
  var toastQ = [];
  function toast(text, cls) {
    if (!text) return;
    var ci = CI();
    if (ci && ci.isOpen()) { toastQ.push([text, cls]); return; }
    var t = el('div', 'lb-toast' + (cls ? ' ' + cls : ''), esc(text));
    app().appendChild(t);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, 1900 / speed());
  }
  function flushToasts() { var q = toastQ; toastQ = []; q.forEach(function (x, i) { setTimeout(function () { toast(x[0], x[1]); }, i * 300); }); }
  function effectsText(effects) {
    var out = [];
    var spill = (effects || []).some(function (f) { return f.overflowQi; });
    (effects || []).forEach(function (f) {
      if (f.hp != null) out.push(spill && f.hp > 0 ? '聲望回滿' : '聲望 ' + (f.hp >= 0 ? '+' : '−') + Math.abs(f.hp));
      if (f.overflowQi) out.push('多的變成下一場開局氣勢 +' + f.overflowQi);
      if (f.nextStartQi) out.push('下一場開局氣勢 +' + f.nextStartQi);
      if (f.gainCard) out.push('《' + ((card(f.gainCard) || {}).album || '') + '》進包包');
      if (f.loseCard) out.push('《' + ((card(f.loseCard) || {}).album || '') + '》拿出來了');
      if (f.gainRelic) out.push('拿到「' + ((C.relics[f.gainRelic] || {}).name || '') + '」');
      if (f.starUp) out.push('《' + ((card(f.starUp.cardId) || {}).album || '') + '》' + ZH[f.starUp.axis] + ' +1');
    });
    return out.join('・');
  }
  function spillNote(n) {
    var r = save.run; if (!r || !E.CFG.overflowQiAt) return '';
    var over = r.hp + n - r.maxHp;
    if (over < E.CFG.overflowQiAt || (r.ovQi | 0) >= E.CFG.overflowQiCap) return '';
    return r.hp >= r.maxHp ? '聲望已滿：改成下一場開局氣勢 +1' : '回滿，多的變成下一場開局氣勢 +1';
  }
  function doChoose(ch) {
    var res = E.choose(save.run, C, ch);
    if (res.error) console.warn('choose error', res.error, ch);
    shelfSync(); persist();
    return res;
  }

  // ======================================================================= title（§8.6）
  function firstEver() { return !save.prologueDone && !(save.nights && save.nights.length); }
  function shelfCount() { return { n: Object.keys(save.shelf).filter(card).length, total: Object.keys(C.cards).length }; }
  SCREENS.title = function () {
    var r = save.run, hasRun = !!(r && !r.over), overRun = !!(r && r.over);
    setTop(esc(dateLabel(seedKey())) + ' 的雨夜', { links: [['唱片櫃', function () { openPage('shelf'); }, 'shelf'], ['讀人圖鑑', function () { openPage('book'); }, 'book'], ['台北', function () { go('taipei', { back: 'title' }); }, 'taipei']] });
    var panel = UI.panel; panel.classList.add('title');
    var contSub = '';
    if (hasRun) {
      var col = r.map.cols.find(function (c) { return c.col === r.col; });
      var hpNow = (r.duel && r.duel.p && typeof r.duel.p.hp === 'number' && !r.duel.over) ? Math.max(0, r.duel.p.hp) : r.hp;
      contSub = (col ? col.time : '') + '・聲望 ' + hpNow;
    }
    var best = save.best.bySeedKey[seedKey()], sh = shelfCount();
    var infoLine = (best ? '今天最佳 ' + best + ' 分' : '') + (save.best.clears ? (best ? '・' : '') + '打烊 ' + save.best.clears + ' 次' : '') + (sh.n ? ((best || save.best.clears) ? '・' : '') + '唱片櫃 ' + sh.n + '／' + sh.total : '');
    var hint = line('titleHint');
    var h = '<div class="lb-tbtns">';
    if (hasRun) {
      h += '<button type="button" class="lb-btn pri big wide col key" data-a="cont">繼續今晚 ▸<span class="sub">' + esc(contSub) + '</span></button>' +
        '<div class="row"><button type="button" class="lb-btn key" data-a="push">重新推門</button><button type="button" class="lb-btn key" data-a="quiet">安靜地重新推門</button></div>' +
        '<p class="lb-warn" hidden>再按一次就放棄今晚（' + esc(contSub) + '），從頭推門。</p>';
    } else {
      h += '<button type="button" class="lb-btn pri big wide key" data-a="push">推門（有聲音）▸</button>' +
        '<button type="button" class="lb-btn big wide key" data-a="quiet">安靜地推門</button>' +
        (overRun ? '<button type="button" class="lb-btn wide" data-a="end">看今晚結算</button>' : '');
    }
    h += '</div>' + (hint ? '<p class="lb-foot">' + esc(hint) + '</p>' : '') + (infoLine ? '<p class="lb-foot sm">' + esc(infoLine) + '</p>' : '');
    panel.innerHTML = h;
    // 舞台：門關、雨、你在門外（剪影）、老闆在櫃檯
    cam('full', 'title', UI.firstScreen ? 0 : 450);
    stg('interact', 'title');
    place('o', 'counter', 'owner'); stg('pose', 'o', 'busy');
    hideActor('f'); hideActor('q1'); hideActor('q2');
    place('p', 'out', 'player'); stg('sil', 'p', true);
    stg('door', 'close'); stg('play', true); stg('dim', 1);
    // 標題牌：壓在舞台下緣（白底 2px 黑框＋4px 黑色硬陰影），不擋點
    var plate = el('div', 'lb-plate', '<b>品味對決<i>・</i>試做</b><small>dip vinyl game lab</small>');
    app().appendChild(plate); UI.decor.push(plate);
    var placePlate = function () { if (!plate.isConnected) return; var sh0 = UI.stageHost.getBoundingClientRect(), ar = app().getBoundingClientRect(); plate.style.top = Math.round(sh0.bottom - ar.top - 26) + 'px'; };
    placePlate(); if (W.ResizeObserver) { var ro = new ResizeObserver(placePlate); ro.observe(UI.stageHost); UI.offs.push(function () { ro.disconnect(); }); }
    var armed = null, armedAt = 0;
    panel.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b) return;
      var act = b.getAttribute('data-a');
      if (act === 'push' || act === 'quiet') {
        if (hasRun && armed === act && Date.now() - armedAt < 300) return;
        if (hasRun && armed !== act) {
          armed = act; armedAt = Date.now();
          qsa('[data-a=push],[data-a=quiet]', panel).forEach(function (x) { x.classList.toggle('armed', x === b); });
          b.textContent = act === 'push' ? '再按一次：重新推門' : '再按一次：安靜地重新推門';
          var w = qs('.lb-warn', panel); if (w) w.hidden = false;
          sfx('tick');
          return;
        }
        pushDoor(act === 'push');
      } else if (act === 'end') go('end');
      else if (act === 'cont') {
        var f = FX(); var want = save.settings.sound === true;
        if (f) { try { f.unlockFromGesture(want); } catch (_) {} }
        ensurePlayer(); resumeRun();
      }
    });
  };
  function pushDoor(withSound) {
    var f = FX();
    if (f) { try { if (f.init) f.init(); f.unlockFromGesture(withSound); if (f.setSpeed) f.setSpeed(speed()); } catch (e) { console.error(e); } }
    save.settings.sound = withSound;
    ensurePlayer(); persist();
    stg('sil', 'p', false);
    if (firstEver() && withSound && f && f.music && f.music.preload) {
      try { f.music.preload([card(C.aces[TIERS[E.fnv1a32(seedKey() + '#tonight') % 3]])].filter(Boolean)); } catch (e) { console.error(e); }
    }
    var first = !save.seen.reveal;
    if (firstEver()) startPrologue(!withSound);
    else startAgain();
    // 第一次進店：「看看能點什麼」一次（§8.6）
    if (first) { save.seen.reveal = true; persist(); later(function () { stg('reveal', 2600); }, 900); }
  }

  // ======================================================================= 開新的一晚
  function nightsFor(k) { return save.nights.filter(function (n) { return n.seedKey === k; }).length; }
  function createRun(o) {
    var k = seedKey();
    var r = E.newRun(C, { seedKey: k, nightNo: nightsFor(k) + 1, aceTier: o.aceTier, goodEar: !!o.goodEar, knownHabits: knownHabits(), knownCards: knownCards(), prologue: !!o.prologue });
    r.sv = RUN_SV;
    save.run = r; save.lastAceTier = o.aceTier;
    shelfAdd(C.aces[o.aceTier]); (C.gifts[o.aceTier] || []).forEach(shelfAdd); (C.junk || []).forEach(shelfAdd);
    persist();
    return r;
  }
  function tierOfCard(id) { for (var i = 0; i < TIERS.length; i++) if (C.aces[TIERS[i]] === id) return TIERS[i]; return null; }
  // ---- 序章（§8.7）
  function startPrologue(quiet) {
    var tonight = C.aces[TIERS[E.fnv1a32(seedKey() + '#tonight') % 3]];
    var ctx = { flags: {}, quiet: !!quiet, tonightId: tonight, defaultTier: tierOfCard(tonight) };
    save.run = null; persist();
    go('scene', { p: 'door', f: 'out', fSpr: enemySpr(C.enemies[C.prologueEnemy || 'man']), o: 'counter', stripState: { ace: null, bag: [] }, start: function (sc) {
      var dlg = Dialogue(sc, ctx);
      dlg.run(quiet ? C.script.quietPrologue : C.script.prologue, function (ui, b) { return prologueUi(ui, b, sc, dlg, ctx); });
    } });
  }
  function acePickAndCreate(sc, ctx, b, prologue) {
    return acePickPanel(sc, ctx, b).then(function (tier) {
      createRun({ aceTier: tier, goodEar: !!ctx.goodEar, prologue: prologue });
      if (ctx.goodEar && !qs('.chip.gold', UI.top)) qs('.tt', UI.top).insertAdjacentHTML('afterend', '<span class="chip gold">好耳朵</span>');
      return tier;
    });
  }
  function playerLine(label) { return /^……（|^（/.test(label) ? label : '「' + label + '」'; }
  function canTutorial() { return !!(C && C.tutorial && C.tutorial.hand && W.DipLabTut && typeof W.DipLabTut.duelHooks === 'function' && typeof W.DipLabTut.startDuelLesson === 'function'); }
  function prologueUi(ui, b, sc, dlg, ctx) {
    if (ui === 'guess') {
      if (ctx.quiet) return acePickAndCreate(sc, ctx, { prompt: '（挑一張帶走。）' }, true);
      return guessPanel(sc, ctx, b).then(function (right) { if (right) ctx.goodEar = true; });
    }
    if (ui === 'acePick') return acePickAndCreate(sc, ctx, b, true);
    if (ui === 'retort') {
      return dlg.menu(C.retorts.map(function (r) { return r.label; })).then(function (i) {
        var r = C.retorts[i];
        ctx.jab = /Mylo Xyloto/.test(r.label);
        stg('emote', 'p', null);
        return dlg.run([{ who: 'player', text: playerLine(r.label) }, { who: '男子', text: r.reply }]);
      });
    }
    if (ui === 'duel') {
      // 開打前兩顆鈕（§6.4）：「▶ 品味對決」帶教學／「▶ 直接開打（我會玩）」
      var tutOk = canTutorial();
      var items = (Array.isArray(b.prompts) && b.prompts.length) ? b.prompts.slice(0, tutOk ? 2 : 1) : [b.prompt || '▶ 品味對決'].concat(tutOk ? ['▶ 直接開打（我會玩）'] : []);
      return dlg.menu(items, { autoIndex: items.length > 1 ? 1 : 0 }).then(function (i) {
        var r = save.run; var n = r.map.cols[0].nodes[0];
        var tut = tutOk && i === 0;
        var jab = !tut && ctx.jab && C.cards['coldplay-mylo-xyloto'] && C.enemies[n.enemyId] && (C.enemies[n.enemyId].deck || []).indexOf('coldplay-mylo-xyloto') >= 0;
        startDuel(n.id, { tutorial: tut, firstRecordId: jab ? 'coldplay-mylo-xyloto' : null, firstBubble: jab ? (C.lines.man && C.lines.man.jabBubble) : null });
        return new Promise(function () {});
      });
    }
    return Promise.resolve();
  }
  // ---- 再來一夜（≤10 秒）
  function startAgain() {
    var ctx = { flags: {}, quiet: !soundOn(), defaultTier: save.lastAceTier || 'hall' };
    save.run = null; persist();
    go('scene', { p: 'door', f: 'hide', o: 'counter', stripState: { ace: null, bag: [] }, start: function (sc) {
      var dlg = Dialogue(sc, ctx);
      dlg.run(C.script.again, function (ui, b) {
        if (ui === 'acePick') return acePickAndCreate(sc, ctx, b, false).then(function () { go('map'); return new Promise(function () {}); });
        return Promise.resolve();
      });
    } });
  }
  // ---- 續玩
  function resumeRun() {
    var r = save.run;
    if (!r) return go('title');
    if (r.over) return go('end');
    var step = E.nextStep(r);
    if (!step) { save.run = null; persist(); return go('title'); }
    if (step === 'move' && r.col === 0 && r.map.cols[0] && r.map.cols[0].nodes[0].type === 'prologue') return startDuel(r.map.cols[0].nodes[0].id, { noEncounter: true, tutorial: !save.tutorialDone && canTutorial() });
    if (step === 'move') return go('map');
    if (step === 'duel') {
      // 教學場中途離開／重新整理：從第 1 手重開這場（B15；牌序固定所以結果一樣）
      if (r.tutDuel && r.duel && !r.duel.over && canTutorial()) { r.duel = null; persist(); return startDuel(r.pending.nodeId, { tutorial: true, noEncounter: true }); }
      return startDuel(r.pending.nodeId, { noEncounter: true });
    }
    if (step === 'stake' || step === 'relic') {
      var node = E.findNode(r, r.pending.nodeId);
      if (node && node.type === 'prologue') return epilogueFlow(r.pending.offer, true);
      return go('reward', { offer: r.pending.offer });
    }
    return go('node');
  }

  // ======================================================================= 對決（duel.js；進場／退場編排 §3.7）
  function preloadDuel(duel, node) {
    try {
      var cs = [].concat(duel.e.deck || [], duel.p.hand || [], duel.p.deck || []);
      cs.forEach(function (c) { var s = coverSrc(c); if (s) { var im = new Image(); im.src = s; } });
      var f = FX(); var list = [];
      if (node && node.stakeId) list.push(card(node.stakeId));
      if (duel.p.ace) list.push(duel.p.ace);
      if (duel.e.ace) list.push(duel.e.ace);
      if (f && f.music && f.music.preload) f.music.preload(list.filter(Boolean));
    } catch (e) { console.error(e); }
  }
  // 教學場的牌序（§6.3：ui.js 開教學場時做；duel.js 不碰）。C.tutorial：man{hp,phases}、records、hand[tier]、draw[tier]
  function prepTutorialDuel(duel, tier) {
    if (W.DipLabTut && typeof W.DipLabTut.prepareDuel === 'function') { try { W.DipLabTut.prepareDuel(duel, { tier: tier, content: C }); return; } catch (e) { console.error(e); } }
    var T = C.tutorial || {}; var cd = function (id) { return card(id); };
    var man = T.man || {};
    if (man.hp) { duel.e.hp = man.hp; duel.e.maxHp = man.hp; }
    if (Array.isArray(man.phases) && Array.isArray(duel.e.phases)) man.phases.forEach(function (ph, i) { if (duel.e.phases[i]) { if (ph.atHp != null) duel.e.phases[i].atHp = ph.atHp; if (ph.disc) duel.e.phases[i].disc = ph.disc.slice(); } });
    var hand = (T.hand && T.hand[tier]) || null, draw = (T.draw && T.draw[tier]) || [];
    if (hand) {
      var all = (C.gifts[tier] || []).concat(C.junk || []);
      duel.p.hand = hand.map(cd).filter(Boolean);
      var rest = draw.concat(all.filter(function (id) { return hand.indexOf(id) < 0 && draw.indexOf(id) < 0; }));
      duel.p.deck = rest.slice().reverse().map(cd).filter(Boolean);   // draw() 從尾巴拿：draw[0] 先抽
      duel.p.discard = [];
    }
    if (Array.isArray(T.records) && T.records.length > 1) duel.e.deck = T.records.slice(1).reverse().map(cd).filter(Boolean);
  }
  function startDuel(nodeId, o) {
    o = o || {};
    var r = save.run;
    var tutFirst = !!(o.tutorial && C.tutorial && C.tutorial.records && C.tutorial.records[0]);
    var res = E.startNodeDuel(r, C, nodeId, (o.firstRecordId || tutFirst) ? { firstRecordId: tutFirst ? C.tutorial.records[0] : o.firstRecordId } : undefined);
    if (!res || !res.duel) { console.error('startNodeDuel failed', res && res.error); go('map'); return; }
    if (o.tutorial && !res.resumed) { prepTutorialDuel(res.duel, r.aceTier); r.tutDuel = true; }
    else if (!o.tutorial) r.tutDuel = false;
    persist();
    var node = E.findNode(r, nodeId);
    bookOf(node.enemyId).met = true; persist();
    preloadDuel(res.duel, node);
    if (res.duel.over) { onDuelEnd(res.duel); return; }
    UI.ending = null;
    if (!o.noEncounter) ghostPanel();
    go('duel', { res: res, node: node, enter: !o.noEncounter, tutorial: !!o.tutorial, firstBubble: o.firstBubble || null });
  }
  // 對決的提示（§6.5 夜晚遇到才教）：DipLabTut.firstTime；save.seen 在玩家照著做完那一手才寫（B15）
  function duelHint(id, targets) {
    if (!id || save.seen[id] || UI.tutReplay) return;
    var T = W.DipLabTut;
    if (T && typeof T.firstTime === 'function') {
      // tutorial.js 自己記 save.seen（照著做完那一手才寫，B15）
      if (!(T.active && T.active())) { try { T.firstTime(id, targets || []); } catch (e) { console.error(e); } }
      return;
    }
    if (UI.pendingSeen[id]) return;
    UI.pendingSeen[id] = true;
    var tx = C.hints && C.hints[id];
    if (tx) stageSay('o', tx, 'owner', 3400);
  }
  function commitSeen() {
    var ks = Object.keys(UI.pendingSeen); if (!ks.length) return;
    ks.forEach(function (k) { save.seen[k] = true; }); UI.pendingSeen = {}; persist();
  }
  function duelHooks(node, p) {
    var tut = null;
    if (p.tutorial && canTutorial()) { try { tut = W.DipLabTut.duelHooks(); } catch (e) { console.error(e); tut = null; } }
    return {
      stage: UI.stage,
      firstBubble: (p && p.firstBubble) || null,
      cardInfo: function (c, o) { return info(c, o); },
      hint: function (id, targets) { duelHint(id, targets); },
      pause: function () { openSettings(); },
      help: function () { openHelp(); },
      settings: function () { return { fastAnim: !!save.settings.fastAnim || FAST }; },
      onEvent: function (ev, duel) { if (ev && ev.t === 'habitRevealed' && duel && duel.e && !UI.tutReplay) { bookHabit(duel.e.id, ev.glyph); persist(); } },
      player: { name: playerName(), avatar: playerAv() },
      previews: function () { return true; },
      tut: tut,
      beforeEnd: tut && W.DipLabTut.settled ? function () { try { return W.DipLabTut.settled(); } catch (_) { return null; } } : null
    };
  }
  function duelTitle(node) {
    if (!node) return '';
    var en = C.enemies[node.enemyId];
    return esc(node.time) + '<small>' + (node.type === 'prologue' ? '序章' : esc(en ? en.name : '')) + '</small>';
  }
  // 盤面最終高度：螢幕高 − 頂欄 − 橫條（舞台 strip 鏡頭的 CSS 高）
  function stripCssH() {
    var st = UI.stage; if (!st) return 120;
    try {
      var L = st.layout, v = st.view(), vh = W.visualViewport ? Math.min(W.innerHeight, W.visualViewport.height) : W.innerHeight;
      var nm = (W.DipLabStage && W.DipLabStage.pickCamera) ? W.DipLabStage.pickCamera('strip', L.cameras, vh) : 'strip';
      var c = L.cameras[nm] || { h: 40 };
      return Math.round(c.h * (v.baseDev || v.dev) / (v.dpr || 1));
    } catch (_) { return 120; }
  }
  SCREENS.duel = function (p) {
    var r = p.fakeRun || save.run, node = p.node, en = C.enemies[node.enemyId];
    var tutOn = !!(p.tutorial && canTutorial());
    setTop(duelTitle(node), { help: true, pause: true, skip: tutOn ? function () { try { if (W.DipLabTut.active()) W.DipLabTut.fastForward(); } catch (e) { console.error(e); } } : null });
    var panel = UI.panel; panel.classList.add('duel');
    var wrap = el('div', 'lb-duelwrap'); panel.appendChild(wrap);
    var foeSpr = enemySpr(en);
    resetPoses(); hideActor('q1'); hideActor('q2'); stg('sil', 'f', false); stg('sil', 'p', false);
    stg('sprite', 'f', foeSpr);
    var enter = !!p.enter && !UI.auto;
    var opts = {
      duel: p.res.duel, events: p.res.events || [], run: r, content: C, enter: enter,
      onEnd: function (result) { onDuelEnd((result && result.duel) || r.duel); },
      onSave: function (d) { if (save.run && !UI.tutReplay) { save.run.duel = d; persist(); } commitSeen(); },
      hooks: duelHooks(node, p)
    };
    var mountBoard = function () {
      if (W.DipLabDuel && typeof W.DipLabDuel.mount === 'function') {
        try { W.DipLabDuel.mount(wrap, opts); } catch (e) { console.error(e); stubDuel(wrap, opts); }
      } else stubDuel(wrap, opts);
      if (W.DipLabDuel && W.DipLabDuel.on) {
        try { UI.offs.push(W.DipLabDuel.on('resolved', function () { commitSeen(); })); } catch (_) {}
      }
      if (p.tutorial && opts.hooks.tut) startLesson(r.aceTier);
      if (UI.auto) later(autoDuel, 400);
    };
    if (!enter) {
      // 續玩／中途回來：直接是橫條，不播進場（§3.7）
      place('f', 'duelE', foeSpr); place('p', 'duelP', 'player'); place('o', 'counter', 'owner'); stg('door', 'close');
      stg('interact', 'duel');
      cam('strip', 'duel', 0);
      mountBoard();
      return;
    }
    // 進場（§3.7＋主線裁定 #6）：「！」＋閃白＋黑條（店主拍板的 encounterFx）跟鏡頭推近同時跑，整段約 1.5 s
    var appH = app().clientHeight, finalH = Math.max(200, appH - 32 - stripCssH());
    wrap.classList.add('entering'); wrap.style.height = finalH + 'px';
    var f = FX(), foeAnc = anchorOf('f');
    UI.going = true;
    var enc = (f && f.encounter2) ? f.encounter2(foeAnc, {}) : Promise.resolve();
    stg('interact', 'duel');
    var walkIn = stgP('duelIn', { foe: foeSpr, ms: Math.round(600 / speed()) });
    UI.camName = 'strip';
    mountBoard();
    Promise.all([walkIn, enc]).then(function () {
      UI.going = false;
      if (UI.screen !== 'duel' || !wrap.isConnected) return;
      wrap.classList.remove('entering'); wrap.style.height = '';
      if (node.type === 'boss' && f && f.bossIntro) {
        try { f.bossIntro({ spriteHtml: sprHTML('boss', 72), title: en.name, sub: (C.lines.boss && C.lines.boss.stampSub) || '' }); } catch (e) { console.error(e); }
      }
    });
  };
  function startLesson(tier) {
    var T = W.DipLabTut;
    try {
      var pr = T.startDuelLesson({ tier: tier, duelApi: W.DipLabDuel, stage: UI.stage, duel: save.run && save.run.duel, content: C, replay: !!UI.tutReplay });
      if (pr && pr.then) pr.then(function (how) { UI.tutResult = how; if (how === 'done' && !UI.tutReplay) markLearned(); }, function (e) { console.error(e); });
    } catch (e) { console.error(e); }
  }
  function markLearned() {
    var L = (C.tutorial && C.tutorial.learned) || {};
    save.learned = save.learned || {}; Object.keys(L).forEach(function (k) { save.learned[k] = true; }); persist();
  }
  // 退場（§3.7）：duel.js 的大章＋盤面淡出已經做完 → 這裡把鏡頭拉回全景、下一個面板從下面上來
  function onDuelEnd(duel) {
    if (UI.tutReplay) return endReplay(duel);
    var r = save.run;
    if (!r || !duel || !duel.over || UI.ending === duel) return;
    UI.ending = duel;
    var node = r.pending && E.findNode(r, r.pending.nodeId);
    if (!node) { go('map'); return; }
    commitSeen();
    var eId = node.enemyId, b = bookOf(eId);
    if (duel.over === 'win') b.beaten++; else b.lost++;
    if (duel.e && duel.e.hidden && duel.stats && duel.stats.found) bookHabit(eId, duel.e.hidden);
    if (r.tutDuel && duel.over === 'win') { save.tutorialDone = true; }
    var eLeft = Math.max(0, (duel.e && duel.e.hp) || 0);
    var out = E.finishDuel(r, C, duel);
    if (!out || !out.offer) { console.error('finishDuel', out && out.error); persist(); go('map'); return; }
    if (out.offer.kind === 'dead') r.lostShort = eLeft;
    r.tutDuel = false;
    shelfSync(); persist();
    stg('untag');
    var o = out.offer;
    if (UI.auto && UI.auto.until === 'duelEnd') UI.auto = null;
    if (o.kind === 'retry') return retryFlow(node);
    if (o.kind === 'stake' && o.prologue) return epilogueFlow(o);
    if (o.kind === 'stake' || o.kind === 'elite') return go('reward', { offer: o });
    var firstClear = o.kind === 'clear' && !save.best.clears;
    recordNight(r);
    if (o.kind === 'clear') return clearFlow(o, node, firstClear);
    return deadFlow(node);
  }
  function recordNight(r) {
    if (!r || !r.over || r.recorded) return;
    var sc = E.scoreRun(r);
    var firstClear = r.over === 'clear' && !save.best.clears;
    r.recorded = true;
    var reached = r.over === 'clear' ? '02:00' : ((r.stats.lostAt && r.stats.lostAt.time) || '');
    save.nights.push({ seedKey: r.seedKey, nightNo: r.nightNo, aceTier: r.aceTier, result: r.over, reached: reached, score: sc.total });
    if (save.nights.length > 30) save.nights = save.nights.slice(-30);
    r.bestBefore = save.best.bySeedKey[r.seedKey] || 0;
    if (sc.total > r.bestBefore) save.best.bySeedKey[r.seedKey] = sc.total;
    if (sc.total > save.best.score) save.best.score = sc.total;
    if (r.over === 'clear') save.best.clears++;
    if (firstClear) save.unlocks.secondNightTeaser = true;
    save.prologueDone = true;
    shelfSync(); persist();
  }
  // ---- 序章輸了：「……再一場。」
  function retryFlow(node) {
    go('scene', { p: 'atdoor', f: 'in', fSpr: 'e0', o: 'between', camMs: 600, start: function (sc) {
      stg('pose', 'p', null); stg('pose', 'f', null);
      var dlg = Dialogue(sc, {});
      dlg.run([{ who: '男子', text: '「' + C.lines.man.win + '」' }, { who: '老闆', text: '「' + C.lines.owner.retry + '」' }]).then(function () {
        startDuel(node.id, { noEncounter: true });
      });
    } });
  }
  // ---- 序章收尾（押盤 → 配件三選一 → 地圖）
  function epilogueFlow(offer, resumed) {
    var r = save.run;
    go('scene', { p: 'atdoor', f: 'in', fSpr: 'e0', o: 'between', camMs: 600, start: function (sc) {
      stg('pose', 'f', null); stg('pose', 'p', null);
      var dlg = Dialogue(sc, {});
      var beats = C.script.epilogueWin;
      if (resumed) beats = beats.filter(function (b) { return b.ui === 'stake' || b.ui === 'relic'; });
      dlg.run(beats, function (ui, b) {
        var pend = save.run.pending;
        if (ui === 'stake') {
          if (!pend || pend.stakeDone) return Promise.resolve();
          var isNew = !!(r.stats.newMetIds && r.stats.newMetIds.indexOf(offer.cardId) >= 0);
          return stakePanel(sc, offer.cardId, { title: '他的袋子裡掉出來的', isNew: isNew, buttons: [
            { label: '收進包包', sub: '包包 ' + r.deck.length + '／12', value: 'take', pri: true },
            { label: '寄放櫃檯', sub: '只收進唱片櫃', value: 'shelf' }] }).then(function (v) {
            var res = doChoose(v === 'take' ? { type: 'takeStake' } : { type: 'keepStakeOnShelf' });
            toast(effectsText(res.effects)); sc.stripState = null; renderStrip(sc);
          });
        }
        if (ui === 'relic') {
          if (!pend || pend.relicDone) return Promise.resolve();
          return relicPanel(sc, offer.relicChoices || [], { prompt: b.prompt }).then(function (id) {
            var res = doChoose({ type: 'pickRelic', relicId: id });
            toast(effectsText(res.effects));
          });
        }
        return Promise.resolve();
      }).then(function () {
        try {
          var c1 = save.run.map.cols.find(function (c) { return c.col === 1; });
          var nd1 = c1 && c1.nodes.find(function (n) { return n.enemyId; });
          if (nd1) { place('f', 'out', enemySpr(C.enemies[nd1.enemyId])); stg('sil', 'f', true); }
        } catch (_) {}
        return dlg.run(C.script.afterPrologue, function (ui) {
          if (ui === 'map') { save.prologueDone = true; persist(); go('map'); return new Promise(function () {}); }
          return Promise.resolve();
        });
      });
    } });
  }
  // ---- 打烊（通關）：店燈暗一半、老闆擦唱盤
  function clearFlow(offer, node, first) {
    go('scene', { p: 'atdoor', f: 'in', fSpr: 'boss', o: 'counter', camMs: 600, start: function (sc) {
      stg('pose', 'f', null); stg('pose', 'p', null);
      var dlg = Dialogue(sc, { flags: { firstClear: first } });
      dlg.run(C.script.clear, function (ui) {
        if (ui === 'stake') {
          shelfAdd(offer.cardId); persist();
          return stakePanel(sc, offer.cardId, { title: '他用過的那張', isNew: true, buttons: [{ label: '收進唱片櫃', value: 'ok', pri: true }] });
        }
        return Promise.resolve();
      }).then(function () { go('end'); });
    } });
  }
  // ---- 散場：你倒在地上，老闆一句
  function deadFlow(node) {
    go('scene', { p: 'duelP', o: 'counter', camMs: 600, start: function (sc) {
      stg('pose', 'f', null);
      stgP('walk', 'f', ['door', 'leave']).then(function () { hideActor('f'); });
      var dlg = Dialogue(sc, {});
      dlg.run(C.script.dead).then(function () { go('end'); });
    } });
  }
  // ---- 傳說藏家進門
  function bossEnterFlow(node) {
    go('scene', { p: 'atdoor', f: 'out', fSpr: 'boss', o: 'counter', start: function (sc) {
      var dlg = Dialogue(sc, {});
      dlg.run(C.script.bossEnter, function (ui, b) {
        if (ui === 'duel') return dlg.menu([b.prompt || '▶ 品味對決']).then(function () { startDuel(node.id, {}); return new Promise(function () {}); });
        return Promise.resolve();
      });
    } });
  }
  // ---- 重看教學（小抄／⏸）：不跑劇情、不寫存檔、沒有獎勵；用上次的王牌直接開一場教學對決
  function replayTutorial() {
    if (!canTutorial()) return;
    var tier = save.lastAceTier || (save.run && save.run.aceTier) || 'hall';
    var man = C.enemies.man;
    var pDef = { hp: E.CFG.prologueHp, maxHp: E.CFG.prologueHp, deck: (C.gifts[tier] || []).concat(C.junk || []).map(card).filter(Boolean),
      ace: card(C.aces[tier]), ear: tier, relics: [], startQi: 0, reviveOnce: false };
    var eDef = Object.assign({}, man, { deck: (man.deck || []).map(card).filter(Boolean) });
    var res;
    try { res = E.startDuel(pDef, eDef, { seed: 7, prologue: true, firstRecordId: (C.tutorial.records || [])[0] || null }); } catch (e) { console.error(e); return; }
    prepTutorialDuel(res.duel, tier);
    UI.tutReplay = { back: UI.screen === 'duel' ? 'title' : (save.run && !save.run.over ? 'resume' : 'title') };
    var node = { id: 'tut', enemyId: 'man', type: 'prologue', time: '21:30' };
    var fakeRun = { aceTier: tier, relics: [], deck: [], hp: pDef.hp, maxHp: pDef.hp };
    go('duel', { res: res, node: node, enter: true, tutorial: true, fakeRun: fakeRun });
  }
  function endReplay(duel) {
    var back = (UI.tutReplay && UI.tutReplay.back) || 'title';
    UI.tutReplay = null;
    try { if (W.DipLabTut && W.DipLabTut.active && W.DipLabTut.active()) W.DipLabTut.skip(); } catch (_) {}
    stg('untag'); resetPoses();
    if (back === 'resume') resumeRun(); else go('title');
  }

  // ======================================================================= reward（押盤翻開 §8.3）
  function takeCardWithDrop(sc, cardId, mk) {
    var r = save.run;
    if (r.deck.length < E.CFG.deckCap) return Promise.resolve(doChoose(mk(undefined)));
    stageSay('o', C.lines.owner.bagFull, 'owner');
    return dropPanel(sc, cardId).then(function (dropId) { return dropId ? doChoose(mk(dropId)) : null; });
  }
  SCREENS.reward = function (p) {
    var r = save.run, o = p.offer || (r.pending && r.pending.offer);
    if (!o) return resumeRun();
    var node = E.findNode(r, r.pending.nodeId), enemy = C.enemies[node.enemyId];
    setTop(esc(node.time) + '<small>' + esc(enemy.name) + '</small>', { hp: true, pause: true });
    UI.panel.classList.add('reward');
    // 舞台：他往門口走（輸了）、你站在門邊、唱盤轉
    cam('reward', 'reward', 600);
    stg('interact', 'reward');
    stg('pose', 'f', null); stg('pose', 'p', null);
    place('p', 'atdoor', 'player'); place('o', 'counter', 'owner');
    if (!stg('has', 'f')) place('f', 'near', enemySpr(enemy));
    stg('sprite', 'f', enemySpr(enemy)); stg('hide', 'f', false); stg('sil', 'f', false);
    var lose = (C.lines[node.enemyId] && C.lines[node.enemyId].lose) || [];
    later(function () { stageSay('f', [].concat(lose)[0], null, 2200); }, 300);
    later(function () { stg('door', 'open'); stgP('walk', 'f', ['door', 'leave']).then(function () { hideActor('f'); stg('door', 'close'); }); }, 1700);
    var sc = { panel: UI.panel };
    var elite = o.kind === 'elite';
    var pend = r.pending;
    var stakeStep = function () {
      if (pend.stakeDone) return Promise.resolve();
      var isNew = !!(r.stats.newMetIds && r.stats.newMetIds.indexOf(o.cardId) >= 0);
      var btns = [{ label: '收進包包', sub: '包包 ' + r.deck.length + '／12', value: 'take', pri: true }];
      if (elite || !o.relicId) btns.push({ label: '寄放櫃檯', sub: '只收進唱片櫃', value: 'shelf' });
      else {
        var rel = C.relics[o.relicId];
        btns.push({ label: '拿他的「' + rel.name + '」', sub: o.relicOwned ? '已經有了：改回 ' + ((C.relicFallback && C.relicFallback.hp) || 4) + ' 聲望' : rel.desc, value: 'relic' });
      }
      if (o.extraCardIds && o.extraCardIds.length) btns.push({ label: '再挑一張他的盤', sub: '會員集點卡', value: 'extra' });
      var loop = function () {
        return stakePanel(sc, o.cardId, { title: '他押的那張', isNew: isNew, buttons: btns }).then(function (v) {
          if (v === 'take') return takeCardWithDrop(sc, o.cardId, function (d) { return { type: 'takeStake', dropId: d }; }).then(function (res) { if (!res) return loop(); toast(effectsText(res.effects)); });
          if (v === 'shelf') { doChoose({ type: 'keepStakeOnShelf' }); return; }
          if (v === 'relic') { var res = doChoose({ type: 'takeRelic', relicId: o.relicId }); toast(effectsText(res.effects)); return; }
          if (v === 'extra') return extraPanel(sc, o).then(function (res) { if (!res) return loop(); toast(effectsText(res.effects)); });
        });
      };
      return loop();
    };
    stakeStep().then(function () {
      if (elite && !pend.relicDone && save.run.pending) {
        return relicPanel(sc, o.relicChoices || [], { prompt: '他身上掉出三件發燒配件，挑一件' }).then(function (id) {
          var res = doChoose({ type: 'pickRelic', relicId: id }); toast(effectsText(res.effects));
        });
      }
    }).then(function () { later(function () { go('map'); }, 250); });
  };
  function extraPanel(sc, o) {
    return new Promise(function (res) {
      var html = '<div class="hd"><h3>再挑一張他的盤</h3></div><div class="lb-trio">' + o.extraCardIds.map(function (id) { return tileHTML(card(id), { pick: '選這張' }); }).join('') + '</div>' +
        '<div class="foot"><button type="button" class="lb-btn wide" data-a="back">返回</button></div>';
      var s = sheet(html, 'extra');
      s.addEventListener('click', function (e) {
        var t = e.target.closest && e.target.closest('.lb-ct');
        if (t) { var id = t.getAttribute('data-cid'); closeSheet(s); takeCardWithDrop(sc, id, function (d) { return { type: 'takeExtra', cardId: id, dropId: d }; }).then(res); return; }
        if (e.target.closest && e.target.closest('[data-a=back]')) { closeSheet(s); res(null); }
      });
    });
  }

  // ======================================================================= map（今晚 §8.2）：店裡亮金標＋時間軸
  var NODE_NAME = { prologue: '序章', fight: '客人', elite: '菁英', boss: '打烊前', crate: '挖箱', listen: '試聽機', event: '事件', rest: '櫃檯' };
  var NODE_SHORT = { crate: '挖箱', listen: '試聽', event: '事件', rest: '櫃檯' };
  var NODE_HOT = { crate: ['crate-jazz', 'crate-tw', 'crate-noise'], listen: ['booth'], rest: ['counter'], event: ['poster-event'], fight: ['door'], elite: ['door'], boss: ['door'] };
  var NODE_DESC = {
    crate: '三個箱子：爵士區、台灣區、噪音區。挑一箱翻出三張，帶走一張。偶爾會翻到店主私藏。',
    listen: '試聽機放一段，三張封面猜一張。猜中回 6 聲望，那張可以收；猜錯回 3。',
    rest: '喝杯茶回 8 聲望，或洗一張盤（最高軸 +1，上限 5）。'
  };
  function nodeLabel(nd) {
    if (nd.enemyId) return C.enemies[nd.enemyId].name;
    if (nd.type === 'event') { var ev = C.events.find(function (e) { return e.id === nd.eventId; }); return ev ? ev.title : '事件'; }
    return NODE_NAME[nd.type] || nd.type;
  }
  function curCol(r) { return r.map.cols.find(function (c) { return c.col === r.col; }); }
  // 這一欄的選項在店裡亮金標（§8.2）；門口排隊的客人＝下一位（剪影）
  function mapStage(r) {
    var col = curCol(r); if (!col) return;
    var list = [], k = 0;
    var by = {};
    col.nodes.forEach(function (nd) {
      var ids = NODE_HOT[nd.type]; if (!ids) return;
      var nm = nd.enemyId ? C.enemies[nd.enemyId].name : (NODE_NAME[nd.type] || '');
      var key = ids.join(',');
      if (by[key]) by[key].label += '／' + nm;
      else { by[key] = { ids: ids, label: col.time + ' ' + nm }; list.push(by[key]); }
      if (nd.enemyId && k < 2) { k++; place('q' + k, 'q' + k, enemySpr(C.enemies[nd.enemyId])); stg('sil', 'q' + k, true); }
    });
    if (k < 2) hideActor('q2'); if (k < 1) hideActor('q1');
    stg('highlight', list);
  }
  SCREENS.map = function () {
    var r = save.run;
    if (!r) return go('title');
    if (r.over) return go('end');
    if (E.nextStep(r) !== 'move') return resumeRun();
    setTop(nightLabel(r), { hp: true, help: true, pause: true });
    var panel = UI.panel; panel.classList.add('map');
    cam('full', 'map', 600);
    stg('interact', 'map');
    resetPoses(); hideActor('f'); stg('sil', 'p', false);
    place('o', 'counter', 'owner'); place('p', UI.lastSpot || 'browse', 'player'); stg('door', 'close');
    mapStage(r);
    // 時間軸：一欄一欄往右走（不畫連線）；這一欄後面一條金框（data-tut="map-col"，教學挖洞用）
    var cols = r.map.cols, n = cols.length;
    var g = '<div class="lb-tl" style="grid-template-columns:repeat(' + n + ',minmax(0,1fr))">';
    cols.forEach(function (c, i) {
      g += '<span class="tm' + (c.col === r.col ? ' cur' : '') + '" style="grid-column:' + (i + 1) + ';grid-row:1">' + esc(c.time) + '</span>';
      if (c.col === r.col) g += '<span class="colhl" data-tut="map-col" style="grid-column:' + (i + 1) + ';grid-row:2 / span 2" aria-hidden="true"></span>';
      c.nodes.forEach(function (nd, row) {
        var went = r.visited.indexOf(nd.id) >= 0;
        var cls = 'lb-node';
        if (c.col < r.col) cls += went ? ' done' : ' past';
        else if (c.col === r.col) cls += ' can';
        else cls += ' locked';
        if (nd.type === 'elite') cls += ' elite';
        if (nd.type === 'boss') cls += ' boss';
        var face = went ? '✓' : nd.enemyId ? '<span class="face">' + headHTML(enemySpr(C.enemies[nd.enemyId]), 28) + '</span>' : esc(NODE_SHORT[nd.type] || '？');
        g += '<span class="cell" style="grid-column:' + (i + 1) + ';grid-row:' + (2 + row) + '"><button type="button" class="' + cls + '" data-n="' + esc(nd.id) + '" aria-label="' + esc(c.time + ' ' + nodeLabel(nd)) + '">' + face +
          (nd.type === 'elite' && !went ? '<span class="el">菁英</span>' : '') + '</button></span>';
      });
      if (c.col === r.col) g += '<span class="me" style="grid-column:' + (i + 1) + ';grid-row:4">▲ 下一站</span>';
    });
    g += '</div>';
    var tl = el('div', 'lb-tlw', g);
    panel.appendChild(tl);
    var bag = el('div', 'lb-bagline');
    bag.innerHTML = '<button type="button" class="bag" data-a="bag">包包 <b>' + r.deck.length + '/' + E.CFG.deckCap + '</b></button>' +
      '<button type="button" class="rl" data-a="relics"><span class="k">發燒配件：</span>' + (r.relics.length ? r.relics.map(function (id) { return '<span class="ri">' + relicIcon(id, 16) + '</span>'; }).join('') + (r.relics.length === 1 ? '<span>' + esc(C.relics[r.relics[0]].name) + '</span>' : '') : '<span>（還沒有）</span>') + '</button>' +
      (r.nextStartQi ? '<span class="qi">下一場氣勢 +' + r.nextStartQi + '</span>' : '');
    panel.appendChild(bag);
    guardClicks(tl); guardClicks(bag);
    tl.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-n]'); if (!b || UI.going) return;
      sfx('tick'); previewNode(r, E.findNode(r, b.getAttribute('data-n')));
    });
    bag.addEventListener('click', function (e) {
      if (UI.going) return;
      if (e.target.closest && e.target.closest('[data-a=bag]')) { bagSheet(r); return; }
      if (e.target.closest && e.target.closest('[data-a=relics]')) relicSheet(r);
    });
    // 第一次進今晚：「今晚的客人，一個一個來。」→「亮著的，就是下一站。」（§6.5，照著點了才算看過）
    if (!save.seen.map && !save.seen.mapIntro && !UI.auto) {
      later(function () {
        if (UI.screen !== 'map') return;
        var T = W.DipLabTut;
        if (T && typeof T.firstTime === 'function') { try { T.firstTime('map', ['map-col'].concat(curCol(r).nodes.map(function (nd) { return 'shop:' + ((NODE_HOT[nd.type] || [])[0] || ''); }))); } catch (e) { console.error(e); } }
        else { var ls = (C.shopLines && C.shopLines.mapIntro) || []; if (ls[0]) stageSay('o', ls[0], 'owner', 2600); if (ls[1]) later(function () { stageSay('o', ls[1], 'owner', 2600); }, 2700); UI.pendingSeen.mapIntro = true; }
      }, 700);
    }
    autoAct(function () {
      var ch = E.routePolicy(save.run, C);
      if (ch && ch.type === 'move') { var nd = E.findNode(save.run, ch.nodeId); previewNode(save.run, nd); autoAct(function () { var b = qs('.lb-sheet.float [data-a=go]'); if (b) b.click(); }, 200); }
    }, 300);
  };
  // 節點預覽（點時間軸的節點，或點店裡亮金標的東西：同一個面板）
  function previewNode(r, nd, o) {
    o = o || {};
    if (!nd || UI.going) return;
    var pv = E.nodePreview(r, C, nd.id) || { node: nd };
    var can = !!pv.canMove;
    var past = nd.col < r.col;
    var col = r.map.cols.find(function (c) { return c.col === nd.col; });
    var html = '<div class="hd"><h3>' + (can ? '下一站・' : past ? '走過了・' : '還沒輪到・') + esc(nd.time || (col && col.time) || '') + '</h3><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>';
    if (pv.enemy) {
      var Em = pv.enemy;
      var ult = pv.ults ? '氣勢 ' + pv.ultAt + '・<span class="' + pv.ultAttr + '">' + ZH[pv.ultAttr] + '</span>' + (pv.reflectable ? '<span class="gtag">王牌接得住</span>' : '') : '不輾壓';
      var stakeC = nd.stakeId && card(nd.stakeId);
      html += '<div class="pv-who"><div class="av">' + headHTML(enemySpr(Em), 30) + '</div><div><b class="key">' + esc(Em.name) + '</b>' + (Em.title ? '<small>' + esc(Em.title) + '</small>' : '') +
        (nd.type === 'elite' ? '<span class="gtag">菁英</span>' : '') + '<div class="bl">' + esc(Em.blurb) + '</div></div></div>' +
        '<div class="kv"><span class="k">聲望</span><b class="num">' + pv.hp + '</b>　<span class="k">輾壓</span>' + ult + '<br>' +
        (stakeC ? '<span class="k">押盤</span>蓋著・' + starsHTML(stakeC) + (stakeC.tier ? '<span class="sub">你沒選的王牌</span>' : '') + (stakeC.gold ? '<span class="gtag">私藏</span>' : '') : '') +
        (pv.requestLabel ? '　<span class="k">點播</span>' + esc(pv.requestLabel) : '') +
        (pv.relic ? '<br><span class="k">身上</span>' + relicIcon(pv.relic.id, 16) + ' ' + esc(pv.relic.name) + (pv.relicOwned ? '（已有）' : '') : '') + '</div>';
    } else {
      var ev = pv.event;
      var lab = o.crate ? ((C.pools && C.pools.crateLabels && C.pools.crateLabels[o.crate]) || '') : '';
      html += '<div class="pv-who"><div class="av txt">' + esc(NODE_SHORT[nd.type] || '？') + '</div><div><b class="key">' + esc(nodeLabel(nd)) + (lab ? '・' + esc(lab) : '') + '</b><div class="bl">' + esc(ev ? ev.text : (NODE_DESC[nd.type] || '')) + '</div></div></div>' +
        (ev ? '<p class="sub">選項的後果會先寫出來。</p>' : '');
    }
    html += '<div class="two">' + (can ? '<button type="button" class="lb-btn pri big key" data-a="go">' + (pv.enemy ? '就他了' : '就這個') + '</button>' : '<button type="button" class="lb-btn big key" disabled>' + (past ? '已經過了' : '還沒輪到') + '</button>') +
      '<button type="button" class="lb-btn big key" data-a="close">再看看</button></div>';
    var s = floatSheet(html, 'preview');
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b) return;
      if (b.getAttribute('data-a') === 'close') { s.remove(); return; }
      if (b.getAttribute('data-a') === 'go' && can) { s.remove(); goNode(nd, o); }
    });
  }
  // 走過去：舞台上你走到那個地方、門開、客人進來（§8.2「就他了」）
  var NODE_SPOT = { crate: 'crateP', listen: 'listen', rest: 'pay', event: 'near' };
  function goNode(nd, o) {
    o = o || {};
    var r = save.run;
    if (UI.going || !E.canMove(r, nd.id)) return;
    UI.going = true;
    sfx('select');
    stg('highlight', []);
    if (nd.type === 'boss') { later(function () { bossEnterFlow(nd); }, 200); return; }
    if (nd.enemyId) {
      var en = C.enemies[nd.enemyId];
      hideActor('q1'); hideActor('q2');
      stg('door', 'swing'); place('f', 'door', enemySpr(en)); stg('sil', 'f', false);
      stgP('walk', 'f', ['in']).then(function () { stageSay('f', en.title ? en.title : en.name, null, 1400); });
      later(function () { if (UI.screen === 'map') startDuel(nd.id, {}); }, 900);
      return;
    }
    UI.lastSpot = NODE_SPOT[nd.type] || 'browse';
    stgP('walk', 'p', [UI.lastSpot]).then(function () {
      if (UI.screen !== 'map') return;
      var res = doChoose({ type: 'move', nodeId: nd.id });
      if (res.error) { UI.going = false; toast('現在不能過去'); return; }
      commitSeen();
      go('node', { crate: o.crate || null });
    });
  }
  function bagSheet(r) {
    var html = '<div class="hd"><h3>包包 ' + r.deck.length + '／' + E.CFG.deckCap + '</h3><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
      '<p class="sub">點封面看唱片資訊。</p><div class="lb-pick">' + tileHTML(card(C.aces[r.aceTier]), { text: false }) + r.deck.map(function (id) { return tileHTML(cardM(id), { text: false }); }).join('') + '</div>';
    var s = floatSheet(html, 'bag tall');
    s.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('[data-a=close]')) { s.remove(); return; }
      var t = e.target.closest && e.target.closest('.lb-ct'); if (t) info(t.getAttribute('data-cid'), { from: 'bag' });
    });
  }
  function relicSheet(r) {
    var html = '<div class="hd"><h3>發燒配件</h3><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div><div class="lb-opts">' + (r.relics.length ? r.relics.map(function (id) {
      var x = C.relics[id];
      return '<div class="lb-relic static"><span class="pix">' + relicIcon(id, 30) + '</span><span class="tx"><span class="nm">' + esc(x.name) + '</span><span class="ds">' + esc(x.desc) + '</span></span></div>';
    }).join('') : '<p class="sub">還沒有。贏了菁英、序章收尾都會拿到。</p>') + '</div>';
    var s = floatSheet(html, 'relics');
    s.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('[data-a=close]')) s.remove(); });
  }

  // ======================================================================= 店裡的東西點了會怎樣（§5.5）
  function onStageAction(action, hot) {
    if (!action) return;
    var ci = CI(); if (ci && ci.isOpen()) return;
    if (UI.modal || UI.page) return;
    var scr = UI.screen, r = save && save.run;
    var m;
    if ((m = /^wall-record:(.+)$/.exec(action))) { info(m[1], { from: 'stage' }); return; }
    if (action === 'now') { var f = FX(), c = f && f.music && f.music.current && f.music.current(); if (c) info(c, { from: 'stage' }); return; }
    if (action === 'talk:owner') { stageSay('o', line('ownerHint', scr === 'map' ? 'map' : scr === 'duel' ? 'duel' : scr) || line('ownerHint', 'map'), 'owner', 2600); return; }
    if (action === 'cat') { var ct = line('cat'); if (ct) stageSay('o', ct, 'owner', 1600); return; }
    if ((m = /^shop:(.+)$/.exec(action))) { if (scr === 'taipei' && m[1] === 'dip') backFromTaipei(); return; }
    if (action === 'locked') { var lk = line('locked'); if (lk) toast(lk); return; }
    // 地圖：這一欄有對應節點 → 開同一個預覽
    if (scr === 'map' && r && !UI.going) {
      var col = curCol(r), want = null, crate = null;
      if ((m = /^crate:(.+)$/.exec(action))) { want = 'crate'; crate = m[1]; }
      else if (action === 'listen') want = 'listen';
      else if (action === 'counter') want = 'rest';
      else if (action === 'poster:event') want = 'event';
      else if (action === 'door') want = 'fight';
      var nd = col && col.nodes.find(function (n) { return want === 'fight' ? !!n.enemyId : n.type === want; });
      if (nd) { sfx('tick'); previewNode(r, nd, { crate: crate }); return; }
      if (want === 'crate') { var nl = line('crateNotYet'); if (nl) stageSay('o', nl, 'owner', 2200); return; }
    }
    // 挖箱節點：點箱子＝選那一箱（§8.4）
    if (scr === 'node' && (m = /^crate:(.+)$/.exec(action)) && UI.crateTap) { UI.crateTap(m[1]); return; }
    if (scr === 'title' && action === 'door') { var pb = qs('[data-a=push]', UI.panel); if (pb) pb.click(); return; }
    if (action === 'poster:event') { var po = line('poster'); if (po) stageSay('o', po, 'owner', 2400); return; }
    if (/^crate:/.test(action)) { var cn = line('crateNotYet'); if (cn) stageSay('o', cn, 'owner', 2200); return; }
    if (action === 'listen') {
      var fx = FX(), nowId = null;
      try { var hs = stg('hotspots') || []; var nh = hs.find(function (h) { return h.id === 'now'; }); nowId = nh && /^wall-record:(.+)$/.exec(nh.action) && /^wall-record:(.+)$/.exec(nh.action)[1]; } catch (_) {}
      if (fx && soundOn() && nowId && card(nowId)) fx.music.play(card(nowId), { fadeMs: 1200 });
      else if (nowId) info(nowId, { from: 'stage' });
    }
  }

  // ======================================================================= node（挖箱／試聽機／事件／櫃檯 §8.4；鏡頭 reward）
  function dropRun() { save.run = null; persist(); go('title'); }
  SCREENS.node = function (p0) {
    var r = save.run, p = r && r.pending;
    if (!r) return go('title');
    if (!p) return go(r.over ? 'end' : 'map');
    if (p.type === 'duel' || p.type === 'reward') return resumeRun();
    if (p.type !== 'node') return dropRun();
    var node = E.findNode(r, p.nodeId);
    if (!node) return dropRun();
    setTop(esc(node.time) + '<small>' + esc(nodeLabel(node)) + '</small>', { hp: true, help: true, pause: true });
    UI.panel.classList.add('node');
    cam('reward', 'node', 600);
    stg('interact', 'node');
    resetPoses(); hideActor('q1'); hideActor('q2');
    place('o', 'counter', 'owner');
    var ss = { panel: UI.panel };
    var fn = { crate: crateStep, crateCard: crateCardStep, listen: listenStep, listenKeep: listenKeepStep, event: eventStep, rest: restStep }[p.step];
    if (fn) fn(ss, r, p, node, p0 || {}); else dropRun();
  };
  function nodeDone(ss, effects, ln, lineWho) {
    var txt = effectsText(effects);
    if (ln) stageSay(lineWho || 'o', ln, lineWho && lineWho !== 'o' ? null : 'owner');
    var s = sheet((txt ? '<p class="lb-result key">' + esc(txt) + '</p>' : '') + '<div class="foot"><button type="button" class="lb-btn pri big wide key" data-a="next">繼續</button></div>', 'done');
    qs('[data-a=next]', s).addEventListener('click', function () { go('map'); });
    autoAct(function () { var b = qs('[data-a=next]', s); if (b) b.click(); });
  }
  // 挖箱：你走到箱子後面（腿被箱子擋住＝在翻箱，B12）；點箱子或三顆字鈕
  function crateStep(ss, r, p, node, p0) {
    place('p', 'crateP', 'player'); stg('pose', 'p', 'dig');
    UI.lastSpot = 'crateP';
    stg('allow', ['crate-*', 'rack:*', 'now']);
    var L = (C.pools && C.pools.crateLabels) || { jazz: '爵士區', tw: '台灣區', noise: '噪音區' };
    var s = sheet('<div class="hd"><h3>挖箱：挑一箱</h3><span class="sub">點店裡的箱子也可以</span></div><div class="lb-crates">' +
      ['jazz', 'tw', 'noise'].map(function (k) { return '<button type="button" class="lb-btn big key" data-k="' + k + '">' + esc(L[k]) + '</button>'; }).join('') + '</div>' +
      '<p class="sub">翻出三張，帶走一張。</p>', 'crate');
    var chosen = false;
    var choose = function (k) {
      if (chosen) return; chosen = true; UI.crateTap = null;
      sfx('flip');
      var res = doChoose({ type: 'crate', crate: k });
      if (res.error) { chosen = false; return; }
      closeSheet(s); crateCardStep(ss, save.run, save.run.pending);
    };
    UI.crateTap = choose;
    s.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('[data-k]'); if (b) choose(b.getAttribute('data-k')); });
    if (p0 && p0.crate) { later(function () { choose(p0.crate); }, 500); return; }
    autoAct(function () { var ch = E.routePolicy(save.run, C); var b = ch && qs('[data-k="' + ch.crate + '"]', s); if (b) b.click(); });
  }
  function crateCardStep(ss, r, p) {
    stg('pose', 'p', null); stg('allow', null); stg('interact', 'node');
    place('p', 'crateP', 'player');
    var L = (C.pools && C.pools.crateLabels) || {};
    if (p.goldId) { later(function () { stageSay('o', C.lines.owner.gold, 'owner'); sfx('seeThrough'); }, 200); }
    var s = sheet('<div class="hd"><h3>' + esc(L[p.crate] || '挖箱') + '</h3><span class="sub">挑一張進包包</span></div><div class="lb-trio">' +
      p.cardIds.map(function (id) { return tileHTML(card(id), { pick: '帶走' }); }).join('') + '</div>' +
      (p.goldId ? '<p class="lb-result">老闆：「' + esc(C.lines.owner.gold) + '」</p>' : '') +
      '<div class="foot"><button type="button" class="lb-btn wide" data-a="none">都不要</button></div>', 'cratecard');
    s.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('.lb-ct');
      if (t) {
        var id = t.getAttribute('data-cid'); closeSheet(s);
        takeCardWithDrop(ss, id, function (d) { return { type: 'crateCard', cardId: id, dropId: d }; }).then(function (res) {
          if (!res) return crateCardStep(ss, save.run, save.run.pending);
          nodeDone(ss, res.effects);
        });
        return;
      }
      if (e.target.closest && e.target.closest('[data-a=none]')) { closeSheet(s); var res = doChoose({ type: 'crateCard', cardId: null }); nodeDone(ss, res.effects); }
    });
    autoAct(function () { var ch = E.routePolicy(save.run, C); var b = ch && ch.cardId ? qs('.lb-ct[data-cid="' + ch.cardId + '"] [data-pick]', s) : qs('[data-a=none]', s); if (b) b.click(); });
  }
  var LISTEN_MS = 15000;
  function listenStep(ss, r, p) {
    var f = FX(), ans = card(p.answerId);
    place('p', 'listen', 'player'); stg('pose', 'p', 'sit'); UI.lastSpot = 'listen';
    var muted = !(soundOn() && ans && ans.previewUrl);
    stg('play', !muted);
    var s = sheet('<div class="lb-listen-head"><button type="button" class="lb-tt' + (muted ? '' : ' spin') + '" aria-label="再聽一次" disabled></button><div><b>試聽機</b><div class="sub msgl"></div></div></div>' +
      '<div class="lb-trio">' + p.cardIds.map(function (id) { return tileHTML(card(id), { stars: false, pick: muted ? '選這張' : '是這張' }); }).join('') + '</div>', 'listen');
    var msg = qs('.msgl', s), tt = qs('.lb-tt', s), tok = 0, done = false;
    var spillHit = spillNote(E.CFG.listenHit), spillMute = spillNote(E.CFG.listenMuted);
    function stopMusic(ms) { if (f && f.music) try { f.music.stop({ fadeMs: ms }); } catch (_) {} }
    function setMuted() {
      muted = true; tok++; stopMusic(300);
      stg('play', false); tt.classList.remove('spin'); tt.disabled = true;
      qsa('[data-pick]', s).forEach(function (b) { b.textContent = '選這張'; });
      msg.textContent = '（試聽機沒聲音。挑一張帶走，回 4 聲望。）' + (spillMute ? '（' + spillMute + '）' : '');
    }
    function ended() {
      stg('play', false); tt.classList.remove('spin'); tt.disabled = false;
      msg.textContent = '（放完了。點唱機再聽一次。）猜中回 6 聲望，猜錯回 3。' + (spillHit ? '（' + spillHit + '）' : '');
    }
    function playAns() {
      var my = ++tok, settled = false;
      tt.disabled = true; tt.classList.add('spin'); stg('play', true);
      msg.textContent = '正在放其中一張。猜中回 6 聲望，猜錯回 3。' + (spillHit ? '（' + spillHit + '）' : '');
      f.music.play(ans, { fadeMs: 600, maxMs: LISTEN_MS, exclusive: true }).then(function (ok) {
        settled = true;
        if (my !== tok || !s.isConnected) return;
        if (!ok) { setMuted(); return; }
        setTimeout(function () { if (my !== tok || !s.isConnected || done) return; stopMusic(1500); ended(); }, LISTEN_MS);
      });
      setTimeout(function () { if (!settled && s.isConnected && my === tok) setMuted(); }, 2600);
    }
    tt.addEventListener('click', function (e) { stopEv(e); if (!muted && !done && !tt.disabled) playAns(); });
    if (muted) setMuted(); else playAns();
    s.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('.lb-ct'); if (!t || done) return;
      done = true;
      var id = t.getAttribute('data-cid');
      var res = doChoose(muted ? { type: 'listen', guessId: null, pickId: id } : { type: 'listen', guessId: id });
      if (res.error) { done = false; return; }
      tok++;
      closeSheet(s);
      listenKeepStep(ss, save.run, save.run.pending, null, null, res);
    });
    autoAct(function () { var ch = E.routePolicy(save.run, C); var b = ch && ch.guessId ? qs('.lb-ct[data-cid="' + ch.guessId + '"] [data-pick]', s) : qs('[data-pick]', s); if (b) b.click(); }, 400);
  }
  function listenKeepStep(ss, r, p, node, p0, res) {
    stg('pose', 'p', null);
    var result = p.result, keepId = p.keepId, ans = card(p.answerId);
    var ln = result === 'hit' ? C.lines.owner.listenRight : result === 'miss' ? C.lines.owner.listenWrong : '';
    if (ln) stageSay('o', ln, 'owner');
    sfx(result === 'hit' ? 'readHit' : result === 'miss' ? 'tick' : 'select');
    var head = result === 'hit' ? '猜中了！' : result === 'miss' ? '不是這張。' : '你挑了這張。';
    var gain = res ? effectsText(res.effects) : '';
    var c = keepId ? card(keepId) : ans;
    var html = '<div class="hd"><h3>' + esc(head) + '</h3></div>' + (gain ? '<p class="lb-result key">' + esc(gain) + '</p>' : '') +
      '<div class="lb-one">' + coverHTML(c, { size: 96 }) + '<div class="meta"><div class="ar">' + esc(c.artist) + '</div><div class="al">' + esc(c.album) + '</div>' + starsHTML(c) + '</div></div>' +
      '<div class="foot two">' + (keepId ? '<button type="button" class="lb-btn pri big key" data-a="keep">收進包包</button><button type="button" class="lb-btn big key" data-a="no">不用了</button>' : '<button type="button" class="lb-btn pri big wide key" data-a="no">繼續</button>') + '</div>';
    var s = sheet(html, 'listenkeep');
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b) return;
      if (b.getAttribute('data-a') === 'keep') {
        closeSheet(s);
        takeCardWithDrop(ss, keepId, function (d) { return { type: 'listenKeep', keep: true, dropId: d }; }).then(function (r2) {
          if (!r2) return listenKeepStep(ss, save.run, save.run.pending, null, null, res);
          toast(effectsText(r2.effects)); go('map');
        });
      } else { closeSheet(s); doChoose({ type: 'listenKeep', keep: false }); go('map'); }
    });
    autoAct(function () { var ch = E.routePolicy(save.run, C); var b = qs(ch && ch.keep ? '[data-a=keep]' : '[data-a=no]', s); if (b) b.click(); }, 300);
  }
  function eventStep(ss, r, p) {
    var ev = C.events.find(function (x) { return x.id === p.eventId; });
    if (!ev) return go('map');
    stg('door', 'swing');
    var me = JSON.stringify(playerAv());
    var vpool = (C.avatarsFallback || []).filter(function (av) { return JSON.stringify(av) !== me; });
    place('f', 'visit', vpool[E.fnv1a32(ev.id) % Math.max(1, vpool.length)] || 'e1'); stg('sil', 'f', false);
    place('p', 'near', 'player'); UI.lastSpot = 'near';
    var cap = E.CFG.deckCap, minD = E.CFG.deckMin;
    function disabled(o) {
      var fx = o.effects || [];
      if (o.minDeck && r.deck.length < o.minDeck) return true;
      if (fx.some(function (f) { return f.giveAwayPicked; }) && r.deck.length - 1 < minD) return true;
      var up = fx.find(function (f) { return f.starUpPicked; });
      if (up && !r.deck.some(function (id) { var c = cardM(id); return c && (c[up.starUpPicked] || 0) < E.CFG.starCap; })) return true;
      return false;
    }
    var html = '<div class="hd"><h3>' + esc(ev.title) + '</h3></div><p class="lb-event-text">' + esc(ev.text) + '</p><div class="lb-opts">' +
      ev.options.map(function (o, i) {
        var gid = p.eventCards && p.eventCards[i];
        var gc = gid && card(gid);
        return '<div class="lb-evopt">' + (gc ? coverHTML(gc, { size: 44 }) : '') + '<button type="button" class="lb-btn two big key" data-i="' + i + '"' + (disabled(o) ? ' disabled' : '') + '>' +
          '<span class="lb">' + esc(o.label) + '</span><span class="sub">' + esc(o.note || '') + (gc ? '：' + esc(gc.artist) + '《' + esc(gc.album) + '》' : '') + '</span></button></div>';
      }).join('') + '</div>';
    var s = sheet(html, 'event');
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-i]'); if (!b || b.disabled) return;
      var i = +b.getAttribute('data-i'), o = ev.options[i], fx = o.effects || [];
      var up = fx.find(function (f) { return f.starUpPicked; });
      var needsCard = o.needsCard || fx.some(function (f) { return f.giveAwayPicked || f.starUpPicked; });
      var gid = p.eventCards && p.eventCards[i];
      sfx('select');
      var chooseWith = function (cid) {
        var mk = function (d) { var ch = { type: 'event', eventId: ev.id, option: i }; if (cid) ch.cardId = cid; if (d) ch.dropId = d; return ch; };
        var pr = (gid && r.deck.length >= cap) ? takeCardWithDrop(ss, gid, mk) : Promise.resolve(doChoose(mk()));
        pr.then(function (res) {
          if (!res || res.error) { eventStep(ss, save.run, save.run.pending); return; }
          closeSheet(s);
          var s2 = sheet('<div class="hd"><h3>' + esc(ev.title) + '</h3></div><p class="lb-result key">' + esc(o.result || '') + '</p>' +
            (effectsText(res.effects) ? '<p class="msg">' + esc(effectsText(res.effects)) + '</p>' : '') + '<div class="foot"><button type="button" class="lb-btn pri big wide key" data-a="next">繼續</button></div>', 'eventdone');
          qs('[data-a=next]', s2).addEventListener('click', function () { go('map'); });
          autoAct(function () { var nb = qs('[data-a=next]', s2); if (nb) nb.click(); });
          later(function () { stgP('walk', 'f', ['door', 'leave']).then(function () { hideActor('f'); }); }, 600);
        });
      };
      if (needsCard) {
        closeSheet(s);
        var title = up ? '挑一張盤：' + ZH[up.starUpPicked] + ' +1' : '挑一張送出去';
        var filt = up ? function (id) { var c = cardM(id); return c && (c[up.starUpPicked] || 0) < E.CFG.starCap; } : null;
        var auto = E.routePolicy(save.run, C);
        pickCardPanel(ss, title, filt, { autoId: auto && auto.cardId }).then(function (cid) { if (!cid) return eventStep(ss, save.run, save.run.pending); chooseWith(cid); });
      } else chooseWith(null);
    });
    autoAct(function () { var ch = E.routePolicy(save.run, C); var b = ch && qs('[data-i="' + ch.option + '"]', s); if (b && !b.disabled) b.click(); else { b = qs('[data-i]:not([disabled])', s); if (b) b.click(); } }, 300);
  }
  function restStep(ss, r, p) {
    place('p', 'pay', 'player'); UI.lastSpot = 'pay';
    stg('pose', 'o', 'busy'); stg('emote', 'o', 'tea', 2400);
    var s = sheet('<div class="hd"><h3>櫃檯</h3><span class="sub">老闆把茶推過來</span></div><div class="lb-opts">' +
      '<button type="button" class="lb-btn two big pri key" data-a="tea"><span class="lb">喝杯茶</span><span class="sub">回 ' + E.CFG.teaHp + ' 聲望（現在 ' + r.hp + '／' + r.maxHp + '）' + (spillNote(E.CFG.teaHp) ? '・' + spillNote(E.CFG.teaHp) : '') + '</span></button>' +
      '<button type="button" class="lb-btn two big key" data-a="wash"><span class="lb">洗一張盤</span><span class="sub">包包裡一張盤的最高軸 +1（上限 5，盤上標「洗過」）</span></button></div>', 'rest');
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b) return;
      stg('pose', 'o', null);
      if (b.getAttribute('data-a') === 'tea') { closeSheet(s); var res = doChoose({ type: 'rest', option: 'tea' }); nodeDone(ss, res.effects, C.lines.owner.tea); return; }
      closeSheet(s);
      var auto = E.routePolicy(save.run, C);
      pickCardPanel(ss, '洗哪一張？', function (id) { return !!E.washTarget(save.run, C, id); }, { autoId: auto && auto.cardId, msg: '最高的那一軸 +1。' }).then(function (cid) {
        if (!cid) return restStep(ss, save.run, save.run.pending);
        var res = doChoose({ type: 'rest', option: 'wash', cardId: cid });
        nodeDone(ss, res.effects, C.lines.owner.wash);
      });
    });
    autoAct(function () { var ch = E.routePolicy(save.run, C); var b = qs('[data-a="' + ((ch && ch.option) || 'tea') + '"]', s); if (b) b.click(); }, 300);
  }

  // ======================================================================= end（散場／打烊 §8.5）
  function clashLine(cl) {
    if (!cl) return '（還沒出手就倒下了）';
    var fmt = W.DipLabDuel && W.DipLabDuel._fmt;
    try { if (fmt && fmt.clashText) { var t = fmt.clashText(cl); if (t && t.plain) return (t.st ? '［' + t.st + '］' : '') + t.plain; } } catch (e) { console.error(e); }
    try { if (fmt && fmt.banner) { var b0 = fmt.banner(cl); if (b0 && (b0.line || b0.text)) return b0.line || b0.text; } } catch (e) { console.error(e); }
    var tot = cl.toP || cl.toE || 0;
    return (cl.toP ? '你扣 ' : '他扣 ') + tot;
  }
  function lostHandHTML(la) {
    var rv = la && la.reveal, cl = la && la.clash;
    var eC = rv && rv.eCard, pC = rv && rv.pCard;
    var side = function (c, who, attr, cls) {
      return '<div class="slot ' + cls + '">' + (c ? coverHTML(c, { size: 64, frame: false, badge: false }) : '<span class="lb-cv empty"></span>') +
        '<div class="who">' + who + '・' + (c && attr ? '<span class="' + attr + '">' + ZH[attr] + ' ' + (c[attr] || 0) + '</span>' : '<span>品味輾壓</span>') + '</div></div>';
    };
    return '<div class="lb-lost"><div class="k">輸在這一手</div><div class="tbl">' + side(eC, '他', rv && rv.eAttr, 'e') + side(pC, '你', rv && rv.pAttr, 'p') + '</div>' +
      '<div class="ln key">' + esc(clashLine(cl)) + '</div>' + (save.run && save.run.lostShort ? '<div class="s">他還剩 ' + save.run.lostShort + ' 聲望' + (save.run.lostShort <= 5 ? '，差一點就贏了' : '') + '</div>' : '') + '</div>';
  }
  SCREENS.end = function () {
    var r = save.run;
    if (!r || !r.over) return go('title');
    recordNight(r);
    var sc = E.scoreRun(r);
    var clear = r.over === 'clear', la = r.stats.lostAt;
    setTop(nightLabel(r), { pause: true });
    var panel = UI.panel; panel.classList.add('end');
    cam('reward', 'end', 600);
    stg('interact', 'none');
    resetPoses(); hideActor('f'); hideActor('q1'); hideActor('q2');
    place('o', 'counter', 'owner');
    if (clear) { place('p', 'atdoor', 'player'); stg('dim', 0.6); stg('pose', 'o', 'busy'); }
    else { place('p', 'atdoor', 'player'); stg('pose', 'p', 'sit'); }
    var lostEnemy = la && C.enemies[la.enemyId];
    var sub = clear ? '02:00 打烊・' + r.stats.wins + ' 勝' : '走到 ' + (la ? la.time + '・' + (lostEnemy ? lostEnemy.name : '') + '・第 ' + la.hand + ' 手' : '');
    var newBest = sc.total > (r.bestBefore || 0);
    var met = r.stats.metIds || [], fresh = r.stats.newMetIds || [];
    var h = '<div class="lb-scroll"><div class="lb-pad"><div class="lb-endhero"><div class="lb-h1">' + (clear ? '打烊了' : '今晚就到這') + '</div><p class="sub">' + esc(sub) + '</p></div>';
    if (!clear) h += lostHandHTML(la);
    h += '<div class="lb-h2">品味分數</div><table class="lb-parts">' +
      sc.parts.map(function (p) { return '<tr><td>' + esc(String(p[0]).replace(/🔍/g, '')) + '</td><td>' + p[1] + '</td></tr>'; }).join('') +
      '<tr class="tot"><td>合計' + (newBest ? '<small>今天最佳</small>' : '') + '</td><td>' + sc.total + '</td></tr></table>';
    h += '<div class="lb-h2">今晚認識的盤 <small>' + met.length + ' 張・NEW ' + fresh.length + '</small></div>' +
      (met.length ? '<div class="lb-wall">' + met.map(function (id) { return coverHTML(card(id), { isNew: fresh.indexOf(id) >= 0 }); }).join('') + '</div>' : '<p class="sub">今晚還沒帶走任何一張。</p>');
    var shc = shelfCount(), pct = shc.total ? Math.round(shc.n / shc.total * 100) : 0;
    var ORDER = ['man', 'copycat', 'already', 'needle', 'skip', 'broke', 'buyer', 'label', 'critic', 'boss'];
    var unmet = ORDER.filter(function (id) { return !(save.book[id] && save.book[id].met); }).length;
    var unknownHab = ORDER.filter(function (id) { var Em = C.enemies[id], b = save.book[id]; return b && b.met && Em && Em.hidden && Em.disc.indexOf('hidden') >= 0 && (b.habits || []).indexOf(Em.hidden) < 0; }).length;
    var goal = unmet ? '讀人圖鑑：還有 ' + unmet + ' 位客人沒見過' : unknownHab ? '讀人圖鑑：還有 ' + unknownHab + ' 位客人的「？」沒翻開' : '讀人圖鑑全開了。下一個目標：今天最佳分數';
    h += '<div class="lb-goal"><div class="row"><b>唱片櫃 已認識 ' + shc.n + '／' + shc.total + '</b><span>' + pct + '%</span></div><div class="bar"><i style="width:' + pct + '%"></i></div>' +
      '<p class="sub">' + esc(goal) + '。再來一夜，客人和箱子都會換一批。</p></div>';
    if (save.unlocks.secondNightTeaser) h += '<div class="lb-teaser"><div class="sil">' + pix(labSpr().e7, 40) + '</div><div><b>' + esc(C.secondNight.line) + '</b><div class="sub">' + esc(C.secondNight.label) + '</div></div></div>';
    h += '</div></div><div class="foot lb-endbtns"><button type="button" class="lb-btn pri big wide key" data-a="again">再來一夜</button><div class="row"><button type="button" class="lb-btn key" data-a="shelf">唱片櫃</button><button type="button" class="lb-btn key" data-a="taipei">' + esc(line('taipeiLink') || '出門看看（台北地圖・預告）') + '</button></div></div>';
    panel.innerHTML = h;
    sfx(clear ? 'win' : 'lose');
    panel.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b) return;
      var act = b.getAttribute('data-a');
      if (act === 'again') {
        var f = FX(); if (f && save.settings.sound && !f.soundOn()) try { f.unlockFromGesture(true); } catch (_) {}
        stg('dim', 1);
        startAgain();
      } else if (act === 'shelf') openPage('shelf');
      else if (act === 'taipei') go('taipei', { back: 'end' });
    });
    if (UI.auto && UI.auto.until === 'end') UI.auto = null;
  };

  // ======================================================================= 台北地圖預告（§5.6：同一個渲染器換一份 JSON）
  SCREENS.taipei = function (p) {
    UI.taipeiBack = p.back || 'title';
    setTop('台北踢館地圖<small>預告・示意</small>', { links: [[line('backToShop') || '回店裡', backFromTaipei, 'back']] });
    var panel = UI.panel; panel.classList.add('taipei');
    panel.innerHTML = '<div class="lb-pad"><p class="lb-tp"><b>dip vinyl（本店）</b>：' + esc(line('taipeiHere') || '你在這。') + '</p>' +
      (line('taipeiNote') ? '<p class="sub">' + esc(line('taipeiNote')) + '</p>' : '') + '</div>';
    stgP('load', 'taipei', { camera: 'full', screen: 'taipei' }).then(function () {
      if (UI.screen !== 'taipei') return;
      stg('interact', 'taipei'); place('p', 'here', 'player');
    });
  };
  function backFromTaipei() {
    var back = UI.taipeiBack || 'title';
    stgP('load', 'dip', { camera: 'full', screen: back === 'end' ? 'end' : 'title' }).then(function () {
      place('o', 'counter', 'owner');
      if (back === 'end') go('end'); else go('title');
    });
  }

  // ======================================================================= 唱片櫃／讀人圖鑑（整頁蓋在舞台上；舞台不重掛）
  function openPage(kind, p) {
    p = p || {};
    closePage(true);
    var pg = el('div', 'lb-page ' + kind);
    pg.setAttribute('role', 'dialog');
    app().appendChild(pg);
    UI.page = { el: pg, kind: kind };
    bindInfoTaps(pg);
    if (kind === 'shelf') renderShelf(pg, p.filter || 'all'); else renderBook(pg);
  }
  function closePage(silent) {
    var pg = UI.page; if (!pg) return;
    UI.page = null;
    if (pg.kind === 'shelf') { Object.keys(save.shelf).forEach(function (id) { save.shelf[id].isNew = false; }); persist(); }
    pg.el.remove();
  }
  function pageTop(title, pg) {
    var bar = el('div', 'lb-top page', '<div class="tt">' + title + '</div><button type="button" class="lnk" data-a="close">關閉</button>');
    pg.appendChild(bar);
    qs('[data-a=close]', bar).addEventListener('click', function (e) { stopEv(e); closePage(); });
  }
  function renderShelf(pg, filter) {
    pg.innerHTML = '';
    var total = Object.keys(C.cards).length;
    var ids = Object.keys(save.shelf).filter(card).reverse();
    var shown = ids.filter(function (id) { return filter === 'new' ? save.shelf[id].isNew : filter === 'ace' ? !!card(id).tier : true; });
    pageTop('唱片櫃<small>已認識 ' + ids.length + '／' + total + '</small>', pg);
    var body = el('div', 'lb-scroll');
    body.innerHTML = '<div class="lb-pad"><div class="lb-filters">' + [['all', '全部'], ['new', 'NEW'], ['ace', '王牌']].map(function (f) { return '<button type="button" class="lb-btn' + (filter === f[0] ? ' on' : '') + '" data-f="' + f[0] + '">' + f[1] + '</button>'; }).join('') + '</div>' +
      (shown.length ? '<div class="lb-wall">' + shown.map(function (id) { return coverHTML(card(id), { isNew: save.shelf[id].isNew }); }).join('') + '</div>' : '<p class="sub">' + (ids.length ? '這一格是空的。' : '還沒認識任何一張。推門進去吧。') + '</p>') +
      '<p class="sub" style="margin-top:14px">點封面＝唱片資訊。贏了客人押的盤、挖箱、試聽機猜中，都會收進這裡。</p></div>';
    pg.appendChild(body);
    body.addEventListener('click', function (e) { var f = e.target.closest && e.target.closest('[data-f]'); if (f) renderShelf(pg, f.getAttribute('data-f')); });
  }
  function renderBook(pg) {
    pg.innerHTML = '';
    var order0 = ['man', 'copycat', 'already', 'needle', 'skip', 'broke', 'buyer', 'label', 'critic', 'boss'];
    var GLYPH = { 'true': '真', feint: '晃', copy: '跟', grudge: '報', eye: '盯', hidden: '？' };
    var isMet = function (id) { return !!(save.book[id] && save.book[id].met); };
    var order = order0.filter(isMet).concat(order0.filter(function (id) { return !isMet(id); }));
    var met = order0.filter(isMet).length;
    pageTop('讀人圖鑑<small>' + met + '／' + order.length + '</small>', pg);
    var h = '<div class="lb-pad"><div class="lb-book">' + order.map(function (id) {
      var Em = C.enemies[id], b = save.book[id];
      if (!b || !b.met) return '<div class="lb-bk unmet"><div class="pic">' + headHTML(enemySpr(Em), 32) + '</div><div class="nm">？？？</div><div class="ti">' + (Em.elite ? '菁英' : Em.boss ? '打烊前' : '還沒見過') + '</div></div>';
      var habits = b.habits || [];
      var disc = Em.disc.map(function (g) { var real = g === 'hidden' ? (habits.indexOf(Em.hidden) >= 0 ? Em.hidden : 'hidden') : g; return '<span class="lb-glyph' + (real === 'feint' ? ' feint' : '') + (real === 'hidden' ? ' hidden' : '') + (g === 'hidden' && real !== 'hidden' ? ' found' : '') + '">' + GLYPH[real] + '</span>'; }).join('');
      return '<div class="lb-bk">' + (Em.elite ? '<span class="el">菁英</span>' : '') + '<div class="pic">' + headHTML(enemySpr(Em), 40) + '</div><div class="nm">' + esc(Em.name) + '</div>' +
        (Em.title ? '<div class="ti">' + esc(Em.title) + '</div>' : '') + '<div class="bl">' + esc(Em.blurb) + '</div><div class="lb-glyphs">' + disc + '</div>' +
        (habits.length ? '<div class="bl">已發現：' + habits.map(function (g) { return '<b>' + GLYPH[g] + '</b>'; }).join('、') + '（下一夜直接攤開）</div>' : '') +
        '<div class="wl">勝 ' + (b.beaten || 0) + '・敗 ' + (b.lost || 0) + '</div></div>';
    }).join('');
    if (save.unlocks.secondNightTeaser) h += '<div class="lb-bk unmet"><div class="pic">' + pix(labSpr().e7, 32) + '</div><div class="nm">' + esc(C.secondNight.name) + '</div><div class="ti">' + esc(C.secondNight.title) + '</div><div class="bl">' + esc(C.secondNight.label) + '</div></div>';
    h += '</div><p class="sub" style="margin-top:14px">沒見過的客人是剪影。他會出的字裡「？」被你發現過，下一夜就直接攤開。</p></div>';
    var body = el('div', 'lb-scroll', h);
    pg.appendChild(body);
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
      body.innerHTML = '<p><b>' + esc(v.e.name) + '</b> 聲望 ' + v.e.hp + '／' + v.e.maxHp + '・氣勢 ' + v.e.qi + '</p><p>你 聲望 ' + v.p.hp + '／' + v.p.maxHp + '・氣勢 ' + v.p.qi + '・第 ' + v.hand + ' 手・賭注 ×' + v.K + '</p>' +
        '<div class="lb-opts"><button type="button" class="lb-btn big" data-a="one">出一手（期望值）</button><button type="button" class="lb-btn pri big" data-a="all">打完這場</button></div>';
    }
    function step() { if (d.over) return; E.resolveTurn(d, E.policies.ev(d)); opts.onSave(d); }
    function finish() { if (done || !d.over) return; done = true; opts.onEnd({ over: d.over, duel: d }); }
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
    var pol = E.policies[UI.auto.policy] || E.policies.ev;
    if (W.DipLabDuel && typeof W.DipLabDuel.autoplay === 'function' && UI.auto.animated) { try { if (W.DipLabDuel.autoplay(UI.auto.policy) !== false) return; } catch (e) { console.error(e); } }
    var g = 0;
    while (!d.over && g++ < 80) E.resolveTurn(d, pol(d));
    persist();
    unmountDuel();
    onDuelEnd(d);
  }

  // ======================================================================= 除錯鉤子（?debug=1）
  function kick() {
    if (!UI.auto) return;
    if (UI.screen === 'duel') return autoDuel();
    if (UI.lastAct) UI.lastAct();
    else if (UI.screen === 'map') go('map');
  }
  function installDebug() {
    W.__lab = {
      get run() { return save.run; },
      get save() { return save; },
      get stage() { return UI.stage; },
      duel: function () { return save.run && save.run.duel ? E.view(save.run.duel) : null; },
      rawDuel: function () { return save.run && save.run.duel; },
      screen: function () { return UI.screen; },
      trail: function () { return UI.trail.slice(); },
      cam: function () { return UI.camName; },
      autoplay: function (policy, o) { o = o || {}; UI.auto = { policy: policy || 'ev', until: o.until || 'duelEnd', animated: !!o.animated }; kick(); return true; },
      stop: function () { UI.auto = null; },
      seed: function (n) { UI.seedOverride = String(n); return seedKey(); },
      skipTo: function (col) { var r = save.run; if (!r) return false; r.duel = null; r.pending = null; r.col = col; persist(); go('map'); return true; },
      forceLose: function () {
        var r = save.run, d = r && r.duel; if (!d) return false;
        d.p.hp = 0; d.over = 'lose'; persist();
        unmountDuel();
        onDuelEnd(d); return true;
      },
      forceWin: function () {
        var r = save.run, d = r && r.duel; if (!d) return false;
        d.e.hp = 0; d.over = 'win'; persist();
        unmountDuel();
        onDuelEnd(d); return true;
      },
      info: function (id) { return info(id, { from: 'debug' }); },
      openPage: openPage, go: go, replayTutorial: replayTutorial
    };
  }

  // ======================================================================= boot
  // 他會出的字（真晃跟報盯？經冷硬）：Noto Sans TC 粗體子集（DipGlyph），載不到就退回系統字
  function loadGlyphFont() {
    try {
      if (!W.FontFace || !D.fonts || !W.fetch) return;
      fetch('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@700&text=' + encodeURIComponent('真晃跟報盯？經冷硬'))
        .then(function (r) { return r.ok ? r.text() : ''; })
        .then(function (css) {
          var m = /src:\s*url\(([^)]+)\)/.exec(css || ''); if (!m) return;
          var ff = new FontFace('DipGlyph', 'url(' + m[1] + ')', { weight: '700' });
          return ff.load().then(function (f) { D.fonts.add(f); });
        }).catch(function () {});
    } catch (_) {}
  }
  function buildShell() {
    var a = app(); a.innerHTML = '';
    UI.top = el('div', 'lb-top'); UI.top.id = 'top';
    UI.stageHost = el('div', 'lb-stage'); UI.stageHost.id = 'stage';
    UI.panel = el('div', 'lb-panel'); UI.panel.id = 'panel';
    a.appendChild(UI.top); a.appendChild(UI.stageHost); a.appendChild(UI.panel);
    bindInfoTaps(UI.panel);
  }
  function mountStage() {
    if (!W.DipLabStage || !W.DipLabStage.mount) return Promise.resolve(null);
    var labS = labSpr();
    return W.DipLabStage.mount(UI.stageHost, {
      shop: 'dip', cards: C.cards, coverBase: './', sprites: labS, player: function () { return save && save.player ? playerAv() : { head: 'neat' }; },
      camera: 'full', screen: 'title', speed: speed, onAction: onStageAction
    }).then(function (st) { UI.stage = st; st.onAction = onStageAction; configTut(); return st; }, function (e) { console.error(e); UI.stageHost.classList.add('nostage'); return null; });
  }
  function configTut() {
    var T = W.DipLabTut; if (!T || typeof T.configure !== 'function') return;
    try { T.configure({ stage: UI.stage, save: function () { return UI.tutReplay ? { seen: {} } : save; }, persist: persist, content: C }); } catch (e) { console.error(e); }
  }
  function boot() {
    if (UI.booted) return; UI.booted = true;
    loadGlyphFont();
    E = W.DipLabEngine; C = W.DipLabContent;
    if (!E || !C || !app()) { if (app()) app().innerHTML = '<div class="lb-boot">載入失敗，請重新整理。</div>'; return; }
    // B03：預覽站「重置」浮鈕整個藏掉（重置在 ⏸）
    D.body.classList.add('in-battle');
    save = loadSave();
    var f = FX();
    if (f) { try { if (f.init) f.init(); if (f.setSpeed) f.setSpeed(speed()); } catch (e) { console.error(e); } }
    if (f && f.music && f.music.onChange) f.music.onChange(function (c) { if (c && soundOn() && save.shelf[c.id] && !save.shelf[c.id].heard) save.shelf[c.id].heard = true; });
    // 對決以外：一首試聽自然放完就接下一首
    if (f && f.music && f.music.onEnded) f.music.onEnded(function (c) {
      if (!c || UI.screen === 'duel' || !soundOn()) return;
      if (UI.screen === 'node' && qs('.lb-sheet.listen')) return;
      var next = c, r = save.run;
      if (r && (UI.screen === 'map' || UI.screen === 'node' || UI.screen === 'reward')) {
        var pool = (r.deck || []).map(cardM).filter(function (x) { return x && x.previewUrl && x.id !== c.id; });
        if (pool.length) next = pickR(pool);
      }
      setTimeout(function () { if (UI.screen !== 'duel' && soundOn()) try { f.music.play(next, { fadeMs: 1200 }); } catch (e) { console.error(e); } }, 400);
    });
    var ci = CI();
    if (ci) {
      ci.config({ onSoundUnlock: function () { save.settings.sound = true; persist(); }, cardOf: function (id) { return cardM(id); } });
      ci.on('close', function () { flushToasts(); });
    }
    labSpr();
    if (DEBUG) installDebug();
    buildShell();
    configTut();
    // 舞台最多等 1.2 s：標題要在 2 s 內出來（e2e #1）；晚到的舞台照樣接上
    var started = false;
    var start = function () { if (started) return; started = true; UI.firstScreen = true; go('title'); UI.firstScreen = false; };
    mountStage().then(function (st) {
      if (!started) start();
      else if (st && UI.screen === 'title') { UI.camQuick = true; go('title'); }
    });
    setTimeout(start, 1200);
  }
  W.DipLabUI = { boot: boot, go: go, info: info, openHelp: openHelp, openSettings: openSettings, openPage: openPage,
    sprite: sprHTML, relicIcon: relicIcon, labSpr: labSpr, get stage() { return UI.stage; }, get save() { return save; }, get screen() { return UI.screen; } };
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot); else setTimeout(boot, 0);
})();
