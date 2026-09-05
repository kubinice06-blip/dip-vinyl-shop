import { mb, dg } from './mb-c83b.mjs';
import fs from 'fs';
const cards = JSON.parse(fs.readFileSync('desc-tools/batches/cards/c83-cards.json','utf8')).filter(c=>c.group==='b');
const out = {};
for (const c of cards) {
  const k = c.artist+'|'+c.album;
  try {
    const rg = await mb(`release-group/${c.rgMbid}?inc=releases+artist-credits+url-rels+tags`);
    const rels = await mb(`release?release-group=${c.rgMbid}&inc=recordings+labels+media+artist-credits&limit=100`);
    out[k] = {rg, rels};
    console.error('OK', k, 'releases='+(rels.releases||[]).length);
  } catch(e) { console.error('FAIL', k, e.message); out[k]={err:e.message}; }
  fs.writeFileSync('/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c83b/mbdump.json', JSON.stringify(out));
}
