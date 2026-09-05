import fs from 'fs';
const SD='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad';
const UA={'User-Agent':'dip-vinyl-research/1.0 (kubinice06@gmail.com)'};
const cards=JSON.parse(fs.readFileSync('/home/user/dip-vinyl-shop/desc-tools/batches/cards/c91-cards.json','utf8')).filter(x=>x.group==='b');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function j(u,h={}){for(let i=0;i<4;i++){try{const r=await fetch(u,{headers:{...UA,...h}});if(r.status===503||r.status===429||r.status===403){await sleep(2500*(i+1));continue;}return await r.json();}catch(e){await sleep(2000);}}return null;}
const out={};
for(const c of cards){
  const rec={key:c.key,artist:c.artist,album:c.album,rgMbid:c.rgMbid};
  const rg=await j(`https://musicbrainz.org/ws/2/release-group/${c.rgMbid}?inc=releases+artist-credits&fmt=json`);
  await sleep(1200);
  rec.rgTitle=rg?.title; rec.frd=rg?.['first-release-date']; rec.pt=rg?.['primary-type']; rec.st=rg?.['secondary-types'];
  rec.ac=rg?.['artist-credit']?.map(a=>a.name).join(' ');
  rec.releases=(rg?.releases||[]).map(r=>({id:r.id,title:r.title,date:r.date,country:r.country,status:r.status}));
  // fetch tracklists of official releases
  rec.tracklists=[];
  for(const r of rec.releases.filter(r=>r.status==='Official').slice(0,3)){
    const rel=await j(`https://musicbrainz.org/ws/2/release/${r.id}?inc=recordings+labels&fmt=json`);
    await sleep(1200);
    if(!rel) continue;
    rec.tracklists.push({id:r.id,title:rel.title,date:rel.date,country:rel.country,
      labels:(rel['label-info']||[]).map(l=>`${l.label?.name||'?'}/${l['catalog-number']||'?'}`),
      tracks:(rel.media||[]).flatMap(m=>(m.tracks||[]).map(t=>`${t.position}. ${t.title} [${t.length?Math.floor(t.length/60000)+':'+String(Math.round(t.length%60000/1000)).padStart(2,'0'):'?'}]`))});
  }
  out[c.key]=rec;
  console.log(c.key,'rg=',rec.rgTitle,'frd=',rec.frd,'rels=',rec.releases.length,'tl=',rec.tracklists.map(t=>t.tracks.length).join(','));
}
fs.writeFileSync(SD+'/c91b-mb.json',JSON.stringify(out,null,1));
