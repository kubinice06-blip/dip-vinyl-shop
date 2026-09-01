// 落實 a 組研究層的裁定。全部具冪等性，重跑不會累加。
import fs from 'node:fs';
const readJ = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const writeJ = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 1));

// ── 裁定一：Duo Kribo《Duo Kribo》(1978) 與線上池撞卡，剔除 ──
// 池中已有 ["Duo Kribo","Duo Kribo (Original Soundtrack)",…,1978]，就是同一張碟。
// 原本的去重用 `artist|album` 完全字串比對，尾綴不同就漏了——§1 明文警告的那類。
const DROP = 'Duo Kribo|Duo Kribo';
const targets = [
  ['desc-tools/batches/cards/c52-cards.json', c => `${c.artist}|${c.album}`],
  ['batch-progress/c52/group-a.json', c => `${c.artist}|${c.album}`],
  ['batch-progress/c52/identity.json', c => `${c.artist}|${c.album}`],
  ['desc-tools/batches/research/c52-a.json', c => `${c.artist}|${c.album}`],
];
for (const [p, keyOf] of targets) {
  if (!fs.existsSync(p)) { console.log(`  （略過，檔案不存在）${p}`); continue; }
  const rows = readJ(p);
  const before = rows.length;
  const kept = rows.filter(r => keyOf(r) !== DROP);
  if (kept.length !== before) { writeJ(p, kept); console.log(`  ${p}: ${before} → ${kept.length}`); }
  else console.log(`  ${p}: 已無該筆（${before} 張）`);
}

// ── 裁定二：Koes Plus《Volume 4》年份 1971 → 1972 ──
// id.wiki（引 Ginting《Musisiku》p.59）與 Discogs 原盤都記 1972；1971 只出現在
// RS150 的表列與無來源的 Wikidata，且研究層判定 1971 是**錄音年**。
// 這張走人工身分路線、沒有釘 MBID，故改年份不會與 MB 產生內部矛盾。
const YEARS = [{ key: 'Koes Plus|Volume 4', from: 1971, to: 1972 }];
for (const p of ['desc-tools/batches/cards/c52-cards.json', 'batch-progress/c52/group-a.json', 'batch-progress/c52/identity.json']) {
  const rows = readJ(p); let n = 0;
  for (const r of rows) for (const y of YEARS) {
    if (`${r.artist}|${r.album}` !== y.key) continue;
    if (r.year !== y.from && r.year !== y.to)
      throw new Error(`${p} 的 ${y.key} 年份是 ${r.year}，既非預期原值 ${y.from} 也非目標值 ${y.to}，停手`);
    if (r.year === y.from) { r.year = y.to; n++; }
  }
  if (n) { writeJ(p, rows); console.log(`  ${p}: 改年份 ${n} 筆`); }
}

// ── 裁定三：Barong's Band 的策展理由查無來源，換掉 ──
// 研究層查不到任何來源支持「巴里島 barong 面具舞」的說法；可證實的是樂團在
// 德國科隆組成（前身 Kopfjaeger）、本作編曲取材 J.S. Bach（唱片背面明載）。
// curatorWhy 會餵給 hook 層，留著錯的說法等於讓下游照著寫錯。
const BARONG = "Barong's Band|Barong's Band";
const NEW_WHY = '在德國科隆組成的印尼樂團（前身 Kopfjaeger），1976 年的自我同名作以 J.S. Bach 的素材做前衛搖滾編曲，唱片背面明載取材來源。與巴里島的 barong 面具舞無關——原策展理由的那個聯想查無任何來源支持。';
for (const p of ['desc-tools/batches/cards/c52-cards.json', 'batch-progress/c52/group-a.json', 'batch-progress/c52/identity.json']) {
  const rows = readJ(p); let n = 0;
  for (const r of rows) {
    if (`${r.artist}|${r.album}` !== BARONG) continue;
    const f = 'curatorWhy' in r ? 'curatorWhy' : 'why';
    if (r[f] !== NEW_WHY) { r[f] = NEW_WHY; n++; }
  }
  if (n) { writeJ(p, rows); console.log(`  ${p}: 換 Barong's Band 策展理由`); }
}
console.log('\n完成。');
