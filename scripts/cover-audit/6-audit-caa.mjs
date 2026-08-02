// 卡池封面稽核 步驟 6：抽驗 Cover Art Archive 補救層配得準不準。
//
// 步驟 2 執行到一半 Spotify 就被限流，之後 5,446 張卡的封面全由補救層供應並永久寫進 KV。
// 要決定「留著還是刪掉重來」，得先知道補救層本身的準確度。
// worker 寫入時有留 rgMbid，所以可以反查 MusicBrainz release-group 的真實標題與藝人，
// 用跟步驟 4 同一套標準比對——等於把稽核方法原封不動套到另一個來源上。
//
// MusicBrainz 要求 1 req/s 且需具識別性的 User-Agent，所以只抽樣不全掃。
// 用法：node scripts/cover-audit/6-audit-caa.mjs [--sample 150]
// 產出：scripts/cover-audit/data/caa-audit.json
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'scripts', 'cover-audit', 'data');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const argv = process.argv.slice(2);
const i = argv.indexOf('--sample');
const SAMPLE = i >= 0 ? Number(argv[i + 1]) : 150;
const UA = 'dip-vinyl-cover-audit/1.0 (https://dip-vinyl-worker.kubinice06.workers.dev)';

const cards = JSON.parse(fs.readFileSync(path.join(OUT, 'cards.json'), 'utf8'));
const byKey = new Map(cards.map(c => [c.key, c]));
const fill = JSON.parse(fs.readFileSync(path.join(OUT, 'fill-progress.json'), 'utf8'));

const pool = Object.entries(fill).filter(([, v]) => v?.coverSource === 'coverartarchive' && v.rgMbid);
console.log(`CAA 來源共 ${pool.length} 張，抽驗 ${Math.min(SAMPLE, pool.length)} 張`);
const step = Math.max(1, Math.floor(pool.length / SAMPLE));
const picked = pool.filter((_, n) => n % step === 0).slice(0, SAMPLE);

const normalize = s => (s || '').toLowerCase().replace(/&/g, ' and ')
  .replace(/\byr\b\.?/g, 'your').replace(/[^a-z0-9　-鿿가-힯]/g, '');
const tokens = s => new Set((s || '').toLowerCase().replace(/&/g, ' and ')
  .replace(/[^a-z0-9　-鿿가-힯]+/g, ' ').trim().split(/\s+/)
  .filter(t => t && !['the', 'and', 'a', 'of'].includes(t)));
const subset = (a, b) => a.size > 0 && [...a].every(t => b.has(t));

const rows = [];
let n = 0, exact = 0, contained = 0, bad = 0, artistBad = 0, fetchFail = 0;
for (const [key, v] of picked) {
  const c = byKey.get(key);
  let rg = null;
  for (let a = 1; a <= 3 && !rg; a++) {
    try {
      const r = await fetch(`https://musicbrainz.org/ws/2/release-group/${v.rgMbid}?fmt=json&inc=artist-credits`,
        { headers: { 'User-Agent': UA } });
      if (r.ok) rg = await r.json(); else await sleep(1500 * a);
    } catch { await sleep(1500 * a); }
  }
  n++;
  if (!rg) { fetchFail++; await sleep(1100); continue; }
  const mbTitle = rg.title || '';
  const mbArtist = (rg['artist-credit'] || []).map(x => x.name).join(' & ');
  const nc = normalize(c.album), nm = normalize(mbTitle);
  const artistOK = subset(tokens(c.artist), tokens(mbArtist)) || subset(tokens(mbArtist), tokens(c.artist));
  let verdict;
  if (nm === nc) { verdict = '完全吻合'; exact++; }
  else if (nm.includes(nc) || nc.includes(nm)) { verdict = '包含關係'; contained++; }
  else { verdict = '名稱不符'; bad++; }
  if (!artistOK) { verdict += '／藝人不符'; artistBad++; }
  rows.push({ key, artist: c.artist, album: c.album, year: c.year, mbTitle, mbArtist, verdict, rgMbid: v.rgMbid });
  if (n % 20 === 0) process.stdout.write(`\r${n}/${picked.length}`);
  await sleep(1100);   // MusicBrainz 要求 1 req/s
}
fs.writeFileSync(path.join(OUT, 'caa-audit.json'), JSON.stringify(rows, null, 1));
console.log(`\n抽驗 ${rows.length} 張｜完全吻合 ${exact}｜包含關係 ${contained}｜名稱不符 ${bad}｜藝人不符 ${artistBad}｜查詢失敗 ${fetchFail}`);
for (const r of rows.filter(r => r.verdict !== '完全吻合').slice(0, 25)) {
  console.log(`  ${r.verdict}｜${r.artist} / ${r.album} → MB「${r.mbTitle}」— ${r.mbArtist}`);
}
