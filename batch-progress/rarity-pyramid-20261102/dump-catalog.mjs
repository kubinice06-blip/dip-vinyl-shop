#!/usr/bin/env node
// 列出 Firestore card_catalog 全部文件的 cardId／artist／album／rarity／tier／三軸（mask 欄位），存 catalog-dump.json（不進版控）
import fs from 'node:fs';
const F = 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents/card_catalog';
const KEY = 'AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg';
const fields = ['artist', 'album', 'rarity', 'tier', 'classic', 'obscurity', 'accessibility', 'hall', 'pearl', 'heresy', 'apex'];
const mask = fields.map(f => 'mask.fieldPaths=' + f).join('&');
const out = []; let token = '';
const val = v => v == null ? null : v.stringValue ?? (v.integerValue != null ? Number(v.integerValue) : v.booleanValue ?? v.doubleValue ?? null);
do {
  let j;
  for (let i = 0; i < 5; i++) {
    const r = await fetch(`${F}?pageSize=1000&${mask}&key=${KEY}${token ? '&pageToken=' + encodeURIComponent(token) : ''}`);
    if (r.ok) { j = await r.json(); break; }
    console.error(r.status, (await r.text()).slice(0, 200)); await new Promise(s => setTimeout(s, 2000 * (i + 1)));
  }
  if (!j) throw new Error('列出失敗');
  for (const d of j.documents || []) out.push({ id: (s => { try { return decodeURIComponent(s); } catch { return s; } })(d.name.split('/card_catalog/')[1]), rawId: d.name.split('/card_catalog/')[1], ...Object.fromEntries(fields.map(f => [f, val(d.fields?.[f])])) });
  token = j.nextPageToken || '';
  process.stderr.write(`\r${out.length}`);
} while (token);
fs.writeFileSync(process.argv[2] || 'catalog-dump.json', JSON.stringify(out));
console.error('\n共', out.length);
