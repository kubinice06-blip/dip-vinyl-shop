#!/usr/bin/env python3
"""合併分類結果：python3 -I merge-classify.py <out.json> <runId> [runId …]"""
import json, sys, os, collections
WF = '/root/.claude/projects/-home-user/0cb9c446-f7b7-54da-aec5-391b7122398a/subagents/workflows'
by = {}
for run in sys.argv[2:]:
    for l in open(os.path.join(WF, run, 'journal.jsonl')):
        o = json.loads(l)
        if o.get('type') != 'result': continue
        v = o['result']; v = json.loads(v) if isinstance(v, str) else v
        for it in (v or {}).get('items', []): by[str(it['idx'])] = it
json.dump(by, open(sys.argv[1], 'w', encoding='utf-8'), ensure_ascii=False)
print(len(by), collections.Counter(v['verdict'] for v in by.values()))
