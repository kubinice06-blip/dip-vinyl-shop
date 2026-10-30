// sf01 指定盤：build-manifest 不帶 genreException，這裡依卡單補上；批名改成開工日。
//   node batch-progress/add-20261030-sf01/patch-manifest.mjs <批>
import fs from 'node:fs';
const b = process.argv[2], F = `batch-progress/${b}/onboarding-manifest.json`;
const m = JSON.parse(fs.readFileSync(F, 'utf8'));
const cards = JSON.parse(fs.readFileSync(`desc-tools/batches/cards/${b}-cards.json`, 'utf8'));
const by = new Map(cards.map(c => [c.artist + '|' + c.album, c]));
m.batch = `2026-10-30-${b.replace(/^add-\d{8}-/, '')}`;
m.batchNote = `店主 Spotify 追蹤藝人補卡池（${b}）`;
let n = 0;
for (const a of m.albums) { const c = by.get(a.artist + '|' + a.album); if (c?.genreException) { a.identity.genreException = c.genreException; n++; } }
fs.writeFileSync(F, JSON.stringify(m, null, 1));
console.log(b, 'genreException', n, 'batch', m.batch);
