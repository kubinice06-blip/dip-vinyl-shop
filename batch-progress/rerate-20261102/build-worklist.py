#!/usr/bin/env python3
# 三軸重評第二輪工作清單：2026-09-01 起入庫（manifest 檔名日期 >= 20260901）、且不在第一輪
# （rerate-20261101/applied.json）裡的卡，附目前三軸、listeners、研究層事實，切成 shards/*.json。
# 用法：python3 batch-progress/rerate-20261102/build-worklist.py
import json, glob, re, os, collections
D = 'batch-progress/rerate-20261102/'
seed = json.load(open('seed_cards.json'))
idx = {(r[0], r[1]): r for r in seed if isinstance(r, list)}
done = {x['key'] for x in json.load(open('batch-progress/rerate-20261101/applied.json'))}
facts = {}
for f in sorted(glob.glob('desc-tools/batches/research/*.json')):
    try: j = json.load(open(f))
    except Exception: continue
    for e in (j if isinstance(j, list) else []):
        if isinstance(e, dict) and e.get('artist'):
            fx = [x.get('f', '') if isinstance(x, dict) else str(x) for x in e.get('facts', [])]
            if fx: facts[(e['artist'], e.get('album'))] = fx
def batch_of(f):
    n = re.sub(r'^onboarding-manifest-', '', os.path.basename(f))
    m = re.match(r'add-\d{8}-([a-z]+\d*)', n)
    if m: return m.group(1)
    return re.sub(r'-?2026\d{4}b?\.json$', '', n)
items, seen = [], set()
for f in sorted(glob.glob('onboarding-manifest-*.json')):
    m = re.search(r'(2026\d{4})b?\.json$', f)
    if not m or m.group(1) < '20260901': continue
    man = json.load(open(f))
    for a in man.get('albums') or man.get('cards') or []:
        k = (a.get('artist'), a.get('album'))
        r = idx.get(k)
        if not r or k in seen or '|'.join(k) in done: continue
        seen.add(k)
        rt = a.get('ratings') or {}
        items.append({'key': k[0] + '|' + k[1], 'artist': k[0], 'album': k[1],
                      'batch': batch_of(f), 'manifest': os.path.basename(f),
                      'year': r[6] if len(r) > 6 else None, 'genres': r[5],
                      'tier': r[8] if len(r) > 8 else None,
                      'cur': {'classic': r[2], 'obscurity': r[3], 'accessibility': r[4]},
                      'listeners': rt.get('listeners'), 'curSource': rt.get('source'),
                      'label': ((a.get('identity') or {}).get('label') or ''),
                      'facts': ' / '.join(facts.get(k, []))[:1400]})
items.sort(key=lambda x: (x['manifest'], x['key']))
os.makedirs(D + 'shards', exist_ok=True)
N = 250; shards = [items[i:i + N] for i in range(0, len(items), N)]
for i, s in enumerate(shards, 1):
    json.dump(s, open(f'{D}shards/s{i:02d}.json', 'w'), ensure_ascii=False, indent=0)
print(len(items), 'shards', len(shards), 'no facts', sum(1 for x in items if not x['facts']),
      'no listeners', sum(1 for x in items if x['listeners'] is None))
for i, s in enumerate(shards, 1): print(f's{i:02d}', len(s), s[0]['batch'], '→', s[-1]['batch'])
