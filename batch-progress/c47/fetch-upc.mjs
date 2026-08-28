#!/usr/bin/env node
// 從 MB 的 release 撈 barcode 回填候選檔的 upc。
// 為什麼要做：本機 iTunes /search 被封鎖，試聽配對只能靠 UPC 直查（/lookup?upc=）
// 或已知 artistId 的目錄，而目前 172 張只有 53 張帶 UPC。UPC 越多、配對率越高。
// 挑法：同一 release-group 底下優先取「有條碼且國別為 US/GB/歐盟主要國」的 CD 版本
//（黑膠年代原盤多半無條碼，CD 再版才有；試聽本來就是配 Apple 的數位版）。
// 可續跑：已有 upc 的卡跳過。
import fs from 'node:fs';
const R = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop';
const UA = { 'User-Agent': 'dip-vinyl-onboarding/1.0 (kubinice06@gmail.com)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function mb(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(25000) });
      if (r.ok) return await r.json();
      if (r.status === 503) { await sleep(3500); continue; }
      return null;
    } catch { await sleep(3500 * (i + 1)); }
  }
  return null;
}

const P = `${R}/batch-progress/c47/cand-all.json`;
const all = JSON.parse(fs.readFileSync(P, 'utf8'));
const todo = all.filter(a => !a.upc && a.rgMbid);
console.log(`待補 UPC：${todo.length} 張\n`);
let got = 0;
for (const [i, a] of todo.entries()) {
  const j = await mb(`https://musicbrainz.org/ws/2/release?release-group=${a.rgMbid}&fmt=json&limit=50`);
  await sleep(1150);
  const rels = (j?.releases || []).filter(r => r.barcode && /^\d{8,14}$/.test(r.barcode));
  if (rels.length) {
    // 優先 US/GB/XE（歐盟），其次任何有條碼的；同分取日期最早
    const rank = r => (['US', 'GB', 'XE', 'XW'].includes(r.country) ? 0 : 1);
    rels.sort((x, y) => rank(x) - rank(y) || String(x.date || '9999').localeCompare(String(y.date || '9999')));
    a.upc = rels[0].barcode;
    a.upcNote = `MB release ${rels[0].id.slice(0, 8)}（${rels[0].country || '?'}, ${rels[0].date || '?'}）的 barcode`;
    got++;
  }
  if ((i + 1) % 20 === 0) { fs.writeFileSync(P, JSON.stringify(all, null, 1)); console.log(`  ${i + 1}/${todo.length}（取得 ${got}）`); }
}
fs.writeFileSync(P, JSON.stringify(all, null, 1));
console.log(`\n完成｜新增 UPC ${got}｜總計有 UPC ${all.filter(a => a.upc).length}/${all.length}`);
