// 本機一致性檢查：manifest 的 ready Apple preview.url 與 data/apple-audio-runtime-v1.json 第 3 欄是否一致
//（等同 verify-album-onboarding --published 的靜態試聽那一條，但不打網路）。
import fs from 'node:fs';
const src = fs.readFileSync('dip-player.js', 'utf8');
const norm = eval('(' + src.match(/function normalizePreviewText\(value\) \{[\s\S]*?\n  \}/)[0] + ')');
const rt = JSON.parse(fs.readFileSync('data/apple-audio-runtime-v1.json', 'utf8')).entries;
let rows = 0, mismatch = 0, noEntry = 0;
const bad = [];
for (const f of fs.readdirSync('.').filter(f => /^onboarding-manifest-.*\.json$/.test(f))) {
  const doc = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const a of doc.albums || []) {
    if (a.preview?.status !== 'ready' || !/itunes\.apple\.com/.test(a.preview.url || '')) continue;
    rows++;
    const e = rt[`${norm(a.artist)}\u0000${norm(a.album)}`];
    if (!e) { noEntry++; continue; }
    if (e[2] !== a.preview.url) { mismatch++; bad.push(`${f}: ${a.artist} — ${a.album}`); }
  }
}
console.log(JSON.stringify({ rows, mismatch, noEntry }));
if (process.argv[2]) fs.writeFileSync(process.argv[2], bad.join('\n') + '\n');
