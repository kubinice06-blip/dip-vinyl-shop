#!/usr/bin/env node
// 檢查 art/pixel/ 裡所有 JSON 的形狀，並重建 art/pixel/index.json。
// Claude 直接改過 JSON、或店主從編輯器逐檔匯出後丟進 repo，都跑一次：
//   node scripts/pixel-index.mjs          # 驗證＋重建 index.json
//   node scripts/pixel-index.mjs --check  # 只驗證、不寫檔（CI 或提交前用）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'art', 'pixel');
const checkOnly = process.argv.includes('--check');
const errors = [];
const err = (f, m) => errors.push(`${f}: ${m}`);

function readDir(kind){
  const d = path.join(DIR, kind); if(!fs.existsSync(d)) return [];
  return fs.readdirSync(d).filter(f => f.endsWith('.json')).sort().map(f => {
    const rel = `art/pixel/${kind}/${f}`;
    try{ const o = JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')); if(o.id !== f.replace(/\.json$/, '')) err(rel, `id「${o.id}」跟檔名不一致`); return { rel, o }; }
    catch(e){ err(rel, 'JSON 解析失敗：' + e.message); return null; }
  }).filter(Boolean);
}
const objects = readDir('objects'), scenes = readDir('scenes'), stories = readDir('stories');
const objIds = new Set(objects.map(x => x.o.id)), sceneIds = new Set(scenes.map(x => x.o.id));

for(const { rel, o } of objects){
  if(!o.name) err(rel, '缺 name');
  if(o.kind === 'pixel'){
    if(!o.palette || typeof o.palette !== 'object') err(rel, '像素物件缺 palette');
    if(!Array.isArray(o.frames) || !o.frames.length) { err(rel, '缺 frames'); continue; }
    o.frames.forEach((rows, fi) => {
      if(!Array.isArray(rows) || rows.length !== o.h) err(rel, `frame ${fi} 列數 ${rows && rows.length} ≠ h ${o.h}`);
      (rows || []).forEach((r, y) => {
        if(typeof r !== 'string' || r.length !== o.w) err(rel, `frame ${fi} 第 ${y} 列長度 ${r && r.length} ≠ w ${o.w}`);
        for(const ch of String(r)) if(ch !== '.' && ch !== ' ' && !(o.palette && o.palette[ch])) { err(rel, `frame ${fi} 第 ${y} 列用了色盤沒有的字元「${ch}」`); break; }
      });
    });
    for(const [k, v] of Object.entries(o.palette || {})) if(k.length !== 1 || k === '.' || k === ' ') err(rel, `色盤鍵「${k}」必須是單一字元且不是 . 或空白`); else if(!/^#[0-9a-f]{3,8}$/i.test(v)) err(rel, `色盤 ${k} 的顏色「${v}」不是 #hex`);
  } else if(o.kind === 'image'){
    if(!Array.isArray(o.frames) || !o.frames.length) err(rel, '圖檔物件缺 frames');
    for(const src of o.frames || []) if(typeof src === 'string' && !/^(https?:|data:)/.test(src) && !fs.existsSync(path.join(ROOT, src))) err(rel, `找不到圖檔 ${src}`);
    if(!(o.w > 0 && o.h > 0)) err(rel, '圖檔物件要有 w、h');
  } else err(rel, `kind「${o.kind}」不是 pixel 或 image`);
  if(o.anchor && !(isFinite(o.anchor.x) && isFinite(o.anchor.y))) err(rel, 'anchor 要有數字 x、y');
}
for(const { rel, o } of scenes){
  if(!(o.w > 0 && o.h > 0)) err(rel, '場景要有 w、h');
  if(o.bg && o.bg.src && !/^(https?:|data:)/.test(o.bg.src) && !fs.existsSync(path.join(ROOT, o.bg.src))) err(rel, `背景圖找不到：${o.bg.src}`);
  const iids = new Set();
  for(const it of o.items || []){
    if(!it.iid) err(rel, '有 item 缺 iid'); else if(iids.has(it.iid)) err(rel, `iid 重複：${it.iid}`); else iids.add(it.iid);
    if(!objIds.has(it.obj)) err(rel, `item「${it.name || it.iid}」指到不存在的物件 ${it.obj}`);
    if(!(isFinite(it.x) && isFinite(it.y))) err(rel, `item「${it.name || it.iid}」的 x、y 不是數字`);
    if(it.layer && !['auto', 'back', 'front'].includes(it.layer)) err(rel, `item「${it.name || it.iid}」layer 只能是 auto／back／front`);
  }
  const names = new Set();
  for(const a of o.anchors || []){ const k = (a.group || '') + ':' + a.name; if(names.has(k)) err(rel, `站位重複：${k}`); names.add(k); if(!(isFinite(a.x) && isFinite(a.y))) err(rel, `站位 ${k} 的 x、y 不是數字`); }
}
for(const { rel, o } of stories){
  if(!sceneIds.has(o.scene)) err(rel, `指到不存在的場景 ${o.scene}`);
  const scn = scenes.find(s => s.o.id === o.scene);
  const has = (g, n) => scn && (scn.o.anchors || []).some(a => a.name === n && (!a.group || a.group === g));
  (o.beats || []).forEach((b, i) => {
    if(typeof b.text !== 'string') err(rel, `第 ${i + 1} 句缺 text`);
    const s = b.stage || {};
    for(const g of ['p', 'o', 'f']){
      if(s[g] && scn && !has(g, s[g])) err(rel, `第 ${i + 1} 句的 ${g}:「${s[g]}」在場景裡找不到同名站位`);
      const path = s[g + 'Path']; if(path != null && !Array.isArray(path)) err(rel, `第 ${i + 1} 句的 ${g}Path 要是陣列`);
      for(const n of Array.isArray(path) ? path : []) if(scn && !has(g, n)) err(rel, `第 ${i + 1} 句 ${g}Path 的「${n}」在場景裡找不到同名站位`);
    }
    if(s.door && !['open', 'swing', 'shut'].includes(s.door)) err(rel, `第 ${i + 1} 句的 door 只能是 open／swing／shut`);
    if(s.set && scn) for(const n of Object.keys(s.set)) if(!(scn.o.items || []).some(it => (it.name || '') === n)) err(rel, `第 ${i + 1} 句 set 指到場景裡沒有的物件名「${n}」`);
  });
}

const ent = (kind, list) => list.map(({ o }) => ({ id: o.id, name: o.name, kind: o.kind, file: `art/pixel/${kind}/${o.id}.json`, updatedAt: o.updatedAt || 0 }));
const index = { version: 1, generatedAt: new Date().toISOString(), objects: ent('objects', objects), scenes: ent('scenes', scenes), stories: ent('stories', stories) };

if(errors.length){ console.error('✗ 發現問題：\n  ' + errors.join('\n  ')); process.exit(1); }
console.log(`✓ ${objects.length} 物件、${scenes.length} 場景、${stories.length} 劇本，全部通過。`);
if(!checkOnly){ fs.mkdirSync(DIR, { recursive: true }); fs.writeFileSync(path.join(DIR, 'index.json'), JSON.stringify(index, null, 1) + '\n'); console.log('  已重建 art/pixel/index.json'); }
