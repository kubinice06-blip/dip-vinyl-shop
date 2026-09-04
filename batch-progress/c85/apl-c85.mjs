import fs from 'node:fs';
const norm=s=>String(s).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const lines = fs.readFileSync(process.argv[2],'utf8').trim().split('\n').filter(Boolean);
const stores = ['gb','us','jp','de'];
let hit=0;
const res=[];
for (const L of lines) {
  const [a,al] = L.split('|');
  let found=null;
  for (const c of stores) {
    const url=`https://itunes.apple.com/search?term=${encodeURIComponent(a+' '+al)}&entity=album&limit=20&country=${c}`;
    let j; try { const r=await fetch(url,{headers:{'User-Agent':'dip-vinyl-shop/1.0'}}); j=await r.json(); } catch(e){ await sleep(800); continue; }
    await sleep(500);
    const m=(j.results||[]).find(x=>norm(x.collectionName).includes(norm(al))&&norm(x.artistName).includes(norm(a).slice(0,10)));
    if (m) { found={store:c,id:m.collectionId,name:m.collectionName,artist:m.artistName,tracks:m.trackCount,date:m.releaseDate}; break; }
  }
  if (found) { hit++; console.log(`HIT[${found.store}] ${a} — ${al} → ${found.artist} / ${found.name} (${found.id}, ${found.tracks}tr, ${String(found.date).slice(0,10)})`); }
  else console.log(`MISS ${a} — ${al}`);
  res.push({a,al,found});
  fs.writeFileSync(process.argv[3], JSON.stringify(res,null,1));
}
console.log(`Apple: ${hit}/${lines.length}`);
