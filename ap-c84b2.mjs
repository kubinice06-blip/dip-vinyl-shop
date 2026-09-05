const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function j(u){for(let i=0;i<4;i++){try{const r=await fetch(u);if(r.ok){const t=await r.text();return JSON.parse(t)}}catch(e){}await sleep(1500)}return{results:[],__err:1}}
const mode=process.argv[2];
if(mode==='search'){
  const cc=process.argv[3], term=process.argv.slice(4).join(' ');
  const d=await j(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=${cc}&media=music&entity=album&limit=25`);
  console.log('## SEARCH',cc,JSON.stringify(term),'=>',d.resultCount);
  for(const r of (d.results||[])) console.log('  ',r.collectionId,'|',r.artistName,'|',r.collectionName,'|',r.releaseDate,'|',r.trackCount,'|',r.copyright||'');
}else if(mode==='lookup'){
  for(const id of process.argv.slice(3)){
    const d=await j(`https://itunes.apple.com/lookup?id=${id}&entity=song&limit=200`);
    const col=(d.results||[]).find(x=>x.wrapperType==='collection');
    if(!col){console.log('## LOOKUP',id,'none');continue}
    console.log('## LOOKUP',id,'|',col.artistName,'|',col.collectionName,'|',col.releaseDate,'|',col.trackCount,'|',col.copyright||'','|',col.primaryGenreName,'|',col.collectionViewUrl);
    (d.results||[]).filter(x=>x.wrapperType==='track').forEach(t=>console.log('   ',t.trackNumber,t.trackName,Math.floor(t.trackTimeMillis/60000)+':'+String(Math.round(t.trackTimeMillis%60000/1000)).padStart(2,'0'),t.previewUrl?'P':'-'));
    await sleep(800);
  }
}
