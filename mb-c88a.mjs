import fs from 'node:fs';
const DIR='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/mb';
const UA='dip-vinyl-shop/1.0 ( kubinice06@gmail.com )';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
export async function mb(path, name){
  const f=`${DIR}/${name}.json`;
  if(fs.existsSync(f)) return JSON.parse(fs.readFileSync(f,'utf8'));
  for(let i=0;i<4;i++){
    const r=await fetch('https://musicbrainz.org/ws/2/'+path+(path.includes('?')?'&':'?')+'fmt=json',{headers:{'User-Agent':UA}});
    if(r.ok){const j=await r.json();fs.writeFileSync(f,JSON.stringify(j));await sleep(1100);return j;}
    await sleep(2500);
  }
  throw new Error('fail '+path);
}
const cards=JSON.parse(fs.readFileSync('/home/user/dip-vinyl-shop/desc-tools/batches/cards/c88-cards.json','utf8')).filter(x=>x.group==='a');
for(const [i,c] of cards.entries()){
  const j=await mb(`release?release-group=${c.rgMbid}&inc=recordings+labels+media&limit=100`,`rels-${i}`);
  const rows=(j.releases||[]).map(r=>({id:r.id,title:r.title,date:r.date,country:r.country,status:r.status,fmt:(r.media||[]).map(m=>m.format+':'+m['track-count']).join('+'),labels:(r['label-info']||[]).map(l=>(l.label&&l.label.name)+'/'+l['catalog-number']).join(', ')}));
  rows.sort((a,b)=>String(a.date||'9999').localeCompare(String(b.date||'9999')));
  console.log('\n### '+i+' '+c.artist+' | '+c.album+'  ('+rows.length+' releases)');
  for(const r of rows) console.log(`  ${r.date||'?'} ${r.country||'??'} ${r.status} [${r.fmt}] ${r.title} :: ${r.labels} :: ${r.id}`);
}
