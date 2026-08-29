// 切卡單：候選檔 → desc-tools/batches/cards/<批名>-cards.json
// key 規則：拉丁鍵用 desc2:、含 CJK 的鍵用 desc4:（見 ALBUM_ONBOARDING.md §0.5）。
// 每批 50 張上限（dip-desc-restyle skill 的規定）。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const CJK = /[㐀-鿿぀-ヿ가-힯]/;

// 候選檔的 versionNote 會如實記錄 MusicBrainz 的掛名，而古典 RG 的掛名常是西里爾字母
// （「Модест Петрович Мусоргский」）。那是正當的資料記錄，但送進簡介產線後
// qa-batch 的行文污染掃描會把它當雜訊標記。卡單改帶拉丁描述、候選檔保留原文。
const CYRILLIC_NAMES = {
  'Модест Петрович Мусоргский': 'Modest Petrovich Mussorgsky',
  'Игорь Фёдорович Стравинский': 'Igor Fyodorovich Stravinsky',
};
const deCyrillic = s => {
  let t = String(s || '');
  for (const [ru, la] of Object.entries(CYRILLIC_NAMES)) t = t.split(ru).join(`${la}（MB 以西里爾字母登錄）`);
  // 仍有殘留就整段標明，不留裸露的西里爾字母
  return t.replace(/[Ѐ-ӿ][Ѐ-ӿ\s]*/g, '［西里爾字母原文，見候選檔］');
};
const OUT = path.join(ROOT, 'desc-tools/batches/cards');
fs.mkdirSync(OUT, { recursive: true });

// 每批 50 張上限。切批時盡量不打散子域——同一子域的卡分散到不同批，
// 跨批的通論分配與同藝人排除條款會難以規劃（skill「開工前」第 2 點的通論帳本）。
const BATCHES = {
  c48a: ['c48/cand-A.json', 'c48/cand-B.json'],   // 軸線 1 作曲家正典（43）
  c48b: ['c48/cand-C.json'],                       // 軸線 2／3 文藝復興＋歌劇芭蕾（32）
  c48c: ['c48/cand-D.json'],                       // 軸線 4／5／6 當代＋演奏家＋華人（22）
  c49a: ['c49/cand-D.json', 'c49/cand-FG.json'],   // 時代曲＋原民客語電影配樂（39）
  c49b: ['c49/cand-E.json', 'c49/cand-A.json', 'c49/cand-I.json'], // 台語＋粵語＋星馬（47）
};

let grand = 0;
for (const [batch, files] of Object.entries(BATCHES)) {
  const cards = [];
  for (const f of files) {
    const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'batch-progress', f), 'utf8'));
    for (const a of j.albums || []) {
      const raw = `${a.artist}|${a.album}`;
      cards.push({
        key: (CJK.test(raw) ? 'desc4:' : 'desc2:') + raw,
        artist: a.artist, album: a.album, year: a.suggestedYear,
        genre: a.genreFamily === 'classical' ? 'classical' : 'chinese',
        composer: a.composer || '',
        label: a.label || '',
        // 派工特注的素材：策展層查到的版本裁定與風險，研究層要據此查證而非重新猜
        versionNote: deCyrillic(a.versionNote), yearNote: deCyrillic(a.yearNote),
        curatorWhy: deCyrillic(a.curatorWhy), curatorRisk: deCyrillic(a.curatorRisk),
        apex: a.apexCandidate?.eligible ? a.apexCandidate.tier : null,
      });
    }
  }
  fs.writeFileSync(path.join(OUT, `${batch}-cards.json`), JSON.stringify(cards, null, 1));
  const cjk = cards.filter(c => c.key.startsWith('desc4:')).length;
  console.log(`${batch}-cards.json：${cards.length} 張（desc2 ${cards.length - cjk}／desc4 ${cjk}）`);
  grand += cards.length;
}
console.log(`\n合計 ${grand} 張`);

// 鍵唯一性檢查——重複鍵會讓 KV 後寫的蓋掉先寫的，靜默掉卡
const all = fs.readdirSync(OUT).filter(f => /-cards\.json$/.test(f))
  .flatMap(f => JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8')).map(c => c.key));
const dup = all.filter((k, i) => all.indexOf(k) !== i);
console.log(dup.length ? `⚠ 重複鍵 ${dup.length}：${[...new Set(dup)].join('、')}` : '鍵唯一性檢查：通過');
