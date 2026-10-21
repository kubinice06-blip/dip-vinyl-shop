#!/usr/bin/env node
// 已上線專輯簡介・第二輪修正（2026-10-16 起，雲端可寫 KV 之後）。
//
//   node scripts/pub-fix-round2.mjs prep            依 ROUND2-QUEUE.json 抓 KV 現值、切派工檔到 audits/pub-fix/round2/in/
//   node scripts/pub-fix-round2.mjs prep b          第二波：重掃後的殘留＋B2 出處點名，切成 in/r2b-NNN.json；
//                                                   A 類扣掉已在 applied/ 定案過的卡（keep 或已改寫）
//   node scripts/pub-fix-round2.mjs check <out…>    檢查改寫稿（比對現值、字數、禁語、半形標點），不寫任何東西
//   node scripts/pub-fix-round2.mjs emit <out…>     產出 publish-stage/pub-fix-r2/<批>/kv-puts.json 與變更紀錄
//   node scripts/pub-fix-round2.mjs verify <out…>   逐字回讀 KV（寫入後等半分鐘再跑，KV 有 10–30 秒延遲）
//
// 改寫稿格式（audits/pub-fix/round2/out/<批>.json）：
//   [{ key, action: "edit"|"keep", oldDesc, newDesc, why: [] }]
//   keep 只記理由、不寫 KV。oldDesc 必須逐字等於 KV 現值，不一致就跳過（代表別處改過）。
import fs from 'node:fs';
import path from 'node:path';

const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const AUTH = { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN };
const BASE = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}`;
const DIR = 'audits/pub-fix/round2';
const PER = 30;

async function bulkGet(keys) {
  const out = new Map();
  for (let i = 0; i < keys.length; i += 90) {
    const batch = keys.slice(i, i + 90); let j = null;
    for (let a = 0; a < 5 && !j; a++) {
      try {
        const t = await (await fetch(`${BASE}/bulk/get`, { method: 'POST', headers: { ...AUTH, 'Content-Type': 'application/json' }, body: JSON.stringify({ keys: batch }) })).json();
        if (t.success) j = t; else await new Promise(s => setTimeout(s, 1000 * (a + 1)));
      } catch { await new Promise(s => setTimeout(s, 1000 * (a + 1))); }
    }
    if (!j) throw new Error('bulk get 失敗於第 ' + i + ' 筆');
    for (const k of batch) {
      const v = j.result.values[k];
      if (v != null) { try { out.set(k, JSON.parse(typeof v === 'string' ? v : JSON.stringify(v)).desc ?? null); } catch { out.set(k, null); } }
    }
  }
  return out;
}

const CJK = '\\p{Script=Han}\\p{Script=Hiragana}\\p{Script=Katakana}\\p{Script=Hangul}';
const HALF = new RegExp(`[${CJK}][,;:!?]|[,;:!?][${CJK}]`, 'u');
const stripTitles = t => t.replace(/《[^》]*》|〈[^〉]*〉/g, '');
const BANNED = [/維基|wikipedia/i, /musicbrainz/i, /discogs/i, /allmusic/i, /資料庫/, /建檔/, /本卡/, /本筆/, /條目/];
const HANGUL = /\p{Script=Hangul}/u;
// 與 build-pub-fix-queue.mjs 的 SOURCE 同步，另加常見樂評媒體與評分寫法
const SOURCE = /維基|Wikipedia|MusicBrainz|\bMB\b|Discogs|AllMusic|RateYourMusic|\bRYM\b|release[- ]group|Pitchfork|Rolling Stone|《Mojo》|《Uncut》|Apple Music|Spotify|[四五三]星半?|滿分/iu;

function lint(r) {
  const w = [];
  if (r.action !== 'edit') return w;
  const n = [...r.newDesc].length;
  if (n < 120 || n > 280) w.push(`字數 ${n}`);
  if (HALF.test(stripTitles(r.newDesc))) w.push('半形標點貼中文');
  for (const re of BANNED) if (re.test(stripTitles(r.newDesc)) && !re.test(stripTitles(r.oldDesc))) w.push('新增禁語 ' + re);
  for (const re of BANNED) if (re.test(stripTitles(r.newDesc)) && re.test(stripTitles(r.oldDesc))) w.push('殘留 ' + re);
  if (HANGUL.test(stripTitles(r.newDesc))) w.push('正文夾諺文');
  const src = stripTitles(r.newDesc).match(SOURCE);
  if (src) w.push('殘留出處／評分「' + src[0] + '」');
  if (r.newDesc === r.oldDesc) w.push('edit 但沒改');
  return w;
}

const readOuts = files => files.flatMap(f => JSON.parse(fs.readFileSync(f, 'utf8')).map(r => ({ ...r, file: path.basename(f) })));
const cmd = process.argv[2], files = process.argv.slice(3);

if (cmd === 'prep') {
  const wave = files[0] === 'b' ? 'r2b-' : 'r2-';
  const q = JSON.parse(fs.readFileSync('audits/pub-fix/ROUND2-QUEUE.json', 'utf8'));
  const done = new Set();
  if (wave === 'r2b-') for (const f of fs.readdirSync(DIR + '/applied')) for (const r of JSON.parse(fs.readFileSync(`${DIR}/applied/${f}`, 'utf8'))) done.add(r.key);
  const by = new Map();
  const add = (key, sec, item) => { if (!key) return; if (!by.has(key)) by.set(key, { key, issues: [] }); by.get(key).issues.push({ sec, ...item }); };
  for (const r of q.A) if (r.claimFound && !done.has(r.key)) add(r.key, 'A', { claim: r.claim, problem: r.problem, src: r.src });
  for (const r of q.B1) add(r.key, 'B1', { hits: r.hits });
  for (const r of q.B1b) add(r.key, 'B1b', { context: r.context });
  for (const r of q.B3) add(r.key, 'B3', { context: r.context });
  for (const r of q.B4) add(r.key, 'B4', { context: r.context });
  if (wave === 'r2b-') for (const r of q.B2) add(r.key, 'B2', { hits: r.hits });
  for (const r of q.C) if (!done.has(r.key)) add(r.key, 'C', { note: r.note });
  const live = await bulkGet([...by.keys()]);
  const items = [...by.values()].filter(x => live.get(x.key)).map(x => ({ ...x, desc: live.get(x.key) }));
  // 優先序：C／B1／B1b 先，再 A，再 B3／B4
  const rank = x => Math.min(...x.issues.map(i => ({ C: 0, B1: 0, B1b: 0, A: 1, B3: 2, B4: 2, B2: 3 }[i.sec])));
  items.sort((a, b) => rank(a) - rank(b) || a.key.localeCompare(b.key));
  fs.mkdirSync(DIR + '/in', { recursive: true });
  let n = 0;
  for (let i = 0; i < items.length; i += PER) {
    const name = wave + String(++n).padStart(3, '0');
    fs.writeFileSync(`${DIR}/in/${name}.json`, JSON.stringify(items.slice(i, i + PER), null, 1));
  }
  const sec = {}; items.forEach(x => x.issues.forEach(i => { sec[i.sec] = (sec[i.sec] || 0) + 1; }));
  console.log(`卡 ${items.length}（KV 無值略過 ${by.size - items.length}）→ ${n} 批（每批 ${PER}）｜問題`, JSON.stringify(sec));
} else if (cmd === 'check' || cmd === 'emit') {
  const rows = readOuts(files);
  const live = await bulkGet(rows.map(r => r.key));
  const puts = [], log = [], bad = [];
  for (const r of rows) {
    const cur = live.get(r.key);
    if (r.action === 'keep') { log.push({ key: r.key, action: 'keep', why: r.why }); continue; }
    if (cur !== r.oldDesc) { bad.push(`${r.key}：oldDesc 與現值不符，跳過`); continue; }
    const w = lint(r);
    if (w.length) bad.push(`${r.key}：${w.join('；')}`);
    puts.push({ key: r.key, value: JSON.stringify({ desc: r.newDesc }) });
    log.push({ key: r.key, action: 'edit', oldDesc: r.oldDesc, newDesc: r.newDesc, why: r.why });
  }
  console.log(`稿 ${rows.length}｜edit ${puts.length}｜keep ${log.filter(l => l.action === 'keep').length}｜警示 ${bad.length}`);
  bad.forEach(b => console.log('  ⚠ ' + b));
  if (cmd === 'emit') {
    const tag = files.map(f => path.basename(f, '.json')).join('+');
    const out = `publish-stage/pub-fix-r2/${tag}`;
    fs.mkdirSync(out, { recursive: true });
    fs.writeFileSync(`${out}/kv-puts.json`, JSON.stringify(puts));
    fs.mkdirSync(`${DIR}/applied`, { recursive: true });
    fs.writeFileSync(`${DIR}/applied/${tag}.json`, JSON.stringify(log, null, 1));
    console.log(`寫出 ${out}/kv-puts.json（${puts.length} 鍵）與 ${DIR}/applied/${tag}.json`);
  }
} else if (cmd === 'verify') {
  const rows = readOuts(files).filter(r => r.action === 'edit');
  const live = await bulkGet(rows.map(r => r.key));
  const miss = rows.filter(r => live.get(r.key) !== r.newDesc);
  console.log(`回讀 ${rows.length}｜一致 ${rows.length - miss.length}｜不符 ${miss.length}`);
  miss.forEach(r => console.log('  ✗ ' + r.key));
} else {
  console.log('用法見檔頭');
}
