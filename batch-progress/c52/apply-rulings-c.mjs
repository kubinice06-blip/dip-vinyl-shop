// 落實 c 組研究層的裁定。冪等。
import fs from 'node:fs';
const readJ = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const writeJ = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 1));

// ── 裁定一：研究層找到四個 release-group，四張卡從人工身分升級成釘得住 ──
// 我當初的搜尋沒中，是因為查詢用羅馬轉寫、MB 存的是泰文原文
//（อิสานลำเพลิน、คนขี่หลังควาย）——與 c-53 抽驗的結論同一個道理：
// 用原文字查，不要用轉寫。四個都已逐一回問 MB 確認實體類型與掛名。
const PIN = [
  { key: 'Angkanang Kunchai With Ubon-Pattana Band|Isan Lam Plearn',
    id: 'a2cf6586-73bb-46f6-a2c1-470fd75359c2', title: 'อิสานลำเพลิน', date: '2014-05-27', type: 'Album',
    note: 'MB 的 2014-05-27 是 EM Records 復刻日，卡片年份鎖原盤 1975（EM 官方 Bandcamp 明文 "This 1975 debut album"）。同 Joey Ayala／Keenan 先例：留用重發的 release-group，卡片年記原盤年。' },
  { key: 'Dao Bandon|Kon Kee Lang Kwai (Man on a Water Buffalo): Essential Dao Bandon',
    id: 'cc245537-a24f-4459-b8c8-6e81d1943b58', title: 'คนขี่หลังควาย / Kon kee lang kwai (Man on a Water Buffalo): Essential Dao Bandon',
    date: '2014-10-17', type: 'Album', sec: ['Compilation'], note: 'type 與年份都與卡片一致。' },
  { key: 'Various Artists|Pop Yeh Yeh: Psychedelic Rock From Singapore and Malaysia 1964-1970',
    id: '1cbf2b70-eccf-4e72-baaf-e4f9e97069e5', title: 'Pop Yeh Yeh: Psychedelic Rock from Singapore and Malaysia–1964-1970',
    date: '2013', type: 'Album', sec: ['Compilation'], note: 'type 與年份都與卡片一致。' },
  { key: 'Zainal Abidin|Zainal Abidin',
    id: '1f187aa4-0fa3-44b6-b15f-d146206687f6', title: 'Hijau', date: '1991-05-30', type: 'Album',
    note: '**MB 的標題與日期都不可信**：Hijau 是本作第一支單曲的曲名（1991-05-30），專輯本身是 1991-07-09、10 軌（馬來文維基有各自獨立的條目）。MB 把單曲名與單曲日期誤植到專輯的 release-group 上。type 是 Album、MB 上「Zainal Abidin」只有一位藝人、無其他候選，所以這個 RG 指的就是本作，可當 rgMbid 用，但標題與日期不得取用。' },
];
for (const p of ['batch-progress/c52/identity.json', 'desc-tools/batches/cards/c52-cards.json']) {
  const rows = readJ(p); let n = 0;
  for (const r of rows) for (const x of PIN) {
    if (`${r.artist}|${r.album}` !== x.key) continue;
    if (r.rgMbid === x.id) continue;
    if (r.rgMbid) throw new Error(`${x.key} 已有 rgMbid ${r.rgMbid}，與新值 ${x.id} 衝突，停手`);
    r.rgMbid = x.id; r.identitySource = 'pinned';
    if ('mbTitle' in r) { r.mbTitle = x.title; r.mbFirstRelease = x.date; }
    r.mbPinNote = x.note;
    n++;
  }
  if (n) { writeJ(p, rows); console.log(`  ${p}: 升級 ${n} 張為 pinned`); }
}

// ── 裁定二：三張卡的地區欄填錯 ──
// g 欄決定試聽探測先試哪個 storefront，填錯會降低命中率。
const GFIX = [
  { key: 'Hoàng Oanh|Tiếng hát Hoàng Oanh 2 (Rừng xưa)', from: 'th', to: 'vn' },
  { key: 'Zainal Abidin|Zainal Abidin', from: 'ph', to: 'my' },
  { key: 'Various Artists|Pop Yeh Yeh: Psychedelic Rock From Singapore and Malaysia 1964-1970', from: 'ph', to: 'sg' },
];
for (const p of ['batch-progress/c52/identity.json', 'batch-progress/c52/group-c.json']) {
  const rows = readJ(p); let n = 0;
  for (const r of rows) for (const f of GFIX) {
    if (`${r.artist}|${r.album}` !== f.key || !('g' in r)) continue;
    if (r.g !== f.from && r.g !== f.to) throw new Error(`${f.key} 的 g 是「${r.g}」，既非 ${f.from} 也非 ${f.to}，停手`);
    if (r.g === f.from) { r.g = f.to; n++; }
  }
  if (n) { writeJ(p, rows); console.log(`  ${p}: 修正地區欄 ${n} 筆`); }
}

// ── 裁定三：一筆 fact 的來源是 HTTP，升級成 HTTPS（已實測 200） ──
const rp = 'desc-tools/batches/research/c52-c.json';
const rows = readJ(rp); let fixed = 0;
for (const r of rows) for (const f of (r.facts || []))
  if (typeof f.src === 'string' && f.src.startsWith('http://')) {
    f.src = 'https://' + f.src.slice(7); fixed++;
  }
if (fixed) { writeJ(rp, rows); console.log(`  ${rp}: HTTP → HTTPS ${fixed} 筆`); }
console.log('\n完成。');
