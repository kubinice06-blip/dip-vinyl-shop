## 2026-09-04 — dip-vinyl-shop — c-80 策展提案（深掘：英國 neo-prog 自主制作 1980–86）

- **改動摘要**：新增 `batch-progress/c80/prop-a.json`（19 張）與 `batch-progress/c80/prop-b.json`（20 張），
  合計 **39 張、24 位藝人**，`lineType: 深掘`。
  - **a 組＝1980–83 的自壓盤、郵購盤與樂團自營廠牌的起點**：Third Quadrant 三捲自製帶與自營 Rock Cottage 的
    第一張黑膠、Quasar 自營 Q Records、Airbridge 的 Carve-Up、Protos 與 Voltz 走 Airship 客壓、
    Red Summer 的 Rimshot、A Band Called Doris 的自營 ABCD、Haze 與 Treatment 與 Gothique 的無廠牌卡帶，
    以及老一輩樂手同期把發行收回自己手上的四條線（The Enid 的 Enid Records、National Health 為悼念
    Alan Gowen 自開的 Lounging、Peter Hammill 的 S-Type 與 Sofa Sound 郵購、Nic Potter 與 Mother Gong
    共用的 Butt Records）。
  - **b 組＝1983–86 的小廠目錄與獨立發行**：Solstice 的 Equinox、Haze 自營 Gabadon 的第一號、
    Castanarc 的 Peninsula、Abel Ganz 兩捲自壓帶、Mach One 同年一張黑膠一捲卡帶、
    Geoff Mann 三家小廠（Food For Thought／Twilight／Wobbly）、The Enid 由歌迷組織 The Stand 直接出版、
    Multi-Story 從自製帶到 FM Revolver、Robert Calvert 三家小廠、Nic Potter 自營 Zomart 兩張。
- **主要檔案**：`batch-progress/c80/prop-a.json`、`batch-progress/c80/prop-b.json`、
  `batch-progress/memory-entries/c80-curation.md`（本檔）。`chk-prop.mjs` 原已存在且路徑已是 c80，未改。
- **驗證結果**：`node batch-progress/c80/chk-prop.mjs` → 39 張、24 位、**標記 0**；
  串跑 `dedup-crossbatch.mjs` → 32 批（其中 3–4 批讀 prop）、卡數 1573、**跨批撞卡 0**。
  39 張全部釘住 release-group MBID 並逐個回問 `release-group/<id>?inc=releases+artist-credits`
  確認 `primary-type=Album`、secondary-types 空、artist-credit 與 release 國別／狀態（第 41 條）；
  藝人 browse 一律用 `release-group?artist=<MBID>&limit=100&offset=` 分頁（第 116 條）。
- **另做的兩道去重**（`chk-prop` 的 key 函式看不出來的）：
  1. **以盤名為主鍵掃 `seed_cards.json` 全 13,913 列**（第 71 條）：命中 3 組，全部是同盤名不同藝人的
     不同碟——Haze《C'est la vie》vs Phosphorescent(2018)／自然捲(2004)、
     Multi-Story《East West》vs Paul Butterfield Blues Band《East-West》(1966，另在 c-51 prop-a)。放行。
  2. **去 `The` 前綴與標點後的掛名比對**：命中 2 位，National Health（池中 1 張，本批 +1＝2）、
     Peter Hammill（池中《Patience》1 張，本批 +2＝**3，已達上限**，往後批次不得再收）。
- **策展層自行下的裁定**（詳見下方「裁定」節）：整批不收 Marillion／IQ／Pallas／Twelfth Night／Pendragon
  五團的任何作品（含其自壓早期盤）；自我同名且 Apple 查無者一律不收（剔除 4 張）；
  A Band Called Doris 用長掛名不用 MB 的實體名「Doris」；三張年份與所釘 RG 脫鉤。
- **封面與試聽（實測，非估計）**：CAA release-group front 逐張 GET，**33/39（85%）回 200**；
  Apple 逐張走 `search` ＋ `match-lib.mjs` 的比對，八個 storefront（gb／us／jp／de／fr／ie／ca／au）
  依序試，**15/39（38%）拿得到 `.m4a`，其中 14 張在 `gb`、1 張在 `us`**。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制、`manual:depth-rubric`）、
  頂點資格評估、封面實檔、簡介、固定試聽寫入、Firestore／KV／`seed_cards.json`／`PROJECT_MEMORY.md`。

### 策展層裁定（依 2026-09-02 的裁定權下放，三條判準：有先例／可逆／卡住整條線）

1. **五團全不收，連他們的自壓早期盤也不收。** 簡報要「刻意避開這條線的正典（Marillion、IQ、Pallas、
   Twelfth Night、Pendragon 的大廠代表作）」。這五團有幾張確實是自壓／郵購形態
   （Twelfth Night《Live at the Target》TN-002、《Smiling at Grief》TN-003、《Fact and Fiction》TN-006、
   Pallas《Arrive Alive》Cool King CKLP 002、IQ《Seven Stories Into Eight》自製帶、
   《Tales From The Lush Attic》Major MAJ 1001、Pendragon 1983 年的自製 EP），
   字面上不算「大廠代表作」。**但簡報同時把「深度小眾」寫成硬要求、把形狀標竿定為
   「外界幾乎不知道」的 Johnny's Disk。** 這五個名字是任何一份 neo-prog 名單的前五名，
   收了會讓整批的形狀變成「這條線的正典 ＋ 一些沒聽過的」。取後者、全部不收，
   並把上列七張記進未收清單供店主日後推翻——**推翻成本只是把它們加回 prop，卡池結構不動。**
2. **自我同名且 Apple 查無者一律不收。** 共用簡報第二節引 `PROJECT_MEMORY.md`：
   「自我同名的碟若 Apple 上查不到就不要收」。四張中標並剔除：Chasar《Chasar》(1983，MPM CH333G)、
   Craft《Craft》(1984，Shanghai HAI 106，1992 年 Kinetic Discs 有授權 CD)、
   Skin The Peeler《Skin The Peeler》(1984，Right Track STP 1)、
   Comedy of Errors《Comedy of Errors》(MB 記 1987-01-27／Discogs 記 1986 自壓)。
   四張的 MB 身分都釘得住、CAA 兩張有圖，**資料齊全，純因這條規則剔除**，日後放寬即可撿回。
   Comedy of Errors 那張另有第二個理由：MB 的 first-release-date 是 1987-01-27，落在 1980–86 之外。
3. **A Band Called Doris 用長掛名。** MB 的藝人實體名是「Doris」（消歧義「1980s UK hard rock/prog rock band」），
   但池中已有 Doris Troy／Doris Day／Doris Duke 三位，裸字串「Doris」會讓藝人層分組混掉（第 29 條）。
   MB 的 **artist-credit 本身就是「A Band Called Doris」**、Discogs 的 release 標題亦然——
   有來源可依附，不是自創次通行名（第 29(b)／31 條）。
4. **三張年份與所釘 RG 脫鉤，依第 95 條處理**（rgMbid 是身分鍵不是年份來源）：
   Robert Calvert《Hype》MB 記 1989（MB 只建了再發）、卡單取 1981（Discogs master 69107，
   A Side Records IF 0311 原盤直記）；Robert Calvert《Freq》MB 記 1985、卡單取 1984
   （Discogs master 440945 與 Flicknife SHARP 021 原盤條目直記）；
   The Enid《Something Wicked This Way Comes》MB 記 1982、卡單取 1983（Discogs 全部版本一致記 1983）。
   三張的 `notes` 都要求行文不得正面斷言發行年（第 18／46 條）。
5. **卡帶原盤即算原盤（第 1 條）**：本批 39 張裡 **13 張的原始載體是卡帶**
   （Third Quadrant ×2、Haze《The Cellar Tapes》、Treatment ×2、Gothique、Abel Ganz ×2、
   Mach One《...And There'll Be a Space》、Multi-Story《Chimes》、Geoff Mann《Chants…》等），
   年份一律取卡帶問世年，不取後來的 CD 再發年。這條線的 1980–86 在英國本來就是卡帶場景，
   Discogs 掃出來的 UK Prog Rock 1980–86 條目裡，自製發行絕大多數是 Cassette 而不是 LP。
6. **盤名寫法三處取捨**：Peter Hammill 取《Loops & Reels》而非原盤的《Loops And Reels》
   （& 與 And 摺疊後互不為子字串，用原盤寫法會讓試聽比對整組落空，原盤寫法已記進 `risk`）；
   Haze 取 ASCII 直引號《C'est la vie》而非 MB 的彎引號；Mach One 取原盤的《...And There'll Be a Space》
   而非 MB 的《... And There'll Be a Space》（第 50／91 條：RG 標題與卡片盤名不必相等）。
7. **Cardiacs 與 Ozric Tentacles 刻意不收。** 兩組都符合「1980–86 英國、自營廠牌、卡帶自製」
   （Cardiacs 的 Alphabet ALPH 0001、Ozric 的 Dovetail 1985–86 四捲），MB 上也都是 Album。
   不收的理由是**形狀**：兩組今日的知名度遠高於本線標竿，且 Cardiacs 的 DIY／post-punk 屬性
   與 c-77 的英國 DIY 線重疊。記進未收清單。

### 未收清單（MB 釘得住、但因規則或形狀不收；日後要撿回成本很低）

| 卡 | 不收理由 |
|---|---|
| Twelfth Night《Live at the Target》(1981, TN-002)、《Smiling at Grief》(1982, TN-003)、《Fact and Fiction》(1982, TN-006) | 裁定 1（五團全不收） |
| Pallas《Arrive Alive》(1981/83, Cool King CKLP 002) | 同上 |
| IQ《Seven Stories Into Eight》(1982 自製帶)、《Tales From The Lush Attic》(1983, MAJ 1001) | 同上 |
| Pendragon 1983 年自製 EP | 同上（且為 EP） |
| Chasar《Chasar》(1983)、Craft《Craft》(1984)、Skin The Peeler《Skin The Peeler》(1984)、Comedy of Errors《Comedy of Errors》(1986/87) | 裁定 2（自我同名 ＋ Apple 查無） |
| Cardiacs《The Obvious Identity》(1980)、《Toy World》(1981)、《The Seaside》(1983/84) | 裁定 7 |
| Ozric Tentacles《Erpsongs》《Tantric Obstacles》(1985)、《There Is Nothing》(1986) | 裁定 7 |
| Paul Roland《The Werewolf of London》(1980) | MB artist-credit 是「Midnight Rags」；原盤掛 Ace Records ACE 013（Chiswick 體系），與簡報「Chiswick 以外的地方廠」衝突 |
| The Enid《Fand》(1985)、《Salome》(1986)、《In the Region of the Summer Stars 1984》(1984) | 藝人三張上限已滿（本批已收三張） |
| Mother Gong《Robot Woman 3》(1986) | MB 該 release 的 status 未填、CAA 無圖、Apple 全空 |
| Anthony Phillips《Private Parts & Pieces II／IV》(1980/1984) | 原盤廠牌是美國 PVC／Passport，不屬「英國自主制作」 |
| Here and Now《Theatre》(1984, Landslide) | 非 prog、CAA 無圖 |
| Quasar《The Loreli》、Haze《Stoat & Bottle》(1987)、Third Quadrant《Layered》(1988)、Castanarc《Rude Politics》(1988) | 年份落在 1980–86 之外 |

### MB 查無、本批不收（可進補遺批 c-87 走 §1 人工身分路線）

以下都是 Discogs 上查得到實體、MB 上完全沒有 release-group 的英國自主制作 prog（1980–86）：
Mooncloud《Shelter》(1984, Not On Label)、After The Stranger《Another Beauty Blooms》(1986, SR0010)、
Greg Hill《Greg Hill》(1981, GREG 001, SRT 客壓)、No Right Turn《No Right Turn》(1983, Chelful CHE 0001)、
Burnessence《I Am You Are Me》(1984, Nuclear Records Clear 014)、Control Q《Evil Eye》(1984, Crystal 2)、
Gemini《Counter Balance》(1981, Airship AP 345)、Skyboat《Ship In Distress》(1982, Plant Life PLR035)、
Body《The Body Album》(1981, Recession REC 01)、Red《Red》(1983, Jigsaw SAW 2)、
Mach One《Six Of One》(1984, Granite Bap MAK6)、Multi-Story《Multi-Story》(1984, Solo Sounds)、
Mother Gong《Robot Woman 2》(1982, Shanghai HAI 100)、
以及 1982–86 年整批只留下自製卡帶的樂團：Trekellion Skyway、Sanctus、Karma、Moriarty、Curious Dream、
Sleepwalker、Janysium、Aristocracy、Arque、Wraith、Otherness、Nexus、The Sentinal、Twice Bitten、
The Amazing Wilf、Full Moon、Ranata Spirit、Transic、The Alice Band、Galadriel、Minas Tirith、
Trilogy《Arctic Life》、Chemical Alice《Taking Control》(1982，Marillion 的前身之一，MB 名下無此筆)。
