# c-63 交接（2026-09-02）：深掘民謠與藍調 52 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線第五批（`lineType: 深掘`）。三軸普查支持這兩塊：
**folk 1,578 張只有 10 張 `obscurity=5`、blues 632 張只有 6 張**（對照 electronic 124、classical 114），
而且 **blues 是全池總數最少的曲風**，所以這批兼有補量的意義。

**52 張、50 位藝人**：

| 組 | 場景 | 張數 |
|---|---|---|
| a | 民謠（英國民謠復振二三線 8、英國私壓與 acid folk 6、美國 loner folk 4、美國 old-time 與田野錄音 4、愛爾蘭與蘇格蘭 3、伊比利 2、拉美 nueva canción 2） | 28 |
| b | 藍調（戰前二三線考古合輯 7、blues revival 再發現 4、電氣藍調地方場景 6、1970s soul blues 2、英國 blues boom 二三線 4、馬利 Bambara blues 1） | 24 |

**合輯 9 張**（全走 §5.6）。民謠那組實掃後 **29 個候選藝人 0 撞卡**——
整條 Topic 12T 序列的二線歌手、整個 Trailer LER 序列、葡萄牙 canção de intervenção、
烏拉圭與智利的 nueva canción 二三線，池中一張都沒有。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **40/52（77%）**，12 張要掃圖 | `c63/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——**照 §0.8 錨點制**（第 89 條），`ratings.source` 記 `manual:depth-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **52 張全部寫完並過機器 QA** | `desc-tools/batches/output/c63-out-{1,2}.json` |
| 5. 固定試聽 | **32/52 ready（62%）** | `c63/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：52/52 釘住 release-group MBID，零修正（連續第三批）

1 張報「標題對不上」是誤報，已人工確認：**Tommy Jarrell《Sail Away Ladies》**的
release-group 名字是 1999 年 Legacy 系列再發的長標題，**轄下 1976 年 County 756 原盤的標題
正是《Sail Away Ladies》**——卡片依第 6 條採原盤短名，兩者本來就不必相等（裁定第 91 條）。

### 封面 40/52——深掘線裡最低的一批

**12 張缺封面**：Tony Rose、Louis Killen、Dave & Toni Arthur、High Level Ranters、Mr. Fox、
Almeda Riddle、Daniel Viglietti、Various Artists《The Stuff That Dreams Are Made Of》、
Robert Nighthawk、Big Joe Williams、Buddy Moss、Lobi Traoré。

民謠與戰前藍調的 CAA 建檔確實比搖滾迷幻薄，與第 83 條的觀察一致。

### 試聽 32/52（62%）——遠高於策展層的預估

策展層預估「會遠低於 c-60 的 49%」，實際 62%。**30/32 命中 `gb`、2 張 `us`**——
英國民謠復振與英國 blues boom 的目錄數位化得比預期完整。
三張自我同名卡（Memphis Jug Band、Jo Ann Kelly、Duster Bennett）都是正規化後完全相等才放行
（第 90 條），`Jo-Ann`／`Jo Ann` 的連字號差異由正規化吸收。
**yearDrift 標記 8 張供本機核版本。**

## 三、上架前必須先看 `rulings.md`（主檔 `c53/rulings.md`，110 條）

**這批立的：第 82–87、91、100–102、106–110 條。** 直接影響本機操作的：

1. **第 82 條：4 張完全沒有授權再發**（Dave & Toni Arthur、High Level Ranters、Ray Fisher、
   Almeda Riddle），分量靠檔案與文獻（Mainly Norfolk、Tobar an Dualchais、
   Smithsonian Rinzler 檔案）。**這不是缺陷**——「完全沒有再發」比「只有未授權再發」更乾淨，
   深掘線的判準是「有可查證的地位證據」，再發只是最常見的一種形態。
   **做 §0.8 三軸時這 4 張是冷門軸 5 分的候選**（沒再發進串流）。
2. **第 84 條：合輯年份＝該編輯版本首度問世年。** 本批 8 張合輯與所釘 RG 脫鉤、
   最大落差 21 年（《Traveling Through the Jungle》1974 LP／1995 CD）——
   原盤是 1970 年代 LP 而 MB 往往只建了 1990 年代 CD。
3. **第 85 條：Silas Hogan 採《Trouble》**（美國 Excello 原廠），
   英國 Blue Horizon 的《Trouble At Home》是同曲序的**單聲道**授權盤（美國盤立體聲）。
4. **第 86／100 條：三張年份已改**——Robert Nighthawk 1980 → **1979**（Hall of Fame 是地位證據
   不是年份證據）、Big Joe Williams 1958 → **1961**（1958 是錄音年）、
   Cannon's Jug Stompers 1990 → **1989**（三個編輯版本裡選 Yazoo LP 那一版）。
   **七張卡的行文完全不出現發行年**，因為來源互相矛盾。
5. **第 87 條：Document 的 "Complete Recorded Works" 分卷全批剔除**，理由是「分卷不是一張碟」
   不是授權問題。要開這條路得先定「收哪一卷」的規則。

### 研究層推翻策展層七處，本機改寫時不要改回去

| 卡 | 策展層 | 實查 |
|---|---|---|
| High Level Ranters | 後來由 Topic 以 TSCD483 出 CD | **這張根本沒有再發**——TSCD 483 是另一張碟（1968 年《Northumberland Forever》）的 1997 年重刊，曲目完全不重疊 |
| Frankie Armstrong | 2000 年 CD 是 Topic | 是 **Fellside FECD151** |
| Meic Stevens《Outlander》 | 全英語 | 曲目表有威爾斯語曲名〈Dau Rhosyn Coch〉，收緊為「一次性的英語 LP」 |
| 《Traveling Through the Jungle》 | 收錄 R.L. Boyce；採集橫跨 1940–60 年代 | **名單沒有此人**；實為 1942（Lomax）與 1969–70（David Evans）。原盤拼法 **Othar Turner** |
| Jimmy Dawkins | Discogs 掛名含 Big Voice Odom 與 Otis Rush | 藝人欄**只有他一人**；AllMusic 的「1971」是**錄音日期** |
| Lobi Traoré | 三位打擊樂手 | **兩位**（djembé 與 calebasse），第三人掛和聲 |
| The Groundhogs | 盤名意指十二小節藍調聽眾正在消失 | **查無來源** |

### 第 65 條又中兩例，這次冒的是大廠

**Chicken Shack** 有冒用「**Columbia (2)**」且沿用正版編號 `COL 477357 2` 的盜版；
**The Groundhogs** 有冒用「**BGO Records (3)**」的。
**「廠牌名看起來很正規」不構成任何保證**——分辨依據仍只有 Discogs 廠牌實體的括號序號。

## 四、簡介產線的數字

| | out-1（民謠） | out-2（藍調） | 合計 |
|---|---|---|---|
| 卡數 | 28 | 24 | **52** |
| 字數範圍 | 217–235 | 220–235 | 217–235 |
| 超過 240 | 0 | 0 | **0** |
| `qa-check-research` | 0 | 0 | **0** |
| `fix-spacing` | 0 | 0 | **0** |

`qa-batch out c63` 與卡單 52 張相符、全部通過。
研究層 **52 張全部 `full`**、facts 452 條、非 HTTPS src 0。
hook 層：a 組加權 24–37、b 組 22–38，`chk-hook-crossgroup` 零項。

### 這批在管線規則上的三個進展

1. **hook 層第一次自己攔下錯誤**（第 106 條）：a 組依第 61 條回核 facts，
   主動改掉三個自己寫的 hook。**錯誤根本沒流到下游。**
2. **hook 的舉證門檻提高**（第 110 條）：Silas Hogan 那張的 hook 斷言「同一批母帶」，
   facts 沒說、而且立體聲／單聲道反而是反證。**第 61 條的門檻從「與 facts 矛盾」
   放寬到「facts 撐不住」**，該卡已重寫。
3. **數量詞的系統性問題**（第 108 條）：writer-1 一次抓到六處
   「facts 列了 N 個名字但沒寫 N」，其中 Tia Blake 那筆 **note 自己數錯**
   （寫四位、facts 列五個）。照 note 寫會產生一個與自己 facts 矛盾的數字，
   而 `qa-check-research` 抓不到。
