// c-48 候選收斂：四組版本鎖定產出 ＋ 主線的古典三軸（§0.7 錨點制）→ chk-cand.mjs 可驗的候選檔。
// 三軸的鍵是「artist|album」，而各組在版本鎖定時改過不少卡名，
// 所以要用代理回報的 artistOriginal／原名對回評分表；對不上的一律列出來，不靜默略過。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const DIR = path.join(ROOT, 'batch-progress/c48');
const ratings = JSON.parse(fs.readFileSync(path.join(DIR, 'ratings.json'), 'utf8'));
const seeds = JSON.parse(fs.readFileSync(path.join(DIR, 'seed-list.json'), 'utf8'));

// 種子的 (artist, album) → 三軸；改名後用 seedArtist/seedAlbum 或 artistOriginal 回查
const rateOf = a => ratings[`${a.artist}|${a.album}`]
  || ratings[`${a.artistOriginal || a.artist}|${a.album}`]
  || ratings[`${a.seedArtist || a.artist}|${a.seedAlbum || a.album}`]
  || null;

// 各組在版本鎖定時改過的卡名（取自各組回報的改名表）：新名 → 評分表的原鍵。
// 用明確對照而不是模糊比對——模糊比對在「Violin Concerto」這類通用曲名上會配錯。
const RENAMED = {
  'Academy of St Martin in the Fields Chamber Ensemble|Mendelssohn: Octet / String Quintet op. 87': 'Academy of St Martin in the Fields Chamber Ensemble|Mendelssohn: Octet',
  'Panocha Quartet|Dvořák: String Quartets "American" & "Slavonic"': 'Panocha Quartet|Dvořák: String Quartet "American"',
  'Herbert von Karajan|Tchaikovsky / Dvořák: Serenades for Strings': 'Herbert von Karajan|Tchaikovsky: Serenade for Strings',
  'Domus|Fauré: Piano Quartets': 'Domus|Fauré: Piano Quartet no. 1',
  'Jean-Philippe Collard|Fauré: 13 Nocturnes / Thème et variations': 'Jean-Philippe Collard|Fauré: Nocturnes',
  // 掛名更正：DG 1968 的莫札特單簧管五重奏獨奏是 de Peyer 不是 Leister（A、B 兩組獨立查證一致）
  'Gervase de Peyer & Amadeus Quartet|Mozart: Clarinet Quintet': 'Karl Leister & Amadeus Quartet|Mozart: Clarinet Quintet',
  'Grumiaux Trio|Mozart: Complete String Quintets': 'Grumiaux Ensemble|Mozart: String Quintets K. 515 & 516',
  'Pavel Haas Quartet|Janáček: String Quartet no. 2 "Intimate Letters" / Haas: String Quartet no. 2': 'Pavel Haas Quartet|Janáček: String Quartets 1 & 2',
  'Rudolf Firkušný|Janáček: On an Overgrown Path / In the Mists (DG 1971)': 'Rudolf Firkušný|Janáček: On an Overgrown Path',
  // C 組推翻主線裁定：L'homme armé 彌撒 MB 上其實有，不用替代盤
  "The Tallis Scholars|Josquin: L'homme armé Masses": 'The Tallis Scholars|Josquin: Missa Sine nomine / Missa Ad fugam',
  'The Hilliard Ensemble|Ockeghem: Requiem / Missa Mi-Mi': 'The Hilliard Ensemble|Ockeghem: Requiem',
  'Diabolus in Musica|Dufay: Missa Se la face ay pale': 'The Binchois Consort|Dufay: Missa Se la face ay pale',
  'Emma Kirkby & Anthony Rooley|Dowland: The English Orpheus': 'Emma Kirkby & Anthony Rooley|Dowland: Lute Songs',
  "Ensemble Organum|Chants de l'Église de Rome: Période byzantine": "Ensemble Organum|Chant de l'Église de Rome",
  'La Venexiana|Monteverdi: Selva morale e spirituale': 'Rinaldo Alessandrini|Monteverdi: Selva morale e spirituale',
  'Igor Stravinsky|Symphony of Psalms / Symphony in Three Movements (自指)': 'Igor Stravinsky|Stravinsky: Symphony of Psalms (自指)',
  'Orpheus Chamber Orchestra|Prokofiev: Classical Symphony / Bizet: Symphony in C / Britten: Simple Symphony': 'Orpheus Chamber Orchestra|Prokofiev: Symphony no. 1 "Classical"',
  'Marc Coppey|Dutilleux: Tout un monde lointain / Caplet: Épiphanie': 'Mstislav Rostropovich|Dutilleux: Tout un monde lointain',
  'Jacqueline du Pré & Daniel Barenboim|Brahms: Cello Sonatas nos. 1 & 2': 'Jacqueline du Pré & Daniel Barenboim|Brahms: Cello Sonatas',
  // 古典 artist 欄放指揮、作曲家進 composer 欄（§0.6），不再新增作曲家形態卡
  'Yan Liangkun 嚴良堃|黃自: 長恨歌': '黃自|長恨歌',
  // 池內同曲已有三版（Rubinstein 1967／Novaes 1957／Đặng Thái Sơn 1986），依古典慣例補錄音年括註
  "Fou Ts'ong 傅聰|Chopin: Nocturnes (1978)": "Fou Ts'ong 傅聰|Chopin: Nocturnes",
};

// 卡名改過之後對不上評分表時，退而用「同一軸線內作品側相同」找回
const flat = s => String(s).toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9㐀-鿿]+/g, '');
const workOf = s => { const i = String(s).indexOf(':'); return flat(i < 0 ? s : String(s).slice(i + 1)); };
const byWork = new Map();
for (const [k, v] of Object.entries(ratings)) {
  const [ra, rb] = k.split('|');
  const w = workOf(rb);
  if (!byWork.has(w)) byWork.set(w, []);
  byWork.get(w).push({ k, v, artist: ra });
}

let total = 0, matched = 0, unmatched = [];
for (const g of ['A', 'B', 'C', 'D']) {
  const src = JSON.parse(fs.readFileSync(path.join(DIR, `lock/out-${g}.json`), 'utf8'));
  const albums = [];
  for (const a of src.albums || []) {
    total++;
    let r = ratings[RENAMED[`${a.artist}|${a.album}`]] || rateOf(a);
    if (!r) {
      const cands = (byWork.get(workOf(a.album)) || [])
        .filter(c => flat(c.artist) === flat(a.artist) || flat(c.artist).includes(flat(a.artist)) || flat(a.artist).includes(flat(c.artist)));
      if (cands.length === 1) r = cands[0].v;
    }
    if (r) matched++; else unmatched.push(`${g}｜${a.artist} — ${a.album}`);
    albums.push({ ...a, genreFamily: 'classical', ratings: r ? { ...r } : null, rarity: r ? r.rarity : null });
  }
  fs.writeFileSync(path.join(DIR, `cand-${g}.json`), JSON.stringify({ domain: `c-48 軸線組 ${g}`, albums, skipped: src.skipped || [] }, null, 1));
  console.log(`cand-${g}.json：${albums.length} 張（有三軸 ${albums.filter(x => x.ratings).length}）`);
}
console.log(`\n合計 ${total} 張｜對到三軸 ${matched}｜對不到 ${unmatched.length}`);
for (const u of unmatched) console.log(`  ✗ 對不到三軸：${u}`);
if (unmatched.length) process.exit(1);
