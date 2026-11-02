#!/usr/bin/env python3
# 全池評分稽核＋頂點卡篩選工作清單（2026-11-02）。
# 分五組：A＝現有頂點卡 917 張（tier 與三軸是否相符）；H＝殿堂候選（非頂點 classic=5）；
# X＝異端候選（非頂點 accessibility=5）；P＝流亡候選（非頂點 obscurity=5 且 Last.fm listeners 有效值 <300）；
# S＝9 月前入庫的一般卡分層抽樣 400 張（盲評看失準程度）。
# 用法：python3 batch-progress/audit-20261102/build-worklist.py
import json, glob, os, random, collections
D = 'batch-progress/audit-20261102/'
seed = json.load(open('seed_cards.json'))
T = lambda r: r[8] if len(r) > 8 else None
K = lambda r: r[0] + '|' + r[1]
done = {x['key'] for x in json.load(open('batch-progress/rerate-20261101/applied.json'))} | \
       {x['key'] for x in json.load(open('batch-progress/rerate-20261102/applied.json'))}
facts, lst, src, pv, man = {}, {}, {}, {}, {}
for f in sorted(glob.glob('desc-tools/batches/research/*.json')):
    try: j = json.load(open(f))
    except Exception: continue
    for e in (j if isinstance(j, list) else []):
        if isinstance(e, dict) and e.get('artist'):
            fx = [x.get('f', '') if isinstance(x, dict) else str(x) for x in e.get('facts', [])]
            if fx: facts[e['artist'] + '|' + (e.get('album') or '')] = fx
for f in sorted(glob.glob('onboarding-manifest-*.json')):
    try: j = json.load(open(f))
    except Exception: continue
    for a in j.get('albums') or j.get('cards') or []:
        k = (a.get('artist') or '') + '|' + (a.get('album') or '')
        rt = a.get('ratings') or {}
        man.setdefault(k, os.path.basename(f)); src.setdefault(k, rt.get('source'))
        pv.setdefault(k, (a.get('preview') or {}).get('status'))
        if isinstance(rt.get('listeners'), (int, float)): lst.setdefault(k, rt['listeners'])
def item(r, group):
    k = K(r)
    return {'key': k, 'artist': r[0], 'album': r[1], 'group': group, 'tier': T(r),
            'year': r[6] if len(r) > 6 else None, 'genres': r[5] if len(r) > 5 else None,
            'cur': {'classic': r[2], 'obscurity': r[3], 'accessibility': r[4]},
            'listeners': lst.get(k), 'preview': pv.get(k), 'curSource': src.get(k), 'manifest': man.get(k),
            'facts': ' / '.join(facts.get(k, []))[:1200]}
na = [r for r in seed if not T(r)]
groups = {
    'A': [item(r, 'A') for r in seed if T(r)],
    'H': [item(r, 'H') for r in na if r[2] == 5],
    'X': [item(r, 'X') for r in na if r[4] == 5],
    'P': [item(r, 'P') for r in na if r[3] == 5 and isinstance(lst.get(K(r)), (int, float)) and 0 < lst[K(r)] < 300],
}
# 同一張只進一組（優先序 H > X > P）
seen = set()
for g in ('A', 'H', 'X', 'P'):
    groups[g] = [x for x in groups[g] if not (x['key'] in seen or seen.add(x['key']))]
pre = [r for r in na if K(r) not in done and K(r) not in seen]
rnd = random.Random(20261102)
strata = collections.defaultdict(list)
for r in pre: strata[str(src.get(K(r)) or 'none').split(':')[0][:12]].append(r)
S = []
for s, rs in sorted(strata.items()):
    n = max(10, round(400 * len(rs) / len(pre)))
    S += [item(x, 'S') for x in rnd.sample(rs, min(n, len(rs)))]
groups['S'] = S[:420]
os.makedirs(D + 'shards', exist_ok=True)
sizes = {'A': 230, 'H': 220, 'X': 240, 'P': 260, 'S': 210}
for g, its in groups.items():
    its.sort(key=lambda x: x['key'])
    n = sizes[g]
    for i in range(0, len(its), n):
        json.dump(its[i:i + n], open(f'{D}shards/{g}{i // n + 1:02d}.json', 'w'), ensure_ascii=False, indent=0)
for g, its in groups.items(): print(g, len(its))
print('strata', {s: len(v) for s, v in strata.items()})
print(sorted(os.listdir(D + 'shards')))
