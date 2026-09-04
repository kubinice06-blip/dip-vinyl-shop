const ids=process.argv[2].split(',');const c=process.argv[3]||'us';
for(const id of ids){
  const r=await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song&limit=60&country=${c}`);
  const j=await r.json();
  if(!j.results||!j.results.length){console.log('### '+id+' NONE');continue}
  const col=j.results[0];
  console.log(`### ${id} | ${col.collectionName} | ${col.artistName} | ${col.trackCount} | ${(col.releaseDate||'').slice(0,10)} | ${col.copyright||''}`);
  console.log('   '+j.results.slice(1).map(t=>t.trackNumber+'.'+t.trackName).join(' | '));
  await new Promise(r=>setTimeout(r,350));
}
