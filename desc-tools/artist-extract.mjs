#!/usr/bin/env node
// 藝人介紹產線・第一步「萃取」：把既有專輯研究稿依藝人聚合成事實庫。
//
// 用法（cwd 必須是 desc-tools/，與其他 desc-tools 腳本一致）：
//   node artist-extract.mjs <批名> <藝人鍵1> [藝人鍵2 ...]
//   node artist-extract.mjs <批名> --file keys.txt        # 一行一個藝人鍵
//
// 藝人鍵 = 卡池藝人欄 NFC → trim → 小寫（與 batch-progress/artist-intro/roster-*.json 的 key 相同）。
//
// 讀：
//   batches/research/*.json            專輯研究稿（facts[].f／src、notes、status）
//   ../onboarding-manifest-*.json      上架 manifest，description.text 是「審過、已上線」的專輯簡介
//   ../seed_cards.json                 卡池本體（列出該藝人在卡池裡的全部專輯）
//   ../batch-progress/artist-intro/roster-*.json  名冊（分級、主類型、文字系統等）
// 寫：
//   batches/artist/facts/<批名>-facts.json
//
// ⚠ 研究稿與上線簡介不一致時，以上線簡介為準。
// 人工審稿的更正只修在成品上、沒有寫回研究稿，所以研究稿可能保留已經被修掉的錯。
// 這支腳本只負責把兩者並排放好，判斷交給補洞層與寫作層。
import fs from 'node:fs'
import path from 'node:path'

// --lean（2026-09-29 第二輪試做起）：每張專輯只留命中三格線索的事實、每張至多 4 條，研究 notes 不帶。
// 起因：第一輪 A 級的事實庫整包交給補洞代理（Lee Morgan 96 條＋22 篇上線簡介），光讀就吃掉大半 token，
// 而專輯研究稿多半是曲目秒數、錄音日期這類寫藝人介紹用不到的東西。上線簡介照樣全帶——衝突比對要靠它。
const argv = process.argv.slice(2)
const LEAN = argv.includes('--lean')
const [batch, ...rest] = argv.filter(a => a !== '--lean')
if (!batch || !rest.length) {
  console.error('用法: node artist-extract.mjs [--lean] <批名> <藝人鍵...> | --file keys.txt')
  process.exit(1)
}
const norm = s => String(s || '').normalize('NFC').trim().toLowerCase()
const keys = (rest[0] === '--file'
  ? fs.readFileSync(rest[1], 'utf8').split(/\r?\n/)
  : rest).map(norm).filter(Boolean)

const ROOT = path.resolve('..')
const rosterFile = fs.readdirSync(path.join(ROOT, 'batch-progress/artist-intro'))
  .filter(f => /^roster-\d+\.json$/.test(f)).sort().pop()
const roster = new Map(JSON.parse(fs.readFileSync(path.join(ROOT, 'batch-progress/artist-intro', rosterFile), 'utf8'))
  .entries.map(e => [e.key, e]))

const missing = keys.filter(k => !roster.has(k))
if (missing.length) { console.error('名冊裡沒有這些鍵：', missing.join('、')); process.exit(1) }
const want = new Set(keys)

// 卡池：該藝人的全部專輯
const pool = new Map(keys.map(k => [k, []]))
for (const c of JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'))) {
  const k = norm(c[0])
  if (want.has(k)) pool.get(k).push({ album: c[1], year: c[6] || null, genres: c[5] || [], composer: c[7] || null })
}

// 研究稿：同一張專輯可能在多批出現（重跑、補救），全部保留並標批名
const research = new Map(keys.map(k => [k, []]))
const RDIR = 'batches/research'
for (const f of fs.readdirSync(RDIR).filter(f => f.endsWith('.json')).sort()) {
  let rows
  try { rows = JSON.parse(fs.readFileSync(path.join(RDIR, f), 'utf8')) } catch { continue }
  if (!Array.isArray(rows)) continue
  for (const r of rows) {
    const k = norm(r?.artist)
    if (!want.has(k)) continue
    research.get(k).push({
      batch: f.replace(/\.json$/, ''),
      album: r.album,
      status: r.status || null,
      facts: (r.facts || []).map(x => typeof x === 'string' ? { f: x, src: null } : { f: x.f, src: x.src || null }),
      notes: r.notes || '',
    })
  }
}

// 上線簡介：manifest 的 description.text（同一張卡在多份 manifest 出現時取檔名排序最後一份）
const published = new Map(keys.map(k => [k, new Map()]))
for (const f of fs.readdirSync(ROOT).filter(f => /^onboarding-manifest-.*\.json$/.test(f)).sort()) {
  let m
  try { m = JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8')) } catch { continue }
  for (const a of m?.albums || []) {
    const k = norm(a?.artist)
    const t = a?.description?.text
    if (!want.has(k) || !t) continue
    published.get(k).set(norm(a.album), { album: a.album, manifest: f, desc: t, sourceUrls: a.description.sourceUrls || [] })
  }
}

// 三格粗篩：只是提示，不是判決。補洞層要自己讀過事實再判。
const SLOT = {
  identity: /(出生|生於|出身|來自|成立|組成|組團|成軍|born|formed|founded|國籍|籍|小號手|薩克斯風手|鋼琴家|鼓手|貝斯手|吉他手|風琴手|歌手|指揮|作曲家|編曲家|樂團由|[二三四五六七]人組|三重奏|四重奏|五重奏)/,
  era: /(\d{4}\s*年代|\d{4}\s*年(?:起|至|到)|生涯|出道|首張|最後一張|逝世|去世|過世|辭世|解散|died|\d{4}\s*[–-]\s*\d{4})/,
  position: /(簽約|簽下|加入|離開|旗下|廠牌|樂團成員|師承|影響|hard[- ]?bop|bebop|bop|cool|free|modal|soul[- ]jazz|fusion|場景|流派|運動|先驅|開創)/i,
}
const ANY_SLOT = new RegExp(Object.values(SLOT).map(r => r.source).join('|'), 'i')
const LEAN_PER_ALBUM = 4
const out = keys.map(k => {
  const e = roster.get(k)
  const rsFull = research.get(k)
  const rs = LEAN
    ? rsFull.map(r => ({ batch: r.batch, album: r.album, facts: r.facts.filter(x => ANY_SLOT.test(x.f)).slice(0, LEAN_PER_ALBUM), notes: '' }))
        .filter(r => r.facts.length)
    : rsFull
  const pub = [...published.get(k).values()]
  const text = [...rs.flatMap(r => r.facts.map(x => x.f)), ...rs.map(r => r.notes), ...pub.map(p => p.desc)].join('\n')
  const slotsHint = Object.fromEntries(Object.entries(SLOT).map(([s, re]) => [s, re.test(text)]))
  return {
    key: k,
    name: e.name,
    tier: e.tier,
    cards: e.cards,
    mainGenre: e.mainGenre,
    yearRange: [e.yearMin, e.yearMax],
    script: e.script,
    collab: e.collab,
    classicalPerformer: e.classicalPerformer,
    poolAlbums: pool.get(k),
    stats: {
      lean: LEAN,
      factsBeforeLean: rsFull.reduce((n, r) => n + r.facts.length, 0),
      researchRecords: rs.length,
      facts: rs.reduce((n, r) => n + r.facts.length, 0),
      publishedDescs: pub.length,
      albumsWithoutMaterial: pool.get(k).filter(p => !rsFull.some(r => norm(r.album) === norm(p.album)) && !published.get(k).has(norm(p.album))).length,
    },
    slotsHint,
    research: rs,
    published: pub,
  }
})

const OUTDIR = 'batches/artist/facts'
fs.mkdirSync(OUTDIR, { recursive: true })
const outPath = path.join(OUTDIR, `${batch}-facts.json`)
fs.writeFileSync(outPath, JSON.stringify(out, null, 1))
console.log(`寫出 ${out.length} 位 → ${outPath}`)
for (const o of out) {
  const h = o.slotsHint
  console.log(`  ${o.name}｜${o.tier} ${o.cards} 張｜研究 ${o.stats.researchRecords} 筆／事實 ${o.stats.facts} 條／上線簡介 ${o.stats.publishedDescs}｜無素材專輯 ${o.stats.albumsWithoutMaterial}｜身分${h.identity ? '✓' : '✗'} 年代${h.era ? '✓' : '✗'} 位置${h.position ? '✓' : '✗'}`)
}
