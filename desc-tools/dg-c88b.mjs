import {j} from './fetch-c88b.mjs';
const [,,cmd,...rest]=process.argv;
if(cmd==='s'){
  const o=await j(`https://api.discogs.com/database/search?q=${encodeURIComponent(rest.join(' '))}&type=release&per_page=30`);
  if(!o.results){console.log(JSON.stringify(o).slice(0,400));process.exit(0);}
  for(const r of o.results) console.log([r.id,r.year,r.country,(r.format||[]).join('/'),(r.label||[]).slice(0,2).join('/'),(r.catno||''),r.title].join(' | '));
} else if(cmd==='r'){
  const r=await j(`https://api.discogs.com/releases/${rest[0]}`);
  if(r.message||r.__http){console.log(JSON.stringify(r).slice(0,300));process.exit(0);}
  console.log('TITLE:',r.title,'| year:',r.year,'| released:',r.released,'| country:',r.country);
  console.log('formats:',(r.formats||[]).map(f=>f.name+' x'+f.qty+' ['+(f.descriptions||[]).join(',')+']').join(' + '));
  console.log('labels:',(r.labels||[]).map(l=>l.name+' '+l.catno).join(' / '));
  console.log('companies:',(r.companies||[]).map(c=>c.entity_type_name+': '+c.name).join(' | '));
  console.log('genres:',(r.genres||[]).join(','),'| styles:',(r.styles||[]).join(','));
  console.log('credits:',(r.extraartists||[]).map(a=>a.role+': '+a.name+(a.tracks?' ('+a.tracks+')':'')).join(' | '));
  console.log('notes:',(r.notes||'').slice(0,1500));
  console.log('identifiers:',(r.identifiers||[]).map(i=>i.type+' '+(i.description||'')+' '+i.value).join(' | ').slice(0,800));
  console.log('-- tracklist ('+(r.tracklist||[]).length+' positions)');
  for(const t of r.tracklist||[]) console.log(`  ${t.position}\t${t.duration}\t${t.title}\t${(t.artists||[]).map(a=>a.name).join('/')}\t${(t.extraartists||[]).map(a=>a.role+':'+a.name).join(';')}`);
}
