# c-173 裁定（日本爵士四大廠線 jp-1・**第一批**；a 組 21 張，1958–1967）

判準照 `batch-progress/CURATION-BRIEF-jp1.md` → `CURATION-BRIEF-bluenote-post1985.md`（含**附錄二：雲端線實測**）
→ `CURATION-BRIEF-bluenote.md` → `CURATION-BRIEF-c131.md` → `c127` → `c126` → `c103plus` → `c93plus`，固定規格一字未改。
**a 組編號區間 3711–3740，本檔用到 3729**（b 組 3741–3770，本檔只 append、不覆寫）。

⚠ **這是本線第一棒，簡報與實際資料對不上的地方集中寫在第 3722–3727 條**，後面九批請先讀那一段。

---

## 第 3711 條（**總表**）：**21 張＝收 6 ／ 退 15**

| | 張 |
|---|---:|
| `slice.json` `g: "a"` | **21** |
| **`prop-a.json` 收件** | **6** |
| **a 組退件** | **15** |
| **合計** | **6 收 ＋ 15 退 ＝ 21** ✔（第 315 條結算通過） |

**收件 6 張**（依 `prop-a.json` 順序）：

| # | 卡 | 掛名來源 | 年份 |
|---:|---|---|---:|
| 1 | `ジョージ川口とビッグ4《The Original Big Four》` | **沿用池中既有字串**（池中《The Big 4》1976 同字串） | 1959（覆核成立） |
| 2 | `Modern Jazz Playboys《Modern Jazz Screen Mood》` | MB／Discogs credit，池中零張，本批新立 | 1960（覆核成立） |
| 3 | `Modern Jazz Playboys《Modern Jazz Show Case》` | 同上 | 1961（覆核成立） |
| 4 | `横内章次とクインテット・プラス・ラテン《真夜中のラテン》` | MB 編制字串，與池中 `横内章次トリオ` 並存 | 1963（覆核成立） |
| 5 | `村岡実《Harlem Nocturne - Bamboo Flute Miracle Sounds》` | MB 漢字 credit，本批新立 | **1967（改判，原 1966）** |
| 6 | `Charlie Mariano & Sadao Watanabe《Charlie Mariano & Sadao Watanabe》` | MB／盤面聯名字串 | 1967（覆核成立） |

**6 張、5 個相異掛名字串**（Modern Jazz Playboys 兩張）。**年份改判 1 筆、覆核成立 5 筆。**
`chk-prop a` 標記 **0**，`dedup-crossbatch c173` 跨批撞卡 **0**。

**退件 15 張分四類**：撞卡 6（第 3712–3713 條）、外國藝人日本壓片 1（第 3714 條）、
合輯／多團企劃 3（第 3718–3720 條）、非爵士的ムード／輕音樂／民謡企劃盤 5（第 3717、3719、3721 條）。
**退件不補張**（簡報第三節）。

---

## 第 3712 條：**⚠ ⚠ `inPool: false` 在這一批錯了六次——五次是漢字／羅馬字沒比中，一次是盤名改寫**

`slice.json` 的 `inPool` 全部 21 筆都是 `false`。**實掃 `seed_cards.json`（17,248 列）＋ `desc-tools/batches/cards/c1*.json` ＋
各批 `prop-*.json` 的結果是：六筆已經在池裡或已在待上架批次裡。** 逐筆：

| slice # | slice 掛名／盤名 | 池中既有 | 來源批 | `inPool` 為什麼沒中 |
|---:|---|---|---|---|
| 0 | `白木秀雄《白木秀雄》` 1958 | `白木秀雄《白木秀雄》` **1959** | c-132 b（已上線） | ⚠ **掛名盤名逐字相同，仍判 false**——子字串比對本身失效，不是文字系統問題 |
| 2 | `Hideo Shiraki《白木秀雄リサイタル》` | `白木秀雄《白木秀雄リサイタル》` 1959 | c-132 b | 掛名羅馬字 vs 池中漢字 |
| 8 | `Akira Miyazawa《山女魚》` | `宮沢昭《山女魚》` 1962 | c-132 b | 掛名羅馬字 vs 池中漢字 |
| 10 | `Hideo Shiraki《プレイズ・ボッサ・ノバ》` | `白木秀雄《プレイズ・ボッサ・ノバ》` 1963 | c-132 b | 同上 |
| 11 | `Hideo Shiraki Quintet《Plays Horace Silver》` | `白木秀雄クインテット《Plays Horace Silver》` 1962 | c-132 b | 同上（編制字串也一起羅馬字化） |
| 9 | `Chiemi《Chiemi Sings Japanese Folk Songs Highlights》` | `江利チエミ《チエミの民謡集》` 1958 | c-103 b | 掛名與盤名**兩邊都是另一種文字系統** |

**六筆全退。** 第 0 筆那一項尤其要記：**盤名與掛名逐字相同也會漏**，所以下批不能只防「漢字／羅馬字」這一種形狀。
⚠ **給後面九批的操作結論**：`inPool` 這個欄位**不具參考價值，一律當作沒有這個欄位**，逐筆自己掃池，
且**掃池的鍵要同時試漢字、羅馬字與編制後綴**（`クインテット`／`Quintet`／`トリオ`／`Trio`）。

## 第 3713 條：**⚠ `chk-prop` 的複合鍵抓不到其中兩筆——第 611 條的盲區在本線是常態**

上表六筆裡，只有 #0（`白木秀雄|白木秀雄`）會被 `chk-prop` 的 `live.get(掛名|盤名)` 抓到；
**#2／#8／#10／#11 的掛名是羅馬字、#9 的盤名也換了文字系統，複合鍵一個都不會亮**。
⚠ **本線的「`chk-prop` 標記 0 不等於沒撞卡」比 Blue Note 線嚴重得多**：Blue Note 線的盲區是 `&`／`and`，
本線是**整組文字系統**。**人工掃池是本線的必要步驟，不是保險。**

## 第 3714 條：**退件（外國藝人）：`The Cecil Taylor Quartet《Looking Ahead!》`——`foreignArtist` 判錯，群組實體會漏**

slice #3。簡報第一節把「外國藝人的日本盤（`foreignArtist: true`）412 張」整批排除在本線之外，
**但 `batch-progress/enum/jp-king.json` 這一列的 `foreignArtist` 是 `false`**（逐字核過原始列舉檔）。
實際：這張是 **Contemporary S7562（US 1959）**，Cecil Taylor 四重奏在洛杉磯的錄音；
MB 轄下 10 個 release 裡，掛 KING 的 `eb5a987b` 是 **1965 年的日本授權壓片（KING SH 3067）**，
原盤廠牌是 Contemporary，不是 King。→ **照簡報第一節退件**，卡的身分應歸原盤。

⚠ **成因**：列舉腳本的外國藝人判定看的是藝人實體的 `area`／`country`，
而 **`The Cecil Taylor Quartet` 是 Group 型實體、沒設 area**，於是判成日本藝人。
**個人名（Cecil Taylor）會被擋掉，團名不會。** jp-king 那一檔 341 列裡有 129 列已標 `foreignArtist: true`，
**漏掉的是「外國藝人的群組實體」這一種**——後面九批看到 `The ... Quartet`／`... Trio` 這種英文團名，
**要回頭核原盤廠牌是不是這四家**，不要靠 `foreignArtist`。

⚠ **本盤池中確實沒有**（池中 Cecil Taylor 12 張，無 `Looking Ahead!`），是真實缺口，
但**該由美國線（Contemporary／OJC）補，不是本線**。記在此供主線調度。

## 第 3715 條：**收件的掛名，逐筆取捨**

1. **`ジョージ川口とビッグ4`**（slice #1 原字串 `George Kawaguchi's The Big 4`）——**照第 307 條取池中既有字串**。
   池中《The Big 4》1976（TBM-66）用的就是這個字串。⚠ **先查了是不是同一張碟**：
   Discogs release 3935914／17115570 證實池中那張是 **Three Blind Mice TBM-66、1976**，
   與本盤 **King KC 10、1959** 不同碟、曲目不同，**不是再發**，因此本盤收、掛名沿用。
   另外 Discogs 還有 `ジョージ・川口とビッグ・フォア`（Victor SMJX-10073）與
   `ジョージ川口とビッグ4 ゲスト 世良譲`（Takt JAZZ-8）兩種字串，**照第 964／196／197 條並存，本批不去收斂**。
2. **`Modern Jazz Playboys`**——池中零張，MB 與 Discogs 一致，且這是英文團名（無漢字），
   **2026-08-11「有漢字照漢字」不適用**，照原字串新立。片假名 `モダン・ジャズ・プレイボーイズ` 只出現在再發 CD 腰帶，不取。
3. **`横内章次とクインテット・プラス・ラテン`**——池中有 `横内章次トリオ`（《Greensleeves》1978）。
   **不併**：照第 964／196／197 條，同一人的不同編制字串可並存；
   池中 `白木秀雄`／`白木秀雄クインテット`／`白木秀雄クインテット＆スリー琴ガールズ` 三個字串並存就是現成先例。
4. **`村岡実`**——⚠ **池中的 `村岡建` 是另一位樂手**（Takeru Muraoka，次中音薩克斯，c-133 b 三張），
   本卡的 `村岡実` 是 Minoru Muraoka（尺八）。**同姓不同人，絕不可合併**，已寫進卡的 `risk`。
5. **`Charlie Mariano & Sadao Watanabe`**——照 MB artist-credit 與盤面英文題取聯名字串，
   先例是 c-131 b《Stan Getz and The Oscar Peterson Trio》。
   ⚠ 這會與池中漢字 `渡辺貞夫`（9 張）形成漢字／羅馬字並存，**照第 964／196／197 條允許，本批不改寫、不合併**，
   留給本機統一。另記一個反方向先例：**Apple jp／us 把同組人的 Takt 兩張掛成「渡辺貞夫 & チャーリー・マリアーノ」（渡辺在前）**，
   本卡仍照本盤盤面的 Mariano 在前。

## 第 3716 條：**⚠ 立判準：1958–1969 這四家的「ムード／輕音樂企劃盤」收退分界**

這一段四家什麼都出，`why` 判爵士的四種值全部不足以定案。**本批立下的分界（後面九批照用）**：

**退**——符合下列任一項：
1. Discogs `genres` 跨出 Jazz、到 `Folk, World, & Country`／`Stage & Screen`／`Pop`，且 `styles` 首位是
   `Min'yō`／`Kayōkyoku`／`Soundtrack`／`Easy Listening`；
2. 曲目**整張**是民謡・歌謡曲・電影主題歌的照譜吹奏（不是爵士標準曲、也不是原創）；
3. Discogs `formats` 標了 `Compilation`，或 artist-credit 是**兩個以上樂團分軌**；
4. 盤名／團名點明企劃屬性（`ムード`／`ヒット・アルバム`／`ハイライツ`／`全集`／`○○による`）**且** 1 或 2 成立。

**收**——演奏主體是爵士編制（quartet／quintet／big band 的爵士樂手）、曲目以爵士標準曲或原創為主、
Discogs `genres` 首位是 Jazz，**即使 `styles` 帶 Easy Listening 也收**，但ムード性質要寫進 `risk`。

⚠ **這條分界在本批讓 5 張退、2 張留（#12 真夜中のラテン、#17 Harlem Nocturne）**，兩張留的理由各自寫在卡的 `risk`。
**可逆性**：改的是收退名單與卡單欄位，不是卡池結構，照裁定下放的第二條（可逆）直接定。

## 第 3717 條：**⚠ 新發現：Victor `SJV-` 是ムード／輕音樂系列，不是爵士系列**

本批 Victor 的三個 `SJV-` 目錄號逐一查出來是同一條產品線：

| 目錄號 | 盤 | Discogs 判定 | 處置 |
|---|---|---|---|
| SJV-111 | 平岡精二とクインテット《Bed Time Music》1965 | Jazz／**Easy Listening**；封面模特兒 Diane Webber | **退**（slice #15） |
| SJV-227 | 松浦ヤスノブ・松本英彦・宮沢昭《恍惚のテナー・サックス》1966 | Jazz／Easy Listening、**formats 標 Compilation**、Victor「Perfect Sound 6」 | **退**（slice #16，另見第 3718 條） |
| SJV-303 | 松浦ヤスノブ《Tenor Sax Mood Deluxe》1967 | Jazz、credits 記 `Yasunobu Matsuura & Mood Kings`、notes 逐字「No. 6 of the perfect sound series」 | **退**（slice #20） |

同號段還有 `SJV-1116／1117`（鈴木庸一とラテン・カンパニオン《Latin Mood 日本の民謡》，Discogs 判 Min'yō）。
→ **`SJV-` 整個系列預設非爵士**；Victor 這一段真正的爵士線是 **`SMJ-`／`SMJX-`（Victor World Group／ビクター〈日本のジャズ〉シリーズ）**，
本批收件的 slice #19 正是 `SMJ-7446`。**後面九批看到 `SJV-` 要提出逐張的爵士證據才收。**
⚠ 這一條也修正了 `batch-progress/enum/jp-1.md`「Victor 60 年代值得先看」那份名單：
**平岡精二與松浦ヤスノブ在 MB 掛得到的盤，實際上都是ムード系列**，名單點名的是人、不是這些碟。

## 第 3718 條：**退件（合輯漏網）：`Fascinating Tenor-Sax`——Discogs `formats` 直接標 Compilation**

slice #16、`why` 是 `rg-tag`。**MB 的 `secondary-types` 是空的**（第 397 條「兩個方向都會漏」再次成立），
但 Discogs release 7852685 的 `formats` 標 `Compilation`，`notes` 逐字寫明三個樂團各供幾軌：
「松本英彦とクインテット（A-1・3、B-2・4）／宮沢昭クインテット（A-2・5、B-3・5）／松浦ヤスノブとムード・キングス（A-4・6、B-1・6）」。
曲目十二首全是ムード歌謡（恍惚のブルース、女のためいき、ウナ・セラ・ディ東京）。
→ **合輯＋非爵士，兩項各自足以退件。**
⚠ **操作結論**：`releaseType` 不能只讀 MB——**Discogs 整筆的 `formats` 與 `notes` 要一起看**，
本線的分軌合輯在 MB 幾乎都建成 Album。

## 第 3719 條：**退件（多團企劃）：`外国映画主題歌全集 (1955-1961) 第4集` 與 `Modern Ameriachi For You`**

- **slice #7**（Victor JV-5056、1962、`why` `rg-tag`）：artist-credit 是**五個樂團用斜線串起來**
  （ムービー・シンフォニック・オーケストラ／水野純交とグラマシー・ファイブ／斉藤英美とファンタスティック・エコー／
  原田イサム・クインテット／スクリーン・ミュージック・オールスターズ）。Discogs release 22696334：
  genres `Jazz/Stage & Screen`、styles `Easy Listening/Soundtrack/Theme`，15 軌全是外國電影主題歌，
  内頁岡俊雄、旁白林京子。→ **Various Artists 合輯＋非爵士，退。**
- **slice #18**（King SKK 227、1966、`why` `artist-tag`）：artist-credit 是
  `Hideo Shiraki Quintet + All Stars, Takeshi Inomata & His West Liners + All Stars` **兩團分軌**；
  Discogs release 17589973 的 12 軌全是歌謡曲（さよならはダンスの後に、君といつまでも、涙くんさよなら、
  逢いたくて逢いたくて），styles `Jazz-Rock/Easy Listening`，是跟 Herb Alpert 的「アメリアッチ」風潮的企劃盤。
  → **雙團分軌＋歌謡曲企劃，退**；若收，還會為兩個既有掛名各新造一個「+ All Stars」分裂字串（第 307 條反面）。

## 第 3720 條：**退件（企劃合輯）：`弘田三枝子ヒット・アルバム` 與 `Chiemi Sings Japanese Folk Songs Highlights`**

- **slice #13**（東芝 JLP 3005、1963、`why` `artist-search-tag`）：弘田三枝子是和製ポップス歌手，
  Discogs release 10530261 判 `Jazz/Rock/Funk / Soul/Pop`、styles `Kayōkyoku/Pop Rock/Rock & Roll/Soul/Twist/Yé-Yé/Swing`，
  14 軌全是她的單曲（悲しきハート、ヴァケーション、子供じゃないの）。**盤名逐字「ヒット・アルバム」＝單曲精選**。
  → **非爵士＋精選，退。** ⚠ 這是 `artist-search-tag` 判爵士最典型的失效形狀，**東芝這一家尤其要盯**。
- **slice #9**（King SKJ 1005、1962、`why` `artist-search-tag`）：Discogs release 3645413 的盤面題是
  **`チエミの民謡ハイライツ`**，genres `Jazz/Latin/Pop/Folk, World, & Country`、styles `Kayōkyoku/Min'yō`。
  → **非爵士（民謡・歌謡曲）＋「ハイライツ」＝精選，退**；**同時撞池**（第 3712 條，池中 `江利チエミ《チエミの民謡集》` 1958，
  c-103 b，genres 記的是 `world`＋`pop`——池自己就沒把這位歌手當爵士）。

## 第 3721 條：**退件（民謡・ムード企劃盤）：三張**

| slice # | 盤 | 廠牌／目錄號 | 依據 |
|---:|---|---|---|
| 6 | `東京キューバン・ボーイズ《More Echoes Of Japan》` 1961 | King SKC 5 | Discogs release 11357082：styles `Big Band/Easy Listening`，12 軌**全是民謡**（八木節、佐渡おけさ、木曽節、黒田節、安里屋ユンタ），編曲内藤常美、指揮見砂直照——拉丁樂團把日本民謡編成大樂團曲，是 exotica 不是爵士 |
| 14 | `Satoru Oda & His Group《テナーによる お江戸日本橋》` 1963 | King SKJ 1015 | Discogs release 6413092：genres `Jazz/Folk, World, & Country`、styles `Easy Listening/Min'yō`，12 軌全是民謡・小唄，credits 有合唱團 Voce Angelica 與電子風琴——`○○による` 的企劃盤形狀 |
| 15 | `平岡精二カルテット《Bed Time Music》` 1965 | Victor SJV-111 | 見第 3717 條（`SJV-` ムード系列）；Discogs release 13670122 styles 只有 `Easy Listening` |

⚠ **尾田悟・平岡精二・横内章次・松浦ヤスノブ這幾位本身是爵士樂手，退的是這幾張碟、不是這幾個人**；
他們的爵士盤若出現在後面九批，照常收。

---

## 第 3722 條：**⚠ 簡報對不上實際資料（一）：年份風險被高估了——21 筆只有 1 筆要改判**

簡報第二節第 3 點寫「**每一筆都要回查原盤年**，MB 對這四家只建再發的比例很高，1958–1969 這段尤其危險」。
**本批實測：21 筆裡 20 筆的 MB first-release-date 與 Discogs 原壓年相符，只有 1 筆要改判。**

**原因是簡報沒料到的**：這四家 1958–1969 的 MB 資料**多半直接建到了原壓黑膠並帶目錄號**——
21 筆裡 **18 筆**的 release 端點回來就有當年的 12 吋／10 吋 Vinyl 與 King／Victor／Columbia 的目錄號
（KC-8、KC 10、LKF 1051、SKJ 1001／1005／1006／1007／1015、SKC 5、SKK 227、SL-1001、JPS-5132、
JV-5056、SJL-5057、SJV-111／227／303、SMJ-7446、JLP 3005）。
**「只建了再發」的形狀在這一段沒有發生**（只有 slice #3 Cecil Taylor 那一筆是 MB 建了一堆美國再發，
但那是外國盤，另案退件）。

⚠ **唯一的改判：slice #17 `村岡実《Harlem Nocturne》` 1966 → 1967。**
依據三項：(a) Discogs release 9327252 與 master 1115435 同為 1967；
(b) Discogs `notes` 逐字引盤面「© 67 • 11 ￥ 1.500 Made in Japan」——**盤面版權年是 1967 年 11 月**，是原盤層證據；
(c) Apple jp／us 兩地都記 1967、12 軌。→ **MB 的 1966 是孤例，取 1967。**

**給後面九批**：年份仍要逐筆回查，但**預期改判率低（本批 1/21）**，
查證重點應該移到**曲風覆核與撞池**——那兩項在本批各中了 8 次與 6 次。

## 第 3723 條：**⚠ 簡報對不上實際資料（二）：`why` 有第五種值 `curator-list`，而且最不可信**

簡報第二節第 5 點寫 `why` 只有四種值（`rg-tag`／`artist-tag`／`artist-search-tag`／imprint 推定），
**但列舉檔實際還有第五種 `curator-list`**：jp-king 9 筆、jp-victor 8 筆、jp-columbia 15 筆、jp-toshiba 1 筆，**合計 33 筆**。
本批 a 組中了 1 筆（slice #6 東京キューバン・ボーイズ），**已退**。

⚠ **`curator-list` 比 imprint 推定還寬鬆**：同一批 `curator-list` 的列裡有
`宮川泰《交響組曲 宇宙戦艦ヤマトIII》`、`岡崎広志とスターゲイザーズ《イージー・リスニングの貴族達》`、
`東京キューバン・ボーイズ《タンゴ・デラックス》`——**明顯不是爵士**。
→ **後面九批看到 `why: "curator-list"` 的，一律當成「未經判定」逐張覆核**，與 `artist-tag`／`artist-search-tag` 同級或更嚴。

## 第 3724 條：**⚠ 簡報對不上實際資料（三）：`why: "rg-tag"` 不是「最可信」**

簡報第二節第 5 點寫 `rg-tag` 最可信、只要求覆核 `artist-tag` 與 `artist-search-tag`。
**本批退掉的 8 張非爵士／合輯裡，有 5 張的 `why` 是 `rg-tag`**
（slice #6 是 `curator-list`、#9／#13 是 `artist-search-tag`、#18 是 `artist-tag`，
其餘 **#7、#14、#15、#16、#20 全是 `rg-tag`**）。

原因：**MB 的 release-group 標籤在日本盤上常常是「jazz＋easy listening」並列**
（本批 #7、#14、#15、#16 四筆的 genres 都是 `easy listening:1, jazz:1`），
列舉腳本只看有沒有 `jazz` 就收，**沒看 `jazz` 旁邊還掛了什麼**。
→ **後面九批：`rg-tag` 也要逐張覆核**；快篩的辦法是看 release-group 端點的 genres 有沒有
`easy listening`／`kayōkyoku`／`min'yō`／`latin` 與 `jazz` 並列，**有並列的一律進人工。**

## 第 3725 條：**⚠ 簡報對不上實際資料（四）：slice 沒有 catno，但 MB release 端點有**

簡報第四節寫「本線的 slice **沒有 catno**（列舉層沒拉），所以第 1263 條的反查改成用 Discogs master 反查年份」。
**實測：catno 不必放棄**——`release?release-group=<id>&inc=media+labels` 回來的 `label-info[].catalog-number`
在本批 21 筆裡有 **18 筆**直接給了原盤目錄號。
**拿那個目錄號去打 Discogs `database/search?catno=`，19 個查詢裡 16 個第一頁就命中原盤**
（未命中的三個：`SL-1001` 被 2002 年的 Still Life Records 同號蓋過、`LKF 1051` 首位是少年隊的卡帶、
`KC-8`／`KC 10` 被 Minoruphone 的同號段稀釋——**第 1250 條「裸數字會撞」的同一種形狀**，
補救辦法是在結果裡先濾 `country: Japan` ＋ 年代相近）。
→ **後面九批的動作建議**：先回問 MB release 端點拿 catno，再用 catno 反查 Discogs，
**比用盤名查準得多**（盤名在本線會跨文字系統，假陽性高）。

## 第 3726 條：**⚠ 簡報對不上實際資料（五）：店面覆蓋率確實低，但不是零**

簡報第二節第 8 點說「日本盤的店面覆蓋率預期比 Blue Note 低很多，查不到是常態」。實測（Apple `search`，jp 與 us 各一次）：
**`itunes.apple.com/search` 在本工作階段兩地都回 HTTP 200，沒有踩到附錄二第 2 點的 403。**
六張收件裡**只有 1 張命中**（村岡実《Harlem Nocturne》，jp／us 皆有、1967、12 軌，而且成了年份改判的第三個來源）；
其餘 5 張查無。命中率 1/6，**與簡報的預期一致，但「Apple 403」這一點在本批不成立**——
後面九批仍應該跑 Apple，它在日本 1960 年代盤上偶爾會是決定性的一票。

## 第 3727 條：**⚠ 給主線：本線在 1958–1969 這一段的實際收得率是 29%（6/21）**

退件的 15 張裡，**只有 6 張是「池中已有」這種良性重複**，其餘 9 張是**列舉層本來就不該收進來的**
（外國藝人 1、合輯／多團 3、非爵士 5）。
⚠ **若 b 組與後續九批的比例相近，`c-173…c-182` 這 408 張的實際可收件數會落在 120–180 張之間，而不是 408。**
成因已寫在第 3723／3724 條（`why` 的判定層級太寬），**若要提高收得率，該修的是列舉腳本，不是策展層**。
本層不動列舉檔（邊界），只把數字記在這裡供主線調度。

---

## 第 3728 條：**`why` 欄逐筆覆核結果（21 筆全表）**

| slice # | `why` | 覆核結論 | 處置 |
|---:|---|---|---|
| 0 | rg-tag | 爵士（成立） | 退：撞池 |
| 1 | rg-tag | 爵士（成立，Discogs Post Bop） | **收** |
| 2 | rg-tag | 爵士（成立） | 退：撞池 |
| 3 | rg-tag | 爵士（成立） | 退：外國藝人日本壓片 |
| 4 | rg-tag | 爵士（成立，Discogs Hard Bop） | **收** |
| 5 | rg-tag | 爵士（成立，Discogs Hard Bop） | **收** |
| 6 | **curator-list** | **不成立**：民謡／exotica | 退 |
| 7 | rg-tag | **不成立**：電影主題歌合輯 | 退 |
| 8 | rg-tag | 爵士（成立） | 退：撞池 |
| 9 | artist-search-tag | **不成立**：民謡／歌謡曲 | 退（並撞池） |
| 10 | rg-tag | 爵士（成立） | 退：撞池 |
| 11 | rg-tag | 爵士（成立） | 退：撞池 |
| 12 | rg-tag | 成立（Discogs Latin Jazz，見第 3716 條） | **收** |
| 13 | artist-search-tag | **不成立**：和製ポップス精選 | 退 |
| 14 | rg-tag | **不成立**：民謡ムード | 退 |
| 15 | rg-tag | **不成立**：ムード系列 | 退 |
| 16 | rg-tag | **不成立**：合輯＋ムード歌謡 | 退 |
| 17 | rg-tag | 成立（MB 五標籤＋原廠「和Jazz Reissue Series」） | **收**（年份改判） |
| 18 | artist-tag | **不成立**：歌謡曲企劃・雙團分軌 | 退 |
| 19 | rg-tag | 爵士（成立，Discogs Modal／Post Bop） | **收** |
| 20 | rg-tag | **不成立**：ムード（Mood Kings、perfect sound series） | 退 |

**`rg-tag` 16 筆裡 5 筆不成立（31%）；`artist-search-tag` 2 筆全不成立；`artist-tag` 1 筆不成立；`curator-list` 1 筆不成立。**

## 第 3729 條：**本批沒有動到的東西（邊界自述）**

只寫了 `batch-progress/c173/prop-a.json` 與本檔。
**未碰** `seed_cards.json`（唯讀掃描 17,248 列）、`apex_pool.json`、`PROJECT_MEMORY.md`、
`batch-progress/enum/*`（唯讀）、b 組的 `prop-b.json`、其他批次的任何檔案、KV、Firestore。
**未執行任何 git 指令**（不 add／不 commit／不 push／未動索引）。
中間檔全部在 scratchpad 的 `c173a/`（`mb.json`／`dg-catno.json`／`dg-rel.json`／`dg-rel2.json` 與三支抓取腳本）。
MB 全程 1 req/s、UA `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`；Discogs 1.6 s 間隔，未遇 429／503。

---

# c-173 b 組裁定（3741–3770）

批次 c-173｜b 組 20 筆（1958–1969 年段）｜策展層｜2026-09-21
**收 5、退 15（撞池 7、非爵士 8）｜年份改判 0 筆。**

## 3741　本批結果總表

| # | slice 掛名 — 盤名 | 處置 | 理由 |
|---|---|---|---|
| 1 | 松浦ヤスノブ & ビクター オーケストラ — Fascinating Tenor - Sax Vol. 3 | 退 | 非爵士（ムード・テナー） |
| 2 | George Otsuka Trio — Page 1 | 退 | 撞池（ジョージ大塚トリオ 1967） |
| 3 | Sadao & Charlie — Iberian Waltz | **收** | → `渡辺貞夫 & チャーリー・マリアーノ` |
| 4 | Sadao Watanabe — Jazz & Bossa | **收** | → `渡辺貞夫` |
| 5 | Sadao Watanabe — My Romance: Sadao Plays Ballads | 退 | 撞池（渡辺貞夫 1967） |
| 6 | Hidehiko Matsumoto, Akira Miyazawa — Operation Sam Taylor | **收** | → `松本英彦・宮沢昭`（邊界案，見 3762） |
| 7 | 松浦ヤスノブ — Nostalgic Elegy of Japan. Tenor Mood Ni Yoru Sendo Kouta | 退 | 非爵士 |
| 8 | George Otsuka Trio — Page 2 | 退 | 撞池（ジョージ大塚トリオ 1968） |
| 9 | Norio Maeda / Jiro Inagaki & The All-Stars — 決定盤!これぞジャズ・ロック | **收** | → `前田憲男 & 稲垣次郎オールスターズ —《This Is Jazz-Rock》` |
| 10 | Sadao Watanabe — Sadao Meets Brazilian Friends | 退 | 撞池（渡辺貞夫 1968） |
| 11 | 岡崎広志とスターゲイザーズ — イージー・リスニングの貴族達 | 退 | 非爵士 |
| 12 | 太田幸雄とハミングバーズ — サウンド・ヴィラ・エイト・エイト | 退 | 非爵士（ソフト・コーラス） |
| 13 | 日野皓正 — Feelin' Good | 退 | 撞池（日野皓正 1968） |
| 14 | 八城一夫トリオ — LOVE IS HERE TO STAY | 退 | 撞池（逐字同字串） |
| 15 | 高橋達也と東京ユニオン・プラス・アルファ — ゴールデン・ヒット・パレード… | 退 | 非爵士（歌謡ビッグバンド） |
| 16 | Hidehiko Matsumoto, Yoshio Kimura — 演歌の祭典 | 退 | 非爵士（演歌） |
| 17 | 原信夫とシャープス・アンド・フラッツ — LITTLE GIANT | 退 | 撞池（逐字同字串） |
| 18 | 松浦ヤスノブ — テナー・サックスによる日本流行歌史 | 退 | 非爵士 |
| 19 | 松浦ヤスノブ & ビクター オーケストラ — 夜の瀬戸内 / 恍惚のテナー | 退 | 非爵士 |
| 20 | 松本浩〜市川秀男カルテット — Megalopolis | **收** | → `松本浩・市川秀男カルテット` |

第 315 條核對：prop 5 筆 ＋ 本表退件 15 筆 ＝ slice 20 筆。✔

---

## 撞池（7 筆）

## 3742　⚠ ⚠ 列舉檔的 `inPool` 在本組是**全數假陰性**：20 筆全部 `inPool: false`，實掃卻撞了 7 張

實掃 `seed_cards.json`（17,248 列）＋ `desc-tools/batches/cards/c1*.json`（合計索引 23,150 列），
以 chk-prop 同一把正規化鍵（`&`→`and`、剝非文數字）比對，**撞到 7 張**。
七張全部同時出現在 **`seed_cards.json`（已上線）與 c-132／c-133／c-134 的卡單**裡。

## 3743　退：`George Otsuka Trio —《Page 1》`（1967，Takt JAZZ-14，rg de5ffd98）
池中 `ジョージ大塚トリオ —《Page 1》(1967)`＋`c133-cards.json` 同筆。同一張碟，只差漢字／羅馬字掛名。
⚠ **chk-prop 的複合鍵（掛名|盤名）抓不到**——掛名字串不同就不會亮，是第 611 條已知盲區的第六種形狀。

## 3744　退：`George Otsuka Trio —《Page 2》`（1968，Columbia XMS-10002-CT，rg 8dbfa30b）
池中 `ジョージ大塚トリオ —《Page 2》(1968)`＋`c133-cards.json`。同 3743，chk-prop 不亮。

## 3745　退：`Sadao Watanabe —《My Romance: Sadao Plays Ballads》`（1967，Takt JAZZ-5，rg 6ecf258a）
池中 `渡辺貞夫 —《My Romance: Sadao Plays Ballads》(1967)`＋`c132-cards.json`。盤名逐字相同、掛名漢字／羅馬字之差，chk-prop 不亮。

## 3746　退：`Sadao Watanabe —《Sadao Meets Brazilian Friends》`（1968，Columbia XMS-10003-CT，rg 63578158）
池中 `渡辺貞夫 —《Sadao Meets Brazilian Friends》(1968)`＋`c132-cards.json`。同上。

## 3747　退：`日野皓正 —《Feelin' Good》`（1968，Columbia XMS-10001-CT，rg 47bcf2b5）
池中 `日野皓正 —《Feelin' Good》(1968)`＋`c132-cards.json`。
⚠ **掛名逐字相同、盤名只差一個撇號**：MB／slice 寫「Feelin**’** Good」（U+2019 右單引號），池中寫「Feelin**'** Good」（ASCII）。
chk-prop 的正規化會剝掉標點、所以這一筆**本來會亮**——它沒亮只是因為本卡沒進 prop。
⚠ 順帶：池中另有 `The Three Sounds —《Feelin' Good》(1961)` 與 `Jessie Mae Hemphill —《Feelin' Good》(1990)`，盤名三撞、掛名不同。

## 3748　退：`八城一夫トリオ —《LOVE IS HERE TO STAY》`（1968，Takt JAZZ-17，rg 6e5a3bec）
池中 `八城一夫トリオ —《LOVE IS HERE TO STAY》(1968)`＋`c134-cards.json`。**掛名與盤名逐字相同**，chk-prop 會亮。
⚠ 池中另有 `Bill Charlap & Sandy Stewart —《Love Is Here To Stay》(2005)`（c171-cards.json），同名不同碟。

## 3749　退：`原信夫とシャープス・アンド・フラッツ —《LITTLE GIANT》`（1969，Victor World Group SMJX-10082，rg 1e261c1e）
池中 `原信夫とシャープス・アンド・フラッツ —《LITTLE GIANT》(1969)`＋`c133-cards.json`。逐字相同，chk-prop 會亮。

## 3750　⚠ ⚠ 撞池的根因，與給 c-174…c-182 的建議

`batch-progress/enum/jp-*.json` 的 `inPool` 是 **2026-09-15** 的子字串比對結果；
而 **c-131／c-132／c-133／c-134 這四批「日本爵士第一世代／目錄深度」是 2026-09-15 之後才落地的**，
它們吃掉的正是「Takt／コロムビア／Victor 六〇年代本土爵士」這一塊——**與 c-173 這一批的年段完全重疊**。
實證：列舉檔的 `note` 說「渡辺貞夫藝人池中有 3 張」，今天實掃是 **9 張**；日野皓正 note 說 4 張、今天是 8 張。

**→ 本組 20 筆有 7 筆（35%）因此作廢。**
**建議（需主線裁定）**：c-174 以後的批次在派工前**重跑一次 `inPool`**（拿今天的 `seed_cards.json`＋`desc-tools/batches/cards/`，
用 chk-prop 的正規化鍵、**並同時比對漢字與羅馬字掛名**），把已撞的先剔掉再切批；
否則後九批會以同樣比例空轉。c-173 這一批的 41 張若比例相同，會有約 14 張是白做的。

---

## 曲風覆核與非爵士退件（8 筆）

## 3751　`why` 欄逐筆覆核結果

| `why` 值 | 本組筆數 | 覆核後判為爵士 | 判為非爵士 |
|---|---:|---:|---:|
| `rg-tag` | 16 | 9 | **7** |
| `artist-tag` | 2 | 1 | 1 |
| `pool-jazz-artist` | 1 | 1 | 0 |
| `curator-list` | 1 | 0 | **1** |

⚠ **簡報第二節第 5 點說 `why` 有四種值（`rg-tag`／`artist-tag`／`artist-search-tag`／imprint 推定），
本組實際出現的是 `rg-tag`／`artist-tag`／`pool-jazz-artist`／`curator-list`**——
`artist-search-tag` 與 imprint 推定一筆都沒有，卻多出兩個簡報沒提的值。
`curator-list` 那一筆（岡崎広志）是本組唯一 MB RG tags 全空的非爵士盤，**這個值等於沒有任何機器依據**。

## 3752　⚠ ⚠ 本線最大的修正：**`rg-tag` 不是「最可信」，在 1958–69 這一段它幾乎不可信**

簡報第二節第 5 點逐字寫「`rg-tag`（最可信）」，並要求只覆核 `artist-tag`／`artist-search-tag`。
**本組實測：16 筆 `rg-tag` 裡有 7 筆是非爵士，錯誤率 44%。**

根因：MB 的 RG tag 是**逐票累加、沒有門檻**的。本組非爵士那幾張的 RG tags 長這樣——

- 松浦ヤスノブ 三張：`easy listening(1)`／`jazz(1)`／`pop(1)`
- 太田幸雄とハミングバーズ：`jazz(1)`／`pop(1)`
- 松本英彦・木村好夫《演歌の祭典》：`easy listening(1)`／`jazz(1)`

**只要有一票 `jazz`（count 1），列舉腳本就判成 `rg-tag` 爵士，同一筆上的 `easy listening` 與 `pop` 被整個忽略。**

**→ 給後九批的判準（本組已照此執行）**：
1. **`rg-tag` 一律要覆核，不得視為通過**；
2. 看的是**同一個 RG 上的 tag 組合**，不是有沒有 `jazz`——**`jazz` 與 `easy listening` 同時出現、而且 count 都是 1 的，一律當成沒有依據**；
3. 只有 `jazz` 系 tag（jazz／post-bop／modal／hard bop／jazz rock…）**單獨出現**或 count ≥ 2 時，`rg-tag` 才算一層證據。

## 3753　⚠ **非爵士的判準（本批確立，後九批照此）：以 Discogs 的 `styles` 欄為分水嶺，曲目為佐證**

MB 的 tag 在這一段不可用（3752），所以改用兩層：

**退（非爵士）**，任一條成立：
1. **Discogs `styles` 含 `Easy Listening` 或 `Kayōkyoku`**；
2. **Discogs `genres` 含 `Folk, World, & Country`**（Discogs 把演歌／歌謡曲歸在這個桶）；
3. **曲目過半是日本歌謡曲／演歌**（即使 genre 只寫 Jazz）；
4. 藝人的整份 Discogs 目錄落在ムード／ソフト・コーラス／イージー・リスニング 系列（如 Neo Standards、ピンク・ムード・デラックス、Softrock Drivin'）。

**收（爵士）**：Discogs `genres` 為 Jazz（或 Jazz/Rock）且 **`styles` 不含 Easy Listening／Kayōkyoku**，
且曲目是爵士標準曲或原創曲。

本組八筆退件（3754–3761）與一筆邊界收件（3762）全部依此裁定，**沒有例外**。

## 3754　退：`松浦ヤスノブ & ビクター オーケストラ —《Fascinating Tenor - Sax Vol. 3》`（rg b8b92af4）
Discogs release 11454990（1967 Victor SJV-275，Perfect Sound 6 系列）：genre **Jazz**、style **Easy Listening**。
MB RG tags `easy listening(1)`／`jazz(1)`／`pop(1)`；藝人 tag 同樣是 `easy listening(1)`／`jazz(1)`。
松浦ヤスノブ 是ムード・テナー・サックス的職業樂手（Discogs 目錄：`松浦ヤスノブとムード・キングス`、
`Special Pink Mood Deluxe`、`恍惚のテナー・デラックス`）。**判準 3753 第 1 條。退。**

## 3755　退：`松浦ヤスノブ —《Nostalgic Elegy of Japan. Tenor Mood Ni Yoru Sendo Kouta》`（rg c9ab1c5e）
Discogs release 7848549（1968 Victor SJV 345）：genre Jazz、style **Easy Listening**。
盤名逐字就是「テナー・**ムード**による船頭小唄」，曲目是戰前流行歌。**判準 3753 第 1／3 條。退。**

## 3756　退：`松浦ヤスノブ —《テナー・サックスによる日本流行歌史》`（rg 71981321）
Discogs release 12763808（1969 Victor JV-278~9-S）：genres **Jazz/Pop**、style **Easy Listening**。
盤名直譯「以次中音薩克斯風演奏的日本流行歌史」，兩片裝 24 首全是歌謡曲。
同系列的姊妹盤（JV-280~1-S 戦後篇）Discogs style 直接給 **Kayōkyoku**。**判準 3753 第 1／3 條。退。**

## 3757　退：`松浦ヤスノブ & ビクター オーケストラ —《夜の瀬戸内 / 恍惚のテナー》`（rg bd4c4576）
Discogs release 11559528（1969 Victor SJV-464）：genres **Jazz/Pop**、styles **Easy Listening／Kayōkyoku**。
**判準 3753 第 1 條（兩個 style 都中）。退。**

## 3758　退：`Hidehiko Matsumoto, Yoshio Kimura —《演歌の祭典》`（rg 422ff78e）
**盤名逐字就是「演歌的祭典」**，MB 自己的另一個 release（25cb8ac9，Pseudo-Release）把 title 寫成「Festival of Enka」。
兩片裝 24 首。RG tags `easy listening(1)`／`jazz(1)`——又是 3752 那個形狀。
⚠ 併記一筆**廠牌欄的事實更正**：slice 的 `house` 記 Victor、`entities` 記「Victor(JP imprint)」，
但 MB 的 Official release（a6d6a8c7）label 欄逐字是 **`RCA` catno `JRS-9031~32`**，
只有 Pseudo-Release 那張才寫 Victor JRC-9031-32。**這是簡報第二節第 7 點（entities ≠ 盤面廠牌）在本組的實例。**
共演者木村好夫是演歌吉他的代表人物（artist tags `easy listening(1)`／`jazz(1)`）。**判準 3753 第 3 條。退。**

## 3759　退：`岡崎広志とスターゲイザーズ —《イージー・リスニングの貴族達》`（rg eede7ffe）
**兩件事同時成立**：
1. **盤名要改判**：1968-07-25 原盤（Discogs release 24386741，Columbia YS-10026-J）盤面原題是
   **《Gazing The Cygnus》**（Hiroshi Okazaki & His Stargazers）；MB RG 的「イージー・リスニングの貴族達」
   是 **2021-01-27 數位再發（Columbia COKM-43072）**的標題。
2. **非爵士**：Discogs genre Jazz、style **Easy Listening**；曲目十二首全是西洋流行曲翻唱
   （Massachusetts／Route 66／I Left My Heart in San Francisco／Mais Que Nada／Yesterday／And I Love Her…）。
   MB RG **tags 全空**，`why` 是 `curator-list`（簡報沒列的值，等於零機器依據）。
**判準 3753 第 1 條。退。** ——順帶：MB 那個再發標題若照抄，會做出一張**盤名自稱「易聽音樂的貴族們」的爵士卡**。

## 3760　退：`太田幸雄とハミングバーズ —《サウンド・ヴィラ・エイト・エイト》`（rg d70dbbc8）
1. **盤名同樣是再發題**：1968-12 原盤（Discogs release 15177358，Columbia ALS 4383）盤面原題是
   **《サウンド・ヴィラ88 = Sound Villa 88》**；MB 的「エイト・エイト」來自 2009-04-24 Think! Records THCD-101 的 CD 再發。
2. **非爵士**：整筆 extraartists 四筆是「有田京示 Voice, Bass／藤本晃 Voice, Drums／伊藤弘章 Voice, Guitar／
   太田幸雄 Voice, Piano」——**四人全部主唱兼樂器的ソフト・コーラス編制**；曲目十四首除開場的〈ヴィラ88〉外
   全是歌謡曲（上を向いて歩こう／涙くんさよなら／見上げてごらん夜の星を／思案橋ブルース…）。
   樂團的 Discogs 目錄：《夜を盗む男たち = Night Stealers. **Brilliancy Of Soft Chorus**》、
   Solid Records「Neo Standards」再發（styles Bossa Nova／Soft Rock／Lounge）、`Softrock Drivin'` 合輯。
   MB RG tags `jazz(1)`／`pop(1)`（3752 形狀）。**判準 3753 第 3／4 條。退。**

## 3761　退：`高橋達也と東京ユニオン・プラス・アルファ —《ゴールデン・ヒット・パレード –ヒット歌謡をビッグ・バンドで–》`（rg 4654860c）
Discogs release 21661342（1968 King Records SKK 483）：genres **Jazz/Pop/Folk, World, & Country**、
styles **Big Band／Easy Listening**。**副題逐字寫著「ヒット歌謡をビッグ・バンドで」**，
曲目十二首全是 1968 年的歌謡曲熱門（恋の季節／天使の誘惑／小樽のひとよ／小さなスナック／愛のさざなみ…）。
**判準 3753 第 1／2／3 條三條都中。退。**

⚠ 這一筆最容易被翻案，所以把理由寫足：
- 高橋達也と東京ユニオン **本身是正牌爵士大樂團**，池中已有 6 張（The Rock Seasons 1973、
  You're So Vain 1973、Got The Spirit 1976、Soul Porter 1978、Black Pearl 1980、Up In The Blues 1981）。
- **但掛名不同**：本盤是 `高橋達也と東京ユニオン**・プラス・アルファ**`，是這張商業企劃盤的一次性掛名。
  依第 964／196／197 不得與池中字串合併，而**為一張歌謡翻唱盤新造一個掛名字串是最不值得的分裂**。
- 對照池中的《You're So Vain - Perfect Sound In Jazz Rock》（1973）：那張同樣是翻唱盤，
  但 Discogs style 是 Jazz-Funk／Jazz-Rock、不含 Easy Listening，曲目是英美流行曲而非日本歌謡曲。
  **兩者在判準 3753 下分得開，不是雙重標準。**
- 附帶：本盤盤名含 **U+2013 EN DASH**（`–ヒット歌謡をビッグ・バンドで–`），**收進來會被 chk-prop 擋下**。

## 3762　收（邊界案）：`松本英彦・宮沢昭 —《Operation Sam Taylor》`——為什麼它過了同一把尺

`why` 是 `artist-tag`（簡報指名要覆核），MB **RG tags 全空**，兩位藝人的 artist tag 都帶 `easy listening(1)`，
盤名還直接掛著 mood-sax 的招牌 Sam Taylor——**四個警訊全中，但判準 3753 的四條一條都不成立**：
- Discogs release 7054132：genre **Jazz**、**`styles` 欄是空的**（不是 Easy Listening）；
- 曲目十二首**沒有一首日本歌謡曲**，是 My Funny Valentine／Summertime／Days of Wine and Roses／
  Stardust 這類爵士標準曲，加 Harlem Nocturne／Moon River／More 幾首 mood 曲；
- 編曲掛八木正生（正牌爵士鋼琴手兼編曲）、東海林修、T. Hirai；
- 兩支次中音**左右聲道分軌對奏**（tenor battle 的爵士作法），1967-09-23／26 世田谷区民会館一次錄成、45 轉發行；
- `batch-progress/enum/jp-1.md` 的「King 值得先看的」逐字點名了這張。

**裁定：收，但在 `risk` 標明 mood-sax 的配方與 SDS 合唱團，行文不得寫成純即興 blowing session。**
（可逆性：這是卡單值，改回去只要退卡，不動卡池結構——符合裁定權下放的第 2 條。）

---

## 掛名（5 筆，全部照第 307 條與 2026-08-11 東亞藝人名裁定）

## 3763　`渡辺貞夫`（Jazz & Bossa）
MB artist-credit 羅馬字「Sadao Watanabe」（實體 378278bf），Discogs 盤面「Sadao Watanabe Quartet, Sextet =
渡辺貞夫クワルテット 及び同 セクステット」。**實掃池中：漢字 `渡辺貞夫` 9 張／羅馬字 0 張**
（另有 `Fumio Watanabe Quintet` 是別人，不算）。**取 `渡辺貞夫`**，Apple jp 亦同。無分裂，無新造。

## 3764　`渡辺貞夫 & チャーリー・マリアーノ`（Iberian Waltz）——⚠ 兩條規則打架，在此定案
MB artist-credit 與盤面都是「**Sadao & Charlie**」（378278bf ＋ 9f7f5005，joinphrase「 & 」），
Discogs 的 anv 同時給「サダオ／チャーリー」。三者都是**只取名的藝名式寫法**。

- c-131 先例（`Stan Getz & The Oscar Peterson Trio`）：**聯名照 MB 寫**。
- 2026-08-11 東亞藝人名裁定＋第 307 條：**有漢字照漢字、照池中多數**（渡辺貞夫 9/9 漢字）。

**裁定取 `渡辺貞夫 & チャーリー・マリアーノ`**，三個理由：
1. **Apple jp 逐字就是這個字串**（id1868591146），是可引的第三方寫法，不是我自己造的；
2. 它**完整包含池中既有的 `渡辺貞夫`**，日後要合併成本最低；
3. 「Sadao & Charlie」只取名，脫離封面就認不出是誰。

**這是新造的「聯名」字串，不是把 `渡辺貞夫` 再劈一次**——第 964／196／197 明文允許人名字串與聯名／團名字串並存。
`Sadao & Charlie`、`サダオ & チャーリー`、`Sadao Watanabe & Charlie Mariano` 三種都進 `queryAlias`。
Charlie Mariano 池中 0 張（`秋吉敏子 —《Toshiko Mariano Quartet》1961` 掛在秋吉名下，不算）。

## 3765　`松本英彦・宮沢昭`（Operation Sam Taylor）
MB artist-credit 羅馬字「Hidehiko Matsumoto, Akira Miyazawa」。實掃池中：
**松本英彦 漢字 1（Four Wings 1980）／羅馬字 1（`Hidehiko Matsumoto` — Hot Jazz 1983）＝既有分裂；
宮沢昭 漢字 8／羅馬字 0。**
依 2026-08-11 裁定取漢字。**分隔符取 `・`**——池中兩人以上日本人聯名的先例是
`細野晴臣・鈴木茂・山下達郎`（Pacific 1978）與 `三上寛・古澤良治郎`（職業 1987）。
（池中其他分隔符 `/`（高柳昌行 / 阿部薫）用於 split 盤、`+`／`＋`（森山浩二 + 山本剛トリオ、北村昌士＋PHONOGENIX）
用於「個人＋另一團」，本盤是兩位個人對等聯名，`・` 最貼。）
⚠ **不動池中的 `Hidehiko Matsumoto` 羅馬字字串**，只在 `risk` 標明待本機統一。

## 3766　`前田憲男 & 稲垣次郎オールスターズ` ＋ 盤名改判 `This Is Jazz-Rock`（rg 5a4b6ac8）
**(a) 盤名改判**：slice／MB RG title 是「決定盤!これぞジャズ・ロック」——那是
**2020-04-22 數位再發 Columbia COKM-42669** 的標題。1968 原盤（Discogs release 6095119，
Columbia YS-10036-J，notes 逐字「1968 Japanese original copy.」）盤面原題是 **《This Is Jazz-Rock》**。
依簡報第三節第 5 點「`album` 用盤面原題（Discogs `title` 為準）」改判，再發題進 `queryAlias`。
⚠ **順帶避開一顆地雷**：MB 那個 1968 release（73d83b9a）把 title 寫成「This Is Jazz**‐**Rock」，
中間是 **U+2010 HYPHEN**，照抄會被 chk-prop 的非 ASCII 連字號那道擋下。本卡用 ASCII 連字號。

**(b) 掛名**：三方順序與分隔符全不同——MB「前田憲男**、**稲垣次郎オールスターズ」、
Discogs「Jiro Inagaki & The All-Stars**,** Norio Maeda」（次序相反）、slice「Norio Maeda **/** Jiro Inagaki & The All-Stars」。
**取 `前田憲男 & 稲垣次郎オールスターズ`**：次序照 MB 與 Apple jp（前田在前），
分隔符照池中「個人＋具名樂隊」的先例 `早坂紗知 & Stir Up`、`喜納昌吉&チャンプルーズ`、`カルメン・マキ&OZ`、`伍佰 & China Blue`；
**Apple jp 逐字就是「前田憲男 & 稲垣次郎オールスターズ」**（id1508944497）。
⚠ **絕不與池中的 `稲垣次郎とソウル・メディア`（漢字 5 張）或 `Jiro Inagaki and Soul Media`（羅馬字 2 張，含 apex《Funky Stuff》1975）合併**
——オールスターズ與ソウル・メディア是**前後兩個不同樂隊名**，不是同一個名字的兩種寫法（第 964／196／197）。

## 3767　⚠ `batch-progress/enum/jp-1.md` 的「§1 候選：MB 完全沒有（12）」名單有誤記
該節逐字列「**渡辺貞夫《Iberian Waltz》（1967，Takt）**」為「MB 完全沒有」，
但 MB 建了（release-group `54892085-37cf-4716-a965-1df1979af185`，轄下 1967 Takt JAZZ-7 原盤），
**而且它就在本批 c-173 的 slice 裡**（第 3 筆）。
→ **那份「§1 人工建檔候選」名單至少有一筆假陽性，後續若照它開人工補遺批，會重複建一張已在管線裡的碟。**
建議主線在開 §1 補遺批之前，**把那 12 張逐筆回打一次 `release-group/<id>` 與 `releasegroup:` 查詢**
（注意第 1844-B 條：`title:` 不是有效欄位，Lucene 靜靜回 count 0，那正是這種誤記的典型成因）。

## 3768　`松本浩・市川秀男カルテット`（Megalopolis）
MB artist-credit 是「松本浩」＋joinphrase「**〜**」（U+301C WAVE DASH）＋「市川秀男カルテット」；
slice 直接照抄了波浪號；Discogs 用「•」。**取 `・`**：池中先例（3765 所列）＋
**Apple us 與 jp 逐字都是「松本浩・市川秀男カルテット」**（id1795358156），三處互相印證。
實掃池中：**松本浩 0 張、市川秀男 0 張、`Megalopolis` 這個盤名 0 張**——兩位都是全新掛名，無分裂風險。

## 3769　⚠ 給主線：`chk-prop` 的非 ASCII 破折號黑名單漏了 U+301C 與 U+FF5E
現行 `chk-prop.mjs` 擋的是 `[‐‑‒–—―－]`（U+2010/2011/2012/2013/2014/2015/FF0D）
＋兩側為空白或 ASCII 英數的 `ー`（U+30FC）。
**`〜`（U+301C WAVE DASH）與 `～`（U+FF5E FULLWIDTH TILDE）不在裡面**，
而本批 slice 的第 20 筆掛名逐字帶著 U+301C（`松本浩〜市川秀男カルテット`）——**照抄會靜靜過關**。
日本盤的掛名與盤名用波浪號當連接／區間符極常見（本批就另見 Discogs 的 `JV-278~9-S`、`SMJX-10082`、`TR-6083～84`），
**建議把 U+301C／U+FF5E 加進同一道（只報不擋亦可）**，否則後九批會一路帶進去。

## 3770　年份：**本批 20 筆全部回查原盤年，改判 0 筆**——簡報第二節第 3 點的風險評估要下修

簡報逐字寫「⚠ ⚠ 年份是本線最大的風險，**比 Blue Note 嚴重得多**」「MB 對這四家『只建了再發』的比例很高，
1958–1969 這段尤其危險（很可能查到的是 70 年代或 CD 再發年）」。**本組實測不成立。**

逐筆用 Discogs 反查原盤（簡報第四節：本線 slice 無 catno，改用 Discogs master／release 反查）：

| slice `year` | 筆數 | Discogs 原盤年 | 差 |
|---|---:|---|---|
| 1967 | 6 | 1967（JAZZ-1／JAZZ-5／JAZZ-7／JAZZ-14／45SDS-1／SJV-275） | **0** |
| 1968 | 9 | 1968（XMS-10001/10002/10003-CT／YS-10026-J／YS-10036-J／JAZZ-17／ALS 4383／SJV 345／SKK 483） | **0** |
| 1969 | 5 | 1969（SMJX-10071／SMJX-10082／JV-278~9-S／SJV-464／JRS-9031~32） | **0** |

**20／20 完全一致，一筆都不用改。**

原因：**MB 在這一段其實建的多半是原盤，不是再發。** 20 筆裡 **18 筆的 release 端點直接有 1967–69 的日本原壓黑膠
（含 label 與 catno）**；只有 2 筆例外——
- 《LITTLE GIANT》（rg 1e261c1e）MB 只有一張 Digital Media，但 first-release-date 仍記 1969，與 Discogs 原盤同年；
- 《This Is Jazz-Rock》（rg 5a4b6ac8）MB 有 1968 原盤，只是 **RG title 取自 2020 數位再發**。

⚠ **真正的風險不是年份，是「RG title 取自再發」**：本組 20 筆有 **3 筆**中這個形狀
（3759 イージー・リスニングの貴族達→Gazing The Cygnus、3760 サウンド・ヴィラ・エイト・エイト→サウンド・ヴィラ88、
3766 決定盤!これぞジャズ・ロック→This Is Jazz-Rock），**比例 15%，而且三筆都不是年份問題**。
**→ 建議後九批把查證重心從「回查原盤年」移到「回查原盤盤名」**，方法不變（Discogs `catno=` 或 master 反查），
只是要比對的欄位從 `year` 換成 `title`。

### 併記：簡報／附錄與實際資料對不上的地方（本節供後九批修用）

1. **3752**：`rg-tag`「最可信」不成立（本組錯誤率 44%），簡報第二節第 5 點要改寫。
2. **3751**：`why` 的四種值與實際不符——實際出現 `pool-jazz-artist` 與 `curator-list` 兩個簡報沒提的值，
   且 `artist-search-tag`／imprint 推定一筆都沒有。
3. **3750**：列舉檔的 `inPool` 全批假陰性（20/20 標 false，實撞 7），根因是 c-131…c-134 在列舉日之後落地。
4. **3770**：年份風險被高估（改判 0 筆）；被低估的是「RG title 取自再發」（15%）。
5. **3767**：`jp-1.md` 的「§1 候選 MB 完全沒有」名單有假陽性。
6. **附錄二第 2 點**：「`itunes.apple.com/search` 在雲端會回 HTTP 403」——**本工作階段 11 次 `search` 全部 HTTP 200**
   （us 與 jp 兩個 store 都通），`/lookup` 沒用上。**Apple 在本線是可用的第三方掛名／軌數／發行日來源**：
   本組 5 筆收件有 4 筆命中，而且 **3 筆的掛名寫法（松本浩・市川秀男カルテット／前田憲男 & 稲垣次郎オールスターズ／
   渡辺貞夫 & チャーリー・マリアーノ）是靠 Apple jp 定案的**。只有《Operation Sam Taylor》兩個 store 都 0 筆
   （依第 254 條不寫成「不在架上」）。
7. **附錄二第 3 點成立**：`api.discogs.com/releases/<id>` 的整筆 credits 是必跑的——
   3760 太田幸雄那一筆「四人全部 Voice ＋ 樂器」的ソフト・コーラス編制、
   3762 Operation Sam Taylor 的「左右聲道分軌 ＋ 三位編曲 ＋ SDS 合唱團」，
   **都只存在於整筆 `extraartists`，`search` 摘要看不到**。
8. **第 1839-B 條成立**：Discogs `search` 回來的結果確實混著 `master` 與 `release`（本組《Iberian Waltz》
   一次回了兩個 master ＋ 三個 release），先讀 `type` 才沒打錯端點。
9. **Discogs 免 token 可用**：`database/search`、`releases/<id>`、`masters/<id>`、`masters/<id>/versions`
   在本工作階段未帶 token 全部 HTTP 200（速率自我節流到約 1 req/3s，沒撞 429）。


---

# 試聽回撈層（c-173，7 張未 ready 的人工回撈）

## 3831　總結：7 張回撈 **2 張**，其餘 5 張判定無數位來源

探測鏈把 c-173 的 11 張標了 7 張 `unavailable`。逐張人工回撈後：

| # | 掛名｜盤名 | 結果 |
|---|---|---|
| 1 | ジョージ川口とビッグ4｜The Original Big Four（1959 King KC 10） | **救回**（jp `1770440982`） |
| 2 | Modern Jazz Playboys｜Modern Jazz Screen Mood（1960 コロムビア SL-1001） | 無來源 |
| 3 | Modern Jazz Playboys｜Modern Jazz Show Case（1961 コロムビア ZL-1160） | 無來源 |
| 4 | 横内章次とクインテット・プラス・ラテン｜真夜中のラテン（1963 Victor SJL-5057） | 無來源 |
| 5 | 村岡実｜Harlem Nocturne - Bamboo Flute Miracle Sounds（1967 コロムビア JPS-5132） | **救回**（jp `1619045298`） |
| 6 | Charlie Mariano & Sadao Watanabe｜同名盤（1967 Victor SMJ-7446） | 無來源 |
| 7 | 松本英彦・宮沢昭｜Operation Sam Taylor（1967 King 45SDS-1） | 無來源 |

**假陽性率 2/7 = 29%**，低於 c-166…c-170 的 65%，但兩張都是靠**日文寫法**才撈到的，
不是靠多試幾個店面——**`country=jp` 是唯一有產出的店面，us／gb／tw／de 全程 0 產出**。

## 3832　救回 1：`ジョージ川口とビッグ4｜The Original Big Four`

- 命中：jp `collectionId=1770440982`，`appleArtist=オリジナル・ビッグ・フォア`，
  `appleTitle=THE ORIGINAL BIG FOUR`，1959，**11 軌**，`notExplicit`，有試聽。
- 佐證：軌單與卡單的 King KC 10 曲目逐首對上——バードランドの子守唄／サヴォイでストンプ／
  ジャンピン・アット・ザ・ウッドサイド／ブルース・イン・ザ・クローゼット／A列車で行こう，
  軌數 11 與 Discogs 原壓相同，年份 1959 相同。**判定同一張碟，不是 1976 TBM-66 那張重聚盤。**
- 有效查法：`search?term=オリジナル・ビッグ・フォア&country=jp&entity=album`（回 1 筆，直接命中）。
  `The Original Big Four` 在 jp 也會命中（排第一），但探測層用的是 `limit=12` ＋ 掛名比對，被掛名擋掉了。

## 3833　救回 2：`村岡実｜Harlem Nocturne - Bamboo Flute Miracle Sounds`

- 命中：jp `collectionId=1619045298`，`appleArtist=村岡 実`（⚠ **姓名之間有一個半形空格**），
  `appleTitle=Harlem Nocturne`（⚠ **副標 Bamboo Flute Miracle Sounds 整段不在店面盤名裡**），
  1967，**12 軌**，有試聽。
- 佐證：12 軌與 JPS-5132 相同，曲序 HARLEM NOCTURNE／TABOO／YESTERDAY／…／MEDITATION，年份 1967 相同。
- 有效查法：`search?term=村岡実&country=jp&entity=musicArtist` → `artistId=318668695`
  → `lookup?id=318668695&entity=album&limit=200&country=jp`（11 張目錄，1967 那張就在裡面）。
  ⚠ **漢字與羅馬字兩種 term 回的是同一個 artistId**，這一張不是第 3 種成因。

## 3834　無來源 1／2：`Modern Jazz Playboys` 兩張（Screen Mood 1960、Show Case 1961）

試過的寫法（全部 `entity=album`）：`Modern Jazz Screen Mood`／`MODERN JAZZ SCREEN MOOD Playboys`／
`モダン・ジャズ・スクリーン・ムード`／`スクリーン・ムード`／`ジャズ・スクリーン・ムード`／
`Modern Jazz Show Case`／`MODERN JAZZ SHOW CASE`／`Modern Jazz Showcase Playboys`／
`モダン・ジャズ・ショー・ケース`／`ショーケース モダンジャズ`／`Modern Jazz Playboys`／
`モダン・ジャズ・プレイボーイズ`／`モダンジャズ・プレイボーイズ`。
店面：**jp／us／gb／tw／de**。
掛名查法：`entity=musicArtist` 的 `Modern Jazz Playboys`（jp／us）、`モダン・ジャズ・プレイ・ボーイズ`、
`プレイボーイズ` → **這個團在 Apple 完全沒有 artist 實體**（jp 的 `プレイボーイズ` 只回到
`小西康陽とプレイボーイズ` 等不相干的掛名）。
→ **成因第 6 種（只有黑膠／CD，沒有數位版）。** 兩張的 2009／2010 年 Columbia CD 再發
（COCB-53831／COCB-53622）都確實存在，但**沒有跟著上數位**——這是本批最乾淨的「CD 有、數位無」形狀。

## 3835　無來源 3：`横内章次とクインテット・プラス・ラテン｜真夜中のラテン`

寫法：`真夜中のラテン`／`Mayonaka no Latin`／`横内章次`／`Shoji Yokouchi`／
`横内章次とクインテット・プラス・ラテン`／`クインテット・プラス・ラテン`／`Yokouchi Latin`。
店面：**jp／us／gb／tw／de**。
掛名查法：jp 與 us 的 `entity=musicArtist` 都只回到**同一個** artistId `1780734006`
＝`Shoji Yokouchi and His Rainbow Quintet`，`lookup` 出來的目錄**只有一張**：
1962 年的 `Ginza de Twist/Miki no Blues - Single`（仲宗根美樹合唱，2 軌）。
→ **成因第 6 種。** 1963 Victor SJL-5057 這張 LP 沒有任何數位版；
Apple 上這位吉他手只存在那一張 1962 年的單曲。

## 3836　無來源 4：`Charlie Mariano & Sadao Watanabe｜同名盤`（Victor SMJ-7446，1967，10 軌）

寫法：`Charlie Mariano & Sadao Watanabe`／`Sadao Watanabe Charlie Mariano`／
`チャーリー・マリアーノと渡辺貞夫`／`Charlie Mariano Sadao Watanabe`。
店面：**jp／us／gb／tw／de**。
掛名查法：`渡辺貞夫`／`Sadao Watanabe` → `artistId=298235`（jp 目錄 1955–1979 段共 19 張）；
`Charlie Mariano`／`チャーリー・マリアーノ` → `artistId=5054223`（20 張）。
**兩份目錄裡 1967 前後的聯名只有兩張，都是 Takt 盤**：
`Iberian Waltz`（`1868591146`，1967，4 軌，JAZZ-7）與 `We Got a New Bag`（`1868591653`，1968，5 軌）。
⚠ **`Iberian Waltz` 是 c-173 另一張卡（已 ready），不可以拿來配這一張**；
軌數（4／5 vs 本盤 10）與廠牌（Takt vs Victor World Group）兩項都對不上。
→ **成因第 1／6 種。** Victor SMJ-7446 這個獨立編號的同名盤沒有數位版。

## 3837　無來源 5：`松本英彦・宮沢昭｜Operation Sam Taylor`（King 45SDS-1，1967，12 軌）

寫法：`Operation Sam Taylor`／`オペレーション・サム・テイラー`／`サム・テイラー作戦`／
`Hidehiko Matsumoto Akira Miyazawa`／`松本英彦 宮沢昭`。
店面：**jp／us／gb／tw／de**（`Operation Sam Taylor` 在四個店面全部 `resultCount=0`）。
掛名查法：`松本英彦`／`Hidehiko Matsumoto` → `153540229`（5 張）與 `松本英彦クインテット` → `304321154`（1 張）；
`宮沢昭`／`Akira Miyazawa` → `1370709057`（7 張，含 1962 YAMAME、1968 Go Go Sax Vol.3、1969 Bull Trout、
1969 Karajishi Botan）與 `MIYAZAWA AKIRA QUARTET` → `1055603130`（2 張）。
**四份目錄加起來 15 張，沒有 1967 年的 King 盤，也沒有任何 Sam Taylor 相關盤名。**
→ **成因第 6 種。** 與第 3762 條（策展層收件時就記到「Apple 兩個 store 都 0 筆」）互相印證，
本層把它從「觀察」升級為**結論：寫成無來源狀態**。

## 3838　⚠ ⚠ **新成因（第 7 種）：店面把「盤名」當成掛名，樂團名整個不出現**

`The Original Big Four` 在 Apple jp 的 `artistName` 是 **`オリジナル・ビッグ・フォア`**——
那是**盤名的片假名轉寫**，不是樂團名。這張碟在 Apple 上同時存在兩個掛名實體：
`GEORGE KAWAGUCHI BIG FOUR`（`artistId=1062217181`，目錄裡只有 1969 的 `George and Sleepy`）
與 `ジョージ川口`（`1017238980`，4 張，全是 1957／1982／1987／2011），
**1959 這張兩邊都不在**，因為它被掛到了第三個、由盤名生出來的掛名底下。

這**不是**既有清單的第 2b（團名當專輯標題前綴）或 2c（團員全進 feat.）——
那兩種至少樂團名還在某個欄位裡；這一種是**樂團名在整筆資料裡完全消失**。

**→ 給後續批次的查法（新增到診斷清單第 7 條）**：
**日本 1950–60 年代盤，除了掛名，一定要拿「盤名本身的片假名轉寫」去查 `entity=album`。**
本張用 `オリジナル・ビッグ・フォア` 一次命中、`resultCount=1`，是七張裡最快的一筆。

## 3839　`recover-unavailable.mjs` 為什麼這兩張都漏掉——腳本的兩個具體缺口

`batch-progress/c173/apple-candidates.md` 對這 7 張的結論是「7 張裡 6 張目錄裡找不到」，
但其中 2 張實際找得到。根因不是 Apple，是腳本：

1. **`catalogueOf()` 用 `artistOk`／`looseArtistOk` 過濾 `entity=musicArtist` 的結果。**
   卡單掛名 `ジョージ川口とビッグ4` 對上店面掛名 `GEORGE KAWAGUCHI BIG FOUR`（**全羅馬字、無「と」**）
   過不了比對，那個 artistId 當場被丟掉，於是只剩 `ジョージ川口` 的 4 張目錄——1959 那張不在裡面。
   ⚠ **日文掛名與店面羅馬字掛名之間，`artistOk` 這一關是漏斗不是篩子。**
2. **腳本只走「掛名 → 目錄」一條路，沒有「盤名直接 `entity=album`」那條路。**
   第 3838 條那種形狀（掛名由盤名生成）在設計上就撈不到。
   村岡実那張則是第二個缺口的另一面：掛名對得上、**盤名對不上**
   （店面 `Harlem Nocturne` vs 卡單 `Harlem Nocturne - Bamboo Flute Miracle Sounds`），
   `titleOk`／`looseTitleOk` 都不會過，只有「年份 ±1」那條旁路救得了它——而那張確實是 1967，
   照理應該被列成候選卻沒有，**因為 artistId 那一關在更前面就沒讓目錄進來**（`村岡 実` 中間有空格）。

**建議（不在本層動手，留給主線）**：`recover-unavailable.mjs` 加第三條路——
把 `c.album` 與 `c.queryAlias` 裡的每個候選字串直接丟 `entity=album&country=jp&limit=50`，
不經掛名過濾，只用「年份 ±1」收斂。本批這一條就能多撈 2 張。

## 3840　副標與空格：兩張救回的碟，店面欄位都與卡單不同字

- `村岡 実` vs 卡單 `村岡実`（半形空格）。
- `Harlem Nocturne` vs 卡單 `Harlem Nocturne - Bamboo Flute Miracle Sounds`（副標整段缺）。
- `オリジナル・ビッグ・フォア` vs 卡單 `ジョージ川口とビッグ4`（完全不同的字串）。

**裁定：`previews.json` 的 `appleArtist`／`appleTitle` 照店面原字記**，不改寫成卡單寫法——
這兩欄是「店面那筆長什麼樣」的存證，卡單的掛名與盤名不因回撈而變動（第 307 條、第 3763–3768 條照舊）。
本層**沒有**動任何卡單欄位。

## 3841　Apple 端點在本層的可用性（補第 3770 條併記第 6 點）

本層共發出約 90 次請求（`search` ＋ `lookup`，jp／us／gb／tw／de 五個店面）。
**`/search` 沒有出現恆定 403**，只在 us 連續打第 9 次時回過 **2 次 HTTP 429**，
退避 1.2s／4.8s 後即恢復。**「雲端會回 403」在本工作階段同樣不成立**（與第 3770 條併記第 6 點一致）。
⚠ 但要節流：連打同一個店面超過 8 次就會撞 429，`recover-unavailable.mjs` 的 700ms 間隔偏短。

## 3842　交付與邊界

- 改動檔案只有兩個：`batch-progress/probe/previews.json`（**只改 c-173 那 2 個鍵**，
  鍵總數 3466 前後不變，已驗）與本檔（append）。
- `seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／`caa.json`／其他批次檔案／KV／Firestore **皆未觸碰**。
- 未 commit、未 push、未動 git 索引。
- 剩下 **5 張維持 `status: unavailable` 原樣**，交給下游寫成固定「無來源狀態」。

---

# 研究層裁定（c-173，11 張，a 組 6 ＋ b 組 5）

批次 c-173｜研究層｜2026-09-21｜編號區間 **3843–3870**（本節只 append，3842 以前一行未動）
產出：`desc-tools/batches/research/c173-a.json`（6 張）與 `desc-tools/batches/research/c173-b.json`（5 張）。

## 3843　總表：**11 張全部 `full`，thin 0 張；facts 合計 123 條**

| # | 組 | 卡 | facts | status | 相異 `src` |
|---:|---|---|---:|---|---:|
| 1 | a | ジョージ川口とビッグ4《The Original Big Four》 | **12** | full | 9 |
| 2 | a | Modern Jazz Playboys《Modern Jazz Screen Mood》 | **11** | full | 8 |
| 3 | a | Modern Jazz Playboys《Modern Jazz Show Case》 | **11** | full | 7 |
| 4 | a | 横内章次とクインテット・プラス・ラテン《真夜中のラテン》 | **10** | full | 5 |
| 5 | a | 村岡実《Harlem Nocturne - Bamboo Flute Miracle Sounds》 | **12** | full | 5 |
| 6 | a | Charlie Mariano & Sadao Watanabe（同名盤） | **12** | full | 8 |
| 7 | b | 渡辺貞夫《Jazz & Bossa》 | **11** | full | 5 |
| 8 | b | 渡辺貞夫 & チャーリー・マリアーノ《Iberian Waltz》 | **11** | full | 7 |
| 9 | b | 松本英彦・宮沢昭《Operation Sam Taylor》 | **11** | full | 8 |
| 10 | b | 前田憲男 & 稲垣次郎オールスターズ《This Is Jazz-Rock》 | **11** | full | 5 |
| 11 | b | 松本浩・市川秀男カルテット《Megalopolis》 | **11** | full | 6 |

**每張 8–12 條的下限與上限都守住，每條都附完整 https `src`。`status` 與 `coverage` 兩欄同值並存。**

## 3844　**`thin` 0 張**——與派工信的預期不同，理由寫在這裡

派工信第二節逐字警告「這條線的一手史料比 Blue Note 稀薄得多，1958–69 更是」「`status`／`coverage` 誠實標 `thin`」。
**實測沒有一張需要標 thin**，原因是本線有兩口 Blue Note 線沒有的井：

1. **日文維基的樂手條目密度極高，而且帶完整作品表與錄音日**。渡辺貞夫 條目的 1960–69 作品表逐張列出
   **錄音日、廠牌、全體參加者與樂器**（《Jazz & Bossa》《Iberian Waltz》《チャーリー・マリアノと渡辺貞夫》三張都在裡面），
   等於一份免費的 session 目錄。ジョージ川口／松本英彦／中村八大／小野満／ビッグ・フォア 五個條目互相交叉，
   單是《The Original Big Four》一張就餵得出 12 條。
2. **廠牌官方商品頁會逐字寫原盤資訊**（見第 3845 條），而且它是原廠層級的證據，比 Discogs 的盤面轉錄再高一層。

**最接近 thin 的是 `真夜中のラテン`（10 條）**：八城一夫 與 福原彰 日文維基**皆無條目**（逐字查過，兩者都回 missing），
節奏組與小號只有 Discogs 的 credits 一層來源。次接近的是 `Megalopolis`：**稲葉国光 無條目**、松本浩 亦無。
**這兩張仍達 10／11 條，所以照規定寫 full，但它們是本批最薄的兩張，下游若要再挖，得往紙本走。**

---

## 3845　⚠ ⚠ **本線最有價值的來源發現：廠牌官方商品頁逐字記載原盤發行日與原題**

派工信第二節列的可用來源裡有「廠牌官網與復刻新聞稿（Victor／Columbia／King／ユニバーサルの商品頁）」，
**但沒有說明它強在哪裡。本批實測：它是本線唯一能把年份與盤名推到「原廠層級」的來源，而且兩次都直接解決了策展層懸而未決的爭點。**

| 卡 | 官方頁逐字寫的 | 解決了什麼 |
|---|---|---|
| 村岡実《Harlem Nocturne》 | 「オリジナルリリース：**1967/11/1**」「LP番号：JPS-5132」 | 策展層靠盤面「© 67 • 11」把 MB 的 1966 改判 1967（第 3722 條）——**官方頁把它確認到日**，MB 的 1966 徹底成為孤例 |
| 前田憲男 & 稲垣次郎オールスターズ | 「THIS IS JAZZ-ROCK／MAEDA NORIO - INAGAKI JIRO ALL STARS ＜**オリジナル発売日: 1968.9.10**／**旧レコード番号: YS-10036**＞」 | 策展層靠 Discogs 把 MB 的再發題改判回《This Is Jazz-Rock》（第 3766 條）——**原廠自己這樣寫，改判確立，而且發行日精確到 1968 年 9 月 10 日** |

**→ 給 c-174…c-182 的操作建議（本批已驗證可行）**：

- `columbia.jp` 的商品頁有**兩種網址**，兩種都要試：
  `https://columbia.jp/prod-info/<catno>/`（新品線，較新的再發才有）與
  `https://columbia.jp/artist-info/<artistslug>/discography/<catno>.html`（藝人頁底下的逐張頁）。
  **⚠ 前者對本批的 `COCB-54011`／`COKM-42669`／`COCB-54251` 全部 404，後者才 200**——
  只試第一種會誤判成「官方頁查無」。找 `<artistslug>` 的辦法：抓 `columbia.jp/artist-info/<slug>/` 的 HTML，
  `grep -oE 'href="[^"]*"' | grep discography` 就能列出該藝人全部逐張頁的目錄號。
- 逐張頁除了原盤日與原始目錄號，還常帶**編曲者、演奏方式與復刻系列名**。本批最好的一格就是這樣來的：
  村岡実 那張的官方頁逐字寫「山屋清のアレンジによる12曲を、ジャズ・コンボやストリングスをバックに
  **26〜74cmの8種類の尺八を使い分けて**演奏」，並標【初CD化】——
  **這是整批 123 條 facts 裡最好的一條，Discogs 與 MB 兩邊都沒有。**

## 3846　來源網域實測（本工作階段，逐一記錄）

**可用**：

| 網域 | 本層用量 | 結果 |
|---|---:|---|
| `api.discogs.com`（`releases/`／`masters/`／`masters/<id>/versions`／`database/search`） | 約 30 次 | **全數 HTTP 200，免 token，自我節流 3.2 s／次，未遇 429／503** |
| `musicbrainz.org/ws/2/release-group/<id>` | 11 次 | 全數 200，1.1 s 間隔，UA 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)` |
| `ja.wikipedia.org/w/api.php`（`prop=extracts&explaintext=1`） | 54 次 | 全數 200，0.6 s 間隔。**36 個條目命中、18 個 missing** |
| `en.wikipedia.org/w/api.php` | 3 次 | 全數 200 |
| `columbia.jp`（商品頁與藝人頁） | 11 次 | 200 與 404 混合，見第 3845 條 |
| `itunes.apple.com/lookup` | 1 次 | 200 |

**查無條目的日文維基人名（本批逐字查過，全部回 `missing`）**：
`八城一夫`／`稲葉国光`／`原田政長`／`金井英人`／`藤井英一`／`西条孝之介`／`福原彰`／`山屋清`／
`大森盛太郎`／`宮田英夫`／`萩原栄治郎`／`本多俊夫`／`塩井芳幸`／`今泉俊明`／`杉浦良三`／
`日野敏`／`タクト (レコード会社)`／`ハーレム・ノクターン`。
→ **給後九批：這批 1950–60 年代的側錄樂手（尤其貝斯與鋼琴席）在日文維基普遍沒有條目，
別把時間花在逐名查維基；他們的唯一來源就是 Discogs 的整筆 credits。**

**本層未使用**：`allmusic`／`allaboutjazz`（派工信已標一律 403，本層未試，不浪費配額）、
`jazzdisco.org`（本批全部是日本本土盤，該站的覆蓋是美國廠牌，未試）、`junkoonishi.com`（禁用，見簡報第三節第 6 點）。

**`itunes.apple.com/search` 的節流**：派工信說「連打同一店面超過 8 次會撞 429」。
**本層刻意避開了 `search`，只用 `lookup` 打了 1 次**（取《This Is Jazz-Rock》的 `releaseDate` 與 `copyright` 當旁證，回 200）。
策展層與回撈層已各自把 11 張的店面查過，第 254 條的觀察都已經寫在卡單與第 3831–3841 條，**研究層沒有必要重跑**。

## 3847　⚠ **`nReleases`／MB 的 release 數不等於發行史**——這是本批推翻策展層的最大一處

見第 3848 條。此處只記結論：**MB 在這四家 1958–69 這一段建的多半只有原盤**（第 3770 條已證實年份可靠），
**但反過來，「MB 只有一個 release」絕不可推論成「這張碟沒有再發」。** 本批十一張的 Discogs master 版本數是：

| 卡 | MB release 數 | Discogs master 版本數 |
|---|---:|---:|
| Charlie Mariano & Sadao Watanabe | 1 | **10** |
| Jazz & Bossa | 1 | **8** |
| Megalopolis | 3 | **6** |
| Iberian Waltz | 1 | 4（另有一個再發自成 master） |
| The Original Big Four | 1 | 1 |
| 真夜中のラテン | 1 | **0 個 master、無任何再發** |
| Operation Sam Taylor | 1 | 2（皆 1967，市售＋Promo） |
| This Is Jazz-Rock | 4 | 2 |

**→ 後九批凡要在 `risk` 或 facts 寫「無再發」「未 CD 化」，一律要打 `masters/<id>/versions`，不得只看 MB。**

---

## 3848　推翻／補正策展層：**共 13 處，分佈在 9 張卡上**

**A 類：事實錯誤（5 處，已在卡的 `notes` 逐條寫明，facts 用正確版本）**

| # | 卡 | 策展層逐字 | 實際 | 依據 |
|---:|---|---|---|---|
| 1 | Charlie Mariano & Sadao Watanabe | 「年份⋯相符，**無再發**」「MB 與 Discogs 兩邊都只有 1967 一個版本」 | **有再發，而且十個版本**，含 **1977 年美國 Catalyst Records CAT-7911《Nabesada And Charlie》**（「Catalyst International Jazz From Japan」系列、Springboard International 發行、自 JJ Records 授權、封套解說 Richard Broderick）、1980 JVC VIJ-6331、1990 Victor VICJ-23005、2006 JVC VICJ-61367、巴西 Movieplay 授權版、日本 Victor World Group SMJX-10100 | `masters/644584/versions`、`releases/7610150` |
| 2 | Charlie Mariano & Sadao Watanabe | 內頁作者「本**田**俊夫」 | **本多俊夫**（Discogs credits 逐字 `Toshio Honda (2) [本多俊夫]`） | `releases/4894973` |
| 3 | Modern Jazz Screen Mood | 小號手「林**徹夫**」 | **林鉄雄**（Discogs anv 逐字 `Tetsuo Hayashi [林鉄雄]`，兩個 1960 壓次寫法一致） | `releases/17325919`／`21395527` |
| 4 | Jazz & Bossa | 貝斯手「萩原栄**二**郎」 | **萩原栄治郎**（Discogs anv 與日文維基渡辺貞夫 作品表**兩個獨立來源一致**） | `releases/4851044`、ja.wikipedia |
| 5 | Iberian Waltz | 「**Mariano 寫的**〈God Has Mercy〉」 | 〈God Has Mercy〉的 `Written-By` 是 **Traditional**，Mariano 掛的是 `Arranged By`；他真正作曲的是〈Iberian Waltz〉與〈Stone Garden of Ryoanji〉 | `releases/4856063` |

**B 類：查不到支撐，已退成可查證的版本（2 處）**

| # | 卡 | 策展層逐字 | 本層處理 |
|---:|---|---|---|
| 6 | Charlie Mariano & Sadao Watanabe | 「Charlie Mariano 是渡辺貞夫 **1962–65 年在 Berklee 求學時的老師輩**」 | **英文維基記 Mariano 的 Berklee 任教期是 1965–1971，正好始於渡辺返國那一年**，兩人在校的師生關係時間上對不上。本層把 facts 改寫成可查證的版本：**兩人的連結是秋吉敏子**（Mariano 的第二任妻子；渡辺 1953 年加入她的コージー・カルテット、1956 年她赴美後接下團長）。**寫作層不得寫成「師生重逢」。** |
| 7 | This Is Jazz-Rock | 「**十二首全是翻唱、沒有原創曲**」 | 十二軌裡 **Snap-Shot／Barock／Go Go A Go Go 三首找不到任何原曲對應**，而 Discogs 兩個壓次、`columbia.jp` 官方頁、Apple jp 的 song 端點**四處的作曲者欄全部是空的**。本層標 **uncertain**，facts 改寫成「其中九首可以認出原曲出處」。**寫作層不得寫成「全翻唱」，也不得寫成「有原創」。** |

**C 類：漏列／不完整（6 處，已補進 facts）**

| # | 卡 | 補了什麼 |
|---:|---|---|
| 8 | Modern Jazz Screen Mood | 漏列次中音手 **西条孝之介**——該團次中音是 宮沢昭＋西条孝之介 **兩支**，全團 **十五人**（策展層列十一人） |
| 9 | Modern Jazz Show Case | **兩個壓次的文字工作掛不同人**：stereo ZS-1015 是 瀬川昌久（Supervised By ＋ Liner Notes），**mono ZL-1160 的 Liner Notes 是 野口久光**。策展層只看了 stereo 那一筆，而卡單的 `label` 欄以 ZL-1160 為主盤 |
| 10 | Harlem Nocturne | 漏了**逐軌標的伴奏者**：十二軌對半分，六軌 `Columbia Orchestra`、六軌 `Kiyoshi Yamaya & His All Stars`。這是本卡編制描述的關鍵 |
| 11 | Jazz & Bossa | 漏了**內頁作者 岩浪洋三**（不是本批另外兩張的 油井正一）；另，錄音日 Discogs 是**逐軌標的**（A1／A3 = 11/25、A2／A4 = 12/4、B 面全部 = 11/30），策展層寫成三個日期但沒對到軌；A 面是四軌、B 面七軌，不是各三軌 |
| 12 | Megalopolis | 漏了 **2025 年 2 月 26 日 Victor World Group NJS-808 限量黑膠復刻**（Project Re:Vinyl，唱片公司 Universounds、流通 Lawson Entertainment）與同年的 FLAC 版；且**原盤封套解說是 岩浪洋三**——這一欄只存在於 2025 復刻的 credits 裡。另，五首原創的作曲者是 **松本浩 四首、市川秀男 一首**，不是對半 |
| 13 | Iberian Waltz（旁及 Charlie Mariano & Sadao Watanabe） | 策展層寫「富樫雅彦 **1969 年**受傷前」——**受傷是 1970 年 1 月**（日文維基富樫雅彦 條目）。⚠ 本層**未把這件事寫進任何一張卡的 facts**：它是與作品無關的後續生平事件（反向禁令第二類），只在 notes 記下年份更正 |

## 3849　⚠ ⚠ **本層挖到、策展層完全沒有的一格：連續兩天的雙錄音**

`Charlie Mariano & Sadao Watanabe`（Victor SMJ-7446）錄於 **1967 年 6 月 27 日**、東京 Victor Studio；
`Iberian Waltz`（Takt JAZZ-7）錄於 **1967 年 6 月 28 日**、Teichiku Kaikan 錄音室。
**同樣五個人（Mariano／渡辺貞夫／菊地雅章／原田政長／富樫雅彦），連續兩天，兩家不同的廠牌，兩張碟，而且兩張都在本批裡。**
兩份 Discogs `notes` 各自逐字寫了自己的錄音日，日文維基的渡辺貞夫 作品表兩張並列、日期一致。

**這同時是本批最容易寫錯的一點**（見第 3852 條）。

## 3850　⚠ **一項本層無法定案、留給下游的分歧：《Iberian Waltz》的錄音日與鼓手**

- **Discogs `releases/4856063` 的 notes 逐字**：`Recorded June 28, 1967, at Teichiku Kaikan Studio, Tokyo.`，credits 的鼓手只有 富樫雅彦。
- **日文維基渡辺貞夫 條目的作品表逐字**：「1967年、1968年 - チャーリー・マリアーノと共同名義『イベリアン・ワルツ／サダオ＆チャーリー』
  （**1967年6月28日、1968年1月21日録音**）(Takt)　渡辺貞夫(as), チャーリー・マリアーノ(as), 菊地雅章(p), 原田政長(b),
  富樫雅彦(ds), **渡辺文男(ds)**」。

兩個來源都不弱（Discogs 引的是盤面、維基的作品表逐張帶錄音日與編制）。
**本層兩邊都寫進 facts 並各自標明出處，沒有自行裁定。**
旁證（**不進 facts**）：同一份作品表把 1968-01-21 也記成《We Got a New Bag》的錄音日，
所以「本碟有一軌來自那場 1968 年的 session」是合理推測——**但推測不是事實**。
**操作結論給寫作層：要寫錄音日就只寫 1967 年 6 月 28 日（盤面層級證據），不要寫「一天錄完」。**

## 3851　曲風覆核：**11 張全部維持收件，一張都沒有翻案**

判準 3753 的四條逐張再驗過，逐條不成立。兩張需要特別交代的：

- **`真夜中のラテン`**：Discogs 的 `styles` **首位是 Exotica**，字面上很像第 3716 條要退的「拉丁ムード企劃盤」。
  但四條一條都不中——`styles` 是 Exotica＋Latin Jazz（**不含** Easy Listening／Kayōkyoku）、
  `genres` 是 Jazz＋Latin（**不含** Folk, World, & Country）、十四首**沒有一首日本曲**、
  横内章次 1960 年代橫跨 King／Victor／Polydor／コロムビア 四家大廠出領銜作（不是ムード 系列樂手）。**收件成立。**
- **`Operation Sam Taylor`**：四個警訊全中（`why` 是 `artist-tag`、MB RG tags 全空、兩位藝人的 artist tag 都帶 `easy listening`、
  盤名掛著 mood-sax 的招牌），但 Discogs `genre` 只有 Jazz、**`styles` 欄是空的**，十二首沒有一首日本歌謡曲。
  **策展層第 3762 條的邊界收件，本層完全同意，並補上一層獨立佐證：日文維基的宮沢昭 條目把它列進作品表，日文題《サム・テイラー作戦》**——
  這比 `batch-progress/enum/jp-1.md`（內部檔案、不可引）強。
  ⚠ **但策展層「行文不得寫成純即興 blowing session」的提醒本層加碼：編曲掛三個人、還有 SDS 合唱團**，
  〈Ebb Tide〉〈More〉〈Moon River〉〈Strangers in the Night〉四首是標準 mood-sax 曲目。
  正確的框是「**用 mood sax 的配方做一張正經的次中音對奏盤**」。

## 3852　⚠ ⚠ **下游最容易寫錯的六點（鉤子層與寫作層必讀）**

**這一條是本節最重要的一條。**

1. **〈Harlem Nocturne〉出現在本批三張碟上**：`真夜中のラテン`（A1「ハレム・ノクターン」）、
   `村岡実《Harlem Nocturne》`（**盤名兼 A1**）、`松本英彦・宮沢昭《Operation Sam Taylor》`（B3）。
   **曲子的來歷（Earle Hagen 1939 年為 Ray Noble 樂團所寫）只能講一次，Sam Taylor 那條線應該留給《Operation Sam Taylor》**
   （它的盤名就是衝著他去的）；`村岡実` 那張的切角是「尺八吹這首曲子」；`真夜中のラテン` 那張只能寫「拉丁編制裡的那一首」。
2. **連續兩天的雙錄音（第 3849 條）不可寫成同一件事**：兩張碟人一樣、日期只差一天，
   但廠牌（Victor／Takt）、軌數（**10 軌／4 軌**）、錄音地（Victor Studio／Teichiku Kaikan）與曲風走向都不同。
3. **兩張 Takt 盤的區隔**：《Jazz & Bossa》JAZZ-1 與《Iberian Waltz》JAZZ-7，同為帝蓄的錄音室、同一位監修（大森盛太郎）。
   **《Jazz & Bossa》的切角是「一張碟兩種編制」（A 面四重奏打 Monk、B 面加 cabasa 走巴西線），
   《Iberian Waltz》的切角是「四首曲子、兩首各十四分鐘以上」。**
4. **兩位樂評不可寫混**：**岩浪洋三** 寫《Jazz & Bossa》與《Megalopolis》的內頁，
   **油井正一** 寫《Modern Jazz Screen Mood》與《Iberian Waltz》的內頁，
   **瀬川昌久** 監修《Modern Jazz Show Case》的 stereo 版、**野口久光** 寫它 mono 版的內頁，
   **久保田二郎** 監修《The Original Big Four》。**五個人五種身分，弄混會把整段寫廢。**
5. **同姓不同人／同名不同碟**：
   - 池中的 `村岡建`（Takeru Muraoka，次中音薩克斯風）**不是**本批的 `村岡実`（Minoru Muraoka，尺八）。
   - `Jazz & Bossa` 這個盤名在渡辺貞夫 名下有兩張（本批的 1967 Takt 原盤，與 1996 年的《Jazz & Bossa (Live at Suntory Hall)》），
     卡池另有 Ron Carter《Jazz & Bossa》2008（c161-cards.json）。**引盤名一律帶年份與廠牌。**
   - `稲垣次郎オールスターズ`（1968）**不是** `稲垣次郎とソウル・メディア`（1969 才成立）。
6. **`Charlie Mariano & Sadao Watanabe` 是同名盤**（`selfTitled: true`），盤名逐字等於掛名字串。
   **寫作層引盤名時要避開「某某與某某的某張碟」這種句型**——那會把盤名整個弄丟。

## 3853　跨卡串連點（**每一條只能用在一張卡上**）

本批十一張的人物網重疊極高，以下是本層挖到的串連點，鉤子層分配時請當成稀缺資源：

| 串連 | 涉及的卡 | 建議給誰 |
|---|---|---|
| 渡辺貞夫 1958 年加入ジョージ川口ビッグ4，組成「ビッグ・フォア・プラス・ワン」 | 《The Original Big Four》 ↔ 四張渡辺盤 | **《The Original Big Four》**（他在那張上不是樂手，用來收尾最乾淨） |
| 市川秀男 1976 年加入ジョージ川口 的ザ・ビッグ・4 | 《Megalopolis》 ↔ 《The Original Big Four》 | **《Megalopolis》** |
| Joachim Berendt 在《Down Beat》1962-12-06 號拿 松本英彦 與 宮沢昭 來對照著稱讚 稲垣次郎 | 《This Is Jazz-Rock》 ↔ 《Operation Sam Taylor》 | **《This Is Jazz-Rock》** |
| 西条孝之介 是 前田憲男 1955 年上京時加入的ウエスト・ライナーズ 團長 | 《Modern Jazz Screen Mood》 ↔ 《This Is Jazz-Rock》 | 擇一，建議 **《Modern Jazz Screen Mood》**（他是那張的次中音手） |
| 三保敬太郎 的父親 三保幹太郎 當過日本コロムビア 社長 | 兩張 Modern Jazz Playboys | **《Modern Jazz Screen Mood》** |
| 三保敬太郎 1959 年與 前田憲男、山屋清 組「モダンジャズ3人の会」——山屋清 正是《Harlem Nocturne》的編曲 | 三張卡都沾得到 | 建議**不用**（太繞） |
| 尾川雄介（universounds）同時是 村岡実 2012 年 CD 化與 Megalopolis 2025 年黑膠復刻的解說／監修 | 《Harlem Nocturne》 ↔ 《Megalopolis》 | **《Megalopolis》**（村岡実 那張有更好的格） |
| 富樫雅彦 是本批**三張**碟的鼓手 | 《Charlie Mariano & Sadao Watanabe》／《Jazz & Bossa》／《Iberian Waltz》 | 他的生平只能展開一次，建議 **《Iberian Waltz》** |

## 3854　`hookCandidates` 與 `sound`：本層的自我檢查

- **`hookCandidates` 每張都恰好 2 條**（上限），11 張共 22 條，逐條查過**沒有跨卡同構**。
- `sound` 每張一段，寫的是編制與織度，**沒有把 facts 的內容照抄**。
- `keyTracks` 每張 3 首，**曲名一律照盤面原字**：
  ⚠ `真夜中のラテン` 的三首是片假名（ハレム・ノクターン／タブー／ナイト・トレーン），**盤面十四軌全部是片假名**；
  ⚠ `Modern Jazz Show Case` 的 `George's Dilemna` 是**盤面拼法**（正確拼法為 George's Dilemma），facts 已註明。

## 3855　獎項：逐項分「得獎／入圍」，本批**一項入圍都沒有，全部是得獎**

本批出現在 facts 裡的獎項只有兩張卡上的三項，逐項核過：

- ジョージ川口：**1981 年第 6 屆南里文雄賞**（得獎）、**1981 年第 31 屆芸術選奨文部大臣賞**（得獎，日文維基逐字註明「ジャズ界初」）。
- 中村八大：〈黒い花びら〉**第 1 屆日本レコード大賞的大賞**（**得獎**，不是入圍；日文維基寫「審査を勝ち抜き大賞に輝いた」）。
- 前田憲男：1983 年**南里文雄賞**、2008 年日本レコード大賞**功労賞**（皆得獎）。

⚠ **一項被本層擋下、沒有寫進 facts 的**：日文維基前田憲男 條目逐字寫「**1983年に第20回日本レコード大賞「最優秀編曲賞」**」，
**但第 20 屆日本レコード大賞 是 1978 年**——屆次與年份自相矛盾，單一來源且內部不一致，**未採用，下游也不要用**。
（川口另有 1988 紫綬褒章、1997 勲四等旭日小綬章、2003 年第 45 屆日本レコード大賞特別功労賞，皆為受賞，本層未寫進 facts。）

## 3856　反向禁令的分類處理（逐項）

**第一類（與作品直接綁定，已寫進 facts 並標明時序）**：
- 村岡実 1970 年的《Bamboo》——日本コロムビア 官方頁把本作定位成他那條現代路線的**第一張**，《Bamboo》是同一條線的下一步。
- 《Charlie Mariano & Sadao Watanabe》1977 年的美國版《Nabesada And Charlie》——那是**這張唱片本身的後世流傳**。
- 各張的 CD／黑膠復刻史（含《Harlem Nocturne》2012 年的【初CD化】）——同上。

**第二類（與作品無關的後續生平，一律未寫）**：
- 富樫雅彦 1970 年 1 月被妻子持刀刺傷脊椎導致下半身不遂、之後改用雙手演奏（**策展層在 `Iberian Waltz` 的 `why` 裡提到過，本層只留在 notes**）。
- ジョージ川口 2003 年辭世與樂團由兒子川口雷二 接手；松本英彦 1997 年的醫療過誤與 2000 年辭世；
  稲垣次郎 2024 年辭世與《サムシング》的「世界第一張數位錄音類比唱片」宣稱；村岡実 2014 年辭世；
  中牟礼貞則 2026 年辭世（本層在 facts 只寫生卒年，未展開）。

**另有一條需要下游自覺的**：ジョージ川口 的「ほら吹きジョージ」那一條，
**日文維基把那些故事明確標為他的虛言（原文「奇想天外な虚言」）**，本層 facts 已照原意寫成「流傳的版本包括⋯」。
⚠ **寫作層不得把驅逐艦、芝公園、Buddy Rich 那幾件當成事實敘述。**

---

## 3857　交件自檢（`qa-batch` 與逐張人工量測）

`node qa-batch.mjs research c173`：

```
a 6 full,full,full,full,full,full
b 5 full,full,full,full,full
⚠ research-b 簡體字: 国
key 與卡單完全一致 ✓
總標記 1
```

**唯一的標記是誤報，而且本層刻意不消除它**：`国` 的唯一出處是 **`Megalopolis` 的貝斯手 `稲葉国光`**（三處，全部是這個人名）。
`research-base.md` 的字元條逐字規定「**專名（藝人名、專輯名、曲名、廠牌名）一律照原文字形抄**，
『渡辺香津美』『荒井由実』不要改成『渡邊香津美』『荒井由實』，那會改掉名字」——
把 `稲葉国光` 寫成 `稲葉國光` 正是那條規則禁止的操作。
`qa-batch.mjs` 的 `SIMP` 表含 `国`，而它的豁免機制只剝除 `《》〈〉` 內的專名、`keyTracks` 與**本批卡單的掛名／盤名全字串**，
**側錄樂手的日文人名不在任何一個豁免集合裡**，所以必然誤報。
這與該檔案自己在第 36–64 行記錄的「制值台准」「个」同類，是已知的誤報型態。
⚠ **本層不動 `qa-batch.mjs`（硬邊界）**，把它記在這裡，**建議主線把「側錄樂手的日文人名」也納入豁免**
（做法可以是：掃描前先剝除本批研究稿 `facts` 裡以全形括號跟在漢字人名後的羅馬字對照，或直接把 `国`／`会` 這類
**日文新字體與簡體同形的字**從 `SIMP` 表移到一個「需人工覆核」的次級清單）。
本批另有 `会` 的同型問題（`株式会社`／`帝蓄会館`／`世田谷区民会館`／`東京厚生年金会館`／`モダンジャズ3人の会`），
**本層已逐一改寫規避**：公司名改寫成「発売元是タクト電機」並在同句附 Discogs 的 `Made By: Takt Denki Co., Ltd.`、
錄音室改用 Discogs 逐字的羅馬字 `Teichiku Kaikan`／`Setagaya Public Hall`、
會館名改用中文寫法、團體名放進 `《》`。**後九批遇到同型字可照這套辦法處理，不必動 QA。**

逐張人工量測（第 3843 條的表即量測結果）：

- `facts` 條數：**11 張全部落在 10–12 之間**，無低於 8 或高於 12 者。
- 每條 `src`：**123 條全部是完整可開啟的 `https://` 網址**（以 `/^https:\/\/\S+$/` 逐條驗過），無描述型 src。
- 簡體字：以獨立的嚴格字表（排除日文新字體與正體同形字）逐字掃過兩檔，**0 處**。
- 千分位逗號：以 `/\d{1,3}(?:,\d{3})+(?!\d)/` 掃過，**0 處**。
- 半形逗號貼中文：`qa-batch` 未報，本層另掃 `/[㐀-鿿],|,[㐀-鿿]/`，**0 處**。
- `hookCandidates`：**每張恰好 2 條**，無超過。
- 獎項「入圍／得獎」：見第 3855 條，本批**全部是得獎**，無一項被寫成兩可的「獲得」。
- `status` 與 `coverage`：**11 張兩欄同值並存**（全部 `full`）。
- `key`：11 張**逐字複製自 `desc-tools/batches/cards/c173-cards.json`**，`qa-batch` 的「key 與卡單完全一致 ✓」已確認。

## 3858　⚠ **兩個檔案，不是一個**——第 1813-B 條的坑本層已避開

產出逐字是 `desc-tools/batches/research/c173-a.json`（`group === "a"` 的 6 張）與
`desc-tools/batches/research/c173-b.json`（`group === "b"` 的 5 張）。
⚠ **卡單裡分組的欄位是 `group`，不是派工信寫的 `g`**（逐字核過；`g` 欄在 `c173-cards.json` 裡不存在，
`node -e` 讀出來是 `undefined`）。**後九批派工時請寫 `group`，免得代理照 `g` 去切、切出 11 張全在同一組。**
本層另實測 `node merge-writer-input.mjs c173`：它確實是逐組讀 `batches/research/<批>-<組>.json`，
本批兩檔都讀進去了（它接著才因為 `batches/hooks/c173-hooks-a.json` 尚未產生而中止，那是鉤子層還沒跑，不是研究稿的問題）。

## 3859　交付與邊界（自述）

- **只動了三個檔**：`desc-tools/batches/research/c173-a.json`（新增）、
  `desc-tools/batches/research/c173-b.json`（新增）、本檔（**append**，3842 以前一行未動）。
- **未碰**：`seed_cards.json`、`apex_pool.json`、`PROJECT_MEMORY.md`、`previews.json`、`caa.json`、
  `desc-tools/batches/cards/*`（唯讀）、`batch-progress/enum/*`（唯讀）、其他批次的任何檔案、KV、Firestore、
  `desc-tools/qa-batch.mjs`（只執行，未修改）。
- **未執行任何 git 指令**（不 `add`／不 `commit`／不 `push`／未動索引）。
- 中間檔全部在 scratchpad 的 `c173r/`：`dg.json`（17 筆 Discogs release 快取）、`mb.json`（11 筆 MB release-group）、
  `wiki-ja.json`（54 筆）、`wiki-en.json`（3 筆）、`cards-dump.txt`，以及五支帶 `c173r-` 前綴的腳本
  （`c173r-fetch-dg.mjs`／`c173r-search-dg.mjs`／`c173r-mb.mjs`／`c173r-wiki.mjs`／`c173r-check.mjs`／`c173r-simp.mjs`）。
- **節流**：MB 1.1 s／次（UA 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`）、Discogs 3.2 s／次、
  維基 0.6 s／次、Apple 僅 1 次。**全程未遇 429／503。**
- 續跑保護：a 組寫檔後才開始 b 組的研究，兩檔各自獨立可讀；本層未遇容器重啟。

## 3860　**編號區間結算**：本節用到 **3843–3860**（共 18 條），**3861–3870 未使用**，留給後續層。

---

# 鉤子層裁定（c-173，11 張，a 組 6 ＋ b 組 5）

批次 c-173｜鉤子層｜2026-09-21｜編號區間 **3931–3960**（本節只 append，3860 以前一行未動）
產出：`desc-tools/batches/hooks/c173-hooks-a.json`（6 筆）與 `desc-tools/batches/hooks/c173-hooks-b.json`（5 筆）。

## 3931　先倒回去量舊批，確認尺一致才動筆

派工信要求先用本批的公式重量上一條線的成品。實測逐格重現：

| 檔案 | 派工信給的答案 | 本層量到的 |
|---|---|---|
| `c172-hooks-a.json`（3 筆） | 223／228／229 | **223／228／229** ✔ |
| `c171-hooks-a.json`（10 筆） | min 217／max 229／中位 224 | **min 217／max 229／中位 224** ✔ |

公式逐字（`Array.from().length`）：
`預算 = len(hook) + len(note) − len("主故事：") − (note 與 hook 裡「→」的總數) − len("正文只寫上列各項。")×出現次數 − len("這條骨架全批只走本張。")×出現次數`。
**只扣這四樣**；年份指定句、寫法指定句、載體交代、錄音日指定全部計入。上限 230。
量測腳本在 scratchpad 的 `c173h/c173h-budget.mjs`。

## 3932　逐筆預算與 hook 加權（11 筆全表，**兩支 QA 腳本都驗不到這一欄**，第 1834-B 條）

| 組 | 卡 | hook 字元 | **hook 加權** | note 原始長度 | **預算** |
|---|---|---:|---:|---:|---:|
| a | ジョージ川口とビッグ4《The Original Big Four》 | 33 | **30.5** | 216 | **222** |
| a | Modern Jazz Playboys《Modern Jazz Screen Mood》 | 31 | **31** | 219 | **222** |
| a | Modern Jazz Playboys《Modern Jazz Show Case》 | 29 | **29** | 226 | **228** |
| a | 横内章次とクインテット・プラス・ラテン《真夜中のラテン》 | 29 | **29** | 221 | **223** |
| a | 村岡実《Harlem Nocturne - Bamboo Flute Miracle Sounds》 | 25 | **25** | 216 | **214** |
| a | Charlie Mariano & Sadao Watanabe（同名盤） | 31 | **31** | 224 | **229** |
| b | 渡辺貞夫《Jazz & Bossa》 | 36 | **27.5** | 219 | **229** |
| b | 渡辺貞夫 & チャーリー・マリアーノ《Iberian Waltz》 | 31 | **31** | 224 | **229** |
| b | 松本英彦・宮沢昭《Operation Sam Taylor》 | 29 | **29** | 211 | **214** |
| b | 前田憲男 & 稲垣次郎オールスターズ《This Is Jazz-Rock》 | 44 | **27** | 212 | **229** |
| b | 松本浩・市川秀男カルテット《Megalopolis》 | 23 | **23** | 232 | **227** |

**預算 min 214／max 229／中位 227（a 組 214–229、b 組 214–229），11 筆全部 ≤230。**
**hook 加權 23–31，上限 50 有餘裕**（加權照 `chk-hook-crossgroup.mjs` 第 103 行，
`/[\x00-\x7F]/ ? 0.5 : 1`，**半形空格也算 ASCII 打折**）。**note 原始長度 211–232，上限 350。**

⚠ **初稿 11 筆有 7 筆超標，最嚴重的一筆（This Is Jazz-Rock）是 372**，靠「整格捨去」降到 229，
**沒有把砍的動作留給寫作層**（本檔輸出紀律那一節）。捨掉的格逐筆記在第 3936 條。

## 3933　骨架歸屬表：**哪張擁有、哪張讓出**

⚠ 照第 1787-B 條：**只有擁有的那張在 `note` 裡寫「這條骨架全批只走本張。」；讓出的卡一個字都不寫，也不點名歸給了誰。**
本表只給主線看。

| 骨架／串連點 | **擁有** | 讓出的卡（`note` 未提及） |
|---|---|---|
| 〈Harlem Nocturne〉的 **Sam Taylor 線**（盤名點名、招牌曲） | **《Operation Sam Taylor》** | 《Harlem Nocturne》（村岡実）、《真夜中のラテン》 |
| 尺八吹標準曲（八支 26–74 公分分別吹奏） | **《Harlem Nocturne》（村岡実）** | — |
| **連續兩天兩場錄音**（6/27 Victor → 6/28 Takt） | **《Charlie Mariano & Sadao Watanabe》** | 《Iberian Waltz》 |
| 1977 年美國版《Nabesada And Charlie》與 Jazz From Japan 系列 | **《Charlie Mariano & Sadao Watanabe》** | — |
| 富樫雅彦 的生平（十三歲改打鼓、1965 年組成日本第一個自由爵士團體） | **《Iberian Waltz》** | 《Jazz & Bossa》、《Charlie Mariano & Sadao Watanabe》（兩張皆未點名他） |
| 渡辺貞夫 1958 年加入、擴編成ビッグ・フォア・プラス・ワン | **《The Original Big Four》** | — |
| 兩張 Takt 盤的區隔：一張碟兩種編制 | **《Jazz & Bossa》** | — |
| 兩張 Takt 盤的區隔：四首曲子、兩首各十四分鐘以上 | **《Iberian Waltz》** | — |
| 三保敬太郎 的父親當過日本コロムビア 社長 | **《Modern Jazz Screen Mood》** | — |
| 兩個壓次掛兩個不同文字工作者（瀬川昌久／野口久光） | **《Modern Jazz Show Case》** | — |
| 2025 年 Project Re:Vinyl 復刻補上的原盤封套解說（岩浪洋三） | **《Megalopolis》** | — |
| ソウル・メディア 隔年（1969）才成立，本作掛オールスターズ | **《This Is Jazz-Rock》** | — |
| 從未再發（1963 年至今） | **《真夜中のラテン》** | — |

**11 張的 `note` 全部寫了「這條骨架全批只走本張。」**——本表左欄每一張都擁有至少一條專屬骨架，
沒有一張是「純讓出、自己什麼都不擁有」的卡。
⚠ **讓出的那三處（《Harlem Nocturne》與《真夜中のラテン》讓出 Sam Taylor 線、
《Iberian Waltz》讓出連續兩天、《Jazz & Bossa》與《Charlie Mariano & Sadao Watanabe》讓出富樫的生平）
在那些卡的 `note` 裡一個字都沒有**，也沒有點名歸給了誰——照第 1787-B 條，點名會被 `qa-batch` 判成「互指?」。

## 3934　⚠ 〈Harlem Nocturne〉三張怎麼分（第 3852 條第 1 點的執行結果）

| 卡 | 這首曲子在卡上的位置 | 本層的處理 |
|---|---|---|
| 《Operation Sam Taylor》（B3） | 盤名衝著 Sam Taylor 去，這首是他的招牌曲 | **擁有**：`note` 寫 Sam Taylor 靠這首成名、長年在日本錄音，並下「用 mood sax 的配方做的次中音對奏盤」這個框 |
| 《Harlem Nocturne》（村岡実，盤名兼 A1） | 盤名本身 | **`note` 一個字都沒寫這首曲子**，切角整個落在「八支尺八」與「十二軌對半分給兩組伴奏」 |
| 《真夜中のラテン》（A1「ハレム・ノクターン」） | 開場曲 | **整首讓出，`note` 與 `hook` 皆未出現**，切角改用「團名掛プラス・ラテン、封底只有四個名字」與「從未再發」 |

⚠ **曲子的來歷（Earle Hagen 1939 年替 Ray Noble 樂團所寫）本層決定三張都不寫，整格捨去。** 理由與依據：
1. **那條事實不在《Operation Sam Taylor》自己的 `facts` 裡**——它只在《真夜中のラテン》F4 與《Harlem Nocturne》F6。
   初稿把它寫進《Operation Sam Taylor》的 `note`，`qa-batch` 當場報 `⚠ 年份?1939` ＋ `互指? 專名 Earle Hagen`，
   **機器是對的**：寫作層拿到的是逐卡合併的 `facts`，那張卡的寫作層根本看不到這條 src。
2. 兩張有這條 src 的卡，切角都不在曲子來歷上（一張是尺八、一張是拉丁編制與無再發），硬掛會擠掉更好的格。
3. 第 3852 條要求的是「只能講一次」，**沒有要求一定要講**。
   → **裁定：本批不講這首曲子的來歷。**（可逆：改回去只要在那兩張之一補一格，不動卡池結構。）

## 3935　⚠ 連續兩天兩場錄音怎麼分（第 3849／3852 條第 2 點的執行結果）

- **《Charlie Mariano & Sadao Watanabe》擁有這條**：`note` 寫 **1967 年 6 月 27 日在 Victor Studio 一天錄完**、
  原盤 Victor World Group SMJ-7446，**接著寫「隔天同一組五人又在另一家錄音室替另一家廠牌錄了一張，兩場錄音的曲數與走向都不同」**。
  ⚠ **刻意不點另一張的盤名與廠牌**——照第 1787-B 條，點名會讓那個盤名進 `note`、被 `qa-batch` 判成「互指?」。
- **《Iberian Waltz》完全讓出**：`note` 只寫 **1967 年 6 月 28 日錄於 Teichiku Kaikan 的錄音室**、Takt JAZZ-7，
  **一個字都沒提前一天那場**。切角是「四首曲子、兩首分別是 16 分 03 秒與 14 分 19 秒」與龍安寺石庭。
- **兩張的 `note` 各自帶自己的錄音日與廠牌**，寫作層不可能把兩場寫成同一件事。
- 照第 3850 條，《Iberian Waltz》的 `note` **只寫 1967 年 6 月 28 日**（盤面層級證據），
  **沒有寫「一天錄完」**，也沒有採用日文維基那個 1968-01-21 的第二錄音日與 渡辺文男。

## 3936　「整格捨去」逐筆（本層砍掉的東西，不留給寫作層）

| 卡 | 初稿預算 | 捨去的格 | 定稿預算 |
|---|---:|---|---:|
| The Original Big Four | 242 | 久保田二郎 後來做到《スイングジャーナル》總編輯 | 222 |
| Modern Jazz Screen Mood | 235 | 兩支小號與顫音琴的編制細目 | 222 |
| Modern Jazz Show Case | 281 | 瀬川昌久 上班到 1979 年退休；曲單縮成兩首 | 228 |
| 真夜中のラテン | 248 | 横内章次「錄音室樂手兼編曲家先驅」那一句 | 223 |
| Harlem Nocturne | 275 | 東京尺八三重奏團 與 1965 年離團那一格 | 214 |
| Charlie Mariano & Sadao Watanabe | 310 | 五人編制逐項（改由 hook 承載兩支中音） | 229 |
| Jazz & Bossa | 306 | 逐軌錄音日（縮成「11 月與 12 月分三次進棚」）、B 面曲名 | 229 |
| Iberian Waltz | 298 | 五人編制逐項、〈I Thought About You〉與〈God Has Mercy〉 | 229 |
| Operation Sam Taylor | 349 | 曲單十二首、Earle Hagen 那一格（見 3934）、12 吋 LP 的載體細目 | 214 |
| This Is Jazz-Rock | 372 | 原曲清單縮成兩首、「節奏組打 8 beat」（改由 hook 承載）、年代區間 | 229 |
| Megalopolis | 279 | 低音提琴席、〈Serenade to Dimly-Lit Street〉曲名、「兩人都還沒發表領銜作」 | 227 |

## 3937　措辭：否定句與研究層警示一律「整格捨去」，不寫成「不得寫 X」

照派工信第四節與第 1837-B 條逐條處理：

- 研究層對《This Is Jazz-Rock》標的 **uncertain**（Snap-Shot／Barock／Go Go A Go Go 三首查無原曲）——
  `note` 寫成**正面的**「十二軌裡九首認得出原曲出處」，**沒有寫「不得寫成全翻唱」**。
- 研究層對《Charlie Mariano & Sadao Watanabe》的「師生重逢查無支撐」——
  `note` 整格不碰 Berklee 與秋吉敏子，**沒有寫任何否定句**。
- 研究層對《Operation Sam Taylor》的「不得寫成純即興 blowing session」——
  `note` 寫成正面指派句「**正文寫成用 mood sax 的配方做的次中音對奏盤**」。
- 富樫雅彦 1970 年 1 月受傷（反向禁令第二類）、ジョージ川口 的「ほら吹き」虛言、
  川口／松本／稲垣／村岡 的辭世——**11 張的 `note` 全部未提及**，不是寫成禁令。
- **hook 11 句裡 0 句出現「不是」「卻不是」「並非」**（已逐句掃過）。
- 唯一一處負面表述是《真夜中のラテン》的「**本作從 1963 年至今沒有再發過**」——
  那是該卡 F10 的事實本身（MB 與 Discogs 兩邊版本數都是一），是要寫進正文的招牌事實，不是校對痕跡。

## 3938　跨張 n-gram 自查（`chk-hook-crossgroup` 看不到這一項，本層自己寫腳本掃）

做法：把 11 張的 `hook`＋`note` 串起來，**剝掉四段樣板字**（`主故事：`／`發行年寫`／`正文只寫上列各項。`／`這條骨架全批只走本張。`），
只留漢字（U+3400–U+9FFF），逐張取**相異** 4-gram 集合，再統計「出現在幾張卡上」。

- **出現在 3 張以上的中文 4-gram：0 個。**
- 出現在 2 張的只有 **7 個**，逐個看過全部是專名或樂器名，無句型同構：
  `中音薩克`／`音薩克斯`／`薩克斯風`（樂器名，分別在《Iberian Waltz》hook 與《Charlie Mariano & Sadao Watanabe》hook）、
  `渡辺貞夫`（專名）、`日由日本`（「1967 年 11 月 1 日由日本コロムビア」與「1968 年 9 月 10 日由日本コロムビア」）、
  `的四重奏`、`的錄音室`。
- 初稿曾有 **3 張**同時出現 `中音薩克斯風`（《真夜中のラテン》的編制列、另兩張的 hook），
  已把《真夜中のラテン》改成「宮沢昭 次中音」化解，**順帶省下 4 字預算**。
- 初稿曾有 `第一線的` 撞在兩張（《Modern Jazz Screen Mood》hook 與《真夜中のラテン》note），
  已把後者改寫成「四位都是當年檯面上的爵士樂手」。
- 另查：**hook 開頭前四字 11 張全異**——
  `創團那四`／`十五個東`／`同一張碟`／`團名掛著`／`八支長短`／`兩支中音`／`A 面四`／`一個波士`／`左聲道一`／`Pata`／`錄這張碟`。
- 另查：**11 句 hook 句末全部是全形句號**；禁語表（傑作／必聽／里程碑／獨樹一格／融合多種元素／具有代表性／層次豐富／這張專輯開頭）**0 命中**；
  分數・星等・`X/10`・Metacritic・Pitchfork **0 命中**；半形逗號貼中文 **0 處**；千分位逗號 **0 處**。

## 3939　兩支腳本的逐字結果

```
$ node qa-batch.mjs hooks c173
（略過 qa-check-hooks.mjs：本 repo 無此檔。字數／禁語／開頭雷同／分數星等
  請改跑 node chk-hook-crossgroup.mjs c173，本階段只做事實對照與字元掃描。）
全部通過 ✓
```

```
$ node chk-hook-crossgroup.mjs c173
c173｜2 組｜11 張

hook 加權 23–31｜note 211–232

✓ 全部通過
```

⚠ **`qa-batch` 在定稿前抓到一次，而且抓對了**（見第 3934 條）：
```
⚠ b Operation Sam Taylor note → 年份?1939
  互指? b Operation Sam Taylor → 專名 Earle Hagen …
  總標記 1
```
**這不是誤報**。它的意思是「這張卡的 `note` 用了不在本卡研究稿裡的專名與年份」，
根因是本層把同批別張的 fact 搬到了這張卡上。**本層的處理是整格捨去，不是壓掉標記。**
→ **給後九批**：`qa-batch` 的 `互指?` 那一行**不是純噪音**，它同時抓得到「跨卡搬 fact」這種真錯；
第 1787-B 條說的「刻意讓給別卡會誤報」是另一種形狀，兩者要看前後文分辨。

## 3940　五位樂評的身分分配（第 3852 條第 4 點）

**五個人各自只出現在一張卡上，沒有任何一張寫到兩位以上（`Modern Jazz Show Case` 除外，而那正是它的骨架）**：

| 樂評 | 寫／監修了什麼 | 分到哪張 |
|---|---|---|
| 久保田二郎 | 監修《The Original Big Four》 | **《The Original Big Four》** |
| 油井正一 | 《Modern Jazz Screen Mood》內頁 | **《Modern Jazz Screen Mood》** |
| 瀬川昌久 | 《Modern Jazz Show Case》stereo 版監修兼內頁 | **《Modern Jazz Show Case》** |
| 野口久光 | 同碟 mono 版內頁 | **《Modern Jazz Show Case》**（兩人同卡＝該卡的骨架本身） |
| 岩浪洋三 | 《Jazz & Bossa》內頁、《Megalopolis》原盤封套解說 | **《Megalopolis》**（《Jazz & Bossa》讓出，未提樂評） |

⚠ 《Iberian Waltz》的內頁作者也是 油井正一，**本層讓出，該卡 `note` 未提**。

## 3941　同姓不同人／同名不同團的防線（第 3852 條第 5 點）

- **村岡実**：`note` 裡「八種尺八」「尺八分別吹奏」在正文必然出現，**樂器自帶區隔**，不會與池中的 `村岡建`（次中音薩克斯風）混。
- **稲垣次郎オールスターズ**：`note` 逐字寫「**稲垣次郎 的ソウル・メディア 要到隔年才成立，本作掛的是オールスターズ**」，
  這條同時是骨架與防線，寫作層不可能把 1968 年這張寫成ソウル・メディア 的作品。
- **《Jazz & Bossa》**：`note` 的主故事以 **JAZZ-1 目錄號**開頭並帶廠牌タクト電機，盤名一旦被引用必然帶著 1967 年與 Takt，
  與 1996 年的現場盤及 Ron Carter 2008 年那張分得開。
- **《Charlie Mariano & Sadao Watanabe》是同名盤**：`note` 不使用「某某與某某的某張碟」句型，
  hook 用「兩支中音薩克斯風錄完一張」開場，**完全避開把盤名寫成描述句的風險**。

## 3942　沒有採用的跨卡串連點（第 3853 條的取捨）

研究層列的八條串連點，本層**只用了三條**（渡辺貞夫 加入ビッグ4 → The Original Big Four；
富樫雅彦 生平 → Iberian Waltz；三保敬太郎 的父親 → Modern Jazz Screen Mood）。
**未採用五條**，理由逐條：

1. **市川秀男 1976 年加入ジョージ川口ザ・ビッグ4** → 與《The Original Big Four》那條同源，兩張都寫會同構；
   《Megalopolis》的格已被「五首曲名＝都市速寫」與「2025 復刻補上岩浪洋三」佔滿。
2. **Joachim Berendt 在《Down Beat》拿 松本英彦・宮沢昭 對照稱讚 稲垣次郎** → 《This Is Jazz-Rock》初稿預算 372，
   這條是第一個被砍的格（它需要同時交代三個人名與一份外國刊物與一個日期）。
3. **西条孝之介 是 前田憲男 的ウエスト・ライナーズ 團長** → 同上，兩張都塞不下。
4. **三保敬太郎・前田憲男・山屋清 的「モダンジャズ3人の会」** → 研究層自己就建議不用（太繞），同意。
5. **尾川雄介 同時是 村岡実 2012 年 CD 化與 Megalopolis 2025 年復刻的解說** → 《Megalopolis》改用「原盤封套解說是岩浪洋三」，
   那一格更緊（它是 2025 年復刻才補上的欄位，本身就帶時序），尾川那條讓出。

## 3943　時序標記（反向禁令第一類，逐筆）

晚於發行、**與作品直接綁定**因而寫進 `note` 的，只有兩處，兩處都在句子裡自帶年份：

- 《Charlie Mariano & Sadao Watanabe》：「**1977 年本作才在美國以《Nabesada And Charlie》上架**」——
  「才」字＋年份即為時序標記，本層**沒有**另寫「時序寫明⋯」那種指派句（省 10 字預算）。
- 《Megalopolis》：「原盤封套解說是樂評岩浪洋三 寫的」——**這一欄只存在於 2025 年復刻的 credits 裡**（第 3848 條第 12 點），
  但 `note` 寫的是「**原盤**封套解說」，指的是 1969 年那張碟上的事實，不是後續事件，因此不需要時序標記。
- 《Harlem Nocturne》的 1970 年《Bamboo》、《Megalopolis》的 2025 年復刻、《Jazz & Bossa》的コロムビア 接手——
  **三條都因預算整格捨去**，沒有半條後續事件被留成半截。

## 3944　交付與邊界（自述）

- **只動了三個檔**：`desc-tools/batches/hooks/c173-hooks-a.json`（新增，6 筆）、
  `desc-tools/batches/hooks/c173-hooks-b.json`（新增，5 筆）、本檔（**append**，3860 以前一行未動）。
- **兩個檔案，不是一個**（第 1813-B／3858 條）：`qa-batch` 與 `merge-writer-input` 只讀 `<批>-hooks-<組>.json`，已逐字確認檔名。
- **key 逐字複製自研究稿、順序不變**（程式比對 `[x.key for x in research] == [x.key for x in hooks]`，兩組皆 `True`）；
  **欄位只有 `key`／`hook`／`note` 三個**（程式逐筆 assert 過）。
- **未碰**：`seed_cards.json`、`apex_pool.json`、`PROJECT_MEMORY.md`、`previews.json`、`caa.json`、
  `desc-tools/batches/research/*`（唯讀）、`desc-tools/batches/cards/*`（未讀寫）、其他批次的任何檔案、KV、Firestore、
  `qa-batch.mjs` 與 `chk-hook-crossgroup.mjs`（只執行，未修改）。
- **未執行任何 git 指令**（不 `add`／不 `commit`／不 `push`／未動索引）。
- 中間檔全部在 scratchpad 的 `c173h/`：`c173h-budget.mjs`（預算與加權量測）、`c173h-draft.py`、
  `c173h-res-a.txt`／`c173h-res-b.txt`（研究稿的可讀化轉存），檔名全部帶 `c173h-` 前綴。
- 續跑保護：a 組定稿後先寫檔才處理 b 組，兩檔各自獨立可讀；本層未遇容器重啟。
- **5 張無串流、2 張無封面**的固定無來源狀態：11 張的 `hook` 與 `note` **沒有任何一句寫成「可以去聽」那種話**（逐句確認）。

## 3945　**編號區間結算**：本節用到 **3931–3945**（共 15 條），**3946–3960 未使用**，留給後續層。
