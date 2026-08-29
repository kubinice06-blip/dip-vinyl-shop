// 步驟 1（系列版）：目標是 MusicBrainz 的「release-group series」而不是整個廠牌時用這支。
// 為什麼需要這支：國家/官方廠牌（如 Polskie Nagrania "Muza"）的 label 目錄是**整個廠牌的全部
// 產出**——古典、搖滾、流行都混在一起，不是只有你要的那個子系列。若目標其實是廠牌底下一條
// 精選子系列（如「Polish Jazz」編號 1–80 那套），要查 MB 的 series 條目，不是 label 條目。
// 用法：node 1c-series-catalog.mjs "Polish Jazz" 輸出檔.json
import fs from 'fs';
const UA = { 'User-Agent': 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));

const seriesName = process.argv[2];
const outPath = process.argv[3];
if (!seriesName || !outPath) { console.error('用法: node 1c-series-catalog.mjs "<系列名>" 輸出檔.json'); process.exit(1); }

async function mb(path, tries = 3) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(`https://musicbrainz.org/ws/2/${path}`, { headers: UA });
    await sleep(1100);
    if (r.ok) return r.json();
    // 503 是 MusicBrainz 暫時過載，不是查詢本身有問題，重試即可，不要讓整支腳本掛掉
    if (r.status === 503 && i < tries - 1) { await sleep(2000); continue; }
    throw new Error(`MusicBrainz HTTP ${r.status}`);
  }
}

const search = await mb(`series/?query=${encodeURIComponent(seriesName)}&fmt=json&limit=5`);
const list = search.series || [];
if (!list.length) { console.error(`找不到系列「${seriesName}」`); process.exit(1); }
console.log('候選系列：');
list.forEach((s, i) => console.log(`  ${i === 0 ? '→' : ' '} ${s.name} | ${s.type} | ${s.id} | ${s.disambiguation || ''}`));
const series = list[0];
console.log(`\n採用第一筆：${series.name} (${series.id})\n`);

const detail = await mb(`series/${series.id}?fmt=json&inc=release-group-rels`);
// MusicBrainz 回傳的欄位是底線 release_group，不是連字號 release-group（踩過一次）
const items = (detail.relations || [])
  .filter(r => r.release_group)
  .map(r => ({ rg: r.release_group, order: r['ordering-key'] || 0 }))
  .sort((a, b) => a.order - b.order);
console.log(`系列內 release-group 數：${items.length}`);

const out = [];
for (const { rg } of items) {
  try {
    // release-group 本身沒有 artist-credit 欄位，需要另外查
    const full = await mb(`release-group/${rg.id}?fmt=json&inc=artist-credits`);
    const artist = (full['artist-credit'] || []).map(a => a.name).join(' & ') || '?';
    out.push({ artist, title: full.title, date: full['first-release-date'] || '', ids: [] });
    console.log(`  ${artist} - ${full.title}`);
  } catch (e) {
    console.log(`  ✗ 查詢失敗（${rg.title}）：${e.message} — 跳過，不中斷整批`);
  }
  // 每查完就存一次，中途若真的斷線也不會把已抓到的全部弄丟
  fs.writeFileSync(outPath, JSON.stringify(out, null, 1));
}
console.log(`\n共 ${out.length} 張 → ${outPath}`);
