#!/usr/bin/env python3
# 硬蕊度音量下限第二輪（grunge／alt-rock／emo／post-punk／噪音型 indie-rock）工作清單。
#   A 類：帶 rock/indie-alt/{alt-rock,emo,indie-rock} 或 rock/punk-wave/post-punk、硬蕊度 ≤2。
#   D 類：只帶 rock/indie-alt/art-exp（噪音搖滾常落這裡）、硬蕊度 ≤2。
#   第一輪已改過（applied changed=true）的跳過；第一輪判 keep 的照收（本輪範圍更寬）。
# 用法：python3 batch-progress/rerate-20261104-loud-r2/build-worklist.py
import json, os
D = 'batch-progress/rerate-20261104-loud-r2/'
sg = json.load(open('card-subgenres.json')); seed = json.load(open('seed_cards.json'))
r1 = {x['key'] for x in json.load(open('batch-progress/rerate-20261104-loud/applied.json')) if x['changed']}
S = {'rock/indie-alt/alt-rock', 'rock/indie-alt/emo', 'rock/punk-wave/post-punk', 'rock/indie-alt/indie-rock'}
items = []
for r in seed:
    k = r[0] + '|' + r[1]; t = sg.get(k, []); ts = set(t)
    if r[4] > 2 or k in r1: continue
    cls = 'A' if ts & S else 'D' if 'rock/indie-alt/art-exp' in ts else None
    if not cls: continue
    items.append({'key': k, 'artist': r[0], 'album': r[1], 'year': r[6] if len(r) > 6 else None,
                  'tier': r[8] if len(r) > 8 else None, 'class': cls, 'tagFloor': 3,
                  'tags': t, 'cur': {'classic': r[2], 'obscurity': r[3], 'accessibility': r[4]}})
# 依藝人排序，同藝人落同片，判定才一致
items.sort(key=lambda x: (x['artist'].lower(), x['album'].lower()))
N = 145
for f in os.listdir(D + 'shards'): os.remove(D + 'shards/' + f)
chunks, cur = [], []
for j, x in enumerate(items):
    if len(cur) >= N and x['artist'] != items[j - 1]['artist']: chunks.append(cur); cur = []
    cur.append(x)
chunks.append(cur)
for i, c in enumerate(chunks): json.dump(c, open(f'{D}shards/s{i + 1:02d}.json', 'w'), ensure_ascii=False, indent=0)
from collections import Counter
print(len(items), Counter(x['class'] for x in items), 'shards', [len(c) for c in chunks], 'apex', sum(1 for x in items if x['tier']))
