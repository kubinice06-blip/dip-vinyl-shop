import {j} from './fetch-c83a.mjs';
const q=process.argv[2], type=process.argv[3]||'release';
const o=await j(`https://api.discogs.com/database/search?q=${encodeURIComponent(q)}&type=${type}&per_page=25`);
if(!o.results){console.log(JSON.stringify(o).slice(0,400));process.exit(0);}
for(const r of o.results) console.log([r.id,r.type,r.year,r.country,(r.format||[]).join('/'),(r.label||[]).slice(0,2).join('/'),(r.catno||''),r.title].join(' | '));
