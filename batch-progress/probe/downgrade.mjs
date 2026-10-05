// 主線手動降級：探測層判 ready、事後證明是別張碟的條目 → status unavailable，留 downgradedBy／downgradeWhy（audits/preview-downgrades.md 照這兩欄列表）。
// 用法：node batch-progress/probe/downgrade.mjs '<藝人>|<盤名>' <裁定> '<理由>'
// ⚠ 不碰帶 recoveredBy 的條目（人工回撈是 never-delete 不變量）。
import fs from 'node:fs';
const [key, ruling, why] = process.argv.slice(2);
if (!key || !ruling || !why) { console.log('用法：node batch-progress/probe/downgrade.mjs <key> <裁定> <理由>'); process.exit(1); }
const P = 'batch-progress/probe/previews.json';
const db = JSON.parse(fs.readFileSync(P, 'utf8'));
const r = db[key];
if (!r) { console.log(`⚠ previews.json 沒有這個鍵：${key}`); process.exit(1); }
if (r.recoveredBy) { console.log(`⚠ 人工回撈條目（${r.recoveredBy}），不降級`); process.exit(1); }
if (r.status !== 'ready') { console.log(`已是 ${r.status}，不動`); process.exit(0); }
db[key] = { ...r, status: 'unavailable', previewUrl: null, downgradedBy: ruling, downgradeWhy: why };
fs.writeFileSync(P, JSON.stringify(db, null, 1) + '\n');
console.log(`✓ 降級 ${key}（原配 ${r.appleArtist}《${r.appleTitle}》${r.appleYear}）`);
