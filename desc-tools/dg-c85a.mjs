import {j} from './fetch-c85a.mjs';
const ids=process.argv.slice(2);
for(const id of ids){
  const o=await j(`https://api.discogs.com/releases/${id}`);
  if(o.__fail||o.__parsefail||o.__http){console.log('### FAIL',id,JSON.stringify(o));continue;}
  console.log('### DISCOGS',id,'https://www.discogs.com/release/'+id);
  console.log(JSON.stringify({title:o.title,artists:(o.artists||[]).map(a=>a.name+(a.anv?` (anv:${a.anv})`:'')+(a.join?' '+a.join:'')),
   year:o.year,released:o.released,released_formatted:o.released_formatted,country:o.country,
   labels:(o.labels||[]).map(l=>l.name+' | '+l.catno), series:(o.series||[]).map(s=>s.name+' | '+s.catno),
   formats:(o.formats||[]).map(f=>f.name+' x'+f.qty+' ['+(f.descriptions||[]).join(', ')+']'+(f.text?' text:'+f.text:'')),
   genres:o.genres, styles:o.styles, notes:o.notes,
   companies:(o.companies||[]).map(c=>c.entity_type_name+': '+c.name),
   extraartists:(o.extraartists||[]).map(e=>e.role+': '+e.name+(e.anv?'(anv:'+e.anv+')':'')+(e.tracks?' ('+e.tracks+')':'')),
   identifiers:(o.identifiers||[]).map(i=>i.type+': '+i.value+(i.description?' ['+i.description+']':'')),
   tracklist:(o.tracklist||[]).map(t=>`${t.position}. ${t.title} ${t.duration||''}`+(t.extraartists?' {'+t.extraartists.map(e=>e.role+':'+e.name).join('; ')+'}':'')),
   master_url:o.master_url},null,1));
}
