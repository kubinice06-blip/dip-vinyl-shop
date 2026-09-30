#!/usr/bin/env node
// 藝人介紹產線・切批（ARTIST_INTRO_PLAN.md §9.5）。cwd 必須是 desc-tools/。
//
//   node artist-cut.mjs            依名冊切出全部批次，寫 batches/artist/progress.json 與 batches/artist/aliases.json
//   node artist-cut.mjs --dry      只印統計，不寫檔
//
// 規則：
// - 分級 A→B→C→D，同分級內依主類型聚在一起（爵士先），同類型內卡數多的先。每批 40 位。
// - 已有成品（batches/artist/output/*-out*.json 裡的鍵）的藝人不再切。
// - 同名異寫（alias-candidates 的同一藝人兩種寫法）只切「主鍵」（卡數多的那個），
//   另一個鍵的介紹由 artist-alias.mjs 從主鍵複製、換上自己的名冊名，不另外研究與寫作。
//   主鍵分級決定落在哪一批。
// - progress.json 已存在時，已有 state 的批次原樣保留，只重切 state 為 cut 的批次（開跑後不會重新洗牌）。
import fs from 'node:fs'
import path from 'node:path'

const DRY = process.argv.includes('--dry')
const PER = 40
const TIERS = ['A', 'B', 'C', 'D']
const GENRES = ['jazz', 'soul', 'blues', 'rock', 'folk', 'pop', 'world', 'electronic', 'hiphop', 'classical']
const ROOT = path.resolve('..')
const RDIR = path.join(ROOT, 'batch-progress/artist-intro')
const rosterFile = fs.readdirSync(RDIR).filter(f => /^roster-\d+\.json$/.test(f)).sort().pop()
const roster = JSON.parse(fs.readFileSync(path.join(RDIR, rosterFile), 'utf8')).entries
const byName = new Map(roster.map(e => [e.name, e]))
const byKey = new Map(roster.map(e => [e.key, e]))

// 同名異寫：2026-09-30 主線裁定（逐組看過 alias-candidates）。
// 不併的：伍佰 vs 伍佰 & China Blue、Yo-Yo Ma 馬友友 vs 同名 & Silkroad Ensemble（掛名不同，是不同的演出單位）；
// The Trees vs Trees（無法從名字判定是同一團）。
const NOT_SAME = new Set(['伍佰|伍佰 & China Blue', 'Yo-Yo Ma 馬友友|Yo-Yo Ma 馬友友 & Silkroad Ensemble', 'The Trees|Trees'])
const aliasFile = fs.readdirSync(RDIR).filter(f => /^alias-candidates-\d+\.json$/.test(f)).sort().pop()
const groups = Object.values(JSON.parse(fs.readFileSync(path.join(RDIR, aliasFile), 'utf8'))).flat()
const aliasOf = new Map() // 別名鍵 → 主鍵
const aliases = {}
for (const g of groups) {
  if (NOT_SAME.has(g.join('|'))) continue
  const es = g.map(n => byName.get(n)).filter(Boolean)
  if (es.length < 2) continue
  es.sort((a, b) => b.cards - a.cards || a.name.localeCompare(b.name))
  const [p, ...rest] = es
  aliases[p.key] = rest.map(e => e.key)
  for (const e of rest) aliasOf.set(e.key, p.key)
}

const done = new Set()
const ODIR = 'batches/artist/output'
for (const f of fs.readdirSync(ODIR).filter(f => /-out(?:-\d+)?\.json$/.test(f))) {
  for (const r of JSON.parse(fs.readFileSync(path.join(ODIR, f), 'utf8'))) done.add(r.key)
}

const PROG = 'batches/artist/progress.json'
const prev = fs.existsSync(PROG) ? JSON.parse(fs.readFileSync(PROG, 'utf8')) : { batches: [] }
const kept = prev.batches.filter(b => b.state !== 'cut')
const taken = new Set(kept.flatMap(b => b.keys))

const gi = g => { const i = GENRES.indexOf(g); return i < 0 ? GENRES.length : i }
const batches = [...kept]
for (const t of TIERS) {
  const pool = roster.filter(e => e.tier === t && !done.has(e.key) && !aliasOf.has(e.key) && !taken.has(e.key))
    .sort((a, b) => gi(a.mainGenre) - gi(b.mainGenre) || b.cards - a.cards || a.key.localeCompare(b.key))
  const prefix = `ar-${t.toLowerCase()}-`
  let n = kept.filter(b => b.batch.startsWith(prefix)).length
  for (let i = 0; i < pool.length; i += PER) {
    const slice = pool.slice(i, i + PER)
    n++
    batches.push({ batch: `${prefix}${String(n).padStart(3, '0')}`, tier: t, genres: [...new Set(slice.map(e => e.mainGenre))], keys: slice.map(e => e.key), state: 'cut' })
  }
}

const count = t => batches.filter(b => b.tier === t).reduce((n, b) => n + b.keys.length, 0)
console.log(`已有成品 ${done.size} 位；同名異寫併入主鍵 ${aliasOf.size} 位`)
for (const t of TIERS) console.log(`  ${t}：${batches.filter(b => b.tier === t).length} 批、${count(t)} 位`)
if (DRY) process.exit(0)
fs.writeFileSync(PROG, JSON.stringify({ v: 1, per: PER, roster: rosterFile, updatedAt: new Date().toISOString().replace(/\.\d+Z$/, 'Z'), batches }, null, 1) + '\n')
fs.writeFileSync('batches/artist/aliases.json', JSON.stringify(aliases, null, 1) + '\n')
console.log(`寫出 ${PROG}（${batches.length} 批）與 batches/artist/aliases.json（${Object.keys(aliases).length} 組）`)
