// MB 備援查詢：古典 release-group 的 artist-credit 掛的是作曲家，用演奏者查 RG 會零結果。
// 改查 release 層（演奏者通常出現在 release 的 artist-credit），再把命中的 RG 逐一取詳情。
// 用法：node batch-progress/mb2.mjs <seed.json> <out.json> [--only-missing <mb-raw.json>]
import fs from 'node:fs';

const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const esc = s => String(s).replace(/([+\-!(){}\[\]^"~*?:\\/])/g, '\\$1');

async function mb(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(60000) });
      if (r.ok) return r.json();
      if (r.status === 503) { await sleep(3000 * (i + 1)); continue; }
      return { _http: r.status };
    } catch { await sleep(2500 * (i + 1)); }
  }
  return { _http: 'timeout' };
}

const [seedFile, outFile, flag, rawFile] = process.argv.slice(2);
let seeds = JSON.parse(fs.readFileSync(seedFile, 'utf8'));
if (flag === '--only-missing') {
  const raw = JSON.parse(fs.readFileSync(rawFile, 'utf8'));
  seeds = seeds.filter(s => {
    const v = raw[`${s.artist}|${s.album}`];
    return !v || v._error || !v.length;
  });
  console.error(`只補查未解出的 ${seeds.length} 筆`);
}
const out = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
const rgCache = {};

// 作品名：去掉「作曲家: 」前綴與括註，只留作品側
const workOf = a => String(a).includes(':') ? String(a).split(':').slice(1).join(':').replace(/\(.*?\)/g, '').trim()
  : String(a).replace(/\(.*?\)/g, '').trim();
// 掛名：取第一位（"Oistrakh / Rostropovich / ..." 這種只用第一位查）
const soloOf = a => String(a).split(/\s*[\/&]\s*/)[0].trim();

let n = 0;
for (const s of seeds) {
  const k = `${s.artist}|${s.album}`;
  if (out[k]) { n++; continue; }
  const q = `artist:"${esc(soloOf(s.artist))}" AND release:"${esc(workOf(s.album))}"`;
  const j = await mb(`https://musicbrainz.org/ws/2/release/?query=${encodeURIComponent(q)}&fmt=json&limit=${process.env.MB_LIMIT || 10}`);
  const rgs = new Map();
  for (const r of j.releases || []) {
    const g = r['release-group'];
    if (!g?.id || rgs.has(g.id)) continue;
    rgs.set(g.id, { id: g.id, title: g.title, viaRelease: r.title, releaseDate: r.date, score: r.score,
      releaseCredit: (r['artist-credit'] || []).map(c => c.name).join(', ') });
  }
  const detailed = [];
  for (const g of [...rgs.values()].slice(0, Number(process.env.MB_KEEP || 5))) {
    if (!rgCache[g.id]) {
      await sleep(1100);
      rgCache[g.id] = await mb(`https://musicbrainz.org/ws/2/release-group/${g.id}?fmt=json&inc=artist-credits`);
    }
    const d = rgCache[g.id];
    detailed.push({ ...g,
      primaryType: d['primary-type'] ?? null,
      secondaryTypes: d['secondary-types'] ?? [],
      firstRelease: d['first-release-date'] ?? null,
      rgCredit: (d['artist-credit'] || []).map(c => c.name).join(', ') || null });
  }
  out[k] = detailed;
  n++;
  fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
  console.error(`${n}/${seeds.length}  ${k} → ${detailed.length} 個 RG`);
  await sleep(1100);
}
console.error('完成');
