import { getJSON } from './mb-c83b.mjs';
const q = process.argv[2], country = process.argv[3]||'gb', ent=process.argv[4]||'album';
const u = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&country=${country}&media=music&entity=${ent}&limit=25`;
const j = await getJSON(u);
for (const r of j.results||[]) console.log(`${r.collectionId} | ${r.artistName} | ${r.collectionName} | tc=${r.trackCount} | ${(r.releaseDate||'').slice(0,10)} | ${r.copyright||''}`);
console.log('count', j.resultCount);
