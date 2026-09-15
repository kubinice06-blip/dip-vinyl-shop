# c-132 裁定（a 組 370–379、b 組 380 起，append）

## 第 380 條（2026-09-15，c-132 b 組）：**實收 19／22——缺的 3 張全在松本英彦，而且不是查法問題，是 MB 上真的只有三張**

簡報第五節給 b 組四位共 22 張，實收 **19**：

| 掛名 | 池中現有 | 簡報名額 | **實收** | 差 |
|---|---:|---:|---:|---:|
| 本田竹広 | 2（`本田竹曠《This Is Honda》1972` seed ＋ c-131《Salaam Salaam》1974） | 5 | **5** | 0 |
| 松本英彦 | 1（`Hidehiko Matsumoto《Hot Jazz》1983`） | 6 | **3** | **−3** |
| 宮沢昭 | 1（c-131《いわな》1969） | 6 | **6** | 0 |
| 白木秀雄 | 1（c-131《Sakura Sakura》1965） | 5 | **5** | 0 |

**松本英彦在 MB 上的實際可得量就是 3 張。** 走過的路（全部實測，非推測）：

1. `artist?query=松本英彦` → 個人實體 `d4027a8f-6a56-43d9-81cc-c80084d22b58`（Person／JP，disambiguation 明寫
   「Japanese jazz saxophonist & bandleader; “Sleepy”」）。
2. **拉丁轉寫查不到不等於查無（第 309 條），所以四種查法並行**：
   `artist:"Hidehiko Matsumoto"`（只回兩個空殼群組）、`artist:"Sleepy Matsumoto"`（回獨立實體 `c03c3b61`）、
   `松本英彦 AND country:JP`、`スリーピー`。
3. `release-group?artist=<每個實體 id>&limit=100` 分頁拉完整目錄（第 116 條）：
   **`d4027a8f` 11 個 RG；`53f0f608`（Hidehiko Matsumoto Quintet）0 個；`e16e946c`（Quartet）0 個；
   `ad02820f`（松本英彦とスリーピーラテン楽団）0 個；`c03c3b61`（Sleepy Matsumoto）只有一筆合掛。**
4. 再用 `release-group?query=artist:"…"` 三種寫法反查，回傳集合與第 3 步完全相同，**沒有漏掉的實體**。

那 11 個 RG 的分類：**個人領銜 3**（`6de7306e`《Sleepy》1976 TBM-74、`91e94cbc`《Rio Manhattan》1981 SEVEN SEAS、
`d19cb142`《Four Wings》1994／MB 記 2023）、**合掛 5**、**演歌伴奏 1**、**Compilation 2**。三張全收，一張不剩。

**結論：不是我沒查到，是 MB 沒建。** 他 1950–60 年代那一整段（與 ジョージ川口、渡辺晋 的 big four 時期、
日本コロムビア／Takt 的盤）在 MB 上**一張個人領銜盤都沒有**——那些碟列在第 381 條的 §1 候選清單。
缺的 3 張請主線從 a 組或下一批調。**本條與第 381 條那份清單本身就是交付物。**

---

## 第 381 條（同批）：**§1 候選清單——MB 完全查無 release-group、但唱片實體確鑿的碟（不得自造 rgMbid）**

依 c-132 簡報第二節第 3 點，這份清單交給本機走 §1 人工身分。**每一筆都附查過的關鍵字。**

### A. 松本英彦（缺額的來源，優先）

| 盤名（日／英） | 年 | 廠牌／catno | 查過的關鍵字 |
|---|---:|---|---|
| 《ジャズ・アット・ザ・シンジュク》系列的松本英彦領銜盤 | 1950s 末 | 日本コロムビア（catno 待查） | `artist:"松本英彦"`、`release-group?artist=d4027a8f`、`松本英彦 AND country:JP`、`Hidehiko Matsumoto`、`Sleepy Matsumoto`、`スリーピー` — **全部零筆** |
| 《Sleepy's Mood》／《スリーピーのムード》 | 1960s | 日本コロムビア／Takt（待查） | 同上，另查 `release-group?query=Sleepy AND artist:Matsumoto` — 零筆 |
| 松本英彦とスリーピーラテン楽団 名下全部 | 1960s | 待查 | MB 實體 `ad02820f-26c8-42bd-a8f8-a725979bc76b` 存在、**名下 0 個 RG**（alias 有四種寫法：Hidehiko Matsumoto and The Sleepy Latin Band／松本英彦とスリーピー・ラテン楽団／松本英彦のスリーピー・ラテン楽団） |
| 松本英彦クインテット 名下全部 | 1960s–70s | 待查（Apple jp 有 `304321152`《決定盤!これぞブルース》2009 掛這個團名） | MB 實體 `53f0f608-81b3-47b6-bb2d-008cf796ce7c`（Group／JP，disambiguation 松本英彦クインテット）、**0 個 RG** |
| 松本英彦カルテット 名下全部 | 1960s–70s | 待查 | MB 實體 `e16e946c-95d0-4a14-b4d4-0d7b8bbf14cd`（Group）、**0 個 RG** |

⚠ **四個空殼實體**（`ad02820f`／`53f0f608`／`e16e946c`＋`c03c3b61` 只有一筆合掛）**本身就是證據**：
有人在 MB 上建過這些團，卻一張碟都沒掛上去。

### B. 宮沢昭

| 盤名 | 年 | 廠牌 | 查過的關鍵字 |
|---|---:|---|---|
| 《Woodpecker》 | 待查 | **廠牌待查**（`enum/jp-1.md` §1 清單原文就寫「廠牌待查」） | `release-group?artist=59e0a0d4`（13 個 RG 全數列出，無此筆）、`artist:"宮沢昭"`、`Miyazawa Akira`、`Akira Miyazawa` — 零筆 |
| 宮沢昭とオールスターズ 名下全部 | 1960s | 待查 | MB 實體 `312ca341-07a8-4ed6-b288-594ca8ff88ab` 存在、**0 個 RG**（alias 六種：Akira Miyazawa Allstars／宮沢昭オールスターズ／宮沢昭オール・スターズ…）；c-131 第 356 條 F 已記過同一筆 |
| 宮沢昭トリオ 的領銜盤 | 1960s | 待查 | MB 實體 `18f7eb99-bfed-455e-b429-6de13724cbad`，**名下只有一個 Compilation**（`1a907384`《Special Pink Mood Deluxe Vol.2》1969）、無領銜盤 |
| 《木曽》／《Kiso》1970 原盤 | 1970 | 待查（MB 只有 2006 Think! THCD-031 的復刻 RG `7c04151d`，Apple jp 把它標成 1970-01-01） | 同上 |

### C. 白木秀雄

| 盤名 | 年 | 廠牌／catno | 查過的關鍵字 |
|---|---:|---|---|
| ~~《ファンキー！登場》原盤~~ **（已改收，見第 391 條）** | **1960** | ⚠ **ビクター（Victor）SJL-5008，不是 King**（本條初稿寫 King，2026-09-15 補查後更正；6 首 bonus 的原盤是 Victor SJL-5104〔1962〕與 SJL-5069〔1963〕） | `release-group?artist=40d40a8c`（12 個 RG 全列，**只有 2006 的 Think! 復刻 `11e43432`《ファンキー!登場+6》，1960 原盤未建**）、`artist:"白木秀雄"`、`Shiraki`、`Hideo Shiraki`。**本批已以復刻 RG 收下並取年 1960（第 391 條），原盤 release 仍待本機補建** |
| 《モダン・ドラミング・アンド・スリーピー・ムード》 | 1960 | King（單聲道） | 同上 — 零筆（MB 只有 `709db011`《モダンでツイスト》2007 復刻，是另一張） |
| 《ラテン・ドラミング》原盤 | 1960s | 待查 | MB 只有 `fda383fa` 2007 Think! THCD-049 復刻，原盤未建 |
| 《祭りの幻想》**1961 テイチク原盤** | 1961 | テイチク SL-3002（另有 TEA-18 後壓） | **本批改以再發 RG `b545a154` 收下（第 384 條）**，但原盤 release 仍未建檔，本機補建後可把 release 掛進同一個 RG |

### D. 本田竹広

| 盤名 | 年 | 廠牌 | 查過的關鍵字 |
|---|---:|---|---|
| 《Watermelon Man》 | 待查 | **廠牌待查**（`enum/jp-1.md` §1 清單原文） | `release-group?artist=b90d79a5`（16 個 RG 全列，無此筆）、`本田竹曠トリオ` 實體 `19d0f709`（2 個 RG）、`artist:"Takehiro Honda"`、`Honda Takehiro` — 零筆 |

⚠ **`enum/jp-1.md` §1 清單把《Salaam Salaam》也列為「MB 完全沒有」，這一點已過時**：
MB 有 `43abf4a0`（見 `enum/jp-east-wind.json`），c-131 已據此建卡。那份清單的其他條目建議一併重驗。

---

## 第 382 條（同批）⚠ **推翻 c-131 第 356 條 F 的 CAA 門檻：`CAA 404` 不是策展層的排除理由——松本英彦整位被這條擋掉一整批**

c-131 第 356 條 F 的原文：「**松本英彦 本批 0 張**：《Sleepy》1976 與《Rio Manhattan》1981 **CAA 404**」。
同一條也用 CAA 404 擋掉了 宮沢昭《山女魚》（他最有名的一張，該條自己寫「**最值得本機手動補圖**」）、
ジョージ大塚《Page 1》《Go On'》、原信夫 1963–70 的五張正規盤。

**這個門檻在 `ALBUM_ONBOARDING.md` §4 裡已經不成立**：
- 2026-09-02（c-64）增列 `coverSourceHint: "apple-verified-collection"`；
- **2026-09-10 店主核定放寬適用範圍**：「這條例外原本只給 §1 人工身分卡，現在**釘住 MBID 的卡也適用**。
  理由是 CAA 沒有那張碟與『這張卡有沒有 MBID』是兩件獨立的事」；
- 同日另核定 `discogs` 為來源四（要件：`cover.discogsReleaseId` ＋ 目錄號／年份／廠牌至少對上兩項 ＋ 登錄 registry）。

**裁定：本批照收 CAA 404 的碟，並在每張的 `risk` 寫明「封面要走非 CAA 路線」與可走的具體路徑。**
本批 19 張裡 CAA 404 的有 **5** 張，逐張處置已寫在卡上：

| 卡 | CAA | 可走的路 |
|---|---|---|
| 本田竹広《Another Departure》1977 | 404 | Apple jp／us 兩種查法皆 0 筆 → **只剩 Discogs**（release 2524891） |
| 松本英彦《Sleepy》1976 | 404 | Apple 兩種查法皆 0 筆 → **只剩 Discogs** |
| 松本英彦《Rio Manhattan》1981 | 404 | Apple 兩種查法皆 0 筆 → **只剩 Discogs** |
| 宮沢昭《山女魚》1962 | 404 | **Apple jp 官方條目 `1777008409`（7 軌，與 MB 一致）** → apple-verified-collection |
| 宮沢昭《Four Units》1969 | 404 | **Apple us `1540555407`（5 軌，與 MB 一致）** → apple-verified-collection（jp 店面沒有，要用 us） |
| 白木秀雄《白木秀雄》1959 | 404 | **同碟的重複 RG `8c4f6561` CAA 200**，可直接取；另有 Apple jp `1777020927` |
| 白木秀雄クインテット《Plays Horace Silver》1962 | 404 | **同碟的重複 RG `2e1f5df4` CAA 200**；另有 Apple jp `1777007028` |

**「同一張碟的兩個 RG，一個有圖一個沒有」是這批新發現的形狀**（白木兩案）——
CAA 是以 RG MBID 為鍵，**重複建檔反而讓其中一個 RG 拿得到圖**。本機補圖時值得先查有沒有重複 RG。

依判準 1（`ALBUM_ONBOARDING.md` §4 的店主核定就是先例）＋判準 3（不決定就整位收不到）當場定。
**代價量化（給主線決定要不要回頭補 c-131）**：c-131 第 356 條 F 因 CAA 404 擋掉的碟至少有
松本英彦 2、宮沢昭 2、ジョージ大塚 3、原信夫 5、白木秀雄 3 —— **15 張，全部有 rgMbid、可直接建卡**。

---

## 第 383 條（同批）：**年份三案改判——逐張判，兩案靠 Apple 的官方精確日期、一案靠 MB 只建了再發**

依簡報第四節的三型失真（第 352／364 條）：

| 卡 | MB first-release-date | 改取 | 型 | 證據 |
|---|---|---:|---|---|
| 松本英彦《Four Wings》 | **2023-06-07**（只建 Octave Lab. OTLCD-2590 再發與數位） | **1994** | 第一型 | Apple jp／us 官方條目 `1329372640`《フォーウィングス》**1994-12-21，6 軌**（與 MB 的 6 軌一致）；CDJournal／HMV 的條目同記 1994 年 Trio Records，成員 松本英彦＋菅野邦彦＋鈴木勲＋ジョージ大塚 |
| 白木秀雄《白木秀雄》 | **1958**（KING KC-8 那筆 release 的 date） | **1959** | 第二型（錄音年被當發行年） | ja.wikipedia 白木秀雄條目：「初リーダー・アルバム『白木秀雄』(King KC-8) は **1958 年 11 月 26〜27 日のモノラル録音で、1959 年にリリース**」；Apple jp King 官方條目 `1777020927` 記 **1959-06-01**（9 軌，與 MB 一致）。**兩個獨立來源同向** |
| 白木秀雄《プレイズ・ボッサ・ノバ》 | **1962**（只有年份，release status null） | **1963** | 第二型的變形 | Apple jp King 官方條目 `1777007454` 記 **1963-01-20**（7 軌，與 MB 一致）。**號段旁證**：SKJ 1001《山女魚》Apple 1962-10-01、SKJ 1006《Plays Horace Silver》Apple 1962-10-30、SKJ 1007 本張 1963-01-20 —— 號碼遞增、日期遞增，**而且前兩筆的年份與 MB 完全一致，只有這一筆分歧** |

**通則（本批立）**：**當 MB 的 date 只有年份、而店面有廠牌自家上架的精確日期時，精確日期那一方優先**——
但要先確認「同一位藝人的其他碟，兩邊年份是一致的」，否則店面的日期可能是 ℗ 年而不是發行日。
上表第三案就是靠這個旁證才敢改；**沒有旁證時仍照簡報取 MB 值並在 `risk` 寫明**（第 364 條）。

**年份沒有分歧的 16 張**：本田竹広 5 張（1970／1970／1971／1973／1977）、松本英彦 2 張（1976／1981）、
宮沢昭 6 張（1962／1969／1978／1981／1982／1985）、白木秀雄 2 張（1959 リサイタル／1962 Horace Silver）、
另 1 張是第 384 條的《祭りの幻想》。其中 宮沢昭《'Round Midnight》最乾淨：
**MB `1985-07-21`、原盤 Paddle Wheel K28P-6358 同日、Apple jp `1777008777` 同日，三者逐日相符。**

---

## 第 384 條（同批）：**白木秀雄《祭りの幻想》改收——推翻 c-131「留待補建原盤後再收」，盤名取日文、年取 1961**

c-131 第 356 條 F 的處置：「`b545a154`《Hideo Shiraki in Fiesta》2005 CAA 200 **但 1961 Teichiku 原盤 MB 未建檔、
RG 年份是復刻年，留待補建原盤後再收**」。

**本批改收**，理由是 c-132 簡報第二節第 2 點明文：「**MB 有 RG 但沒掛廠牌的照收**——`label` 寫實體盤面的廠牌，
`risk` 註明『資料庫端未登記廠牌』」，加上第四節第 1 點對「MB 轄下只有再發」的處置就是「找到原盤年就取、並寫明出處」。
**這不是新規則，是簡報已經把 c-131 的保守處置改掉了。**

三個附帶裁定：

1. **盤名取《祭りの幻想》，不取 MB 的 RG 標題「Hideo Shiraki in Fiesta」。**
   MB 三筆 release 裡有兩筆（Think! THCD-006 2005／THCD-100 2009）題的就是《祭りの幻想》，
   1961 原盤與 1998 テイチク CD（TECW-20735）也是這個名字；**英文題只出現在 Trunk 2017 的數位再發上**。
   MB 原題、「In Fiesta」、「祭の幻想」全部進 `queryAlias`。
   ⚠ **這是本批唯一一張卡面盤名與 MB RG 標題不同的卡**，下游必須鎖 rgMbid。
2. **`year` 取 1961**（MB 的 2005-11-25 是 Think! 復刻年）。廠牌寫 テイチク SL-3002，
   **但那個 catno 來自 tower.jp／STEREO RECORDS／二手唱片行條目，不是一手來源，`risk` 與 `label` 都已標「研究層須覆核」。**
3. **掛名取「白木秀雄」不取「白木秀雄クインテット」**：`b545a154` 掛的是個人實體 `40d40a8c`，
   依第 355 條取該實體主名。**同碟的另一個 RG `3a9a8c2c`（1998 テイチク TECW-20735）掛的才是群組實體 `ee00ecfa`**
   ——**同一張碟的兩個 RG 分屬兩個實體，這正是不能兩個都收的理由**（第 387 條）。

**順帶**：這張的五重奏次中音手是 **松本英彦**，標題曲〈祭の幻想〉是 **八城一夫** 1958 年用調式手法寫的曲子
（八城一夫是 c-134 a 組的掛名，4 張）——本批四位裡唯一一張把兩位掛名直接接在一起的碟，`why` 已寫進去。
依判準 1（簡報就是先例）＋判準 2（可逆：改的是卡單欄位）當場定。

---

## 第 385 條（同批）：**合掛不收的七張，與「兩位都在本組名單上」這個新形狀**

依第 321 條（合掛名一律不進池，判準是「解歧義還是製造分裂」）與第 258 條：

| 碟 | MB artist-credit | 不收的理由 |
|---|---|---|
| **《Operation Sam Taylor》1967**（`1d2ed313`，KING 45SDS-1，12 軌，**CAA 200**） | `Hidehiko Matsumoto, Akira Miyazawa` | ⚠ **兩位平列，而且兩位都是本組的掛名**——收成合掛會**同時**給松本英彦與宮沢昭各製造一個新字串。這是 321 講的分裂形狀的加倍版 |
| 《Fascinating Tenor-Sax》1966-10（`4350666f`，JVC SJV-227，12 軌，CAA 200） | `Yasunobu Matsuura, Hidehiko Matsumoto & Akira Miyazawa` | 三人平列，同上 |
| 《Let's Swing Now》1976（`7fed7a8e`，Victor SJV-869） | 五人平列（MB credit 原文：Hidehiko Matsumoto, Seiichi Nakamura, Kazuo Yashiro, Masanaga Harada, Shoji Nakayama） | 全明星 session，五個掛名 |
| 《Jam In Yokota》1973-06-25（`0e997400`，エレックレコード ELW-3004，Live） | 七人平列 | jam session |
| 《The Session / Sleepy Meets the Great Jazz Trio》1980（`d2119a73`，NEXT WAVE 25PJ-1004） | `Hidehiko Matsumoto, The Great Jazz Trio` | c-131 已依第 258 條擋下（池中已有 GJT 卡），**盤名本身還帶斜線**（321 原文點名的形狀） |
| 本田竹広《Flying To The Sky》1971（`60c713e2`，Trio） | `T. Honda & G. Dudek` | 兩人平列 |
| 本田竹広《In a Sentimental Mood》1985（`3ed3cde5`，CBS/Sony） | `Takehiro Honda, Nobuyoshi Ino, Takeo Moriyama` | 三人平列 |
| 宮沢昭《ミュージカル・プレイ・イン・ジャズ》1969（`346f1404`，Union） | `宮沢昭, 前田憲男, 原田政長, 富樫雅彦` | 四人平列（**前田憲男 是 c-134 a 組的掛名**） |
| 白木秀雄《Modern Ameriachi For You》1966（`809303fb`，KING SKK 227） | `Hideo Shiraki Quintet + All Stars, Takeshi Inomata & His West Liners + All Stars` | 兩團合掛（**猪俣猛 是 c-133 a 組的掛名**） |

**⚠ 代價要講清楚**：《Operation Sam Taylor》是 1967 年 King 的次中音對決盤、CAA 200、原盤 Official、
`enum/jp-king.json` 直接列出來的一筆——**本來是松本英彦缺額最好的補品**。
擋下它等於把松本的缺額從 −2 變成 −3。**若主線判定「兩位都在名單上時可以收合掛」，這張可以立刻建卡，rgMbid 已備妥。**

**本批立的新形狀**：321 原本防的是「同一位被拆成單掛名與合掛名兩個字串」。
本批出現的是**「合掛的兩位各自都在同一批的收卡名單上」**——
這時合掛不只造成分裂，還會讓同一批裡同時存在 `松本英彦`、`宮沢昭`、`Hidehiko Matsumoto, Akira Miyazawa` 三個字串。
**依 321 從嚴，但把代價與 rgMbid 留在這裡供主線翻案。**

---

## 第 386 條（同批）⚠ **跨組與跨批的撞卡風險：兩張碟的「另一位掛名」在別批的名單上，而 `chk-prop` 抓不到**

`chk-prop` 的折疊鍵是 `掛名＋盤名`（第 322 條講過同一個限制的鏡像）。
**同一張碟被兩批用兩個不同掛名各收一次，一次都不會亮燈。**

| 碟 | 本組掛的名 | 另一個可能的掛名 | 在哪一批 |
|---|---|---|---|
| 《Four Units》1969（`9e764a87`） | **宮沢昭**（MB RG credit 就是單掛 `宮沢昭`） | **佐藤允彦**（Discogs 盤面是「宮沢昭 / 佐藤允彦 / 富樫雅彦 / 荒川康男」四人平列；Apple us `1540555407` 也是四人平列） | **c-132 a 組**（佐藤允彦 5 張） |
| 《Four Wings》1994（`d19cb142`） | **松本英彦**（MB 與 Apple 的 credit 都是單掛 `松本英彦`） | **菅野邦彦**／**ジョージ大塚**（CDJournal 寫「松本英彦+菅野邦彦+鈴木勲+ジョージ大塚」） | **c-134 b 組**（菅野邦彦 3 張）、**c-133 b 組**（ジョージ大塚 5 張） |

**本組的處置**：兩張都**依第 355 條掛 MB RG 的單一 credit／實體主名**，不掛聯名；
交件時已人工比對 `desc-tools/batches/cards/` 全部 169 個卡單檔（含 c-126～c-131）與 `chk-prop` 的 95 批，
**撞卡 0、同盤名不同掛名 0**。

**給主線／後續批的提醒（這是本條的重點）**：
a 組的《Four Units》、c-133／c-134 的《Four Wings》**如果要收，要先看這裡**——
`chk-prop` 不會替你擋。同理，本組刻意不釘的合掛（第 385 條）裡，
《ミュージカル・プレイ・イン・ジャズ》牽到 **前田憲男（c-134 a）**、
《Modern Ameriachi For You》牽到 **猪俣猛（c-133 a）**，那兩張若被別組以另一位的名義收走，也不會亮燈。

---

## 第 387 條（同批）：**白木秀雄有四組「同一張碟兩個 release-group」——MB 這位的建檔重複率是本批最高的**

| 同一張碟 | 有原盤 release 的 RG（本批釘的） | 重複的 RG（不釘） | CAA |
|---|---|---|---|
| 《白木秀雄》（King KC-8） | **`da7146b8`**（轄下有 1958 KC-8） | `8c4f6561`（2007-11-23 Think! THCD-064，只有 CD） | 404 ／ **200** |
| 《Plays Horace Silver》（King SKJ 1006） | **`7ce34993`**（轄下有 1962 SKJ 1006） | `2e1f5df4`《プレイズ・ホレス・シルヴァー》（2007-11-23 THCD-066） | 404 ／ **200** |
| 《白木秀雄リサイタル》（King LKF 1051） | **`f59e3eb2`**（轄下有 1959 LKF 1051） | `4b426f75`《HIDEO SHIRAKI RECITAL》（無日期、只有數位、掛群組實體） | **200** ／ 404 |
| 《祭りの幻想》（Teichiku 1961） | **`b545a154`**（Think!／Trunk 三筆再發，掛個人實體） | `3a9a8c2c`《白木秀雄クインテット／祭りの幻想》（1998 Teichiku TECW-20735，掛**群組**實體） | **200** ／ 404 |
| 《プレイズ・ボッサ・ノバ》（King SKJ 1007） | **`5ed483fe`**（轄下有 1962 SKJ 1007） | `aaa30ffc`《白木秀雄プレイズ・ボッサ・ノバ》（2007，標 **Compilation**） | **200** ／ — |

**釘的判準（本批立）**：**取轄下有原盤 release 的那一個 RG**；只有《祭りの幻想》兩個 RG 都沒有原盤，
改取 release 較全、CAA 200 的那個（第 384 條）。

**兩個附帶發現**：
1. **重複 RG 的 CAA 狀態常常相反**（前兩列：原盤 RG 404、復刻 RG 200）——本機補圖時**先查有沒有重複 RG**（第 382 條）。
2. **重複 RG 常常分屬不同 artist 實體**（《祭りの幻想》一個掛個人、一個掛群組；《リサイタル》同樣）
   ——**這使「同一張碟被兩種編制掛名各收一次」在 `chk-prop` 上完全隱形**，與第 386 條同族。

---

## 第 388 條（同批）：**掛名處置總表——三組既有分裂待本機統一，本批一個新分裂都沒造**

| 掛名 | 本批卡片用 | 池中既有 | 處置 |
|---|---|---|---|
| **本田竹広** | `本田竹広`（MB 實體 `b90d79a5` 主名，5 張） | `本田竹曠《This Is Honda》1972`（seed，已上架） | 依簡報第三節與 c-131 第 355 條取 `本田竹広`；`本田竹曠` 進每張的 queryAlias。⚠ **本批《I Love You》的 MB artist-credit 就是「本田竹曠」**，是四種 credit（本田竹広／本田竹曠／T. Honda／Takehiro Honda）並存的直接證據。**池中那張待本機改寫，本批不自行合併（第 307 條）** |
| **松本英彦** | `松本英彦`（MB 實體 `d4027a8f` 主名，3 張） | `Hidehiko Matsumoto《Hot Jazz》1983`（c-87 Johnny's Disk 線，已上架） | 依 c-131 第 357 條：新卡用漢字，**既有英文字串待本機統一**。c-131 因 CAA 門檻新卡 0 張、分裂沒擴大；**本批是他第一次以漢字掛名進池，統一的必要性從此刻起是實的** |
| **宮沢昭** | `宮沢昭`（6 張） | 零（c-131《いわな》未上架） | MB 的 RG credit 有四種寫法（宮沢昭／Akira Miyazawa／Miyazawa Akira／Akira Miyazawa Quartet），依第 355 條一律取實體主名漢字 |
| **白木秀雄** ／ **白木秀雄クインテット** | `白木秀雄` 4 張、`白木秀雄クインテット` 1 張 | `白木秀雄クインテット＆スリー琴ガールズ《Sakura Sakura》1965`（c-131，未上架） | ⚠ **三個字串，但對應 MB 三個不同實體**（`40d40a8c` 個人／`ee00ecfa` クインテット／`b9b4aac2` ＋スリー琴ガールズ），依第 354／355 條各取實體主名，**不是分裂的重複**。已逐張核過：**同一張碟沒有被兩種寫法各收一次** |

**第 307 條反查（同字串不同人）全部做過**：
池中「本田竹」只命中 `This Is Honda` 一張；「松本」「Matsumoto」只命中 `Hot Jazz` 與 Sleepy John Estes 三張假陽性；
「宮沢」「Miyazawa」零命中；「白木」「Shiraki」零命中。**四位都沒有合併風險。**

⚠ **一個要防的合併**：MB 另有 `本多俊之`（`d00cff50`，alias `Toshiyuki Honda`），
`enum/jp-king.json` 與 `enum/jp-toshiba.json` 裡 Electric Bird／EASTWORLD 有他六張碟
（BURNIN' WAVES、Opa Com Deus、Boomerang、Saxophone Music、Radio Club、Easy Breathing）。
**那是另一位薩克斯風手，任何以「Honda」為鍵的比對都會把兩位混在一起**——已寫進本田五張卡的 `risk`。

---

## 第 389 條（同批）：**封面與店面的觀察（只寫觀察不下結論——第 254 條）**

- **CAA**：本組逐張探測 release-group 端點，候選 46 個 RG（本田 16 ＋松本 11 ＋宮沢 15 ＋白木 17，含重複），
  **5xx 為 0**，404 都是真的沒圖。**入選 19 張裡 CAA 200 的 14、404 的 5**（逐張處置見第 382 條）。
- **404 的分布有規律**：Flying Disk（Victor）、three blind mice、SEVEN SEAS、King 1958–62 原盤、
  Think! Records 的復刻，**全部是 1970 年代以前的日本原盤或小廠復刻**；
  CAA 200 的則集中在 **Trio Records 1970–73 那四張、1978–85 的 RCA／NEXT WAVE／Union Jazz／Paddle Wheel**。
  **與 c-131 第 359 條的規律方向相反**（秋吉那批是 1950–70 原盤幾乎都有圖、1978 後的 CD 全空）
  ——**CAA 的覆蓋與年代無關，與「有沒有人去傳那張圖」有關**，不要拿年代當預測。
- **Apple**（jp 為主、us 對照，`search` 與藝人目錄 `lookup?id=<artistId>&entity=album` 兩種查法）：
  19 張裡 **10 張有命中且軌數與 MB 一致**，明細在各卡 `risk`。
  **兩種查法結果不同的有兩張**：《祭りの幻想》（盤名搜 0 筆、藝人目錄才命中 `1255618794`，因為 Apple 用英文題）、
  《Four Units》（jp 兩種查法皆 0、**us 才有** `1540555407`）——**第 254 條講的坑，這批踩到兩次。**
- **完全未命中的 9 張**：Another Departure、Sleepy、Rio Manhattan、Love For Sale、My Piccolo、On Green Dolphin Street，
  以及 Jōdo／The Trio／I Love You／What's Going On 的 **1970 年代原盤版本**（Apple 上的是 1987／2012 的再發，軌數相同但版本不同）。
  **廠牌集中在 Flying Disk／TBM／SEVEN SEAS／RCA／NEXT WAVE／Union Jazz** ——
  c-116 第 6 條、c-121 第 5.2 節、c-131 第 359 條那條規律的第四次應驗。
- ⚠ **Apple 會把軌數少的 LP 標成「- EP」**：《浄土》（4 軌）、《The Trio》（5 軌）、《I Love You》（5 軌）、
  《HIDEO SHIRAKI RECITAL》（6 軌）四張都被標成 EP，但 **MB 的 primary-type 全是 Album、載體是 10／12 吋黑膠**。
  依第 253／227 條，**欄位本身不是判準**；研究層引用時以原盤為準。
- ⚠ **King Records 2024 年起把白木秀雄與宮沢昭的 1958–85 目錄整批數位化上 Apple jp**
  （collectionId 在 1777007028〜1777021265 與 1777008409／1777008777 這一段，全部掛官方廠牌、軌數與 MB 一致）
  ——**這是本批年份改判的主要證據來源（第 383 條），也是往後日本爵士老盤最值得先查的一個店面。**

---

## 第 390 條（同批）：**額度外、已查證、可直接進下一批的清單（rgMbid 已備妥）**

~~**本田竹広**（額度 5 已滿，這是第六張）~~ —— **已於第 391 條改收**：`6a71d9d9`《It's Great Outside》1978（Flying Disk VIJ-6014，
JP Official 8 軌，CAA 404，Apple 兩種查法皆 0 筆）——**與本批收的《Another Departure》同一家廠牌、同形處置，可直接建卡。**

**宮沢昭**（額度 6 已滿，這是第七～九張）：
~~`13f2967d`《Sea Horse》1989~~（**已於第 391 條改收**，credit `Akira Miyazawa Quartet`，CD 9 軌，**CAA 200**，MB 無廠牌無國別；
Apple us `1712606396` 9 軌、掛「宮沢昭カルテット」）、
`34769f6e`《Noyuri》1992-08-26（EASTWORLD TOCT-6631，CAA 404，status null，見 `enum/jp-toshiba.json`）、
`7c04151d`《Kiso》2006-10-19（Think! Records THCD-031，4 軌，CAA 404；**Apple jp `1789736509` 記 1970-01-01**
——疑為 1970 年錄音的復刻，年份要照第 383 條的做法再判）。

**白木秀雄**（額度 5 已滿，這是第六～八張）：
~~`11e43432`《ファンキー!登場+6》~~ —— **已於第 391 條改收**（年取 1960；⚠ 原盤是 **ビクター SJL-5008**，
本條初稿誤寫 King，2026-09-15 補查後更正）、
`709db011`《モダンでツイスト》2007-05-25（THCD-048，5 軌，CAA 404）、
`fda383fa`《ラテン・ドラミング》2007-05-25（THCD-049，8 軌，CAA 404）。
⚠ 這三張都是 Think! Records 的復刻 RG、原盤未建檔，**與《祭りの幻想》完全同形**，處置照第 384 條。

**松本英彦**：**零**。第 380 條已列盡他 MB 上的全部 11 個 RG，可收的三張本批全收了。
他的缺額只能靠第 381 條 A 的 §1 人工身分補。

**外加一筆給 c-131 回頭補的**：第 382 條列出的 15 張 CAA-404 而被 c-131 擋掉的碟
（松本英彦 2、宮沢昭 2、ジョージ大塚 3、原信夫 5、白木秀雄 3），**rgMbid 全在 c-131 第 356 條 F 裡，可直接建卡。**

---

## 第 391 條（2026-09-15，主線裁定後補收）：**19 → 22 張，三張從第 390 條的候補清單調上來；另更正第 381／390 條的一個廠牌錯誤**

主線 2026-09-15 裁定：「缺的 3 張就從你第 390 條那份『額度外已查證』清單補，店主的標準是
『每位重點專輯 5–10 張』，所以**超過原名額沒問題**」。三張逐一如下。

### 一、三張的來由與逐張處置

| 補收 | rgMbid | 年 | 原名額／補後 | 處置要點 |
|---|---|---:|---|---|
| 本田竹広《It's Great Outside》 | `6a71d9d9` | **1978** | 5 → **6** | Flying Disk VIJ-6014、8 軌、MB 唯一一筆 release 就是原盤，**年份無分歧**。CAA **404**、Apple jp／us 兩種查法皆 0 筆 → **只剩 Discogs**（與同廠的《Another Departure》完全同形） |
| 宮沢昭カルテット《Sea Horse》 | `13f2967d` | **1989** | 6 → **7** | 掛名改 **漢字＋片假名**（見下「二」）。CAA **200**。MB 的 `label-info` 空陣列、`country` null → 依簡報第二節第 2 點照收並在 `label` 註明 |
| 白木秀雄《ファンキー!登場》 | `11e43432` | **1960** | 5 → **6** | 年份與盤名照第 384 條處理（見下「三」）。CAA **404**，Apple 查無（且有一個危險的假陽性，見下「四」） |

補後各位在池中的總數：**本田竹広 8**（seed 1＋c-131 1＋本批 6）、**松本英彦 4**（既有 1＋本批 3）、
**宮沢昭 8**（c-131 1＋本批 7）、**白木秀雄 7**（c-131 1＋本批 6）——四位全部落在店主「5–10 張」的區間內。

### 二、《Sea Horse》的掛名：`宮沢昭カルテット`，而且 MB 的結構比第 355 條講的更隱蔽

主線指定「掛名照池中先例用漢字＋片假名（`宮沢昭カルテット`），`risk` 標明 MB credit 是英文
`Akira Miyazawa Quartet`」。照辦，理由三條：

1. **第 354 條的先例**（第一世代的編制掛名一律寫漢字＋片假名：鈴木勲トリオ／峰厚介クインテット／
   白木秀雄クインテット＆スリー琴ガールズ／ジョージ大塚クインテット）。
2. **Apple jp 的官方條目掛的就是「宮沢昭カルテット」**（collectionId `1712606396`，
   ポニーキャニオン 2023-11-03 數位再發，9 軌；us 店面同一筆掛「MIYAZAWA AKIRA QUARTET」）。
3. ⚠ **MB 這裡有一個新形狀**：`13f2967d` 的 artist-credit **名字寫「Akira Miyazawa Quartet」，
   但指向的 artist 實體是 `59e0a0d4`（個人「宮沢昭」）**——不是群組實體；
   而 MB **另有**獨立群組實體 `281b012b`「Miyazawa Akira Quartet」（JP，名下只有 `7c04151d`《Kiso》）。
   **同一個編制在 MB 上同時以「個人實體的 credit 名稱覆寫」與「另立的群組實體」兩種形式存在。**
   第 355 條（credit 與實體主名不同時取實體主名）照字面走會得到「宮沢昭」，
   但那會把一張四重奏盤併進個人掛名、又與 `281b012b` 名下的《Kiso》分家——**兩邊都不對**。
   主線的裁定（取編制的漢字＋片假名）同時解掉這兩個問題：往後 `7c04151d`《Kiso》若要收，
   也掛 `宮沢昭カルテット`，兩張自然歸在一起。

**結果：宮沢昭在池中會有兩個掛名字串**（`宮沢昭` 6 張、`宮沢昭カルテット` 1 張）。
已逐張核過，**同一張碟沒有被兩種寫法各收一次**（第 386／387 條在防的形狀）。

### 三、《ファンキー!登場》：年取 1960、盤名去掉「+6」——與《祭りの幻想》同形

照第 384 條的三步做：**MB 只建復刻 → 取原盤年**、**盤名取原盤名不取復刻標題**、**掛名取實體主名**。

- **年 1960**：MB first-release-date 是 `2006-06-23`（Think! Records THCD-021 復刻年），**1960 原盤未建檔**。
- **盤名《ファンキー!登場》**（去掉復刻才有的「+6」，驚嘆號沿用 MB RG 標題的 ASCII `!`）。
  MB 原題「ファンキー!登場+6」與唱片行常見的「ファンキー！登場！」「ファンキー!!登場!」全進 `queryAlias`。
  ⚠ **本批僅有兩張卡面盤名與 MB RG 標題不同**：這張與《祭りの幻想》。**下游一律鎖 rgMbid。**
- ⚠ **14 軌橫跨三個錄音年**：唱片行（diskunion／thisboy 的 THCD-021 條目）載明
  **第 1–8 軌 1960、第 9–12 軌 1962、第 13–14 軌 1963**，原盤 8 軌。
  **研究層寫簡介只能引 1960 年的 8 軌，不得把 14 軌當成原盤內容**（第 251／262 條：軌數、日期、廠牌要出自同一筆）。
- ⚠ **MB 建成 `primary-type=Album`、`secondary-types` 空（沒有標 Compilation）**，本卡照 MB 記 `releaseType: "Album"`、
  不走 §5.6；但**它實質上是「原盤＋來自另外兩張 LP 的 bonus」**。若本機判定要改成 §5.6，
  `exceptionReason` 與兩個 HTTPS 舉證要另補（第 257 條：網址要自己讀過、通用類別頁不算）。

### 四、⚠ **更正第 381 條 C 與第 390 條的一個廠牌錯誤：《ファンキー！登場》的原盤是 ビクター，不是 King**

第 381 條 C 與第 390 條初稿都把它寫成「**1960 年 King 原盤**」。**補查後更正：原盤是 ビクター（Victor）SJL-5008**；
6 首 bonus 的原盤是 Victor **SJL-5104**（1962）與 **SJL-5069**（1963）。
兩條已就地標記更正。**成因值得記**：白木秀雄 1958–63 的碟我先驗地當成全在 King
（KC-8、LKF 1051、SKJ 1001／1006／1007 確實都是 King），**就把這張也歸了 King**——
**「同一位藝人同一段時期的碟都在同一家廠牌」是一個看得見但不成立的表面特徵**（第 253 條那個家族）。
⚠ 這個廠牌仍是二手來源（唱片行條目），**卡上的 `label` 已標「研究層須覆核」**。

### 五、⚠ 《ファンキー!登場》在 Apple 上有一個會騙過人的假陽性

藝人目錄 `900350012` 裡有 `151989291`《King Re-Jazz Swing Play the Funky!》——
**2006 年、14 軌、盤名帶「Funky」、掛白木秀雄**，四個特徵全部對上 THCD-021。
**逐軌拉過 `lookup?id=151989291&entity=song` 之後確認是另一張碟**：
曲目是 サヨナラ・ブルース／セニョール・ブルース／グルーヴィー・サンバ／キャラヴァン／チュニジアの夜／
ジャングル・ドラムス／赤坂の夜は更けて／ON A SLOW BOAT TO CHINA（白木秀雄リサイタル 1 より）…，
**與 THCD-021 的曲目只重疊〈サヨナラ・ブルース〉一首，而且 ℗ 是 King Records、不是 Think! Records**。
以《ファンキー》《Funky》搜 jp／us 兩個店面皆 0 筆——**本張在 Apple 上查無，不得拿 `151989291` 配對**。

**這是第 254 條第三步（直查 collectionId 核曲目）第一次用來「否決」而不是「補回」一個命中。**
第 254 條立的時候是為了防「兩種查法落空就下未上架的結論」；
這一次是反向：**兩種查法都命中了，但命中的是錯的碟，只有第三步查得出來。**
往後凡是「年份／軌數／盤名關鍵字都對上、但廠牌對不上」的 Apple 命中，一律要跑第三步。

### 六、其餘兩件主線裁定（本組已照辦，不再動）

- **《Operation Sam Taylor》1967（`1d2ed313`）維持不收**——第 321 條是既有先例，照先例走。
  rgMbid、廠牌（KING 45SDS-1）、CAA 200 的狀態全部留在第 385 條表內，本機端要收時直接取用。
- **第 382 條（CAA 404 不是收錄門檻）主線採納**，c-131 因此擋掉的 15 張由主線排進 c-133／c-134，本組不動。
- **松本英彦維持 3 張**——第 380 條已列盡他 MB 上的全部 11 個 RG，不再找；缺額由這三張補齊。

### 七、交件狀態

`node batch-progress/c132/chk-prop.mjs b` → **22 張、6 位、標記 0**（95 批、3,943 張，跨批撞卡 0）。
另人工比對 `desc-tools/batches/cards/` 全部 169 個卡單檔（含 c-126～c-131）：**撞卡 0、同盤名不同掛名 0**。
⚠ **實掃線上池另查到兩筆「同盤名不同掛名」**：`Marvin Gaye — What's Going On` 與 `Boney M. — Love for Sale`
——**`chk-prop` 的折疊鍵是掛名＋盤名，這兩筆不會亮燈**，已分別寫進本田竹広《What's Going On》
與 宮沢昭《Love For Sale》兩張卡的 `risk`，提醒下游不得用盤名比對。

**⚠ 第 386 條那個跨組風險已實際查過，沒有發生**：a 組交件後跑 `chk-prop a b` → **42 張、13 位、標記 0**；
逐筆核 `prop-a.json`（20 張，掛名為 渡辺貞夫／日野皓正／日野皓正クインテット／菊地雅章／菊地雅章セクステット／
佐藤允彦／佐藤允彦トリオ），**a 組沒有收《Four Units》，也沒有任何一張與本組同碟**。
第 386 條的提醒對 **c-133 b 組（ジョージ大塚）與 c-134 b 組（菅野邦彦）** 仍然有效——
《Four Wings》1994（`d19cb142`）本組已用 `松本英彦` 收走，那兩批挑碟時要先看這裡。
---

## 370（本批立，a 組）**掛名三決：日野皓正クインテット 沿用 MB 主名、菊地雅章セクステット 與 佐藤允彦トリオ 依第 354 條新立，池中的英文字串一律不動**

本組 23 張裡有 5 張掛在 MB 的**群組實體**底下，三種處置各有依據：

| MB 群組實體 | 卡片掛名 | 依據 |
|---|---|---|
| `日野皓正クインテット` `65c54d15-1514-4459-81dc-a7ff3e217a92` | **日野皓正クインテット**（照抄） | **MB 主名本來就是漢字＋片假名**，而且**池中已有同字串一張**（《Live!》）——不必轉寫、不必新立 |
| `Masabumi Kikuchi Sextet` `3936dadc-696a-4aac-a9cf-1a2c70701202` | **菊地雅章セクステット** | 第 354 條：MB 實體是英文的，卡片照池中先例寫「漢字＋片假名編制」（先例 峰厚介クインテット、日野皓正クインテット、秋吉敏子トリオ） |
| `Masahiko Sato Trio` `2d492012-408a-4a85-8894-4faa43613bc5` | **佐藤允彦トリオ** | 同上；**外加一條實證：Apple jp 店面對這個實體的顯示名就是「佐藤允彦トリオ」**（artistId `75534413`，《Palladium》`720359088`）——不是我推的，是日本店面自己這樣印 |

**池中既有的英文字串一律不動**（簡報第三節、第 307 條）：
`Masabumi Kikuchi Quintet《End For The Beginning》` 維持原樣，本批新卡用漢字，**不新造英文分裂、也不自行合併**。

第 307 條反查（同字串不同人）逐一做過，**三個新掛名在池中都是零命中**：
「菊地雅章セクステット」0、「佐藤允彦トリオ」0、「日野皓正クインテット」1（就是同一團的《Live!》）。
子字串層的假陽性另記在第 373 條。

依判準 1（有先例：第 354 條與 c-131 的秋吉三個編制卡）＋判準 2（可逆：改的是卡單的 artist 欄）當場定。

## 371（本批立，a 組）⚠ **池中有一張碟被收了兩次——`菊地雅章《End for the Beginning》` 與 `Masabumi Kikuchi Quintet《End For The Beginning》` 是同一張 1973 Philips FX-8527**

實掃卡池時撞到的，**不是本批造成的，是池中既有的**：

| 池中掛名 | 池中盤名 | MB |
|---|---|---|
| `菊地雅章` | `End for the Beginning` | RG `041fd338-0b5f-4cf8-848f-459f44e39ed0` |
| `Masabumi Kikuchi Quintet` | `End For The Beginning` | 同一個 RG |

**`chk-prop` 抓不到**：它的折疊鍵是 `k(artist)+'|'+k(album)`，**盤名摺得起來、掛名摺不起來**，
一個是 `菊地雅章`、一個是 `masabumikikuchiquintet`，兩個不同的鍵。

**這是第 307 條的第三種形狀**：307 講的是「兩位共用一個字串」（合併，看不見），
c-131 第 357 條講的是「同一位兩種字串」（分裂，看得見），
**這一條是分裂 ＋ 同一張碟重複上架——分裂讓重複卡躲過了去重**。

**影響**：店主看到的「菊地雅章池中 3 張」其實只有 **2 張不同的碟**。
簡報的名額表寫「菊地雅章 池中現有 3」，實際是 2。**本批仍照原名額收 4 張**（判準 3：不決定就卡住），
多出來的那一格等於順便把這位補到 6 張不同的碟。

**⚠ 給本機**：`Masabumi Kikuchi Quintet《End For The Beginning》` 與
`菊地雅章《End for the Beginning》` **要併成一張**，掛名統一為 `菊地雅章`（或依 MB 實體寫 `菊地雅章クインテット`）。
**併之前不要再往 `Masabumi Kikuchi Quintet` 這個字串加卡。**

**另提一條給去重工具**：`chk-prop`／`dedup-crossbatch` 目前只比「掛名＋盤名」，
**同一個 `rgMbid` 在兩個掛名下重複的情形一個都抓不到**。
卡單裡本來就有 `rgMbid`（`fix-rgmbid.mjs` 會寫），**加一道「同 rgMbid 出現兩次就亮燈」的檢查成本很低**。

## 372（本批立，a 組）⚠ **第 352 條在本組命中四張，而且 Apple 的官方條目才是原盤年的來源——不是 Discogs**

c-131 第 352 條是拿 Discogs 當原盤年來源。**本組四張的原盤年全部出自 Apple 的官方數位條目**（℗ 年＋發行日）：

| 卡 | MB first-release-date | 取 | 來源 |
|---|---|---:|---|
| 佐藤允彦トリオ《Palladium》 | **2005-02-23**（EXPRESS／Bridge BRIDGE-043 CD，轄下唯一一筆） | **1969** | Apple jp `720359088`，1969-06-20、℗ 1969 EMI Music Japan，6 軌＝MB 6 軌 |
| 佐藤允彦《Holography》 | **2006-01-20**（Bridge BRIDGE-42 CD） | **1970** | Apple jp `1716850549`，1970-09-25、℗ 1970 Nippon Columbia，2 軌＝MB 2 軌 |
| 佐藤允彦トリオ《Transformation '69/'71》 | **1991-10-19**（EXPRESS／Think! DTHK-002 CD） | **1971** | Apple jp `720401905`，1971-10-05、℗ 1971 EMI Music Japan，4 軌＝MB 4 軌 |
| （未收但同形）峰厚介《Solid》 | **2015-02-04**（EAST WIND UCCJ-9161） | — | Apple jp「ソリッド」℗ 1976 Universal——**原盤資訊未核實，本批不收** |

**三張都是同一個形狀**：MB 轄下只有 2000 年代的日本 CD 復刻（Bridge／Think! 兩家專做東芝 Express 復刻的廠），
1969–71 年的東芝 Express 黑膠原盤**沒有人建檔**。

**軌數一致是本條的把關點**：三張的 Apple 軌數都與 MB 的復刻 release 軌數相同，
所以「Apple 那筆就是同一張碟」這件事站得住，℗ 年才能拿來當原盤年。
**軌數對不上就不能這樣用**（c-131 第 1 張《Toshiko's Piano》8 軌 vs 12 軌就是反例）。

**catno 一律不寫**（第 262 條）：三張的 1969／1970／1971 原盤 catno 沒有任何一筆 release 能背書，
`label` 欄只寫廠牌並註明「MB 未建原盤 release」。
**⚠ 給本機**：這三張的 MB 原盤 release 值得補建，否則 `reconcile-year` 會回讀成 2005／2006／1991。

⚠ **《Holography》另有廠牌兩說未決**：Bridge 這條復刻線處理的多是東芝 Express 的目錄，
Apple 的 ℗ 卻寫 日本コロムビア／NIPPONOPHONE。**兩說沒有一筆 release 能裁**，
`label` 欄兩說並列、正文不得斷言（第 250 條「分不出來就標為不得寫」）。

## 373（本批立，a 組）**實掃卡池：五位的池中現況與假陽性明細（子字串比對在這一批特別毒）**

`seed_cards.json` 全 16,450 列，逐筆核整個掛名字串。

| 掛名 | 簡報寫的池中數 | 實掃 | 池中那幾張 |
|---|---:|---:|---|
| 渡辺貞夫 | 3 | **3** | Pamoja 1976／California Shower 1978／Orange Express 1981（**全部 1976 年後**） |
| 日野皓正 | 4 | **4** | 日野皓正クインテット《Live!》／《Live in Concert》／《Hi-nology》／《Alone, Alone and Alone》（**兩張是現場盤**） |
| 菊地雅章 | 3 | **2 張不同的碟**（見第 371 條） | 《Susto》1981 ＋《End For The Beginning》1973（重複兩次） |
| 佐藤允彦 | 2 | **2** | 佐藤允彦とサウンド・ブレイカーズ《Amalgamation》1971／佐藤允彦《Trinity》1971（**同一年**） |
| 峰厚介 | 4 | **4** | 峰厚介クインテット《Mine》《2nd Album》／峰厚介《Daguri》《First》（**全部 1970–73**） |

**假陽性明細**（全部逐筆核整個掛名字串後排除）：

- **`Mine` 11 張**——Eminem ×5、Mineral ×2、The Lumineers、Jazmine Sullivan ×2、The Jasmine Minks。**本組最毒的一個子字串。**
- **`渡辺` 6 張**——渡辺香津美 ×5、渡辺岳夫《機動戦士ガンダム》×1。
- **`Watanabe` 1 張**——`Fumio Watanabe Quintet《Groovin' High》`（鼓手 渡辺文男，**另一位**；⚠ 他是 c-134 b 組的掛名）。
- **`佐藤` 3 張**——佐藤博、Somei Satoh 佐藤聰明、佐藤奈々子。
- **`Hino` 4 張**——Toshinori Kondo/DJ Krush、Takkyu Ishino、Yoshinori Sunahara、Yoshino Yanagihara。
- **`Kikuchi` 1 張**——Masaaki Kikuchi《Formula》。
- **`Sato` 1 張**——Frankie Knuckles presents Satoshi Tomiie。

**通則**：日本掛名的羅馬字很短（Mine／Sato／Hino），**子字串比對幾乎必然假陽性**，
一律看整個掛名字串（第 254 條同族的「表面特徵不是判準」）。

## 374（本批立，a 組）⚠ **第 309 條在本組換了三種形狀，每一種都是「一種查法一定漏」**

| 掛名 | 失效的查法 | 有效的查法 |
|---|---|---|
| 渡辺貞夫 | `artist:"Sadao Watanabe"` **只回 `Sadao Watanabe Quintet` 一個群組**、回不到本人 | `artist:"渡辺貞夫"` → `378278bf`（Person／JP） |
| 日野皓正 | `artist:"Terumasa Hino"` **只回 `Terumasa Hino Quartet`**、回不到本人 | `artist:"日野皓正"` → `60d3fa1e` |
| 菊地雅章 | `artist:"Masabumi Kikuchi"` **只回 Trio／Sextet／Quintet 三個英文編制實體**、回不到個人 | `artist:"菊地雅章"` → `5216d6d4` |
| 佐藤允彦 | `artist:"Masahiko Satoh"` 與 `artist:"Masahiko Sato"` **全域 0 筆** | `artist:"佐藤允彦"` → `04bbec22`；三重奏實體**反過來只能用英文查到**（`Masahiko Sato Trio` → `2d492012`） |
| 峰厚介 | **`artist:"峰厚介"` 也回 0 筆**（加了 `artist:` 欄位前綴就失效） | **去掉前綴、直接用關鍵字查**：`query=峰厚介` → count 1098、本人 score 100 排第一 |

**峰厚介 那一格是新的**：前四種是「漢字查得到、羅馬字查不到」（第 309 條原形），
**第五種是「連漢字加了 `artist:` 前綴都查不到，要拿掉欄位限定」**——
Lucene 的 `artist:` 欄位對這個三字漢字名做了不同的分詞。

**做法（補進第 309 條）**：非拉丁文字圈的掛名，**`artist:"…"`、不加前綴的裸關鍵字、
以及從列舉檔／既有 RG 拿 artist id 三種都要試**，任何一種回 0 都不是結論。

**另外**：本組五位全部先在 `batch-progress/enum/jp-*.json` 十四份列舉檔裡撈過
（渡辺貞夫 37 筆、日野皓正 25、佐藤允彦 15、菊地雅章 8、峰厚介 2），
**撈到的 rgMbid 直接可用，省掉大半的 1 req/s**——簡報第一節的作法實測有效。
⚠ 但列舉檔會**同一個 rgMbid 在兩個廠牌檔各出現一次**（《Sadao Meets Brazilian Friends》在 jp-columbia 與 jp-denon 各一筆，
《Dedicated to Charlie Parker》同樣），**那是廠牌實體重複撈取，不是兩張碟**。

## 375（本批立，a 組）**MB 的重複 RG：本組撞到六組，處置一律「釘有圖／有原盤那個，另一個寫進 mbNote」**

| 碟 | 釘 | 不釘 | 差別 |
|---|---|---|---|
| 日野皓正クインテット《Into the Heaven》 | `7fa61991`（題全大寫 `INTO THE HEAVEN`，credit 漢字，**CAA 200**，轄下 1970 原盤＋1997 CD） | `313f4d8a`（題一般大小寫，credit `Terumasa Hino Quintet`，**CAA 404**，轄下同一張 1970 Columbia XMS-10025-CT） | 同碟同 catno，credit 一漢一英 |
| 菊地雅章セクステット《Re-confirmation》 | `c61e49b9`（1970 Philips FX-8501 原盤，CAA 200） | `95336d82`《再確認そして発展》（2009 SHM-CD UCCJ-4068，CAA 404） | 日文題的 2009 復刻另立 RG |
| （未收）菊地雅章《End For The Beginning》 | `041fd338`（1973 原盤） | `2a3e3fca`《エンド・フォー・ザ・ビギニング》（2009，CAA 404） | 同上 |
| （未收）菊地雅章《POO-SUN》 | — | `8f21fbb8`（2009，CAA 404，**1970 Philips 原盤 MB 完全沒建**） | 只剩 2009 那個殼 |
| （未收）菊地雅章《ダンシング・ミスト》 | — | `3f0c2dca`（2009，CAA 404） | 同上 |
| （池中已有）峰厚介クインテット《Mine》 | `04dfc616`（1970 TBM-1） | `2470688c`（2013 RG） | — |

**卡面盤名的取捨**：《Into the Heaven》釘的是全大寫那個 RG，**但卡面寫一般大小寫**——
理由是 Apple 官方條目（`1894177768`）與另一個 RG 都用一般大小寫，全大寫只是 MB 的錄入習慣；
`chk-prop` 的折疊鍵會 lowercase，**大小寫不影響去重**，MB 原文進 `queryAlias`。
（同理 日野皓正《Feelin' Good》把 MB 的 U+2019 撇號改成 ASCII，佐藤允彦《All-in All-out》把 MB 的兩個 **U+2010** 改成 ASCII 連字號——
**後者不改 `chk-prop` 就會亮燈**。）

**⚠ 2009-05-27 那一組是同一個成因**：Universal 的 SHM-CD 復刻把 菊地雅章 Philips 時期四張各自另立 RG、
**四個 RG 的 CAA 全部 404**，而原盤 RG 有的有圖（Re-confirmation、End For The Beginning）、有的根本不存在（POO-SUN、ダンシング・ミスト）。
**「同一批復刻另立 RG 且全批無圖」是這條線的規律，不是個案。**

## 376（本批立，a 組）**未收清單（分類，rgMbid 已備妥）**

### A. CAA 404 而不收（MBID 已釘、身分已查，補到圖就能建卡）
渡辺貞夫 `1041020f-39ab-431a-a2a4-b7a6b26cc150`《Jazz & Bossa》1967（**Takt JAZZ-1，這條爵士線的第一號盤**，Apple jp `1868591070` 11 軌 ℗ 1967 Nippon Columbia——**最值得本機手動補圖的一張**）、
`7d1f1419-d15d-4541-b4fb-0efa7d719302`《Sadao Watanabe Plays》1966-04-05（Polydor SLJM-1262，MB 名下最早的 RG）；
菊地雅章 `e4fbb764-3d5b-44f7-8751-fcccb28e2fc1`《But Not For Me》1978（Flying Disk VIJ-6016）、
`8f21fbb8`《POO-SUN》、`3f0c2dca`《ダンシング・ミスト〜菊地雅章イン・コンサート》、`95336d82`《再確認そして発展》、`2a3e3fca`《エンド・フォー・ザ・ビギニング》（四張都是 2009 SHM-CD 的殼，見第 375 條）；
佐藤允彦 `c620fa2d-f6d9-4ccb-9663-baff687aea50`《Pavane Lachrymae》1978-10（DENON YX-7536-ND）、
`79d0b90d`《Wonderful Moog Sound》1972（JVC CD4B-5015E，且合掛）、`cc5397e0`《A Path Through Haze》1972（MPS，且合掛）、`f7fb9307`《標準伎楽》2016；
日野皓正 `313f4d8a`《Into the Heaven》（重複 RG）；
峰厚介 `94001ced-8228-4e48-aeb0-1346aba97360`《Plays Standard》（**無日期、無廠牌、無 CAA**）、`ac01bece-fdf4-432d-bc4d-9944dd63b354`《In a Maze》1995（Verve POCJ-1280）。

### B. 額度未收、CAA 200、原盤 Official，可直接進後續批
渡辺貞夫：`4cefbabc`《Sadao Plays Bacharach and Beatles》1969（Columbia XMS-10010-CT）／`e2c1d3f0`《Music Break》1969（XMS-10017-CT，⚠ Apple 標 Live 1967）／`df94c614`《Live at the Junk》1970（CBS/Sony SONP 50221-J，Album/Live）／`a11be8fb`《Mbali Africa》1974（SOPW 27~28）／`aebeb18b`《At Pit Inn》1975（SOPN 113，Album/Live）／`e2b8bbd6`《Around the Time》1972（**DE WAM MLP 14 454，唯一一筆是德國盤**）。
日野皓正：`0a9b5163`《Swing Journal Jazz Workshop 1: Terumasa Hino Concert》1969（Album/Live，release 無廠牌）／`8ac416e9`《Alone Together》1970（無廠牌；⚠ 與池中《Alone, Alone and Alone》是兩張不同的碟）／`10636df5`《Peace And Love》1971-01（CANYON CAJ-1004）／`4e4bd0e9`《ラブ・ネイチャー》1971（CANYON J-1006／Love Records，轄下九筆 release）／`8d3e2fc7`《Speak to Loneliness》1975（EAST WIND EW-7008）／`b3fda7f7`《Hogiuta》1976（EAST WIND EW-8041）／`76bc1fce`《LA CHANSON D’ORPHÉE》1975（RCA RGP-1156，⚠ **1975 那筆 release 題《Mas Que Nada》、2006 CD 才題 ORPHÉE，盤名要先判**）／CBS/Sony 1979–85 五張（`3a00953a`《Horizon》、`648da3ab`《Double Rainbow》、`fbb07c85`《Pyramid》、`2d89c78e`《New York Times》、`2ccaa318`《Trans-Blue》）。
菊地雅章：`3b19f983`《Masabumi Kikuchi in Concert》1971（Philips FX-8515，⚠ 1971 那筆 status 空、只有 2015 CD 是 Official）。
佐藤允彦：`8e7757a5`《Deformation》2006（Bridge BRIDGE-044，三重奏實體）。
峰厚介：`182e7c8c`《Solid》（MB 記 2015-02-04 EAST WIND UCCJ-9161／Album+Live，**Apple jp「ソリッド」℗ 1976**——第 372 條同形，原盤年待核）。

### C. 合掛不收（第 258／321 條）
渡辺貞夫：`dd031e02`《Round Trip》1970（**四人平列**：Sadao Watanabe + Chick Corea + Miroslav Vitouš + Jack DeJohnette，CBS/Sony SONP 50320-J）、`8e14690a`《Kenya Ya Africa》1973（+ Inter-African Theatre Group）、`54892085`《Iberian Waltz》1967（Takt JAZZ-7，+ Charlie〈Mariano〉）、`77dfc00c`《Let's Swing Now》1976（四人）、`e6fa4573`《I'm Old Fashioned》1976（With The Great Jazz Trio）、`af023a5b`《Bird of Paradise》1979（同上）、`1a2d07ff`《Hunt Up Wind》1978（福村博 With）、`a6fb61cb`《Live in Japan》1980（Dave Grusin &）、`edccbdd5`《Minton Blues》（本田竹曠 & 渡辺貞夫カルテット，**無日期**）。
日野皓正：`78c2c5af`《Vibrations》1971（enja 2010，**四人平列**）、`6d7fc79a`《A Part》1971（+ Reggie Workman）、`6f6e0dc7`《Hartman Meets Hino》1973、`d62a9c4a`《Reminicent Suite》1973（Mal Waldron and）、`b8c042e3`《Joe Henderson and Kikuchi/Hino in Concert》1974。
菊地雅章：`4c41c943`《Poesy: The Man Who Keeps Washing His Hands》1971（Philips FX-8518，**CAA 200**，三人平列 菊地＋富樫雅彦＋Gary Peacock）、`aedc4cef`《Hollow Out》1977（Philips FS-6508，**CAA 200**，Elvin Jones +）、`bfd82909`《Masabumi Kikuchi + Gil Evans》1972、`18a5c6c1`《コンチェルト》1991、`63bb5e83`《Collaboration》1970（與 Sadao Watanabe Quintet 共掛）。
佐藤允彦：`d86aa6bd`《Metempsychosis》1971（ツトム・ヤマシタ &）、`ed5b55e2`《Pianology》1971（and Wolfgang Dauner）、`6e05fed3`《Bridge Over Troubled Water》1971-07-25（與 稲垣次郎）、`3914de7d`《三昧》1972（**EXPRESS ETJ-9003，CAA 200**，與 Gary Peacock）、`03ed1046`《デマ Rumour》1973、`c2ec1ec4`《ふたりのひとりごと》1973、`82fb84a8`《With Silence》1974（Karl Berger 四人）、`cae06b2f`《Astrorama》1970（與 Jean-Luc Ponty）、`69f572ef`《MSB》1980／`d4d82b7b`《MSB Two》1981（+ Medical Sugar Bank）、`b0c11ed5`《Liberissimo》1999、`1f4e6369`《Decisive Action》2004、`0651fb57`《Spontaneous》2007、`0a6e2395`《Proton Pump》2018。
峰厚介：`27679254`《Yellow Carcass in the Blue》1971（**TBM-8**，笠井紀美子 + Kosuke Mine Quartet；⚠ **笠井紀美子 是 c-134 b 組的掛名，那批若要收應由那邊處理**）。

### D. 歸別批不收
`02fd9983`《Yamataifu》1972（EXPRESS ETJ-65019，CAA 200）與 `7668525c`《天秤座の詩》1970（Columbia NCB-7001，CAA 200）——
**兩張的 credit 都是 `Toshiyuki Miyama and His New Herd + M. Sato`，是 宮間利之とニューハード 的碟，歸 c-133 a 組。**
`336d6cb7`《双晶》1973（**池中已有，掛 富樫雅彦**）。

### E. 原聲帶不收（固定規格）
佐藤允彦 `a842b6d5`《Belladonna》1975、`5c1ad16b`《夜叉》1985、`4434894c`／`1efc9660`《ファイナルファンタジー》1994、`69296888`／`85fb446b`《パンダコパンダ》2008；
菊地雅章 `f8230428`《Hairpin Circus》1972、`e41ec182`《ヘアピンサーカス》2006；
日野皓正 `de2270ad`《オリジナル・サウンドトラック 夏服のイヴ》1984。

### F. Compilation（本批一張都沒走 §5.6）
渡辺貞夫 `17d20587`《Echo》1979、`8a993ce4`《Nice Shot!》1980、`14f4c349`《THE BEST》1981-05-21、`237a5dcc`《Plays Ballads》1987、`7435cbe1`《Selected》1989、`c428c830`《Bossa Nova Concert》1989、`b851b140`《Twin Best》1998、`fd3f3f04`《渡辺貞夫》1999、`d1eb562b`《My Dear Life: 50th Anniversary Collection》2001。
**本組沒有任何一張需要 §5.6 的兩個 HTTPS 舉證**（第 257 條的逐頁讀本批用不上）。

## 377（本批立，a 組）⚠ **§1 候選清單（MB 完全查無 RG，唱片實體確鑿）——這份清單本身就是交付物**

照簡報第二節第 3 點：**不自己造 rgMbid**，列進來給本機走 §1 人工身分。

| 掛名 | 盤名（日／英兩式） | 年 | 廠牌／catno | 佐證 | 查過哪些關鍵字 |
|---|---|---:|---|---|---|
| **渡辺貞夫** | 《渡辺貞夫》／`SADAO WATANABE` | **1961** | **King Records**（catno 待核） | Apple jp `1770441305`，**8 軌、1961-12-20、℗ 1961 King Record Co.,Ltd** | `release-group?artist=378278bf…` 全 88 個 RG 分頁拉完（最早只到 1966-04-05）；`artist:"渡辺貞夫"`／`artist:"Sadao Watanabe"`／裸關鍵字；`jp-king.json` 列舉檔全掃 |
| **渡辺貞夫** | 《ウィ・ガット・ア・ニュー・バッグ》／`We Got a New Bag` | **1968** | 日本コロムビア（Takt 線，catno 待核） | Apple jp／us `1868591653`，**5 軌、℗ 1968 Nippon Columbia／NIPPONOPHONE** | 同上；另查 `jp-columbia.json` 全 201 筆 |
| **日野皓正** | 《タロー・ムード》／`Taro's Mood` | **1973** | enja／ALFI Records（德國錄音，catno 待核） | Apple jp `1466923857`（7 軌、1973-06-29、℗ SOLID/ENJA）與 us `1363852054`《The Enja Heritage Collection: Taro's Mood》（7 軌、℗ 1973 ALFI Records） | `release-group?artist=60d3fa1e` 全 46 個 RG、`65c54d15` 全 8 個、`59158072` 全 2 個；`artist:"日野皓正"`／`artist:"Terumasa Hino"`／裸關鍵字；`jp-victor.json`／`jp-columbia.json`／`jp-east-wind.json` 全掃 |

**另外三筆是「MB 有 RG、但原盤 release 沒建」**，不是 §1，但本機同樣要補：
佐藤允彦トリオ《Palladium》**1969 東芝 Express 原盤**（RG `c1be243a` 轄下只有 2005 CD）、
佐藤允彦トリオ《Transformation '69/'71》**1971 東芝 Express 原盤**（RG `8295c5bc` 轄下只有 1991 CD）、
佐藤允彦《Holography》**1970 原盤**（RG `482d1c70` 轄下只有 2006 CD，**且廠牌兩說未決**）。

**⚠ 還有一筆是年份打架、不是查無**：渡辺貞夫《Goin' Home》——
MB `b58d602c-0111-4aaf-a517-4325c25080d8` 記 **1977**（日本コロムビア），
Apple jp `1868590678` 記 **1966-06-10、℗ 1966 Nippon Columbia**、10 軌。
**差十一年，兩邊都說是 日本コロムビア**，本批未收，留本機／研究層裁。
同形的還有池中既有的 `日野皓正《Alone, Alone and Alone》`：MB `98c8b312` 記 **1970**，
Apple jp `1894176117` 記 **1967-12-01、℗ 1967 Nippon Columbia**、5 軌（MB 亦 5 軌）——**池中那張卡的年份可能要改。**

## 378（本批立，a 組）**封面與試聽的觀察（只寫觀察不下結論——第 254 條）**

- **CAA**：本組逐張探測 release-group 端點，候選 **57 個 RG**，**5xx 為 0**，404 都是真的沒圖（共 8 個）；**入選 23 張全部 200**。
  404 集中在兩處：**(1) 2009 年 Universal SHM-CD 那批復刻殼**（菊地雅章 四張全 404）、**(2) Denon／JVC 的 1972–78 年黑膠**（Pavane Lachrymae、Wonderful Moog Sound、But Not For Me）。
  ⚠ **1960 年代的 Takt／Columbia 原盤反而多半有圖**，只有《Jazz & Bossa》（JAZZ-1）與《Sadao Watanabe Plays》例外——這與 c-131 第 359 條的規律（老原盤有圖、後來的 CD 沒圖）同向。
- **Apple**（jp 為主、us 對照，`search` 與藝人目錄兩種查法都跑）：**23 張裡 15 張命中且軌數與 MB 一致**，明細在各卡 `risk`。
  **未命中的 8 張**：渡辺貞夫《Pastoral》《Paysages》《Open Road》、日野皓正《Journey Into My Mind》《Into Eternity》、菊地雅章《Wishes/Kochi》、佐藤允彦《All-in All-out》、（另 峰厚介 三張全中）。
  ⚠ **前五張全部是 CBS/Sony 1969–74 的日本爵士**——**同一家大廠的同一段目錄在 Apple 上整批缺席**，
  而同一位藝人的 日本コロムビア 1966–69 那批 2025 年整批上架了（collectionId `18685xxxxx` 連號）。
  這是 c-116 第 6 條、c-121 第 5.2 節、c-131 第 359 條那條規律的第四次應驗，**但這次缺的是 Sony 不是 DAN／Discomate 那種小廠**——
  **「小廠才會缺」這個推論不成立，缺的是『哪一批母帶被數位化』而不是『廠牌大小』。**
- **兩張是靠第二種查法（藝人目錄）才找到的**：佐藤允彦《Holography》`1716850549`、《Transformation '69/'71》`720401905`——
  **`search` 兩個店面都 0 筆**。第 254 條「search 與目錄漏的不是同一批」在本組實測到兩次。
- **掛名在店面的寫法**：Apple jp 把 峰厚介 印成 **「峰 厚介」（姓名間有半形空格）**、把 日野皓正 的五重奏盤掛在個人名下、
  把 佐藤允彦 的三重奏實體印成 **「佐藤允彦トリオ」**（第 370 條就是靠這一點）。**下游比對要摺空白。**

---

## 第 392 條（主線 2026-09-15，a 組交件後）：**`dedup-crossbatch.mjs` 加一道 rgMbid 掃描——只報不擋**

a 組第 371 條查到：池中 `菊地雅章《End for the Beginning》` 與
`Masabumi Kikuchi Quintet《End For The Beginning》` 是**同一張 1973 Philips FX-8527、同一個 release-group**，
但折疊鍵是掛名＋盤名，**兩筆各自成立、`chk-prop` 永遠不會亮燈**。
（**菊地雅章池中實際只有 2 張不同的碟，不是 3 張**；本批名額照 4 張不動，反正落在 5–10 區間內。）

**工具改動**：`dedup-crossbatch.mjs` 在鍵比對之後多掃一次 `rgMbid`
（卡單取 `rgMbid`，prop 取 `mbNote` 裡第一個 UUID），同一個 RG 出現兩次就印出來。
**只報不擋**——「重複建檔的 RG」與「同碟兩卡」在資料上長得一樣，要人看過才算數。
**現況：全部 95 批 3,951 張卡掃出 0 筆**，所以那張重複是**線上池裡的既有卡**，不在批次裡，**留本機處理**。
⚠ **seed_cards.json 的列沒有 MBID 欄**（只有掛名、盤名、三軸、曲風、年），**所以線上池這種重複雲端掃不出來**，
只能由本機端在 Firestore／manifest 那一層查。

## 第 393 條（同日）：**兩張年份打架留本機**

1. 渡辺貞夫《Goin' Home》MB 1977 vs 店面 ℗1966——**本批沒收這張**，記著。
2. **池中既有卡 `日野皓正《Alone, Alone and Alone》` MB 1970 vs 店面 ℗1967（軌數一致）**——
   與第 364 條三種失真同形，**那張卡的年份可能要改，留本機覆核**。
