import { mb } from './mb-c85.mjs';
const q = process.argv[2];
const j = await mb(`release-group?query=${encodeURIComponent(q)}&limit=50`);
if (j.__err) { console.log('ERR', j.__err); process.exit(1); }
console.log('count=', j.count);
for (const rg of j['release-groups']||[]) {
  const ac=(rg['artist-credit']||[]).map(a=>a.name+(a.joinphrase||'')).join('');
  console.log([rg['primary-type']||'-',(rg['secondary-types']||[]).join('/')||'-',rg['first-release-date']||'-',ac,'::',rg.title,'::',rg.id].join(' | '));
}
