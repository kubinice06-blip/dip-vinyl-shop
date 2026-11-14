#!/usr/bin/env python3
"""把 verify-build 缺的 Discogs 資料排進 dg-worker（p=0）：python3 -I queue-pending.py <prefix>"""
import json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
pend = json.load(open(os.path.join(HERE, 'verify', f'{sys.argv[1]}-pending.json')))
t = []
for p in pend:
    if p.get('master'): t.append({'t': 'master', 'id': p['master'], 'p': 0})
    elif p.get('release') and not p.get('why'): t.append({'t': 'release', 'id': p['release'], 'p': 0})
open(os.path.join(HERE, 'dg-tasks.jsonl'), 'a').write(''.join(json.dumps(x) + '\n' for x in t))
print(len(t), 'queued')
