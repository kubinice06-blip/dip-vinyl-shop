// 逐張打 /album-desc 比對前台是否已供新稿（鍵都已存在，不會觸發生成）。node front-check.mjs <batch>
import fs from 'node:fs';
const batch = process.argv[2];
const rows = fs.readdirSync('desc-tools/batches/output').filter(f => f.startsWith(batch + '-out-')).flatMap(f => JSON.parse(fs.readFileSync('desc-tools/batches/output/' + f, 'utf8')));
const res = { ok: [], curated: [], other: [] };
for (const r of rows) {
  const x = await fetch(`https://dip-vinyl-worker.kubinice06.workers.dev/album-desc?artist=${encodeURIComponent(r.artist)}&album=${encodeURIComponent(r.album)}&verify=${Date.now()}`, { headers: { 'User-Agent': 'dip-vinyl-shop/1.0 (+https://dipvinyl.tw)' } });
  const j = await x.json(); const xc = x.headers.get('x-cache');
  (j.desc === r.desc ? res.ok : xc === 'CURATED' ? res.curated : res.other).push(`${r.key} [${xc}]`);
}
console.log(`前台新稿 ${res.ok.length}｜CURATED 蓋住 ${res.curated.length}｜其他不符 ${res.other.length}`);
for (const k of [...res.curated, ...res.other]) console.log('  ' + k);
