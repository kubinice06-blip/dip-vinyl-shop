// 第十二輪：thin → full 升級批（店主 2026-10-16 選「thin 升級成 full」）。
// 取每個鍵「最新一版」上線成品（量產批 out 檔依檔名排序、後蓋前；不含別名檔），status 為 thin 者，
// 依名冊卡數多→少、分級 A→D、鍵排序，切成 ar-u-001 起的 40 人批。
// 另為每批寫 cache/<批>-prior.json：原 thin 正文、原批名、原補洞稿條目，供補洞層從原有事實出發。
//   node upgrade-thin-20261016.mjs --dry        只印統計
//   node upgrade-thin-20261016.mjs <批數>        切批（寫 progress、cut、prior）
import fs from 'node:fs'
import path from 'node:path'
const ROOT = '/home/user/dip-vinyl-shop'
const D = ROOT + '/desc-tools/batches/artist'
const roster = new Map(JSON.parse(fs.readFileSync(ROOT + '/batch-progress/artist-intro/roster-20260929.json', 'utf8')).entries.map(e => [e.key, e]))
const P = D + '/progress.json'
const prog = JSON.parse(fs.readFileSync(P, 'utf8'))
const published = new Set(prog.batches.filter(b => b.state === 'published').map(b => b.batch))
const latest = new Map()
for (const f of fs.readdirSync(D + '/output').filter(f => /-out(?:-\d+)?\.json$/.test(f) && f !== 'zz-alias-out.json').sort()) {
  const m = f.match(/^(ar-[a-z]-\d{3})-out/)
  if (m && !published.has(m[1])) continue
  const batch = m ? m[1] : f.replace(/-out.*$/, '')
  for (const r of JSON.parse(fs.readFileSync(path.join(D, 'output', f), 'utf8'))) latest.set(r.key, { ...r, batch })
}
const inFlight = new Set(prog.batches.filter(b => b.state !== 'published' && b.state !== 'merged').flatMap(b => b.keys))
const tierRank = { A: 0, B: 1, C: 2, D: 3, VA: 9 }
const thin = [...latest.values()].filter(r => r.status === 'thin' && roster.has(r.key) && r.key !== 'various artists' && !inFlight.has(r.key))
thin.sort((a, b) => roster.get(b.key).cards - roster.get(a.key).cards || tierRank[roster.get(a.key).tier] - tierRank[roster.get(b.key).tier] || a.key.localeCompare(b.key))
console.log('thin（最新版）', thin.length)
if (process.argv.includes('--dry')) process.exit(0)
const N = Number(process.argv[2])
const research = new Map()
const findResearch = (batch, key) => {
  for (const g of [1, 2, 3, 4]) {
    const p = `${D}/research/${batch}-g${g}.json`
    if (!fs.existsSync(p)) continue
    if (!research.has(p)) research.set(p, JSON.parse(fs.readFileSync(p, 'utf8')))
    const e = research.get(p).find(x => x.key === key)
    if (e) return { file: `batches/artist/research/${batch}-g${g}.json`, entry: e }
  }
  return null
}
const last = prog.batches.filter(b => /^ar-u-\d{3}$/.test(b.batch)).map(b => Number(b.batch.slice(5))).reduce((a, b) => Math.max(a, b), 0)
const now = new Date().toISOString()
for (let i = 0; i < N; i++) {
  const part = thin.slice(i * 40, i * 40 + 40)
  if (!part.length) break
  const b = 'ar-u-' + String(last + 1 + i).padStart(3, '0')
  const keys = part.map(r => r.key)
  prog.batches.push({ batch: b, tier: 'U', genres: [...new Set(part.map(r => roster.get(r.key).mainGenre))], keys, state: 'cut', addedBy: 'upgrade-thin-20261016', updatedAt: now })
  fs.writeFileSync(`${D}/cut/${b}.txt`, keys.join('\n') + '\n')
  const prior = part.map(r => { const x = findResearch(r.batch, r.key); return { key: r.key, name: r.name, thinIntro: r.intro, thinSrc: r.src || [], priorBatch: r.batch, priorResearchFile: x?.file || null, priorResearch: x?.entry || null } })
  fs.writeFileSync(`${D}/cache/${b}-prior.json`, JSON.stringify(prior, null, 1) + '\n')
  console.log(b, keys.length, part[0].name, '…', part.at(-1).name, '｜無原補洞稿', prior.filter(p => !p.priorResearch).length)
}
fs.writeFileSync(P, JSON.stringify(prog, null, 1) + '\n')
