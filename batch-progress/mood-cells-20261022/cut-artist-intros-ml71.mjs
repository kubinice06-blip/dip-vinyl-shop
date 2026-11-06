// ALBUM_ONBOARDING §11：ml71／ml72 上架卡的新藝人切 ar-d-527（ml71）、ar-d-528（ml72）。讀卡單（上線前可跑），冪等。
//   node batch-progress/mood-cells-20261022/cut-artist-intros-ml71.mjs
import fs from 'node:fs';
const K = s => s.normalize('NFC').trim().toLowerCase();
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const have = new Set();
for (const f of fs.readdirSync('data/artist-intros')) if (/^[0-9a-f]{2}\.json$/.test(f)) for (const k of Object.keys(J('data/artist-intros/' + f).entries)) have.add(k);
const P = 'desc-tools/batches/artist/progress.json', prog = J(P);
const al = J('desc-tools/batches/artist/aliases.json'), alk = new Set(Object.keys(al.aliases || al));
const seed = J('seed_cards.json');
const PLAN = [['add-20261106-ml71', 'ar-d-527'], ['add-20261106-ml72', 'ar-d-528']];
const queued = new Set(prog.batches.filter(b => !PLAN.some(p => p[1] === b.batch)).flatMap(b => b.keys));
const picked = new Set();
for (const [B, AR] of PLAN) {
  const cards = J(`desc-tools/batches/cards/${B}-cards.json`);
  const ents = [];
  for (const c of cards) {
    const k = K(c.artist);
    if (have.has(k) || queued.has(k) || alk.has(k) || picked.has(k)) continue;
    picked.add(k);
    const mine = cards.filter(x => K(x.artist) === k), rows = seed.filter(r => K(r[0]) === k);
    const yrs = [...rows.map(r => +r[6]), ...mine.map(x => +x.year)].filter(Boolean);
    ents.push({ key: k, name: c.artist, variants: null, cards: rows.length + mine.length, tier: 'D', mainGenre: c.genres[0],
      yearMin: Math.min(...yrs), yearMax: Math.max(...yrs), script: 'latin', classicalPerformer: false,
      collab: /\s(&|and|×|with)\s|\s\/\s|,/.test(c.artist), sampleAlbums: [...mine.map(x => x.album), ...rows.map(r => r[1])].slice(0, 3), addedBy: B });
  }
  const RF = `batch-progress/artist-intro/roster-${B.split('-').pop()}-${AR}.json`;
  fs.writeFileSync(RF, JSON.stringify({ generatedAt: '2026-11-06', source: `desc-tools/batches/cards/${B}-cards.json`, addedBy: B, artists: ents.length, entries: ents }, null, 1) + '\n');
  const rec = { batch: AR, tier: 'D', genres: [...new Set(cards.map(x => x.genres[0]))], keys: ents.map(e => e.key), state: 'cut',
    note: `情緒薄格策展線（Bandcamp downtempo 候選）${B} 上架卡缺介紹的藝人（ALBUM_ONBOARDING §11；${ents.length} 位；名冊 ${RF}）` };
  const i = prog.batches.findIndex(b => b.batch === AR);
  if (i >= 0) prog.batches[i] = { ...prog.batches[i], ...rec, state: prog.batches[i].state }; else prog.batches.push(rec);
  fs.mkdirSync('desc-tools/batches/artist/cut', { recursive: true });
  fs.writeFileSync(`desc-tools/batches/artist/cut/${AR}.txt`, ents.map(e => e.key).join('\n') + '\n');
  console.log(AR, ents.length, ents.map(e => e.name).join('、'));
}
prog.updatedAt = new Date().toISOString();
fs.writeFileSync(P, JSON.stringify(prog, null, 1) + '\n');
