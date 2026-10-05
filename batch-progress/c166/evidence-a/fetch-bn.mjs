import fs from 'node:fs';
const DIR='/home/user/dip-vinyl-shop/batch-progress/c166/evidence-a';
const paths=['arturo-ofarrill','chris-botti','dave-mcmurray','kendrick-scott','reuben-rogers','walter-smith-iii','erik-truffaz','gregory-porter','norah-jones','joe-chambers','artemis','harold-lopez-nussa','meshell-ndegeocello','cautious-clay','chihiro-yamanaka','aaron-parks','ron-miles','nduduzo-makhathini','mark-knopfler','ethan-iverson','charles-lloyd','julian-lage'];
const OUT=DIR+'/bluenote.json';
let out={}; try{out=JSON.parse(fs.readFileSync(OUT,'utf8'))}catch{}
const strip=h=>h.replace(/<(script|style|svg)[^>]*>[\s\S]*?<\/\1>/gi,' ').replace(/<[^>]+>/g,' ')
  .replace(/&#(\d+);/g,(m,d)=>String.fromCharCode(+d)).replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#0?39;|&apos;/g,"'").replace(/&[a-z]+;/g,' ')
  .replace(/\s+/g,' ').trim();
for(const p of paths){
  if(out[p])continue;
  const u=`https://www.bluenote.com/artist/${p}/`;
  const r=await fetch(u,{headers:{'User-Agent':'Mozilla/5.0'}});
  const t=r.ok?strip(await r.text()):'';
  const cut=t.indexOf('SIGN UP TO THE BLUE NOTE NEWSLETTER');
  out[p]={url:u,status:r.status,text:(cut>0?t.slice(0,cut):t).slice(0,9000)};
  fs.writeFileSync(OUT,JSON.stringify(out,null,1));
  console.log(p,r.status,out[p].text.length);
}
