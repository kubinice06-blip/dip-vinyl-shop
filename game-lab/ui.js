/* game-lab/ui.js — 品味對決・試做版：外殼與所有非對決畫面（Agent D）。SPEC §2、§6、§7.5、§7.6。
 *
 * window.DipLabUI：路由 go(screen)、存讀檔（localStorage 'dipGameLab_v1'，一律 try/catch）、
 *   title／scene（對白）／guess（猜歌、挑王牌）／map（今晚時間軸）／node（挖箱、試聽機、事件、櫃檯）／
 *   reward（押盤翻開）／end（結算）／shelf（唱片櫃）／book（讀人圖鑑）／info（唱片資訊）／help（小抄）／⏸ 設定。
 * 對決畫面交給 duel.js（DipLabDuel.mount）；這裡提供 hooks.stage／sprite／hint／info／pause／help／settings／onEvent／player。
 * 舞台模組 Stage：shop2 三層＋像素小人（roguelike.html L137–186、L501、L2159–2178 搬過來，路徑改 ../art/）。
 * 規則：
 *  - 只寫 localStorage 'dipGameLab_v1'；不寫 dipRogueMeta_v2；不用 Firebase；執行期網路只有封面、試聽、/album-desc。
 *  - 不宣告 dip-character.js 的同名全域（PIX_PAL、SPR_BODY、AVATAR_*）；整支包在 IIFE 裡，只掛 window.DipLabUI（＋?debug=1 的 window.__lab）。
 *  - UI 不算傷害：所有數字都來自 DipLabEngine（nodePreview、choose 的 effects、scoreRun）。
 *  - 浮層（泡泡、章、飛卡）pointer-events:none；只有底部面板與彈窗吃點擊。
 */
(function () {
  'use strict';
  var W = window, D = document;
  var E = null, C = null;                         // DipLabEngine / DipLabContent（boot 時取）
  var KEY = 'dipGameLab_v1';
  var WORKER = 'https://dip-vinyl-worker.kubinice06.workers.dev';
  var QS = {};
  try { new URLSearchParams(location.search).forEach(function (v, k) { QS[k] = v; }); } catch (_) {}
  var DEBUG = QS.debug === '1';
  var FAST = QS.fast === '1';
  var ZH = { c: '經典', o: '冷門', h: '硬蕊' }, ZH1 = { c: '經', o: '冷', h: '硬' };
  var GLYPH = { 'true': '真', feint: '晃', copy: '跟', grudge: '報', eye: '盯', hidden: '？' };
  var TIERS = ['hall', 'pearl', 'heresy'];

  // ======================================================================= 小工具
  function FX() { return W.DipLabFx || null; }
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
  function todayKey() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function seedKey() { return UI.seedOverride || (QS.seed ? String(QS.seed) : todayKey()); }
  function dateLabel(k) {
    var m = /^(\d{4})-?(\d{2})-?(\d{2})$/.exec(String(k || ''));
    return m ? m[2] + '/' + m[3] : String(k || '');
  }
  function nightLabel(run) { return run ? dateLabel(run.seedKey) + ' 的雨夜 <small>#' + run.nightNo + '</small>' : dateLabel(seedKey()) + ' 的雨夜'; }

  // ======================================================================= 存檔（§7.6）
  var save = null;
  function defSave() {
    return { v: 1, seen: {}, settings: { selfRead: false, fastAnim: false, sound: null }, player: null, run: null, nights: [],
      best: { score: 0, clears: 0, bySeedKey: {} }, shelf: {}, book: {}, unlocks: { secondNightTeaser: false } };
  }
  var RUN_SV = 1;        // run 的存檔格式版本：對不上（較新或較舊的試做版留下的）就不續玩，免得卡在不認得的步驟
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
    // 比這版新的存檔（例如開過較新的試做版）：照樣能玩，但這一輪不寫回去，免得蓋掉
    if (s && typeof s === 'object' && typeof s.v === 'number' && s.v > 1) { UI.saveReadOnly = true; return d; }
    if (!s || typeof s !== 'object' || s.v !== 1) return d;
    for (var k in d) if (s[k] == null || typeof s[k] !== typeof d[k]) s[k] = d[k];
    s.settings = Object.assign({}, d.settings, s.settings || {});
    s.best = Object.assign({}, d.best, s.best || {});
    if (!s.best.bySeedKey || typeof s.best.bySeedKey !== 'object') s.best.bySeedKey = {};
    s.unlocks = Object.assign({}, d.unlocks, s.unlocks || {});
    if (!Array.isArray(s.nights)) s.nights = [];
    if (s.run && !validRun(s.run)) s.run = null;
    return s;
  }
  function persist() {
    if (UI.saveReadOnly) return;
    try { W.localStorage.setItem(KEY, JSON.stringify(save)); } catch (_) { /* 寫不進去不影響遊戲 */ }
  }
  function knownHabits() {
    var o = {}; for (var id in save.book) { var b = save.book[id]; if (b && b.habits && b.habits.length) o[id] = true; } return o;
  }
  function knownCards() { var o = {}; for (var id in save.shelf) o[id] = true; return o; }
  function shelfAdd(id) {
    if (!id || !card(id)) return false;
    if (save.shelf[id]) return false;
    save.shelf[id] = { first: (save.run && save.run.seedKey) || seedKey(), heard: false, isNew: true };
    return true;
  }
  function shelfSync() {
    var r = save.run; if (!r || !r.stats) return;
    (r.stats.metIds || []).forEach(shelfAdd);
  }
  function bookOf(id) {
    var b = save.book[id];
    if (!b) b = save.book[id] = { met: true, beaten: 0, lost: 0, habits: [] };
    if (!Array.isArray(b.habits)) b.habits = [];
    return b;
  }
  function bookHabit(enemyId, glyph) {
    if (!enemyId || !glyph) return;
    var b = bookOf(enemyId); if (b.habits.indexOf(glyph) < 0) b.habits.push(glyph);
  }

  // ======================================================================= 像素小人、配件圖示
  // LAB_SPR＝roguelike.html L1378–1426 的 SPR 整段（改名；依賴 dip-character.js 的 sprRows）
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
  // 配件圖示：roguelike.html PIX_ICONS_LV[icon][0]（SPEC §3.8 指定第一級）
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
    return rows ? pix(rows, size || 24) : '<span style="font-size:' + Math.max(12, (size || 24) - 6) + 'px">🎁</span>';
  }
  function sprHTML(key, size) {
    size = size || 96;
    if (key && typeof key === 'object') return (typeof W.avatarRows === 'function') ? pix(W.avatarRows(key), size) : '';
    var S = labSpr(); return pix(S[key] || S.e0, size);
  }
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

  // ======================================================================= 舞台模組（§7.5 Stage）
  var LW = 448, LH = 492, SVGW = 78, FOOT = 5;
  var POS = {
    p: { door: [48, 408], browse: [136, 458], pay: [168, 430], leaving: [132, 418], atdoor: [128, 420], duel: [48, 412], map: [92, 446] },
    o: { counter: [174, 325], aisle: [72, 345], frontleft: [74, 424], dig1: [196, 432], dig2: [228, 420], dig3: [210, 440], between: [85, 452] },
    f: { out: [42, 336], door: [42, 344], 'in': [42, 396], duel: [196, 412], near: [190, 444], visit: [214, 446] },
    q: { q1: [34, 338], q2: [66, 330] }
  };
  var CROP = { full: 470, title: 492, map: 492, duel: 417 };
  function zOf(y) { return y < 402 ? 2 : y < 458 ? 7 + Math.round((y - 402) / 8) : 21 + Math.round((y - 458) / 8); }
  function pcOf(q) { return { left: ((q[0] - SVGW / 2) / LW * 100).toFixed(2) + '%', bottom: ((LH - (q[1] + FOOT)) / LH * 100).toFixed(2) + '%' }; }
  function Stage(host, opts) {
    opts = opts || {};
    var crop = opts.crop || 'full';
    host.classList.add('lb-stg', crop);
    var dy = ((LH - (CROP[crop] || 470)) / LH * 100).toFixed(2);
    host.innerHTML = '<div class="lb-stg-in" style="--dy:' + dy + '%">' +
      '<div class="rain"></div><img class="door" alt="" src="../art/shop2-door-0.png">' +
      '<div class="lb-notes"><span>♪</span><span>♫</span><span>♪</span></div>' +
      '<img class="fg back" alt="" src="../art/shop2-fg-back.png"><img class="fg front" alt="" src="../art/shop2-fg-front.png">' +
      '<div class="shade"></div><div class="lb-says"></div></div>';
    var inner = host.firstChild, fgBack = qs('.fg.back', inner), doorEl = qs('.door', inner), notesEl = qs('.lb-notes', inner), says = qs('.lb-says', inner);
    says.style.cssText = 'position:absolute;inset:0;z-index:40;pointer-events:none;';
    var A = {}, timers = [], walkTok = {}, sayEls = {};
    function T(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
    function ensure(id) {
      if (A[id]) return A[id];
      var d = el('div', 'lb-spr ' + id.charAt(0) + ' hide');
      d.setAttribute('data-actor', id);
      d.innerHTML = '<div class="body"></div><div class="lb-anger">💢</div>';
      inner.insertBefore(d, fgBack);
      A[id] = { el: d, body: d.firstChild, at: null, q: null, spr: null };
      return A[id];
    }
    function setSprite(id, spr) {
      var a = ensure(id); if (spr == null) return;
      var key = typeof spr === 'object' ? JSON.stringify(spr) : spr;
      if (a.spr === key) return; a.spr = key;
      a.body.innerHTML = spr === 'player' ? sprHTML(playerAv(), 96) : sprHTML(spr, 96);
    }
    function place(id, q) {
      var a = ensure(id), c = pcOf(q);
      a.q = q; a.el.style.left = c.left; a.el.style.bottom = c.bottom; a.el.style.zIndex = zOf(q[1]);
      if (sayEls[id]) posSay(id, sayEls[id]);
    }
    var api = {
      host: host, inner: inner,
      put: function (id, key, spr) {
        if (spr != null) setSprite(id, spr);
        var a = ensure(id);
        var group = POS[id.charAt(0)] || {};
        var q = Array.isArray(key) ? key : group[key];
        if (!q) return api;
        walkTok[id] = (walkTok[id] || 0) + 1;
        a.at = key; place(id, q);
        a.el.classList.toggle('hide', id === 'f' && (key === 'out'));
        return api;
      },
      walk: function (id, path) {
        var legs = [].concat(path || []); var tok = (walkTok[id] = (walkTok[id] || 0) + 1);
        return new Promise(function (res) {
          var i = 0;
          (function step() {
            if (walkTok[id] !== tok) return res();
            var group = POS[id.charAt(0)] || {}, q = Array.isArray(legs[i]) ? legs[i] : group[legs[i]];
            if (q) { var a = ensure(id); a.at = legs[i]; place(id, q); a.el.classList.remove('hide'); }
            i++;
            if (i < legs.length) T(step, 780 / speed()); else T(res, 700 / speed());
          })();
        });
      },
      door: function (mode) {
        var set = function (f) { doorEl.src = '../art/shop2-door-' + f + '.png'; };
        if (mode === 'open') { sfx('bell'); [1, 2].forEach(function (f, k) { T(function () { set(f); }, k * 190); }); }
        else if (mode === 'swing') { sfx('bell'); [[1, 0], [2, 190], [1, 900], [0, 1090]].forEach(function (x) { T(function () { set(x[0]); }, x[1]); }); }
        else set(0);
        return api;
      },
      say: function (id, text, o) {
        o = o || {};
        if (sayEls[id]) { sayEls[id].remove(); delete sayEls[id]; }
        if (!text) return null;
        var b = el('div', 'lb-say' + (o.tone ? ' ' + o.tone : ''));
        b.textContent = text;
        says.appendChild(b); sayEls[id] = b; posSay(id, b);
        var ms = o.ms == null ? 2600 : o.ms;
        if (ms > 0) T(function () { if (sayEls[id] === b) { b.classList.add('out'); T(function () { b.remove(); if (sayEls[id] === b) delete sayEls[id]; }, 320); } }, ms / speed());
        return b;
      },
      anger: function (on, id) { var a = ensure(id || 'f'); qs('.lb-anger', a.el).classList.toggle('on', !!on); if (id === 'p') a.el.classList.toggle('shake', !!on); return api; },
      notes: function (on) { notesEl.classList.toggle('on', !!on); return api; },
      busy: function (on) { ensure('o').el.classList.toggle('busy', !!on); return api; },
      dig: function (id, on) { ensure(id).el.classList.toggle('dig', !!on); return api; },
      sil: function (id, on) { ensure(id).el.classList.toggle('sil', !!on); return api; },
      show: function (id, on) { ensure(id).el.classList.toggle('hide', !on); return api; },
      foe: function (spr) { setSprite('f', spr); return api; },
      setSprite: function (id, spr) { setSprite(id, spr); return api; },
      actor: function (id) { return ensure(id).el; },
      cls: function (id, c, on) { ensure(id).el.classList.toggle(c, !!on); return api; },
      stamp: function (text, sub, cls, ms) {
        var s = el('div', 'lb-stamp' + (cls ? ' ' + cls : ''), esc(text) + (sub ? '<small>' + esc(sub) + '</small>' : ''));
        host.appendChild(s);   // 掛在看得到的舞台框上（fill 時美術層比框寬，掛在美術層會偏右）
        if (ms) T(function () { s.style.transition = 'opacity .35s'; s.style.opacity = '0'; T(function () { s.remove(); }, 400); }, ms / speed());
        return s;
      },
      clearStamps: function () { qsa('.lb-stamp', host).forEach(function (s) { s.remove(); }); },
      unmount: function () { timers.forEach(clearTimeout); timers = []; walkTok = {}; host.innerHTML = ''; }
    };
    function posSay(id, b) {
      var a = A[id]; if (!a || !a.q) return;
      var x = a.q[0] / LW * 100, headY = a.q[1] - SVGW + FOOT + 8;
      b.style.bottom = ((LH - headY) / LH * 100).toFixed(2) + '%';
      b.classList.remove('l', 'r');
      if (x < 28) { b.style.left = Math.max(1, (a.q[0] - SVGW / 2) / LW * 100).toFixed(2) + '%'; b.classList.add('l'); }
      else if (x > 70) { b.style.left = 'auto'; b.style.right = Math.max(1, 100 - (a.q[0] + SVGW / 2) / LW * 100).toFixed(2) + '%'; b.classList.add('r'); }
      else b.style.left = x.toFixed(2) + '%';
    }
    // 預設三人
    setSprite('o', 'owner'); setSprite('p', 'player');
    api.put('o', 'counter');
    if (opts.p) api.put('p', opts.p);
    if (opts.f) api.put('f', opts.f, opts.fSpr);
    if (opts.rain === false) qs('.rain', inner).style.display = 'none';
    // fill：容器比舞台自然比例高時，把舞台放大到蓋滿（底與左對齊，右邊裁掉），不留黑邊也不留白
    if (opts.fill) {
      host.classList.add('fill');
      var yb = CROP[crop] || 470, ro = null;
      var fit = function () { var cw = host.clientWidth, ch = host.clientHeight; if (!cw || !ch) return; inner.style.width = Math.ceil(Math.max(cw, ch * LW / yb)) + 'px'; };
      fit();
      if (W.ResizeObserver) { ro = new ResizeObserver(fit); ro.observe(host); } else W.addEventListener('resize', fit);
      var un0 = api.unmount;
      api.unmount = function () { if (ro) ro.disconnect(); else W.removeEventListener('resize', fit); un0(); };
    }
    return api;
  }

  // ======================================================================= 卡片與封面
  var ATTRS = ['c', 'o', 'h'];
  function coverSrc(c) { return c ? (c.localCover || c.coverUrl || '') : ''; }
  function rarityCls(c) {
    if (!c) return '';
    if (c.tier) return 'ace ' + c.tier;
    if (c.gold) return 'r-gold';
    var s = (c.c || 0) + (c.h || 0) + ((c.o || 0) >= 5 ? 1 : 0);
    return s >= 9 ? 'r-legendary' : s >= 8 ? 'r-epic' : s >= 7 ? 'r-uncommon' : s >= 6 ? 'r-rare' : 'r-common';
  }
  function coverHTML(c, o) {
    o = o || {};
    if (!c) return '<div class="lb-cv"></div>';
    var st = o.size ? ' style="width:' + o.size + 'px;height:' + o.size + 'px"' : '';
    var badge = '';
    if (c.tier && o.badge !== false) badge = '<span class="badge ' + c.tier + '">' + esc((C.aceTitle || {})[c.tier] || '') + '</span>';
    else if (c.gold) badge = '<span class="badge gold">私藏</span>';
    if (o.isNew) badge += '<span class="badge new">NEW</span>';
    if (c.washed) badge += '<span class="badge mod">洗過</span>';
    else if (c.worn) badge += '<span class="badge mod">九成新</span>';
    var src = coverSrc(c);
    return '<div class="lb-cv ' + (o.frame === false ? '' : rarityCls(c)) + (o.sel ? ' sel' : '') + '"' + st + '><div class="alt">' + esc(c.album) + '</div>' +
      (src ? '<img alt="" src="' + esc(src) + '" loading="lazy" onerror="this.remove()">' : '') + badge + '</div>';
  }
  function starsHTML(c, o) {
    o = o || {};
    if (!c) return '';
    var base = o.base || null;
    return '<div class="lb-stars' + (o.long ? ' long' : '') + '">' + ATTRS.map(function (a) {
      var up = base && (c[a] || 0) > (base[a] || 0);
      return '<span class="' + a + (up ? ' up' : '') + '">' + (c[a] || 0) + '</span>';
    }).join('') + '</div>';
  }
  // cardTile：封面＋（藝人／專輯）＋三數字；data-cid 給長按＝唱片資訊
  function tileHTML(c, o) {
    o = o || {};
    if (!c) return '';
    var cls = 'lb-ct' + (o.sel ? ' sel' : '') + (o.cls ? ' ' + o.cls : '');
    var inner = coverHTML(c, o) +
      (o.text === false ? '' : '<div class="ar">' + esc(c.artist) + '</div><div class="al">' + esc(c.album) + '</div>') +
      (o.stars === false ? '' : starsHTML(c, { base: o.base })) + (o.extra || '');
    var tag = o.tag || 'button';
    return '<' + tag + (tag === 'button' ? ' type="button"' : '') + ' class="' + cls + '" data-cid="' + esc(c.id) + '"' + (o.data ? ' ' + o.data : '') +
      ' aria-label="' + esc(c.artist + '《' + c.album + '》') + '">' + inner + '</' + tag + '>';
  }
  function sleeveHTML(c, o) {
    o = o || {};
    if (!c) return '';
    var st = o.size ? ' style="width:' + o.size + 'px;height:' + o.size + 'px"' : '';
    return '<div class="lb-sleeve ' + rarityCls(c).replace('ace ', 'r-') + '"' + st + '>' + (o.stars === false ? '' : starsHTML(c)) + '</div>';
  }
  // 長按 450 ms＝唱片資訊（點一下照常）
  function bindLongPress(root) {
    var t = null, fired = false, sx = 0, sy = 0;
    root.addEventListener('pointerdown', function (e) {
      var tgt = e.target.closest && e.target.closest('[data-cid]'); if (!tgt || !root.contains(tgt)) return;
      fired = false; sx = e.clientX; sy = e.clientY;
      clearTimeout(t);
      t = setTimeout(function () { fired = true; openInfo(cardM(tgt.getAttribute('data-cid'))); }, 450);
    });
    var cancel = function () { clearTimeout(t); };
    root.addEventListener('pointerup', cancel); root.addEventListener('pointercancel', cancel); root.addEventListener('pointerleave', cancel);
    root.addEventListener('pointermove', function (e) { if (Math.abs(e.clientX - sx) > 10 || Math.abs(e.clientY - sy) > 10) cancel(); });
    root.addEventListener('click', function (e) { if (fired) { fired = false; e.stopPropagation(); e.preventDefault(); } }, true);
    root.addEventListener('contextmenu', function (e) { if (e.target.closest && e.target.closest('[data-cid]')) e.preventDefault(); });
  }

  // ======================================================================= 頂欄、彈窗
  // 🔊 開關每次換畫面都重建：舊的要 destroy，不然 DipPlayer 的監聽器一直累積（AP10）
  function keepToggle(h) { if (h && typeof h.destroy === 'function') UI.toggles.push(h); return h; }
  function dropToggles(list) { (list || []).forEach(function (h) { try { h.destroy(); } catch (_) {} }); }
  function topBar(left, o) {
    o = o || {};
    var bar = el('div', 'lb-top');
    bar.innerHTML = '<div class="tt">' + left + '</div>';
    if (o.chips) o.chips.forEach(function (c) { bar.insertAdjacentHTML('beforeend', c); });
    if (o.hp && save.run) bar.insertAdjacentHTML('beforeend', '<span class="lb-hpchip key' + (save.run.hp <= save.run.maxHp * 0.3 ? ' low' : '') + '">聲望 <b>' + save.run.hp + '</b>/' + save.run.maxHp + '</span>');
    if (o.skip) { var sk = el('button', 'lb-ico key', '⏩'); sk.type = 'button'; sk.setAttribute('aria-label', '快轉到下一個選擇'); sk.addEventListener('click', function (e) { stopEv(e); o.skip(); }); bar.appendChild(sk); }
    if (o.links) o.links.forEach(function (l) { var b = el('button', 'lnk key', esc(l[0])); b.type = 'button'; b.addEventListener('click', function (e) { stopEv(e); l[1](); }); bar.appendChild(b); });
    if (o.sound !== false) { var s = el('span', 'lb-snd'); bar.appendChild(s); var f = FX(); if (f && f.mountToggle) { try { keepToggle(f.mountToggle(s)); } catch (e) { console.error(e); } } }
    if (o.help) { var hb = el('button', 'lb-ico key', '？'); hb.type = 'button'; hb.setAttribute('aria-label', '小抄'); hb.addEventListener('click', function (e) { stopEv(e); if (UI.going) return; openHelp(); }); bar.appendChild(hb); }
    if (o.pause) { var pb = el('button', 'lb-ico key', '⏸'); pb.type = 'button'; pb.setAttribute('aria-label', '暫停選單'); pb.addEventListener('click', function (e) { stopEv(e); if (UI.going) return; openSettings(); }); bar.appendChild(pb); }
    if (o.close) { var cb = el('button', 'lb-ico key', '✕'); cb.type = 'button'; cb.setAttribute('aria-label', '關閉'); cb.addEventListener('click', function (e) { stopEv(e); o.close(); }); bar.appendChild(cb); }
    return bar;
  }
  function modal(cls, html, onClose) {
    closeModal();
    var m = el('div', 'lb-modal');
    m.innerHTML = '<div class="pane ' + (cls || '') + '" role="dialog" aria-modal="true"><button type="button" class="lb-ico x key" aria-label="關閉">✕</button>' + html + '</div>';
    var close = function () { if (m.parentNode) m.remove(); UI.modal = null; dropToggles(m._toggles); m._toggles = null; if (onClose) onClose(); };
    m.addEventListener('click', function (e) { if (e.target === m) close(); });
    qs('.x', m).addEventListener('click', function (e) { stopEv(e); close(); });
    D.body.appendChild(m);
    UI.modal = { el: m, close: close };
    return m;
  }
  function closeModal() { if (UI.modal) { var c = UI.modal.close; UI.modal = null; c(); } }

  // ---- 唱片資訊（§7.5：封面 200、藝人、專輯、年份、曲風、推薦語、/album-desc、▶ 試聽、關閉）
  var descCache = {};
  // worker 只對正式站、Pages 預覽與 localhost:5179 開 CORS；其他來源（例如本機 8765）不打，省得主控台噴錯
  var DESC_OK = (function () { try { var h = location.hostname; return /(^|\.)dipvinyl\.tw$/.test(h) || /\.pages\.dev$/.test(h) || location.port === '5179'; } catch (_) { return false; } })();
  function fetchDesc(c) {
    if (!DESC_OK) return Promise.resolve('');
    if (descCache[c.id] != null) return Promise.resolve(descCache[c.id]);
    var ctl = W.AbortController ? new AbortController() : null;
    var to = setTimeout(function () { if (ctl) ctl.abort(); }, 2500);
    var url = WORKER + '/album-desc?artist=' + encodeURIComponent(c.artist) + '&album=' + encodeURIComponent(c.album);
    return Promise.race([
      fetch(url, ctl ? { signal: ctl.signal } : {}).then(function (r) { return r.ok ? r.json() : {}; }).then(function (j) { return (j && typeof j.desc === 'string') ? j.desc : ''; }),
      new Promise(function (r) { setTimeout(function () { r(''); }, 2600); })
    ]).catch(function () { return ''; }).then(function (d) { clearTimeout(to); if (d) descCache[c.id] = d; return d; });
  }
  function openInfo(c) {
    if (!c) return;
    var GENRE = { rock: '搖滾', jazz: '爵士', electronic: '電子', pop: '流行', soul: '靈魂樂', folk: '民謠', hiphop: '嘻哈', world: '世界音樂', classical: '古典', blues: '藍調' };
    var genres = (c.genres || []).map(function (g) { return GENRE[g] || g; }).join('・');
    var html = '<div class="lb-info"><h2>唱片資訊</h2><div class="top">' + coverHTML(c, {}) +
      '<div class="meta"><div class="al">' + esc(c.album) + '</div><div class="ar">' + esc(c.artist) + '</div>' +
      '<div class="yr">' + esc(c.year || '') + (genres ? '・' + esc(genres) : '') + '</div>' + starsHTML(c, { long: true }) +
      (c.tier ? '<div class="yr">王牌・' + esc((C.aceTitle || {})[c.tier] || '') + '</div>' : '') + '</div></div>' +
      (c.pitch ? '<p class="pitch">' + esc(c.pitch) + '</p>' : '') +
      '<p class="desc load">……</p>' +
      '<div class="act">' + (c.previewUrl ? '<button type="button" class="lb-btn pri big key" data-act="play">▶ 試聽</button>' : '<span class="lb-sub" style="flex:1;align-self:center">（這張沒有試聽）</span>') +
      '<button type="button" class="lb-btn big key" data-act="close">關閉</button></div></div>';
    var m = modal('', html);
    var dEl = qs('.desc', m);
    fetchDesc(c).then(function (d) { if (!dEl.isConnected) return; if (d) { dEl.textContent = d; dEl.classList.remove('load'); } else dEl.remove(); });
    var pb = qs('[data-act=play]', m);
    if (pb) pb.addEventListener('click', function (e) {
      stopEv(e); var f = FX(); if (!f) return;
      if (!f.soundOn()) { f.unlockFromGesture(true); save.settings.sound = true; persist(); }
      pb.textContent = '♪ 載入中…';
      f.music.play(c).then(function (ok) { if (pb.isConnected) pb.textContent = ok ? '♪ 播放中' : '▶ 試聽'; });
    });
    qs('[data-act=close]', m).addEventListener('click', function (e) { stopEv(e); closeModal(); });
  }
  // ---- 小抄（相剋三角＋≤200 字）
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
  function openHelp() {
    var rows = C.helpRows || [], gl = C.helpGlyphs || [];
    var body = rows.length ? '<dl class="lb-gl">' + rows.map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('') + '</dl>' +
      (gl.length ? '<div class="lb-h3">唱盤上的字</div><div class="lb-glt">' + gl.map(function (g) { return '<span class="lb-glyph' + (g[0] === '晃' ? ' feint' : g[0] === '？' ? ' hidden' : '') + '">' + esc(g[0]) + '</span><span>' + esc(g[1]) + '</span>'; }).join('') + '</div>' : '')
      : '<p>' + esc(C.help) + '</p>';
    modal('lb-help', '<h2>小抄</h2>' + triSVG() + body);
  }
  // ---- ⏸ 設定（§6.9）
  function openSettings() {
    var S = save.settings, armed = false;
    var html = '<h2>暫停</h2><div class="lb-menu">' +
      '<button type="button" class="lb-btn pri big key" data-a="resume">繼續</button>' +
      (UI.screen !== 'title' ? '<button type="button" class="lb-btn big key" data-a="title">回標題（存檔）</button>' : '') +
      '<div class="row" style="display:flex;gap:8px"><button type="button" class="lb-btn big key" style="flex:1" data-a="shelf">唱片櫃</button><button type="button" class="lb-btn big key" style="flex:1" data-a="book">讀人圖鑑</button></div>' +
      '<div class="lb-btn big key" style="justify-content:space-between">聲音 <span class="lb-snd" data-a="snd"></span></div>' +
      '<button type="button" class="lb-btn big key" data-a="self">進階：自己讀唱盤 <span class="sw' + (S.selfRead ? ' on' : '') + '">' + (S.selfRead ? '開' : '關') + '</span></button>' +
      '<button type="button" class="lb-btn big key" data-a="fast">動畫加速 <span class="sw' + (S.fastAnim ? ' on' : '') + '">' + (S.fastAnim ? '開' : '關') + '</span></button>' +
      '<button type="button" class="lb-btn big ghost key" data-a="reset">重置試做版存檔</button></div>' +
      '<p class="lb-sub" style="margin-top:10px">「自己讀唱盤」：序章以外，唱盤不畫色點，預覽改成依字分組。</p>';
    var m = modal('', html);
    var f = FX(); if (f && f.mountToggle) try { var th = f.mountToggle(qs('[data-a=snd]', m)); if (th && th.destroy) m._toggles = [th]; } catch (e) { console.error(e); }
    m.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b || b.tagName !== 'BUTTON') return;
      var a = b.getAttribute('data-a');
      if (a === 'resume') closeModal();
      else if (a === 'title') { closeModal(); persist(); if (W.DipLabDuel && UI.screen === 'duel') try { W.DipLabDuel.unmount(); } catch (_) {} go('title'); }
      else if (a === 'shelf' || a === 'book') {
        closeModal(); persist();
        var back = (save.run && !save.run.over && UI.screen !== 'title' && UI.screen !== 'end') ? 'resume' : (UI.screen === 'end' ? 'end' : 'title');
        go(a, { back: back });
      }
      else if (a === 'self' || a === 'fast') {
        var k = a === 'self' ? 'selfRead' : 'fastAnim'; S[k] = !S[k]; persist();
        var sw = qs('.sw', b); sw.classList.toggle('on', S[k]); sw.textContent = S[k] ? '開' : '關';
        var fx = FX(); if (fx && fx.setSpeed && a === 'fast') fx.setSpeed(speed());
        if (UI.screen === 'duel' && W.DipLabDuel && W.DipLabDuel.rerender) try { W.DipLabDuel.rerender(); } catch (err) { console.error(err); }
      } else if (a === 'reset') {
        if (!armed) { armed = true; b.textContent = '再按一次：真的清掉唱片櫃與圖鑑'; b.classList.add('pri'); return; }
        var keepSound = save.settings.sound;
        save = defSave(); save.settings.sound = keepSound; persist(); closeModal();
        if (W.DipLabDuel && UI.screen === 'duel') try { W.DipLabDuel.unmount(); } catch (_) {}
        go('title');
      }
    });
  }

  // ======================================================================= 路由
  var UI = { screen: null, params: null, modal: null, stage: null, dlg: null, auto: null, trail: [], seedOverride: null, timers: [], toggles: [], going: false };
  var SCREENS = {};
  function app() { return D.getElementById('app'); }
  function cleanup() {
    if (UI.dlg) { UI.dlg.cancel(); UI.dlg = null; }
    if (UI.stage) { try { UI.stage.unmount(); } catch (_) {} UI.stage = null; }
    UI.timers.forEach(clearTimeout); UI.timers = [];
    dropToggles(UI.toggles); UI.toggles = [];
    UI.going = false;
    closeModal();
  }
  function later(fn, ms) { var t = setTimeout(fn, ms / speed()); UI.timers.push(t); return t; }
  function go(id, params) {
    if (UI.screen === 'duel' && id !== 'duel' && W.DipLabDuel && W.DipLabDuel.unmount) { try { W.DipLabDuel.unmount(); } catch (_) {} }
    cleanup();
    UI.screen = id; UI.params = params || {};
    UI.trail.push(id); if (UI.trail.length > 80) UI.trail.shift();
    var a = app(); a.innerHTML = ''; a.setAttribute('data-screen', id);
    var f = FX(); if (f && f.rainStop && id !== 'title' && id !== 'scene') try { f.rainStop(); } catch (_) {}
    try { SCREENS[id](UI.params); } catch (e) { console.error(e); }
    if (UI.auto && UI.auto.until === id) UI.auto = null;
  }

  // ======================================================================= 場景（scene）：舞台＋對話窗＋包包條
  function buildScene(p) {
    p = p || {};
    var a = app();
    var chips = [];
    if (save.run && save.run.goodEar) chips.push('<span class="chip gold key">好耳朵</span>');
    var top = topBar(nightLabel(save.run), { chips: chips, skip: function () { if (UI.dlg) UI.dlg.skip(); }, help: !!p.help });
    var scr = el('div', 'lb-scr scene');
    var main = el('div', 'lb-main');
    var box = el('div', 'lb-box');
    var host = el('div'); box.appendChild(host);
    var dq = el('div', 'lb-dq narr', '<div class="nm"></div><div class="tx key" aria-live="polite"></div><div class="nx key" aria-hidden="true">▼</div><div class="menu"></div>');
    box.appendChild(dq); main.appendChild(box);
    var strip = null;
    if (p.strip !== false) { strip = el('div', 'lb-strip'); main.appendChild(strip); }
    scr.appendChild(main); a.appendChild(top); a.appendChild(scr);
    UI.stage = Stage(host, { crop: p.crop || 'full', p: p.p || 'browse', f: p.f || 'out', fSpr: p.fSpr, fill: true });
    if (p.door) UI.stage.door(p.door);
    var sc = { scr: scr, box: box, dq: dq, strip: strip, stage: UI.stage, top: top, stripState: p.stripState || null };
    if (strip) renderStrip(sc);
    bindLongPress(scr);
    var f = FX(); if (f && f.soundOn && f.soundOn() && f.rainStart) try { f.rainStart(); } catch (_) {}
    return sc;
  }
  function stripFromRun() {
    var r = save.run; if (!r) return { ace: null, bag: [] };
    return { ace: C.aces[r.aceTier], bag: r.deck.slice() };
  }
  function renderStrip(sc) {
    if (!sc.strip) return;
    var s = sc.stripState || stripFromRun();
    var h = '<span class="lab">包包</span><div class="slot ace' + (s.ace ? ' filled' : '') + '" data-slot="ace"' + (s.ace ? ' data-cid="' + esc(s.ace) + '"' : '') + '>' +
      (s.ace ? '<img alt="" src="' + esc(coverSrc(card(s.ace))) + '" onerror="this.remove()">' : '') + '</div><span class="sep"></span>';
    var n = Math.max(7, 0);
    for (var i = 0; i < Math.min(7, Math.max(n, s.bag.length)); i++) {
      var id = s.bag[i], c = id && cardM(id);
      h += '<div class="slot' + (c ? ' filled' : '') + (c && C.junk.indexOf(id) >= 0 ? ' junk' : '') + '" data-slot="' + i + '"' + (c ? ' data-cid="' + esc(id) + '"' : '') + '>' +
        (c ? '<img alt="" src="' + esc(coverSrc(c)) + '" onerror="this.remove()">' : '') + '</div>';
    }
    if (s.bag.length > 7) h += '<span class="tag key">+' + (s.bag.length - 7) + '</span>';
    else if (s.label) h += '<span class="tag key">' + esc(s.label) + '</span>';
    sc.strip.innerHTML = h;
    sc.strip.classList.toggle('tagged', s.bag.length > 7 || !!s.label);   // 右上角有標籤：格子往下讓，不壓到封面
  }
  function flyCover(c, fromEl, toEl, delay) {
    return new Promise(function (res) {
      if (!fromEl || !toEl || !c) return res();
      var a = fromEl.getBoundingClientRect(), b = toEl.getBoundingClientRect();
      var S0 = 52, f = el('div', 'lb-fly');
      f.style.cssText = 'left:' + (a.left + a.width / 2 - S0 / 2) + 'px;top:' + (a.top + a.height * 0.3) + 'px;width:' + S0 + 'px;height:' + S0 + 'px;background-image:url("' + coverSrc(c).replace(/"/g, '%22') + '");opacity:0';
      D.body.appendChild(f);
      var dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height * 0.3 + S0 / 2), sc = b.width / S0;
      var dur = 560 / speed();
      setTimeout(function () {
        sfx('flip');
        var an = f.animate([{ transform: 'translate(0,0) scale(.6) rotate(-10deg)', opacity: 0 }, { transform: 'translate(' + dx * 0.15 + 'px,' + (dy * 0.15 - 30) + 'px) scale(1.05) rotate(-4deg)', opacity: 1, offset: 0.3 },
          { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sc + ') rotate(0)', opacity: 1 }], { duration: dur, easing: 'cubic-bezier(.3,.7,.3,1)', fill: 'forwards' });
        var fin = function () { f.remove(); res(); };
        an.onfinish = fin; setTimeout(function () { if (f.isConnected) fin(); }, dur + 200);
      }, (delay || 0) / speed());
    });
  }
  function giveCards(sc, kind, instant) {
    var r = save.run; if (!r || !sc.strip) return Promise.resolve();
    var s = sc.stripState || (sc.stripState = { ace: null, bag: [] });
    var ids = kind === 'ace' ? [C.aces[r.aceTier]] : kind === 'gifts' ? (C.gifts[r.aceTier] || []) : (C.junk || []);
    var from = sc.stage.actor('o');
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

  // ======================================================================= 對白（§2.2）
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
    sc.box.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('.menu button')) return; tap(); });
    // 桌機：空白鍵／Enter＝點一下（面板或彈窗開著時不搶）
    var keyH = function (e) {
      if (UI.dlg !== api || UI.modal || (e.key !== ' ' && e.key !== 'Enter')) return;
      if (qs('.lb-sheet', sc.scr) || (e.target && e.target.closest && e.target.closest('button'))) return;
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
      var S = sc.stage, jobs = [];
      if (sg.fSpr) S.foe(sg.fSpr);
      if (sg.oPath) {
        if (instant) S.put('o', sg.oPath[sg.oPath.length - 1]);
        else { var dig = sg.oPath.some(function (k) { return /^dig/.test(k); }); if (dig) S.dig('o', true); jobs.push(S.walk('o', sg.oPath).then(function () { S.dig('o', false); })); }
      } else if (sg.o) S.put('o', sg.o);
      if (sg.p) S.put('p', sg.p);
      if (sg.f) S.put('f', sg.f);
      if (sg.door) S.door(instant && sg.door === 'swing' ? 'shut' : sg.door);
      if ('notes' in sg) S.notes(sg.notes);
      if ('oBusy' in sg) S.busy(sg.oBusy);
      if ('anger' in sg) { S.anger(sg.anger, 'p'); if (sg.anger) sfx('faceChange'); }
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
      menu: function (items) {
        return new Promise(function (res) {
          menu.innerHTML = '';
          guardClicks(menu);
          items.forEach(function (it, i) {
            var b = el('button', 'lb-dqopt key', '<span class="cur">▶</span>' + esc(String(it).replace(/^▶\s*/, '')));
            b.type = 'button';
            b.addEventListener('click', function (e) {
              stopEv(e);   // 點 ▼ 的第二下不會直接選掉第一個選項（menu 掛著 .arming 時吃掉）
              sfx('tick'); menu.innerHTML = ''; dq.classList.remove('hasmenu'); res(i);
            });
            menu.appendChild(b);
          });
          dq.classList.add('hasmenu');
          focusFirst(menu, '.lb-dqopt');
          autoAct(function () { var b = qs('button', menu); if (b) b.click(); });
        });
      },
      say: function (who, text, o) {   // 單句（例：回嘴的回覆）；自動前進
        return api.run([{ who: who, text: text }], o);
      },
      run: function (beats, onUi) {
        var i = 0;
        var next = function () {
          if (st.cancelled) return new Promise(function () {});
          if (i >= beats.length) return Promise.resolve();
          var b = beats[i++];
          if (b.if && !ctx.flags[b.if]) return next();
          if (b.ui === 'acePick' && ctx.acePicked) return next();
          sc.stage.clearStamps();
          var instant = st.skipping && !b.ui;
          var p0 = applyStage(b.stage, st.skipping);
          if (b.music) music(b.music);
          if (b.stamp && !instant) {
            var parts = String(b.stamp).split('：');
            sc.stage.stamp(parts[0], parts[1] || '', b.who === '藏家' ? 'ink' : '');
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
            var ms = Math.min(3500, 900 + 90 * text.length);   // 手機上一般人一秒讀 5–8 字；點一下就跳，讀得快的不用等
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
  // 自動遊玩（__lab.autoplay）：在每個決策點代替玩家
  // 每個決策點都登記成 UI.lastAct（只有最新的一個有效），自動模式下排程執行；kick() 可以補踢一次
  function autoAct(fn, ms) {
    var wrapped = function () { if (UI.lastAct !== wrapped) return; fn(); };
    UI.lastAct = wrapped;
    if (UI.auto) setTimeout(function () { if (UI.auto) wrapped(); }, (ms || 160) / speed());
  }

  // ======================================================================= 底部面板
  // 換面板的防連點（R1）：面板剛換上來的一小段時間，真人的點擊一律不算。
  // 雙擊的第二下會落在新面板同一個位置（沒看過的選項：挖箱的第一張、菁英的配件、丟盤選單的第一張），這裡把它吃掉。
  // 自動遊玩用 b.click()（isTrusted＝false）不受影響。
  // 做法：剛換上的面板先掛 .arming（CSS pointer-events:none），GUARD_MS 後才收掉；這段時間真人的點擊（含鍵盤 Enter）也一律吃掉。
  var GUARD_MS = FAST ? 160 : 380;
  function guardClicks(node) {
    node.classList.add('arming');
    setTimeout(function () { node.classList.remove('arming'); }, GUARD_MS);
    if (node._guarded) return;
    node._guarded = true;
    node.addEventListener('click', function (e) {
      if (e.isTrusted && node.classList.contains('arming')) { e.stopImmediatePropagation(); e.preventDefault(); }
    }, true);
  }
  // 鍵盤：面板一出來就把焦點放在第一個能按的鈕（不捲動；滑鼠／觸控不會因此出現焦點框）
  function focusFirst(root, sel) {
    requestAnimationFrame(function () {
      if (!root.isConnected) return;
      var ae = D.activeElement; if (ae && ae !== D.body && root.contains(ae)) return;
      var b = qsa(sel || 'button:not([disabled])', root).find(function (x) { var cs = getComputedStyle(x); return cs.visibility !== 'hidden' && cs.display !== 'none'; });
      if (b) try { b.focus({ preventScroll: true }); } catch (_) {}
    });
  }
  function sheet(sc, html, cls) {
    var host = sc.scr || sc;
    qsa(':scope > .lb-sheet', host).forEach(function (s) { s.remove(); });
    var s = el('div', 'lb-sheet' + (cls ? ' ' + cls : ''), html);
    s.addEventListener('click', stopEv);
    guardClicks(s);
    host.appendChild(s);
    // scene／map：面板放進版面（不蓋舞台），對話窗（地圖是時間軸＋包包條）先收起來，舞台縮短時從上面裁，人物頭腳都留著（UX-04、UX-08）
    if (inFlowHost(host)) host.classList.add('sheeted');
    focusFirst(s);
    return s;
  }
  function closeSheet(s) {
    if (!s) return;
    var host = s.parentNode;
    if (host) s.remove();
    if (inFlowHost(host) && !qs(':scope > .lb-sheet', host)) {
      host.classList.remove('sheeted');
      // 面板收起來、時間軸＋包包條回到手指底下：跟新面板一樣先不吃點擊（雙擊「就他了／再看看」的第二下不會打開包包）
      qsa(':scope > .lb-tl, :scope > .lb-bagbar', host).forEach(guardClicks);
    }
  }
  function inFlowHost(h) { return !!(h && h.classList && (h.classList.contains('scene') || (h.classList.contains('stagescr') && h.classList.contains('map')))); }
  function playingTag() { var f = FX(); return (f && f.soundOn && f.soundOn()) ? '<span class="lb-mini-tt"><span class="rec"></span>播放中</span>' : ''; }

  // 猜歌（只亮封面、藝人、專輯，不亮星數；點封套不換歌）
  function guessPanel(sc, ctx, beat) {
    return new Promise(function (res) {
      var ids = shuffled(TIERS.map(function (t) { return C.aces[t]; }));
      var s = sheet(sc, '<div class="hd"><h3 class="key">' + esc(beat.prompt || '剛才那段，是哪一張？') + '</h3>' + playingTag() + '</div>' +
        '<div class="lb-trio">' + ids.map(function (id) { return tileHTML(card(id), { stars: false, frame: false, badge: false }); }).join('') + '</div>' +
        '<p class="note">點封套作答。音樂會繼續放，不會換歌。</p>', 'guess');
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
      autoAct(function () { var b = qs('.lb-ct', s); if (b) b.click(); });
    });
  }
  // 挑王牌（7 星那軸、掃光框、耳朵、一句話；點封套換聽；「就這張」確認）
  function acePickPanel(sc, ctx, beat) {
    return new Promise(function (res) {
      var f = FX();
      var sel = ctx.defaultTier || 'hall';
      var prompt = ctx.quiet ? ((beat && (beat.prompt && /挑一張帶走/.test(beat.prompt) ? beat.prompt : beat.quietText)) || '（挑一張帶走。）') : ((beat && beat.prompt) || (beat && beat.text) || '（點封套換著聽，挑一張帶走。）');
      var html = '<div class="hd"><h3 class="key">' + esc(prompt) + '</h3><span class="np"></span></div><div class="lb-trio">' +
        TIERS.map(function (t) {
          var c = card(C.aces[t]), ax = C.aceAxis[t];
          return tileHTML(c, { sel: t === sel, stars: false, text: false, data: 'data-tier="' + t + '"',
            extra: '<div class="acex key"><span class="' + ax + '">' + esc(C.aceTitle[t]) + '・' + ZH[ax] + ' 7</span></div><div class="acex">' + esc(C.ears[t].name) + '</div>' +
              '<div class="ar">' + esc(c.artist) + '</div><div class="pitch">' + esc(c.pitch || '') + '</div>' });
        }).join('') + '</div><p class="note detail"></p><button type="button" class="lb-btn pri big wide key" data-a="ok">就這張</button>';
      var s = sheet(sc, html, 'acepick');
      var np = qs('.np', s), det = qs('.detail', s);
      function mark() {
        qsa('.lb-ct', s).forEach(function (x) { var on = x.getAttribute('data-tier') === sel; x.classList.toggle('sel', on); qs('.lb-cv', x).classList.toggle('sel', on); });
        var c = card(C.aces[sel]);
        np.innerHTML = (f && f.soundOn && f.soundOn()) ? '<span class="lb-mini-tt"><span class="rec"></span>' + esc(c.album) + '</span>' : '';
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
        if (e.target.closest && e.target.closest('[data-a=ok]')) {
          sfx('select'); closeSheet(s); ctx.acePicked = true; res(sel);
        }
      });
      autoAct(function () { var b = qs('[data-a=ok]', s); if (b) b.click(); }, 260);
    });
  }
  // 發燒配件三選一
  function relicPanel(sc, choices, opts) {
    opts = opts || {};
    return new Promise(function (res) {
      var html = '<div class="hd"><h3 class="key">' + esc(opts.prompt || '挑一件發燒配件') + '</h3></div><div class="lb-opts">' +
        (choices.length ? choices : [null]).map(function (id) {
          if (!id) return '<button type="button" class="lb-btn big key" data-r="">' + esc((C.relicFallback && C.relicFallback.label) || '回 4 聲望') + '</button>';
          var r = C.relics[id];
          return '<button type="button" class="lb-btn big key lb-relic" data-r="' + esc(id) + '"><span class="pix">' + relicIcon(id, 30) + '</span><span><span class="nm">' + esc(r.name) + '</span><br><span class="ds">' + esc(r.desc) + '</span></span></button>';
        }).join('') + '</div>';
      var s = sheet(sc, html, 'relics');
      s.addEventListener('click', function (e) {
        var b = e.target.closest && e.target.closest('[data-r]'); if (!b) return;
        sfx('select'); closeSheet(s); res(b.getAttribute('data-r') || null);
      });
      autoAct(function () {
        var pick = E.routePolicy(save.run, C);
        var id = pick && pick.relicId; var b = id ? qs('[data-r="' + id + '"]', s) : qs('[data-r]', s); if (b) b.click();
      });
    });
  }
  // 包包滿了：先丟一張（手牌列樣式，點一張＝丟掉，可取消）
  function dropPanel(sc, incomingId) {
    return new Promise(function (res) {
      var r = save.run;
      var html = '<div class="hd"><h3 class="key">' + esc(C.lines.owner.bagFull || '包包滿了。先拿一張出來。') + '</h3></div>' +
        '<p class="msg">要放進來的是《' + esc((card(incomingId) || {}).album || '') + '》。點一張拿出來，它會留在唱片櫃。</p>' +
        '<div class="lb-pick">' + r.deck.map(function (id) { return tileHTML(cardM(id), { text: false }); }).join('') + '</div>' +
        '<button type="button" class="lb-btn wide key" data-a="cancel">算了，不放了</button>';
      var s = sheet(sc, html, 'drop');
      s.addEventListener('click', function (e) {
        var t = e.target.closest && e.target.closest('.lb-ct');
        if (t) { sfx('tick'); closeSheet(s); res(t.getAttribute('data-cid')); return; }
        if (e.target.closest && e.target.closest('[data-a=cancel]')) { closeSheet(s); res(null); }
      });
      autoAct(function () {
        var pick = E.routePolicy(save.run, C); var id = pick && pick.dropId;
        var b = id ? qs('.lb-ct[data-cid="' + id + '"]', s) : qs('.lb-ct', s); if (b) b.click();
      });
    });
  }
  // 從包包挑一張（事件送盤／站類比／櫃檯洗盤）
  function pickCardPanel(sc, title, filterFn, opts) {
    opts = opts || {};
    return new Promise(function (res) {
      var r = save.run;
      var html = '<div class="hd"><h3 class="key">' + esc(title) + '</h3></div>' + (opts.msg ? '<p class="msg">' + opts.msg + '</p>' : '') +
        '<div class="lb-pick">' + r.deck.map(function (id) { var ok = !filterFn || filterFn(id); return tileHTML(cardM(id), { text: false, cls: ok ? '' : 'dis', data: ok ? '' : 'disabled' }); }).join('') + '</div>' +
        '<button type="button" class="lb-btn wide key" data-a="cancel">返回</button>';
      var s = sheet(sc, html, 'pick');
      s.addEventListener('click', function (e) {
        var t = e.target.closest && e.target.closest('.lb-ct');
        if (t && !t.disabled) { sfx('select'); closeSheet(s); res(t.getAttribute('data-cid')); return; }
        if (e.target.closest && e.target.closest('[data-a=cancel]')) { closeSheet(s); res(null); }
      });
      autoAct(function () { var id = opts.autoId; var b = id ? qs('.lb-ct[data-cid="' + id + '"]', s) : qs('.lb-ct:not([disabled])', s); if (b) b.click(); });
    });
  }
  // 押盤翻開（背面三軸先亮 → 抖兩下 → Tron 線框 → 封面 → 播）
  function stakePanel(sc, cardId, opts) {
    opts = opts || {};
    return new Promise(function (res) {
      var c = card(cardId), isNew = !!opts.isNew, f = FX();
      var meta = '<div class="meta"><div class="ar">' + esc(c.artist) + '</div><div class="al">' + esc(c.album) + '</div><div class="ar">' + esc(c.year || '') + '</div>' +
        starsHTML(c, { long: true }) + '<div class="tags">' + (isNew ? '<span class="new">NEW</span>' : '') + '<button type="button" class="lnk key" data-a="info">ⓘ 唱片資訊</button></div></div>';
      var html = '<div class="hd"><h3 class="key">' + esc(opts.title || '他押的那張') + '</h3><span class="np"></span></div>' +
        '<div class="lb-flip"><div class="card3d"><div class="in"><div class="back">' + sleeveHTML(c) + '</div><div class="face">' + coverHTML(c, { isNew: isNew }) + '</div><div class="wire"></div></div></div>' + meta + '</div>' +
        (opts.note ? '<p class="msg">' + opts.note + '</p>' : '') +
        '<div class="row btns">' + (opts.buttons || []).map(function (b, i) {
          return '<button type="button" class="lb-btn big col key' + (b.pri ? ' pri' : '') + '" data-i="' + i + '"' + (b.disabled ? ' disabled' : '') + '>' + esc(b.label) + (b.sub ? '<span class="sub">' + esc(b.sub) + '</span>' : '') + '</button>';
        }).join('') + '</div>';
      var s = sheet(sc, html, 'stake');
      var inn = qs('.card3d .in', s), wire = qs('.wire', s), btns = qs('.btns', s);
      btns.style.visibility = 'hidden';
      var rm = f && f.reducedMotion && f.reducedMotion();
      var spd = speed();
      var reveal = function () {
        inn.style.transform = 'rotateY(180deg)';
        btns.style.visibility = '';
        focusFirst(btns);
        if (f && f.music && f.soundOn && f.soundOn()) { f.music.play(c, { fadeMs: 1500 }).then(function (ok) { if (ok && s.isConnected) qs('.np', s).innerHTML = playingTag(); }); }
        autoAct(function () { var b = qs('[data-i="' + (opts.autoIndex || 0) + '"]', s); if (b && !b.disabled) b.click(); else { b = qs('[data-i]:not([disabled])', s); if (b) b.click(); } }, 200);
      };
      if (rm || !inn.animate) setTimeout(reveal, 150);
      else {
        var sh = [{ transform: 'rotate(0)' }, { transform: 'rotate(-4deg)' }, { transform: 'rotate(4deg)' }, { transform: 'rotate(0)' }];
        setTimeout(function () {
          inn.animate(sh, { duration: 260 / spd, iterations: 2 });
          setTimeout(function () {
            sfx('flip');
            wire.animate([{ opacity: 0 }, { opacity: 1, offset: 0.3 }, { opacity: 1, offset: 0.6 }, { opacity: 0 }], { duration: 420 / spd });
            var a = inn.animate([{ transform: 'rotateY(0)' }, { transform: 'rotateY(90deg)', offset: 0.5 }, { transform: 'rotateY(180deg)' }], { duration: 400 / spd, easing: 'ease-in-out', fill: 'forwards' });
            a.onfinish = reveal;
          }, 560 / spd);
        }, 250 / spd);
      }
      s.addEventListener('click', function (e) {
        var b = e.target.closest && e.target.closest('[data-i],[data-a=info]'); if (!b) return;
        if (b.getAttribute('data-a') === 'info') { openInfo(c); return; }
        if (b.disabled) return;
        sfx('select');
        var v = opts.buttons[+b.getAttribute('data-i')];
        Promise.resolve(v.onPick ? v.onPick() : true).then(function (ok) { if (ok === false) return; closeSheet(s); res(v.value); });
      });
    });
  }

  // ======================================================================= 小提示：結果吐司、效果文字
  function toast(text, cls) {
    if (!text) return;
    var t = el('div', 'lb-toast key' + (cls ? ' ' + cls : ''), esc(text));
    app().appendChild(t);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, 1900 / speed());
  }
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
  // 回血會不會溢出成「下一場開局氣勢 +1」（FUN-08；規則在 engine nodeHeal）：給按鈕／訊息用的一句
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

  // ======================================================================= 舞台畫面骨架（map／node／reward）
  function buildStageScreen(o) {
    o = o || {};
    var a = app();
    var top = topBar(o.title || nightLabel(save.run), { hp: o.hp !== false, help: o.help, pause: o.pause, close: o.close });
    var scr = el('div', 'lb-scr stagescr ' + (o.cls || ''));
    var host = el('div'); scr.appendChild(host);
    a.appendChild(top); a.appendChild(scr);
    UI.stage = Stage(host, { crop: o.crop || 'map', p: o.p || 'browse', f: o.f || 'out', fSpr: o.fSpr, fill: true });
    bindLongPress(scr);
    return { scr: scr, stage: UI.stage, top: top };
  }

  // ======================================================================= title（§6.2）
  function firstEver() { return !save.prologueDone && !(save.nights && save.nights.length); }
  function shelfCount() { return { n: Object.keys(save.shelf).filter(card).length, total: Object.keys(C.cards).length }; }
  SCREENS.title = function () {
    var a = app(), r = save.run, hasRun = !!(r && !r.over), overRun = !!(r && r.over);
    // 標題的兩顆推門鈕本身就是聲音的選擇：還沒選之前，右上不放 🔊（AP9）
    var top = topBar(esc(dateLabel(seedKey())) + ' 的雨夜', { sound: false, links: [['唱片櫃', function () { go('shelf', { back: 'title' }); }], ['讀人圖鑑', function () { go('book', { back: 'title' }); }]] });
    var scr = el('div', 'lb-scr title');
    var host = el('div'); scr.appendChild(host);
    var acts = el('div', 'lb-title-acts');
    var contSub = '';
    if (hasRun) {
      var col = r.map.cols.find(function (c) { return c.col === r.col; });
      var hpNow = (r.duel && r.duel.p && typeof r.duel.p.hp === 'number' && !r.duel.over) ? Math.max(0, r.duel.p.hp) : r.hp;   // 對決中：對決裡的聲望
      contSub = (col ? col.time : '') + '・聲望 ' + hpNow;
    }
    var best = save.best.bySeedKey[seedKey()], sh = shelfCount();
    var info = '<p class="lb-sub key">' + esc(dateLabel(seedKey())) + ' 的雨夜' + (best ? '・今天最佳 ' + best + ' 分' : '') + (save.best.clears ? '・打烊 ' + save.best.clears + ' 次' : '') +
      (sh.n ? '・唱片櫃 ' + sh.n + '／' + sh.total : '') + '</p>';
    if (hasRun) {
      // 有一晚還沒走完：大鈕＝繼續；重新推門要按兩次，免得一按就把今晚丟掉（R3、UX-02）
      acts.innerHTML = '<button type="button" class="lb-btn pri big wide col key" data-a="cont">繼續今晚 ▶<span class="sub">' + esc(contSub) + '</span></button>' +
        '<div class="row"><button type="button" class="lb-btn key" data-a="push">重新推門</button><button type="button" class="lb-btn key" data-a="quiet">🔇 安靜地重新推門</button></div>' +
        '<p class="lb-sub key lb-warn" hidden>再按一次就放棄今晚（' + esc(contSub) + '），從頭推門。</p>' + info;
    } else {
      acts.innerHTML = '<button type="button" class="lb-btn pri big wide key" data-a="push">推門（有聲音） ▶</button>' +
        '<div class="row"><button type="button" class="lb-btn key" data-a="quiet">🔇 安靜地推門</button>' +
        (overRun ? '<button type="button" class="lb-btn key" data-a="end">看今晚結算</button>' : '') + '</div>' + info;
    }
    scr.appendChild(acts);
    a.appendChild(top); a.appendChild(scr);
    UI.stage = Stage(host, { crop: 'title', p: [-60, 460], f: 'out', fill: true });
    UI.stage.busy(true);
    UI.stage.host.insertAdjacentHTML('beforeend', '<div class="lb-sign"><h1>品味對決<span class="gold">・</span>試做</h1><p>dip vinyl game lab</p></div>');
    var armed = null, armedAt = 0;
    acts.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b) return;
      var act = b.getAttribute('data-a');
      if (act === 'push' || act === 'quiet') {
        // 第一下之後 300 ms 內的第二下當成同一下（手抖的連點不算確認）；按鈕不會移位，看清楚再按一次就算
        if (hasRun && armed === act && Date.now() - armedAt < 300) return;
        if (hasRun && armed !== act) {
          armed = act; armedAt = Date.now();
          qsa('[data-a=push],[data-a=quiet]', acts).forEach(function (x) { x.classList.toggle('armed', x === b); });
          b.textContent = act === 'push' ? '再按一次：重新推門' : '再按一次：安靜地重新推門';
          var w = qs('.lb-warn', acts); if (w) w.hidden = false;
          sfx('tick');
          return;
        }
        pushDoor(act === 'push');
      }
      else if (act === 'end') go('end');
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
    // 今晚那首歌在推門當下就開始抓（P1 打字的時間也算進去），慢網路才不會掉回安靜版（AP12）
    if (firstEver() && withSound && f && f.music && f.music.preload) {
      try { f.music.preload([card(C.aces[TIERS[E.fnv1a32(seedKey() + '#tonight') % 3]])].filter(Boolean)); } catch (e) { console.error(e); }
    }
    if (firstEver()) startPrologue(!withSound);
    else startAgain();
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

  // ---- 序章（§2.3）
  function startPrologue(quiet) {
    var tonight = C.aces[TIERS[E.fnv1a32(seedKey() + '#tonight') % 3]];
    var ctx = { flags: {}, quiet: !!quiet, tonightId: tonight, defaultTier: tierOfCard(tonight) };
    save.run = null; persist();
    go('scene', { p: 'door', f: 'out', fSpr: enemySpr(C.enemies[C.prologueEnemy || 'man']), stripState: { ace: null, bag: [] }, start: function (sc) {
      var dlg = Dialogue(sc, ctx);
      dlg.run(quiet ? C.script.quietPrologue : C.script.prologue, function (ui, b) { return prologueUi(ui, b, sc, dlg, ctx); });
    } });
  }
  function acePickAndCreate(sc, ctx, b, prologue) {
    return acePickPanel(sc, ctx, b).then(function (tier) {
      createRun({ aceTier: tier, goodEar: !!ctx.goodEar, prologue: prologue });
      if (ctx.goodEar && !qs('.chip.gold', sc.top)) qs('.tt', sc.top).insertAdjacentHTML('afterend', '<span class="chip gold key">好耳朵</span>');
      return tier;
    });
  }
  function playerLine(label) { return /^……（|^（/.test(label) ? label : '「' + label + '」'; }
  function prologueUi(ui, b, sc, dlg, ctx) {
    if (ui === 'guess') {
      if (ctx.quiet) { return acePickAndCreate(sc, ctx, { prompt: '（挑一張帶走。）' }, true); }
      return guessPanel(sc, ctx, b).then(function (right) { if (right) ctx.goodEar = true; });
    }
    if (ui === 'acePick') return acePickAndCreate(sc, ctx, b, true);
    if (ui === 'retort') {
      return dlg.menu(C.retorts.map(function (r) { return r.label; })).then(function (i) {
        var r = C.retorts[i];
        ctx.jab = /Mylo Xyloto/.test(r.label);   // 嗆他的耳機：第一手他亮出來的就是那張（FUN-15）
        sc.stage.anger(false, 'p');
        return dlg.run([{ who: 'player', text: playerLine(r.label) }, { who: '男子', text: r.reply }]);
      });
    }
    if (ui === 'duel') {
      return dlg.menu([b.prompt || '▶ 品味對決']).then(function () {
        var r = save.run; var n = r.map.cols[0].nodes[0];
        var jab = ctx.jab && C.cards['coldplay-mylo-xyloto'] && C.enemies[n.enemyId] && (C.enemies[n.enemyId].deck || []).indexOf('coldplay-mylo-xyloto') >= 0;
        startDuel(n.id, { foeEl: sc.stage.actor('f'), firstRecordId: jab ? 'coldplay-mylo-xyloto' : null, firstBubble: jab ? (C.lines.man && C.lines.man.jabBubble) : null });
        return new Promise(function () {});
      });
    }
    return Promise.resolve();
  }

  // ---- 再來一夜（§2.7，≤10 秒）
  function startAgain() {
    var f = FX();
    var ctx = { flags: {}, quiet: !(f && f.soundOn && f.soundOn()), defaultTier: save.lastAceTier || 'hall' };
    save.run = null; persist();
    go('scene', { p: 'door', f: 'out', stripState: { ace: null, bag: [] }, start: function (sc) {
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
    if (step === 'move' && r.col === 0 && r.map.cols[0] && r.map.cols[0].nodes[0].type === 'prologue') return startDuel(r.map.cols[0].nodes[0].id, { noEncounter: true });
    if (step === 'move') return go('map');
    if (step === 'duel') return startDuel(r.pending.nodeId, { noEncounter: true });
    if (step === 'stake' || step === 'relic') {
      var node = E.findNode(r, r.pending.nodeId);
      if (node && node.type === 'prologue') return epilogueFlow(r.pending.offer, true);
      return go('reward', { offer: r.pending.offer });
    }
    return go('node');
  }

  // ======================================================================= 對決（交給 duel.js）
  function preloadDuel(duel, node) {
    try {
      var cs = [].concat(duel.e.deck || [], duel.p.hand || [], duel.p.deck || []);
      cs.forEach(function (c) { var s = coverSrc(c); if (s) { var im = new Image(); im.src = s; } });
      var f = FX(); var list = [];
      if (node.stakeId) list.push(card(node.stakeId));
      if (duel.p.ace) list.push(duel.p.ace);
      if (duel.e.ace) list.push(duel.e.ace);
      if (f && f.music && f.music.preload) f.music.preload(list.filter(Boolean));
    } catch (e) { console.error(e); }
  }
  function startDuel(nodeId, o) {
    o = o || {};
    var r = save.run;
    var res = E.startNodeDuel(r, C, nodeId, o.firstRecordId ? { firstRecordId: o.firstRecordId } : undefined);
    if (!res || !res.duel) { console.error('startNodeDuel failed', res && res.error); go('map'); return; }
    persist();
    var node = E.findNode(r, nodeId), enemy = C.enemies[node.enemyId];
    bookOf(node.enemyId).met = true; persist();
    preloadDuel(res.duel, node);
    if (res.duel.over) { onDuelEnd(res.duel); return; }
    var f = FX();
    var foeEl = o.foeEl || null;
    var enc = (o.noEncounter || !f || !f.encounter) ? Promise.resolve() : f.encounter(foeEl);
    UI.ending = null;
    enc.then(function () {
      go('duel', { res: res, node: node, firstBubble: o.firstBubble || null });
      if (node.type === 'boss' && !o.noEncounter && !UI.auto && f && f.bossIntro) {
        try { f.bossIntro({ spriteHtml: sprHTML('boss', 72), title: enemy.name, sub: (C.lines.boss && C.lines.boss.stampSub) || '' }); } catch (e) { console.error(e); }
      }
    });
  }
  function duelHooks(node, p) {
    var enemy = C.enemies[node.enemyId];
    return {
      firstBubble: (p && p.firstBubble) || null,   // 第一手他的泡泡改說這句（序章回嘴的伏筆；duel.js 有接就用）
      stage: function (host) {
        try { if (getComputedStyle(host).position === 'static') host.style.position = 'relative'; } catch (_) {}
        var w = el('div'); host.appendChild(w);
        var st = Stage(w, { crop: 'duel', p: 'duel', f: 'duel', fSpr: enemySpr(enemy) });
        st.put('o', 'counter');
        UI.duelStage = st;
        return st;
      },
      sprite: function (k, size) { return k === 'player' ? sprHTML(playerAv(), size || 48) : sprHTML(k, size || 48); },
      hint: function (id) {
        if (!id || save.seen[id]) return false;
        save.seen[id] = true; persist(); return true;
      },
      info: function (c) { openInfo(c); },
      pause: function () { openSettings(); },
      help: function () { openHelp(); },
      settings: function () { return { selfRead: !!save.settings.selfRead, fastAnim: !!save.settings.fastAnim || FAST }; },
      onEvent: function (ev, duel) {
        if (!ev) return;
        if (ev.t === 'habitRevealed' && duel && duel.e) { bookHabit(duel.e.id, ev.glyph); persist(); }
      },
      player: { name: playerName(), avatar: playerAv() }
    };
  }
  SCREENS.duel = function (p) {
    var a = app(), r = save.run;
    var scr = el('div', 'lb-scr duel'), wrap = el('div', 'lb-duelwrap');
    scr.appendChild(wrap); a.appendChild(scr);
    var opts = {
      duel: p.res.duel, events: p.res.events || [], run: r, content: C,
      onEnd: function (result) { onDuelEnd((result && result.duel) || r.duel); },
      onSave: function (d) { if (save.run) { save.run.duel = d; persist(); } },
      hooks: duelHooks(p.node, p)
    };
    if (W.DipLabDuel && typeof W.DipLabDuel.mount === 'function') {
      try { W.DipLabDuel.mount(wrap, opts); } catch (e) { console.error(e); stubDuel(wrap, opts); }
    } else stubDuel(wrap, opts);
    if (UI.auto) later(autoDuel, 400);
  };
  function onDuelEnd(duel) {
    var r = save.run;
    if (!r || !duel || !duel.over || UI.ending === duel) return;
    UI.ending = duel;
    var node = r.pending && E.findNode(r, r.pending.nodeId);
    if (!node) { go('map'); return; }
    var eId = node.enemyId, b = bookOf(eId);
    if (duel.over === 'win') b.beaten++; else b.lost++;
    if (duel.e && duel.e.hidden && duel.stats && duel.stats.found) bookHabit(eId, duel.e.hidden);
    var eLeft = Math.max(0, (duel.e && duel.e.hp) || 0);
    var out = E.finishDuel(r, C, duel);
    if (!out || !out.offer) { console.error('finishDuel', out && out.error); persist(); go('map'); return; }
    if (out.offer.kind === 'dead') r.lostShort = eLeft;
    shelfSync(); persist();
    var o = out.offer;
    if (UI.auto && UI.auto.until === 'duelEnd') UI.auto = null;
    if (o.kind === 'retry') return retryFlow(node);
    if (o.kind === 'stake' && o.prologue) return epilogueFlow(o);
    if (o.kind === 'stake' || o.kind === 'elite') return go('reward', { offer: o });
    // 打烊／散場：一結束就把今晚記下來（R2）。之後的對白場景中途關掉或重新整理，分數、打烊次數、第二夜預告都不會丟
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

  // ---- 序章輸了：「……再一場。」3 秒內同牌組重打
  function retryFlow(node) {
    go('scene', { p: 'atdoor', f: 'in', fSpr: 'e0', start: function (sc) {
      sc.stage.put('o', 'between');
      var dlg = Dialogue(sc, {});
      dlg.run([{ who: '男子', text: '「' + C.lines.man.win + '」' }, { who: '老闆', text: '「' + C.lines.owner.retry + '」' }]).then(function () {
        startDuel(node.id, { noEncounter: true });
      });
    } });
  }
  // ---- 序章收尾（押盤 Fishmans → 配件三選一 → 地圖）
  function epilogueFlow(offer, resumed) {
    var r = save.run;
    go('scene', { p: 'atdoor', f: 'in', fSpr: 'e0', start: function (sc) {
      sc.stage.put('o', 'between');
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
            { label: '寄放櫃檯', sub: '包包不加這張（收進唱片櫃）', value: 'shelf' }] }).then(function (v) {
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
        // 「門又開了」：進門的是今晚第一位客人的剪影（不是剛走的男子又回來）
        try {
          var c1 = save.run.map.cols.find(function (c) { return c.col === 1; });
          var nd1 = c1 && c1.nodes.find(function (n) { return n.enemyId; });
          if (nd1) { sc.stage.put('f', 'out', enemySpr(C.enemies[nd1.enemyId])); sc.stage.sil('f', true); }
        } catch (_) {}
        return dlg.run(C.script.afterPrologue, function (ui) {
          if (ui === 'map') { save.prologueDone = true; persist(); go('map'); return new Promise(function () {}); }
          return Promise.resolve();
        });
      });
    } });
  }
  // ---- 打烊（通關）
  function clearFlow(offer, node, first) {
    go('scene', { p: 'atdoor', f: 'in', fSpr: 'boss', start: function (sc) {
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
  // ---- 散場
  function deadFlow(node) {
    go('scene', { p: 'browse', f: 'out', start: function (sc) {
      sc.stage.cls('p', 'ko', true);
      var dlg = Dialogue(sc, {});
      dlg.run(C.script.dead).then(function () { go('end'); });
    } });
  }
  // ---- 傳說藏家進門
  function bossEnterFlow(node) {
    go('scene', { p: 'atdoor', f: 'out', fSpr: 'boss', start: function (sc) {
      var dlg = Dialogue(sc, {});
      dlg.run(C.script.bossEnter, function (ui, b) {
        if (ui === 'duel') return dlg.menu([b.prompt || '▶ 品味對決']).then(function () { startDuel(node.id, { foeEl: sc.stage.actor('f') }); return new Promise(function () {}); });
        return Promise.resolve();
      });
    } });
  }

  // ======================================================================= reward（§6.5）
  function takeCardWithDrop(sc, cardId, mk) {
    var r = save.run;
    if (r.deck.length < E.CFG.deckCap) return Promise.resolve(doChoose(mk(undefined)));
    stageSay('o', C.lines.owner.bagFull, 'hint');
    return dropPanel(sc, cardId).then(function (dropId) { return dropId ? doChoose(mk(dropId)) : null; });
  }
  function stageSay(id, text, tone) { if (UI.stage && text) try { UI.stage.say(id, text, { tone: tone || null, ms: 2600 }); } catch (_) {} }
  SCREENS.reward = function (p) {
    var r = save.run, o = p.offer || (r.pending && r.pending.offer);
    if (!o) return resumeRun();
    var node = E.findNode(r, r.pending.nodeId), enemy = C.enemies[node.enemyId];
    var ss = buildStageScreen({ title: esc(node.time + ' ' + enemy.name), crop: 'full', p: 'browse', f: 'near', fSpr: enemySpr(enemy), cls: 'reward' });
    var lose = (C.lines[node.enemyId] && C.lines[node.enemyId].lose) || [];
    later(function () { stageSay('f', [].concat(lose)[0]); }, 300);
    var elite = o.kind === 'elite';
    var pend = r.pending;
    var stakeStep = function () {
      if (pend.stakeDone) return Promise.resolve();
      var isNew = !!(r.stats.newMetIds && r.stats.newMetIds.indexOf(o.cardId) >= 0);
      var btns = [{ label: '收進包包', sub: '包包 ' + r.deck.length + '／12', value: 'take', pri: true }];
      if (elite || !o.relicId) btns.push({ label: '寄放櫃檯', sub: '包包不加這張（收進唱片櫃）', value: 'shelf' });
      else {
        var rel = C.relics[o.relicId];
        btns.push({ label: '拿他的「' + rel.name + '」', sub: o.relicOwned ? '已經有了：改回 ' + ((C.relicFallback && C.relicFallback.hp) || 4) + ' 聲望' : rel.desc, value: 'relic' });
      }
      if (o.extraCardIds && o.extraCardIds.length) btns.push({ label: '再挑一張他的盤', sub: '會員集點卡', value: 'extra' });
      var loop = function () {
        return stakePanel(ss, o.cardId, { title: '他押的那張', isNew: isNew, buttons: btns }).then(function (v) {
          if (v === 'take') return takeCardWithDrop(ss, o.cardId, function (d) { return { type: 'takeStake', dropId: d }; }).then(function (res) { if (!res) return loop(); toast(effectsText(res.effects)); });
          if (v === 'shelf') { doChoose({ type: 'keepStakeOnShelf' }); return; }
          if (v === 'relic') { var res = doChoose({ type: 'takeRelic', relicId: o.relicId }); toast(effectsText(res.effects)); return; }
          if (v === 'extra') return extraPanel(ss, o).then(function (res) { if (!res) return loop(); toast(effectsText(res.effects)); });
        });
      };
      return loop();
    };
    stakeStep().then(function () {
      if (elite && !pend.relicDone && save.run.pending) {
        return relicPanel(ss, o.relicChoices || [], { prompt: '他身上掉出三件發燒配件，挑一件' }).then(function (id) {
          var res = doChoose({ type: 'pickRelic', relicId: id }); toast(effectsText(res.effects));
        });
      }
    }).then(function () { later(function () { go('map'); }, 250); });
  };
  function extraPanel(ss, o) {
    return new Promise(function (res) {
      var html = '<div class="hd"><h3 class="key">再挑一張他的盤</h3></div><div class="lb-trio">' + o.extraCardIds.map(function (id) { return tileHTML(card(id)); }).join('') + '</div>' +
        '<button type="button" class="lb-btn wide key" data-a="back">返回</button>';
      var s = sheet(ss, html, 'extra');
      s.addEventListener('click', function (e) {
        var t = e.target.closest && e.target.closest('.lb-ct');
        if (t) { var id = t.getAttribute('data-cid'); closeSheet(s); takeCardWithDrop(ss, id, function (d) { return { type: 'takeExtra', cardId: id, dropId: d }; }).then(res); return; }
        if (e.target.closest && e.target.closest('[data-a=back]')) { closeSheet(s); res(null); }
      });
    });
  }

  // ======================================================================= map（§2.6、§6.6）
  var NODE_ICON = { prologue: '⚔️', fight: '⚔️', elite: '⚔️', boss: '👑', crate: '📦', listen: '🎧', event: '🗣️', rest: '☕' };
  var NODE_NAME = { prologue: '序章', fight: '客人', elite: '菁英', boss: '打烊前', crate: '挖箱', listen: '試聽機', event: '事件', rest: '櫃檯' };
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
  SCREENS.map = function () {
    var r = save.run;
    if (!r) return go('title');
    if (r.over) return go('end');
    if (E.nextStep(r) !== 'move') return resumeRun();
    var ss = buildStageScreen({ title: nightLabel(r), help: true, pause: true, crop: 'map', p: 'door', cls: 'map' });
    var curCol = r.map.cols.find(function (c) { return c.col === r.col; });
    // 下一欄的客人在門口排隊（剪影）
    if (curCol) {
      var k = 0;
      curCol.nodes.forEach(function (nd) { if (!nd.enemyId || k > 1) return; k++; ss.stage.put('q' + k, 'q' + k, enemySpr(C.enemies[nd.enemyId])); ss.stage.sil('q' + k, true); });
      if (k) { try { qs('.door', ss.stage.inner).src = '../art/shop2-door-2.png'; } catch (_) {} }
    }
    // 時間軸
    var cols = r.map.cols, n = cols.length;
    var tl = el('div', 'lb-tl');
    var g = '<div class="grid" style="grid-template-columns:repeat(' + n + ',1fr);grid-template-rows:18px 52px 52px 18px">';
    cols.forEach(function (c, i) { g += '<div class="tm key' + (c.col === r.col ? ' now' : '') + '" style="grid-column:' + (i + 1) + ';grid-row:1">' + esc(c.time) + '</div>'; });
    cols.forEach(function (c, i) {
      c.nodes.forEach(function (nd, j) {
        var went = r.visited.indexOf(nd.id) >= 0;
        var cls = 'lb-node key';
        if (c.col < r.col) cls += went ? ' done went' : ' past';
        else if (c.col === r.col) cls += ' can';
        else cls += ' locked';
        if (nd.type === 'elite') cls += ' elite';
        if (nd.type === 'boss') cls += ' boss';
        var row = c.nodes.length === 1 ? '2 / span 2' : String(2 + j);
        g += '<div class="cell" style="grid-column:' + (i + 1) + ';grid-row:' + row + '"><button type="button" class="' + cls + '" data-n="' + esc(nd.id) + '" aria-label="' + esc(c.time + ' ' + nodeLabel(nd)) + '">' +
          (went ? '✓' : nd.enemyId ? '<span class="face">' + sprHTML(enemySpr(C.enemies[nd.enemyId]), 40) + '</span>' : NODE_ICON[nd.type] || '？') + (nd.type === 'elite' && !went ? '<span class="mk">★</span>' : '') + '</button></div>';
      });
      g += '<div class="here key" style="grid-column:' + (i + 1) + ';grid-row:4">' + (c.col === r.col ? '▲ 下一站' : '') + '</div>';
    });
    g += '<svg class="wires" aria-hidden="true"></svg><span class="lb-me" aria-hidden="true">' + sprHTML(playerAv(), 26) + '</span></div>';
    tl.innerHTML = g;
    ss.scr.appendChild(tl);
    // 包包＋配件
    var bag = el('div', 'lb-bagbar');
    bag.innerHTML = '<button type="button" class="bag key" data-a="bag">包包 ' + r.deck.length + '／' + E.CFG.deckCap + '</button><span class="lab key">發燒配件' + (r.relics.length ? ' ' + r.relics.length : '') + '</span><div class="relics">' +
      (r.relics.length ? r.relics.map(function (id) { return '<button type="button" data-r="' + esc(id) + '" aria-label="' + esc(C.relics[id].name) + '" title="' + esc(C.relics[id].name) + '">' + relicIcon(id, 26) + '</button>'; }).join('') : '<span class="lab">（還沒有）</span>') + '</div>' +
      (r.nextStartQi ? '<span class="lab key">下一場氣勢 +' + r.nextStartQi + '</span>' : '');
    ss.scr.appendChild(bag);
    guardClicks(tl); guardClicks(bag);   // 從上一個畫面連點過來的第二下不算
    watchWires(tl, r);
    tl.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-n]'); if (!b || UI.going) return;
      sfx('tick'); previewNode(ss, r, E.findNode(r, b.getAttribute('data-n')));
    });
    bag.addEventListener('click', function (e) {
      if (UI.going) return;   // 走向下一站的路上：包包、配件都不開（就他了的第二下會落在這裡）
      if (e.target.closest && e.target.closest('[data-a=bag]')) { bagSheet(ss, r); return; }
      if (e.target.closest && e.target.closest('[data-r]')) relicSheet(ss, r);
    });
    autoAct(function () {
      var ch = E.routePolicy(save.run, C);
      if (ch && ch.type === 'move') { var nd = E.findNode(save.run, ch.nodeId); previewNode(ss, save.run, nd); autoAct(function () { var b = qs('.lb-sheet [data-a=go]', ss.scr); if (b) b.click(); }, 200); }
    }, 300);
  };
  // 路線：版面穩定之後才量（字型、預覽面板開關、轉向都會改格子大小），格子一變就重畫；線只畫在時間軸格子裡（svg 裁切）
  function watchWires(tl, r) {
    var grid = qs('.grid', tl); if (!grid) return;
    var t = 0, ro = null;
    var redraw = function () {
      if (t) return;
      t = requestAnimationFrame(function () {
        t = 0;
        if (!tl.isConnected) { if (ro) ro.disconnect(); return; }
        if (!grid.getBoundingClientRect().width) return;   // 預覽面板開著時時間軸收起來了，等它回來再量
        drawWires(tl, r);
        if (!UI.going) placeMe(tl, r);   // 走路動畫中不要把人拉回原位
      });
    };
    redraw();
    if (W.ResizeObserver) { ro = new ResizeObserver(redraw); ro.observe(grid); }
    else W.addEventListener('resize', redraw);
    try { if (D.fonts && D.fonts.ready) D.fonts.ready.then(redraw); } catch (_) {}
  }
  function drawWires(tl, r) {
    var svg = qs('svg.wires', tl), grid = qs('.grid', tl); if (!svg || !grid) return;
    var gr = grid.getBoundingClientRect(); if (!gr.width) return;
    svg.setAttribute('viewBox', '0 0 ' + gr.width.toFixed(1) + ' ' + gr.height.toFixed(1));
    var pos = {};
    qsa('[data-n]', grid).forEach(function (b) { var q = b.getBoundingClientRect(); pos[b.getAttribute('data-n')] = [q.left - gr.left + q.width / 2, q.top - gr.top + q.height / 2]; });
    var last = null;
    for (var k = r.visited.length - 1; k >= 0 && !last; k--) if (pos[r.visited[k]]) last = r.visited[k];
    var lines = { walked: '', next: '', ahead: '' };
    for (var i = 0; i + 1 < r.map.cols.length; i++) {
      var ca = r.map.cols[i], cb = r.map.cols[i + 1];
      ca.nodes.forEach(function (a) {
        cb.nodes.forEach(function (b) {
          var A = pos[a.id], B = pos[b.id]; if (!A || !B) return;
          var kind;
          if (r.visited.indexOf(a.id) >= 0 && r.visited.indexOf(b.id) >= 0) kind = 'walked';
          else if (a.id === last && cb.col === r.col) kind = 'next';        // 從你站的地方到下一站
          else if (ca.col >= r.col) kind = 'ahead';                          // 還沒走到的路
          else return;                                                        // 走過的欄位裡沒選的路：不畫
          lines[kind] += '<line x1="' + A[0].toFixed(1) + '" y1="' + A[1].toFixed(1) + '" x2="' + B[0].toFixed(1) + '" y2="' + B[1].toFixed(1) + '"/>';
        });
      });
    }
    svg.innerHTML = '<g class="ahead">' + lines.ahead + '</g><g class="walked">' + lines.walked + '</g><g class="next">' + lines.next + '</g>';
  }
  // 地圖上的你（§5.1-15）：站在最後走過的節點右下角；選了下一站就走過去（780 ms 一段）
  function nodeCenter(grid, id) {
    var b = id && qs('[data-n="' + id + '"]', grid); if (!b) return null;
    var gr = grid.getBoundingClientRect(), q = b.getBoundingClientRect();
    return [q.left - gr.left + q.width / 2, q.top - gr.top + q.height / 2];
  }
  function mePos(p) { return 'translate(' + Math.round(p[0] + 4) + 'px,' + Math.round(p[1] - 6) + 'px)'; }
  function placeMe(tl, r) {
    var grid = qs('.grid', tl), me = qs('.lb-me', tl); if (!grid || !me) return;
    var p = null;
    for (var i = r.visited.length - 1; i >= 0 && !p; i--) p = nodeCenter(grid, r.visited[i]);
    if (!p) { var cur = r.map.cols.find(function (c) { return c.col === r.col; }), a = cur && nodeCenter(grid, cur.nodes[0].id); p = a ? [a[0] - 40, a[1] + 26] : [0, 60]; }
    me.style.transform = mePos(p); me.classList.add('on');
  }
  function walkMe(ss, nd) {
    return new Promise(function (res) {
      var grid = qs('.lb-tl .grid', ss.scr), me = grid && qs('.lb-me', grid), to = grid && nodeCenter(grid, nd.id);
      if (!me || !to) return res();
      var f = FX(), rm = f && f.reducedMotion && f.reducedMotion();
      var from = me.style.transform || mePos(to), dest = mePos(to);
      me.classList.add('walk');
      if (rm || !me.animate) { me.style.transform = dest; return setTimeout(res, 150); }
      var dur = 780 / speed();
      var an = me.animate([{ transform: from }, { transform: dest }], { duration: dur, easing: 'ease-in-out', fill: 'forwards' });
      var done = false, fin = function () { if (done) return; done = true; me.style.transform = dest; res(); };
      an.onfinish = fin; setTimeout(fin, dur + 120);
    });
  }
  function previewNode(ss, r, nd) {
    if (!nd || UI.going) return;
    var pv = E.nodePreview(r, C, nd.id) || { node: nd };
    var can = !!pv.canMove;
    var past = nd.col < r.col;
    var html = '<div class="lb-pv">';
    if (pv.enemy) {
      var Em = pv.enemy;
      var glyphs = (pv.disc || Em.disc).map(function (g) {
        var real = g === 'hidden' ? (pv.hidden || 'hidden') : g;
        return '<span class="lb-glyph key' + (real === 'feint' ? ' feint' : '') + (real === 'hidden' ? ' hidden' : '') + (g === 'hidden' && real !== 'hidden' ? ' found' : '') + '" title="' + esc(real) + '">' + GLYPH[real] + '</span>';
      }).join('');
      var ult = pv.ults ? '氣勢 ' + pv.ultAt + '・<span class="lb-attr ' + pv.ultAttr + '">' + ZH[pv.ultAttr] + '</span>' + (pv.reflectable ? ' <span class="lb-gold-tag">王牌接得住</span>' : '') : '不輾壓';
      var stakeC = nd.stakeId && card(nd.stakeId);
      html += '<div class="who"><div class="face">' + sprHTML(enemySpr(Em), 48) + '</div><div><div class="nm key">' + esc(Em.name) + (nd.type === 'elite' ? ' <span class="lb-gold-tag">菁英</span>' : '') + '</div>' +
        '<div class="ti">' + esc((Em.title ? Em.title + '・' : '') + nd.time + '・' + NODE_NAME[nd.type]) + '</div></div></div>' +
        '<p class="blurb">' + esc(Em.blurb) + '</p>' +
        '<div class="ln"><span class="k">唱盤</span><span class="lb-glyphs">' + glyphs + '</span>' + (Em.disc.indexOf('hidden') >= 0 && !pv.hidden ? '<span class="lb-sub">？＝還沒看過的習慣</span>' : '') + '</div>' +
        '<div class="ln"><span class="k">聲望</span><b class="key">' + pv.hp + '</b><span class="k">輾壓</span><b class="key">' + ult + '</b></div>' +
        (stakeC ? '<div class="ln"><span class="k">押盤</span>' + sleeveHTML(stakeC, { size: 40, stars: false }) + starsHTML(stakeC, { long: true }) + (stakeC.tier ? '<span class="lb-sub">你沒選的王牌</span>' : '') + (stakeC.gold ? '<span class="lb-gold-tag">私藏</span>' : '') + '</div>' : '') +
        ((pv.requestLabel || pv.relic) ? '<div class="ln">' + (pv.requestLabel ? '<span class="k">點播</span><b class="key">' + esc(pv.requestLabel) + '</b>' : '') +
          (pv.relic ? '<span class="k">身上</span>' + relicIcon(pv.relic.id, 20) + '<b class="key">' + esc(pv.relic.name) + '</b>' + (pv.relicOwned ? '<span class="lb-sub">（已有）</span>' : '') : '') + '</div>' : '');
    } else {
      var ev = pv.event;
      html += '<div class="who"><div class="face" style="font-size:28px;align-items:center">' + (NODE_ICON[nd.type] || '？') + '</div><div><div class="nm key">' + esc(nodeLabel(nd)) + '</div><div class="ti">' + esc(nd.time + '・' + NODE_NAME[nd.type]) + '</div></div></div>' +
        '<p class="blurb">' + esc(ev ? ev.text : (NODE_DESC[nd.type] || '')) + '</p>' + (ev ? '<p class="lb-sub">選項的後果會先寫出來。</p>' : '');
    }
    html += '<div class="row" style="margin-top:4px">' +
      (can ? '<button type="button" class="lb-btn pri big key" data-a="go">' + (pv.enemy ? '就他了' : '就這個') + '</button>' : '<button type="button" class="lb-btn big key" disabled>' + (past ? '已經過了' : '還沒輪到') + '</button>') +
      '<button type="button" class="lb-btn big key" data-a="close">再看看</button></div></div>';
    var s = sheet(ss, html, 'preview');
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b) return;
      if (b.getAttribute('data-a') === 'close') { closeSheet(s); return; }
      if (b.getAttribute('data-a') === 'go' && can) { closeSheet(s); goNode(ss, nd); }
    });
  }
  function goNode(ss, nd) {
    var r = save.run;
    if (UI.going || !E.canMove(r, nd.id)) return;
    UI.going = true;   // 走過去的這一小段，別的節點都不能點（R7：不會同時開兩場）
    sfx('select');
    var walk = walkMe(ss, nd);
    if (nd.type === 'boss') { walk.then(function () { bossEnterFlow(nd); }); return; }
    if (nd.enemyId) {
      var en = C.enemies[nd.enemyId];
      ss.stage.show('q1', false); ss.stage.show('q2', false);
      ss.stage.door('swing'); ss.stage.put('f', 'in', enemySpr(en));
      stageSay('f', en.title ? en.title : en.name, null);
      walk.then(function () { if (UI.screen === 'map') startDuel(nd.id, { foeEl: ss.stage.actor('f') }); });
      return;
    }
    walk.then(function () {
      if (UI.screen !== 'map') return;
      var res = doChoose({ type: 'move', nodeId: nd.id });
      if (res.error) { UI.going = false; toast('現在不能過去'); return; }
      go('node');
    });
  }
  function bagSheet(ss, r) {
    var html = '<div class="hd"><h3 class="key">包包 ' + r.deck.length + '／' + E.CFG.deckCap + '</h3><span class="lb-sub">長按＝唱片資訊</span></div>' +
      '<div class="lb-pick">' + tileHTML(card(C.aces[r.aceTier]), { text: false }) + r.deck.map(function (id) { return tileHTML(cardM(id), { text: false }); }).join('') + '</div>' +
      '<button type="button" class="lb-btn wide key" data-a="close">關閉</button>';
    var s = sheet(ss, html, 'bag');
    s.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('.lb-ct'); if (t) { openInfo(cardM(t.getAttribute('data-cid'))); return; }
      if (e.target.closest && e.target.closest('[data-a=close]')) closeSheet(s);
    });
  }
  function relicSheet(ss, r) {
    var html = '<div class="hd"><h3 class="key">發燒配件</h3></div><div class="lb-opts">' + r.relics.map(function (id) {
      var x = C.relics[id];
      return '<div class="lb-btn big lb-relic" style="cursor:default"><span class="pix">' + relicIcon(id, 30) + '</span><span><span class="nm">' + esc(x.name) + '</span><br><span class="ds">' + esc(x.desc) + '</span></span></div>';
    }).join('') + '</div><button type="button" class="lb-btn wide key" data-a="close" style="margin-top:8px">關閉</button>';
    var s = sheet(ss, html, 'relics');
    s.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('[data-a=close]')) closeSheet(s); });
  }

  // ======================================================================= node（§3.9、§6.7）
  function dropRun() { save.run = null; persist(); go('title'); }   // 存檔裡的這一晚停在不認得的地方：丟掉，回標題（AP6）
  SCREENS.node = function () {
    var r = save.run, p = r && r.pending;
    if (!r) return go('title');
    if (!p) return go(r.over ? 'end' : 'map');
    if (p.type === 'duel' || p.type === 'reward') return resumeRun();
    if (p.type !== 'node') return dropRun();
    var node = E.findNode(r, p.nodeId);
    if (!node) return dropRun();
    var ss = buildStageScreen({ title: esc(node.time + ' ' + nodeLabel(node)), crop: 'map', p: 'browse', cls: 'node', help: true, pause: true });
    var fn = { crate: crateStep, crateCard: crateCardStep, listen: listenStep, listenKeep: listenKeepStep, event: eventStep, rest: restStep }[p.step];
    if (fn) fn(ss, r, p, node); else dropRun();
  };
  function nodeDone(ss, effects, line, lineWho) {
    var txt = effectsText(effects);
    if (line) stageSay(lineWho || 'o', line, 'hint');
    var s = sheet(ss, (txt ? '<p class="lb-result key">' + esc(txt) + '</p>' : '') + '<button type="button" class="lb-btn pri big wide key" data-a="next">繼續</button>', 'done');
    qs('[data-a=next]', s).addEventListener('click', function () { go('map'); });
    autoAct(function () { var b = qs('[data-a=next]', s); if (b) b.click(); });
  }
  function crateStep(ss, r, p) {
    ss.stage.put('p', [196, 446]); ss.stage.dig('p', true);
    var L = (C.pools && C.pools.crateLabels) || { jazz: '爵士區', tw: '台灣區', noise: '噪音區' };
    var s = sheet(ss, '<div class="hd"><h3 class="key">挖箱：挑一箱</h3><span class="lb-sub">翻出三張，帶走一張</span></div><div class="lb-crates">' +
      ['jazz', 'tw', 'noise'].map(function (k) { return '<button type="button" class="lb-crate key" data-k="' + k + '"><span class="lb-lbl">' + esc(L[k]) + '</span></button>'; }).join('') + '</div>', 'crate');
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-k]'); if (!b) return;
      sfx('flip');
      var res = doChoose({ type: 'crate', crate: b.getAttribute('data-k') });
      if (res.error) return;
      closeSheet(s); crateCardStep(ss, save.run, save.run.pending);
    });
    autoAct(function () { var ch = E.routePolicy(save.run, C); var b = ch && qs('[data-k="' + ch.crate + '"]', s); if (b) b.click(); });
  }
  function crateCardStep(ss, r, p) {
    ss.stage.dig('p', false);
    var L = (C.pools && C.pools.crateLabels) || {};
    if (p.goldId) { later(function () { stageSay('o', C.lines.owner.gold, 'hint'); sfx('seeThrough'); }, 200); }
    var s = sheet(ss, '<div class="hd"><h3 class="key">' + esc(L[p.crate] || '挖箱') + '</h3><span class="lb-sub">挑一張進包包</span></div><div class="lb-trio">' +
      p.cardIds.map(function (id) { return tileHTML(card(id)); }).join('') + '</div>' +
      (p.goldId ? '<p class="lb-result">老闆：「' + esc(C.lines.owner.gold) + '」</p>' : '') +
      '<button type="button" class="lb-btn wide key" data-a="none">都不要</button>', 'cratecard');
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
    autoAct(function () { var ch = E.routePolicy(save.run, C); var b = ch && ch.cardId ? qs('.lb-ct[data-cid="' + ch.cardId + '"]', s) : qs('[data-a=none]', s); if (b) b.click(); });
  }
  var LISTEN_MS = 15000;   // 試聽機只放 15 秒（SPEC §5.3）；放完可以點唱機再聽一次
  function listenStep(ss, r, p) {
    var f = FX(), ans = card(p.answerId);
    var muted = !(f && f.soundOn && f.soundOn() && ans && ans.previewUrl);
    ss.stage.notes(!muted);
    var s = sheet(ss, '<div class="lb-listen-head"><button type="button" class="lb-tt' + (muted ? '' : ' spin') + '" aria-label="再聽一次" disabled></button><div><b class="key">試聽機</b><div class="lb-sub msgl"></div></div></div>' +
      '<div class="lb-trio">' + p.cardIds.map(function (id) { return tileHTML(card(id), { stars: false }); }).join('') + '</div>', 'listen');
    var msg = qs('.msgl', s), tt = qs('.lb-tt', s), tok = 0, done = false;
    var spillHit = spillNote(E.CFG.listenHit), spillMute = spillNote(E.CFG.listenMuted);
    function stopMusic(ms) { if (f && f.music) try { f.music.stop({ fadeMs: ms }); } catch (_) {} }
    function setMuted() {
      muted = true; tok++; stopMusic(300);   // 沒聲音就真的沒聲音：前一首不會在底下繼續放（AP5）
      ss.stage.notes(false); tt.classList.remove('spin'); tt.disabled = true;
      msg.textContent = '（試聽機沒聲音。挑一張帶走，回 4 聲望。）' + (spillMute ? '（' + spillMute + '）' : '');
    }
    function ended() {
      ss.stage.notes(false); tt.classList.remove('spin'); tt.disabled = false;
      msg.textContent = '（放完了。點唱機再聽一次。）猜中回 6 聲望，猜錯回 3。' + (spillHit ? '（' + spillHit + '）' : '');
    }
    function playAns() {
      var my = ++tok, settled = false;
      tt.disabled = true; tt.classList.add('spin'); ss.stage.notes(true);
      msg.textContent = '♪ 正在放其中一張。猜中回 6 聲望，猜錯回 3。' + (spillHit ? '（' + spillHit + '）' : '');
      // exclusive：前一首立刻收掉（抓檔慢也不會墊在底下）；maxMs：15 秒淡出
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
      listenKeepStep(ss, save.run, save.run.pending, res);
    });
    autoAct(function () { var ch = E.routePolicy(save.run, C); var b = ch && ch.guessId ? qs('.lb-ct[data-cid="' + ch.guessId + '"]', s) : qs('.lb-ct', s); if (b) b.click(); }, 400);
  }
  function listenKeepStep(ss, r, p, res) {
    var result = p.result, keepId = p.keepId, ans = card(p.answerId);
    var line = result === 'hit' ? C.lines.owner.listenRight : result === 'miss' ? C.lines.owner.listenWrong : '';
    if (line) stageSay('o', line, 'hint');
    sfx(result === 'hit' ? 'readHit' : result === 'miss' ? 'tick' : 'select');
    var head = result === 'hit' ? '猜中了！' : result === 'miss' ? '不是這張。' : '你挑了這張。';
    var gain = res ? effectsText(res.effects) : '';
    var html = '<div class="hd"><h3 class="key">' + esc(head) + '</h3></div>' + (gain ? '<p class="lb-result key">' + esc(gain) + '</p>' : '') +
      '<div class="lb-flip"><div style="width:96px;flex:none">' + coverHTML(keepId ? card(keepId) : ans, { size: 96 }) + '</div><div class="meta"><div class="ar">' + esc((keepId ? card(keepId) : ans).artist) + '</div><div class="al">' + esc((keepId ? card(keepId) : ans).album) + '</div>' + starsHTML(keepId ? card(keepId) : ans, { long: true }) + '</div></div>' +
      '<div class="row">' + (keepId ? '<button type="button" class="lb-btn pri big key" data-a="keep">收進包包</button><button type="button" class="lb-btn big key" data-a="no">不用了</button>' : '<button type="button" class="lb-btn pri big wide key" data-a="no">繼續</button>') + '</div>';
    var s = sheet(ss, html, 'listenkeep');
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b) return;
      if (b.getAttribute('data-a') === 'keep') {
        closeSheet(s);
        takeCardWithDrop(ss, keepId, function (d) { return { type: 'listenKeep', keep: true, dropId: d }; }).then(function (r2) {
          if (!r2) return listenKeepStep(ss, save.run, save.run.pending, res);
          toast(effectsText(r2.effects)); go('map');
        });
      } else { closeSheet(s); doChoose({ type: 'listenKeep', keep: false }); go('map'); }
    });
    autoAct(function () { var ch = E.routePolicy(save.run, C); var b = qs(ch && ch.keep ? '[data-a=keep]' : '[data-a=no]', s); if (b) b.click(); }, 300);
  }
  function eventStep(ss, r, p) {
    var ev = C.events.find(function (x) { return x.id === p.eventId; });
    if (!ev) return go('map');
    ss.stage.door('swing');
    var me = JSON.stringify(playerAv());
    var vpool = (C.avatarsFallback || []).filter(function (av) { return JSON.stringify(av) !== me; });
    ss.stage.put('f', 'visit', vpool[E.fnv1a32(ev.id) % Math.max(1, vpool.length)] || 'e1');   // 訪客不會跟你撞衫（UX-11）
    var cap = E.CFG.deckCap, minD = E.CFG.deckMin;
    function disabled(o) {
      var fx = o.effects || [];
      if (o.minDeck && r.deck.length < o.minDeck) return true;
      if (fx.some(function (f) { return f.giveAwayPicked; }) && r.deck.length - 1 < minD) return true;
      var up = fx.find(function (f) { return f.starUpPicked; });
      if (up && !r.deck.some(function (id) { var c = cardM(id); return c && (c[up.starUpPicked] || 0) < E.CFG.starCap; })) return true;
      return false;
    }
    var html = '<div class="hd"><h3 class="key">' + esc(ev.title) + '</h3></div><p class="lb-event-text">' + esc(ev.text) + '</p><div class="lb-opts">' +
      ev.options.map(function (o, i) {
        var gid = p.eventCards && p.eventCards[i];
        var gc = gid && card(gid);
        return '<button type="button" class="lb-btn two big key" data-i="' + i + '"' + (disabled(o) ? ' disabled' : '') + '>' +
          (gc ? '<span style="display:flex;gap:8px;align-items:center;width:100%"><span style="flex:none">' + coverHTML(gc, { size: 44 }) + '</span><span style="flex:1;min-width:0">' : '') +
          esc(o.label) + '<span class="sub">' + esc(o.note || '') + (gc ? '：' + esc(gc.artist) + '《' + esc(gc.album) + '》' : '') + '</span>' + (gc ? '</span></span>' : '') + '</button>';
      }).join('') + '</div>';
    var s = sheet(ss, html, 'event');
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
          var s2 = sheet(ss, '<div class="hd"><h3 class="key">' + esc(ev.title) + '</h3></div><p class="lb-result key">' + esc(o.result || '') + '</p>' +
            (effectsText(res.effects) ? '<p class="msg">' + esc(effectsText(res.effects)) + '</p>' : '') + '<button type="button" class="lb-btn pri big wide key" data-a="next">繼續</button>', 'eventdone');
          qs('[data-a=next]', s2).addEventListener('click', function () { go('map'); });
          autoAct(function () { var nb = qs('[data-a=next]', s2); if (nb) nb.click(); });
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
    ss.stage.put('p', 'pay');
    var s = sheet(ss, '<div class="hd"><h3 class="key">櫃檯</h3><span class="lb-sub">老闆把茶推過來</span></div><div class="lb-opts">' +
      '<button type="button" class="lb-btn two big pri key" data-a="tea">喝杯茶<span class="sub">回 ' + E.CFG.teaHp + ' 聲望（現在 ' + r.hp + '／' + r.maxHp + '）' + (spillNote(E.CFG.teaHp) ? '・' + spillNote(E.CFG.teaHp) : '') + '</span></button>' +
      '<button type="button" class="lb-btn two big key" data-a="wash">洗一張盤<span class="sub">包包裡一張盤的最高軸 +1（上限 5，盤上標「洗過」）</span></button></div>', 'rest');
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b) return;
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

  // ======================================================================= end（§2.7、§6.8）
  function bannerText(cl, rv) {
    if (!cl) return '（還沒出手就倒下了）';
    var fmt = W.DipLabDuel && W.DipLabDuel._fmt && W.DipLabDuel._fmt.banner;
    if (typeof fmt === 'function') {   // 跟對決畫面的橫幅同一支函式：原樣重現
      try {
        // 只有那一手真的翻開「？」才寫 🔍 發現；跟／報的說明要用他看到的「你上一手」（R8）
        var b0 = fmt(cl, { habit: rv && rv.hiddenCell && rv.found && rv.glyph ? { glyph: rv.glyph } : null, prevLast: (rv && rv.prevLast) || null, relics: (save.run && save.run.relics) || [] });
        if (b0 && b0.text) return (b0.found ? b0.found + '。' : '') + b0.text;
      } catch (e) { console.error(e); }
    }
    var pre = (rv && rv.hiddenCell && rv.found && rv.glyph) ? '🔍 發現：他有「' + (GLYPH[rv.glyph] || '？') + '」。' : '';
    var bd = cl.breakdown || [];
    var term = function (t, first) {
      if (t.k === 'def' && t.note === '擋住星差') return '（' + t.label + (t.star != null ? t.star : '') + ' 擋住星差）';
      var raw = (t.k === 'atk' || t.k === 'def' || t.k === 'mirrorP' || t.k === 'mirrorE') ? (t.k === 'atk' ? Math.abs(t.v) : (t.star != null ? t.star : Math.abs(t.v))) : Math.abs(t.v);
      var tight = t.k === 'atk' || t.k === 'def' || t.k === 'K' || t.k.indexOf('mirror') === 0;
      return (first ? '' : (t.v < 0 ? '−' : '＋')) + t.label + (tight ? '' : ' ') + raw;
    };
    var ordered = bd.filter(function (t) { return t.k === 'atk'; }).concat(bd.filter(function (t) { return t.k === 'def'; }), bd.filter(function (t) { return t.k === 'K'; }), bd.filter(function (t) { return ['atk', 'def', 'K'].indexOf(t.k) < 0; }));
    var calc = ordered.map(function (t, i) { return term(t, i === 0); }).join('');
    var tot = cl.toP || cl.toE || 0;
    switch (cl.kind) {
      case 'countered':
        if (cl.stamp === 'feintHit') return pre + '虛晃！他喊' + ZH[cl.bubble] + '，出的是' + ZH[cl.eAttr] + '：' + calc + '＝' + cl.toP;
        return pre + '被剋！' + (cl.counterName || '') + ' ' + calc + '＝' + cl.toP;
      case 'counter': return pre + (cl.stamp === 'seeThrough' ? '看穿！' : '讀中！') + (cl.counterName || '') + ' ' + calc + '＝' + cl.toE;
      case 'mirrorLose': return pre + '撞招：' + calc + '＝' + cl.toP;
      case 'mirrorWin': return pre + '撞招：' + calc + '＝' + cl.toE;
      case 'tie': return pre + '撞招平手：' + calc;
      case 'eultHit': return pre + '殺氣騰騰：他的品味輾壓，吃下 ' + cl.toP;
      case 'block': return pre + '割捨防禦：' + ZH[cl.pAttr] + ' 擋下，吃 ' + cl.toP;
      case 'trade': return pre + '對轟：你打 ' + cl.toE + '，吃 ' + cl.toP;
      case 'hegemonyE': case 'hegemonyP': return pre + '霸權：王牌被剋，這手互不傷害';
      case 'reflect': return pre + '七星回擊！' + cl.toE;
      case 'ult': return pre + '品味輾壓 ' + cl.toE;
    }
    return pre + calc + '＝' + tot;
  }
  SCREENS.end = function () {
    var r = save.run;
    if (!r || !r.over) return go('title');
    recordNight(r);   // 平常在對決結束那一刻就記過了；舊存檔才會走到這裡
    var sc = E.scoreRun(r);
    var clear = r.over === 'clear', la = r.stats.lostAt;
    var a = app();
    a.appendChild(topBar(nightLabel(r), {}));
    var scr = el('div', 'lb-scr scroll end');
    var lostEnemy = la && C.enemies[la.enemyId];
    var sub = clear ? '02:00 打烊・' + r.stats.wins + ' 勝' : '走到 ' + (la ? la.time + '・' + (lostEnemy ? lostEnemy.name : '') + '・第 ' + la.hand + ' 手' : '');
    var newBest = sc.total > (r.bestBefore || 0);
    var met = r.stats.metIds || [], fresh = r.stats.newMetIds || [];
    var h = '<div class="lb-pad"><div class="lb-endhero"><div class="pic">' + (clear ? sprHTML(playerAv(), 64) : pix(labSpr().brokenrec, 64)) + '</div><div><div class="lb-h1 key">' + (clear ? '打烊了' : '今晚就到這') + '</div><p class="lb-sub key">' + esc(sub) + '</p></div></div>';
    if (!clear) h += '<div class="lb-lost"><div class="k">輸在這一手</div><div class="b key">' + esc(bannerText(la && la.clash, la && la.reveal)) + '</div>' + (r.lostShort ? '<div class="s key">他還剩 ' + r.lostShort + ' 聲望' + (r.lostShort <= 5 ? '，差一點就贏了' : '') + '</div>' : '') + '</div>';
    h += '<div class="lb-h2">品味分數</div><div class="lb-bigscore key">' + sc.total + (newBest ? '<small>今天最佳</small>' : '') + '</div><table class="lb-parts">' +
      sc.parts.map(function (p) { return '<tr><td>' + esc(p[0]) + '</td><td>' + p[1] + '</td></tr>'; }).join('') + '<tr class="tot"><td>合計</td><td>' + sc.total + '</td></tr></table>';
    h += '<div class="lb-stats"><div><b>' + r.stats.seeThrough + '</b>看穿</div><div><b>' + r.stats.readHit + '</b>讀中</div><div><b>' + r.stats.reflect + '</b>七星回擊</div><div><b>' + r.stats.found + '</b>🔍發現</div></div>';
    h += '<div class="lb-h2">今晚認識的盤 <small>' + met.length + ' 張・NEW ' + fresh.length + '</small></div>' +
      (met.length ? '<div class="lb-wall flipin">' + met.map(function (id, i) { return tileHTML(card(id), { text: false, isNew: fresh.indexOf(id) >= 0, extra: '', data: 'style="animation-delay:' + (i * 70) + 'ms"' }); }).join('') + '</div>' : '<p class="lb-sub">今晚還沒帶走任何一張。</p>');
    // 下一夜要追什麼：唱片櫃進度＋圖鑑還缺的（FUN-14）
    var shc = shelfCount(), pct = shc.total ? Math.round(shc.n / shc.total * 100) : 0;
    var ORDER = ['man', 'copycat', 'already', 'needle', 'skip', 'broke', 'buyer', 'label', 'critic', 'boss'];
    var unmet = ORDER.filter(function (id) { return !(save.book[id] && save.book[id].met); }).length;
    var unknownHab = ORDER.filter(function (id) { var Em = C.enemies[id], b = save.book[id]; return b && b.met && Em && Em.hidden && Em.disc.indexOf('hidden') >= 0 && (b.habits || []).indexOf(Em.hidden) < 0; }).length;
    var goal = unmet ? '讀人圖鑑：還有 ' + unmet + ' 位客人沒見過' : unknownHab ? '讀人圖鑑：還有 ' + unknownHab + ' 位客人的「？」沒翻開' : '讀人圖鑑全開了。下一個目標：今天最佳分數';
    h += '<div class="lb-goal"><div class="row"><b>唱片櫃 已認識 ' + shc.n + '／' + shc.total + '</b><span>' + pct + '%</span></div><div class="bar"><i style="width:' + pct + '%"></i></div>' +
      '<p class="lb-sub key">' + esc(goal) + '。再來一夜，客人和箱子都會換一批。</p></div>';
    if (save.unlocks.secondNightTeaser) h += '<div class="lb-teaser"><div class="sil">' + pix(labSpr().e7, 48) + '</div><div><b>' + esc(C.secondNight.line) + '</b><div class="lb-sub">' + esc(C.secondNight.label) + '</div></div></div>';
    h += '<div class="lb-endbtns"><button type="button" class="lb-btn pri big wide key" data-a="again">再來一夜</button><div class="row"><button type="button" class="lb-btn key" data-a="shelf">唱片櫃</button><button type="button" class="lb-btn key" data-a="book">讀人圖鑑</button></div>' +
      '<button type="button" class="lb-btn ghost key" data-a="title">回標題</button></div></div>';
    scr.innerHTML = h; a.appendChild(scr);
    bindLongPress(scr);
    sfx(clear ? 'win' : 'lose');
    scr.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('.lb-ct'); if (t) { openInfo(card(t.getAttribute('data-cid'))); return; }
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b) return;
      var act = b.getAttribute('data-a');
      if (act === 'again') {
        var f = FX(); if (f && save.settings.sound && !f.soundOn()) try { f.unlockFromGesture(true); } catch (_) {}
        startAgain();
      } else if (act === 'shelf') go('shelf', { back: 'end' });
      else if (act === 'book') go('book', { back: 'end' });
      else go('title');
    });
    if (UI.auto && UI.auto.until === 'end') UI.auto = null;
  };

  // ======================================================================= shelf／book（§6.8）
  function goBack(b) { if (b === 'resume') resumeRun(); else go(b || 'title'); }
  SCREENS.shelf = function (p) {
    var a = app(), total = Object.keys(C.cards).length;
    var ids = Object.keys(save.shelf).filter(card).reverse();
    var filter = p.filter || 'all';
    var shown = ids.filter(function (id) { return filter === 'new' ? save.shelf[id].isNew : filter === 'ace' ? !!card(id).tier : true; });
    a.appendChild(topBar('唱片櫃 <small>已認識 ' + ids.length + '／' + total + '</small>', { close: function () { ids.forEach(function (id) { save.shelf[id].isNew = false; }); persist(); goBack(p.back); } }));
    var scr = el('div', 'lb-scr scroll shelf');
    scr.innerHTML = '<div class="lb-pad"><div class="lb-filters">' + [['all', '全部'], ['new', 'NEW'], ['ace', '王牌']].map(function (f) { return '<button type="button" class="lb-btn key' + (filter === f[0] ? ' on' : '') + '" data-f="' + f[0] + '">' + f[1] + '</button>'; }).join('') + '</div>' +
      (shown.length ? '<div class="lb-wall">' + shown.map(function (id) { return tileHTML(card(id), { text: false, isNew: save.shelf[id].isNew }); }).join('') + '</div>' : '<p class="lb-sub">' + (ids.length ? '這一格是空的。' : '還沒認識任何一張。推門進去吧。') + '</p>') +
      '<p class="lb-sub" style="margin-top:14px">點封面＝唱片資訊。贏了客人押的盤、挖箱、試聽機猜中，都會收進這裡。</p></div>';
    a.appendChild(scr);
    scr.addEventListener('click', function (e) {
      var f = e.target.closest && e.target.closest('[data-f]'); if (f) { go('shelf', { back: p.back, filter: f.getAttribute('data-f') }); return; }
      var t = e.target.closest && e.target.closest('.lb-ct'); if (t) openInfo(card(t.getAttribute('data-cid')));
    });
  };
  SCREENS.book = function (p) {
    var a = app();
    var order0 = ['man', 'copycat', 'already', 'needle', 'skip', 'broke', 'buyer', 'label', 'critic', 'boss'];
    var isMet = function (id) { return !!(save.book[id] && save.book[id].met); };
    var order = order0.filter(isMet).concat(order0.filter(function (id) { return !isMet(id); }));   // 見過的排前面（UX-30）
    var met = order0.filter(isMet).length;
    a.appendChild(topBar('讀人圖鑑 <small>' + met + '／' + order.length + '</small>', { close: function () { goBack(p.back); } }));
    var scr = el('div', 'lb-scr scroll book');
    var h = '<div class="lb-pad"><div class="lb-book">' + order.map(function (id) {
      var Em = C.enemies[id], b = save.book[id];
      if (!b || !b.met) return '<div class="lb-bk unmet"><div class="pic">' + sprHTML(enemySpr(Em), 32) + '</div><div><div class="nm">？？？</div><div class="ti">' + (Em.elite ? '菁英' : Em.boss ? '打烊前' : '還沒見過') + '</div></div></div>';
      var habits = b.habits || [];
      var disc = Em.disc.map(function (g) { var real = g === 'hidden' ? (habits.indexOf(Em.hidden) >= 0 ? Em.hidden : 'hidden') : g; return '<span class="lb-glyph' + (real === 'feint' ? ' feint' : '') + (real === 'hidden' ? ' hidden' : '') + (g === 'hidden' && real !== 'hidden' ? ' found' : '') + '">' + GLYPH[real] + '</span>'; }).join('');
      return '<div class="lb-bk">' + (Em.elite ? '<span class="star">★</span>' : '') + '<div class="pic">' + sprHTML(enemySpr(Em), 48) + '</div><div class="nm">' + esc(Em.name) + '</div>' +
        (Em.title ? '<div class="ti">' + esc(Em.title) + '</div>' : '') + '<div class="bl">' + esc(Em.blurb) + '</div><div class="lb-glyphs">' + disc + '</div>' +
        (habits.length ? '<div class="bl">🔍 已發現：' + habits.map(function (g) { return '<b>' + GLYPH[g] + '</b>'; }).join('、') + '（下一夜直接攤開）</div>' : '') +
        '<div class="wl">勝 ' + (b.beaten || 0) + '・敗 ' + (b.lost || 0) + '</div></div>';
    }).join('');
    if (save.unlocks.secondNightTeaser) h += '<div class="lb-bk unmet"><div class="pic">' + pix(labSpr().e7, 48) + '</div><div class="nm">' + esc(C.secondNight.name) + '</div><div class="ti">' + esc(C.secondNight.title) + '</div><div class="bl">' + esc(C.secondNight.label) + '</div></div>';
    h += '</div><p class="lb-sub" style="margin-top:14px">沒見過的客人是剪影。唱盤上的「？」被你發現過，下一夜就直接攤開。</p></div>';
    scr.innerHTML = h; a.appendChild(scr);
  };

  // ======================================================================= scene 路由
  SCREENS.scene = function (p) {
    var sc = buildScene(p);
    if (p.start) { try { p.start(sc); } catch (e) { console.error(e); } }
  };

  // ======================================================================= 暫代對決（duel.js 不在時才用；有 DipLabDuel 就不會走到這裡）
  function stubDuel(wrap, opts) {
    var d = opts.duel, done = false;
    var stripHost = el('div'); stripHost.style.cssText = 'position:relative;height:150px;flex:none;overflow:hidden';
    var body = el('div', 'lb-pad');
    wrap.appendChild(topBar('對決（暫代版）', { sound: false, pause: true }));
    wrap.appendChild(stripHost); wrap.appendChild(body);
    try { var st = opts.hooks.stage(stripHost, 'duel'); st.put('p', 'duel'); st.put('f', 'duel'); } catch (e) { console.error(e); }
    function render() {
      var v = E.view(d);
      body.innerHTML = '<p class="key"><b>' + esc(v.e.name) + '</b> 聲望 ' + v.e.hp + '／' + v.e.maxHp + '・氣勢 ' + v.e.qi + '</p><p class="key">你 聲望 ' + v.p.hp + '／' + v.p.maxHp + '・氣勢 ' + v.p.qi + '・第 ' + v.hand + ' 手・賭注 ×' + v.K + '</p>' +
        '<div class="lb-opts"><button type="button" class="lb-btn big key" data-a="one">出一手（期望值）</button><button type="button" class="lb-btn pri big key" data-a="all">打完這場</button></div>';
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
      duel: function () { return save.run && save.run.duel ? E.view(save.run.duel) : null; },
      rawDuel: function () { return save.run && save.run.duel; },
      screen: function () { return UI.screen; },
      trail: function () { return UI.trail.slice(); },
      autoplay: function (policy, o) { o = o || {}; UI.auto = { policy: policy || 'ev', until: o.until || 'duelEnd', animated: !!o.animated }; kick(); return true; },
      stop: function () { UI.auto = null; },
      seed: function (n) { UI.seedOverride = String(n); return seedKey(); },
      skipTo: function (col) {
        var r = save.run; if (!r) return false;
        r.duel = null; r.pending = null; r.col = col; persist(); go('map'); return true;
      },
      forceLose: function () {
        var r = save.run, d = r && r.duel; if (!d) return false;
        d.p.hp = 0; d.over = 'lose'; persist();
        if (W.DipLabDuel && W.DipLabDuel.unmount) try { W.DipLabDuel.unmount(); } catch (_) {}
        onDuelEnd(d); return true;
      },
      go: go
    };
  }

  // ======================================================================= boot
  function boot() {
    if (UI.booted) return; UI.booted = true;
    E = W.DipLabEngine; C = W.DipLabContent;
    if (!E || !C || !app()) { if (app()) app().innerHTML = '<div class="lb-boot">載入失敗，請重新整理。</div>'; return; }
    save = loadSave();
    var f = FX();
    if (f) { try { if (f.init) f.init(); if (f.setSpeed) f.setSpeed(speed()); } catch (e) { console.error(e); } }
    if (f && f.music && f.music.onChange) f.music.onChange(function (c) { if (c && f.soundOn && f.soundOn() && save.shelf[c.id] && !save.shelf[c.id].heard) { save.shelf[c.id].heard = true; } });
    // 對決以外（地圖、節點、獎勵、場景）：一首試聽自然放完就接下一首，不留長長的空白（對決畫面 duel.js 自己接）
    if (f && f.music && f.music.onEnded) f.music.onEnded(function (c) {
      if (!c || UI.screen === 'duel' || !(f.soundOn && f.soundOn())) return;
      if (UI.screen === 'node' && qs('.lb-sheet.listen')) return;   // 試聽機在出題：不自己換歌
      var next = c, r = save.run;
      if (r && (UI.screen === 'map' || UI.screen === 'node' || UI.screen === 'reward')) {
        var pool = (r.deck || []).map(cardM).filter(function (x) { return x && x.previewUrl && x.id !== c.id; });
        if (pool.length) next = pickR(pool);
      }
      setTimeout(function () { if (UI.screen !== 'duel' && f.soundOn()) try { f.music.play(next, { fadeMs: 1200 }); } catch (e) { console.error(e); } }, 400);
    });
    labSpr();
    if (DEBUG) installDebug();
    go('title');
  }
  W.DipLabUI = { boot: boot, go: go, Stage: Stage, openInfo: openInfo, openHelp: openHelp, openSettings: openSettings,
    sprite: sprHTML, relicIcon: relicIcon, bannerText: bannerText, get save() { return save; } };
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot); else setTimeout(boot, 0);
})();
