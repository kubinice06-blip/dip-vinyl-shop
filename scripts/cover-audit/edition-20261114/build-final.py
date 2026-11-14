#!/usr/bin/env python3
"""最後一輪重找：python3 -I build-final.py <decidePrefix> <retry files...> → retry/final-<P>.json＋印出 idx 清單
同一張卡被否決多次就合併（tried 變成清單）；已經進總帳（別條路通過）的跳過。"""
import json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
P = sys.argv[1]
ledger = json.load(open(os.path.join(HERE, 'ledger.json'), encoding='utf-8'))
by = {}
for f in sys.argv[2:]:
    for r in json.load(open(os.path.join(HERE, f), encoding='utf-8')):
        if r['key'] in ledger:
            continue
        e = by.setdefault(r['idx'], {'idx': r['idx'], 'key': r['key'], 'title': r['title'], 'tried': [], 'votes': [], 'decision': r.get('decision')})
        t = r['tried']
        if t.get('url') not in [x.get('url') for x in e['tried']]:
            e['tried'].append(t); e['votes'].append(r['votes'])
out = sorted(by.values(), key=lambda x: x['idx'])
json.dump(out, open(os.path.join(HERE, 'retry', f'final-{P}.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
print(P, len(out), [x['idx'] for x in out])
