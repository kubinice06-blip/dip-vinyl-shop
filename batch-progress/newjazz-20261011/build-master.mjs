// 新世代爵士線：四組策展合併 → master.json（跨組去重、主線刪除、MB release-group 回查類型／標題／年份）。
//   node batch-progress/newjazz-20261011/build-master.mjs
import fs from 'node:fs';
const D = 'batch-progress/newjazz-20261011/';
const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const n = s => String(s || '').toLowerCase().replace(/[‐-―－]/g, '-').normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, '');
const GENRES = {
  'a:A': ['jazz'], 'a:B': ['jazz', 'world'], 'a:C': ['jazz'], 'a:D': ['jazz', 'electronic'], 'a:E': ['jazz'],
  'b:wc': ['jazz', 'soul'], 'b:hh': ['jazz', 'hiphop'], 'b:chi': ['jazz'], 'b:ny': ['jazz'], 'b:bb': ['jazz'], 'b:spi': ['jazz'], 'b:voc': ['jazz', 'soul'],
  'c:nordic': ['jazz'], 'c:poland': ['jazz'], 'c:dach': ['jazz'], 'c:france': ['jazz'], 'c:africa': ['jazz', 'world'], 'c:israel': ['jazz'], 'c:latam': ['jazz', 'world'], 'c:caau': ['jazz'],
  'd:jp-piano': ['jazz'], 'd:jp-band': ['jazz'], 'd:jp-club': ['jazz', 'electronic'], 'd:jp-intl': ['jazz'], 'd:jp-large': ['jazz'], 'd:kr': ['jazz'], 'd:sea': ['jazz', 'rock'],
};
// 主線刪除（newjazz-20261011/rulings.md 9342–9344）：老世代（1970–80 年代即成名）、偏 downtempo／neo-soul／post-rock／world、MB 查無
const DROP = [
  ['Django Bates', 'Saluting Sgt. Pepper'], ['Henry Threadgill Zooid', 'In for a Penny, In for a Pound'], ['Wadada Leo Smith', 'Ten Freedom Summers'],
  ['Maria Schneider Orchestra', 'The Thompson Fields'], ['Maria Schneider Orchestra', 'Data Lords'], ['Sun Ra Arkestra', 'Swirling'],
  ['Tomasz Stańko New York Quartet', 'Wisława'], ['Anouar Brahem', 'Blue Maqams'], ['Akira Sakata', 'Arashi'], ['Akira Sakata', 'Proton Pump'],
  ['高瀬アキ', 'So Long, Eric! Homage to Eric Dolphy'], ['Masabumi Kikuchi Trio', 'Sunrise'], ['Satoko Fujii Orchestra New York', 'Fukushima'],
  ['The Necks', 'Open'], ['The Necks', 'Body'],
  ['Ishmael Ensemble', 'Visions of Light'], ['mouse on the keys', 'The Flowers of Romance'], ['WONK', 'EYES'], ['박지하', 'Philos'],
  ['BIGYUKI', 'Reaching for Chiron'], ['Kyoto Jazz Massive', 'Message From a New Dawn'],
  ['Byron Wallen', 'Portrait: Reflections on Belonging'],
];
// 主線更正（9345）
const FIX = {};
const OUT = D + 'master.json';
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : [];
const prevBy = new Map(prev.map(x => [x.mbRgMbid, x]));
const all = [], seen = new Set(), dropped = [];
for (const g of ['a', 'b', 'c', 'd']) {
  const j = JSON.parse(fs.readFileSync(`${D}curation-${g}.json`, 'utf8'));
  const zh = Object.fromEntries(j.factions.map(f => [f.id, f.zh]));
  for (const a of j.albums) {
    const k = n(a.artist) + '|' + n(a.album);
    if (seen.has(k) || (a.mbRgMbid && seen.has(a.mbRgMbid))) continue;
    if (DROP.some(([x, y]) => n(x) === n(a.artist) && n(y) === n(a.album))) { dropped.push(`${a.artist}《${a.album}》`); continue; }
    seen.add(k); seen.add(a.mbRgMbid);
    Object.assign(a, FIX[a.mbRgMbid] || {});
    const genres = GENRES[`${g}:${a.faction}`];
    if (!genres) throw new Error(`沒有曲風對應 ${g}:${a.faction}`);
    all.push({ ...a, group: g, factionZh: zh[a.faction], genres });
  }
}
if (dropped.length !== DROP.length) throw new Error(`DROP 對不上 ${dropped.length}/${DROP.length}`);
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
console.log('total', all.length, 'dropped', dropped.length, 'flags', flag.length);
for (const a of flag) console.log(`  ${a.group}:${a.faction} ${a.artist}《${a.album}》${a.year} | MB: ${a.mb?.credit}《${a.mb?.title}》${a.mb?.type}${a.mb?.sec?.length ? '+' + a.mb.sec.join('+') : ''} ${a.mb?.date}`);
