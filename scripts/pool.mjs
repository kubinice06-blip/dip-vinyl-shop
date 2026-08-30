// 單一卡池檔的共用讀寫。2026-08-30 起 seed_cards.json 是**唯一**的卡池來源，
// apex_pool.json 已刪除——頂級牌只是多了一個 tier 欄的普通列。
//
// 為什麼要合併（店主 2026-08-30 裁定）：兩個檔的**列形狀不一樣**，apex 列沒有三軸，
// 所以「降級成一般卡」不是搬一列，得回頭去 Firestore 撈三軸才組得出 seed 列；
// 同一張卡還可能兩邊都在（gate 有一條專門擋這個）；曲風欄在兩邊是不同索引
// （seed 第 6 欄／apex 第 3 欄）；上架時要分岔成 seedCards XOR apexPool。
//
// 每一列：
//   [0] artist        [1] album
//   [2] classic       [3] obscurity   [4] accessibility     ← 三軸 1–5
//   [5] genres[]      ← 音樂地圖曲風 id 陣列（缺這欄，首頁「類型挑片」抽不到）
//   [6] year
//   [7] composer      ← 古典專用，沒有就是 null
//   [8] tier          ← 'hall' | 'pearl' | 'heresy'，一般卡沒有這欄（undefined）
//
// 前 8 欄與舊格式完全一致，所以任何用 row[0]..row[7] 取值的舊程式都不受影響；
// **唯一必改的是「把 seed 當一般卡池」的地方**——現在得濾掉有 tier 的列。
import fs from 'node:fs';
import path from 'node:path';

export const TIERS = ['hall', 'pearl', 'heresy'];
export const tierOf = row => row[8] || null;
export const isApex = row => !!row[8];

export function poolPath(root) { return path.join(root, 'seed_cards.json'); }

/**
 * 讀卡池。回傳：
 *   rows  — 原始全部列（含頂級牌）
 *   cards — 一般卡（沒有 tier 的列）
 *   apex  — { hall: [[artist, album, genres, year]], … } 舊結構，給還沒改的呼叫端用
 */
export function loadPool(root) {
  const rows = JSON.parse(fs.readFileSync(poolPath(root), 'utf8'));
  const cards = rows.filter(r => !isApex(r));
  const apex = { hall: [], pearl: [], heresy: [] };
  for (const r of rows) { const t = tierOf(r); if (t && apex[t]) apex[t].push([r[0], r[1], r[5], r[6]]); }
  return { rows, cards, apex };
}

/**
 * 寫回卡池。**一定要用這支**——seed_cards.json 是「一列一行」的自訂排版，
 * 直接 JSON.stringify(rows, null, 2) 會把 12,900 列炸成十幾萬行、diff 完全不能看。
 * 尾端不留換行（與既有檔案一致）。
 */
export function savePool(root, rows) {
  fs.writeFileSync(poolPath(root), JSON.stringify(rows).replace(/\],\[/g, '],\n['));
}

/** 正規化比對鍵，與前後台一致（小寫、空白收斂） */
export const keyOf = (artist, album) =>
  String(artist || '').toLowerCase().replace(/\s+/g, ' ').trim() + '|' +
  String(album || '').toLowerCase().replace(/\s+/g, ' ').trim();
