// 在 publish-manifest 產出的 patch 上補 artist/album/cardId/updatedAt（一般卡，無 tier）
const fs = require('fs');
const p = 'publish-stage/onboarding-manifest-add-20261104-20261104/card-catalog-patches.json';
const a = JSON.parse(fs.readFileSync(p, 'utf8'));
const names = { '創世記': 1, '出走': 1 };
for (const x of a) {
  const album = x.docId.split('|')[1];
  const add = { artist: { stringValue: '張睿銓 Chang Jui-Chuan' }, album: { stringValue: album }, cardId: { stringValue: x.docId },
    updatedAt: { integerValue: '1' }, seed: { booleanValue: true } };
  Object.assign(x.body.fields, add);
  x.updateMask = [...new Set([...x.updateMask, ...Object.keys(add)])];
}
fs.writeFileSync(p, JSON.stringify(a, null, 1));
fs.copyFileSync(p, 'batch-progress/add-20261104/card-catalog-patches.json');
console.log(a.map(x => x.docId + ' ' + x.updateMask.join(',')).join('\n'));
