import fs from 'node:fs';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const norm=s=>String(s).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'');
async function j(u){for(let i=0;i<3;i++){try{const r=await fetch(u,{signal:AbortSignal.timeout(25000)});if(r.ok)return await r.json();}catch{}await sleep(1200);}return null;}
const picks=JSON.parse(fs.readFileSync('batch-progress/c122/picks.json','utf8'));
const OUT='batch-progress/c122/apple.json';
const out=fs.existsSync(OUT)?JSON.parse(fs.readFileSync(OUT,'utf8')):{};
for(const p of picks){
  if(out[p.rg]){continue;}
  const res={};
  for(const store of ['us','gb','de']){
    const q=encodeURIComponent(p.artist+' '+p.album);
    const d=await j(`https://itunes.apple.com/search?term=${q}&entity=album&country=${store}&limit=15`);
    await sleep(700);
    const hit=(d&&d.results||[]).find(r=>{
      const a=norm(r.artistName),b=norm(r.collectionName),A=norm(p.artist),B=norm(p.album);
      return (a.includes(A)||A.includes(a)) && (b.includes(B)||B.includes(b)) && r.collectionExplicitness!=='cleaned';
    });
    res[store]=hit?{id:hit.collectionId,name:hit.collectionName,artist:hit.artistName,year:(hit.releaseDate||'').slice(0,4),n:(d.results||[]).length}:{miss:true,n:(d&&d.results||[]).length};
    if(hit)break;
  }
  out[p.rg]=res;
  fs.writeFileSync(OUT,JSON.stringify(out,null,1));
  const h=Object.entries(res).find(([k,v])=>!v.miss);
  console.log(`${p.artist} — ${p.album}: ${h?h[0]+' HIT '+h[1].id+' ('+h[1].year+') '+h[1].name:'MISS us/gb/de'}`);
}
