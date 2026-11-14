export const meta = {
  name: 'cover-edition-pair',
  description: 'Compare each current cover (NOW) with reference covers (Discogs / CAA) to catch non-original designs',
  phases: [{ title: 'Pair', detail: 'same design or not, per cell' }],
}
const DIR = args.dir
const P = args.prefix
const N = args.count
const PER_SHEET = 16
const SPA = args.per || 4
const sheetCount = Math.ceil(N / PER_SHEET)
const FIRST = args.first ?? 0, LAST = args.last ?? sheetCount - 1
const SCHEMA = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          idx: { type: 'integer' },
          verdict: { type: 'string', enum: ['same', 'diff', 'defect', 'unsure'] },
          note: { type: 'string', description: 'one short line; required unless same' },
        },
        required: ['idx', 'verdict'],
      },
    },
  },
  required: ['items'],
}
const groups = []
for (let s = FIRST; s <= LAST; s += SPA) groups.push([s, Math.min(LAST, s + SPA - 1)])
phase('Pair')
const res = await parallel(groups.map(([a, b]) => () => agent(
`你在幫唱片行網站清查專輯封面是不是「正常原版」。先讀 ${DIR}/RULES.md。

對照表（用 Read 開）：
${Array.from({ length: b - a + 1 }, (_, k) => `- ${DIR}/pairs/${P}-${String(a + k).padStart(3, '0')}.jpg（序號 ${(a + k) * PER_SHEET}–${Math.min(N - 1, (a + k) * PER_SHEET + PER_SHEET - 1)}）`).join('\n')}
每格：最左 NOW＝網站現在用的封面；右邊是參考圖——DG＝Discogs 上這張專輯的主圖（M＝master 主圖，通常是原版首發；R＝最早有圖的 release）、CA＝MusicBrainz 這張專輯的 CAA 圖。標籤下方有年份。
參考圖可能抓錯（同名別張、精選、單曲、另一個版本），看起來跟這張專輯無關就忽略那張參考圖。

每格判一個：
- **same**：NOW 跟（可信的）參考圖是同一套封面設計（照片／畫作／版面相同；顏色、裁切、清晰度、唱片公司小 logo 有差不算），而且 NOW 沒有 RULES.md 的問題。
- **diff**：NOW 跟可信的參考圖是**不同的設計**（換了照片、重新排版、系列套版、別國另一套），或 NOW 根本是別張專輯。
- **defect**：設計一樣，但 NOW 有 RULES.md 的問題（縮小內嵌、加印 Remastered／Deluxe 等字樣或系列標、obi、貼紙、實拍歪斜、浮水印）。
- **unsure**：參考圖都不可信或互相矛盾，看不出來。
不是 same 的寫一句 note（台灣用語）。看不清可跑 python3 -I ${DIR}/compare.py --rows <rows.json> /tmp/pair-${P}-${a}.jpg 放大（rows 用 ${DIR}/pairs/${P}-items.json 裡同序號的 cands）。每個序號都要給，不要漏。`,
  { label: `pair:${P}:${a}-${b}`, phase: 'Pair', schema: SCHEMA })))
const by = {}
res.forEach(r => { if (r) for (const it of r.items) by[it.idx] = it })
log(`paired ${Object.keys(by).length}/${Math.min(N, (LAST + 1) * PER_SHEET) - FIRST * PER_SHEET}`)
return by
