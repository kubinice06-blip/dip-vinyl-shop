# c-100 交接（2026-09-05）：古典演奏家傳奇錄音目錄深度，40 張走完雲端段

**這批可以接本機上傳了**，但**有一件規格層級的事要店主先裁定**（見第六節），
否則本機寫進 `seed_cards.json` 的年份可能要整批回頭改。

雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md` 不能做**的
（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

店主 2026-09-05「接力做完十批」的一批。`lineType: 廣度`，**單一組 a**。

**40 張、32 位掛名、零 §1 人工身分、零跨批撞卡、40/40 釘住 release-group MBID。卡單年份 1953–2005。**

**逐位**：Toscanini／Schnabel／Kreisler／Van Cliburn／Mravinsky／Budapest String Quartet／
Quartetto Italiano／Joan Sutherland 各 2，其餘各 1（含 Cortot 的三種組合掛名形態）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **40/40（100%）** | `c100/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **40 張全部寫完並過機器 QA** | `desc-tools/batches/output/c100-out-1.json` |
| 5. 固定試聽 | **26/40（65%）**，命中全在 `gb` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**簡介的機器 QA**：`qa-batch.mjs out c100` 全過；`fix-spacing` 待補 0；
主線另跑一次性複驗——**40 張的 `desc` 開頭與 `hook` 逐字相符**、
full 216–238、thin 1 張 170、**未具名出處 0 盞、本批六條硬禁令 0 命中、平台字眼 0 命中**。

## 三、**試聽 6/40 → 26/40**：探測層對古典歷史錄音幾乎全軍覆沒

探測跑完只有 **6 張** ready。研究層逐張打兩個端點覆核後救回 **20 張**。
落空的原因與流行樂完全不同：

| 形狀 | 實例 |
|---|---|
| **卡片盤名被策展層縮短過** | Michelangeli 那張，MB 與 Apple 都多一項「Prélude, op. 45」 |
| **作曲家姓名的簡寫** | 「R. Strauss」對「Richard Strauss」 |
| **年份括號** | 卡片有「(1954)」「(1962)」「(1952)」、Apple 沒有 |
| **語言** | 德文《Johannes-Passion》對英文《St. John Passion》；《Waldesruhe》對《Silent Woods》 |
| **數字的有無** | Apple 的《Bartók: The String Quartets》沒有卡片那個「6」 |
| **盤名零重疊** | Schnabel《Complete Schubert》是**靠 51 軌的軌數比對撈到的** |

**兩張的 Apple 命中不在 us 店面**（Van Cliburn 兩張），**一張只有 jp**——
現行的 UKB 店面組剛好都涵蓋得到，但這是運氣。

## 四、**三條通則從這批長出來**（已寫進 `c53/rulings.md` 第 173–175 條）

**第 173 條——Apple 的兩個端點會漏掉不同的碟，兩個都要跑。**
第 166 條說「search 漏碟就改打藝人頁目錄」；本批找到**反方向的實例**：
Kreisler《The 1926 & 1927 Victor Recordings》是**目錄端點漏掉、靠 search 救回的**；
反過來 Milstein 與 Quartetto Italiano 兩張是 **search 查不到、目錄端點看得到**。
**而且目錄端點自己會被 `limit=200` 截斷**——Toscanini、Casals、Kreisler 三位的**七個店面全部回滿 200**。

**第 174 條——古典的假陽性擋不住軌數，只能用逐軌長度擋。** 本批三個假陽性：
- **Alban Berg Quartett**：《The Late String Quartets (**Live at Konzerthaus, Wien, 1989**)》，**27 軌對 27 軌**。
- **Amadeus Quartet**：《Op. **76**, 77 & 103》對本卡《op. **71, 74**, 77 & 103》，**34 軌對 34 軌、碟數 12+12+10 完全相同**。
- **Celibidache**：Apple 四筆柴五**全是倫敦愛樂**那次早期錄音，**每個樂章都比慕尼黑版短三到四分鐘**。

反過來，確認正確的那幾張也全是靠長度（Busch Quartet 對到小數點後一位、Karl Richter 40 軌逐軌完全相同、Mravinsky《蕭五》同樣）。
**原因**：古典的同一位演奏家同一首曲子錄過三四次是常態，盤名、掛名、廠牌、軌數全一樣，**只有演奏時長每次都不同**。

**第 175 條——`trackCount` 欄與攤開的曲目列可以不一致**（Gilels 21 對 20、Van Cliburn 7 對 6）。

## 五、兩張加曲版的採用裁定與一處我判錯的方向

**採用**（先例照第 140／141 條與 c-98 的處置）：
- **Casals**：7 軌含原盤四軌、曲序也對，中間插入 Elgar 協奏曲三軌。`originalTrackCount` 鎖 **4**。
- **Rubinstein**：**第二片正好是 LM-1905 七軌同序**。`originalTrackCount` 鎖 **7**，
  ⚠ **固定試聽已人工改指第二片首軌〈Funérailles〉**——第 1 軌是鋼琴協奏曲、屬第一片，取首軌會取錯（裁定 157 的形狀）。

**我判錯的方向值得記**：派工時我把 Joan Sutherland《Operatic Arias》配到的
《Finest Operatic Arias》（5 軌、appleYear 2016、盤名不同）判為「高度可疑」。
**研究層逐軌比對推翻了這個判斷**——那就是 1959 Decca SXL 2159 那次錄音。
**盤名不同＋軌數少＋年份差 57 年，三個訊號同時指向錯配，結果三個全是再發包裝造成的。**
（品項仍換成 1452135704：同一份錄音、七店面全有、copyright 是 ℗1959 Decca 本人。）

## 六、⚠ **要店主裁定：這條線的卡片年份記錄音年還是發行年？**

**40 張裡有 21 張的卡單年份不是錄音年**，而是復刻年、CD 整編年或再壓年。最極端的幾個：

| 卡 | 卡單年 | 那是什麼 | 錄音年 |
|---|---|---|---|
| Karl Richter《Johannes-Passion》 | 1992 | Archiv CD 復刻年 | **1964**（他 **1981 年已過世**） |
| Amadeus Quartet | 1989 | DG 三 CD 整編年 | 1964–1978（**團體 1987 年就解散**） |
| Kathleen Ferrier | 1961 | Decca 英國盤發行年 | **1952-05-15～05-20 維也納**（晚九年） |
| Celibidache | 1997 | EMI **身後**發行年 | 落在 1979–1996 之間 |
| Cortot / Thibaud / Casals | 1999 | **再壓年**（CD 首發 1988） | 1926–1928 倫敦（**三層結構**） |
| Schnabel《Complete Schubert》 | 2005 | 整編年 | 1932／1935／1937／1939／1950 |

**「Richter 1992 年的碟」與「Richter 1981 年已過世」擺在同一張卡上會讀不通。**

**雲端未改任何卡單值（裁定 141）**，`yearVerified` 逐張並列了三個數字
（MB 的 `first-release-date`、原始錄音年、卡單那個年份是什麼）。
**這是規格層級的問題，雲端不自決。** 店主裁定後本機再一次改完。

**卡單年＝錄音年、沒有落差的只有這幾張**：Schwarzkopf & Fischer-Dieskau（1968）、
Sutherland《Operatic Arias》（1959）、ABQ（1984）、Emerson（1988，**維基唱片清單記 1990**，兩說）、
Gilels（1974）、Michelangeli（1972）、Van Cliburn 兩張、Quartetto Italiano《D 887》（1978）、Budapest《Ravel/Debussy》（1953）。

## 七、策展層的時序／序數主張被攻破第九次：24 處，其中 6 處與來源相反

- **Toscanini《Manfred》「少數把整首錄完」**——維基明寫他演出與錄音時做過**多處刪節**。
- **Thibaud & Cortot 的錄音年「1929–1931」**——實為 **1927／1929／1942**；且第 13 軌的鋼琴是 **Tasso Janopoulo 不是 Cortot**。
- **「Thibaud 是 Ysaÿe 的學生輩」**——維基寫他是 Ysaÿe 的**朋友**。
- **三人「1930 年代因政治決裂後再未同台」**——最後一場是 **1933-05-13 史特拉斯堡**；Casals 流亡 1939、Cortot 任維琪職 1941–42，**都在之後六到九年**。
- **Van Cliburn《Rach 3》「RCA 特地把人請到紐約重錄」**——唱片背面印的是「**Actual Carnegie Hall Performance of May 19, 1958**」。
- **Grumiaux Trio「1967 年錄」**——實為 **1968 年 1 月（op.8）與 5 月（op.25）**。

**四位已故者的「生前最後」全部擋下**：Wunderlich（被冠上「最後」之名的是 DG 的
《Der letzte Liederabend》，**那是另一場**）、Ferrier（1952 年 10 月還與 Boult 錄過）、
du Pré（最後一次錄音室錄音是 1971 年 12 月的蕭邦／法朗克）、
以及 Szell／Kleiber／Celibidache／Richter 四位——**沒有任何來源這樣說**。

另擋下 18 處無來源的序數／最高級，其中兩處特別值得記：
**Michelangeli 的兩次葛萊美都是入圍不是得獎，而且入圍的是德布西與舒曼那兩張、不是本張**；
**Budapest 那張的「這個曲序後來成為固定配對」被本批第 18 張直接反證**（後來的慣例是德布西在前）。

## 八、四處資料層的錯誤（本機建檔時要注意）

- **Casals 那張 MB 的 artist-credit 有誤**：它把 Szell 掛在整張上，
  但〈Kol Nidrei〉那一半的指揮是 **Landon Ronald／倫敦交響**。
- **Celibidache 那張 MB 沒有 Live 標記卻確定是實況**（第 5 軌是 1:07 的掌聲）——**靠 `secondary-types` 判現場盤會判錯**。
- **Thibaud & Cortot 那張 MB 第 13 軌記成「Berceuse (from Dolly, Op. 56)」是錯的**，實為 Fauré 的 **Op. 16**。
- **Cortot《Victor Recordings》的 Discogs 把〈Grande Polonaise Brillante, Op. 22〉的作曲者掛成 Weber**，應為 Chopin。
- 另：**Schnabel 那套 Pearl 裡有兩份第四號協奏曲**，樂團名 MB 與 Discogs 不一致（Philharmonic vs Symphony）；
  **Fischer-Dieskau 那張 Apple 的卷號與 DG 黑膠盒是反的**（Apple 的「Vol. 2」才是本卡的《Volume 1》）。
- **Marian Anderson** 本張與 1957 年亞洲親善巡演、與那集紀錄片**只有盤名的關係**。

## 九、本機接手要做的

1. **先等店主對第六節那個年份問題的裁定**，再決定要不要整批改年。
2. 三軸與 rarity（§0.8 錨點制）、頂點資格評估。
3. 40 張寫進 `seed_cards.json`、封面與試聽寫進 `album_overrides`、KV 與 Firestore 回讀。
   **Rubinstein 那張的固定試聽要用〈Funérailles〉那一軌，不是首軌。**
4. 逐張審稿時對照 `desc-restyle/progress.json` 的**通論帳本**——雲端讀不到那個檔。
   本批 40 種切入型態的清單見兩支 hook 代理的交件紀錄。
