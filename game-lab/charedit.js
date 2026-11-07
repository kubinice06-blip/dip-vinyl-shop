/* charedit.js — DipLabCharEdit：捏角色畫面（v3 高精度人物）。依賴 chars.js（window.DipLabChars）。
 * 店主 2026-11-07：「人物的畫素也可以提升 可自訂的人物造型也可以多增加更豐富」。
 *
 *   var ed = DipLabCharEdit.open(container, { name: '阿明', spec: save.player.look }, {
 *     onSave: function (r) { save.player.name = r.name; save.player.look = r.spec; },   // r = { name, spec }（純 JSON，可直接進 localStorage）
 *     onCancel: function () {},                                                       // 沒給就不顯示右上角的 ✕
 *     onChange: function (r) {},                                                      // 選填：每改一次
 *     tab: 'hair', title: '捏一個你'                                                   // 選填
 *   });
 *   // 按「完成」→ onSave(r)，然後自己關掉（onSave 回傳 false 就不關）；按 ✕ 或 Esc → onCancel()，然後關掉。
 *   ed.get() → { name, spec } ／ ed.set({ name?, spec? }) ／ ed.tab('hairColor') ／ ed.close()
 *
 *   container：給一個有高度的元素（例如整個面板），畫面會塞滿它、自己不捲頁面，只有選項格會在裡面捲。
 *              沒有高度（或直接給 document.body）就自己開一層全螢幕白底。
 *   name：最多 8 個字（中英都算一個字）；空白＝「你」。spec：DipLabChars 的 spec（會先 normalize）；沒給＝預設造型。
 *
 * 版面（手機 390×664／375×548 都不捲頁面）：
 *   上：店裡一角（一點透視、中間唱片箱島、木地板，跟店同一套）＋你站在走道上，×3 放大、會呼吸；點人換動作（站著→丟唱片→歡呼→正面→背面→走路）。
 *       頭上是名牌（黑底白字，跟店裡的「你」一樣），點了就能改名。
 *   中：12 個分頁（膚色、髮型、髮色、臉、眼鏡、鬍子／帽子、上衣、上衣顏色、褲子、鞋子、配件），兩排。
 *   下：選項格（每格是你自己穿上那一款的小圖，只截那個部位）＋顏色方塊；最底「隨機」「恢復」「完成」。
 * 只掛 window.DipLabCharEdit；樣式在 charedit.css（前綴 ce-）。舊的 mount(host, {spec,onDone,onCancel,onChange}) 仍可用。
 */
(function (root, factory) {
  function getCH() {
    if (root && root.DipLabChars) return root.DipLabChars;
    if (typeof require === 'function') { try { return require('./chars.js'); } catch (e) { return null; } }
    return null;
  }
  var api = factory(getCH);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.DipLabCharEdit = api;
})(typeof self !== 'undefined' ? self : (typeof globalThis !== 'undefined' ? globalThis : this), function (getCH) {
  'use strict';

  // ===================================================================== 純邏輯（Node 測得到）
  var NAME_MAX = 8, NAME_DEFAULT = '你';
  function clone(s) { return JSON.parse(JSON.stringify(s || {})); }
  function norm(s) { var CH = getCH(); return CH ? CH.normalize(s) : clone(s); }
  function charsOf(s) { return Array.from ? Array.from(String(s)) : String(s).split(''); }
  // 名字：去掉控制字元、最多 8 個字（中文、英文、emoji 都算一個）
  function clampName(s) { s = String(s == null ? '' : s).replace(/[\u0000-\u001f\u007f\u2028\u2029]/g, ''); return charsOf(s).slice(0, NAME_MAX).join(''); }
  function finalName(s) { var n = clampName(String(s == null ? '' : s).replace(/\s+/g, ' ').trim()).trim(); return n || NAME_DEFAULT; }
  function nameLen(s) { return charsOf(s == null ? '' : s).length; }

  var BAGS = ['recordbag', 'tote'];
  var HAT_BAND = { fedora: 1, bowler: 1, tophat: 1 };
  // 有第二色的上衣（測試會對照 chars.js 實際畫出來的結果，兩邊不一致就會紅）
  var TOP2 = { bandtee: '印花色', stripe: '條紋色', flannel: '格紋色', denim: '內搭色', leather: '內搭色', cardigan: '內搭色', suit: '襯衫色', apron: '內搭色', coat: '內搭色' };
  function hasAcc(s, a) { return (s.acc || []).indexOf(a) >= 0; }

  // 12 個分頁（店主指定的順序）。crop＝縮圖截哪一塊；swatch＝用顏色方塊；when＝什麼時候才出現
  var TABS = [
    { id: 'skin', label: '膚色', fields: [
      { key: 'skin', label: '膚色', list: 'skin', crop: 'head' },
      { key: 'build', label: '體型', list: 'build', crop: 'body' },
      { key: 'height', label: '身高', list: 'height', crop: 'body' }] },
    { id: 'hair', label: '髮型', fields: [{ key: 'hair', label: '髮型', list: 'hair', crop: 'hair' }] },
    { id: 'hairColor', label: '髮色', fields: [{ key: 'hairColor', label: '髮色', list: 'hairColor', crop: 'hair' }] },
    { id: 'face', label: '臉', fields: [
      { key: 'eyes', label: '眼睛', list: 'eyes', crop: 'face' },
      { key: 'brows', label: '眉毛', list: 'brows', crop: 'face' },
      { key: 'mouth', label: '嘴巴', list: 'mouth', crop: 'face' },
      { key: 'cheeks', label: '臉頰', list: 'cheeks', crop: 'face' }] },
    { id: 'glasses', label: '眼鏡', fields: [
      { key: 'glasses', label: '眼鏡', list: 'glasses', crop: 'face' },
      { key: 'glassesColor', label: '鏡框', list: 'glassesColor', crop: 'face', when: function (s) { return s.glasses !== 'none' && s.glasses !== 'monocle'; } }] },
    { id: 'facial', label: '鬍子', fields: [
      { key: 'facial', label: '鬍子', list: 'facial', crop: 'chin' },
      { key: 'facialColor', label: '鬍子顏色', list: 'hairColor', swatch: 'hair', when: function (s) { return s.facial !== 'none'; } }] },
    { id: 'hat', label: '帽子', fields: [
      { key: 'hat', label: '帽子', list: 'hat', crop: 'head' },
      { key: 'hatColor', label: '帽子顏色', list: 'color', swatch: 'cloth', when: function (s) { return s.hat !== 'none'; } },
      { key: 'hatBandColor', label: '帽帶', list: 'color', swatch: 'cloth', when: function (s) { return !!HAT_BAND[s.hat]; } }] },
    { id: 'top', label: '上衣', fields: [{ key: 'top', label: '上衣', list: 'top', crop: 'torso' }] },
    { id: 'topColor', label: '上衣顏色', fields: [
      { key: 'topColor', label: '主色', list: 'color', swatch: 'cloth' },
      { key: 'top2Color', label: function (s) { return TOP2[s.top] || '第二色'; }, list: 'color', swatch: 'cloth', when: function (s) { return !!TOP2[s.top]; } },
      { key: 'tieColor', label: '領帶', list: 'color', swatch: 'cloth', when: function (s) { return s.top === 'suit'; } }] },
    { id: 'bottom', label: '褲子', fields: [
      { key: 'bottom', label: '褲子／裙子', list: 'bottom', crop: 'legs' },
      { key: 'bottomColor', label: '顏色', list: 'color', swatch: 'cloth' }] },
    { id: 'shoes', label: '鞋子', fields: [
      { key: 'shoes', label: '鞋子', list: 'shoes', crop: 'feet' },
      { key: 'shoesColor', label: '顏色', list: 'color', swatch: 'cloth' },
      { key: 'accColor', label: '鞋側線條', list: 'color', swatch: 'cloth', when: function (s) { return s.shoes === 'sneakers'; } }] },
    { id: 'acc', label: '配件', fields: [
      { key: 'acc', label: '配件', note: '可以多選', list: 'acc', crop: 'acc', multi: true },
      { key: 'accColor', label: '配件顏色', list: 'color', swatch: 'cloth', when: function (s) { return (s.acc || []).length > 0; } },
      { key: 'scarfColor', label: '圍巾顏色', list: 'color', swatch: 'cloth', when: function (s) { return hasAcc(s, 'scarf'); } },
      { key: 'bagColor', label: '袋子顏色', list: 'color', swatch: 'cloth', when: function (s) { return hasAcc(s, 'recordbag') || hasAcc(s, 'tote'); } }] }
  ];
  var OLD_TAB = { body: 'skin', hat: 'hat', hair: 'hair', face: 'face', top: 'top', bottom: 'bottom', shoes: 'shoes', acc: 'acc' };
  function tabOf(id) { id = OLD_TAB[id] && !TABS.some(function (t) { return t.id === id; }) ? OLD_TAB[id] : id; for (var i = 0; i < TABS.length; i++) if (TABS[i].id === id) return TABS[i]; return null; }
  function fieldLabel(f, s) { return typeof f.label === 'function' ? f.label(s) : f.label; }
  function visibleFields(spec, tabId) { var T = tabOf(tabId) || TABS[0], s = norm(spec); return T.fields.filter(function (f) { return !f.when || f.when(s); }); }
  function listOf(f) { var CH = getCH(); return (CH && CH.parts[f.list]) || []; }
  function defOf(listName, id) { var CH = getCH(), L = CH && CH._internal && CH._internal[listName]; if (!L) return null; for (var i = 0; i < L.length; i++) if (L[i].id === id) return L[i]; return null; }

  // 改一個欄位。keep＝使用者親手選過的顏色（{ topColor:true, ... }）：選過就不被換款式的預設色蓋掉
  function apply(spec, key, value, keep) {
    var s = clone(norm(spec)); keep = keep || {};
    if (key === 'acc') {
      var a = Array.isArray(s.acc) ? s.acc.slice() : [], i = a.indexOf(value);
      if (i >= 0) a.splice(i, 1);
      else { if (BAGS.indexOf(value) >= 0) a = a.filter(function (x) { return BAGS.indexOf(x) < 0; }); a.push(value); }
      s.acc = a;
    } else {
      // 鬍子顏色預設跟著髮色走（除非另外選過）
      if (key === 'hairColor' && !keep.facialColor && (!s.facialColor || s.facialColor === s.hairColor)) s.facialColor = value;
      s[key] = value;
    }
    // 換款式時帶上那一款的招牌色（牛仔外套＝丹寧、毛帽＝綠、小皇冠＝金）；使用者自己選過顏色就照他的
    var T;
    if (key === 'top' && (T = defOf('TOPS', value))) { if (T.dflt && !keep.topColor) s.topColor = T.dflt; if (T.dflt2 && !keep.top2Color) s.top2Color = T.dflt2; }
    if (key === 'bottom' && (T = defOf('BOTTOMS', value)) && T.dflt && !keep.bottomColor) s.bottomColor = T.dflt;
    if (key === 'hat' && (T = defOf('HATS', value)) && T.dflt && !keep.hatColor) s.hatColor = T.dflt;
    if (key === 'shoes' && (T = defOf('SHOES', value)) && T.dflt && !keep.shoesColor) s.shoesColor = T.dflt;
    return norm(s);
  }
  function shuffle(seed) { var CH = getCH(); return CH ? CH.random(seed == null ? Date.now() : seed) : {}; }
  function labelOf(list, id) { var CH = getCH(), L = (CH && CH.parts[list]) || []; for (var i = 0; i < L.length; i++) if (L[i].id === id) return L[i].label; return ''; }
  // 一句話描述（無障礙）：灰色旁分・方框眼鏡・落腮鬍・綠色圍裙・灰色卡其褲・靴子
  function summary(spec) {
    var s = norm(spec), out = [];
    out.push(s.hair === 'bald' ? '光頭' : labelOf('hairColor', s.hairColor) + '色' + labelOf('hair', s.hair));
    if (s.hat !== 'none') out.push(labelOf('color', s.hatColor) + labelOf('hat', s.hat));
    if (s.glasses !== 'none') out.push(labelOf('glasses', s.glasses) + (s.glasses === 'monocle' || s.glasses === 'sunglasses' ? '' : '眼鏡'));
    if (s.facial !== 'none') out.push(labelOf('facial', s.facial));
    out.push((s.top === 'denim' && s.topColor === 'denim' ? '' : labelOf('color', s.topColor)) + labelOf('top', s.top));
    var bl = labelOf('bottom', s.bottom), bc = labelOf('color', s.bottomColor); out.push((bl.indexOf(bc) === 0 || (s.bottom === 'jeans' && s.bottomColor === 'denim') ? '' : bc) + bl);
    out.push(labelOf('shoes', s.shoes));
    s.acc.forEach(function (a) { out.push(labelOf('acc', a)); });
    return out.join('・');
  }
  // 存檔用：{ name, spec } 一定是純 JSON
  function result(name, spec) { var s = clone(norm(spec)); delete s.name; return { name: finalName(name), spec: s }; }

  var LOGIC = { apply: apply, shuffle: shuffle, summary: summary, labelOf: labelOf, clampName: clampName, finalName: finalName, nameLen: nameLen,
    visibleFields: visibleFields, fieldLabel: fieldLabel, tabOf: tabOf, result: result, TABS: TABS, TOP2: TOP2, HAT_BAND: HAT_BAND, NAME_MAX: NAME_MAX, NAME_DEFAULT: NAME_DEFAULT };

  // ===================================================================== 店裡一角（一點透視，逐格光線投射；跟店同一套木色）
  // 世界單位＝1 小人像素（≈3.6 cm）。相機在走道中間、眼高 42（≈1.5 m），人站在深度 z=1（離相機 ≈3.2 m），所以人 1:1。
  // 左邊是中間那座唱片箱島（從近到遠），右邊是靠牆的唱片箱＋整面唱片櫃，最裡面是窗；天花板有軌道燈和一根樑。
  var SHOP = (function () {
    function hx(h) { h = h.replace('#', ''); var n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
    function hash(a, b, c) { var h = (Math.imul(a | 0, 374761393) + Math.imul(b | 0, 668265263) + Math.imul(c | 0, 1440662683)) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16; return (h >>> 0) / 4294967296; }
    function mixc(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
    function mul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
    var P = {
      wall: hx('#eee5d3'), wallLo: hx('#e2d7c1'), ceil: hx('#f4efe5'), ceilSh: hx('#e4dccd'), beam: hx('#ece5d6'), beamLo: hx('#d9cfbd'),
      rail: hx('#8c847a'), bulb: hx('#fff6d6'), glow: hx('#fbeec4'),
      boards: [hx('#8c5b35'), hx('#7e5130'), hx('#94633b'), hx('#784a2b'), hx('#86572f')], seam: hx('#4e2f1a'), joint: hx('#5c3820'),
      pine: hx('#c99a5e'), pineSide: hx('#b5834b'), pineTop: hx('#ddb47c'), pineDk: hx('#8d6236'), under: hx('#4a2f1c'),
      glass: hx('#d6e8ee'), glassHi: hx('#eef6f7'), mull: hx('#faf7f0'), teal: hx('#2fb0bb'), tealDk: hx('#1f8590'),
      haze: hx('#ece2cf'), grade: hx('#efe7d8'),
      tops: ['#f3f0e8', '#ece6d6', '#e4dccb', '#f6f3ea', '#d8cfbd', '#f1ece1', '#c8c0b0', '#efe9da', '#e9e2d2', '#dcd3c1', '#c9a2a0', '#9fb1c6', '#b9c7a8'].map(hx),
      spines: ['#ece6d6', '#e4dccb', '#d8cfbd', '#c8c0b0', '#f1ece1', '#1d1b1a', '#2f2a26', '#9c3a30', '#2f4f80', '#b89a52', '#4f6f5a', '#e2d6b8', '#8a7f72'].map(hx),
      sleeves: ['#f3f0e8', '#ece6d6', '#f2cf3e', '#efe9da', '#d9473a', '#2f4f80', '#f6f3ea', '#3c7b5c', '#1d1b1a', '#c8c0b0', '#e7c64f', '#7a3b6b', '#e98a3c', '#5ba6c3', '#f1ece1', '#a39d90'].map(hx),
      covers: [['#1d1b1a', '#f2cf3e'], ['#d9473a', '#f6f3ea'], ['#2f4f80', '#e98a3c'], ['#f1ece1', '#1d1b1a'], ['#3c7b5c', '#f2cf3e'], ['#e7c64f', '#7a3b6b'], ['#5ba6c3', '#f6f3ea'], ['#7a3b6b', '#e7c64f'], ['#e98a3c', '#2f4f80'], ['#c8c0b0', '#d9473a']].map(function (p) { return [hx(p[0]), hx(p[1])]; })
    };
    var E = 42, CEIL = 80, XL = -104, XR = 46, ZB = 3.5, ZU = 90;   // ZU：深度 1 ＝ 90 單位
    var BOX = [
      { m: 'isl', x0: -64, x1: -17, y0: 0, y1: 23, z0: 0.875, z1: 2.95 },  // 唱片箱島（桌身，≈83 cm）
      { m: 'isl', x0: -64, x1: -17, y0: 0, y1: 14, z0: 0.84, z1: 0.875 },  // 最近那一端的矮前板（看得到第一張封面）
      { m: 'rec', x0: -62, x1: -19, y0: 14, y1: 27, z0: 0.85, z1: 2.94 },  // 箱裡的唱片（露出來的上緣，≈97 cm）
      { m: 'crate', x0: 27, x1: 46, y0: 0, y1: 13, z0: 0.92, z1: 3.3 },    // 右邊靠牆的低箱
      { m: 'beam', x0: -400, x1: 400, y0: 73, y1: 81, z0: 2.05, z1: 2.2 }, // 天花板的樑
      { m: 'card', x0: -52, x1: -40, y0: 23, y1: 31, z0: 1.18, z1: 1.186 },  // 分類卡（白卡插在箱裡，只比唱片高一點）
      { m: 'card', x0: -38, x1: -26, y0: 23, y1: 31, z0: 1.72, z1: 1.728 },
      { m: 'card', x0: -54, x1: -42, y0: 23, y1: 31, z0: 2.36, z1: 2.37 }
    ];
    function slab(o, d, a0, a1) {   // 回傳 [tNear, tFar]
      if (Math.abs(d) < 1e-9) return (o < a0 || o > a1) ? null : [-Infinity, Infinity];
      var t0 = (a0 - o) / d, t1 = (a1 - o) / d; return t0 < t1 ? [t0, t1] : [t1, t0];
    }
    function hitBox(b, dx, dy) {
      var X = slab(0, dx, b.x0, b.x1), Y = slab(E, dy, b.y0, b.y1), Z = slab(0, 1, b.z0, b.z1);
      if (!X || !Y || !Z) return null;
      var tn = Math.max(X[0], Y[0], Z[0]), tf = Math.min(X[1], Y[1], Z[1]);
      if (tn > tf || tf <= 0) return null;
      var face = tn === X[0] ? (dx > 0 ? 'x0' : 'x1') : tn === Y[0] ? (dy > 0 ? 'y0' : 'y1') : 'z0';
      return { t: tn, face: face };
    }
    function pick(arr, r) { return arr[Math.min(arr.length - 1, Math.floor(r * arr.length))]; }

    function shade(sx, sy, vpX, yh) {
      var dx = sx + 0.5 - vpX, dy = yh - (sy + 0.5);
      var best = ZB, mat = 'back', face = 'z0';
      if (dy < 0) { var tf = E / -dy; if (tf < best) { best = tf; mat = 'floor'; } }
      if (dy > 0) { var tc = (CEIL - E) / dy; if (tc < best) { best = tc; mat = 'ceil'; } }
      if (dx < 0) { var tl = XL / dx; if (tl < best) { best = tl; mat = 'lwall'; } }
      if (dx > 0) { var tr = XR / dx; if (tr < best) { best = tr; mat = 'rwall'; } }
      for (var i = 0; i < BOX.length; i++) { var h = hitBox(BOX[i], dx, dy); if (h && h.t > 0 && h.t < best) { best = h.t; mat = BOX[i].m; face = h.face; } }
      var t = best, X = dx * t, Y = E + dy * t, Zu = t * ZU, c, r;
      switch (mat) {
        case 'floor': {
          var bw = 3.2, bi = Math.floor((X + 960) / bw), tone = P.boards[Math.floor(hash(bi, 7, 1) * P.boards.length)];
          c = tone;
          // 木紋：每片板子上淡淡的長條
          r = hash(bi, Math.floor((Zu + hash(bi, 3, 3) * 40) / 9), 2); if (r < 0.18) c = mul(c, 0.94); else if (r > 0.9) c = mul(c, 1.05);
          // 板縫（順著走道往裡收）：板子夠寬才畫，不然遠處會變成一片條紋雜訊
          var X0 = (sx - vpX) * t, X1 = (sx + 1 - vpX) * t;
          if (bw / t >= 1.7 && Math.floor((X0 + 960) / bw) !== Math.floor((X1 + 960) / bw)) c = mul(tone, 0.74);
          // 接縫（橫的）：用這一列涵蓋的深度判斷
          var tTop = E / Math.max(0.5, sy - yh), tBot = E / (sy + 1 - yh), L = 70 + hash(bi, 5, 5) * 70, off = hash(bi, 9, 9) * L;
          if ((tTop - tBot) * ZU < L * 0.3 && Math.floor((tTop * ZU + off) / L) !== Math.floor((tBot * ZU + off) / L)) c = mul(tone, 0.8);
          // 光：往窗那邊越亮（反光），島與低箱的底下有陰影
          c = mul(c, 0.94 + Math.min(0.16, Math.max(0, (t - 1.1) * 0.09)));
          if (X < -14 && X > -66 && t > 0.78 && t < 3.0) c = mul(c, X > -17.5 ? 0.62 : 0.8);
          if (X > 24 && t > 0.9 && t < 3.35) c = mul(c, X < 27.5 ? 0.66 : 0.82);
          if (X > XR - 3) c = mul(c, 0.8);
          break; }
        case 'ceil': {
          c = P.ceil;
          if (X < XL + 10 || X > XR - 6) c = P.ceilSh;
          // 兩條軌道燈（順著走道），每 1 m 一顆燈
          var rails = [-28, 14], cX0 = (sx - vpX) * t, cX1 = (sx + 1 - vpX) * t;
          var cT0 = (CEIL - E) / Math.max(0.5, yh - sy), cT1 = (CEIL - E) / Math.max(0.5, yh - sy - 1);
          for (var ri = 0; ri < rails.length; ri++) {
            var rx = rails[ri], onRail = rx >= Math.min(cX0, cX1) && rx < Math.max(cX0, cX1);
            var bulbRow = Math.floor((cT0 * ZU + 15) / 30) !== Math.floor((cT1 * ZU + 15) / 30);
            if (onRail) c = bulbRow ? P.bulb : P.rail;
            else if (bulbRow && Math.abs(X - rx) < Math.max(1.5, t * 1.6)) c = P.glow;
          }
          break; }
        case 'beam': c = face === 'y0' ? P.beamLo : P.beam; break;
        case 'lwall': case 'rwall': {
          var right = mat === 'rwall';
          c = Y < 14 ? P.wallLo : P.wall;
          if (right) {
            // 整面唱片櫃：直柱每 0.9 m、層板每 0.43 m，中間塞滿書背
            var zp = ((Zu % 26) + 26) % 26, yb = Y - 13;
            if (Y >= 13 && Y <= 74) {
              if (zp < Math.max(1, t * 0.9)) c = P.pineDk;
              else if ((yb % 12) < 1.2) c = P.pineTop;
              else if ((yb % 12) < 10.2) { var sp = Math.floor(Zu / 0.9); c = pick(P.spines, hash(sp, Math.floor(yb / 12), 4)); if ((yb % 12) > 9.4 - hash(sp, 2, 5) * 2) c = P.under; }
              else c = P.under;
            }
          } else {
            // 左牆：兩層正面展示的唱片架（≈1.55 m、2.1 m）＋青綠色的門
            var zd = Zu;
            if (zd > 118 && zd < 150 && Y < 60) { c = (zd < 120.5 || zd > 147.5 || Y > 57.5) ? P.tealDk : P.teal; if (zd > 141 && zd < 143.5 && Y > 26 && Y < 30) c = P.mull; }
            else {
              var ledges = [44, 59];
              for (var li = 0; li < ledges.length; li++) {
                var ly = ledges[li];
                if (Y >= ly - 1.2 && Y < ly) c = P.pineDk;
                else if (Y >= ly && Y < ly + 8.6) {
                  var ci = Math.floor((zd - 4) / 9.6), within = ((zd - 4) % 9.6 + 9.6) % 9.6;
                  if (within < 8.6 && hash(ci, li, 11) > 0.12) {
                    var cv2 = P.covers[Math.floor(hash(ci, li, 12) * P.covers.length)], u = within / 8.6, v = (Y - ly) / 8.6;
                    c = (hash(ci, li, 13) > 0.5 ? (v > 0.35 && v < 0.65) : (Math.abs(u - 0.5) < 0.22 && Math.abs(v - 0.5) < 0.22)) ? cv2[1] : cv2[0];
                  }
                }
              }
            }
          }
          c = mul(c, right ? 0.93 : 0.9);
          break; }
        case 'back': {
          c = P.wall;
          if (X > -46 && X < 32 && Y > 22 && Y < 68) {
            c = Y > 50 ? P.glassHi : P.glass;
            if (((X + 46) % 13) < 1.3 || Math.abs(Y - 45) < 1.2 || Y < 23.5 || Y > 66.5) c = P.mull;
            if (X > -12 && X < -2 && Y > 30 && Y < 44) c = Y > 40 ? hx('#f2cf3e') : hx('#1d1b1a');   // 窗上貼的海報
            if (X > 12 && X < 20 && Y > 32 && Y < 42) c = hx('#d9473a');
          }
          if (Y < 6) c = P.wallLo;
          break; }
        case 'isl': {
          if (face === 'y1') c = P.pineTop;
          else if (face === 'z0') {
            // 最靠近的那一端：外框＋裡面放唱片的空格
            c = P.pine;
            if (Y < 4) c = P.under; else if (X > -20 || X < -61 || Y > 12.5) c = P.pineTop; else if (Y < 11 && Y > 5) c = mul(P.pine, 0.9);
          } else {
            // 面對走道的側板：上緣木條、每格箱子的隔板、底下堆紙箱的暗處
            c = P.pineSide;
            var zb = ((Zu - 72) % 34 + 34) % 34;
            if (Y > 22) c = P.pineTop;
            else if (zb < Math.max(1, t * 0.8)) c = P.pineDk;
            else if (Y < 9) { c = P.under; if (Y < 7 && hash(Math.floor(Zu / 12), 1, 21) > 0.45 && ((Zu % 12) + 12) % 12 > 1) c = hx('#a77c4c'); }
          }
          break; }
        case 'rec': {
          if (face === 'y1') {
            // 從上面看到的一排排唱片上緣：大多白、米、黃標，夾幾張彩色
            var row = Math.floor(Zu / 1.7), fr = (Zu / 1.7) - row, col = Math.floor((X + 200) / 10.5), zb2 = ((Zu - 72) % 34 + 34) % 34;
            if (fr < 0.45) { c = pick(P.tops, hash(row, col, 31)); if (hash(row, col, 32) > 0.86) c = hx('#f2cf3e'); }
            else { var cp = P.covers[Math.floor(hash(row, col, 37) * P.covers.length)]; c = mixc(cp[hash(row, col, 38) > 0.7 ? 1 : 0], P.tops[0], 0.35); }
            if (zb2 < Math.max(1.2, t * 1.2) || X < -60.5 || X > -20.5) c = P.pineTop;
          } else if (face === 'z0') {
            // 最前面那排：封面朝外（每張 31 cm），上面露出後面幾張的上緣
            var ux = (X + 62) / 8.8, ci2 = Math.floor(ux), uu = ux - ci2, vv = (Y - 14) / 8.6;
            if (vv > 1) c = pick(P.tops, hash(ci2, Math.floor((Y - 14) * 1.5), 34));
            else if (uu > 0.95) c = P.under;
            else {
              var pr = P.covers[Math.floor(hash(ci2, 7, 35) * P.covers.length)], dz = hash(ci2, 8, 36);
              c = pr[0];
              if (dz < 0.33 ? (Math.abs(uu - 0.5) < 0.24 && Math.abs(vv - 0.55) < 0.24) : dz < 0.66 ? (vv > 0.62 && vv < 0.8) : (uu < 0.34)) c = pr[1];
              if (vv > 0.86 && uu < 0.3) c = hx('#f2cf3e');   // 黃色價錢貼紙
            }
          } else {
            c = pick(P.sleeves, hash(Math.floor(Zu / 1.3), 0, 33)); c = mul(c, 0.9);
          }
          break; }
        case 'card': c = (face === 'z0') ? ((Y > 28.4 && Y < 30.2 && X > -50.5 && X < -27.5 && Math.abs(X + 39) > 1.5) ? hx('#3a3430') : P.mull) : P.wallLo; break;
        case 'crate': {
          if (face === 'y1') { c = pick(P.sleeves, hash(Math.floor(Zu / 1.6), Math.floor(X / 6), 41)); c = mul(c, 0.95); }
          else {
            c = P.pine;
            var zc = ((Zu - 83) % 17 + 17) % 17;
            if (zc < Math.max(1, t * 0.8) || Y > 11.5) c = P.pineDk; else if (Math.abs(Y - 6) < 0.6) c = P.pineSide;
            if (face === 'z0') c = mul(c, 1.04);
          }
          break; }
      }
      // 遠處一點點霧（暖白），近的不動
      var hz = Math.max(0, Math.min(0.22, (t - 1.25) * 0.08));
      c = mixc(c, P.haze, hz);
      // 背景整體提亮、降一點飽和，讓人跳出來（人物本身不動）
      var lum = c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11;
      c = mixc(c, [lum, lum, lum], 0.14);
      return mixc(c, P.grade, 0.16);
    }
    function build(W, H, vpX, footY) {
      if (typeof document === 'undefined') return null;
      var cv = document.createElement('canvas'); cv.width = W; cv.height = H;
      var cx = cv.getContext('2d'), im = cx.createImageData(W, H), d = im.data, yh = footY - E;
      for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
        var c = shade(x, y, vpX, yh), q = (y * W + x) * 4;
        d[q] = c[0]; d[q + 1] = c[1]; d[q + 2] = c[2]; d[q + 3] = 255;
      }
      cx.putImageData(im, 0, 0);
      return cv;
    }
    return { build: build, shade: shade, E: E };
  })();

  // ===================================================================== 介面
  var SEQ = {
    idle: { label: '站著', steps: [['idle', 0, 560], ['idle', 1, 560]] },
    throw: { label: '丟唱片', steps: [['idle', 0, 380], ['throw', 0, 520], ['throw', 1, 130, 1], ['throw', 2, 460], ['idle', 0, 520]] },
    cheer: { label: '歡呼', steps: [['cheer', 0, 250], ['cheer', 1, 250]] },
    front: { label: '正面', steps: [['idleFront', 0, 560], ['idleFront', 1, 560]] },
    back: { label: '背面', steps: [['idleBack', 0, 560], ['idleBack', 1, 560]] },
    walk: { label: '走路', steps: [['walk', 0, 130], ['walk', 1, 130], ['walk', 2, 130], ['walk', 3, 130]] }
  };
  var POSE_ORDER = ['idle', 'throw', 'cheer', 'front', 'back', 'walk'];
  // 縮圖截哪一塊（小人座標，腳底＝0,0、朝右；an＝那個造型站姿的錨點）。每個欄位的格子一樣大，才比得出差別
  function cropOf(kind, an) {
    var f = an.face, c = an.chest, hp = an.hip;
    switch (kind) {
      case 'face': return { x0: f[0] - 13, y0: f[1] - 9, w: 20, h: 16, k: 3 };
      case 'chin': return { x0: f[0] - 13, y0: f[1] - 5, w: 20, h: 16, k: 3 };
      case 'torso': return { x0: -15, y0: c[1] - 10, w: 31, h: 25, k: 2 };
      case 'legs': return { x0: -12, y0: hp[1] - 2, w: 26, h: 25, k: 2 };
      case 'feet': return { x0: -11, y0: -9, w: 25, h: 10, k: 3 };
      case 'acc': return { x0: -16, y0: f[1] - 10, w: 34, h: 44, k: 2 };
      case 'body': return { x0: -16, y0: -63, w: 33, h: 64, k: 2 };
      case 'hair': return { x0: -13, y0: f[1] - 17, w: 28, h: 33, k: 2 };
      default: return { x0: -12, y0: f[1] - 17, w: 26, h: 27, k: 2 };   // head
    }
  }
  var ICON = {
    dice: '<svg viewBox="0 0 16 16" aria-hidden="true" shape-rendering="crispEdges"><path d="M2 2h12v12H2z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4.5 4.5h2.2v2.2H4.5zM9.3 4.5h2.2v2.2H9.3zM6.9 6.9h2.2v2.2H6.9zM4.5 9.3h2.2v2.2H4.5zM9.3 9.3h2.2v2.2H9.3z" fill="currentColor"/></svg>',
    undo: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.6 6.2A5.2 5.2 0 1 1 3 9.6" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M2.2 2.4v4.4h4.4" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
    x: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" stroke-width="1.8"/></svg>',
    pen: '<svg viewBox="0 0 12 12" aria-hidden="true" shape-rendering="crispEdges"><path d="M8 1h2v1h1v2h-1v1H9v1H8v1H7v1H6v1H5v1H4v1H1V8h1V7h1V6h1V5h1V4h1V3h1V2h1z" fill="currentColor"/></svg>'
  };
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function btn(cls, html, label) { var b = el('button', cls); b.type = 'button'; if (html) b.innerHTML = html; if (label) b.setAttribute('aria-label', label); return b; }
  var REDUCED = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raf = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : function (f) { return setTimeout(function () { f(Date.now()); }, 33); };
  var caf = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : clearTimeout;

  function open(container, init, cb) {
    var CH = getCH();
    if (!CH) throw new Error('DipLabCharEdit 需要先載入 chars.js');
    init = init || {}; cb = cb || {};
    var spec0 = norm(init.spec || CH.fromDipChar(null)), spec = clone(spec0), name0 = clampName(init.name || ''), keep = {};
    var tab = (tabOf(cb.tab || init.tab || 'skin') || TABS[0]).id, poseI = 0, poseT0 = 0, lastKey = '', rec = null, alive = true, rafId = 0;
    var scene = null, bgCache = {}, veil = null;

    // 容器沒有高度（或是 body）→ 自己開一層全螢幕
    var host = container;
    if (!host || host === document.body || host === document.documentElement || host.clientHeight < 240) {
      veil = el('div', 'ce-veil'); (document.body || document.documentElement).appendChild(veil); host = veil;
    }
    var wrap = el('div', 'ce'); wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-modal', 'true'); wrap.setAttribute('aria-label', cb.title || init.title || '捏一個你');

    // ---- 舞台：店裡一角＋人＋名牌
    var stage = el('div', 'ce-stage');
    var cv = el('canvas', 'ce-cv'); cv.setAttribute('role', 'button'); cv.tabIndex = 0; cv.setAttribute('aria-label', '點一下換動作'); stage.appendChild(cv);
    var ttl = el('div', 'ce-ttl', cb.title || init.title || '捏一個你'); stage.appendChild(ttl);
    var tag = el('label', 'ce-tag'); tag.setAttribute('data-v', name0 || NAME_DEFAULT);
    var inp = el('input', 'ce-name'); inp.type = 'text'; inp.size = 1; inp.value = name0; inp.placeholder = NAME_DEFAULT; inp.autocomplete = 'off'; inp.spellcheck = false;
    inp.setAttribute('enterkeyhint', 'done'); inp.setAttribute('aria-label', '名字（最多 ' + NAME_MAX + ' 個字）'); inp.setAttribute('autocapitalize', 'off');
    var pen = el('span', 'ce-pen'); pen.innerHTML = ICON.pen;
    var cnt = el('span', 'ce-cnt');
    tag.appendChild(inp); tag.appendChild(pen); tag.appendChild(cnt); stage.appendChild(tag);
    var poseBtn = btn('ce-pose', '', '換個動作'); stage.appendChild(poseBtn);
    var xBtn = null;
    if (cb.onCancel) { xBtn = btn('ce-x', '<i>' + ICON.x + '</i>', '取消，不改了'); stage.appendChild(xBtn); }
    wrap.appendChild(stage);

    // ---- 分頁（兩排）
    var tabs = el('div', 'ce-tabs'); tabs.setAttribute('role', 'tablist'); tabs.setAttribute('aria-label', '要改哪裡');
    var tabBtns = {};
    TABS.forEach(function (t) {
      var b = btn('ce-tab', '', null); b.textContent = t.label; b.setAttribute('role', 'tab'); b.setAttribute('data-tab', t.id);
      b.addEventListener('click', function () { setTab(t.id, true); });
      tabs.appendChild(b); tabBtns[t.id] = b;
    });
    wrap.appendChild(tabs);
    var body = el('div', 'ce-body'); body.setAttribute('role', 'tabpanel'); wrap.appendChild(body);

    // ---- 底部
    var foot = el('div', 'ce-foot');
    var bRand = btn('ce-btn', ICON.dice + '<span>隨機</span>', '隨機換一個造型');
    var bReset = btn('ce-btn', ICON.undo + '<span>恢復</span>', '恢復成剛打開的樣子');
    var bOk = btn('ce-btn ce-pri', '<span>完成</span><i class="ce-gd"></i>', '完成');
    foot.appendChild(bRand); foot.appendChild(bReset); foot.appendChild(bOk);
    wrap.appendChild(foot);
    host.appendChild(wrap);

    // ---------------- 名字
    var composing = false;
    function syncName(final) {
      var v = inp.value;
      if (!composing || final) { var c2 = clampName(v); if (c2 !== v) { inp.value = c2; v = c2; } }
      tag.setAttribute('data-v', v || NAME_DEFAULT);
      cnt.textContent = Math.min(nameLen(v), NAME_MAX) + '/' + NAME_MAX;
      tag.classList.toggle('ce-full', nameLen(v) >= NAME_MAX);
      placeTag();
    }
    inp.addEventListener('compositionstart', function () { composing = true; });
    inp.addEventListener('compositionend', function () { composing = false; syncName(true); emit(); });
    inp.addEventListener('input', function (e) { if (e && e.isComposing) { tag.setAttribute('data-v', inp.value || NAME_DEFAULT); placeTag(); return; } syncName(); emit(); });
    inp.addEventListener('focus', function () { tag.classList.add('ce-focus'); });
    inp.addEventListener('blur', function () { tag.classList.remove('ce-focus'); composing = false; syncName(true); });
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); inp.blur(); } });
    tag.addEventListener('click', function (e) { e.stopPropagation(); });

    // ---------------- 舞台：版面、背景、動畫
    function layout() {
      if (!alive) return;
      var Ht = wrap.clientHeight, Wt = wrap.clientWidth; if (!Ht || !Wt) return;
      var fh = foot.offsetHeight || 66;
      var one = Ht < 540;                       // 太矮（橫放、超小螢幕）才把分頁收成一排可滑
      wrap.classList.toggle('ce-1row', one);
      var th = tabs.offsetHeight || (one ? 45 : 89);
      var avail = Ht - fh - th - (Ht < 600 ? 168 : 188);   // 留給選項格至少這麼高
      var k = avail >= 3 * 70 ? 3 : 2;
      var Hs = Math.max(54, Math.min(86, Math.floor(avail / k)));
      var Ws = Math.ceil(Wt / k) + (Math.ceil(Wt / k) % 2);
      stage.style.height = (Hs * k) + 'px';
      var left = Math.floor((Wt - Ws * k) / 2);
      cv.width = Ws; cv.height = Hs; cv.style.width = (Ws * k) + 'px'; cv.style.height = (Hs * k) + 'px'; cv.style.left = left + 'px';
      var footY = Hs - 5, vpX = Math.round(Ws * 0.55), key = [Ws, Hs, vpX, footY].join(',');
      if (!bgCache[key]) bgCache[key] = SHOP.build(Ws, Hs, vpX, footY);
      scene = { W: Ws, H: Hs, k: k, left: left, footY: footY, cx: vpX + 1, bg: bgCache[key], Wt: Wt };
      wrap.style.setProperty('--ce-k', k);
      placeTag(); lastKey = ''; draw(performance.now ? performance.now() : Date.now());
    }
    function placeTag() {
      if (!scene) return;
      var k = scene.k, a = CH.anchor(spec, 'idle', 0, 'head') || [0, -48];
      var hx = scene.left + (scene.cx + a[0]) * k, hy = (scene.footY + a[1]) * k;
      var tw = tag.offsetWidth || 60, th = tag.offsetHeight || 32, gap = 9;
      var top = hy - th - gap, side = top < 6;
      var lx;
      if (!side) { lx = Math.round(Math.max(8, Math.min(scene.Wt - tw - 8, hx - tw / 2))); tag.style.top = Math.round(top) + 'px'; tag.style.setProperty('--px', Math.round(hx - lx) + 'px'); }
      else { lx = Math.round(Math.max(8, scene.left + (scene.cx - 12) * k - tw)); tag.style.top = Math.round(Math.max(ttl.offsetTop + ttl.offsetHeight + 8, hy + 4)) + 'px'; }
      tag.style.left = lx + 'px';
      tag.classList.toggle('ce-side', side);
    }
    function seqNow(now) {
      var S = SEQ[POSE_ORDER[poseI]], steps = S.steps, tot = 0, i;
      if (REDUCED) return { step: steps[poseI === 1 ? 2 : 0], idx: poseI === 1 ? 2 : 0 };
      for (i = 0; i < steps.length; i++) tot += steps[i][2];
      var e = (now - poseT0) % tot;
      for (i = 0; i < steps.length; i++) { if (e < steps[i][2]) return { step: steps[i], idx: i, cycle: Math.floor((now - poseT0) / tot) }; e -= steps[i][2]; }
      return { step: steps[0], idx: 0, cycle: 0 };
    }
    function disc(c, x, y, spin) {
      // 7×7 小黑膠，中間金色圓標，反光隨轉動換位置
      x = Math.round(x) - 3; y = Math.round(y) - 3;
      c.fillStyle = '#16120f'; c.fillRect(x + 2, y, 3, 7); c.fillRect(x, y + 2, 7, 3); c.fillRect(x + 1, y + 1, 5, 5);
      c.fillStyle = '#3a3330'; if (spin % 2) { c.fillRect(x + 1, y + 2, 1, 1); c.fillRect(x + 5, y + 4, 1, 1); } else { c.fillRect(x + 2, y + 1, 1, 1); c.fillRect(x + 4, y + 5, 1, 1); }
      c.fillStyle = '#d9a520'; c.fillRect(x + 3, y + 2, 1, 3); c.fillRect(x + 2, y + 3, 3, 1);
      c.fillStyle = '#16120f'; c.fillRect(x + 3, y + 3, 1, 1);
    }
    function draw(now) {
      if (!alive || !scene) return;
      var s = seqNow(now), st = s.step, pose = st[0], fr = st[1];
      // 出手那格：唱片從手上飛出去（每一輪丟一次）
      if (st[3] && (!rec || rec.cycle !== s.cycle)) {
        var a = CH.anchor(spec, 'throw', 1, 'handN') || [12, -32];
        rec = { x0: scene.cx + a[0], y0: scene.footY + a[1], t0: now, cycle: s.cycle };
      }
      var recXY = null;
      if (rec) {
        var dt = now - rec.t0, rx = rec.x0 + dt * 0.15, ry = rec.y0 - dt * 0.012 + dt * dt * 0.000035;
        if (rx > scene.W + 6 || dt > 1500) rec.done = true; else recXY = [rx, ry, Math.floor(dt / 70)];
      }
      var key = pose + fr + (recXY ? recXY.join(',') : '');
      if (key === lastKey) return; lastKey = key;
      var c = cv.getContext('2d'); c.imageSmoothingEnabled = false;
      if (scene.bg) c.drawImage(scene.bg, 0, 0); else { c.fillStyle = '#eee5d3'; c.fillRect(0, 0, scene.W, scene.H); }
      CH.render(c, spec, pose, fr, scene.cx, scene.footY, { shadow: true });
      if (recXY) disc(c, recXY[0], recXY[1], recXY[2]);
      poseBtn.innerHTML = '<span class="ce-k">動作</span><span>' + SEQ[POSE_ORDER[poseI]].label + '</span><span class="ce-nx" aria-hidden="true">▸</span>';
    }
    function loop(now) { if (!alive) return; draw(now); rafId = raf(loop); }
    function nextPose() { poseI = (poseI + 1) % POSE_ORDER.length; poseT0 = performance.now ? performance.now() : Date.now(); rec = null; lastKey = ''; draw(poseT0); }
    cv.addEventListener('click', nextPose);
    cv.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nextPose(); } });
    poseBtn.addEventListener('click', function (e) { e.stopPropagation(); nextPose(); });

    // ---------------- 選項格
    // 配件很小（耳環、手錶）：比對「戴／沒戴」差在哪幾格，縮圖就對準那裡（×3）。
    // 被頭髮、袖子蓋住看不到的（長髮的耳環、長袖的手錶），改用同膚色、平頭、短 T 的人示範那一件。
    function accDiff(trial, id) {
      var A = CH.compose(trial, 'idle', 0), bare = clone(trial); bare.acc = (bare.acc || []).filter(function (a) { return a !== id; });
      var B = CH.compose(bare, 'idle', 0), x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      for (var y = 0; y < A.h; y++) for (var x = 0; x < A.w; x++) {
        var fx = x - A.ax, fy = y - A.ay, bx = fx + B.ax, by = fy + B.ay, q = (y * A.w + x) * 4, same;
        if (bx < 0 || by < 0 || bx >= B.w || by >= B.h) same = !A.data[q + 3];
        else { var r = (by * B.w + bx) * 4; same = A.data[q] === B.data[r] && A.data[q + 1] === B.data[r + 1] && A.data[q + 2] === B.data[r + 2] && A.data[q + 3] === B.data[r + 3]; }
        if (!same) { if (fx < x0) x0 = fx; if (fx > x1) x1 = fx; if (fy < y0) y0 = fy; if (fy > y1) y1 = fy; }
      }
      return x1 < x0 ? null : [Math.round((x0 + x1) / 2), Math.round((y0 + y1) / 2)];
    }
    function accThumb(trial, id) {
      var c = accDiff(trial, id), shown = trial;
      if (!c) { shown = norm({ skin: trial.skin, build: trial.build, height: trial.height, hair: 'buzz', hairColor: trial.hairColor, top: 'tee', topColor: trial.topColor, bottom: trial.bottom, bottomColor: trial.bottomColor, acc: [id], accColor: trial.accColor, scarfColor: trial.scarfColor, bagColor: trial.bagColor }); c = accDiff(shown, id) || [0, -30]; }
      var w = 22, h = 22;
      return { spec: shown, cr: { x0: c[0] - 11, y0: Math.min(c[1] - 11, 1 - h), w: w, h: h, k: 3 } };
    }
    function thumbCanvas(f, trial, id) {
      var cr;
      if (f.crop === 'acc') { var at = accThumb(trial, id); trial = at.spec; cr = at.cr; }
      else cr = cropOf(f.crop, CH.compose(trial, 'idle', 0).anchors);
      var t = el('canvas', 'ce-thumb'); t.width = cr.w; t.height = cr.h; t.style.width = (cr.w * cr.k) + 'px'; t.style.height = (cr.h * cr.k) + 'px';
      var tc = t.getContext('2d'); tc.imageSmoothingEnabled = false;
      CH.render(tc, trial, 'idle', 0, -cr.x0, -cr.y0, {});
      return { cv: t, w: cr.w * cr.k };
    }
    function isOn(f, id) { return f.multi ? spec.acc.indexOf(id) >= 0 : spec[f.key] === id; }
    function pickOpt(f, id) {
      if (f.swatch || f.key === 'glassesColor') keep[f.key] = true;
      spec = f.multi ? apply(spec, 'acc', id, keep) : apply(spec, f.key, id, keep);
      changed();
    }
    function renderBody(keepScroll) {
      var st = keepScroll ? body.scrollTop : 0;
      body.textContent = '';
      visibleFields(spec, tab).forEach(function (f) {
        var L = listOf(f), sec = el('section', 'ce-sec'), h = el('div', 'ce-h');
        var lab = fieldLabel(f, spec); h.appendChild(el('b', null, lab));
        var cur = f.multi ? (spec.acc.length ? spec.acc.map(function (a) { return labelOf('acc', a); }).join('、') : '沒有') : labelOf(f.list, spec[f.key]);
        h.appendChild(el('span', 'ce-v', cur || '預設'));
        h.appendChild(el('span', 'ce-n', f.note || (L.length + (f.swatch ? ' 色' : ' 款'))));
        sec.appendChild(h);
        var grid = el('div', 'ce-grid' + (f.swatch ? ' ce-sw' : '')); grid.setAttribute('role', 'group'); grid.setAttribute('aria-label', lab);
        var colW = 0;
        L.forEach(function (it) {
          var on = isOn(f, it.id), b = btn('ce-opt' + (f.swatch ? ' ce-sw' : '') + (on ? ' ce-on' : ''), '', lab + '：' + it.label);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
          if (f.swatch) {
            var chip = el('span', 'ce-chip'); chip.style.background = CH.swatch(f.swatch === 'hair' ? 'hair' : 'cloth', it.id); b.appendChild(chip); b.title = it.label;
          } else {
            var trial = f.multi ? (on ? spec : apply(spec, 'acc', it.id, keep)) : apply(spec, f.key, it.id, keep);
            var th = thumbCanvas(f, trial, it.id); colW = Math.max(colW, th.w);
            var box = el('span', 'ce-pic'); box.appendChild(th.cv); b.appendChild(box);
            b.appendChild(el('span', 'ce-lab', it.label));
          }
          b.addEventListener('click', function () { pickOpt(f, it.id); });
          grid.appendChild(b);
        });
        if (colW) grid.style.gridTemplateColumns = 'repeat(auto-fill,minmax(' + (colW + 8) + 'px,1fr))';
        sec.appendChild(grid); body.appendChild(sec);
      });
      body.scrollTop = st;
      Object.keys(tabBtns).forEach(function (k) { var on = k === tab; tabBtns[k].classList.toggle('ce-on', on); tabBtns[k].setAttribute('aria-selected', on ? 'true' : 'false'); tabBtns[k].tabIndex = on ? 0 : -1; });
    }
    function setTab(t, user) {
      var T = tabOf(t); if (!T) return; tab = T.id; renderBody(false);
      var b = tabBtns[tab]; if (b && wrap.classList.contains('ce-1row') && b.scrollIntoView) try { b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: user ? 'smooth' : 'auto' }); } catch (_) {}
    }
    tabs.addEventListener('keydown', function (e) {
      var i = TABS.map(function (t) { return t.id; }).indexOf(tab), d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return; e.preventDefault(); setTab(TABS[(i + d + TABS.length) % TABS.length].id, true); tabBtns[tab].focus();
    });

    // ---------------- 狀態
    function emit() { if (cb.onChange) try { cb.onChange(result(inp.value, spec)); } catch (_) {} }
    function changed() {
      bReset.disabled = JSON.stringify(spec) === JSON.stringify(spec0);
      renderBody(true); placeTag(); lastKey = ''; draw(performance.now ? performance.now() : Date.now());
      wrap.setAttribute('aria-description', summary(spec));
      emit();
    }
    var rolls = 0;
    bRand.addEventListener('click', function () { keep = {}; spec = shuffle(Date.now() + ':' + (rolls++) + ':' + Math.random()); changed(); });
    bReset.addEventListener('click', function () { keep = {}; spec = clone(spec0); changed(); });
    bOk.addEventListener('click', function () { var r = result(inp.value, spec), keepOpen = false; if (cb.onSave) keepOpen = cb.onSave(r) === false; if (!keepOpen) close(); });
    if (xBtn) xBtn.addEventListener('click', function (e) { e.stopPropagation(); cancel(); });
    function cancel() { var keepOpen = false; if (cb.onCancel) keepOpen = cb.onCancel() === false; if (!keepOpen) close(); }
    wrap.addEventListener('keydown', function (e) { if (e.key === 'Escape' && cb.onCancel && !composing) { e.preventDefault(); cancel(); } });

    var ro = null;
    if (typeof ResizeObserver === 'function') { ro = new ResizeObserver(function () { layout(); }); ro.observe(wrap); }
    else if (typeof addEventListener === 'function') addEventListener('resize', layout);
    function close() {
      if (!alive) return; alive = false; caf(rafId);
      if (ro) ro.disconnect(); else if (typeof removeEventListener === 'function') removeEventListener('resize', layout);
      if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
      if (veil && veil.parentNode) veil.parentNode.removeChild(veil);
    }

    syncName(true);
    renderBody(false);
    bReset.disabled = true;
    wrap.setAttribute('aria-description', summary(spec));
    poseT0 = performance.now ? performance.now() : Date.now();
    layout();
    rafId = raf(loop);

    return {
      el: wrap,
      get: function () { return result(inp.value, spec); },
      set: function (o) {
        o = o || {};
        if (o.spec) { spec = norm(o.spec); keep = {}; }
        if (o.name != null) { inp.value = clampName(o.name); syncName(true); }
        changed();
      },
      tab: function (t) { setTab(t, false); },
      pose: function (p) { var i = POSE_ORDER.indexOf(p); if (i >= 0) { poseI = (i - 1 + POSE_ORDER.length) % POSE_ORDER.length; nextPose(); } },
      relayout: layout,
      close: close, destroy: close
    };
  }

  // 舊介面（v3 第一版）：mount(host, { spec, title, tab, onChange(spec), onDone(spec), onCancel() }) → { el, get()→spec, set(spec), tab(), destroy() }
  function mount(host, o) {
    o = o || {};
    var h = open(host, { spec: o.spec, name: o.name }, {
      title: o.title, tab: o.tab,
      onChange: o.onChange ? function (r) { o.onChange(r.spec); } : null,
      onSave: function (r) { if (o.onDone) o.onDone(r.spec); return false; },
      onCancel: o.onCancel ? function () { o.onCancel(); return false; } : null
    });
    return { el: h.el, get: function () { return h.get().spec; }, set: function (s) { h.set({ spec: s }); }, tab: h.tab, destroy: h.close };
  }

  return { open: open, mount: mount, TABS: TABS, _logic: LOGIC, _shop: SHOP, version: '3.1' };
});
