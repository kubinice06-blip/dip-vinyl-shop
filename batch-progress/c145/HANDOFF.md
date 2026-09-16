# c-145 交接（2026-09-16）：Blue Note LT 系列庫存盤 1979–81，44 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。
**這是 Blue Note 目錄補齊線（1939–84 ＋ §5.6）的最後一批。**

## 一、這批是什麼

**Blue Note 1979 年起的「Back to Blue Note」LT 系列**：Alfred Lion 時代錄了沒發、**二十年後才首度問世的庫存盤**，
外加日本 GXF／BNJ 首發。廠牌本身已進入休眠期。

**44 張、23 位掛名、零 §1 人工身分、44/44 釘住 release-group MBID、全部 Album。**
**原 slice 45 張，退 1**（Art Pepper《Omega Alpha》LT-1064，七軌全部先前已在 Omega《The Art of Pepper》上）。

**共同寫法**：**原始場次掛 Alfred Lion（或 Wolff／Pearson），「為發行而製作」掛 Michael Cuscuna（20/21 張）**
——兩層分開講。⚠ **唯一例外是《Live at Donte's》**（Pacific Jazz 舊母帶，製作／錄音／重混三職全是 Richard Bock，
整理發行是 Pete Welding，**錄音師不是 Van Gelder**）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **44/44，全部 pinned，零 §1 人工** |
| 固定簡介（desc） | **44/44 全 full**，out-1 230–240／out-2 227–239 |
| 封面 | **39/44**（缺 5，替代圖全部查好） |
| 固定試聽／無來源狀態 | **38/44 有來源，8 張走固定無來源狀態** |
| published gate | 本機端 |

**驗證**：`qa-batch out c145` 44 張與卡單相符、全部通過；hooks 兩支 QA 全過（hook 加權 17–39、note 321–350）；
`fix-spacing` 待補 0；research 兩組全 full。**鉤子層發行年逐筆比對 44/44 相符。**

## 三、⚠ 這批最重要的兩條（都推翻了先前的假設）

**1. 第 860 條：「庫存盤＝全部首度公開」不成立。**
本批四例的部分軌先前已以 **45 轉單曲**發過：《K.B. Blues》45-1674、《With a Song in My Heart》45-1840、
《Freedom》45-1884、**《On the Sunny Side》的〈Since I Fell for You〉是 45-1769 的 B 面**
（而該單曲 A 面〈Motorin' Along〉就在池中《Home Cookin'》上）。**正文一律不寫「全部首度公開」。**

**2. 第 859 條：撞陳列要看到 CD 那一層。**
jazzdisco 的去向欄**同時列了 1987 年 CD 的目錄號**，**只看原盤 LP 會低估重疊**：

| 卡 | 策展層 | 研究層（看到 CD 層後） |
|---|---|---|
| 《Street Singer》 | 6 軌中 4 軌 | **6/6**（六個 take 全部帶《Jackie's Bag》1987 CD 的號） |
| 《Confirmation》 | 逐軌零重複 | **3/3**（LP 層零重複成立，但三軌全在池中兩張 seed 卡的 CD 上） |
| 《Spiral》 | 兩處 | **3/6** |
| 《Landslide》 | 1/7 | 1/7 成立，另補〈Landslide〉也在《Dexter Calling…》的 CD 上 |

**這四張的正文都已寫明哪些軌不是本張獨有。**

## 四、⚠ 撞陳列的其餘七組：全部零重複（是好料不是風險）

《Swingin'》↔ 池中四張、《On the Sunny Side》↔ 池中五張（**那晚 tk.2/3/4/5/6/11 被四張碟分走，本盤只拿 tk.6**）、
**《Gooden's Corner》↔ seed《Blue & Sentimental》**（1961-12-23 同一場七個 take，本盤取六個、第七個是加 Ike Quebec 的五重奏）、
《Congo Lament》↔ 未收的《Easy Living》（**共用三軌**）、《Africaine》↔《The Big Beat》（同曲兩次錄音）、
《Medina》↔《Spiral》（撞的是 1998 年合體 CD）。**全部用母帶／take 號比對，正文寫成「同一場的不同 take」。**

⚠ **《Vertigo》的〈Formidable〉是本批唯一真重複，而且方向反了**：黑膠層與《New Soil》take 互補零重複，
**但 Apple 上《New Soil》的串流版第 6 軌就是它**。
⚠ **而且店面條目 `724221951` 的第 6–11 軌整批是 1962-06-14 的 BLP 4116**
（即 c-144 兩張卡的全部內容）——**正文只講黑膠原盤那六軌。**

## 五、⚠ 年份

**改判 3 張**：《In Memory Of》LT-1037 1979→**1980**（廠牌檔期廣告推翻 MB／jazzdisco／維基／Apple 四個 1979）、
《Remembering》1981→**1980**、《Gooden's Corner》1981→**1979**（GXF 首發，GXK 是換號再發；**維基在 Gooden's 上錯記 1980**）。

**兩張維持 1980 但相反證據較強**：《Vertigo》《Medina》
——Cash Box 1980-12-27 的第一季表二月格**後來被 Billboard 1981-02-21 獨立證實**，
且 **LT-1085／1086 在 206 期裡完全查無、同期其他九個 LT 號每一個都至少出現過一次**。
**維持 1980 的理由是第 612 條階序（季度預告表不在階序內）＋℗ 1980＋四個資料庫，可逆。正文只寫年份不寫月份。**

⚠ **MB 新錯誤型**：《Remembering》的 release date 寫 **1981-08-29**，**月日等於錄音日 1961-08-29**
——**年被改過、月日沒改**，比整個欄位填錯更難發現。
⚠ **第 817 條**：**MB 會建出不存在的版本**（《Poppin'》的「1980 US BLP 1620」，兩路獨立複驗都是 0 筆）。

## 六、缺的

**封面缺 5 張，替代圖全部查好**：Confirmation → Discogs **3808231**（⚠ **不要用 13146418 那筆 Misprint 錯體**）、
Lonely Town → **4293365**、With a Song in My Heart → **2746049**、Congo Lament → **3357862**、The Creeper → **1211006**。

**試聽 38/44，8 張走固定無來源狀態**（都跑滿三種查法、明寫查無）：
Freedom／Take Aim／Spiral／Swingin'／Inner Glow／Congo Lament／On the Sunny Side／Live at Donte's。
⚠ **《Remembering》的串流條目在 Apple 上題名為《Standards》**（Discogs 1998 CD notes 證實 #2-7 即日本 GXF 六軌）。
⚠ **《Medina》與《Spiral》只能有一張用 `716626996`**——已判給《Medina》（第 862 條）。

## 七、Blue Note 這條線到此結束

**c-135～c-147 共 455 張走完雲端段**（封面 413／90.8%、試聽 422／92.7%）。
- **1939–66**：c-135～c-140，228 張
- **1967–84**：c-141～c-146，211 張
- **§5.6 合輯正典**：c-147，13 張
- ⚠ **1985 後的爵士段 873 張還沒切批**——**後批請由 BT 85101 接下去，別留缺口。**
- 紙本涵蓋表在 `batch-progress/enum/SOURCES-billboard-cashbox.md`：
  **Billboard 與 Cash Box 已覆蓋 1955→1985 中無缺口**，是這條線留給後續批次最大的共用資產。
