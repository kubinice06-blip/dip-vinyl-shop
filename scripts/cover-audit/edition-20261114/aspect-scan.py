#!/usr/bin/env python3
"""已套用＋總帳待套用的新封面長寬比：python3 -I aspect-scan.py → aspect.json（key: [w,h,url]）
網站用 object-fit: cover 裁成正方形；長寬比 > 1.06 的列出來人工看會不會裁到字。"""
import json, os, io, ssl, urllib.request, concurrent.futures as cf
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
CTX = ssl.create_default_context(cafile='/root/.ccr/ca-bundle.crt')
ledger = json.load(open(os.path.join(HERE, 'ledger.json'), encoding='utf-8'))
OUT = os.path.join(HERE, 'aspect.json')
res = json.load(open(OUT)) if os.path.exists(OUT) else {}
def url_of(e):
    n = e['new']; u = n['url']
    if n['source'] == 'caa' and u.endswith('/front'): u += '-1200'
    return u
def size(item):
    k, u = item
    for t in range(3):
        try:
            req = urllib.request.Request(u, headers={'User-Agent': 'dip-vinyl-cover-audit/1.0 (+https://dipvinyl.tw)'})
            r = urllib.request.urlopen(req, context=CTX, timeout=60)
            buf = b''
            while True:
                chunk = r.read(65536)
                if not chunk: break
                buf += chunk
                try:
                    im = Image.open(io.BytesIO(buf)); return k, [im.size[0], im.size[1], u]
                except Exception:
                    continue
            im = Image.open(io.BytesIO(buf)); return k, [im.size[0], im.size[1], u]
        except Exception as e:
            err = str(e)[:60]; __import__('time').sleep(2 * (t + 1))
    return k, [0, 0, u, err]
todo = [(k, url_of(e)) for k, e in ledger.items() if k not in res or res[k][2] != url_of(e) or not res[k][0]]
with cf.ThreadPoolExecutor(6) as ex:
    for i, (k, v) in enumerate(ex.map(size, todo)):
        res[k] = v
        if i % 50 == 0: json.dump(res, open(OUT, 'w'))
json.dump(res, open(OUT, 'w'))
bad = {k: v for k, v in res.items() if v[0] and max(v[0], v[1]) / min(v[0], v[1]) > 1.06}
fail = [k for k, v in res.items() if not v[0]]
print(len(res), 'sized;', len(bad), 'non-square >1.06;', len(fail), 'failed')
for k, v in sorted(bad.items(), key=lambda x: -max(x[1][0], x[1][1]) / min(x[1][0], x[1][1])):
    print(f'  {max(v[0],v[1])/min(v[0],v[1]):.2f} {v[0]}x{v[1]} {k}')
