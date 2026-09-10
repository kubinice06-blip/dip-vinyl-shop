# c-112（2026 新譜，至 9 月）策展層裁定與未收清單

日期 2026-09-06。線 D，`lineType: 廣度`。交件 `prop-a.json` 23 張 23 位、`prop-b.json` 22 張 22 位，
合計 **45 張 45 位**，`chk-prop.mjs` 標記 **0**（跨批去重 57 批、2,648 卡，撞卡 0）。

## 0. 池中 2026 現況（實掃 `seed_cards.json` 全 14,424 列，非取樣）

**51 張，全部是英美與韓國的大廠盤，日本 0 張、華語 0 張。**
（另供對照：池中 2025 年 86 張、2024 年 94 張。）

aespa《LEMONADE》／Dinosaur Jr.《There Near》／Iron & Wine《Hen's Teeth》／Social Distortion《Born to Kill》／
Ariana Grande《petal》／Courtney Barnett《Creature of Habit》／Skrillex《SOMA》／Floating Points《Mere Mortals》／
BTS《ARIRANG》／Drake《HABIBTI》／RAYE《THIS MUSIC MAY CONTAIN HOPE.》／Aldous Harding《Train on the Island》／
Jill Scott《To Whom This May Concern》／Bruno Mars《The Romantic》／Bloc Party《Anatomy of a Brief Romance》／
M.I.A.《M.I.7》／Muse《The Wow! Signal》／Madeon《Victory》／Boards of Canada《Inferno》／
José González《Against the Dying of the Light》／Phoebe Bridgers《Lost Weekend》／Ezra Collective《Here Because of Hope》／
Harry Styles《Kiss All the Time. Disco, Occasionally.》／Sam Smith《Hazel Eyes》／JPEGMAFIA《EXPERIMENTAL RAP》／
Cavetown《Running With Scissors》／Kim Petras《Detour》／Protoje《The Art Of Acceptance》／Dry Cleaning《Secret Love》／
Chris Brown《BROWN》／Rob Zombie《The Great Satan》／Sleaford Mods《The Demise of Planet X》／Thundercat《Distracted》／
Modest Mouse《An Eraser and a Maze》／Periphery《A Pale White Dot》／Snail Mail《Ricochet》／
Iceage《For Love of Grace & the Hereafter》／Mitski《Nothing's About to Happen to Me》／Poppy《Empty Hands》／
A$AP Rocky《Don't Be Dumb》／Interpol《This Mirror Weighs a Ton》／Earl Sweatshirt, MIKE & SURF GANG《POMPEII // UTILITY》／
Melanie Martinez《HADES》／Sublime《Until the Sun Explodes》／Denzel Curry《Strictly 4 the Scythe》／Tom Misch《Full Circle》／
Shabaka Hutchings《Of the Earth》／DOMi & JD BECK《WHO ASKED?》／Jeff Mills《The Trip To Vega》／Mr. Fingers《Leev Ur Mynd》／
Seefeel《Sol.Hz》

**提案的 45 張與這 51 張無一重複**（`chk-prop` 已驗）。

## 1. 用了哪幾份榜

- **a 組（英美與西方）**：Stereogum 50 Best Albums Of 2026 So Far、Consequence 33 Best Albums of 2026 So Far、
  Clash 60 Best Albums Of 2026 (So Far)、The Guardian 2026 mid-year。四份取交集後再逐張回 MB 驗。
- **b 組（日韓華語）**：Billboard JAPAN 2026 年上半期 Hot Albums／Top Albums Sales、
  Billboard 25 Best K-Pop Albums of 2026 So Far、The Bias List Top K-Pop Albums of 2026、
  第 37 屆金曲獎入圍名單，**再加上 MB 自己的日期＋國別實掃**（見第 3 條——榜單在 b 組不夠用）。

## 2.（裁定）a／b 的界線改成「東亞／非東亞」，不是字面的「英美／日韓華語」

派工寫 a＝英美、b＝日韓與華語。實作上有三張落在字面之外：
Robyn（瑞典）、Genesis Owusu（澳洲，最終未收）、Carla dal Forno（澳洲，最終未收）。

**裁定：a 組收「非東亞的西方新譜」，b 組收「日、韓、華語三地的新譜」，兩組合起來窮盡本批。**
判準用「哪一組的坑適用」：b 組的坑是東亞掛名寫法、簡繁、韓國母國盤與日版之爭、MB 建檔率；
Robyn 一條都不適用，放 a 組才對。**可逆、只是分組欄位，依裁定權下放第 2 條直接定。**

## 3.（裁定）b 組不能靠榜單找碟，只能靠 MB 的日期＋國別實掃——**這是本批最大的方法變更**

派工指定的東亞榜單在 2026 年這個時間點**全部不可用或不對齊**：

| 榜 | 問題 |
|---|---|
| 《Music Magazine》／Rockin'On 月評 | 網路上抓不到 2026 上半年的整理版，只有 1 月號的年間ベスト（那是 2025 年的碟） |
| Rolling Stone JP | 2026 上半期ベストアルバム未發布（只有 2025 年年間 TOP100） |
| **金曲獎 37（2026-05-13 公布入圍、06-27 頒獎）** | **評選窗口是 2025 年的碟**。逐筆回 MB 查：`蔡依林《Pleasure》`、`張震嶽《跟著感覺走》`、`頑童MJ116《OGS》`、`洪佩瑜《開》`、`單依純《純妹妹》`、`鄭宜農《圓缺》`、`蕭煌奇《做一個惜情軟心的人》` 的 first-release-date **全部不在 2026-01-01～2026-09-30 內**——一張都不能收 |
| 金音創作獎 2026 | 入圍名單在 9 月初尚未公布 |

**裁定：b 組改用 MB 的 `release?query=date:[2026-01-01 TO 2026-09-30] AND country:JP/KR/TW AND status:official AND primarytype:album` 實掃，
再以 `release-group?query=artist:"X" AND firstreleasedate:[...]` 逐位藝人補。**
這條要往 c-111（2024–2025 正典）之外的任何「當年度新譜」批傳：
**獎項的評選窗口與發行年不是同一件事，用獎項名單挑當年新譜必然錯位一年。**

### 3b. 這次實掃的規模與結果

- 逐位藝人探測 **175 個掛名**（日本 80、韓國 45、華語 100，含羅馬字／漢字／諺文／簡繁多種寫法）。
- 國別實掃：JP 命中 1,193 筆 release、KR 153 筆、TW **只有 36 筆**。
- **華語圈是三地裡建檔最差的**：探測 100 個華語掛名，2026 年有 `primary-type=Album` 的**只有 3 位**。

## 4.（裁定）`cero` 那兩張是假陽性，`artist:` 查到的是阿根廷的 `cero*`

`artist:"cero"` 回了兩張 2026 專輯（`after fœ` 2026-01-15、`yo pray .` 2026-08-01），
artist-credit 顯示為 **`cero*`**（帶星號）。回問藝人端點：
`1dd0ce17-84dc-468c-89ef-7a8ebd646541`，type=Person、country=**AR**、disambiguation「Argentina Trap」。
**不是日本的 cero。**

**裁定：兩張都不收。** 這是裁定第 20 條（`artist:` 比對的是 artist-credit 字串不是實體）
在本批唯一一次真的咬人——而且**它咬得很隱蔽**：`cero` 與 `cero*` 只差一個星號，
多數正規化會把星號清掉，兩者變成同一個鍵。
**往後凡是短掛名（≤5 字元）的搜尋命中，一律回問藝人端點看 area 與 disambiguation 再收。**

## 5.（裁定）青葉市子那張唯一的 release 是 Bootleg，剔除

`4b65914f-3c59-4153-b510-ba8d13344874`《Ichiko Aoba's piano from a broken radio》（2026-03-19）
是 `primary-type=Album`、看起來完全正常，但回問 `inc=releases` 後：
**轄下唯一一筆 release 的 status 是 `Bootleg`。**

**裁定：剔除。** 依第 43／57／65／78 條，只有 Official 才算背書；
本批唯一一張全部 release 皆非 Official 的候選。
**這條同時驗證了裁定 141 的動作規則**——不回問 `inc=releases` 就看不出來，
搜尋端點回的 `release-groups[].releases[]` 那份摘要**不帶 status 以外的細節、也不保證完整**。

## 6.（裁定）Neurosis 有一個全大寫的同名別團在同一年出片

`Neurosis`（`a9416fb3-4d28-4575-abae-f0d160be83ed`）2026-03-20《An Undying Love for a Burning World》＝要釘的；
`NEUROSIS`（`4244eadf-4ed1-4fa0-a353-f06bbb479fa4`）2026-02-13《NEUROSIS》＝別團。

**裁定：收前者，後者寫進「刻意不釘」。** 危險之處在於
**任何 lowercase 正規化都會讓 `Neurosis` 與 `NEUROSIS` 相等**，撞卡檢查與 `fix-rgmbid` 都分不出來，
而後者的盤名又是自我同名（標題分會拉高）。這是裁定 162「短盤名被別碟包住」＋裁定 29「兩個對象搶同一個通行名」的疊加。

## 7.（裁定）同藝人同年兩張正規盤，第二張寫進「刻意不釘」而不是另收一張

本批有三例：
- **Converge**：《Love Is Not Enough》2026-02-13（收）與《Hum of Hurt》2026-06-05（不釘）。
- **Loraine James**：《Detached From the Rest of You》2026-05-08（收）與《It's Nothing Personal.》2026-09-04（不釘）。
- **Charli xcx**：《Music, Fashion, Film》2026-07-24（收）與 Album+Soundtrack《Wuthering Heights》2026-02-13（不釘）。

**裁定：一位藝人本批只收一張。** 理由不是「同藝人上限」（那條 2026-09-04 已作廢），
而是**這批是 2026 年橫切面、不是目錄深度批**；同一位收兩張會把 45 張的配額吃掉、
換不到場景覆蓋。第二張寫進 `mbNote` 的「刻意不釘」，理由寫「同藝人同年的另一張專輯，不是本張的版本」
——**這是「刻意不釘」的新用法**（既有用法是 EP／單曲／Live／合輯／同名雙胞胎），
但符合裁定 162 的目的：**凡是下游腳本可能誤配到本張釘位的 MBID，都該寫進去。**

## 8.（裁定）「同名先行單曲」是這批最普遍的假陽性形狀，一律點名

**45 張裡有 8 張有一筆盤名完全相同的 2026 年先行單曲**：
Robyn《Sexistential / Talk to Me》、Kacey Musgraves《Middle of Nowhere》、Kim Gordon《PLAY ME》（只差三天）、
Converge《Love Is Not Enough》（2025-11-19，年份還會誤導）、Beth Orton《The Ground Above》（未收）、
Joyce Manor《I Used to Go to This Bar》（未收）、Grace Ives《Girlfriend》（未收，另有重複建檔）、Chanel Beads（見第 10 條）。

**裁定：新譜批的「刻意不釘」一律先寫先行單曲。**
老碟批的假陽性主力是再發與合輯；**新譜批是先行單曲**，而且它的 `first-release-date` **比專輯早**，
凡是「取最早那筆」的邏輯都會選錯。派工新譜批時要把這句寫進去。

## 9.（裁定）K-pop 這一組只收 `primary-type=Album`，EP 一律不碰

韓國那 45 個掛名探測下來，2026 年 `primary-type=Album` 的**只有 8 位**，
其餘全是 EP／Single／Other（LE SSERAFIM 一位就有 25 筆 2026 條目、其中 20 筆是 Remix 單曲）。

**裁定：本批不開 `asia-mini-album` 白名單。** 那個白名單是 c-105（K-pop 韓版里程碑）的機制，
需要兩個 HTTPS 證據逐張舉證；本批是橫切面批、45 張的舉證成本擺不下，
而且**EP 在 2026 年這個時間點還沒有「里程碑」的可舉證性**。
K-pop 這塊本批只收 5 張（IVE、Stray Kids、AKMU、BOYNEXTDOOR，以及韓國獨立線的이승윤、wave to earth），
**EP 全部留給 c-105。**

順帶：`LE SSERAFIM《'PUREFLOW' pt.1》`（`195b4cc7`）雖是 `primary-type=Album`，
但盤名帶彎引號與「pt.1」的分部標記，是系列的一半，**不收**，改收 BOYNEXTDOOR《HOME》。

## 10. 未收清單一：**MB 尚未建檔**（可等或進 §1；本批不開 §1）

| 藝人 | 碟 | 狀況 |
|---|---|---|
| 蔡依林 | 《Pleasure》 | MB 有，但 first-release-date 不在 2026 窗口（金曲 37 入圍＝2025 年碟） |
| 張震嶽 | 《跟著感覺走》 | 同上 |
| 頑童MJ116 | 《OGS》 | 同上 |
| 洪佩瑜 | 《開》 | 同上 |
| 單依純 | 《純妹妹》 | 同上 |
| 鄭宜農 | 《圓缺》 | 同上；該藝人 2026 年 MB 上只有單曲《有時候我會想要傷害我的朋友》 |
| 蕭煌奇 | 《做一個惜情軟心的人》 | 同上 |
| 炎亞綸 | 《Ikigai》 | **MB 完全查無**（「炎亞綸」「Aaron Yan」兩種寫法都試過）。可等或進 §1 |
| 傷心欲絕 | 《把附近的影子都摘了》 | MB 有（`0443718c`，2026-02-09）但 **primary-type=EP**，本批不收 EP |
| 大象體操 | 《紀錄片《大象體操 : 比夢境更真實》原聲帶》 | MB 有（`3199eb4d`，Album+Soundtrack）。盤名在 HK／JP／未填國別三筆各不相同（中文長標題／英文標題／另一英文標題），**盤名取哪一個沒有可靠依據**，剔除；另有 Live 盤兩筆（`0922e46a` Elephant Gym 掛名、`39575664` 大象體操 掛名）是同一趟巡演的兩個掛名寫法，同樣剔除 |
| 落日飛車／草東沒有派對／告五人／珂拉琪／拍謝少年／滅火器／茄子蛋／血肉果汁機／椅子樂團／康士坦的變化球（等 90 餘位華語掛名） | — | **2026 年 MB 上零筆 Album**。這不是「他們沒出片」的結論，是 **MB 對華語圈當年度新譜的建檔延遲**（TW 全國別 2026 年只有 36 筆 release） |
| 中村佳穂／折坂悠太／七尾旅人／電気グルーヴ／石橋英子／山下達郎／松任谷由実／大貫妙子／崎山蒼志／カネコアヤノ（等） | — | 2026 年 MB 上零筆 Album |
| 새소년／잔나비／실리카겔／세이수미／검정치마／장기하／백예린／이랑／아이유（等） | — | 2026 年 MB 上零筆 Album |
| 米津玄師／宇多田ヒカル／星野源／藤井風／King Gnu／Mrs. GREEN APPLE／羊文学／椎名林檎／Awich／Ado／YOASOBI／桑田佳祐／長谷川白紙／マカロニえんぴつ／THE NOVEMBERS／大森靖子／水曜日のカンパネラ | — | 2026 年 MB 上**有**條目，但**全是 Single／EP／Other**，沒有 `primary-type=Album` |

## 11. 未收清單二：**查得到、但本批主動剔除**

| 藝人 | 碟 | 剔除理由 |
|---|---|---|
| 青葉市子 | 《Ichiko Aoba's piano from a broken radio》 | 唯一 release 是 Bootleg（第 5 條） |
| cero* | 《after fœ》《yo pray .》 | 不是日本的 cero，是阿根廷 trap 藝人（第 4 條） |
| 裸のラリーズ | 《Disque 4 –'76 Studio et Live–》 | first-release-date 是 2026，但內容是 1976 年錄音的考古發行，不是新譜；且盤名含非 ASCII 連字號（`chk-prop` 會擋） |
| Nine Inch Nails & Boys Noize | 《Nine Inch Noize》 | MB 上這個名字只有 `91090e62`《Nine Inch Noize: Live @ Coachella 2026》（Broadcast+Live），錄音室版尚未建檔 |
| Chanel Beads | 《Your Day Will Come》 | MB 上有兩個同名 release-group（2024-04-19 與 2026-06-26），**2026 那筆極可能是 2024 首作的重複建檔或再發**，無法當場判定，不收 |
| Grace Ives | 《Girlfriend》 | MB 上有**兩個同日（2026-03-20）同名同掛名的 release-group**（`d3cb7d8b` 與 `d2ab5974`），是貨真價實的重複建檔（裁定 13 的形狀），釘哪一個都會被另一個換掉，不收 |
| Fire-Toolz | 《Lavender Networks》 | MB 的 artist-credit 是 `Fire‐Toolz`，**中間是 U+2010 連字號不是 ASCII 連字號**；掛名進池後任何 ASCII 比對都對不上，本批不冒這個險 |
| ENHYPEN | 《THE SIN : BLISS (JAKE Ver.)》 | `primary-type=Album` 的那筆是**成員版本盤**，本體 `a2851d8b` 是 EP，不收 |
| Balming Tiger | 《Gongbu》 | MB 有（`29333b66`，2026-05-19、Album、Official），合格但配額用完；**續批可直接收** |
| Neurosis（全大寫的那個團） | 《NEUROSIS》 | 同名別團（第 6 條） |
| Converge | 《Hum of Hurt》 | 同藝人同年第二張（第 7 條） |
| Loraine James | 《It's Nothing Personal.》 | 同上 |
| Charli xcx | 《Wuthering Heights》 | 同上，且是 Album+Soundtrack |
| Robyn Hitchcock | 《The Confuser》 | 掛名撞 Robyn 而被搜到，本身與本批的 Robyn 無關 |
| 其餘進榜但未入選的 30 餘張（Slayyyter／Friko／Danny L Harle／Beth Orton／Widowspeak／Avalon Emerson／Joyce Manor／Genesis Owusu／Dua Saleh／Mandy, Indiana／Carla dal Forno／Lip Critic／underscores 以外的 Stereogum 尾段等） | — | **MB 上全部查得到、全部合格**，純粹是 45 張的配額用完。**這是 c-112 的續批可以直接接手的名單** |

## 12. 釘住 MBID 的比例與資料品質

- **45／45＝100% 釘住 release-group MBID**，每一張都逐筆回問
  `release-group/<id>?fmt=json&inc=artist-credits+releases` 確認
  `primary-type=Album`、`secondary-types` 空、標題、artist-credit 與轄下 release 的 status／國別／日期。
- **`secondary-types` 非空的 0 張**，`releaseType: Compilation` **0 張**，§5.6 一次都沒開
  ——與裁定 167 在 c-95／c-98／c-100 的結論一致，**新譜批更是如此**。
- **年份**：45 張的卡單年份全部＝MB `first-release-date` 的年份，**零筆分歧**。
  派工說「這批的年份反而可信」是對的：**新譜沒有復刻年與原盤年的分裂**。
- **`status` 非 Official 的殘留**：Baby Keem《Ca$ino》有 1 筆 Withdrawn、
  Madonna《CONFESSIONS II》AU 那筆與 Stray Kids《THIS & THAT》兩筆 status 未填
  ——三處都已在 `risk` 明令不採為背書。
- **廠牌／編號**：45 張裡 **2 張 MB 的 label-info 全空**（deca joins《在這裡停一下》、Asiaboy 禁藥王《猛虎下山》），
  另 **5 張有廠牌名但無編號**（くるり、Tempalay、Isaiah Rashad、Steve Lacy、wave to earth）。
  七處都已在 `why` 與 `risk` 寫明「MB 未填」，行文不得斷言發行方或編號（裁定 128）。

## 13.（裁定）三軸留白，但**冷門軸失真的方向這批是可預測的**

派工說新譜的 Last.fm listeners 還沒長起來、三軸留給本機人工。照辦，本批不填三軸。
但要往下游傳一個可用的訊號：**失真的方向不是隨機的**。

- **a 組 23 張裡有 8 位是池中零張的新掛名**（Kim Gordon 個人、Kevin Morby、underscores、
  Arlo Parks、Jalen Ngonda、Loraine James、Ratboys，以及本批未收但同型的多位）——
  這幾位的冷門軸會**同時**被「新譜」與「新掛名」兩重低估。
- **b 組 22 張裡有 16 位是池中零張**，其中日本 12 位裡有 11 位、韓國 6 位裡有 5 位、華語 4 位裡有 2 位。
- **相反地**，Madonna、Paul McCartney、周杰倫、Gorillaz、Olivia Rodrigo 這幾位的冷門軸
  會被**藝人本身的歷史 listeners 拉高**，與這張新碟的實際流通無關。

**人工看三軸時，這兩類要分開看，不要用同一把尺。**

## 14. 一句話判斷

**2026 年這個場景在池中「有一半是空的」**：英美大廠盤已經有 51 張、密度接近 2024／2025；
**東亞是整片空白**（日本 0、華語 0，韓國只有 aespa 與 BTS 兩張）。
b 組這 22 張補的是從零開始的第一層；而**華語圈就算補完這 4 張仍然不夠**，
瓶頸不在策展，在 **MusicBrainz 對華語當年度新譜的建檔延遲**——那要等，或者開 §1。
