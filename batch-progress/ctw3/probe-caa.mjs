// 留置 24 張走 MusicBrainz → Cover Art Archive 的第二條路。
// 用法：node batch-progress/ctw3/probe-caa.mjs
//
// 2026-08-23 的紀錄寫「CAA 對台灣獨立盤的覆蓋率是零（44 個端點逐一試過全 404）」，
// 但那次是拿當時手上的 MBID 去試。這支重跑完整鏈路：先向 MB 查 release-group，
// 再對 release-group 與其底下每一個 release 試 CAA——**封面常常只掛在某一個
// release 上、release-group 層是空的**，只查 group 會漏。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';
const UA = { 'User-Agent': 'dip-vinyl-shop/1.0 (https://github.com/kubinice06-blip/dip-vinyl-shop)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const esc = s => String(s).replace(/([+\-!(){}\[\]^"~*?:\\/])/g, '\\$1');

const probe = JSON.parse(fs.readFileSync(path.join(ROOT, 'batch-progress/ctw3/covers-probe.json'), 'utf8'));
const cards = JSON.parse(fs.readFileSync(path.join(ROOT, 'batch-progress/ctw3/held-cards.json'), 'utf8'))
  .filter(c => probe[`${c.artist}|${c.album}`]?._miss);

const out = {};
for (const c of cards) {
  const q = `artist:"${esc(c.artist)}" AND release:"${esc(c.album)}"`;
  let rg = null;
  try {
    const j = await (await fetch(`https://musicbrainz.org/ws/2/release-group/?query=${encodeURIComponent(q)}&fmt=json&limit=5`, { headers: UA })).json();
    rg = (j['release-groups'] || [])[0] || null;
  } catch { /* 逾時不當成查無 */ }
  await sleep(1100);
  if (!rg) { out[`${c.artist}|${c.album}`] = { _noMb: true }; console.log(`✗ MB 查無  ${c.artist}《${c.album}》`); continue; }

  // CAA：先試 release-group，再逐一試底下的 release
  let art = null;
  for (const url of [`https://coverartarchive.org/release-group/${rg.id}`]) {
    try { const r = await fetch(url, { headers: UA, redirect: 'follow' }); if (r.ok) { art = { level: 'release-group', id: rg.id }; break; } } catch {}
  }
  if (!art) {
    let rels = [];
    try {
      const j = await (await fetch(`https://musicbrainz.org/ws/2/release?release-group=${rg.id}&fmt=json&limit=25`, { headers: UA })).json();
      rels = (j.releases || []).map(x => x.id);
    } catch {}
    await sleep(1100);
    for (const rid of rels) {
      try { const r = await fetch(`https://coverartarchive.org/release/${rid}`, { headers: UA, redirect: 'follow' }); if (r.ok) { art = { level: 'release', id: rid }; break; } } catch {}
      await sleep(400);
    }
  }
  out[`${c.artist}|${c.album}`] = { rgMbid: rg.id, mbTitle: rg.title, art };
  console.log(`${art ? '✓' : '✗'} ${c.artist}《${c.album}》  MB ${rg.id.slice(0, 8)}「${rg.title}」${art ? `  CAA 有圖（${art.level}）` : '  CAA 無圖'}`);
  await sleep(900);
}
fs.writeFileSync(path.join(ROOT, 'batch-progress/ctw3/caa-probe.json'), JSON.stringify(out, null, 1));
const v = Object.values(out);
console.log(`\nMB 有建檔 ${v.filter(x => x.rgMbid).length}／${cards.length}｜CAA 有圖 ${v.filter(x => x.art).length}`);
