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


## 研究 b 組（41711–41720）
- 41711：Current Joys《A Different Age》廠牌卡單 Secretly Canadian 錯，MB 與 Atwood 皆為 Danger Collective Records（Secretly Canadian 2023 才發《LOVE + POP》）→ 卡單 label 改 Danger Collective Records，curatorWhy 措辭作廢。
- 41712：Disappears《Era》curatorWhy「Shelley 加入後第一張」錯：Shelley 打的是《Pre Language》，Era 時已離團、Noah Leger 接任（Line of Best Fit、Joy of Violent Movement 一致）→ 改為「Shelley 離團後、Leger 加入的第一張」；聲音（冷、重複、有鼓）與 moodGuess 相符。
- 41713：Frànçois《E Volo Love》年份：MB 同 RG 兩筆（2011 無月日／2012-01-30 Domino WIG280），維基、The Skinny、官方預告為 2012-01-23。主線改盤已核對 Domino 無誤；建議卡片年份取 2012，facts 兩邊並陳，交主線裁定。
- 41714：Green Jelly《Cereal Killer Soundtrack》年份：卡單 1992 取自 MB 最早紀錄（卡帶／錄影專輯），維基與 Trouser Press 皆為 1993-03-16 Zoo 專輯版；建議用 1993 或簡介註明「1992 錄影專輯的音軌版」，交主線裁定。
- 41715：Helado Tropical 廠牌空白→Psychic Hotline（MB、官方頁、Tobira 一致）；確認是 Helado Negro × Reyna Tropical 合作，curatorRisk「Spotify 是否此組」以 MB 藝人 credit 與官方頁為準，Spotify 頁本身未直接核對。
- 41716：Cerberus Shoal《Homb》廠牌空白→Temporary Residence Limited（維基、Scaruffi、再版頁三處一致）；成軍地維基（波士頓／緬因）與 Scaruffi（Berklee）略異，facts 並陳。
- 41717：Damon Albarn《The Nearer the Fountain…》moodGuess「室內管弦」存疑：來源描述主體是鋼琴、合成器、管風琴、薩克斯風與極輕打擊樂，偏靜偏冷，方向仍相容。
- 41718：Jolie Holland《Catalpa》標 thin：編制、鼓有無查無可靠來源（維基、Seven Days、encyclopedia.com 皆無），keyTracks 留空不憑記憶填；其餘身分、廠牌（Anti-）、年份無誤。
- 41719：搜尋摘要才有的單一來源說法（Pre Language 於 Echo Canyon West 錄音、Present Tense 於 Electrical Audio 與 Sanford Parker 錄音、Piano Ombre 於 Entre-Deux-Mers 錄音）一律不入 facts，僅在 notes 提及。
- 41720：WebSearch 本組用 9 次（超過每支 3 次的上限，因卡單多處疑點）；維基 API 被 429 擋、改以 WebFetch 讀頁。

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

## 研究 d 組（41731–41740）
- 41731 SLIFT《ILION》：curatorRisk「廠牌憑記憶」查實為錯：Sub Pop（SP1626，MB 七筆 release 與官方公告一致），不是 Stolen Body。建議 label 改 Sub Pop Records。《Ummon》卡單 Stolen Body 是英國版，原版與首壓大宗為法國 Vicious Circle；寫作層寫「Vicious Circle 與 Stolen Body 共同出版」，建議 label 可改 Vicious Circle。
- 41732 Stone Sour 首作：curatorWhy「白金首作」推翻，美國 2003 年認證金唱片（白金是《Come What(ever) May》2017）。葛萊美為入圍非得獎，兩首單曲對應屆次未能配對。MB 8 月 19 日與維基 8 月 27 日衝突，只寫 2002 年 8 月。
- 41733 SUUNS《Zeroes QC》：curatorWhy「入圍 Polaris」推翻：2011 長短名單皆無；SUUNS 的 Polaris 紀錄是《Images du futur》2013 長名單（未進短名單）。錄音時間 Discogs 2010 年 1 月、維基 2009 年衝突，寫作層只寫蒙特婁 Breakglass。
- 41734 SUUNS《Images du futur》：Discogs 錄音 2012 年夏與廠牌頁冬春寫歌錄音不一致，只寫 2012 年；學生抗議影響是訪談者說法，不當樂團宣稱。
- 41735 Tacoma Radar：卡單 label 空→補 Andmoresound Records；國籍蘇格蘭（MB、Discogs）。status thin：無當年樂評，聲音靠 Numero 文案一句；moodGuess 小幅存疑（更靜更暗）。Kenny Anderson 是否為 King Creosote 未證實，勿連結。
- 41736 The Black Angels《Passover》：「Call to Arms」本曲 10:33＋靜默＋隱藏曲，整軌 18:06；寫作層寫「整軌 18 分」勿寫成單曲 18 分。《Phosphene Dream》廠牌 Blue Horizon 核實，製作人 Dave Sardy，洛杉磯錄約六個月。
- 41737 The Charlottes《Lovehappy》：label 空→補 The Subway Organization（SUBORG 12），四個四月天於布里斯托 S.A.M. 錄成；備選 Things Come Apart 未採。封面 CAA 無，Discogs 有。status thin，「C86 式明亮」來源未證，moodGuess 可能偏模糊偏冷。
- 41738 The Sonora Pine：label 空→補 Quarterstick Records。moodGuess「後搖器樂」存疑：有 O'Neil、Meadows 人聲與 Coultas 真鼓，並非純器樂。成軍地（紐約／路易維爾）與 Meadows 前團（Lungfish／June of 44）來源互相衝突，facts 皆不寫。status thin。
- 41739 Psychic Ills《Hazed Dream》：身分、廠牌核對無誤（Sacred Bones SBR-063），2011 年 4 月紐約 Seaside Lounge 2 吋磁帶錄成。未推翻。
- 41740 AllMusic／Pitchfork／scaruffi 以外多頁 403 或 429；評價分數出自搜尋摘要，建議正文不寫分數。

## 主線（條號 41771–41780）
- 41771：照研究 c 組推翻改卡單：廠牌 Loose Meat→Whipped Cream Records、Modey Lemon→Birdman Records（並刪「出道作」，首張是 2002 同名）、The Pictish Trail→Lost Map（Fire 是 2018 豪華重發）、Psychic Ills《Mirror Eye》→The Social Registry（Sacred Bones 是 2023 重發）、MV & EE《Gettin' Gone》→Ecstatic Peace!、《Space Homestead》→Woodsist。Loose Meat 主曲風 rock→electronic（合成器＋鼓機 indie-disco）。moodGuess 存疑 5 張不汰卡（這條線不看落格），留給上線後情緒評分照聲音事實判。
- 41772：照研究 d 組改卡單廠牌：SLIFT《ILION》→Sub Pop、《Ummon》→Vicious Circle（法國原版；Stolen Body 是英國版）、Tacoma Radar→Andmoresound Records（蘇格蘭樂團，國別維持 gb）、The Charlottes→The Subway Organization、The Sonora Pine→Quarterstick Records。Stone Sour 首作美國金唱片（非白金）、SUUNS《Zeroes QC》未入圍 Polaris——寫作層以研究稿為準。
- 41773：照研究 b 組改卡單：Current Joys 廠牌→Danger Collective Records、Cerberus Shoal→Temporary Residence Limited、Helado Tropical→Psychic Hotline；Disappears《Era》刪 curatorWhy 的 Shelley 句（他打的是《Pre Language》）。年份：《E Volo Love》改 2012（Domino WIG280 正式發行 2012-01；MB 那筆無月日的 2011 不採）；Green Jelly《Cereal Killer Soundtrack》改 1993（1992 是錄影專輯，音軌專輯 1993-03-16 Zoo）。

## 研究 e 組
- 41741：СОЮЗ《Это всё совсем не то》—— 查證其聲音為爵士流行／avant-pop／電子流行（Bandcamp 標籤、MB 流派 jazz、Europavox、goout.net），無後龐克證據；moodGuess「冷硬後龐克吉他」存疑，標 thin，建議主線汰換或聽證。廠牌 Masterskaya（MB）。
- 41742：David Boring《Unnatural Objects and Their Humans》—— Bandcamp／MB 標籤為 noise／post-punk／industrial／no wave，非夢幻 shoegaze；moodGuess 存疑（實際更吵更躁）。自行發行。
- 41743：Vinnum Sabbathi《Gravity Works》—— 廠牌＝自行發行（Metal Archives 標 Independent；LSDR 為後來再版）；Fuzzonaut (2015) 在 Metal Archives 是 split，Gravity Works 才是首張全長，選碟不變。
- 41744：Sleepytime Trio《Plus 6000》—— Discogs 確認 1997 Lovitt Records LOV #7、12 吋 6 首、J. Robbins 錄音；卡單 label 填 Lovitt Records。
- 41745：Mamie Minch《Razorburn Blues》—— Apple 確認 2008-05-24、11 首、℗ Mamie Minch；Discogs 另列 Morphius Records, Inc.，廠牌兩說，沿用自行發行。Chronogram 作《The Razorburn Blues》視為冠詞誤植。
- 41746：Ben Watt《Hendra》—— 發行日以 MB 2014-04-14 為準（他處 4/15、3/24）；鼓有無來源未明。North Marine Drive 的榜名兩說（獨立榜第一／前十），facts 保守引用。
