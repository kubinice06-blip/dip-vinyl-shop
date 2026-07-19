import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mapPath = path.join(root, 'data', 'apple-audio-map-v1.json');
const reportPath = path.join(root, 'data', 'apple-audio-map-report.json');
const args = new Map(process.argv.slice(2).map(value => {
  const [key, raw = 'true'] = value.replace(/^--/, '').split('=', 2);
  return [key, raw];
}));
const limit = Math.max(1, Number(args.get('limit') || 1000));
const delayMs = Math.max(3000, Number(args.get('delay-ms') || 4200));
const retry = args.has('retry');
const retryStatus = String(args.get('retry-status') || '');
const deep = args.has('deep');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const normalized = value => String(value || '').normalize('NFKD').toLowerCase()
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]+/g, '');
const hasCjk = value => /[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/.test(value || '');
const albumCore = value => normalized(String(value || '')
  .replace(/[\(\[\{][^\)\]\}]*(?:remaster(?:ed)?|deluxe|expanded|anniversary|reissue|edition|live)[^\)\]\}]*[\)\]\}]/gi, ' ')
  .replace(/\b(?:remaster(?:ed)?(?:\s+version)?|deluxe(?:\s+edition)?|expanded(?:\s+edition)?|anniversary(?:\s+edition)?|mono|stereo|reissue|edition|live)\b/gi, ' '));
const cardKey = ({ artist, album }) => `${normalized(artist)}\u0000${normalized(album)}`;
const stableRank = card => createHash('sha256').update(cardKey(card)).digest('hex');

function collaborationAlias(album) {
  const found = String(album || '').match(/^(.+?)\s+(?:with|feat\.?|featuring)\s+(.+)$/i);
  return found ? { title:found[1].trim(), guest:found[2].trim() } : null;
}

function artistScore(requested, candidate) {
  const wanted = normalized(requested), received = normalized(candidate);
  if (wanted.length > 2 && received.length > 2 && (received.includes(wanted) || wanted.includes(received))) return 45;
  // Apple TW occasionally localizes a Latin artist name to CJK. This remains safe only
  // together with a strong album-title match below.
  if (!hasCjk(requested) && hasCjk(candidate)) return 35;
  return 0;
}

function titleScore(requestedArtist, requestedAlbum, candidateArtist, candidateAlbum) {
  const requested = normalized(requestedAlbum), candidate = normalized(candidateAlbum);
  if (requested.length > 1 && requested === candidate) return 45;
  if (albumCore(requestedAlbum).length > 1 && albumCore(requestedAlbum) === albumCore(candidateAlbum)) return 42;
  const alias = collaborationAlias(requestedAlbum);
  if (!alias || albumCore(alias.title) !== albumCore(candidateAlbum)) return 0;
  const guest = normalized(alias.guest), candidateArtistKey = normalized(candidateArtist);
  return guest.length > 2 && candidateArtistKey.includes(guest) && artistScore(requestedArtist, candidateArtist) > 0 ? 40 : 0;
}

function rejectPenalty(requestedAlbum, item) {
  const text = `${item.collectionName || ''} ${item.artistName || ''}`.toLowerCase();
  if (/\b(?:karaoke|tribute|lullaby|cover version)\b/.test(text)) return 50;
  if (!/\blive\b/i.test(requestedAlbum || '') && /\blive\b/.test(text)
    && albumCore(requestedAlbum) !== albumCore(item.collectionName)) return 25;
  return 0;
}

function candidatesFrom(json, card) {
  const byCollection = new Map();
  for (const item of json?.results || []) {
    if (item.kind !== 'song' || !item.previewUrl || !item.collectionId) continue;
    const artist = artistScore(card.artist, item.artistName);
    const title = titleScore(card.artist, card.album, item.artistName, item.collectionName);
    const score = artist + title + 5 - rejectPenalty(card.album, item);
    if (!score) continue;
    const id = String(item.collectionId);
    const existing = byCollection.get(id) || {
      collectionId:id,
      artistName:item.artistName || '',
      collectionName:item.collectionName || '',
      previewTrackCount:0,
      previewUrl:item.previewUrl || '',
      score:0
    };
    existing.previewTrackCount++;
    if (score > existing.score) {
      existing.score = score;
      existing.artistName = item.artistName || '';
      existing.collectionName = item.collectionName || '';
      existing.previewUrl = item.previewUrl || '';
    }
    byCollection.set(id, existing);
  }
  return [...byCollection.values()].sort((a, b) => b.score - a.score || b.previewTrackCount - a.previewTrackCount);
}

function albumCandidatesFrom(json, card) {
  const candidates = [];
  for (const item of json?.results || []) {
    if (!item.collectionId || !item.collectionName) continue;
    const artist = artistScore(card.artist, item.artistName);
    const title = titleScore(card.artist, card.album, item.artistName, item.collectionName);
    const score = artist + title + 5 - rejectPenalty(card.album, item);
    if (score < 60) continue;
    candidates.push({
      collectionId:String(item.collectionId),
      artistName:item.artistName || '',
      collectionName:item.collectionName || '',
      score
    });
  }
  return candidates.sort((a, b) => b.score - a.score);
}

async function appleSearch(card, storefront) {
  const query = new URLSearchParams({
    term:`${card.artist} ${card.album}`,
    country:storefront,
    media:'music',
    entity:'song',
    limit:'50'
  });
  const signal = AbortSignal.timeout(15000);
  const response = await fetch(`https://itunes.apple.com/search?${query}`, { signal });
  if (!response.ok) throw new Error(`search-http-${response.status}`);
  return response.json();
}

async function appleAlbumSearch(card, storefront) {
  const query = new URLSearchParams({
    term:`${card.artist} ${card.album}`,
    country:storefront,
    media:'music',
    entity:'album',
    limit:'50'
  });
  const response = await fetch(`https://itunes.apple.com/search?${query}`, { signal:AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`album-search-http-${response.status}`);
  return response.json();
}

async function appleLookup(collectionId, storefront) {
  const query = new URLSearchParams({ id:String(collectionId), country:storefront, entity:'song' });
  const response = await fetch(`https://itunes.apple.com/lookup?${query}`, { signal:AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`lookup-http-${response.status}`);
  const json = await response.json();
  const previews = (json.results || []).filter(item => item.wrapperType === 'track' && item.previewUrl);
  return { previewTrackCount:previews.length, previewUrl:previews[0]?.previewUrl || '' };
}

async function resolveCard(card) {
  const notes = [];
  let bestOverall = null;
  let successfulSearches = 0;
  for (const storefront of ['TW', 'US']) {
    let json;
    try { json = await appleSearch(card, storefront); }
    catch (error) { notes.push(`${storefront}:${error.message}`); continue; }
    successfulSearches++;
    const candidates = candidatesFrom(json, card);
    const best = candidates[0];
    if (best?.score >= 85) return {
      status:'matched', storefront, ...best,
      matchedAt:new Date().toISOString()
    };
    if (best && (!bestOverall || best.score > bestOverall.score)) bestOverall = { storefront, ...best };
    if (best) notes.push(`${storefront}:best-${best.score}`);
  }
  if (deep) {
    for (const storefront of ['TW', 'US', 'JP', 'GB']) {
      let json;
      try { json = await appleAlbumSearch(card, storefront); }
      catch (error) { notes.push(`${storefront}:album-${error.message}`); continue; }
      successfulSearches++;
      const candidates = albumCandidatesFrom(json, card).slice(0, 3);
      for (const candidate of candidates) {
        let preview;
        try { preview = await appleLookup(candidate.collectionId, storefront); }
        catch (error) { notes.push(`${storefront}:lookup-${error.message}`); continue; }
        if (!preview.previewTrackCount) {
          notes.push(`${storefront}:album-${candidate.score}-no-preview`);
          continue;
        }
        const resolved = { storefront, source:'album-search', ...candidate, ...preview };
        if (resolved.score >= 85) return {
          status:'matched', ...resolved,
          matchedAt:new Date().toISOString()
        };
        if (!bestOverall || resolved.score > bestOverall.score) bestOverall = resolved;
      }
      if (candidates[0]) notes.push(`${storefront}:album-best-${candidates[0].score}`);
    }
  }
  if (!successfulSearches) return { status:'error', notes, checkedAt:new Date().toISOString() };
  if (!bestOverall || bestOverall.score < 60) return { status:'unavailable', notes, checkedAt:new Date().toISOString() };
  return { status:'review', notes, candidate:bestOverall, checkedAt:new Date().toISOString() };
}

async function readJson(file, fallback) {
  try { return JSON.parse(await fs.readFile(file, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return fallback; throw error; }
}

async function writeJson(file, value) {
  await fs.mkdir(path.dirname(file), { recursive:true });
  const temp = `${file}.tmp`;
  await fs.writeFile(temp, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  await fs.rename(temp, file);
}

const seed = await readJson(path.join(root, 'seed_cards.json'), []);
const apexByTier = await readJson(path.join(root, 'apex_pool.json'), {});
const cards = [
  ...seed.map(([artist, album]) => ({ artist, album, pool:'seed' })),
  ...Object.entries(apexByTier).flatMap(([tier, list]) => list.map(([artist, album]) => ({ artist, album, pool:`apex:${tier}` })))
].sort((a, b) => stableRank(a).localeCompare(stableRank(b)) || cardKey(a).localeCompare(cardKey(b)));
const uniqueCards = [...new Map(cards.map(card => [cardKey(card), card])).values()];

const map = await readJson(mapPath, { version:1, generatedAt:'', entries:{} });
map.entries ||= {};
const pending = uniqueCards.filter(card => {
  const prior = map.entries[cardKey(card)];
  return !prior || (retry && prior.status !== 'matched') || (retryStatus && prior.status === retryStatus);
}).slice(0, limit);

console.log(`Apple audio map: processing ${pending.length} of ${cards.length} cards (delay ${delayMs}ms)`);
let matched = 0, review = 0, unavailable = 0, errors = 0;
for (let index = 0; index < pending.length; index++) {
  const card = pending[index];
  const key = cardKey(card);
  const result = await resolveCard(card);
  map.entries[key] = { artist:card.artist, album:card.album, pool:card.pool, ...result };
  if (result.status === 'matched') matched++;
  else if (result.status === 'review') review++;
  else if (result.status === 'unavailable') unavailable++;
  else errors++;
  map.generatedAt = new Date().toISOString();
  await writeJson(mapPath, map);
  console.log(`${String(index + 1).padStart(4, ' ')}/${pending.length} ${result.status.padEnd(7)} ${card.artist} — ${card.album}${result.collectionId ? ` → ${result.collectionId}` : ''}`);
  if (index + 1 < pending.length) await sleep(delayMs);
}

const entries = Object.values(map.entries);
const summary = {
  version:1,
  generatedAt:new Date().toISOString(),
  catalogTotal:cards.length,
  uniqueCatalogTotal:uniqueCards.length,
  duplicateAliases:cards.length - uniqueCards.length,
  processedThisRun:pending.length,
  entries:entries.length,
  matched:entries.filter(entry => entry.status === 'matched').length,
  review:entries.filter(entry => entry.status === 'review').length,
  unavailable:entries.filter(entry => entry.status === 'unavailable').length,
  errors:entries.filter(entry => entry.status === 'error').length,
  run:{ matched, review, unavailable, errors }
};
await writeJson(reportPath, summary);
console.log(JSON.stringify(summary));
