#!/usr/bin/env node
// 這個環境能不能寫 Worker KV？REMOTE_RUNBOOK「KV」一節的前置檢查：exit 0 才可以寫，其他一律不寫。
//
//   node scripts/kv-token-check.mjs
//
// 做法：用 CLOUDFLARE_API_TOKEN 寫一個測試鍵 → 讀回 → 刪掉。只碰 `healthcheck:kv-write:*` 這個前綴，
// 不讀也不動任何產品資料。token 的值不會被印出來。
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const fail = why => { console.log(`✘ KV 不可寫：${why}`); process.exit(1); };
if (!TOKEN) fail('沒有設 CLOUDFLARE_API_TOKEN');

const key = `healthcheck:kv-write:${Date.now()}`;
const url = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}/values/${encodeURIComponent(key)}`;
const H = { Authorization: `Bearer ${TOKEN}` };
const value = `ok ${new Date().toISOString()}`;
const sleep = ms => new Promise(r => setTimeout(r, ms));

try {
  const put = await fetch(url, { method: 'PUT', headers: { ...H, 'Content-Type': 'text/plain' }, body: value, signal: AbortSignal.timeout(20000) });
  if (!put.ok) fail(`寫入回 HTTP ${put.status}（${put.status === 403 || put.status === 401 ? 'token 沒有 KV 的 Edit 權限' : '見 Cloudflare 狀態'}）`);
  // 寫入後短時間內讀取可能還沒到，最多等三次
  let got = null;
  for (let i = 0; i < 3 && got !== value; i++) {
    if (i) await sleep(4000);
    const r = await fetch(url, { headers: H, signal: AbortSignal.timeout(20000) });
    got = r.ok ? await r.text() : null;
  }
  const del = await fetch(url, { method: 'DELETE', headers: H, signal: AbortSignal.timeout(20000) });
  if (got !== value) fail('寫得進去但讀回不一致');
  if (!del.ok) console.log(`（測試鍵 ${key} 沒刪掉，HTTP ${del.status}；不影響結果）`);
  console.log('✓ KV 可寫（測試鍵已寫入、讀回、刪除）');
} catch (e) {
  fail(`連不到 Cloudflare API（${e.name}）`);
}
