// 2026-11-06：卡池中沒有介紹、不在任何名冊、也從沒排進批次的藝人，補登補充名冊 roster-fill-20261106.json，
// 依卡數取前 N 位、按主類型分組切成 ar-d-8xx（ar-d-2xx、5xx 已有其他工作階段依序使用，避開）。
// 用法：node batch-progress/artist-intro/fill-20261106.mjs [N=800] [起始批號=501] [--dry]
import fs from 'node:fs'
const ROOT = '/home/user/dip-vinyl-shop'
const D = ROOT + '/batch-progress/artist-intro/'
const PROG = ROOT + '/desc-tools/batches/artist/progress.json'
const args = process.argv.slice(2).filter(a => !a.startsWith('--'))
const N = +(args[0] || 800), START = +(args[1] || 501), DRY = process.argv.includes('--dry')
const norm = n => String(n).normalize('NFC').trim().toLowerCase().replace(/\s+/g, ' ')
const cards = JSON.parse(fs.readFileSync(ROOT + '/seed_cards.json', 'utf8'))
const inRoster = new Set()
for (const f of fs.readdirSync(D).filter(f => /^roster-.+\.json$/.test(f))) for (const e of JSON.parse(fs.readFileSync(D + f, 'utf8')).entries || []) inRoster.add(e.key)
const pub = new Set()
for (const f of fs.readdirSync(ROOT + '/data/artist-intros')) { if (f === 'manifest.json') continue; for (const k of Object.keys(JSON.parse(fs.readFileSync(ROOT + '/data/artist-intros/' + f, 'utf8')).entries)) pub.add(k) }
const alias = new Set(Object.values(JSON.parse(fs.readFileSync(ROOT + '/desc-tools/batches/artist/aliases.json', 'utf8'))).flat())
const prog = JSON.parse(fs.readFileSync(PROG, 'utf8'))
const queued = new Set(prog.batches.flatMap(b => b.keys || []))
const m = new Map()
for (const c of cards) {
  const [name, album, , , , genres, year] = c; const k = norm(name)
  if (inRoster.has(k) || pub.has(k) || alias.has(k) || queued.has(k) || k === 'various artists') continue
  const e = m.get(k) || { key: k, name, cards: 0, g: {}, years: [], albums: [] }
  e.cards++; const g = (genres && genres[0]) || 'rock'; e.g[g] = (e.g[g] || 0) + 1
  if (year) e.years.push(year); e.albums.push(album); m.set(k, e)
}
const script = n => /[぀-ヿ]/.test(n) ? 'ja' : /[가-힯]/.test(n) ? 'ko' : /[一-鿿]/.test(n) ? 'zh' : /[Ѐ-ӿ]/.test(n) ? 'cyr' : /^[\x00-ɏḀ-ỿ\s\p{P}\p{S}\d]+$/u.test(n) ? 'latin' : 'other'
const collab = n => /\s(&|and|with|featuring|feat\.)\s|,\s|\s\/\s/i.test(n)
const all = [...m.values()].map(e => ({
  key: e.key, name: e.name, variants: null, cards: e.cards, tier: 'D',
  mainGenre: Object.entries(e.g).sort((a, b) => b[1] - a[1])[0][0],
  yearMin: e.years.length ? Math.min(...e.years) : null, yearMax: e.years.length ? Math.max(...e.years) : null,
  script: script(e.name), classicalPerformer: Object.entries(e.g).sort((a, b) => b[1] - a[1])[0][0] === 'classical', collab: collab(e.name),
  sampleAlbums: e.albums.slice(0, 3), addedBy: 'fill-20261106'
}))
const pick = [...all].sort((a, b) => b.cards - a.cards || a.key.localeCompare(b.key)).slice(0, N)
  .sort((a, b) => a.mainGenre.localeCompare(b.mainGenre) || b.cards - a.cards || a.key.localeCompare(b.key))
const batches = []
for (let i = 0; i < pick.length; i += 40) {
  const chunk = pick.slice(i, i + 40); const id = 'ar-d-' + (START + batches.length)
  batches.push({ batch: id, tier: 'D', genres: [...new Set(chunk.map(e => e.mainGenre))], keys: chunk.map(e => e.key), state: 'cut', note: '卡池缺介紹藝人補登（fill-20261106，依卡數取前 ' + N + ' 位）' })
}
console.log('候選', all.length, '取', pick.length, '批', batches.length, batches.map(b => b.batch + ':' + b.genres.join('/')).join(' '))
if (DRY) process.exit(0)
if (prog.batches.some(b => batches.some(x => x.batch === b.batch))) { console.error('批號已存在'); process.exit(1) }
fs.writeFileSync(D + 'roster-fill-20261106.json', JSON.stringify({ generatedAt: '2026-11-06', source: 'seed_cards.json', addedBy: 'fill-20261106', artists: pick.length, entries: pick }, null, 1) + '\n')
for (const b of batches) fs.writeFileSync(ROOT + '/desc-tools/batches/artist/cut/' + b.batch + '.txt', b.keys.join('\n') + '\n')
prog.batches.push(...batches); fs.writeFileSync(PROG, JSON.stringify(prog, null, 1) + '\n')
console.log('寫入名冊與 progress')
