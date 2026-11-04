#!/usr/bin/env python3
# 硬蕊度音量下限重評（2026-11-04 店主定案）工作清單。
#   A 類：card-subgenres 帶範圍標籤、現行硬蕊度低於該標籤下限 → 代理判「整張是否以失真／快速／嘶吼為主」。
#   B 類（篩選）：只標 rock/punk-wave 母類、或 rock/jrock-asia 且無範圍標籤、硬蕊度 ≤3 → 代理先判是否屬範圍曲風。
#   C 類：無標籤但明顯是 hardcore 的分輯（主線手挑）。
# 用法：python3 batch-progress/rerate-20261104-loud/build-worklist.py
import json, os
D = 'batch-progress/rerate-20261104-loud/'
sg = json.load(open('card-subgenres.json')); seed = json.load(open('seed_cards.json'))
F3 = {'rock/punk-wave/punk', 'rock/punk-wave/pop-punk', 'rock/punk-wave/garage', 'rock/punk-wave/no-wave',
      'rock/punk-wave/industrial', 'rock/metal', 'rock/metal/trad', 'rock/metal/alt-metal', 'rock/metal/doom',
      'rock/metal/prog-metal', 'rock/dream-post/shoegaze', 'electronic/industrial/industrial-rock'}
F4 = {'rock/punk-wave/hardcore', 'rock/metal/thrash', 'rock/metal/death', 'rock/metal/black',
      'electronic/industrial/power-electronics'}
F5 = {'electronic/noise/harsh'}
C = {'Sheer Terror|Just Can\'t Hate Enough', 'Crown of Thornz|Train Yard Blues',
     'Alone in a Crowd / Inside Out|Alone in a Crowd / Inside Out', 'Turning Point / No Escape|Split',
     'snapcase vs boysetsfire|snapcase vs boysetsfire'}
items = []
for r in seed:
    k = r[0] + '|' + r[1]; t = sg.get(k, []); ts = set(t)
    fl = 5 if ts & F5 else 4 if ts & F4 else 3 if ts & F3 else 0
    cls = None
    if fl and r[4] < fl: cls = 'A'
    elif k in C and r[4] < 4: cls, fl = 'C', 4
    elif not fl and r[4] <= 3 and (('rock/punk-wave' in ts and not any(x.startswith('rock/punk-wave/') for x in ts)) or 'rock/jrock-asia' in ts):
        cls = 'B'
    if not cls: continue
    items.append({'key': k, 'artist': r[0], 'album': r[1], 'year': r[6] if len(r) > 6 else None,
                  'tier': r[8] if len(r) > 8 else None, 'class': cls, 'tagFloor': fl or None,
                  'tags': t, 'cur': {'classic': r[2], 'obscurity': r[3], 'accessibility': r[4]}})
items.sort(key=lambda x: (x['class'], x['key'].lower()))
N = 150
for f in os.listdir(D + 'shards'): os.remove(D + 'shards/' + f)
for i in range(0, len(items), N):
    json.dump(items[i:i + N], open(f'{D}shards/s{i // N + 1:02d}.json', 'w'), ensure_ascii=False, indent=0)
from collections import Counter
print(len(items), Counter(x['class'] for x in items), 'shards', (len(items) + N - 1) // N, 'apex', sum(1 for x in items if x['tier']))
