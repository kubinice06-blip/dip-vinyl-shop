// 落實 c-53 主線裁定。冪等。
import fs from 'node:fs';
const P = 'batch-progress/c53/prop-b.json';
const rows = JSON.parse(fs.readFileSync(P, 'utf8'));

// ── 裁定 5：Высоцкий《Алиса в Стране чудес》剔除 ──
// 1976 原盤在 MB 是 primary-type Other＋Audiobook、五人共同掛名——那是一張
// радиоспектакль（廣播劇唱片），不是他的專輯。標成 Compilation 只是為了通過
// 驗證器（只收 Album／Compilation），但它不是合輯而是一部完整的單一作品；
// 為了過關而改分類等於用假類別描述真唱片。卡池要不要收廣播劇是店主的分類決定。
const DROP = 'Владимир Высоцкий|Алиса в Стране чудес';
const kept = rows.filter(r => `${r.artist}|${r.album}` !== DROP);
console.log(`剔除 Алиса в Стране чудес：${rows.length} → ${kept.length}`);

// ── 裁定 7：兩張高風險卡的辨識完全靠目錄號，要進身分註記不能只留在 risk ──
// risk 是給人看的，mbNote 才是給下游用的。
const CATNO = [
  { key: 'Муслим Магомаев|Муслим Магомаев', cat: 'Мелодия Д 028603-4',
    why: '自我同名卡，且名下有 2010 年二十餘筆同樣單掛他名字的主題精選、2020 年 Мелодия 又把同一張碟改名成《«Чёртово колесо» и другие песни》再版。辨識唯一可靠的錨點是目錄號。' },
  { key: 'Жанна Бичевская|Поет Жанна Бичевская', cat: 'Мелодия С60-05123-4',
    why: 'MB 另有一個 1980 年的 release-group 登錄同一組目錄號（С60—05123-24），極可能是同一張唱片被建成兩筆。兩者不可同收，本批只收 1974 這張。' },
];
let n = 0;
for (const r of kept) for (const c of CATNO) {
  if (`${r.artist}|${r.album}` !== c.key) continue;
  const tag = `【目錄號 ${c.cat}】${c.why}`;
  if ((r.mbNote || '').includes(c.cat)) continue;
  r.mbNote = tag + ' ' + (r.mbNote || '');
  n++;
}
console.log(`目錄號寫進 mbNote：${n} 張`);
fs.writeFileSync(P, JSON.stringify(kept, null, 1));
