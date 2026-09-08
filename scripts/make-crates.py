#!/usr/bin/env python3
"""畫唱片行的兩種箱子（去背 PNG），給 trace-shop-art.py 的 PROPS 用。

依店主提供的實店照片：
  · 桌上＝**木箱**（淺色櫸木、長方形、開口朝上），唱片立著塞滿、露出上緣，
    夾雜幾張比較高的白色分類卡（PROGRESSIVE ROCK、PINK FLOYD…）。
  · 桌下＝**黑色塑膠籃**（側面有格柵），一樣塞滿唱片。
兩種都是方塊與直線，程式畫得好；重點是**同方向、貼齊排一列**，不要斜擺。

尺度沿用 scripts/make-table.py 的換算：5.5 原圖 px / cm。

    python3 scripts/make-crates.py
"""
import os, random
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'art', 'props')
os.makedirs(OUT, exist_ok=True)
random.seed(20260908)

PX_CM = 5.5
INK = (58, 36, 22)
F_BOLD = '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'

SLEEVE = [(188,42,52),(36,88,158),(226,216,192),(232,190,86),(52,118,84),
          (98,64,146),(212,128,44),(64,166,186),(34,32,34),(132,84,44),
          (238,234,226),(96,94,98),(198,96,124),(58,62,132),(164,168,66),
          (150,150,152),(74,52,38),(206,178,140)]


COVERS = os.path.join(ROOT, 'art', 'covers')


LP_CM = 31.5                             # LP 封面永遠是 31.5cm 見方
LP_PX = int(LP_CM * PX_CM)               # → 173 原圖 px


def face_out(im, x, y, w, h, n=None, label_every=5, step_px=34):
    """箱子裡的唱片：**封面朝外**、一張疊一張往後倒（用 art/covers 的真封面）。
    只有露在箱口以上的部分看得到，下半截被箱身蓋住。

    **封面尺寸固定 LP_PX，不跟著箱子大小縮放**——一度讓木箱裡的唱片變 26cm、
    黑籃裡的變 19cm，同一個畫面裡兩種大小，一眼就看得出來不對。
    h 只決定「露出箱口多高」，不決定唱片多大。"""
    pool = sorted(p for p in os.listdir(COVERS) if p.endswith('.jpg')) \
        if os.path.isdir(COVERS) else []
    d = ImageDraw.Draw(im)
    if not pool:
        sleeves(d, x, y, w, h, n, label_every); return
    size = LP_PX                             # 封面是方的，下半截藏在箱子裡
    pad = int(h * .5)                        # 上方留給比較高的分類卡
    layer = Image.new('RGBA', (w, size + pad), (0, 0, 0, 0))   # 先畫在暫存層，再裁齊箱口
    ld = ImageDraw.Draw(layer)
    step = step_px                           # 每張露出的寬度（＝翻片時看到的厚度感）
    n = n or max(2, int((w - size * .42) / step) + 1)
    picks = [random.choice(pool) for _ in range(n)]
    for i in range(n - 1, -1, -1):           # 由後往前畫，前面那張蓋住後面
        cx, ly = int(i * step), pad + int((n - 1 - i) * 1.1)
        cv = Image.open(os.path.join(COVERS, picks[i])).convert('RGB').resize(
            (size, size), Image.LANCZOS)
        k = 0.60 + (1 - i / max(1, n - 1)) * 0.40          # 越後面越暗
        cv = Image.fromarray(
            np.clip(np.asarray(cv, np.float32) * k, 0, 255).astype(np.uint8), 'RGB')
        layer.paste(cv, (cx, ly))
        ld = ImageDraw.Draw(layer)
        ld.rectangle([cx, ly, cx + size - 1, ly + size - 1], outline=(26, 22, 20))
        ld.line([(cx + size - 1, ly), (cx + size - 1, ly + size - 1)], fill=(12, 10, 10),
                width=2)
        if i % label_every == 2:             # 分類卡：比唱片高一截
            lh, lw = int(h * .40), int(step) + 4
            ld.rectangle([cx - 2, ly - lh, cx + lw, ly + 4], fill=(246, 244, 238),
                         outline=(150, 148, 142))
            f = ImageFont.truetype(F_BOLD, max(7, int(lh * .46)))
            ld.text((cx + lw / 2, ly - lh + 3),
                    random.choice(['ROCK', 'SOUL', 'JAZZ', 'CITY']), font=f,
                    fill=(60, 58, 56), anchor='ma')
    im.alpha_composite(layer, (int(x), int(y - pad)))


def sleeves(d, x, y, w, h, n, label_every=7):
    """一排立著的唱片：逐張畫，偶爾插一張比較高的白色分類卡。"""
    sw = w / n
    for i in range(n):
        c = random.choice(SLEEVE)
        sx = x + i * sw
        lean = random.uniform(-1.2, 1.2)
        top = y + random.uniform(0, 3)
        d.polygon([(sx + lean, top), (sx + sw * .88 + lean, top - random.uniform(0, 2)),
                   (sx + sw * .88, y + h), (sx, y + h)], fill=c)
        d.line([(sx + lean, top), (sx, y + h)], fill=tuple(min(255, int(v*1.35)) for v in c))
        d.line([(sx + sw * .88 + lean, top), (sx + sw * .88, y + h)],
               fill=tuple(int(v*.55) for v in c))
        if i % label_every == 3:                        # 分類卡：比唱片高一截
            lh = random.uniform(10, 18)
            d.rectangle([sx - 1, top - lh, sx + sw * .95, top + 4], fill=(244, 242, 236),
                        outline=(150, 148, 142))
            f = ImageFont.truetype(F_BOLD, max(6, int(lh * .5)))
            d.text((sx + sw * .45, top - lh + 2), random.choice(['ROCK', 'SOUL', 'JAZZ', 'CITY']),
                   font=f, fill=(60, 58, 56), anchor='ma')


WOOD_LABELS = ['PROGRESSIVE ROCK', 'SOUL / FUNK', 'CITY POP', 'JAZZ 500',
               'NEW ARRIVALS', 'PINK FLOYD']


def wood_crate(w_cm=68, h_cm=30, label='PROGRESSIVE ROCK'):
    """桌上的木箱：淺色櫸木、開口朝上，唱片露出上緣。"""
    W, H = int(w_cm * PX_CM), int((h_cm + 14) * PX_CM)
    im = Image.new('RGBA', (W + 8, H + 8), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    x0, x1 = 4, W + 4
    rim = int(14 * PX_CM)                               # 唱片露出箱口的高度
    body_top = rim + int(6 * PX_CM)
    body_bot = H + 4
    face_out(im, x0 + 6, rim - int(9 * PX_CM), W - 12, int(13 * PX_CM))
    d = ImageDraw.Draw(im)
    # 箱身（前板）
    d.rectangle([x0, body_top, x1, body_bot], fill=(214, 176, 118), outline=INK)
    for gy in range(body_top + 4, body_bot - 2, 9):     # 木紋
        d.line([(x0 + 3, gy), (x1 - 3, gy)], fill=(224, 188, 132))
    d.rectangle([x0, body_top, x1, body_top + int(3.5 * PX_CM)], fill=(228, 194, 138),
                outline=INK)                            # 前緣上沿（受光）
    d.line([(x0 + 2, body_bot - 3), (x1 - 2, body_bot - 3)], fill=(160, 122, 70), width=3)
    d.rectangle([x0, body_top, x0 + int(2.4 * PX_CM), body_bot], fill=(196, 158, 102),
                outline=INK)                            # 左右側板
    d.rectangle([x1 - int(2.4 * PX_CM), body_top, x1, body_bot], fill=(178, 140, 88),
                outline=INK)
    # 正面的分類牌（照片裡每個木箱前緣都插一張）
    lw, lh = int(w_cm * .62 * PX_CM), int(7.5 * PX_CM)
    lx0 = x0 + (W - lw) // 2
    ly0 = body_top + int(9 * PX_CM)
    d.rectangle([lx0, ly0, lx0 + lw, ly0 + lh], fill=(246, 244, 238), outline=(120, 100, 76))
    d.rectangle([lx0 + 2, ly0 + 2, lx0 + lw - 2, ly0 + lh - 2], outline=(196, 190, 180))
    f = ImageFont.truetype(F_BOLD, max(8, int(lh * .46)))
    while f.getlength(label) > lw - 12 and f.size > 7:
        f = ImageFont.truetype(F_BOLD, f.size - 1)
    d.text((lx0 + lw / 2, ly0 + lh * .27), label, font=f, fill=(48, 46, 44), anchor='ma')
    return im


def black_crate(w_cm=46, h_cm=30):
    """桌下的黑色塑膠籃：側面格柵，唱片塞滿。"""
    W, H = int(w_cm * PX_CM), int((h_cm + 10) * PX_CM)
    im = Image.new('RGBA', (W + 8, H + 8), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    x0, x1 = 4, W + 4
    rim = int(10 * PX_CM)
    body_top, body_bot = rim + int(4 * PX_CM), H + 4
    face_out(im, x0 + 5, rim - int(6.5 * PX_CM), W - 10, int(9.5 * PX_CM),
             label_every=7, step_px=30)
    d = ImageDraw.Draw(im)
    d.rectangle([x0, body_top, x1, body_bot], fill=(38, 38, 40), outline=(16, 16, 18))
    d.rectangle([x0, body_top, x1, body_top + 8], fill=(84, 84, 88))     # 籃口
    gy0, gy1 = body_top + 13, body_bot - 12
    gw, gh = x1 - x0 - 12, gy1 - gy0                                     # 菱形格柵
    mesh = Image.new('RGBA', (gw, gh), (0, 0, 0, 0))
    md = ImageDraw.Draw(mesh)
    for gx in range(-gh, gw + gh, 17):
        md.line([(gx, 0), (gx + gh, gh)], fill=(74, 74, 80), width=3)
        md.line([(gx + gh, 0), (gx, gh)], fill=(74, 74, 80), width=3)
    im.alpha_composite(mesh, (x0 + 6, gy0))
    d = ImageDraw.Draw(im)
    d.rectangle([x0, gy0 - 4, x1, gy0], fill=(22, 22, 24))
    d.rectangle([x0, gy1, x1, gy1 + 4], fill=(22, 22, 24))
    d.rectangle([x0, body_top, x1, body_bot], outline=(14, 14, 16), width=3)
    d.rectangle([x0, body_bot - 8, x1, body_bot], fill=(20, 20, 22), outline=(12, 12, 14))
    return im


def counter_crate(w_cm=50, label='NEW ARRIVALS'):
    """櫃檯／桌面用的小木箱：比賣場的木箱窄，放得進櫃檯的空檔。"""
    return wood_crate(w_cm=w_cm, h_cm=26, label=label)


def main():
    # 同一張圖重複貼三次會看出內容一模一樣，所以各出幾個變體
    outs = [('crate-wood', wood_crate(label='PROGRESSIVE ROCK')),
            ('crate-wood-2', wood_crate(label='SOUL / FUNK')),
            ('crate-black', black_crate()),
            ('crate-black-2', black_crate()),
            ('crate-black-3', black_crate()),
            ('crate-new', counter_crate(36, 'NEW ARRIVALS')),
            ('crate-new-wide', wood_crate(68, label='NEW ARRIVALS'))]
    for name, im in outs:
        p = os.path.join(OUT, name + '.png')
        im.save(p, optimize=True)
        print(f'  {p}  {im.size}  ≒ {im.width/PX_CM:.0f}×{im.height/PX_CM:.0f} cm')


if __name__ == '__main__':
    main()
