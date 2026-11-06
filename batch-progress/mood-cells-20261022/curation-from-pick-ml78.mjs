// Bandcamp 有鼓名單第三輪（ml78／ml79）：卡單 pick-*.json → curation-<組>.json（卡單即策展；主線汰換寫在 master-override-<組>.json 與 rulings）。
//   node batch-progress/mood-cells-20261022/curation-from-pick-ml78.mjs ml78 <mb.json>
import fs from 'node:fs';
const [g, mbFile] = process.argv.slice(2);
const mb = JSON.parse(fs.readFileSync(mbFile, 'utf8'));
const pick = JSON.parse(fs.readFileSync(`batch-progress/bandcamp-dt-20261105/pick-${g}.json`, 'utf8'));
const FIX = {
  'KUBA|Animalia': { artist: 'Kuba' },
  'OSS|Enter The Kettle': { album: 'Enter the Kettle', mbRgMbid: 'ce87a12c-3084-488d-a8d4-388a65678026', queryAlias: 'Enter the Kettle. (Classified as a Weapon)；OSS & The Orb', year: 2021 },
};
// §1 人工身分（MB 查無；Bandcamp 頁＋Apple collection 雙證）
const MAN = {
  'Marley Carroll|Sings': { apple: 1824096798, note: 'Apple《Sings》2013-12-03、12 首、℗ 2013 Melanaster Records；MB 藝人頁只有 Flight Patterns 等，無此盤' },
  'Sweatson Klank|Super Natural Delights': { apple: 1459382627, note: 'Apple《Super Natural Delights》2019-06-07、12 首、℗ 2019 Friends Of Friends；MB 藝人頁無此盤' },
  'Charlie North|The Spaces In Between': { apple: 274545227, note: 'Apple《The Spaces In Between》2008-02-08、8 首；MB 藝人頁無 release-group；ml73 研究已以 Bandcamp ld+json 核對' },
  'cehryl|You Win Some, You Lose A Lot': { apple: 1853436940, note: 'Apple 2025-11-07、24 首、℗ 2025 Pilot Study Records；MB 藝人頁（US）無此盤' },
  'Kaisaku|Aishū': { apple: 1455008021, note: 'Apple《Aishū》2019-03-16、10 首、℗ 2019 Kaisaku；MB 藝人頁無 release-group' },
  'Electronic Visions|Forest Language': { apple: 1767306233, note: 'Apple《Forest Language》2024-10-11、9 首、℗ 2024 Polychora Records（另有 2025 B-Sides EP，非本盤）；MB 藝人頁無此盤' },
};
const GEN = a => {
  const t = (a.bandcampTags || []).join(' ').toLowerCase();
  if (/hip-hop|hip hop|beats|boom bap|lo-fi hip|chillhop|jazzy/.test(t) && !/psybient|psydub/.test(t)) return ['hiphop', 'electronic'];
  if (/neo-soul|r&b/.test(t)) return ['soul', 'electronic'];
  if (/dream pop|shoegaze/.test(t)) return ['rock', 'electronic'];
  if (/indie rock|indie pop/.test(t)) return ['rock', 'electronic'];
  if (/^jazz|contemporary jazz|nu-jazz/.test(t) && /jazz/.test((a.bandcampTags || [])[0]?.toLowerCase() || '')) return ['jazz', 'electronic'];
  if (/reggae/.test(t) && /dub reggae|roots/.test(t)) return ['world', 'electronic'];
  return ['electronic'];
};
const FAC = a => {
  const t = (a.bandcampTags || []).join(' ').toLowerCase();
  if (/hip-hop|hip hop|beats|boom bap|chillhop|lo-fi hip/.test(t) && !/psybient|psydub/.test(t)) return 'beats';
  if (/neo-soul|r&b|soul/.test(t)) return 'soul';
  if (/synthwave|chillsynth|chillwave|vapor|cozywave/.test(t)) return 'synth';
  if (/psybient|psydub|psy dub|psychill|psychedelic/.test(t)) return 'psy';
  if (/dub/.test(t)) return 'dub';
  if (/dream pop|shoegaze|indie|pop/.test(t)) return 'vocal';
  return 'dt';
};
const factions = [
  { id: 'beats', zh: '器樂嘻哈／lo-fi beat（有鼓）' }, { id: 'soul', zh: 'neo-soul／nu-jazz 慢拍' }, { id: 'synth', zh: 'chillsynth／chillwave 霧聲' },
  { id: 'psy', zh: 'psybient／psydub 慢律動' }, { id: 'dub', zh: '暖 dub／dub downtempo' }, { id: 'vocal', zh: '人聲 downtempo／dream pop' }, { id: 'dt', zh: 'downtempo／trip-hop 慢拍' },
];
const albums = pick.map(p => {
  const k0 = p.artist + '|' + p.album; const fx = FIX[k0] || {};
  const m = mb[k0]; const albumHits = (m?.hits || []).filter(h => h.type !== 'Single');
  const h = albumHits[0];
  const man = MAN[k0];
  const rg = fx.mbRgMbid || (man ? '' : h?.id || '');
  const yr = fx.year || (h?.date ? Number(h.date.slice(0, 4)) : Number(p.year));
  return {
    artist: fx.artist || p.artist, album: fx.album || p.album, year: yr, label: '', country: '',
    faction: FAC(p), genres: GEN(p),
    why: `Bandcamp 有鼓名單第三輪（${p.source}${p.priorDrop ? '；前次：' + p.priorDrop : ''}），Last.fm 收聽 ${p.listeners} 人；${p.minutes} 分 ${p.tracks} 首；Bandcamp 標籤 ${(p.bandcampTags || []).join('、')}`,
    moodGuess: p.moodGuess ? { x: p.moodGuess.x, y: p.moodGuess.y, z: p.moodGuess.z, why: p.moodGuess.why } : null,
    evidence: [p.bandcampUrl, ...(rg ? [`https://musicbrainz.org/release-group/${rg}`] : [])].filter(Boolean),
    mbRgMbid: rg,
    mbAbsenceProof: man ? { queries: [`artist:"${p.artist}"（MB 藝人頁 release-group 瀏覽）`, `releasegroup:"${p.album}"`], checkedAt: '2026-11-06', conclusion: man.note } : null,
    manualEvidenceUrls: man ? [p.bandcampUrl, `https://music.apple.com/album/${man.apple}`] : [],
    releaseException: '', queryAlias: fx.queryAlias || '',
    uncertain: `moodGuess 為卡單粗估（只看 Bandcamp 標籤）；有鼓名單：研究層要寫清楚鼓是哪一種（慢拖無力／舞池推進／攻擊性）${p.priorDrop ? '；前次理由：' + p.priorDrop : ''}`,
    location: p.location || '', bandcampUrl: p.bandcampUrl, minutes: p.minutes, tracks: p.tracks, listeners: p.listeners, source: p.source, priorDrop: p.priorDrop || '',
  };
});
for (const f of factions) f.count = albums.filter(a => a.faction === f.id).length, f.why = '';
fs.writeFileSync(`batch-progress/mood-cells-20261022/curation-${g}.json`, JSON.stringify({ group: g, source: `batch-progress/bandcamp-dt-20261105/pick-${g}.json`, factions, albums, notes: ['卡單即策展結果（店主 2026-11-06「全都上架吧」）；主線汰換見 master-override 與 rulings'] }, null, 1));
console.log(g, albums.length, JSON.stringify(Object.fromEntries(factions.map(f => [f.id, f.count]))), '人工', albums.filter(a => !a.mbRgMbid).length);
