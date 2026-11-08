# notes-F1 — 第二波開工前的修正：走位不准跨過中島（FIXLIST 第 1 項）

分支 `claude/card-game-fun-lab`（直接在 /home/user/dip-vinyl-shop 工作）。主線待修清單 FIXLIST 第 1 項；店主：「不要跨過中島唱片區」。

## 問題
A2 路線圖 counter→mid（4）、pay→leaving（6）、sale→pay（13）在美術格 y≈112–128 橫越中島最上排（R&B／OST）。
原因：避障與 check-shops 用的「腳下範圍 foot」＝道具的地面那塊 `[x, y−d, w, d]`；斜俯視裡人的腳＝畫面上那一格，
腳落在箱子「畫出來的範圍」裡（地面那塊的後面、箱身與唱片那一段）就是被箱子蓋住腳＝看起來走在箱子裡。

## 做法（決定）
- 腳下範圍改成「量道具實際畫出來的範圍」：左右＝畫出來的最左到最右；上緣＝最上面一列連續 ≥3 格不透明的那列
  （1–2 格寬的細柱：箱子的鉻管、燈桿、耳機線不算）；下緣＝地板前緣 o.y（地上半透明影子不算）；再跟 foot 取聯集。
- 中島 10 箱（isl-0a…crate-tw）在 dip.json `footprints.groups.island` 合成一塊多邊形（欄間 ≤2 格的縫補起來）。
- 櫃檯、唱盤台 `footprints.walkBehind`：老闆站在後面（spots.counter、ref，被擋住腳是故意的），只算地面那塊（x 照畫出來的）。
- 避障（navObstacles）＝同一份腳下範圍加 navMargin；check-shops、shop.test、stage-harness 路線圖都用同一份（多邊形）。
- mid、leaving 原本就站在中島最上排的畫面範圍裡（leaving [150,110] 在 OST 箱上），移到後走道（後牆矮櫃前緣 y90 與中島上緣 y104 之間）。

## 進度
- [ ] shop.js：量畫出來的範圍、footprints、多邊形避障
- [ ] dip.json：footprints、nav、mid／leaving
- [ ] check-shops、shop.test、hit.test、stage-harness
- [ ] 路線圖（390×664＋腳下範圍）、走到一半的截圖
- [ ] 測試全跑、v4/base-B

## 測試結果

## 截圖
