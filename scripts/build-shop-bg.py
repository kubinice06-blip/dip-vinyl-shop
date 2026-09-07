#!/usr/bin/env python3
"""唱片行舞台的像素背景圖產生器（序章 RPG 場景用）。

為什麼是腳本產圖而不是 CSS：牆面木紋、逐張唱片的封套、紙箱摺線這種密度，
CSS 漸層畫不出來；改成一次算好一張 PNG，前台只要一個 background-image。
要改陳列就改這支腳本再跑一次，不是去 HTML 裡調幾十條漸層。

    python3 scripts/build-shop-bg.py

輸出：art/shop-room.png（540×232，1 圖素＝1 CSS px；前台 image-rendering:pixelated）

座標約定（重要，前台的站位要跟這裡對齊）：
  · 圖從舞台左邊貼齊（background-position:left bottom），所以**站位一律用 px、不要用 %**，
    這樣手機（可視約 358px）與桌機（最寬約 532px）看到的家具位置才會一致，寬螢幕只是多露出右邊。
  · 走道 x 0–160 地板淨空（門口、玩家、老闆、男子都站這段）。
  · 櫃檯 x 130–255（老闆站後面，腳被檯身擋住）。前景挖寶櫃與紙箱一律 x>168。
"""
import math, os, random
from PIL import Image, ImageDraw

W, H = 540, 232
FLOOR_Y = 168          # 牆與地板的交界
SKIRT_H = 6            # 踢腳板

random.seed(20260907)   # 固定亂數：每次產出的木紋與封面完全一樣，diff 才有意義

# ── 色盤（與遊戲既有的像素色盤同調）──────────────────────────────
WALL_A, WALL_B = (196, 154, 96), (204, 163, 104)
WALL_SEAM      = (163, 122, 70)
SKIRT          = (120, 84, 44)
FLOOR_A, FLOOR_B = (150, 108, 62), (163, 119, 70)
FLOOR_SEAM     = (105, 72, 38)
WOOD_D, WOOD_L = (63, 42, 22), (141, 106, 69)
CARD_A, CARD_B = (196, 154, 99), (168, 128, 78)   # 紙箱
INK            = (42, 28, 14)

# 封面用色（Blue Note／City Pop 那味）
# 封面：底色偏印刷品（深藍／墨黑／米白／磚紅／橄欖），前景多半是米白或墨黑的「字」
COVER_BG = [(29,64,110),(24,24,28),(226,216,190),(150,40,42),(62,86,60),(186,122,52),
            (74,58,96),(46,110,116),(206,170,86),(96,62,38),(18,40,74),(120,64,44)]
COVER_FG = [(232,224,200),(24,24,28),(214,178,92),(178,54,52),(232,224,200),(240,238,230)]
SLEEVE   = [(193,22,40),(31,95,174),(232,220,192),(240,199,94),(46,125,82),(106,63,160),
            (224,133,28),(63,182,201),(17,17,17),(141,85,36),(255,255,255),(90,90,90)]


def rect(d, x, y, w, h, fill, outline=None):
    d.rectangle([x, y, x + w - 1, y + h - 1], fill=fill, outline=outline)


def shade(c, k):
    """把顏色調亮(k>1)或調暗(k<1)。"""
    return tuple(max(0, min(255, int(v * k))) for v in c)


# ══ 牆：直向木板＋木紋 ═══════════════════════════════════════════
def draw_wall(d):
    plank = 27
    for i, x in enumerate(range(0, W, plank)):
        base = WALL_A if i % 2 == 0 else WALL_B
        base = shade(base, 1 + (random.random() - .5) * .06)
        rect(d, x, 0, plank - 1, FLOOR_Y, base)
        d.line([(x + plank - 1, 0), (x + plank - 1, FLOOR_Y)], fill=WALL_SEAM)
        # 木紋：幾條淡淡的縱向弧線
        for _ in range(3):
            gx = x + random.randint(3, plank - 5)
            gy = random.randint(-20, FLOOR_Y - 30)
            gl = random.randint(30, 90)
            col = shade(base, .93 if random.random() < .7 else 1.06)
            for t in range(gl):
                yy = gy + t
                if 0 <= yy < FLOOR_Y:
                    d.point((gx + int(math.sin(t / 13) * 1.4), yy), fill=col)
    # 上緣壓深（天花板陰影）
    for y in range(0, 46):
        a = (46 - y) / 46 * .30
        d.line([(0, y), (W, y)], fill=(0, 0, 0, 0)) if False else None
        ov = Image.new('RGBA', (W, 1), (0, 0, 0, int(a * 255)))
        d._image.paste(Image.alpha_composite(
            d._image.crop((0, y, W, y + 1)).convert('RGBA'), ov).convert('RGB'), (0, y))
    rect(d, 0, FLOOR_Y - SKIRT_H, W, SKIRT_H, SKIRT)


# ══ 地板：橫向木條，越靠前越亮、板越高 ═══════════════════════════
def draw_floor(d):
    y = FLOOR_Y
    row = 0
    while y < H:
        hgt = 9 + row * 2                      # 近大遠小
        base = FLOOR_A if row % 2 == 0 else FLOOR_B
        base = shade(base, 1 + row * .035)
        rect(d, 0, y, W, min(hgt, H - y), base)
        d.line([(0, y), (W, y)], fill=FLOOR_SEAM)
        # 板與板之間的直向接縫，每排錯開
        off = (row * 37) % 80
        for x in range(off, W, 78):
            d.line([(x, y), (x, min(y + hgt, H) - 1)], fill=shade(base, .88))
        # 木紋斑點
        for _ in range(int(W / 26)):
            gx, gy = random.randint(0, W - 1), y + random.randint(1, max(1, hgt - 2))
            if gy < H:
                d.line([(gx, gy), (gx + random.randint(3, 9), gy)], fill=shade(base, .94))
        y += hgt
        row += 1


def drop_shadow(d, x, y, w, h=3):
    """家具底下的一條淺影，讓東西「站」在地板上。"""
    for i in range(h):
        d.line([(x + i, y + i), (x + w - i, y + i)], fill=shade(FLOOR_A, .82 + i * .05))


# ══ 門＋門上的鈴鐺 ═══════════════════════════════════════════════
def draw_door(d, x=14, y=30, w=66, h=138):
    rect(d, x - 3, y - 3, w + 6, h + 3, (99, 68, 33))          # 門框
    rect(d, x, y, w, h, (63, 116, 181), outline=(42, 76, 120))
    rect(d, x + 6, y + 6, w - 12, h - 12, (77, 132, 198), outline=(42, 76, 120))
    rect(d, x + 12, y + 12, w - 24, 52, (94, 148, 210), outline=(42, 76, 120))   # 上玻璃
    rect(d, x + 12, y + 74, w - 24, h - 88, (94, 148, 210), outline=(42, 76, 120))
    rect(d, x + w - 12, y + 66, 5, 5, (184, 134, 11), outline=INK)               # 門把
    # 鈴鐺
    bx, by = x + w - 16, y - 16
    rect(d, bx + 3, by, 3, 4, (120, 84, 20))
    d.ellipse([bx, by + 3, bx + 9, by + 11], fill=(184, 134, 11), outline=(120, 84, 20))
    rect(d, bx + 3, by + 11, 3, 2, (120, 84, 20))


# ══ 迷你封面：七種構圖，畫在 s×s 的方框裡 ═════════════════════════
def type_bars(d, x, y, w, col, n=2, gap=3):
    """用 1–2px 的橫條假裝印刷字（藝人名／專輯名），比真的畫字更像遠看的封面。"""
    yy = y
    for i in range(n):
        bw = int(w * random.uniform(.45, .95))
        rect(d, x, yy, bw, 2 if i == 0 else 1, col)
        yy += gap


def mini_cover(d, x, y, s, style=None):
    """31px 見方的封面。遠看要像印刷品，所以一律「大色塊＋字條」，
    人像用偏心的側身剪影（置中會變成一盞燈）。"""
    bg = random.choice(COVER_BG)
    fg = random.choice([c for c in COVER_FG if abs(sum(c) - sum(bg)) > 170])
    style = style if style is not None else random.choice([0, 0, 1, 2, 3, 4, 5, 6])
    rect(d, x, y, s, s, bg)
    if style == 0:            # 雙色調照片：暗場加幾團亮斑（31px 畫人臉只會變成一盞燈，所以不畫人）
        rect(d, x, y, s, s, shade(bg, .55))
        for _ in range(random.randint(2, 4)):
            bx = x + random.randint(2, s - 12)
            by = y + random.randint(2, int(s * .62))
            bw, bh = random.randint(5, 12), random.randint(4, 9)
            d.ellipse([bx, by, bx + bw, by + bh], fill=shade(bg, random.choice([.85, 1.25, 1.5])))
        rect(d, x, y + s - int(s * .22), s, int(s * .22), shade(bg, 1.15))
        type_bars(d, x + 3, y + s - int(s * .18), s - 8, shade(fg, .9), 2)
    elif style == 1:          # 上標題、下大色塊
        type_bars(d, x + 3, y + 4, s - 6, fg, 2)
        rect(d, x + 3, y + int(s * .38), s - 6, int(s * .54), shade(bg, .5))
        rect(d, x + int(s * .20), y + int(s * .50), int(s * .46), int(s * .28), shade(fg, .75))
    elif style == 2:          # 置中黑膠
        r = int(s * .32)
        cx, cy = x + s // 2, y + int(s * .44)
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(22, 22, 24))
        d.ellipse([cx - r + 3, cy - r + 3, cx + r - 3, cy + r - 3], outline=shade(fg, .55))
        d.ellipse([cx - 3, cy - 3, cx + 3, cy + 3], fill=fg)
        type_bars(d, x + 3, y + s - 9, s - 8, fg, 1)
    elif style == 3:          # 城市天際線
        rect(d, x, y, s, int(s * .58), shade(bg, 1.3))
        for bx in range(x + 2, x + s - 2, 4):
            bh = random.randint(int(s * .16), int(s * .42))
            rect(d, bx, y + int(s * .60) - bh, 3, bh, shade(bg, .45))
        rect(d, x, y + int(s * .60), s, s - int(s * .60), shade(bg, .8))
        type_bars(d, x + 3, y + int(s * .70), s - 8, fg, 1)
    elif style == 4:          # 大字報（滿版字）
        type_bars(d, x + 3, y + int(s * .16), s - 6, fg, 3, 5)
        rect(d, x + 3, y + int(s * .72), int(s * .42), 3, shade(fg, .65))
    elif style == 5:          # 左照片右留白
        rect(d, x, y, int(s * .54), s, shade(bg, .5))
        type_bars(d, x + int(s * .60), y + int(s * .20), int(s * .34), fg, 3, 5)
    else:                     # 幾何：粗框＋中央方塊（前衛盤）
        rect(d, x + 3, y + 3, s - 6, s - 6, shade(bg, .5))
        rect(d, x + int(s * .28), y + int(s * .28), int(s * .44), int(s * .44), fg)
        type_bars(d, x + 3, y + s - 7, int(s * .5), fg, 1)
    d.rectangle([x, y, x + s - 1, y + s - 1], outline=INK)
    d.line([(x + 1, y + 1), (x + s - 2, y + 1)], fill=shade(bg, 1.4))
    d.line([(x + 1, y + 1), (x + 1, y + s - 2)], fill=shade(bg, 1.22))


# ══ 牆上的封面展示牆 ═════════════════════════════════════════════
def draw_cover_wall(d, x0=205, y0=22, cols=9, rows=4, s=31, gap=4):
    for r in range(rows):
        for c in range(cols):
            x = x0 + c * (s + gap)
            y = y0 + r * (s + gap)
            if x + s > W - 4:
                continue
            d.rectangle([x + 1, y + 1, x + s, y + s], fill=(96, 68, 33))   # 影子
            mini_cover(d, x, y, s)


# ══ 牆上層架：唱片書背 ═══════════════════════════════════════════
def draw_shelf(d, x, y, w, h=27):
    rect(d, x - 2, y - 2, w + 4, h + 4, (74, 54, 32))
    rect(d, x, y, w, h, (52, 36, 20))
    cx = x + 2
    while cx < x + w - 2:
        cw = random.choice([2, 3, 3, 4])
        if cx + cw > x + w - 2:
            break
        col = random.choice(SLEEVE)
        rect(d, cx, y + 2, cw, h - 4, col)
        d.line([(cx + cw - 1, y + 2), (cx + cw - 1, y + h - 3)], fill=shade(col, .7))
        cx += cw
    rect(d, x - 3, y + h + 2, w + 6, 4, (74, 54, 32))      # 托板
    drop_shadow(d, x - 3, y + h + 6, w + 6, 2)


# ══ 櫃檯＋器材 ═══════════════════════════════════════════════════
def draw_counter(d, x=130, y=150, w=125, h=50):
    drop_shadow(d, x, y + h, w)
    rect(d, x, y + 7, w, h - 7, (107, 74, 43), outline=(63, 42, 22))       # 檯身
    rect(d, x, y, w, 8, (141, 106, 69), outline=(63, 42, 22))              # 檯面
    for px in (x + 10, x + w - 34):                                        # 前面兩片門板
        rect(d, px, y + 16, 24, h - 26, shade((107, 74, 43), .92), outline=(82, 57, 33))
    # 喇叭
    sx, sy = x + 6, y - 32
    rect(d, sx, sy, 20, 32, (26, 26, 26), outline=(70, 70, 70))
    for cy, r in ((sy + 6, 6), (sy + 21, 4)):
        d.ellipse([sx + 10 - r, cy - r, sx + 10 + r, cy + r], fill=(58, 58, 58), outline=(110, 110, 110))
    # 唱盤
    tx, ty = x + 34, y - 20
    rect(d, tx, ty, 52, 20, (216, 210, 196), outline=(107, 99, 87))
    d.ellipse([tx + 5, ty + 3, tx + 5 + 26, ty + 3 + 14], fill=(20, 20, 20), outline=(90, 90, 90))
    d.ellipse([tx + 17, ty + 9, tx + 19, ty + 11], fill=(216, 210, 196))
    d.line([(tx + 45, ty + 3), (tx + 39, ty + 15)], fill=(140, 140, 140))   # 唱臂
    rect(d, tx + 43, ty + 2, 5, 4, (140, 140, 140))
    # 擴大機
    ax, ay = x + 92, y - 14
    rect(d, ax, ay, 30, 14, (185, 180, 168), outline=(107, 99, 87))
    for i in range(2):
        d.ellipse([ax + 4 + i * 9, ay + 5, ax + 8 + i * 9, ay + 9], fill=(50, 50, 50))
    rect(d, ax + 20, ay + 4, 7, 6, (70, 70, 70))
    # 檯面上攤著兩張舊唱片（序章講到的那兩張）
    for i, ox in enumerate((x + 24, x + 44)):
        rect(d, ox, y - 3, 16, 5, shade(random.choice(COVER_BG), .8), outline=INK)


# ══ 挖寶櫃：面向前的唱片，一張一張畫 ═════════════════════════════
def draw_bin(d, x, y, w, h, depth=8):
    drop_shadow(d, x, y + h, w)
    rect(d, x, y, w, h, (107, 74, 43), outline=(63, 42, 22))
    rect(d, x + 2, y + 2, w - 4, h - 12, (52, 36, 20))              # 內槽
    cx = x + 3
    while cx < x + w - 4:
        cw = random.choice([4, 5, 5, 6, 7])
        if cx + cw > x + w - 4:
            break
        col = random.choice(SLEEVE)
        top = y + 3 + random.randint(0, 2)
        rect(d, cx, top, cw, h - 12 - (top - y - 2), col)
        d.line([(cx + cw - 1, top), (cx + cw - 1, y + h - 11)], fill=shade(col, .65))
        if cw >= 6 and random.random() < .5:                        # 露出一點封面圖案
            rect(d, cx + 1, top + 2, cw - 2, 3, shade(col, 1.35))
        cx += cw
    rect(d, x, y + h - 11, w, 11, (141, 106, 69), outline=(63, 42, 22))   # 前擋板
    d.line([(x + 2, y + h - 7), (x + w - 3, y + h - 7)], fill=(107, 74, 43))


# ══ 紙箱：牛皮色＋摺蓋＋露出的唱片 ═══════════════════════════════
def draw_box(d, x, y, w, h):
    drop_shadow(d, x, y + h, w)
    # 箱口露出的唱片
    cx = x + 3
    while cx < x + w - 4:
        cw = random.choice([3, 4, 5])
        if cx + cw > x + w - 4:
            break
        rect(d, cx, y - 8, cw, 9, random.choice(SLEEVE))
        cx += cw
    rect(d, x, y, w, h, CARD_A, outline=(120, 84, 44))
    rect(d, x, y, w, 5, CARD_B, outline=(120, 84, 44))              # 掀開的蓋
    d.line([(x + w // 2, y + 5), (x + w // 2, y + h - 2)], fill=(160, 120, 72))
    rect(d, x + 4, y + h - 12, w - 8, 6, shade(CARD_A, .92))        # 標籤


def main():
    img = Image.new('RGB', (W, H), WALL_A)
    d = ImageDraw.Draw(img)
    d._image = img          # draw_wall 的天花板陰影要直接動到影像

    draw_wall(d)
    draw_floor(d)
    draw_door(d)
    draw_shelf(d, 95, 44, 100)
    draw_shelf(d, 95, 100, 82)
    draw_cover_wall(d)
    draw_counter(d)
    draw_bin(d, 172, 186, 128, 44)     # 前景挖寶櫃（走道右邊）
    draw_box(d, 312, 198, 46, 32)
    draw_box(d, 364, 202, 40, 28)
    draw_bin(d, 414, 178, 118, 40)     # 寬螢幕才看得到的第二個挖寶櫃
    draw_box(d, 452, 206, 44, 26)

    out = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'art')
    os.makedirs(out, exist_ok=True)
    p = os.path.join(out, 'shop-room.png')
    img.save(p)
    print('wrote', p, img.size, os.path.getsize(p) // 1024, 'KB')


if __name__ == '__main__':
    main()
