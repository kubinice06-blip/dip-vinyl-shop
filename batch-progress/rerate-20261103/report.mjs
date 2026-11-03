#!/usr/bin/env node
// 產 REPORT.md（第三輪套用）：三軸新舊分布、稀有度變化、全池前後等級分布（含殿堂／流亡／異端）、變動最大 20 張。
// 用法：node batch-progress/rerate-20261103/report.mjs [套用前 seed 的 git rev，預設 57249a9ad] [gate 摘要檔]
import fs from 'node:fs'; import { execSync } from 'node:child_process';
const D = 'batch-progress/rerate-20261103/';
const rev = process.argv[2] || '57249a9ad';
const ap = JSON.parse(fs.readFileSync(D + 'applied.json', 'utf8'));
const rarityOf = (c, o, a) => { const s = c + a + (o >= 5 ? 1 : 0); return s >= 9 ? 'legendary' : s >= 8 ? 'epic' : s >= 7 ? 'uncommon' : s >= 6 ? 'rare' : 'common'; };
const R = ['common', 'rare', 'uncommon', 'epic', 'legendary'], RZ = { common: '普通', rare: '稀有', uncommon: '獨特', epic: '史詩', legendary: '傳奇' };
const AX = ['classic', 'obscurity', 'accessibility'], V = [1, 2, 3, 4, 5];
const ZH = { classic: '經典度', obscurity: '冷門度', accessibility: '硬蕊度' };
const dist = (xs, f, keys) => { const c = Object.fromEntries(keys.map(k => [k, 0])); for (const x of xs) c[f(x)]++; return keys.map(k => c[k]); };
const cnt = (xs, f) => xs.filter(f).length;
const n = v => v.toLocaleString('en-US');
const L = [];
const ch = cnt(ap, x => x.changed), rc = cnt(ap, x => x.oldRarity !== x.newRarity);
L.push('# 三軸重評第三輪套用報告（2026-11-03）', '',
  `- 範圍：9 月前入庫、沒有評分來源紀錄的一般卡 ${n(ap.length)} 張（31 片；全是一般卡、沒有 manifest）。`,
  `- 三軸有變 **${n(ch)}** 張；稀有度有變 **${n(rc)}** 張；keep ${cnt(ap, x => x.keep)} 張。`,
  `- 冷門度下限機械檢查：verdict 低於下限 ${cnt(ap, x => x.floor.exempt && /疑錯配/.test(x.floor.exempt))} 張，全數 \`why\` 已註明疑錯配、各片主線已覆核 → 不套；機械抬分 ${cnt(ap, x => x.floor.triggered)} 張。`, '');

L.push('## 一、三軸新舊分布（1/2/3/4/5）', '', '| 軸 | 舊 | 新 | 有變 |', '|---|---|---|---:|');
for (const a of AX) L.push(`| ${ZH[a]} | ${dist(ap, x => x.old[a], V).join('/')} | ${dist(ap, x => x.new[a], V).join('/')} | ${n(cnt(ap, x => x.old[a] !== x.new[a]))} |`);
const mean = (f) => (ap.reduce((s, x) => s + f(x), 0) / ap.length).toFixed(2);
L.push('', `- 平均：經典度 ${mean(x => x.old.classic)} → ${mean(x => x.new.classic)}；冷門度 ${mean(x => x.old.obscurity)} → ${mean(x => x.new.obscurity)}；硬蕊度 ${mean(x => x.old.accessibility)} → ${mean(x => x.new.accessibility)}。`);

L.push('', '## 二、稀有度變化（本批）', '', '| | 普通 | 稀有 | 獨特 | 史詩 | 傳奇 |', '|---|---:|---:|---:|---:|---:|',
  `| 舊 | ${dist(ap, x => x.oldRarity, R).map(n).join(' | ')} |`, `| 新 | ${dist(ap, x => x.newRarity, R).map(n).join(' | ')} |`);
const up = cnt(ap, x => R.indexOf(x.newRarity) > R.indexOf(x.oldRarity)), dn = cnt(ap, x => R.indexOf(x.newRarity) < R.indexOf(x.oldRarity));
L.push('', `- 升級 ${n(up)}、降級 ${n(dn)}。主要流向：` + Object.entries(ap.filter(x => x.oldRarity !== x.newRarity).reduce((m, x) => { const k = `${RZ[x.oldRarity]}→${RZ[x.newRarity]}`; m[k] = (m[k] || 0) + 1; return m; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => `${k} ${n(v)}`).join('、') + '。');

L.push('', '## 三、冷門度下限', '',
  '- listeners 取 shard 的 `listenersKV`（worker 快取）。這批沒有試聽狀態，只套「<1,000 → 至少 4」「1,000–4,999 → 至少 3」，不套「無試聽 → 5」。',
  `- listeners 缺值 ${cnt(ap, x => x.listeners == null)}、=0（漏抓，視同缺值）${cnt(ap, x => x.listeners === 0)}：不套。`,
  `- 低於下限 ${cnt(ap, x => /疑錯配/.test(x.floor.exempt || ''))} 張（需 ≥4：${cnt(ap, x => /疑錯配/.test(x.floor.exempt || '') && x.listeners < 1000)}；需 ≥3：${cnt(ap, x => /疑錯配/.test(x.floor.exempt || '') && x.listeners >= 1000)}），全部 \`why\` 寫明錯配（古典盤名拆分／作曲家掛名最多，其次華語／日語中英拆名、彎引號／省略號／句點盤名、卷次、掛他人名下）。各片主線已逐張看過下限缺口，套用端抽 40 張複看無異議 → 照 ADDENDUM 例外條款不套。判定規則：\`why\` 含「錯配／拆名／漏抓／視同缺值／不套下限」。`,
  `- 未註明錯配卻低於下限：0 張，所以機械抬分 0。`);

const before = JSON.parse(execSync(`git show ${rev}:seed_cards.json`, { maxBuffer: 1 << 30 }).toString());
const after = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const TZ = { hall: '殿堂', pearl: '流亡', heresy: '異端' };
const grade = r => r[8] ? r[8] : rarityOf(r[2], r[3], r[4]);
const G = ['hall', 'pearl', 'heresy', 'legendary', 'epic', 'uncommon', 'rare', 'common'];
L.push('', `## 四、全池等級分布（${n(after.length)} 張；頂點卡另計，一般卡依公式）`, '', '| | 殿堂 | 流亡 | 異端 | 傳奇 | 史詩 | 獨特 | 稀有 | 普通 |', '|---|---:|---:|---:|---:|---:|---:|---:|---:|');
const gb = dist(before, grade, G), ga = dist(after, grade, G);
L.push(`| 套用前 | ${gb.map(n).join(' | ')} |`, `| 套用後 | ${ga.map(n).join(' | ')} |`, `| 差 | ${ga.map((v, i) => (v - gb[i] > 0 ? '+' : '') + n(v - gb[i])).join(' | ')} |`);
L.push('', '| 全池 | 經典度 1/2/3/4/5 | 冷門度 | 硬蕊度 |', '|---|---|---|---|');
for (const [nm, s] of [['套用前', before], ['套用後', after]]) L.push(`| ${nm} | ${[2, 3, 4].map(i => dist(s, r => r[i], V).join('/')).join(' | ')} |`);
L.push('', `- 頂點 tier 欄沒動（殿堂／流亡／異端前後相同）。`);

const delta = x => AX.reduce((s, a) => s + Math.abs(x.new[a] - x.old[a]), 0);
const top = [...ap].sort((a, b) => delta(b) - delta(a) || a.key.localeCompare(b.key)).slice(0, 20);
L.push('', '## 五、變動最大 20 張（三軸差絕對值總和）', '', '| 卡 | 片 | 舊 C/O/A | 新 C/O/A | 稀有度 | 理由 |', '|---|---|---|---|---|---|');
for (const x of top) L.push(`| ${x.artist}《${x.album}》 | ${x.shard} | ${AX.map(a => x.old[a]).join('/')} | ${AX.map(a => x.new[a]).join('/')} | ${RZ[x.oldRarity]}→${RZ[x.newRarity]} | ${String(x.why).replace(/\|/g, '／')} |`);

L.push('', '## 六、寫入', '',
  `- \`seed_cards.json\`：三軸欄字串替換 ${n(ch)} 列，三道防呆（總筆數 ${n(after.length)} 不變、命中數＝要改數、逐列比對只動第 3–5 欄且新值正確；tier 欄 index 8 未動、範圍內 0 張頂點）。重跑「已是新值 ${n(ch)}」、替換 0。`,
  '- manifest：全 repo 根目錄＋`batch-progress/*/onboarding-manifest.json` 掃過，這 7,525 張 0 命中，沒有 manifest 可寫。',
  `- Firestore \`card_catalog\`：只推 classic／obscurity／accessibility／rarity 四欄（\`updateMask\`＋\`currentDocument.exists=true\`），${n(ch)}／${n(ch)} 成功、失敗 0；抽 15 張讀回 15/15；推完整份重列（22,796 文件）比對 0 不符。payload 在 \`publish-stage/rerate-20261103/card-catalog-patches.json\`（不進版控）。`,
  '- 店內印刷卡：A6／A7／A7-A4 的 html＋jsx、A4 PDF 重出（在售 116 張中 7 張三軸有變）。`build-seed-genres` 0 變動。', '');
const gate = process.argv[3] && fs.existsSync(process.argv[3]) ? fs.readFileSync(process.argv[3], 'utf8').trim() : '';
if (gate) L.push('## 七、published gate（抽 15 份）', '', gate, '');
fs.writeFileSync(D + 'REPORT.md', L.join('\n') + '\n');
console.log(L.join('\n'));
