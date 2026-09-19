import fs from 'node:fs';
const DIR='/home/user/dip-vinyl-shop/batch-progress/c166/evidence-b';
const paths=['melissa-aldana','bill-frisell','blue-lab-beats','meshell-ndegeocello','walter-smith-iii','wayne-shorter','immanuel-wilkins','mccoy-tyner','joe-henderson','bill-charlap','bill-charlap-trio','aaron-parks','nels-cline','chihiro-yamanaka','artemis','gerald-clayton','brandon-woody','branford-marsalis','the-branford-marsalis-quartet','branford-marsalis-quartet','johnathan-blake','joshua-redman','harold-lopez-nussa','charles-lloyd','jason-moran','marvin-sewell','dave-mcmurray','horace-silver'];
const OUT=DIR+'/bluenote.json';
let out={}; try{out=JSON.parse(fs.readFileSync(OUT,'utf8'))}catch{}
const strip=h=>h.replace(/<(script|style|svg)[^>]*>[\s\S]*?<\/\1>/gi,' ').replace(/<[^>]+>/g,' ')
  .replace(/&#(\d+);/g,(m,d)=>String.fromCharCode(+d)).replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#0?39;|&apos;/g,"'").replace(/&[a-z]+;/g,' ')
  .replace(/\s+/g,' ').trim();
for(const p of paths){
  if(out[p])continue;
  const u=`https://www.bluenote.com/artist/${p}/`;
  let r,t='';
  try{ r=await fetch(u,{headers:{'User-Agent':'Mozilla/5.0'}}); t=r.ok?strip(await r.text()):''; }catch(e){ r={status:'ERR '+e.message}; }
  const cut=t.indexOf('SIGN UP TO THE BLUE NOTE NEWSLETTER');
  out[p]={url:u,status:r.status,text:(cut>0?t.slice(0,cut):t).slice(0,9000)};
  fs.writeFileSync(OUT,JSON.stringify(out,null,1));
  console.log(p,r.status,out[p].text.length);
}
