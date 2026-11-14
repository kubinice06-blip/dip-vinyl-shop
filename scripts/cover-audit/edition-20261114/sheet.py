#!/usr/bin/env python3
"""合成看圖對照表。
用法：python3 sheet.py <items.json> <prefix> [每張幾列=8]
items.json：[{key, title, lines:[...], cands:[{tag, url, note}]}]
產出：sheets/<prefix>-NN.jpg、sheets/<prefix>-index.json（每張圖對應哪些 key）
縮圖快取在 thumbs/（sha1(url).jpg；下載失敗記 .fail）
"""
import json, sys, os, hashlib, ssl, urllib.request, concurrent.futures as cf
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
TH = os.path.join(HERE, 'thumbs'); SH = os.path.join(HERE, 'sheets')
os.makedirs(TH, exist_ok=True); os.makedirs(SH, exist_ok=True)
CTX = ssl.create_default_context(cafile='/root/.ccr/ca-bundle.crt')
FONT = '/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc'
F14 = ImageFont.truetype(FONT, 15); F12 = ImageFont.truetype(FONT, 13); F18 = ImageFont.truetype(FONT, 17)
T = 300  # 快取縮圖邊長


def path_of(url):
    return os.path.join(TH, hashlib.sha1(url.encode()).hexdigest() + '.jpg')


def fetch(url):
    p = path_of(url)
    if os.path.exists(p) or os.path.exists(p + '.fail'):
        return
    for _ in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'dip-vinyl-cover-audit/1.0 (+https://dipvinyl.tw)'})
            data = urllib.request.urlopen(req, context=CTX, timeout=40).read()
            im = Image.open(__import__('io').BytesIO(data)).convert('RGB')
            im.thumbnail((T, T))
            im.save(p, quality=88)
            return
        except Exception as e:  # noqa
            err = str(e)
    open(p + '.fail', 'w').write(err)


def wrap(text, font, width, draw):
    out, cur = [], ''
    for ch in text:
        if draw.textlength(cur + ch, font=font) > width:
            out.append(cur); cur = ch
        else:
            cur += ch
    if cur:
        out.append(cur)
    return out


def main():
    items = json.load(open(sys.argv[1], encoding='utf-8'))
    prefix = sys.argv[2]
    per = int(sys.argv[3]) if len(sys.argv) > 3 else 8
    urls = {c['url'] for it in items for c in it['cands'] if c.get('url')}
    with cf.ThreadPoolExecutor(16) as ex:
        list(ex.map(fetch, urls))
    grid = all(len(it['cands']) == 1 for it in items)
    index = {}
    if grid:
        per = per if len(sys.argv) > 3 else 20
        COLS, CW, TT, CH = 4, 292, 262, 262 + 112
        for s in range(0, len(items), per):
            chunk = items[s:s + per]; rows = (len(chunk) + COLS - 1) // COLS
            img = Image.new('RGB', (COLS * CW + 8, rows * CH + 8), (250, 250, 247)); d = ImageDraw.Draw(img)
            for k, it in enumerate(chunk):
                x = 6 + (k % COLS) * CW; y = 6 + (k // COLS) * CH
                c = it['cands'][0]; p = path_of(c['url']) if c.get('url') else None
                if p and os.path.exists(p):
                    th = Image.open(p); th.thumbnail((TT, TT)); img.paste(th, (x + (TT - th.width) // 2, y))
                else:
                    d.rectangle([x, y, x + TT, y + TT], outline=(200, 0, 0)); d.text((x + 8, y + TT // 2), 'NO IMAGE', fill=(200, 0, 0), font=F14)
                yy = y + TT + 3
                for ln in wrap(f"[{s + k}] {it['title']}", F14, CW - 10, d)[:3]:
                    d.text((x, yy), ln, fill=(0, 0, 0), font=F14); yy += 17
                for line in it.get('lines', []):
                    for ln in wrap(line, F12, CW - 10, d)[:2]:
                        if yy > y + CH - 15: break
                        d.text((x, yy), ln, fill=(70, 70, 70), font=F12); yy += 15
            fn = os.path.join(SH, f'{prefix}-{s // per:03d}.jpg'); img.save(fn, quality=86)
            index[fn] = [it['key'] for it in chunk]
    else:
        LW, TT = 300, 212
        NC = min(4, max(len(it['cands']) for it in items))
        W = LW + NC * (TT + 10) + 10; RH = TT + 48
        for s in range(0, len(items), per):
            chunk = items[s:s + per]
            img = Image.new('RGB', (W, RH * len(chunk) + 6), (250, 250, 247)); d = ImageDraw.Draw(img)
            for r, it in enumerate(chunk):
                y = r * RH + 6
                d.line([(0, y - 3), (W, y - 3)], fill=(150, 150, 150), width=2)
                yy = y + 2
                for ln in wrap(f"[{s + r}] {it['title']}", F18, LW - 12, d)[:3]:
                    d.text((6, yy), ln, fill=(0, 0, 0), font=F18); yy += 21
                for line in it.get('lines', []):
                    for ln in wrap(line, F12, LW - 12, d):
                        if yy > y + RH - 16: break
                        d.text((6, yy), ln, fill=(60, 60, 60), font=F12); yy += 15
                for ci, c in enumerate(it['cands'][:4]):
                    x = LW + ci * (TT + 10)
                    p = path_of(c['url']) if c.get('url') else None
                    if p and os.path.exists(p):
                        th = Image.open(p); th.thumbnail((TT, TT)); img.paste(th, (x + (TT - th.width) // 2, y))
                    else:
                        d.rectangle([x, y, x + TT, y + TT], outline=(200, 0, 0)); d.text((x + 8, y + TT // 2), 'NO IMAGE', fill=(200, 0, 0), font=F14)
                    d.text((x + 2, y + TT + 2), c['tag'], fill=(0, 0, 170), font=F14)
                    if c.get('note'):
                        d.text((x + 2, y + TT + 20), c['note'][:30], fill=(70, 70, 70), font=F12)
            fn = os.path.join(SH, f'{prefix}-{s // per:03d}.jpg'); img.save(fn, quality=86)
            index[fn] = [it['key'] for it in chunk]
    json.dump(index, open(os.path.join(SH, f'{prefix}-index.json'), 'w'), ensure_ascii=False, indent=0)
    print(len(index), 'sheets')


if __name__ == '__main__':
    main()
