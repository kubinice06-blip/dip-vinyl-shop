// 用法：node scan.mjs "name1" "name2" ... — 對每個名字查 artist，並列出 top1 的 release-group
const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const _f = globalThis.fetch;
globalThis.fetch = async (u, o) => {
  for (let i = 0; i < 5; i++) {
    const r = await _f(u, o);
    if (r.status !== 503) return r;
    await sleep(2500 * (i + 1));
  }
  return _f(u, o);
};
for (const name of process.argv.slice(2)) {
  const u = `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(name)}&fmt=json&limit=3`;
  let r = await fetch(u, { headers: { 'User-Agent': UA } });
  if (!r.ok) { console.log(`\n### ${name}: artist HTTP ${r.status}`); await sleep(1200); continue; }
  const j = await r.json();
  const a = (j.artists || [])[0];
  console.log(`\n### ${name}`);
  (j.artists||[]).slice(0,3).forEach(x=>console.log(`   cand: ${x.score} ${x.name} [${x.country||'??'} ${x.type||''}] ${x.disambiguation||''} ${x.id}`));
  await sleep(1200);
  if (!a || a.score < 80) { console.log('   -> 無高分藝人'); continue; }
  const u2 = `https://musicbrainz.org/ws/2/release-group?artist=${a.id}&fmt=json&limit=100`;
  r = await fetch(u2, { headers: { 'User-Agent': UA } });
  if (!r.ok) { console.log(`   rg HTTP ${r.status}`); await sleep(1200); continue; }
  const j2 = await r.json();
  console.log(`   -> ${a.name} (${a.id}) rg-count=${j2['release-group-count']}`);
  (j2['release-groups'] || []).sort((x, y) => String(x['first-release-date']).localeCompare(String(y['first-release-date'])))
    .forEach(g => console.log(`      ${g['first-release-date']||'?'} | ${g['primary-type']||'?'}${(g['secondary-types']||[]).length?'/'+g['secondary-types'].join('+'):''} | ${g.title} | ${g.id}`));
  await sleep(1200);
}
