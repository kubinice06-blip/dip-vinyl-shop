/* stage.js：DipLabStage，game-lab 的常駐舞台（SPEC-v2 §2、§5.3；v4＝SPEC-v4 §2.3，version '4.0'）。包住 DipShop（shop.js），給 ui.js／duel.js／tutorial.js 用。
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
 *   Stage.duelIn({ foe, ms }) / duelOut({ screen }) → Promise   進出對決的走位＋鏡頭（選用的便利函式；shop.route 回 [] 時用直線距離估路長）
 *   v4（SPEC-v4 §2.3）：
 *   Stage.finish(id) ; finishAll()        正在走的那段直接放到終點（⏩／點一下快轉）；finishAll＝p、o、f、q1、q2
 *   Stage.faceTo(id, other) ; floorRecord(at | null, { attr, card })   面向對方；地上一張平躺的唱片（收尾 E4）
 *   Stage.bins() → [{ key, hotId:'bin:'+key, label, stand, propId }] ; focus(hotId, { panelMin, ms }) → Promise ; unfocus(ms)
 *   唱盤區（v4：一台置中，老闆在台後當裁判，他左你右）：
 *   Stage.clash({ kind, blocked, by, toE, toP, speed, reduced, nameE, p:{attr,star,card,ace}, e:{attr,star,card,ace}, onHit(side), onLand(side,card) })
 *       → Promise（1460 ms÷速度；減少動態 560 ms÷速度）。v3 呼叫（沒有 star／blocked／by）照演：星數退回卡片那軸、by 從屬性推
 *   Stage.clearClash(ms=150) ; hold(side 'e'|'f'|'p'|'o', {sleeve:id, back?}|'ace'|null) ; deck({rec:{attr,card,kind}, state, by}|null)（舊 deck(side, d) 照收）
 *   Stage.badge(side, {attr, star, ace}|null, ms?) ; badgeRect(side) → DOMRect|null   頭頂屬性方塊（.ds-badge；方塊在時那人的名牌暫時收起）
 *   Stage.flag('e'|'p'|null, ms) ; burst(x,y,size,color,ms) ; flatDisc(at, attr, o)
 *   Stage.pause(on) ; speed(k) ; seek(t|null) ; clashState() → { items, deck, held, badges, paused, speed, fast }
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
  // 每個畫面舞台上哪些東西可以點（SPEC-v2 §5.4；v4 §2.3.8：scene／duel／reward 也能點箱子，ui.js 決定開抽屜還是老闆說「打完再翻。」）
  var INTERACT = {
    all: null,
    title: null, map: null,
    scene: ['rack:*', 'now', 'bin:*'],
    duel: ['rack:*', 'now', 'owner', 'bin:*'],
    reward: ['bin:*'],
    node: [], none: [],
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
    function sfx(n, o) {   // o 照傳下去（chime 的 {attr}）
      if (opts.sfx === false) return;
      if (typeof opts.sfx === 'function') { try { opts.sfx(n, o); } catch (e) { console.error(e); } return; }
      var f = W.DipLabFx; if (f && typeof f.sfx === 'function') try { f.sfx(n, o); } catch (e) { console.error(e); }
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
    var lastCam = { name: 'full', o: {} }, tweening = 0, focusPrev = null;
    function toView(tgt, ms) {
      if (ms > 0 && reduced()) {
        return new Promise(function (res) {
          host.classList.add('ds-fade');
          T(function () { shop.setView(tgt); host.classList.remove('ds-fade'); T(res, 75); }, 75);
        });
      }
      tweening++;
      return shop.tweenView(tgt, ms).then(function () { tweening--; }, function (e) { tweening--; throw e; });
    }
    function camera(name, o) {
      o = o || {};
      focusPrev = null;   // 換鏡頭＝抽屜那一箱的對焦結束
      lastCam = { name: name, o: { screen: o.screen, panelMin: o.panelMin, noAuto: o.noAuto } };
      var cams = L.cameras || {};
      if (!o.noAuto) name = pickCamera(name, cams, visH());
      var c = cams[name] || cams.full || { y: 0, h: L.size[1] };
      camName = name;
      shop.sparkle(opts.sparkle !== false && !QS.nosparkle && !/^strip/.test(name));
      return toView(fitCam(name, c, o), o.ms || 0);
    }
    // 熱點的形狀（場景座標外框）：shop 的熱點清單有就用；箱子 bin:<key> 還沒有熱點時退回道具的 box
    function shapeOf(hid) {
      var hs = shop.hotspots ? shop.hotspots() : [];
      for (var i = 0; i < hs.length; i++) if (hs[i].id === hid) return hs[i].rect;
      if (/^bin:/.test(hid)) {
        var k = hid.slice(4), pr = (L.props || []).filter(function (o) { return o.bin && o.bin.key === k; })[0], sp = pr && W.DipShop.O34 && W.DipShop.O34.PROPS[pr.type];
        if (sp && sp.box) return sp.box(pr);
      }
      return null;
    }
    // 對焦一箱（抽屜開著時，SPEC-v4 §2.3.8）：full 的鏡頭規則、面板最少 panelMin，再把 y 移到形狀整個在畫面裡（上下各留 6 格）
    function focusView(hid, o) {
      var c = (L.cameras || {}).full || { y: 0, h: L.size[1] }, tgt = fitCam('full', c, { panelMin: o.panelMin, screen: o.screen });
      var r = shapeOf(hid), H = L.size[1];
      if (r) {
        var m = 6, y = tgt.y, h = tgt.h;
        if (r[1] - m < y) y = r[1] - m;
        if (r[1] + r[3] + m > y + h) y = r[1] + r[3] + m - h;
        if (r[3] + 2 * m > h) y = r[1] - m;   // 比畫面還高：上緣優先
        tgt = { y: Math.max(0, Math.min(H - h, Math.round(y))), h: h, dev: tgt.dev };
      }
      return tgt;
    }
    function focus(hid, o) {
      o = o || {};
      if (!focusPrev) focusPrev = { name: lastCam.name, o: lastCam.o };   // unfocus 回到第一次 focus 之前的鏡頭
      var prev = focusPrev;
      lastCam = { name: 'full', o: {}, focus: hid, fo: { panelMin: o.panelMin, screen: o.screen } };
      camName = 'full';
      shop.sparkle(opts.sparkle !== false && !QS.nosparkle);
      var pr = toView(focusView(hid, o), o.ms == null ? 300 : o.ms);
      focusPrev = prev;
      return pr;
    }
    function unfocus(ms) {
      if (!focusPrev) return Promise.resolve();
      var p = focusPrev; focusPrev = null;
      return camera(p.name, Object.assign({}, p.o, { ms: ms == null ? 300 : ms }));
    }
    // 可視高改變（轉向、Safari 工具列收起來、鍵盤）：用同一個鏡頭重新套矮螢幕規則
    var rzT = 0;
    function onResize() {
      clearTimeout(rzT);
      rzT = setTimeout(function () {
        if (destroyed || !shop || tweening) return;
        if (lastCam.focus && focusPrev) toView(focusView(lastCam.focus, lastCam.fo || {}), 0);   // 抽屜開著：重新對焦那一箱
        else camera(lastCam.name, Object.assign({ ms: 0 }, lastCam.o));
      }, 150);
    }
    W.addEventListener('resize', onResize);
    if (W.visualViewport) W.visualViewport.addEventListener('resize', onResize);

    // ======================================================================= 唱盤區（v4：一台置中，SPEC-v4 §2.3.3／§2.3.4）
    // 老闆站在台後（ref）當裁判，他在左（duelE）、你在右（duelP）。一手＝roundItem：兩人舉起封套（他背面朝外）→ 他翻面 → 頭頂屬性方塊
    // → 判定（剋中：火花從贏家方塊射到輸家；剋不動：防守方方塊一圈白環＋比星閃；同色：一起閃）→ 輸家受擊、贏家上前把唱片放上轉盤
    // （落針、屬性短音、NOW 小窗、音符、老闆舉旗）→ 輸家收回袋子；平手＝空盤、老闆搖頭。
    // 時間 t＝duel.js 叫 clash() 那一刻（ms，速度 1；實際 ÷ TT.speedK）。每格把台上的唱片填進 shop.state.deck（單數）、特效填進 shop.state.fx。
    var TT = { items: [], deck: null, held: {}, badges: {}, nudge: {}, floor: null, paused: false, speedK: 1, off: null, fast: false, last: 0 };
    var RT = { flip: 200, face: 240, badge: 280, judge: 480, flash: 520, hit: 560, slide: 600, stepEnd: 680, put: 700, land: 800, arm: 880, flag: 900, spin: 960, chime: 980,
      shake: 600, shakeEnd: 1320, back: 1300, home: 1400, done: 1460, flagEnd: 1800, end: 1800 };
    var ATTRC = { c: '#1f5fae', o: '#6a3fa0', h: '#c11628' }, ZH1 = { c: '經', o: '冷', h: '硬' }, BEATS = { o: 'c', c: 'h', h: 'o' };
    function ttK() { return L.spriteScale || 1; }
    function sid(side) { return side === 'e' || side === 'f' ? 'f' : 'p'; }
    function sideOf(id) { return id === 'f' || id === 'e' ? 'e' : 'p'; }
    function lerp(a, b, u) { return a + (b - a) * u; }
    function seg(t, a, b) { return Math.max(0, Math.min(1, (t - a) / (b - a))); }
    function arcP(S0, E0, h, u) { return [lerp(S0[0], E0[0], u), lerp(S0[1], E0[1], u) - 4 * h * u * (1 - u)]; }
    function spinFr(t, t0, ms) { return Math.floor(Math.max(0, t - t0) / (ms || 100)) & 3; }
    // 幾何：轉盤中心＝layout.duel.deck（沒寫就問 duelDeck 道具，再沒有就取兩個對決者中間）；贏家上前 duel.step 格
    function geo() {
      var Dd = L.duel || {}, sp = L.spots || {}, K = ttK();
      var pr = (L.props || []).filter(function (o) { return o.type === 'duelDeck'; })[0];
      var spec = pr && W.DipShop.O34 && W.DipShop.O34.PROPS && W.DipShop.O34.PROPS.duelDeck;
      var fE = sp.duelE || [0, 0], fP = sp.duelP || [0, 0];
      var pc = Dd.deck || (spec && spec.center ? spec.center(pr) : [Math.round((fE[0] + fP[0]) / 2), fE[1] - 8 * K]);
      return { K: K, pc: [Math.round(pc[0]), Math.round(pc[1])], step: Dd.step || 10 };
    }
    // 手的位置（場景座標）：小人腳底 + 格子（flip 後朝對手）
    function handAt(id, kind, base) {
      if (typeof shop.handAt === 'function') { var hq = shop.handAt(id, kind || 'none'); if (hq) { if (base) { var cur = shop.pos(id); if (cur) { hq[0] += Math.round(base.x) - Math.round(cur.x); hq[1] += Math.round(base.y) - Math.round(cur.y); } } return [Math.round(hq[0]), Math.round(hq[1])]; } }
      var a = base || shop.pos(id) || { x: 0, y: 0 }, K = ttK(), hp = (W.DipShop.HANDAT || {})[kind || 'none'] || [13, 10];
      var col = id === 'p' ? 15 - hp[0] : hp[0];
      return [Math.round(a.x) - 8 * K + col * K + (K >> 1) + (TT.nudge[id] || 0), Math.round(a.y) - 15 * K + 1 + hp[1] * K + (K >> 1)];
    }
    // 老闆舉旗的位置：旗竿下半段握在手上，旗尖指贏家（他贏＝老闆轉向左）
    function flagPos(side) {
      if (typeof shop.handAt === 'function') { shop.flip('o', side === 'e'); var hq = shop.handAt('o', 'flag'); if (hq) return { x: Math.round(hq[0]), y: Math.round(hq[1]), side: side }; }
      var K = ttK(), a = shop.pos('o') || { x: 0, y: 0 }, hp = (W.DipShop.HANDAT || {}).flag || [14, 5], col = side === 'e' ? 15 - hp[0] : hp[0];
      return { x: Math.round(a.x) - 8 * K + col * K + (K >> 1), y: Math.round(a.y) - 15 * K + 1 + hp[1] * K + (K >> 1) - 16, side: side };
    }
    function emptyFx() { return { discs: [], trails: [], sparks: [], shards: [], notes: [], dots: [], excl: [], flag: null }; }
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
      // 地上平躺的唱片（收尾：他走了，唱片留在他站的位置）
      if (TT.floor) fx.discs.push({ x: TT.floor.x, y: TT.floor.y, attr: TT.floor.attr, kind: TT.floor.kind, flat: true });
      // 台上的唱片：常駐狀態（spin 一直轉到下一手 clearClash）；這一格有暫時狀態（clearClash 抬針、閃兩下）就用暫時的
      shop.state.deck = fx.hasOwnProperty('deck') ? fx.deck : TT.deck;
      shop.state.fx = fx;
      placeBadges();
      if (wantFast !== TT.fast) { TT.fast = wantFast; shop.fast(wantFast); }
    }
    function ttStart() { if (!TT.off && shop) { TT.last = shop.now(); TT.off = shop.onTick(ttTick); } }
    function ttAdd(it) { it.t = it.t || 0; TT.items.push(it); ttStart(); return it; }
    function setFlips() { shop.flip('p', true); shop.flip('f', false); }
    function setNudge(id, dx) { dx = Math.round(dx || 0); if ((TT.nudge[id] || 0) !== dx) { TT.nudge[id] = dx; shop.nudge(id, dx); } }

    // ---------------- 頭頂屬性方塊（DOM .ds-badge，掛在舞台 host 裡；每格用 shop.hostCss 重新定位）
    // 下緣＝頭頂上方 2 格；鏡頭上緣不夠放就貼齊舞台上緣 2 CSS px（可以壓到頭頂一點，不移到頭的側邊）。方塊在的時候那個人的名牌 tag 暫時收起。
    var BADGE = {}, TAGS = {};
    function badgeEl(side) {
      if (!D || typeof D.createElement !== 'function' || !host || typeof host.appendChild !== 'function') return null;
      var b = BADGE[side];
      if (!b || b.parentNode !== host) { b = D.createElement('div'); b.className = 'ds-badge ' + side; b.setAttribute('aria-hidden', 'true'); b.style.display = 'none'; host.appendChild(b); b._k = ''; BADGE[side] = b; }
      return b;
    }
    function starOf(v) {
      if (v.star != null && v.star !== '') return v.star | 0;
      if (v.ace) return 7;
      var cs = opts.cards || W.DipLabCards || {}, c = v.card && cs[v.card];
      return c ? (c[v.attr] | 0) : 0;   // v3 呼叫（沒有 star）：退回卡片那軸的星數
    }
    function tagHide(id) { if (TAGS[id] && shop) shop.untag(id); }
    function tagRestore(id) { var t = TAGS[id]; if (t && shop) shop.tag(id, t[0], t[1], t[2]); }
    function setBadge(side, v, fxCls) {
      side = sideOf(side); var id = sid(side), was = !!TT.badges[side];
      if (!v) {
        if (!was) return;
        TT.badges[side] = null;
        var b0 = BADGE[side]; if (b0) { b0.style.display = 'none'; b0._k = ''; }
        tagRestore(id);
        return;
      }
      var at = ZH1[v.attr] ? v.attr : 'c', st = starOf(v), ace = !!v.ace, fxc = fxCls || '';
      TT.badges[side] = { attr: at, star: st, ace: ace, fx: fxc };
      if (!was) tagHide(id);
      var b = badgeEl(side); if (!b) return;
      var cls = 'ds-badge ' + side + ' ' + at + (ace ? ' ace' : '') + (fxc ? ' ' + fxc : ''), key = cls + '|' + st;
      if (b._k !== key) { b.className = cls; b.innerHTML = '<i>' + ZH1[at] + '</i><b>' + st + '</b>'; b._k = key; }
      b.style.display = '';
      placeBadge(side);
      ttStart();
    }
    function placeBadge(side) {
      var b = BADGE[side], v = TT.badges[side]; if (!b) return;
      var id = sid(side), a = shop && shop.pos(id);
      if (!v || !a || a.hidden || !shop.has(id)) { b.style.display = 'none'; return; }
      b.style.display = '';
      var hy = typeof shop.headY === 'function' ? shop.headY(id) : a.y - 15 * ttK();
      var p = shop.hostCss(Math.round(a.x) + (TT.nudge[id] || 0), hy - 2), w = b.offsetWidth || 30, h = b.offsetHeight || 16, hw = host.clientWidth || 0;
      var cx = hw ? Math.max(2 + w / 2, Math.min(hw - 2 - w / 2, p.x)) : p.x;
      b.style.left = Math.round(cx - w / 2) + 'px'; b.style.top = Math.round(Math.max(2, p.y - h)) + 'px';
    }
    function placeBadges() { placeBadge('e'); placeBadge('p'); }
    // 方塊中心（場景座標）＋半寬半高（格）：火花從這裡射出去
    function badgeAt(side) {
      var id = sid(side), b = BADGE[side], v = shop.view ? shop.view() : null, a = shop.pos(id) || { x: 0, y: 0 };
      var hy = typeof shop.headY === 'function' ? shop.headY(id) : a.y - 15 * ttK();
      if (!b || b.style.display === 'none' || !v || !v.scale) return [Math.round(a.x) + (TT.nudge[id] || 0), hy - 8, 8, 5];
      var o0 = shop.hostCss(0, v.y), w = b.offsetWidth || 30, h = b.offsetHeight || 16;
      return [Math.round(((parseFloat(b.style.left) || 0) + w / 2 - o0.x) / v.scale), Math.round(((parseFloat(b.style.top) || 0) + h / 2) / v.scale + v.y), w / 2 / v.scale, h / 2 / v.scale];
    }
    function hideBadges() { setBadge('e', null); setBadge('p', null); }

    // ---------------- 一手的整段演出（取代 v3 的 clashItem）
    function roundItem(o) {
      var G = geo(), kind = o.kind || 'counter';
      if (/^hegemony/.test(kind)) kind = 'tie';
      var Wn = (kind === 'counter' || kind === 'mirrorWin') ? 'p' : (kind === 'countered' || kind === 'mirrorLose') ? 'e' : null;
      var Lo = Wn === 'p' ? 'e' : Wn === 'e' ? 'p' : null;
      var p = o.p || {}, e = o.e || {}, pl = { p: p, e: e }, lab = { p: ZH1[p.attr] ? p.attr : 'c', e: ZH1[e.attr] ? e.attr : 'c' };
      var bv = { p: { attr: lab.p, star: p.star, ace: !!p.ace, card: p.card }, e: { attr: lab.e, star: e.star, ace: !!e.ace, card: e.card } };
      var dmg = { e: o.toE | 0, p: o.toP | 0 }, blocked = o.blocked || null;
      // by＝誰出了剋招（同色 null）；v3 呼叫沒有 by → 從兩邊的屬性推
      var by = o.by !== undefined ? o.by : (lab.p === lab.e ? null : BEATS[lab.p] === lab.e ? 'p' : 'e');
      var def = by === 'p' ? 'e' : by === 'e' ? 'p' : null;
      var mode = kind === 'tie' ? 'tie' : (by && !blocked) ? 'beat' : (by && blocked) ? 'block' : 'mirror';
      var dir = { p: -1, e: 1 }, fired = {}, it = { kind: kind, fastTo: RT.end, res: null, round: true };
      function once(k, fn) { if (!fired[k]) { fired[k] = 1; try { fn(); } catch (er) { console.error(er); } } }
      function rec(side) { return { attr: lab[side], card: pl[side].card || null, kind: pl[side].ace ? 'ace' : null }; }
      function sleeve(side, back, sx) {
        var c = pl[side], h = { sleeve: c.card || null };
        if (back) h.back = true; else if (c.ace) h.ace = true;
        if (sx != null && sx < 1) h.sx = Math.max(0, sx);
        return h;
      }
      function hand(side, arm, what) { var id = sid(side); shop.arm(id, what ? arm : null); shop.hold(id, what || null); }
      function resolve() { if (it.res) { var r = it.res; it.res = null; r(); } }
      function badgeFx(side, t) {   // 這一格方塊要加的 class（判定 480–560、受擊 560–760、贏家發亮）
        var c = [];
        if (mode === 'tie') { if (t >= RT.judge) c.push('ring'); return c.join(' '); }
        if (mode === 'block' && side === def && t >= RT.judge) c.push('ring');
        if ((mode === 'block' && t >= RT.flash && t < RT.hit) || (mode === 'mirror' && t >= RT.judge && t < RT.hit)) c.push('flash');
        if (mode === 'beat' && side === Wn && t >= RT.judge && t < RT.hit) c.push('zap');
        if (side === Wn && t >= RT.hit) c.push('win');
        if (side === Lo && t >= RT.hit && t < 760) c.push('hit');
        return c.join(' ');
      }
      function flagOn(fx, side) { fx.flag = flagPos(side); shop.arm('o', 'flag'); it.flagged = true; }
      function flagOff() { if (it.flagged) { it.flagged = false; shop.arm('o', null); shop.flip('o', false); } }
      it.step = function (t, fx) {
        var wid = Wn && sid(Wn), lid = Lo && sid(Lo);
        // ---- 減少動態：不舉、不翻、不滑、沒火花；560 方塊出現、贏家的唱片直接在台上轉、舉旗；560 resolve
        if (o.reduced) {
          if (t >= RT.hit) {
            once('r', function () {
              ['e', 'p'].forEach(function (s) { hand(s, null, null); });
              if (Wn) TT.deck = { rec: rec(Wn), state: 'spin', by: Wn };
              if (Lo && dmg[Lo] > 0) shop.float(lid, '−' + dmg[Lo], Lo === 'p' ? 'r' : null);
              if (Lo && typeof o.onHit === 'function') o.onHit(Lo);
              if (Wn) { sfx('needle'); sfx('chime', { attr: lab[Wn] }); if (typeof o.onLand === 'function') o.onLand(Wn, pl[Wn].card || null); }
              else sfx('chime', { attr: null });
              resolve();
            });
            ['e', 'p'].forEach(function (s) { if (t < RT.done) setBadge(s, bv[s], badgeFx(s, RT.done - 1)); else setBadge(s, null); });
            if (Wn && t < RT.hit + 900) flagOn(fx, Wn); else flagOff();
          }
          return t < RT.done;
        }
        setFlips();
        // ---- 手上的封套：0 舉起（他背面朝外）；200–280 他翻面（橫向壓扁再展開）
        ['e', 'p'].forEach(function (s) {
          var back = s === 'e' && t < RT.face, sx = s === 'e' ? (t < RT.flip ? 1 : t < RT.face ? 1 - seg(t, RT.flip, RT.face) : t < RT.badge ? seg(t, RT.face, RT.badge) : 1) : 1;
          var up = sleeve(s, back, sx);
          if (mode === 'tie' || !Wn) { if (t < RT.flag) hand(s, 'wind', up); else hand(s, null, null); }
          else if (s === Lo) { if (t < RT.put) hand(s, 'wind', up); else hand(s, null, null); }
          else { if (t < RT.hit) hand(s, 'wind', up); else if (t < RT.stepEnd) hand(s, 'throw', up); else if (t < RT.home) hand(s, 'show', up); else hand(s, null, null); }
        });
        if (t >= RT.flip) once('flip', function () { sfx('flip'); });
        // ---- 頭頂方塊：280 出現、1460 收起
        ['e', 'p'].forEach(function (s) { if (t >= RT.badge && t < RT.done) setBadge(s, bv[s], badgeFx(s, t)); else setBadge(s, null); });
        // ---- 判定：剋中＝火花從贏家方塊射到輸家方塊（480–560），560 打中
        if (mode === 'beat' && Wn && t >= RT.judge && t < RT.hit + 60) {
          var bw = badgeAt(Wn), bl = badgeAt(Lo), ex = [bl[0] - dir[Lo] * Math.round(bl[2]), bl[1]];
          if (t < RT.hit) {
            var fs = function (tt) { return arcP([bw[0] + dir[Lo] * Math.round(bw[2]), bw[1]], ex, 6, seg(tt, RT.judge, RT.hit)); }, q = fs(t);
            fx.sparks.push({ x: q[0], y: q[1], size: 'small', c: ATTRC[lab[Wn]] });
            [20, 40].forEach(function (d) { if (t - d >= RT.judge) { var r = fs(t - d); fx.trails.push([r[0], r[1], 'rgba(255,241,194,' + (d === 20 ? 0.8 : 0.45) + ')']); } });
          } else fx.sparks.push({ x: ex[0], y: ex[1], size: 'big', c: '#ec4a5a' });
        }
        // ---- 560：輸家受擊（hurt 200、頭上 −N）
        if (t >= RT.hit && Lo) once('hit', function () {
          shop.pose(lid, 'hurt'); it.hurt = lid;
          if (dmg[Lo] > 0) shop.float(lid, '−' + dmg[Lo], Lo === 'p' ? 'r' : null);
          if (typeof o.onHit === 'function') o.onHit(Lo);
        });
        if (t >= 760 && it.hurt) once('hurtEnd', function () { shop.pose(it.hurt, null); it.hurt = null; });
        if (Wn) {
          // ---- 贏家：560–680 往唱盤上前 step 格；1300–1400 退回原位
          var st = G.step, nx = t < RT.hit ? 0 : t < RT.stepEnd ? st * seg(t, RT.hit, RT.stepEnd) : t < RT.back ? st : t < RT.home ? st * (1 - seg(t, RT.back, RT.home)) : 0;
          setNudge(wid, dir[Wn] * nx); setNudge(lid, 0);
          // ---- 600–800：唱片從贏家手上滑到轉盤中心（扁弧）
          if (t >= RT.slide && t < RT.land) {
            var h0 = handAt(wid, 'throw'), u = seg(t, RT.slide, RT.land), q2 = arcP(h0, G.pc, 5, u);
            fx.discs.push({ x: q2[0], y: q2[1], attr: lab[Wn], kind: pl[Wn].ace ? 'ace' : 'disc', fr: spinFr(t, RT.slide, 60) });
          }
          // ---- 700：輸家放下封套，腰間冒一點灰（收回袋子）
          if (t >= RT.put && t < RT.flag) { var hw0 = handAt(lid, 'none'), k = seg(t, RT.put, RT.flag); [[-2, 0], [1, -1], [3, 1]].forEach(function (d, i) { if (k < 0.9 - i * 0.2) fx.dots.push([hw0[0] + d[0], hw0[1] + d[1] - Math.round(k * 4), '#b8b4ae']); }); }
          // ---- 800 落下 → 880 抬到一半 → 960 在轉（落針、屬性短音、NOW 小窗、音符）
          if (t >= RT.land) {
            TT.deck = { rec: rec(Wn), state: t < RT.arm ? 'land' : t < RT.spin ? 'armMid' : 'spin', by: Wn };
            if (t < RT.arm) fx.dots.push([G.pc[0] - 12, G.pc[1] + 1, '#e8e8ee'], [G.pc[0] + 12, G.pc[1] + 1, '#e8e8ee']);
          } else TT.deck = null;
          if (t >= RT.spin) once('needle', function () { sfx('needle'); if (typeof o.onLand === 'function') o.onLand(Wn, pl[Wn].card || null); });
          if (t >= RT.chime) once('chime', function () { sfx('chime', { attr: lab[Wn] }); });
          // ---- 900–1800：老闆朝贏家舉旗
          if (t >= RT.flag && t < RT.flagEnd) flagOn(fx, Wn); else flagOff();
        } else {
          // ---- 平手：空盤、不落針、不舉旗；600–1320 老闆搖頭（每 120 ms 翻面一次、共 6 次，回到原本朝向）；960 中性短音（空轉的唱針聲）
          setNudge('f', 0); setNudge('p', 0); TT.deck = null;
          if (t >= RT.shake && t < RT.shakeEnd) { shop.flip('o', Math.floor((t - RT.shake) / 120) % 2 === 0); it.shook = true; }
          else if (it.shook) { it.shook = false; shop.flip('o', false); }
          if (t >= RT.spin) once('chime0', function () { sfx('chime', { attr: null }); });
        }
        if (t >= RT.done) resolve();
        return t < RT.end;
      };
      it.end = function () {
        setNudge('f', 0); setNudge('p', 0);
        if (it.hurt) { shop.pose(it.hurt, null); it.hurt = null; }
        if (it.flagged || it.shook) { shop.arm('o', null); shop.flip('o', false); it.flagged = it.shook = false; }
        hideBadges(); resolve();
      };
      return it;
    }
    var turntable = {
      // 一手：t=0（按「丟！」）呼叫；Promise 在 1460 ms ÷ 速度 resolve（減少動態 560 ms ÷ 速度）
      clash: function (o) {
        o = o || {};
        if (!shop || !shop.has('f') || !shop.has('p')) return Promise.resolve();
        if (o.speed > 0) TT.speedK = o.speed;
        if (o.reduced == null) o.reduced = reduced();
        TT.items.filter(function (x) { return x.kind; }).forEach(function (x) { x.step = function () { return false; }; });
        var it = roundItem(o);
        TT.held = {};
        return new Promise(function (res) { it.res = res; ttAdd(it); });
      },
      // 下一手 t=0：抬針（armMid 80 ms）→ 唱片閃兩下消失；方塊收起；TT.deck＝null
      clearClash: function (ms) {
        TT.items.forEach(function (x) { x.step = function () { return false; }; });
        var keep = TT.deck, tot = ms == null ? 150 : ms; TT.deck = null;
        if (tot > 0 && keep && keep.rec) ttAdd({ ignoreSpeed: true, step: function (t, fx) {
          if (t >= tot) return false;
          var lifted = { rec: keep.rec, state: 'armMid', by: keep.by };
          if (t < Math.min(80, tot)) { fx.deck = lifted; return true; }
          var ph = Math.floor((t - 80) / Math.max(1, (tot - 80) / 4));
          fx.deck = ph % 2 === 0 ? lifted : null; return true;
        } });
        hideBadges();
        ttStart(); if (shop) ttTick(shop.now());
        return stage;
      },
      // 手上拿著：{ sleeve: cardId, back? } | 'ace' | null。side：'e'|'f'＝他、'p'＝你（選牌時就看得到：他一直拿著 {back:true}，你點了哪張就拿哪張）；
      // 'o'＝老闆（序章 O11 拿著唱片走回櫃檯）：直接 shop.hold＋arm，不動對決的翻面、不記進 TT.held
      hold: function (side, what) {
        if (side === 'o') { shop.hold('o', what || null); shop.arm('o', what ? 'show' : null); return stage; }
        var id = sid(side); TT.held[id] = what || null;
        setFlips(); shop.hold(id, what || null); shop.arm(id, what ? 'show' : null);
        return stage;
      },
      // 唱盤：deck({ rec:{attr,card,kind}, state:'land'|'armMid'|'spin', by:'e'|'p' } | null)；舊的 deck(side, d) 照收（side 當成 by）
      deck: function (a, b) {
        var d = a, by = null;
        if (typeof a === 'string') { by = a === 'f' ? 'e' : a; d = b; }
        TT.deck = d && d.rec ? { rec: d.rec, state: d.state || 'spin', by: by || d.by || null } : null;
        ttStart(); ttTick(shop.now());
        return stage;
      },
      // 頭頂屬性方塊：badge(side, {attr, star, ace} | null, ms?)；badgeRect(side) → 方塊目前的 CSS 外框（DOMRect，跟 hotRect 同一套座標）| null
      badge: function (side, v, ms) {
        setBadge(side, v || null, v && v.fx);
        if (v && ms > 0) { var s0 = sideOf(side), k0 = TT.badges[s0]; T(function () { if (TT.badges[s0] === k0) setBadge(s0, null); }, ms); }
        return stage;
      },
      badgeRect: function (side) {
        var s = sideOf(side), b = BADGE[s];
        if (!TT.badges[s] || !b || b.style.display === 'none' || typeof b.getBoundingClientRect !== 'function') return null;
        placeBadge(s); return b.getBoundingClientRect();
      },
      // 老闆三角旗：黑＝你、白＝他（null 收起）
      flag: function (side, ms) {
        if (!side) { shop.arm('o', null); return stage; }
        var f = flagPos(side);
        shop.arm('o', 'flag'); shop.flip('o', side === 'e');
        ttAdd({ ignoreSpeed: true, step: function (t, fx) { if (t >= (ms || 900)) return false; fx.flag = f; return true; }, end: function () { shop.arm('o', null); shop.flip('o', false); } });
        return stage;
      },
      burst: function (x, y, size, color, ms) { ttAdd({ fastTo: ms || 120, step: function (t, fx) { fx.sparks.push({ x: x, y: y, size: size || 'small', c: color }); return t < (ms || 120); } }); return stage; },
      flatDisc: function (at, attr, o) { o = o || {}; ttAdd({ step: function (t, fx) { fx.discs.push({ x: at[0], y: at[1], attr: attr, flat: true, void: !!o.void, kind: o.kind }); return t < (o.ms || 2000); } }); return stage; },
      // 地上一張平躺的唱片，直到 floorRecord(null)（收尾 E4：他走了，唱片留在他站的位置）。at＝spot 名、[x,y] 或人（'f'／'p'／'o'）
      floorRecord: function (at, o) {
        o = o || {};
        if (at == null) { TT.floor = null; if (shop) ttTick(shop.now()); return stage; }
        var q = null;
        if (Array.isArray(at)) q = at;
        else { var k = spotName('p', at); if (k && (L.spots || {})[k]) q = L.spots[k]; else { var a = shop.pos(at); if (a) q = [Math.round(a.x), Math.round(a.y)]; } }
        if (!q) { console.warn('[stage] floorRecord: unknown place', at); return stage; }
        TT.floor = { x: q[0], y: q[1], attr: o.attr || 'c', card: o.card || null, kind: o.kind || (o.ace ? 'ace' : null) };
        ttStart(); ttTick(shop.now());
        return stage;
      },
      pause: function (on) { TT.paused = !!on; return stage; },
      speed: function (k) { if (k > 0) TT.speedK = k; return stage; },
      // 除錯／截圖：把正在演的時間軸停在 t（ms）。t==null＝放開
      seek: function (t) { if (t == null) { TT.paused = false; return stage; } TT.paused = true; TT.items.forEach(function (x) { x.t = t; }); ttTick(shop.now()); shop.render(); return stage; },
      clashState: function () {
        var bd = {}; ['e', 'p'].forEach(function (s) { var v = TT.badges[s]; bd[s] = v ? { attr: v.attr, star: v.star, ace: v.ace, fx: v.fx || '' } : null; });
        return { items: TT.items.length, deck: TT.deck ? JSON.parse(JSON.stringify(TT.deck)) : null, held: JSON.parse(JSON.stringify(TT.held)), badges: bd, paused: TT.paused, speed: TT.speedK, fast: TT.fast };
      }
    };
    function ttReset() {
      TT.items = []; TT.deck = null; TT.held = {}; TT.paused = false; hideBadges(); TT.badges = {};
      if (TT.off) { TT.off(); TT.off = null; } if (TT.fast && shop) shop.fast(false); TT.fast = false;
      if (shop) { shop.state.fx = null; shop.state.deck = null; ['f', 'p', 'o'].forEach(function (id) { shop.arm(id, null); shop.hold(id, null); shop.nudge(id, 0); }); }
      TT.nudge = {};
      if (TT.floor) ttStart();   // 地上的唱片留到 floorRecord(null)
    }

    // ---------------- 公開 API
    var WALK = {};   // id → { to, done }：最後一次 walk 的終點（finish 用）
    var stage = {
      version: '4.0',
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
          stage.clearStamps(); TT.floor = null; ttReset(); TAGS = {}; WALK = {}; focusPrev = null;
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
        var pr = shop.walk(id, path, spd), w = { to: path.length ? path[path.length - 1] : null, done: !path.length };
        WALK[id] = w;
        if (pr && typeof pr.then === 'function') pr.then(function () { w.done = true; });   // 只接成功：嚴格模式走不到的 reject 照樣冒出來
        return pr;
      },
      // ⏩／點一下快轉（SPEC-v4 §2.3.2）：把這個人正在走的那段直接放到終點（shop.put 會 resolve 那個 walk Promise），姿勢回 null
      finish: function (id) {
        var w = WALK[id];
        if (!w || w.done || w.to == null || !shop) return stage;
        w.done = true; shop.put(id, w.to); shop.pose(id, null);
        return stage;
      },
      finishAll: function () { ['p', 'o', 'f', 'q1', 'q2'].forEach(function (id) { stage.finish(id); }); return stage; },
      // 讓 id 面向 other（人、spot 名或 [x,y]）
      faceTo: function (id, other) {
        var a = shop.pos(id), b = null;
        if (Array.isArray(other)) b = { x: other[0], y: other[1] };
        else if (other != null) { b = shop.pos(other); if (!b) { var k = spotName(id, other); if (k && (L.spots || {})[k]) b = { x: L.spots[k][0], y: L.spots[k][1] }; } }
        if (a && b && Math.round(b.x) !== Math.round(a.x)) shop.flip(id, b.x < a.x);
        return stage;
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
      // 名牌：記下來（頭頂屬性方塊出現時暫時收起、收方塊時還原）
      tag: function (id, text, side, lr) {
        TAGS[id] = text ? [text, side, lr] : null;
        if (text && (id === 'f' || id === 'p') && TT.badges[sideOf(id)]) { shop.untag(id); return null; }
        return shop.tag(id, text, side, lr);
      },
      untag: function (id) { if (id == null) TAGS = {}; else delete TAGS[id]; shop.untag(id); return stage; },
      float: function (id, text, cls) { return shop.float(id, text, cls); },
      anchor: function (id) { return shop.anchor(id); },
      hotRect: function (id) { return shop.hotRect(hotId(id)); },
      highlight: function (list) { shop.highlight(list || []); return stage; },
      // 箱子（SPEC-v4 §2.3.5、§2.3.8）：從 layout 讀；focus／unfocus＝抽屜開著時把那一箱留在畫面上
      bins: function () {
        return (L.props || []).filter(function (o) { return o.bin && o.bin.key; }).map(function (o) {
          return { key: o.bin.key, hotId: 'bin:' + o.bin.key, label: o.bin.label || '', stand: (o.bin.stand || []).slice(), propId: o.id };
        });
      },
      focus: focus,
      unfocus: unfocus,
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
            // shop.route 回 []（或舊版 null）＝走不到：路長用直線距離估，照常 walk（walk 自己走退路，SPEC-v4 §2.4.5）
            var rt = shop.route([at.x, at.y], to); if (!rt || !rt.length) rt = [[s[0], s[1]]];
            var pts = [[at.x, at.y]].concat(rt), len = 0;
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

  W.DipLabStage = { mount: mount, loadLayout: loadLayout, fitCamera: fitCamera, pickCamera: pickCamera, ALIAS: ALIAS, PANEL_MIN: PANEL_MIN, INTERACT: INTERACT, version: '4.0' };
})();
