# c-65 交接（2026-09-03）：私壓電子、磁帶實驗、圖書館音樂與早期電腦音樂 44 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線第七批（`lineType: 深掘`）。**44 張、44 位藝人、零跨批撞卡**。

| 組 | 場景 | 張數 |
|---|---|---|
| a | 私壓電子與磁帶實驗 | 24 |
| b | 圖書館音樂與早期電腦音樂 | 20 |

原提案 47 張，**因跨批撞卡降為 44**（裁定第 119 條的 `dedup-crossbatch.mjs`）。
合輯 3 張（Michele Mercure《Beside Herself》、Chappell 選輯、Hiller《Computer Music Retrospective》）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **42/44（95%）**，2 張要掃圖 | `c65/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條），`ratings.source` 記 `manual:depth-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **44 張全部寫完並過機器 QA** | `desc-tools/batches/output/c65-out-{1,2}.json` |
| 5. 固定試聽 | **20/44 ready（45%）** | `c65/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：44/44 釘住 release-group MBID，零人工身分卡

### 封面 42/44
**缺 2 張要本機掃圖**：Nocturnal Emissions《Tissue of Lies》、Tod Dockstader《Eight Electronic Pieces》。

### 試聽 20/44（45%）
`us` 9、`gb` 6、`jp` 3、`de` 1、`ca` 1。另有 1 張「有碟無預覽」、23 張各 storefront 皆無。
比例低是這條線的本質——私壓與圖書館音樂本來就少有串流授權，這正是收錄理由。

## 三、**本機三軸評分要先看的兩件事（§0.8）**

研究層挖到兩件事，會直接推翻「私壓＝冷門」的直覺，**評 obscurity 前務必先讀**：

1. **Craig Leon《Nommos》**：原盤 Takoma **有全國配銷**、Leon 本人自估賣約 **15,000 張**。
   **這不是無人聽過的私壓。** 另外 2013 Superior Viaduct 復刻雖無 Unofficial 標記、
   是向 Concord 取得的合法授權，但**作者本人未被徵詢**——
   **授權乾淨與作者同意是兩件事**，簡介裡已分開講，評分時也要分開看。
2. **Michael Garrison**：500 張自壓盤**隔年就被 Ariola 在德荷正式發行、重壓到 1987 年**。
   **「原盤流通冷門」那層不成立。**

## 四、研究層推翻策展層 19 處

**a 組 10 處**：J.D. Emmanuel 的器材（Crumar Traveler One ＋ Yamaha SK-20 ＋ 三台 Pro-One，
不是兩台 Korg ＋ 磁帶延遲）、Beverly Glenn-Copeland（Huntsville 的 Audio-Logic 錄音室，
不是休倫湖畔小屋；壓量 200／500 兩說並存）、Zoviet France《Mohnomishe》封套
（兩片 Masonite 硬板＋繩，不是麻布）、Esplendor Geométrico 與 Konstruktivists 的「首張」序數
（都是第二張）、Michael Garrison（確為首張，策展誤寫第二）、Bernard Xolotl
（Steve Roach 參與查無來源；原盤是卡帶）、Robert Turman（單捲 C60，不是雙卡帶）、
Bourbonese Qualk（**占據**救護車站，不是經營）、Doris Norton（IBM 合作在本作**之後**）。

**b 組 9 處**：Hawkshaw／Mansfield 沒有「各寫一面」的佐證、Macchi 是 1967 年**加入**
（非創始）Nuova Consonanza、Kirchin 錄的是**動物園動物與自閉症孩童**（非昆蟲鳥類）、
Dockstader 沒有洛杉磯與「夜間空檔」、Ruth White 的 Rhythms Productions 是**她自己創辦**、
Subotnick 查無「蘇美古詩」、Monkman 那張的 IC 版查無 Klaus Schulze 掛名、
Umiliani 查無 EMS／Moog 機型、Chappell 合輯的兩個「第一次」查無來源。

**十九處全部寫進各卡 `notes` 的禁止句，hook 與寫作層逐條遵守。**

## 五、同調風險的處理：互斥條款分派

這批 44 張全是「自己壓、沒人聽見」的形狀，**不分派就會整批同調**。研究層與 hook 層
逐張指定了獨有錨點，並在每張 `note` 寫明「本卡禁用哪條線、判給了誰」：

- **a 組**「私壓／自資／限量」只判給三張：**The New Blockaders**（100 張、無廠牌無編號）、
  **Le Forte Four**（200 張、手工黏貼封面）、**Michael Garrison**（作為反例）。
  其餘 21 張各用器材規格表、封底咒語詩、唱針警告、無限溝、Masonite 硬板、化名造字、
  虛構身分、括號「沒有合成器」、占據救護車站等。
  Schnitzler（500）、Bianchi（227）、Nocturnal Emissions（500）、Esplendor Geométrico（500）
  的壓量數字**明令不寫**。
- **b 組**「原盤不對外零售、只發給廣播與影視業者」只判給兩張，且**文字來源不同**：
  《Jazzrock》用 KPM 原盤背標的轉錄盤條文、《Big Beat》用 De Wolfe 廠牌頁的說法。
  哥倫比亞—普林斯頓三張各自分開（Dodge 寫大學電腦中心、Dockstader 寫被回絕、
  Mimaroğlu 寫全部作品在該中心完成），**未互換**。

## 六、年份敏感的三張（`yearVerified` 有記，簡介已照辦）

- **Cecil Leuter《Pop Electronique》** 維持卡單 1969，但 Discogs 原盤註記與 Neuilly 廠牌
  成立年都指向 1970 以後 → **全篇不出現發行年**，時間只寫到「1960 年代末」。
- **Macchi《Bioritmi》** 取 1971（維基作 1979，三個來源作 1971）→ 不斷言發行年。
- **Hiller《Computer Music Retrospective》** 維持 1986（MB 只建了 1989 重發那筆）
  → 作曲年／錄音年／1986 分三層寫。

## 七、機器 QA

```
qa-batch.mjs research c65   44 張全 full｜key 與卡單完全一致 ✓｜全部通過
qa-batch.mjs hooks c65      0 標記
chk-hook-crossgroup.mjs c65 44 張｜hook 加權 17–38｜note 311–350｜✓ 全部通過
qa-batch.mjs out c65        out-1 24 張 224–239｜out-2 20 張 222–235｜>260: 0｜合計 44 與卡單相符 ✓
qa-check-research.mjs       兩檔各 0 標記
fix-spacing.mjs             兩檔各待補 0
```

## 八、跨批去重

已過 `dedup-crossbatch.mjs`，與 c-52…c-66 其餘未上傳批次無重複。
