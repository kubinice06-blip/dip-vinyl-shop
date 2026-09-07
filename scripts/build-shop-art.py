#!/usr/bin/env python3
"""唱片行舞台美術產生器（序章 RPG 場景）。

為什麼是腳本產圖：一整面牆的唱片封面、木紋、逐張唱片的書背這種密度，
CSS 漸層畫不出來。改成一次算好幾張 PNG，前台只要疊圖層。
要改陳列就改這支腳本再跑一次。

    python3 scripts/build-shop-art.py

輸出（art/）：
  shop-bg.png          背景層：木板牆、門洞與雨夜街景、牆上 6×4 封面、木地板
  shop-fg.png          前景層（透明底）：櫃檯＋器材、挖寶櫃、紙箱
                       ── 疊在小人「上面」，所以老闆站櫃檯後面會被檯身擋到腰，
                          不會再出現「站在櫃檯上」或「直接跨過櫃檯」。
  shop-door-0/1/2.png  門板三格：關／半開／全開（客人推門進來用）

座標約定（前台站位要跟這裡對齊）：
  · 場景邏輯尺寸 380×320；前台 background-size:100% 100%，站位一律用 %。
  · 牆／地板交界 y=196。地板 y 196–320。
  · 門洞 x 10–74、門檻 y=196。走道（門與櫃檯之間）x 74–138 淨空。
  · 櫃檯 x 138–330、檯面上緣 y=200、檯身下緣 y=258。
    老闆站櫃檯後面時腳底 y=218（介於 200 與 258 之間 → 被檯身擋到腰）。
    檯面器材集中在左半（x 144–266），x 270–330 留給老闆站。
  · 前景挖寶櫃與紙箱 x>200 且 y>232；左前方 x 20–200 留給三人同框。
"""
import json, math, os, random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

S = 3                       # 1 邏輯 px = 3 圖素（手機 3× DPR 剛好 1:1）
LW, LH = 380, 320
W, H = LW * S, LH * S
FLOOR_Y, SKIRT_Y = 196, 190

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ART = os.path.join(ROOT, 'art')
os.makedirs(ART, exist_ok=True)
random.seed(20260907)       # 固定亂數：木紋與封面每次都一樣，diff 才有意義

F_BOLD  = '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'
F_REG   = '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'
F_ITAL  = '/usr/share/fonts/truetype/liberation/LiberationSans-BoldItalic.ttf'
F_SERIF = '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'
F_MONO  = '/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf'
F_CJK   = '/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc'

WALL_A, WALL_B = (202, 172, 130), (212, 183, 142)
WALL_SEAM   = (166, 134, 90)
SKIRT_C     = (116, 81, 44)
FLOOR_A, FLOOR_B = (152, 110, 64), (166, 123, 75)
FLOOR_SEAM  = (100, 68, 36)
WOOD_D, WOOD_M = (64, 42, 22), (122, 86, 48)
CARD_A, CARD_B, CARD_D = (206, 174, 130), (182, 148, 106), (140, 108, 72)
OUTSIDE     = (38, 46, 60)
DOOR_C, DOOR_D, DOOR_L = (58, 108, 172), (34, 72, 122), (98, 150, 208)
BRASS       = (208, 168, 68)


def lx(v): return int(round(v * S))


# ══ 木紋 ═════════════════════════════════════════════════════════
def _noise(w, h, seed, octaves=4, sx=1.0, sy=1.0):
    """多層值雜訊。sx／sy 把雜訊拉長，木紋才會順著板子的方向跑。"""
    rng = np.random.default_rng(seed)
    acc = np.zeros((h, w), dtype=np.float32)
    amp, tot = 1.0, 0.0
    for o in range(octaves):
        k = 2 ** (octaves - o)
        gw = max(2, int(w / k / sx)); gh = max(2, int(h / k / sy))
        g = (rng.random((gh, gw)) * 255).astype(np.uint8)
        up = np.asarray(Image.fromarray(g).resize((w, h), Image.BICUBIC), dtype=np.float32) / 255
        acc += up * amp; tot += amp; amp *= .5
    return acc / tot


def wood(w, h, base, seed, vertical=True, period=9.0, warp=5.0, contrast=.17):
    """一塊木頭：年輪帶（sin 波）＋雜訊擾動＋細絲紋。回傳 RGB Image。"""
    if w <= 0 or h <= 0:
        return Image.new('RGB', (max(1, w), max(1, h)), base)
    if vertical:                                   # 紋路縱走 → 雜訊縱向拉長
        n = _noise(w, h, seed, 4, sx=1.0, sy=7.0)
        axis = np.tile(np.arange(w, dtype=np.float32)[None, :], (h, 1))
    else:
        n = _noise(w, h, seed, 4, sx=7.0, sy=1.0)
        axis = np.tile(np.arange(h, dtype=np.float32)[:, None], (1, w))
    rings = np.abs(np.sin((axis / period + n * warp) * math.pi))
    fine = _noise(w, h, seed + 977, 2, sx=1.0 if vertical else 14.0,
                  sy=14.0 if vertical else 1.0)
    k = 1.0 + (rings - .5) * contrast * 2 + (fine - .5) * .10
    arr = np.stack([np.clip(base[i] * k, 0, 255) for i in range(3)], axis=2).astype(np.uint8)
    return Image.fromarray(arr, 'RGB')
def shade(c, k): return tuple(max(0, min(255, int(v * k))) for v in c[:3])
def mix(a, b, t): return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def rect(d, x, y, w, h, fill, outline=None):
    if w > 0 and h > 0:
        d.rectangle([x, y, x + w - 1, y + h - 1], fill=fill, outline=outline)


def lrect(d, x, y, w, h, fill, outline=None):
    rect(d, lx(x), lx(y), lx(w), lx(h), fill, outline)


def fit(path, text, maxw, start, minsz=8):
    for sz in range(int(start), minsz - 1, -1):
        f = ImageFont.truetype(path, sz)
        if f.getlength(text) <= maxw:
            return f
    return ImageFont.truetype(path, minsz)


def wrap(font, text, maxw, maxlines=2):
    words, lines, cur = text.split(), [], ''
    for w_ in words:
        t = (cur + ' ' + w_).strip()
        if font.getlength(t) <= maxw or not cur:
            cur = t
        else:
            lines.append(cur); cur = w_
    if cur:
        lines.append(cur)
    if len(lines) > maxlines:
        lines = lines[:maxlines]
        while lines[-1] and font.getlength(lines[-1] + '…') > maxw:
            lines[-1] = lines[-1][:-1]
        lines[-1] = lines[-1].rstrip() + '…'
    return lines


# ══════════════════════════════════════════════════════════════════
#  牆／地板
# ══════════════════════════════════════════════════════════════════
def draw_wall(img, d):
    plank = 17
    for i, x0 in enumerate(range(-plank, LW + plank, plank)):
        base = shade(WALL_A if i % 2 == 0 else WALL_B, 1 + (random.random() - .5) * .05)
        pw, ph = lx(plank), lx(SKIRT_Y)
        img.paste(wood(pw, ph, base, 1000 + i, vertical=True,
                       period=lx(plank) / 2.0, warp=2.2, contrast=.085), (lx(x0), 0))
        d = ImageDraw.Draw(img)
        for _ in range(random.randint(1, 3)):        # 節疤
            kx = lx(x0) + random.randint(5, max(6, pw - 5))
            ky = random.randint(14, ph - 14)
            rr = random.randint(3, 6)
            for j in range(rr, 0, -1):
                d.ellipse([kx - j, ky - j * 1.5, kx + j, ky + j * 1.5],
                          outline=shade(base, .74 + (rr - j) * .045))
            d.ellipse([kx - 1, ky - 2, kx + 1, ky + 2], fill=shade(base, .62))
        rect(d, lx(x0) - 1, 0, 2, ph, WALL_SEAM)
        rect(d, lx(x0) + 1, 0, 1, ph, shade(base, 1.12))


def draw_skirt(d):
    lrect(d, 0, SKIRT_Y, LW, FLOOR_Y - SKIRT_Y, SKIRT_C)
    rect(d, 0, lx(SKIRT_Y), W, 2, shade(SKIRT_C, 1.4))
    rect(d, 0, lx(FLOOR_Y) - 2, W, 2, shade(SKIRT_C, .60))


def draw_floor(img, d):
    y0, y1 = lx(FLOOR_Y), H
    vpx = W * 0.50
    ys, y, step = [], float(y0), 2.6
    while y < y1:
        ys.append(int(y)); y += step; step *= 1.235
    ys.append(y1)
    for i in range(len(ys) - 1):
        a, b = ys[i], ys[i + 1]
        base = shade(FLOOR_A if i % 2 == 0 else FLOOR_B, 1 + (random.random() - .5) * .06)
        img.paste(wood(W, b - a, base, 2000 + i, vertical=False,
                       period=max(2.5, (b - a) / 1.6), warp=2.4, contrast=.13), (0, a))
        d = ImageDraw.Draw(img)
        rect(d, 0, b - 1, W, 1, FLOOR_SEAM)
    for k in range(-11, 12):                       # 對接縫：從消失點放射
        off = k * lx(38)
        for i in range(len(ys) - 1):
            if (i + k) % 2:
                continue
            a, b = ys[i], ys[i + 1]
            t0, t1 = (a - y0) / (y1 - y0), (b - y0) / (y1 - y0)
            d.line([(vpx + off * (0.08 + t0 * 1.85), a),
                    (vpx + off * (0.08 + t1 * 1.85), b)], fill=FLOOR_SEAM, width=1)
    ov = Image.new('RGBA', (W, H - y0), (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)
    for yy in range(H - y0):
        t = yy / (H - y0)
        od.rectangle([0, yy, W, yy], fill=(20, 12, 4, int(78 * t ** 1.4)))
    img.alpha_composite(ov, (0, y0))


def draw_rug(d):
    """門口斜斜鋪到櫃檯前的舊地毯：填住空曠的地板，也把動線指出來。"""
    top, bot = 232, 312
    quad = [(74, top), (250, top), (296, bot), (34, bot)]
    base = (118, 82, 74)
    d.polygon([(lx(a), lx(b)) for a, b in quad], fill=base)
    for i in range(lx(bot - top)):                 # 縱深明暗
        t = i / lx(bot - top)
        xl = lx(74) + (lx(34) - lx(74)) * t
        xr = lx(250) + (lx(296) - lx(250)) * t
        d.line([(xl, lx(top) + i), (xr, lx(top) + i)], fill=shade(base, .88 + t * .30))
    for k in range(1, 7):                          # 織紋
        t = k / 7
        xl = lx(74) + (lx(34) - lx(74)) * t
        xr = lx(250) + (lx(296) - lx(250)) * t
        d.line([(xl, lx(top) + lx(bot - top) * t), (xr, lx(top) + lx(bot - top) * t)],
               fill=shade(base, 1.22 if k % 2 else .80))
    for _ in range(500):                           # 磨損
        t = random.random()
        xl = lx(74) + (lx(34) - lx(74)) * t
        xr = lx(250) + (lx(296) - lx(250)) * t
        d.point((random.uniform(xl, xr), lx(top) + lx(bot - top) * t),
                fill=shade(base, random.uniform(.72, 1.35)))
    for edge in (0.055, 0.10):                     # 內外兩圈織帶
        for t in (edge, 1 - edge):
            xl = lx(74) + (lx(34) - lx(74)) * t
            xr = lx(250) + (lx(296) - lx(250)) * t
            d.line([(xl, lx(top) + lx(bot - top) * t), (xr, lx(top) + lx(bot - top) * t)],
                   fill=shade(base, 1.32 if edge < .08 else .74), width=2)
        for u in (edge, 1 - edge):
            pts = []
            for k in range(13):
                t = k / 12
                xl = lx(74) + (lx(34) - lx(74)) * t
                xr = lx(250) + (lx(296) - lx(250)) * t
                pts.append((xl + (xr - xl) * u, lx(top) + lx(bot - top) * t))
            d.line(pts, fill=shade(base, 1.32 if edge < .08 else .74), width=2)
    for k in range(9):                             # 菱形織花
        v = (k + .5) / 9
        for u in (.30, .70):
            t0, t1 = max(0, v - .045), min(1, v + .045)
            def px(t, uu):
                xl = lx(74) + (lx(34) - lx(74)) * t
                xr = lx(250) + (lx(296) - lx(250)) * t
                return (xl + (xr - xl) * uu, lx(top) + lx(bot - top) * t)
            c = shade(base, 1.30 if k % 2 else .78)
            d.polygon([px(t0, u), px(v, u - .045), px(t1, u), px(v, u + .045)], outline=c)
    d.line([(lx(74), lx(top)), (lx(250), lx(top))], fill=shade(base, 1.38), width=2)
    d.line([(lx(34), lx(bot)), (lx(296), lx(bot))], fill=shade(base, .62), width=2)


def room_shadow(img):
    ov = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)
    for y in range(lx(30)):                        # 天花板陰影
        od.rectangle([0, y, W, y], fill=(18, 10, 4, int(104 * (1 - y / lx(30)) ** 1.5)))
    for x in range(lx(24)):                        # 左右暗角
        a = int(62 * (1 - x / lx(24)) ** 1.4)
        od.rectangle([x, 0, x, H], fill=(18, 10, 4, a))
        od.rectangle([W - 1 - x, 0, W - 1 - x, H], fill=(18, 10, 4, a))
    img.alpha_composite(ov)
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))  # 櫃檯前的一圈暖光
    gd = ImageDraw.Draw(glow)
    cx, cy, rx, ry = lx(232), lx(250), lx(180), lx(92)
    for k in range(26):
        t = k / 25
        gd.ellipse([cx - rx * (1 - t), cy - ry * (1 - t), cx + rx * (1 - t), cy + ry * (1 - t)],
                   fill=(255, 214, 150, 5))
    img.alpha_composite(glow.filter(ImageFilter.GaussianBlur(18)))


# ══════════════════════════════════════════════════════════════════
#  封面：每張都用真的字體排真的團名／盤名
# ══════════════════════════════════════════════════════════════════
COVER = 37
CS = COVER * S

PAL = {
    'jazz': [((16, 36, 78), (234, 228, 208), (224, 150, 44)),
             ((22, 22, 26), (236, 231, 214), (200, 64, 48)),
             ((8, 60, 72), (238, 232, 212), (228, 178, 66)),
             ((214, 206, 182), (26, 26, 30), (176, 46, 40))],
    'rock': [((20, 20, 22), (238, 238, 236), (200, 36, 42)),
             ((186, 40, 42), (250, 246, 238), (26, 24, 24)),
             ((234, 230, 220), (28, 26, 26), (196, 46, 40)),
             ((44, 52, 46), (226, 222, 208), (222, 160, 52))],
    'electronic': [((16, 24, 36), (122, 228, 234), (240, 76, 140)),
                   ((226, 226, 224), (26, 30, 40), (58, 90, 220)),
                   ((28, 20, 46), (178, 152, 248), (250, 220, 96))],
    'soul': [((150, 62, 26), (250, 226, 176), (240, 178, 56)),
             ((60, 34, 22), (240, 214, 152), (206, 108, 44)),
             ((214, 148, 44), (48, 26, 16), (250, 240, 214))],
    'hiphop': [((44, 48, 34), (232, 224, 196), (216, 170, 54)),
               ((26, 26, 28), (222, 216, 200), (142, 180, 70)),
               ((186, 174, 146), (26, 26, 26), (178, 48, 42))],
    'pop': [((248, 150, 174), (46, 34, 62), (122, 228, 238)),
            ((40, 32, 70), (250, 214, 140), (246, 124, 160)),
            ((124, 202, 232), (36, 40, 70), (250, 246, 232))],
    'folk': [((130, 120, 86), (244, 238, 218), (86, 62, 38)),
             ((222, 212, 184), (54, 44, 32), (150, 92, 44))],
}
PAL['blues'] = PAL['jazz']


def paper(im, amount=11):
    d = ImageDraw.Draw(im)
    for _ in range(int(CS * CS / 55)):
        x, y = random.randrange(CS), random.randrange(CS)
        d.point((x, y), fill=shade(im.getpixel((x, y))[:3],
                                   1 + (random.random() - .5) * amount / 50))


# ── 圖形零件 ─────────────────────────────────────────────────────
def g_face(d, x, y, w, h, dark, light):
    d.rectangle([x, y, x + w, y + h], fill=dark)
    hr = w * .28
    cx, cy = x + w * .47, y + h * .38
    d.ellipse([cx - hr, cy - hr * 1.18, cx + hr, cy + hr * 1.18], fill=light)
    d.ellipse([cx - hr * .05, cy - hr * 1.18, cx + hr, cy + hr * 1.12], fill=mix(light, dark, .45))
    sh = h * .36
    d.polygon([(x + w * .08, y + h), (x + w * .24, y + h - sh),
               (x + w * .72, y + h - sh), (x + w * .94, y + h)], fill=light)
    d.polygon([(x + w * .50, y + h), (x + w * .58, y + h - sh),
               (x + w * .72, y + h - sh), (x + w * .94, y + h)], fill=mix(light, dark, .42))


def g_horn(d, x, y, w, h, dark, light):
    d.rectangle([x, y, x + w, y + h], fill=dark)
    d.line([(x + w * .18, y + h * .90), (x + w * .72, y + h * .24)], fill=light,
           width=max(2, int(w / 13)))
    d.ellipse([x + w * .58, y + h * .02, x + w * .97, y + h * .42], fill=light)
    d.ellipse([x + w * .67, y + h * .11, x + w * .90, y + h * .34], fill=dark)
    for i in range(3):
        d.ellipse([x + w * (.30 + i * .10), y + h * (.70 - i * .11),
                   x + w * (.37 + i * .10), y + h * (.77 - i * .11)], fill=mix(light, dark, .35))


def g_band(d, x, y, w, h, dark, light):
    d.rectangle([x, y, x + w, y + h], fill=dark)
    for i in range(4):
        cx = x + w * (0.16 + i * 0.23)
        top = y + h * (0.26 + (0.05 if i % 2 else 0))
        hr = w * .068
        c = light if i % 2 == 0 else mix(light, dark, .38)
        d.ellipse([cx - hr, top, cx + hr, top + hr * 2.1], fill=c)
        d.polygon([(cx - hr * 1.8, y + h), (cx - hr * 1.2, top + hr * 2.0),
                   (cx + hr * 1.2, top + hr * 2.0), (cx + hr * 1.8, y + h)], fill=c)


def g_city(d, x, y, w, h, sky, hi, dark):
    for i in range(int(h)):
        d.rectangle([x, y + i, x + w, y + i], fill=mix(sky, hi, (i / h) * .85))
    sr = w * .16
    d.ellipse([x + w * .64 - sr, y + h * .30 - sr, x + w * .64 + sr, y + h * .30 + sr],
              fill=(250, 226, 150))
    bx = x
    while bx < x + w:
        bw = random.uniform(w * .06, w * .14)
        bh = random.uniform(h * .16, h * .46)
        d.rectangle([bx, y + h - bh, bx + bw, y + h], fill=dark)
        for wy in range(int(y + h - bh) + 3, int(y + h) - 2, 5):
            for wx in range(int(bx) + 2, int(bx + bw) - 2, 4):
                if random.random() < .42:
                    d.point((wx, wy), fill=(250, 224, 140))
        bx += bw + max(1, w * .012)


def g_disc(d, x, y, w, h, dark, light, ac):
    d.rectangle([x, y, x + w, y + h], fill=dark)
    cx, cy, r = x + w / 2, y + h / 2, min(w, h) * .41
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(22, 20, 22))
    for k in range(7):
        rr = r * (.94 - k * .075)
        d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], outline=(54, 50, 50))
    lr = r * .36
    d.ellipse([cx - lr, cy - lr, cx + lr, cy + lr], fill=ac)
    d.ellipse([cx - 2, cy - 2, cx + 2, cy + 2], fill=dark)
    d.arc([cx - r, cy - r, cx + r, cy + r], 200, 255, fill=light, width=2)


# ── 排版零件 ─────────────────────────────────────────────────────
def t_artist(d, x, y, maxw, s, size, fill, path=F_BOLD, upper=True, anchor=None):
    s = s.upper() if upper else s
    f = fit(path, s, maxw, size)
    d.text((x, y), s, font=f, fill=fill, anchor=anchor)
    return y + f.size + max(1, CS * .02)


def t_title(d, x, y, maxw, s, size, fill, path=F_REG, lines=2, anchor=None):
    f = ImageFont.truetype(path, int(size))
    ls = wrap(f, s, maxw, lines)
    if len(ls) == 1:
        f = fit(path, ls[0], maxw, size)
    for i, ln in enumerate(ls):
        d.text((x, y + i * (f.size + 1)), ln, font=f, fill=fill, anchor=anchor)
    return y + len(ls) * (f.size + 1)


# ── 版型 ─────────────────────────────────────────────────────────
def st_bluenote(d, a, t, p):
    bg, fg, ac = p
    d.rectangle([0, 0, CS, CS], fill=bg)
    m = CS * .07
    (g_horn if random.random() < .5 else g_face)(d, m, CS * .36, CS - m * 2, CS * .58,
                                                 shade(bg, .52), fg)
    y = t_artist(d, m, CS * .055, CS * .86, a, CS * .155, ac)
    t_title(d, m, y, CS * .86, t, CS * .095, fg, lines=1)
    d.rectangle([m, CS * .325, CS - m, CS * .325 + 1], fill=ac)


def st_type(d, a, t, p):
    bg, fg, ac = p
    d.rectangle([0, 0, CS, CS], fill=bg)
    word = t.upper()
    if ImageFont.truetype(F_BOLD, int(CS * .19)).getlength(word) > CS * .86:
        word = max(t.split(), key=len).upper()
    f = fit(F_BOLD, word, CS * .86, CS * .40)
    d.text((CS / 2, CS * .42), word, font=f, fill=ac, anchor='mm')
    d.rectangle([CS * .10, CS * .70, CS * .90, CS * .70 + 1], fill=fg)
    t_artist(d, CS / 2, CS * .80, CS * .84, a, CS * .11, fg, anchor='mm')


def st_portrait(d, a, t, p):
    bg, fg, ac = p
    g_face(d, 0, 0, CS, CS, bg, fg)
    d.rectangle([0, CS * .70, CS, CS], fill=(0, 0, 0))
    y = t_artist(d, CS * .06, CS * .735, CS * .88, a, CS * .145, ac)
    t_title(d, CS * .06, y, CS * .88, t, CS * .085, (232, 229, 222))


def st_city(d, a, t, p):
    bg, fg, ac = p
    g_city(d, 0, 0, CS, CS, bg, fg, (28, 24, 46))
    f = fit(F_BOLD, t.upper(), CS * .84, CS * .19)
    tx, ty = CS * .07, CS * .07
    for dx in (-1, 1):
        d.text((tx + dx, ty), t.upper(), font=f, fill=(28, 24, 46))
        d.text((tx, ty + dx), t.upper(), font=f, fill=(28, 24, 46))
    d.text((tx, ty), t.upper(), font=f, fill=(252, 248, 242))
    t_artist(d, tx, ty + f.size + 2, CS * .8, a, CS * .11, ac, path=F_ITAL, upper=False)


def st_band(d, a, t, p):
    bg, fg, ac = p
    g_band(d, 0, 0, CS, CS, bg, fg)
    t_artist(d, CS / 2, CS * .11, CS * .90, a, CS * .16, ac, anchor='mm')
    t_title(d, CS / 2, CS * .885, CS * .88, t, CS * .09, fg, lines=1, anchor='ma')


def st_disc(d, a, t, p):
    bg, fg, ac = p
    g_disc(d, 0, 0, CS, CS, bg, fg, ac)
    d.rectangle([0, 0, CS, CS * .17], fill=shade(bg, .55))
    d.rectangle([0, CS * .85, CS, CS], fill=shade(bg, .55))
    t_artist(d, CS / 2, CS * .028, CS * .90, a, CS * .115, fg, anchor='ma')
    t_title(d, CS / 2, CS * .873, CS * .90, t, CS * .085, fg, lines=1, anchor='ma')


def st_stripes(d, a, t, p):
    bg, fg, ac = p
    d.rectangle([0, 0, CS, CS], fill=fg)
    y = CS * .06
    cols = [bg, ac, shade(bg, 1.4), mix(bg, ac, .5)]
    for i in range(7):
        hgt = CS * random.uniform(.035, .085)
        d.rectangle([CS * .08, y, CS * .92, y + hgt], fill=cols[i % 4])
        y += hgt + CS * .012
        if y > CS * .60:
            break
    d.rectangle([0, CS * .66, CS, CS], fill=bg)
    yy = t_artist(d, CS * .08, CS * .70, CS * .84, a, CS * .145, ac)
    t_title(d, CS * .08, yy, CS * .84, t, CS * .085, fg, lines=2)


def st_quad(d, a, t, p):
    bg, fg, ac = p
    half = CS / 2
    for i in range(4):
        cx, cy = (i % 2) * half, (i // 2) * half
        base = [bg, shade(bg, 1.35), ac, mix(bg, fg, .35)][i]
        g_face(d, cx, cy, half, half, base, mix(fg, base, .18))
    ov_h = CS * .18
    d.rectangle([0, CS * .41, CS, CS * .41 + ov_h], fill=(0, 0, 0))
    t_artist(d, CS / 2, CS * .435, CS * .92, a, CS * .13, fg, anchor='ma')
    t_title(d, CS / 2, CS * .92, CS * .92, t, CS * .085, fg, lines=1, anchor='ma')


def st_mono(d, a, t, p):
    bg, fg, ac = p
    d.rectangle([0, 0, CS, CS], fill=bg)
    for _ in range(random.randint(7, 11)):
        k = random.random()
        c = random.choice([fg, ac, mix(fg, bg, .5)])
        if k < .42:
            r = random.uniform(CS * .10, CS * .30)
            cx, cy = random.uniform(0, CS), random.uniform(0, CS * .78)
            d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=c)
        elif k < .78:
            bx, by = random.uniform(0, CS * .6), random.uniform(0, CS * .55)
            d.rectangle([bx, by, bx + random.uniform(CS * .12, CS * .38),
                         by + random.uniform(CS * .12, CS * .34)], fill=c)
        else:
            xx = random.uniform(0, CS)
            d.line([(xx, 0), (xx, CS * .78)], fill=c, width=max(2, int(CS * .04)))
    d.rectangle([0, CS * .70, CS, CS], fill=shade(bg, .45))
    f = fit(F_MONO, a.lower(), CS * .88, CS * .11)
    d.text((CS * .06, CS * .735), a.lower(), font=f, fill=fg)
    f2 = fit(F_MONO, t.lower(), CS * .88, CS * .085)
    d.text((CS * .06, CS * .735 + f.size + 2), t.lower(), font=f2, fill=mix(fg, bg, .40))


def st_half(d, a, t, p):
    bg, fg, ac = p
    d.rectangle([0, 0, CS, CS], fill=fg)
    g_face(d, 0, 0, CS, CS * .54, bg, ac)
    y = t_artist(d, CS * .06, CS * .58, CS * .88, a, CS * .15, bg, path=F_SERIF, upper=False)
    t_title(d, CS * .06, y, CS * .88, t, CS * .085, shade(bg, 1.25), lines=2)


# ── 「一眼認得出來」的特例版型 ──────────────────────────────────
def sp_prism(d, a, t, p):
    d.rectangle([0, 0, CS, CS], fill=(8, 8, 10))
    cx, cy, r = CS * .50, CS * .52, CS * .27
    d.line([(0, cy - r * .45), (cx - r * .55, cy - r * .05)], fill=(240, 240, 240), width=2)
    tri = [(cx, cy - r), (cx - r * .92, cy + r * .72), (cx + r * .92, cy + r * .72)]
    d.polygon(tri, fill=(10, 10, 12), outline=(226, 226, 226))
    for i, c in enumerate([(210, 40, 44), (226, 128, 36), (232, 214, 62), (72, 186, 92),
                           (62, 118, 214), (132, 66, 190)]):
        d.line([(cx + r * .25, cy + r * .08), (CS, cy + r * .10 + i * CS * .055)],
               fill=c, width=2)
    t_artist(d, CS * .05, CS * .04, CS * .9, a, CS * .10, (218, 218, 218))
    t_title(d, CS * .05, CS * .885, CS * .9, t, CS * .08, (170, 170, 172), lines=1)


def sp_wave(d, a, t, p):
    d.rectangle([0, 0, CS, CS], fill=(8, 8, 10))
    x0, x1 = CS * .18, CS * .82
    for row in range(18):
        y = CS * .30 + row * CS * .026
        pts = []
        for i in range(48):
            u = i / 47
            xx = x0 + (x1 - x0) * u
            g = math.exp(-((u - .5) ** 2) / .012)
            amp = CS * .085 * g * (0.35 + random.random() * .95)
            pts.append((xx, y - amp))
        d.polygon([(x0, y + 2)] + pts + [(x1, y + 2)], fill=(8, 8, 10))
        d.line(pts, fill=(238, 238, 238), width=1)
    t_artist(d, CS / 2, CS * .06, CS * .9, a, CS * .095, (222, 222, 222), anchor='ma')
    t_title(d, CS / 2, CS * .90, CS * .9, t, CS * .075, (200, 200, 200), lines=1, anchor='ma')


def sp_blur(d, a, t, p):
    d.rectangle([0, 0, CS, CS], fill=(198, 62, 86))
    for _ in range(26):
        x = random.uniform(-CS * .1, CS)
        y = random.uniform(CS * .1, CS * .9)
        w = random.uniform(CS * .2, CS * .8)
        c = random.choice([(228, 108, 128), (170, 40, 70), (240, 158, 170), (150, 30, 60)])
        d.rectangle([x, y, x + w, y + random.uniform(CS * .03, CS * .12)], fill=c)
    t_artist(d, CS * .06, CS * .06, CS * .88, a, CS * .105, (250, 220, 226))
    t_title(d, CS * .06, CS * .885, CS * .88, t, CS * .08, (250, 220, 226), lines=1)


def sp_water(d, a, t, p):
    for i in range(CS):
        d.rectangle([0, i, CS, i], fill=mix((24, 96, 158), (10, 46, 92), i / CS))
    for _ in range(70):
        x, y = random.uniform(0, CS), random.uniform(0, CS)
        d.ellipse([x, y, x + random.uniform(1, 3), y + random.uniform(1, 3)],
                  fill=(150, 200, 232))
    bx, by = CS * .42, CS * .52
    d.ellipse([bx - CS * .05, by - CS * .05, bx + CS * .05, by + CS * .05], fill=(238, 214, 176))
    d.polygon([(bx - CS * .06, by), (bx + CS * .06, by), (bx + CS * .04, by + CS * .16),
               (bx - CS * .04, by + CS * .16)], fill=(238, 214, 176))
    d.line([(CS * .70, CS * .18), (CS * .52, CS * .58)], fill=(228, 226, 220), width=1)
    t_artist(d, CS / 2, CS * .07, CS * .9, a, CS * .155, (250, 250, 248), anchor='ma')
    t_title(d, CS / 2, CS * .87, CS * .9, t, CS * .085, (226, 234, 240), lines=1, anchor='ma')


def sp_pale(d, a, t, p):
    d.rectangle([0, 0, CS, CS], fill=(228, 234, 236))
    for _ in range(9):
        x, y = random.uniform(0, CS), random.uniform(CS * .2, CS * .8)
        d.rectangle([x, y, x + random.uniform(CS * .1, CS * .4), y + random.uniform(2, 6)],
                    fill=random.choice([(196, 208, 212), (170, 186, 192), (210, 220, 222)]))
    d.line([(CS * .12, CS * .78), (CS * .62, CS * .34)], fill=(150, 168, 176), width=3)
    d.line([(CS * .62, CS * .34), (CS * .92, CS * .40)], fill=(150, 168, 176), width=3)
    t_artist(d, CS * .06, CS * .08, CS * .88, a, CS * .11, (58, 72, 78))
    t_title(d, CS * .06, CS * .86, CS * .88, t, CS * .085, (92, 106, 112), lines=1)


GENERIC = {
    'jazz': [st_bluenote, st_portrait, st_type, st_stripes, st_disc],
    'blues': [st_bluenote, st_portrait, st_stripes],
    'rock': [st_band, st_type, st_mono, st_quad, st_disc],
    'electronic': [st_mono, st_disc, st_type, st_stripes],
    'soul': [st_portrait, st_half, st_bluenote, st_quad],
    'hiphop': [st_portrait, st_mono, st_type, st_quad],
    'pop': [st_city, st_portrait, st_half],
    'folk': [st_half, st_portrait, st_stripes],
}
SPECIAL = {
    ('Pink Floyd', 'The Dark Side of the Moon'): sp_prism,
    ('Joy Division', 'Unknown Pleasures'): sp_wave,
    ('My Bloody Valentine', 'Loveless'): sp_blur,
    ('Nirvana', 'Nevermind'): sp_water,
    ('Radiohead', 'OK Computer'): sp_pale,
}


_recent = []
COVER_DIR = os.path.join(ART, 'covers')


def cover_slug(a, t):
    import re
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', f'{a}-{t}'.lower())).strip('-')[:60]


def real_cover(key):
    """art/covers/ 裡有真封面就用真的（scripts/fetch-shop-covers.py 抓的）。"""
    if not key:
        return None
    p = os.path.join(COVER_DIR, cover_slug(*key) + '.jpg')
    if not os.path.exists(p):
        return None
    im = Image.open(p).convert('RGB').resize((CS, CS), Image.LANCZOS)
    a = np.asarray(im, dtype=np.float32)
    a = np.clip((a - 128) * 1.06 + 128 - 4, 0, 255)        # 壓一點對比、退一點色
    return Image.fromarray(a.astype(np.uint8), 'RGB')


def make_cover(a, t, genres, key=None):
    got = real_cover(key)
    if got is not None:
        d = ImageDraw.Draw(got)
        return finish_cover(got, d)
    im = Image.new('RGB', (CS, CS), (20, 20, 20))
    d = ImageDraw.Draw(im)
    fn = SPECIAL.get(key)
    pal = None
    for g in genres:
        if g in PAL:
            pal = random.choice(PAL[g]); break
    pal = pal or random.choice(PAL['rock'])
    if not fn:
        pool = None
        for g in genres:
            if g in GENERIC:
                pool = GENERIC[g]; break
        pool = pool or GENERIC['rock']
        fresh = [f for f in pool if f not in _recent[-3:]] or pool
        fn = random.choice(fresh)
    _recent.append(fn)
    fn(d, a, t, pal)
    paper(im, 11)
    return finish_cover(im, ImageDraw.Draw(im))


def finish_cover(im, d):
    """套邊：左上受光、右下壓暗，偶爾一圈環狀磨損。"""
    d.line([(0, 0), (CS - 1, 0)], fill=(255, 255, 255))
    d.line([(0, 0), (0, CS - 1)], fill=(255, 255, 255))
    d.line([(0, CS - 1), (CS - 1, CS - 1)], fill=(0, 0, 0))
    d.line([(CS - 1, 0), (CS - 1, CS - 1)], fill=(0, 0, 0))
    if random.random() < .22:                              # 環狀磨損
        r = CS * .335
        d.ellipse([CS / 2 - r, CS / 2 - r, CS / 2 + r, CS / 2 + r], outline=(178, 178, 178))
    return im


PICKS = [
    ("Miles Davis", "Kind of Blue"), ("John Coltrane", "Blue Train"),
    ("Herbie Hancock", "Maiden Voyage"), ("Art Blakey and the Jazz Messengers", "Moanin'"),
    ("Chet Baker", "Chet Baker Sings"), ("Bill Evans", "Waltz for Debby"),
    ("Sun Ra", "Space Is the Place"), ("Fela Kuti", "Zombie"),
    ("Radiohead", "OK Computer"), ("Pink Floyd", "The Dark Side of the Moon"),
    ("Joy Division", "Unknown Pleasures"), ("Nirvana", "Nevermind"),
    ("David Bowie", "Low"), ("Talking Heads", "Remain in Light"),
    ("The Velvet Underground", "The Velvet Underground & Nico"), ("Can", "Tago Mago"),
    ("My Bloody Valentine", "Loveless"), ("Swans", "Cop"),
    ("Bobb Trimble", "Iron Curtain Innocence"), ("Kraftwerk", "Trans-Europe Express"),
    ("Aphex Twin", "Selected Ambient Works 85-92"),
    ("Yellow Magic Orchestra", "Solid State Survivor"),
    ("Marvin Gaye", "What's Going On"), ("Stevie Wonder", "Innervisions"),
    ("A Tribe Called Quest", "The Low End Theory"), ("J Dilla", "Donuts"),
    ("Anri", "Timely!!"),
]
SHORT_ART = {"Art Blakey and the Jazz Messengers": "Art Blakey",
             "The Velvet Underground": "Velvet Underground",
             "A Tribe Called Quest": "Tribe Called Quest",
             "Yellow Magic Orchestra": "Y M O"}
SHORT_TTL = {"The Velvet Underground & Nico": "& Nico",
             "Selected Ambient Works 85-92": "Ambient Works 85-92",
             "The Dark Side of the Moon": "Dark Side of the Moon",
             "The Low End Theory": "Low End Theory"}


def load_albums():
    idx = {}
    seed = os.path.join(ROOT, 'seed_cards.json')
    if os.path.exists(seed):
        for r in json.load(open(seed)):
            idx[(r[0].lower(), r[1].lower())] = r
    out = []
    for a, t in PICKS:
        r = idx.get((a.lower(), t.lower()))
        out.append((SHORT_ART.get(a, a), SHORT_TTL.get(t, t), r[5] if r else ['rock'], (a, t)))
    return out


# ══════════════════════════════════════════════════════════════════
#  牆上的封面展示（6×4，木框）
# ══════════════════════════════════════════════════════════════════
GX, GY, PITCH = 98, 10, 41


def draw_cover_wall(img, d):
    albums = load_albums()
    real = [x for x in albums if os.path.exists(
        os.path.join(ART, 'covers', cover_slug(*x[3]) + '.jpg'))]
    # 真封面與程式生成的版型混在一起會很明顯，所以夠 24 張就全用真的
    albums = real if len(real) >= 24 else albums
    print(f'  牆上封面：真封面 {len(real)} 張 / 清單 {len(load_albums())} 張'
          + ('' if len(real) >= 24 else '（不足 24，會混用程式生成的版型）'))
    # 這幾張一定要在牆上（24 格塞不下 27 張，不釘住就會被洗掉）
    pin = {('Miles Davis', 'Kind of Blue'), ('Joy Division', 'Unknown Pleasures'),
           ('Pink Floyd', 'The Dark Side of the Moon'), ('Nirvana', 'Nevermind'),
           ('Radiohead', 'OK Computer'), ('The Velvet Underground', 'The Velvet Underground & Nico'),
           ('Swans', 'Cop'), ('Bobb Trimble', 'Iron Curtain Innocence')}
    head = [x for x in albums if x[3] in pin]
    tail = [x for x in albums if x[3] not in pin]
    random.shuffle(head); random.shuffle(tail)
    albums = head + tail
    order = list(range(24)); random.shuffle(order)       # 釘住的別擠在同一排
    slot_of = {n: i for i, n in enumerate(order)}
    k = 0
    for row in range(4):
        for col in range(6):
            a, t, g, key = albums[slot_of[k] % len(albums)]; k += 1
            x, y = GX + col * PITCH, GY + row * PITCH
            sh = Image.new('RGBA', (lx(COVER + 12), lx(COVER + 12)), (0, 0, 0, 0))
            ImageDraw.Draw(sh).rectangle([lx(3), lx(3), lx(COVER + 6), lx(COVER + 6)],
                                         fill=(0, 0, 0, 96))
            img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(3.2)),
                                (lx(x) - lx(3), lx(y) - lx(2)))
            d = ImageDraw.Draw(img)
            lrect(d, x - 2, y - 2, COVER + 4, COVER + 4, WOOD_M)          # 木框
            lrect(d, x - 2, y - 2, COVER + 4, 1, shade(WOOD_M, 1.45))
            lrect(d, x - 2, y + COVER + 1, COVER + 4, 1, shade(WOOD_M, .55))
            img.paste(make_cover(a, t, g, key), (lx(x), lx(y)))
            ov = Image.new('RGBA', (lx(COVER), lx(COVER)), (0, 0, 0, 0))  # 壓克力反光
            ImageDraw.Draw(ov).polygon(
                [(0, lx(COVER) * .58), (lx(COVER) * .58, 0),
                 (lx(COVER) * .84, 0), (0, lx(COVER) * .84)], fill=(255, 255, 255, 15))
            img.alpha_composite(ov, (lx(x), lx(y)))
            d = ImageDraw.Draw(img)
            lrect(d, x - 2, y - 2, COVER + 4, COVER + 4, None, outline=WOOD_D)
            lrect(d, x - 3, y - 3, COVER + 6, COVER + 6, None, outline=shade(WOOD_D, 1.45))


# ══════════════════════════════════════════════════════════════════
#  門
# ══════════════════════════════════════════════════════════════════
DOOR_X, DOOR_W, DOOR_TOP = 10, 64, 96


def draw_doorway(img, d):
    x, y, w, h = DOOR_X, DOOR_TOP, DOOR_W, FLOOR_Y - DOOR_TOP
    for i in range(lx(h)):                                    # 雨夜的巷子
        rect(d, lx(x), lx(y) + i, lx(w), 1, mix(OUTSIDE, (14, 18, 26), i / lx(h)))
    for _ in range(11):                                       # 對街的窗光
        rect(d, lx(x) + random.randint(4, lx(w) - 12), lx(y) + random.randint(6, lx(h) - 46),
             random.randint(3, 7), random.randint(4, 9),
             shade((238, 208, 140), random.uniform(.45, 1.0)))
    for _ in range(150):                                      # 雨
        rx = lx(x) + random.randint(1, lx(w) - 2)
        ry = lx(y) + random.randint(0, lx(h) - 14)
        d.line([(rx, ry), (rx - 2, ry + random.randint(6, 14))], fill=(148, 174, 200))
    ov = Image.new('RGBA', (lx(w), lx(h)), (0, 0, 0, 0))      # 門檻附近的地面反光
    ImageDraw.Draw(ov).rectangle([0, lx(h) - lx(10), lx(w), lx(h)], fill=(90, 110, 140, 90))
    img.alpha_composite(ov, (lx(x), lx(y)))
    d = ImageDraw.Draw(img)
    mat_y = FLOOR_Y + 1                                       # 門口地墊
    d.polygon([(lx(x + 3), lx(mat_y)), (lx(x + w - 3), lx(mat_y)),
               (lx(x + w + 4), lx(mat_y + 11)), (lx(x - 4), lx(mat_y + 11))],
              fill=(78, 62, 48))
    for i in range(9):
        d.line([(lx(x + 5 + i * (w - 10) / 8.5), lx(mat_y + 1)),
                (lx(x + 2 + i * (w + 4) / 8.5), lx(mat_y + 10))], fill=(96, 78, 60))
    d.line([(lx(x + 3), lx(mat_y)), (lx(x + w - 3), lx(mat_y))], fill=(108, 88, 68), width=2)
    lrect(d, x - 4, y - 5, w + 8, 5, shade(WOOD_M, 1.18))     # 門框
    lrect(d, x - 4, y, 4, h, shade(WOOD_M, 1.06))
    lrect(d, x + w, y, 4, h, shade(WOOD_M, .80))
    lrect(d, x - 4, y - 5, w + 8, 1, shade(WOOD_M, 1.5))
    lrect(d, x - 5, y - 8, w + 10, 3, WOOD_D)
    sx, sy, sw, sh = 12, 44, 62, 34                           # 手寫木牌
    lrect(d, sx - 2, sy - 2, sw + 4, sh + 4, shade(WOOD_M, .78))
    lrect(d, sx, sy, sw, sh, shade(WOOD_M, 1.16))
    for _ in range(26):
        rect(d, lx(sx) + random.randint(1, lx(sw) - 30), lx(sy) + random.randint(1, lx(sh) - 2),
             random.randint(12, 60), 1, shade(WOOD_M, 1.30))
    lrect(d, sx, sy, sw, 1, shade(WOOD_M, 1.5))
    lrect(d, sx, sy + sh - 1, sw, 1, shade(WOOD_M, .60))
    fz = ImageFont.truetype(F_CJK, lx(13))
    d.text((lx(sx + sw / 2), lx(sy + 5)), '本日推薦', font=fz, fill=(46, 30, 16), anchor='ma')
    fz2 = ImageFont.truetype(F_CJK, lx(8))
    d.text((lx(sx + sw / 2), lx(sy + 20)), '自己翻 別問我', font=fz2, fill=(96, 64, 34),
           anchor='ma')
    d.line([(lx(sx + 6), lx(sy)), (lx(sx + 6), lx(sy - 6))], fill=shade(WOOD_D, 1.4), width=2)
    d.line([(lx(sx + sw - 6), lx(sy)), (lx(sx + sw - 6), lx(sy - 6))],
           fill=shade(WOOD_D, 1.4), width=2)
    bx, by = x + w // 2, y - 14                               # 門楣上的鈴鐺
    lrect(d, bx - 1, by, 2, 5, shade(WOOD_D, 1.3))
    d.ellipse([lx(bx - 3), lx(by + 4), lx(bx + 3), lx(by + 10)], fill=BRASS,
              outline=shade(BRASS, .55))
    d.ellipse([lx(bx - 2), lx(by + 5), lx(bx), lx(by + 7)], fill=shade(BRASS, 1.4))


def door_panel(frame):
    """門板三格：0 關、1 半開、2 全開（往內開、鉸鏈在左）。"""
    pad = 4
    pw, ph = DOOR_W + pad * 2, (FLOOR_Y - DOOR_TOP) + pad * 2
    im = Image.new('RGBA', (lx(pw), lx(ph)), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    w = [DOOR_W, int(DOOR_W * .58), int(DOOR_W * .30)][frame]
    skew = [0, 5, 9][frame]
    h, x0, y0 = FLOOR_Y - DOOR_TOP, pad, pad
    d.polygon([(lx(x0), lx(y0)), (lx(x0 + w), lx(y0 + skew)),
               (lx(x0 + w), lx(y0 + h)), (lx(x0), lx(y0 + h))], fill=DOOR_C)
    if w > 20:                                                # 兩塊凹飾板
        ins = max(3, int(w * .14))
        for py, pht in ((0.09, 0.36), (0.51, 0.38)):
            d.polygon([(lx(x0 + ins), lx(y0 + h * py)),
                       (lx(x0 + w - ins), lx(y0 + skew * .8 + h * py)),
                       (lx(x0 + w - ins), lx(y0 + skew * .8 + h * (py + pht))),
                       (lx(x0 + ins), lx(y0 + h * (py + pht)))], fill=shade(DOOR_C, .86))
            d.polygon([(lx(x0 + ins), lx(y0 + h * py)),
                       (lx(x0 + w - ins), lx(y0 + skew * .8 + h * py)),
                       (lx(x0 + w - ins), lx(y0 + skew * .8 + h * (py + pht))),
                       (lx(x0 + ins), lx(y0 + h * (py + pht)))], outline=DOOR_D)
    d.line([(lx(x0), lx(y0)), (lx(x0), lx(y0 + h))], fill=DOOR_L, width=2)
    d.line([(lx(x0), lx(y0)), (lx(x0 + w), lx(y0 + skew))], fill=DOOR_L, width=2)
    d.line([(lx(x0 + w) - 1, lx(y0 + skew)), (lx(x0 + w) - 1, lx(y0 + h))], fill=DOOR_D, width=2)
    if w > 16:                                                # 門把
        hx, hy = x0 + w - max(5, int(w * .13)), y0 + h * .54
        d.rectangle([lx(hx - 2), lx(hy), lx(hx + 2), lx(hy + 6)], fill=BRASS,
                    outline=shade(BRASS, .5))
    if frame:                                                 # 開闔邊在地上的投影
        d.polygon([(lx(x0 + w), lx(y0 + skew)), (lx(x0 + w + 3), lx(y0 + skew + 2)),
                   (lx(x0 + w + 3), lx(y0 + h)), (lx(x0 + w), lx(y0 + h))],
                  fill=(0, 0, 0, 90))
    return im


# ══════════════════════════════════════════════════════════════════
#  前景層：櫃檯、器材、挖寶櫃、紙箱
# ══════════════════════════════════════════════════════════════════
CT_X, CT_W, CT_TOP, CT_BOT, CT_D = 138, 192, 200, 246, 8
SLEEVE_C = [(188, 32, 46), (30, 92, 172), (232, 222, 196), (240, 196, 84), (44, 122, 82),
            (104, 62, 158), (222, 130, 30), (60, 178, 198), (24, 24, 26), (138, 84, 38),
            (246, 244, 238), (92, 92, 96), (206, 96, 130), (56, 60, 140), (172, 176, 60)]


def draw_counter(img, d):
    x, w, off = CT_X, CT_W, 7
    d.polygon([(lx(x), lx(CT_TOP)), (lx(x + off), lx(CT_TOP - CT_D)),
               (lx(x + w + off), lx(CT_TOP - CT_D)), (lx(x + w), lx(CT_TOP))],
              fill=shade(WOOD_M, 1.32))                       # 檯面
    for i in range(lx(CT_D)):                                 # 檯面木紋
        rect(d, lx(x) + int(i * off * S / lx(CT_D)), lx(CT_TOP) - i, lx(w), 1,
             shade(WOOD_M, 1.32 + i * .012))
    for _ in range(40):
        gx = lx(x) + random.randint(4, lx(w) - 40)
        gy = lx(CT_TOP) - random.randint(1, lx(CT_D) - 1)
        rect(d, gx, gy, random.randint(14, 60), 1, shade(WOOD_M, 1.44))
    face = wood(lx(w), lx(CT_BOT - CT_TOP), WOOD_M, 3001, vertical=False,
                period=14.0, warp=2.6, contrast=.15)                # 檯身
    fa = np.asarray(face, dtype=np.float32)
    ramp = np.linspace(1.06, .64, fa.shape[0], dtype=np.float32)[:, None, None]
    _paste(img, np.clip(fa * ramp, 0, 255).astype(np.uint8), lx(x), lx(CT_TOP))
    d = ImageDraw.Draw(img)
    for k in range(3):                                        # 三格門片
        px = x + 6 + (w - 12) * k / 3
        pw = (w - 12) / 3 - 5
        lrect(d, px, CT_TOP + 6, pw, CT_BOT - CT_TOP - 15, shade(WOOD_M, .74))
        _paste(img, np.asarray(wood(lx(pw - 2), lx(CT_BOT - CT_TOP - 17), shade(WOOD_M, .93),
                                    3100 + k, vertical=True, period=9.0, warp=2.2,
                                    contrast=.13), dtype=np.uint8),
               lx(px + 1), lx(CT_TOP + 7))
        d = ImageDraw.Draw(img)
        lrect(d, px + 1, CT_TOP + 7, pw - 2, 1, shade(WOOD_M, 1.28))
        lrect(d, px, CT_TOP + 6, 1, CT_BOT - CT_TOP - 15, shade(WOOD_M, .62))
        d.ellipse([lx(px + pw * .5 - 1.2), lx(CT_BOT - CT_TOP + CT_TOP - 14),
                   lx(px + pw * .5 + 1.2), lx(CT_BOT - 11)], fill=BRASS)
    lrect(d, x, CT_TOP, w, 1, shade(WOOD_M, 1.55))
    lrect(d, x, CT_BOT - 4, w, 4, shade(WOOD_M, .46))         # 踢腳
    lrect(d, x, CT_BOT - 5, w, 1, shade(WOOD_M, .70))


def draw_speaker(d, x, y, w, h):
    lrect(d, x, y, w, h, (36, 34, 34))
    lrect(d, x, y, w, 1, (86, 82, 78))
    lrect(d, x, y, 1, h, (66, 62, 60))
    lrect(d, x + w - 1, y, 1, h, (18, 16, 16))
    lrect(d, x, y + h - 1, w, 1, (16, 14, 14))
    cx = x + w / 2
    for cy, r in ((y + h * .30, w * .30), (y + h * .70, w * .20)):
        d.ellipse([lx(cx - r), lx(cy - r), lx(cx + r), lx(cy + r)], fill=(20, 18, 18),
                  outline=(104, 100, 96))
        d.ellipse([lx(cx - r * .40), lx(cy - r * .40), lx(cx + r * .40), lx(cy + r * .40)],
                  fill=(64, 60, 58))
        d.ellipse([lx(cx - r * .14), lx(cy - r * .14), lx(cx + r * .14), lx(cy + r * .14)],
                  fill=(110, 104, 100))


def draw_turntable(d, x, y, w, h):
    lrect(d, x, y + 2, w, h - 2, (28, 28, 30))
    lrect(d, x, y + 2, w, 2, (78, 76, 74))
    lrect(d, x, y + h - 1, w, 1, (12, 12, 12))
    cx, cy = x + w * .40, y + h * .58
    rx, ry = w * .32, h * .34
    d.ellipse([lx(cx - rx), lx(cy - ry), lx(cx + rx), lx(cy + ry)], fill=(16, 16, 18),
              outline=(84, 82, 80))
    for k in range(3):
        d.ellipse([lx(cx - rx * (.8 - k * .2)), lx(cy - ry * (.8 - k * .2)),
                   lx(cx + rx * (.8 - k * .2)), lx(cy + ry * (.8 - k * .2))], outline=(48, 46, 46))
    d.ellipse([lx(cx - rx * .30), lx(cy - ry * .30), lx(cx + rx * .30), lx(cy + ry * .30)],
              fill=(214, 78, 52))
    d.line([(lx(x + w * .88), lx(y + h * .28)), (lx(cx + rx * .55), lx(cy + ry * .30))],
           fill=(206, 204, 200), width=2)
    d.ellipse([lx(x + w * .82), lx(y + h * .18), lx(x + w * .95), lx(y + h * .40)],
              fill=(154, 152, 150), outline=(56, 54, 54))


def draw_amp(d, x, y, w, h):
    lrect(d, x, y, w, h, (48, 46, 44))
    lrect(d, x, y, w, 1, (118, 114, 108))
    lrect(d, x + w - 1, y, 1, h, (20, 20, 20))
    lrect(d, x + 2, y + 2, w * .40, h - 5, (26, 42, 32))
    d.line([(lx(x + 3), lx(y + h - 3)), (lx(x + 2 + w * .32), lx(y + 3))],
           fill=(216, 198, 122), width=1)
    for i in range(3):
        cx = x + w * (.60 + i * .13)
        d.ellipse([lx(cx - 1.8), lx(y + h * .38), lx(cx + 1.8), lx(y + h * .38 + 3.6)],
                  fill=(196, 192, 186), outline=(30, 30, 30))


def draw_flat_sleeve(d, x, y, w, dust):
    """攤平在檯面上的封套：劇本寫「封套邊緣磨損嚴重、顯然塵封已久」。
    檯面是往右後方偏的平行四邊形，所以封套壓扁成 0.42 高、跟著偏。"""
    base = (198, 188, 164) if dust else (178, 166, 142)
    hgt, off = w * .42, w * .34
    pts = [(x, y), (x + w, y), (x + w + off, y + hgt), (x + off, y + hgt)]
    d.polygon([(lx(a), lx(b)) for a, b in pts], fill=base)
    d.polygon([(lx(a), lx(b)) for a, b in pts], outline=shade(base, .62))
    d.line([(lx(x), lx(y)), (lx(x + w), lx(y))], fill=shade(base, 1.20), width=1)
    d.ellipse([lx(x + off * .5 + w * .18), lx(y + hgt * .22),
               lx(x + off * .5 + w * .82), lx(y + hgt * .80)], outline=shade(base, .74))
    for _ in range(int(w * 3)):                      # 磨損的邊角
        t = random.random()
        d.point((lx(x + w * t), lx(y) + random.randint(0, 2)), fill=shade(base, 1.28))
        d.point((lx(x + off + w * t), lx(y + hgt) - random.randint(0, 2)),
                fill=shade(base, .78))


def sleeves(d, x, y, w, h, n, lean=1.0):
    sw = w / n
    for i in range(n):
        c = random.choice(SLEEVE_C)
        sx = x + i * sw
        top = y + random.random() * lean
        d.polygon([(lx(sx), lx(top + lean)), (lx(sx + sw * .90), lx(top)),
                   (lx(sx + sw * .90), lx(y + h)), (lx(sx), lx(y + h))], fill=c)
        d.line([(lx(sx), lx(top + lean)), (lx(sx), lx(y + h))], fill=shade(c, 1.32), width=1)
        d.line([(lx(sx + sw * .90), lx(top)), (lx(sx + sw * .90), lx(y + h))],
               fill=shade(c, .52), width=1)
        if random.random() < .45:
            ty = top + (y + h - top) * random.uniform(.15, .7)
            d.line([(lx(sx + .6), lx(ty)), (lx(sx + sw * .70), lx(ty))],
                   fill=shade(c, 2.0) if sum(c) < 380 else shade(c, .35), width=1)


def face_out(img, d, x, y, w, h):
    """櫃子裡的唱片面朝外、一張疊一張往後倒：看得到真的封面，跟參考圖一樣。"""
    pool = [p for p in sorted(os.listdir(os.path.join(ART, 'covers')))
            if p.endswith('.jpg')] if os.path.isdir(os.path.join(ART, 'covers')) else []
    if not pool:
        sleeves(d, x, y, w, h, max(12, int(w / 2.6)), lean=1.8)
        return
    cw = min(h * 1.02, w * .34)                      # 封面邊長（邏輯）
    step = cw * .46
    n = max(2, int((w - cw) / step) + 1)
    picks = random.sample(pool, min(n, len(pool)))
    while len(picks) < n:
        picks.append(random.choice(pool))
    for i in range(n - 1, -1, -1):                   # 由後往前畫，前面那張蓋住後面
        cx = x + i * step
        lean = (n - 1 - i) * .5
        px, py, pw_ = lx(cx), lx(y + lean), lx(cw)
        try:
            cv = Image.open(os.path.join(ART, 'covers', picks[i])).convert('RGB')
        except Exception:
            continue
        cv = cv.resize((pw_, pw_), Image.LANCZOS)
        k = 1.0 - (i / max(1, n - 1)) * .42          # 越後面越暗
        cv = Image.fromarray((np.asarray(cv, dtype=np.float32) * k).astype(np.uint8), 'RGB')
        img.paste(cv, (px, py))
        d = ImageDraw.Draw(img)
        d.rectangle([px, py, px + pw_ - 1, py + pw_ - 1], outline=(28, 22, 16))
        d.line([(px + pw_ - 1, py), (px + pw_ - 1, py + pw_ - 1)], fill=(12, 10, 8), width=2)
    d = ImageDraw.Draw(img)


def draw_bin(d, x, y, w, h):
    """挖寶櫃：木櫃 + 凹進去的內槽 + 插滿的唱片 + 擋住下半截的前緣板。"""
    slot = h * .62
    lrect(d, x, y, w, h, WOOD_M)                                   # 櫃體
    lrect(d, x + 4, y + 2, w - 8, slot, shade(WOOD_D, 1.02))       # 內槽
    lrect(d, x + 4, y + 2, w - 8, 2, shade(WOOD_D, .70))
    face_out(_IMG[0], d, x + 5, y + 2, w - 10, slot - 1)
    fh = lx(h - slot - 2)                                          # 前緣板
    fa = np.asarray(wood(lx(w), fh, WOOD_M, 4000 + int(x), vertical=False,
                         period=11.0, warp=2.4, contrast=.15), dtype=np.float32)
    fa *= np.linspace(1.12, .62, fh, dtype=np.float32)[:, None, None]
    _paste(_IMG[0], np.clip(fa, 0, 255).astype(np.uint8), lx(x), lx(y + slot + 2))
    d = ImageDraw.Draw(_IMG[0])
    lrect(d, x, y + slot + 2, w, 1, shade(WOOD_M, 1.62))
    lrect(d, x, y, 4, h, shade(WOOD_M, 1.22))                      # 左右側板
    lrect(d, x + w - 4, y, 4, h, shade(WOOD_M, .62))
    lrect(d, x, y, w, 1, shade(WOOD_M, 1.45))
    lrect(d, x, y + h - 3, w, 3, shade(WOOD_M, .42))
    cw, ch = 21, 8                                                 # 分類牌
    cx0, cy0 = x + w * .5 - cw / 2, y + slot + (h - slot) * .38
    lrect(d, cx0, cy0, cw, ch, (232, 224, 200), outline=(120, 96, 62))
    fz = ImageFont.truetype(F_BOLD, lx(4.6))
    d.text((lx(cx0 + cw / 2), lx(cy0 + 1.6)), random.choice(['ROCK A-Z', 'JAZZ 500', 'NEW IN']),
           font=fz, fill=(60, 46, 30), anchor='ma')


def draw_box(d, x, y, w, h):
    """紙箱：立起來的四面 + 沉進去的唱片 + 翻出來的箱蓋。"""
    slot = h * .50
    lrect(d, x, y, w, h, CARD_A)
    for i in range(lx(h)):
        rect(d, lx(x), lx(y) + i, lx(w), 1, shade(CARD_A, 1.06 - (i / lx(h)) * .34))
    lrect(d, x + 3, y + 2, w - 6, slot, shade(CARD_D, .80))        # 箱內
    sleeves(d, x + 4, y + 3, w - 8, slot - 1, max(9, int(w / 3.0)), lean=1.5)
    lrect(d, x - 3, y + slot + 2, w + 6, 5, CARD_B)                # 翻出來的箱蓋
    lrect(d, x - 3, y + slot + 2, w + 6, 1, shade(CARD_A, 1.24))
    lrect(d, x - 3, y + slot + 6, w + 6, 1, shade(CARD_D, .84))
    lrect(d, x + w * .46, y + slot + 8, 1, h - slot - 11, CARD_D)  # 摺線
    lrect(d, x, y, 3, h, shade(CARD_A, 1.14))
    lrect(d, x + w - 3, y, 3, h, shade(CARD_D, .96))
    lrect(d, x, y + h - 3, w, 3, shade(CARD_D, .72))
    lrect(d, x + w * .06, y + slot + 9, w * .26, 3, (218, 206, 176))    # 膠帶
    lw_, lh_ = w * .46, h - slot - 14
    if lh_ >= 7:                                                       # 手寫紙標
        lx0, ly0 = x + w * .40, y + slot + 10
        lrect(d, lx0, ly0, lw_, lh_, (238, 232, 212), outline=(150, 128, 96))
        fz = ImageFont.truetype(F_CJK, lx(min(6.5, lh_ - 2.5)))
        d.text((lx(lx0 + lw_ / 2), lx(ly0 + 1)), random.choice(['一片100', '雜盤', '未整理']),
               font=fz, fill=(74, 56, 36), anchor='ma')


_IMG = [None]


def _paste(img, arr, x, y):
    img.paste(Image.fromarray(arr, 'RGB'), (x, y))


def shadow(img, x, y, w, h, blur=5, alpha=118):
    sh = Image.new('RGBA', (lx(w) + blur * 6, lx(h) + blur * 6), (0, 0, 0, 0))
    ImageDraw.Draw(sh).ellipse([blur * 2, blur * 2, lx(w) + blur * 4, lx(h) + blur * 4],
                               fill=(0, 0, 0, alpha))
    img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(blur)),
                        (lx(x) - blur * 3, lx(y) - blur * 3))


# ══════════════════════════════════════════════════════════════════
def build_bg():
    img = Image.new('RGBA', (W, H), (0, 0, 0, 255))
    d = ImageDraw.Draw(img)
    draw_wall(img, d)
    d = ImageDraw.Draw(img)
    draw_floor(img, d)
    d = ImageDraw.Draw(img)
    draw_skirt(d)
    draw_rug(d)
    draw_cover_wall(img, d)
    d = ImageDraw.Draw(img)
    draw_doorway(img, d)
    room_shadow(img)
    return img


def build_fg():
    img = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    _IMG[0] = img
    shadow(img, CT_X - 6, CT_BOT - 10, CT_W + 12, 14, blur=6, alpha=130)
    d = ImageDraw.Draw(img)
    draw_counter(img, d)
    draw_speaker(d, 146, 170, 23, CT_TOP - 170 - CT_D + 5)
    draw_amp(d, 175, 184, 33, CT_TOP - 184 - CT_D + 5)
    draw_turntable(d, 214, 178, 52, CT_TOP - 178 - CT_D + 5)
    draw_flat_sleeve(d, 284, 192, 16, True)          # 檯上塵封已久的兩張
    draw_flat_sleeve(d, 299, 190, 16, False)
    for i in range(4):                               # 一疊牛皮紙袋
        lrect(d, 268 - i * .6, 194 - i * 1.1, 13, 3, (188, 156, 112) if i % 2 else (176, 144, 100))
        lrect(d, 268 - i * .6, 194 - i * 1.1, 13, 1, (214, 186, 146))
    lrect(d, 318, 186, 12, 10, (74, 70, 68))         # 收銀鐵盒
    lrect(d, 318, 186, 12, 2, (128, 122, 116))
    lrect(d, 322, 188, 4, 1, (196, 190, 182))
    shadow(img, 248, 274, 124, 12, blur=6, alpha=125)
    d = ImageDraw.Draw(img)
    draw_bin(d, 262, 234, 118, 58)
    shadow(img, 208, 300, 70, 10, blur=5, alpha=112)
    d = ImageDraw.Draw(img)
    draw_box(d, 206, 278, 66, 34)
    draw_box(d, 284, 292, 76, 28)
    return img


def main():
    build_bg().convert('RGB').save(os.path.join(ART, 'shop-bg.jpg'), quality=90,
                                   subsampling=0, optimize=True)
    build_fg().save(os.path.join(ART, 'shop-fg.png'), optimize=True)
    for k in range(3):
        door_panel(k).save(os.path.join(ART, f'shop-door-{k}.png'), optimize=True)
    for f in ('shop-bg.jpg', 'shop-fg.png', 'shop-door-0.png', 'shop-door-1.png',
              'shop-door-2.png'):
        p = os.path.join(ART, f)
        print(f'{f:20s} {os.path.getsize(p)/1024:7.1f} KB  {Image.open(p).size}')


if __name__ == '__main__':
    main()
