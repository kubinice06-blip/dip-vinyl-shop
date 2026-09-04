import {j} from './fetch-c86b.mjs';
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
else if(cmd==='m'){
  const m=await j(`https://api.discogs.com/masters/${rest[0]}`);
  if(m.message||m.__http){console.log('ERR',JSON.stringify(m).slice(0,200));process.exit(0);}
  console.log('MASTER',m.id,'|',m.artists?.map(a=>a.name).join('/'),'|',m.title,'| year:',m.year,'| main_release:',m.main_release,'| versions:',m.num_for_sale!=null?'':'');
  console.log('genres:',(m.genres||[]).join(','),'| styles:',(m.styles||[]).join(','));
  console.log('-- tracklist ('+(m.tracklist||[]).length+')');
  for(const t of m.tracklist||[]) console.log(`  ${t.position}\t${t.duration}\t${t.title}\t${(t.extraartists||[]).map(a=>a.role+':'+a.name).join(';')}`);
}
else if(cmd==='v'){
  let page=1,all=[];
  while(true){
    const o=await j(`https://api.discogs.com/masters/${rest[0]}/versions?per_page=100&page=${page}`);
    if(!o.versions){console.log('ERR',JSON.stringify(o).slice(0,200));break;}
    all=all.concat(o.versions);
    if(o.pagination && page<o.pagination.pages){page++;continue;}
    break;
  }
  console.log('VERSIONS total',all.length);
  for(const v of all) console.log([v.id,v.released||v.year,v.country,v.format,v.label,v.catno,v.major_formats?.join('/'),v.title,'STAT:'+(v.stats?'':''),v.status||''].join(' | '));
}
