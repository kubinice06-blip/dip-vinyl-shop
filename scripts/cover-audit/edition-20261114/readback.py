#!/usr/bin/env python3
"""寫入後回讀＋記 applied：python3 -I readback.py <batch>"""
import json, sys, os, ssl, urllib.request, urllib.parse, concurrent.futures as cf
HERE = os.path.dirname(os.path.abspath(__file__)); B = sys.argv[1]
CTX = ssl.create_default_context(cafile='/root/.ccr/ca-bundle.crt')
ch = json.load(open(os.path.join(HERE, 'apply', B, 'changes-ok.json'), encoding='utf-8'))
def rb(c):
    u = 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents/card_catalog/' + urllib.parse.quote(c['key'], safe='') + '?key=AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg&mask.fieldPaths=coverUrl'
    return c, json.load(urllib.request.urlopen(u, context=CTX, timeout=30))['fields']['coverUrl']['stringValue']
bad = 0
with cf.ThreadPoolExecutor(6) as ex:
    for c, cur in ex.map(rb, ch):
        if cur != c['to']: bad += 1; print('MISMATCH', c['key'])
ap = json.load(open(os.path.join(HERE, 'applied.json')))
for c in ch: ap[c['key']] = {'batch': B, 'to': c['to']}
json.dump(ap, open(os.path.join(HERE, 'applied.json'), 'w'), ensure_ascii=False)
print(f'{B}: readback ok {len(ch) - bad}/{len(ch)}; applied total {len(ap)}')
