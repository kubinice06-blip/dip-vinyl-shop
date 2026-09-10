import {j} from './fetch-c85a.mjs';
const mode=process.argv[2];
if(mode==='lookup'){
  for(const id of process.argv.slice(3)){
    const o=await j(`https://itunes.apple.com/lookup?id=${id}&entity=song&limit=200&country=gb`);
    let r=o.results||[];
    if(!r.length){ const o2=await j(`https://itunes.apple.com/lookup?id=${id}&entity=song&limit=200&country=us`); r=o2.results||[]; }
    const col=r.find(x=>x.wrapperType==='collection');
    console.log('### APPLE',id);
    if(!col){console.log('NOTFOUND');continue;}
    console.log(JSON.stringify({name:col.collectionName,artist:col.artistName,tc:col.trackCount,date:col.releaseDate,cr:col.copyright,genre:col.primaryGenreName,url:col.collectionViewUrl},null,1));
    r.filter(x=>x.wrapperType==='track').forEach(t=>console.log(` ${t.trackNumber}. ${t.trackName} ${Math.floor(t.trackTimeMillis/60000)}:${String(Math.round(t.trackTimeMillis%60000/1000)).padStart(2,'0')}`));
  }
} else {
  // search: args = "term" ...
  for(const term of process.argv.slice(3)){
    console.log('### SEARCH',term);
    for(const c of ['gb','us','jp','de','fr','nl','ca','au']){
      const o=await j(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=album&limit=25&country=${c}`);
      for(const x of (o.results||[])) console.log(` [${c}] ${x.collectionId} | ${x.artistName} | ${x.collectionName} | ${x.trackCount}tr | ${String(x.releaseDate).slice(0,10)}`);
    }
  }
}
