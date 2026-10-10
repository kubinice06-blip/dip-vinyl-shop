#!/usr/bin/env node
// 複製自 kubinice06-blip/dip-vinyl-worker@adc3074 scripts/desc-gen/from_onboarding_manifest.mjs（2026-10-10，店主核可：雲端要能自己轉 KV bulk）。
// 兩邊改動要同步；以 worker repo 那份為原本。
// 將已通過 prepare gate 的 album onboarding manifest 轉成 Worker KV bulk 格式。
// 用法：node scripts/desc-gen/from_onboarding_manifest.mjs <manifest.json|-> [輸出.json|-]
import fs from 'node:fs';
import path from 'node:path';

const input = process.argv[2];
const output = process.argv[3] || (input === '-' ? '-' : (input ? input.replace(/\.json$/i, '-descriptions-kv.json') : ''));
if (!input) {
  console.error('用法: node scripts/desc-gen/from_onboarding_manifest.mjs <manifest.json|-> [輸出.json|-]');
  process.exit(1);
}

const manifest = JSON.parse(input === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(path.resolve(input), 'utf8'));
if (manifest?.schemaVersion !== 1 || !Array.isArray(manifest?.albums) || !manifest.albums.length) {
  throw new Error('不是有效的 album onboarding manifest');
}

const hasCJK = value => /[\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff\uac00-\ud7af]/.test(String(value || ''));
const seen = new Set();
const pairs = [];

for (const [index, row] of manifest.albums.entries()) {
  const artist = String(row?.artist || '').trim();
  const album = String(row?.album || '').trim();
  const desc = String(row?.description?.text || '').trim();
  if (!artist || !album || !desc) throw new Error(`albums[${index}] 缺 artist／album／description.text`);
  // CJK 卡要**同時**寫 desc2 與 desc4。/album-desc 的讀取順序是
  //   神作人工簡介 → desc2（CJK 專屬的 restyledFirst 分支）→ CURATED_DESCS → desc4，
  // 只寫 desc4 的話，凡是落在 CURATED_DESCS 那 75 筆過渡稿裡的卡，上架的簡介永遠被蓋掉
  // ——2026-09-01 的 c-51 published gate 抓到王菲《浮躁》與崔健《新长征路上的摇滚》兩張。
  // index.js 自己的註解就寫著「desc2 是產線成品，不分 CJK 一律最優先讀」。
  // desc4 照寫，當產線還沒寫到時的保底，兩者內容相同不會衝突。
  const cjk = hasCJK(artist) || hasCJK(album);
  for (const prefix of cjk ? ['desc2', 'desc4'] : ['desc2']) {
    const key = `${prefix}:${artist.toLowerCase()}|${album.toLowerCase()}`;
    if (seen.has(key)) throw new Error(`重複 KV key：${key}`);
    seen.add(key);
    pairs.push({ key, value: JSON.stringify({ desc }) });
  }
}

if (output === '-') process.stdout.write(JSON.stringify(pairs));
else {
  fs.writeFileSync(path.resolve(output), JSON.stringify(pairs));
  console.log(`寫出 ${pairs.length} 筆固定簡介 → ${path.resolve(output)}`);
}
