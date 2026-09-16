# c-139 交接（2026-09-16）：Blue Note／United Artists 1962–64，36 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

Blue Note 目錄補齊線的第五批（`lineType: 深掘`），**BLP 4100 系列**——
Blue Note 從硬咆勃轉進 **soul jazz／管風琴爵士**的那幾年，也是 United Artists Jazz 併進來的一段。

**36 張、26 位掛名、零 §1 人工身分、36/36 釘住 release-group MBID、全部 Album。**

| 組 | 內容 | 張 |
|---|---|---:|
| a | 1962–64：Freddie Roach、Donald Byrd、Stanley Turrentine、Art Blakey、The Three Sounds、Sheila Jordan、Dodo Greene、Ken McIntyre、Vi Redd、Kenny Dorham & Jackie McLean、Charles Mingus、Billie Holiday、Grant Green…… | 17 |
| b | 1963–64（含一張 1986 vault 盤）：Lou Donaldson、Grant Green、Jimmy Smith、Stanley Turrentine、John Patton、Freddie Roach…… | 19 |

**原 slice 45 張，退 9**（理由逐筆在 `rulings.md`，含第 313 條邊界退的 Riverside 盤）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **36/36，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **36/36 全 full**，out-1 217–238／out-2 220–240 |
| 封面 | **33/36**（缺 3，替代來源見第六節） |
| 固定試聽／無來源狀態 | **36/36，無來源 0 張** |
| §5.5／§5.6 例外欄位 | **不適用**——36 張全是純 Album |
| published gate | 本機端 |

**驗證**：`qa-batch out c139` 36 張與卡單相符；`qa-batch hooks c139`＋`chk-hook-crossgroup c139` 全過
（hook 加權 19–37、note 294–350）；`fix-spacing --field desc` 兩檔待補 0；research 兩組全 full。
⚠ `qa-batch out` 剩一個**誤報**：《Rockin' the Boat》的「Cash Box 的百大專輯榜第 99 名」——
**具名出處就緊貼在數字前面**，是該檢查刻意不做豁免的那一型，**人工複核後放行**。

## 三、⚠ 年份：這批改了 7 張，而且立下「Discogs 原壓群會整群錯」這條

| 碟 | 原 | 改 | 依據 |
|---|---:|---:|---|
| Lou Donaldson《Good Gracious!》 | 1963 | **1964** | Cash Box 1964-07-18 評論 |
| Grant Green《Am I Blue》 | 1963 | **1964** | Cash Box 1964-08-08 |
| John Patton《Good Move!》 | 1963 | **1964** | Cash Box 1964-07-11，內文自稱「third LP on Blue Note」 |
| Freddie Roach《Soul Stream》 | 1963 | **1964** | Cash Box 1964-06-27，自稱「his second Blue Note offering」 |
| John Patton《Blue John》 | 1963 | **1986** | 91 期 Cash Box 對「Blue John／4143」零命中，**反證當年未上市** |
| Ken McIntyre《Year of the Iron Sheep》 | 1962 | **1963** | Billboard 1963-02-09 p29 一口氣評五張 UA Jazz；1963-01-04 的 UA '63 Jamboree |
| Vi Redd《Bird Call》 | 1962 | **1963** | 同上，同一批貨 |

⚠ **第 550／553 條（這批最重要的方法學）**：**Discogs 原壓群會整群繼承同一個錯誤的回填年**
——《Soul Stream》的 1963 是錄音年回填；**整個 UAJ 14000 段的 Discogs 年份兩個方向都錯**
（14001《Coltrane Time》明明 1962-07 首發，Discogs 卻標 1963），**多半是抄封套 ℗© 年**。
**第 531 條（同一目錄號的原壓群全標同一年）不是萬能的，同期紙本永遠壓過它。**

## 四、⚠ 研究層擋下的資料庫錯誤五處（第 554 條）

《Black Orchid》MB 原盤**目錄號 4165／年份 1962 兩欄都錯**（應 **BLP 4155／1964**）；
《Out of This World》MB 記 1962（**應 1966**）；《Portrait of Sheila》MB 與 jazzdisco 都記 1962（**應 1963**）；
《My Hour of Need》MB 原盤黑膠登成 16 軌（**原盤 10 軌**）；
Cat Walk／That's Where It's At／Iron Sheep 的 **MB 只收立體聲、沒收 mono 原盤**。
**第 509c 條（紙本誤植目錄號）本批中三次**——正文一律用卡單的號。

另 **第 556 條**：卡單的「七軌全自作」不成立，《'Way, 'Way Out》首軌〈Miss Ann〉是 **Eric Dolphy** 的曲。

## 五、⚠ 這批立的一條程序關卡（第 556 條）——後批已沿用

**鉤子層的每一筆 `note` 都帶「發行年寫 XXXX 年」，交件前逐筆與卡單 `year` 比對。**
它把第 475 條那種「裁定改了、卡單沒改」的漏接擋在鉤子層，**c-140／c-141 都照做了。**

## 六、缺的

- **封面缺 3 張**，替代來源已查好（本機上傳時用）：
  《Black Orchid》→ 串流 `1379055147` 有完整封面；
  《It Just Got to Be》→ Discogs release 2885076 或 Apple `1362892401`；
  《Two Souls in One》→ Discogs release 1061137 或 Apple `1438777060`。
- 試聽 **36/36，無來源 0 張**。
- ⚠ **《Ladylove》的試聽是 16 軌合訂盤**（原盤十軌＝第 1–8 與 10–11 軌），`previewUrl` 取第 2 軌〈Blue Moon〉
  ——**第 1 軌是 Leonard Feather 的報幕**。
- ⚠ **Art Blakey《Meet You at the Jazz Corner of the World, Volume 2》的試聽取自 2002 年兩張一套的合併盤**
  （本盤起始軌＝第 2 片第 2 軌）——**那不是同一張碟。**
- ⚠ **《After Hours》（PJ-59）是本批佐證最弱的一張**，只夾出「1962 年 11 月之後」，正文不寫月份。
- **池中既有卡待修**（雲端不能改 `seed_cards.json`）：`Jimmy Smith — Back at the Chicken Shack` 年份 **1960 應為 1963**
  （第 549 條已列，b 組以 Cash Box 1963-03-09／04-13 廣告再證）。

## 七、下一批

- **c-135～c-139 已走完雲端段**（共 198 張）；c-140 寫作層在跑、c-141 鉤子層在跑、c-142 策展在跑。
- 紙本涵蓋表在 `batch-progress/enum/SOURCES-billboard-cashbox.md`——**Cash Box 已覆蓋 1960-11→1969 年底無缺口**，
  **1970 年起還沒有人掃**。**開工看表不看檔名**（第 533 條）。
- **第 312 條**：資料庫標 Compilation 的正典要另開 §5.6 子批撈回。
