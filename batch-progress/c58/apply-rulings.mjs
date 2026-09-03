// 落實 c-58 研究層的更正。冪等。
// curatorWhy 會餵給 hook 層，留著錯的說法下游就會照著寫——這是第四批遇到同一件事。
import fs from 'node:fs';
const FIX = [
  { key: 'Nolan Porter|No Apologies',
    to: '洛杉磯的靈魂歌手，本作由 Gabriel Mekler 製作。**注意：原策展理由說〈If I Could Only Be Sure〉與〈Keep On Keeping On〉是本碟賣點，這兩首都不在這張 LP 上**（都是 45 轉單曲）；「Joy Division 現場翻唱」的說法也不準——實情是借用吉他樂句寫成〈Interzone〉。' },
  { key: 'The Voices of East Harlem|Right On Be Free',
    to: '東哈林區青少年合唱團的首作，錄於 Electric Lady、Eddie Kramer 收音，樂團曾在跨年夜替 Hendrix 暖場。**注意：原策展理由說〈Cashing In〉是本碟固定曲目，那首不在這張碟上**，是 1973 年 Just Sunshine 的單曲。' },
  { key: 'Purple Image|Purple Image',
    to: '底特律的迷幻放克團體。**注意：原策展理由有兩處錯——〈Living in the Ghetto〉只有 6 分 32 秒、並未佔掉整個 A 面，佔整面的是 B2〈Marching to a Different Drummer〉15 分 24 秒；2004 年 Radioactive 那版 Discogs 標為 Unofficial Release，正式復刻是 Tidal Waves 2019。**' },
  { key: "Doris Duke|I'm a Loser",
    to: 'Swamp Dogg 製作的深靈魂代表作。**注意：原策展理由說錄於 Muscle Shoals 一帶，實際錄於喬治亞州梅肯的 Capricorn Sound Studios**（Discogs 原盤與維基一致）。同批的 Sandra Phillips 那張同地，但 Sandra Wright《Wounded Woman》是另一地（Sheffield 的 Broadway Sound），三張不要寫成同一個錄音據點。' },
  { key: 'Sandra Wright|Wounded Woman',
    to: '1974 年 10 月錄於阿拉巴馬州 Sheffield 的 Broadway Sound Studio，但**母帶當年未發行**，1989 年才由 Demon 首度問世——卡片年份因此記 1989。**注意：與同批 Doris Duke、Sandra Phillips 兩張不是同一個錄音據點**（那兩張在喬治亞州梅肯的 Capricorn）。' },
];
let n = 0, miss = [];
for (const p of ['batch-progress/c58/prop-a.json', 'desc-tools/batches/cards/c58-cards.json']) {
  const rows = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const f of FIX) {
    const hit = rows.filter(r => `${r.artist}|${r.album}` === f.key);
    if (!hit.length) { if (!miss.includes(f.key)) miss.push(f.key); continue; }
    for (const r of hit) {
      const field = 'curatorWhy' in r ? 'curatorWhy' : 'why';
      if (r[field] !== f.to) { r[field] = f.to; n++; }
    }
  }
  fs.writeFileSync(p, JSON.stringify(rows, null, 1));
}
console.log(`更正策展理由 ${n} 處` + (miss.length ? `｜查無鍵：${miss.join('、')}` : ''));

// ── 變音符號統一：兩張巴西盤都保留 ç ──
// MB 原題、Discogs 原盤標題、葡文維基條目名都作《Maria Fumaça》。
// 策展層一張保留一張去掉，自承是「避免下游字串處理出錯」但沒說明為何另一張不比照。
// 規則早已定案（裁定第 6 條）：盤名採原始發行的寫法。去符號的形式歸 queryAlias。
for (const p of ['batch-progress/c58/prop-a.json', 'desc-tools/batches/cards/c58-cards.json']) {
  const rows = JSON.parse(fs.readFileSync(p, 'utf8'));
  let m = 0;
  for (const r of rows) {
    if (r.artist !== 'Banda Black Rio' || r.album !== 'Maria Fumaca') continue;
    r.album = 'Maria Fumaça';
    r.queryAlias = 'Maria Fumaca';
    if (r.key) r.key = r.key.replace('|Maria Fumaca', '|Maria Fumaça');
    m++;
  }
  if (m) { fs.writeFileSync(p, JSON.stringify(rows, null, 1)); console.log(`  ${p}: 盤名改回 Maria Fumaça，ASCII 形式歸 queryAlias`); }
}
