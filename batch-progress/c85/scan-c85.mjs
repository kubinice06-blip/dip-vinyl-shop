import fs from 'node:fs';
const rows = JSON.parse(fs.readFileSync('/home/user/dip-vinyl-shop/seed_cards.json','utf8'));
const args = process.argv.slice(2);
const mode = args[0];
const norm = s => String(s).toLowerCase();
if (mode === 'artist') {
  const pats = args.slice(1);
  for (const p of pats) {
    const hits = rows.filter(r => norm(r[0]).includes(p.toLowerCase()));
    console.log(`[${p}] ${hits.length}`);
    hits.forEach(h => console.log('   ', h[0],'|',h[1],'|',h[6],'|',JSON.stringify(h[5])));
  }
} else if (mode === 'album') {
  const pats = args.slice(1);
  for (const p of pats) {
    const hits = rows.filter(r => norm(r[1]).includes(p.toLowerCase()));
    console.log(`[${p}] ${hits.length}`);
    hits.forEach(h => console.log('   ', h[0],'|',h[1],'|',h[6]));
  }
} else if (mode === 'genre') {
  // list all cards whose genres include a tag
  const g = args[1];
  const hits = rows.filter(r => (r[5]||[]).includes(g));
  console.log(`genre ${g}: ${hits.length}`);
  hits.forEach(h => console.log('   ', h[0],'|',h[1],'|',h[6],'|',JSON.stringify(h[5])));
}
