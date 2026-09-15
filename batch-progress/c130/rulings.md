
# c-130 波蘭：a 組（人民共和國的搖滾與 sung poetry）策展層裁定

批次規格見 `batch-progress/CURATION-BRIEF-c128-c130.md` 第〇、三節，
欄位規格轉引 `CURATION-BRIEF-c127.md` → `c126.md` → `c103plus.md` → `c93plus.md` 第一節。
**編號自 310 起（b 組同時在寫，本段一律 append，未改動既有內容）。**

## 〇、a 組交件數字

| 項目 | 數 |
|---|---:|
| `prop-a.json` | **23 張、13 位**，年份 **1966–1984** |
| `node batch-progress/c130/chk-prop.mjs a` | 本組 0 標記（欄位、曲風、年份、連字號、例外欄位、與線上池撞卡、跨組重複全部 0） |
| 跨批去重 | **80 批（4 批讀 prop）、3,574 張、跨批撞卡 0** |
| §5.6 合輯 | **0 張**（本組全部 `primary-type=Album`；1 張 `secondary-types` 含 `Live`，依第 253 條照一般 Album 寫） |
| CAA release-group 探測 | **200：22 張／404：1 張**（5xx 0） |
| Apple 波蘭店面 | 兩種查法命中 **20／23**；未命中 3 張（見第七節） |

## 310（本批立）簡報的「波蘭 10/10 零命中」只涵蓋搖滾／龐克那一側——**池中其實已有 6 張波蘭卡**

簡報第三節寫「主線 2026-09-14 實掃：搖滾與龐克那一側 10/10 零命中」，那 10 個掛名
（Maanam、Republika、Budka Suflera、Perfect、Kult、Dezerter、Brygada Kryzys、Siekiera、
Aya RL、Klaus Mitffoch）**本組複掃確認全部為零，簡報沒有錯**。

**但「波蘭這條線池中是空的」會是錯的推論。** 本組以 `batch-progress/lib.mjs` 的 `loadPool()`
掃 `seed_cards.json` 全 **16,450** 列 ＋ 全部 `onboarding-manifest-*.json` ＋ `c47/cand-all.json`
（合計 **24,138** 列），每個掛名用**原文與去變音兩種寫法**各掃一次子字串雙向比對，結果：

| 池中已有 | 來源 |
|---|---|
| Czesław Niemen《Dziwny jest ten świat》1967、《Enigmatic》1970 | c-56（`onboarding-manifest-c56-20260903.json`） |
| SBB《Nowy horyzont》1975 | c-56 |
| Breakout《Blues》1971 | c-56 |
| Marek Grechuta《Korowód》1971 | c-56 |
| Ewa Demarczyk《Ewa Demarczyk śpiewa piosenki Zygmunta Koniecznego》1967 | c-56 |

**c-56 是「東歐集團搖滾」那一批**（同 manifest 還有 The Plastic People of the Universe、
Karel Kryl、Blue Effect、Omega、Locomotiv GT、Illés、Transsylvania Phoenix、Щурците 等 32 張），
**波蘭只佔 6 張**。另池中的波蘭爵士／古典側（簡報說「不要重做」的那一塊）實掃為：
Krzysztof Komeda **6 張**＋Komeda Quintet 1 張、Tomasz Stańko **13 張**＋Tomasz Stańko Quintet 1 張、
Zbigniew Namysłowski 1 張、**Zbigniew Seifert 3 張**、**Zbigniew Preisner 3 張**、
**Krzysztof Penderecki 1 張**——**Seifert／Preisner/Penderecki 三位簡報沒點名，下一批要避開**。

**所以這批的形狀不是「場景全空」，是「搖滾側全空、sung poetry 側只有兩位各一張」。**
本組 23 張裡有 **6 張**是替池中已有的四位補目錄（Niemen 3、SBB 2、Grechuta 1、Demarczyk 1，
Breakout 1 ＝ 合計 8 張為目錄深度），其餘 15 張是池中全零的七支團。

## 311（本批立）合掛名 artist-credit 一律取池中原字串——沿用 c-123 第 258 條的判準

本組兩例，方向一致：

| RG | MB artist-credit | 卡單取 | 理由 |
|---|---|---|---|
| 《Sukces》1968 | **Niemen & Akwarele** | `Czesław Niemen` | 池中已有 Czesław Niemen 2 張，用合掛名會把同一人拆成兩個掛名 |
| 《Marek Grechuta & Anawa》1970（**本批未收**，寫進刻意不釘） | Marek Grechuta & Anawa | 日後取 `Marek Grechuta` | 同上，池中已有 Marek Grechuta 1 張 |

**判準沿用 c-123 第 258 條：合掛名是解歧義還是製造分裂。** 這兩例都是製造分裂，所以不取。
Apple 波蘭店面兩張都寫合掛名（「Czesław Niemen & Akwarele」、「Marek Grechuta & Anawa」），
**研究層不可拿 artist-credit 或 Apple 掛名直接覆蓋卡單，也不可回頭改池中那幾張。**
依判準 1（有先例）＋判準 2（可逆：改的是卡單 `artist` 值，不是卡池結構）當場定。

## 312（本批立）⚠ **「波蘭一切經國營廠牌」這個前提被實測推翻——23 張裡只有 9 張是 Muza**

簡報第三節寫「國營 Polskie Nagrania „Muza” 壟斷，另有 Tonpress、Pronit、Wifon、Polton、
Klub Płytowy Razem」，並提醒「c-123 實測推翻過一切經國營廠牌這個前提，逐張打 `release` 端點」。
**本組逐張打了，結果比提醒還極端**：

| 原壓廠牌 | 張數 | 卡 |
|---|---:|---|
| **Polskie Nagrania „Muza”** | **9** | Niemen ×3、SBB《Pamięć》《Ze słowem biegnę do ciebie》、Budka《Cień wielkiej góry》、Perfect《Perfect》、Skaldowie ×2 |
| **Pronit** | **4** | Breakout《Na drugim brzegu tęczy》1969、Czerwone Gitary《To właśnie my》1966、Klenczon 1971、Grechuta《Magia obłoków》1974 |
| **Tonpress** | **3** | Budka《Za ostatni grosz》1982、Perfect《Unu》1982、Lady Pank《Lady Pank》1983 |
| **Wifon** | **3** | SBB《Welcome》1979、Maanam《Maanam》1980、Demarczyk《Live》1982 |
| **Polton** | **2**（＋1 為卡帶盤的黑膠版） | Republika《Nowe sytuacje》1982（LPP-003）、Republika《Nieustanne Tango》1984（LPP-012）；另 Maanam《Nocny patrol》1984-04 的黑膠是 LPP-007（該卡原壓計入 Jako） |
| **Jako**（卡帶） | **1** | Maanam《Nocny patrol》1983 首發（Jk-025） |
| **Savitor** | **1** | Lady Pank《Ohyda》1984（SVT-011）——**不在簡報列的六家之內，是實測挖出來的第七家** |

**幾個可以直接給下游用的事實**：

1. **Muza 只佔 9/23（39%）。** 「波蘭＝Muza」這個預設會讓超過六成的卡片廠牌欄寫錯。
   這是 c-123 第 257 條的波蘭版，**而且比例比波羅的海那批更懸殊**。
2. **Polton 的編號連號落在 LPP-003／007／012**（Republika 首張、Maanam《Nocny patrol》、
   Republika 第二張），**三張都在 1982–1984 的戒嚴年代** —— 這是本批最具體的一組物證。
3. **Pronit 集中在 1966–1974**、**Tonpress 與 Polton 集中在 1982–1984**、
   **Wifon 橫跨 1979–1982**，是可以看出年代分層的。
4. **同一支團相隔一年就換廠牌**：Perfect 1981 Muza → 1982 Tonpress、
   Lady Pank 1983 Tonpress → 1984 Savitor、Budka Suflera 1975 Muza → 1982 Tonpress。
   **廠牌是「這一張」的屬性，不是「這一位」的屬性。**
5. **本批抓到兩筆不經波蘭系統的碟**（皆未收、寫進刻意不釘，留給下一批）：
   **SBB《Follow My Dream》1978 是西德 Spiegelei 160.611 原壓**（`0c170b6f-1a34-330d-a03d-a0960512b875`）；
   **Marek Grechuta & Anawa 那個 RG 底下有一筆 1974 年的 Supraphon 113 1379**——
   **捷克斯洛伐克國營廠發的波蘭藝人盤**，是跨社會主義國家通路的直接證據。
   另 **Republika《1984》(`665284ba-5a59-3e24-97b2-f98c7bf63a7a`) 的 1984-01 release 的 country 是 GB、
   label-info 整個欄位為空**——形態同樣特殊。
6. **`release-group` 端點一筆廠牌都問不到**（第 259 條），以上全部是
   `release?release-group=<id>&fmt=json&inc=media+labels&limit=100` 逐張回問得到的。

**給主線**：**Savitor 這家不在既有清單上**，catno `SVT-011`、無 barcode、PL 1984、12" Vinyl 10 軌。
本批不是台灣獨立線、**沒有獨立閘**，所以本卡不因廠牌不明而退；但廠牌屬性（國營／私營／合作社）
**不得從編號形式推**，已照 c-127 第二節的做法把名稱、catno 與旁證寫進該卡 `risk`。

## 313（本批立）artist-credit 與 RG 標題**完全相同**時，取較短的構成掛名當 `artist`

Krzysztof Klenczon 的 `cc1117b7-798e-3d3f-ac67-30dc1cf5defa`：
**RG title 與 artist-credit 都是「Krzysztof Klenczon i Trzy Korony」**。
照第 20／6 條直接取 artist-credit，卡片會退化成「掛名＝盤名」。

**裁定**：取 **`Krzysztof Klenczon`** 當 `artist`、盤名保留全稱 `Krzysztof Klenczon i Trzy Korony`、
`selfTitled` 判 **false**，artist-credit 原字串寫進 `mbNote` 與 `queryAlias`。

**與 c-123 第 258 條不衝突**：258 防的是「合掛名製造分裂」，本例池中 Klenczon 為零、不生分裂；
決定因素是**盤名與掛名的退化**，是第三種情形。依判準 2（可逆）當場定。

⚠ **附帶記一個外部比對的坑**：**Apple 的掛名用 `&`、MB 用波蘭文的 `i`**
（Apple `Krzysztof Klenczon & Trzy Korony` / MB `Krzysztof Klenczon i Trzy Korony`）。
`chk-prop` 與 `dedup-crossbatch` 只把 `&` 摺成 `and`，**摺不掉 `i`**，
所以這一組在工具端不會亮燈、但在外部配對時會整組落空。已寫進該卡 `risk`。

## 314（本批立）Maanam《Nocny patrol》的 `year` 取 **1983**——**首發是卡帶、不是黑膠**

MB first-release-date 是 **1983-11-19**，對應的 release 是 **Jako Jk-025 的 Cassette 10 軌**；
**黑膠版遲至 1984-04 才由 Polton LPP-007 發**。兩者相差近半年、跨年。

**裁定**：`year` 取 **1983**（＝ MB first-release-date ＝ 卡帶首發年），
1984 的黑膠年份與編號寫進 `label` 與 `mbNote`，並在 `risk` 明寫
「**行文時 1983 卡帶與 1984 黑膠兩個年份要分開講**」。
依簡報第三節第 5 點「`year` 取原盤年」——**原盤就是那卷卡帶**。
Apple 波蘭店面也標 1983（collectionId 693089637），與本裁定同向。

**通則給下一批**：**1980 年代的波蘭盤，卡帶可能早於黑膠。**
`release-group` 端點的 first-release-date 對得上卡帶那一筆時，
**不要以為 MB 記錯、也不要改取黑膠年**，要回 `release` 端點把 `media.format` 看清楚
（同 c-123 第三節：形態一定要回問 release）。

## 315（本批立）同名撞擊實測——**score 排序一次都沒用上**

`artist?query=artist:"<名>"&limit=25`，只看 `type`／`area`／`life-span.begin`／`disambiguation`：

| 掛名 | MB 回筆數 | 本團的定位依據 | 擋下的同名實體 |
|---|---:|---|---:|
| **Perfect** | **25（滿）** | area=**Poland**、begin=**1977**、dis「Polish rock band, popular in 80s」 | **24** |
| **Breakout** | **24** | area=**Poland**、begin=**1968**、dis「Polish blues band」 | **23** |
| Republika | 4 | area=Poland、begin=1979 | 3 |
| Maanam | 2 | begin=**1976**（另一筆 Ex Maanam begin=2018-12） | 1 |
| SBB／Budka Suflera／Lady Pank／Skaldowie／Czerwone Gitary／Klenczon／Grechuta／Demarczyk／Niemen | **各 1** | —— | 0 |

**合計擋下約 51 個同名實體，沒有一次是靠 score。**
`Perfect` 那 24 筆含美國 A Perfect Circle、牙買加雷鬼歌手 Perfect、Tommy Stinson 的美國 Perfect、
英國 indie pop 的 Perfect、比利時的 Perfect，以及**兩筆連 disambiguation 都沒填的 Perfect**
（`a04b4e90…`「dancer of Benny B. band」只有職稱、`c6f30b91…`「on Flowerpot Records」只有廠牌，
**都無國別無年份**）——依 c-53 第 250 條 **這兩筆研究層不得背書本名**，已寫進該卡 `risk`。
`Breakout` 那 23 筆裡有一筆 **`Old Breakout`（Poland／2013／blues rock）**，
**同國同曲風的干擾項**，只能靠 begin 年份分開。

**兩個「MB 端安全但外部端危險」的掛名**（已寫進 `risk`）：
- **`Republika`**：MB 只回 4 筆，但 `Republika`／`Republic` 在 Apple 與 Discogs 是極常見詞。
- **`Lady Pank`**：MB 只回 1 筆，但 **`Pank` 是 `Punk` 的波蘭化拼寫，外部搜尋會被自動更正成 `Lady Punk`**。

## 316（本批立）實掃卡池的**波蘭專屬假陽性清單**——`Ka`、`-M-`、`Tar` 三個短掛名

沿用 c-123 第一節的形狀，本批實測命中的假陽性（**全部不是命中**）：

| 掃的掛名 | 摺到池中的 | 假陽性張數 |
|---|---|---:|
| `Budka Suflera`／`Republika`／`Skaldowie` | **`Ka`**（美國饒舌歌手，6 張） | 各 6 |
| `Maanam`／`Niemen`／`Grechuta`／`Demarczyk`／`Anna German`／`Piwnica pod Baranami` | **`-M-`**（法國藝人；摺鍵剝到只剩 `m`，4 筆 seed＋manifest） | 各 4 |
| `Czerwone Gitary` | **`Tar`**（《Jackson》1991，2 筆） | 2 |
| `Niebiesko-Czarni` | `O.C.`、`Ebi` | 6 |
| `Piwnica pod Baranami` | `P.O.D.` | 1 |
| `Perfect` | `A Perfect Circle`（《Mer de Noms》2000） | 1 |
| `German` | `German Oak`（**王牌卡 apex:pearl**） | 1 |

**`Lady Pank`、`Krzysztof Klenczon`、`Breakout`（整字串）三個是真正的 0 命中**，連假陽性都沒有。
**判「池中有無」一律看整個掛名字串**（第 255 條）。

## 317（本批立）未收清單（分類）

### A. MB 實體存在但**名下 0 個 release-group** → §1 補遺批候選

- **Niebiesko-Czarni**（`997568d6-314f-45a2-9b75-efc0a0fbc168`，Group／Poland／1962）：
  `artist:"Niebiesko-Czarni"` 精確回 1 筆、身分明確，但 **`release-group?artist=<id>&limit=100` 回 0 筆**。
  **這支團是波蘭 1960 年代 big-beat 的起點之一，MB 完全沒建檔**——與 c-123 的 Turist 是同一個形狀。

### B. MB 目錄**整個落在窗口外或無可辨識的原盤** → 本批收不進來

- **Anna German**（`579ef111-19dd-4ae8-ad50-d5fa435472b9`）：名下 **21 個 RG、19 個 Album**，
  但**扣掉無日期的 3 筆之後，最早的一筆是 1989 年的《Эхо любви》(Live)**，
  其餘全是 1991–2019 年的俄語精選集，**盤名多為全西里爾**（依 c-123 第 259 條不收）。
  她 1970 年代在 Muza 發的波蘭語 LP（`Człowieczy los`／`Tańczące Eurydyki` 那一批）**MB 上沒有建檔**。
  **是本批最可惜的一位，建議走 §1 或 §5.6 重查。**
- **Piwnica pod Baranami**（`af8f3861-c126-4870-89f4-d37563aae93b`，Group／Poland／**1956**）：
  名下只有 **6 個 RG，最早的是 1996 年**（《Koncert 40-lecia…》Live）。
  **這個卡巴萊在人民共和國時期活動了三十多年，MB 上一張窗口內的碟都沒有。**

### C. 名額不足 → **下一批直接可用**（已逐張寫進各卡的刻意不釘）

| 掛名 | 窗口內未收的 RG |
|---|---|
| **Czesław Niemen** | 《Czy mnie jeszcze pamiętasz?》1969（Muza XL 0516）、《Marionetki》1972、《Aerolit》1974、《Idée Fixe》1978、《Postscriptum》1980 |
| **SBB** | 《SBB》1974（Live，第 253 條可收）、**《Follow My Dream》1978（西德 Spiegelei 原壓）**、《Memento z banalnym tryptykiem》1981 |
| **Breakout** | 《70A》1970、《Mira》1971、《Ogień》1973、《Karate》1972、《Kamienie》1974 —— **五張全是 Muza 原壓，一個掛名就能補滿五張** |
| **Budka Suflera** | 《Przechodniem byłem między wami》1976、《Na brzegu światła》1979、《Ona przyszła prosto z chmur》1980、《Czas czekania, czas olśnienia》1984、《Giganci tańczą》1986、《Ratujmy co się da!!》1988 |
| **Perfect** | 《Live》1983（Live） |
| **Maanam** | 《O!》1982（**1982 那筆 release 的 label-info 與形態欄皆空**）、《Mental Cut》1984、《Wet Cat》1985、《Sie ściemnia》1989 |
| **Republika** | **《1984》1984-01（country GB、label-info 空）** |
| **Lady Pank** | 《Drop Everything》1985（英語版國際盤）、《LP3》1986、《Tacy sami》1989 |
| **Skaldowie** | 《Wszystko mi mówi, że mnie ktoś pokochał》1968、《Od wschodu do zachodu słońca》1970（**唯一的 release label-info 與形態欄皆空**）、《Ty》1971、《Wszystkim zakochanym》1973、《Stworzenia świata część druga》1976 |
| **Czerwone Gitary** | 《Spokój serca》1971、《Warszawa》1971、《Rytm Ziemi》1974、《Dzień jeden w roku》1976 —— 全 Muza 原壓 |
| **Marek Grechuta** | **《Marek Grechuta & Anawa》1970（底下有 1974 年 Supraphon 盤）**、《Droga za widnokres》1972、《Szalona lokomotywa》1977、《Śpiewające obrazy》1981、《Krajobraz pełen nadziei》1988 |

### D. 形態或盤名不符 → 不收

- **Skaldowie《Skaldowie》1967**、**SBB 1978 年兩個同名《SBB》＋1974 Live《SBB》＋2012《SBB》**、
  **Lady Pank 的三個《The Best of Lady Pank》(1990／1992／1997)** ——
  依 c-123 第 260 條「同掛名同盤名一組只收一張／整組不收」。
- **Czerwone Gitary《Czerwone Gitary (2)》1967 與《(3)》1968**：MB title 帶括號序號，
  掛名與盤名幾乎相同、摺鍵易撞，**本批不取；下一批要先決定盤名怎麼寫**。
- **Skaldowie《Скальды》1975**、**Ewa Demarczyk《Эва Дэмарчик》1975**：
  全西里爾盤名且該 RG 底下無任何純拉丁 title 的 release，依 c-123 第 259 條不收、**不自創拉丁盤名**。
- **Lady Pank《O dwóch takich, co ukradli księżyc》1986**：`secondary-types` 含 **Soundtrack**，依規格不收。
- **Republika《Demo 81 Studio Toruń》1981**：`secondary-types` 含 **Demo**。
- **Czesław Niemen《Przeprowadzka》1982**：`secondary-types` 含 **Soundtrack**。
- **Czerwone Gitary 名下三筆 2008 年 RU 的 Dogtoire Records CD**：`status` 是 **Bootleg**，
  其中一筆的 label-info 還誤掛成 Muza——**舉證與配對一律不可採**。

## 318（本批立）封面與試聽的觀察（**只寫觀察，不下結論——裁定 254**）

### CAA（逐張探測 release-group 端點，5xx 為 0）

**200：22 張／404：1 張，命中率 95.7%**——**遠高於 c-123 波羅的海那批的 66.7%**。
圖數最多的兩張：Czesław Niemen《Niemen》**7 張**、Czerwone Gitary《To właśnie my》**4 張**。
**唯一的 404 是 Ewa Demarczyk《Live》(1982)**。

### Apple（店面 `pl` 為主、`us` 為對照，`search` 與藝人目錄兩種查法）

**命中 20／23。** 三張兩種查法皆未命中：

1. **Marek Grechuta《Magia obłoków》**：藝人目錄回 17 筆（含《Korowód》《Droga Za Widnokres》），**就是沒有這張**。
2. **Ewa Demarczyk《Live》**：藝人目錄回 5 筆，**全部是別人翻唱／致敬她的碟**
   （Justyna Steczkowska、Lora Szafran、Patrycja Ziniewicz、Fanatic），**她本人的錄音一張都沒有**。
3. （Perfect《Perfect》雖有 collectionId，但**軌數與年份都對應再發版**，見下）

**配對必須放寬的五種形狀**（已逐張寫進 `risk`）：

| 形狀 | 實例 |
|---|---|
| **Apple 去變音** | `Na Drugim Brzegu Teczy`（MB `tęczy`）——**這一張 Apple 直接把 ę 寫成 e** |
| **Apple 加字首大寫** | `Cień Wielkiej Góry`／`To Właśnie My`／`Cała Jesteś W Skowronkach`／`Nowe Sytuacje`／`Nocny Patrol` |
| **Apple 加 (Remastered) 後綴** | Maanam 兩張 |
| **Apple 年份與軌數各自對應不同版本** | **Lady Pank《Ohyda》標 1984 但 20 軌（20 軌是 2007 MTJ 版）**、Perfect《Perfect》標 2015 且 12 軌（12 軌是 2013 Polskie Radio 版）、Republika《Nowe sytuacje》標 1983 且 13 軌（13 軌是 2001 數位版）、SBB《Pamięć》標 1975（早 MB 一年）、Niemen《Niemen》標 1970（早 MB 一年） |
| **掛名連接詞不同** | Klenczon：Apple `&` / MB `i`（見裁定 313） |

**三張年份與軌數全部對得上的**（本批最乾淨）：Republika《Nieustanne Tango》(905423796)、
Skaldowie《Krywań, Krywań》(1474254762)、Lady Pank《Lady Pank》(1484081246)。

⚠ **`℗` 行的陷阱**：Apple 波蘭店面大量卡片的版權行寫
「The Copyright in this sound recording is owned by **Polskie Nagrania, A Warner Music Group Company**」——
**那是 1991 年之後的權利歸屬，不是 1960–80 年代的發行方**。
SBB《Welcome》的 ℗ 行寫 **GAD Records**（2019 年再發方），原壓是 Wifon。
**行文一律不可把 Warner 或 GAD 寫成這些碟的廠牌。**

## 319（本批立）波蘭文變音字母在工具端**一個都摺不掉**——已逐張自守

`chk-prop` 的摺鍵是 `toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'')`（**沒有 NFKD 去重音**），
`lib.mjs` 的 `key()` 雖有 NFKD 但**摺不掉 `ł`**（`ł` 不是帶組合記號的字元，NFKD 不會拆）。
本批 23 張裡有 **13 張**的掛名或盤名含 ą ć ę ł ń ó ś ź ż：
`Czesław`、`Pamięć`、`Ze słowem biegnę do ciebie`、`Na drugim brzegu tęczy`、`Cień wielkiej góry`、
`Cała jesteś w skowronkach`、`Krywań, Krywań`、`To właśnie my`、`Magia obłoków`。

**逐張確認未省略，並在每張的 `queryAlias` 同時放原文與去變音兩種寫法**，
讓下游的字串比對兩邊都掛得到。**工具不會幫忙抓，這條只能靠人守。**

## 320（本批立）⚠ `chk-prop` 因**別批未完成的 prop 檔**而無法收尾——不是本組的問題

`node batch-progress/c130/chk-prop.mjs a` 的本組檢查全部通過（0 標記），
但結尾串跑的 `dedup-crossbatch.mjs` 在 **`batch-progress/c129/prop-b.json` 的第 0／1／2 列是 `null`** 時
以 `TypeError: Cannot read properties of null (reading 'artist')` 中止（該檔為 c-129 b 組**寫作中**的檔案）。

**本組未改動任何別批的檔案。** 改以 `dedup-crossbatch.mjs` 的副本（加一行 `if (!c) continue;`，
放在 scratchpad、**未寫進 repo**）覆跑，結果：**80 批（4 批讀 prop）、3,574 張、跨批撞卡 0**。

**給主線的建議（不自行修改共用腳本）**：`dedup-crossbatch.mjs` 第 61 行前加一行
`if (!c || typeof c !== 'object') continue;`，**否則只要有任何一組正在寫 prop 檔，
所有並行批次的 `chk-prop` 都會一起紅**——這是四支代理併行時必然會踩的競態。

**收尾補記**：c-129 b 組的 `prop-b.json` 寫完之後（8 張、0 個 null），
`node batch-progress/c130/chk-prop.mjs a` 重跑通過：
**23 張、13 位｜80 批（4 批讀 prop）、卡數 3,587、跨批撞卡 0｜標記 0。**
本組另做三項自檢：(1) 每張 `mbNote` 的**第一個 UUID** 與釘的 release-group 逐一比對，**23/23 相符**；
(2) 十五個欄位的**名稱與順序**與 `batch-progress/c127/prop-a.json` 逐欄對齊，**23/23 相同**；
(3) 九個含變音的原文字串（`Czesław`／`Pamięć`／`Ze słowem biegnę do ciebie`／`Na drugim brzegu tęczy`／
`Cień wielkiej góry`／`Cała jesteś w skowronkach`／`Krywań, Krywań`／`To właśnie my`／`Magia obłoków`）
逐一回查未被去變音，**9/9 完整**。

---

# c-130 b 組（波蘭 1980 年代龐克與新浪潮）　策展層裁定（2026-09-14）

交件 `batch-progress/c130/prop-b.json`：**22 張、16 位**，年份 **1982–1989**。
`node batch-progress/c130/chk-prop.mjs a b` → **標記 0**（45 張、29 位；跨批掃 80 批／3,587 張、撞卡 0）。
與 a 組（Czesław Niemen～Ewa Demarczyk 那 23 張）**無任何掛名重疊**。

## 第 320 條（本批立）：**波蘭側實測——1980 年代龐克與新浪潮的發行路徑有八條，國營廠只佔 3／22**

簡報第三節警告「c-123 實測推翻過『一切經國營廠牌』，逐張打 `release` 端點」。
**22 張逐張回問 `release?release-group=<id>&inc=media+labels&limit=100` 之後的分布**：

| 發行路徑 | 張 | 實例（catno） |
|---|---:|---|
| **Tonpress** | 5 | Brygada Kryzys SX-T16(1982)、Klaus Mitffoch SX-T40(1984)、Aya RL(1985，catno 欄空)、Siekiera SXT-73(1986)、Tilt SX-T 95(1988) |
| **Polton** | 3 | TSA PLP-002(1982)、Kult LPP-035(1988)、Sztywny Pal Azji PC-038 卡帶(1987) |
| **Polskie Nagrania „Muza"** | **3** | Lombard(1983，catno 欄空)、Kombi SX 2164(1983)、Oddział Zamknięty SX 2171(1984) |
| **Klub Płytowy Razem** | 3 | Kult RLP 015(1987)、Dezerter RLP 020(1987)、Sztywny Pal Azji RLP 016(1988 黑膠) |
| **Pronit** | 2 | Izrael M-0006(1985)、Armia PLP 0075(1987) |
| **自製／地下卡帶廠牌** | 2 | Dezerter＝Tank Records 003(1984)、Moskwa＝Prawda 0001 ＋ Studio Ultimatum U-009(1986) |
| **國外壓片** | 2 | Dezerter＝**US** Maximumrocknroll MRR 003(1987)、Abaddon＝**FR** New Wave Records NW 018(1986) |
| **PolJazz（爵士協會出版部）** | 1 | Dezerter PSJ-211(1989) |

**三個可直接給研究層與寫作層用的結論**：
1. **國營 Muza 的 3 張全部集中在 1983–84**；1985 年之後的十六張沒有一張走 Muza。
2. **Tonpress 的四個編號跨 1982–1988（SX-T16→SX-T40→SXT-73→SX-T 95）**，是這條線最連貫的一條廠牌時間軸。
3. **Klub Płytowy Razem 的 RLP 015／016／020 在 1987–88 年同時出 Kult、Sztywny Pal Azji 與 Dezerter**——
   一家唱片俱樂部同時出歌詞取向的團與龐克團，比任何單張碟更能說明那兩年的發行形狀。

**廠牌不需上呈主線**：c-130 沒有 c-126／c-127 那種 §1.5 獨立閘（那是華語 2010 後專屬），
本批的廠牌是**產製條件的證據**，不是收退判準；八條路徑全部逐張寫進 `label` 與 `why`。

## 第 321 條（本批立）：**合掛名（斜線與 `&`）一律不進池——本批兩案**

沿用裁定 258（Menuets 案）的判準：「合掛名是解歧義還是製造分裂」。

| 案 | MB artist-credit | 處置 |
|---|---|---|
| Dezerter《Izolacja》(1986) `7b7b165f…` | **`Dezerter & Kapele C.C.C.P.`** | **不收**。本組已有四張單掛名 Dezerter 卡，用合掛名會把同一支團拆成兩個掛名（`audits/pool-artist-name-splits.md` 在防的形狀）；而 `C.C.C.P.` 在池中另有義大利同名團（c-110 那批），二度撞名。 |
| Abaddon《Abaddon / Rejestracja》(1985) `d0a0fb98…` | **`Abaddon / Rejestracja`**（分軌合輯） | **不收**。帶斜線的掛名進池後在卡面與外部比對都會出問題（258 原文）。 |

**代價**：Izolacja 是 Dezerter 唯一一張 1986 年的碟，而且它的 release 是 **Tank Records 004 卡帶**
（與本批收的《Jeszcze żywy człowiek》Tank Records 003 同一套編號），**是很好的地下物證卻收不進來**。
下一批若要收，只能走 §1 人工身分另立掛名，不能用合掛名字串。

## 第 322 條（本批立）：**波蘭龐克團 `Deuter` 不收——池中已有德國的 `Deuter`，這是「掛名分裂」的鏡像**

簡報第二節點名 `Deuter` 是同名撞擊的重災區（「還是個知名的德國新世紀音樂人」）。實測：
MB 有波蘭龐克團 `Deuter`（`d49db75b-5247-4617-baa6-8fa9e00f657b`，Group／PL／1981–1989，
disambiguation「Polish punk band」，名下 4 個 RG），其 1988 年的《1987》
**是 Polskie Nagrania „Muza" SX 2620 黑膠＋CK-782 卡帶**——本來是本批最有價值的「龐克團走國營廠」樣本。

**但實掃 `seed_cards.json` 發現池中已有 `Deuter — D (1971)`**（德國的 Georg Deuter，
`c4e7031f-a5f0-476a-b1f0-1f3e8c573f4b`，另見 `onboarding-manifest-c46-soundtrack-cross`）。

**裁定：不收。** 理由是**這不是撞卡（`chk-prop` 的鍵是掛名＋盤名，`Deuter|1987` 與 `Deuter|D` 不會亮燈），
而是掛名合併**——兩位不同國籍、不同年代、不同曲風的音樂人會在卡池共用同一個 `artist` 字串，
下游的封面、店面配對、藝人頁全部會把兩位混成一個人。**掛名分裂（258）與掛名合併（本條）是同一個問題的兩面，
而合併比分裂更難回頭改**（分裂改的是卡單的 `artist` 值，合併要動的是池中既有卡）。
依判準 2 的反面（**不可逆就不要自己定成收**）當場定為不收，寫進未收清單，
**若下一批要收，要先由主線決定池中那位德國 Deuter 的掛名是否改寫**。

## 第 323 條（本批立）：**同一批裡兩張 §5.6，`year` 取法相反——判準是 261 的「涵蓋幾分之幾」，不是慣例**

| 卡 | `year` | 合輯出版 | 為什麼 |
|---|---:|---:|---|
| Dezerter《Underground Out of Poland》 | **1987** | 1987 | 19 軌橫跨 1983–1986 的多次錄音、MB 未登記逐軌年份，**沒有任何一年涵蓋多數** → 依 261 取資料庫登記的年份 |
| Siekiera《Na wszystkich frontach świata》 | **1984** | 2007 | 逐軌拉過 release `bef47d60…` 的三十軌曲目表：**全部是同一組約十五首 1984 年龐克曲目的不同錄音、無一軌屬於 1986 年後的曲目** → 1984 涵蓋整套，依 255 取錄音年 |

**做法定型**：§5.6 卡在填 `year` 之前**一定要把 release 的曲目表拉出來看**（`release/<id>?inc=recordings`），
不能只看 RG 標題與 first-release-date。**兩張的處置相反，但用的是同一條判準。**

## 第 324 條（本批立）：**同名撞擊實測——擋下 143 個同名實體，沒有一次靠 score；最危險的兩個是「同國同名」**

每個掛名跑 `artist?query=artist:"<名>"&limit=25`，**只看 `type`／`area`／`life-span.begin`／`disambiguation`**（第 250 條）：

| 掛名 | 全域筆數 | PL 筆數 | 擋下 | 第 1 名是誰／備註 |
|---|---:|---:|---:|---|
| **Kult** | **76** | 2 | 24 | 回傳首筆是 My Life With the Thrill Kill Kult；另有義大利與法國兩支黑金屬 Kult、土耳其 Kült |
| **Abaddon** | **70** | 1 | 24 | 巴西／保加利亞／哥倫比亞／墨西哥四支同名金屬團 |
| **Tilt** | **54** | 1 | 24 | 英國 electro/trance、美國加州龐克 Tilt、德國 Tilt!、名古屋 TILT |
| **Lombard** | **44** | 1 | 24 | 擋下的幾乎全是姓 Lombard 的個人（比利時歌手、法國指揮…） |
| **TSA** | 13 | 1 | 12 | 菲律賓 T.S.A（hc punk）、The Sound Archive、一位 electro artist |
| **Variété** | 11 | **2** | 9 | **PL 側就有兩個**：本團(1983) 與 disco polo 的 `Variete` |
| **Deuter** | 6 | 1 | 5 | **其中一個在池中**（見第 322 條） |
| **Izrael** | 5 | 1 | 4 | 尚比亞歌手 Izrael（ZM） |
| **Moskwa** | 4 | 1 | 3 | 德國 Moskwa TV、M.O.S.K.W.A.、Moskwa Beat |
| **Kryzys**（查 Brygada Kryzys 的前身名） | 4 | 1 | 3 | **前身團 `Kryzys` 在 MB 是另一個實體**（`152d88cf…`，無國別無 life-span），不是本團 |
| **Kombi** | 8 | 1 | 7 | João Kombi 個人專案、Kombi Killers |
| **Armia** | 3 | **2** | 2 | **同國同名**：`Biała Armia`（PL／1993／另一曲風） |
| **Oddział Zamknięty** | 2 | **2** | 1 | **同國同名**：`Jary Oddział Zamknięty`（PL／begin **2016-02-26**） |
| Dezerter／Siekiera／Aya RL／Klaus Mitffoch／Sztywny Pal Azji／Kobranocka／Śmierć Kliniczna | 各 1 | 1 | 0 | MB 端乾淨 |

**合計擋下 143 個同名實體。**

**兩個最該傳下去的形狀**：
1. **同國同名（Armia／Biała Armia、Oddział Zamknięty／Jary Oddział Zamknięty）時 `area=PL` 這一項失效**，
   **只剩 `life-span.begin` 與 `disambiguation` 能分**（兩案分別差 9 年與 37 年）。
2. **`disambiguation` 空的掛名不得背書任何身分細節**：本批有 **Siekiera、Aya RL、Moskwa、Kombi、Izrael、Sztywny Pal Azji** 六位的 disambiguation 是空的，
   身分只能靠 `type`＋`country`＋`life-span.begin` 三項交叉，已逐張寫進 `risk`。
3. **Kult 的 disambiguation 帶創團者本名**——依第 241／250／305 條**不轉述**，只在 `risk` 記「該欄有內容且與 PL／1982 一致」。

## 第 325 條（本批立）：**`status=Bootleg` 的 release 不採信——而且同一家廠牌在 MB 上的 status 並不一致**

Brygada Kryzys 1982 年的兩個 Live RG（`4fdf905c…`《Live in Remont 82'》、`f709efbb…`《Live》）
**轄下每一筆 release 的 status 都是 Bootleg**（英國 Fresh Records FRESH LP 13、Fala Ⓕ019 卡帶）——
依第 253 條現場盤可收，但 **Bootleg 不是發行版**，本批不收。

**同時記下一個反例**：廠牌 **`Fala`** 在 MB 上 status 不一致——
Armia《Antiarmia》1991 年的 Fala Ⓕ032 卡帶標 **Official**，
Dezerter《Jeszcze żywy człowiek》1991 年的 Fala Ⓕ025 與 Brygada Kryzys 的 Ⓕ019 標 **Bootleg**。
**不得由廠牌推 status，也不得由某一筆的 status 推整家廠牌。**

## 第 326 條（本批立）：**同名 RG 取有波蘭原壓的那一個**（裁定 260 在本批的落實）

`Brygada Kryzys` 1982 年在 MB 有**兩個同名 release-group**：
- `5087c34b-4f93-3a4c-acd8-239604656932` —— 轄下七筆，含 1982 Tonpress SX-T16 12" 9 軌與 Vega JG-005 卡帶。**本批取這個。**
- `726ebd94-6770-4669-9795-2d3ef80d3ae4` —— 轄下只有一筆英國 Fresh Records FRESH LP 13、**media 建成 7" Vinyl 7 軌、status 非 Official**。刻意不釘。

**判準**：兩個同名 RG 時取**有原壓國 release、且載體與軌數站得住**的那一個，不看 RG 建檔時間。
同形的還有 Oddział Zamknięty《Reda By Night》（1985 與 2001 兩個同名 RG）與
Izrael《Duchowa rewolucja》（1987 的 część I 與 2003 的同名 RG），**兩組本批都只碰其中一個或都不碰**。

## 第 327 條（本批立）：**Aya RL 的盤名取 MB 的括號寫法《Aya RL (Czerwona)》**

這支團 1985 與 1989 兩張專輯**實體盤面都只印 `Aya RL`**，MB 用 `(Czerwona)`／`(Niebieska)`（紅／藍）分開。
若照實體取名，兩張會摺成同一個鍵（正是裁定 260 說的形狀）。**裁定：照 MB 的括號寫法**，
`Aya RL`、`Aya RL Czerwona` 等寫法全部進 `queryAlias`。
**⚠ Apple 店面兩種都建了**：`1484182491「Aya RL (Czerwona)」2003 年 10 軌` 與 `1758742168「Aya RL」1985 年 15 軌`
（年份對得上原盤、軌數卻與 MB 的 10 軌不合），下游配對兩邊都要查。
1989 年那張藍盤本批不收：**1989 那筆 release 的 `label-info` 與 media 形態欄雙空**，文件強度不足。

## 第 328 條（本批立）：**⚠ 雲端 scratchpad 是跨代理共用的——腳本檔名一律帶批號與組別**

本批實測踩到兩次，**兩次都不是我的檔被改壞，而是同名檔互相覆寫**：

1. `scratchpad/cards/` 裡本來就躺著 **2026-09-04 某一批的 16 張卡**（英國 DIY 後龐克），
   我第一次 build 出來的 `prop-b.json` 變成 **21 張、含 16 張別批的卡**。
2. 更嚴重的一次：**同時在跑的 c-129 b 組代理把 `scratchpad/build.mjs` 覆寫成他們那支**
   （輸出目標是 `batch-progress/c129/prop-b.json`）。我沿用原檔名再跑一次，
   **等於替他們重跑了一次他們的 build**，我這邊的 16–20 號卡則完全沒進檔。

**做法（給後面每一批）**：
- scratchpad 裡的**每一個檔名都要帶批號與組別**（本批改用 `scratchpad/c130b/build-c130b.mjs`）。
- **build 腳本要把輸出路徑寫死在檔名對得上的批號上**，跑之前 `cat` 一次確認那個路徑是自己的批。
- **開工先看 scratchpad 有沒有前一批的殘檔**——`cards/` 這種通用目錄名最危險。

## 第 329 條（本批立）：**現場盤與自製卡帶都收了，但官方 Jarocin 合輯這一輪收不進來**

簡報說「Jarocin 那批的現場盤是這條線的核心物證」。實測 MB `release-group?query=Jarocin`（28 筆）之後：
- **收進來的**：Dezerter《Jeszcze żywy człowiek》(1984，`secondary-types=[Live]`，Tank Records 003 卡帶，依第 253 條收)。
  **同一張同時是現場錄音與自製卡帶兩種物證**，是本批最符合題旨的一張。
- **未收的官方合輯**：`Various Artists —《Jarocin '88》`（`dedb9b92-5f27-4c58-a591-7b6a84806281`，1989，三張 12 吋各 9 軌）——
  轄下唯一一筆 release **`label-info` 全空、`status` 欄也是空的**（不是 Official）。
  §5.6 可以走，但**兩個舉證 URL 只能指向 MB 自己**，而 status 空的 release 撐不起「這是當年的官方出版品」這句話。
  **下一批要收，先補 Discogs 或廠牌端的旁證。**
- 其餘 Jarocin 相關 RG（Siekiera《Jarocin 04.08.1984》、Tilt《Jarocin '85》、Moskwa《Jarocin》《Mała Scena Jarocin 84》、
  Armia《1989-08-02: Jarocin-festiwal》、Abaddon《Jarocin '84》2019）**幾乎全部沒有 `first-release-date`**，
  判不出發行年，本批一律不碰、逐張寫進各卡的刻意不釘。

## 第 330 條（本批立）：**未收清單（分類，下一批直接可用）**

### A. 名額不足、文件齊全 → **下一批最現成的一組**
Kult《Kult》(1987-05，Polton LPP-030 12" 11 軌)、Aya RL《Aya RL (Niebieska)》(1989)、
Klaus Mitffoch《Mordoplan》(1988)、Moskwa《Fama》(1985)、Oddział Zamknięty《Reda By Night》(1985)、
Lombard《Wolne od cła》(1984)／《Anatomia》(1985-06)／《Kreacje》(1987)、
Kombi《Królowie życia》(1981)／《Kombi 4》(1985)／《Tabu》(1989)、
Izrael《Duchowa rewolucja, część I》(1987)、Sztywny Pal Azji《Szukam nowego siebie》(1989)、
Kobranocka《Sztuka jest skarpetką kulawego》(1987，Polton PC-037 卡帶 13 軌，CAA 未測)。

### B. 文件強度不足 → 要先補查 `release` 端點
TSA《Spunk!》(1984)／《Heavy Metal World》(1985)（1980 年代那幾筆 release 的 `label-info` 與 media 形態欄**皆空**）、
Kult《Kaseta》(1989，同形)、Izrael《Nabij Faje》(1986，1986 那筆 release 的 `status` 欄空)、
Lombard《Szara maść》(1984，三筆 release 的年份／軌數／載體互相矛盾：1984 那筆 15 軌形態空、1985 那筆 12" 只有 8 軌)。

### C. 形態或掛名不符 → 不收（見 321／325／326）
Dezerter《Izolacja》(1986，合掛名)、Abaddon《Abaddon / Rejestracja》(1985，斜線合掛名)、
Brygada Kryzys 的兩張 1982 Live（Bootleg）、Brygada Kryzys 的第二個同名 RG、
Tilt《Runął Już Ostatni Mur...》(1985，EP)、Siekiera《Jest bezpiecznie / Misiowie puszyści》(1986，Single)、
Tilt《Za Zamkniętymi Drzwiami 1987 - Live In Lublin 1987》（**`secondary-types` 空但盤名即現場**，裁定 227 的形狀）。

### D. 掛名層級的問題 → 要主線裁定
**Deuter（PL）**：見第 322 條，池中已有德國 Deuter。
**Variété（PL，`c1bc859d…`）**：名下最早的 Album 是 1993 年的自我同名盤，
1980 年代的唯一一張是 **2002 年才出版的《Bydgoszcz 1986》**（`d09642d0…`，primary-type=Album、secondary-types 空）——
**依裁定 227「`secondary-types` 空不代表是原盤」，這張要回問 release 端點才判得了**，本批未查完，留給下一批。

### E. 年份窗口外（1990 之後）
Dezerter《Wszyscy przeciwko wszystkim》(1990)、Kult《45-89》(1990)、Armia《Legenda》(1991)、
Moskwa《Życie Niezwykłe》(1990)、Izrael《1991》(1991)。
**若下一批把窗口放寬到 1991（與 c-123 的波羅的海批同窗口），這五張可以直接建卡。**

## 封面與試聽的預估（**只寫觀察，不下結論——裁定 254**）

- **CAA release-group 端點逐張探測 22/22**：**200 共 21 張、404 共 1 張（TSA《TSA》）、5xx 0**（裁定 222 的重試未被觸發）。
  命中率 **95.5%**，遠高於 c-123 波羅的海那批的 66.7%。
  圖數最多：Siekiera《Na wszystkich frontach świata》**22 張**、Siekiera《Nowa Aleksandria》與 Klaus Mitffoch 各 **4 張**。
- **Apple 店面（`pl` 與 `us` 兩個店面、`search` 一種查法）**：22 張裡 **14 張有疑似本卡的條目**、
  **8 張兩個店面都 0 筆**（Siekiera《Na wszystkich frontach świata》、Moskwa《Nigdy!》、Lombard、Kombi、Izrael、Abaddon、
  Oddział Zamknięty（回的都不是本卡）、Tilt（us 店面連疑似的都沒有））。
  **這只是第 254 條三種查法裡的第一種**，藝人目錄 lookup 與 collectionId 直查留給研究層。
- **配對必須放寬的四種形狀**（已逐張寫進 `risk`）：
  1. **店面年份 = 再發年或差一年**：Klaus Mitffoch 標 1985（MB 1984）、Kult《Spokojnie》標 1987（MB 1988）、
     TSA 標 1983（MB 1982）、Armia 標 1988（MB 1987）、Sztywny Pal Azji 標 2001（MB 1987）。**一律以 MB 與盤面目錄號為準。**
  2. **店面盤名多字尾或多數字**：Kult《Posłuchaj to do Ciebie (Expanded)》、**Moskwa《Moskwa I》**（MB 無此盤名）。
  3. **店面軌數對應再發版**：Siekiera《Nowa Aleksandria》25 軌（MB 原盤 10 軌）、Tilt 16 軌（MB 原盤 9 軌）。
  4. **店面把本團建成合掛名**：Klaus Mitffoch 與 Oddział Zamknięty 各有數筆合掛名條目——
     **那些條目不是本卡，也不得用來背書任何成員身分**（第 241／250／305 條）。

---

## 第 329a 條（主線 2026-09-15 補，研究層 b 組交件後）：**TSA《TSA》改 1983、Kombi《Nowy rozdział》改 1984**

與第 311 條（Republika 1983、Maanam 1981）同形：MB 的 first-release-date 取的是**錄音月**，
不是發行月。研究層 b 組以 pl.wiki 精確日（TSA 1983-03-09、Kombi 1984-06-20）＋ Archiwum
Polskiego Rocka ＋ 串流／Discogs 日期三方一致改判。卡單與 `prop-b.json` 已由主線同步改，
策展層第 32x 條「Muza 三張全在 1983–84」「SX 2164／2171 同年」的口徑以研究層 notes 為準。
另五張年份兩說（Dezerter、Armia、Moskwa、Oddział Zamknięty、Sztywny Pal Azji）**卡片維持**，
兩說寫在研究 notes，寫作層不得斷言精確年。
