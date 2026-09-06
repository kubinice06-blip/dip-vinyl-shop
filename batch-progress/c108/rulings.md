# c-108 拉丁第二圈（chicha／cumbia／salsa dura／nueva canción）：策展層裁定（2026-09-06）

依 2026-09-02 店主下放，本批所有策展／管線裁定由策展層自決，決定後記在本檔。
判準沿用三條：有先例照先例、可逆就直接定、卡住整條線就當場定。

交件：`prop-a.json` 21 張／9 位、`prop-b.json` 24 張／13 位，合計 **45 張、22 位**，
`node batch-progress/c108/chk-prop.mjs` **標記 0**（含 58 批跨批去重，撞卡 0）。
**45 張全部釘住 release-group MBID（100%），每一張都逐一回問過
`release-group/<id>?fmt=json&inc=artist-credits+releases` 端點。**

---

## 1. **§5.6 這批開了 0 張**——派工信預期的「考古合輯是主力」在資料上不成立

派工信寫「考古合輯是這條線的主力，走 §5.6 完整舉證……每張要 `releaseType: "Compilation"`、
`exceptionReason` ≥12 字、≥2 個 HTTPS `exceptionEvidenceUrls`」。**實查之後一張都沒開。**

逐筆查了這條線上所有候選整輯的 `primary-type`：

| 整輯 | MB release-group | primary-type | secondary-types |
|---|---|---|---|
| Cumbias Chichadélicas : Peruvian Psychedelic Chicha (2011) | 5e6f7b4a | **Album** | [Compilation] |
| Cartagena! Curro Fuentes… 1962-72 (2011, Soundway) | 78b28ed4 | **Album** | [Compilation] |
| Palenque Palenque… 1975-91 (2009, Soundway) | 3d6a69c0 | **Album** | [Compilation] |
| Aníbal Velásquez《Mambo Loco》(2010, Analog Africa) | 8f157439 | **Album** | [Compilation] |
| Los Saicos《¡Demolición! The Complete Recordings》(2010, Munster) | 9d45fe14 | **Album** | [Compilation] |
| The Roots of Chicha 2 (2010, Barbès) | 34769c3e | **Album** | [Compilation] |
| Colombia! The Golden Age of Discos Fuentes (2007, Soundway) | f2bd7461 | **Album** | [Compilation] |
| Cumbia Beat, Volume 1 (2011, Vampisoul) | 0fac42a8 | **Album** | [Compilation] |
| Diablos del ritmo (2012, Analog Africa) | a2614d77 | **Album** | [Compilation] |

**`primary-type=Compilation` 是 0 筆。** 依 `ALBUM_ONBOARDING.md` §5.6 明文
（「MB `primary-type` 為 Album 但 secondary-type 含 Compilation 者，照一般 Album 寫法即可；
本節針對 `primary-type=Compilation`」）與裁定第 167 條，**五張入選的整輯全部以一般 Album 寫，
`releaseType: "Album"`、`exceptionReason` 與 `exceptionEvidenceUrls` 留空**，年份仍取整輯首次出版年。

**裁定：正確，並且要往上回報一件事——這條線與 c-95／c-98／c-100 的形狀完全相同。**
裁定第 167 條那句「往後的派工信不要再預告『§5.6 會用得很兇』」，在 c-108 的派工信裡沒有生效。
**這是第四批（累計掃過的 release-group 已超過 6,500 個）出現同一個結果。**

### 1b. 與 2026-08-21 c-33 manifest 的先例衝突：以新規為準

池中那張 `Various Artists《The Roots of Chicha: Psychedelic Cumbias From Peru》(2007)`
在 `onboarding-manifest-c33-comps-20260821.json` 裡走的是
`releaseType: "Compilation"` ＋ `exceptionReason` ＋ **3 個** `exceptionEvidenceUrls`——
**而它的 MB `primary-type` 也是 Album、secondary-types 也是 [Compilation]**（481befd2）。
同一形狀、兩種寫法。

**裁定：採後者（§5.6 明文＋裁定 167，2026-09-05），不採 c-33 的先例（2026-08-21）。**
理由：§5.6 的條文本身就寫了這個排除句，c-33 那批是條文更新前的做法；
且判準是欄位（`primary-type`）而不是「現實中是不是整編輯」，只有欄位判準是可機器複核的。
**這一致性差異屬既有線上卡的資料，記在這裡供本機決定要不要回頭統一，本批不碰線上卡。**

---

## 2. 收錄門檻：**MB 釘得住 ＋（Apple 命中 或 CAA 307）**，兩條都空就不收

沿用 c-99 裁定第 11 條的形狀，但把它講死成一條可執行的門檻，因為這批踩到很多次。

- **MB 查無 → 不收**（本批不開 §1，派工信明訂）。
- **MB 釘得住、但 Apple 十個店面（`pe co cl mx ar us gb es fr br`，search ＋ 藝人目錄兩個端點，
  依裁定第 173／176 條）與 CAA release-group 端點**都**沒有來源 → 不收**，記進未收清單。
- **只有其中一條有 → 收**，並在 `risk` 寫明另一條要走哪裡（封面走 CAA／試聽預期 unavailable）。

實測結果：45 張裡 **Apple 命中 39 張**（a 組 21/21、b 組 18/24），
**其餘 6 張全部 CAA release-group 端點回 307**（Irakere 1978、Irakere II、Los Van Van《Songo》、
Inti-Illimani《Palimpsesto》《Imaginación》、Los Jaivas《El volantín》），封面有來源、試聽預期 unavailable。

**Apple 店面分佈**：`pe` 壓倒性多數（30 張），`cl` 5 張（Mambo Loco、Sandunguera、
La cultura de la basura、Toto's Bar、Cartagena!），`us` 3 張（Grupo Irakere、Sentido、Palenque Palenque）。
**`co`／`mx`／`ar`／`gb`／`es`／`fr`／`br` 七個店面一張都沒有先命中過**——
與裁定第 75 條一致（storefront 賣的是發行權涵蓋的地區）：這條線的數位發行權幾乎都握在祕魯 Infopesa／IEMPSA 一方。
**`pe` 排第一是對的，但 `co` 排第二是錯的**——哥倫比亞的三張反而落在 `cl` 與 `us`。

### 2b. `search` 端點在 `pe/co/cl` 是**有效的**（與 kr／cn 相反）

裁定第 176 條記 kr／cn 的 `search` 回 `resultCount: 0`。**LATAM 十個店面不是這樣**：
`search` 每一個店面都回得出結果（0–15 筆不等），失敗是「回了結果但標題不相符」，不是端點無索引。
**但長盤名與整輯仍然要走藝人目錄**（裁定第 173 條）：本批有 4 張是 search 落空、
改打 `lookup?id=<artistId>&entity=album&limit=200` 才確認「Apple 真的沒有」。

---

## 3. 撇號與連字號：**卡片一律 ASCII，MB 的 U+2019／U+2010 進 `queryAlias`**

這批同時踩到兩種「螢幕上一樣、`===` 下不相等」的字元（裁定第 49 條在同一書寫系統內的變形）：

| 形狀 | 出現處 |
|---|---|
| **U+2019 右單引號** | MB RG 標題《Al Ritmo de los Wembler’s》、《Saint Latin’s Day Massacre》；MB 藝人實體名「Los Wembler’s de Iquitos」 |
| **U+2010 連字號** | MB 藝人實體名「Inti‐Illimani」（連同「Inti‐Illimani 4／5／6」等 RG 標題） |

**裁定：卡片的掛名與盤名一律用 ASCII `'` 與 `-`，MB 的字元版本進 `queryAlias`。**
理由三條：(a) 池中 774 張盤名用 ASCII 撇號、只有 26 張用 U+2019，ASCII 是既有慣例；
(b) `chk-prop` 對盤名的非 ASCII 連字號有硬檢查，U+2010 會直接被標；
(c) Apple 在這批全部用 ASCII。**與 c-99 裁定第 2 條（U-Roy）同一個處理。**

**同一藝人在 MB 上兩種 credit 並存的實例**：Los Wembler's de Iquitos 的 1972／1975 兩筆 RG
credit 用 ASCII 撇號、1977 那筆用 U+2019。這不是資料錯誤，是 MB 逐筆建檔的結果，兩種都要查。

---

## 4. 掛名：**五處 artist-credit 與卡片掛名不同，一律採 MB 藝人實體名或池中既有寫法，不新增分裂**

| 卡片掛名 | MB artist-credit | 處理 |
|---|---|---|
| **Lucho Bermúdez** | 「Lucho Bermúdez y Matilde Díaz」（獨立群組實體 2d1d0c07，名下僅 1 個 RG） | 採個人實體名。Apple pe 1749165736 的掛名也是「Lucho Bermúdez」 |
| **Aníbal Velásquez** | 「Aníbal Velásquez y su Conjunto」 | 採藝人實體名 c06d3377 |
| **Chabuca Granda** | 「Chabuca Granda & Oscar Avilés」 | 採池中既有寫法（《Tarimba Negra》那張） |
| **Irakere** | 「Grupo Irakere」（1976／1977 兩筆 RG） | 採藝人實體名 70365513；**盤名保留《Grupo Irakere》**，於是掛名與盤名互為子字串 |
| **Los Ángeles Negros** | 1969 那筆是「Los Ángeles Negros」、1971／1974 兩筆是「Los Angeles Negros」（**無重音**） | 依裁定第 26／70 條一律採西語原文重音版，與 Apple 一致 |

**理由**：`audits/pool-artist-name-splits.md` 已經記著 37 組真重複卡與 86 個不合命名裁定的掛名，
本批不新增第 38 組。改掛名是卡單欄位、可逆；讓池裡多一種寫法則會擴散到下游每一支比對腳本。
**所有變體都寫進 `queryAlias` 與 `mbNote`。**

### 4b. 藝人閘要擋掉的「同名／近名別實體」，本批共六組

- **Los Shakers**：MB `5a6d492a`（UY，1963）vs `7882004e`（ES，Spanish 60s）——**字串完全相同**，只能靠 rgMbid。
- **Inti-Illimani**：MB `028ab6a5`「Inti‐Illimani Histórico」與 `618d26c5`「Inti‐Illimani Nuevo」是 2004 年分出的兩個團；
  Apple 也有 `40547661`「Inti Illimani Historico」。**《Canto de pueblos andinos》在 Apple 上唯一的命中就是 Histórico 的 2006 年別碟**，本批因此不收該張。
- **Ray Barretto**：MB `796ea4e8`「Ray Barretto & His Orchestra」（本名＋後綴，同 c-99 第 1 條的形狀）。
- **Juaneco y su Combo**：Apple 三個實體 `259924571`／`1608102447`／`6783015381`（「Juaneco & Su Combo」）。
- **Los Wembler's de Iquitos**：Apple 三個實體，其一為 `1760956287`「Los Wemblers de Iquitos」（無撇號）。
- **Los Ángeles Negros**：Apple 四個實體，含 `1271228993`「Los angeles negros」與 `1473829021`（無重音）。

### 4c. **Apple 的 `pe` 店面把 Various Artists 記成「Varios Artistas」**

《Cumbias Chichadélicas》在 `pe` 命中（951761593）時 `artistName` 是 **「Varios Artistas」**。
**藝人閘的雙向子字串比對擋得住它**（與「Various Artists」零重疊）——
這是 c-99 第 1 條 Slumdog 那筆（Apple artistName 記 Various Artists 而卡片是 A.R. Rahman）的**鏡像**。
已寫進該卡 `risk`，探測層要先放行。

---

## 5. 年份：**六處 Apple 與 MB 不一致，全部採 MB、行文不得斷言發行年**

依裁定第 77／91／141 條（Apple 的 `releaseDate` 只能當訊號、兩邊各有具體記載時不換值）：

| 卡 | MB | Apple | 處理 |
|---|---:|---:|---|
| Chacalón y la Nueva Crema（同名） | 1978 | 1976 | 採 1978（Horóscopo HLP 001，編號 001 與 1978 相符） |
| Chacalón《El Soberano de la Cumbia》 | 1982 | 1983 | 採 1982 |
| Quilapayún《Quilapayún 5》 | 1972 | 1973 | 採 1972 |
| Joe Bataan《Gypsy Woman》 | 1967 | 1968 | 採 1967 |
| Los Ángeles Negros《Y volveré》 | 1969 | 1970 | 採 1969（Apple 的 1970 ＝ MB 那筆 XW release 的日期） |
| Los Van Van《Sandunguera》 | 1986 | 2006 | 採 1986（Apple 的 2006 是數位再發年） |

另有四張 Apple 的 `releaseDate` 直接是數位再發年（2018／2025），不列入爭議：
《El gran cacique》(2018)、《Los charapas de oro》(2018)、《Esta noche la paso contigo》(2018)、
《El brujo》(2025 Remastered)。**《El brujo》那筆要在上架備註標明是 2025 重製版**（同 c-99 裁定第 5 條）。

---

## 6. 軌數：**八處兩說，一律不填 `originalTrackCount`、行文不得寫原盤有幾軌**

依裁定第 140／141／175 條（不開原盤來源就不對軌數下判斷；以攤開的曲目列而非 `trackCount` 欄為準）：

| 卡 | 兩說 |
|---|---|
| Los Wembler's《La danza del petrolero》 | PE Decibel 原盤 12 軌 vs XW 盤 18 軌（Apple 也有 12 軌與 18 軌兩筆） |
| Irakere《Irakere》(1978) | 1978 CU／1979 US 原盤 5 軌 vs 2007 FR／2016 JP 再發 8 軌 |
| Eddie Palmieri《Justicia》 | 兩筆 9 軌 vs 一筆無日期無國別的 7 軌 |
| Eddie Palmieri《Sentido》 | MB 兩筆皆 5 軌 vs Apple「Sentido (Remastered)」6 軌 |
| Willie Colón《El juicio》 | 三筆 8 軌 vs 2009 XW 數位 12 軌 |
| Quilapayún《Basta》 | 1969／2003 皆 12 軌 vs 1991 瑞士 DOM 17 軌 |
| Los Jaivas《Canción del sur》 | 1977 原盤 7 軌 vs 1994 EMI 再發 11 軌（**Apple 拿再發的曲目掛原盤的年份**） |
| Los Shakers《Toto's Bar》 | 1968 UY 原盤 11 軌 vs 2007 AR 再發 16 軌 |
| Inti-Illimani《Imaginación》 | **四個軌數**（12／14／16／16）與**兩個盤名**（Imaginación／Imagination） |
| Aníbal Velásquez《Mambo Loco》 | CD 版 10 軌 vs LP 版（AALP 067）11 軌 |

---

## 7. 授權狀態：**五筆 release 的 status 是 Promotion 或空，逐筆標明不採為背書**

依裁定第 43／57／65／78 條逐筆查 `status`：

- **Los Ángeles Negros《Esta noche la paso contigo》**：唯一一筆 release（1971／CL）**status 空**，同 RG 無第二筆可交叉。
- **Los Ángeles Negros《Aplaude mi final》**：唯一一筆（1974／US）**status 空、廠牌名也空**（只有 catno SLP 00465）。
- **Los Prisioneros《La cultura de la basura》**：1988／CO 那筆是 **Promotion**（且只有 10 軌，是刪節版）；1995／CL 有一筆 **status 空**。
- **Los Destellos《Constelación》**：三筆中有一筆國別與 status 皆空。
- **Aníbal Velásquez《Mambo Loco》**：四筆中有一筆 2010-04／XE 標 **Promotion**。

**五處都已寫進該卡 `risk`，行文不得拿它們當授權背書。** 其餘 40 張的 release 全數 Official。

**另有五張的 release「廠牌名欄是空的」**（只有 catno）：Los Ángeles Negros《Aplaude mi final》、
Los Jaivas《El volantín》《Canción del sur》、Los Prisioneros《Pateando piedras》、
Inti-Illimani《Imaginación》。**這五張的 `label` 欄寫成「catno ＋（MB 未填廠牌名）」，
行文不得斷言發行廠牌**——同 c-91《找一個新世界》那筆的處理。

---

## 8. 政治時序：**一句都沒寫**（c-98 的教訓）

派工信特別點名 Víctor Jara、Violeta Parra、Quilapayún、Inti-Illimani 這一系的
「流亡前／政變後／生前最後」在中文與英文圈流傳很廣但常常不精確。

**裁定：本批 b 組的 Quilapayún(2)、Inti-Illimani(2)、Los Jaivas(2)、Los Prisioneros(2) 八張，
`why` 一律只寫「哪一年、哪家廠牌、哪個編號、幾軌、在該藝人目錄裡排第幾、池中已有哪幾張」，
不寫任何與 1973 年政變、流亡、審查有關的時序主張。** 那些主張沒有一條是我當場查得到具名來源的，
依派工信「沒有具名來源就不要寫」，整類捨去。研究層若查得到來源可以再加回去。

同理，全批 45 張的 `why` **沒有一處寫「第一張／最後一張／唯一／最」**。
唯一接近的是「MB 名下年份最早的一筆」「編號最早的一筆」——那是**對 MB 資料庫狀態的陳述**、
不是對現實的主張，且每一處都寫明了是 MB 的分頁列舉結果。

---

## 9. 未收清單（13 筆）：**全部釘得住 MB，但下游來源不足或身分有疑**

**這批不開 §1**，以下記進未收清單，**可進 §1 補遺批（c-113～c-115）**。

### 9a. MB 釘得住、Apple 十店面 ＋ 藝人目錄兩個端點皆查無、CAA 也無 → 不收（4 筆）

| 藝人 | 專輯 | 年 | MB RG | 情況 |
|---|---|---|---|---|
| Los Van Van | El baile del buey cansao | 1982 | `ef6f0ba5` | Apple 10 店面 0 筆（`gb` 回 1 筆但不相符）、藝人目錄 3736028 的 40 餘筆無此碟；**CAA 404**。兩條鏈都沒有來源。**可進 §1** |
| Inti-Illimani | Canto de pueblos andinos, Volume I | 1973 | `ad22a351` | **CAA 404**；Apple 唯一命中 cl 714045730 是 **Inti Illimani Historico**（2004 年分出的另一個團）2006 年的別碟，不得取用。**可進 §1** |
| Inti-Illimani | Inti-Illimani 4: Hacia la libertad | 1975 | `90243438` | **CAA 404**；盤名帶 U+2010。**可進 §1** |
| Lucho Bermúdez | Burucuca | 1967 | `c95a86ab` | Apple 10 店面 search 全 0；藝人目錄 250639729（34 筆）與 131249520（1 筆）皆無。**可進 §1** |

### 9b. MB 釘得住、Apple 查無（CAA 未測或不足以單獨支撐）→ 本批不收（4 筆）

| 藝人 | 專輯 | 年 | MB RG | 情況 |
|---|---|---|---|---|
| Los Destellos | Los Destellos | 1967 | `e6f6fabc` | 自我同名首張。Apple 兩個藝人實體（265129124 共 33 筆、1460688936 共 9 筆）全部十個店面都沒有這張。**藍圖 §五-1 意義上的「第一張該有的」，但買不到——優先進 §1** |
| Los Destellos | Clase aparte | 1971 | `7a12ccca` | Apple 10 店面 search 全 0、藝人目錄亦無 |
| Juaneco y su Combo | Juaneco y su Combo | 1969 | `9c340d00` | 自我同名首張。Apple search 十店面各回 15 筆、無一相符；藝人目錄 259924571 的 20 餘筆亦無。**同屬「第一張該有的」，優先進 §1** |
| Los Wembler's de Iquitos | La amenaza verde | 1975 | `21046d72` | **Apple pe 1806309097 其實有**（12 軌，1975）；純粹是本批把該團的額度用在 1972／1975／1977 三張上。**下一批可直接收，不必進 §1** |

### 9c. 考古整輯：MB 釘得住但 Apple 十店面查無 → 不收（3 筆）

| 整輯 | 年 | MB RG | 情況 |
|---|---|---|---|
| Various Artists《The Roots of Chicha 2: Psychedelic Cumbias from Peru》 | 2010 | `34769c3e` | Barbès 續集。Apple 十店面 search 各回 2 筆、無一相符（池中已有第一集，2007）。**可進 §1** |
| Various Artists《Colombia! The Golden Age of Discos Fuentes…1960-76》 | 2007 | `f2bd7461` | Soundway。Apple `pe`／`co` 回 0、其餘店面回 1–15 筆但無一相符。**可進 §1** |
| Various Artists《Cumbia Beat, Volume 1》 | 2011 | `0fac42a8` | Vampisoul。Apple 十店面各回 9–14 筆、無一相符。**可進 §1** |

*（另查過 Analog Africa《Diablos del ritmo》`a2614d77`，Apple 十店面全 0，同上。）*

### 9d. 身分有疑 → 不收（2 筆）

| 藝人 | 專輯 | 年 | MB RG | 情況 |
|---|---|---|---|---|
| Irakere | Chekere | 1977-03 | `c3824cfc` | **MB 轄下兩筆 release 都是芬蘭盤**（1977-03／FI、1998／FI），沒有古巴或美國原盤條目，這張碟在該樂團目錄裡的身分講不清楚。改收 1978 年的同名盤（`f296a22c`，古巴 Areito LD-3797 ＋ 美國 Columbia JC 35655） |
| Los Saicos | Saicos | 1966 | `21e2a91f` | MB 只有兩筆 release（1966／PE 標題作「Los Saicos」、2006／PE），**無廠牌、無軌數**，且內容與 2010 年 Munster 那張《¡Demolición! The Complete Recordings》高度重疊。改收 Munster 那張 |

---

## 10. 實掃結果：這條線在池中的現況（撞卡檢查）

**實掃 `seed_cards.json` 全 14,424 列**（不是取樣，裁定第 27 條），並把 `desc-tools/batches/cards/`
底下 c-93～c-112 各批的卡單一起算進「池中已有」（`dedup-crossbatch.mjs` 掃 58 批、2,693 張，撞卡 0）。

| 場景 | 池中現況 |
|---|---|
| **chicha（祕魯）** | **0 張**。Los Destellos／Juaneco y su Combo／Los Mirlos／Los Wembler's／Chacalón 五位全零 |
| **cumbia（哥倫比亞）** | **1950–70 年代 0 張**。哥倫比亞最早的一張是 Joe Arroyo y La Verdad《Musa Original》(1986)，其後是 Grupo Niche(1990)、Totó la Momposina(1993)、Carlos Vives(1993)、Shakira(5)、Juanes(1)。Lucho Bermúdez／Aníbal Velásquez／Los Corraleros de Majagual／Fruko y sus Tesos 全零 |
| **祕魯（非 chicha）** | 3 張：Chabuca Granda《Tarimba Negra》(1978)、Susana Baca《Susana Baca》(1997)《Eco de Sombras》(2000)。Los Saicos 0 張 |
| **智利** | 8 張：Víctor Jara 3（掛名有 `Victor Jara`／`Víctor Jara` **兩種寫法**，實掃時兩種都查了）、Violeta Parra 2、Inti-Illimani 1、Quilapayún 1、Los Jaivas 1、Los Prisioneros 1、Los Ángeles Negros **0** |
| **古巴** | Irakere **0**；Los Van Van 1、Celia Cruz 6、Buena Vista Social Club 2、Compay Segundo 2、Cachao 1 |
| **salsa dura（紐約）** | 已經很深：Willie Colón 含合掛 11 張、Eddie Palmieri 6、Ray Barretto 4、Héctor Lavoe 4、Rubén Blades 6、Fania All-Stars 2、Tito Puente 5、Joe Bataan **1** |
| **烏拉圭** | **0 張** |
| **拉美考古選輯** | 1 張：`Various Artists《The Roots of Chicha: Psychedelic Cumbias From Peru》(2007)` |

**c-98 已收、本批不重複提案的兩張**（在 `desc-tools/batches/cards/c98-cards.json`、尚未上線）：
`Quilapayún《La Fragua》(1973)`、`Inti-Illimani《Inti-Illimani 2: La nueva canción chilena》(1974)`。
兩張都寫進了對應卡的 `mbNote`「刻意不釘」。
另 `Celia Cruz & Ray Barretto《Ritmo en el corazón》(1988)` 在 c-99 卡單裡，也已計入 Barretto 的深度。

**一句話**：**chicha 與 cumbia 這條線在池中是真的從零開始**（本批 a 組 21 張全部是新藝人或新場景）；
**salsa dura 已經接近飽和**（b 組替 Palmieri／Barretto／Colón 各補兩張就到頂，再往下就是次要目錄）；
**nueva canción 是「人到齊、碟不夠」**（四位各只有 1–2 張，但 MB 上還有二三十張釘得住的正規盤可補）；
**烏拉圭與 1960 年代的祕魯車庫**（Los Shakers、Los Saicos）本批各開一張，是全新的兩格。

---

## 11. 盤名的「子字串包覆」：本批十處，全部寫進「刻意不釘」

第 162 條說盤名被縮短過的卡，子字串比對是反的。本批同型的十處：

| 卡 | 形狀 |
|---|---|
| Irakere《Grupo Irakere》 | **掛名（Irakere）是盤名的子字串**；MB 另有《Grupo Irakere / Teatro Amadeo Roldan recital》完整包含它 |
| Irakere《Irakere》(1978) | 與 1982 年的《Irakere》(e461d9ca) **同名雙胞胎**，只能靠 rgMbid |
| Irakere《Irakere II》 | 盤名完整包含上面兩筆（羅馬數字，裁定第 168 條那道測不到） |
| Los Destellos《Destellantes》 | 與團名 Los Destellos 前六個字母相同；MB 另有《Destellos》《Éxitos》兩筆無年份整編輯 |
| Los Mirlos《El sonido selvático》 | MB 有《Cumbia amazónica》**兩筆同名 RG（1978／2014）**、《El Milagro Verde》**兩筆同名 RG（1975／1980）** |
| Los Wembler's《Fiesta en la selva》 | Apple 另有《El Encanto de la Selva》《Fiebre en la Selva》兩張（MB 未建檔），三個盤名都含 Selva |
| Joe Bataan《Gypsy Woman》 | MB 有《Subway Joe & Gypsy Woman》與《Gypsy Woman & Subway Joe》**兩筆互為倒裝的二合一**，都完整包含本張 |
| Quilapayún《Quilapayún 5》 | 「團名＋數字」系列，與《Quilapayún Nº 3》《4》《Quilapayún》(1967) 互相包住 |
| Quilapayún《Basta》 | MB 另有《Basta / Adelante!》(1988) 完整包含它 |
| Los Jaivas《Canción del sur》 | MB 另有《Canción del sur / Aconcagua》(1999 二合一) 完整包含它 |
| Various Artists《Palenque Palenque》 | 盤名前兩字重複，MB 上一堆叫《Palenque》的別碟（Felix Hess、DJANGO、Kombilesa Mi） |
| Los Jaivas《El volantín》 | MB 有**兩筆同名的《Los Jaivas》**（1972／1975-12-02），本批都不碰 |

**全部依裁定第 162 條第 3 點寫成「刻意不釘：`<id>`《盤名》（理由）、…」的固定格式、標記寫在 MBID 前面，
且一個標記帶多個 MBID 時中間沒有插入正面的「釘住」字樣。**

---

## 12. 三處 Apple 的盤名變形，`queryAlias` 已裝滿

同 c-99 裁定第 10 條（字串本身的切詞方式也是一個變數）：

- **Irakere《Grupo Irakere》**：Apple us 449865814 把盤名拼成「**Groupo** Irakere」（多一個 u）。
- **Ray Barretto《Rican/Struction》**：Apple pe 1464280570 作「Rican Struction」（**斜線改成空格**）。
- **Various Artists《Cartagena!…》**：Apple cl 1611876689 把 `and` 改成 `&`、年段寫成「1962-72」而 MB 的 US release 寫「1962 - 72」（帶空格）——**同 c-99 Ali and Toumani 那筆的形狀**。
- 另：**Los Mirlos《Tirense con la escoba》** MB 無重音、Apple 作「**Tí**rense」，差一個重音符號。

---

## 13. 一件要往上回報的事：`chk-prop` 不會攔「把非合輯寫成合輯」

`chk-prop.mjs` 只在 `releaseType !== 'Compilation'` 而例外欄位非空時才標「非合輯卻帶例外欄位」。
**反過來——把一張 MB `primary-type=Album` 的碟寫成 `releaseType: "Compilation"` 並補上兩個 URL——
工具完全不會標。** 派工信裡那句「填了會被 `chk-prop` 判『非合輯卻帶例外欄位』」對這個方向不成立。

**這代表第 1 條那個判準目前只能靠人守。** 若要機器化，`chk-prop` 需要能回問 MB 的
`primary-type`（或在提案裡多一個 `mbPrimaryType` 欄位讓它比對）。**本批 45 張已逐張人工核過。**
