## 2026-09-04 — dip-vinyl-shop — c-82 走完雲端段（日本 1990s 地下 techno 與 ambient，45 張）

- **改動摘要**：深掘線 **45 張、40 位藝人**（a：techno／electro／breaks 20 張、1994–2001；
  b：ambient／experimental 25 張、1994–2000）。廠牌 Zero Gravity 11、Transonic 10、Frogman 5、
  Soup-Disk 5、Sublime 4、Syzygy 4、Daisyworld 3、Music Mine 2、Reel Musiq 1——
  **這九家在本批之前池中一張都沒有**。零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group、合輯 0、EP 0。
- **主要檔案**：`batch-progress/c82/`（prop-{a,b}、caa、previews、fix-rgmbid.log、HANDOFF.md）、
  `desc-tools/batches/research/c82-{a,b}.json`、`hooks/c82-hooks-{a,b}.json`、
  `input/c82-writer-{1,2}.json`、`output/c82-out-{1,2}.json`、
  `batch-progress/c53/rulings.md`（第 149、152 條）。
- **驗證結果**：`qa-batch research c82` key 與卡單完全一致；`chk-hook-crossgroup c82` 45 張全過
  （hook 加權 19–40.5、note 276–350）；`qa-batch out c82` out-1 20 張 218–235、out-2 25 張 222–235、
  合計 45 張相符、`>260` 為 0；`qa-check-research` 兩檔各 0 標記；`fix-spacing` 待補 0；
  `fix-rgmbid` 兩輪聯集、修正 0。**封面 21/45、試聽 22/45（命中全部在 `jp`）。**
- **這批的裁定與教訓**：
  1. **立第 152 條：`unavailable` 不等於「Apple 上沒有」，只等於「用這個比對法沒配到」。**
     Quadra《Sketch From a Moment》七個 storefront 全判查無，其實 Apple 上就有——
     它的 `collectionName` 把**系列名、盤名與版本註記串成同一個字串**
     （「Quadra Complete Selection 95-07 / Sketch From A Moment (2016 Remaster)」），標題比對因此擋掉。
     用 collectionId 直查逐軌核對：14 軌與 MB 原盤同序，只有 Apple 把〈Luminosity〉拼成〈Lumiosity〉。
     **這與第 122 條那些「查詢回錯東西」不同類——查詢回的是對的碟，是比對把它扔掉的。**
     裁定：搜到 0 筆才是真的沒有；搜到卻沒配上要留候選供複核，**研究層看到 unavailable 要順手再搜一次**
     （它手上有完整曲目表，能做探測層做不到的逐軌核對）。
  2. **立第 149 條（前半後來被第 150 條作廢）**：別名視同本人——原本是為「藝人上限」服務的，
     而**那條上限根本不存在**（店主指正）。**但另一半仍成立且重要**：別名會讓**真撞卡**看不見，
     所以 `queryAlias` 仍要填別名，**理由從「計數」改成「查得到」**。
  3. **第 149 條後半：非拉丁線用「以廠牌反查」開場。** b 組幾乎全靠
     `release?query=label:"<廠牌>"&limit=100` 撈出來；反例是松前公高用羅馬拼音查 MB，
     **藝人與作品兩個方向都回乾淨的 count=0**。**某個維度的寫法會爆炸時，換一個維度當主鍵**
     （與第 71 條把主鍵從掛名換成盤名是同一個動作）。
  4. **研究層推翻策展層十處**，最大一處是**整張碟的場景定位錯了**：
     Blind Light《The Absence of Time》的 credit 是 Bill Laswell、Anton Fier、Nicky Skopelitis 等，
     錄混音都在 Greenpoint Studio——**根本不是日本地下 techno**；廠牌也不是 Music Mine 而是 Alida。
  5. **一處「部分推翻」立下了一條分界**：《Ambient Classics》策展層說「MB 沒有合輯這一欄所以不得斷言」，
     但 **Discogs 的 credit 欄上永田掛 `Compiled By [Selected By]`**——
     **那是唱片印的 credit，不是資料庫的型別欄**。可寫該 credit 本身，不得推導成「舊作合輯」。
  6. **hook 層退回七則候選、寫作層攔下七處計數句**（第 154 條那一類）。
     最刺眼的是「末軌 32:52 比前面四軌加起來還長」——**前四軌合計 34:59，比它長**。
  7. **QA 的標記全是誤報，一條都沒為了關燈刪掉真話**（第 143 條）：西里爾人名、
     日文原文裡的「来歴／出会い／国立科学博物館」被簡體表誤判、以及 6 條 HTTP-only 來源
     （主線逐一實測 HTTP 200／HTTPS 000，第 133 條成立）。
- **下一步**：本機端上傳（三軸、頂點資格、四處寫入與回讀、**24 張封面掃圖**、
  跑 `build-genre-tree.mjs --write`、清掉四支暫存腳本）。
