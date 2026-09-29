#!/usr/bin/env node
// 藝人介紹產線・機器 QA。cwd 必須是 desc-tools/。
//   node qa-artist.mjs gap <批名>   補洞層輸出：鍵對事實庫、三格狀態、來源網址、搜尋次數
//   node qa-artist.mjs out <批名>   寫作層輸出：鍵、名字逐字、字數區間、簡體／禁語／開頭／來源
// 有任何 ⚠ 時以 exit code 1 結束，build 腳本可直接拿來當閘門。
import fs from 'node:fs'
import path from 'node:path'

const [stage, batch] = process.argv.slice(2)
if (!['gap', 'out'].includes(stage) || !batch) {
  console.error('用法: node qa-artist.mjs gap|out <批名>')
  process.exit(1)
}
const factsPath = `batches/artist/facts/${batch}-facts.json`
if (!fs.existsSync(factsPath)) { console.error(`找不到事實庫：${factsPath}`); process.exit(1) }
const bank = JSON.parse(fs.readFileSync(factsPath, 'utf8'))
const bankByKey = new Map(bank.map(x => [x.key, x]))

let flags = 0
const warn = (...a) => { flags++; console.log('⚠', ...a) }
const len = s => Array.from(String(s || '')).length
const isUrl = s => /^https:\/\/[^\s]+\.[^\s]+/.test(String(s || ''))
// AI 生成百科站不得當來源（research-base 方法論）
const BAD_SRC = /grokipedia|everybodywiki|wikiwand\.com\/.*ai|chatgpt|perplexity/i

// ── 字元掃描：沿用 qa-batch.mjs 的簡體專用字表與非拉丁偵測 ──
// 「个」不在表內（台語推薦用字），「来」在表內但日文漢字也用，靠白名單剝除本卡藝人名與卡池專輯名。
const SIMP = /[们这来说过时国际开关见证华语电视习动员双专辑签约终选价观论坛对从会众组织实现发达经济应该请问题让边书买卖东车马鸟鱼龙凤丰艺术录历纪乐为无与软权变现类点热战强气长闻队]/
const GARBAGE = /[Ѐ-ӿऀ-ॿ]/
function allowFor(e) {
  return [e.name, ...(e.poolAlbums || []).map(p => p.album)].filter(s => s && s.length > 1)
    .sort((a, b) => b.length - a.length)
}
function stripLegit(s, e) {
  let t = String(s).replace(/《[^》]*》/g, '').replace(/〈[^〉]*〉/g, '')
  for (const a of allowFor(e)) t = t.split(a).join('')
  return t
}
function charScan(label, s, e) {
  const t = stripLegit(s, e)
  if (GARBAGE.test(t)) warn(label, '非拉丁亂碼:', [...new Set(t.match(new RegExp(GARBAGE, 'g')))].join(''))
  if (SIMP.test(t)) warn(label, '簡體字:', [...new Set(t.match(new RegExp(SIMP, 'g')))].join(''))
  if (/[㐀-鿿],|,[㐀-鿿]/.test(t)) warn(label, '半形逗號貼中文')
  const kilo = t.match(/\d{1,3}(?:,\d{3})+(?!\d)/g)
  if (kilo) warn(label, '千分位逗號:', [...new Set(kilo)].join('、'))
}

function readOutputs(dir, pattern) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter(f => pattern.test(f)).sort()
    .flatMap(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).map(x => ({ ...x, _file: f })))
}

function checkKeys(rows) {
  const seen = new Set()
  for (const r of rows) {
    if (!bankByKey.has(r.key)) warn(r._file, `鍵不在事實庫：${r.key}`)
    if (seen.has(r.key)) warn(r._file, `重複鍵：${r.key}`)
    seen.add(r.key)
  }
  const missing = bank.filter(b => !seen.has(b.key)).map(b => b.name)
  if (missing.length) warn(`缺 ${missing.length} 位：`, missing.join('、'))
}

if (stage === 'gap') {
  const rows = readOutputs('batches/artist/research', new RegExp(`^${batch}-g\\d+\\.json$`))
  console.log(`補洞稿 ${rows.length} 位`)
  checkKeys(rows)
  const tally = { bank: 0, gap: 0, none: 0 }
  const notes = []
  let searches = 0
  for (const r of rows) {
    const e = bankByKey.get(r.key) || { name: r.name, poolAlbums: [] }
    const slots = r.slots || {}
    // 2026-09-29 起新格式 origin／sound／legacy（＋輔助 era）；試做三輪是舊格式 identity／era／position
    const SLOTS = slots.legacy ? ['origin', 'sound', 'legacy'] : ['identity', 'era', 'position']
    for (const s of SLOTS) {
      const st = slots[s]?.status
      if (!['bank', 'gap', 'none'].includes(st)) { warn(r.name, `${s} 狀態不合法：${st}`); continue }
      tally[st]++
      const fs_ = slots[s].facts || []
      if (st !== 'none' && !fs_.length) warn(r.name, `${s} 標 ${st} 但沒有事實`)
      // 某格以事實庫為主、另補一兩條新查的事實時，代理常標 bank。內容沒錯，只是狀態該寫 gap；
      // 記成提示、改用實際來源重算，不當錯誤擋（試做批 ar-trial-jazz 四位都是這個形狀）。
      if (st === 'bank' && fs_.some(x => x.from === 'new')) { notes.push(`${r.name}／${s}：標 bank 但含補查事實，統計改計 gap`); tally.bank--; tally.gap++ }
    }
    const all = [...[...new Set([...SLOTS, 'era'])].flatMap(s => slots[s]?.facts || []), ...(r.milestones || [])]
    for (const x of all) {
      if (!isUrl(x.src)) warn(r.name, `來源不是完整 https：${String(x.src).slice(0, 60)}`)
      else if (BAD_SRC.test(x.src)) warn(r.name, `AI 生成站當來源：${x.src}`)
      if (!['bank', 'new'].includes(x.from)) warn(r.name, `from 不合法：${x.from}`)
      // 事實欄照原文保留專名（Мелодия、ソ連盤的原題），只掃簡體；非拉丁污染在成品那一道才擋。
      { const t = stripLegit(x.f, e); if (SIMP.test(t)) warn(`${r.name}／事實`, '簡體字:', [...new Set(t.match(new RegExp(SIMP, 'g')))].join('')) }
      if (/(查無|查不到|uncertain|推翻|主線|【)/.test(x.f)) warn(r.name, 'f 欄混入查證過程：', x.f.slice(0, 40))
    }
    const allBank = SLOTS.every(s => slots[s]?.status === 'bank')
    if (allBank && r.searches > 0) warn(r.name, `三格皆 bank 卻用了 ${r.searches} 次搜尋`)
    if (r.searches > 6) warn(r.name, `搜尋 ${r.searches} 次，超過上限 6`)
    if (!['full', 'thin'].includes(r.status)) warn(r.name, `status 不合法：${r.status}`)
    searches += Number(r.searches) || 0
    const LABEL = { identity: '身分', era: '年代', position: '位置', origin: '身世', sound: '貢獻', legacy: '地位' }
    const line = SLOTS.map(s => `${LABEL[s]}:${slots[s]?.status}`).join(' ')
    console.log(`  ${r.name.padEnd(36)} ${line}｜搜尋 ${r.searches}｜${r.status}｜衝突 ${(r.conflicts || []).length}`)
  }
  for (const n of notes) console.log('ℹ', n)
  console.log(`三格合計 bank ${tally.bank}／gap ${tally.gap}／none ${tally.none}（依實際來源計）；搜尋合計 ${searches} 次`)
}

if (stage === 'out') {
  const rows = readOutputs('batches/artist/output', new RegExp(`^${batch}-out(?:-\\d+)?\\.json$`))
  console.log(`成品 ${rows.length} 位`)
  checkKeys(rows)
  const BANNED = /(傳奇|傑作|必聽|里程碑|獨樹一格|融合多種元素|具有代表性|層次豐富|不可或缺|[你我])/
  const BAD_OPEN = /^(這位|他是|她是|本團|身為)/
  const lens = []
  for (const r of rows) {
    const e = bankByKey.get(r.key) || { name: r.name, poolAlbums: [] }
    const t = String(r.intro || '')
    const n = len(t)
    lens.push(n)
    if (r.name !== e.name) warn(r.key, `名字與名冊不一致：「${r.name}」≠「${e.name}」`)
    const [lo, hi] = r.status === 'thin' ? [100, 160] : [180, 280]
    if (n < lo || n > hi) warn(r.name, `字數 ${n} 不在 ${r.status} 區間 ${lo}–${hi}`)
    if (n > 250 && n <= 280 && r.status !== 'thin') console.log(`ℹ ${r.name} ${n} 字，用到 251–280 的放寬額度，審稿時確認是否真的必要`)
    if (BAD_OPEN.test(t) || t.startsWith(`${e.name} 是`) || t.startsWith(`${e.name}是`)) warn(r.name, '開頭違規：', t.slice(0, 16))
    const stripped = stripLegit(t, e)
    const b = stripped.match(BANNED)
    if (b) warn(r.name, '禁語：', b[0])
    if (/(至今仍|目前仍|現在仍)/.test(t)) warn(r.name, '會過期的現在式')
    // 用語房規（2026-09-29 店主裁定）：「中國」不加「大陸」、不以「大陸」代稱中國；蔣中正寫蔣介石。
    // 用剝除《》〈〉與本卡專名後的文字掃，官方原題裡的字不誤報。
    if (/大陸/.test(stripped)) warn(r.name, '用語：出現「大陸」，稱中國一律寫「中國」')
    if (/蔣中正/.test(stripped)) warn(r.name, '用語：「蔣中正」一律寫「蔣介石」')
    // 反流水帳（2026-09-29 店主改定方向）：四位數年份至多 4 個、不得連兩句以年份開頭
    { const years = t.match(/(?<!\d)(1[89]\d\d|20\d\d)(?!\d)/g) || []
      if (years.length > 4) warn(r.name, `年份 ${years.length} 個，上限 4（流水帳）`)
      const sents = t.split(/[。；]/).map(x => x.trim()).filter(Boolean)
      for (let i = 1; i < sents.length; i++) if (/^(1[89]|20)\d\d\s*年(?!代)/.test(sents[i]) && /^(1[89]|20)\d\d\s*年(?!代)/.test(sents[i - 1])) { warn(r.name, '連續兩句以年份開頭（流水帳）'); break } }
    // 產線備註外洩（字數標註、批次名、輪次、產線用語）——與 scripts/build-artist-intros.mjs 的 META_LEAK 同一條
    { const m = t.match(/\d{2,3}\s*字(?![一-鿿])|第[一二三四五六七八九十\d]+輪|\bar-[a-z0-9-]+|試做|補洞|審稿|寫作層|研究稿|事實庫|\b(?:status|full|thin)\b\s*[:：]/); if (m) warn(r.name, '正文混入產線備註：', m[0]) }
    if (/(AllMusic|Rolling Stone|滾石|DownBeat|Pitchfork|Billboard 雜誌)/.test(t)) warn(r.name, '樂評媒體名進正文')
    const albums = (t.match(/《[^》]+》/g) || [])
    if (new Set(albums).size > 1) warn(r.name, `點了 ${new Set(albums).size} 張專輯名，上限 1`)
    const src = [...new Set(r.src || [])]
    if (src.length < 2) warn(r.name, `來源 ${src.length} 條，至少 2`)
    for (const s of src) { if (!isUrl(s)) warn(r.name, `來源不是完整 https：${s}`); else if (BAD_SRC.test(s)) warn(r.name, `AI 生成站：${s}`) }
    charScan(r.name, t, e)
    console.log(`  ${r.name.padEnd(36)} ${r.status} ${n} 字`)
  }
  if (lens.length) {
    const s = [...lens].sort((a, b) => a - b)
    console.log(`字數 最短 ${s[0]}／中位 ${s[Math.floor(s.length / 2)]}／最長 ${s[s.length - 1]}`)
  }
}

console.log(flags ? `\n共 ${flags} 處待處理` : '\n通過，0 處')
process.exit(flags ? 1 : 0)
