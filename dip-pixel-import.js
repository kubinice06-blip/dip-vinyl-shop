// dip 像素匯入分析：把外部圖檔（AI 生成的像素風、放大過的截圖、平塗插畫）
// 變成能進 art/pixel 的索引色像素圖。
//
// 這支檔案**不碰 DOM**，輸入輸出都是純資料，所以 node 也跑得動、可以直接寫單元測試。
//   影像 IMG = { data: Uint8ClampedArray(RGBA), width, height }
//   索引圖 IDX = { data: Uint8Array(每格一個色盤編號，0＝透明), width, height, palette: ['#hex', ...] }
//                 palette[0] 不存在；索引 1 對應 palette[0]。
//
// 典型流程（pixel-editor.html 的匯入視窗就是照這個順序跑）：
//   去背 removeBackground → 縮到目標尺寸（detectGrid＋downsampleMode 還原格子，
//   或 areaAverage 面積平均）→ 抽色盤 medianCut（或沿用現有）→ quantize（可選網點）
//   → despeckle 清雜點 →（可選）sliceComponents 切成多個物件
(function(global){
  'use strict';

  // ══════════════ 基本工具 ══════════════
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const hex6 = c => { c = String(c||'').trim(); const m = /^#([0-9a-f]{3})$/i.exec(c);
    return m ? '#' + m[1].split('').map(x => x+x).join('') : c.slice(0,7).toLowerCase(); };
  const hexRGB = hx => { hx = hex6(hx).replace('#',''); return [parseInt(hx.slice(0,2),16)||0, parseInt(hx.slice(2,4),16)||0, parseInt(hx.slice(4,6),16)||0]; };
  const rgbHex = (r,g,b) => '#' + [r,g,b].map(v => clamp(Math.round(v),0,255).toString(16).padStart(2,'0')).join('');
  const newImg = (w, h) => ({ data: new Uint8ClampedArray(w*h*4), width:w, height:h });
  function cloneImg(img){ return { data: new Uint8ClampedArray(img.data), width:img.width, height:img.height }; }
  // 感知加權的顏色距離平方（綠色權重高，跟人眼一致；比純歐氏準）
  function dist2(r1,g1,b1, r2,g2,b2){ const dr = r1-r2, dg = g1-g2, db = b1-b2;
    return 2*dr*dr + 4*dg*dg + 3*db*db; }

  // ══════════════ 1. 去背 ══════════════
  // opts: { mode:'none'|'alpha'|'border'|'color', color:'#hex', tolerance:0..255, contiguous:true }
  // 回傳新的 IMG（alpha=0 的就是背景）。原圖不動。
  function removeBackground(img, opts){
    opts = opts || {};
    const mode = opts.mode || 'alpha';
    const out = cloneImg(img);
    const w = img.width, h = img.height, d = out.data;
    if(mode === 'none') return out;
    // alpha：本來就有透明度的 PNG，直接把半透明當背景
    if(mode === 'alpha'){ for(let i = 0; i < w*h; i++) if(d[i*4+3] < 128) d[i*4+3] = 0; return out; }

    const tol2 = Math.pow(opts.tolerance == null ? 24 : opts.tolerance, 2) * 9;   // 跟 dist2 的權重量級對齊
    let key;
    if(mode === 'color' && opts.color) key = hexRGB(opts.color);
    else key = borderDominantColor(img);

    const match = i => { const o = i*4;
      return d[o+3] >= 128 && dist2(d[o], d[o+1], d[o+2], key[0], key[1], key[2]) <= tol2; };

    if(opts.contiguous === false || mode === 'color'){
      for(let i = 0; i < w*h; i++) if(match(i)) d[i*4+3] = 0;
      return out;
    }
    // 從四邊界往內 flood fill，只清「連到邊界」的背景（人物中間同色的洞會留著）
    const seen = new Uint8Array(w*h), st = [];
    for(let x = 0; x < w; x++){ st.push(x); st.push((h-1)*w + x); }
    for(let y = 0; y < h; y++){ st.push(y*w); st.push(y*w + w-1); }
    while(st.length){ const i = st.pop(); if(seen[i]) continue; seen[i] = 1;
      if(!match(i)) continue;
      d[i*4+3] = 0;
      const x = i % w, y = (i / w) | 0;
      if(x > 0) st.push(i-1); if(x < w-1) st.push(i+1);
      if(y > 0) st.push(i-w); if(y < h-1) st.push(i+w); }
    return out;
  }
  // 邊框上最常見的顏色（量化到 5 bit 分箱再取眾數，抗雜訊）
  function borderDominantColor(img){
    const w = img.width, h = img.height, d = img.data, bins = new Map();
    const add = i => { const o = i*4; if(d[o+3] < 128) return;
      const k = ((d[o] >> 3) << 10) | ((d[o+1] >> 3) << 5) | (d[o+2] >> 3);
      const e = bins.get(k) || [0,0,0,0]; e[0] += d[o]; e[1] += d[o+1]; e[2] += d[o+2]; e[3]++; bins.set(k, e); };
    for(let x = 0; x < w; x++){ add(x); add((h-1)*w + x); }
    for(let y = 0; y < h; y++){ add(y*w); add(y*w + w-1); }
    let best = null, bn = 0;
    for(const e of bins.values()) if(e[3] > bn){ bn = e[3]; best = e; }
    return best ? [best[0]/best[3], best[1]/best[3], best[2]/best[3]] : [255,255,255];
  }

  // ══════════════ 2. 像素格偵測 ══════════════
  // 放大過的像素圖／AI 生成的像素風：估出「一格等於幾個螢幕像素」與偏移。
  // 做法：算每一欄（列）與前一欄的差異能量，再對每個候選格寬 k 與偏移 off 打分：
  //   captured  = 邊界位置抓到的能量 ÷ 總能量          （k 太大會漏掉能量）
  //   coverage  = 有明顯能量的邊界位置比例             （k 太小會有空的邊界）
  //   score     = captured × coverage                 （兩邊都要好）
  // 回傳 { cell:{x,y}, offset:{x,y}, score:{x,y}, cols, rows }
  function detectGrid(img, opts){
    opts = opts || {};
    const maxCell = opts.maxCell || 64, minCell = opts.minCell || 1;
    const cols = edgeEnergy(img, 'x'), rows = edgeEnergy(img, 'y');
    const bx = bestPeriod(cols, minCell, Math.min(maxCell, img.width >> 1));
    const by = bestPeriod(rows, minCell, Math.min(maxCell, img.height >> 1));
    return { cell:{ x:bx.k, y:by.k }, offset:{ x:bx.off, y:by.off }, score:{ x:bx.score, y:by.score }, cols, rows };
  }
  // 每一欄跟左邊那欄的顏色差總和（axis='y' 時是每一列跟上面那列）
  function edgeEnergy(img, axis){
    const w = img.width, h = img.height, d = img.data;
    const n = axis === 'x' ? w : h, m = axis === 'x' ? h : w;
    const out = new Float64Array(n);
    for(let i = 1; i < n; i++){
      let s = 0;
      for(let j = 0; j < m; j++){
        const a = axis === 'x' ? (j*w + i) : (i*w + j);
        const b = axis === 'x' ? (j*w + i-1) : ((i-1)*w + j);
        const oa = a*4, ob = b*4;
        // 透明與不透明的交界也算邊界
        s += Math.sqrt(dist2(d[oa], d[oa+1], d[oa+2], d[ob], d[ob+1], d[ob+2])) + Math.abs(d[oa+3] - d[ob+3]) * 2;
      }
      out[i] = s / m;
    }
    return out;
  }
  function bestPeriod(energy, minK, maxK){
    const n = energy.length;
    let total = 0, peak = 0;
    for(let i = 1; i < n; i++){ total += energy[i]; if(energy[i] > peak) peak = energy[i]; }
    if(total <= 0 || n < 4) return { k:1, off:0, score:0 };
    const sig = peak * 0.18;                       // 「這個位置算不算有邊界」的門檻
    let best = { k:1, off:0, score:0 };
    for(let k = Math.max(2, minK); k <= maxK; k++){
      for(let off = 0; off < k; off++){
        let cap = 0, hit = 0, slots = 0;
        for(let i = off; i < n; i += k){ if(i === 0) continue; slots++; cap += energy[i]; if(energy[i] >= sig) hit++; }
        if(slots < 2) continue;
        const score = (cap/total) * (hit/slots);
        if(score > best.score + 1e-9) best = { k, off, score };
      }
    }
    // 分數相近時取最小的 k（避免選到真正格寬的倍數）
    for(let k = Math.max(2, minK); k < best.k; k++){
      for(let off = 0; off < k; off++){
        let cap = 0, hit = 0, slots = 0;
        for(let i = off; i < n; i += k){ if(i === 0) continue; slots++; cap += energy[i]; if(energy[i] >= sig) hit++; }
        if(slots < 2) continue;
        if((cap/total) * (hit/slots) >= best.score * 0.97) return { k, off, score:best.score };
      }
    }
    return best;
  }

  // ══════════════ 3. 縮到目標尺寸 ══════════════
  // 依偵測到的格子還原：每一格取「內縮一圈之後的眾數色」，抗邊緣抗鋸齒。
  function downsampleMode(img, cell, offset){
    const cw = Math.max(1, Math.round(cell.x)), ch = Math.max(1, Math.round(cell.y));
    const ox = ((offset && offset.x) || 0) % cw, oy = ((offset && offset.y) || 0) % ch;
    // 第一格可能被偏移切掉一半，往左上補一格
    const x0 = ox ? ox - cw : 0, y0 = oy ? oy - ch : 0;
    const outW = Math.ceil((img.width - x0) / cw), outH = Math.ceil((img.height - y0) / ch);
    const out = newImg(outW, outH), d = img.data, w = img.width, h = img.height;
    const inset = c => c >= 4 ? 1 : 0;
    const ix = inset(cw), iy = inset(ch);
    for(let gy = 0; gy < outH; gy++) for(let gx = 0; gx < outW; gx++){
      const sx0 = clamp(x0 + gx*cw + ix, 0, w-1), sx1 = clamp(x0 + (gx+1)*cw - 1 - ix, 0, w-1);
      const sy0 = clamp(y0 + gy*ch + iy, 0, h-1), sy1 = clamp(y0 + (gy+1)*ch - 1 - iy, 0, h-1);
      const bins = new Map(); let alphaSum = 0, alphaN = 0;
      for(let y = sy0; y <= sy1; y++) for(let x = sx0; x <= sx1; x++){
        const o = (y*w + x)*4;
        alphaSum += d[o+3]; alphaN++;
        if(d[o+3] < 128) continue;
        const k = ((d[o] >> 4) << 8) | ((d[o+1] >> 4) << 4) | (d[o+2] >> 4);
        const e = bins.get(k) || [0,0,0,0]; e[0] += d[o]; e[1] += d[o+1]; e[2] += d[o+2]; e[3]++; bins.set(k, e);
      }
      const oo = (gy*outW + gx)*4;
      let best = null, bn = 0;
      for(const e of bins.values()) if(e[3] > bn){ bn = e[3]; best = e; }
      if(best && alphaN && (alphaSum/alphaN) >= 96){
        out.data[oo] = best[0]/best[3]; out.data[oo+1] = best[1]/best[3]; out.data[oo+2] = best[2]/best[3]; out.data[oo+3] = 255;
      } else out.data[oo+3] = 0;
    }
    return out;
  }
  // 面積平均縮圖：一般圖片縮小的正確做法（比最近鄰不會漏細節、比雙線性不會糊）
  function areaAverage(img, outW, outH){
    const out = newImg(outW, outH), w = img.width, h = img.height, d = img.data;
    const sx = w / outW, sy = h / outH;
    for(let gy = 0; gy < outH; gy++) for(let gx = 0; gx < outW; gx++){
      const x0 = gx*sx, x1 = (gx+1)*sx, y0 = gy*sy, y1 = (gy+1)*sy;
      let r = 0, g = 0, b = 0, a = 0, wsum = 0;
      for(let y = Math.floor(y0); y < Math.min(h, Math.ceil(y1)); y++){
        const fy = Math.min(y+1, y1) - Math.max(y, y0); if(fy <= 0) continue;
        for(let x = Math.floor(x0); x < Math.min(w, Math.ceil(x1)); x++){
          const fx = Math.min(x+1, x1) - Math.max(x, x0); if(fx <= 0) continue;
          const f = fx*fy, o = (y*w + x)*4, al = d[o+3]/255;
          r += d[o]*f*al; g += d[o+1]*f*al; b += d[o+2]*f*al; a += d[o+3]*f; wsum += f*al;
        }
      }
      const oo = (gy*outW + gx)*4, area = sx*sy;
      const alpha = a/area;
      if(wsum > 1e-6 && alpha >= 96){ out.data[oo] = r/wsum; out.data[oo+1] = g/wsum; out.data[oo+2] = b/wsum; out.data[oo+3] = 255; }
      else out.data[oo+3] = 0;
    }
    return out;
  }

  // ══════════════ 4. 抽色盤（中位切分）══════════════
  // 原圖用到的顏色本來就不超過 n 種時**直接照抄**（重新匯入像素圖的主要情況，
  // 一個色都不能失真）；超過才跑中位切分：所有不透明像素裝進一個盒子，
  // 反覆沿最長邊從中位數切開，切到 n 個盒子，每盒取平均色。
  function medianCut(img, n){
    n = clamp(n|0, 1, 256);
    const d = img.data, px = [];
    for(let i = 0; i < img.width*img.height; i++){ const o = i*4;
      if(d[o+3] >= 128) px.push([d[o], d[o+1], d[o+2]]); }
    if(!px.length) return [];
    const exact = exactColors(img, n);
    if(exact) return exact;
    let boxes = [px];
    while(boxes.length < n){
      // 挑「體積×像素數」最大的盒子來切
      let bi = -1, bs = -1;
      for(let i = 0; i < boxes.length; i++){
        const b = boxes[i]; if(b.length < 2) continue;
        const r = ranges(b), v = (r.max[0]-r.min[0]) * (r.max[1]-r.min[1]) * (r.max[2]-r.min[2]);
        const s = Math.max(r.max[0]-r.min[0], r.max[1]-r.min[1], r.max[2]-r.min[2]) * Math.log(b.length + 1);
        if(s > bs && (v > 0 || Math.max(r.max[0]-r.min[0], r.max[1]-r.min[1], r.max[2]-r.min[2]) > 0)){ bs = s; bi = i; }
      }
      if(bi < 0) break;
      const b = boxes[bi], r = ranges(b);
      const ch = [0,1,2].reduce((a, c) => (r.max[c]-r.min[c]) > (r.max[a]-r.min[a]) ? c : a, 0);
      b.sort((p, q) => p[ch] - q[ch]);
      const mid = b.length >> 1;
      const lo = b.slice(0, mid), hi = b.slice(mid);
      if(!lo.length || !hi.length) break;
      boxes.splice(bi, 1, lo, hi);
    }
    return boxes.map(b => { let r = 0, g = 0, bl = 0;
      for(const p of b){ r += p[0]; g += p[1]; bl += p[2]; }
      return rgbHex(r/b.length, g/b.length, bl/b.length); });
  }
  // 圖裡用到的相異顏色 ≤ limit 就回傳（依出現次數多到少），否則回傳 null
  function exactColors(img, limit){
    const d = img.data, seen = new Map();
    for(let i = 0; i < img.width*img.height; i++){ const o = i*4;
      if(d[o+3] < 128) continue;
      const k = (d[o] << 16) | (d[o+1] << 8) | d[o+2];
      seen.set(k, (seen.get(k) || 0) + 1);
      if(seen.size > limit) return null; }
    return [...seen.entries()].sort((a, b) => b[1] - a[1])
      .map(([k]) => rgbHex((k >> 16) & 255, (k >> 8) & 255, k & 255));
  }
  function ranges(b){ const min = [255,255,255], max = [0,0,0];
    for(const p of b) for(let c = 0; c < 3; c++){ if(p[c] < min[c]) min[c] = p[c]; if(p[c] > max[c]) max[c] = p[c]; }
    return { min, max }; }

  // ══════════════ 5. 量化到色盤（可選網點）══════════════
  const BAYER4 = [[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
  const BAYER8 = (() => { const m = [];
    for(let y = 0; y < 8; y++){ m.push([]); for(let x = 0; x < 8; x++){
      let v = 0, mask = 4, xc = x ^ y, yc = y;
      for(let bit = 0; bit < 3; bit++){ v = (v << 1) | ((yc & mask) ? 1 : 0); v = (v << 1) | ((xc & mask) ? 1 : 0); mask >>= 1; }
      m[y].push(v); } }
    return m; })();
  // dither: 'none' | 'bayer2' | 'bayer4' | 'bayer8' | 'floyd'
  function quantize(img, palette, opts){
    opts = opts || {};
    const dither = opts.dither || 'none';
    const w = img.width, h = img.height;
    const pal = palette.map(hexRGB);
    const out = { data: new Uint8Array(w*h), width:w, height:h, palette: palette.slice() };
    if(!pal.length) return out;
    const src = dither === 'floyd' ? Float32Array.from(img.data) : img.data;
    const nearest2 = (r, g, b) => { let i1 = 0, d1 = Infinity, i2 = 0, d2 = Infinity;
      for(let i = 0; i < pal.length; i++){ const p = pal[i], dd = dist2(r, g, b, p[0], p[1], p[2]);
        if(dd < d1){ d2 = d1; i2 = i1; d1 = dd; i1 = i; } else if(dd < d2){ d2 = dd; i2 = i; } }
      return [i1, i2]; };
    const bm = dither === 'bayer2' ? [[0,2],[3,1]] : dither === 'bayer4' ? BAYER4 : dither === 'bayer8' ? BAYER8 : null;
    const bden = dither === 'bayer2' ? 4 : dither === 'bayer4' ? 16 : 64;
    for(let y = 0; y < h; y++) for(let x = 0; x < w; x++){
      const i = y*w + x, o = i*4;
      if(img.data[o+3] < 128){ out.data[i] = 0; continue; }
      let r = src[o], g = src[o+1], b = src[o+2];
      r = clamp(r, 0, 255); g = clamp(g, 0, 255); b = clamp(b, 0, 255);
      const [i1, i2] = nearest2(r, g, b);
      let pick = i1;
      if(bm && i2 !== i1){
        // 把像素投影到 c1→c2 的連線上，用 Bayer 門檻決定倒向哪一邊
        const a = pal[i1], c = pal[i2];
        const vx = c[0]-a[0], vy = c[1]-a[1], vz = c[2]-a[2];
        const len2 = vx*vx + vy*vy + vz*vz;
        if(len2 > 1e-6){
          const t = clamp(((r-a[0])*vx + (g-a[1])*vy + (b-a[2])*vz) / len2, 0, 1);
          const thr = (bm[y % bm.length][x % bm[0].length] + 0.5) / bden;
          pick = t > thr ? i2 : i1;
        }
      }
      out.data[i] = pick + 1;
      if(dither === 'floyd'){
        const p = pal[pick];
        const er = r - p[0], eg = g - p[1], eb = b - p[2];
        const push = (xx, yy, f) => { if(xx < 0 || yy < 0 || xx >= w || yy >= h) return;
          const oo = (yy*w + xx)*4; if(img.data[oo+3] < 128) return;
          src[oo] += er*f; src[oo+1] += eg*f; src[oo+2] += eb*f; };
        push(x+1, y, 7/16); push(x-1, y+1, 3/16); push(x, y+1, 5/16); push(x+1, y+1, 1/16);
      }
    }
    return out;
  }

  // ══════════════ 6. 清雜點 ══════════════
  // 八鄰居裡同色的數量少於 minSame 就換成鄰居的眾數色（孤立像素、殘留的抗鋸齒點）
  function despeckle(idx, minSame){
    minSame = minSame == null ? 1 : minSame;
    const w = idx.width, h = idx.height, a = idx.data, out = new Uint8Array(a);
    for(let y = 0; y < h; y++) for(let x = 0; x < w; x++){
      const i = y*w + x, v = a[i];
      const counts = new Map(); let same = 0, tot = 0;
      for(let dy = -1; dy <= 1; dy++) for(let dx = -1; dx <= 1; dx++){
        if(!dx && !dy) continue;
        const nx = x+dx, ny = y+dy; if(nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const nv = a[ny*w + nx]; tot++;
        if(nv === v) same++;
        counts.set(nv, (counts.get(nv)||0) + 1);
      }
      if(tot && same <= minSame - 1){
        let bv = v, bn = -1;
        for(const [k, n] of counts) if(n > bn){ bn = n; bv = k; }
        out[i] = bv;
      }
    }
    return { data: out, width:w, height:h, palette: idx.palette.slice() };
  }

  // ══════════════ 7. 自動切件 ══════════════
  // 找出不透明的連通區域，每一塊回傳一張裁好的子圖。
  // opts: { minArea:12, gap:0（先膨脹幾格再找連通，用來把分開的零件併成一件）, diagonal:true }
  function sliceComponents(idx, opts){
    opts = opts || {};
    const minArea = opts.minArea == null ? 12 : opts.minArea;
    const gap = opts.gap == null ? 0 : opts.gap;
    const diag = opts.diagonal !== false;
    const w = idx.width, h = idx.height, a = idx.data;
    // 膨脹後的遮罩只拿來分群，裁切內容還是用原圖
    let mask = new Uint8Array(w*h);
    for(let i = 0; i < w*h; i++) mask[i] = a[i] ? 1 : 0;
    for(let s = 0; s < gap; s++){
      const nm = new Uint8Array(w*h);
      for(let y = 0; y < h; y++) for(let x = 0; x < w; x++){
        const i = y*w + x;
        if(mask[i]){ nm[i] = 1; continue; }
        if((x > 0 && mask[i-1]) || (x < w-1 && mask[i+1]) || (y > 0 && mask[i-w]) || (y < h-1 && mask[i+w])) nm[i] = 1;
      }
      mask = nm;
    }
    const lab = new Int32Array(w*h).fill(-1);
    const comps = [];
    for(let i0 = 0; i0 < w*h; i0++){
      if(!mask[i0] || lab[i0] >= 0) continue;
      const id = comps.length, st = [i0];
      let x0 = w, y0 = h, x1 = -1, y1 = -1, area = 0;
      lab[i0] = id;
      while(st.length){
        const i = st.pop(); const x = i % w, y = (i / w) | 0;
        if(a[i]){ area++; if(x < x0) x0 = x; if(y < y0) y0 = y; if(x > x1) x1 = x; if(y > y1) y1 = y; }
        for(let dy = -1; dy <= 1; dy++) for(let dx = -1; dx <= 1; dx++){
          if(!dx && !dy) continue;
          if(!diag && dx && dy) continue;
          const nx = x+dx, ny = y+dy; if(nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const ni = ny*w + nx; if(mask[ni] && lab[ni] < 0){ lab[ni] = id; st.push(ni); }
        }
      }
      comps.push({ id, x0, y0, x1, y1, area });
    }
    return comps.filter(c => c.area >= minArea && c.x1 >= c.x0).map(c => {
      const cw = c.x1-c.x0+1, chh = c.y1-c.y0+1, data = new Uint8Array(cw*chh);
      for(let y = 0; y < chh; y++) for(let x = 0; x < cw; x++){
        const si = (y+c.y0)*w + (x+c.x0);
        if(lab[si] === c.id) data[y*cw + x] = a[si];
      }
      return { data, width:cw, height:chh, palette: idx.palette.slice(),
               x:c.x0, y:c.y0, area:c.area };
    }).sort((p, q) => q.area - p.area);
  }

  // ══════════════ 8. 格式轉換 ══════════════
  // 索引圖 → art/pixel 的 rows 字串（需要色盤字元表）
  function idxToRows(idx, keys){
    const rows = [];
    for(let y = 0; y < idx.height; y++){ let s = '';
      for(let x = 0; x < idx.width; x++) s += keys[idx.data[y*idx.width + x]] || '.';
      rows.push(s); }
    return rows;
  }
  // 索引圖 → RGBA（預覽用）
  function idxToImg(idx){
    const out = newImg(idx.width, idx.height), pal = idx.palette.map(hexRGB);
    for(let i = 0; i < idx.data.length; i++){ const v = idx.data[i]; if(!v) continue;
      const c = pal[v-1]; if(!c) continue; const o = i*4;
      out.data[o] = c[0]; out.data[o+1] = c[1]; out.data[o+2] = c[2]; out.data[o+3] = 255; }
    return out;
  }
  const countColors = idx => { const s = new Set(); for(const v of idx.data) if(v) s.add(v); return s.size; };

  // ══════════════ 一次跑完 ══════════════
  // opts: { bg:{...removeBackground 的 opts}, mode:'grid'|'scale',
  //         cell, offset,                    // mode='grid'
  //         outW, outH,                      // mode='scale'
  //         palette:['#hex'] | null, colors:16,   // 給了 palette 就沿用，否則抽 colors 色
  //         extraPalette:['#hex'],           // 沿用時允許補這些色（現有色盤 ＋ 自動補）
  //         dither:'none', despeckle:0 }
  function analyze(img, opts){
    opts = opts || {};
    const steps = {};
    let cur = removeBackground(img, opts.bg || { mode:'alpha' });
    steps.afterBg = cur;
    if(opts.mode === 'grid'){
      const cell = opts.cell || detectGrid(cur).cell;
      cur = downsampleMode(cur, cell, opts.offset || { x:0, y:0 });
    } else if(opts.outW && opts.outH && (opts.outW !== cur.width || opts.outH !== cur.height)){
      cur = areaAverage(cur, opts.outW, opts.outH);
    }
    steps.small = cur;
    let palette = opts.palette && opts.palette.length ? opts.palette.slice() : medianCut(cur, opts.colors || 16);
    if(opts.extraPalette && opts.extraPalette.length){
      const have = new Set(palette.map(hex6));
      for(const c of opts.extraPalette) if(!have.has(hex6(c))){ palette.push(hex6(c)); have.add(hex6(c)); }
    }
    let idx = quantize(cur, palette, { dither: opts.dither || 'none' });
    if(opts.despeckle) idx = despeckle(idx, opts.despeckle);
    return { idx, palette, steps };
  }

  const API = { removeBackground, borderDominantColor, detectGrid, edgeEnergy, bestPeriod,
    downsampleMode, areaAverage, medianCut, exactColors, quantize, despeckle, sliceComponents,
    idxToRows, idxToImg, countColors, analyze, newImg, cloneImg, hexRGB, rgbHex, hex6, dist2, BAYER4, BAYER8 };
  if(typeof module !== 'undefined' && module.exports) module.exports = API;
  global.DipPixelImport = API;
})(typeof window !== 'undefined' ? window : globalThis);
