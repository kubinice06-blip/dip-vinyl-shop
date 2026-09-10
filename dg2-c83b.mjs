import { getJSON } from './mb-c83b.mjs';
import fs from 'fs';
const F='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c83b/dgdump.json';
const out=JSON.parse(fs.readFileSync(F,'utf8'));
const todo={'Soundsmith|Aquanaut':1216386,'Longstone|Surrounded by Glass':225116,'Tånk|Upwards at 66°N':554576,'Skyray|Mind Lagoons':182637,'The Land of Nod|Translucent':2004140,'The Freed Unit|Things Are Looking Up':2434122};
for(const [k,rid] of Object.entries(todo)){
  if(out[k]&&out[k].mainRelease) continue;
  try{
    const mr=await getJSON(`https://api.discogs.com/releases/${rid}`);
    out[k]={masterId:mr.master_id||null, master:null, versions:[],
      mainRelease:{id:mr.id,title:mr.title,year:mr.year,released:mr.released,country:mr.country,formats:mr.formats,labels:(mr.labels||[]).map(l=>l.name+' '+l.catno),
       artists:(mr.artists||[]).map(a=>a.name+(a.anv?` (anv:${a.anv})`:'')),
       companies:(mr.companies||[]).map(x=>x.entity_type_name+': '+x.name),
       extraartists:(mr.extraartists||[]).map(x=>x.role+': '+x.name+(x.tracks?` [${x.tracks}]`:'')),
       tracklist:(mr.tracklist||[]).map(t=>`${t.position}. ${t.title} ${t.duration||''}`+(t.extraartists?' ['+t.extraartists.map(e=>e.role+': '+e.name).join('; ')+']':'')),
       notes:mr.notes, identifiers:(mr.identifiers||[]).map(i=>i.type+': '+i.value+(i.description?' ('+i.description+')':''))}};
    if(mr.master_id){ try{ const v=await getJSON(`https://api.discogs.com/masters/${mr.master_id}/versions?per_page=100`); out[k].versions=(v.versions||[]).map(x=>`${x.id} | ${x.title} | ${x.format} | ${x.label} | ${x.catno} | ${x.country} | ${x.released}`);}catch(e){} }
    console.error('OK',k);
  }catch(e){console.error('FAIL',k,e.message);}
  fs.writeFileSync(F,JSON.stringify(out,null,1));
}
