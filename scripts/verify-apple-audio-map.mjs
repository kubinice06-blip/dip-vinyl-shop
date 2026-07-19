import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mapPath = path.join(root, 'data', 'apple-audio-map-v1.json');
const qualityPath = path.join(root, 'data', 'apple-audio-map-quality.json');
const args = new Map(process.argv.slice(2).map(value => {
  const [key, raw = 'true'] = value.replace(/^--/, '').split('=', 2);
  return [key, raw];
}));
const expected = Math.max(1, Number(args.get('expect') || 1000));
const sampleSize = Math.max(0, Number(args.get('sample') || 12));
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const normalized = value => String(value || '').normalize('NFKD').toLowerCase()
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]+/g, '');
const cardKey = ([artist, album]) => `${normalized(artist)}\u0000${normalized(album)}`;

const seed = JSON.parse(await fs.readFile(path.join(root, 'seed_cards.json'), 'utf8'));
const apexByTier = JSON.parse(await fs.readFile(path.join(root, 'apex_pool.json'), 'utf8'));
const catalog = [
  ...seed,
  ...Object.values(apexByTier).flat()
];
const uniqueCatalogKeys = new Set(catalog.map(cardKey));

const map = JSON.parse(await fs.readFile(mapPath, 'utf8'));
const entries = Object.values(map.entries || {});
const matched = entries.filter(entry => entry.status === 'matched');
const review = entries.filter(entry => entry.status === 'review');
const unavailable = entries.filter(entry => entry.status === 'unavailable');
const errors = entries.filter(entry => entry.status === 'error');
const structuralProblems = [];
const missingCatalog = [...uniqueCatalogKeys].filter(key => !map.entries?.[key]);

for (const entry of matched) {
  if (!/^\d+$/.test(String(entry.collectionId || ''))) structuralProblems.push(`${entry.artist} — ${entry.album}: collectionId`);
  if (!['TW', 'US'].includes(entry.storefront)) structuralProblems.push(`${entry.artist} — ${entry.album}: storefront`);
  if (Number(entry.score || 0) < 85) structuralProblems.push(`${entry.artist} — ${entry.album}: score`);
  if (Number(entry.previewTrackCount || 0) < 1) structuralProblems.push(`${entry.artist} — ${entry.album}: preview count`);
  try {
    const host = new URL(entry.previewUrl).hostname.toLowerCase();
    if (!host.endsWith('.itunes.apple.com')) structuralProblems.push(`${entry.artist} — ${entry.album}: preview host`);
  } catch (_) { structuralProblems.push(`${entry.artist} — ${entry.album}: preview url`); }
  if (/\b(?:karaoke|tribute|lullaby|cover version)\b/i.test(`${entry.artistName || ''} ${entry.collectionName || ''}`)) {
    structuralProblems.push(`${entry.artist} — ${entry.album}: suspicious edition`);
  }
}

const samples = [];
if (sampleSize && matched.length) {
  const picked = [...new Set(Array.from({ length:Math.min(sampleSize, matched.length) }, (_, index) =>
    matched[Math.floor(index * matched.length / Math.min(sampleSize, matched.length))]
  ))];
  for (const entry of picked) {
    try {
      const query = new URLSearchParams({ id:String(entry.collectionId), entity:'song', country:entry.storefront });
      const response = await fetch(`https://itunes.apple.com/lookup?${query}`, { signal:AbortSignal.timeout(15000) });
      const json = response.ok ? await response.json() : {};
      const previewCount = (json.results || []).filter(item => item.wrapperType === 'track' && item.previewUrl).length;
      samples.push({ artist:entry.artist, album:entry.album, collectionId:entry.collectionId, ok:response.ok && previewCount > 0, previewCount });
    } catch (error) {
      samples.push({ artist:entry.artist, album:entry.album, collectionId:entry.collectionId, ok:false, error:error.message });
    }
    await sleep(2000);
  }
}

const failedSamples = samples.filter(sample => !sample.ok);
const matchedRate = entries.length ? matched.length / entries.length : 0;
const errorRate = entries.length ? errors.length / entries.length : 1;
const passed = catalog.length >= expected && !missingCatalog.length && matchedRate >= 0.7 && errorRate <= 0.01 && !structuralProblems.length && !failedSamples.length;
const quality = {
  version:1,
  checkedAt:new Date().toISOString(),
  expected,
  catalogTotal:catalog.length,
  uniqueCatalogTotal:uniqueCatalogKeys.size,
  duplicateAliases:catalog.length - uniqueCatalogKeys.size,
  entries:entries.length,
  matched:matched.length,
  review:review.length,
  unavailable:unavailable.length,
  errors:errors.length,
  matchedRate:Number(matchedRate.toFixed(4)),
  errorRate:Number(errorRate.toFixed(4)),
  structuralProblems:structuralProblems.slice(0, 100),
  missingCatalog:missingCatalog.slice(0, 100),
  samples,
  passed
};
await fs.mkdir(path.dirname(qualityPath), { recursive:true });
await fs.writeFile(qualityPath, `${JSON.stringify(quality, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(quality, null, 2));
if (!passed) process.exitCode = 1;
