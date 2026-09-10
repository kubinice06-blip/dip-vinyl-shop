import fs from 'fs';
const D = JSON.parse(fs.readFileSync('/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c83b/mbdump.json','utf8'));
const only = process.argv[2];
for (const [k,v] of Object.entries(D)) {
  if (only && !k.toLowerCase().includes(only.toLowerCase())) continue;
  console.log('='.repeat(70));
  console.log(k, '| RG', v.rg.id, '| frd', v.rg['first-release-date'], '| type', v.rg['primary-type'], JSON.stringify(v.rg['secondary-types']), '| disamb:', v.rg.disambiguation);
  const urls=(v.rg.relations||[]).map(r=>r.type+': '+(r.url&&r.url.resource));
  if(urls.length) console.log('  RG urls:', urls.join(' | '));
  for (const r of v.rels.releases||[]) {
    const lab=(r['label-info']||[]).map(li=>`${li.label?li.label.name:'?'} ${li['catalog-number']||''}`).join(' / ');
    const ev=(r['release-events']||[]).map(e=>`${e.date||''}@${e.area?e.area.name:'?'}`).join(',');
    console.log(` - REL ${r.id} | ${r.title} | ${r.status} | ${r.date||''} | ${r.country||''} | ${ev} | ${lab} | barcode ${r.barcode||''} | disamb: ${r.disambiguation}`);
    for (const m of r.media||[]) {
      console.log(`    [${m.format||'?'} ${m.position}] tracks=${m['track-count']}`);
      for (const t of m.tracks||[]) console.log(`      ${t.number}. ${t.title} ${t.length?Math.floor(t.length/60000)+':'+String(Math.round(t.length%60000/1000)).padStart(2,'0'):''}`);
    }
  }
}
