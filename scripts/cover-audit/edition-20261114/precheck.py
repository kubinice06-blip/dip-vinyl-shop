#!/usr/bin/env python3
"""套用前回讀：python3 -I precheck.py <batch>  —— 逐筆 GET Firestore card_catalog，現值跟 changes.json 的 from 不同就剔除（有人改過，不蓋）。
同時用 HEAD/GET 確認新網址 200 且是圖片。輸出 apply/<batch>/patches-ok.json、changes-ok.json、precheck.txt"""
import json, sys, os, ssl, urllib.request, urllib.parse, concurrent.futures as cf
HERE = os.path.dirname(os.path.abspath(__file__)); B = sys.argv[1]; D = os.path.join(HERE, 'apply', B)
CTX = ssl.create_default_context(cafile='/root/.ccr/ca-bundle.crt')
KEY = 'AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg'
BASE = 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents/card_catalog/'
ch = json.load(open(os.path.join(D, 'changes.json'), encoding='utf-8'))
pa = {p['docId']: p for p in json.load(open(os.path.join(D, 'patches.json'), encoding='utf-8'))}
def live(c):
    try:
        u = BASE + urllib.parse.quote(c['key'], safe='') + '?key=' + KEY + '&mask.fieldPaths=coverUrl'
        j = json.load(urllib.request.urlopen(u, context=CTX, timeout=30))
        cur = j.get('fields', {}).get('coverUrl', {}).get('stringValue')
    except Exception as e:
        return c, 'firestore-error ' + str(e)[:80]
    if cur != c['from']:
        return c, f'changed-live ({cur})'
    err = ''
    for t in range(4):
        try:
            req = urllib.request.Request(c['to'], headers={'User-Agent': 'dip-vinyl-cover-audit/1.0 (+https://dipvinyl.tw)'})
            r = urllib.request.urlopen(req, context=CTX, timeout=60)
            ct = r.headers.get('Content-Type', ''); r.read(64)
            if r.status != 200 or 'image' not in ct:
                return c, f'bad-image {r.status} {ct}'
            return c, 'ok'
        except Exception as e:
            err = str(e)[:80]; __import__('time').sleep(3 * (t + 1))
    return c, 'image-error ' + err
ok, bad = [], []
with cf.ThreadPoolExecutor(3) as ex:
    for c, st in ex.map(live, ch):
        (ok if st == 'ok' else bad).append((c, st))
json.dump([pa[c['key']] for c, _ in ok], open(os.path.join(D, 'patches-ok.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
json.dump([c for c, _ in ok], open(os.path.join(D, 'changes-ok.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
open(os.path.join(D, 'precheck.txt'), 'w').write('\n'.join(f'{c["key"]}\t{st}' for c, st in bad))
print(f'{B}: ok {len(ok)}, skipped {len(bad)}'); [print('  ', c['key'], st) for c, st in bad]
