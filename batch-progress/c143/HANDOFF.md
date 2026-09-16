# c-143 交接（2026-09-16）：Blue Note BN-LA 期 1970–74，42 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

Blue Note 目錄補齊線的第九批。**Francis Wolff 1971 年過世、George Butler 接手 A&R**，
Blue Note 走 **fusion／funk／crossover**（Mizell 兄弟製作的 Donald Byrd 路線），目錄號從 BST 84xxx 轉進 **BN-LA**。

**42 張、22 位掛名、零 §1 人工身分、42/42 釘住 release-group MBID、全部 Album。**

| 組 | 內容 | 張 |
|---|---|---:|
| a | 1970–73：Elvin Jones（3）、Lou Donaldson、Bobbi Humphrey、Moacir Santos、Buddy Rich、Bobby Hutcherson、Lee Morgan、Reuben Wilson…… | 21 |
| b | 1972–74：Horace Silver、Gene Harris、Duke Pearson、Marlena Shaw、Alphonze Mouzon、Candido、Donald Byrd…… | 21 |

**原 slice 45 張，退 3**（Jimmy McGriff《Soul Sugar》與 Cannonball Adderley《Soul Of The Bible》依第 313 條退、
Lee Morgan《Lee Morgan》是與《The Last Session》同碟的重複 RG）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **42/42，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **42/42 全 full**，out-1 231–240／out-2 225–240 |
| 封面 | **40/42**（缺 2，替代來源已查好） |
| 固定試聽／無來源狀態 | **40/42 有來源，2 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | **不適用**——42 張全是純 Album |
| published gate | 本機端 |

**驗證**：`qa-batch out c143` 42 張與卡單相符、全部通過；hooks 兩支 QA 全過（hook 加權 19–31.5、note 297–350）；
`fix-spacing` 待補 0；research 兩組全 full。**鉤子層發行年逐筆比對 42/42 相符。**

## 三、⚠ 年份：這批只改 4 張——**1968–70 那種系統性偏移在這一段消失了**

| 碟 | 原 | 改 | 依據 |
|---|---:|---:|---|
| Lou Donaldson《Pretty Things》 | 1970 | **1971** | Billboard 爵士榜 1971-04-24 第 1 週、連八週、最高 #11 |
| Moacir Santos《Maestro》 | 1972 | **1973** | Billboard 1973-02-17 評介；1972 年 104 期紙本查無 |
| Elvin Jones《Live at the Lighthouse》 | 1972 | **1973** | **Billboard 1973-01-20 p48 爵士評介欄逐字印「Blue Note BN LA015-G2」** |
| Bobby Hutcherson《Live at Montreux》 | 1973 | **1974** | MB 把**演出日** 1973-07-05 填成 first-release-date |

另 **Bobbi Humphrey《Flute-In》維持 1972**，**推翻了 jazzdisco＋Discogs 原壓＋Apple 三邊的 1971**
（**Apple 的 1971-08-06 早於錄音日**），並補成完整時間線
（1971-07-31 簽約 → 10-16 在 Van Gelder 收尾 → 1972-01-22 仍寫「即將推出」→ **1972-03-27 隨 Blue Note Month 上市**）。

⚠ **這批立的判準**：
- **第 663 條**：**BN-LA 號序完全不代表發行序**（LA014＝1974、LA024＝1973-06、LA037＝1973-02），
  **盤面印的年常是 ℗© 版權年**——**不得用目錄號回推年份**，第 593 條的夾擠推定在這一段用不上。
- **第 704 條**：**`enum/` 的命中頁檔是「有就省事」，不是「沒有就等於紙本沒有」**
  ——《Live at the Lighthouse》從「同型推定」升級為直接證據，就是研究層直接抓原始 PDF 才看到那一頁。
- **第 710 條**：**這一段要先查 Billboard 的 Soul LP's 再查 Jazz LP's**（《Sweet Lou》的 Soul 榜比 Jazz 榜早七週）。
- **第 708 條**：**Discogs 的年份欄會與它自己的 notes 打架**（Gene Harris BST 84423 的 1971，
  同一批條目的 notes 卻寫「Recorded 1972」「℗ 1972」）。

**四份廠牌檔期文件一次釘死 9 張的上市月**（Cash Box 1973-03-10／1973-07-21／1974-10-05 整版「NEW BLUE — For September」、
Billboard 1972-04 Blue Note Month），**第五份**（Billboard 1974-04-20 封面頁「April is Blue Note month」）
把《Funky Snakefoot》釘到 1974 年 4 月。

## 四、⚠ 研究層訂正的（正文已照新的寫）

- **《Live at the Lighthouse》的目錄號是 BN-LA015-G2**（雙唱片後綴），MB 原盤只登一片。
- **《Keep the Customer Satisfied》爵士榜實為連八週、最高第 9 名**（策展層記三週 #16）；
  錄音地點日期（1970-03-30～04-01, Tropicana, Las Vegas）**只有維基一個來源，正文寫得保守**。
- **《Head On》CD 多的三軌是〈Togo Land〉〈Jonathan〉〈Hey Harold〉**，不是把〈At The Source〉拆開。
- **《Live at Montreux》原 LP 是三首演出、四條 band**（〈The Moontrane〉切成兩面續奏）；**盤面印的就是「Anton's Bail」**。
- **《Yesterday, Today & Tomorrow》貝斯手是 John Hatton**；**盤面封面掛個人名、盤標掛「Gene Harris / The Three Sounds」**
  ——第 697 條掛名斷點的實物證據。
- **《Dig This!》**：〈Lonely Town, Lonely Street〉作者是 **Bill Withers**、〈Nubian Lady〉是 **Kenny Barron**。
- ⚠ **《All》的維基 infobox 寫 Francis Wolff 製作是錯的**——**兩場都錄於 1972 年，Wolff 1971 年已過世**，
  原壓只掛 George Butler。**這是用生卒年就能否證的掛名錯誤。**
- **《Mr. Jones》盤面並列 Francis Wolff 與 George Butler 兩位製作人**——Wolff→Butler 換手最乾淨的物證。

## 五、⚠ 美術掛名對應三個時期（正文已分開寫）

**Mike Salisbury 美術總監＋Lloyd Ziff 設計**是 BN-LA 段；**Norman Seeff** 是 1972 年 BST 84xx 段；
**Bob Cato**（UA 創意副總）是 1970 年錄的兩張庫存盤。

## 六、缺的

- **封面缺 2 張**：Elvin Jones《Live at the Lighthouse》（**首選 Discogs release 294222**，1972 US 原壓 BN-LA015-G；
  備選 16230827／10946809／15413552／日版 8945245）、
  Duke Pearson《It Could Only Happen With You》（**Discogs 31884442（6 圖）** → 22799219 → 1980 日版 GXF-3149）。
- **試聽 40/42，2 張走固定無來源狀態**：The Three Sounds《The 3 Sounds》、Gene Harris《Gene Harris of the Three Sounds》
  ——**兩張都跑滿三種查法、明寫查無**；⚠ **探測層給的候選兩張都是錯的碟**（第 528／707／709 條）。
- ⚠ **《All》的試聽是 2004 年兩片合輯**（`781564752`），**本盤第一軌是第 2 片第 5 軌**。

## 七、下一批

- **c-135～c-143 ＋ c-147 已走完雲端段（共 361 張）**；c-144（1974–79，43 張）探測完、研究待派；
  c-145（1979–81）策展 a 在跑。
- 紙本涵蓋表在 `batch-progress/enum/SOURCES-billboard-cashbox.md`——**兩刊已覆蓋到 1979 年底**。
  **開工看表不看檔名**（第 533 條）。
