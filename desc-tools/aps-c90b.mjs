import fs from 'node:fs';
const OUT='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c90b';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function get(url,tries=8){
  for(let i=0;i<tries;i++){
    try{
      const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0'}});
      if(r.status===403||r.status===429){await sleep(2500*(i+1));continue;}
      if(!r.ok){return {__http:r.status};}
      return JSON.parse(await r.text());
    }catch(e){await sleep(2500);}
  }
  return {__error:true,url};
}
const queries=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const store={};
for(const q of queries){
  const url=`https://itunes.apple.com/search?term=${encodeURIComponent(q.term)}&country=${q.cc}&entity=album&limit=25`;
  const j=await get(url);
  store[q.label+'|'+q.cc+'|'+q.term]=j;
  const rs=(j.results||[]);
  console.log(`## ${q.label} [${q.cc}] "${q.term}" -> ${j.__http?('HTTP '+j.__http):rs.length}`);
  rs.forEach(x=>console.log('   ',x.collectionId,'|',x.artistName,'|',x.collectionName,'|',(x.releaseDate||'').slice(0,10),'|tc',x.trackCount,'|',x.copyright||''));
  await sleep(1600);
  fs.writeFileSync(`${OUT}/apple-search.json`,JSON.stringify(store,null,1));
}
