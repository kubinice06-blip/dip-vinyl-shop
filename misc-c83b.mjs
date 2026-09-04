import { getJSON } from './mb-c83b.mjs';
import fs from 'fs';
const F='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c83b/misc.json';
const out=fs.existsSync(F)?JSON.parse(fs.readFileSync(F,'utf8')):{};
const artists={663:'Astral Engineering',437:'Scanner',62507:'Hafler Trio',349:'Freeform',4090:'Amp',66948:'Electroscope',65825:'Movietone',212837:'Third Eye Foundation',5039:'Twisted Science',67015:'Soundsmith',171683:'Metrotone',66950:'Ma Cherie',51796:'Longstone',333273:'Alpha Stone',66949:'Freed Unit',40350:'Hazard',91087:'Avrocar',91086:'Tank',65228:'Piano Magic',55833:'Skyray',66951:'Land of Nod',90418:'EAR',523:'Rothko'};
for(const [id,nm] of Object.entries(artists)){
  const k='artist:'+id; if(out[k])continue;
  try{ const a=await getJSON(`https://api.discogs.com/artists/${id}`);
    out[k]={id:a.id,name:a.name,realname:a.realname,profile:a.profile,namevariations:a.namevariations,aliases:(a.aliases||[]).map(x=>x.name),members:(a.members||[]).map(x=>x.name),groups:(a.groups||[]).map(x=>x.name),urls:a.urls};
    console.error('OK artist',nm);
  }catch(e){console.error('FAIL',nm,e.message);}
  fs.writeFileSync(F,JSON.stringify(out,null,1));
}
