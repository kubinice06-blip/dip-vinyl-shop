import fs from 'node:fs';
const id = JSON.parse(fs.readFileSync('batch-progress/c52/identity.json', 'utf8'));
const by = k => id.find(r => r.artist + '|' + r.album === k) || (() => { throw new Error('查無 ' + k); })();
const GROUPS = {
  // a：印尼 1970s 搖滾／放克／dangdut。Panbers 兩張、Rhoma 兩張各自同組，
  //    hook 層才寫得出互相排除的條款。
  a: ['Koes Plus|Volume 4', 'Panbers|Volume 1',
      'Panbers|Indonesian City Sound: Panbers Psychedelic Rock and Funk, 1971-1974',
      'Duo Kribo|Duo Kribo', "Barong's Band|Barong's Band", 'Benyamin S.|Si Djampang',
      'Gombloh|Kebyar Kebyar', 'Rhoma Irama|Darah Muda', 'Rhoma Irama|Santai'],
  // b：Badai Pasti Berlalu 那個圈子（Chrisye／Yockie／Keenan 是同一組人）必須同組，
  //    否則三張會各寫一遍同一段錄音室故事。後半是印尼爵士／fusion。
  b: ['Chrisye|Badai Pasti Berlalu', 'Yockie Soerjoprajogo|Jurang Pemisah',
      'Yockie Soerjoprajogo|Musik Saya Adalah Saya', 'Keenan Nasution|Di Batas Angan Angan',
      'Bubi Chen|Bubi Chen and His Fabulous 5', 'Indra Lesmana & Nebula|No Standing',
      'Karimata|Pasti', 'simakDialog|Baur'],
  // c：泰／越／菲／星馬，外加兩張印尼 VA 合輯——本組五張走 §5.6，一次講清楚比分散講好。
  c: ['Various Artists|Music of Indonesia, Vol. 20: Indonesian Guitars',
      'Various Artists|Music from the Morning of the World',
      'Angkanang Kunchai With Ubon-Pattana Band|Isan Lam Plearn',
      'Various Artists|Thai? Dai! The Heavier Side of the Luk Thung Underground',
      'Dao Bandon|Kon Kee Lang Kwai (Man on a Water Buffalo): Essential Dao Bandon',
      'Hoàng Oanh|Tiếng hát Hoàng Oanh 2 (Rừng xưa)', 'Cinderella|Ang Boyfriend Kong Baduy',
      'Zainal Abidin|Zainal Abidin',
      'Various Artists|Pop Yeh Yeh: Psychedelic Rock From Singapore and Malaysia 1964-1970'],
};
let n = 0;
for (const [g, keys] of Object.entries(GROUPS)) {
  const rows = keys.map(by);
  fs.writeFileSync(`batch-progress/c52/group-${g}.json`, JSON.stringify(rows, null, 1));
  n += rows.length;
  console.log(`group-${g}: ${rows.length} 張｜釘住 ${rows.filter(r=>r.identitySource==='pinned').length}｜人工 ${rows.filter(r=>r.identitySource==='manual').length}｜合輯 ${rows.filter(r=>r.releaseType==='Compilation').length}`);
}
if (n !== id.length) throw new Error(`切組後 ${n} 張，與 identity.json 的 ${id.length} 張不符`);
console.log('合計', n, '＝ identity.json 張數 ✓');
