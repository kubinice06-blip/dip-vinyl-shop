/* shop.js：DipShop 像素唱片行渲染器（核心）。SPEC-v2 §5。
 *
 * 一個原則：1 場景像素 = 1 小人像素。整間店畫在低解析度世界畫布（dip 本店 144×144），
 * 鏡頭（camera）把世界的一段 y 範圍貼到放大的 <canvas>；倍率對齊裝置像素（390 寬 ×3、360 寬 DPR 3 ×2.667），
 * CSS image-rendering: pixelated。牆、地板、櫃檯、唱片箱、封面、小人全部在同一個格子上。
 *
 *   var shop = DipShop.mount(hostEl, layoutJSON, {
 *     cards: { id: { localCover, coverUrl, artist, album } },  // 牆上唱片、箱子、正在放
 *     coverBase: './',                                         // localCover 相對路徑的基準
 *     sprites: { owner: rows, e0: rows } | function () {},    // 小人（dip-character.js 的列格式）
 *     spritePal: PIX_PAL, onAction: function (action, hot) {}
 *   });
 *   shop.put('p', 'door', rows) / walk('p', ['door','pay']) / say('o','「歡迎。」') / door('open')
 *   shop.setView({ y, h }) / tweenView({ y, h }, ms) / tag / untag / float / anchor / pose / emote / highlight / hotRect
 *
 * 道具在 shop-props.js 用 DipShop.defProp(type, spec) 註冊；店的配置是純 JSON（shops/*.json）。
 * 只掛 window.DipShop；不宣告 dip-character.js 的同名全域。
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.DipShop = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ===================================================================== 調色盤
  // 名字 → 色碼。店的 JSON 可以覆寫任何一格（不同店＝不同配色，同一套道具程式）。
  var DEFAULT_PAL = {
    // 小人與全站共用（dip-character.js PIX_PAL 的 17 色）
    k: '#111111', g: '#b8860b', r: '#c11628', b: '#1f5fae', w: '#ffffff', e: '#d8d8d8', d: '#888888',
    n: '#2e7d52', p: '#6a3fa0', o: '#e0851c', y: '#f0c75e', s: '#e8b48c', c: '#3fb6c9', t: '#c68642',
    u: '#8d5524', v: '#f6dcc4', m: '#e75480',
    line: '#1c120b',
    // 家具木頭（深→淺）
    wd0: '#2a1a10', wd1: '#452c1b', wd2: '#673f24', wd3: '#8a5730', wd4: '#ae7642', wd5: '#cf9a5e', wd6: '#e8c38c',
    // 牆（淺木板）
    wl0: '#8c6a44', wl1: '#b18c5c', wl2: '#c9a571', wl3: '#dbbb86', wl4: '#ecd3a5',
    // 地板
    fl0: '#3a2414', fl1: '#553620', fl2: '#6e4629', fl3: '#865733', fl4: '#9e6a3f',
    // 夜、雨、玻璃
    nt0: '#0d1220', nt1: '#18223a', nt2: '#27385a', nt3: '#456189', nt4: '#88a8d0', nt5: '#cfe0f2',
    // 金屬、塑膠
    mt0: '#1f1f24', mt1: '#36363e', mt2: '#55555f', mt3: '#83838e', mt4: '#b9b9c2', mt5: '#e8e8ee',
    // 植物
    gr0: '#163a25', gr1: '#235c38', gr2: '#2e7d52', gr3: '#4ea468', gr4: '#8acb7c',
    // 紙、海報
    pp0: '#d9ccb0', pp1: '#efe5cf', pp2: '#fbf6ea',
    // 燈
    lt0: '#ffd27a', lt1: '#fff1c2',
    // 選取外框
    hi: '#ffffff', hi2: '#f0c75e', shade: '#000000'
  };
  // 封面縮圖 palette 模式用的量化色盤
  var COVER_EXTRA = ['#000000', '#2b2b2b', '#4a4a4a', '#6f6f6f', '#9a9a9a', '#c4c4c4', '#eeeeee', '#ffffff',
    '#5a1a14', '#8e2a1e', '#c94a2a', '#e8803a', '#f2b45a', '#f7e08a', '#cbbf6a', '#7e7a2e',
    '#1e3a1e', '#3e6e3a', '#7aa858', '#1a2a4a', '#2c5a9a', '#5a8ad0', '#9ac4ec', '#3a2060',
    '#7a4aa8', '#c47ab8', '#e8a0a8', '#f4cfb0', '#c08a64', '#7a4a2e', '#3a2418', '#e0d4b8'];

  var BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  function bayer(x, y) { return BAYER4[(y & 3) * 4 + (x & 3)] / 16; }
  function hexRGB(h) { h = String(h).replace('#', ''); if (h.length === 3) h = h.replace(/./g, '$&$&'); var n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  function seeded(seed) {   // mulberry32
    var a = 0; for (var i = 0; i < String(seed).length; i++) a = (a * 31 + String(seed).charCodeAt(i)) | 0;
    return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function now() { return (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now(); }
  function reducedMotion() { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (_) { return false; } }

  // ===================================================================== 3×5 像素字（招牌、箱子標籤）
  var GLYPH = {
    A: '010101111101101', B: '110101110101110', C: '011100100100011', D: '110101101101110', E: '111100110100111',
    F: '111100110100100', G: '011100101101011', H: '101101111101101', I: '111010010010111', J: '001001001101010',
    K: '101101110101101', L: '100100100100111', M: '1000111011101011000110001', N: '10011101101110011001', O: '010101101101010',
    P: '111101111100100', Q: '010101101110011', R: '110101110101101', S: '011100010001110', T: '111010010010010',
    U: '101101101101111', V: '101101101010010', W: '1000110001101011101110001', X: '101101010101101', Y: '101101010010010',
    Z: '111001010100111', '0': '111101101101111', '1': '010110010010111', '2': '110001010100111', '3': '110001010001110',
    '4': '101101111001001', '5': '111100110001110', '6': '011100110101010', '7': '111001010010010', '8': '010101010101010',
    '9': '010101011001110', '-': '000000111000000', '/': '001001010100100', '.': '000000000000010', '!': '010010010000010',
    '?': '110001010000010', '&': '010101010101011', "'": '010010000000000', ':': '000010000010000', ' ': '000000000000000',
    '♪': '011010010110110', '+': '000010111010000', '#': '101111101111101'
  };

  // 像素手指（教學聚光與 tutorial.js 共用，9×9）
  var HAND = ['...kk....', '..kwwk...', '..kwwk...', '..kwwkkk.', '.kkwwwwwk', 'kwkwwwwwk', 'kwwwwwwwk', '.kwwwwwk.', '..kkkkk..'];
  // 頭上小圖示（舞台畫，不用 emoji 字元）
  var EMOTE = {
    anger: ['.r...r.', 'rr...rr', '.......', '.......', '.......', 'rr...rr', '.r...r.'],
    angerB: ['.......', '..r.r..', '.rr.rr.', '.......', '.rr.rr.', '..r.r..', '.......'],
    note: ['..kk', '..kk', '..k.', '..k.', 'kkk.', 'kkk.'],
    record: ['.kkk.', 'kkkkk', 'kkrkk', 'kkkkk', '.kkk.'],
    excl: ['.rr.', '.rr.', '.rr.', '.rr.', '....', '.rr.'],
    sweat: ['.c.', 'ccc', 'ccc', '.c.'],
    tea: ['.d..d.', '..d..d', 'kkkkk.', 'kwwwkk', 'kwwwk.', '.kkk..'],
    dots: ['k.k.k']
  };

  // ===================================================================== 畫筆（全部整數座標）
  function Painter(ctx, pal) {
    var P = {
      ctx: ctx, pal: pal,
      col: function (c) { return c == null ? null : (c.charAt(0) === '#' || c.indexOf('rgb') === 0) ? c : (pal[c] || '#ff00ff'); },
      rect: function (x, y, w, h, c) { if (w <= 0 || h <= 0 || c == null) return; ctx.fillStyle = P.col(c); ctx.fillRect(x | 0, y | 0, w | 0, h | 0); },
      px: function (x, y, c) { P.rect(x, y, 1, 1, c); },
      hl: function (x, y, n, c) { P.rect(x, y, n, 1, c); },
      vl: function (x, y, n, c) { P.rect(x, y, 1, n, c); },
      frame: function (x, y, w, h, c) { P.hl(x, y, w, c); P.hl(x, y + h - 1, w, c); P.vl(x, y, h, c); P.vl(x + w - 1, y, h, c); },
      box: function (x, y, w, h, fill, line) { P.rect(x, y, w, h, fill); if (line) P.frame(x, y, w, h, line); },
      dither: function (x, y, w, h, c, level, ox, oy) {
        ctx.fillStyle = P.col(c); ox = ox || 0; oy = oy || 0;
        for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) if (bayer(x + i + ox, y + j + oy) < level) ctx.fillRect(x + i, y + j, 1, 1);
      },
      ellipse: function (cx, cy, rx, ry, c) {
        ctx.fillStyle = P.col(c);
        for (var j = -ry; j <= ry; j++) { var hw = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j * j) / ((ry + 0.5) * (ry + 0.5))))); if (hw > 0 || j === 0) ctx.fillRect(cx - hw, cy + j, hw * 2 + 1, 1); }
      },
      ring: function (cx, cy, rx, ry, c) {
        ctx.fillStyle = P.col(c); var last = null;
        for (var a = 0; a < 360; a += 2) { var x = Math.round(cx + rx * Math.cos(a * Math.PI / 180)), y = Math.round(cy + ry * Math.sin(a * Math.PI / 180)); var k = x + ',' + y; if (k !== last) { ctx.fillRect(x, y, 1, 1); last = k; } }
      },
      textW: function (s) { s = String(s).toUpperCase(); var w = 0; for (var i = 0; i < s.length; i++) w += ((GLYPH[s.charAt(i)] || GLYPH['?']).length / 5) + 1; return Math.max(0, w - 1); },
      text: function (s, x, y, c) {
        s = String(s).toUpperCase(); ctx.fillStyle = P.col(c);
        var cx = x;   // 可變寬：3、4、5 格寬的字（M、N、W 用寬字）
        for (var i = 0; i < s.length; i++) { var g = GLYPH[s.charAt(i)] || GLYPH['?'], gw = g.length / 5; for (var b = 0; b < g.length; b++) if (g.charAt(b) === '1') ctx.fillRect(cx + (b % gw), y + ((b / gw) | 0), 1, 1); cx += gw + 1; }
        return cx - x - 1;
      },
      // 小人／圖示：rows 是字母陣列，sp 是字母→色碼（PIX_PAL 格式）
      sprite: function (rows, x, y, sp, o) {
        o = o || {}; var w = rows[0].length;
        for (var j = 0; j < rows.length; j++) {
          var row = rows[j];
          for (var i = 0; i < w; i++) {
            var ch = row.charAt(o.flip ? w - 1 - i : i); if (ch === '.' || ch === ' ' || !ch) continue;
            ctx.fillStyle = o.sil ? (o.sil === true ? '#0b0f1a' : o.sil) : ((sp && sp[ch]) || pal[ch] || '#ff00ff');
            ctx.fillRect(x + i, y + j, 1, 1);
          }
        }
      },
      img: function (cv, x, y, w, h) { if (cv) ctx.drawImage(cv, x | 0, y | 0, w || cv.width, h || cv.height); },
      shadow: function (x, y, w, lvl) { P.dither(x, y, w, 1, 'shade', lvl == null ? 0.5 : lvl); }
    };
    return P;
  }

  // ===================================================================== 道具註冊表
  var PROPS = {};
  // spec: { layer:'wall'|'floor'|'stand'|'ceiling'|'front', box(o)->[x,y,w,h], base(o)->y, draw(P,o,S), lights(o)->[], hots(o,S)->[] }
  function defProp(type, spec) { PROPS[type] = spec; }
  function propBox(o) { var sp = PROPS[o.type]; return (sp && sp.box) ? sp.box(o) : [o.x, o.y, o.w || 8, o.h || 8]; }
  function propBase(o) { if (o.base != null) return o.base; var sp = PROPS[o.type]; if (sp && sp.base) return sp.base(o); var b = propBox(o); return b[1] + b[3]; }
  function propLayer(o) { return o.layer || (PROPS[o.type] && PROPS[o.type].layer) || 'stand'; }

  // ===================================================================== 封面 → 像素封面
  var coverCache = {};
  function nearestFn(palHex) {
    var P = palHex.map(hexRGB);
    return function (r, g, b) {
      var best = 0, bd = 1e9;
      for (var i = 0; i < P.length; i++) { var dr = r - P[i][0], dg = g - P[i][1], db = b - P[i][2]; var d = dr * dr * 0.30 + dg * dg * 0.59 + db * db * 0.11; if (d < bd) { bd = d; best = i; } }
      return P[best];
    };
  }
  var coverNearest = null;
  function pixelateCover(img, size, mode) {
    var S4 = size * 4, big = document.createElement('canvas'); big.width = big.height = S4;
    var bx = big.getContext('2d', { willReadFrequently: true }); bx.imageSmoothingEnabled = true; bx.imageSmoothingQuality = 'high';
    // 先縮到中間尺寸再縮到 4 倍、自己做 4×4 平均：瀏覽器之間結果一致
    var mid = document.createElement('canvas'); mid.width = mid.height = Math.max(S4, 64);
    var mx = mid.getContext('2d'); mx.imageSmoothingEnabled = true; mx.imageSmoothingQuality = 'high';
    mx.drawImage(img, 0, 0, mid.width, mid.height); bx.drawImage(mid, 0, 0, S4, S4);
    var src = bx.getImageData(0, 0, S4, S4).data;   // 跨來源沒 CORS 會丟 SecurityError，由呼叫端接
    var out = document.createElement('canvas'); out.width = out.height = size;
    var ox = out.getContext('2d'), od = ox.createImageData(size, size), d = od.data;
    if (!coverNearest) coverNearest = nearestFn(COVER_EXTRA);
    for (var y = 0; y < size; y++) for (var x = 0; x < size; x++) {
      var r = 0, g = 0, b = 0;
      for (var j = 0; j < 4; j++) for (var i = 0; i < 4; i++) { var k = ((y * 4 + j) * S4 + (x * 4 + i)) * 4; r += src[k]; g += src[k + 1]; b += src[k + 2]; }
      r /= 16; g /= 16; b /= 16;
      var l = (r + g + b) / 3; r = l + (r - l) * 1.25; g = l + (g - l) * 1.25; b = l + (b - l) * 1.25;
      r = (r - 128) * 1.08 + 128; g = (g - 128) * 1.08 + 128; b = (b - 128) * 1.08 + 128;
      var q;
      if (mode === 'palette') q = coverNearest(r, g, b);
      else if (mode === 'poster') { var L = 5, st = 255 / (L - 1), th = (bayer(x, y) - 0.5) * st * 0.6; q = [r, g, b].map(function (v) { return clamp(Math.round((v + th) / st) * st, 0, 255); }); }
      else q = [r, g, b].map(function (v) { return clamp(v, 0, 255); });
      var o = (y * size + x) * 4; d[o] = q[0]; d[o + 1] = q[1]; d[o + 2] = q[2]; d[o + 3] = 255;
    }
    ox.putImageData(od, 0, 0);
    return out;
  }
  function loadCover(url, size, mode) {
    var key = url + '@' + size + ':' + mode;
    var c = coverCache[key];
    if (c) return c.cv;
    c = coverCache[key] = { cv: null };
    var img = new Image();
    if (/^https?:/.test(url) && url.indexOf(location.origin) !== 0) img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = function () { try { c.cv = pixelateCover(img, size, mode); } catch (e) { c.cv = null; c.failed = true; } };
    img.onerror = function () { c.failed = true; };
    img.src = url;
    return null;
  }

  // ===================================================================== 小人變形（倒下＝轉 90 度）
  function rotRows(rows) {   // 順時針轉 90 度：頭朝右躺下
    var h = rows.length, w = rows[0].length, out = [];
    for (var i = 0; i < w; i++) { var s = ''; for (var j = h - 1; j >= 0; j--) s += rows[j].charAt(i) || '.'; out.push(s); }
    return out;
  }

  // ===================================================================== 掛載
  function mount(host, layout, opts) {
    opts = opts || {};
    var L = layout, W = L.size[0], H = L.size[1];
    var pal = Object.assign({}, DEFAULT_PAL, L.palette || {});
    var spritePal = Object.assign({}, opts.spritePal || {});
    var world = document.createElement('canvas'); world.width = W; world.height = H;
    var wctx = world.getContext('2d', { willReadFrequently: true });
    var P = Painter(wctx, pal);
    var view = document.createElement('canvas'); view.className = 'ds-canvas';
    view.setAttribute('aria-hidden', 'true');
    var vctx = view.getContext('2d');
    var overlay = document.createElement('div'); overlay.className = 'ds-overlay';
    host.classList.add('ds-host'); host.innerHTML = ''; host.appendChild(view); host.appendChild(overlay);
    var state = { door: 'closed', playing: true, t: 0, rt: 0, frame: 0, spot: null, flash: null, reveal: 0, hover: null, hi: [], poke: {} };
    state.door = (L.ambience && L.ambience.door) || 'closed';
    if (L.ambience && L.ambience.playing === false) state.playing = false;
    var actors = {}, hots = [], destroyed = false, lightMap = null;
    var scale = 3, vx = 0, vy = 0, vw = W, vh = H, hostW = 0, devPx = 3;
    var cam = { y: 0, h: H, dev: null };
    var c0 = (L.cameras || {}).full; if (c0) { cam.y = c0.y; cam.h = c0.h; }
    var cardOf = function (id) { return (opts.cards && opts.cards[id]) || null; };
    var coverMode = opts.coverMode || L.coverMode || 'raw';
    var sparkleOn = opts.sparkle !== false, allowFn = null;
    function spd() { var k = typeof opts.speed === 'function' ? opts.speed() : (opts.speed || 1); return k > 0 ? k : 1; }

    // ---------------- 封面
    function coverURL(id) {
      var c = cardOf(id); if (!c) return null;
      var u = c.localCover || c.coverUrl; if (!u) return null;
      if (c.localCover) { try { u = new URL(c.localCover, new URL(opts.coverBase || './', location.href)).href; } catch (_) {} }
      return u;
    }
    function cover(id, size) { var u = coverURL(id); if (!u) return null; return loadCover(u, size, coverMode); }

    // ---------------- 場景物件 S（給道具用）
    var S = {
      W: W, H: H, layout: L, pal: pal, state: state,
      get t() { return state.t; }, get rt() { return state.rt; }, get frame() { return state.frame; },
      cover: cover, card: cardOf, rand: seeded,
      wallBase: (L.wall && L.wall.h != null) ? L.wall.h : 58,
      // 門、窗會呼叫：把站在門外的人畫在開口裡（clip）；o.sil＝隔著玻璃只看得到剪影
      drawOutside: function (P2, rect, o) {
        o = o || {};
        var list = Object.keys(actors).map(function (k) { return actors[k]; }).filter(function (a) { return !a.hidden && a.outside && a.rows; });
        if (!list.length) return;
        var c = P2.ctx; c.save(); c.beginPath(); c.rect(rect[0], rect[1], rect[2], rect[3]); c.clip();
        list.sort(function (a, b) { return a.y - b.y; }).forEach(function (a) { drawActor(P2, a, o.sil ? 'sil' : 'night'); });
        if (!o.sil) { c.fillStyle = 'rgba(13,18,40,0.38)'; c.fillRect(rect[0], rect[1], rect[2], rect[3]); }
        c.restore();
      }
    };

    // ---------------- 小人
    function rowsOf(spr) {
      if (!spr) return null;
      if (Array.isArray(spr)) return spr;
      var lib = typeof opts.sprites === 'function' ? opts.sprites() : opts.sprites;
      if (typeof spr === 'string' && lib && lib[spr]) return lib[spr];
      if (typeof opts.resolveSprite === 'function') { var r = opts.resolveSprite(spr); if (r) return r; }
      return null;
    }
    function spotXY(key) {
      if (Array.isArray(key)) return { x: key[0], y: key[1], outside: !!key[2] };
      if (key && typeof key === 'object' && key.x != null) return { x: key.x, y: key.y, outside: !!key.outside };
      var sp = (L.spots || {})[key];
      if (!sp && typeof opts.resolveSpot === 'function') sp = opts.resolveSpot(key);
      if (!sp) return null;
      return { x: sp[0], y: sp[1], outside: !!sp[2] };
    }
    function poseOf(a) { if (a.poseUntil && state.rt > a.poseUntil) { a.pose = null; a.poseUntil = 0; } return a.pose; }
    function drawActor(P2, a, inOutside) {
      var rows = a.rows; if (!rows) return;
      var pose = inOutside ? null : poseOf(a);
      var bob = 0, ox = 0, oy = 0;
      if (a.moving) bob = (Math.floor(state.t * 8) % 2);
      if (pose === 'atk') ox = 2 * (a.fwd || 1);
      else if (pose === 'hurt') ox = -(a.fwd || 1);
      else if (pose === 'dig') oy = Math.floor(state.t * 8) % 2;
      else if (pose === 'busy') oy = Math.floor(state.t * 3) % 2;
      var fx = Math.round(a.x) + ox, fy = Math.round(a.y);
      if (pose === 'ko') {
        var rr = a._rot || (a._rot = { src: rows, rows: rotRows(rows) });
        if (rr.src !== rows) { rr.src = rows; rr.rows = rotRows(rows); }
        // 躺在地上：頭朝門外那側，腳底對齊地面
        if (!inOutside) P2.rect(fx - 8, fy + 1, 16, 1, 'rgba(18,8,2,0.4)');
        P2.sprite(rr.rows, fx - 9, fy - 12, spritePal, { flip: (a.fwd || 1) > 0 });
        return;
      }
      if (pose === 'sit') {   // 坐下（門口台階、試聽機的圓凳）：不畫腿，身體往下 3 格
        rows = a._sit && a._sit.src === a.rows ? a._sit.rows : (a._sit = { src: a.rows, rows: a.rows.slice(0, 12) }).rows;
        oy = 3;
      }
      var x = fx - 8, y = fy - 14 + (a.dy || 0) + oy;
      if (!inOutside && !a.sil) P2.rect(fx - 4, fy + 1, 8, 1, 'rgba(18,8,2,0.4)');
      var sil = a.sil ? true : inOutside === 'sil' ? '#0a0e1c' : null;
      if (pose === 'warn' && !sil) {   // 金色描邊（脈動）
        if (Math.floor(state.t * 4) % 2 === 0) [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (d) { P2.sprite(rows, x + d[0], y + d[1] - (a.moving ? bob : 0), spritePal, { flip: a.flip, sil: '#f0c75e' }); });
      }
      P2.sprite(rows, x, y - (a.moving ? bob : 0), spritePal, { flip: a.flip, sil: sil });
      // 受擊：閃紅（疊一層半透明紅，不整個塗掉，看得出是誰）
      if (pose === 'hurt' && !sil && Math.floor((state.rt - (a.poseAt || 0)) * 10) % 2 === 0) P2.sprite(rows, x, y, spritePal, { flip: a.flip, sil: 'rgba(230,40,56,0.6)' });
      // 呼吸：站著時偶爾眨眼
      if (!a.moving && !sil && a.bob !== false && !pose && rows[4] && Math.floor(state.t * 10 + a.phase * 7) % 34 === 0) {
        for (var i = 0; i < rows[4].length; i++) if (rows[4].charAt(i) === 'k' && rows[3].charAt(i) !== 'k') P2.px(x + (a.flip ? rows[4].length - 1 - i : i), y + 4, spritePal.s || '#e8b48c');
      }
      // 頭上小圖示
      if (a.emote && (!a.emoteUntil || state.rt < a.emoteUntil)) {
        var k = a.emote; if (k === 'anger' && Math.floor(state.t * 4) % 2) k = 'angerB';
        var er = EMOTE[k]; if (er) {
          // 頭頂右上，白色描邊（在深色櫃檯、牆上也看得清楚）
          var ew = er[0].length, ex = fx + 5 - Math.floor(ew / 2), ey = y - er.length - 1 + (Math.floor(state.t * 3) % 2);
          if (k === 'anger' || k === 'angerB') P2.sprite(er, ex + 1, ey + 1, null, { sil: 'rgba(17,17,17,0.7)' });   // 怒：細線條，只加陰影不描白（描白會糊成一團）
          else [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (d) { P2.sprite(er, ex + d[0], ey + d[1], null, { sil: '#ffffff' }); });
          P2.sprite(er, ex, ey, { r: '#e0303f', k: '#111111', c: '#3fb6c9' }, {});
        }
      } else if (a.emote) a.emote = null;
    }
    function actor(id) {
      if (!actors[id]) actors[id] = { id: id, x: 0, y: 0, rows: null, hidden: true, flip: false, phase: Math.random() * 2, outside: false };
      return actors[id];
    }

    // ---------------- 熱點
    function buildHots() {
      hots = [];
      (L.props || []).forEach(function (o, idx) {
        var sp = PROPS[o.type]; if (!sp || o.hidden) return;
        if (sp.hots) (sp.hots(o, S) || []).forEach(function (h) { h.prop = o; h.order = idx; h.sub = true; hots.push(h); });
        if (o.hot) {
          var b = propBox(o);
          hots.push({ id: o.id || (o.type + idx), rect: o.hot.rect || b, label: o.hot.label, action: o.hot.action, prop: o, order: idx, mask: null, pri: o.hot.pri || 0, noSparkle: !!o.hot.noSparkle });
        }
      });
      (L.hotspots || []).forEach(function (h, k) { hots.push(Object.assign({ order: 1000 + k }, h)); });
      // 遮罩：把道具單獨畫一次，取不透明像素，算外框
      var mc = document.createElement('canvas'); mc.width = W; mc.height = H;
      var mx = mc.getContext('2d', { willReadFrequently: true }), MP = Painter(mx, pal);
      hots.forEach(function (h) {
        var r = h.rect; h.mask = null; h.outline = [];
        if (h.prop && !h.sub && !h.rectOnly) {
          mx.clearRect(0, 0, W, H);
          try { PROPS[h.prop.type].draw(MP, h.prop, maskS); } catch (e) {}
          var d = mx.getImageData(0, 0, W, H).data, m = new Uint8Array(W * H), any = false;
          for (var i = 0; i < W * H; i++) if (d[i * 4 + 3] > 20) { m[i] = 1; any = true; }
          if (any) h.mask = m;
        }
        h.outline = outlineOf(h.mask, r);
        h.cx = r[0] + r[2] / 2; h.cy = r[1] + r[3] / 2;
      });
    }
    var maskS = Object.create(S); Object.defineProperty(maskS, 't', { value: 0 }); Object.defineProperty(maskS, 'frame', { value: 0 }); maskS.drawOutside = function () {}; maskS.mask = true;
    function outlineOf(mask, r) {
      var out = [];
      if (!mask) {
        for (var x = r[0] - 1; x <= r[0] + r[2]; x++) { out.push([x, r[1] - 1]); out.push([x, r[1] + r[3]]); }
        for (var y = r[1]; y < r[1] + r[3]; y++) { out.push([r[0] - 1, y]); out.push([r[0] + r[2], y]); }
        return out;
      }
      for (var yy = 0; yy < H; yy++) for (var xx = 0; xx < W; xx++) {
        if (mask[yy * W + xx]) continue;
        if ((xx > 0 && mask[yy * W + xx - 1]) || (xx < W - 1 && mask[yy * W + xx + 1]) || (yy > 0 && mask[(yy - 1) * W + xx]) || (yy < H - 1 && mask[(yy + 1) * W + xx])) out.push([xx, yy]);
      }
      return out;
    }
    // 跟著小人走的熱點（例：老闆走去挖箱時，點他本人還是「老闆」）：rel＝相對腳底的 [dx, dy, w, h]
    function syncFollow() {
      hots.forEach(function (h) {
        if (!h.follow) return;
        var a = actors[h.follow], rel = h.rel || [-6, -14, 12, 15];
        h.gone = !a || a.hidden || a.outside || !a.rows;
        if (h.gone) return;
        var r = [Math.round(a.x) + rel[0], Math.round(a.y) + rel[1], rel[2], rel[3]];
        if (!h.rect || r[0] !== h.rect[0] || r[1] !== h.rect[1]) { h.rect = r; h.outline = outlineOf(null, r); h.cx = r[0] + r[2] / 2; h.cy = r[1] + r[3] / 2; }
      });
    }
    function enabled(h) { return !h.disabled && !h.gone && (!allowFn || allowFn(h)); }
    function hitTest(x, y) {
      syncFollow();
      var cand = hots.filter(enabled);
      cand.sort(function (a, b) { return (b.sub ? 1 : 0) - (a.sub ? 1 : 0) || (b.pri || 0) - (a.pri || 0) || b.order - a.order; });
      for (var i = 0; i < cand.length; i++) {
        var h = cand[i], r = h.rect;
        if (x < r[0] || y < r[1] || x >= r[0] + r[2] || y >= r[1] + r[3]) continue;
        if (h.mask && !maskNear(h.mask, x, y, 1)) continue;
        return h;
      }
      // 手指胖：4 格內最近的
      var best = null, bd = 16;
      cand.forEach(function (h) { var r = h.rect; var dx = Math.max(r[0] - x, 0, x - (r[0] + r[2] - 1)), dy = Math.max(r[1] - y, 0, y - (r[1] + r[3] - 1)); var d = dx * dx + dy * dy; if (d < bd) { bd = d; best = h; } });
      return best;
    }
    function maskNear(m, x, y, rad) { for (var j = -rad; j <= rad; j++) for (var i = -rad; i <= rad; i++) { var xx = x + i, yy = y + j; if (xx >= 0 && yy >= 0 && xx < W && yy < H && m[yy * W + xx]) return true; } return false; }
    function hotById(id) { for (var i = 0; i < hots.length; i++) if (hots[i].id === id) return hots[i]; return null; }

    // ---------------- 光（靜態光照圖）
    function buildLight() {
      var lt = L.light || {}, amb = lt.ambient == null ? 0.92 : lt.ambient, vig = lt.vignette == null ? 0.22 : lt.vignette;
      var lights = [];
      (L.props || []).forEach(function (o) { var sp = PROPS[o.type]; if (sp && sp.lights && !o.hidden) lights = lights.concat(sp.lights(o, S) || []); });
      (lt.extra || []).forEach(function (l) { lights.push(l); });
      var m = new Float32Array(W * H), step = lt.step || 0.07;
      for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
        var v = amb;
        var ex = (x - W / 2) / (W / 2), ey = (y - H * 0.45) / (H * 0.62);
        v -= vig * Math.max(0, Math.sqrt(ex * ex + ey * ey) - 0.55) * 1.6;
        for (var k = 0; k < lights.length; k++) { var l = lights[k], dx = (x - l.x) / l.rx, dy = (y - l.y) / (l.ry || l.rx); var d = Math.sqrt(dx * dx + dy * dy); if (d < 1) v += (l.power || 0.25) * (1 - d) * (1 - d * 0.3); }
        m[y * W + x] = clamp(lt.dither ? Math.floor((v + (bayer(x, y) - 0.5) * step) / step + 0.5) * step : Math.round(v * 64) / 64, 0.35, 1.35);
      }
      lightMap = m;
      state.warm = hexRGB(lt.warm || '#ffcf80');
    }
    function applyLight() {
      if (!lightMap || (L.light && L.light.off)) return;
      var id; try { id = wctx.getImageData(0, 0, W, H); } catch (e) { return; }
      var d = id.data, wr = state.warm, dim = state.dim || 1;
      for (var i = 0, n = W * H; i < n; i++) {
        var k = lightMap[i] * dim; if (k === 1) continue; var o = i * 4;
        if (k < 1) { d[o] *= k; d[o + 1] *= k * 0.98; d[o + 2] *= k * 1.02; }
        else { var e = k - 1; d[o] = Math.min(255, d[o] * (1 + e * 0.5) + wr[0] * e * 0.35); d[o + 1] = Math.min(255, d[o + 1] * (1 + e * 0.45) + wr[1] * e * 0.3); d[o + 2] = Math.min(255, d[o + 2] * (1 + e * 0.2) + wr[2] * e * 0.15); }
      }
      wctx.putImageData(id, 0, 0);
    }

    // ---------------- 牆與地板
    function drawShell() {
      var wall = L.wall || {}, floor = L.floor || {}, wb = S.wallBase;
      var fs = PROPS['floor:' + (floor.style || 'planks')]; if (fs) fs.draw(P, Object.assign({ y: wb, h: H - wb }, floor), S);
      var ws = PROPS['wall:' + (wall.style || 'panel')]; if (ws) ws.draw(P, Object.assign({ y: 0, h: wb }, wall), S);
    }

    // ---------------- 一格畫面（世界）＋貼到可視畫布
    function render() {
      wctx.setTransform(1, 0, 0, 1, 0, 0);
      wctx.clearRect(0, 0, W, H);
      drawShell();
      var props = L.props || [];
      var byLayer = { wall: [], floor: [], stand: [], ceiling: [], front: [] };
      props.forEach(function (o) { if (!o.hidden && PROPS[o.type]) (byLayer[propLayer(o)] || byLayer.stand).push(o); });
      byLayer.wall.forEach(function (o) { PROPS[o.type].draw(P, o, S); });
      byLayer.floor.forEach(function (o) { PROPS[o.type].draw(P, o, S); });
      // 站立層：道具＋小人按腳底 y 排序（櫃檯後的老闆、箱子後翻箱的人自動被擋住）
      var items = byLayer.stand.map(function (o) { return { base: propBase(o), o: o }; });
      Object.keys(actors).forEach(function (k) { var a = actors[k]; if (!a.hidden && !a.outside && a.rows) items.push({ base: a.y + (a.zb || 0), a: a }); });
      items.sort(function (p, q) { return p.base - q.base; });
      items.forEach(function (it) { if (it.o) PROPS[it.o.type].draw(P, it.o, S); else drawActor(P, it.a, false); });
      byLayer.ceiling.forEach(function (o) { PROPS[o.type].draw(P, o, S); });
      byLayer.front.forEach(function (o) { PROPS[o.type].draw(P, o, S); });
      applyLight();
      drawFocus();
      blit();
    }
    // 可視畫布直接用裝置像素大小（每格 devPx×devPx 個裝置像素），自己用最近鄰放大：
    // 不靠 CSS image-rendering（舊 iOS Safari 對 canvas 的 pixelated 不可靠），每一格在任何瀏覽器都是銳利的方塊。
    function blit() {
      var k = devPx, bw = vw * k, bh = vh * k;
      if (view.width !== bw) view.width = bw;
      if (view.height !== bh) view.height = bh;
      vctx.imageSmoothingEnabled = false; vctx.webkitImageSmoothingEnabled = false;
      vctx.clearRect(0, 0, bw, bh);
      vctx.drawImage(world, vx, vy, vw, vh, 0, 0, bw, bh);
    }
    // 選取外框、教學聚光、今晚亮金框、提示星
    function drawFocus() {
      var t = state.t, P2 = P;
      syncFollow();
      if (state.spot) {
        var h = state.spot.h, m = h.mask, r = h.rect, pad = 2;
        if (!state.spot.ov) {
          var ov = document.createElement('canvas'); ov.width = W; ov.height = H;
          var oc = ov.getContext('2d'); oc.fillStyle = 'rgba(8,6,12,0.62)';
          for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
            var inside = m ? maskNear(m, x, y, 1) : (x >= r[0] - pad && y >= r[1] - pad && x < r[0] + r[2] + pad && y < r[1] + r[3] + pad);
            if (!inside) oc.fillRect(x, y, 1, 1);
          }
          state.spot.ov = ov;
        }
        wctx.drawImage(state.spot.ov, 0, 0);
        outlineDraw(h, t);
        var bx = Math.round(h.cx) - 3, by = Math.round(r[1] + r[3]) + 1 + (Math.floor(t * 3) % 2);
        if (by + 9 > H) by = Math.round(r[1]) - 10 - (Math.floor(t * 3) % 2);
        P2.sprite(HAND, bx, by, { k: '#111111', w: '#ffffff', s: '#f6dcc4' }, {});
      }
      // 今晚可去的地方：金／奶油雙色外框（慢慢呼吸，不跑馬燈）
      if (state.hi.length) {
        var on = Math.floor(t * 2.5) % 2;
        state.hi.forEach(function (g) { g.hots.forEach(function (h) { h.outline.forEach(function (p) { wctx.fillStyle = on ? '#f0c75e' : '#fff1c2'; wctx.fillRect(p[0], p[1], 1, 1); }); }); });
      }
      var show = [];
      if (state.flash && state.rt < state.flash.until) show.push(state.flash.h);
      if (state.hover) show.push(state.hover);
      if (state.reveal > state.rt) hots.forEach(function (h) { if (enabled(h) && (!h.sub || h.revealSub || h._rv)) show.push(h); });
      show.forEach(function (h) { if (h) outlineDraw(h, t); });
      // 提示星：每 3.2 秒在一個可互動物件角落閃一下（手遊常見的「這裡可以點」）
      if (!state.spot && sparkleOn && hots.length) {
        var cyc = Math.floor(t / 3.2), ph = t - cyc * 3.2;
        if (ph < 0.55) {
          var main = hots.filter(function (h) { return !h.sub && !h.noSparkle && enabled(h); });
          var hh = main[cyc % (main.length || 1)];
          if (hh) { var sx = hh.rect[0] + hh.rect[2] - 2, sy = hh.rect[1] + 1, big = ph > 0.15 && ph < 0.4; P2.px(sx, sy, 'hi'); if (big) { P2.px(sx - 1, sy, 'hi2'); P2.px(sx + 1, sy, 'hi2'); P2.px(sx, sy - 1, 'hi2'); P2.px(sx, sy + 1, 'hi2'); } }
        }
      }
    }
    function outlineDraw(h, t) {
      var on = Math.floor(t * 6) % 2;
      h.outline.forEach(function (p) { wctx.fillStyle = ((p[0] + p[1] + (on ? 1 : 0)) % 4 < 2) ? pal.hi : pal.hi2; wctx.fillRect(p[0], p[1], 1, 1); });
    }

    // ---------------- 尺寸與鏡頭
    function dprNow() { return (typeof devicePixelRatio === 'number' && devicePixelRatio > 0) ? devicePixelRatio : 1; }
    // 依寬度算的最大倍率（裝置像素）：dev = floor(容器寬 × DPR ÷ 安全區寬)，上限 maxScale × DPR
    function baseDev() {
      var hw = host.clientWidth || hostW || 390, safe = L.safe || [0, W], sw = safe[1] - safe[0], dpr = dprNow();
      return Math.max(1, Math.min(Math.floor((opts.maxScale || L.maxScale || 3) * dpr + 1e-6), Math.floor(hw * dpr / sw + 1e-6)));
    }
    function fit() {
      hostW = host.clientWidth || hostW || 390;
      var dpr = dprNow(), dev = baseDev();
      if (cam.dev) dev = Math.min(dev, cam.dev);
      devPx = dev; scale = dev / dpr;
      vw = Math.min(W, Math.floor(hostW / scale + 1e-6));
      var safe = L.safe || [0, W], cx = (safe[0] + safe[1]) / 2; vx = clamp(Math.round(cx - vw / 2), 0, W - vw);
      vy = clamp(Math.round(cam.y), 0, H - 1); vh = clamp(Math.round(cam.h), 1, H - vy);
      var cssW = vw * scale, cssH = vh * scale;
      view.style.width = cssW + 'px'; view.style.height = cssH + 'px';
      if (opts.sizeHost !== false) host.style.height = cssH + 'px';
      overlay.style.width = cssW + 'px'; overlay.style.height = cssH + 'px';
      overlay.style.left = Math.round((hostW - cssW) / 2) + 'px'; overlay.style.top = '0px';
      host.style.setProperty('--ds-scale', scale);
      blit();
      layoutOverlay();
    }
    function setView(v) {
      if (v.y != null) cam.y = v.y; if (v.h != null) cam.h = v.h;
      if (v.dev !== undefined) cam.dev = v.dev;
      fit();
    }
    var tween = null;
    function tweenView(to, ms) {
      if (tween) { tween.cancel = true; var r0 = tween.res; tween = null; if (r0) r0(); }
      var from = { y: cam.y, h: cam.h };
      if (to.dev !== undefined) cam.dev = to.dev;
      if (!ms || ms <= 0 || (from.y === to.y && from.h === to.h)) { setView(to); return Promise.resolve(); }
      return new Promise(function (res) {
        var tw = tween = { cancel: false, res: res }, t0 = now();
        function ease(p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }
        (function step() {
          if (tw.cancel || destroyed) return;
          var p = clamp((now() - t0) / ms, 0, 1), e = ease(p);
          var y = Math.round(from.y + (to.y - from.y) * e), h = Math.round(from.h + (to.h - from.h) * e);
          if (y !== cam.y || h !== cam.h) { cam.y = y; cam.h = h; fit(); }
          if (p < 1) requestAnimationFrame(step); else { tween = null; cam.y = to.y; cam.h = to.h; fit(); res(); }
        })();
      });
    }
    function toCss(x, y) { return { x: (x - vx) * scale, y: (y - vy) * scale }; }
    function hostCss(x, y) { var p = toCss(x, y); return { x: p.x + (parseFloat(overlay.style.left) || 0), y: p.y }; }
    function fromEvent(ev) { var r = view.getBoundingClientRect(); return { x: Math.floor((ev.clientX - r.left) / scale) + vx, y: Math.floor((ev.clientY - r.top) / scale) + vy }; }
    function rectToScreen(r) {
      var b = view.getBoundingClientRect(), x = b.left + (r[0] - vx) * scale, y = b.top + (r[1] - vy) * scale, w = r[2] * scale, h = r[3] * scale;
      try { return new DOMRect(x, y, w, h); } catch (_) { return { x: x, y: y, left: x, top: y, width: w, height: h, right: x + w, bottom: y + h }; }
    }

    // ---------------- DOM 疊層（文字一律 DOM：中文在 5 px 字裡不可能好看）
    var marks = [];   // { el, place(), until?, kind, id? }
    function addMark(m) { marks.push(m); overlay.appendChild(m.el); m.place(); return m; }
    function dropMarks(f) { marks = marks.filter(function (m) { if (f(m)) { m.el.remove(); return false; } return true; }); }
    function layoutOverlay() { marks.forEach(function (m) { try { m.place(); } catch (_) {} }); }
    function sideShift(el, px) {
      var w = el.offsetWidth, ow = overlay.clientWidth || vw * scale, left = px - w / 2;
      return left < 2 ? 2 - left : left + w > ow - 2 ? (ow - 2) - (left + w) : 0;
    }
    function labelFor(h, cls, ms) {
      var d = document.createElement('div'); d.className = 'ds-label' + (cls ? ' ' + cls : ''); d.textContent = h.label || '';
      return addMark({ el: d, kind: 'label', h: h, until: ms ? state.rt + ms / 1000 : 0, place: function () {
        var r = h.rect, p = toCss(r[0] + r[2] / 2, r[1]), below = p.y < 26;
        if (below) p = toCss(r[0] + r[2] / 2, r[1] + r[3]);
        d.style.left = p.x + 'px'; d.style.top = p.y + 'px'; d.classList.toggle('below', below);
        d.style.setProperty('--shift', sideShift(d, p.x) + 'px');
      } });
    }
    function bubbleFor(id, text, o) {
      var el = document.createElement('div'); el.className = 'ds-say' + (o.tone ? ' ' + o.tone : ''); el.textContent = text;
      return addMark({ el: el, kind: 'say', id: id, place: function () {
        var a = actors[id]; if (!a) return;
        var head = a.y - 15, p = toCss(a.x, head), bh = el.offsetHeight || 24;
        if (p.y - bh - 8 < 0) {   // 頭頂放不下（例：對決橫條裡櫃檯後的老闆）→ 放在身體旁邊
          var right = toCss(a.x + 8, a.y - 10), left = toCss(a.x - 8, a.y - 10), ow = overlay.clientWidth || vw * scale, w = el.offsetWidth;
          var useRight = right.x + 6 + w <= ow - 2 || left.x - 6 - w < 2;
          el.classList.add('side'); el.classList.toggle('sl', !useRight); el.classList.toggle('sr', useRight);
          var top = clamp(right.y, bh / 2 + 2, (vh * scale) - bh / 2 - 2);
          el.style.left = (useRight ? right.x + 6 : left.x - 6) + 'px'; el.style.top = top + 'px';
          el.style.setProperty('--shift', '0px'); el.style.setProperty('--tail', '0px');
          return;
        }
        el.classList.remove('side', 'sl', 'sr');
        el.style.left = p.x + 'px'; el.style.top = p.y + 'px';
        var sh = sideShift(el, p.x);
        el.style.setProperty('--shift', sh + 'px'); el.style.setProperty('--tail', (-sh) + 'px');
      } });
    }

    // ---------------- 輸入
    var down = null;
    function onDown(ev) { var p = fromEvent(ev); down = { x: p.x, y: p.y, h: hitTest(p.x, p.y), t: now() }; }
    function onUp(ev) {
      if (!down) return; var p = fromEvent(ev), h = hitTest(p.x, p.y), d0 = down; down = null;
      if (!h || h !== d0.h || Math.abs(p.x - d0.x) > 6 || Math.abs(p.y - d0.y) > 6) return;
      if (state.spot && state.spot.h !== h) { bump(); return; }
      tap(h);
    }
    function onMove(ev) {
      if (ev.pointerType !== 'mouse') return;
      var p = fromEvent(ev), h = hitTest(p.x, p.y);
      if (h !== state.hover) { state.hover = h; dropMarks(function (m) { return m.hover; }); if (h) labelFor(h, 'hover').hover = true; view.style.cursor = h ? 'pointer' : 'default'; }
    }
    function onLeave() { state.hover = null; dropMarks(function (m) { return m.hover; }); }
    function bump() { host.classList.remove('ds-bump'); void host.offsetWidth; host.classList.add('ds-bump'); }
    function tap(h) {
      state.flash = { h: h, until: state.rt + 0.9 };
      if (h.prop && h.prop.id) state.poke[h.prop.id] = state.rt + 1.6;   // 道具自己的小反應（貓坐起來、箱子裡的唱片被翻動）
      dropMarks(function (m) { return m.tapLbl; }); labelFor(h, 'tap', 1100).tapLbl = true;
      if (state.spot && state.spot.h === h) { var cb = state.spot.done; api.spotlight(null); if (cb) cb(h); }
      if (opts.onAction) { try { opts.onAction(h.action, h); } catch (e) { console.error(e); } }
    }
    view.addEventListener('pointerdown', onDown);
    view.addEventListener('pointerup', onUp);
    view.addEventListener('pointermove', onMove);
    view.addEventListener('pointerleave', onLeave);
    view.addEventListener('pointercancel', function () { down = null; });

    // ---------------- 迴圈（10 fps：像素動畫用跳格）；分頁藏起來時停
    var last = 0, raf = 0, t0 = now(), fixedT = opts.fixedTime, tPaused = 0;
    function loop(ts) {
      if (destroyed) return;
      raf = requestAnimationFrame(loop);
      if (ts - last < 95) return; var dt = Math.min(0.2, (ts - last) / 1000); last = ts;
      state.rt = (now() - t0 - tPaused) / 1000; state.t = fixedT != null ? fixedT : state.rt; state.frame++;   // rt＝真時間（到期用），t＝畫面動畫時間（可凍結截圖）
      stepActors(dt);
      dropMarks(function (m) { return m.until && state.rt > m.until; });
      render();
      layoutOverlay();
    }
    var hiddenAt = 0;
    function onVis() {
      if (destroyed) return;
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; hiddenAt = now(); }
      else if (!raf) { if (hiddenAt) tPaused += now() - hiddenAt; hiddenAt = 0; last = 0; raf = requestAnimationFrame(loop); }
    }
    document.addEventListener('visibilitychange', onVis);
    function stepActors(dt) {
      var k = spd();
      Object.keys(actors).forEach(function (id) {
        var a = actors[id]; if (!a.path || !a.path.length) return;
        var tgt = a.path[0], dx = tgt.x - a.x, dy = tgt.y - a.y, dist = Math.sqrt(dx * dx + dy * dy), sp = (a.speed || 36) * dt * k;
        a.moving = true; if (Math.abs(dx) > 0.5) a.flip = (a.faceFlip ? dx > 0 : false);
        if (dist <= sp) { a.x = tgt.x; a.y = tgt.y; a.outside = tgt.outside; a.path.shift(); if (!a.path.length) { a.moving = false; var r = a.res; a.res = null; if (r) r(); } }
        else { a.x += dx / dist * sp; a.y += dy / dist * sp; if (tgt.outside !== a.outside && dist < 6) a.outside = tgt.outside; }
      });
    }

    // ---------------- 公開 API
    var api = {
      layout: L, world: world, canvas: view, overlay: overlay, host: host, state: state,
      put: function (id, key, spr) {
        var a = actor(id), p = spotXY(key); if (spr != null) a.rows = rowsOf(spr);
        if (p) { a.x = p.x; a.y = p.y; a.outside = p.outside; if (a.res) { var r = a.res; a.res = null; r(); } a.path = null; a.moving = false; a.hidden = false; }
        layoutOverlay(); return api;
      },
      sprite: function (id, spr) { actor(id).rows = rowsOf(spr); return api; },
      hide: function (id, on) { actor(id).hidden = on !== false; layoutOverlay(); return api; },
      sil: function (id, on) { actor(id).sil = !!on; return api; },
      has: function (id) { var a = actors[id]; return !!(a && !a.hidden && a.rows); },
      pos: function (id) { var a = actors[id]; return a ? { x: a.x, y: a.y, outside: a.outside, hidden: a.hidden } : null; },
      walk: function (id, keys, speed) {
        var a = actor(id); a.hidden = false;
        if (a.res) { var r0 = a.res; a.res = null; r0(); }
        a.path = [].concat(keys).map(spotXY).filter(Boolean);
        if (speed) a.speed = speed;
        return new Promise(function (res) { if (!a.path.length) { a.moving = false; res(); return; } a.res = res; });
      },
      face: function (id, fwd) { actor(id).fwd = fwd; return api; },
      pose: function (id, name, ms) {
        var a = actor(id); a.pose = name || null; a.poseAt = state.rt;
        a.poseUntil = (name && ms) ? state.rt + ms / 1000 / spd() : 0;
        return api;
      },
      emote: function (id, kind, ms) { var a = actor(id); a.emote = kind || null; a.emoteUntil = (kind && ms) ? state.rt + ms / 1000 : 0; return api; },
      say: function (id, text, o) {
        o = o || {};
        dropMarks(function (m) { return m.kind === 'say' && m.id === id; });
        if (!text) return null;
        var m = bubbleFor(id, text, o);
        var ms = o.ms == null ? 2600 : o.ms;
        if (ms) setTimeout(function () { dropMarks(function (x) { return x === m; }); }, ms / spd());
        return m.el;
      },
      tag: function (id, text, side, lr) {
        dropMarks(function (m) { return m.kind === 'tag' && m.id === id; });
        if (!text) return null;
        var d = document.createElement('div'); d.className = 'ds-tag ' + (side === 'p' ? 'p' : 'e') + ' ' + (lr === 'R' ? 'R' : 'L'); d.textContent = text;
        addMark({ el: d, kind: 'tag', id: id, place: function () {
          var a = actors[id]; if (!a || a.hidden) { d.style.display = 'none'; return; }
          d.style.display = '';
          var p = toCss(lr === 'R' ? a.x + 8 : a.x - 8, a.y - 9), w = d.offsetWidth, ow = overlay.clientWidth || vw * scale;
          // 長名字（冷門仙人、那張我有）不要被舞台邊緣切掉：夾在畫面內，必要時蓋到身體一點點
          if (lr === 'R') p.x = Math.min(p.x, ow - 2 - 3 - w); else p.x = Math.max(p.x, 2 + 3 + w);
          d.style.left = p.x + 'px'; d.style.top = p.y + 'px';
        } });
        return d;
      },
      untag: function (id) { dropMarks(function (m) { return m.kind === 'tag' && (id == null || m.id === id); }); return api; },
      float: function (id, text, cls) {
        var a = actors[id]; if (!a || text == null || text === '') return null;
        var d = document.createElement('div'); d.className = 'ds-float' + (cls ? ' ' + cls : '');
        if (typeof text === 'object') { d.textContent = text.text; if (text.sub) { var sm = document.createElement('small'); sm.textContent = text.sub; d.appendChild(sm); } }
        else d.textContent = text;
        // 對決的兩個人（有面向）：數字飄在頭旁邊、朝對手那一側（頭上留給台詞泡泡，外側留給名牌），怎樣都不會疊在一起。
        // 其他人：飄在頭上；頭上正有泡泡就改飄在身體上。
        var x0 = a.x, y0 = a.y, fw = a.fwd || 0, talking = marks.some(function (m) { return m.kind === 'say' && m.id === id; });
        var m = addMark({ el: d, kind: 'float', place: function () {
          var p = fw ? toCss(x0 + fw * 12 + 0.5, y0 - 4) : toCss(x0 + 0.5, talking ? y0 - 3 : y0 - 15);
          d.style.left = p.x + 'px'; d.style.top = p.y + 'px';
        } });
        setTimeout(function () { dropMarks(function (x) { return x === m; }); }, 1000);
        return d;
      },
      anchor: function (id) {
        var ex = null; marks.forEach(function (m) { if (m.kind === 'anc' && m.id === id) ex = m; });
        if (ex) { ex.place(); return ex.el; }
        var d = document.createElement('div'); d.className = 'ds-anc'; d.id = 'anc-' + id;
        addMark({ el: d, kind: 'anc', id: id, place: function () {
          var a = actors[id]; if (!a || a.hidden) { d.style.display = 'none'; return; }
          d.style.display = '';
          var p0 = toCss(a.x - 6, a.y - 14), p1 = toCss(a.x + 6, a.y + 1);
          d.style.left = p0.x + 'px'; d.style.top = p0.y + 'px'; d.style.width = (p1.x - p0.x) + 'px'; d.style.height = (p1.y - p0.y) + 'px';
        } });
        return d;
      },
      door: function (mode) {
        if (mode === 'open') { state.door = 'ajar'; setTimeout(function () { state.door = 'open'; }, 180); }
        else if (mode === 'swing') { state.door = 'ajar'; setTimeout(function () { state.door = 'open'; }, 180); setTimeout(function () { state.door = 'ajar'; }, 900); setTimeout(function () { state.door = 'closed'; }, 1080); }
        else state.door = 'closed';
        return api;
      },
      play: function (on) { state.playing = on !== false; return api; },
      dim: function (k) { state.dim = k || 1; return api; },
      // 舞台閃一下（七星回擊「舞台閃白一下」）：只蓋舞台，不蓋盤面；減少動態＝不閃
      flash: function (color, ms) {
        if (reducedMotion()) return api;
        var d = document.createElement('div'); d.className = 'ds-flash'; d.style.background = color || '#fff';
        overlay.appendChild(d); ms = ms || 160;
        var an = null; try { an = d.animate([{ opacity: 0.92 }, { opacity: 0 }], { duration: ms, easing: 'ease-out', fill: 'forwards' }); } catch (_) {}
        setTimeout(function () { if (an) try { an.cancel(); } catch (_) {} d.remove(); }, ms + 40);
        return api;
      },
      // 教學聚光（店內版）：只有目標能點，點了就 resolve
      spotlight: function (hotId, text) {
        dropMarks(function (m) { return m.spotLbl; });
        if (!hotId) { state.spot = null; return Promise.resolve(); }
        var h = hotById(hotId); if (!h) return Promise.resolve();
        return new Promise(function (res) {
          state.spot = { h: h, done: res };
          if (text) labelFor({ rect: h.rect, label: text }, 'spot').spotLbl = true;
        });
      },
      reveal: function (ms) {
        ms = ms || 2600; state.reveal = state.rt + ms / 1000; dropMarks(function (m) { return m.revealLbl; });
        hots.forEach(function (h) { if (!h.sub && h.label && enabled(h)) labelFor(h, 'reveal', ms).revealLbl = true; });
        // 沒有整體熱點、但裡面每張都能點的道具（牆上唱片架）：給一個總名牌
        (L.props || []).forEach(function (o) {
          if (!o.revealLabel || o.hidden) return;
          var subs = hots.filter(function (h) { return h.sub && h.prop === o && enabled(h); }); if (!subs.length) return;
          labelFor({ rect: propBox(o), label: o.revealLabel }, 'reveal', ms).revealLbl = true;
          subs.forEach(function (h) { h._rv = true; });
        });
        return api;
      },
      highlight: function (list) {
        dropMarks(function (m) { return m.kind === 'hi'; });
        state.hi = [];
        (list || []).forEach(function (g) {
          var hs = (g.ids || []).map(hotById).filter(Boolean); if (!hs.length) return;
          state.hi.push({ hots: hs, label: g.label });
          if (!g.label) return;
          var x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
          hs.forEach(function (h) { var r = h.rect; x0 = Math.min(x0, r[0]); x1 = Math.max(x1, r[0] + r[2]); y0 = Math.min(y0, r[1]); y1 = Math.max(y1, r[1] + r[3]); });
          var d = document.createElement('div'); d.className = 'ds-opt'; d.textContent = g.label;
          addMark({ el: d, kind: 'hi', place: function () {
            // 標籤預設在上面；上面放不下、或會蓋住站在那裡的人的頭，就放到下面
            var heads = Object.keys(actors).some(function (k) { var a = actors[k]; return !a.hidden && !a.outside && a.rows && a.x + 5 > x0 && a.x - 5 < x1 && a.y - 15 < y0 + 2 && a.y > y0 - 12; });
            var p = toCss((x0 + x1) / 2, y0), below = g.below || p.y < 30 || heads;
            if (below) p = toCss((x0 + x1) / 2, y1);
            d.style.left = p.x + 'px'; d.style.top = p.y + 'px'; d.classList.toggle('below', below);
            d.style.setProperty('--shift', sideShift(d, p.x) + 'px');
          } });
        });
        return api;
      },
      setView: function (v) { if (tween) { tween.cancel = true; var r = tween.res; tween = null; if (r) r(); } setView(v); return api; },
      tweenView: tweenView,
      view: function () { return { y: vy, h: vh, x: vx, w: vw, scale: scale, dev: devPx, baseDev: baseDev(), dpr: dprNow() }; },
      camera: function (name) { var c = (L.cameras || {})[name]; if (c) api.setView({ y: c.y, h: c.h, dev: null }); return api; },
      hotspots: function () { syncFollow(); return hots.map(function (h) { return { id: h.id, label: h.label, action: h.action, rect: h.rect.slice(), sub: !!h.sub }; }); },
      hotRect: function (hotId) { syncFollow(); var h = hotById(hotId); return h ? rectToScreen(h.rect) : null; },
      rectOf: function (r) { return rectToScreen(r); },
      // 程式點一下（測試、教學）：跟手指點一樣受 allow() 限制；o.force 才繞過
      tap: function (hotId, o) { syncFollow(); var h = hotById(hotId); if (!h || (!(o && o.force) && !enabled(h))) return false; tap(h); return true; },
      allow: function (fn) { allowFn = fn || null; return api; },
      sparkle: function (on) { sparkleOn = !!on; return api; },
      bump: bump,
      toCss: toCss, hostCss: hostCss, render: render, fit: fit,
      setTime: function (t) { fixedT = t; state.t = t; render(); return api; },
      destroy: function () {
        destroyed = true; cancelAnimationFrame(raf); if (ro) ro.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        marks = []; host.innerHTML = ''; host.classList.remove('ds-host', 'ds-bump');
      }
    };

    buildHots(); buildLight();
    var ro = null;
    if (typeof ResizeObserver !== 'undefined') { ro = new ResizeObserver(function () { if ((host.clientWidth || 0) !== hostW) fit(); }); ro.observe(host); }
    (L.actors || []).forEach(function (a) { api.put(a.id, a.at, a.sprite); if (a.flip) actor(a.id).flip = true; });
    fit();
    render();
    raf = requestAnimationFrame(loop);
    return api;
  }

  return { mount: mount, defProp: defProp, PROPS: PROPS, Painter: Painter, DEFAULT_PAL: DEFAULT_PAL, GLYPH: GLYPH, HAND: HAND, EMOTE: EMOTE, bayer: bayer, seeded: seeded, version: '2.0' };
});
