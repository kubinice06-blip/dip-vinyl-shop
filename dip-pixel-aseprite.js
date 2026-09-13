// dip 像素：讀 Aseprite 的 .aseprite／.ase 檔，轉成 art/pixel 的索引色格式。
//
// 這支檔案**不碰 DOM**，輸入是 ArrayBuffer／Uint8Array，輸出是純資料，所以 node 也跑得動。
// 唯一的外部相依是解壓縮：cel 的像素資料是 zlib（deflate）壓的，所以要傳一個
//   inflate(Uint8Array) -> Promise<Uint8Array>
// 進來。瀏覽器用 DecompressionStream('deflate')，node 用 zlib.inflateSync 包一層。
//
// 支援到哪裡：
//   ✔ 8 bit 索引色、16 bit 灰階、32 bit RGBA 三種色彩深度
//   ✔ 多圖層（含群組圖層：跳過但不會弄亂圖層編號）、多格、cel 的 x/y 偏移
//   ✔ cel 三種型態：raw(0)、linked(1)、compressed image(2)
//   ✔ 新舊兩種色盤區塊（0x2019 與 0x0004／0x0011）、動畫標籤（0x2018）、每格時間
//   ✘ 圖層不透明度與混合模式（我們的格式沒有 alpha，一律當成 normal／不透明，會列進 warnings）
//   ✘ tilemap 圖層與 tileset（列進 warnings 後跳過）
(function(global){
  'use strict';

  const rgbHex = (r,g,b) => '#' + [r,g,b].map(v => Math.max(0, Math.min(255, v|0)).toString(16).padStart(2,'0')).join('');

  // ══════════════ 位元組讀取 ══════════════
  function reader(u8){
    let p = 0;
    const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
    const R = {
      get pos(){ return p; },
      seek(n){ p = n; },
      skip(n){ p += n; },
      left(){ return u8.length - p; },
      byte(){ return u8[p++]; },
      word(){ const v = dv.getUint16(p, true); p += 2; return v; },
      short(){ const v = dv.getInt16(p, true); p += 2; return v; },
      dword(){ const v = dv.getUint32(p, true); p += 4; return v; },
      long(){ const v = dv.getInt32(p, true); p += 4; return v; },
      bytes(n){ const v = u8.subarray(p, p + n); p += n; return v; },
      // Aseprite 的字串：WORD 長度 ＋ UTF-8 位元組
      string(){ const n = R.word(); const b = R.bytes(n);
        return (typeof TextDecoder !== 'undefined') ? new TextDecoder('utf-8').decode(b)
          : Array.from(b).map(c => String.fromCharCode(c)).join(''); },
    };
    return R;
  }

  const CHUNK = { OLD_PAL_A:0x0004, OLD_PAL_B:0x0011, LAYER:0x2004, CEL:0x2005, CEL_EXTRA:0x2006,
    COLOR_PROFILE:0x2007, TAGS:0x2018, PALETTE:0x2019, USER_DATA:0x2020, SLICE:0x2022, TILESET:0x2023 };

  async function parseAseprite(buffer, inflate){
    const u8 = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    if(u8.length < 128) throw new Error('檔案太小，不像 .aseprite');
    const R = reader(u8);
    const warnings = [];

    R.dword();                                   // 檔案大小（不驗，Aseprite 自己也不一定寫對）
    const magic = R.word();
    if(magic !== 0xA5E0) throw new Error('不是 .aseprite 檔（檔頭魔數不對）');
    const nFrames = R.word();
    const width = R.word(), height = R.word();
    const colorDepth = R.word();                 // 32＝RGBA、16＝灰階、8＝索引
    R.dword();                                   // flags
    R.word();                                    // speed（已廢棄）
    R.dword(); R.dword();
    const transparentIndex = R.byte();
    R.skip(3);
    R.word();                                    // number of colors（不可靠，以色盤區塊為準）
    R.skip(2);                                   // pixel width / height
    R.skip(8);                                   // grid
    R.skip(84);                                  // reserved
    if(![8, 16, 32].includes(colorDepth)) throw new Error('看不懂的色彩深度：' + colorDepth);

    const bpp = colorDepth / 8;
    const layers = [];
    const palette = [];
    const tags = [];
    const frames = [];

    for(let f = 0; f < nFrames; f++){
      if(R.left() < 16){ warnings.push(`第 ${f+1} 格之後的資料截斷了`); break; }
      const frameStart = R.pos;
      const frameBytes = R.dword();
      const fmagic = R.word();
      if(fmagic !== 0xF1FA) throw new Error(`第 ${f+1} 格的魔數不對`);
      const oldCount = R.word();
      const duration = R.word();
      R.skip(2);
      const newCount = R.dword();
      const nChunks = newCount || oldCount;
      const frame = { duration: duration || 100, cels: [] };

      for(let c = 0; c < nChunks; c++){
        if(R.left() < 6) break;
        const chunkStart = R.pos;
        const chunkSize = R.dword();
        const type = R.word();
        const dataEnd = chunkStart + Math.max(6, chunkSize);

        if(type === CHUNK.LAYER){
          const flags = R.word(), layerType = R.word(), childLevel = R.word();
          R.word(); R.word();                    // default width / height（規格說忽略）
          const blend = R.word(), opacity = R.byte();
          R.skip(3);
          const name = R.string();
          layers.push({ name: name || ('圖層 ' + (layers.length + 1)), visible: !!(flags & 1),
            editable: !!(flags & 2), background: !!(flags & 8), type: layerType, childLevel, blend, opacity });
          if(layerType === 2) warnings.push(`圖層「${name}」是 tilemap，跳過`);
          if(layerType === 0 && blend !== 0) warnings.push(`圖層「${name}」用了混合模式，當成一般圖層處理`);
          if(layerType === 0 && opacity !== 255) warnings.push(`圖層「${name}」不透明度 ${Math.round(opacity/255*100)}%，當成不透明處理`);
        }
        else if(type === CHUNK.CEL){
          const layerIndex = R.word();
          const x = R.short(), y = R.short();
          const opacity = R.byte();
          const celType = R.word();
          R.short();                             // z-index（1.3 之後才有）
          R.skip(5);
          if(celType === 0 || celType === 2){
            const cw = R.word(), ch = R.word();
            let raw;
            if(celType === 0) raw = R.bytes(cw * ch * bpp).slice();
            else {
              const comp = R.bytes(dataEnd - R.pos);
              if(!inflate) throw new Error('這個檔案的 cel 是壓縮的，需要 inflate');
              raw = await inflate(comp.slice());
            }
            frame.cels.push({ layer: layerIndex, x, y, w: cw, h: ch, data: raw, opacity });
          } else if(celType === 1){
            const link = R.word();
            frame.cels.push({ layer: layerIndex, link, opacity });
          } else {
            warnings.push(`第 ${f+1} 格有 tilemap cel，跳過`);
          }
        }
        else if(type === CHUNK.PALETTE){
          const size = R.dword(), first = R.dword(), last = R.dword();
          R.skip(8);
          for(let i = first; i <= last; i++){
            const flags = R.word();
            const r = R.byte(), g = R.byte(), b = R.byte(), a = R.byte();
            if(flags & 1) R.string();
            palette[i] = { hex: rgbHex(r, g, b), a };
          }
          palette.length = Math.max(palette.length, size);
        }
        else if(type === CHUNK.OLD_PAL_A || type === CHUNK.OLD_PAL_B){
          // 舊色盤：0x0004 是 0–255，0x0011 是 0–63（VGA），只有在沒有新色盤時才採用
          const packets = R.word();
          let idx = 0;
          const scale = type === CHUNK.OLD_PAL_B ? 255/63 : 1;
          for(let pk = 0; pk < packets; pk++){
            idx += R.byte();
            let n = R.byte(); if(n === 0) n = 256;
            for(let i = 0; i < n; i++){
              const r = R.byte(), g = R.byte(), b = R.byte();
              if(palette[idx] === undefined)
                palette[idx] = { hex: rgbHex(r*scale, g*scale, b*scale), a: 255 };
              idx++;
            }
          }
        }
        else if(type === CHUNK.TAGS){
          const n = R.word(); R.skip(8);
          for(let i = 0; i < n; i++){
            const from = R.word(), to = R.word(), dir = R.byte();
            R.skip(8);                           // repeat ＋ reserved
            R.skip(3);                           // 舊版的 RGB（已廢棄）
            R.byte();
            const name = R.string();
            tags.push({ name, from, to, dir });
          }
        }
        R.seek(dataEnd);                         // 不管讀到哪，都照區塊長度跳到下一塊
      }
      frames.push(frame);
      if(frameBytes > 16) R.seek(frameStart + frameBytes);
    }

    // 索引色的透明編號：對應的色盤格其實不該被畫出來
    return { width, height, colorDepth, transparentIndex, nFrames: frames.length,
      palette: palette.map(p => p || { hex:'#000000', a:0 }), layers, frames, tags, warnings };
  }

  // ══════════════ 轉成我們的索引色格式 ══════════════
  // 回傳 { w, h, palette:['#hex'...], layers:[{ name, visible, locked, cels:[Uint8Array] }],
  //        durations:[ms], tags:[{name,from,to}], warnings:[] }
  // 像素值 0 一律是透明，色盤編號 1 起算（跟 art/pixel 一致）。
  function asepriteToIndexed(ase, opts){
    opts = opts || {};
    const maxColors = Math.max(2, opts.maxColors || 255);
    const W = ase.width, H = ase.height, N = W * H;
    const warnings = ase.warnings.slice();
    const bpp = ase.colorDepth / 8;

    // 先把每個 cel 的像素攤成「每格一個 #hex 或 null（透明）」
    const hexAt = (raw, i) => {
      if(ase.colorDepth === 32){
        const o = i*4, a = raw[o+3];
        if(a < 128) return null;
        if(a < 255) return rgbHex(raw[o], raw[o+1], raw[o+2]);   // 半透明一律當成不透明
        return rgbHex(raw[o], raw[o+1], raw[o+2]);
      }
      if(ase.colorDepth === 16){
        const o = i*2, v = raw[o], a = raw[o+1];
        return a < 128 ? null : rgbHex(v, v, v);
      }
      const v = raw[i];
      if(v === ase.transparentIndex) return null;
      const e = ase.palette[v];
      if(!e || e.a < 128) return null;
      return e.hex;
    };
    if(ase.colorDepth === 32 && ase.frames.some(f => f.cels.some(c => c.data &&
        (() => { for(let i = 3; i < c.data.length; i += 4) if(c.data[i] > 0 && c.data[i] < 255) return true; return false; })())))
      warnings.push('原檔有半透明像素，索引色沒有 alpha，一律當成不透明');

    // 只收「畫得出來的圖層」：群組圖層沒有 cel，tilemap 跳過
    const keep = [];
    ase.layers.forEach((L, i) => { if(L.type === 0) keep.push(i); });
    const slot = new Map(); keep.forEach((li, k) => slot.set(li, k));

    // 第一輪：統計顏色
    const counts = new Map();
    const celOf = (f, li) => {
      let c = ase.frames[f] && ase.frames[f].cels.find(c => c.layer === li);
      let guard = 0;
      while(c && c.link !== undefined && guard++ < 64){
        const src = ase.frames[c.link];
        c = src && src.cels.find(x => x.layer === li && x.link === undefined);
      }
      return c && c.data ? c : null;
    };
    for(let f = 0; f < ase.frames.length; f++) for(const li of keep){
      const c = celOf(f, li); if(!c) continue;
      const n = c.w * c.h;
      for(let i = 0; i < n; i++){ const hx = hexAt(c.data, i); if(hx) counts.set(hx, (counts.get(hx) || 0) + 1); }
    }
    let palette = Array.from(counts.keys()).sort((a, b) => counts.get(b) - counts.get(a));
    let fallback = null;
    if(palette.length > maxColors){
      warnings.push(`原檔有 ${palette.length} 色，超過上限 ${maxColors}，少用的顏色會對應到最接近的保留色`);
      const dropped = palette.slice(maxColors);
      palette = palette.slice(0, maxColors);
      fallback = new Map();
      for(const hx of dropped) fallback.set(hx, nearestHex(palette, hx));
    }
    // 索引色原檔就照著原本的色盤順序排，比較符合作者的直覺（明暗階通常是連號的）
    if(ase.colorDepth === 8 && !fallback){
      const order = [];
      for(let i = 0; i < ase.palette.length; i++){
        const e = ase.palette[i];
        if(i === ase.transparentIndex || !e || e.a < 128) continue;
        if(counts.has(e.hex) && !order.includes(e.hex)) order.push(e.hex);
      }
      for(const hx of palette) if(!order.includes(hx)) order.push(hx);
      palette = order;
    }
    const index = new Map(); palette.forEach((hx, i) => index.set(hx, i + 1));
    const idxOf = hx => index.get(hx) || index.get(fallback && fallback.get(hx)) || 0;

    // 第二輪：畫進整張畫布大小的陣列
    const layers = keep.map(li => ({
      name: ase.layers[li].name, visible: ase.layers[li].visible, locked: !ase.layers[li].editable,
      cels: ase.frames.map(() => new Uint8Array(N)),
    }));
    for(let f = 0; f < ase.frames.length; f++) for(const li of keep){
      const c = celOf(f, li); if(!c) continue;
      const dst = layers[slot.get(li)].cels[f];
      for(let y = 0; y < c.h; y++){
        const ty = c.y + y; if(ty < 0 || ty >= H) continue;
        for(let x = 0; x < c.w; x++){
          const tx = c.x + x; if(tx < 0 || tx >= W) continue;
          const hx = hexAt(c.data, y*c.w + x);
          if(hx) dst[ty*W + tx] = idxOf(hx);
        }
      }
    }

    return { w: W, h: H, palette, layers,
      durations: ase.frames.map(f => f.duration),
      tags: ase.tags.map(t => ({ name: t.name, from: t.from, to: t.to })),
      warnings };
  }

  function nearestHex(list, hx){
    const h = hx.replace('#','');
    const r1 = parseInt(h.slice(0,2),16), g1 = parseInt(h.slice(2,4),16), b1 = parseInt(h.slice(4,6),16);
    let bi = 0, bd = Infinity;
    for(let i = 0; i < list.length; i++){
      const t = list[i].replace('#','');
      const dr = r1 - parseInt(t.slice(0,2),16), dg = g1 - parseInt(t.slice(2,4),16), db = b1 - parseInt(t.slice(4,6),16);
      const d = 2*dr*dr + 4*dg*dg + 3*db*db;
      if(d < bd){ bd = d; bi = i; }
    }
    return list[bi];
  }

  // 瀏覽器版的 inflate（zlib 格式：前面兩個位元組是 zlib 檔頭）
  function browserInflate(){
    if(typeof DecompressionStream === 'undefined') return null;
    return async function(buf){
      const fmt = (buf[0] & 0x0f) === 8 ? 'deflate' : 'deflate-raw';
      const ds = new DecompressionStream(fmt);
      const w = ds.writable.getWriter(); w.write(buf); w.close();
      const parts = []; const rd = ds.readable.getReader();
      for(;;){ const { value, done } = await rd.read(); if(done) break; parts.push(value); }
      let n = 0; for(const p of parts) n += p.length;
      const out = new Uint8Array(n); let o = 0;
      for(const p of parts){ out.set(p, o); o += p.length; }
      return out;
    };
  }

  const API = { parseAseprite, asepriteToIndexed, browserInflate, nearestHex };
  if(typeof module !== 'undefined' && module.exports) module.exports = API;
  global.DipPixelAseprite = API;
})(typeof window !== 'undefined' ? window : globalThis);
