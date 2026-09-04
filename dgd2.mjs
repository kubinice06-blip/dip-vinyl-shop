import {dg} from './fetch-c88a.mjs';
const map={2:10334278,18:1211512};
for(const i of Object.keys(map)){
  const r=await dg('/releases/'+map[i],'dgd-'+i);
  if(!r){console.log('### '+i+' FAIL');continue}
  console.log(`\n### ${i} https://www.discogs.com/release/${map[i]}  ${r.artists_sort} – ${r.title} | year ${r.year} | released ${r.released} | ${r.country} | ${(r.formats||[]).map(f=>f.name+' x'+f.qty+' ['+(f.descriptions||[]).join(',')+']').join(' + ')}`);
  console.log(' labels: '+(r.labels||[]).map(l=>l.name+' '+l.catno).join(' ; '));
  console.log(' genres: '+(r.genres||[]).join(',')+' | styles: '+(r.styles||[]).join(','));
  if(r.companies&&r.companies.length) console.log(' companies: '+r.companies.map(c=>c.entity_type_name+'「'+c.name+'」').join(' ; '));
  if(r.extraartists&&r.extraartists.length) console.log(' credits: '+r.extraartists.map(c=>c.role+'「'+c.name+'」'+(c.tracks?'('+c.tracks+')':'')).join(' ; '));
  if(r.notes) console.log(' notes: '+r.notes.replace(/\n/g,' / '));
  console.log(' tracks: '+(r.tracklist||[]).length);
}
