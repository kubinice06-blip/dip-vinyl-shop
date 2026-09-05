import {get} from './fetch-c85a.mjs';
import fs from 'fs';
const OUT='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c85a/wiki';
fs.mkdirSync(OUT,{recursive:true});
for(const t of process.argv.slice(2)){
  const u=`https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(t)}&prop=wikitext&format=json&redirects=1`;
  const r=await get(u);
  let o; try{o=JSON.parse(r)}catch(e){o={}}
  const wt=o?.parse?.wikitext?.['*'];
  if(!wt){ console.log('MISS',t); continue; }
  fs.writeFileSync(`${OUT}/${t.replace(/[^A-Za-z0-9]/g,'_')}.txt`, `SOURCE https://en.wikipedia.org/wiki/${encodeURIComponent(o.parse.title.replace(/ /g,'_'))}\n\n`+wt);
  console.log('OK',t,wt.length);
}
