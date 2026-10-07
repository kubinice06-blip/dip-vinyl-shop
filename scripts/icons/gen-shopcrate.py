# 首頁「店內挖寶」唱片箱像素圖（index.html HUB_PIX.shopcrate）生成器：python3 gen-shopcrate.py 印出 32 列，貼回 index.html。
import json, math
W = H = 32
X0, Y0 = 2, 23
LU, LV, HZ = 7.5, 6.5, 6
def P(u, v, z): return (X0 + 2*u + 2*v, Y0 + u - v - z)
grid = [['.']*W for _ in range(H)]
def fill(poly, c):
    for y in range(H):
        for x in range(W):
            px, py = x + 0.5, y + 0.5
            inside = False
            for i in range(len(poly)):
                (x1, y1), (x2, y2) = poly[i], poly[i-1]
                if (y1 > py) != (y2 > py):
                    if px < x1 + (py - y1) * (x2 - x1) / (y2 - y1): inside = not inside
            if inside: grid[y][x] = c
def line(a, b, c):
    (x1, y1), (x2, y2) = P(*a), P(*b)
    n = int(max(abs(x2-x1), abs(y2-y1)) * 4) + 1
    for i in range(n + 1):
        t = i / n
        x, y = x1 + (x2-x1)*t, y1 + (y2-y1)*t
        xi, yi = int(math.floor(x + 0.001)), int(math.floor(y + 0.001))
        if 0 <= xi < W and 0 <= yi < H: grid[yi][xi] = c
def face(pts): return [P(*p) for p in pts]

# 箱口後兩邊先畫，讓唱片蓋過去
line((0,0,HZ),(0,LV,HZ),'k'); line((0,LV,HZ),(LU,LV,HZ),'k')
# 唱片：平行長牆的直立薄片，後→前；每張先擦掉自己擋住的區域再勾頂邊與右端書背
u0, u1 = 0.5, LU - 0.5
recs = [(5.6, 11.5), (4.4, 12.5), (3.2, 12.0), (2.0, 13.0), (0.8, 12.0)]
GOLD = 3
for i, (v, top) in enumerate(recs):
    c = 'g' if i == GOLD else 'k'
    fill(face([(u0, v, 0), (u1, v, 0), (u1, v, top), (u0, v, top)]), '.')
    line((u0, v, top), (u1, v, top), c)
    line((u1, v, HZ), (u1, v, top), c)
    line((u0, v, HZ), (u0, v, top), c)
# 箱子：前長牆＋右短牆，擦掉再勾邊
fill(face([(0, 0, 0), (LU, 0, 0), (LU, 0, HZ), (0, 0, HZ)]), '.')
fill(face([(LU, 0, 0), (LU, LV, 0), (LU, LV, HZ), (LU, 0, HZ)]), '.')
for a, b in [((0,0,0),(LU,0,0)), ((LU,0,0),(LU,LV,0)),
             ((0,0,0),(0,0,HZ)), ((LU,0,0),(LU,0,HZ)), ((LU,LV,0),(LU,LV,HZ)),
             ((0,0,HZ),(LU,0,HZ)), ((LU,0,HZ),(LU,LV,HZ))]:
    line(a, b, 'k')
rows = [''.join(r) for r in grid]
json.dump(rows, open('shopcrate-rows.json', 'w'))
print('\n'.join(rows))
