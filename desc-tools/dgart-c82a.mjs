import {j} from './fetch-c82a.mjs';
for(const id of process.argv.slice(2)){
  const o=await j(`https://api.discogs.com/artists/${id}`);
  console.log('### ARTIST',id,'https://www.discogs.com/artist/'+id, JSON.stringify({name:o.name,realname:o.realname,profile:o.profile,aliases:(o.aliases||[]).map(a=>a.name),namevariations:o.namevariations,groups:(o.groups||[]).map(g=>g.name),members:(o.members||[]).map(m=>m.name)}));
}
