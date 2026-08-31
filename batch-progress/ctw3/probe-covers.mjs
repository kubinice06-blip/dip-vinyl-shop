// c-TW 台灣獨立批留置 26 張的封面重測。
// 用法：node batch-progress/ctw3/probe-covers.mjs
//
// 2026-08-23 首輪判定「Apple 台灣對 1990 年代地下盤幾乎沒有目錄」。
// 2026-08-31 抽驗發現**目錄變了**，而且首輪還漏掉一個寫法問題：
// 刺客那張在 Apple 上掛「刺客樂團」，用「刺客」查是查不到的。
// 因此本支每張都試多種掛名寫法：原名、原名＋樂團、原名＋合唱團、去掉「樂團」。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const UA = { 'User-Agent': 'dip-vinyl-shop/1.0 (https://github.com/kubinice06-blip/dip-vinyl-shop)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const CARDS = JSON.parse(fs.readFileSync(path.join(ROOT, 'batch-progress/ctw3/held-cards.json'), 'utf8'));

const variants = a => [...new Set([
  a, `${a}樂團`, `${a}合唱團`, a.replace(/樂團$|合唱團$/, ''),
])].filter(Boolean);

const norm = s => String(s).replace(/[\s〈〉《》<>()（）]/g, '');
const out = {};
for (const c of CARDS) {
  let best = null;
  for (const v of variants(c.artist)) {
    const u = `https://itunes.apple.com/search?term=${encodeURIComponent(v + ' ' + c.album)}&entity=album&country=tw&limit=10`;
    let j; try { j = await (await fetch(u, { headers: UA })).json(); } catch { await sleep(1200); continue; }
    for (const r of j.results || []) {
      const t = norm(r.collectionName), want = norm(c.album);
      // 標題要真的對得上：完全相同，或其中一方包含另一方且長度差不多
      const ok = t === want || (t.includes(want) && t.length - want.length <= 8) || (want.includes(t) && want.length - t.length <= 8);
      if (!ok) continue;
      const y = +String(r.releaseDate || '').slice(0, 4);
      // 年份差三年以上就不是原盤（再版與後來的同名作）
      if (c.year && y && Math.abs(y - c.year) > 3) continue;
      best = { queriedAs: v, collectionId: r.collectionId, collectionName: r.collectionName,
               artistName: r.artistName, releaseDate: r.releaseDate, trackCount: r.trackCount,
               collectionExplicitness: r.collectionExplicitness,
               coverUrl: (r.artworkUrl100 || '').replace('100x100', '1200x1200') };
      break;
    }
    await sleep(1200);
    if (best) break;
  }
  out[`${c.artist}|${c.album}`] = best || { _miss: true };
  console.log(`${best ? '✓' : '✗'} ${c.artist}《${c.album}》${best ? `  → ${best.collectionName} / ${best.artistName} ${String(best.releaseDate).slice(0,4)}（查詢用「${best.queriedAs}」）` : ''}`);
}
fs.writeFileSync(path.join(ROOT, 'batch-progress/ctw3/covers-probe.json'), JSON.stringify(out, null, 1));
const hit = Object.values(out).filter(x => !x._miss).length;
console.log(`\n命中 ${hit}／${CARDS.length}`);
