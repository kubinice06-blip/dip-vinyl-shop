#!/usr/bin/env node
// 店內在售唱片的串流連結：查法與網站串流按鈕相同（shop-all.html／dip-player.js），結果寫進 data/shop/stream-links.json，
// 印刷卡左下角的 QR code 依 Spotify → Apple Music → YT Music → Bandcamp 的順序取第一個查得到的。
//   Spotify  ：worker /spotify-search 的 spotifyUrl，查不到再試 /spotify-album-link
//   Apple    ：data/apple-audio-runtime-v1.json（試聽索引）的專輯直連
//   YT Music ：worker /yt-music-link（只收專輯直連，不收搜尋頁）
//   Bandcamp ：worker /bandcamp-search 的 bandcampUrl
// 用法：node scripts/resolve-shop-stream-links.mjs [--refresh | --missing]
//   預設只補還沒查過的；--missing 重查 Spotify 沒查到的（一張一張慢慢查，避開 worker 上游限流）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(R, 'data/shop/stream-links.json');
const WORKER = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const REFRESH = process.argv.includes('--refresh');
const MISSING = process.argv.includes('--missing');

const inv = JSON.parse(fs.readFileSync(path.join(R, 'data/shop/inventory.json'), 'utf8'));
const descs = JSON.parse(fs.readFileSync(path.join(R, 'data/shop/descs.json'), 'utf8'));
const byKey = new Map(descs.items.map(i => [i.key, i]));
const byId = new Map(); descs.items.forEach(i => (i.ids || []).forEach(id => byId.set(id, i)));
const old = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { items: {} };

// 與 dip-player.js 的 normalizePreviewText／appleAlbumUrl 相同
const norm = v => String(v || '').normalize('NFKD').toLowerCase().replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9㐀-鿿぀-ヿᄀ-ᇿ㄰-㆏가-힯Ͱ-Ͽἀ-῿Ѐ-ԯ԰-֏֐-׿؀-ۿݐ-ݿऀ-ॿঀ-৿฀-๿຀-໿က-႟Ⴀ-ჿሀ-፿ក-៿]+/g, '');
const apple = JSON.parse(fs.readFileSync(path.join(R, 'data/apple-audio-runtime-v1.json'), 'utf8'));
const appleUrl = (artist, album) => {
  const hit = apple.entries?.[`${norm(artist)}\u0000${norm(album)}`];
  if (!Array.isArray(hit)) return null;
  const [sf, id, , slug] = hit;
  if (!/^[A-Z]{2}$/.test(String(sf || '')) || !/^\d+$/.test(String(id || '')) || !/^[^/?#\s]+$/.test(String(slug || ''))) return null;
  return `https://music.apple.com/${String(sf).toLowerCase()}/album/${slug}/${id}`;
};
const getJ = (p, a, b) => fetch(`${WORKER}/${p}?artist=${encodeURIComponent(a)}&album=${encodeURIComponent(b)}`, { signal: AbortSignal.timeout(15000) })
  .then(r => r.ok ? r.json() : {}).catch(() => ({}));
const okUrl = (u, re) => typeof u === 'string' && re.test(u) ? u : null;

const todo = inv.items.filter(i => i.status !== 'sold').map(i => ({ i, d: byId.get(i.id) || byKey.get(i.cardKey) })).filter(x => x.d);
const items = { ...old.items };
let n = 0;
async function one({ i, d }) {
  if (!REFRESH && items[i.id]?.checkedAt && !(MISSING && !items[i.id].spotify)) return;
  const prev = items[i.id] || {};
  const [sp, yt, bc] = await Promise.all([getJ('spotify-search', d.artist, d.album), getJ('yt-music-link', d.artist, d.album), getJ('bandcamp-search', d.artist, d.album)]);
  let spotify = okUrl(sp?.spotifyUrl, /^https:\/\/open\.spotify\.com\/album\//);
  if (!spotify) spotify = okUrl((await getJ('spotify-album-link', d.artist, d.album))?.url, /^https:\/\/open\.spotify\.com\/album\//);
  items[i.id] = {
    artist: d.artist, album: d.album,
    spotify: spotify || prev.spotify || null,
    apple: appleUrl(d.artist, d.album),
    yt: okUrl(yt?.url, /^https:\/\/music\.youtube\.com\/(playlist|browse)/) || prev.yt || null,
    bandcamp: okUrl(bc?.bandcampUrl, /^https:\/\/[^/]+\/album\//) || prev.bandcamp || null,
    checkedAt: new Date().toISOString().slice(0, 10),
  };
  // 人工核對過連錯專輯的平台記在 skip，重查也不再採用
  if (prev.skip?.length) { items[i.id].skip = prev.skip; for (const k of prev.skip) items[i.id][k] = null; }
  if (++n % 10 === 0) console.log(`  已查 ${n} 張`);
}
if (MISSING) for (const x of todo) { await one(x); await new Promise(r => setTimeout(r, 800)); }
else for (let k = 0; k < todo.length; k += 4) await Promise.all(todo.slice(k, k + 4).map(one));

const live = new Set(todo.map(x => x.i.id));
for (const id of Object.keys(items)) if (!live.has(id)) delete items[id];
fs.writeFileSync(OUT, JSON.stringify({ v: 1, note: '印刷卡 QR 用；順序 Spotify → Apple Music → YT Music → Bandcamp，由 scripts/resolve-shop-stream-links.mjs 產生', items }, null, 1) + '\n');
const vals = Object.values(items);
const pick = v => v.spotify ? 'spotify' : v.apple ? 'apple' : v.yt ? 'yt' : v.bandcamp ? 'bandcamp' : 'none';
const c = {}; vals.forEach(v => { const p = pick(v); c[p] = (c[p] || 0) + 1; });
console.log(`寫出 data/shop/stream-links.json：${vals.length} 張；QR 來源`, c);
