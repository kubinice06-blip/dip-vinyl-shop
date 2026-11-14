export const meta = {
  name: 'cover-edition-classify-1lens',
  description: 'Visual classification of main-site album covers: normal original vs CD/special/reissue edition',
  phases: [{ title: 'Classify', detail: 'one combined lens, several sheets per agent' }],
}
const DIR = args.dir
// args.sheets＝[{path, from, to}]；或 args.range＝{prefix, first, last, per, total}（sheets/<prefix>-NNN.jpg，每張 per 格）
const SHEETS = args.sheets || (() => {
  const R = args.range, out = []
  for (let n = R.first; n <= R.last; n++) {
    const from = n * R.per, to = Math.min(R.total - 1, from + R.per - 1)
    out.push({ path: `${DIR}/sheets/${R.prefix}-${String(n).padStart(3, '0')}.jpg`, from, to })
  }
  return out
})()
const PER = args.per || 3
const ITEMS = args.items
const TAG = args.tag || 'x'
const SCHEMA = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          idx: { type: 'integer' },
          verdict: { type: 'string', enum: ['keep', 'need', 'unsure'] },
          defect: { type: 'string', description: 'defect type number(s) 1-5 and a short description when not keep; empty for keep' },
          reason: { type: 'string' },
        },
        required: ['idx', 'verdict', 'reason'],
      },
    },
  },
  required: ['items'],
}
const groups = []
for (let i = 0; i < SHEETS.length; i += PER) groups.push(SHEETS.slice(i, i + PER))
phase('Classify')
const res = await parallel(groups.map((g, gi) => () => agent(
`你在幫唱片行網站清查專輯封面，找出「用成 CD 版或其他特別版、不是正常原版」的封面。先讀判定規則：${DIR}/RULES.md（必讀，照它判）。

每一格同時用兩個角度看：
(1) **挑毛病**：RULES.md 的五種問題——尤其肉眼可見的：原封面被縮小內嵌在框或底色裡、畫了光碟／外盒、印上 K2HD／XRCD／SHM-CD／Remastered／Deluxe／Anniversary／Expanded 之類字樣或貼紙、系列 logo 方塊（OBC／OJC／RVG 等）或系列套版、實物照片（側標 obi、貼紙、反光、歪斜、嚴重褪色）、盜版站浮水印、根本不是這張專輯。
(2) **對原版**：這張專輯通行的原版封面長什麼樣（你確實記得的才算）？NOW 是不是同一套設計？確知原版是另一套 → need；不確定原版、而 NOW 的版面像重發（CD 時代排版、系列標誌、跟發行年代不符的設計語彙）→ unsure。
兩個角度都沒有疑點才給 keep。

${args.extra || ''}

要看的對照表（用 Read 開圖檔；每格上方是封面，下方是 [序號] 藝人《專輯》卡上年份，以及這張圖的來源資訊）：
${g.map(s => `- ${s.path}（序號 ${s.from}–${s.to}）`).join('\n')}

看不清楚時可跑：python3 -I ${DIR}/compare.py ${ITEMS} /tmp/cmp-${TAG}-${gi}.jpg <序號> [序號…]  產生 300px 大圖再 Read（只在真的需要時用，別每格都放大）。

這批對照表只有 NOW 一張圖：NOW 有問題就給 need（不用找替換圖，下一關會找）。每個序號都要給一筆：verdict（keep／need／unsure）、defect（不是 keep 時寫問題類型編號與一句描述）、reason（一句話，台灣用語）。不要漏號。`,
  { label: `${TAG}:${g[0].path.split('/').pop()}`, phase: 'Classify', schema: SCHEMA })))
const by = {}
let missing = 0
res.forEach((r, gi) => {
  if (!r) { missing++; return }
  for (const it of r.items) by[it.idx] = it
})
const expected = SHEETS.reduce((n, s) => n + (s.to - s.from + 1), 0)
log(`classified ${Object.keys(by).length}/${expected}; failed groups ${missing}`)
return by
