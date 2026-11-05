// ax5 版：藝人取自卡單（第三參數），不等 manifest。node batch-progress/add-20261104-ax5/cut-artist-intros-ax5.mjs add-20261104-ax5 ar-d-266 desc-tools/batches/cards/ax5n1-cards.json
// ALBUM_ONBOARDING §11：ax 線上架卡的藝人補排藝人介紹。一批一號、批號由參數指定（PLAN：ax1→ar-d-261、ax2→ar-d-262）。
//   node batch-progress/apex-new-20261104/cut-artist-intros-ax.mjs add-20261104-ax1 ar-d-261
// 扣掉已有介紹、progress.json 已排隊、aliases 別名鍵與 Various Artists；剩下的寫 roster-<axN>.json（tier D）、progress 追加（state: cut）、cut/<批>.txt。冪等。
import fs from 'node:fs';
const [B, batch] = process.argv.slice(2);
const short = B.replace(/^add-\d{8}-/, '');
const K = s => s.normalize('NFC').trim().toLowerCase();
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const have = new Set();
for (const f of fs.readdirSync('data/artist-intros')) if (/^[0-9a-f]{2}\.json$/.test(f)) for (const k of Object.keys(J('data/artist-intros/' + f).entries)) have.add(k);
const P = 'desc-tools/batches/artist/progress.json', prog = J(P);
const queued = new Set(prog.batches.filter(b => b.batch !== batch).flatMap(b => b.keys));
const al = J('desc-tools/batches/artist/aliases.json'), alk = new Set(Object.keys(al.aliases || al));
const seed = J('seed_cards.json');
const script = s => /[฀-๿]/.test(s) ? 'other' : /[Ѐ-ӿ]/.test(s) ? 'cyr' : /[぀-ヿ]/.test(s) ? 'ja' : /[가-힯]/.test(s) ? 'ko' : /[一-鿿]/.test(s) ? 'zh' : 'latin';
const mf = { albums: J(process.argv[4]) };
const picked = [];
for (const a of mf.albums) {
  const k = K(a.artist);
  if (k === 'various artists' || have.has(k) || queued.has(k) || alk.has(k) || picked.some(p => p.key === k)) continue;
  const rows = seed.filter(r => K(r[0]) === k), yrs = rows.map(r => +r[6]).filter(Boolean);
  const g = {}; for (const r of rows) { const x = (r[5] || [])[0]; if (x) g[x] = (g[x] || 0) + 1; }
  picked.push({ key: k, name: a.artist, variants: null, cards: rows.length, tier: 'D', mainGenre: Object.entries(g).sort((x, y) => y[1] - x[1])[0]?.[0] || 'experimental',
    yearMin: yrs.length ? Math.min(...yrs) : null, yearMax: yrs.length ? Math.max(...yrs) : null, script: script(a.artist), classicalPerformer: !!a.composer,
    collab: /\s(&|with|y|et)\s|,/.test(a.artist), sampleAlbums: rows.slice(0, 3).map(r => r[1]), addedBy: B });
}
const RF = `batch-progress/artist-intro/roster-${short}.json`;
fs.writeFileSync(RF, JSON.stringify({ generatedAt: new Date().toISOString(), source: process.argv[4], addedBy: B, artists: picked.length, entries: picked }, null, 1) + '\n');
prog.batches = prog.batches.filter(b => b.batch !== batch);
prog.batches.push({ batch, tier: 'D', genres: [...new Set(picked.map(e => e.mainGenre))], keys: picked.map(e => e.key), state: 'cut',
  note: `新頂點盤線（異端）${B} 上架卡缺介紹的藝人（ALBUM_ONBOARDING §11；${picked.length} 位；名冊 ${RF}）` });
fs.writeFileSync(`desc-tools/batches/artist/cut/${batch}.txt`, picked.map(e => e.key).join('\n') + '\n');
prog.updatedAt = new Date().toISOString();
fs.writeFileSync(P, JSON.stringify(prog, null, 1) + '\n');
console.log(batch, 'picked', picked.length, '｜skip', mf.albums.length - picked.length);
