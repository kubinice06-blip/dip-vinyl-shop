// 落實 c-54 主線裁定。冪等。
import fs from 'node:fs';
const P = 'batch-progress/c54/prop-a.json';
const rows = JSON.parse(fs.readFileSync(P, 'utf8'));

// ── 裁定 1：三筆的辨識完全靠目錄號或 MBID，要進 mbNote 不能只留在 risk ──
// 比照 c-53 第 7 條：risk 是給人看的，mbNote 才是給下游用的。
const PIN = [
  { key: 'Katarina II|Katarina II',
    tag: '【身分錨點：目錄號 ZKP RTVL LD 0954】與 Ekatarina Velika 1985 年那張自我同名盤是同一批人、同一家廠牌、兩張都自我同名，且本作日後被改名成《Ekatarina Velika》再版——兩張卡在字串層面會互相塌陷。唯一能分開的是目錄號（本作 LD 0954、1985 那張 LD 1257）。' },
  { key: 'Ekatarina Velika|Ekatarina Velika',
    tag: '【身分錨點：目錄號 ZKP RTVL LD 1257】與 Katarina II 1984 年那張自我同名盤的關係見該卡註記；唯一能分開兩者的是目錄號。' },
  { key: 'Film|Zona sumraka',
    tag: '【身分錨點：release-group MBID 500150de-7d2e-4581-a75d-2b868865d429，務必以 MBID 為主鍵】掛名「Film」是全批最糟的查詢字串：MB 上克羅埃西亞的 Film、希臘的 Film、Film Film 三者 score 都 ≥94，加上 film 這個詞本身。任何走字串搜尋的封面／試聽／評分管線都會誤配。' },
  { key: 'YU Grupa|YU Grupa',
    tag: '【身分錨點：目錄號 PGP-RTB LPY S 61028】樂團有兩張自我同名長片（1973 LPY S 61028、1975 LSY 63048），本批只收 1973 那張。' },
];
let n = 0;
for (const r of rows) for (const p of PIN) {
  if (`${r.artist}|${r.album}` !== p.key) continue;
  if ((r.mbNote || '').startsWith('【身分錨點')) continue;
  r.mbNote = p.tag + ' ' + (r.mbNote || '');
  n++;
}
console.log(`身分錨點寫進 mbNote：${n} 張`);
fs.writeFileSync(P, JSON.stringify(rows, null, 1));

// 驗一下 queryAlias 還在
const alias = rows.filter(r => r.queryAlias);
console.log(`queryAlias：${alias.length} 張` + (alias.length ? ` — ${alias.map(r => `${r.artist} → ${r.queryAlias}`).join('、')}` : ''));
