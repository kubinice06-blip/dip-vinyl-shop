# add-20261030-sf07 裁定（Spotify 追蹤藝人補卡池・西洋 60–80 年代迷幻、prog、硬搖滾、krautrock、post-punk）

> 店主 2026-10-30「依 Spotify 追蹤藝人補卡池」（`/dip-card-create`），交接 `batch-progress/spotify-follow-20261030/PLAN.md`；本工作階段負責 sf05、sf07。流程沿用 `batch-progress/HANDOFF-mood-cells-line.md` §二，策展層改 `CUR-DISPATCH-SF.md`；**不做 moodGuess 邊距檢查**，情緒評分照 `batch-progress/mood-axes/RULES.md`、不算落格率。
> 策展：`curation-sf07a.json`（25 張）＋`curation-sf07b.json`（22）＋主線改收 `curation-sf07m.json`（3）→ 主線汰 2、更正 3（`master-override-sf07asf07bsf07m.json`）→ `master-sf07asf07bsf07m.json`（MB 釘住 45、§1 人工 2）→ `pick.json`（47）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf07-cards.json`（47 張；研究 a–d 各 10、e 7）。
> **預留：研究 a 30701–30710、b 30711–30720、c 30721–30730、d 30731–30740、e 30741–30750、鉤子 30751–30760、寫作 30761–30770、主線 30771–30790。**
---

## 主線策展（不佔條號）
- 清單 35 位：**收 32 位 47 張**、**跳過（已在池）0 位**、**不收 3 位**。
- **不收**：Mellow Yellow（MB 有芬蘭、丹麥、日本、比利時、牙買加多組同名，無可辨識的正規專輯，身分不明）、Destroy All Monsters（《November 22, 1963》Discogs 判彙編，其餘為現場／彙編）、Antena（只有 5 首迷你專輯《Camino del Sol》與彙編，不滿 6 首長 EP 門檻）。
- **主線改收 3 張**：The West Coast Pop Art Experimental Band《Volume One》（1966 私壓）→《Volume 2》（1967 Reprise，迷幻轉向最徹底、評價最高）；Paul Davis《Southern Tracks and Fantasies》→《Singer of Songs • Teller of Tales》（1977，收〈I Go Crazy〉）；Willie West《Lost Soul》由人工身分改 MB 釘住（RG 85436f9c）。
- **更正 2**：Eyeless In Gaza → MB 正規寫法 `Eyeless in Gaza`（兩張）。
- **同名裁定**：Khan＝英國 Steve Hillage 1972《Space Shanty》；Ikarus＝德國 1971；Pierrot Lunaire＝義大利；Affinity＝英國 1970；Black Widow＝英國《Sacrifice》；Nine Days' Wonder＝德國；Tully＝澳洲；Zaratustra＝墨西哥 1970《Su Música... Su Filosofía...》（Discogs Zaratustra (2)，§1 人工）；Martin & Garp＝2020 年代當代 AOR 團《Sentimental Fools》（不是 70 年代，§1 人工；國別待研究層確認）。
- **例外**：Mike Ratledge《Riddles of the Sphinx》（2013 Mordant Music，1977 Mulvey／Wollen 電影配樂）——MB 次類型 Soundtrack，是 Ratledge 唯一的個人署名作品，以配樂例外收。The Cosmic Jokers 兩張是 Rolf-Ulrich Kaiser 未經樂手同意發行的爭議盤，照收，正文要寫明。
- 交研究層把關：Pierrot Lunaire 兩張廠牌（策展憑記憶填 Grog）、Ikarus 廠牌、Eyeless in Gaza《Pale Hands》首發年（MB 空）、Peter Kaukonen 封面（CAA 無，用 Discogs）、Slow Dancer 國別、Tully／Paul Davis 廠牌。
- 跨分支去重：對 origin/main 與 10-28 後更新的 `claude/*` 分支 seed 查藝人名、別名、Spotify 寫法，0 撞。

## 研究 a 組（30701–30710）
- 30701：全 10 張 MB 釘住的身分、年份、廠牌、正規錄音室專輯皆核對無誤（MB 釋出資料與英文維基交叉）；status 全 full，每張 10 條 facts、皆 https。
- 30702：推翻策展層 1 處：Gravy Train 並非「曼徹斯特」團，而是蘭開夏聖海倫斯成軍（主腦 Barratt 生於 Newton-le-Willows）；facts 照維基樂團條目寫。
- 30703：Atomic Rooster《Death Walks Behind You》維基記 1970 年 9 月、MB 最早登錄 1970-12；卡單年份 1970 不動，facts 兩邊並陳。
- 30704：Atomic Rooster《In Hearing Of Atomic Rooster》正名其實是《In Hearing of》，MB 與維基皆如此；卡單 album 欄多了團名（queryAlias 已有），建議顯示用正名。
- 30705：moodGuess 存疑兩處：(1) Jade Warrior《Last Autumn's Dream》預估「柔和原聲與笛、田園靜謐」，但專輯含〈Snake〉〈The Demon Trucker〉〈Joanne〉等有鼓的硬朗搖滾，整張擺盪於內省器樂與短促硬搖之間，躁度與重度高於預估；(2) Jade Warrior《Floating World》多數曲目安靜，但〈Monkey Chant〉〈Red Lotus〉有鼓與失真吉他爆發，動態大。Black Widow《Sacrifice》主奏是長笛、薩克斯風與風琴，x 預估可能偏高；High Tide《High Tide》AllMusic 稱比首作輕。皆不建議汰換。
- 30706：Frijid Pink 維基專輯條目標 1970-01-25，與單曲 1970 年 2 月才進 Hot 100 的時序衝突，facts 只寫 1970。
- 30707：High Tide《Sea Shanties》的〈The Great Universal Protection Racket〉兩個維基條目曲名寫法不一（Confidence Trick／Protection Racket），哪次再版補回未查證，facts 只寫「後來再版補回」。
- 30708：Gravy Train facts 已把基督教視角寫成團員歌詞背景（樂團條目有訪談來源），屬與作品直接綁定。High Tide 鼓手 Hadden 的健康狀況僅寫「入院」不渲染。
- 30709：本組沒有彙編、現場、重發；無建議移除。High Tide《High Tide》AllMusic 評價偏低（作者稱像低潮），首作評價明顯較高，若主線需要在兩張間取捨，可考慮；非建議汰換。
- 30710：來源以英文維基（action=raw）、MusicBrainz API 為主，WebSearch 0 次；聲音描述取自維基引述的 AllMusic／Prog Archives 樂評，未逐一開原頁。

## 研究 e 組（30741–30750）
- 30741：Sugarcubes《Here Today, Tomorrow Next Week!》卡單廠牌 One Little Independent 是 2020 年改名後現名，1989 原名 One Little Indian（美國版 Elektra）；正文寫原名或「後改名」，不算推翻。
- 30742：WCPAEB《Volume 2》正式名《Vol. 2 (Breaking Through)》，樂團第三張、Reprise 第二張；策展 curatorWhy「評價最高」不成立（維基與樂評傳記以《Volume 3》為最成熟），寫作勿稱最高評價。
- 30743：Mick Karn《Dreams of Reason Produce Monsters》發行日維基 1987-02-16、MB 1987-03-09，錄於 1986-04/05；年份維持 1987。moodGuess「低沉貝斯」存疑：貝斯退居次要，實為器樂為主的新古典藝術流行（輕度，不建議汰換）。
- 30744：Mick Karn《Titles》、Paul Davis、Jazz Butcher 兩張、Sugarcubes 皆為正規錄音室專輯，身分、年份、廠牌核對無誤；無需汰換。Davis 專輯確為〈I Go Crazy〉所在（維基歌曲條目）。
- 30745：Karn Titles、WCPAEB、Davis 缺專輯級樂評，status 標 partial；聲音描述取自人員表與傳記。
- 本組未含 Willie West（在 d 組）。

## 主線（條號 30771–30790）
- **30771** WCPAEB《Volume 2》curatorWhy 去掉「評價最高」（研究 e：維基與樂團傳記以《Volume 3》為最成熟，《Vol. 2》是最有野心的一張；正式名《Vol. 2 (Breaking Through)》）。仍收《Part One》＋《Volume 2》兩張，正文不得寫「評價最高／最佳」。Sugarcubes 廠牌正文寫原名 One Little Indian。
- **30772** Gravy Train 出身改「蘭開夏聖海倫斯」（研究 a 推翻策展層「曼徹斯特」）。Atomic Rooster 第二張盤名維持封面通行寫法《In Hearing Of Atomic Rooster》（MB 題名《In Hearing Of》，queryAlias 已帶）。High Tide 首作評價明顯高於第二張，兩張照收（可逆，評分照實）。

## 研究 c 組（30721–30730）
- **30721** Pierrot Lunaire 兩張廠牌推翻策展層「Grog」：Discogs（release 9864663、2901108）與 it.wikipedia 皆為 It（Vincenzo Micocci 的廠牌，RCA 發行壓片），目錄號 ZSLT 70025／ZPLT 34.000；Grog 無來源。《Gudrun》原訂 1976 由 Vista 發行，Vista 結束故 1977 改 It。
- **30722** Affinity 身分無誤（1970 英國 Vertigo 6360 004）；七首中五首翻唱，策展層「Mr. Joy／I Am and So Are You 為樂迷所愛」無來源，不寫。
- **30723** Mike Ratledge《Riddles of the Sphinx》：1977 電影配樂、2013-11-06 Mordant Music MM066 首發，年份廠牌屬實；以配樂例外保留（唯一個人署名作品）。
- **30724** Nine Days' Wonder《We Never Lost Control》是第二張（非第三張）；無女主唱（Discogs 僅 Seyffer 主唱），moodGuess「女聲」存疑；首作無管風琴，主奏是薩克斯風／長笛，moodGuess「管風琴」存疑。
- **30725** Tully 廠牌確認 Columbia（EMI 澳洲）SCXO 7926，1970-07，Go-Set #6／Kent #9。
- **30726** Zaratustra：與 Jodorowsky 的關係查實（Discogs 封底註記「Escrita y dirigida por Alexandro Jodorowsky」＋ Text By、KBOO 1970 舞台劇）；但這是舞台劇名與劇場錄音，非樂團，音樂疑為 Las Damas Chinas 的自由爵士（間接證據），status thin，moodGuess「迷幻民謠」存疑，主線自行決定去留。
- **30727** Martin & Garp 國別改荷蘭（Social Beats 在多德雷赫特；Légère、Sounds of Subterrania 稱 Dutch），建議 country nl；首發日版 P-Vine 2020-10-21。
- **30728** Slow Dancer 國別澳洲墨爾本（Simon Okely，前 Oh Mercy 吉他手）；廠牌推翻策展層「Lazy Eyes」：美國 ATO Records ATO0398，澳洲據 Qobuz 為 Pieater（單一來源）；確為第二張（首張 2014《Surrender》）。
- **30729** WebSearch 共用 3 次（Slow Dancer、Martin & Garp、Zaratustra）；Mordant Music 官網網域已被劫持，不採用。
- **30773** 研究 c 組更正照收：Pierrot Lunaire 兩張 label 改 It（Micocci 廠牌、RCA 壓片；ZSLT 70025／ZPLT 34.000）；Martin & Garp 國別改 nl（荷蘭多德雷赫特 Social Beats 廠主之一 Phil Martin），首發 2020-10-21 日本 P-Vine CD，label 取 P-Vine；Slow Dancer 澳洲墨爾本、label 改 ATO Records；Tully label Columbia（EMI 澳洲）；Nine Days' Wonder《We Never Lost Control》是第二張。
- **30774** Zaratustra《Su Música... Su Filosofía...》保留：Spotify「Zaratustra」掛名下只有這張；研究 c 查實是 1970 年 Jodorowsky 編導、取材尼采的舞台劇錄音（製作人 Victor Rapoport），不是一般樂團作品，正文照「劇場錄音」寫，演奏者不明處不寫（Las Damas Chinas 只有間接關聯，不進正文）。

## 研究 d 組（30731–30740）
- **30731** Eyeless in Gaza《Pale Hands I Loved So Well》首發年定 1982：Discogs master 1199581／release 325860（挪威 Uniton U 004）、英文維基皆 1982；錄音完成於 1981 冬。**廠牌推翻策展層**：首發是挪威 Uniton Records，Cherry Red 僅為授權方（版權欄），建議 label 改 Uniton。聲音幾乎全器樂、無鼓組，moodGuess「抒情」存疑。
- **30732** Eyeless in Gaza《Rust Red September》確認：1983-07-15 Cherry Red BRED 50，首張疊錄；Sounds 稱「明亮輕快」，moodGuess「悲傷」偏重但可。
- **30733** Martyn Bates《Letters Written》**廠牌推翻策展層**：Cherry Red TRED 38（MB、Discogs 一致），不是 Mute；10 吋、十首、約 31 分鐘。荷蘭 Vinyl 樂評稱只有合成器與歌聲，無吉他，moodGuess「簡約吉他」存疑（靜謐成立）。
- **30734** Martyn Bates《The Return of the Quiet》廠牌 Cherry Red BRED 81 核對成立（1987-11）。**moodGuess 存疑**：有鼓、貝斯、合成弦樂與 80 年代製作（NME、Télérama），不是素樸靜謐民謠。
- **30735** The Sugarcubes《Life's Too Good》**廠牌推翻策展層**：卡單「One Little Independent」誤，正確為 One Little Indian（MB tplp 5；美國 Elektra）。
- **30736** Sun City Girls《Torch of the Mystics》原盤 1990-01 美國 Majora 5-23102（限量 1000 張 LP）；**廠牌推翻策展層**：「Majestic Mountain / Riot Season」在任何來源皆無，應改 Majora（1993 Tupelo、2015 Abduction 為再版）。
- **30737** Sun City Girls《Dante's Disneyland Inferno》原盤 1996-05-06 Abduction ABDT007（雙 CD）；**廠牌推翻策展層**：「Majestic Mountain」查無，只有 Abduction。素材多為 Torch 時期未用錄音重混；主體是口白說故事與零碎配樂，moodGuess「搖滾」存疑。
- **30738** Paul Davis《Cool Night》核對成立：Arista AL 9578，1981，US；無推翻。
- **30739** Alma Cogan《I Love to Sing》核對成立：HMV CLP 1152，1958，單聲道，首張專輯；無推翻。
- **30740** Willie West《Lost Soul》**國別推翻策展層**：芬蘭 Timmion（赫爾辛基）廠牌、芬蘭 High Society Brothers 伴奏，MB／Discogs 國別 FI，僅人聲在美國明尼蘇達錄；建議 country fi 或主線自裁。聲音偏慢、陰沉的暗色靈魂，非放克。WebSearch 共用 1 次（Lost Soul）。

## 研究 b 組（30711–30720）
- **30711** Steamhammer《Mountains》廠牌推翻策展層：Discogs master 90059（B & C Records CAS 1024，封面與標籤）與英維基皆為 B & C，不是 CBS（MB release 寫 CBS 與兩處不合）；建議卡單 label 改 B & C。年份 1970（Discogs 引 Record Collector 為 11 月）。
- **30712** Paul Kossoff《Back Street Crawler》curatorWhy「逝世前的最後錄音」不成立：Kossoff 之後還有 Back Street Crawler 樂團的 1975《The Band Plays On》與 1976《2nd Street》，1976 年 3 月才過世；本盤只是個人名義唯一專輯。寫作層勿寫遺作。
- **30713** The Open Mind：curatorWhy「Magic Potion 等曲」不實，〈Magic Potion〉是 1969 年 8 月另出的非專輯單曲（Discogs 曲目、英維基、PopMatters 一致），只在重發當加曲。專輯本身失真偏收斂（PopMatters），moodGuess「重失真粗獷」部分不符，不建議汰換。
- **30714** The Cosmic Jokers 兩張（KM 58.008／KM 58.010）：Kaiser 未經樂手同意剪輯 1973 年 2–5 月 Dierks 錄音室即興帶的爭議盤，照 sf07 裁定收；facts 與 notes 交代來歷（Göttsching 在柏林唱片行聽到、Schulze 提告、Kaiser 合約被法院判無效、廠牌結束），但『樂手不知情』多為維基／Discogs（allegedly）單一說法，已用『據說』語氣。《Galactic Supermarket》專屬來源薄（英維基無專輯頁），status thin，聲音不寫具體樂器。
- **30715** Peter Kaukonen《Black Kangaroo》封面：CAA 無圖，Discogs master 598288 primary 圖即原版首發 release 1998375（Grunt FTR-1006，1972 US）封面，URL 見該卡 notes；本層直連 i.discogs.com 回 403，未硬繞，主線需帶 Discogs 認證或瀏覽器抓。facts 多出自 Peter 本人 2020 訪談（psychedelicbabymag）單一來源，用『他說』語氣，status thin。
- **30716** Ikarus：身分核對成立（漢堡、+plus+ plus 4、1971，Discogs master 368869）；BIC 前身、比賽、音樂節、拒簽 Metronome 全出自 dereksmusicblog 單一來源，該文寫專輯 1972 年 2 月發行與 Discogs／MB 的 1971 衝突，標 uncertain，facts 用『據該部落格』語氣；曲目採 Discogs 四首（jazzrocksoul 寫五首，衝突）。status thin。
- **30717** The West Coast Pop Art Experimental Band《Part One》：Reprise 首張、整體第二張（Discogs master 185304，R 6247，1967-02；樂團維基 band 頁寫 May 1967，專輯頁寫 February 1967）；與 e 組《Volume 2》是兩張不同唱片，不重複。AllMusic 稱本張最強，與 e 組『Volume 3 最成熟』不同調，兩說並存。
- **30718** Khan《Space Shanty》、Steamhammer《MK II》身分年份核對無誤。MK II 年份衝突：MB／Discogs 1969，英維基 infobox 寫 1970 年 2 月，卡單 1969 維持，facts 不寫月份。Space Shanty 發行月 5 月（MB、Hillage 維基）對 6 月（專輯與 Khan 維基）不一，facts 只寫 1972。curatorWhy 說『加入 Canterbury 圈前的唯一專輯』不準，專輯本身即被歸入 Canterbury，寫作層勿沿用。
- **30719** 本組沒有彙編、現場（Mountains 含兩首現場但為原創專輯）、重發；無建議移除。
- **30720** WebSearch 共 2 次（Cosmic Jokers 來歷、The Open Mind 專輯樂評）；其餘為 MB／Discogs API、英維基 action=raw、PopMatters、Pooterland 訪談、psychedelicbabymag 訪談。AllMusic、ProgArchives 被 Cloudflare 擋，內文未取得。
- **30775** 研究 d 組更正照收：Eyeless in Gaza《Pale Hands I Loved So Well》1982、label 改 Uniton Records（挪威首發 U 004，Cherry Red 為授權方）；Martyn Bates 兩張 label 皆 Cherry Red（《Letters Written》10 吋 10 首約 31 分，MB／Discogs 皆標 Album，照收）；Sun City Girls《Torch of the Mystics》label 改 Majora（1990 限量 LP）、《Dante's Disneyland Inferno》改 Abduction；Sugarcubes 兩張 label 改 One Little Indian。Willie West《Lost Soul》country 維持 us（卡片國別取藝人國籍；伴奏與廠牌在芬蘭，正文照實寫）。
- **30776** 研究 b 組更正照收：Steamhammer《Mountains》label 改 B & C（CAS 1024）；Kossoff《Back Street Crawler》是他唯一個人名義專輯，**不是遺作**（之後還有 Back Street Crawler 樂團兩張），正文不得寫最後錄音；The Open Mind〈Magic Potion〉是 1969 單曲、不在原盤，正文不寫成專輯曲；Khan curatorWhy 去掉「加入 Canterbury 圈前」。Ikarus 出身細節只有單一部落格來源，寫作層降階或不寫；Cosmic Jokers「樂手不知情」寫作層不用「據說」，改寫成有出處的事實（Göttsching 在唱片行才發現、Schulze 提告）。
- **30777** sf07 研究層全數交件：47 張，qa-batch research 全部通過；研究層建議汰換 0 張。
