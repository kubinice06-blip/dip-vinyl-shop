#!/usr/bin/env node
// 一般卡嚴重簡介重寫的每批工具（repo 根執行；改自 apex-desc-20261104/tools/ad.mjs）。
//   node …/sd.mjs cards  sd-001          產卡單（含現行簡介與判定理由）→ desc-tools/batches/cards/sd-001-cards.json
//   node …/sd.mjs before sd-001          讀 KV 現值存 kv-before-sd-001.json（desc2＋desc4）
//   node …/sd.mjs qa     sd-001          機器 QA：字數 180–240（薄寫下限 150）、簡體、半形標點、軌序／曲長／盤號、fix-spacing
//   node …/sd.mjs bulk   sd-001          產 publish-stage/kv-sd-001-<stamp>.json（desc2 一律；原有 desc4 或 CJK 卡也寫 desc4）
//   node …/sd.mjs verify sd-001          bulk get 逐字回讀
//   node …/sd.mjs manifest sd-001 [--write]  同步 onboarding manifest 的 description.text
import fs from 'node:fs';
const [cmd, batch, ...rest] = process.argv.slice(2);
const DIR = 'batch-progress/desc-severe-20261117';
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const STAMP = '20261117';
const cjk = v => /[぀-ヿ㐀-鿿豈-﫿가-힯]/.test(String(v || ''));
const plan = JSON.parse(fs.readFileSync(`${DIR}/batches.json`, 'utf8'));
const keys = plan[batch]; if (!keys) throw new Error('沒有這一批：' + batch);
// severe-descs.json：全部 severe 卡的現行簡介（第 0 步當下 KV 值；triage/in/ 不進 git）
const inRows = new Map(JSON.parse(fs.readFileSync(`${DIR}/severe-descs.json`, 'utf8')).map(c => [c.k, c]));
const tri = new Map(JSON.parse(fs.readFileSync(`${DIR}/triage.json`, 'utf8')).map(c => [c.k, c]));
const seed = new Map(JSON.parse(fs.readFileSync('seed_cards.json', 'utf8')).map(r => [`${r[0].toLowerCase()}|${r[1].toLowerCase()}`, r]));
async function bulkGet(ks) {
  const vals = {};
  for (let i = 0; i < ks.length; i += 90) {
    const j = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}/bulk/get`, {
      method: 'POST', headers: { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ keys: ks.slice(i, i + 90) }) })).json();
    if (!j.success) throw new Error(JSON.stringify(j.errors));
    Object.assign(vals, j.result.values);
  }
  return vals;
}
const outRows = () => fs.readdirSync('desc-tools/batches/output').filter(f => new RegExp('^' + batch + '-out-\\d+\\.json$').test(f))
  .flatMap(f => JSON.parse(fs.readFileSync('desc-tools/batches/output/' + f, 'utf8')))
  .filter(r => !r.hold && r.desc); // 寫作層回報的留置列（hold:true、desc 空）不進 QA／KV／manifest
const parse = v => { if (v == null) return null; try { return JSON.parse(v).desc ?? null } catch { return v } };

if (cmd === 'cards') {
  const cards = keys.map(k => { const c = inRows.get(k), t = tri.get(k) || {}, s = seed.get(k) || [];
    return { key: k, artist: c.artist, album: c.album, year: c.year, classic: c.classic, genres: s[5] || [], currentDesc: c.desc, triageReason: `${t.grade} ${JSON.stringify(t.codes || [])} ${t.why || ''}` }; });
  fs.writeFileSync(`desc-tools/batches/cards/${batch}-cards.json`, JSON.stringify(cards, null, 1));
  console.log(`卡單 ${cards.length} 張 → desc-tools/batches/cards/${batch}-cards.json`);
}
if (cmd === 'before') {
  const ks = keys.flatMap(k => ['desc2:' + k, 'desc4:' + k]);
  const v = await bulkGet(ks); const out = ks.map(k => ({ key: k, value: v[k] ?? null }));
  fs.writeFileSync(`${DIR}/kv-before-${batch}.json`, JSON.stringify(out, null, 1));
  console.log(`舊值 ${out.length} 鍵（非 null ${out.filter(x => x.value != null).length}）→ ${DIR}/kv-before-${batch}.json`);
}
if (cmd === 'qa') {
  const { execFileSync } = await import('node:child_process');
  const rows = outRows(); const have = new Set(rows.map(r => r.key)); let bad = 0;
  for (const k of keys) if (!have.has(k)) { console.log('缺稿', k); bad++; }
  const simp = /[们这来说过时国际开关见证华语电视习动员双专辑签约终选价观论坛对从会众组织实现发达经济应该请问题让边书买卖东车马鸟鱼龙凤丰艺术录历纪乐为无与软权变现类点热战强气长闻队]/; // 取自 desc-tools/qa-batch.mjs SIMP
  for (const r of rows) {
    const d = r.desc, n = [...d].length, p = [];
    if (n < 150 || n > 240) p.push('字數 ' + n); else if (n < 180) p.push('薄寫 ' + n);
    if (simp.test(d)) p.push('簡體? ' + d.match(simp)[0]);
    if (/[一-鿿][,;:?!]|[,;:?!][一-鿿]|\([一-鿿]|[一-鿿]\)/.test(d)) p.push('半形標點');
    if (/\b\d{1,2}:\d\d\b/.test(d)) p.push('曲長');
    if (/第\s?[一二三四五六七八九十\d]+\s?軌|[A-D]\s?面|Side\s?[A-D12]|軌數|\d+\s?軌/.test(d)) p.push('軌序／軌數');
    if (/盤號|目錄號|編號|款號|catalog/i.test(d)) p.push('盤號');
    if (!/^[^。]*《/.test(d) && !d.includes('《')) p.push('無《》');
    if (p.length) { console.log(r.key, '｜', p.join('、')); if (p.some(x => !x.startsWith('薄寫'))) bad++; }
  }
  console.log(`QA ${rows.length} 張，有問題 ${bad}`);
  for (const f of fs.readdirSync('desc-tools/batches/output').filter(f => new RegExp('^' + batch + '-out-\\d+\\.json$').test(f)))
    console.log('fix-spacing', f, execFileSync('node', ['desc-tools/fix-spacing.mjs', 'desc-tools/batches/output/' + f]).toString().trim().split('\n').slice(-3).join(' / '));
}
if (cmd === 'bulk') {
  const before = new Map(JSON.parse(fs.readFileSync(`${DIR}/kv-before-${batch}.json`, 'utf8')).map(x => [x.key, x.value]));
  const rows = new Map(outRows().map(r => [r.key, r]));
  const puts = [];
  for (const k of keys) {
    const r = rows.get(k); if (!r) { console.log('缺稿', k); continue; }
    const c = inRows.get(k); const value = JSON.stringify({ desc: r.desc });
    puts.push({ key: 'desc2:' + k, value });
    if (before.get('desc4:' + k) != null || cjk(c.artist) || cjk(c.album)) puts.push({ key: 'desc4:' + k, value });
  }
  const f = `publish-stage/kv-${batch}-${STAMP}.json`; fs.mkdirSync('publish-stage', { recursive: true });
  fs.writeFileSync(f, JSON.stringify(puts)); console.log(`${puts.length} 鍵（${rows.size} 張）→ ${f}`);
}
if (cmd === 'verify') {
  const puts = JSON.parse(fs.readFileSync(`publish-stage/kv-${batch}-${STAMP}.json`, 'utf8'));
  const v = await bulkGet(puts.map(p => p.key)); let ok = 0;
  for (const p of puts) { if (parse(v[p.key]) === JSON.parse(p.value).desc) ok++; else console.log('不符', p.key); }
  console.log(`回讀 ${ok}/${puts.length} 一致`);
}
if (cmd === 'manifest') {
  const write = rest.includes('--write');
  const rows = new Map(outRows().map(r => [r.key, r]));
  const files = fs.readdirSync('.').filter(f => /^onboarding-manifest-.*\.json$/.test(f));
  let hits = 0;
  for (const f of files) {
    const raw = fs.readFileSync(f, 'utf8'); const m = JSON.parse(raw); let ch = 0;
    for (const a of m.albums || []) {
      const k = `${String(a.artist || '').trim().toLowerCase()}|${String(a.album || '').trim().toLowerCase()}`;
      const r = rows.get(k);
      if (r && a.description && typeof a.description === 'object' && a.description.text !== r.desc) { a.description.text = r.desc; ch++; }
    }
    if (ch) { hits += ch; console.log(f, ch); if (write) fs.writeFileSync(f, JSON.stringify(m, null, raw.includes('\n  "') ? 2 : raw.includes('\n "') ? 1 : 0) + (raw.endsWith('\n') ? '\n' : '')); }
  }
  console.log(`manifest 需同步 ${hits} 處${write ? '（已寫）' : '（乾跑）'}`);
}
