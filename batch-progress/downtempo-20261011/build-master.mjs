// downtempo 線：四組策展合併 → master.json（跨組去重、主線刪除、MB release-group 回查類型／標題／年份）。
//   node batch-progress/downtempo-20261011/build-master.mjs
import fs from 'node:fs';
const D = 'batch-progress/downtempo-20261011/';
const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const n = s => String(s || '').toLowerCase().replace(/[‐-―－]/g, '-').normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, '');
const GENRES = {
  'a:1': ['world', 'electronic'], 'a:2': ['world', 'electronic'], 'a:3': ['electronic', 'world'], 'a:4': ['world', 'electronic'], 'a:5': ['electronic', 'world'],
  'b:1': ['electronic'], 'b:2': ['electronic'], 'b:3': ['electronic', 'hiphop'], 'b:4': ['electronic', 'hiphop'], 'b:5': ['electronic'],
  'c:1': ['electronic', 'jazz'], 'c:2': ['jazz', 'electronic'], 'c:3': ['electronic', 'jazz'], 'c:4': ['electronic', 'world'], 'c:5': ['electronic'], 'c:6': ['electronic', 'world'],
  'd:J1': ['electronic', 'jazz'], 'd:J2': ['electronic'], 'd:A': ['electronic', 'pop'], 'd:K': ['electronic', 'folk'], 'd:C': ['electronic', 'pop'],
};
// 主線刪除（rulings 主線段）
const DROP = [['Burning Spear', 'Living Dub, Volume 2'], ['細野晴臣', 'omni Sight Seeing']];
// 主線更正（逐筆寫理由進 rulings）
const FIX = {
  'eee51fc6-cea9-3306-b951-55d007c754c3': { mbRgMbid: 'daec9d93-8fd2-3e73-b571-bca26b1865be', artist: 'The Upsetters', album: 'Cloak & Dagger', year: 1972,
    evidence: ['https://musicbrainz.org/release-group/daec9d93-8fd2-3e73-b571-bca26b1865be'], uncertain: '策展原 MBID 誤掛 Witchfynde 同名專輯，主線改正；掛名照池中 The Upsetters 先例' },
};
FIX['3fd87a29-6f03-31f0-90f0-28712608577c'] = { artist: 'The Upsetters', uncertain: 'MB credit Lee Perry and The Upsetters；掛名照池中 The Upsetters 四張先例' };
const OUT = D + 'master.json';
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : [];
const prevBy = new Map(prev.map(x => [x.mbRgMbid, x]));
const all = [], seen = new Set();
for (const g of ['a', 'b', 'c', 'd']) {
  const j = JSON.parse(fs.readFileSync(`${D}curation-${g}.json`, 'utf8'));
  const zh = Object.fromEntries(j.factions.map(f => [f.id, f.zh]));
  for (const a of j.albums) {
    const k = n(a.artist) + '|' + n(a.album);
    if (seen.has(k) || seen.has(a.mbRgMbid)) continue;
    if (DROP.some(([x, y]) => n(x) === n(a.artist) && n(y) === n(a.album))) continue;
    seen.add(k); seen.add(a.mbRgMbid);
    Object.assign(a, FIX[a.mbRgMbid] || {});
    all.push({ ...a, group: g, factionZh: zh[a.faction], genres: GENRES[`${g}:${a.faction}`] });
  }
}
for (const a of all) {
  const p = prevBy.get(a.mbRgMbid);
  if (p?.mb) { a.mb = p.mb; continue; }
  for (let i = 0; i < 4; i++) {
    await sleep(1100);
    const r = await fetch(`https://musicbrainz.org/ws/2/release-group/${a.mbRgMbid}?inc=artist-credits&fmt=json`, { headers: { 'User-Agent': UA } });
    if (r.ok) { const j = await r.json(); a.mb = { title: j.title, type: j['primary-type'], sec: j['secondary-types'] || [], date: j['first-release-date'], credit: (j['artist-credit'] || []).map(c => c.name + (c.joinphrase || '')).join('') }; break; }
    if (r.status === 404) { a.mb = { error: 404 }; break; }
    await sleep(2000);
  }
  fs.writeFileSync(OUT, JSON.stringify(all.filter(x => x.mb), null, 1));
}
fs.writeFileSync(OUT, JSON.stringify(all, null, 1));
const flag = all.filter(a => !a.mb || a.mb.error || a.mb.type !== 'Album' || a.mb.sec.some(s => /Compilation|DJ-mix|Live|Remix|Soundtrack/.test(s)) || n(a.mb.title) !== n(a.album) || String(a.year) !== String(a.mb.date || '').slice(0, 4));
console.log('total', all.length, 'flags', flag.length);
for (const a of flag) console.log(`  ${a.group}${a.faction} ${a.artist}《${a.album}》${a.year} | MB: ${a.mb?.credit}《${a.mb?.title}》${a.mb?.type}${a.mb?.sec?.length ? '+' + a.mb.sec.join('+') : ''} ${a.mb?.date}`);
