// 用法：node rgdet.mjs <rg-mbid> [...]
const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
for (const id of process.argv.slice(2)) {
  const url = `https://musicbrainz.org/ws/2/release-group/${id}?inc=releases+artist-credits+labels&fmt=json`;
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) { console.log(`${id}: HTTP ${r.status}`); await sleep(1100); continue; }
  const g = await r.json();
  console.log(`\n=== ${g.title} | ${g['first-release-date']} | ${g['primary-type']}${(g['secondary-types']||[]).length?'/'+g['secondary-types'].join('+'):''} | ${id}`);
  console.log(`  credit: ${(g['artist-credit']||[]).map(a=>a.name).join(' & ')}`);
  (g.releases||[]).sort((a,b)=>String(a.date).localeCompare(String(b.date))).forEach(rel=>{
    console.log(`  - ${rel.date||'?'} ${rel.country||'??'} | ${rel.title} | ${rel.status||''}`);
  });
  await sleep(1100);
}
