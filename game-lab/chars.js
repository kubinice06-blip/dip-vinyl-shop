/* chars.js — DipLabChars：v3 高精度像素人物（分層、程式畫、可捏）。
 * 店主 2026-11-07：「人物的畫素也可以提升 可自訂的人物造型也可以多增加更豐富」「像素的精緻度要像初版一樣」。
 *
 * 比例：1 小人像素 = 1 場景像素（不放大）。成人站姿約 47–48 px 高（頭 11、腿 22），1 px ≈ 3.6 cm。
 *       3/4 側面朝右；朝左＝鏡射（render 的 flip）。
 *
 * API（全部掛在 window.DipLabChars；Node 用 require 也拿得到）
 *   DipLabChars.render(ctx, spec, pose, frame, x, y, { flip, scale, alpha, sil, outline })
 *       把 (spec, pose, frame) 畫在 ctx 上；(x, y)＝腳底中點（地面那一列的上緣），scale 預設 1。
 *       有 DOM 時用快取的 canvas + drawImage；沒有 DOM（Node／假 ctx）就逐格 fillRect。
 *       回傳 { x, y, w, h, anchors }（畫出來的外框與錨點，已含 flip／scale）。
 *   DipLabChars.compose(spec, pose, frame, opts) → { w, h, ax, ay, data: Uint8ClampedArray(RGBA), anchors }
 *       ax, ay＝腳底中點在這張圖裡的位置；anchors 皆以「腳底中點為 0,0、朝右」的小人像素座標。
 *   DipLabChars.toCanvas(spec, pose, frame, opts) → HTMLCanvasElement（1:1，含 .ax .ay .anchors）
 *   DipLabChars.toDataURL(spec, pose, frame, opts) → 'data:image/png;base64,…'（opts.scale 整數放大）
 *   DipLabChars.grid(spec, pose, frame, opts) → { rows, pal, ax, ay, anchors }（shop.js P.sprite 相容的字母列＋色盤）
 *   DipLabChars.anchor(spec, pose, frame, name, { flip, scale }) → [dx, dy]（相對腳底）
 *   DipLabChars.npc(id) → spec（整組客人：owner man copycat already needle skip broke buyer label critic boss，
 *                         也認舊 SPR 鍵 e0…e7／boss／guard／digger／heretic）
 *   DipLabChars.fromDipChar(avatar) → spec（dip-character.js 的 {head,hair,shirt,pants,skin} → 最接近的新零件）
 *   DipLabChars.random(seed, { base }) → spec（同一個 seed 永遠同一個人）
 *   DipLabChars.normalize(spec) → 補齊預設、剔除不認得的值
 *   DipLabChars.parts → 零件目錄（每項 { id, label }；label 是繁中）；DipLabChars.SLOTS → 捏人用的欄位表
 *   DipLabChars.POSES → { idle:2, walk:4, walkFront:4, throw:3, hold:1, show:1, hurt:2, ko:1, dig:2, sit:1, cheer:2, shrug:1, point:1, up:1, shield:1, talk:2 }
 *   DipLabChars.ARM → shop.js 的手臂姿勢（wind/throw/show/up/shield/flag/shrug）對到 [pose, frame]
 *
 * spec（全部選填，缺的用預設）：
 *   { skin, build, height, hair, hairColor, eyes, brows, mouth, glasses, glassesColor, facial, facialColor, cheeks,
 *     hat, hatColor, top, topColor, top2Color, bottom, bottomColor, shoes, shoesColor, acc:[...], accColor }
 *
 * 只掛 window.DipLabChars；不宣告 PIX_PAL／SPR_BODY／AVATAR_* 等 dip-character.js 的全域。
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.DipLabChars = api;
})(typeof self !== 'undefined' ? self : (typeof globalThis !== 'undefined' ? globalThis : this), function () {
  'use strict';

  // ===================================================================== 顏色工具
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function hex2rgb(h) { h = String(h).replace('#', ''); if (h.length === 3) h = h.replace(/./g, '$&$&'); var n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  function rgb2hex(r, g, b) { return '#' + ((1 << 24) | (clamp(Math.round(r), 0, 255) << 16) | (clamp(Math.round(g), 0, 255) << 8) | clamp(Math.round(b), 0, 255)).toString(16).slice(1); }
  function rgb2hsl(r, g, b) {
    r /= 255; g /= 255; b /= 255; var mx = Math.max(r, g, b), mn = Math.min(r, g, b), h = 0, s = 0, l = (mx + mn) / 2;
    if (mx !== mn) { var d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
      h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; }
    return [h, s, l];
  }
  function hsl2rgb(h, s, l) {
    h = ((h % 360) + 360) % 360 / 360; if (s === 0) return [l * 255, l * 255, l * 255];
    function f(p, q, t) { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; }
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    return [f(p, q, h + 1 / 3) * 255, f(p, q, h) * 255, f(p, q, h - 1 / 3) * 255];
  }
  function toward(h, target, amt) { var d = ((target - h + 540) % 360) - 180; return h + clamp(d, -Math.abs(amt), Math.abs(amt)); }
  function mix(a, b, t) { var A = hex2rgb(a), B = hex2rgb(b); return rgb2hex(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t); }
  // 自動色階（深→亮 5 階）：陰影往藍紫偏、亮面往黃偏（像素畫的 hue shift）
  function autoRamp(base) {
    var c = rgb2hex.apply(null, hex2rgb(base)), hsl = rgb2hsl.apply(null, hex2rgb(c)), h = hsl[0], s = hsl[1], l = hsl[2];
    var lo = s < 0.08;   // 灰階：只偏一點點
    function mk(dh, target, sm, ll) { var hh = lo ? h : toward(h, target, dh); return rgb2hex.apply(null, hsl2rgb(hh, clamp(lo ? s + (target === 250 ? 0.06 : 0.02) : s * sm, 0, 1), clamp(ll, 0, 1))); }
    return [mk(20, 250, 1.08, l * 0.42), mk(10, 250, 1.04, l * 0.72), c, mk(7, 55, 0.94, l + (1 - l) * 0.26), mk(12, 55, 0.8, l + (1 - l) * 0.52)];
  }

  var LINE = '#1c120b';

  // ===================================================================== 色票（label＝繁中）
  // 膚色：手調 5 階 [深, 陰, 本, 亮, 高光]
  var SKINS = [
    { id: 'porcelain', label: '白皙', ramp: ['#9a5e52', '#dba596', '#f6d8c6', '#fce8dc', '#fff4ec'] },
    { id: 'light', label: '淺膚', ramp: ['#94573f', '#d4946e', '#efbf98', '#f8d5b4', '#fde8d2'] },
    { id: 'peach', label: '蜜桃', ramp: ['#8a4a36', '#c9825e', '#e6a47c', '#f2bf98', '#f8d6b8'] },
    { id: 'tan', label: '小麥', ramp: ['#6e3a20', '#a8673a', '#c98a50', '#dba46a', '#ebc08c'] },
    { id: 'brown', label: '古銅', ramp: ['#4a2512', '#7a4220', '#9c5c30', '#b47442', '#cb905c'] },
    { id: 'deep', label: '深褐', ramp: ['#24120a', '#45261a', '#623a26', '#7a4e34', '#93664a'] },
    { id: 'olive', label: '橄欖', ramp: ['#5e4224', '#94703e', '#b8925a', '#cca870', '#dfc290'] }
  ];
  var HAIRC = [
    { id: 'black', label: '黑', ramp: ['#0b0a0e', '#17161d', '#25232d', '#3b3a48', '#5b5b70'] },
    { id: 'espresso', label: '深棕', ramp: ['#1a0e08', '#2e1a10', '#45281a', '#5e3a26', '#7c5238'] },
    { id: 'brown', label: '棕', ramp: ['#2e1a0e', '#53301a', '#744628', '#94603a', '#b47e52'] },
    { id: 'auburn', label: '紅棕', ramp: ['#3a120c', '#681e14', '#8e3020', '#b04a30', '#cc6c48'] },
    { id: 'ginger', label: '橘', ramp: ['#5a2008', '#9a3e10', '#d0661c', '#ea8a32', '#f8b05a'] },
    { id: 'blonde', label: '金', ramp: ['#6e4a1a', '#a87c32', '#d4aa52', '#e8c672', '#f6e09c'] },
    { id: 'platinum', label: '白金', ramp: ['#8a8070', '#bdb3a0', '#ddd5c2', '#eee8d8', '#fbf8ee'] },
    { id: 'grey', label: '灰', ramp: ['#3a3a40', '#62626a', '#8a8a92', '#acacb2', '#d0d0d4'] },
    { id: 'white', label: '銀白', ramp: ['#6a6e78', '#a4a8b2', '#d2d4da', '#e8eaee', '#ffffff'] },
    { id: 'blue', label: '藍', ramp: ['#0e1a44', '#1c3270', '#2c52a8', '#4876cc', '#78a2e6'] },
    { id: 'pink', label: '粉紅', ramp: ['#5e1838', '#9a2c5e', '#d0508a', '#e878a8', '#f6a6c8'] },
    { id: 'green', label: '綠', ramp: ['#0c2a1a', '#18492c', '#2a7046', '#46945e', '#74b884'] },
    { id: 'purple', label: '紫', ramp: ['#220e3a', '#3e1c64', '#5e3092', '#7e4cb4', '#a478d2'] },
    { id: 'teal', label: '水藍', ramp: ['#0a3036', '#13545c', '#1e8088', '#3aa6aa', '#6ccaca'] },
    { id: 'red', label: '紅', ramp: ['#40080c', '#76121a', '#ac2028', '#d03a3a', '#ec6a5e'] }
  ];
  // 衣物色：手調幾個關鍵色（黑、白、丹寧、卡其），其他自動
  var CLOTH = [
    { id: 'white', label: '白', ramp: ['#7c7e8c', '#c4c6d0', '#eeeef0', '#fbfbfb', '#ffffff'] },
    { id: 'cream', label: '米白', ramp: ['#7e705a', '#c8b898', '#e8dcc0', '#f4ecd8', '#fdf8ec'] },
    { id: 'lightgrey', label: '淺灰', ramp: ['#5c5e6a', '#9496a2', '#bcbec8', '#d4d6de', '#ecedf2'] },
    { id: 'grey', label: '灰', ramp: ['#30313a', '#555763', '#7a7c88', '#9a9ca8', '#bec0ca'] },
    { id: 'charcoal', label: '炭灰', ramp: ['#141419', '#24252d', '#373844', '#4c4e5c', '#6a6c7c'] },
    { id: 'black', label: '黑', ramp: ['#08080b', '#121218', '#1c1c24', '#2e2e3a', '#4a4a5c'] },
    { id: 'red', label: '紅', ramp: autoRamp('#c11628') },
    { id: 'maroon', label: '酒紅', ramp: autoRamp('#7a1a2a') },
    { id: 'orange', label: '橘', ramp: autoRamp('#e0721c') },
    { id: 'mustard', label: '芥末黃', ramp: autoRamp('#c8961e') },
    { id: 'yellow', label: '黃', ramp: autoRamp('#f0c75e') },
    { id: 'olive', label: '橄欖綠', ramp: autoRamp('#6e7432') },
    { id: 'green', label: '綠', ramp: autoRamp('#2e7d52') },
    { id: 'forest', label: '墨綠', ramp: autoRamp('#1e4a34') },
    { id: 'mint', label: '薄荷', ramp: autoRamp('#7cc8a4') },
    { id: 'teal', label: '水藍', ramp: autoRamp('#3fb6c9') },
    { id: 'sky', label: '天藍', ramp: autoRamp('#78aee0') },
    { id: 'blue', label: '藍', ramp: autoRamp('#1f5fae') },
    { id: 'navy', label: '海軍藍', ramp: autoRamp('#1c2c58') },
    { id: 'purple', label: '紫', ramp: autoRamp('#6a3fa0') },
    { id: 'lavender', label: '薰衣草', ramp: autoRamp('#a890d0') },
    { id: 'pink', label: '粉紅', ramp: autoRamp('#e87aa0') },
    { id: 'magenta', label: '桃紅', ramp: autoRamp('#c8306e') },
    { id: 'brown', label: '咖啡', ramp: autoRamp('#6e4228') },
    { id: 'camel', label: '駝色', ramp: autoRamp('#b88450') },
    { id: 'khaki', label: '卡其', ramp: ['#5c4c2e', '#94804e', '#bca674', '#d0bc8c', '#e4d4ac'] },
    { id: 'denim', label: '丹寧', ramp: ['#101c34', '#1e3358', '#2f4f80', '#4a6c9e', '#7090bc'] },
    { id: 'lightdenim', label: '淺丹寧', ramp: ['#24365a', '#45618e', '#6886b4', '#88a6cc', '#b0c8e2'] },
    { id: 'gold', label: '金', ramp: ['#4e3206', '#8a5e10', '#c8961e', '#e8bc44', '#fae08a'] }
  ];
  var METAL = {
    gold: ['#4e3206', '#8a5e10', '#c8961e', '#ecc246', '#fff0a8'],
    silver: ['#30323c', '#6a6e7a', '#a6aab4', '#d2d4dc', '#ffffff'],
    black: ['#050507', '#101014', '#1c1c22', '#383842', '#6a6a78']
  };
  function byId(list) { var o = {}; list.forEach(function (x) { o[x.id] = x; }); return o; }
  var SKIN = byId(SKINS), HAIRCOL = byId(HAIRC), CLOTHCOL = byId(CLOTH);
  function cloth(id) { return (CLOTHCOL[id] || CLOTHCOL.grey).ramp; }
  function hairRamp(id) { return (HAIRCOL[id] || HAIRCOL.black).ramp; }
  function anyRamp(id) { if (!id) return null; if (CLOTHCOL[id]) return CLOTHCOL[id].ramp; if (HAIRCOL[id]) return HAIRCOL[id].ramp; if (METAL[id]) return METAL[id]; if (/^#[0-9a-f]{3,6}$/i.test(id)) return autoRamp(id); return null; }

  // ===================================================================== 合成緩衝
  var BW = 104, BH = 112, AX = 52, AY = 96;   // 工作畫布；(AX,AY)＝腳底中點（地面列）
  var LX = -0.72, LY = -0.69;                  // 光從左上

  function Comp() {
    this.m = new Int16Array(BW * BH); this.t = new Int8Array(BW * BH); this.p = new Int16Array(BW * BH);
    this.ramps = [null]; this.mid = {}; this.parts = [null]; this.cur = 0; this.anch = {};
  }
  Comp.prototype.reg = function (name, ramp) { if (this.mid[name] != null) { this.ramps[this.mid[name]] = ramp; return this.mid[name]; } this.ramps.push(ramp); return (this.mid[name] = this.ramps.length - 1); };
  Comp.prototype.begin = function (name, o) { this.parts.push({ name: name, ink: !(o && o.ink === false), under: !(o && o.under === false) }); this.cur = this.parts.length - 1; return this.cur; };
  Comp.prototype.idx = function (x, y) { x = Math.floor(x) + AX; y = Math.floor(y) + AY; if (x < 0 || y < 0 || x >= BW || y >= BH) return -1; return y * BW + x; };
  Comp.prototype.put = function (x, y, mat, tone) {
    var i = this.idx(x, y); if (i < 0) return; var id = typeof mat === 'number' ? mat : this.mid[mat];
    if (!id) return; this.m[i] = id; this.t[i] = clamp(tone == null ? 2 : tone, 0, 4); this.p[i] = this.cur;
  };
  Comp.prototype.tone = function (x, y, tone, onlyMat) { var i = this.idx(x, y); if (i < 0 || !this.m[i]) return; if (onlyMat && this.m[i] !== this.mid[onlyMat]) return; this.t[i] = clamp(tone, 0, 4); };
  Comp.prototype.shift = function (x, y, d) { var i = this.idx(x, y); if (i < 0 || !this.m[i]) return; this.t[i] = clamp(this.t[i] + d, 0, 4); };
  Comp.prototype.get = function (x, y) { var i = this.idx(x, y); return i < 0 ? 0 : this.m[i]; };
  Comp.prototype.getPart = function (x, y) { var i = this.idx(x, y); return i < 0 ? 0 : (this.m[i] ? this.p[i] : 0); };
  Comp.prototype.matAt = function (x, y) { var i = this.idx(x, y); if (i < 0 || !this.m[i]) return null; for (var k in this.mid) if (this.mid[k] === this.m[i]) return k; return null; };
  Comp.prototype.clear = function (x, y) { var i = this.idx(x, y); if (i >= 0) this.m[i] = 0; };

  // ---------------------------------------------------------- 畫筆
  // 粗線段（膠囊）：fn(cx, cy, t, ox, oy, r) → [mat, tone] | null；t＝沿線 0..1，(ox,oy)＝離中線的偏移
  function capsule(C, x0, y0, x1, y1, w, fn) {
    var r = w / 2, dx = x1 - x0, dy = y1 - y0, L2 = dx * dx + dy * dy || 1e-9;
    var minx = Math.floor(Math.min(x0, x1) - r - 1), maxx = Math.ceil(Math.max(x0, x1) + r + 1);
    var miny = Math.floor(Math.min(y0, y1) - r - 1), maxy = Math.ceil(Math.max(y0, y1) + r + 1);
    for (var j = miny; j <= maxy; j++) for (var i = minx; i <= maxx; i++) {
      var cx = i + 0.5, cy = j + 0.5, t = clamp(((cx - x0) * dx + (cy - y0) * dy) / L2, 0, 1);
      var ox = cx - (x0 + t * dx), oy = cy - (y0 + t * dy);
      if (ox * ox + oy * oy > r * r + 0.01) continue;
      var res = fn(i, j, t, ox, oy, r); if (res) C.put(i, j, res[0], res[1]);
    }
  }
  function limbTone(ox, oy, r) {
    var d = Math.sqrt(ox * ox + oy * oy) / (r || 1), n = (ox * LX + oy * LY) / (r || 1);
    if (d > 0.5 && n > 0.3) return 3;
    if (d > 0.45 && n < -0.28) return 1;
    return 2;
  }
  // 多邊形（像素中心落在裡面才畫）
  function inPoly(px, py, pts) {
    var c = false;
    for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      var xi = pts[i][0], yi = pts[i][1], xj = pts[j][0], yj = pts[j][1];
      if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) c = !c;
    }
    return c;
  }
  function poly(C, pts, fn) {
    var minx = Infinity, maxx = -Infinity, miny = Infinity, maxy = -Infinity;
    pts.forEach(function (p) { minx = Math.min(minx, p[0]); maxx = Math.max(maxx, p[0]); miny = Math.min(miny, p[1]); maxy = Math.max(maxy, p[1]); });
    for (var j = Math.floor(miny) - 1; j <= Math.ceil(maxy); j++) for (var i = Math.floor(minx) - 1; i <= Math.ceil(maxx); i++) {
      if (!inPoly(i + 0.5, j + 0.5, pts)) continue;
      var res = fn(i, j); if (res) C.put(i, j, res[0], res[1]);
    }
  }
  function rect(C, x, y, w, h, mat, tone) { for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) C.put(x + i, y + j, mat, tone); }
  // 字母圖章：leg＝{ 字母: [mat, tone] }；flipX 讓同一張圖章左右反
  function stamp(C, rows, x, y, leg, flipX) {
    if (!rows) return;
    for (var j = 0; j < rows.length; j++) { var r = rows[j], w = r.length;
      for (var i = 0; i < w; i++) { var ch = r.charAt(flipX ? w - 1 - i : i), L = leg[ch]; if (!L) continue;
        if (L === 'clear') C.clear(x + i, y + j); else C.put(x + i, y + j, L[0], L[1]); } }
  }
  function legend(mat) { var o = {}; o.x = [mat, 0]; o.D = [mat, 1]; o.h = [mat, 2]; o.H = [mat, 3]; o.W = [mat, 4]; return o; }
  function extend(a, b) { var o = {}, k; for (k in a) o[k] = a[k]; for (k in b) o[k] = b[k]; return o; }

  // ===================================================================== 後製：內線、外框、上色
  function finish(C, opts) {
    opts = opts || {};
    var m = C.m, t = C.t, p = C.p, parts = C.parts, i, x, y;
    // 1) 內線：後面那塊碰到前面那塊（z 較大、會投線）→ 後面那格壓成最深
    var dark = new Uint8Array(BW * BH);
    for (y = 1; y < BH - 1; y++) for (x = 1; x < BW - 1; x++) {
      i = y * BW + x; if (!m[i]) continue; var me = p[i]; if (!parts[me] || !parts[me].under) continue;
      var nb = [i - 1, i + 1, i - BW, i + BW];
      for (var k = 0; k < 4; k++) { var q = nb[k]; if (m[q] && p[q] > me && parts[p[q]] && parts[p[q]].ink && m[q] !== 0) { if (!(parts[p[q]].name === parts[me].name)) { dark[i] = 1; break; } } }
    }
    for (i = 0; i < m.length; i++) if (dark[i]) t[i] = 0;
    // 2) 上色＋外框
    var minx = BW, miny = BH, maxx = -1, maxy = -1;
    for (y = 0; y < BH; y++) for (x = 0; x < BW; x++) if (m[y * BW + x]) { if (x < minx) minx = x; if (x > maxx) maxx = x; if (y < miny) miny = y; if (y > maxy) maxy = y; }
    if (maxx < 0) return { w: 1, h: 1, ax: 0, ay: 1, data: new Uint8ClampedArray(4), anchors: C.anch };
    var ol = opts.outline === false ? 0 : 1;
    minx -= ol; miny -= ol; maxx += ol; maxy += ol;
    var W = maxx - minx + 1, H = maxy - miny + 1, data = new Uint8ClampedArray(W * H * 4);
    var cache = {};
    function rgbOf(mat, tone) { var key = mat * 8 + tone; if (!cache[key]) cache[key] = hex2rgb(C.ramps[mat][tone]); return cache[key]; }
    var lineRGB = hex2rgb(opts.outlineColor || LINE);
    for (y = miny; y <= maxy; y++) for (x = minx; x <= maxx; x++) {
      var o = ((y - miny) * W + (x - minx)) * 4, rgb = null;
      if (x >= 0 && y >= 0 && x < BW && y < BH && m[y * BW + x]) { i = y * BW + x; rgb = rgbOf(m[i], t[i]); }
      else if (ol) {
        // 外框：上下左右有東西 → 深色描邊（混一點那塊的最深色，不是死黑）
        var best = 0;
        [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].forEach(function (q) { if (!best && q[0] >= 0 && q[1] >= 0 && q[0] < BW && q[1] < BH && m[q[1] * BW + q[0]]) best = m[q[1] * BW + q[0]]; });
        if (best) { var dk = rgbOf(best, 0); rgb = [lineRGB[0] * 0.62 + dk[0] * 0.38, lineRGB[1] * 0.62 + dk[1] * 0.38, lineRGB[2] * 0.62 + dk[2] * 0.38]; }
      }
      if (rgb) { data[o] = rgb[0]; data[o + 1] = rgb[1]; data[o + 2] = rgb[2]; data[o + 3] = 255; }
    }
    return { w: W, h: H, ax: AX - minx, ay: AY - miny, data: data, anchors: C.anch };
  }


  // ===================================================================== 身形（體型 × 身高）
  var BUILDS = [
    { id: 'slim', label: '纖瘦', shW: 11, waist: 8, hip: 9, arm: 3, leg: 4, neck: 3 },
    { id: 'regular', label: '標準', shW: 13, waist: 10, hip: 10, arm: 3, leg: 4, neck: 4 },
    { id: 'sturdy', label: '壯碩', shW: 15, waist: 13, hip: 12, arm: 4, leg: 5, neck: 5 }
  ];
  var HEIGHTS = [
    { id: 'short', label: '矮', shin: 8, thigh: 9, torso: 11, armU: 6, armL: 6 },
    { id: 'mid', label: '中等', shin: 9, thigh: 10, torso: 12, armU: 7, armL: 6 },
    { id: 'tall', label: '高', shin: 10, thigh: 11, torso: 13, armU: 8, armL: 7 }
  ];
  var BUILD = byId(BUILDS), HEIGHT = byId(HEIGHTS);
  function metrics(spec) {
    var b = BUILD[spec.build] || BUILD.regular, h = HEIGHT[spec.height] || HEIGHT.mid;
    return { shW: b.shW, waist: b.waist, hip: b.hip, armW: b.arm, legW: b.leg, neckW: b.neck, build: b.id,
      shin: h.shin, thigh: h.thigh, torso: h.torso, armU: h.armU, armL: h.armL, ankle: 3 };
  }
  function rad(d) { return d * Math.PI / 180; }
  function dirv(a) { return [Math.sin(rad(a)), Math.cos(rad(a))]; }

  // ===================================================================== 頭（3/4 朝右，12×11）
  // c 本色、b 陰影、l 亮面、a 最深、e 耳朵（陰影＋一格亮）
  var HEAD_R = [
    '...ccccc....',
    '.ccccccccc..',
    'cccccccccc..',
    'ccccccccccc.',
    'ccccccccccc.',
    'ccccccccccc.',
    'cccccccccccc',
    '.cccccccccc.',
    '.cccccccccc.',
    '..bccccccc..',
    '....bbcccb..'
  ];
  var HEAD_W = 12, HEAD_H = 11, NECK_AT = [5, 10];   // 脖子接在頭框 (5,10) 的正下方
  // 臉的座標（頭框內）
  var FACE = { eyeN: [6, 5], eyeF: [9, 5], browY: 3, mouth: [8, 8], nose: [11, 6], cheekN: [5, 7], cheekF: [10, 7], ear: [3, 5] };

  function drawHead(C, hx, hy, spec, ex) {
    C.begin('head');
    var leg = { c: ['skin', 2], b: ['skin', 1], l: ['skin', 3], a: ['skin', 0], e: ['skin', 1] };
    stamp(C, HEAD_R, hx, hy, leg);
    // 耳朵（x3–4、y5–7）：外圈陰影、中間一格亮
    C.put(hx + 3, hy + 5, 'skin', 1); C.put(hx + 3, hy + 6, 'skin', 3); C.put(hx + 4, hy + 6, 'skin', 1); C.put(hx + 3, hy + 7, 'skin', 1);
    // 額頭亮面、下巴陰影
    C.put(hx + 7, hy + 3, 'skin', 3); C.put(hx + 8, hy + 3, 'skin', 3); C.put(hx + 6, hy + 9, 'skin', 1);
    drawFace(C, hx, hy, spec, ex || {});
  }

  // ---------------------------------------------------------- 臉
  var EYES = [
    { id: 'dot', label: '豆豆眼' }, { id: 'round', label: '圓眼' }, { id: 'sleepy', label: '睏眼' },
    { id: 'happy', label: '笑眼' }, { id: 'wide', label: '大眼' }, { id: 'lash', label: '睫毛' }, { id: 'narrow', label: '瞇眼' }
  ];
  var BROWS = [
    { id: 'soft', label: '淡眉' }, { id: 'thick', label: '粗眉' }, { id: 'angry', label: '怒眉' }, { id: 'raised', label: '挑眉' }, { id: 'worried', label: '八字眉' }, { id: 'none', label: '無' }
  ];
  var MOUTHS = [
    { id: 'neutral', label: '平' }, { id: 'smile', label: '微笑' }, { id: 'grin', label: '露齒笑' }, { id: 'smirk', label: '歪嘴笑' },
    { id: 'frown', label: '嘟嘴' }, { id: 'open', label: '張嘴' }, { id: 'flat', label: '面無表情' }
  ];
  var GLASSES = [
    { id: 'none', label: '無' }, { id: 'round', label: '圓框' }, { id: 'square', label: '方框' }, { id: 'sunglasses', label: '墨鏡' },
    { id: 'browline', label: '眉框' }, { id: 'monocle', label: '單片眼鏡' }
  ];
  var FACIALS = [
    { id: 'none', label: '無' }, { id: 'stubble', label: '鬍渣' }, { id: 'moustache', label: '八字鬍' }, { id: 'beard', label: '落腮鬍' },
    { id: 'goatee', label: '山羊鬍' }, { id: 'longbeard', label: '長鬍子' }, { id: 'curled', label: '翹鬍子' }
  ];
  var CHEEKS = [{ id: 'none', label: '無' }, { id: 'blush', label: '腮紅' }, { id: 'freckles', label: '雀斑' }, { id: 'both', label: '雀斑＋腮紅' }];
  // 表情（姿勢可以蓋掉眼睛／嘴）
  var EXPR = {
    hurt: { eyes: 'shut', mouth: 'open', brows: 'worried' }, ko: { eyes: 'x', mouth: 'open', brows: 'none' },
    cheer: { eyes: 'happy', mouth: 'grin' }, angry: { brows: 'angry', mouth: 'frown' }, talk: { mouth: 'open' },
    down: { eyes: 'down' }, effort: { eyes: 'narrow', brows: 'angry', mouth: 'grin' }, shrug: { brows: 'raised', mouth: 'flat', eyes: 'sleepy' }
  };
  function drawFace(C, hx, hy, spec, ex) {
    var eyes = ex.eyes || spec.eyes, mouth = ex.mouth || spec.mouth, brows = ex.brows || spec.brows;
    var en = FACE.eyeN, ef = FACE.eyeF;
    // 鼻子：鼻尖亮、鼻下陰影
    C.put(hx + 11, hy + 6, 'skin', 2); C.put(hx + 10, hy + 7, 'skin', 1);
    // 眼睛
    function eye(x, y, far) {
      x += hx; y += hy;
      switch (eyes) {
        case 'round': C.put(x, y, 'eyek', 2); C.put(x, y + 1, 'eyek', 2); if (!far) C.put(x - 1, y, 'eyew', 2); C.put(x, y, 'eyew', 4); break;
        case 'wide': C.put(x - 1, y, 'eyew', 2); C.put(x - 1, y + 1, 'eyew', 2); C.put(x, y, 'eyek', 2); C.put(x, y + 1, 'eyek', 2); break;
        case 'sleepy': C.put(x, y + 1, 'eyek', 2); C.put(x - 1, y + 1, 'eyek', 1); C.put(x, y, 'skin', 1); break;
        case 'happy': C.put(x - 1, y + 1, 'eyek', 2); C.put(x, y, 'eyek', 2); C.put(x + 1, y + 1, 'eyek', 2); break;
        case 'lash': C.put(x, y, 'eyek', 2); C.put(x, y + 1, 'eyek', 2); C.put(x + 1, y - 1, 'eyek', 2); break;
        case 'narrow': C.put(x, y + 1, 'eyek', 2); C.put(x - 1, y + 1, 'eyek', 2); break;
        case 'shut': C.put(x - 1, y, 'eyek', 2); C.put(x, y + 1, 'eyek', 2); C.put(x - 1, y + 2, 'eyek', 2); break;
        case 'x': C.put(x - 1, y, 'eyek', 2); C.put(x + 1, y, 'eyek', 2); C.put(x, y + 1, 'eyek', 2); C.put(x - 1, y + 2, 'eyek', 2); C.put(x + 1, y + 2, 'eyek', 2); break;
        case 'down': C.put(x, y + 1, 'eyek', 2); C.put(x, y + 2, 'eyek', 2); break;
        default: C.put(x, y, 'eyek', 2); C.put(x, y + 1, 'eyek', 2);
      }
    }
    eye(en[0], en[1], false); eye(ef[0], ef[1], true);
    // 眉毛
    var by = FACE.browY;
    function brow(x, far) {
      var X = hx + x, Y = hy + by;
      switch (brows) {
        case 'none': break;
        case 'thick': C.put(X - 1, Y, 'brow', 2); C.put(X, Y, 'brow', 2); if (!far) C.put(X - 2, Y, 'brow', 1); C.put(X - 1, Y - 1, 'brow', 1); break;
        case 'angry': if (far) { C.put(X - 1, Y - 1, 'brow', 2); C.put(X, Y, 'brow', 2); } else { C.put(X - 1, Y, 'brow', 2); C.put(X, Y, 'brow', 2); C.put(X + 1, Y + 0, 'brow', 2); } break;
        case 'raised': C.put(X - 1, Y - 1, 'brow', 2); C.put(X, Y - 1, 'brow', 2); break;
        case 'worried': if (far) { C.put(X - 1, Y, 'brow', 2); C.put(X, Y - 1, 'brow', 2); } else { C.put(X - 1, Y - 1, 'brow', 2); C.put(X, Y, 'brow', 2); } break;
        default: C.put(X - 1, Y, 'brow', 1); C.put(X, Y, 'brow', 1);
      }
    }
    brow(en[0], false); brow(ef[0], true);
    // 嘴
    var mx = hx + FACE.mouth[0], my = hy + FACE.mouth[1];
    switch (mouth) {
      case 'smile': C.put(mx - 1, my - 1, 'mouth', 1); C.put(mx, my, 'mouth', 1); C.put(mx + 1, my, 'mouth', 1); break;
      case 'grin': C.put(mx - 1, my - 1, 'mouth', 0); C.put(mx, my, 'teeth', 2); C.put(mx + 1, my, 'teeth', 2); C.put(mx, my - 1, 'mouth', 0); C.put(mx + 1, my - 1, 'mouth', 0); C.put(mx + 2, my - 1, 'mouth', 0); break;
      case 'smirk': C.put(mx, my, 'mouth', 1); C.put(mx + 1, my, 'mouth', 1); C.put(mx + 2, my - 1, 'mouth', 1); break;
      case 'frown': C.put(mx, my, 'mouth', 1); C.put(mx + 1, my, 'mouth', 1); C.put(mx - 1, my + 1, 'mouth', 1); break;
      case 'open': C.put(mx, my, 'mouth', 0); C.put(mx + 1, my, 'mouth', 0); C.put(mx, my + 1, 'mouth', 1); C.put(mx + 1, my + 1, 'mouth', 2); break;
      case 'flat': C.put(mx - 1, my, 'mouth', 1); C.put(mx, my, 'mouth', 1); C.put(mx + 1, my, 'mouth', 1); break;
      default: C.put(mx, my, 'mouth', 1); C.put(mx + 1, my, 'mouth', 1);
    }
    // 臉頰
    if (spec.cheeks === 'blush' || spec.cheeks === 'both') { C.put(hx + FACE.cheekN[0], hy + FACE.cheekN[1], 'blush', 2); C.put(hx + FACE.cheekN[0] + 1, hy + FACE.cheekN[1], 'blush', 3); C.put(hx + FACE.cheekF[0], hy + FACE.cheekF[1], 'blush', 2); }
    if (spec.cheeks === 'freckles' || spec.cheeks === 'both') { C.put(hx + 5, hy + 7, 'freck', 2); C.put(hx + 7, hy + 7, 'freck', 2); C.put(hx + 6, hy + 8, 'freck', 2); C.put(hx + 10, hy + 7, 'freck', 2); }
  }


  // ===================================================================== 髮型（3/4 朝右；front 蓋在頭上，back 在身體後面）
  // h 本色、H 亮、W 高光、D 陰、x 最深。ox/oy＝圖章左上角相對頭框的位移。cut＝戴帽子時髮型從第幾列（頭框 y）以上剪掉
  var HAIRS = [];
  function defHair(id, label, o) { o.id = id; o.label = label; HAIRS.push(o); }
  defHair('short', '短髮', { ox: -1, oy: -1, front: [
    '...hhhhhh.....',
    '.hhhhHHHhhh...',
    'hhhhhHHhhhhh..',
    'hhhhhhhhhhhhh.',
    'Dhhhhhhh.hDh..',
    'Dhhhhx........',
    'Dhhh..........',
    'Dhhh..........',
    'xDh...........',
    '.D............'
  ] });
  var HAIR = {}; HAIRS.forEach(function (h) { HAIR[h.id] = h; });

  // ===================================================================== 上衣
  var TOPS = [
    { id: 'tee', label: 'T 恤', sleeve: 'short', neck: 'crew', hem: 1 },
    { id: 'bandtee', label: '樂團 T', sleeve: 'short', neck: 'crew', hem: 1, print: 'disc', dflt: 'black', dflt2: 'white' },
    { id: 'stripe', label: '條紋 T', sleeve: 'short', neck: 'crew', hem: 1, pattern: 'stripe', dflt2: 'white' },
    { id: 'hoodie', label: '帽 T', sleeve: 'long', neck: 'hood', hem: 0, rib: true, pocket: true },
    { id: 'flannel', label: '格紋襯衫', sleeve: 'rolled', neck: 'collar', hem: 0, pattern: 'plaid', placket: true, dflt: 'red', dflt2: 'black' },
    { id: 'denim', label: '牛仔外套', sleeve: 'long', neck: 'collar', hem: 1, open: true, jacket: true, dflt: 'denim', dflt2: 'white', seams: true },
    { id: 'leather', label: '皮衣', sleeve: 'long', neck: 'lapel', hem: 1, open: true, jacket: true, shiny: true, dflt: 'black', dflt2: 'white', zip: true },
    { id: 'turtleneck', label: '高領毛衣', sleeve: 'long', neck: 'turtle', hem: 0, rib: true, knit: true },
    { id: 'cardigan', label: '開襟毛衣', sleeve: 'long', neck: 'v', hem: -1, open: true, buttons: true, rib: true, knit: true, dflt2: 'white' },
    { id: 'suit', label: '西裝外套', sleeve: 'long', neck: 'lapel', hem: -2, open: true, jacket: true, tie: true, dflt: 'charcoal', dflt2: 'white' },
    { id: 'shirt', label: '襯衫', sleeve: 'rolled', neck: 'collar', hem: 0, placket: true, dflt: 'white' },
    { id: 'apron', label: '圍裙', sleeve: 'short', neck: 'crew', hem: 1, apron: true, dflt: 'green', dflt2: 'white' },
    { id: 'coat', label: '長大衣', sleeve: 'long', neck: 'lapel', hem: -9, open: true, jacket: true, dflt: 'camel', dflt2: 'black' },
    { id: 'tank', label: '背心', sleeve: 'none', neck: 'scoop', hem: 1 }
  ];
  var TOP = byId(TOPS);
  // ===================================================================== 下身
  var BOTTOMS = [
    { id: 'jeans', label: '牛仔褲', dflt: 'denim', len: 1, cuff: true, seam: true },
    { id: 'blackjeans', label: '黑牛仔褲', dflt: 'black', len: 1, seam: true },
    { id: 'chinos', label: '卡其褲', dflt: 'khaki', len: 1, crease: true },
    { id: 'slacks', label: '西裝褲', dflt: 'charcoal', len: 1, crease: true },
    { id: 'shorts', label: '短褲', dflt: 'khaki', len: 0.42, cuff: true },
    { id: 'skirt', label: '裙子', dflt: 'black', len: 0.45, skirt: true },
    { id: 'cargo', label: '工作褲', dflt: 'olive', len: 1, pocket: true, cuff: true },
    { id: 'joggers', label: '運動褲', dflt: 'grey', len: 1, gather: true, stripe: true }
  ];
  var BOTTOM = byId(BOTTOMS);
  // ===================================================================== 鞋（朝右；x0＝腳跟，腳踝在 x≈2）
  var SHOES = [
    { id: 'sneakers', label: '球鞋', dflt: 'white', flat: ['.uuu....', 'uuukkuU.', 'SSSSSSSs'], toe: ['..uu....', '.uuukk..', '..uuuUu.', '...SSSSs'] },
    { id: 'hightops', label: '帆布高筒', dflt: 'red', flat: ['.uuu....', '.uuu....', 'uuuuuwW.', 'wwwwwwww'], toe: ['..uu....', '.uuuu...', '..uuuwW.', '...wwwww'] },
    { id: 'boots', label: '靴子', dflt: 'brown', flat: ['.uuu....', '.uuu....', 'uuuuuuU.', 'xxSSSSSs'], toe: ['..uu....', '.uuuu...', '..uuuuU.', '...xSSSs'] },
    { id: 'loafers', label: '皮鞋', dflt: 'black', flat: ['........', 'uuuuuUW.', 'xxsssssx'], toe: ['........', '..uuuuW.', '...xsssx'] },
    { id: 'sandals', label: '涼鞋', dflt: 'brown', flat: ['........', 'fuffuff.', 'SSSSSSSs'], toe: ['........', '..fuffu.', '...SSSSs'] }
  ];
  var SHOE = byId(SHOES);
  var HATS = [{ id: 'none', label: '無' }];
  var HAT = byId(HATS);
  var ACCS = [];
  var ACC = byId(ACCS);

  // ===================================================================== 預設與正規化
  var DEFAULT = {
    skin: 'light', build: 'regular', height: 'mid', hair: 'short', hairColor: 'black',
    eyes: 'dot', brows: 'soft', mouth: 'neutral', glasses: 'none', glassesColor: 'black', facial: 'none', facialColor: null, cheeks: 'none',
    hat: 'none', hatColor: 'black', top: 'tee', topColor: null, top2Color: null, bottom: 'jeans', bottomColor: null,
    shoes: 'sneakers', shoesColor: null, acc: [], accColor: 'red'
  };
  function pick(list, v, d) { for (var i = 0; i < list.length; i++) if (list[i].id === v) return v; return d; }
  function normalize(spec) {
    spec = spec || {}; var o = {};
    o.skin = pick(SKINS, spec.skin, DEFAULT.skin);
    o.build = pick(BUILDS, spec.build, DEFAULT.build);
    o.height = pick(HEIGHTS, spec.height, DEFAULT.height);
    o.hair = pick(HAIRS, spec.hair, DEFAULT.hair);
    o.hairColor = pick(HAIRC, spec.hairColor, DEFAULT.hairColor);
    o.eyes = pick(EYES, spec.eyes, DEFAULT.eyes);
    o.brows = pick(BROWS, spec.brows, DEFAULT.brows);
    o.mouth = pick(MOUTHS, spec.mouth, DEFAULT.mouth);
    o.glasses = pick(GLASSES, spec.glasses, 'none');
    o.glassesColor = anyRamp(spec.glassesColor) ? spec.glassesColor : DEFAULT.glassesColor;
    o.facial = pick(FACIALS, spec.facial, 'none');
    o.facialColor = pick(HAIRC, spec.facialColor, o.hairColor);
    o.cheeks = pick(CHEEKS, spec.cheeks, 'none');
    o.hat = pick(HATS, spec.hat, 'none');
    o.hatColor = anyRamp(spec.hatColor) ? spec.hatColor : (HAT[o.hat] && HAT[o.hat].dflt) || DEFAULT.hatColor;
    o.top = pick(TOPS, spec.top, DEFAULT.top);
    o.topColor = CLOTHCOL[spec.topColor] ? spec.topColor : (TOP[o.top].dflt || 'blue');
    o.top2Color = CLOTHCOL[spec.top2Color] ? spec.top2Color : (TOP[o.top].dflt2 || 'white');
    o.bottom = pick(BOTTOMS, spec.bottom, DEFAULT.bottom);
    o.bottomColor = CLOTHCOL[spec.bottomColor] ? spec.bottomColor : BOTTOM[o.bottom].dflt;
    o.shoes = pick(SHOES, spec.shoes, DEFAULT.shoes);
    o.shoesColor = CLOTHCOL[spec.shoesColor] ? spec.shoesColor : SHOE[o.shoes].dflt;
    var acc = Array.isArray(spec.acc) ? spec.acc : (typeof spec.acc === 'string' && spec.acc ? [spec.acc] : []);
    o.acc = acc.filter(function (a, i) { return ACC[a] && acc.indexOf(a) === i; });
    o.accColor = CLOTHCOL[spec.accColor] ? spec.accColor : DEFAULT.accColor;
    if (spec.scarfColor && CLOTHCOL[spec.scarfColor]) o.scarfColor = spec.scarfColor;
    if (spec.bagColor && CLOTHCOL[spec.bagColor]) o.bagColor = spec.bagColor;
    if (spec.tieColor && CLOTHCOL[spec.tieColor]) o.tieColor = spec.tieColor;
    if (spec.name) o.name = String(spec.name);
    return o;
  }

  // ===================================================================== 材質登記
  function setupMats(C, spec) {
    C.reg('skin', SKIN[spec.skin].ramp);
    C.reg('eyek', ['#08060a', '#140e12', '#1c1418', '#3a2e34', '#ffffff']);
    C.reg('eyew', ['#8a8aa0', '#c8c8d8', '#f4f4f8', '#ffffff', '#ffffff']);
    var sk = SKIN[spec.skin].ramp;
    C.reg('mouth', [mix(sk[0], '#2a0608', 0.55), mix(sk[0], sk[1], 0.35), mix(sk[1], '#a0484a', 0.3), sk[2], sk[3]]);
    C.reg('teeth', ['#9a9aa4', '#d6d6dc', '#fbfbfb', '#ffffff', '#ffffff']);
    C.reg('blush', [sk[1], mix(sk[2], '#e0607a', 0.4), mix(sk[2], '#f07890', 0.45), mix(sk[3], '#f890a0', 0.35), sk[4]]);
    C.reg('freck', [sk[0], sk[0], mix(sk[1], '#6a3418', 0.45), sk[2], sk[3]]);
    var hr = hairRamp(spec.hairColor);
    C.reg('hair', hr);
    C.reg('brow', [hr[0], mix(hr[1], sk[1], 0.25), hr[1], hr[2], hr[3]]);
    C.reg('beard', hairRamp(spec.facialColor || spec.hairColor));
    C.reg('top', cloth(spec.topColor)); C.reg('top2', cloth(spec.top2Color));
    C.reg('bot', cloth(spec.bottomColor));
    C.reg('shoe', cloth(spec.shoesColor));
    C.reg('sole', ['#6a6458', '#a8a294', '#dcd6c6', '#eeeadc', '#ffffff']);
    C.reg('white', cloth('white')); C.reg('black', cloth('black'));
    C.reg('hat', anyRamp(spec.hatColor) || cloth('black'));
    C.reg('gold', METAL.gold); C.reg('silver', METAL.silver);
    C.reg('acc', cloth(spec.accColor));
    C.reg('scarf', cloth(spec.scarfColor || spec.accColor));
    C.reg('bag', cloth(spec.bagColor || 'camel'));
    C.reg('tie', cloth(spec.tieColor || 'red'));
    C.reg('glass', anyRamp(spec.glassesColor) || METAL.black);
    C.reg('lens', ['#0a0a12', '#1a1c2a', '#262a3e', '#4a5470', '#9aa8c8']);
    C.reg('vinyl', ['#050506', '#0e0e12', '#18181e', '#34343e', '#6a6a78']);
    C.reg('label', cloth('red'));
    C.reg('paper', cloth('cream'));
  }

  // ===================================================================== 骨架（正向運動學）
  function snap(v, w) { return w % 2 ? Math.floor(v) + 0.5 : Math.round(v); }
  function skeleton(spec, P) {
    var M = metrics(spec), sk = { M: M, P: P };
    var hipY = -(M.ankle + M.shin + M.thigh) + (P.dy || 0), hx = P.dx || 0;
    var hw = M.legW / 2;
    function leg(side) {
      var L = P['leg' + side] || [0, 0], hip = [hx + (side === 'N' ? -hw : hw) + (L[2] || 0), hipY];
      var k = [hip[0] + M.thigh * dirv(L[0])[0], hip[1] + M.thigh * dirv(L[0])[1]];
      var a = [k[0] + M.shin * dirv(L[0] + L[1])[0], k[1] + M.shin * dirv(L[0] + L[1])[1]];
      return { hip: hip, knee: k, ankle: a, foot: (P['foot' + side] || 'flat'), a0: L[0], a1: L[0] + L[1] };
    }
    sk.legN = leg('N'); sk.legF = leg('F');
    // 落地：踩地的腳踝貼齊地面
    if (P.ground !== false) {
      var need = null;
      [sk.legN, sk.legF].forEach(function (l) { if (l.foot === 'air') return; var target = -M.ankle - (l.foot === 'toe' ? 1 : 0); var d = target - l.ankle[1]; need = need == null ? d : Math.min(need, d); });
      if (need) { [sk.legN, sk.legF].forEach(function (l) { l.hip[1] += need; l.knee[1] += need; l.ankle[1] += need; }); hipY += need; }
    }
    sk.legN.hip[1] = sk.legF.hip[1] = hipY;
    ['legN', 'legF'].forEach(function (k) { var l = sk[k]; ['hip', 'knee', 'ankle'].forEach(function (j) { l[j] = [snap(l[j][0], M.legW), snap(l[j][1], M.legW)]; }); });
    var H = [hx, hipY], lean = P.lean || 0, up = [Math.sin(rad(lean)), -Math.cos(rad(lean))], pp = [Math.cos(rad(lean)), Math.sin(rad(lean))];
    var tl = M.torso - (P.breath || 0);
    var S = [H[0] + up[0] * tl, H[1] + up[1] * tl];
    sk.H = H; sk.S = S; sk.up = up; sk.pp = pp; sk.lean = lean; sk.tl = tl;
    function arm(side) {
      var A = P['arm' + side] || [0, 0], off = side === 'N' ? -(M.shW / 2 - 2) : (M.shW / 2 - 3);
      var sh = [S[0] + pp[0] * off - up[0] * 1.5, S[1] + pp[1] * off - up[1] * 1.5];
      sh = [snap(sh[0], M.armW), snap(sh[1], M.armW)];
      var e = [sh[0] + M.armU * dirv(A[0])[0], sh[1] + M.armU * dirv(A[0])[1]];
      var w = [e[0] + M.armL * dirv(A[0] + A[1])[0], e[1] + M.armL * dirv(A[0] + A[1])[1]];
      var d = dirv(A[0] + A[1]);
      return { sh: sh, el: e, wr: w, hand: [w[0] + d[0] * 1.6, w[1] + d[1] * 1.6], a0: A[0], a1: A[0] + A[1], grip: A[2] || null };
    }
    sk.armN = arm('N'); sk.armF = arm('F');
    var neckTop = [S[0] + up[0] * 2 + 1, S[1] + up[1] * 2];
    var hd = P.head || [0, 0];
    sk.head = [Math.round(neckTop[0] - NECK_AT[0] + hd[0]), Math.round(neckTop[1] - NECK_AT[1] - 1 + hd[1])];
    sk.neckTop = neckTop;
    return sk;
  }

  // ===================================================================== 畫身體各塊
  function torsoPts(sk, M, extra) {
    extra = extra || {};
    var H = sk.H, up = sk.up, pp = sk.pp, L = sk.tl;
    var sw = M.shW / 2, ww = M.waist / 2, hw = M.hip / 2, belly = M.build === 'sturdy' ? 1 : 0;
    var loc = [[-hw, extra.hem != null ? extra.hem : 0], [-ww, 4], [-sw, L - 3], [-sw + 1.5, L], [sw - 1.5, L], [sw, L - 3], [sw + 0.5, L - 5], [ww + belly, 4], [hw, extra.hem != null ? extra.hem : 0]];
    if (extra.flare) { loc[0][0] -= extra.flare; loc[loc.length - 1][0] += extra.flare; }
    return loc.map(function (q) { return [H[0] + pp[0] * q[0] + up[0] * q[1], H[1] + pp[1] * q[0] + up[1] * q[1]]; });
  }
  function local(sk, x, y) { var dx = x + 0.5 - sk.H[0], dy = y + 0.5 - sk.H[1]; return [dx * sk.pp[0] + dy * sk.pp[1], dx * sk.up[0] + dy * sk.up[1]]; }
  // 每列（沿脊椎）的左右邊界，算陰影用
  function rowSpan(C, part, y) { var a = null, b = null; for (var x = -40; x < 40; x++) if (C.getPart(x, y) === part) { if (a == null) a = x; b = x; } return [a, b]; }

  function drawLeg(C, sk, spec, side) {
    var M = sk.M, l = sk['leg' + side], B = BOTTOM[spec.bottom], w = M.legW;
    C.begin('leg' + side);
    var total = M.thigh + M.shin, cut = B.len * total;   // 褲管長度（沿腿）
    function seg(a, b, s0, s1) {
      capsule(C, a[0], a[1], b[0], b[1], w, function (x, y, t, ox, oy, r) {
        var s = s0 + t * (s1 - s0), tone = limbTone(ox, oy, r);
        if (B.skirt) return ['skin', tone];
        if (s > cut + 0.3) return ['skin', tone];
        if (B.cuff && s > cut - 1.2 && B.len < 1) return ['bot', tone >= 2 ? 3 : 2];
        return ['bot', tone];
      });
    }
    seg(l.hip, l.knee, 0, M.thigh); seg(l.knee, l.ankle, M.thigh, total);
    // 細節：牛仔縫線、褲管反折、口袋、壓摺
    if (!B.skirt && B.len === 1) {
      var ax = l.ankle[0], ay = l.ankle[1];
      if (B.cuff) for (var i = -w / 2; i < w / 2; i++) C.tone(Math.floor(ax + i + 0.01), Math.floor(ay) - 1, 3, 'bot');
      if (B.gather) for (var j = -w / 2; j < w / 2; j++) C.tone(Math.floor(ax + j + 0.01), Math.floor(ay) - 1, 1, 'bot');
    }
  }
  function drawShoe(C, sk, spec, side) {
    var l = sk['leg' + side], S = SHOE[spec.shoes];
    C.begin('shoe' + side);
    var rows = l.foot === 'toe' ? S.toe : S.flat, h = rows.length;
    var x0 = Math.floor(l.ankle[0]) - 2, y0 = Math.floor(l.ankle[1]) - h + 3 + (l.foot === 'toe' ? 1 : 0);
    if (l.foot === 'air') { rows = S.flat; h = rows.length; y0 = Math.floor(l.ankle[1]) - h + 3; }
    var leg = { u: ['shoe', 2], U: ['shoe', 3], d: ['shoe', 1], x: ['shoe', 0], W: ['shoe', 4], s: ['sole', 2], S: ['sole', 2], k: ['acc', 2], w: ['white', 2], f: ['skin', 2] };
    if (spec.shoes === 'sneakers') leg.k = ['acc', 2];
    if (spec.shoes === 'boots' || spec.shoes === 'loafers') { leg.s = ['black', 2]; leg.S = ['black', 3]; leg.x = ['black', 1]; }
    if (spec.shoes === 'sandals') { leg.S = ['bag', 1]; leg.s = ['bag', 0]; }
    stamp(C, rows, x0, y0, leg);
  }
  function drawPelvis(C, sk, spec) {
    var M = sk.M, B = BOTTOM[spec.bottom];
    C.begin('pelvis');
    var H = sk.H, hw = M.hip / 2;
    var pts = [[H[0] - hw, H[1] - 4], [H[0] + hw, H[1] - 4], [H[0] + hw, H[1] + 1], [H[0] + 1, H[1] + 2.5], [H[0] - hw, H[1] + 1]];
    poly(C, pts, function (x, y) { return [B.skirt ? 'bot' : 'bot', x <= H[0] - hw + 0.5 ? 3 : (x >= H[0] + hw - 1.5 ? 1 : 2)]; });
    if (B.skirt) {
      // A 字裙：從腰到膝上，下襬外擴
      var len = Math.round((M.thigh + M.shin) * B.len), top = H[1] - 3, bot = H[1] + len - 2;
      var spts = [[H[0] - hw, top], [H[0] + hw, top], [H[0] + hw + 2.5, bot], [H[0] - hw - 2, bot]];
      poly(C, spts, function (x, y) { var span = (x - (H[0] - hw - 2)) / (M.hip + 4.5); var tone = span < 0.12 ? 3 : span > 0.82 ? 1 : 2; if (y === Math.floor(bot) - 1 && ((x & 1) === 0)) tone = Math.max(1, tone - 1); if ((x - Math.floor(H[0])) % 3 === 0 && y > top + 3 && tone === 2) tone = 1; return ['bot', tone]; });
    }
  }
  function drawTorso(C, sk, spec) {
    var M = sk.M, T = TOP[spec.top];
    var part = C.begin('torso');
    var hem = T.hem;
    var pts = torsoPts(sk, M, { hem: hem - (T.apron ? 0 : 0), flare: hem < -3 ? 1 : 0 });
    poly(C, pts, function (x, y) { return ['top', 2]; });
    // 陰影：背側一格亮、胸側兩格暗、下襬一列暗
    for (var y = -60; y < 10; y++) {
      var sp = rowSpan(C, part, y); if (sp[0] == null) continue;
      C.tone(sp[0], y, 3); C.tone(sp[1], y, 1); C.tone(sp[1] - 1, y, 1);
    }
    var hemY = null; for (var yy = 10; yy > -60; yy--) { var s2 = rowSpan(C, part, yy); if (s2[0] != null) { hemY = yy; break; } }
    if (hemY != null) { var hs = rowSpan(C, part, hemY); for (var hx = hs[0]; hx <= hs[1]; hx++) C.shift(hx, hemY, -1); }
    sk.hemY = hemY;
    // 前中線（3/4：胸口偏右）
    var cx = function (y) { var sp = rowSpan(C, part, y); return sp[0] == null ? null : Math.round(sp[0] + (sp[1] - sp[0]) * 0.62); };
    sk.frontX = cx;
    var topY = Math.floor(sk.S[1]) ;
    // 花紋
    if (T.pattern === 'stripe') {
      for (var y1 = topY + 2; y1 <= hemY; y1++) if ((y1 - topY) % 3 === 0) { var s3 = rowSpan(C, part, y1); for (var x1 = s3[0]; x1 <= s3[1]; x1++) { var t0 = C.t[C.idx(x1, y1)]; C.put(x1, y1, 'top2', t0); } }
    }
    if (T.pattern === 'plaid') {
      for (var y2 = topY; y2 <= hemY; y2++) { var s4 = rowSpan(C, part, y2); for (var x2 = s4[0]; x2 <= s4[1]; x2++) { var L = local(sk, x2, y2), u = Math.floor(L[0] + 20), v = Math.floor(L[1] + 20), t1 = C.t[C.idx(x2, y2)];
        var gx = u % 4 === 0, gy = v % 4 === 0;
        if (gx && gy) C.put(x2, y2, 'top2', Math.max(1, t1 - 1)); else if (gx || gy) C.put(x2, y2, 'top', Math.max(0, t1 - 1)); } }
    }
    if (T.knit) { for (var y3 = topY + 1; y3 < hemY; y3++) { var s5 = rowSpan(C, part, y3); for (var x3 = s5[0] + 1; x3 < s5[1] - 1; x3++) if ((x3 + y3) % 2 === 0 && (x3 % 3 === 0)) C.shift(x3, y3, -1); } }
    if (T.rib && hemY != null) { var hs2 = rowSpan(C, part, hemY); for (var x4 = hs2[0]; x4 <= hs2[1]; x4++) C.tone(x4, hemY, x4 % 2 ? 1 : 2); var hs3 = rowSpan(C, part, hemY - 1); for (var x5 = hs3[0]; x5 <= hs3[1]; x5++) C.tone(x5, hemY - 1, x5 % 2 ? 1 : 2); }
    // 開襟：前中露出內搭（top2）
    if (T.open) {
      for (var y6 = topY + 1; y6 <= hemY; y6++) { var fx = cx(y6); if (fx == null) continue; var wv = T.neck === 'lapel' ? Math.max(1, 3 - Math.floor((y6 - topY) / 3)) : 1; if (y6 - topY > 6 && T.id !== 'coat') wv = 1;
        for (var k = 0; k < wv + 1; k++) C.put(fx - k + 1, y6, 'top2', k === wv ? 1 : 2);
        C.tone(fx - wv, y6, 0); C.tone(fx + 2, y6, 1); }
    }
    if (T.tie) { for (var y7 = topY + 2; y7 <= topY + 9; y7++) { var fx2 = cx(y7); if (fx2 == null) continue; C.put(fx2, y7, 'tie', y7 === topY + 2 ? 3 : 2); if (y7 > topY + 4 && y7 < topY + 9) C.put(fx2 + 1, y7, 'tie', 1); } }
    if (T.placket) { for (var y8 = topY + 2; y8 < hemY; y8++) { var fx3 = cx(y8); if (fx3 != null) { C.tone(fx3, y8, 1); if ((y8 - topY) % 3 === 1) C.put(fx3 + 1, y8, 'white', 3); } } }
    if (T.buttons) { for (var y9 = topY + 3; y9 < hemY; y9 += 3) { var fx4 = cx(y9); if (fx4 != null) C.put(fx4 - 1, y9, 'gold', 3); } }
    if (T.zip) { for (var ya = topY + 3; ya < hemY; ya++) { var fx5 = cx(ya); if (fx5 != null && ya % 2 === 0) C.put(fx5 - 2, ya, 'silver', 3); } }
    if (T.pocket) { var py = hemY - 4, fx6 = cx(py); if (fx6 != null) { for (var i = -5; i <= 1; i++) C.tone(fx6 + i, py, 1); C.tone(fx6 - 5, py + 1, 1); C.tone(fx6 + 1, py + 1, 1); C.tone(fx6 - 5, py + 2, 1); C.tone(fx6 + 1, py + 2, 1); } }
    if (T.seams) { var sy = topY + 4, fx7 = cx(sy); if (fx7 != null) { for (var i2 = -4; i2 <= -1; i2++) C.tone(fx7 + i2, sy, 1); C.tone(fx7 - 3, sy + 1, 3); C.tone(fx7 - 2, sy + 1, 3); } }
    if (T.shiny) { for (var yb = topY + 2; yb < hemY - 1; yb++) { var s6 = rowSpan(C, part, yb); if (s6[0] != null && yb % 4 !== 0) C.tone(s6[0] + 1, yb, 4); } }
    if (T.print) {
      var pyy = topY + 4, fx8 = cx(pyy); if (fx8 != null) {
        var PR = ['.ooo.', 'oo.oo', '.ooo.', '.....', 'o.o.o'];
        for (var r = 0; r < PR.length; r++) for (var c = 0; c < 5; c++) if (PR[r][c] === 'o') C.put(fx8 - 3 + c, pyy + r, 'top2', r === 0 ? 3 : 2);
        C.put(fx8 - 1, pyy + 1, 'label', 2);
      }
    }
    // 領口
    drawNeckline(C, sk, spec, T, topY, cx);
  }
  function drawNeckline(C, sk, spec, T, topY, cx) {
    var nx = Math.round(sk.S[0] + 1), ny = Math.floor(sk.S[1]);
    if (T.neck === 'crew' || T.neck === 'scoop' || T.neck === 'hood') {
      // 圓領：脖子下緣一個淺 U，領口羅紋是亮一階
      var deep = T.neck === 'scoop' ? 2 : 1;
      for (var i = -2; i <= 1; i++) for (var d = 0; d < deep; d++) C.put(nx + i, ny + d, 'skin', d === deep - 1 ? 1 : 2);
      for (var j = -3; j <= 2; j++) C.tone(nx + j, ny + (j < -2 || j > 1 ? 0 : deep), 3, 'top');
      if (T.apron) for (var j2 = -3; j2 <= 2; j2++) C.tone(nx + j2, ny + (j2 < -2 || j2 > 1 ? 0 : deep), 3, 'top2');
    }
    if (T.neck === 'v' || T.neck === 'lapel') { for (var k = 0; k < 4; k++) { C.put(nx - 1 + Math.floor(k / 2), ny + k, T.open ? 'top2' : 'skin', 2); } }
    if (T.neck === 'collar' || T.neck === 'lapel') {
      C.put(nx - 3, ny, 'top', 3); C.put(nx - 2, ny + 1, 'top', 3); C.put(nx - 1, ny + 2, 'top', 2);
      C.put(nx + 2, ny, 'top', 3); C.put(nx + 1, ny + 1, 'top', 3);
    }
    if (T.neck === 'hood') {
      // 帽子：堆在後頸，一圈厚布
      for (var h = 0; h < 3; h++) { C.put(nx - 4 - h, ny - 1 + h, 'top', h ? 2 : 3); C.put(nx - 3 - h, ny - 1 + h, 'top', 1); }
      C.put(nx + 1, ny + 2, 'white', 2); C.put(nx + 1, ny + 3, 'white', 2); C.put(nx - 1, ny + 2, 'white', 2); C.put(nx - 1, ny + 3, 'white', 1);
    }
  }
  function drawNeck(C, sk, spec) {
    var M = sk.M, T = TOP[spec.top];
    C.begin('neck');
    var a = [sk.S[0] + 1, sk.S[1] + 1], b = [sk.neckTop[0], sk.neckTop[1] - 1];
    capsule(C, a[0], a[1], b[0], b[1], M.neckW, function (x, y, t, ox) { return T.neck === 'turtle' ? ['top', ox < -1 ? 3 : (ox > 1 ? 1 : 2)] : ['skin', ox > 1.2 ? 1 : 2]; });
    if (T.neck === 'turtle') { for (var y = Math.floor(b[1]); y <= Math.floor(a[1]); y++) for (var x = Math.floor(a[0] - M.neckW / 2) - 1; x <= Math.floor(a[0] + M.neckW / 2); x++) { if (C.getPart(x, y) === C.cur && (x + y) % 2 === 0) C.shift(x, y, -1); } }
  }
  function drawArm(C, sk, spec, side) {
    var M = sk.M, A = sk['arm' + side], T = TOP[spec.top], w = M.armW;
    C.begin('arm' + side);
    var total = M.armU + M.armL;
    var sl = T.sleeve === 'short' ? M.armU * 0.55 : T.sleeve === 'rolled' ? M.armU + M.armL * 0.35 : T.sleeve === 'long' ? total - 0.6 : -1;
    var sleeveMat = T.apron ? 'top2' : 'top';
    function seg(a, b, s0, s1) {
      capsule(C, a[0], a[1], b[0], b[1], w, function (x, y, t, ox, oy, r) {
        var s = s0 + t * (s1 - s0), tone = limbTone(ox, oy, r);
        if (s <= sl) { if (sl - s < 1.0 && T.sleeve !== 'none') return [sleeveMat, T.sleeve === 'rolled' ? 3 : Math.max(0, tone - 1)]; return [sleeveMat, tone]; }
        return ['skin', tone];
      });
    }
    seg(A.sh, A.el, 0, M.armU); seg(A.el, A.wr, M.armU, total);
    // 手：小圓塊
    capsule(C, A.wr[0], A.wr[1], A.hand[0], A.hand[1], w, function (x, y, t, ox, oy, r) { return ['skin', limbTone(ox, oy, r) === 1 ? 1 : 2]; });
    C.anch['hand' + side] = [Math.round(A.hand[0]), Math.round(A.hand[1])];
  }
  function drawHair(C, sk, spec, layer) {
    var Hh = HAIR[spec.hair]; if (!Hh) return;
    var rows = layer === 'back' ? Hh.back : Hh.front; if (!rows) return;
    C.begin(layer === 'back' ? 'hairB' : 'hairF');
    var ox = layer === 'back' ? (Hh.bx != null ? Hh.bx : Hh.ox) : Hh.ox, oy = layer === 'back' ? (Hh.by != null ? Hh.by : Hh.oy) : Hh.oy;
    stamp(C, rows, sk.head[0] + ox, sk.head[1] + oy, legend('hair'));
  }

  // ===================================================================== 姿勢
  // 角度：0＝朝下，正值＝往前（朝面向）。leg:[大腿角, 膝彎(小腿相對)], arm:[上臂角, 肘彎(前臂相對)]
  var POSE = {
    idle: [
      { legN: [0, 0], legF: [0, 0], armN: [-4, 10], armF: [6, 8] },
      { legN: [0, 0], legF: [0, 0], armN: [-4, 12], armF: [6, 10], breath: 1 }
    ]
  };
  var POSE_FRAMES = {}; Object.keys(POSE).forEach(function (k) { POSE_FRAMES[k] = POSE[k].length; });

  // ===================================================================== 組裝
  function build(spec, pose, frame, opts) {
    spec = normalize(spec); opts = opts || {};
    var frames = POSE[pose] || POSE.idle; var P = frames[((frame | 0) % frames.length + frames.length) % frames.length];
    var C = new Comp(); setupMats(C, spec);
    var sk = skeleton(spec, P), ex = extend(EXPR[P.expr] || {}, opts.expr ? (EXPR[opts.expr] || {}) : {});
    drawHair(C, sk, spec, 'back');
    if (!P.armFfront) drawArm(C, sk, spec, 'F');
    drawLeg(C, sk, spec, 'F'); drawShoe(C, sk, spec, 'F');
    drawLeg(C, sk, spec, 'N'); drawShoe(C, sk, spec, 'N');
    drawPelvis(C, sk, spec);
    drawTorso(C, sk, spec);
    drawNeck(C, sk, spec);
    drawHead(C, sk.head[0], sk.head[1], spec, ex);
    drawHair(C, sk, spec, 'front');
    if (P.armFfront) drawArm(C, sk, spec, 'F');
    drawArm(C, sk, spec, 'N');
    C.anch.foot = [0, 0];
    C.anch.head = [sk.head[0] + 6, sk.head[1] - 1];
    C.anch.chest = [Math.round(sk.S[0]), Math.round(sk.S[1] + 4)];
    return finish(C, opts);
  }

  return {
    compose: build, normalize: normalize, HAIRS: HAIRS,
    _internal: { Comp: Comp, capsule: capsule, poly: poly, rect: rect, stamp: stamp, legend: legend, finish: finish, limbTone: limbTone, autoRamp: autoRamp, mix: mix, extend: extend },
    SKINS: SKINS, HAIRC: HAIRC, CLOTH: CLOTH, METAL: METAL, cloth: cloth, hairRamp: hairRamp, anyRamp: anyRamp, LINE: LINE
  };
});
