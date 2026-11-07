/* stage.js：DipLabStage，game-lab 的常駐舞台（SPEC-v2 §2、§5.3）。包住 DipShop（shop.js），給 ui.js／duel.js／tutorial.js 用。
 * v3.1：本店換成斜俯視 3/4 的店（路線 P2，shops/dip.json projection:'oblique34'）；API 不變。唱盤區的幾何（轉盤中心、相撞點、落點、弧高）都從 layout.duel 讀，
 *       手的位置問 shop.handAt（DipLabChars 有錨點就用錨點）。小人：window.DipLabChars 有就用，沒有就用原本的 16×16 小人 ×3。
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
 *   唱盤區（v3，他左白台／你右黑台／老闆裁判）：
 *   Stage.clash({ kind, p:{attr,card,ace}, e:{attr,card}, seeThrough, toE, toP, speed, reduced, onHit(side), onLand(side,card) }) → Promise（≈1460 ms÷速度）
 *   Stage.clearClash(ms=150) ; hold(side, {sleeve:id}|'ace'|null) ; deck(side, {rec:{attr,card,kind}, state:'spin'|'land'|'armMid'}|null)
 *   Stage.flag('e'|'p'|null, ms) ; throwDisc(from, to, {attr, kind, arc, ms}) → Promise ; burst(x,y,size,color,ms) ; shatter(at, attr) ; flatDisc(at, attr, o)
 *   Stage.pause(on) ; speed(k) ; clashState()
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
  var CAM_PANEL = { full: 150, scene: 150, map: 200, reward: 260 };
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
    if (o.fine) {   // 細格子世界（倍率非整數）：先裁到 minH，再不夠才把倍率每次降 8%，最多降到 70%
      var full = Math.floor(o.avail / (dev0 / dpr) + 1e-6);
      if (full >= c.h) return { y: c.y, h: c.h, dev: null };
      var cropF = function (rows, dev) { rows = Math.max(1, Math.min(c.h, rows)); var y = c.anchor === 'top' ? c.y : c.anchor === 'center' ? c.y + Math.floor((c.h - rows) / 2) : c.y + c.h - rows; return { y: y, h: rows, dev: dev }; };
      if (full >= c.minH) return cropF(full, null);
      for (var f = 0.92; f >= 0.69; f -= 0.08) { var dv = dev0 * f, rw = Math.floor(o.avail / (dv / dpr) + 1e-6); if (rw >= c.minH) return cropF(rw, dv); }
      return cropF(c.minH, dev0 * 0.7);
    }
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
        resolveAvatar: function (spr) { if (spr !== 'player') return null; var pl = typeof opts.player === 'function' ? opts.player() : opts.player; return (pl && typeof pl === 'object' && !Array.isArray(pl)) ? pl : { head: 'neat' }; },
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
      return fitCamera(c, { dpr: v.dpr, dev: v.baseDev, avail: visH() - 32 - pm, fine: !!(L.fine || L.projection) });
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

    // ======================================================================= 唱盤區（v3；DESIGN「兩座唱盤對峙」）
    // 他在左（白台）、你在右（黑台）、老闆在櫃檯正中當裁判。時間 t＝你點屬性鈕那一刻（ms，×速度）；
    // clash() 每格算出所有東西的位置，填進 shop.state.fx／decks，並設定兩人的手臂、手上的東西、後退。
    var TT = { items: [], decks: {}, held: {}, paused: false, speedK: 1, off: null, fast: false, last: 0, seq: 0 };
    var TTK = { relP: 200, windE: 260, relE: 300, col: 520, sep: 560, go: 600, hit: 760, home: 1180, back: 1460, done: 1500, next: 2060, clear: 2360 };
    var ATTRC = { c: '#1f5fae', o: '#6a3fa0', h: '#c11628' };
    function ttK() { return L.spriteScale || 1; }
    function sid(side) { return side === 'e' || side === 'f' ? 'f' : 'p'; }
    function sideOf(id) { return id === 'f' ? 'e' : 'p'; }
    function lerp(a, b, u) { return a + (b - a) * u; }
    function seg(t, a, b) { return Math.max(0, Math.min(1, (t - a) / (b - a))); }
    function arcP(S0, E0, h, u) { return [lerp(S0[0], E0[0], u), lerp(S0[1], E0[1], u) - 4 * h * u * (1 - u)]; }
    function spinFr(t, t0, ms) { return Math.floor(Math.max(0, t - t0) / (ms || 100)) & 3; }
    // 幾何：layout.duel 有寫就用，沒寫就從唱盤台道具與站位算
    function geo() {
      var D = L.duel || {}, K = ttK(), sp = L.spots || {};
      function deckC(side) {
        var k = side === 'e' ? 'deckE' : 'deckP'; if (D[k]) return D[k];
        var pr = (L.props || []).filter(function (o) { return o.id === (side === 'e' ? 'deck-e' : 'deck-p'); })[0];
        var spec = pr && W.DipShop.O34 && W.DipShop.O34.PROPS[pr.type];
        if (spec && spec.center) { var c = spec.center(pr); return [Math.round(c[0]), Math.round(c[1])]; }
        return pr ? [pr.x - (pr.w || 44) / 2 + 18, pr.base - 29] : (side === 'e' ? [sp.duelE[0] + 40, sp.duelE[1] - 30] : [sp.duelP[0] - 40, sp.duelP[1] - 30]);
      }
      var fE = sp.duelE || [0, 0], fP = sp.duelP || [0, 0];
      var C = D.clash || [Math.round((fE[0] + fP[0]) / 2) - 2 * K, fE[1] - 12 * K];
      var rug = D.rug || [Math.round((fE[0] + fP[0]) / 2), fE[1] - 8];
      // 弧高與特效間距：舊格子世界（448 寬、小人 ×5）的數字是預設；斜俯視店在 layout.duel.arc 給自己的
      var A = Object.assign({ low: 10, high: 44, mid: 36, bounce: 15, tiny: 3, drop: 6 }, D.arc || {});
      return { K: K, PE: deckC('e'), PP: deckC('p'), C: C, rug: rug, ref: sp.ref || sp.counter, arc: A, gap: D.gap || (L.projection ? 4 : 6), dropDx: D.dropDx || (L.projection ? 18 : 22), fxK: D.fxK || (L.projection ? 0.6 : 1) };
    }
    // 手的位置（場景座標）：小人腳底 + 格子（flip 後朝對手）
    function handAt(id, kind, base) {
      if (typeof shop.handAt === 'function') { var hq = shop.handAt(id, kind || 'none'); if (hq) { if (base) { var cur = shop.pos(id); if (cur) { hq[0] += Math.round(base.x) - Math.round(cur.x); hq[1] += Math.round(base.y) - Math.round(cur.y); } } return [Math.round(hq[0]), Math.round(hq[1])]; } }
      var a = base || shop.pos(id) || { x: 0, y: 0 }, K = ttK(), hp = (W.DipShop.HANDAT || {})[kind || 'none'] || [13, 10];
      var col = id === 'p' ? 15 - hp[0] : hp[0];
      return [Math.round(a.x) - 8 * K + col * K + (K >> 1), Math.round(a.y) - 15 * K + 1 + hp[1] * K + (K >> 1)];
    }
    function hitAt(id, base) { var a = base || shop.pos(id), K = ttK(); return [Math.round(a.x) + (id === 'f' ? 2 : -2) * K, Math.round(a.y) - 9 * K]; }
    // 老闆舉旗的位置：旗竿下半段握在手上，旗尖指贏家（他贏＝老闆轉向左）
    function flagPos(side) {
      if (typeof shop.handAt === 'function') { shop.flip('o', side === 'e'); var hq = shop.handAt('o', 'flag'); if (hq) return { x: Math.round(hq[0]), y: Math.round(hq[1]), side: side }; }
      var K = ttK(), a = shop.pos('o') || { x: 0, y: 0 }, hp = (W.DipShop.HANDAT || {}).flag || [14, 5], col = side === 'e' ? 15 - hp[0] : hp[0];
      return { x: Math.round(a.x) - 8 * K + col * K + (K >> 1), y: Math.round(a.y) - 15 * K + 1 + hp[1] * K + (K >> 1) - 16, side: side };
    }
    function emptyFx() { return { discs: [], trails: [], sparks: [], shards: [], notes: [], dots: [], excl: [], flag: null, decks: {} }; }
    function ttTick(rt) {
      if (!shop) return;
      var dt = Math.max(0, (rt - TT.last) * 1000); TT.last = rt;
      if (TT.paused) dt = 0;
      var fx = emptyFx(), wantFast = false;
      TT.items = TT.items.filter(function (it) {
        it.t += dt * (it.ignoreSpeed ? 1 : TT.speedK);
        var r; try { r = it.step(it.t, fx); } catch (e) { console.error(e); r = false; }
        if (r !== false && it.fastTo && it.t < it.fastTo) wantFast = true;
        if (r === false && it.end) { try { it.end(); } catch (e) { console.error(e); } }
        return r !== false;
      });
      // 台上的唱片：常駐狀態（spin 一直轉到下一手 clearClash）＋這一格的暫時狀態（落盤三拍）
      var decks = {};
      ['e', 'p'].forEach(function (s) { var d = fx.decks[s] || TT.decks[s]; if (d) decks[s] = d; });
      shop.state.decks = decks;
      shop.state.fx = fx;
      if (wantFast !== TT.fast) { TT.fast = wantFast; shop.fast(wantFast); }
    }
    function ttStart() { if (!TT.off && shop) { TT.last = shop.now(); TT.off = shop.onTick(ttTick); } }
    function ttAdd(it) { it.t = it.t || 0; TT.items.push(it); ttStart(); return it; }
    function setFlips() { shop.flip('p', true); shop.flip('f', false); }
    function restHolds() {
      ['f', 'p'].forEach(function (id) {
        var h = TT.held[id];
        shop.hold(id, h || null); shop.arm(id, h ? 'show' : null); shop.nudge(id, 0);
      });
    }
    function sleeveOf(h) { return h ? (h === 'ace' ? 'ace' : h) : null; }

    // 一手的整段演出
    function clashItem(o) {
      var G = geo(), K = G.K, kind = o.kind || 'counter';
      var mode = (kind === 'counter' || kind === 'countered') ? 'beat' : (kind === 'mirrorWin' || kind === 'mirrorLose') ? 'mirror' : kind === 'tie' || /^hegemony/.test(kind) ? 'tie' : 'beat';
      var Wn = (kind === 'counter' || kind === 'mirrorWin' || kind === 'hegemonyP') ? 'p' : (kind === 'countered' || kind === 'mirrorLose' || kind === 'hegemonyE') ? 'e' : null;
      if (mode === 'tie') Wn = null;
      var Lo = Wn === 'p' ? 'e' : Wn === 'e' ? 'p' : null;
      var p = o.p || {}, e = o.e || {}, lab = { p: p.attr || 'c', e: e.attr || 'c' }, dk = { p: p.ace ? 'ace' : 'disc', e: e.ace ? 'ace' : 'disc' };
      var dmg = { e: o.toE | 0, p: o.toP | 0 };
      var baseF = shop.pos('f'), baseP = shop.pos('p');
      baseF = { x: Math.round(baseF.x), y: Math.round(baseF.y) }; baseP = { x: Math.round(baseP.x), y: Math.round(baseP.y) };
      var WP = handAt('p', 'wind', baseP), SP = handAt('p', 'throw', baseP), WE = handAt('f', 'wind', baseF), SE = handAt('f', 'throw', baseF);
      var C = G.C, A = G.arc, fk = G.fxK, end = { p: [C[0] + G.gap, C[1]], e: [C[0] - G.gap, C[1]] }, H = { e: hitAt('f', baseF), p: hitAt('p', baseP) }, home = { e: G.PE, p: G.PP };
      var rugY = G.rug[1], drop = { e: [G.rug[0] - G.dropDx, rugY], p: [G.rug[0] + G.dropDx, rugY] };
      var flagAt = flagPos;
      var hs = { f: TT.held.f, p: TT.held.p };
      var fired = {}, it = { kind: kind, fastTo: TTK.done, res: null };
      function once(k, fn) { if (!fired[k]) { fired[k] = 1; try { fn(); } catch (er) { console.error(er); } } }
      function hurt(side, back) {
        var id = sid(side);
        shop.pose(id, 'hurt', 200); if (dmg[side] > 0) shop.float(id, '−' + dmg[side], side === 'p' ? 'r' : null);
        it['nb' + side] = back;
        if (typeof o.onHit === 'function') try { o.onHit(side); } catch (er) { console.error(er); }
      }
      function trail(fx, f, t, t0) { [40, 80].forEach(function (d) { if (t - d >= t0) { var q = f(t - d); fx.trails.push([q[0], q[1], 'rgba(255,241,194,' + (d === 40 ? 0.7 : 0.4) + ')']); } }); }
      function landAt(fx, t, side, t0) {
        var P0 = home[side], rec = { attr: lab[side], kind: dk[side] === 'ace' ? 'ace' : null, card: (side === 'p' ? p.card : e.card) };
        if (t >= t0 && t < t0 + 80) { fx.decks[side] = { rec: rec, state: 'land' }; fx.dots.push([P0[0] - Math.round(16 * fk), P0[1] + 1, '#e8e8ee'], [P0[0] + Math.round(15 * fk), P0[1] + 1, '#e8e8ee']); }
        else if (t >= t0 + 80 && t < t0 + 160) fx.decks[side] = { rec: rec, state: 'armMid' };
        else if (t >= t0 + 160) once('land' + side, function () { TT.decks[side] = { rec: rec, state: 'spin' }; if (typeof o.onLand === 'function') o.onLand(side, rec.card); });
      }
      function flagUntil(fx, t, t0, side) { if (t >= t0 && t < t0 + 900) { fx.flag = flagAt(side); shop.arm('o', 'flag'); shop.flip('o', side === 'e'); } else if (t >= t0 + 900) { shop.arm('o', null); shop.flip('o', false); } }
      it.step = function (t0, fx) {
        var t = t0;
        if (o.seeThrough && t > TTK.col) t = Math.max(TTK.col, t - 80);
        // ---- 減少動態：不飛、不翻；560 贏家的唱片直接出現在自己的台上轉
        if (o.reduced) {
          if (t >= TTK.sep) once('r', function () {
            if (Wn) TT.decks[Wn] = { rec: { attr: lab[Wn], kind: dk[Wn] === 'ace' ? 'ace' : null }, state: 'spin' };
            ['e', 'p'].forEach(function (s) { if (dmg[s] > 0) shop.float(sid(s), '−' + dmg[s], s === 'p' ? 'r' : null); });
            if (it.res) { it.res(); it.res = null; }
          });
          return t < TTK.sep + 50 ? true : false;
        }
        // ---- 手：你 0–200 蓄力、200 出手；他 0–260 拿著封套、260 蓄力、300 出手
        setFlips();
        if (t < TTK.relP) { shop.arm('p', 'wind'); shop.hold('p', { disc: lab.p, kind: dk.p }); }
        else if (t < TTK.relP + 120) { shop.arm('p', 'throw'); shop.hold('p', null); }
        else { shop.arm('p', null); shop.hold('p', null); }
        if (t < TTK.windE) { shop.arm('f', hs.f ? 'show' : null); shop.hold('f', sleeveOf(hs.f)); }
        else if (t < TTK.relE) { shop.arm('f', 'wind'); shop.hold('f', { disc: lab.e, kind: dk.e }); }
        else if (t < TTK.relE + 120) { shop.arm('f', 'throw'); shop.hold('f', null); }
        else { shop.arm('f', null); shop.hold('f', null); }
        // ---- 飛（相撞前）：低弧
        var fp = function (tt) { return arcP(SP, end.p, A.low, seg(tt, TTK.relP, TTK.col)); }, fe = function (tt) { return arcP(SE, end.e, A.low, seg(tt, TTK.relE, TTK.col)); };
        if (t >= TTK.relP && t < TTK.col) { var q1 = fp(t); fx.discs.push({ x: q1[0], y: q1[1], attr: lab.p, kind: dk.p, fr: spinFr(t, TTK.relP, 60) }); trail(fx, fp, t, TTK.relP); }
        if (t >= TTK.relE && t < TTK.col) { var q2 = fe(t); fx.discs.push({ x: q2[0], y: q2[1], attr: lab.e, kind: dk.e, fr: spinFr(t, TTK.relE, 60) }); trail(fx, fe, t, TTK.relE); }
        // ---- 相撞（520–600 貼在一起）
        if (t >= TTK.col && t < TTK.go) {
          var crack = t >= TTK.sep && mode === 'beat';
          fx.discs.push({ x: end.p[0], y: end.p[1], attr: lab.p, kind: dk.p, fr: 1, crack: crack && Lo === 'p' });
          fx.discs.push({ x: end.e[0], y: end.e[1], attr: lab.e, kind: dk.e, fr: 3, crack: crack && Lo === 'e' });
          if (mode === 'beat') fx.sparks.push({ x: C[0], y: C[1] - 1, size: 'small' });
          else fx.sparks.push({ x: C[0], y: C[1], size: 'ring', c: '#ffffff' });
        }
        var shardsOn = function () { if (t >= 900 && t < TTK.clear) { var cx = Lo === 'e' ? G.rug[0] - Math.round(14 * fk) : G.rug[0] + Math.round(14 * fk), q = function (v) { return Math.round(v * fk); }, sh = [[cx - q(12), rugY - q(2), 3], [cx - q(4), rugY + q(2), 2], [cx - q(9), rugY + q(1), 3, lab[Lo]], [cx + q(3), rugY - q(3), 2], [cx + q(9), rugY + q(1), 3], [cx - q(16), rugY + q(2), 2, lab[Lo]]]; fx.shards = sh.filter(function (s2, i) { return t < TTK.next || i % 2 === 0; }); } };
        if (mode === 'beat' && Wn) {
          // 輸的那張：600 裂三塊往下掉 → 900 地毯上的碎片
          if (t >= TTK.go && t < 900) { var u = (t - TTK.go) / 300; fx.discs.push({ x: end[Lo][0] + (Lo === 'e' ? -1 : 1) * Math.round(u * 8), y: end[Lo][1] + Math.round(u * u * (rugY - end[Lo][1])), attr: lab[Lo], kind: dk[Lo], split: 1 + Math.floor(u * 3) }); }
          shardsOn();
          // 贏的那張：600–760 穿過去打中輸家 → 820–1180 高弧回自己的唱盤
          var Hp = H[Lo], sg = Wn === 'p' ? 1 : -1;
          if (t >= TTK.go && t < TTK.hit) { var q3 = arcP(end[Wn], Hp, A.tiny, seg(t, TTK.go, TTK.hit)); fx.discs.push({ x: q3[0], y: q3[1], attr: lab[Wn], kind: dk[Wn], fr: spinFr(t, TTK.go, 60) }); }
          if (t >= TTK.hit && t < TTK.hit + 60) fx.discs.push({ x: Hp[0], y: Hp[1], attr: lab[Wn], kind: dk[Wn], fr: 0 });
          if (t >= TTK.hit && t < TTK.hit + 100) fx.sparks.push({ x: Hp[0] - 6 * sg, y: Hp[1] + 2, size: 'small', c: '#ec4a5a' });
          if (t >= TTK.hit) once('hit', function () { hurt(Lo, 2 * K); });
          var S2 = [Hp[0] + Math.round(4 * fk) * sg, Hp[1] - 2], fh = function (tt) { return arcP(S2, home[Wn], A.high, seg(tt, TTK.hit + 60, TTK.home)); };
          if (t >= TTK.hit + 60 && t < TTK.home) { var q4 = fh(t); fx.discs.push({ x: q4[0], y: q4[1], attr: lab[Wn], kind: dk[Wn], fr: spinFr(t, TTK.hit, 60) }); trail(fx, fh, t, TTK.hit + 60); }
          landAt(fx, t, Wn, TTK.home);
          flagUntil(fx, t, TTK.home, Wn);
        } else if (mode === 'mirror' && Wn) {
          // 撞招：數字大的高弧回自己的唱盤（1000 落）；小的低弧彈回去敲到自己（760）→ 掉在地毯自己那側平躺
          var Hl = H[Lo], fw = function (tt) { return arcP(end[Wn], home[Wn], A.mid, seg(tt, TTK.go, 1000)); };
          if (t >= TTK.go && t < 1000) { var q5 = fw(t); fx.discs.push({ x: q5[0], y: q5[1], attr: lab[Wn], kind: dk[Wn], fr: spinFr(t, TTK.go, 60) }); trail(fx, fw, t, TTK.go); }
          if (t >= TTK.go && t < TTK.hit) { var q6 = arcP(end[Lo], Hl, A.bounce, seg(t, TTK.go, TTK.hit)); fx.discs.push({ x: q6[0], y: q6[1], attr: lab[Lo], kind: dk[Lo], fr: spinFr(t, TTK.go, 60) }); }
          if (t >= TTK.hit && t < 900) { var q7 = arcP(Hl, drop[Lo], A.drop, seg(t, TTK.hit, 900)); fx.discs.push({ x: q7[0], y: q7[1], attr: lab[Lo], kind: dk[Lo], fr: 2 }); }
          if (t >= 900 && t < TTK.clear) fx.discs.push({ x: drop[Lo][0], y: drop[Lo][1], attr: lab[Lo], kind: dk[Lo], flat: true });
          if (t >= TTK.hit && t < TTK.hit + 100) fx.sparks.push({ x: Hl[0], y: Hl[1] - 1, size: 'small', c: '#ec4a5a' });
          if (t >= TTK.hit) once('hit', function () { hurt(Lo, K); });
          landAt(fx, t, Wn, 1000);
          flagUntil(fx, t, 1000, Wn);
        } else {
          // 平手：兩張彈開、平躺在地毯兩邊，誰的唱盤都不轉；老闆聳肩
          if (t >= TTK.go && t < 900) {
            ['e', 'p'].forEach(function (s) { var q8 = arcP(end[s], drop[s], A.bounce, seg(t, TTK.go, 900)); fx.discs.push({ x: q8[0], y: q8[1], attr: lab[s], kind: dk[s], fr: spinFr(t, TTK.go, 80) }); });
          }
          if (t >= 900 && t < TTK.clear) ['e', 'p'].forEach(function (s) { fx.discs.push({ x: drop[s][0], y: drop[s][1], attr: lab[s], kind: dk[s], flat: true }); });
          if (t >= TTK.hit) once('hit', function () { ['e', 'p'].forEach(function (s) { if (dmg[s] > 0) hurt(s, K); }); });
          if (t >= 900 && t < 1700) { shop.arm('o', 'shrug'); once('dots', function () { shop.emote('o', 'dots', 800 / Math.max(0.25, TT.speedK)); }); }
          else if (t >= 1700) shop.arm('o', null);
        }
        // 受擊後退：1460 回原位
        ['e', 'p'].forEach(function (s) { var nb = it['nb' + s] || 0; if (!nb) return; var dx = t < TTK.back ? nb : t < TTK.back + 100 ? Math.round(nb / 2) : 0; shop.nudge(sid(s), s === 'e' ? -dx : dx); });
        if (t >= TTK.back && it.res) { var rr = it.res; it.res = null; rr(); }
        return t < TTK.clear;
      };
      it.end = function () { shop.nudge('f', 0); shop.nudge('p', 0); shop.arm('o', null); shop.flip('o', false); if (it.res) { var r = it.res; it.res = null; r(); } };
      return it;
    }
    var turntable = {
      // 一手：t=0（點屬性鈕）呼叫；Promise 在「演完」（≈1460 ms ÷ 速度）resolve
      clash: function (o) {
        o = o || {};
        if (!shop || !shop.has('f') || !shop.has('p')) return Promise.resolve();
        if (o.speed > 0) TT.speedK = o.speed;
        if (o.reduced == null) o.reduced = reduced();
        TT.items.filter(function (x) { return x.kind; }).forEach(function (x) { x.step = function () { return false; }; });
        var it = clashItem(o);
        TT.held = {};
        return new Promise(function (res) { it.res = res; ttAdd(it); });
      },
      // 下一手 t=0：台上的唱片淡掉、碎片與平躺唱片清掉
      clearClash: function (ms) {
        TT.items.forEach(function (x) { x.step = function () { return false; }; });
        var keep = TT.decks; TT.decks = {};
        if (ms !== 0 && (keep.e || keep.p)) ttAdd({ ignoreSpeed: true, step: function (t, fx) { if (t >= (ms == null ? 150 : ms)) return false; ['e', 'p'].forEach(function (s) { if (keep[s] && Math.floor(t / 50) % 2 === 0) fx.decks[s] = keep[s]; }); return true; } });
        ttStart(); ttTick(shop ? shop.now() : 0);
        return stage;
      },
      // 手上拿著：{ sleeve: cardId } | 'ace' | null（選牌時就看得到；他拿他亮出的那張、你點了哪張就拿哪張）
      hold: function (side, what) {
        var id = sid(side); TT.held[id] = what || null;
        setFlips(); shop.hold(id, what || null); shop.arm(id, what ? 'show' : null);
        return stage;
      },
      // 唱盤台：{ rec: { attr, card, kind }, state: 'land'|'armMid'|'spin'|null }；null＝清掉
      deck: function (side, d) { TT.decks[side === 'f' ? 'e' : side] = d && d.rec ? d : null; ttStart(); ttTick(shop.now()); return stage; },
      // 老闆三角旗：黑＝你、白＝他（null 收起）
      flag: function (side, ms) {
        if (!side) { shop.arm('o', null); return stage; }
        var f = flagPos(side);
        shop.arm('o', 'flag'); shop.flip('o', side === 'e');
        ttAdd({ ignoreSpeed: true, step: function (t, fx) { if (t >= (ms || 900)) return false; fx.flag = f; return true; }, end: function () { shop.arm('o', null); shop.flip('o', false); } });
        return stage;
      },
      // 低階零件（教學示範也可以單獨叫）
      throwDisc: function (from, to, o) {
        o = o || {};
        var pt = function (v) { if (Array.isArray(v)) return v; if (v === 'e' || v === 'p') return handAt(sid(v), 'throw'); var s = (L.spots || {})[v]; return s ? [s[0], s[1] - 40] : [0, 0]; };
        var S0 = pt(from), E0 = to === 'e' || to === 'p' ? geo()[to === 'e' ? 'PE' : 'PP'] : pt(to), ms = o.ms || 420, h = o.arc == null ? geo().arc.low : o.arc;
        return new Promise(function (res) {
          ttAdd({ fastTo: ms, step: function (t, fx) { var q = arcP(S0, E0, h, seg(t, 0, ms)); fx.discs.push({ x: q[0], y: q[1], attr: o.attr || 'c', kind: o.kind || 'disc', fr: spinFr(t, 0, o.spinMs || 60) }); if (o.trail !== 0) [40, 80].forEach(function (d) { if (t - d > 0) { var r = arcP(S0, E0, h, seg(t - d, 0, ms)); fx.trails.push([r[0], r[1], 'rgba(255,241,194,0.55)']); } }); return t < ms; }, end: res });
        });
      },
      burst: function (x, y, size, color, ms) { ttAdd({ fastTo: ms || 120, step: function (t, fx) { fx.sparks.push({ x: x, y: y, size: size || 'small', c: color }); return t < (ms || 120); } }); return stage; },
      shatter: function (at, attr) {
        var G0 = geo(), q0 = Array.isArray(at) ? at : G0.C, rugY = G0.rug[1], f0 = G0.fxK;
        ttAdd({ fastTo: 320, step: function (t, fx) { if (t < 300) { var u = t / 300; fx.discs.push({ x: q0[0], y: q0[1] + Math.round(u * u * (rugY - q0[1])), attr: attr, split: 1 + Math.floor(u * 3) }); return true; } fx.shards.push([q0[0] - Math.round(6 * f0), rugY - 1, 3], [q0[0] + 1, rugY + 2, 2, attr], [q0[0] + Math.round(6 * f0), rugY, 3]); return t < 2000; } });
        return stage;
      },
      flatDisc: function (at, attr, o) { o = o || {}; ttAdd({ step: function (t, fx) { fx.discs.push({ x: at[0], y: at[1], attr: attr, flat: true, void: !!o.void, kind: o.kind }); return t < (o.ms || 2000); } }); return stage; },
      pause: function (on) { TT.paused = !!on; return stage; },
      speed: function (k) { if (k > 0) TT.speedK = k; return stage; },
      // 除錯／截圖：把正在演的時間軸停在 t（ms）。t==null＝放開
      seek: function (t) { if (t == null) { TT.paused = false; return stage; } TT.paused = true; TT.items.forEach(function (x) { x.t = t; }); ttTick(shop.now()); shop.render(); return stage; },
      clashState: function () { return { items: TT.items.length, decks: JSON.parse(JSON.stringify(TT.decks)), held: JSON.parse(JSON.stringify(TT.held)), paused: TT.paused, speed: TT.speedK, fast: TT.fast }; }
    };
    function ttReset() { TT.items = []; TT.decks = {}; TT.held = {}; TT.paused = false; if (TT.off) { TT.off(); TT.off = null; } if (TT.fast && shop) shop.fast(false); TT.fast = false; if (shop) { shop.state.fx = null; shop.state.decks = {}; ['f', 'p', 'o'].forEach(function (id) { shop.arm(id, null); shop.hold(id, null); shop.nudge(id, 0); }); } }

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
          stage.clearStamps(); ttReset();
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
        var sp = o.walkSpeed || 96, jobs = [], ms0 = o.ms == null ? 600 : o.ms;
        [['f', 'duelE'], ['p', 'duelP'], ['o', (L.spots || {}).ref ? 'ref' : 'counter']].forEach(function (x) {
          var id = x[0], to = x[1], at = shop.pos(id), s = (L.spots || {})[to];
          if (!s) return;
          if (!at || at.hidden || !shop.has(id)) { if (id !== 'o' || shop.has('o')) shop.put(id, to); return; }
          if (Math.round(at.x) === s[0] && Math.round(at.y) === s[1]) return;
          // 繞過家具的路比直線長：走快一點，鏡頭推近收完時三個人都已經站定（盤面一出來就不會還有人在走）
          var v = sp;
          if (typeof shop.route === 'function' && !at.outside) {
            var pts = [[at.x, at.y]].concat(shop.route([at.x, at.y], to)), len = 0;
            for (var i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
            v = Math.max(sp, len / Math.max(0.25, ms0 * 0.6 / 1000) / (L.walkK || 2) / speed());
          }
          jobs.push(shop.walk(id, at.outside ? ['door', to] : [to], v));
        });
        stage.interact('duel');
        jobs.push(camera('strip', { ms: o.ms == null ? 600 : o.ms }));
        return Promise.all(jobs).then(function () { if (shop) setFlips(); return stage; });
      },
      duelOut: function (o) {
        o = o || {};
        shop.untag(); ['f', 'p'].forEach(function (id) { shop.say(id, null); shop.emote(id, null); });
        ttReset(); shop.flip('p', false);
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
        destroyed = true; ttReset(); timers.forEach(clearTimeout); clearTimeout(rzT);
        W.removeEventListener('resize', onResize); if (W.visualViewport) W.visualViewport.removeEventListener('resize', onResize); timers = []; stage.clearStamps(); if (shop) shop.destroy(); shop = null; }
    };

    // 唱盤區 API 掛到 stage 上（duel.js 有就用、沒有就退回 pose／float）
    Object.keys(turntable).forEach(function (k) { stage[k] = turntable[k]; });
    mountShop(L0);
    // 預設三人：老闆在櫃檯（layout.actors）、你、他（選填）
    if (opts.p) stage.put('p', opts.p, 'player');
    if (opts.f) stage.put('f', opts.f, opts.fSpr || 'e0');
    return camera(opts.camera || 'full', { ms: 0, screen: opts.screen }).then(function () { return stage; });
  }

  W.DipLabStage = { mount: mount, loadLayout: loadLayout, fitCamera: fitCamera, pickCamera: pickCamera, ALIAS: ALIAS, PANEL_MIN: PANEL_MIN, INTERACT: INTERACT, version: '3.1' };
})();
