import {j} from './fetch-c84a.mjs';
const [mode,...rest]=process.argv.slice(2);
if(mode==='search'){
  const country=rest[0]; const term=rest.slice(1).join(' ');
  const u=`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=${country}&entity=album&limit=25`;
  const o=await j(u);
  console.log('### SEARCH',country,term,'->',o.resultCount);
  for(const r of (o.results||[])) console.log(` ${r.collectionId} | ${r.artistName} | ${r.collectionName} | tc=${r.trackCount} | ${r.releaseDate} | ${r.copyright||''}`);
}
if(mode==='lookup'){
  const country=rest[0];
  for(const id of rest.slice(1)){
    const o=await j(`https://itunes.apple.com/lookup?id=${id}&country=${country}&entity=song&limit=200`);
    const col=(o.results||[]).find(x=>x.wrapperType==='collection');
    console.log('### LOOKUP',id,country, col?`${col.artistName} | ${col.collectionName} | tc=${col.trackCount} | ${col.releaseDate} | ${col.copyright||''} | ${col.collectionViewUrl}`:'(none)');
    (o.results||[]).filter(x=>x.wrapperType==='track').forEach(t=>console.log(` ${t.trackNumber}. ${t.trackName} [${Math.round((t.trackTimeMillis||0)/1000)}s]${t.previewUrl?'':' NOPREVIEW'}`));
  }
}
