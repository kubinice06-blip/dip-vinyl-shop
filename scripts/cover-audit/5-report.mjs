// 卡池封面稽核 步驟 5：把 suspects.json 整理成人看的報告（Markdown）。
// 用法：node scripts/cover-audit/5-report.mjs
// 產出：scripts/cover-audit/REPORT.md
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'scripts', 'cover-audit');
const OUT = path.join(DIR, 'data');
const rows = JSON.parse(fs.readFileSync(path.join(OUT, 'suspects.json'), 'utf8'));
const stats = JSON.parse(fs.readFileSync(path.join(OUT, 'scan-stats.json'), 'utf8'));

const byLevel = l => rows.filter(r => r.level === l);
const table = rs => [
  '| 藝人 | 卡池專輯 | 卡年 | Spotify 實際專輯 | 型別／發行 | 判定 |',
  '| --- | --- | --- | --- | --- | --- |',
  ...rs.map(r => `| ${r.artist} | ${r.album} | ${r.year ?? ''} | ${r.spotifyName} | ${r.albumType} ${r.releaseDate} | ${r.flags} |`)
].join('\n');

const md = `# 卡池封面配對稽核報告

掃描日期：${new Date().toISOString().slice(0, 10)}
資料來源：\`seed_cards.json\` + \`apex_pool.json\` 全卡池，經 worker \`/spotify-search\` 配對後，
以 Spotify \`/v1/albums/{id}\` 取回「Spotify 那一端的真實專輯」再比對。

## 規模

| 分類 | 張數 |
| --- | --- |
| 已掃描卡片 | ${stats.total} |
| 查無此碟（無封面，非配錯） | ${stats.noCover} |
| Cover Art Archive 補救層接手 | ${stats.caa} |
| 有圖但無 Spotify 連結 | ${stats.noSpotify} |
| 缺 Spotify 中繼資料（未抓完） | ${stats.noMeta} |
| **實際完成比對** | **${stats.ok + rows.length}** |
| 　├ 判定通過 | ${stats.ok} |
| 　├ A 高度可疑 | ${stats.A} |
| 　├ B 中度可疑 | ${stats.B} |
| 　└ C 參考 | ${stats.C} |

A＋B 佔已比對卡片的 ${(((stats.A + stats.B) / Math.max(1, stats.ok + rows.length)) * 100).toFixed(2)}%。

## A 級：高度可疑（${stats.A} 張）

${table(byLevel('A'))}

## B 級：中度可疑（${stats.B} 張）

${table(byLevel('B'))}

## C 級：參考（${stats.C} 張）

名稱吻合但年份或型別對不上，多半是重發盤的中繼資料差異，封面通常仍正確。

${table(byLevel('C'))}
`;
fs.writeFileSync(path.join(DIR, 'REPORT.md'), md);
console.log(`已寫 ${path.join(DIR, 'REPORT.md')}｜A ${stats.A}｜B ${stats.B}｜C ${stats.C}`);
