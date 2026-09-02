// dip 共用：像素小人零件＋玩家角色（名字／造型／耳朵）讀取
// 給 roguelike.html（捏角色、序章、戰鬥小人）、pvp.html（主選單角色卡）、battle.html（名牌）共用。
// 角色資料存在品味試煉的樂歷（localStorage dipRogueMeta_v2[:uid]，登入後另同步雲端 users/{uid}.rogueMeta），
// 這裡只讀不寫；寫入一律在 roguelike.html 的序章／捏角色畫面。
const PIX_PAL = {k:'#111',g:'#b8860b',r:'#c11628',b:'#1f5fae',w:'#fff',e:'#d8d8d8',d:'#888',n:'#2e7d52',p:'#6a3fa0',o:'#e0851c',y:'#f0c75e',s:'#e8b48c',c:'#3fb6c9',t:'#c68642',u:'#8d5524',v:'#f6dcc4',m:'#e75480'};
function pixArtHTML(rows, size, cls){
  const w=rows[0].length, h=rows.length;
  let rects='';
  rows.forEach((row,y)=>{ for(let x=0;x<row.length;x++){ const c=PIX_PAL[row[x]]; if(c) rects+=`<rect x="${x}" y="${y}" width="1" height="1" fill="${c}"/>`; } });
  return `<svg class="pixicon ${cls||''}" width="${size}" height="${Math.round(size*h/w)}" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
}
// 身體模板：T=上衣、L=下身（組裝時換色），s=皮膚、k=鞋
const SPR_BODY = [
  '....TTTTTTTT....',
  '...TTTTTTTTTT...',
  '...sTTTTTTTTs...',
  '...sTTTTTTTTs...',
  '....TTTTTTTT....',
  '....LLLLLLLL....',
  '....LLL..LLL....',
  '....kkk..kkk....',
  '................',
];
function sprRows(head, shirt, pants, patch){
  const rows = head.concat(SPR_BODY.map(r=>r.replace(/T/g,shirt).replace(/L/g,pants)));
  if(patch) Object.keys(patch).forEach(i=>{ rows[+i]=patch[i]; });
  return rows;
}
// ---------- 🧑‍🎤 捏角色：像素小人零件（頭型用 H 標髮／帽色、s 標膚色；組裝時換色） ----------
const AVATAR_HEADS = {
  neat:   { name:'西裝頭', rows:['................','.....HHHHHH.....','....HHHHHHHH....','....HssssssH....','....ssksskss....','....ssssssss....','.....ssssss.....'] },
  bob:    { name:'妹妹頭', rows:['................','.....HHHHHH.....','....HHHHHHHH....','....HHHHHHHH....','....HskssksH....','....HssssssH....','.....ssssss.....'] },
  spike:  { name:'刺蝟頭', rows:['....H.H..H.H....','....HHHHHHHH....','....HHHHHHHH....','....HssssssH....','....ssksskss....','....ssssssss....','.....ssssss.....'] },
  long:   { name:'長髮',   rows:['................','.....HHHHHH.....','....HHHHHHHH....','...HHssssssHH...','...HHskssksHH...','...HssssssssH...','.....ssssss.....'] },
  cap:    { name:'反戴帽', rows:['................','.....HHHHHH.....','..HHHHHHHHHH....','....kssssssk....','....ssksskss....','....ssssssss....','.....ssssss.....'] },
  ballcap:{ name:'棒球帽', rows:['................','.....HHHHHH.....','....HHHHHHHHHH..','....kssssssk....','....ssksskss....','....ssssssss....','.....ssssss.....'] },
  beanie: { name:'毛帽',   rows:['................','.....HHHHHH.....','....HHHHHHHH....','....HssssssH....','....ssksskss....','....ssssssss....','.....ssssss.....'] },
  beret:  { name:'貝雷帽＋眼鏡', rows:['................','......HHHH......','....HHHHHHHH....','....kssssssk....','....ekkeekke....','....ssssssss....','.....ssssss.....'] },
  fedora: { name:'紳士帽', rows:['................','.....HHHHHH.....','.....HHHHHH.....','...HHHHHHHHHH...','....ssksskss....','....ssssssss....','.....ssssss.....'] },
  phones: { name:'耳機',   rows:['.....gggggg.....','.....HHHHHH.....','....HHHHHHHH....','...gHssssssHg...','...gssksskssg...','....ssssssss....','.....ssssss.....'] },
};
// 可選色（值＝PIX_PAL 的鍵）：髮／帽、膚色、上衣、褲子
const AVATAR_COLORS = {
  hair: ['k','d','o','y','r','b','n','p','c','m','w'],
  skin: ['v','s','t','u'],
  shirt:['b','r','n','p','o','y','c','m','w','e','d','k'],
  pants:['k','d','b','n','p','o','e','w'],
};
const AVATAR_DEFAULT = { head:'neat', hair:'k', shirt:'b', pants:'k', skin:'s' };
function avatarRows(av){
  av = Object.assign({}, AVATAR_DEFAULT, av||{});
  const h = AVATAR_HEADS[av.head] || AVATAR_HEADS.neat;
  const ok = (v,d)=> (typeof v==='string' && PIX_PAL[v]) ? v : d;
  const hr=ok(av.hair,'k'), sk=ok(av.skin,'s'), sh=ok(av.shirt,'b'), pt=ok(av.pants,'k');
  const head = h.rows.map(r=>r.replace(/H/g,hr));
  const rows = head.concat(SPR_BODY.map(r=>r.replace(/T/g,sh).replace(/L/g,pt)));
  return rows.map(r=>r.replace(/s/g,sk));   // 膚色最後換（頭與身體的 s 一起）
}

(function(){
  const META_KEY='dipRogueMeta_v2', UID_KEY='dipRogueLastUid';
  const PROFILE_NAMES={ classic:'老派耳朵', obscurity:'挖盤狂', accessibility:'噪音信徒' };
  function key(){ try{ if(localStorage.getItem('dipRogueSandbox')==='1') return META_KEY+':sandbox'; const u=localStorage.getItem(UID_KEY); return u ? META_KEY+':'+u : META_KEY; }catch(e){ return META_KEY; } }
  function load(){
    try{ const m=JSON.parse(localStorage.getItem(key())); if(!m||typeof m!=='object') return null;
      return { name:typeof m.name==='string'?m.name:'', avatar:(m.avatar&&typeof m.avatar==='object')?m.avatar:null,
               profile:(m.profile&&typeof m.profile==='object'&&PROFILE_NAMES[m.profile.axis])?m.profile:null }; }
    catch(e){ return null; }
  }
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  window.DipChar = { key, load, esc, avatarSVG:(av,size)=>pixArtHTML(avatarRows(av), size||32), profileName:p=>(p&&PROFILE_NAMES[p.axis])||'' };
})();
