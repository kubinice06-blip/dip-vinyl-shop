import fs from 'node:fs';
const OUT='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c90b';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function get(url,tries=6){
  for(let i=0;i<tries;i++){
    try{const r=await fetch(url,{headers:{'User-Agent':'dipvinyl/1.0 +research'}});
      if(r.status===429||r.status===503){await sleep(6000*(i+1));continue;}
      if(!r.ok)return{__http:r.status};
      return JSON.parse(await r.text());}catch(e){await sleep(3000);}
  } return {__error:1};
}
const store=fs.existsSync(`${OUT}/discogs.json`)?JSON.parse(fs.readFileSync(`${OUT}/discogs.json`,'utf8')):{};
for(const arg of process.argv.slice(2)){
  const [kind,val]=arg.split('~');
  if(store[arg]){console.log('cached',arg);continue;}
  let url;
  if(kind==='r') url=`https://api.discogs.com/releases/${val}`;
  else if(kind==='catno') url=`https://api.discogs.com/database/search?catno=${encodeURIComponent(val)}&type=release`;
  else url=`https://api.discogs.com/database/search?q=${encodeURIComponent(val)}&type=release`;
  const j=await get(url);
  store[arg]=j;
  if(kind==='r'){
    console.log(`## R${val}: ${j.title} | ${(j.labels||[]).map(l=>l.name+' '+l.catno).join('; ')} | ${j.released||j.year} | ${(j.formats||[]).map(f=>f.name+' '+(f.descriptions||[]).join(',')).join('+')}`);
    console.log('   country:',j.country,'| barcode:',(j.identifiers||[]).filter(i=>i.type==='Barcode').map(i=>i.value).join(','));
    (j.extraartists||[]).forEach(a=>console.log('   credit:',a.role,'=',a.name,a.tracks?('['+a.tracks+']'):''));
    (j.tracklist||[]).forEach(t=>console.log('   tr',t.position,t.title,t.duration,(t.extraartists||[]).map(a=>a.role+':'+a.name).join(';')));
    if(j.notes) console.log('   notes:',String(j.notes).replace(/\n/g,' | ').slice(0,900));
    (j.companies||[]).forEach(c=>console.log('   co:',c.entity_type_name,'=',c.name));
  } else {
    console.log(`## ${arg} -> ${(j.results||[]).length}`);
    (j.results||[]).slice(0,12).forEach(x=>console.log('   ',x.id,'|',x.title,'|',x.year,'|',(x.label||[]).join('/'),'|',(x.catno||''),'|',x.country,'|',(x.format||[]).join(',')));
  }
  fs.writeFileSync(`${OUT}/discogs.json`,JSON.stringify(store,null,1));
  await sleep(2800);
}
