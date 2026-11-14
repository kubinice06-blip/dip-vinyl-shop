export const meta = {
  name: 'cover-edition-verify',
  description: 'Adversarially verify proposed original-edition cover replacements with two independent lenses',
  phases: [{ title: 'Verify', detail: 'identity/design lens + image-quality lens, both must confirm' }],
}
const DIR = args.dir
const P = args.prefix
const SHEETS = args.sheets          // number of verify/<P>-NNN.jpg sheets (4 rows each)
const PER = args.per || 3
const SCHEMA = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          idx: { type: 'integer', description: 'the [n] number printed on the row' },
          verdict: { type: 'string', enum: ['confirm', 'refute'] },
          reason: { type: 'string' },
        },
        required: ['idx', 'verdict', 'reason'],
      },
    },
  },
  required: ['items'],
}
const LENS = {
  design: `你的角度：**身分與設計**。逐列檢查 NEW：(1) 真的是這位藝人的這張專輯（看封面上的字、照片；跟 NOW、REF 對得上）；(2) 是這張專輯**通行的原版設計**——不是重發另做的版面、不是別國少見的變體、不是系列套版；(3) NOW 確實有 RULES.md 說的問題，而 NEW 修掉了。任何一點不確定就 refute。`,
  quality: `你的角度：**圖的品質**。逐列檢查 NEW 這張圖本身：沒有側標（obi）、價格貼紙、宣傳貼紙、浮水印、塑膠膜反光、明顯磨損髒污、歪斜透視、拍到封套外的背景；裁切完整（不缺邊）；清晰度不比 NOW 差太多（可以接受稍糊，不能糊到看不清字）；顏色沒有嚴重褪色或偏色。也要確認 NEW 不是「原封面縮小嵌在框裡」或「加印 Remastered/Deluxe 字樣」。有任何一項不合格就 refute。`,
}
const FIRST = args.first ?? 0, LAST = args.last ?? SHEETS - 1
const groups = []
for (let s = FIRST; s <= LAST; s += PER) groups.push([s, Math.min(LAST, s + PER - 1)])
phase('Verify')
const jobs = []
for (const [lens, text] of Object.entries(LENS)) {
  for (const [a, b] of groups) {
    jobs.push(() => agent(
`你是唱片行網站封面替換的**反方審查員**：預設不相信，找理由否決。先讀 ${DIR}/RULES.md。

${text}

對照圖（用 Read 開；每列 NOW＝現用圖、NEW＝提議換上的圖、REF＝另一張參考圖；列首 [n] 是序號，列下有提議理由與原版描述——那是提議者的說法，不一定對）：
${Array.from({ length: b - a + 1 }, (_, k) => `- ${DIR}/verify/${P}-${String(a + k).padStart(3, '0')}.jpg`).join('\n')}
完整資料：${DIR}/verify/${P}-rows.json（每列的 new.url 是實際會寫進網站的網址；可以用 python3 -I ${DIR}/compare.py --rows <自己寫的 rows.json> <out.jpg> 放大單張再看）。

每一列都要給 verdict（confirm／refute）與一句理由（台灣用語）。idx 用列首的 [n]。`,
      { label: `${lens}:${P}:${a}-${b}`, phase: 'Verify', schema: SCHEMA }).then(r => r && { lens, items: r.items }))
  }
}
const res = (await parallel(jobs)).filter(Boolean)
const by = {}
for (const r of res) for (const it of r.items) (by[it.idx] ||= {})[r.lens] = it
return by
