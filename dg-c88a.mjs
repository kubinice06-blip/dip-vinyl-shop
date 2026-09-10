import {dg} from './fetch-c88a.mjs';
const q=process.argv[2], name=process.argv[3];
const r=await dg('/database/search?'+q+'&per_page=10',name);
if(!r){console.log('FAIL');process.exit(0)}
for(const x of (r.results||[])) console.log(x.type, x.id,'|',x.title,'|',x.year,'|',(x.label||[]).slice(0,2).join('/'),'|',(x.catno||''),'|',(x.format||[]).join(','),'|',(x.country||''));
