#!/usr/bin/env python3
"""畫一張唱片行的折疊長桌（去背 PNG），給 trace-shop-art.py 的 PROPS 用。

為什麼是程式畫不是描圖：桌子就是「一塊板 + 四支細腿」，
全是直線與方塊，這正好是程式畫得好的東西（人臉才不行）。
配色與描邊比照參考圖的像素風：淺色櫸木桌面、深色金屬腳、深棕描邊。

    python3 scripts/make-table.py        # 輸出 art/props/table.png
"""
import os
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'art', 'props', 'table.png')

W, H = 620, 300           # 原圖座標（1 邏輯 px = 4）
TOP_FRONT_Y = 96          # 桌面前緣
DEPTH, SKEW = 62, 46      # 桌面進深、往右後方的偏移
THICK = 18                # 桌板厚度
LEG_BOT = 292             # 桌腳到哪一列

WOOD_T = (216, 176, 120)  # 桌面（受光）
WOOD_F = (188, 146, 92)   # 桌板側面
WOOD_E = (150, 110, 62)   # 桌板下緣
INK    = (74, 44, 26)     # 描邊
LEG    = (58, 56, 58)
LEG_HI = (104, 102, 104)


def main():
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    x0, x1 = 8, W - 8
    yF, yB = TOP_FRONT_Y, TOP_FRONT_Y - DEPTH

    # ── 桌腳（先畫，才會被桌板蓋住上端）──
    for lx_, is_back in ((x0 + 26, False), (x1 - 96, False),
                         (x0 + 26 + SKEW, True), (x1 - 96 + SKEW, True)):
        top = (yB + THICK) if is_back else (yF + THICK)
        bot = LEG_BOT - (34 if is_back else 0)
        c = LEG if not is_back else (44, 42, 44)
        d.rectangle([lx_, top, lx_ + 9, bot], fill=c, outline=INK)
        d.rectangle([lx_ + 1, top, lx_ + 2, bot - 1], fill=LEG_HI)
        # 斜撐（折疊桌的 X 腳）
        d.line([(lx_ + 4, bot), (lx_ + 4 + (30 if not is_back else 22), top + 20)],
               fill=c, width=5)
    # 橫桿
    d.rectangle([x0 + 30, LEG_BOT - 46, x1 - 88, LEG_BOT - 40], fill=LEG, outline=INK)

    # ── 桌板：上面（平行四邊形）＋前緣厚度 ──
    top_poly = [(x0, yF), (x0 + SKEW, yB), (x1 + SKEW, yB), (x1, yF)]
    d.polygon(top_poly, fill=WOOD_T)
    for i in range(DEPTH):                        # 由後往前微微加深，做出縱深
        t = i / DEPTH
        y = yB + i
        xa = x0 + SKEW * (1 - t)
        xb = x1 + SKEW * (1 - t)
        d.line([(xa, y), (xb, y)],
               fill=tuple(int(WOOD_T[k] * (0.93 + t * 0.10)) for k in range(3)))
    for gx in range(x0 + 20, x1, 47):             # 木紋
        d.line([(gx + SKEW, yB + 3), (gx, yF - 2)], fill=(206, 166, 112))
    d.polygon(top_poly, outline=INK)
    d.rectangle([x0, yF, x1, yF + THICK], fill=WOOD_F, outline=INK)
    d.rectangle([x0 + 1, yF + THICK - 4, x1 - 1, yF + THICK - 1], fill=WOOD_E)
    d.line([(x1, yF), (x1 + SKEW, yB)], fill=INK)
    d.polygon([(x1, yF), (x1 + SKEW, yB), (x1 + SKEW, yB + THICK), (x1, yF + THICK)],
              fill=WOOD_E, outline=INK)

    im.save(OUT, optimize=True)
    print(f'{OUT}  {im.size}　桌面前緣 y={yF}、桌板下緣 y={yF+THICK}、桌腳到 y={LEG_BOT}')


if __name__ == '__main__':
    main()
