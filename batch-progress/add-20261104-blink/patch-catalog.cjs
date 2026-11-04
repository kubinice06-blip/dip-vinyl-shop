// 在 publish-manifest 產出的 patch 上補 artist/album/cardId/updatedAt（一般卡，無 tier）add-20261104-blink
const fs = require('fs');
const p = 'publish-stage/onboarding-manifest-add-20261104-blink-20261104/card-catalog-patches.json';
const a = JSON.parse(fs.readFileSync(p, 'utf8'));

for (const x of a) {
  const m = require(require('path').resolve('onboarding-manifest-add-20261104-blink-20261104.json'));
  const album = m.albums.find(a => ('blink-182|' + a.album).toLowerCase() === x.docId).album;
  const add = { artist: { stringValue: 'blink-182' }, album: { stringValue: album }, cardId: { stringValue: x.docId },
    updatedAt: { integerValue: '1' }, seed: { booleanValue: true } };
  Object.assign(x.body.fields, add);
  x.updateMask = [...new Set([...x.updateMask, ...Object.keys(add)])];
}
fs.writeFileSync(p, JSON.stringify(a, null, 1));
fs.copyFileSync(p, 'batch-progress/add-20261104-blink/card-catalog-patches.json');
console.log(a.map(x => x.docId + ' ' + x.updateMask.join(',')).join('\n'));
