# c-150 交接（2026-09-18）：Blue Note 1990–92（另含一張 2002），38 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

**Blue Note 重啟後第三段（1990–92）的新錄音**，外加**一張 2002 年才發行的 1969 白宮實況**。
切片 45 張，**收 38 退 7**（a 組收 20 退 3、b 組收 18 退 4）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **38/38，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **38/38 全 full**，out-1 222–240／out-2 228–240 |
| 封面 | **32/38**（缺 6，替代來源全部查實，**兩張偏弱見下**） |
| 固定試聽／無來源狀態 | **25/38 有來源**（探測 19 ＋ 研究層撈回 6），**13 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 本批無合輯，例外欄全空 |
| published gate | 本機端 |

**試聽命中率 25/38 是 1985 後五批裡最低的**——1990–92 這一段有大量歐洲與日本錄音的小廠牌碟
在美國店面下架了。**已跑滿第 254 條三種查法**。

## 三、⚠ 這批最重要的事：八張的首發地是日本，不是美國

**Somethin' Else 的 `TOCJ-5xxx` 常比美版早半年到一年**（第 1063／1066 條）：

| 卡 | 日本原盤 | 日期 | 比美版早 |
|---|---|---|---|
| The Nurturer | TOCJ-5526 | 1990-10-24 | **年份因此改判 1991→1990** |
| Presents The Fo'tet | TOCJ-5521 | 1990 | **年份因此改判 1991→1990** |
| Standard Gonz | TOCJ-5529 | 1991-01-23 | 約三個月 |
| Landmarks | TOCJ-5530 | 1991-02-22 | 約三個半月 |
| Here And Now | TOCJ-5532 | 1991-04-26 | — |
| The Blessing | TOCJ-5535 | 1991-07-19 | 約三個多月 |
| **Stolen Moments** | TOCJ-5531 | 1991-04-26 | **約七個月；日版盤名是《Stairway To The Rainbow》** |
| Fantasia | TOCJ-5542 | 1992-05-27 | ＝Apple 那個一直對不上的日期 |

⚠ **《Stolen Moments》＝《Stairway To The Rainbow》是「同碟兩個盤名」**——
**`chk-prop` 與跨批去重都抓不到**，已加進 `queryAlias`。
⚠ **通則：1990 年代前半的 Blue Note，後批一律先查 TOCJ 再下「首發地」的結論。**

## 四、⚠ 探測層的 `ready` 不保證是同一張碟（第 1067 條）

研究層抽核已 `ready` 的卡，**核出兩張是錯碟，已在 `previews.json` 退回 `unavailable`**：
- **Jerry Bergonzi《Standard Gonz》(1534171592)**——℗2021、7 軌、曲目零重疊；
  **而且它的 `releaseDate` 是批次 placeholder**（同組人的另一張《Straight Gonz》日期一模一樣），
  **策展層拿它當年份旁證的那一句已撤**。
- **Biréli Lagrène, André Ceccarelli & Niels-Henning Ørsted Pedersen《Standards》(695667330)**
  ——三種查法只回 Dreyfus 時期的碟。

**→ 這是「失敗與正常長得一樣」的又一種：`ready` 只保證「找到一個有預覽的條目」。**
**後批的研究層對「已 ready」的也要抽核軌數。**

## 五、⚠ 研究層擋下策展層 11 處編制錯

**主要形狀是「只吹一軌的客座被寫成常設團員」**：
Keezer《Here And Now》的 Donald Harrison 只吹第 10 軌、Petrucciani《Playground》的 Aldo Romano 只打第 5 軌、
Lagrène《Acoustic Moments》的 Di Piazza 電貝斯只在第 12 軌。
另有**漏列**（Andrew Hill 漏 Robin Eubanks；Ellington 漏 Joe Williams 與 Mary Mayo 兩位歌手）、
**把獨奏盤寫成合奏**（《Ron Carter Meets Bach》是 Carter 一人 bass＋piccolo bass）、
**樂器寫錯**（日野吹的是短號不是小號）。

## 六、撞陳列

- **Rubalcaba《The Blessing》vs《Images: Live At Mt. Fuji》**：〈Mima〉兩版**只差四秒**，
  **決定性的一條是歐版盤面印「Track 9 is a solo piano performance」——富士那版是鋼琴獨奏**。
  鼓同為 DeJohnette **只能當旁證**（第 861 條）。**並存、risk 互指。**
- **《Nights at the Keystone, Volume 3》**：四軌裡有三個曲名撞池中四張 Dexter Gordon 卡
  （〈You've Changed〉〈Body and Soul〉〈As Time Goes By〉），**全是同名不同錄音**。
  **Vol. 1／2 的內容 1985 年就以雙片黑膠 `BABB-85112` 發過**（那張在 MB 上不存在），
  **Vol. 3 才是「All selections previously unissued」**。
- **《Stolen Moments》**：與池中 Oliver Nelson 1975、Mark Murphy 1978 兩張同名盤
  **只有〈Stolen Moments〉一個曲名相同**（三張都是 Nelson 的作品，長度 8:17／7:52／5:47）。
- **《1969 All-Star White House Tribute》**：與池中 15 張艾靈頓卡**曲目重疊但內容不重疊**
  ——台上是 Terry／J.J. Johnson／Desmond／Mulligan／Hall／Hank Jones／Hinton／Bellson 的拼盤，
  **艾靈頓樂團團員一個都不在**。

## 七、本機端待辦

1. **上傳 38 張。**
2. **封面缺 6 張**，替代來源（Discogs `images[0].uri`）：
   Straight to My Heart **6402447**（11 圖）／Standard Gonz **6470173**（9 圖，primary 598×600）／
   This Is New **2894843**（3 圖，600×598）／Tommy Smith《Standards》**2770446**（5 圖，600×598）／
   Unforgettable **11852764**（美版 600×591，⚠ **日版《Blue Smiles》封面不同，不可混用**）／
   ⚠ **Here And Now 最弱**：日版 **15372134** 唯一一圖 primary **只有 420×418**，
   美版 10220611 唯一一圖是 secondary 500×504，**兩個都低於 600px，本機端要先看過**。
3. **試聽無來源 13 張**——都跑滿第 254 條三種查法、明寫查無，走固定無來源狀態。
4. ⚠ **`Benny Green` 與 `The Benny Green Trio` 兩個掛名字串都留**（第 1131 條）
   ——本批的《Lineage》用前者，c-151 兩張用後者。**MB 是兩個不同實體，不是分裂。**
