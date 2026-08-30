// 把 c-50 的策展提案（prop-all.json）與 MB 查詢結果（mb-raw.json）合成候選檔。
// 用法：node batch-progress/c50/consolidate.mjs [--write]
//
// 本輪 c-48／c-49 踩過的坑，這裡一次擋掉：
//
// 1. **逾時與 HTTP 錯誤不是「查無」**。c-49 的收斂器把 MB 逾時當成查無，
//    產出 11 張假的缺席舉證，等於讓 §1 的 MBID 硬規則作廢。這裡分辨三種狀態：
//    真的空陣列（查無）、`_http`（查詢失敗）、`undefined`（沒查過），
//    後兩者一律不產出候選並以非零狀態碼結束。
// 2. **標題比對要寬鬆**。c-49 拿卡片帶後綴的全名去做精確比對，
//    MB 標題是裸名就配不上（陳光榮《無間道 電影原聲配樂》vs MB 的「無間道」）。
//    這裡先精確比、再用摺疊後的雙向包含比。
// 3. **選到的 release-group 要排除 Compilation／Live／Soundtrack**，
//    本批只收正規錄音室專輯；命中這些 secondary type 的降為待裁定、不自動採用。
import fs from 'node:fs';
import path from 'node:path';
import { fold, ROOT } from '../lib.mjs';

const DIR = path.join(ROOT, 'batch-progress/c50');
const write = process.argv.includes('--write');
const props = JSON.parse(fs.readFileSync(path.join(DIR, 'prop-all.json'), 'utf8'));
const mb = JSON.parse(fs.readFileSync(path.join(DIR, 'mb-raw.json'), 'utf8'));

const norm = s => fold(s).replace(/[^\p{L}\p{N}]+/gu, '');
const BAD_SECONDARY = ['Compilation', 'Live', 'Soundtrack', 'Remix', 'DJ-mix', 'Demo', 'Interview'];

const out = [], skipped = [], failed = [];
for (const p of props) {
  const k = `${p.artist}|${p.album}`;
  const raw = mb[k];
  // 沒查過或查詢失敗 → 不得當成查無，整張留待重查
  if (raw === undefined) { failed.push({ ...p, reason: '未查詢' }); continue; }
  if (raw && raw._http !== undefined) { failed.push({ ...p, reason: `查詢失敗 HTTP ${raw._http}` }); continue; }

  const cands = Array.isArray(raw) ? raw : (raw['release-groups'] || raw.candidates || []);
  const want = norm(p.album), wantArtist = norm(p.artist);
  const scored = cands.map(c => {
    const t = norm(c.title);
    const credit = norm((c['artist-credit'] || []).map(x => x.name).join(''));
    let s = 0;
    if (t === want) s += 100;
    else if (t.includes(want) || want.includes(t)) s += 60;
    if (credit === wantArtist) s += 40;
    else if (credit.includes(wantArtist) || wantArtist.includes(credit)) s += 20;
    if (c['primary-type'] === 'Album') s += 10;
    const sec = c['secondary-types'] || [];
    if (sec.some(x => BAD_SECONDARY.includes(x))) s -= 50;
    if (p.year && String(c['first-release-date'] || '').slice(0, 4) === String(p.year)) s += 15;
    return { c, s, sec };
  }).sort((x, y) => y.s - x.s);

  const best = scored[0];
  if (!best || best.s < 100) {
    skipped.push({ ...p, reason: best ? `最佳候選分數僅 ${best.s}（標題或掛名對不上）` : 'MB 零候選',
                   top: (scored.slice(0, 3).map(x => `${x.c.title} [${x.c['primary-type']}${x.sec.length ? '+' + x.sec.join('/') : ''}] ${x.c['first-release-date'] || '?'}`)) });
    continue;
  }
  const c = best.c;
  out.push({
    artist: p.artist, album: p.album,
    rgMbid: c.id,
    mbTitle: c.title,
    mbCredit: (c['artist-credit'] || []).map(x => x.name).join(', '),
    mbFirstRelease: c['first-release-date'] || '',
    releaseType: c['primary-type'] || '',
    secondaryTypes: best.sec,
    suggestedYear: p.year,
    yearNote: p.year && String(c['first-release-date'] || '').slice(0, 4) !== String(p.year)
      ? `策展層取 ${p.year}，MB 首發標 ${c['first-release-date'] || '未載'}。本批為正規錄音室專輯，年份取原盤首發年；兩者不一致時本機以碟面為準。`
      : `策展層與 MB 首發年一致（${p.year}）。`,
    label: p.label || '',
    genres: p.genres,
    curatorWhy: p.why,
    curatorRisk: p.risk || '',
    mbNote: p.mbNote || '',
    selfTitled: !!p.selfTitled,
    group: p.g,
  });
}

console.log(`提案 ${props.length}｜可用候選 ${out.length}｜待裁定 ${skipped.length}｜查詢未完成或失敗 ${failed.length}`);
if (skipped.length) {
  console.log('\n── 待裁定（MB 對不上，需人工看）──');
  skipped.forEach(s => { console.log(`  ${s.artist} — ${s.album}：${s.reason}`); (s.top || []).forEach(t => console.log(`      ${t}`)); });
}
if (failed.length) {
  console.log('\n── 查詢未完成或失敗（不得判為查無，須重查）──');
  failed.forEach(f => console.log(`  ${f.artist} — ${f.album}：${f.reason}`));
}
if (write) {
  fs.writeFileSync(path.join(DIR, 'cand.json'), JSON.stringify({ batch: 'c50', albums: out, skipped }, null, 1));
  console.log(`\n已寫出 cand.json（${out.length} 張）`);
}
process.exit(failed.length ? 2 : 0);
