# c-96 策展層裁定（2026-09-05，靈魂／放克／嘻哈目錄深度）

策展層自決，依 2026-09-02 店主下放（有先例／可逆／卡住整條線三條判準）。

---

## 1. Apple 的 `search` 端點對嘻哈卡有系統性的 cleaned 偏差——**explicitness 必須用 `lookup?id=<artistId>&entity=album` 取，不能用 search**

派工要求「`risk` 一定要寫下 Apple 的 `collectionExplicitness`」。照最直覺的做法
（`itunes.apple.com/search?term=<藝人> <盤名>&entity=album`）跑完 a 組二十張，得到的分佈是
**cleaned 10、notExplicit 1、查無 9，explicit 0**。

但這個分佈是假的。改用 `lookup?id=<artistId>&entity=album&limit=200` 逐位藝人列出全目錄之後，
**十筆裡有九筆同時存在 explicit 與 cleaned 兩個條目，而 search 從來只回 cleaned 那一筆**：

| 碟 | explicit | cleaned | search 回哪一筆 |
|---|---|---|---|
| Notorious B.I.G.《Born Again》 | 78989263（18tr） | 1782256137（18tr） | cleaned |
| JAY-Z《In My Lifetime, Vol. 1》 | 1440910816 | 1442903698 | cleaned |
| JAY-Z《Vol. 2... Hard Knock Life》 | 1440914180 | 1440913253 | cleaned |
| JAY-Z《American Gangster》 | 1440835945 | 1444024033 | cleaned |
| JAY-Z《4:44》 | 1440935425 | 1440935729／6783468117 | cleaned |
| Raekwon《OB4CL Pt. II》 | 716639724（24tr） | 716706036（23tr） | cleaned |
| Lil' Kim《The Notorious K.I.M.》 | 262484199 | 262767798 | cleaned |
| Lil' Kim《La Bella Mafia》 | 76150451 | 76150945 | cleaned |
| Wu-Tang Clan《Iron Flag》 | 1762519766（13tr） | 1762519588（12tr） | cleaned |
| Bone Thugs《The Art of War》 | 1159475968／1170658006 | 1168161721／1168165420 | cleaned |

**裁定**：嘻哈批（與 R&B）的 explicitness 一律以 `lookup?id=<artistId>&entity=album` 的結果為準，
`search` 端點的結果**不得**作為「只有淨化版」的依據。本批 a 組的 explicitness 分佈因此改寫成
**explicit 16、notExplicit 1、Apple 查無 3、cleaned 0**（無一張只有淨化版）。
（b 組 25 張：explicit 2、notExplicit 19、查無 4、cleaned 0。全批 45 張合計
**explicit 18、notExplicit 20、查無 7、cleaned 0**。）

這是 `audits/cleaned-previews-hiphop.md` 那 273 張的**成因**：管線層若走 search，
配到淨化版的機率接近 100%，不是「隨機挑中」。

**通則**：與第 116 條（browse 預設只回 25 筆）同型——**回了 200、回了資料、只是回錯了那一筆**，
沒有任何錯誤訊號。第 28／98／116／122／139 條的「假象」清單要再加一款：
**Apple search 的排序偏差**。

---

## 2. 三張 a 組卡在 Apple 上完全不存在，理由是目錄面不是工具面

`N.W.A. and the Posse` 例外（Apple 有，1440826297 explicit）。真正查無的是：
GZA《Words From the Genius》（Cold Chillin' 目錄）、Black Star《No Fear of Time》（Luminary 獨佔發行）、
Souls of Mischief《No Man's Land》（**整個 Hieroglyphics／Jive 目錄在 Apple US 上不存在**，
連池中已有的《93 'til Infinity》都查不到）。

三筆都用了兩種以上查法（search 兩店＋artist lookup）確認，不是 403 也不是 0 筆的假象（第 163 條）。

**裁定**：三張照收。CAA release-group 端點全部 200，封面成立；
`collectionExplicitness` 欄寫「**待下游辨識**」，試聽預估 unavailable。
依 2026-09-04 店主放寬（§1「身分證據 ready 試聽／rgMbid／§1 人工舉證三者任一」），
**Apple 有沒有這張碟不是收錄條件**。

---

## 3. 掛名分裂：一律沿用池中既有的主寫法，MB 的 artist-credit 進 `queryAlias`

派工提醒的第一種坑（括號與 feat.）在本批出現七組，**每一組的 MB artist-credit 都與池中不同**：

| 卡片掛名（＝池中主寫法） | MB artist-credit | 其他寫法 |
|---|---|---|
| JAY-Z | `Jay‐Z`／`JAY‐Z`（U+2010） | MB 實體 `JAŸ-Z`、Apple `JAŸ-Z` |
| GZA | `The Genius`（1991 那張）／`GZA/Genius` | 池中另有「GZA/Genius」1 張 |
| Bone Thugs-n-Harmony | `Bone Thugs‐n‐Harmony`（U+2010） | ASCII 連字號 |
| Wu-Tang Clan | `Wu‐Tang Clan`（U+2010） | ASCII 連字號 |
| Grandmaster Flash & The Furious Five | `Grandmaster Flash and the Furious Five` | MB 實體用 `&` |
| Smokey Robinson & the Miracles | `Smokey Robinson and The Miracles` | Apple `Smokey Robinson & The Miracles` |
| Martha Reeves & the Vandellas | `Martha and the Vandellas`（1963 那張）／`Martha Reeves & the Vandellas` | 池中兩種寫法都有；MB 實體 `Martha Reeves and the Vandellas` |
| Labelle | `LaBelle` | Apple `LaBelle` |
| Rufus 系三張 | `Rufus`／`Rufus featuring Chaka Khan`／`Rufus & Chaka` | Apple `Rufus & Chaka Khan`／`Chaka Khan & Rufus` |
| Gil Scott-Heron & Brian Jackson | `Gil Scott‐Heron, Brian Jackson & The Midnight Band` | 封面 `Gil Scott-Heron and Brian Jackson` |

**裁定：一律採池中既有主寫法**，其餘全部進 `queryAlias`。理由是第 11／52 條——
卡片掛名要的是**這個對象的通行名**，credit 是發行方在那一版上怎麼印的；
而本批每一位在池中都已經有卡，**再引入第四種寫法只會把一位藝人拆成四個**
（`audits/pool-artist-name-splits.md` 已有七組待修，不要再加）。

兩個特例值得單記：
- **Martha & the Vandellas 1963 年那張**：原盤 credit 確實是「Martha & the Vandellas」
  （1967 年才改成 Martha Reeves &）。照第 6 條「取原始發行的寫法」應該用舊團名，
  但池中三張既有卡沒有一張用舊團名。**可逆性判準勝出**：改的是卡單一個欄位、`rgMbid` 不動。
- **The Miracles／Smokey Robinson & the Miracles 的分期**：這一組**不合併**，
  照該張碟當年的 credit 走（1961–1965 The Miracles、1965–1972 Smokey Robinson &、1973 後又改回）。
  池中九張既有卡本來就是這樣分的，本批三張沿用。

---

## 4. Gil Scott-Heron《Small Talk at 125th and Lenox》釘 secondary-type=Live 的那一筆，是刻意的

MB `ec408b92` 的 `secondary-types` 是 `[Live]`。這張是 1970 年在紐約一間小場地當著聽眾錄成的
**首張唱片**，不是後世的演唱會實況再發——MB 用 Live 標的是錄音形態。

**問題**：第 162 條第 2 點給 `fix-rgmbid` 加的第三道防線是「候選的 secondary-types 有 Live／Compilation
而既有釘位沒有，就不替換」。那條規則只管**替換**，不管**初次釘定**；但下游若有任何檢查器把
「secondary-types 含 Live」直接當成對照組，這張會被誤剔。

**裁定**：照釘，並在 `risk` 明寫「這是本張唯一的釘位風險，卡層要標記為刻意選定」。
同型的還有 Frank Ocean《Endless》（secondary-types `[Soundtrack]`，MB 對視覺專輯的建檔慣例，
不是電影配樂）。

---

## 5. 三張 `primary-type=Album` ＋ `secondary-types` 含 Compilation 的，照一般 Album 寫

N.W.A《N.W.A. and the Posse》(1987)、The Notorious B.I.G.《Born Again》(1999)——兩張都是
`primary-type=Album`、`secondary-types=[Compilation]`。依 §5.6 明文與 c-90 裁定第 3 條，
**照一般 Album 寫、不填例外欄位**（填了會被 `chk-prop` 判「非合輯卻帶例外欄位」）。

**本批 `releaseType: "Compilation"` 的卡為 0 張**，沒有任何一張走 §5.6 舉證。

---

## 6. Deluxe／擴充版一律「刻意不釘」，但有四張 Apple 上**只剩**加曲版

派工要求「擴充版與 Deluxe 版一律寫進刻意不釘」。釘的都是原盤 release-group，這點沒有例外。
但下游取固定試聽時會撞到一件事：**這四張在 Apple 上找不到原盤軌數的條目**——

| 碟 | 原盤軌數 | Apple 條目軌數 | collectionId |
|---|---|---|---|
| Dusty Springfield《A Girl Called Dusty》 | 12 | 20（Remastered） | 1443726966 |
| Dusty Springfield《Ev'rything's Coming Up Dusty》 | 14 | 21（Remastered） | 1443722946 |
| Gil Scott-Heron《Free Will》 | 11 | 23 | 1621389194 |
| Jill Scott《The Real Thing Vol. 3》 | 15 | 15／16／17／19 四種 | 標準版取 324777083 或 1416191630 |

**裁定**：前三張若下游只能取到加曲版，**收，但要在卡層備註寫明它是加曲版**（不是另一張碟，
是同一張碟唯一在架的數位形態）。第四張有 15 軌的標準版在架，直接取標準版。
Jill Scott《The Light of the Sun》同理（433561623 15 軌標準版，不取 435260991／6806023673 的 Deluxe）。

---

## 7. Bone Thugs《The Art of War》在 Apple 上被拆成兩張，下游要選一邊

原盤是雙 CD（World War 1／World War 2）。Apple **沒有合併條目**，只有四筆：
explicit 1159475968（WW1、13tr）／1170658006（WW2、15tr），cleaned 1168161721（12tr）／1168165420（14tr）。

**裁定**：卡片仍是一張（釘 release-group `5248d2c4`，MB 把兩片視為同一個 RG）。
固定試聽取 **World War 1 的 explicit 條目（1159475968）**——它是原盤第一片，取首軌即為全碟開場。
已寫進 `risk`。

---

## 8. Black Star 在池中是**同一張碟被建了兩次**——本批不動它，但要回報

實掃 `seed_cards.json` 抓到：
- `Mos Def & Talib Kweli — Black Star`（1998）
- `Black Star — Mos Def & Talib Kweli Are Black Star`（1998）

**掛名與盤名互換，指的是同一張 1998 年首作。** 任何以 `artist|album` 為鍵的去重都抓不到
（第 71 條的形狀：兩邊掛的字串完全不同）。

**裁定**：本批只新增《No Fear of Time》（2022，掛名 `Black Star`），**不動既有那兩筆**——
`seed_cards.json` 是雲端禁碰檔（`REMOTE_RUNBOOK.md`）。列進交件回報，交本機處理。

---

## 9. Raekwon《Only Built 4 Cuban Linx... Pt. II》：卡片盤名的前 30 字元與池中既有卡完全相同

池中已有《Only Built 4 Cuban Linx...》(1995)。本批新收的續作盤名是
《Only Built 4 Cuban Linx... Pt. II》——**前者是後者的前綴**。

`chk-prop` 用的是全等比對，標記 0；但任何用子字串／包含關係做去重的下游腳本都會誤判成撞卡，
或反過來把續作釘到第一集的 release-group 上。

**裁定**：照收，並在 `risk` 明寫這是第 162 條「盤名太短會配到別人」的鏡像形狀；
四種盤名寫法（MB「Only Built 4 Cuban Linx… Pt II」／Apple「Only Built 4 Cuban Linx, Pt. 2」／
封面「Only Built 4 Cuban Linx... Pt. II」／池中第一集）全部進 `queryAlias`。

同型還有 Martha 的三張：MB 上各有一筆 2002 年的二合一再發，盤名**完全包含**本批要釘的盤名
（《Come and Get These Memories / Heatwave》《Ridin' High / Sugar n' Spice》《Natural Resources / Black Magic》），
三筆全部明寫「刻意不釘」。

---

## 10. 池中目錄已滿、確認無可補的三位

派工骨幹名單裡有三位，實查後**一張都補不了**，記下來免得下一批重查：

- **Dr. Dre**（池中 3 張：The Chronic 1992／2001 1999／Compton 2015）——
  MB 名下 127 個 release-group 分頁全列，個人正規專輯就是這三張，其餘皆為單曲、精選與掛名合輯。
- **Madvillain**（池中 1 張：Madvillainy 2004）——只有這一張，《Madvillainy 2》是 remix 版。
  MF DOOM 相關的化名專案（Viktor Vaughn、King Geedorah、Danger Doom、Quasimoto）**池中已有 5 張**。
- **Lauryn Hill**（池中 1 張：The Miseducation of Lauryn Hill 1998）——
  MB 藝人 `e8414012` 名下 29 個 RG，除首作外全部是 Live（《MTV Unplugged № 2.0》2002、
  《The Live Education》1999、《Live in Tokyo》2020）與 Compilation。
  **《MTV Unplugged No. 2.0》不收**：它的 primary-type 是 Album 但 secondary-types 是 Live，
  且它在該藝人目錄中是「唯一的另一張」，收了會讓池中呈現「她只有一張錄音室作、一張現場」——
  這是真實情況，但派工明列 Live 為對照組，依規則不收。Fugees 池中已有 2 張。

---

## 11. 名單外自行增收四位，理由

派工允許「名單外的同型藝人（有王牌卡、池中卻只有 1–3 張）可以自己加」。加了四位：

| 藝人 | 池中 | 新增 | 理由 |
|---|---|---|---|
| Snoop Dogg | 2（Doggystyle 1993／Tha Doggfather 1996） | Tha Last Meal (2000) | 池中兩張全是 Death Row 時期，No Limit 三張全缺 |
| Ultramagnetic MC's | 1（Critical Beatdown 1988） | The Four Horsemen (1993) | 團體只有一張，Kool Keith 個人卻有 2 張 |
| Souls of Mischief | 1（93 'til Infinity 1993） | No Man's Land (1995) | 典型「只有代表作」 |
| Wu-Tang Clan | 4（36 Chambers／Forever／The W／8 Diagrams） | Iron Flag (2001) | 唯一的斷點，補完 1993–2007 無缺 |

Wu-Tang 已有 4 張仍收——**「同一藝人上限 3 張」早已作廢（第 150 條）**，判準是「這張碟池中有沒有」。

---

## （主線追加，2026-09-05）第 12 條：Jerry Butler《Jerry Butler, Esq.》的年份與「離團後首張」之爭 —— 取 MB 年份、砍掉時序主張

研究層回報：MB 的 first-release-date 是 **1959-11**，但維基記 Butler **1960 年**才離開 The Impressions，
策展層 `curatorWhy` 寫的「離團後首張個人專輯」與這個時序對不上。

**主線裁定（依 2026-09-02 裁定權下放；可逆、只改卡單欄位與行文）：**

1. **`year` 取 MB 的 1959，不動。** 卡池的年份一律取 release-group 的 first-release-date
   （第 91／95 條：rgMbid 是身分鍵不是年份來源，但年份欄的取法是既定的）。
2. **「離團後首張個人專輯」整句不採用。** 研究層已查證它沒有直述來源，
   而且它是一個**時序推論**——第 125 條那一族（序數與先後關係要有來源直述才能寫）。
   hook 與寫作層都不得寫「離團後」「第一張個人專輯」「首張」。
3. 兩說已寫進該卡的 `yearVerified`，**上架時若本機拿到實體的版權年，可回頭覆核**。

**通則**：策展層的 `why` 出現「離團後」「重組後」「解散前」這類**時序定位**時，
研究層要當成待查證的主張，而不是背景敘述——這一輪已經攔到三次
（本條、c-93 的 Jane's Addiction「2001 年重組後的第一張」、c-96 a 的 Born Again「第三張專輯」）。
