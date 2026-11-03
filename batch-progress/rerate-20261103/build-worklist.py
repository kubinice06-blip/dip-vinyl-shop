#!/usr/bin/env python3
# 三軸重評第三輪工作清單：9 月前入庫、沒有評分來源（curSource 缺）的卡，扣掉第一、二輪重評過的，
# 以及全池稽核（audit-20261102）已判過三軸的 3,996 張。listeners 先取 manifest，沒有的由派工階段補 KV。
# 用法：python3 batch-progress/rerate-20261103/build-worklist.py
import json, glob, os
D = 'batch-progress/rerate-20261103/'
seed = json.load(open('seed_cards.json'))
K = lambda r: r[0] + '|' + r[1]
done = {x['key'] for x in json.load(open('batch-progress/rerate-20261101/applied.json'))} | \
       {x['key'] for x in json.load(open('batch-progress/rerate-20261102/applied.json'))}
aud = set()
for f in glob.glob('batch-progress/audit-20261102/shards/*.json'):
    aud |= {x['key'] for x in json.load(open(f))}
src, lst, pv, man = {}, {}, {}, {}
for f in sorted(glob.glob('onboarding-manifest-*.json')):
    try: j = json.load(open(f))
    except Exception: continue
    for a in j.get('albums') or j.get('cards') or []:
        k = (a.get('artist') or '') + '|' + (a.get('album') or '')
        rt = a.get('ratings') or {}
        src.setdefault(k, rt.get('source')); man.setdefault(k, os.path.basename(f))
        pv.setdefault(k, (a.get('preview') or {}).get('status'))
        if isinstance(rt.get('listeners'), (int, float)): lst.setdefault(k, rt['listeners'])
facts = {}
for f in sorted(glob.glob('desc-tools/batches/research/*.json')):
    try: j = json.load(open(f))
    except Exception: continue
    for e in (j if isinstance(j, list) else []):
        if isinstance(e, dict) and e.get('artist'):
            fx = [x.get('f', '') if isinstance(x, dict) else str(x) for x in e.get('facts', [])]
            if fx: facts[e['artist'] + '|' + (e.get('album') or '')] = fx
items = []
for r in seed:
    k = K(r)
    if k in done or k in aud or src.get(k): continue
    items.append({'key': k, 'artist': r[0], 'album': r[1], 'tier': r[8] if len(r) > 8 else None,
                  'year': r[6] if len(r) > 6 else None, 'genres': r[5] if len(r) > 5 else None,
                  'cur': {'classic': r[2], 'obscurity': r[3], 'accessibility': r[4]},
                  'listeners': lst.get(k), 'preview': pv.get(k), 'manifest': man.get(k),
                  'facts': ' / '.join(facts.get(k, []))[:1200]})
items.sort(key=lambda x: x['key'].lower())
os.makedirs(D + 'shards', exist_ok=True)
N = 250
for i in range(0, len(items), N):
    json.dump(items[i:i + N], open(f'{D}shards/s{i // N + 1:02d}.json', 'w'), ensure_ascii=False, indent=0)
print(len(items), 'shards', (len(items) + N - 1) // N, 'apex', sum(1 for x in items if x['tier']),
      'no facts', sum(1 for x in items if not x['facts']), 'with manifest', sum(1 for x in items if x['manifest']))
