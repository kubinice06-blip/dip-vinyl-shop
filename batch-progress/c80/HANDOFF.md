# c-80 交接（2026-09-04）：英國 neo-prog 與自主發行二線 1980–86，39 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線（`lineType: 深掘`，`scene: 英國 neo-prog 與自主發行二線 1980–86`）。
**39 張、28 位藝人、零 §1 人工身分、零 §4 封面例外、零跨批撞卡、39/39 釘住 release-group MBID。**

| 組 | 場景 | 張數 | 年份 |
|---|---|---:|---|
| a | 第一波 neo-prog 與 DIY 自壓 | 19 | 1980–1983 |
| b | 中期小廠、樂團自營廠牌與私家版 | 20 | 1984–1986 |

**這批的廠牌極度分散**：39 張分屬 35 家，其中 **5 張是 `Not On Label` 的自壓**
（Third Quadrant、Haze、Treatment ×2、Gothique、Abel Ganz ×2），其餘多是只出過幾號的自營廠牌。

`fix-rgmbid` **修正 0**——策展層 39 張全部原本就對。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **33/39（85%）**，6 張要掃圖 | `c80/caa.json`、`c80/caa.log` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條），`ratings.source` 記 `manual:depth-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **39 張全部寫完並過機器 QA** | `desc-tools/batches/output/c80-out-{1,2}.json` |
| 5. 固定試聽 | **15/39 ready（38%）**，**命中全部在 `gb`** | `c80/previews.json`、`c80/previews.log` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**試聽只有 38%**：自壓與只出過幾號的自營廠牌整份目錄沒進串流，本機不必逐張重試。

## 三、探測層被研究層推翻三處——**三處的處置方式都不一樣，差別本身是重點**

研究層 b 組推翻我在探測層寫下的三個判斷，主線**逐一開
`release?release-group=<id>&inc=recordings` 回問 MusicBrainz 覆核**後才落地：

| 卡 | 我在探測層寫的 | MB 覆核結果 | 處置 |
|---|---|---|---|
| Castanarc《Journey to the East》 | `originalTrackCount: 8`、「8 軌連號、非二合一」 | **1984 GB 原盤 7 軌**；1987 GB／1991 US／2019 XW 各 8 軌，多的是〈Rhyme〉，**而且 1984 那筆的曲序與其餘三筆完全不同** | **改值**：8→7，補 `expandedReissue` |
| Robert Calvert《Freq》 | `originalTrackCount: 11` | 1985 GB 黑膠 MB 索引 **11 軌**（六首歌與五段編號 Talk 交錯）；研究層查得原盤封套曲目表**只列六首**，五段罷工糾察線訪談沒印進曲目表 | **不改值，加限定語**：兩個數字各有來源、彼此不衝突（第 127 條附錄），補 `originalTrackCountSource` 欄 |
| The Enid《The Stand》 | 探測層與策展層都當**錄音室專輯** | 原盤註記明寫是 **1983-10-24／25／26 三晚在曼徹斯特 Band on the Wall 的現場錄音**；MB 的 release 與 release-group 兩端點 `annotation` 皆 null、secondary-types 空 | **不改欄位，改行文約束**：`releaseType` 是 MB primary-type 的鏡射（第 136 條），現場錄音寫進研究層的行文約束 |

**這就是第 144 條**：下游推翻上游時，最容易犯的錯不是不信他，
**是信過頭把他的數字直接覆蓋上去**。Freq 那一筆若照改，會把一個有來源的數字換成另一個有來源的數字，
兩邊都對，而卡片變得沒有來源。

## 四、第 145 條就是從這批立的：**全批統計量不入文**

c-80 的卡帶張數，三層各數出一個數：**策展層 13、a 組研究 14、b 組研究 12**。
主線粗掃三個欄位得 14，但那 14 筆裡有 Peter Hammill《A Black Box》這種**黑膠原盤、只是註記提到另有卡帶版**的。
**三個數字的差別不在誰數錯，在「算不算卡帶」的定義各自不同。**
裁定：**全批層級的統計量一律不得入文**，每張卡只寫自己那一張的形制並帶自己那筆的來源。

## 五、第 146 條也是從這批立的：**分派的措辭本身可以違反被分派那張卡的禁令**

Geoff Mann《I May Sing Grace》的同藝人分工段寫「《Chants》寫……**他妻子** Jane Mann 的演出掛名」，
但《Chants》**自己的禁令明文禁止**推論兩人關係（facts 只有兩個同姓的 credit）。
寫作層依「該卡自身的禁令優先」處理，只寫掛名的樂器與人聲。**主線已往上游修**
（`c80-b.json` 與 `c80-writer-2.json` 兩處都改成中性指稱）。
**分派是路標，不是內容——路標上多寫的每一個字，都會被當成已經查證過的事實運走。**

## 六、下游層層攔下的東西

**hook 層**
- **兩處機器掃不到的同構撞線**（第 131 條）：Third Quadrant 兩張與 b 組都用「這家廠牌底下只有 N 筆發行」；
  Quasar 與 Robert Calvert《Hype》都用刻紋。
- **讀反的 hookCandidate**：Quasar 的「一句抱怨、一句慶功」——facts 原句是 “THIS ONE WASNT A PIG TO CUT”，
  **讀成抱怨與事實相反**，棄用。
- **facts 撐不住的分派**（第 130 條）：Treatment 的「整捲掛名沒有一個是本名」（同名兩處）、
  Multi-Story《East West》的「一家**中部的重搖滾**廠牌」（facts 只有公司名與 Wolverhampton）。
- **自算的數字**（第 64 條）：Voltz 的「三十六年後」（2018−1982）。
- **b 組指出研究稿 `sound` 欄一處區間歸納錯誤**（Abel Ganz《Gratuitous Flash》「〈The Dead Zone〉一首就吃掉 B 面」
  ——B 面還有 6:23 的同名曲），並建議**回頭修 `sound` 而不是只在 note 下禁令**，
  理由是 `sound` 也會送到寫作層。**主線照做了。**

**寫作層（第 135 條，兩組各攔兩處）**
| 卡 | `sound` 寫的 | 逐項數過 |
|---|---|---|
| Solstice《Silent Dance》 | 七首裡有五首超過四分半 | **六首**（只有 4:07 在線下）→ 整句拿掉 |
| Haze《C'est la vie》 | 最短的〈Rogers Revenge〉3:41 | **最短是末軌〈Gabadon〉3:37** → 整句拿掉 |
| Third Quadrant《N = R*…》 | 五首都超過四分半 | 成立，但**仍改寫成逐項端點值** |
| The Long Hello Vol.2 | 全碟沒有一首超過五分鐘 | 成立，但**仍改寫成逐項端點值** |

a 組另自抓一處**指代錯誤**：《Loops & Reels》初稿寫「前面那兩首拿到 Crescent 混音」，
按原句序會指到錯的曲子，已改成先列曲名再用「後兩首」承接。

## 七、機器 QA 結果

```
node desc-tools/qa-batch.mjs research c80          a 19／b 20，key 與卡單完全一致 ✓
node desc-tools/qa-batch.mjs hooks c80             0 標記
node desc-tools/chk-hook-crossgroup.mjs c80        2 組｜39 張｜hook 加權 17–39.5｜note 321–350｜✓ 全部通過
node desc-tools/qa-batch.mjs out c80               out-1｜19 張｜字數 215–235
                                                   out-2｜20 張｜字數 218–235
                                                   合計 39 張，與卡單相符 ✓，>260: 0
qa-check-research（兩檔各一次）                      各 0 標記
fix-spacing（兩檔各一次）                             待補 0
```

**「未具名出處」燈兩組都是零**，且**不是靠刪內容關的**（第 143 條）：
a 組的 facts 裡本來就沒有榜單／獎項類材料；b 組唯一的當年樂評是
Paul Roland《Burnt Orchids》的《Music Week》1985-09-28 唱片評論，**媒體名與日期都寫進正文**，
不落在該規則的形狀裡。其餘有來源但敏感的內容（Calvert 1988 年去世與墓碑上的莎士比亞詩句、
Freq 的罷工糾察線訪談、Wobbly 目錄那二十九年空窗）**全部照寫，一筆未刪**。

## 八、本機還要做的事

1. **掃 6 張封面**（`c80/caa.log` 的「無圖」列）。
2. **三軸與 rarity**、**頂點資格判定**——照 §0.8 錨點制。
3. **四處寫入與回讀**（`seed_cards.json`／`apex_pool.json`／KV／Firestore），雲端不碰。
4. **上架前逐張讀 `previews.json` 的 `note`**——本批三張的軌數與分類有限定語，
   尤其 **Castanarc 不得照 Apple 的八軌曲序敘述原盤**、**Freq 寫任何軌數都要註明是哪一種來源**。
