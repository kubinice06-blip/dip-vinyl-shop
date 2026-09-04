import {dg} from './fetch-c88a.mjs';
const map=JSON.parse(process.argv[2]);
for(const [i,id] of Object.entries(map)){
  const r=await dg('/releases/'+id,'dgd-'+i);
  if(!r){console.log('### '+i+' FAIL');continue}
  console.log(`\n### ${i} https://www.discogs.com/release/${id}  ${r.artists_sort} – ${r.title} | year ${r.year} | released ${r.released} | ${r.country} | ${(r.formats||[]).map(f=>f.name+' x'+f.qty+' ['+(f.descriptions||[]).join(',')+']').join(' + ')}`);
  console.log(' labels: '+(r.labels||[]).map(l=>l.name+' '+l.catno).join(' ; '));
  console.log(' genres: '+(r.genres||[]).join(',')+' | styles: '+(r.styles||[]).join(','));
  if(r.companies&&r.companies.length) console.log(' companies: '+r.companies.map(c=>c.entity_type_name+'「'+c.name+'」').join(' ; '));
  if(r.extraartists&&r.extraartists.length) console.log(' credits: '+r.extraartists.map(c=>c.role+'「'+c.name+'」'+(c.tracks?'('+c.tracks+')':'')).join(' ; '));
  if(r.identifiers) console.log(' ids: '+r.identifiers.map(x=>x.type+(x.description?'['+x.description+']':'')+': '+x.value).join(' ; ').slice(0,400));
  if(r.notes) console.log(' notes: '+r.notes.replace(/\n/g,' / ').slice(0,900));
  console.log(' tracks: '+(r.tracklist||[]).length);
}
