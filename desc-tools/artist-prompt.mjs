#!/usr/bin/env node
// 藝人介紹產線・印出派工詞（依 prompts/artist-dispatch.md 填空）。cwd 必須是 desc-tools/。
//
//   node artist-prompt.mjs <批名> gap <1-4>     補洞第 N 組（卡單第 10N-9 到 10N 位）
//   node artist-prompt.mjs <批名> write <1-2>   寫作第 N 組（讀 g1+g2 或 g3+g4）
import fs from 'node:fs'

const [batch, layer, nStr] = process.argv.slice(2)
const n = Number(nStr)
if (!batch || !['gap', 'write'].includes(layer) || !n) { console.error('用法: node artist-prompt.mjs <批名> gap|write <組號>'); process.exit(1) }
const tpl = fs.readFileSync('prompts/artist-dispatch.md', 'utf8')
const block = i => tpl.split('```')[i].replace(/^\n/, '')
const keys = fs.readFileSync(`batches/artist/cut/${batch}.txt`, 'utf8').split('\n').filter(Boolean)
const bank = JSON.parse(fs.readFileSync(`batches/artist/facts/${batch}-facts.json`, 'utf8'))
const name = new Map(bank.map(x => [x.key, x.name]))
const fill = (s, m) => s.replace(/\{\{([^}]+)\}\}/g, (_, k) => { if (!(k in m)) throw new Error(`缺填空：${k}`); return m[k] })

if (layer === 'gap') {
  const mine = keys.slice((n - 1) * 10, n * 10)
  if (!mine.length) { console.error('這組沒有人'); process.exit(1) }
  process.stdout.write(fill(block(1), {
    批名: batch, 組號: String(n), 人數: String(mine.length), 首位鍵: mine[0],
    '逐行：- key｜名冊名': mine.map(k => `- ${k}｜${name.get(k)}`).join('\n'),
  }))
} else {
  const [a, b] = n === 1 ? [1, 2] : [3, 4]
  const cnt = keys.slice((a - 1) * 10, b * 10).length
  process.stdout.write(fill(block(3), { 批名: batch, 組號: String(n), a: String(a), b: String(b), 人數: String(cnt) }))
}
