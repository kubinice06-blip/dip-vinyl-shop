#!/usr/bin/env node
// 藝人介紹產線・彙整補洞層記下的「已上線專輯簡介問題」（pubIssues），交店主在本機改 KV。cwd 必須是 desc-tools/。
//
//   node artist-issues.mjs            掃全部 batches/artist/research/*-g*.json，寫 ../audits/ARTIST-PUB-ISSUES.md
//   node artist-issues.mjs <批名...>  只掃指定批次，印到終端
import fs from 'node:fs'
import path from 'node:path'

const only = process.argv.slice(2)
const RDIR = 'batches/artist/research'
const files = fs.readdirSync(RDIR).filter(f => /-g\d+\.json$/.test(f))
  .filter(f => !only.length || only.some(b => f.startsWith(`${b}-g`))).sort()
const rows = []
for (const f of files) {
  for (const r of JSON.parse(fs.readFileSync(path.join(RDIR, f), 'utf8'))) {
    for (const i of r.pubIssues || []) rows.push({ batch: f.replace(/-g\d+\.json$/, ''), name: r.name, ...i })
  }
}
const cell = s => String(s || '').replace(/\|/g, '／').replace(/\s+/g, ' ')
const md = [
  '# 已上線專輯簡介問題（藝人介紹補洞層查到）',
  '',
  `自動彙整，\`desc-tools/artist-issues.mjs\` 產生；共 ${rows.length} 條。改完 KV 後在「處理」欄註記，或整列刪除。`,
  '',
  '| 批次 | 藝人 | 專輯 | 上線簡介寫法 | 問題 | 依據 |',
  '|---|---|---|---|---|---|',
  ...rows.map(r => `| ${r.batch} | ${cell(r.name)} | ${cell(r.album)} | ${cell(r.claim)} | ${cell(r.problem)} | ${cell(r.src)} |`),
  '',
].join('\n')
if (only.length) { console.log(md); process.exit(0) }
fs.writeFileSync('../audits/ARTIST-PUB-ISSUES.md', md)
console.log(`寫出 ../audits/ARTIST-PUB-ISSUES.md（${rows.length} 條）`)
