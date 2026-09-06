# c-117 策展層裁定與清單（2026-09-06）
**批次**：英國 1970s folk-rock 私壓與小廠（F 線）
**交件**：`prop-a.json` 22 張／18 位、`prop-b.json` 21 張／16 位，**合計 43 張、34 位**。
`node batch-progress/c117/chk-prop.mjs a b` → **標記 0**（跨批撞卡 0，比對 68 批、3,083 張）。
**`releaseType: Compilation` 0 張，§5.6 一次都沒開。**

---

## 一、本批立的裁定（承 `c53/rulings.md` 第 206 條之後）

### 第 207 條：**`chk-prop` 的正規化把 `&` 刪掉、把 `and` 留著，所以「&／and 分裂」的撞卡它一個都抓不到——標記 0 不等於沒撞卡**

`chk-prop.mjs` 的折疊鍵是 `s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'')`：
`&` 是標點被刪掉，`and` 是字母被留著。於是**同一張碟只要兩邊一邊寫 `&`、一邊寫 `and`，鍵就不同**。

本批的實例：提案《Love, Death and the Lady》（MB 的 RG 標題用 and），
池中已有的卡寫《Love, Death & the Lady》（用 &）。**是同一張 1970 年 Harvest SHVL 771。**
`chk-prop` 跑完標記只有 1（另一張《Anthems in Eden》），**這一張完全沒被標。**

這正是 `audits/pool-artist-name-splits.md` 2026-09-06 續補第三節記的型態，
只是那份稽核記的是**掛名**的 &／and 分裂，這裡是**盤名**的。

**裁定**：策展層交件前，除了跑 `chk-prop`，**必須另外以「盤名為鍵」重掃一次全池**，
折疊時**把 `and` 與 `the` 一併剝掉**：

```js
const k = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '');
const strip = s => s.replace(/(and|the)/g, '');
// 命中條件：k(池.album) === k(提案.album) || strip(k(池.album)) === strip(k(提案.album))
```

**這一步抓到的兩張都是真撞卡，其中一張是 `chk-prop` 漏的。**
（`chk-prop` 本身不改——它是跨批與線上池的通用閘，改折疊鍵會影響 68 個批次的既有結果；
這一道當成策展層的交件前檢查即可。）

### 第 208 條：**以「掛名子字串」實掃全池，會整組漏掉合掛形態的卡**

本批第一輪實掃用 `artist.toLowerCase().includes('shirley collins')` 掃全池，
結論是「Shirley Collins 相關卡 5 張」。**錯的。**
池中真正的數字是 **7 張**——漏掉的兩張掛在 **`Shirley & Dolly Collins`** 這個合掛名下，
字串裡根本沒有 `shirley collins` 這個連續子字串（中間插了 `& Dolly`）。

同族的形狀在本批還有：`Lal & Mike Waterson`（掃 `watersons` 掃不到，因為是單數 `Waterson`）、
`Martin Carthy & Dave Swarbrick`（掃 `martin carthy` 掃得到，但掃 `swarbrick` 才會發現它是獨立掛名）。

**裁定**：藝人目錄深度的實掃**不能只掃掛名**。
掛名掃一遍之後，**一定要再以盤名為鍵掃一遍全池**（作法同第 207 條），
兩份結果取聯集才算數。第 27 條說「要知道池裡有幾張就實掃全檔」，
這條補上「**實掃要掃兩個鍵**」。

### 第 209 條：**英國 1970s 私壓線的封面覆蓋，CAA 與 Apple 是互補的，不是誰包含誰**

裁定 195 把收錄判準改成「CAA 或 Apple 至少一路有封面」，派工信把它延伸到本線。實測結果：

| 來源 | 覆蓋 |
|---|---|
| CAA（`coverartarchive.org/release-group/<id>`） | **43/47 探測過的 RG**（91%） |
| Apple `gb` `search` 端點 | **26/43 提案卡**（60%） |

但**兩邊漏的不是同一批碟**：
- **CAA 有、Apple 沒有**：Comus《To Keep From Crying》、Spirogyra《Bells, Boots and Shambles》、
  Dulcimer、Andy Roberts、Mr. Fox《The Gipsy》、Gryphon、Amazing Blondel《Fantasia Lindum》、
  Shirley Collins《Adieu to Old England》、Martin Carthy《Shearwater》、Dick Gaughan《No More Forever》、
  Peter Bellamy 兩張、Robin and Barry Dransfield——**共 13 張**。
- **Apple 有、CAA 沒有**：Wizz Jones《The Legendary Me》、Wizz Jones《Right Now》、
  Principal Edwards Magic Theatre《Soundtrack》——**共 3 張**。

**裁定**：本線判「封面拿不到」之前，**CAA 與 Apple 兩路都要跑過**，
少跑任何一路就會誤殺（少跑 Apple 會殺掉 Wizz Jones 整位藝人）。
這與第 173 條「Apple 的兩個端點都要跑」是同一個形狀，只是層級更高一階：**兩個資料源都要跑。**

### 第 210 條：**兩路都沒有封面就不收——Leader／Trailer 這種 1970 年代小廠在兩個資料源上同時缺席是常態，不因為碟好就破例**

本批有三張 MB 建檔完整、身分毫無疑問、卻**CAA 與 Apple 兩路都拿不到封面**：

| 碟 | 廠牌／編號 | CAA | Apple `gb` |
|---|---|---|---|
| The Copper Family《A Song for Every Season》(1971) | Leader | 404 | `search` 0 筆；藝人目錄 lookup（artistId 206438485）列出 11 張，**全是 2002 年之後的再發，無此盤** |
| Martin Simpson《Golden Vanity》(1976) | Trailer LER 2099 | 404 | `search` 0 筆；藝人目錄 lookup（artistId 2491245）列出 **64 張，無此盤** |
| Boys of the Lough《The Boys of the Lough》(1973) | Trailer LER 2086 | 404 | `search` 0 筆；藝人目錄 lookup（artistId 2933443）列出 **6 張，無此盤** |

三張都已依第 173／185 條走過藝人目錄 lookup 才判定，**不是 `search` 回 0 就下的結論**。

**裁定**：published gate 要的是封面，兩路都沒有就是拿不到，**一律不收**。
這與裁定 202 的「bsnpubs 只留裸編號、沒有盤名的碟一律不收」同一個尺度：
**舉不出來的東西不因為量大或碟好而破例。**
這三張列入下面第三節的未收清單，日後 CAA 補圖時可回頭再收。

### 第 211 條：**英國私壓在 MB 上有一整類「以再發日期建檔」的 release-group，`first-release-date` 直接是錯的**

不是零星幾筆，是**成類**。本批查到的：

| RG | MB `first-release-date` | 原盤年 | 原廠 |
|---|---|---|---|
| Bridget St. John《Thank You for...》aee93734 | **1995-01-01** | 1972 | Dandelion |
| Keith Christmas《Fable of the Wings》5bf7dac2 | **2012** | 1970 | B&C |
| Principal Edwards Magic Theatre《The Asmoto Running Band》90f87500 | **2006-06** | 1971 | Dandelion |
| Tír na nÓg《In The Morning》0fd886f6 | **1999-07** | — | — |

成因一致：**這些碟的原壓從沒被建進 MB，只有 1990s／2000s 的 CD 復刻被建了 release，
RG 的 `first-release-date` 就跟著復刻走。** 這與第 188 條（數位再發整批建檔）同族，
但那條講的是「整位藝人不可信」，這條是「**單張碟的原壓根本沒建**」。

**裁定**：釘 RG 之前，**回問 `inc=releases` 看轄下最早那筆 release 的日期與國別**。
- 最早的 release 日期**等於** RG 的 `first-release-date` → 年份可信。
- 最早的 release 是 1990 年之後、而這張碟公認是 1970 年代的 → **`first-release-date` 不可信**。
  這種碟本批一律**不收**（收了年份就得靠外部來源硬填，違反裁定 127 附錄
  「不得拿一個有爭議的值去換另一個有爭議的值」）。

### 第 212 條（第 167／190 條第六次應驗，建議可停止複驗）

本批實掃 **43 位英國／愛爾蘭民謠藝人、共 535 個 release-group**，
另逐筆回問 **50 個 RG 的 `inc=artist-credits+releases`**。
**`primary-type=Compilation` 是 0。** 43 張提案卡 `releaseType` 全部是 `Album`，**§5.6 一次都沒開。**

累計已掃逾 8,300 個 RG，第 167 條的判準（**看 `primary-type` 欄位本身，不看「現實中是不是整編輯」**）
在英國民謠線同樣成立。**派工信不必再為這條線預告 §5.6。**

---

## 二、裁定 179 的實作結果：短掛名回問擋下的同名實體

本批對 **46 個掛名**跑了 `artist?query=`，逐一回問 `area`／`type`／`disambiguation` 三欄，
**擋下 71 個同名別實體**。最危險的六個（若不回問就會釘錯）：

| 掛名 | MB score 最高的那個是誰 | 正確實體 |
|---|---|---|
| **`Heron`** | **Gil Scott‐Heron（score 100，子字串命中）** | e72b466b（Group／UK／1968／「UK folk rock band」，**只有 score 94**） |
| **`Trees`** | **Screaming Trees（score 100，美國 grunge）** | 3df42ccb（Group／UK／1970／「1970's British Folk Rock Band」，score 93） |
| **`Forest`** | **Deep Forest（score 100，法國）** | 英國 folk 團**不在前八名內**（另有俄國黑金屬、Forest Swords 等） |
| `Mr Fox` | 745a29e9（對的）但後面緊跟 **7 個同名 rapper／Afrobeat／dub 實體，score 92–96** | 745a29e9（Group／UK／1970） |
| `C.O.B.` | 590a1bfa（對的）但同名 8 筆，含 2023 年的 UK post-hardcore 團 `Cob` | 590a1bfa（Group／UK／1970） |
| `Gryphon` | 0cd7ff0b（對的）但另有 Gryphon Trio（加拿大）、brony artist、game music remixer | 0cd7ff0b（Group／UK／1973） |

**`Heron`／`Trees`／`Forest` 三個是「score 最高的那個是錯的」**——
派工信點名 `Trees` 最危險，實測**`Forest` 更糟：正確實體連前八名都進不去**。
（`Forest` 兩張碟池中都已有，本批未取，但這個形狀要記著。）

另記兩個**分詞造成的撞名**（裁定 204 同族）：
- `Louis Killen` 單查回的 score 100 是 **`The Clancy Brothers and Louis Killen`**（美國團），不是他本人。
- `Andy Roberts` 有 **6 個同名實體**（Linus 吉他手、美國 techno 製作人、爵士歌手、Isle of Wight、banjo 手）。

---

## 三、未收清單

### 3.1 與線上池撞卡（實掃抓到，**其中一張 `chk-prop` 漏標**）

| 碟 | 池中已有 | 怎麼抓到的 |
|---|---|---|
| Shirley & Dolly Collins《Anthems in Eden》(1969) | 同掛名同盤名 | `chk-prop` 標出 |
| Shirley & Dolly Collins《Love, Death and the Lady》(1970) | 池中寫《Love, Death **&** the Lady》 | **`chk-prop` 漏標**，人工以盤名重掃抓到（第 207 條） |

### 3.2 與其他批次的 `prop` 撞卡（`dedup-crossbatch` 與人工交叉比對）

| 碟 | 已在 |
|---|---|
| Mr. Fox《Mr. Fox》(1970) | **c-63** prop-a → 本批改取《The Gipsy》(1971) |
| Nic Jones《The Noah's Ark Trap》(1977) | **c-98** prop | → 本批改取《Ballads and Songs》(1970) |
| Tony Rose《Under the Greenwood Tree》(1971) | **c-63** prop-a → Tony Rose 整位藝人本批放棄（他 1970s 只有這一張與一張多人合輯） |
| The High Level Ranters《The Lads of Northumbria》(1969) | **c-63** prop-a → 該團其餘的碟不是合掛就是現場，本批放棄 |
| The Young Tradition《Galleries》(1968) | **c-63** prop-a ＋ 池中已有 | 該團 1966–67 兩張落在 1968–1980 窗口之外，本批未取 |
| Frankie Armstrong《Lovely on the Water》(1972) | **c-63** prop-a ＋ 池中已有 | |
| Jan Dukes de Grey《Mice and Rats in the Loft》(1971) | **c-60** prop ＋ 池中已有 | → 本批改取《Sorcerers》(1969) |

### 3.3 封面兩路都拿不到（第 210 條）

- **The Copper Family《A Song for Every Season》(1971, Leader)** — CAA 404；Apple 藝人目錄 11 張全是 2002 後再發。
- **Martin Simpson《Golden Vanity》(1976, Trailer LER 2099)** — CAA 404；Apple 藝人目錄 64 張無此盤。
- **Boys of the Lough《The Boys of the Lough》(1973, Trailer LER 2086)** — CAA 404；Apple 藝人目錄 6 張無此盤。

三張的 MB 身分都乾淨（RG、原盤 release、label-info、catno 齊全），**純粹卡在封面**。
**日後 CAA 補圖即可直接收，MB 資料已在本檔備妥。**

### 3.4 MB `first-release-date` 不可信（第 211 條）

- Bridget St. John《Thank You for...》RG `aee93734`（標 1995／原盤 1972 Dandelion）
- Keith Christmas《Fable of the Wings》RG `5bf7dac2`（標 2012／原盤 1970 B&C）
- Principal Edwards Magic Theatre《The Asmoto Running Band》RG `90f87500`（標 2006／原盤 1971 Dandelion）
- Tír na nÓg《Strong in the Sun》RG `9e3d3dbd`（MB 標 1972，**Apple 標 1973**，兩邊不一致）

### 3.5 有查過、身分乾淨、只是這批額度用完（下一批可直接收，MBID 已備）

Gryphon《Midnight Mushrumps》1974 `4dae8957`／Nic Jones《Nic Jones》1971 `7293e161`／
Bread, Love and Dreams《Amaryllis》1971 `75fbd6fe`（Apple 上只有標為 EP 的再發條目，形態有疑）／
Martin Carthy《Landfall》1971 `444c8563`／Martin Carthy & Dave Swarbrick《Second Album》1966 `a870342c`／
Dick Gaughan《Kist o' Gold》1976 `f92f782a`／June Tabor & Martin Simpson《A Cut Above》1980 `7a63a2b0`／
Five Hand Reel《Five Hand Reel》1976 `33bd843b`／Robin and Barry Dransfield《Lord of All I Behold》1971 `a712b0c4`／
Barry Dransfield《Barry Dransfield》1972 `ba9ccb2a`／The Watersons《A Yorkshire Garland》1966 `ca1e5636`／
The Young Tradition《So Cheerfully Round》1967 `4fc298d8`／Anne Briggs《The Bird in the Bush》1966 `ea8f6297`／
Amazing Blondel《England》1972 `19bffe67`／Magna Carta《Lord of the Ages》1973 `7cefba48`。

---

## 四、與 c-68（prog／psych）／c-71（爵士）的實掃對照

**逐筆讀 `batch-progress/c68/prop-a.json`（9 張）、`prop-b.json`（36 張）、
`batch-progress/c71/prop-a.json`（22 張）、`prop-b.json`（23 張），合計 90 張。**

**與 c-117 的 43 張重複：0 張。**

- **c-68（45 張）**是英國 prog／psych 私壓，與本批的接觸面只有四個掛名——
  `Oberon`《A Midsummer's Night Dream》、`Tudor Lodge`、`Fuchsia`、`Sunforest`。
  **這四張都已經進池了**（本批實掃 `seed_cards.json` 確認），本批一張都沒碰。
  唯一需要說明的是 **Gryphon**：MB 的 disambiguation 寫「70s UK progressive rock band」，
  形式上落在 c-68 的範圍裡，但 **c-68 的 45 張裡 Gryphon 一張都沒有**。
  本批因此收它的**首張（1973，Transatlantic，民謠側）**，
  並把 1974 年的《Red Queen to Gryphon Three》（prog 側）明寫進 `mbNote` 的「刻意不釘」，
  留給日後的 prog 補遺批——**這是本批唯一一個踩在兩批邊界上的決定。**
- **c-71（45 張）**是英國自由爵士與 Brotherhood of Breath 一系，
  與英國民謠**沒有任何掛名或碟名交集**，連邊界案例都沒有。

---

## 五、MB 查無、可進 §1 補遺批的候選

**0 張。**

本批預定收的每一張都在 MB 上找得到 `primary-type=Album` 的 release-group、
且轄下有原壓的 `Official` release。**英國 1970s 民謠私壓在 MB 上的建檔率意外地高**——
派工信預期的「建檔品質不均」在**年份欄**上完全成立（第 211 條），
但在**「這張碟存不存在」**這個層面幾乎沒有缺口。

**這與 c-115（英國 DIY 自壓盤 §1 補遺）是兩回事，不要混**：
c-115 收的是 1977 之後的 DIY／post-punk 自壓，那條線 MB 建檔率確實低；
本批的 1968–1978 民謠私壓有 Topic／Trailer／Transatlantic／Island 這些**有目錄編號的廠牌**在後面，
連 Dulcimer 這種只壓幾百張的碟都建了 RG。**本批沒有東西要轉出去給 c-115。**

未收的 3 張（第 3.3 節）**不是 §1 候選**——它們 MB 有建檔，卡的是封面，
依裁定 203 的反方向：**§1 的判準是「MB 沒有」，不是「封面拿不到」。**

---

## 六、其他值得記的判斷

1. **`Bridget St John` 用池中寫法、不用 MB 寫法。** MB 實體名是 `Bridget St. John`（帶點號），
   池中兩張既有卡寫 `Bridget St John`（無點號）。依裁定 177（先看池中、再看 MB credit）沿用池中形態，
   **避免製造第三種分裂寫法**。本機建卡時不要照 MB 改回帶點號。
2. **`Shirley & Dolly Collins` 用 MB／池中的 `&` 形態。** Apple 寫 `Shirley Collins & Dolly Collins`
   （把 Shirley 的姓補全），是第三種寫法，不採。
3. **C.O.B.《Spirit of Love》年份取 MB 的 1970，不取坊間的 1971。**
   MB 轄下的原盤 release 標 1970/GB/Official（CBS 69010），坊間與部分目錄記 1971。
   依裁定 127 附錄「不得拿一個有爭議的值去換另一個有爭議的值」，取 MB 該 release 實際標註的值。
4. **Jan Dukes de Grey《Sorcerers》轄下 7 個 release 有 5 個是 Bootleg**（2002 IT／KR、2019 KR／JP、2020 GB），
   只有 1969/GB 與 1970-01/GB 兩筆 Official。依裁定 43／57／65／78，
   **年份與背書一律取 1969/GB 那筆，Bootleg 那五筆不得採為背書、也不要拿它們的封面。**
5. **The Sallyangie《Children of the Sun》轄下最早的 release 是 `Promotion` status**（1969/US Warner Bros.）。
   正規盤要看 1978/GB 與 1979/IT 兩筆 Official；**年份仍取原盤發行年 1969（裁定 127），不取 1978。**
6. **Dulcimer 與 Tír na nÓg《A Tear and a Smile》的原盤 release 沒有 label-info。**
   `label` 欄已寫明「MB 該 release 未填 label-info」，**本機建卡時請留白或另尋一手證據，
   不要照坊間著錄直接填**（Dulcimer 坊間記 Nepentha，但 MB 無此欄位可佐證）。
7. **Dulcimer 的盤名含 U+2026 刪節號**（`And I Turned As I Had Turned As A Boy…`）。
   `chk-prop` 的非 ASCII 連字號檢查（裁定 186）掃不到這個字元，
   但 Apple 與 CAA 的字串比對會受影響，`queryAlias` 已備去刪節號版。
8. **Magna Carta 在 Apple 上有一個「兩張碟併成一個條目」的形態**
   （collectionId 1442886702《Seasons + Songs from Wasties Orchard (Remastered)》，年份標 1999）。
   本機配對時**不可用它當任一單張的來源**。
9. **Apple 的盤名後綴會帶 `feat.` 與 `[Definitive Edition]`**
   （Carthy & Swarbrick《But Two Came By (feat. Dave Swarbrick)》、
   Sallyangie《Children of the Sun (feat. Mike Oldfield & Sally Oldfield) [Definitive Edition]`）。
   配對要截斷後綴，**不可因此判為別碟**。
10. **`Wizz Jones《Right Now》` 的 Apple `search` 四筆裡三筆是 Nick Jonas 的同名單曲。**
    只有 collectionId 324112956 是對的。**盤名是通用詞組時，一律用 collectionId 直查。**

---

## 七、這個場景在池中的飽和度（一句話）

**英國 acid folk 私壓那一半已經接近飽和**（Comus、Trees、Forest、Mellow Candle、Trader Horne、
Tudor Lodge、Synanthesia、Oberon、Agincourt、Stone Angel、Fresh Maggots、Mark Fry、Fuchsia、
Shelagh McDonald、Perry Leopold 都在池中，本批只能補第二作），
**但 traditional 與小廠那一半還很空**——Topic、Trailer、Leader、Argo 四個廠在本批之前
池中幾乎只有零星幾張，Fotheringay 這種 electric folk 主線上的唯一一張碟竟然也缺席；
**本批補完之後，Topic 有 5 張（Adieu to Old England／For as Many as Will／Coppers & Brass／
Ashes and Diamonds／Sound, Sound Your Instruments of Joy）、Trailer 有 3 張（Ballads and Songs／
No More Forever／The Rout of the Blues）、Argo 有 2 張、Island 有 2 張、Transatlantic 有 2 張、
Vertigo 民謠側有 2 張、Village Thing 有 1 張、Dandelion 有 1 張——這條線才第一次有廠牌層級的密度。**
