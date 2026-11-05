#!/usr/bin/env node
// 硬蕊度音量下限重評「套用」（2026-11-04）：
//   (A) verdicts 合併 → 防呆（新值 ≥ 舊值、只動硬蕊度）→ applied.json
//   (B) --write：seed_cards.json 第 5 欄（index 4）字串替換＋三道防呆；manifest（根目錄＋batch-progress/*/）ratings.accessibility／rarity 同步（gate 比對 seed 與 manifest）
//   (C) --catalog：card_catalog 兩欄 patch（accessibility／rarity）→ publish-stage/rerate-20261104-loud/card-catalog-patches.json
// 頂點 tier 不動。冪等：old 以既有 applied.json 為準。
// 用法：node batch-progress/rerate-20261104-loud/apply.mjs [--write] [--catalog]
import fs from 'node:fs';
const D = 'batch-progress/rerate-20261104-loud/';
const SRC_NOTE = '硬蕊度音量下限（2026-11-04 店主定案）';
const rarityOf = (c, o, a) => { const s = c + a + (o >= 5 ? 1 : 0); return s >= 9 ? 'legendary' : s >= 8 ? 'epic' : s >= 7 ? 'uncommon' : s >= 6 ? 'rare' : 'common'; };
const J = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const shard = {}; for (const f of fs.readdirSync(D + 'shards').filter(f => /^s\d\d\.json$/.test(f)).sort()) for (const x of J(D + 'shards/' + f)) shard[x.key] = x;
const verdict = {}; for (const f of fs.readdirSync(D + 'verdicts').filter(f => /^s\d\d\.json$/.test(f)).sort())
  for (const v of J(D + 'verdicts/' + f)) { if (verdict[v.key]) throw new Error('重複 ' + v.key); verdict[v.key] = { ...v, file: f }; }
// 主線審稿覆寫：overrides.json [{key, accessibility, why}]
const ovr = fs.existsSync(D + 'overrides.json') ? Object.fromEntries(J(D + 'overrides.json').map(x => [x.key, x])) : {};
for (const k in shard) if (!verdict[k]) throw new Error('缺 verdict ' + k);
for (const k in verdict) if (!shard[k]) throw new Error('verdict 多出 ' + k);
const prevA = fs.existsSync(D + 'applied.json') ? Object.fromEntries(J(D + 'applied.json').map(x => [x.key, x])) : {};
const applied = Object.keys(shard).map(k => {
  const s = shard[k]; let v = verdict[k]; if (ovr[k]) v = { ...v, accessibility: ovr[k].accessibility, keep: ovr[k].accessibility === s.cur.accessibility, why: '主線覆核：' + ovr[k].why, override: true };
  const old = prevA[k]?.old || { ...s.cur };
  const na = v.keep ? old.accessibility : v.accessibility;
  if (!Number.isInteger(na) || na < 1 || na > 5) throw new Error('值錯 ' + k);
  if (na < old.accessibility) throw new Error('不准往下調 ' + k);
  const nw = { ...old, accessibility: na };
  return { key: k, artist: s.artist, album: s.album, class: s.class, tagFloor: s.tagFloor, tags: s.tags, tier: s.tier, old, new: nw,
    oldRarity: rarityOf(old.classic, old.obscurity, old.accessibility), newRarity: rarityOf(nw.classic, nw.obscurity, nw.accessibility),
    changed: na !== old.accessibility, why: v.why, override: !!v.override, file: v.file };
});
fs.writeFileSync(D + 'applied.json', JSON.stringify(applied, null, 1));
const todo = applied.filter(x => x.changed); const map = Object.fromEntries(todo.map(x => [x.key, x]));
console.log(`判定 ${applied.length}｜改 ${todo.length}（到3 ${todo.filter(x => x.new.accessibility === 3).length}／到4 ${todo.filter(x => x.new.accessibility === 4).length}／到5 ${todo.filter(x => x.new.accessibility === 5).length}）｜稀有度有變 ${todo.filter(x => x.oldRarity !== x.newRarity).length}`);

if (process.argv.includes('--write')) {
  const seedRaw = fs.readFileSync('seed_cards.json', 'utf8'); const before = JSON.parse(seedRaw);
  const lines = seedRaw.split('\n'); let hits = 0, already = 0;
  const out = lines.map(line => {
    const m = line.match(/^(\[)(.*)(\],?)$/); if (!m) return line;
    let row; try { row = JSON.parse('[' + m[2] + ']'); } catch { return line; }
    const x = map[row[0] + '|' + row[1]]; if (!x) return line;
    if (row[4] === x.new.accessibility) { already++; return line; }
    if (row[2] !== x.old.classic || row[3] !== x.old.obscurity || row[4] !== x.old.accessibility) throw new Error('seed 舊值不符 ' + x.key);
    row[4] = x.new.accessibility; hits++;
    return m[1] + JSON.stringify(row).slice(1, -1) + m[3];
  }).join('\n');
  const after = JSON.parse(out);
  if (after.length !== before.length) throw new Error('筆數變了');
  if (hits + already !== todo.length) throw new Error(`命中 ${hits}+${already} ≠ ${todo.length}`);
  for (let i = 0; i < before.length; i++) {
    const a = after[i], b = before[i], x = map[b[0] + '|' + b[1]];
    if (!x) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error('範圍外變動 ' + b[0]); continue; }
    const bb = [...b]; bb[4] = x.new.accessibility; if (JSON.stringify(a) !== JSON.stringify(bb)) throw new Error('非第 5 欄變動 ' + x.key);
  }
  fs.writeFileSync('seed_cards.json', out);
  console.log(`seed：替換 ${hits}（已是新值 ${already}）｜總筆數 ${after.length} 不變`);
  // manifests
  const files = fs.readdirSync('.').filter(f => /^onboarding-manifest-.*\.json$/.test(f));
  for (const d of fs.readdirSync('batch-progress')) { const p = `batch-progress/${d}/onboarding-manifest.json`; if (fs.existsSync(p)) files.push(p); }
  let mf = 0, mc = 0; const seen = new Set(), unfmt = [];
  for (const p of files) {
    const raw = fs.readFileSync(p, 'utf8'); let m; try { m = JSON.parse(raw); } catch { continue; }
    // 保留原排版：找能逐字還原的縮排／結尾換行，找不到就略過並列出
    const fmt = [[1, ''], [1, '\n'], [2, ''], [2, '\n'], [0, ''], [0, '\n'], ['\t', ''], ['\t', '\n']].find(([n, e]) => (n ? JSON.stringify(m, null, n) : JSON.stringify(m)) + e === raw);
    const arr = m.albums || m.cards; if (!Array.isArray(arr)) continue; let n = 0;
    for (const a of arr) {
      const x = map[(a.artist || '') + '|' + (a.album || '')]; const r = a.ratings; if (!x || !r) continue;
      seen.add(x.key);
      if (r.accessibility === x.new.accessibility && a.rarity === x.newRarity) continue;
      if (r.accessibility !== x.old.accessibility) { console.log('  manifest 舊值不同、略過', p, x.key, r.accessibility); continue; }
      r.previousAccessibility = { accessibility: r.accessibility, rarity: a.rarity, at: '2026-11-04' };
      r.accessibility = x.new.accessibility; r.loudFloorNote = SRC_NOTE + '：' + x.why;
      if ('rarity' in a) a.rarity = x.newRarity; n++;
    }
    if (n && !fmt) { console.log('  排版無法還原、略過', p); unfmt.push(p); continue; }
    if (n) { fs.writeFileSync(p, (fmt[0] ? JSON.stringify(m, null, fmt[0]) : JSON.stringify(m)) + fmt[1]); mf++; mc += n; }
  }
  console.log(`manifest：改 ${mf} 檔、${mc} 筆；涵蓋卡 ${seen.size}／${todo.length}`);
}
if (process.argv.includes('--catalog')) {
  const cardIdOf = (artist, album) => `${artist}|${album}`.toLowerCase().replace(/\//g, '-').trim();
  const patches = todo.map(x => ({ key: x.key, docId: cardIdOf(x.artist, x.album), updateMask: ['accessibility', 'rarity'],
    body: { fields: { accessibility: { integerValue: String(x.new.accessibility) }, rarity: { stringValue: x.newRarity } } } }));
  fs.mkdirSync('publish-stage/rerate-20261104-loud', { recursive: true });
  fs.writeFileSync('publish-stage/rerate-20261104-loud/card-catalog-patches.json', JSON.stringify(patches));
  console.log(`card_catalog payload ${patches.length} 筆`);
}
