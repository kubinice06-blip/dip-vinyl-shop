// 合併研究稿＋hook 稿 → 寫作層輸入（facts 物件一律轉純字串，否則 QA blob 會壞）
// 用法：node merge-writer-input.mjs w2-022
import fs from 'node:fs';

const batch = process.argv[2];
if (!batch) { console.error('用法: node merge-writer-input.mjs w2-0XX'); process.exit(1); }
// 實際存在幾組就吃幾組（wave2 固定五組；dip-card-create 的小批可能只有 1–2 組）
const GROUPS = ['a', 'b', 'c', 'd', 'e']
  .filter(g => fs.existsSync(`batches/research/${batch}-${g}.json`));
if (!GROUPS.length) { console.error(`找不到任何研究稿：batches/research/${batch}-a..e.json`); process.exit(1); }

const merged = [];
for (const g of GROUPS) {
  let research = JSON.parse(fs.readFileSync(`batches/research/${batch}-${g}.json`, 'utf-8'));
  if (!Array.isArray(research)) research = Object.values(research); // 古典批研究檔是物件格式
  const hooks = JSON.parse(fs.readFileSync(`batches/hooks/${batch}-hooks-${g}.json`, 'utf-8'));
  const hmap = new Map(hooks.map(h => [h.key, h]));
  for (const r of research) {
    const h = hmap.get(r.key);
    if (!h) { console.error('缺 hook：', r.key); process.exit(1); }
    merged.push({
      key: r.key, artist: r.artist, album: r.album,
      hook: h.hook, note: h.note, status: r.status || 'full',
      facts: (r.facts || []).map(f => (typeof f === 'object' ? f.f : f)),
      sound: r.sound || '', keyTracks: r.keyTracks || [], researchNotes: r.notes || '',
    });
  }
}
// 切檔：預設依 a–e 五組對齊（writer-N 與 research/hooks 的第 N 組同一批卡），
// 這樣某組查出的更正必然落進對應的 writer-N 特注，不會像 054 那次錯置到別組。
// --split=2 可退回舊的二等分行為。
const splitArg = process.argv.find(a => a.startsWith('--split='));
const split = splitArg ? Number(splitArg.split('=')[1]) : GROUPS.length;
if (!Number.isInteger(split) || split < 1) { console.error('--split 必須是正整數'); process.exit(1); }

const parts = [];
const labels = [];
if (split === GROUPS.length) {
  let i = 0;
  for (const g of GROUPS) {
    // ⚠ 古典批的研究檔是**物件格式**（以 key 當物件鍵），對物件取 .length 會回 undefined，
    // 累計就變成 NaN、切檔必定失敗。上面讀 research 時已經有同一道判斷，這裡漏了。
    const raw = JSON.parse(fs.readFileSync(`batches/research/${batch}-${g}.json`, 'utf-8'));
    const n = Array.isArray(raw) ? raw.length : Object.keys(raw).length;
    parts.push(merged.slice(i, i + n));
    labels.push(g);
    i += n;
  }
  if (i !== merged.length) { console.error(`切檔長度不符：累計 ${i} vs 合併 ${merged.length}`); process.exit(1); }
} else {
  const size = Math.ceil(merged.length / split);
  for (let i = 0; i < split; i++) { parts.push(merged.slice(i * size, (i + 1) * size)); labels.push(''); }
}

// 清掉舊的 writer-*.json，避免改變組數後殘留上一次的檔案被下游誤讀
for (const f of fs.readdirSync('batches/input')) {
  if (new RegExp(`^${batch}-writer-\\d+\\.json$`).test(f)) fs.unlinkSync(`batches/input/${f}`);
}
parts.forEach((p, i) => fs.writeFileSync(`batches/input/${batch}-writer-${i + 1}.json`, JSON.stringify(p, null, 1)));
console.log(`合併完成｜共 ${merged.length} 張 → ` +
  parts.map((p, i) => `writer-${i + 1}${labels[i] ? `(${labels[i]})` : ''} ${p.length}`).join('／'));
