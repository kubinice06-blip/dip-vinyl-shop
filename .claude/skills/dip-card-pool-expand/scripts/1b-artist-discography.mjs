// 步驟 1（藝人清單版）：目標不是廠牌而是「某個圈子的藝人群」時，
// 逐位藝人查 MusicBrainz 官方專輯（release-group type=Album），比用廠牌反查更準——
// 這些藝人常常分散在很多小廠牌，用廠牌撈會漏掉大半。
// 用法：node 1b-artist-discography.mjs artists.txt 輸出檔.json
//   artists.txt：一行一位藝人名
import fs from 'fs';
const UA = { 'User-Agent': 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));

const listPath = process.argv[2];
const outPath = process.argv[3];
if (!listPath || !outPath) { console.error('用法: node 1b-artist-discography.mjs artists.txt 輸出檔.json'); process.exit(1); }
const artists = fs.readFileSync(listPath, 'utf-8').split('\n').map(s => s.trim()).filter(Boolean);

async function mb(path) {
  // 與 1-label-catalog / 1c-series-catalog 同一套：503 暫時過載重試（間隔 2 秒、最多 3 次）
  for (let tries = 0; tries < 3; tries++) {
    const r = await fetch(`https://musicbrainz.org/ws/2/${path}`, { headers: UA }).catch(() => null);
    await sleep(1100);
    if (r && r.ok) return r.json();
    if (r && r.status !== 503) return null;   // 非過載類錯誤不重試
    console.log(`  … MB ${r ? r.status : '網路錯誤'}，${tries < 2 ? '2 秒後重試' : '放棄此筆'} (${path.slice(0, 60)})`);
    await sleep(2000);
  }
  return null;
}

const out = [];
for (const name of artists) {
  const search = await mb(`artist/?query=${encodeURIComponent(name)}&fmt=json&limit=3`);
  const artist = (search?.artists || [])[0];
  if (!artist) { console.log(`✗ 查無藝人 | ${name}`); continue; }
  const rgs = await mb(`release-group?artist=${artist.id}&type=album&limit=100&fmt=json`);
  const albums = (rgs?.['release-groups'] || []).filter(rg => !/(live|compilation|remix)/i.test(rg['secondary-types']?.join(' ') || ''));
  console.log(`${String(albums.length).padStart(3)} 張正式錄音室專輯 | ${artist.name} (${artist.disambiguation || artist.country || '?'})`);
  // 記錄 release-group MBID：外部識別不再單點依賴 Apple collectionId（2026-07-24 硬規則）。
  // rgMbid 是「我們指的是哪張碟」的穩定主鍵，對自我同名卡尤其關鍵；免認證、順手拿最便宜。
  for (const rg of albums) out.push({ artist: artist.name, title: rg.title, date: rg['first-release-date'] || '', rgMbid: rg.id, ids: rg.id ? [rg.id] : [] });
}
fs.writeFileSync(outPath, JSON.stringify(out, null, 1));
console.log(`\n共 ${out.length} 張候選 → ${outPath}`);
