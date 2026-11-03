// 方案 C（店主 2026-11-03 拍板）：產出 audit 套用清單 apply-c.json。
// tier：7 星重審 apex7≠none 的收；另外第一輪強度 3 的原殿堂／原異端保留；流亡＝進過 7 星重審清單、listeners 1–299、非疑錯配、
// 稽核判定冷門度 5（下限抬上去的不算，否則流亡會膨脹到上千張，與店主看過的方案 C 不符）。
// 三軸：稽核 verdicts（3,996 張）＋冷門度下限（listeners 取 shard／apex7 listenersKV／listeners-S）。
// 用法：node batch-progress/audit-20261102/build-apply-c.js
const fs = require('fs'), D = 'batch-progress/audit-20261102/';
const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const S = new Map(seed.map(r => [r[0] + '|' + r[1], r]));
const loadDir = (dir, re) => { const m = new Map(); for (const f of fs.readdirSync(dir).filter(f => re.test(f))) { let j = JSON.parse(fs.readFileSync(dir + f)); if (!Array.isArray(j)) j = Object.values(j).find(Array.isArray) || []; for (const x of j) m.set(x.key, x); } return m; };
const v = loadDir(D + 'verdicts/', /-\d+-\d+\.json$/);
for (const f of ['H01.json', 'H02.json', 'H03.json']) for (const x of JSON.parse(fs.readFileSync(D + 'verdicts/' + f))) v.set(x.key, x);
const z = loadDir(D + 'apex7/verdicts/', /\.json$/);
const items = new Map(); for (const f of fs.readdirSync(D + 'shards')) for (const i of JSON.parse(fs.readFileSync(D + 'shards/' + f))) items.set(i.key, i);
const zrows = new Map(); for (const f of fs.readdirSync(D + 'apex7/shards')) for (const r of JSON.parse(fs.readFileSync(D + 'apex7/shards/' + f))) zrows.set(r.key, r);
const LS = JSON.parse(fs.readFileSync(D + 'listeners-S.json', 'utf8'));
const L = k => { const i = items.get(k), r = zrows.get(k); const c = [i && i.listeners, r && r.listeners, r && r.listenersKV, LS[k]].find(x => typeof x === 'number'); return c ?? null; };
const out = [];
const cnt = {};
for (const [k, i] of items) {
  const s = S.get(k); if (!s) continue; const x = v.get(k);
  let o = x.obscurity; const l = L(k);
  const mism = /錯配/.test((z.get(k) || {}).why || '') || /錯配/.test(x.why || '');
  if (typeof l === 'number' && l > 0 && !mism) { if (l < 1000) o = Math.max(o, i.preview === 'unavailable' ? 5 : 4); else if (l < 5000) o = Math.max(o, 3); }
  const nw = { classic: x.classic, obscurity: o, accessibility: x.accessibility };
  let tier = null; const a7 = z.get(k);
  if (a7 && a7.apex7 !== 'none') tier = a7.apex7;
  else if ((s[8] === 'hall' || s[8] === 'heresy') && x.apex === s[8] && x.strength === 3) tier = s[8];
  else if (zrows.has(k) && typeof l === 'number' && l >= 1 && l < 300 && !mism && x.obscurity >= 5) tier = 'pearl';
  const old = { classic: s[2], obscurity: s[3], accessibility: s[4], tier: s[8] || null };
  nw.tier = tier;
  cnt[tier || 'none'] = (cnt[tier || 'none'] || 0) + 1;
  if (old.classic !== nw.classic || old.obscurity !== nw.obscurity || old.accessibility !== nw.accessibility || old.tier !== nw.tier)
    out.push({ key: k, group: i.group, listeners: l, old, new: nw, why: x.why, apexWhy: a7 ? a7.why : undefined, evidence: a7 && a7.apex7 !== 'none' ? a7.evidence : undefined });
}
fs.writeFileSync(D + 'apply-c.json', JSON.stringify(out, null, 0));
const tc = {}; for (const o of out) if (o.old.tier !== o.new.tier) { const t = (o.old.tier || '-') + '→' + (o.new.tier || '-'); tc[t] = (tc[t] || 0) + 1; }
console.log('changed', out.length, 'tiers in audited set', cnt, 'tier moves', tc);
