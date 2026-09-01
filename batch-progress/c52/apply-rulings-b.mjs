// 落實 b 組研究層的裁定。冪等。
import fs from 'node:fs';
const readJ = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const writeJ = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 1));
const FILES = ['desc-tools/batches/cards/c52-cards.json', 'batch-progress/c52/group-b.json', 'batch-progress/c52/identity.json'];

// ── 裁定一：simakDialog《Baur》的策展理由被兩份內頁證據推翻 ──
// curatorWhy 說本作把巽他 kendang 編進節奏組。但印尼文維基（引內頁）與
// Irama Nusantara 的實體內頁掃描都只列 Arie Ayunir 的一般爵士鼓組，沒有 kendang；
// 雙 kendang 是後來 MoonJune 時期的配置。curatorWhy 會餵給 hook 層，必須改掉。
const FIX_WHY = [{
  key: 'simakDialog|Baur',
  to: '印尼當代 fusion 的代表作，1999 年由 Chico & Ira Productions 發行。注意：原策展理由說本作把巽他 kendang 編進節奏組，但印尼文維基與 Irama Nusantara 兩份內頁證據都只列一般爵士鼓組——雙 kendang 是後來 MoonJune 時期的配置，本作不得提 kendang 或甘美朗。',
}];
for (const p of FILES) {
  const rows = readJ(p); let n = 0;
  for (const r of rows) for (const f of FIX_WHY) {
    if (`${r.artist}|${r.album}` !== f.key) continue;
    const field = 'curatorWhy' in r ? 'curatorWhy' : 'why';
    if (r[field] !== f.to) { r[field] = f.to; n++; }
  }
  if (n) { writeJ(p, rows); console.log(`  ${p}: 換 simakDialog 策展理由`); }
}

// ── 裁定二：Keenan《Di Batas Angan Angan》的封面來自 2015 再版，且再版不是同一份曲目 ──
// Joey Ayala 先例的前提是「曲目相同、作品沒有跑掉」，這張不成立：
// 1978 原盤卡帶 14 軌、2015 再版只有 8 軌且選曲不同。rgMbid 仍可留用
// （指的是同一部作品），但那張 CAA 封面是再版的封面，未必是 1978 原盤的封面。
const cards = readJ('desc-tools/batches/cards/c52-cards.json');
let flagged = 0;
for (const c of cards) {
  if (`${c.artist}|${c.album}` !== 'Keenan Nasution|Di Batas Angan Angan') continue;
  if (c.cover && c.coverVersionDoubt !== true) {
    c.coverVersionDoubt = true;
    c.coverNote = '封面取自 MB 上唯一的 release-group，那是 2015 年再版（8 軌），與 1978 原盤（14 軌）選曲不同。§4 要求核對版本，本張交本機以實體圖比對後決定。';
    flagged++;
  }
}
if (flagged) { writeJ('desc-tools/batches/cards/c52-cards.json', cards); console.log(`  標記封面版本存疑：${flagged} 張`); }

// 同樣標記 Rhoma Irama《Darah Muda》——裁定 5 已判定它只拿得到再發版封面
for (const c of cards) {
  if (`${c.artist}|${c.album}` !== 'Rhoma Irama|Darah Muda') continue;
  if (c.cover && c.coverVersionDoubt !== true) {
    c.coverVersionDoubt = true;
    c.coverNote = 'CAA 無圖，唯一候選封面來自 Spotify 的 1976 年再發版，卡片年份為 1975。交本機比對後決定。';
    writeJ('desc-tools/batches/cards/c52-cards.json', cards);
    console.log('  標記封面版本存疑：Rhoma Irama《Darah Muda》');
  }
}
console.log('\n完成。');
