#!/usr/bin/env node
// 藝人介紹：把審過的寫作層成品建成前端讀的靜態分片。
//
// 用法（cwd 為 repo 根）：
//   node scripts/build-artist-intros.mjs            讀 desc-tools/batches/artist/output/*-out.json，寫 data/artist-intros/
//   node scripts/build-artist-intros.mjs --check    只驗證、不寫檔
//
// 產出：
//   data/artist-intros/manifest.json   {v, shards, count, updatedAt}
//   data/artist-intros/<00–63>.json    {v, entries: {<藝人鍵>: {name, intro, rev}}}，只寫有內容的分片
//
// 藝人鍵 = 卡池藝人欄 NFC → trim → 小寫（與名冊、/album-desc 的 KV 鍵同一套）。
// 分片號 = FNV-1a 32 位元（逐個 UTF-16 碼元）mod 64。**前端 dip-artist-intro.js 用同一個函式**，
// 兩邊不一致就會一張都查不到——改這裡一定要一起改那邊。
// （ARTIST_INTRO_PLAN.md 原規劃用 md5，但瀏覽器的 SubtleCrypto 沒有 md5，改用 FNV-1a。
//   名冊 roster-*.json 的 shard 欄是 md5 算的，不再使用。）
//
// 同一個鍵在多批出現時，檔名排序在後的蓋前面（重寫稿放新批次即可）。
// 任何一筆不合格就整批不寫——與 pages-build.sh 的守門同一個精神：寧可不上，也不上半套。
import fs from 'node:fs'
import path from 'node:path'

const CHECK_ONLY = process.argv.includes('--check')
const SHARDS = 64
const OUT_SRC = 'desc-tools/batches/artist/output'
const OUT_DIR = 'data/artist-intros'

const norm = s => String(s || '').normalize('NFC').trim().toLowerCase()
export function shardOf(key) {
  let h = 0x811c9dc5
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h % SHARDS
}

const rosterFile = fs.readdirSync('batch-progress/artist-intro').filter(f => /^roster-\d+\.json$/.test(f)).sort().pop()
const roster = new Map(JSON.parse(fs.readFileSync(path.join('batch-progress/artist-intro', rosterFile), 'utf8')).entries.map(e => [e.key, e]))

const files = fs.readdirSync(OUT_SRC).filter(f => /-out\.json$/.test(f)).sort()
const errors = []
const entries = new Map()
for (const f of files) {
  const rev = f.replace(/-out\.json$/, '')
  for (const r of JSON.parse(fs.readFileSync(path.join(OUT_SRC, f), 'utf8'))) {
    const key = norm(r.key)
    const e = roster.get(key)
    const intro = String(r.intro || '').trim()
    const n = Array.from(intro).length
    if (!e) { errors.push(`${f}：名冊沒有 ${key}`); continue }
    if (r.name !== e.name) errors.push(`${f}：${key} 名字「${r.name}」≠ 名冊「${e.name}」`)
    if (!intro) errors.push(`${f}：${e.name} 沒有正文`)
    if (n > 250) errors.push(`${f}：${e.name} ${n} 字，超過 250`)
    if (key === 'various artists') errors.push(`${f}：Various Artists 不寫介紹`)
    entries.set(key, { name: e.name, intro, rev })
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} 處不合格，未寫檔：\n  ` + errors.join('\n  '))
  process.exit(1)
}

const byShard = new Map()
for (const [key, v] of entries) {
  const s = shardOf(key)
  if (!byShard.has(s)) byShard.set(s, {})
  byShard.get(s)[key] = v
}
console.log(`${files.length} 份成品、${entries.size} 位藝人、${byShard.size} 個分片有內容`)
if (CHECK_ONLY) process.exit(0)

fs.rmSync(OUT_DIR, { recursive: true, force: true })
fs.mkdirSync(OUT_DIR, { recursive: true })
for (const [s, e] of [...byShard].sort((a, b) => a[0] - b[0])) {
  fs.writeFileSync(path.join(OUT_DIR, `${String(s).padStart(2, '0')}.json`), JSON.stringify({ v: 1, entries: e }))
}
const manifest = { v: 1, shards: SHARDS, count: entries.size, updatedAt: new Date().toISOString().replace(/\.\d+Z$/, 'Z') }
fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest))
console.log(`寫出 ${OUT_DIR}/manifest.json 與 ${byShard.size} 個分片`)
