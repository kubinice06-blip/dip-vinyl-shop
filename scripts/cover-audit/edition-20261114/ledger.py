#!/usr/bin/env python3
"""總帳：python3 -I ledger.py verify <prefix> <runId>
讀 verify/<prefix>-rows.json 與 workflow journal（兩個角度：design／quality），
兩票都 confirm → 寫進 ledger.json（key＝card_catalog docId）；任一票 refute → retry/<prefix>.json（附審查意見）。
python3 -I ledger.py journal <runId>  → 印出 journal 合併結果（除錯用）
"""
import json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
WF = '/root/.claude/projects/-home-user/0cb9c446-f7b7-54da-aec5-391b7122398a/subagents/workflows'


def journal(run):
    lab, out = {}, []
    lines = [json.loads(l) for l in open(os.path.join(WF, run, 'journal.jsonl'))]
    for o in lines:
        if o.get('type') == 'started':
            lab[o['key']] = o.get('label', '')
    for o in lines:
        if o.get('type') == 'result':
            v = o.get('result'); v = json.loads(v) if isinstance(v, str) else v
            out.append((lab.get(o['key'], ''), v))
    return out


cmd = sys.argv[1]
if cmd == 'journal':
    for lab, v in journal(sys.argv[2]):
        print(lab, json.dumps(v, ensure_ascii=False)[:300])
    sys.exit()
P, run = sys.argv[2], sys.argv[3]
rows = {r['idx']: r for r in json.load(open(os.path.join(HERE, 'verify', f'{P}-rows.json'), encoding='utf-8'))}
votes = {}
for lab, v in journal(run):
    lens = lab.split(':')[0]
    for it in (v or {}).get('items', []):
        prev = votes.setdefault(it['idx'], {}).get(lens)
        if prev is None or it['verdict'] == 'refute':   # 同一角度有多票時，任一票否決就算否決
            votes[it['idx']][lens] = it
LP = os.path.join(HERE, 'ledger.json')
ledger = json.load(open(LP, encoding='utf-8')) if os.path.exists(LP) else {}
os.makedirs(os.path.join(HERE, 'retry'), exist_ok=True)
retry, ok, missing = [], 0, []
for idx, r in rows.items():
    vv = votes.get(idx, {})
    if set(vv) != {'design', 'quality'}:
        missing.append(idx); continue
    if all(x['verdict'] == 'confirm' for x in vv.values()):
        ledger[r['key']] = {'title': r['title'], 'new': r['new'], 'decision': r['decision'], 'votes': vv, 'batch': P}
        ok += 1
    else:
        retry.append({'idx': idx, 'key': r['key'], 'title': r['title'], 'tried': r['new'], 'votes': vv, 'decision': r['decision']})
json.dump(ledger, open(LP, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
json.dump(retry, open(os.path.join(HERE, 'retry', f'{P}.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
print(f'{P}: confirmed {ok}, retry {len(retry)}, missing votes {missing}; ledger total {len(ledger)}')
