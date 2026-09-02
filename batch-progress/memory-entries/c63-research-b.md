## 2026-09-02 — dip-vinyl-shop — c-63 研究層 b 組（藍調 24 張）

**改動摘要**：完成卡池擴充 c-63 b 組（藍調）的事實研究，24 張全部 `status: full`，
每張 8–9 條帶 HTTPS `src` 的 facts、2 個 `hookCandidates`、1–3 首 `keyTracks`。
（本次為重跑：先前該任務因 API 額度用盡中斷，`c63-b.json` 當時未產出。）

**主要檔案**：`desc-tools/batches/research/c63-b.json`（新增，24 筆，key 與順序同
`desc-tools/batches/cards/c63-cards.json` 的 `group: "b"`）。

**驗證**：`cd desc-tools && node qa-batch.mjs research c63` → a 組 28 張、b 組 24 張，
「key 與卡單完全一致 ✓」「全部通過 ✓」，標記 0。

**材料來源**：Discogs 公開 API（masters／releases／versions，逐張取原盤內頁、掛名、
曲目與授權狀態）、MusicBrainz（release-group 逐筆回問、含 503 退避重試）、
英文維基（藝人、專輯、廠牌條目）、bsnpubs 的 Excello 專輯目錄、Ace Records 商品頁、
nighthawk.sundayblues.org。

**需要主線裁定（1 筆）**
- **Cannon's Jug Stompers《The Complete Works: 1927-1930》的年份**。卡單記 1990（MB
  release-group 的 first-release-date）。實查：Discogs 把該筆 Yazoo 1082/3 黑膠（自記
  1989）歸在 master 569556 底下，而該 master 的主要 release 是 **1975 年 Herwin 208**
  的雙唱片，曲序相同、**Yazoo 盤四面刻紋都是「Herwin 208」被劃掉改刻成 L-1082/3**——
  Yazoo 沿用了 Herwin 的金屬母模。依裁定第 84 條（合輯年份＝該編輯版本第一次問世的年），
  年份應為 **1975**。研究稿未改卡單值，`yearVerified` 已寫明三個候選年份，
  `notes` 明令行文在裁定前不得出現任何發行年。

**推翻策展層（4 處，均已寫進 notes 並禁用）**
1. **《Traveling Through the Jungle》**：`why` 說收錄樂手含 R.L. Boyce——原盤逐軌演出者
   名單裡**沒有這個人**；`risk` 說採集橫跨 1940-60 年代——原盤說明是 1942 年（Lomax）
   與 1969-70 年（David Evans）兩段。原盤拼法是 **Othar Turner**，不是 Otha。
2. **Jimmy Dawkins《All for Business》**：`risk` 說 Discogs 原盤把掛名寫成「Jimmy Dawkins
   With Big Voice Odom & Otis Rush」——實查 release 3250206 的藝人欄**只有 Jimmy Dawkins**。
   另查明 AllMusic「1971 encore」的來源：**錄音確在 1971 年 10 月 27 日與 11 月 1 日兩天**，
   1973 年才發行。
3. **Lobi Traoré《Bamako》**：`why` 說找來三位打擊樂手——原盤掛名只有 djembé 與
   calebasse 兩位，第三人掛的是和聲。
4. **The Groundhogs《Blues Obituary》**：`why` 把盤名解讀成「團長判斷十二小節藍調的聽眾
   正在消失」——**查無任何來源**，已禁用；改用封底「Rev. (T.S.) McPhee」與標籤印錯曲長
   當錨點。

**其他值得記錄的發現**
- **第 65 條再現兩例**：Chicken Shack 版本頁有一筆冒用「Columbia (2)」實體、**沿用 1994 年
  正版編號 COL 477357 2** 的未授權盤；Groundhogs 有一筆冒用「BGO Records (3)」、編號
  BGOCD922 的盤（真正的 BGO 授權 CD 是 1987 年的 BGOCD6）。兩卡的授權舉證已改指乾淨的版本。
- **Silas Hogan《Trouble》（裁定第 85 條）**：原盤內頁證實 **選曲人是 Mike Vernon**、
  內頁文字是 Mike Leadbitter——這正好解釋了同年英國 Blue Horizon 為何以《Trouble At Home》
  發行同一批母帶。bsnpubs 的 Excello 目錄則把 LPS-8019 記成《Trouble At Home》、1972 年，
  是第三種標題與年份組合。
- **Jo Ann Kelly 1969 年 CBS 首作的製作與錄音工程是 Nick Perls**（Yazoo 創辦人）——
  本批最強的一條跨卡因果，已判給該卡獨占。
- **Blues Hall of Fame（blues.org）全站改版**，舊的 inductee 網址一律 404、
  Wayback 當時 429，Nighthawk 那張的 1980 年說法無法取得可引用原文，**未寫進 facts**。
- **Lobi Traoré《Bamako》版本頁只有兩筆**：法國 Buda Musique CD 與**同年馬利 EMI 卡帶
  （AA 024）**，此後無授權再發——§0.8 錨點制最硬的一筆冷門證據。
- **未授權盤統計**：24 張裡 21 張的 Discogs 版本頁零未授權；有未授權的三張是
  Chicken Shack（37 筆中 3）、Groundhogs（28 筆中 2）、Jo Ann Kelly（9 筆中 1，
  2025 年俄羅斯盤）。

**同調風險與互斥條款（第 58 條）**：三個橫跨多卡的共同標籤已逐一分派——
「Yazoo 再發」（5 張）的廠牌史只給 Frank Stokes、Robert Crumb 只給《The Stuff That Dreams
Are Made Of》、Nick Perls 本人只給 Jo Ann Kelly、Bengt Olsson 只給 Memphis Jug Band；
「78 轉錄音被重新整理」（7 張）各給一個獨有錨點；「blues revival 找回老歌手」（4 張）
只給 Buddy Moss（那張碟就叫 Rediscovery）。另分派 Mike Vernon／Blue Horizon（Chicken Shack）、
J.D. Miller／Crowley／Excello（Lightnin' Slim）、Mike Leadbitter（Silas Hogan）、
Delmark 廠牌史（Big Joe Williams）、Malaco 與 1980 年代 soul blues（Z.Z. Hill）。
各卡 `notes` 都寫明互斥條款。
