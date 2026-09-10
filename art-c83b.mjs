import { mb, getJSON } from './mb-c83b.mjs';
import fs from 'fs';
const D=JSON.parse(fs.readFileSync('/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c83b/mbdump.json','utf8'));
const F='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c83b/artdump.json';
const out=fs.existsSync(F)?JSON.parse(fs.readFileSync(F,'utf8')):{};
for(const [k,v] of Object.entries(D)){
  if(out[k]) continue;
  const aid=v.rg['artist-credit'][0].artist.id;
  try{
    const a=await mb(`artist/${aid}?inc=aliases+url-rels+release-groups&limit=100`);
    out[k]={id:aid,name:a.name,sort:a['sort-name'],type:a.type,country:a.country,area:a.area&&a.area.name,begin:a['life-span'],disamb:a.disambiguation,
      aliases:(a.aliases||[]).map(x=>x.name+' ['+(x.type||'')+']'),
      urls:(a.relations||[]).map(r=>r.type+': '+(r.url&&r.url.resource)),
      rgs:(a['release-groups']||[]).map(g=>`${g['first-release-date']||'?'} ${g['primary-type']}${(g['secondary-types']||[]).length?'/'+g['secondary-types'].join(','):''} — ${g.title}`).sort()};
    console.error('OK',k,out[k].rgs.length);
  }catch(e){console.error('FAIL',k,e.message);}
  fs.writeFileSync(F,JSON.stringify(out,null,1));
}
