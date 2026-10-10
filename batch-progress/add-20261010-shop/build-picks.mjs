// add-20261010-shop：試聽裁定 → preview-picks.json。ready 的 lookup 掛名／盤名／曲目，取指定軌的 previewUrl 並實測 HTTP。
import fs from 'node:fs';
const D = 'batch-progress/add-20261010-shop/';
const sleep = ms => new Promise(r => setTimeout(r, ms));
// [storefront, collectionId, 軌序, 備註]
const READY = {
  '4ce9b7': ['jp', '283554034', 1, '15/15 軌對上 JC 35686（Sony ℗1979）'],
  '3d707b': ['jp', '1597194570', 1, '15/15 軌對上 Commmons RZJM-77477〜8（avex／KAB ℗2021）'],
  '9d2073': ['us', '723387453', 1, '原盤 9 軌全在＋第 10 軌單曲 B 面〈Easy Street〉增收（The Right Stuff ℗1995 再發）'],
  '8f6187': ['jp', '720373604', 1, '9/9 軌對上 ETP-72070（EMI Music Japan ℗1975）'],
  '9aeb4e': ['jp', '1536768852', 1, '11/11 軌對上 25AH 643（Sony Music Japan ℗2013 再發）'],
  'a0d13b': ['jp', '1536932397', 1, '12/12 軌對上專輯 SOLL-160（不是同名單曲）'],
  '8f0202': ['jp', '1597935739', 2, '12/12 軌對上 L-6095E（Warner Japan 2018 Remaster）；第 1 軌標 Single Version，取第 2 軌〈六月の子守唄〉'],
  '9bfcc4': ['jp', '1536890570', 1, '15/15 軌對上 SOLJ-30-OD，署名よしだたくろう（Sony Music Japan ℗2013 再發）'],
  '22944c': ['jp', '75748035', 1, '原盤 11 軌全在（Yamaha ℗1974）'],
  '8b6539': ['jp', '1615894396', 1, '13/13 軌對上 GW-4009（〈妹〉〈海〉為一軌 medley，與原盤同；Nippon Crown ℗1974）'],
  '8b44fa': ['jp', '1537089464', 1, '10/10 軌對上 27AH 980'],
  '72d0f0': ['jp', '720290363', 1, '13/13 軌對上 TP-8077'],
  '6b81b0': ['jp', '155723473', 1, '9/9 軌對上 VIH-28187（只差片假名寫法；Victor ℗2006 再發）'],
  '8de620': ['jp', '1831411858', 1, '12/12 軌對上 L-10091R（Apple 題名帶副題「南から北へ」；Watanabe ℗1977）'],
  '3fb4f0': ['jp', '1822479260', 1, '12/12 軌對上 L-8012R 專輯（Apple 另有同名 2 軌單曲 1509869929，不採）'],
  '836e8e': ['jp', '1595864058', 1, '原盤 9 軌全在＋1 軌增收（Warner Japan 2011 Remaster）'],
  '922c3a': ['jp', '1373888474', 1, 'Carnegie Hall 現場 12 軌＝原盤 13 段（Happy Birthday 的談話與歌合成一軌；Sony ℗1970）'],
  '01b7db': ['jp', '1704585945', 1, '11/11 軌對上 SJX-216（Victor ℗2007 CD 化 VICL-62240 那版）'],
  '84bfa7': ['jp', '1774423662', 1, '11/11 軌對上 ETP-72254'],
  'e09e0c': ['jp', '1445848648', 1, '14/14 軌對上 MR 2211（Apple 題名羅馬字 Samayoi；USM ℗1972）'],
  '1a4953': ['jp', '807350203', 1, '12/12 軌對上 ELEC-2003（For Life ℗1971；只差「わしら」「人ョ」寫法）'],
  '7f375b': ['jp', '717112910', 1, '原盤 8 軌全在＋單曲版與 B 面 2 軌增收（Pony Canyon ℗2013）'],
  '25742e': ['jp', '1537089652', 1, '10/10 軌對上 25AH 897'],
  '76669d': ['jp', '412434199', 1, '12/12 軌對上 LASL 1（VP ℗2011 再發）'],
  '02b418': ['jp', '1436006850', 1, '10/10 軌對上 ETP-80085（Universal ℗1979）'],
  '2910c7': ['jp', '1436021672', 1, '10/10 軌對上 ETP-80118（Apple 題名 The Gallery In My Heart / Kanashii Hodo Otenki）'],
};
const NONE = {
  '4df6cc': 'Apple jp／us／tw 以盤名、三位樂手名搜尋皆無本盤（只有 Shelly Manne 1954《The Three & The Two》，不同作品）。',
  '6ede28': 'Apple jp／us／tw 查無破地獄任何作品（搜到的是電影《破.地獄》與落差草原 WWWW，皆不相干）。',
  '14d49e': 'Apple jp 搜 Marlene／マリーン It\'s Magic 查無本盤。',
  '9f4b90': 'Apple 只有 Yufu & CINEMAPHONIC 2023 現場單曲，To My Pen Pal 未上架；Bandcamp 亦查無。',
  'fc072b': 'Apple 查無真芽正恵任何作品（策展 8796 已預期）。',
  'ac1c8d': 'Apple jp 桃井かおり只有 1982 年後 Sony 系作品，查無 1980 Philips《Four》。',
  '1fb033': 'Apple jp 查無伊武雅刀《Mon-jah》（策展 8806：1991 後無再發）。',
  '942ee4': 'Apple jp 只有 2011 精選《ゴールデン☆ベスト》（32 軌）收部分曲目，非本盤，不採。',
  '1b1367': 'Apple jp 搜 カルメン・マキ 列出 13 筆，無 LAFF（只有個人名義、OZ、5X、サラマンドラ）。',
  '078c67': 'Apple jp 只有精選《Golden Best》（20 軌，僅 1 軌重疊），查無《タッチ・ミー》。',
  'b37b95': 'Apple jp 只有精選《Miki Hirayama Columbia Years》（28 軌，含本盤 12 首）與 2007 ベスト，無專輯本身，不採。',
};
const picks = {};
for (const [n, note] of Object.entries(NONE)) picks[n] = { status: 'unavailable', note };
for (const [n, [c, id, tn, note]] of Object.entries(READY)) {
  await sleep(1500);
  const l = await (await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song&country=${c}`)).json();
  const col = l.results.find(x => x.wrapperType === 'collection');
  const t = l.results.filter(x => x.wrapperType === 'track').sort((a, b) => (a.discNumber - b.discNumber) || (a.trackNumber - b.trackNumber))[tn - 1];
  const r = await fetch(t.previewUrl, { headers: { Range: 'bytes=0-1023' } });
  picks[n] = { status: 'ready', c, id, url: t.previewUrl, http: r.status, expl: col.collectionExplicitness,
    note: `Apple ${c} ${id}「${col.artistName}《${col.collectionName}》」：${note}，取第 ${tn} 軌〈${t.trackName}〉。主線 2026-10-10 lookup 核對、試聽檔 HTTP ${r.status}。` };
  console.log(n, r.status, col.collectionExplicitness, col.artistName, col.collectionName, '→', t.trackName);
}
fs.writeFileSync(D + 'preview-picks.json', JSON.stringify(picks, null, 1));
console.log('ready', Object.keys(READY).length, 'unavailable', Object.keys(NONE).length);
