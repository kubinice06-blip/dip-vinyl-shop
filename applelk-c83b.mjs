import { getJSON } from './mb-c83b.mjs';
const id=process.argv[2], c=process.argv[3]||'gb';
const j = await getJSON(`https://itunes.apple.com/lookup?id=${id}&country=${c}&entity=song&limit=200`);
const col=j.results.find(r=>r.wrapperType==='collection');
if(col) console.log(JSON.stringify({collectionId:col.collectionId,name:col.collectionName,artist:col.artistName,tc:col.trackCount,rd:col.releaseDate,cr:col.copyright,url:col.collectionViewUrl},null,1));
for(const r of j.results.filter(r=>r.wrapperType==='track')) console.log(`${r.trackNumber}. ${r.trackName} ${Math.floor(r.trackTimeMillis/60000)}:${String(Math.round(r.trackTimeMillis%60000/1000)).padStart(2,'0')}`);
