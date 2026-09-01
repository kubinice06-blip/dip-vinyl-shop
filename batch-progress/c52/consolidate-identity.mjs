// 合併兩條身分線索：策展 mbNote 裡記的 MBID（已逐個回問確認實體類型）＋ 重查的搜尋命中。
// 產出每張卡的最終身分路線：pinned（釘得住 rgMbid）或 manual（走人工身分，rgMbid 必須留空）。
import fs from 'node:fs';
const noted = JSON.parse(fs.readFileSync('batch-progress/c52/noted-verified.json', 'utf8'));
const req = JSON.parse(fs.readFileSync('batch-progress/c52/requery-out.json', 'utf8'));
const cand = JSON.parse(fs.readFileSync('batch-progress/c52/cand.json', 'utf8'));
const byKey = o => o.artist + '|' + o.album;
const reqBy = new Map(req.map(r => [byKey(r), r]));
const notedBy = new Map(noted.map(r => [byKey(r), r]));

const norm = s => (s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
const out = [];
for (const c of cand) {
  const k = byKey(c);
  const cands = [];
  for (const x of (notedBy.get(k)?.ids || [])) if (x.kind === 'release-group')
    cands.push({ id: x.id, title: x.title, credit: x.credit, type: x.type, sec: x.sec, date: x.date, from: 'mbNote' });
  for (const h of (reqBy.get(k)?.hits || []))
    if (!cands.some(y => y.id === h.id))
      cands.push({ id: h.id, title: h.title, credit: h.credit, type: h.type, sec: h.sec, date: h.date, from: 'search:' + h.via });

  // 合輯卡本來就該配到 Compilation；正規盤卡配到 Compilation 則是誤配
  const wantComp = c.releaseType === 'Compilation';
  const scored = cands.map(x => {
    const isComp = (x.sec || []).includes('Compilation');
    let s = 0;
    if (norm(x.title) === norm(c.album)) s += 5; else if (norm(x.title).includes(norm(c.album))) s += 2;
    if (isComp === wantComp) s += 3; else s -= 4;
    if (x.date && c.year && String(x.date).slice(0, 4) === String(c.year)) s += 3;
    return { ...x, score: s, isComp };
  }).sort((a, b) => b.score - a.score);

  const best = scored[0];
  const rec = { artist: c.artist, album: c.album, year: c.year, g: c.g, releaseType: c.releaseType,
                genres: c.genres, selfTitled: c.selfTitled, why: c.why, risk: c.risk, mbNote: c.mbNote,
                exceptionReason: c.exceptionReason, exceptionEvidenceUrls: c.exceptionEvidenceUrls,
                candidates: scored };
  if (best && best.score > 0) {
    rec.identitySource = 'pinned';
    rec.rgMbid = best.id;
    rec.rgTitle = best.title; rec.rgDate = best.date; rec.rgType = best.type; rec.rgSec = best.sec;
    if (best.date && c.year && String(best.date).slice(0, 4) !== String(c.year))
      rec.yearFlag = `MB first-release ${best.date}／卡片 ${c.year}`;
  } else {
    rec.identitySource = 'manual';
    rec.rgMbid = '';
  }
  out.push(rec);
}
fs.writeFileSync('batch-progress/c52/identity.json', JSON.stringify(out, null, 1));
const p = out.filter(r => r.identitySource === 'pinned'), m = out.filter(r => r.identitySource === 'manual');
console.log(`釘得住 rgMbid：${p.length}／${out.length}`);
for (const r of p) console.log(`  ✓ ${r.artist} 《${r.album}》 → ${r.rgTitle} [${r.rgType}${r.rgSec?.length?'/'+r.rgSec.join('+'):''}] ${r.rgDate}` + (r.yearFlag ? `  ⚠ ${r.yearFlag}` : ''));
console.log(`\n走人工身分：${m.length}`);
for (const r of m) console.log(`  · ${r.artist} 《${r.album}》 (${r.g})`);
