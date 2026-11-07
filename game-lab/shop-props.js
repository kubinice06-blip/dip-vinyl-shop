/* shop-props.js：DipShop 道具庫。
 *   前兩段（格子版：地下室、台北地圖）：每個道具都畫在同一個像素格上（1 格 = 1 小人格）。
 *   最後一段（斜俯視 3/4：本店 dip，店主選的路線 P2）：DipShop.defO 註冊，見那一段的說明。
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

/* ===================================================================== 斜俯視 3/4 道具（本店 dip，layout.projection＝'oblique34'；店主 2026-11-07「我覺得這個背景製作的還不錯」＝路線 P2）
 * 座標：x 左→右、y＝地板前緣（越下越近）、高度直接往上減；所有東西同一比例（人 48 格＝1.70 m）。
 * 畫筆 P 是 shop.js 的 OPainter：P.r／p／a／ell／line／ptext／pwidth／text／textW／cover／img，畫到裝置像素（1 美術格＝k 裝置 px，最近鄰）。
 * DipShop.defO(type, { layer:'bg'|'wall'|'fx'|（預設＝跟小人一起按 o.y 排序）, dyn, box(o), foot(o), hots(o,S), draw(P,o,S), glow(P,o,S) })
 *   dyn＝每格重畫（門、櫃檯上轉的唱盤、唱盤台）；其他道具烤成點陣圖快取。glow＝打光之後畫（燈、音符）。
 */
(function () {
  'use strict';
  var DS = window.DipShop; if (!DS || !DS.defO) return;
  var defO = DS.defO, O = DS.O34, C = O.C, hash = O.hash, shade = O.shade, SLEEVES = O.SLEEVES, ACC = O.SLEEVE_ACC;
  var ATTR = { c: '#1f5fae', o: '#6a3fa0', h: '#c11628' };   // 經、冷、硬（圓標色）
  function sh(s) { var h = 7; s = String(s); for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h; }
  function shadowRect(P, x, y, w, h, a) { P.a(a == null ? 0.35 : a, function () { P.r(x, y, w, h, '#1b0e05'); }); }
  function cardLabel(S, id) { var c = S.card(id); return c ? c.album : id; }

  // ================================================================ 地板（窄木條，長短不一、木紋、木節）
  defO('floor', {
    layer: 'bg',
    draw: function (P, o, S) {
      var L = S.L, y0 = L.wallBase, y1 = L.size[1], Wd = L.size[0];
      var cols = ['#8e5a35', '#865330', '#93613b', '#7e4e2c', '#9a673e', '#8a5733', '#83512e', '#965f37'];
      var BW = 6;
      for (var bx = 0, i = 0; bx < Wd; bx += BW, i++) {
        var y = y0 - Math.floor(hash(i, 1, 1) * 45), j = 0;
        while (y < y1) {
          var len = 30 + Math.floor(hash(i, j, 7) * 46);
          var base = cols[Math.floor(hash(i, j, 3) * cols.length)];
          var ys = Math.max(y, y0), ye = Math.min(y + len, y1);
          if (ye > ys) {
            P.r(bx, ys, Math.min(BW, Wd - bx), ye - ys, base);
            P.r(bx + 1, ys, 1, ye - ys, shade(base, 0.08));
            var ng = 2 + Math.floor((ye - ys) / 10);
            for (var g = 0; g < ng; g++) {
              var gx = bx + 2 + Math.floor(hash(i, j * 13 + g, 17) * (BW - 2));
              var gy = ys + Math.floor(hash(i, j * 13 + g, 19) * Math.max(1, ye - ys - 2));
              var gl = 2 + Math.floor(hash(i, j * 13 + g, 23) * 9);
              P.r(gx, gy, 1, Math.min(gl, ye - gy), shade(base, hash(i, j * 13 + g, 29) < 0.6 ? -0.14 : 0.1));
            }
            if (hash(i, j, 99) < 0.12) { var kx = bx + 2 + Math.floor(hash(i, j, 98) * 3), ky = ys + 3 + Math.floor(hash(i, j, 97) * Math.max(1, ye - ys - 6)); P.r(kx, ky, 2, 1, shade(base, -0.32)); P.p(kx, ky + 1, shade(base, -0.2)); }
            if (y + len < y1) P.r(bx, y + len - 1, Math.min(BW, Wd - bx), 1, '#4b2d18');
          }
          y += len; j++;
        }
        P.r(bx, y0, 1, y1 - y0, '#4f301b');
      }
      // 走道與唱盤區磨得比較亮（很淡）
      P.a(0.07, function () { (o.worn || [[48, 96, 48, 226], [186, 210, 26, 112], [40, 270, 212, 52]]).forEach(function (r) { P.r(r[0], r[1], r[2], r[3], '#f4dcb8'); }); });
      shadowRect(P, 0, y0, Wd, 2, 0.4);
    }
  });

  // ================================================================ 後牆＋左右收邊（灰白漆牆、天花板梁影、管線、踢腳板）
  defO('backWall', {
    layer: 'bg',
    draw: function (P, o, S) {
      var L = S.L, Wd = L.size[0], base = L.wallBase, H = L.size[1];
      P.r(6, 6, Wd - 12, base - 6, C.wall);
      for (var yy = 6; yy < base; yy++) for (var xx = 6; xx < Wd - 6; xx++) {
        var r = hash(xx, yy, 5);
        if (r < 0.035) P.p(xx, yy, C.wallD); else if (r > 0.975) P.p(xx, yy, C.wallL);
      }
      P.r(6, 6, Wd - 12, 1, C.wallDD); P.r(6, 7, Wd - 12, 2, C.wallD);
      P.r(6, 6, 2, base - 6, C.wallD); P.r(Wd - 8, 6, 2, base - 6, C.wallD);
      P.r(150, 9, 1, 3, C.wallDD); P.r(151, 12, 1, 2, C.wallDD);
      P.r(8, 9, 130, 1, '#bdb6a6'); P.r(8, 10, 130, 1, '#d6cfbf');
      P.r(6, base - 3, Wd - 12, 3, C.walnut); P.r(6, base - 3, Wd - 12, 1, C.walnutL);
      P.r(0, 0, Wd, 6, C.cap); P.r(0, 5, Wd, 1, C.capL);
      P.r(0, 0, 6, H, C.cap); P.r(5, 6, 1, H - 6, C.capL);
      P.r(Wd - 6, 0, 6, H, C.cap); P.r(Wd - 6, 6, 1, H - 6, C.capL);
    }
  });

  defO('meterBox', {
    layer: 'wall',
    draw: function (P, o) {
      var x = o.x, y = o.y;
      P.r(x + 5, 6, 1, y - 6, '#bdb6a6');
      P.r(x - 1, y - 1, 14, 11, '#9d968a'); P.r(x, y, 12, 9, '#ece6d6'); P.r(x, y, 12, 1, '#f7f3ea');
      P.r(x + 2, y + 2, 4, 3, '#4e5a52'); P.r(x + 7, y + 2, 3, 1, '#7d776c'); P.r(x + 7, y + 4, 3, 1, '#7d776c'); P.r(x + 2, y + 6, 8, 1, '#c9c2b2');
    }
  });

  // ================================================================ 門（青綠色門板、米色告示、OPEN；開＝雨夜街景，門外的人畫在門洞裡）
  function doorStreet(P, x, y, w, h) {
    P.r(x, y, w, h, '#1d2a42');
    P.r(x, y + h - 14, w, 14, '#2a3346'); P.r(x, y + h - 14, w, 1, '#46516a');
    for (var i = 0; i < 26; i++) { var rx = x + Math.floor(hash(i, 3, 3) * w), ry = y + Math.floor(hash(i, 4, 3) * (h - 4)); P.a(0.5, function () { P.r(rx, ry, 1, 3, '#9fb4d6'); }); }
    P.a(0.35, function () { P.r(x + 2, y + 6, 10, 16, '#f2c96d'); });
  }
  function doorPanel(P, x, y, w, h) {
    P.r(x, y, w, h, C.teal);
    P.r(x, y, 1, h, C.tealL); P.r(x, y, w, 1, C.tealL); P.r(x + w - 1, y, 1, h, C.tealD);
    for (var yy = y + 2; yy < y + h - 4; yy += 3) for (var xx = x + 2; xx < x + w - 2; xx += 4) if (hash(xx, yy, 41) < 0.12) P.p(xx, yy, shade(C.teal, 0.08));
    P.r(x + 4, y + 7, 15, 17, '#a99b7c'); P.r(x + 5, y + 8, 13, 15, '#d8c9a5');
    P.r(x + 6, y + 10, 9, 1, '#9a8b6c'); P.r(x + 6, y + 12, 6, 1, '#9a8b6c'); P.r(x + 6, y + 20, 11, 1, '#b8a984');
    P.p(x + 5, y + 8, '#efe7d2'); P.p(x + 17, y + 8, '#efe7d2');
    P.r(x + w - 6, y + 31, 3, 3, C.chromeD); P.r(x + w - 6, y + 31, 2, 2, C.chrome); P.p(x + w - 5, y + 36, C.chromeD);
    P.r(x + 1, y + h - 5, w - 2, 5, C.tealD); P.r(x + 1, y + h - 5, w - 2, 1, shade(C.teal, 0.1));
    P.r(x + 8, y + 27, 12, 6, '#1d1712'); P.ptext('OPEN', x + 8, y + 28, '#f2c540');
  }
  defO('door', {
    layer: 'wall', dyn: true,
    box: function (o) { return [o.x, o.y, o.w, o.h]; },
    draw: function (P, o, S) {
      var x = o.x, y = o.y, w = o.w, h = o.h, st = (S.state && S.state.door) || o.state || 'closed';
      P.r(x - 3, y - 3, w + 6, h + 3, '#f4f0e6'); P.r(x - 3, y - 3, w + 6, 1, '#ffffff'); P.r(x + w + 2, y - 3, 1, h + 3, '#cdc6b6');
      P.r(x - 1, y - 1, w + 2, h + 1, '#bdb5a2');
      if (st === 'open' || st === 'ajar') {
        doorStreet(P, x, y, w, h);
        if (S.drawOutside) S.drawOutside(P, [x, y, w, h]);
        if (st === 'open') { P.r(x - 1, y, 3, h + 6, C.tealD); P.r(x - 1, y, 1, h + 6, C.tealL); }
        else {   // 半開：門板往內轉，只看得到一條窄的門板（斜的，下緣靠前）
          var pw = 9; P.r(x, y, pw, h + 4, C.tealD); P.r(x, y, 1, h + 4, C.tealL); P.r(x + pw - 1, y, 1, h + 4, C.tealDD);
          P.r(x + 2, y + 9, pw - 4, 12, '#a99b7c'); P.r(x + pw - 3, y + 31, 2, 3, C.chrome);
        }
        return;
      }
      doorPanel(P, x, y, w, h);
      // 門外有人在等：門縫下面兩塊影子
      if (S.outsideCount && S.outsideCount() > 0) P.a(0.55, function () { P.r(x + 6, y + h - 1, 6, 1, '#1d1712'); P.r(x + 15, y + h - 1, 6, 1, '#1d1712'); });
    }
  });

  // ================================================================ 牆上面朝外的唱片架（每張都是熱點：點了看唱片資訊）
  function ledgeCells(o) { var n = o.n || 7, cw = 12, pitch = 14, out = []; for (var i = 0; i < n; i++) out.push({ i: i, id: (o.cards || [])[i] || null, x: o.x + 3 + i * pitch, y: o.y - cw, w: cw, h: cw }); return out; }
  defO('ledge', {
    layer: 'wall',
    box: function (o) { var n = o.n || 7; return [o.x, o.y - 13, n * 14 + 4, 18]; },
    draw: function (P, o) {
      ledgeCells(o).forEach(function (c) {
        var id = c.id || P.poolPick(sh(o.y) + c.i);
        shadowRect(P, c.x + 1, c.y + 1, c.w, c.h, 0.18);
        P.r(c.x - 1, c.y - 1, c.w + 2, c.h + 1, '#2a201a');
        P.cover(id, c.x, c.y, c.w, c.h);
      });
      var lw = (o.n || 7) * 14 + 4;
      P.r(o.x, o.y, lw, 2, C.pine); P.r(o.x, o.y, lw, 1, C.pineL); P.r(o.x, o.y + 2, lw, 1, C.pineDD);
      shadowRect(P, o.x + 1, o.y + 3, lw, 1, 0.2);
      P.r(o.x + 2, o.y + 3, 1, 2, '#3a3430'); P.r(o.x + lw - 3, o.y + 3, 1, 2, '#3a3430');
    },
    hots: function (o, S) {
      return ledgeCells(o).filter(function (c) { return c.id; }).map(function (c) { return { id: 'rack:' + c.id, rect: [c.x, c.y, c.w, c.h], label: cardLabel(S, c.id), action: 'wall-record:' + c.id, sub: true }; });
    }
  });

  defO('speaker', {
    layer: 'wall',
    draw: function (P, o) {
      var x = o.x, y = o.y;
      P.r(x + 3, y - 2, 2, 2, '#4a4a4a');
      P.r(x - 1, y - 1, 9, 12, '#0e0e10'); P.r(x, y, 7, 10, '#232327'); P.r(x, y, 7, 1, '#3a3a40');
      P.ell(x + 3.5, y + 3, 1.6, 1.6, '#3d3d44'); P.p(x + 3, y + 2, '#5a5a62');
      P.ell(x + 3.5, y + 7, 2.4, 2.2, '#3d3d44'); P.p(x + 3, y + 7, '#111');
    }
  });

  // ================================================================ 窗（黃昏下雨的台北街景、陽台鐵窗、直立招牌、貼在玻璃上的海報）
  defO('window', {
    layer: 'wall',
    draw: function (P, o) {
      var x = o.x, y = o.y, w = o.w, h = o.h, b;
      var sky = ['#34476f', '#3c5079', '#465a84', '#51658e', '#5d7099', '#6a7ba3'];
      for (var yy = 0; yy < h; yy++) P.r(x, y + yy, w, 1, sky[Math.min(sky.length - 1, Math.floor(yy / 4))]);
      P.r(x + 58, y + 4, 44, h - 4, '#323a4d'); P.r(x, y + 15, 60, h - 15, '#3b4357'); P.r(x, y + 15, 60, 1, '#4b5469');
      for (b = 0; b < 30; b++) {
        var wx = x + 3 + (b % 6) * 9, wy = y + 18 + Math.floor(b / 6) * 6; if (wy > y + h - 6) continue;
        P.r(wx, wy, 5, 3, hash(b, 2, 9) < 0.45 ? '#f0c96d' : '#283044'); P.r(wx, wy + 3, 5, 1, '#2f3647');
      }
      for (b = 0; b < 16; b++) { var vx = x + 62 + (b % 4) * 10, vy = y + 8 + Math.floor(b / 4) * 9; P.r(vx, vy, 6, 4, hash(b, 5, 9) < 0.5 ? '#e9d08a' : '#273043'); }
      P.r(x + 2, y + 31, 56, 1, '#596179'); for (b = 0; b < 14; b++) P.r(x + 3 + b * 4, y + 31, 1, 4, '#596179');
      P.r(x + 44, y + 23, 7, 4, '#c7c9cc'); P.r(x + 44, y + 27, 7, 1, '#7f8288');
      P.r(x + 52, y + 17, 4, 13, '#e2483b'); P.r(x + 53, y + 18, 2, 11, '#ff8a78');
      P.r(x + 36, y, 2, h, '#1e2028'); P.r(x + 31, y + 6, 12, 1, '#1e2028');
      P.line(x, y + 9, x + 36, y + 7, '#1e2028'); P.line(x + 38, y + 7, x + w, y + 12, '#1e2028'); P.line(x, y + 12, x + 36, y + 9, '#262833');
      P.r(x, y + h - 5, w, 5, '#2b3040'); P.r(x, y + h - 5, w, 1, '#4c5468');
      P.r(x + 70, y + h - 4, 7, 2, '#202432'); P.p(x + 76, y + h - 4, '#ffe08a');
      for (var r = 0; r < 70; r++) { var rx = x + Math.floor(hash(r, 11, 2) * w), ry = y + Math.floor(hash(r, 12, 2) * (h - 3)); P.a(0.45, function () { P.r(rx, ry, 1, 2, '#a9bcd8'); }); }
      function poster(px, py, pw, ph, bg, fn) { shadowRect(P, px + 1, py + 1, pw, ph, 0.3); P.r(px, py, pw, ph, bg); fn(px, py, pw, ph); P.p(px, py, '#f5f1e6'); P.p(px + pw - 1, py, '#f5f1e6'); }
      poster(x + 55, y + 14, 15, 21, '#f0c43c', function (px, py) { P.r(px + 2, py + 2, 11, 7, '#1d1712'); P.r(px + 4, py + 3, 3, 5, '#e2483b'); P.r(px + 8, py + 4, 3, 4, '#f6efe0'); P.r(px + 2, py + 11, 11, 1, '#1d1712'); P.r(px + 2, py + 13, 8, 1, '#1d1712'); P.r(px + 2, py + 16, 11, 3, '#c0392b'); });
      poster(x + 80, y + 12, 15, 22, '#1d1d22', function (px, py) { P.ell(px + 7.5, py + 7, 4.5, 4.5, '#d63d33'); P.ell(px + 7.5, py + 7, 1.5, 1.5, '#1d1d22'); P.r(px + 2, py + 14, 11, 1, '#f3eee2'); P.r(px + 2, py + 16, 9, 1, '#bdb8ad'); P.r(px + 2, py + 18, 11, 1, '#f0c43c'); });
      poster(x + 31, y + 19, 10, 13, '#ebe6da', function (px, py) { P.r(px + 1, py + 1, 8, 6, '#3f6fa6'); P.r(px + 1, py + 8, 8, 1, '#3a3a3a'); P.r(px + 1, py + 10, 5, 1, '#3a3a3a'); });
      P.a(0.10, function () { for (var g = 0; g < 18; g++) { P.p(x + 8 + g, y + 30 - g, '#ffffff'); P.p(x + 66 + g, y + 40 - g, '#ffffff'); } });
      var F = '#24252b', FL = '#3c3e46';
      P.r(x - 2, y - 2, w + 4, 2, F); P.r(x - 2, y, 2, h, F); P.r(x + w, y, 2, h, F);
      [25, 51, 76].forEach(function (m) { P.r(x + m, y, 2, h, F); P.r(x + m, y, 1, h, FL); });
      P.r(x, y + 10, w, 2, F); P.r(x, y + 10, w, 1, FL);
      P.r(x - 4, y + h, w + 8, 3, '#efe9dc'); P.r(x - 4, y + h, w + 8, 1, '#ffffff'); shadowRect(P, x - 3, y + h + 3, w + 6, 1, 0.25);
    }
  });

  defO('tees', {
    layer: 'wall',
    draw: function (P, o) {
      var x = o.x;
      P.r(x - 2, 6, 1, 4, '#3a3a3a'); P.r(x + 34, 6, 1, 4, '#3a3a3a'); P.r(x - 3, 9, 39, 1, '#2a2a2a');
      function tee(tx, c, cd, deco) {
        P.r(tx + 5, 10, 1, 2, '#555'); P.r(tx + 2, 11, 7, 1, '#666');
        P.r(tx - 1, 12, 13, 1, '#1d1712');
        P.r(tx - 1, 12, 13, 5, c); P.r(tx + 1, 17, 9, 15, c); P.r(tx - 1, 16, 2, 1, cd); P.r(tx + 10, 16, 2, 1, cd);
        P.r(tx + 9, 17, 1, 15, cd); P.r(tx + 4, 12, 3, 1, cd); P.r(tx + 1, 31, 9, 1, cd);
        if (deco) deco(tx);
      }
      tee(x + 22, '#2b2b30', '#1c1c20', function (tx) { P.r(tx + 3, 19, 5, 4, '#e9e4d8'); });
      tee(x + 11, '#ebe7df', '#c9c4b8', function (tx) { P.r(tx + 3, 18, 2, 2, '#3f6fa6'); P.r(tx + 5, 20, 3, 2, '#c0392b'); P.p(tx + 4, 23, '#2b2b30'); });
      tee(x, '#b9a47c', '#97845f', function (tx) { P.r(tx + 2, 18, 6, 1, '#6b5b3c'); P.r(tx + 3, 20, 4, 3, '#efe9dc'); P.p(tx + 4, 21, '#3f6fa6'); });
    }
  });

  defO('trackLights', {
    layer: 'wall',
    lights: function (o) { return (o.xs || []).map(function (x) { return [x + 2, 30, 20, 26, 'rgba(255,214,150,1)', 0.22]; }); },
    draw: function (P, o, S) {
      P.r(6, 6, S.L.size[0] - 12, 1, '#151515');
      o.xs.forEach(function (x) { P.r(x, 7, 1, 1, '#151515'); P.r(x - 1, 8, 5, 3, '#1b1b1d'); P.r(x - 1, 8, 5, 1, '#3a3a3e'); P.r(x, 11, 3, 1, '#fff2c8'); });
    },
    glow: function (P, o) { o.xs.forEach(function (x) { P.a(0.5, function () { P.r(x - 1, 11, 5, 2, '#fff3d0'); }); P.r(x, 11, 3, 1, '#fffbea'); }); }
  });
  function stringPts(o) {
    var pts = [], segs = 3, Ls = (o.x1 - o.x0) / segs;
    for (var xx = o.x0; xx <= o.x1; xx++) { var t = ((xx - o.x0) % Ls) / Ls; pts.push([xx, Math.round(o.y + 6 * 4 * t * (1 - t))]); }
    return pts;
  }
  defO('stringLights', {
    layer: 'wall',
    draw: function (P, o) {
      var pts = stringPts(o);
      pts.forEach(function (p) { P.p(p[0], p[1], '#2a2420'); });
      for (var i = 4; i < pts.length; i += 9) { P.r(pts[i][0], pts[i][1] + 1, 2, 2, '#ffe7a0'); P.p(pts[i][0], pts[i][1] + 1, '#fffbe6'); }
    },
    glow: function (P, o) {
      var pts = stringPts(o);
      for (var i = 4; i < pts.length; i += 9) { var p = pts[i]; P.a(0.28, function () { P.r(p[0] - 1, p[1], 4, 4, '#fff1c4'); }); P.p(p[0], p[1] + 1, '#fffdf2'); }
    }
  });

  // ================================================================ 唱片箱桌（中島、靠牆矮櫃、噪音二手箱）
  // 每欄一格寬 12 的唱片；欄間 1 格縫；兩側 2 格木框。h＝前緣高、rec＝唱片高出前緣多少；front＝最前面朝外的封面
  function binW(cols) { return cols * 12 + (cols - 1) + 4; }
  function binGeo(o) {
    var cols = o.cols || 3, d = o.d, h = o.h, rec = o.rec || 8, w = binW(cols), fy = o.y;
    var nSec = o.sections || (d >= 20 ? 2 : 1), secD = d / nSec, fill = Math.max(4, Math.round(secD * 0.5));
    var zF = fy - d + Math.round(secD * nSec) - 1, bandBot = zF - h - rec;
    return { cols: cols, w: w, lip: fy - h, back: fy - d - h, top: Math.min(fy - d - h, zF - fill - 2 - h - rec - 5), bandBot: bandBot };
  }
  function binFrontCovers(o) {   // 最前面那排朝外的封面（熱點用；畫的時候每欄會多 ±1 格的前後）
    var g = binGeo(o), out = [];
    for (var c = 0; c < g.cols; c++) { var id = (o.front && o.front[c]) || (o.cards && o.cards[c]); if (id) out.push({ id: id, x: o.x + 2 + c * 13, y: g.bandBot - 1, w: 12, h: g.lip - (g.bandBot - 1) }); }
    return out;
  }
  defO('binTable', {
    box: function (o) { var g = binGeo(o); return [o.x - 1, g.top, g.w + 2, o.y - g.top]; },
    foot: function (o) { return [o.x - 1, o.y - o.d, binW(o.cols || 3) + 2, o.d]; },
    hots: function (o, S) {
      if (!o.hotCovers) return [];
      return binFrontCovers(o).map(function (c) { return { id: 'rack:' + c.id, rect: [c.x, c.y, c.w, c.h], label: cardLabel(S, c.id), action: 'wall-record:' + c.id, sub: true }; });
    },
    draw: function (P, o) {
      var x = o.x, fy = o.y, cols = o.cols || 3, d = o.d, h = o.h, rec = o.rec || 8, w = binW(cols);
      var lip = fy - h, back = fy - d - h, seed = sh(o.id || (x + '_' + fy));
      var nSec = o.sections || (d >= 20 ? 2 : 1), secD = d / nSec, fill = Math.max(4, Math.round(secD * 0.5));
      shadowRect(P, x - 1, fy - 1, w + 3, 3, 0.42); shadowRect(P, x + w, fy - d, 2, d, 0.25);
      P.r(x, back, w, d, C.interior);
      P.r(x, back, 2, d, C.pine); P.r(x, back, 1, d, C.pineL); P.r(x + w - 2, back, 2, d, C.pineD);
      for (var s = 0; s < nSec; s++) {
        var zF = fy - d + Math.round(secD * (s + 1)) - 1, front = s === nSec - 1;
        var bandBot = zF - h - rec;
        for (var c = 0; c < cols; c++) {
          var cx = x + 2 + c * 13, k0 = s * 131 + c * 17;
          var jf = fill + Math.floor(hash(seed, k0, 21) * 5) - 2, bt = zF - jf - h - rec;
          var drop = front && o.front ? 0 : Math.floor(hash(seed, k0, 22) * 3) - 1;
          for (var yy = bt; yy < bandBot + drop; yy++) {
            var r = hash(seed, k0 + yy, 11);
            var col = r < 0.07 ? ACC[Math.floor(hash(seed, k0 + yy, 13) * ACC.length)] : SLEEVES[Math.floor(hash(seed, k0 + yy, 12) * SLEEVES.length)];
            if (hash(seed, k0 + yy, 16) < 0.2) col = shade(col, -0.22);
            var l = cx + (hash(seed, k0 + yy, 14) < 0.2 ? 1 : 0), rr = cx + 12 - (hash(seed, k0 + yy, 15) < 0.2 ? 1 : 0);
            P.r(l, yy, rr - l, 1, col);
          }
          if (hash(seed, k0, 23) < 0.6) { P.r(cx, bt - 1, 12, 1, '#f8f5ee'); P.r(cx, bt, 12, 1, '#d9d3c5'); }
          if (s === 0 && (c + (seed & 1)) % 2 === 0) { var tabC = ['#f8f5ee', '#f2c540', '#ef9a74', '#9ec3e6'][(c + (seed & 3)) % 4]; P.r(cx + c * 3, bt - 4, 6, 3, tabC); }
          var fb = bandBot + drop, plain = !front && hash(seed, k0, 24) < (fy < 200 ? 0.55 : fy < 240 ? 0.38 : 0.25);
          var fid = (front && o.front && o.front[c]) || (o.cards && front && o.cards[c]) || (o.lean && s === 0 && c === 1 ? o.lean : P.poolPick(seed + s * 11 + c * 7));
          P.r(cx - 1, fb - 2, 14, 13, '#1d1712');
          if (plain) { var pc = ['#efe8d6', '#f1e4ad', '#e9ddbd'][c % 3]; P.r(cx, fb - 1, 12, 11, pc); P.r(cx, fb - 1, 12, 1, shade(pc, 0.3)); P.r(cx + 1, fb + 1, 4, 6, shade(pc, -0.12)); }
          else P.cover(fid, cx, fb - 1, 12, 11, { clipY: front ? lip : null, shade: front ? 0 : 0.06 });
          if (!front && !plain) P.a(0.2, function () { P.r(cx, fb - 1, 12, 11, '#f3ead6'); });
        }
      }
      if (o.tabs && o.tabs[0] && !/[^\x00-\x7f]/.test(o.tabs[0])) {
        var t = o.tabs[0], tw = P.pwidth(t) + 4, tx = x + 3;
        var by0 = fy - d + Math.round(secD) - 1 - fill - h - rec;
        P.r(tx - 1, by0 - 4, tw + 2, 9, '#5a4a38'); P.r(tx, by0 - 3, tw, 7, '#fbf8f0'); P.ptext(t, tx + 2, by0 - 2, '#3a2a1c');
      }
      P.r(x, lip, w, h, C.pine);
      P.r(x, lip, w, 2, C.pineL); P.r(x, lip + 2, w, 1, C.pineD);
      for (var py2 = lip + 8; py2 < fy - 4; py2 += 6) P.r(x + 1, py2, w - 2, 1, shade(C.pine, -0.1));
      P.r(x, lip, 1, h, C.pineL); P.r(x + w - 1, lip, 1, h, C.pineD);
      P.r(x + 2, fy - 3, w - 4, 3, C.pineDD); P.r(x, fy - 1, w, 1, C.pineX);
      for (var gI = 0; gI < w * h / 18; gI++) { var gx = x + 1 + Math.floor(hash(seed, gI, 61) * (w - 2)), gy = lip + 3 + Math.floor(hash(seed, gI, 62) * (h - 6)); P.r(gx, gy, 2, 1, shade(C.pine, hash(seed, gI, 63) < 0.5 ? -0.08 : 0.06)); }
      if (o.label) {
        var cjk = /[^\x00-\x7f]/.test(o.label);
        var lw = cjk ? 15 : P.pwidth(o.label) + 4, lx2 = x + Math.floor((w - lw) / 2), ly2 = lip + 6;
        P.r(lx2 - 1, ly2 - 1, lw + 2, 9, '#5a3b1e'); P.r(lx2, ly2, lw, 7, '#f3ecd9'); P.r(lx2, ly2 + 6, lw, 1, '#d6ccb4');
        if (cjk) P.text(o.label, lx2 + lw / 2, ly2 + 3.5, { size: 6, color: '#2a1a10', bold: true }); else P.ptext(o.label, lx2 + 2, ly2 + 1, '#2a1a10');
      }
      if (o.rail) {
        var rh = h + rec + 3;
        String(o.rail).split('').forEach(function (sd) {
          var rx = sd === 'L' ? x - 1 : x + w;
          P.r(rx, fy - d - rh, 1, d + 1, C.chrome); P.r(rx + (sd === 'L' ? 1 : -1), fy - d - rh, 1, d + 1, C.chromeD);
          P.r(rx, fy - rh, 1, rh - h, C.chromeD);
        });
      }
    }
  });
  defO('binCabinet', O.PROPS.binTable);

  // ================================================================ 窗下矮櫃（書背、紙箱、小盆栽、小喇叭）
  function spines(P, x, y, w, hgt, seed) {
    for (var i = 0; i < w; i++) {
      var r = hash(seed, i, 3); var c = r < 0.25 ? ACC[Math.floor(hash(seed, i, 4) * ACC.length)] : SLEEVES[Math.floor(hash(seed, i, 5) * SLEEVES.length)];
      var t = hash(seed, i, 6) < 0.2 ? 1 : 0; P.r(x + i, y + t, 1, hgt - t, c);
      if (hash(seed, i, 7) < 0.3) P.p(x + i, y + t + 2, shade(c, -0.3));
    }
  }
  defO('lowShelf', {
    foot: function (o) { return [o.x, o.y - o.d, o.w, o.d]; },
    draw: function (P, o) {
      var x = o.x, fy = o.y, w = o.w, d = o.d, h = o.h, lip = fy - h, back = fy - d - h;
      shadowRect(P, x - 1, fy - 1, w + 2, 2, 0.4);
      P.r(x, back, w, d, C.pine); P.r(x, back, w, 1, C.pineD); P.r(x, lip - 1, w, 1, C.pineL);
      P.r(x, lip, w, h, C.pineD); P.r(x, lip, w, 1, C.pineL);
      var cw = Math.floor((w - 2) / 4);
      for (var i = 0; i < 4; i++) { var cx = x + 1 + i * cw; P.r(cx + 1, lip + 2, cw - 2, h - 4, '#2a1a0e'); spines(P, cx + 2, lip + 3, cw - 4, h - 5, 300 + i); P.r(cx, lip + 1, 1, h - 2, C.pine); }
      P.r(x, fy - 2, w, 2, C.pineDD);
      P.r(x + 62, back - 5, 12, 7, '#a77b4c'); P.r(x + 62, back - 5, 12, 1, '#c29563'); P.r(x + 64, back - 10, 10, 6, '#b88a57'); P.r(x + 64, back - 10, 10, 1, '#d1a46f'); P.r(x + 67, back - 8, 4, 1, '#7d5631');
      P.r(x + 6, back - 3, 5, 5, '#b5653a'); P.r(x + 6, back - 3, 5, 1, '#d07f50'); P.ell(x + 8.5, back - 6, 4, 3, '#3f8a4a'); P.p(x + 7, back - 8, '#63ad5e'); P.p(x + 10, back - 7, '#63ad5e');
      P.r(x + 86, back - 6, 6, 8, '#232327'); P.ell(x + 89, back - 3, 1.6, 1.6, '#3d3d44');
    }
  });

  defO('plant', {
    foot: function (o) { var pw = o.size === 'big' ? 11 : 8; return [o.x - pw / 2 | 0, o.y - 4, pw, 4]; },
    draw: function (P, o) {
      var x = o.x, fy = o.y, big = o.size === 'big';
      var pw = big ? 11 : 8, ph = big ? 9 : 7;
      P.a(0.4, function () { P.ell(x, fy, pw * 0.7, 2, '#1b0e05'); });
      P.r(x - pw / 2 | 0, fy - ph, pw, ph, '#b5653a'); P.r(x - pw / 2 | 0, fy - ph, pw, 2, '#d07f50'); P.r((x - pw / 2 | 0) + pw - 2, fy - ph + 2, 2, ph - 2, '#8e4b29');
      var leaves = big ? [[-7, -40, 6, 4], [5, -43, 6, 5], [-1, -48, 5, 4], [-9, -30, 6, 4], [8, -32, 6, 4], [0, -36, 6, 5], [-5, -21, 5, 4], [6, -22, 5, 3], [1, -26, 5, 4], [-10, -46, 4, 3], [10, -42, 4, 3]]
                       : [[-4, -14, 4, 3], [4, -15, 4, 3], [0, -19, 4, 3], [-1, -11, 4, 3]];
      var stems = big ? [[0, -ph, -7, -38], [0, -ph, 5, -41], [0, -ph, -1, -46], [0, -ph, 8, -30], [0, -ph, -9, -28]] : [[0, -ph, -3, -13], [0, -ph, 3, -14], [0, -ph, 0, -18]];
      stems.forEach(function (s) { P.line(x + s[0], fy + s[1], x + s[2], fy + s[3], '#2d5a2c'); });
      leaves.forEach(function (l, i) {
        P.ell(x + l[0], fy + l[1], l[2], l[3], '#2b6236');
        P.ell(x + l[0] - 0.5, fy + l[1] - 0.5, l[2] - 1.2, l[3] - 1, i % 2 ? '#3f8a4a' : '#468f45');
        P.r(x + l[0] - (l[2] / 2 | 0), fy + l[1] - 1, l[2] - 1, 1, '#63ad5e');
        P.p(x + l[0], fy + l[1], '#2b6236');
      });
    }
  });

  // ================================================================ 櫃檯後的高櫃（上排兩張封面＋兩顆小喇叭，下兩排書背）
  function shelvingCovers(o) { var lip = o.y - o.h, y0 = lip + 2; return (o.cards || []).map(function (id, j) { return { id: id, x: o.x + 4 + j * 15, y: y0 + 2, w: 12, h: 12 }; }); }
  defO('shelving', {
    foot: function (o) { return [o.x, o.y - o.d, o.w, o.d]; },
    hots: function (o, S) { return shelvingCovers(o).map(function (c) { return { id: 'rack:' + c.id, rect: [c.x, c.y, c.w, c.h], label: cardLabel(S, c.id), action: 'wall-record:' + c.id, sub: true }; }); },
    draw: function (P, o) {
      var x = o.x, fy = o.y, w = o.w, d = o.d, h = o.h, lip = fy - h, back = fy - d - h;
      shadowRect(P, x - 2, fy - 1, w + 2, 2, 0.4);
      P.r(x, back, w, d, C.pine); P.r(x, back, w, 1, C.pineD); P.r(x, lip - 1, w, 1, C.pineL);
      P.r(x, lip, w, h, C.pineD); P.r(x, lip, 2, h, C.pine); P.r(x + w - 2, lip, 2, h, C.pineDD); P.r(x, lip, w, 2, C.pineL);
      var rows = [[lip + 2, 14], [lip + 17, 12], [lip + 30, 12]];
      rows.forEach(function (r, i) {
        P.r(x + 2, r[0], w - 4, r[1], '#2a1a0e');
        if (i === 0) {
          shelvingCovers(o).forEach(function (c) { P.r(c.x - 1, c.y - 1, 14, 13, '#1d1712'); P.cover(c.id, c.x, c.y, 12, 12); });
          P.r(x + 36, r[0] + 3, 7, 10, '#232327'); P.ell(x + 39.5, r[0] + 9, 2, 2, '#3d3d44'); P.r(x + 45, r[0] + 3, 7, 10, '#232327'); P.ell(x + 48.5, r[0] + 9, 2, 2, '#3d3d44');
        } else spines(P, x + 3, r[0] + 1, w - 6, r[1] - 1, 500 + i);
        P.r(x + 2, r[0] + r[1], w - 4, 1, C.pine);
      });
      P.r(x + Math.floor(w / 2), lip + 17, 1, 26, C.pine);
      P.r(x, fy - 3, w, 3, C.pineDD);
    }
  });

  // ================================================================ 試聽桌（耳機掛在桌邊、桌燈、小擴大機、要試的那疊）
  var PHONES = ['...kkkkk...', '..ksssssk..', '.ks.....sk.', '.ks.....sk.', 'kcck...kcck', 'kcuk...kucr', 'kcuk...kuck', 'kcck...kcck', '.kk.....kk.'];
  var PHONE_PAL = { k: '#121216', s: '#d4d7dc', c: '#26262c', u: '#c9b48c', r: '#c0393b' };
  function phones(P, x, y) {
    PHONES.forEach(function (row, j) { for (var i = 0; i < row.length; i++) { var ch = row[i]; if (ch !== '.') P.p(x + i, y + j, PHONE_PAL[ch]); } });
    P.p(x + 4, y + 1, '#ffffff');
  }
  defO('listenDesk', {
    box: function (o) { return [o.x, o.y - o.h - o.d - 11, o.w + 8, o.h + o.d + 11]; },
    foot: function (o) { return [o.x, o.y - o.d, o.w, o.d]; },
    draw: function (P, o, S) {
      var x = o.x, fy = o.y, w = o.w, d = o.d, h = o.h, lip = fy - h, top = fy - h - d;
      var inUse = S.state && S.state.listenInUse;
      var T = '#d9c7a2', TL = '#c4ae84', TE = '#efe3c8', LEG = '#3e2616';
      shadowRect(P, x, fy - d, w, d, 0.5);
      P.r(x + 2, lip + 3, 2, fy - d - lip - 3, '#2a190e'); P.r(x + w - 4, lip + 3, 2, fy - d - lip - 3, '#2a190e');
      [x + 1, x + w - 3].forEach(function (lx) { P.r(lx, lip + 3, 2, h - 3, LEG); P.r(lx, lip + 3, 1, h - 3, '#5a3a22'); shadowRect(P, lx, fy, 3, 1, 0.45); });
      P.r(x + 3, fy - 6, w - 6, 1, LEG);
      P.r(x, top, w, d, T); P.r(x, top, w, 1, '#a8916a');
      for (var g = 0; g < 12; g++) P.r(x + 2 + Math.floor(hash(g, 3, 71) * (w - 8)), top + 1 + Math.floor(hash(g, 4, 71) * (d - 2)), 4, 1, TL);
      P.r(x, lip, w, 3, '#8a6a44'); P.r(x, lip, w, 1, TE); P.r(x, lip + 2, w, 1, '#5a4028');
      P.r(x + 13, lip + 3, 13, 3, '#4a2e1b'); P.r(x + 18, lip + 4, 3, 1, '#c9a24a');
      P.r(x + w - 6, top - 9, 1, 9, '#2a2a2e'); P.r(x + w - 9, top - 11, 6, 3, '#2f5a40'); P.r(x + w - 9, top - 11, 6, 1, '#4f8a64'); P.r(x + w - 8, top - 8, 4, 1, '#fff1c4');
      P.r(x + w - 8, top - 1, 4, 2, '#2a2a2e');
      var tx = x + 3, ty = top + 2;
      P.r(tx - 1, ty - 1, 18, 11, '#1d1d20'); P.r(tx, ty, 16, 8, '#d3d1cc'); P.r(tx, ty, 16, 1, '#efedea'); P.r(tx, ty + 8, 16, 2, '#8d8b86');
      P.ell(tx + 6.5, ty + 4, 5.4, 3.6, '#1b1a1a'); P.ell(tx + 6.5, ty + 4, 3.6, 2.4, '#2c2a2a'); P.r(tx + 5, ty + 3, 3, 2, '#d9783a'); P.p(tx + 6, ty + 4, '#eee');
      P.r(tx + 13, ty + 1, 2, 2, '#55555a'); P.line(tx + 13, ty + 2, tx + 10, ty + 5, '#e4e4e8'); P.p(tx + 10, ty + 6, '#2a2a2e');
      var ax = x + 21, ay = top + 3;
      P.r(ax - 1, ay - 1, 10, 9, '#111'); P.r(ax, ay, 8, 5, '#2a2a2f'); P.r(ax, ay + 5, 8, 2, '#1b1b1f');
      P.r(ax + 1, ay + 1, 3, 2, '#e1a23a'); P.p(ax + 2, ay + 1, '#7a3a10'); P.p(ax + 5, ay + 2, '#cfcfd4'); P.p(ax + 7, ay + 2, '#cfcfd4'); P.p(ax + 6, ay + 6, '#64d36a');
      P.r(x + 30, top + 9, 8, 2, '#efe8d6'); P.r(x + 30, top + 10, 8, 1, '#c9c2ae');
      P.r(x + 29, top + 3, 10, 7, '#1d1712'); P.cover(o.stack || P.poolPick(4242), x + 30, top + 4, 8, 5, { glare: false });
      P.r(x + 10, top - 7, 14, 7, '#7a2a24'); P.r(x + 11, top - 6, 12, 5, '#f3ecd9');
      P.text(o.sign || '試聽', x + 17, top - 3.5, { size: 4.8, color: '#7a2a24', bold: true });
      // 掛勾在桌子右端、桌面高度（≈0.72 m）；耳機掛在桌邊（耳罩 ≈0.45–0.6 m）
      var hx = x + w + 1, hy = lip + 1;
      P.r(x + w - 1, hy, 3, 1, '#c9a24a'); P.p(hx + 1, hy - 1, '#c9a24a');
      if (!inUse) {
        phones(P, hx - 4, hy);
        P.line(hx + 6, hy + 9, hx + 7, hy + 12, '#121216'); P.line(hx + 7, hy + 12, hx + 4, hy + 14, '#121216'); P.line(hx + 4, hy + 14, hx + 1, hy + 12, '#121216');
        P.line(hx + 1, hy + 12, hx - 2, hy + 4, '#121216');
      }
    }
  });

  defO('stool', {
    foot: function (o) { return [o.x, o.y - 3, 11, 3]; },
    draw: function (P, o) {
      var x = o.x, fy = o.y, sy = fy - 13;
      P.a(0.4, function () { P.ell(x + 5, fy, 6, 1.6, '#1b0e05'); });
      [[x + 1, 0], [x + 5, -2], [x + 9, 0]].forEach(function (l) { P.r(l[0], sy + 2, 1, 13 + l[1], l[1] ? C.chromeD : C.chrome); });
      P.r(x + 1, fy - 5, 9, 1, C.chromeD);
      P.ell(x + 5.5, sy + 1.5, 5.5, 2.2, '#7d1f22'); P.ell(x + 5.5, sy + 0.5, 5, 1.8, '#c0393b'); P.r(x + 3, sy, 3, 1, '#e0605a');
    }
  });

  // ================================================================ 櫃檯（老闆站後面）＋正在放的封面＋店裡的唱盤＋收銀機＋睡覺的貓
  function counterGeo(o) {
    var top = o.y - o.h - o.d, nx = o.x + 4, nb = top + 8;
    return { top: top, lip: o.y - o.h, now: [nx - 2, nb - 19, 16, 20], cover: [nx, nb - 13, 12, 12], tt: [o.x + 20, top + 2], cat: [o.x + 54, top, 19, 12] };
  }
  defO('counter', {
    dyn: true,
    box: function (o) { var g = counterGeo(o); return [o.x, g.top - 6, o.w, o.y - g.top + 6]; },
    foot: function (o) { return [o.x, o.y - o.d, o.w, o.d]; },
    hots: function (o, S) {
      var g = counterGeo(o), cd = o.now ? S.card(o.now) : null, out = [];
      if (o.now) out.push({ id: 'now', rect: g.now, label: '正在放：' + (cd ? cd.album : ''), action: 'wall-record:' + o.now, pri: 3, sub: true });
      if (o.cat !== false) out.push({ id: 'cat', rect: g.cat, label: '店貓', action: 'cat', pri: 3, sub: true });
      return out;
    },
    draw: function (P, o, S) {
      var x = o.x, fy = o.y, w = o.w, d = o.d, h = o.h, lip = fy - h, top = fy - h - d;
      shadowRect(P, x - 2, fy - 1, w + 2, 3, 0.42);
      P.r(x, lip, w, h, C.walnut);
      for (var px = x + 4; px < x + w; px += 5) P.r(px, lip + 3, 1, h - 6, C.walnutD);
      for (var gI = 0; gI < 40; gI++) P.r(x + 1 + Math.floor(hash(gI, 5, 81) * (w - 2)), lip + 4 + Math.floor(hash(gI, 6, 81) * (h - 9)), 1, 3, C.walnutL);
      P.r(x, lip + 2, w, 1, C.walnutD); P.r(x, fy - 3, w, 3, C.walnutDD); P.r(x, lip, 1, h, C.walnutL);
      var lx = x + Math.floor(w / 2) - 13, ly = lip + 8;
      P.r(lx - 1, ly - 1, 28, 11, '#c9a24a'); P.r(lx, ly, 26, 9, '#1f1612'); P.ptext('DIP', lx + 3, ly + 2, '#e9c35a'); P.r(lx + 16, ly + 2, 7, 5, '#1f1612'); P.ell(lx + 19.5, ly + 4.5, 3, 3, '#e9c35a'); P.ell(lx + 19.5, ly + 4.5, 1.6, 1.6, '#1f1612'); P.p(lx + 19, ly + 4, '#e9c35a');
      P.r(x, top, w, d, '#8a5a36'); P.r(x, top, w, 1, C.walnut); P.r(x, lip - 2, w, 2, '#9c6a42'); P.r(x, lip - 1, w, 1, '#b07a4c');
      // 正在放（小畫架）
      var nx = x + 4, nb = top + 8;
      P.r(nx + 2, nb - 2, 1, 3, '#3a2a1e'); P.r(nx + 9, nb - 2, 1, 3, '#3a2a1e'); P.r(nx, nb, 12, 1, '#3a2a1e');
      P.r(nx - 1, nb - 14, 14, 14, '#1d1712'); P.cover((S.state && S.state.now) || o.now, nx, nb - 13, 12, 12);
      P.r(nx - 2, nb - 19, 16, 5, '#1d1712'); P.ptext('NOW', nx + 1, nb - 18, '#7fe08a');
      // 店裡的唱盤（在放就轉）
      var tx = x + 20, ty = top + 2, playing = !S.state || S.state.playing !== false, fr = playing ? Math.floor(((S.t || 0) * 10)) : 0;
      P.r(tx - 1, ty - 1, 18, 11, '#111'); P.r(tx, ty, 16, 8, '#3a3a40'); P.r(tx, ty, 16, 1, '#55555c'); P.r(tx, ty + 8, 16, 2, '#232327');
      P.ell(tx + 6.5, ty + 4, 5.4, 3.6, '#141414'); P.ell(tx + 6.5, ty + 4, 3.6, 2.4, '#262424'); P.r(tx + 5, ty + 3, 3, 2, '#1f5fae'); P.p(tx + 6, ty + 4, '#eee');
      var gl = [[3, 2], [9, 2], [10, 5], [3, 6]][fr % 4]; P.p(tx + gl[0], ty + gl[1], '#6a6a70');
      P.r(tx + 13, ty + 1, 2, 2, '#888');
      if (playing) { P.line(tx + 13, ty + 2, tx + 9, ty + 4, '#d0d0d6'); P.p(tx + 14, ty + 7, '#64d36a'); }
      else { P.line(tx + 13, ty + 2, tx + 14, ty + 6, '#d0d0d6'); P.p(tx + 14, ty + 7, '#a33'); }
      // 收銀機
      var rx = x + 40, ry = top + 1;
      P.r(rx - 1, ry - 6, 14, 15, '#2a2a2e'); P.r(rx, ry - 5, 12, 5, '#d8d2c4'); P.r(rx + 1, ry - 4, 10, 3, '#2f4a3a'); P.ptext('120', rx + 1, ry - 4, '#7fe08a');
      P.r(rx, ry, 12, 7, '#cfc8b8'); P.r(rx, ry, 12, 1, '#e7e1d4');
      for (var kI = 0; kI < 8; kI++) P.p(rx + 2 + (kI % 4) * 2, ry + 2 + Math.floor(kI / 4) * 2, '#6d675c');
      P.r(rx, ry + 7, 12, 2, '#a59e8f');
      // 睡覺的橘貓（被點了會抬頭睜眼一下）
      var cx = x + 56, cy = top + 4, awake = S.state && S.state.poke && S.state.poke.cat > (S.rt || 0);
      P.a(0.3, function () { P.ell(cx + 7, cy + 7, 8, 1.5, '#1b0e05'); });
      P.ell(cx + 7, cy + 4, 7.5, 3.6, '#a35a1e'); P.ell(cx + 7, cy + 3.6, 6.8, 3, '#e08f3c'); P.r(cx + 4, cy + 1, 1, 3, '#b8661f'); P.r(cx + 7, cy + 1, 1, 3, '#b8661f'); P.r(cx + 10, cy + 2, 1, 2, '#b8661f');
      var hy = awake ? -2 : 0;
      P.ell(cx + 1.5, cy + 4.5 + hy, 3, 2.6, '#e08f3c'); P.p(cx, cy + 1 + hy, '#e08f3c'); P.p(cx + 3, cy + 1 + hy, '#e08f3c'); P.p(cx, cy + 2 + hy, '#a35a1e'); P.p(cx + 3, cy + 2 + hy, '#a35a1e');
      if (awake) { P.p(cx, cy + 4 + hy, '#2a6a30'); P.p(cx + 2, cy + 4 + hy, '#2a6a30'); }
      else { P.r(cx, cy + 4, 1, 1, '#3a2010'); P.r(cx + 2, cy + 4, 1, 1, '#3a2010'); }
      P.r(cx + 9, cy + 6, 6, 1, '#e08f3c'); P.p(cx + 1, cy + 6 + hy, '#f6e4cf');
    },
    glow: function (P, o, S) {   // 在放：唱盤上冒音符（每 1.2 秒一顆，往上飄）
      if (!S.state || S.state.playing === false) return;
      var top = o.y - o.h - o.d, tx = o.x + 20, t = S.t || 0, ph = (t % 1.2) / 1.2;
      if (ph < 0.85) noteGlyph(P, tx + 8 + Math.round(Math.sin(ph * 6) * 1), top - 3 - Math.round(ph * 10), '#c9a24a', 0.9 - ph * 0.6);
    }
  });

  // ================================================================ 唱盤台（唱盤區：他左白台、你右黑台；轉的就是贏的那張）
  function deckGeo(o) { var top = o.y - o.h - o.d, tx = o.x + 2, ty = top + 1; return { top: top, lip: o.y - o.h, tx: tx, ty: ty, tw: o.w - 4, pc: [tx + 8.5, ty + 4] }; }
  defO('deckStand', {
    dyn: true,
    box: function (o) { var g = deckGeo(o); return [o.x - 1, g.top - 1, o.w + 2, o.y - g.top + 1]; },
    foot: function (o) { return [o.x, o.y - o.d, o.w, o.d]; },
    center: function (o) { return deckGeo(o).pc; },
    draw: function (P, o, S) {
      var x = o.x, fy = o.y, w = o.w, h = o.h, g = deckGeo(o), lip = g.lip, top = g.top;
      var e = o.side === 'e';
      var body = e ? '#efe5cf' : '#34343c', bodyL = e ? '#fbf6ea' : '#4a4a55', bodyD = e ? '#d2c5a6' : '#24242a', bodyDD = e ? '#b3a585' : '#17171b';
      var ds = (S.state && S.state.decks && S.state.decks[o.side]) || null, fr = Math.floor(((S.rt || 0) * 10)) & 3;
      shadowRect(P, x - 1, fy - 1, w + 3, 3, 0.45);
      P.r(x + 1, lip + 8, 2, h - 8, bodyD); P.r(x + 1, lip + 8, 1, h - 8, bodyL); P.r(x + w - 3, lip + 8, 2, h - 8, bodyDD);
      P.r(x + 3, fy - 7, w - 6, 2, bodyD); P.r(x + 3, fy - 7, w - 6, 1, bodyL);
      for (var sv = 0; sv < 4; sv++) { var sc = ['#efe8d6', '#2c2725', '#e6cd7c', '#b9443a'][(sv + (e ? 0 : 2)) % 4]; P.r(x + 5 + sv * 2, fy - 16 + (sv % 2), 2, 9 - (sv % 2), sc); P.p(x + 5 + sv * 2, fy - 16 + (sv % 2), shade(sc, 0.3)); }
      P.r(x, top, w, o.d, body); P.r(x, top, w, 1, bodyD);
      P.r(x, lip, w, 8, bodyD); P.r(x, lip, w, 1, bodyL); P.r(x, lip, 1, 8, bodyL); P.r(x + w - 1, lip, 1, 8, bodyDD); P.r(x, lip + 7, w, 1, bodyDD);
      var lgx = x + w / 2, lgy = lip + 4;
      P.ell(lgx, lgy, 2.6, 2.4, e ? '#1d1712' : '#efe5cf'); P.p(Math.floor(lgx), Math.floor(lgy), e ? '#c11628' : '#c9a24a');
      var tx = g.tx, ty = g.ty, tw = g.tw;
      P.r(tx - 1, ty - 1, tw + 2, 10, e ? '#9d917a' : '#0d0d10');
      P.r(tx, ty, tw, 8, e ? '#f7f1e3' : '#2a2a31'); P.r(tx, ty, tw, 1, e ? '#ffffff' : '#41414a');
      P.r(tx, ty + 8, tw, 1, e ? '#c9bd9f' : '#18181c');
      var pcx = g.pc[0], pcy = g.pc[1];
      P.ell(pcx, pcy, 6.6, 3.9, e ? '#bdbcb8' : '#8e8e95'); P.ell(pcx, pcy, 6, 3.4, '#2a2a2c'); P.ell(pcx, pcy, 3.4, 1.8, '#333336');
      var spin = ds && ds.state === 'spin';
      if (ds && ds.rec) {
        var lift = ds.state === 'land' ? 1 : 0, ace = ds.rec.kind === 'ace';
        P.ell(pcx, pcy - lift, 6, 3.4, ace ? '#c9c9d2' : '#151515'); P.ell(pcx, pcy - lift, ace ? 5 : 4.2, ace ? 2.8 : 2.3, ace ? '#151515' : '#262424');
        P.r(pcx - 1.5, pcy - 1 - lift, 3, 2, ace ? '#e9c35a' : (ATTR[ds.rec.attr] || '#c11628')); P.p(pcx - 0.5, pcy - 0.5 - lift, '#eee');
        if (spin) { var gl = [[-4, -2], [3, -2], [4, 1], [-3, 2]][fr]; P.p(pcx + gl[0], pcy + gl[1], '#6a6a70'); }
      }
      var px0 = tx + tw - 3, py0 = ty + 1;
      P.r(px0, py0, 2, 2, e ? '#8f8a80' : '#9a9aa2');
      var armEnd = spin ? [pcx + 3, pcy] : (ds && ds.state === 'armMid' ? [pcx + 5, pcy - 2] : [px0 + 1, ty + 7]);
      P.line(px0 + 1, py0 + 1, armEnd[0], armEnd[1], e ? '#6d685e' : '#d4d4da'); P.p(armEnd[0], armEnd[1], e ? '#3a3630' : '#f2f2f5');
      P.r(tx + 1, ty + 6, 2, 1, e ? '#8f8a80' : '#9a9aa2'); P.p(tx + tw - 2, ty + 6, spin ? '#64d36a' : '#a33');
      if (ds && ds.glow) P.a(0.6, function () { P.r(x - 1, top - 1, w + 2, 1, '#f2c540'); P.r(x - 1, lip + 6, w + 2, 1, '#f2c540'); });
    },
    glow: function (P, o, S) {   // 落盤之後：每 450 ms 冒一顆音符（屬性色），0.9 秒往上飄 9 格
      var ds = S.state && S.state.decks && S.state.decks[o.side]; if (!ds || ds.state !== 'spin' || !ds.rec) return;
      var g = deckGeo(o), t = (S.rt || 0) * 1000;
      for (var q = 0; q < 2; q++) { var ph = ((t + q * 450) % 900) / 900; noteGlyph(P, g.pc[0] + 3 + (q ? -6 : 0), g.top - 4 - Math.round(ph * 9), ds.rec.kind === 'ace' ? '#e9c35a' : (ATTR[ds.rec.attr] || '#c9a24a'), 1 - ph * 0.7); }
    }
  });

  // ================================================================ 唱盤區特效（stage.js 的 clash() 每格把狀態填進 S.state.fx）
  // fx = { discs:[{x,y,attr,kind:'disc'|'ace',fr,crack,split,ghost,flat,void}], trails:[[x,y,c]], sparks:[{x,y,size,c}], shards:[[x,y,w,attr]],
  //        notes:[{x,y,c}], flag:{x,y,side}, dots:[[x,y,c]], excl:[{x,y}] }
  var DISC = ['..kkk..', '.kkkkk.', 'kkLLLkk', 'kkLwLkk', 'kkLLLkk', '.kkkkk.', '..kkk..'];
  var GLINT = [[1, 2], [2, 1], [4, 1], [5, 2], [5, 4], [4, 5], [2, 5], [1, 4]];
  function disc7(P, cx, cy, attr, frame, o) {
    o = o || {};
    if (o.split) {   // 裂成三塊往外散
      var k = o.split;
      [[-k, -k - 1, 0], [k + 1, k - 1, 1], [-k - 1, k + 1, 2]].forEach(function (q) { disc7(P, cx + q[0], cy + q[1], attr, 0, { part: q[2], void: o.void, outline: false }); });
      return;
    }
    var x = Math.round(cx - 3.5), y = Math.round(cy - 3.5), ace = o.kind === 'ace', lab = o.void ? '#9a9aa4' : ace ? '#e9c35a' : (ATTR[attr] || attr || '#c11628');
    var body = o.void ? '#55555f' : '#141414', rim = ace ? '#c9c9d2' : body;
    var draw = function () {
      if (o.outline !== false) { P.r(x + 1, y - 1, 5, 9, '#f3ead6'); P.r(x - 1, y + 1, 9, 5, '#f3ead6'); P.r(x, y, 7, 7, '#f3ead6'); }
      DISC.forEach(function (row, j) {
        for (var i = 0; i < 7; i++) {
          var ch = row[i]; if (ch === '.') continue;
          if (o.part === 0 && !(i < 4 && j < 4)) continue; if (o.part === 1 && !(i >= 3 && j < 4)) continue; if (o.part === 2 && !(j >= 3)) continue;
          var edge = ch === 'k' && (i === 0 || i === 6 || j === 0 || j === 6 || (row[i - 1] === '.') || (row[i + 1] === '.'));
          P.p(x + i, y + j, ch === 'k' ? (edge ? rim : body) : ch === 'L' ? lab : '#efe8d6');
        }
      });
      if (o.part == null) { var g = GLINT[(frame || 0) % GLINT.length]; P.p(x + g[0], y + g[1], ace ? '#fff1c2' : '#6e6e74'); }
      if (o.crack) { P.p(x + 2, y, '#f3ead6'); P.p(x + 3, y + 1, '#f3ead6'); P.p(x + 3, y + 2, '#f3ead6'); P.p(x + 4, y + 4, '#f3ead6'); P.p(x + 4, y + 5, '#f3ead6'); P.p(x + 5, y + 6, '#f3ead6'); }
    };
    if (o.ghost) P.a(o.ghost, draw); else draw();
  }
  function flatDisc(P, x, y, attr, o) {   // 平躺在地上（輸家落地、平手）
    o = o || {};
    P.a(0.4, function () { P.ell(x, y + 1, 6, 2, '#1b0e05'); });
    P.ell(x, y, 5.5, 2.2, '#8e8e98'); P.ell(x, y, 4.8, 1.8, o.void ? '#55555f' : '#151515');
    P.r(x - 1, y - 1, 3, 1, o.void ? '#9a9aa4' : o.kind === 'ace' ? '#e9c35a' : (ATTR[attr] || '#c11628')); P.p(x - 3, y - 1, '#5a5a66');
  }
  function noteGlyph(P, x, y, col, al) {
    var rows = ['..kk', '..kk', '..k.', 'kkk.', 'kk..'];
    var f = function () {
      rows.forEach(function (r, j) { for (var i = 0; i < 4; i++) if (r[i] !== '.') P.r(x + i - 1, y + j - 1, 3, 3, '#f7f2e6'); });
      rows.forEach(function (r, j) { for (var i = 0; i < 4; i++) if (r[i] !== '.') P.p(x + i, y + j, col); });
    };
    if (al != null && al < 1) P.a(Math.max(0, al), f); else f();
  }
  function spark(P, x, y, size, c) {
    c = c || '#fff6c8';
    if (size === 'ring') { for (var i = 0; i < 10; i++) { var a = i / 10 * Math.PI * 2; P.p(Math.round(x + Math.cos(a) * 6), Math.round(y + Math.sin(a) * 4), c); } P.r(x - 1, y - 1, 3, 3, '#ffffff'); return; }
    var n = size === 'big' ? 6 : size === 'huge' ? 8 : 4;
    P.r(x - 1, y - 1, 3, 3, '#ffffff');
    [[0, -n], [0, n], [-n, 0], [n, 0], [-3, -3], [3, 3], [-3, 3], [3, -3]].forEach(function (v, i) { P.p(x + v[0], y + v[1], i < 4 ? c : '#f2c540'); if (i < 4) P.p(x + v[0] / 2, y + v[1] / 2, '#ffffff'); });
  }
  function flag(P, x, y, side) {   // 三角旗：黑＝你、白＝他；旗尖指贏家（x,y＝握旗的手）
    var dir = side === 'p' ? 1 : -1, fc = side === 'p' ? '#111111' : '#ffffff', ec = side === 'p' ? '#ffffff' : '#111111', top = y - 15;
    P.r(x - 1, top - 1, 3, 17, '#f3ead6'); P.r(x, top, 1, 15, '#8a6020'); P.p(x, top - 1, '#f0d080');
    for (var i = 0; i < 8; i++) { var hh = 7 - Math.round(i * 7 / 8); if (hh <= 0) continue; var fx = dir > 0 ? x + 1 + i : x - 1 - i, fy = top + Math.floor((7 - hh) / 2); P.r(fx, fy - 1, 1, hh + 2, ec); P.r(fx, fy, 1, hh, fc); }
  }
  function excl(P, x, y) { P.r(x - 1, y - 1, 4, 8, '#ffffff'); P.r(x - 1, y + 7, 4, 4, '#ffffff'); P.r(x, y, 2, 6, '#e0303f'); P.r(x, y + 8, 2, 2, '#e0303f'); }
  defO('duelfx', {
    layer: 'fx',
    draw: function (P, o, S) {
      var fx = S.state && S.state.fx; if (!fx) return;
      (fx.shards || []).forEach(function (q, i) { var w = Math.max(1, Math.round((q[2] || 3) * 0.7)); P.r(q[0] - 1, q[1] - 1, w + 2, 3, '#8e8e98'); P.r(q[0], q[1], w, 1, '#151515'); if (q[3]) P.p(q[0] + (i % w), q[1], ATTR[q[3]] || '#c11628'); });
      (fx.discs || []).filter(function (d) { return d.flat; }).forEach(function (d) { flatDisc(P, Math.round(d.x), Math.round(d.y), d.attr, d); });
      (fx.trails || []).forEach(function (t) { var c = t[2] || 'rgba(255,241,194,0.7)', al = /rgba\([^)]*,\s*([\d.]+)\)/.exec(c); P.a(al ? +al[1] : 0.6, function () { P.r(Math.round(t[0]) - 1, Math.round(t[1]), 2, 1, '#f3ead6'); }); });
      (fx.discs || []).filter(function (d) { return !d.flat; }).forEach(function (d) { disc7(P, d.x, d.y, d.attr, d.fr || 0, d); });
      (fx.dots || []).forEach(function (q) { P.p(Math.round(q[0]), Math.round(q[1]), q[2] || '#e8e8ee'); });
      if (fx.flag) flag(P, Math.round(fx.flag.x), Math.round(fx.flag.y), fx.flag.side);
    },
    glow: function (P, o, S) {
      var fx = S.state && S.state.fx; if (!fx) return;
      (fx.sparks || []).forEach(function (q) { spark(P, Math.round(q.x), Math.round(q.y), q.size || 'small', q.c); });
      (fx.notes || []).forEach(function (n) { noteGlyph(P, Math.round(n.x), Math.round(n.y), n.c || '#c9a24a'); });
      (fx.excl || []).forEach(function (q) { excl(P, Math.round(q.x), Math.round(q.y)); });
    }
  });

  // ================================================================ 手上拿的東西（shop.js 的 hold）：{ sleeve: 卡 id }＝封套；'ace'＝王牌；{ disc: 屬性 }＝要丟的唱片
  DS.hookO('holdDraw', function (P, a, hx, hy, S) {
    var h = a.hold; if (!h) return;
    if (h === 'ace' || h.ace) {
      P.r(hx - 8, hy - 8, 16, 16, '#8a6020'); P.r(hx - 7, hy - 7, 14, 14, '#e9c35a'); P.r(hx - 6, hy - 6, 12, 12, '#1d1712');
      if (h.card) P.cover(h.card, hx - 5, hy - 5, 10, 10, { glare: false });
      else disc7(P, hx, hy, 'c', 0, { kind: 'ace', outline: false });
      if (Math.floor((S.t || 0) * 4) % 2 === 0) { P.p(hx + 8, hy - 9, '#fff1c2'); P.p(hx - 9, hy + 7, '#fff1c2'); }
      return;
    }
    if (h.sleeve) { P.r(hx - 7, hy - 7, 14, 14, '#1d1712'); P.cover(h.sleeve, hx - 6, hy - 6, 12, 12, { glare: false }); P.a(0.22, function () { P.r(hx - 6, hy - 6, 12, 1, '#ffffff'); }); return; }
    if (h.disc) disc7(P, hx, hy, h.disc, Math.floor((S.t || 0) * 16) % 8, { kind: h.kind });
  });

  window.DipPropsO = { ATTR: ATTR, disc7: disc7, flatDisc: flatDisc, spark: spark, note: noteGlyph, flag: flag, phones: phones, binGeo: binGeo, deckGeo: deckGeo, counterGeo: counterGeo };
})();
