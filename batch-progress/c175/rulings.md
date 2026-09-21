# c-175 b 組裁定（3901–3930）

批次 c-175｜b 組 18 筆（1971–1975 年段；コロムビア 7・Victor 6・東芝 3・King 2）｜策展層｜2026-09-21
判準照 `batch-progress/CURATION-BRIEF-jp1.md`（2026-09-21 版）→ `CURATION-BRIEF-bluenote-post1985.md`（含附錄二）
→ `CURATION-BRIEF-bluenote.md` → `CURATION-BRIEF-c131.md`，**固定規格一字未改**。
曲風判準照 **c-173 b 第 3753 條 ＋ 第 1857-B 條（①② 進人工判、③④ 才是充分退件）＋ 第 3791 條第 5 款**。
**收 13、退 5｜年份改判 1 筆、盤名改判 1 筆（另寫法差 3 筆）、`live` 改判 3 筆（另 1 筆反向不採信）、廠牌欄改寫 3 筆｜本檔用到 3919。**

## 3901　本批結果總表

| # | slice 掛名 — 盤名 | 廠／原盤目錄號 | 處置 | 理由（命中條款） |
|---:|---|---|---|---|
| 0 | 石川晶とカウント・バッファローズ — Dynamic Latin Exotic Sound | **東芝 TP-9531Z**（slice 記コロムビア） | **收** | 拉丁爵士，四款全不成立；掛名照第 3775 條 |
| 1 | 猪俣猛とサウンド・リミテッド — ドラム・メソード | コロムビア JDX-79 | **收** | → `猪俣猛 —《Drum Method》`（盤名改判＋掛名取人名串） |
| 2 | 村岡実とニュー・ディメンション・グループ — 鳴門 | King SKD 135 | **收** | 邊界案（②成立→人工判），**live 改判 true** |
| 3 | Kosuke Mine Quintet — Daguri | Victor MJ-7145 | **退** | **撞池**（seed `峰厚介 —《Daguri》1973`），見 3903 |
| 4 | Mal Waldron and Terumasa Hino — Reminicent Suite | Victor SMJX-10155 | **收** | → `Mal Waldron & 日野皓正`，見 3911 |
| 5 | 村岡実とニュー・ディメンション・グループ — 蘇 | Victor SPX-1028 | **收** | 邊界案（②成立→人工判） |
| 6 | 村岡実とニュー・ディメンション・グループ — 竹・糸・鼓 | Victor CD4B-5043 | **退** | 非爵士（②＋③），見 3906 |
| 7 | 岡沢章 — ギリシャについて書かれた本 | コロムビア JDX-7011 | **收** | 邊界案（①成立→人工判） |
| 8 | The Big Four — Jazz at the Torys | **King LKB-7（1957）** | **收** | → `ジョージ川口とビッグ4`；**年份改判 1973→1957、live 改判 true** |
| 9 | 村岡実とニュー・ディメンション・グループ — ルーパス | Victor SPX-1029 | **收** | 邊界案；**MB 的 `Live` 不採信**，見 3915 |
| 10 | 三上寛 — BANG! | **URC URG-4022** | **退** | **原盤廠牌不在本線四家**（第 3714 條形狀），見 3905 |
| 11 | 浅川マキ — MAKI VI | 東芝 Express ETP-72011 | **收** | → `《Maki VI》`；**live 改判 true** |
| 12 | Mieko Hirota — The Nearness Of You | コロムビア JDX-7028 | **收** | → `弘田三枝子`；邊界案（①成立→人工判），見 3910 |
| 13 | Sadao Watanabe — Swing Journal Jazz Workshop 2 … | コロムビア SL-5102-N | **退** | **撞池**（1969 Takt XMS-10018-CT 的 1974 再發），見 3904 |
| 14 | Tranzam — Funky Steps | **コロムビア YQ-7018-N**（MB 記 YQ-7041-N） | **收** | 古典主題爵士放克；廠牌欄改寫 |
| 15 | Eiji Kitamura & All Stars, Martha Miyake & Yuzuru Sera Trio, Kazuo Yashiro Quintet — Let's Swing Now | Victor **SJV-818~9** | **退** | **三團分軌企劃盤**（第 3719 條形狀）＋ `SJV-`，見 3907 |
| 16 | Jun Fukamachi — Introducing Jun Fukamachi | 東芝 LF-91007 | **收** | → `深町純`；四款全不成立 |
| 17 | Kazumi Watanabe — Endless Way | コロムビア YQ-7511-N | **收** | → `渡辺香津美`；本批曲風最無爭議的一張 |

**第 315 條結算：`prop-b.json` 13 筆 ＋ 本表退件 5 筆 ＝ slice `g:"b"` 18 筆。✔**
**13 張、11 個相異掛名字串**（`村岡実とニュー・ディメンション・グループ` 3 張）。
`chk-prop b` **標記 0**（13 張、11 位），`dedup-crossbatch c175` 跨批撞卡 **0**、同 rgMbid 不同掛名 **0**、同掛名盤名詞元包含 **0**、共用目錄號 **0**。
**退件不補張**（簡報第二節第 2 點）。

## 3902　`poolRecheck` v2 逐筆人工比對：**「同藝人在池中」那一格本組 8 筆全部人工比過，而「查無」那一格出了一次真撞池**

本組 18 筆的分佈是 **「同藝人在池中，盤名不同——逐張人工比」8 筆**（#0、#1、#4、#10、#11、#13、#15、#17）、
**「池中查無此藝人（由 rgMbid 反查藝人 MBID、取其全部 alias 掃過）」10 筆**（#2、#3、#5、#6、#7、#8、#9、#12、#14、#16）。
兩種都自行掃過池：以 `chk-prop` 同一把正規化鍵（`&`→`and`、剝非文數字）子字串掃 `seed_cards.json`
＋ `desc-tools/batches/cards/*.json` ＋ 各批 `prop-*.json`，**合計索引 28,808 列**，每個掛名的漢字、羅馬字、片假名三種寫法都試過。

**(a) 「逐張人工比」那 8 筆的結果**：

| slice # | 掛名 | 池中已有 | 比對結論 |
|---:|---|---|---|
| 0 | 石川晶とカウント・バッファローズ | 6 張（seed/c-131/c-133）＋ c-174 a 待上架 4 張 ＋ 人名串《Back To Rhythm》1975 | 無一是本盤 → **可收** |
| 1 | 猪俣猛とサウンド・リミテッド | 樂團串 2 張、人名串 `猪俣猛` 5 張 | 無一是本盤 → **可收** |
| 4 | Mal Waldron and Terumasa Hino | `Mal Waldron` 7 列、`日野皓正` 9 列＋`日野皓正クインテット` 3 張 | 無一是本盤 → **可收** |
| 10 | 三上寛 | 3 張＋`三上寛・古澤良治郎` 1 張 | 無一是本盤（退件理由是廠牌，見 3905） |
| 11 | 浅川マキ | 1 張（浅川マキの世界 1970） | 不同碟 → **可收** |
| 13 | Sadao Watanabe | `渡辺貞夫` 9 張＋c-173 b 待上架 1 張 | ⚠ **《Dedicated to Charlie Parker》1969 就是本盤**（見 3904）→ **退** |
| 15 | 世良譲トリオ／八城一夫 等 | `世良譲トリオ` 1、`世良譲` 4、`八城一夫` 6、`八城一夫トリオ` 1、`北村英治` 6 | 無一是本盤（退件理由是多團分軌，見 3907） |
| 17 | Kazumi Watanabe | `渡辺香津美` 5 張＋c-174 b 待上架 1 張 | 無一是本盤 → **可收** |

**(b) ⚠ ⚠ 「池中查無此藝人」那一格出了一次真撞池——本線三批以來的第一次**：

| slice # | 掛名 | `artistVariants` 逐字 | 實掃池中 |
|---:|---|---|---|
| 3 | `Kosuke Mine Quintet` | `["Kosuke Mine Quintet","Mine, Kosuke, Quintet"]`——**兩個全是羅馬字，而且都帶 Quintet，沒有 `峰厚介`** | ⚠ **`峰厚介 —《Daguri》1973` 就在 seed 裡**（另有 `峰厚介` Out Of Chaos 1974／Sunshower 1976／Bamboo Grove 2019 與 `峰厚介クインテット —《Mine》1970`） |
| 12 | `Mieko Hirota` | 七個同義字串裡**有** `弘田三枝子` | 實掃 0 張，一致（c-173 第 3720 條退掉的那張未進池） |
| 其餘 8 筆 | — | — | 實掃一致，確實 0 張 |

⚠ ⚠ **v2 的品質確實比 v1 好，但失效方式沒有變**：派工信寫「抽驗 `artistVariants` 長度 1 的列是 0/37」，
**本組真正出事的那一筆長度是 2**——`jp1-slice-enrich.mjs` 由 `rgMbid` 反查到的藝人實體是
**`Kosuke Mine Quintet`（Group b7d5f881），不是人名實體 `峰厚介`**，於是 alias 全掃只掃到那個 Group 的兩個羅馬字串。
**這與 c-174 b 第 3802 條 (b) 是同一個機制**（同一人以不同編制／樂隊字串在池中的，一律判成「查無」），
差別是**這一次撞到的是同一張碟、不是同一人的別張碟**。
→ **給後七批的操作結論**：`poolRecheck` 標「查無」時，**先看 `artistVariants` 裡有沒有這位藝人的漢字本名**；
**沒有漢字本名的一律當成沒查過**（不只看長度是不是 1），自行補掃漢字／羅馬字／片假名三輪。
本組若照派工信「可以直接做」，**會做出一張與線上池逐字重複的卡**。

---

## 退件的裁定（3903–3907）

## 3903　退：`Kosuke Mine Quintet —《Daguri》`（rg 28ad566f）——**撞池，而且盤名逐字相同**

Victor MJ-7145、1973、5 軌、`why` `rg-tag`。曲風那一關過得很輕鬆（Discogs releases/5324392：genres 只有 `Jazz`、styles `Modal`／`Post Bop`；
1973-06-21／25 錄於 Victor Studio，編制是峰厚介 ts・ss／宮田英夫 ts／板橋文夫 p／望月英明 b／村上寛 ds），退的是重複：

**`seed_cards.json` 裡逐字有 `峰厚介 —《Daguri》1973`**（同批另有 `峰厚介` Out Of Chaos 1974／Sunshower 1976／Bamboo Grove 2019，c-132 a）。
同一張碟，只差掛名是**漢字人名 vs 羅馬字編制串**。
⚠ **`chk-prop` 的複合鍵 `live.get(掛名|盤名)` 抓不到**——`kosukeminequintet|daguri` 與 `峰厚介|daguri` 折不出同一個鍵，
**這是第 611 條盲區在本線的第八種形狀**（c-173 第 3713／3743 條、c-174 第 3802 條的延長線）。
⚠ Discogs 的盤面題是 `Daguri = ダグリ`（等價形，第 3793 條第 1 類），池中取的是英文題，兩邊本來就會逐字相同。

## 3904　退：`Sadao Watanabe —《Swing Journal Jazz Workshop 2 - Sadao Watanabe / Dedicated to Charlie Parker》`（rg ea469f1a）——**1969 年 Takt 盤的 1974 年再發**

コロムビア SL-5102-N、1974、6 軌、`why` `rg-tag`。逐項證據：

1. **Discogs releases/8589051 的 formats descriptions 逐字含 `Reissue`**（`["LP","Album","Reissue","Stereo"]`），
   series 欄逐字「Tact Jazz Series」「Columbia = Tact Jazz Memorial Series」；
2. **Discogs master 790035 的原壓是 `Columbia／Takt Jazz Series XMS-10018-CT、1969`**
   （releases/9461906，盤面題「Swing Journal Jazz Workshop 2-Sadao Watanabe / Dedicated To Charlie Parker = スイング・ジャーナル・ジャズ・ワークショップ〈2〉渡辺貞夫／チャーリー・パーカーに捧ぐ」）；
3. **池中逐字有 `渡辺貞夫 —《Dedicated to Charlie Parker》1969`**（seed＋`c132-cards.json`＋`c132/prop-a.json`）；
4. 六軌 Parker's Mood／A Song For Bird／Everything Happens To Me／I Can't Get Started／Au Privave／If I Should Lose You，
   編制渡辺貞夫 as／八城一夫 p／原田政長 b／渡辺文男 ds、日野皓正 客座（B2）——與池中那張同一套錄音。

→ **同一張碟，退。** ⚠ **MB 只建了 1974 年那個再發 release（784c84a8），first-release-date 因此記成 1974**——
**這是第 1858-B 條那個形狀的最惡性版本**：不是「RG title 取了再發題」，而是**整個 RG 只有再發、連年份都是再發年**，
`titleCheck` 三欄（rgTitle／earliestRelease／titlesSeen）**完全一致、`note` 是空的**，機器層看不出任何異常。
→ **給後七批**：`titleCheck.note` 為空**不等於**盤名／年份沒有問題；**「MB 整個 RG 只建了再發」這一種只有靠 Discogs master 的版本表才看得出來**。

## 3905　退：`三上寛 —《BANG!》`（rg b2e543f6）——**原盤廠牌是 URC，四家只出現在 1995 年的東芝 CD 再發上**

slice 的 `house` 是東芝、`entities` 是 `Toshiba Records`、`why` 是 `rg-tag`。**曲風那一關過得了**
（Discogs releases/6094083：genres `Jazz`／`Rock`、styles `Folk Rock`／**`Free Jazz`**；製作是**山下洋輔**，
班底有**坂田明（alto，B2）、古沢良治郎（drums／congas）**，1973-11-20／22・12-04／06 錄於 CBS/Sony 第一錄音室），
退的是身分：

- **1974-03 的原壓是 `URC URG-4022`**（Discogs master 56846 的最早兩版都是 URC，companies 欄逐字「Made By: URC Records」「Published By: Art Ongaku Shuppan」）；
- **MB 轄下唯一掛得到本線四家的是 1995-12-06 的 CD（2888a7f7，label 欄逐字「Toshiba Records TOCT-9322 / URC TOCT-9322」）**；
- 其餘再發是 URC SM20-4144（1980）、Kitty H20K25029（1989）、avex io（2002）、Greenwood（2017）、Pony Canyon（2018）、URC MHCL 30909（2023）。

→ **本盤是 URC 盤，不是東芝盤**；本線的範圍逐字是「四家的日本本土爵士盤」，
**依 c-173 第 3714 條「卡的身分應歸原盤」退。** 形狀與第 3714 條相同（列舉層靠一個非原盤的廠牌連結把它掃了進來），
只是第 3714 條漏的是外國原盤、本筆漏的是日本獨立廠原盤。
⚠ **這是真實缺口、不是重複**：池中 `三上寛` 已有 3 張（ひらく夢などあるじゃなし 1972、1972／コンサートライブ零狐徒 1972、負ける時もあるだろう 1978）
＋`三上寛・古澤良治郎 —《職業》1987`（c-87），**本盤池中沒有**。
**記在此供主線調度**：URC／アート音楽出版 這一支（三上寛・友部正人・高田渡 與山下洋輔圈的交會）**該另立一線，本線不收**。
⚠ **給後七批的操作結論**：`house`／`entities` 只說明「MB 底下有某個 release 掛到這家」，**不保證原盤是這家**——
**逐筆要回查 Discogs master 的最早版本**；本線至此已有三種失效（第 3714 條外國原盤、c-174 第 3784／3818 條 imprint 互掛、本條非四家的日本獨立廠）。

## 3906　退：`村岡実とニュー・ディメンション・グループ —《竹・糸・鼓》`（rg baa3ea97）——**同一個樂團的四張裡唯一一張曲目全是傳統曲目的**

Victor CD4B-5043（四聲道）、1973、6 軌、`why` `rg-tag`（RG genres 只有 jazz(1)）。
Discogs releases/9136260：genres `Jazz` ＋ **`Folk, World, & Country`**（② 成立 → 人工判）、**`styles` 欄是空的**、
**companies 與 extraartists 兩欄都是空的、notes 也空**。

**③ 成立**：六軌逐首是 **〈津軽三味線〉〈仁馬〉〈鹿の遠音〉〈三十三間堂くずし〉〈えん歌〉〈九州メドレー〉**
——〈鹿の遠音〉是尺八本曲、〈三十三間堂くずし〉與〈九州メドレー〉是民謡、〈えん歌〉盤面逐字就寫著演歌，
**沒有一首是爵士標準曲，也沒有一首是為本盤新寫的原創曲**。
**收件款同樣不成立**（第 3753 條收件款逐字要「曲目是爵士標準曲或原創曲」）。
先例：c-173 第 3721 條退《More Echoes Of Japan》與《テナーによる お江戸日本橋》、c-174 b 第 3808 條退《Sound of Pacific》，
**三筆都是「用某件樂器照譜演奏日本民謡」的形狀**，本筆同形。

→ **退。** ⚠ **這一筆與同團另外三張（收）的分界寫在 3909 條**，兩者不是雙重標準。

## 3907　退：`Eiji Kitamura & All Stars, Martha Miyake & Yuzuru Sera Trio, Kazuo Yashiro Quintet —《Let's Swing Now》`（rg a9d8bcc5）——**三團分軌的企劃盤**

Victor **SJV-818~9**、1975、**兩片裝 5+5 軌**、`why` `artist-tag`。
**曲風那一關過得了**（Discogs releases/10412102：genres 只有 `Jazz`、styles 空；曲目是 Kansas City Side／After You've Gone／
Bewitched／C Jam Blues／Speed Ball／Blue Lou／Mood Indigo 這批標準曲），退的是形狀，三項各自足以退件：

1. **artist-credit 串了四個 MB 實體、盤面列成三組演出單位**（MB 逐字「Eiji Kitamura & All Stars, 」＋「Martha Miyake & 」＋「Yuzuru Sera Trio, 」＋「Kazuo Yashiro Quintet」，
   實體 8bd1f9ef／1a37cc19／c80d9a8c／ad1780b5，其中 ad1780b5 的 MB 本名是 `八城一夫`），**而且 Discogs 的 extraartists 逐軌標明誰彈哪幾首**
   （世良譲 p：A1–B2；八城一夫 p：B2–C2；北村英治 cl：A1、B2、D1–D3；鼓手兩位分軌；貝斯兩位分軌）
   ——**是 c-173 第 3719 條《Modern Ameriachi For You》那種「兩團以上分軌」的形狀**（該條逐字：雙團分軌，退）；
2. **企劃屬性寫在系列欄**：Discogs series 欄逐字「**Takuya Fujioka Presents**」，**藤岡琢也同時掛 Producer 與 Narrator（A1、D1–D3）**
   ——是演員主持的爵士入門企劃盤，不是樂團作品盤；
3. **`SJV-` 號段**：c-173 第 3717 條把 `SJV-` 整個系列認定為 Victor 的ムード／輕音樂線、c-174 b 第 3810 條證實它到 1971 年仍然是，
   **本盤是 SJV-818~9、1975，該條要求「提出逐張的爵士證據才收」——曲目雖是標準曲，但第 1／2 項已足以退件**。

⚠ **附帶（不是主要理由）**：收進來會**為三個掛名各新造一個分裂字串**——池中已有 `世良譲トリオ`（1 張）＋`世良譲`（4 張）、
`八城一夫`（6 張）＋`八城一夫トリオ`（1 張）、`北村英治`（6 張）＋`北村英治クインテット`（1 張），
而本盤的三串是 `Eiji Kitamura & All Stars`／`Martha Miyake & Yuzuru Sera Trio`／`Kazuo Yashiro Quintet`，
**三串都是這張企劃盤的一次性編制**（第 3761／3787 條「最不值得的分裂」的第三次）。
⚠ **`マーサ三宅` 池中 0 張，是真實缺口**——但該由她自己的領班盤補，不是這張。

---

## 收件的裁定（3908–3916）

## 3908　`why` 欄逐筆覆核結果（18 筆全表）

| slice # | `why` | 覆核結論 | 處置 |
|---:|---|---|---|
| 0 | artist-tag | 成立（Discogs Latin Jazz／Jazz-Rock；**RG tags／genres 兩欄全空**） | **收** |
| 1 | artist-tag | 成立（Discogs genres 只有 Jazz、styles Jazz-Rock／Jazz-Funk；RG tags／genres 全空） | **收** |
| 2 | rg-tag | 成立（邊界案，②→人工判） | **收**（live 改判） |
| 3 | rg-tag | 成立（Discogs Modal／Post Bop） | 退：**撞池** |
| 4 | rg-tag | 成立（Discogs Post Bop／Avant-garde／Spiritual Jazz） | **收** |
| 5 | rg-tag | 成立（邊界案，②→人工判；styles 含 Jazz-Rock） | **收** |
| 6 | rg-tag | **不成立**：六軌全是本曲・民謡・演歌（②＋③） | 退 |
| 7 | **artist-search-tag** | 成立（邊界案，①→人工判；genres 首位 Jazz、styles 首位 Soul） | **收** |
| 8 | rg-tag | 成立（Discogs Post Bop） | **收**（年份＋live 改判） |
| 9 | rg-tag | 成立（邊界案，②→人工判） | **收** |
| 10 | rg-tag | 成立（Discogs Free Jazz／Folk Rock） | 退：**廠牌不在本線四家** |
| 11 | **pool-jazz-artist** | 成立（genres 首位 Jazz；伴奏是山下洋輔トリオ） | **收**（live 改判） |
| 12 | rg-tag | 成立（邊界案，①→人工判；十軌全是美國標準曲） | **收** |
| 13 | rg-tag | 成立（Discogs Bop／Post Bop） | 退：**撞池（1974 再發）** |
| 14 | rg-tag | 成立（Discogs genres 首位 Jazz、styles 只有 Jazz-Funk） | **收** |
| 15 | artist-tag | 成立（Discogs genres 只有 Jazz） | 退：**三團分軌企劃** |
| 16 | rg-tag | 成立（Discogs Fusion／Jazz-Funk） | **收** |
| 17 | rg-tag | 成立（Discogs Jazz-Rock／Fusion） | **收** |

**`rg-tag` 13 筆裡 1 筆曲風不成立（8%）；`artist-tag` 3 筆全成立；`artist-search-tag` 1 筆成立；`pool-jazz-artist` 1 筆成立。**
（c-173 a 31%／c-173 b 44%／c-174 a 19%／c-174 b 53%／**本組 8%**——**四批合計 `rg-tag` 61 筆、16 筆非爵士，26%**。）
⚠ **本組的 8% 是本線至今最低，但不要據此放鬆**：本組退掉的 5 筆裡**有 4 筆的曲風是成立的**（撞池 2、廠牌 1、分軌企劃 1），
**也就是說在 1971–1975 這個年段，失效的地方從「曲風」移到了「身分與重複」**。
⚠ 併記：`why` 的七種值本組出現四種（`rg-tag` 13／`artist-tag` 3／`artist-search-tag` 1／`pool-jazz-artist` 1），
比 c-174 兩組（各三種、兩種）多；**`artist-disambig`／`imprint`／`curator-list` 三種本組一筆都沒有**。

## 3909　⚠ **曲風裁定：`村岡実とニュー・ディメンション・グループ` 四張，收三退一——分界線是曲目來源，不是樂器**

本組有同一個樂團的四張碟（MB Group 實體 2baf3766），**四張的 Discogs genres 全部是 `Jazz` ＋ `Folk, World, & Country`**
（第 3753 條第 ② 款字面全部成立），照第 1857-B 條四張全部進人工判。逐張：

| 盤 | 廠／catno | Discogs styles | 曲目 | 處置 |
|---|---|---|---|---|
| 鳴門 1972 | King SKD 135 | Folk／Gagaku／Fusion | 六軌：**四首原創**（間＝村岡実、二つの鼓＝堅田喜三久、壇の浦＝平山眠水、鳴門 14:56＝池田孝）＋尺八與貝斯的即興對奏＋コンドルは飛んで行く | **收** |
| 蘇 1973 | Victor SPX-1028 | Psychedelic／**Jazz-Rock**／Min'yō | 五軌**全部**是新寫的原創（池多孝春 3、玉木宏樹 1、市原宏祐 1） | **收** |
| 竹・糸・鼓 1973 | Victor CD4B-5043 | **（空）** | 六軌**全部**是傳統曲目：津軽三味線／仁馬／鹿の遠音／三十三間堂くずし／えん歌／九州メドレー | **退**（3906） |
| ルーパス 1974 | Victor SPX-1029 | **（空）** | 四軌：A 面整面的原創〈ルーパス（狼座）〉（市原宏祐）＋原創〈歳〉（佐藤容征）＋浪曲津軽節＋尺八本曲〈虚無僧〉＝**二比二，不是過半** | **收** |

**判準的落點逐條**：① 四張都不成立（沒有一張的 styles 含 Easy Listening 或 Kayōkyoku——⚠ `Min'yō` **不在 ① 的清單裡**，
① 逐字只列 Easy Listening 與 Kayōkyoku）；② 四張都成立 → 全部進人工判；
**③ 只有《竹・糸・鼓》成立**；④ 四張都不成立（第 3819 條已就村岡実判過：他的目錄橫跨邦樂與爵士，不是ムード配方）。
**第 5 款（第 3791 條）四張都不成立**（genres 全部以 Jazz 為首，無 `Non-Music`／`Stage & Screen`）。

**先例對照**：c-174 b 第 3819 條收的《Bamboo》（同一位藝人）的機器訊號**比本組收的三張更差**
（genres Jazz＋FW&C、styles **Easy Listening／Jazz-Rock／Min'yō**），依據是「九軌裡日本傳統素材只有一首」；
c-174 b 第 3807 條退的《尺八ロック》三張的依據是「十二軌全是演歌／任侠映画主題歌／GS」。
**本組四張正好落在這兩個先例之間，分界線用的是同一把尺——曲目來源。**
三張收件的卡的 `risk` 都逐字寫了「行文必須寫成邦樂器的前衛跨界盤、不得寫成硬派爵士」（第 3819 條的同一要求）。
**可逆性**：改的是收退名單與卡單值，不動卡池結構——照裁定權下放的第 1 條（有先例）與第 2 條（可逆）直接定，不上呈。

## 3910　掛名（13 筆收件，逐筆；無一新造分裂）

1. **`石川晶とカウント・バッファローズ`**（#0）——**照第 3775 條收斂**。盤面／Discogs anv 是 `Akira Ishikawa & Count Buffalo Latin Beats`，
   但 MB 把本盤與池中六張、c-174 a 四張全掛在同一個 Group 實體 `2acbf5b2`（本名即此串），Discogs 的規範藝人名是 `Akira Ishikawa & Count Buffaloes`，
   **Apple jp 逐字也用「石川晶とカウント・バッファローズ」**（id1686634590／id1680848563）。四項依據與第 3775 條相同，不新造第十一個字串。
2. **`猪俣猛`**（#1）——見 3912。
3. **`村岡実とニュー・ディメンション・グループ`**（#2、#5、#9）——**新立，池中 0 張**。MB 是獨立的 Group 實體（2baf3766），
   Discogs 也是獨立的藝人實體（規範名 `Minoru Muraoka and New Dimension Group`）。
   **不與池中／c-173／c-174 的人名字串 `村岡実` 合併**——照**第 3775 vs 3766 的分界線（MB／Discogs 判不判成同一個實體）**，此處是兩個實體，
   與第 964／196／197 條「人名字串與團名字串可並存」同向。
   ⚠ **中黑的有無**：《鳴門》那一筆的 Discogs anv 是 `村岡実とニュー・ディメンション・グループ`（有中黑）、《蘇》那一筆是 `村岡実とニューディメンショングループ`（無中黑），
   **MB 實體本名有中黑**，三處對兩處，**三張一律取有中黑的寫法**，無中黑進 `queryAlias`。
   ⚠ **池中的 `村岡建`（Takeru Muraoka，3 張，c-133 b）是另一位樂手，絕不可合併**（第 3715 條第 4 款照舊）。
4. **`Mal Waldron & 日野皓正`**（#4）——見 3911。
5. **`岡沢章`**（#7）——**新立，池中 0 張**。MB artist-credit 是單獨的 `岡沢章`（ea89d842，Person），Discogs 盤面是 `Akira Okazawa`（anv `岡沢 章`，**有空格**），
   伴奏團 `Jiro Inagaki & Soul Media` 是以 `Performer` 掛在 extraartists。
   ⚠ **Apple jp／us 把本盤掛成「岡沢 章 & 稲垣次郎とソウル・メディア」／「Akira Okazawa & Jiro Inagaki and His Soul Media」（id1508949052），本卡不跟**
   ——跟了會為池中已有 7 張的 `稲垣次郎とソウル・メディア`／`Jiro Inagaki and Soul Media` 再造一個聯名分裂字串。
   處理照**第 3817 條第 4 款**（横田年昭：伴奏團掛在 extraartists 的 Performer 就不寫進掛名）；漢字取 MB 實體本名的**無空格**寫法
   （第 3817 條對 Apple `村岡 実` 的同一處理）。
   ⚠ **這是本線第二次「Apple 的掛名不可信」**（第一次是 c-174 b 第 3815 條的《Pianology》）——**Apple 會把伴奏團併進 artistName**。
6. **`ジョージ川口とビッグ4`**（#8）——**沿用池中既有字串**（第 307 條、c-173 第 3715 條第 1 款）。
   本盤在三處各有一個不同的寫法：MB artist-credit `The Big Four`／MB 實體本名與 Discogs 規範名 `George Kawaguchi's The Big 4`／**Apple jp `Big Four`**，
   **沒有一個是池中字串**，照池中多數（seed《The Big 4》1976 ＋ c-173 a《The Original Big Four》1959）取漢字串，其餘三種進 `queryAlias`。
7. **`浅川マキ`**（#11）——照池中既有字串（seed 1 張），MB 實體本名（2d16719b）與 Apple jp 的 artistName 三處一致，無新造。
8. **`弘田三枝子`**（#12）——MB artist-credit 顯示羅馬字 `Mieko Hirota`，**MB 實體本名（99938a7f）是漢字**，
   **Apple jp 的 artistName 逐字是「弘田三枝子」**（id1881860307）；池中兩種寫法皆 0 張，**沒有既有分裂**。
   照 2026-08-11 東亞藝人名裁定與第 3817 條（`渡辺香津美` 的同形狀）取漢字。本名 `高木三枝子` 只進 `queryAlias`。
9. **`Tranzam`**（#14）——⚠ **這一筆反方向**：MB 實體本名（2765ab11）是**片假名 `トランザム`**，但
   MB artist-credit、Discogs 規範藝人名、**盤面題（Discogs release title 逐字「Tranzam - Funky Steps」，未給 `= トランザム` 的等價對照）**、Apple us 四處都是羅馬字；
   池中兩種寫法皆 0 張。照 c-173 第 3715 條第 2 款（`Modern Jazz Playboys`：英文團名、無漢字，2026-08-11「有漢字照漢字」不適用）
   與第 3817 條第 4 款（`The Freedom Unity`）取原字串，**Apple jp 的 `トランザム` 只進 `queryAlias`**。
   ⚠ **與第 3817 條「横田年昭とビート・ジェネレーション 取片假名」不衝突**：那一筆的**盤面與 Apple 兩處都是片假名**，本筆的盤面是羅馬字。
10. **`深町純`**（#16）——MB artist-credit 與實體本名（5b92cd77）都是漢字，Apple jp 的 artistName 是「深町純」（多筆），
    池中 0 張；⚠ Apple 另有一筆寫成有空格的「深町 純」（id720592664），**不跟**。
11. **`渡辺香津美`**（#17）——**沿用 c-174 b 第 3817 條對同一位藝人的既有裁定**（池中 5/5 漢字、羅馬字 0，MB 實體本名漢字，Apple jp 漢字）。
    ⚠ **與 `渡辺貞夫` 是兩位不同的渡辺，下游引用「渡辺」務必帶全名**。

## 3911　⚠ `Mal Waldron & 日野皓正`（Reminicent Suite）——**第 307 條與第 3815 條打架，在此定案**

三方寫法：MB artist-credit「Mal Waldron **and** Terumasa Hino」（3f658e7f＋60d3fa1e，**Hino 的 MB 實體本名是漢字**）、
Discogs 盤面「Mal Waldron **-** Terumasa Hino」、**Apple jp「マル・ウォルドロン **&** 日野皓正」／us「Mal Waldron & TERUMASA HINO」（同一個 id1528699280）**。

**裁定取 `Mal Waldron & 日野皓正`**，逐項：

1. **次序**：四處一致 Waldron 在前，照盤面（先例 c-173 第 3715 條第 5 款 `Charlie Mariano & Sadao Watanabe` 也是照盤面取外國人在前）。
2. **日本人一方取漢字 `日野皓正`**：2026-08-11 東亞藝人名裁定＋第 307 條（池中漢字 9 列、羅馬字 0）。
3. ⚠ **外國人一方取羅馬字 `Mal Waldron`，不取 Apple jp 的片假名**——**這一點與第 3815 條的字面相反，理由是第 307 條優先**：
   第 3815 條第 2 款逐字是「外國人一方取盤面自己印的片假名，不是自造音譯」，但那一筆的 **Wolfgang Dauner 池中 0 張、沒有既有寫法可循**；
   **本筆的 Mal Waldron 池中已有 7 列**（Mal/2 1957、Left Alone 1959、Impressions 1959、The Quest 1962、Free at Last 1969，
   另有 `Mal Waldron & Steve Lacy —《Sempre amore》1987`、`Archie Shepp & Mal Waldron —《Left Alone Revisited》2002`），
   **改用片假名等於為一位池中已有七列的樂手新造一個分裂字串**，正是第 307 條逐字禁止的「絕不新造分裂」。
   **兩條規則衝突時取第 307 條**——第 3815 條要防的是「自造音譯」，本筆用的是池中既有寫法，不是自造。
4. **分隔符取 `&`**：照第 3764／3815 條（日本人＋外國人聯名）與池中先例 `日野皓正 & 菊地雅章`（c-153）、`Mal Waldron & Steve Lacy`、`Archie Shepp & Mal Waldron`。

**這是新的聯名字串，不是把 `Mal Waldron` 或 `日野皓正` 再劈一次**（第 964／196／197 明文允許）。
片假名、MB 的 `and` 串、Discogs 的連字號串三種全部進 `queryAlias`。

⚠ **外國藝人那一關也逐項核過**：本盤**沒有外國原盤**（Discogs companies 欄逐字「Recorded At: Victor Studio」、
notes 逐字「Recorded August 14, 1972 at Victor Studio, Tokyo」），是日本ビクター的企劃與錄音、日本唯一發行，
六名演奏者裡五名是日本樂手（日野皓正 tp／植松孝夫 ts／鈴木勲 b／日野元彦 ds／今村祐司 perc）。
**與第 3714／3787／3788／3804 條退掉的四筆的差別**：那四筆的演出主體整團是外國人，本筆是外國樂手加入日本樂團；
先例是 c-174 b 第 3815 條收的 `佐藤允彦 & ウォルフガング・ダウナー` 與 c-173 第 3764 條收的 `渡辺貞夫 & チャーリー・マリアーノ`。

## 3912　`猪俣猛`（Drum Method）——**取人名字串、不取 MB 的樂團字串，兩項訊號同向**

MB artist-credit 是 `猪俣猛とサウンド・リミテッド`（397912f7，Group），slice 照抄。**本卡取 `猪俣猛`**：

1. **盤面**：Discogs releases/10531589 的 artists 欄是 `Takeshi Inomata`（anv `T. Inomata`），
   **樂團是以 `Takeshi Inomata & Sound Limited = Backing Band` 的身分掛在 extraartists**；
2. **Apple jp 也把本盤掛成單獨的「猪俣猛」**（id1617242775）、us 是「Takeshi Inomata」；
3. **池中多數**：人名字串 `猪俣猛` 5 張（Drum Shot 1968、Drummer Man 1975、The Dialogue 1977、If I Were a Bell 1991，seed＋c-133）
   vs 樂團字串 `猪俣猛とサウンド・リミテッド` 2 張（c-131／c-133）。

三項同向，照第 307 條與 **第 3776 條（`富樫雅彦カルテット`→`富樫雅彦` 的同形狀）**。
⚠ **不動池中的樂團字串兩張**，第 964／196／197 允許並存，樂團字串進 `queryAlias`。
⚠ **同掛名的鼓主打盤池中已有兩張**（《Drum Shot》1968、《Drummer Man》1975），**盤名詞元相近但不是同碟**
（Apple us 一次查法同時回 Drum Method 1972-07-25／Drum Shot 1971-07-10／Exciting Drum Hits! 1969-11-10 三個不同 collectionId），
已在卡的 `risk` 寫明「行文引盤名務必帶年份與目錄號」。

## 3913　盤名：**第 2 類改判 1 筆、第 1 類等價形 2 筆、寫法差 3 筆**

**(a) 第 2 類（不同的題 → 真的改判）1 筆**：

| # | slice／MB RG title | 改判後 | 再發題的出處 | 原盤依據 |
|---:|---|---|---|---|
| 1 | `ドラム・メソード` | **`Drum Method`** | 2007-03-16 CD PCD-7287（MB release ac09bda9） | MB 最早 release c2fd0697（1972-07 Columbia **JDX-79**）title 逐字「Drum Method」；Discogs releases/10531589 同；**Apple jp／us 的 collectionName 也都是「Drum Method」**（id1617242775） |

**13 筆收件裡只有 1 筆要改判＝8%**——比 c-174 b 的 57%、c-174 a 的 0%、c-173 b 的 15% 都低。
⚠ **但第 1858-B 條的 `titleCheck` 欄在本組只抓到這一筆**（18 筆裡只有 #1 的 `note` 有警語），
**而真正的漏網是 #13**（見 3904：整個 RG 只建了 1974 年的再發，`titleCheck` 三欄一致、`note` 空白）。

**(b) 第 1 類（和文＝英文等價形，第 3793 條，不算改判）2 筆**：

| # | Discogs 盤面題 | 本卡採用 | 依據 |
|---:|---|---|---|
| 3 | `Daguri = ダグリ` | （退件，未入卡）池中既有取英文 `Daguri` | — |
| 9 | Discogs title `Lupus`／MB title `ルーパス` | **`ルーパス`** | 第 3793 條第 3 點的優先序「**MB 的原盤 release title ＞ 廠牌官方再發 ＞ Discogs Promo**」——MB 唯一的 release（20ec8c0c，1974 SPX-1029）title 就是片假名，與第 1858-B 條同向；Discogs 未建 master、無第三方可佐；`Lupus` 與 A1 曲名括號裡的 `狼座` 進 `queryAlias` |

**(c) 寫法差 3 筆**（照第 3780 條處理，不算改判）：

- **#11** `MAKI VI` → **`Maki VI`**（全大寫改一般大小寫；MB 最早 release a30d8e73 的 title 逐字就是 `Maki VI`）；
- **#12** `The Nearness Of You` → **`The Nearness of You`**（**Apple jp／us 兩地逐字**，英文曲名的標準寫法）；
- **#7** Discogs 的 title 欄尾端有一個多餘空格（`ギリシャについて書かれた本 `），本卡去掉。

⚠ **另記一筆「Apple 的盤名不可信」**：#7 的 Apple 兩地 collectionName 是 **「A Sunflower in Greece」**——
那是 A6 的曲名，而且 Apple 那一筆是 **15 軌的 2013 年 CD 再發**（原盤 12 軌）。
**與 c-174 b 第 3815 條的「Pianorogy」併看：用 Apple 定盤名之前要先確認它的軌數與原盤對得上。**

## 3914　年份：**18 筆全部回查原盤，改判 1 筆**——本線四批以來第一次

| slice `year` | 筆數 | Discogs 原盤年 | 差 |
|---|---:|---|---|
| 1972 | 3（TP-9531Z／JDX-79／SKD 135） | 1972 | **0** |
| 1973 | 6（MJ-7145／SMJX-10155／SPX-1028／CD4B-5043／JDX-7011／**SKK 3016**） | 1973，⚠ **SKK 3016 是 1973 年的再發，原壓是 1957 年的 LKB-7** | **1 筆改判** |
| 1974 | 6（SPX-1029／URG-4022／ETP-72011／JDX-7028／**YQ-7018-N**／SL-5102-N） | 1974（⚠ MB 把 1976 再發的 catno YQ-7041-N 填在 1974 這一筆上，年份仍對；⚠ SL-5102-N 本身是 1974，但它是 1969 年 XMS-10018-CT 的再發，見 3904，該筆已退件） | **0** |
| 1975 | 3（SJV-818~9／LF-91007／YQ-7511-N） | 1975 | **0** |

**唯一的改判：#8 `Jazz at the Torys` 1973 → 1957。** 三項依據：
(a) **Discogs master 1239767 的原壓是 King Records LKB-7、1957**（releases/10874884，系列欄「King Jazz Series」）；
(b) **MB 釘的那一筆（8cb392c4，King SKK 3016）在 Discogs（releases/12072244）的 formats descriptions 逐字含 `Reissue` 與 `Mono`**；
(c) **Apple jp 的條目 id1770435006（artistName「Big Four」）的 releaseDate 逐字是 1957-12-01、12 軌**。
→ 依第 91／95 條（rgMbid 不是年份來源）與簡報第二節第 3 點取 **1957**。

⚠ ⚠ **本卡因此落在 c-173 的年段（1958–1969），不是 c-175 的 1971–1975**——
**記在此供主線調度**：列舉層按 MB 的 first-release-date 切批，**MB 只建再發時整張碟會被切錯批**；
本線至今這是第一筆，c-176…c-182 若再遇到，**卡的年份仍以原盤為準、不要為了合乎批次年段改年份**。

⚠ **catno 反查的命中率**：18 筆全部先從 MB release 端點拿 catno、再用 Discogs `catno=` 反查，
**16 筆第一頁就命中原盤**（與 c-173 第 3725 條、c-174 第 3778／3813 條一致）；
未命中的兩筆是 **`SKD 135`**（被義大利噪音廠 Skull Dungeon 的 `SKD13xx` 整段稀釋，**第 1250 條「裸數字會撞」的第四次應驗**，
補救是加 `q=<掛名>`）與 **#0**（MB 那一筆根本沒有 catno，改用 `q=Dynamic Latin Exotic Sound` 一次命中）。

## 3915　`live`：**改判 3 筆，另有 1 筆反向不採信**——第 1864-B 條在本組中了四次

| # | 盤 | slice `live` | MB `secondary-types` | Discogs 證據 | 處置 |
|---:|---|---|---|---|---|
| 2 | 鳴門 | false | 空 | **notes 逐字「Recorded live April 25, 1972.」＋ companies 欄「Recorded At: Koseinenkin Kaikan」** | **改判 true** |
| 8 | Jazz at the Torys | false | 空 | **notes 逐字「Recorded June 17 - July 22, 1957, At The Tokyo Video Hall: Taken From The Radio Programme」＋ companies 欄「Recorded At: Video Hall, Tokyo」**（原壓與 1973 再發兩筆都有） | **改判 true** |
| 11 | MAKI VI | false | 空 | **notes 逐字「Recorded live 19 September 1974 at Kanda Kyōritsu Auditorium (神田共立講堂) in Tokyo.」＋ companies 欄「Recorded At: Kanda Kyoritsu Kodo」** | **改判 true** |
| 9 | ルーパス | **true** | **`["Live"]`** | **formats／notes／companies 三欄一個實況字樣都沒有**；Apple 兩地 0 筆 | ⚠ **不採信，本卡不寫成實況盤** |

⚠ **三筆漏標的盤名裡沒有任何「ライヴ」「実況」「at ○○」的字樣**——簡報第二節第 6 點建議的字面快篩在本組**三次全部無效**
（c-174 a 第 3779 條已測過一次）。**真正有效的來源是 Discogs 的 `notes` 與 `companies` 兩欄**，
本組三筆全部靠這兩欄查出來，**Apple 的條目名在本組一次都沒幫上忙**（與 c-174 a《Music Break》不同）。
⚠ **#9 是本線第一次「MB 標了 Live 但查不到佐證」的反方向**：第 1864-B 條逐字說 `live` 欄兩個方向都會漏，
**單一來源不足以定案**，本卡在 `risk` 保留 MB 的標記供下游覆核，**行文不得出現「實況」字樣**。
→ **給後七批**：`live` 的固定動作是**打開 Discogs `releases/<id>` 整筆、讀 `notes` 與 `companies` 兩欄**，
**MB 的 `secondary-types` 與 slice 的 `live` 兩欄都只能當提示**。

## 3916　廠牌欄：**3 筆與 slice 的 `house`／`entities` 不符，已照簡報第二節第 7 點改寫**

| # | slice `house`／`entities` | 盤面實際（Discogs `labels` 欄逐字） | 性質 |
|---:|---|---|---|
| 0 | コロムビア／**`NIPPONOPHONE`** | **Toshiba Records TP-9531Z**（1972 四聲道 LP） | ⚠ **MB 誤掛**：那一筆 release（55f7977d）**沒有國別、沒有載體、沒有 catno**，掛的 `NIPPONOPHONE` 實體在 MB 自己的 disambiguation 逐字寫著「specialty imprint for select anime and anime-adjacent music artists inside Japan」——**本盤其實是東芝盤**（仍在本線四家之內） |
| 10 | 東芝／`Toshiba Records` | **URC URG-4022**（1974） | **四家只出現在 1995 年的 CD 再發上** → 退件（3905） |
| 14 | コロムビア／`Columbia(JP)` | **Columbia YQ-7018-N**（1974-12 原壓）；MB 填的 `YQ-7041-N` 是 **1976 年的再發** | catno 層的誤填，年份未受影響 |

⚠ **`house` 與 `entities` 至此在本線有四種失效**：第 3714 條（外國原盤）、c-174 第 3784／3818 條（imprint 與母公司互掛、King 的 `SKK(x)` 用外國字標）、
本條的 **MB 誤掛到不相干的 imprint**、以及 3905 的 **非四家的日本獨立廠原盤**。
→ **後七批的固定動作：`label` 欄一律以 Discogs master 最早那一版的 `labels` 欄為準，不讀 slice 的 `house`／`entities`。**

## 3917　交件前自跑的結果

- `node batch-progress/c175/chk-prop.mjs b` → **13 張、11 位，標記 0**。
  ⚠ 「（報告）含日文分隔符」那一行本組**一次都沒有出現**（13 張的掛名與盤名都不含 `〜`／`～`／`＝`）。
  非 ASCII 連字號、U+30FC 誤用、合輯例外欄位三道也全部乾淨。
- `node batch-progress/dedup-crossbatch.mjs c175` → **跨批撞卡 0、同 rgMbid 不同掛名 0、同掛名盤名詞元包含 0、共用目錄號 0**
  （含 a 組 5 筆，合計 18 筆）。
- **第 315 條結算：13 收 ＋ 5 退 ＝ 18。✔**

## 3918　⚠ 簡報／判準與本批實際資料對不上的地方（彙整，供後七批與主線）

1. ⚠ ⚠ **`poolRecheck` v2 的「池中查無此藝人」仍然會漏，而且本組漏出一張真撞池**（3902）：
   派工信逐字寫「抽驗 `artistVariants` 長度 1 的列是 0/37，品質比 c-173／c-174 好很多」，
   **但出事的那一筆長度是 2**——`rgMbid` 反查到的是**編制型 Group 實體（`Kosuke Mine Quintet`）而不是人名實體（`峰厚介`）**，
   alias 全掃只掃到兩個羅馬字串。**判準應改成「`artistVariants` 裡沒有這位藝人的漢字本名 → 一律當成沒查過」**，不是看長度。
2. **`rg-tag` 的非爵士率在本年段是 8%**（13 筆中 1 筆），**是本線四批最低**；但**退件的 5 筆裡有 4 筆曲風是成立的**
   ——1971–1975 這一段的風險**從曲風移到了身分與重複**（3908）。
3. ⚠ **第 1858-B 條的 `titleCheck` 有一種它看不到的形狀**（3904）：
   **整個 RG 只建了再發**時，`rgTitle`／`earliestRelease`／`titlesSeen` 三欄完全一致、`note` 空白，
   **機器層看不出任何異常**——#13 因此差點被當成 1974 年的新碟收進來，實際是池中 1969 年那張的再發。
   **唯一的辦法是逐筆打開 Discogs master 的版本表看最早那一版。**
4. ⚠ **切批的年段會因為「MB 只建再發」而切錯**（3914）：#8 的原盤是 1957，卻被切進 1971–1975 這一批。
   **卡的年份以原盤為準，不要為了合乎批次年段改年份。**
5. **`live` 的字面快篩在本組三次全部無效**（3915），有效來源是 Discogs 的 `notes` 與 `companies`；
   **並且第一次出現反方向（MB 標 Live、查不到佐證）。**
6. **`house`／`entities` 在本線已有四種失效**（3916），其中 **MB 把 release 誤掛到不相干的 imprint（`NIPPONOPHONE`）是新的一種**。
7. ⚠ **「Apple 不可信」在本組又中兩次**：#7 的 artistName 把伴奏團併了進來（`岡沢 章 & 稲垣次郎とソウル・メディア`）、
   collectionName 用的是曲名（`A Sunflower in Greece`）而且是 15 軌的 CD 再發。
   **接 c-174 b 第 3815 條：用 Apple 定掛名或盤名之前，先確認它的 collectionName 與軌數對得上原盤。**
8. **附錄二第 2 點（Apple 403）在本工作階段第三次不成立**：`itunes.apple.com/search` 共打 **32 次**（jp 18／us 14），
   **32 次全部 HTTP 200，一次 403、一次 429 都沒有**。命中率：13 筆收件裡 **7 筆命中**
   （Drum Method／Reminicent Suite／Jazz at the Torys／ギリシャについて書かれた本（只有 2013 年的 15 軌 CD 條目）／The Nearness of You／Funky Steps／Endless Way），
   **6 筆查無**（Dynamic Latin Exotic Sound——只以掛名命中該團的六張目錄、本盤不在其中、鳴門、蘇、ルーパス、Maki VI、Introducing Jun Fukamachi；
   **村岡実 的樂團三張 Apple 一張都沒有，浅川マキ 的 1974 那一張也不在**）。
   **Apple 在本組是三次決定性的一票**：(a) 《Jazz at the Torys》的 1957-12-01 是年份改判的第三個來源；
   (b) 《Drum Method》的 jp artistName「猪俣猛」是掛名取人名串的第二個佐證；
   (c) 《The Nearness of You》的 jp artistName「弘田三枝子」是掛名取漢字的佐證。
9. **附錄二第 3 點再次成立**：`releases/<id>` 的整筆 credits 是必跑的——
   #1 的「Takeshi Inomata & Sound Limited = Backing Band」、#7 的「Jiro Inagaki & Soul Media = Performer」、
   #15 的逐軌分團標記、#2／#11 的 live notes、#8 的廣播節目 notes，**全部只存在於整筆，`search` 摘要看不到**。
10. **第 1839-B 條成立**：Discogs `search` 的結果混著 `master` 與 `release`（本組每一次 `catno=` 反查都同時回兩種），先讀 `type` 才沒打錯端點。
11. ⚠ **`Min'yō` 不在第 3753 條第 ① 款的清單裡**（① 逐字只列 `Easy Listening` 與 `Kayōkyoku`）——
    本組《蘇》的 styles 含 `Min'yō` 卻不觸發 ①，是靠 ② 進人工判的。
    **若主線想把 `Min'yō` 補進 ①，要一併注意它只會改變「進不進人工判」、不會改變結論**（③④ 才是充分理由）。

## 3919　本批沒有動到的東西（邊界自述）

只寫了 `batch-progress/c175/prop-b.json` 與本檔的 b 組段落（**寫入前重讀過本檔，只 append／未覆寫 a 組任何內容**）。
**未碰** `seed_cards.json`（唯讀掃描 17,248 列）、`apex_pool.json`、`PROJECT_MEMORY.md`、
`batch-progress/enum/*`、a 組的 `prop-a.json`、其他批次的任何檔案、KV、Firestore。
**未執行任何 git 指令**（不 add／不 commit／不 push／未動索引）。
中間檔全部在 scratchpad 的 `c175b/`（`slice-b.json`／`mb.json`／`dg.json`／`apple.json` 與
`mb.mjs`／`dg.mjs`／`dgrel.mjs`／`apple.mjs`／`poolscan.mjs`／`build1-3.mjs`）。
MB 全程 1 req/s、UA 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`，未遇 503；
Discogs 免 token、自我節流約 1 req/3s，未遇 429／503；Apple 32 次全部 200。
