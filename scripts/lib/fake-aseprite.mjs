// 照 Aseprite 檔案規格組一個 .aseprite 出來（只給測試用）。
// 注意：這是「我們對規格的理解」，不是 Aseprite 本人存出來的檔案。
// scripts/pixel-aseprite-test.mjs 與 Playwright 的瀏覽器測試共用這一份。
import zlib from 'node:zlib';

class W {
  constructor(){ this.b = []; }
  byte(v){ this.b.push(v & 255); return this; }
  word(v){ this.b.push(v & 255, (v >> 8) & 255); return this; }
  short(v){ return this.word(v < 0 ? v + 0x10000 : v); }
  dword(v){ this.b.push(v & 255, (v>>8) & 255, (v>>16) & 255, (v>>>24) & 255); return this; }
  zeros(n){ for(let i = 0; i < n; i++) this.b.push(0); return this; }
  raw(arr){ for(const v of arr) this.b.push(v & 255); return this; }
  string(s){ const e = Buffer.from(s, 'utf8'); this.word(e.length); return this.raw(e); }
  get length(){ return this.b.length; }
}
const chunk = (type, body) => { const w = new W(); w.dword(body.length + 6).word(type).raw(body.b ? body.b : body); return w.b; };

function layerChunk(name, { visible = true, editable = true, type = 0, childLevel = 0, blend = 0, opacity = 255 } = {}){
  const w = new W();
  w.word((visible ? 1 : 0) | (editable ? 2 : 0)).word(type).word(childLevel).word(0).word(0).word(blend).byte(opacity).zeros(3).string(name);
  return chunk(0x2004, w);
}
function celChunk(layer, x, y, cw, ch, pixels, { compress = false, bpp = 1 } = {}){
  const w = new W();
  w.word(layer).short(x).short(y).byte(255).word(compress ? 2 : 0).short(0).zeros(5);
  w.word(cw).word(ch);
  if(compress) w.raw(zlib.deflateSync(Buffer.from(pixels)));
  else w.raw(pixels);
  return chunk(0x2005, w);
}
function linkedCelChunk(layer, frame){
  const w = new W();
  w.word(layer).short(0).short(0).byte(255).word(1).short(0).zeros(5).word(frame);
  return chunk(0x2005, w);
}
function paletteChunk(colors, { alphas } = {}){
  const w = new W();
  w.dword(colors.length).dword(0).dword(colors.length - 1).zeros(8);
  colors.forEach((hx, i) => { const h = hx.replace('#','');
    w.word(0).byte(parseInt(h.slice(0,2),16)).byte(parseInt(h.slice(2,4),16)).byte(parseInt(h.slice(4,6),16))
     .byte(alphas ? alphas[i] : 255); });
  return chunk(0x2019, w);
}
function oldPaletteChunk(colors){
  const w = new W();
  w.word(1).byte(0).byte(colors.length === 256 ? 0 : colors.length);
  for(const hx of colors){ const h = hx.replace('#','');
    w.byte(parseInt(h.slice(0,2),16)).byte(parseInt(h.slice(2,4),16)).byte(parseInt(h.slice(4,6),16)); }
  return chunk(0x0004, w);
}
function tagsChunk(tags){
  const w = new W();
  w.word(tags.length).zeros(8);
  for(const t of tags) w.word(t.from).word(t.to).byte(t.dir || 0).word(0).zeros(6).zeros(3).byte(0).string(t.name);
  return chunk(0x2018, w);
}
function buildAse({ w: W_, h: H_, depth = 8, transparentIndex = 0, frames }){
  const body = [];
  for(const f of frames){
    const chunks = [].concat(...f.chunks);
    const fh = new W();
    fh.dword(chunks.length + 16).word(0xF1FA).word(0).word(f.duration || 100).zeros(2).dword(f.chunks.length);
    body.push(...fh.b, ...chunks);
  }
  const head = new W();
  head.dword(128 + body.length).word(0xA5E0).word(frames.length).word(W_).word(H_).word(depth)
      .dword(0).word(100).dword(0).dword(0).byte(transparentIndex).zeros(3).word(0)
      .byte(1).byte(1).short(0).short(0).word(16).word(16).zeros(84);
  if(head.length !== 128) throw new Error('檔頭不是 128 位元組：' + head.length);
  return new Uint8Array([...head.b, ...body]);
}


export { W, chunk, layerChunk, celChunk, linkedCelChunk, paletteChunk, oldPaletteChunk, tagsChunk, buildAse };
