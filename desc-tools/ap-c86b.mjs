import {j,ms} from './fetch-c86b.mjs';
const [,,cmd,...rest]=process.argv;
if(cmd==='s'){
  const country=rest[0]; const term=rest.slice(1).join(' ');
  const o=await j(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=album&limit=25&country=${country}`);
  console.log('resultCount',o.resultCount);
  for(const r of (o.results||[])) console.log([r.collectionId,r.artistName,'||',r.collectionName,'||',r.trackCount+'tr',(r.releaseDate||'').slice(0,10),r.copyright||''].join(' | '));
} else if(cmd==='l'){
  const country=rest[0], id=rest[1];
  const o=await j(`https://itunes.apple.com/lookup?id=${id}&entity=song&country=${country}&limit=200`);
  const col=(o.results||[]).find(x=>x.wrapperType==='collection');
  if(!col){console.log('NO COLLECTION',JSON.stringify(o).slice(0,300));process.exit(0);}
  console.log('collection:',col.collectionName,'| artist:',col.artistName,'| trackCount:',col.trackCount,'| releaseDate:',col.releaseDate,'| copyright:',col.copyright);
  for(const t of (o.results||[]).filter(x=>x.wrapperType==='track')) console.log(`  ${t.trackNumber}. ${t.trackName}\t${t.trackTimeMillis}ms = ${ms(t.trackTimeMillis)}`);
}
