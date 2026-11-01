#!/usr/bin/env node
// 產 REPORT.md：本範圍新舊三軸／稀有度分布、各線分布、全池前後、變動最大 20 張。
// 用法：node batch-progress/rerate-20261101/report.mjs <套用前 seed 的 git rev，預設 origin/main>
import fs from 'node:fs'; import { execSync } from 'node:child_process';
const D = 'batch-progress/rerate-20261101/';
const rev = process.argv[2] || 'b1f385ec6';
const ap = JSON.parse(fs.readFileSync(D + 'applied.json', 'utf8'));
const rarityOf = (c, o, a) => { const s = c + a + (o >= 5 ? 1 : 0); return s >= 10 ? 'legendary' : s >= 8 ? 'epic' : s >= 6 ? 'uncommon' : s >= 4 ? 'rare' : 'common'; };
const R = ['common', 'rare', 'uncommon', 'epic', 'legendary'], AX = ['classic', 'obscurity', 'accessibility'];
const ZH = { classic: '經典度', obscurity: '冷門度', accessibility: '硬蕊度' };
const dist = (xs, f, keys) => { const c = Object.fromEntries(keys.map(k => [k, 0])); for (const x of xs) c[f(x)]++; return keys.map(k => c[k]); };
const pct = (a, n) => a.map(v => `${v}（${(100 * v / n).toFixed(1)}%）`).join('／');
const L = [];
L.push('# 三軸重評套用報告（2026-11-01）', '', `範圍 ${ap.length} 張；三軸有變 ${ap.filter(x => x.changed).length} 張；稀有度有變 ${ap.filter(x => x.oldRarity !== x.newRarity).length} 張；keep ${ap.filter(x => x.keep).length} 張。`, '');
L.push('## 本範圍三軸分布（1/2/3/4/5）', '', '| 軸 | 舊 | 新 |', '|---|---|---|');
for (const a of AX) L.push(`| ${ZH[a]} | ${dist(ap, x => x.old[a], [1, 2, 3, 4, 5]).join('/')} | ${dist(ap, x => x.new[a], [1, 2, 3, 4, 5]).join('/')} |`);
L.push('', '## 本範圍稀有度（common／rare／uncommon／epic／legendary）', '', '| | 張數 |', '|---|---|',
  `| 舊 | ${pct(dist(ap, x => x.oldRarity, R), ap.length)} |`, `| 新 | ${pct(dist(ap, x => x.newRarity, R), ap.length)} |`);
L.push('', '## 各線', '', '| 線 | 張數 | 軸 | 舊 1/2/3/4/5 | 新 1/2/3/4/5 |', '|---|---:|---|---|---|');
const LN = { mood: '情緒薄格 md／mc／ml', spotify: 'Spotify 補卡 sf', eastbloc: '鐵幕爵士 eb' };
for (const ln of ['mood', 'spotify', 'eastbloc']) { const xs = ap.filter(x => x.line === ln);
  for (const a of AX) L.push(`| ${LN[ln]} | ${xs.length} | ${ZH[a]} | ${dist(xs, x => x.old[a], [1, 2, 3, 4, 5]).join('/')} | ${dist(xs, x => x.new[a], [1, 2, 3, 4, 5]).join('/')} |`);
  L.push(`| ${LN[ln]} | ${xs.length} | 稀有度 C/R/U/E/L | ${dist(xs, x => x.oldRarity, R).join('/')} | ${dist(xs, x => x.newRarity, R).join('/')} |`); }
// 全池
const before = JSON.parse(execSync(`git show ${rev}:seed_cards.json`, { maxBuffer: 1 << 30 }).toString());
const after = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const pr = r => rarityOf(r[2], r[3], r[4]);
L.push('', `## 全池（${after.length} 張；稀有度依公式，頂點 tier 卡另計不影響公式）`, '', '| | common | rare | uncommon | epic | legendary |', '|---|---:|---:|---:|---:|---:|');
for (const [n, s] of [['套用前', before], ['套用後', after]]) L.push(`| ${n} | ${dist(s, pr, R).map(v => `${v}（${(100 * v / s.length).toFixed(1)}%）`).join(' | ')} |`);
L.push('', '| 全池 | 經典度 1/2/3/4/5 | 冷門度 | 硬蕊度 |', '|---|---|---|---|');
for (const [n, s] of [['套用前', before], ['套用後', after]]) L.push(`| ${n} | ${[2, 3, 4].map(i => dist(s, r => r[i], [1, 2, 3, 4, 5]).join('/')).join(' | ')} |`);
// 變動最大 20 張
const delta = x => AX.reduce((s, a) => s + Math.abs(x.new[a] - x.old[a]), 0);
const top = [...ap].sort((a, b) => delta(b) - delta(a) || a.key.localeCompare(b.key)).slice(0, 20);
L.push('', '## 變動最大 20 張（三軸差絕對值總和）', '', '| 卡 | 批 | 舊 C/O/A | 新 C/O/A | 稀有度 | 理由 |', '|---|---|---|---|---|---|');
for (const x of top) L.push(`| ${x.artist}《${x.album}》 | ${x.batch} | ${AX.map(a => x.old[a]).join('/')} | ${AX.map(a => x.new[a]).join('/')} | ${x.oldRarity}→${x.newRarity} | ${String(x.why).replace(/\|/g, '／')} |`);
const id = ap.find(x => x.key === 'Yancy Körössy|Identification');
L.push('', '## 錨點', '', `- Yancy Körössy《Identification》：舊 ${AX.map(a => id.old[a]).join('/')}（${id.oldRarity}）→ 新 ${AX.map(a => id.new[a]).join('/')}（${id.newRarity}）。${id.why}`);
const sz = ap.find(x => /Szabados/.test(x.artist) && /esk[üu]v/i.test(x.album));
if (sz) L.push(`- ${sz.artist}《${sz.album}》：舊 ${AX.map(a => sz.old[a]).join('/')} → 新 ${AX.map(a => sz.new[a]).join('/')}（${sz.newRarity}）。`);
L.push('', '## 寫入', '', '- `seed_cards.json`：三軸欄字串替換（2026-11-01 套用）。', '- manifest：根目錄與 `batch-progress/add-*/onboarding-manifest.json` 兩份，`ratings.source`＝`manual:rerate-20261101`，舊值在 `ratings.previous`，`rarity` 依公式重算。',
  '- Firestore `card_catalog`：`publish-manifest` 乾跑產 patch，過濾成只含 classic／obscurity／accessibility／rarity 四欄（`publish-stage/rerate-20261101/card-catalog-patches.json`），推 2,957 筆成功、0 失敗。', '');
fs.writeFileSync(D + 'REPORT.md', L.join('\n'));
console.log(L.join('\n'));
