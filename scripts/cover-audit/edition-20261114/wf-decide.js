export const meta = {
  name: 'cover-edition-decide',
  description: 'For flagged covers, pick the normal original-edition replacement (CAA / Discogs) or keep',
  phases: [{ title: 'Decide', detail: 'compare NOW with CAA and Discogs candidates' }],
}
const DIR = args.dir
const PREFIX = args.prefix
const N = args.count                   // items in decide/<prefix>-items.json
const PER_SHEET = 4
const SHEETS_PER_AGENT = args.per || 3
const SCHEMA = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          idx: { type: 'integer' },
          decision: { type: 'string', enum: ['keep', 'replace', 'none'] },
          choice: { type: 'string', description: 'replace only: a candidate tag (C1/C2/C3/DM/D1/D2/D3), or caa:<mbReleaseId>, or discogs:<discogsReleaseId>' },
          design: { type: 'string', description: 'one line: what the normal original design looks like and how NOW differs' },
          reason: { type: 'string' },
          confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
        },
        required: ['idx', 'decision', 'reason', 'confidence'],
      },
    },
  },
  required: ['items'],
}
const sheetCount = Math.ceil(N / PER_SHEET)
const FIRST = args.first ?? 0, LAST = args.last ?? sheetCount - 1   // 只跑這段對照圖（拆成幾條工作流程並行用）
const groups = []
for (let s = FIRST; s <= LAST; s += SHEETS_PER_AGENT) groups.push([s, Math.min(LAST, s + SHEETS_PER_AGENT - 1)])
phase('Decide')
const res = await parallel(groups.map(([a, b]) => () => agent(
`你在幫唱片行網站把「用成 CD 版／特別版／重發版」的專輯封面換回**正常原版**。先讀規則：${DIR}/RULES.md（必讀；尤其「取捨」0–3 條）。

這些卡在上一關被判為有問題或不確定。對照圖（用 Read 開）：
${Array.from({ length: b - a + 1 }, (_, k) => `- ${DIR}/decide/${PREFIX}-${String(a + k).padStart(3, '0')}.jpg（序號 ${(a + k) * PER_SHEET}–${Math.min(N - 1, (a + k) * PER_SHEET + PER_SHEET - 1)}）`).join('\n')}
每列：NOW＝現在主站的圖；C1–C3＝同一個 MusicBrainz release-group 裡其他有圖的版本（CAA，最省事、不用登記）；DM＝Discogs master 主圖；D1–D3＝Discogs 最早的幾個版本（150px 縮圖）。
完整資料在 ${DIR}/decide/${PREFIX}-items.json（每個序號的 meta：各候選的日期／國別／格式／廠牌／目錄號；dgVersions＝Discogs 全部版本清單〔id、released、country、label、catno、format、thumb〕；mbReleases＝MB 有圖的全部版本）。
要看清單裡沒畫出來的版本：寫一個 rows JSON（[{idx, title, lines:[], cands:[{tag, url, note}]}]，url 用 dgVersions 的 thumb 或 https://coverartarchive.org/release/<id>/front-250），再跑 python3 -I ${DIR}/compare.py --rows <rows.json> /tmp/dec-${PREFIX}-${a}.jpg 後 Read。

每個序號給一筆：
- **keep**：比對之後 NOW 其實就是正常原版、乾淨（上一關誤判）。
- **replace**：choice 填候選 tag（C1/C2/C3/DM/D1/D2/D3），或 caa:<MB release id>、discogs:<Discogs release id>（從 items.json 的清單挑）。挑的圖必須：同一張專輯；是**通行原版設計**；乾淨（不是帶側標 obi、貼紙、浮水印、嚴重褪色歪斜的實拍）；不比 NOW 糊。同樣好時，CAA 優先於 Discogs，發行國的早期版本優先。DM 是 master 主圖，常常就是原版首發，可以選。
- **none**：NOW 確實有問題，但候選裡沒有可用的（全是重發設計、太糊、或抓錯專輯）。
- design：一句話寫原版長什麼樣、NOW 差在哪。confidence：high／medium／low（不確定原版長相就 low）。
不要漏號。台灣用語。`,
  { label: `decide:${PREFIX}:${a}-${b}`, phase: 'Decide', schema: SCHEMA })))
const by = {}
res.forEach(r => { if (r) for (const it of r.items) by[it.idx] = it })
log(`decided ${Object.keys(by).length}/${N}`)
return by
