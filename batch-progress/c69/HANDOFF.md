# c-69 交接（2026-09-03）：美國私壓 SSW 與 loner folk 二線 38 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

**這是 c-67 起新一輪（店主指示「繼續策展 20 批次，回到日本、英國、美國等地的深度小眾
有趣的專輯，比如 Johnny's Disk 這種廠牌」）第一批走完雲端段的批次。**

## 一、這批是什麼

深掘線（`lineType: 深掘`，`scene: 美國私壓 SSW 與 loner folk 二線 1968–80`）。
**38 張、34 位藝人、零合輯、零跨批撞卡**。

| 組 | 年代 | 張數 |
|---|---|---|
| a | 1968–73 | 20 |
| b | 1974–80 | 18 |

Michael Yonkers、Terry Allen、Jim Spencer、Will Beeley 各兩張。

**這個場景的頂層原本就在池裡**（Fred Neil、Judee Sill、Karen Dalton、Vashti Bunyan、
Terry Callier、Linda Perhacs、Bill Fay、Connie Converse、Jackson C. Frank、Gary Higgins、
F.J. McMahon、Bob Desper、Ted Lucas、Jim Sullivan、Bobb Trimble、Kenneth Higney、Sixto Rodriguez），
這批挖的是**再往下一層**。策展層的判斷：Numero《Wayfaring Strangers》四張合輯的 60 位藝人
在池中僅 3 位——**這條線還很空**，剔除名單裡還有十餘張可在放寬再發門檻時撿回。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **31/38（82%）**，7 張要掃圖 | `c69/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條），`ratings.source` 記 `manual:depth-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **38 張全部寫完並過機器 QA** | `desc-tools/batches/output/c69-out-{1,2}.json` |
| 5. 固定試聽 | **34/38 ready（89%）** | `c69/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：38/38 釘住 release-group MBID，零人工身分卡

**但修正了一筆，而且修的是腳本不是資料**（裁定第 129 條）：

**Collie Ryan《The Giving Tree》被 `fix-rgmbid.mjs` 從 1973 原盤換成 2009 三合一套裝**
（`65c39f39…`《The Rainbow Records》），而策展層的 `mbNote` 白紙黑字寫著那是「對照組……**刻意不釘**」。
原因是兩層疊在一起：這輪回問 MB 時原盤那筆沒拿到，`found` 裡只剩對照組；
而對照組的標題與盤名**完全對不上**，卻靠「不是合輯 +3」「Album +5」的 8 分過關。

已在 `score()` 加兩道防線（既有 rgMbid 在 `mbNote` 裡卻沒查到 → 這輪不動；
替換既有值的候選**標題分必須 > 0**），卡單與 `caa.json` 已還原並重取封面（front 回 200）。

> **這支腳本三個月內第三次改**（第 28 條的清空、第 126 條的 EP、第 129 條的套裝）。
> 共同點都是**腳本把「查到了什麼」當成「策展決定錯了」的證據**。
> 往後它的定位收窄：只修 `make-cards-generic` 抽錯 MBID 那一種病，
> **策展層明寫的釘位，除非標題完全相等的更佳候選，一律不動。**

### 封面 31/38
**缺 7 張要本機掃圖**：Jim Ford《Harlan County》、Dennis the Fox《Mother Trucker》、
Will Beeley《Gallivantin'》、Robb Kunkel《Abyss》、Michael Yonkers《Grimwood》、
George Brigman《Jungle Rot》、Rick Saucedo《Heaven Was Blue》。

### 試聽 34/38（89%）——這條線目前最高
**34 張全在 `us` storefront。** 私壓 SSW 的再發權集中在美國考古廠牌
（Numero、Light in the Attic、Tompkins Square、Paradise of Bachelors、Anthology），
所以命中率遠高於歐亞的區域批。

**剔除一筆**（第 129 條）：**Maitreya Kali《Apache》配到《Apache-Inca》**
（2000，22 軌，兩張合一的再發）。依本機 09-03 對「二合一再發」的裁決（Ruhi Su 兩張退回封面），
**套裝的身分不釘、封面不用、試聽不採，三層口徑一致。**

## 三、研究層推翻策展層

**a 組**：Dave Bixby 壓量三說（500／1000／50）禁寫數字；Kaput 的「納許維爾」是**壓片地**非錄音地；
Mistress Mary 的 Whittier 查無；Jim Ford 的〈Harry Hippie〉**不在碟上**、Aretha 是「錄過」非「替她寫」；
Vernon Wray 的 Fat Possum 依第 66 條不採；Robb Kunkel 的「500 張／六個月」只在 blog；
Bill Wilson 的「25 美分」只在搜尋摘要。

**b 組七處硬錯**：Jimmy Carter 是**密蘇里**不是威斯康辛、錄音在 **BIBS** 而非納許維爾 Columbia（那是母帶）；
John Villemonte 是**威斯康辛**不是俄亥俄；Michael Yonkers《Grimwood》的 Sound 80 是**刻片**不是錄音、
且錄音在意外**之前**；Will Beeley 的 Malaco 是**發行製作體系**不是「代壓」、卡車是最後一站不是「近四十年」；
George Brigman「十八歲」查無來源；Donnie & Joe Emerson「17 與 19 歲」、Tree People「重組」「咖啡館」、
Jim Spencer 的 Numero 單曲皆查無來源。

**全部寫進各卡 `notes` 的禁止句，hook 與寫作層逐條遵守、一項未犯。**

**另收一筆新事實**：**Michael Yonkers 於 2026-04-20 過世**（The Current），兩張卡的 facts 已收。

## 四、同調風險的處理：互斥條款分派

38 張全是「自己壓、沒人聽見」的形狀，**不分派就會整批同調**。

- **「私壓／限量／沒人聽見」只判給六張**：a 組的 Tom Nehls（900 張泡水）、Dennis the Fox
  （跳針重壓、自黏封套）、Maitreya Kali（街頭手賣、零授權再發）；b 組的 Michael Yonkers
  《Grimwood》（500 張、25 美分出清）、Kenny Knight（存貨丟垃圾箱）、Donnie & Joe Emerson
  （壓 2000 銷毀一半）。**其餘 32 張的壓量數字只當發行事實，不得展開。**
- 其他分派：廠牌倒閉→Wendy & Bonnie；大企業出錢的廠牌→Robb Kunkel；盜版氾濫→Henske & Yester；
  藝人與廠牌衝突→Bob Frank；一晚錄完→Bill Wilson；「被 Numero 合輯收錄」→John Villemonte
  與 Jimmy Carter（Numero 廠牌敘事與 Cosmic American 標籤也歸 Carter）；臥室四軌→Gary Wilson；
  兩張 Terry Allen（版畫工作室→《Juarez》；Caldwell 錄音室與 Lloyd Maines→《Lubbock》）、
  兩張 Yonkers（意外敘述→《Goodby Sunball》）各自分開。
- **Tompkins Square／Guerssen／Eugene／Paradise of Bachelors 的廠牌史誰都不拿。**

## 五、五張「行文不得斷言發行年」

Dave Bixby《Ode to Quetzalcoatl》、Maitreya Kali《Apache》、Will Beeley《Passing Dream》、
John Villemonte《People Like You》、Terry Allen《Lubbock (On Everything)》。
簡介已照辦（《Lubbock》只寫 1978 年錄音、Villemonte 只用 2011 年復刻當錨點）。

另有四張 MB 只建了再發（Peter Grudzien、Jimmy Carter、Richard Crandell、Kenny Knight），
**rgMbid 只當身分鍵**（第 95 條），卡單年由 Discogs 原盤直記撐住。

## 六、「後來被主流注意到」三張的因果要寫準

**Gary Wilson**（Beck 在歌裡唱到他的名字 ≠ 因此走紅；點名年份 1996 只在 researchNotes、
未進 facts，簡介未寫）、**Donnie & Joe Emerson**（Fleischer→Ariel Pink 翻唱→紐約時報→電影，
維基只說「地下熱門曲」）、**Terry Allen**（David Byrne）。
**「被翻唱」沒有被寫成「因此走紅」。**

## 七、機器 QA

```
qa-batch.mjs research c69   38 張（full 34、thin 4）｜key 與卡單完全一致 ✓｜全部通過
qa-batch.mjs hooks c69      0 標記
chk-hook-crossgroup.mjs c69 38 張｜hook 加權 20–42｜note 312–349｜✓ 全部通過
qa-batch.mjs out c69        out-1 20 張 199–240｜out-2 18 張 224–235｜>260: 0｜合計 38 與卡單相符 ✓
qa-check-research.mjs       兩檔各 0 標記
fix-spacing.mjs             兩檔各待補 0
chk-prop.mjs                跨批撞卡 0
```

**四張 thin**（Deerfield、Sandy Harless、John Villemonte、Allan Wachs）——
生平查無署名線上來源，`notes` 明令不得補傳記，簡介只用逐軌 credit 與再發文案（皆標「再發文案說」）。

## 八、跨批去重

已過 `dedup-crossbatch.mjs`。上傳前務必再對現行卡池跑一次 `dedup-vs-live.mjs`。
