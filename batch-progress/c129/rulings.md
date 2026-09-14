# c-129 a 組（緬甸與寮國，軍政府時期）　策展層裁定與交件說明（2026-09-14）

批次規格見 `batch-progress/CURATION-BRIEF-c128-c130.md` 第〇、二節，
欄位規格沿用 `CURATION-BRIEF-c127.md` → `c126` → `c103plus` → `c93plus` 第一節。
收錄判準沿用 c-123～c-125 體制線：**產製條件，不是曲風**；行文一律政治與宗教中立。

## 〇、交件數字

| 項目 | 數 |
|---|---:|
| `prop-a.json` | **23 張、14 位掛名** |
| 緬甸／寮國 | **緬甸 16 張（10 位）／寮國 7 張（5 位）** |
| 年份 | **1972–2013**。23 張的 `year` 一律取**所釘 release-group 的 `first-release-date`**；其中 Princess Nicotine 取的是 1994 年 Majora 原盤（不是 2004 年 SF006 重發），而田野錄音輯、78 轉整編輯與國際廠牌盤的 `year` 是**出版年而非錄音年**，**逐張在 `risk` 明寫「這是發行年、不是錄音年，行文不得斷言錄音於某年」** |
| `releaseType` | Album 17／**Compilation 6（全部走 §5.6）** |
| 釘住 release-group MBID | **23/23，全部 pinned，零 §1 人工身分** |
| CAA release-group 探測 | **200：21 張／404：2 張**（500：1 次，重試後轉 200，見裁定 339） |
| `node batch-progress/c129/chk-prop.mjs a` | **a 組自身標記 0**（欄位、曲風、年份、連字號、§5.6、與線上池撞卡全過） |

---

## 第 330 條（本批立，本批最重要的一條）：**緬甸在 MB 上不是「沒建檔」，是「全部建成緬文原文主名」**

派工信與 `CURATION-BRIEF-c128-c130.md` 第二節都寫著：主線 2026-09-14 用
**20 個緬甸掛名與關鍵字只回 3 筆**（`Mun Awng`／`Myanmar 1990s Music`／`Big Bag`），
並下結論「**這不是查法問題，是 MB 沒建檔**」，因此把 a 組的緬甸預期壓到「個位數」。

**這個結論是錯的，而且錯在查法。** 本組改用 `artist?query=country:MM&limit=100` 直接列舉之後：

| 派工信說「全域零筆」的掛名 | MB 上的實際情形 |
|---|---|
| Sai Htee Saing | `fa61446c-0a1c-4e1d-8842-1d416a69b346`＝**စိုင်းထီးဆိုင်**，Person／MM／1950-09-23，名下 **40 個以上 release-group**（1974–2007） |
| Khin Maung Toe | `73b2c5a1-c8be-47ea-946e-a53fbfafe55b`＝**ခင်မောင်တိုး**，Person／MM／1950-04-02，名下 **34 個 RG**（1980–2017） |
| Htoo Eain Thin | `fbfb87b4-d0fb-496d-a188-6a1590da039c`＝**ထူးအိမ်သင်**，Person／MM／1963-07-01，名下 **21 個 RG**（1987–2023） |
| Zaw Win Htut | `ff0d72c4-4783-4ef3-98af-12608b108acf`＝**ဇော်ဝင်းထွဋ်**，Person／MM／1964-01-21，名下 **9 個 RG**（1984–2019） |
| Lay Phyu | `355705f3-aaf3-488a-8d50-fd6f62e6b513`＝**လေးဖြူ**，Person／MM／1969-05-19，disambiguation『Rock အဆိုတော်』，名下 **7 個 RG** |
| **Iron Cross（緬甸那支）** | `31e48b17-0501-4f1b-aca7-cd6032a114f8`，**Group／MM／1989，disambiguation 明寫『Burmese rock band』**，名下 1 個 RG |

**成因**：MB 把緬甸藝人一律以緬文原文當主名，**多數連拉丁別名都沒有**，
所以拉丁轉寫的 `artist?query=artist:"Sai Htee Saing"` 一定回 0。
`Iron Cross` 是唯一以拉丁團名建檔的一筆，**但主線那次連它都沒查到**，
因為全域查 `Iron Cross` 會被上百個同名西方團淹掉——要加 `AND country:MM` 才浮得上來。

**這與第 179／250 條是同一個家族的第三種變形**：
- 179／250 是「查 `artist:"漢字"` 回 0 不等於查無此人」（漢字只存在於 alias）；
- **本條是它的鏡像**：**查拉丁轉寫回 0 也不等於查無此人**（拉丁形根本不存在於該實體）。

**修正後的做法（給 c-130 與往後所有非拉丁文字圈的批）**：
**判斷「某個國家在 MB 上有沒有建檔」，不能只查掛名字串，一定要先打
`artist?query=country:<ISO>&limit=100` 直接列舉那個國別的藝人實體。**
「N 個關鍵字回 M 筆」這種量測，**在非拉丁文字圈一律不可信**。

**這一條直接改變了本組的名額分配**（見裁定 336）。

---

## 第 331 條（本批立）：緬文與寮文掛名一律取 **MB 藝人實體的主名**，拉丁轉寫全部進 `queryAlias`

派工信寫「有原文時原文優先，拉丁轉寫進 `queryAlias`」，但實作上會與第 20／6 條
（「取 artist-credit 字串」）打架，本批出現三種形狀，逐一處置：

| 形狀 | 實例 | 處置 |
|---|---|---|
| **artist-credit 是拉丁、實體主名是緬文** | 《Music of the Saung • Burmese Harp》的 artist-credit 是 `U Myint Maung`（`U` 是敬稱不是名字），實體主名是 `အင်းလေး မြင့်မောင်` | 取**實體主名**，三種轉寫（U Myint Maung／Inle Myint Maung／Inlay Myint Maung）全進 `queryAlias` |
| **同一位在不同碟上有三種 artist-credit** | 同一位另有 `Inle Myint Maung and Yi Yi Thant`（2003 Smithsonian）與 `အင်းလေး မြင့်မောင် & ရီရီသန့်`（1982） | 兩張都取實體主名，**否則同一位會在池中裂成三個掛名** |
| **合掛名** | Big Bag《နာမည်ကြီး》(2004) 的 artist-credit 是 `Big Bag & Chit Thu Wai` | 依 c-123 裁定 258 的判準（合掛名是**解歧義**還是**製造分裂**）——這裡是製造分裂，**該張整張不收**，改收 2007 年的《AD 3000》 |

**依判準 2（可逆：改的是卡單的 `artist` 值，不是卡池結構）直接定。**
偏離 artist-credit 的理由逐張寫進 `risk` 與 `mbNote` 兩處。

**寮文側同形**：`Tiao Phün Muang` 含變音 ü、`Nouthong Phimvilayphone` 只有一種轉寫且無別名、
`Boua Xou Mua` 的苗語人名有姓名順序兩種寫法——三筆都已把替代寫法填進 `queryAlias`。

---

## 第 332 條（本批立）：**緬甸國內原盤的 `label-info` 與 `media.format` 大量是空的**——但那是問過之後的空

本組對 23 張逐一打 `release?release-group=<id>&fmt=json&inc=media+labels`（裁定 259 的紀律）。
**緬甸境內壓製的 9 張裡，有 8 張的 `label-info` 回的是空陣列**，
其中 **5 張連 `media.format` 都是空的**（只回得到軌數）：

| 卡 | release 端點實情 |
|---|---|
| ဇော်ဝင်းထွဋ်《မာကျူရီည》(1984) | label-info 空、**Cassette×15** |
| လေးဖြူ《ပင်လယ်အော်သံ》(1994／2003 兩筆) | label-info 皆空、**Cassette×13／CD×13** |
| လေးဖြူ《ပါဝါ ၅၄》(1996) | label-info 空、CD×12 |
| ထူးအိမ်သင်《မှော်ဆရာအိပ်မက်》(1988-02) | label-info 空、**format 欄亦空**、16 軌 |
| စိုင်းထီးဆိုင်《ပျောက်ဆုံးသော နိဗ္ဗာန်ဘုံ》(1975) | label-info 空、**format 欄亦空**、14 軌 |
| ခင်မောင်တိုး《LIVE 94》(1994) | label-info 空、**format 欄亦空**、27 軌 |
| လွှမ်းမိုး《ရန်ကုန်သားလေးကျနော်ပါ》(1975) | label-info 空、**format 欄亦空**、15 軌 |

**只有兩張回得出廠牌**：Iron Cross《ရာစုသစ်》的 label-info 是 **`Iron Cross`（廠牌名＝團名，自營發行形態）**、
Big Bag《AD 3000》是 **`ချိုကြည်သာ`（緬文廠牌名）**，兩者都沒有目錄號。

**做法**（沿用裁定 259／227 的界線，逐張寫進 `risk`）：
- `label` 欄一律寫成「**release 端點的 label-info 實測為空**」，**不得寫「MB 未填廠牌」**，更不得補一個沒有來源的廠牌名。
- `media.format` 為空的 5 張，**下游行文一律不得寫載體**，只能寫軌數。
- `secondary-types` 為空**不代表**是錄音室原盤（裁定 227），這 5 張連形態都判不出來。

---

## 第 333 條（本批立）：§5.6 的兩個舉證網址取 **release-group ＋ release 兩個 MB 資料庫網址**，並記下三條路都走不通的實測

本批 6 張合輯的 `exceptionEvidenceUrls` 全部是 MB 的 release-group 與 release 兩個網址，
**逐頁以 `ws/2` API 取回逐格讀過**（裁定 263 的做法：`musicbrainz.org` 網頁版擋機器抓取，拿 curl 驗會得到假的失敗）。

**為什麼不用廠牌頁或 Discogs——三條路本批都實測過**：

1. **Sublime Frequencies 官網**（`https://www.sublimefrequencies.com/`）：網站本身 200 可讀，
   但 `/categories/catalog` **只掛 48 筆在售品**，本批四張緬甸輯與一張寮國輯（SF006／SF024／SF035／SF044／SF036）
   **一筆都不在上面**（站內唯一與本區相關的是 `/products/694616-…-mien-yao-cannon-singing-in-china-vietnam-laos`）。
   直接猜 product slug 回 **404**。**廠牌總覽頁依裁定 257 本來就不算證據，這裡連總覽頁都沒有本輯。**
2. **Smithsonian Folkways 專輯頁**：`https://folkways.si.edu/…` 回 **403**，讀不到。
3. **Discogs**：`api.discogs.com/database/search` 無 token 時**回 `items: 0`**（不是 403，是空結果），
   拿不到任何 master／release id，因此**無法構造出一個「我讀過」的 Discogs 網址**。
   —— c-124 那批能用 Discogs master 網址，是因為當時拿得到 id；**本批拿不到，就不掛**。

**依判準 1（有先例）＋判準 3（卡住整條線）當場定**：先例是 c-123 的 Grünberg 那張與 c-124 裁定 263，
不定就沒有任何一張 §5.6 收得進來。`exceptionReason` 裡逐張指明「第一個網址支持哪幾格、第二個支持哪幾格」。

---

## 第 334 條（本批立）：《Radio Myanmar (Burma)》**MB 未標 Compilation**——照一般 Album 寫，但下游不得寫成個人專輯

`04c1f881-1f36-4d4a-a89f-c4413f7000da`：`primary-type` Album、**`secondary-types` 為空**、
掛名 Various Artists、SF044、CD **44 軌**。形態上顯然是多來源錄音的集成，
但依 `CURATION-BRIEF-c93plus.md` 第一節的明文（primary-type Album 而 MB 未標 Compilation 者照一般 Album 寫），
**本卡填 `releaseType: "Album"`、不填任何例外欄位**——填了 `chk-prop` 會判「非合輯卻帶例外欄位」。

**但這是欄位規則，不是事實**：`risk` 已逐字寫明「下游行文要知道它實質上是多來源錄音的集成，
不要寫成某一位藝人的專輯」——**這正是 c-124《Persian Music Hits 8》那個坑的同形**
（十軌是十個不同掛名，照策展稿行文就會寫成「他的十首歌」）。

---

## 第 335 條（本批立）：**再發廠牌反查確實比查掛名有效，但有效的只有一家**

派工信說「用再發廠牌反查……這條路比查掛名有效得多」。**實測是對的，但集中度極高**：

| 廠牌 | MB label MBID | 目錄筆數 | 本區（緬甸／寮國）產出 |
|---|---|---:|---|
| **Sublime Frequencies** | `6fed5076-6bad-4b8d-8cca-fee530455666` | **165 筆** | **緬甸 5 筆（SF006／SF024／SF035／SF044／SF078）＋寮國 1 筆（SF036）** |
| Akuphone | `2e94e12a-59c9-47b6-ae4c-18c1265fd662` | 目錄已拉但未記總數 | 寮國 2 筆但**都不收**：`Chansons Laotiennes`（AKUMS1001，數位 4 軌，形態過短）、`Music of Southern Laos`（2018，artist-credit 是 `Various Artists + Laurent Jeanneau` 合掛名） |
| Sham Palace | `069b2f3c-31c8-42f6-bc69-a1ea46c68fa3` | **7 筆** | **0**（敘利亞、印尼、拉美各一，無緬寮） |
| Discrepant | `d335e5c2-6f86-4eb1-8e2a-083ce9697659` | 162 筆 | **0**（Kink Gong 名下 11 筆全是中國、西藏、新疆、坦尚尼亞，**MB 上沒有寮國那批**） |
| Honest Jon's | `5ee68d72-8ae8-4226-be37-a11aac89a6db` | 未拉目錄 | 前四家已足額，未續查 |
| Finders Keepers／Dust‐to‐Digital | `8e2866e7…`／`a56452c5…` | 未拉目錄 | 同上 |

**結論**：這一區在西方再發廠牌裡**幾乎等於 Sublime Frequencies 一家**（6/23 張）。
Sham Palace 與 Discrepant 這兩條路**實測是空的**，下一批不必再走。

---

## 第 336 條（本批立）：名額分配從「緬甸個位數＋寮國補」改成 **緬甸 16／寮國 7**

派工信的分配前提是裁定 330 那個錯誤結論。改用 `country:MM` 列舉後，
**緬甸可收的量遠超過 23 張的額度**（光 စိုင်းထီးဆိုင် 一位就有 40 個以上的 RG），
而寮國在 MB 上的總量反而**很薄**（見裁定 337）。

**依判準 2（可逆：改的是名額分配，不是卡池結構）與判準 3（卡住整條線）當場定**：
若照原分配硬湊「緬甸個位數」，等於把剛查出來的一整片目錄丟掉，再去寮國硬湊十幾張不存在的碟。

**最後的分配**：緬甸 16 張（4 張 Sublime Frequencies 系列輯＋1 張 SF 廣播輯＋11 張緬甸掛名的原盤）、
寮國 7 張（涵蓋 1972 khène 黑膠、1989 Ocora、1994 Nimbus molam、1995 Amiata、1995 Arhoolie 苗族、
2007 SF 田野輯、2008 VDE-GALLO 宮廷樂——**四種音樂形態各有代表**）。

---

## 第 337 條（本批立）：**寮國在 MB 上的實際可得量：以「Laos」為題的 release-group 全域只有 38 筆，其中可收的約 10 筆**

`release-group?query=releasegroup:Laos&limit=60` 全域回 **38 筆**，逐筆看過之後：

- **本批已收 7 筆**（見上）。
- **可收但本批名額不足的 3–4 筆**（下一批現成）：
  `1ad4842e-00ac-4946-814e-e4eac2042b7a`《Musiques et Chants du Laos》(2005，Compilation)、
  `c01a1956-d44b-44ee-a95d-494bf4381337`《Laos : Molams & Mokhènes》(2009)、
  `ce2ff9d9-90e0-4ff0-8a97-ff466d3bab4b`《Music of Laos: Khmou', Oï, Brao, Lao, Phou-noï, Kui, Lolo, Akha, Hmong and Lantene Traditions》(2004，Compilation)、
  `5b0a7571-74f4-41de-900c-ae75a648798c`《Yao (Moon) Ceremony Phongsaly Laos》(Kink Gong，2010)。
- **判掉的**：
  `f53f5d9e-ab95-4a22-a98d-f6db740840f5`《Laos - Musique du nord》(1972)——**`primary-type` 欄整個是空的**，不是 Album；
  `feea33b0`《Music From Thailand and Laos》／`6e99ead6`／`15d351c6`／`105642c5`（Southern Laos and Vietnam 三筆）——**`primary-type` 是 `Other`**；
  `d1ce5840`《Laos: Traditional Music of the South》(1992)——**artist-credit 是錄音者 `Jacques Brunet` 而不是演出者**，掛名形態不宜進池；
  `9e78f73c`《Music of Laos: The Buddhist Tradition》(2003)——宗教曲目，本批行文界線避開宗教評價故不收；
  `f7f7d4c5-82f2-3230-b68e-8ea0f8f9d5b0`《Bamboo Voices: Folk Music From Laos》（Khamvong Insixiengmai Ensemble）——**`primary-type` 與 `first-release-date` 皆空**；
  `166381e3`／`46f26179`（Complete National Anthems of the World 兩卷）、`92583e0b`（短波電台錄音）、
  `e41372bb`《Source Of Laos》(Rotkin，寮國死亡金屬)、`0bdf2b38`《Laos Voltage!》、`90871f3f`《Lost in Laos》、`cd6b4dd7`（Bérurier Noir 單曲）——**與本場景無關**。

**另記一筆**：`artist?query=country:LA&limit=100` 回得到大量 LA 藝人實體
（Nang Nak、Thao Keota、Molam Som、Khamsaen Wongsimuanfg 等數十位），
**但那些幾乎全是田野錄音合輯裡的單軌掛名，名下 0 個 release-group**——
它們是 `Ethnic Minority Music of Southern Laos` 這類輯的曲目來源，不是可以獨立成卡的掛名。
**這正是本批 §5.6 `exceptionReason` 說「成盤形態只有合輯這一種」的實證。**

---

## 第 338 條（本批立）：跨批國別邊界——**東南亞的其他國別已被三批收走，本組逐張避開**

實掃卡池全 24,138 列確認，以下已在池中，**本組一張都沒碰**：

- **柬埔寨與越南＝c-64**：《Cambodian Rocks》《Don't Think I've Forgotten》《Groove Club Vol. 2／3》
  《Dengue Fever Presents: Electric Cambodia》《Cambodian Cassette Archives》、Banteay Ampil Band、Phạm Duy。
- **泰國與印尼＝c-SEA 與 c-52**：《Molam: Thai Country Groove From Isan》、《The Sound of Siam》兩輯、
  《Theppabutr Productions》、Chaweewan Dumnern、The Paradise Bangkok Molam International Band 三張、
  《Thai? Dai!》、《Saigon Rock & Soul》。

因此 Sublime Frequencies 目錄裡的 `Ethnic Minority Music of Northeast Cambodia`(SF027)、
`Ethnic Minority Music of North Vietnam`(SF037)、`Radio Phnom Penh`(SF020)、`Radio Thailand`(SF028)、
`Shadow Music of Thailand`(SF042)、`Siamese Soul`(SF050)、`Thai Pop Spectacular`(SF032)
**本組一律不收**，理由逐張寫進相關卡的刻意不釘。

**⚠ 留給下一批的一筆**：`Radio Thailand`(SF028)、`Shadow Music of Thailand`(SF042)、
`Siamese Soul`(SF050)、`Thai Pop Spectacular`(SF032) 這四張泰國輯**實掃池中並沒有**
（池中的泰國卡是 Soundway 與 ZudRangMa 系的），**c-129 b 組（泰國軍政府時期）可以直接用**。

---

## 第 339 條（本批立）：封面與店面的實測（**只寫觀察，不下結論——裁定 254**）

### CAA（23 張逐張探測 `coverartarchive.org/release-group/<id>`）

- **200：21 張／404：2 張**（命中率 **91.3%**，明顯高於 c-123 的 66.7%）。
- **404 的兩張**：`အင်းလေး မြင့်မောင်《Music of the Saung • Burmese Harp》`(1978 日本 Seven Seas LP)、
  `Tiao Phün Muang《Laos: Musique de l'ancienne cour de Luang Prabang》`(2008 VDE-GALLO 數位)。本機端要補只能人工掃圖。
- **500 一次**：`380493d0`《Laos - L'art Du Khène》第一次回 **500**，
  **依裁定 222 重試兩次後回 200、1 張圖**——本批唯一一次觸發重試，**5xx 不是查無**。
- 圖數最多：Big Bag《AD 3000》**4 張**、စိုင်းထီးဆိုင်《ပျောက်ဆုံးသော နိဗ္ဗာန်ဘုံ》**3 張**、
  《Laos: Lam Saravane / Musique pour le khène》**3 張**。

### Apple 店面（`search` 這**一種**查法的觀察，藝人目錄端與 `collectionId` 直查兩種**尚未跑**）

- **四店面皆回同一個 collectionId 的 4 張**：
  `Mahagitá: Harp and Vocal Music of Burma`（262217002）、
  `Molam Lao《Music from Southern Laos》`（1086413188）、
  `Boua Xou Mua《The Music of the Hmong People of Laos》`（1508954924）、
  `Tiao Phün Muang《…Luang Prabang》`（591505662）。
- **三店面命中的 1 張**：`Laos: Lam Saravane / Musique pour le khène`（466420729，gb／fr／jp；**us 該次 0 筆**）。
- **其餘 18 張 `search` 未命中**，`risk` 一律照實寫「`search` 這一種查法未命中」，
  **未寫「未上架」「無來源狀態」「要掃圖」**（裁定 254）。

**配對必須放寬的五種形狀（已逐張寫進 `risk`）**：
1. **跨書寫系統（裁定 260 的形狀，本批最普遍）**：緬甸盤在 MB 是緬文盤名，在 Apple 是拉丁轉寫——
   `မာကျူရီည` 在店端寫 **`Mercury Nya`**（collectionId 6785464016、年份標 **2020**＝重發年）。
   **以緬文查店面必然 0 筆，以拉丁查資料庫也必然 0 筆。**
2. **單複數差一個字母**：MB 寫 `Visions of the Orient`，Apple 寫 **`Vision of the Orient`**。
3. **店端多廠牌系列前綴**：MB 寫 `Laos: Lam Saravane / Musique pour le khène`，
   Apple 寫 `Collection Ocora Radio France : Laos (Lam saravane, musique pour le khène)`。
4. **店端年份是壞值**：`Khin Maung Toe (Vol.1) [Live, 1994]`（1706401603）與
   `SAI HTEE SAING《Chin Thae Lal Pyan》` 的店端年份欄都寫 **1901**。
5. **一次連線錯誤不是 0 筆**：以 `Hlwan Moe` 查 us 店面時該次回連線錯誤，
   依第 28／98／122 條**不得當成查無**，`risk` 已照實寫。

**另記一筆給下游**：Apple 的緬甸目錄其實**相當深**
（`Htoo Eain Thin` 七張以上、`Sai Htee Saing` 八張以上、`Khin Maung Toe` 八張以上、`Lay Phyu` 八張以上），
**只是盤名全是拉丁轉寫**。研究層跑第三種查法（直查 `collectionId`）時，
**要用轉寫後的盤名去配，不要用緬文**。

---

## 第四節、未收清單（分類）

### A. MB 有藝人實體但**名下 0 個 release-group** → §1 補遺批的現成候選

| 掛名 | MB 情形 |
|---|---|
| **Mun Awng**（`240565ca-5327-4f32-9575-547fe3368dbf`，Person／MM／1960） | 實體存在、**名下 0 個 release-group**。派工信點名的三筆之一，**這一筆確實一張都收不到**。 |
| **Myanmar 1990s Music**（`7b90e5c5-00aa-459c-b065-6f62937d560a`，**type `Other`**／MM） | 派工信要我先確認「是 artist 還是被建成 artist 的合輯專案」——**兩者都不是**：它是 type `Other` 的實體，名下**只有 1 個 `primary-type=Single` 的 RG**（`a15ae3af`《မျက်စိမှတ်ချစ်နေမယ်》）。**不走 §5.6，也不當掛名，整個不收。** |
| **Khamvong Insixiengmai Ensemble**（寮國） | 名下《Bamboo Voices: Folk Music From Laos》的 **`primary-type` 與 `first-release-date` 皆空**，釘不住形態。 |

### B. 形態不符 → 不收

- Big Bag《နာမည်ကြီး》(2004)：artist-credit 是合掛名 `Big Bag & Chit Thu Wai`（裁定 331）。
- ထူးအိမ်သင်《မြို့ပြလရောင်တမ်းချင်း》(1996-10)、ဇော်ဝင်းထွဋ်《အဆုံးမရှိများ》(2019)：**`primary-type` 是 EP，本批不收 EP**。
- Big Bag《Choke》《สัตว์ร้าย》：`primary-type` 是 Single。
- ခင်မောင်တိုး《စောင်းကြိုးရှိုက်သံ နှင့် ၁၀နှစ်တာသီချင်းများ》(1982)：盤名本身寫著「十年的歌」，形態上近似生涯選輯但 MB 未標 Compilation，**形態判不準故不收**（裁定 227 的反面情形）。
- ခင်မောင်တိုး／စိုင်းထီးဆိုင် 共有的 `57552a4c-f360-4617-bf99-bada2c917cc7`《လွယ်လွယ်နဲ့မဖြစ်ဘူး လေးညှို့ရှင်》(1991)：**同一個 RG 同時掛在兩位的目錄底下**，是合作盤，形態待查故不收。
- Akuphone《Chansons Laotiennes》(AKUMS1001)：數位 4 軌，形態過短。
- Akuphone《Music of Southern Laos》／《Music of Northern Laos》(2018)：artist-credit 是 `Various Artists + Laurent Jeanneau` 合掛名（裁定 331）。
- 寮國的 `Other` 型與 `primary-type` 空的六筆（見裁定 337）。

### C. 名額不足 → **下一批直接可用**（已逐張寫進各卡的刻意不釘）

**緬甸**：စိုင်းထီးဆိုင်《နွေရာသီ》(1974)／《အိပ်စက်အနားယူပြီ》(1978)、
လွှမ်းမိုး《မအေးကိုချစ်လို့ပါ》(1977)／《ကားပြိုင်ပွဲ》(1980)／《ကျွန်တော်နှင့်လွှမ်းမိုး》(1982)、
ထူးအိမ်သင်《နာရီပေါ်မှမျက်ရည်စက်များ》(1987-01-01，名下最早)、
ဇော်ဝင်းထွဋ်《ဆေးဆိုးပန်းရိုက်မျက်နှာ》(1995)／《နေရာသစ်ရှာဖွေကြသူများ》(1995，[Live])／《နှစ် ၂၀ ရှင်သန်ခြင်း》(2003，[Live])、
လေးဖြူ《ခဏလေးများ》(2007-03-15)／《ဘင်္ဂလားပင်လယ်အော် (Bay Of Bengal)》(2008-07-01)、
ခင်မောင်တိုး《မျက်သွယ်》(1986)／《မဇ္ဈိမသံစဥ်လှိုင်းဂယက်များ》(2008，[Live])、
Big Bag《အိပ်ယာဝင်တေးများ》(2007)／《တယ်လီပန့်(ခ်)》(2009)／《One Eleven》(2011-05-20)、
အင်းလေး မြင့်မောင်《Mahagita by Burmese Harp, Volume 5》(2014-01-31)。
**另外整位未動的緬甸掛名**（都已確認 country MM、名下有 RG）：
`ဘိုဖြူ`(e17345f3，10 個 RG)、`မြန်မာပြည်သိန်းတန်`(12049d69)、`စိုင်းဆိုင်မောဝ်`(0e3fb1d6)、
`ကော်နီ`(d6deb223)、`မေဆွိ`(c6260416)、`ကိုင်ဇာ`(4b1f5f1b)、`ခိုင်ထူး`(c0957cfe)、
`Side Effect`(81766324，indie band from Burma)、`The Zero`(76aab62c)、`ACID`(2b188850，hip-hop group)。
**這一批足夠再開一整批。**

**寮國**：見裁定 337 的「可收但名額不足」四筆。

### D. 與池中撞卡 → **0 張**

實掃卡池全 24,138 列，緬甸與寮國兩區**池中本來就是 0 張**，本批 23 張無一撞卡。
掃到的假陽性全部記在各卡 `risk`：`Burma`→Mission of Burma／R.D.·S.D. Burman（13 筆）、
`Princess`→Prince（10 筆）、`Iron Cross`→Justice《Cross》（1 筆）、
`Sublime Frequencies`→Sublime 與 LFO《Frequencies》（5 筆）、`Molam`→泰國 molam（8 筆，**不是寮國**）。

---

## 第五節、§5.6 合輯逐張舉證（6 張）

| # | 卡 | `year` | 合輯出版 | 為什麼合輯是唯一形態 | 證據 |
|---|---|---:|---:|---|---|
| 1 | Various Artists《Princess Nicotine…Vol. 1》 | **1994** | 1994（Majora）／2004（SF006） | 曲目原始形態是緬甸國內的卡帶與廣播母帶，無掛名藝人的個人原盤 | RG `6120ee5f` ＋ REL `873ccd0f` |
| 2 | Various Artists《Guitars of the Golden Triangle…Vol. 2》 | 2005 | 2005 | 同上；RG 底下只有 SF024 一筆 release | RG `ad868ee4` ＋ REL `3bc33734` |
| 3 | Various Artists《…Vol. 3: Music of Nat Pwe》 | 2007 | 2007 | 儀式現場錄音，來源不是唱片公司錄音室 | RG `3f666aca` ＋ REL `c31cb958` |
| 4 | Various Artists《The Crying Princess: 78rpm Records From Burma》 | **2013** | 2013 | 原盤是單面數分鐘的 78 轉碟，本來就沒有專輯形態 | RG `cf1165ce` ＋ REL `a6dd2e86` |
| 5 | Various Artists《Laos - L'art Du Khène》 | **1972** | 1972 | MB 上寮國最早的一筆建檔；田野與電台母帶，無個人原盤 | RG `380493d0` ＋ REL `608d5a7f` |
| 6 | Various Artists《Ethnic Minority Music of Southern Laos》 | 2007 | 2007 | 每一軌的演出者在 MB 上名下 0 個 RG（裁定 337 的實證） | RG `400d78ab` ＋ REL `90614205` |

**年份的兩條分歧逐案落實**：
- **第 1 張取 1994 不取 2004**：`first-release-date` 是 1994 的 Majora 原盤，依 c-123 裁定 255 取原盤年，
  2004／2011／2023 三個重發年寫進 `label`、`reissuedBy` 與 `mbNote` 三處。
- **第 4 張取 2013（＝合輯出版年）不取錄音年**：依 c-123 裁定 261，
  78 轉原盤的年份 **MB 端一欄都沒有登記**，涵蓋不到整套就改取資料庫真的登記的那個年份，
  且 `risk` 明寫「**不得把 2013 講成錄音年，也不得替 78 轉原盤補一個沒有來源的年份**」。

**6 張全部不填 `genreException`**（§5.6 全曲風開放），`exceptionReason` 皆遠超 12 字、
`exceptionEvidenceUrls` 皆 2 個 HTTPS，`chk-prop` 通過。

---

## 第六節、給下一批的三句話

1. **裁定 330 要往外推**：c-130 波蘭那條線是拉丁文字圈，不受影響；
   但**往後任何非拉丁文字圈的批（泰、寮、緬、阿拉伯、南亞）開工前一定要先打 `artist?query=country:<ISO>`**，
   不要用關鍵字命中率當「這個場景在 MB 上存不存在」的判準。
2. **緬甸還有一整批**（見第四節 C）：10 位未動的掛名加上已釘 MBID 的 17 張存貨，
   **下一批不必重查身分，直接可開**。
3. **寮國見底了**：全域 38 筆以「Laos」為題的 RG，本批收 7、可再收 4、其餘判掉。
   **要再深挖只能走 §1 人工身分**（Khamvong Insixiengmai 那批 Latitudes／Music of the World 的碟是現成線索）。

---

# c-129 **b 組**（印尼蘇哈托時期與泰國軍政府時期）　策展層裁定與交件說明（2026-09-14）

**a 組取 330–339，本組從 340 起跳（append，未動 a 組任何一行）。**
批次規格見 `CURATION-BRIEF-c128-c130.md` 〇、共通五條＋二、c-129 的 b 組段，
欄位規格轉引 `CURATION-BRIEF-c127.md` → `c126` → `c103plus` → `c93plus` 第一節。

## 〇、b 組交件數字

| 項目 | 數 |
|---|---:|
| `prop-b.json` | **22 張、15 位**，年份 1968–2010 |
| 印尼 | **12 張、10 位**（1968–1991） |
| 泰國 | **10 張、5 位**（1976–2010；其中 4 張是 `Various Artists` 合輯） |
| `node batch-progress/c129/chk-prop.mjs a b` | **標記 0**（與線上池撞卡 0、跨組重複 0、跨批撞卡 0；a＋b 合計 45 張、28 位） |
| §5.6 合輯 | **4 張**（全部泰國，逐張舉證見第五節-b） |
| `releaseType` | Album 18／Compilation 4 |
| CAA release-group 探測 | **200：16 張／404：6 張**（5xx：0，裁定 222 的重試未被觸發） |
| §1 人工身分 | **0 張**（22/22 全部 pinned 住 release-group MBID） |

## 一、開工前的池中實掃（裁定 27：不取樣，掃全檔）

用 `batch-progress/lib.mjs` 的 `loadPool()` 掃 `seed_cards.json` 全 **16,450** 列
＋全部 `onboarding-manifest-*.json` ＋ `c47/cand-all.json`，**合計 24,138 列**；
**外加 c-SEA 三份卡單 99 張**（`desc-tools/batches/cards/cseaa-cards.json`、`cseab`、`cseac`）。
每個掛名用原文與拉丁轉寫兩種以上寫法各掃一次，比對用子字串雙向（裁定 255）。

### 實掃結果：**c-SEA 與 c-52 把印尼與泰國收得比簡報預期的還滿**

| 場景 | 池中既有 | 本組據此避開 |
|---|---|---|
| **印尼** | **約 38 張**（Koes Bersaudara 1、Koes Plus 2、AKA 1、Dara Puspita 2、Shark Move 1、Ariesta Birawa 1、Harry Roesli 3、God Bless 3、Giant Step 1、The Rollies 2、Benny Soebardja 1、Duo Kribo 1、Abbhama 1、Transs 1、Chrisye 2、Fariz RM 1、Ebiet G. Ade 1、Iwan Fals 1、Kantata Takwa 1、Tony Scott & The Indonesian All Stars 1、Indra Lesmana 1、Bhaskara 1、Discus 1、Waldjinah 1、Guruh Gipsy 1、Eka Sapta 1、Krakatau 1、Asin 1、Titiek Puspa 1、Rien Djamain 1、Rhoma Irama 3、Gombloh 1、Panbers 1、Elvy Sukaesih 1、Various Artists 印尼輯 4） | 12 張全部避開 |
| **泰國** | **13 張**（`Caravan《คนกับควาย》`1975、Onuma Singsiri 1979、พุ่มพวง ดวงจันทร์ 2、คาราบาว 2、Chaweewan Dumnern 1991、`Angkanang Kunchai With Ubon-Pattana Band`1975、Dao Bandon 2014、The Paradise Bangkok Molam International Band 3，**加 7 張 Various Artists 泰國輯**） | 10 張全部避開 |

**逐位確認已被 c-SEA／c-52／c-31 收過、本組一張都不重收的**：
God Bless（**四個 RG 裡三個池中已有，第四個是 Compilation——這位在 MB 上已被收滿**）、
Guruh Gipsy（MB 只有一個 RG，池中已有）、Krakatau、Asin、Shark Move（MB 只有一個 RG）、
Dara Puspita（MB 兩個 RG 池中全有）、Harry Roesli（三張）、The Rollies（兩張）、
Eka Sapta、Waldjinah、Rien Djamain、Bhaskara、Indra Lesmana、Discus、Benny Soebardja、
Abbhama、Transs、Giant Step、Ariesta Birawa、Duo Kribo、Kantata Takwa、Fariz RM、
คาราบาว、Onuma Singsiri、Chaweewan Dumnern、Banyen Rakkaen、Dao Bandon、
The Paradise Bangkok Molam International Band、เพลิน พรหมแดน（**在 `cseaa-cards.json` 但不在 manifest**）。

### 實掃踩到的假陽性（記給後面的批）

`AKA` 子字串雙向命中 **85 筆、84 筆是假陽性**（Shabaka／Makaya McCraven／Chaka Khan／Rufus／
Ka／Makaveli／坂本龍一／Rei Harakami／Kaka de Luxe／Alva Noto／Dwight Yoakam／Takács Quartet…），
`Benyamin S.` 命中 15 筆全是 **Enya** 與 **-M-**，`Titiek Puspa` 命中 8 筆有 5 筆是 **T.I.**，
`The Mercy's` 命中 6 筆全是 **Them** 與 **-M-**，`Black Brothers` 命中 2 筆全是 **H.E.R.**，
`Rhoma Irama` 命中 27 筆有 24 筆是 **Air／AI／Om／RAM／-M-**，
`Various Artists` 命中 **228 筆**（完全無效，只能逐張比盤名）。
**判「池中有無」一律看整個掛名字串**——共通第 2 條點名的形狀，本組每一個掛名都踩到。

## 二、本組立的裁定（340–348）

### 340（本組立，**本組最重要的一條**）：**池中 `Caravan` 這個掛名字串同時指兩支完全不同的團**——本組取泰文原文，不再往那個字串加卡

實掃抓到：池中 **`Caravan《คนกับควาย》(1975)`**（seed 一列，`onboarding-manifest-c52-20260903.json`）
**就是泰國的 คาราวาน**，但掛名被寫成拉丁形 `Caravan`；
而池中同一個字串底下還掛著**英國坎特伯里的 Caravan 四張**
（《Caravan》1969、《If I Could Do It All Over Again, I'd Do It All Over You》1970、
《In the Land of Grey and Pink》1971、《For Girls Who Grow Plump in the Night》1973），
另有 `The Caravans`（福音 1 張）與 `Xhol Caravan`（德國 1 張）。

**規則衝突**：c-126 第三節說「池中已有這位就照池中原字串，絕不製造新的掛名分裂」，
但照抄 `Caravan` 會把三張泰國碟加進一個**已經指著兩支不同團**的字串裡，
而 `CURATION-BRIEF-c128-c130` 第二節明寫「泰文有原文時**原文優先**（`คาราวาน`）」。

**裁定**：取泰文原文 **`คาราวาน`**。理由三條——
1. **後、特定的規格覆蓋先、通用的規格**（同 c-123 裁定 255 的處理方式）：c-129 簡報是專為這條線寫的。
2. **技術理由可量化**：`artist?query=artist:"คาราวาน"` 全域**只回 1 筆**；
   `artist:"Caravan"` 回 **155 筆**、第 1 名是英國那支（score 100）、**泰國這支連前 12 名都進不去**。
   取拉丁形＝主動把卡片掛到一個 score 完全不可用的字串上。
3. **先例**：c-125 第七節 Gong 一案——池中 5 張 `Gong` 全是法國那支，
   西班牙的 Gong「**日後若要補收，要先解掛名撞卡**」。這裡是同一形狀，只是撞得更嚴重（池中已經混進去一張）。

**代價已逐張寫進三卡的 `risk`**：本組三張與池中那張《คนกับควาย》在撞卡字串去重上看不見彼此，
**本機端統一寫法時要把這四張一起處理**（連同英國 Caravan 那四張）。
**依判準 2（可逆：改的是卡單的 `artist` 值，不是卡池結構）當場定。**

### 341（本組立）：**同一個 MB 藝人實體在不同 RG 的 artist-credit 上有三種拼法**——取 a.k.a. 的正規拉丁形

Benyamin Sueb（MB 實體 `33ae9e5e-e94e-462b-b047-68f7d9ac0cb6`，
disambiguation「Indonesian comedian, actor & singer a.k.a. Benyamin S.」）名下：

| RG | artist-credit 字串 |
|---|---|
| 《Indehoi》(1968) | **Benjamin S** & Rossy |
| 《Tukang Solder》(無年份) | **Bunjamin S.** & Rossy |
| 《Biographie》(無年份) | **Benyamin S.** |
| 《Tung Ali Onde Jande Mude》(1995) | **Benyamin S** & Ida Royani |

**三種拼法、同一個 MBID。** 依裁定 20（`artist:` 比對的是 artist-credit 字串不是實體名）
照抄 credit 會把卡片掛成 `Benjamin S & Rossy`——那個拼法與 `Benyamin` 的任何寫法都摺不到同一個鍵。

**裁定**：取 **`Benyamin S. & Rossy`**——實體 disambiguation 明載的 a.k.a. 正規拉丁形，
＋依裁定 258 的判準保留合掛名（Benyamin 本批只有一卡，合掛名是**解歧義**不是製造分裂；
反例對照是 c-123 的 Menuets 一案，那才是製造分裂）。四種拼法全部進 `queryAlias`。
**依判準 2 當場定。**

### 342（本組立）：**泰文盤名——本批的「原文優先」覆蓋裁定 45／259 的「取拉丁再發名」**

อังคนางค์ คุณไชย《แฟนจ๋าอย่าลืม》(1979) 的同一個 RG 底下有：
1979 TH 原盤（泰文名、12 軌）、**2016 JP EM Records CD 與 2018 XW 數位兩筆 Official，title 都是英譯 `Never Forget Me`（10 軌）**、
另一筆 **Pseudo-Release** title 是轉寫 `Faen cha ya luem`。

依 c-123 裁定 259，「同 RG 底下實際存在一筆純拉丁 title 的 Official release」時可取拉丁形——**本張確實存在**。
但 c-129 簡報第二節明定泰文原文優先，且 RG title 本身就是泰文原盤名。

**裁定**：**取泰文原盤名 `แฟนจ๋าอย่าลืม`**，三種拉丁寫法（轉寫、英譯、異拼）全部進 `queryAlias`。
裁定 259 解決的是「全西里爾盤名要不要收」，這裡的問題是「兩個都能取時取哪個」——不同題目，不衝突。
**同時記下代價**：原盤 12 軌、兩筆再發各 10 軌，**行文引軌數前必須先選版本**（裁定 251），已寫進該卡 `risk`。

### 343（本組立）：**artist-credit 是拉丁轉寫、MB 實體主名是泰文時，取實體主名**

พงษ์เทพ กระโดนชำนาญ《เดี่ยว》(1985)：MB 實體 `e5a171f5-…` 主名是泰文，
**但該 RG 的 artist-credit 字串是 `Pongtep Kradonchamnan`**。
依裁定 6／70／120（掛名用 MB 實體的文字）＋簡報的原文優先，**取泰文實體主名**。

**同一位三種拉丁轉寫，逐一記下**（簡報第二節要求的「逐位記在 `risk` 裡」）：
MB 實體的 credit 寫 `Pongtep Kradonchamnan`、通行寫法是 `Pongthep Kradonchamnan`、
**Apple `th` 店（artistId 703373390）寫 `Pongthep Gradoanchumnaan`**——三種互不相同。

**本組其餘泰國掛名的轉寫落差一併記**：
`พุ่มพวง ดวงจันทร์` ＝ Pumpuang／Phumphuang ＋ Duangjan／Duangchan（四種組合，**拉丁查 MB 回 0 筆**）；
`อังคนางค์ คุณไชย` ＝ Angkanang Kunchai／Khunchai（**拉丁查 MB 回 0 筆**，且池中寫成合掛名
`Angkanang Kunchai With Ubon-Pattana Band`）；
`คาราวาน` ＝ Caravan／Carawan（見裁定 340）。
**通則：這一區的泰文掛名，只有原文查得到 MB；拉丁轉寫查 MB 回 0 不等於查無此人（裁定 179）。**

### 344（本組立）：**§5.6 泰國合輯的 `year` 取 release-group 的 first-release-date（＝合輯出版年），不取錄音年代**

c-123 裁定 255 在那批取的是**原始錄音年**，原因是那批簡報有 1970–1991 的年份窗口、
不取錄音年 §5.6 就整個開不了。**c-129 沒有年份窗口**，而且四張泰國合輯的來源年代
（1960 年代 shadow、1970 年代 luk thung funk、78 轉蟲膠盤）**沒有一個年份涵蓋整套的多數**
——正是裁定 261 講的那個情形。

**裁定**：四張一律取 first-release-date（2004／2008／2010／2010），
錄音年代寫進 `exceptionReason` 並講明涵蓋範圍。
**另有池中先例佐證**：既有 7 張泰國合輯的 `year` 全部是合輯出版年
（Sound of Siam 2010／2014、Thai Pop Spectacular 2007、Siamese Soul 2009、Molam 2005、
Theppabutr 2012、Thai? Dai! 2011），本組照同一把尺。**依判準 1（有先例）直接定。**

### 345（本組立，**要回報給主線的工具缺口**）：**`dedup-crossbatch.mjs` 抓不到 c-SEA 的三份卡單**

`dedup-crossbatch.mjs` 的卡單掃描是 `fs.readdirSync(DIR).filter(f => /^c\d+-cards\.json$/.test(f))`
——**`cseaa-cards.json`／`cseab-cards.json`／`cseac-cards.json` 的檔名帶字母，一律不符**，
而 c-SEA 的 99 張裡有 **18 張至今沒有進 manifest 也沒有進 `seed_cards.json`**。

**實際代價**：本組原本要收的 **《Thai? Dai! The Heavier Side of the Luk Thung Underground》(2011)**
在 `chk-prop` 上不會亮燈，**是靠實掃 `onboarding-manifest-c52-20260903.json` 才抓到它已被 c-52 收過**。
c-SEA 卡單獨有的那 18 張（含 `เพลิน พรหมแดน《อาก๋งกับอาม้า / ร.ร.สอนจูบ》`、
`Elvy Sukaesih《Menghitung Bintang》`、`Grace Nono`、`Siti Nurhaliza` 等）**目前沒有任何自動檢查看得見**。

**裁定**：本組把 c-SEA 三份卡單併進實掃來源，逐張比對；
**並把這個缺口寫進本文件交主線**——修法是把那個 regex 放寬成 `/^[a-z0-9]+-cards\.json$/`，
或在 `dedup-crossbatch.mjs` 補一份明列的批名白名單。**這是 c-127 簡報第六節那個
「chk-prop 抓不到未上架批」的同一家族，只是這次連檔名規則都對不上。**

### 346（本組立）：**盤名含非 ASCII 連字號的 release-group 一律不收，不改寫**

`chk-prop` 會判「專輯名含非 ASCII 連字號」（c-50 那個反模式）。本組實測判掉兩張本來很想收的泰國合輯：

| RG | 盤名裡的字元 |
|---|---|
| `4bf7e8a1-…`《Suphanburi Soul: Kwanjit Sriprajan – The First Lady of Lae Music》(2019，ZudRangMa) | **U+2013 en dash** |
| `a2ced472-…`《Classic Productions by Surin Phaksiri: Luk Thung Gems from the 1960s‐80s》(2019，EM Records) | **U+2010** |

兩張的**每一筆 release 都用同一個字元**，沒有一筆是 ASCII 形——
依 c-123 裁定 259 的同一條紀律（**沒有純拉丁／純 ASCII 的 Official release 就不自創**），**整張不收**。
**不得手動把 `–` 改成 `-` 來過檢查**，那會變成自創盤名。兩張記入未收清單 B 類。

**反向一筆也記下**：`Luk Thung: Classic & Obscure 78s from the Thai Countryside` 的 **`album` 欄乾淨**，
但它的 **`label` 欄字串 `Dust‐to‐Digital` 含兩個 U+2010**——`chk-prop` **只掃 `artist` 與 `album`、不掃 `label`**，
所以不會亮燈，但下游的廠牌字串比對會出事。已在該卡 `label` 欄明寫。

### 347（本組立）：**`primary-type` 為 null／空的 release-group 不收**——泰國這一區的比例極高

共通第 4 條的門檻是「`primary-type=Album`」。泰國這一區大量 RG 的 `primary-type` 欄是 **null**，
即使有 first-release-date 也一樣。本組實測判掉的：

`ยอดรัก สลักใจ《เอาแน่》(1986)`（有 1986 TH Cassette×10 Ligo release，**但 RG 的 primary-type 是 null**）、
`คาราบาว《คาราวาน, Vol. 4: ท. ทหารอดทน》`與`《อเมริโกย》`（**primary-type null ＋無年份**）、
`เพลิน พรหมแดน` 另外三個 RG、`สายัณห์ สัญญา` 全部 5 個 RG、`ชาย เมืองสิงห์` 全部 3 個、
`ศรคีรี ศรีประจวบ` 全部 2 個、`เทพพร เพชรอุบล` 唯一 1 個、`ชินกร ไกรลาศ` 唯一 1 個、
`กรรมาชน` 唯一 1 個、`ดาว บ้านดอน` 的 3 個、`สุรพล สมบัติเจริญ` 的 1 個。

**裁定**：不收，記入未收清單 B 類並註明「**MB 有實體、有 release，但 RG 的 primary-type 欄是空的**」。
**這與「MB 查無」不是同一回事**，寫未收清單時要分開——前者是 §1 補遺批也幫不上忙的建檔品質問題，
後者才是 §1 的射程。

### 348（本組立）：**電影原聲帶不收這條，把 Rhoma Irama 整位擋在門外**

Rhoma Irama 是簡報 b 組段沒點名、但這條線上跑不掉的一位（池中已有三張：
《Begadang》1973、《Darah Muda》1975、《Santai》1977）。**MB 上他名下只有 3 個 RG**：
`4dfac6a5-…`《Gitar Tua》(1977，**secondary-types 含 Soundtrack**)、
`e46976b5-…`《Berkelana》(1978，**同樣 Soundtrack**)、
`937ab95c-…`《Tukang Ramal》(**無 first-release-date**)。

**共通第 4 條明寫「電影／遊戲原聲帶不收」**（c-119 裁定 261），兩張 Soundtrack 全部出局，
第三張沒有年份也出局。**裁定**：Rhoma Irama 這位本批一張都不收，記入未收清單 B 類。
**同一條也擋掉 Slank 的四張 Soundtrack RG**（《Get Married》《Get Married 2》《Generasi Biru》OST 兩筆）。

## 三、短掛名回問實測（裁定 179／250）——**score 在本組同樣完全不可用**

| 掛名 | 全域筆數 | 目標名次 | 目標 score | 第 1 名是誰 |
|---|---:|---:|---:|---|
| **AKA**（ID） | **549** | **第 4** | **92** | 德國 AKA AKA（100）；**第 3 名南非饒舌歌手 AKA 與目標同為 92** |
| **The Mercy's**（ID） | 21 | 第 2 | 96 | 紐西蘭工業團 The Mercy Cage（100） |
| **Benyamin**（ID） | 12 | 第 2 | 94 | 德國鋼琴家 Benyamin Nuss（100） |
| **Caravan**（拉丁） | **155** | **前 12 名之外** | — | 英國坎特伯里 Caravan（100）——**見裁定 340** |
| **Black Brothers**（ID） | 6 | 第 1 | 100 | ——（但第 2 名巴基斯坦團 score 98，**只差 2 分**） |
| **Slank**（ID） | 2 | 第 1 | 100 | ——（第 2 名是路易維爾的美國饒舌歌手 Slank，**同名**） |
| **Bimbo**（ID） | 58 | 第 3 | 95 | ——（未收，見未收清單） |
| Koes Plus／Titiek Puspa／Chrisye／Iwan Fals／Chaseiro／Rhoma Irama／Gombloh | 各 1–2 | 第 1 | 100 | ——（MB 端噪音小） |
| **คาราวาน／พุ่มพวง ดวงจันทร์／อังคนางค์ คุณไชย／พงษ์เทพ กระโดนชำนาญ**（泰文原文） | 各 **1** | 第 1 | 100 | ——（**泰文原文查一律乾淨；換成拉丁轉寫查全部回 0 筆**） |

**全部靠 `type`／`area`／`life-span.begin`／`disambiguation` 四項交叉，沒有一次用 score。**

### 寫進 `risk` 的「不得背書本名」四筆（裁定 250）

- **`AKA`**：MB 清單裡 `13ee6d34`（disambiguation 只寫「AOR」）與 `9869778c`（只寫「London Six-piece indie funk/punk band」）
  **連 area 都沒有**；**且 Apple `id`／`us` 兩店的 `AKA` 藝人實體（3556203）是南非饒舌歌手，55 張目錄全不是這支團**。
- **`Black Brothers`**：`9b96f5f6`（只寫「Song What a Time」）與 `e84fcca7`（只寫「probably swiss hiphop」）
  **type 與 area 皆空**；店端五個同名實體裡只有 `1637814102`「The Black Brothers Papua」是同一支、且目錄只有 1 張。
- **`Slank`**：店端有**五個** Slank 藝人實體，只有 `291537185` 是本團。
- **`อังคนางค์ คุณไชย`（begin 1956-02-06）與 `ยอดรัก สลักใจ`（begin 1956-02-06）在 MB 上同一個生日**
  ——兩筆很可能有一筆是建檔預設值，**不得拿 `life-span.begin` 當佐證寫進正文**。

## 四、b 組的未收清單（分類）

### A. MB 查無／建檔不足 → §1 補遺批的候選

| 掛名 | 實測 |
|---|---|
| **Panbers** | artist 查回 1 筆（`9637009a-…`，Group、Indonesia、begin 1969），**名下只有 1 個 RG，而且是無年份的 Compilation《Tembang Kenangan Volume 1》**。池中那張《Indonesian City Sound…》(2023，c-52) 不在這個實體名下。**整位不可收。** |
| **Sroeng Santi／สรวง สันติ** | 泰文查回 1 筆（`270161b8-…`，Person、Thailand），**名下只有 1 個 RG：2009 年的 Single《Iron Man》**。簡報點名的這位在 MB 上沒有可收的碟。 |
| **D'Lloyd** | artist 查回 1 筆（`7d9725ad-…`，Group、Indonesia、begin 1969），**名下 0 個 RG**。 |
| **Franky & Jane** | artist 查回 1 筆（`03b9f9a2-…`，Group、Indonesia），**名下 0 個 RG**。 |
| **Leo Kristi** | artist 查回 1 筆（`7e8a6628-…`，Person、Indonesia、begin 1949-08-08），**名下 0 個 RG**。 |
| **Suraphol Sombatcharoen／สุรพล สมบัติเจริญ** | 泰文查回 1 筆（`9bbad279-…`，Person、Thailand、begin 1930-09-25），**3 個 RG 全部無 first-release-date**。 |
| **Angkanang 的第三個 RG／ไวพจน์ เพชรสุพรรณ 3 個／ขวัญจิต ศรีประจันต์ 3 個** | 同上：有實體、有 RG，**無年份**。 |
| **Benyamin S. 的 `Tukang Solder` 與 `Biographie`** | 兩張都是實體盤（前者 12" Vinyl×12、Diamond DLL-022＋REMACO ML-12410；後者 Cassette×10、Musica MSC7285），**但 RG 的 first-release-date 是空的**——**這兩張是 §1 補遺批最現成的兩筆，載體與編號都齊了，只差年份的第二來源。** |

### B. 形態不符 → 不收（不進 §1）

- **電影原聲帶**（裁定 348）：Rhoma Irama《Gitar Tua》(1977)、《Berkelana》(1978)；Slank 的四張 OST。
- **`primary-type` 為 null**（裁定 347）：ยอดรัก สลักใจ《เอาแน่》(1986)、คาราบาว《ท. ทหารอดทน》《อเมริโกย》、
  สายัณห์ สัญญา 全 5 個、ชาย เมืองสิงห์ 全 3 個、ศรคีรี ศรีประจวบ 全 2 個、เทพพร เพชรอุบล、ชินกร ไกรลาศ、
  กรรมาชน、ดาว บ้านดอน 3 個、เพลิน พรหมแดน 3 個。
- **盤名含非 ASCII 連字號**（裁定 346）：《Suphanburi Soul: Kwanjit Sriprajan – The First Lady of Lae Music》(2019)、
  《Classic Productions by Surin Phaksiri: Luk Thung Gems from the 1960s‐80s》(2019)、
  พุ่มพวง《ห้วยหน่อย‐ถอยนิด》。
- **EP**：Titiek Puspa《Senyum》(1969)。
- **artist-credit 是 `[unknown]`**：Various Artists 線上的《Radio Thailand: Transmissions From the Tropical Kingdom》
  (2006-05-20，Sublime Frequencies)——**掛名做不出來，不是合輯資格的問題**。
- **宗教題材整位略過**（本批的宗教中立規則，寧可不碰）：Bimbo（MB 2 個 RG：《Wudhu》1993 與一張無年份）。
- **不是個人碟**：Benyamin S.《Mas Roni》(1990-12-01) 是**七位合掛的雜錦卡帶**。
- **再發年被登記成 first-release-date**：Chaseiro《Pemuda》與《3》（MB 的 first-release-date 都是 2018）。
- **內容是池中已有的碟的併輯**：Koes Plus《Dheg Dheg Plas & Volume Two》(2010)。

### C. 名額不足 → **下一批直接可用**（已逐張寫進各卡的「刻意不釘」，MBID 都釘好了）

**印尼 14 張**：Koes Plus《Vol. 9》(1973，RLL-208)／《Vol. 11》(1974，RLL-301)；
The Mercy's《Volume 2》(1973，PLL 1005)／《Melayu Pop Vol.1》(1974)；
Chrisye《Pantulan Cita》(1981)／《Resesi》(1983)／《Nona》(1984)／《Sendiri》(1984)；
Chaseiro《Ceria》(1982，MSC7364)；Iwan Fals《Sumbang》(1983)／《Sugali》(1984)／《Sore Tugu Pancoran》(1985)；
Ebiet G. Ade《Album 5 Langkah Berikutnya》(1982，`76112aff-…`)／《Album 6 Tokoh Tokoh》(1982，`0573151c-…`)。
**另 Slank 1990–1998 那七張全部可收**（Suit... Suit... He... He. 1990、Piss! 1993、Generasi Biru 1994、
Minoritas 1996、Lagi Sedih 1997、Tujuh 1998、Mata Hati Reformasi 1998-07）。

**泰國 4 張**：คาราวาน《1985》(1985，**盤名是純數字，撞卡字串去重上極危險，收之前要先想清楚**)／
《คนไกลบ้าน》(1986，**店面兩種查法皆未命中**)／《US J. PAN》(1987)／《อานนท์》(1988)；
Various Artists《Thai Beat a Go-Go, Volume 2》(2004) 與《Volume 3》(2005)
（**依裁定 255／c-123 第五節「同一批錄音的多種合輯只挑最權威的一種」，本批系列只取第一集**）。

### D. 與池中撞卡 → **1 張**（本組唯一一張因撞卡而換掉的）

**《Thai? Dai! The Heavier Side of the Luk Thung Underground》(2011，Finders Keepers FKR044)**
——`onboarding-manifest-c52-20260903.json` ＋ seed 各一列。**見裁定 345**：
`chk-prop` 與 `dedup-crossbatch` 都不會為這張亮燈（前者比的是 `seed_cards.json`——它其實在裡面、
所以真的會亮；後者抓不到 c-SEA 卡單），**是實掃 manifest 時抓到的**。
已改收《Luk Thung! The Roots of Thai Funk》(2010，ZudRangMa ZRMCD003)。

## 五-b、§5.6 合輯逐張舉證（4 張，全部泰國）

| # | 卡 | `year` | 錄音年代 | 為什麼合輯是唯一形態 | 兩個舉證網址 |
|---|---|---:|---|---|---|
| 1 | Various Artists《Thai Beat a Go-Go, Volume 1》 | 2004 | 1960s 中–1970s 初 | shadow／string combo 樂隊的錄音在原生市場只有 7 吋與合輯卡帶，端上查不到任何一支參與樂隊的原盤 LP | RG `7a9148bd` ＋ release `3405e0c6`（Subliminal Sounds SUBCD11、CD×20、barcode 7393210134119） |
| 2 | Various Artists《Shadow Music of Thailand》 | 2008 | 整個 1960s | 同上；端上查不到參與樂隊的 release-group | RG `e4b087bb` ＋ release `197f5ace`（Sublime Frequencies SF042、12" Vinyl×17） |
| 3 | Various Artists《Luk Thung: Classic & Obscure 78s from the Thai Countryside》 | 2010 | 78 轉蟲膠盤時代 | **來源載體上根本不存在「專輯」這種形態**——單面一曲、沒有 LP | RG `f81d4541` ＋ release `8cfe8345`（Dust-to-Digital DTD-29、CD×14、barcode 880226002923） |
| 4 | Various Artists《Luk Thung! The Roots of Thai Funk》 | 2010 | 1970s | 走 funk 編制的 luk thung 當年只有 7 吋與合輯卡帶，端上查不到同批原盤 LP | RG `9cbceeb8` ＋ release `106c2c24`（ZudRangMa ZRMCD003、CD×18） |

**八個網址全部是 `musicbrainz.org/ws/2` 的 API 路徑、且逐一實際打過讀過**（裁定 257：
「打得開」不等於「站得住」，而且**廠牌總覽頁、曲風通論頁一律不算**）。
取 release 網址而不取商品頁的理由沿用 c-124 裁定 263／c-123 的 Grünberg 一案：
**release 頁記的正是 `exceptionReason` 引的那幾格——廠牌、編號、載體、軌數、國別、日期，逐格對得上。**
**⚠ 覆核時要打 `ws/2` API，不要打網頁**（`musicbrainz.org` 網頁版擋機器抓取，用 curl 驗會得到假的失敗）。

`exceptionReason` 四張分別是 581／508／518／491 字元（門檻 12），
`exceptionEvidenceUrls` 四張各 2 個 HTTPS，`chk-prop` 標記 0。

## 六-b、封面與店面的實測（**只寫觀察，不下結論——裁定 254**）

### CAA（22 張逐張探測 `coverartarchive.org/release-group/<id>/front`）

**200：16 張／404：6 張／5xx：0**。
**404 的六張**（本機端要人工補圖）：Benyamin S. & Rossy《Indehoi》、Koes Plus《Volume 8》、
Koes Plus《Vol. 10》、Black Brothers《Terima Kaseh》、Slank《Kampungan》、พงษ์เทพ กระโดนชำนาญ《เดี่ยว》。

### Apple 店面（**`search` ＋ 藝人目錄 `lookup?id=<artistId>&entity=album` 兩種查法；第三種查法未跑**）

| 兩種查法有命中 | 11 張 |
|---|---|
| | Koes Plus《Volume 8》(id/us `1777356356`)、Koes Plus《Vol. 10》(`1777379905`)、Chrisye《Puspa Indah》(id `1775214005`)、Chaseiro《Bila》(id `1753303191`)、Iwan Fals《Opini》(id `1753721153`)、Slank《Kampungan》(id/us `1550371580` **與 `1871353480` 兩個 collectionId 指同一張**)、คาราวาน《อเมริกันอันตราย》(th/us `1871711638`)、คาราวาน《บ้านนาสะเทือน》(th/us `1871712806`)、**คาราวาน《คนตีเหล็ก》(`1814102585`，只在藝人目錄那一步命中、search 那一步沒跑到)**、Various Artists《Luk Thung: Classic & Obscure 78s…》(us/gb/th `1348481287`)、Various Artists《Thai Beat a Go-Go, Volume 1》(us `1532624882`) |
| **兩種查法皆未命中** | **11 張**：Benyamin《Indehoi》、Titiek Puspa《Sok Teu》、AKA《Reflection》、AKA《Crazy Joe》、The Mercy's《The Mercy's》、Black Brothers《Terima Kaseh》、พุ่มพวง《ตะวันลับฟ้า》、อังคนางค์《แฟนจ๋าอย่าลืม》、พงษ์เทพ《เดี่ยว》、Various Artists《Shadow Music of Thailand》、Various Artists《Luk Thung! The Roots of Thai Funk》 |

**⚠ 這 11 張一律只是「search 與藝人目錄兩種查法未命中」的觀察，
不得升級成「未上架」「無來源狀態」「要掃圖」——第三種查法（直查 `collectionId`）是研究層的事（裁定 254）。**

**店面端另外四筆要交給研究層的線索**：
1. **兩個 Koes Plus 藝人實體**：`422455311`（39 張，全是 1980 年後的再發與精選）與 `1770772377`（18 張，
   1969–1976 的原盤系列）——**挑錯實體整批落空**。
2. **`se` 店把 Various Artists 寫成 `Blandade Artister`**（瑞典語）——跨語言掛名差異，字串比對必然落空（裁定 260）。
3. **店端年份與端上差很多**：คาราวาน 三張的店端 releaseDate 是 2022／2022／2025（數位上架年），
   端上是 1976／1983／1984；Koes Plus《Vol. 10》端上 1974、店端 1973；
   《Luk Thung: Classic & Obscure 78s…》端上 2010／2013、店端 2018。**三個年份並存的那一張不得單方面斷言。**
4. **`Luk Thung` 被 Apple 模糊比對成 `Luke Combs`**——`th` 店 search 回的全是 Luke Combs 與 Drake。

## 七-b、給下一批的三句話

1. **印尼在 MB 上快見底了**：本組逐位查過的 30 位裡，**5 位的 MB 實體名下是 0 個 RG**
   （D'Lloyd、Franky & Jane、Leo Kristi、Panbers 只有一張無年份合輯、Gombloh 唯一那個 RG 是
   Sublime Frequencies 的田野錄音、疑似掛錯人）。**再深挖只能走 §1 人工身分**，
   Benyamin S. 那兩張（載體與盤面編號齊全、只差年份）是最現成的兩筆。
2. **泰國的瓶頸不是「MB 沒建檔」，是「建了但 `primary-type` 是空的」**（裁定 347）——
   本組判掉的 20 幾個 RG 裡有實體、有 release、有廠牌，就是那一格空著。
   **這是 §1 也救不了的建檔品質問題，寫未收清單時要與「MB 查無」分開。**
3. **這條線的合輯入口已經用掉一大半**：池中泰國的 Various Artists 輯本組收完後是 **11 張**，
   Sublime Frequencies／Finders Keepers／Soundway／ZudRangMa／Dust-to-Digital／Subliminal Sounds
   六家的泰國目錄**只剩 Thai Beat a Go-Go Vol. 2／3 兩張可收**。**印尼那一側的考古再發合輯還沒挖過**
   （池中只有 Those Shocking Shaking Days、Panbers 的 Indonesian City Sound 與兩張 Smithsonian 的
   Music of Indonesia），Now-Again／Strut／Sublime Frequencies 的印尼目錄是下一批最現成的方向。
