## 2026-09-04 — dip-vinyl-shop — c-87 策展提案（§1 人工身分補遺：日本自主爵士小廠）

- **改動摘要**：新增 `batch-progress/c87/prop-a.json`（16 張）與 `batch-progress/c87/prop-b.json`（16 張），
  合計 **32 張、30 位藝人**，`lineType: 深掘`、**32/32 全部走 §1 人工身分路線**（`identitySource: "manual"`、`rgMbid` 留空）。
  - a 組＝Johnny's Disk 9 張（JD-06/07/08/09/10/11/12/13/16）＋ Aketa's Disk 7 張（AD-2/4/9/11/17/18/22）。
  - b 組＝Nadja 8 張（PA-6020/7098/7101/7127/7139/7168/7173/7190）＋ Union Jazz 8 張（ULP-5003/5502/5506/5507/5508/7004/7005、GU-2006）。
  - **零合輯**（`releaseType` 全為 Album，`exceptionReason` 全空）。年份 1974–1987。
- **主要檔案**：`batch-progress/c87/prop-a.json`、`batch-progress/c87/prop-b.json`、
  `batch-progress/memory-entries/c87-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c87/chk-prop.mjs a b` → 32 張、30 位、**標記 0**；
  跨批去重 26 批（其中 3 批讀 prop）、卡數 1336、**跨批撞卡 0**。
  另以 `checkManualIdentity`（`scripts/verify-album-onboarding.mjs` 第 95–133 行）的規則逐條自檢
  32 張 → **0 個問題**。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity、頂點資格評估、封面實抓、簡介、
  固定試聽、Firestore／KV／`seed_cards.json` 寫入。**未動 git。**

### §1 舉證：四組欄位逐一確認（32/32 齊備）

| 欄位 | 驗證器要求 | 本批狀態 |
|---|---|---|
| `identitySource` | 明寫 `manual`（第 99 條，否則 `make-cards-generic` 會從 `mbNote` 推導） | **32/32 明寫**；`mbNote` **32/32 留空字串**，全批 `mbNote` 內零個 MBID |
| `rgMbid` | 必須留空 | **32/32 未設此欄** |
| `mbAbsenceProof.queries` | ≥2 組實下查詢、含藝人與作品兩個方向 | **32/32 皆 4–5 組**；每張都同時含 `release-group?artist=<MBID>&limit=100&offset=`（藝人 browse）與 `releasegroup:"…"`（作品）兩個方向 |
| `mbAbsenceProof.checkedAt` | ISO 日期 | 32/32 = `2026-09-04T05:40:00Z` |
| `mbAbsenceProof.conclusion` | ≥10 字、寫明查無的具體情況 | 32/32，每張都寫明「實體在但名下 0 筆」／「名下 N 筆逐頁掃完無此盤」／「MB 上根本無此實體、搜尋回的是誰」 |
| `manualEvidenceUrls` | ≥2 個 HTTPS | 32/32：**2 個 22 張、3 個 10 張**，來源是 Discogs 原盤 release 頁＋（授權復刻的 Discogs release 頁／Apple 專輯頁／Discogs 廠牌目錄頁） |
| `manualRuling` | ≥10 字、誰核定依哪一條 | 32/32 同一句：店主 2026-09-04 核可 §1 補遺批（c-87），依 c-67 交接第二節與共用簡報附錄 |
| `coverSourceHint` | 不得為 `caa` | 32/32 非 caa：**16 張 `apple-verified-collection`（皆帶確切 collectionId 與該頁 HTTPS 網址，寫在 `risk`）、16 張 `manual-scan`** |

**四種「假查無」逐條排除**（裁定第 28／98／116／122 條）：
- **第 28／98 條**：本批所有 MB 與 Apple 請求都走六次遞增退避的重試包裝，記錄的每一筆都是 **HTTP 200**，
  零筆 503／403 被當成查無。
- **第 116 條**：藝人 browse **一律用 `release-group?artist=<MBID>&limit=100&offset=` 分頁**掃到回傳數小於 limit，
  沒有用 25 筆上限的 `artist/<MBID>?inc=release-groups`。實際分頁掃完的大名下包括
  Jerry Lee Lewis（453）、中森明菜（201）、崎元仁（90）、柏原芳恵（93）、三上寛（55）。
- **第 122 條**：本批 **13 張的藝人搜尋回了完全不相干的東西**，全部逐一 browse 排除後才記為查無——
  最典型的四筆：`元岡一英` → 岡部啓一（NieR 配樂）、`大森明` → 中森明菜、
  `リー・ウォンヒー` → Jerry Lee Lewis／Brenda Lee、`与世山澄子` → 川澄綾子。

### 撞卡與上限（實掃 `seed_cards.json` 全 13,913 列）

- 三種寫法（假名／漢字／羅馬拼音）都查過（第 49 條），**線上池撞卡 0、批內跨組 0、跨批 0**。
- 到 3 張上限的兩位：**三上寛**（池中 2 張＋本批《職業》）、**菅野邦彦**（c-67《Opa! Brasil》＋本批 2 張）。
- 本批內同一藝人 2 張的四位：板倉克行（JD-07／JD-12）、丸山繁雄（AD-11／AD-22）、
  沖至（c-67《幻想ノート》＋本批）、渋谷毅（c-67《Shibuyan》＋本批）、中村達也（c-67《LOCUS》＋本批）。
  每一組都在 `risk` 寫明「簡介不要寫成同一篇」與兩張的分別。

### 未收清單

**A. 連 Discogs 都查不到（真的挖不到）**：**Johnny's Disk 的 JD-14 與 JD-15**。
label 643384 的整份目錄（64 筆）掃完，JD-01～JD-13 與 JD-16 都在，**JD-14、JD-15 兩個編號完全沒有條目**，
其他資料庫也查不到盤名與掛名。這兩號是本批唯一「連原盤存在與否都無法舉證」的缺口。

**B. MB 上釘得住，所以不屬於這條補遺線（留給一般批）**：
池田芳夫／高瀬アキ《Esprit》(1982, ULP-5501)、Aki Takase《ABC》(1982, ULP-5505) 與《Minerva's Owl》、
宮沢昭《On Green Dolphin Street》(1982, ULP-7002)、Pico《Pico》(1983, ULP-7003，MB RG 5767aafc)、
伊平たけ《越後瞽女口説き しかたなしの極楽》(1974, Nadja PA-6034〜35)、福居良《Scenery》(1976, Nadja PA-7148)。
**六張都不是查無，是 MB 有——依規格不進 §1 批。**

**C. 藝人已達或會超過 3 張上限**：
明田川荘之 5 張（AD-5《集団生活》、AD-8《Fly Me to the Moon》、AD-20《野尻の黄昏》、
AD-21《At the Babel 2nd》、ULP-5503《New Step With My Step》——他在 c-67 已有 3 張）、
高柳昌行 AD-23《850113》、鈴木勲 ULP-7001《Scotch Blues》、森山威男 KUL-5021《Flush Up》、
菅野邦彦 PA-6021《Live!》與 PA-7179《The Days of Wine and Roses》（本批已收他 2 張、到上限）、
梅津和時／Mal Waldron ULP-5004《Another Step》（Mal Waldron 池中已有 7 張）。

**D. 形狀不符**：Johnny's Disk 的 2009 年後 CD 期作品（JD-29～JD-36，含照井顕自己的《般若心経》
與 2014 年才發的 Toshiko Akiyoshi Trio 現場）、金本麻里《With The Bop Band》(2016)、
Aketa's Disk 的 AD-24CD 之後全部 CD 期作品、各廠牌的合輯（Johnny's Underground、Scenery Of Japanese Jazz 等）。

### 封面與試聽預估

- **封面 16/32（50%）**：`apple-verified-collection` 16 張，每張都在 `risk` 寫下確切的 `collectionId`
  與該頁 HTTPS 網址，可直接餵 `batch-progress/c64/apple-art.mjs` 的同型腳本（用 `lookup?id=` 精確反查，非模糊搜尋）。
  **另外 16 張要本機掃圖**：Johnny's Disk 8 張（JD-06/07/08/09/10/11/12/13）、Aketa's Disk 1 張（AD-17）、
  Union Jazz 7 張（ULP-5003/5502/5506/5507/5508/7004/7005）。
- **試聽 ≈16/32**：與封面同一組——16 個 Apple 條目的曲目都帶 `previewUrl`（已逐張抽驗）。
  **Union Jazz 這條線在 Apple 上幾乎整片空白**（八張只有《Introducing》有數位條目），是本批最弱的一段；
  **Studio Mule 的兩張 2019 復刻是黑膠限定、未上數位**，所以 JD-08／JD-09 有官方授權復刻卻仍然缺封面缺試聽。
- 兩張要特別提醒本機：**丸山繁雄兩張的 Apple 版是加曲版**（《A Young Father's Song》+3、《Yu Yu》+2）；
  **菅野邦彦《Date in Daté》的 Apple 盤名是「BLACK ORPHEUS DATE IN DATE」**，與碟上不同，
  只能用 collectionId 直查、不可模糊搜尋（曲目四首已逐曲核對相符）。

### 本批自行決定的策展裁定（依 2026-09-02 裁定權下放）

1. **掛名與盤名一律取 Discogs 原盤條目的寫法，Discogs 有日文 ANV 就用日文、只有拉丁就用拉丁。**
   本批無 MB 實體可依（第 6／70／120 條的前提不成立），Union Jazz 整條線的 Discogs 條目只有拉丁名，
   因此那 8 張用拉丁掛名，日文寫法寫進 `risk` 供本機比對。
2. **`coverSourceHint` 對沒有 Apple 條目的卡填 `manual-scan`，不填 `apple-verified-collection`。**
   §4 明文「沒有 collectionId 就退回抓不到可靠封面」，填一個沒有 collectionId 的
   `apple-verified-collection` 是空頭支票（`apple-art.mjs` 也會直接略過）。
3. **MB 上釘得住的六張退回一般批**（上列未收清單 B），c-87 只收真正查無的。
4. **園田まゆみ《午後3時の秋》盤名用半形 3**（Discogs 原盤用全形３），全形寫法寫進 `risk`。

### 場景飽和度

**Johnny's Disk 與 Aketa's Disk 的原盤黑膠線，收完這批就見底了。** Johnny's Disk 的 JD-01～JD-16
除了查無條目的 JD-14／JD-15，其餘 14 張已全部進池（池中 2＋c-67 的 3＋本批 9）；
Aketa's Disk 的 AD-1～AD-23 除了明田川荘之本人已達上限的 5 張與高柳昌行 1 張，也全部收齊。
**Nadja 與 Union Jazz 還很空**：Nadja（Trio 的 PA-/PAP- 編號）的美國自由爵士線
（Hamiet Bluiett、David Murray、Steve Grossman、Andrew Cyrille、Joe Lee Wilson、Charles Sullivan 等十餘張）
一張都還沒碰，Union Jazz 的 KUL-/ULP- 目錄也還有一半沒進；
**這兩家夠再開一個批次，但要先分清哪些在 MB 上釘得住——那部分應該走一般批而不是 §1。**
