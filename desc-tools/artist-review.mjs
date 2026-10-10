#!/usr/bin/env node
// 藝人介紹產線・審稿並排（ARTIST_INTRO_PLAN.md §9.2 第 5 步）。cwd 必須是 desc-tools/。
//
//   node artist-review.mjs <批名> [藝人鍵...]
//
// 每位印出：正文與字數 → 補洞稿三格＋era＋里程碑的事實（只印 f 欄，附 bank/new）→ conflicts → notes。
// 並標出正文裡「在事實裡找不到」的四位數年份與其他數字（⚑），審稿時優先對這些。
import fs from 'node:fs'
import path from 'node:path'

const [batch, ...only] = process.argv.slice(2)
if (!batch) { console.error('用法: node artist-review.mjs <批名> [藝人鍵...]'); process.exit(1) }
const norm = s => String(s || '').normalize('NFC').trim().toLowerCase()
const load = (dir, re) => fs.readdirSync(dir).filter(f => re.test(f)).sort()
  .flatMap(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))
const gap = new Map(load('batches/artist/research', new RegExp(`^${batch}-g\\d+\\.json$`)).map(r => [r.key, r]))
const out = load('batches/artist/output', new RegExp(`^${batch}-out(?:-\\d+)?\\.json$`))
const want = new Set(only.map(norm))

for (const o of out) {
  if (want.size && !want.has(o.key)) continue
  const g = gap.get(o.key)
  const t = String(o.intro || '')
  const facts = []
  if (g) {
    for (const s of ['origin', 'sound', 'legacy', 'era']) for (const x of g.slots?.[s]?.facts || []) facts.push([s, x])
    for (const x of g.milestones || []) facts.push(['mile', x])
  }
  const blob = facts.map(([, x]) => x.f).join('\n')
  const nums = [...new Set(t.match(/\d[\d.]*/g) || [])]
  const miss = nums.filter(n => !blob.includes(n))
  console.log(`\n━━ ${o.name}（${o.key}）${o.status} ${Array.from(t).length} 字${miss.length ? `　⚑ 事實裡找不到：${miss.join('、')}` : ''}`)
  console.log(t)
  if (!g) { console.log('  ⚠ 找不到補洞稿'); continue }
  for (const [s, x] of facts) console.log(`  [${s}${x.from === 'new' ? '*' : ''}] ${x.f}`)
  for (const c of g.conflicts || []) console.log(`  ⚔ ${c}`)
  if (g.notes) console.log(`  ✎ ${String(g.notes).replace(/\s+/g, ' ')}`)
}
