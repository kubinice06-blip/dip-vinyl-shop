#!/usr/bin/env node
// 藝人介紹產線・寫作層輸入摘要（2026-10-03 省額度改版）。cwd 必須是 desc-tools/。
//
//   node artist-digest.mjs <批名> <寫作組 1|2>
//
// 把 research/<批名>-g1+g2（或 g3+g4）壓成一份純文字，寫到 batches/artist/cache/<批名>-digest-<組>.txt。
// 起因：寫作代理每支要開約 25 次 node 去翻補洞稿 JSON，每次一個回合；回合數 × 上下文長度＝額度。
// 摘要不刪任何寫作層會用到的東西：facts 的 f 全收（標單源／缺 src2）、conflicts 與 notes 全文照收、
// 卡池專輯清單（點專輯名的上限要靠它）。只拿掉網址——寫作層不上網、不引網址。
import fs from 'node:fs'

const [batch, nStr] = process.argv.slice(2)
const n = Number(nStr)
if (!batch || ![1, 2].includes(n)) { console.error('用法: node artist-digest.mjs <批名> 1|2'); process.exit(1) }
const groups = n === 1 ? [1, 2] : [3, 4]
const bank = new Map(JSON.parse(fs.readFileSync(`batches/artist/facts/${batch}-facts.json`, 'utf8')).map(x => [x.key, x]))
const SLOT = { origin: '身世與養成', sound: '音樂貢獻', legacy: '影響與地位', era: '年表（輔助）' }
const out = [`# ${batch} 寫作第 ${n} 組輸入摘要（由 research/${batch}-g${groups.join('、g')}.json 產生；只用 ▸ 開頭的事實寫正文）`, '']
let count = 0
for (const g of groups) {
  const f = `batches/artist/research/${batch}-g${g}.json`
  if (!fs.existsSync(f)) continue
  for (const x of JSON.parse(fs.readFileSync(f, 'utf8'))) {
    count++
    const b = bank.get(x.key) || {}
    const tag = t => {
      const m = []
      if (t.single === true) m.push('單源・低風險')
      else if (t.from === 'new' && !t.src2) m.push('缺src2→視同單源')
      return m.length ? `〔${m.join('；')}〕` : ''
    }
    out.push(`## ${x.name}　〔key: ${x.key}｜status: ${x.status}｜${b.tier || ''} 級 ${b.mainGenre || ''}〕`)
    if (b.poolAlbums?.length) out.push(`卡池專輯：${b.poolAlbums.map(a => `《${a.album}》${a.year || ''}`).join('、')}`)
    for (const [k, label] of Object.entries(SLOT)) {
      const s = x.slots?.[k]
      if (!s) continue
      if (!s.facts?.length) { out.push(`【${label}】（${s.status}，無事實）`); continue }
      out.push(`【${label}】`)
      for (const t of s.facts) out.push(`▸ ${t.f}${tag(t)}`)
    }
    if (x.milestones?.length) { out.push('【里程碑】'); for (const t of x.milestones) out.push(`▸ ${t.f}${tag(t)}`) }
    if (x.conflicts?.length) { out.push('【conflicts｜已裁定，照裁定寫】'); for (const c of x.conflicts) out.push(`- ${c}`) }
    if (x.notes) out.push(`【notes｜只用來判斷哪些要保守，不寫進正文】${x.notes}`)
    out.push('')
  }
}
fs.mkdirSync('batches/artist/cache', { recursive: true })
const file = `batches/artist/cache/${batch}-digest-${n}.txt`
fs.writeFileSync(file, out.join('\n'))
console.log(`${file}｜${count} 位｜${out.join('\n').length} 字`)
