#!/usr/bin/env python3
"""放大對照：python3 -I compare.py <items.json> <out.jpg> <idx> [idx ...]
   或：python3 -I compare.py --rows <rows.json> <out.jpg>（rows＝[{idx,title,lines,cands:[{tag,url,note}]}]）
每個 idx 一列，候選圖 300px 並排（NOW／ALT／DG／WP…），標題＋各候選的 tag/note。
items.json 與 sheet.py 同格式；縮圖快取共用 thumbs/（沒有就現抓）。
"""
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sheet import fetch, path_of, wrap, F14, F12, F18  # noqa
from PIL import Image, ImageDraw

if sys.argv[1] == '--rows':
    rows = json.load(open(sys.argv[2], encoding='utf-8')); out = sys.argv[3]
    idxs = [r.get('idx', i) for i, r in enumerate(rows)]
else:
    items = json.load(open(sys.argv[1], encoding='utf-8'))
    out = sys.argv[2]
    idxs = [int(x) for x in sys.argv[3:]]
    rows = [items[i] for i in idxs]
for it in rows:
    for c in it['cands']:
        if c.get('url'):
            fetch(c['url'])
T = 300
NC = max(len(it['cands']) for it in rows)
W = NC * (T + 12) + 12
RH = T + 120
img = Image.new('RGB', (W, RH * len(rows) + 8), (250, 250, 247))
d = ImageDraw.Draw(img)
for r, (i, it) in enumerate(zip(idxs, rows)):
    y = r * RH + 6
    yy = y
    for ln in wrap(f"[{i}] {it['title']}", F18, W - 20, d)[:2]:
        d.text((8, yy), ln, fill=(0, 0, 0), font=F18); yy += 21
    for line in it.get('lines', [])[:2]:
        d.text((8, yy), line[:150], fill=(70, 70, 70), font=F12); yy += 15
    for ci, c in enumerate(it['cands']):
        x = 8 + ci * (T + 12)
        p = path_of(c['url']) if c.get('url') else None
        if p and os.path.exists(p):
            th = Image.open(p); img.paste(th, (x + (T - th.width) // 2, yy + 4))
        else:
            d.rectangle([x, yy + 4, x + T, yy + 4 + T], outline=(200, 0, 0)); d.text((x + 8, yy + T // 2), 'NO IMAGE', fill=(200, 0, 0), font=F14)
        d.text((x + 2, yy + T + 6), c['tag'] + ('  ' + c.get('note', '')[:28] if c.get('note') else ''), fill=(0, 0, 170), font=F14)
img.save(out, quality=88)
print(out)
