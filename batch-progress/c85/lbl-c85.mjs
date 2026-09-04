import { mb } from './mb-c85.mjs';
const j = await mb(`label?query=${encodeURIComponent(process.argv[2])}&limit=15`);
for (const l of j.labels||[]) console.log([l.id, l.name, l.country||'-', l.disambiguation||'', (l['life-span']||{}).begin||''].join(' | '));
