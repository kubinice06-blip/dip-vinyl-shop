# c-136 交接（2026-09-16）：Blue Note BLP 1500 系列（1955–1959），43 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

店主 2026-09-15：「**美國先挖 blue note**」「**Blue 太少了 這麼多你才選 198 張？**」
——資料庫上 Blue Note 純專輯 1,812 張，池中 290，**缺 1,506 張，全部要跑**。
**這是 Blue Note 目錄補齊線的第二批**（`lineType: 深掘`），1955–1959 的 BLP 1500 系列中後段。

**43 張、24 位掛名、零 §1 人工身分、零跨批撞卡、43/43 釘住 release-group MBID、全部 Album。**

| 組 | 內容 | 張 |
|---|---|---:|
| a | BLP 1500 系列中段（J.J. Johnson、Kenny Drew、Jutta Hipp、Gil Mellé、Thad Jones、Hank Mobley、Kenny Burrell、Donald Byrd、Chet Baker、Paul Chambers、Horace Silver、Art Blakey、Jimmy Smith、Fats Navarro……） | 23 |
| b | BLP 1500 系列中後段（Lee Morgan 4、Jimmy Smith 5、Art Blakey、Horace Silver、Hank Mobley 3、Lou Donaldson 2、Clifford Jordan 2……） | 20 |

**原 slice 45 張，退 2**：《Birks' Works》（列舉假陽性，原盤 Verve、資料庫掛錯 RG）、
《Hank Mobley Quintet》（同碟重複 RG，釘另一個）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **43/43，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **43/43 全 full**，out-1 187–238／out-2 198–235 |
| 封面 | **43/43**（4 張圖來源是再發 CD／數位圖不是原盤，正文已略過封面段） |
| 固定試聽／無來源狀態 | **43/43**（探測 23 ＋ 研究層第三種查法 **20**） |
| §5.5／§5.6 例外欄位 | **不適用**——43 張全是純 Album |
| published gate | 本機端 |

**驗證**：`qa-batch out c136` 43 張與卡單相符、全部通過；`chk-hook-crossgroup c136` 全過
（hook 加權 25.5–41.5、note 304–350）；`fix-spacing --field desc` 兩檔待補 0；`chk-prop` 標記 0。
主線複驗：43 張 `desc` 開頭與 `hook` 逐字相符、四位中文數字年 0、**資料庫／商店名／紙本刊名 0**、跨組開頭四字零重複。

## 三、⚠ 年份：這批改了 11 張，全部以同期紙本定案

**策展層改 9 張**（第 471／484 條）、**研究層再改 2 張**（第 489a 條）：

| 盤 | 原 | 改 |
|---|---:|---:|
| J.J. Johnson《The Eminent Jay Jay Johnson, Volume 2》 | 1955 | 1956 |
| Kenny Drew《Talkin' & Walkin'》 | 1955 | 1956 |
| Jimmy Smith《At Club "Baby Grand"》Vol.1／2 | 1956 | **1957** |
| Hank Mobley BLP 1540 | 1956 | 1957 |
| Kenny Burrell BLP 1543 | 1956 | 1957 |
| Thad Jones《The Magnificent Thad Jones, Volume 3》 | 1956 | 1957 |
| Donald Byrd《Byrd Blows on Beacon Hill》 | 1956 | 1957 |
| Lee Morgan《City Lights》 | 1957 | 1958 |
| **Jimmy Smith《The Sounds of Jimmy Smith》** | 1957 | **1959** |
| **Jimmy Smith《Jimmy Smith at the Organ, Volume 1》** | 1957 | **1958** |

**共同形狀：資料庫把錄音年當發行年。**
**研究層掃了同期紙本 1955-10～1957-09 共 105 期的 OCR，全文命中頁留在
`batch-progress/enum/billboard-bn-1955-57-ocr.txt`（2.1 MB），後續批次直接 grep 目錄號**（第 489 條）。

## 四、⚠ 研究層擋下策展層 9 處

1. **Thad Jones《Volume 3》的陣容沒有 Kenny Burrell**——是六重奏。
2. **Kenny Burrell BLP 1543 是四個來源拼成的**（含一軌俱樂部現場、一首吉他獨奏），**不是兩場五重奏**；第 3 軌是另一個 take。
3. **Paul Chambers《Chambers' Music》原盤是四重奏**（沒有 Pepper Adams，CD 加軌才有）。
4. **Kenny Drew《Talkin' & Walkin'》原盤 9 軌**（資料庫漏建一軌）。
5. **Jimmy Smith Vol.1 的封底文案作者是 Babs Gonzales，不是 Alfred Lion**；**Vol.3 的鼓手是續任不是首次**。
6. **《Patterns in Jazz》的封面設計是 Reid Miles，不是 Gil Mellé 本人。**
7. **Cafe Bohemia 兩卷「同時發行」無一手證據。**
8. 另擋下 4 句無出處的「第一／唯一」。

## 五、⚠ Live 的判定：Manhattan Towers 不是演唱會場地

**《A Date With Jimmy Smith》Vol.1／2、《At the Organ Vol. 1》、《The Sounds》、《Orgy in Rhythm Vol. 2》
六張的錄音地 Manhattan Towers 是 Blue Note 租下的旅館宴會廳、權充錄音室**——
資料庫把其中兩張標成 Live 是錯的。**卡單 `releaseType` 照資料庫不動（第 397 條），正文六張全部寫成錄音室作品。**
**真正的現場盤 7 張**：Baby Grand 1／2、Hickory House 1／2、Cafe Bohemia 1／2、A Night at Birdland Vol. 2。

## 六、⚠ 同錄音互指（本機組 manifest 時要知道）

- **1957-02 同三天錄音拆四張**：BLP 1547／1548／1551／1556（另三張在 c-137）。
- **10 吋↔12 吋同錄音四組**：Horace Silver Trio 1520↔c-135 的 5034、Fats Navarro 1531↔5004、
  A Night at Birdland 1522↔5037-39、**《Quartet/Quintet/Sextet》1537 是 c-135 兩張 10 吋的合訂**。
- **Orgy in Rhythm Volume Two（本批）↔ Volume One（c-137）。**
**正文一律寫成「內容是同一批錄音／重編而成」，不得寫成不同的錄音。**

## 七、缺的

- **無**。封面與試聽都是 43/43。
- ⚠ **《Talkin' & Walkin'》的試聽採的是公版廠再發版**（逐軌相符）——**發行資訊一律以 Jazz:West JWLP 4 原盤為準**，
  正文已照辦。**本機上傳時要知道那個 collectionId 不是官方版。**
- ⚠ **4 張的封面來源是再發 CD／數位圖不是原盤**（The Sounds、Quartet/Quintet/Sextet、Byrd Blows、Hickory House Vol. 2）。

## 八、下一批

- **c-135（1945–55 十吋盤）研究層已交**、c-137～c-141 在產線上。
- **Blue Note 還有 1,249 張**：1967–84 段 233 張已切成 c-141～c-146（c-141 已走到探測），1985 後爵士 873 張未切。
- **第 312 條：資料庫標 Compilation 的正典**（Miles Davis《Volume 1》BLP 1501、Navarro《Vol. 2》BLP 1532……）
  **被列舉檔濾掉了，六批跑完要另開 §5.6 子批撈回。**
