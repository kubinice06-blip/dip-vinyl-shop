// c-SEA 研究層查證後推翻卡單的部分，回寫候選檔。
// 用法：node batch-progress/csea/apply-research-fixes.mjs [--write]
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const FIX = {
  'Duo Kribo|Duo Kribo': {
    album: 'Duo Kribo (Original Soundtrack)',
    selfTitled: false,
    why: '研究層查證：rgMbid f10d4713 的 13 軌（含兩段器樂與〈Credit Title Duo Kribo〉）與 Musica MSC7051 編號，證明它是 1978 年的電影原聲帶，也就是 Rolling Stone Indonesia 150 大第 45 名的《Duo Kribo Original Soundtrack》。這對組合另有一張 1977 年 Irama Tara 的同名專輯，是不同唱片。卡片標題正名、selfTitled 改 false。歷史定位明確，不移除。',
  },
};

const write = process.argv.includes('--write');
const p = path.join(ROOT, 'batch-progress/csea/cand.json');
const j = JSON.parse(fs.readFileSync(p, 'utf8'));
let n = 0; const missing = [];
for (const [k, f] of Object.entries(FIX)) {
  const [artist, album] = k.split('|');
  const c = j.albums.find(x => x.artist === artist && x.album === album)
    || j.albums.find(x => x.artist === artist && x.album === f.album);   // 已改過名也要找得到
  if (!c) { missing.push(k); continue; }
  const before = { album: c.album, selfTitled: c.selfTitled };
  if (f.album) c.album = f.album;
  if (f.selfTitled !== undefined) c.selfTitled = f.selfTitled;
  const note = `【研究層更正】${f.why}`;
  c.mbNote = [String(c.mbNote || '').split('｜').filter(x => !x.startsWith('【研究層更正】')).join('｜'), note].filter(Boolean).join('｜');
  console.log(`${artist}：《${before.album}》→《${c.album}》｜selfTitled ${before.selfTitled} → ${c.selfTitled}`);
  n++;
}
missing.forEach(k => console.log(`  ⚠ 找不到：${k}`));
console.log(`\n回寫 ${n} 張｜找不到 ${missing.length} 張`);
if (write) { fs.writeFileSync(p, JSON.stringify(j, null, 1)); console.log('已寫回 cand.json'); }
process.exit(missing.length ? 1 : 0);
