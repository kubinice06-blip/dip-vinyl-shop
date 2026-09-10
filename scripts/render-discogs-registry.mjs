// 把 data/discogs-cover-registry.json 產成人看的表：data/DISCOGS-COVERS.md
//
// 名單本身是 JSON（腳本要寫、驗證器要讀），但店主核可 §4 Discogs 來源時要的是
// 「日後能做管理」——所以另出一份可讀版，按批次分組、標明每張是靠哪些欄位比對到的、
// 人工看圖核對過沒有。改 reviewed 欄請改 JSON，這份是產出物。
//
// 用法：node scripts/render-discogs-registry.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'data', 'discogs-cover-registry.json');
const OUT = path.join(ROOT, 'data', 'DISCOGS-COVERS.md');

if (!fs.existsSync(SRC)) { console.error(`查無 ${SRC}`); process.exit(1); }
const reg = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const entries = reg.entries || [];

const byBatch = new Map();
for (const e of entries) {
  if (!byBatch.has(e.batch)) byBatch.set(e.batch, []);
  byBatch.get(e.batch).push(e);
}
const tally = { pending: 0, ok: 0, rejected: 0 };
for (const e of entries) tally[e.reviewed] = (tally[e.reviewed] || 0) + 1;

const esc = s => String(s ?? '').replace(/\|/g, '\\|');
const lines = [];
lines.push('# Discogs 封面名單');
lines.push('');
lines.push('> 這份是產出物，由 `node scripts/render-discogs-registry.mjs` 從');
lines.push('> `data/discogs-cover-registry.json` 產生。**要改狀態請改 JSON**，不要改這份。');
lines.push('');
lines.push(`共 **${entries.length}** 張走 ALBUM_ONBOARDING §4 的 \`discogs\` 封面來源`
  + `（待看圖 ${tally.pending || 0}、已核可 ${tally.ok || 0}、已退回 ${tally.rejected || 0}）。`);
lines.push(`最後更新：${reg.updatedAt || '—'}`);
lines.push('');
lines.push('**收錄規則**：藝人與盤名相符只是入場券，還要在年份／廠牌／目錄號裡至少對上兩項；');
lines.push('`matchedOn` 欄記的就是實際對上哪幾項。圖片沿用 Discogs 圖床網址，');
lines.push('那些網址帶簽名、可能失效——留著 release id 就是為了日後能整批重抓或改成自存。');
lines.push('');

for (const b of [...byBatch.keys()].sort((x, y) => String(x).localeCompare(String(y), 'en', { numeric: true }))) {
  const rows = byBatch.get(b);
  lines.push(`## ${b}（${rows.length} 張）`);
  lines.push('');
  lines.push('| 卡 | Discogs | 年 | 廠牌 | 目錄號 | 比對依據 | 核對 |');
  lines.push('|---|---|---:|---|---|---|---|');
  for (const e of rows.sort((p, q) => String(p.artist).localeCompare(String(q.artist)))) {
    lines.push(`| ${esc(e.artist)} 《${esc(e.album)}》 | [#${e.discogsReleaseId}](${e.discogsUrl}) `
      + `| ${e.year || '—'} | ${esc(e.label) || '—'} | ${esc(e.catno) || '—'} `
      + `| ${esc((e.matchedOn || []).join('、'))} | ${e.reviewed} |`);
  }
  lines.push('');
}

fs.writeFileSync(OUT, lines.join('\n'));
console.log(`${entries.length} 筆 → ${OUT}`);
