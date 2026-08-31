// 零候選卡的補查。用法：node batch-progress/csea/requery.mjs
//
// 直接用專輯名查 MB 常因寫法差異零命中——卡池的慣例寫法（Weezer (Green Album)）、
// 雙掛名（Celia & Johnny）、冒號與羅馬數字都會讓精確查詢落空。
// c-49 的複查證明有效的做法是**先抓藝人的完整 release-group 目錄，再回頭在本地寬鬆比對**，
// 零結果才算真的查無。逾時與 HTTP 錯誤一律不得當成查無。
import fs from 'node:fs';
import path from 'node:path';
import { fold, ROOT } from '../lib.mjs';

const DIR = path.join(ROOT, 'batch-progress/csea');
const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const norm = s => fold(s).replace(/[^\p{L}\p{N}]+/gu, '');
// 比對用的「核心標題」：去掉括號註記、Volume/Vol. 之類的卷次寫法差異
const core = s => norm(String(s).replace(/\([^)]*\)/g, ' ').replace(/\bvolume\b|\bvol\b/gi, ' '));

async function mb(url) {
  const B = [3000, 8000, 20000, 40000];
  let last = '';
  for (let i = 0; i < B.length; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
      if (r.status === 503 || r.status === 429) { last = 'HTTP ' + r.status; await sleep(B[i]); continue; }
      if (!r.ok) return { _http: r.status };
      return r.json();
    } catch (e) { last = String(e.message || e); await sleep(B[i]); }
  }
  return { _http: '重試耗盡：' + last };
}

// 目標需帶 year，否則年份把關失效（見上方註解）
const targets = JSON.parse(fs.readFileSync(path.join(DIR, 'requery-targets.json'), 'utf8'));
const out = fs.existsSync(path.join(DIR, 'requery-out.json'))
  ? JSON.parse(fs.readFileSync(path.join(DIR, 'requery-out.json'), 'utf8')) : {};

for (const t of targets) {
  const k = `${t.artist}|${t.album}`;
  if (out[k]) continue;
  // 1. 先找藝人 MBID
  const a = await mb(`https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent('"' + t.artist + '"')}&fmt=json&limit=5`);
  await sleep(1200);
  if (a._http) { out[k] = { _http: a._http, stage: 'artist' }; fs.writeFileSync(path.join(DIR, 'requery-out.json'), JSON.stringify(out, null, 1)); console.log(`✖ ${k}：藝人查詢失敗 ${a._http}`); continue; }
  const artists = (a.artists || []).slice(0, 3);
  let found = null, catalogue = [];
  for (const ar of artists) {
    // 2. 抓該藝人的完整 release-group 目錄
    const rg = await mb(`https://musicbrainz.org/ws/2/release-group?artist=${ar.id}&type=album&limit=100&fmt=json`);
    await sleep(1200);
    if (rg._http) { out[k] = { _http: rg._http, stage: 'browse', artistTried: ar.name }; break; }
    const groups = rg['release-groups'] || [];
    catalogue.push(...groups.map(g => ({ id: g.id, title: g.title, date: g['first-release-date'] || '', pt: g['primary-type'], st: g['secondary-types'] || [], credit: ar.name })));
    const want = core(t.album);
    // ⚠ 寬鬆比對必須設防，否則會配到別張。2026-08-30 實踩三次：
    //   Santana III → 剝掉後 santanaiii 包含 santana，配到 1997 年的精選；
    //   Weezer (Green Album) → 括號被剝掉，配到 2026 年的另一張同名作；
    //   Modern Sounds… Volume Two → Volume 被剝掉，配到第一集。
    // 三個共通點：**寬鬆比對命中時，年份與形態就是唯一的把關**。
    // ⚠ 同一位藝人有多張提案時，寬鬆比對會把 A 配到 B 的碟上。2026-08-31 實踩：
// Hamza El Din 同時提了《Music of Nubia》與《Al Oud: Instrumental & Vocal Music of
// Nubia》，後者的核心標題整段包含前者，於是《Al Oud》被配到《Music of Nubia》
// 的 release-group、兩張卡指向同一張碟。防線是：**候選標題如果正好等於同一位
// 藝人的另一張提案，一律不採**——那張碟已經有它自己的卡了。
const sameArtistOther = new Set(
  targets.filter(x => x.artist === t.artist && x.album !== t.album).map(x => core(x.album)));
const okOther = g => !sameArtistOther.has(core(g.title));
const okYear = g => !t.year || Math.abs((+String(g['first-release-date'] || '').slice(0, 4) || 0) - t.year) <= 1;
    const okType = g => !(g['secondary-types'] || []).some(x => ['Compilation', 'Live', 'Remix', 'Soundtrack'].includes(x));
    const hit = groups.find(g => core(g.title) === want && okYear(g) && okType(g) && okOther(g))
      || groups.find(g => { const c = core(g.title); return c && want && (c.includes(want) || want.includes(c)) && okYear(g) && okType(g) && okOther(g); });
    if (hit) { found = { ...hit, artistName: ar.name, artistId: ar.id }; break; }
  }
  if (out[k] && out[k]._http) { fs.writeFileSync(path.join(DIR, 'requery-out.json'), JSON.stringify(out, null, 1)); console.log(`✖ ${k}：目錄查詢失敗`); continue; }
  out[k] = found
    ? { id: found.id, title: found.title, 'first-release-date': found['first-release-date'] || found.date || '', 'primary-type': found['primary-type'] || found.pt, 'secondary-types': found['secondary-types'] || found.st, credit: found.artistName }
    : { _empty: true, catalogueSize: catalogue.length, sample: catalogue.slice(0, 40).map(g => `${g.title} [${g.pt}${g.st.length ? '+' + g.st.join('/') : ''}] ${g.date}`) };
  fs.writeFileSync(path.join(DIR, 'requery-out.json'), JSON.stringify(out, null, 1));
  console.log(found ? `✔ ${k} → ${found.title} (${found['first-release-date'] || found.date}) ${found.id}` : `？ ${k}：目錄 ${catalogue.length} 筆中無相符標題`);
}
console.log('\n完成');
