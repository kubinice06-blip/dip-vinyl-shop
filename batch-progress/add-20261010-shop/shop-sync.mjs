// add-20261010-shop：上架後的店內資料對接——快照 poolKey、移出 PENDING_NEW、心情對照、pending-meta 清掉已上架的 37 張。
import fs from 'node:fs';
import { key } from '../../scripts/pool-keys.mjs';
const D = 'batch-progress/add-20261010-shop/';
const rd = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const spec = rd(D + 'spec.json');
const inv = rd('data/shop/inventory.json').items;
const ids = new Map(spec.map(s => [inv.find(i => i.id.endsWith(s.n)).id, s]));
const MOOD = {
  '4df6cc': ['keeper', 'anchor'], '4ce9b7': ['seeker', 'drift'], '6ede28': ['hermit', 'seeker', 'restless'], '3d707b': ['still', 'hermit', 'lowtide'],
  '9d2073': ['still', 'balance', 'anchor'], '14d49e': ['flame', 'crowd'], '9f4b90': ['drift', 'balance', 'crowd'], '8f6187': ['drift', 'lowtide'],
  '9aeb4e': ['balance', 'crowd'], 'a0d13b': ['crowd', 'flame'], '8f0202': ['lowtide', 'still'], 'fc072b': ['still', 'hermit'],
  '9bfcc4': ['anchor', 'balance'], '22944c': ['lowtide', 'still'], '8b6539': ['crowd', 'lowtide'], '8b44fa': ['balance', 'drift'],
  'ac1c8d': ['drift', 'hermit'], '72d0f0': ['crowd', 'flame'], '1fb033': ['seeker', 'restless'], '6b81b0': ['drift', 'balance'],
  '8de620': ['lowtide', 'balance'], '942ee4': ['crowd', 'balance'], '3fb4f0': ['still', 'lowtide'], '836e8e': ['crowd', 'flame'],
  '1b1367': ['restless', 'flame'], '922c3a': ['crowd', 'lowtide'], '01b7db': ['lowtide', 'hermit'], '84bfa7': ['drift', 'still'],
  'e09e0c': ['still', 'lowtide'], '1a4953': ['restless', 'anchor'], '078c67': ['drift', 'balance'], 'b37b95': ['balance', 'crowd'],
  '7f375b': ['drift', 'flame'], '25742e': ['balance', 'still'], '76669d': ['anchor', 'keeper'], '02b418': ['drift', 'balance'], '2910c7': ['anchor', 'still'],
};
// 1. 快照 poolKey（Notion 已同步寫入）
const snapF = 'data/shop/notion-snapshot.json', snap = rd(snapF);
let n1 = 0; for (const r of snap.rows) { const s = ids.get(r.id); if (s) { r.poolKey = `${s.artist}|${s.album}`; n1++; } }
fs.writeFileSync(snapF, JSON.stringify(snap, null, 2) + '\n');
// 2. 心情
const mmF = 'data/shop/mood-map.json', mm = rd(mmF);
let n2 = 0; for (const s of spec) { mm.map[key(s.artist, s.album)] = MOOD[s.n]; n2++; }
fs.writeFileSync(mmF, JSON.stringify(mm, null, 1) + '\n');
// 3. pending-meta
const pmF = 'data/shop/pending-meta.json', pm = rd(pmF);
let n3 = 0; for (const id of ids.keys()) if (pm.items[id]) { delete pm.items[id]; n3++; }
fs.writeFileSync(pmF, JSON.stringify(pm, null, 1) + '\n');
console.log({ snapshot: n1, mood: n2, pendingMetaRemoved: n3, pendingMetaLeft: Object.keys(pm.items).length });
