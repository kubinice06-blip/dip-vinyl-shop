// 用法：node lbl.mjs <rg-mbid> [...] — 列出該 release-group 底下每個 release 的廠牌與目錄號
const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const _f = globalThis.fetch;
globalThis.fetch = async (u, o) => { for (let i=0;i<5;i++){ const r= await _f(u,o); if(r.status!==503) return r; await sleep(2500*(i+1)); } return _f(u,o); };
for (const id of process.argv.slice(2)) {
  const url = `https://musicbrainz.org/ws/2/release?release-group=${id}&inc=labels+media&fmt=json&limit=50`;
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) { console.log(`${id}: HTTP ${r.status}`); await sleep(1200); continue; }
  const j = await r.json();
  console.log(`\n=== ${id}`);
  (j.releases||[]).sort((a,b)=>String(a.date).localeCompare(String(b.date))).forEach(rel=>{
    const li = (rel['label-info']||[]).map(l=>`${l.label?l.label.name:'?'} ${l['catalog-number']||''}`).join(' / ');
    const fmt = (rel.media||[]).map(m=>m.format||'?').join('+');
    console.log(`  - ${rel.date||'?'} ${rel.country||'??'} | ${rel.title} | ${fmt} | ${li}`);
  });
  await sleep(1200);
}
