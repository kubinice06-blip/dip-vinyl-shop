// dip 共用：像素物件／場景／劇本的資料格式與繪製
// 像素工坊（pixel-studio.html）用它畫編輯器畫面；前台（roguelike.html 等）日後用它把
// art/pixel/ 裡的 JSON 畫到舞台上。兩邊同一份程式，編輯器看到什麼、前台就長什麼樣。
//
// ── 資料格式（完整規格見 PIXEL_STUDIO.md）───────────────────────────────
// 物件 object：
//   { id, name, kind:'pixel'|'image', tags:[], notes:'',
//     // kind=pixel：w,h、palette{字元:'#hex'}、frames[ rows[] ]，rows 每列一個字串，
//     //   一個字元＝一個像素，'.' 或 ' ' ＝透明，其餘字元查 palette。
//     // kind=image：frames[ 'art/props/table.png', ... ]（同一物件多格＝動畫或狀態），w,h 是圖檔像素。
//     // 圖層（可選）：layers:[ { name, visible, locked, frames:[ rows[] ] } ]，由下往上。
//     //   有 layers 時它是來源，frames 是把可見圖層壓平後的結果（上面的圖層蓋下面的），
//     //   前台永遠只讀 frames；改了 layers 要重新壓平（編輯器每次存檔都會，node 跑 scripts/pixel-index.mjs 也會）。
//     anchor:{x,y},   // 「腳點」：物件座標系裡的哪一點要對到場景的站位；預設 (w/2, h)
//     fps, durations:[ms,...]   // 動畫（可選）
//   }
// 場景 scene：
//   { id, name, w, h,                     // 邏輯尺寸，例：448×492
//     bgColor:'#hex'|null, bg:{ src:'art/shop2-bg.jpg' }|null,   // 先填底色再貼背景圖（都可省）
//     items:[ { iid, obj, name, x, y, scale, flip, layer:'auto'|'back'|'front',
//               depth:null|數字, role:''|'p'|'o'|'f'|其他, frame:0, hidden:false, lock:false } ],
//     anchors:[ { name, group:'p'|'o'|'f'|'', x, y } ],   // 站位＝腳點位置（cx, footY）
//     notes:'' }
//   深度規則：layer=auto 的物件照「腳底 y」排（y 大的在前面），跟 stage-preview.html 的 zOf 同一個意思；
//   depth 填數字＝不看幾何、直接用這個數字當腳底 y（整張前景圖用）；back 永遠在最後面、front 永遠在最前面。
// 劇本 story：
//   { id, name, scene, beats:[ { who, text, ui?, prompt?,
//       stage:{ p:'站位名', o:'站位名', f:'站位名'('out'＝對手不在場), oPath:['aisle','dig1'](多段走位；pPath/fPath 同),
//               door:'open'|'swing'|'shut', oDig:bool, oBusy:bool, notes:bool, anger:bool,
//               hide:{role:bool}, set:{ 物件name:{frame,hidden} } } } ] }
//   跟 roguelike.html 的 RPG_BEATS 同一套語彙：stage 只寫「這一段有變化的」，其餘沿用上一段。
(function(global){
  'use strict';
  // 與 dip-character.js 的 PIX_PAL 同一份（複製一份是為了不引入那支檔案的預覽站重置邏輯）
  const DEFAULT_PALETTE = {k:'#111',g:'#b8860b',r:'#c11628',b:'#1f5fae',w:'#fff',e:'#d8d8d8',d:'#888',n:'#2e7d52',p:'#6a3fa0',o:'#e0851c',y:'#f0c75e',s:'#e8b48c',c:'#3fb6c9',t:'#c68642',u:'#8d5524',v:'#f6dcc4',m:'#e75480'};
  const TRANSPARENT = '.';
  const isClear = ch => ch === '.' || ch === ' ' || ch === undefined;

  function paletteOf(obj){ return (obj && obj.palette) || DEFAULT_PALETTE; }
  function framesOf(obj){ return (obj && Array.isArray(obj.frames) && obj.frames.length) ? obj.frames : [[]]; }
  function frameOf(obj, i){ const f = framesOf(obj); return f[Math.max(0, Math.min(f.length-1, i|0))]; }
  function sizeOf(obj){
    if(!obj) return {w:0,h:0};
    if(obj.kind === 'image') return { w: obj.w|0, h: obj.h|0 };
    const rows = frameOf(obj, 0);
    const h = obj.h || rows.length, w = obj.w || (rows[0] ? rows[0].length : 0);
    return { w, h };
  }
  function anchorOf(obj){
    const s = sizeOf(obj);
    if(obj && obj.anchor && isFinite(obj.anchor.x) && isFinite(obj.anchor.y)) return { x:+obj.anchor.x, y:+obj.anchor.y };
    return { x: s.w/2, y: s.h };
  }

  // ── 圖層壓平：可見圖層由下往上疊，上面非透明的像素蓋掉下面的 → 寫回 obj.frames
  function flattenLayers(obj){
    if(!obj || obj.kind !== 'pixel' || !Array.isArray(obj.layers) || !obj.layers.length) return obj;
    const w = obj.w|0, h = obj.h|0;
    const n = Math.max(1, ...obj.layers.map(l => (l.frames||[]).length));
    const frames = [];
    for(let f=0; f<n; f++){
      const out = [];
      for(let y=0; y<h; y++){
        const row = new Array(w).fill(TRANSPARENT);
        for(const L of obj.layers){
          if(L.visible === false) continue;
          const r = (L.frames||[])[f] && L.frames[f][y]; if(!r) continue;
          for(let x=0; x<w; x++){ const ch = r[x]; if(!isClear(ch)) row[x] = ch; }
        }
        out.push(row.join(''));
      }
      frames.push(out);
    }
    obj.frames = frames;
    return obj;
  }

  // ── 像素物件 → SVG（跟 dip-character.js 的 pixArtHTML 同形，但用物件自己的色盤、同色連段合併）
  function toSVG(obj, frame, size, cls){
    const rows = frameOf(obj, frame||0), pal = paletteOf(obj), s = sizeOf(obj);
    let rects = '';
    for(let y=0; y<rows.length; y++){
      const row = rows[y];
      for(let x=0; x<row.length; ){
        const ch = row[x];
        if(isClear(ch) || !pal[ch]){ x++; continue; }
        let x2 = x+1; while(x2 < row.length && row[x2] === ch) x2++;
        rects += `<rect x="${x}" y="${y}" width="${x2-x}" height="1" fill="${pal[ch]}"/>`;
        x = x2;
      }
    }
    const W = size || s.w, H = Math.round(W * s.h / Math.max(1, s.w));
    return `<svg class="pixicon ${cls||''}" width="${W}" height="${H}" viewBox="0 0 ${s.w} ${s.h}" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
  }

  // ── 像素物件 → canvas（快取；key 帶 updatedAt，改過就重畫）
  const rasterCache = new Map();
  function rasterize(obj, frame){
    const key = obj.id + '#' + (frame|0) + '@' + (obj.updatedAt||0);
    let c = rasterCache.get(key);
    if(c) return c;
    const s = sizeOf(obj), rows = frameOf(obj, frame||0), pal = paletteOf(obj);
    c = document.createElement('canvas'); c.width = Math.max(1, s.w); c.height = Math.max(1, s.h);
    const g = c.getContext('2d');
    for(let y=0; y<rows.length; y++){
      const row = rows[y];
      for(let x=0; x<row.length; x++){
        const ch = row[x]; if(isClear(ch) || !pal[ch]) continue;
        g.fillStyle = pal[ch]; g.fillRect(x, y, 1, 1);
      }
    }
    if(rasterCache.size > 400) rasterCache.clear();
    rasterCache.set(key, c);
    return c;
  }

  // ── 圖檔快取
  const imgCache = new Map();
  function loadImage(src){
    if(!src) return Promise.resolve(null);
    if(imgCache.has(src)) return imgCache.get(src);
    const p = new Promise(res => {
      const im = new Image();
      im.onload = () => res(im); im.onerror = () => res(null);
      if(!/^data:/.test(src)) im.crossOrigin = 'anonymous';
      im.src = src;
    });
    imgCache.set(src, p);
    return p;
  }

  // ── 場景幾何
  function itemRect(item, obj){
    const s = sizeOf(obj), k = item.scale || 1;
    return { x:item.x, y:item.y, w:s.w*k, h:s.h*k };
  }
  function itemFoot(item, obj){
    if(item.depth != null && item.depth !== '' && isFinite(item.depth)) return +item.depth;
    const a = anchorOf(obj), k = item.scale || 1;
    return item.y + a.y * k;
  }
  function itemZ(item, obj){
    const f = itemFoot(item, obj);
    if(item.layer === 'back') return -1e6 + f;
    if(item.layer === 'front') return 1e6 + f;
    return f;
  }
  // depthOf(item) 可選：回傳數字就拿它當腳底 y（走位途中用目的地的腳底排深度，跟 roguelike 的 rpgWalk 起步就切層一樣）
  function sortedItems(scene, db, depthOf){
    return (scene.items||[]).map((it,i)=>{ const obj = db.objects[it.obj]; const d = depthOf ? depthOf(it) : null;
        const z = (d != null && isFinite(d)) ? itemZ(Object.assign({}, it, { depth:d }), obj) : itemZ(it, obj); return { it, i, obj, z }; })
      .sort((a,b)=> a.z - b.z || a.i - b.i);
  }
  // 把物件的腳點放到某個站位（cx, footY）→ 物件左上角
  function placeAt(item, obj, cx, footY){
    const a = anchorOf(obj), k = item.scale || 1;
    return { x: cx - a.x*k, y: footY - a.y*k };
  }
  function footPoint(item, obj){
    const a = anchorOf(obj), k = item.scale || 1;
    return { x: item.x + a.x*k, y: item.y + a.y*k };
  }
  // stage-preview.html 慣用的百分比站位（left%／bottom%）
  function toPercent(scene, item, obj){
    const r = itemRect(item, obj);
    return { left: (r.x/scene.w*100).toFixed(2)+'%', bottom: ((scene.h-(r.y+r.h))/scene.h*100).toFixed(2)+'%', width:(r.w/scene.w*100).toFixed(2)+'%' };
  }

  // ── 畫整個場景到 ctx（邏輯座標；呼叫端自己 scale）
  //   opts.pos(item)   → {x,y} 覆寫位置（劇本播放中的補間）
  //   opts.frame(item) → 覆寫格數；opts.hidden(item) → 覆寫隱藏；opts.depth(item) → 覆寫排深度用的腳底 y
  //   opts.skipBg      → 不畫背景
  async function drawScene(ctx, scene, db, opts){
    opts = opts || {};
    ctx.imageSmoothingEnabled = false;
    if(!opts.skipBg){
      ctx.clearRect(0, 0, scene.w, scene.h);
      if(scene.bgColor){ ctx.fillStyle = scene.bgColor; ctx.fillRect(0, 0, scene.w, scene.h); }
      if(scene.bg && scene.bg.src){
        const im = await loadImage(scene.bg.src);
        if(im) ctx.drawImage(im, 0, 0, scene.w, scene.h);
      }
    }
    const list = sortedItems(scene, db, opts.depth);
    for(const e of list){
      const it = e.it, obj = e.obj; if(!obj) continue;
      const hidden = opts.hidden ? opts.hidden(it) : it.hidden; if(hidden) continue;
      const pos = (opts.pos && opts.pos(it)) || { x: it.x, y: it.y };
      const fi = opts.frame ? opts.frame(it) : (it.frame|0);
      const r = itemRect(it, obj);
      let src = null;
      if(obj.kind === 'image'){ src = await loadImage(frameOf(obj, fi)); }
      else { src = rasterize(obj, fi); }
      if(!src) continue;
      ctx.save();
      if(it.flip){ ctx.translate(pos.x + r.w, pos.y); ctx.scale(-1, 1); ctx.drawImage(src, 0, 0, r.w, r.h); }
      else ctx.drawImage(src, pos.x, pos.y, r.w, r.h);
      ctx.restore();
    }
  }

  // ── 劇本：把第 0..i 段的 stage 疊起來（跟 roguelike.html 的 rpgApplyStage 同一個累積規則）
  //   roguelike 的語彙全部支援：p/o/f 站位名、pPath/oPath/fPath 多段路線（最後一段＝最終站位）、
  //   door:'open'|'swing'|'shut'（門板格）、oDig／oBusy（老闆動作）、notes／anger（特效）；
  //   f:'out' 依 roguelike 慣例＝對手不在場（隱藏）。另外兩個是工坊的延伸：hide{role:bool}、set{物件名:{frame,hidden}}。
  const LAST_PATH_LEG = p => (Array.isArray(p) && p.length) ? p[p.length-1] : null;
  function stageAt(story, i){
    const st = { p:null, o:null, f:null, notes:false, anger:false, oDig:false, oBusy:false, door:'shut', hide:{}, set:{} };
    const beats = story.beats || [];
    for(let k=0; k<=i && k<beats.length; k++){
      const s = beats[k].stage; if(!s) continue;
      for(const r of ['p','o','f']){ if(s[r]) st[r] = s[r]; const leg = LAST_PATH_LEG(s[r+'Path']); if(leg) st[r] = leg; }
      if('notes' in s) st.notes = !!s.notes;
      if('anger' in s) st.anger = !!s.anger;
      if('oDig' in s) st.oDig = !!s.oDig;
      if('oBusy' in s) st.oBusy = !!s.oBusy;
      if(s.door) st.door = s.door === 'swing' ? 'shut' : s.door;   // swing 播完是關的
      if(s.hide) Object.assign(st.hide, s.hide);
      if(s.set) for(const n in s.set) st.set[n] = Object.assign({}, st.set[n]||{}, s.set[n]);
    }
    return st;
  }
  // 門板格數：關 0／半開 1／全開 2；swing 是開→停→關的序列（時間單位 ms，跟 roguelike 的 rpgDoor 一樣）
  const DOOR_FRAME = { shut:0, open:2 };
  const DOOR_SWING = [[1,0],[2,190],[1,900],[0,1090]];
  function findAnchor(scene, group, name){
    return (scene.anchors||[]).find(a => a.name === name && (a.group||'') === (group||''))
        || (scene.anchors||[]).find(a => a.name === name) || null;
  }

  // ── 小工具
  const slug = s => String(s||'').trim().toLowerCase().replace(/[^a-z0-9一-鿿]+/g,'-').replace(/^-+|-+$/g,'') || 'x';
  function emptyRows(w, h){ const r = []; for(let y=0; y<h; y++) r.push(TRANSPARENT.repeat(w)); return r; }
  function newPixelObject(id, name, w, h){
    return { id, name: name||id, kind:'pixel', w, h, palette: Object.assign({}, DEFAULT_PALETTE), frames:[emptyRows(w,h)],
             anchor:{ x: Math.floor(w/2), y: h }, tags:[], notes:'', updatedAt: Date.now() };
  }
  function newImageObject(id, name, src, w, h){
    return { id, name: name||id, kind:'image', w, h, frames:[src], anchor:{ x: Math.floor(w/2), y: h }, tags:[], notes:'', updatedAt: Date.now() };
  }
  function newScene(id, name, w, h){
    return { id, name: name||id, w: w||448, h: h||492, bgColor:null, bg:null, items:[], anchors:[], notes:'', updatedAt: Date.now() };
  }
  function newStory(id, name, sceneId){
    return { id, name: name||id, scene: sceneId||'', beats:[], updatedAt: Date.now() };
  }
  function emptyDB(){ return { version:1, objects:{}, scenes:{}, stories:{} }; }

  global.DipPixel = { DEFAULT_PALETTE, TRANSPARENT, isClear, paletteOf, framesOf, frameOf, sizeOf, anchorOf,
    flattenLayers, toSVG, rasterize, loadImage, itemRect, itemFoot, itemZ, sortedItems, placeAt, footPoint, toPercent,
    drawScene, stageAt, findAnchor, DOOR_FRAME, DOOR_SWING, slug, emptyRows, newPixelObject, newImageObject, newScene, newStory, emptyDB };
})(typeof window !== 'undefined' ? window : globalThis);
