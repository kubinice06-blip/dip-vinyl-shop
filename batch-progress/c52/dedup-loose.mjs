// 鬆散去重：build-cand.mjs 當初用 `artist|album` 完全字串比對，漏掉了
// Duo Kribo《Duo Kribo》vs 池中《Duo Kribo (Original Soundtrack)》——同一張碟。
// §1 明文要求「除了 artist+album 完全相同，必須人工檢查：不同 artist-credit、
// 團名尾綴、Vol./Volume、重音符號、特殊符號、譯名」。這支就是那道檢查。
import fs from 'node:fs';
const seeds = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const cards = JSON.parse(fs.readFileSync('desc-tools/batches/cards/c52-cards.json', 'utf8'));

const strip = s => String(s || '')
  .replace(/[（(\[][^）)\]]*[）)\]]/g, ' ')        // 去掉括號內容（Original Soundtrack）
  .replace(/\b(original\s+)?soundtrack\b/gi, ' ')
  .replace(/\b(remaster(ed)?|reissue|deluxe|expanded|edition|anniversary)\b/gi, ' ')
  .replace(/\bvol(ume)?\.?\s*/gi, 'vol')            // Volume 4 / Vol. 4 / Vol 4
  .normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9㐀-鿿가-힯]/g, '');

const pool = seeds.map(r => ({ artist: r[0], album: r[1], year: r[6], na: strip(r[0]), nb: strip(r[1]) }));
let flags = 0;
for (const c of cards) {
  const na = strip(c.artist), nb = strip(c.album);
  for (const p of pool) {
    if (p.na !== na) continue;
    const same = p.nb === nb;
    const contains = nb.length > 3 && p.nb.length > 3 && (p.nb.includes(nb) || nb.includes(p.nb));
    if (!same && !contains) continue;
    flags++;
    console.log(`⚠ ${same ? '同碟' : '疑似同碟'}：c52《${c.album}》(${c.year}) ↔ 池中《${p.album}》(${p.year})｜${c.artist}`);
  }
}
// 同一藝人在池中的其他卡供對照（不算旗標）。Various Artists 跳過——
// 那個掛名底下有五十幾張合輯，全印出來只是噪音，對照價值是零。
console.log('\n— 同藝人在池中的其他卡（僅供對照）—');
const seenArtist = new Set();
for (const c of cards) {
  if (/^various artists$/i.test(c.artist) || seenArtist.has(c.artist)) continue;
  seenArtist.add(c.artist);
  const same = pool.filter(p => p.na === strip(c.artist));
  if (same.length) console.log(`  ${c.artist}：${same.map(p => `《${p.album}》${p.year}`).join('、')}`);
}
console.log(`\n旗標 ${flags}`);
process.exit(flags ? 1 : 0);
