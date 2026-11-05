// album_overrides 裡固定 m4a 的卡（後台路徑優先於靜態地圖），雲端寫不進去 → 產出重貼檔給店主到後台批次匯入。
// 用法：node batch-progress/preview-popular-20261105/make-repaste.mjs <overrides.json>
//   overrides.json：album_overrides 公開讀取的 [{id, url}]（id = "artist|album" 小寫）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { choose } from '../../scripts/popular-preview.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'dip-player.js'), 'utf8');
const norm = eval('(' + src.match(/function normalizePreviewText\(value\) \{[\s\S]*?\n  \}/)[0] + ')');
const key = (a, b) => `${norm(a)}\u0000${norm(b)}`;
const picks = JSON.parse(fs.readFileSync(path.join(HERE, 'picks.json'), 'utf8'));
const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
const seedById = new Map(seed.map(([a, b]) => [`${a}|${b}`.toLowerCase(), [a, b]]));
const overrides = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')).filter(o => o.url && /itunes\.apple\.com/.test(o.url));

const sleep = ms => new Promise(r => setTimeout(r, ms));
// 不在靜態地圖的：已用 iTunes search 找到 pinned 網址所屬的 collection（見 rulings.md）
const EXTRA = {
  'einstürzende neubauten|alles wieder offen': { store: 'US', collectionId: '264391243' },
  'julius hemphill|raw materials and residuals': { store: 'TW', collectionId: '318196296' },
  'tsuyoshi yamamoto trio|what a wonderful world': { store: 'TW', collectionId: '1740478076' },
};

const out = [], log = [];
for (const o of overrides) {
  const i = o.id.indexOf('|');
  const [artist, album] = seedById.get(o.id) || [o.id.slice(0, i), o.id.slice(i + 1)];
  let p = picks[key(o.id.slice(0, i), o.id.slice(i + 1))];
  if (!p && EXTRA[o.id]) {
    const { store, collectionId } = EXTRA[o.id];
    const look = await (await fetch(`https://itunes.apple.com/lookup?id=${collectionId}&entity=song&limit=200&country=${store}`)).json();
    const tracks = (look.results || []).filter(x => x.wrapperType === 'track' && x.previewUrl && String(x.collectionId) === collectionId)
      .map(x => ({ id: String(x.trackId), name: x.trackName, disc: x.discNumber || 1, n: x.trackNumber || 0, ms: x.trackTimeMillis || 0, url: x.previewUrl }));
    const dz = await (await import('../../scripts/popular-preview.mjs')).deezerFor?.({ artist, album });
    const r = choose({ tracks }, dz?.rows, null, o.url);
    if (r.track) p = { url: r.track.url, trackName: r.track.name, source: r.source };
    await sleep(800);
  }
  if (!p) { log.push(`保留（無對應 collection）：${artist} — ${album}`); continue; }
  if (p.url === o.url) { log.push(`不變：${artist} — ${album}`); continue; }
  out.push({ artist, album, previewUrl: p.url });
  log.push(`換：${artist} — ${album} → 〈${p.trackName}〉[${p.source}]`);
}
fs.writeFileSync(path.join(ROOT, 'album_overrides-repaste-preview-popular-20261105.json'), JSON.stringify(out, null, 2) + '\n');
fs.writeFileSync(path.join(HERE, 'repaste-log.txt'), log.join('\n') + '\n');
console.log(`repaste ${out.length}；不變 ${log.filter(l => l.startsWith('不變')).length}；保留 ${log.filter(l => l.startsWith('保留')).length}`);
