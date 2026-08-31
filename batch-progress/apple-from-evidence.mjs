// 從策展檔的證據網址裡撈 Apple 專輯 ID，再用 /lookup 補封面與試聽。
//
// 華語老唱片在 CAA、Spotify、Bandcamp 與 iTunes /search 全都撈不到，但雲端策展時
// 為了證明「這張碟真的存在」，已經把 Apple Music 的專輯頁網址寫進
// exceptionEvidenceUrls／manualEvidenceUrls。那串網址尾巴就是 collectionId，
// /lookup?id=<collectionId> 是本機一直可用的路徑（不受 /search 影響），
// 一次就能拿到 artworkUrl100 與整碟曲目的 previewUrl。
//
// 用法：node batch-progress/apple-from-evidence.mjs <批名> [--write]
import fs from 'node:fs';

const ROOT = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop';
const batch = process.argv[2];
const WRITE = process.argv.includes('--write');
if (!batch) { console.error('用法: node batch-progress/apple-from-evidence.mjs <批名> [--write]'); process.exit(1); }

const dir = `${ROOT}/batch-progress/${batch}`;
const covers = JSON.parse(fs.readFileSync(`${dir}/covers.json`, 'utf8'));
const prevPath = `${dir}/previews.json`;
const previews = fs.existsSync(prevPath) ? JSON.parse(fs.readFileSync(prevPath, 'utf8')) : {};
const sleep = ms => new Promise(r => setTimeout(r, ms));

// 把所有策展檔攤平成 artist|album → 該筆，好撈證據網址
const curated = new Map();
for (const f of fs.readdirSync(dir).filter(x => /^cand-.*\.json$/.test(x) && x !== 'cand-all.json')) {
  const j = JSON.parse(fs.readFileSync(`${dir}/${f}`, 'utf8'));
  const arr = Array.isArray(j) ? j : (j.albums || j.cards || Object.values(j).find(Array.isArray) || []);
  for (const r of arr) curated.set(`${r.artist}|${r.album}`, r);
}
const curDir = `${dir}/curation`;
if (fs.existsSync(curDir)) {
  for (const f of fs.readdirSync(curDir)) {
    const j = JSON.parse(fs.readFileSync(`${curDir}/${f}`, 'utf8'));
    const arr = Array.isArray(j) ? j : (j.albums || Object.values(j).find(Array.isArray) || []);
    for (const r of arr) if (!curated.has(`${r.artist}|${r.album}`)) curated.set(`${r.artist}|${r.album}`, r);
  }
}

// music.apple.com/<地區>/album/<slug>/<id> 或 …/album/<id>；也吃 ?i= 的單曲參數之前那段
const appleId = url => {
  const m = String(url).match(/music\.apple\.com\/[^/]+\/album\/(?:[^/]+\/)?(\d{5,})/);
  return m ? m[1] : null;
};

async function lookup(id) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song&country=tw&limit=60`,
        { signal: AbortSignal.timeout(25000) });
      if (r.ok) return await r.json();
    } catch { /* retry */ }
    await sleep(1500 * (i + 1));
  }
  return null;
}

const miss = covers.filter(c => !c.cover);
console.log(`${batch}｜缺封面 ${miss.length}`);
let gotCover = 0, gotPrev = 0, noEvidence = 0;
for (const row of miss) {
  const cur = curated.get(`${row.artist}|${row.album}`);
  const urls = [...(cur?.exceptionEvidenceUrls || []), ...(cur?.manualEvidenceUrls || []), ...(cur?.apexCandidate?.evidenceUrls || [])];
  const id = urls.map(appleId).find(Boolean);
  if (!id) { noEvidence++; continue; }

  const j = await lookup(id);
  const col = (j?.results || []).find(r => r.wrapperType === 'collection');
  if (!col) { await sleep(400); continue; }

  const art = String(col.artworkUrl100 || '').replace(/\/\d+x\d+bb\.(jpg|png)$/, '/600x600bb.$1');
  if (art) {
    row.cover = { url: art, source: 'manual', note: `apple lookup ${id}：${col.artistName} — ${col.collectionName}` };
    row.itunes = { collectionId: col.collectionId, collectionName: col.collectionName, artistName: col.artistName };
    gotCover++;
  }
  const k = `${row.artist}|${row.album}`;
  if (!previews[k] || previews[k].status !== 'ready') {
    const songs = (j?.results || []).filter(r => r.wrapperType === 'track' && r.previewUrl)
      .sort((a, b) => (a.trackNumber || 99) - (b.trackNumber || 99));
    if (songs.length) {
      previews[k] = {
        status: 'ready', source: 'apple', storefront: 'TW', url: songs[0].previewUrl,
        appleCollectionId: String(col.collectionId), appleCollectionName: col.collectionName,
        appleArtistName: col.artistName, firstTrack: songs[0].trackName,
        explicitness: songs[0].trackExplicitness || '', matchedVia: 'evidence-url',
      };
      gotPrev++;
    }
  }
  await sleep(400);
}
console.log(`補到封面 ${gotCover}｜順便補到試聽 ${gotPrev}｜證據網址裡沒有 Apple 連結 ${noEvidence}`);
if (WRITE) {
  fs.writeFileSync(`${dir}/covers.json`, JSON.stringify(covers, null, 1));
  fs.writeFileSync(prevPath, JSON.stringify(previews, null, 1));
  console.log('已寫回 covers.json 與 previews.json');
} else console.log('（乾跑）');
covers.filter(c => !c.cover).forEach(c => console.log('  ✗ 仍無：' + c.artist + ' — ' + c.album));
