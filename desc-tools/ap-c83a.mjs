const UA='dip-vinyl-shop/1.0';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const [term,country]=[process.argv[2],process.argv[3]||'gb'];
for(const c of country.split(',')){
  const u=`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=${c}&entity=album&limit=25`;
  try{
    const r=await fetch(u,{headers:{'User-Agent':UA}}); const t=await r.text();
    let o; try{o=JSON.parse(t)}catch(e){console.log(c,'PARSEFAIL',r.status,t.slice(0,120));continue}
    console.log('##',c,o.resultCount);
    for(const x of (o.results||[])) console.log('  ',x.collectionId,'|',x.artistName,'|',x.collectionName,'|',x.trackCount,'|',(x.releaseDate||'').slice(0,10),'|',x.copyright||'');
  }catch(e){console.log(c,'ERR',e.message)}
  await sleep(600);
}
