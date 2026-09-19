import fs from 'node:fs';
const DIR='/home/user/dip-vinyl-shop/batch-progress/c167/evidence';
const OUT=DIR+'/bn-post.json';
let out={}; try{out=JSON.parse(fs.readFileSync(OUT,'utf8'))}catch{}
const wp=JSON.parse(fs.readFileSync(DIR+'/bn-wp.json','utf8'));
const urls=new Set();
for(const v of Object.values(wp)) for(const h of v.hits||[]) urls.add(h.url);
// 藝人頁（裸名形與團名形都試）
for(const p of ['jackie-mclean','charles-pasi','domi-jd-beck','gabrielle-cavassa','immanuel-wilkins','immanuel-wilkins-quartet','kiefer','meshell-ndegeocello','minyo-crusaders','nate-smith','fathers','nduduzo-makhathini','ron-carter','ricky-dillard','bill-frisell','walter-smith-iii','melissa-aldana','julian-lage'])
  urls.add(`https://www.bluenote.com/artist/${p}/`);
const strip=h=>h.replace(/<(script|style|svg)[^>]*>[\s\S]*?<\/\1>/gi,' ').replace(/<[^>]+>/g,' ')
  .replace(/&#(\d+);/g,(m,d)=>String.fromCharCode(+d)).replace(/&#x([0-9a-f]+);/gi,(m,d)=>String.fromCharCode(parseInt(d,16)))
  .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#0?39;|&apos;/g,"'").replace(/&[a-z]+;/g,' ')
  .replace(/\s+/g,' ').trim();
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let n=0;
for(const u of urls){
  if(out[u])continue;
  let st=0,t='';
  try{const r=await fetch(u,{headers:{'User-Agent':'Mozilla/5.0'},redirect:'follow'}); st=r.status; if(r.ok){t=strip(await r.text()); const c=t.indexOf('SIGN UP TO THE BLUE NOTE NEWSLETTER'); if(c>0)t=t.slice(0,c);} }catch(e){st='ERR '+e.message}
  out[u]={status:st,len:t.length,text:t.slice(0,7000)};
  n++; if(n%4===0) fs.writeFileSync(OUT,JSON.stringify(out,null,1));
  console.log(st,String(t.length).padStart(6),u);
  await sleep(600);
}
fs.writeFileSync(OUT,JSON.stringify(out,null,1));
