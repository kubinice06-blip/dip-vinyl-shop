// 補遺線第 4 堆：外國藝人掛在日本廠牌上的碟，哪些是「日本原盤」（全世界最早那一版在日本）。
//
// 主線第 2007-B 條：列舉層 `year` 是 RG 的最早年份、`labelYear` 是本廠牌那一版的年份，
// 兩者同年**不代表日本是原盤**——Victor／King 大量授權壓美國盤，同年上市。
// 這支逐筆打 MB `release-group/<id>?inc=releases`，看最早那一筆 release 的國別：
//   甲＝最早的 release 在 JP（且沒有同日期的非 JP release）→ 日本原盤；
//   乙＝最早的 release 不在 JP → 授權壓片，卡的身分歸原盤，不收；
//   不明＝MB release 都沒有日期／國別 → 策展層逐筆查 Discogs。
// 用法：node batch-progress/hoyi-foreign-origin.mjs [--recheck-yi]   （有快取，中斷後重跑會接續）
import fs from 'node:fs';
const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const d = 'batch-progress/enum/';
const OUT = d + 'hoyi-foreign-origin.json';
let cache = {}; try { cache = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch {}
const rgc = JSON.parse(fs.readFileSync(d + 'jp-1-rg-cache.json', 'utf8'));
const cnt = JSON.parse(fs.readFileSync(d + 'jp-artist-country.json', 'utf8'));
const norm = s => String(s || '').toLowerCase().normalize('NFKC').replace(/[&＆]/g, 'and').replace(/[^\p{L}\p{N}]+/gu, '');
const pool = new Set(), poolRg = new Set();
for (const r of JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'))) pool.add(norm(r[0]) + '|' + norm(r[1]));
for (const f of fs.readdirSync('desc-tools/batches/cards').filter(x => /-cards\.json$/.test(x)))
  for (const c of JSON.parse(fs.readFileSync('desc-tools/batches/cards/' + f, 'utf8'))) { pool.add(norm(c.artist) + '|' + norm(c.album)); if (c.rgMbid) poolRg.add(c.rgMbid); }
const JP1 = new Set(['jp-victor', 'jp-toshiba', 'jp-columbia', 'jp-king']);
const cands = []; const seen = new Set();
for (const f of fs.readdirSync(d).filter(x => /^jp-[a-z-]+\.json$/.test(x) && x !== 'jp-artist-country.json')) {
  const j = JSON.parse(fs.readFileSync(d + f, 'utf8')); const slug = f.replace('.json', '');
  for (const r of j.rows || []) {
    if (seen.has(r.rgMbid)) continue;
    let foreign;
    if (JP1.has(slug)) foreign = !!r.foreignArtist;
    else { const ids = rgc[r.rgMbid]?.artistIds || []; const cs = ids.map(i => cnt[i]).filter(Boolean).map(o => typeof o === 'string' ? o : o.country); foreign = cs.length > 0 && cs.every(c => c && c !== 'JP'); }
    if (!foreign || !r.year || r.year > 1989) continue;
    if (poolRg.has(r.rgMbid) || pool.has(norm(r.artist) + '|' + norm(r.album))) continue;
    seen.add(r.rgMbid); cands.push({ ...r, slug });
  }
}
let n = 0;
const RECHECK = process.argv.includes('--recheck-yi');   // 只重跑判乙的（修正上面那一形之後用）
for (const r of cands) {
  if (cache[r.rgMbid] && !(RECHECK && cache[r.rgMbid].verdict === '乙')) continue;
  n++;
  let rel = [];
  try {
    const res = await fetch(`https://musicbrainz.org/ws/2/release-group/${r.rgMbid}?inc=releases&fmt=json`, { headers: { 'User-Agent': UA } });
    if (res.ok) rel = ((await res.json()).releases || []).map(x => ({ date: x.date || '', country: x.country || '', title: x.title }));
  } catch {}
  const dated = rel.filter(x => x.date).sort((a, b) => a.date.localeCompare(b.date));
  let verdict = '不明', why = 'MB release 都沒有日期';
  if (dated.length) {
    const first = dated[0].date, same = dated.filter(x => x.date.slice(0, first.length) === first || x.date.startsWith(first.slice(0, 4)) && first.length === 4);
    const firstCs = [...new Set(dated.filter(x => x.date === first).map(x => x.country || '?'))];
    if (firstCs.length === 1 && firstCs[0] === 'JP') { verdict = '甲'; why = `最早 ${first} JP`; }
    else if (firstCs.includes('JP')) { verdict = '不明'; why = `最早 ${first} 同日有 ${firstCs.join('/')}`; }
    // c-196 a 第 7561 條：日期只填到年（或月）的外國版會排在同年有完整日期的日本版前面——
    // King 的西德 Bellaphon 代工版、Alfa 的荷蘭 Limetree 版都是這一形，其實是日本原盤的授權版。同年（同月）有 JP 就判不明。
    else if (first.length < 10 && dated.some(x => x.country === 'JP' && x.date.startsWith(first))) { verdict = '不明'; why = `最早 ${first} ${firstCs.join('/')}（只到${first.length === 4 ? '年' : '月'}），同${first.length === 4 ? '年' : '月'}有 JP`; }
    else if (firstCs.every(c => c === '?' || c === 'XW' || c === 'XE')) { verdict = '不明'; why = `最早 ${first} 國別 ${firstCs.join('/')}`; }
    else { verdict = '乙'; why = `最早 ${first} ${firstCs.join('/')}`; }
  }
  cache[r.rgMbid] = { artist: r.artist, album: r.album, year: r.year, slug: r.slug, verdict, why, nrel: rel.length };
  if (n % 20 === 0) { fs.writeFileSync(OUT, JSON.stringify(cache, null, 1)); process.stderr.write(`\r${n}/${cands.length}`); }
  await sleep(1100);
}
fs.writeFileSync(OUT, JSON.stringify(cache, null, 1));
const c = { 甲: 0, 乙: 0, 不明: 0 }; for (const r of cands) c[cache[r.rgMbid].verdict]++;
console.log(`\n候選 ${cands.length}｜甲（日本原盤）${c.甲}｜乙（授權壓片）${c.乙}｜不明 ${c.不明}`);
