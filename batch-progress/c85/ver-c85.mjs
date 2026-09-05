import fs from 'node:fs';
import { mb } from './mb-c85.mjs';
const ids = fs.readFileSync(process.argv[2],'utf8').trim().split('\n').map(s=>s.trim()).filter(Boolean);
const out = [];
for (const id of ids) {
  const j = await mb(`release-group/${id}?inc=artist-credits+releases`);
  if (j.__err) { console.log(`ERR ${id} ${j.__err}`); out.push({id,err:j.__err}); continue; }
  const ac = (j['artist-credit']||[]).map(a=>a.name+(a.joinphrase||'')).join('');
  const rels = (j.releases||[]).map(r=>`${r.date||'-'}/${r.country||'-'}/${r.status||'-'}`);
  console.log(`${id} | ${j['primary-type']} | ${(j['secondary-types']||[]).join('/')||'-'} | ${j['first-release-date']||'-'} | ${ac} :: ${j.title} | rel=${rels.length} [${rels.join(', ')}]`);
  out.push({id, type:j['primary-type'], sec:j['secondary-types'], date:j['first-release-date'], ac, title:j.title, rels});
}
fs.writeFileSync(process.argv[3], JSON.stringify(out,null,1));
