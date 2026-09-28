// 補遺線（hoyi）切批：四堆候選合成 slice，依 堆 → 年份 排序後切開。主線第 2007-B 條。
//
// 第 1 堆：enum/jp-2.md 的 §1 候選（池中已有、1990 年後的剔除）＋ c-191 b 第 6708 條《Red Live》
// 第 2 堆：audits/between-the-lines-candidates.md 甲族（MB 廠牌旗標錯、原壓在四大廠）
// 第 3 堆：日本藝人的美國原盤（jp-2 以「原壓不在十五家」退的三張）
// 第 4 堆：(a) jp-1／jp-2 以第 4106 條四項退掉的外國藝人盤（剔除合輯與原盤在外國的）
//          (b) enum/hoyi-foreign-origin.json 的「甲」與「不明」（MB 最早 release 在日本或判不出）
//
// 用法：node batch-progress/slice-hoyi.mjs <起始批號> [每批張數=38]
import fs from 'node:fs';
const start = Number(process.argv[2]), per = Number(process.argv[3] || 38);
if (!start) { console.log('用法：node batch-progress/slice-hoyi.mjs <起始批號> [每批張數]'); process.exit(1); }
const norm = s => String(s || '').toLowerCase().normalize('NFKC').replace(/[&＆]/g, 'and').replace(/[^\p{L}\p{N}]+/gu, '');
const pool = new Set(), poolRg = new Set();
for (const r of JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'))) pool.add(norm(r[0]) + '|' + norm(r[1]));
for (const f of fs.readdirSync('desc-tools/batches/cards').filter(x => /-cards\.json$/.test(x)))
  for (const c of JSON.parse(fs.readFileSync('desc-tools/batches/cards/' + f, 'utf8'))) { pool.add(norm(c.artist) + '|' + norm(c.album)); if (c.rgMbid) poolRg.add(c.rgMbid); }
const rows = [];
const add = (pile, o) => rows.push({ pile, artist: o.artist, album: o.album, year: o.year || null, rgMbid: o.rgMbid || '', house: o.house || '', source: o.source || '', hint: o.hint || '' });

// ── 第 1 堆（§1）：enum/jp-2.md 原文的候選，逐筆手抄；「請覆核」的年份與廠牌照抄成 hint
const P1 = [
  ['The Great Jazz Trio', 'Milestones', 1978, 'East Wind', 'MB 完全查無 RG'],
  ['The Great Jazz Trio', 'At the Village Vanguard Vol. 2', 1978, 'East Wind', 'MB 完全查無 RG'],
  ['Ronnie Mathews', 'Trip to the Orient', 1975, 'East Wind', 'MB 完全查無 RG；⚠ 美國藝人——身分照第 4 堆的規則（日本原盤即可）'],
  ['山下洋輔', 'Banslikana', 1976, 'Frasco', 'MB 完全查無 RG；solo'],
  ['山下洋輔', 'Inner Space', 1977, 'Frasco', 'MB 完全查無 RG'],
  ['山下洋輔トリオ', '砂山', 1979, 'Frasco', 'MB 完全查無 RG；年份請覆核（c-187 第 6490 條提過 1978 年那張前作）'],
  ['岡野等', 'Double Image', null, 'Union', 'MB 完全查無 RG；同批其他 Union Jazz 盤一併看'],
  ['鈴木良雄', 'Matsuri', null, 'Trio?', 'MB 完全查無 RG；⚠ c-188 a 研究層：ja 維基寫 1974 年 CBS/Sony，不是 Trio、不是 1980'],
  ['大村憲司', 'First Step', 1978, 'Alfa?', 'MB 完全查無 RG；廠牌請覆核'],
  ['中村照夫', 'Rising Sun', 1978, 'Kitty?', 'MB 完全查無 RG；廠牌請覆核'],
  ['鈴木宏昌', 'Rock Joint Biwa', null, 'Nippon Crown?', 'MB 完全查無 RG；1970 年代，廠牌請覆核'],
  ['猪俣猛', 'Sounds of Sound L.T.D.', null, 'Nippon Crown?', 'MB 完全查無 RG；廠牌請覆核'],
  ['渡辺貞夫', 'Bossa Nova Concert', 1969, 'CBS/Sony?', 'MB 完全查無 RG'],
  ['日野皓正', 'Journey to Air', 1970, 'Polydor（Love）?', 'MB 完全查無 RG；實為 Love／Polydor 系'],
  ['The Great Jazz Trio', 'Kindness, Joy, Love & Happiness', 1978, 'East Wind', 'MB 有 RG 但沒掛在 East Wind 實體——直接釘 rgMbid'],
  ['Hank Jones', 'Hanky Panky', 1975, 'East Wind', 'MB 只有 2005 再發；⚠ 美國藝人——身分照第 4 堆的規則'],
  ['松本英彦', 'The Session / Sleepy Meets the Great Jazz Trio', 1980, 'Union／Crown', 'MB 有 RG 但沒掛在本廠牌實體'],
  ['板橋文夫', 'Nature', null, 'Denon', 'MB 只有 2010 再發'],
  ['日野皓正', "Taro's Mood", 1973, 'CBS/Sony?', 'MB 只有 2006 再發'],
  ['Ottottrio', 'Super Guitar Session: Red Live', 1988, 'Polydor／Aura', 'c-191 b 第 6708 條：與《Hot Live》同一場，不在任何 slice'],
];
for (const [a, b, y, h, hint] of P1) add(1, { artist: a, album: b, year: y, house: h, hint, source: 'enum/jp-2.md §1 候選' });

// ── 第 2 堆
add(2, { artist: 'Jun Fukamachi 21st Century Band', album: 'Rokuyu (六喩)', year: 1975, rgMbid: 'a649f350-545b-4005-aeb1-6452ecd07823', house: 'Express（東芝EMI）', source: 'c-184 b 第 5748 條' });
add(2, { artist: '柳田ヒロ', album: 'Milk Time', year: 1970, rgMbid: '855248cd-c540-452f-9051-859d037f8675', house: 'Liberty（東芝音工）', source: 'c-183 a 第 5668 條' });
// 其餘從退件表帶 rgMbid
const rej = JSON.parse(fs.readFileSync(process.env.REJECTS || 'batch-progress/hoyi/prior-rejects.json', 'utf8') || '[]');
const skip = /Unchain My Heart|Held Over|Soul Route|TOKYO JOE|BANG!/;   // 合輯、原盤在外國、非本線
for (const r of rej) {
  if (skip.test(r.album) || r.pile === 2 && /Rokuyu/.test(r.album)) continue;
  add(r.pile, { artist: r.artist, album: r.album, year: r.year, rgMbid: r.rgMbid, house: r.house, source: `${r.batch.replace('c', 'c-')} 第 ${r.ruling} 條` });
}
// ── 第 4 堆 (b)
const orig = JSON.parse(fs.readFileSync('batch-progress/enum/hoyi-foreign-origin.json', 'utf8'));
for (const [rg, o] of Object.entries(orig)) {
  if (o.verdict === '乙') continue;
  add(4, { artist: o.artist, album: o.album, year: o.year, rgMbid: rg, house: o.slug.replace('jp-', ''), source: `hoyi-foreign-origin：${o.verdict}（${o.why}）` });
}
// 去重、剔池、剔 1990+
const seen = new Set(); const keep = [];
let dropPool = 0, dropLate = 0;
for (const r of rows) {
  const k = r.rgMbid || norm(r.artist) + '|' + norm(r.album);
  if (seen.has(k)) continue; seen.add(k);
  if (r.rgMbid && poolRg.has(r.rgMbid) || pool.has(norm(r.artist) + '|' + norm(r.album))) { dropPool++; continue; }
  if (r.year && r.year > 1989) { dropLate++; continue; }
  keep.push(r);
}
keep.sort((a, b) => (a.pile === 4) - (b.pile === 4) || (a.pile - b.pile) || ((a.year || 0) - (b.year || 0)));
const nb = Math.ceil(keep.length / per);
const size = Math.ceil(keep.length / nb);
for (let i = 0; i < nb; i++) {
  const part = keep.slice(i * size, (i + 1) * size);
  const half = Math.ceil(part.length / 2);
  part.forEach((r, j) => r.g = j < half ? 'a' : 'b');
  const dir = `batch-progress/c${start + i}`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/slice.json`, JSON.stringify(part, null, 1) + '\n');
  const pc = {}; part.forEach(r => pc[r.pile] = (pc[r.pile] || 0) + 1);
  const y = part.map(r => r.year).filter(Boolean);
  console.log(`c${start + i}：${part.length} 張｜堆 ${JSON.stringify(pc)}｜${Math.min(...y)}–${Math.max(...y)}`);
}
console.log(`合計 ${keep.length}（剔池 ${dropPool}、剔 1990+ ${dropLate}）`);
