#!/usr/bin/env node
// 藝人介紹產線・補洞前的「維基預抓」（2026-10-03 省額度改版）。cwd 必須是 desc-tools/。
//
//   node artist-wiki.mjs <批名>
//
// 讀 batches/artist/facts/<批名>-facts.json，對每位藝人用 MediaWiki API 抓：
//   - 英文維基：導言＋生平／風格／影響／逝世等段落（純文字，截斷）
//   - 母語維基（script 為 zh／ja／ko／cyr 時）：同上，較短
//   - Wikidata：生卒年、出生地、成軍／解散年（結構化，當生卒年的第二源）
// 寫 batches/artist/cache/<批名>-wiki.json（gitignore，可隨時重抓）。
//
// 起因：2026-10-02 統計 231 支補洞代理共 14,238 次 WebFetch，30% 是英文維基、22% 是 403／402／付費牆。
// 每次 WebFetch 都是一個回合，回合數 × 上下文長度＝額度。維基改由腳本一次抓好，代理只去補第二源。
// 身分判定仍由代理負責：albumHits 是頁面提到幾張卡池專輯，0 的要自己核對是否同名不同人。
import fs from 'node:fs'

const batch = process.argv[2]
if (!batch) { console.error('用法: node artist-wiki.mjs <批名>'); process.exit(1) }
const UA = 'dip-vinyl-shop/1.0 ( https://github.com/kubinice06-blip/dip-vinyl-shop )'
const LOCAL = { zh: 'zh', ja: 'ja', ko: 'ko', cyr: 'ru' }
const KEEP = /early|life|background|biograph|career|style|music|legacy|influence|death|personal|honou?r|award|生平|經歷|经历|早年|風格|风格|音樂|音乐|影響|影响|評價|评价|逝世|死去|来歴|経歴|人物|音楽|評価|作風|생애|경력|음악|평가|биограф|творч|жизн|карьер|стиль|наслед|смерть/i
const DROP = /discograph|album|single|filmograph|see also|reference|external|further|note|bibliograph|作品|唱片|專輯|专辑|ディスコ|参考|脚注|외부|참고|음반|дискограф|литератур|ссылк|примечан/i
const sleep = ms => new Promise(r => setTimeout(r, ms))

async function api(host, params) {
  const u = `https://${host}/w/api.php?` + new URLSearchParams({ format: 'json', formatversion: '2', ...params })
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(u, { headers: { 'User-Agent': UA } })
      if (r.ok) return await r.json()
    } catch {}
    await sleep(1000 * (i + 1))
  }
  return null
}

const norm = s => String(s || '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()

// 純文字全文 → 導言＋保留段落，總長截到 cap 字
function trim(text, cap) {
  const parts = text.split(/\n(?===+ )/)
  let out = parts[0].trim()
  for (const p of parts.slice(1)) {
    const h = (p.match(/^=+\s*(.+?)\s*=+/) || [])[1] || ''
    if (DROP.test(h) || !KEEP.test(h)) continue
    out += '\n' + p.replace(/^=+\s*(.+?)\s*=+/, '【$1】').replace(/\n{2,}/g, '\n').trim()
    if (out.length > cap) break
  }
  return out.length > cap ? out.slice(0, cap) + '…' : out
}

async function page(host, title, cap) {
  const j = await api(host, { action: 'query', prop: 'extracts|pageprops|langlinks', explaintext: '1', redirects: '1',
    titles: title, lllimit: '500', ppprop: 'wikibase_item|disambiguation' })
  const p = j?.query?.pages?.[0]
  if (!p || p.missing || !p.extract) return null
  return { title: p.title, url: `https://${host}/wiki/${encodeURIComponent(p.title.replace(/ /g, '_'))}`,
    disambig: 'disambiguation' in (p.pageprops || {}), qid: p.pageprops?.wikibase_item || null,
    langlinks: Object.fromEntries((p.langlinks || []).map(l => [l.lang, l.title])), full: p.extract, text: trim(p.extract, cap) }
}

async function search(host, q) {
  const j = await api(host, { action: 'query', list: 'search', srsearch: q, srlimit: '5', srprop: '' })
  return (j?.query?.search || []).map(s => s.title)
}

const GENRE_WORD = { jazz: 'jazz', soul: 'soul', rock: 'band', pop: 'singer', hiphop: 'rapper', blues: 'blues', metal: 'band', funk: 'funk', reggae: 'reggae', country: 'country' }
const LOCAL_JAZZ = { ru: 'джаз', ja: 'ジャズ', zh: '爵士', ko: '재즈' }
const KANA = /[\u3040-\u30ff]/
// 編制尾巴（トリオ、クァルテット、「とサウンド・リミテッド」⋯）：C 級以團長為主詞，查團長本人
// 「A & B」「A & the X」：兩人合名各查一次，樂團名義查領隊
const variants = name => [...new Set([name, name.replace(/^the\s+/i, ''), ...name.split(/\s+(?:&|and)\s+/i).filter(v => !/^the\s/i.test(v)), name.replace(/\s*(トリオ|クァルテット|カルテット|クインテット|セクステット|セプテット|オクテット|オーケストラ|と.+|trio|quartet|quintet|sextet|orchestra)$/i, '')])].filter(Boolean)
const toks = s => new Set(norm(s).split(' ').filter(Boolean))
const NONPERSON = /\((.*\b)?(album|song|single|ep|film|soundtrack)\)$|greatest hits|discography|\bbest of\b/i
// exact：標題（去括號）與名字字詞完全相同；tokens：名字的字詞全在標題裡（俄文維基「姓, 名 父名」）；CJK 無空格時看包含
function matchKind(title, v) {
  if (NONPERSON.test(title)) return null
  const base = title.replace(/\s*\(.*\)$/, '')
  const a = toks(base), b = toks(v)
  if (a.size === b.size && [...b].every(t => a.has(t))) return 'exact'
  if ([...b].every(t => a.has(t))) return 'tokens'
  if (b.size === 1 && a.size === 1 && norm(base).includes(norm(v)) && norm(v).length >= 2) return 'tokens'
  return null
}
// 與藝人同名的專輯（同名首張）不算數：任何同名頁都會「提到」它
const hits = (x, p) => x.poolAlbums.filter(a => norm(a.album).length > 1 && !norm(x.name).includes(norm(a.album)) && norm(p.full).includes(norm(a.album))).length

// 在一個維基找最像的頁：先要提到卡池專輯，其次 exact
async function findOn(host, x, cap, extraWord) {
  let best = null
  for (const v of variants(x.name)) {
    const qs = [v, extraWord && `${v} ${extraWord}`].filter(Boolean)
    const titles = [...new Set((await Promise.all(qs.map(q => search(host, q)))).flat())]
    for (const t of titles.slice(0, 8)) {
      const kind = matchKind(t, v)
      if (!kind) continue
      const p = await page(host, t, cap)
      if (!p || p.disambig) continue
      p.match = kind; p.albumHits = hits(x, p)
      if (kind === 'tokens' && !p.albumHits) continue  // 只是標題含名字、又沒提到卡池專輯：多半是別的條目
      const score = p.albumHits * 10 + (kind === 'exact' ? 3 : 0)
      if (!best || score > best.score) best = Object.assign(p, { score })
    }
    if (best?.albumHits) break
  }
  return best
}

async function wikidata(qid) {
  if (!qid) return null
  const j = await api('www.wikidata.org', { action: 'wbgetentities', ids: qid, props: 'claims', languages: 'en' })
  const c = j?.entities?.[qid]?.claims || {}
  const val = p => c[p]?.[0]?.mainsnak?.datavalue?.value
  const time = p => val(p)?.time?.replace(/^\+/, '').replace(/T.*$/, '').replace(/-00/g, '') || null
  const ent = p => val(p)?.id || null
  const out = { qid, url: `https://www.wikidata.org/wiki/${qid}`, born: time('P569'), died: time('P570'), formed: time('P571'), dissolved: time('P576') }
  const place = ent('P19')
  if (place) {
    const k = await api('www.wikidata.org', { action: 'wbgetentities', ids: place, props: 'labels', languages: 'en|zh' })
    out.birthplace = k?.entities?.[place]?.labels?.en?.value || null
  }
  for (const k of Object.keys(out)) if (out[k] == null) delete out[k]
  return out
}

const bank = JSON.parse(fs.readFileSync(`batches/artist/facts/${batch}-facts.json`, 'utf8'))
fs.mkdirSync('batches/artist/cache', { recursive: true })
const outFile = `batches/artist/cache/${batch}-wiki.json`
const done = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : []
const have = new Set(done.map(d => d.key))

for (const x of bank) {
  if (have.has(x.key)) continue
  const rec = { key: x.key, name: x.name }
  const word = x.mainGenre === 'jazz' ? 'jazz' : GENRE_WORD[x.mainGenre] || 'musician'
  let local = null
  // 漢字名（script zh）常是日本樂手：ja 與 zh 都查，提到卡池專輯者勝；平手時卡池專輯有假名→ja，沒有→zh
  const langs = x.script === 'zh' ? ['zh', 'ja'] : LOCAL[x.script] ? [LOCAL[x.script]] : []
  const kanaPool = x.poolAlbums.some(a => KANA.test(a.album)) || KANA.test(x.name)
  for (const lang of langs) {
    const p = await findOn(`${lang}.wikipedia.org`, x, 3000, x.mainGenre === 'jazz' ? LOCAL_JAZZ[lang] : null)
    if (!p) continue
    p.lang = lang; p.score += (lang === 'ja') === kanaPool ? 5 : 0
    if (!local || p.score > local.score) local = p
  }
  let en = null
  if (local?.langlinks?.en) {
    en = await page('en.wikipedia.org', local.langlinks.en, 5000)
    if (en) { en.match = 'langlink'; en.albumHits = hits(x, en) }
  }
  if (!en) en = await findOn('en.wikipedia.org', x, 5000, word)
  const strip = p => p && { title: p.title, url: p.url, match: p.match, albumHits: p.albumHits,
    ...(p.albumHits ? {} : { warn: '頁面未提到卡池專輯，身分待核（可能同名不同人）' }), text: p.text }
  rec.en = strip(en)
  if (local) rec.local = { lang: local.lang, ...strip(local) }
  rec.wikidata = await wikidata(en?.qid || local?.qid)
  done.push(rec)
  fs.writeFileSync(outFile, JSON.stringify(done, null, 1) + '\n')
  console.log(`${x.key}｜en:${en ? en.title + '(' + en.albumHits + ')' : '—'}${local ? '｜' + local.lang + ':' + local.title + '(' + local.albumHits + ')' : ''}`)
}
const miss = done.filter(d => !d.en && !d.local).map(d => d.key)
console.log(`\n${done.length} 位，查無維基 ${miss.length}：${miss.join('、')}`)
