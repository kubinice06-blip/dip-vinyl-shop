# c-67～c-86 策展層共用簡報（2026-09-03）

店主指示：「**繼續策展 20 批次，回到日本、英國、美國等地的深度小眾有趣的專輯，比如 Johnny's Disk 這種廠牌**。」

Johnny's Disk 是什麼樣的廠牌：岩手縣陸前高田的爵士喫茶「開運橋のジョニー」老闆自己開的廠牌，
1978–87 年出了十幾張 LP（中山英二《Aya's Samba》、Teru Sakamoto Trio《海をみていたジョニー》、
片山光明《First Flight》、上野好美《太古の海鳴り》……），當年只在店裡與同好間流通，
2010 年代被 BBE《J Jazz》與 Studio Mule 的授權復刻挖出來。
**這就是這 20 批要找的形狀：一家小廠牌、一個場景、一批當年沒人看見、後來被證明重要的唱片。**

## 一、每批的固定規格

- **`lineType: 深掘`**，每批一個場景（或 a／b 兩條線），**目標 30–45 張**。
  挖不到就照實交，c-64 的 a 組交 14 張也被接受——**寧缺勿濫**。
- 輸出 `batch-progress/c<批>/prop-<組>.json`，欄位與 `batch-progress/c65/prop-a.json` **完全一致**：
  `artist`、`album`、`year`、`genres[]`（只能是 rock／jazz／soul／electronic／pop／hiphop／folk／classical／world／blues 這十個）、
  `label`、`why`、`risk`、`mbNote`、`releaseType`、`exceptionReason`、`exceptionEvidenceUrls[]`、
  `selfTitled`、`queryAlias`、`reissuedBy`、`g`。
- **每張都要釘住 release-group MBID**，寫在 `mbNote` 的**第一個** MBID 位置，並逐一回問
  `https://musicbrainz.org/ws/2/release-group/<id>?fmt=json` 確認 `primary-type=Album` 與標題（裁定第 41 條）。
  **對照組 MBID（EP、合輯、同名別碟）要明寫「刻意不釘」**，否則下游腳本會抓錯（第 99／126 條）。
- MB 上查無的碟：**這 20 批不開 §1 人工身分路線**（那是店主的決定），查無就不收，寫進交件的「未收清單」。
- 合輯只在 §5.6 的門檻下收：`releaseType: "Compilation"`、`exceptionReason` ≥12 字、≥2 個 HTTPS `exceptionEvidenceUrls`，
  年份取合輯首次出版年。**這 20 批的重心是原盤，合輯每批不要超過 5 張。**

## 二、必讀（開工前，照順序）

1. `ALBUM_ONBOARDING.md` 全篇，特別是 §0.8 錨點制、§1 身分、§4 封面、§5.5／5.6。
2. `batch-progress/c53/rulings.md` **全部 128 條**。每批都會用到的：
   - **第 27 條**：取樣只能用來排除，不能用來確認數量。要知道池裡有幾張就實掃 `seed_cards.json` 全檔。
   - **第 43／57／65／78 條**：考古再發只有標 Official 才算背書，判定單位是「這一次再發」不是「這家廠牌」。
   - **第 45 條**：改過名的碟取再發名。
   - **第 6／70／120 條**：掛名與盤名用 MB 實體的文字（日文卡用日文，MB 怎麼寫就怎麼寫）。
   - **第 49 條**：跨文字系統的撞卡字串去重看不見，日文卡要同時比對假名／漢字／羅馬拼音，在 `risk` 寫明。
   - **第 91／95 條**：rgMbid 是身分鍵不是年份來源；release-group 標題與卡片盤名不必相等。
   - **第 119 條**：`chk-prop.mjs` 會串跑跨批去重，**標記要清到 0**。
   - **第 126 條**：MB 上同名雙胞胎（EP 與 Album）要在 `mbNote` 明寫釘哪個。
3. `batch-progress/c65/prop-a.json` 與 `c66/prop-a.json`——**輸出格式照抄**。
4. `PROJECT_MEMORY.md` 最新一筆（2026-09-03 本機上架）：**77 張留置的原因是封面（48）與自我同名缺試聽（28）**。
   所以：**優先收 CAA 或 Apple 上有封面的碟；自我同名的碟（盤名＝藝人名）若 Apple 上查不到就不要收**。

## 三、撞卡檢查（不做這步交件無效）

- **實掃 `seed_cards.json` 全檔**（13,913 列），每位候選藝人查「名下已有幾張」——**同一藝人池中上限 3 張**，達到就不收。
  日文藝人要三種寫法都查（假名／漢字／羅馬拼音）。
- 跑 `node batch-progress/c<批>/chk-prop.mjs` 到**標記 0**（它會查線上池、批內跨組、其他未上傳批次）。
- **`batch-progress/c67～c86` 這 20 批是同時在跑的**，別批的 `prop-*.json` 若已存在也會被 `dedup-crossbatch.mjs` 比到，撞了就換。

## 四、`why` 與 `risk` 要寫什麼

- **`why`**：這張為什麼重要、原盤怎麼流通、誰在什麼時候把它挖出來（授權復刻的廠牌、編號、Discogs release 號、
  是否標 Unofficial）、池中同場景已有什麼（實掃結果，不是印象）。**要有可查證的來源**：Discogs release 頁、
  再發廠牌官方頁、有署名的樂評、廠牌史文章。**不要寫樂器與音色的形容**——c-66 那批的策展 `why` 樂器描述幾乎全部
  無來源，研究層擋掉二十多處。
- **`risk`**：撞卡風險（同名別碟、EP／Album 雙胞胎、掛名拼法分歧、跨文字系統）、年份分歧、
  再發是否 Official、封面與試聽的預估。**日本盤特別要寫**：MB 實體名是日文還是羅馬拼音、Apple 用哪種寫法（填進 `queryAlias`）。
- **`mbNote`**：釘住的 release-group 全名、artist-credit、first-release-date、primary-type、secondary-types、
  release 數與國別／status；對照組 MBID 與「刻意不釘」的理由；藝人 MBID 與名下 release-group 數。

## 五、資料來源

- MusicBrainz：1 req/s、UA 必帶；**`artist:` 比對的是 artist-credit 字串不是實體名**（第 20 條）；
  503 不是查無（第 28 條），`artist/<MBID>?inc=release-groups` 預設只回 25 筆（第 116 條），要用 `release-group?artist=<MBID>&limit=100&offset=`。
- Discogs：`api.discogs.com` 公開端點不需 token（`/labels/<id>/releases?per_page=100` 可直接掃一家廠牌的整個目錄；
  `/database/search?type=label&q=`）；網頁會 403。
- 再發廠牌與考古系列的官方頁、Discogs master 的版本頁（看 Unofficial 標記）、有署名的樂評與廠牌史。

## 六、落檔規則（容器會不定時重啟）

- **每定案 5 張就把目前結果寫回 `prop-<組>.json`**（整檔覆寫）。
- **開工前先看該檔存不存在**：若已有部分內容，**接續補完**，不要從頭重做。
- 抽驗與掃描的中間結果放 scratchpad，不要放進 repo。

## 七、禁令

- **不動 git**、**不碰** `seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／KV／Firestore。
- 不碰其他批次的檔案。

## 八、交件

寫 `batch-progress/memory-entries/c<批>-curation.md`（格式照 `c65-curation.md`），然後簡短回報：
張數與藝人數、`chk-prop` 標記數、合輯張數、**釘不住 MB 而未收的清單**、**與池中撞卡而未收的清單**、
封面與試聽的預估、以及你自己判斷「這個場景在池中已經飽和／還很空」的一句話。過程不必敘述。
