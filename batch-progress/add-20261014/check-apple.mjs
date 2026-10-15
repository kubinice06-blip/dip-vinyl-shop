import fs from 'node:fs';
const meta = JSON.parse(fs.readFileSync('batch-progress/add-20261014/meta.json', 'utf8'));
const n = s => String(s || '').toLowerCase().normalize('NFKC').replace(/\(.*?\)/g, '').replace(/[^\p{L}\p{N}]+/gu, '');
const P = { 'desc4:溫蒂漫步 Wendy Wander|Spring Spring': ['tw', '1814210280'], 'desc4:溫蒂漫步 Wendy Wander|Midnight Blue': ['tw', '1814210476'], 'desc2:Cigarettes After Sex|Cry': ['tw', '1476598231'], "desc2:Cigarettes After Sex|X's": ['tw', '1783182368'] };
for (const [k, [cc, id]] of Object.entries(P)) {
  await new Promise(r => setTimeout(r, 1800));
  const l = await (await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song&country=${cc}`)).json();
  const col = l.results.find(x => x.wrapperType === 'collection');
  const songs = l.results.filter(x => x.wrapperType === 'track').sort((a, b) => a.discNumber - b.discNumber || a.trackNumber - b.trackNumber);
  const mb = meta[k].mb.tracks;
  const hit = mb.filter((t, i) => songs[i] && n(songs[i].trackName) === n(t)).length;
  console.log(k, '→', col.artistName, '《' + col.collectionName + '》', col.releaseDate.slice(0, 10), col.collectionExplicitness, `順序逐軌相符 ${hit}/${mb.length}，Apple ${songs.length} 軌`);
  mb.forEach((t, i) => { if (!songs[i] || n(songs[i].trackName) !== n(t)) console.log('   ✗', i + 1, t, '≠', songs[i]?.trackName); });
}
