# c-122 交接（2026-09-08）：紐約硬蕊與 straight edge 的 7 吋，43 張走完雲端段

**⚠ 這批上架前有一件必做的事**（第三節）：**§5.5 的舉證有 20 個站不住，要補齊。**

## 一、這批是什麼

**店主 2026-09-08 核定為 hardcore 開 §5.5 白名單（`hardcore-7inch`）之後才成立的批。**
c-120 那批因為白名單沒開，**101 筆／99 個 release-group／33 支團全退到未收清單**——
**這批就是把那份清單建成卡。**

**43 張、33 位掛名、零 §1 人工身分、零跨批撞卡、43/43 釘住 release-group MBID。
年份 1983–1999。`releaseType`：EP 40／Other 1／Album 2。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 紐約硬蕊 7 吋與 demo | 23 |
| b | youth crew／straight edge 7 吋 | 20 |

**⚠ 九支「c-120 全滅」的團收回八支**：Chain of Strength 2、Inside Out、Raw Deal、
Krakdown、Outburst、The Icemen、Life's Blood、Side by Side。
**Straight Ahead 開了白名單仍收不到**——它三個 release-group 的**唯一 release 全是 Bootleg**，
依裁定 43／57 不收。**那不是白名單能解決的**（已更正 c-120 第 1 條）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **40/43（93%）** | `c122/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制 | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **43 張全部寫完並過機器 QA** | `desc-tools/batches/output/c122-out-{1,2}.json` |
| 5. 固定試聽 | **23/43（53%）**，全部命中 `us` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**缺封面 3 張**（Raw Deal、The Icemen、Alone in a Crowd / Inside Out split）
——**三張都是「整支團唯一收得進來的碟」**，依 c-120 第 3 條收下並在 `curatorWhy` 寫明。

**試聽從 5 補到 23**：7 吋幾乎不在串流上，研究層逐軌覆核回撈候選，
**採信 23、駁回 21**；**其中 3 筆是裁定 248 的反向撈回**（策展層判「找不到」實測就是本張）。

**簡介的機器 QA**：`qa-batch.mjs out c122` 全過
（out-1 23 張 148–221、out-2 20 張 154–230、>260 零筆），`fix-spacing --write` 兩檔待補 0；
`qa-batch research/hooks c122` 全過、`chk-hook-crossgroup c122` 43 張全過
（hook 加權 12–31.5、note 305–350）。
主線一次性複驗：**43 張 `desc` 開頭與 `hook` 逐字相符**、**四位中文數字年 0 筆**、
**43 張全部落在所屬字數帶**、**施工單洩漏 0 筆**、
**那 12 張不是 7 吋的碟，正文裡「7 吋」0 次**。

## 三、⚠ 上架前必做：**§5.5 的舉證有 20 個站不住**（裁定 257）

**109 個舉證網址實測全部回 200、0 個打不開**，但**逐頁讀過之後有 20 個站不住**：

| 形狀 | 例 | 數 |
|---|---|---:|
| **轉址落到不相干的條目** | Judge 掛 `Schism_Records`，**轉址後是一位樂手的個人傳記** | 1 |
| **通用類別條目** | `Youth_crew` ×2、`Straight_edge`、`Krishnacore`、`Split_album` ×2 | 6 |
| **消歧義頁** | Quicksand 掛 `Quicksand_(band)`，正解 `Quicksand_(American_band)` | 1 |
| **被本張自己的曲目推翻** | Bulldoze《Remember Who's Strong》掛 `Split_album`，**本張根本不是 split** | 1 |
| **完全不支持** | **Absolution 與 Maximum Penalty——兩張的兩個非資料庫網址全都不支持**，且兩團都沒有專屬條目 | 4 |
| 其餘偏弱或不支持 | | 7 |

**`chk-prop` 只檢查「是不是兩個 HTTPS 網址」，驗證器也只檢查數量——
沒有任何一道自動檢查會讀那個頁面。**
**上架前要補齊，否則白名單的舉證形同虛設。**

## 四、⚠ 這批的載體：**43 張裡有 9 張不是 7 吋**

| 載體 | 碟 |
|---|---|
| **CD** | Judge《There Will Be Quiet...》、Earth Crisis《Firestorm》、Snapcase《Steps》、**108 兩張（德國壓片，不是美國發行）**、The Icemen、Crown of Thornz、Breakdown |
| **卡帶** | Raw Deal |
| **形態欄只寫「Vinyl」、沒有尺寸** | Gorilla Biscuits 同名碟、Sick of It All、Quicksand——**不得自行補「7 吋」** |

**簡介已逐張守住**（主線複驗：那 12 張的正文裡「7 吋」0 次）。

## 五、⚠ 併軌：**軌數不等於歌數**

- **Sick of It All：八條溝唱十首。**
- **Earth Crisis《Firestorm》：三軌底下四個歌名。**
- **Chain of Strength《One Thing》：十軌底下十一個歌名**（把〈Never Understand / Let Down〉
  併成一條 4:03）。

**寫成「N 首歌」就錯。** 簡介已逐張分開敘述。

## 六、研究層擋下策展層 **43 張卡、141 處＋22 處警告**（a 78／b 63）

最重的幾處：

| 卡 | 策展層寫的 | 實際 |
|---|---|---|
| Breakdown《Blacklisted》 | 「重組後把 1987 那捲 demo 正式錄成唱片」 | 1987 九軌與本張六軌**重疊為零** |
| Gorilla Biscuits 同名碟 | 「CD 版把 1987 demo 併進來」 | CD 多出的五軌與 demo **零重疊**，demo 的兩軌在任何版本上都不存在 |
| Alone in a Crowd / Inside Out | 「兩支團對切」 | 1989 那張四軌 **artist-credit 全是 Alone in a Crowd**；另一團的三軌只在 1994 CD 上。**且合掛的是紐約那個 Inside Out，不是加州** |
| Madball《Ball of Destruction》 | 1997 CD 的 23 軌「把早期 EP 併進來」、廠牌 In-Effect | **原盤 8 軌＋14 段現場＋1 段 3 分 11 秒電台訪談**；廠牌是 **Century Media（7830-2、DE）** |
| Cause for Alarm | 「後來被 Another Planet 併成 CD」 | **查無此廠牌**，實體記的是 **Victory（VR019 CD）** |
| Vision of Disorder《Still》 | 「**紐約的** Striving for Togetherness」 | 廠牌實體 area 是 **Bayreuth**、country 空 |
| 108／Judge／Chain of Strength | 三處序數 | 108 其後還有五筆含四張 Album；Judge 其後還有《No Apologies》；Chain of Strength 的〈Impact〉**不在那兩張 7 吋上** |

**系統性兩類**：人名擋下 5 張的具名成員（實體欄位全查無）；
區級地名擋下 8 處（Lower East Side ×3、長島 ×2、Yonkers、紐澤西）。
**唯二可寫的地名是 Rorschach 與 Neanderthal 的 begin-area**（New Jersey／California）
——那兩個在實體欄位查得到。

## 七、⚠ 採信的 collectionId 大多不是所釘那版的證據

a 組 11 筆採信裡 **8 筆是整編或不同軌數版**；b 組 12 筆**全部帶限定**。
簡介一律沒引那些版本的軌數與秒數，**本機補資料時也不要引**。

**Warzone《Live At CBGB》的演奏日期是 1992-12-20**（比發行年早一年），研究層查到的，可用。

## 八、本機接手的順序

1. **⚠ 先補齊第三節那 20 個舉證**——這是白名單批的成立條件。
2. **⚠ 卡單的 `genreException` 欄位**：裁定 258 修好 `make-cards-generic.mjs` 之後，
   本批 **41/43 張帶上了**（另 2 張是 `primary-type=Album`，本來就不該有）。
   **但 c-97／c-118 那些較早的 §5.5 批沒有這個欄位**，組 manifest 時要從各批的 `prop-*.json` 補。
3. 三軸、rarity、頂點資格（§0.8 錨點制）。
4. **3 張缺封面要人工補圖**。
5. 上架 `seed_cards.json`、四處寫入與回讀。
