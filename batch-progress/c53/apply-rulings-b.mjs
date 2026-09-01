// 落實 c-53 b 組研究層的更正。冪等。
// 兩個 curatorWhy 被研究層以來源推翻。curatorWhy 會餵給 hook 層，
// 留著錯的說法下游就會照著寫錯——這是 c-52 已經學過的教訓。
import fs from 'node:fs';
const FIX = [
  { key: 'Эдуард Артемьев|Картины-настроения',
    to: '九部電影（《Сибириада》《Сталкер》《Лунная радуга》等）的電子音樂選輯。注意：原策展理由說本作「脫離電影委託、以自己名義單獨發行」，俄文維基的曲目來源顯示不是——它就是電影配樂的重組選輯。' },
  { key: 'София Ротару|Червона рута',
    to: '烏克蘭／摩爾多瓦裔歌手的代表作，封面正面印《Червона рута》、封底與唱片標籤印《Співає Софія Ротару》。注意：原策展理由說「全碟以烏克蘭語演唱 Івасюк 的作品」不準——烏克蘭文維基的曲目表顯示 13 首裡烏克蘭語 5 首、俄語 5 首、摩爾多瓦語 2 首、羅馬尼亞語 1 首，Івасюк 的作品只有 3 首。' },
];
let n = 0;
for (const p of ['desc-tools/batches/cards/c53-cards.json', 'batch-progress/c53/prop-b.json']) {
  const rows = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const r of rows) for (const f of FIX) {
    if (`${r.artist}|${r.album}` !== f.key) continue;
    const field = 'curatorWhy' in r ? 'curatorWhy' : 'why';
    if (r[field] !== f.to) { r[field] = f.to; n++; }
  }
  fs.writeFileSync(p, JSON.stringify(rows, null, 1));
}
console.log(`更正策展理由：${n} 處`);
