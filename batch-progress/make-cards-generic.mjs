// 從策展提案建卡單。用法：node batch-progress/make-cards-generic.mjs <批名> <組別...>
// 策展層把實查的 release-group MBID 記在 mbNote 裡，這裡抽出來當 rgMbid。
// 只抽「第一個」MBID——策展層被要求把對照組 MBID 另外標明，抽第一個才是主鍵。
import fs from 'node:fs';
const [batch, ...groups] = process.argv.slice(2);
if (!batch || !groups.length) { console.error('用法: node make-cards-generic.mjs <批名> <組別...>'); process.exit(1); }
const MBID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
const isCJK = s => /[぀-ヿ㐀-鿿가-힯]/.test(s);
const cards = [];
for (const g of groups) {
  const p = `batch-progress/${batch}/prop-${g}.json`;
  for (const r of JSON.parse(fs.readFileSync(p, 'utf8'))) {
    const id = (r.mbNote || '').match(MBID)?.[0] || '';
    cards.push({
      key: `${(isCJK(r.artist) || isCJK(r.album)) ? 'desc4' : 'desc2'}:${r.artist}|${r.album}`,
      artist: r.artist, album: r.album, year: r.year,
      genre: (r.genres || [])[0] || '', genres: r.genres || [], label: r.label || '',
      rgMbid: id, identitySource: id ? 'pinned' : 'manual',
      curatorWhy: r.why || '', curatorRisk: r.risk || '', mbNote: r.mbNote || '',
      releaseType: r.releaseType, exceptionReason: r.exceptionReason || '',
      exceptionEvidenceUrls: r.exceptionEvidenceUrls || [],
      selfTitled: !!r.selfTitled, apex: null, group: g,
      queryAlias: r.queryAlias || '', republic: r.republic || '', cover: null,
    });
  }
}
const dup = cards.map(c => c.key).filter((k, i, a) => a.indexOf(k) !== i);
if (dup.length) throw new Error('重複鍵：' + dup.join(', '));
fs.writeFileSync(`desc-tools/batches/cards/${batch}-cards.json`, JSON.stringify(cards, null, 1));
console.log(`${batch}-cards.json：${cards.length} 張｜釘住 ${cards.filter(c => c.rgMbid).length}｜人工 ${cards.filter(c => !c.rgMbid).length}｜queryAlias ${cards.filter(c => c.queryAlias).length}｜重複鍵 0 ✓`);
