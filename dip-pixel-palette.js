// dip 像素色盤工具：明暗階產生、排序、合併相近色，以及色盤檔的讀寫
// （.gpl GIMP／.hex Lospec／.pal JASC-PAL／.txt paint.net）。
//
// 這支檔案**不碰 DOM**，輸入輸出都是純資料，所以 node 也跑得動、可以直接寫單元測試。
//   色盤 = ['#rrggbb', ...]（一律小寫六位，不含透明）
//
// 為什麼要有明暗階產生器：像素畫的暗部不是把顏色乘以 0.7，而是**同時往藍紫偏、彩度拉高**，
// 亮部往黃偏、彩度降低。純粹降明度會得到一條死灰的階，這是新手最常見的毛病。
(function(global){
  'use strict';

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const hex6 = c => { c = String(c||'').trim(); const m = /^#([0-9a-f]{3})$/i.exec(c);
    return m ? '#' + m[1].toLowerCase().split('').map(x => x+x).join('') : c.slice(0,7).toLowerCase(); };
  const isHex = c => /^#[0-9a-f]{6}$/.test(hex6(c));
  const hexRGB = hx => { hx = hex6(hx).replace('#',''); return [parseInt(hx.slice(0,2),16)||0, parseInt(hx.slice(2,4),16)||0, parseInt(hx.slice(4,6),16)||0]; };
  const rgbHex = (r,g,b) => '#' + [r,g,b].map(v => clamp(Math.round(v),0,255).toString(16).padStart(2,'0')).join('');

  function rgbHsv(r, g, b){ r/=255; g/=255; b/=255;
    const mx = Math.max(r,g,b), mn = Math.min(r,g,b), d = mx-mn;
    let h = 0; if(d) h = 60 * (mx===r ? ((g-b)/d + (g<b?6:0)) : mx===g ? ((b-r)/d + 2) : ((r-g)/d + 4));
    return [h, mx ? d/mx : 0, mx]; }
  function hsvRgb(h, s, v){ h = ((h%360)+360)%360;
    const c = v*s, x = c*(1 - Math.abs((h/60)%2 - 1)), m = v-c;
    const t = h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];
    return [(t[0]+m)*255, (t[1]+m)*255, (t[2]+m)*255]; }

  // 感知亮度（Rec. 601）。排序與「這個顏色算亮還是暗」都用它。
  const luma = hx => { const [r,g,b] = hexRGB(hx); return (0.299*r + 0.587*g + 0.114*b) / 255; };
  // 顏色距離平方，綠色加權（人眼對綠最敏感）。跟 dip-pixel-import.js 同一把尺。
  function dist2(a, b){ const [r1,g1,b1] = hexRGB(a), [r2,g2,b2] = hexRGB(b);
    const dr = r1-r2, dg = g1-g2, db = b1-b2; return 2*dr*dr + 4*dg*dg + 3*db*db; }
  // 兩個色相之間的最短角距（-180..180）
  const hueDelta = (a, b) => { let d = (b - a) % 360; if(d > 180) d -= 360; if(d < -180) d += 360; return d; };

  // ══════════════ 明暗階 ══════════════
  // base 放在階的正中間（steps 為偶數時偏亮的那一半多一階）。
  //   steps      總階數（含 base），2–32
  //   hueShift   兩端各往目標色相拉多少度（預設 30；暗拉向藍紫 260°、亮拉向黃 50°）
  //   satShift   暗部彩度加多少、亮部減多少（0–1，預設 .25）
  //   range      明度掃到多寬（0–1，預設 .7；1 ＝ 從全黑掃到全白）
  //   coolDark   true（預設）暗部往藍紫；false 反過來（燭光、火光那種暖暗部）
  function shadeRamp(base, steps, opts){
    opts = opts || {};
    steps = clamp(Math.round(steps == null ? 5 : steps), 2, 32);
    const hueShift = opts.hueShift == null ? 30 : +opts.hueShift;
    const satShift = opts.satShift == null ? 0.25 : +opts.satShift;
    const range = opts.range == null ? 0.7 : clamp(+opts.range, 0.05, 1);
    const dir = opts.coolDark === false ? -1 : 1;
    const [r, g, b] = hexRGB(base);
    const [h0, s0, v0] = rgbHsv(r, g, b);
    const mid = (steps - 1) / 2;
    const out = [];
    for(let i = 0; i < steps; i++){
      const t = (i - mid) / (mid || 1);          // -1（最暗）→ 0（base）→ +1（最亮）
      // 明度：往暗端壓到 v0*(1-range)，往亮端拉到 v0+(1-v0)*range
      const v = t < 0 ? v0 * (1 + t*range) : v0 + (1 - v0) * t * range;
      // 彩度：暗部加、亮部減，但亮到接近白的時候彩度一定要掉，不然會出現螢光色。
      // 無彩色（灰階）不動彩度——加了就會冒出一條偏紅的假灰階。
      const chroma = s0 > 0.02 ? 1 : 0;
      let s = s0 + chroma * (t < 0 ? -t * satShift : -t * satShift * 1.15);
      // 色相：往「目標色相」拉，不是固定轉某個方向——固定方向的話藍色的暗部會往青色跑，反了。
      // 暗部拉向藍紫 260°、亮部拉向黃 50°（coolDark:false 就對調）。灰色不偏色。
      const target = (t < 0) === (dir > 0) ? 260 : 50;
      const pull = Math.abs(t) * (hueShift / 180);      // 最多只拉 hueShift 度
      const hue = s0 > 0.02 ? h0 + hueDelta(h0, target) * pull : h0;
      const rgb = hsvRgb(hue, clamp(s, 0, 1), clamp(v, 0, 1));
      out.push(rgbHex(rgb[0], rgb[1], rgb[2]));
    }
    return out;
  }

  // 兩個顏色之間內插出一條階（HSV 走短邊色相，比 RGB 內插乾淨）
  function blendRamp(a, b, steps){
    steps = clamp(Math.round(steps || 5), 2, 64);
    const [r1,g1,b1] = hexRGB(a), [r2,g2,b2] = hexRGB(b);
    const [h1,s1,v1] = rgbHsv(r1,g1,b1), [h2,s2,v2] = rgbHsv(r2,g2,b2);
    const dh = hueDelta(h1, h2);
    const out = [];
    for(let i = 0; i < steps; i++){
      const t = steps === 1 ? 0 : i / (steps - 1);
      // 其中一端是無彩色時不要轉色相，否則灰色會亂飄
      const useH = (s1 < 0.02) ? h2 : (s2 < 0.02) ? h1 : h1 + dh*t;
      const rgb = hsvRgb(useH, s1 + (s2-s1)*t, v1 + (v2-v1)*t);
      out.push(rgbHex(rgb[0], rgb[1], rgb[2]));
    }
    return out;
  }

  // ══════════════ 排序 ══════════════
  // 回傳的是**新的順序**（原陣列的索引），呼叫端拿去重排色盤並重映射像素。
  //   'luma'  暗到亮
  //   'hue'   色相；無彩色（彩度極低）集中排在最前面，依亮度排
  //   'sat'   彩度低到高
  //   'count' 出現次數多到少（要給 counts）
  function sortOrder(list, mode, counts){
    const idx = list.map((_, i) => i);
    const info = list.map(hx => { const [r,g,b] = hexRGB(hx); const [h,s,v] = rgbHsv(r,g,b); return { h, s, v, l: luma(hx) }; });
    const cmp = {
      luma: (a, b) => info[a].l - info[b].l || a - b,
      sat:  (a, b) => info[a].s - info[b].s || a - b,
      count:(a, b) => (counts ? (counts[b]||0) - (counts[a]||0) : 0) || a - b,
      hue:  (a, b) => {
        const ga = info[a].s < 0.12 ? 0 : 1, gb = info[b].s < 0.12 ? 0 : 1;
        if(ga !== gb) return ga - gb;
        if(!ga) return info[a].l - info[b].l || a - b;
        return info[a].h - info[b].h || info[a].l - info[b].l || a - b;
      },
    }[mode] || ((a, b) => a - b);
    return idx.sort(cmp);
  }

  // ══════════════ 合併相近色 ══════════════
  // threshold 是 0–100 的「感知距離」百分比；回傳 { palette, map }，
  // map[i] = 新色盤裡的位置。同一群留下的是**出現次數最多**的那一個（沒給 counts 就留第一個），
  // 不是平均色——平均色會生出一個原圖裡根本不存在的顏色。
  function mergeSimilar(list, threshold, counts){
    const thr = clamp(+threshold || 0, 0, 100);
    const maxD = 9 * 255 * 255;                       // dist2 的理論上限（黑到白）
    // 四次方是為了把滑桿的可用範圍攤開：實務上會用到的是 0–25 這一段
    // （每個通道差 8 階 ≈ 18），線性或平方都會全擠在最左邊。門檻 100 ＝ 全部併成一色。
    const lim = Math.pow(thr / 100, 4) * maxD;
    const rep = [], map = new Array(list.length).fill(0);
    for(let i = 0; i < list.length; i++){
      let hit = -1, best = Infinity;
      for(let j = 0; j < rep.length; j++){
        const d = dist2(list[i], list[rep[j]]);
        if(d <= lim && d < best){ best = d; hit = j; }
      }
      if(hit < 0){ map[i] = rep.length; rep.push(i); }
      else {
        map[i] = hit;
        // 群裡誰出現得多誰當代表
        if(counts && (counts[i]||0) > (counts[rep[hit]]||0)) rep[hit] = i;
      }
    }
    return { palette: rep.map(i => list[i]), map, keep: rep };
  }

  // 找色盤裡最接近的一色；沒有色盤回 -1
  function nearest(list, hx){
    let bi = -1, bd = Infinity;
    for(let i = 0; i < list.length; i++){ const d = dist2(list[i], hx); if(d < bd){ bd = d; bi = i; } }
    return bi;
  }

  // ══════════════ 色盤檔 ══════════════
  const HEXRE = /#?([0-9a-fA-F]{6})\b/;

  // .gpl（GIMP）：表頭 "GIMP Palette"、Name:、Columns:、# 註解，然後每行 "R G B  名稱"
  function parseGPL(text){
    const out = [];
    for(const raw of String(text).split(/\r?\n/)){
      const line = raw.trim();
      if(!line || line[0] === '#') continue;
      if(/^(GIMP Palette|Name:|Columns:)/i.test(line)) continue;
      const m = /^(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})/.exec(line);
      if(m) out.push(rgbHex(+m[1], +m[2], +m[3]));
    }
    return out;
  }
  function writeGPL(list, name){
    const lines = ['GIMP Palette', 'Name: ' + (name || 'dip vinyl'), 'Columns: 8', '#'];
    for(const hx of list){ const [r,g,b] = hexRGB(hx);
      lines.push(`${String(r).padStart(3,' ')} ${String(g).padStart(3,' ')} ${String(b).padStart(3,' ')}\t${hex6(hx)}`); }
    return lines.join('\n') + '\n';
  }

  // .hex（Lospec）：一行一個 rrggbb，可有可無的 #
  function parseHEX(text){
    const out = [];
    for(const raw of String(text).split(/\r?\n/)){
      const line = raw.trim(); if(!line || line[0] === '#' && line.length > 7) continue;
      const m = /^#?([0-9a-fA-F]{6})$/.exec(line);
      if(m) out.push('#' + m[1].toLowerCase());
    }
    return out;
  }
  const writeHEX = list => list.map(hx => hex6(hx).slice(1)).join('\n') + '\n';

  // .pal（JASC-PAL，Paint Shop Pro）：JASC-PAL / 0100 / 色數 / "R G B"
  function parsePAL(text){
    const lines = String(text).split(/\r?\n/).map(s => s.trim());
    if(!/^JASC-PAL/i.test(lines[0] || '')) return [];
    const out = [];
    for(let i = 3; i < lines.length; i++){
      const m = /^(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})/.exec(lines[i]);
      if(m) out.push(rgbHex(+m[1], +m[2], +m[3]));
    }
    return out;
  }
  function writePAL(list){
    return ['JASC-PAL', '0100', String(list.length)]
      .concat(list.map(hx => hexRGB(hx).join(' '))).join('\r\n') + '\r\n';
  }

  // 副檔名認不出來時的救命稻草：把整份文字裡看得到的六位 hex 全撿起來
  function parseAny(text, filename){
    const ext = (/\.([a-z0-9]+)$/i.exec(String(filename || '')) || [,''])[1].toLowerCase();
    let list = ext === 'gpl' ? parseGPL(text) : ext === 'pal' ? parsePAL(text) : ext === 'hex' ? parseHEX(text) : [];
    if(!list.length) list = parseGPL(text);
    if(!list.length) list = parsePAL(text);
    if(!list.length) list = parseHEX(text);
    if(!list.length){                                  // 最後才硬撿
      const seen = [];
      for(const line of String(text).split(/\r?\n/)){ const m = HEXRE.exec(line); if(m) seen.push('#' + m[1].toLowerCase()); }
      list = seen;
    }
    return dedupe(list);
  }
  function dedupe(list){
    const seen = new Set(), out = [];
    for(const c of list){ const h = hex6(c); if(!isHex(h) || seen.has(h)) continue; seen.add(h); out.push(h); }
    return out;
  }

  const API = { shadeRamp, blendRamp, sortOrder, mergeSimilar, nearest, dedupe,
    parseGPL, writeGPL, parseHEX, writeHEX, parsePAL, writePAL, parseAny,
    luma, dist2, hueDelta, rgbHsv, hsvRgb, hexRGB, rgbHex, hex6, isHex };
  if(typeof module !== 'undefined' && module.exports) module.exports = API;
  global.DipPixelPalette = API;
})(typeof window !== 'undefined' ? window : globalThis);
