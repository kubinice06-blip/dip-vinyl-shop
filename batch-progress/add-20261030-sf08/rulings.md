# add-20261030-sf08 裁定（Spotify 追蹤藝人補卡池・西洋 90 年代至今：獨立、alt、迷幻、shoegaze、民謠）

> 店主 2026-10-30 `/dip-card-create`：依 Spotify 追蹤藝人補卡池，每位缺漏藝人挑 1–2 張代表作（交接 `batch-progress/spotify-follow-20261030/PLAN.md`）。本工作階段負責 sf06、sf08。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-sf08a.json`（32）＋`curation-sf08b.json`（27）→ 主線改 2（`master-override-sf08asf08b.json`）→ `master-sf08asf08b.json`（59 張：MB 釘住 57、§1 人工 2）→ `pick.json`（59）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf08-cards.json`（59 張；研究 a–d 各 12、e 11）。
> **預留：研究 a 41701–41710、b 41711–41720、c 41721–41730、d 41731–41740、e 41741–41750、鉤子 41751–41760、寫作 41761–41770、主線 41771–41780。**（sf 線條號：sfNN → 41001＋(NN−1)×100 起，每批 80 條。）
---

## 主線策展（不佔條號）
- **清單 41 位 → 收 40 位、59 張；跳過已在池 0 位；不收 1 位。** 收兩張的 19 位（22-Pistepirkko、A Place to Bury Strangers、Any Other、Blind Melon、Blonde Redhead、Damon Albarn、Disappears、Frànçois & The Atlas Mountains、Jolie Holland、Melody's Echo Chamber、MV & EE、Pigs Pigs Pigs Pigs Pigs Pigs Pigs、Psychic Ills、SLIFT、Stone Sour、SUUNS、The Black Angels、Wooden Shjips、Ben Watt）。
- **身分核對**：gap.json 的 Spotify 藝人連結逐位對 MB 藝人頁，46 張直接對上、0 張對錯人；MB 無 Spotify 連結的 13 張抓 Spotify 藝人頁專輯清單對盤名，全部在該藝人名下（Beachy Head 2021 同名專輯＝Christian Savill 那組；Tacoma Radar、The Sonora Pine、David Boring 港團、Modey Lemon、Disappears、Pictish Trail、22-Pistepirkko、Any Other 皆對上）。Loose Meat 經 MB 藝人頁的 Spotify 連結確認是英國那組（MB 標籤 dance／electronic／experimental，研究層照實寫聲音）。The Charlottes 的 Spotify 藝人頁只露出合輯，《Lovehappy》以 MB＋Discogs 為證。
- **主線改 2 處**（`master-override-sf08asf08b.json`）：
  - Frànçois & The Atlas Mountains：原選 2009 自發行《Plaine inondable》→ 改 2011《E Volo Love》（MB 3fb62205，Domino 首張、樂團的突破作）。
  - Beachy Head 補廠牌 Kscope。
- **跳過（池中已有）**：無。Ben Watt 池中只有 Everything but the Girl 名義，個人名義另收。
- **不收**：Valley Hi!（只有 2021 年 4 曲 EP，MB 查無）。
- Sleepytime Trio《Plus 6000》是 1997 年 6 首長 EP，照長 EP 例外收；Mamie Minch《Razorburn Blues》MB 無條目，走 §1 人工。


## 研究 c 組（41721–41730）
- 41721 Loose Meat：卡單 label 空、moodGuess「粗粝吉他搖滾」皆推翻。實為倫敦雙人組（Capitol K 的 Kristian Craig Robinson＋前 Archie Bronson Outfit 鼓手 Arp Cleveland）的合成器／鼓機 indie-disco，Whipped Cream Records，2016-06-03（Dummy＋Loud and Quiet＋MB 目錄號 WHIP001D 互證）。curatorRisk「疑為英國 Loose Meat」已確認。建議 label 補 Whipped Cream Records、三軸重評。
- 41722 Modey Lemon《Thunder + Lightning》：卡單 label 空、curatorWhy「Fat Possum 出道作」推翻。實為第二張（首張 2002 A-F Records），2003 美國 Birdman Records（BMR 046）、歐洲 Mute、日本 EMI。建議 label 補 Birdman Records。moodGuess「失真管風琴」存疑：實為 Moog＋失真吉他＋鼓、無貝斯。
- 41723 Pictish Trail《Future Echoes》：curatorRisk「廠牌憑記憶」查實為錯：2016 原版 Lost Map（Caroline International 發行），Fire Records 僅 2018 豪華重發。建議 label 改 Lost Map。三軸 z 偏高存疑（主題死亡終局，旋律明亮）。
- 41724 Psychic Ills《Mirror Eye》：卡單 label Sacred Bones 推翻；原版 2009 The Social Registry（TSR066），Sacred Bones 是 MB 另記的 2023 重發。建議 label 改 The Social Registry。moodGuess y1 偏高存疑（低速長曲、手鼓＋合成器）。
- 41725 MV & EE《Gettin' Gone》：label 空→補 Ecstatic Peace!。moodGuess「漂浮民謠迷幻」存疑：評論皆稱是樂團最「搖」的一張（J Mascis 客座打鼓、踏板鋼吉他、Neil Young／Crazy Horse 式髒吉他）。
- 41726 MV & EE《Space Homestead》：label 空→補 Woodsist（目錄號 060）。九間錄音室 DIY 錄成（Relix 訪談）。曲目與完整人員表查無可靠頁，status thin。
- 41727 Melody's Echo Chamber 首作：MB 美版日期 2012-08-14 與維基 2012-09-25 衝突，寫作層只寫 2012 不寫日。
- 41728 Melody's Echo Chamber《Bon Voyage》：Dungen 成員只有 Reine Fiske 在維基明載；寫作層寫「Dungen 成員」勿點 Swahn。2017 年 6 月意外（腦動脈瘤）單一來源，克制寫。
- 41729 Jolie Holland《Escondida》、Kissin' Dynamite《Megalomania》、Pigs x7 兩張：身分與廠牌核對無誤，未推翻。Escondida 錄音地不詳；Megalomania 製作人查無；Pigs 兩張錄音皆 Blank Studios、Sam Grant 製作。
- 41730 AllMusic／Pitchfork／Slant 多頁 403，評價分數多出自搜尋摘要，建議正文不寫分數。

## 主線（條號 41771–41780）
- 41771：照研究 c 組推翻改卡單：廠牌 Loose Meat→Whipped Cream Records、Modey Lemon→Birdman Records（並刪「出道作」，首張是 2002 同名）、The Pictish Trail→Lost Map（Fire 是 2018 豪華重發）、Psychic Ills《Mirror Eye》→The Social Registry（Sacred Bones 是 2023 重發）、MV & EE《Gettin' Gone》→Ecstatic Peace!、《Space Homestead》→Woodsist。Loose Meat 主曲風 rock→electronic（合成器＋鼓機 indie-disco）。moodGuess 存疑 5 張不汰卡（這條線不看落格），留給上線後情緒評分照聲音事實判。
