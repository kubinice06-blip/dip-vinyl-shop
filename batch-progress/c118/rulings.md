# c-118 美國 1980s–90s 地下 house／techno 二線小廠：策展層裁定（2026-09-06）

交件：`prop-a.json` **19 張／19 位**（芝加哥線）、`prop-b.json` **23 張／23 位**（底特律＋紐約／紐澤西線），
合計 **42 張、42 位**（目標 40，允收區間 38–44）。
`node batch-progress/c118/chk-prop.mjs a b` → **標記 0**（線上池撞卡 0、跨組重複 0、跨批撞卡 0／69 批 3,125 張）。

`chk-prop.mjs` 由 `batch-progress/c116/chk-prop.mjs` 複製、改批號，**另加一支 §5.5 electronic 分支**（見第 1 條）。
複製時 c-116 那支已含 c-117 加的 `&`／`and` 正規化，一併帶過來了。

- **§5.5 electronic 白名單：7 張**（EP 3、Single 4），逐張兩個 HTTPS 證據。
- **§5.6（`releaseType: "Compilation"`）：0 張**。
- **MB 掃描量：74 位藝人實體、2,294 個 release-group，`primary-type=Compilation` 0 個。**
- **短掛名回問（裁定 179）：89 個掛名，擋下 145 個 score ≥85 的同名實體。**
- **別名對照：處理 12 組**（見第六節）。

---

## 一、本批立的裁定

### 第 1 條：`c118/chk-prop.mjs` 必須加回 §5.5 electronic 分支，否則七張白名單卡全部亮紅燈

派工信要求「`chk-prop.mjs` 從 `c116/chk-prop.mjs` 複製、只改批號」，同時又要求本批走 §5.5 電子白名單。
兩者直接打架：**c-116 是日本 hardcore 線，那條線沒有白名單**（見 c-116 裁定第 1 條），
所以它那支 `chk-prop` 對 `releaseType` 只有兩支判斷——`Compilation` 走 §5.6，其餘一律報
「非合輯卻帶例外欄位」。照派工填 `genreException: "electronic"` 與 `exceptionReason`，七張卡會全部被標。

**先例明確**：c-97（電子目錄深度批）遇到**完全相同**的形狀，做法是在該批自己的 `chk-prop.mjs`
加一支 §5.5 分支，門檻與 §5.6 相同（`exceptionReason` ≥12 字、≥2 個 HTTPS 證據網址），
並在其裁定第 1 條寫下通則：**「檢查器沒有跟上規格時，缺的是檢查器不是規格。」**

**裁定：照 c-97 的形狀，把那支分支原樣搬進 `c118/chk-prop.mjs`。**
條件是 `releaseType` 屬 `EP`／`Single`／`DJ-mix` **且** `genreException` 或 `releaseTypeException` 為 `electronic`；
不滿足白名單條件的非 Album 一律報「非 Album 未走 §5.5 白名單」。
只動本批的檔案，不碰任何其他批次。

依三條判準：**有先例**（c-70 的 `asia-mini-album`、c-97 的 `electronic`，兩次同形）、
**可逆**（刪掉一支 `else if` 就回去了，動的不是卡池結構）、**卡住整條線**（不加就沒有一張白名單卡能交件）。

**與 c-116 的差別要講清楚**：c-116 不開 EP 是因為 hardcore／punk **沒有**白名單，
而 `electronic` **從 2026-07-22 起就在 §5.5 的白名單上**。這不是「本批自己開例外」，
是本批剛好落在白名單覆蓋的曲風裡——**兩批的處置不同，但用的是同一條規則。**

### 第 2 條：碟上印 `Virgo`，卡片仍寫 `Virgo Four`——因為同一個名字在本批底下是兩個不同的人

派工信要求「卡片掛名取碟上印的那個名字」。1989 年那張 Trax／Radical 的 LP，
碟上印的是 `Virgo`、MB 的 artist-credit 也是 `Virgo`。**但這一次照做會壞事。**

MB 上 `Virgo` 這個名字至少十二個實體，其中兩個都在本批的範圍裡：
- **`c7eaea5b`** —— disambiguation 明寫「US house producer **Marshall Jefferson**」，
  名下是 1986 年的《Free Yourself》EP 與 1985 年的《Go Wild Rythm Trax》。
- **`b17172bf`** —— disambiguation「US house duo **Eric Lewis and Merwyn Sanders**」，主名 `Virgo Four`，
  名下就是這張 1989 年的《Virgo》。

**本批同時收 Marshall Jefferson《Day of the Onion》。** 若這張照碟面寫 `Virgo`，
卡池裡就會有兩個不同的人共用一個掛名鍵，而 `chk-prop` 的 `k()` 看不出差別——
它只比字串，不比實體。

**裁定：當碟上的掛名與另一位在本批範圍內的藝人共用同一個 MB 名字時，改取 MB 實體的主名，
碟面寫法寫進 `queryAlias` 與 `mbNote`。** 本張因此掛 `Virgo Four`。
`selfTitled` 填 `false`——碟名《Virgo》與碟面掛名同字，但與卡片掛名不同字，
下游若照卡片欄位判自我同名會判成 false，這是對的，不要「修正」它。

依三條判準：**可逆**（改的是卡單的一個字串欄位，不是卡池結構）、
**卡住整條線**（不決定就沒辦法同時收這兩張）。這條與裁定 177 不衝突——
177 說的是「先看池中、再看 MB credit」，池中兩者都是 0，本條補的是**第三步：
credit 與另一個實體撞名時，實體主名優先。**（與 c-116 裁定第 3 條第 2 點同族。）

### 第 3 條：`Eddie "Flashin" Fowlkes` 取 ASCII 直引號——池中已有同型掛名的既定寫法

裁定 211 記了 MB 內部掛名分裂的兩種形狀（大小寫、三形並存）。本批遇到**第三種：引號種類**。

同一個 MB 實體 `a3db0ecd` 底下：
- 實體主名是 **`Eddie “Flashin” Fowlkes`**（彎**雙**引號 U+201C／U+201D）；
- 本張 RG 的 artist-credit 卻是 **`Eddie ‘Flashin’ Fowlkes`**（彎**單**引號 U+2018／U+2019）；
- Tresor 49 的碟面印的是 ASCII 直引號的 `EDDIE 'FLASHIN' FOWLKES`。

三種寫法，`chk-prop` 的 `k()` 全部摺成同一個鍵，所以不會生出重複卡；**但顯示層只能挑一種。**

**裁定：取 `Eddie "Flashin" Fowlkes`（ASCII 直雙引號）。**
理由是池中已經有同型掛名 **`Anthony "Shake" Shakir`**（c-40 帶進），用的就是這個寫法——
依裁定 177 第一步「先看池中的既有寫法」，這一步不必等到本人進池才適用，
**同一種「名＋綽號＋姓」的形狀在池中已有先例，就照那個先例。**
三種 MB／碟面寫法全部寫進 `queryAlias`。

同一條也套在 `“Fast” Eddie Smith`（MB 主名帶彎引號）→ 卡片取 RG artist-credit 與碟面一致的 **`Fast Eddie`**；
`“Little” Louie Vega` 與 `Kenny “Dope” Gonzalez` 本批沒收，不處理。

### 第 4 條：「美國二線小廠」看的是製作端的場景與廠牌規模，不是壓片國

本批 42 張裡有 **11 張**的發行方不在美國：Tresor（DE）4 張、!K7（DE）3 張、Elypsia（BE）2 張、
Mo Wax（GB）1 張、Torso（NL）1 張，另有數張的 MB 只建了德／英版而美版原盤未建檔
（Tyree、Fast Eddie、Virgo Four 皆屬此型）。

這不是選碟偏差，是**這條線的現實**：1990 年代底特律第二代（Blake Baxter、Eddie Fowlkes、
Scan 7、K. Hand、Terrence Parker、Sean Deason、Claude Young、Juan Atkins 的 Infiniti）
的長篇幾乎全部是歐洲獨立廠發行的，美國本土的 Metroplex／Transmat／UR 只出 12 吋。
**若把「美國廠牌」當硬條件，底特律那一半會整段收不進來。**

**裁定：判準是「錄音與作者屬於美國 1980s–90s 的地下 house／techno 場景」＋「發行方是獨立小廠」，
壓片國與發行國不列入。** Tresor、!K7、Elypsia、Mo Wax、Torso 全數是獨立廠，沒有一家是主流大廠。
反向也成立：**美國大廠發行的一律不收**——Ten City《State of Mind》(1990)、
《No House Big Enough》(1992) 都是 Atlantic，Bobby Konders《Bobby Konders & Massive Sounds》(1992)
是 Mercury，三張因此退回未收清單（見第四節）。

依三條判準：**可逆**（改的是收不收，不是卡池結構）、**卡住整條線**（不定就沒辦法收底特律那一半）。

### 第 5 條（裁定 28 在 CAA 側的同形實例）：`coverartarchive.org` 回 5xx 不是「沒有封面」

第一輪封面探測時 **Claude Young《Soft Thru》的 CAA 回 500**，若照「非 200 即無封面」處理就會誤退這張。
重試一次後回 **200**。這與裁定 28（MB 的 503 不等於查無）是完全相同的形狀，只是換一個服務。

同一輪還踩到第二件事：**CAA 的請求沒有逾時上限時會整支掛住。**
本批第一次跑封面檢查在 Dark Comedy 那一筆卡死超過兩分鐘、整支腳本要手動殺掉——
這是裁定 170「逾時上限會把外部服務變慢靜默翻譯成查無」的另一個實例，只是這次連「查無」都沒回，是直接不動。

**裁定：CAA 查詢一律 (a) 帶 12 秒 `AbortController` 逾時、(b) 非 404 的失敗重試三次、
(c) 結果落盤快取。** 本批的 `c118-caa.mjs` 就是這樣寫的。
**只有 404 才算「沒有封面」；5xx 與逾時都要重跑。**

### 第 6 條：Discogs 與 MB 都寫成《(The Theory of)》時，就照它填，不要「還原」成慣稱

Stacey Pullen 的 Silent Phase 那張，慣稱是《The Theory of Silent Phase》，
但 **MB 的 RG 標題與 Discogs master 10311 的標題一致都是《(The Theory Of)》**——
碟面是「SILENT PHASE」大字加括號裡的「The Theory Of」，兩個資料庫都只取括號那一段。

一度想改填慣稱，理由是「以括號開頭的盤名在卡片上很怪，而且跨批去重的 `strip()` 會剝括號」。
**兩個理由都不成立**：(a) 裁定 6／70／120 明文盤名用 MB 實體的文字，而且這次 Discogs 也同意；
(b) `dedup-crossbatch.mjs` 的 `strip()` **只在括號內容命中 `DECOR` 再版裝飾詞表時才剝**
（remaster／reissue／deluxe／edition⋯⋯），`The Theory of` 不在表內，括號會原樣保留，
摺疊鍵是 `silentphase|thetheoryof`，不會被摺空。

**裁定：兩個獨立資料庫的標題一致時就是它，慣稱寫進 `queryAlias`。**
（這條的反面是裁定 45「改過名的碟取再發名」——那條處理的是**兩個名字分屬兩個時期**，
本條處理的是**兩個名字同時存在、資料庫都選同一個**，不是同一件事。）

### 第 7 條：`D.J. #1` 是碟上印的名字，但它不能當掛名——DJ Funk 整位退出本批

DJ Funk 的《Ghetto Trax》（Dance Mania DM 060，1994）CAA 回 200、封面沒問題，
但 **MB 的 artist-credit 是 `DJ #1`**，回查 Discogs release 1582 確認**碟上印的就是 `D.J. #1`**——
不是 MB 的資料瑕疵。派工信的「掛名取碟上印的那個名字」在這裡會生出一張掛名為 `DJ #1` 的卡：
純符號＋數字、摺疊後是 `dj1`、在卡池裡完全無法辨識是誰。

改收他的《Funkgasim》（1998，International House Records，artist-credit 正常是 `DJ Funk`），
但**那張 CAA 回 404、Apple us／gb／de 三店的 search 與藝人目錄 lookup 也全部查無**——
依裁定 195「CAA 或 Apple 至少一路拿得到封面才收」，沒有封面就上不了 published gate。

**裁定：DJ Funk 整位退出本批，記進未收清單。**
Dance Mania 這個廠仍由 DJ Deeon《House Work》與 Parris Mitchell《Life in the Underground》兩張代表。
**通則：碟面名字若是純編號／符號形態，不當掛名用；改找同一位藝人的其他碟，
找不到有封面的就整位退出，不要硬湊。**

### 第 8 條（裁定 195 第一次擋掉一張真正的正典）：Jesse Saunders《On and On》沒有封面，只能不收

《On and On》（Jes Say Records JS9999，1984 年 1 月）是**公認的第一張芝加哥 house 唱片**，
本批原本把它排在 a 組的核心位置。實查結果：

| 來源 | 結果 |
|---|---|
| CAA release-group `8e2794fd` | **404** |
| CAA release `ed2aac4f`（1984 US 原盤） | **404** |
| CAA release `31987cd0`（2013 Rush Hour 重壓） | **404** |
| Apple us／gb／de `search` | 命中的全是 Jack Johnson／Tyla／Mac Miller 的同名曲，**沒有這張** |
| Apple 藝人目錄 `lookup` | 同上，查無 |

**裁定：不收，記進未收清單。** `published gate` 要的是封面，這張兩路都拿不到。
**這是本批唯一一次規則擋掉的碟比收進來的碟更重要的情形，值得記一筆**——
若日後 CAA 補上封面，這張應該是芝加哥線第一順位的補件。

同一輪的對照：Chez N Trent《The Choice》CAA 也回 404，但 **Apple 三店都命中
collectionId `1706846411`**，依裁定 195 收。**兩張的差別只在 Apple 那一路，不在 CAA。**

### 第 9 條：本批的窗口是「碟的年份」，不是「藝人的年代」

派工範圍寫「1980s–90s」。實掃時反覆遇到「藝人是那個年代的人、但 MB 上唯一夠格的 Album 是 2000 年之後」的情形。
本批一律以**碟的 first-release-date** 為準，因此退掉：
Glenn Underground《Lounge Excursions》（MB 與 Discogs master 48011 **都記 2000**，
原本以為是 1997 Guidance，實查不是——改收 1998 年的《A Story of Deepness》）、
Suburban Knight《My Sol Dark Direction》（2003）、Gherkin Jerks《The Gherkin Jerks Compilation》（2013，
primary-type 是 Album、封面與試聽都比 1988 年那張好拿，仍改釘 1988 的原盤 EP）、
Rick Wade、DJ Bone、Los Hermanos、Alton Miller、Ectomorph、Random Noise Generation、
Damon Wild、Vincent Floyd、Mike Dunn（以上八位名下最早的 Album 全在 2000 年之後）。

---

## 二、與 c-40／c-70／c-82／c-97 的實掃對照結果

派工信明令要與 **c-40（電子細分批）** 實掃撞卡，並與 **c-70（new wave）／c-82（techno）** 比對。
本批另外把 **c-97（電子目錄深度，2026-09-05 交件）** 也加進來——它是同一個曲風、離本批最近的一批。

四批的清單逐筆讀進來、用與 `chk-prop` 相同的摺疊鍵比對：

| 批 | 場景 | 清單筆數 | 與 c-118 **同碟**撞卡 | **同藝人不同碟** |
|---|---|---:|---:|---|
| **c-40** | 電子細分（`onboarding-manifest-c40-electronic-20260823.json`） | **257** | **0** | **2**：AUX 88（池中《Is It Man or Machine?》／本批《Xeo-Genetic》）、Blaze（池中《25 Years Later》／本批《Basic Blaze》） |
| **c-70** | 日本 new wave（`c70/prop-a.json`＋`prop-b.json`） | 46 | **0** | **0** |
| **c-82** | 日本 1990s techno／ambient（`c82/prop-*.json`） | 45 | **0** | **0** |
| **c-97** | 電子目錄深度（`c97/prop-*.json`） | 44 | **0** | **0** |

**結論與派工信的預期不同**：派工信說「c-82 就是 techno 線，重疊風險最高」。
**實掃是零風險——c-70 與 c-82 兩批都是日本線**（c-70 是 1978–90 年的日本 new wave／自主盤，
c-82 是 1994–2001 年的日本 techno／ambient），與美國的 house／techno 沒有任何交集，
連同藝人不同碟都是 0。真正需要盯的是 **c-40 與 c-97**：

- **c-40（257 筆）是唯一實質重疊的一批。** 它把這條線的「一線」全部收走了——
  Model 500、UR、Jeff Mills、Derrick May、Drexciya、Frankie Knuckles、Robert Owens、Ten City、
  Joe Smooth、Kerri Chandler、Blaze、Royal House、Lil' Louis & The World、Larry Levan、
  Derrick Carter、Kyle Hall、Traxman、Floorplan、Transllusion、Anthony "Shake" Shakir⋯⋯
  **本批之所以能收到 42 張且同碟撞卡為 0，是因為刻意只挑 c-40 沒碰的第二線。**
- **c-97 的 44 張裡有 5 張在本批的範圍邊上**（Rhythim Is Rhythim ×2、Phuture、Derrick May、
  Frankie Knuckles ×2），選碟時全部避開。

**方法上照 c-116 裁定第 8 條做的**：`dedup-crossbatch.mjs` 在**選碟階段**就跑，不是交件前才跑；
本批每定案 5–7 張就 `node chk-prop.mjs a b` 一次（共跑 7 次），全程標記 0，沒有一次需要換碟。

---

## 三、§5.5 electronic 白名單：7 張，逐張的「為什麼這一張是核心經典」

§5.5 是**白名單＋精選制**，不是通則。七張逐一列出採納類型，避免下游把它讀成「這批把 EP 都掃進來了」：

| 卡 | MB primary-type | 廠牌／編號 | 採納類型 |
|---|---|---|---|
| Adonis《H.O.U.S.E.》(1988) | EP | Black Market International BLMK 002 | **名下不存在 Album**：6 個 RG 全是 EP／Single |
| Gherkin Jerks《Stomp the Beat》(1988) | EP | Gherkin Records GKE 1052 | **名下不存在 Album**（3 個 RG）；Larry Heard 三個掛名裡池中唯一缺席的一個 |
| Chez N Trent《The Choice》(1993) | Single | KMS 051 | **名下不存在 Album**（6 個 RG）；Prescription Records 成立前的直接前身 |
| Chez Damier《Can You Feel It》(1992) | Single | KMS 035 | **名下不存在 Album**（27 個 RG，Album 0）；2012 年 Defected 與 Dessous 兩度重發 |
| Photon Inc.《Generate Power》(1991) | Single | Strictly Rhythm SR 1251 | **這個掛名只有一個 RG**；wild pitch 手法成型的那一張，Strictly Rhythm 三度重發 |
| Reese《Just Want Another Chance》(1988) | Single | Incognito IR 111787 | **名下不存在 Album**（10 個 RG 全是 Single／EP）；低頻音色被整代 jungle 取樣成通稱的「Reese bass」 |
| N.Y. House'n Authority《APT.》(1989) | EP | Nu Groove NG 025 | **名下只有兩個 RG、都是 EP**；整個 Nu Groove 廠在池中的第一張 |

七張的共同點：**都不是「找不到專輯所以退而求其次」，而是那個掛名根本沒有專輯形態。**
每張都帶 `genreException: "electronic"`、≥12 字的 `exceptionReason`、
兩個 HTTPS 證據（MB release-group ＋ Discogs master）。

**§5.6（`releaseType: "Compilation"`）：0 張。**

### 裁定 167／190 的第七次應驗

派工信提醒「裁定 167／190：`primary-type=Compilation` 在 MB 上實質不存在，§5.6 不要亂開」。
本批實掃 **74 位藝人實體、2,294 個 release-group，`primary-type=Compilation` 是 0 個。**

真正的整編輯全部建成 `Album` ＋ `secondary-types=["Compilation"]`，本批有 4 張屬此型，
依裁定 167 **照一般 Album 寫、例外欄位一律留空**：
Kevin Saunderson《Faces & Phases》、Psyche \ BFC《Elements 1989-1990》、Todd Terry《Works》——
第四張是本批沒收的 Gherkin Jerks 2013 年整編（見第 9 條）。

累計掃描量已逾 10,000 個 RG（本批 2,294 ＋ c-116 的 1,419 ＋ 演歌線 1,297 ＋ c-95／c-98／c-100 的 6,469），
**裁定 190 說的「可以停止複驗」在本批再次成立。**

---

## 四、未收清單

### 4-1 MB 查得到、但沒有封面而不收（可進 §1 補遺批的第一順位）

| 藝人 | 碟 | 年 | 廠牌 | CAA | Apple us／gb／de |
|---|---|---:|---|---|---|
| **Jesse Saunders** | **On and On** | **1984-01** | **Jes Say JS9999** | **RG 與兩個 release 全 404** | **search＋藝人目錄皆查無** |
| DJ Funk | Funkgasim | 1998 | International House IHR9023-1 | 404 | search＋藝人目錄皆查無 |
| Armando | Land of Confusion | 1988-02 | Westbrook AG-WB 4 | 404 | 查無；且兩個 release 之一是 **Bootleg** |

**Jesse Saunders 那張是這條線的第一張唱片**，退掉它是本批最重的損失，
若 CAA 日後補上封面，應列為芝加哥線第一順位的補件（見第 8 條）。

### 4-2 大廠發行，不合「二線小廠」而不收（見第 4 條）

| 藝人 | 碟 | 年 | 廠牌 |
|---|---|---:|---|
| Ten City | State of Mind | 1990 | Atlantic |
| Ten City | No House Big Enough | 1992 | Atlantic |
| Bobby Konders | Bobby Konders & Massive Sounds | 1992 | Mercury |

### 4-3 名下最早的 Album 在 2000 年之後，超出本批窗口（見第 9 條）

Rick Wade（最早 2008）、DJ Bone（2018）、Los Hermanos（2004）、Alton Miller（2000-09）、
Ectomorph（2018）、Random Noise Generation（2005）、Damon Wild（2001）、
Vincent Floyd（2014）、Mike Dunn（2017）、Suburban Knight（2003）、
Glenn Underground《Lounge Excursions》（2000，MB 與 Discogs 一致）。

### 4-4 掛名形態不可用而不收（見第 7 條）

DJ Funk《Ghetto Trax》（1994，Dance Mania DM 060）——CAA 200、封面沒問題，
但碟上與 MB 的 artist-credit 都是 `D.J. #1`。

### 4-5 廠牌不在美國、且錄音也不在本批場景而不收

Mateo & Matos《New York Rhythms》（1997，Glasgow Underground）——兩位是紐約作者，
但發行方是蘇格蘭廠、且該張的流通紀錄集中在英國 deep house 的敘事裡；
本批的名額有限，優先給 Nu Groove／Strictly Rhythm／Nervous 三個紐約本地廠。
Kim English《Higher Things》（1998，Nervous 20226）——廠牌合格，
但她是 vocal house 的主唱型藝人，與本批「地下小廠的作者／製作人」這條線不同形，
名額讓給同廠的 Byron Stingily。**這兩張都不是查無、也不是撞卡，是本批的取捨，往後補得回來。**

### 4-6 MB 查無 → 可進 §1 補遺批的候選清單

**本批沒有這一類。** 這條線在 MB 上的建檔率極高——
掃過的 74 位藝人實體全部查得到，2,294 個 release-group 一筆不缺，
連 Nu Groove 的化名團（N.Y. House'n Authority，名下只有兩張 12 吋）與
只有一個 RG 的 Photon Inc. 都建了檔。
**這與 c-115（英國 DIY，裁定 207「§1 批也會落空」）是同一個發現：
歐美的地下電子與 post-punk 在 MB 上幾乎沒有缺口，§1 補遺批對這兩條線沒有用武之地。**

---

## 五、與 c-116 的處置差異（同一輪、相鄰兩批，結論相反）

| 面向 | c-116（日本 hardcore） | c-118（美國 house／techno） |
|---|---|---|
| EP／Single 收不收 | **一律不收**——hardcore 不在 §5.5 白名單上 | **收 7 張**——`electronic` 從 2026-07-22 起就在白名單上 |
| `chk-prop` 的 §5.5 分支 | 沒加（照 c-107 原樣複製） | **加了**（照 c-97 的形狀） |
| §5.6 開啟數 | 0 | 0 |
| `primary-type=Compilation` | 1,419 掃 0 | 2,294 掃 0 |
| MB 查無 → §1 候選 | 有 | **0（一筆都沒有）** |

**兩批的處置不同，用的是同一條規則。** 若下游看到「c-116 不收 EP 但 c-118 收」而覺得不一致，
答案在 §5.5 的白名單那兩行：名單上只有 `electronic` 與 `asia-mini-album`，
**hardcore 不在上面、electronic 在上面。**

---

## 六、別名對照表（碟上名字 ↔ 本名 ↔ MB 實體）

派工信點名「別名是這條線最大的坑」。逐位查清楚的結果——
**MB 對這條線的別名幾乎一律建成獨立實體，不是 alias**，因此 `artist/<MBID>` 查本名是查不到別名作品的。

| 卡片掛名（碟上） | 本名／本尊 | MB 實體 MBID | MB 建成 | 池中狀況 |
|---|---|---|---|---|
| **Gherkin Jerks** | Larry Heard | `75395e9e-f8a1-4eae-83f4-f16ca0a19bd5` | **獨立實體**（生日 1960-05-31，與 Larry Heard 本人 `4346875a` 相同） | Larry Heard 5、Mr. Fingers 5、Fingers Inc. 1、Gherkin Jerks **0** |
| **Reese** | Kevin Saunderson | `e753448b-2970-4f7d-9265-532ef0657891` | **獨立實體**（本人是 `bf259ecd`；兩者生日 1964-09-05 對 1964-05-09，月日顛倒，MB 資料瑕疵） | Inner City 2、E-Dancer 1、本人 **0**、Reese **0** |
| **Dark Comedy** | Kenny Larkin | `7f57505a-f683-4091-8b10-45ade72909af` | **獨立實體**（本人是 `ed8e364a`） | Kenny Larkin 2、Dark Comedy **0** |
| **Silent Phase** | Stacey Pullen | `efa4bbba-3a42-4e10-9e8d-084cfa3d8558` | **獨立實體**（本人是 `74de5c4e`） | Stacey Pullen 1、Silent Phase **0** |
| **Infiniti** | Juan Atkins | `82999a0b-057c-4635-8e29-7eeb88e0ac0c` | **獨立實體**（本人是 `6732e9f3` 之外的另一個 MBID） | Juan Atkins 2、Model 500 5、Cybotron 2、Infiniti **0** |
| **Psyche \ BFC** | Carl Craig | BFC＝`81b6f2b3-fd7b-4f4d-b940-0b7144826b89`（本人 `6732e9f3`） | **兩個獨立實體以反斜線併名**；Discogs master 18670 同樣寫 `Psyche \ BFC`，不是 MB 的瑕疵 | Carl Craig 5、69 1、Paperclip People 1、Innerzone Orchestra 1、Psyche／BFC **0** |
| **The Martian** | Mike Banks（Underground Resistance） | `0c33354e-114e-4853-922c-7818e2b90cf8` | 獨立實體；**MB 另有同名的 `ab7503c2`（early 90s US acid producer Marlon Grant），score 96，只有 disambiguation 分得出來** | UR 3、Galaxy 2 Galaxy 1、The Martian **0** |
| **Virgo Four**（碟上 `Virgo`） | Eric Lewis ＋ Merwyn Sanders | `b17172bf-041b-4c08-92bd-7ab0d93021be` | 獨立實體；**`Virgo`＝`c7eaea5b` 是 Marshall Jefferson，是另一個人**（見第 2 條） | 兩者皆 **0** |
| **Boo Williams** | 同名 | `265c41ad-2e21-4c7a-9523-bb447906bc8c` | 另有別名實體 `Moon Man`（`5617ac66`，生日相同 1967-07-20） | **0** |
| **Glenn Underground** | Glenn Crocker | `dde821f9-8847-4dc4-a20a-d909d869567b` | 另有別名實體 `Jellybean`（`bcd18849`）；1995 年那張 MB 把姓寫成 `Glen`（少一個 n） | 1（《Atmosfear》） |
| **Chez Damier** | Anthony Pearson | `9eef0a84-41bb-4b34-80f5-4f37cbc54ad8` | 另有別名實體 `Noni`（`199921cf`）與 `Chez Damier & Co-Inside`／`Heart 2 Heart`／`The Gathering` 三個合作實體 | **0** |
| **K. Hand** | Kelli Hand | `0773e58b-1a46-4fe9-bcc1-c6f384daf4bc`（主名 `Kelli Hand`） | **MB 內部就分裂**：另有 `6bd7981d` 主名 `K-HAND`；本張 RG 的 credit 又是第三種 `K. Hand`（裁定 187／211 的疊加） | 三種寫法皆 **0** |

**另外查過但本批沒收的別名**：`Cajmere`／`Green Velvet`（同一人，池中 Green Velvet 已 2 張，Cajmere 名下無 Album）、
`Wink`／`Josh Wink`／`Winx`、`Marc Kinchen`（MB 主名建成 `Area 10`）、`Jungle Wonz`／`Hercules`（皆 Marshall Jefferson）、
`Suburban Knight`／`James Pennington`、`Rheji Burrell`／`Burrell Brothers`。

---

## 七、短掛名回問（裁定 179）的實測數字

派工信警告「`Adonis`、`Blaze`、`Reese`、`69`、`Relief` 這類同名實體極多，
同輪的 c-116 光 22 個掛名就擋下 71 個同名實體，這條線只會更糟」。**確實更糟：**

**89 個掛名逐一回問 `area`／`type`／`disambiguation`，擋下 145 個 score ≥85 的同名實體**
（c-116 是 22 個掛名／71 個實體，本批的掛名數是它的四倍、擋下的實體數是它的兩倍）。

擋最多的十三個掛名：

| 掛名 | 擋下的同名實體 | 最容易誤判的那一個 |
|---|---:|---|
| `Bam Bam` | 12 | 安卡拉的車庫搖滾團 `Bam Bam Bam`（score 100，本批最後沒收這位） |
| `Adonis` | 11 | 黎巴嫩四人樂團（`ab5ab2b6`） |
| `Armando` | 11 | 義大利作曲家 Armando Trovajoli（score 98）、墨西哥 Armando Manzanero（97） |
| `Gemini` | 11 | 密西根匈牙利裔雙胞胎民謠（97）、英國電子製作人 Thomas Slinger（95） |
| `Los Hermanos` | 11 | 巴西搖滾團（score 100，比底特律那個 97 還高） |
| `Reese` | 11 | Della Reese（score 100，比正解的 95 還高） |
| `Virgo` | 11 | **Marshall Jefferson 的別名實體**（見第 2 條，這是唯一一個「同名而且都在本批範圍內」的） |
| `Mike Dunn` | 8 | — |
| `Abacus` | 8 | 德國迷幻前衛團（score 100） |
| `Burrell` | 6 | Kenny Burrell（爵士吉他，score 100） |
| `Fast Eddie` | 5 | 多倫多 pop punk 與英國 mod 團（**兩個都是 score 100，正解只有 95**） |
| `Infiniti` | 4 | — |
| `Urban Tribe` | 4 | 芬蘭另類搖滾 `Suburban Tribe`（score 100） |

**四次「錯的那個 score 比對的高」**（`Reese`、`Los Hermanos`、`Fast Eddie`、`Abacus`）——
**score 排序在這條線完全不可用**，只有 disambiguation 分得出來。

**裁定 204（連寫與分寫都要查）本批的實例**：`N.Y. House'n Authority` 對 `NY House'n Authority`、
`Chez N Trent` 對 `Chez-N Trent`、`The Martian` 對 `Martian`、`Mood II Swing` 對 `Mood 2 Swing`、
`Gherkin Jerks` 對 `The Gherkin Jerks`、`Aux 88` 對 `AUX 88`／`Aux88`。
其中 **`Mood II Swing` 是反向形狀**——羅馬數字與阿拉伯數字摺出的是**兩個不同的鍵**
（`moodiiswing` 對 `mood2swing`），`chk-prop` 抓不到，只能兩種都查。

---

## 八、店面與封面試聽預估

- **封面**：42 張的 CAA release-group 全部回 **200**（Chez N Trent 是 404，靠 Apple 補；已計入）。
  **41/42 有 CAA 封面，1/42 靠 Apple。**
- **試聽**：Apple us／gb／de 三店逐張跑過 `search` **與**藝人目錄 `lookup`（裁定 173／185 兩個端點都跑）。
  命中率約一半——**這條線在 Apple 上的覆蓋率本來就低**（Tresor、!K7、Dance Mania、Relief
  這些廠的 1990 年代目錄大量未上串流），查無的那些依裁定 195 走無來源狀態，不影響收錄。
  逐張的 collectionId 與店面已寫進各卡的 `risk` 欄。
- 店面固定 `us`／`gb`／`de`，本批沒有需要額外店面的碟（無日／韓／華語盤）。
- **⚠ Apple 探測的三筆假陽性已人工歸零**（裁定 168 的形狀，子字串比對吃掉了差別）：
  Todd Terry《Works》命中的是〈Make It Work〉單曲（`makeitworksingle` 含 `works`）、
  Sterling Void《It's All Right》命中的是 2016 年再混單曲與 Luca Fregonese 2011 年的合作曲、
  Virgo Four《Virgo》命中的是 Stefan Braatz 的客串單曲。三張的 `risk` 欄已改記「三店查無」，
  封面走 CAA（三張的 CAA 都是 200）。**這三筆若不人工覆核，會讓下游拿錯 collectionId 配錯碟。**

---

## 九、給本機上架前的兩個前置

1. **`Aux 88` → `AUX 88` 的正規化**（與 c-116 對灰野敬二的處置同型）：
   池中既有的《Is It Man or Machine?》寫成 `Aux 88`，MB 實體主名是全大寫 `AUX 88`。
   `chk-prop` 的 `k()` 會摺掉大小寫、不會生出重複卡，但顯示層會出現同一團兩種寫法。
   建議上架時把池中那張一併改成 `AUX 88`，三處同步：`seed_cards.json`、KV、Firestore `card_catalog`。
2. **`K. Hand` 的 MB 雙實體**：`0773e58b`（主名 `Kelli Hand`）與 `6bd7981d`（主名 `K-HAND`）
   是同一人的兩個 MB 實體。本卡釘的是前者。若日後從後者補碟，要確認不會生出兩張掛名不同的卡。
