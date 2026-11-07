/* chars.js — DipLabChars：v4 Q 版像素人物（分層、程式畫、可捏）。
 * 店主 2026-11-07 11:36：「人物維持原本的可愛q版風格 類似寶可夢黃版的人 但細節更多 目前這個人物風格很醜」
 *   → 舊 16 格小人的比例（大頭、短身、短手短腳、豆豆眼）不變，像素加倍：成人約 30 格高（頭含頭髮 15、身體 15），
 *     多色階、描邊、陰影、髮流、帽子與衣服細節。像寶可夢第三、四代的地圖小人。
 *
 * 比例：1 小人像素 = 1 場景像素（不放大）。成人站姿 30 格（頭頂到鞋底；帽子另加 1–7 格）。
 *       店裡的唱片箱桌約 20 格高 → 人約是桌子的 1.5 倍（像寶可夢的室內）。
 *       主要角度是 3/4 側面朝右（看得到兩隻眼睛）；朝左＝鏡射（render 的 flip）。另有正面、背面。
 *
 * API（全部掛在 window.DipLabChars；Node 用 require 也拿得到）
 *   DipLabChars.render(ctx, spec, pose, frame, x, y, { flip, scale, alpha, sil, shadow, held, labelColor, expr, outline })
 *       把 (spec, pose, frame) 畫在 ctx 上；(x, y)＝腳底中點（地面那一列的上緣，鞋底在 y-1），scale 整數倍、預設 1。
 *       有 DOM 時第一次畫會烤成 canvas 快取，之後一個 drawImage；沒有 DOM（Node／假 ctx）就逐格 fillRect。
 *       回傳 { x, y, w, h, anchors }（畫出來的外框與錨點，已含 flip／scale，是畫布座標）。
 *   DipLabChars.compose(spec, pose, frame, opts) → { w, h, ax, ay, data: Uint8ClampedArray(RGBA), anchors }
 *       ax, ay＝腳底中點在這張圖裡的位置；anchors 皆以「腳底中點為 0,0、朝右」的小人像素座標。
 *   DipLabChars.toCanvas(spec, pose, frame, opts) → HTMLCanvasElement（1:1，含 .ax .ay .anchors）
 *   DipLabChars.toDataURL(spec, pose, frame, opts) → 'data:image/png;base64,…'（opts.scale 整數放大、opts.flip）
 *   DipLabChars.grid(spec, pose, frame, opts) → { rows, pal, ax, ay, anchors }（shop.js P.sprite 相容的字母列＋色盤，'.' 透明）
 *   DipLabChars.anchor(spec, pose, frame, name, { flip, scale }) → [dx, dy]（相對腳底）
 *       錨點：foot 腳底、head 頭頂（含帽子；名牌、泡泡貼這）、face 臉、chest 胸口（被打中的點）、hip、
 *             handN 近手（畫面左邊那隻，丟唱片的手）、handF 遠手、held 手上唱片中心（有拿才有）、seat 坐姿屁股
 *   DipLabChars.npc(id) → spec：owner man copycat already needle skip broke buyer label critic boss（＋ guard digger heretic god）；
 *                         也認舊 SPR 鍵 e0…e7／boss／owner。content.js：spr ? npc(spr) : fromDipChar(avatar)
 *   DipLabChars.fromDipChar(avatar) → spec（dip-character.js 的 {head,hair,shirt,pants,skin} → 最接近的新零件；舊玩家造型不變）
 *   DipLabChars.random(seed, { base }) → spec（同一個 seed 永遠同一個人；base 蓋掉幾欄）
 *   DipLabChars.normalize(spec) → 補齊預設、剔除不認得的值（存檔讀回來先過一次）
 *   DipLabChars.parts → 零件目錄（每項 { id, label }，label 繁中）；DipLabChars.SLOTS → 捏人欄位表；DipLabChars.swatch(kind, id) → 色票
 *   DipLabChars.POSES → { 姿勢: 格數 }：
 *       3/4 側面：idle 2、walk 4、throw 3（蓄力／出手／收勢）、hold 1、show 1、shield 1、hurt 2、ko 1、dig 2、sit 1、cheer 2、shrug 1、point 1、up 1、talk 2
 *       正面：idleFront 2、walkFront 4、cheerFront 2；背面：idleBack 2、walkBack 4、browseBack 2
 *   DipLabChars.ARM → shop.js 舊手臂姿勢（wind/throw/show/up/shield/flag/shrug/none）對到 [pose, frame]
 *   DipLabChars.SCALE → 參考尺寸（場景 px）
 *
 * spec（全部選填，缺的用預設）：
 *   { skin, build, hair, hairColor, eyes, brows, mouth, glasses, glassesColor, facial, facialColor, cheeks,
 *     hat, hatColor, hatBandColor, top, topColor, top2Color, tieColor, bottom, bottomColor, shoes, shoesColor,
 *     acc:[...], accColor, scarfColor, bagColor, name }
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
    var lo = s < 0.08;
    function mk(dh, target, sm, ll) { var hh = lo ? h : toward(h, target, dh); return rgb2hex.apply(null, hsl2rgb(hh, clamp(lo ? s + (target === 250 ? 0.06 : 0.02) : s * sm, 0, 1), clamp(ll, 0, 1))); }
    return [mk(20, 250, 1.08, l * 0.42), mk(10, 250, 1.04, l * 0.72), c, mk(7, 55, 0.94, l + (1 - l) * 0.26), mk(12, 55, 0.8, l + (1 - l) * 0.52)];
  }

  var LINE = '#1a1018';   // 描邊（寶可夢式深色外框；每塊再混一點自己的最深色）

  // ===================================================================== 色票（label＝繁中）
  // 5 階 [最深, 陰, 本色, 亮, 高光]
  var SKINS = [
    { id: 'porcelain', label: '白皙', ramp: ['#9a5e52', '#e2ab98', '#fadcc8', '#fde9dc', '#fff6ee'] },
    { id: 'light', label: '淺膚', ramp: ['#94573f', '#dc9a72', '#f4c49c', '#f9d8b8', '#fdebd6'] },
    { id: 'peach', label: '蜜桃', ramp: ['#8a4a36', '#cf8660', '#eaa87e', '#f4c29c', '#f9d9bc'] },
    { id: 'tan', label: '小麥', ramp: ['#6e3a20', '#ad6a3c', '#cd8e54', '#dea870', '#edc492'] },
    { id: 'olive', label: '橄欖', ramp: ['#5e4224', '#98723e', '#bc965c', '#cfac74', '#e1c694'] },
    { id: 'brown', label: '古銅', ramp: ['#4a2512', '#7c4422', '#9e5e32', '#b77846', '#cd9460'] },
    { id: 'deep', label: '深褐', ramp: ['#24120a', '#46271a', '#653c28', '#7e5238', '#986a4e'] }
  ];
  var HAIRC = [
    { id: 'black', label: '黑', ramp: ['#0b0a10', '#19181f', '#28262f', '#403e4c', '#646478'] },
    { id: 'espresso', label: '深棕', ramp: ['#1a0e08', '#2f1b11', '#46291a', '#613c27', '#80553a'] },
    { id: 'brown', label: '棕', ramp: ['#2e1a0e', '#55311b', '#774829', '#97623b', '#b98254'] },
    { id: 'auburn', label: '紅棕', ramp: ['#3a120c', '#6a1f15', '#913222', '#b34c31', '#cf704b'] },
    { id: 'ginger', label: '橘', ramp: ['#5a2008', '#9c4012', '#d2681e', '#ec8c34', '#f9b35c'] },
    { id: 'blonde', label: '金', ramp: ['#6e4a1a', '#ab7f34', '#d6ac54', '#eac874', '#f7e2a0'] },
    { id: 'platinum', label: '白金', ramp: ['#8a8070', '#bfb5a2', '#dfd7c4', '#efe9da', '#fcf9f0'] },
    { id: 'grey', label: '灰', ramp: ['#3c3c44', '#66666e', '#8e8e96', '#b0b0b6', '#d4d4d8'] },
    { id: 'white', label: '銀白', ramp: ['#6a6e7a', '#a6aab4', '#d4d6dc', '#e9ebef', '#ffffff'] },
    { id: 'blue', label: '藍', ramp: ['#0e1a44', '#1d3472', '#2d54aa', '#4a78ce', '#7aa4e8'] },
    { id: 'pink', label: '粉紅', ramp: ['#5e1838', '#9c2e60', '#d2528c', '#ea7aaa', '#f7a8ca'] },
    { id: 'green', label: '綠', ramp: ['#0c2a1a', '#194b2d', '#2b7248', '#479660', '#76ba86'] },
    { id: 'purple', label: '紫', ramp: ['#220e3a', '#3f1d66', '#5f3194', '#804eb6', '#a67ad4'] },
    { id: 'teal', label: '水藍', ramp: ['#0a3036', '#14565e', '#1f828a', '#3ba8ac', '#6eccca'] },
    { id: 'red', label: '紅', ramp: ['#40080c', '#78131b', '#ae2129', '#d23b3b', '#ee6c60'] }
  ];
  var CLOTH = [
    { id: 'white', label: '白', ramp: ['#6e7080', '#c2c4d0', '#eeeef2', '#fbfbfc', '#ffffff'] },
    { id: 'cream', label: '米白', ramp: ['#7e705a', '#c9b999', '#e9ddc1', '#f4ecd8', '#fdf8ec'] },
    { id: 'lightgrey', label: '淺灰', ramp: ['#5a5c68', '#9496a2', '#bdbfc9', '#d5d7df', '#eceef2'] },
    { id: 'grey', label: '灰', ramp: ['#2e2f38', '#545662', '#7a7c88', '#9a9ca8', '#bec0ca'] },
    { id: 'charcoal', label: '炭灰', ramp: ['#121217', '#23242c', '#373844', '#4d4f5d', '#6c6e7e'] },
    { id: 'black', label: '黑', ramp: ['#060609', '#111117', '#1d1d26', '#30303c', '#4e4e60'] },
    { id: 'red', label: '紅', ramp: autoRamp('#c8202e') },
    { id: 'maroon', label: '酒紅', ramp: autoRamp('#7a1a2a') },
    { id: 'orange', label: '橘', ramp: autoRamp('#e57a20') },
    { id: 'mustard', label: '芥末黃', ramp: autoRamp('#c8961e') },
    { id: 'yellow', label: '黃', ramp: autoRamp('#f0c75e') },
    { id: 'olive', label: '橄欖綠', ramp: autoRamp('#6e7432') },
    { id: 'green', label: '綠', ramp: autoRamp('#2e8556') },
    { id: 'forest', label: '墨綠', ramp: autoRamp('#1e4a34') },
    { id: 'mint', label: '薄荷', ramp: autoRamp('#7cc8a4') },
    { id: 'teal', label: '水藍', ramp: autoRamp('#3fb6c9') },
    { id: 'sky', label: '天藍', ramp: autoRamp('#78aee0') },
    { id: 'blue', label: '藍', ramp: autoRamp('#2364b4') },
    { id: 'navy', label: '海軍藍', ramp: autoRamp('#1e2e5c') },
    { id: 'purple', label: '紫', ramp: autoRamp('#6c40a4') },
    { id: 'lavender', label: '薰衣草', ramp: autoRamp('#a890d0') },
    { id: 'pink', label: '粉紅', ramp: autoRamp('#ec84a8') },
    { id: 'magenta', label: '桃紅', ramp: autoRamp('#c8306e') },
    { id: 'brown', label: '咖啡', ramp: autoRamp('#6e4228') },
    { id: 'camel', label: '駝色', ramp: autoRamp('#b88450') },
    { id: 'khaki', label: '卡其', ramp: ['#5c4c2e', '#94804e', '#bca674', '#d0bc8c', '#e4d4ac'] },
    { id: 'denim', label: '丹寧', ramp: ['#101c34', '#1f355c', '#315386', '#4d70a4', '#7494c0'] },
    { id: 'lightdenim', label: '淺丹寧', ramp: ['#24365a', '#46638f', '#6a88b6', '#8aa8ce', '#b2cae4'] },
    { id: 'gold', label: '金', ramp: ['#4e3206', '#8a5e10', '#c8961e', '#e8bc44', '#fae08a'] }
  ];
  var METAL = {
    gold: ['#4e3206', '#8f6212', '#cf9e22', '#efc64a', '#fff2ac'],
    silver: ['#30323c', '#6a6e7a', '#a6aab4', '#d2d4dc', '#ffffff'],
    black: ['#050507', '#101014', '#1e1e26', '#3a3a46', '#6a6a7a'],
    brown: ['#24120a', '#4a2a16', '#6e4426', '#8e6040', '#b28462']
  };
  function byId(list) { var o = {}; list.forEach(function (x) { o[x.id] = x; }); return o; }
  var SKIN = byId(SKINS), HAIRCOL = byId(HAIRC), CLOTHCOL = byId(CLOTH);
  function cloth(id) { return (CLOTHCOL[id] || CLOTHCOL.grey).ramp; }
  function hairRamp(id) { return (HAIRCOL[id] || HAIRCOL.black).ramp; }
  function anyRamp(id) { if (!id) return null; if (METAL[id] && id !== 'black') return METAL[id]; if (CLOTHCOL[id]) return CLOTHCOL[id].ramp; if (HAIRCOL[id]) return HAIRCOL[id].ramp; if (METAL[id]) return METAL[id]; if (/^#[0-9a-f]{3,6}$/i.test(id)) return autoRamp(id); return null; }

  // ===================================================================== 合成緩衝
  // 小人座標：(0,0)＝腳底中點（地面那一列）；x 往右、y 往下；身體中線在 x −0.5（兩腳之間）
  var BW = 72, BH = 72, AX = 36, AY = 56;
  function Comp() {
    this.m = new Int16Array(BW * BH); this.t = new Int8Array(BW * BH); this.p = new Int16Array(BW * BH);
    this.ramps = [null]; this.mid = {}; this.names = [null]; this.parts = [null]; this.cur = 0; this.anch = {};
  }
  Comp.prototype.reg = function (name, ramp) { if (this.mid[name] != null) { this.ramps[this.mid[name]] = ramp; return this.mid[name]; } this.ramps.push(ramp); this.names.push(name); return (this.mid[name] = this.ramps.length - 1); };
  // ink：這塊壓在別塊上面時，會讓下面那塊在交界畫一圈深色內線；under：這塊會被壓出內線
  Comp.prototype.begin = function (name, o) { this.parts.push({ name: name, ink: !(o && o.ink === false), under: !(o && o.under === false) }); this.cur = this.parts.length - 1; return this.cur; };
  Comp.prototype.idx = function (x, y) { x = Math.floor(x) + AX; y = Math.floor(y) + AY; if (x < 0 || y < 0 || x >= BW || y >= BH) return -1; return y * BW + x; };
  Comp.prototype.put = function (x, y, mat, tone) {
    var i = this.idx(x, y); if (i < 0) return; var id = typeof mat === 'number' ? mat : this.mid[mat];
    if (!id) return; this.m[i] = id; this.t[i] = clamp(tone == null ? 2 : tone, 0, 5); this.p[i] = this.cur;
  };
  Comp.prototype.tone = function (x, y, tone) { var i = this.idx(x, y); if (i < 0 || !this.m[i]) return; this.t[i] = clamp(tone, 0, 4); };
  Comp.prototype.get = function (x, y) { var i = this.idx(x, y); return i < 0 ? 0 : this.m[i]; };
  Comp.prototype.getT = function (x, y) { var i = this.idx(x, y); return i < 0 ? -1 : this.t[i]; };
  Comp.prototype.mat = function (x, y) { var i = this.idx(x, y); return i < 0 || !this.m[i] ? null : this.names[this.m[i]]; };
  Comp.prototype.part = function (x, y) { var i = this.idx(x, y); return i < 0 || !this.m[i] ? null : this.parts[this.p[i]].name; };
  Comp.prototype.clear = function (x, y) { var i = this.idx(x, y); if (i >= 0) this.m[i] = 0; };

  // 字母圖章：leg＝{ 字母: [mat, tone] | 'clear' | function(x, y) → [mat, tone] }；flipX 讓同一張圖章左右反
  function stamp(C, rows, x, y, leg, flipX) {
    if (!rows) return;
    for (var j = 0; j < rows.length; j++) { var r = rows[j], w = r.length;
      for (var i = 0; i < w; i++) { var ch = r.charAt(flipX ? w - 1 - i : i), L = leg[ch]; if (!L) continue;
        if (L === 'clear') { C.clear(x + i, y + j); continue; }
        if (typeof L === 'function') { L = L(x + i, y + j, i, j); if (!L) continue; }
        C.put(x + i, y + j, L[0], L[1]); } }
  }
  function tones(mat) { return { x: [mat, 0], D: [mat, 1], h: [mat, 2], H: [mat, 3], W: [mat, 4] }; }
  function extend(a, b) { var o = {}, k; for (k in a) o[k] = a[k]; for (k in b) o[k] = b[k]; return o; }
  // 半張圖章（左半＋中線）鏡射成整張；右半的亮面字母（H、W）換回本色，光一律從左上來
  function mirror(half, odd) {
    return half.map(function (r) {
      if (!r) return '';
      var L = r.split(''), R = (odd ? L.slice(0, -1) : L.slice()).reverse().map(function (c) { return c === 'H' || c === 'W' ? 'h' : c === 'l' ? 'c' : c; });
      return L.join('') + R.join('');
    });
  }

  // ===================================================================== 後製：內線、外框、上色
  function finish(C, opts) {
    opts = opts || {};
    var m = C.m, t = C.t, p = C.p, parts = C.parts, i, x, y;
    // 1) 內線：後面那塊碰到前面那塊（前面那塊 ink）→ 後面那格壓成最深
    if (opts.inner !== false) {
      var dark = new Uint8Array(BW * BH);
      for (y = 1; y < BH - 1; y++) for (x = 1; x < BW - 1; x++) {
        i = y * BW + x; if (!m[i]) continue; var me = p[i]; if (!parts[me] || !parts[me].under) continue;
        var nb = [i - 1, i + 1, i - BW, i + BW];
        for (var k = 0; k < 4; k++) { var q = nb[k]; if (m[q] && p[q] > me && parts[p[q]].ink && parts[p[q]].name !== parts[me].name) { dark[i] = 1; break; } }
      }
      for (i = 0; i < m.length; i++) if (dark[i]) t[i] = 5;   // 5＝內線（描邊色混這塊最深色）
    }
    // 2) 上色＋外框
    var minx = BW, miny = BH, maxx = -1, maxy = -1;
    for (y = 0; y < BH; y++) for (x = 0; x < BW; x++) if (m[y * BW + x]) { if (x < minx) minx = x; if (x > maxx) maxx = x; if (y < miny) miny = y; if (y > maxy) maxy = y; }
    if (maxx < 0) return { w: 1, h: 1, ax: 0, ay: 1, data: new Uint8ClampedArray(4), anchors: C.anch };
    var ol = opts.outline === false ? 0 : 1;
    minx -= ol; miny -= ol; maxx += ol; maxy += ol;
    var W = maxx - minx + 1, H = maxy - miny + 1, data = new Uint8ClampedArray(W * H * 4);
    var cache = {};
    var lineRGB = hex2rgb(opts.outlineColor || LINE);
    function rgbOf(mat, tone) {
      var key = mat * 8 + tone; if (cache[key]) return cache[key];
      if (tone === 5) { var d0 = hex2rgb(C.ramps[mat][0]); return (cache[key] = [lineRGB[0] * 0.45 + d0[0] * 0.55, lineRGB[1] * 0.45 + d0[1] * 0.55, lineRGB[2] * 0.45 + d0[2] * 0.55]); }
      return (cache[key] = hex2rgb(C.ramps[mat][tone]));
    }
    for (y = miny; y <= maxy; y++) for (x = minx; x <= maxx; x++) {
      var o = ((y - miny) * W + (x - minx)) * 4, rgb = null;
      if (x >= 0 && y >= 0 && x < BW && y < BH && m[y * BW + x]) { i = y * BW + x; rgb = rgbOf(m[i], t[i]); }
      else if (ol) {
        var best = 0;
        [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].forEach(function (q) { if (!best && q[0] >= 0 && q[1] >= 0 && q[0] < BW && q[1] < BH && m[q[1] * BW + q[0]]) best = m[q[1] * BW + q[0]]; });
        if (best) { var dk = rgbOf(best, 0); rgb = [lineRGB[0] * 0.7 + dk[0] * 0.3, lineRGB[1] * 0.7 + dk[1] * 0.3, lineRGB[2] * 0.7 + dk[2] * 0.3]; }
      }
      if (rgb) { data[o] = rgb[0]; data[o + 1] = rgb[1]; data[o + 2] = rgb[2]; data[o + 3] = 255; }
    }
    return { w: W, h: H, ax: AX - minx, ay: AY - miny, data: data, anchors: C.anch };
  }

  //@@CODE@@
  // ===================================================================== 頭（頭框：側面 15×14、正面／背面 16×14）
  // 字母：c 皮膚本色、d 陰、l 亮、e 耳朵（耳朵最後才畫，壓在頭髮上）
  var HEAD_AT = { side: [-7, -29], front: [-8, -29], back: [-8, -29] };
  var SKULL = {
    side: [
      '.....ccccc.....',
      '...ccccccccc...',
      '..ccccccccccc..',
      '.ccccccccccccc.',
      '.ccccccccccccc.',
      'ccccccccccccccc',
      'ccccccccccccccc',
      'cccccccccccccccc'.slice(0, 15),
      'ccccccccccccccd',
      'ccccccccccccccd',
      '.cccccccccccccd',
      '.ccccccccccccd.',
      '...dcccccccccd.',
      '......ddcccd...'
    ],
    front: mirror([
      '......cc',
      '....cccc',
      '...ccccc',
      '..cccccc',
      '.ccccccc',
      '.ccccccc',
      '.ccccccc',
      '.ccccccc',
      '.ccccccc',
      '.ccccccc',
      '.ccccccc',
      '..cccccc',
      '...dcccc',
      '.....ddc'
    ])
  };
  SKULL.back = SKULL.front;
  // 耳朵（頭框座標 [x, y, tone]）
  var EARS = {
    side: [[3, 8, 2], [4, 8, 2], [3, 9, 2], [4, 9, 1], [3, 10, 2], [4, 10, 2]],
    front: [[0, 8, 3], [0, 9, 1], [0, 10, 2], [15, 8, 2], [15, 9, 1], [15, 10, 1]],
    back: [[0, 8, 3], [0, 9, 2], [0, 10, 1], [15, 8, 2], [15, 9, 2], [15, 10, 1]]
  };
  // 臉的位置（頭框座標）
  var FACE = {
    side: { eyeN: [8, 8], eyeF: [12, 8], browY: 6, mouth: [10, 11], cheekN: [7, 10], cheekF: [13, 10] },
    front: { eyeN: [5, 8], eyeF: [10, 8], browY: 6, mouth: [7, 11], cheekN: [3, 10], cheekF: [12, 10] }
  };

  var EYES = [
    { id: 'dot', label: '豆豆眼' }, { id: 'round', label: '圓眼' }, { id: 'big', label: '大眼' }, { id: 'sleepy', label: '睏眼' },
    { id: 'happy', label: '笑眼' }, { id: 'lash', label: '睫毛' }, { id: 'narrow', label: '瞇眼' }, { id: 'sharp', label: '銳眼' }
  ];
  var BROWS = [
    { id: 'soft', label: '淡眉' }, { id: 'thick', label: '粗眉' }, { id: 'angry', label: '怒眉' }, { id: 'raised', label: '挑眉' }, { id: 'worried', label: '八字眉' }, { id: 'none', label: '無' }
  ];
  var MOUTHS = [
    { id: 'neutral', label: '平' }, { id: 'smile', label: '微笑' }, { id: 'grin', label: '露齒笑' }, { id: 'smirk', label: '歪嘴笑' },
    { id: 'frown', label: '嘟嘴' }, { id: 'open', label: '張嘴' }, { id: 'flat', label: '面無表情' }, { id: 'cat', label: '貓嘴' }
  ];
  var CHEEKS = [{ id: 'none', label: '無' }, { id: 'blush', label: '腮紅' }, { id: 'freckles', label: '雀斑' }, { id: 'both', label: '雀斑＋腮紅' }];
  // 表情（姿勢可以蓋掉眼睛／嘴／眉）
  var EXPR = {
    hurt: { eyes: 'shut', mouth: 'open', brows: 'worried' }, ko: { eyes: 'x', mouth: 'open', brows: 'none' },
    cheer: { eyes: 'happy', mouth: 'grin' }, angry: { brows: 'angry', mouth: 'frown' }, talk: { mouth: 'open' },
    down: { eyes: 'down' }, effort: { eyes: 'shut', brows: 'angry', mouth: 'grin' }, shrug: { brows: 'raised', mouth: 'flat', eyes: 'sleepy' }
  };

  function drawFace(C, hx, hy, spec, ex, view) {
    var F = FACE[view], eyes = ex.eyes || spec.eyes, mouth = ex.mouth || spec.mouth, brows = ex.brows || spec.brows;
    var side = view === 'side';
    function P(x, y, mat, t) { C.put(hx + x, hy + y, mat, t); }
    // 眼睛：(x, y)＝主瞳孔上緣；o＝往臉外側的方向（側面遠眼、正面右眼往右）
    function eye(x, y, o, far) {
      switch (eyes) {
        case 'round': P(x, y, 'eyek', 2); P(x, y + 1, 'eyek', 2); P(x - o, y, 'eyek', 2); P(x - o, y + 1, 'eyek', 1); P(x - o, y, 'eyek', 4); break;
        case 'big':
          P(x, y - 1, 'eyek', 2); P(x, y, 'eyek', 2); P(x, y + 1, 'eyek', 2);
          if (!(side && far)) { P(x - o, y - 1, 'eyek', 4); P(x - o, y, 'eyek', 2); P(x - o, y + 1, 'eyek', 1); }
          else P(x, y - 1, 'eyek', 4);
          break;
        case 'sleepy': P(x, y, 'skin', 1); P(x, y + 1, 'eyek', 2); P(x - o, y + 1, 'eyek', 1); break;
        case 'happy': P(x - 1, y + 1, 'eyek', 2); P(x, y, 'eyek', 2); P(x + 1, y + 1, 'eyek', 2); break;
        case 'lash': P(x, y, 'eyek', 2); P(x, y + 1, 'eyek', 2); P(x + o, y - 1, 'eyek', 2); P(x + o, y, 'eyek', 1); break;
        case 'narrow': P(x, y + 1, 'eyek', 2); P(x - o, y + 1, 'eyek', 2); break;
        case 'sharp': P(x - o, y, 'eyek', 2); P(x, y, 'eyek', 2); P(x, y + 1, 'eyek', 2); break;
        case 'shut': P(x - 1, y, 'eyek', 2); P(x, y + 1, 'eyek', 2); P(x + 1, y, 'eyek', 2); break;
        case 'x': P(x - 1, y - 1, 'eyek', 2); P(x + 1, y - 1, 'eyek', 2); P(x, y, 'eyek', 2); P(x - 1, y + 1, 'eyek', 2); P(x + 1, y + 1, 'eyek', 2); break;
        case 'down': P(x, y + 1, 'eyek', 2); P(x, y + 2, 'eyek', 2); break;
        default: P(x, y, 'eyek', 2); P(x, y + 1, 'eyek', 2);
      }
    }
    if (side) { eye(F.eyeN[0], F.eyeN[1], -1, false); eye(F.eyeF[0], F.eyeF[1], 1, true); }
    else { eye(F.eyeN[0], F.eyeN[1], -1, false); eye(F.eyeF[0], F.eyeF[1], 1, false); }
    // 眉毛（被瀏海蓋住就看不到，跟真的一樣）
    function brow(x, o) {
      var y = F.browY;
      function B(xx, yy, t) { var m = C.mat(hx + xx, hy + yy); if (m && m !== 'skin' && m !== 'skinsh') return; P(xx, yy, 'brow', t == null ? 2 : t); }
      switch (brows) {
        case 'none': break;
        case 'thick': B(x - 1, y); B(x, y); B(x + 1, y); B(x - o, y - 1, 1); break;
        case 'angry': B(x - o, y - 1); B(x, y); B(x + o, y + 1); break;
        case 'raised': B(x - o, y); B(x, y - 1); B(x + o, y - 1); break;
        case 'worried': B(x - o, y + 1); B(x, y); B(x + o, y - 1 + 1); break;
        default: B(x, y, 3); B(x + o, y, 3);
      }
    }
    if (side) { brow(F.eyeN[0], -1); brow(F.eyeF[0], 1); } else { brow(F.eyeN[0], -1); brow(F.eyeF[0], 1); }
    // 嘴
    var mx = F.mouth[0], my = F.mouth[1];
    switch (mouth) {
      case 'smile': P(mx - 1, my - 1, 'mouth', 1); P(mx, my, 'mouth', 1); P(mx + 1, my, 'mouth', 1); P(mx + 2, my - 1, 'mouth', 1); break;
      case 'grin': P(mx - 1, my, 'mouth', 0); P(mx, my, 'teeth', 2); P(mx + 1, my, 'teeth', 2); P(mx + 2, my, 'mouth', 0); P(mx, my + 1, 'mouth', 0); P(mx + 1, my + 1, 'mouth', 0); break;
      case 'smirk': P(mx, my, 'mouth', 1); P(mx + 1, my, 'mouth', 1); P(mx + 2, my - 1, 'mouth', 1); break;
      case 'frown': P(mx - 1, my + 1, 'mouth', 1); P(mx, my, 'mouth', 1); P(mx + 1, my, 'mouth', 1); P(mx + 2, my + 1, 'mouth', 1); break;
      case 'open': P(mx, my, 'mouth', 0); P(mx + 1, my, 'mouth', 0); P(mx, my + 1, 'mouth', 2); P(mx + 1, my + 1, 'mouth', 0); break;
      case 'flat': P(mx - 1, my, 'mouth', 1); P(mx, my, 'mouth', 1); P(mx + 1, my, 'mouth', 1); break;
      case 'cat': P(mx - 1, my - 1, 'mouth', 1); P(mx, my, 'mouth', 1); P(mx + 1, my - 1, 'mouth', 1); P(mx + 2, my, 'mouth', 1); P(mx + 3, my - 1, 'mouth', 1); break;
      default: P(mx, my, 'mouth', 1); P(mx + 1, my, 'skin', 1);
    }
    // 臉頰
    var ck = spec.cheeks;
    if (ck === 'blush' || ck === 'both') {
      P(F.cheekN[0] - 1, F.cheekN[1], 'blush', 2); P(F.cheekN[0], F.cheekN[1], 'blush', 3);
      if (side) P(F.cheekF[0], F.cheekF[1], 'blush', 2); else { P(F.cheekF[0], F.cheekF[1], 'blush', 3); P(F.cheekF[0] + 1, F.cheekF[1], 'blush', 2); }
    }
    if (ck === 'freckles' || ck === 'both') {
      var fy = F.cheekN[1] - 1;
      P(F.cheekN[0] - 1, fy, 'freck', 2); P(F.cheekN[0] + 1, fy, 'freck', 2); P(F.cheekN[0], fy + 1 + (ck === 'both' ? 1 : 0), 'freck', 2);
      P(F.cheekF[0], fy, 'freck', 2); if (!side) P(F.cheekF[0] + 2, fy, 'freck', 2); P(F.cheekF[0] + 1, fy + 1 + (ck === 'both' ? 1 : 0), 'freck', 2);
    }
  }

  // ===================================================================== 髮型
  // 每款：s＝側面（蓋在頭上；ox −2、oy −2：第 0 欄＝頭框 x −2、第 0 列＝頭框 y −2）、sb＝側面後層（垂在身體後面）、
  //       f＝正面（左半 9 欄＝頭框 x −1..7，自動鏡射成 18 欄）、fb＝正面後層、bk＝背面多出來的長髮（整列，頭框座標）。
  //       nape＝背面頭髮蓋到頭框第幾列；ears＝false 時耳朵被頭髮蓋住；shine＝光頭亮點；bkTail＝背面看到的馬尾／包包頭。
  // 字母：h 本色、H 亮、W 高光、D 陰、x 最深（髮束之間的線）；正面右半的 H／W 自動換回 h（光一律從左上來）
  var HAIRS = [];
  function defHair(id, label, o) { o.id = id; o.label = label; HAIRS.push(o); }
  function S(rows, oy) { return { ox: -2, oy: oy == null ? -2 : oy, rows: rows }; }
  function Fh(rows, oy) { return { ox: -1, oy: oy == null ? -2 : oy, rows: mirror(rows) }; }
  // 共用的頭頂（側面 r0–r7、正面 r0–r6）
  var TOP_S = [
    '........hh.........',
    '.....hhhhhhhh......',
    '...hhhhHHHHhhhh....',
    '..hhhhHWWWHhhhhh...',
    '.hhhhhhHHHhhhhhhh..',
    '.hhhhhhhhhhhhhhhhh.',
    'hhhhhhhhhhhhxhhhhh.',
    'hhhhhhhhhxhhhhxhhD.'];
  var TOP_F = [
    '.........',
    '.....hhhh',
    '...hhhHHH',
    '..hhhHWWH',
    '.hhhhhHHh',
    '.hhhhhhhh',
    'hhhhhhhhh',
    'hhhxhhhhh'];

  defHair('short', '短髮', { nape: 11,
    s: S(TOP_S.concat([
      '.hhhhhhhD..hD..hD..',
      'hhhhhhD............',
      '.hhhh..............',
      'hhhhh..............',
      '.hhhD..............',
      '..hD...............'])),
    f: Fh(TOP_F.concat([
      '.hhhD.hhD',
      'hhhh.....',
      '.hh......',
      '.hD......',
      '..D......']))
  });
  defHair('buzz', '平頭', { nape: 10,
    s: S([
      '...................',
      '...................',
      '.....hhhhhhh.......',
      '...hhhHHHhhhhh.....',
      '..hhhHWHhhDhhhh....',
      '..hhhhHhhhhhhDhh...',
      '..hhDhhhhDhhhhhh...',
      '..hhhhhDhhhhDhhhD..',
      '..hhhhhhD..........',
      '..hhDhD............',
      '..hhD..............',
      '..hhh..............',
      '..hD...............']),
    f: Fh([
      '.........',
      '.........',
      '......hhh',
      '....hhHHh',
      '...hHWHhh',
      '..hhhhDhh',
      '..hDhhhhD',
      '..hhhDhhh',
      '..hD.....',
      '..D......'])
  });
  defHair('sidepart', '旁分', { nape: 11,
    s: S([
      '...................',
      '......hhhhhh.......',
      '....hhhhHHHHhhh....',
      '..hhhhHHWWWHhhhhh..',
      '.hhhhhhHHHhhhhhhhh.',
      '.hhhhhhhhhhhhhhhhhh',
      'hhhhhhhhhhxhhhhhhhh',
      'hhhhhhhhhhhxhhhhhD.',
      '.hhhhhhhD..hhhD....',
      'hhhhhhD............',
      '.hhhh..............',
      'hhhhh..............',
      '.hhhD..............',
      '..hD...............']),
    f: { ox: -1, oy: -2, rows: [
      '..................',
      '.....hhhhhhhh.....',
      '...hhhhHHHHhhhh...',
      '..hhhHhxHWWHhhhh..',
      '.hhhhhhxhHHhhhhhh.',
      '.hhhhhhxhhhhhhhhh.',
      'hhhhhhhxhhhhhhhhhh',
      'hhhhhhDhhhhhhhxhhh',
      '.hhhD...hhhhhhhhhh',
      'hhhh.........hDhhh',
      '.hh...........hhh.',
      '.hD...........hhD.',
      '..D............D..'] }
  });
  defHair('bangs', '齊瀏海', { nape: 11,
    s: S(TOP_S.slice(0, 6).concat([
      'hhhhhhhhhhhhhhhhhh.',
      'hhhhhhhhhhhhhhhhhh.',
      '.hhhhhhhhDDDDDDDD..',
      'hhhhhhD............',
      '.hhhh..............',
      'hhhhh..............',
      '.hhhD..............',
      '..hD...............'])),
    f: Fh(TOP_F.slice(0, 7).concat([
      'hhhhhhhhh',
      '.hhhhhhhh',
      'hhDDDDDDD',
      '.hh......',
      '.hD......',
      '..D......']))
  });
  defHair('spiky', '刺蝟頭', { nape: 11,
    s: S([
      '.....h...h.........',
      '.....hh..hh..h.....',
      '..h..hhhhhhhhh.....',
      '..hhhhhHHHhhhhh....',
      '...hhhHWWWHhhhhh...',
      '.hhhhhhHHHhhhhhhhh.',
      'hhhhhhhhhhhhhhhhhhh',
      '.hhhhhhhhhhhxhhhhh.',
      'hhhhhhhhhxhhhhxhhhh',
      '.hhhhhhhD.hD.hhD...',
      'hhhhhhD.......D....',
      '.hhhh..............',
      'hhhhh..............',
      '.hhhD..............',
      '..hD...............'], -4),
    f: Fh([
      '...h.....',
      '...hh..h.',
      '.h.hhh.hh',
      '.hhhhhhhh',
      '..hhhHHHH',
      '.hhhHWWHh',
      'hhhhhhHHh',
      '.hhhhhhhh',
      'hhhhhhhhh',
      'hhhxhhhhx',
      '.hhD.hhD.',
      'hhhh..D..',
      '.hh......',
      '.hD......',
      '..D......'], -4)
  });
  defHair('curly', '捲髮', { nape: 12,
    s: S([
      '......hh.hh........',
      '....hhhhhhhhhh.....',
      '..hhhhHHhhHHhhhh...',
      '.hhhHHWHhHWHhhhhh..',
      'hhhhhHHhhhHhhhxhhh.',
      'hhxhhhhhxhhhhhhhhhh',
      'hhhhhhxhhhhxhhhhxhh',
      'hhhxhhhhhhhhhhxhhhD',
      'hhhhhhhxhhhhDhhDhD.',
      'hhxhhhhhDh..h..D...',
      'hhhhhxhD...........',
      'hhhhhhh............',
      'xhhhhD.............',
      'hhhxhD.............',
      '.hhhD..............',
      '..DD...............']),
    f: Fh([
      '......hh.',
      '...hhhhhh',
      '..hhHHhhH',
      '.hhHWHhHW',
      'hhhhHhhhH',
      'hhxhhhhxh',
      'hhhhhxhhh',
      'hxhhhhhhh',
      'hhhhxhDhh',
      'hhhD.h.D.',
      'hhxh.....',
      'hhhh.....',
      'xhhD.....',
      '.hD......',
      '..D......']),
    ears: false
  });
  defHair('afro', '爆炸頭', { nape: 12, ears: false,
    s: S([
      '....hhhhhhhh.......',
      '..hhhhhHHhhhhh.....',
      '.hhhhHHWWHHhhhhh...',
      'hhhhhHWWHhhhxhhhh..',
      'hhxhhhHHhhhhhhhhhh.',
      'hhhhhhhhhxhhhhhxhhh',
      'hhhhxhhhhhhhhhhhhhh',
      'hhhhhhhhhhhxhhhhhhh',
      'xhhhhhhxhhhhhhhhhhD',
      'hhhhhhhhhhhhhhhhhD.',
      'hhhhxhhhD..........',
      'hhhhhhhD...........',
      'hhxhhhh............',
      'hhhhhhD............',
      '.hhhhD.............',
      '..DDD..............'], -4),
    f: Fh([
      '....hhhhh',
      '..hhhhhHH',
      '.hhhHHWWH',
      'hhhHWWHhh',
      'hhxhHHhhh',
      'hhhhhhhxh',
      'hhhxhhhhh',
      'hhhhhhhhh',
      'xhhhhxhhh',
      'hhhhhhhhh',
      'hhhhhD...',
      'hxhhh....',
      'hhhh.....',
      'hhhD.....',
      '.hhD.....',
      '..D......'], -4)
  });
  defHair('bob', '妹妹頭', { nape: 12, ears: false,
    s: S(TOP_S.concat([
      'hhhhhhhhDhhhhhhh...',
      'hhhhhhhh.......D...',
      'hhhhhhhh...........',
      'hhhhhhhD...........',
      'hhhhhhhD...........',
      'hhhhhhD............',
      'hhhhhhD............',
      '.hDDDD.............'])),
    f: Fh(TOP_F.concat([
      'hhhhhhhhh',
      'hhhDDDDDD',
      'hhh......',
      'hhh......',
      'hhD......',
      'hhD......',
      'hhD......',
      'hD.......',
      '.D.......']))
  });
  defHair('long', '長直髮', { nape: 12, ears: false,
    s: S(TOP_S.concat([
      'hhhhhhhhD..hD..hD..',
      'hhhhhhhh...........',
      'hhhhhhhh...........',
      'hhhhhhhD...........',
      'hhhhhhD............',
      'hhhhhhD............',
      'hhhhhD.............',
      'hhhhhD.............',
      'hhhhD..............',
      '.hhhD..............'])),
    sb: { ox: -3, oy: 12, rows: [
      'hhhhhhh',
      'hhhhhhh',
      'hhhhhhD',
      'hhhhhhD',
      'hhhhhD.',
      'hhhhhD.',
      'hhhhD..',
      'hhhDD..',
      '.DD....'] },
    f: Fh(TOP_F.concat([
      '.hhhD.hhD',
      'hhhh.....',
      'hhh......',
      'hhh......',
      'hhD......',
      'hhD......',
      'hhD......',
      'hhD......',
      'hD.......',
      'hD.......',
      'hD.......',
      'D........'])),
    fb: { ox: -3, oy: 10, rows: mirror([
      'hh.......',
      'hhh......',
      'hhh......',
      'hhh......',
      'hhD......',
      'hhD......',
      'hD.......',
      'D........']) },
    bk: { ox: 0, oy: 12, rows: [
      '.hhhhhhhhhhhhhh.',
      '.hhhhhhhhhhhhhh.',
      '.hhhhhhhhhhhhhh.',
      '.hhhhhhhhhhhhhD.',
      '.hhhhhhhhhhhhhD.',
      '..hhhhhhhhhhhD..',
      '..hhhhhhhhhhhD..',
      '..hhhhhhhhhhD...',
      '...DDhhDDhhDD...'] }
  });
  defHair('longbangs', '長髮齊瀏海', { nape: 12, ears: false,
    s: S(TOP_S.slice(0, 6).concat([
      'hhhhhhhhhhhhhhhhhh.',
      'hhhhhhhhhhhhhhhhhh.',
      'hhhhhhhhhDDDDDDDD..',
      'hhhhhhhh...........',
      'hhhhhhhh...........',
      'hhhhhhhD...........',
      'hhhhhhD............',
      'hhhhhhD............',
      'hhhhhD.............',
      'hhhhhD.............',
      'hhhhD..............',
      '.hhhD..............'])),
    sb: null, f: null, fb: null, bk: null   // 下面補
  });
  defHair('wavy', '大波浪', { nape: 12, ears: false,
    s: S(TOP_S.concat([
      'hhhhhhhhD..hD..hD..',
      'hhhhhhhhh..........',
      'xhhhhhhhh..........',
      'hhhhhhhxD..........',
      '.hhhhhhhD..........',
      'hhxhhhhD...........',
      'hhhhhhhD...........',
      '.hhhxhhD...........',
      'hhhhhhD............',
      '.hDhhD.............'])),
    sb: { ox: -4, oy: 12, rows: [
      '.hhhhhh',
      'hhhhhhh',
      'hhhxhhD',
      '.hhhhhD',
      'hhhhhD.',
      'hhxhhD.',
      '.hhhD..',
      '..DD...'] },
    f: Fh(TOP_F.concat([
      '.hhhD.hhD',
      'hhhh.....',
      'hhhh.....',
      '.hhh.....',
      'hhhD.....',
      'hhxh.....',
      '.hhh.....',
      'hhhD.....',
      'hhhh.....',
      '.hhD.....',
      'hhD......',
      '.D.......'])),
    fb: { ox: -3, oy: 10, rows: mirror(['hhh......', 'hhhh.....', '.hhh.....', 'hhhD.....', 'hhhh.....', '.hhD.....', 'hD.......']) },
    bk: { ox: -1, oy: 12, rows: [
      '.hhhhhhhhhhhhhhhh.',
      'hhhhhhhhhhhhhhhhhh',
      '.hhhhhhhhhhhhhhhD.',
      'hhhhhxhhhhhxhhhhhh',
      '.hhhhhhhhhhhhhhhD.',
      '..hhhhhhhhhhhhhD..',
      '..hhhDhhhhhDhhhD..',
      '...DD..DDD...DD...'] }
  });
  defHair('ponytail', '馬尾', { nape: 11,
    s: S([
      '...................',
      '......hhhhhhh......',
      '....hhhHHHHhhhh....',
      '..hhhhHWWWHhhhhh...',
      '.hhhhhhHHHhhhhhhh..',
      '.hhhhhhhhhhhhhhhhh.',
      'hhhhhhhhhhhhxhhhhh.',
      '.hhhhhhhhxhhhhxhhD.',
      '..hhhhhhD..hD..hD..',
      '..hhhhD............',
      '..hhh..............',
      '..hhh..............',
      '..hD...............']),
    sb: { ox: -6, oy: 3, rows: [
      '....hhh',
      '...hhhh',
      '..hhhhD',
      '..hhhhD',
      '.hhhhD.',
      '.hhhhD.',
      '.hhhD..',
      '.hhhD..',
      '..hhD..',
      '..hD...',
      '...D...'] },
    f: Fh(TOP_F.concat([
      '.hhhD.hhD',
      '.hhh.....',
      '.hh......',
      '.hD......'])),
    fb: { ox: -3, oy: 6, rows: mirror(['.h.......', 'hh.......', 'hhD......', 'hD.......', 'hD.......', '.D.......']) },
    bkTail: { ox: 6, oy: 8, rows: ['.hhh.', 'hhhhh', 'hhhhD', 'hhhhD', '.hhhD', '.hhD.', '.hhD.', '..hD.', '..D..'] }
  });
  defHair('bun', '包包頭', { nape: 11,
    s: S([
      '.....hhhh..........',
      '....hHWHhh.........',
      '....hhHhhD.........',
      '.....xxxx..........',
      '....hhhhhhhh.......',
      '..hhhhHHHHhhhh.....',
      '.hhhhhHWWWHhhhhh...',
      '.hhhhhhHHHhhhhhhhh.',
      'hhhhhhhhhhhhxhhhhh.',
      '.hhhhhhhhxhhhhxhhD.',
      '..hhhhhhD..hD..hD..',
      '..hhhhD............',
      '..hhh..............',
      '..hhh..............',
      '..hD...............'], -5),
    f: Fh([
      '......hhh',
      '.....hHWh',
      '.....hHhh',
      '......xxx',
      '.....hhhh',
      '...hhhHHH',
      '..hhhHWWH',
      '.hhhhhHHh',
      '.hhhhhhhh',
      'hhhxhhhhh',
      '.hhhD.hhD',
      '.hhh.....',
      '.hh......',
      '.hD......'], -5),
    bkTail: { ox: 5, oy: -5, rows: ['.hhhh.', 'hhHWhh', 'hhhhhD', '.xxxx.'] }
  });
  defHair('mohawk', '龐克頭', { nape: 10,
    s: S([
      '.....hhh...........',
      '.....hHhh..........',
      '....hhHWhhh........',
      '....hhhHHhhhh......',
      '...hhhhhhhhhhhh....',
      '....DhhhhhhhhhhhD..',
      '...D.D.hhhhhhhhhhD.',
      '..D.D.D.D.D.D.D.D..',
      '...D.D.D...........',
      '..D.D..............',
      '...D...............'], -4),
    f: Fh([
      '.......hh',
      '.......hH',
      '......hhW',
      '......hhH',
      '......hhh',
      '...D.DhhD',
      '..D.D.hhh',
      '...D.D.D.',
      '..D......',
      '...D.....'], -4)
  });
  defHair('mullet', '鯔魚頭', { nape: 13,
    s: S(TOP_S.concat([
      '.hhhhhhhD..hD..hD..',
      'hhhhhhD............',
      'hhhhh..............',
      'hhhhh..............',
      'hhhhD..............',
      'hhhhD..............',
      'hhhD...............',
      'hhhD...............',
      '.hD................'])),
    f: Fh(TOP_F.concat([
      '.hhhD.hhD',
      'hhhh.....',
      '.hh......',
      'hhD......',
      'hhD......',
      'hD.......',
      'hD.......'])),
    bk: { ox: 1, oy: 12, rows: ['hhhhhhhhhhhhhh', 'hhhhhhhhhhhhhD', '.hhhhhhhhhhhD.', '.hhDhhhhDhhhD.', '..D..DD..D....'] }
  });
  defHair('bald', '光頭', { nape: -1, shine: true, s: null, f: null });
  defHair('horseshoe', '地中海', { nape: 11, shine: true, top: false,
    s: S([
      '...................',
      '...................',
      '...................',
      '...................',
      '...................',
      '...................',
      '..hhh..............',
      '.hhhhh.............',
      '.hhhhhD............',
      'hhhhhD.............',
      '.hhhh..............',
      'hhhhh..............',
      '.hhhD..............',
      '..hD...............']),
    f: Fh([
      '.........',
      '.........',
      '.........',
      '.........',
      '.........',
      '.........',
      '.h.......',
      'hhh......',
      'hhh......',
      'hhD......',
      '.hh......',
      '.hD......',
      '..D......'])
  });
  // 長髮齊瀏海：側面自己畫，其他沿用長直髮＋齊瀏海
  (function () {
    var L = null, B = null; HAIRS.forEach(function (h) { if (h.id === 'long') L = h; if (h.id === 'bangs') B = h; });
    var lb = null; HAIRS.forEach(function (h) { if (h.id === 'longbangs') lb = h; });
    lb.sb = L.sb; lb.fb = L.fb; lb.bk = L.bk;
    lb.f = Fh(TOP_F.slice(0, 7).concat([
      'hhhhhhhhh',
      'hhhhhhhhh',
      'hhDDDDDDD',
      'hhh......',
      'hhh......',
      'hhD......',
      'hhD......',
      'hhD......',
      'hhD......',
      'hD.......',
      'hD.......',
      'hD.......',
      'D........']));
  })();

  var HAIR = {}; HAIRS.forEach(function (h) { HAIR[h.id] = h; });

  // 背面的頭髮：頭框裡 y ≤ nape 的頭皮＋正面髮型的輪廓＋長髮，全塗成頭髮，再上光影（左上亮帶、右緣與下緣陰、幾條髮束線）
  var BACK_CACHE = {};
  function backHair(id) {
    if (BACK_CACHE[id]) return BACK_CACHE[id];
    var H = HAIR[id], px = {};
    if (!H || H.nape < 0) return (BACK_CACHE[id] = null);
    var sk = SKULL.back;
    if (H.top !== false) for (var y = 0; y < sk.length; y++) for (var x = 0; x < sk[y].length; x++) if (sk[y].charAt(x) !== '.' && y <= H.nape) px[x + ',' + y] = 1;
    function add(tp) { if (tp) tp.rows.forEach(function (r, j) { for (var i = 0; i < r.length; i++) if (r.charAt(i) !== '.') px[(i + tp.ox) + ',' + (j + tp.oy)] = 1; }); }
    if (H.top !== false) add(H.f); else {   // 地中海：只有後腦一圈
      for (var y2 = 6; y2 <= H.nape; y2++) for (var x2 = 0; x2 < 16; x2++) if (sk[y2] && sk[y2].charAt(x2) !== '.') px[x2 + ',' + y2] = 1;
    }
    add(H.bk);
    var out = [];
    Object.keys(px).forEach(function (k) {
      var p = k.split(',').map(Number), x = p[0], y = p[1], t = 2;
      var edgeR = !px[(x + 1) + ',' + y], edgeB = !px[x + ',' + (y + 1)], edgeL = !px[(x - 1) + ',' + y], edgeT = !px[x + ',' + (y - 1)];
      if (edgeB || edgeR) t = 1;
      else if ((edgeL || edgeT) && x < 9) t = 3;
      if (!edgeB && !edgeR && y >= 1 && y <= 3 && x >= 3 && x <= 7) t = (y === 2 && x >= 4 && x <= 6) ? 4 : 3;
      if (t === 2 && y >= 5 && y <= H.nape - 1 && (x === 5 || x === 10)) t = 1;   // 髮束線
      out.push([x, y, t]);
    });
    return (BACK_CACHE[id] = out);
  }

  // ===================================================================== 畫頭髮、耳朵
  function drawHair(C, spec, view, hx, hy) {
    var H = HAIR[spec.hair]; if (!H) return;
    var Ht = HAT[spec.hat], cut = Ht && spec.hat !== 'none' ? Ht.cut : null;
    C.begin('hair');
    var savedPart = C.cur;
    var leg = tones('hair');
    if (cut != null) {   // 戴帽子：帽沿以上的頭髮剪掉
      var cutY = hy + cut;
      leg = {}; Object.keys(tones('hair')).forEach(function (k) { var v = tones('hair')[k]; leg[k] = function (x, y) { return y < cutY ? null : v; }; });
    }
    if (view === 'back') {
      var bh = backHair(spec.hair);
      if (bh) bh.forEach(function (p) { if (cut != null && hy + p[1] < hy + cut) return; C.put(hx + p[0], hy + p[1], 'hair', p[2]); });
      if (H.bkTail) stamp(C, H.bkTail.rows, hx + H.bkTail.ox, hy + H.bkTail.oy, leg);
      return;
    }
    var tp = view === 'side' ? H.s : H.f;
    if (!tp) return;
    stamp(C, tp.rows, hx + tp.ox, hy + tp.oy, leg);
  }
  function drawEars(C, spec, view, hx, hy) {
    var H = HAIR[spec.hair];
    if (H && H.ears === false) return;
    var Ht = HAT[spec.hat]; if (Ht && spec.hat !== 'none' && Ht.ears === false) return;
    C.begin('ear');
    (EARS[view] || []).forEach(function (e) { C.put(hx + e[0], hy + e[1], 'skin', e[2]); });
    if (has(spec, 'earring')) { var e = view === 'side' ? [3, 11] : view === 'front' ? [0, 11] : [15, 11]; C.put(hx + e[0], hy + e[1], 'gold', 3); }
  }

  // ===================================================================== 身體（紙娃娃：軀幹＋手腳小圖，全部手點）
  // 字母：B 軀幹（上衣）、P 胯（褲頭）、L/l 近腿上段/下段、M/m 遠腿、K/O 近鞋面/鞋底、k/o 遠鞋、A 上臂 a 前臂 H 手
  var BUILDS = [{ id: 'slim', label: '纖瘦' }, { id: 'regular', label: '標準' }, { id: 'round', label: '圓潤' }];
  var BUILD = byId(BUILDS);
  // 軀幹：y −16（肩線，被下巴蓋住大半）到 −9（衣襬）；寬：側面 9/10/11、正面 8/10/12
  function torsoRows(build, view) {
    var w, rows = [], x0;
    if (view === 'side') { w = build === 'slim' ? 9 : build === 'round' ? 10 : 10; x0 = -5; }
    else { w = build === 'slim' ? 8 : build === 'round' ? 12 : 10; x0 = -w / 2; }
    for (var j = 0; j < 8; j++) {
      var a = 0, b = w - 1;
      if (j === 0) { a = 2; b = w - 3; }
      else if (j === 1) { a = 1; b = view === 'side' ? w - 1 : w - 2; }
      if (build === 'round') { if (view === 'side' && j >= 2 && j <= 6) b = w; if (view !== 'side' && (j === 0)) { a = 3; b = w - 4; } }
      rows.push({ y: -16 + j, a: x0 + a, b: x0 + b });
    }
    return { rows: rows, left: x0, right: x0 + w - 1 + (build === 'round' && view === 'side' ? 1 : 0), w: w };
  }
  // 胯：y −8、−7
  function hipRows(build, view) {
    var T = torsoRows(build, view), a = T.left + 1, b = view === 'side' ? T.left + 8 + (build === 'round' ? 1 : 0) : T.right - 1;
    if (view !== 'side' && build === 'slim') { a = T.left; b = T.right; }
    return [{ y: -8, a: a, b: b }, { y: -7, a: a, b: b }];
  }

  // ---------------------------------------------------------- 腿＋鞋（相對腳底；近腿在前）
  // 每個姿勢：N／F 各一條腿 { at:[x,y], rows } 與鞋 { at, rows }
  var LEGS = {
    side: {
      stand: { F: { at: [1, -6], rows: ['MMM', 'MMM', 'mmm', 'mmm'] }, Fs: { at: [1, -2], rows: ['kkk.', 'oooo'] },
               N: { at: [-4, -6], rows: ['LLLL', 'LLLL', 'llll', 'llll'] }, Ns: { at: [-4, -2], rows: ['KKKK.', 'OOOOO'] } },
      spread: { F: { at: [1, -6], rows: ['MMM..', '.MMM.', '.mmm.', '..mmm'] }, Fs: { at: [3, -2], rows: ['kkk.', 'oooo'] },
                N: { at: [-6, -6], rows: ['..LLLL', '.LLLL.', '.llll.', 'llll..'] }, Ns: { at: [-6, -2], rows: ['KKKK.', 'OOOOO'] } },
      passN: { F: { at: [1, -6], rows: ['MMM', 'MMM', 'mmm', 'mmm'] }, Fs: { at: [1, -2], rows: ['kkk.', 'oooo'] },
               N: { at: [-4, -6], rows: ['LLLL', '.lll', '.lll'] }, Ns: { at: [-3, -3], rows: ['KKKK.', 'OOOOO'] } },
      cross: { F: { at: [-3, -6], rows: ['...MMM', '..MMM.', '.mmm..', 'mmm...'] }, Fs: { at: [-4, -2], rows: ['kkk.', 'oooo'] },
               N: { at: [-4, -6], rows: ['LLLL..', '.LLLL.', '.llll.', '..llll'] }, Ns: { at: [-2, -2], rows: ['KKKK.', 'OOOOO'] } },
      passF: { F: { at: [1, -6], rows: ['MMM', 'mmm', 'mmm'] }, Fs: { at: [1, -3], rows: ['kkk.', 'oooo'] },
               N: { at: [-4, -6], rows: ['LLLL', 'LLLL', 'llll', 'llll'] }, Ns: { at: [-4, -2], rows: ['KKKK.', 'OOOOO'] } },
      // 坐：大腿往前平放、小腿垂下（屁股在 y −6）
      sit: { F: { at: [0, -6], rows: ['MMMMMM', '.....m', '....mm', '....mm'] }, Fs: { at: [4, -2], rows: ['kkk.', 'oooo'] },
             N: { at: [-4, -6], rows: ['LLLLLLL', 'LLLLLLL', '....lll', '....lll'] }, Ns: { at: [0, -2], rows: ['KKKK.', 'OOOOO'] } },
      // 跳起來（腳離地 3 格，腿收）
      jump: { F: { at: [1, -9], rows: ['MMM', 'mmm', '.mm'] }, Fs: { at: [1, -6], rows: ['kkk.', 'oooo'] },
              N: { at: [-4, -9], rows: ['LLLL', 'llll', 'lll.'] }, Ns: { at: [-5, -6], rows: ['KKKK.', 'OOOOO'] } },
      // 被打：退半步
      back: { F: { at: [1, -6], rows: ['MMM.', 'MMM.', '.mmm', '.mmm'] }, Fs: { at: [2, -2], rows: ['kkk.', 'oooo'] },
              N: { at: [-5, -6], rows: ['.LLLL', 'LLLL.', 'llll.', 'llll.'] }, Ns: { at: [-6, -2], rows: ['KKKK.', 'OOOOO'] } },
      // 彎腰翻箱：膝蓋微彎
      bend: { F: { at: [1, -6], rows: ['MMM.', '.MMM', '.mmm', 'mmm.'] }, Fs: { at: [1, -2], rows: ['kkk.', 'oooo'] },
              N: { at: [-4, -6], rows: ['LLLL.', '.LLLL', '.llll', 'llll.'] }, Ns: { at: [-4, -2], rows: ['KKKK.', 'OOOOO'] } }
    },
    front: {
      stand: { F: { at: [0, -6], rows: ['MMMM', 'MMMM', 'mmmm', 'mmmm'] }, Fs: { at: [0, -2], rows: ['kkkk.', 'ooooo'] },
               N: { at: [-4, -6], rows: ['LLLL', 'LLLL', 'llll', 'llll'] }, Ns: { at: [-5, -2], rows: ['.KKKK', 'OOOOO'] } },
      liftN: { F: { at: [0, -6], rows: ['MMMM', 'MMMM', 'mmmm', 'mmmm'] }, Fs: { at: [0, -2], rows: ['kkkk.', 'ooooo'] },
               N: { at: [-4, -6], rows: ['LLLL', 'llll', 'llll'] }, Ns: { at: [-5, -3], rows: ['.KKKK', 'OOOOO'] } },
      liftF: { F: { at: [0, -6], rows: ['MMMM', 'mmmm', 'mmmm'] }, Fs: { at: [0, -3], rows: ['kkkk.', 'ooooo'] },
               N: { at: [-4, -6], rows: ['LLLL', 'LLLL', 'llll', 'llll'] }, Ns: { at: [-5, -2], rows: ['.KKKK', 'OOOOO'] } },
      jump: { F: { at: [0, -9], rows: ['MMMM', 'mmmm', '.mmm'] }, Fs: { at: [0, -6], rows: ['kkkk.', 'ooooo'] },
              N: { at: [-4, -9], rows: ['LLLL', 'llll', 'lll.'] }, Ns: { at: [-5, -6], rows: ['.KKKK', 'OOOOO'] } }
    }
  };
  LEGS.back = LEGS.front;

  // ---------------------------------------------------------- 手臂（相對肩點；側面近手＝畫面左、遠手＝畫面右）
  // 側面肩點：近手 (軀幹左緣, −15)、遠手 (軀幹右緣, −15)；正面：左右對稱
  var ARMS = {
    down: { at: [-1, 0], rows: ['AAA', 'AAA', 'AAA', 'aaa', 'aaa', 'aaa', 'HHH', '.HH'] },
    downF: { at: [-1, 0], rows: ['AAA', 'AAA', 'AAA', 'aaa', 'aaa', 'aaa', 'HHH', 'HH.'] },
    swingF: { at: [-1, 0], rows: ['AAA..', '.AAA.', '.AAA.', '..aaa', '..aaa', '..HHH', '...HH'] },
    swingB: { at: [-3, 0], rows: ['..AAA', '..AAA', '.AAA.', '.aaa.', 'aaa..', 'HHH..', 'HH...'] },
    // 舉高（歡呼 V 字）
    upV: { at: [-5, -8], rows: ['HH....', 'HHH...', '.aaa..', '.aaa..', '..aaa.', '..AAA.', '...AAA', '...AAA', '....AA'] },
    upVF: { at: [-1, -8], rows: ['....HH', '...HHH', '..aaa.', '..aaa.', '.aaa..', '.AAA..', 'AAA...', 'AAA...', 'AA....'] },
    // 蓄力：手舉到頭的後上方（唱片在手上）
    wind: { at: [-6, -10], rows: ['.HHH...', 'HHHH...', '.aaa...', '..aaa..', '...aaa.', '....AAA', '....AAA', '.....AA', '.....AA', '......A'] },
    // 出手：手往前伸直（肩點往前移，見姿勢表）
    reach: { at: [0, 0], rows: ['AAAAaaaaHH.', 'AAAAaaaaHHH', '.AAAaaaaHH.'] },
    // 收勢：手甩到身體前下方
    follow: { at: [-1, 0], rows: ['AAA...', '.AAA..', '..aaa.', '..aaaa', '...aHHH', '....HH.'] },
    // 胸前捧著（雙手）
    chest: { at: [-1, 0], rows: ['AAA...', 'AAA...', 'AAAaaa', '.AaaaHH', '....HHH'] },
    chestF: { at: [-2, 0], rows: ['.AAA', '.AAA', 'aaAA', 'Haaa', 'HH..'] },
    // 單手舉到肩前（亮唱片）
    show: { at: [-1, 0], rows: ['AAA.....', 'AAAA....', '.AAaaa..', '...aaaHH', '.....HHH'] },
    // 擋在臉前
    shield: { at: [-1, -6], rows: ['......HHH', '.....aaHH', '....aaa..', '...aaa...', '..AAA....', '.AAA.....', 'AAA......', 'AA.......'] },
    // 舉手指（遠手；老闆舉旗）
    point: { at: [-1, -10], rows: ['.H..', '.HH.', 'HHH.', 'aaa.', 'aaa.', 'aaa.', 'AAA.', 'AAA.', 'AAA.', 'AAA.'] },
    // 雙手高舉過頭（大金盤）
    upHigh: { at: [-1, -10], rows: ['HHH', 'HHH', 'aaa', 'aaa', 'aaa', 'AAA', 'AAA', 'AAA', 'AAA', 'AA.'] },
    // 聳肩：手肘彎、手心朝上
    shrug: { at: [-4, 0], rows: ['..AAA', '.AAA.', 'aaa..', 'aaa..', 'HHH..', 'HH...'] },
    shrugF: { at: [0, 0], rows: ['AAA..', '.AAA.', '..aaa', '..aaa', '..HHH', '...HH'] },
    // 被打到：手甩開
    flail: { at: [-5, -5], rows: ['HH.....', 'HHa....', '.aaa...', '..aaAA.', '...AAAA', '....AAA'] },
    flailF: { at: [0, -4], rows: ['....HH', '...aHH', '..aaa.', 'AAaa..', 'AAA...', 'AA....'] },
    // 翻箱：手往前下伸
    dig: { at: [-1, 0], rows: ['AAA....', '.AAA...', '..AAa..', '...aaa.', '....aaa', '....HHH', '.....HH'] },
    digF: { at: [-1, 0], rows: ['AAA..', '.AAa.', '..aaa', '..aaa', '..HHH', '...HH'] },
    // 背面翻箱：手伸到身體前面，只看得到上臂
    hidden: { at: [-1, 0], rows: ['AAA', 'AAA', 'AA.'] },
    // 說話：遠手比劃
    gesture: { at: [-1, -2], rows: ['....HH', '...HHH', '..aaa.', '.aaa..', 'AAA...', 'AAA...', 'AA....'] }
  };

  // ===================================================================== 衣服（上衣、下身、鞋）
  // sleeve：short＝上臂是袖子、前臂露膚；long＝整隻手臂是袖子
  var TOPS = [
    { id: 'tee', label: 'T 恤', sleeve: 'short', dflt: 'white' },
    { id: 'bandtee', label: '樂團 T', sleeve: 'short', dflt: 'black', dflt2: 'white' },
    { id: 'stripe', label: '條紋 T', sleeve: 'short', dflt: 'navy', dflt2: 'white' },
    { id: 'shirt', label: '短袖襯衫', sleeve: 'short', dflt: 'sky' },
    { id: 'hoodie', label: '帽 T', sleeve: 'long', dflt: 'grey', dflt2: 'white' },
    { id: 'flannel', label: '格紋襯衫', sleeve: 'long', dflt: 'red', dflt2: 'black' },
    { id: 'denim', label: '牛仔外套', sleeve: 'long', dflt: 'denim', dflt2: 'white' },
    { id: 'leather', label: '皮衣', sleeve: 'long', dflt: 'black', dflt2: 'white' },
    { id: 'turtleneck', label: '高領毛衣', sleeve: 'long', dflt: 'black' },
    { id: 'cardigan', label: '開襟毛衣', sleeve: 'long', dflt: 'camel', dflt2: 'white' },
    { id: 'suit', label: '西裝外套', sleeve: 'long', dflt: 'charcoal', dflt2: 'white' },
    { id: 'coat', label: '長大衣', sleeve: 'long', dflt: 'camel', dflt2: 'black' },
    { id: 'apron', label: '圍裙', sleeve: 'short', dflt: 'green', dflt2: 'white' }
  ];
  var TOP = byId(TOPS);
  var BOTTOMS = [
    { id: 'jeans', label: '牛仔褲', dflt: 'denim', belt: true },
    { id: 'blackjeans', label: '黑牛仔褲', dflt: 'black', belt: true },
    { id: 'chinos', label: '卡其褲', dflt: 'khaki', belt: true },
    { id: 'slacks', label: '西裝褲', dflt: 'charcoal', belt: true },
    { id: 'cargo', label: '工作褲', dflt: 'olive', belt: true },
    { id: 'joggers', label: '運動褲', dflt: 'grey' },
    { id: 'shorts', label: '短褲', dflt: 'khaki' },
    { id: 'skirt', label: '裙子', dflt: 'black' }
  ];
  var BOTTOM = byId(BOTTOMS);
  var SHOES = [
    { id: 'sneakers', label: '球鞋', dflt: 'white' },
    { id: 'hightops', label: '高筒帆布鞋', dflt: 'black' },
    { id: 'boots', label: '靴子', dflt: 'brown' },
    { id: 'loafers', label: '皮鞋', dflt: 'black' },
    { id: 'sandals', label: '涼鞋', dflt: 'brown' }
  ];
  var SHOE = byId(SHOES);

  // 上衣：軀幹每一格的 [材質, 色階]。i＝離軀幹左緣幾格、j＝第幾列（0＝肩線）、T＝torsoRows、cx＝胸口中線（正面是 −1｜0 之間）
  function topPx(spec, view, x, y, T) {
    var id = spec.top, j = y + 16, row = T.rows[j], i = x - T.left, w = T.w;
    var side = view === 'side', back = view === 'back';
    var cx = side ? T.left + 6 + (spec.build === 'slim' ? -1 : 0) : -1;     // 正面：x −1、0 兩格是中線
    var dc = side ? x - cx : (x <= -1 ? x + 1 : x);                          // 離中線（正面左右對稱，0＝中間兩格）
    var adc = Math.abs(dc);
    var mid = side ? (x === cx || x === cx - 1) : (x === -1 || x === 0);
    var M = 'top', t = 2;
    if (back) {
      if (id === 'hoodie' && j <= 2 && adc <= 3 - j) return ['top', j === 2 ? 1 : 3 - (adc > 1 ? 1 : 0)];
      if (id === 'stripe' && j % 2 === 1) return ['top2', 2];
      if (id === 'flannel') return flannel(x, j);
      if (id === 'apron') { if (j >= 6 && adc <= 3) return ['top', j === 6 ? 1 : 2]; if (j === 6 && adc <= 4) return ['apronT', 2]; return ['top2', 2]; }
      if (id === 'bandtee' && j >= 2 && j <= 4 && adc <= 1) return ['top2', 1];
      if (id === 'turtleneck' && j <= 1 && adc <= 2) return ['top', j === 0 ? 3 : 1];
      if (id === 'coat' || id === 'suit' || id === 'denim' || id === 'leather') { if (j === 1 && adc <= 2) return ['top', 3]; if (id === 'suit' && mid && j >= 4) return ['top', 1]; }
      return [M, t];
    }
    function flannel(xx, jj) {
      var vx = (xx - T.left) % 3 === 1, hz = jj % 3 === 2;
      if (vx && hz) return ['top2', 0];
      if (vx || hz) return ['top2', 2];
      return ['top', 2];
    }
    switch (id) {
      case 'bandtee':
        if (j === 1 && mid) return ['top', 1];
        if (j >= 3 && j <= 5 && x >= cx - 2 && x <= cx) {     // 胸前小印花：一張黑膠
          var pi = x - (cx - 2), pj = j - 3;
          if (pi === 1 && pj === 1) return ['label', 2];
          if (pi !== 1 && pj !== 1) return ['top2', 1];
          return ['top2', 2];
        }
        break;
      case 'stripe': if (j === 1 && mid) return ['top', 1]; if (j % 2 === 0 && j > 1) return ['top2', 2]; break;
      case 'shirt':
        if (j === 1 && adc <= 1) return ['top', 4];
        if (j === 1 && adc === 2) return ['top', 3];
        if (x === cx && j >= 2) return ['top', j % 2 ? 4 : 1];
        if (j === 3 && x === cx - 3) return ['top', 1];
        break;
      case 'hoodie':
        if (j <= 1 && adc <= 3) return ['top', j === 0 ? 3 : (adc <= 1 ? 1 : 3)];
        if (j >= 2 && j <= 4 && (side ? (x === cx - 2 || x === cx + 1) : (x === -2 || x === 1))) return ['top2', j === 4 ? 1 : 2];
        if (j === 5 && adc <= 2) return ['top', 1];
        if (j === 6 && (adc === 2)) return ['top', 1];
        break;
      case 'flannel':
        if (j === 1 && adc <= 1) return ['top', 3];
        if (x === cx && j >= 2) return ['top', j % 2 ? 3 : 1];
        return flannel(x, j);
      case 'denim':
        if (adc <= 1 && j >= 1) return ['top2', j === 1 ? 1 : 2];
        if (adc === 2 && j <= 3) return ['top', 4];
        if (j === 3 && (adc === 3 || adc === 4)) return ['top', 1];
        if (j === 7) return ['top', 3];
        if (adc === 2) return ['top', 3];
        break;
      case 'leather':
        if (adc <= 1 && j >= 1) return ['top2', j === 1 ? 1 : 2];
        if (adc === 2 && j <= 4) return ['top', 3];
        if (adc === 2) return ['top', 4];
        if (j === 2 && adc === 3) return ['top', 3];
        if (j === 7) return ['top', 1];
        break;
      case 'turtleneck':
        if (j <= 1 && adc <= 2) return ['top', j === 0 ? 3 : 1];
        if (j === 7) return ['top', x % 2 ? 1 : 3];
        break;
      case 'cardigan':
        if (j === 1 && adc <= 2) return ['top2', adc === 2 ? 1 : 2];
        if (j === 2 && adc <= 1) return ['top2', 2];
        if (j === 3 && adc === 0) return ['top2', 2];
        if (x === cx && j >= 3) return ['top', j % 2 ? 4 : 1];
        if (j === 7) return ['top', x % 2 ? 1 : 3];
        break;
      case 'suit':
        if (j >= 1 && j <= 4 && adc <= Math.max(0, 3 - j + 1)) {
          if (mid) return ['tie', j === 1 ? 3 : 2];
          return ['top2', 2];
        }
        if (j >= 1 && j <= 5 && adc === Math.max(0, 3 - j + 1) + 1) return ['top', 3];
        if (j === 5 && mid) return ['tie', 1];
        if (x === cx && j === 6) return ['top', 4];
        if (j === 3 && side && x === T.left + 2) return ['white', 3];
        break;
      case 'coat':
        if (adc <= 1 && j >= 1 && j <= 3) return ['top2', 2];
        if (adc === 2 && j <= 4) return ['top', 3];
        if (x === cx && (j === 5 || j === 7)) return ['top', 4];
        break;
      case 'apron':
        // 底下是 top2（襯衫）；圍裙本體 top
        var bibL = side ? cx - 3 : -4, bibR = side ? cx + 2 : 3;
        if (j >= 2 && x >= bibL && x <= bibR) {
          if (j === 2) return ['top', x === bibL || x === bibR ? 2 : 3];
          if (j === 5 && x >= bibL + 1 && x <= bibL + 3) return ['top', 1];
          if (j === 6 && x === bibL + 1) return ['top', 1];
          if (j === 4 && x === bibL + 2 && !side) return ['pen', 2];
          return ['top', 2];
        }
        if (j <= 1 && (x === bibL || x === bibR)) return ['top', 2];
        if (j === 1 && mid) return ['top2', 1];
        if (j === 7) return ['apronT', 2];
        return ['top2', 2];
      default:   // tee
        if (j === 1 && mid) return ['top', 1];
    }
    return [M, t];
  }
  // 袖子：短袖＝上臂（A）是衣服、前臂露膚；長袖＝到手腕
  function sleevePx(spec, ch, isCuff) {
    var Tp = TOP[spec.top], long = Tp.sleeve === 'long';
    var sleeveMat = spec.top === 'apron' ? 'top2' : 'top';
    if (ch === 'H') return ['skin', 2];
    if (ch === 'A') {
      if (spec.top === 'stripe') return null;   // 交給 armPx 依列判斷
      return [sleeveMat, 2];
    }
    if (ch === 'a') {
      if (!long) return ['skin', 2];
      if (isCuff) return spec.top === 'suit' ? ['top2', 3] : spec.top === 'denim' || spec.top === 'turtleneck' || spec.top === 'cardigan' || spec.top === 'hoodie' ? ['top', 1] : ['top', 2];
      return [sleeveMat, 2];
    }
    return null;
  }
  // 下身：P 胯、L/l 近腿、M/m 遠腿；x、y 小人座標
  function bottomPx(spec, view, ch, x, y, info) {
    var id = spec.bottom, upper = ch === 'L' || ch === 'M' || ch === 'P';
    if (id === 'shorts' && !upper) return ['skin', 2];
    if (id === 'skirt' && ch !== 'P') return ['skin', 2];
    if (ch === 'P') {
      var B = BOTTOM[id];
      if (y === -8 && B.belt) {
        var bx = view === 'side' ? 1 : (x === -1 || x === 0);
        if (view === 'side' ? (x === 1 || x === 2) : bx) return ['gold', x === 1 || x === -1 ? 3 : 2];
        return ['belt', view === 'back' && (x === -3 || x === 2) ? 3 : 2];
      }
      if (id === 'joggers' && y === -8) return ['bot', 3];
      if (view !== 'side' && y === -7 && (x === -1 || x === 0)) return ['bot', 1];
      return ['bot', 2];
    }
    var t = 2;
    if (info.bottomRow) t = id === 'jeans' || id === 'blackjeans' ? 3 : id === 'joggers' ? 1 : 2;
    if (id === 'shorts' && info.lastUpper) t = 1;
    if (id === 'cargo' && (ch === 'L') && (info.r === 1 || info.r === 2) && info.c >= 1 && info.c <= 2) return ['bot', info.r === 1 ? 3 : 1];
    if (id === 'slacks' && info.c === 1 && view !== 'back') t = 3;
    if ((id === 'jeans' || id === 'blackjeans') && info.c === 0 && ch === 'L' && !info.bottomRow) t = 3;
    return ['bot', t];
  }
  // 鞋：K/k 鞋面、O/o 鞋底
  function shoePx(spec, ch, c, r, w) {
    var id = spec.shoes, sole = ch === 'O' || ch === 'o';
    switch (id) {
      case 'sneakers': if (sole) return ['sole', c === w - 1 ? 3 : 2]; if (c === 1) return ['acc', 2]; if (c === 2) return ['shoe', 4]; return ['shoe', 2];
      case 'hightops': if (sole) return ['sole', 2]; if (c === w - 1) return ['sole', 3]; return ['shoe', c === 1 ? 3 : 2];
      case 'boots': if (sole) return ['bootsole', 2]; return ['shoe', c === 2 ? 3 : 2];
      case 'loafers': if (sole) return ['bootsole', 2]; return ['shoe', c === w - 1 ? 4 : c === 1 ? 3 : 2];
      case 'sandals': if (sole) return ['shoe', 1]; return c === 1 ? ['shoe', 3] : ['skin', 2];
    }
    return ['shoe', 2];
  }

  // ===================================================================== 帽子
  // 每頂：s＝側面（整列）、f＝正面（左半鏡射）、b＝背面（沒給就用正面）。{ ox, oy, rows }：左上角相對頭框。
  // cut＝頭框第幾列以上的頭髮剪掉（藏在帽子裡）；ears＝false 時蓋住耳朵；noBackHair＝不畫垂在身後的長髮
  // 字母：h 本色、H 亮、W 高光、D 陰、x 最深；B/b 帽帶（hatb）；g/G/y 金；w 白；k 黑；s 銀
  var HATS = [{ id: 'none', label: '不戴' }];
  function defHat(id, label, o) { o.id = id; o.label = label; HATS.push(o); }
  defHat('beanie', '毛帽', { cut: 4, dflt: 'green',
    s: { ox: -2, oy: -3, rows: [
      '.......hhhh........',
      '....hhhhhhhhhh.....',
      '...hhhHHHhhhhhh....',
      '..hhhHWWHhhhhhhh...',
      '.hhhhhHHhhhhhhhhh..',
      '.hhhhhhhhhhhhhhhhD.',
      '.hhhhhhhhhhhhhhhhD.',
      'HhHhHhHhHhHhHhHhHD.',
      'DhDhDhDhDhDhDhDhDx.'] },
    f: { ox: -1, oy: -3, rows: mirror([
      '.......hh',
      '....hhhhh',
      '...hhHHHh',
      '..hhHWWHh',
      '.hhhhHHhh',
      '.hhhhhhhh',
      '.hhhhhhhh',
      'HhHhHhHhH',
      'DhDhDhDhD']) } });
  defHat('cap', '棒球帽', { cut: 4, dflt: 'blue',
    s: { ox: -2, oy: -2, rows: [
      '.......hh............',
      '....hhhhhhhh.........',
      '..hhhhHHHHhhhh.......',
      '.hhhhHWWWHhhhhh......',
      '.hhhhhHHHhhhhhhh.....',
      '.hhhhhhhhhhhhhhhh....',
      '..DhhhhhhhhhhhhhhHHHH',
      '...........xxxxxxxxx.'] },
    f: { ox: -1, oy: -2, rows: mirror([
      '.......hh',
      '....hhhhh',
      '..hhhHHHh',
      '.hhhHWWHh',
      '.hhhhHHhh',
      '.hhhhhhhh',
      '.Dhhhhhhh',
      '..HHHHHHH',
      '...xxxxxx']) },
    b: { ox: -1, oy: -2, rows: mirror([
      '.......hh',
      '....hhhhh',
      '..hhhHHHh',
      '.hhhHWWHh',
      '.hhhhHHhh',
      '.hhhhhhhh',
      '.Dhhhhh..',
      '..DDDDDD.']) } });
  defHat('capback', '反戴帽', { cut: 4, dflt: 'red',
    s: { ox: -6, oy: -2, rows: [
      '...........hh........',
      '........hhhhhhhh.....',
      '......hhhhHHHHhhhh...',
      '.....hhhhHWWWHhhhhh..',
      '.....hhhhhHHHhhhhhhh.',
      '....hhhhhhhhhhhhhhhhh',
      'HHHHhhhhhhhhhhhhhhhD.',
      '.xxxxxxxx............'] },
    f: { ox: -1, oy: -2, rows: mirror([
      '.......hh',
      '....hhhhh',
      '..hhhHHHh',
      '.hhhHWWHh',
      '.hhhhHHhh',
      '.hhhhhhhh',
      '.Dhhhhh..',
      '..DDDDDD.']) },
    b: { ox: -1, oy: -2, rows: mirror([
      '.......hh',
      '....hhhhh',
      '..hhhHHHh',
      '.hhhHWWHh',
      '.hhhhHHhh',
      '.hhhhhhhh',
      '.Dhhhhhhh',
      '..HHHHHHH',
      '...xxxxxx']) } });
  defHat('bucket', '漁夫帽', { cut: 4, dflt: 'khaki',
    s: { ox: -4, oy: -2, rows: [
      '........hhhhhh.......',
      '......hhhHHHhhhh.....',
      '.....hhhHWWHhhhhh....',
      '.....hhhhHHhhhhhh....',
      '.....hhhhhhhhhhhhD...',
      '....DDDDDDDDDDDDDD...',
      '..hhhhhhhhhhhhhhhhhh.',
      '.hhHHhhhhhhhhhhhhhhhh',
      '.DDDDDDDDDDDDDDDDDDD.'] },
    f: { ox: -3, oy: -2, rows: mirror([
      '.........hh',
      '.......hhhH',
      '.....hhhHWW',
      '.....hhhhHH',
      '.....hhhhhh',
      '....DDDDDDD',
      '..hhhhhhhhh',
      '.hHHhhhhhhh',
      '.DDDDDDDDDD']) } });
  defHat('fedora', '紳士帽', { cut: 4, dflt: 'black',
    s: { ox: -5, oy: -4, rows: [
      '.........hhh.hhh.......',
      '........hhhhhhhhh......',
      '.......hhHHhhhhhhh.....',
      '.......hHWHhhhhhhh.....',
      '.......hhHhhhhhhhh.....',
      '.......hhhhhhhhhhhD....',
      '.......BBBBBBBBBBBb....',
      '..hhhhhhhhhhhhhhhhhhhh.',
      'hhHHHhhhhhhhhhhhhhhhhhh',
      '.DDD..............DDD..'] },
    f: { ox: -4, oy: -4, rows: mirror([
      '.......hhh',
      '......hhhh',
      '.....hhHHh',
      '.....hHWHh',
      '.....hhHhh',
      '.....hhhhh',
      '.....BBBBB',
      '..hhhhhhhh',
      'hhHHhhhhhh',
      '.DD.......']) } });
  defHat('bowler', '圓頂禮帽', { cut: 4, dflt: 'orange',
    s: { ox: -3, oy: -4, rows: [
      '........hhhhh......',
      '......hhhHHhhhh....',
      '.....hhHHWWHhhhh...',
      '.....hhHWHhhhhhh...',
      '.....hhhHhhhhhhhD..',
      '.....hhhhhhhhhhhD..',
      '.....BBBBBBBBBBBb..',
      '..hhhhhhhhhhhhhhhhh',
      '...DDDDDDDDDDDDDDD.'] },
    f: { ox: -3, oy: -4, rows: mirror([
      '.......hhh',
      '......hhHH',
      '.....hHHWW',
      '.....hHWHh',
      '.....hhHhh',
      '.....hhhhh',
      '.....BBBBB',
      '..hhhhhhhh',
      '...DDDDDDD']) } });
  defHat('beret', '貝雷帽', { cut: 3, dflt: 'purple',
    s: { ox: -3, oy: -3, rows: [
      '.........h.........',
      '.......hhhhhh......',
      '....hhhhHHHhhhh....',
      '..hhhhhHWWWHhhhhh..',
      '.hhhhhhhHHHhhhhhhh.',
      'hhhhhhhhhhhhhhhhhhD',
      '.DhhhhhhhhhhhhhhhD.',
      '..DDhhhhhhhhhhDD...',
      '....DDDDDDDDDD.....'] },
    f: { ox: -2, oy: -3, rows: mirror([
      '.........',
      '.......hh',
      '....hhhhH',
      '..hhhHWWH',
      '.hhhhhHHh',
      'hhhhhhhhh',
      '.Dhhhhhhh',
      '..DDhhhhh',
      '....DDDDD']) } });
  defHat('tophat', '高禮帽', { cut: 4, dflt: 'black', noBackHair: false,
    s: { ox: -2, oy: -10, rows: [
      '.....hhhhhhhhhh....',
      '.....hHWhhhhhhhD...',
      '.....hHhhhhhhhhD...',
      '.....hHhhhhhhhhD...',
      '.....hHhhhhhhhhD...',
      '.....hHhhhhhhhhD...',
      '.....hHhhhhhhhhD...',
      '.....hHhhhhhhhhD...',
      '.....BBBBBBBBBBb...',
      '.....BBBBBBBBBBb...',
      '.hhhhhhhhhhhhhhhhh.',
      '..DDDDDDDDDDDDDDD..'] },
    f: { ox: -1, oy: -10, rows: mirror([
      '....hhhhh',
      '....hHWhh',
      '....hHhhh',
      '....hHhhh',
      '....hHhhh',
      '....hHhhh',
      '....hHhhh',
      '....hHhhh',
      '....BBBBB',
      '....BBBBB',
      '.hhhhhhhh',
      '..DDDDDDD']) } });
  defHat('headphones', '耳機', { cut: null, ears: false, dflt: 'gold',
    s: { ox: 0, oy: -2, rows: [
      '...hhhhhhh.....',
      '..hDDDDDDDhh...',
      '.hD.......Dh...',
      '.h.........h...',
      'hD.........D...',
      'h..............',
      'h..............',
      'h..............',
      'h..............',
      'kkkk...........',
      'kHhhk..........',
      'kHWhk..........',
      'kHhhk..........',
      'khhhk..........',
      '.kkk...........'] },
    f: { ox: -3, oy: -2, rows: mirror([
      '......hhhh',
      '....hhDDDD',
      '...hD.....',
      '..hD......',
      '..h.......',
      '.hD.......',
      '.h........',
      '.h........',
      '.h........',
      'kkk.......',
      'kHhk......',
      'kWhk......',
      'kHhk......',
      'khhk......',
      '.kk.......']) } });
  defHat('bandana', '頭巾', { cut: 4, dflt: 'red',
    s: { ox: -5, oy: -2, rows: [
      '.........hhhhhhh.....',
      '.......hhhhwhhhhhh...',
      '......hhwhhhhhwhhhh..',
      '.....hhhhhhwhhhhhhhh.',
      '.....hwhhhhhhhhwhhhh.',
      '.hhh.hhhhhwhhhhhhhhhD',
      'hhwhhhhhhhhhhhwhhhhD.',
      '.hhDDDDDDDDDDDDDDDD..',
      '..hD.................',
      '.hD..................'] },
    f: { ox: -1, oy: -2, rows: mirror([
      '.......hh',
      '....hhhhh',
      '...hhwhhh',
      '..hhhhhwh',
      '.hwhhhhhh',
      '.hhhhwhhh',
      '.hhhhhhhh',
      '.DDDDDDDD']) },
    b: { ox: -1, oy: -2, rows: mirror([
      '.......hh',
      '....hhhhh',
      '...hhwhhh',
      '..hhhhhwh',
      '.hwhhhhhh',
      '.hhhhwhhh',
      '.hhhhhhhh',
      '.hhhhhhDD',
      '......hhh',
      '.....hD.h',
      '.....D...']) } });
  defHat('crown', '小皇冠', { cut: null, dflt: 'gold',
    s: { ox: 2, oy: -5, rows: [
      '.G...G...G.',
      '.gG.GgG.Gg.',
      '.ggGgggGgg.',
      '.ggwggrggg.',
      '.DDDDDDDDD.'] },
    f: { ox: 2, oy: -5, rows: mirror([
      '.G...G',
      '.gG.Gg',
      '.ggGgg',
      '.ggwgg',
      '.DDDDD'], true) } });
  var HAT = {}; HATS.forEach(function (h) { HAT[h.id] = h; });
  function hatLegend() { var o = tones('hat'); o.B = ['hatb', 2]; o.b = ['hatb', 1]; o.g = ['gold', 2]; o.G = ['gold', 3]; o.y = ['gold', 4]; o.w = ['white', 2]; o.k = ['black', 2]; o.s = ['silver', 3]; o.r = ['label', 3]; return o; }
  function drawHat(C, spec, view, hx, hy) {
    var Ht = HAT[spec.hat]; if (!Ht || spec.hat === 'none') return;
    var tp = Ht[view === 'side' ? 's' : view === 'front' ? 'f' : 'b'] || (view === 'back' ? Ht.f : null);
    if (!tp) return;
    C.begin('hat');
    var leg = hatLegend();
    if (spec.hat === 'headphones' || spec.hat === 'crown') { leg = extend(leg, { h: ['gold', 2], H: ['gold', 3], W: ['gold', 4], D: ['gold', 1], x: ['gold', 0] }); if (spec.hat === 'headphones') leg = extend(leg, { h: ['hat', 2], H: ['hat', 3], W: ['hat', 4], D: ['hat', 1], k: ['black', 3] }); }
    stamp(C, tp.rows, hx + tp.ox, hy + tp.oy, leg);
  }

  // ===================================================================== 眼鏡
  var GLASSES = [
    { id: 'none', label: '無' }, { id: 'round', label: '圓框' }, { id: 'square', label: '方框' }, { id: 'sunglasses', label: '墨鏡' },
    { id: 'browline', label: '眉框' }, { id: 'monocle', label: '單片眼鏡' }
  ];
  var GLASSCOL = [{ id: 'black', label: '黑框' }, { id: 'brown', label: '玳瑁' }, { id: 'gold', label: '金框' }, { id: 'silver', label: '銀框' }, { id: 'red', label: '紅框' }, { id: 'white', label: '白框' }];
  var GLASSCOL_RAMP = { black: METAL.black, brown: METAL.brown, gold: METAL.gold, silver: METAL.silver, red: autoRamp('#b8202c'), white: cloth('white') };
  // 一片鏡框：(x0,y0) 左上、w×h；round＝切角
  function lensRing(C, x0, y0, w, h, kind, mat) {
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) {
      var edge = i === 0 || j === 0 || i === w - 1 || j === h - 1, corner = (i === 0 || i === w - 1) && (j === 0 || j === h - 1);
      var X = x0 + i, Y = y0 + j;
      if (kind === 'sun') { if (corner && j === h - 1) continue; C.put(X, Y, edge && j === 0 ? mat : 'lens', edge && j === 0 ? 2 : (i === 1 && j === 1 ? 4 : (j === h - 1 ? 1 : 2))); continue; }
      if (edge) {
        if (kind === 'round' && corner) continue;
        if (kind === 'brow') { C.put(X, Y, j === 0 ? mat : 'silver', j === 0 ? 2 : 3); continue; }
        C.put(X, Y, mat, j === 0 ? 2 : 3);
      } else {
        var m = C.mat(X, Y);
        if (m === 'skin' || m === 'skinsh' || m === 'blush' || m === 'freck') C.put(X, Y, 'clear', i === 1 && j === 1 ? 4 : 3);
      }
    }
  }
  function drawGlasses(C, spec, view, hx, hy, ex) {
    var g = spec.glasses; if (g === 'none') return;
    C.begin('glasses');
    var kind = g === 'round' ? 'round' : g === 'sunglasses' ? 'sun' : g === 'browline' ? 'brow' : 'square';
    if (view === 'front') {
      if (g === 'monocle') { lensRing(C, hx + 9, hy + 7, 4, 4, 'round', 'gold'); C.put(hx + 12, hy + 11, 'gold', 3); C.put(hx + 12, hy + 12, 'gold', 2); C.put(hx + 13, hy + 13, 'gold', 3); return; }
      var h = kind === 'sun' ? 3 : 4;
      lensRing(C, hx + 3, hy + 7, 4, h, kind, 'glass'); lensRing(C, hx + 9, hy + 7, 4, h, kind, 'glass');
      C.put(hx + 7, hy + 8, 'glass', 2); C.put(hx + 8, hy + 8, 'glass', 2);
      C.put(hx + 1, hy + 8, 'glass', 1); C.put(hx + 2, hy + 8, 'glass', 2); C.put(hx + 13, hy + 8, 'glass', 2); C.put(hx + 14, hy + 8, 'glass', 1);
      return;
    }
    // 側面：近鏡片 4 寬、遠鏡片 3 寬（透視），鏡腳往耳朵
    if (g === 'monocle') { lensRing(C, hx + 11, hy + 7, 3, 4, 'round', 'gold'); C.put(hx + 11, hy + 11, 'gold', 3); C.put(hx + 10, hy + 12, 'gold', 2); C.put(hx + 10, hy + 13, 'gold', 3); return; }
    var hh = kind === 'sun' ? 3 : 4;
    lensRing(C, hx + 6, hy + 7, 4, hh, kind, 'glass'); lensRing(C, hx + 11, hy + 7, 3, hh, kind, 'glass');
    C.put(hx + 10, hy + 8, 'glass', 2);
    C.put(hx + 5, hy + 8, 'glass', 1); C.put(hx + 4, hy + 8, 'glass', 2);
  }

  // ===================================================================== 鬍子
  var FACIALS = [
    { id: 'none', label: '無' }, { id: 'stubble', label: '鬍渣' }, { id: 'moustache', label: '八字鬍' }, { id: 'beard', label: '落腮鬍' },
    { id: 'goatee', label: '山羊鬍' }, { id: 'longbeard', label: '長鬍子' }, { id: 'curled', label: '翹鬍子' }
  ];
  // 頭框座標（正面）：嘴在 (7..8, 11)；下巴最底 y13
  var BEARD = {
    front: {
      stub: ['...............', '.s.s........s.s', '..s.s.s..s.s.s.', '...s.s.ss.s.s..', '.....s.s.s.....'],   // y9..13，x0..14
      moustache: { y: 10, rows: ['....hhhhhh....', '...hD....Dh...'] },   // x1..
      beard: [
        '.h............h.',
        '.hh..........hh.',
        '.hhh.hhhhhh.hhh.',
        '.hhhhh....hhhhh.',
        '..hhhhh..hhhhh..',
        '...hhhhhhhhhh...',
        '.....DhhhhD.....'],   // y8..14，x0..15
      goatee: ['......hhhh......', '......hhhh......', '.......DD.......'],   // y12..14
      long: ['....hhhhhhhh....', '.....hhhhhh.....', '.....hhhhhh.....', '......hhhh......', '......hhhh......', '.......DD.......'],   // y14..19
      curled: { y: 9, rows: ['..h..........h..', '..hhhhhhhhhhhh..', '....D......D....'] }
    },
    side: {
      stub: ['...............', '.....s.s......s', '......s.s.s.s.s', '.......s.s.s.s.', '........s.s.s..'],
      moustache: { y: 10, rows: ['........hhhhhh.', '.......hD....D.'] },
      beard: [
        '....h..........',
        '....hh.........',
        '....hhh.hhhhhhh',
        '....hhhhh....hh',
        '.....hhhhh..hhD',
        '......hhhhhhhD.',
        '........DhhhD..'],
      goatee: ['.........hhhh..', '.........hhhD..', '..........DD...'],
      long: ['......hhhhhhh..', '.......hhhhhh..', '.......hhhhhD..', '........hhhh...', '........hhhD...', '.........DD....'],
      curled: { y: 9, rows: ['.......h......h', '.......hhhhhhhh', '.........D...D.'] }
    }
  };
  function drawFacial(C, hx, hy, spec, view, layer) {
    var f = spec.facial; if (f === 'none' || view === 'back' || layer !== 'over') return;
    var B = BEARD[view]; C.begin('beard');
    function rows(rr, y0, mat, skipMouth) {
      rr.forEach(function (r, j) { for (var i = 0; i < r.length; i++) { var ch = r.charAt(i); if (ch === '.') continue;
        var X = hx + i, Y = hy + y0 + j, m = C.mat(X, Y);
        if (skipMouth && (m === 'mouth' || m === 'teeth')) continue;
        if (ch === 's') { if (m === 'skin' || m === 'skinsh') C.put(X, Y, 'stub', 2); continue; }
        C.put(X, Y, mat, ch === 'D' ? 1 : ch === 'H' ? 3 : (j === 0 && i < r.length / 2 ? 3 : 2)); } });
    }
    if (f === 'stubble') { rows(B.stub, 9, 'beard'); return; }
    if (f === 'beard' || f === 'longbeard') { rows(B.beard, 8, 'beard', true); rows(B.moustache.rows, B.moustache.y, 'beard', true); }
    if (f === 'longbeard') rows(B.long, 14, 'beard');
    if (f === 'moustache') rows(B.moustache.rows, B.moustache.y, 'beard', true);
    if (f === 'goatee') { rows(B.goatee, 12, 'beard', true); rows(B.moustache.rows, B.moustache.y, 'beard', true); }
    if (f === 'curled') rows(B.curled.rows, B.curled.y, 'beard', true);
  }

  // ===================================================================== 配件
  var ACCS = [
    { id: 'recordbag', label: '唱片袋' }, { id: 'tote', label: '帆布袋' }, { id: 'necklace', label: '項鍊' }, { id: 'scarf', label: '圍巾' },
    { id: 'wristband', label: '護腕' }, { id: 'watch', label: '手錶' }, { id: 'badge', label: '徽章' }, { id: 'earring', label: '耳環' }
  ];
  var ACC = byId(ACCS);
  // 裙子、大衣下襬、圍裙下襬（畫在胯上面）
  function drawSkirtEtc(C, spec, view, lift) {
    var H = hipRows(spec.build, view), a = H[0].a, b = H[0].b, side = view === 'side', back = view === 'back';
    if (spec.bottom === 'skirt') {
      C.begin('skirt');
      var fl = [[0, 0], [1, 1], [1, 1], [2, 2], [2, 2]];
      for (var j = 0; j < 5; j++) for (var x = a - fl[j][0]; x <= b + fl[j][1]; x++) {
        var t = j === 4 ? 1 : (x - a) % 3 === 2 && j > 0 ? 1 : 2; if (j === 0 && BOTTOM.skirt.belt) t = 2;
        C.put(x, -8 + j - lift, 'bot', t);
      }
    }
    if (spec.top === 'coat') {
      C.begin('coathem');
      var T = torsoRows(spec.build, view), L = T.left, R = T.right, cx = side ? L + 6 : -1;
      for (var y = -8; y <= -5; y++) for (var x2 = L - (y >= -6 ? 1 : 0); x2 <= R + (y >= -6 ? 1 : 0); x2++) {
        if (!back && (side ? (x2 === cx || x2 === cx - 1) : (x2 === -1 || x2 === 0)) && y > -8) continue;
        C.put(x2, y - lift, 'top', y === -5 ? 1 : 2);
      }
    }
    if (spec.top === 'apron' && !back) {
      C.begin('apronskirt');
      var T2 = torsoRows(spec.build, view), cx2 = side ? T2.left + 6 : -1;
      var l = side ? cx2 - 4 : -5, r = side ? cx2 + 2 : 4;
      for (var y2 = -8; y2 <= -4; y2++) for (var x3 = l; x3 <= r; x3++) {
        var t2 = y2 === -4 ? 1 : 2;
        if (y2 === -7 && x3 >= l + 1 && x3 <= l + 3) t2 = 1;   // 口袋
        if (y2 === -6 && (x3 === l + 1 || x3 === l + 3)) t2 = 1;
        C.put(x3, y2 - lift, 'top', t2);
      }
    }
  }
  // 軀幹上的小東西：徽章
  function drawTorsoAcc(C, spec, view, T, lean, dy) {
    if (has(spec, 'badge') && view !== 'back') {
      C.begin('badge', { ink: false });
      var bx = view === 'side' ? T.left + 3 + lean : 1, by = -13 + dy;
      C.put(bx, by, 'acc', 3); C.put(bx + 1, by, 'acc', 2); C.put(bx, by + 1, 'acc', 2); C.put(bx + 1, by + 1, 'acc', 1);
    }
  }
  // 脖子：項鍊、圍巾
  function drawNeckAcc(C, spec, view, T, lean, dy) {
    var side = view === 'side', cx = side ? T.left + 6 + lean : -1;
    if (has(spec, 'necklace') && view !== 'back' && spec.top !== 'turtleneck') {
      C.begin('necklace', { ink: false });
      var pts = side ? [[-2, 0], [-1, 1], [0, 2], [1, 1]] : [[-2, 0], [-1, 1], [0, 2], [1, 2], [2, 1], [3, 0]];
      pts.forEach(function (q, i) { C.put(cx + q[0] - (side ? 0 : 1) + (side ? 0 : 0), -15 + dy + q[1], 'gold', i % 2 ? 2 : 3); });
      C.put(side ? cx : cx + 0, -12 + dy, 'gold', 4);
    }
    if (has(spec, 'scarf')) {
      C.begin('scarf');
      var a = side ? T.left + 1 + lean : -5, b = side ? T.right + lean : 4;
      for (var y = -17; y <= -15; y++) for (var x = a; x <= b; x++) {
        if (y === -17 && (x === a || x === b)) continue;
        C.put(x, y + dy, 'scarf', y === -17 ? 3 : y === -15 ? 1 : ((x - a) % 3 === 0 ? 1 : 2));
      }
      if (view !== 'back') {   // 垂在胸前的一截＋流蘇
        var tx = side ? cx - 2 : -3;
        for (var t = 0; t < 5; t++) { C.put(tx, -14 + t + dy, 'scarf', t % 2 ? 2 : 3); C.put(tx + 1, -14 + t + dy, 'scarf', t % 2 ? 1 : 2); }
        C.put(tx, -9 + dy, 'scarf', 1); C.put(tx + 1, -8 + dy, 'scarf', 0);
      } else {
        for (var t2 = 0; t2 < 4; t2++) { C.put(1, -14 + t2 + dy, 'scarf', 2); C.put(2, -14 + t2 + dy, 'scarf', 1); }
      }
    }
  }
  // 唱片袋（露出半張黑膠）、帆布袋
  function drawBag(C, spec, view, T, lean, dy, shN, shF, layer) {
    var bag = has(spec, 'recordbag') ? 'record' : has(spec, 'tote') ? 'tote' : null; if (!bag) return;
    var side = view === 'side', back = view === 'back';
    var bw = bag === 'record' ? 7 : 6, bh = bag === 'record' ? 6 : 7;
    var bx = side ? T.left - 4 : back ? T.right - 1 : T.left - 4, by = -10 + Math.max(0, dy);
    C.begin('strap', { ink: false });
    if (bag === 'record') {   // 斜背帶：遠肩 → 近側腰
      var sx = side ? T.right - 1 + lean : back ? T.left + 1 : T.right - 1, sy = -16 + dy, ex = side ? bx + bw - 2 : back ? bx + 1 : bx + bw - 2, ey = by;
      var n = Math.max(Math.abs(ex - sx), Math.abs(ey - sy));
      for (var i = 0; i <= n; i++) C.put(Math.round(sx + (ex - sx) * i / n), Math.round(sy + (ey - sy) * i / n), 'bag', 1);
    } else {
      var hx = side ? T.left + lean : back ? T.right : T.left;
      for (var y = -15 + dy; y < by; y++) { C.put(hx - 1, y, 'canvas', 1); }
    }
    C.begin('bag');
    if (bag === 'record') {
      var cx = bx + 3, cy = by;
      for (var dy2 = -3; dy2 <= 0; dy2++) for (var dx = -3; dx <= 3; dx++) if (dx * dx + dy2 * dy2 <= 11) C.put(cx + dx, cy + dy2, 'vinyl', dx === 0 && dy2 === -1 ? 0 : (dx + dy2 === -4 ? 3 : 2));
      C.put(cx, cy - 1, 'label', 2); C.put(cx - 1, cy - 1, 'label', 3); C.put(cx + 1, cy - 1, 'label', 2);
    }
    for (var yy = 0; yy < bh; yy++) for (var xx = 0; xx < bw; xx++) {
      var t = xx === 0 ? 3 : xx === bw - 1 ? 1 : yy === bh - 1 ? 1 : 2;
      if (bag === 'tote') { if (yy >= 2 && yy <= 4 && xx >= 2 && xx <= 3) C.put(bx + xx, by + yy, 'acc', yy === 4 ? 1 : 2); else C.put(bx + xx, by + yy, 'canvas', t); }
      else C.put(bx + xx, by + yy, 'bag', yy === 1 ? 3 : t);
    }
    if (bag === 'record') { C.put(bx + 3, by + 3, 'gold', 3); C.put(bx + 4, by + 3, 'gold', 2); }
  }
  // 手上的東西：黑膠（9 格）、封套（9×9）、大金盤（11 格）
  function drawRecord(C, cx, cy, r, gold) {
    var mat = gold ? 'gold' : 'vinyl';
    for (var dy = -r; dy <= r; dy++) for (var dx = -r; dx <= r; dx++) {
      var d2 = dx * dx + dy * dy; if (d2 > r * r + r * 0.8) continue;
      var d = Math.sqrt(d2), t = 2;
      if (d < 1.1) { C.put(cx + dx, cy + dy, 'label', dx === 0 && dy === 0 ? 0 : 2); continue; }
      if (d < 1.8 && !gold) { C.put(cx + dx, cy + dy, 'label', dx + dy < 0 ? 3 : 1); continue; }
      if (dx + dy <= -r + 1 && d > r - 1.4) t = 4; else if (dx + dy >= r - 1 && d > r - 1.4) t = 1; else if (Math.round(d) % 2 === 0) t = gold ? 3 : 3; else t = 2;
      C.put(cx + dx, cy + dy, mat, t);
    }
    C.put(cx, cy, 'vinyl', 0);
  }
  function drawSleeve(C, x, y, w, h) {
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) {
      var t = 2, m = 'paper';
      if (i === 0 || j === 0) t = 3; if (i === w - 1 || j === h - 1) t = 1;
      if (i >= 1 && i <= w - 2 && j >= 1 && j <= h - 2) {   // 封面：一個圓＋色塊
        m = 'art'; var dx = i - w / 2 + 0.5, dy = j - h / 2 + 0.5;
        t = (dx * dx + dy * dy < 5) ? -1 : (j < h / 2 ? 2 : 1);
        if (t === -1) { C.put(x + i, y + j, 'art2', dx + dy < 0 ? 3 : 2); continue; }
      }
      C.put(x + i, y + j, m, t);
    }
  }
  function drawHeld(C, spec, P, held, opts) {
    if (!held || held === 'none') return;
    C.begin('held');
    var hN = C.anch.handN, hF = C.anch.handF;
    if (held === 'sleeve') {
      var c = P.heldAt === 'both' && hN && hF ? [Math.round((hN[0] + hF[0]) / 2), Math.round((hN[1] + hF[1]) / 2) - 2] : hN ? [hN[0] + 1, hN[1] - 3] : [2, -14];
      if (P.heldOff) c = [c[0] + P.heldOff[0], c[1] + P.heldOff[1]];
      drawRecord(C, c[0] + 3, c[1], 4); drawSleeve(C, c[0] - 4, c[1] - 4, 9, 9);
      C.anch.held = c;
    } else {
      var h = P.heldAt === 'F' ? hF : P.heldAt === 'both' && hN && hF ? [Math.round((hN[0] + hF[0]) / 2), Math.min(hN[1], hF[1]) - 4] : hN;
      if (!h) h = [0, -14];
      var r = held === 'big' ? 5 : 4, off = P.heldOff || (P.heldAt === 'both' ? [0, 0] : [0, -2]);
      var X = h[0] + off[0], Y = h[1] + off[1];
      drawRecord(C, X, Y, r, held === 'big');
      C.anch.held = [X, Y];
    }
  }

  // ===================================================================== 預設與正規化
  var DEFAULT = {
    skin: 'light', build: 'regular', hair: 'short', hairColor: 'black',
    eyes: 'dot', brows: 'soft', mouth: 'neutral', glasses: 'none', glassesColor: 'black', facial: 'none', facialColor: null, cheeks: 'none',
    hat: 'none', hatColor: 'black', top: 'tee', topColor: null, top2Color: null, bottom: 'jeans', bottomColor: null,
    shoes: 'sneakers', shoesColor: null, acc: [], accColor: 'red'
  };
  function pick(list, v, d) { for (var i = 0; i < list.length; i++) if (list[i].id === v) return v; return d; }
  function normalize(spec) {
    spec = spec || {}; var o = {};
    o.skin = pick(SKINS, spec.skin, DEFAULT.skin);
    o.build = pick(BUILDS, spec.build === 'sturdy' ? 'round' : spec.build, DEFAULT.build);
    o.hair = pick(HAIRS, spec.hair, DEFAULT.hair);
    o.hairColor = pick(HAIRC, spec.hairColor, DEFAULT.hairColor);
    o.eyes = pick(EYES, spec.eyes, DEFAULT.eyes);
    o.brows = pick(BROWS, spec.brows, DEFAULT.brows);
    o.mouth = pick(MOUTHS, spec.mouth, DEFAULT.mouth);
    o.glasses = pick(GLASSES, spec.glasses, 'none');
    o.glassesColor = pick(GLASSCOL, spec.glassesColor, DEFAULT.glassesColor);
    o.facial = pick(FACIALS, spec.facial, 'none');
    o.facialColor = pick(HAIRC, spec.facialColor, o.hairColor);
    o.cheeks = pick(CHEEKS, spec.cheeks, 'none');
    o.hat = pick(HATS, spec.hat, 'none');
    o.hatColor = CLOTHCOL[spec.hatColor] ? spec.hatColor : (HAT[o.hat] && HAT[o.hat].dflt) || DEFAULT.hatColor;
    o.top = pick(TOPS, spec.top, DEFAULT.top);
    o.topColor = CLOTHCOL[spec.topColor] ? spec.topColor : (TOP[o.top].dflt || 'blue');
    o.top2Color = CLOTHCOL[spec.top2Color] ? spec.top2Color : (TOP[o.top].dflt2 || 'white');
    o.bottom = pick(BOTTOMS, spec.bottom, DEFAULT.bottom);
    o.bottomColor = CLOTHCOL[spec.bottomColor] ? spec.bottomColor : BOTTOM[o.bottom].dflt;
    o.shoes = pick(SHOES, spec.shoes, DEFAULT.shoes);
    o.shoesColor = CLOTHCOL[spec.shoesColor] ? spec.shoesColor : SHOE[o.shoes].dflt;
    var acc = Array.isArray(spec.acc) ? spec.acc : (typeof spec.acc === 'string' && spec.acc ? [spec.acc] : []);
    o.acc = acc.filter(function (a, i) { return ACC[a] && acc.indexOf(a) === i; });
    if (o.acc.indexOf('recordbag') >= 0 && o.acc.indexOf('tote') >= 0) o.acc.splice(o.acc.indexOf('tote'), 1);
    o.accColor = CLOTHCOL[spec.accColor] ? spec.accColor : DEFAULT.accColor;
    if (spec.scarfColor && CLOTHCOL[spec.scarfColor]) o.scarfColor = spec.scarfColor;
    if (spec.bagColor && CLOTHCOL[spec.bagColor]) o.bagColor = spec.bagColor;
    if (spec.tieColor && CLOTHCOL[spec.tieColor]) o.tieColor = spec.tieColor;
    if (spec.hatBandColor && CLOTHCOL[spec.hatBandColor]) o.hatBandColor = spec.hatBandColor;
    if (spec.name) o.name = String(spec.name);
    return o;
  }

  // ===================================================================== 材質登記
  var ATTR = { c: '#1f5fae', o: '#6a3fa0', h: '#c11628', g: '#c8961e' };
  function setupMats(C, spec, opts) {
    var sk = SKIN[spec.skin].ramp, hr = hairRamp(spec.hairColor);
    C.reg('skin', sk);
    C.reg('skinsh', [sk[0], sk[1], mix(sk[2], sk[1], 0.5), sk[3], sk[4]]);
    C.reg('eyek', ['#06040a', '#16101a', '#1e1620', '#3a2e34', '#ffffff']);
    C.reg('mouth', [mix(sk[0], '#3a0a10', 0.5), mix(sk[0], sk[1], 0.3), mix(sk[1], '#a8484c', 0.35), sk[2], sk[3]]);
    C.reg('teeth', ['#9a9aa4', '#d6d6dc', '#fbfbfb', '#ffffff', '#ffffff']);
    C.reg('blush', [sk[1], mix(sk[2], '#e8607a', 0.42), mix(sk[2], '#f27088', 0.5), mix(sk[3], '#f890a0', 0.4), sk[4]]);
    C.reg('freck', [sk[0], sk[0], mix(sk[1], '#6a3418', 0.5), sk[2], sk[3]]);
    C.reg('hair', hr);
    C.reg('brow', [hr[0], mix(hr[1], sk[1], 0.2), hr[1], mix(hr[1], sk[1], 0.5), hr[3]]);
    C.reg('beard', hairRamp(spec.facialColor || spec.hairColor));
    C.reg('stub', [sk[1], mix(sk[1], hairRamp(spec.facialColor || spec.hairColor)[1], 0.35), mix(sk[2], hairRamp(spec.facialColor || spec.hairColor)[1], 0.3), sk[3], sk[4]]);
    C.reg('top', cloth(spec.topColor)); C.reg('top2', cloth(spec.top2Color));
    C.reg('apronT', cloth(spec.topColor));
    C.reg('tie', cloth(spec.tieColor || (spec.top2Color === 'red' ? 'navy' : 'red')));
    C.reg('pen', cloth('yellow'));
    C.reg('bot', cloth(spec.bottomColor));
    C.reg('belt', spec.bottomColor === 'brown' || spec.bottomColor === 'camel' ? cloth('black') : METAL.brown);
    C.reg('shoe', cloth(spec.shoesColor));
    C.reg('sole', ['#6a6458', '#b0aa9c', '#ebe6d8', '#f6f2e6', '#ffffff']);
    C.reg('bootsole', ['#0c0a08', '#1e1914', '#2e2620', '#4a3e34', '#6a5a4c']);
    C.reg('white', cloth('white')); C.reg('black', cloth('black'));
    C.reg('hat', cloth(spec.hatColor));
    C.reg('hatb', cloth(spec.hatBandColor || (spec.hatColor === 'black' || spec.hatColor === 'charcoal' ? 'maroon' : 'black')));
    C.reg('gold', METAL.gold); C.reg('silver', METAL.silver);
    C.reg('acc', cloth(spec.accColor));
    C.reg('scarf', cloth(spec.scarfColor || spec.accColor));
    C.reg('bag', cloth(spec.bagColor || 'camel'));
    C.reg('canvas', cloth('cream'));
    C.reg('glass', GLASSCOL_RAMP[spec.glassesColor] || METAL.black);
    C.reg('lens', ['#0a0a12', '#1a1c2a', '#262a3e', '#4a5470', '#a8b6d4']);
    C.reg('clear', [sk[1], sk[2], mix(sk[2], '#cfe8f4', 0.42), mix(sk[3], '#e0f2fa', 0.55), '#f4fbff']);
    C.reg('vinyl', ['#050506', '#0e0e12', '#1a1a20', '#3a3a46', '#7a7a8a']);
    C.reg('label', opts && opts.labelColor ? autoRamp(ATTR[opts.labelColor] || opts.labelColor) : cloth('red'));
    C.reg('paper', cloth('cream'));
    C.reg('art', cloth('teal')); C.reg('art2', cloth('yellow'));
  }

  // ===================================================================== 姿勢表
  // v：side｜front｜back；legs：LEGS 的鍵；N／F：ARMS 的鍵（近手／遠手）；dy：上半身往下沉；lean：上半身往前（+）／後（−）傾幾格；
  // shN／shF：肩點微調；Ffront：遠手畫在軀幹前面；held：手上的東西（record｜sleeve｜big）；heldAt：N｜F｜both；expr：表情
  var POSE = {
    idle: [{ v: 'side', legs: 'stand', N: 'down', F: 'downF' }, { v: 'side', legs: 'stand', N: 'down', F: 'downF', dy: 1 }],
    walk: [
      { v: 'side', legs: 'spread', N: 'swingB', F: 'swingF', Ffront: true },
      { v: 'side', legs: 'passN', N: 'down', F: 'downF', dy: -1 },
      { v: 'side', legs: 'cross', N: 'swingF', F: 'swingB' },
      { v: 'side', legs: 'passF', N: 'down', F: 'downF', dy: -1 }],
    throw: [
      { v: 'side', legs: 'spread', N: 'wind', F: 'swingF', Ffront: true, lean: -1, held: 'record', heldAt: 'N', expr: 'effort' },
      { v: 'side', legs: 'spread', N: 'reach', shN: [4, 0], F: 'swingB', lean: 1, expr: 'effort' },
      { v: 'side', legs: 'spread', N: 'follow', shN: [1, 0], F: 'downF', lean: 1 }],
    hold: [{ v: 'side', legs: 'stand', N: 'chest', F: 'chestF', held: 'sleeve', heldAt: 'both' }],
    show: [{ v: 'side', legs: 'stand', N: 'show', F: 'downF', held: 'record', heldAt: 'N', heldOff: [2, -1], expr: 'cheer' }],
    shield: [{ v: 'side', legs: 'back', N: 'shield', F: 'downF', lean: -1, held: 'sleeve', heldAt: 'N', expr: 'hurt' }],
    hurt: [{ v: 'side', legs: 'back', N: 'flail', F: 'flailF', lean: -2, expr: 'hurt' }, { v: 'side', legs: 'back', N: 'swingB', F: 'downF', lean: -1, expr: 'hurt' }],
    ko: [{ v: 'side', legs: 'stand', N: 'down', F: 'downF', expr: 'ko', rotate: true }],
    dig: [{ v: 'side', legs: 'bend', N: 'dig', F: 'digF', lean: 3, dy: 2, expr: 'down' }, { v: 'side', legs: 'bend', N: 'show', F: 'digF', lean: 1, dy: 1, held: 'sleeve', heldAt: 'N', heldOff: [3, 0], expr: 'cheer' }],
    sit: [{ v: 'side', legs: 'sit', N: 'chest', F: 'downF', dy: 2 }],
    cheer: [{ v: 'side', legs: 'stand', N: 'upV', F: 'upVF', Ffront: true, expr: 'cheer' }, { v: 'side', legs: 'jump', N: 'upV', F: 'upVF', Ffront: true, lift: 3, expr: 'cheer' }],
    shrug: [{ v: 'side', legs: 'stand', N: 'shrug', F: 'shrugF', Ffront: true, expr: 'shrug' }],
    point: [{ v: 'side', legs: 'stand', N: 'down', F: 'point', Ffront: true, expr: 'talk' }],
    up: [{ v: 'side', legs: 'stand', N: 'upHigh', shN: [1, 0], F: 'upHigh', Ffront: true, held: 'big', heldAt: 'both', heldOff: [0, -3], expr: 'cheer' }],
    talk: [{ v: 'side', legs: 'stand', N: 'down', F: 'gesture', Ffront: true, expr: 'talk' }, { v: 'side', legs: 'stand', N: 'down', F: 'downF' }],
    idleFront: [{ v: 'front', legs: 'stand', N: 'down', F: 'down' }, { v: 'front', legs: 'stand', N: 'down', F: 'down', dy: 1 }],
    walkFront: [
      { v: 'front', legs: 'liftN', N: 'down', F: 'down', dy: -1 },
      { v: 'front', legs: 'stand', N: 'down', F: 'down' },
      { v: 'front', legs: 'liftF', N: 'down', F: 'down', dy: -1 },
      { v: 'front', legs: 'stand', N: 'down', F: 'down' }],
    cheerFront: [{ v: 'front', legs: 'stand', N: 'upV', F: 'upV', expr: 'cheer' }, { v: 'front', legs: 'jump', N: 'upV', F: 'upV', lift: 3, expr: 'cheer' }],
    idleBack: [{ v: 'back', legs: 'stand', N: 'down', F: 'down' }, { v: 'back', legs: 'stand', N: 'down', F: 'down', dy: 1 }],
    walkBack: [
      { v: 'back', legs: 'liftN', N: 'down', F: 'down', dy: -1 },
      { v: 'back', legs: 'stand', N: 'down', F: 'down' },
      { v: 'back', legs: 'liftF', N: 'down', F: 'down', dy: -1 },
      { v: 'back', legs: 'stand', N: 'down', F: 'down' }],
    browseBack: [{ v: 'back', legs: 'stand', N: 'hidden', F: 'hidden', dy: 1 }, { v: 'back', legs: 'stand', N: 'hidden', F: 'down', dy: 1 }]
  };
  var POSE_FRAMES = {}; Object.keys(POSE).forEach(function (k) { POSE_FRAMES[k] = POSE[k].length; });

  // ===================================================================== 組裝
  function has(spec, a) { return spec.acc.indexOf(a) >= 0; }
  // 一條腿／一隻手：小圖 + 每格的材質規則
  function stampLimb(C, sp, x0, y0, fn) {
    var rows = sp.rows, n = rows.length;
    for (var r = 0; r < n; r++) { var row = rows[r];
      for (var c = 0; c < row.length; c++) { var ch = row.charAt(c); if (ch === '.') continue;
        var res = fn(ch, x0 + c, y0 + r, c, r, rows); if (res) C.put(x0 + c, y0 + r, res[0], res[1]); } }
  }
  function limbInfo(rows, ch, c, r) {
    var below = r + 1 < rows.length ? rows[r + 1].charAt(c) : '.';
    var firstCol = rows[r].indexOf(ch);
    return { bottomRow: below === '.' || below === '' || (below !== ch && below.toLowerCase() !== ch.toLowerCase() && below !== ch.toLowerCase()), c: c - firstCol, r: r,
      lastUpper: (ch === 'L' || ch === 'M') && (below === 'l' || below === 'm') };
  }
  // 自動陰影：同一塊的右緣、下緣壓暗一階；左上角亮一階（只動本色那幾格）
  function autoShade(C, partIdx, o) {
    o = o || {};
    var m = C.m, t = C.t, p = C.p;
    function same(x, y) { var i = C.idx(x, y); return i >= 0 && m[i] && p[i] === partIdx; }
    var hits = [];
    for (var y = -AY; y < BH - AY; y++) for (var x = -AX; x < BW - AX; x++) {
      var i = C.idx(x, y); if (i < 0 || !m[i] || p[i] !== partIdx || t[i] !== 2) continue;
      var nt = 2;
      if (!same(x + 1, y) && !o.noRight) nt = 1;
      else if (o.bottom && !same(x, y + 1)) nt = 1;
      else if (!o.noLight && !same(x - 1, y) && !same(x, y - 1)) nt = 3;
      if (nt !== 2) hits.push([i, nt]);
    }
    hits.forEach(function (h) { t[h[0]] = h[1]; });
  }

  function build(spec, pose, frame, opts) {
    spec = normalize(spec); opts = opts || {};
    var frames = POSE[pose] || POSE.idle; var P = frames[((frame | 0) % frames.length + frames.length) % frames.length];
    var C = new Comp(); setupMats(C, spec, opts);
    var view = P.v, side = view === 'side', back = view === 'back';
    var ex = extend(EXPR[P.expr] || {}, opts.expr ? (EXPR[opts.expr] || {}) : {});
    var lift = P.lift || 0, dy = (P.dy || 0) - lift, lean = P.lean || 0;
    var T = torsoRows(spec.build, view);
    var held = opts.held != null ? opts.held : P.held;
    // 肩點
    var shN = side ? [T.left + lean, -15 + dy] : [T.left, -15 + dy], shF = side ? [T.right + lean, -15 + dy] : [T.right, -15 + dy];
    if (back) { var tmp = shN; shN = shF; shF = tmp; }
    if (P.shN) { shN = [shN[0] + P.shN[0], shN[1] + P.shN[1]]; }
    if (P.shF) { shF = [shF[0] + P.shF[0], shF[1] + P.shF[1]]; }
    var head = HEAD_AT[view], hx = head[0] + lean + (side && lean > 1 ? 1 : 0), hy = head[1] + dy;
    var parts = {};
    function arm(which, dry) {
      var id = which === 'N' ? P.N : P.F, sp = ARMS[id] || ARMS.down, sh = which === 'N' ? shN : shF;
      var flip = !side && ((which === 'F') !== back);   // 正面：右手（遠手）鏡射；背面相反
      var rows = flip ? sp.rows.map(function (r) { return r.split('').reverse().join(''); }) : sp.rows;
      var ox = flip ? -(sp.at[0] + rows[0].length - 1) : sp.at[0];
      var x0 = sh[0] + ox + (flip ? 0 : 0), y0 = sh[1] + sp.at[1];
      if (flip) x0 = sh[0] - sp.at[0] - rows[0].length + 1;
      var hand = [0, 0, 0];
      if (dry) { rows.forEach(function (r, j) { for (var i = 0; i < r.length; i++) if (r.charAt(i) === 'H') { hand[0] += x0 + i; hand[1] += y0 + j; hand[2]++; } }); if (hand[2]) C.anch['hand' + which] = [Math.round(hand[0] / hand[2]), Math.round(hand[1] / hand[2])]; return; }
      parts['arm' + which] = C.begin('arm' + which);
      stampLimb(C, { rows: rows }, x0, y0, function (ch, x, y, c, r, rr) {
        if (ch === 'H') { hand[0] += x; hand[1] += y; hand[2]++; }
        var below = r + 1 < rr.length ? rr[r + 1].charAt(c) : '.';
        var right = rr[r].charAt(c + 1), left = rr[r].charAt(c - 1);
        var cuff = ch === 'a' && (below === 'H' || right === 'H' || left === 'H');
        var res = sleevePx(spec, ch, cuff);
        if (!res && ch === 'A') res = ['top' + (r % 2 ? '2' : ''), 2];
        if (TOP[spec.top].sleeve === 'long' && spec.top === 'flannel' && ch !== 'H') res = ((x + 40) % 3 === 1 || (y + 40) % 3 === 2) ? ['top2', 2] : ['top', 2];
        if (ch === 'a' && has(spec, 'wristband') && which === 'N' && cuff) res = ['acc', 2];
        if (ch === 'a' && has(spec, 'watch') && which === 'F' && cuff) res = ['silver', 3];
        return res;
      });
      if (hand[2]) C.anch['hand' + which] = [Math.round(hand[0] / hand[2]), Math.round(hand[1] / hand[2])];
    }
    function leg(which) {
      var L = (LEGS[view] || LEGS.side)[P.legs] || LEGS[view].stand, lg = L[which], sh = L[which + 's'];
      if (back) { lg = L[which === 'N' ? 'F' : 'N']; sh = L[which === 'N' ? 'Fs' : 'Ns']; }
      parts['leg' + which] = C.begin('leg' + which);
      stampLimb(C, lg, lg.at[0], lg.at[1], function (ch, x, y, c, r, rr) {
        var info = limbInfo(rr, ch, c, r);
        var k = ch.toUpperCase() === 'M' ? (ch === 'M' ? 'L' : 'l') : ch;
        return bottomPx(spec, view, k === 'M' ? 'L' : k, x, y, info);
      });
      parts['shoe' + which] = C.begin('shoe' + which);
      var w = sh.rows[1].length;
      stampLimb(C, sh, sh.at[0], sh.at[1], function (ch, x, y, c, r) { return shoePx(spec, ch, c, r, w); });
      // 高筒鞋、靴子往上蓋一格
      if ((spec.shoes === 'hightops' || spec.shoes === 'boots') && !(spec.bottom === 'skirt' || spec.bottom === 'shorts') || spec.shoes === 'boots') {
        var top = sh.rows[0], yy = sh.at[1] - 1;
        for (var c2 = 0; c2 < top.length; c2++) if (top.charAt(c2) !== '.' && c2 < top.length - 1) C.put(sh.at[0] + c2, yy, 'shoe', spec.shoes === 'boots' ? (c2 === 0 ? 3 : 2) : (c2 === 1 ? 3 : 2));
      }
    }
    arm('N', true); arm('F', true);
    // ---- 後層：長髮、遠手
    var Hd = HAIR[spec.hair];
    if (Hd && !back) { var hb = side ? Hd.sb : Hd.fb; if (hb && !(HAT[spec.hat] && HAT[spec.hat].noBackHair)) { C.begin('hairback'); stamp(C, hb.rows, hx + hb.ox, hy + hb.oy, tones('hair')); } }
    if (side && !P.Ffront) arm('F');
    // ---- 腿、胯
    leg('F'); leg('N');
    parts.hip = C.begin('hip');
    hipRows(spec.build, view).forEach(function (r) { for (var x = r.a; x <= r.b; x++) { var res = bottomPx(spec, view, 'P', x, r.y + Math.min(0, dy + lift > 0 ? 0 : 0), {}); C.put(x, r.y - lift, res[0], res[1]); } });
    drawSkirtEtc(C, spec, view, lift);
    if (back) { arm('N'); arm('F'); }
    // ---- 軀幹
    parts.torso = C.begin('torso');
    T.rows.forEach(function (r, j) {
      var sh = side ? (j < 4 ? lean : Math.round(lean / 2)) : 0;
      for (var x = r.a; x <= r.b; x++) { var res = topPx(spec, view, x, r.y, T); if (res) C.put(x + sh, r.y + dy, res[0], res[1]); }
    });
    drawTorsoAcc(C, spec, view, T, lean, dy);
    if (!side && !back) { arm('N'); arm('F'); }
    // ---- 頭
    C.begin('head', { under: false });
    stamp(C, SKULL[view], hx, hy, { c: ['skin', 2], d: ['skin', 1], l: ['skin', 3] });
    if (Hd && Hd.shine && !hatOn(spec)) { C.put(hx + (side ? 6 : 5), hy + 1, 'skin', 4); C.put(hx + (side ? 5 : 4), hy + 2, 'skin', 3); C.put(hx + (side ? 7 : 6), hy + 1, 'skin', 3); }
    if (!back) {
      drawFacial(C, hx, hy, spec, view, 'under');
      drawFace(C, hx, hy, spec, ex, view);
      drawFacial(C, hx, hy, spec, view, 'over');
    }
    drawHair(C, spec, view, hx, hy);
    drawEars(C, spec, view, hx, hy);
    if (!back) drawGlasses(C, spec, view, hx, hy, ex);
    drawHat(C, spec, view, hx, hy);
    drawNeckAcc(C, spec, view, T, lean, dy);
    // ---- 前層：袋子、遠手、近手、手上的東西
    drawBag(C, spec, view, T, lean, dy, shN, shF, 'front');
    if (side && P.Ffront) arm('F');
    if (held && P.heldAt !== 'N' && !P.heldFront) drawHeld(C, spec, P, held, opts);
    if (side) arm('N');
    if (held && (P.heldAt === 'N' || P.heldFront)) drawHeld(C, spec, P, held, opts);
    // ---- 陰影、錨點
    ['torso', 'hip', 'armN', 'armF'].forEach(function (k) { if (parts[k]) autoShade(C, parts[k], { bottom: k === 'torso' }); });
    ['legN', 'legF'].forEach(function (k) { if (parts[k]) autoShade(C, parts[k], { noLight: true }); });
    C.anch.foot = [0, 0];
    var topY = hy; for (var y = hy - 12; y < hy + 4; y++) { var any = false; for (var x = hx - 3; x < hx + 18; x++) if (C.get(x, y)) { any = true; break; } if (any) { topY = y; break; } }
    C.anch.head = [hx + (side ? 7 : 7), topY];
    C.anch.face = [hx + (side ? 10 : 7), hy + 9];
    C.anch.chest = [side ? T.left + 5 + lean : -1, -12 + dy];
    C.anch.hip = [-1, -8];
    if (pose === 'sit') C.anch.seat = [-1, -6 + dy];
    var out = finish(C, opts);
    if (P.rotate) out = rotateCCW(out);
    return out;
  }
  function hatOn(spec) { return spec.hat !== 'none'; }
  // 倒地：整張逆時針轉 90°（頭到左邊、臉朝上），錨點改成躺平後的底邊中點
  function rotateCCW(f) {
    var W = f.w, H = f.h, d = new Uint8ClampedArray(W * H * 4);
    for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) { var s = (y * W + x) * 4, nx = y, ny = W - 1 - x, t = (ny * H + nx) * 4; d[t] = f.data[s]; d[t + 1] = f.data[s + 1]; d[t + 2] = f.data[s + 2]; d[t + 3] = f.data[s + 3]; }
    var nw = H, nh = W, ax = Math.floor(nw / 2), ay = nh, an = {};
    Object.keys(f.anchors).forEach(function (k) { var a = f.anchors[k], ox = a[0] + f.ax, oy = a[1] + f.ay, nx = oy, ny = W - 1 - ox; an[k] = [nx - ax, ny - ay]; });
    an.foot = [0, 0];
    return { w: nw, h: nh, ax: ax, ay: ay, data: d, anchors: an };
  }

  // ===================================================================== 客人與老闆（舊 16 格 SPR 的辨識點全留，細節加倍）
  var NPC = {
    // 唱片行老闆：灰髮、眼鏡、灰鬍子、白襯衫、綠圍裙、灰褲（SPR.owner）
    owner: { name: '老闆', skin: 'light', build: 'round', hair: 'short', hairColor: 'grey', brows: 'thick', eyes: 'dot', mouth: 'smile',
      glasses: 'square', glassesColor: 'black', facial: 'beard', facialColor: 'grey', top: 'apron', topColor: 'green', top2Color: 'white',
      bottom: 'chinos', bottomColor: 'grey', shoes: 'boots', shoesColor: 'brown', acc: ['watch'] },
    // 男子（e0）：金耳機、黑髮、白 T、藍牛仔褲；序章打輸把唱片塞回袋子 → 背唱片袋
    man: { name: '男子', skin: 'light', hair: 'short', hairColor: 'black', brows: 'raised', mouth: 'smirk', hat: 'headphones', hatColor: 'gold',
      top: 'tee', topColor: 'white', bottom: 'jeans', bottomColor: 'denim', shoes: 'sneakers', shoesColor: 'white', accColor: 'red', acc: ['recordbag'], bagColor: 'charcoal' },
    // 那張我有（e1）：綠毛帽、紅圍巾、淺灰上衣、黑褲
    copycat: { name: '那張我有', skin: 'porcelain', hair: 'bob', hairColor: 'brown', mouth: 'smile', cheeks: 'blush',
      hat: 'beanie', hatColor: 'green', top: 'cardigan', topColor: 'lightgrey', top2Color: 'cream', bottom: 'blackjeans', shoes: 'hightops', shoesColor: 'cream',
      acc: ['scarf', 'tote'], scarfColor: 'red', accColor: 'red' },
    // 我早就聽過（e2）：藍棒球帽、白 T、黑褲
    already: { name: '我早就聽過', skin: 'tan', hair: 'short', hairColor: 'black', eyes: 'sleepy', mouth: 'smirk', hat: 'cap', hatColor: 'blue',
      top: 'bandtee', topColor: 'white', top2Color: 'black', bottom: 'blackjeans', shoes: 'sneakers', shoesColor: 'white', acc: ['wristband'], accColor: 'blue' },
    // 針壓強迫症（e6）：橘色紳士帽、紫上衣、黑褲
    needle: { name: '針壓強迫症', skin: 'light', build: 'slim', hair: 'sidepart', hairColor: 'black', eyes: 'narrow', brows: 'raised', mouth: 'flat', facial: 'moustache',
      hat: 'bowler', hatColor: 'orange', top: 'suit', topColor: 'purple', top2Color: 'white', tieColor: 'black', bottom: 'slacks', bottomColor: 'black',
      shoes: 'loafers', shoesColor: 'black', acc: ['watch'] },
    // 跳針王（e4）：光頭、灰鬍子、白袖子、金色圍裙、灰褲
    skip: { name: '跳針王', skin: 'tan', build: 'round', hair: 'bald', hairColor: 'grey', facial: 'beard', facialColor: 'grey', brows: 'thick', mouth: 'grin',
      top: 'apron', topColor: 'mustard', top2Color: 'white', bottom: 'chinos', bottomColor: 'grey', shoes: 'boots', shoesColor: 'brown' },
    // 月底吃土（舊捏角色：反戴帽、棕、紅上衣、灰褲）
    broke: { name: '月底吃土', skin: 'light', hair: 'short', hairColor: 'espresso', eyes: 'sleepy', brows: 'worried', mouth: 'frown', hat: 'capback', hatColor: 'brown',
      top: 'hoodie', topColor: 'red', top2Color: 'white', bottom: 'joggers', bottomColor: 'grey', shoes: 'sneakers', shoesColor: 'lightgrey', accColor: 'grey' },
    // 剁手黨（舊捏角色：黑紳士帽、黑髮、金上衣、黑褲、小麥膚）
    buyer: { name: '剁手黨', skin: 'tan', build: 'round', hair: 'short', hairColor: 'black', eyes: 'happy', mouth: 'grin', hat: 'fedora', hatColor: 'black',
      top: 'shirt', topColor: 'mustard', bottom: 'blackjeans', shoes: 'loafers', shoesColor: 'brown', acc: ['recordbag', 'necklace', 'watch'], bagColor: 'red' },
    // 冷門仙人（e5）：長黑髮、全身黑
    label: { name: '冷門仙人', skin: 'porcelain', build: 'slim', hair: 'long', hairColor: 'black', eyes: 'narrow', brows: 'soft', mouth: 'flat',
      top: 'coat', topColor: 'black', top2Color: 'charcoal', bottom: 'blackjeans', shoes: 'boots', shoesColor: 'black', acc: ['earring', 'necklace'] },
    // 名盤守門員（e3）：紫貝雷帽、眼鏡、淺灰上衣、黑褲
    critic: { name: '名盤守門員', skin: 'peach', hair: 'short', hairColor: 'black', glasses: 'round', glassesColor: 'silver',
      brows: 'raised', mouth: 'flat', hat: 'beret', hatColor: 'purple', top: 'turtleneck', topColor: 'lightgrey', bottom: 'slacks', bottomColor: 'black',
      shoes: 'loafers', shoesColor: 'brown', acc: ['badge'], accColor: 'purple' },
    // 傳說藏家（boss）：高禮帽、單片眼鏡、黑西裝、白襯衫、紅領帶
    boss: { name: '傳說藏家', skin: 'light', hair: 'short', hairColor: 'white', eyes: 'narrow', brows: 'thick', mouth: 'smirk', glasses: 'monocle',
      facial: 'curled', facialColor: 'white', hat: 'tophat', hatColor: 'black', hatBandColor: 'maroon', top: 'suit', topColor: 'black', top2Color: 'white', tieColor: 'red',
      bottom: 'slacks', bottomColor: 'black', shoes: 'loafers', shoesColor: 'black', acc: ['watch'] },
    // 舊流派預設＋品味之神（LAB_SPR 的其他鍵）
    guard: { name: '守舊派', hair: 'sidepart', hairColor: 'black', top: 'cardigan', topColor: 'blue', top2Color: 'white', bottom: 'slacks', bottomColor: 'black', shoes: 'loafers' },
    digger: { name: '挖掘派', hair: 'short', hairColor: 'brown', hat: 'capback', hatColor: 'green', top: 'hoodie', topColor: 'green', bottom: 'cargo', bottomColor: 'grey', shoes: 'sneakers', acc: ['recordbag'] },
    heretic: { name: '異端派', hair: 'spiky', hairColor: 'black', top: 'leather', topColor: 'red', top2Color: 'black', bottom: 'blackjeans', shoes: 'boots', shoesColor: 'black', acc: ['wristband'], accColor: 'black' },
    god: { name: '品味之神', skin: 'light', hair: 'long', hairColor: 'black', eyes: 'narrow', mouth: 'smile', hat: 'crown', hatColor: 'gold',
      top: 'coat', topColor: 'purple', top2Color: 'gold', bottom: 'slacks', bottomColor: 'purple', shoes: 'loafers', shoesColor: 'gold' }
  };
  var SPR_KEY = { e0: 'man', e1: 'copycat', e2: 'already', e3: 'critic', e4: 'skip', e5: 'label', e6: 'needle', e7: 'god', boss: 'boss', owner: 'owner', guard: 'guard', digger: 'digger', heretic: 'heretic' };
  function npc(id) { var k = NPC[id] ? id : SPR_KEY[id]; if (!k || !NPC[k]) return null; var o = JSON.parse(JSON.stringify(NPC[k])); o.id = k; return o; }

  // ===================================================================== 舊捏角色 → 新零件（dip-character.js：head／hair／shirt／pants／skin）
  var OLD_COLOR = { k: 'black', g: 'mustard', r: 'red', b: 'blue', w: 'white', e: 'lightgrey', d: 'grey', n: 'green', p: 'purple', o: 'orange', y: 'yellow', s: 'camel', c: 'teal', t: 'camel', u: 'brown', v: 'cream', m: 'pink' };
  var OLD_HAIR = { k: 'black', d: 'grey', o: 'ginger', y: 'blonde', r: 'red', b: 'blue', n: 'green', p: 'purple', c: 'teal', m: 'pink', w: 'white', u: 'brown', t: 'brown', s: 'blonde', g: 'blonde', e: 'platinum', v: 'platinum' };
  var OLD_SKIN = { v: 'porcelain', s: 'light', t: 'tan', u: 'brown' };
  var OLD_PANTS = { k: ['blackjeans', 'black'], d: ['chinos', 'grey'], b: ['jeans', 'denim'], n: ['cargo', 'green'], p: ['chinos', 'purple'], o: ['chinos', 'orange'], e: ['chinos', 'lightgrey'], w: ['chinos', 'white'] };
  var OLD_HEAD = {
    neat: { hair: 'sidepart' }, bob: { hair: 'bob' }, spike: { hair: 'spiky' }, long: { hair: 'long' },
    cap: { hair: 'short', hat: 'capback', hatFromHair: true }, ballcap: { hair: 'short', hat: 'cap', hatFromHair: true },
    beanie: { hair: 'short', hat: 'beanie', hatFromHair: true }, beret: { hair: 'short', hat: 'beret', hatFromHair: true, glasses: 'round' },
    fedora: { hair: 'short', hat: 'fedora', hatFromHair: true }, phones: { hair: 'short', hat: 'headphones', hatColor: 'gold' }
  };
  function fromDipChar(av) {
    av = av || {}; var h = OLD_HEAD[av.head] || OLD_HEAD.neat, hairKey = typeof av.hair === 'string' ? av.hair : 'k';
    var o = { skin: OLD_SKIN[av.skin] || 'light', hair: h.hair, hairColor: 'black', top: 'tee', topColor: OLD_COLOR[av.shirt] || 'blue',
      shoes: 'sneakers', shoesColor: 'white' };
    if (h.hatFromHair) { o.hat = h.hat; o.hatColor = OLD_COLOR[hairKey] || 'black'; o.hairColor = 'black'; if (h.hat === 'beanie' || h.hat === 'beret') o.hairColor = 'espresso'; }
    else { o.hairColor = OLD_HAIR[hairKey] || 'black'; if (h.hat) { o.hat = h.hat; o.hatColor = h.hatColor; } }
    if (h.glasses) o.glasses = h.glasses;
    var pt = OLD_PANTS[av.pants] || OLD_PANTS.k; o.bottom = pt[0]; o.bottomColor = pt[1];
    if (o.topColor === o.bottomColor && o.top === 'tee') o.top = 'bandtee';
    return normalize(o);
  }

  // ===================================================================== 隨機路人（同一個 seed 永遠同一個人）
  function rng(seed) {
    var a = 0; seed = String(seed == null ? 0 : seed); for (var i = 0; i < seed.length; i++) a = (Math.imul(a, 31) + seed.charCodeAt(i)) | 0;
    return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function random(seed, o) {
    var R = rng(seed), base = (o && o.base) || {};
    function pk(arr) { return arr[Math.floor(R() * arr.length)]; }
    function wpk(pairs) { var tot = 0, i; for (i = 0; i < pairs.length; i++) tot += pairs[i][1]; var r = R() * tot; for (i = 0; i < pairs.length; i++) { r -= pairs[i][1]; if (r < 0) return pairs[i][0]; } return pairs[0][0]; }
    var sp = {};
    sp.skin = pk(['porcelain', 'light', 'light', 'peach', 'peach', 'tan', 'tan', 'olive', 'brown', 'deep']);
    sp.build = wpk([['slim', 3], ['regular', 6], ['round', 2]]);
    sp.hair = wpk([['short', 4], ['buzz', 2], ['sidepart', 3], ['bangs', 2], ['spiky', 1.5], ['curly', 2], ['bob', 3], ['long', 3], ['longbangs', 2], ['wavy', 2], ['afro', 1], ['ponytail', 2], ['bun', 2], ['mohawk', 0.7], ['mullet', 1], ['bald', 0.8], ['horseshoe', 0.6]]);
    sp.hairColor = wpk([['black', 7], ['espresso', 5], ['brown', 4], ['auburn', 1], ['ginger', 1], ['blonde', 1], ['platinum', 0.8], ['grey', 1], ['white', 0.5], ['blue', 0.6], ['pink', 0.6], ['green', 0.4], ['purple', 0.4], ['teal', 0.4], ['red', 0.4]]);
    if (sp.hair === 'horseshoe' && R() < 0.7) sp.hairColor = pk(['grey', 'white', 'black']);
    sp.eyes = wpk([['dot', 6], ['round', 2], ['big', 1.5], ['sleepy', 2], ['happy', 1], ['lash', 1.5], ['narrow', 1.5], ['sharp', 1]]);
    sp.brows = wpk([['soft', 5], ['thick', 2], ['raised', 1], ['worried', 1], ['angry', 0.5], ['none', 1]]);
    sp.mouth = wpk([['neutral', 4], ['smile', 4], ['smirk', 1.5], ['flat', 1.5], ['grin', 1], ['frown', 0.5], ['cat', 0.6]]);
    sp.glasses = wpk([['none', 12], ['round', 2], ['square', 2], ['sunglasses', 1], ['browline', 1]]);
    sp.glassesColor = pk(['black', 'black', 'brown', 'gold', 'silver', 'red']);
    sp.facial = R() < 0.22 ? pk(['stubble', 'stubble', 'moustache', 'beard', 'goatee']) : 'none';
    sp.cheeks = wpk([['none', 8], ['blush', 1.5], ['freckles', 1.2], ['both', 0.5]]);
    sp.hat = R() < 0.32 ? pk(['beanie', 'cap', 'capback', 'bucket', 'fedora', 'beret', 'headphones', 'bandana', 'bowler']) : 'none';
    sp.top = pk(['tee', 'tee', 'bandtee', 'bandtee', 'stripe', 'shirt', 'hoodie', 'hoodie', 'flannel', 'denim', 'leather', 'turtleneck', 'cardigan', 'suit', 'coat']);
    var warm = ['red', 'maroon', 'orange', 'mustard', 'yellow', 'camel', 'brown', 'pink', 'magenta'], cool = ['blue', 'navy', 'sky', 'teal', 'mint', 'green', 'forest', 'olive', 'purple', 'lavender'], neut = ['white', 'cream', 'lightgrey', 'grey', 'charcoal', 'black'];
    var pal = R() < 0.4 ? neut : R() < 0.5 ? warm : cool;
    sp.topColor = TOP[sp.top].dflt && R() < 0.5 ? TOP[sp.top].dflt : pk(pal);
    sp.top2Color = pk(neut.concat([sp.topColor === 'white' ? 'black' : 'white']));
    if (sp.top2Color === sp.topColor) sp.top2Color = sp.topColor === 'white' ? 'black' : 'white';
    sp.bottom = wpk([['jeans', 5], ['blackjeans', 4], ['chinos', 3], ['slacks', 1.5], ['shorts', 1.5], ['skirt', 1.5], ['cargo', 1.5], ['joggers', 1]]);
    sp.bottomColor = R() < 0.65 ? BOTTOM[sp.bottom].dflt : pk(['black', 'charcoal', 'grey', 'khaki', 'olive', 'navy', 'brown', 'denim', 'lightdenim', 'cream', 'maroon']);
    if (sp.bottomColor === sp.topColor) sp.bottomColor = BOTTOM[sp.bottom].dflt === sp.topColor ? 'denim' : BOTTOM[sp.bottom].dflt;
    sp.shoes = wpk([['sneakers', 5], ['hightops', 3], ['boots', 2], ['loafers', 2], ['sandals', 0.6]]);
    sp.shoesColor = R() < 0.6 ? SHOE[sp.shoes].dflt : pk(['white', 'black', 'red', 'navy', 'cream', 'brown', 'green', 'yellow']);
    sp.hatColor = pk(neut.concat(warm, cool));
    if (sp.hat === 'headphones') sp.hatColor = pk(['gold', 'black', 'white', 'red', 'silver']) === 'silver' ? 'lightgrey' : pk(['gold', 'black', 'white', 'red']);
    sp.accColor = pk(warm.concat(cool));
    sp.scarfColor = pk(warm.concat(cool, neut));
    sp.bagColor = pk(['camel', 'brown', 'black', 'olive', 'navy', 'maroon', 'cream']);
    var acc = [], n = wpk([[0, 4], [1, 4], [2, 2]]);
    var pool = ['recordbag', 'recordbag', 'tote', 'necklace', 'scarf', 'wristband', 'watch', 'badge', 'earring'];
    while (acc.length < n) { var a = pk(pool); if (acc.indexOf(a) < 0 && !(a === 'tote' && acc.indexOf('recordbag') >= 0) && !(a === 'recordbag' && acc.indexOf('tote') >= 0)) acc.push(a); }
    sp.acc = acc;
    Object.keys(base).forEach(function (k) { sp[k] = base[k]; });
    return normalize(sp);
  }

  // ===================================================================== 目錄（捏人介面用；label 繁中）
  function cat(list) { return list.map(function (x) { return { id: x.id, label: x.label }; }); }
  var PARTS = {
    skin: cat(SKINS), build: cat(BUILDS),
    hair: cat(HAIRS), hairColor: cat(HAIRC), eyes: cat(EYES), brows: cat(BROWS), mouth: cat(MOUTHS),
    glasses: cat(GLASSES), facial: cat(FACIALS), cheeks: cat(CHEEKS), hat: cat(HATS),
    top: cat(TOPS), bottom: cat(BOTTOMS), shoes: cat(SHOES), acc: cat(ACCS), color: cat(CLOTH),
    glassesColor: cat(GLASSCOL)
  };
  // 捏人欄位（分頁、順序、色票來源）
  var SLOTS = [
    { tab: 'body', label: '身形', fields: [{ key: 'skin', label: '膚色', list: 'skin', swatch: 'skin' }, { key: 'build', label: '體型', list: 'build' }] },
    { tab: 'face', label: '臉', fields: [{ key: 'eyes', label: '眼睛', list: 'eyes' }, { key: 'brows', label: '眉毛', list: 'brows' }, { key: 'mouth', label: '嘴巴', list: 'mouth' },
      { key: 'cheeks', label: '臉頰', list: 'cheeks' }, { key: 'glasses', label: '眼鏡', list: 'glasses' }, { key: 'glassesColor', label: '鏡框色', list: 'glassesColor', swatch: 'glass' },
      { key: 'facial', label: '鬍子', list: 'facial' }] },
    { tab: 'hair', label: '頭髮', fields: [{ key: 'hair', label: '髮型', list: 'hair' }, { key: 'hairColor', label: '髮色', list: 'hairColor', swatch: 'hair' }] },
    { tab: 'hat', label: '帽子', fields: [{ key: 'hat', label: '帽子', list: 'hat' }, { key: 'hatColor', label: '帽色', list: 'color', swatch: 'cloth' }] },
    { tab: 'top', label: '上衣', fields: [{ key: 'top', label: '款式', list: 'top' }, { key: 'topColor', label: '主色', list: 'color', swatch: 'cloth' }, { key: 'top2Color', label: '內搭／配色', list: 'color', swatch: 'cloth' }] },
    { tab: 'bottom', label: '褲裙', fields: [{ key: 'bottom', label: '款式', list: 'bottom' }, { key: 'bottomColor', label: '顏色', list: 'color', swatch: 'cloth' }] },
    { tab: 'shoes', label: '鞋', fields: [{ key: 'shoes', label: '款式', list: 'shoes' }, { key: 'shoesColor', label: '顏色', list: 'color', swatch: 'cloth' }] },
    { tab: 'acc', label: '配件', fields: [{ key: 'acc', label: '配件（可複選）', list: 'acc', multi: true }, { key: 'accColor', label: '配件色', list: 'color', swatch: 'cloth' },
      { key: 'scarfColor', label: '圍巾色', list: 'color', swatch: 'cloth' }, { key: 'bagColor', label: '袋子色', list: 'color', swatch: 'cloth' }] }
  ];
  function swatch(kind, id) {
    var r = kind === 'skin' ? (SKIN[id] && SKIN[id].ramp) : kind === 'hair' ? (HAIRCOL[id] && HAIRCOL[id].ramp) : kind === 'glass' ? GLASSCOL_RAMP[id] : anyRamp(id);
    return r ? r[2] : '#ff00ff';
  }

  // ===================================================================== 輸出：快取、canvas、繪製
  var CACHE = {}, CACHE_N = 0, CACHE_MAX = 800;
  function keyOf(spec, pose, frame, opts) { return JSON.stringify([normalize(spec), pose, frame | 0, opts && opts.held, opts && opts.labelColor, opts && opts.expr, opts && opts.outline === false]); }
  function composeCached(spec, pose, frame, opts) {
    var k = keyOf(spec, pose, frame, opts), hit = CACHE[k];
    if (hit) return hit;
    if (CACHE_N > CACHE_MAX) { CACHE = {}; CACHE_N = 0; }
    hit = CACHE[k] = build(spec, POSE[pose] ? pose : 'idle', frame, opts); CACHE_N++;
    return hit;
  }
  function hasDOM() { return typeof document !== 'undefined' && document.createElement; }
  function frameCanvas(f) {
    if (f._cv) return f._cv;
    if (!hasDOM()) return null;
    var cv = document.createElement('canvas'); cv.width = f.w; cv.height = f.h;
    var cx = cv.getContext('2d'), im = cx.createImageData(f.w, f.h); im.data.set(f.data); cx.putImageData(im, 0, 0);
    cv.ax = f.ax; cv.ay = f.ay; cv.anchors = f.anchors;
    f._cv = cv; return cv;
  }
  function toCanvas(spec, pose, frame, opts) { return frameCanvas(composeCached(spec, pose || 'idle', frame || 0, opts)); }
  function toDataURL(spec, pose, frame, opts) {
    opts = opts || {}; var f = composeCached(spec, pose || 'idle', frame || 0, opts), k = Math.max(1, opts.scale | 0 || 1);
    if (!hasDOM()) return null;
    var cv = document.createElement('canvas'); cv.width = f.w * k; cv.height = f.h * k;
    var cx = cv.getContext('2d'); cx.imageSmoothingEnabled = false;
    if (opts.flip) { cx.translate(cv.width, 0); cx.scale(-1, 1); }
    cx.drawImage(frameCanvas(f), 0, 0, f.w * k, f.h * k);
    return cv.toDataURL('image/png');
  }
  function flipA(a, flip, k) { return [(flip ? -a[0] : a[0]) * k, a[1] * k]; }
  function anchor(spec, pose, frame, name, o) { o = o || {}; var f = composeCached(spec, pose || 'idle', frame || 0, o), a = f.anchors[name]; if (!a) return null; return flipA(a, o.flip, o.scale || 1); }
  // ctx 上畫一格：(x,y)＝腳底中點
  function render(ctx, spec, pose, frame, x, y, o) {
    o = o || {}; var f = composeCached(spec, pose || 'idle', frame || 0, o), k = Math.max(1, o.scale | 0 || 1), flip = !!o.flip;
    var left = flip ? x - (f.w - f.ax) * k : x - f.ax * k, top = y - f.ay * k;
    var cv = (!o.sil && hasDOM() && typeof ctx.drawImage === 'function') ? frameCanvas(f) : null;
    var ga = ctx.globalAlpha; if (o.alpha != null) ctx.globalAlpha = (ga == null ? 1 : ga) * o.alpha;
    if (o.shadow && !o.sil && pose !== 'ko') {   // 腳底影子（兩層：外淡內濃）
      var sw = (o.shadow === true ? 8 : o.shadow) * k;
      ctx.fillStyle = 'rgba(18,8,2,0.22)'; ctx.fillRect(Math.round(x - sw), y - k, Math.round(sw * 2), 2 * k);
      ctx.fillStyle = 'rgba(18,8,2,0.28)'; ctx.fillRect(Math.round(x - sw + 2 * k), y - k, Math.round(sw * 2 - 4 * k), k);
    }
    if (cv) {
      var sm = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = false;
      if (flip) { ctx.save(); ctx.translate(left + f.w * k, top); ctx.scale(-1, 1); ctx.drawImage(cv, 0, 0, f.w * k, f.h * k); ctx.restore(); }
      else ctx.drawImage(cv, left, top, f.w * k, f.h * k);
      ctx.imageSmoothingEnabled = sm;
    } else {
      // 沒有 DOM（或要剪影）：逐格畫，同色的橫段合併成一個 fillRect
      for (var j = 0; j < f.h; j++) {
        var run = -1, col = null;
        for (var i = 0; i <= f.w; i++) {
          var c = null;
          if (i < f.w) { var q = (j * f.w + (flip ? f.w - 1 - i : i)) * 4; if (f.data[q + 3]) c = o.sil ? (o.sil === true ? '#0b0f1a' : o.sil) : 'rgb(' + f.data[q] + ',' + f.data[q + 1] + ',' + f.data[q + 2] + ')'; }
          if (c !== col) { if (col) { ctx.fillStyle = col; ctx.fillRect(left + run * k, top + j * k, (i - run) * k, k); } col = c; run = i; }
        }
      }
    }
    ctx.globalAlpha = ga;
    var an = {}; Object.keys(f.anchors).forEach(function (n) { var a = flipA(f.anchors[n], flip, k); an[n] = [x + a[0], y + a[1]]; });
    return { x: left, y: top, w: f.w * k, h: f.h * k, anchors: an };
  }
  // shop.js P.sprite 相容：字母列＋色盤（每張圖自己的色盤，最多 93 色；'.' 是透明）
  var ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&*+-/:;<=>?@^_~|()[]{},`\'"';
  function grid(spec, pose, frame, o) {
    var f = composeCached(spec, pose || 'idle', frame || 0, o), pal = {}, inv = {}, n = 0, rows = [];
    for (var j = 0; j < f.h; j++) { var r = '';
      for (var i = 0; i < f.w; i++) { var q = (j * f.w + i) * 4; if (!f.data[q + 3]) { r += '.'; continue; }
        var hx = rgb2hex(f.data[q], f.data[q + 1], f.data[q + 2]); if (!inv[hx]) { if (n >= ALPHA.length) { r += ALPHA.charAt(ALPHA.length - 1); continue; } inv[hx] = ALPHA.charAt(n++); pal[inv[hx]] = hx; } r += inv[hx]; }
      rows.push(r); }
    return { rows: rows, pal: pal, ax: f.ax, ay: f.ay, anchors: f.anchors };
  }
  // shop.js 手臂姿勢 → 這裡的 [姿勢, 格]
  var ARM = { wind: ['throw', 0], throw: ['throw', 1], show: ['show', 0], up: ['up', 0], shield: ['shield', 0], flag: ['point', 0], shrug: ['shrug', 0], none: ['idle', 0] };

  return {
    version: '4.0',
    render: render, compose: composeCached, toCanvas: toCanvas, toDataURL: toDataURL, grid: grid, anchor: anchor,
    npc: npc, NPC_IDS: Object.keys(NPC), fromDipChar: fromDipChar, random: random, normalize: normalize, DEFAULT: DEFAULT,
    parts: PARTS, SLOTS: SLOTS, swatch: swatch, POSES: POSE_FRAMES, ARM: ARM, ATTR: ATTR,
    SCALE: { adultPx: 30, hatMaxPx: 37, binTablePx: 20, turntableDeckPx: 18, doorPx: 44, recordPx: 9, note: '1 小人像素 = 1 場景像素；人≈唱片箱桌的 1.5 倍高（寶可夢室內比例）' },
    clearCache: function () { CACHE = {}; CACHE_N = 0; },
    _internal: { build: build, Comp: Comp, stamp: stamp, finish: finish, autoRamp: autoRamp, mix: mix, rng: rng, mirror: mirror, backHair: backHair,
      SKINS: SKINS, HAIRC: HAIRC, CLOTH: CLOTH, HAIRS: HAIRS, HATS: HATS, TOPS: TOPS, BOTTOMS: BOTTOMS, SHOES: SHOES, ACCS: ACCS, NPC: NPC, SPR_KEY: SPR_KEY,
      BUILDS: BUILDS, EYES: EYES, BROWS: BROWS, MOUTHS: MOUTHS, GLASSES: GLASSES, FACIALS: FACIALS, CHEEKS: CHEEKS, GLASSCOL: GLASSCOL,
      OLD_HEAD: OLD_HEAD, OLD_COLOR: OLD_COLOR, OLD_HAIR: OLD_HAIR, OLD_SKIN: OLD_SKIN, OLD_PANTS: OLD_PANTS, POSE: POSE, ARMS: ARMS, LEGS: LEGS }
  };
  //@@END_CODE@@
});
