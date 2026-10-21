// 薄細項策展線（ts）：策展各組合併 → master.json（跨組去重、主線刪除與更正、MB release-group 回查）。
//   node batch-progress/thin-sub-20261020/build-master.mjs a b c   → master-abc.json
// 人工身分卡（mbRgMbid 空、附 mbAbsenceProof）不查 MB，原樣保留。
import fs from 'node:fs';
const D = 'batch-progress/thin-sub-20261020/';
const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const n = s => String(s || '').toLowerCase().replace(/[‐-―－]/g, '-').normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, '');
const groups = process.argv.slice(2);
// 主線刪除與更正（逐筆寫理由進 rulings）
const ov = fs.existsSync(D + 'master-override.json') ? JSON.parse(fs.readFileSync(D + 'master-override.json', 'utf8')) : { drop: [], fix: {} };
const OUT = D + `master-${groups.join('')}.json`;
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : [];
const prevBy = new Map(prev.map(x => [x.artist + '|' + x.album, x]));
const all = [], seen = new Set();
for (const g of groups) {
  const j = JSON.parse(fs.readFileSync(`${D}curation-${g}.json`, 'utf8'));
  const zh = Object.fromEntries(j.factions.map(f => [f.id, f.zh]));
  for (const a0 of j.albums) {
    const a = { ...a0, ...(ov.fix[`${a0.artist}|${a0.album}`] || {}) };
    const k = n(a.artist) + '|' + n(a.album);
    if (seen.has(k) || (a.mbRgMbid && seen.has(a.mbRgMbid))) continue;
    if (ov.drop.some(([x, y]) => n(x) === n(a.artist) && n(y) === n(a.album))) continue;
    seen.add(k); if (a.mbRgMbid) seen.add(a.mbRgMbid);
    all.push({ ...a, group: g, factionZh: zh[a.faction] || a.faction });
  }
}
for (const a of all) {
  const p = prevBy.get(a.artist + '|' + a.album);
  if (!a.mbRgMbid) { a.mb = null; continue; }
  if (p?.mb && p.mbRgMbid === a.mbRgMbid) { a.mb = p.mb; continue; }
  for (let i = 0; i < 4; i++) {
    await sleep(1100);
    const r = await fetch(`https://musicbrainz.org/ws/2/release-group/${a.mbRgMbid}?inc=artist-credits&fmt=json`, { headers: { 'User-Agent': UA } });
    if (r.ok) { const j = await r.json(); a.mb = { title: j.title, type: j['primary-type'], sec: j['secondary-types'] || [], date: j['first-release-date'], credit: (j['artist-credit'] || []).map(c => c.name + (c.joinphrase || '')).join('') }; break; }
    if (r.status === 404) { a.mb = { error: 404 }; break; }
    await sleep(2000);
  }
  fs.writeFileSync(OUT, JSON.stringify(all, null, 1));
}
fs.writeFileSync(OUT, JSON.stringify(all, null, 1));
const man = all.filter(a => !a.mbRgMbid);
const flag = all.filter(a => a.mbRgMbid && (!a.mb || a.mb.error || (a.mb.type !== 'Album' && !(a.releaseException && a.mb.type === 'Album' || a.mb.sec.includes('Compilation'))) || (a.mb.sec.some(s => /DJ-mix|Remix|Soundtrack/.test(s))) || (a.mb.sec.includes('Compilation') && !a.releaseException) || n(a.mb.title) !== n(a.album) || String(a.year) !== String(a.mb.date || '').slice(0, 4)));
const badMan = man.filter(a => !a.mbAbsenceProof || (a.manualEvidenceUrls || []).filter(u => /^https:/.test(u)).length < 2);
console.log('total', all.length, '｜MB', all.length - man.length, '｜人工', man.length, '（舉證不足', badMan.length, '）｜flags', flag.length);
const byC = all.reduce((o, a) => (o[a.country] = (o[a.country] || 0) + 1, o), {}); console.log('地區', JSON.stringify(byC));
for (const a of flag) console.log(`  ⚑ ${a.group} ${a.artist}《${a.album}》${a.year} | MB: ${a.mb?.credit}《${a.mb?.title}》${a.mb?.type}${a.mb?.sec?.length ? '+' + a.mb.sec.join('+') : ''} ${a.mb?.date}`);
for (const a of badMan) console.log(`  ✗ 人工舉證不足 ${a.group} ${a.artist}《${a.album}》`);
