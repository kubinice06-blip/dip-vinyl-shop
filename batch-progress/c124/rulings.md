# c-124 伊朗（巴列維末期與 1979 之後）策展層裁定與實測（2026-09-08）

交件：`prop-a.json` 24 張／17 位（1971–2013）、`prop-b.json` 21 張／21 位（1981–2008），
合計 **45 張、36 位**，`node batch-progress/c124/chk-prop.mjs a b` **標記 0**、跨批撞卡 0。

---

## 一、本批立的裁定

### 255. 波斯文掛名：卡片一律取羅馬轉寫，MB 波斯文主名寫進 `mbNote` 與 `queryAlias`

派工單第 4 條寫「卡片取 MB 主名」，但本批有 **9 個目標實體的 MB 主名是波斯文**
（`محمدرضا شجريان` Shajarian、`شهرام ناظری` Nazeri、`سیما بینا` Sima Bina、
`فریدون فرخزاد` Farrokhzad、`اکبر گلپایگانی` Golpayegani、`عباس مهرپویا` Mehrpouya、
`فرامرز اصلانی` Faramarz Aslani、`مرجان` Marjan、`گوگوش` Googoosh 的部分 RG）。

**照 MB 主名寫會直接砸掉撞卡偵測**：池中 8910／8911 兩張既有的 Shajarian 卡是羅馬轉寫
（`Mohammad Reza Shajarian`），若新卡寫波斯文，`chk-prop` 的正規化鍵摺不到一起
（裁定 49：跨文字系統的撞卡字串去重看不見），兩張會變成「沒撞卡」而重複上架。

**裁定**：`CURATION-BRIEF-c123plus.md` 第五節「西里爾字母與波斯文用羅馬轉寫」**優先於**派工單的
「取 MB 主名」。掛名取羅馬轉寫（與池中既有寫法一致），波斯文原文一律寫進 `mbNote` 與 `queryAlias`。
**盤名**則照 MB 實體文字（裁定 6／70／120），因此本批有三張盤名是波斯文：
`دلمشغولی‌ها`（Faramarz Aslani）、`كوير دل`（Marjan）——池中已有 `침향무`、`수궁가`、
`คนกับควาย` 等非拉丁盤名的先例，形態上不是新東西。

### 256. §5.6 照既有 108 筆合輯提案的寫法走，不套 c-93plus 的「primary-type Album 就不填例外欄位」

`CURATION-BRIEF-c93plus.md` 第一節有一條：「MB `primary-type=Album` 而 `secondary-types` 含
Compilation 的，照一般 Album 寫法、不填例外欄位」。但**實掃 76 個批次目錄的全部 `prop-*.json`，
既有 108 筆 `releaseType: "Compilation"` 的提案裡，絕大多數的 `mbNote` 都明寫
「primary-type Album、secondary-types Compilation」**（c-57 的 Prince Buster《FABulous Greatest Hits》、
Various Artists《Tighten Up Volume 2》、c-62 的四張希臘 rebetiko 復刻、c-106 的兩張時代曲精選都是）。

**裁定**：**有先例照先例**。本批 8 張合輯全部填 `releaseType: "Compilation"` ＋
`exceptionReason`（≥12 字）＋ ≥2 個 HTTPS `exceptionEvidenceUrls`，與派工單第 3 條一致。
`chk-prop` 對這個寫法回標記 0（它只在「非合輯卻帶例外欄位」時報警）。

### 257. Pharaway「Iranian Pre-Revolution Generation」四輯只收前兩輯

Pharaway Sounds 用同一個副標出了四輯：`Zendooni`(PHS-001, 2012)、`Khana Khana`(PHS-003, 2012)、
第三輯、`Sedayeh Del`(PHS-010, 2013)。§5.6 明文「同一藝人同一批錄音的多種合輯只挑最權威的一種」。

**裁定**：四輯的曲目彼此不重疊，是四份不同的文獻而非同一批錄音的重複包裝，因此不適用「只挑一種」；
但為了不讓單一廠牌壓過整組，**只收目錄第一號 `Zendooni` 與 `Khana Khana` 兩輯**，
`Sedayeh Del`（1e8a32f2）與 `Persian Funk`（22cd342d，選曲與 Pomegranates 重疊）記入未收清單，
並在 `Pomegranates` 的 `mbNote` 寫成刻意不釘。

### 258. 「MB 只有復刻年」的三種處置，年份欄一律不冒充原盤年

派工單第 9 條要求「查不到原盤年就在 `mbNote` 寫明只有復刻年」。本批把它細分成三檔：

| 檔 | 處置 | 張數 | 例 |
|---|---|---:|---|
| **A 原盤年有第三方來源** | `year` 取原盤年，MB 的再發日寫進 `label`＋`mbNote` | 5 | Kourosh《Gol-e Yakh》1973（Wikipedia）、Googoosh《Mordaab》1971／《Dou Mahi》1974／《Pol》1975（Wikipedia Googoosh discography）、Pari Zanganeh 1976（Pharaway PHS-075 店面商品頁） |
| **B MB 日期看得出是灌檔日** | `year` 照填，但 `risk` 寫明「只能算 MB 唯一可得的年份、不得對外宣稱已驗證」 | 4 | Elaheh Vol 5（同藝人七個 RG 同為 1972-08-01）、Golhaye Tazeh No. 23、Golhaye Rangarang 539&540、Dariush《Cheshme Man》（同藝人五個 RG 同為 1991-03-08） |
| **C 原盤年完全查無** | `year` 填 MB 唯一可得的年份，`risk` 與 `mbNote` **兩處**都明寫「這不是原盤年」 | 4 | Zia《Helel Yos》1996、Marjan《كوير دل》1996、Mehrpouya《Soul Raga》2013、Ramesh《Ramesh》2013 |

**合計 13 張沒有可靠的原盤年**（B＋C 共 8 張是硬傷、A 的 5 張靠 MB 以外的來源補上）。
這是伊朗這條線最大的資料缺口，研究層要逐張再驗一次 A 檔的外部來源。

### 259. `risk` 欄逐張帶「行文界線」提醒（派工單最重要的一條，落實方式）

派工單要求「不得寫政治立場、宗教評價、體制的價值判斷或流亡敘事」，且「逐張寫進 `risk`」。
**45 張的 `risk` 結尾一律附同一段固定文字**，內容包含：可以寫什麼（發行年、廠牌、盤面編號、曲目、編制、
MB `artist` 的 `area` 欄記到哪個國家）、不可以寫什麼（政治、宗教、體制評價、把「流亡」「被禁」寫成敘事）。

**本層自己的執行方式**：全批 45 張的 `why`／`risk`／`mbNote` **完全不出現**「流亡」「被禁」「審查」
「革命的影響」這類敘事化用語；提到藝人所在地時一律寫成「MB 的 `artist` `area` 欄記為 United States」
這種可查證的欄位敘述，而不是「他離開了伊朗」。分組名稱在檔案裡只用 `g: "a"`／`g: "b"` 與年份界線表達。

### 260. `curatorRisk` 只寫觀察（裁定 254 的落實）

45 張的店面欄一律寫成「Apple `search` 以〈某字串〉在 us／gb／de／fr／nl 五店回 N 筆，
無一筆掛名與盤名同時對得上（僅 `search` 一種查法的觀察）」，
**沒有任何一張寫「未上架」「無來源狀態」「要掃圖」**。第三種查法（直查候選 `collectionId`）
與藝人目錄端本層沒跑，已在每張的 `risk` 註明。

---

## 二、與池的實掃對照（裁定 27：不取樣，實掃全檔）

**`seed_cards.json` 全 14,424 列逐列掃過，三種轉寫（拉丁主寫法／次寫法／波斯文原文）都查。**

派工單引用主線的實掃結果是「池中只有 1 張」，**實測是 6 張**，全部連續落在 8910–8915 列：

| 列 | 掛名 | 盤名 | 年 | 三軸／genres |
|---:|---|---|---:|---|
| 8910 | Mohammad Reza Shajarian, Hossein Alizadeh, Kayhan Kalhor & Homayoun Shajarian | Night Silence Desert | 2000 | — |
| 8911 | Mohammad Reza Shajarian | Bidad | 1985 | `["classical"]` |
| 8912 | Hossein Alizadeh & Djivan Gasparyan | Endless Vision | 2006 | — |
| 8913 | Kayhan Kalhor | Scattering Stars Like Dust | 1998 | `["folk"]` |
| 8914 | Ghazal | The Rain | 2003 | — |
| 8915 | Masters of Persian Music | Without You | 2002 | — |

**六張全是 1979 年之後的古典與跨界，而且六張裡有四張是同一個人（Kayhan Kalhor）參與的錄音**
（8910、8913 掛他本名；8914 Ghazal 與 8915 Masters of Persian Music 是他的合奏團，掛名不同、
撞卡字串去重看不見——裁定 49）。**革命前的流行、funk、psych：0 張。**

### 逐位實掃結果（0 = 池中沒有）

- **革命前骨幹 20 位**：Googoosh 0、Kourosh Yaghmaei 0、Farhad 0、Dariush 0、Ebi 0、
  Fereydoun Farrokhzad 0、Zia Atabay 0、Shahram Shabpareh 0、Marjan 0、Ramesh 0、Soli 0、
  Habib 0、Sattar 0、Aref 0、Nooshafarin 0、Leila Forouhar 0、Martik 0、Black Cats 0、
  Rana Farhan 0、Susan Roshan 0 → **20/20 全零**。
- **革命後與古典 16 位**：Shajarian **2**、Nazeri 0、Hayedeh 0、Mahasti 0、Homayoun Shajarian
  （本名掛牌）0、Kayhan Kalhor **2**、Hossein Alizadeh **2**、Parisa 0、Sima Bina 0、
  Alireza Assar 0、Mohsen Namjoo 0、Kiosk 0、O-Hum 0、127 0、Hypernova 0、Golpayegani 0
  → **13/16 是零**。

### 假陽性（必記，否則深度量測會被騙）

短掛名做字串比對時，池中回這些**全部不是伊朗的碟**：
`Ebi` → Amebix《Arise!》、Mtume《Rebirth Cycle》、J Dilla《Rebirth of Detroit》、Ebiet G. Ade《Camellia I》等 9 筆；
`Soli` → John Martyn《Solid Air》、Gang of Four《Solid Gold》、YMO《Solid State Survivor》、
Nurse With Wound《Soliloquy for Lilith》等 10 筆；
`Zia` → Urszula Dudziak、Montserrat Caballé《Lucrezia Borgia》、Paco de Lucía《Luzia》等 8 筆；
`Habib` → Drake《HABIBTI》、Habib Koité《Ma Ya》、Sabri Brothers《Ya Habib》3 筆；
`Rana` → KAYTRANADA 4 張、Beatrice Rana、Carmina Burana 兩張等；
`Aref` → Michel Polnareff《Polnareff's》；`Marjan`／`Parisa`／`127`／`Kiosk` → 0 筆。

---

## 三、短掛名回問實測（裁定 179／250）：**score 排序 10 個掛名裡有 6 個完全失效**

派工單點名的十個短掛名，逐一用 `artist?query=` 回問並看 disambiguation：

| 掛名 | MB 同名實體 | 目標排名／score | score 可用？ | 分辨依據 |
|---|---:|---|---|---|
| **Ebi** | **1,462** | 第 1／100（第 2–4 名 90–94） | ❌ 差 6–10 分 | disambiguation「Iranian singer」 |
| **Zia** | **1,647** | **第 4**／97（前三名 98–100） | ❌ **完全失效** | disambiguation「Iranian Singer」 |
| **Soli** | **1,440** | 第 1／100（第 2–4 名 98–99） | ❌ 差 1–2 分 | disambiguation「Iranian Singer」 |
| **Marjan** | 110 | **前四名都不是**（改查「Marjan Iranian」才在第 5 名 91 撈到） | ❌ **完全失效** | disambiguation「Iranian actress and singer」 |
| **Parisa** | 24（查 Parisa） | **前四名都不是**；改查本名「Fatemeh Vaezi」才撈到，且 MB 有**兩個重複實體** | ❌ **完全失效** | disambiguation「Iranian Fatemeh Vaezi」＋名下 RG 數 |
| **Habib** | 164 | **第 3**／96（前兩名 99–100） | ❌ **失效** | disambiguation「Iranian Singer」，MB 主名其實是 Habib Mohebian |
| **127** | **142,411** | 第 1／100，但第 2 名是 **NCT 127**、第 3 名起是 The E Street Band／The Beatles／U2 | ⚠ 名次可用、鄰居完全無關 | disambiguation「Iranian five piece band」 |
| **Kiosk** | 25 | 第 1／100（第 2–4 名 93–94：雪梨 indie、Marc Moulin、Hugo Nicolson 二人組） | ❌ 差 6–7 分 | area Iran ＋ begin 2003 |
| **Ramesh** | 67 | 第 1／100（第 2–3 名 93–95） | ❌ 差 5–7 分 | disambiguation「Iranian Singer」 |
| **Sattar** | 15 | 第 1／100（第 2 名 83） | ✅ 分差夠大 | disambiguation「Iranian singer」 |
| **Aref** | 184 | 第 1／100（第 2 名 93） | ⚠ 勉強 | disambiguation「Iranian Singer [Aref Arefkia]」 |
| **Rana** | 1,206（查 Rana Farhan） | 第 1／100，**但 disambiguation 空白** | — | **無法背書本名**（見下） |

**擋下的同名實體**：合計從 **1,462＋1,647＋1,440＋142,411＋1,206＋184＋164＋110＋67＋25＋24＋15
= 148,755 個同名候選**裡篩出 12 個目標；其中 **6 個掛名（Zia、Marjan、Parisa、Habib、Ebi、Soli）
的 score 排序沒有辨識力**，全靠 disambiguation。

**冠詞會把 score 整組打壞**：`Kamkars` 查回 1 筆、score 100；改查 `The Kamkars` 回 **193,908 筆**，
第 2 名起是 The Beatles、Various Artists、Bruce Springsteen。查短掛名時**不要加冠詞**。

### disambiguation 空白 → `risk` 標為不得背書本名（硬規則第 7 條）

本批有 **5 位**目標實體的 disambiguation 是空的，已逐張在 `risk` 寫明「不得背書本名、
下游不要補生平、只寫盤面可查的事實」：
`Kayhan Kalhor`(dd2a84cc)、`Homayoun Shajarian`(a5120e5e)、`Sima Bina`(a3708eff)、
`The Kâmkârs`(d71550ac)、`Pari Zanganeh`(cd831379)、`Sussan Deyhim`(738f1b1b)。
另 `Rana Farhan`(f451d1da) 也是空的，本批未收（見未收清單）。

---

## 四、§5.6 開了 8 張，逐張舉證

全部 8 張都在 a 組；b 組 0 張。每張皆 `releaseType: "Compilation"`、`exceptionReason` ≥12 字、
`exceptionEvidenceUrls` ≥2 個 HTTPS（實際皆 3 個）。

| # | 掛名 — 盤名 | rgMbid | 年 | 舉證重點 | 證據網址數 |
|---|---|---|---:|---|---:|
| 1 | Various Artists —《Pomegranates》 | 8b0d08f0 | 2009 | Finders Keepers FKR029，英語世界第一份伊朗 60–70 年代選輯；一張帶進 Zia／Googoosh／Marjan／Ramesh／Soli／Dariush／Sima Bina／Mohammad Nouri 八個掛名 | 3 |
| 2 | Various Artists —《Zendooni》 | 3d286ee7 | 2012 | Pharaway PHS-001，系列開山之作，副標成為後三輯的系列名 | 3 |
| 3 | Various Artists —《Khana Khana》 | 35c7406f | 2012 | Pharaway PHS-003，曲目與 Zendooni 不重疊 | 3 |
| 4 | Various Artists —《Raks Raks Raks》 | 98c023a6 | 2009 | Pharaway，鎖定 1960 年代德黑蘭 garage／beat，原盤全為 45 轉單曲、樂團多半從未有過 LP | 3 |
| 5 | Kourosh Yaghmaei —《Back From the Brink》 | 9d14a076 | 2011 | Now-Again 以藝人自存母帶修復的 21 軌，1973–1979 錄音唯一經授權的完整成輯形態 | 3 |
| 6 | Mehrpouya —《Soul Raga》 | 07dcc777 | 2013 | Pharaway 雙 CD，把 1960–70 年代西塔琴編制的錄音成套整理；藝人名下僅 4 個 RG | 3 |
| 7 | Ramesh —《Ramesh》 | 8452fd80 | 2013 | Pharaway 12 軌；她名下 9 個 Album 有 6 個是 1995-02-06 同日灌檔的再發條目，本輯是唯一由歐洲廠牌整理的成輯 | 3 |
| 8 | Marjan —《كوير دل》 | 071f2692 | 1996 | 藝人名下**唯一**一個 release-group；〈Kavir-e Del〉是《Pomegranates》十六軌之一，這是該曲原唱者唯一可釘的條目 | 3 |

---

## 五、CAA 與店面實測

### 封面（`coverartarchive.org/release-group/<id>/front`，含對照組共測 62 個 MBID）

**45 張提案：200 = 39 張（86.7%）、404 = 6 張（13.3%）。**

404 的六張：
Kourosh Yaghmaei《Gol-e Yakh》、Kourosh Yaghmaei《Sol-e 1 (Live)》、
Habib Mohebian《Salame Hamsayeh》、Soli《Persian Music Hits 8》、
Mahasti《Bigane》、Sattar《Ask》。

**這個命中率遠高於預期**——伊朗的碟多半經歐美復刻廠上架，CAA 有圖的比例比 c-123 波羅的海那條線好得多。

### 店面（Apple `search`，`us`／`gb`／`de`／`fr`／`nl` 五店）

45 張中 **44 張跑過**（Jalil Shahnaz《Musique Persane》因 Apple 端點連續回 429／403 未跑）。
逐筆看「掛名與盤名是否同時對得上」，而不是只看 `resultCount`：

| 命中面 | 張數 | 明細 |
|---|---:|---|
| **五店都對得上本張** | **13** | Kourosh《Back From the Brink》《Gol-e Yakh》、Googoosh《Pol》《Persian Music: Googoosh 3, Dou Mahi》、Ebi《Tapesh》、Siavash《Farangis》、Elaheh/Aref《Vol 5》、Zia《Helel Yos》、Nazeri《Atashi Dar Neyestan》、O-Hum《Nahal-e Heyrat》、127《Khal Punk》、Namjoo《Toranj》、Deyhim《Madman of God》 |
| **部分店對得上（1–4 店）** | **9** | Shajarian《Astan e Janan》(de/fr/nl)、Homayoun《Naghshe Khial》(nl)、Parissa《Shoorideh》(gb)、Hayedeh《Sogand》(gb/de/nl)、Dariush《Cheshme Man》(de/fr)、Ebi《Khalij》(de/fr/nl)、Shabpareh《Deyar》(us/gb/de)、Googoosh《Akharin Khabar》(us/gb/de/nl)、Golhaye Rangarang 539&540(**僅 fr**) |
| **有命中但對到別碟或別版本，需下游辨** | **4** | Kalhor《Silent City》→ Apple nl 那筆標為 **EP**；Sima Bina → Apple nl 對到的是 **North** Khorassan；Kamkars → Apple us 掛名寫作「Kamkars Ensemble」、盤名前多庫德語主標；Ramesh《Ramesh》→ 對到的兩筆（48 Golden Songs、Ramesh 3; Adamak）**都不是本輯** |
| **五店皆 0 筆可對得上** | **18** | Pomegranates、Zendooni、Khana Khana、Raks Raks Raks、Soul Raga、Marjan、Sol-e 1、Mordaab、Salame Hamsayeh、Persian Music Hits 8、Delmashghooliha、Golhaye Tazeh No. 23、Pari Zanganeh、Alizadeh《Chahargah》、Mahasti《Bigane》、Sattar《Ask》、Leila Forouhar《Makhmal-e-Naz》、Kiosk《Ordinary Man》 |
| **未跑** | **1** | Jalil Shahnaz《Musique Persane》 |

⚠ 上表第四列的 4 張與第五列裡的 4 張（Hayedeh 缺 us/fr、Mahasti 缺 us/fr、
Leila Forouhar 缺 fr、Kiosk 缺 de/fr）**是在 Apple 回 HTTP 429／403 的情況下取得的部分結果**，
不足以視為完整觀察。

**其他需要下游辨版本的命中**（`risk` 已逐張註明）：
O-Hum 五店都是 **Remastered** 版；Kourosh《Gol-e Yakh》Apple 盤名拼作「Gole Yakh」；
Zia 掛名大小寫作「ZiA」；Shajarian《Astan e Janan》掛名連寫成「Mohammadreza Shajarian」；
Shabpareh《Deyar》盤名後綴多了「Persian Music」；Deyhim《Madman of God》Apple 盤名無副標。

**⚠ Apple 端點在本批連續回 429／403**：`itunes.apple.com/search` 在每 0.7 秒一次的節奏下跑到第 21 筆
開始回 429，改成 2.5 秒一次才穩定。下一批的 Apple 探測請直接用 **2.5 秒間隔**。

---

## 六、未收清單（分類）

### 6.1 MB 查無、不收（可進 §1 補遺批）

| 掛名 | 找不到什麼 | MB 現況 |
|---|---|---|
| Nasser Cheshm Azar | 整個實體 | `artist?query=` 回 1,935 筆，前四名全無關（AZAR AZAR、法國 electro 的 Nasser…） |
| Jalal Hemmati | 整個實體 | 回 58 筆，第 1 名是 The Last Poets 的 Jalal Nuriddin |
| Nour Mohammad Doorpour | 整個實體 | 回 609 筆，第 1 名回到 Mohammad Nouri（別人） |
| Manouchehr Sakhaei | 實體有（b1dce01e），**名下 0 個 release-group** | 目錄空 |
| Dariush Rafiee | 實體有（5f7a64ac），**名下 0 個 release-group** | 目錄空 |
| Ali-Akbar Shahnazi | 實體有（385cb0fb，波斯文主名），**名下 0 個 release-group** | 目錄空 |
| Andy & Kouros | 實體有（3dfb2f0b），名下 1 個 RG《Bala》**無日期** | 年份查無 |
| Ahdieh | 實體有（c2ec08eb），名下 1 個 RG《Shirin lab yar》**無日期** | 年份查無 |
| Delkash | 實體有（5180ff05，波斯文主名），2 個 Album 一個 2011、一個無日期 | 革命前原盤查無 |
| Pouran | 實體有（3d2d5c66，波斯文主名），3 個 Album 全是 Viguen 合輯或無日期 | 個人原盤查無 |
| Fereydoun Farrokhzad 的 1974 盤 | RG 有（ba1e7f54，1974 12" 黑膠），但 **artist-credit 是「فروغ, فریدون」（兩人並列的詩作朗讀盤）**，掛名對不上，且 CAA 回 404 | 形態不合 |

### 6.2 與本批規格衝突而不收

| 碟 | 不收的理由 |
|---|---|
| Various Artists《Sedayeh Del》(1e8a32f2, 2013) | Pharaway 同系列第四輯，依裁定 257 只收前兩輯 |
| Various Artists《Persian Funk》(22cd342d, 2011) | 選曲與《Pomegranates》重疊，§5.6「只挑最權威的一種」 |
| Kourosh Yaghmaei《Sol-e 2 (Live)》(4022b7dc, 1980) | first-release-date 1980，落在 1979 之後；依分組規則不屬 a 組，b 組的名額給了別的掛名 |
| Googoosh《Googoosh 4, Dou Panjareh》(e2773937) | 原盤 1970，但同一藝人 a 組已收三張，避免單一掛名壓過整組 |
| Elaheh Vol 1/2/3/4/6 與《Best Of》 | 七個 RG 的 `first-release-date` 全是 1972-08-01，明顯是灌檔日；只取 artist-credit 帶 Aref 的 Vol 5 |
| Elaheh《Persian Golden Music, Vol 3》(639a6438, 1976) | 同上，避免 Elaheh 一人占四張 |
| Ramesh 的六張 1995-02-06 同日條目 | 灌檔日的形狀，年份不可採信 |
| Kayhan Kalhor《Blue as the Turquoise Night》(52296835／9b4a2fb6) | MB 上是**兩個重複的 release-group**、日期都是 2021-11-12；MB 端要先合併 |
| 127《Subterranean Tehran Blues》(c54e37e4, 2005) | 唯一 release 的 status 是 **Bootleg** |
| Faramarz Aslani 的 2008 數位版 | status 是 **Withdrawn** |
| Googoosh《Pol》的 2018 黑膠 | status 是 **Bootleg**（RG 本身有收，只是不取這一版） |
| Rana Farhan（3 張 Album，2007／2009／2011） | 目標實體 f451d1da **disambiguation 空白**、area 空白、begin 空白，依硬規則第 7 條無法背書本名；三張碟都是紐約錄的 blues／jazz 跨界，與本批兩組的場景都不貼 |

### 6.3 餘量：已驗過、下一批可直接用（**MBID 與 CAA 都已測**）

這 12 張都跑過 `release-group?inc=artist-credits+releases+media` 回問與 CAA 探測，
只因本批名額（a 22–24／b 18–21）滿了而沒收：

| 掛名 — 盤名 | rgMbid | 年 | CAA |
|---|---|---:|---|
| Parviz Meshkatian & Mohammad Reza Shajarian —《Jane Oshagh / Gonbade Mina》 | 2c5ea796 | 1985 | 200 |
| Mohammad Reza Lotfi —《Mystery of Love》 | 55766132 | 1996 | 200 |
| Hypernova —《Through The Chaos》 | 43f841ab | 2010 | 200 |
| Black Cats —《Afsoon (Spell Of The Cats)》 | 06ada2f8 | 1996 | 200 |
| Martik Kanian —《Khab》 | f3d1dcec | 1990 | 200 |
| Niyaz —《Niyaz》 | 98570759 | 2005 | 200 |
| Arian Band —《The Sunflower》 | 1e562b08 | 2000 | 200 |
| Shahram Nazeri & Jalal Zolfonoun —《گل صدبرگ》 | 010d567f | 1985 | 200 |
| Mohammad Reza Shajarian —《Serre Eshgh》 | 09d5e7ab | 1986 | 404 |
| Googoosh —《Googoosh 4, Dou Panjareh》 | e2773937 | 1970 | 200 |
| Various Artists —《Sedayeh Del》 | 1e8a32f2 | 2013 | 200 |
| Various Artists —《Persian Funk》 | 22cd342d | 2011 | 200 |

另有**未跑 MBID 回問但目錄已抓到**的候選（下一批直接從 `cat-probe.json` 挑）：
Alireza Assar 9 張、Shahram Solati 23 張、Shohreh Solati 21 張、Moein 18 張、
Andy Madadian 9 張、Hassan Shamaizadeh 5 張、Siavash Ghomayshi 17 張（1973 那張本批已收）、
Sussan Deyhim 11 張、Rastak 4 張、Hassan Kassai《Iran》(0e2ae046, 1983)、
Fereydoun Farrokhzad 1992 年之後 5 張。**這條線在池中還很空，還撐得起一整批。**

---

## 七、給下游的三件事

1. **行文界線是硬規則**（裁定 259）。45 張的 `risk` 結尾都有那段固定文字，
   研究層與寫作層照著走；本層自己也已全程只寫欄位事實與可查證的發行資訊。
2. **13 張沒有可靠原盤年**（裁定 258 的 B 檔 4 張 ＋ C 檔 4 張 ＋ A 檔靠外部來源的 5 張）。
   A 檔的外部來源（英文維基 Googoosh discography／Gol-e Yakh、Pharaway PHS-075 店面商品頁）
   研究層要再驗一次；B、C 檔的簡介**不得寫成「這張是 19XX 年的作品」**。
3. **店面第三種查法（直查候選 `collectionId`）本層沒跑**。18 張「五店皆 0 筆可對得上」是
   `search` 這一種查法的觀察，**不是結論**（裁定 254）；另有 1 張完全未跑
   （Jalil Shahnaz《Musique Persane》）、4 張因 Apple 回 429／403 缺 1–2 店。
   下一批的 Apple 探測間隔請直接設 2.5 秒。
4. **4 張命中了但對到別碟或別版本**（Kalhor 的 EP、Sima Bina 的 North Khorassan、
   Kamkars Ensemble 的變體盤名、Ramesh 的兩張別輯），上架前務必辨版本，不要照命中就配。
