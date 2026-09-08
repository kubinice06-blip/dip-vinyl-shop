// 裁定 258 的補救：`make-cards-generic.mjs` 過去沒把 `genreException` 帶進卡單，
// 於是既有的 §5.5 白名單批在下游全部看不見自己的例外身分。這支從各批的
// prop-*.json 回填，只補空的、不覆蓋既有值。
import fs from 'node:fs';
const write = process.argv.includes('--write');
for (const b of ['c70','c97','c105','c118']) {
  const cf = `desc-tools/batches/cards/${b}-cards.json`;
  const cards = JSON.parse(fs.readFileSync(cf,'utf8'));
  const map = new Map();
  for (const g of ['a','b']) {
    const p = `batch-progress/${b}/prop-${g}.json`;
    if (!fs.existsSync(p)) continue;
    const arr = JSON.parse(fs.readFileSync(p,'utf8'));
    const list = Array.isArray(arr) ? arr : (arr.cards || arr.items || []);
    for (const x of list) {
      // 卡單的 key 前綴不一定是 desc2（c-105 有 desc4），一律用冒號後那段比對。
      const key = (x.key || `desc2:${x.artist}|${x.album}`).replace(/^[^:]*:/, '');
      map.set(key, x.genreException || x.releaseTypeException || '');
    }
  }
  let n = 0;
  for (const c of cards) {
    if (c.genreException || c.releaseTypeException) continue;
    const ge = map.get(c.key.replace(/^[^:]*:/, ''));
    if (!ge) continue;
    c.genreException = ge; n++;
    console.log(`${b}  ${c.key}  ← ${ge}`);
  }
  console.log(`${b}: 回填 ${n} 張${write ? '（已寫入）' : '（乾跑）'}`);
  if (write && n) fs.writeFileSync(cf, JSON.stringify(cards, null, 1) + '\n');
}
