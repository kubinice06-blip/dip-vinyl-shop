export const meta = {
  name: 'cover-edition-source',
  description: 'Search CAA / Discogs for a clean original-edition cover when no candidate was usable',
  phases: [{ title: 'Source', detail: 'one agent per few cards; Discogs calls spaced to respect rate limit' }],
}
const DIR = args.dir
const P = args.prefix                 // decide/<P>-items.json + decide/<P>-decisions.json
const IDX = args.idx                  // item indices with decision 'none'
const PER = args.per || 4
const SCHEMA = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          idx: { type: 'integer' },
          found: { type: 'boolean' },
          source: { type: 'string', enum: ['caa', 'discogs', 'none'] },
          url: { type: 'string', description: 'full-size image URL to put on the site (CAA: https://coverartarchive.org/release/<mbid>/front ; Discogs: the release primary image uri)' },
          mbReleaseId: { type: 'string' },
          discogsReleaseId: { type: 'integer' },
          edition: { type: 'string', description: 'year country label catno format of the chosen release' },
          reason: { type: 'string' },
        },
        required: ['idx', 'found', 'source', 'reason'],
      },
    },
  },
  required: ['items'],
}
const groups = []
for (let i = 0; i < IDX.length; i += PER) groups.push(IDX.slice(i, i + PER))
phase('Source')
const res = await parallel(groups.map((g, gi) => () => agent(
`你在幫唱片行網站找專輯的**正常原版封面**（現在用的是 CD 版／特別版／重發另做的設計）。先讀 ${DIR}/RULES.md。

要找的卡：${DIR}/decide/${P}-items.json 的序號 ${g.join('、')}；${args.notes ? `\n**這些是重找**：上一輪提議的圖被審查員否決了，否決理由在 ${args.notes}（依 idx 對應；tried＝被否決的那張，不要再選它；votes 裡審查員有時會指出更好的版本，優先查證那個）。\n` : ''}上一關的判定在 ${DIR}/decide/${P}-decisions.json（同序號；design＝原版長什麼樣、reason 裡可能有建議的 Discogs release id）。對照圖在 ${DIR}/decide/${P}-NNN.jpg（NNN＝序號÷4 取整，三位數）。

可以用的來源（照這個優先序）：
1. **CAA**（MusicBrainz）：同一張專輯可能有別的 release-group（例如原版 LP 掛在另一個 RG）。MB 搜尋：curl -s -A 'dip-vinyl-cover-audit/1.0 (+https://dipvinyl.tw)' 'https://musicbrainz.org/ws/2/release?query=…&fmt=json'；每次 MB 請求之間 sleep 2 秒。release 有沒有圖看 cover-art-archive.front；圖網址 https://coverartarchive.org/release/<mbid>/front（看圖用 front-500）。
2. **Discogs**：curl -s -A 'dip-vinyl-cover-audit/1.0 (+https://dipvinyl.tw)' https://api.discogs.com/… （未登入，整台機器共用每分鐘 25 次，別的程式也在用）：**每次請求之間 sleep 5 秒，每張卡最多 6 次**；遇到 429 就 sleep 60 再試一次。/database/search?artist=&release_title=、/masters/<id>/versions?sort=released&sort_order=asc、/releases/<id>（images[0].uri 就是大圖網址）。
看圖：寫 rows JSON（[{idx,title,lines:[],cands:[{tag,url,note}]}]）跑 python3 -I ${DIR}/compare.py --rows <rows.json> /tmp/src-${P}-${gi}.jpg 再 Read。

挑圖的條件（全部要符合）：同一張專輯；通行原版設計（RULES.md 取捨 0–3：發行國、越早越好、但要清楚）；乾淨平面掃描（不要側標、貼紙、浮水印、反光、歪斜實拍）；大圖至少約 500px。找不到合格的就 found=false、source='none'，寫清楚找過哪些。
不要寫任何檔案到 ${DIR} 以外的專案目錄，也不要改 Firestore／KV。台灣用語。`,
  { label: `source:${P}:${g[0]}`, phase: 'Source', schema: SCHEMA })))
const by = {}
res.forEach(r => { if (r) for (const it of r.items) by[it.idx] = it })
log(`sourced ${Object.values(by).filter(x => x.found).length}/${IDX.length}`)
return by
