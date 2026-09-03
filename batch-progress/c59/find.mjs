// c-59 去重查詢：node find.mjs "<字串>" …  （對 artist 與 album 做不分大小寫子字串比對）
import fs from 'node:fs';
const rows = JSON.parse(fs.readFileSync(new URL('../../seed_cards.json', import.meta.url), 'utf8'));
for (const term of process.argv.slice(2)) {
  const t = term.toLowerCase();
  const hits = rows.filter(r => String(r[0]).toLowerCase().includes(t) || String(r[1]).toLowerCase().includes(t));
  console.log(`\n=== ${term} → ${hits.length}`);
  hits.slice(0, 40).forEach(r => console.log(`  ${r[0]} — ${r[1]} (${r[6]}) [${(r[5] || []).join(',')}]`));
}
