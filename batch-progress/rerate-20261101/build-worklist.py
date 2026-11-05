#!/usr/bin/env python3
# 三軸重評工作清單：情緒薄格（md/mc/ml）、Spotify 補卡（sf）、鐵幕爵士（eb）三條線的全部卡，
# 附目前三軸、listeners、研究層事實，切成 shards/*.json。用法：python3 batch-progress/rerate-20261101/build-worklist.py
import json, glob, re, os, collections
D = 'batch-progress/rerate-20261101/'
seed = json.load(open('seed_cards.json'))
rows = seed if isinstance(seed, list) else seed.get('cards')
idx = {(r[0], r[1]): r for r in rows if isinstance(r, list)}
facts = {}
for f in glob.glob('desc-tools/batches/research/add-2026*.json'):
    try: j = json.load(open(f))
    except Exception: continue
    for e in (j if isinstance(j, list) else []):
        if isinstance(e, dict) and e.get('artist'):
            facts[(e['artist'], e.get('album'))] = [x.get('f', '') for x in e.get('facts', []) if isinstance(x, dict)]
items, seen = [], set()
for f in sorted(glob.glob('onboarding-manifest-add-202610*.json') + glob.glob('onboarding-manifest-add-202611*.json')):
    m = re.search(r'-(md\d+|mc\d+|ml\d+|sf\d+|eb\d+)-', f)
    if not m: continue
    b = m.group(1); line = {'md': 'mood', 'mc': 'mood', 'ml': 'mood', 'sf': 'spotify', 'eb': 'eastbloc'}[b[:2]]
    man = json.load(open(f))
    for a in man.get('albums') or man.get('cards') or []:
        k = (a['artist'], a['album'])
        r = idx.get(k)
        if not r or k in seen: continue
        seen.add(k)
        rt = a.get('ratings') or {}
        fx = facts.get(k, [])
        items.append({'key': a['artist'] + '|' + a['album'], 'artist': a['artist'], 'album': a['album'],
                      'batch': b, 'line': line, 'year': r[6] if len(r) > 6 else None, 'genres': r[5],
                      'tier': r[8] if len(r) > 8 else None,
                      'cur': {'classic': r[2], 'obscurity': r[3], 'accessibility': r[4]},
                      'listeners': rt.get('listeners'), 'curSource': rt.get('source'),
                      'label': ((a.get('identity') or {}).get('label') or ''),
                      'facts': ' / '.join(fx)[:1400]})
# 依線、批排序後切片，每片約 250 張
items.sort(key=lambda x: (x['line'], x['batch']))
os.makedirs(D + 'shards', exist_ok=True)
N = 250; shards = [items[i:i + N] for i in range(0, len(items), N)]
for i, s in enumerate(shards, 1):
    json.dump(s, open(f'{D}shards/s{i:02d}.json', 'w'), ensure_ascii=False, indent=0)
c = collections.Counter(x['line'] for x in items)
nofacts = sum(1 for x in items if not x['facts'])
print(len(items), dict(c), 'shards', len(shards), 'no facts', nofacts)
for i, s in enumerate(shards, 1): print(f's{i:02d}', len(s), s[0]['batch'], '→', s[-1]['batch'])
