import {j} from './fetch-c83a.mjs';
for(const q of process.argv.slice(2)){
  const o=await j(`https://api.discogs.com/database/search?q=${encodeURIComponent(q)}&type=label&per_page=8`);
  console.log('## Q:',q);
  for(const r of (o.results||[])) console.log('  ',r.id,'|',r.title);
}
