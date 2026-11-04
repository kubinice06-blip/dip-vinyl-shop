#!/usr/bin/env python3
# 全池等級分布（頂點卡依 tier 另計，一般卡依公式）。用法：python3 .../pool-dist.py <out.json>
import json, sys, collections
s = json.load(open('seed_cards.json'))
def rar(c, o, a):
    x = c + a + (1 if o >= 5 else 0)
    return 'legendary' if x >= 9 else 'epic' if x >= 8 else 'uncommon' if x >= 7 else 'rare' if x >= 6 else 'common'
d = collections.Counter(); acc = collections.Counter(); rall = collections.Counter()
for r in s:
    t = r[8] if len(r) > 8 else None
    d[t or rar(r[2], r[3], r[4])] += 1; acc[r[4]] += 1; rall[rar(r[2], r[3], r[4])] += 1
json.dump({'tierOrRarity': d, 'accessibility': acc, 'formulaAll': rall, 'n': len(s)}, open(sys.argv[1], 'w'), indent=1)
print(dict(d), dict(sorted(acc.items())))
