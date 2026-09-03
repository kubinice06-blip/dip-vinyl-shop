# c-72 交接（2026-09-03）：美國耶穌搖滾與 Xian 私壓 1969–80 共 42 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線（`lineType: 深掘`，`scene: 美國耶穌搖滾與 Xian 私壓 1969–80`）。
**42 張、31 位藝人、零合輯、零跨批撞卡。**

| 組 | 年代 | 張數 |
|---|---|---|
| a | 1969–74 | 19 |
| b | 1975–80 | 23 |

**這個場景在池中原本整片為零**——實掃只有 Fraction《Moon Blood》一張（不收）。
廠牌涵蓋 Maranatha! Music、Myrrh、One Way、Good News、New Song／Love Inn、
Solid Rock、Creative Sound、Light／Lexicon、Star Song、Birdwing／Sparrow、
Rock the World、Grrr、Chrism、Shalom，以及 Century、Voice of Elijah、Mark、
Renrut、Elco、Destiny、NRS、Discovery、American Artists 這些地方教會與客壓廠。

**策展層的判斷：仍遠未飽和**——這 42 張把 1969–80 的主幹鋪出來，
**1981–85 的 Xian 私壓與 Xian metal／synth 完全沒碰。**

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **32/42（76%）**，10 張要掃圖 | `c72/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條），`ratings.source` 記 `manual:depth-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **42 張全部寫完並過機器 QA** | `desc-tools/batches/output/c72-out-{1,2}.json` |
| 5. 固定試聽 | **26/42 ready（62%）** | `c72/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：42/42 釘住 release-group MBID、零人工身分卡
`fix-rgmbid` 原本就對 42、修正 0；Honeytree《The Way I Feel》那筆這輪回問 MB 失敗，
**第 129 條的防線生效、既有值保留不動**。

### 封面 32/42
**缺 10 張要本機掃圖**：Agape《Gospel Hard Rock》、All Saved Freak Band《My Poor Generation》、
Resurrection Band《Music to Raise the Dead》、Hope of Glory《Under the Spout Where the Glory Comes Out》、
Gentle Faith《Gentle Faith》、Lamb《Lamb III》、Sweet Comfort Band《Sweet Comfort》《Breakin' the Ice》、
Bob Ayala《Joy by Surprise》、Fireworks《Shatter the Darkness》。

### 試聽 26/42（62%）——全在 `us` storefront
**三筆軌數偏多的逐張攤開查證後接受**（都是標註清楚的擴充再發，不是第 129 條的套裝）：
Larry Norman《In Another Land》18 軌對得上 MB 的 2008 US release；
**The Search Party《Montgomery Chapel》**Apple 18 軌，前 10 軌與原盤相同、後 8 軌標 (Bonus)；
**Mark Heard《Appalachian Melody》**Apple 19 軌，前 12 軌與 MB 相同、後 7 軌標 (Demo)。
**原盤軌數已寫進 `notes`**（Search Party 10、Concrete Rubber Band 9、Appalachian Melody 12），
寫作層沒有把 bonus 當原盤曲目。

## 三、研究層推翻策展層 20 處——**這批最多**

**a 組 8 處**：
1. **策展層引述的兩個維基條目根本 404**（`Agape (band)`、`Wilson McKinley`）——據以引述的樂團史全部不可用。
2. **Harvest Flight 錄在 Living Sound Recorders**，Sunset Sound 是母帶（Bill Lazerus）。
3. **Hope of Glory 不是團體的第一張**（同廠牌 1973 年已出過自我同名 S-121），且 **Whitney 是錄音室不是客壓廠**。
4. **Wilson McKinley《On Stage》錄音地在加拿大溫哥華 Pender Auditorium**（現場錄音、**樂團事前不知情**），
   不是斯波坎；「自己掏錢做的」無來源。
5. **Honeytree 的 credit 上沒有「Chicago Strings」**，弦樂只有 Karl Fruh 一把大提琴。
6. **Earthen Vessel**：NRS 是唱片公司、Monument 才是錄音室、Southern Plastics 才是壓片；團籍是 East Lansing。
7. **ASFB**：「Church of the Risen Christ」與「Larry Hill 牧師」查無來源；Cleveland Recording 是刻片不是錄音地。
8. **Marj Snyder 是十首裡她寫八首**，不是全碟自作。
（另有兩處策展層的**自設禁令已查證解除**：Phil Keaggy 的 Love Inn／New Song 關聯、
Concrete Rubber Band 的團籍——**第 55 條的反向誤判**。）

**b 組 12 處**：
1. **The Trees 不是雙 LP**（單張 9 軌；雙 LP 是 2020 Old Bear 的 17 軌擴充版）。
2. **Bob Ayala 1976 年時並未失明**，且該說法的來源是朋友的私人陳述、條目掛 essay 標籤。
3. **Petra 的 Volz 沒有接任主唱**（只唱 3 軌，客席）。
4. **Chrism 是 Tempo Records 的副牌**，不是自壓名義。
5. **Servant 的所在地三方打架**（維基 infobox 記加拿大 BC Victoria）——**禁止斷言**。
6. **Mark Heard《Fingerprint》錄於洛杉磯**，不是瑞士。
7. Heard「第一張在美國發行的唱片」不成立。
8–10. 「Maranatha! 第 18 號盤」「Seed 第八號盤」「廠牌名取自本名」——**第 125 條的目錄號誤讀**。
11. Larry Norman「1972–76 三部曲」的年份區間與 Tom Howard 之名無來源。
12. Sweet Comfort 維基多段無引註。

**另擋下一個內部矛盾**：維基引 Powell 說 Bob Ayala「1976 年獲 CCM 雜誌票選」，
但 **CCM 1978 年才創刊**——不入 facts。

## 四、互斥條款分派——宗教是這批最大的同調來源

**「耶穌運動背景」只給兩張，且切開**：Love Song 寫 Calvary Chapel／Chuck Smith／
Lonnie Frisbee 那條**教會線**；Larry Norman《Bootleg》寫 People!／《Upon This Rock》／
自營 One Way 廠牌那條**個人線**。

**「當年只在佈道會與基督教書店流通」只給兩張，也切開**：Wilson McKinley《On Stage》寫
巡迴佈道現場＋Highway Missionaries 發傳單＋七萬份；All Saved Freak Band 寫公社自壓
五百張＋被 RCA／Columbia 找上卻不簽。

**廠牌史一家一張**（a 組 17 家、b 組 5 家）。
**兩條特別的禁令**：
- **Maranatha! 廠牌沿革 b 組四張一律不寫**——它的來歷在所有來源裡都與 Calvary Chapel 綁死，
  寫了就等於把「耶穌運動背景」那條線複製四份。
- **Solid Rock 廠牌史＋「藝人自營廠牌」只給 Larry Norman**，另 3 張 Solid Rock 盤不展開。

**其他**：《Jesus People Music Vol.1》合輯只給 Azitis 與 Earthen Vessel；Numero 只給 Marj Snyder；
「Adam's Apple」場地名只給 Petra（Honeytree 改寫成「Fort Wayne 的一間青年事工」）；
**CCM 2001 百大只給 Stonehill（#13）**，Keaggy #64 與 Rez Band #91 明令不引；
Rick Griffin→Mustard Seed Faith；Jubal 改名史→Gentle Faith；私壓被大廠接手→Bob Ayala；
天主教／方濟會→Talbot；日本再發→Paul Clark；**零客席編制→Fireworks**。

**收料時就從 facts 剝掉了維基原句裡的 Calvary Chapel 字樣**（Mustard Seed Faith、
Gentle Faith、Daniel Amos、Bob Ayala 四處）——**在源頭斷掉同調，比在下游禁止有效。**

## 五、hook 層依第 130／41 條擋下七處分派

- Rez Band 的「太太正在**樓上**睡覺」——facts 只有「地下室錄音／太太在睡覺」，樓上是一步推論。
- Chuck Girard 同名的「A5 的鋼琴、風琴、貝斯都是他自己彈的」——只在 `sound` 欄，逐軌 credit 沒有。
- 《Glow in the Dark》的「換了**五組**貝斯與鼓」——逐軌 credit 只數得出四種搭配。
- Azitis 的「地址**印在唱片上**」與「**八首**詞曲全出自那四人」——條目只說廠牌設在該地址；逐軌只登錄到七首。
- Fireworks 的「**五個人**」——`sound` 的歸納與 credit 的六個名字不合。
- Bob Ayala 的「被大廠**買下**」——facts 只有 Myrrh 再發。

## 六、同構骨架（第 131 條）：兩層共處理 10 組

**hook 層 6 組**：通宵錄音、一人包辦四職、封套把人聲掛成樂器、詞曲高度集中、
和聲換人、四人零客席。
**寫作層再 4 組**：同團兩張都寫「廠牌欄⋯、沒有目錄號」、兩張壓量句型相同、
兩張多職掛名、兩張 Solid Rock 的玩笑 credit。

**寫作層另主動避開**：全批只有一張寫「自費壓片的決定」、只有一張寫「藝人自營廠牌」、
四張 Maranatha! 盤零筆廠牌沿革、**無任何一張走「多年後被考古廠牌挖出來」**。

## 七、年份

**禁斷言發行年**：Chuck Girard《Chuck Girard》（維基唱片列表與南非版 1974、Apple 1978，卡單 1975）、
John Michael Talbot《The Lord's Supper》（維基／AllMusic 與英澳版 1979，卡單 1978）、
Love Song（Discogs 首版與封面版權年 1971，卡單 1972）、Earthen Vessel（MB 與 Guerssen 1971，
卡單 1972；錄音日期另有夏天／11 月兩說）、Concrete Rubber Band（MB 只建 2007 Green Tree，
已標 `coverVersionDoubt`）。
**Bob Ayala 的 MB `first-release-date` 1977-06 是 Myrrh 再發**，原盤 1976-07（**第 95 條第四次出現**）。
**錄音年早於發行年 1–3 年的四張**（Larry Norman、Daniel Amos、Mark Heard《Appalachian Melody》、
Stonehill《The Sky Is Falling》）已註明時序，**禁止混用與相減**。
**Randy Stonehill《Welcome to Paradise》**：維基〈Larry Norman discography〉記 1977 但無引註，依第 80 條不採。

## 八、資料受限

**兩張 thin**：Hope of Glory（Discogs 與 MB 之外查無任何可開啟資料，**連團員名單都沒有**）、
Fireworks《Shatter the Darkness》（零第三方資料、零再發）。
**Fireworks 依第 82 條裁定留下不剔**——它有 Myrrh／Word 正式發行、MB Official release、
Marty McCall 與 Chris Christian 兩條有第三方來源的人物線，且屬可逆的卡單值取捨。

**三處網路流傳但無可開啟來源已禁用**：Azitis 的樂團身世（原名 Help／一千張／鍵盤手失蹤）、
Petra 首張「教會市場反應冷淡」、Hope of Glory 的德州／Austin 地緣。
**archive.org 在本環境 egress 被擋、badcatrecords 站台已失效**，不要浪費時間。

**再發背書**：22/23 張（b 組）的 master 版本表零筆 Unofficial；**唯一一筆是 The Trees 的
2006 英國 Radioactive (2) RRCD172**，不採。另三筆「未標 Unofficial 但證據不足不採」：
Paul Clark 的 MB 2007 JP release（status null）、Fireworks 的無廠牌 CDr、
Larry Norman 的 1988 Phydeaux 與 2005 三十週年版（MB status null）。

## 九、機器 QA

```
qa-batch.mjs research c72   42 張（full 40、thin 2）｜key 與卡單完全一致 ✓
qa-batch.mjs hooks c72      0 標記
chk-hook-crossgroup.mjs c72 42 張｜hook 加權 11–35.5｜note 292–349｜✓ 全部通過｜開頭四字全互異
qa-batch.mjs out c72        out-1 19 張 215–235｜out-2 23 張 215–235｜合計 42 與卡單相符 ✓
qa-check-research.mjs       兩檔各 0 標記
fix-spacing.mjs             兩檔各待補 0
chk-prop.mjs                42 張、31 位｜標記 0｜跨批撞卡 0
禁詞掃描                     Xian／Jesus rock／純真／虔誠／感人／見證：0 命中
```

## 十、跨批去重

已過 `dedup-crossbatch.mjs`。上傳前務必再對現行卡池跑一次 `dedup-vs-live.mjs`。
