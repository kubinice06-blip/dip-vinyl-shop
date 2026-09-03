// dip 共用：像素小人零件＋玩家角色（名字／造型／耳朵）讀取

// ── 🧪 分支預覽站專用：每開一個新分頁就重置成「全新玩家」 ──────────────────
// 只在 <分支>.dip-vinyl-shop.pages.dev（Cloudflare 的分支／逐版預覽）生效。
// 正式站（dip-vinyl-shop.pages.dev 本身與自訂網域）與本機開發完全不受影響——
// 正規表示式要求主機名前面「還有一段」才算預覽站，正式站的裸網域比不中。
//
// 為什麼用 sessionStorage 當旗標：它只活在這個分頁，重新整理還在、關掉分頁就沒了。
//   → 同一個分頁重整＝進度保留（才測得到「接著打」的續玩），
//     關掉分頁（或另開新分頁）再進＝整份清空，回到第一次進站的樣子。
// 清的是這個網域自己的 localStorage／IndexedDB（含 Firebase 登入狀態）；
// 預覽站與正式站是不同來源，資料本來就各自獨立，清掉不會動到正式站或雲端帳號。
(function(){
  var MARK = 'dipPreviewSession';
  if(!/^[a-z0-9-]+\.dip-vinyl-shop\.pages\.dev$/i.test(location.hostname)) return;
  function wipe(){
    try{ localStorage.clear(); }catch(e){}
    try{ indexedDB.deleteDatabase('firebaseLocalStorageDb'); }catch(e){}
  }
  function reset(){
    if(!confirm('把這個預覽站重置成全新玩家？\n（名字、造型、卡片、樂歷、進行中的一趟都會清空）')) return;
    wipe(); try{ sessionStorage.removeItem(MARK); }catch(e){}
    location.replace('pvp.html');
  }
  // 剛清空的那 15 秒內都算「這一趟的第一頁」——主選單沒角色會馬上轉去序章，
  // 提示條若只在動手清的那一頁顯示，會跟著跳頁一起消失、根本來不及看到。
  var fresh = false;
  try{
    var t0 = sessionStorage.getItem(MARK);
    if(!t0){ wipe(); sessionStorage.setItem(MARK, String(Date.now())); fresh = true; }
    else { fresh = (Date.now() - (+t0 || 0)) < 15000; }
  }catch(e){}
  window.__dipPreviewReset = reset;
  document.addEventListener('DOMContentLoaded', function(){
    var css = document.createElement('style');
    css.textContent = '.dipprev-badge{position:fixed;right:6px;bottom:6px;z-index:2147483000;font:700 10px/1 monospace;letter-spacing:.06em;background:#111;color:#fff;border:1px solid #b8860b;padding:5px 7px;opacity:.3;cursor:pointer;transition:opacity .15s}'
      + '.dipprev-badge:hover,.dipprev-badge:active{opacity:1}'
      + 'body.in-battle .dipprev-badge{display:none}'   /* 戰鬥中版面吃滿整個畫面，別壓到手牌 */
      + '.dipprev-toast{position:fixed;left:50%;top:6px;transform:translateX(-50%);z-index:2147483000;max-width:min(92vw,430px);background:#111;color:#fff;border:1px solid #b8860b;padding:7px 11px;font:400 10px/1.7 monospace;text-align:center;transition:opacity .5s}';
    document.head.appendChild(css);
    var b = document.createElement('button');
    b.type='button'; b.className='dipprev-badge'; b.textContent='🧪 重置';
    b.title='預覽站：清空本機進度，回到全新玩家';
    b.onclick = reset;
    document.body.appendChild(b);
    if(!fresh) return;
    var t = document.createElement('div');
    t.className='dipprev-toast';
    t.innerHTML='🧪 <b>預覽測試站</b>：已重置為全新玩家。<br>同一個分頁重整會保留進度；<b>關掉分頁</b>再進來就再重置一次。';
    document.body.appendChild(t);
    setTimeout(function(){ t.style.opacity='0'; setTimeout(function(){ t.remove(); }, 600); }, 6000);
  });
})();

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
