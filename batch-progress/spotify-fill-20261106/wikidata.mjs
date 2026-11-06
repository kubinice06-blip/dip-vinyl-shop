// Wikidata：MusicBrainz release-group ID（P436）→ Spotify 專輯 ID（P2205）。免配額、社群維護。
import fs from 'node:fs';
const D = 'batch-progress/spotify-fill-20261106/';
const miss = JSON.parse(fs.readFileSync(D + 'missing.json', 'utf8')).filter(x => x.rgMbid);
const out = {};
for (let i = 0; i < miss.length; i += 150) {
  const ids = miss.slice(i, i + 150).map(x => `"${x.rgMbid}"`).join(' ');
  const q = `SELECT ?mb ?sp WHERE { VALUES ?mb { ${ids} } ?item wdt:P436 ?mb . ?item wdt:P2205 ?sp . }`;
  for (let t = 0; t < 4; t++) {
    try {
      const r = await fetch('https://query.wikidata.org/sparql', { method: 'POST', headers: { 'User-Agent': 'dip-vinyl-repair/1.0 (https://dipvinyl.tw)', Accept: 'application/sparql-results+json', 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'query=' + encodeURIComponent(q) });
      const j = await r.json();
      for (const b of j.results.bindings) (out[b.mb.value] ||= []).push(b.sp.value);
      break;
    } catch (e) { await new Promise(s => setTimeout(s, 5000)); }
  }
  await new Promise(s => setTimeout(s, 1000));
}
fs.writeFileSync(D + 'wikidata.json', JSON.stringify(out, null, 1));
console.log('rg with spotify:', Object.keys(out).length, '/', miss.length);
