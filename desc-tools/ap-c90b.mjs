import fs from 'node:fs';
const OUT='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c90b';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function get(url,tries=6){
  for(let i=0;i<tries;i++){
    try{
      const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0'}});
      if(r.status===403||r.status===429){await sleep(3000*(i+1));continue;}
      if(!r.ok){console.error('HTTP',r.status,url);await sleep(2000);continue;}
      const t=await r.text();
      return JSON.parse(t);
    }catch(e){console.error('ERR',e.message);await sleep(2500);}
  }
  return {__error:true,url};
}
// 1) verify the 7 ready collectionIds (lookup with country + entity=song)
const ready=[
 ['草莓救星|羽毛河','tw',6770874142],
 ['草莓救星|德古拉城市','hk',908146533],
 ['薄荷葉|的士房間','tw',1829589251],
 ['熊寶貝樂團|年年','tw',6795485931],
 ['熊寶貝樂團|美麗混亂','tw',6795121605],
 ['Tizzy Bac|告密的心','tw',1388262425],
 ['Tizzy Bac|易碎物','tw',1388264180],
];
const out={lookups:{},searches:{}};
for(const [k,cc,id] of ready){
  const j=await get(`https://itunes.apple.com/lookup?id=${id}&country=${cc}&entity=song&limit=60`);
  out.lookups[k]={cc,id,j};
  const rs=(j.results||[]);
  const col=rs.find(x=>x.wrapperType==='collection');
  const tr=rs.filter(x=>x.wrapperType==='track');
  console.log(k,'|',col?col.collectionName:'?','|',col?col.artistName:'?','|℗',col?col.copyright:'','| tracks',tr.length,'| date',col?col.releaseDate:'');
  tr.forEach(t=>console.log('   ',t.trackNumber,t.trackName,Math.round(t.trackTimeMillis/1000),t.previewUrl?'P':'-'));
  await sleep(1500);
  fs.writeFileSync(`${OUT}/apple.json`,JSON.stringify(out,null,1));
}
console.log('=== LOOKUPS DONE ===');
