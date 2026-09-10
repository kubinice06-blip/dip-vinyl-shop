# c-123 蘇聯波羅的海地下音樂　策展層裁定與交件說明（2026-09-08）

批次規格見 `batch-progress/CURATION-BRIEF-c123plus.md` 第一、二、四節與第五節 c-123 段，
欄位規格沿用 `CURATION-BRIEF-c103plus.md` → `CURATION-BRIEF-c93plus.md` 第一節。

## 〇、交件數字

| 項目 | 數 |
|---|---:|
| `prop-a.json`（愛沙尼亞） | **24 張、17 位**，年份 1971–1991 |
| `prop-b.json`（拉脫維亞 13 ＋ 立陶宛 8） | **21 張、16 位**，年份 1974–1991 |
| 合計 | **45 張、33 位**，年份 **1971–1991**（窗口內，無一張越界） |
| `node batch-progress/c123/chk-prop.mjs a b` | **標記 0**（跨批撞卡 0、跨組重複 0、與線上池撞卡 0） |
| §5.6 合輯 | **5 張**（逐張舉證見第五節） |
| CAA release-group 探測 | **200：30 張／404：15 張**（**5xx：0**，裁定 222 的重試未被觸發） |

## 一、開工前的池中實掃（裁定 27：不取樣，掃全檔）

以 `batch-progress/lib.mjs` 的 `loadPool()` 掃 `seed_cards.json` 全 14,424 列
＋ 全部 `onboarding-manifest-*.json` ＋ `c47/cand-all.json`，
每個掛名用拉丁與原文兩種寫法各掃一次（`Zodiac`／`Zodiaks`、`Pērkons`／`Perkons`、
`Līvi`／`Livi`、`Sīpoli`／`Sipoli`、`Imants Kalniņš`／`Imants Kalnins`、
`Hiperbolė`／`Hiperbole`、`Gėlių Vaikai`／`Geliu Vaikai`、`Sven Grünberg`／`Sven Grunberg`）。

**結果與簡報第二節的實掃完全吻合**：

| 場景 | 池中 | 骨幹零率 |
|---|---|---|
| 愛沙尼亞 | **1 張**：Sven Grünberg《Hingus》(1981) | 20 位裡 19 位零 |
| 拉脫維亞 | **2 張**：Zodiac《Disco Alliance》(1980)、Raimonds Pauls《Melodija, improvizācija, ritms》(1975) | 11 位裡 9 位零 |
| 立陶宛 | **0 張** | **10 位全零** |

**實掃踩到的兩個假陽性，記下來給後面的批用**：

1. **`!!!`（樂團名）的摺鍵是空字串**——`key()` 把非字母數字全剝掉後，`!!!` 變成 `''`，
   於是它會被任何前綴比對摺進來。本批每一個掛名的前綴掃描都會出現
   `!!! — Louden Up Now (2004)`，**那不是命中**。做前綴／子字串比對的腳本要先擋空鍵。
2. **短掛名的前綴摺疊會摺到不相干的池中卡**：`Kaseke`／`Katedra` 都會摺到美國饒舌歌手 `Ka`（6 張）、
   `Gunnar Graps` 會摺到 `Gunna`（2 張）、`Antis` 會摺到 `Antisect`（1 張）、
   `Opus` 會摺到 `Opus Avantra`（2 張）。**這些都不是本人**，一律以精確鍵比對為準。

## 二、本批立的裁定

### 255（本批立）§5.6 合輯的 `year` 取**原始錄音／原始發行年**，不取合輯出版年

**規則衝突**：`CURATION-BRIEF-c93plus.md` 第一節寫「合輯年份取合輯首次出版年」，
但 `CURATION-BRIEF-c123plus.md` 硬規則 10 寫「年份取原盤年，復刻年寫進 `mbNote`（裁定 220）」，
而硬規則 1 又限死 **1970–1991** 年份窗口。

**三者不可能同時成立**：這條線的合輯出版年全在 1994–2020，照 c-93 的寫法每一張都會違反硬規則 1，
§5.6 就整個開不了——可硬規則 3 明寫「§5.6 是這批的主要入口之一」。

**裁定**：**c-123 以本批簡報的硬規則 10 為準**（較晚、較特定的規格覆蓋較早的通用規格），
§5.6 合輯的 `year` 取原始錄音／原始發行年，合輯出版年寫進 `mbNote`、`label` 與 `exceptionReason` 三處，
並在 `risk` 欄明寫「行文時兩個年份要分開講」。
**依判準 3（卡住整條線）當場定**：不定就沒有任何一張 §5.6 收得進來。

逐張套用結果：Ruja《Algus》→ 1971（合輯 2020）、Mess → 1975（合輯 1995）、
Grünberg《Hukkunud Alpinisti hotell》→ 1979（合輯 2001）、Pērkons《Dziesmu izlase #1》→ 1981（合輯 1994）。
**唯一例外是 Sīpoli《Sīpoli》**：它的 1987 既是合輯出版年也是唯一實體盤年，沒有落差。

### 256（本批立）Melodiya 分廠只能從盤面語言與 release country 推，不能從 MB `label` 欄讀

硬規則 4 要求 `label` 欄寫清楚是哪個分廠。**但 MB 的 label-info 一律只給「Мелодия」四個字，
沒有任何分廠欄位**——本批 45 張逐一回問 release 的 `inc=labels` 全部如此。

**裁定**：`label` 欄寫成
`Мелодия（Melodiya），全蘇目錄號 <cat-no>，<country> <year>；<語言>盤面，壓片走 <Tallinn／Rīga／Vilnius> 分廠`，
**分廠部分明說是依盤面語言與 release country 推得**，不謊稱是 MB 欄位值。
目錄號全部是全蘇統一的 `С60-…`／`С-…`／`Д …`／`СМ …` 系列，這點與硬規則 4 的描述一致：
**加盟共和國分廠只是壓片地，不是獨立廠牌。**

### 257（本批立）**本批 45 張裡有 7 張根本不是 Melodiya**——`label` 欄不得預設填 Melodiya

回問 release 的 `media.format` 與 `label-info` 之後發現的實情，**這是本批最有價值的一組事實**：

| 卡 | MB release 實情 |
|---|---|
| Dzeltenie pastnieki《Bolderājas dzelzceļš》(1981) | **label-info 空、media = Reel-to-reel 10 軌**（自製盤帶／magnitizdat） |
| Dzeltenie pastnieki《Man ļoti patīk jaunais vilnis》(1982) | **label-info 空、media = Reel-to-reel 8 軌** |
| Antis《Kažkas atsitiko》(1986) | **label-info 空、media 形態欄亦空**（17 軌） |
| Antis《Ša!》(1988) | **label-info 空、media 形態欄亦空**（12 軌） |
| Foje《Geltoni krantai》(1989) | **label-info 空、media = Cassette 9 軌** |
| Foje《Žodžiai į tylą》(1990) | **label-info 空**（9 軌）、release country 已是 **LT** |
| Ultima Thule《Eesti asi / Pro Estonia》(1991) | **Megamania／MGM2026、FI 壓片**，完全不經蘇聯系統 |

另 Pērkons《Septiņarpus dziesmas…》(1987) 與 Kernagis《Dainos teatras - Žvilgsnis nuo kalno》(1985)
的 MB release 也沒有目錄號，前者 label-info 全空、後者只掛藝人基金會（後設建檔方，非 1985 年發行方）。

**裁定**：這九張的 `label` 欄一律照實寫「MB label-info 為空／media 為 X」，
並在 `risk` 欄加一句「**label 欄不可填 Melodiya**」給下游。
**立陶宛五個掛名裡只有 Katedra 一張確定有 Melodiya 廠牌與目錄號**（С60 30149 009）。

### 258（本批立）掛名帶斜線的合掛名不進池——Menuets 一案

Menuets《Dzeguzes balss》(1979) 的 MB artist-credit 是 **`Imants Kalniņš / Menuets`**（作曲家／演出樂團）。
依第 20／6 條本該照 artist-credit 字串取，但：

1. 帶斜線的掛名進卡池後在卡面與外部比對上都會出問題；
2. Imants Kalniņš 本批已有自己的一卡（《4. simfonija》），用合掛名會把同一位作曲家拆成兩個掛名——
   正是 `audits/pool-artist-name-splits.md` 在防的形狀。

**裁定**：取 **`Menuets`**，並在 `risk` 與 `mbNote` 兩處明寫 artist-credit 原字串與偏離理由，
`queryAlias` 填滿三種寫法。**依判準 2（可逆：改的是卡單的 `artist` 值，不是卡池結構）直接定。**

**反向的一案作為對照**：Opus《Pēc likuma》(1988) 的 artist-credit 是 `Zigmars Liepiņš & Opus`，
**這個合掛名反而該用**——它把「Opus」這個回上百個同名實體的短掛名一次解掉（見第四節），
而且 Zigmars Liepiņš 本批沒有其他卡，不會拆掛名。**判準是「合掛名是解歧義還是製造分裂」，不是形式。**

### 259（本批立）盤名取拉丁形——雙語 RG 標題的處理

Melodiya 的加盟共和國盤常見「原文 = 俄文」的雙語 RG 標題。本批三例：

| RG 標題 | 卡片取 | 依據 |
|---|---|---|
| `Музыка во Вселенной = Music in the Universe` | **Music in the Universe** | 同 RG 底下 2021 RU 再發 release 的 title 就是純拉丁形（第 45 條） |
| `Discophonia = Дискофония` | **Discophonia** | 同 RG 底下另一筆 1981 原壓與 2004 RU 再發 title 皆為純拉丁形（第 45 條） |
| `Сольные импровизации / Solo Improvisations` | **不收** | 該 RG 底下沒有任何純拉丁 title 的 release，硬取會變成自創盤名 |

**裁定**：只有當**同 RG 底下實際存在一筆純拉丁 title 的 Official release** 時才取拉丁形；
沒有的就整張不收，不自創。全西里爾盤名（Ruja《Пусть будет все》、Apelsin《Апельсин》、
Jaak Joala《Сама любовь》、Argo《Свет》）一律不收，寫進刻意不釘。

### 260（本批立）盤名相同的同掛名 LP，一組只收一張

Melodiya 的加盟共和國盤大量重複使用同一個盤名，`chk-prop` 的摺鍵會直接判成跨組重複：

| 掛名 | 同名 LP | 本批取 |
|---|---|---|
| Vitamiin | 《Vitamiin》1984、1987 ＋《Ansambel "Vitamiin"》1983 | 只取 1983（盤名可辨的那張） |
| Apelsin | 《Apelsin》1978、1981、1988 | 只取 1978 首發 |
| In Spe | 《In Spe》1983、1985、2019 | 1983 取原名；**1985 取其 1994 法國 Musea 再發名《Typewriter Concerto in D》**（第 45 條），兩張摺鍵因此不撞 |
| Imants Kalniņš | 《4. simfonija》1974、1998、2009 | 只取 1974 原盤 |
| Rondo（LT） | 1988 年兩個 RG 都叫《Rondo》 | **整組不收**（見第六節未收清單） |

## 三、裁定 227 的實例（`secondary-types` 空 ≠ 原盤）

本批回問 release 的 `media.format` 之後抓到兩張：

1. **Līvi《Aprīļa pilieni》(1985)**：MB `primary-type=Album`、`secondary-types` 空，
   看起來就是原盤 LP；回問 release `cb3c35b6…` 後發現 **media 是 `7" Vinyl`、4 軌**——那是一張 7 吋小碟。
   **本批改取 1986 年的《Iedomu pilsēta》**（`12" Vinyl` 9 軌），把《Aprīļa pilieni》寫進刻意不釘。
2. **Pērkons《Koncerts》(1988)**：`secondary-types` 空，但盤名就是「演唱會」、media 為 CD 18 軌，
   形態上是現場輯。依裁定 253 現場錄音**可收**，但本批名額已滿且 MB 未標 `Live`，
   為避免下游誤當原盤處理，**本批不收**，理由寫進刻意不釘。

**給下一批的一句話**：`secondary-types` 空只代表「MB 沒標」，
**要判形態一定要回問 release 的 `media.format` 與軌數**，這一步在波羅的海這條線上抓到率是 2/45。

反方向也記一筆：**Rein Rannap《Improvisatsioonid》(1982) 是 `12" Vinyl` 但只有 2 軌**
（各佔一面的長篇即興）——**軌數不是識別鍵**（第 174 條的反面情形），
不能因為軌數少就判成單曲。

## 四、短掛名回問實測（裁定 179／250）

**score 排序在這條線上完全不可用，實測數字如下**（每次查 `limit=15`）：

| 掛名 | 目標名次 | 目標 score | 第 1 名是誰 | 擋下的同名實體 |
|---|---:|---:|---|---:|
| **Opus**（LV） | **第 5** | **84** | 奧地利 Opus〈Live Is Life〉(100) | **14** |
| **Collage**（EE） | **第 4** | 95 | 義大利 70s 流行團 (100) | **14** |
| **Mess**（EE） | 第 2 | 94 | 義大利 Mess Mess Mess (100) | **14** |
| **Ultima Thule**（EE） | 第 2 | 96 | **瑞典 Viking Rock 團 (100)**——政治聯想完全不同，絕不可混 | **14** |
| **Radar**（EE） | 第 2 | 98 | 法國 Radar (100) | **14** |
| **Propeller**（EE） | 第 2 | 95 | 加拿大工業噪音製作人 Mark Spybey (100) | 14 |
| **Credo**（LV） | 第 1 | 100 | ——（但清單裡有**兩個愛沙尼亞 Credo**，score 各 91） | **14** |
| **Fix**（EE） | 第 1 | 100 | ——（但第 2–15 名含 2 筆**連 disambiguation 都沒填**的 Fix） | **14** |
| **Antis**／**Bix**／**Argo**（LT） | 第 1 | 97–100 | ——（MB 端噪音小） | 各 1–2 |
| **In Spe**（EE） | 第 1 | 100 | ——（但第 2–15 名是 Alice in Chains、Phish、INXS 等純噪音） | 14 |

**共擋下同名實體約 150 個**，全部靠 `disambiguation` ＋ `country` ＋ `life-span.begin` 三項交叉，
**沒有一次是靠 score**。

**寫進 `risk` 欄的兩筆「不得背書本名」**：
- **Fix**：MB 清單第 9 筆「Fix（aka Dan Fix）」與第 12 筆「FIX（engineer）」**沒有 disambiguation 也沒有國別**。
- **Līvi**：第 2 筆「Līvi（electronic pop singer）」**disambiguation 只寫曲風，無國別無年份**。

**兩個 MB 端安全但外部端危險的掛名**，也寫進 `risk`：
`Bix`（Discogs／Apple 會撞到 Bix Beiderbecke 的大量條目）、
`Argo`（常見詞：船名、品牌、電影名）。**MB 清單乾淨不等於外部比對安全。**

## 五、§5.6 合輯逐張舉證（5 張）

| # | 卡 | `year` | 合輯出版 | 為什麼合輯是唯一形態 | 證據 URL |
|---|---|---:|---:|---|---:|
| 1 | Ruja《Algus (Studio 1971-1975)》 | 1971 | 2020 | Ruja 前五年沒有任何 LP，第一張 LP 遲至 1982；1971–75 只有愛沙尼亞廣播母帶 | MB RG ＋ Apple ee/1525889897 |
| 2 | Mess《Sven Grünberg's Proge-Rock Group Mess》 | 1975 | 1995 | Mess 在蘇維埃時期只出過 1980 年一張 EP，1974–76 曲目到 1995 年德國 Bella Musica 才成套面世 | MB RG ＋ Apple ee/287441442 |
| 3 | Sven Grünberg《Hukkunud Alpinisti hotell》 | 1979 | 2001 | 1979 年電影配樂，Melodiya 從未發成唱片，2001 年 hyper.records 三片裝才出版 | MB RG ＋ MB release da4ff771 |
| 4 | Pērkons《Dziesmu izlase #1 (1981-1982)》 | 1981 | 1994 | 1981–82 曲目正是導致樂團被禁演的那一批，當年無從發行 | MB RG ＋ Apple lv/930979653 |
| 5 | Sīpoli《Sīpoli》 | 1987 | 1987 | 樂團演了十二年才拿到唯一一張唱片，MB 標 Compilation 但它同時就是原盤 | MB RG ＋ Apple lv/1625495459 |

**「同一批錄音的多種合輯只挑最權威的一種」逐案落實**：
- Ruja 2020 年同日出了 **9 種**切法（Algu 現場、Esimene、Kirjanduslik I／II、Pop RUJA、
  Rahvuslik Rokk、Hiline i／II、Teine），只取涵蓋起點且標明 Studio 的 **1 種**，其餘 8 個 MBID 全寫進刻意不釘。
- Pērkons《Dziesmu izlase》系列有 **#1／#2／#3** 三集，只取涵蓋被禁前那兩年的 **#1**。
- Kaseke 的 2000 年《Põletus / Sõnum》、Līvi 的 2006 年併輯、Credo 的 2004 年併輯、
  Zodiac 的 1995 年《Disco Alliance / Music in Universe》**全部不收**——它們的內容不是本批已收的卡就是超窗口。

**5 張全部不填 `genreException`**（§5.6 全曲風開放），`exceptionReason` 皆 ≥12 字、
`exceptionEvidenceUrls` 皆 2 個 HTTPS，`chk-prop` 通過。

## 六、未收清單（分類）

### A. MB 查無 → **可進 §1 補遺批**（3 個掛名）

| 掛名 | MB 情形 |
|---|---|
| **Turist**（EE） | 藝人實體存在（`e6378dc9…`，Group／EE／1983-11-01）但 **名下 0 個 RG** |
| **Modernaus Meno Ansamblis**（LT） | **MB 精確查詢無此實體**（最高分回的是拉脫維亞的 Ansamblis "Ansamblis"、score 95，不是本團） |
| **Gėlių Vaikai**（LT） | **MB 精確查詢 0 筆**（拉丁化 `Geliu Vaikai` 亦 0 筆） |

另 **Gunnar Graps Group**（`e895f275…`，disambiguation「formerly Magnetic Band」）名下也是 0 個 RG，
但同一批錄音以「Gunnar Graps ja Magnetic Band」掛名已收，不另記。

**簡報硬規則 5 說的「只有電台母帶留下、從未正式發行」在本批確實命中**：Turist 是最典型的一個。

### B. 年份窗口外 → 不在本批（2 個掛名整組落空）

- **Hiperbolė**（LT）：MB 名下 8 個 RG，**最早的是 1994 年的《Visų laikų topai》**，
  1974 年成立但蘇聯時期一張都沒建檔。整組出窗口。
- **Väikeste Lõõtspillide Ühing**（EE）：1989 年成立，MB 名下最早是 **1995** 年，整組出窗口。
- **Propeller**（EE）：MB 名下只有 **1995** 與 **2005** 兩個 RG，
  1980 年那場引發塔林學生騷動的著名演出**在 MB 上沒有任何 1970–1991 的建檔**。
  ⚠ 1995 年那張《Propeller》`secondary-types` 是空的，但依裁定 227 **不能當成原盤**——
  樂團 1980 年就解散了，1995 的碟必然是後製。**這位很值得下一批以 §1 或 §5.6 重查。**

### C. 形態不符 → 不收（見第三節）

- Līvi《Aprīļa pilieni》(1985)：7" Vinyl 4 軌。
- Pērkons《Koncerts》(1988)：現場輯形態，MB 未標 `Live`。
- **Rondo**（LT）：1988 年**兩個獨立 RG 的 title 都是「Rondo」**，MB 無法分辨是哪一張，整組不收。

### D. 名額不足 → **下一批直接可用**（已逐張寫進各卡的刻意不釘）

**愛沙尼亞**：Ruja《Kivi veereb》(1988)、Vitamiin《Vitamiin》(1984／1987)、
Apelsin《Illuusio》(1981，**芬蘭 Kansankulttuuri Oy KK-48，是另一張不經 Melodiya 的碟**)、
Apelsin《Apelsin》(1981／1988)、Fix《Fix 15》(1985)、Fix《Fix 20》(1989)、
Anne Veski《Sind aeda viia tõotan ma!》(1985)、Gunnar Grapsi Grupp《Põlemine》(1988)、
Rein Rannap《Сольные импровизации / Solo Improvisations》(1986，見裁定 259 不收)。

**拉脫維亞**：Dzeltenie pastnieki《Alise》(1984)／《Vienmēr klusi》(1985)／
《Depresīvā pilsēta》(1986)／《Naktis》(1987) —— **四張全在窗口內，是下一批最現成的一組**；
Credo《Baltais ceļš》(1986)、Jumprava《No tēvu zemes》(1985)、Līvi《Kurzemei - saules ceļš》(1988)、
Zodiac《Mākoņi》(1991)、Imants Kalniņš《5. simfonija》(1981)、Pērkons《Ballīte / A Hoedown》(1990)、
Raimonds Pauls《Teic, kur zeme tā》(1971，池中已有他 1975 年那張)。

**立陶宛**：Antis《Antis》(1987)、Foje《Gali skambėti keistai》(1991)、
Vytautas Kernagis《Dainos Teatras (Eik Savo Keliu...)》(1987)、Argo《Žemė L》(1986)。

### E. 與池中撞卡 → 不收（3 張，就是本批之前池中僅有的那 3 張）

Sven Grünberg《Hingus》(1981)、Zodiac《Disco Alliance》(1980)、
Raimonds Pauls《Melodija, improvizācija, ritms》(1975)。
**本批對這三位都補了旁邊的碟**：Grünberg 補《OM》(1988) 與《Hukkunud Alpinisti hotell》(1979)、
Zodiac 補《Music in the Universe》(1982) 與《In Memoriam》(1989)；
Raimonds Pauls 本批未補（他是體制內的官方作曲家，優先度低於地下線，理由記此）。

## 七、封面與試聽的預估（**只寫觀察，不下結論——裁定 254**）

### CAA（每張都探測，5xx 為 0，裁定 222 的重試未被觸發）

- **200：30 張／404：15 張**（總命中率 **66.7%**）。
- 圖數最多的兩張：In Spe《Typewriter Concerto in D》**8 張**、
  Sven Grünberg《Hukkunud Alpinisti hotell》**8 張**（兩者都是西歐再發，CAA 覆蓋明顯較好）。
- **404 的 15 張集中在純 Melodiya 蘇聯原壓且無西方再發的碟**：
  Vitamiin、Radar ×2、Rein Rannap、Gunnar Graps、Apelsin、Anne Veski、Jaak Joala、Fix、
  Tõnis Mägi、Ruja《Algus》、Mess、Pērkons《Veidenbauma》、Jumprava、Katedra。

### Apple 店面（`ee`／`lv`／`lt`／`ru`／`de`／`fi`／`us`／`gb` 八個都跑，`search` 與藝人目錄兩種查法）

**八店面全命中（同一個 collectionId）的 8 張**：
Ruja《Algus》(1525889897)、Mess 合輯 (287441442)、Sven Grünberg《OM》(1708597817)、
Pērkons《Dziesmu izlase #1》(930979653)、Zigmars Liepiņš & Opus《Pēc likuma》(1616105112)、
Jumprava《Pilsēta》(1626922379)、Antis ×2 (1760384569／1760384937)、
Vytautas Kernagis《Žvilgsnis nuo kalno》(1395600642)、Argo《Discophonia》(1499993113)。

**部分店面命中的 4 張**：Collage《Kadriko》/《Käokiri》(ru／de／fi／gb 四店面，
**ee／lv／lt／us 反而是 0**——愛沙尼亞盤在愛沙尼亞店面查不到，這個形狀值得研究層追)、
Zodiac ×2、Sīpoli、Menuets（七店面）、Uno Naissoo（六店面）。

**`search` 與藝人目錄兩種查法都未命中的其餘各張**，`risk` 欄一律照實寫
「`search` 與藝人目錄兩種查法未命中」，**未寫「未上架」「無來源狀態」「要掃圖」**（裁定 254）。
研究層跑第三種查法（直查候選 `collectionId`）之前，不下結論。

**配對必須放寬的四種形狀**（已逐張寫進 `risk`）：
1. **跨書寫系統**：Sven Grünberg《OM》Apple 盤名是西里爾《Свен Грюнберг: ОМ》、
   Zodiac《Music in the Universe》Apple 盤名是《Музыка во Вселенной》。
2. **掛名去變音**：Apple 寫 `Perkons`／`Sipoli`／`Zigmars Liepins`，MB 寫 `Pērkons`／`Sīpoli`／`Zigmars Liepiņš`。
3. **併輯而非單張**：Līvi (869564186 是《Iedomu pilsēta un Aprīļa pilieni》)、
   Credo (958785064 是《Melnais Kliedziens Un Austrumu Motīvi》)——**都不是本卡的單獨條目**。
4. **Apple 年份 = 再發年**：Antis ×2 標 2003、Pērkons《Dziesmu izlase》標 1994、
   Argo《Discophonia》標 **1980**（比 MB 少一年）。**一律以 MB 與盤面目錄號為準，不要拿 Apple 年份覆蓋。**

另 Uno Naissoo 的 Apple 條目 (1827198874) **掛名寫成「Various Artists」、盤名多前綴、年份寫 1977**——
掛名、盤名、年份三項全部與 MB 不一致，研究層要人工核對曲目。

## 八、這條線還有哪些值得下一批做的

1. **Dzeltenie pastnieki 的其餘四張**（1984／1985／1986／1987，全在窗口內、全是盤帶或 Melodiya 盤）——
   **這是整條線最現成、最符合「獨裁體制下的音樂」題旨的一組**，一個掛名就能補滿五張。
2. **Propeller**（EE）：1980 年塔林那場演出是波羅的海地下音樂史上最常被引用的事件，
   但 MB 上 1970–1991 完全空白。**應以 §1 人工身分或 §5.6 復刻合輯重查**（Frotee 與愛沙尼亞公共廣播的目錄是線索）。
3. **Turist / Modernaus Meno Ansamblis / Gėlių Vaikai**：MB 查無，是 §1 補遺批的現成三筆。
4. **愛沙尼亞的俄語盤面線**：本批因裁定 259 一律不收全西里爾盤名
   （Ruja《Пусть будет все》、Apelsin《Апельсин》、Jaak Joala《Сама любовь》、Argo《Свет》），
   但**這批碟正是「加盟共和國樂團被推向全蘇市場」的直接證據**，
   若之後決定收西里爾盤名（或建立轉寫規則），這裡有現成的一批。
5. **本批未碰的第四塊：蘇聯時期的芬蘭—愛沙尼亞跨海通路**。
   本批已抓到兩張不經蘇聯系統的碟（Apelsin《Illuusio》1981 芬蘭 Kansankulttuuri、
   Ultima Thule《Eesti asi》1991 芬蘭 Megamania），**這條通路顯然不只兩張**。
6. **簡報第二節點名、這輪沒開的**：波蘭戒嚴（17/20，池中 4）、
   捷克斯洛伐克（14/20，池中 10）、匈牙利與羅馬尼亞（15/20，池中 9）——
   **波蘭與捷克斯洛伐克的形狀與本批幾乎相同**（國營廠 Polskie Nagrania／Supraphon ＋ 卡帶地下流通），
   本批這七條裁定（255–260 ＋ 227 的實例）可以直接沿用。

## 九、與既有批的實掃對照

`chk-prop` 串跑 `dedup-crossbatch.mjs`：**掃 76 個批次（其中 4–5 批讀 `prop`）、共 3,410 張待上架卡，跨批撞卡 0。**
與 c-53（蘇聯俄語圈搖滾）**沒有任何一張重疊**——c-53 收的是俄語圈，
本批 45 張全部是愛沙尼亞語／拉脫維亞語／立陶宛語掛名或盤名，兩批互補而不撞。
池中原有的 3 張（Grünberg／Zodiac／Raimonds Pauls）也都是 c-53 那批上的，本批全部避開。
