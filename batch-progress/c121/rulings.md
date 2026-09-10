# c-121 日本 1970s–90s 地下即興／フリージャズ（PSF 前史）：策展層裁定（2026-09-07，含 Live 解除後的補完）

交件：`prop-a.json` **25 張／11 位**（フリージャズ・即興演奏家線）、
`prop-b.json` **26 張／13 位**（地下即興・PSF 前史線），合計 **51 張、24 位**。
`node batch-progress/c121/chk-prop.mjs a b` → **標記 0**
（線上池撞卡 0、跨組重複 0、跨批撞卡 0／72 批 3,231 張）。
`chk-prop.mjs` 由主線預先放好的 c-117 版原樣沿用，只有 §5.6 合輯分支、無 §5.5 白名單分支。

**本批分兩段交件**：第一段 41 張（依原派工信「只收 `secondary-types` 為空」）；
第二段補 10 張（主線 2026-09-07 解除 `Live` 限制後補完，見第 1 條）。

---

## 一、本批立的裁定

### 第 1 條（**主線 2026-09-07 推翻原派工信，本批照新規則補完**）：**`secondary-types` 含 `Live` 的碟照一般 Album 收**

原派工信第 4 條寫「只收 `primary-type=Album` 且 `secondary-types` 為空」。
策展層第一段交件時照做，並在回報中指出這條規則在這條線砍掉的量異常大。
**主線查證後推翻自己的寫法，理由有三**：

1. **`ALBUM_ONBOARDING.md` 從來沒有一條規則排除 `Live`。**
   §5.6 第 287 行只講 `Compilation`（「MB `primary-type` 為 Album 但 secondary-type 含 Compilation 者，
   照一般 Album 寫法即可」），`Live` 不在任何一條排除規則裡。
2. **池中有 213 張盤名含 Live 字樣的卡**，包含《Live at the Regal》《The Köln Concert》
   《Live/Dead》《Live at Birdland》這種正典級的碟。
3. **這條線自己就有一張**：`高柳昌行ニュー・ディレクション・ユニット《Live at Moers Festival》(1980)`
   早就在池中。

**裁定：`primary-type` 仍必須是 `Album`；`secondary-types` 含 `Live` 照一般 Album 寫法收，
含 `Compilation` 依裁定 167 也照一般 Album 寫法收（例外欄位一律留空）。
但含 `Live` 的碟，`mbNote` 必須寫明「這是現場錄音」與演奏年。**

**這條解除實際救回的量**（第一段被擋、第二段補回的 10 張）：

| 藝人 | 補回的碟 | rgMbid | 沒有這條解除會怎樣 |
|---|---|---|---|
| 阿部薫 | 北 ‹NORD› (1981)／ラストデイト (1989) | `1f3b6584`／`6283a7a8` | **名下 49 個 RG 只有 1 個能收** |
| 山下洋輔トリオ | Clay (1974) | `d26f7065` | — |
| 富樫雅彦 | 双晶 (1973) | `336d6cb7` | Trio 廠牌線索整條收不到 |
| 吉沢元治 | Inland Fish (1987) | `2fa5f529` | 他唯一有 Apple 條目的碟收不到 |
| 裸のラリーズ | MIZUTANI (1991)／'67-'69 STUDIO et LIVE (1991) | `ad0cc954`／`b6fe2d90` | **三張 1991 官方盤一張都收不到** |
| East Bionic Symphonia | Recorded Live (1976) | `9b0da5fd` | **這支團無論如何都建不了卡**（見第 8 條） |
| Taj Mahal Travellers | July 15, 1972 (1972) | `904a0052` | 名下 10 個 RG 只有 1 個能收，而那 1 個是池中已有的 |
| 光束夜 | ファースト・ライブ1979 吉祥寺マイナー | `d5b84838` | **唯一記錄「吉祥寺マイナー」場景的錄音收不到** |

**本批 51 張裡有 10 張 `secondary-types` 含 `Live`**，全部在 `mbNote` 註明是現場錄音與演奏年。

**⚠ 解除之後仍然收不到、且主線點名要收的兩張**（理由不是 Live，是另外兩條硬規則）：
- **山下洋輔トリオ《Dancing 古事記》(1969)** `eda8736c`——**CAA 回 404**，
  依 §4「抓不到可靠封面就停止該筆」與本批第 8 條不收。**這是本批最可惜的一張**（見第四節）。
- **裸のラリーズ《Heavier Than a Death in the Family》(2002)** `aaf3bf6d` 與
  **《Blind Baby Has Its Mother's Eyes》(2003)** `cb95a824`——CAA 都回 200，
  **但轄下 release 的 status 全部是 `Bootleg`**（Ain't Group Sounds AGS-1、[no label]、
  Phoenix Records ASHCD3037／ASHLP3035、Japanese Rockの原点 02），依第 8 條不收。

### 第 2 條：**年份一律取發行年，只有一種情況例外——盤名自己把錄音年印在臉上**

派工信第 5 條要求逐張交代。本批的判準：

1. **默認取「這張唱片首次問世的年份」（MB `first-release-date`）**。
   依據是池中既有的先例：`Les Rallizes Dénudés《'77 Live》` 卡片年份記 **1991**（演奏 1977），
   `裸のラリーズ《The Oz Tapes》` 記 **2022**（演奏 1972）——**池中已經站在發行年這一側**，
   依裁定權下放的「有先例照先例走」，本批不另立新規。
2. **例外：盤名本身載明錄音年份的身後／延後發行盤，取原始演奏年**，
   因為卡片年份若與盤名上的數字不同，卡面會自相矛盾。

**實際落點：51 張裡 48 張取發行年、3 張不是。**

| 卡 | 取的年 | 另一個年 | 理由 |
|---|---:|---|---|
| 阿部薫《スタジオ・セッション1976.3.12》 | **1976（演奏年）** | 發行 1992（ViViD SOUND VSCD-304） | 例外條：盤名載明 1976-03-12 |
| 光束夜《ファースト・ライブ1979 吉祥寺マイナー》 | **1979（演奏年）** | 發行 2006（P.S.F. PSFD-166） | 例外條：盤名載明 1979；**本批演奏／發行落差最大的一張（27 年）** |
| 山下洋輔《バンスリカーナ》 | **1976（MB RG 層年份＝錄音年）** | 首個 release 是 1981-12（enja 28MJ 3106） | MB 的 RG 年份與轄下最早 release 差五年，**沒有 1976 年的 release 可取** |
| 其餘 48 張 | 發行年 | — | — |

**演奏／發行有落差、但仍取發行年的 5 張（理由逐張寫在 `mbNote`）：**

| 卡 | 取的年 | 演奏年 | 為什麼不取演奏年 |
|---|---:|---|---|
| 高柳昌行《April Is the Cruellest Month》 | 1991 | 1970 年代，**MB 未登錄** | 盤名與廠牌名（April Disk）只指向「四月」不指向年份，依「不確定的事實不寫」 |
| 阿部薫《ラストデイト》 | 1989 | ≤1978（他 1978 年去世），**MB 未登錄** | 同上；盤名只說「最後的演出」不說年份 |
| 阿部薫《北 ‹NORD›》 | 1981 | **MB 未登錄** | 同上 |
| 裸のラリーズ《MIZUTANI》 | 1991 | 1970 年代，**MB 未登錄確切日期** | 池中先例（`'77 Live` 記 1991）；⚠ Apple 的 releaseDate 記成 **2006**，既非演奏年也非任何發行年，依裁定 91／95 不取 |
| 裸のラリーズ《'67-'69 STUDIO et LIVE》 | 1991 | **1967–69（盤名載明，但是區間不是單一年份）** | 例外條要的是單一年份，區間無法當卡片年份用 |

**演奏年＝發行年、無落差的現場盤 5 張**：山下洋輔トリオ《Clay》(1974 Moers 音樂節)、
富樫雅彦《双晶》(1973)、吉沢元治《Inland Fish》(1987)、
Taj Mahal Travellers《July 15, 1972》(1972-07-15 草月會館)、East Bionic Symphonia《Recorded Live》(1976)。

**另外一個年份陷阱已寫進 `mbNote`：**
- **不失者《もう少しこのまま》**（未收）：MB 的 `first-release-date` 1996-06-24 **落在一個 Pseudo-Release 上**，
  實體 Official 版是 1998-06-24——`first-release-date` 不等於實體首版年。
- **Ché-SHIZU《A Journey》／近藤等則《大変 Taihen》／高柳昌行《A Jazzy Profile of Jojo》**：
  Apple 的 `releaseDate` 分別記 2018／1999／2005（都是再發年），與 MB 差 20 年上下，依裁定 91／95 一律取 MB。

### 第 3 條：**MB 實體文字與 `chk-prop` 的非 ASCII 連字號檢查打架時，改寫成 ASCII 並記進 mbNote**

本批遇到**兩個**實例：

| 卡 | MB 原文 | 問題字元 | 卡片寫成 |
|---|---|---|---|
| **Ché-SHIZU**（掛名） | `Ché‐SHIZU` | **U+2010 HYPHEN** | `Ché-SHIZU`（ASCII 連字號） |
| **裸のラリーズ《'67-'69 STUDIO et LIVE》**（盤名） | `’67–’69 STUDIO et LIVE` | **U+2013 EN DASH** ＋ U+2019 撇號 | `'67-'69 STUDIO et LIVE`（全 ASCII） |

兩者都會被 `chk-prop` 的連字號檢查（裁定 186）直接亮紅燈——**照 MB 原文寫就過不了自批的檢查**。

**裁定：改寫成 ASCII，MB 原文一律寫進 `mbNote` 與 `queryAlias`，下游藝人／盤名比對閘要放行（裁定 194）。**
這是「MB 實體文字優先」（裁定 6／70／120）與「非 ASCII 連字號一律擋」（裁定 186）
**兩條規則正面打架**的頭兩個實例，依裁定權下放的「可逆」判準（改的是卡單值不是卡池結構）當場定。
旁證：Apple us 店顯示的 Ché-SHIZU 與 `'67-'69 Studio Et Live` **都已經是 ASCII 版**。

### 第 4 條（c-116 第 4 條的**第二次**提報）：**`Keiji Haino` → `灰野敬二` 是本批上架的前置條件**

池中 灰野敬二 只有 1 張，掛在羅馬字 `Keiji Haino` 底下（《Watashi Dake?》，卡片年份 2017）。
c-116 第 4 條已把這件事列為上架前置，**顯然沒有處理**，因為池中那張到今天還是羅馬字。

本批 prop-b 有 **3 張** 灰野敬二 用漢字掛名（＝MB 實體主名與三張的 artist-credit 全部是漢字）。
**若本機直接上架而不先改池中那張，就會當場生出一組 1:3 的分裂卡。**
三處要同步：`seed_cards.json`、KV（`desc2`／`rating4`）、Firestore `card_catalog`。

**同時要處理的還有第二張**：池中《Watashi Dake?》＝ MB 的 `67e1cebc《わたしだけ？》(1981)` 同碟異寫。
c-116 rulings 第 4.3 節把 `67e1cebc` 列進「MBID 已備妥」的名單，**本批不收**——那是同一張碟，
收了就是重複卡（裁定 49：跨文字系統的撞卡字串看不見）。

### 第 4.5 條（Live 解除後新增）：**`裸のラリーズ` 與 `Les Rallizes Dénudés` 是第三組要正規化的掛名**

實掃 `seed_cards.json` 全 14,424 列：池中有 **`裸のラリーズ《The Oz Tapes》(2022)`** 與
**`Les Rallizes Dénudés《'77 Live》(1991)`** 兩張，**是同一團的兩種掛名**，`chk-prop` 的 `k()` 摺不掉。

**裁定：本批兩張新卡一律用 MB 實體 `1ba797b6` 的主名 `裸のラリーズ`**（08-11 裁定：混漢字假名者不羅馬化），
**並把池中那兩張都當成「池中已有」算撞卡**——所以 MB 上 1991 年三張官方盤裡的 `’77 LIVE`(`bb9f0f5c`)
與 2022 年的 `The OZ Tapes`(`313f7bca`) **本批都不收**，只補剩下的兩張。
**本機上架前應把 `Les Rallizes Dénudés《'77 Live》` 一併正規化為 `裸のラリーズ`**，
否則池中會同時存在三種掛名。

### 第 5 條：**派工信說「Ghost 池中已有 2」是誤判——那兩張是瑞典金屬樂團**

實掃 `seed_cards.json` 全 14,424 列，掛「Ghost」的兩張是 **《Opus Eponymous》(2010)** 與
**《Meliora》(2015)**——**Ghost（SE，`2bcf2e02`，「Swedish metal band」）的碟，不是日本 psych rock 的 Ghost**。
**日本 Ghost（`97ea6a8e`，Group／JP／1984）池中其實 0 張。**

**裁定：本批收日本 Ghost 三張（1990／1992／1996）。**
⚠ 上架後卡池裡會出現**兩支同掛「Ghost」的不同樂團**，`chk-prop` 的 `k()` 對
`Ghost｜Ghost` 與 `Ghost｜Opus Eponymous` 不會撞，**這是真實存在的同名、不是命名分裂**，
但建議本機在卡片備註或掛名後綴上做區分（c-116 第 7 條 あぶらだこ 那種顏色後綴的同族做法）。
（主線已收下這處更正。）

### 第 6 條：**`光速夜` 是誤字，MB 與本批一律用 `光束夜`**

派工信與 `CURATION-BRIEF-c119plus.md` 第五節寫的是「光速夜（Kousokuya）」，
**MB 藝人實體 `ac1cda27` 的正名是「光束夜」（束，不是速）**。
搜「Kousokuya」只回這 1 個實體。**本批一律用 `光束夜`**，誤字版已進 `queryAlias`，
避免後續批用「光速夜」提案生出一張撞不到的重複卡。（主線已收下這處更正。）

### 第 7 條：**「合掛平列」的碟一律不收，除非池中已有這位、或有外部目錄背書**

這條線的 artist-credit 極常是二到六人平列。
**裁定：credit 平列時，只有在「池中已有這位、或有外部目錄（Apple 藝人頁）把碟記在某一人名下」時才掛單人，否則不收。**

- **收了**：佐藤允彦《Trinity》（三人平列，但 **Apple jp `1566983019` 就把它記在 佐藤允彦 名下**）；
  豊住芳三郎《Cosmos Has Spirit》（二人，廠牌 Scissors 是日本自主廠、池中已有 豊住 1 張）；
  今井和雄《Play 'em as They Fall》（「Barre Phillips & Kazuo Imai」，Barre Phillips 池中 0 張、本批主題是日本這一側）；
  原田依幸《無明 [Mu-Myo]》（二人，但這是他名下唯一的純 Album）；
  **阿部薫《北 ‹NORD›》**（「阿部薫・吉沢元治」，掛 credit 領銜者，池中已有 阿部薫）；
  **富樫雅彦《双晶》**（「富樫雅彦 & 佐藤允彦」，掛 credit 領銜者，**兩位池中都已有卡**，Apple `1326761013` 兩人並列）。
- **不收**：近藤等則《Environment for Sextet》（六人平列，含 John Zorn）；
  豊住芳三郎《What Are You Talking About?》（四人平列）；
  坂田明《D.D.T.》（credit 是團名「AKIRA (EMOTO+SAKATA)」，與演員 柄本明 的合作）；
  佐藤允彦《Metempsychosis》（「ツトム・ヤマシタ & 佐藤允彦」，且 2015 再發改題《ものみな壇ノ浦へ》）；
  富樫雅彦《Poesy》《牡牛座の詩》《トゥワイライト》（三人平列／大樂團合掛）。

### 第 8 條：**CAA 404 與 `status=Bootleg` 一律不收，不因 Apple 有條目、不因主線點名而破例**

依 `ALBUM_ONBOARDING.md` §4「抓不到可靠封面就停止該筆」與 c-116 第 6 條。
本批因此擋掉 **19 張已查證、MBID 已釘、但 CAA 回 404** 的碟，
以及 **3 張 CAA 200 但 release 全數是 Bootleg** 的碟（見第四節）。

**兩個沒有破例的實例，都值得記下來：**
- **Maher Shalal Hash Baz《from a summer to another summer》(2000)** 在 Apple jp 有條目（`80967381`）
  卻沒有 CAA，**仍然不收**。
- **山下洋輔トリオ《Dancing 古事記》(1969)** 是主線在 Live 解除那一棒裡**點名要收的碟**，
  CAA 回 404，**仍然不收**——因為 Live 那條解除的是 `secondary-types`，不是封面規則。

**代價是本批的 51 張 CAA 全部回 200（100%）。**
`caa` 端點的 5xx 都有重試（第 222 條），本批實測沒有遇到 5xx，404 都是真的沒有圖。

---

## 二、與既有批的實掃對照

### 2.1 線上池（`seed_cards.json` 全 14,424 列，每個名字查漢字＋羅馬字兩種以上）

| 骨幹藝人 | 派工信說的 | **實掃結果** |
|---|---|---|
| 阿部薫 | 零 | ⚠ **2 張**（《Mort À Crédit》1976、《彗星パルティータ》1981）＋ 與 高柳 合掛的《解体的交感》1970。**派工信寫的是「阿部薰」(U+858B)，MB 與池中用的是「阿部薫」(U+85AB)——兩字不同碼位，只查一種會得到假的零。** |
| 高柳昌行 | 2 | ⚠ **4 張**（另有「高柳昌行ニュー・ディレクション・ユニット《Live at Moers Festival》(1980)」1 張與 阿部薫 合掛 1 張）。**那張 Moers 現場正是主線用來推翻 Live 限制的池中先例。** |
| 富樫雅彦 | 2 | ⚠ **3 張**（另有「Masahiko Togashi Quartet《Sketch》」1977） |
| 山下洋輔 | 零 | ⚠ **1 張**（「山下洋輔トリオ《Chiasma》」1976；個人掛名 0 張） |
| 佐藤允彦 | 零 | ⚠ **1 張**（「佐藤允彦とサウンド・ブレイカーズ《Amalgamation》」1971） |
| 近藤等則 | 零 | ⚠ **1 張**（「Toshinori Kondo / DJ Krush《記憶 Ki-Oku》」1996，**羅馬字掛名**） |
| **裸のラリーズ** | 已有，兩種寫法各 1 | ⚠ **2 張，是掛名分裂**：`裸のラリーズ《The Oz Tapes》(2022)`＋`Les Rallizes Dénudés《'77 Live》(1991)`。**兩張都當「池中已有」算撞卡**（見第 4.5 條） |
| Ghost | 2 | ⚠ **0 張**（池中那 2 張是瑞典金屬樂團，見第 5 條） |
| 灰野敬二 | 1（`Keiji Haino`） | 1 張，確認是羅馬字掛名（見第 4 條） |
| 豊住芳三郎／不失者／Taj Mahal Travellers | 各 1 | 一致 |
| 非常階段 | 2 | 一致 |
| 吉沢元治・翠川敬基・梅津和時・原田依幸・坂田明・井野信義・光束夜・White Heaven・Che-SHIZU・Maher Shalal Hash Baz・Marginal Consort・East Bionic Symphonia・今井和雄・High Rise | 零 | **確認全部 0 張**（漢字／羅馬字／姓名倒置三種寫法都查） |

**⚠ 實掃時踩到的假命中**：查「今井」會命中池中的 **`Nobuko Imai 今井信子`**（中提琴家）與 `今井美樹`，
查「佐藤」會命中 `Somei Satoh 佐藤聰明`，查「Ghost」會命中 `Ghostface Killah`(5)、`Holy Ghost!`(1)，
查「Taj Mahal」會命中美國藍調的 `Taj Mahal`(3) 與 `Taj Mahal & Keb' Mo'`(1)——全部逐筆核對後排除。

### 2.2 c-67（日本自主爵士小廠 1975–88，Johnny's Disk 那一線）

實掃 `onboarding-manifest-c67-20260904.json` 全 30 張。**重疊只有兩處，都已處理**：

- **阿部薫《Mort À Crédit》《彗星パルティータ》**——c-67 那兩張就是池中那兩張，本批不收。
- **松風鉱一**：c-67 收《Koichi Matsukaze Trio — At the Room 427》(1975, Johnny's Disk)；
  本批的 原田依幸《無明 [Mu-Myo]》(2003, Ohrai Records) credit 也有他。
  **歸本批的理由**：不同碟、不同年（1975 vs 2003）、不同廠牌、掛名領銜的是 原田依幸——
  本批要補的是「フリージャズ 演奏家在池中掛零」那一類，不是 c-67 的爵士喫茶自主盤。
- **另外主動避開的**：梅津和時《集団生活》(1977) CAA 200、credit「明田川荘之3 + 梅津和時 & 中村マスコ」、
  **廠牌是 Aketa's Disk AD-5**——**明田川荘之 在 c-67 已有 4 張，這張是 c-67 那條線的碟不是本批的**，
  **本批不收，讓給 c-67 系的後續批**。

**本批 prop-a 的廠牌分佈與 c-67 完全不同形**：Union、Victor World Group、Iskra（高柳自營）、
EAST WIND、DENON、Trio、CROWN JAW、Frasco、Polydor、Epic/Sony、BETTER DAYS、enja、
ALM-Uranoia、DIW、Break Time、Ohrai、Scissors、ViViD SOUND——**一張 Johnny's Disk／Aketa's Disk 都沒有**。

### 2.3 c-73（日本 prog 自主）

實掃 `onboarding-manifest-c73-20260904.json` 全 36 張（四人囃子、KENSO、美狂乱、Pageant、
Outer Limits、夢幻、Ain Soph、Terra Rosa、Mr. Sirius 等）。**藝人與碟零重疊**——
那批是 1980 年代的交響搖滾自主盤，與本批的自由即興／PSF 沒有交集。

### 2.4 c-116（日本自主 hardcore／noise）

實掃 `batch-progress/c116/prop-a.json`＋`prop-b.json` 全 44 張。**同一藝人、不同碟的有四位**：

| 藝人 | c-116 收的 | c-121 收的 | 撞卡 |
|---|---|---|---|
| 灰野敬二 | 《滲有無》(1990) | 《So, Black Is Myself》(1997)／《Beginning and End, Interwoven》(1994)／《The Book of "Eternity Set Aflame"》(1996) | 無 |
| 不失者 | 《Allegorical Misunderstanding》(1993) | 《悲愴》(1994)／《来たる時》(1997) | 無 |
| High Rise | 《Psychedelic Speed Freaks》(1984) | 《High Rise II》(1986)／《Dispersion》(1992) | 無 |
| 非常階段 | 《蔵六の奇病》(1982)／《Modern》(1989) | 《Romance》(1990)／《Windom》(1991) | 無 |

**c-116 rulings 第 4.3 節那份「額度用完、MBID 已備妥」的名單，本批直接取用了 7 個 MBID**
（灰野《So, Black Is Myself》、不失者《悲愴》《もう少しこのまま》、High Rise《High Rise II》《Dispersion》、
非常階段《Romance》《Windom》），**全部回問覆核過**，其中 不失者《もう少しこのまま》
因 CAA 404 ＋ first-release 落在 Pseudo-Release 上而未收。
**該名單裡的 Incapacitants／Masonna／C.C.C.C./Aube／Government Alpha／Pain Jerk／ハナタラシ／KK Null
是純噪音線，本批（即興／PSF 前史）不碰，留給 c-116 的後續批。**

---

## 三、短掛名回問（第 179 條）實測數字

**第 250 條照做：完全沒有用 `score` 排序，只用 `disambiguation` 判定。**

| 掛名 | MB `artist/?query=` 回的實體數 | 名稱**完全相同**者 | 其中無 disambiguation | 選中的 | 擋下的同名實體 |
|---|---:|---:|---:|---|---:|
| **Ghost** | 25 | **11** | **0** | `97ea6a8e`（Group／JP／1984／「Japanese psych rock」） | **10** |
| High Rise | 25 | 1 | 0 | `2f3eb5a0`（Group／JP／1984／「Japanese heavy psych band」） | 0 |
| White Heaven | 25 | 1 | 0 | `44f2c4a8`（Group／JP／1985／「Japanese rock band」） | 0 |
| Maher Shalal Hash Baz | 25 | 1 | 0 | `23404102`（Group／JP／1984／「Japanese band」） | 0 |
| Marginal Consort | 25 | 1 | 0 | `21686ae7`（Group／JP／1997／「Japanese free improv group」） | 0 |
| **East Bionic Symphonia** | 25 | 1 | 0 | `e731f892`（Group／JP／1976-03／「Japanese free improv group」） | 0 |
| **Taj Mahal Travellers** | 25 | 1 | 0 | `d2d9dbce`（Group／JP／1969／「early 1970's japanese free improvisation/drone group」） | 0 |
| Kousokuya | **1** | 0（MB 正名是漢字「光束夜」） | — | `ac1cda27` | 0 |
| Che-SHIZU | 25 | 0（MB 正名含 U+2010） | — | `11e13bd9` | 0 |
| 阿部薫 | 25 | 3 | 0 | `e6d03f96`（「Japanese alto sax player」） | **2**（鼓手 `4960f39f`、演員 `28d6582e`） |

**擋下的同名實體合計 12 個**，其中 **Ghost 一個掛名就佔了 10 個**——
瑞典金屬、GHOST AND PALS、牙買加 reggae、日本視覺系、法國 wall noise、義大利搖滾、
電子製作人 Kenny Parish、英國 hip hop 製作人、波蘭死金、英國 garage。
**11 個完全同名的實體全部都有填 disambiguation**，第 250 條「連 disambiguation 都沒填就不得背書本名」
這一段本批沒有觸發。

**⚠ Taj Mahal 這個掛名的假命中特別要記**：MB 那邊乾淨（同名實體唯一），
**但池中有 `Taj Mahal`(3 張) 與 `Taj Mahal & Keb' Mo'`(1 張)，那是美國藍調樂手**，
實掃時逐筆核對後排除；本卡掛的是池中既有的 `Taj Mahal Travellers`。

---

## 四、未收清單（分類）

> **「因 `secondary-types` 帶 `Live` 而不收」這一類已於 2026-09-07 由主線解除，
> 本節不再保留**（原因見第 1 條）。剩下三類：CAA 404、掛名平列、Bootleg，
> 外加一類「配額未收但可直接建卡」。

### 4.1 **因 CAA 回 404、封面解不出來而不收**（查證完成、MBID 已備妥）

**這 19 張全部已回問過 release-group、`primary-type=Album`、廠牌與年份都查清楚，只缺封面。
若本機能從 Bandcamp／Spotify／release 層 CAA 補到圖，可直接建卡：**

| 藝人 | 碟 | rgMbid | 廠牌 | 備註 |
|---|---|---|---|---|
| **山下洋輔トリオ** | **Dancing 古事記 (1969)** | `eda8736c-0f54-48b9-adc9-40e8ea165cce` | **Maro Record 46-20 (OS-1129L)**，JP Official | ⚠ **主線在 Live 解除那一棒點名要收，但 CAA 404**；這是這條線的基石之一，**最值得本機手動補封面的一張** |
| 阿部薫 | なしくずしの死 (1976) | `279439ee-e53b-4ef2-8563-0b5090af403d` | **ALM RECORDS AL-8; AL-9**，JP Official | Album/Live；**ALM 線索**、間章 那一路 |
| 吉沢元治 | 割れた鏡 または 化石の鳥 (1975) | `32e6712d-8acb-4e01-927c-6d1706503174` | **ALM RECORDS AL-6**（status null） | **ALM 線索** |
| 吉沢元治 | Kozan (1986) | `7dc75d9a-18b1-4356-b450-4d0dd269e5da` | Tiara Company TIARA 001 | — |
| 山下洋輔 | Mokujiki (1970) | `8a9cad13-7594-4059-9e2c-51741c694715` | VICTOR WORLD GROUP SMJX-10088 | — |
| 山下洋輔トリオ | Inner Space (1977) | `e049da66-1a62-470b-a1ac-d713f9e1c3be` | enja 3001（status null） | — |
| 近藤等則 | Death Is Our Eternal Friend (1983) | `534085b8-1553-4d97-82f8-d59877da51e3` | **DIW DIW-1109** | **DIW 線索** |
| 近藤等則 | Metal Position (1985) | `0412c82e-fcf5-4642-a0b1-a6a7a1aa8122` | Polydor H33P 20026 | — |
| 近藤等則 | Human Market (1988) | `8aa63d0e-c95f-467d-b142-f7746705e357` | Jaro 4146 CD 26 | — |
| 翠川敬基 | 完全版・緑色革命 (2009) | `52ceb967-7bcd-47db-94de-40dda4594be9` | doubtmusic dmhrp-129/130 | **他名下只有 2 個 RG，這是唯一能收的；不收＝這位掛零** |
| 梅津和時 | Diva (1988) | `7ed07236-31a1-4eeb-833e-8217cc29b464` | AV N32C-14 | 他另一張《集団生活》屬 c-67 線 |
| 坂田明 | Mooko (1988) | `316cb53e-0131-38ef-a537-694950363904` | GB Official，廠牌欄空 | — |
| 井野信義 | MOUNTAIN (1981) | `0a06b006-5f78-4c5d-a410-82f862a4b81d` | **BETTER DAYS YF-7015-ND** | **他名下 7 個 RG，這是唯一 1980 年代的碟；不收＝這位掛零** |
| 灰野敬二 | I Said, This Is the Son of Nihilism (1995) | `8fc8e203-0098-3fba-9c7f-34040e8b1677` | Table of the Elements TOE-CD-18 | — |
| 不失者 | 完結されもしない死 (1997) | `e438aba0-2ca2-3c40-a45f-9934749b9db1` | J‐FACTORY TKCF-77014 | 與已收的《来たる時》同日雙生盤 |
| 不失者 | もう少しこのまま (1996/1998) | `c2fd9e17-fb8a-325c-ad37-f51088c8ee26` | J‐FACTORY TKCF-77020 | **first-release 落在 Pseudo-Release 上** |
| High Rise | Disallow (1996) | `35f38ec2-453a-3b4c-9593-d615b9cb043a` | **P.S.F. Records PSFD-78** | — |
| Ché-SHIZU | 約束はできない (1984) | `e9711519-80b1-43e4-b318-f6239a00458d` | **Zero Records O-1284**；2001 Alchemy ARCD-135 | **Zero 廠牌線索**；他們的首張 |
| Maher Shalal Hash Baz | from a summer to another summer (2000) | `063a3229-34d5-35fb-ab84-06583545d33b` | Geographic geographic1cd | **Apple jp 有 `80967381` 卻沒有 CAA**（第 8 條沒有破例） |
| Marginal Consort | Collective Improvisation (1998) | `1194c5ad-1197-413f-8cdc-b3b016292890` | **P.S.F. Records PSFD-104** | 他們名下 3 個 RG 只有這張在窗口內；**不收＝這個團掛零** |
| 今井和雄 | How Will We Change? (1995) | `57515d65-23ff-4f71-b12b-7cf6a51a2227` | **P.S.F. Records PSFD-70**（status null） | 他另一張《Play 'em as They Fall》已收 |

### 4.2 **因掛名平列、掛不到單一藝人而不收**（見第 7 條）

近藤等則《Environment for Sextet》`bb5a3b86`（六人含 John Zorn）、
豊住芳三郎《What Are You Talking About?》`2cdadf13`（四人，**DIW DIW-1119**，CAA 200）、
豊住芳三郎《Two Strings Will Do It》`3f9435e4`（與 灰野敬二 二重奏，CAA 200）、
坂田明《D.D.T.》`6ff46528`（團名「AKIRA (EMOTO+SAKATA)」，CAA 200）、
佐藤允彦《Metempsychosis》`d86aa6bd`（與 ツトム・ヤマシタ，CAA 200，2015 改題《ものみな壇ノ浦へ》）、
佐藤允彦《天秤座の詩》`7668525c`／《Yamataifu》`02fd9983`（大樂團合掛，CAA 200）、
富樫雅彦《Poesy》`4c41c943`／《牡牛座の詩》`bc6cfc57`／《トゥワイライト》`19ea2681`（CAA 200）。
**這九張 CAA 全部 200，只差掛名判斷——店主若裁定「合掛盤取領銜者」就可以直接建卡。**

### 4.3 **因 release 全數是 `status=Bootleg` 而不收**

| 藝人 | 碟 | rgMbid | CAA | release 狀態 |
|---|---|---|---|---|
| **裸のラリーズ** | Heavier Than a Death in the Family (2002) | `aaf3bf6d-f747-3c3e-bfa4-35b084a491f9` | **200** | 4 個 release **全數 Bootleg**（Ain't Group Sounds AGS-1／[no label]／Phoenix ASHCD3037／ASHLP3037） |
| **裸のラリーズ** | Blind Baby Has Its Mother's Eyes (2003) | `cb95a824-84df-472e-bf8e-26293b19d66a` | **200** | 3 個 release **全數 Bootleg**（Phoenix ASHLP3035／ASHCD3035／Japanese Rockの原点 02） |
| East Bionic Symphonia | Recorded Live (2000 再發) | `be006d63-6f14-4f49-a218-68372760b27d` | 200 | 唯一 release 是 **Bootleg**（Lam Records LA-3001）；**1976 原盤已收，見第 1 條** |
| 阿部薫 | WINTER 1972 (1974) | `9aacca48-7801-4ec1-bafd-4284f27137d6` | 200 | 3 個 release 有 2 個 Bootleg（SOUND WORKS MN-3039／P.S.F. PSFD-158），唯一 Official 的 2009 King Harvest 版**還改題《WHAT BEYOND》** |

⚠ **前兩張是主線在 Live 解除那一棒點名要收的**——解除的是 `secondary-types`，
但這兩張擋住它們的是 `Bootleg`，不是 `Live`；依第 8 條與 c-116 的先例不收。
**若店主裁定「非官方整編盤也收」，這兩張 CAA 200、MBID 已備妥，可直接建卡。**

### 4.4 **因配額而未收，CAA 200、可直接進後續批**

富樫雅彦《フェイス・オブ・パーカッション》(1981) `dafa1d7d`、
**富樫雅彦／高柳昌行《パルセーション》(1983) `28d4c852`**（Paddle Wheel K28P 6244，2015 **DIW** DIW-3046 再發，Album/Live）、
山下洋輔トリオ《Up-To-Date》(1975) `795d4a98`、
非常階段《Tapes》(1986) `49758e5d`、
High Rise《Desperado》(1998) `b671e29c`／《Speed Free Sonic》(1999) `a3d2187f`、
White Heaven《Levitation》(1998) `29340b3d`、
灰野敬二 名下 66 個純 Album 裡尚未動的 63 個，以及他 121 個 RG 裡的其餘現場盤。

### 4.5 **同場次／同一份錄音的分卷發行，一律只收一張或不收**（第 174 條）

- **阿部薫《ソロ・ライヴ・アット・騒》VOL.1–10**（`2bfc5d2a`／`ae132b89`／`19306346`／`a212e2ed`／
  `35c46f4e`／`f490fa93`／`95aa3497` 等）——同一場次分成十卷，收一張會引出十張，**本批一張都不收**。
- **Taj Mahal Travellers《Live at Sohgetsu Hall in Tokyo, July, 15 1972》(2011)** `49b1fa1e`——
  **與本批已收的《July 15, 1972》是同一場演出的另一次發行**，收了會與本卡重複。
- **吉沢元治《平成元年ライブ：上／下》(1990)** `648d0490`／`9e01a1e7`——同一場次分上下卷。
- **裸のラリーズ 名下 77 個 RG 裡的其餘 60 餘個**——絕大多數是同一批巡演素材的重複整編。

### 4.6 **MB 查無、可進 §1 補遺批**

**本批 0 張**。派工信骨幹點名的 16 位藝人與 13 個團體在 MusicBrainz 上**全部有實體**，
沒有一位是「唱片實體確鑿、MB 沒建檔」。本批的損失全部來自
CAA、Bootleg 與掛名平列三個原因，**不是 MB 建檔率問題**——
這與 c-103 演歌線、c-115 英國 DIY 線的形狀完全不同。

---

## 五、店面、封面與試聽預估

**店面 `jp`**（Apple 的 `us` 店一併跑了，見下）。

### 5.1 封面（CAA）：**51／51＝100%**

本批對 83 個候選 RG 逐一 GET `coverartarchive.org/release-group/<id>`，
**5xx 一律重試（第 222 條）、實測沒有遇到 5xx**，404 都是真的沒有圖。
**入選的 51 張全部回 200**——這是第 8 條的直接結果，代價是 19 張查證完成的碟被擋在門外（第 4.1 節）。

### 5.2 試聽（Apple）：**19／51＝37.3%**（c-116 是 31.8%）

| 組 | 有 Apple collectionId | 明細 |
|---|---:|---|
| **a（フリージャズ・即興）** | **10／25（40.0%）** | 高柳昌行《A Jazzy Profile of Jojo》`1680425761`（jp＋us）、《April Is the Cruellest Month》`1660293959`（jp＋us）、富樫雅彦《ソング・フォー・マイセルフ》`1467950255`（jp）、《スピリチュアル・ネイチャー》`1443860040`（jp）、《ギルド・フォー・ヒューマン・ミュージック》`1853787079`（jp）、**《双晶》`1326761013`（jp＋us）**、山下洋輔《バンスリカーナ》`1509861343`（jp）、近藤等則《大変 Taihen》`1326758037`（us）、坂田明 — 無、佐藤允彦《Trinity》`1566983019`（jp）、**吉沢元治《Inland Fish》`1329346498`（jp＋us，題《インランド・フィッシュ》）** |
| **b（地下即興・PSF 前史）** | **9／26（34.6%）** | High Rise《High Rise II》`1334370094`（jp，⚠ 被標成「- EP」）、White Heaven《Out》`1500102789`（jp）、《Next to Nothing》`6766332340`（jp）、Ghost《Second Time Around》`82941639`（jp）、《Lama Rabi Rabi》`81741406`（jp）、Ché-SHIZU《A Journey》`1376746822`（jp＋us）、**裸のラリーズ《MIZUTANI》`1653743312`（jp＋us）**、**《'67-'69 STUDIO et LIVE》`1653740028`（jp＋us）**、**Taj Mahal Travellers《July 15, 1972》`1537208166`（us，題《一九七二年七月十五日》）** |

**c-116 第 6 條那條規律在本批第二次應驗**：Apple 命中集中在
**有大廠或歐美廠牌接手的碟**（Victor／Universal-EAST WIND／Columbia／Polydor／Trio／enja／
CBS-Sony／Tuff Beats／Black Editions／Blank Forms／Drag City），而純日本自主廠的碟幾乎全空——
**P.S.F. Records 的 9 張裡只有 3 張有 Apple 條目**，**Alchemy Records、J‐FACTORY、
Ray Night Music、Org Records、D'sレーベル、Station Kids、Scissors、Ohrai、Iskra、April Disk、
Frasco、CROWN JAW、ALM-Uranoia、DIW、Break Time 這十五家的碟，除了 Break Time 一張之外全空。**

**灰野敬二 是最極端的一位**：Apple jp 店以「灰野敬二」搜到 **40 筆**他的碟（2014 年之後的居多），
**本批收的三張（1994／1996／1997）一張都沒有**——他的目錄在 Apple 上是從 2010 年代才開始的。

**依裁定 195：CAA 有封面就收，不因 Apple 查無而換碟。** 本批沒有為了湊 Apple 條目改收任何一張。

### 5.3 四個給本機的 Apple 注意事項

1. **High Rise《High Rise II》的 Apple 條目被標成「- EP」**（`1334370094`），
   但 MB 的 primary-type 是 Album、原盤 PSF-2 是 LP。**不要因為 `- EP` 後綴把這張退回。**
2. **盤名極短的四張（White Heaven《Out》、光束夜《1st》、Ghost《Ghost》、山下洋輔トリオ《Clay》）
   Apple 搜尋噪音極高**——`Out` 在 jp 店回 42 筆裡只有 1 筆是本碟。
   **一律以 `collectionId` lookup，不得用搜尋首筆當來源**（§4 禁止 iTunes 模糊搜尋）。
3. **Taj Mahal Travellers 要認 `1537208166`，不要認 `1627688130`**——後者是
   《July 15, 1972 & August 1974 (Remastered)》**雙碟包**，會與池中已有的《August 1974》撞版本。
4. **跨文字系統的 collectionName**：吉沢元治《Inland Fish》在 Apple 是《インランド・フィッシュ》、
   Taj Mahal Travellers《July 15, 1972》在 Apple us 是《一九七二年七月十五日》、
   Ché-SHIZU 在 jp 店是《シェシズ》——**字串比對一定失準，一律以 collectionId 認**。

---

## 六、留給本機的四件事（上架前置）

1. **`Keiji Haino` → `灰野敬二`**（第 4 條，c-116 已提報一次未處理）——不改就生分裂卡（1:3）。
   *（主線已表示會一併提報。）*
2. **`Les Rallizes Dénudés` → `裸のラリーズ`**（第 4.5 條）——池中兩張分裂，本批再加 2 張漢字假名卡，
   不改池中會同時存在三種掛名。
3. **`Toshinori Kondo / DJ Krush`**（池中《記憶 Ki-Oku》1996）依 08-11 裁定應正規化為漢字；
   本批的兩張 近藤等則 用漢字，不改會多一組分裂。
4. **`Ghost` 同名兩團**（第 5 條）——上架後卡池會有瑞典金屬與日本 psych rock 兩支同掛「Ghost」，
   `chk-prop` 抓不到（不是分裂、是真同名），建議加後綴或備註區分。

**另外一件不是前置、但值得花時間的**：
**山下洋輔トリオ《Dancing 古事記》(1969, Maro Record 46-20)** 是這條線的基石，
唯一擋住它的是 CAA 404（第 4.1 節第一列）。若本機能手動核對到可靠封面（Discogs 條目確鑿），
它可以直接補進來。
