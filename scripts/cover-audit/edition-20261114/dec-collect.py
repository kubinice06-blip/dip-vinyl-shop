#!/usr/bin/env python3
"""wf-decide 結果 → decide/<prefix>-decisions.json：python3 -I dec-collect.py <prefix> <runId>"""
import json, sys, os, collections
HERE = os.path.dirname(os.path.abspath(__file__))
WF = '/root/.claude/projects/-home-user/e8f4db3e-763b-5b26-8e0e-1ec78c4054db/subagents/workflows'
P, run = sys.argv[1], sys.argv[2]
out = {}
for l in open(os.path.join(WF, run, 'journal.jsonl')):
    o = json.loads(l)
    if o.get('type') != 'result': continue
    v = o['result']; v = json.loads(v) if isinstance(v, str) else v
    for it in (v or {}).get('items', []): out[str(it['idx'])] = it
n = len(json.load(open(os.path.join(HERE, 'decide', f'{P}-items.json'), encoding='utf-8')))
json.dump(out, open(os.path.join(HERE, 'decide', f'{P}-decisions.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print(P, len(out), '/', n, dict(collections.Counter(x['decision'] for x in out.values())), 'missing', [i for i in range(n) if str(i) not in out][:10])
