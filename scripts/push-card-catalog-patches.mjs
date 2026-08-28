#!/usr/bin/env node
// 把 publish-manifest.mjs 產出的 card-catalog-patches.json 逐筆 PATCH 進 Firestore。
// 用法：node scripts/push-card-catalog-patches.mjs publish-stage/<批名>/card-catalog-patches.json [...]
//
// - PATCH 帶 updateMask，只動 payload 裡的欄位，不會蓋掉後台手動改過的其他欄位（§8 第 1 步）。
// - card_catalog 規則是「形狀驗證的公開寫入」（2026-08-16 資安健檢後的設計），
//   用網頁端同一把公開 API key 即可，不需要服務帳戶。
// - 冪等：重跑同一份 payload 結果相同。429/5xx 退避重試三次。
import fs from 'node:fs';

const FIRESTORE = process.env.DIP_ONBOARD_FIRESTORE_BASE
  || 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents';
const API_KEY = process.env.DIP_FIREBASE_API_KEY || 'AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg';
const CONCURRENCY = 6;

const files = process.argv.slice(2);
if (!files.length) {
  console.error('用法: node scripts/push-card-catalog-patches.mjs <card-catalog-patches.json> [...]');
  process.exit(1);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function patchOne(p) {
  const mask = p.updateMask.map(f => `updateMask.fieldPaths=${encodeURIComponent(f)}`).join('&');
  const url = `${FIRESTORE}/card_catalog/${encodeURIComponent(p.docId)}?${mask}&key=${API_KEY}`;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p.body), signal: AbortSignal.timeout(20000),
      });
      if (res.ok) return null;
      const text = (await res.text()).slice(0, 200);
      if ((res.status === 429 || res.status >= 500) && attempt < 4) { await sleep(1500 * attempt); continue; }
      return `${res.status} ${text}`;
    } catch (e) {
      if (attempt < 4) { await sleep(1500 * attempt); continue; }
      return String(e.message || e).slice(0, 200);
    }
  }
}

let grandOk = 0, grandFail = 0;
for (const file of files) {
  const patches = JSON.parse(fs.readFileSync(file, 'utf8'));
  let ok = 0; const fails = [];
  let cursor = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (cursor < patches.length) {
      const p = patches[cursor++];
      const err = await patchOne(p);
      if (err) fails.push([p.docId, err]); else ok++;
    }
  }));
  grandOk += ok; grandFail += fails.length;
  console.log(`${file}：成功 ${ok}／${patches.length}${fails.length ? `｜失敗 ${fails.length}` : ''}`);
  for (const [id, err] of fails) console.log(`   ✗ ${id}  ${err}`);
}
console.log(`\n合計 成功 ${grandOk}｜失敗 ${grandFail}`);
process.exit(grandFail ? 1 : 0);
