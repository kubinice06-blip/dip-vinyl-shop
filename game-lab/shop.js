/* shop.js：DipShop 像素唱片行渲染器（核心）。SPEC-v2 §5。
 *
 * 兩種畫法（DipShop.mount 看 layout 決定）：
 *   斜俯視 3/4（本店 dip，layout.projection＝'oblique34'；店主 2026-11-07 看過路線 P2：「我覺得這個背景製作的還不錯」）：
 *     292×322 美術格，x＝寬、y＝地板前緣（越下越近）、高度直接往上減；1 美術格＝k 裝置 px（390 寬 @3 → k≈4，非整數、每個矩形各自四捨五入）。
 *     封面與中文字用裝置解析度；地板＋後牆、每個靜態道具、打光都烤成快取，每格只畫會動的東西。道具在 shop-props.js 用 DipShop.defO 註冊。
 *     人：window.DipLabChars 有就用它畫；沒有就用原本的 16×16 Q 版小人（dip-character.js avatarRows／ui.js LAB_SPR）×3（48 格高），加 1 格深色描邊。
 *     走位會繞過家具（layout.nav 路點＋道具的地面範圍）。
 *   格子版（basement、taipei 地圖）：1 場景像素 = 1 小人像素，整數倍率 ×3（下面的 mountGrid；細格子 layout.fine 也還認得）。
 *
 *   var shop = DipShop.mount(hostEl, layoutJSON, {
 *     cards: { id: { localCover, coverUrl, artist, album } },  // 牆上唱片、箱子、正在放
 *     coverBase: './',                                         // localCover 相對路徑的基準
 *     sprites: { owner: rows, e0: rows } | function () {},    // 小人（dip-character.js 的列格式）
 *     spritePal: PIX_PAL, onAction: function (action, hot) {}
 *   });
 *   shop.put('p', 'door', rows) / walk('p', ['door','pay']) / say('o','「歡迎。」') / door('open')
 *   shop.setView({ y, h }) / tweenView({ y, h }, ms) / tag / untag / float / anchor / pose / emote / highlight / hotRect
 *   唱盤區（v3）：shop.arm(id, 'wind'|'throw'|'shield'|'up'|'flag'|'shrug'|null) / hold(id, what) / nudge(id, dx)
 *                 shop.state.fx（飛行唱片、火花、碎片、旗…，由 stage.js 的 clash() 每格填）/ state.decks / fast(on) / onTick(fn)
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
      text: function (s, x, y, c, k) {
        s = String(s).toUpperCase(); ctx.fillStyle = P.col(c); k = k || 1;
        var cx = x;   // 可變寬：3、4、5 格寬的字（M、N、W 用寬字）
        for (var i = 0; i < s.length; i++) { var g = GLYPH[s.charAt(i)] || GLYPH['?'], gw = g.length / 5; for (var b = 0; b < g.length; b++) if (g.charAt(b) === '1') ctx.fillRect(cx + (b % gw) * k, y + ((b / gw) | 0) * k, k, k); cx += (gw + 1) * k; }
        return cx - x - k;
      },
      // 小人／圖示：rows 是字母陣列，sp 是字母→色碼（PIX_PAL 格式）；o.k＝每格幾個場景像素（細格子世界 ×5）
      sprite: function (rows, x, y, sp, o) {
        o = o || {}; var w = rows[0].length, k = o.k || 1;
        for (var j = 0; j < rows.length; j++) {
          var row = rows[j];
          for (var i = 0; i < w; i++) {
            var ch = row.charAt(o.flip ? w - 1 - i : i); if (ch === '.' || ch === ' ' || !ch) continue;
            ctx.fillStyle = o.sil ? (o.sil === true ? '#0b0f1a' : o.sil) : ((sp && sp[ch]) || pal[ch] || '#ff00ff');
            ctx.fillRect(x + i * k, y + j * k, k, k);
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
    var src = url;
    if (/^https?:/.test(url) && url.indexOf(location.origin) !== 0) {
      img.crossOrigin = 'anonymous';
      // 跟頁面上一般 <img>（no-cors）分開快取：同一網址先被 no-cors 載過時，Chrome 可能拿那份沒帶 ACAO 的快取來配 CORS 請求而報錯
      src = url + (url.indexOf('?') < 0 ? '?' : '&') + 'px=1';
    }
    img.decoding = 'async';
    img.onload = function () { try { c.cv = pixelateCover(img, size, mode); } catch (e) { c.cv = null; c.failed = true; } };
    img.onerror = function () { c.failed = true; };
    img.src = src;
    return null;
  }

  // 高解析封面（牆上蓋的真封面）：原圖直接平滑縮到裝置像素，跟初版手繪封面一樣細。CORS 讀（?px=1），畫布不會被汙染。
  var hiCache = {};
  function loadHiCover(url, onload) {
    var c = hiCache[url];
    if (c) { if (!c.img && !c.failed && onload && c.cbs.indexOf(onload) < 0) c.cbs.push(onload); return c.img; }
    c = hiCache[url] = { img: null, failed: false, cbs: onload ? [onload] : [] };
    var img = new Image(), src = url;
    if (/^https?:/.test(url) && url.indexOf(location.origin) !== 0) { img.crossOrigin = 'anonymous'; src = url + (url.indexOf('?') < 0 ? '?' : '&') + 'px=1'; }
    img.decoding = 'async';
    img.onload = function () { c.img = img; var cb = c.cbs; c.cbs = []; cb.forEach(function (f) { try { f(); } catch (_) {} }); };
    img.onerror = function () { c.failed = true; c.cbs = []; };
    img.src = src;
    return null;
  }

  // ===================================================================== 小人變形（倒下＝轉 90 度）
  function rotRows(rows) {   // 順時針轉 90 度：頭朝右躺下
    var h = rows.length, w = rows[0].length, out = [];
    for (var i = 0; i < w; i++) { var s = ''; for (var j = h - 1; j >= 0; j--) s += rows[j].charAt(i) || '.'; out.push(s); }
    return out;
  }

  // ===================================================================== 手臂姿勢（唱盤區，v3）
  // 小人 16 欄：右手在第 12 欄（第 9–10 列）。改格子畫出蓄力／出手／擋／舉高／舉旗；flip 之後自動朝對手。
  function armRows(rows, kind) {
    if (!kind || !rows || rows.length < 12 || rows[0].length < 16) return rows;
    var R = rows.map(function (r) { return r.split(''); }), sl = R[8][12], sk = R[9][12];
    if (sl === '.' || sk === '.') return rows;
    function put(c, r, ch) { if (R[r]) R[r][c] = ch; }
    if (/^(wind|show|throw|up|shield|flag)$/.test(kind)) { put(12, 9, '.'); put(12, 10, '.'); }
    if (kind === 'wind' || kind === 'show') { put(12, 7, sl); put(13, 6, sl); put(13, 5, sk); put(13, 4, sk); }
    else if (kind === 'throw') { put(13, 8, sl); put(14, 8, sl); put(15, 8, sk); }
    else if (kind === 'up') { put(12, 7, sl); put(13, 6, sl); put(13, 5, sl); put(13, 4, sk); put(13, 3, sk); }
    else if (kind === 'shield') { put(13, 8, sl); put(13, 9, sk); }
    else if (kind === 'flag') { put(12, 8, sl); put(13, 7, sl); put(14, 6, sk); }
    else if (kind === 'shrug') { put(3, 9, '.'); put(3, 10, '.'); put(2, 8, R[8][3]); put(2, 7, sk); put(12, 9, '.'); put(12, 10, '.'); put(13, 8, sl); put(13, 7, sk); }
    return R.map(function (r) { return r.join(''); });
  }
  // 手的位置（小人格，未 flip）：拿封套、唱片、大金盤、旗都畫在這裡
  var HANDAT = { wind: [13, 3], show: [14, 5], throw: [15, 8], up: [13, 2], shield: [13, 9], flag: [14, 5], shrug: [13, 6], none: [13, 10] };
  // 道具庫可以掛的掛勾（shop-props.js 填）：holdDraw(P, actor, hx, hy, K, S)＝手上拿的東西
  var HOOKS = {};
  function hook(name, fn) { HOOKS[name] = fn; }

  // ===================================================================== 掛載（格子版：地下室、台北地圖；本店 dip 走下面的斜俯視版）
  function mount(host, layout, opts) {
    return (layout && layout.projection === 'oblique34') ? mountOblique(host, layout, opts) : mountGrid(host, layout, opts);
  }
  function mountGrid(host, layout, opts) {
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
    var cardOf = function (id) { return (opts.cards && opts.cards[id]) || (opts.extraCards && opts.extraCards[id]) || null; };
    // ---------------- 背景圖層（route B：沿用初版描圖的牆面＋地板；家具全部是程式畫的道具）
    var bgImg = null, bgGrid = null, bgMode = opts.bgMode || (L.bg && L.bg.mode) || 'native';
    if (L.bg) {
      bgImg = new Image(); bgImg.decoding = 'async';
      bgImg.onload = function () {
        if (bgMode === 'grid') {   // 縮到場景格：每個場景像素 = 原圖 2.5×2.5 的平均
          var g = document.createElement('canvas'); g.width = W; g.height = H;
          var gx = g.getContext('2d'); gx.imageSmoothingEnabled = true; gx.imageSmoothingQuality = 'high';
          gx.drawImage(bgImg, 0, 0, W, H); bgGrid = g;
        }
        if (!destroyed) { try { render(); } catch (e) { console.error(e); } }
      };
      bgImg.src = (opts.bgBase || '') + L.bg.src;
    }
    function tagOn(id) { for (var i = 0; i < marks.length; i++) if (marks[i].kind === 'tag' && marks[i].id === id && marks[i].lr === 'T') return true; return false; }
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

    var hiT = 0; function hiReady() { if (destroyed || hiT) return; hiT = setTimeout(function () { hiT = 0; if (!destroyed) { try { blit(); } catch (_) {} } }, 30); }
    // ---------------- 場景物件 S（給道具用）
    var S = {
      W: W, H: H, layout: L, pal: pal, state: state,
      get t() { return state.t; }, get rt() { return state.rt; }, get frame() { return state.frame; },
      cover: cover, card: cardOf, rand: seeded,
      // 高解析層（只在有背景圖的店：牆在背景圖裡，世界格只有家具）：道具 spec.hires(V, o, S) 直接畫到裝置像素
      hires: !!(L.bg && (L.bg.mode || 'native') === 'native' && opts.bgMode !== 'grid'),
      coverImg: function (id) { var u = coverURL(id); return u ? loadHiCover(u, hiReady) : null; },
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
    // 細格子世界（route B：448×492，1 場景像素≈1 CSS px）：小人一格＝K 個場景像素，所有「以小人格計」的位移都乘 K
    var K = L.spriteScale || 1, KE = L.iconScale || Math.max(1, K - 2);
    function drawActor(P2, a, inOutside) {
      var rows = a.rows; if (!rows) return;
      if (a.arm) { if (!a._arm || a._arm.src !== rows || a._arm.kind !== a.arm) a._arm = { src: rows, kind: a.arm, rows: (typeof opts.arm === 'function' ? opts.arm : armRows)(rows, a.arm) }; rows = a._arm.rows; }
      var pose = inOutside ? null : poseOf(a);
      var bob = 0, ox = 0, oy = 0;
      if (a.moving) bob = (Math.floor(state.t * 8) % 2) * K;
      if (pose === 'atk') ox = 2 * (a.fwd || 1) * K;
      else if (pose === 'hurt') ox = -(a.fwd || 1) * K;
      else if (pose === 'dig') oy = (Math.floor(state.t * 8) % 2) * K;
      else if (pose === 'busy') oy = (Math.floor(state.t * 3) % 2) * K;
      var fx = Math.round(a.x) + ox + (a.ox || 0), fy = Math.round(a.y);
      if (pose === 'ko') {
        var rr = a._rot || (a._rot = { src: rows, rows: rotRows(rows) });
        if (rr.src !== rows) { rr.src = rows; rr.rows = rotRows(rows); }
        // 躺在地上：頭朝門外那側，腳底對齊地面
        if (!inOutside) P2.rect(fx - 8 * K, fy + 1, 16 * K, K, 'rgba(18,8,2,0.4)');
        P2.sprite(rr.rows, fx - 9 * K, fy - 12 * K, spritePal, { flip: (a.fwd || 1) > 0, k: K });
        return;
      }
      if (pose === 'sit') {   // 坐下（門口台階、試聽機的圓凳）：不畫腿，身體往下 3 格
        rows = a._sit && a._sit.src === a.rows ? a._sit.rows : (a._sit = { src: a.rows, rows: a.rows.slice(0, 12) }).rows;
        oy = 3 * K;
      }
      var x = fx - 8 * K, y = fy - 15 * K + 1 + (a.dy || 0) + oy;
      // 腳下影子：細格子世界用兩層（外淡內濃），不是一條 1 px 線
      if (!inOutside && !a.sil) { P2.rect(fx - 5 * K, fy - 1, 10 * K, 3, 'rgba(18,8,2,0.22)'); P2.rect(fx - 4 * K, fy, 8 * K, 2, 'rgba(18,8,2,0.28)'); }
      var sil = a.sil ? true : inOutside === 'sil' ? '#0a0e1c' : null;
      var by = y - (a.moving ? bob : 0);
      if (pose === 'warn' && !sil) {   // 金色描邊（脈動）
        if (Math.floor(state.t * 4) % 2 === 0) [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (d) { P2.sprite(rows, x + d[0] * 2, by + d[1] * 2, spritePal, { flip: a.flip, sil: '#f0c75e', k: K }); });
      }
      // 細格子世界：小人加一圈 1 px 深色描邊，貼在細緻的牆與家具前面才不會糊進背景（初版的小人也是黑邊）
      if (!sil && L.spriteOutline) [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (d) { P2.sprite(rows, x + d[0], by + d[1], spritePal, { flip: a.flip, sil: L.spriteOutline, k: K }); });
      P2.sprite(rows, x, by, spritePal, { flip: a.flip, sil: sil, k: K });
      // 受擊：閃紅（疊一層半透明紅，不整個塗掉，看得出是誰）
      if (pose === 'hurt' && !sil && Math.floor((state.rt - (a.poseAt || 0)) * 10) % 2 === 0) P2.sprite(rows, x, y, spritePal, { flip: a.flip, sil: 'rgba(230,40,56,0.6)', k: K });
      // 呼吸：站著時偶爾眨眼
      if (!a.moving && !sil && a.bob !== false && !pose && rows[4] && Math.floor(state.t * 10 + a.phase * 7) % 34 === 0) {
        for (var i = 0; i < rows[4].length; i++) if (rows[4].charAt(i) === 'k' && rows[3].charAt(i) !== 'k') P2.rect(x + (a.flip ? rows[4].length - 1 - i : i) * K, y + 4 * K, K, K, spritePal.s || '#e8b48c');
      }
      if (a.hold && !sil) {
        var hd = opts.holdDraw || HOOKS.holdDraw, hp = HANDAT[a.arm || 'none'] || HANDAT.none, hc = a.flip ? 15 - hp[0] : hp[0];
        if (typeof hd === 'function') hd(P2, a, x + hc * K + (K >> 1), by + hp[1] * K + (K >> 1), K, S);
      }
      // 頭上小圖示
      if (a.emote && (!a.emoteUntil || state.rt < a.emoteUntil)) {
        var k = a.emote; if (k === 'anger' && Math.floor(state.t * 4) % 2) k = 'angerB';
        var er = EMOTE[k]; if (er) {
          // 頭頂右上，白色描邊（在深色櫃檯、牆上也看得清楚）
          var ew = er[0].length * KE, ex = fx + 5 * K - Math.floor(ew / 2), ey = y - er.length * KE - KE + (Math.floor(state.t * 3) % 2) * KE;
          if (tagOn(a.id)) { ex = fx + (a.fwd || 1) * 9 * K - Math.floor(ew / 2); ey = y + K + (Math.floor(state.t * 3) % 2) * KE; }   // 頭上有名牌：圖示改到臉的內側
          if (k === 'anger' || k === 'angerB') P2.sprite(er, ex + KE, ey + KE, null, { sil: 'rgba(17,17,17,0.7)', k: KE });   // 怒：細線條，只加陰影不描白（描白會糊成一團）
          else [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (d) { P2.sprite(er, ex + d[0] * KE, ey + d[1] * KE, null, { sil: '#ffffff', k: KE }); });
          P2.sprite(er, ex, ey, { r: '#e0303f', k: '#111111', c: '#3fb6c9' }, { k: KE });
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
        if (sp.hots) (sp.hots(o, S) || []).forEach(function (h) { h.prop = o; h.order = idx; h.sub = !h.main; hots.push(h); });
        if (o.hot) {
          var b = propBox(o);
          hots.push({ id: o.id || (o.type + idx), rect: o.hot.rect || b, label: o.hot.label, action: o.hot.action, prop: o, order: idx, mask: null, pri: o.hot.pri || 0, noSparkle: !!o.hot.noSparkle, rectOnly: !!o.hot.rectOnly });
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
        for (var q = 1; q <= (L.outlineW || 1); q++) {
          for (var x = r[0] - q; x <= r[0] + r[2] - 1 + q; x++) { out.push([x, r[1] - q]); out.push([x, r[1] + r[3] - 1 + q]); }
          for (var y = r[1] - q + 1; y < r[1] + r[3] - 1 + q; y++) { out.push([r[0] - q, y]); out.push([r[0] + r[2] - 1 + q, y]); }
        }
        return out;
      }
      var ow = L.outlineW || 1, m = mask, ring = null;
      for (var pass = 0; pass < ow; pass++) {
        var nm = new Uint8Array(W * H);
        for (var yy = 0; yy < H; yy++) for (var xx = 0; xx < W; xx++) {
          var ii = yy * W + xx; if (m[ii]) { nm[ii] = 1; continue; }
          if ((xx > 0 && m[ii - 1]) || (xx < W - 1 && m[ii + 1]) || (yy > 0 && m[ii - W]) || (yy < H - 1 && m[ii + W])) { nm[ii] = 2; out.push([xx, yy]); }
        }
        m = nm;
      }
      return out;
    }
    // 跟著小人走的熱點（例：老闆走去挖箱時，點他本人還是「老闆」）：rel＝相對腳底的 [dx, dy, w, h]
    function syncFollow() {
      hots.forEach(function (h) {
        if (!h.follow) return;
        var a = actors[h.follow], rel = h.rel || [-6 * K, -14 * K, 12 * K, 15 * K];
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
      var best = null, bd = (L.fat || 4) * (L.fat || 4);
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
      if (bgGrid) wctx.drawImage(bgGrid, 0, 0);       // 背景圖縮到場景格（bgMode=grid）：牆／地板跟道具同一格
      else if (!L.bg) drawShell();
      var props = L.props || [];
      var byLayer = { wall: [], floor: [], stand: [], ceiling: [], front: [], glow: [] };
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
      if (!L.bg) applyLight();
      byLayer.glow.forEach(function (o) { PROPS[o.type].draw(P, o, S); });
      drawFocus();
      blit();
    }
    // 可視畫布直接用裝置像素大小（每格 devPx×devPx 個裝置像素），自己用最近鄰放大：
    // 不靠 CSS image-rendering（舊 iOS Safari 對 canvas 的 pixelated 不可靠），每一格在任何瀏覽器都是銳利的方塊。
    function blit() {
      var k = devPx, bw = Math.round(vw * k), bh = Math.round(vh * k);
      if (view.width !== bw) view.width = bw;
      if (view.height !== bh) view.height = bh;
      vctx.clearRect(0, 0, bw, bh);
      // 背景（初版描圖的牆與地板）：原生解析度 1120×1231，直接平滑縮到裝置像素——細節跟初版一樣
      if (L.bg && !bgGrid) {
        if (bgImg && bgImg.complete && bgImg.naturalWidth) {
          var bs = bgImg.naturalWidth / W;
          vctx.imageSmoothingEnabled = true; vctx.imageSmoothingQuality = 'high';
          vctx.drawImage(bgImg, vx * bs, vy * bs, vw * bs, vh * bs, 0, 0, bw, bh);
        } else { vctx.fillStyle = L.bg.color || '#3a2a18'; vctx.fillRect(0, 0, bw, bh); }
      }
      // 高解析層（牆上蓋的真封面、小木架上的 7 吋）：在背景圖之上、家具之下
      if (S.hires) {
        var V = { ctx: vctx, k: k, vx: vx, vy: vy, X: function (x) { return (x - vx) * k; }, Y: function (y) { return (y - vy) * k; } };
        (L.props || []).forEach(function (o) { var sp = PROPS[o.type]; if (sp && sp.hires && !o.hidden) { vctx.save(); try { sp.hires(V, o, S); } catch (e) { console.error(e); } vctx.restore(); } });
      }
      vctx.imageSmoothingEnabled = false; vctx.webkitImageSmoothingEnabled = false;
      vctx.drawImage(world, vx, vy, vw, vh, 0, 0, bw, bh);
      // 高解析頂層（木箱裡朝外的那張、櫃檯上正在放的那張）：世界格已經畫了像素版；前面沒有人擋著才用原圖蓋上去（有人擋就留像素版，前後關係永遠對）
      if (S.hires) {
        var V2 = { ctx: vctx, k: k, vx: vx, vy: vy, X: function (x) { return (x - vx) * k; }, Y: function (y) { return (y - vy) * k; }, blocked: blockedBy };
        (L.props || []).forEach(function (o) { var sp = PROPS[o.type]; if (sp && sp.hiresTop && !o.hidden) { vctx.save(); try { sp.hiresTop(V2, o, S); } catch (e) { console.error(e); } vctx.restore(); } });
        vctx.imageSmoothingEnabled = false;
      }
    }
    // 這個矩形（場景座標）前面有沒有東西：腳底比 base 低（站得比較前面）的小人、飛行中的唱片
    function blockedBy(r, base) {
      for (var id in actors) {
        var a = actors[id]; if (a.hidden || a.outside || !a.rows) continue;
        if (base != null && a.y + (a.zb || 0) <= base) continue;
        var x0 = Math.round(a.x) - 9 * K, y0 = Math.round(a.y) - 16 * K;
        if (x0 < r[0] + r[2] && x0 + 18 * K > r[0] && y0 < r[1] + r[3] && Math.round(a.y) + 2 > r[1]) return true;
      }
      var fx = state.fx;
      if (fx && fx.discs) for (var i = 0; i < fx.discs.length; i++) { var d = fx.discs[i]; if (d.x + 8 > r[0] && d.x - 8 < r[0] + r[2] && d.y + 8 > r[1] && d.y - 8 < r[1] + r[3]) return true; }
      return false;
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
        var bx = Math.round(h.cx) - 3 * KE, by = Math.round(r[1] + r[3]) + KE + (Math.floor(t * 3) % 2) * KE;
        if (by + 9 * KE > H) by = Math.round(r[1]) - 10 * KE - (Math.floor(t * 3) % 2) * KE;
        P2.sprite(HAND, bx, by, { k: '#111111', w: '#ffffff', s: '#f6dcc4' }, { k: KE });
      }
      // 今晚可去的地方：金／奶油雙色外框（慢慢呼吸，不跑馬燈）
      if (state.hi.length) {
        var on = Math.floor(t * 2.5) % 2;
        state.hi.forEach(function (g) { g.hots.forEach(function (h) { wctx.fillStyle = on ? '#f0c75e' : '#fff1c2'; h.outline.forEach(function (p) { wctx.fillRect(p[0], p[1], 1, 1); }); }); });
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
          if (hh) { var q = KE, sx = hh.rect[0] + hh.rect[2] - 2 * q, sy = hh.rect[1] + q, big = ph > 0.15 && ph < 0.4; P2.rect(sx, sy, q, q, 'hi'); if (big) { P2.rect(sx - q, sy, q, q, 'hi2'); P2.rect(sx + q, sy, q, q, 'hi2'); P2.rect(sx, sy - q, q, q, 'hi2'); P2.rect(sx, sy + q, q, q, 'hi2'); } }
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
      // 細格子世界：倍率不必是整數（1 場景像素 = 2.6 個裝置像素也行），寬度貼滿；最近鄰放大，每格 2～3 個裝置像素
      if (L.fine) return Math.max(0.5, Math.min((opts.maxScale || L.maxScale || 1.5) * dpr, hw * dpr / sw));
      return Math.max(1, Math.min(Math.floor((opts.maxScale || L.maxScale || 3) * dpr + 1e-6), Math.floor(hw * dpr / sw + 1e-6)));
    }
    function fit() {
      hostW = host.clientWidth || hostW || 390;
      var dpr = dprNow(), dev = baseDev();
      if (cam.dev) dev = Math.min(dev, cam.dev);
      devPx = dev; scale = dev / dpr;
      vw = Math.min(W, Math.floor(hostW / scale + 1e-6));
      if (L.fine && vw > W - 2) vw = W;
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
        var r = h.rect, la = h.labelAt || (h.prop && h.prop.hot && h.prop.hot.labelAt), p = la ? toCss(la[0], la[1]) : toCss(r[0] + r[2] / 2, r[1]), below = p.y < 26;
        if (below) p = toCss(r[0] + r[2] / 2, r[1] + r[3]);
        d.style.left = p.x + 'px'; d.style.top = p.y + 'px'; d.classList.toggle('below', below);
        d.style.setProperty('--shift', sideShift(d, p.x) + 'px');
      } });
    }
    function bubbleFor(id, text, o) {
      var el = document.createElement('div'); el.className = 'ds-say' + (o.tone ? ' ' + o.tone : ''); el.textContent = text;
      return addMark({ el: el, kind: 'say', id: id, place: function () {
        var a = actors[id]; if (!a) return;
        var head = a.y - 15 * K - (o.lift || 0) - (tagOn(id) ? 20 : 0), p = toCss(a.x, head), bh = el.offsetHeight || 24;
        if (p.y - bh - 8 < 0) {   // 頭頂放不下（例：對決橫條裡櫃檯後的老闆）→ 放在身體旁邊
          var right = toCss(a.x + 8 * K, a.y - 10 * K), left = toCss(a.x - 8 * K, a.y - 10 * K), ow = overlay.clientWidth || vw * scale, w = el.offsetWidth;
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
      var tol = L.fine ? 14 : 6;
      if (!h || h !== d0.h || Math.abs(p.x - d0.x) > tol || Math.abs(p.y - d0.y) > tol) return;
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
    // 唱盤區演出（clash）時每個 rAF 都畫（fast>0），演完回 10 fps；onTick 的函式每格在畫之前跑（stage.js 用來推進時間軸）
    var last = 0, raf = 0, t0 = now(), fixedT = opts.fixedTime, tPaused = 0, fastN = 0, ticks = [];
    function loop(ts) {
      if (destroyed) return;
      raf = requestAnimationFrame(loop);
      if (!fastN && ts - last < 95) return; var dt = Math.min(0.2, (ts - last) / 1000); last = ts;
      state.rt = (now() - t0 - tPaused) / 1000; state.t = fixedT != null ? fixedT : state.rt; state.frame++;   // rt＝真時間（到期用），t＝畫面動畫時間（可凍結截圖）
      for (var ti = 0; ti < ticks.length; ti++) { try { ticks[ti](state.rt, dt); } catch (e) { console.error(e); } }
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
        var tgt = a.path[0], dx = tgt.x - a.x, dy = tgt.y - a.y, dist = Math.sqrt(dx * dx + dy * dy), sp = (a.speed || 36) * (L.walkK || K) * dt * k;
        a.moving = true; if (Math.abs(dx) > 0.5) a.flip = (a.faceFlip ? dx > 0 : false);
        if (dist <= sp) { a.x = tgt.x; a.y = tgt.y; a.outside = tgt.outside; a.path.shift(); if (!a.path.length) { a.moving = false; var r = a.res; a.res = null; if (r) r(); } }
        else { a.x += dx / dist * sp; a.y += dy / dist * sp; if (tgt.outside !== a.outside && dist < 6 * K) a.outside = tgt.outside; }
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
      // route B：手臂姿勢（wind／throw／flag…，改小人格子）、手上拿的東西（封套、唱片）、水平位移（受擊後退）
      arm: function (id, kind) { actor(id).arm = kind || null; return api; },
      hold: function (id, what) { actor(id).hold = what || null; return api; },
      nudge: function (id, dx) { actor(id).ox = dx || 0; return api; },
      flip: function (id, on) { actor(id).flip = !!on; return api; },
      fast: function (on) { fastN = Math.max(0, fastN + (on ? 1 : -1)); return api; },
      onTick: function (fn) { ticks.push(fn); return function () { ticks = ticks.filter(function (f) { return f !== fn; }); }; },
      tick: function () { state.rt = (now() - t0 - tPaused) / 1000; if (fixedT == null) state.t = state.rt; ticks.forEach(function (f) { try { f(state.rt, 0); } catch (e) { console.error(e); } }); render(); layoutOverlay(); return api; },
      now: function () { return (now() - t0 - tPaused) / 1000; },
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
        if (L.tagTop) lr = 'T';
        dropMarks(function (m) { return m.kind === 'tag' && m.id === id; });
        if (!text) return null;
        var d = document.createElement('div'); d.className = 'ds-tag ' + (side === 'p' ? 'p' : 'e') + ' ' + (lr === 'R' ? 'R' : lr === 'T' ? 'T' : 'L'); d.textContent = text;
        addMark({ el: d, kind: 'tag', id: id, lr: lr, place: function () {
          var a = actors[id]; if (!a || a.hidden) { d.style.display = 'none'; return; }
          d.style.display = '';
          var w = d.offsetWidth, ow = overlay.clientWidth || vw * scale, p;
          if (lr === 'T') {   // 名牌在頭上（唱盤區對決）：置中、夾在畫面內
            p = toCss(a.x, a.y - 14 * K - 3); p.x = clamp(p.x, 2 + w / 2, ow - 2 - w / 2);
          } else {
            p = toCss(lr === 'R' ? a.x + 8 * K : a.x - 8 * K, a.y - 9 * K);
            // 長名字（冷門仙人、那張我有）不要被舞台邊緣切掉：夾在畫面內，必要時蓋到身體一點點
            if (lr === 'R') p.x = Math.min(p.x, ow - 2 - 3 - w); else p.x = Math.max(p.x, 2 + 3 + w);
          }
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
          var tg = tagOn(id), p = tg ? toCss(x0 + (fw || 1) * 11 * K, y0 - 13 * K) : fw ? toCss(x0 + fw * 12 * K + 0.5, y0 - 4 * K) : toCss(x0 + 0.5, talking ? y0 - 3 * K : y0 - 15 * K);
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
          var p0 = toCss(a.x - 6 * K, a.y - 14 * K), p1 = toCss(a.x + 6 * K, a.y + 1);
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


  // =====================================================================================================================
  // 斜俯視 3/4 renderer（本店 dip；layout.projection＝'oblique34'）。店主 2026-11-07 看過路線 P2：「我覺得這個背景製作的還不錯」。
  //   世界 292×322 美術格；1 美術格＝k 裝置 px（390 寬 @3 → k≈4，非整數），每個矩形各自四捨五入到裝置像素（最近鄰），
  //   封面與中文字用裝置解析度。人（16×16 小人 ×3）48 格高＝1.70 m。
  //   快取：地板＋後牆一張、每個靜態道具一張（自己的外框）、打光（乘＋濾色）各一張；每格只畫會動的（門、櫃檯、唱盤台、人、特效）。
  // =====================================================================================================================
  var O34 = (function () {
    function hash(a, b, c) {
      var h = (a | 0) * 374761393 + (b | 0) * 668265263 + (c | 0) * 362437 + 1013904223;
      h = Math.imul(h ^ (h >>> 13), 1274126177); h = h ^ (h >>> 16);
      return (h >>> 0) / 4294967296;
    }
    function hx(c) { c = String(c).replace('#', ''); if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2]; return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)]; }
    function toHex(r, g, b) { return '#' + [r, g, b].map(function (v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? '0' : '') + v.toString(16); }).join(''); }
    var sc = {};
    function shade(c, f) {
      var key = c + f; if (sc[key]) return sc[key];
      var a = hx(c), o = f >= 0 ? toHex(a[0] + (255 - a[0]) * f, a[1] + (255 - a[1]) * f, a[2] + (255 - a[2]) * f) : toHex(a[0] * (1 + f), a[1] * (1 + f), a[2] * (1 + f));
      return (sc[key] = o);
    }
    function mix(c1, c2, t) { var a = hx(c1), b = hx(c2); return toHex(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t); }
    var C = {
      O: '#1d1712',
      wall: '#e4dccb', wallL: '#efe9dc', wallD: '#cfc5b0', wallDD: '#b9ae97',
      cap: '#2b2420', capL: '#463b33',
      pine: '#d4a265', pineL: '#e8bf84', pineD: '#b5844a', pineDD: '#8d6233', pineX: '#6e4a26',
      walnut: '#76492b', walnutL: '#93603b', walnutD: '#55331c', walnutDD: '#3b2313',
      teal: '#2fb2c4', tealL: '#6fd6e2', tealD: '#1f8a99', tealDD: '#166874',
      chrome: '#d7dade', chromeD: '#8c9097',
      interior: '#2e1e12'
    };
    var FONT = {
      A: '010101111101101', B: '110101110101110', C: '011100100100011', D: '110101101101110', E: '111100110100111', F: '111100110100100',
      G: '011100101101011', H: '101101111101101', I: '111010010010111', J: '001001001101010', K: '101101110101101', L: '100100100100111',
      M: '10001/11011/10101/10001/10001', N: '1001/1101/1011/1001/1001', O: '010101101101010', P: '110101110100100', Q: '010101101110011', R: '110101110101101',
      S: '011100010001110', T: '111010010010010', U: '101101101101111', V: '101101101101010', W: '10001/10001/10101/11011/10001', X: '101101010101101',
      Y: '101101010010010', Z: '111001010100111', '0': '111101101101111', '1': '010110010010111', '2': '110001010100111', '3': '110001010001110',
      '4': '101101111001001', '5': '111100110001110', '6': '011100111101111', '7': '111001010010010', '8': '111101111101111', '9': '111101111001110',
      '&': '010101010101011', '-': '000000111000000', ' ': '000000000000000', '.': '000000000000010', '!': '010010010000010', '?': '110001010000010'
    };
    function glyph(ch) { var g = FONT[ch] || FONT['?']; return g.indexOf('/') >= 0 ? g.split('/') : [g.slice(0, 3), g.slice(3, 6), g.slice(6, 9), g.slice(9, 12), g.slice(12, 15)]; }
    return {
      hash: hash, shade: shade, mix: mix, C: C, FONT: FONT, glyph: glyph, PROPS: {}, HOOKS: {},
      SLEEVES: ['#efe8d6', '#ebe2cc', '#f1e4ad', '#e6cd7c', '#dcd6c6', '#c3bca9', '#efe8d6', '#2c2725', '#e9ddbd', '#d8b56c', '#f2ecdf', '#e4dccb', '#cfc8b4', '#efe8d6', '#f3e9c2'],
      SLEEVE_ACC: ['#b9443a', '#3f6fa6', '#5f8f4e', '#8b5aa0', '#d9783a', '#2b6b6b'],
      FONT_CSS: '"Noto Sans TC","PingFang TC","Heiti TC","Microsoft JhengHei","WenQuanYi Zen Hei",sans-serif'
    };
  })();
  function defO(type, spec) { O34.PROPS[type] = typeof spec === 'function' ? { draw: spec } : spec; }
  function hookO(name, fn) { O34.HOOKS[name] = fn; }

  // 斜俯視畫筆：美術格座標 → 裝置像素。T＝{ ctx, k, cx, cy, meas([x0,y0,x1,y1]｜null：只量外框), cover(id)→img, used{}, pool[] }
  function OPainter(T) {
    function X(x) { return Math.round((x - T.cx) * T.k); }
    function Y(y) { return Math.round((y - T.cy) * T.k); }
    function grow(x, y, w, h) { var m = T.meas; if (x < m[0]) m[0] = x; if (y < m[1]) m[1] = y; if (x + w > m[2]) m[2] = x + w; if (y + h > m[3]) m[3] = y + h; }
    function font(size, bold) { return (bold ? 'bold ' : '') + (size * T.k) + 'px ' + O34.FONT_CSS; }
    var P = {
      C: O34.C, shade: O34.shade, mix: O34.mix, hash: O34.hash, X: X, Y: Y,
      get k() { return T.k; }, get ctx() { return T.ctx; },
      r: function (x, y, w, h, c) {
        if (!(w > 0 && h > 0)) return;
        if (T.meas) { grow(x, y, w, h); return; }
        var ctx = T.ctx, x0 = X(x), y0 = Y(y); ctx.fillStyle = c; ctx.fillRect(x0, y0, X(x + w) - x0, Y(y + h) - y0);
      },
      p: function (x, y, c) { P.r(x, y, 1, 1, c); },
      a: function (al, fn) { if (T.meas) { fn(); return; } var c = T.ctx, g = c.globalAlpha; c.globalAlpha = g * al; try { fn(); } finally { c.globalAlpha = g; } },
      ell: function (cx, cy, rx, ry, c) {
        for (var yy = Math.floor(cy - ry); yy <= Math.ceil(cy + ry); yy++) {
          var dy = (yy + 0.5 - cy) / ry; if (Math.abs(dy) > 1) continue;
          var hw = rx * Math.sqrt(1 - dy * dy), x0 = Math.round(cx - hw), x1 = Math.round(cx + hw);
          if (x1 > x0) P.r(x0, yy, x1 - x0, 1, c);
        }
      },
      line: function (x0, y0, x1, y1, c) { var n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1; for (var i = 0; i <= n; i++) P.p(Math.round(x0 + (x1 - x0) * i / n), Math.round(y0 + (y1 - y0) * i / n), c); },
      ptext: function (s, x, y, c) {
        s = String(s).toUpperCase(); var cx = x;
        for (var i = 0; i < s.length; i++) { var rows = O34.glyph(s[i]); for (var j = 0; j < 5; j++) for (var b = 0; b < rows[j].length; b++) if (rows[j][b] === '1') P.p(cx + b, y + j, c); cx += rows[0].length + 1; }
      },
      pwidth: function (s) { s = String(s).toUpperCase(); var w = -1; for (var i = 0; i < s.length; i++) w += O34.glyph(s[i])[0].length + 1; return w; },
      textW: function (s, size, bold) {
        var ctx = T.ctx || T.mctx; size = size || 7;
        if (!ctx || typeof ctx.measureText !== 'function') return String(s).length * size;
        ctx.font = font(size, bold); var m = ctx.measureText(String(s)); return (m && m.width ? m.width : String(s).length * size * T.k) / T.k;
      },
      text: function (s, x, y, o) {
        o = o || {}; var size = o.size || 7;
        if (T.meas) { var tw = String(s).length * size; grow(o.align === 'left' ? x : x - tw / 2, y - size / 2, tw, size); return; }
        var ctx = T.ctx; if (typeof ctx.fillText !== 'function') return;
        ctx.font = font(size, o.bold); ctx.textAlign = o.align || 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = o.color || '#111';
        ctx.fillText(String(s), (x - T.cx) * T.k, (y - T.cy) * T.k + (o.dy || 0) * T.k);
      },
      cover: function (id, x, y, w, h, o) {
        o = o || {};
        if (T.meas) { grow(x, y, w, h); return; }
        if (T.used && id) T.used[id] = 1;
        var ctx = T.ctx, im = (id && T.cover) ? T.cover(id) : null;
        var dx = X(x), dy = Y(y), dw = X(x + w) - dx, dh = Y(y + h) - dy;
        ctx.save();
        if (o.clipY != null && ctx.clip) { ctx.beginPath(); ctx.rect(dx, dy, dw, Y(o.clipY) - dy); ctx.clip(); }
        if (im) { ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; ctx.drawImage(im, dx, dy, dw, dh); ctx.imageSmoothingEnabled = false; }
        else { var hc = Math.floor(O34.hash(String(id).length, String(id || 'x').charCodeAt(0), 5) * O34.SLEEVE_ACC.length); ctx.fillStyle = O34.SLEEVE_ACC[hc]; ctx.fillRect(dx, dy, dw, dh); }
        if (o.shade) { ctx.fillStyle = 'rgba(20,10,0,' + o.shade + ')'; ctx.fillRect(dx, dy, dw, dh); }
        if (o.glare !== false) {   // 塑膠封套反光：兩條斜的細光
          var ga = ctx.globalAlpha; ctx.globalAlpha = ga * 0.16; ctx.fillStyle = '#ffffff';
          for (var i = 0; i < Math.min(w, h) - 2; i++) ctx.fillRect(X(x + 2 + i), Y(y + h - 3 - i), Math.ceil(T.k), Math.ceil(T.k));
          ctx.globalAlpha = ga;
        }
        ctx.restore();
      },
      // 美術格解析度的小圖（小人、圖示）：最近鄰放大到裝置像素
      img: function (cv, x, y, w, h) {
        if (!cv) return;
        if (T.meas) { grow(x, y, w, h); return; }
        var x0 = X(x), y0 = Y(y), ctx = T.ctx; ctx.imageSmoothingEnabled = false; ctx.drawImage(cv, x0, y0, X(x + w) - x0, Y(y + h) - y0);
      },
      // 字母列小圖（EMOTE、手指）：每格 q 美術格
      rows: function (rows, x, y, pal, q, o) {
        o = o || {}; q = q || 1; var w = rows[0].length;
        for (var j = 0; j < rows.length; j++) for (var i = 0; i < w; i++) {
          var ch = rows[j].charAt(o.flip ? w - 1 - i : i); if (ch === '.' || ch === ' ' || !ch) continue;
          P.r(x + i * q, y + j * q, q, q, o.sil || (pal && pal[ch]) || '#ff00ff');
        }
      },
      poolPick: function (seed) { var pool = T.pool || []; return pool.length ? pool[Math.floor(O34.hash(seed, 77, 3) * pool.length)] : null; }
    };
    return P;
  }

  // 走位：兩點之間有家具就繞（layout.nav 的路點＋每個道具的地面範圍 foot）
  function segHitsRect(a, b, r) {   // Liang–Barsky：線段 a→b 有沒有穿過矩形 r=[x,y,w,h]
    var x0 = a[0], y0 = a[1], dx = b[0] - x0, dy = b[1] - y0, t0 = 0, t1 = 1;
    var p = [-dx, dx, -dy, dy], q = [x0 - r[0], r[0] + r[2] - x0, y0 - r[1], r[1] + r[3] - y0];
    for (var i = 0; i < 4; i++) {
      if (p[i] === 0) { if (q[i] < 0) return false; continue; }
      var t = q[i] / p[i];
      if (p[i] < 0) { if (t > t1) return false; if (t > t0) t0 = t; } else { if (t < t0) return false; if (t < t1) t1 = t; }
    }
    return t0 < t1;
  }
  function inRect(p, r) { return p[0] > r[0] && p[0] < r[0] + r[2] && p[1] > r[1] && p[1] < r[1] + r[3]; }
  function navObstacles(L) {
    var out = [], m = L.navMargin || [5, 2];
    (L.props || []).forEach(function (o) {
      var sp = O34.PROPS[o.type]; if (!sp || !sp.foot || o.hidden || o.block === false) return;
      var r = sp.foot(o); out.push([r[0] - m[0], r[1] - m[1], r[2] + 2 * m[0], r[3] + 2 * m[1]]);
    });
    (L.obstacles || []).forEach(function (r) { out.push(r.slice()); });
    return out;
  }
  // 線段 p→q 不穿過任何障礙（端點本身在框裡的那個框跳過：spot 站在框裡由 check-shops 擋）
  function navClear(obs, p, q) { for (var i = 0; i < obs.length; i++) { var r = obs[i]; if (inRect(p, r) || inRect(q, r)) continue; if (segHitsRect(p, q, r)) return false; } return true; }
  // SPEC-v4 §2.4.5：走不到回 null（不再回 [b]＝直線穿家具）；自己絕不丟例外。呼叫端一定要處理 null（routed()、api.route、stage.duelIn、check-shops、shop.test）
  function navRoute(L, a, b, obs) {
    try {
      obs = obs || navObstacles(L);
      if (navClear(obs, a, b)) return [b];
      var N = [a].concat((L.nav || []).map(function (p) { return [p[0], p[1]]; }), [b]), n = N.length, dist = [], prev = [], done = [];
      for (var i = 0; i < n; i++) { dist.push(Infinity); prev.push(-1); done.push(false); }
      dist[0] = 0;
      for (;;) {
        var u = -1; for (var j = 0; j < n; j++) if (!done[j] && dist[j] < Infinity && (u < 0 || dist[j] < dist[u])) u = j;
        if (u < 0 || u === n - 1) break; done[u] = true;
        for (var v = 0; v < n; v++) {
          if (done[v] || v === u) continue;
          var d = Math.hypot(N[v][0] - N[u][0], N[v][1] - N[u][1]);
          if (dist[u] + d < dist[v] && navClear(obs, N[u], N[v])) { dist[v] = dist[u] + d; prev[v] = u; }
        }
      }
      if (prev[n - 1] < 0) return null;
      var path = [], c = n - 1; while (c > 0) { path.unshift(N[c]); c = prev[c]; }
      return path;
    } catch (e) { return null; }
  }
  // 執行期退路（非嚴格模式，§2.4.5）：先走到「從起點直線走得到、離終點最近」的 nav 點，再 navRoute(那個點, 終點)；
  // 還是走不到就直線走過去（人仍在走、看得到）。回 { pts, how:'detour'|'straight' }，絕不回 null、絕不瞬移
  function navFallback(L, a, b, obs) {
    obs = obs || navObstacles(L);
    var best = null, bd = Infinity;
    (L.nav || []).forEach(function (p) {
      if ((p[0] === a[0] && p[1] === a[1]) || !navClear(obs, a, p)) return;
      var d = Math.hypot(p[0] - b[0], p[1] - b[1]); if (d < bd) { bd = d; best = [p[0], p[1]]; }
    });
    if (best) { var r = navRoute(L, best, b, obs); if (r) return { pts: [best].concat(r), how: 'detour' }; }
    return { pts: [b], how: 'straight' };
  }

  // ===================================================================== 命中（SPEC-v4 §2.4：看得到的形狀＋深度＋沒命中才容錯）
  // hot = { id, action, label, rect, shape:[[x,y,w,h],…], depth, sub?, parent?, pri?, enabled, occluder? }
  //   主熱點（道具的 hot、箱子的 bin）、子熱點（道具 hots(o,S)：牆上封面、矮櫃封面、櫃檯 now／cat；深度＝父道具＋0.01）、
  //   跟著人走（layout.hotspots 的 follow：深度＝那個人的 y＋0.5；沒 follow 的＝牆層 −1）、遮擋物（沒有主熱點的站立道具：植物、凳子、矮櫃、高櫃、唱盤台）。
  //   深度跟畫圖排序同一把尺（render：站立層按 o.y、人按 y）；wall＝−1、bg＝−2。
  function propLayerO(o, PR) { return o.layer || (PR[o.type] && PR[o.type].layer) || 'stand'; }
  function depthOf(o, PR) { var ly = propLayerO(o, PR); return ly === 'bg' ? -2 : ly === 'wall' ? -1 : (o.y != null ? o.y : 0); }
  // 道具看得到的外框：有 box 用 box；沒有就量它畫出來的範圍（OPainter 量外框模式，純計算）；量不到才退回 [x, y−h, w, h]
  function propVisBox(o, PR, S) {
    var sp = PR[o.type];
    if (sp && sp.box) return sp.box(o).map(Math.round);
    if (sp && sp.draw) {
      try {
        var T = { ctx: null, k: 1, cx: 0, cy: 0, meas: [1e9, 1e9, -1e9, -1e9], cover: null, used: null, pool: [] };
        sp.draw(OPainter(T), o, S); var m = T.meas;
        if (m[2] > m[0] && m[3] > m[1]) { var x0 = Math.floor(m[0]), y0 = Math.floor(m[1]); return [x0, y0, Math.ceil(m[2]) - x0, Math.ceil(m[3]) - y0]; }
      } catch (_) {}
    }
    return [o.x || 0, (o.y || 0) - (o.h || 8), o.w || 8, o.h || 8];
  }
  function shapeBox(shape) {
    var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    shape.forEach(function (r) { x0 = Math.min(x0, r[0]); y0 = Math.min(y0, r[1]); x1 = Math.max(x1, r[0] + r[2]); y1 = Math.max(y1, r[1] + r[3]); });
    return [x0, y0, x1 - x0, y1 - y0];
  }
  function inShape(h, x, y) { var s = h.shape; for (var i = 0; i < s.length; i++) { var r = s[i]; if (x >= r[0] && y >= r[1] && x < r[0] + r[2] && y < r[1] + r[3]) return true; } return false; }
  function shapeArea(h) { var a = 0; h.shape.forEach(function (r) { a += r[2] * r[3]; }); return a; }
  // 跟著人走的熱點：rect／shape／depth 跟著那個人（a＝{x,y,hidden,outside,look}；沒有人＝gone）
  function followHot(h, a, KS) {
    var rel = h.rel || [-5 * (KS || 3), -15 * (KS || 3), 10 * (KS || 3), 10 * (KS || 3)];
    h.gone = !a || !!a.hidden || !!a.outside || a.look === false;
    if (h.gone) return h;
    h.rect = [Math.round(a.x) + rel[0], Math.round(a.y) + rel[1], rel[2], rel[3]]; h.shape = [h.rect.slice()];
    h.depth = a.y + 0.5; h.cx = h.rect[0] + rel[2] / 2; h.cy = h.rect[1] + rel[3] / 2;
    return h;
  }
  // 純函式（給 shop.js 自己、Node 測試、檢查工具）：L＝layout、PROPS＝O34.PROPS（或任何 defO 表）、S＝道具用的場景物件（card(id)、state、actor(id)）
  function buildHotList(L, PROPS, S) {
    PROPS = PROPS || O34.PROPS;
    S = S || {};
    if (!S.L) S = Object.assign({ L: L, layout: L, W: L.size && L.size[0], H: L.size && L.size[1], state: {}, t: 0, rt: 0, frame: 0, card: function () { return null; } }, S);
    var KS = L.spriteScale || 3, out = [];
    (L.props || []).forEach(function (o, idx) {
      var sp = PROPS[o.type]; if (!sp || o.hidden) return;
      var ly = propLayerO(o, PROPS); if (ly === 'fx') return;
      var depth = depthOf(o, PROPS), mains = [];
      if (o.hot) {
        var hr = (o.hot.rect || propVisBox(o, PROPS, S)).map(Math.round);
        mains.push({ id: o.id || (o.type + idx), rect: hr, shape: [hr.slice()], depth: depth, label: o.hot.label, action: o.hot.action, prop: o, order: idx, pri: o.hot.pri || 0, noSparkle: !!o.hot.noSparkle, labelAt: o.hot.labelAt });
      }
      if (o.bin && o.bin.key) {
        var bb = propVisBox(o, PROPS, S);
        mains.push({ id: 'bin:' + o.bin.key, rect: bb, shape: [bb.slice()], depth: depth, label: o.bin.label || o.bin.key, action: 'crate:' + o.bin.key, prop: o, order: idx, pri: 0, bin: o.bin, stand: o.bin.stand || null });
      }
      mains.forEach(function (h) { out.push(h); });
      var parent = mains.length ? mains[mains.length - 1].id : null;
      if (sp.hots) (sp.hots(o, S) || []).forEach(function (h) {
        h.prop = o; h.order = idx; h.rect = h.rect.map(Math.round); h.shape = [h.rect.slice()];
        h.sub = !h.main; h.depth = depth + (h.sub ? 0.01 : 0); if (h.sub && parent) h.parent = parent;
        out.push(h);
      });
      if (!mains.length && ly !== 'wall' && ly !== 'bg') {
        var ob = propVisBox(o, PROPS, S);
        out.push({ id: '~' + (o.id || (o.type + idx)), occluder: true, rect: ob, shape: [ob.slice()], depth: depth, prop: o, order: idx, enabled: false });
      }
    });
    (L.hotspots || []).forEach(function (h0, i) {
      var c = Object.assign({ order: 1000 + i }, h0); c.rect = (h0.rect || [0, 0, 1, 1]).slice(); c.shape = [c.rect.slice()]; c.depth = -1;
      if (c.follow) {
        var a = typeof S.actor === 'function' ? S.actor(c.follow) : null;
        if (!a) {   // 純函式用：layout.actors 一開始站的位置
          var la = (L.actors || []).filter(function (x) { return x.id === c.follow; })[0], sp0 = la && L.spots && L.spots[la.at];
          a = sp0 ? { x: sp0[0], y: sp0[1], outside: !!sp0[2] } : null;
        }
        followHot(c, a, KS);
      }
      out.push(c);
    });
    out.forEach(function (h, i) { h.idx = i; if (h.enabled == null) h.enabled = !h.occluder; h.cx = h.rect[0] + h.rect[2] / 2; h.cy = h.rect[1] + h.rect[3] / 2; });
    return out;
  }
  function hotRank(h) { return h.occluder ? 0 : h.sub ? 2 : 1; }
  // a 比 b 更前面（被點到）？深度大 → 子熱點 > 主熱點 > 遮擋物 → pri 大 → 面積小 → 順序後
  function hotBefore(a, b) {
    if (a.depth !== b.depth) return a.depth > b.depth;
    var ra = hotRank(a), rb = hotRank(b); if (ra !== rb) return ra > rb;
    if ((a.pri || 0) !== (b.pri || 0)) return (a.pri || 0) > (b.pri || 0);
    var aa = shapeArea(a), ab = shapeArea(b); if (aa !== ab) return aa < ab;
    if ((a.order || 0) !== (b.order || 0)) return (a.order || 0) > (b.order || 0);
    return (a.idx || 0) > (b.idx || 0);
  }
  // 這一格最上面的是誰（含遮擋物、含停用的；gone 的不算）
  function hitTop(hots, x, y) {
    var best = null;
    for (var i = 0; i < hots.length; i++) { var h = hots[i]; if (h.gone || !h.shape || !inShape(h, x, y)) continue; if (!best || hotBefore(h, best)) best = h; }
    return best;
  }
  function rectDist2(r, x, y) { var dx = Math.max(r[0] - x, 0, x - (r[0] + r[2] - 1)), dy = Math.max(r[1] - y, 0, y - (r[1] + r[3] - 1)); return dx * dx + dy * dy; }
  // SPEC-v4 §2.4.2：o.r＝容錯半徑（美術格）；o.enabled(h)（預設看 h.enabled）；o.raw＝回最上面那個（遮擋物、停用的也回，給工具算可見區）
  function hitPick(hots, x, y, o) {
    o = o || {};
    var en = typeof o.enabled === 'function' ? o.enabled : function (h) { return h.enabled !== false && !h.occluder; };
    var top = hitTop(hots, x, y);
    if (top) {
      if (o.raw) return top;
      if (top.occluder || !en(top)) return null;   // 被擋住／停用：不往後穿
      if (!top.sub) {   // 主熱點、而它的子熱點也包含這點 → 子熱點
        for (var i = 0; i < hots.length; i++) { var s = hots[i]; if (s.sub && s.parent === top.id && !s.gone && en(s) && inShape(s, x, y)) return s; }
      }
      return top;
    }
    if (o.raw) return null;
    var r = o.r != null ? o.r : 6; if (!(r > 0)) return null;
    var best = null, bd = r * r;
    hots.forEach(function (h) {
      if (h.gone || h.occluder || !h.shape || !en(h)) return;
      var d = Infinity; h.shape.forEach(function (q) { d = Math.min(d, rectDist2(q, x, y)); });
      if (d <= bd && (!best || d < bd || hotBefore(h, best))) { bd = d; best = h; }
    });
    return best;
  }
  // 可見區（不在任何更前面的形狀裡）：在 clip=[x,y,w,h] 內，最上面就是 h 的格子。回 { box:[x0,y0,w,h], m:Uint8Array, n }
  // withSubs：子熱點蓋住的那幾格也算（描框用：後牆矮櫃的框圍住整個櫃子，不在每張封面周圍挖洞）
  function hotRegion(hots, h, clip, withSubs) {
    if (!h || h.gone || !h.shape) return null;
    var b = shapeBox(h.shape), x0 = Math.max(b[0], clip ? clip[0] : -1e9), y0 = Math.max(b[1], clip ? clip[1] : -1e9);
    var x1 = Math.min(b[0] + b[2], clip ? clip[0] + clip[2] : 1e9), y1 = Math.min(b[1] + b[3], clip ? clip[1] + clip[3] : 1e9);
    if (x1 <= x0 || y1 <= y0) return null;
    var w = x1 - x0, hh = y1 - y0, m = new Uint8Array(w * hh), n = 0;
    var cand = hots.filter(function (q) { return q === h || (!q.gone && q.shape && hotBefore(q, h) && q.shape.some(function (r) { return r[0] < x1 && r[0] + r[2] > x0 && r[1] < y1 && r[1] + r[3] > y0; })); });
    for (var y = y0; y < y1; y++) for (var x = x0; x < x1; x++) { var t = hitTop(cand, x, y); if (t === h || (withSubs && t && t.sub && t.parent === h.id && inShape(h, x, y))) { m[(y - y0) * w + (x - x0)] = 1; n++; } }
    return n ? { box: [x0, y0, w, hh], m: m, n: n } : null;
  }
  // 可見區裡「最裡面」的一格（離邊界最遠；並列取離重心最近）：真點一定點得到、四捨五入也不會滑出去
  function regionCenter(R) {
    if (!R) return null;
    var w = R.box[2], hh = R.box[3], m = R.m, D = new Int32Array(w * hh), BIG = 1e6, i, x, y;
    for (y = 0; y < hh; y++) for (x = 0; x < w; x++) {
      i = y * w + x; if (!m[i]) { D[i] = 0; continue; }
      var v = BIG; v = Math.min(v, x > 0 ? D[i - 1] + 1 : 1, y > 0 ? D[i - w] + 1 : 1, (x > 0 && y > 0) ? D[i - w - 1] + 1 : 1, (x < w - 1 && y > 0) ? D[i - w + 1] + 1 : 1);
      D[i] = v;
    }
    for (y = hh - 1; y >= 0; y--) for (x = w - 1; x >= 0; x--) {
      i = y * w + x; if (!m[i]) continue;
      D[i] = Math.min(D[i], x < w - 1 ? D[i + 1] + 1 : 1, y < hh - 1 ? D[i + w] + 1 : 1, (x < w - 1 && y < hh - 1) ? D[i + w + 1] + 1 : 1, (x > 0 && y < hh - 1) ? D[i + w - 1] + 1 : 1);
    }
    var sx = 0, sy = 0; for (i = 0; i < m.length; i++) if (m[i]) { sx += i % w; sy += (i / w) | 0; }
    var gx = sx / R.n, gy = sy / R.n, best = -1, bv = -1, bg = Infinity;
    for (i = 0; i < m.length; i++) {
      if (!m[i]) continue; var d = D[i], g = Math.hypot(i % w - gx, ((i / w) | 0) - gy);
      if (d > bv || (d === bv && g < bg)) { bv = d; bg = g; best = i; }
    }
    return { x: R.box[0] + best % w, y: R.box[1] + ((best / w) | 0), depth: bv };
  }
  // 可見區外圍一圈（描框用：畫在可見區外面那一格，被前面的箱子擋住的部分不描）
  function regionOutline(R) {
    if (!R) return [];
    var w = R.box[2], hh = R.box[3], m = R.m, out = [];
    function on(x, y) { return x >= 0 && y >= 0 && x < w && y < hh && m[y * w + x] === 1; }
    for (var y = -1; y <= hh; y++) for (var x = -1; x <= w; x++) {
      if (on(x, y)) continue;
      if (on(x - 1, y) || on(x + 1, y) || on(x, y - 1) || on(x, y + 1) || on(x - 1, y - 1) || on(x + 1, y - 1) || on(x - 1, y + 1) || on(x + 1, y + 1)) out.push([R.box[0] + x, R.box[1] + y]);
    }
    return out;
  }

  function mountOblique(host, layout, opts) {
    opts = opts || {};
    var L = layout, W = L.size[0], H = L.size[1], OP = O34.PROPS;
    var KS = L.spriteScale || 3, KE = L.iconScale || 2;   // 小人一格＝KS 美術格；頭上圖示一格＝KE
    var spritePal = Object.assign({}, DEFAULT_PAL, opts.spritePal || {});
    var view = document.createElement('canvas'); view.className = 'ds-canvas'; view.setAttribute('aria-hidden', 'true');
    var vctx = view.getContext('2d');
    var overlay = document.createElement('div'); overlay.className = 'ds-overlay';
    host.classList.add('ds-host'); host.innerHTML = ''; host.appendChild(view); host.appendChild(overlay);
    var state = { door: (L.ambience && L.ambience.door) || 'closed', playing: !(L.ambience && L.ambience.playing === false), t: 0, rt: 0, frame: 0, spot: null, flash: null, reveal: 0, hover: null, hi: [], poke: {}, decks: {}, fx: null, dim: 1 };
    var actors = {}, hots = [], destroyed = false, allowFn = null, sparkleOn = opts.sparkle !== false;
    var k = 4, scale = 4 / 3, vy = 0, vh = H, hostW = 0;
    var cam = { y: 0, h: H, dev: null };
    var c0 = (L.cameras || {}).full; if (c0) { cam.y = c0.y; cam.h = c0.h; }
    var cardOf = function (id) { return (opts.cards && opts.cards[id]) || (opts.extraCards && opts.extraCards[id]) || null; };
    function spd() { var s = typeof opts.speed === 'function' ? opts.speed() : (opts.speed || 1); return s > 0 ? s : 1; }
    var pool = (L.coverPool && L.coverPool.length) ? L.coverPool.filter(function (id) { return cardOf(id); }) : Object.keys(opts.cards || {}).filter(function (id) { var c = cardOf(id); return c && (c.localCover || c.coverUrl); }).sort();

    // ---------------- 封面（裝置解析度，原圖平滑縮小；不用 CORS：畫布只畫不讀）
    var imgs = {}, cache = null, coverQ = 0;
    function coverURL(id) {
      var c = cardOf(id); if (!c) return null;
      if (c.localCover) { try { return new URL(c.localCover, new URL(opts.coverBase || './', location.href)).href; } catch (_) { return c.localCover; } }
      return c.coverUrl || null;
    }
    function coverImg(id) {
      var u = coverURL(id); if (!u) return null;
      var e = imgs[u];
      if (!e) {
        e = imgs[u] = { img: new Image(), ok: false, ids: {} }; e.ids[id] = 1;
        var im = e.img, c = cardOf(id); im.decoding = 'async';
        im.onload = function () { e.ok = true; if (!destroyed) coverLoaded(e); };
        im.onerror = function () { if (c && c.localCover && c.coverUrl && im.src !== c.coverUrl) im.src = c.coverUrl; };
        im.src = u;   // 不用 CORS：畫布只畫不讀（不取像素），跟頁面上的 <img> 共用快取
      } else e.ids[id] = 1;
      return e.ok ? e.img : null;
    }
    function coverLoaded(e) {
      if (!cache) return;
      var any = false;
      cache.entries.forEach(function (en) { for (var id in e.ids) if (en.used[id]) { en.dirty = true; any = true; } });
      if (any && !coverQ) coverQ = setTimeout(function () { coverQ = 0; if (!destroyed) { refreshDirty(); render(); } }, 100);   // 封面陸續到：合併成每 100 ms 重烘一次（SPEC-v4 §6.4）
    }

    // ---------------- 畫筆目標與場景物件 S（給道具用）
    var T = { ctx: vctx, k: k, cx: 0, cy: 0, meas: null, cover: coverImg, used: null, pool: pool };
    var P = OPainter(T);
    var S = {
      L: L, layout: L, W: W, H: H, state: state, card: cardOf,
      get t() { return state.t; }, get rt() { return state.rt; }, get frame() { return state.frame; },
      outsideCount: function () { var n = 0; for (var id in actors) { var a = actors[id]; if (!a.hidden && a.outside && hasLook(a)) n++; } return n; },
      drawOutside: function (P2, rect) {
        var list = Object.keys(actors).map(function (id) { return actors[id]; }).filter(function (a) { return !a.hidden && a.outside && hasLook(a); });
        if (!list.length) return;
        var c = T.ctx, x0 = P2.X(rect[0]), y0 = P2.Y(rect[1]);
        c.save(); c.beginPath(); c.rect(x0, y0, P2.X(rect[0] + rect[2]) - x0, P2.Y(rect[1] + rect[3]) - y0); c.clip();
        list.sort(function (a, b) { return a.y - b.y; }).forEach(function (a) { drawActor(a, a.sil ? 'sil' : 'night'); });
        P2.a(0.3, function () { P2.r(rect[0], rect[1], rect[2], rect[3], '#0d1228'); });
        c.restore();
      }
    };

    // ---------------- 小人（DipLabChars 有就用；沒有就用原本的 16×16 小人 ×3，加 1 格深色描邊）
    function charsApi() { var CH = (typeof window !== 'undefined') && window.DipLabChars; return (CH && typeof CH.render === 'function' && !opts.noChars && !L.noChars && !/[?&]chars=0/.test(location.search)) ? CH : null; }
    function rowsOf(spr) {
      if (!spr) return null;
      if (Array.isArray(spr)) return spr;
      var lib = typeof opts.sprites === 'function' ? opts.sprites() : opts.sprites;
      if (typeof spr === 'string' && lib && lib[spr]) return lib[spr];
      if (typeof opts.resolveSprite === 'function') { var r = opts.resolveSprite(spr); if (r) return r; }
      return null;
    }
    function specOf(spr) {
      var CH = charsApi(); if (!CH || spr == null || Array.isArray(spr)) return null;
      try {
        if (spr === 'player') { var av = typeof opts.resolveAvatar === 'function' ? opts.resolveAvatar('player') : null; return av ? specOf(av) : null; }
        if (typeof spr === 'string') return typeof CH.npc === 'function' ? CH.npc(spr) : null;
        if (typeof spr === 'object') {
          if (('head' in spr) || ('shirt' in spr) || ('pants' in spr)) return typeof CH.fromDipChar === 'function' ? CH.fromDipChar(spr) : null;
          return typeof CH.normalize === 'function' ? CH.normalize(spr) : spr;
        }
      } catch (e) { console.error(e); }
      return null;
    }
    var charScale = 0;
    function cScale() {
      if (charScale) return charScale;
      if (L.charScale) return (charScale = L.charScale);
      var CH = charsApi(); charScale = KS;
      try { var cv = document.createElement('canvas'); cv.width = cv.height = 96; var r = CH.render(cv.getContext('2d'), CH.npc ? CH.npc('owner') : {}, 'idle', 0, 48, 90, { scale: 1 }); if (r && r.h > 0) charScale = Math.max(1, Math.floor(52 / r.h)); } catch (_) {}
      return charScale;
    }
    function hasLook(a) { return !!(a.rows || a.spec); }
    function actor(id) {
      if (!actors[id]) actors[id] = { id: id, x: 0, y: 0, rows: null, spec: null, hidden: true, flip: false, phase: Math.random() * 2, outside: false, head: 15 * KS };
      return actors[id];
    }
    function setLook(a, spr) { a.spr = spr; a.rows = rowsOf(spr); a.spec = specOf(spr); a.specKey = a.spec ? JSON.stringify(a.spec) : null; a.head = headOf(a); }
    function headOf(a) {
      if (a.spec) { var b = charBitmap(a, 'idle', 0, false, null); if (b && b.top != null) return b.top; }
      if (a.rows) { for (var r = 0; r < a.rows.length; r++) if (/[^. ]/.test(a.rows[r])) return (15 - r) * KS; }
      return 15 * KS;
    }
    function poseOf(a) { if (a.poseUntil && state.rt > a.poseUntil) { a.pose = null; a.poseUntil = 0; } return a.pose; }

    // 16×16 列 → 美術格點陣圖（每格 KS×KS；variant：''＝描邊、'sil'、'gold'、'red'＝受擊疊紅）
    var rowCache = typeof WeakMap !== 'undefined' ? new WeakMap() : null;
    function rowsBitmap(rows, flip, variant) {
      var bag = rowCache && rowCache.get(rows); if (!bag) { bag = {}; if (rowCache) rowCache.set(rows, bag); }
      var key = (flip ? 'f' : 'n') + (variant || ''); if (bag[key]) return bag[key];
      var w = rows[0].length, h = rows.length, q = KS, cv = document.createElement('canvas'); cv.width = w * q + 2; cv.height = h * q + 2;
      var c = cv.getContext('2d');
      function each(fn) { for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) { var ch = rows[j].charAt(flip ? w - 1 - i : i); if (ch && ch !== '.' && ch !== ' ') fn(i, j, ch); } }
      if (variant === 'sil' || variant === 'night' || variant === 'gold') { c.fillStyle = variant === 'gold' ? '#f0c75e' : '#0b0f1a'; each(function (i, j) { c.fillRect(1 + i * q, 1 + j * q, q, q); }); }
      else {
        if (L.spriteOutline !== false) { c.fillStyle = L.spriteOutline || '#1d1712'; each(function (i, j) { c.fillRect(i * q, j * q, q + 2, q + 2); }); }
        each(function (i, j, ch) { c.fillStyle = spritePal[ch] || '#ff00ff'; c.fillRect(1 + i * q, 1 + j * q, q, q); });
        // GBA 小人的一階陰影：輪廓右緣、下緣 1 格（臉、五官、黑色不動；比例與臉一格都不變）
        if (L.spriteShade !== false) {
          var at = function (i, j) { if (j < 0 || j >= h || i < 0 || i >= w) return '.'; var ch2 = rows[j].charAt(flip ? w - 1 - i : i); return ch2 && ch2 !== ' ' ? ch2 : '.'; };
          each(function (i, j, ch) {
            if (ch === 'k' || ch === 's' || ch === 'v' || ch === 't' || ch === 'u' || j < 7) return;   // 頭（前 7 列）與皮膚不畫陰影
            var col = spritePal[ch]; if (!col || col.charAt(0) !== '#') return;
            var dk = O34.shade(col.length === 4 ? '#' + col[1] + col[1] + col[2] + col[2] + col[3] + col[3] : col, -0.28);
            c.fillStyle = dk;
            if (at(i + 1, j) === '.') c.fillRect(1 + i * q + q - 1, 1 + j * q, 1, q);
            if (at(i, j + 1) === '.') c.fillRect(1 + i * q, 1 + j * q + q - 1, q, 1);
          });
        }
        if (variant === 'red') { c.globalCompositeOperation = 'source-atop'; c.fillStyle = 'rgba(230,40,56,0.6)'; c.fillRect(0, 0, cv.width, cv.height); }
      }
      var b = bag[key] = { cv: cv, ax: 8 * q + 1, ay: 15 * q + 1, s: 1 };
      return b;
    }
    // DipLabChars → 點陣圖。×3（美術格模式）：toCanvas 直接給 1 美術格＝1 px 的圖，含 GBA 修飾（1 格描邊＋一階陰影；臉與比例一格不動）。
    // layout.charScale 不是 3 的話退回舊作法（scale 1 平面畫，再 ×cScale）。快取 key＝spec＋姿勢＋格＋翻面＋變體
    var charCache = {}, charN = 0;
    function artMode() { return cScale() === 3 && typeof charsApi().toCanvas === 'function'; }
    function charBitmap(a, pose, frame, flip, variant) {
      var CH = charsApi(); if (!CH || !a.spec) return null;
      var key = a.specKey + '|' + pose + '|' + frame + '|' + (flip ? 1 : 0) + (a.back ? 'b' : '') + (a.phones ? 'h' : '') + '|' + (variant || '');
      var hit = charCache[key]; if (hit) return hit;
      if (++charN > 400) { charCache = {}; charN = 0; }
      try {
        var o = { flip: !!flip, back: !!a.back, shadow: false };
        if (a.phones && !/phones$/.test(String(a.spec.hat || ''))) o.wear = { hat: 'phones', hatColor: 'd' };   // 站在試聽桌前：戴上桌邊那副耳機
        if (variant === 'sil' || variant === 'night') o.sil = '#0b0f1a'; else if (variant === 'gold') o.sil = '#f0c75e'; else if (variant === 'red') o.tint = { color: '#e62838', a: 0.6 };
        if (L.spriteOutline === false && L.spriteShade === false) o.plain = true;
        else { if (L.spriteOutline === false) o.outline = false; if (L.spriteShade === false) o.shade = false; }
        if (artMode()) {
          var tc = CH.toCanvas(a.spec, pose, frame, o);
          if (tc) return (charCache[key] = { cv: tc, ax: tc.ax, ay: tc.ay, s: 1, top: tc.ay, anchors: tc.anchors || null });
        }
        var cv = document.createElement('canvas'); cv.width = 80; cv.height = 80;
        var c = cv.getContext('2d'); o.scale = 1;
        var r = CH.render(c, a.spec, pose, frame, 40, 74, o) || {};
        var s = cScale();
        return (charCache[key] = { cv: cv, ax: 40, ay: 74, s: s, top: r.y != null ? (74 - r.y) * s : null, anchors: r.anchors || null });
      } catch (e) { console.error(e); a.spec = null; a.head = headOf(a); return null; }
    }
    function charPose(a, pose) {
      var CH = charsApi(), P0 = (CH && CH.POSES) || {}, ok = function (p) { return !CH.POSES || P0[p] != null; };
      var t = state.t + a.phase;
      if (a.arm && CH.ARM && CH.ARM[a.arm]) return CH.ARM[a.arm];
      if (pose === 'ko' && ok('ko')) return ['ko', 0];
      if (pose === 'hurt' && ok('hurt')) return ['hurt', Math.floor(t * 10) % 2];
      if (pose === 'dig' && ok('dig')) return ['dig', Math.floor(t * 3) % 2];   // 翻箱：每秒換 3 格（店裡的熟客一直在翻，太快會像在發抖）
      if (pose === 'sit' && ok('sit')) return ['sit', 0];
      if (a.moving && ok('walk')) return ['walk', Math.floor(state.t * 8) % 4];
      if (pose === 'atk' && ok('throw')) return ['throw', 1];
      return ['idle', Math.floor(t * 1.5) % 2];
    }
    function rowsForPose(a, pose) {
      var rows = a.rows; if (!rows) return null;
      if (a.arm) { if (!a._arm || a._arm.src !== rows || a._arm.kind !== a.arm) a._arm = { src: rows, kind: a.arm, rows: (typeof opts.arm === 'function' ? opts.arm : armRows)(rows, a.arm) }; rows = a._arm.rows; }
      if (pose === 'ko') { if (!a._rot || a._rot.src !== rows) a._rot = { src: rows, rows: rotRows(rows) }; return a._rot.rows; }
      if (pose === 'sit') { if (!a._sit || a._sit.src !== rows) a._sit = { src: rows, rows: rows.slice(0, 12) }; return a._sit.rows; }
      return rows;
    }
    // 一個小人這一格的點陣圖：{ cv, ax, ay（腳底中點）, s（美術格/點陣格）}
    function lookOf(a, pose, variant) {
      if (a.spec) { var cp = charPose(a, pose), b = charBitmap(a, cp[0], cp[1], a.flip, variant); if (b) return b; }
      var rows = rowsForPose(a, pose); if (!rows) return null;
      var bm = rowsBitmap(rows, pose === 'ko' ? (a.fwd || 1) > 0 : a.flip, variant);
      if (pose === 'ko') return { cv: bm.cv, ax: 8 * KS + 1, ay: 12 * KS + 1, s: 1 };
      if (pose === 'sit') return { cv: bm.cv, ax: bm.ax, ay: 12 * KS + 1, s: 1 };
      return bm;
    }
    function blitLook(b, fx, fy) { P.img(b.cv, fx - b.ax * b.s, fy - b.ay * b.s, b.cv.width * b.s, b.cv.height * b.s); }
    // 手的位置（場景座標）：拿封套、唱片、大金盤、旗都畫在這裡；stage.js 的 clash() 也用它算出手點
    function handAt(id, kind) {
      var a = actors[id]; if (!a) return null;
      kind = kind || a.arm || 'none';
      var base = [Math.round(a.x) + (a.ox || 0), Math.round(a.y)];
      if (a.spec) {
        var CH = charsApi();
        try {
          if (CH && typeof CH.anchor === 'function') {
            var art = artMode(), sc = art ? 3 : 1, cp = (CH.ARM && CH.ARM[kind]) || ['idle', 0], an = CH.anchor(a.spec, cp[0], cp[1], kind === 'none' ? 'handN' : 'held', { flip: !!a.flip, scale: sc }) || CH.anchor(a.spec, cp[0], cp[1], 'handN', { flip: !!a.flip, scale: sc });
            if (an) { var s = art ? 1 : cScale(); return [base[0] + an[0] * s, base[1] + an[1] * s]; }
          }
        } catch (_) {}
      }
      var hp = HANDAT[kind] || HANDAT.none, col = a.flip ? 15 - hp[0] : hp[0];
      return [base[0] - 8 * KS + col * KS + (KS >> 1), base[1] - 15 * KS + hp[1] * KS + (KS >> 1)];
    }
    function drawActor(a, inOutside) {
      if (!hasLook(a)) return;
      var pose = inOutside ? null : poseOf(a), K = KS, ox = 0, oy = 0;
      var walkBob = a.moving && !a.spec ? (Math.floor(state.t * 8) % 2) * K : 0;
      if (pose === 'atk') ox = 2 * (a.fwd || 1) * K;
      else if (pose === 'hurt') ox = -(a.fwd || 1) * K;
      else if (pose === 'dig' && !a.spec) oy = (Math.floor(state.t * 8) % 2) * K;
      else if (pose === 'busy') oy = (Math.floor(state.t * 3) % 2) * K;
      var fx = Math.round(a.x) + ox + (a.ox || 0), fy = Math.round(a.y) + (a.dy || 0);
      var silV = a.sil || inOutside === 'sil' ? 'sil' : null;
      if (!inOutside && !a.sil) P.a(0.38, function () { P.ell(fx, fy - 0.5, pose === 'ko' ? 20 : 11, 2.2, '#140a04'); });
      var b = lookOf(a, pose, silV); if (!b) return;
      var by = fy + oy - walkBob;
      if (pose === 'warn' && !silV && Math.floor(state.t * 4) % 2 === 0) { var g = lookOf(a, pose, 'gold'); if (g) [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (d) { blitLook(g, fx + d[0], by + d[1]); }); }
      blitLook(b, fx, by);
      if (pose === 'hurt' && !silV && Math.floor((state.rt - (a.poseAt || 0)) * 10) % 2 === 0) { var rd = lookOf(a, pose, 'red'); if (rd) blitLook(rd, fx, by); }
      // 站著偶爾眨眼（只有 16×16 小人；DipLabChars 自己有 idle 兩格）
      if (!a.spec && !a.moving && !silV && !pose && a.rows && a.rows[4] && Math.floor(state.t * 10 + a.phase * 7) % 34 === 0) {
        var r4 = a.rows[4], r3 = a.rows[3] || ''; for (var i = 0; i < r4.length; i++) if (r4.charAt(i) === 'k' && r3.charAt(i) !== 'k') P.r(fx - 8 * K + (a.flip ? r4.length - 1 - i : i) * K, by - 15 * K + 4 * K, K, K, spritePal.s || '#e8b48c');
      }
      if (a.hold && !silV) { var hd = opts.holdDraw || O34.HOOKS.holdDraw, hp = handAt(a.id); if (typeof hd === 'function' && hp) hd(P, a, hp[0] + ox, hp[1] + oy - walkBob, S); }
      if (a.emote && (!a.emoteUntil || state.rt < a.emoteUntil)) {
        var kk = a.emote; if (kk === 'anger' && Math.floor(state.t * 4) % 2) kk = 'angerB';
        var er = EMOTE[kk];
        if (er) {
          var ew = er[0].length * KE, ex = fx + 5 * K - Math.floor(ew / 2), ey = fy - a.head - er.length * KE - KE + (Math.floor(state.t * 3) % 2) * KE;
          if (tagOn(a.id)) { ex = fx + (a.fwd || 1) * 9 * K - Math.floor(ew / 2); ey = fy - a.head + K + (Math.floor(state.t * 3) % 2) * KE; }
          if (kk === 'anger' || kk === 'angerB') P.rows(er, ex + 1, ey + 1, null, KE, { sil: 'rgba(17,17,17,0.7)' });
          else [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (d) { P.rows(er, ex + d[0], ey + d[1], null, KE, { sil: '#ffffff' }); });
          P.rows(er, ex, ey, { r: '#e0303f', k: '#111111', c: '#3fb6c9', d: '#888888', w: '#ffffff' }, KE);
        }
      } else if (a.emote) a.emote = null;
    }

    // ---------------- 熱點（SPEC-v4 §2.4：buildHotList＝看得到的形狀＋深度；hots＝可以點的，hitList＝再加遮擋物，給 hitPick）
    var hitList = [];
    function propBoxO(o) { var sp = OP[o.type]; return (sp && sp.box) ? sp.box(o) : [o.x || 0, (o.y || 0) - (o.h || 8), o.w || 8, o.h || 8]; }
    function actorView(id) { var a = actors[id]; return a ? { x: a.x, y: a.y, hidden: a.hidden, outside: a.outside, look: hasLook(a) } : null; }
    function buildHots() {
      hitList = buildHotList(L, OP, Object.assign(Object.create(S), { actor: actorView }));
      hots = hitList.filter(function (h) { return !h.occluder; });
    }
    function syncFollow() {
      hots.forEach(function (h) { if (h.follow) followHot(h, actorView(h.follow), KS); });
    }
    function enabled(h) { return !h.occluder && !h.disabled && !h.gone && (!allowFn || allowFn(h)); }
    function syncHots() { syncFollow(); hitList.forEach(function (h) { h.enabled = enabled(h); }); }
    function slopR() { return Math.max(L.fat || 6, Math.ceil(22 / (scale || 1))); }
    function hitTest(x, y) { syncHots(); return hitPick(hitList, x, y, { r: slopR() }); }
    // 這個熱點在目前鏡頭裡看得到的那一塊（不在任何更前面的形狀裡）
    function visRegion(h) { syncFollow(); return hotRegion(hitList, h, [0, vy, W, vh]); }
    function hotById(id) { for (var i = 0; i < hots.length; i++) if (hots[i].id === id) return hots[i]; return null; }

    // ---------------- 快取：地板＋後牆（bg）、每個靜態道具一張點陣圖（自己的外框）、打光兩張
    function withTarget(ctx, cx, cy, fn) {
      var s = { ctx: T.ctx, cx: T.cx, cy: T.cy, used: T.used };
      T.ctx = ctx; T.cx = cx; T.cy = cy; ctx.imageSmoothingEnabled = false;
      try { fn(); } finally { T.ctx = s.ctx; T.cx = s.cx; T.cy = s.cy; T.used = s.used; }
    }
    function layerOf(o) { return o.layer || (OP[o.type] && OP[o.type].layer) || 'stand'; }
    function isDyn(o) { return !!(o.dyn || (OP[o.type] && OP[o.type].dyn)); }
    function drawProp(o) { var sp = OP[o.type]; if (sp && sp.draw) { try { sp.draw(P, o, S); } catch (e) { console.error(e); } } }
    function paintEntry(en) {
      var c = en.cv.getContext('2d'); c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, en.cv.width, en.cv.height);
      en.used = {};
      withTarget(c, en.x, en.y, function () { T.used = en.used; if (en.bg) en.bg.forEach(drawProp); else drawProp(en.p); });
      en.dirty = false;
    }
    function buildCache() {
      var t0 = now(), Wd = W, Hd = H;
      cache = { k: k, entries: [], wall: [], stand: [], bytes: 0 };
      var bgList = (L.props || []).filter(function (o) { return !o.hidden && OP[o.type] && layerOf(o) === 'bg'; });
      var bg = { bg: bgList, x: 0, y: 0, cv: document.createElement('canvas'), used: {} };
      bg.cv.width = Math.round(Wd * k); bg.cv.height = Math.round(Hd * k);
      paintEntry(bg); cache.bg = bg; cache.entries.push(bg); cache.bytes += bg.cv.width * bg.cv.height * 4;
      (L.props || []).forEach(function (o) {
        if (o.hidden || !OP[o.type]) return;
        var ly = layerOf(o); if (ly === 'bg' || ly === 'fx') return;
        var item = { p: o, y: o.y != null ? o.y : 0 };
        if (!isDyn(o)) {
          T.meas = [1e9, 1e9, -1e9, -1e9]; drawProp(o); var m = T.meas; T.meas = null;
          if (m[2] > m[0]) {
            var bx = Math.floor(m[0]) - 1, by = Math.floor(m[1]) - 1, bw = Math.ceil(m[2]) - bx + 1, bh = Math.ceil(m[3]) - by + 1;
            var en = { p: o, x: bx, y: by, cv: document.createElement('canvas'), used: {} };
            en.cv.width = Math.max(1, Math.ceil(bw * k) + 1); en.cv.height = Math.max(1, Math.ceil(bh * k) + 1);
            paintEntry(en); cache.entries.push(en); cache.bytes += en.cv.width * en.cv.height * 4; item.en = en;
          }
        }
        (ly === 'wall' ? cache.wall : cache.stand).push(item);
      });
      bakeLight();
      cache.ms = now() - t0;
    }
    function refreshDirty() { if (cache) cache.entries.forEach(function (en) { if (en.dirty) paintEntry(en); }); }
    // 打光：乘（暖色環境光＋暗角，量化成 6 階＋有序網點）＋濾色（燈池）。都在美術格解析度算，最近鄰放大（像素光）
    function bakeLight() {
      var lt = L.light || {};
      if (lt.off) { cache.mul = cache.scr = null; return; }
      var w = W, h = H, Bw = Math.round(W * k), Bh = Math.round(H * k);
      var lc = document.createElement('canvas'); lc.width = w; lc.height = h;
      var g = lc.getContext('2d');
      g.fillStyle = lt.ambient || '#fff6ea'; g.fillRect(0, 0, w, h);
      var rg = g.createRadialGradient(w * 0.52, h * 0.5, 40, w * 0.52, h * 0.55, h * 0.78);
      rg.addColorStop(0, 'rgba(255,248,236,0)'); rg.addColorStop(1, lt.vignette || 'rgba(120,88,60,0.55)');
      g.fillStyle = rg; g.fillRect(0, 0, w, h);
      try {
        var id = g.getImageData(0, 0, w, h), d = id.data, B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
        for (var yy = 0; yy < h; yy++) for (var xx = 0; xx < w; xx++) { var i = (yy * w + xx) * 4, t = (B4[(yy & 3) * 4 + (xx & 3)] / 16 - 0.5) * 10; for (var c = 0; c < 3; c++) d[i + c] = Math.max(0, Math.min(255, Math.round((d[i + c] + t) / 10) * 10)); }
        g.putImageData(id, 0, 0);
      } catch (_) {}
      var mul = document.createElement('canvas'); mul.width = Bw; mul.height = Bh;
      var mc = mul.getContext('2d'); mc.imageSmoothingEnabled = false; mc.drawImage(lc, 0, 0, w, h, 0, 0, Bw, Bh);
      var scr = document.createElement('canvas'); scr.width = Bw; scr.height = Bh;
      var sc = scr.getContext('2d'); sc.fillStyle = '#000'; sc.fillRect(0, 0, Bw, Bh); sc.globalCompositeOperation = 'lighter'; sc.imageSmoothingEnabled = false;
      var pools = (lt.pools || []).slice();
      (L.props || []).forEach(function (o) { var sp = OP[o.type]; if (sp && sp.lights && !o.hidden) pools = pools.concat(sp.lights(o, S) || []); });
      var pc = document.createElement('canvas'); pc.width = w; pc.height = h; var q = pc.getContext('2d');
      pools.forEach(function (p) {
        q.setTransform(1, 0, 0, 1, 0, 0); q.clearRect(0, 0, w, h);
        q.translate(p[0], p[1]); q.scale(1, p[3] / p[2]);
        var gg = q.createRadialGradient(0, 0, 0, 0, 0, p[2]); gg.addColorStop(0, p[4]); gg.addColorStop(1, 'rgba(0,0,0,0)');
        q.fillStyle = gg; q.beginPath(); q.arc(0, 0, p[2], 0, Math.PI * 2); q.fill();
        sc.globalAlpha = p[5] == null ? 0.15 : p[5]; sc.drawImage(pc, 0, 0, w, h, 0, 0, Bw, Bh); sc.globalAlpha = 1;
      });
      cache.mul = mul; cache.scr = scr; cache.bytes += 2 * Bw * Bh * 4;
    }

    // ---------------- 一格畫面
    var bw = 1, bh = 1;
    function render() {
      if (destroyed) return;
      T.k = k; T.meas = null;
      if (!cache || cache.k !== k) buildCache(); else refreshDirty();
      var ctx = vctx; T.ctx = ctx; T.k = k; T.cx = 0; T.cy = vy; T.meas = null; T.used = null;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.imageSmoothingEnabled = false;
      var sy = Math.round(vy * k), sh = Math.min(bh, cache.bg.cv.height - sy);
      ctx.fillStyle = '#1a120c'; ctx.fillRect(0, 0, bw, bh);
      ctx.drawImage(cache.bg.cv, 0, sy, bw, sh, 0, 0, bw, sh);
      cache.wall.forEach(function (it) { if (it.en) ctx.drawImage(it.en.cv, P.X(it.en.x), P.Y(it.en.y)); else if (isDyn(it.p)) drawProp(it.p); });
      var objs = cache.stand.map(function (it) { return { y: it.y, o: 0, it: it }; });
      Object.keys(actors).forEach(function (id, i) { var a = actors[id]; if (!a.hidden && !a.outside && hasLook(a)) objs.push({ y: a.y + (a.zb || 0), o: 1 + i * 0.001, a: a }); });
      objs.sort(function (A, B) { return A.y - B.y || A.o - B.o; });
      objs.forEach(function (e) {
        if (e.a) drawActor(e.a, false);
        else if (e.it.en) ctx.drawImage(e.it.en.cv, P.X(e.it.en.x), P.Y(e.it.en.y));
        else if (isDyn(e.it.p)) drawProp(e.it.p);
      });
      (L.props || []).forEach(function (o) { if (!o.hidden && layerOf(o) === 'fx') drawProp(o); });
      if (cache.mul && !state.noLight) {
        ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.drawImage(cache.mul, 0, sy, bw, sh, 0, 0, bw, sh);
        ctx.globalCompositeOperation = 'screen'; ctx.drawImage(cache.scr, 0, sy, bw, sh, 0, 0, bw, sh); ctx.restore();
      }
      if (state.dim < 1) { ctx.fillStyle = 'rgba(8,5,3,' + (1 - state.dim).toFixed(3) + ')'; ctx.fillRect(0, 0, bw, bh); }
      (L.props || []).forEach(function (o) { var sp = OP[o.type]; if (sp && sp.glow && !o.hidden) { try { sp.glow(P, o, S); } catch (e) { console.error(e); } } });
      drawFocus();
    }
    // 選取外框、教學聚光、今晚亮金框、提示星
    function frame(r, c1, c2, ph) {
      for (var i = -1; i <= r[2]; i++) { var c = ((i + ph) & 2) ? c2 : c1; P.p(r[0] + i, r[1] - 1, c); P.p(r[0] + i, r[1] + r[3], c); }
      for (var j = 0; j < r[3]; j++) { var d = ((j + ph) & 2) ? c2 : c1; P.p(r[0] - 1, r[1] + j, d); P.p(r[0] + r[2], r[1] + j, d); }
    }
    // 熱點看得到的那一塊的外框（快取在 h._ol：鏡頭、跟著人走的位置變了才重算）
    function outlineVis(h, c1, c2, ph) {
      var key = vy + ',' + vh + ',' + h.rect.join(',');
      if (!h._ol || h._olKey !== key) { syncFollow(); h._ol = regionOutline(hotRegion(hitList, h, [0, vy, W, vh], true)); h._olKey = key; if (!h._ol.length) h._ol = null; }
      if (!h._ol) { h.shape.forEach(function (r) { frame(r, c1, c2, ph); }); return; }
      h._ol.forEach(function (p) { P.p(p[0], p[1], ((p[0] + p[1] + ph) & 2) ? c2 : c1); });
    }
    function drawFocus() {
      var t = state.t;
      syncFollow();
      if (state.spot) {
        var r = state.spot.h.rect, pad = 2, x0 = r[0] - pad, y0 = r[1] - pad, x1 = r[0] + r[2] + pad, y1 = r[1] + r[3] + pad;
        P.a(0.62, function () { P.r(0, 0, W, Math.max(0, y0), '#08060c'); P.r(0, y1, W, H - y1, '#08060c'); P.r(0, y0, Math.max(0, x0), y1 - y0, '#08060c'); P.r(x1, y0, W - x1, y1 - y0, '#08060c'); });
        frame(r, '#ffffff', '#f0c75e', Math.floor(t * 6) * 2);
        var hx = Math.round(state.spot.h.cx) - 4 * KE, hy = r[1] + r[3] + KE + (Math.floor(t * 3) % 2) * KE;
        if (hy + 9 * KE > H) hy = r[1] - 10 * KE - (Math.floor(t * 3) % 2) * KE;
        P.rows(HAND, hx, hy, { k: '#111111', w: '#ffffff', s: '#f6dcc4' }, KE);
      }
      if (state.hi.length) {
        var on = Math.floor(t * 2.5) % 2, ph = Math.floor(t * 4) * 2;
        state.hi.forEach(function (g) { g.hots.forEach(function (h) { frame(h.rect, on ? '#ffd75e' : '#fff1c2', 'rgba(0,0,0,0)', ph); }); });
      }
      var show = [];
      if (state.flash && state.rt < state.flash.until && state.flash.h !== (state.press && state.press.h)) show.push(state.flash.h);
      if (state.hover) show.push(state.hover);
      if (state.reveal > state.rt) hots.forEach(function (h) { if (enabled(h) && (!h.sub || h._rv)) show.push(h); });
      show.forEach(function (h) { if (h) outlineVis(h, '#ffffff', '#f0c75e', Math.floor(t * 6) * 2); });
      // 按下去（pointerdown）就描金框，直到放開或 900 ms（SPEC-v4 §2.4.3）；描「看得到的那一塊」的外圍，被前面的箱子擋住的部分不描
      if (state.press && state.rt < state.press.until) outlineVis(state.press.h, '#ffcf3a', '#ffcf3a', 0);
      if (!state.spot && sparkleOn && hots.length) {
        var cyc = Math.floor(t / 3.2), p2 = t - cyc * 3.2;
        if (p2 < 0.55) {
          var main = hots.filter(function (h) { return !h.sub && !h.noSparkle && enabled(h) && h.rect[1] + h.rect[3] > vy && h.rect[1] < vy + vh; });
          var hh = main[cyc % (main.length || 1)];
          if (hh) { var sx = hh.rect[0] + hh.rect[2] - 2, sy2 = hh.rect[1] + 1, big = p2 > 0.15 && p2 < 0.4; P.p(sx, sy2, '#ffffff'); if (big) { P.p(sx - 1, sy2, '#f0c75e'); P.p(sx + 1, sy2, '#f0c75e'); P.p(sx, sy2 - 1, '#f0c75e'); P.p(sx, sy2 + 1, '#f0c75e'); } }
        }
      }
    }

    // ---------------- 尺寸與鏡頭
    function dprNow() { return (typeof devicePixelRatio === 'number' && devicePixelRatio > 0) ? devicePixelRatio : 1; }
    function baseDev() { var hw = host.clientWidth || hostW || 390, dpr = dprNow(); return Math.max(0.5, Math.min((opts.maxScale || L.maxScale || 1.5) * dpr, hw * dpr / W)); }
    function fit() {
      hostW = host.clientWidth || hostW || 390;
      var dpr = dprNow(), dev = baseDev();
      if (cam.dev) dev = Math.min(dev, cam.dev);
      k = dev; scale = k / dpr; T.k = k;
      vy = clamp(Math.round(cam.y), 0, H - 1); vh = clamp(Math.round(cam.h), 1, H - vy);
      bw = Math.round(W * k); bh = Math.round(vh * k);
      if (view.width !== bw) view.width = bw;
      if (view.height !== bh) view.height = bh;
      var cssW = bw / dpr, cssH = bh / dpr;
      view.style.width = cssW + 'px'; view.style.height = cssH + 'px';
      if (opts.sizeHost !== false) host.style.height = cssH + 'px';
      overlay.style.width = cssW + 'px'; overlay.style.height = cssH + 'px';
      overlay.style.left = Math.round((hostW - cssW) / 2) + 'px'; overlay.style.top = '0px';
      host.style.setProperty('--ds-scale', scale);
      render();
      layoutOverlay();
    }
    function setView(v) { if (v.y != null) cam.y = v.y; if (v.h != null) cam.h = v.h; if (v.dev !== undefined) cam.dev = v.dev; fit(); }
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
    function toCss(x, y) { return { x: x * scale, y: (y - vy) * scale }; }
    function hostCss(x, y) { var p = toCss(x, y); return { x: p.x + (parseFloat(overlay.style.left) || 0), y: p.y }; }
    function fromEvent(ev) { var r = view.getBoundingClientRect(); return { x: Math.floor((ev.clientX - r.left) / scale), y: Math.floor((ev.clientY - r.top) / scale) + vy }; }
    function rectToScreen(r, clip) {
      if (clip !== false) {   // 在畫面裡露出一部分：只回看得到的那一塊（中心點一定點得到）
        var x0 = Math.max(r[0], 0), y0 = Math.max(r[1], vy), x1 = Math.min(r[0] + r[2], W), y1 = Math.min(r[1] + r[3], vy + vh);
        if (x1 > x0 && y1 > y0) r = [x0, y0, x1 - x0, y1 - y0];
      }
      var b = view.getBoundingClientRect(), x = b.left + r[0] * scale, y = b.top + (r[1] - vy) * scale, w = r[2] * scale, h = r[3] * scale;
      try { return new DOMRect(x, y, w, h); } catch (_) { return { x: x, y: y, left: x, top: y, width: w, height: h, right: x + w, bottom: y + h }; }
    }

    // ---------------- DOM 疊層（文字一律 DOM）
    var marks = [];
    function addMark(m) { marks.push(m); overlay.appendChild(m.el); m.place(); return m; }
    function dropMarks(f) { marks = marks.filter(function (m) { if (f(m)) { m.el.remove(); return false; } return true; }); }
    function layoutOverlay() { marks.forEach(function (m) { try { m.place(); } catch (_) {} }); }
    function tagOn(id) { for (var i = 0; i < marks.length; i++) if (marks[i].kind === 'tag' && marks[i].id === id && marks[i].lr === 'T') return true; return false; }
    function sideShift(el, px) { var w = el.offsetWidth, ow = overlay.clientWidth || W * scale, left = px - w / 2; return left < 2 ? 2 - left : left + w > ow - 2 ? (ow - 2) - (left + w) : 0; }
    function labelFor(h, cls, ms) {
      var d = document.createElement('div'); d.className = 'ds-label' + (cls ? ' ' + cls : ''); d.textContent = h.label || '';
      return addMark({ el: d, kind: 'label', h: h, until: ms ? state.rt + ms / 1000 : 0, place: function () {
        var r = h.rect, la = h.labelAt, p = la ? toCss(la[0], la[1]) : toCss(r[0] + r[2] / 2, Math.max(r[1], vy)), below = p.y < 26;
        if (below) p = toCss(r[0] + r[2] / 2, r[1] + r[3]);
        d.style.left = p.x + 'px'; d.style.top = p.y + 'px'; d.classList.toggle('below', below);
        d.style.setProperty('--shift', sideShift(d, p.x) + 'px');
      } });
    }
    function bubbleFor(id, text, o) {
      var el = document.createElement('div'); el.className = 'ds-say' + (o.tone ? ' ' + o.tone : ''); el.textContent = text;
      return addMark({ el: el, kind: 'say', id: id, place: function () {
        var a = actors[id]; if (!a) return;
        var head = a.y - a.head - (o.lift || 0) - (tagOn(id) ? 20 / scale : 0), p = toCss(a.x, head), bh2 = el.offsetHeight || 24;
        if (a.hidden) { el.style.display = 'none'; return; } el.style.display = '';
        if (vh <= 120) {
          // 唱盤區橫條（strip／stripS，SPEC-v4 §2.3.7）：泡泡避開中間（唱盤與站在台後的老闆，老闆 x±16 格）。
          // 說話的人在哪半邊，泡泡中心就夾在那半邊：左 [4+w/2, mid−ownerHalf−6−w/2]、右 [mid+ownerHalf+6+w/2, ow−4−w/2]；寬 ≤ mid−ownerHalf−10。
          // 頭頂放得下就放頭頂，放不下就貼在橫條頂上、尾巴朝下指他。老闆（站中間）照舊置中。會蓋到自己的名牌，沒關係（尾巴已經說是誰）
          var ow0 = overlay.clientWidth || W * scale, mid = ow0 / 2, ax0 = a.x * scale, ctr = Math.abs(ax0 - mid) < ow0 * 0.12, oh = 16 * scale;
          el.classList.remove('side', 'sl', 'sr');
          el.style.maxWidth = Math.floor(ctr ? ow0 * 0.62 : mid - oh - 10) + 'px';
          var w0 = el.offsetWidth, h0 = el.offsetHeight || 24;
          var lo = ctr ? 4 + w0 / 2 : (ax0 < mid ? 4 + w0 / 2 : mid + oh + 6 + w0 / 2), hi = ctr ? ow0 - 4 - w0 / 2 : (ax0 < mid ? mid - oh - 6 - w0 / 2 : ow0 - 4 - w0 / 2);
          var sh0 = clamp(p.x, lo, Math.max(lo, hi)) - p.x;
          el.style.left = p.x + 'px'; el.style.top = (p.y - h0 - 8 < 0 ? h0 + 4 + 7 : p.y) + 'px';
          el.style.setProperty('--shift', sh0 + 'px'); el.style.setProperty('--tail', (-sh0) + 'px');
          return;
        }
        el.style.maxWidth = '';
        if (p.y - bh2 - 8 < 0) {   // 頭頂放不下 → 放在身體旁邊
          var right = toCss(a.x + 8 * KS, a.y - 10 * KS), left = toCss(a.x - 8 * KS, a.y - 10 * KS), ow = overlay.clientWidth || W * scale, w = el.offsetWidth;
          var useRight = right.x + 6 + w <= ow - 2 || left.x - 6 - w < 2;
          el.classList.add('side'); el.classList.toggle('sl', !useRight); el.classList.toggle('sr', useRight);
          var top = clamp(right.y, bh2 / 2 + 2, (vh * scale) - bh2 / 2 - 2);
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
    // 按下：命中就立刻描框（不等 click、不等下一格；SPEC-v4 §2.4.3）
    function onDown(ev) {
      var p = fromEvent(ev), h = hitTest(p.x, p.y);
      down = { x: p.x, y: p.y, h: h, t: now() };
      state.press = h ? { h: h, until: state.rt + 0.9 } : null;
      if (h) { try { render(); } catch (e) { console.error(e); } }
    }
    function unpress() { if (state.press) { state.press = null; try { render(); } catch (_) {} } }
    function onUp(ev) {
      if (!down) return; var p = fromEvent(ev), h = hitTest(p.x, p.y), d0 = down; down = null;
      unpress();
      var tol = L.tapTol || 10;
      if (!h || h !== d0.h || Math.abs(p.x - d0.x) > tol || Math.abs(p.y - d0.y) > tol) return;
      if (state.spot && state.spot.h !== h) { bump(); return; }
      tapHot(h);
    }
    function onMove(ev) {
      if (ev.pointerType !== 'mouse') return;
      var p = fromEvent(ev), h = hitTest(p.x, p.y);
      if (h !== state.hover) { state.hover = h; dropMarks(function (m) { return m.hover; }); if (h) labelFor(h, 'hover').hover = true; view.style.cursor = h ? 'pointer' : 'default'; }
    }
    function onLeave() { state.hover = null; dropMarks(function (m) { return m.hover; }); }
    function bump() { host.classList.remove('ds-bump'); void host.offsetWidth; host.classList.add('ds-bump'); }
    function tapHot(h) {
      state.flash = { h: h, until: state.rt + 0.9 };
      if (h.prop && h.prop.id) state.poke[h.prop.id] = state.rt + 1.6;
      if (h.id) state.poke[h.id] = state.rt + 1.6;
      dropMarks(function (m) { return m.tapLbl; }); labelFor(h, 'tap', 1100).tapLbl = true;
      if (state.spot && state.spot.h === h) { var cb = state.spot.done; api.spotlight(null); if (cb) cb(h); }
      if (opts.onAction) { try { opts.onAction(h.action, h); } catch (e) { console.error(e); } }
    }
    view.addEventListener('pointerdown', onDown);
    view.addEventListener('pointerup', onUp);
    view.addEventListener('pointermove', onMove);
    view.addEventListener('pointerleave', onLeave);
    view.addEventListener('pointercancel', function () { down = null; unpress(); });
    // 手機 Chrome 的「觸控調整」（touch adjustment）只把有 click／mouse 監聽的元素當成點得到的目標：畫布只有 pointer 監聽時，
    // 點在舞台上緣附近會被吸到頂列的「捏角色」連結（e2e-taps 375×548 抓到）。掛一個空的 click 讓畫布自己就是點擊目標。
    view.addEventListener('click', function () {});

    // ---------------- 迴圈（10 fps；唱盤區演出時每個 rAF 都畫）；分頁藏起來時停
    var last = 0, raf = 0, t0 = now(), fixedT = opts.fixedTime, tPaused = 0, fastN = 0, ticks = [];
    function loop(ts) {
      if (destroyed) return;
      raf = requestAnimationFrame(loop);
      if (!fastN && ts - last < 95) return; var dt = Math.min(0.2, (ts - last) / 1000); last = ts;
      state.rt = (now() - t0 - tPaused) / 1000; state.t = fixedT != null ? fixedT : state.rt; state.frame++;
      for (var ti = 0; ti < ticks.length; ti++) { try { ticks[ti](state.rt, dt); } catch (e) { console.error(e); } }
      stepActors(dt);
      syncListen();
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
    var OBS = null;
    function spotXY(key) {
      if (Array.isArray(key)) return { x: key[0], y: key[1], outside: !!key[2] };
      if (key && typeof key === 'object' && key.x != null) return { x: key.x, y: key.y, outside: !!key.outside };
      var sp = (L.spots || {})[key];
      if (!sp && typeof opts.resolveSpot === 'function') sp = opts.resolveSpot(key);
      if (!sp) return null;
      return { x: sp[0], y: sp[1], outside: !!sp[2] };
    }
    function spotName(k) { return typeof k === 'string' ? k : Array.isArray(k) ? '[' + k.slice(0, 2).join(',') + ']' : (k && k.x != null) ? '[' + k.x + ',' + k.y + ']' : String(k); }
    // 每一段之間有家具就沿路點繞過去（門外那段直走）。走不到（navRoute 回 null，SPEC-v4 §2.4.5）：
    //   嚴格模式（DipShop.strict；Node 測試、harness、e2e 的 ?strict=1）丟錯；執行期繞最近的 nav 點、再不行直線走（console.warn），絕不瞬移
    function routed(a, targets, id) {
      var out = [], cur = [a.x, a.y], curOut = a.outside, curName = a.at != null ? a.at : spotName(cur);
      targets.forEach(function (tg) {
        if (!tg) return;
        if (!tg.outside && !curOut && L.nav) {
          if (!OBS) OBS = navObstacles(L);
          var r = navRoute(L, cur, [tg.x, tg.y], OBS);
          if (!r) {
            var msg = '[shop] no route ' + id + ' ' + curName + '→' + tg.name;
            if (EXPORTS.strict) throw new Error(msg);
            var fb = navFallback(L, cur, [tg.x, tg.y], OBS); r = fb.pts;
            console.warn(msg + (fb.how === 'detour' ? '（繞最近的路點走）' : '（直線走過去）'));
          }
          r.forEach(function (q, i, arr) { out.push(i === arr.length - 1 ? tg : { x: q[0], y: q[1], outside: false, via: true }); });
        }
        else out.push(tg);
        cur = [tg.x, tg.y]; curOut = tg.outside; curName = tg.name;
      });
      return out;
    }
    function stepActors(dt) {
      var kk = spd();
      Object.keys(actors).forEach(function (id) {
        var a = actors[id]; if (!a.path || !a.path.length) return;
        var tgt = a.path[0], dx = tgt.x - a.x, dy = tgt.y - a.y, dist = Math.sqrt(dx * dx + dy * dy), sp = (a.speed || 36) * (L.walkK || 2) * dt * kk;
        a.moving = true; if (Math.abs(dx) > 0.5 && !a.hold && !a.arm) a.flip = dx < 0;   // 手上拿著東西（對決的封套）就不轉身
        if (dist <= sp) { a.x = tgt.x; a.y = tgt.y; a.outside = tgt.outside; a.path.shift(); if (!a.path.length) { a.moving = false; var r = a.res; a.res = null; if (r) r(); } }
        else { a.x += dx / dist * sp; a.y += dy / dist * sp; if (tgt.outside !== a.outside && dist < 6 * KS) a.outside = tgt.outside; }
      });
    }

    // 試聽桌：有人停在 listen 點 → 桌邊掛著的耳機戴到他頭上（只有 DipLabChars 的小人）；走開就掛回桌邊
    function syncListen() {
      var sp = L.spots && L.spots.listen; if (!sp) return;
      var any = false;
      Object.keys(actors).forEach(function (id) {
        var a = actors[id], on = !!(a.spec && !a.hidden && !a.outside && !a.moving && Math.abs(a.x - sp[0]) <= 3 && Math.abs(a.y - sp[1]) <= 3);
        if (on) any = true; a.phones = on;
      });
      if (any !== !!state.listenInUse) { state.listenInUse = any; if (cache) cache.entries.forEach(function (en) { if (en.p && en.p.type === 'listenDesk') en.dirty = true; }); }
    }

    // ---------------- 公開 API（跟格子版 DipShop 一樣）
    var api = {
      layout: L, world: null, canvas: view, overlay: overlay, host: host, state: state, oblique: true,
      put: function (id, key, spr) {
        var a = actor(id), p = spotXY(key); if (spr != null) setLook(a, spr);
        if (p) { a.x = p.x; a.y = p.y; a.outside = p.outside; a.at = spotName(key); if (a.res) { var r = a.res; a.res = null; r(); } a.path = null; a.moving = false; a.hidden = false; }
        layoutOverlay(); return api;
      },
      sprite: function (id, spr) { setLook(actor(id), spr); return api; },
      hide: function (id, on) { actor(id).hidden = on !== false; layoutOverlay(); return api; },
      sil: function (id, on) { actor(id).sil = !!on; return api; },
      has: function (id) { var a = actors[id]; return !!(a && !a.hidden && hasLook(a)); },
      pos: function (id) { var a = actors[id]; return a ? { x: a.x, y: a.y, outside: a.outside, hidden: a.hidden } : null; },
      walk: function (id, keys, speed) {
        var a = actor(id); a.hidden = false;
        if (a.res) { var r0 = a.res; a.res = null; r0(); }
        var tgs = [].concat(keys).map(function (k) { var p = spotXY(k); if (p) p.name = spotName(k); return p; }).filter(Boolean);
        try { a.path = routed(a, tgs, id); }
        catch (e) { a.path = null; a.moving = false; console.error(e.message); return Promise.reject(e); }   // 嚴格模式：walk 的 Promise reject，人不動
        if (tgs.length) a.at = tgs[tgs.length - 1].name;
        if (speed) a.speed = speed;
        return new Promise(function (res) { if (!a.path.length) { a.moving = false; res(); return; } a.res = res; });
      },
      // 舊呼叫端 [at].concat(shop.route(...)) 不會壞：走不到回 []（不回 null，SPEC-v4 §2.4.5）
      route: function (from, to) { var A = spotXY(from), B = spotXY(to); if (!A || !B) return []; if (!OBS) OBS = navObstacles(L); return navRoute(L, [A.x, A.y], [B.x, B.y], OBS) || []; },
      face: function (id, fwd) { actor(id).fwd = fwd; return api; },
      arm: function (id, kind) { actor(id).arm = kind || null; return api; },
      hold: function (id, what) { actor(id).hold = what || null; return api; },
      nudge: function (id, dx) { actor(id).ox = dx || 0; return api; },
      flip: function (id, on) { actor(id).flip = !!on; return api; },
      handAt: handAt,
      headY: function (id) { var a = actors[id]; return a ? a.y - a.head : null; },
      fast: function (on) { fastN = Math.max(0, fastN + (on ? 1 : -1)); return api; },
      onTick: function (fn) { ticks.push(fn); return function () { ticks = ticks.filter(function (f) { return f !== fn; }); }; },
      tick: function () { state.rt = (now() - t0 - tPaused) / 1000; if (fixedT == null) state.t = state.rt; ticks.forEach(function (f) { try { f(state.rt, 0); } catch (e) { console.error(e); } }); render(); layoutOverlay(); return api; },
      now: function () { return (now() - t0 - tPaused) / 1000; },
      pose: function (id, name, ms) { var a = actor(id); a.pose = name || null; a.poseAt = state.rt; a.poseUntil = (name && ms) ? state.rt + ms / 1000 / spd() : 0; return api; },
      emote: function (id, kind, ms) { var a = actor(id); a.emote = kind || null; a.emoteUntil = (kind && ms) ? state.rt + ms / 1000 : 0; return api; },
      say: function (id, text, o) {
        o = o || {};
        dropMarks(function (m) { return m.kind === 'say' && m.id === id; });
        if (!text) return null;
        var m = bubbleFor(id, text, o), ms = o.ms == null ? 2600 : o.ms;
        if (ms) setTimeout(function () { dropMarks(function (x) { return x === m; }); }, ms / spd());
        return m.el;
      },
      tag: function (id, text, side, lr) {
        if (L.tagTop) lr = 'T';
        dropMarks(function (m) { return m.kind === 'tag' && m.id === id; });
        if (!text) return null;
        var d = document.createElement('div'); d.className = 'ds-tag ' + (side === 'p' ? 'p' : 'e') + ' ' + (lr === 'R' ? 'R' : lr === 'T' ? 'T' : 'L'); d.textContent = text;
        addMark({ el: d, kind: 'tag', id: id, lr: lr, place: function () {
          var a = actors[id]; if (!a || a.hidden) { d.style.display = 'none'; return; }
          d.style.display = '';
          var w = d.offsetWidth, ow = overlay.clientWidth || W * scale, p;
          if (lr === 'T') { p = toCss(a.x, a.y - a.head - 2); p.x = clamp(p.x, 2 + w / 2, ow - 2 - w / 2); }
          else {
            p = toCss(lr === 'R' ? a.x + 8 * KS : a.x - 8 * KS, a.y - 9 * KS);
            if (lr === 'R') p.x = Math.min(p.x, ow - 2 - 3 - w); else p.x = Math.max(p.x, 2 + 3 + w);
          }
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
        var x0 = a.x, y0 = a.y, hd = a.head, fw = a.fwd || 0, talking = marks.some(function (m) { return m.kind === 'say' && m.id === id; });
        var m = addMark({ el: d, kind: 'float', place: function () {
          var tg = tagOn(id), p = tg ? toCss(x0 + (fw || 1) * 11 * KS, y0 - hd + 2 * KS) : fw ? toCss(x0 + fw * 12 * KS + 0.5, y0 - 4 * KS) : toCss(x0 + 0.5, talking ? y0 - 3 * KS : y0 - hd);
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
          var p0 = toCss(a.x - 5 * KS, a.y - a.head), p1 = toCss(a.x + 5 * KS, a.y + 1);
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
      dim: function (v) { state.dim = v || 1; return api; },
      flash: function (color, ms) {
        if (reducedMotion()) return api;
        var d = document.createElement('div'); d.className = 'ds-flash'; d.style.background = color || '#fff';
        overlay.appendChild(d); ms = ms || 160;
        var an = null; try { an = d.animate([{ opacity: 0.92 }, { opacity: 0 }], { duration: ms, easing: 'ease-out', fill: 'forwards' }); } catch (_) {}
        setTimeout(function () { if (an) try { an.cancel(); } catch (_) {} d.remove(); }, ms + 40);
        return api;
      },
      spotlight: function (hid, text) {
        dropMarks(function (m) { return m.spotLbl; });
        if (!hid) { state.spot = null; return Promise.resolve(); }
        syncFollow(); var h = hotById(hid); if (!h) return Promise.resolve();
        return new Promise(function (res) { state.spot = { h: h, done: res }; if (text) labelFor({ rect: h.rect, label: text }, 'spot').spotLbl = true; });
      },
      reveal: function (ms) {
        ms = ms || 2600; state.reveal = state.rt + ms / 1000; dropMarks(function (m) { return m.revealLbl; });
        syncFollow();
        hots.forEach(function (h) { if (!h.sub && h.label && enabled(h)) labelFor(h, 'reveal', ms).revealLbl = true; });
        (L.props || []).forEach(function (o) {   // 裡面每張都能點的道具（牆上的唱片）：給一個總名牌
          if (!o.revealLabel || o.hidden) return;
          var subs = hots.filter(function (h) { return h.sub && h.prop && (h.prop === o || (o.id && h.prop.reveal === o.id)) && enabled(h); }); if (!subs.length) return;
          var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; subs.forEach(function (h) { var r = h.rect; x0 = Math.min(x0, r[0]); y0 = Math.min(y0, r[1]); x1 = Math.max(x1, r[0] + r[2]); y1 = Math.max(y1, r[1] + r[3]); });
          labelFor({ rect: [x0, y0, x1 - x0, y1 - y0], label: o.revealLabel }, 'reveal', ms).revealLbl = true;
          subs.forEach(function (h) { h._rv = true; });
        });
        return api;
      },
      highlight: function (list) {
        dropMarks(function (m) { return m.kind === 'hi'; });
        state.hi = []; syncFollow();
        (list || []).forEach(function (g) {
          var hs = (g.ids || []).map(hotById).filter(Boolean); if (!hs.length) return;
          state.hi.push({ hots: hs, label: g.label });
          if (!g.label) return;
          var d = document.createElement('div'); d.className = 'ds-opt'; d.textContent = g.label;
          addMark({ el: d, kind: 'hi', place: function () {
            var x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
            hs.forEach(function (h) { var r = h.rect; x0 = Math.min(x0, r[0]); x1 = Math.max(x1, r[0] + r[2]); y0 = Math.min(y0, r[1]); y1 = Math.max(y1, r[1] + r[3]); });
            var heads = Object.keys(actors).some(function (id) { var a = actors[id]; return !a.hidden && !a.outside && hasLook(a) && a.x + 15 > x0 && a.x - 15 < x1 && a.y - a.head < y0 + 2 && a.y > y0 - 12; });
            var p = toCss((x0 + x1) / 2, Math.max(y0, vy)), below = g.below || p.y < 30 || heads;
            if (below) p = toCss((x0 + x1) / 2, y1);
            d.style.left = p.x + 'px'; d.style.top = p.y + 'px'; d.classList.toggle('below', below);
            d.style.setProperty('--shift', sideShift(d, p.x) + 'px');
          } });
        });
        return api;
      },
      setView: function (v) { if (tween) { tween.cancel = true; var r = tween.res; tween = null; if (r) r(); } setView(v); return api; },
      tweenView: tweenView,
      view: function () { return { y: vy, h: vh, x: 0, w: W, scale: scale, dev: k, baseDev: baseDev(), dpr: dprNow() }; },
      camera: function (name) { var c = (L.cameras || {})[name]; if (c) api.setView({ y: c.y, h: c.h, dev: null }); return api; },
      // 看得到的排前面（矮螢幕鏡頭從牆頂裁掉一截時，先給畫面裡點得到的）；同一級照 layout 的順序
      hotspots: function () {
        syncFollow();
        var vis = function (h) { var r = h.rect, a = Math.max(0, Math.min(r[1] + r[3], vy + vh) - Math.max(r[1], vy)); return a >= r[3] ? 0 : a > 0 ? 1 : 2; };
        return hots.map(function (h, i) { return { h: h, i: i, v: vis(h) }; }).sort(function (a, b) { return a.v - b.v || a.i - b.i; })
          .map(function (x) { var h = x.h; return { id: h.id, label: h.label, action: h.action, rect: h.rect.slice(), shape: h.shape.map(function (r) { return r.slice(); }), depth: h.depth, sub: !!h.sub, parent: h.parent || null, visible: x.v < 2 }; });
      },
      // SPEC-v4 §2.4.3：每個啟用的熱點一個一定點得到的點（CSS px，相對 #stage host）：形狀內、不在任何更前面的形狀裡、取那塊可見區域最裡面的一格。e2e 用它真點
      hotPoints: function () {
        syncHots();
        var out = [];
        hots.forEach(function (h) {
          if (!h.enabled) return;
          var c = regionCenter(visRegion(h)); if (!c) return;
          var q = hostCss(c.x + 0.5, c.y + 0.5); out.push({ id: h.id, x: q.x, y: q.y, art: [c.x, c.y] });
        });
        return out;
      },
      // 測試／工具用：命中清單（含遮擋物；live 物件，別改）、某一格的命中（美術格）、某熱點看得到的那一塊
      hotList: function () { syncHots(); return hitList; },
      pick: function (x, y, o) { syncHots(); return hitPick(hitList, x, y, Object.assign({ r: slopR() }, o || {})); },
      hotRegion: function (hid) { syncHots(); var h = hotById(hid); return h ? visRegion(h) : null; },
      hotRect: function (hid) { syncFollow(); var h = hotById(hid); return h ? rectToScreen(h.rect) : null; },
      rectOf: function (r) { return rectToScreen(r, false); },
      tap: function (hid, o) { syncFollow(); var h = hotById(hid); if (!h || (!(o && o.force) && !enabled(h))) return false; tapHot(h); return true; },
      allow: function (fn) { allowFn = fn || null; return api; },
      sparkle: function (on) { sparkleOn = !!on; return api; },
      bump: bump,
      toCss: toCss, hostCss: hostCss, render: render, fit: fit,
      setTime: function (t) { fixedT = t; state.t = t; render(); return api; },
      cacheInfo: function () { return cache ? { ms: Math.round(cache.ms), entries: cache.entries.length, mb: Math.round(cache.bytes / 1048576 * 10) / 10, k: k } : null; },
      destroy: function () {
        destroyed = true; cancelAnimationFrame(raf); if (ro) ro.disconnect(); clearTimeout(coverQ);
        document.removeEventListener('visibilitychange', onVis);
        marks = []; cache = null; host.innerHTML = ''; host.classList.remove('ds-host', 'ds-bump');
      }
    };

    buildHots();
    var ro = null;
    if (typeof ResizeObserver !== 'undefined') { ro = new ResizeObserver(function () { if ((host.clientWidth || 0) !== hostW) fit(); }); ro.observe(host); }
    // layout.actors：店裡本來就在的人（老闆；店裡閒逛的熟客）。back＝背對鏡頭、pose＝一直維持的姿勢（例 dig 翻箱）
    (L.actors || []).forEach(function (a) { api.put(a.id, a.at, a.sprite); var b = actor(a.id); if (a.flip) b.flip = true; if (a.back) b.back = true; if (a.pose) api.pose(a.id, a.pose); if (a.phase != null) b.phase = a.phase; });
    // 中文字型（Noto Sans TC）晚到：到了重烤一次（箱子的「台灣」、試聽牌）
    try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (!destroyed && cache) { cache.k = -1; render(); } }); } catch (_) {}
    fit();
    raf = requestAnimationFrame(loop);
    return api;
  }

  // strict：走不到就丟錯（Node 測試設 DipShop.strict＝true；瀏覽器用 ?strict=1 開，SPEC-v4 §2.4.5）
  var EXPORTS = { mount: mount, defProp: defProp, hook: hook, HOOKS: HOOKS, PROPS: PROPS, Painter: Painter, DEFAULT_PAL: DEFAULT_PAL, GLYPH: GLYPH, HAND: HAND, EMOTE: EMOTE, HANDAT: HANDAT, armRows: armRows, bayer: bayer, seeded: seeded,
    defO: defO, hookO: hookO, O34: O34, OPainter: OPainter, navRoute: navRoute, navObstacles: navObstacles, navClear: navClear, navFallback: navFallback, segHitsRect: segHitsRect,
    buildHotList: buildHotList, hitPick: hitPick, hitTop: hitTop, hotRegion: hotRegion, regionCenter: regionCenter, regionOutline: regionOutline, followHot: followHot, propVisBox: propVisBox,
    strict: false, version: '4.0' };
  try { if (typeof location !== 'undefined' && /[?&]strict=1(&|$)/.test(location.search || '')) EXPORTS.strict = true; } catch (_) {}
  return EXPORTS;
});
