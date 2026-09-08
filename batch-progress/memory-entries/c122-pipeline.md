## 2026-09-08 — dip-vinyl-shop — c-122 走完雲端段（紐約硬蕊與 straight edge 的 7 吋，43 張）

- **改動摘要**：**店主 2026-09-08「白名單要開就開」核定為 hardcore 開 §5.5
  （`hardcore-7inch`）之後才成立的批**。c-120 因為白名單沒開，
  101 筆／99 個 release-group／33 支團全退到未收清單，**這批就是把那份清單建成卡**。
  **43 張、33 位掛名**（a 紐約硬蕊 7 吋與 demo 23／b youth crew・straight edge 20），
  年份 1983–1999，`releaseType` EP 40／Other 1／Album 2。
  **零 §1、零跨批撞卡、43/43 釘住 release-group MBID。**
  **九支「c-120 全滅」的團收回八支**；**Straight Ahead 開了白名單仍收不到**——
  它三個 RG 的唯一 release 全是 Bootleg，**那不是白名單能解決的**。
- **主要檔案**：`batch-progress/c122/`（prop-{a,b}、chk-prop.mjs、caa.json、rulings.md、
  HANDOFF.md、apple-candidates.md）、`desc-tools/batches/research/c122-{a,b}.json`、
  `hooks/c122-hooks-{a,b}.json`、`input/c122-writer-{1,2}.json`、
  `output/c122-out-{1,2}.json`、`batch-progress/probe/previews.json`（**補 18 筆**）。
- **驗證結果**：`qa-batch research/hooks/out c122` 全過、`chk-hook-crossgroup c122` 43 張全過
  （hook 加權 12–31.5、note 305–350）、`fix-spacing --write` 兩檔待補 0。
  out-1 23 張 148–221、out-2 20 張 154–230，**43 張全部落在所屬字數帶**。
  主線一次性複驗：**43 張 `desc` 開頭與 `hook` 逐字相符**、**四位中文數字年 0 筆**、
  **施工單洩漏 0 筆**、**那 12 張不是 7 吋的碟正文裡「7 吋」0 次**。
  **封面 40/43；試聽 5 → 23/43（全 us）。**
- **⚠ 上架前必做**：**§5.5 的舉證有 20 個站不住**（裁定 257）——
  109 個網址全部回 200，但逐頁讀過後有 20 個查不到那支團或與 `exceptionReason` 無關。
  **`chk-prop` 與驗證器都只數網址個數，沒有任何自動檢查會讀那個頁面。**
- **研究層擋下策展層 43 張卡、141 處＋22 處警告**（a 78／b 63）：
  Breakdown 與 Gorilla Biscuits 的「demo 被正式錄成唱片」**逐軌重疊為零**；
  Alone in a Crowd / Inside Out split 的四軌**全掛一支團**、而且是紐約那個 Inside Out；
  Madball 1997 CD 的 23 軌是原盤 8 軌＋14 段現場＋1 段電台訪談、廠牌是 Century Media；
  Cause for Alarm 的「Another Planet」查無此廠牌；三處序數不成立。
- **⚠ 載體：43 張裡有 9 張不是 7 吋**（7 張 CD、1 張卡帶），另 3 張形態欄只寫「Vinyl」無尺寸。
  **併軌：Sick of It All 八條溝唱十首、Earth Crisis 三軌底下四個歌名、
  Chain of Strength 十軌底下十一個歌名**——寫成「N 首歌」就錯。
- **這批的裁定與教訓**（`c53/rulings.md` 第 255–258 條）：
  1. **第 255 條**：**§5.5 白名單增列 `hardcore-7inch`**。
     **量化是拿到裁示的原因**——c-116 只寫「有一半收不進來」店主沒動；
     c-120 附上逐筆 rgMbid 與封面狀態的清單，店主就開了。
     **通則：規格層的提報要附「不改的代價」與「改了之後可以直接動的清單」。**
  2. **第 256 條**：開新白名單**在別的工具裡生出假陽性**——
     `fix-rgmbid.mjs` 的 `epOk` 硬寫著舊白名單，每張 EP 先被扣 12 分，
     Chain of Strength 那張因此回報「標題都對不上」，**主線把它當成真的釘錯了**。
  3. **第 258 條**：追下去才發現真病灶——**`genreException` 從來沒被
     `make-cards-generic.mjs` 帶進卡單**，所有 §5.5 批都受影響（c-97／c-118 也是）。
     **256 修的是「讀的人用錯值」、258 修的是「那個值根本沒送到」，
     兩者外顯症狀一模一樣**——修好上層症狀沒消失，才是往下追的訊號。
  4. **第 257 條**：**舉證網址「打得開」不等於「站得住」**（見上）。
  5. **裁定 252 的預期成立**：初稿出界 13 張，**其中 12 張是不足下限**
     ——7 吋的事實格天生比長篇少。
