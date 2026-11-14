#!/usr/bin/env python3
"""找圖結果 → decisions 格式：python3 -I src2dec.py <runId> <out.json>"""
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
WF = '/root/.claude/projects/-home-user/0cb9c446-f7b7-54da-aec5-391b7122398a/subagents/workflows'
out = {}
for l in open(os.path.join(WF, sys.argv[1], 'journal.jsonl')):
    o = json.loads(l)
    if o.get('type') != 'result': continue
    v = o['result']; v = json.loads(v) if isinstance(v, str) else v
    for it in (v or {}).get('items', []):
        out[str(it['idx'])] = {**it, 'decision': 'replace' if it.get('found') and it.get('url') else 'none', 'choice': ''}
json.dump(out, open(sys.argv[2], 'w', encoding='utf-8'), ensure_ascii=False)
print(len(out), sum(1 for v in out.values() if v['decision'] == 'replace'), 'found')
