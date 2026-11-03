// 在 publish-manifest 產出的 patch 上補頂點卡欄位（方案 C 後格式：tier＋apex:true，另補 artist/album/cardId/updatedAt）
const fs = require('fs');
const p = 'publish-stage/onboarding-manifest-add-20261103-20261103/card-catalog-patches.json';
const a = JSON.parse(fs.readFileSync(p, 'utf8'));
for (const x of a) {
  const add = { artist: { stringValue: '濁水溪公社' }, album: { stringValue: '台客的復仇' }, cardId: { stringValue: x.docId },
    updatedAt: { integerValue: '1' }, tier: { stringValue: 'hall' }, apex: { booleanValue: true } };
  Object.assign(x.body.fields, add);
  x.updateMask = [...new Set([...x.updateMask, ...Object.keys(add)])];
}
fs.writeFileSync(p, JSON.stringify(a, null, 1));
fs.copyFileSync(p, 'batch-progress/add-20261103/card-catalog-patches.json');
console.log(a[0].updateMask.join(','));
