#!/usr/bin/env node
// worker 的曲風對應把 Last.fm 標籤「paul chambers」（貝斯手的名字）當成 chamber（室內樂）算進 classical。
// 這支找出「classical 只靠 chambers 這個姓命中」的卡，把卡池的 classical 拿掉，並產出 mapgenre3 的更正值。
//
//   node audits/pub-fix/chambers-classical-fix.mjs            乾跑，只列清單
//   node audits/pub-fix/chambers-classical-fix.mjs --write    改 seed_cards.json、寫出 KV 更正檔與前後紀錄
//
// 只動符合下列全部條件的列：卡池曲風含 classical；標籤裡有 chambers 這個姓；
// 把那些標籤排除後，沒有任何標籤命中 classical 規則。chamber jazz／chamber pop／orchestral jazz 命中的不在此列。
import fs from 'node:fs';

const WRITE = process.argv.includes('--write');
// 與 dip-vinyl-worker/src/index.js 的 musicMapGenres 相同
const rules = {
  jazz: /jazz|bebop|swing|fusion|bossa|hard bop|爵士/,
  rock: /rock|indie|alternative|punk|metal|shoegaze|post-punk|grunge|garage|搖滾|龐克|金屬/,
  electronic: /electronic|ambient|techno|house|idm|drum and bass|synth|electro|trance|dubstep|industrial|電子|氛圍/,
  soul: /soul|funk|disco|motown|靈魂|放克|迪斯可/,
  hiphop: /hip[ -]?hop|rap|r&b|rnb|rhythm\s+(?:and|&)\s+blues|trap|嘻哈|饒舌/,
  folk: /folk|singer-songwriter|country|bluegrass|americana|acoustic|民謠|鄉村/,
  classical: /classical|orchestra|symphony|chamber|baroque|minimalism|opera|古典|交響|室內樂/,
  world: /world|latin|brazilian|afro|reggae|flamenco|cumbia|salsa|indian|arab|turkish|雷鬼|拉丁|世界/,
  pop: /mandopop|cantopop|c-pop|city ?pop|j-?pop|k-?pop|synth-?pop|(^|[^a-z])pop($|[^a-z])|流行/,
  blues: /blues|delta|boogie|藍調/,
};
const SURNAME = /chambers/;
function map(raw, fixed) {
  const scores = Object.fromEntries(Object.keys(rules).map(id => [id, 0]));
  for (const tag of (raw || []).map(t => String(t).toLowerCase())) {
    const bluesSafe = tag.replace(/rhythm\s+(?:and|&)\s+blues/g, '');
    for (const [id, re] of Object.entries(rules)) {
      if (fixed && id === 'classical' && SURNAME.test(tag) && !re.test(tag.replace(/chambers/g, ''))) continue;
      if (re.test(id === 'blues' ? bluesSafe : tag)) scores[id]++;
    }
  }
  return Object.keys(rules).filter(id => scores[id] > 0).sort((a, b) => scores[b] - scores[a]).slice(0, 2);
}

const seedRaw = fs.readFileSync('seed_cards.json', 'utf8');
const seed = JSON.parse(seedRaw);
const cache = JSON.parse(fs.readFileSync('data/rawgenres-cache.json', 'utf8'));
const fixes = [];
for (const r of seed) {
  if (!r[5].includes('classical')) continue;
  const c = cache[`${r[0]}|${r[1]}`.toLowerCase()];
  const raw = c?.rawGenres || [];
  if (!raw.some(t => SURNAME.test(String(t).toLowerCase()))) continue;
  const after = map(raw, true);
  if (after.includes('classical')) continue;                   // 另有真的古典標籤，不動
  let next = r[5].filter(g => g !== 'classical');
  if (!next.length) next = after.length ? after : ['jazz'];     // 只剩 classical 的 8 張全是硬咆勃，標籤空的補 jazz
  fixes.push({ artist: r[0], album: r[1], before: r[5], after: next, kvBefore: c.genres, kvAfter: after.length ? after : ['jazz'], rawGenres: raw });
}
console.log(`符合條件 ${fixes.length} 張`);
for (const f of fixes) console.log(`  ${f.artist}《${f.album}》 ${JSON.stringify(f.before)} → ${JSON.stringify(f.after)}`);

if (WRITE) {
  let out = seedRaw, n = 0;
  for (const f of fixes) {
    const row = seed.find(r => r[0] === f.artist && r[1] === f.album);
    const oldLine = JSON.stringify(row);
    const newLine = JSON.stringify(row.map((v, i) => i === 5 ? f.after : v));
    if (out.split(oldLine).length !== 2) throw new Error('卡池列不是唯一：' + oldLine);
    out = out.replace(oldLine, () => newLine); n++;
  }
  if (JSON.parse(out).length !== seed.length) throw new Error('列數變了');
  fs.writeFileSync('seed_cards.json', out);
  fs.mkdirSync('publish-stage/chambers-fix-20261005', { recursive: true });
  fs.writeFileSync('publish-stage/chambers-fix-20261005/kv-puts.json', JSON.stringify(fixes.map(f => ({
    key: `mapgenre3:${f.artist}|${f.album}`.toLowerCase(), value: JSON.stringify({ genres: f.kvAfter, rawGenres: f.rawGenres }),
  })), null, 1));
  fs.writeFileSync('audits/pub-fix/chambers-classical-fix-20261005.json', JSON.stringify(fixes.map(({ rawGenres, ...f }) => f), null, 1) + '\n');
  console.log(`已改卡池 ${n} 列；KV 更正檔 publish-stage/chambers-fix-20261005/kv-puts.json`);
}
