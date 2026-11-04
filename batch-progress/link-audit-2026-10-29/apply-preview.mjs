// 套用 fix-plan.json 的試聽修正到 data/apple-audio-map-v1.json（2026-11-04 店主「可以」）。
// 前提檢查：現值（店面／collectionId／previewUrl）等於稽核時的 old 才改；promote 要求現況仍是 review。
// mapPatch 的 null 表示刪掉該欄。改完另跑 scripts/build-apple-audio-runtime-map.mjs 重建 runtime。
import fs from 'node:fs';
const MAP = 'data/apple-audio-map-v1.json', PLAN = 'batch-progress/link-audit-2026-10-29/fix-plan.json';
const doc = JSON.parse(fs.readFileSync(MAP, 'utf8')), plan = JSON.parse(fs.readFileSync(PLAN, 'utf8'));
const rep = { applied: {}, skipped: [] }, now = new Date().toISOString();
for (const x of plan.preview) {
  const e = doc.entries[x.mapKey];
  if (!e) { rep.skipped.push([x.mapKey, '卡已不在 map']); continue; }
  const ok = x.action === 'promote' ? e.status === 'review'
    : x.old && e.storefront === x.old[0] && String(e.collectionId) === String(x.old[1]) && e.previewUrl === x.old[2];
  if (!ok) { rep.skipped.push([x.mapKey, '現值與稽核時不同', e.status, e.collectionId]); continue; }
  for (const [k, v] of Object.entries(x.mapPatch || {})) { if (v === null) delete e[k]; else e[k] = v; }
  e.linkAudit = `2026-10-29 連結稽核 ${x.action}：${x.reason || ''}`.slice(0, 200);
  e.checkedAt = now;
  rep.applied[x.action] = (rep.applied[x.action] || 0) + 1;
}
fs.writeFileSync(MAP, JSON.stringify(doc, null, 1));
fs.writeFileSync('batch-progress/link-audit-2026-10-29/apply-preview-report.json', JSON.stringify(rep, null, 1));
console.log(JSON.stringify(rep.applied), 'skipped', rep.skipped.length, JSON.stringify(rep.skipped.slice(0, 8)));
