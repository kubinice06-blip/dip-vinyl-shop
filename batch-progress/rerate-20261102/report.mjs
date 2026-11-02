#!/usr/bin/env node
// 產 REPORT.md（第二輪）：第二輪三軸／稀有度新舊分布（按線）、第一輪補下限、全池前後、變動最大 20 張、錨點。
// 用法：node batch-progress/rerate-20261102/report.mjs [套用前 seed 的 git rev，預設 6c8e7fdb7]
import fs from 'node:fs'; import { execSync } from 'node:child_process';
const D = 'batch-progress/rerate-20261102/';
const rev = process.argv[2] || '6c8e7fdb7';
const ap = JSON.parse(fs.readFileSync(D + 'applied.json', 'utf8'));
const f1 = JSON.parse(fs.readFileSync(D + 'floor-r1.json', 'utf8'));
const rarityOf = (c, o, a) => { const s = c + a + (o >= 5 ? 1 : 0); return s >= 10 ? 'legendary' : s >= 8 ? 'epic' : s >= 6 ? 'uncommon' : s >= 4 ? 'rare' : 'common'; };
const R = ['common', 'rare', 'uncommon', 'epic', 'legendary'], AX = ['classic', 'obscurity', 'accessibility'], V = [1, 2, 3, 4, 5];
const ZH = { classic: '經典度', obscurity: '冷門度', accessibility: '硬蕊度' };
const dist = (xs, f, keys) => { const c = Object.fromEntries(keys.map(k => [k, 0])); for (const x of xs) c[f(x)]++; return keys.map(k => c[k]); };
const pct = (a, n) => a.map(v => `${v}（${(100 * v / n).toFixed(1)}%）`).join('／');
const cnt = (xs, f) => xs.filter(f).length;
const L = [];
L.push('# 三軸重評第二輪套用報告（2026-11-02）', '',
  `- 第二輪重評 ${ap.length} 張：三軸有變 ${cnt(ap, x => x.changed)} 張；稀有度有變 ${cnt(ap, x => x.oldRarity !== x.newRarity)} 張；keep ${cnt(ap, x => x.keep)} 張。`,
  `- 第一輪 ${f1.length} 張補冷門度下限：抬分 ${cnt(f1, x => x.changed)} 張；稀有度有變 ${cnt(f1, x => x.oldRarity !== x.newRarity)} 張。`,
  `- 合計寫入 seed／manifest／card_catalog ${cnt(ap, x => x.changed) + cnt(f1, x => x.changed)} 張。`, '');

L.push('## 一、第二輪（6,381 張）', '', '### 三軸分布（1/2/3/4/5）', '', '| 軸 | 舊 | 新 |', '|---|---|---|');
for (const a of AX) L.push(`| ${ZH[a]} | ${dist(ap, x => x.old[a], V).join('/')} | ${dist(ap, x => x.new[a], V).join('/')} |`);
L.push('', '### 稀有度（common／rare／uncommon／epic／legendary）', '', '| | 張數 |', '|---|---|',
  `| 舊 | ${pct(dist(ap, x => x.oldRarity, R), ap.length)} |`, `| 新 | ${pct(dist(ap, x => x.newRarity, R), ap.length)} |`);
L.push('', '### 冷門度下限機械檢查', '',
  `- 有適用下限的非豁免卡 ${cnt(ap, x => !x.floor.exempt && x.floor.rule)} 張，verdict 全已合乎下限；機械抬分 ${cnt(ap, x => x.floor.triggered)} 張（三張數位版但書漏標關鍵字者已補進但書判準）。`,
  `- 豁免 ${cnt(ap, x => x.floor.exempt)} 張：` + Object.entries(ap.filter(x => x.floor.exempt).reduce((m, x) => (m[x.floor.exempt] = (m[x.floor.exempt] || 0) + 1, m), {})).map(([k, v]) => `${k} ${v}`).join('；') + '。',
  '- Last.fm 疑錯配（不套下限，冷門度照 RUBRIC 錨點）：' + ap.filter(x => /疑錯配/.test(x.floor.exempt || '')).map(x => `${x.artist}《${x.album}》${x.verdict.obscurity}→${x.new.obscurity}`).join('、') + '。', '');
L.push('### 各線', '', '| 線 | 張數 | 軸 | 舊 1/2/3/4/5 | 新 1/2/3/4/5 |', '|---|---:|---|---|---|');
const LN = [['c', 'c 系列（c48-rescue～c198）'], ['csea', 'csea 東南亞'], ['dt', 'downtempo dt'], ['nj', '新爵士 nj'], ['ts', '細分類 ts'], ['shop', '店主指定 shop'], ['etc', '其他（add-20261003／20261014、miles）']];
const lineKey = x => ['c', 'csea', 'dt', 'nj', 'ts', 'shop'].includes(x.line) ? x.line : 'etc';
for (const [ln, name] of LN) { const xs = ap.filter(x => lineKey(x) === ln); if (!xs.length) continue;
  for (const a of AX) L.push(`| ${name} | ${xs.length} | ${ZH[a]} | ${dist(xs, x => x.old[a], V).join('/')} | ${dist(xs, x => x.new[a], V).join('/')} |`);
  L.push(`| ${name} | ${xs.length} | 稀有度 C/R/U/E/L | ${dist(xs, x => x.oldRarity, R).join('/')} | ${dist(xs, x => x.newRarity, R).join('/')} |`); }

L.push('', '## 二、第一輪 2,957 張補冷門度下限', '',
  `- 抬分 ${cnt(f1, x => x.changed)} 張：→3 ${cnt(f1, x => x.changed && x.new.obscurity === 3)}、→4 ${cnt(f1, x => x.changed && x.new.obscurity === 4)}、→5 ${cnt(f1, x => x.changed && x.new.obscurity === 5)}（PLAN 預估 →4 約 455、→5 約 373）。`,
  `- 豁免 ${cnt(f1, x => x.floor.exempt)} 張：` + Object.entries(f1.filter(x => x.floor.exempt).reduce((m, x) => (m[x.floor.exempt] = (m[x.floor.exempt] || 0) + 1, m), {})).map(([k, v]) => `${k} ${v}`).join('；') + '。',
  '  - 疑錯配判準（抽看後定）：第一輪已依 RUBRIC 判為正規／主流通路（≤2），下限卻要一口氣抬到 4–5。抽看 81 張「舊值 ≤2 被抬」的卡，跳到 4–5 的 40 張幾乎全是大廠或華語主流盤（蕭亞軒、陳奕迅、王心凌、Twin Peaks 原聲、DG／ECM 現代音樂、Love Unlimited 等），聽眾數低是盤名寫法或拆名造成，維持第一輪值；只抬到 3 的（L 1,000–4,999）照下限。',
  '  - 但書：試聽 unavailable、第一輪 why 已寫明 Bandcamp／正式數位版者，冷門度給 4，不抬到 5。',
  '- 三軸只有冷門度動，經典度／硬蕊度沿用第一輪。', '',
  '| 軸 | 補下限前 | 補下限後 |', '|---|---|---|',
  `| 冷門度 | ${dist(f1, x => x.old.obscurity, V).join('/')} | ${dist(f1, x => x.new.obscurity, V).join('/')} |`,
  `| 稀有度 C/R/U/E/L | ${dist(f1, x => x.oldRarity, R).join('/')} | ${dist(f1, x => x.newRarity, R).join('/')} |`);
L.push('', '| 線 | 張數 | 冷門度 前 → 後 | 稀有度 C/R/U/E/L 前 → 後 |', '|---|---:|---|---|');
for (const [ln, name] of [['mood', '情緒薄格 md／mc／ml'], ['spotify', 'Spotify 補卡 sf'], ['eastbloc', '鐵幕爵士 eb']]) { const xs = f1.filter(x => x.line === ln);
  L.push(`| ${name} | ${xs.length} | ${dist(xs, x => x.old.obscurity, V).join('/')} → ${dist(xs, x => x.new.obscurity, V).join('/')} | ${dist(xs, x => x.oldRarity, R).join('/')} → ${dist(xs, x => x.newRarity, R).join('/')} |`); }

const before = JSON.parse(execSync(`git show ${rev}:seed_cards.json`, { maxBuffer: 1 << 30 }).toString());
const after = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const pr = r => rarityOf(r[2], r[3], r[4]);
L.push('', `## 三、全池（${after.length} 張；稀有度依公式，頂點 tier 卡另計不影響公式）`, '', '| | common | rare | uncommon | epic | legendary |', '|---|---:|---:|---:|---:|---:|');
for (const [n, s] of [['套用前', before], ['套用後', after]]) L.push(`| ${n} | ${dist(s, pr, R).map(v => `${v}（${(100 * v / s.length).toFixed(1)}%）`).join(' | ')} |`);
L.push('', '| 全池 | 經典度 1/2/3/4/5 | 冷門度 | 硬蕊度 |', '|---|---|---|---|');
for (const [n, s] of [['套用前', before], ['套用後', after]]) L.push(`| ${n} | ${[2, 3, 4].map(i => dist(s, r => r[i], V).join('/')).join(' | ')} |`);

const delta = x => AX.reduce((s, a) => s + Math.abs(x.new[a] - x.old[a]), 0);
const top = [...ap].sort((a, b) => delta(b) - delta(a) || a.key.localeCompare(b.key)).slice(0, 20);
L.push('', '## 四、變動最大 20 張（第二輪，三軸差絕對值總和）', '', '| 卡 | 批 | 舊 C/O/A | 新 C/O/A | 稀有度 | 理由 |', '|---|---|---|---|---|---|');
for (const x of top) L.push(`| ${x.artist}《${x.album}》 | ${x.batch} | ${AX.map(a => x.old[a]).join('/')} | ${AX.map(a => x.new[a]).join('/')} | ${x.oldRarity}→${x.newRarity} | ${String(x.why).replace(/\|/g, '／')} |`);

const id = f1.find(x => x.key === 'Yancy Körössy|Identification');
L.push('', '## 五、錨點', '',
  `- Yancy Körössy《Identification》：第一輪後 ${AX.map(a => id.old[a]).join('/')}（${id.oldRarity}）→ 補下限後 ${AX.map(a => id.new[a]).join('/')}（${id.newRarity}）。Last.fm ${id.listeners} 位聽眾、Apple 試聽 ${id.preview} → 冷門度至少 4。原始（重評前）3/3/3。`);
L.push('', '## 六、寫入', '',
  '- `seed_cards.json`：三軸欄字串替換，三道防呆（總筆數不變、命中數＝要改數、逐列比對只動第 3–5 欄且新值正確）。',
  '- manifest：根目錄（2026-09-01 起）與 `batch-progress/add-*/onboarding-manifest.json` 兩份，`ratings.source`＝`manual:rerate-20261102`，舊值在 `ratings.previous`，`rarity` 依公式重算；`note` 記理由與下限觸發／豁免。',
  '- Firestore `card_catalog`：`publish-manifest` 乾跑產 patch，過濾成只含 classic／obscurity／accessibility／rarity 四欄（`publish-stage/rerate-20261102/card-catalog-patches.json`）。',
  '- 產物：`build-seed-genres` 0 變動；店內印刷卡（`data/shop/print/shop-a6`、`shop-a7-a4` 的 html／jsx）重出。', '');
fs.writeFileSync(D + 'REPORT.md', L.join('\n'));
console.log(L.join('\n'));
