#!/usr/bin/env python3
"""套用前縮圖：python3 -I thumbs-sheet.py <batch> → apply/<batch>/thumbs-NN.jpg（每格 舊｜新，每張 40 格）"""
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sheet import fetch, path_of, F12
from PIL import Image, ImageDraw
import concurrent.futures as cf
HERE = os.path.dirname(os.path.abspath(__file__)); D = os.path.join(HERE, 'apply', sys.argv[1])
ch = json.load(open(os.path.join(D, 'changes-ok.json'), encoding='utf-8'))
view = lambda u: u.replace('/front-1200', '/front-250').replace('-1200.jpg', '-250.jpg') if 'coverartarchive' in u else u
urls = {view(c['from']) for c in ch} | {view(c['to']) for c in ch}
with cf.ThreadPoolExecutor(12) as ex: list(ex.map(fetch, urls))
T = 130; CW = 2 * T + 16; CH = T + 34; COLS = 4; PER = 40
for s in range(0, len(ch), PER):
    part = ch[s:s + PER]; rows = (len(part) + COLS - 1) // COLS
    img = Image.new('RGB', (COLS * CW + 8, rows * CH + 8), (250, 250, 247)); d = ImageDraw.Draw(img)
    for k, c in enumerate(part):
        x = 6 + (k % COLS) * CW; y = 6 + (k // COLS) * CH
        for j, u in enumerate([view(c['from']), view(c['to'])]):
            p = path_of(u); xx = x + j * (T + 4)
            if os.path.exists(p):
                th = Image.open(p); th.thumbnail((T, T)); img.paste(th, (xx, y))
            else: d.rectangle([xx, y, xx + T, y + T], outline=(200, 0, 0)); d.text((xx + 4, y + 50), 'NO IMG', fill=(200, 0, 0), font=F12)
        d.text((x, y + T + 2), f"[{s + k}] {c['artist']}《{c['album']}》"[:40], fill=(0, 0, 0), font=F12)
        d.text((x, y + T + 17), f"{c['source']} {c['year']}", fill=(60, 60, 140), font=F12)
    img.save(os.path.join(D, f'thumbs-{s // PER:02d}.jpg'), quality=85)
print(len(ch), 'pairs')
