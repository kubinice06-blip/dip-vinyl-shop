#!/usr/bin/env node
// rewrite 級重新判定工具（四級：severe／rewrite／polish／keep）（repo 根執行）
//   node tri.mjs split <descs.json>        一般卡切成 triage/in/in-NNN.json（每份 300）
//   node tri.mjs show NNN [n=50]           印出這份還沒判的前 n 張（i｜藝人｜盤名｜年｜簡介）
//   node tri.mjs add NNN < verdicts.json   併入 [{i,g,c,w}]（g=severe|rewrite|polish|keep，c=codes，w=理由）→ triage/triage-NNN.json
//   node tri.mjs status                    各份進度
//   node tri.mjs merge                     合併成 triage.json
import fs from 'node:fs';
const D = 'batch-progress/desc-retriage-20261118', T = D + '/triage';
const [cmd, a1, a2] = process.argv.slice(2);
const inF = n => `${T}/in/in-${n}.json`, outF = n => `${T}/triage-${n}.json`;
const load = (f, d) => fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : d;
if (cmd === 'split') {
  const d = JSON.parse(fs.readFileSync(a1, 'utf8'));
  const rw = new Set(JSON.parse(fs.readFileSync('batch-progress/desc-severe-20261117/triage.json', 'utf8')).filter(x => x.grade === 'rewrite').map(x => x.k));
  const g = Object.values(d).filter(c => !c.tier && rw.has(c.k)).sort((x, y) => x.k < y.k ? -1 : 1);
  const miss = [...rw].filter(k => !d[k]); if (miss.length) console.log('⚠ triage rewrite 但 descs 沒有：', miss.length, miss.slice(0, 5));
  let n = 0;
  for (let i = 0; i < g.length; i += 300, n++) {
    const part = g.slice(i, i + 300).map((c, j) => ({ i: j, k: c.k, artist: c.a, album: c.b, year: c.y, classic: c.c, src: c.src, desc: c.desc }));
    fs.writeFileSync(inF(String(n + 1).padStart(3, '0')), JSON.stringify(part));
  }
  console.log(g.length, '張 →', n, '份');
}
if (cmd === 'show') {
  const inp = load(inF(a1)); const done = new Set(load(outF(a1), []).map(x => x.k));
  const todo = inp.filter(c => !done.has(c.k)).slice(0, +(a2 || 50));
  console.log(`# ${a1}：已判 ${done.size}/${inp.length}，以下 ${todo.length} 張`);
  for (const c of todo) console.log(`[${c.i}] ${c.artist}《${c.album}》${c.year || ''}（${c.desc ? Array.from(c.desc).length : 0} 字）\n${c.desc ?? '（無簡介）'}\n`);
}
if (cmd === 'add') {
  const inp = load(inF(a1)); const out = load(outF(a1), []); const have = new Map(out.map(x => [x.k, x]));
  const v = JSON.parse(fs.readFileSync(0, 'utf8')); let n = 0, bad = 0;
  const over = v.filter(x => inp[x.i] && have.has(inp[x.i].k)).length;
  if (over) console.log(`⚠ 其中 ${over} 張原本已判、這次會覆蓋——若不是刻意重判，代表 i 編號錯了：i 要用 show 印出的方括號編號`);
  for (const x of v) {
    const c = inp[x.i]; if (!c || !['severe', 'rewrite', 'polish', 'keep'].includes(x.g)) { bad++; continue; }
    have.set(c.k, { k: c.k, artist: c.artist, album: c.album, year: c.year, classic: c.classic, grade: x.g, codes: x.c || [], why: x.w || '' }); n++;
  }
  const arr = inp.filter(c => have.has(c.k)).map(c => have.get(c.k));
  fs.writeFileSync(outF(a1), JSON.stringify(arr, null, 0).replace(/\},\{/g, '},\n{'));
  console.log(`併入 ${n}（無效 ${bad}）；${a1} 進度 ${arr.length}/${inp.length}`);
}
if (cmd === 'status') {
  const fs_ = fs.readdirSync(T + '/in').filter(f => /^in-\d+\.json$/.test(f)).sort();
  let tot = 0, dn = 0; const g = {};
  for (const f of fs_) { const n = f.slice(3, 6); const i = load(inF(n)).length, o = load(outF(n), []); tot += i; dn += o.length; for (const x of o) g[x.grade] = (g[x.grade] || 0) + 1;
    if (a1 !== 'brief') console.log(n, o.length + '/' + i); }
  console.log('總計', dn + '/' + tot, JSON.stringify(g));
}
if (cmd === 'merge') {
  const all = fs.readdirSync(T).filter(f => /^triage-\d+\.json$/.test(f)).sort().flatMap(f => load(T + '/' + f));
  fs.writeFileSync(D + '/retriage.json', JSON.stringify(all).replace(/\},\{/g, '},\n{'));
  const g = {}; for (const x of all) g[x.grade] = (g[x.grade] || 0) + 1; console.log(all.length, JSON.stringify(g));
}
