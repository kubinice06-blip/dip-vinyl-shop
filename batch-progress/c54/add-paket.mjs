// 補回《Paket aranžman》。策展代理當初沒提，是因為卡片的 artist 只能放一個字串、
// 三團聯名沒有它能確認的寫法，於是照規矩不自己編一個——那個判斷是對的。
// 店主 2026-09-01 指出卡池早有先例：多藝人掛名用 " / " 斜線分隔，
// 池中已有三人（John Abercrombie / Dave Holland / Jack DeJohnette）與
// 四人（Oistrakh / Rostropovich / Richter / Karajan）的例子。
// MusicBrainz 的 artist-credit 恰好也是同一個分隔符，兩邊對得上。
import fs from 'node:fs';
const P = 'batch-progress/c54/prop-a.json';
const rows = JSON.parse(fs.readFileSync(P, 'utf8'));
const KEY = 'Šarlo Akrobata / Idoli / Električni Orgazam|Paket aranžman';
if (rows.some(r => `${r.artist}|${r.album}` === KEY)) { console.log('已存在，不重複加入'); process.exit(0); }
rows.push({
  artist: 'Šarlo Akrobata / Idoli / Električni Orgazam',
  album: 'Paket aranžman',
  year: 1981,
  genres: ['rock'],
  label: 'Jugoton',
  why: '貝爾格勒新浪潮的起點與宣言，一張碟裝三個團各佔一面之三，1981 年由 Jugoton 發行後成為 novi talas 世代的共同起跑線；三個團日後各自的路線都能回推到這張。',
  risk: '三團聯名，卡片掛名採卡池既有的斜線慣例（池中已有三人與四人聯名的先例），與 MusicBrainz 的 artist-credit 寫法一致。三個團在本批另各有個別卡片，行文要與那些卡切開，不要重講樂團簡史。',
  mbNote: 'MB release-group 72773a9c-f1c3-3e85-abdc-4a6c9265e40f「Paket aranžman」，first-release-date 1981，primary-type Album、無 secondary-type，artist-credit 為「Šarlo Akrobata / Idoli / Električni Orgazam」，與卡片掛名一字不差。最早 release 為 Jugoton LSY 66118。注意另有 1998 年的《Paket Aranžman Pank Obrade - Punk You All》（42e13600-e55b-4850-b0e3-8c8df1dde937，Album/Compilation，掛 Various Artists）是龐克翻唱盤，不是本作。',
  releaseType: 'Album',
  exceptionReason: '',
  exceptionEvidenceUrls: [],
  selfTitled: false,
  queryAlias: '',
  republic: '塞爾維亞',
  g: 'a',
});
fs.writeFileSync(P, JSON.stringify(rows, null, 1));
console.log(`加入《Paket aranžman》，c-54 → ${rows.length} 張`);
