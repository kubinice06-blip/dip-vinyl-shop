# c-120 交接（2026-09-07）：紐約硬蕊與 90s straight edge，44 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

**⚠ 但這批有一件要店主裁定的事**（第三節）：**不開 §5.5 白名單的代價已經量化了**——
99 個 release-group、33 支團收不進來，其中 60 個的封面已經備妥。

## 一、這批是什麼

`EXPANSION-PLAN` F 線，`lineType: 深掘`（店主 2026-09-07 指定的第二條線）。

**44 張、35 位掛名、零 §1 人工身分、零跨批撞卡、44/44 釘住 release-group MBID。
年份 1984–2017。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 紐約硬蕊 | 22 |
| b | youth crew／straight edge：Revelation 系 | 22 |

**池中原本只有 5 張**（Bad Brains 3、Minor Threat 1、Quicksand 1），
骨幹其餘 26 位全零。與 **c-90**（1988–2003 台北地下）、**c-81**（SST／Dischord 圈）零交集。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **38/44（86%）** | `c120/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **44 張全部寫完並過機器 QA** | `desc-tools/batches/output/c120-out-{1,2}.json` |
| 5. 固定試聽 | **36/44（82%）**，命中 `us 35｜de 1` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**缺封面 6 張**（CAA 與 Apple 皆無）：Supertouch《The Earth Is Flat》、
108《Threefold Misery》、Turning Point《It's Always Darkest Before the Dawn》、
Mouthpiece《What Was Said》、Ressurection《I Refuse.》、Into Another《Ignaurus》。

**試聽從 28 補到 36**：研究層逐軌覆核回撈候選，**採信 23、駁回 14**；
**策展層宣告「三店皆 MISS」的 8 張裡有 5 張其實有完整上架版本**（裁定 173／185／248 的形狀）。
剩下 8 張是真的沒有。

**簡介的機器 QA**：`qa-batch.mjs out c120` 全過
（out-1 22 張 151–237、out-2 22 張 152–239、>260 零筆），`fix-spacing --write` 兩檔待補 0；
`qa-batch research/hooks c120` 全過、`chk-hook-crossgroup c120` 跨組開頭雷同 0 處
（hook 加權 16–34、note 268–349）。
主線一次性複驗：**44 張 `desc` 開頭與 `hook` 逐字相符**、**四位中文數字年 0 筆**、
**44 張全部落在所屬字數帶**（full 40 張、partial 4 張）、
**施工單洩漏 0 筆**（`⚠`／「不得寫」／「別寫」一個都沒進正文）。

## 三、⚠ 要店主裁定：**要不要為 hardcore 開 §5.5 白名單**

c-116 第 1 條提過這題、店主當時沒裁示，主線 2026-09-07 依裁定權下放的三條判準
**照 c-116 先例決定本批不開**。代價現在量化出來了：

| 項目 | 數字 |
|---|---:|
| 因 7 吋／split／demo 未收的筆數 | **101** |
| 唯一 release-group 數 | **99** |
| 涉及的團 | **33** |
| **其中 CAA 已回 200（封面備妥）** | **60** |
| CAA 404 | 39 |

**整支團一張都收不進來的有 9 支**：Chain of Strength、Inside Out(LA)、Raw Deal、
Krakdown、Outburst、The Icemen、Life's Blood、Straight Ahead、Side by Side。

**清單在 `c120/rulings.md` 第 4.1 節，逐筆附 `rgMbid` 與封面狀態——開白名單即可直接建卡。**

## 四、研究層擋下策展層 **44 張卡、124 處**（本輪單批最高）

a 組 59 處、b 組 65 處。最重的幾處：

| 卡 | 策展層寫的 | 實際 |
|---|---|---|
| AF《One Voice》 | 「解散前的最後一張」 | 之後還有 **10 張** secondary-types 為空的 Album |
| AF《One Voice》 | 「Roadrunner 在荷美同步發行」 | 美版是 Relativity 88561-3022-2、荷版 CD 是 Roadracer |
| AF《Cause for Alarm》 | 「Relativity 旗下 Combat Core 系列」 | **五個 release 沒有一筆掛 Combat Core** |
| Sheer Terror | 「1991 年由 Blackout! 補上」 | 1991 那筆是 **CD-R 且 label-info 全空**；掛 Blackout! 的是 **1993** |
| SOIA《BSNT》 | 「CD 把 1987 年的 7 吋併進去」 | CD 只多**兩軌**，那張 7 吋有**八軌**，只有〈Pete's Sake〉重疊 |
| Quicksand《Manic Compression》 | 「三店皆回 0 筆、整個查詢無結果」 | **1443511138 在 us／gb 都在**，十二軌一秒不差（裁定 248） |
| Integrity | 候選 1608635754 盤名掛名年份全對 | **十五軌全標「(2022 Mix)」**、℗ 2022（裁定 247） |
| Gorilla Biscuits | 99 軌「資料有誤」、42 軌「整編包」 | **首版 CD＋85 段隱藏索引**、**本張 14 軌＋27 軌靜音** |
| Ressurection | 「CD 把 1991 年的 7 吋併進去」 | 多出三軌**全無曲名**（含 22:37 的現場） |
| 108／Quicksand／Shelter | 序數三連錯 | 分別排第三、第二、第五 |

**系統性兩類**：
- **人名與地緣**：**30 張卡**寫了成員名、廠牌創辦人或區級地名（新澤西、長島、Cleveland、
  水牛城、Westchester），**實體欄位全查不到**——已逐張標「不得寫」，**簡介裡一個人名都沒有**。
  Sheer Terror 與 Born Against 的藝人實體 **disambiguation 都是空白的**。
- **序數與極值**：Cro-Mags《Best Wishes》「第二張」實排第 3、
  Token Entry「Positive Force 唯一一張紐約團的 LP」無從數起。

## 五、⚠ 軌數混版 **21 張**——本批最容易寫錯的欄位

硬蕊線的 CD 再發**幾乎一律把 7 吋 EP 併進專輯**，黑膠與 CD 軌數差 5–10 軌是常態。
**簡介一律引卡單所釘版本的軌數**，`note` 逐張寫明「只能引 N 軌」。

**⚠ 三種「軌數差」形狀不同，本機回看時不要一律當成「加了曲目」**：
- **Leeway《Born to Expire》的 11 軌是併軌**（接成一條 7:34），不是少一首。
- **Madball 日版是只缺末軌。**
- **Sheer Terror 11→15 是連原有十一首的長度都換過一套。**
- Alpha-Omega 8/9/10 只差〈VII〉1:19 與末軌拆不拆。

**另有 5 張採信的串流版本與卡單所釘版本軌數不同**（Alpha-Omega 9≠8、Leeway 21≠12、
Murphy's Law 13≠12、Sheer Terror 14≠11、SOIA 19≠17）——
**簡介一律沒引串流那一版的軌數與年份**，本機補資料時也不要引。

**b 組另有 4 張「限定用途」串流**（Bold 十三軌全標 2023 Remaster、CIV 十八軌是 2022 數位版、
Turning Point 缺原盤末軌、YOT《Break Down the Walls》是十三軌版）——
**可以當試聽來源，但不是原盤的證據**。

## 六、⚠ 載體：**三張不能寫「某年的黑膠」**

Murphy's Law 首張、Cro-Mags《Best Wishes》、Supertouch《The Earth Is Flat》
**實體欄位只有 CD 與數位**；另有兩張（Warzone《Open Your Eyes》、Born Against）
**只標「Vinyl」未標尺寸，不能自行補「12 吋」**。簡介已全部避開。

## 七、本機接手的順序

1. 三軸、rarity、頂點資格（§0.8 錨點制）。
2. **6 張缺封面要人工補圖**（見第二節）。
3. 上架 `seed_cards.json`、四處寫入與回讀。
4. **回看策展稿時請對照第四節那張表**——策展層有 44 張卡被擋下。
5. **§5.5 白名單那題若店主開了**，`c120/rulings.md` 第 4.1 節的 99 個 RG 可以直接建卡。
