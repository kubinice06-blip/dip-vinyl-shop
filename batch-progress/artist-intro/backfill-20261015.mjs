// 第十輪：把卡池中不在名冊、也沒有介紹的藝人補進名冊（tier D、addedBy add-20261015-backfill）
import fs from 'node:fs'
const ROOT = '/home/user/dip-vinyl-shop'
const RF = ROOT + '/batch-progress/artist-intro/roster-20260929.json'
const RAW = fs.readFileSync(RF, 'utf8')
const roster = JSON.parse(RAW)
const cards = JSON.parse(fs.readFileSync(ROOT + '/seed_cards.json', 'utf8'))
const norm = n => n.normalize('NFC').trim().toLowerCase().replace(/\s+/g, ' ')
const keys = new Set(roster.entries.map(e => e.key))
const pub = new Set()
for (const f of fs.readdirSync(ROOT + '/data/artist-intros')) { if (f === 'manifest.json') continue; for (const k of Object.keys(JSON.parse(fs.readFileSync(ROOT + '/data/artist-intros/' + f, 'utf8')).entries)) pub.add(k) }
const m = new Map()
for (const c of cards) {
  const [name, album, , , , genres, year] = c; const k = norm(name)
  if (keys.has(k) || pub.has(k)) continue
  const e = m.get(k) || { key: k, name, cards: 0, g: {}, years: [], albums: [] }
  e.cards++; const g = (genres && genres[0]) || 'rock'; e.g[g] = (e.g[g] || 0) + 1
  if (year) e.years.push(year); e.albums.push(album); m.set(k, e)
}
const script = n => /[぀-ヿ]/.test(n) ? 'ja' : /[가-힯]/.test(n) ? 'ko' : /[一-鿿]/.test(n) ? 'zh' : /[Ѐ-ӿ]/.test(n) ? 'cyr' : /^[\x00-ɏḀ-ỿ\s\p{P}\p{S}\d]+$/u.test(n) ? 'latin' : 'other'
const NOTCOLLAB = new Set(['Spick & Span', 'Medeski Martin & Wood', 'Marty & Mystics', 'Paul Jackson, Jr.'])
const collab = n => !NOTCOLLAB.has(n) && /\s(&|and|with|featuring|feat\.)\s|,\s|\s\/\s/i.test(n)
const add = [...m.values()].map(e => ({
  key: e.key, name: e.name, variants: null, cards: e.cards, tier: 'D',
  mainGenre: Object.entries(e.g).sort((a, b) => b[1] - a[1])[0][0],
  yearMin: e.years.length ? Math.min(...e.years) : null, yearMax: e.years.length ? Math.max(...e.years) : null,
  script: script(e.name), classicalPerformer: false, collab: collab(e.name), sampleAlbums: e.albums.slice(0, 3), shard: null, addedBy: 'add-20261015-backfill'
}))
if (process.argv.includes('--dry')) { console.log(add.length, add.filter(e => e.collab).map(e => e.name).join(' | ')); process.exit(0) }
roster.entries.push(...add)
fs.writeFileSync(RF, JSON.stringify(roster) + (RAW.endsWith('\n') ? '\n' : ''))
console.log('added', add.length)
