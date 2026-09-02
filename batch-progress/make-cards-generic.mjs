// 從策展提案建卡單。用法：node batch-progress/make-cards-generic.mjs <批名> <組別...>
// 策展層把實查的 release-group MBID 記在 mbNote 裡，這裡抽出來當 rgMbid。
// 只抽「第一個」MBID——策展層被要求把對照組 MBID 另外標明，抽第一個才是主鍵。
import fs from 'node:fs';
import { lineOf } from './label-lines.mjs';
const [batch, ...groups] = process.argv.slice(2);
if (!batch || !groups.length) { console.error('用法: node make-cards-generic.mjs <批名> <組別...>'); process.exit(1); }
const MBID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
const isCJK = s => /[぀-ヿ㐀-鿿가-힯]/.test(s);
const cards = [];
for (const g of groups) {
  const p = `batch-progress/${batch}/prop-${g}.json`;
  for (const r of JSON.parse(fs.readFileSync(p, 'utf8'))) {
    // 策展層明寫 identitySource: 'manual' 時，一律尊重它，不從 mbNote 推導。
    // 2026-09-02（c-64）實測：人工身分卡的 mbNote 會在「查無」的舉證裡引用**藝人 MBID**
    // （「artist?query=… → 命中藝人實體 96be6ed7…」），這裡抽第一個 MBID 就會把一張
    // §1 人工身分卡默默變成釘在藝人條目上的假 pinned 卡，而且 §1 的全套舉證會整組掉光。
    // 這是 c-52 裁定第 1 條、c-55 那次 27 張的同一個病第三次出現，這次改在源頭擋掉。
    const manual = r.identitySource === 'manual';
    const id = manual ? '' : ((r.mbNote || '').match(MBID)?.[0] || '');
    cards.push({
      key: `${(isCJK(r.artist) || isCJK(r.album)) ? 'desc4' : 'desc2'}:${r.artist}|${r.album}`,
      artist: r.artist, album: r.album, year: r.year,
      genre: (r.genres || [])[0] || '', genres: r.genres || [], label: r.label || '',
      rgMbid: id, identitySource: (manual || !id) ? 'manual' : 'pinned',
      curatorWhy: r.why || '', curatorRisk: r.risk || '', mbNote: r.mbNote || '',
      releaseType: r.releaseType, exceptionReason: r.exceptionReason || '',
      exceptionEvidenceUrls: r.exceptionEvidenceUrls || [],
      selfTitled: !!r.selfTitled, apex: null, group: g,
      // 類型標示（2026-09-02 店主指示）：深掘／廣度＋場景，未來好分類。
      // 查表在 label-lines.mjs 的 LINES；新開批次要先在那裡登記。
      ...(lineOf(batch, g) || (() => { throw new Error(`${batch} 的組別 ${g} 尚未在 label-lines.mjs 的 LINES 登記類型`); })()),
      queryAlias: r.queryAlias || '', republic: r.republic || '', cover: null,
      // §1 人工身分路線的舉證欄位要一路帶到卡單，本機組 manifest 時直接取用。
      ...(manual || !id ? {
        mbAbsenceProof: r.mbAbsenceProof || null,
        manualEvidenceUrls: r.manualEvidenceUrls || [],
        manualRuling: r.manualRuling || '',
        coverSourceHint: r.coverSourceHint || '',
      } : {}),
    });
  }
}
const dup = cards.map(c => c.key).filter((k, i, a) => a.indexOf(k) !== i);
if (dup.length) throw new Error('重複鍵：' + dup.join(', '));
fs.writeFileSync(`desc-tools/batches/cards/${batch}-cards.json`, JSON.stringify(cards, null, 1));
console.log(`${batch}-cards.json：${cards.length} 張｜釘住 ${cards.filter(c => c.rgMbid).length}｜人工 ${cards.filter(c => !c.rgMbid).length}｜queryAlias ${cards.filter(c => c.queryAlias).length}｜重複鍵 0 ✓`);
