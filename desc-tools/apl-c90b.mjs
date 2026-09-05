const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function get(url,tries=8){
  for(let i=0;i<tries;i++){
    try{const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0'}});
      if(r.status===403||r.status===429){await sleep(2500*(i+1));continue;}
      if(!r.ok)return{__http:r.status};
      return JSON.parse(await r.text());}catch(e){await sleep(2500);}
  } return {__error:1};
}
for(const arg of process.argv.slice(2)){
  const [kind,cc,val]=arg.split('~');
  let url;
  if(kind==='art') url=`https://itunes.apple.com/lookup?id=${val}&country=${cc}&entity=album&limit=100`;
  else if(kind==='alb') url=`https://itunes.apple.com/lookup?id=${val}&country=${cc}&entity=song&limit=60`;
  else url=`https://itunes.apple.com/search?term=${encodeURIComponent(val)}&country=${cc}&entity=album&limit=25`;
  const j=await get(url);
  console.log(`## ${arg} -> ${j.__http?('HTTP '+j.__http):(j.results||[]).length}`);
  (j.results||[]).forEach(x=>{
    if(x.wrapperType==='track') console.log('   t',x.trackNumber,x.trackName,Math.round(x.trackTimeMillis/1000),x.previewUrl?'P':'-');
    else if(x.wrapperType==='collection') console.log('   A',x.collectionId,'|',x.artistName,'|',x.collectionName,'|',(x.releaseDate||'').slice(0,10),'|tc',x.trackCount,'|',x.copyright||'');
    else console.log('   *',x.wrapperType,x.artistId,x.artistName,x.primaryGenreName||'');
  });
  await sleep(1600);
}
