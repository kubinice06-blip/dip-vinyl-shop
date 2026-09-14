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
