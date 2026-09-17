// dip 像素 GIF 匯出：把索引色的格（每格一個 Uint8Array，0＝透明）寫成 GIF89a。
//
// 這支檔案**不碰 DOM**，輸入輸出都是純資料（回傳 Uint8Array），所以 node 也跑得動、可以直接寫單元測試。
// 索引色本來就是 GIF 的原生格式，所以這裡不需要任何量化——色盤直接變成 GIF 的全域色表，
// 像素值直接就是色表編號。這是「一字元一色」那個取捨少數真的划算的地方。
//
//   encodeGIF({ width, height, palette:['#rrggbb', ...], frames:[{ data:Uint8Array, delay:ms }], loop })
//   palette 給的是**編號 1 起算**的顏色（跟 art/pixel 的色盤一樣），
//   編號 0 是透明，encoder 會自己在色表第 0 格塞一個佔位色並標成透明色。
(function(global){
  'use strict';

  const hexRGB = hx => { hx = String(hx||'').trim().replace('#','');
    if(hx.length === 3) hx = hx.split('').map(c => c+c).join('');
    return [parseInt(hx.slice(0,2),16)||0, parseInt(hx.slice(2,4),16)||0, parseInt(hx.slice(4,6),16)||0]; };

  // ══════════════ LZW（GIF 變體）══════════════
  // 與 TIFF／Unix compress 的差別：清除碼與結束碼固定在色表大小的正上方，
  // 位元由**低位往高位**填（跟大多數格式相反，寫錯的話所有解碼器都會吐）。
  function lzwEncode(minCodeSize, data){
    const clearCode = 1 << minCodeSize, eoiCode = clearCode + 1;
    const out = [];
    let cur = 0, curBits = 0, codeSize = minCodeSize + 1, next = eoiCode + 1;
    let dict = new Map();
    const emit = code => {
      cur |= code << curBits; curBits += codeSize;
      while(curBits >= 8){ out.push(cur & 255); cur >>= 8; curBits -= 8; }
    };
    const reset = () => { dict = new Map(); codeSize = minCodeSize + 1; next = eoiCode + 1; };

    emit(clearCode);
    if(!data.length){ emit(eoiCode); if(curBits) out.push(cur & 255); return out; }

    let prefix = data[0];
    for(let i = 1; i < data.length; i++){
      const k = data[i], key = (prefix << 8) | k;
      const hit = dict.get(key);
      if(hit !== undefined){ prefix = hit; continue; }
      emit(prefix);
      if(next < 4096){
        dict.set(key, next++);
        // 位元數要加寬的時機比解碼器**晚一個條目**。原因：解碼器永遠比編碼器慢一步建表
        // （它要先讀到下一個碼才知道前一個條目的第一個像素是什麼），所以讀第 k 個碼時，
        // 解碼器的表比編碼器少一筆。編碼器寫的是 `next === (1<<codeSize) + 1`、
        // 解碼器讀的是 `next === (1<<codeSize)`，兩邊實際用的位元數才會對齊。
        // 寫成跟解碼器一樣的條件，前幾十個像素就會開始整串錯位（2026-09-13 實測）。
        if(next === (1 << codeSize) + 1 && codeSize < 12) codeSize++;
      } else {
        emit(clearCode); reset();
      }
      prefix = k;
    }
    emit(prefix); emit(eoiCode);
    if(curBits) out.push(cur & 255);
    return out;
  }

  // GIF 的影像資料要切成「一個長度位元組 ＋ 最多 255 個位元組」的小塊，最後補一個 0
  function subBlocks(bytes){
    const out = [];
    for(let i = 0; i < bytes.length; i += 255){
      const chunk = bytes.slice(i, i + 255);
      out.push(chunk.length); for(const b of chunk) out.push(b);
    }
    out.push(0);
    return out;
  }

  function encodeGIF(opts){
    const width = opts.width | 0, height = opts.height | 0;
    const palette = (opts.palette || []).slice();
    const frames = opts.frames || [];
    if(width <= 0 || height <= 0) throw new Error('GIF：尺寸不對');
    if(!frames.length) throw new Error('GIF：一格都沒有');

    // 色表大小一定是 2 的次方，而且至少 2 格
    const need = palette.length + 1;
    let bits = 1; while((1 << bits) < need) bits++;
    if(bits > 8) throw new Error('GIF：超過 256 色');
    const tableSize = 1 << bits;

    const B = [];
    const push = (...b) => { for(const v of b) B.push(v & 255); };
    const u16 = v => push(v & 255, (v >> 8) & 255);
    const str = s => { for(let i = 0; i < s.length; i++) push(s.charCodeAt(i)); };

    str('GIF89a');
    u16(width); u16(height);
    // 有全域色表 ｜ 色彩解析度 8 bit ｜ 不排序 ｜ 色表大小
    push(0x80 | 0x70 | (bits - 1));
    push(0);                      // 背景色＝第 0 格（透明）
    push(0);                      // 像素長寬比：不指定

    // 全域色表：第 0 格是透明的佔位色（用洋紅，萬一哪個古董解碼器不吃透明也看得出來是哪裡錯）
    push(0xff, 0x00, 0xff);
    for(const hx of palette){ const [r,g,b] = hexRGB(hx); push(r, g, b); }
    for(let i = palette.length + 1; i < tableSize; i++) push(0, 0, 0);

    // Netscape 2.0 擴充：循環播放
    if(frames.length > 1 || opts.loop !== false){
      push(0x21, 0xff, 0x0b); str('NETSCAPE2.0');
      push(0x03, 0x01); u16(opts.loop === false ? 1 : (opts.loop | 0)); push(0);
    }

    const minCodeSize = Math.max(2, bits);
    for(const f of frames){
      // 延遲的單位是 1/100 秒。0 與 1 在多數瀏覽器會被當成「跑最快」而自動改成 10，
      // 所以最少給 2，免得存出去的動畫比編輯器裡看到的快好幾倍。
      const delay = Math.max(2, Math.round((f.delay == null ? 100 : f.delay) / 10));
      push(0x21, 0xf9, 0x04);
      push((2 << 2) | 0x01);      // 處置方式 2＝下一格前還原成背景（透明才不會疊起來）；有透明色
      u16(delay);
      push(0, 0);                 // 透明色編號 0、區塊結束
      push(0x2c); u16(0); u16(0); u16(width); u16(height); push(0);   // 影像描述：整張、無區域色表
      push(minCodeSize);
      const data = f.data;
      if(data.length !== width * height) throw new Error('GIF：某一格的大小對不上');
      for(const b of subBlocks(lzwEncode(minCodeSize, data))) push(b);
    }
    push(0x3b);                   // 檔尾
    return new Uint8Array(B);
  }

  // 解碼（只給測試用：驗證自己寫出去的東西讀得回來）。
  // 回傳 { width, height, palette, frames:[{ data, delay, transparent }] }
  function decodeGIF(buf){
    const b = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
    let p = 0;
    const u8 = () => b[p++];
    const u16 = () => { const v = b[p] | (b[p+1] << 8); p += 2; return v; };
    const sig = String.fromCharCode(b[0],b[1],b[2],b[3],b[4],b[5]); p = 6;
    if(sig !== 'GIF89a' && sig !== 'GIF87a') throw new Error('不是 GIF');
    const width = u16(), height = u16();
    const packed = u8(); u8(); u8();
    const gctSize = (packed & 0x80) ? (1 << ((packed & 7) + 1)) : 0;
    const palette = [];
    for(let i = 0; i < gctSize; i++){ const r = u8(), g = u8(), bl = u8();
      palette.push('#' + [r,g,bl].map(v => v.toString(16).padStart(2,'0')).join('')); }
    const frames = [];
    let delay = 0, transparent = -1;
    const readBlocks = () => { const out = []; for(;;){ const n = u8(); if(!n) break;
      for(let i = 0; i < n; i++) out.push(u8()); } return out; };
    for(;;){
      const sep = u8();
      if(sep === 0x3b || sep === undefined) break;
      if(sep === 0x21){
        const label = u8();
        if(label === 0xf9){ u8(); const pk = u8(); delay = u16(); const ti = u8(); u8();
          transparent = (pk & 1) ? ti : -1; }
        else readBlocks();
        continue;
      }
      if(sep !== 0x2c) throw new Error('GIF：看不懂的區塊 0x' + sep.toString(16));
      const fx = u16(), fy = u16(), fw = u16(), fh = u16(), fp = u8();
      if(fp & 0x80) for(let i = 0; i < (1 << ((fp & 7) + 1)); i++){ u8(); u8(); u8(); }
      const minCodeSize = u8();
      const data = lzwDecode(minCodeSize, readBlocks(), fw * fh);
      frames.push({ data, delay: delay * 10, transparent, x:fx, y:fy, width:fw, height:fh });
    }
    return { width, height, palette, frames };
  }

  function lzwDecode(minCodeSize, bytes, expect){
    const clearCode = 1 << minCodeSize, eoiCode = clearCode + 1;
    let codeSize = minCodeSize + 1, next = eoiCode + 1;
    let dict = [];
    const resetDict = () => { dict = []; for(let i = 0; i < clearCode; i++) dict[i] = [i];
      dict[clearCode] = []; dict[eoiCode] = []; next = eoiCode + 1; codeSize = minCodeSize + 1; };
    resetDict();
    const out = new Uint8Array(expect);
    let o = 0, bitPos = 0, prev = null;
    const read = () => {
      let v = 0;
      for(let i = 0; i < codeSize; i++){
        const byte = bytes[bitPos >> 3];
        if(byte === undefined) return eoiCode;
        v |= ((byte >> (bitPos & 7)) & 1) << i;
        bitPos++;
      }
      return v;
    };
    for(;;){
      const code = read();
      if(code === eoiCode) break;
      if(code === clearCode){ resetDict(); prev = null; continue; }
      let entry;
      if(code < next && dict[code]) entry = dict[code];
      else if(prev) entry = prev.concat([prev[0]]);
      else throw new Error('GIF：壞掉的 LZW 串流');
      for(const v of entry){ if(o < out.length) out[o++] = v; }
      if(prev && next < 4096){
        dict[next++] = prev.concat([entry[0]]);
        if(next === (1 << codeSize) && codeSize < 12) codeSize++;
      }
      prev = entry;
    }
    return out;
  }

  const API = { encodeGIF, decodeGIF, lzwEncode, lzwDecode };
  if(typeof module !== 'undefined' && module.exports) module.exports = API;
  global.DipPixelGif = API;
})(typeof window !== 'undefined' ? window : globalThis);
