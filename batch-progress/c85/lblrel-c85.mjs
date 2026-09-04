import { mb } from './mb-c85.mjs';
const id = process.argv[2];
const seen = new Map();
for (let off=0; off<600; off+=100) {
  const j = await mb(`release?label=${id}&limit=100&offset=${off}&inc=release-groups+artist-credits+labels`);
  if (j.__err) { console.log('ERR', j.__err); break; }
  for (const r of j.releases||[]) {
    const rg = r['release-group']||{};
    if (rg['primary-type']!=='Album') continue;
    if ((rg['secondary-types']||[]).length) continue;
    if (seen.has(rg.id)) continue; seen.set(rg.id,1);
    const ac=(r['artist-credit']||[]).map(a=>a.name+(a.joinphrase||'')).join('');
    const labs=(r['label-info']||[]).map(l=>`${l.label?.name||'?'} ${l['catalog-number']||''}`).join('; ');
    console.log([rg['first-release-date']||r.date||'-', r.country||'-', ac, '::', rg.title, '::', labs, '::', rg.id].join(' | '));
  }
  if (off+100 >= (j['release-count']||0)) break;
}
