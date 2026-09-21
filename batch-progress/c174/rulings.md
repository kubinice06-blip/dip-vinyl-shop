
---

# c-174 b 組裁定（3801–3830）

批次 c-174｜b 組 18 筆（1969–1971 年段；コロムビア 9・King 3・Victor 3・東芝 3）｜策展層｜2026-09-21
判準照 `batch-progress/CURATION-BRIEF-jp1.md`（2026-09-21 依 c-173 實測改過的新版）
→ `CURATION-BRIEF-bluenote-post1985.md`（含附錄二）→ `CURATION-BRIEF-bluenote.md` → `CURATION-BRIEF-c131.md`，**固定規格一字未改**。
曲風判準照 **c-173 b 組第 3753 條**（以 Discogs `styles` 為分水嶺），命中款次逐筆寫在各條。
**收 7、退 11｜盤名改判 4 筆、年份改判 0 筆｜本檔用到 3821。**

## 3801　本批結果總表

| # | slice 掛名 — 盤名 | 廠 | 處置 | 理由（命中條款） |
|---:|---|---|---|---|
| 1 | Monica Lassen & The Sounds — LA JOUISSANCE | コロムビア | 退 | 非爵士（3753 ①④，見 3803） |
| 2 | Monica Lassen & The Sounds — Woman!! | コロムビア | 退 | 非爵士（3753 ①④） |
| 3 | Roy Ayers Quartet — Unchain My Heart | コロムビア | 退 | 合輯＋外國藝人群組實體（3804） |
| 4 | Toshiyuki Miyama and His New Herd + M. Sato — 天秤座の詩 | コロムビア | **收** | → `宮間利之とニューハード + 佐藤允彦 —《Canto of Libra》`（盤名改判） |
| 5 | 稲垣次郎 — Yottsu No Onegai - Anata Nara Dosuru | コロムビア | 退 | 非爵士（3753 ①③，見 3805） |
| 6 | 川原正美とエキゾティック・サウンズ — 恍惚／エクスタシー | コロムビア | 退 | 非爵士（3753 ①，見 3806） |
| 7 | 村岡実 — Shakuhachi Rock 尺八ロック/艶歌編 | コロムビア | 退 | 非爵士（3753 ②③，見 3807） |
| 8 | 村岡実 — Shakuhachi Rock 尺八ロック/任侠編 | コロムビア | 退 | 非爵士（3753 ②③） |
| 9 | 村岡実 — Shakuhachi Rock 尺八ロック/和製ポップス編 | コロムビア | 退 | 非爵士（3753 ②③） |
| 10 | Sarah & Melody — Sound of Pacific | King | 退 | 非爵士（3753 ①②③，見 3808） |
| 11 | 横田年昭とビート・ジェネレーション — 太陽はまだ暑く燃えていた… | King | **收** | → `《Flute Adventure: Le Soleil Était Encore Chaud》`（盤名改判） |
| 12 | 村岡実 — バンブー | King | **收** | → `《Bamboo》`（盤名改判；邊界案，見 3819） |
| 13 | Mina Aoe — 懐かしの映画音楽を唄う | Victor | 退 | 非爵士（3753 ①，見 3809） |
| 14 | Petite M’amie — Girl Friend Baby Doll | Victor | 退 | 非爵士（3753 ①，見 3810） |
| 15 | The Freedom Unity — Down By The Naked City | Victor | **收** | 曲風無爭議，池中 0 張 |
| 16 | Kazumi Watanabe — Infinite | 東芝 | **收** | 掛名取池中漢字 `渡辺香津美`（見 3817） |
| 17 | Masahiko Sato and Wolfgang Dauner — Pianology | 東芝 | **收** | → `佐藤允彦 & ウォルフガング・ダウナー`（見 3815） |
| 18 | Yosuke Yamashita Trio With Brass 12 — イントロデューシング・タケオ・モリヤマ | 東芝 | **收** | → `山下洋輔トリオとブラス12 —《Introducing Takeo Moriyama》`（盤名改判） |

**第 315 條結算：`prop-b.json` 7 筆 ＋ 本表退件 11 筆 ＝ slice `g:"b"` 18 筆。✔**
`chk-prop b` 標記 **0**（7 張 7 位），`dedup-crossbatch c174` 跨批撞卡 **0**、同 rgMbid 不同掛名 **0**、共用目錄號 **0**。
**退件不補張**（簡報第二節第 2 點）。

## 3802　`poolRecheck` 逐筆人工比對結果：18 筆全部標「池中查無此藝人」，**但其中至少 1 筆是假陰性**

本組 18 筆的 `poolRecheck.status` **全部逐字是「池中查無此藝人（同義字串全掃過）」**，
沒有一筆是「同藝人在池中，盤名不同——逐張人工比」，`artistAlbumsInPool` 全部是空陣列。
依簡報第一節，這代表 18 筆都「可以直接做」。**實掃的結果不是這樣。**

自行以 chk-prop 同一把正規化鍵（`&`→`and`、剝非文數字）子字串掃
`seed_cards.json`（17,248 列）＋`desc-tools/batches/cards/*.json`＋各批 `prop-*.json`（合計索引 **28,770 列**），
**每個掛名的漢字、羅馬字、片假名三種寫法都試過**，結果：

| slice # | 掛名 | `poolRecheck` 說 | 實掃結果 |
|---:|---|---|---|
| 13 | `Mina Aoe` | 池中查無此藝人 | ⚠ **假陰性**：池中有 `青江三奈` **2 張**（《青江三奈ブルースを唄う》1968、《盛り場流し歌》1969，c-103 b） |
| 5 | `稲垣次郎` | 池中查無此藝人 | ⚠ **同一人在池中 7 張**，只是掛名字串不同：`稲垣次郎とソウル・メディア` 5 張＋`Jiro Inagaki and Soul Media` 2 張（含 apex《Funky Stuff》1975），另 c-173 b 收的 `前田憲男 & 稲垣次郎オールスターズ` 1 張 |
| 4 | `Toshiyuki Miyama…+ M. Sato` | 池中查無此藝人 | ⚠ 兩位當事人池中各 7 張（`宮間利之とニューハード`／`佐藤允彦`），只是聯名字串沒有 |
| 16 | `Kazumi Watanabe` | 池中查無此藝人 | ⚠ 池中 `渡辺香津美` **5 張**（1977–1981） |
| 17 | `Masahiko Sato and Wolfgang Dauner` | 池中查無此藝人 | ⚠ 池中 `佐藤允彦` **7 張** |
| 18 | `Yosuke Yamashita Trio With Brass 12` | 池中查無此藝人 | ⚠ 池中 `山下洋輔トリオ` **6 張**＋`山下洋輔` 1 張 |
| 7–9、12 | `村岡実` | 池中查無此藝人 | c-173 a 剛收 1 張（`c173/prop-a.json`＋`c173-cards.json`，尚未上線）；另有**同姓不同人**的 `村岡建` 3 張 |
| 其餘 6 筆 | — | 池中查無此藝人 | 實掃一致，確實 0 張 |

⚠ ⚠ **成因（給後八批）**：`jp1-pool-recheck.mjs` 比對的是 **MB 藝人實體的同義字串集合與池中掛名字串的相等關係**，
所以 (a) **MB 的 `artistVariants` 沒收進漢字寫法時會整筆漏掉**——slice #13 的 `artistVariants` 逐字只有
`["Mina Aoe"]`，**連 `青江三奈` 都沒有**，於是池中那兩張完全掃不到；
(b) **同一人以不同編制／樂隊字串在池中的，一律判成「查無」**（稲垣次郎、山下洋輔トリオ、佐藤允彦 都是這個形狀）。
→ **「池中查無此藝人」只能讀成「這個字串在池中沒有出現」，不能讀成「這位藝人的碟池中沒有」。**
本組 18 筆**逐筆自行掃過池**，結論是**沒有一筆真的撞卡**（撞的是同一人的別張碟，那是正當的目錄深度），
但**假陰性的機制與 c-173 第 3712／3750 條不同**，後八批不可因為整批都標「查無」就省掉人工掃池。

---

## 退件（11 筆）

## 3803　退：`Monica Lassen & The Sounds —《Woman!!》`（rg b9904cc3）與`《LA JOUISSANCE》`（rg d96a0abe）
兩張都是日本コロムビア 1970–71 年掛北歐假名的エロ・ムード企劃盤，池中 0 張。
- **《Woman!!》**（Columbia YS-2346-AX，1970，Discogs releases/5469815）：genres `Jazz/Funk, Soul/**Stage & Screen**`、
  styles **`Easy Listening`／Jazz-Funk／Soundtrack**；盤面題逐字是 **《愛撫》**，obi 把掛名寫成「モニカ・ラッセンとザ・サウンズ」；
  九軌的曲名是 Three Women／Love Touch／Whimper／Incitation／Double Bed／Enjoy Time。**判準 3753 第 1 條。退。**
- **《LA JOUISSANCE》**（Columbia YS-2521-AX，Discogs releases/13011880）：1971 原壓的 styles 欄是空的，
  **但同一個 master 1481622 底下的 2015 CD（BRIDGE-223，releases/11711946）styles 逐字是 `Novelty`／`Easy Listening`／`Jazz-Funk`**，
  盤面題《たわむれ》，十二軌裡半數是原創的情境曲（Dalliance In Wave／Embrace Ment／A Lodge Of Joy），
  其餘是 Time Of The Season、The Gentle Rain、Du Soleil Plein Les Yeux 等翻唱。
  **判準 3753 第 1 條（master 層）＋第 4 條（這個團在 Discogs 只有這兩張，整份目錄就是エロ・ムード）。退。**
⚠ **操作結論**：**原壓 release 的 `styles` 欄是空的時候，要往 master 與同 master 的再發版看一次**——
Discogs 的 style 常常只填在再發那一筆上，只讀原壓會漏掉分水嶺。

## 3804　退：`Roy Ayers Quartet —《Unchain My Heart》`（rg 038e4586）——**合輯，而且是第 3714 條「外國藝人群組實體」的第二個實例**
Discogs releases/13839371（Columbia YS-2276-AX，1970-03）：genres 只有 `Jazz`、styles 空——**曲風那一關其實過得了**，
退的是另外兩項：
1. **Discogs `formats` 的 descriptions 逐字含 `Compilation`**（`["LP","Album","Compilation"]`），而 **MB 的 `secondary-types` 是空的**
   ——第 397 條與 c-173 第 3718 條的同一形狀。內容是從日本コロムビア 1969 年的
   **45 轉直刻系列《Herbie Mann Presents Comin' Home Baby Roy Ayers Quartet 1》（45PX-2008-AX）** 等盤集出來的六軌
   （Unchain My Heart／Comin' Home Baby／A Man And A Woman／Scarborough Fair／If I Were A Carpenter／All Blues）。
2. **四名樂手全是外國人**：Roy Ayers（vib）、Miroslav Vitous（b）、Sonny Sharrock（g）、Bruno Carr（ds），
   當時是 Herbie Mann 樂團的班底。列舉檔沒標 `foreignArtist`，因為 **`Roy Ayers Quartet` 是 Group 型實體、沒設 area**
   ——**c-173 第 3714 條（The Cecil Taylor Quartet）預告的形狀，在本批第二次發生。**
⚠ **與第 3714 條的差異要記一筆**：Cecil Taylor 那張的原盤是美國 Contemporary，本張**沒有外國原盤**——
Discogs releases/5244163 的 companies 欄逐字「Recorded At: Nippon Columbia Studio」、notes 逐字
「Recorded at Nippon Columbia's Studio, Tokyo, Japan on July 6, 1969」，**是日本コロムビア自己的錄音與自己的企劃**。
**所以退件的第一理由是合輯，不是「日本壓片」**；外國藝人只是第二理由。
若主線日後要立「外國藝人在日本錄的本土企劃盤」這一支，這張與那套 45 轉直刻系列是起點，**但本線不收**。
⚠ 順帶：池中 `Roy Ayers` 掛名 13 張（Ubiquity 系列為主，1972–1979），**本盤與那 13 張無一重疊**，退的不是重複。

## 3805　退：`稲垣次郎 —《Yottsu No Onegai - Anata Nara Dosuru》`（rg 27198e81）
Discogs releases/7852846（Columbia **ALS-4501**，1970-04）：genres `Jazz/Pop`、style **`Easy Listening`**；
**盤面題逐字是《四つのお願い》**（MB 的羅馬字長題是把 A1 與 B1 兩首曲名串起來的，**MB 這一筆 release 連 catno 都沒有、status 是 `None`**）。
十四軌**全部**是 1970 年的歌謡曲熱門（四つのお願い／経験／逢わずに愛して／白い蝶のサンバ／あなたならどうする／別れのサンバ…），
編曲河村利夫、伴奏新室内楽協会，**共演是演歌吉他的代表人物木村好夫**——與 c-173 第 3758 條退掉的《演歌の祭典》同一位。
**判準 3753 第 1 條與第 3 條。退。**
⚠ **這一筆最容易被翻案，理由寫足**：稲垣次郎本人是正牌爵士樂手，**池中已有 8 張**
（`稲垣次郎とソウル・メディア` 5 張、`Jiro Inagaki and Soul Media` 2 張含 apex《Funky Stuff》、
c-173 b 收的 `前田憲男 & 稲垣次郎オールスターズ`《This Is Jazz-Rock》1 張）。**退的是這張碟、不是這個人**
（c-173 第 3721 條末段的同一句話）。對照池中的《Jazz & Rock "Out"》（1970）：同樣是翻唱盤，
但那張的曲目是英美曲、Discogs style 不含 Easy Listening——**兩者在 3753 底下分得開，不是雙重標準。**
⚠ 掛名補記：若日後有人要收這張，**它的掛名是 `稲垣次郎, 木村好夫` 的雙人聯名，不是 `稲垣次郎とソウル・メディア`**，
收進來會為兩位各新造一個分裂字串（第 307 條反面），這也是退件的附帶理由。

## 3806　退：`川原正美とエキゾティック・サウンズ —《恍惚／エクスタシー》`（rg 61927b71）
Discogs releases/5469746（Columbia YS-10077-J，1970-03，盤面題 **《Ecstasy》**）：genres `Jazz/Funk, Soul/Pop`、
styles **`Novelty`／`Easy Listening`／Jazz-Funk**。曲目十二首是 Temptation／Taboo／Jungle Drums／The Voodoo／
Flamingo／Poinciana 這類 exotica 標準曲加兩首自作（Hombre Y Mujer／Swahili），
2007 年由專做日本エロ・ムード復刻的 **Tiliqua Records（TILAR-5009）**再發——**與 3803 的 Monica Lassen 同一條產品線、同一個復刻廠。**
**判準 3753 第 1 條（＋第 4 條）。退。** 池中 `川原正美` 0 張。

## 3807　退：`村岡実 — Shakuhachi Rock 尺八ロック` **三張全退**（艶歌編 rg cb1e0553／任侠編 rg d4d473e7／和製ポップス編 rg 4817ea95）
日本コロムビア 1970 年的同一套企劃（HS-10017-J／HS-10022-CT／HS-10026-CT），掛名逐字是
**`村岡 実 & ザ・ライフシアターズ`**（MB 只寫了 `村岡実`）。三張的 Discogs genres **都含 `Folk, World, & Country`**：

| 編 | Discogs | genres / styles | 曲目 |
|---|---|---|---|
| 艶歌編 | releases/8777855 | Jazz/Rock/Funk, Soul/**Folk, World, & Country**；Folk／Jazz-Funk／Jazz-Rock | 十二首全是演歌（夢は夜ひらく、湯の町エレジー、カスバの女、女のブルース、新宿の女…） |
| 任侠編 | releases/11659981 | 同上；Jazz-Rock | 十二首全是任侠映画主題歌（唐獅子牡丹、網走番外地、人生劇場、王将…） |
| 和製ポップス編 | releases/8777903 | 同上；Folk／Jazz-Funk／Jazz-Rock | 十二首全是 GS／和製ポップス（ブルー・シャトウ、帰って来たヨッパライ、君といつまでも、シーサイド・バウンド…） |

**判準 3753 第 2 條（genres 含 Folk, World, & Country）與第 3 條（曲目過半是日本歌謡曲／演歌，實際是全部）。三張全退。**
⚠ **與同一位藝人的《Bamboo》（收）分得開**：這三張是「用尺八吹日本歌謡曲」的分類企劃（編名自己就寫著艶歌／任侠／和製ポップス），
《Bamboo》是「用尺八吹 Take Five 與英美曲加原創」——**分界正好落在曲目來源，不是樂器**。
⚠ 附記：和製ポップス編那張的 Discogs notes 逐字寫著封面印有 **「Takt Jazz Series」** 與 **「New Stream in Jazz」** 的字樣
——**原廠自己把它歸進爵士線，但曲目與 Discogs 分類都不支持**。**盤面的系列名不是曲風證據**，這一點後八批要記住
（c-173 第 3728 條曾把「原廠和Jazz Reissue Series」當成一層證據，**那是再發時的歸類，與首發時的系列名不是一回事**）。

## 3808　退：`Sarah & Melody —《Sound of Pacific》`（rg 9695ff56）
Discogs releases/10534178（**King Records SKK(R)-635**，1970）：genres `Jazz/Pop/**Folk, World, & Country**`、
styles **`Easy Listening`／Fusion**。notes 逐字兩件事：
(a)「The songs were originally Japanese folk songs/minyo that were given new lyrics in English.」
——**十二軌是日本民謡填上英文詞的女聲演唱**（Fujiyama Yei Yei／Old Kiso Valley／Coal Miner's Song＝木曽節與炭坑節一類）；
(b)「This release was an experiment by King Records to test consumer responses to gimmicks (splattered vinyl) and
eliminating shrinkwrap」——**是 King 拿來試水溫的彩膠＋塑膠外盒企劃品**。
**判準 3753 第 1／2／3 條三條都中。退。** 與 c-173 第 3721 條退掉的《More Echoes Of Japan》（King SKC 5，民謡＋大樂團）同形狀。

## 3809　退：`Mina Aoe —《懐かしの映画音楽を唄う》`（rg 09f44a25）
Discogs releases/10408029（Victor **SJX-76**，1971，盤面題逐字 **《懐しの映画音楽を唄う》**——比 MB 少一個「か」）：
genres `Jazz/Latin/Pop/**Stage & Screen**`、styles **`Kayōkyoku`**／Tango／Vocal。
青江三奈是歌謡曲歌手，本盤十二軌是她唱的懷舊電影歌（巴里の屋根の下／小さな喫茶店／上海リル／印度の唄／煙が目にしみる）。
**判準 3753 第 1 條（styles 含 Kayōkyoku）。退。**
⚠ **兩件附帶事實**：(a) **這一筆的 `poolRecheck` 是假陰性**（見 3802）——池中本來就有 `青江三奈` 2 張，
而且那兩張在 c-103 b 的 genres 記的是 `world`＋`pop`，**池自己就沒把她當爵士**；
(b) 盤名若要收，得照盤面改判成《懐しの映画音楽を唄う》——本筆退件，改判不入卡。

## 3810　退：`Petite M’amie —《Girl Friend Baby Doll》`（rg 57cc813d）——**第 3717 條（Victor `SJV-` 是ムード系列）在本批再次應驗**
Discogs releases/13281771（**Victor SJV-511**，1971）：genres `Jazz/Pop`、styles **`Novelty`／`Easy Listening`**。
extraartists 逐字是「Keiko Mari = Vocals」「Mitsuru Kotani = Music By, Arranged By」「Norikazu Okada = Lyrics By [Sound Illust.]」
——**作詞欄的角色逐字寫成「Sound Illust.」**，曲名是 Splendor／Make-Love／Drive／Coffee／Wine／Shower／Date-Time，
與 3803 的 Monica Lassen 是同一種エロ・ムード企劃。
**判準 3753 第 1 條。退。** ⚠ 同時是 c-173 第 3717 條的驗證：**`SJV-` 號段到 1971 年仍然是ムード線**
（本批的 SJV-511 與 c-173 的 SJV-111／227／303 同一條產品線），**後八批看到 `SJV-` 要提出逐張的爵士證據才收**。
⚠ 掛名 `Petite M’amie` 含 **U+2019 右單引號**（slice 逐字照抄），若日後收進來要注意它與 ASCII `'` 的比對
（c-173 第 3747 條《Feelin’ Good》同一形狀，chk-prop 的正規化會剝掉、但外部查詢不會）。

## 3811　`why` 欄逐筆覆核結果（18 筆全表）

| slice # | `why` | 覆核結論 | 處置 |
|---:|---|---|---|
| 1 | rg-tag | **不成立**：エロ・ムード | 退 |
| 2 | rg-tag | **不成立**：エロ・ムード | 退 |
| 3 | rg-tag | 爵士（成立） | 退：合輯＋外國藝人 |
| 4 | rg-tag | 成立（Discogs Big Band／Avant-garde Jazz） | **收** |
| 5 | **artist-tag** | **不成立**：歌謡曲 | 退 |
| 6 | rg-tag | **不成立**：exotica／ムード | 退 |
| 7 | rg-tag | **不成立**：演歌 | 退 |
| 8 | rg-tag | **不成立**：任侠映画主題歌 | 退 |
| 9 | rg-tag | **不成立**：和製ポップス | 退 |
| 10 | rg-tag | **不成立**：民謡英語詞企劃 | 退 |
| 11 | rg-tag | 成立（Discogs Free Jazz／Soul-Jazz／Jazz-Rock） | **收** |
| 12 | rg-tag | 成立（邊界案，見 3819） | **收** |
| 13 | rg-tag | **不成立**：歌謡曲 | 退 |
| 14 | rg-tag | **不成立**：ムード | 退 |
| 15 | rg-tag | 成立（Discogs Free Jazz／Modal／Post Bop） | **收** |
| 16 | rg-tag | 成立（Discogs Jazz／Fusion） | **收** |
| 17 | rg-tag | 成立（Discogs Jazz，styles 空） | **收** |
| 18 | rg-tag | 成立（Discogs Post Bop／Free Jazz／Avant-garde Jazz） | **收** |

**`rg-tag` 17 筆裡 9 筆不成立（53%）；`artist-tag` 1 筆不成立。本組沒有出現
`artist-search-tag`／`artist-disambig`／`pool-jazz-artist`／`imprint`／`curator-list` 五種值。**
⚠ **53% 比 c-173 a 組的 31% 與 b 組的 44% 更高**，第 3752／3724 條的結論在本年段只有更嚴重。
**快篩仍然有效**：本組 9 筆非爵士裡有 **7 筆**的 MB RG genres 是 `jazz(1)` 與 `easy listening(1)`／`pop(1)`／`folk(1)` 並列，
而 7 筆收件裡有 **6 筆**的 RG genres **全部是爵士系標籤、沒有任何非爵士標籤並列**
（唯一的例外是《Bamboo》，它的 genres 欄只有 `jazz(1)`、非爵士的字眼只出現在 tags 的 `shakuhachi`）。
→ **「RG genres 有沒有非爵士標籤並列」在本年段是一道 13/18 就能分對的快篩**，但**仍然只能拿來排序、不能拿來定案**。

## 3812　**盤名改判 4 筆**（前後與依據逐筆）

| # | slice／MB RG title | 改判後 | 再發題的出處 | 原盤依據 |
|---:|---|---|---|---|
| 4 | `天秤座の詩` | **`Canto of Libra`** | 2019-08-07 數位再發 Columbia CORR-11162（MB release 6c63ba39） | 1970 原盤 MB release 4e4a9a9b 與 Discogs releases/5617899（Columbia **NCB-7001**，©70・12）title 逐字「Canto of Libra」；Discogs 盤面題記作「Canto Of Libra = 天秤座の詩」（英文題在前）；Apple jp／us id1474202475 亦「Canto of Libra」 |
| 11 | `太陽はまだ暑く燃えていた…` | **`Flute Adventure: Le Soleil Était Encore Chaud`** | 2007／2012 CD 再發 King KICS-2536／KICJ 2288 | 1970 原盤 MB release 14237ca0 與 Discogs releases/5055288（**London Records SKK(L)3005**）title 逐字「Flute Adventure: Le soleil était encore chaud (太陽はまだ暑く燃えていた…)」；Discogs **七個版本全部**把法文題排在前；Apple jp id1777009896 亦法文題 |
| 12 | `バンブー` | **`Bamboo`** | 2007-03-07 CD 再發 King KICS-2535（MB release 084c0369） | 1970 原盤 MB release 29ee1f74 與 Discogs releases/3212467（**United Artists SKK(U) 3001**）title 逐字「Bamboo」；Discogs 盤面題「Bamboo = バンブー」；Mr Bongo 三個再發版一律用「Bamboo」 |
| 18 | `イントロデューシング・タケオ・モリヤマ` | **`Introducing Takeo Moriyama`** | 2013-07-27 CD 再發 SUPER FUJI DISCS FJSP-208（MB release 2bf010ce） | 1971 原盤 MB release 8f25b803 與 Discogs releases/7265634（**Express ETJ-9001**）title 逐字「Introducing Takeo Moriyama」；Discogs 盤面題「Introducing Takeo Moriyama = イントロデューシング・タケオ・モリヤマ」 |

**7 筆收件裡 4 筆要改判盤名＝57%**，比 c-173 b 組的 15% 高出一大截。
⚠ **本年段的形狀與 c-173 不同**：c-173 是「MB 建了再發、RG title 取自再發」，
**本組四筆的 MB 底下原盤與再發都建了，RG title 卻一律取了再發那一筆**——
**MB 的 release-group title 在這條線上與轄下最早的 release title 經常不一致**，
**唯一可靠的讀法是打開 release 端點、讀年份最早那一筆的 `title`**，不要讀 RG 的 title。
另外兩筆退件也是同一形狀（#5《Yottsu No Onegai - Anata Nara Dosuru》盤面是《四つのお願い》、
#13 盤面是《懐しの映画音楽を唄う》），**18 筆裡共 6 筆（33%）的 RG title 不是原盤題。**

## 3813　年份：18 筆全部回查原盤年，**改判 0 筆**——但 MB 的日期欄有另一種錯法

逐筆用 Discogs master／release 反查（簡報第四節：本線 slice 無 catno，改用 Discogs 反查；本組實際上是先從
MB release 端點拿到 catno，再用 `catno=` 反查，**18 筆裡 16 筆第一頁就命中原盤**，命中率與 c-173 第 3725 條一致）：

| slice `year` | 筆數 | Discogs 原盤年 | 差 |
|---|---:|---|---|
| 1970 | 12 | 1970（YS-2346-AX／YS-2276-AX／NCB-7001／ALS-4501／YS-10077-J／HS-10017-J／HS-10022-CT／HS-10026-CT／SKK(R)-635／SKK(L)3005／SKK(U) 3001） | **0** |
| 1971 | 6 | 1971（YS-2521-AX／SJX-76／SJV-511／SMJX-10116／ETP-9038／ETP-9030／ETJ-9001） | **0** |

**18／18 一致，一筆都不改判。** 第 3722／3770 條「年份風險被高估」的結論在本年段第三次成立。
⚠ **但有一個新的錯法要記**：**slice #16《Infinite》的 MB first-release-date `1971-05-19` 是錄音日，不是發行日**
——Discogs releases/6876739 的 notes 逐字「Recorded at Teichiku Studio **19, May, 1971**」、`released` 欄是 **1971-09-25**。
年份同為 1971、不影響 `year`，**但下游若拿 MB 的日期當發行日寫進文案就錯了**，已寫進卡的 `risk`。
⚠ 另有兩筆「slice 年份與 Discogs master 年份差一年」的雜訊：
《LA JOUISSANCE》slice 記 1970、Discogs master 1481622 記 1971（同號原壓 releases/13011880 亦 1971）；
本筆已退件，不影響交件，但**後八批若遇到同號原壓與 slice 差一年，要以 Discogs 原壓那一筆為準**。

---

## 掛名（7 筆收件）

## 3814　`宮間利之とニューハード + 佐藤允彦`（Canto of Libra）
三方寫法都不同：MB artist-credit「宮間利之と**ニュー・ハード**+佐藤允彦」（實體本名卻是 `宮間利之とニューハード`）、
Discogs 盤面「Toshiyuki Miyama And His New Herd **+** M. Sato ＝ ニュー・ハード + 佐藤允彦」、
Apple jp「宮間利之とニュー・ハード **&** 佐藤允彦」。
**裁定取 `宮間利之とニューハード + 佐藤允彦`**：
1. 團名部分照第 307 條取**池中既有字串**（`宮間利之とニューハード`，池中 7 張，**無中黑**，與 MB 實體本名一致）；
2. 分隔符取 **`+`**——盤面、MB joinphrase、Discogs 三處都是 `+`，池中「團＋個人」的先例也是 `+`
   （`森山浩二 + 山本剛トリオ`、`北村昌士＋PHONOGENIX`，c-173 第 3765 條所列）；
3. **Apple jp 的 `&` 不跟**，因為它連團名寫法（ニュー・ハード）都與池中不同，跟了會一次造出兩個分裂。
**這是新的聯名字串，不是把 `宮間利之とニューハード`（7 張）或 `佐藤允彦`（7 張）再劈一次**——第 964／196／197 明文允許並存。

## 3815　`佐藤允彦 & ウォルフガング・ダウナー`（Pianology）——⚠ 又一次「只取名／只取一方」的寫法要處理
MB artist-credit 是羅馬字「Masahiko Sato」＋joinphrase「 and 」＋「Wolfgang Dauner」；
Discogs 盤面的日文對照逐字「佐藤允彦 **と** ウォルフガング・ダウナー」；
**Apple jp（id720367684）只掛單獨的「佐藤允彦」，而且把盤名寫成錯字「Pianorogy」**。
**裁定取 `佐藤允彦 & ウォルフガング・ダウナー`**，理由：
1. 日本人一方照 2026-08-11 東亞藝人名裁定＋第 307 條取池中多數漢字 `佐藤允彦`（**池中 7/7 漢字、羅馬字 0**）；
2. 外國人一方取**盤面自己印的片假名** `ウォルフガング・ダウナー`，不是自造音譯；
3. 分隔符照 **c-173 第 3764 條**（`渡辺貞夫 & チャーリー・マリアーノ`）——**本線唯一同形狀（日本人＋外國人聯名）的既有裁定**。
⚠ **Apple 這一次不可信**（掛名漏了共演者、盤名是 l／r 誤植），**與 c-173 第 3770 條併記第 6 點「Apple 在本線是可用的第三方掛名來源」相反**
——後八批用 Apple 定掛名之前，**要先確認它的 collectionName 與盤面題對得上**；對不上的時候整筆都不要採信。

## 3816　`山下洋輔トリオとブラス12`（Introducing Takeo Moriyama）
MB artist-credit「山下洋輔トリオ」（404e6f08）＋joinphrase「**と**」＋「ブラス12」（023abeb9，MB 本名 Brass 12），
Discogs 盤面對照「山下洋輔トリオ **と** ブラス 12」。**取 `山下洋輔トリオとブラス12`**（與 MB artist-credit 逐字相同）：
`と` 是池中日本樂團聯名的多數寫法（`ジョージ川口とビッグ4`／`宮間利之とニューハード`／`原信夫とシャープス・アンド・フラッツ`／
`横内章次とクインテット・プラス・ラテン`）。**數字用半形 `12`，不取 Discogs 盤面「ブラス 12」中間那個空格**，避免與 MB 字串分裂。
⚠ **不與池中 `山下洋輔トリオ`（6 張）合併，也不掛在 `森山威男`（3 張，含 apex:pearl《East Plants》1983）名下**——
這是三重奏加十二人銅管的一次性擴編字串，照第 964／196／197 與 c-173 第 3715 條第 3 款並存。

## 3817　其餘四筆掛名（照原字串或池中字串，無新造分裂）
- **`村岡実`**（Bamboo）：沿用 c-173 a 組第 3715 條第 4 款立的字串。⚠ **Apple jp 寫成「村岡 実」（中間半形空格），不跟**；
  ⚠ **池中的 `村岡建`（Takeru Muraoka，3 張，c-133 b）是另一位樂手，絕不可合併**。
- **`渡辺香津美`**（Infinite）：MB artist-credit 顯示羅馬字「Kazumi Watanabe」，**但 MB 實體本名（9a93b39f）就是漢字**；
  照 2026-08-11 裁定與第 307 條取漢字（**池中 5/5 漢字、羅馬字 0**）。⚠ 與 c-173 第 3763 條 `渡辺貞夫` 是**兩位不同的渡辺**，
  下游引用「渡辺」務必帶全名。
- **`横田年昭とビート・ジェネレーション`**（Flute Adventure）：MB artist-credit 與 Apple jp（id1777009896）逐字相同，
  池中 0 張，照原字串新立。MB 的第二實體本名是英文 `The Beat Generation`，**但盤面與 Apple 都用片假名**，取片假名。
- **`The Freedom Unity`**（Down By The Naked City）：**團名本身是英文、沒有漢字**，照 c-173 第 3715 條第 2 款
  （`Modern Jazz Playboys` 的先例）取原字串；Discogs 的片假名對照 `ザ・フリードム・ユニティ` 只進 `queryAlias`。
  ⚠ 這是英文團名，依第 3714／3804 條**已回核原盤廠牌**：Victor World Group SMJX-10116、日本壓片、五名樂手全是日本人，
  **是本家原盤，可收**。

## 3818　⚠ 廠牌欄：**King 1970 年的 `SKK` 系列用外國字標發行，`house` 與盤面對不上**（簡報第二節第 7 點的本批實例）
本組兩張收件的 King 盤，**盤面印的 imprint 都不是 King**：

| 卡 | slice `house`／`entities` | 盤面（Discogs `labels` 欄逐字） | 公司欄 |
|---|---|---|---|
| 村岡実《Bamboo》 | King／KING | **United Artists Records SKK(U) 3001**（系列名 New Emotional Work Series） | Record Company: Liberty/UA, Inc.；Copyright (c) / Manufactured By: **King Record Co. Ltd** |
| 横田年昭《Flute Adventure…》 | King／KING | **London Records SKK(L)3005**（宣傳盤同樣印 New Emotional Work Series） | Manufactured By: **King Record Co. Ltd** |

→ **同一條 `SKK` 號段，用括號裡的字母區分授權字標**（(U)=United Artists、(L)=London、(R)=King 自己的 SKK(R)-635）。
`label` 欄照簡報第二節第 7 點寫盤面實際廠牌＋目錄號，King 寫進說明。
**後八批遇到 King 的 `SKK(x)` 盤一律要回查 Discogs 的 labels 欄，不能照 `house` 寫成 King。**
同理，Victor 的《Down By The Naked City》盤面 imprint 是 **`Victor World Group`**（不是 slice `entities` 的「Victor(JP imprint)」），
東芝的兩張是 **`EXPRESS`**（Express Jazz Series），日本コロムビア的《Canto of Libra》是 **`Columbia` NCB-7001**（MS Master Sonic 系列）。

---

## 3819　⚠ ⚠ 邊界收件：`村岡実 —《Bamboo》` 為什麼在第 3753 條第 1／2 款字面成立的情況下仍然收

**事實**：Discogs master 537797（與 1970 原壓 releases/3212467、2019 Mr Bongo releases/13629593 三處一致）
的 genres 是 `Jazz` ＋ **`Folk, World, & Country`**、styles 是 **`Easy Listening`**／`Jazz-Rock`／**`Min'yō`**
——**第 3753 條第 1 款與第 2 款字面上都中，照條文應該退。**

**四項反證：**
1. **第 3 款明確不成立**：九軌裡日本傳統素材只有〈最上川船唄〉**一首民謡**（不是歌謡曲、不是演歌），
   其餘是〈テイク・ファイブ〉、〈陰と陽〉（池田孝原創，9:23）、〈ソウル・バンブー〉（山木幸三郎原創）與
   And I Love Her／The House Of The Rising Sun／Do You Know The Way To San Jose／Call Me／Scarborough Fair。
   **「過半是歌謡曲」的門檻連邊都沒沾到。**
2. **第 4 款明確不成立**：村岡実是尺八演奏家，目錄橫跨邦樂與爵士，**不是ムード・テナー那種職業配方**
   （對照 c-173 第 3754 條的松浦ヤスノブ：整份目錄是`ムード・キングス`／`Special Pink Mood Deluxe`／`恍惚のテナー・デラックス`）。
3. **同一條線的先例**：c-173 a 組第 3721／3728 條收的 `村岡実 —《Harlem Nocturne》`（**同一位藝人、同一套「尺八吹爵士標準曲」的配方**）
   的 **Discogs style 給的正是單一個 `Easy Listening`**，那一批仍判收，依據是 MB RG 的多標籤與原廠的爵士再發線。
   **本盤的機器證據比那張更強**：MB RG **genres 欄只有 `jazz(1)`**、tags 另有 `shakuhachi`／`japanese jazz;shakuhachi`／`rare groove a to z`，
   **沒有任何 easy listening 並列**（第 3752 條第 3 款要的形狀）。
4. **再發線的性質**：再發它的是專做 rare groove 的英國 **Mr Bongo**（2019 LP／CD、2019-05-24 數位、2021 再壓）
   與 King 自己的爵士復刻線（KICS-2535／KICJ 2286），**不是ムード復刻廠**
   （對照 3806 的川原正美：再發廠是專做日本エロ・ムード的 Tiliqua Records）。

**裁定：收。** 卡的 `risk` 已逐字寫明「`Easy Listening`／`Min'yō` 兩個 style 來自尺八這件樂器與那一首民謡、不是碟的實質」，
並要求行文寫成尺八跨界盤、不得寫成純粹的硬派爵士。
**可逆性**：改的是收退名單與卡單值，不動卡池結構——照裁定權下放的第 2 條（可逆）與第 1 條（有先例）直接定，不上呈。

### 對第 3753 條的修正建議（供 c-175…c-182 與主線）
第 3753 條四款是 **OR** 關係（任一成立即退），本批實證**這在「日本傳統樂器演奏爵士」這一類碟上會誤殺**：
Discogs 的 `Min'yō`／`Folk, World, & Country` 有時標的是**樂器與一兩首素材**，不是整張碟的性質。
**建議改成**：第 1／2 款成立時**不直接退，改為進人工**，由第 3 款（曲目過半）與第 4 款（藝人整份目錄）定案；
**第 3 或第 4 款成立才是充分的退件理由**。本批 11 筆退件裡有 **9 筆**同時中了第 3 或第 4 款
（只有 3803《LA JOUISSANCE》與 3810《Girl Friend Baby Doll》是靠第 1＋4 款退的，兩張的曲目都是原創情境曲、無從用第 3 款判），
**改成這個讀法不會讓本批任何一筆退件翻案**，只會把《Bamboo》這種碟從「字面該退」移到「人工裁定」。

## 3820　⚠ 簡報／第 3753 條與本批實際資料對不上的地方（彙整，供後八批）

1. **`poolRecheck` 的「池中查無此藝人」有假陰性，而且成因與 c-173 的 `inPool` 不同**（見 3802）：
   它比的是**字串相等**，`artistVariants` 沒收進漢字寫法時會整筆漏掉（slice #13 的 variants 逐字只有 `["Mina Aoe"]`，
   池中的 `青江三奈` 2 張完全掃不到）。**簡報第一節說這一格「可以直接做」，實際上仍要人工掃池。**
2. **`rg-tag` 的非爵士率在本年段是 53%**（17 筆中 9 筆），**高於簡報寫的 31–44%**。第 3752／3724 條要再加重。
3. **`why` 的值域又縮了**：本組 18 筆只出現 `rg-tag`（17）與 `artist-tag`（1），簡報列的七種值有五種一筆都沒出現。
4. ⚠ **簡報第二節第 3 點說「RG title 取自再發版的有 15%」——本組是 33%（18 筆中 6 筆），收件裡更高達 57%（7 筆中 4 筆）。**
   而且**形狀變了**：c-173 是「MB 只建了再發」，本組**四筆的原盤與再發 MB 都建了，RG title 卻一律取了再發那一筆**。
   → **後八批的固定動作：不要讀 release-group 的 `title`，打開 release 端點讀年份最早那一筆的 `title`。**
5. **年份仍然沒有風險**（18/18 一致，本線第三批連續 0 改判），但 **MB 的 first-release-date 會被填成錄音日**（見 3813 的《Infinite》）。
6. **第 3753 條在「日本傳統樂器演奏爵士」上會誤殺**，修正建議見 3819。
7. **Discogs 原壓 release 的 `styles` 欄是空的時候要往 master 與再發版看**（見 3803）——style 常常只填在再發那一筆。
8. **盤面印的系列名不是曲風證據**：3807 的《尺八ロック/和製ポップス編》封面印著「Takt Jazz Series」「New Stream in Jazz」，
   內容卻是十二首 GS 翻唱。**原廠首發時的系列名與再發時的歸類都只是旁證。**
9. **附錄二第 2 點（Apple 403）本工作階段仍不成立**：`itunes.apple.com/search` 共打 16 次，**15 次 HTTP 200**
   （1 次 jp 回空 body，重打即通），us／jp 兩地皆可用。**但 Apple 的內容不一定可信**——見 3815 的「Pianorogy」。
10. **附錄二第 3 點成立**：`releases/<id>` 的整筆 credits 是必跑的——3804 的「Recorded at Nippon Columbia's Studio, Tokyo, July 6, 1969」、
    3808 的「民謡填英文詞的彩膠企劃」、3810 的「Lyrics By [Sound Illust.]」，**全部只存在於整筆的 notes／extraartists**。
11. **第 1839-B 條成立**：Discogs `search` 的結果確實混著 `master` 與 `release`（本組每一次 `catno=` 反查都同時回兩種），
    先讀 `type` 才沒打錯端點。**`catno=` 反查在本組 18 筆裡 16 筆第一頁命中原盤**，比盤名查準得多（第 3725 條同結論）。
12. ⚠ **附錄二第 3 點的「`position` 為空＝標題列」要加一句但書**：本組有兩筆（《Flute Adventure》A 面組曲、
    《Down By The Naked City》A 面長篇）的 `position` 是空的，**但它們帶著時長、是整面那一條曲子本身，不是標題列**。
    **數軌數前先看有沒有 `duration`**，一律丟掉會少算一軌。

## 3821　本批沒有動到的東西（邊界自述）
只寫了 `batch-progress/c174/prop-b.json` 與本檔（**只 append，未覆寫；寫入前重讀過本檔**）。
**未碰** `seed_cards.json`（唯讀掃描 17,248 列）、`apex_pool.json`、`PROJECT_MEMORY.md`、
`batch-progress/enum/*`、a 組的 `prop-a.json`、其他批次的任何檔案、KV、Firestore。
**未執行任何 git 指令**（不 add／不 commit／不 push／未動索引）。
中間檔全部在 scratchpad 的 `c174b/`（`mb.json`／`part1-3.json` 與 `c174b-mb.mjs`／`c174b-dg.mjs`／`c174b-poolscan.mjs`／`apple.sh`）。
MB 全程 1 req/s、UA `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`；Discogs 約 1 req/2s，未遇 429／503；Apple 16 次。
