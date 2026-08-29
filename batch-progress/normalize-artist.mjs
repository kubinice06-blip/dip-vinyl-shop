// 掛名分裂防護：新卡的 artist 若與池內既有掛名指同一人但寫法不同，一律改用**池內既有寫法**。
//
// 為什麼是這個方向：卡片主鍵是 artist|album 字串，寫法不同就是兩個藝人——玩家端會看到
// 同一位演奏者裂成兩個，而組裝器的 already-apex 檢查也擋不下來
// （audits/pool-artist-name-splits.md 記錄過 6 組這種重複）。修既有卡屬線上資料操作、
// 雲端不得為之，所以新卡遷就舊卡是唯一能在雲端做完的正確解。
//
// 用法：node batch-progress/normalize-artist.mjs <檔案...>   加 --write 才實際改檔
import fs from 'node:fs';
import { loadPool, fold } from './lib.mjs';

const write = process.argv.includes('--write');
const files = process.argv.slice(2).filter(a => !a.startsWith('--'));
const { all } = loadPool();
const poolArtists = [...new Set(all.map(r => r.artist))];

// 摺疊後去掉所有非字母數字，用來判斷「是不是同一人的不同寫法」
const flat = s => fold(s).replace(/[^\p{L}\p{N}]+/gu, '');
// CJK 一個字的資訊量遠高於一個拉丁字母（「鄧麗君」三字就足以唯一指認），
// 純用字元數當門檻會讓 CJK 名字全部被擋掉。改用加權長度：CJK 記 2、其餘記 1。
const units = s => [...s].reduce((n, c) => n + (/[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/.test(c) ? 2 : 1), 0);
const poolIdx = poolArtists.map(a => ({ raw: a, f: flat(a) }));

let changed = 0, checked = 0;
for (const f of files) {
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const a of j.albums || []) {
    checked++;
    const fa = flat(a.artist);
    if (!fa) continue;
    // 完全相同就不用管
    if (poolIdx.some(p => p.f === fa)) continue;
    // 合作卡（A & B、A / B）不是掛名分裂，是真的多位演奏者，一律不動
    if (/[&\/]|、/.test(a.artist)) continue;
    // 雙語掛名的形態是「中文＋拉丁」或「拉丁＋中文」相接，所以要求是前綴或後綴關係
    // （只用 includes 會讓 S.E.N.S. 對上 E SENS 這種無關的短名）。
    // 並要求兩邊都夠長、且差異部分本身長到像個名字，避免差一個字母就被改掉。
    const cand = poolIdx.filter(p => {
      if (p.f === fa) return false;
      const [long, short] = p.f.length >= fa.length ? [p.f, fa] : [fa, p.f];
      if (!long.startsWith(short) && !long.endsWith(short)) return false;
      if (units(short) < 5) return false;
      return units(long.replace(short, '')) >= 3;
    });
    if (cand.length !== 1) {
      if (cand.length > 1) console.log(`  ？ ${a.artist}：池內有多個相近掛名，需人工判 → ${cand.map(c => c.raw).join('、')}`);
      continue;
    }
    const to = cand[0].raw;
    console.log(`  ✎ ${f.replace(/^.*batch-progress\//, '')}：「${a.artist}」→「${to}」（池內既有寫法）`);
    a.artistOriginal = a.artist;
    a.artist = to;
    a.namingNote = `${a.namingNote ? a.namingNote + '｜' : ''}掛名改用池內既有寫法「${to}」（原擬「${a.artistOriginal}」），避免同一位藝人因寫法不同在卡池裂成兩個鍵。`;
    changed++;
  }
  if (write) fs.writeFileSync(f, JSON.stringify(j, null, 1));
}
console.log(`\n檢查 ${checked} 張｜需改掛名 ${changed} 張｜${write ? '已寫回' : '（乾跑，加 --write 才改檔）'}`);
