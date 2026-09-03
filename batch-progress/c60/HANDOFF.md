# c-60 交接（2026-09-02）：深掘搖滾與迷幻 49 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

**這是排程表上的最後一批**（店主指示「做滿 60 批」）。

## 一、這批是什麼

深掘線的第三批（前兩批是 c-58 靈魂與放克、c-59 硬蕊爵士）。
深掘線問的不是「哪個國家不在池裡」，而是「**這個曲風的非正典那一端在不在池裡**」。

**49 張、49 位藝人（零重複）**，年份 1967–1981，兩組：

| 組 | 線 | 張數 |
|---|---|---|
| a | 北美私壓 psych／prog／loner folk-rock（美國 22、加拿大 4） | 26 |
| b | 北美以外：英國私壓 3、德語圈 4、義大利 3、法／比 3、荷蘭 2、北歐 4、澳紐 2、日本 2 | 23 |

曲風 rock 為主，並列 folk／electronic／jazz。**49 張全部有考古廠牌的再發舉證。**

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **46/49（94%）**，3 張要掃圖 | `c60/caa.json` 的 `art` 欄 |
| 2. 三軸與 rarity | **雲端未做**（需 `/album-rating`），且見第三節 | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **49 張全部寫完並過機器 QA** | `desc-tools/batches/output/c60-out-{1,2}.json` |
| 5. 固定試聽 | 已探測，**24/49 ready（49%）** | `c60/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**封面 94% 與試聽 49% 都是本次擴充八批以來最高。**

### 身分：49 張全部釘住 release-group MBID，零人工身分卡

策展層每筆的 MBID 都經 `release-group/<id>` 回問確認過，
`fix-rgmbid.mjs` 複驗 48 張原本就對、修正 0。
剩下 1 張（Josefus《Dead Man》）該次回問失敗，**已單獨重查確認**
標題、primary-type、first-release-date、artist-credit 全部相符——
是裁定第 28 條說的暫時性失敗，不是查無。

### 封面：46/49，全部來自 CAA

**3 張缺封面**（要掃圖）：Stone Harbour《Emerges》、Elyse Weinberg《Elyse》、
Smegma《Glamour Girl 1941》。

### 試聽：24/49 ready

九個 storefront（us／ca／gb／de／fr／it／se／nl／jp）全試過。
49% 高於 c-58 的 42%——**考古廠牌把這些碟放上串流的比例確實高**，
這與第三節的 obscurity 機制是同一件事的另一面。

## 三、obscurity 軸的問題在這批同樣成立

見 `c58/HANDOFF.md` 第二節。簡言之：`ALBUM_ONBOARDING.md` 沒有寫
obscurity 1–5 的文字定義，§3 把 pearl 綁在 **Last.fm listeners 低於 300**，
所以這個軸實質上是聽眾數驅動的——而**考古廠牌的再發會製造聽眾數**。

**「證明這張碟重要」的證據會同時壓低它的冷門度分數。**
加卡不會讓 `obscurity=5` 變多，深掘線補的是**曲風的實質深度**。

**要不要重新校準那個軸是店主的決定**，雲端不動線上資料。

## 四、上架前必須先看 `rulings.md`

主檔在 `c53/rulings.md`（**64 條**，c-53 至 c-60 共用）。
**第 43–64 條全部是這批立的**，其中這幾條直接影響本機操作：

1. **第 43 條：考古廠牌的再發只有標 Official 時才算背書。**
   未授權復刻證明的是「有人想賣這張碟」，不是「有機構認定它值得重發」。
   已據此剔除 Relatively Clean Rivers（所有再發皆未授權）。
2. **第 57 條：授權的判定單位是「這一次再發」，不是「這家廠牌」。**
   Sunbeam Records 在 Fresh Maggots 是正式授權方，在 The Human Instinct
   《Stoned Guitar》的三筆卻被 Discogs 標未授權。**沒有可信廠牌白名單。**
   全批授權狀態分歧的有 7 張（Dark、Fresh Maggots、Kalacakra、Xhol Caravan、
   Human Instinct、Taj Mahal Travellers、Tolerance）。
3. **第 45 條：Debris' 的碟名採《Static Disposal》——這條是新開的一款規則，
   列為待店主確認。**
   1976 年的原盤其實是**自我同名的《Debris'》**，「Static Disposal」是**廠牌名**；
   1999 年 Anopheles 復刻起才拿它當盤名，MB 也採後者。
   收《Static Disposal》的理由不是「原名查不到」（第 6 條已駁回這個理由），
   而是走原名會造出一張 §1 明文要求避免的「自我同名＋無試聽」卡，
   且 `queryAlias` 是**藝人層級**欄位、裝不下盤名的替代寫法。
   **若店主認為原名優先，改回《Debris'》即可**——rgMbid 不變、封面不受影響，
   只會掉試聽。
4. **第 46、51 條：三張年份的處理。**
   Mystic Siva（卡單 1971／MB 1972／坊間 1970）與 Elyse Weinberg
   （卡單 1969／MB 1968 是 test pressing）**行文不斷言發行年**；
   Group 1850 採 **1968**（Discogs 原盤 Philips 844 083 PY，非 MB 的 1969）。
5. **第 50、52 條：寫法的兩條分界。**
   盤名的標點與重音**採原盤封面**（The Outsiders 是《C.Q.》不是《CQ》）；
   團名的大小寫**採樂團與廠牌的現行寫法**（`Träd, Gräs och Stenar`、
   `Älgarnas Trädgård`）。理由是團名是持續存在的主體的名字，會隨主體自己的用法演變。
6. **第 47 條：Sloche、Chrome、MX-80 Sound 三張不是私壓**，
   行文已明文避開「自資壓片」。深掘線的判準是「非正典」，不是「自己出錢壓的」。

## 五、雲端替本機省下的事，與一筆線上卡池的缺陷

### 別重查這 49 張的身分與再發史

策展層與研究層各自實查過兩遍，**412 條 facts 全部帶可開啟的 HTTPS src**，
再發的授權狀態逐筆記在 fact 裡。

### 一張跨文字系統的撞卡（裁定第 49 條）——**這件事本機要處理**

策展層提了 **灰野敬二《わたしだけ？》(1981)**，`chk-prop` 與我補跑的鬆散去重
**兩道都判定沒撞卡**。實際上池中早就有這張碟：**`Keiji Haino`《Watashi Dake?》**。
一邊原文字、一邊羅馬拼音，**任何字串比對都判不出是同一張**。該卡已剔除。

順帶抓到的線上資料缺陷（記在 `audits/pool-artist-name-splits.md`）：

1. **`Keiji Haino`《Watashi Dake?》年份記 2017，但那是 Black Editions 的再發年**，
   原盤是 1981 年 Pinakotheca 的盤。依既有年份政策**應改記 1981**。
2. 池中另有 `不失者`《不失者 (Double Live)》用**原文字**掛名，與前者的羅馬拼音並存。
   **兩者不該合併**——不失者是灰野敬二領軍的**樂團**，不是他的別名，
   藝人張數上限應分開計。但同一個池子裡兩種文字並存本身就該統一。

**建議處理順序**：先改年份（獨立且明確），再決定掛名要不要改成原文字
（會動到卡片鍵，影響 KV 與 Firestore）。

### 研究層推翻策展層七處會直接寫進簡介的說法

| 卡 | 策展層寫什麼 | 實查 |
|---|---|---|
| Music Emporium | 含**女性**風琴手 Casey Cosby | Casey Cosby 是團長 Bill「Casey」Cosby，**男性** |
| Music Emporium | 在**自設廠牌** Sentinel 壓 | Sentinel 是製作人 **Jack Ames** 的獨立廠牌 |
| Michael Angelo | 透過**德州**客壓廠 Guinn | Guinn 在**密蘇里州北堪薩斯市** |
| Mystic Siva | 底特律的**三人團** | 四人 |
| Dark | 諾丁罕 | **Northampton** |
| Aksak Maboul | Kamikaze 是 Hollander **自資的廠牌** | 是製作人 **Marc Moulin** 的廠牌 |
| Brainticket | 在**瑞士組成** | 以瑞士為據點的**跨國團** |

**本機改寫簡介時不要把這七條改回去。**

另有一筆方向相反的更正要記：策展層說 Stone Harbour 的 1991 年奧地利 IS 610
是未授權盤，**Discogs 上並沒有這個標記**（裁定第 55 條）。
第 43 條可能往兩個方向誤用，兩種都會誤判一張碟的分量。

## 六、簡介產線的數字

| | out-1 | out-2 | 合計 |
|---|---|---|---|
| 卡數 | 26 | 23 | **49** |
| 字數範圍 | 219–235 | 223–235 | 219–235 |
| 超過 240 | 0 | 0 | **0** |
| `qa-check-research` | 0 | 0 | **0** |
| `fix-spacing` | 0 | 0 | **0** |

`qa-batch out c60` 與卡單 49 張相符、>260 為 0。
`chk-hook-crossgroup c60` 通過（hook 加權 18–45、note 320–350）。
key 順序與輸入一致、hook 全部原封當第一句。
研究層 **49 張全部 `status: full`**（零 thin），facts 412 條、非 HTTPS src 0。
無合輯，不涉 §5.6 例外。

### 兩張沒有曲名的卡（裁定第 56、60 條）

**Charlie Tweddle《Fantastic Greatest Hits》**與
**Taj Mahal Travellers《August 1974》**的原盤四面**本來就沒有曲名**
（Discogs 逐軌登錄 Untitled），`keyTracks` 留空、簡介全篇零曲名。

**「作品本身沒有曲名」與「查不到曲名」要分清楚**——後者是 thin 的理由，
前者不是，這兩張仍是 `full`。**本機補資料時不要替它們補曲名。**

### hook 重複的問題是結構性解決的

49 張全都有考古廠牌再發史，照字面寫會全批一個樣。

- a 組 26 張裡只有 **7 張**的 note 帶再發條款，而且七種機制各不相同
  （從原始母帶／翻出第一代混音帶／母帶已不存改拿未拆封原盤轉錄／
  母帶在柏林工作室被找出／沒有母帶直接從黑膠轉錄／復刻照樣沒有曲名／
  歐洲流通幾乎全未授權）。其餘 19 張改用各自獨有的實體錨點。
- b 組 23 個 hook 落在 **23 種不同機制**上，再發史一律降到 note 末段、只有 4 張帶條款。
  最容易撞形狀的「封套物件」那一群拆成五種互不重疊的機制。
- **Nurse With Wound 名單涵蓋 b 組 8 張，只讓 2 張引用**（裁定第 58 條）——
  Tolerance 有硬因果（NWW 1980 年那張的標題取自《Anonym》封套題獻），
  其餘六張的 facts 刻意不供料。

## 七、這批立的規則裡，對往後最有用的一條

**第 61 條：管線裡每一個「歸納欄」都可能背離 facts，而檢查器全部抓不到——
因為它們自己就在比對用的 blob 裡。**

已知三個：`sound`（第 41 條，c-57 抓到寫錯班底）、
`notes`（第 42 條，c-57 抓到引用了 facts 沒有的人名）、
**`hook`（第 61 條，這批抓到 hook 斷言的事實是錯的**——
Josefus 那張的 hook 寫「B 面只有一首歌」，但 B 面實為兩軌）。

**「hook 原封不動」的前提是 hook 正確。** hook 與 facts 衝突時要改的是 hook，
寫作層省略材料只會把錯誤藏起來、卡片的第一句仍然是假的。
