// c-124：Apple 店面 search 實測（只記觀察，不下結論——裁定 254）。
import fs from 'node:fs';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const OUT='batch-progress/c124/apple-probe.json';
const list=JSON.parse(fs.readFileSync('batch-progress/c124/apple-terms.json','utf8'));
const out=fs.existsSync(OUT)?JSON.parse(fs.readFileSync(OUT,'utf8')):{};
const STORES=['us','gb','de','fr','nl'];
let n=0;
for(const it of list){
  if(out[it.key]){n++;continue;}
  const rec={};
  for(const s of STORES){
    let hit=null;
    try{
      const u=`https://itunes.apple.com/search?term=${encodeURIComponent(it.term)}&country=${s}&entity=album&limit=25`;
      const r=await fetch(u,{signal:AbortSignal.timeout(25000)});
      if(r.ok){
        const j=await r.json();
        const m=(j.results||[]).filter(x=>String(x.collectionName||'').toLowerCase().includes(it.match.toLowerCase()));
        rec[s]=m.length?m.slice(0,2).map(x=>`${x.collectionId}｜${x.artistName}｜${x.collectionName}`):(j.resultCount+'筆無對得上');
      } else rec[s]='HTTP '+r.status;
    }catch(e){rec[s]='timeout';}
    await sleep(700);
  }
  out[it.key]=rec;
  fs.writeFileSync(OUT,JSON.stringify(out,null,1));
  n++; console.log(`${n}/${list.length} ${it.key}`);
}
console.log('done');
