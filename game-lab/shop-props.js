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

/* props-b.js：route B「混搭・沿用初版牆面」的前景道具。
 * 背景（牆、封面、地板、門洞）沿用初版描圖 art/shop2-bg.jpg（邏輯 448×492）；這裡只畫前景，而且畫在同一個 448×492 格子上：
 * 1 場景像素 = 初版描圖的 1 個像素（原圖 2.5 px）。初版的畫風＝平塗＋1 px 深色描邊＋一條亮邊，少量木紋，不用大面積網點。
 * 比例：小人一格 = 5 場景像素（人高 70）；櫃檯面 38、桌面離地 22、桌上木箱連唱片 34、桌下黑籃 16、唱盤台 34。
 */
(function () {
  'use strict';
  var DS = window.DipShop, def = DS.defProp, seeded = DS.seeded;

  // ---------------------------------------------------------------- 色票（取樣自初版描圖）
  var C = {
    ol: '#2a1608', olS: '#1a0f08',
    // 櫃檯（初版 fg-back：檯面 130,84,58、唇 72,35,18、檯身 90,54,31）
    ctTopHi: '#a06c47', ctTop: '#86573a', ctTopLo: '#734a30', ctLip: '#48230f', ctFace: '#5a3620', ctFaceLo: '#4b2c19', ctFaceHi: '#6b4329', ctKick: '#3a2112',
    // 折疊長桌（淺色櫸木桌面、深色金屬腳）
    tbHi: '#e6c48e', tb: '#d3ab72', tbLo: '#b98d57', tbEdge: '#8e6435', tbEdgeLo: '#6e4a26', mtl: '#2a2a30', mtlHi: '#4a4a54', mtlLo: '#16161a',
    // 木箱
    crHi: '#d6a066', cr: '#b88048', crLo: '#97632f', crSeam: '#6e441d', crIn: '#3a2412',
    // 黑色塑膠籃
    mk: '#202026', mkHi: '#3a3a44', mkLo: '#121216', mkHole: '#08080a',
    // 唱盤台
    whHi: '#fffaf0', wh: '#efe5cf', whLo: '#d2c6aa', whLo2: '#b3a688',
    bkHi: '#5c5c68', bk: '#3a3a44', bkLo: '#26262d', bkLo2: '#18181d',
    sv: '#c9c9d2', svLo: '#8e8e99', svHi: '#eeeef4', vin: '#141417', vinG: '#2a2a31', vinHi: '#4a4a55',
    // 喇叭、收銀機
    spk: '#2c2c33', spkLo: '#1a1a1f', spkHi: '#4c4c56', cone: '#55555f', coneLo: '#3a3a42',
    // 地毯（唱片形）
    rug: '#1f1f25', rugG: '#2d2d35', rugHi: '#3b3b45', rugLb: '#e6dcc4', rugLbLo: '#c8bb9c',
    // 紙、標籤
    pp: '#f3ead6', ppLo: '#d9cdb0', ink: '#2a1608',
    gold: '#f0c75e', goldLo: '#b8860b', red: '#c11628', blue: '#1f5fae', purple: '#6a3fa0', green: '#2e7d52'
  };
  var ATTR = { c: '#1f5fae', o: '#6a3fa0', h: '#c11628' };   // 經、冷、硬（圓標色）

  function shadow(P, x, y, w, h, a) { P.rect(x, y, w, h, 'rgba(26,12,4,' + (a == null ? 0.35 : a) + ')'); }
  function box(P, x, y, w, h, fill, line) { P.rect(x, y, w, h, fill); if (line) P.frame(x, y, w, h, line); }
  // 封面：真封面（cards.js 的 localCover／coverUrl，?px=1 CORS 讀進來縮成 size 格）；還沒載到就畫一塊暗色＋細框
  function cover(P, S, id, x, y, size, o) {
    o = o || {};
    var cv = id && S.cover ? S.cover(id, size) : null;
    if (cv) {
      if (o.clipH != null) P.ctx.drawImage(cv, 0, 0, size, Math.min(size, o.clipH), x, y, size, Math.min(size, o.clipH));
      else P.img(cv, x, y, size, size);
      return true;
    }
    if (S.mask) { P.rect(x, y, size, o.clipH != null ? Math.min(size, o.clipH) : size, '#000'); return false; }
    var h = o.clipH != null ? Math.min(size, o.clipH) : size, rnd = seeded(id || 'x');
    var base = ['#3a3048', '#5a2a22', '#24405a', '#4a4a2a', '#2a4a3a', '#6a5a3a'][Math.floor(rnd() * 6)];
    P.rect(x, y, size, h, base);
    for (var i = 0; i < 4; i++) P.rect(x + 2 + Math.floor(rnd() * (size - 8)), y + 2 + Math.floor(rnd() * Math.max(1, h - 6)), 3 + Math.floor(rnd() * 5), 2, 'rgba(255,255,255,0.18)');
    return false;
  }
  // 高解析封面（shop.js 的 hires 層，直接畫在裝置像素上）：影子＋細框＋原圖平滑縮小。原圖還沒載到就先用像素封面墊著。
  function hiCover(V, S, id, x, y, size, o) {
    o = o || {};
    var c = V.ctx, k = V.k, X = V.X(x), Y = V.Y(y), Z = size * k;
    c.fillStyle = 'rgba(26,12,4,' + (o.shadow == null ? 0.32 : o.shadow) + ')'; c.fillRect(X + 2 * k, Y + 2 * k, Z, Z);
    if (o.frame !== false) { c.fillStyle = o.frame || '#e9dcc0'; c.fillRect(X - k, Y - k, Z + 2 * k, Z + 2 * k); }
    var img = S.coverImg(id);
    if (img) {
      var iw = img.naturalWidth, ih = img.naturalHeight, sq = Math.min(iw, ih);
      c.imageSmoothingEnabled = true; c.imageSmoothingQuality = 'high';
      c.drawImage(img, (iw - sq) / 2, (ih - sq) / 2, sq, sq, X, Y, Z, Z);
    } else {
      var px = S.cover(id, size);
      c.imageSmoothingEnabled = false;
      if (px) c.drawImage(px, X, Y, Z, Z); else { c.fillStyle = '#2a2430'; c.fillRect(X, Y, Z, Z); }
    }
    c.fillStyle = 'rgba(255,255,255,0.16)'; c.fillRect(X, Y, Z, Math.max(1, Math.round(k * 0.6)));
    c.fillStyle = 'rgba(0,0,0,0.18)'; c.fillRect(X, Y + Z - Math.max(1, Math.round(k * 0.6)), Z, Math.max(1, Math.round(k * 0.6)));
  }
  // 頂層高解析封面（只畫看得到的上半截 clipH；沒載到就不蓋，留世界格的像素版）
  function hiCoverTop(V, S, id, x, y, size, clipH, dim) {
    var img = S.coverImg(id); if (!img) return;
    var c = V.ctx, k = V.k, iw = img.naturalWidth, ih = img.naturalHeight, sq = Math.min(iw, ih), ch = clipH == null ? size : Math.min(size, clipH);
    c.imageSmoothingEnabled = true; c.imageSmoothingQuality = 'high';
    c.drawImage(img, (iw - sq) / 2, (ih - sq) / 2, sq, sq * ch / size, V.X(x), V.Y(y), size * k, ch * k);
    if (dim) { c.fillStyle = dim; c.fillRect(V.X(x), V.Y(y), size * k, ch * k); }
    c.fillStyle = 'rgba(255,255,255,0.18)'; c.fillRect(V.X(x), V.Y(y), size * k, Math.max(1, Math.round(k * 0.6)));
  }
  // 木紋：幾條長短不一的細線（同一個 seed 每格畫面一樣，不會閃）
  function grain(P, x, y, w, h, c, seed, n) {
    var r = seeded(seed);
    for (var i = 0; i < (n || Math.round(w * h / 140)); i++) {
      var gx = x + Math.floor(r() * (w - 6)), gy = y + Math.floor(r() * h), gl = 4 + Math.floor(r() * Math.min(26, w / 3));
      P.hl(gx, gy, Math.min(gl, x + w - gx), c);
    }
  }
  function ellipseRing(P, cx, cy, rx, ry, c) { P.ring(cx, cy, rx, ry, c); }

  // ================================================================ 牆腳板（蓋掉初版背景牆腳那一條藍色殘影）
  def('baseboard', {
    layer: 'wall',
    box: function (o) { return [o.x, o.y, o.w, o.h || 9]; },
    draw: function (P, o) {
      var h = o.h || 9;
      (o.gaps ? splitSpans(o.x, o.x + o.w, o.gaps) : [[o.x, o.x + o.w]]).forEach(function (sp) {
        var x = sp[0], w = sp[1] - sp[0];
        P.rect(x, o.y, w, h, '#5e3a22'); P.hl(x, o.y, w, '#3a2112'); P.hl(x, o.y + 1, w, '#7d5233');
        P.hl(x, o.y + h - 2, w, '#4a2c18'); P.hl(x, o.y + h - 1, w, C.ol);
        grain(P, x, o.y + 3, w, h - 5, '#52321d', 'bb' + x, Math.round(w / 18));
      });
    }
  });
  function splitSpans(a, b, gaps) {
    var out = [], cur = a;
    gaps.slice().sort(function (p, q) { return p[0] - q[0]; }).forEach(function (g) { if (g[0] > cur) out.push([cur, Math.min(g[0], b)]); cur = Math.max(cur, g[1]); });
    if (cur < b) out.push([cur, b]);
    return out;
  }

  // ================================================================ 門（初版門洞 x12–86、y156–325；門板改程式畫：關／半開／全開）＋門外雨中的人
  def('doorB', {
    layer: 'wall',
    box: function (o) { return [o.x - 3, o.y, o.w + 6, o.h + 4]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, w = o.w, h = o.h, st = S.state.door || 'closed';
      // 門外的人（雨中剪影／夜色）
      if (!S.mask) S.drawOutside(P, [x, y, w, h], {});
      // 雨絲（門洞裡在動；背景圖本身也有靜態雨）
      if (!S.mask && st !== 'closed') {
        var r = seeded('rain'), t = S.t;
        for (var i = 0; i < 16; i++) {
          var rx = x + 2 + Math.floor(r() * (w - 4)), sp = 60 + r() * 50, ry = y + 4 + ((r() * h + t * sp) % (h - 12));
          P.vl(rx, Math.round(ry), 4, 'rgba(190,210,240,0.45)');
        }
      }
      // 門檻
      P.rect(x - 3, y + h, w + 6, 4, '#3a2112'); P.hl(x - 3, y + h, w + 6, '#6e4a2c');
      // 門板（藍色，跟初版同色）
      var blue = '#3f5f98', blueHi = '#5b7cb6', blueLo = '#2e4878', blueLo2 = '#22365c';
      if (st === 'closed') {
        box(P, x + 1, y + 1, w - 2, h - 1, blue, C.ol);
        P.vl(x + 2, y + 2, h - 3, blueHi); P.hl(x + 2, y + 2, w - 4, blueHi); P.vl(x + w - 3, y + 2, h - 3, blueLo);
        // 兩塊凹板
        [[y + 12, 64], [y + 88, 70]].forEach(function (pn) {
          P.frame(x + 9, pn[0], w - 18, pn[1], blueLo2); P.hl(x + 10, pn[0] + pn[1] - 2, w - 20, blueHi); P.vl(x + w - 11, pn[0] + 1, pn[1] - 2, blueHi);
          P.rect(x + 10, pn[0] + 1, w - 20, 1, blueLo);
        });
        // 木紋（很淡的直線）
        var gr = seeded('doorgrain');
        for (var gi = 0; gi < 14; gi++) P.vl(x + 4 + Math.floor(gr() * (w - 8)), y + 4 + Math.floor(gr() * (h - 40)), 6 + Math.floor(gr() * 18), 'rgba(30,48,90,0.35)');
        // 小窗（外面的雨夜：街燈一點暖光＋雨絲）
        var wx = x + 14, wy = y + 18, ww = w - 28, wh2 = 26;
        P.rect(wx, wy, ww, wh2, '#16203a'); P.rect(wx, wy + 18, ww, 8, '#1f2c4c'); P.frame(wx - 1, wy - 1, ww + 2, wh2 + 2, blueLo2);
        if (!S.mask) {
          P.rect(wx + ww - 12, wy + 6, 2, 2, '#ffd27a'); P.px(wx + ww - 13, wy + 7, 'rgba(255,210,122,0.5)'); P.px(wx + ww - 10, wy + 7, 'rgba(255,210,122,0.5)');
          var rr = seeded('winrain');
          for (var ri = 0; ri < 9; ri++) { var rx2 = wx + 1 + Math.floor(rr() * (ww - 2)), ry2 = wy + Math.floor((rr() * wh2 + S.t * (40 + rr() * 30)) % (wh2 - 3)); P.vl(rx2, ry2, 3, 'rgba(170,195,235,0.55)'); }
        }
        P.hl(wx, wy, ww, 'rgba(200,220,255,0.18)'); P.vl(wx + (ww >> 1), wy, wh2, blueLo2);
        // 門把（黃銅）
        box(P, x + w - 12, y + 92, 5, 9, '#c9973e', C.ol); P.px(x + w - 11, y + 93, '#f0d080');
      } else {
        var pw = st === 'ajar' ? 40 : 18, skew = st === 'ajar' ? 5 : 9;
        // 門往屋內開（左邊鉸鏈），門板邊緣有透視：上緣往上斜、下緣往下斜
        for (var j = 0; j < pw; j++) {
          var k = j / pw, top = y + 1 - Math.min(3, Math.round(skew * k)), bot = y + h + Math.round(skew * 0.6 * k);
          var col = j === 0 ? C.ol : j === pw - 1 ? C.ol : j < 3 ? blueHi : (st === 'open' ? (j > pw - 5 ? blueLo2 : blueLo) : (j > pw - 4 ? blueLo : blue));
          P.vl(x + 1 + j, top, bot - top, col);
          P.px(x + 1 + j, top, C.ol); P.px(x + 1 + j, bot - 1, C.ol);
        }
        if (st === 'ajar') { box(P, x + pw - 9, y + 92, 4, 9, '#c9973e', C.ol); P.frame(x + 8, y + 12, pw - 16, 64, blueLo2); P.frame(x + 8, y + 88, pw - 16, 70, blueLo2); }
        else { box(P, x + pw - 6, y + 94, 3, 8, '#c9973e', C.ol); }
      }
    },
    hots: function () { return []; }
  });

  // ================================================================ 腳踏墊（門口）
  def('matB', {
    layer: 'floor',
    box: function (o) { return [o.x, o.y, o.w, o.h]; },
    draw: function (P, o) {
      box(P, o.x, o.y, o.w, o.h, '#3a3a40', C.ol); P.hl(o.x + 1, o.y + 1, o.w - 2, '#55555e');
      for (var i = o.x + 4; i < o.x + o.w - 4; i += 4) P.vl(i, o.y + 2, o.h - 4, '#2c2c32');
      shadow(P, o.x + 1, o.y + o.h, o.w, 1, 0.3);
    }
  });

  // ================================================================ 櫃檯（靠牆、老闆站後面只露頭肩）
  // o: x, top（檯面後緣 y）, w, depth（檯面看得到的深度）, face（檯身高）, plate（招牌字）
  def('counterB', {
    layer: 'stand',
    box: function (o) { return [o.x, o.top, o.w, (o.depth || 10) + 2 + (o.face || 38)]; },
    base: function (o) { return o.top + (o.depth || 10) + 2 + (o.face || 38); },
    draw: function (P, o, S) {
      var x = o.x, w = o.w, y = o.top, d = o.depth || 10, f = o.face || 38, fy = y + d + 2, by = fy + f;
      // 檯面
      P.rect(x, y, w, d, C.ctTop); P.hl(x, y, w, C.ctTopLo); P.hl(x + 1, y + d - 1, w - 2, C.ctTopHi);
      grain(P, x + 2, y + 2, w - 4, d - 4, C.ctTopLo, 'ctTop' + x, Math.round(w / 9));
      P.vl(x, y, d, C.ol); P.vl(x + w - 1, y, d, C.ol); P.hl(x, y - 1, w, 'rgba(42,22,8,0.55)');
      // 唇（檯面厚度）
      P.rect(x - 1, y + d, w + 2, 2, C.ctLip); P.hl(x - 1, y + d + 2, w + 2, C.ol);
      // 檯身：直板＋板縫
      P.rect(x, fy + 1, w, f - 1, C.ctFace);
      for (var sx = x + 24; sx < x + w - 6; sx += 30) { P.vl(sx, fy + 1, f - 8, C.ctFaceLo); P.vl(sx + 1, fy + 1, f - 8, C.ctFaceHi); }
      grain(P, x + 2, fy + 3, w - 4, f - 12, C.ctFaceLo, 'ctFace' + x, Math.round(w / 7));
      P.hl(x, fy + 1, w, C.ctFaceLo);
      // 踢腳板
      P.rect(x, by - 7, w, 7, C.ctKick); P.hl(x, by - 7, w, C.ctFaceLo);
      P.vl(x, fy, f, C.ol); P.vl(x + w - 1, fy, f, C.ol); P.hl(x, by - 1, w, C.ol);
      shadow(P, x - 2, by, w + 6, 2, 0.4); shadow(P, x, by + 2, w + 4, 1, 0.2);
      // 招牌（黃銅底黑字 → 跟 v2 一樣是黑底金字）
      if (o.plate) {
        var pw = P.textW(o.plate) * 2 + 10, px = Math.round(x + (o.plateX != null ? o.plateX : w / 2 - pw / 2)), py = fy + 7;
        box(P, px, py, pw, 15, '#1c120b', '#b8860b'); P.hl(px + 1, py + 1, pw - 2, '#3a2a14');
        P.text(o.plate, px + 5, py + 3, C.gold, 2);
      }
    }
  });

  // ================================================================ 櫃檯上的東西
  def('speakerB', {   // 書架喇叭（初版櫃檯上那對）
    layer: 'stand',
    box: function (o) { return [o.x, o.y, o.w || 18, o.h || 26]; },
    draw: function (P, o) {
      var x = o.x, y = o.y, w = o.w || 18, h = o.h || 26;
      shadow(P, x + 1, y + h, w, 2, 0.45);
      box(P, x, y, w, h, C.spk, C.olS); P.hl(x + 1, y + 1, w - 2, C.spkHi); P.vl(x + 1, y + 2, h - 3, '#36363e');
      P.ellipse(x + w / 2 | 0, y + 8, 4, 4, C.coneLo); P.ellipse(x + w / 2 | 0, y + 8, 3, 3, C.cone); P.px(x + (w / 2 | 0), y + 8, C.spkLo);
      P.ellipse(x + w / 2 | 0, y + 18, 6, 5, C.coneLo); P.ellipse(x + w / 2 | 0, y + 18, 5, 4, C.cone); P.ellipse(x + w / 2 | 0, y + 18, 2, 2, C.coneLo);
      P.px(x + (w / 2 | 0) - 3, y + 15, '#7a7a86');
    }
  });
  def('registerB', {   // 收銀機
    layer: 'stand',
    box: function (o) { return [o.x, o.y, 26, 20]; },
    draw: function (P, o) {
      var x = o.x, y = o.y;
      shadow(P, x + 1, y + 20, 26, 2, 0.45);
      box(P, x + 4, y, 16, 7, '#2c2c33', C.olS); P.rect(x + 6, y + 2, 12, 3, '#7fd18a'); P.hl(x + 7, y + 3, 5, '#2e7d52');
      box(P, x, y + 7, 26, 13, '#4a4a54', C.olS); P.hl(x + 1, y + 8, 24, '#6c6c78');
      for (var r = 0; r < 2; r++) for (var c = 0; c < 5; c++) P.rect(x + 3 + c * 4, y + 10 + r * 4, 3, 2, r === 0 && c === 4 ? '#c11628' : '#d8d8de');
      P.rect(x + 2, y + 18, 22, 1, '#2c2c33');
    }
  });
  def('catB', {   // 店貓（趴在櫃檯上，橘貓；點了會抬頭）——比例：人 70、貓趴著 16
    layer: 'stand',
    box: function (o) { return [o.x, o.y - 3, 36, 19]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, up = (S.state.poke[o.id] || 0) > S.state.rt, blink = Math.floor(S.t * 10) % 41 === 0;
      var O = '#e0851c', OL = '#a8560c', OH = '#f6ad55', W = '#fbf3e4', ol = C.ol;
      shadow(P, x + 2, y + 15, 34, 2, 0.4);
      // 尾巴（垂到檯面前緣，慢慢擺）
      var tw = Math.floor(S.t * 1.5) % 2;
      P.rect(x + 30, y + 11, 5, 3, O); P.rect(x + 33, y + 13 + tw, 3, 4, O); P.px(x + 35, y + 16 + tw, OL);
      // 身體（麵包形）
      P.rect(x + 9, y + 5, 22, 10, ol); P.rect(x + 10, y + 6, 20, 8, O); P.hl(x + 11, y + 6, 17, OH); P.hl(x + 10, y + 13, 20, OL);
      for (var i = 0; i < 3; i++) { P.vl(x + 15 + i * 5, y + 7, 3, OL); P.px(x + 16 + i * 5, y + 7, OL); }
      // 頭
      var hy = up ? y - 3 : y + 1;
      P.rect(x, hy + 2, 13, 11, ol); P.rect(x + 1, hy + 3, 11, 9, O);
      P.rect(x + 1, hy, 3, 3, ol); P.px(x + 2, hy + 1, O); P.px(x + 2, hy + 2, '#f2b0a0');
      P.rect(x + 9, hy, 3, 3, ol); P.px(x + 10, hy + 1, O); P.px(x + 10, hy + 2, '#f2b0a0');
      P.hl(x + 2, hy + 3, 9, OH);
      P.rect(x + 3, hy + 8, 7, 3, W);
      if (!blink) { P.rect(x + 3, hy + 6, 2, 2, ol); P.rect(x + 8, hy + 6, 2, 2, ol); P.px(x + 3, hy + 6, '#7fd18a'); P.px(x + 8, hy + 6, '#7fd18a'); }
      else { P.hl(x + 3, hy + 7, 2, OL); P.hl(x + 8, hy + 7, 2, OL); }
      P.px(x + 6, hy + 8, '#c06070');
      // 前腳（白襪）
      P.rect(x + 3, y + 12, 4, 3, W); P.rect(x + 8, y + 12, 4, 3, W); P.hl(x + 3, y + 15, 9, ol);
    }
  });
  // 「正在放」：櫃檯上的小畫架＋真封面（點了看唱片資訊）
  def('nowEasel', {
    layer: 'stand',
    box: function (o) { var c = o.cell || 26; return [o.x - 2, o.y - 2, c + 4, c + 10]; },
    draw: function (P, o, S) {
      var c = o.cell || 26, x = o.x, y = o.y;
      shadow(P, x, y + c + 6, c + 2, 2, 0.45);
      P.vl(x + 3, y + c - 2, 9, '#6e4a2c'); P.vl(x + c - 4, y + c - 2, 9, '#6e4a2c'); P.vl(x + (c >> 1), y + 4, c + 4, '#5a3a20');
      P.rect(x - 2, y - 2, c + 4, c + 4, C.ol); P.frame(x - 1, y - 1, c + 2, c + 2, '#8a6038');
      cover(P, S, o.record, x, y, c);
      P.rect(x - 1, y + c + 1, c + 2, 2, '#8a6038');
      // 右上角的音符（正在放就閃）
      var on = S.state.playing && Math.floor(S.t * 2) % 2;
      box(P, x + c - 5, y - 8, 9, 10, '#1c120b', null);
      P.sprite(['..kk', '..kk', '..k.', '..k.', 'kkk.', 'kkk.'], x + c - 3, y - 7 + (on ? 0 : 1), { k: on ? C.gold : '#b8860b' }, {});
    },
    hiresTop: function (V, o, S) { var c = o.cell || 26; if (!V.blocked([o.x, o.y, c, c], o.base)) hiCoverTop(V, S, o.record, o.x, o.y, c); },
    hots: function (o, S) { var c = o.cell || 26, cd = S.card(o.record); return [{ id: 'now', rect: [o.x, o.y, c, c], label: '正在放：' + (cd ? cd.album : ''), action: 'wall-record:' + o.record }]; }
  });
  // 貼在櫃檯正面的活動傳單（「公告」）
  def('flyerB', {
    layer: 'stand',
    box: function (o) { return [o.x, o.y, o.w || 20, o.h || 26]; },
    draw: function (P, o) {
      var x = o.x, y = o.y, w = o.w || 20, h = o.h || 26;
      shadow(P, x + 1, y + 1, w, h, 0.35);
      box(P, x, y, w, h, '#f3ead6', '#9a8a6a');
      P.rect(x + 2, y + 2, w - 4, 9, '#c11628'); P.text('VS', x + (w >> 1) - 3, y + 4, '#fbf3e4');
      P.hl(x + 3, y + 14, w - 6, '#2a1608'); P.hl(x + 3, y + 17, w - 9, '#6a5a4a'); P.hl(x + 3, y + 20, w - 7, '#6a5a4a');
      P.px(x + (w >> 1), y + 1, '#c9973e');   // 圖釘
    }
  });

  // ================================================================ 唱盤台（對決：他白台、你黑台；平常是店裡的試聽台）
  // o: x（中心）, base, side 'e'|'p', w=44；狀態由 S.decks[side] 決定 { rec:{attr,card}, state:'land'|'armMid'|'spin'|null, glow }
  def('deckB', {
    layer: 'stand',
    box: function (o) { var w = o.w || 44; return [o.x - (w >> 1), o.base - 38, w, 38]; },
    base: function (o) { return o.base; },
    draw: function (P, o, S) {
      // 小桌（4 支細腳）＋桌上一台唱盤（3/4 俯視：機身正面 6、上蓋 10），他＝奶油白、你＝黑
      var w = o.w || 44, x = o.x - (w >> 1), b = o.base, wh = o.side === 'e';
      var hi = wh ? C.whHi : C.bkHi, md = wh ? C.wh : C.bk, lo = wh ? C.whLo : C.bkLo, lo2 = wh ? C.whLo2 : C.bkLo2;
      var ds = (S.state.decks && S.state.decks[o.side]) || o.state || {}, spin = ds.state === 'spin';
      var legH = 15, tt = b - legH - 3;          // 桌面上緣
      shadow(P, x - 1, b - 1, w + 4, 2, 0.4);
      // 桌腳（後兩支細、前兩支粗）＋橫撐
      P.vl(x + 5, tt + 3, legH - 1, lo2); P.vl(x + w - 6, tt + 3, legH - 1, lo2);
      [x + 2, x + w - 5].forEach(function (lx) { P.rect(lx, tt + 3, 3, legH, md); P.vl(lx, tt + 3, legH, hi); P.vl(lx + 2, tt + 3, legH, lo); P.hl(lx, b - 1, 3, C.ol); P.vl(lx - 1, tt + 3, legH, C.ol); P.vl(lx + 3, tt + 3, legH, C.ol); });
      P.hl(x + 5, b - 7, w - 10, lo); P.hl(x + 5, b - 6, w - 10, lo2);
      // 桌面板
      P.rect(x, tt, w, 3, md); P.hl(x, tt, w, hi); P.hl(x, tt + 2, w, lo); P.frame(x - 1, tt - 1, w + 2, 5, C.ol);
      // 唱盤機身
      var mx = x + 2, mw = w - 4, top = tt - 16, fy = tt - 6;
      P.rect(mx, fy, mw, 6, wh ? C.whLo : C.bkLo); P.hl(mx, fy, mw, wh ? C.wh : C.bk);
      P.rect(mx + 4, fy + 2, 9, 2, wh ? C.whLo2 : C.bkLo2);                 // 速度鈕
      P.rect(mx + mw - 7, fy + 2, 3, 2, spin ? '#5ee07a' : (wh ? '#b3a688' : '#55555f'));   // 燈：放著＝綠
      P.rect(mx + mw - 13, fy + 2, 4, 2, wh ? C.whLo2 : '#55555f');
      P.rect(mx, top, mw, 10, md); P.hl(mx + 1, top + 1, mw - 2, hi); P.hl(mx, top + 9, mw, lo);
      P.frame(mx - 1, top - 1, mw + 2, 18, C.ol); P.hl(mx, fy, mw, C.ol);
      // 鍍金（品味輾壓蓄力）
      if (ds.glow && Math.floor(S.t * 4) % 2 === 0) { P.frame(x - 2, top - 2, w + 4, b - top + 3, C.gold); P.px(x + 4, top - 4, C.gold); P.px(x + w - 5, top - 5, C.gold); P.px(x + (w >> 1), top - 6, C.gold); }
      // 轉盤＋唱片
      var cx = mx + 16, cy = top + 5;
      P.ellipse(cx, cy, 14, 4, wh ? C.whLo2 : C.bkLo2);
      P.ellipse(cx, cy, 13, 3, C.sv); P.hl(cx - 9, cy - 3, 7, C.svHi);
      var rec = ds.rec;
      if (rec) {
        var lift = ds.state === 'land' ? 1 : 0, ry = cy - lift;
        P.ellipse(cx, ry, 12, 3, rec.kind === 'big' ? '#c9973e' : C.vin);
        P.ring(cx, ry, 8, 2, rec.kind === 'big' ? '#b8860b' : C.vinG);
        P.rect(cx - 3, ry - 1, 7, 3, ATTR[rec.attr] || C.rugLb); P.px(cx, ry, C.ol);
        if (spin) { var f = Math.floor(S.t * 10) % 4, gx = [cx - 9, cx - 2, cx + 7, cx]; var gy = [ry - 1, ry - 2, ry, ry + 2]; P.rect(gx[f], gy[f], 2, 1, C.vinHi); }
        if (lift && !S.mask) { P.px(cx - 14, cy + 3, '#d9cdb0'); P.px(cx + 14, cy + 3, '#d9cdb0'); }
      } else { P.px(cx, cy, C.svLo); P.ring(cx, cy, 7, 2, '#b0b0ba'); }
      // 唱臂：放下（spin）／半路（armMid）／收著
      var ax = mx + mw - 6, ay = top + 2;
      P.rect(ax - 1, ay - 1, 4, 4, wh ? C.whLo2 : C.mtlHi); P.px(ax, ay, C.svHi);
      if (spin) { P.hl(ax - 10, ay + 5, 10, C.svLo); P.vl(ax, ay + 1, 4, C.svLo); P.rect(ax - 12, ay + 4, 3, 2, C.ol); }
      else if (ds.state === 'armMid') { P.vl(ax, ay + 1, 3, C.svLo); P.hl(ax - 6, ay + 3, 6, C.svLo); P.rect(ax - 8, ay + 2, 3, 2, C.ol); }
      else { P.vl(ax, ay + 1, 6, C.svLo); P.rect(ax - 1, ay + 6, 3, 2, C.ol); }
      // 音符（放著）
      if (spin && !S.mask) { var ph = (S.t % 1.8) / 1.8; if (ph < 0.8) note(P, cx + 4 + Math.round(ph * 6), top - 12 - Math.round(ph * 14), ATTR[(rec && rec.attr)] || C.gold); }
    }
  });
  // 唱片形地毯（兩台中間）
  def('rugB', {
    layer: 'floor',
    box: function (o) { return [o.x - o.rx, o.y - o.ry, o.rx * 2 + 1, o.ry * 2 + 1]; },
    draw: function (P, o) {
      shadow(P, o.x - o.rx + 2, o.y + o.ry - 1, o.rx * 2 - 2, 2, 0.35);
      P.ellipse(o.x, o.y, o.rx, o.ry, C.olS); P.ellipse(o.x, o.y, o.rx - 1, o.ry - 1, C.rug);
      for (var k = 3; k < o.rx - 12; k += 5) P.ring(o.x, o.y, o.rx - k, Math.max(1, Math.round((o.rx - k) * o.ry / o.rx)), C.rugG);
      P.ring(o.x, o.y, o.rx - 2, o.ry - 1, C.rugHi);
      var lx = Math.round(o.rx * 0.26), ly = Math.max(2, Math.round(o.ry * 0.36));
      P.ellipse(o.x, o.y, lx, ly, o.label || C.rugLb); P.hl(o.x - lx + 2, o.y + ly, lx * 2 - 3, C.rugLbLo); P.px(o.x, o.y, C.ol);
    }
  });

  // ================================================================ 折疊長桌＋桌上木箱＋桌下黑籃（照店主實店照片）
  // o: x, w, base（桌腳落地 y）, top（桌面離地高）, depth（桌面深度）, crates:[{x(相對), w, label, records:[id…], wood}], bins:[{x,w,records}]
  def('tableB', {
    layer: 'stand',
    box: function (o) { var hgt = (o.top || 22) + (o.depth || 10) + 34; return [o.x, o.base - hgt, o.w, hgt]; },
    base: function (o) { return o.base; },
    draw: function (P, o, S) {
      var x = o.x, w = o.w, b = o.base, ht = o.top || 22, d = o.depth || 10;
      var fe = b - ht, ty = fe - d;   // 桌面前緣 y、桌面後緣 y
      // 地上影子（桌子底下整片暗）
      shadow(P, x + 2, b - 2, w - 2, 4, 0.38);
      // 桌下黑籃（先畫，桌腳、桌面蓋在前面）
      (o.bins || []).forEach(function (bn, i) { milkCrate(P, S, x + bn.x, b, bn.w || 50, bn.h || 16, bn.records || [], 'bin' + i); });
      // 桌面下緣的陰影
      shadow(P, x + 2, fe + 3, w - 4, 3, 0.45);
      // 桌腳（深色金屬，前面兩支＋後面兩支細一點，中間一條橫桿）
      [x + 5, x + w - 8].forEach(function (lx) {
        P.rect(lx + 2, ty + 6, 2, b - ty - 8, C.mtlLo);   // 後腳（被桌面擋住上半）
        P.rect(lx, fe + 2, 3, b - fe - 2, C.mtl); P.vl(lx, fe + 2, b - fe - 2, C.mtlHi); P.rect(lx - 1, b - 2, 5, 2, C.mtlLo);
      });
      P.hl(x + 8, b - 7, w - 16, C.mtl); P.hl(x + 8, b - 6, w - 16, C.mtlLo);
      // 桌面（淺色櫸木）＋前緣厚度
      P.rect(x, ty, w, d, C.tb); P.hl(x, ty, w, C.tbLo); P.hl(x + 1, ty + d - 1, w - 2, C.tbHi);
      grain(P, x + 2, ty + 2, w - 4, d - 3, C.tbLo, 'tb' + x, Math.round(w / 10));
      P.rect(x - 1, fe, w + 2, 3, C.tbEdge); P.hl(x - 1, fe + 2, w + 2, C.tbEdgeLo); P.hl(x - 1, fe + 3, w + 2, C.ol);
      P.vl(x - 1, ty, fe - ty + 3, C.ol); P.vl(x + w, ty, fe - ty + 3, C.ol); P.hl(x, ty - 1, w, 'rgba(42,22,8,0.5)');
      // 桌上的木箱
      (o.crates || []).forEach(function (cr, i) { woodCrate(P, S, x + cr.x, fe - 2, cr, 'cr' + i); });
    },
    hiresTop: function (V, o, S) {
      var ht = o.top || 22, fe = o.base - ht;
      (o.crates || []).forEach(function (cr) {
        var r = crateCovers(o.x + cr.x, fe - 2, cr);
        var any = false;
        r.forEach(function (q) { if (!V.blocked([q.x, q.y, q.cs, q.ch], o.base)) { hiCoverTop(V, S, q.id, q.x, q.y, q.cs, q.ch, q.dim); any = true; } });
        if (any && cr.tab && r.length) {   // 分類小卡插在唱片之間（蓋在高解析封面上面）
          var w = cr.w || 56, cy = r[r.length - 1].y, c = V.ctx, k = V.k, tx = V.X(o.x + cr.x + w - 12), ty = V.Y(cy - 4);
          c.fillStyle = C.ppLo; c.fillRect(tx, ty, 7 * k, 6 * k); c.fillStyle = C.pp; c.fillRect(tx + k, ty + k, 5 * k, 4 * k);
        }
      });
    },
    hots: function (o, S) {
      var ht = o.top || 22, fe = o.base - ht;
      return (o.crates || []).filter(function (cr) { return cr.id; }).map(function (cr) {
        return { id: cr.id, rect: [o.x + cr.x - 1, fe - 2 - (cr.face || 16) - 22, (cr.w || 56) + 2, (cr.face || 16) + 24], label: cr.hotLabel, action: cr.action, rectOnly: true, main: true };
      });
    }
  });
  // 木箱裡朝外的封面位置（世界格畫法與高解析頂層共用）：後面那張先、前面那張後
  function crateCovers(x, by, cr) {
    var w = cr.w || 56, f = cr.face || 16, fy = by - f, recs = cr.records || [], cs = cr.cover || 30, out = [];
    var cx = x + Math.round((w - cs) / 2) + (cr.coverDx || 0), cy = fy - Math.round(cs * 0.6);
    if (recs[1]) { var bx = x + w - cs - 3, by2 = cy - 4; cx = x + 3; out.push({ id: recs[1], x: bx, y: by2, cs: cs, ch: fy - by2, dim: 'rgba(20,10,4,0.28)' }); }
    if (recs[0]) out.push({ id: recs[0], x: cx, y: cy, cs: cs, ch: Math.round(cs * 0.6) });
    return out;
  }
  // 木箱：前板 face 高、上緣看得到 4 px 的箱口；最前面那張唱片封面朝外（真封面，露出上 60%），後面幾張露出上緣
  function woodCrate(P, S, x, by, cr, seed) {
    var w = cr.w || 56, f = cr.face || 16, fy = by - f, ry = fy - 4, recs = cr.records || [];
    var hi = cr.wood === 'light' ? '#e2b47a' : C.crHi, md = cr.wood === 'light' ? '#c99a5e' : C.cr, lo = cr.wood === 'light' ? '#a87a44' : C.crLo;
    shadow(P, x + 1, by, w + 2, 2, 0.45);
    // 箱口（內側暗）＋後板
    P.rect(x, ry - 2, w, 6, C.crIn); P.hl(x, ry - 2, w, lo); P.hl(x, ry - 3, w, C.ol);
    // 立著的唱片：後面的露出上緣（各色），最前面一張封面朝外
    var r = seeded(seed), cols = ['#e8e0cc', '#2a2a30', '#c94a2a', '#3e6e9a', '#f2b45a', '#7a4aa8', '#1e3a1e', '#d8d8d8'];
    for (var i = 0; i < 6; i++) {
      var rx = x + 3 + i, rw = w - 6 - i * 2, top = ry - 9 + (i % 3) - Math.floor(r() * 3);
      P.rect(rx, top, rw, 3, cols[Math.floor(r() * cols.length)]); P.hl(rx, top, rw, 'rgba(255,255,255,0.25)');
    }
    var cs = cr.cover || 30, cx = x + Math.round((w - cs) / 2) + (cr.coverDx || 0), cy = fy - Math.round(cs * 0.6);
    if (recs[1]) {   // 第二張：往後、往右錯開（像初版木箱裡一張疊一張）
      var bx = x + w - cs - 3, by2 = cy - 4;
      cx = x + 3;
      P.rect(bx - 1, by2 - 1, cs + 2, fy - by2 + 1, C.ol);
      cover(P, S, recs[1], bx, by2, cs, { clipH: fy - by2 });
      P.rect(bx, by2, cs, fy - by2, 'rgba(20,10,4,0.28)');   // 後面那張暗一點
    }
    P.rect(cx - 1, cy - 1, cs + 2, Math.round(cs * 0.6) + 1, C.ol);
    cover(P, S, recs[0], cx, cy, cs, { clipH: Math.round(cs * 0.6) });
    P.hl(cx, cy, cs, 'rgba(255,255,255,0.22)');
    // 分類小卡（白色，插在唱片之間）
    if (cr.tab) { P.rect(x + w - 12, cy - 4, 7, 6, C.pp); P.frame(x + w - 12, cy - 4, 7, 6, C.ppLo); }
    // 前板：兩條橫板＋角柱
    P.rect(x, fy, w, f, md); P.hl(x, fy, w, hi); P.hl(x, fy + (f >> 1), w, C.crSeam); P.hl(x, fy + (f >> 1) + 1, w, hi);
    P.vl(x + 1, fy + 1, f - 2, lo); P.vl(x + w - 2, fy + 1, f - 2, lo);
    grain(P, x + 3, fy + 2, w - 6, f - 4, lo, seed + 'g', Math.round(w / 12));
    P.frame(x, fy, w, f, C.ol); P.vl(x, ry - 3, f + 5, C.ol); P.vl(x + w - 1, ry - 3, f + 5, C.ol);
    // 標籤牌
    if (cr.label) {
      var tw = P.textW(cr.label), pw = tw + 6, px = x + Math.round((w - pw) / 2), py = fy + 4;
      box(P, px, py, pw, 9, cr.plate || C.pp, C.ol); P.text(cr.label, px + 3, py + 2, cr.ink || C.ink);
    }
  }
  // 黑色塑膠籃（牛奶箱）：格子孔＋上緣把手孔；裡面的唱片露出上緣
  function milkCrate(P, S, x, b, w, h, recs, seed) {
    var y = b - h, r = seeded(seed), cols = ['#e8e0cc', '#c94a2a', '#3e6e9a', '#f2b45a', '#d8d8d8', '#7a4aa8', '#2e7d52'];
    // 唱片上緣（從籃子口露出 3 px）
    for (var i = 0; i < Math.floor(w / 5); i++) { var rx = x + 2 + i * 5 + Math.floor(r() * 2); P.rect(rx, y - 3 + Math.floor(r() * 2), 4, 4, cols[Math.floor(r() * cols.length)]); }
    if (recs[0]) { P.rect(x + 6, y - 6, 18, 7, C.ol); cover(P, S, recs[0], x + 7, y - 5, 16, { clipH: 6 }); }
    P.rect(x, y, w, h, C.mk); P.hl(x, y, w, C.mkHi); P.hl(x, y + 1, w, C.mkHi);
    // 把手孔
    P.rect(x + (w >> 1) - 5, y + 3, 10, 2, C.mkHole);
    // 格子孔（兩排）
    for (var row = 0; row < 2; row++) for (var hx = x + 3; hx < x + w - 4; hx += 5) P.rect(hx, y + 7 + row * 4, 3, 2, C.mkHole);
    P.hl(x, b - 2, w, C.mkLo); P.vl(x + 1, y + 2, h - 3, '#2c2c34'); P.vl(x + w - 2, y + 2, h - 3, C.mkLo);
    P.frame(x, y, w, h, '#0a0a0c');
  }

  // ================================================================ 試聽櫃（右後方，初版右邊唱片櫃的味道：正面兩格看得到唱片書背）
  def('listenB', {
    layer: 'stand',
    box: function (o) { return [o.x, o.top - 30, o.w, (o.depth || 8) + (o.face || 32) + 32]; },
    base: function (o) { return o.top + (o.depth || 8) + (o.face || 32); },
    draw: function (P, o, S) {
      var x = o.x, w = o.w, y = o.top, d = o.depth || 8, f = o.face || 32, fy = y + d, by = fy + f;
      // 檯面
      P.rect(x, y, w, d, C.ctTop); P.hl(x, y, w, C.ctTopLo); P.hl(x + 1, y + d - 1, w - 2, C.ctTopHi);
      P.vl(x, y, d, C.ol); P.vl(x + w - 1, y, d, C.ol); P.hl(x, y - 1, w, 'rgba(42,22,8,0.5)');
      P.rect(x - 1, fy, w + 2, 2, C.ctLip);
      // 櫃身：左右兩格，裡面是唱片書背
      P.rect(x, fy + 2, w, f - 2, '#6e4128'); P.frame(x, fy + 2, w, f - 2, C.ol);
      var cw = (w - 9) >> 1, r = seeded('listen-spines'), cols = ['#c94a2a', '#3e6e9a', '#e8e0cc', '#f2b45a', '#2e7d52', '#7a4aa8', '#d8d8d8', '#1f1f25', '#e75480', '#8e2a1e'];
      var nr = o.rows || 1, rh = Math.floor((f - 6 - 4 * nr) / nr);
      var cells = []; for (var ri = 0; ri < nr; ri++) { cells.push([x + 3, fy + 5 + ri * (rh + 4), ri * 2]); cells.push([x + 6 + cw, fy + 5 + ri * (rh + 4), ri * 2 + 1]); }
      cells.forEach(function (cl) {
        var cx0 = cl[0], cy0 = cl[1], k = cl[2] % 2 === 1 && cl[2] === nr * 2 - 1 ? 1 : 0, ch = rh;
        P.rect(cx0, cy0, cw, ch, '#2a170b');
        for (var sx = cx0 + 1; sx < cx0 + cw - 1; sx += 2) { var sh = ch - 2 - Math.floor(r() * 4); P.rect(sx, cy0 + ch - sh, 2, sh, cols[Math.floor(r() * cols.length)]); P.px(sx, cy0 + ch - sh, 'rgba(255,255,255,0.3)'); }
        if (k === 1) { P.rect(cx0 + cw - 9, cy0 + 4, 8, ch - 4, '#2a170b'); P.rect(cx0 + cw - 8, cy0 + 6, 6, ch - 6, '#e8e0cc'); }   // 一張斜放的
        P.hl(cx0, cy0 + ch, cw, '#8a5a3c');
      });
      P.rect(x, by - 4, w, 4, C.ctKick); P.hl(x, by - 1, w, C.ol);
      shadow(P, x - 1, by, w + 4, 2, 0.4);
      // 檯面上：小唱盤＋耳機架
      var tx = x + 8, tyy = y - 4;
      box(P, tx, tyy, 30, 9, '#3a3a44', C.olS); P.hl(tx + 1, tyy + 1, 28, '#5c5c68');
      P.ellipse(tx + 11, tyy + 3, 8, 2, C.vin); P.rect(tx + 10, tyy + 2, 3, 2, '#c11628');
      P.vl(tx + 25, tyy - 2, 5, C.sv); P.hl(tx + 18, tyy + 3, 7, C.svLo);
      var hx = x + w - 24, hy = y - 22;
      P.vl(hx + 8, hy + 6, 18, '#55555f'); P.rect(hx + 4, hy + 24, 9, 2, '#3a3a44');
      // 耳機（掛著）
      P.ring(hx + 8, hy + 6, 6, 5, '#26262d'); P.rect(hx + 1, hy + 6, 4, 7, '#1f5fae'); P.rect(hx + 12, hy + 6, 4, 7, '#1f5fae'); P.px(hx + 2, hy + 7, '#5a8ad0'); P.px(hx + 13, hy + 7, '#5a8ad0');
      P.rect(hx + 8, hy - 1, 1, 2, '#26262d');
    },
    hots: function () { return []; }
  });
  def('stoolB', {   // 試聽圓凳
    layer: 'stand',
    box: function (o) { return [o.x - 9, o.base - 18, 18, 18]; },
    base: function (o) { return o.base; },
    draw: function (P, o) {
      var x = o.x, b = o.base;
      shadow(P, x - 8, b - 1, 17, 2, 0.4);
      P.vl(x - 6, b - 12, 12, C.svLo); P.vl(x + 5, b - 12, 12, C.svLo); P.vl(x - 2, b - 11, 10, '#6e6e78'); P.vl(x + 2, b - 11, 10, '#6e6e78');
      P.hl(x - 6, b - 5, 12, C.sv);
      P.ellipse(x, b - 15, 9, 3, '#8e1420'); P.ellipse(x, b - 16, 8, 2, '#c11628'); P.hl(x - 5, b - 18, 6, '#e0505c');
    }
  });
  def('clockB', {   // 牆上的鐘（夜裡 22:40）
    layer: 'wall',
    box: function (o) { return [o.x - 10, o.y - 10, 21, 21]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y;
      shadow(P, x - 8, y - 7, 19, 19, 0.25);
      P.ellipse(x, y, 10, 10, C.ol); P.ellipse(x, y, 9, 9, '#6e4a2c'); P.ellipse(x, y, 7, 7, '#f6efdc');
      [[0, -6], [6, 0], [0, 6], [-6, 0]].forEach(function (d) { P.px(x + d[0], y + d[1], C.ol); });
      // 時針指 10:40 附近、分針指 8
      P.px(x - 1, y - 1, C.ol); P.px(x - 2, y - 2, C.ol); P.px(x - 3, y - 2, C.ol);
      P.px(x - 1, y + 1, C.ol); P.px(x - 2, y + 2, C.ol); P.px(x - 3, y + 3, C.ol); P.px(x - 4, y + 3, C.ol);
      var sec = Math.floor(S.t) % 12, a = sec / 12 * Math.PI * 2 - Math.PI / 2; P.px(Math.round(x + Math.cos(a) * 5), Math.round(y + Math.sin(a) * 5), '#c11628');
      P.px(x, y, '#c11628');
    }
  });
  def('singlesLedge', {   // 牆上一條小木架，靠著幾張 7 吋單曲（真封面 16×16）
    layer: 'wall',
    box: function (o) { return [o.x, o.y - 18, o.w, 22]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, w = o.w, recs = o.records || [], n = recs.length, sz = o.size || 16, gap = n > 1 ? Math.floor((w - 8 - n * sz) / (n - 1)) : 0;
      if (!S.hires || S.mask) recs.forEach(function (id, i) {
        var cx = x + 4 + i * (sz + gap), cy = y - sz - 1 + (i % 2);
        shadow(P, cx + 2, cy + 2, sz, sz, 0.3); P.rect(cx - 1, cy - 1, sz + 2, sz + 2, C.ol);
        cover(P, S, id, cx, cy, sz);
      });
      P.rect(x, y, w, 3, '#8a5a3c'); P.hl(x, y, w, '#b07a52'); P.hl(x, y + 3, w, C.ol); shadow(P, x + 1, y + 4, w, 2, 0.3);
      P.rect(x + 6, y + 3, 2, 4, '#5a3a20'); P.rect(x + w - 8, y + 3, 2, 4, '#5a3a20');
    },
    hires: function (V, o, S) {
      var x = o.x, y = o.y, w = o.w, recs = o.records || [], n = recs.length, sz = o.size || 16, gap = n > 1 ? Math.floor((w - 8 - n * sz) / (n - 1)) : 0;
      recs.forEach(function (id, i) { hiCover(V, S, id, x + 4 + i * (sz + gap), y - sz - 1 + (i % 2), sz, { frame: C.ol, shadow: 0.3 }); });
    },
    hots: function (o, S) {
      var recs = o.records || [], n = recs.length, sz = o.size || 16, gap = n > 1 ? Math.floor((o.w - 8 - n * sz) / (n - 1)) : 0;
      return recs.map(function (id, i) { var cd = S.card(id); return { id: (o.id || 'single') + ':' + id, rect: [o.x + 4 + i * (sz + gap), o.y - sz - 1, sz, sz], label: cd ? cd.album : id, action: 'wall-record:' + id }; });
    }
  });
  def('aframeB', {   // 前面的小黑板立牌（粉筆畫一張唱片）
    layer: 'stand',
    box: function (o) { return [o.x - 13, o.base - 34, 26, 34]; },
    base: function (o) { return o.base; },
    draw: function (P, o, S) {
      var x = o.x, b = o.base;
      shadow(P, x - 13, b - 1, 28, 2, 0.4);
      P.rect(x - 12, b - 6, 2, 6, '#6e4a2c'); P.rect(x + 10, b - 6, 2, 6, '#6e4a2c');
      box(P, x - 13, b - 34, 26, 29, '#8a5a3c', C.ol); P.hl(x - 12, b - 33, 24, '#b07a52');
      P.rect(x - 11, b - 31, 22, 24, '#24302a'); P.hl(x - 11, b - 31, 22, '#34443c');
      P.text(o.text || 'DIG', x - (P.textW(o.text || 'DIG') >> 1), b - 29, '#efe9dc');
      P.ring(x, b - 15, 6, 5, '#efe9dc'); P.px(x, b - 15, '#efe9dc'); P.ring(x, b - 15, 2, 2, '#e75480');
      P.hl(x - 8, b - 9, 4, '#f0c75e'); P.hl(x + 4, b - 9, 4, '#f0c75e');
    }
  });
  def('signB', {   // 牆上的小木牌（LISTEN）
    layer: 'wall',
    box: function (o) { var w = P0w(o); return [o.x, o.y, w, 15]; },
    draw: function (P, o) {
      var w = P.textW(o.text) * 2 + 10, x = o.x, y = o.y;
      P.vl(x + 6, y - 6, 6, '#3a2112'); P.vl(x + w - 7, y - 6, 6, '#3a2112');
      shadow(P, x + 2, y + 2, w, 15, 0.3);
      box(P, x, y, w, 15, o.bg || '#2a1608', o.line || '#8a6038'); P.hl(x + 1, y + 1, w - 2, '#4a2c18');
      P.text(o.text, x + 5, y + 3, o.ink || '#3fb6c9', 2);
    }
  });
  function P0w(o) { return (String(o.text).length * 8) + 8; }
  def('plantB', {   // 前景左下的盆栽
    layer: 'stand',
    box: function (o) { return [o.x - 22, o.base - 58, 44, 58]; },
    base: function (o) { return o.base; },
    draw: function (P, o, S) {
      var x = o.x, b = o.base;
      shadow(P, x - 14, b - 1, 30, 3, 0.4);
      // 盆
      P.rect(x - 11, b - 18, 22, 18, '#a8582e'); P.hl(x - 12, b - 19, 24, '#c96e3c'); P.rect(x - 13, b - 21, 26, 3, '#b8643a'); P.hl(x - 13, b - 21, 26, '#d8844c');
      P.vl(x - 9, b - 16, 14, '#c26a38'); P.vl(x + 8, b - 16, 14, '#8a4422'); P.frame(x - 11, b - 18, 22, 18, C.ol); P.frame(x - 13, b - 21, 26, 3, C.ol);
      // 葉子（龜背芋）
      var L = [[-14, -44, 13, 7], [6, -50, 14, 8], [-4, -58, 11, 7], [12, -34, 11, 6], [-18, -30, 11, 6], [-2, -40, 12, 7], [4, -26, 10, 5], [-10, -24, 9, 5]];
      var sway = Math.floor(S.t * 1.2) % 2;
      L.forEach(function (l, i) {
        var lx = x + l[0] + (i % 2 ? sway : 0), ly = b + l[1];
        P.ellipse(lx, ly, l[2], l[3], '#163a25'); P.ellipse(lx, ly - 1, l[2] - 1, l[3] - 1, i % 3 ? '#2e7d52' : '#235c38');
        P.hl(lx - l[2] + 3, ly - 2, l[2], '#4ea468'); P.vl(lx, ly - l[3] + 2, l[3] * 2 - 3, '#235c38');
        if (l[2] > 10) { P.px(lx - 4, ly + 1, '#163a25'); P.px(lx + 4, ly + 1, '#163a25'); }
      });
      P.vl(x - 1, b - 30, 10, '#235c38'); P.vl(x + 2, b - 28, 8, '#235c38');
    }
  });

  // ================================================================ 牆上封面熱點（初版畫好的封面變成可點的區塊；overlay＝蓋上真封面）
  // o: slots:[{x,y,w,h,card,label,overlay,size}]；grid 也可以：{ grid:{ xs:[], ys:[], w, h }, cells:[[r,c,card,{overlay}]…] }
  function slotsOf(o) {
    if (o._slots) return o._slots;
    var out = [];
    (o.slots || []).forEach(function (s) { out.push(s); });
    if (o.grid) (o.cells || []).forEach(function (c) {
      var g = o.grid, ex = c[3] || {};
      out.push(Object.assign({ x: g.xs[c[1]], y: g.ys[c[0]], w: g.w, h: g.h, card: c[2], rc: c[0] + ',' + c[1] }, ex));
    });
    o._slots = out; return out;
  }
  function overOn(o, s) { var over = o.overlay; return !!s.card && !s.painted && (s.overlay === true || over === 'all' || (over === 'generic' && s.overlay === 'generic')); }
  def('wallSlots', {
    layer: 'wall',
    box: function (o) { var g = o.grid; return g ? [g.xs[0], g.ys[0], g.xs[g.xs.length - 1] + g.w - g.xs[0], g.ys[g.ys.length - 1] + g.h - g.ys[0]] : [0, 0, 1, 1]; },
    draw: function (P, o, S) {
      if (S.mask) return;
      var over = o.overlay;   // 'none'｜'generic'（只蓋沒有對應專輯的那幾格）｜'all'
      if (!S.hires) slotsOf(o).forEach(function (s) {
        if (!overOn(o, s)) return;
        var sz = Math.min(s.w, s.h) - 1, x = s.x + ((s.w - sz) >> 1), y = s.y + ((s.h - sz) >> 1);
        shadow(P, x + 2, y + 2, sz, sz, 0.3);
        P.rect(x - 1, y - 1, sz + 2, sz + 2, '#e9dcc0');
        cover(P, S, s.card, x, y, sz);
        P.hl(x, y, sz, 'rgba(255,255,255,0.18)');
      });
      if (o.debug) slotsOf(o).forEach(function (s) { P.frame(s.x, s.y, s.w, s.h, s.card ? (s.painted ? '#5ee07a' : '#f0c75e') : '#c11628'); });
    },
    // 高解析層：蓋上去的真封面跟初版手繪封面一樣細（原圖直接縮到裝置像素）
    hires: function (V, o, S) {
      slotsOf(o).forEach(function (s) {
        if (!overOn(o, s)) return;
        var sz = Math.min(s.w, s.h) - 1;
        hiCover(V, S, s.card, s.x + ((s.w - sz) >> 1), s.y + ((s.h - sz) >> 1), sz, { frame: '#e9dcc0', shadow: 0.3 });
      });
    },
    hots: function (o, S) {
      // 卡池裡的唱片（蓋上去的真封面）＝開唱片資訊；初版手繪、卡池沒有的（painted）＝點了只亮名字
      return slotsOf(o).filter(function (s) { return s.card || s.painted; }).map(function (s) {
        var r = [s.x, s.y, s.w, s.h];
        if (s.card && !s.painted) { var cd = S.card(s.card); return { id: (o.id || 'rack') + ':' + s.card, rect: r, label: s.label || (cd ? cd.album : s.card), action: 'wall-record:' + s.card }; }
        return { id: (o.id || 'rack') + ':' + s.painted, rect: r, label: s.label || '初版手繪封面', action: 'wall-painted:' + s.painted };
      });
    }
  });

  // ================================================================ 唱盤區對決特效（v3；stage.js 的 clash() 每格把狀態填進 S.state.fx）
  // fx = { discs:[{x,y,attr,kind:'disc'|'ace',fr,crack,split,ghost,flat,void}], trails:[[x,y,c]], sparks:[{x,y,size,c}], shards:[[x,y,w,attr]],
  //        notes:[{x,y,c}], flag:{x,y,side}, dots:[[x,y,c]], excl:[{x,y}] }
  def('duelfxB', {
    layer: 'front',
    box: function () { return [0, 0, 1, 1]; },
    draw: function (P, o, S) {
      var fx = S.state.fx; if (!fx || S.mask) return;
      (fx.shards || []).forEach(function (q) { var w = (q[2] || 3) + 2; P.rect(q[0] - 1, q[1] - 1, w + 2, 5, '#9a9aa6'); P.rect(q[0], q[1], w, 3, C.vin); P.hl(q[0], q[1], w - 1, '#5a5a66'); if (q[3]) P.rect(q[0] + 1, q[1] + 1, 2, 2, ATTR[q[3]] || C.rugLb); });
      (fx.discs || []).filter(function (d) { return d.flat; }).forEach(function (d) { flatDisc(P, d.x, d.y, d.attr, d); });
      (fx.trails || []).forEach(function (t) { P.rect(Math.round(t[0]) - 1, Math.round(t[1]) - 1, 2, 2, t[2] || 'rgba(255,241,194,0.7)'); });
      (fx.discs || []).filter(function (d) { return !d.flat; }).forEach(function (d) { disc(P, Math.round(d.x), Math.round(d.y), d.attr, d.r || 5, d.fr || 0, d); });
      (fx.dots || []).forEach(function (q) { P.rect(q[0], q[1], 2, 2, q[2] || '#e8e8ee'); });
      if (fx.flag) flag(P, fx.flag.x, fx.flag.y, fx.flag.side);
    }
  });
  def('duelglowB', {
    layer: 'glow',
    box: function () { return [0, 0, 1, 1]; },
    draw: function (P, o, S) {
      var fx = S.state.fx; if (!fx || S.mask) return;
      (fx.sparks || []).forEach(function (q) { spark(P, Math.round(q.x), Math.round(q.y), q.size || 'small', q.c || '#fff1c2'); });
      (fx.notes || []).forEach(function (n) { note(P, Math.round(n.x), Math.round(n.y), n.c); });
      (fx.excl || []).forEach(function (q) { excl(P, q.x, q.y); });
    }
  });
  // 飛行唱片（直徑 2r+1，圓標＝屬性色，亮點繞圈）；王牌盤＝銀邊＋金圓標
  function disc(P, x, y, attr, r, fr, o) {
    o = o || {};
    var c = P.ctx, ga = c.globalAlpha; if (o.ghost) c.globalAlpha = o.ghost;
    if (o.split) {   // 裂成三塊往外散（k＝散開幾格）
      var k = o.split;
      [[-k, -k - 1, 0], [k + 1, k - 1, 1], [-k - 1, k + 1, 2]].forEach(function (q) {
        var cx = x + q[0], cy = y + q[1];
        c.save(); c.beginPath();
        if (q[2] === 0) c.rect(x - r - 1 + q[0], y - r - 1 + q[1], r + 1, r + 1);
        else if (q[2] === 1) c.rect(x + q[0], y - r - 1 + q[1], r + 2, r + 2);
        else c.rect(x - r - 1 + q[0], y + q[1], r + 1, r + 2);
        c.clip(); disc(P, cx, cy, attr, r, 0, { void: o.void }); c.restore();
      });
      c.globalAlpha = ga; return;
    }
    var ace = o.kind === 'ace', vd = o.void;
    P.ellipse(x, y, r + 1, r + 1, C.olS);
    P.ellipse(x, y, r, r, ace ? '#c9c9d2' : vd ? '#55555f' : C.vin);
    if (ace) P.ellipse(x, y, r - 1, r - 1, C.vin);
    P.ring(x, y, r - 2, r - 2, vd ? '#6a6a74' : C.vinG);
    P.ellipse(x, y, 2, 2, vd ? '#9a9aa4' : ace ? C.gold : (ATTR[attr] || C.rugLb)); P.px(x, y, C.ol);
    var a = (fr || 0) * Math.PI / 2; P.px(Math.round(x + Math.cos(a) * (r - 1)), Math.round(y + Math.sin(a) * (r - 1)), ace ? '#fff1c2' : C.vinHi);
    if (o.crack) { P.px(x - 1, y - 3, '#e8e8ee'); P.px(x, y - 2, '#e8e8ee'); P.px(x + 1, y - 1, '#e8e8ee'); P.px(x + 1, y + 2, '#e8e8ee'); P.px(x + 2, y + 3, '#e8e8ee'); }
    c.globalAlpha = ga;
  }
  // 平躺在地毯上的唱片（輸家落地、平手）
  function flatDisc(P, x, y, attr, o) {
    var vd = o && o.void;
    P.ellipse(x, y, 10, 4, '#9a9aa6'); P.ellipse(x, y, 9, 3, vd ? '#55555f' : C.vin); P.ring(x, y, 6, 2, '#34343c');
    P.ellipse(x, y, 3, 1, vd ? '#9a9aa4' : (o && o.kind === 'ace') ? C.gold : (ATTR[attr] || C.rugLb)); P.px(x, y, C.ol); P.hl(x - 6, y - 2, 4, '#6a6a76');
  }
  function spark(P, x, y, size, c) {
    if (size === 'ring') {   // 一圈白點「鏘」
      for (var i = 0; i < 10; i++) { var a = i / 10 * Math.PI * 2; P.rect(Math.round(x + Math.cos(a) * 9) - 1, Math.round(y + Math.sin(a) * 7) - 1, 2, 2, c || '#ffffff'); }
      P.rect(x - 1, y - 1, 3, 3, '#ffffff'); return;
    }
    var n = size === 'big' ? 7 : size === 'huge' ? 10 : 4;
    P.rect(x - 1, y - n, 3, n * 2 + 1, c); P.rect(x - n, y - 1, n * 2 + 1, 3, c);
    P.rect(x - 2, y - 2, 5, 5, '#ffffff');
    var d = Math.round(n * 0.6); P.rect(x - d - 1, y - d - 1, 2, 2, c); P.rect(x + d, y - d - 1, 2, 2, c); P.rect(x - d - 1, y + d, 2, 2, c); P.rect(x + d, y + d, 2, 2, c);
  }
  function note(P, x, y, c) {
    var R = ['..kkk', '..k.k', '..k.k', '..k..', 'kkk..', 'kkk..'];
    [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (d) { P.sprite(R, x + d[0], y + d[1], null, { sil: '#fff', k: 2 }); });
    P.sprite(R, x, y, { k: c || C.gold }, { k: 2 });
  }
  function excl(P, x, y) {
    [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (d) { P.rect(x + d[0], y + d[1], 3, 9, '#fff'); P.rect(x + d[0], y + 11 + d[1], 3, 3, '#fff'); });
    P.rect(x, y, 3, 9, '#e0303f'); P.rect(x, y + 11, 3, 3, '#e0303f');
  }
  function flag(P, x, y, side) {   // 三角旗：黑＝你、白＝他；旗尖指贏家
    var bk = side === 'p', dir = side === 'p' ? 1 : -1, fg = bk ? '#111' : '#fff', bd = bk ? '#fff' : '#111';
    P.vl(x, y, 26, '#c9973e'); P.vl(x + 1, y, 26, '#8a6020'); P.px(x, y - 1, '#f0d080');
    for (var j = 0; j < 13; j++) { var len = Math.round(14 * (1 - Math.abs(j - 6) / 7)); if (len <= 0) continue; P.hl(dir > 0 ? x + 2 : x - len - 1, y + j, len, fg); P.px(dir > 0 ? x + 2 + len : x - len - 2, y + j, bd); }
    P.hl(dir > 0 ? x + 2 : x - 2, y, 1, bd); P.hl(dir > 0 ? x + 2 : x - 2, y + 12, 1, bd);
  }
  // 手上拿的東西（shop.js 的 hold）：{ sleeve: 卡 id }＝封套（真封面）；'ace'＝王牌（金框）；{ disc: 屬性 }＝要丟的唱片
  DS.hook('holdDraw', function (P, a, hx, hy, K, S) {
    var h = a.hold; if (!h) return;
    if (h === 'ace' || h.ace) {
      P.rect(hx - 12, hy - 12, 24, 24, C.goldLo); P.rect(hx - 11, hy - 11, 22, 22, C.gold); P.rect(hx - 10, hy - 10, 20, 20, '#1c120b');
      if (h.card) cover(P, S, h.card, hx - 9, hy - 9, 18);
      else { P.ellipse(hx, hy, 7, 7, '#c9c9d2'); P.ellipse(hx, hy, 6, 6, C.vin); P.ellipse(hx, hy, 2, 2, C.gold); P.px(hx, hy, C.ol); }
      if (Math.floor(S.t * 4) % 2 === 0) { P.rect(hx + 11, hy - 14, 2, 2, '#fff1c2'); P.rect(hx - 14, hy + 10, 2, 2, '#fff1c2'); }
      return;
    }
    if (h.sleeve) { P.rect(hx - 11, hy - 11, 22, 22, '#2a1608'); cover(P, S, h.sleeve, hx - 10, hy - 10, 20); P.hl(hx - 10, hy - 10, 20, 'rgba(255,255,255,0.22)'); return; }
    if (h.disc) disc(P, hx, hy, h.disc, 5, Math.floor(S.t * 16) % 4, { kind: h.kind });
  });
  window.DipPropsB = { C: C, ATTR: ATTR, disc: disc, flatDisc: flatDisc, spark: spark, note: note, flag: flag, cover: cover, hiCover: hiCover };
})();
