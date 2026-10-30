# add-20261030-sf10 裁定（Spotify 追蹤藝人補卡池・電子、實驗、新古典鋼琴、house）

> 店主 2026-10-30 `/dip-card-create`：依 Spotify 追蹤藝人補卡池，每位缺漏藝人挑 1–2 張代表作（交接 `batch-progress/spotify-follow-20261030/PLAN.md`）。本工作階段負責 sf09、sf10。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-sf10a.json`（31）＋`curation-sf10b.json`（16）→ 主線汰 10、改 1（`master-override-sf10asf10b.json`）→ `master-sf10asf10b.json`（37 張，全部 MB 釘住）→ `pick.json`（37）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf10-cards.json`（37 張；研究 a–d 各 8、e 5）。
> **預留：研究 a 41901–41910、b 41911–41920、c 41921–41930、d 41931–41940、e 41941–41950、鉤子 41951–41960、寫作 41961–41970、主線 41971–41980。**
---

## 主線策展（不佔條號）
- **清單 33 位 → 收 32 位、37 張；跳過已在池 0 位；不收 1 位。** 池中近似名逐位排除：Against All Logic 是 Nicolas Jaar 的別名（池中 Jaar《Space Is Only Noise》），但這個掛名沒有卡，照 PLAN 判準收；Monoton（維也納 Konrad Becker）不是池中 MONO；Christoph De Babalon 不是池中 Christ.；Throwing Snow 不是 Wings；Danger Mouse & Sparklehorse 是合作名義，與池中 Sparklehorse 分開。
- **Spotify 藝人頁回查（主線全批 33 位）**：`open.spotify.com/embed/artist/<id>` 熱門曲逐位核對，身分全部與策展一致（例：Ruxpin 熱門曲含 múm 的混音＝冰島 Ruxpin；Danger Mouse 熱門曲是 Gnarls Barkley、Broken Bells、DANGERDOOM）。
- **不收**：Gibran Alcocer——沒有正規專輯，策展提的《Music for Silhouettes》（2026）是 6 首 EP；新古典鋼琴不在 §5.5 白名單，這張也沒有「歷史地位」的舉證，不開例外。
- **一位只收一張（主線汰第二張，策展給太寬）**：派工規則是「第二張要確實是另一個高峰才收」。汰 Against All Logic《2017–2019》、Clutchy Hopkins《Walking Backwards》、Federico Albanese《By the Deep Sea》、French 79《Joshua》、Grandbrothers《Open》、HVOB《Silk》、Joep Beving《Prehension》、L'Acephale《Malefeasance》、Luke Abbott《Wysing Forest》，各留首作或樂評最高的那張。
- **留兩張的**：Alvin Curran（1975《Canti e vedute del giardino magnetico》＋2004《Maritime Rites》，兩個時期的代表作）、Juana Molina（《Segundo》《Un día》）、Kate NV（《для FOR》《Room for the Moon》）、Lau Nau（《Kuutarha》《Nukkuu》）、Danger Mouse（與 Sparklehorse 的《Dark Night of the Soul》、與 Daniele Luppi 的《Rome》，兩個合作名義各一張；Gnarls Barkley、Broken Bells、DANGERDOOM 是樂團名，不算）。
- **Against All Logic《2012–2017》**：MB 標 Album＋Compilation。英文維基寫它是 Jaar 的第三張錄音室專輯、AAL 名義的首張。走 §5.6 重要合輯精選制，證據是維基與 MB。
- **Rich Ruth**：策展收 2024《Water Still Flows》，主線改收 2022《I Survived, It's Over》（Third Man，MB 03f776ca）。後者是他的突破作，CAA 有圖。
- **名稱與年份**：Kate NV 第一張照 MB 寫《для FOR》；L'Acephale 的掛名照 MB 與 Spotify 寫，不加重音，盤名《L'Acéphale》照 MB。Danger Mouse & Sparklehorse 取 2010 官方發行年，MB 的 2009 是外流與附空白 CD-R 的版本。Juana Molina《Segundo》取 2000 阿根廷原版年，MB 的 2003 是 Domino 國際版。
- 交研究層把關：Saint Abdullah、Shinjuku Thief、Yung Bae、Vapour Theories、Mareux 的代表作沒有評論共識，策展是依評論數量推定，研究層查清楚。也要查 Mareux 兩筆同名 release-group、Ruxpin《Avalon》2003 原版與 2018 重發，以及 Clutchy Hopkins 的身分迷霧。廠牌策展說是憑記憶的，研究層要逐張核對：Ubiquity、Mercury KX、Alter K、Tragen。

## 研究 b 組
- **41911** HVOB《Trialog》廠牌推翻策展層：策展寫 Tragen Records，實際為 Stil vor Talent（MB svt 150cd，英德維基與 Oliver Koletzki 簽約說法一致）；查到的來源中 Tragen 與 HVOB 無關聯。上架廠牌用 Stil vor Talent。
- **41912** Joep Beving《Solipsism》廠牌推翻策展層：Mercury KX 查無關聯（Mercury KX 2016 年成立、隸屬 Decca）。首發 2015-08 自行發行（MB 廠牌 iaregiantrecords），Deutsche Grammophon 於 2017 年重發（DG 官方；MB 記 2016-12-30，以 DG 官方為準）。上架廠牌建議 Deutsche Grammophon、年份 2015。
- **41913** Juana Molina《Segundo》：2000 年是阿根廷自行發行原版（Crammed Discs 2021 週年版說明），Domino 是 2003 年國際版；英文維基信息框寫「2000, Domino」與之衝突，以 Crammed 與 MB 為準。原版阿根廷廠名查不到。簡介勿寫「Domino 2000 年發行」。
- **41914** Juana Molina《Un día》不是第四張而是第五張（Rara、Segundo、Tres Cosas、Son 之後），facts 不採序數。
- **41915** Grandbrothers《Dilation》：策展 curatorRisk 的「標準版 2015-02-23」查無來源，未採；MB first-release 2015-03-23（數位／Deluxe），2015-03-31 德國 FILM CD（FILM CD001）。廠牌 FILM 已核屬實（Grötz 與 Breuer 創立）。團體所在地杜塞道夫（德文維基）與 Bandcamp「柏林」並存，facts 標明來源。
- **41916** French 79《Olympic》：Alter K 已核（MB CA 版）。法文維基列客席人聲含 Kid Francescoli、Julia、Sarah Rebecca，但 MB 曲目只掛 Sarah Rebecca，facts 只寫兩位有交叉來源者；Alter K 成立年與早期目錄未查，不寫廠牌第一張。
- **41917** moodGuess：本組無須汰換。輕微提醒：Albanese〈Queen and Wonder〉底下有電子節拍；Juana Molina《Segundo》實際更像房間錄的吉他＋鍵盤＋機器，「極簡電子」略偏；無直接來源可斷定有無鼓。
- **41918** WebSearch 使用 3 次（Segundo 原版廠牌、Albanese 專輯、Beving 廠牌）；Pitchfork、BBC、AllMusic、Discogs、Guardian 被工具擋，評論引述改用維基與廠牌／樂評站。

## 研究 d 組
- **41931** Shinjuku Thief《Bloody Tourist》掛名人物推翻策展層：curatorWhy 寫「David Thrussell 的 Shinjuku Thief」，錯；實為墨爾本 Darrin Verhagen 與 Charles／François Tétaz（MB、Discogs 人員、維基 Darrin Verhagen 條三家一致）。Thrussell 屬 Black Lung／Snog，與本盤無關。年份 1992、廠牌 Extreme 屬實；Extreme 創辦人與目錄號僅維基單一條目，寫作層以「澳洲廠牌」帶過即可。status 標 thin：找不到任何樂評正文描述聲音，moodGuess 依據的「電影取樣」無來源，只有 dark ambient 標籤與樂手清單（shakuhachi、貝斯、薩克斯風、吉他、程式）。
- **41932** Orchestra of Constant Distress《Concerns》：身分、廠牌 Riot Season、2021-07-30 全對，Discogs 版載 Elementstudio（哥特堡）由 Linus Andersson 錄音。Quietus 寫鼓手為 Henrik Andersson，Spectrum Culture 與 Discogs 為 Bryngelsson 鼓、Andersson 貝斯，採後者。聲音偏噪音／sludge，Discogs 風格標 Noise，可能比預估更偏實驗；無須汰換。
- **41933** Planningtorock《W》：發行日有三種（MB 英版 2011-05-16、歐版 05-17，Discogs／維基 05-23），facts 只寫「2011 年 5 月」。發行時署名 Janine Rostron，2012–2013 年改名 Jam，facts 標時序。moodGuess 存疑：x3.4 偏躁，但 The Arts Desk 說多數歌比悠閒走路還慢、RA 說少有可跳舞的拍子，實際偏靜、偏冷，建議主線調低 x。
- **41934** Peggy Gou《I Hear You》：無疑點。moodGuess 小存疑：「明亮四拍 house」大致成立，但含 downbeat（All That）、drum and bass（Seoulsi Peggygou）、trance（1+1=11），非整張四拍；不汰。Clash 把 Lobster Telephone 誤打成 Lobster House，以 MB／Discogs 曲目為準。BPM 無來源不寫。
- **41935** Photay《Onism》：無疑點（MB／Discogs／Bandcamp 一致，2017-08-11，Astro Nautico）。Pitchfork 被工具擋，聲音證據只有 Bandcamp 說明與 Discogs 人員（balafon、薩克斯風、大提琴、人聲），鼓與速度查不到；moodGuess「輕盈」小存疑：說明強調近寂靜與飽和兩端、主題偏環境焦慮。WebSearch 用 1 次。
- **41936** Rich Ruth《I Survived, It's Over》：curatorWhy 的「突破作」無樂評共識，只證實它是第三張（2019《Calming Signals》、2021《Where There's Life》之後）；facts 不寫突破。moodGuess 存疑：預估溫厚靈性，實際樂評說從 ambient 轉向帶亂流的融合，有鼓、薩克斯風爆發、灼燒吉他，題材是創傷與混亂，比預估躁、暗，仍有風琴與豎琴的暖段。BroadwayWorld 為新聞稿轉載，樂評僅一篇個人部落格。WebSearch 用 1 次。
- **41937** Ruxpin《Avalon》：2003 原版 Elektrolux 屬實（Discogs 2003-10-15、MB 2003-11 並列），2018-04-24 Sun Sea Sky 重新母帶首度黑膠。年份取 2003。維基的「Ruxpin」是 Teddy Ruxpin 玩具條目，勿混。「代表作」只有單篇樂評（Igloo Magazine）與重發事實支撐，facts 不寫代表作。聲音：直白節拍＋vocoder 人聲＋合成器鋪底，無衝突。WebSearch 用 2 次。
- **41938** Saint Abdullah《Stars Have Eyes》：無疑點（Purple Tape Pedigree、2018-04-06、第二張）。「成名作」無獨立樂評共識，不寫。兄弟國籍：兩篇來源寫伊朗出生，另一檢索摘要稱 Iranian-Canadian，僅單一來源未採。聲音含 hard beats 與近似俱樂部的收尾曲，非全慢，moodGuess 無嚴重衝突。WebSearch 用 1 次。
- **41939** 本組廠牌核對結果：Riot Season、XL、Astro Nautico、DFA（併 Rostron Records）、Third Man、Elektrolux、Purple Tape Pedigree、Extreme 全部與 MB／Discogs 一致，無廠牌被推翻；本組推翻策展層共 1 處（41931 掛名人物）。
- **41940** 工具限制：Pitchfork、AllMusic、Rough Trade 被擋（403／工具封鎖），Discogs 網頁 403 但 API 可用，改以 API 取人員與曲目。WebSearch 全組用 7 次（每支均 ≤3）。
