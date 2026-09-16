# c-146 交接（2026-09-16）：Blue Note 1981–84（休眠期尾巴），4 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

**Blue Note 1967–84 這一整段的最後一批**，原 slice 只有 8 張。
1981 年後 Blue Note 幾乎停止新錄音，**產出是 LT 系列尾段、日本 GXF／BNJ 首發，以及 1985 年 2 月重啟的第一波**。

**收 4 退 4、4 位掛名、零 §1 人工身分、4/4 釘住 release-group MBID。**

| 年 | 藝人 | 盤名 | 原廠 |
|---:|---|---|---|
| 1960 | Les McCann Ltd. | Les McCann Ltd. Plays The Shout | **Pacific Jazz PJ-7** |
| 1962 | Jimmy Smith | Plays Fats Waller | Blue Note BLP 4100 |
| 1984 | Michel Petrucciani | 100 Hearts | George Wein Collection GW-3001 |
| 1985 | Charles Lloyd | A Night in Copenhagen | **BT 85104**（重啟第一波） |

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **4/4，全部 pinned，零 §1 人工** |
| 固定簡介（desc） | **4/4 全 full**，229–238 字 |
| 封面 | **4/4**（⚠ 四張的 CAA 來源都不是原壓，建議改取 Discogs） |
| 固定試聽／無來源狀態 | **4/4，無來源 0 張** |
| published gate | 本機端 |

**驗證**：`qa-batch out c146` 4 張與卡單相符、全部通過；`qa-batch hooks`＋`chk-hook-crossgroup` 全過
（hook 加權 26–33、note 333–349）；`fix-spacing` 待補 0；research 全 full。**發行年逐筆比對 4/4 相符。**

## 三、⚠ 退掉的 4 張：全部是「舊料重編」

| 碟 | 退的理由 |
|---|---|
| Joe Pass《The Complete "Catch Me" Sessions》(LT-1053) | 10/11 軌先前已在 PJ-73 |
| Albert Ammons / Pete Johnson《Boogie Woogie Classics》(BLP 1209) | **12/12 軌＝1953 年 BLP 7017＋7019** |
| Sonny Rollins《Village Vanguard Volume 2》(K18P-9277) | 4/4 軌全在 1975 年 BN-LA475-H2《More From the Vanguard》上 |
| Sonny Rollins《Village Vanguard Volume 3》(K18P-9278) | 6/6 軌同上 |

⚠ **《More From the Vanguard》(BN-LA475-H2, 1975) MB 根本沒有 RG**——**列舉檔永遠不會提供它，要收只能走 §1 人工。**

## 四、⚠ 年份改判 3 張，其中兩張是「MB 只建了二十年後的授權再發、原盤沒建」

| 碟 | 原 | 改 | 依據 |
|---|---:|---:|---|
| Jimmy Smith《Plays Fats Waller》 | 1982 | **1962** | **8 則紙本**，含 Billboard 1962-08-11 p30 SPOTLIGHT 評介＋兩刊 08-25 整版廣告 |
| Les McCann《Plays The Shout》 | 1981 | **1960** | Billboard 1960-09-05 p26 四星評介＋09-19 p20 Pacific Jazz 整版經銷商廣告 |
| Charles Lloyd《A Night in Copenhagen》 | 1984 | **1985** | Billboard 1985-02-16「first new Blue Note release」＋02-23 重啟廣告 |

**《100 Hearts》維持 1984**，但**榜位訂正**：Billboard 爵士榜**第 1 週是 1984-07-28 不是 06-02**
（06-02 那個命中只是一則 NPR 廣播預告），在榜至少 9 週、最好名次 1984-09-01 的 **#29**。
**——「命中」不等於「榜位」，命中頁裡的廣播預告與榜表長得一樣。**

## 五、⚠ 撞陳列：本批全部只撞曲名，不撞母帶

- 《Plays Fats Waller》↔ seed《Crazy! Baby》：同三重奏（Smith／Warren／Bailey）、同一間 Van Gelder，
  **相隔兩年零十九天、七對七零重複**（逐 take 核過）。另與 seed《Fats Waller》有子字串盲區關係，**兩卡可互指**。
- ⚠ **《A Night in Copenhagen》↔《Dream Weaver》策展層寫錯**：**兩張零曲名重疊**
  （〈Sweet Georgia Bright〉出自 Lloyd 首作《Discovery!》，不在《Dream Weaver》上）。
  **真正的同曲關係在《Of Course, of Course》(Columbia, 1965)**——**兩者池中皆無，日後收要互指**。
- 《Plays The Shout》與《100 Hearts》：**只撞曲名**（〈Night in Tunisia〉〈C Jam Blues〉〈All the Things You Are〉……）。

## 六、缺的

- **無**。封面 4/4、試聽 4/4。
- ⚠ **四張的 CAA 來源都不是原壓**，本機上傳時建議改取 Discogs **12723685／12921521、2454632、2665609、4267514**。
- ⚠ 兩張的試聽是後來的數位／CD 形：Les McCann `1443154053`（9 軌，原盤 8 軌全在內）、
  Charles Lloyd `1454405968`（7 軌，**前 5 軌＝原盤**）。

## 七、⚠ 三處紙本誤植與一處 MB 錯（第 509c／817 條）

Billboard 1962-08-11 把 Smith 的編制寫成「bass and drums」（**實際無貝斯手**）；
Cash Box 1984-04-28 把《100 Hearts》製作人印成 George Wein（**應為 Gabreal Franklin**）；
Billboard **連四期**印「PETRUCCIANNI」；**MB 的 `BL 85104` 應為 `BT 85104`**（Discogs `catno=` 反查 0 筆）。

## 八、下一批

- **Blue Note 1967–84 這一整段到此結束。** c-144（1974–79，43 張）與 c-145（1979–81，44 張）寫作層／研究層在跑。
- ⚠ **後批請由 BT 85101 接下去，別留缺口**——**Blue Note 1985-02 才重啟**，本批最後一張已是 BT 85104。
  **1985 後的爵士段 873 張還沒切批。**
- 紙本涵蓋表在 `batch-progress/enum/SOURCES-billboard-cashbox.md`——**兩刊已覆蓋 1955→1985 中無缺口**。
