# c-71 交接（2026-09-03）：英國自主爵士與即興廠牌 1969–85 共 45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線（`lineType: 深掘`，`scene: 英國自主爵士與即興廠牌 1969–85`）。
**45 張、41 位藝人、零合輯、零跨批撞卡。**

| 組 | 內容 | 張數 |
|---|---|---|
| a | Ogun 12（含南非流亡圈）、Pukwana 2、Cadillac／Steam 5、RCA Neon、Dandelion、Utopia | 22 |
| b | Incus 6、Mosaic 4、Turtle 3、Bead 2、Spotlite 2、Emanem、Piano、psi、CBS／Deram／Nova／Vertigo／Transatlantic 二線 | 23 |

**策展層的判斷：這條線還很空。** 池中原本只有 Derek Bailey 3、Evan Parker 2、
Spontaneous Music Ensemble 2、Kenny Wheeler 2、Tony Oxley 1、Paul Rutherford 1；
**收完這 45 張後仍有 40 張以上釘得住的候選**（含整條大廠英國爵士線 1969–72：
Rendell/Carr、Harriott、Garrick、Ardley、Winstone、Surman、Beck、Ricotti），可直接開續批。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **31/45（69%）**，14 張要掃圖 | `c71/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條），`ratings.source` 記 `manual:depth-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c71-out-{1,2}.json` |
| 5. 固定試聽 | **17/45 ready（38%）** | `c71/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：45/45 釘住 release-group MBID、零人工身分卡
`fix-rgmbid` 原本就對 44、修正 0；Evan Parker & Paul Lytton《Collective Calls》那筆
這輪回問 MB 失敗，**第 129 條的防線生效、既有值保留不動**。

### 封面 31/45——Ogun／Cadillac／Incus 的原盤 CAA 建檔薄
**缺 14 張要本機掃圖**：Mike Osborne Trio《Border Crossing》《All Night Long》、
Mike Osborne／Stan Tracey《Original》、Stan Tracey Quartet《Captain Adventure》、
Stan Tracey & Keith Tippett《TNT》、Mike Osborne《Outback》、Howard Riley《Flight》、
Graham Collier Music《Darius》《Symphony of Scorpions》、Graham Collier《The Day of the Dead》、
Company《Company 1》、Tony Oxley Quintet《The Baptised Traveller》、
Nigel Coombes／Steve Beresford《White String's Attached》、Steve Beresford《The Bath of Surprise》。

### 試聽 17/45（38%）
`gb` 16、`jp` 1。17 筆盤名全部相符。**Ogun 目錄大多不在 Apple 上。**

## 三、研究層推翻策展層 10 處

1. **《Border Crossing》不是錄音室作品**——原盤封套明印 **1974-09-28 於倫敦 Kings Arms
   的 Peanuts Club 現場**。（策展層的 `why` 寫成錄音室作品。）
2. **Ogun 創辦人是三位**：Harry 與 Hazel Miller **＋錄音師 Keith Beal**。
3. **Ninesense 原盤 credit 只有八位**演出者，「九人編制」禁用。
4. **五處無來源的序數宣稱**（「第一張」「首張」「第二張」）一律禁寫。
5. 《Frames》的「九人陣容橫跨 Ogun 半個目錄」無來源。
6. 《Ode》的「繼 Centipede 之後再度召集」是敘事連結，只能並列兩個事實。
7. **Caroline 是 Virgin 1973–76 的中價位副牌**，不得寫「廉價」。
8. Cadillac 成立年 Discogs 記 1973、維基記 1971，改用「第一張出版品是這張」當錨點。
9. **《Biosystem》原盤 credit 是四人**（多一位大提琴 **Colin Wood**），**不得寫成三重奏**。
10. **《Prayer for Peace》的 FMR 2002 不是未授權**——策展層把它誤標了。
    **推論方向錯**：第 57 條禁的正是「由廠牌推個別發行」，而**第 55 條另記：
    把有授權的誤標成未授權，同樣會誤判分量**。改用 NoBusiness 2010（限量 500）與
    Trading Places 2023（BMG 授權）當乾淨背書，**禁止行文寫「復刻有爭議」**。

## 四、互斥條款分派——這批分得最嚴

**「南非流亡／Blue Notes 離散史」只給兩張**：《Blue Notes for Mongezi》（離散後的追思端）
與 Chris McGregor's Brotherhood of Breath 1971（大樂團成形端）。
**其餘 43 張即使樂手相同也一律禁用。**

**「樂手自己開廠牌」只給兩張**：《Company 1》（Incus）與 Graham Collier Music《Darius》（Mosaic）。

**廠牌史每家一張**：Ogun→《Live at Willisau》｜Cadillac→《Live》｜Steam→《Captain Adventure》｜
Incus→《Company 1》｜Turtle→《Outback》｜Mosaic→《Darius》｜Bead→《Cusack》｜
Spotlite→《Arbeia》｜Emanem→《White String's Attached》｜Piano→《The Bath of Surprise》｜psi→《Biosystem》。

**人物線**：Barry Guy／LJCO→《Ode》｜Tony Oxley 樂手身分→《The Baptised Traveller》
（生卒與 Incus 共同創辦人歸《Company 1》）｜Kenny Wheeler→《Song for Someone》｜
John Taylor→《Pause, and Think Again》｜Malcolm Lowry→《The Day of the Dead》｜
Montreux→《Once Upon a Time....》｜Beresford 的玩具樂器清單→《The Bath of Surprise》｜
**自製樂器描述全批唯一給《Collective Calls》**（Lytton 的 Dexion 角鋼架）｜
Osborne 1982 年因病結束演奏生涯→《All Night Long》。

**全批 45 張逐卡禁用**：「自由即興沒有預先寫好的譜」「復刻多半未授權」
「當年沒人買／現在稀有」（第 109 條）。

**hook 層依第 130／111 條擋下一處分派衝突**：《TNT》的研究稿允許它寫 Emanem 的創辦年與宗旨，
但 b 組《White String's Attached》的 `notes` 明令 Emanem 廠牌史判給該卡。
找相容解——**《TNT》只把 Emanem 寫成「同一份錄音的美國版發行方」，沿革整段讓出。**

## 五、同構骨架（第 131 條）：兩層共處理 6 組

**hook 層 3 組**：「封面印 X、標籤印 Y」（《They All Be on This Old Road》讓給
《Once Upon a Time....》）、「A 面整面一首」（《Flight》改走曲名底下的兩個題獻名）、
「credit 上有 N 個人」（《Happy Daze》改走錄音日與錄音室）。
另預先分散三條：「廠名取自⋯」只留《Live at Willisau》、「by courtesy of 別家唱片公司」
只留《Prayer for Peace》、**全批不出現「改名」一詞**（三處各用不同說法）。

**寫作層 3 組**：「錄於 X，唱片是 19XX 年的 Ogun OG-XXX」連續出現在三張 → 改成三種句式；
b 組「出在〈廠牌〉的〈編號〉」原本七張同一骨架 → 拆成四種寫法；
「樂手由另一家公司出借」（《We'll Talk About It Later》整條拿掉，改寫 Roger Dean 模切封套）。

## 六、年份

**錄音年與發行年不同的共 18 張**（a 組 12、b 組 6），`yearVerified` 逐張分開寫明，**行文也分開寫**。
**禁斷言發行年**：《Live at Willisau》（**錄音年兩說**：維基 1973-01-27 vs Ogun 官網「1974 年 9 月」，
全篇不寫錄音年月也不寫發行年，只寫 1973 年廠牌成立）、《Ear of Beholder》
（MB 1970-12-07 vs Discogs 英美原盤六筆全記 1971，依第 86／127 條採 1971）、
《Company 1》（卡單／Discogs 1977 vs MB 1976，而 1976 是原盤注記的錄音年）。
**錄音年查無而禁寫**：《Once Upon a Time....》（連 Montreux 年份都不寫）、《Child Song》。
**《The Bath of Surprise》** MB 只建 1999 年日本 CD，走第 95 條——該 CD 自己的注記直寫
「Originally released in 1980 as an LP (PIANO 003)」，可覆蓋 MB。

## 七、資料受限與逐張禁令

- **Kenny Wheeler 的生平本批 facts 完全沒有**——禁寫加拿大籍與 ECM，只寫他在本碟作曲並吹小號。
- **《Arbeia》盤名與 South Shields 羅馬堡壘的關聯無來源**，**連「與出生地同名」都禁寫**。
- **《Frames》四面本來就無曲名**，`keyTracks` 依第 56／60 條**刻意留空**、明令不得編造。
- **Brotherhood of Breath 的兩筆俄羅斯盤是冒用 Repertoire Records (2) 與正版編號的 Unofficial**
  （第 65 條形狀），不得當背書。
- **《Flight》的 1995 年 FMR 那筆 MB 標 Official 而 Discogs 標 Unofficial**，
  依第 66 條採 Discogs，該筆不採背書。
- 《Blue Notes for Mongezi》：Ogun 自家兩頁對錄音地點打架（排練室 vs 錄音室通宵），
  行文採**排練室**、禁提後者。
- **人數一律不寫**：《Oh! For the Edge》《Outback》《Pause》《Flight》《Darius》
  《Symphony of Scorpions》《The Day of the Dead》《On Loan》《Biosystem》《Arbeia》
  《Child Song》只照 credit 逐項寫樂器，《Ode》不寫「二十一人」。

## 八、機器 QA

```
qa-batch.mjs research c71   45 張全 full｜key 與卡單完全一致 ✓
qa-batch.mjs hooks c71      0 標記
chk-hook-crossgroup.mjs c71 45 張｜hook 加權 15–34｜note 323–350｜✓ 全部通過
qa-batch.mjs out c71        out-1 22 張 220–235｜out-2 23 張 215–235｜合計 45 與卡單相符 ✓
qa-check-research.mjs       兩檔各 0 標記
fix-spacing.mjs             兩檔各待補 0
chk-prop.mjs                45 張、41 位｜標記 0｜跨批撞卡 0
```

## 九、跨批去重

已過 `dedup-crossbatch.mjs`。上傳前務必再對現行卡池跑一次 `dedup-vs-live.mjs`。
