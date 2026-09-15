# 策展簡報：Blue Note 目錄補齊線（c-135 起，每批 45 張）

**店主 2026-09-15：「美國先挖blue note」「不限數量 先列舉」→「Blue太少了 這麼多你才選198張？」**

MB 上 Blue Note 純專輯 1,812 張，池中 290，**缺 1,506**（已排掉 16 張疑似合輯）。全部跑，**依時期與目錄號順序**：
1. **1939–66（Lion 時期，10 吋 5000／7000 系列＋1500／4000 系列）：261 張 → c-135～c-140**
2. 1967–84（Liberty／UA，含 LT 庫存系列、日本首發）：243 張
3. 1985 後（Capitol／EMI／UMG）：爵士 873 張（非爵士 42 與待判 97 另議）

`lineType: 深掘`。**這條線與日本爵士線的最大差別：MB 建檔幾乎全（1500／4000 系列只缺十幾個未發行號），
不需要 §1 候選；缺的是池，不是資料庫。** 店面（Blue Note 全目錄都在串流上）與 CAA 命中率也預期很高。

## 〇、固定規格與共通條款

固定規格照 `CURATION-BRIEF-c131.md` → `c127` → `c126` → `c103plus` → `c93plus`，一字不改。
共通五條照 `CURATION-BRIEF-c128-c130.md` 第〇節。**沒有 §1.5 獨立閘。**

## 一、⚠ 每批的清單已經切好——你的工作是覆核，不是挑

`batch-progress/c1XX/slice.json` 是那一批的 45 筆（`g: "a"` 前 23、`g: "b"` 後 22），每筆帶
artist／album／year／rgMbid／country／format／catno／live／note／reissueSeries／poolString。
**來源是 `batch-progress/enum/blue-note.json`（MB 全目錄逐頁拉完），依年份與目錄號排序。**

你這一棒要對每一筆做的事：
1. **回問 MB `release-group` 與 `release?release-group=<id>&inc=media+labels` 端點**，核 artist-credit、first-release-date、
   原盤 catno、載體、軌數。**rgMbid 用列舉檔的，不要自己另找**（除非查出列舉檔釘錯，那要在 rulings 寫明）。
2. **實掃卡池**（`seed_cards.json` 16,450 列 ＋ `desc-tools/batches/cards/c1*.json`）——列舉檔的 `inPool` 是 2026-09-15 用
   子字串比對的結果，**假陽性與假陰性都有可能**。撞到就在 rulings 記下、從本批退掉，**不要補別張**（下一批清單已固定）。
3. **年份**：`year` 取原盤首發年。⚠ **列舉檔的 `note` 標「BN 首發晚原盤 3 年以上，原盤可能他廠」的（108 張，
   Pacific Jazz／Roulette／Capitol 轉來的）要逐張判**——原盤若是他廠，`year` 取他廠首發年、`label` 寫原廠，`risk` 註明 Blue Note 版年份。
   另 18 張「RG 首發年落在 1985 後但目錄號屬 Lion／Liberty 期」（庫存盤或 MB 年份錯）列舉檔已歸回原年代並在 note 標明——**覆核**。
   ⚠ **c-133 第 431 條**：「兩個來源逐日相符」有時是同一份數位母帶——**真正的獨立來源是實體盤面／廠牌目錄頁／同期紙本**。
4. **掛名照池中先例**（第 307 條）：池中 Blue Note 藝人多半已有字串（`Art Blakey & The Jazz Messengers`／`Horace Silver Quintet`……），
   **新卡一律用池中多數寫法**，`risk` 標明 MB credit 的寫法。**絕不新造分裂、不自行合併**。
   `audits/pool-artist-name-splits.md` 記了 `&`／`and` 六組既有分裂。
5. **`releaseType`**：列舉檔已濾掉 Compilation；`live: true` 的**收但要標**。⚠ **第 397 條：`secondary-types` 兩個方向都會漏**，
   Blue Note 的現場盤（Cafe Bohemia、Birdland、Jazz Corner of the World……）**盤名與盤面要再看一次**。
6. **Volume 拆盤**（Cafe Bohemia Vol.1／2、Jazz Messengers at Birdland Vol.1／2／3）各算一張，`risk` 互相指向。
7. **三種店面查法**（第 254 條），**只寫觀察不寫結論**。Blue Note 在店面通常有多個版本（原盤／RVG／Tone Poet／Classic Vinyl 的數位版），
   **逐軌比對，可採「前 N 軌對應原盤」的版本**（c-130 Perfect 先例），bonus track 版本要註明。
8. **`why`／`risk` 的密度照 `batch-progress/c131/prop-b.json`**——那是同樣的美國爵士名家目錄深度，形狀最接近。

## 二、坑

1. **同一場錄音拆成多張、同一張碟多個 RG**（原盤 RG 與再發 RG 分開建）：列舉檔已折疊 Tone Poet／Music Matters 等 10 個再發系列進原盤 RG，
   但**仍可能有漏折的重複 RG**——`chk-prop` 現在有 rgMbid 掃描（只報不擋），**盤名＋掛名撞了先查是不是同一個 RG**。
2. **1985 前有 45 張 Live 缺 190 中**：Blue Note 的現場盤是這條線的精華，不要因為「有一張同場錄音已在池中」就退。
3. **10 吋盤時期（1939–56）**：很多 10 吋盤後來重組成 12 吋 1500 系列，**同一批錄音會出現在兩個 RG**——
   判準是 MB 的 RG 分別建了就各算一張，但 `risk` 要互指、正文不得寫成兩張不同的錄音。
4. **同名撞擊**（第 179／250／324 條）：`The Three Sounds`、`Bud Powell` 這種池中已有的照池中字串；
   **新掛名核 `type`／`area`／`life-span`，不看 score**。

## 三、交件

`batch-progress/c1XX/prop-{a,b}.json`，欄位照 `batch-progress/c131/prop-b.json`（含 `g`）。
**MBID 必須是 `mbNote` 裡第一個 UUID。** 交件前跑 `node batch-progress/c1XX/chk-prop.mjs <組>`，標記清成 0。
裁定寫進 `batch-progress/c1XX/rulings.md`，**用 append**，編號依派工信指定的區間。
**退掉的（撞池、判為合輯、原盤他廠改判……）逐筆列在 rulings，附理由分類。**

**續跑（容器會不定時重啟、也可能撞 API 額度）**：每做完 5 筆就把 `prop-<組>.json` 整份寫回磁碟；開工先讀它、接續補完。
**MusicBrainz 守 1 req/s**，UA `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`，503 要重試（第 28 條）。
**不要碰 git、不要動 `PROJECT_MEMORY.md`／`seed_cards.json`／KV／Firestore。**
