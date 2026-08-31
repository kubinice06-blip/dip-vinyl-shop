// 研究層推翻的廠牌欄，逐筆改回卡單（c-SEA 三批）。
// 用法：node batch-progress/csea/apply-label-fixes.mjs [--write]
//
// 這些不是文風潤飾，是**卡池要用的值**：`label` 會跟著卡片進 card_catalog。
// 研究層是產線裡唯一逐張查過原盤的一層，它推翻主線時以它為準（research-base 的
// 方法論條款）。這裡把七筆改動集中在一支腳本裡並附各自的來源理由，
// 讓本機審稿看得到「為什麼卡單原本的值是錯的」，而不是只看到值變了。
//
// **只改 desc-tools/batches/cards/ 底下的批次卡單**，不動 seed_cards.json——
// 那是本機的上架開關，雲端段不碰（REMOTE_RUNBOOK）。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const FIXES = [
  { batch: 'cseaa', artist: 'Kembara', album: 'Kembara',
    from: 'WEA', to: 'Polygram',
    why: '研究層查得 1981-03-15 在馬來西亞與新加坡由 Polygram 發行。' },
  { batch: 'cseaa', artist: 'Koes Plus', album: 'Volume 2',
    from: 'Melody Records', to: 'Mesra',
    why: 'Discogs 記本作為 Mesra（LP-44）。Melody 是 1969 年首作《Dheg Dheg Plas》的廠牌，被誤植到第二輯。' },
  { batch: 'cseaa', artist: 'Dara Puspita', album: 'A Go Go',
    from: 'Mesra Records', to: 'El Shinta Records',
    why: 'garagehangover 的唱片目錄記本作由雅加達 El Shinta 發行（A-6708）。Mesra 是她們 1965／1966 兩張的廠牌，被沿用過來。' },
  { batch: 'cseab', artist: 'Banyuhay ni Heber Bartolome', album: "Tayo'y Mga Pinoy",
    from: 'Vicor', to: 'Dyna Records',
    why: '英文維基與 thediarist.ph 一致記 1978 年由 Dyna Records 發行。' },
  { batch: 'cseab', artist: 'Fariz RM', album: 'Sakura',
    from: '', to: 'Akurama Records',
    why: '卡單原本留空。英文維基與印尼樂評資料一致：1980 年 2 月 Akurama Records，Fariz RM 自任製作人。' },
  { batch: 'cseab', artist: 'Sheila Majid', album: 'Emosi',
    from: 'Roslan Aziz Productions', to: 'EMI Music Malaysia',
    why: '馬來文維基作「EMI (Malaysia) Sdn. Bhd. 發行、Roslan Aziz 出版與製作」。Roslan Aziz 是製作人不是發行商，label 欄取發行商。' },
  { batch: 'cseab', artist: 'Elvy Sukaesih', album: 'Menghitung Bintang',
    from: '', to: 'Purnama Records',
    why: '卡單原本留空。印尼原盤 1983 年 Purnama Records（PLL 10127）；同年另有馬來西亞 Life／Bomba 版（HM 1553），兩者並存，label 取原盤。' },
  { batch: 'cseaa', artist: 'Mike Hanopol', album: 'Buhay Musikero',
    from: 'Vicor / Sunshine Records', to: 'Jem',
    why: '卡單的 Vicor／Sunshine 無來源；rgMbid 底下唯一那筆 1977 年菲律賓 release 記的是 Jem（JLP 105）。研究層自己標 uncertain——一個有來源的值對上一個沒來源的值，取有來源的，但本機仍應複核。' },
  { batch: 'cseab', artist: 'Sampaguita', album: 'Sampaguita',
    from: 'Vicor / Sunshine Records', to: 'Blackgold Records',
    why: 'Discogs 的 1978 年原盤與同年七吋都記 Blackgold（BA-5017）。Blackgold 確為 Vicor 子廠，所以 Vicor 這條線仍成立，但 Sunshine 與本作無關。' },
  { batch: 'cseab', artist: 'XPDC', album: 'Darjah Satu',
    from: 'BMG Music', to: 'Hup Hup Sdn. Bhd.',
    why: '1990 原盤為 Hup Hup Sdn. Bhd.（Life Records），經銷 Life Record Industries。三個來源指向同一家，1990 年各版本都沒有 BMG。' },
  { batch: 'cseab', artist: 'Giant Step', album: 'Giant on the Move!',
    from: '', to: 'SM Recording',
    why: '卡單原本留空。印尼文維基記 1976 年由 SM Recording 發行，錄音在萬隆的 SM Record 錄音室（同一家）。' },
  { batch: "cseac", artist: "Rien Djamain", album: "Api Asmara",
    from: "", to: "Hidayat",
    why: "卡單原本留空。印尼文維基《Api Asmara》條目引 1975 年 Hidayat 原盤內頁（萬隆，編號 1-1007）與 Asriat Ginting《Musisiku》一書。" },
  { batch: "cseac", artist: "Wings", album: "Belenggu Irama",
    from: "Warner Music Malaysia", to: "ASP (Antarctic Sound Production)",
    why: "1987 原盤是 ASP（Antarctic Sound Production Sdn. Bhd.），卡帶編號 ASP 0030，錄音在 King Studio。Warner 無來源。" },
  { batch: "cseac", artist: "Yano", album: "Yano",
    from: "BMG Records Pilipinas", to: "Alpha Records",
    why: "1994-06-30 首發是 Alpha Records（CD ARCD-94-8028／卡帶 ALC-94-7911），製作人 Rudy Y. Tee。BMG 是 1998 年重發，被誤植成首發廠牌。" },
  { batch: "cseac", artist: "Harry Roesli Gang", album: "Philosophy Gang",
    from: "", to: "Lion Records",
    why: "卡單原本留空。1973 年 6 月首發，錄音在雅加達的 Musica Studio\u2019s，但唱片掛新加坡的 Lion Records 出版（TLP-001）。" },
  { batch: "cseac", artist: "Benny Soebardja", album: "Gimme a Piece of Gut Rock",
    from: "", to: "SM Recording",
    why: "卡單原本留空。1977 年由印尼獨立錄音室廠牌 SM Recording 以卡帶發行（編號 034）。與同批 Giant Step 同廠。" },
  { batch: "cseac", artist: "Abbhama", album: "Alam Raya",
    from: "", to: "Tala & Co Record",
    why: "卡單原本留空。原盤為卡帶，工業許可證日期 1978-02-16（這條物證壓過印尼文維基的 1979 年說法，年份維持卡單的 1978）；錄音在 Tala & Co 自家錄音室。" },
];


// genre 欄的更正另立一表：`label` 是自由字串，`genre` 是**十個合法 id 的封閉值域**
// （rock jazz soul electronic pop hiphop folk classical world blues）。
// 2026-08-30 曾有批次內部標籤「chinese」漏進卡池的 genre 欄，導致首頁「類型挑片」
// 抽不到那些卡。所以這裡寫死值域並在套用前斷言，寧可拋錯也不要再放一個非法 id 進去。
const GENRES = new Set(['rock', 'jazz', 'soul', 'electronic', 'pop', 'hiphop', 'folk', 'classical', 'world', 'blues']);
const GENRE_FIXES = [
  { batch: 'cseab', artist: 'Various Artists',
    album: 'Siamese Soul: Thai Pop Spectacular, Volume 2: 1960s-1980s',
    from: 'soul', to: 'world',
    why: '研究層逐曲覆核：曲目幾乎全是 luk thung 與 molam 歌手（Daw Bandon、Kwan Jai & Kwan Jit Sriprajan、Hong Thong Daw U-don），Siamese Soul 是標題與行銷語不是曲種。研究層建議 funk 或 world——funk 不在十個合法 id 裡，取 world。' },
];

const write = process.argv.includes('--write');
let hit = 0, miss = 0;
const byBatch = new Map();
for (const f of FIXES) {
  if (!byBatch.has(f.batch)) byBatch.set(f.batch, []);
  byBatch.get(f.batch).push(f);
}

for (const [batch, fixes] of byBatch) {
  const files = ['cards', 'a', 'b', 'c', 'd', 'e'].map(s =>
    path.join(ROOT, `desc-tools/batches/cards/${batch}-${s === 'cards' ? 'cards' : s}.json`));
  for (const p of files) {
    if (!fs.existsSync(p)) continue;
    const rows = JSON.parse(fs.readFileSync(p, 'utf8'));
    let touched = false;
    for (const f of fixes) {
      const c = rows.find(x => x.artist === f.artist && x.album === f.album);
      if (!c) continue;
      // 卡單原值與 FIXES 的 from 對不上就停手——那代表卡單已經被別處改過，
      // 這支腳本的前提（研究層推翻的是「這個值」）不再成立，硬改會蓋掉別人的判斷。
      if ((c.label || '') !== f.from && (c.label || '') !== f.to)
        throw new Error(`${p} 的 ${f.artist}《${f.album}》label 是「${c.label}」，既非預期原值「${f.from}」也非目標值，停手`);
      if ((c.label || '') === f.to) continue;
      c.label = f.to;
      c.mbNote = [c.mbNote || '', `【研究層更正】廠牌 ${f.from || '（原留空）'} → ${f.to}：${f.why}`]
        .filter(Boolean).join('｜');
      touched = true; hit++;
      console.log(`${path.basename(p)}｜${f.artist}《${f.album}》：${f.from || '（空）'} → ${f.to}`);
    }
    if (touched && write) fs.writeFileSync(p, JSON.stringify(rows, null, 1));
  }
}

// genre 走同一套「原值對不上就停手」的保護
for (const f of GENRE_FIXES) {
  if (!GENRES.has(f.to)) throw new Error(`目標 genre「${f.to}」不在十個合法 id 裡`);
  for (const s of ['cards', 'a', 'b', 'c', 'd', 'e']) {
    const p = path.join(ROOT, `desc-tools/batches/cards/${f.batch}-${s}.json`);
    if (!fs.existsSync(p)) continue;
    const rows = JSON.parse(fs.readFileSync(p, 'utf8'));
    const c = rows.find(x => x.artist === f.artist && x.album === f.album);
    if (!c) continue;
    if (c.genre !== f.from && c.genre !== f.to)
      throw new Error(`${p} 的 ${f.album} genre 是「${c.genre}」，既非預期原值也非目標值，停手`);
    if (c.genre === f.to) continue;
    c.genre = f.to;
    c.mbNote = [c.mbNote || '', `【研究層更正】曲風 ${f.from} → ${f.to}：${f.why}`].filter(Boolean).join('｜');
    hit++;
    console.log(`${path.basename(p)}｜${f.artist}《${f.album}》曲風：${f.from} → ${f.to}`);
    if (write) fs.writeFileSync(p, JSON.stringify(rows, null, 1));
  }
}

console.log(`\n共套用 ${hit} 處${write ? '（已寫檔）' : '（dry-run，加 --write 才寫）'}`);
