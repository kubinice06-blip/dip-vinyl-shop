import {j,ms} from './fetch-c88b.mjs';
const [,,cmd,a,b]=process.argv;
if(cmd==='s'){
  const country=b||'us';
  const o=await j(`https://itunes.apple.com/search?term=${encodeURIComponent(a)}&country=${country}&entity=album&limit=25`);
  console.log('count',o.resultCount);
  for(const r of o.results||[]) console.log([r.collectionId,r.trackCount,(r.releaseDate||'').slice(0,10),r.artistName,'||',r.collectionName,'||',r.copyright||''].join(' | '));
} else if(cmd==='l'){
  const country=b||'us';
  const o=await j(`https://itunes.apple.com/lookup?id=${a}&country=${country}&entity=song&limit=200`);
  const col=(o.results||[]).find(x=>x.wrapperType==='collection');
  if(!col){console.log('NO COLLECTION', JSON.stringify(o).slice(0,300));process.exit(0);}
  console.log('NAME:',col.collectionName,'| artist:',col.artistName,'| trackCount field:',col.trackCount,'| release:',col.releaseDate,'| ©:',col.copyright||'');
  const songs=(o.results||[]).filter(x=>x.wrapperType==='track');
  console.log('listed songs:',songs.length);
  for(const s of songs) console.log(`  ${s.trackNumber}\t${ms(s.trackTimeMillis)}\t${s.trackName}\t[${s.artistName}]`);
}
