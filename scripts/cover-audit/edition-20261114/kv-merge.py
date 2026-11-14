#!/usr/bin/env python3
"""KV cover6 合併：python3 -I kv-merge.py <batch>  讀 apply/<batch>/kv-get.json（wrangler kv bulk get 的輸出）與 changes-ok.json，
只換 imageUrl／coverSource、加 coverFix，其他欄位（spotifyUrl、rgMbid…）原樣保留；KV 沒有這個鍵的不新增（主站讀 catalog 為主）。
輸出 apply/<batch>/kv-put.json（wrangler kv bulk put 格式）"""
import json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__)); B = sys.argv[1]; D = os.path.join(HERE, 'apply', B)
sm = json.load(open(os.path.join(HERE, 'seedmap.json'), encoding='utf-8'))
got = json.load(open(os.path.join(D, 'kv-get.json'), encoding='utf-8'))
if isinstance(got, list):
    got = {x['key']: x.get('value') for x in got}
out, miss = [], 0
for c in json.load(open(os.path.join(D, 'changes-ok.json'), encoding='utf-8')):
    s = sm[c['key']]; k = f"cover6:{s['artist'].lower()}|{s['album'].lower()}"
    v = got.get(k)
    if v in (None, '', 'null'):
        miss += 1; continue
    o = json.loads(v) if isinstance(v, str) else v
    if not isinstance(o, dict):
        miss += 1; continue
    o['imageUrl'] = c['to']; o['coverSource'] = {'caa': 'coverartarchive'}.get(c['source'], c['source']); o['coverFix'] = 'edition-20261114'
    out.append({'key': k, 'value': json.dumps(o, ensure_ascii=False)})
json.dump(out, open(os.path.join(D, 'kv-put.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print(f'{B}: kv put {len(out)}, not in KV {miss}')
