// make-pool-list.mjs：從 pool5k 精選名單產 tools/pool-list.json（第 B 波 SPEC-B §1.4；2026-11-16）。
//
//   node game-lab/tools/make-pool-list.mjs <pool5k.json 路徑>
//
// pool-list.json＝精選 5,000 張裡「不在核心 368 張（cards.js）」的新卡，照 catalogId 排序：
//   { _meta: {source, rulings, generatedAt, count, …}, rows: [[藝人, 專輯, bin, region, thumbUrl, previewUrl], …] }
//   - 藝人／專輯＝seed_cards.json 原字串（bake --pool-only 用它找 seed 列、算三軸／曲風／年／頻率）。
//   - bin＝pool5k 的箱子 key（16 區）；region＝pool5k 的地區（主站／全卡池判法；bake 的 TW 正規式重算會有 185 張台灣卡對不上箱子規則，
//     所以一定要用這一欄；deck-lists `_region` 覆寫照樣套在它上面）。
//   - thumbUrl／previewUrl＝pool5k check.md 逐張驗過的小圖與 Apple 固定試聽（bake 不再打網路驗新卡）。
//   不存三軸、曲風、年、頻率：bake 時從 seed／card-moods 現算（seed 改了重烘就跟上）。
//
// 名單只能從 pool5k 工具重產（v5/pool5k/tools/select.mjs），重產後要重跑 pool5k/tools/check.mjs；不在 repo 手改這份。
// 核心 368 張（王牌、頂點試做、牌組、策展箱、特價箱…）照舊在 deck-lists.json → cards.js，不進這份（用 artist／album 算 catalogId 比，cards.js 鍵是舊 slug 或 catalogId 都行）。
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const require = createRequire(import.meta.url);
const OUT = path.join(HERE, 'pool-list.json');
const catalogId = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();

const src = process.argv[2];
if (!src || !fs.existsSync(src)) { console.error('用法：node game-lab/tools/make-pool-list.mjs <pool5k.json 路徑>'); process.exit(2); }
const P = JSON.parse(fs.readFileSync(src, 'utf8'));
const list = Array.isArray(P.cards) ? P.cards : null;
if (!list) { console.error(src + '：沒有 cards 陣列'); process.exit(1); }

const core = require(path.join(LAB, 'cards.js'));
const coreIds = new Set(Object.values(core).map(c => catalogId(c.artist, c.album)));
const BINS = ['jazz', 'tw', 'rock', 'elec', 'soul', 'hiphop', 'citypop', 'classical', 'world', 'folk', 'indierock', 'indiepop', 'blues', 'new', 'feature', 'picks'];
const REGIONS = ['tw', 'jp', 'zh', 'xx'];

const probs = [];
const seen = new Set();
const rows = [];
let inCore = 0;
for (const c of list) {
  const id = catalogId(c.artist, c.album);
  if (c.catalogId !== id) probs.push('CATALOG-ID ' + JSON.stringify(c.catalogId) + ' ≠ 由藝人／專輯算的 ' + JSON.stringify(id));
  if (coreIds.has(id)) { inCore++; continue; }
  if (seen.has(id)) { probs.push('DUP ' + id); continue; }
  seen.add(id);
  if (!BINS.includes(c.bin)) probs.push('BIN ' + id + ' = ' + c.bin);
  if (!REGIONS.includes(c.region)) probs.push('REGION ' + id + ' = ' + c.region);
  if (!/^https:\/\//.test(String(c.thumbUrl || ''))) probs.push('THUMB ' + id + ' = ' + c.thumbUrl);
  if (!/^https:\/\/audio-ssl\.itunes\.apple\.com\//.test(String(c.previewUrl || ''))) probs.push('PREVIEW ' + id + ' = ' + c.previewUrl);
  rows.push([c.artist, c.album, c.bin, c.region, c.thumbUrl, c.previewUrl]);
}
rows.sort((a, b) => { const x = catalogId(a[0], a[1]), y = catalogId(b[0], b[1]); return x < y ? -1 : x > y ? 1 : 0; });
if (probs.length) { console.error('PROBLEMS (' + probs.length + '):\n  ' + probs.slice(0, 40).join('\n  ')); console.error('pool-list.json NOT written.'); process.exit(1); }

const meta = {
  source: 'v5/pool5k select.mjs 2026-11-16（' + ((P._meta && P._meta.generatedAt) || '?') + '）',
  rulings: 'v5/pool5k/rulings.md（台灣下限 250、架上獨特比例不調、FEATURE 不額外優先硬蕊、硬蕊箱不開）；SPEC-B §1.4',
  tool: 'game-lab/tools/make-pool-list.mjs',
  fields: ['artist', 'album', 'bin', 'region', 'thumbUrl', 'previewUrl'],
  poolTotal: list.length,
  inCore,
  count: rows.length
};
const text = '{\n"_meta": ' + JSON.stringify(meta) + ',\n"rows": [\n' + rows.map(r => JSON.stringify(r)).join(',\n') + '\n]\n}\n';
fs.writeFileSync(OUT, text);
const byBin = {}; for (const r of rows) byBin[r[2]] = (byBin[r[2]] || 0) + 1;
console.log('wrote ' + path.relative(path.resolve(LAB, '..'), OUT) + '：' + rows.length + ' 張（名單 ' + list.length + '、已在核心 ' + inCore + '）');
console.log('  ' + BINS.map(k => k + ' ' + (byBin[k] || 0)).join('、'));
