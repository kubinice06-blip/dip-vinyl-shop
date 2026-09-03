// 跨批去重（2026-09-02，c-65 發現）。
// `chk-prop` 只比對「線上池」與「批內跨組」，**不比對其他待上架的批次**——
// 這個縫隙讓 c-58／c-59／c-60 與 c-65 之間漏了 5 筆重複。
//
// 比對用的正規化要保留所有文字系統：第一版用 [^a-z0-9...] 過濾，
// 把西里爾與希臘文整個壓成空字串，於是 c-53 的 69 張與 c-62 的 38 張
// 彼此「全部撞卡」——誤報 76 筆。改用 \p{L}\p{N} 就對了。
//
// 用法：node batch-progress/dedup-crossbatch.mjs [批名...]（省略＝掃全部 c5x／c6x）
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

// 2026-09-03（c-73 策展層回報）：原本只掃 `desc-tools/batches/cards/*-cards.json`，
// 但**策展已定稿、卡單還沒建**的批次不在那裡——它們的候選只存在於
// `batch-progress/c<批>/prop-*.json`。二十批並行時這個縫隙比第 119 條那次更寬：
// c-73 交件時有六批處於「prop 有、cards 沒有」的狀態，等於六批彼此看不見。
// 現在兩種來源都掃：卡單優先（已建卡單的批次以卡單為準），沒有卡單才回退讀 prop。
const DIR = path.join(ROOT, 'desc-tools/batches/cards');
const PROP = path.join(ROOT, 'batch-progress');
const cardBatches = fs.readdirSync(DIR).filter(f => /^c\d+-cards\.json$/.test(f)).map(f => f.replace('-cards.json', ''));
const propBatches = fs.readdirSync(PROP, { withFileTypes: true })
  .filter(d => d.isDirectory() && /^c\d+$/.test(d.name))
  .filter(d => fs.readdirSync(path.join(PROP, d.name)).some(f => /^prop-[a-z]\.json$/.test(f)))
  .map(d => d.name);
const batches = process.argv.slice(2).length ? process.argv.slice(2)
  : [...new Set([...cardBatches, ...propBatches])].sort();

// 一個批次的候選：優先讀卡單，沒有就讀該批所有 prop-*.json。
const rowsOf = b => {
  const f = path.join(DIR, `${b}-cards.json`);
  if (fs.existsSync(f)) return { src: 'cards', rows: JSON.parse(fs.readFileSync(f, 'utf8')) };
  const d = path.join(PROP, b);
  if (!fs.existsSync(d)) return null;
  const props = fs.readdirSync(d).filter(x => /^prop-[a-z]\.json$/.test(x)).sort();
  if (!props.length) return null;
  return { src: 'prop', rows: props.flatMap(x => JSON.parse(fs.readFileSync(path.join(d, x), 'utf8'))) };
};

// 括號只在裡面**是再版裝飾詞**時才剝（2026-09-03）。原本無條件剝掉所有括號內容，
// 於是 Peter Gabriel 的《Peter Gabriel (Car)》與《Peter Gabriel (Security)》
// 雙雙變成 `petergabriel|petergabriel`，被判成撞卡——**括號裡正是區別兩張碟的東西**。
// 自我同名系列（Peter Gabriel 四張、Led Zeppelin、Weezer 的顏色盤）都是這個形狀。
const DECOR = /^\s*(\d{4}\s*)?(original\s+|digitally\s+)?(motion\s+picture\s+)?(remaster(ed)?|reissue|re-?issue|deluxe|expanded|edition|anniversary|version|mono|stereo|bonus\s+tracks?|sound\s*track|ost)\b/i;
const strip = s => String(s || '')
  .replace(/[（(\[]([^）)\]]*)[）)\]]/g, (m, inner) => DECOR.test(inner) ? ' ' : m)
  .replace(/\b(original\s+)?soundtrack\b/gi, ' ')
  .replace(/\b(remaster(ed)?|reissue|deluxe|expanded|edition|anniversary)\b/gi, ' ')
  .normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .toLowerCase()
  .replace(/[^\p{L}\p{N}]/gu, '');          // 保留所有文字系統，只丟標點與空白

const seen = new Map();
const dup = [];
let fromProp = 0;
for (const b of batches) {
  const got = rowsOf(b);
  if (!got) { console.log(`${b}：查無卡單也查無 prop，略過`); continue; }
  if (got.src === 'prop') fromProp++;
  for (const c of got.rows) {
    const k = strip(c.artist) + '|' + strip(c.album);
    if (seen.has(k)) dup.push({ b, c, prev: seen.get(k) });
    else seen.set(k, { b, c });
  }
}
for (const d of dup)
  console.log(`⚠ ${d.b} ${d.c.artist}《${d.c.album}》${d.c.year}  ←→  ${d.prev.b} ${d.prev.c.artist}《${d.prev.c.album}》${d.prev.c.year}`);
console.log(`\n${batches.length} 批（其中 ${fromProp} 批讀 prop）｜卡數 ${seen.size + dup.length}｜跨批撞卡 ${dup.length}`);
process.exit(dup.length ? 1 : 0);
