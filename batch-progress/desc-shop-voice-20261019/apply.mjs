// 2026-10-19 店主指示：簡介刪掉「店主入坑」類店家第一人稱句，並清掉同源（店主 IG）的推薦／入手口吻。
// 用法：node apply.mjs <KV 現值 dump.json>  → 產生 publish-stage/kv-desc-shop-voice-20261019.json，並改 c36 manifest
import fs from 'node:fs';
const FIX = [
  ['desc2:masahiko togashi quartet|sketch',
   '店主入坑自由爵士的第一張唱片。free jazz 常讓人卻步', '自由爵士常讓人卻步'],
  ['desc2:brian eno / jah wobble|spinner',
   '成為能單獨聆聽的 ambient-dub 作品。推薦給喜歡 dub 低音迴響的人。', '成為能單獨聆聽的 ambient-dub 作品。'],
  ['desc2:erroll garner|erroll garner plays misty',
   '整張溫潤悅耳、極易入耳，是放鬆聆聽 mellow jazz 的好選擇。推薦曲目〈Misty〉〈Again〉〈Exactly Like You〉。',
   '整張溫潤悅耳、極易入耳，標題曲之外另收〈Again〉〈Exactly Like You〉〈That Old Feeling〉等標準曲。'],
  ['desc2:estelle perrault|promises',
   '極易入耳，推薦曲目〈Sunshine〉〈Day By Day〉〈I Know You Wish〉。', '整張極易入耳，另收〈Sunshine〉〈Day By Day〉〈I Know You Wish〉等曲。'],
  ['desc2:de la soul|art official intelligence: mosaic thump',
   '；開場曲那種振奮人心的訊息，正是入手這張的理由。', '；開場曲便以振奮人心的訊息定下全張基調。'],
  ['desc2:de la soul|aoi: mosaic thump',
   '，開場曲振奮人心的訊息正是入手這張的理由。', '，開場曲便以振奮人心的訊息定下全張基調。'],
];
const once = (s, a) => s.split(a).length === 2;
const dump = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const puts = [], log = [];
for (const [key, a, b] of FIX) {
  const old = JSON.parse(dump[key]).desc;
  if (!once(old, a)) throw new Error(`KV ${key} 找不到唯一的原句`);
  const desc = old.replace(a, b);
  puts.push({ key, value: JSON.stringify({ desc }) });
  log.push({ key, before: old, after: desc, len: [...desc].length });
}
const mf = 'onboarding-manifest-c36-reels-20260822.json';
const m = JSON.parse(fs.readFileSync(mf, 'utf8'));
let mfHits = 0;
for (const row of m.albums) for (const [, a, b] of FIX)
  if (row.description?.text && once(row.description.text, a)) { row.description.text = row.description.text.replace(a, b); mfHits++; }
fs.writeFileSync(mf, JSON.stringify(m, null, 2) + '\n');
fs.writeFileSync('publish-stage/kv-desc-shop-voice-20261019.json', JSON.stringify(puts));
fs.writeFileSync('batch-progress/desc-shop-voice-20261019/changes.json', JSON.stringify(log, null, 1) + '\n');
console.log(`KV ${puts.length} 鍵；manifest 改 ${mfHits} 處`); for (const l of log) console.log(l.len, l.key);
