#!/usr/bin/env python3
"""對照結果收集：python3 -I pair-collect.py <prefix> <runId>
把不是 same 的寫進 pair-flags.json（key → {verdict, note, now, title, prefix}），並把它們排進
dg-worker（search+versions，p=1）與 mb-worker（browse，p=1），之後進挑原版。"""
import json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
WF = '/root/.claude/projects/-home-user/0cb9c446-f7b7-54da-aec5-391b7122398a/subagents/workflows'
P, run = sys.argv[1], sys.argv[2]
items = json.load(open(os.path.join(HERE, 'pairs', f'{P}-items.json'), encoding='utf-8'))
sm = json.load(open(os.path.join(HERE, 'seedmap.json'), encoding='utf-8'))
res = {}
for l in open(os.path.join(WF, run, 'journal.jsonl')):
    o = json.loads(l)
    if o.get('type') != 'result': continue
    v = o['result']; v = json.loads(v) if isinstance(v, str) else v
    for it in (v or {}).get('items', []): res[it['idx']] = it
FP = os.path.join(HERE, 'pair-flags.json')
flags = json.load(open(FP, encoding='utf-8')) if os.path.exists(FP) else {}
missing = [i for i in range(len(items)) if i not in res]
new = 0; dg, mb = [], []
for i, it in enumerate(items):
    r = res.get(i)
    if not r or r['verdict'] == 'same': continue
    k = it['key']
    if k not in flags: new += 1
    flags[k] = {'verdict': r['verdict'], 'note': r.get('note', ''), 'now': it['cands'][0]['url'], 'title': it['title'], 'prefix': P}
    s = sm[k]
    dg.append({'t': 'search', 'key': k, 'artist': s['artist'], 'album': s['album'], 'p': 1, 'v': 1})
    mb.append({'t': 'browse', 'key': k, 'p': 1})
json.dump(flags, open(FP, 'w', encoding='utf-8'), ensure_ascii=False)
open(os.path.join(HERE, 'dg-tasks.jsonl'), 'a').write(''.join(json.dumps(t, ensure_ascii=False) + '\n' for t in dg))
open(os.path.join(HERE, 'mb-tasks.jsonl'), 'a').write(''.join(json.dumps(t, ensure_ascii=False) + '\n' for t in mb))
print(f'{P}: results {len(res)}/{len(items)}, flagged new {new}, total flags {len(flags)}, missing {missing[:10]}')
