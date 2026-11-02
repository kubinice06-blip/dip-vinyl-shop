#!/usr/bin/env python3
# 合併檢查＋summary 統計（U2，2026-11-02）。
# 用法：python3 batch-progress/audit-20261102/verdicts/summarize.py A04
# 讀 shards/<shard>.json 與 verdicts/<shard>-*.json；主線覆核紀錄讀 verdicts/<shard>.mainline.json
# （{"changes":[{"key","field","from","to","why"}], "returns":[...文字]}），
# 印出 markdown 統計段（summary.md 其餘段落由主線手寫）。
import json, glob, sys, re, collections
D = 'batch-progress/audit-20261102/'
sh = sys.argv[1]
items = json.load(open(f'{D}shards/{sh}.json'))
segs = sorted(glob.glob(f'{D}verdicts/{sh}-*-*.json'), key=lambda p: int(re.findall(r'-(\d+)-\d+\.json$', p)[0]))
V = {}
dup = []
for p in segs:
    for v in json.load(open(p)):
        if v['key'] in V: dup.append(v['key'])
        V[v['key']] = v
keys = [x['key'] for x in items]
err = []
miss = [k for k in keys if k not in V]
extra = [k for k in V if k not in set(keys)]
AX = ('classic', 'obscurity', 'accessibility')
for k, v in V.items():
    for a in AX:
        if not (isinstance(v.get(a), int) and 1 <= v[a] <= 5): err.append(f'{k}: {a}={v.get(a)}')
    if v.get('apex') not in ('hall', 'pearl', 'heresy', 'none'): err.append(f'{k}: apex={v.get("apex")}')
    ap = v.get('apex')
    if ap == 'hall' and v.get('classic') != 5: err.append(f'{k}: hall 但 classic={v.get("classic")}')
    if ap == 'heresy' and v.get('accessibility') != 5: err.append(f'{k}: heresy 但 accessibility={v.get("accessibility")}')
    if ap == 'pearl' and v.get('obscurity') != 5: err.append(f'{k}: pearl 但 obscurity={v.get("obscurity")}')
out = []
P = out.append
P(f'## 合併檢查\n')
P(f'- 段檔：{", ".join(p.split("/")[-1] for p in segs)}')
P(f'- shard {len(keys)} 張；verdicts {len(V)} 筆；缺 {len(miss)}；多 {len(extra)}；重複 {len(dup)}；格式／門檻錯誤 {len(err)}')
for x in (miss + extra + dup + err)[:40]: P(f'  - {x}')
P('')
it = {x['key']: x for x in items}
P('## 三軸新舊分布（1/2/3/4/5）\n')
P('| 軸 | 舊 | 新 | 平均 舊→新 |\n|---|---|---|---|')
for a in AX:
    o = collections.Counter(it[k]['cur'][a] for k in keys if k in V)
    n = collections.Counter(V[k][a] for k in keys if k in V)
    ks = [k for k in keys if k in V]
    mo = sum(it[k]['cur'][a] for k in ks) / len(ks); mn = sum(V[k][a] for k in ks) / len(ks)
    P(f'| {a} | {"/".join(str(o[i]) for i in range(1,6))} | {"/".join(str(n[i]) for i in range(1,6))} | {mo:.2f}→{mn:.2f} |')
P('')
P('## apex 判定\n')
tab = collections.Counter((it[k]['tier'] or '—', V[k]['apex']) for k in keys if k in V)
P('| 原 tier → 新判定 | 張數 |\n|---|---:|')
for (a, b), c in sorted(tab.items()): P(f'| {a} → {b} | {c} |')
P('')
if items and items[0]['group'] == 'S':
    P('## S 組盲評一致率（新判 vs cur）\n')
    def stratum(x):
        s = x.get('curSource') or 'none'
        return 'worker' if s.startswith('worker') or s.startswith('lastfm') or s.startswith('api') else ('manual' if s.startswith('manual') else ('none' if s == 'none' else s.split(':')[0]))
    groups = collections.defaultdict(list)
    for k in keys:
        if k in V: groups[stratum(it[k])].append(k); groups['全部'].append(k)
    P('| 層 | n | 軸 | 一致 | 差1 | 差≥2 | 新−舊平均 | 新>舊 / 新<舊 |\n|---|---:|---|---:|---:|---:|---:|---|')
    for g in ['全部'] + sorted(x for x in groups if x != '全部'):
        ks = groups[g]
        for a in AX:
            d = [V[k][a] - it[k]['cur'][a] for k in ks]
            n = len(d)
            P(f'| {g} | {n} | {a} | {sum(1 for x in d if x==0)/n:.0%} | {sum(1 for x in d if abs(x)==1)/n:.0%} | {sum(1 for x in d if abs(x)>=2)/n:.0%} | {sum(d)/n:+.2f} | {sum(1 for x in d if x>0)}/{sum(1 for x in d if x<0)} |')
    P('')
    P('curSource 原值分層：' + ', '.join(f'{s}={c}' for s, c in collections.Counter((it[k].get('curSource') or 'none') for k in keys).most_common()))
    P('')
s3 = [k for k in keys if k in V and V[k]['apex'] != 'none' and V[k].get('strength') == 3]
P(f'## 強度 3 的頂點名單（{len(s3)} 張）\n')
for k in s3: P(f'- {V[k]["apex"]}｜{k}')
others = [k for k in keys if k in V and V[k]['apex'] != 'none' and V[k].get('strength') != 3]
P(f'\n其餘頂點判定（強度 ≠3 或未填）：{len(others)} 張\n')
for k in others: P(f'- {V[k]["apex"]}（{V[k].get("strength")}）｜{k}')
P('')
try:
    ml = json.load(open(f'{D}verdicts/{sh}.mainline.json'))
except FileNotFoundError:
    ml = {'changes': [], 'returns': [], 'spot': []}
P(f'## 主線覆核\n')
P(f'- 抽查：{len(ml.get("spot", []))} 張　' + '；'.join(ml.get('spot', [])))
P(f'- 改動 {len(ml["changes"])} 處：')
for c in ml['changes']: P(f'  - {c["key"]}：{c["field"]} {c["from"]}→{c["to"]}。{c["why"]}')
P(f'- 退回 {len(ml.get("returns", []))} 段' + ('：' if ml.get('returns') else ''))
for r in ml.get('returns', []): P(f'  - {r}')
print('\n'.join(out))
stats = collections.Counter(V[k]['apex'] for k in keys if k in V)
print(f'\n<!-- STAT {len(V)} hall={stats["hall"]} pearl={stats["pearl"]} heresy={stats["heresy"]} none={stats["none"]} ok={not (miss or extra or dup or err)} -->')
