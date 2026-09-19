import fs from 'node:fs';
const DIR='/home/user/dip-vinyl-shop/batch-progress/c167/evidence';
const OUT=DIR+'/bn-wp.json';
let out={}; try{out=JSON.parse(fs.readFileSync(OUT,'utf8'))}catch{}
const terms=['Jacknife Jackie McLean','Charles Pasi Adamas','DOMi JD BECK YOU ASKED','WHO ASKED DOMi','Gabrielle Cavassa Diavola','Immanuel Wilkins Village Vanguard','Kiefer Memory Bomb','Meshell Ndegeocello Synonym','Minyo Crusaders','Nate Smith Fathers','Nduduzo Makhathini Myth We Choose','Ron Carter Ricky Dillard Sweet Sweet Spirit','Bill Frisell In My Dreams','Walter Smith Twio','Melissa Aldana Filin','Julian Lage Scenes From Above'];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
for(const t of terms){
  if(out[t])continue;
  const u=`https://www.bluenote.com/wp-json/wp/v2/search?search=${encodeURIComponent(t)}&per_page=10`;
  try{const r=await fetch(u,{headers:{'User-Agent':'Mozilla/5.0'}}); const b=r.ok?await r.json():null;
    out[t]={status:r.status,hits:(b||[]).map(x=>({title:x.title,url:x.url,type:x.subtype}))};}
  catch(e){out[t]={status:'ERR '+e.message,hits:[]}}
  fs.writeFileSync(OUT,JSON.stringify(out,null,1));
  console.log(t,'→',out[t].status,(out[t].hits||[]).length);
  await sleep(800);
}
