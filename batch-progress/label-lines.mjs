// 批次類型標示：替每張卡補 lineType（深掘／廣度）與 scene（場景標籤），未來好分類。
// 用法：node batch-progress/label-lines.mjs [--write]
// 2026-09-02 店主指示「記得標示類型 未來好分類」而建。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

// scene 可以是字串（整批同一個），也可以是 { 組別: 場景 }（一批分幾條線）。
export const LINES = {
  c52: { lineType: '廣度', scene: '東南亞' },
  c53: { lineType: '廣度', scene: { a: '蘇聯末期搖滾', b: '蘇聯吟遊歌謠與 estrada', c: '蘇聯爵士' } },
  c54: { lineType: '廣度', scene: '南斯拉夫地下搖滾' },
  c55: { lineType: '廣度', scene: '土耳其 Anadolu 與阿拉伯世界' },
  c56: { lineType: '廣度', scene: '捷克匈牙利與中東歐地下' },
  c57: { lineType: '廣度', scene: '牙買加' },
  c58: { lineType: '深掘', scene: '靈魂與放克' },
  c59: { lineType: '深掘', scene: '爵士' },
  c60: { lineType: '深掘', scene: { a: '北美私壓搖滾與迷幻', b: '歐日地下搖滾與迷幻' } },
  c61: { lineType: '深掘', scene: { a: '義大利與法國地下 prog', b: '北歐 progg 與荷比澳紐' } },
  // c-62 是單組（一位代理涵蓋 rebetiko／έντεχνο／地下三線），所以 scene 用單一字串。
  c62: { lineType: '廣度', scene: '希臘 rebetiko 與 έντεχνο' },
  c63: { lineType: '深掘', scene: { a: '民謠的冷門硬蕊', b: '藍調的冷門硬蕊' } },
};

// 給 make-cards-generic 用：查某批某組的類型標示。
export function lineOf(batch, group) {
  const def = LINES[batch];
  if (!def) return null;
  const scene = typeof def.scene === 'string' ? def.scene : (def.scene[group] || '');
  return scene ? { lineType: def.lineType, scene } : null;
}

// 直接執行才跑回填；被 import 時只提供 LINES 與 lineOf。
const RUN = process.argv[1] && process.argv[1].endsWith('label-lines.mjs');
const write = process.argv.includes('--write');
if (RUN) {
let touched = 0;
for (const [batch, def] of Object.entries(LINES)) {
  const f = path.join(ROOT, `desc-tools/batches/cards/${batch}-cards.json`);
  if (!fs.existsSync(f)) { console.log(`${batch}：查無卡單，略過`); continue; }
  const cards = JSON.parse(fs.readFileSync(f, 'utf8'));
  const seen = {};
  for (const c of cards) {
    const g = c.group || c.g || '';
    const scene = typeof def.scene === 'string' ? def.scene : (def.scene[g] || '');
    if (!scene) throw new Error(`${batch} 的組別 ${g} 沒有對應的 scene`);
    c.lineType = def.lineType;
    c.scene = scene;
    seen[`${def.lineType}／${scene}`] = (seen[`${def.lineType}／${scene}`] || 0) + 1;
  }
  if (write) fs.writeFileSync(f, JSON.stringify(cards, null, 1));
  touched += cards.length;
  console.log(`${batch}：${cards.length} 張｜` + Object.entries(seen).map(([k, n]) => `${k} ${n}`).join('、'));
}
console.log(`\n合計 ${touched} 張${write ? ' 已寫入' : '（試跑，加 --write 才寫入）'}`);
}
