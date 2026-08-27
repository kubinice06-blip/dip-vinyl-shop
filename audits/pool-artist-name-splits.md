# 稽核：卡池有 6 組掛名分裂造成的重複卡

**日期**：2026-08-23　**發現於**：c-46 配樂線策展
**範圍**：`seed_cards.json` ＋ `apex_pool.json` ＋ 23 份 manifest（12,511 筆）
**方法**：同專輯名下，兩筆藝人名互為子字串者視為疑似分裂（正規化摺 U+2010–2015 連字號與 NFKC）

同一張碟因為**掛名寫法不同**被收成兩張卡。字串鍵擋不住，因為兩個鍵確實不同。

| # | 專輯 | 形態 A | 形態 B | 性質 |
|---|---|---|---|---|
| 1 | Ballads | `John Coltrane` (seed) | `John Coltrane Quartet` (c36-reels) | 1963 Impulse! 同一張 |
| 2 | Night Train | `Oscar Peterson` (seed) | `The Oscar Peterson Trio` (c35-shop-reels) | 1963 Verve 同一張 |
| 3 | async | `坂本龍一` (seed) | `Ryuichi Sakamoto 坂本龍一` (seed) | **兩筆都在 seed，已上線的重複卡** |
| 4 | Norma Jean | `Norma Jean` (seed) | `Norma Jean Wright` (c39-funk) | 1978 Bearsville 同名首作（注意另有同名金屬團，需確認 seed 那筆指的是誰） |
| 5 | The Velvet Underground & Nico | `The Velvet Underground & Nico` (seed) | `The Velvet Underground` (**apex:hall**) | **普卡與王牌重複** |
| 6 | The Miseducation of Lauryn Hill | `Ms. Lauryn Hill` (seed) | `Lauryn Hill` (**apex:hall**) | **普卡與王牌重複** |

## 為什麼要特別處理第 5、6 組

規則明定「已在王牌池的卡不得再以普卡上架」，`pipe-assemble.mjs` 也有 `already-apex` 檢查。
但這兩組是**掛名寫法不同**，該檢查用的是字串鍵，比對不到，所以擋不下來。
這兩張碟目前在站上同時以普卡與王牌存在。

## 為什麼跨批次去重擋不住

roadmap §五之 4 早就記過這個反模式（「杭蓋 Hanggai」「当山/當山」），結論是
**跨批次去重一律用 rgMbid**。但 `seed_cards.json` 的列只有
`[artist, album, 三軸, genres, year]`，**沒有 rgMbid**，所以既有池內的卡之間
無法用 rgMbid 互相去重——只有新批次對舊池能用。這是結構性限制，不是疏忽。

## 建議

1. 第 3、5、6 組是明確要合併的（同一張碟、同一個發行）。第 1、2、4 組建議先確認
   seed 那筆的實際指涉再合併，尤其第 4 組有同名金屬團的干擾。
2. 合併時保留**池內既有的主要形態**當主名，另一種寫法進別名。
3. 屬**線上資料**（`seed_cards.json`／`apex_pool.json` 為上線開關），依規則本環境未修改，
   留店主本機處理。
4. 長期解法：若要讓既有池內卡也能互相去重，`seed_cards.json` 需要補 rgMbid 欄。
   這是相當大的一次性回填工程，不建議為此批倉促進行。

## c-46 這批的處理

配樂線的候選一律沿用池內既有的主要形態（`久石譲`、`Tan Dun 譚盾`），
不會再製造新的分裂。同類分裂在久石讓（`久石譲` / `Joe Hisaishi 久石讓`）與
坂本龍一（`坂本龍一` / `Ryuichi Sakamoto 坂本龍一`）身上都存在，選名時已避開。
