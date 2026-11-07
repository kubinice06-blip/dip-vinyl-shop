/* stage.js：DipLabStage，game-lab 的常駐舞台（SPEC-v2 §2、§5.3）。包住 DipShop（shop.js），給 ui.js／duel.js／tutorial.js 用。
 *
 *   DipLabStage.mount(hostEl, { shop:'dip', cards, coverBase:'./', sprites: labSpr(), spritePal: PIX_PAL, player: avatar|fn, onAction(action, hot) })
 *     → Promise<Stage>        // 整個 session 只 mount 一次；換畫面只換鏡頭（camera）與下方面板
 *
 *   Stage.load(shopId) → Promise              換一家店（台北地圖預告）；同一個 host
 *   Stage.camera(name, { ms, screen, panelMin }) → Promise
 *       整數場景像素插值；同步設定 host 高度；ms 0＝直接切；strip 在可視高 <600 自動換 stripS；
 *       full／reward 有矮螢幕規則（從牆頂往下裁到 minH，再不夠才降倍率）；prefers-reduced-motion＝150 ms 淡入淡出
 *   Stage.put(id, spot | [x,y,outside], sprite?) ; walk(id, spots[], speed?) → Promise ; hide(id,on) ; sil(id,on) ; sprite(id,spr)
 *   Stage.say(id, text, { tone:'owner'|null, ms = 2600 })   ms 0＝不自動收；text 空＝收掉
 *   Stage.pose(id, 'atk'|'hurt'|'ko'|'warn'|'dig'|'busy'|'sit'|null, ms?)
 *   Stage.emote(id, 'anger'|'record'|'note'|'excl'|'sweat'|'tea'|null, ms?)   頭上像素小圖示（不用 emoji）
 *   Stage.door('open'|'swing'|'close') ; Stage.play(on) ; Stage.flash(color='#fff', ms=160)（只閃舞台；減少動態不閃） ; Stage.dim(k)
 *   Stage.tag(id, text, 'e'|'p', 'L'|'R') ; Stage.untag(id?) ; Stage.float(id, text|{text,sub}, cls?)
 *   Stage.anchor(id) → HTMLElement (#anc-<id>) ; Stage.hotRect(hotId) → DOMRect
 *   Stage.highlight([{ ids:[hotId…], label }]) ; highlight([]) 清掉
 *   Stage.hotspots() ; Stage.tap(hotId) ; Stage.reveal(ms) ; Stage.interact(mode) ; Stage.allow(fn|patterns|null)
 *   Stage.legacy(name) → spot ; Stage.destroy()
 *   Stage.duelIn({ foe, ms }) / duelOut({ screen }) → Promise   進出對決的走位＋鏡頭（選用的便利函式）
 *   舊 Stage 相容：anger notes busy dig show foe setSprite actor cls stamp clearStamps unmount
 *
 * 規則：整支包在 IIFE；只掛 window.DipLabStage；讀 dip-character.js 的 avatarRows／PIX_PAL，不宣告同名全域；不碰 localStorage。
 */
(function () {
  'use strict';
  var W = window, D = document;
  var QS = {};
  try { new URLSearchParams(location.search).forEach(function (v, k) { QS[k] = v; }); } catch (_) {}

  // 舊 POS 名稱 → 新 spot（SPEC-v2 §5.2）。ui.js 的字串不必改。
  var ALIAS = {
    'p.door': 'door', 'p.browse': 'browse', 'p.pay': 'pay', 'p.leaving': 'leave', 'p.atdoor': 'atdoor', 'p.duel': 'duelP', 'p.map': 'map',
    'o.counter': 'counter', 'o.aisle': 'aisle', 'o.frontleft': 'frontleft', 'o.dig1': 'dig1', 'o.dig2': 'dig2', 'o.dig3': 'dig3', 'o.between': 'between',
    'f.out': 'out', 'f.door': 'door', 'f.in': 'in', 'f.duel': 'duelE', 'f.near': 'near', 'f.visit': 'visit',
    'q.q1': 'q1', 'q.q2': 'q2'
  };
  // 矮螢幕規則：面板最少要留多高（SPEC-v2 §2）
  var PANEL_MIN = { title: 130, scene: 150, map: 200, reward: 260, node: 260, end: 260, taipei: 92 };
  var CAM_PANEL = { full: 150, reward: 260 };
  // 每個畫面舞台上哪些東西可以點（SPEC-v2 §5.4）
  var INTERACT = {
    all: null,
    title: null, map: null,
    scene: ['rack:*', 'now'],
    duel: ['rack:*', 'now', 'owner'],
    node: [], reward: [], none: [],
    taipei: ['pin-*']
  };
  var layoutCache = {};

  function visH() {
    var h = W.innerHeight || 664, v = W.visualViewport;
    if (v && v.height) h = Math.min(h, v.height);
    return h;
  }
  function reduced() { try { return !!(W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (_) { return false; } }
  function layoutURL(id, base) { return (base || 'shops/') + encodeURIComponent(id) + '.json'; }
  function loadLayout(id, base) {
    if (id && typeof id === 'object') return Promise.resolve(id);
    var key = (base || '') + '|' + id;
    if (!layoutCache[key]) {
      layoutCache[key] = fetch(layoutURL(id, base), { cache: 'no-cache' }).then(function (r) {
        if (!r.ok) throw new Error('layout ' + id + ' ' + r.status);
        return r.json();
      }).catch(function (e) { delete layoutCache[key]; throw e; });
    }
    // 每次給一份新的（舞台會在 layout 上記狀態，例如地圖圖釘）
    return layoutCache[key].then(function (L) { return JSON.parse(JSON.stringify(L)); });
  }
  function matcher(pats) {
    if (pats == null) return null;
    if (typeof pats === 'function') return pats;
    var res = [].concat(pats).map(function (p) { return new RegExp('^' + String(p).replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$'); });
    return function (h) { for (var i = 0; i < res.length; i++) if (res[i].test(h.id)) return true; return false; };
  }

  // 矮螢幕規則（純函式，test/shop.test.mjs 直接測）：c＝layout 的鏡頭 {y,h,minH,anchor}；o＝{ dpr, dev（依寬度的最大裝置像素倍率）, avail（舞台可用 CSS 高）}
  // 放得下→原樣；放不下→照 anchor 從牆頂往下裁（留腳）到 minH；再不夠才把倍率降一級（×3→×2.667→…→×2）。回 {y,h,dev|null}
  function fitCamera(c, o) {
    if (c.minH == null || !(o.avail > 0)) return { y: c.y, h: c.h, dev: null };
    var dpr = o.dpr || 1, dev0 = o.dev || Math.round(3 * dpr), minDev = Math.max(1, Math.floor(2 * dpr + 1e-6));
    function crop(rows, dev) {
      rows = Math.max(1, Math.min(c.h, rows));
      var y = c.anchor === 'top' ? c.y : c.anchor === 'center' ? c.y + Math.floor((c.h - rows) / 2) : c.y + c.h - rows;
      return { y: y, h: rows, dev: dev };
    }
    for (var d = dev0; d >= minDev; d--) {
      var rows = Math.floor(o.avail / (d / dpr) + 1e-6), dv = d === dev0 ? null : d;
      if (rows >= c.h) return { y: c.y, h: c.h, dev: dv };
      if (rows >= c.minH) return crop(rows, dv);
    }
    return crop(c.minH, minDev < dev0 ? minDev : null);
  }
  // 對決鏡頭：可視高 <600 換 stripS（兩個對決者全身都在）
  function pickCamera(name, cams, vh) { return (name === 'strip' && cams && cams.stripS && vh < 600) ? 'stripS' : name; }

  function mount(host, opts) {
    opts = Object.assign({}, opts || {});
    if (!W.DipShop) return Promise.reject(new Error('DipShop not loaded'));
    var shopId = opts.shop || 'dip';
    if (QS.debug === '1' && QS.shop && !opts.layout) shopId = QS.shop;   // ?debug=1&shop=basement
    return loadLayout(opts.layout || shopId, opts.layoutBase).then(function (L) { return makeStage(host, L, opts); });
  }

  function makeStage(host, L0, opts) {
    var shop = null, L = L0, camName = 'full', interactMode = 'all', destroyed = false, stamps = [];
    var timers = [];
    function T(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
    function speed() { var k = typeof opts.speed === 'function' ? opts.speed() : (opts.speed || 1); return k > 0 ? k : 1; }
    function sfx(n) {
      if (opts.sfx === false) return;
      if (typeof opts.sfx === 'function') { try { opts.sfx(n); } catch (e) { console.error(e); } return; }
      var f = W.DipLabFx; if (f && typeof f.sfx === 'function') try { f.sfx(n); } catch (e) { console.error(e); }
    }
    function avatarRowsOf(av) { return (typeof W.avatarRows === 'function') ? W.avatarRows(av) : null; }
    function resolveSprite(spr) {
      if (spr === 'player') {
        var pl = typeof opts.player === 'function' ? opts.player() : opts.player;
        if (Array.isArray(pl)) return pl;
        if (pl && typeof pl === 'object') return avatarRowsOf(pl);
        return avatarRowsOf({ head: 'neat' });
      }
      if (spr && typeof spr === 'object' && !Array.isArray(spr)) return avatarRowsOf(spr);
      return null;
    }
    function spotName(id, key) {
      if (key == null) return null;
      if (Array.isArray(key) || typeof key === 'object') return key;
      var sp = L.spots || {};
      if (sp[key]) return key;
      var g = String(id || '').charAt(0), a = ALIAS[g + '.' + key] || ALIAS[key];
      if (a && sp[a]) return a;
      return null;
    }
    function hotId(id) {
      if (typeof id !== 'string') return id;
      if (id.indexOf('rec:') === 0) return 'rack:' + id.slice(4);
      if (id.indexOf('wall-record:') === 0) { var cid = id.slice(12); return shop && shop.hotspots().some(function (h) { return h.id === 'now' && h.action === id; }) && !shop.hotspots().some(function (h) { return h.id === 'rack:' + cid; }) ? 'now' : 'rack:' + cid; }
      return id;
    }
    function applyInteract() {
      if (!shop) return;
      var pats = INTERACT.hasOwnProperty(interactMode) ? INTERACT[interactMode] : null;
      shop.allow(customAllow || matcher(pats));
    }
    var customAllow = null;

    function mountShop(layout) {
      L = layout;
      shop = W.DipShop.mount(host, L, {
        cards: opts.cards || W.DipLabCards || {},
        coverBase: opts.coverBase || './',
        sprites: opts.sprites,
        spritePal: opts.spritePal || (typeof PIX_PAL !== 'undefined' ? PIX_PAL : null),   // eslint-disable-line no-undef
        resolveSprite: resolveSprite,
        sparkle: opts.sparkle !== false && !QS.nosparkle,
        fixedTime: QS.shopT != null ? +QS.shopT : undefined,
        speed: speed,
        onAction: function (action, hot) { if (typeof stage.onAction === 'function') stage.onAction(action, hot); }
      });
      shop.face('f', 1).face('p', -1);
      shop.sprite('p', 'player');   // 你的小人（還沒 put 之前不畫）
      applyInteract();
      return shop;
    }

    // ---------------- 鏡頭
    function fitCam(name, c, o) {
      var v = shop.view();
      var pm = o.panelMin != null ? o.panelMin : (PANEL_MIN[o.screen] != null ? PANEL_MIN[o.screen] : (CAM_PANEL[name] != null ? CAM_PANEL[name] : 150));
      return fitCamera(c, { dpr: v.dpr, dev: v.baseDev, avail: visH() - 32 - pm });
    }
    var lastCam = { name: 'full', o: {} }, tweening = 0;
    function camera(name, o) {
      o = o || {};
      lastCam = { name: name, o: { screen: o.screen, panelMin: o.panelMin, noAuto: o.noAuto } };
      var cams = L.cameras || {};
      if (!o.noAuto) name = pickCamera(name, cams, visH());
      var c = cams[name] || cams.full || { y: 0, h: L.size[1] };
      camName = name;
      shop.sparkle(opts.sparkle !== false && !QS.nosparkle && !/^strip/.test(name));
      var tgt = fitCam(name, c, o), ms = o.ms || 0;
      if (ms > 0 && reduced()) {
        return new Promise(function (res) {
          host.classList.add('ds-fade');
          T(function () { shop.setView(tgt); host.classList.remove('ds-fade'); T(res, 75); }, 75);
        });
      }
      tweening++;
      return shop.tweenView(tgt, ms).then(function () { tweening--; }, function (e) { tweening--; throw e; });
    }
    // 可視高改變（轉向、Safari 工具列收起來、鍵盤）：用同一個鏡頭重新套矮螢幕規則
    var rzT = 0;
    function onResize() {
      clearTimeout(rzT);
      rzT = setTimeout(function () { if (!destroyed && shop && !tweening) camera(lastCam.name, Object.assign({ ms: 0 }, lastCam.o)); }, 150);
    }
    W.addEventListener('resize', onResize);
    if (W.visualViewport) W.visualViewport.addEventListener('resize', onResize);

    // ---------------- 公開 API
    var stage = {
      get shopId() { return L.id; },
      get layout() { return L; },
      get canvas() { return shop && shop.canvas; },
      get shop() { return shop; },
      host: host,
      onAction: opts.onAction || null,
      ALIAS: ALIAS,
      load: function (id, o) {
        o = o || {};
        return loadLayout(id, opts.layoutBase).then(function (layout) {
          if (destroyed) return stage;
          stage.clearStamps();
          shop.destroy(); mountShop(layout);
          return camera(o.camera || 'full', { ms: 0, screen: o.screen }).then(function () { return stage; });
        });
      },
      camera: camera,
      cameraName: function () { return camName; },
      put: function (id, key, spr) {
        if (spr != null && spr !== undefined) shop.sprite(id, spr);
        var k = spotName(id, key);
        if (k == null) { if (key != null && typeof console !== 'undefined') console.warn('[stage] unknown spot', id, key); return stage; }
        shop.put(id, k, spr);
        return stage;
      },
      walk: function (id, keys, spd) {
        var path = [].concat(keys || []).map(function (k) { return spotName(id, k); }).filter(function (k) { return k != null; });
        return shop.walk(id, path, spd);
      },
      hide: function (id, on) { shop.hide(id, on); return stage; },
      sil: function (id, on) { shop.sil(id, on); return stage; },
      sprite: function (id, spr) { shop.sprite(id, spr); return stage; },
      has: function (id) { return shop.has(id); },
      pos: function (id) { return shop.pos(id); },
      say: function (id, text, o) { return shop.say(id, text, o); },
      pose: function (id, name, ms) {
        if (ms == null && (name === 'atk' || name === 'hurt')) ms = 200;
        shop.pose(id, name, ms);
        return stage;
      },
      emote: function (id, kind, ms) { shop.emote(id, kind, ms); return stage; },
      door: function (mode) { if (mode === 'open' || mode === 'swing') sfx('bell'); shop.door(mode); return stage; },
      play: function (on) { shop.play(on); return stage; },
      dim: function (k) { shop.dim(k); return stage; },
      flash: function (color, ms) { shop.flash(color, ms); return stage; },
      tag: function (id, text, side, lr) { return shop.tag(id, text, side, lr); },
      untag: function (id) { shop.untag(id); return stage; },
      float: function (id, text, cls) { return shop.float(id, text, cls); },
      anchor: function (id) { return shop.anchor(id); },
      hotRect: function (id) { return shop.hotRect(hotId(id)); },
      highlight: function (list) { shop.highlight(list || []); return stage; },
      hotspots: function () { return shop.hotspots(); },
      tap: function (id, o) { return shop.tap(hotId(id), o); },
      reveal: function (ms) { shop.reveal(ms); return stage; },
      spotlight: function (id, text) { return shop.spotlight(id ? hotId(id) : null, text); },
      interact: function (mode) { interactMode = mode || 'all'; customAllow = null; applyInteract(); return stage; },
      allow: function (f) { customAllow = matcher(f); applyInteract(); return stage; },
      legacy: function (name, id) {
        if (name == null) return null;
        var s = String(name), g = id ? String(id).charAt(0) : (s.indexOf('.') > 0 ? s.charAt(0) : ''), k = s.indexOf('.') > 0 ? s.slice(s.indexOf('.') + 1) : s;
        return spotName(g || 'p', k);
      },
      spot: function (name) { var s = (L.spots || {})[name]; return s ? s.slice() : null; },
      view: function () { return shop.view(); },
      cssOf: function (x, y) { return shop.hostCss(x, y); },
      bump: function () { shop.bump(); return stage; },
      // ---- 進／出對決的舞台部分（SPEC-v2 §3.7，選用；「！」與黑條由 fx.encounterFx 負責，這裡只管走位與鏡頭，兩者同時跑）
      // o: { foe: sprite, ms = 600, walkSpeed = 96 }。他走到 duelE、你走到 duelP、老闆回櫃檯，同時鏡頭推近成橫條。
      duelIn: function (o) {
        o = o || {};
        if (o.foe != null) shop.sprite('f', o.foe);
        var sp = o.walkSpeed || 96, jobs = [];
        [['f', 'duelE'], ['p', 'duelP'], ['o', 'counter']].forEach(function (x) {
          var id = x[0], to = x[1], at = shop.pos(id), s = (L.spots || {})[to];
          if (!s) return;
          if (!at || at.hidden || !shop.has(id)) { if (id !== 'o' || shop.has('o')) shop.put(id, to); return; }
          if (Math.round(at.x) === s[0] && Math.round(at.y) === s[1]) return;
          jobs.push(shop.walk(id, at.outside ? ['door', to] : [to], sp));
        });
        stage.interact('duel');
        jobs.push(camera('strip', { ms: o.ms == null ? 600 : o.ms }));
        return Promise.all(jobs).then(function () { return stage; });
      },
      duelOut: function (o) {
        o = o || {};
        shop.untag(); ['f', 'p'].forEach(function (id) { shop.say(id, null); shop.emote(id, null); });
        stage.interact(o.interact || 'scene');
        return camera(o.camera || 'full', { ms: o.ms == null ? 600 : o.ms, screen: o.screen || 'scene' }).then(function () { return stage; });
      },
      // ---- 舊 Stage 相容（ui.js v1 的呼叫）
      anger: function (on, id) { shop.emote(id || 'f', on ? 'anger' : null); return stage; },
      notes: function (on) { shop.play(!!on); return stage; },
      busy: function (on) { shop.pose('o', on ? 'busy' : null); return stage; },
      dig: function (id, on) { shop.pose(id, on ? 'dig' : null); return stage; },
      show: function (id, on) { shop.hide(id, !on); return stage; },
      foe: function (spr) { shop.sprite('f', spr); return stage; },
      setSprite: function (id, spr) { shop.sprite(id, spr); return stage; },
      actor: function (id) { return shop.anchor(id); },
      cls: function (id, c, on) { shop.pose(id, on ? c : null); return stage; },
      stamp: function (text, sub, cls, ms) {
        var s = D.createElement('div'); s.className = 'ds-stamp' + (cls ? ' ' + cls : '');
        s.textContent = text; if (sub) { var sm = D.createElement('small'); sm.textContent = sub; s.appendChild(sm); }
        host.appendChild(s); stamps.push(s);
        if (ms) T(function () { s.style.transition = 'opacity .35s'; s.style.opacity = '0'; T(function () { s.remove(); }, 400); }, ms / speed());
        return s;
      },
      clearStamps: function () { stamps.forEach(function (s) { s.remove(); }); stamps = []; return stage; },
      unmount: function () {   // 舊介面：v2 舞台常駐，不拆；只收掉暫時的東西
        stage.clearStamps(); shop.untag(); shop.highlight([]);
        ['p', 'f', 'o'].forEach(function (id) { shop.say(id, null); shop.pose(id, null); shop.emote(id, null); });
        return stage;
      },
      destroy: function () {
        destroyed = true; timers.forEach(clearTimeout); clearTimeout(rzT);
        W.removeEventListener('resize', onResize); if (W.visualViewport) W.visualViewport.removeEventListener('resize', onResize); timers = []; stage.clearStamps(); if (shop) shop.destroy(); shop = null; }
    };

    mountShop(L0);
    // 預設三人：老闆在櫃檯（layout.actors）、你、他（選填）
    if (opts.p) stage.put('p', opts.p, 'player');
    if (opts.f) stage.put('f', opts.f, opts.fSpr || 'e0');
    return camera(opts.camera || 'full', { ms: 0, screen: opts.screen }).then(function () { return stage; });
  }

  W.DipLabStage = { mount: mount, loadLayout: loadLayout, fitCamera: fitCamera, pickCamera: pickCamera, ALIAS: ALIAS, PANEL_MIN: PANEL_MIN, INTERACT: INTERACT, version: '2.0' };
})();
