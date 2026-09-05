// 人工身分卡的封面：依 §4 新增的 apple-verified-collection 例外（裁定第 96 條），
// 用策展層人工核對過的 collectionId 直接 lookup 取封面網址——**不是模糊搜尋**。
// 沒有 collectionId 的卡不處理（§4：抓不到可靠封面就停止該筆）。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const sleep = ms => new Promise(r => setTimeout(r, ms));
// c-87 兩組都是人工身分卡，兩個 prop 檔一起讀（c-64 那次只有 b 組是 §1）。
const props = ['a', 'b'].flatMap(g =>
  JSON.parse(fs.readFileSync(path.join(ROOT, `batch-progress/c87/prop-${g}.json`), 'utf8')));
const MBID = /\b(\d{9,})\b/;
const out = {};
for (const r of props.filter(x => x.identitySource === 'manual')) {
  const id = (JSON.stringify(r).match(/collectionId[^0-9]{0,8}(\d{6,})/) || [])[1];
  if (!id) { console.log(`— ${r.album}：無 collectionId，依 §4 不處理`); continue; }
  const j = await fetch(`https://itunes.apple.com/lookup?id=${id}`).then(r => r.json()).catch(() => null);
  await sleep(800);
  const a = (j?.results || [])[0];
  if (!a) { console.log(`✗ ${r.album}：lookup ${id} 無結果`); continue; }
  // 100x100 換成 1200x1200：Apple 的網址是可替換尺寸的固定格式
  const url = String(a.artworkUrl100 || '').replace(/\/100x100bb\.\w+$/, '/1200x1200bb.jpg');
  out[`${r.artist}|${r.album}`] = {
    collectionId: Number(id), appleArtist: a.artistName, appleTitle: a.collectionName,
    appleYear: String(a.releaseDate || '').slice(0, 4), trackCount: a.trackCount,
    art: url ? { url, source: 'apple-verified-collection', collectionId: Number(id) } : null,
  };
  console.log(`${url ? '✓' : '✗'} ${r.album} → ${a.artistName}《${a.collectionName}》${String(a.releaseDate||'').slice(0,4)} tr${a.trackCount}`);
}
fs.writeFileSync(path.join(ROOT, 'batch-progress/c87/apple-art.json'), JSON.stringify(out, null, 1));
console.log(`\n人工身分卡 ${props.filter(x => x.identitySource === 'manual').length} 張｜取到封面 ${Object.values(out).filter(x => x.art).length} 張`);
