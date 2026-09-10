import {j} from './fetch-c83a.mjs';
for(const id of process.argv.slice(2)){
  const o=await j(`https://api.discogs.com/artists/${id}`);
  if(o.__fail||o.__parsefail){console.log('### FAIL',id);continue;}
  console.log('### ARTIST',id,'https://www.discogs.com/artist/'+id);
  console.log(JSON.stringify({name:o.name,realname:o.realname,profile:o.profile,namevariations:o.namevariations,aliases:(o.aliases||[]).map(a=>a.name),groups:(o.groups||[]).map(g=>g.name),members:(o.members||[]).map(m=>m.name+(m.active?'':' [inactive]'))}));
}
