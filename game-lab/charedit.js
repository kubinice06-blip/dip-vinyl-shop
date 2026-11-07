/* charedit.js — DipLabCharEdit：捏角色（原版 16×16 Q 版小人，零件見 chars.js）。依賴 chars.js（window.DipLabChars）。
 * 店主 2026-11-07：「人物維持原本的可愛q版風格 類似寶可夢黃版的人 但細節更多」「可自訂的人物造型也可以多增加更豐富」
 *
 *   var ed = DipLabCharEdit.open(container, { name: '你', spec: save.player.avatar }, {
 *     onSave: function (r) { save.player.name = r.name; save.player.avatar = r.spec; },  // r = { name, spec }（純 JSON；spec 是 DipLabChars 的 v2 spec）
 *     onCancel: function () {},     // 沒給就不顯示 ✕
 *     onChange: function (r) {},    // 選填：每改一次
 *     tab: 'hair', title: '捏一個你' // 選填
 *   });
 *   按「完成」→ onSave(r) 後自己關掉（onSave 回傳 false 就不關）；✕ 或 Esc → onCancel() 後關掉。
 *   ed.get() → { name, spec } ／ ed.set({ name?, spec? }) ／ ed.tab('top') ／ ed.close() ／ ed.el
 *   spec 也可以給舊的 dip-character 捏角色 {head,hair,shirt,pants,skin}（會換成一模一樣的 v2 spec）。
 *
 *   container：給一個有高度的元素（例如整個面板），畫面塞滿它、頁面不捲；只有選項格在裡面捲。
 *              沒有高度（或給 document.body）就自己開一層全螢幕白底。
 *
 * 版面（390×664、375×548、360×640 都不捲頁面）
 *   上：店裡一角（P2 斜俯視的木地板、牆、唱片箱）＋你站在中間，放大到 1 小人格＝3 美術格×3；會呼吸。點人換動作（站著→走路→丟唱片→歡呼→翻箱→背面）。
 *       舞台的店景：有 DipLabStage.paintSlice／DipShop.paintSlice(ctx, { x, y, w, h, unit }) 就用店裡真的；沒有就畫同一套木色的一角。
 *       頭上是名牌（黑底白字，跟店裡的「你」一樣），點了就能改名。
 *   中：7 個分頁（臉、頭髮、帽子、眼鏡、上衣、下身、配件）。
 *   下：選項格（每格＝你自己穿上那一款，只截那個部位）＋色票；最底「隨機」「完成」。
 * 只掛 window.DipLabCharEdit；樣式在 charedit.css（前綴 ce-）。舊的 mount(host, { spec, onDone, onCancel, onChange }) 仍可用。
 */
(function (root, factory) {
  function getCH() {
    if (root && root.DipLabChars) return root.DipLabChars;
    if (typeof require === 'function') { try { return require('./chars.js'); } catch (e) { return null; } }
    return null;
  }
  var api = factory(root, getCH);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.DipLabCharEdit = api;
})(typeof self !== 'undefined' ? self : (typeof globalThis !== 'undefined' ? globalThis : this), function (W, getCH) {
  'use strict';

  // ===================================================================== 純邏輯（Node 測得到）
  var NAME_MAX = 8, NAME_DEFAULT = '你';
  function clone(s) { return JSON.parse(JSON.stringify(s || {})); }
  function norm(s) { var CH = getCH(); return CH ? CH.normalize(s) : clone(s); }
  function charsOf(s) { return Array.from ? Array.from(String(s)) : String(s).split(''); }
  function clampName(s) { s = String(s == null ? '' : s).replace(/[\u0000-\u001f\u007f\u2028\u2029]/g, ''); return charsOf(s).slice(0, NAME_MAX).join(''); }
  function finalName(s) { var n = clampName(String(s == null ? '' : s).replace(/\s+/g, ' ').trim()).trim(); return n || NAME_DEFAULT; }

  function second(kind, id) { var CH = getCH(); return !!(CH && CH.SECOND[kind] && CH.SECOND[kind][id]); }
  // 分頁：每頁幾段（kind：parts＝款式縮圖、color＝色票）。crop＝縮圖截哪一塊；when＝什麼時候才出現
  var TABS = [
    { id: 'face', label: '臉', groups: [
      { key: 'skin', label: '膚色', kind: 'color', list: 'skin' },
      { key: 'facial', label: '鬍子', kind: 'parts', list: 'facial', crop: 'face' },
      { key: 'facialColor', label: '鬍子顏色', kind: 'color', list: 'hairColor', auto: '跟髮色', when: function (s) { return s.facial !== 'none'; } }] },
    { id: 'hair', label: '頭髮', groups: [
      { key: 'hair', label: '髮型', kind: 'parts', list: 'hair', crop: 'head' },
      { key: 'hairColor', label: '髮色', kind: 'color', list: 'hairColor' }] },
    { id: 'hat', label: '帽子', groups: [
      { key: 'hat', label: '帽子', kind: 'parts', list: 'hat', crop: 'head' },
      { key: 'hatColor', label: '顏色', kind: 'color', list: 'color', auto: '原色', when: function (s) { return s.hat !== 'none'; } },
      { key: 'hat2Color', label: '第二色', kind: 'color', list: 'color', auto: '原色', when: function (s) { return second('hat', s.hat); } }] },
    { id: 'glasses', label: '眼鏡', groups: [
      { key: 'glasses', label: '眼鏡', kind: 'parts', list: 'glasses', crop: 'face' },
      { key: 'glassesColor', label: '鏡框', kind: 'color', list: 'glassesColor', auto: '原色', when: function (s) { return s.glasses !== 'none'; } }] },
    { id: 'top', label: '上衣', groups: [
      { key: 'top', label: '上衣', kind: 'parts', list: 'top', crop: 'torso' },
      { key: 'topColor', label: '顏色', kind: 'color', list: 'color' },
      { key: 'top2Color', label: '第二色', kind: 'color', list: 'color', auto: '原色', when: function (s) { return second('top', s.top); } }] },
    { id: 'bottom', label: '下身', groups: [
      { key: 'bottom', label: '褲子／裙子', kind: 'parts', list: 'bottom', crop: 'legs' },
      { key: 'bottomColor', label: '顏色', kind: 'color', list: 'color' },
      { key: 'shoesColor', label: '鞋子', kind: 'color', list: 'shoesColor' }] },
    { id: 'acc', label: '配件', groups: [
      { key: 'bag', label: '包包', kind: 'parts', list: 'bag', crop: 'bag' },
      { key: 'bagColor', label: '包包顏色', kind: 'color', list: 'color', auto: '原色', when: function (s) { return s.bag !== 'none'; } },
      { key: 'neck', label: '脖子', kind: 'parts', list: 'neck', crop: 'torso' },
      { key: 'neckColor', label: '顏色', kind: 'color', list: 'color', auto: '原色', when: function (s) { return s.neck !== 'none'; } }] }
  ];
  var OLD_TAB = { skin: 'face', facial: 'face', hairColor: 'hair', topColor: 'top', shoes: 'bottom', body: 'face' };
  function tabOf(id) { id = OLD_TAB[id] || id; for (var i = 0; i < TABS.length; i++) if (TABS[i].id === id) return TABS[i]; return null; }
  function visibleGroups(spec, tabId) { var T = tabOf(tabId) || TABS[0], s = norm(spec); return T.groups.filter(function (g) { return !g.when || g.when(s); }); }
  function listOf(g) { var CH = getCH(); return (CH && CH.parts[g.list]) || []; }
  function labelOf(list, id) { var CH = getCH(), L = (CH && CH.parts[list]) || []; for (var i = 0; i < L.length; i++) if (L[i].id === id) return L[i].label; return ''; }
  // 改一個欄位。換款式時，那一款的顏色若沒被玩家親手選過（keep），就回到「原色」（auto＝那一款的招牌色）
  var COLOR_OF = { hat: ['hatColor', 'hat2Color'], top: ['top2Color'], neck: ['neckColor'], bag: ['bagColor', 'bag2Color'], glasses: ['glassesColor'] };
  function apply(spec, key, value, keep) {
    var s = clone(norm(spec)); keep = keep || {};
    s[key] = value;
    (COLOR_OF[key] || []).forEach(function (k) { if (!keep[k]) s[k] = 'auto'; });
    return norm(s);
  }
  // 讀進來的存檔：已經不是「原色」的顏色＝玩家以前親手選的，換款式時照樣留著
  function keepOf(spec) { var s = norm(spec), k = {}; Object.keys(COLOR_OF).forEach(function (p) { COLOR_OF[p].forEach(function (c) { if (s[c] && s[c] !== 'auto') k[c] = true; }); }); return k; }
  function shuffle(seed) { var CH = getCH(); return CH ? CH.random(seed == null ? Date.now() + ':' + Math.random() : seed) : {}; }
  // 一句話描述（無障礙）：黑色西裝頭・藍色 T 恤・黑色長褲
  function summary(spec) {
    var s = norm(spec), out = [];
    out.push(s.hair === 'bald' ? '光頭' : labelOf('hairColor', s.hairColor) + '色' + labelOf('hair', s.hair));
    if (s.hat !== 'none') out.push(labelOf('hat', s.hat));
    if (s.glasses !== 'none') out.push(labelOf('glasses', s.glasses));
    if (s.facial !== 'none') out.push(labelOf('facial', s.facial));
    out.push((labelOf('color', s.topColor) ? labelOf('color', s.topColor) + '色' : '') + labelOf('top', s.top));
    out.push((labelOf('color', s.bottomColor) ? labelOf('color', s.bottomColor) + '色' : '') + labelOf('bottom', s.bottom));
    if (s.neck !== 'none') out.push(labelOf('neck', s.neck));
    if (s.bag !== 'none') out.push(labelOf('bag', s.bag));
    return out.join('・');
  }
  function result(name, spec) { return { name: finalName(name), spec: clone(norm(spec)) }; }

  var LOGIC = { apply: apply, shuffle: shuffle, summary: summary, labelOf: labelOf, clampName: clampName, finalName: finalName,
    visibleGroups: visibleGroups, tabOf: tabOf, result: result, TABS: TABS, NAME_MAX: NAME_MAX, NAME_DEFAULT: NAME_DEFAULT };

  // ===================================================================== 店裡一角（P2 斜俯視的同一套木色；美術格）
  function hash(a, b, c) { var h = (a | 0) * 374761393 + (b | 0) * 668265263 + (c | 0) * 362437 + 1013904223; h = Math.imul(h ^ (h >>> 13), 1274126177); h = h ^ (h >>> 16); return (h >>> 0) / 4294967296; }
  function hx(c) { c = c.replace('#', ''); return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)]; }
  function shade(c, f) { var a = hx(c), o = f >= 0 ? a.map(function (v) { return v + (255 - v) * f; }) : a.map(function (v) { return v * (1 + f); }); return '#' + o.map(function (v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? '0' : '') + v.toString(16); }).join(''); }
  var PC = { wall: '#e4dccb', wallL: '#efe9dc', wallD: '#cfc5b0', wallDD: '#b9ae97', walnut: '#76492b', walnutL: '#93603b', walnutD: '#55331c',
    pine: '#d4a265', pineL: '#e8bf84', pineD: '#b5844a', pineDD: '#8d6233', pineX: '#6e4a26', interior: '#2e1e12', O: '#1d1712',
    sleeves: ['#efe8d6', '#ebe2cc', '#f1e4ad', '#e6cd7c', '#dcd6c6', '#c3bca9', '#2c2725', '#e9ddbd', '#d8b56c', '#f2ecdf'],
    covers: [['#1d1b1a', '#f2cf3e'], ['#d9473a', '#f6f3ea'], ['#2f4f80', '#e98a3c'], ['#f1ece1', '#1d1b1a'], ['#3c7b5c', '#f2cf3e'], ['#e7c64f', '#7a3b6b'], ['#5ba6c3', '#f6f3ea'], ['#7a3b6b', '#e7c64f']] };
  // 畫一張 wArt×hArt 的小店景（地板線 floorY；人站在 standX, standY）。回傳 canvas（1 美術格＝1 px）
  function paintCorner(wArt, hArt) {
    var cv = document.createElement('canvas'); cv.width = wArt; cv.height = hArt;
    var g = cv.getContext('2d');
    function r(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    var base = Math.round(hArt * 0.36);   // 牆腳
    // 牆
    r(0, 0, wArt, base, PC.wall);
    for (var y = 0; y < base; y++) for (var x = 0; x < wArt; x++) { var q = hash(x, y, 5); if (q < 0.035) r(x, y, 1, 1, PC.wallD); else if (q > 0.975) r(x, y, 1, 1, PC.wallL); }
    r(0, 0, wArt, 1, PC.wallDD); r(0, 1, wArt, 2, PC.wallD);
    // 牆上的唱片架（封面朝外）
    var ly = Math.max(6, base - 26), n = Math.floor((wArt - 8) / 15);
    for (var i = 0; i < n; i++) {
      var sx = 6 + i * 15, cc = PC.covers[i % PC.covers.length];
      r(sx - 1, ly - 1, 14, 14, PC.O); r(sx, ly, 12, 12, cc[0]);
      if (i % 3 === 0) { r(sx + 3, ly + 3, 6, 6, cc[1]); r(sx + 5, ly + 5, 2, 2, cc[0]); }
      else if (i % 3 === 1) { r(sx, ly + 7, 12, 2, cc[1]); r(sx + 2, ly + 2, 3, 3, cc[1]); }
      else { for (var k = 0; k < 4; k++) r(sx + k * 3, ly + k * 3, 3, 3, cc[1]); }
    }
    r(3, ly + 12, wArt - 6, 2, PC.walnutL); r(3, ly + 14, wArt - 6, 1, PC.walnutD);
    // 牆腳板
    r(0, base - 3, wArt, 3, PC.walnut); r(0, base - 3, wArt, 1, PC.walnutL);
    // 木地板（P2 同一套：6 格寬的板子、長短不一、木紋）
    var cols = ['#8e5a35', '#865330', '#93613b', '#7e4e2c', '#9a673e', '#8a5733', '#83512e', '#965f37'];
    for (var bx = 0, bi = 0; bx < wArt; bx += 6, bi++) {
      var yy = base - Math.floor(hash(bi, 1, 1) * 45), j = 0;
      while (yy < hArt) {
        var len = 30 + Math.floor(hash(bi, j, 7) * 46), c = cols[Math.floor(hash(bi, j, 3) * cols.length)];
        var ys = Math.max(yy, base), ye = Math.min(yy + len, hArt);
        if (ye > ys) {
          r(bx, ys, 6, ye - ys, c); r(bx + 1, ys, 1, ye - ys, shade(c, 0.08));
          for (var gg = 0; gg < 2 + Math.floor((ye - ys) / 10); gg++) { var gx = bx + 2 + Math.floor(hash(bi, j * 13 + gg, 17) * 4), gy = ys + Math.floor(hash(bi, j * 13 + gg, 19) * Math.max(1, ye - ys - 2)); r(gx, gy, 1, Math.min(2 + Math.floor(hash(bi, j * 13 + gg, 23) * 9), ye - gy), shade(c, hash(bi, j * 13 + gg, 29) < 0.6 ? -0.14 : 0.1)); }
          if (yy + len < hArt) r(bx, yy + len - 1, 6, 1, '#4b2d18');
        }
        yy += len; j++;
      }
      r(bx, base, 1, hArt - base, '#4f301b');
    }
    g.globalAlpha = 0.4; r(0, base, wArt, 2, '#1b0e05'); g.globalAlpha = 1;
    // 右邊一張唱片箱桌（只露出一半）：前板＋箱裡的唱片上緣＋最前面那張封面
    var tw = 44, tx = wArt - 30, fy = hArt - 6, th = 15, d = 18, lip = fy - th, back = fy - d - th;
    g.globalAlpha = 0.42; r(tx - 1, fy - 1, tw + 3, 3, '#1b0e05'); g.globalAlpha = 1;
    r(tx, back, tw, d, PC.interior); r(tx, back, 2, d, PC.pine); r(tx, back, 1, d, PC.pineL);
    for (var y2 = back + 1; y2 < lip - 6; y2++) { var sc = PC.sleeves[Math.floor(hash(tx, y2, 12) * PC.sleeves.length)]; r(tx + 2, y2 - 7, 12, 1, sc); r(tx + 15, y2 - 6, 12, 1, PC.sleeves[Math.floor(hash(tx + 1, y2, 12) * PC.sleeves.length)]); r(tx + 28, y2 - 8, 12, 1, PC.sleeves[Math.floor(hash(tx + 2, y2, 12) * PC.sleeves.length)]); }
    [[tx + 2, PC.covers[2]], [tx + 15, PC.covers[5]], [tx + 28, PC.covers[0]]].forEach(function (p, ii) { var fx = p[0], fb = lip - 10 + (ii % 2); r(fx - 1, fb - 1, 14, 13, PC.O); r(fx, fb, 12, 11, p[1][0]); r(fx + 2, fb + 3, 8, 3, p[1][1]); });
    r(tx, lip, tw, th, PC.pine); r(tx, lip, tw, 2, PC.pineL); r(tx, lip + 2, tw, 1, PC.pineD);
    for (var py = lip + 8; py < fy - 4; py += 6) r(tx + 1, py, tw - 2, 1, shade(PC.pine, -0.1));
    r(tx, lip, 1, th, PC.pineL); r(tx + 2, fy - 3, tw - 4, 3, PC.pineDD); r(tx, fy - 1, tw, 1, PC.pineX);
    // 左邊一盆小植物（P2 窗邊那種）
    var px = 8, pyb = hArt - 10;
    r(px, pyb - 9, 10, 9, '#b4643c'); r(px, pyb - 9, 10, 2, '#cf7b4f'); r(px + 1, pyb - 1, 8, 1, '#8a4a2a');
    [[3, -16, 6], [8, -20, 5], [12, -15, 5], [5, -22, 4], [1, -13, 4]].forEach(function (l) { r(px + l[0] - 1, pyb + l[1] - 1, l[2] + 2, 6, PC.O); r(px + l[0], pyb + l[1], l[2], 4, '#3f8a4a'); r(px + l[0], pyb + l[1], l[2], 1, '#6cb36a'); });
    // 暖色燈光（中間亮、四角暗；量化成幾階，跟 P2 一樣的像素光）
    var id = g.getImageData(0, 0, wArt, hArt), D = id.data, cx0 = wArt * 0.45, cy0 = hArt * 0.55, R = Math.max(wArt, hArt) * 0.75;
    for (var y3 = 0; y3 < hArt; y3++) for (var x3 = 0; x3 < wArt; x3++) {
      var dd = Math.min(1, Math.hypot((x3 - cx0) / R, (y3 - cy0) / R)), f = 1 - Math.round(dd * dd * 0.42 * 6) / 6 * 0.6, ii2 = (y3 * wArt + x3) * 4;
      D[ii2] = Math.min(255, D[ii2] * f * 1.02); D[ii2 + 1] = D[ii2 + 1] * f * 0.98; D[ii2 + 2] = D[ii2 + 2] * f * 0.92;
    }
    g.putImageData(id, 0, 0);
    return { cv: cv, floorY: base, standX: Math.round(wArt * 0.42), standY: hArt - 8 };
  }
  // 7 吋小唱片（拿在手上）
  function disc(g, cx, cy, u, col) {
    var px = [[-1, -2], [0, -2], [1, -2], [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1], [-2, 0], [-1, 0], [1, 0], [2, 0], [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1], [-1, 2], [0, 2], [1, 2]];
    g.fillStyle = PC.O; [[-1, -3], [0, -3], [1, -3], [-2, -2], [2, -2], [-3, -1], [3, -1], [-3, 0], [3, 0], [-3, 1], [3, 1], [-2, 2], [2, 2], [-1, 3], [0, 3], [1, 3]].forEach(function (p) { g.fillRect(cx + p[0] * u, cy + p[1] * u, u, u); });
    g.fillStyle = '#222'; px.forEach(function (p) { g.fillRect(cx + p[0] * u, cy + p[1] * u, u, u); });
    g.fillStyle = col || '#c11628'; g.fillRect(cx, cy, u, u);
    g.fillStyle = '#5a5a5a'; g.fillRect(cx - u, cy - 2 * u, u, u);
  }

  // ===================================================================== 畫面
  var EL = function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  var ICON_X = '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="2" fill="none"/></svg>';
  var ICON_DICE = '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1.5" y="1.5" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="4" width="2.5" height="2.5" fill="currentColor"/><rect x="9.5" y="9.5" width="2.5" height="2.5" fill="currentColor"/><rect x="6.75" y="6.75" width="2.5" height="2.5" fill="currentColor"/></svg>';
  var CROPS = {   // 縮圖截哪一塊（小人格，原版 16×16 的欄列）
    head: { c0: 0, c1: 16, r0: -2.5, r1: 8 }, face: { c0: 2, c1: 14, r0: 1, r1: 8 }, torso: { c0: 0, c1: 16, r0: 5, r1: 13 },
    legs: { c0: 1, c1: 15, r0: 9, r1: 15.4 }, full: { c0: -1, c1: 17, r0: -1, r1: 15.4 }, bag: { c0: -1, c1: 17, r0: 5, r1: 14 }
  };
  var ACTIONS = [['idle', '站著'], ['walk', '走路'], ['throw', '丟唱片'], ['cheer', '歡呼'], ['dig', '翻箱'], ['back', '背面'], ['hurt', '被打中']];

  function open(container, init, cb) {
    var CH = getCH(); if (!CH || typeof document === 'undefined') return null;
    init = init || {}; cb = cb || {};
    var dpr = Math.max(1, Math.min(3, W.devicePixelRatio || 1));
    var state = { spec: norm(init.spec || {}), name: clampName(init.name == null ? NAME_DEFAULT : init.name), tab: (tabOf(cb.tab) || TABS[1]).id, keep: {}, act: 0, t0: 0 };
    state.keep = keepOf(state.spec);
    if (state.name === NAME_DEFAULT) state.name = '';
    var veil = null, host = container;
    if (!host || host === document.body || !host.clientHeight) { veil = EL('div', 'ce-veil'); document.body.appendChild(veil); host = veil; }
    var root = EL('div', 'ce'); root.setAttribute('role', 'dialog'); root.setAttribute('aria-label', cb.title || '捏一個你');
    // --- 舞台
    var stage = EL('div', 'ce-stage'), cv = EL('canvas', 'ce-cv'), ttl = EL('div', 'ce-ttl', esc(cb.title || '捏一個你'));
    cv.setAttribute('aria-label', '點人換動作'); cv.setAttribute('role', 'button'); cv.tabIndex = 0;
    var tag = EL('label', 'ce-tag'), inp = EL('input', 'ce-name');
    inp.type = 'text'; inp.size = 1; inp.maxLength = 16; inp.placeholder = NAME_DEFAULT; inp.value = state.name; inp.setAttribute('aria-label', '名字（最多 8 個字）'); inp.autocomplete = 'off'; inp.enterKeyHint = 'done';
    tag.appendChild(inp); tag.appendChild(EL('i', 'ce-pen', '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M1 9l1-3 5-5 2 2-5 5z" fill="currentColor"/></svg>'));
    var act = EL('div', 'ce-act');
    stage.appendChild(cv); stage.appendChild(ttl); stage.appendChild(tag); stage.appendChild(act);
    if (cb.onCancel) { var bx = EL('button', 'ce-x', '<i>' + ICON_X + '</i>'); bx.type = 'button'; bx.setAttribute('aria-label', '不改了'); bx.onclick = function () { cancel(); }; stage.appendChild(bx); }
    // --- 分頁
    var tabs = EL('div', 'ce-tabs'); tabs.setAttribute('role', 'tablist');
    TABS.forEach(function (T) {
      var b = EL('button', 'ce-tab', esc(T.label)); b.type = 'button'; b.setAttribute('role', 'tab'); b.dataset.tab = T.id;
      b.onclick = function () { setTab(T.id); }; tabs.appendChild(b);
    });
    // --- 選項
    var body = EL('div', 'ce-body'); body.setAttribute('role', 'tabpanel');
    // --- 底部
    var foot = EL('div', 'ce-foot');
    var bRand = EL('button', 'ce-btn ce-rand', ICON_DICE + '<span>隨機</span>'); bRand.type = 'button';
    var bDone = EL('button', 'ce-btn ce-done', '<span>完成</span>'); bDone.type = 'button';
    foot.appendChild(bRand); foot.appendChild(bDone);
    var live = EL('div', 'ce-sr'); live.setAttribute('aria-live', 'polite');
    root.appendChild(stage); root.appendChild(tabs); root.appendChild(body); root.appendChild(foot); root.appendChild(live);
    host.appendChild(root);

    // --- 舞台大小：依容器高度決定（1 美術格＝U 裝置 px，整數）
    var scene = null, U = 6, artW = 0, artH = 0, raf = 0, closed = false;
    function layoutStage() {
      var H = root.clientHeight || 600, sh = Math.round(Math.max(150, Math.min(268, H * 0.37)));
      stage.style.height = sh + 'px';
      var cw = stage.clientWidth || 390;
      U = Math.max(3, Math.floor(sh * dpr / 90));
      artW = Math.ceil(cw * dpr / U); artH = Math.ceil(sh * dpr / U);
      cv.width = Math.round(cw * dpr); cv.height = Math.round(sh * dpr); cv.style.width = cw + 'px'; cv.style.height = sh + 'px';
      scene = null;
      var painter = (W.DipLabStage && W.DipLabStage.paintSlice) || (W.DipShop && W.DipShop.paintSlice);
      if (painter) {
        try { var sc = document.createElement('canvas'); sc.width = artW; sc.height = artH; if (painter(sc.getContext('2d'), { x: 0, y: 0, w: artW, h: artH, unit: 1, purpose: 'charedit' }) !== false) scene = { cv: sc, standX: Math.round(artW * 0.42), standY: artH - 8 }; } catch (e) { scene = null; }
      }
      if (!scene) scene = paintCorner(artW, artH);
      draw();
    }
    function curPose(t) {
      var a = ACTIONS[state.act][0], ph = t - state.t0;
      if (a === 'idle') return { pose: 'idle', frame: Math.floor(ph / 520) % 2 };
      if (a === 'walk') return { pose: 'walk', frame: Math.floor(ph / 190) % 2 };
      if (a === 'throw') { var k = ph % 1500; return { pose: k < 700 ? 'throw' : k < 1100 ? 'throw' : 'idle', frame: k < 700 ? 0 : 1, disc: k < 700 ? 'hand' : null, fly: k >= 700 && k < 1100 ? (k - 700) / 400 : null }; }
      if (a === 'cheer') return { pose: 'cheer', frame: Math.floor(ph / 260) % 2 };
      if (a === 'dig') return { pose: 'dig', frame: Math.floor(ph / 640) % 2, disc: Math.floor(ph / 640) % 2 ? 'held' : null };
      if (a === 'back') return { pose: 'idle', frame: Math.floor(ph / 520) % 2, back: true };
      return { pose: 'hurt', frame: Math.floor(ph / 120) % 2, tint: (ph % 1200) < 240 ? '#ff3030' : null };
    }
    function draw(t) {
      if (!scene || closed) return;
      t = t || (W.performance ? performance.now() : Date.now());
      var g = cv.getContext('2d'); g.imageSmoothingEnabled = false;
      g.drawImage(scene.cv, 0, 0, artW * U, artH * U);
      var P = curPose(t), fx = scene.standX * U, fy = scene.standY * U;
      var o = { scale: 3 * U, back: !!P.back }; if (P.tint) o.tint = P.tint;
      var r = CH.render(g, state.spec, P.pose, P.frame, fx, fy, o);
      if (P.disc) { var a = P.disc === 'held' ? r.anchors.held || r.anchors.hand : r.anchors.hand; if (a) disc(g, Math.round(a.x), Math.round(a.y - 2 * U), U, '#6a3fa0'); }
      if (P.fly != null && r.anchors.hand) disc(g, Math.round(r.anchors.hand.x + P.fly * 60 * U), Math.round(r.anchors.hand.y - Math.sin(P.fly * Math.PI) * 10 * U), U, '#6a3fa0');
      // 名牌貼頭頂（站著時的頭頂，動作時不跟著跳）
      var head = CH.anchor(state.spec, 'idle', 0, 'head', { scale: 3 * U });
      var tx = fx / dpr, ty = (fy + head[1]) / dpr - 10;
      tag.style.transform = 'translate(' + Math.round(tx - tag.offsetWidth / 2) + 'px,' + Math.round(ty - tag.offsetHeight) + 'px)';
    }
    function loop(t) { if (closed) return; draw(t); raf = W.requestAnimationFrame(loop); }
    // --- 選項
    function setTab(id) {
      state.tab = (tabOf(id) || TABS[0]).id;
      Array.prototype.forEach.call(tabs.children, function (b) { var on = b.dataset.tab === state.tab; b.classList.toggle('on', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
      body.scrollTop = 0; fill();
    }
    function thumb(spec, crop, size) {
      var c = EL('canvas', 'ce-th'), dev = Math.round(size * dpr); c.width = dev; c.height = dev; c.style.width = size + 'px'; c.style.height = size + 'px';
      var g = c.getContext('2d'), C = CROPS[crop] || CROPS.full, src = CH.toCanvas(spec, 'idle', 0, {});
      if (!src) return c;
      var x0 = src.ax + (C.c0 - 8) * 3, y0 = src.ay + (C.r0 - 15) * 3, w = (C.c1 - C.c0) * 3, h = (C.r1 - C.r0) * 3;
      var u = Math.max(1, Math.floor(Math.min((dev - 4) / w, (dev - 4) / h)));
      g.imageSmoothingEnabled = false;
      g.drawImage(src, Math.round((dev - w * u) / 2 - x0 * u), Math.round((dev - h * u) / 2 - y0 * u), src.width * u, src.height * u);
      return c;
    }
    function fill() {
      body.innerHTML = '';
      var s = state.spec, groups = visibleGroups(s, state.tab);
      groups.forEach(function (G) {
        var sec = EL('section', 'ce-sec'), list = listOf(G), cur = s[G.key];
        var hd = EL('div', 'ce-hd');
        var curLabel = cur === 'auto' ? (G.auto || '原色') : labelOf(G.list, cur);
        hd.innerHTML = '<b>' + esc(G.label) + '</b><span>' + esc(curLabel || '') + '</span>';
        sec.appendChild(hd);
        var grid = EL('div', G.kind === 'parts' ? 'ce-grid' : 'ce-sw');
        if (G.kind === 'parts') {
          var size = root.clientWidth < 370 ? 50 : 54;
          list.forEach(function (it) {
            var b = EL('button', 'ce-opt' + (it.id === cur ? ' on' : '')); b.type = 'button'; b.title = it.label; b.setAttribute('aria-label', G.label + '：' + it.label); b.setAttribute('aria-pressed', it.id === cur ? 'true' : 'false');
            var sp = it.id === cur ? norm(s) : apply(s, G.key, it.id, state.keep);   // 選中的那格＝現在身上那套
            if (G.key === 'hair' && sp.hat && sp.hat !== 'none') { sp = clone(sp); sp.hat = 'none'; }   // 髮型縮圖不戴帽子，不然 17 款看起來都一樣
            b.appendChild(thumb(sp, G.crop, size));
            if (it.id === 'none') b.appendChild(EL('i', 'ce-none', '不要'));
            b.onclick = function () { set(G.key, it.id); };
            grid.appendChild(b);
          });
        } else {
          var items = (G.auto ? [{ id: 'auto', label: G.auto }] : []).concat(list);
          items.forEach(function (it) {
            var b = EL('button', 'ce-c' + (it.id === cur ? ' on' : '') + (it.id === 'auto' ? ' ce-auto' : '')); b.type = 'button'; b.title = it.label;
            b.setAttribute('aria-label', G.label + '：' + it.label); b.setAttribute('aria-pressed', it.id === cur ? 'true' : 'false');
            var hexv = it.hex || CH.swatch(it.id);
            b.innerHTML = it.id === 'auto' ? '<i>原</i>' : '<i style="background:' + hexv + '"></i>';
            b.onclick = function () { state.keep[G.key] = it.id !== 'auto'; set(G.key, it.id); };
            grid.appendChild(b);
          });
        }
        sec.appendChild(grid); body.appendChild(sec);
      });
    }
    function changed() {
      live.textContent = summary(state.spec);
      if (cb.onChange) try { cb.onChange(result(state.name, state.spec)); } catch (e) { console.error(e); }
    }
    function set(key, value) {
      var top = body.scrollTop;
      state.spec = apply(state.spec, key, value, state.keep);
      fill(); body.scrollTop = top; draw(); changed();
    }
    function randomize() { state.spec = shuffle(); state.keep = {}; fill(); state.act = 0; state.t0 = now(); act.textContent = ''; draw(); changed(); }
    function now() { return W.performance ? performance.now() : Date.now(); }
    cv.onclick = function () { state.act = (state.act + 1) % ACTIONS.length; state.t0 = now(); act.textContent = ACTIONS[state.act][1]; act.classList.remove('show'); void act.offsetWidth; act.classList.add('show'); };
    cv.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cv.onclick(); } };
    inp.oninput = function () { var v = clampName(inp.value); if (v !== inp.value) inp.value = v; state.name = v; tag.setAttribute('data-v', v || NAME_DEFAULT); draw(); };
    inp.onkeydown = function (e) { if (e.key === 'Enter') { e.preventDefault(); inp.blur(); } };
    inp.onblur = function () { state.name = clampName(inp.value.trim()); inp.value = state.name; tag.setAttribute('data-v', state.name || NAME_DEFAULT); draw(); changed(); };
    tag.setAttribute('data-v', state.name || NAME_DEFAULT);
    bRand.onclick = randomize;
    bDone.onclick = function () { var r = result(state.name, state.spec); var keepOpen = cb.onSave ? cb.onSave(r) === false : false; if (!keepOpen) close(); };
    function cancel() { if (cb.onCancel) try { cb.onCancel(); } catch (e) { console.error(e); } close(); }
    function onKey(e) { if (e.key === 'Escape' && cb.onCancel && document.activeElement !== inp) { e.preventDefault(); cancel(); } }
    document.addEventListener('keydown', onKey);
    var ro = W.ResizeObserver ? new W.ResizeObserver(function () { layoutStage(); }) : null;
    if (ro) ro.observe(root); else W.addEventListener('resize', layoutStage);
    function close() {
      if (closed) return; closed = true;
      W.cancelAnimationFrame(raf); document.removeEventListener('keydown', onKey);
      if (ro) ro.disconnect(); else W.removeEventListener('resize', layoutStage);
      if (root.parentNode) root.parentNode.removeChild(root);
      if (veil && veil.parentNode) veil.parentNode.removeChild(veil);
    }
    setTab(state.tab); layoutStage(); live.textContent = summary(state.spec);
    raf = W.requestAnimationFrame(loop);
    return {
      el: root,
      get: function () { return result(state.name, state.spec); },
      set: function (o) { o = o || {}; if (o.spec) { state.spec = norm(o.spec); state.keep = keepOf(state.spec); } if (o.name != null) { state.name = clampName(o.name); inp.value = state.name; tag.setAttribute('data-v', state.name || NAME_DEFAULT); } fill(); draw(); },
      tab: function (id) { setTab(id); },
      act: function (i) { state.act = ((i | 0) % ACTIONS.length + ACTIONS.length) % ACTIONS.length; state.t0 = now(); draw(); },
      close: close
    };
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); }

  // 舊介面：mount(host, { spec, title, tab, onChange(spec), onDone(spec), onCancel() }) → { el, get()→spec, set(spec), tab(), destroy() }
  function mount(host, o) {
    o = o || {};
    var h = open(host, { spec: o.spec, name: o.name }, {
      title: o.title, tab: o.tab,
      onChange: o.onChange ? function (r) { o.onChange(r.spec); } : null,
      onSave: o.onDone ? function (r) { return o.onDone(r.spec, r.name); } : null,
      onCancel: o.onCancel || null
    });
    if (!h) return null;
    return { el: h.el, get: function () { return h.get().spec; }, set: function (s) { h.set({ spec: s }); }, tab: h.tab, destroy: h.close };
  }

  return { open: open, mount: mount, TABS: TABS, _logic: LOGIC, _paintCorner: typeof document !== 'undefined' ? paintCorner : null, version: '4.0' };
});
