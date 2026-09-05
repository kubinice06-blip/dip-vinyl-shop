# c-95 爵士與藍調目錄深度：策展層裁定（2026-09-05）

依 2026-09-02 店主下放（「不用我裁定 你自己決定」），以下九條由策展層當場定案。
判準沿用三條：有先例照先例、可逆就直接定、卡住整條線就當場定。

---

## 1. 這批的 §5.6 例外欄位一張都沒填——因為 MB 根本沒把這些整編輯記成 Compilation

派工信預期「§5.6 舉證會用得很兇」。**實測結果相反：一張都不用走 §5.6。**

實掃本批 34 位藍調藝人名下 1,676 個 release-group 的型別分佈：

| primary-type / secondary-types | 筆數 |
|---|---|
| Album / [Compilation] | **969** |
| Single / [] | 458 |
| Album / [] | 179 |
| Album / [Live] | 41 |
| 其餘（EP、Other、無 primary-type…） | 29 |
| **primary-type = Compilation** | **0** |

戰前藍調的後世整編在 MusicBrainz 幾乎一律建成
**`primary-type=Album` ＋ `secondary-types=[Compilation]`**，
而 `ALBUM_ONBOARDING.md` §5.6 明文：「MB `primary-type` 為 Album 但 secondary-type 含 Compilation 者，
照一般 Album 寫法即可」（c-90 裁定第 3 條同旨：填了會被 `chk-prop` 判「非合輯卻帶例外欄位」）。

**裁定：本批 44 張全部 `releaseType: "Album"`、`exceptionReason` 空、`exceptionEvidenceUrls` 空。
合輯張數 0（以 §5.6 的定義計）。**
其中 18 張的 `secondary-types` 含 Compilation，已在各自 `mbNote` 逐張寫明型別與「依 §5.6 不填例外欄位」的理由，
供下游驗證器對照。

**這條要往後傳**：c-98（1940–50 年代鄉村）與 c-100（古典歷史錄音）的派工信寫了同樣的預期，
很可能也是同一個形狀——**先掃型別分佈再決定要不要開 §5.6，不要預設會用到。**

## 2. 第 43／57／65／78 條的授權判定：本批 44 張的 MB release status 全數 Official

逐張回問 `release-group/<id>?fmt=json&inc=artist-credits+releases`，
把轄下每個 release 的 `status` 與 `country` 都列出來（結果寫進各卡 `mbNote`）。
**44 張、合計 119 個 release，status 全部 `Official`，零筆 Bootleg／Pseudo-Release。**

考古廠牌側最需要防的 Yazoo、Document、Milestone、Biograph、Origin Jazz Library、Nessa 幾家，
本批實際採用的是 **Columbia／Legacy、RCA Bluebird、Chess、Delmark、Bluesville（Prestige）、
Folkways／Smithsonian、Verve／Clef、Blue Note、Good Time Jazz、Nessa、Yazoo** —— 前十家都是原始版權方或其繼受者。

**裁定：本批不需要 Discogs version 頁的補充舉證（第 65 條）。**
理由是第 65 條要防的形狀是「盜版冒用正牌廠牌名與目錄號」，那發生在義大利／俄羅斯的迷你廠牌復刻上；
本批的再發方全是大廠自家母帶，MB 的 Official 標記與廠牌身分互相印證，沒有反向證據（第 78 條）。
**但這是對「本批這 44 次再發」的判定，不是對這幾家廠牌的白名單**——第 57 條照舊。

## 3. Roy Eldridge《Roy & Diz》的掛名取「Roy Eldridge & Dizzy Gillespie」，不照 MB 的 artist-credit 順序

MB 的 artist-credit 是「Dizzy Gillespie; Roy Eldridge」（`8a5a5fcf`），照第 6／70／120 條的字面
應該掛「Dizzy Gillespie & Roy Eldridge」。**但那會讓這張變成第八張 Dizzy Gillespie 卡
（池中已有 7 張），而 Roy Eldridge 仍然是 0 張——與這批「先確認第一張該有的在不在」的判準相反。**

三項反證：Clef MG C-641 原盤盤名就是《Roy and Diz》（Roy 在前）；
Apple US collectionId 1443173406 記「Roy Eldridge & Dizzy Gillespie」；
這是 Norman Granz 以 Eldridge 為主角安排的對吹企畫。
**MB 的順序是字母序偏差，不是掛名事實。**

**裁定：掛名取「Roy Eldridge & Dizzy Gillespie」。** 可逆（改的是卡單一個字串，`rgMbid` 不動）。

## 4. 原本要收的 Roy Eldridge《Little Jazz》改釘《Roy & Diz》——理由是封面與試聽兩條線同時落空

`bbe2dd32`《Little Jazz》(1954 Clef) artist-credit 乾淨、是首選，但
**CAA release-group 端點實測 404**，且 Apple 的三筆「Little Jazz」
（1148810394／1092726737／575139121，皆記 1950-06-09）全是 Columbia／Verve 的整編、不是那張 Clef LP。
`8a5a5fcf`《Roy & Diz》CAA 200 ＋ Apple 1443173406 兩條線都在。

**裁定：改釘《Roy & Diz》，《Little Jazz》寫進 `mbNote` 的「刻意不釘」。**
同一形狀另外處理了兩張：

| 原定 | 改釘 | 理由 |
|---|---|---|
| Blind Lemon Jefferson《The Immortal Blind Lemon Jefferson》(1967, `9e2be16a`) | 《Blind Lemon Jefferson》(1974 Milestone, `46685007`) | 原定 CAA 404 ＋ Apple 查無；改釘者 CAA 200 |
| Sidney Bechet《Sidney Bechet and His Blue Note Jazz Men》(1951, `078bf11c`) | 《The Fabulous Sidney Bechet》(`53537ba8`) | 原定 CAA 404 ＋ Apple 查無；改釘者 CAA 200 ＋ Apple 725210025 |
| Art Tatum《The Genius of Art Tatum》(1954 Clef, `a8381e5b`) | 《God Is in the House》(1973 Onyx, `79bca8f7`) | 原定 Apple 無對應條目（只有 1967 年的《The Genius》）；改釘者 CAA 200 ＋ Apple 1438004708 |

**通則：戰前與 1950 年代的碟，「MB 有這個 release-group」與「下游拿得到封面」是兩件事，
策展層應該在定案前就打一次 CAA release-group 端點**（一張一個 HTTP 請求，成本極低）。
本批對 35 個候選 release-group 打了 CAA release-group 端點，**5 筆 404**：
`9e2be16a`（BLJ《The Immortal…》）、`078bf11c`（Bechet《…Blue Note Jazz Men》）、`bbe2dd32`（Eldridge《Little Jazz》）
三筆直接換掉；`9268e41f`（King Oliver《The King & Mister Jelly Lord》）本來就因合掛而落選；
`573ca4f6`（James P. Johnson《Carolina Shout》）因為 Apple 有精確條目（203053431，14 軌對得上）
而依 §4 走 apple-verified-collection 保留。Art Tatum 那一張的換釘理由不是 CAA（原定的 `a8381e5b` CAA 200）
而是 Apple 無對應條目。

## 5. 三張的 `year` 不取 MB 的 `first-release-date`

依第 91 條「rgMbid 是身分鍵不是年份來源」與 §5.6「年份取合輯首次出版年」：

| 卡 | MB first-release-date | 本卡 year | 理由 |
|---|---|---|---|
| Ida Cox《Blues for Rampart Street》 | 1990 | **1961** | Riverside RLP-374 原盤 1961；Apple 1442454284 亦記 1961。MB 那個日期是 CD 再版年。 |
| Sidney Bechet《The Fabulous Sidney Bechet》 | 2001-01-09 | **1958** | Blue Note BLP 1207 原盤 1958；Apple 725210025 記 1958。MB 那個日期是 RVG 版重發年。 |
| Bix Beiderbecke《Singin' the Blues》 | 1990 | 1990（不變） | 列此表僅為對照：這一張的 1990 就是 Columbia／Legacy 整編的首次出版年，錄音年 1927 已寫進 `why` 與 `risk`。 |

其餘 41 張的 `year` 與 MB 一致。**凡 year 與錄音年落差 ≥10 年的（本批 21 張），
`why` 交代錄音年、`risk` 寫明落差**，依派工信要求。

## 6. Bix Beiderbecke 的卡片盤名取《Singin' the Blues》，不取 MB 的《Volume 1: Singin' the Blues》

MB `06f62d64` 的標題是「Volume 1: Singin' the Blues」——那是 Columbia 分冊編號被當成標題前綴的結果，
單獨當卡片盤名讀起來不成話。依第 91／95 條「RG 標題與卡片盤名不必相等」，取通行的《Singin' the Blues》。
MB 另有 `f2927c6a`《Singin' the Blues》(1995) 是同一套的重複條目、**與本卡盤名字面完全相同**，
已明寫「刻意不釘」——這正是第 162 條「盤名被縮短過的卡，子字串比對是反的」的形狀，
四種寫法全部進 `queryAlias`。

同型處理：Kid Ory 的 MB 標題「Kid Ory Plays W.C Handy」少一個句點，卡片取正式寫法
《Kid Ory Plays W.C. Handy》；Tampa Red 的 MB 標題用彎引號「Don’t Tampa With the Blues」（U+2019），
卡片取 ASCII 直引號。兩者的 MB 原文都進 `queryAlias`。

## 7. 五張合掛盤取領銜者當卡片掛名，`risk` 逐張寫明第二掛名

| 卡 | MB artist-credit | 卡片掛名 |
|---|---|---|
| Victoria Spivey《Woman Blues!》 | Victoria Spivey; Lonnie Johnson | Victoria Spivey |
| Ida Cox《Blues for Rampart Street》 | Ida Cox; Coleman Hawkins Quintet | Ida Cox |
| Lonnie Johnson《Blues & Ballads》 | Lonnie Johnson; Elmer Snowden | Lonnie Johnson |
| Jimmy Rogers《Chicago Bound》 | Jimmy Rogers; Little Walter; Muddy Waters | Jimmy Rogers |
| Elmore James《Whose Muddy Shoes》 | Elmore James; John Brim | Elmore James |

（第六張《Roy & Diz》見第 3 條，是唯一一張刻意保留雙掛名的。）
判準：MB 的合掛反映的是「誰在這張碟上演奏」，卡片掛名要反映的是「這是誰的碟」。
五張的領銜身分都有原盤封面或廠牌編號支持。**可逆**（改的是卡單字串）。

## 8. Roscoe Mitchell 改收《Old / Quartet》——《Nonaah》已在 c-86

`chk-prop` 的跨批去重（第 119 條）抓到 c-95《Nonaah》(1977) 與 **c-86 prop-b** 撞卡。
依第 119 條「先到先得，保留較早的批次」，c-95 改收 `07af4d38`《Old / Quartet》(1975 Nessa)——
同廠牌、同時期、CAA 200，而且內容是 Art Ensemble of Chicago 成軍前的四重奏場次，
與池中既有的 Art Ensemble 5 張接得更緊。**這是本批唯一一次跨批撞卡，改完後標記 0。**

## 9. 未收但值得記的兩張

- **Benny Carter《Further Definitions》(1961 Impulse!)**——他最重要的一張。
  藝人 MBID `25cf5731` 名下 107 個 release-group **分頁全列後查無獨立條目**，
  只有 `efbcd221`《Additions to Further Definitions》(1966) 與 `f43f8d8d`《Further Definitions + Jazz Giant》(2012 合併重發)。
  依本批規則（MB 查無不收）改收《Jazz Giant》(1958)。**《Further Definitions》列 §1 補遺候選**：
  Apple 有確切條目 collectionId 1584387773（Benny Carter and His Orchestra、1962-03-01、8 軌）。
- **Roscoe Mitchell《Sound》(1966 Delmark)**——AACM 的第一張唱片。
  在 MB 掛在 **Roscoe Mitchell Sextet** 名下，本人實體 `56f33083` 分頁全列 57 筆查無；
  以「Sound」查會命中《Sound Songs》(1997) 與《Before There Was Sound》(2011) 兩個假陽性。
  **列 §1 補遺候選。**
