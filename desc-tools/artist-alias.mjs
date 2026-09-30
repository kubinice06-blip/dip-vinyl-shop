#!/usr/bin/env node
// 藝人介紹產線・同名異寫補鍵。cwd 必須是 desc-tools/。
//
//   node artist-alias.mjs
//
// 讀 batches/artist/aliases.json（artist-cut.mjs 寫的「主鍵 → 別名鍵」），
// 主鍵已有成品的，把正文複製給別名鍵、name 換成別名的名冊名，整份重寫到
// batches/artist/output/zz-alias-out.json（檔名排最後，build 時蓋在最上層；每次整份重生，不手改）。
// 別名鍵自己若已有正式成品（例如試做批寫過），以正式成品為準，不覆蓋。
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve('..')
const RDIR = path.join(ROOT, 'batch-progress/artist-intro')
const rosterFile = fs.readdirSync(RDIR).filter(f => /^roster-\d+\.json$/.test(f)).sort().pop()
const byKey = new Map(JSON.parse(fs.readFileSync(path.join(RDIR, rosterFile), 'utf8')).entries.map(e => [e.key, e]))
const aliases = JSON.parse(fs.readFileSync('batches/artist/aliases.json', 'utf8'))

const ODIR = 'batches/artist/output'
const OUT = 'zz-alias-out.json'
const have = new Map()
for (const f of fs.readdirSync(ODIR).filter(f => /-out(?:-\d+)?\.json$/.test(f) && f !== OUT).sort()) {
  for (const r of JSON.parse(fs.readFileSync(path.join(ODIR, f), 'utf8'))) have.set(r.key, r)
}
const rows = []
for (const [p, list] of Object.entries(aliases)) {
  const src = have.get(p)
  if (!src) continue
  for (const k of list) {
    if (have.has(k)) continue
    rows.push({ key: k, name: byKey.get(k).name, status: src.status, intro: src.intro, src: src.src, aliasOf: p })
  }
}
fs.writeFileSync(path.join(ODIR, OUT), JSON.stringify(rows, null, 1) + '\n')
console.log(`別名補鍵 ${rows.length} 位 → ${ODIR}/${OUT}`)
