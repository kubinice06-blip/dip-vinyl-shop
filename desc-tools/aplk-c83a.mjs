const sleep=ms=>new Promise(r=>setTimeout(r,ms));
for(const spec of process.argv.slice(2)){
  const [id,c]=spec.split(':');
  const u=`https://itunes.apple.com/lookup?id=${id}&country=${c||'gb'}&entity=song&limit=60`;
  try{
    const r=await fetch(u); const o=JSON.parse(await r.text());
    const col=(o.results||[]).find(x=>x.wrapperType==='collection');
    const songs=(o.results||[]).filter(x=>x.wrapperType==='track');
    if(!col){console.log('##',id,c,'NO COLLECTION (count='+o.resultCount+')');continue;}
    console.log('##',id,c,'|',col.artistName,'|',col.collectionName,'| tc='+col.trackCount,'|',(col.releaseDate||'').slice(0,10),'|',col.copyright||'','|',col.collectionViewUrl);
    console.log('   tracks:',songs.map(s=>`${s.trackNumber}.${s.trackName}${s.previewUrl?'':'[noPrev]'}`).join(' | '));
  }catch(e){console.log('##',id,c,'ERR',e.message)}
  await sleep(500);
}
