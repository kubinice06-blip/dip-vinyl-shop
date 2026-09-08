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

# ── 比例（重要）──────────────────────────────────────────────
# 用場景裡已知的東西回推尺度：櫃檯上那顆書架喇叭約 41 邏輯 px 寬 ≒ 30cm
# → **1.37 邏輯 px / cm**（原圖座標再 ×4 ＝ 5.5 原圖 px / cm）。
# 折疊長桌取 150cm 寬 × 70cm 高 → 205×96 邏輯 → 820×384 原圖 px。
# 第一版做成 620×196（＝70cm 只有 49 邏輯）明顯偏矮，跟櫃檯、唱片櫃對不起來。
W, H = 850, 540           # 原圖座標（1 邏輯 px = 4）
TOP_FRONT_Y = 132         # 桌面前緣
DEPTH, SKEW = 84, 60      # 桌面進深、往右後方的偏移
THICK = 24                # 桌板厚度
LEG_BOT = 516             # 桌腳到哪一列（桌面到地 384 ＝ 70cm）

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
    for lx_, is_back in ((x0 + 34, False), (x1 - 128, False),
                         (x0 + 34 + SKEW, True), (x1 - 128 + SKEW, True)):
        top = (yB + THICK) if is_back else (yF + THICK)
        bot = LEG_BOT - (46 if is_back else 0)
        c = LEG if not is_back else (44, 42, 44)
        d.rectangle([lx_, top, lx_ + 13, bot], fill=c, outline=INK)
        d.rectangle([lx_ + 2, top, lx_ + 4, bot - 1], fill=LEG_HI)
        d.line([(lx_ + 6, bot), (lx_ + 6 + (44 if not is_back else 32), top + 30)],
               fill=c, width=7)                      # 斜撐（折疊桌的 X 腳）
    d.rectangle([x0 + 40, LEG_BOT - 64, x1 - 116, LEG_BOT - 56], fill=LEG, outline=INK)

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
    for gx in range(x0 + 24, x1, 58):             # 木紋
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
