// 把雲端段的產出（cards／caa／apple-art／previews）轉成本機管線吃的三個檔。
//
// 雲端與本機的檔名與欄位不一樣，不是誰做錯——雲端依 REMOTE_RUNBOOK 不能碰
// KV／Firestore／seed_cards，它產的是「探測結果」；本機管線吃的是「已定案的四項資料」。
// 這支就是兩邊的接縫，讓 c-52 之後每一批都用同一條路走完，不必逐批手工搬。
//
// 用法：node batch-progress/stage-cloud-batch.mjs <批名>
// 產出：batch-progress/<批>/{cand-all,covers,previews}.json
import fs from 'node:fs';

const ROOT = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop';
const batch = process.argv[2];
if (!batch) { console.error('用法: node batch-progress/stage-cloud-batch.mjs <批名>'); process.exit(1); }
const dir = `${ROOT}/batch-progress/${batch}`;
const rd = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const arrOf = j => Array.isArray(j) ? j : (j.cards || j.albums || Object.values(j).find(Array.isArray) || []);

// --- 卡單 -------------------------------------------------------------------
const cards = arrOf(rd(`${ROOT}/desc-tools/batches/cards/${batch}-cards.json`));
// §1 人工身分卡的舉證是本機的工作（雲端不做線上寫入，也不見得備齊 mbAbsenceProof）。
// 補的內容放在 <批>/identity-manual.json，鍵是「藝人|盤名」，這裡疊上去，
// 這樣重跑轉檔不會把補好的舉證洗掉。
const manual = fs.existsSync(`${dir}/identity-manual.json`) ? rd(`${dir}/identity-manual.json`) : {};
const cand = cards.map(c => ({ ...c, ...(manual[c.artist + '|' + c.album] || {}) }));
fs.writeFileSync(`${dir}/cand-all.json`, JSON.stringify(cand, null, 1));

// --- 封面 -------------------------------------------------------------------
// 三個來源依序疊：CAA 探測 → 人工身分卡的 Apple 專輯頁（§4 例外）→ 卡單自帶的
// Bandcamp／Spotify（c-52 的策展層當時就解出來了）。後來的不覆蓋先有的。
const covers = new Map();
const put = (artist, album, art) => {
  if (!art || !art.url) return;
  const k = artist + '|' + album;
  if (covers.has(k)) return;
  const row = { artist, album, cover: { url: art.url, source: art.source || 'caa' } };
  // §4 例外的要件：Apple 來源要把 collectionId 一路帶到 manifest，本機才能 lookup 覆核
  if (art.collectionId) row.appleCollectionId = String(art.collectionId);
  covers.set(k, row);
};
if (fs.existsSync(`${dir}/caa.json`)) for (const x of arrOf(rd(`${dir}/caa.json`))) put(x.artist, x.album, x.art);
if (fs.existsSync(`${dir}/apple-art.json`)) {
  const j = rd(`${dir}/apple-art.json`);
  for (const [k, v] of Object.entries(j)) {
    const i = k.indexOf('|');
    put(k.slice(0, i), k.slice(i + 1), v.art);
  }
}
for (const c of cards) put(c.artist, c.album, c.cover);
// 沒封面的也要留一列（cover: null）——itunes-covers／fill-covers 兩支補救腳本
// 是靠「covers.json 裡 cover 為空的列」找工作的，只寫命中的等於讓它們無事可做。
const coverRows = cards.map(c => covers.get(c.artist + '|' + c.album)
  || { artist: c.artist, album: c.album, cover: null });
fs.writeFileSync(`${dir}/covers.json`, JSON.stringify(coverRows, null, 1));

// --- 試聽 -------------------------------------------------------------------
// 欄名對照：previewUrl→url、collectionId→appleCollectionId、front→storefront。
// no-preview 是探測腳本的說法（Apple 有這張碟但沒給試聽片段），驗證器只認
// ready／unavailable／disabled 三種，所以映成 unavailable 並把原因寫進 note。
const rawPv = fs.existsSync(`${dir}/previews.json`) ? rd(`${dir}/previews.json`) : {};
const pv = {};
let ready = 0, unavailable = 0;
for (const [k, v] of Object.entries(rawPv)) {
  if (!v) continue;
  if (v.status === 'ready' && v.previewUrl) {
    pv[k] = {
      status: 'ready', url: v.previewUrl, source: 'apple',
      appleCollectionId: String(v.collectionId || ''),
      storefront: String(v.front || 'tw').toUpperCase(),
    };
    ready++;
  } else {
    const note = v.status === 'no-preview'
      ? 'Apple 目錄有這張碟但該地區未提供試聽片段，依 §5 記為無固定試聽。'
      : '各 storefront 逐一探測後仍查無可用的固定試聽片段。';
    pv[k] = { status: 'unavailable', note };
    unavailable++;
  }
}
fs.writeFileSync(`${dir}/previews.json.local`, JSON.stringify(pv, null, 1));
fs.renameSync(`${dir}/previews.json.local`, `${dir}/previews.local.json`);

console.log(`${batch}｜卡單 ${cand.length}｜封面 ${covers.size}｜試聽 ready ${ready}／unavailable ${unavailable}`);
