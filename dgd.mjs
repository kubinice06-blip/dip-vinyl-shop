import {dg} from './fetch-c88a.mjs';
const map={0:6124938,1:5576539,3:3879263,5:22700489,6:970965,7:4215358,8:9628970,9:24086774,10:10417,11:10586554,12:236201,13:29093167,14:6776503,15:1947179,16:11030460,17:16185080,19:512590,20:565588,21:828079};
const only=process.argv[2]?process.argv[2].split(',').map(Number):Object.keys(map).map(Number);
for(const i of only){
  const r=await dg('/releases/'+map[i],'dgd-'+i);
  if(!r){console.log('### '+i+' FAIL');continue}
  console.log(`\n### ${i} https://www.discogs.com/release/${map[i]}  ${r.artists_sort} – ${r.title} | year ${r.year} | released ${r.released} | ${r.country} | ${(r.formats||[]).map(f=>f.name+' x'+f.qty+' ['+(f.descriptions||[]).join(',')+']').join(' + ')}`);
  console.log(' labels: '+(r.labels||[]).map(l=>l.name+' '+l.catno).join(' ; '));
  console.log(' genres: '+(r.genres||[]).join(',')+' | styles: '+(r.styles||[]).join(','));
  if(r.companies&&r.companies.length) console.log(' companies: '+r.companies.map(c=>c.entity_type_name+'「'+c.name+'」').join(' ; '));
  if(r.extraartists&&r.extraartists.length) console.log(' credits: '+r.extraartists.map(c=>c.role+'「'+c.name+'」'+(c.tracks?'('+c.tracks+')':'')).join(' ; '));
  if(r.identifiers&&r.identifiers.length) console.log(' ids: '+r.identifiers.map(x=>x.type+(x.description?'['+x.description+']':'')+': '+x.value).join(' ; '));
  if(r.notes) console.log(' notes: '+r.notes.replace(/\n/g,' / '));
  console.log(' tracks: '+(r.tracklist||[]).length);
}
