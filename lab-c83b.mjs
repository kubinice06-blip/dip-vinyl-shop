import { getJSON } from './mb-c83b.mjs';
import fs from 'fs';
const F='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c83b/misc.json';
const out=JSON.parse(fs.readFileSync(F,'utf8'));
for(const nm of ['Worm Interface','Wurlitzer Jukebox','Ash International','Earworm','Ochre Records','Enraptured','Lo Recordings','Rocket Girl']){
  const k='label:'+nm; if(out[k])continue;
  try{
    const s=await getJSON(`https://api.discogs.com/database/search?q=${encodeURIComponent(nm)}&type=label`);
    const hit=(s.results||[]).find(r=>r.title.toLowerCase()===nm.toLowerCase())||s.results[0];
    const l=await getJSON(`https://api.discogs.com/labels/${hit.id}`);
    const rel=await getJSON(`https://api.discogs.com/labels/${hit.id}/releases?per_page=1`);
    out[k]={id:l.id,name:l.name,profile:l.profile,contact:l.contact_info,parent:l.parent_label&&l.parent_label.name,sublabels:(l.sublabels||[]).map(x=>x.name),urls:l.urls,releaseCount:rel.pagination.items};
    console.error('OK label',nm,l.id,rel.pagination.items);
  }catch(e){console.error('FAIL',nm,e.message);}
  fs.writeFileSync(F,JSON.stringify(out,null,1));
}
