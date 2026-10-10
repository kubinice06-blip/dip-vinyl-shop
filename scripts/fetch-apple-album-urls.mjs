// 補齊試聽索引每張專輯的 Apple 正式專輯網址（collectionViewUrl，含名稱段）。
// 2026-10-01：串流按鈕用 /album/<id> 短網址時，網頁版靠 301 補名稱段，但 iOS Apple Music
// App 以 Universal Link 接手時不跟轉址，只會停在 App 首頁。正式網址只能從 lookup 取得。
// 用法：node scripts/fetch-apple-album-urls.mjs  （可重跑；已有 collectionViewUrl 的略過）
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mapPath = path.join(root, 'data', 'apple-audio-map-v1.json');
const BATCH = 150, PAUSE_MS = 3500;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const source = JSON.parse(await fs.readFile(mapPath, 'utf8'));
const pending = new Map();
for (const entry of Object.values(source.entries)) {
  if (entry?.status !== 'matched' || entry.collectionViewUrl || entry.collectionGone) continue;
  const storefront = String(entry.storefront || '').toUpperCase();
  if (!pending.has(storefront)) pending.set(storefront, []);
  pending.get(storefront).push(entry);
}

async function lookup(storefront, ids) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const response = await fetch(`https://itunes.apple.com/lookup?id=${ids.join(',')}&country=${storefront}&entity=album`);
      if (response.ok) return (await response.json()).results || [];
    } catch (_) {}
    await sleep(15000 * (attempt + 1));
  }
  throw new Error(`lookup failed: ${storefront} ${ids[0]}`);
}

let filled = 0, gone = 0;
for (const [storefront, entries] of pending) {
  for (let start = 0; start < entries.length; start += BATCH) {
    const chunk = entries.slice(start, start + BATCH);
    const ids = [...new Set(chunk.map(entry => String(entry.collectionId)))];
    const byId = new Map((await lookup(storefront, ids))
      .filter(item => item.wrapperType === 'collection' && item.collectionViewUrl)
      .map(item => [String(item.collectionId), item.collectionViewUrl.split('?')[0]]));
    for (const entry of chunk) {
      const url = byId.get(String(entry.collectionId));
      if (url) { entry.collectionViewUrl = url; filled++; }
      else { entry.collectionGone = new Date().toISOString(); gone++; }
    }
    await fs.writeFile(mapPath, JSON.stringify(source, null, 1), 'utf8');
    console.log(`${storefront} ${Math.min(start + BATCH, entries.length)}/${entries.length} filled=${filled} gone=${gone}`);
    await sleep(PAUSE_MS);
  }
}
console.log(JSON.stringify({ filled, gone }));
