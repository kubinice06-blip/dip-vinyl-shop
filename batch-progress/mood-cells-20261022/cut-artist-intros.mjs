// ALBUM_ONBOARDING §11：情緒薄格策展線 md1–md4 上架卡的藝人補排藝人介紹（2026-10-22；複製自薄細項線，只改檔名樣式與批序）。只切不寫（店主：藝人介紹用別的對話做）。
//   扣掉已有介紹、progress.json 已排隊、aliases 別名鍵與 Various Artists；剩下的補進 roster（tier D、addedBy 標批名），
//   依批次順序每 40 位切一批 ar-d-xxx（state: cut），寫 cut/<批>.txt。冪等：roster 已有的鍵不重複加。
import fs from 'node:fs';
const K = s => s.normalize('NFC').trim().toLowerCase();
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const have = new Set();
for (const f of fs.readdirSync('data/artist-intros')) if (/^[0-9a-f]{2}\.json$/.test(f)) for (const k of Object.keys(J('data/artist-intros/' + f).entries)) have.add(k);
const P = 'desc-tools/batches/artist/progress.json', prog = J(P);
const queued = new Set(prog.batches.flatMap(b => b.keys));
const al = J('desc-tools/batches/artist/aliases.json'), alk = new Set(Object.keys(al.aliases || al));
const RF = 'batch-progress/artist-intro/roster-20260929.json', ros = J(RF);
const seed = J('seed_cards.json');
const script = s => /[฀-๿]/.test(s) ? 'other' : /[Ѐ-ӿ]/.test(s) ? 'cyr' : /[぀-ヿ]/.test(s) ? 'ja' : /[가-힯]/.test(s) ? 'ko' : /[一-鿿]/.test(s) ? 'zh' : 'latin';
const order = ['md1', 'md2', 'md3', 'md4'];
const files = fs.readdirSync('.').filter(f => /^onboarding-manifest-add-2026102\d-md\d-2026102\d\.json$/.test(f))
  .sort((a, b) => order.indexOf(a.match(/-(md\d)-/)[1]) - order.indexOf(b.match(/-(md\d)-/)[1]));
const picked = [];
for (const f of files) {
  const B = f.replace(/^onboarding-manifest-|-2026102\d\.json$/g, '');
  for (const a of J(f).albums) {
    const k = K(a.artist);
    if (k === 'various artists' || have.has(k) || queued.has(k) || alk.has(k) || picked.some(p => p.key === k)) continue;
    const rows = seed.filter(r => K(r[0]) === k), yrs = rows.map(r => +r[6]).filter(Boolean);
    const g = {}; for (const r of rows) { const x = (r[5] || [])[0]; if (x) g[x] = (g[x] || 0) + 1; }
    picked.push({ key: k, name: a.artist, variants: null, cards: rows.length, tier: 'D', mainGenre: Object.entries(g).sort((x, y) => y[1] - x[1])[0]?.[0] || 'rock',
      yearMin: yrs.length ? Math.min(...yrs) : null, yearMax: yrs.length ? Math.max(...yrs) : null, script: script(a.artist), classicalPerformer: false,
      collab: /\s(&|with|y|et)\s|,/.test(a.artist), sampleAlbums: rows.slice(0, 3).map(r => r[1]), shard: null, addedBy: B });
  }
}
const inRos = new Set(ros.entries.map(e => e.key));
let added = 0; for (const e of picked) if (!inRos.has(e.key)) { ros.entries.push(e); added++; }
ros.artists = ros.entries.length;
fs.writeFileSync(RF, JSON.stringify(ros) + (fs.readFileSync(RF, 'utf8').endsWith('\n') ? '\n' : ''));
let n = Math.max(...prog.batches.filter(b => /^ar-d-\d+$/.test(b.batch)).map(b => +b.batch.slice(5)));
const made = [];
for (let i = 0; i < picked.length; i += 40) {
  const sl = picked.slice(i, i + 40), batch = `ar-d-${String(++n).padStart(3, '0')}`;
  const src = [...new Set(sl.map(e => e.addedBy))];
  prog.batches.push({ batch, tier: 'D', genres: [...new Set(sl.map(e => e.mainGenre))], keys: sl.map(e => e.key), state: 'cut',
    note: `情緒薄格策展線 ${src.join('、')} 上架卡缺介紹的藝人（ALBUM_ONBOARDING §11）` });
  fs.writeFileSync(`desc-tools/batches/artist/cut/${batch}.txt`, sl.map(e => e.key).join('\n') + '\n');
  made.push(`${batch}:${sl.length}`);
}
prog.updatedAt = new Date().toISOString();
fs.writeFileSync(P, JSON.stringify(prog, null, 1) + '\n');
console.log('picked', picked.length, 'roster added', added, 'batches', made.join(' '));
