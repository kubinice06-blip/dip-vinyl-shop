/* game-lab/ui.js：品味對決 v3：外殼與所有非對決畫面（Agent U）。SPEC-v3 §9、§10.5＋主線補充（發燒配件保留、店內熱點有意義）。
 *
 * 版面：#app ＝ #top（32px 頂欄）＋ #stage（常駐像素店舞台，整個 session 只 mount 一次）＋ #panel（每個畫面的面板）。
 *   go(screen) 只做三件事：換 #top、stage.camera(鏡頭)＋擺小人、換 #panel。舞台不重建，所以門、雨、正在放的唱片、店裡的人都連續。
 * 一晚（SPEC-v3 §9）：標題（像素店）→ 序章劇本（店主定稿句）→ 猜歌／挑王牌 → 教學對決 → 收尾（掉出來的盤、發燒配件三選一）
 *   → 今晚來客（一條，五顆頭像，不分岔）→ 對決（無縫推近；黑條只蓋在舞台上）→ 贏了挑他一張唱片（菁英／藏家：唱片或配件）
 *   → 下一位 → 傳說藏家 → 打烊（走到幾點、贏了幾位、收了哪幾張）→ 再來一夜。每晚一次老闆說情（輸了重打同一位）。
 * 對決交給 duel.js（DipLabDuel.mount 在 #panel 裡）；規則全在 engine.js（newRun／startFight／finishFight／choose）。
 * 唱片資訊：cardinfo.js（DipLabCardInfo.open）。畫面上每一張封面點一下就開。
 * 規則：
 *  - 只寫 localStorage 'dipGameLab_v1'（存檔版本 3；舊版存檔安全丟掉）；不用 Firebase；不 DipPlayer.mount。
 *  - 整支包在 IIFE 裡，只掛 window.DipLabUI（＋?debug=1 的 window.__lab）。
 *  - UI 不算傷害、不讀 intent：所有數字都來自 DipLabEngine。
 *  - 浮層（泡泡、章、飛卡、吐司、標題牌）pointer-events:none；只有面板、彈窗、教學遮罩、藏家登場卡吃點擊。
 */
(function () {
  'use strict';
  var W = window, D = document;
  var E = null, C = null;
  var KEY = 'dipGameLab_v1';
  var SAVE_V = 3;                                   // v2 是 1；v3 規則全換，舊存檔一律丟掉（只留聲音偏好與小人）
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
  function dateLabel(k) { var m = /^(\d{4})-?(\d{2})-?(\d{2})$/.exec(String(k || '')); return m ? m[2] + '/' + m[3] : String(k || ''); }
  function nightLabel(run) { return run ? esc(dateLabel(run.seedKey)) + ' 的雨夜<small>#' + run.nightNo + '</small>' : esc(dateLabel(seedKey())) + ' 的雨夜'; }
  function fill(s, o) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return o && o[k] != null ? o[k] : m; }); }
  function dt(k, o) { var T = (C && C.duelText) || {}; return fill(T[k] || '', o); }
  // 經典／冷門／硬蕊 三個字上屬性色（esc 之後再換）
  function colorZh(s) { return esc(s).replace(/經典|冷門|硬蕊/g, function (w) { var a = w === '經典' ? 'c' : w === '冷門' ? 'o' : 'h'; return '<b class="' + a + '">' + w + '</b>'; }); }

  // ======================================================================= 存檔
  var save = null;
  function defSave() {
    return { v: SAVE_V, seen: {}, learned: {}, settings: { fastAnim: false, sound: null }, player: null, run: null, nights: [],
      best: { clears: 0, bySeedKey: {} }, shelf: {}, relics: [], unlocks: { secondNightTeaser: false },
      tutorialDone: false, prologueDone: false, lastAce: null };
  }
  function validRun(r) {
    try {
      if (!r || typeof r !== 'object' || r.v !== 3) return false;
      if (!Array.isArray(r.bag) || !Array.isArray(r.order) || !r.order.length || !Array.isArray(r.relics) || !r.stats || TIERS.indexOf(r.ace) < 0) return false;
      if (r.order.some(function (id) { return !C.enemies[id]; })) return false;
      if (r.bag.some(function (id) { return !card(id); })) return false;
      var p = r.pending;
      if (p && !/^(reward|retry)$/.test(p.type)) return false;
      if (p && p.type === 'reward' && (!Array.isArray(p.cards) || !Array.isArray(p.relics))) return false;
      if (r.duel && (!r.duel.e || !r.duel.p)) return false;
      if (!r.over && !E.nextStep(r)) return false;
      return true;
    } catch (_) { return false; }
  }
  function loadSave() {
    var s = null;
    try { var raw = W.localStorage.getItem(KEY); if (raw) s = JSON.parse(raw); } catch (_) { s = null; }
    var d = defSave();
    if (s && typeof s === 'object' && typeof s.v === 'number' && s.v > SAVE_V) { UI.saveReadOnly = true; return d; }   // 比這版新：不覆寫
    if (!s || typeof s !== 'object' || s.v !== SAVE_V) {
      // 舊版（v1／v2 的 v:1）：規則與資料形狀都不一樣，整份丟掉；只帶走聲音偏好與小人（不是遊戲狀態）
      if (s && typeof s === 'object') {
        try { if (s.settings && typeof s.settings.sound === 'boolean') d.settings.sound = s.settings.sound; } catch (_) {}
        try { if (s.player && s.player.avatar && typeof s.player.avatar === 'object') d.player = { name: '你', avatar: s.player.avatar }; } catch (_) {}
        UI.discardedOld = true;
      }
      return d;
    }
    for (var k in d) if (s[k] == null || typeof s[k] !== typeof d[k]) s[k] = d[k];
    s.settings = Object.assign({}, d.settings, s.settings || {});
    s.best = Object.assign({}, d.best, s.best || {});
    if (!s.best.bySeedKey || typeof s.best.bySeedKey !== 'object') s.best.bySeedKey = {};
    s.unlocks = Object.assign({}, d.unlocks, s.unlocks || {});
    if (!Array.isArray(s.nights)) s.nights = [];
    if (!Array.isArray(s.relics)) s.relics = [];
    s.relics = s.relics.filter(function (id) { return C.relics && C.relics[id]; }).slice(0, 3);
    if (s.run && !validRun(s.run)) s.run = null;
    return s;
  }
  function persist() {
    if (UI.saveReadOnly || UI.noSave) return;
    try { W.localStorage.setItem(KEY, JSON.stringify(save)); } catch (_) { /* 寫不進去不影響遊戲 */ }
  }
  // 唱片櫃：at＝哪一晚第一次認識；seen＝打開唱片櫃看過了沒（NEW 只標「今晚新認識、還沒看過」的，ART-17）
  function nightTag(r) { r = r || save.run; return r ? r.seedKey + '#' + r.nightNo : seedKey(); }
  function shelfAdd(id) {
    if (!id || !card(id) || save.shelf[id]) return false;
    save.shelf[id] = { at: nightTag(), seen: false };
    return true;
  }
  function isNewOnShelf(id) { var s = save.shelf[id]; return !!(s && !s.seen && s.at === nightTag()); }

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
  // 發燒配件圖示（roguelike.html PIX_ICONS_LV[icon][0]；只留 v3 的六件）
  var LAB_ICONS = {
    stylus: ['............', '.........kk.', '........kk..', '.......kk...', '......kk....', '.....kk.....', '....kk......', '...kk.......', '..kk........', '.kkk........', '.kkd........', '............'],
    dustcover: ['............', '..dddddddd..', '.d........d.', '.d.kkkkkk.d.', '.d.k....k.d.', '.d.kkkkkk.d.', '.d........d.', '.dddddddddd.', '.kkkkkkkkkk.', '............', '............', '............'],
    testpress: ['............', '...kkkkkk...', '..kkkkkkkk..', '.kkkwwwwkkk.', '.kkwwwwwwkk.', '.kkwwwwwwkk.', '.kkwwwwwwkk.', '.kkwwwwwwkk.', '.kkwwwwwwkk.', '.kkkwwwwkkk.', '..kkkkkkkk..', '...kkkkkk...'],
    cleaner: ['....kkk.....', '...kkkkk....', '...kk.......', '...kkkk.....', '...kwwk.....', '..kwwwwk....', '..kwwwwk....', '..kwwwwk....', '..kwbbwk....', '..kwbbwk....', '..kkkkkk....', '............'],
    obi: ['....kkkk....', '....kwwk....', '....kwwk....', '....kwwk....', '....kkwk....', '....kwwk....', '....kwkk....', '....kwwk....', '....kkwk....', '....kwwk....', '....kkkk....', '............'],
    headphone: ['............', '....kkkk....', '...kk..kk...', '..kk....kk..', '..k......k..', '..k......k..', '.kkk....kkk.', '.kkk....kkk.', '.kkk....kkk.', '.kkk....kkk.', '............', '............']
  };
  function pix(rows, size, cls) { return (typeof W.pixArtHTML === 'function' && rows) ? W.pixArtHTML(rows, size, cls) : ''; }
  function relicOf(id) { return (C && C.relics && C.relics[id]) || null; }
  function relicIcon(id, size) {
    var r = relicOf(id); var rows = r && LAB_ICONS[r.icon];
    var h = rows ? pix(rows, size || 24) : '';
    return h || '<span class="lb-ri">' + esc((r && r.name || '?').slice(0, 1)) + '</span>';
  }
  function sprRowsOf(key) {
    if (key && typeof key === 'object') return (typeof W.avatarRows === 'function') ? W.avatarRows(key) : null;
    var S = labSpr(); return S[key] || S.e0;
  }
  function sprHTML(key, size) { var rows = sprRowsOf(key); return rows ? pix(rows, size || 96) : ''; }
  function headHTML(key, size) { var rows = sprRowsOf(key); return rows ? pix(rows.slice(0, 10), size || 30) : ''; }   // 頭＋肩
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
  function cam(name, screen, ms, panelMin) {
    UI.camName = name;
    if (ms == null) ms = UI.camQuick ? 0 : 450;
    var o = { ms: Math.round(ms / speed()), screen: screen };
    if (panelMin != null) o.panelMin = panelMin;
    return stgP('camera', name, o);
  }
  function anchorOf(id) { return stg('anchor', id); }
  function stageSay(id, text, tone, ms) { if (text) stg('say', id, text, { tone: tone || (id === 'o' ? 'owner' : null), ms: ms == null ? 2600 : ms }); }
  function place(id, spot, spr) {
    if (spr === 'player') spr = playerAv();
    stg('put', id, spot, spr); stg('hide', id, false); stg('sil', id, false);
  }
  function hideActor(id) { if (UI.stage && stg('has', id)) stg('hide', id, true); }
  function resetPoses() { ['p', 'f', 'o'].forEach(function (id) { stg('pose', id, null); stg('emote', id, null); stg('say', id, null); }); stg('untag'); }

  // ======================================================================= 封面、三軸、卡片
  function coverSrc(c) { return c ? (c.localCover || c.coverUrl || '') : ''; }
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
    if (c.tier && o.badge !== false) badge = '<span class="badge ' + c.tier + '">' + esc((C.aceTitle || {})[c.tier] || '') + '</span>';
    else if (c.gold && o.badge !== false) badge = '<span class="badge gold">私藏</span>';
    if (o.isNew) badge += '<span class="badge new">NEW</span>';
    var src = coverSrc(c);
    return '<span class="lb-cv ' + (o.frame === false ? '' : rarityCls(c)) + (o.sel ? ' sel' : '') + '"' + st + (o.info === false ? '' : ' data-info="1" data-cid="' + esc(c.id) + '"') +
      ' role="img" aria-label="' + esc(c.artist + '《' + c.album + '》') + '"><span class="alt" aria-hidden="true">' + esc(c.album) + '</span>' +
      (src ? '<img alt="" src="' + esc(src) + '" loading="lazy" draggable="false" onerror="this.remove()">' : '') + badge + '</span>';
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
  // 例子：他亮出／你點，三種「他丟哪色」的結果由 engine.clash 算（UI 不算傷害）
  function ruleExampleHTML() {
    var R = C.rules || {}, ex = R.example; if (!ex) return '';
    var eC = card(ex.eCard), pC = card(ex.pCard), pa = ex.pAttr || 'h';
    if (!eC || !pC || !E.clash) return '';
    var hab = (C.habits[ex.habit] || {}).line || '';
    var read0 = (ex.read || [])[0] || '', hAttr = null, best = -1;
    ATTRS.forEach(function (a) { var i = read0.lastIndexOf(ZH[a]); if (i > best) { best = i; hAttr = a; } });
    var order = [hAttr || 'o'].concat([pa], ATTRS).filter(function (a, k, arr) { return arr.indexOf(a) === k; });
    var rows = order.map(function (ea) {
      var r = E.clash(pC[pa] | 0, pa, eC[ea] | 0, ea), txt;
      if (r.kind === 'counter') txt = esc(dt('counter', { who: dt('you'), ace: '', a: ZH[pa], b: ZH[ea] })) + '　<b class="g">' + esc(dt('hitE', { n: r.toE })) + '</b>' + (ea === hAttr ? '<span class="gold">' + esc(dt('seeThrough').replace(/！$/, '')) + '</span>' : '');
      else if (r.kind === 'countered') txt = esc(dt('counter', { who: dt('he'), ace: '', a: ZH[ea], b: ZH[pa] })) + '　<b class="r">' + esc(dt('hitP', { n: r.toP })) + '</b>';
      else if (r.kind === 'tie') txt = esc(dt('tie')) + '　<b>' + esc(dt('nothing')) + '</b>';
      else txt = esc(dt('mirror', { x: pC[pa] | 0, y: eC[ea] | 0 })) + '　<b class="' + (r.toE ? 'g' : 'r') + '">' + esc(r.toE ? dt('hitE', { n: r.toE }) : dt('hitP', { n: r.toP })) + '</b>';
      return '<div><span class="p">' + esc(fill(ex.rowLabel || '他丟{attr} {n}', { attr: ZH[ea], n: eC[ea] | 0 })) + '</span><span>' + txt + '</span></div>';
    }).join('');
    var rec = function (lab, c, mark) {
      return '<div class="rec">' + coverHTML(c, { size: 46, frame: false, badge: false }) + '<div class="t"><small>' + esc(lab) + '</small>' + esc(c.artist + '《' + c.album + '》') + '<br>' + starsHTML(c, { mark: mark }) + '</div></div>';
    };
    return '<div class="ex"><div class="hd">' + esc(ex.title || '') + '</div><div class="bd">' +
      '<div class="habit"><span class="lb">' + esc((C.habitLabels || {}).base || '脾氣') + '</span><span class="tx">' + esc(hab) + '</span></div>' +
      '<div class="step"><span class="k">讀</span><div>' + (ex.read || []).map(colorZh).join('<br>') + '</div></div>' +
      rec(ex.eLabel || '他亮出', eC) + rec(ex.pLabel || '你點', pC, pa) + '<div class="out">' + rows + '</div></div></div>';
  }
  function learnedHTML() {
    var L = (C.tutorial && C.tutorial.learned) || null, got = save.learned || {};
    if (!L) return '';
    var names = Object.keys(L).filter(function (k) { return got[k]; }).map(function (k) { return L[k]; });
    try { var T = TUT(); if (T && T.learned) T.learned().forEach(function (t) { if (names.indexOf(t) < 0) names.push(t); }); } catch (_) {}
    var ttl = (C.tutorial.ui && C.tutorial.ui.learnedTitle) || '學會的規則';
    return names.length ? '<div class="lb-h3">' + esc(ttl) + '</div><div class="lb-learned">' + names.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' : '';
  }
  function rulesHTML() {
    var R = C.rules || {};
    var lines = (R.lines || []).map(function (s, i) { return '<li><span class="n">' + (i + 1) + '</span><div>' + (i === 0 ? colorZh(s) : esc(s)) + '</div></li>'; }).join('');
    return '<div class="lb-rules"><h1>' + esc(R.title || '品味對決・規則') + '</h1><div class="rsub">' + esc(R.sub || '') + '</div>' + triSVG() +
      '<ol class="rl">' + lines + '</ol>' + ruleExampleHTML() +
      (R.relics ? '<p class="rrel">' + esc(R.relics) + '</p>' : '') +
      '<div class="rfoot">' + (R.foot || []).map(esc).join('<br>') + '</div></div>';
  }
  function tutLabel(k, d) { var u = C && C.tutorial && C.tutorial.ui; return (u && typeof u[k] === 'string' && u[k]) || d; }
  function openRules() {
    var canReplay = canTutorial() && UI.screen !== 'duel' && !UI.tutReplay;
    var m = modal('lb-help', rulesHTML() + learnedHTML() +
      (canReplay ? '<button type="button" class="lb-btn wide" data-a="replay">' + esc(tutLabel('replay', '重看教學')) + '</button>' : ''));
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
      '<div class="row"><button type="button" class="lb-btn big" data-a="shelf">唱片櫃</button><button type="button" class="lb-btn big" data-a="rules">規則</button></div>' +
      '<button type="button" class="lb-btn big sp" data-a="snd">聲音 ' + swHTML(soundOn()) + '</button>' +
      '<button type="button" class="lb-btn big sp" data-a="fast">動畫加速 ' + swHTML(S.fastAnim) + '</button>' +
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
      else if (a === 'snd') {
        var want = !soundOn(); var fx = FX();
        if (fx && fx.setSound) try { fx.setSound(want); } catch (err) { console.error(err); }
        save.settings.sound = want; persist();
        b.innerHTML = '聲音 ' + swHTML(soundOn());
      } else if (a === 'fast') {
        S.fastAnim = !S.fastAnim; persist();
        b.innerHTML = '動畫加速 ' + swHTML(S.fastAnim);
        var fx2 = FX(); if (fx2 && fx2.setSpeed) fx2.setSpeed(speed());
        if (UI.screen === 'duel' && DUEL() && DUEL().rerender) try { DUEL().rerender(); } catch (err) { console.error(err); }
      } else if (a === 'skiptut') { closeModal(); try { TUT().skip(); } catch (err) { console.error(err); } }
      else if (a === 'replay') { closeModal(); replayTutorial(); }
      else if (a === 'reset') {
        if (!armed) { armed = true; b.textContent = '再按一次：真的清掉唱片櫃與存檔'; b.classList.add('armed'); return; }
        var keepSound = save.settings.sound, keepPlayer = save.player;
        leaveDuel();
        save = defSave(); save.settings.sound = keepSound; save.player = keepPlayer; persist(); closeModal();
        go('title');
      }
    });
  }

  // ======================================================================= 路由
  var UI = { screen: null, params: null, modal: null, stage: null, dlg: null, auto: null, trail: [], seedOverride: null, timers: [], going: false,
    top: null, stageHost: null, panel: null, decor: [], camName: 'full', offs: [], screenAt: 0, force: null };
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
    UI.timers.forEach(clearTimeout); UI.timers = [];
    UI.offs.forEach(function (f) { try { f(); } catch (_) {} }); UI.offs = [];
    UI.decor.forEach(function (d) { if (d && d.remove) d.remove(); }); UI.decor = [];
    qsa('.lb-sheet.float, .lb-toast', app()).forEach(function (s) { s.remove(); });
    UI.going = false; UI.lastAct = null;
    closeModal();
    var ci = CI(); if (ci && ci.isOpen()) ci.close();
    stg('highlight', []); stg('clearStamps');
    var T = TUT(); if (T && T.dismissSoft) try { T.dismissSoft(); } catch (_) {}
  }
  function go(id, params) {
    if (UI.screen === 'duel' && id !== 'duel') leaveDuel();
    cleanup();
    closePage(true);
    UI.screen = id; UI.params = params || {}; UI.screenAt = now();
    UI.trail.push(id); if (UI.trail.length > 120) UI.trail.shift();
    app().setAttribute('data-screen', id);
    D.body.setAttribute('data-screen', id);
    var p = UI.panel; p.className = 'lb-panel'; p.removeAttribute('style'); p.innerHTML = '';
    var f = FX(); if (f && f.rainStop && id !== 'title' && id !== 'scene') try { f.rainStop(); } catch (_) {}
    try { SCREENS[id](UI.params); } catch (e) { console.error(e); }
    UI.camQuick = false;
    if (UI.auto && UI.auto.until === id) UI.auto = null;
  }
  // 面板換內容：舊的往下淡出 150 ms（對白框 → 盤面）
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
    setTop(nightLabel(save.run), { chips: chips, skip: function () { if (UI.dlg) UI.dlg.skip(); }, help: !!p.help, pause: !!p.pause });
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
  function stripFromRun() { var r = save.run; if (!r) return { ace: null, bag: [] }; return { ace: C.aces[r.ace], bag: r.bag.slice() }; }
  function renderStrip(sc) {
    if (!sc.strip) return;
    var s = sc.stripState || stripFromRun();
    var slot = function (id, cls, key) {
      var c = card(id);
      return '<div class="slot' + cls + (c ? ' filled' : '') + '" data-slot="' + key + '"' + (c ? ' data-info="1" data-cid="' + esc(id) + '" role="button" aria-label="' + esc(c.artist + '《' + c.album + '》') + '"' : '') + '>' +
        (c ? '<img alt="" draggable="false" src="' + esc(coverSrc(c)) + '" onerror="this.remove()">' : '') + '</div>';
    };
    var h = '<span class="lab">包包</span>' + slot(s.ace, ' ace', 'ace') + '<span class="sep"></span>';
    for (var i = 0; i < Math.max(7, Math.min(8, s.bag.length)); i++) h += slot(s.bag[i], C.junk.indexOf(s.bag[i]) >= 0 ? ' junk' : '', i);
    if (s.label) h += '<span class="tag">' + esc(s.label) + '</span>';
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
        var an = f.animate ? f.animate([{ transform: 'translate(0,0) scale(.6)', opacity: 0 }, { transform: 'translate(' + dx * 0.15 + 'px,' + (dy * 0.15 - 30) + 'px) scale(1.05)', opacity: 1, offset: 0.3 },
          { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sc + ')', opacity: 1 }], { duration: dur, easing: 'cubic-bezier(.3,.7,.3,1)', fill: 'forwards' }) : null;
        var fin = function () { f.remove(); res(); };
        if (an) an.onfinish = fin;
        setTimeout(function () { if (f.isConnected) fin(); }, dur + 200);
      }, (delay || 0) / speed());
    });
  }
  function giveCards(sc, kind, instant) {
    var r = save.run; if (!r || !sc.strip) return Promise.resolve();
    var s = sc.stripState || (sc.stripState = { ace: null, bag: [] });
    var ids = kind === 'ace' ? [C.aces[r.ace]] : kind === 'gifts' ? (C.gifts[r.ace] || []) : (C.junk || []);
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
      nm.textContent = who === 'player' ? '你' : (who || '');      // NP-16：你說話的名牌一律寫「你」
      dq.classList.toggle('narr', !who);
      dq.classList.toggle('foe', who === '男子');
      dq.classList.toggle('boss', who === '藏家');
    }
    function typeText(text, voice) {
      return new Promise(function (res) {
        var n = 0; st.typing = true; tx.textContent = '';
        var done = function () { if (st.timer) clearInterval(st.timer); st.timer = null; st.typing = false; st.finish = null; tx.textContent = text; res(); };
        st.finish = done;
        if (st.skipping || !text || UI.auto) return done();
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
          if (!instant && at && !at.hidden && stg('has', 'f')) { stg('hide', 'f', false); jobs.push(stgP('walk', 'f', at.outside ? ['door', sg.f] : [sg.f])); }
          else place('f', sg.f);
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
      var f = FX(); if (!f || !f.music) return;
      if (kind === 'tonight' && ctx.tonightId) {
        var c = card(ctx.tonightId);
        if (!f.soundOn()) { ctx.quiet = true; return; }
        var settled = false;
        f.music.play(c, { fadeMs: 1500 }).then(function (ok) { settled = true; if (!ok) ctx.quiet = true; else ctx.heard = true; });
        setTimeout(function () { if (!settled) ctx.quiet = true; }, 2500);
      } else if (kind === 'stake' && ctx.stakeId && f.soundOn()) { try { f.music.play(card(ctx.stakeId), { fadeMs: 1500 }); } catch (_) {} }
      else if (kind === 'stop') { try { f.music.stop({ fadeMs: 1500 }); } catch (_) {} }
    }
    // 選項要的空間：只把舞台往上收到放得下（ART-12：不換 reward 鏡頭、不留一大塊黑）
    function roomFor() {
      if (!UI.stage) return;
      var need = Math.ceil(dq.scrollHeight + 30);
      if (UI.panel.clientHeight >= need) return;
      cam('full', 'scene', 260, need);
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
            stg('stamp', parts[0], parts[1] || '', b.who === '藏家' ? 'ink' : 'gold', 2400);
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
            // NP-11：自動前進給足閱讀時間（約每秒 6–7 字）；點一下就走
            var ms = Math.min(6500, 1400 + 140 * String(text || '').length);
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
  // 防連點：剛換上的面板 GUARD_MS 內真人的點擊不算（自動遊玩的 el.click() 不受影響）
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
  // 面板蓋在 #panel 上；場景裡開面板時鏡頭換 reward，讓面板有 260px 以上
  function sheet(html, cls, o) {
    o = o || {};
    qsa(':scope > .lb-sheet', UI.panel).forEach(function (s) { s.remove(); });
    var s = el('div', 'lb-sheet' + (cls ? ' ' + cls : ''), html);
    s.addEventListener('click', stopEv);
    guardClicks(s);
    bindInfoTaps(s);
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
    UI.camBack = setTimeout(function () { UI.camBack = 0; if (UI.screen === scr0 && !qs(':scope > .lb-sheet', UI.panel) && UI.camName === 'reward') cam('full', 'scene', 380); }, 160);
  }
  function closeSheet(s) {
    if (!s) return;
    if (s.parentNode) s.remove();
    if (!qs(':scope > .lb-sheet', UI.panel)) { UI.panel.classList.remove('sheeted'); camBackSoon(); }
  }
  // 浮在舞台下緣的小面板（今晚來客的頭像、箱子、試聽機、包包、配件）
  function floatSheet(html, cls) {
    qsa('.lb-sheet.float', app()).forEach(function (s) { s.remove(); });
    var s = el('div', 'lb-sheet float' + (cls ? ' ' + cls : ''), html);
    s.addEventListener('click', stopEv);
    guardClicks(s);
    bindInfoTaps(s);
    app().appendChild(s);
    s.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('[data-a=close]')) { s.remove(); syncFloat(); } });
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

  // 猜歌（只亮封面、藝人、專輯，不亮星數）：封面＝唱片資訊、「是這張」＝作答
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
  // 挑王牌：封面＝唱片資訊；封面下面的字＝換聽（選）；「就這張」確認（劇本那句「點封套下面的字換著聽」照這個做）
  function acePickPanel(sc, ctx, beat) {
    return new Promise(function (res) {
      var f = FX();
      var sel = ctx.defaultTier || 'hall';
      var prompt = ctx.quiet ? ((beat && beat.quietText) || (beat && beat.prompt && /挑一張帶走/.test(beat.prompt) && beat.prompt) || '（挑一張帶走。）') : ((beat && beat.prompt) || (beat && beat.text) || '（點封套下面的字換著聽，挑一張帶走。）');
      var html = '<div class="hd"><h3>' + esc(prompt) + '</h3><span class="np"></span></div><div class="lb-trio">' +
        TIERS.map(function (t) {
          var c = card(C.aces[t]), ax = C.aceAxis[t];
          return tileHTML(c, { sel: t === sel, stars: false, text: false, data: 'data-tier="' + t + '"',
            extra: '<button type="button" class="acex"><span class="' + ax + '">' + esc(C.aceTitle[t]) + '・' + ZH[ax] + ' 7</span><span class="al one">' + esc(c.album) + '</span></button>' });
        }).join('') + '</div><p class="note detail"></p><div class="foot"><button type="button" class="lb-btn pri big wide key" data-a="ok">就這張</button></div>';
      var s = sheet(html, 'acepick');
      watchPlaying(qs('.np', s));
      var det = qs('.detail', s);
      function mark() {
        qsa('.lb-ct', s).forEach(function (x) { x.classList.toggle('sel', x.getAttribute('data-tier') === sel); });
        var c = card(C.aces[sel]), ax = C.aceAxis[sel];
        det.innerHTML = '<b>' + esc(C.aceTitle[sel]) + '</b>：' + esc(c.artist + '《' + c.album + '》') + '。<b class="' + ax + '">' + ZH[ax] + ' 7</b>，' + esc(dt('aceOnce').replace(/^.*・/, '') || '每場一次') + '。';
      }
      mark();
      var done = false;
      s.addEventListener('click', function (e) {
        if (done) return;
        var t = e.target.closest && e.target.closest('.lb-ct');
        if (t && !(e.target.closest('[data-a=ok]'))) {
          var tier = t.getAttribute('data-tier'); if (tier === sel) return;
          sel = tier; sfx('select'); mark();
          if (f && f.soundOn && f.soundOn()) f.music.play(card(C.aces[sel]), { fadeMs: 1500 });
          return;
        }
        if (e.target.closest && e.target.closest('[data-a=ok]')) { done = true; sfx('select'); closeSheet(s); ctx.acePicked = true; res(sel); }
      });
      autoAct(function () {
        if (UI.auto && UI.auto.ace && UI.auto.ace !== sel) { var b0 = qs('.lb-ct[data-tier="' + UI.auto.ace + '"] .acex', s); if (b0) b0.click(); }
        var b = qs('[data-a=ok]', s); if (b) b.click();
      }, 260);
    });
  }
  // 一張唱片攤開（序章掉出來的那張、打烊時藏家送的那張）：封面 140＋三軸＋按鈕
  function cardPanel(c, opts) {
    opts = opts || {};
    return new Promise(function (res) {
      var html = '<div class="hd"><h3>' + esc(opts.title || '') + '</h3><span class="np"></span></div>' +
        '<div class="lb-one">' + coverHTML(c, { size: 132, isNew: !!opts.isNew }) +
        '<div class="meta"><div class="ar">' + esc(c.artist) + '</div><div class="al">' + esc(c.album) + '</div><div class="yr">' + esc(c.year || '') + '</div>' +
        starsHTML(c, { cls: 'big' }) + '<span class="sub">點封面：唱片資訊</span></div></div>' +
        (opts.note ? '<p class="msg">' + esc(opts.note) + '</p>' : '') +
        '<div class="btns">' + (opts.buttons || []).map(function (b, i) {
          return '<button type="button" class="lb-btn big col' + (b.pri ? ' pri' : '') + '" data-i="' + i + '"><span class="lb">' + esc(b.label) + '</span>' + (b.sub ? '<span class="sub">' + esc(b.sub) + '</span>' : '') + '</button>';
        }).join('') + '</div>';
      var s = sheet(html, 'one');
      watchPlaying(qs('.np', s));
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
  function relicButtonsHTML(ids, attr) {
    return ids.map(function (id) {
      var r = relicOf(id); if (!r) return '';
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
  // 包包滿了：先拿一張出來（點卡片＝拿出來；封面＝唱片資訊；「算了」取消）
  function dropPanel(incomingId, autoId) {
    return new Promise(function (res) {
      var r = save.run;
      var html = '<div class="hd"><h3>' + esc((C.lines.owner && C.lines.owner.bagFull) || '包包滿了。先拿一張出來。') + '</h3></div>' +
        '<p class="msg">要放進來的是《' + esc((card(incomingId) || {}).album || '') + '》。挑一張拿出來，它會留在唱片櫃。</p>' +
        '<div class="lb-pick">' + r.bag.map(function (id) { return tileHTML(card(id), { text: false, pick: '拿出來' }); }).join('') + '</div>' +
        '<div class="foot"><button type="button" class="lb-btn wide" data-a="cancel">算了，不放了</button></div>';
      var s = sheet(html, 'drop');
      var done = false;
      s.addEventListener('click', function (e) {
        if (done) return;
        var t = e.target.closest && e.target.closest('.lb-ct');
        if (t) { done = true; sfx('tick'); closeSheet(s); res(t.getAttribute('data-cid')); return; }
        if (e.target.closest && e.target.closest('[data-a=cancel]')) { done = true; closeSheet(s); res(null); }
      });
      autoAct(function () { var b = autoId ? qs('.lb-ct[data-cid="' + autoId + '"] [data-pick]', s) : qs('[data-pick]', s); if (b) b.click(); });
    });
  }

  // ======================================================================= 吐司（z 40；唱片資訊開著時排隊）
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
    (effects || []).forEach(function (f) {
      if (f.gainCard) out.push('《' + ((card(f.gainCard) || {}).album || '') + '》進包包');
      if (f.loseCard) out.push('《' + ((card(f.loseCard) || {}).album || '') + '》拿出來了');
      if (f.gainRelic) out.push('拿到「' + ((relicOf(f.gainRelic) || {}).name || '') + '」');
      if (f.loseRelic) out.push('「' + ((relicOf(f.loseRelic) || {}).name || '') + '」放回去了');
    });
    return out.join('・');
  }
  function doChoose(ch) {
    var r = save.run;
    var res = E.choose(r, C, ch);
    if (!res.ok) console.warn('choose error', res.error, ch);
    (res.effects || []).forEach(function (f) { if (f.gainCard) shelfAdd(f.gainCard); });
    save.relics = r.relics.slice(0, 3);          // 身上的配件帶到下一晚（engine 建議；最多三件）
    persist();
    return res;
  }
  // 收一張進包包：滿 8 張先挑一張拿出來（拿出來的留在唱片櫃）
  function takeCard(cardId, autoDrop) {
    var r = save.run;
    if (r.bag.length < E.CFG.bagMax) return Promise.resolve(doChoose({ type: 'take', cardId: cardId }));
    stageSay('o', C.lines.owner && C.lines.owner.bagFull, 'owner');
    return dropPanel(cardId, autoDrop).then(function (dropId) { return dropId ? doChoose({ type: 'take', cardId: cardId, dropId: dropId }) : null; });
  }
  function takeRelic(relicId, autoDrop) {
    var r = save.run;
    if (r.relics.length < E.CFG.relicMax) return Promise.resolve(doChoose({ type: 'relic', relicId: relicId }));
    stageSay('o', C.lines.owner && C.lines.owner.relicFull, 'owner');
    return relicPanel(r.relics, { prompt: (C.lines.owner && C.lines.owner.relicFull) || '配件最多帶三件。先放一件回去。', cancel: '算了，不換了', autoId: autoDrop })
      .then(function (dropId) { return dropId ? doChoose({ type: 'relic', relicId: relicId, dropRelicId: dropId }) : null; });
  }

  // ======================================================================= title
  function firstEver() { return !save.prologueDone && !(save.nights && save.nights.length); }
  function shelfCount() { return { n: Object.keys(save.shelf).filter(card).length, total: Object.keys(C.cards).length }; }
  function runWhere(r) {
    if (!r) return '';
    if (r.prologue === 'pending') return (C.night.prologueTime || '21:30') + '・序章';
    var id = E.current(r, C), en = C.enemies[id];
    return (r.times[r.idx] || '') + (en ? '・' + en.name : '');
  }
  SCREENS.title = function () {
    var r = save.run, hasRun = !!(r && !r.over), overRun = !!(r && r.over);
    setTop(esc(dateLabel(seedKey())) + ' 的雨夜', { links: [['唱片櫃', function () { openPage('shelf'); }, 'shelf'], ['台北', function () { go('taipei', { back: 'title' }); }, 'taipei']], help: true });
    var panel = UI.panel; panel.classList.add('title');
    var sh = shelfCount();
    var infoLine = (save.best.clears ? '打烊 ' + save.best.clears + ' 次' : '') + (sh.n ? (save.best.clears ? '・' : '') + '唱片櫃 ' + sh.n + '／' + sh.total : '');
    var hint = line('titleHint'), where = runWhere(r);
    var h = '<div class="lb-tbtns">';
    if (hasRun) {
      h += '<button type="button" class="lb-btn pri big wide col key" data-a="cont">繼續今晚 ▸<span class="sub">' + esc(where) + '</span></button>' +
        '<div class="row"><button type="button" class="lb-btn key" data-a="push">重新推門</button><button type="button" class="lb-btn key" data-a="quiet">安靜地重新推門</button></div>' +
        '<p class="lb-warn" aria-live="polite">再按一次就放棄今晚（' + esc(where) + '），從頭推門。</p>';
    } else {
      h += '<button type="button" class="lb-btn pri big wide key" data-a="push">推門（有聲音）▸</button>' +
        '<button type="button" class="lb-btn big wide key" data-a="quiet">安靜地推門</button>' +
        (overRun ? '<button type="button" class="lb-btn wide" data-a="end">看今晚結算</button>' : '');
    }
    h += '</div>' + (hint && !hasRun ? '<p class="lb-foot hint">' + esc(hint) + '</p>' : '') + (infoLine ? '<p class="lb-foot sm">' + esc(infoLine) + '</p>' : '') +
      (UI.discardedOld ? '<p class="lb-foot sm">規則改版了，舊的存檔已經清掉。</p>' : '');
    var box = el('div', 'lb-screen', h); panel.appendChild(box);
    // 面板量出來要多高，舞台就收到放得下（B-title-375-clipped：警告那行永遠在畫面裡）
    var need = Math.max(130, Math.ceil(box.scrollHeight + 8));
    cam('full', 'title', UI.firstScreen ? 0 : 450, need);
    stg('interact', 'title');
    place('o', 'counter', 'owner'); stg('pose', 'o', 'busy');
    hideActor('f'); hideActor('q1'); hideActor('q2');
    place('p', 'out', 'player'); stg('sil', 'p', true);
    stg('door', 'close'); stg('play', true); stg('dim', 1);
    var plate = el('div', 'lb-plate', '<b>品味對決<i>・</i>試做</b><small>dip vinyl game lab</small>');
    app().appendChild(plate); UI.decor.push(plate);
    var placePlate = function () { if (!plate.isConnected) return; var sh0 = UI.stageHost.getBoundingClientRect(), ar = app().getBoundingClientRect(); plate.style.top = Math.max(36, Math.round(sh0.bottom - ar.top - 26)) + 'px'; };
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
      } else if (act === 'end') go('end');
      else if (act === 'cont') {
        UI.going = true;
        var f = FX(); var want = save.settings.sound === true;
        if (f) { try { if (f.init) f.init(); f.unlockFromGesture(want); } catch (_) {} }
        ensurePlayer(); resumeRun();
      }
    });
  };
  function pushDoor(withSound) {
    if (UI.going) return;
    UI.going = true;
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
    if (first) { save.seen.reveal = true; persist(); later(function () { stg('reveal', 2600); }, 900); }
  }

  // ======================================================================= 開新的一晚
  function nightsFor(k) { return save.nights.filter(function (n) { return n.seedKey === k; }).length; }
  function createRun(o) {
    var k = seedKey();
    var r = E.newRun(C, { seedKey: k, nightNo: nightsFor(k) + 1, ace: o.ace, prologue: !!o.prologue, relics: o.prologue ? [] : (save.relics || []).slice(0, 3) });
    r.goodEar = !!o.goodEar; r.tut = null;            // tut：null＝還沒選、true＝帶教學、false＝直接開打／教學結束
    save.run = r; save.lastAce = o.ace;
    shelfAdd(C.aces[o.ace]); (C.gifts[o.ace] || []).forEach(shelfAdd); (C.junk || []).forEach(shelfAdd);
    persist();
    return r;
  }
  function tierOfCard(id) { for (var i = 0; i < TIERS.length; i++) if (C.aces[TIERS[i]] === id) return TIERS[i]; return null; }
  // ---- 序章
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
      createRun({ ace: tier, goodEar: !!ctx.goodEar, prologue: prologue });
      sc.stripState = null; renderStrip(sc);
      if (ctx.goodEar && !qs('.chip.gold', UI.top)) qs('.tt', UI.top).insertAdjacentHTML('afterend', '<span class="chip gold">好耳朵</span>');
      return tier;
    });
  }
  function playerLine(label) { return /^……（|^（/.test(label) ? label : '「' + label + '」'; }
  function canTutorial() { var T = TUT(); return !!(C && C.tutorial && C.tutorial.script && T && typeof T.duelHooks === 'function' && typeof T.startDuelLesson === 'function'); }
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
      // 開打前兩顆鈕：「▶ 品味對決」帶教學／「▶ 直接開打（我會玩）」（教學做過了就預設直接開打）
      var tutOk = canTutorial();
      var items = (Array.isArray(b.prompts) && b.prompts.length) ? b.prompts.slice(0, tutOk ? 2 : 1) : [tutLabel('start', '▶ 品味對決')].concat(tutOk ? [tutLabel('skip', '▶ 直接開打（我會玩）')] : []);
      var autoI = items.length > 1 ? (UI.auto && UI.auto.tut ? 0 : 1) : 0;
      return dlg.menu(items, { autoIndex: autoI }).then(function (i) {
        var r = save.run; if (!r) return go('title');
        var tut = tutOk && i === 0;
        r.tut = tut;
        var jab = !tut && ctx.jab && C.cards['coldplay-mylo-xyloto'] && (C.enemies.man.deck || []).indexOf('coldplay-mylo-xyloto') >= 0;
        persist();
        beginFight({ tutorial: tut, enter: true, firstRecordId: jab ? 'coldplay-mylo-xyloto' : null, jab: jab });
        return new Promise(function () {});
      });
    }
    return Promise.resolve();
  }
  // ---- 再來一夜（≤10 秒）：門 swing → 三張王牌 → 今晚來客
  function startAgain() {
    var ctx = { flags: {}, quiet: !soundOn(), defaultTier: save.lastAce || 'hall' };
    save.run = null; persist();
    go('scene', { p: 'door', f: 'hide', o: 'counter', stripState: { ace: null, bag: [] }, start: function (sc) {
      var dlg = Dialogue(sc, ctx);
      dlg.run(C.script.again, function (ui, b) {
        if (ui === 'acePick') return acePickAndCreate(sc, ctx, b, false).then(function () { go('night'); return new Promise(function () {}); });
        return Promise.resolve();
      });
    } });
  }
  // ---- 續玩
  function resumeRun() {
    var r = save.run;
    if (!r) return go('title');
    var step = E.nextStep(r);
    if (step === 'reward') return r.pending.prologue ? epilogueFlow(true) : go('reward');
    if (step === 'retry') return retryFlow({ enemyId: r.pending.enemyId, resumed: true });
    if (r.over) return go('end');
    if (step === 'duel') return beginFight({});
    if (step === 'prologue') return beginFight({ tutorial: r.tut === true || (r.tut == null && !save.tutorialDone && canTutorial()) });
    if (step === 'fight') return go('night');
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
    var tutorial = !!o.tutorial && canTutorial() && r.prologue === 'pending' && !r.duel;
    var res = null;
    try { res = E.startFight(r, C, { tutorial: tutorial, firstRecordId: o.firstRecordId || undefined }); } catch (e) { console.error(e); }
    if (!res || !res.duel) { console.error('startFight failed'); persist(); return go(r.over ? 'end' : 'night'); }
    if (!res.resumed) r.tut = tutorial;
    persist();
    preloadDuel(res.duel);
    if (res.duel.over) return onDuelEnd({ duel: res.duel });           // 打完了但還沒結算（重新整理在結尾那 2 秒）
    UI.ending = null;
    var tutOn = r.tut === true && !save.tutorialDone && canTutorial();
    var enter = !!o.enter && !res.resumed;
    if (enter) ghostPanel();
    go('duel', { res: res, enemyId: res.enemyId, enter: enter, quick: !!o.quick && !res.resumed, tutorial: tutOn, jab: !!o.jab && !res.resumed });
  }
  function duelHooks(p) {
    var T = TUT(), tut = null;
    if (p.tutorial && canTutorial()) { try { tut = T.duelHooks(); } catch (e) { console.error(e); tut = null; } }
    return {
      stage: UI.stage,
      cardInfo: function (c, o) { return info(c, o); },
      hint: function (id, targets) { if (UI.tutReplay || !T || !T.hintHook) return; try { T.hintHook(id, targets); } catch (e) { console.error(e); } },
      settings: function () { return { fastAnim: !!save.settings.fastAnim || FAST }; },
      onEvent: function () {},
      player: { name: '你', avatar: playerAv() },
      relicIcon: function (id, size) { return relicIcon(id, size); },
      resolveOpts: function () { return UI.force ? { debugOutcome: UI.force } : {}; },
      tut: tut,
      beforeEnd: tut && T.settled ? function () { try { return T.settled(); } catch (_) { return null; } } : null
    };
  }
  function duelTitle(eid, r) {
    var en = C.enemies[eid] || {};
    if (en.prologue || eid === (C.prologueEnemy || 'man')) return esc(C.night.prologueTime || '21:30') + '<small>序章</small>';
    var t = (r && r.times && r.times[r.idx]) || '';
    if (en.boss) return esc(t) + '<small>打烊前</small>';
    return esc(t) + '<small>今晚第 ' + ((r && r.idx | 0) + 1) + ' 位' + (en.elite ? '・菁英' : '') + '</small>';
  }
  // 盤面最終高度：螢幕高 − 頂欄 − 橫條（舞台 strip 鏡頭的 CSS 高）
  function stripCssH() {
    var st = UI.stage, vh = W.visualViewport ? Math.min(W.innerHeight, W.visualViewport.height) : W.innerHeight;
    if (!st) return vh < 600 ? 84 : 120;
    try {
      var L = st.layout, v = st.view();
      var nm = (W.DipLabStage && W.DipLabStage.pickCamera) ? W.DipLabStage.pickCamera('strip', L.cameras, vh) : 'strip';
      var c = L.cameras[nm] || L.cameras.strip;
      var h = Math.round(c.h * (v.baseDev || v.dev) / (v.dpr || 1));
      return h > 40 ? h : (vh < 600 ? 84 : 120);
    } catch (_) { return vh < 600 ? 84 : 120; }
  }
  SCREENS.duel = function (p) {
    var r = p.fakeRun || save.run, eid = p.enemyId, en = C.enemies[eid] || {};
    setTop(duelTitle(eid, r), { help: true, pause: true });
    var panel = UI.panel; panel.classList.add('duel');
    var wrap = el('div', 'lb-duelwrap'); panel.appendChild(wrap);
    var foeSpr = enemySpr(en);
    resetPoses(); hideActor('q1'); hideActor('q2'); stg('sil', 'f', false); stg('sil', 'p', false);
    stg('sprite', 'f', foeSpr);
    var enter = !!p.enter && !UI.auto, quick = !!p.quick && !UI.auto;
    var opts = {
      duel: p.res.duel, events: p.res.events || [], run: r, content: C, enter: enter || quick,
      onEnd: function (result) { onDuelEnd(result); },
      onSave: function () { if (save.run && !UI.tutReplay) persist(); },
      hooks: duelHooks(p)
    };
    var boss = !!en.boss && enter;
    var mountBoard = function () {
      var Dl = DUEL();
      if (Dl && typeof Dl.mount === 'function') { try { Dl.mount(wrap, opts); } catch (e) { console.error(e); stubDuel(wrap, opts); } }
      else stubDuel(wrap, opts);
      if (p.tutorial && opts.hooks.tut) startLesson(r.ace, !!p.replay);
      if (p.jab && C.lines.man && C.lines.man.jabBubble) later(function () { if (UI.screen === 'duel') stageSay('f', C.lines.man.jabBubble, null, 1800); }, 2300);
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
    UI.camName = 'strip';
    var walkIn = null, pushed = false;
    var push = function () {
      if (pushed || UI.screen !== 'duel' || !wrap.isConnected) return;
      pushed = true;
      mountBoard();
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
    if (UI.tutReplay) return endReplay();
    var r = save.run;
    if (!r || !duel || !duel.over || UI.ending === duel) return;
    UI.ending = duel;
    var wasTut = r.tut === true;
    var out = null;
    try { out = E.finishFight(r, C, duel); } catch (e) { console.error(e); }
    if (!out || out.error) { console.error('finishFight', out && out.error); persist(); return go(r.over ? 'end' : 'night'); }
    if (wasTut && out.win) save.tutorialDone = true;     // 教學那場打贏（含教學步驟中 KO）：B-tut-done-not-persisted
    r.tut = false;
    (out.met || []).forEach(shelfAdd);
    persist();
    stg('untag');
    if (UI.auto && UI.auto.until === 'duelEnd') UI.auto = null;
    var off = out.offer;
    if (off && off.type === 'retry') return retryFlow(out);
    if (off && off.type === 'reward') return off.prologue ? epilogueFlow(false) : go('reward');
    if (r.over) { recordNight(r); return r.over === 'clear' ? clearFlow() : deadFlow(out); }
    go('night');
  }
  function recordNight(r) {
    if (!r || !r.over || r.recorded) return;
    var firstClear = r.over === 'clear' && !save.best.clears;
    r.recorded = true;
    var la = r.stats.lostAt;
    var reached = r.over === 'clear' ? (r.times[r.times.length - 1] || '02:00') : ((la && la.time) || (r.prologue === 'pending' ? C.night.prologueTime : ''));
    save.nights.push({ seedKey: r.seedKey, nightNo: r.nightNo, ace: r.ace, result: r.over, reached: reached, wins: r.stats.wins, taken: r.stats.taken.slice() });
    if (save.nights.length > 30) save.nights = save.nights.slice(-30);
    if (r.over === 'clear') { save.best.clears++; save.best.bySeedKey[r.seedKey] = (save.best.bySeedKey[r.seedKey] | 0) + 1; }
    if (firstClear) save.unlocks.secondNightTeaser = true;
    r.firstClear = firstClear;
    save.prologueDone = true;
    save.relics = r.relics.slice(0, 3);
    persist();
  }
  // 場景：對決結束後的那個位置（他在左、你在右、老闆在中間），鏡頭拉回全景
  function afterDuelScene(eid, o, start) {
    var en = C.enemies[eid] || {};
    go('scene', Object.assign({ p: 'duelP', f: 'duelE', fSpr: enemySpr(en), o: 'between', camMs: 600, start: function (sc) {
      stg('pose', 'p', null); stg('pose', 'f', null);
      start(sc);
    } }, o || {}));
  }
  // ---- 輸了：序章男子免費再一場；客人每晚一次老闆說情（同一位重打、聲望回滿）
  function retryFlow(out) {
    var r = save.run, eid = out.enemyId, p = r.pending, free = !!(p && p.free);
    afterDuelScene(eid, {}, function (sc) {
      var dlg = Dialogue(sc, {});
      var winLine = C.lines[eid] && C.lines[eid].win;
      var beats = [];
      if (winLine && !out.resumed) beats.push({ who: eid === 'man' ? '男子' : (eid === 'boss' ? '藏家' : C.enemies[eid].name), text: '「' + [].concat(winLine)[0] + '」' });
      beats.push({ who: '老闆', text: '「' + ((C.lines.owner && C.lines.owner.retry) || '……再一場。') + '」' });
      dlg.run(beats).then(function () {
        if (free) { doChoose({ type: 'retry' }); return beginFight({ quick: true }); }
        return dlg.menu(['▶ 再一場（老闆說情，今晚只有一次）', '今晚到這'], { autoIndex: 0 }).then(function (i) {
          if (i === 0) { doChoose({ type: 'retry' }); beginFight({ quick: true }); return; }
          doChoose({ type: 'end' }); recordNight(save.run); deadFlow({ enemyId: eid });
        });
      });
    });
  }
  // ---- 序章收尾：他掉出來的那張 → 發燒配件三選一（店主認可的那一段）→ 今晚來客
  function epilogueFlow(resumed) {
    var r = save.run;
    afterDuelScene('man', { fSpr: 'e0' }, function (sc) {
      var pend0 = r.pending;
      var ctx = { flags: {}, stakeId: pend0 && pend0.cards && pend0.cards[0] };
      var dlg = Dialogue(sc, ctx);
      var beats = C.script.epilogueWin;
      if (resumed) beats = beats.filter(function (b) { return b.ui === 'stake' || b.ui === 'relic'; });
      dlg.run(beats, function (ui, b) {
        var pend = save.run.pending;
        if (ui === 'stake') {
          if (!pend || pend.cardDone || !pend.cards.length) return Promise.resolve();
          var c = card(pend.cards[0]);
          return cardPanel(c, { title: '他的袋子裡掉出來的', isNew: true, buttons: [
            { label: '收進包包', sub: '包包 ' + save.run.bag.length + '／' + E.CFG.bagMax, value: 'take', pri: true },
            { label: '不用了', sub: '還是會留在唱片櫃', value: 'skip' }] }).then(function (v) {
            shelfAdd(c.id);
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
        return Promise.resolve();
      }).then(function () {
        var nx = save.run && save.run.order[save.run.idx];
        if (nx) { place('f', 'out', enemySpr(C.enemies[nx])); stg('sil', 'f', true); }
        return dlg.run(C.script.afterPrologue, function (ui) {
          if (ui === 'map') { save.prologueDone = true; persist(); go('night'); return new Promise(function () {}); }
          return Promise.resolve();
        });
      });
    });
  }
  // ---- 打烊（通關）：藏家用過的那張（你當初沒選的王牌）收進唱片櫃
  function clearFlow() {
    var r = save.run;
    afterDuelScene('boss', { o: 'counter' }, function (sc) {
      var aceId = C.aces[r.bossAce];
      var dlg = Dialogue(sc, { flags: { firstClear: !!r.firstClear }, stakeId: aceId });
      dlg.run(C.script.clear, function (ui) {
        if (ui === 'stake' && card(aceId)) {
          var isNew = shelfAdd(aceId); persist();
          return cardPanel(card(aceId), { title: '他用過的那張', isNew: isNew, buttons: [{ label: '收進唱片櫃', value: 'ok', pri: true }] });
        }
        return Promise.resolve();
      }).then(function () { go('end'); });
    });
  }
  // ---- 散場：你坐在地上，老闆一句
  function deadFlow(out) {
    go('scene', { p: 'duelP', o: 'counter', camMs: 600, start: function (sc) {
      stg('pose', 'f', null);
      stgP('walk', 'f', ['door', 'leave']).then(function () { hideActor('f'); });
      var dlg = Dialogue(sc, {});
      dlg.run(C.script.dead).then(function () { go('end'); });
    } });
  }
  // ---- 傳說藏家進門（02:00）
  function bossEnterFlow() {
    go('scene', { p: 'duelP', f: 'out', fSpr: 'boss', o: 'counter', start: function (sc) {
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
    var res; try { res = T.replayDuel(C, tier, 7); } catch (e) { console.error(e); return; }
    var back = UI.screen === 'night' ? 'night' : (save.run && !save.run.over ? 'resume' : 'title');
    go('duel', { res: res, enemyId: C.prologueEnemy || 'man', enter: true, tutorial: true, replay: true, fakeRun: { ace: tier, retryLeft: 1, relics: [], idx: 0, times: [] } });
    UI.tutReplay = { back: back };
  }
  function endReplay() {
    var back = (UI.tutReplay && UI.tutReplay.back) || 'title';
    leaveDuel();
    resetPoses();
    if (back === 'resume') resumeRun(); else if (back === 'night' && save.run && !save.run.over) go('night'); else go('title');
  }

  // ======================================================================= reward：贏了挑他一張唱片（菁英／藏家：唱片或一件配件）
  SCREENS.reward = function () {
    var r = save.run, p = r && r.pending;
    if (!p || p.type !== 'reward') return resumeRun();
    if (p.prologue) return epilogueFlow(true);
    var en = C.enemies[p.enemyId] || {};
    setTop(esc(r.times[r.idx] || '') + '<small>' + esc(en.name || '') + '</small>', { help: true, pause: true });
    UI.panel.classList.add('reward');
    cam('reward', 'reward', 600);
    stg('interact', 'reward');
    stg('pose', 'f', null); stg('pose', 'p', null);
    place('p', 'duelP', 'player'); place('o', 'counter', 'owner');
    if (!stg('has', 'f')) place('f', 'duelE', enemySpr(en));
    stg('sprite', 'f', enemySpr(en)); stg('hide', 'f', false); stg('sil', 'f', false);
    var lose = (C.lines[p.enemyId] && C.lines[p.enemyId].lose) || [];
    later(function () { stageSay('f', [].concat(lose)[0], null, 2200); }, 300);
    later(function () { stg('door', 'open'); stgP('walk', 'f', ['door', 'leave']).then(function () { hideActor('f'); stg('door', 'close'); }); }, 1700);
    var cards = p.cards.map(card).filter(Boolean), relics = p.relics.filter(relicOf);
    var bagLine = '包包 ' + r.bag.length + '／' + E.CFG.bagMax;
    var html = '<div class="hd"><h3>' + (cards.length ? '他丟過的唱片：挑一張收進包包' : '他沒有能收的唱片') + '</h3><span class="sub">' + esc(bagLine) + '</span></div>' +
      (cards.length ? '<div class="lb-rgrid">' + cards.map(function (c) { return tileHTML(c, { pick: '收這張', isNew: isNewOnShelf(c.id) }); }).join('') + '</div>' +
        '<p class="note">點封面看唱片資訊、試聽。沒收的也都進了唱片櫃。</p>' : '') +
      (relics.length ? '<div class="lb-h3">' + (cards.length ? '或改拿一件發燒配件' : '挑一件發燒配件') + '</div><div class="lb-opts">' + relicButtonsHTML(relics, 'data-r') + '</div>' : '') +
      '<div class="foot"><button type="button" class="lb-btn wide" data-a="skip">' + (cards.length || relics.length ? '都不要' : '繼續') + '</button></div>';
    var s = sheet(html, 'reward');
    var busy = false;
    var finish = function (res) {
      if (res && res.effects) toast(effectsText(res.effects));
      var rr = save.run;
      if (rr.pending && rr.pending.type === 'reward') { busy = false; return; }          // 還沒選完（例：包包滿了按「算了」）
      if (rr.over) { recordNight(rr); return later(function () { rr.over === 'clear' ? clearFlow() : go('end'); }, 300); }
      later(function () { go('night'); }, 300);
    };
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
      if (ch.type === 'take') { busy = true; takeCard(ch.cardId, ch.dropId).then(finish); }
      else if (ch.type === 'relic') { busy = true; takeRelic(ch.relicId, ch.dropRelicId).then(finish); }
      else { busy = true; finish(doChoose({ type: 'skip' })); }
    }, 300);
  };

  // ======================================================================= 今晚來客（SPEC-v3 §9：店內底部一條，五顆頭像，打完的變黑，下一位金框）
  function enemyHp(id) { var e = C.enemies[id] || {}; return e.hp | 0; }
  SCREENS.night = function () {
    var r = save.run;
    if (!r) return go('title');
    if (r.over && !r.pending) return go('end');
    if (E.nextStep(r) !== 'fight') return resumeRun();
    setTop(nightLabel(r), { help: true, pause: true });
    var panel = UI.panel; panel.classList.add('night');
    stg('interact', 'map');
    resetPoses(); hideActor('f'); stg('sil', 'p', false);
    place('o', 'counter', 'owner'); place('p', UI.lastSpot || 'browse', 'player'); stg('door', 'close');
    // 門外排隊：下一位（剪影）
    var nx = r.order[r.idx], nx2 = r.order[r.idx + 1];
    if (nx) { place('q1', 'q1', enemySpr(C.enemies[nx])); stg('sil', 'q1', true); } else hideActor('q1');
    if (nx2) { place('q2', 'q2', enemySpr(C.enemies[nx2])); stg('sil', 'q2', true); } else hideActor('q2');
    var row = r.order.map(function (id, i) {
      var en = C.enemies[id] || {}, done = i < r.idx, cur = i === r.idx;
      return '<button type="button" class="nc' + (done ? ' done' : '') + (cur ? ' cur' : '') + (en.elite ? ' elite' : '') + (en.boss ? ' boss' : '') + '" data-i="' + i + '" data-tut="night-' + i + '" aria-label="' + esc((r.times[i] || '') + ' ' + en.name) + '">' +
        '<span class="tm">' + esc(r.times[i] || '') + '</span><span class="hd">' + headHTML(enemySpr(en), 30) + (done ? '<span class="ok" aria-hidden="true">✓</span>' : '') + '</span>' +
        '<span class="nm">' + esc(en.boss ? '打烊前' : en.elite ? '菁英' : en.name) + '</span></button>';
    }).join('');
    var nen = C.enemies[nx] || {};
    var h = '<div class="lb-night"><div class="nh"><b>' + esc(C.night.label || '今晚來客') + '</b><span class="sub">贏了 ' + r.stats.wins + ' 位' + (r.retryLeft > 0 ? '・老闆說情 剩 ' + r.retryLeft + ' 次' : '') + '</span></div>' +
      '<div class="nrow" data-tut="night">' + row + '</div>' +
      '<button type="button" class="lb-btn pri big wide key" data-a="go" data-tut="night-next">下一位：' + esc(r.times[r.idx] || '') + '　' + esc(nen.name || '') + ' ▸</button></div>' +
      '<div class="lb-bagline"><button type="button" class="bag" data-a="bag">包包 <b>' + r.bag.length + '/' + E.CFG.bagMax + '</b></button>' +
      '<button type="button" class="rl" data-a="relics"><span class="k">發燒配件</span>' + (r.relics.length ? r.relics.map(function (id) { return '<span class="ri">' + relicIcon(id, 16) + '</span>'; }).join('') + (r.relics.length === 1 ? '<span>' + esc(relicOf(r.relics[0]).name) + '</span>' : '') : '<span>（還沒有）</span>') + '</button></div>';
    var box = el('div', 'lb-screen', h); panel.appendChild(box);
    guardClicks(box);
    cam('full', 'map', 600, Math.max(170, Math.ceil(box.scrollHeight + 6)));
    box.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a],[data-i]'); if (!b || UI.going) return;
      if (b.hasAttribute('data-i')) { sfx('tick'); guestSheet(+b.getAttribute('data-i')); return; }
      var a = b.getAttribute('data-a');
      if (a === 'go') nextGuest();
      else if (a === 'bag') bagSheet(r);
      else if (a === 'relics') relicSheet(r);
    });
    if (!save.seen.night && !UI.auto) later(function () {
      if (UI.screen !== 'night') return;
      var T = TUT(); if (T && T.firstTime) try { T.firstTime('night', ['night', 'night-next']); } catch (e) { console.error(e); }
    }, 700);
    autoAct(function () { var b = qs('[data-a=go]', box); if (b) b.click(); }, 300);
  };
  // 點頭像：他的名字、名牌那句（先知道今晚會遇到哪些脾氣）
  function guestSheet(i) {
    var r = save.run, id = r.order[i], en = C.enemies[id]; if (!en) return;
    var hb = C.habits[en.habit] || {}, cur = i === r.idx, done = i < r.idx;
    var lab = en.habitLabel || (C.habitLabels && C.habitLabels.base) || '脾氣';
    var html = '<div class="hd"><h3>' + esc(r.times[i] || '') + '・' + (done ? '打過了' : cur ? '下一位' : '還沒輪到') + '</h3><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
      '<div class="pv-who"><div class="av">' + headHTML(enemySpr(en), 30) + '</div><div><b class="key">' + esc(en.name) + '</b>' + (en.title ? '<small>' + esc(en.title) + '</small>' : '') +
      (en.elite ? '<span class="gtag">菁英</span>' : '') + (en.boss ? '<span class="gtag">打烊前</span>' : '') + '<div class="bl">聲望 ' + enemyHp(id) + '</div></div></div>' +
      '<div class="lb-habit"><span class="lb">' + esc(lab) + '</span><span class="tx">' + esc(hb.line || '') + '</span></div>' +
      (en.phase2 ? '<p class="sub">聲望掉到一半以下，名牌會換一句。</p>' : '') +
      '<div class="two">' + (cur ? '<button type="button" class="lb-btn pri big key" data-a="go">就他了</button>' : '') + '<button type="button" class="lb-btn big key" data-a="close">' + (cur ? '再看看' : '關閉') + '</button></div>';
    var s = floatSheet(html, 'guest');
    s.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('[data-a=go]')) { s.remove(); syncFloat(); nextGuest(); } });
  }
  // 下一位推門進來：門 swing、他走進來說一句（推門那句），接著無縫推近成對決
  function nextGuest() {
    var r = save.run;
    if (UI.going || !r || E.nextStep(r) !== 'fight') return;
    UI.going = true;
    sfx('select');
    qsa('.lb-sheet.float', app()).forEach(function (s) { s.remove(); }); syncFloat();
    var T = TUT(); if (T && T.dismissSoft) try { T.dismissSoft(); } catch (_) {}
    var id = r.order[r.idx], en = C.enemies[id] || {};
    if (en.boss) { later(function () { bossEnterFlow(); }, 200); return; }
    hideActor('q1');
    stg('door', 'swing'); place('f', 'door', enemySpr(en)); stg('sil', 'f', false);
    var intro = C.lines[id] && C.lines[id].intro;
    stgP('walk', 'f', ['in']).then(function () { if (intro) stageSay('f', [].concat(intro)[0], null, 1500); });
    later(function () { if (UI.screen === 'night') beginFight({ enter: true }); }, UI.auto ? 300 : 1100);
  }
  function bagSheet(r) {
    var html = '<div class="hd"><h3>包包 ' + r.bag.length + '／' + E.CFG.bagMax + '</h3><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
      '<p class="sub">點封面看唱片資訊。王牌另外放，不佔包包。</p><div class="lb-pick">' + tileHTML(card(C.aces[r.ace]), { text: false }) + r.bag.map(function (id) { return tileHTML(card(id), { text: false }); }).join('') + '</div>';
    floatSheet(html, 'bag tall');
  }
  function relicSheet(r) {
    var html = '<div class="hd"><h3>發燒配件</h3><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
      '<p class="sub">' + esc((C.rules && C.rules.relics) || '') + '</p><div class="lb-opts">' + (r.relics.length ? r.relics.map(function (id) {
        var x = relicOf(id);
        return '<div class="lb-relic static"><span class="pix">' + relicIcon(id, 30) + '</span><span class="tx"><span class="nm">' + esc(x.name) + '</span><span class="ds">' + esc(x.desc) + '</span></span></div>';
      }).join('') : '<p class="sub">還沒有。序章收尾、打贏菁英或藏家都拿得到。</p>') + '</div>';
    floatSheet(html, 'relics');
  }

  // ======================================================================= 店裡的東西點了會怎樣（牆上唱片＝唱片資訊、箱子＝翻、試聽機＝放一張、老闆／店貓＝一句）
  function binOf(key) {
    var B = C.bins || {}, keys = Object.keys(B);
    if (!keys.length) return null;
    if (B[key]) return key;
    var alias = { jazz: 'jazz', jz: 'jazz', tw: 'tw', taiwan: 'tw', noise: 'noise', nz: 'noise' };
    if (alias[key] && B[alias[key]]) return alias[key];
    return keys[E.fnv1a32(String(key || 'bin')) % keys.length];
  }
  function openBin(key) {
    var k = binOf(key); if (!k) return;
    var b = C.bins[k], ids = (b.ids || []).filter(card);
    var html = '<div class="hd"><h3>' + esc(b.label || '箱子') + '</h3><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
      '<p class="sub">' + esc(line('bin') || '點封面看唱片資訊。') + '</p><div class="lb-rgrid bin">' + ids.map(function (id) { return tileHTML(card(id), {}); }).join('') + '</div>';
    floatSheet(html, 'bin tall');
  }
  function boothIds() {
    var r = save.run, out = [], add = function (id) { var c = card(id); if (c && c.previewUrl && out.indexOf(id) < 0) out.push(id); };
    if (r) { add(C.aces[r.ace]); r.bag.forEach(add); }
    Object.keys(save.shelf).reverse().forEach(add);
    return out.slice(0, 24);
  }
  function openBooth() {
    var ids = boothIds();
    if (!ids.length) { stageSay('o', line('boothEmpty') || '唱片櫃還空著。', 'owner', 2400); return; }
    var html = '<div class="hd"><h3>試聽機</h3><span class="np"></span><button type="button" class="x" data-a="close" aria-label="關閉">✕</button></div>' +
      '<p class="sub">' + esc(line('booth') || '挑一張你唱片櫃裡的，放來聽聽。') + '</p><div class="lb-pick booth">' + ids.map(function (id) { return tileHTML(card(id), { text: false, stars: false, pick: '放這張' }); }).join('') + '</div>';
    var s = floatSheet(html, 'booth tall');
    watchPlaying(qs('.np', s));
    if (UI.screen === 'night' || UI.screen === 'title') stgP('walk', 'p', ['listen'], 110).then(function () { UI.lastSpot = 'listen'; });
    s.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-pick]'); if (!b) return;
      var c = card(b.getAttribute('data-pick')), f = FX(); if (!c || !f || !f.music) return;
      if (!soundOn()) { try { if (f.init) f.init(); if (f.setSound) f.setSound(true); else f.unlockFromGesture(true); } catch (err) { console.error(err); } save.settings.sound = true; persist(); }
      qsa('.lb-ct', s).forEach(function (x) { x.classList.toggle('sel', x === b.closest('.lb-ct')); });
      try { f.music.play(c, { fadeMs: 900 }); } catch (err) { console.error(err); }
      stg('play', true);
    });
  }
  function onStageAction(action, hot) {
    if (!action) return;
    var ci = CI(); if (ci && ci.isOpen()) return;
    if (UI.modal || UI.page || UI.going) return;
    var scr = UI.screen, m;
    if ((m = /^wall-record:(.+)$/.exec(action))) { info(m[1], { from: 'stage' }); return; }
    if (action === 'now') { var f = FX(), c = f && f.music && f.music.current && f.music.current(); if (c) info(c, { from: 'stage' }); return; }
    if (action === 'talk:owner' || action === 'counter' || action === 'owner') { stageSay('o', line('ownerHint', scr === 'scene' ? 'scene' : scr) || line('ownerHint', 'night'), 'owner', 2600); return; }
    if (action === 'cat') { var ct = line('cat'); if (ct) stageSay('o', ct, 'owner', 1600); return; }
    if ((m = /^shop:(.+)$/.exec(action))) { if (scr === 'taipei' && m[1] === 'dip') backFromTaipei(); return; }
    if (action === 'locked') { var lk = line('locked'); if (lk) toast(lk); return; }
    if (scr === 'duel' || scr === 'scene' || scr === 'reward') return;      // 這些畫面只開唱片資訊與老闆那句
    if ((m = /^(?:crate|bin|crates|bins)(?::(.*))?$/.exec(action))) { sfx('tick'); openBin(m[1] || ''); return; }
    if (action === 'listen' || action === 'booth') { sfx('tick'); openBooth(); return; }
    if (/^poster/.test(action)) { sfx('tick'); openRules(); return; }
    if (action === 'door') {
      if (scr === 'title') { var cb = qs('[data-a=cont]', UI.panel) || qs('[data-a=push]', UI.panel); if (cb) cb.click(); return; }   // B-title-door-abandons-run：有存檔＝繼續今晚
      if (scr === 'night' && save.run) { sfx('tick'); guestSheet(save.run.idx); }
    }
  }

  // ======================================================================= end（打烊／散場：走到幾點、贏了幾位、收了哪幾張）
  SCREENS.end = function () {
    var r = save.run;
    if (!r || !r.over) return go('title');
    recordNight(r);
    var S = C.summary || {};
    var clear = r.over === 'clear', la = r.stats.lostAt;
    setTop(nightLabel(r), { help: true, pause: true });
    var panel = UI.panel; panel.classList.add('end');
    cam('strip', 'end', 600);                               // ART-07：結算用小鏡頭，三件事不用捲
    stg('interact', 'none');
    resetPoses(); hideActor('f'); hideActor('q1'); hideActor('q2');
    place('o', 'counter', 'owner');
    if (clear) { place('p', 'duelP', 'player'); stg('dim', 0.6); stg('pose', 'o', 'busy'); }
    else { place('p', 'duelP', 'player'); stg('pose', 'p', 'sit'); }
    var reached = clear ? (r.times[r.times.length - 1] || '02:00') + ' ' + (C.night.closing || '打烊') : ((la && la.time) || (r.prologue === 'pending' ? C.night.prologueTime : '') || '');
    var lostEn = la && C.enemies[la.enemyId];
    var taken = r.stats.taken.filter(card);
    var h = '<div class="lb-scroll"><div class="lb-pad"><div class="lb-endhero"><div class="lb-h1">' + (clear ? '打烊了' : '今晚就到這') + '</div>' +
      (lostEn ? '<p class="sub">輸給「' + esc(lostEn.name) + '」</p>' : '') + '</div>' +
      '<ul class="lb-sum">' +
      '<li><span class="k">' + esc(fill(S.reached || '走到 {time}', { time: '' }).trim()) + '</span><b>' + esc(reached) + '</b></li>' +
      '<li><span class="k">' + esc(fill(S.wins || '贏了 {n} 位', { n: '' }).replace(/\s+/g, ' ').trim()) + '</span><b>' + r.stats.wins + ' 位</b></li>' +
      '<li><span class="k">' + esc(S.taken || '收了') + '</span><b>' + taken.length + ' 張</b></li></ul>' +
      (taken.length ? '<div class="lb-wall">' + taken.map(function (id) { return coverHTML(card(id), {}); }).join('') + '</div>' : '<p class="sub">' + esc(S.none || '這晚沒收唱片') + '</p>');
    if (save.unlocks.secondNightTeaser) h += '<div class="lb-teaser"><div class="sil">' + pix(labSpr().e7, 40) + '</div><div><b>' + esc(C.secondNight.line) + '</b><div class="sub">' + esc(C.secondNight.label) + '</div></div></div>';
    h += '<div class="lb-endmore"><button type="button" class="lb-btn key" data-a="shelf">唱片櫃</button><button type="button" class="lb-btn key" data-a="taipei">' + esc(line('taipeiLink') || '出門看看（台北地圖・預告）') + '</button></div>';
    h += '</div></div><div class="foot lb-endbtns"><button type="button" class="lb-btn pri big wide key" data-a="again">' + esc(S.again || '再來一夜') + '</button></div>';
    var box = el('div', 'lb-screen end', h); panel.appendChild(box);
    sfx(clear ? 'win' : 'lose');
    box.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-a]'); if (!b || UI.going) return;
      var act = b.getAttribute('data-a');
      if (act === 'again') {
        UI.going = true;
        var f = FX(); if (f && save.settings.sound && !f.soundOn()) try { f.unlockFromGesture(true); } catch (_) {}
        stg('dim', 1); stg('pose', 'p', null);
        startAgain();
      } else if (act === 'shelf') openPage('shelf');
      else if (act === 'taipei') go('taipei', { back: 'end' });
    });
    if (UI.auto && UI.auto.until === 'end') UI.auto = null;
  };

  // ======================================================================= 台北地圖預告（同一個渲染器換一份 JSON）
  SCREENS.taipei = function (p) {
    UI.taipeiBack = p.back || 'title';
    setTop('台北踢館地圖<small>預告・示意</small>', { links: [[line('backToShop') || '回店裡', backFromTaipei, 'back']] });
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
    renderShelf(pg, p.filter || 'all');
  }
  function closePage() {
    var pg = UI.page; if (!pg) return;
    UI.page = null;
    if (pg.kind === 'shelf') { Object.keys(save.shelf).forEach(function (id) { save.shelf[id].seen = true; }); persist(); }
    pg.el.remove();
    if (pg.held) duelHold(false);
  }
  function renderShelf(pg, filter) {
    pg.innerHTML = '';
    var total = Object.keys(C.cards).length;
    var ids = Object.keys(save.shelf).filter(card).reverse();
    var shown = ids.filter(function (id) { return filter === 'new' ? isNewOnShelf(id) : filter === 'ace' ? !!card(id).tier : true; });
    var bar = el('div', 'lb-top page', '<div class="tt">唱片櫃<small>已認識 ' + ids.length + '／' + total + '</small></div><button type="button" class="lnk" data-a="close">關閉</button>');
    pg.appendChild(bar);
    qs('[data-a=close]', bar).addEventListener('click', function (e) { stopEv(e); closePage(); });
    var body = el('div', 'lb-scroll');
    body.innerHTML = '<div class="lb-pad"><div class="lb-filters">' + [['all', '全部'], ['new', '今晚新認識'], ['ace', '王牌']].map(function (f) { return '<button type="button" class="lb-btn' + (filter === f[0] ? ' on' : '') + '" data-f="' + f[0] + '">' + f[1] + '</button>'; }).join('') + '</div>' +
      (shown.length ? '<div class="lb-wall">' + shown.map(function (id) { return coverHTML(card(id), { isNew: isNewOnShelf(id) }); }).join('') + '</div>' : '<p class="sub">' + (ids.length ? '這一格是空的。' : '還沒認識任何一張。推門進去吧。') + '</p>') +
      '<p class="sub" style="margin-top:14px">點封面＝唱片資訊。客人丟過的唱片、你收的、老闆送的，都會收進這裡。</p></div>';
    pg.appendChild(body);
    body.addEventListener('click', function (e) { var f = e.target.closest && e.target.closest('[data-f]'); if (f) renderShelf(pg, f.getAttribute('data-f')); });
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
    while (!d.over && g++ < 80) { var evs = E.resolveTurn(d, pol(d, R, mem), UI.force ? { debugOutcome: UI.force } : undefined); if (!evs || !evs.length) break; }
    persist();
    unmountDuel();
    onDuelEnd({ duel: d });
  }

  // ======================================================================= 除錯鉤子（?debug=1）
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
      duel: function () { return save.run && save.run.duel ? E.view(save.run.duel) : null; },
      rawDuel: function () { return save.run && save.run.duel; },
      screen: function () { return UI.screen; },
      trail: function () { return UI.trail.slice(); },
      cam: function () { return UI.camName; },
      going: function () { return !!UI.going; },
      autoplay: function (policy, o) { o = o || {}; UI.auto = { policy: policy || 'novice', until: o.until || 'duelEnd', animated: !!o.animated, tut: !!o.tut, ace: o.ace || null }; kick(); return true; },
      stop: function () { UI.auto = null; },
      seed: function (n) { UI.seedOverride = String(n); return seedKey(); },
      // 讓之後每一手都照這個結果（e2e #32：7 手同色 → 唱片丟完）；null 取消
      force: function (o) { UI.force = o || null; return UI.force; },
      // 跳到今晚第 idx 位（序章算完成）：清掉進行中的對決與待選
      skipTo: function (idx) {
        var r = save.run; if (!r) return false;
        leaveDuel(); r.duel = null; r.duelEnemy = null; r.pending = null; r.prologue = 'done'; r.idx = Math.max(0, Math.min(r.order.length - 1, idx | 0)); r.over = null;
        save.prologueDone = true; persist(); go('night'); return true;
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
      rules: openRules, openPage: openPage, go: go, replayTutorial: replayTutorial, stageAction: onStageAction
    };
  }

  // ======================================================================= boot
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
    return W.DipLabStage.mount(UI.stageHost, {
      shop: 'dip', cards: C.cards, coverBase: './', sprites: labSpr(), player: function () { return save && save.player ? playerAv() : { head: 'neat' }; },
      camera: 'full', screen: 'title', speed: speed, onAction: onStageAction
    }).then(function (st) { UI.stage = st; st.onAction = onStageAction; configTut(); return st; }, function (e) { console.error(e); UI.stageHost.classList.add('nostage'); return null; });
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
  function boot() {
    if (UI.booted) return; UI.booted = true;
    E = W.DipLabEngine; C = W.DipLabContent;
    if (!E || !C || !app() || !E.newRun) { if (app()) app().innerHTML = '<div class="lb-boot">載入失敗，請重新整理。</div>'; return; }
    D.body.classList.add('in-battle');
    svhFallback();
    save = loadSave();
    var f = FX();
    if (f) { try { if (f.init) f.init(); if (f.setSpeed) f.setSpeed(speed()); } catch (e) { console.error(e); } }
    // 對決以外：一首試聽自然放完就接下一首（包包裡的）
    if (f && f.music && f.music.onEnded) f.music.onEnded(function (c) {
      if (!c || UI.screen === 'duel' || !soundOn()) return;
      var next = c, r = save.run;
      if (r && (UI.screen === 'night' || UI.screen === 'reward')) {
        var pool = (r.bag || []).map(card).filter(function (x) { return x && x.previewUrl && x.id !== c.id; });
        if (pool.length) next = pickR(pool);
      }
      setTimeout(function () { if (UI.screen !== 'duel' && soundOn()) try { f.music.play(next, { fadeMs: 1200 }); } catch (e) { console.error(e); } }, 400);
    });
    var ci = CI();
    if (ci) {
      ci.config({ onSoundUnlock: function () { save.settings.sound = true; persist(); }, cardOf: function (id) { return card(id); } });
      ci.on('close', function () { flushToasts(); });
    }
    labSpr();
    if (DEBUG) installDebug();
    buildShell();
    configTut();
    if (UI.discardedOld) persist();
    // 舞台最多等 1.2 s：標題要在 2 s 內出來；晚到的舞台照樣接上（B-slow-stage-empty-scene：標題的鈕等舞台好了才收點擊）
    var started = false;
    var start = function () { if (started) return; started = true; UI.firstScreen = true; go('title'); UI.firstScreen = false; };
    var stageReady = false;
    mountStage().then(function (st) {
      stageReady = true;
      if (!started) start();
      else if (st && UI.screen === 'title') { UI.camQuick = true; go('title'); }
      D.body.classList.remove('stage-wait');
    });
    setTimeout(function () { if (!stageReady) D.body.classList.add('stage-wait'); start(); setTimeout(function () { D.body.classList.remove('stage-wait'); }, 2500); }, 1200);
  }
  W.DipLabUI = { boot: boot, go: go, info: info, openRules: openRules, openHelp: openRules, openSettings: openSettings, openPage: openPage,
    sprite: sprHTML, relicIcon: relicIcon, labSpr: labSpr, get stage() { return UI.stage; }, get save() { return save; }, get screen() { return UI.screen; } };
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot); else setTimeout(boot, 0);
})();
