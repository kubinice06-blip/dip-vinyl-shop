#!/usr/bin/env node
// 2026-10-04 拆卡（同名不同人）的善後：拆出來的卡帶著「另一個同名藝人」的曲風標籤。
// KV 的 mapgenre3 是用舊掛名去查 Spotify／Last.fm 得來的，所以泰國的 Caravan 拿到坎特伯里前衛搖滾的標籤、
// 比利時的 Placebo 拿到 britpop、古典吉他手 John Williams 拿到 Star Wars。子曲風表重建時會照這些標籤歸類。
// 這支把標籤與池中曲風改成這張碟自己的，並在 genre-artist-map.json 補上查不到標籤時的落點。
//
// 用法：node audits/pub-fix/split-genre-fix.mjs [--write | --verify]
import fs from 'node:fs';
const WRITE = process.argv.includes('--write'), VERIFY = process.argv.includes('--verify');
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const OUT = 'publish-stage/pub-fix-20261004';

// [藝人, 專輯, 池中曲風（null＝不動）, 標籤對應的大類, 原始標籤, 依據]
const FIX = [
  ['Caravan (Thailand)', 'คนกับควาย', ['folk', 'world'], ['folk', 'world'], ['thai', 'folk', 'phleng phuea chiwit', 'protest folk', 'world'],
    '泰國「生活之歌」（เพลงเพื่อชีวิต）的開山盤，木吉他民謠；原標籤是英國坎特伯里的 Caravan'],
  ['Placebo (Belgium)', '1973', ['jazz', 'soul'], ['jazz', 'soul'], ['jazz-funk', 'jazz rock', 'fusion', 'belgian'],
    'Marc Moulin 領軍的比利時 jazz-funk 團；原標籤是英國另類搖滾的 Placebo。同團《Ball of Eyes》本來就標 jazz'],
  ['Mother Earth (Tracy Nelson)', 'Living with the Animals', ['rock', 'blues'], ['rock', 'blues'], ['blues rock', 'country rock', 'classic rock', 'san francisco'],   // 不放 psychedelic rock：會被歸到迷幻搖滾，這團不是
    '1968 年舊金山的藍調搖滾團，Tracy Nelson 主唱；原標籤是 1990 年代英國 acid jazz 的 Mother Earth'],
  ['John Williams (guitarist)', 'Rodrigo: Concierto de Aranjuez', null, ['classical'], ['classical guitar', 'classical', 'spanish', 'concerto', '20th century classical'],
    '古典吉他手；原標籤是電影配樂家（Soundtrack／Star Wars／harry potter）'],
  ['Air (US jazz trio)', 'Air Mail', null, ['jazz'], ['free jazz', 'avant-garde jazz', 'aacm'],
    'Threadgill／Hopkins／McCall 的自由爵士三重奏；原標籤是法國電子二人組 Air'],
  ['Supershy', 'Happy Music', null, ['electronic'], ['house', 'disco', 'nu-disco', 'electronic'],
    'Tom Misch 化名的浩室／迪斯可專輯；原標籤是他本名下的 jazz／hip-hop'],
];
// 查不到標籤時的落點（genre-artist-map.json 只在標籤落空時生效）
const MAP = [['classical', 'John Williams (guitarist)', 'modern'], ['folk', 'Caravan (Thailand)', 'world-folk'], ['rock', 'Wings (Malaysia)', 'jrock-asia']];

const kvGet = async keys => (await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}/bulk/get`, {
  method: 'POST', headers: { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN, 'Content-Type': 'application/json' }, body: JSON.stringify({ keys }) })).json()).result.values;
const key = f => `mapgenre3:${f[0]}|${f[1]}`.toLowerCase();
const want = Object.fromEntries(FIX.map(f => [key(f), JSON.stringify({ genres: f[3], rawGenres: f[4] })]));
const live = await kvGet(Object.keys(want));

if (VERIFY) {
  const bad = Object.keys(want).filter(k => live[k] !== want[k]);
  console.log(`mapgenre3 ${Object.keys(want).length} 個鍵：一致 ${Object.keys(want).length - bad.length}｜不符 ${bad.length}`); bad.forEach(k => console.log('  ✗ ' + k));
  process.exit(bad.length ? 1 : 0);
}

const seedRaw = fs.readFileSync('seed_cards.json', 'utf8'), seed = JSON.parse(seedRaw);
const eol = /\r\n/.test(seedRaw) ? ',\r\n' : ',\n', tail = /\r?\n$/.exec(seedRaw)?.[0] || '';
const render = rows => '[' + rows.map(r => JSON.stringify(r)).join(eol) + ']' + tail;
if (render(seed) !== seedRaw) { console.error('✗ seed_cards.json 排版自檢失敗'); process.exit(1); }
const puts = [], backup = {};
for (const f of FIX) {
  const row = seed.find(r => r[0] === f[0] && r[1] === f[1]);
  if (!row) { console.error('✗ 池中找不到 ' + f[0] + '《' + f[1] + '》'); process.exit(1); }
  console.log(`${f[0]}《${f[1]}》　${f[5]}`);
  if (f[2] && JSON.stringify(row[5]) !== JSON.stringify(f[2])) { console.log(`   seed 曲風 ${JSON.stringify(row[5])} → ${JSON.stringify(f[2])}`); row[5] = f[2]; }
  const k = key(f);
  if (live[k] !== want[k]) { puts.push({ key: k, value: want[k] }); backup[k] = live[k] ?? null; console.log(`   標籤 ${String(live[k]).slice(0, 110)}\n      → ${want[k]}`); }
}
const mapRaw = fs.readFileSync('genre-artist-map.json', 'utf8'), map = JSON.parse(mapRaw);
for (const [g, a, node] of MAP) if (map[g][a] !== node) { console.log(`genre-artist-map  ${g}：${a} → ${node}`); map[g][a] = node; }

if (!WRITE) { console.log(`\n乾跑：mapgenre3 要寫 ${puts.length} 個鍵。加 --write 執行。`); process.exit(0); }
fs.writeFileSync('seed_cards.json', render(seed));
const ind = /^\{\r?\n( +)"/.exec(mapRaw)?.[1]?.length; let ms = JSON.stringify(map, null, ind) + (/\n$/.test(mapRaw) ? '\n' : ''); if (/\r\n/.test(mapRaw)) ms = ms.replace(/\n/g, '\r\n');
fs.writeFileSync('genre-artist-map.json', ms);
if (puts.length) { fs.mkdirSync(OUT, { recursive: true }); fs.writeFileSync(`${OUT}/splitgenre-kv-puts.json`, JSON.stringify(puts)); fs.writeFileSync(`${OUT}/splitgenre-kv-backup.json`, JSON.stringify(backup, null, 1)); }
console.log(`✓ 已改 seed_cards.json 與 genre-artist-map.json；KV bulk 檔在 ${OUT}/splitgenre-kv-puts.json（${puts.length} 筆）`);
