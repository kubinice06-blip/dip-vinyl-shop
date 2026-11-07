/* shop-props.js：DipShop 道具庫。每個道具都畫在同一個像素格上（1 格 = 1 小人格）。
 * defProp(type, { layer, box(o), base(o), draw(P, o, S), lights(o,S), hots(o,S) })
 * 座標：o.x / o.y 是左上角（場景像素）；layer 預設 'stand'（跟小人一起按腳底 y 排序）。
 * 顏色用調色盤名字（shop.js DEFAULT_PAL，店的 JSON 可以覆寫）。
 */
(function () {
  'use strict';
  var D = window.DipShop, def = D.defProp, bayer = D.bayer, seeded = D.seeded;
  function shade(P, x, y, w, h, lvl) { P.rect(x, y, w, h, 'rgba(18,8,2,' + (0.62 * (lvl == null ? 0.5 : lvl)).toFixed(2) + ')'); }
  function pick(rnd, arr) { return arr[Math.floor(rnd() * arr.length)]; }
  var SPINE = ['#c11628', '#1f5fae', '#f0c75e', '#2e7d52', '#6a3fa0', '#e0851c', '#e8e8ee', '#2b2b2b', '#3fb6c9', '#e75480', '#8a5730', '#b9b9c2', '#111111', '#cf9a5e'];

  // ===================================================================== 牆
  def('wall:panel', {   // 淺木板牆＋護牆板＋踢腳板（dip 本店）
    draw: function (P, o, S) {
      var h = o.h, W = S.W, bw = o.board || 12, ws = o.wainscot || (h - 16), rnd = seeded('wall' + (o.seed || 1));
      P.rect(0, 0, W, h, o.base || 'wl2');
      for (var x = 0; x < W; x += bw) {
        P.vl(x, 0, ws, o.seam || 'wl0'); P.vl(x + 1, 0, ws, o.hiCol || 'wl3');
        for (var k = 0; k < 4; k++) { var gx = x + 3 + Math.floor(rnd() * (bw - 5)), gy = 6 + Math.floor(rnd() * (ws - 14)); P.vl(gx, gy, 2 + Math.floor(rnd() * 5), 'wl1'); }
      }
      // 護牆板（直條）
      P.rect(0, ws, W, h - ws, o.lower || 'wl1');
      for (var x2 = 1; x2 < W; x2 += 3) P.vl(x2, ws + 2, h - ws - 5, 'wl0');
      P.hl(0, ws, W, 'wd2'); P.hl(0, ws + 1, W, 'wd5'); P.hl(0, ws + 2, W, 'wd3');
      // 天花板
      P.rect(0, 0, W, 4, 'wd1'); P.hl(0, 4, W, 'wd0'); shade(P, 0, 5, W, 2, 0.35); shade(P, 0, 7, W, 1, 0.12);
      // 踢腳板
      P.rect(0, h - 3, W, 3, 'wd1'); P.hl(0, h - 3, W, 'wd3');
    }
  });
  def('wall:brick', {   // 紅磚（地下室）
    draw: function (P, o, S) {
      var h = o.h, W = S.W, rnd = seeded('brick' + (o.seed || 1)), cols = o.colors || ['#7a3a2a', '#8a4632', '#6c3224', '#93503a'];
      P.rect(0, 0, W, h, o.mortar || '#3a2a26');
      for (var row = 0, y = 0; y < h; row++, y += 4) for (var x = (row % 2) * -4; x < W; x += 8) {
        P.rect(x + 1, y + 1, 7, 3, pick(rnd, cols)); if (rnd() < 0.3) P.hl(x + 1, y + 1, 7, 'rgba(255,255,255,0.08)');
      }
      // 白漆剝落、霓虹打在牆上
      if (o.paint) for (var i = 0; i < 6; i++) { var px = Math.floor(rnd() * W), py = Math.floor(rnd() * h * 0.8); P.dither(px, py, 6 + Math.floor(rnd() * 8), 3 + Math.floor(rnd() * 4), o.paint, 0.4); }
      P.rect(0, 0, W, 3, '#1a1416'); shade(P, 0, 3, W, 2, 0.4);
      P.rect(0, h - 2, W, 2, '#26201e');
    }
  });
  def('wall:plaster', {
    draw: function (P, o, S) {
      var h = o.h, W = S.W, rnd = seeded('pl' + (o.seed || 1));
      P.rect(0, 0, W, h, o.base || 'pp1');
      for (var i = 0; i < 60; i++) P.px(Math.floor(rnd() * W), Math.floor(rnd() * h), o.speck || 'pp0');
      P.rect(0, 0, W, 3, 'wd1'); shade(P, 0, 3, W, 2, 0.3);
      P.rect(0, h - 3, W, 3, o.skirt || 'wd2'); P.hl(0, h - 3, W, 'wd4');
    }
  });

  // ===================================================================== 地板
  def('floor:planks', {
    draw: function (P, o, S) {
      var y0 = o.y, H = S.H, W = S.W, rnd = seeded('fl' + (o.seed || 1)), y = y0, row = 0;
      var ramp = o.ramp || ['fl2', 'fl3', 'fl2', 'fl4'];
      P.rect(0, y0, W, H - y0, 'fl1');
      while (y < H) {
        var hh = Math.min(6, 2 + Math.floor(row / 3));   // 越前面越寬：一點點透視
        var c = ramp[row % ramp.length];
        P.rect(0, y, W, hh, c);
        P.hl(0, y + hh - 1, W, 'fl1');
        var x = -Math.floor(rnd() * 30);
        while (x < W) { var len = 22 + Math.floor(rnd() * 26); x += len; P.vl(x, y, hh - 1, 'fl0'); if (hh > 3 && rnd() < 0.6) P.hl(x - len + 4 + Math.floor(rnd() * 8), y + 1, 3 + Math.floor(rnd() * 6), rnd() < 0.5 ? 'fl4' : 'fl1'); }
        y += hh; row++;
      }
      shade(P, 0, y0, W, 3, 0.55); shade(P, 0, y0 + 3, W, 2, 0.25);
    }
  });
  def('floor:tiles', {   // 黑白磁磚（越前面越高）
    draw: function (P, o, S) {
      var y = o.y, H = S.H, W = S.W, row = 0, a = o.a || '#d8d4c8', b = o.b || '#2a2a30', tw = o.tw || 10;
      while (y < H) {
        var hh = Math.min(7, 3 + Math.floor(row / 2));
        for (var x = 0, i = 0; x < W; x += tw, i++) { P.rect(x, y, tw, hh, (i + row) % 2 ? a : b); }
        P.hl(0, y, W, 'rgba(0,0,0,0.25)');
        y += hh; row++;
      }
      shade(P, 0, o.y, W, 3, 0.55);
    }
  });
  def('floor:concrete', {
    draw: function (P, o, S) {
      var y0 = o.y, H = S.H, W = S.W, rnd = seeded('cc');
      P.rect(0, y0, W, H - y0, o.base || '#5a5a5e');
      for (var i = 0; i < 160; i++) P.px(Math.floor(rnd() * W), y0 + Math.floor(rnd() * (H - y0)), rnd() < 0.5 ? '#4a4a4e' : '#6a6a70');
      shade(P, 0, y0, W, 3, 0.55);
    }
  });

  // ===================================================================== 門、窗（開口裡是雨夜街景，門外排隊的人畫在開口裡）
  function street(P, x, y, w, h, S, o) {
    var t = S.t, rnd = seeded('st' + x);
    P.rect(x, y, w, h, 'nt1');
    if (o.glass) {   // 門上的玻璃：路燈打亮的雨夜，門外排隊的人是剪影
      // 玻璃：上暗下亮兩段，加一道斜斜的反光（不用抖動，抖動在小格子上會變棋盤）
      P.rect(x, y, w, h, 'nt1'); P.rect(x, y + Math.floor(h * 0.45), w, h - Math.floor(h * 0.45), 'nt2'); P.hl(x, y + h - 2, w, 'nt3');
      for (var gi = 0; gi < Math.min(w, h) - 2; gi++) P.px(x + 1 + gi, y + h - 3 - gi, 'rgba(207,224,242,0.22)');
      P.px(x + w - 3, y + 2, 'lt0'); P.px(x + w - 3, y + 3, 'rgba(255,210,122,0.4)');
      S.drawOutside(P, [x, y, w, h], { sil: true });
      rain(P, x, y, w, h, t);
      return;
    }
    var gy = y + Math.floor(h * 0.62);
    // 對街樓房＋亮窗
    P.rect(x, y + 3, w, gy - y - 3, 'nt0');
    for (var i = 0; i < 9; i++) { var wx = x + 1 + Math.floor(rnd() * (w - 2)), wy = y + 5 + Math.floor(rnd() * (gy - y - 9)); P.px(wx, wy, rnd() < 0.7 ? 'lt0' : 'c'); }
    // 招牌霓虹
    if (o.neon !== false) { P.hl(x + 2, y + 7, Math.min(5, w - 4), Math.floor(t * 1.3) % 5 ? 'm' : '#7a2a48'); }
    // 濕地面＋倒影
    P.rect(x, gy, w, y + h - gy, 'nt2');
    P.hl(x, gy, w, 'nt3');
    for (var j = 0; j < 3; j++) P.px(x + 2 + j * 4, gy + 2 + (j % 2), 'nt3');
    P.vl(x + 3, gy + 1, 3, 'rgba(255,210,122,0.35)');
    S.drawOutside(P, [x, y, w, h], { sil: !!o.sil });
    rain(P, x, y, w, h, t);
  }
  function rain(P, x, y, w, h, t) {
    var n = Math.max(3, Math.floor(w * h / 40));
    for (var k = 0; k < n; k++) {
      var sx = (k * 37 + 11) % w, sp = 40 + (k * 13) % 30, ry = ((t * sp + k * 23) % (h + 6)) - 3;
      var px = x + ((sx - Math.floor(ry / 3)) % w + w) % w, py = y + Math.floor(ry);
      if (py >= y && py + 1 < y + h) { P.px(px, py, 'nt4'); P.px(px, py + 1, 'nt3'); }
    }
  }
  def('door', {
    layer: 'wall',
    box: function (o) { return [o.x, o.y, o.w || 18, o.h || 30]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, w = o.w || 18, h = o.h || 30, st = S.state.door;
      var ox = x + 2, oy = y + 2, ow = w - 4, oh = h - 2;
      street(P, ox, oy, ow, oh, S, o);
      // 門框
      P.rect(x, y, w, 2, 'wd1'); P.rect(x, y, 2, h, 'wd1'); P.rect(x + w - 2, y, 2, h, 'wd1');
      P.hl(x, y, w, 'wd0'); P.vl(x, y, h, 'wd0'); P.vl(x + w - 1, y, h, 'wd0'); P.vl(x + 1, y + 2, h - 2, 'wd3');
      // 門板
      var sw = st === 'open' ? 3 : st === 'ajar' ? Math.round(ow * 0.55) : ow;
      var gx = ox + 2, gy = oy + 2, gw = sw - 4, gh = Math.round(oh * 0.5);
      if (st === 'closed') {
        P.rect(ox, oy, ow, oh, 'wd3');
        P.frame(ox, oy, ow, oh, 'wd1');
        // 玻璃：把街景重畫一次在玻璃裡（簡單作法：玻璃區不塗木頭）
        street(P, gx, gy, gw, gh, S, { glass: true });
        P.frame(gx - 1, gy - 1, gw + 2, gh + 2, 'wd1');
        P.px(gx, gy + 2, 'rgba(207,224,242,0.5)'); P.px(gx + 1, gy + 1, 'rgba(207,224,242,0.5)'); P.px(gx + 2, gy, 'rgba(207,224,242,0.5)');
        // 下半門板的凹框
        P.frame(ox + 2, gy + gh + 3, ow - 4, oh - gh - 7, 'wd2'); P.hl(ox + 3, gy + gh + 4, ow - 6, 'wd4');
        P.rect(ox + ow - 3, oy + Math.floor(oh * 0.58), 2, 2, 'g'); P.px(ox + ow - 3, oy + Math.floor(oh * 0.58), 'y');
      } else {
        // 半開／全開：門板往內轉，看起來變窄、變暗
        P.rect(ox, oy, sw, oh, 'wd2'); P.vl(ox + sw - 1, oy, oh, 'wd1'); P.vl(ox, oy, oh, 'wd4');
        if (sw > 6) { P.rect(ox + 2, gy, sw - 4, gh, 'nt2'); P.dither(ox + 2, gy, sw - 4, gh, 'nt4', 0.2); }
        shade(P, ox + sw, oy + oh - 2, Math.min(ow - sw, 6), 2, 0.4);
      }
      // 門鈴
      var sway = (st !== 'closed') ? (Math.floor(S.t * 10) % 2 ? 1 : -1) : 0;
      P.vl(x + Math.floor(w / 2), y + 2, 2, 'line'); P.rect(x + Math.floor(w / 2) - 1 + sway, y + 4, 3, 2, 'g'); P.px(x + Math.floor(w / 2) + sway, y + 6, 'y');
    }
  });
  def('window', {
    layer: 'wall',
    box: function (o) { return [o.x, o.y, o.w, o.h]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, w = o.w, h = o.h;
      street(P, x + 1, y + 1, w - 2, h - 2, S, o);
      if (o.feet) {   // 地下室：窗外是路人的腳
        var t = S.t, fx = x + 1 + Math.floor((t * 9) % (w + 10)) - 5, fy = y + h - 5;
        if (fx > x && fx < x + w - 4) { P.rect(fx, fy, 2, 3, 'nt0'); P.rect(fx + 3, fy + (Math.floor(t * 4) % 2), 2, 3, 'nt0'); }
      }
      P.frame(x, y, w, h, o.frame || 'wd1'); P.vl(x + Math.floor(w / 2), y, h, o.frame || 'wd1');
      if (o.bars) for (var i = x + 3; i < x + w - 1; i += 3) P.vl(i, y + 1, h - 2, 'mt1');
      P.dither(x + 1, y + 1, w - 2, h - 2, 'nt5', 0.08);
      P.hl(x - 1, y + h, w + 2, o.sill || 'wd4'); P.hl(x - 1, y + h + 1, w + 2, 'wd1');
    }
  });

  // ===================================================================== 牆上唱片架（每張都是熱點：點了看唱片資訊）
  function coverAt(P, S, id, x, y, size) {
    var cv = S.cover(id, size);
    if (cv) { P.img(cv, x, y); return; }
    var rnd = seeded(id || 'x'), a = pick(rnd, SPINE), b = pick(rnd, SPINE);
    P.rect(x, y, size, size, a); P.rect(x + 2, y + 2 + Math.floor(rnd() * (size - 5)), size - 4, 2, b);
  }
  def('wallRack', {
    layer: 'wall',
    box: function (o) { var c = o.cell || 10, g = o.gap == null ? 2 : o.gap, rg = o.rowGap == null ? 4 : o.rowGap; return [o.x, o.y, o.cols * (c + g) - g, o.rows * (c + rg) - rg + 2]; },
    draw: function (P, o, S) {
      var c = o.cell || 10, g = o.gap == null ? 2 : o.gap, rg = o.rowGap == null ? 4 : o.rowGap, recs = o.records || [];
      for (var r = 0; r < o.rows; r++) {
        var ry = o.y + r * (c + rg), lx = o.x - 2, lw = o.cols * (c + g) - g + 4;
        for (var k = 0; k < o.cols; k++) {
          var id = recs[r * o.cols + k]; var cx = o.x + k * (c + g);
          if (id === null) continue;
          shade(P, cx + 1, ry + 1, c, c, 0.4);   // 封面在牆上的影子
          coverAt(P, S, id, cx, ry, c);
        }
        // 架子（小木條）
        P.hl(lx, ry + c, lw, 'wd5'); P.hl(lx, ry + c + 1, lw, 'wd2'); shade(P, lx, ry + c + 2, lw, 1, 0.45);
      }
    },
    hots: function (o, S) {
      var c = o.cell || 10, g = o.gap == null ? 2 : o.gap, rg = o.rowGap == null ? 4 : o.rowGap, out = [];
      (o.records || []).forEach(function (id, i) {
        if (!id) return; var r = Math.floor(i / o.cols), k = i % o.cols;
        var cd = S.card(id);
        out.push({ id: (o.id || 'rack') + ':' + id, rect: [o.x + k * (c + g), o.y + r * (c + rg), c, c], label: cd ? cd.album : id, action: 'wall-record:' + id });
      });
      return out;
    }
  });
  def('nowPlaying', {   // 櫃檯後面牆上「正在放」的封面框（右上角的金色音符跟著拍子閃）
    layer: 'wall',
    box: function (o) { var c = o.cell || 12; return [o.x - 2, o.y - 2, c + 4, c + 4]; },
    draw: function (P, o, S) {
      var c = o.cell || 12, x = o.x, y = o.y;
      shade(P, x - 1, y - 1, c + 4, c + 4, 0.45);
      P.rect(x - 2, y - 2, c + 4, c + 4, 'line'); P.frame(x - 1, y - 1, c + 2, c + 2, 'wd3');
      coverAt(P, S, o.record, x, y, c);
      var on = S.state.playing && Math.floor(S.t * 2) % 2;
      P.rect(x + c - 3, y - 4, 5, 6, 'line'); P.text('♪', x + c - 2, y - 4 + (on ? 0 : 1), on ? 'y' : 'g');
    },
    hots: function (o, S) { var c = o.cell || 12, cd = S.card(o.record); return [{ id: 'now', rect: [o.x, o.y, c, c], label: '正在放：' + (cd ? cd.album : ''), action: 'wall-record:' + o.record }]; }
  });
  // ===================================================================== 海報、時鐘、喇叭、霓虹、吉他
  def('poster', {
    layer: 'wall',
    box: function (o) { return [o.x, o.y, o.w, o.h]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, w = o.w, h = o.h, rnd = seeded('po' + x + y);
      shade(P, x + 1, y + 1, w, h, 0.45);
      if (o.style === 'event') {   // 踢館公告：紙、紅色抬頭、字行、金色印章
        P.rect(x, y, w, h, 'pp2'); P.rect(x, y, w, 5, 'r'); if (o.title) P.text(o.title, x + Math.floor((w - P.textW(o.title)) / 2), y, 'w');
        for (var i = 0; i < Math.floor((h - 9) / 2); i++) P.hl(x + 1, y + 7 + i * 2, w - 2 - Math.floor(rnd() * 4), 'mt3');
        P.rect(x + w - 4, y + h - 4, 3, 3, 'g'); P.px(x + w - 3, y + h - 3, 'y');
      } else if (o.style === 'list') {
        P.rect(x, y, w, h, 'pp1'); for (var j = 0; j < Math.floor((h - 2) / 2); j++) P.hl(x + 1, y + 1 + j * 2, Math.floor((w - 2) * (0.5 + rnd() * 0.5)), j === 0 ? 'r' : 'mt2');
      } else {   // 演出海報
        var bg = o.bg || pick(rnd, ['#1f5fae', '#c11628', '#f0c75e', '#2e7d52', '#111111', '#6a3fa0']);
        P.rect(x, y, w, h, bg);
        var fg = o.fg || (bg === '#f0c75e' ? '#111111' : '#f6efe0');
        if (o.motif === 'circle') { P.ellipse(x + Math.floor(w / 2), y + Math.floor(h * 0.42), Math.floor(w * 0.3), Math.floor(w * 0.3), fg); P.px(x + Math.floor(w / 2), y + Math.floor(h * 0.42), bg); }
        else if (o.motif === 'bars') { for (var b = 0; b < 3; b++) P.rect(x + 1 + b * 2, y + 2 + b, 1, h - 7 - b, fg); }
        else { P.rect(x + 1, y + 2, w - 2, Math.floor(h * 0.45), fg); P.rect(x + 2, y + 3, w - 4, Math.floor(h * 0.45) - 2, bg); }
        P.hl(x + 1, y + h - 4, w - 2, fg); P.hl(x + 1, y + h - 2, Math.floor(w * 0.6), fg);
      }
      if (o.tape !== false) { P.px(x, y, 'rgba(255,250,230,0.8)'); P.px(x + w - 1, y, 'rgba(255,250,230,0.8)'); }
    }
  });
  def('clock', {
    layer: 'wall',
    box: function (o) { return [o.x, o.y, 7, 7]; },
    draw: function (P, o, S) {
      var cx = o.x + 3, cy = o.y + 3;
      P.rect(cx - 2, cy - 3, 5, 7, 'wd1'); P.rect(cx - 3, cy - 2, 7, 5, 'wd1');
      P.rect(cx - 2, cy - 2, 5, 5, 'pp2'); P.px(cx - 2, cy - 2, 'wd1'); P.px(cx + 2, cy - 2, 'wd1'); P.px(cx - 2, cy + 2, 'wd1'); P.px(cx + 2, cy + 2, 'wd1');
      var m = Math.floor(S.t / 2) % 4, dirs = [[0, -1, 0, -2], [1, 0, 2, 0], [0, 1, 0, 2], [-1, 0, -2, 0]];
      P.px(cx, cy - 1, 'line'); P.px(cx, cy, 'line'); P.px(cx + dirs[m][0], cy + dirs[m][1], 'r'); P.px(cx + dirs[m][2], cy + dirs[m][3], 'r');
    }
  });
  def('speaker', {
    box: function (o) { return [o.x, o.y, o.w || 7, o.h || 10]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, w = o.w || 7, h = o.h || 10, beat = S.state.playing && Math.floor(S.t * 4) % 2;
      shade(P, x + 1, y + 1, w, h, 0.45);
      P.box(x, y, w, h, 'mt1', 'mt0'); P.hl(x + 1, y + 1, w - 2, 'mt2');
      var cx = x + Math.floor(w / 2);
      P.ellipse(cx, y + 3, 1, 1, 'mt0'); P.ellipse(cx, y + h - 4, 2, 2, 'mt0'); P.px(cx, y + h - 4, beat ? 'mt4' : 'mt3'); P.px(cx, y + 3, 'mt3');
      if (o.bracket) { P.hl(x + 1, y + h, w - 2, 'mt2'); }
    }
  });
  def('neon', {
    layer: 'wall',
    box: function (o) { return [o.x - 3, o.y - 3, D.Painter(null, {}).textW(o.text) + 6, 11]; },
    draw: function (P, o, S) {
      var on = !(o.flicker && Math.floor(S.t * 7) % 23 === 0);
      var c = o.color || 'm', w = P.textW(o.text), glow = o.glow || 'rgba(231,84,128,0.28)';
      P.rect(o.x - 3, o.y - 3, w + 6, 11, '#0c0a10'); P.frame(o.x - 3, o.y - 3, w + 6, 11, 'mt1');
      if (!on) { P.text(o.text, o.x, o.y, '#4a2032'); return; }
      // 光暈：字往四方各偏一格畫半透明，再畫本體＋白芯
      [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (d) { P.text(o.text, o.x + d[0], o.y + d[1], glow); });
      P.text(o.text, o.x, o.y, c);
      P.ctx.globalAlpha = 0.45; P.text(o.text, o.x, o.y, 'w'); P.ctx.globalAlpha = 1;
    },
    lights: function (o) { return [{ x: o.x + o.text.length * 2, y: o.y + 12, rx: 22, ry: 14, power: 0.14 }]; }
  });
  def('goldDisc', {   // 牆上的金唱片框
    layer: 'wall',
    box: function (o) { return [o.x, o.y, 11, 13]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y; shade(P, x + 1, y + 1, 11, 13, 0.45);
      P.box(x, y, 11, 13, 'k', 'wd1'); P.ellipse(x + 5, y + 5, 4, 4, 'g'); P.ring(x + 5, y + 5, 3, 3, 'y'); P.px(x + 5, y + 5, 'k'); P.px(x + 3, y + 3, 'lt1');
      P.rect(x + 2, y + 10, 7, 2, 'pp1');
    }
  });
  def('guitar', {   // 橫掛的電吉他：琴身在左、琴頸往右
    layer: 'wall',
    box: function (o) { return [o.x, o.y, 22, 8]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, c = o.color || 'r';
      shade(P, x + 1, y + 1, 22, 8, 0.4);
      P.hl(x + 3, y - 1, 1, 'mt3'); P.hl(x + 17, y - 1, 1, 'mt3');   // 掛勾
      P.ellipse(x + 3, y + 4, 3, 3, c); P.ellipse(x + 7, y + 4, 2, 3, c); P.rect(x + 2, y + 2, 7, 5, c);
      P.rect(x + 3, y + 3, 4, 3, 'pp1'); P.vl(x + 5, y + 3, 3, 'line');
      P.px(x + 1, y + 2, 'rgba(255,255,255,0.4)');
      P.hl(x + 9, y + 3, 9, 'wd2'); P.hl(x + 9, y + 4, 9, 'wd3'); for (var f = x + 11; f < x + 18; f += 2) P.px(f, y + 3, 'mt4');
      P.rect(x + 18, y + 2, 4, 4, 'line'); P.px(x + 19, y + 2, 'mt4'); P.px(x + 21, y + 5, 'mt4');
    }
  });
  // ===================================================================== 櫃檯與上面的東西
  def('counter', {
    box: function (o) { return [o.x, o.y, o.w, o.h]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, w = o.w, h = o.h, top = o.top || 4;
      shade(P, x + 1, y + h, w, 2, 0.6);
      // 檯面
      P.rect(x, y, w, top, 'wd5'); P.hl(x, y, w, 'wd6'); P.hl(x, y + top - 1, w, 'wd4');
      // 正面
      P.rect(x, y + top, w, h - top, 'wd3'); P.hl(x, y + top, w, 'wd1');
      var pw = o.panel || 11;
      var ph = h - top - 4;
      for (var px = x + 2; px + pw <= x + w - 1; px += pw + 2) { P.frame(px, y + top + 1, pw, ph, 'wd2'); P.hl(px + 1, y + top + 2, pw - 2, 'wd4'); P.vl(px + 1, y + top + 2, ph - 2, 'wd4'); }
      P.rect(x, y + h - 2, w, 2, 'wd1');
      P.vl(x, y, h, 'wd0'); P.vl(x + w - 1, y, h, 'wd0'); P.hl(x, y + h - 1, w, 'wd0');
      // 招牌：黑底金字
      if (o.sign) { var tw = P.textW(o.sign), sx = x + Math.floor((w - tw) / 2) - 2, sy = y + top + Math.max(0, Math.floor((h - top - 9) / 2)); P.box(sx, sy, tw + 4, 7, 'line', 'wd0'); P.text(o.sign, sx + 2, sy + 1, 'y'); }
    }
  });
  def('register', {   // 黃銅收銀機
    box: function (o) { return [o.x, o.y, 10, 8]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y;
      P.rect(x + 1, y, 6, 3, 'g'); P.rect(x + 2, y + 1, 4, 1, 'gr4'); P.frame(x + 1, y, 6, 3, 'line');
      P.rect(x, y + 3, 10, 5, 'g'); P.frame(x, y + 3, 10, 5, 'line');
      P.hl(x + 1, y + 4, 8, 'y'); P.px(x + 2, y + 5, 'wd0'); P.px(x + 4, y + 5, 'wd0'); P.px(x + 6, y + 5, 'wd0'); P.px(x + 8, y + 5, 'r');
      P.hl(x + 1, y + 6, 8, 'wd2');
    }
  });
  def('turntable', {
    box: function (o) { return [o.x, o.y, 15, 6]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, playing = S.state.playing;
      P.rect(x, y + 2, 15, 4, 'wd2'); P.hl(x, y + 2, 15, 'wd4'); P.frame(x, y + 1, 15, 5, 'line');
      P.rect(x + 1, y + 1, 13, 2, 'mt2');
      P.ellipse(x + 6, y + 2, 5, 1, 'k'); P.px(x + 6, y + 2, 'r'); P.px(x + 5, y + 2, 'r');
      var f = playing ? Math.floor(S.t * 6) % 4 : 0, sh = [[x + 3, y + 1], [x + 9, y + 1], [x + 9, y + 3], [x + 3, y + 3]][f];
      P.px(sh[0], sh[1], 'mt3');
      P.vl(x + 13, y, 2, 'mt4'); P.hl(x + 10, y + 1 + (playing ? 1 : 0), 3, 'mt4');
      P.px(x + 13, y + 4, playing ? 'gr4' : 'r');
    }
  });
  def('deskLamp', {
    box: function (o) { return [o.x, o.y, 6, 8]; },
    draw: function (P, o, S) { var x = o.x, y = o.y; P.rect(x, y, 6, 2, o.color || 'gr1'); P.hl(x, y, 6, 'gr3'); P.px(x + 2, y + 2, 'lt1'); P.px(x + 3, y + 2, 'lt1'); P.vl(x + 3, y + 3, 4, 'g'); P.hl(x + 1, y + 7, 5, 'g'); },
    lights: function (o) { return [{ x: o.x + 3, y: o.y + 6, rx: 12, ry: 6, power: 0.22 }]; }
  });
  def('mug', { box: function (o) { return [o.x, o.y, 3, 3]; }, draw: function (P, o) { P.rect(o.x, o.y, 2, 3, 'pp2'); P.px(o.x + 2, o.y + 1, 'pp2'); P.hl(o.x, o.y, 2, 'wd2'); } });

  // ===================================================================== 唱片箱（前面的唱片露出封面上緣）
  // 唱片箱（地上的木箱／黑色牛奶箱）：箱口露出一排直立的唱片書背，跟小人同一個格子（箱高 7、書背再高 3–5）。
  // 標籤直接寫在箱子正面（木箱＝字、牛奶箱＝貼一張紙），不再用比箱子還大的牌子。
  // o: x, y＝箱子正面上緣；w；h（正面高，預設 7）；label；style 'wood'|'milk'；wood／ink／plate；genre 'jazz'|'tw'|'noise'|陣列；tab＝分類卡顏色
  var SPINE_SET = {
    jazz: ['#1d3b70', '#2b5aa8', '#111111', '#e8e2cc', '#d97a2b', '#3a3a44', '#6f8fbf', '#c9b98a', '#1f5fae', '#f0c75e', '#24242c', '#9db3d6'],
    tw: ['#2e7d52', '#c11628', '#e8e2cc', '#8a5730', '#f0c75e', '#3a6e5a', '#d9ccb0', '#6a3fa0', '#b5462a', '#111111', '#4ea468', '#e0851c'],
    noise: ['#111111', '#2b2b2b', '#4a4a4a', '#e8e8ee', '#c11628', '#e75480', '#83838e', '#111111', '#1f1f24', '#f0c75e', '#5a5a64'],
    new: ['#e8e2cc', '#c11628', '#1f5fae', '#111111', '#f0c75e', '#2e7d52', '#e0851c', '#6a3fa0', '#d9ccb0']
  };
  function lighten(hex, k) { if (hex.charAt(0) !== '#') return hex; var n = parseInt(hex.slice(1), 16), r = n >> 16 & 255, g = n >> 8 & 255, b = n & 255; r = Math.round(r + (255 - r) * k); g = Math.round(g + (255 - g) * k); b = Math.round(b + (255 - b) * k); return 'rgb(' + r + ',' + g + ',' + b + ')'; }
  function spines(P, x0, x1, yBot, yBack, rnd, set, o) {   // 一排擠在一起的唱片書背：同一張 LP 一樣高，偶爾一張被抽高一點
    var prev = -1;
    for (var i = x0; i <= x1; i++) {
      var k = Math.floor(rnd() * set.length); if (k === prev) k = (k + 1) % set.length; prev = k;
      var col = set[k], r = rnd(), top = yBack - (o.min || 3) - (r < 0.18 ? 1 : 0) - (r > 0.94 ? 2 : 0);
      P.vl(i, top, yBot - top, col); P.px(i, top, lighten(col, 0.4));
      if (rnd() < 0.22) P.vl(i, top + 2, yBot - top - 2, 'rgba(10,6,4,0.28)');   // 書背之間的陰影
    }
  }
  def('crate', {
    box: function (o) { return [o.x, o.y - 9, o.w || 16, (o.h || 7) + 9]; },
    base: function (o) { return o.y + (o.h || 7); },
    draw: function (P, o, S) {
      var poked = o.id && S.state.poke && S.state.poke[o.id] > S.state.rt && !S.mask;
      var x = o.x, y = o.y, w = o.w || 16, h = o.h || 7, rnd = seeded('bin' + (o.id || x) + (poked ? Math.floor(S.t * 6) : ''));
      var set = Array.isArray(o.genre) ? o.genre : (SPINE_SET[o.genre] || SPINE_SET.jazz), milk = o.style === 'milk';
      var dark = milk ? 'mt0' : (o.woodDark || 'wd1'), D = 3;
      shade(P, x + 1, y + h, w, 1, 0.65); shade(P, x + w, y + 1, 1, h, 0.35);
      // 箱子後牆與兩側上緣（被唱片擋住，縫裡看得到）
      P.hl(x, y - D, w, dark); P.vl(x, y - D, D, dark); P.vl(x + w - 1, y - D, D, dark);
      P.rect(x + 1, y - D + 1, w - 2, D - 1, milk ? 'mt1' : 'wd2');
      spines(P, x + 1, x + w - 2, y - 1, y - D + 1, rnd, set, o);
      // 分類卡（一張比唱片高一點的硬卡，顏色＝分區）
      if (o.tab) { var tx = x + 2 + (o.tabAt || 0); P.rect(tx, y - D - 4, 3, 5, 'pp2'); P.hl(tx, y - D - 4, 3, o.tab); P.vl(tx + 2, y - D - 3, 4, 'pp0'); }
      // 正面
      if (milk) {   // 黑色塑膠牛奶箱：上下兩排透氣孔，中間一條白漆字
        P.rect(x, y, w, h, 'mt0'); P.hl(x, y, w, 'mt2'); P.hl(x, y + h - 1, w, 'line');
        (h >= 9 ? [y + 1, y + h - 2] : [y + h - 2]).forEach(function (gy) { for (var gx = x + 2; gx < x + w - 2; gx += 3) P.rect(gx, gy, 2, 1, 'mt1'); });
        P.vl(x, y, h, 'line'); P.vl(x + w - 1, y, h, 'line');
      } else {
        var wood = o.wood || 'wd3';
        P.rect(x, y, w, h, wood); P.hl(x, y, w, o.woodHi || 'wd5'); P.hl(x + 1, y + 3, w - 2, 'rgba(30,16,8,0.18)');
        P.hl(x, y + h - 1, w, dark); P.vl(x, y, h, dark); P.vl(x + w - 1, y, h, dark);
        P.px(x + 1, y + 1, 'mt3'); P.px(x + w - 2, y + 1, 'mt3');   // 釘子
      }
      if (o.label) {
        var tw = P.textW(o.label), lx = x + Math.floor((w - tw) / 2), ly = (milk && h < 9) ? y : y + Math.floor((h - 7) / 2);
        if (o.plate) { P.rect(lx - 1, ly - 1 + 1, tw + 2, 6, o.plate); P.hl(lx - 1, ly + 6, tw + 2, 'rgba(0,0,0,0.3)'); P.text(o.label, lx, ly + 1, o.ink || 'line'); }
        else P.text(o.label, lx, ly + 1, o.ink || 'pp2');
      }
    }
  });
  def('bench', {   // 唱片箱底下的矮台
    box: function (o) { return [o.x, o.y, o.w, o.h]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, w = o.w, h = o.h;
      shade(P, x + 1, y + h, w, 2, 0.6);
      P.rect(x, y, w, 2, 'wd4'); P.hl(x, y, w, 'wd5'); P.hl(x, y + 2, w, 'wd1');
      for (var lx = x + 1; lx < x + w - 1; lx += Math.max(8, Math.floor((w - 2) / 3))) P.rect(lx, y + 3, 2, h - 3, 'wd1');
      P.rect(x + w - 3, y + 3, 2, h - 3, 'wd1');
      P.hl(x + 1, y + h - 2, w - 2, 'wd2');
    }
  });
  def('box', {   // 紙箱：新到貨（打開的紙箱，露出一排書背，正面蓋紅字）
    box: function (o) { return [o.x - 2, o.y - 7, (o.w || 14) + 4, (o.h || 7) + 7]; },
    base: function (o) { return o.y + (o.h || 7); },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, w = o.w || 14, h = o.h || 7, rnd = seeded('bx' + x);
      shade(P, x + 1, y + h, w, 1, 0.65);
      P.hl(x, y - 2, w, 'wd3'); P.rect(x + 1, y - 1, w - 2, 1, 'wd2');
      spines(P, x + 1, x + w - 2, y - 1, y - 1, rnd, SPINE_SET.new, { min: 2, var: 2 });
      P.rect(x, y, w, h, 'wd5'); P.hl(x, y, w, 'wd6'); P.hl(x, y + h - 1, w, 'wd3'); P.vl(x, y, h, 'wd3'); P.vl(x + w - 1, y, h, 'wd3');
      P.vl(x + Math.floor(w / 2), y + 1, h - 2, 'rgba(120,80,40,0.25)');   // 膠帶
      // 翻開的蓋子
      P.rect(x - 2, y - 3, 3, 2, 'wd5'); P.px(x - 2, y - 3, 'wd6'); P.rect(x + w - 1, y - 3, 3, 2, 'wd4');
      if (o.label) P.text(o.label, x + Math.floor((w - P.textW(o.label)) / 2), y + 1, o.ink || 'r');
    }
  });

  // ===================================================================== 試聽機
  def('booth', {
    box: function (o) { return [o.x, o.y, o.w, o.h]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, w = o.w, h = o.h, dy = o.deskY || (y + h - 8);
      // 牆上的吸音板
      P.rect(x, y, w, dy - y, o.panel || '#3a2a48');
      for (var j = y + 1; j < dy - 1; j += 3) for (var i = x + 1 + ((j - y) % 2) * 1; i < x + w - 1; i += 3) P.px(i, j, '#4e3a60');
      P.frame(x, y, w, dy - y, 'line');
      // 招牌
      if (o.sign) { var tw = P.textW(o.sign); P.rect(x + Math.floor((w - tw) / 2) - 2, y + 2, tw + 4, 7, 'line'); P.text(o.sign, x + Math.floor((w - tw) / 2), y + 3, Math.floor(S.t * 1.5) % 6 ? 'c' : '#1d6a78'); }
      // 耳機掛勾（兩副）
      [x + 6, x + w - 10].forEach(function (hx, k) {
        var hy = y + 12; P.px(hx + 2, hy - 1, 'mt3');
        P.hl(hx + 1, hy, 3, 'mt0'); P.px(hx, hy + 1, 'mt0'); P.px(hx + 4, hy + 1, 'mt0');
        P.rect(hx - 1, hy + 2, 2, 3, k ? 'r' : 'b'); P.rect(hx + 4, hy + 2, 2, 3, k ? 'r' : 'b');
      });
      // 桌子
      P.rect(x - 1, dy, w + 2, 2, 'wd5'); P.hl(x - 1, dy, w + 2, 'wd6'); P.rect(x - 1, dy + 2, w + 2, y + h - dy - 2, 'wd2'); P.hl(x - 1, dy + 2, w + 2, 'wd0');
      P.frame(x + 1, dy + 3, w - 2, y + h - dy - 4, 'wd1');
      shade(P, x, y + h, w + 1, 1, 0.6);
      // 桌上的小唱機（轉）
      var tx = x + Math.floor(w / 2) - 4, ty = dy - 3;
      P.rect(tx, ty, 9, 3, 'mt1'); P.hl(tx, ty, 9, 'mt3'); P.ellipse(tx + 4, ty + 1, 3, 0, 'k'); P.px(tx + 4, ty + 1, Math.floor(S.t * 4) % 2 ? 'r' : 'y');
    },
    lights: function (o) { return [{ x: o.x + o.w / 2, y: o.y + 6, rx: 16, ry: 10, power: 0.1 }]; }
  });
  def('stool', {
    box: function (o) { return [o.x, o.y, 7, 7]; },
    draw: function (P, o, S) { var x = o.x, y = o.y; shade(P, x, y + 7, 7, 1, 0.6); P.ellipse(x + 3, y + 1, 3, 1, o.color || 'r'); P.hl(x + 1, y, 5, 'rgba(255,255,255,0.3)'); P.vl(x + 1, y + 2, 5, 'mt2'); P.vl(x + 5, y + 2, 5, 'mt2'); P.vl(x + 3, y + 2, 5, 'mt1'); P.hl(x + 1, y + 5, 5, 'mt1'); }
  });

  // ===================================================================== 地毯（黑膠唱片形狀：對決就站在這張唱片的兩邊）
  def('rug', {
    layer: 'floor',
    box: function (o) { return [o.x - o.rx, o.y - o.ry, o.rx * 2 + 1, o.ry * 2 + 1]; },
    draw: function (P, o, S) {
      var cx = o.x, cy = o.y, rx = o.rx, ry = o.ry;
      if (o.style === 'stripe') {
        var x = cx - rx, y = cy - ry, w = rx * 2, h = ry * 2;
        P.rect(x, y, w, h, o.a || 'r'); for (var i = 2; i < h - 2; i += 3) P.hl(x + 2, y + i, w - 4, o.b || 'y'); P.frame(x, y, w, h, 'wd1');
        for (var f = x; f < x + w; f += 2) { P.px(f, y - 1, 'pp1'); P.px(f, y + h, 'pp1'); }
        return;
      }
      P.ellipse(cx, cy + 1, rx, ry, 'rgba(0,0,0,0.35)');
      P.ellipse(cx, cy, rx, ry, 'mt0');
      for (var k = 2; k < rx * 0.62; k += 2) P.ring(cx, cy, rx - k, Math.max(1, Math.round((rx - k) * ry / rx)), 'mt1');
      P.ellipse(cx, cy, Math.round(rx * 0.3), Math.round(ry * 0.3), o.label || 'r');
      P.ring(cx, cy, Math.round(rx * 0.3), Math.round(ry * 0.3), 'g');
      P.hl(cx - 2, cy - 1, 5, 'pp2'); P.px(cx, cy, 'mt0');
      // 反光
      P.dither(cx - Math.round(rx * 0.75), cy - Math.round(ry * 0.6), Math.round(rx * 0.4), 2, 'mt3', 0.35);
    }
  });
  def('mat', { layer: 'floor', box: function (o) { return [o.x, o.y, o.w, o.h]; }, draw: function (P, o) { P.rect(o.x, o.y, o.w, o.h, o.color || '#3a2a20'); P.frame(o.x, o.y, o.w, o.h, '#2a1c14'); P.hl(o.x + 2, o.y + Math.floor(o.h / 2), o.w - 4, o.stripe || 'g'); } });

  // ===================================================================== 盆栽、燈、貓
  def('plant', {
    box: function (o) { return [o.x, o.y, 14, 20]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, sw = Math.floor(S.t / 1.4) % 2;
      shade(P, x + 3, y + 20, 9, 1, 0.6);
      // 葉子（龜背芋）
      var leaves = [[3, 6, 4, 3, 'gr2'], [10, 5, 4, 3, 'gr3'], [6, 3, 3, 2, 'gr3'], [2, 10, 3, 2, 'gr1'], [11, 10, 3, 2, 'gr2'], [7, 8, 4, 3, 'gr2']];
      leaves.forEach(function (l, i) { var dx = (i % 3 === 0 && sw) ? 1 : 0; P.ellipse(x + l[0] + dx, y + l[1], l[2], l[3], l[4]); P.hl(x + l[0] - l[2] + 1 + dx, y + l[1], l[2] * 2 - 1, 'gr1'); P.px(x + l[0] + dx - 1, y + l[1] - 1, 'gr4'); });
      P.vl(x + 7, y + 8, 6, 'gr1');
      // 盆
      P.rect(x + 3, y + 13, 9, 2, 'wd4'); P.rect(x + 4, y + 15, 7, 5, 't'); P.vl(x + 4, y + 15, 5, 'u'); P.hl(x + 3, y + 13, 9, 'wd5'); P.frame(x + 3, y + 13, 9, 2, 'wd1');
    }
  });
  def('lamp', {
    layer: 'ceiling',
    box: function (o) { return [o.x - 4, 0, 9, o.y + 4]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y;
      P.vl(x, 4, y - 4, 'line');
      P.rect(x - 3, y, 7, 2, o.color || 'mt0'); P.rect(x - 4, y + 2, 9, 1, o.color || 'mt0'); P.hl(x - 2, y, 3, 'mt2');
      P.hl(x - 1, y + 3, 3, 'lt1'); P.px(x, y + 4, 'lt0');
    },
    lights: function (o) { return [{ x: o.x, y: o.y + 6, rx: 34, ry: 26, power: 0.32 }, { x: o.x, y: o.y + 92, rx: 40, ry: 14, power: 0.22 }]; }
  });
  def('floorLamp', {
    box: function (o) { return [o.x - 4, o.y, 9, 26]; },
    draw: function (P, o, S) { var x = o.x, y = o.y; shade(P, x - 2, y + 26, 5, 1, 0.6); P.rect(x - 3, y, 7, 4, o.color || 'pp1'); P.hl(x - 3, y + 4, 7, 'lt0'); P.vl(x, y + 5, 20, 'mt1'); P.hl(x - 2, y + 25, 5, 'mt1'); },
    lights: function (o) { return [{ x: o.x, y: o.y + 6, rx: 22, ry: 18, power: 0.26 }]; }
  });
  // 貓：C 毛色、L 淺色、E 眼睛
  var CAT = {
    loaf: ['.C.C......', '.CCC......', 'CECEC.....', 'CCCCCCCCC.', 'CLLCCCCCCC', '.CCCCCCCCC'],
    loafB: ['.C.C......', '.CCC......', 'C-C-C.....', 'CCCCCCCCC.', 'CLLCCCCCCC', '.CCCCCCCCC'],
    sit: ['C...C...', 'CC.CC...', 'CCCCC...', 'ECCEC...', 'CCCCC...', '.CLC..C.', 'CCLCC.C.', 'CCLCCC..', 'CCCCC...']
  };
  def('cat', {
    box: function (o) { return o.pose === 'sit' ? [o.x, o.y - 9, 8, 9] : [o.x, o.y - 6, 10, 6]; },
    base: function (o) { return o.y; },
    draw: function (P, o, S) {
      var t = S.t, col = o.color || 'o', light = o.light || 'y';
      var poked = o.id && S.state.poke && S.state.poke[o.id] > S.state.rt && !S.mask;   // 被點：抬頭睜眼、尾巴甩快一點
      var pose = o.pose === 'sit' ? CAT.sit : ((poked || Math.floor(t / 0.25) % 16 === 0) ? CAT.loaf : CAT.loafB);
      var h = pose.length, x = o.x, y = o.y - h;
      for (var j = 0; j < h; j++) for (var i = 0; i < pose[j].length; i++) {
        var ch = pose[j].charAt(i); if (ch === '.') continue;
        P.px(x + i, y + j, ch === 'C' ? col : ch === 'L' ? light : ch === 'E' ? 'gr4' : ch === '-' ? 'line' : col);
      }
      // 尾巴：每兩秒甩一下
      var flick = poked ? Math.floor(t * 8) % 2 === 0 : Math.floor(t * 5) % 10 < 2;
      if (o.pose !== 'sit') { P.px(x + 10, y + h - 2 - (flick ? 1 : 0), col); P.px(x + 10, y + h - 1, col); }
      P.px(x + 1, y + 1, 'line'); P.px(x + 3, y + 1, 'line');   // 耳朵內側
      if (o.pose !== 'sit' && !poked) { var zz = Math.floor(t * 1.2) % 3; if (zz) { P.px(x + 4 + zz, y - 2 - zz, 'pp2'); P.px(x + 5 + zz, y - 2 - zz, 'pp2'); } }
      if (poked) { P.px(x + 2, y - 3, 'pp2'); P.px(x + 2, y - 2, 'pp2'); P.px(x + 2, y, 'pp2'); }   // 「！」
    }
  });

  // ===================================================================== 地下室用：鐵架唱片櫃、樓梯、販賣看板
  def('shelf', {
    box: function (o) { return [o.x, o.y, o.w, o.h]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, w = o.w, h = o.h, rows = o.rows || 3, rnd = seeded('sh' + x + y), fr = o.frame || 'mt2';
      shade(P, x + 1, y + h, w, 1, 0.6);
      P.rect(x, y, w, h, o.back || '#262028');
      var rh = Math.floor((h - 2) / rows);
      var faces = o.faces || [];
      for (var r = 0; r < rows; r++) {
        var ry = y + 1 + r * rh, cx = x + 2, fi = 0;
        while (cx < x + w - 2) {
          var face = faces[r] && cx > x + 4 && fi === 0 && rnd() < 0.45;
          if (face && cx + 9 < x + w - 1) { var id = faces[r]; var cv = S.cover(id, 8); if (cv) P.img(cv, cx, ry + rh - 10); else P.rect(cx, ry + rh - 10, 8, 8, pick(rnd, SPINE)); cx += 9; fi = 1; continue; }
          var sw = rnd() < 0.7 ? 1 : 2, sh = rh - 3 - Math.floor(rnd() * 2);
          P.rect(cx, ry + rh - 2 - sh, sw, sh, pick(rnd, SPINE)); cx += sw;
          if (rnd() < 0.12) cx += 1;
        }
        P.hl(x, ry + rh - 2, w, fr); P.hl(x, ry + rh - 1, w, 'mt0');
      }
      P.vl(x, y, h, fr); P.vl(x + w - 1, y, h, fr); P.hl(x, y, w, fr);
    }
  });
  def('stairs', {
    layer: 'wall',
    box: function (o) { return [o.x, o.y, o.w, o.h]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, w = o.w, h = o.h, n = o.steps || 6, sh = Math.floor(h / n);
      P.rect(x, y, w, h, 'nt1'); P.dither(x, y, w, 8, 'lt0', 0.25);
      for (var i = 0; i < n; i++) { var sy = y + h - (i + 1) * sh, sx = x + i * 2; P.rect(sx, sy, w - i * 2, sh, i % 2 ? '#4a4a52' : '#55555e'); P.hl(sx, sy, w - i * 2, '#7a7a84'); }
      P.frame(x - 1, y - 1, w + 2, h + 1, 'line'); P.vl(x + w - 2, y, h, 'mt3');
      S.drawOutside(P, [x, y, w, h]);
    }
  });
  def('aboard', {   // 立牌
    box: function (o) { return [o.x, o.y, 9, 12]; },
    draw: function (P, o, S) { var x = o.x, y = o.y; shade(P, x, y + 12, 10, 1, 0.6); P.rect(x, y, 9, 10, 'wd2'); P.rect(x + 1, y + 1, 7, 8, '#22302a'); P.vl(x + 1, y + 10, 2, 'wd2'); P.vl(x + 7, y + 10, 2, 'wd2'); if (o.text) P.text(o.text, x + 1, y + 2, 'pp2'); P.hl(x + 2, y + 7, 5, 'y'); }
  });
  def('amp', {   // 音箱（地下室的「櫃檯」旁）
    box: function (o) { return [o.x, o.y, o.w || 12, o.h || 10]; },
    draw: function (P, o, S) { var x = o.x, y = o.y, w = o.w || 12, h = o.h || 10; shade(P, x + 1, y + h, w, 1, 0.6); P.box(x, y, w, h, 'mt0', 'line'); P.rect(x + 1, y + 1, w - 2, 2, 'g'); for (var i = 0; i < 4; i++) P.px(x + 2 + i * 2, y + 1, 'mt0'); P.dither(x + 1, y + 4, w - 2, h - 5, 'mt2', 0.5); P.hl(x + 1, y + h - 1, w - 2, 'mt1'); }
  });
})();

/* ===================================================================== 台北市大地圖（同一支渲染器，換一份 JSON） */
(function () {
  'use strict';
  var D = window.DipShop, def = D.defProp, seeded = D.seeded;
  function line(P, pts, c, wdt) {   // 方形筆刷的 Bresenham 折線
    wdt = wdt || 1;
    for (var i = 0; i + 1 < pts.length; i++) {
      var x0 = pts[i][0], y0 = pts[i][1], x1 = pts[i + 1][0], y1 = pts[i + 1][1];
      var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1, dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1, err = dx + dy;
      for (;;) { P.rect(x0 - (wdt >> 1), y0 - (wdt >> 1), wdt, wdt, c); if (x0 === x1 && y0 === y1) break; var e2 = 2 * err; if (e2 >= dy) { err += dy; x0 += sx; } if (e2 <= dx) { err += dx; y0 += sy; } }
    }
  }
  def('wall:none', { draw: function () {} });
  def('floor:none', { draw: function () {} });
  def('mapBase', {
    layer: 'floor',
    box: function (o) { return [0, 0, o.w, o.h]; },
    draw: function (P, o, S) {
      var W = o.w, H = o.h, rnd = seeded('map');
      P.rect(0, 0, W, H, o.land || '#e9e2d0');
      // 街廓：淺色方塊＋白色馬路
      for (var y = 2; y < H; y += 9) for (var x = 2 + ((y / 9) % 2) * 3; x < W; x += 11) {
        P.rect(x, y, 9, 7, rnd() < 0.15 ? '#ddd3bd' : '#e2dac6'); if (rnd() < 0.35) P.px(x + 2 + Math.floor(rnd() * 5), y + 2 + Math.floor(rnd() * 3), '#cfc4aa');
      }
      (o.hills || []).forEach(function (h) { P.ellipse(h[0], h[1], h[2], h[3], '#9cc48a'); P.ellipse(h[0] - 2, h[1] - 1, Math.max(1, h[2] - 4), Math.max(1, h[3] - 3), '#86b676'); });
      (o.parks || []).forEach(function (p) { P.rect(p[0], p[1], p[2], p[3], '#8fc07e'); P.frame(p[0], p[1], p[2], p[3], '#5f9a58'); for (var k = 0; k < 4; k++) P.px(p[0] + 1 + Math.floor(rnd() * (p[2] - 2)), p[1] + 1 + Math.floor(rnd() * (p[3] - 2)), '#4e8a4c'); });
      (o.rivers || []).forEach(function (r) { line(P, r.pts, '#7fb2d8', r.w || 5); line(P, r.pts, '#a8cde8', 1); });
      (o.roads || []).forEach(function (r) { line(P, r, '#fbf6ea', 2); });
      (o.mrt || []).forEach(function (m) { line(P, m.pts, m.color, 2); (m.stations || []).forEach(function (s) { P.rect(s[0] - 1, s[1] - 1, 3, 3, '#ffffff'); P.frame(s[0] - 1, s[1] - 1, 3, 3, m.color); }); });
    }
  });
  def('tower101', {
    box: function (o) { return [o.x - 3, o.y - 22, 7, 23]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y; P.rect(x - 3, y - 1, 7, 2, 'rgba(0,0,0,0.2)');
      for (var i = 0; i < 6; i++) { var yy = y - 4 - i * 3; P.rect(x - 2, yy, 5, 3, i % 2 ? '#6f9a8a' : '#5f8a7a'); P.hl(x - 3, yy, 7, '#4a7364'); }
      P.rect(x - 2, y - 3, 5, 3, '#5f8a7a'); P.vl(x, y - 22, 4, '#4a7364'); P.px(x, y - 23, Math.floor(S.t * 2) % 2 ? 'r' : 'y');
    }
  });
  def('pin', {   // 店家圖釘：黑膠唱片頭；鎖住的是灰色問號
    box: function (o) { return [o.x - 4, o.y - 12, 9, 13]; },
    base: function (o) { return o.y; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, lock = o.locked, hop = (!lock && o.current && Math.floor(S.t * 3) % 2) ? 1 : 0;
      P.rect(x - 2, y, 5, 1, 'rgba(0,0,0,0.3)');
      var cy = y - 8 - hop;
      P.vl(x, cy + 3, 5 - (hop ? 0 : 0), 'line');
      P.ellipse(x, cy, 4, 4, lock ? 'mt2' : 'k'); P.ring(x, cy, 3, 3, lock ? 'mt3' : 'mt1');
      if (lock) { P.text('?', x - 1, cy - 2, 'mt5'); }
      else { P.rect(x - 1, cy - 1, 3, 3, o.color || 'r'); P.px(x, cy, 'pp2'); }
      if (o.cleared) P.px(x + 3, cy - 4, 'y');
    }
  });
})();
