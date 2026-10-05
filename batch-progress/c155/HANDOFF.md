# c-155 交接（2026-09-18）：Blue Note 1997–2000，36 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

切片 45 張，**收 36 退 9**（a 組收 15 退 8、**b 組收 21 退 1，退貨率 4.5% 是這一段最低**）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **36/36，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **36/36 全 full**，out-1 229–239／out-2 220–239 |
| 封面 | **30/36**（缺 6，**替代來源 6/6 全部查實且都確認 `images[0]` 是 `primary`**） |
| 固定試聽／無來源狀態 | **34/36 有來源**（研究層撈回 5），**2 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 本批無合輯，例外欄全空 |
| published gate | 本機端 |

## 三、⚠ 這一批最重要的一條通則（第 1367 條）：Discogs 的編制要讀逐軌欄

**策展層說「編制查不到／credits 零樂手欄」的四張全是誤判，四次都是同一個原因：
只讀了 Discogs release 層的 `extraartists`，沒讀 `tracklist` 裡每一軌自己的 `extraartists`。**

| 卡 | 策展層說 | 逐軌欄實際 |
|---|---|---|
| Cæcilie Norby《Queen of Bad Excuses》 | 只查得到兩人 | **十二人，含 John Scofield 七軌、Billy Hart 三軌** |
| Jacky Terrasson《What It Is》 | 鼓手與貝斯手完全查不到 | **兩位鼓手、三位貝斯手逐軌寫死** |
| James Hurt《Dark Grooves》 | 零樂手欄 | **十四人逐軌**，第 3／7／10 軌各是一組不同編制 |
| Jean-Pierre Como《Empreinte》 | credits 與 notes 皆空 | **九軌各有客座**（Como 自己的鋼琴確實查不到） |

⚠ **這一條與第 1281 條（credits 空白只代表那一版的條目空白，換版本再查）是互補的兩種查法。**

## 四、⚠ 「同一場錄音拆成兩張碟」在本線第二例（第 1369 條）

**《Live in New York》與池中《Cornucopia》(1990) 的第 1–4 軌是同一晚同一場**
（Manhattan Center Studios，**1989-03-21**）——**重疊的不是一個人是六個人**
（Moffett／Watts／Kirkland／Fine／Lewis／Wright），**連工程師與製作人都相同**。
四首同名曲時長差 10–30 秒＝**重剪**（本張 credits 有 `Malcolm Addey — Edited By`）。
**兩卡互指、帶 catno `97810` vs `7923562`。**（與《Stolen Moments》1990 東京那場確為不同場。）

**第一例是 c-153 的《Live at the "It Club" Volume 2》。**

## 五、⚠ 兩張整張翻唱，原盤都在池中且都是 apex

- **George Howard《There's a Riot Goin' On》十軌全取自 Sly & the Family Stone 的同名原盤**
  （原盤另有〈Spaced Cowboy〉未收）——**原盤是 apex 5、tier hall**，**本線第一次撞到王牌**，
  **帶 catno `21431`**。
- **Ronnie Laws《Harvest for the World》翻的是 The Isley Brothers 1976 年同名盤**（**apex 3**），
  **帶 catno `57875`**。

## 六、⚠ 研究層的自我更正：`seed_cards.json` 是「陣列的陣列」（第 1370 條）

研究層第一版掃描腳本**把 17,248 筆全讀成空白**，因此誤報「原盤不在池中」。
重掃 27,750 列後才發現上面那張 Isley Brothers 原盤其實在池中。

⚠ **這是「失敗與正常長得一樣」的又一種：掃卡池的腳本讀錯資料形狀時，回報的是「零命中」，
跟「真的沒有」一模一樣。** **後批掃卡池前先印一筆樣本確認形狀。**

## 七、年份與首發地

- ⚠ **《Antiguo》（Gonzalo Rubalcaba）1998 US → 1997 JP**：世界首發是
  **Somethin' Else `TOCJ-5588`，1997-07-24**（**零售盤、非宣傳盤**），
  美版盤面逐字 `Blue Note Records — Licensed To`、Apple copyright `℗ 1997 EMI Music Japan Inc.`。
  **策展層只核了 Discogs 上兩筆 1997 美國空殼條目就判「不採」，沒往日本找。**
- **《Sings Jobim》首發地 US → JP**（`TOCJ-5595`，1998-03-25，早四個月），同年不動年份。
- **國別更正 2 張**：Stone Blue MB 登 XE → 實為 US；What It Is MB 與列舉檔登 DE → 實為 US。
- ⚠ **但第 1063 條在本批大多方向相反**：逐張跑完日版檢查，**日版早於美版只有 2 張**
  ——**「先查日版」仍是固定動作，但不要預設日版一定早。**

## 八、載體與店面

- **同期就有黑膠的只有 3 張**：Combustication（美英兩版 2xLP）、The Dawn（法版 7 軌）、
  **Bending New Corners（歐版 11 軌且重排曲序）**。**其餘 33 張只有 CD，無雙片 CD。**
- ⚠ **店面新形狀（第 1371 條）**：**《Return of the Candyman》的 `724049030` 在架、`trackCount` 13，
  但 `entity=song` 在 us／jp／fr／gb／ca 五市場全回 0 軌、零 previewUrl**
  ——**對的碟但拿不到預覽，走固定無來源狀態。**
- **撈回的五張各靠不同一招**：`Harvest for the World` **只有 UPC 查法有效**；
  `Trio Fascination` **Apple 盤名是 `Edition I` 羅馬數字**；`HubSongs` **只有 jp 市場 lookup 回得到**。
- ⚠ **`apple-candidates.md` 本批再次大量給錯**：Irakere 6 個全錯、**Chucho Valdés 7 個混了 4 張碟**。

## 九、本機端待辦

1. **上傳 36 張。**
2. **封面缺 6 張**（替代來源全部確認 `images[0]` 是 `primary`）：
   Better Days **11841855**（600×600）／The Three Sounds《Standards》**10865519**（598×600）／
   Tribal Traquenard **12802295**（600×538）／
   ⚠ **Re-Animation Live! 用英歐版 `5222726`（600×597）——美版兩筆圖全是 secondary**／
   ⚠ **Empreinte 零售盤唯一一張圖是 secondary，只能用宣傳 CDr `13166229`（600×591）或 Apple `600x600bb`**／
   Animation / Imagination **571287**（594×600）。
3. **試聽無來源 2 張**：Irakere《Yemayá》、Charlie Hunter & Pound For Pound《Return of the Candyman》。
4. ⚠ **上架要帶掛名與年份的**：**seed 有 `Phil Woods —《Chasin' The Bird》(1998, apex 4)`**，
   與本批《The Rev and I》**同掛名同年**、曲目零重疊。
