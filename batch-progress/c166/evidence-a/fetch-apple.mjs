import fs from 'node:fs';
const DIR='/home/user/dip-vinyl-shop/batch-progress/c166/evidence-a';
const slice=JSON.parse(fs.readFileSync('/home/user/dip-vinyl-shop/batch-progress/c166/slice.json','utf8')).filter(x=>x.g==='a');
const mb=JSON.parse(fs.readFileSync(DIR+'/mb.json','utf8'));
const OUT=DIR+'/apple.json';
let out={}; try{out=JSON.parse(fs.readFileSync(OUT,'utf8'))}catch{}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function j(u){for(let i=0;i<4;i++){try{const r=await fetch(u,{headers:{'User-Agent':'Mozilla/5.0'}});if(r.ok)return r.json();}catch(e){}await sleep(1500*(i+1));}return null;}
const pick=o=>o?{collectionId:o.collectionId,artistName:o.artistName,collectionName:o.collectionName,releaseDate:o.releaseDate,trackCount:o.trackCount,copyright:o.copyright,collectionExplicitness:o.collectionExplicitness,primaryGenreName:o.primaryGenreName,url:o.collectionViewUrl}:null;
for(const s of slice){
  const key=s.artist+' — '+s.album;
  if(out[key])continue;
  const rec={searches:{},lookups:{}};
  for(const cc of ['us','jp']){
    const u=`https://itunes.apple.com/search?term=${encodeURIComponent(s.artist+' '+s.album)}&entity=album&country=${cc}&limit=8`;
    const r=await j(u); await sleep(700);
    rec.searches[cc]=(r&&r.results||[]).map(pick);
  }
  // UPC lookups from every MB barcode
  const bcs=[...new Set((mb[s.rgMbid]?.releases||[]).map(r=>r.barcode).filter(Boolean))];
  for(const bc of bcs.slice(0,6)){
    const r=await j(`https://itunes.apple.com/lookup?upc=${bc}&country=us`); await sleep(700);
    rec.lookups['us:'+bc]=(r&&r.results||[]).map(pick);
  }
  out[key]=rec;
  fs.writeFileSync(OUT,JSON.stringify(out,null,1));
  console.log('done',key,Object.keys(rec.searches).length);
}
console.log('all',Object.keys(out).length);
