import { getJSON } from './mb-c83b.mjs';
import fs from 'fs';
const D=JSON.parse(fs.readFileSync('/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c83b/mbdump.json','utf8'));
const cards=JSON.parse(fs.readFileSync('desc-tools/batches/cards/c83-cards.json','utf8')).filter(c=>c.group==='b');
const UA={ua:'dip-vinyl-research/1.0'};
const out={};
const F='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c83b/dgdump.json';
if(fs.existsSync(F)) Object.assign(out, JSON.parse(fs.readFileSync(F,'utf8')));
for(const c of cards){
  const k=c.artist+'|'+c.album;
  if(out[k]) continue;
  try{
    let mid=null;
    const rels=(D[k].rg.relations||[]).filter(r=>r.type==='discogs');
    if(rels.length){ const m=rels[0].url.resource.match(/master\/(\d+)/); if(m) mid=+m[1]; }
    if(!mid){
      const s=await getJSON(`https://api.discogs.com/database/search?q=${encodeURIComponent(c.artist+' '+c.album)}&type=master`);
      if(s.results&&s.results.length) mid=s.results[0].id;
    }
    if(!mid){ out[k]={note:'no discogs master found'}; continue; }
    const m=await getJSON(`https://api.discogs.com/masters/${mid}`);
    const v=await getJSON(`https://api.discogs.com/masters/${mid}/versions?per_page=100`);
    const mr=await getJSON(`https://api.discogs.com/releases/${m.main_release}`);
    out[k]={masterId:mid, master:{title:m.title,year:m.year,artists:(m.artists||[]).map(a=>a.name),main_release:m.main_release,tracklist:(m.tracklist||[]).map(t=>`${t.position}. ${t.title} ${t.duration||''}`),styles:m.styles,genres:m.genres},
      versions:(v.versions||[]).map(x=>`${x.id} | ${x.title} | ${x.format} | ${x.label} | ${x.catno} | ${x.country} | ${x.released} | ${x.major_formats||''} | ${x.status}`),
      mainRelease:{id:mr.id,title:mr.title,year:mr.year,released:mr.released,country:mr.country,formats:mr.formats,labels:(mr.labels||[]).map(l=>l.name+' '+l.catno),companies:(mr.companies||[]).map(x=>x.entity_type_name+': '+x.name),
        extraartists:(mr.extraartists||[]).map(x=>x.role+': '+x.name+(x.tracks?` [${x.tracks}]`:'')),
        tracklist:(mr.tracklist||[]).map(t=>`${t.position}. ${t.title} ${t.duration||''}`+(t.extraartists?' ['+t.extraartists.map(e=>e.role+': '+e.name).join('; ')+']':'')),
        notes:mr.notes, identifiers:(mr.identifiers||[]).map(i=>i.type+': '+i.value+(i.description?' ('+i.description+')':''))}};
    console.error('OK',k,mid);
  }catch(e){ console.error('FAIL',k,e.message); out[k]={err:e.message}; }
  fs.writeFileSync(F,JSON.stringify(out,null,1));
}
