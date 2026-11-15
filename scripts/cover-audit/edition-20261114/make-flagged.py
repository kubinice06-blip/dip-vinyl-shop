#!/usr/bin/env python3
"""pair-flags.json → build-decide 的 flagged 清單：python3 -I make-flagged.py <pairPrefix>[,<pairPrefix>…] <out.json>
只收 dg versions 與 MB browse 都抓好的（沒抓好的印出來，等 worker）。"""
import json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
P = set(sys.argv[1].split(','))
fl = json.load(open(os.path.join(HERE, 'pair-flags.json'), encoding='utf-8'))
dgc = json.load(open(os.path.join(HERE, 'dg-cache.json')))
prep = json.load(open(os.path.join(HERE, 'prep.json')))
out, wait = [], []
for k, v in fl.items():
    if v.get('prefix') not in P: continue
    ok = ('vdone:' + k) in dgc and (prep.get(k) or {}).get('mb') is not None
    if not ok: wait.append(k); continue
    out.append({'key': k, 'title': v['title'], 'now': v['now'], 'reason': f"{v['verdict']}：{v.get('note', '')}", 'src': v['prefix']})
json.dump(out, open(sys.argv[2], 'w', encoding='utf-8'), ensure_ascii=False)
print(len(out), 'ready;', len(wait), 'waiting')
