# c-151 交接（2026-09-18）：Blue Note 1992–94，38 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

**Blue Note 1992–94 的新錄音。** 切片 45 張，**收 38 退 7**（a 組收 20 退 3、b 組收 18 退 4）。
**退掉的七張全是舊號段的 CD 化再發／重編，`chk-prop` 一個燈都沒亮**——
抓出來靠的是 **Discogs 的 `format`／`notes` 欄**與**東芝 EMI 復刻的號段特徵**。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **38/38，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **38/38 全 full**，out-1 190–239／out-2 209–239 |
| 封面 | **28/38**（缺 10，**替代來源 10/10 全部查實**） |
| 固定試聽／無來源狀態 | **27/38 有來源**（探測 24 ＋ 研究層撈回 3），**11 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 本批無合輯，例外欄全空 |
| published gate | 本機端 |

## 三、⚠ 這一段已經不是黑膠時代了

**38 張裡只有兩張有同期黑膠**：
- **《3-D Lifestyles》**英國 LP `B1-98635` **10 軌**，**CD 第 11 軌〈Mr. Gutterman (Edit)〉是封底沒印的隱藏加軌**
  ——**以黑膠十軌為準。**
- **《Hand Jive》**——⚠ **方向與 1985–90 那段相反**：**同期美國黑膠只有 6 軌、曲序全重排**
  （缺〈Checkered Past〉〈Don't Shoot The Messenger〉〈Whip The Mule〉〈Out Of The City〉），
  **10 軌 CD 才是完整專輯、黑膠是刪節版**。**以 CD 十軌為準。**

**其餘 36 張正文一字未提黑膠。**
⚠ **通則（第 1135 條）：後批不得預設「黑膠＝原盤＝完整版」。**

## 四、⚠ 五張的首發在日本

| 卡 | 日本原盤 | 日期 | 比美版早 |
|---|---|---|---|
| Ron Carter《Friends》 | EAU **TOCJ-5748** | 1993-03-17 | 近五個月 |
| Jimmy Smith《The Master》 | Somethin' Else **TOCJ-5562** | 1994-06-22 | 三個半月 |
| Geri Allen《Twenty One》 | Somethin' Else **TOCJ-5564** | 1994-07-20 | 近五個月 |
| Michel Petrucciani (Live) | **TOCJ-5932** | 1994-10-19 | — |
| Geri Allen《Maroons》 | **TOCJ-5544** | 1992-08-26 | — |
| Various Artists《New York Stories》 | **TOCJ-5721** | 1992-07-22 | — |

**TOCJ-5562／5563／5564 是連號三張**（The Master／Spark／Twenty One）。**六張都已補 `queryAlias`。**
⚠ **《Play》的日本題名是《Play - スペイン》**（腰帶把〈Spain〉掛成副標）——也在 `queryAlias`。

## 五、⚠ 研究層擋下策展層八處正文錯

| 卡 | 策展層寫的 | 實際 |
|---|---|---|
| Michel Petrucciani (Live) | 獨奏盤、八軌全原創 | **五人編制**；〈Estate〉是 **Bruno Martino** 寫的 |
| Friends | 有德弗札克 | 第 1 軌〈Liebesleid〉是 **Fritz Kreisler**；另有三位鋼琴手、四把大提琴 |
| The Master | 自選集 | **九軌只有 1 首是 Jimmy Smith 寫的**；⚠《The Cat》《Organ Grinder Swing》是 **Verve** |
| Changing of the Guard | — | **十一軌沒有一首是 T.S. Monk 寫的**；錄音 1993-02-08/09/10/13 四天 |
| Solo Piano | 末兩軌兩人伴奏 | **三個人** |
| That's Right! | — | **有兩軌是無伴奏獨奏**（唯一來源是 BB 1993-09-18 評介欄） |
| Common Ground | — | **執行製作是 George Duke**；Harp 本人只在兩軌唱主唱 |
| **Nighttown** | 雙次中音六重奏（Michael Brecker） | **七重奏、只有一支次中音（Joe Lovano）**；**Michael Brecker 在的是 c-149《Weaver of Dreams》** |

## 六、撞陳列

- **《Tokyo Live》是「把自己四張舊作的曲目現場重錄」**——⚠ **是四張，不是 Cash Box 寫的 five**
  （Civilization 供 6 軌、Foreign Intrigue 2、Angel Street 1、Native Heart 1，
  **《The Story of Neptune》供 0 軌，且錄音當下還沒上市**）。
  **〈Blackbird〉是披頭四**、〈The Announcements〉是報幕；⚠ **Civilization 是單數〈Warrior〉、本張是〈Warriors〉。**
- **《Live at the Five Spot Discovery!》**：**1958 年的現場、1993 年才首度發行**。
  與池中三張 Monk 卡同名曲但不同錄音（〈Trinkle Tinkle〉401s vs **597s**、〈Epistrophy〉191s vs **313s**）。
- 其餘：《The Master》〈Chittlins Con Carne〉↔ 池中《Midnight Blue》；
  《Michel Petrucciani (Live)》〈Looking Up〉↔ c-149 兩張（**三卡並存**）；
  《Spark》〈Culcutta Cutie〉↔《The Cape Verdean Blues》；
  《The Vibes Describes》〈The Eternal Spirit〉↔《Eternal Spirit》（只差一個 The）；
  同批內〈What Is This Thing Called Love〉與〈I Should Care〉各撞一組。
  ⚠ **池中 seed 已有 `Lonnie Smith —《Turning Point》`(Blue Note, 1969)**——與本批 Eubanks 的同名碟是兩張碟。
- **《Rhythm Method》與《Delivery Suite》在 1993 年英國原本是同一個雙片 CD 盒**，**兩卡 risk 互指**。

## 七、⚠ 一條給所有後批的紙本教訓（第 1134 條）

策展層判《Michel Petrucciani (Live)》「兩刊零命中」——**是錯的**。
**Cash Box 1994-11-19 p16 有整則評介**，漏查成因是 **OCR 把人名打成「PETRUCCIAN1」（尾字是阿拉伯數字 1）**。
⚠ **`I`↔`1`、`l`↔`1`、`O`↔`0` 是 OCR 的固定錯法——「紙本零命中」在試過變體之前只是待證的宣稱。**

## 八、本機端待辦

1. **上傳 38 張。**
2. **封面缺 10 張**，替代來源已逐張寫在研究層 `notes`（含 release 號、圖數與 primary 尺寸）：
   To Know One **8583282**（600×595）／Suite 4 y 20 **16284382**（600×522）／Turandot **11362304**（600×523）／
   ⚠ **The Traveler 只有日本促銷盤 26288972 有正面封面圖**（600×516；美版 12702399 與荷版 7845006
   各只有一張 300×300 的 secondary）／Friends **9428976**（600×531）／When the Time Is Right **10217375**（600×593）／
   Spark **12095922**（500×494）／Common Ground **2250467**（600×591）／Delivery Suite **4898668**（600×600）／
   ⚠ **The Master 不要用 1828935（images[0] 只有 240×240）**，改用日版 **11564532**（600×533）
   或美國俱樂部版 **5444295**（600×593）。
3. **試聽無來源 11 張**——都跑滿第 254 條三種查法、明寫查無，走固定無來源狀態。
   ⚠ **《The Master》只有續集《The Master II》(720589750) 在 Apple 上，依第 646 條不可共用。**
4. ⚠ **`The Benny Green Trio`（Group）與 `Benny Green`（Person）是兩個不同的掛名**（第 1131 條）
   ——本批兩張用團名，c-150《Lineage》與 c-152《The Place to Be》用人名。**這不是分裂。**
