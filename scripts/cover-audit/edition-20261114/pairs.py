#!/usr/bin/env python3
"""參考圖對照表：python3 -I pairs.py <pairitems.json> <prefix>
pairitems：[{key, title, cands:[{tag:'NOW',url},{tag:'DG',url,note},{tag:'CA',url,note}]}]（參考圖 1–2 張）
每格：NOW＋參考圖並排（160px），下方 [序號] 標題、各參考圖說明。每列 2 格、每張 8 列＝16 格。
產出 pairs/<prefix>-NNN.jpg、pairs/<prefix>-items.json
"""
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sheet import fetch, path_of, wrap, F14, F12  # noqa
from PIL import Image, ImageDraw
import concurrent.futures as cf

HERE = os.path.dirname(os.path.abspath(__file__))
OUTD = os.path.join(HERE, 'pairs'); os.makedirs(OUTD, exist_ok=True)
items = json.load(open(sys.argv[1], encoding='utf-8')); prefix = sys.argv[2]
urls = {c['url'] for it in items for c in it['cands'] if c.get('url')}
with cf.ThreadPoolExecutor(16) as ex:
    list(ex.map(fetch, urls))
T = 160; COLS = 2; CW = 3 * (T + 6) + 24; CH = T + 46; PER = 16
for s in range(0, len(items), PER):
    ch = items[s:s + PER]; rows = (len(ch) + COLS - 1) // COLS
    img = Image.new('RGB', (COLS * CW + 8, rows * CH + 8), (250, 250, 247)); d = ImageDraw.Draw(img)
    for k, it in enumerate(ch):
        x = 6 + (k % COLS) * CW; y = 6 + (k // COLS) * CH
        if k % COLS:
            d.line([(x - 12, y), (x - 12, y + CH - 6)], fill=(170, 170, 170), width=2)
        for ci, c in enumerate(it['cands'][:3]):
            p = path_of(c['url']) if c.get('url') else None
            xx = x + ci * (T + 6)
            if p and os.path.exists(p):
                th = Image.open(p); th.thumbnail((T, T)); img.paste(th, (xx + (T - th.width) // 2, y))
            else:
                d.rectangle([xx, y, xx + T, y + T], outline=(200, 0, 0)); d.text((xx + 6, y + T // 2), 'NO IMAGE', fill=(200, 0, 0), font=F12)
            d.text((xx + 2, y + 2), c['tag'], fill=(255, 255, 255), font=F14, stroke_width=2, stroke_fill=(0, 0, 0))
        d.text((x, y + T + 2), f"[{s + k}] {it['title']}"[:52], fill=(0, 0, 0), font=F14)
        notes = '  '.join(f"{c['tag']}:{c.get('note', '')}" for c in it['cands'][1:3])
        d.text((x, y + T + 21), notes[:70], fill=(60, 60, 140), font=F12)
    img.save(os.path.join(OUTD, f'{prefix}-{s // PER:03d}.jpg'), quality=85)
json.dump(items, open(os.path.join(OUTD, f'{prefix}-items.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print(len(items), 'items', (len(items) + PER - 1) // PER, 'sheets')
