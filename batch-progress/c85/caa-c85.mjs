import fs from 'node:fs';
const ids = fs.readFileSync(process.argv[2],'utf8').trim().split('\n').map(s=>s.trim()).filter(Boolean);
let hit=0, miss=0, err=0;
for (const id of ids) {
  try {
    const r = await fetch(`https://coverartarchive.org/release-group/${id}/front`, { method:'HEAD', redirect:'follow' });
    if (r.ok) { hit++; console.log(`HIT  ${id}`); } else if (r.status===404) { miss++; console.log(`MISS ${id}`); }
    else { err++; console.log(`ERR${r.status} ${id}`); }
  } catch(e) { err++; console.log(`ERRx ${id} ${e.message}`); }
  await new Promise(r=>setTimeout(r,300));
}
console.log(`CAA: hit=${hit} miss=${miss} err=${err} / ${ids.length}`);
