# add-20261030-sf09 裁定（Spotify 追蹤藝人補卡池・爵士：含日韓爵士、ECM、世界爵士）

> 店主 2026-10-30 `/dip-card-create`：依 Spotify 追蹤藝人補卡池，每位缺漏藝人挑 1–2 張代表作（交接 `batch-progress/spotify-follow-20261030/PLAN.md`）。本工作階段負責 sf09、sf10。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-sf09a.json`（26）＋`curation-sf09b.json`（17）→ 跨組去重＋主線汰 2（`master-override-sf09asf09b.json`）→ `master-sf09asf09b.json`（39 張：MB 釘住 37、§1 人工 2）→ `pick.json`（39）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf09-cards.json`（39 張；研究 a–d 各 8、e 7）。
> **預留：研究 a 41801–41810、b 41811–41820、c 41821–41830、d 41831–41840、e 41841–41850、鉤子 41851–41860、寫作 41861–41870、主線 41871–41880。**（sf 線條號：sfNN → 41001＋(NN−1)×100 起，每批 80 條。）
---

## 主線策展（不佔條號）
- **清單 41 個 Spotify 掛名 → 收 32 位、39 張；跳過已在池 4 位；不收 2 位。** 同一人的「X」與「X Trio／X's 樂團」合併挑：Bobo Stenson／Bobo Stenson Trio、Jacques Loussier／Jacques Loussier Trio、Marc Johnson／Marc Johnson's Bass Desires、Marc Ribot／Marc Ribot's Ceramic Dog。
- **跳過（池中已有）**：
  - The Joe Harriott-John Mayer Double Quintet → 池中 Joe Harriott（《Free Form》《Abstract》2 張）。
  - Toshiko Akiyoshi Trio → 池中 秋吉敏子／秋吉敏子トリオ（14 張）＋Toshiko Akiyoshi-Lew Tabackin Big Band（1 張）。
  - 板橋文夫トリオ → 池中 板橋文夫（2 張）＋Fumio Itabashi Trio《濤》。
  - 菊地雅章クインテット → 池中 菊地雅章／Masabumi Kikuchi Quintet（8 張以上）。
- **不收**：
  - Jon Christensen：沒有領銜專輯（MB 只有《Selected Recordings》精選，其餘是 Jarrett、Garbarek、Stenson 的側翼鼓手盤）。
  - Multiverse：策展 b 推定為挪威爵士團《Theory of Anything》，主線用 Spotify 藝人頁（open.spotify.com/embed/artist/0l2z1SB8aaIp8vNhI9i5YL）回查，熱門曲是〈有緣作伙〉〈恨帥潮〉〈狠操俱樂部〉——**是台灣嘻哈廠牌 Multiverse Entertainment 的帳號**（Apple TW《破籠》℗ Multiverse Entertainment CO., LTD.，掛名 Multiverse feat. Macdella、EyeballRay、SheATH）。比照 PLAN.md skipLabels，廠牌／班底帳號不收；挪威那張也不收（身分不符）。
- **Spotify 藝人頁回查（主線全批 41 位）**：`open.spotify.com/embed/artist/<id>` 熱門曲逐位核對身分；除 Multiverse 外皆與策展身分一致。Kazuyoshi Nakamura 熱門曲〈キャノンボール〉〈犬と猫〉〈セブンスター〉＝**中村一義**（分錯場景照收，不搬批）；Swing Slow 熱門曲掛名 Haruomi Hosono、Miharu Koshi＝細野晴臣×越美晴的計畫；Graciela Susana 熱門曲〈百万本のバラ〉〈サバの女王 '91〉＝在日本走紅的阿根廷歌手。
- **Sokratis Votskos with The Giorgos Pappas Trio**：兩組都收了不同張。a 收他名下 Quartet 的《Sketching the Unknown》，b 收唯一同署名的《Impressions of Samos》（2026，MB 署名 Greg Foat & Sokratis Votskos）。**主線取 b**：Spotify 追蹤的是「with The Giorgos Pappas Trio」這個掛名，就收這個掛名的盤，a 那張汰掉。卡池掛名照 b 寫「Greg Foat, Sokratis Votskos & The Giorgos Pappas Trio」。
- **跨組重複**：The Greg Foat Group《Girl and Robot With Flowers》、Tyreek McDole《Open Up Your Senses》兩組都提，`build-master` 留 a 組版本。Greg Foat Group 另收 a 組的《Dark Is the Sun》（2011 首作）。
- **Daniel Ponce《Arawe》年份**：a 組改成 Discogs 主版本 1988，主線回 MB 1987（Antilles New Directions 原版 1987，Discogs 主版本年是美國再壓），用 MB。
- **高木元輝**：池中只有合作名義（高木元輝＝加古隆カルテット《パリ日本館コンサート》、土取利行・高木元輝《Origination》），沒有他個人領銜的卡。照 PLAN 判準「卡池上這個掛名有沒有卡」收《Mosura Freight!》（1975，§1 人工身分：MB 查無，Discogs＋jazzmusicarchives）。
- **Flea**：池中只有 Red Hot Chili Peppers，個人名義沒有卡；他第一張個人錄音室專輯《Honora》（2026，Nonesuch）收進來。**swing slow** 同理：池中有細野晴臣名下的卡，但這個計畫掛名沒有。
- **Fresh Moods**：德國 Elektrolux 廠牌旗下的個人計畫（Discogs artist 10072），不是廠牌或合輯帳號，收同名首作（1997）。
- **2 張的藝人**：Bobo Stenson Trio（《Serenity》《Cantando》）、John Surman（《Westering Home》《Road to Saint Ives》）、Marc Johnson（《Bass Desires》《Shades of Jade》）、Marc Ribot（《Rootless Cosmopolitans》＋Ceramic Dog《Your Turn》）、Mark Guiliana（Jazz Quartet《Family First》《Jersey》）、Nils Landgren Funk Unit（《Paint It Blue》《Fonk da World》）、The Greg Foat Group、Dominique Fils-Aimé（《Nameless》《Three Little Words》）。其餘各 1 張。
- 交研究層把關：Michel Sardaby《Night Cap》、The Greg Foat Group 的廠牌（策展說是憑記憶）；David Becker Tribune 的封面是 2025 再版；Moses Yoofee Trio《MYT》是不是首張正規專輯、年份；Graciela Susana《Adoro, la reine de Saba》原盤廠牌與封面（CAA 無圖）；濱瀬元彦《Reminiscence》1986 原盤與 2018 重錄版分清楚；Spiral Deluxe 成員與國別；Assagai 美版改題《Zimbabwe》。

## 研究 b 組
- 41811：Marc Ribot《Rootless Cosmopolitans》卡單 label Island 與 LP 原版不符：英國 LP 為 Antilles（AN 8749），美國 CD 為 Island（422-842 577-2）；facts 並列，卡單 Island 可留（CD 版）。
- 41812：Mark Guiliana《Family First》卡單 label Motéma 有誤，原版是 Guiliana 自家 Beat Music Productions（BMP003，2015-06-04，Discogs；MB 另有日本 AGATE 版），Motéma 是《Jersey》（2017）。建議主線把卡單 label 改為 Beat Music Productions。
- 41813：Guiliana《Jersey》署名為 Mark Guiliana Jazz Quartet，寫作層用此名；《Family First》moodGuess 寫「電氣質感」存疑，實為全原聲四重奏。
- 41814：John Surman《Westering Home》moodGuess「蘇格蘭民謠味」存疑：九首全是 Surman 自作曲，無同名曲，是一人多軌疊錄、無鼓的管樂／單簧管實驗作（Island HELP 平價系列 HELP 10）。不汰卡。錄音時間地點查無。
- 41815：Manu Katché《Neighbourhood》、Marc Johnson《Bass Desires》《Shades of Jade》身分、年份、廠牌與 MB／Discogs／ECM 對得上；發行日各源差幾天（Neighbourhood 9-12／9-23／9-26；Shades 9-12／9-17），facts 只寫 2005 年 9 月。
- 41816：Marc Ribot's Ceramic Dog《Your Turn》MB 版是歐洲 Yellowbird（2013），美版 Northern Spy NSLP 038 即同一張；卡單 Northern Spy 正確。
- 41817：Wikipedia 的 Marc Johnson 條目帶「需補引用」標籤，其中 Time／Chicago Tribune 年度榜與丹麥音樂獎為單一來源，未採用；Bill Evans 年份（1978–80）照用，已與 Shades 頁交叉。
- 41818：外部取不到：AllMusic（403）、AAJ（403）、NPR（503）、northernspy.org 不在白名單，Katché／Ceramic Dog 部分評語取自搜尋摘要與 PopMatters、Textura。WebSearch 本組用 4 次（超出每支 3 次一次）。

## 研究 e 組
- 41841：Assagai《Assagai》**推翻策展層兩處**：(1)「US 版題為 Zimbabwe」不成立——美版 Vertigo VEL-1004 題名仍是《Assagai》、曲目同英版（Discogs master 107720）；《Zimbabwe》是另一張專輯（Philips 6308 079，曲目全異，樂團第二張也是最後一張）。(2)「含名曲 Kari」查無，首作 8 首無此曲。卡仍以《Assagai》（Vertigo 6360 030，1971）為正名。樂評稱其為相當平淡的 Afro-pop-rock，moodGuess 熱烈偏高但不致汰換。
- 41842：Spiral Deluxe《The Love Pretender》**推翻策展層**：不是底特律二人組，是 Jeff Mills 領軍的四人電子爵士團（Mills、Gerald Mitchell、Yumiko Ohno、Kenji Hino），廠牌 Axis Records AX-122（策展 label 欄空白應補 Axis），且為第二張專輯，首張為 2018《Voodoo Magic》，非「唯一一張」。moodGuess 存疑：預估「爵士 house 四拍」，實為即興電子爵士、曲長 5–11 分鐘，建議主線重估。國別卡單 us 可維持（團員橫跨底特律／日本，Discogs 掛 US）。
- 41843：Flea《Honora》身分、年份（2026-03-27）、廠牌 Nonesuch 皆對。moodGuess 存疑：預估「爵士搖滾、鬆而帶勁」，實際是 Parker／Butterss／Parks 爵士室內樂編制加弦樂與長笛，無失真樂器、速度偏緩，建議 y 下修。榜單名次與評論引語僅 en.wikipedia 單一來源。
- 41844：Graciela Susana《Adoro, la reine de Saba》身分、1973-05-05、Express ETP-9072 對得上。**策展 genre 存疑**：這是日本製作的 LP，西語／法語／日語流行歌與日本民謠混合，不是探戈專輯，簡介不宜寫成探戈。銷量 100 萬張與 Oricon 220 週僅維基單一系統（en 自標 citation needed），status thin、鉤子勿當硬事實。查無編曲者與樂評。
- 41845：swing slow《swing slow》身分、1996-10-25、Mercury PHCR-916 對得上；發行不在細野自立的 Daisyworld（1996 成立），而是 Mercury／Sun & Moon Records。聲音只有 credit 與曲名可據（細野負責節奏編曲與音效設計，越美晴和聲編曲），無評論，status thin。「Mr. Harry Hosono Jr.」只有 ja.wikipedia 越美晴條一個來源。
- 41846：Fresh Moods《Fresh Moods》確認是 Peter Haubfleisch 個人計畫、非廠牌帳號，Elektrolux E 1101 CD、1997 對得上；人物生平只有 Discogs 藝人簡介單一來源，聲音僅有風格標籤（Future Jazz／Downtempo）與曲名，無獨立樂評。
- 41847：uKanDanZ《Yetchalal》身分、2012 年、Buda Musique 860230 對得上；本張編制未列貝斯手（Discogs），不寫低音歸屬。樂團成軍年只有 2010 駐地一筆，不寫成軍年。
- 41848：WebSearch 用 3 次（uKanDanZ、Assagai、Spiral Deluxe）；AllMusic／progarchives／Discogs 網頁多為 403，改走 Discogs／MB API。miharukoshi.com 不在網路白名單。swing slow 與 Graciela Susana 因此未用搜尋，來源偏薄。

## 研究 a 組
- 41801：Bill Bruford's Earthworks《Earthworks》身分、1987、Editions EG（MB 寫 E'G）對得上；聲音（原音鼓加 Simmons 電子鼓、Dave Stewart 低音合成器與取樣）來自維基樂團頁與 Discogs 版本備註，沒取得樂評；專輯維基頁 404。
- 41802：Bobo Stenson Trio《Cantando》ECM 2023，2007-12 盧加諾錄音、2008-08 發行，確認。鼓手是 Jon Fält（與《Serenity》的 Christensen 不同）。keyTracks 只放〈Pages〉。
- 41803：Bobo Stenson Trio《Serenity》ECM 1740/41，2000-06-05。**推翻維基**：錄音地是瑞典 Brunskog 的 HageGården（ECM 官方頁與 ECM Reviews），不是奧斯陸 Rainbow。「Christensen 最後錄音」只見搜尋摘要，不寫。
- 41804：Daniel Ponce《Arawe》LP 1987（Antilles New Directions 90631-1），確認 1987，推翻 Discogs master 的 1988（取自最早 CD）與英文維基的 1983（誤植）。Discogs master 1515704 是兩首的宣傳 12 吋，不是專輯，封面別取。樂手名單 D'Rivera／Puente 等只有 Shuga 商品頁單一來源，已在 facts 標出處。
- 41805：David Becker Tribune《Siberian Express》**推翻策展層兩處**：樂團是美國團（洛杉磯，兄弟 David／Bruce Becker；移居德國是日後事），本張是第二張（首作是 1986《Long Peter Madsen》，MCA）。R&R 第 3 名單一來源，不建議當賣點；封面原版請取 1988 Discogs 版（Apple 為 2025 再版封面）。
- 41806：Hal Galper《Reach Out!》身分對得上；卡掛 Hal Galper，Discogs／維基掛 Hal Galper Quintet，同一張。錄音 1976-11-11、SteepleChase SCS 1067、Brecker 兄弟在列。錄音室兩源皆未寫，不寫地點。
- 41807：Jacques Loussier《Play Bach No. 1》1959 Decca（法國 SSL 40.500），採 1959；Discogs master 147825 寫 1962，與 MB、維基、IAJO 衝突不採。600 萬張銷量是 1973 年後三重奏整體，不歸本張。
- 41808：John Surman《Road to Saint Ives》ECM 1418，1990-04 Rainbow Studio Oslo、1990-09-01 發行，確認 1990。**存疑**：所有一手來源只寫 keyboards，沒有 synthesizer；樂評也否認它是聖艾夫斯寫景。moodGuess 的意象存疑（不影響收卡）；y 0.6 可能略高，因無鼓組、節奏稀疏。
- 41809：本組 WebSearch 用了 6 次（超過每支 3 次的上限，原因是 Ponce、Becker、Serenity、Loussier 身分與年份需交叉驗證）；AllMusic、jazzmusicarchives、WKCR、Discogs 網頁 403，改走 Discogs／MB API 與 ECM 官方頁。

## 研究 c 組
- 41821：New Klezmer Trio《Melt Zonk Rewire》**推翻策展層兩處**：(1) label 是 Tzadik（TZ 7103，1995，Radical Jewish Culture 系列最初六張之一），不是 Knitting Factory Works；(2) 這是第二張，不是首作（首作《Masks and Faces》1991 Nine Winds NWCD 0144，1996 Tzadik 重發）。錄音日期維基（1995）與 AllMusic 搜尋摘要（1993-04）衝突，未寫。
- 41822：Michel Sardaby《Night Cap》身分對得上，原廠牌 Disques Debs HDD 522（1970-10-30 巴黎錄音），英文維基寫 Sound Hills 是 1993 日本再版廠牌。首作與否各源衝突（法文維基：首作是 1969 Président《Five Cat's Blues》），寫作層勿稱首作。無樂評，標 thin。
- 41823：Moses Yoofee Trio《MYT》**推翻策展層**：國別是德國（柏林成立，Moses 1999 年生於柏林），不是以色列，卡單 country 請改 de。MB 現已有 RG（2025-02-07），可由 manual 改 pinned。確為首張完整專輯（之前只有 2023《Ocean》EP）。2024 Deutscher Jazzpreis「Liveact des Jahres」與德國榜第 72 名為德文維基單源。
- 41824：Nils Landgren Funk Unit《Paint It Blue》完整盤名帶副題「A Tribute To Cannonball Adderley」，是致敬專輯；Brecker 兄弟、Bernard Purdie、Airto 客席，Esbjörn Svensson 彈鍵盤。1997 德國爵士獎單源（英文維基）。
- 41825：Nils Landgren Funk Unit《Fonk da World》身分對得上（ACT 9299-2，英文維基 List of ACT albums 的 9400-0 衝突不採）；Esbjörn Svensson 製作、2001-06 斯德哥爾摩 Nord Studio 3 錄音。
- 41826：Slowly Rolling Camera《Juniper》label 空白已補為 Edition Records（EDN1115）；非純三重奏（核心三人＋六位以上客席）。Bandcamp 稱第三張專輯，MB 算法不同，facts 以「簡介稱」呈現。
- 41827：The Greg Foat Group《Girl and Robot With Flowers》label 確認 Jazzman（JMANCD 054），MB 與 Discogs 日期差三天（數位／CD），只寫 2012 年底；哥特堡 Kungsten Studios 兩段錄音。curatorWhy「口碑最高」無來源，不寫。
- 41828：The Greg Foat Group《Dark Is the Sun》首作成立（Foat 官網作品清單由此起算），label 確認 Jazzman（Gerald Short 執行製作）。MB 與 Discogs 第 6 首 Part 3／Part 4 不同，取 Discogs。moodGuess z 可能偏暖，輕度存疑。
- 41829：本組 WebSearch 用 3 次（NKT、Sardaby、Moses Yoofee），其餘走 MB／Discogs API 與 WebFetch；AllMusic、jazzmusicarchives、Discogs 網頁、Vinyl Factory 皆 403，故 Sardaby、Landgren 兩張無樂評，聲音一句以編制與風格標籤推得。

## 研究 d 組（41831–41840）
- **41831**（McDole）：curatorWhy 說他是「Thelonious Monk 比賽得主」不對——他是 2023 年 11 月 Sarah Vaughan 國際爵士人聲大賽冠軍。零售上市 2025-06-06（Discogs 2024 是宣傳 CDr）。卡單 label 空，補 Artwork Records。年齡來源 24／25 兩說，不寫。
- **41832**（Foat／Votskos／Pappas Trio）：label 查到 Blue Crystal Records（BCRLP011），卡單補。樂手分工（duduk 誰吹）各來源互相矛盾，facts 只寫「Pappas Trio 帶 duduk 與 oud」；Pappas Trio 成員無法獨立驗證，照廠方頁掛名。status thin。
- **41833**（Yttling Jazz）：原版廠牌是 Headspin Recordings（HEAD 004，2005），卡單 label「INGRID」是 2014 再版廠牌，應改；年份 2005 正確。moodGuess 存疑：「電子節拍」偏電子，實際是原聲爵士樂團（鼓、低音大提琴、木管）＋少量 Solina／Omnichord，偏搖滾律動。
- **41834**（高木元輝）：身分 §1 人工成立（Discogs master 512067，Interval ILP 101，1975，限量 300 張，錄於 1975-03-28 北九州 Jazz Street 52）；BnF 目錄為第二來源。簧管類型未明（Discogs reeds／BnF saxo），不寫次中音；Jazz Street 52 不寫成咖啡館。聲音事實僅依編制與風格，無評論來源。status thin。
- **41835**（濱瀬元彦）：卡單 1986 Shi Zen 原盤正確；**2018 Studio Mule 版是重新錄製、曲目不同（7 首）**，不是再版，Spotify 上多半是這一版。寫作層以原盤為主，提 2018 要明講是另一次錄音。原盤樂手與樂器查不到，moodGuess 的「合成器」無法證實。status thin。
- **41836**（中村一義）：label 補 Mercury Music Entertainment（PHCL-5055）。moodGuess 存疑：「披頭四式」查無一手來源（ja 維基只提 Creation 時期英國音樂），簡介不要寫披頭四比擬。Oricon 第 10 名等只出自日文維基 stub 條目，淡化。
- **41837**（Nameless）：curatorWhy 的「Juno 提名」查無證實；Juno 是 2020（《Stay Tuned!》）與 2024（《Our Roots Run Deep》）。highresaudio 稱「第二張」與維基「首張」矛盾，採完整長度首作（2015 有 EP）。La Voix 年份 2015／2017 兩說，不寫。
- **41838**（Three Little Words）：curatorWhy 的「獲 Juno 獎」不成立，這張只有 2021 Polaris shortlist；靈魂／R&B 取向，爵士取向是第二張。moodGuess 存疑：節奏比 Nameless 有勁（打擊、銅管、合成器），y 可能偏低。
- 無須汰卡；唯一建議關注：Foat 一張（41832）樂手分工與署名只能廠方頁為準。

## 鉤子層（d–e）（41856–41860）
- **41856** 交件：`desc-tools/batches/hooks/add-20261030-sf09-hooks-d.json`（8）、`-hooks-e.json`（7），key 逐字照研究稿、順序不變。預算公式照 hook-base 第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin（研究稿 status thin：Samos、高木、濱瀬、swing slow、Graciela）上限 170。逐筆（預算／hook 加權／hook 原始字元）：McDole 227／25／25；Samos 169／23／26；Yttling 229／19.5／23；高木 168／21.5／24；濱瀬 170／18／20；中村 213／18／18；Nameless 225／18／20；Three Little Words 229／18／18；uKanDanZ 228／27／27；Assagai 227／24／28；Spiral Deluxe 230／21.5／27；swing slow 170／22／26；Fresh Moods 230／20／20；Honora 226／24／24；Graciela 164／25／25。初稿 15 張全超標，一律整格捨去：McDole 嗓音一格與 Payton／Silver 全名；Samos 錄音室名、旋律口琴、發行年；Yttling 的 Headspin 發行格；高木的 Tokuhiro／Ono 姓名（facts 仍在）；Nameless 的經紀人六個月與一年半研究；Three Little Words 的 Grow Mama Grow 與 Stand by Me；uKanDanZ 的馬戲團、WL studio、場館名；Assagai 的 Osibisa 一格與電吉他電貝斯；Spiral Deluxe 的錄音室名與雙 LP；swing slow 的童謠翻唱與凱門鱷配音者姓名；Fresh Moods 的曲長；Honora 的核心樂手三人；Graciela 的酒吧名與 1960 年代獨唱探戈。壓完回核 15 張 hook 依賴格全在 g1／g2（Samos「希臘調式」與 Yttling「10 點到 6 點」靠 facts 原文，note 未重述以免 hook 與 note 逐字重複）。
- **41857** 骨架歸屬（15 張 15 條，只在擁有卡寫歸屬句）：McDole＝人聲大賽冠軍的錄音室作；Samos＝度假島嶼寫成情書（地方場景：愛琴海島嶼）；Yttling＝沒錢一天錄完；高木＝留法歸國後的限量現場錄音；濱瀬＝同名兩次錄音（原盤 vs 重錄）；中村＝升學金改裝房間的宅錄首作；Nameless＝一首詩＋一夜框架的三部曲起點；Three Little Words＝打擊樂藏摩斯密碼；uKanDanZ＝系列主編牽線、外國樂團接衣索比亞老歌手；Assagai＝流亡樂手在海外組團（移民社群在海外延續）；Spiral Deluxe＝鐵克諾製作人坐上鼓機帶即興團；swing slow＝名人二人計畫的配音小品；Fresh Moods＝電子琴少年自學成製作人；Honora＝搖滾貝斯手以先人命名的爵士個人首作；Graciela＝被異國歌手發掘、在日本走紅。與 a–c 已交 24 張比對無重複（c 的 MYT「鄉間錄十天」是錄音地點骨架，與 Yttling「一天錄完」不同軸）。「一人包辦」「無鋼琴」兩個 SKELETON 字串刻意不用（中村、Fresh Moods、高木）。
- **41858** 「他／她」引入法：Fils-Aimé 跨兩張——Nameless 用親屬（父母從海地移民蒙特婁、1984 年生在那裡），Three Little Words 用名字直接領句（＋蒙特婁歌手）；Jacques Roy 只派給 Three Little Words。Greg Foat 跨三張（c 兩張用「英國鋼琴手／英國爵士鋼琴家」）——Samos 改用樂器引入（彈平台鋼琴與合成器的 Greg Foat），不帶 Jazzman 與國籍。第二句句型逐張配死：比賽頭銜／樂器／製作人身分／生年與出生地／樂種轉向／出生地與童年／父母來歷／名字直接／主唱經歷／團員出身／身分／掛名欄／本名／樂團出身／年齡，與 a–c 的引號領句不同形。
- **41859** 「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：McDole 透、Yttling 進、高木 的、濱瀬 出、中村 正、Three Little Words 上、uKanDanZ 回、Spiral 經、swing slow 面、Fresh Moods 交、Graciela 東；Samos、Nameless、Assagai、Honora 只寫到年或月。初稿與 a–c 撞 7 處（問、發、，、在、於、由、推）已逐一改開。hook 間中文 4-gram：d–e 對全批 hook 0 條；hook 對他卡 note 只有樂器名「薩克斯風」（不算）。hook 與自己的 note 無逐字重複句。
- **41860** 研究層禁區照辦與裁定：高木場地 note 寫「場地只寫店名」（研究 f1 的「爵士咖啡館」是推測用語），樂器寫簧管；濱瀬 2018 版標「另一次錄音、標明時序」，Jan Knooren 不派；中村不寫披頭四、Oricon 名次不派；Nameless／Three Little Words 不掛 Juno，Polaris 決選只掛 Three Little Words；Graciela 不寫成探戈專輯、銷量與 220 週不派、2024 辭世與作品無關不派；Samos 不指定 duduk／oud 誰演奏；swing slow「Mr. Harry Hosono Jr.」單源不派；コシミハル 為全片假名藝名，照 hook-base 東亞名規則改寫 **Miharu Koshi**（寫作層可首次括注越美晴，facts 有）。媒體名與媒體榜單名次全部未進 note（Assagai 的樂評格、Honora 的 Billboard 名次已捨）。腳本：`node chk-hook-crossgroup.mjs add-20261030-sf09`（a–e 39 張）✓ 全部通過；`node qa-batch.mjs hooks add-20261030-sf09` 總標記 1，為 b 組 Westering Home 的「年份?1960」，d–e 零標記。

## 鉤子層（a–c）（41851–41855）
- **41851** 交件：`desc-tools/batches/hooks/add-20261030-sf09-hooks-a.json`（8）、`-hooks-b.json`（8）、`-hooks-c.json`（8），key 逐字照研究稿、順序不變。預算公式照 hook-base 第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin（Night Cap）170。逐筆（預算／hook 加權／hook 原始字元）：Earthworks 213／20.5／29；Cantando 197／24.5／29；Serenity 227／21.5／30；Arawe 224／20.5／26；Siberian Express 219／22.5／29；Reach Out! 228／19.5／29；Play Bach No. 1 203／20／20；Road to Saint Ives 194／22.5／26；Westering Home 190／24.5／28；Neighbourhood 229／19／29；Bass Desires 228／19／19；Shades of Jade 229／21／30；Rootless Cosmopolitans 215／21.5／27；Your Turn 222／22／22；Jersey 222／20.5／27；Family First 229／19／19；Melt Zonk Rewire 218／23／23；Night Cap 168／19.5／22（thin）；MYT 230／20／20；Paint It Blue 213／22.5／28；Fonk da World 226／22.5／26；Juniper 229／19／19；Girl and Robot 225／17／17；Dark Is the Sun 228／19／23。初稿 24 張全超標（英文專名密），整格捨去：Earthworks 的 Loose Tubes；Stenson 兩張的 Rodríguez／Berg 重複曲目、Fält 與 Christensen 對照；Ponce 的 Gonzalez 兄弟與曲長；Galper 的 Dockery／Hart；Katché 的 Joni Mitchell 與 1990 年代初搖滾放克個人作；Bass Desires 的 Coltrane 以外曲目；Shades 的 Joey Baron、Blue Nefertiti；Ribot 的 Hendrix／Ellington 翻奏；Family First 的 One Month 與錄音室；NKT 的樂評格與目錄號；Night Cap 的曲長；Paint It Blue 的 Jesse Jackson 取樣與曲目；Fonk 的 Öström 與兩首改編；Juniper 的客席與曲長；Girl and Robot 的 Binson 回音。壓完回核 24 張 hook 依賴格全在 g1／g2（Jersey 把「Bowie 收尾」從 g4 前移到 g2；Neighbourhood 補回「ECM 發行」撐 hook 的「到 ECM 領銜」）。
- **41852** 骨架歸屬（24 張 24 條，只在擁有卡寫歸屬句）：Earthworks＝巡演後改團名＋電子鼓進爵士；Cantando＝錄音室自由即興剪選成曲；Serenity＝雙 CD、曲目橫跨古典民謠；Arawe＝金曲背後的打擊樂手（古巴→紐約）領銜；Siberian Express＝兄弟檔（弟弟為哥哥換樂器）；Reach Out!＝老搭檔撐前線；Play Bach＝學生時代的玩笑變成系列；Road to Saint Ives＝曲名全是地名、作者否認寫景；Westering Home＝巡演空檔試多軌疊錄（平價系列）；Neighbourhood＝流行金曲錄音室鼓手轉爵士；Bass Desires＝掛名者讓位給雙吉他；Shades of Jade＝隔十八年回歸＋盤名向前輩致敬；Rootless＝家用卡帶機錄進個人首作；Your Turn＝社運週年釋出抗議歌；Jersey＝替偶像遺作打鼓、以其歌收尾；Family First＝自家廠牌發原聲首作；Melt Zonk＝新廠牌開張系列的頭幾號＋回授噪音；Night Cap＝借來名團節奏組；MYT＝鄉間錄音室閉關十天；Paint It Blue＝致敬盤剪進被致敬者的說話聲；Fonk＝別團鋼琴手坐上製作人位子；Juniper＝主唱離團後改純器樂；Girl and Robot＝同名組曲拆散全盤；Dark Is the Sun＝考古再版廠牌製作新作＋大鍵琴進靈魂爵士。「改名」SKELETON 字串只在 Earthworks（Paint It Blue 的 Funk Unit 改名一格捨去）；「辭世」不用（Bass Desires 未派 Evans 去世）。
- **41853** 同藝人分軸與「他／他們」引入法：Stenson——Cantando 帶錄音細節（盧加諾、七取四、Fält），第二句「這是瑞典鋼琴手 Bobo Stenson 的三重奏」（身分）；Serenity 帶生平，第二句「Bobo Stenson 1944 年生於瑞典韋斯特羅斯」（生年與出生地）。Surman——Road 帶生平（1944 德文郡）＋錄音；Westering 帶疊錄緣起，第二句用樂器清單引入（研究稿 b 沒有 Westbrook，原指派已撤，qa「年份?1960」那條因此消除）。Johnson——Bass Desires 帶生平（1953 Omaha、Evans 三重奏），Shades 用親屬引入（妻子 Eliane Elias 共同製作），LaFaro 只在 Shades。Ribot——Rootless 帶生平（R&B 側翼、Lounge Lizards），Your Turn 用團名＋團員引入、不帶生平。Guiliana——Family First 帶生年出生地與自家廠牌，Jersey 帶 Bowie／Parlato，Blackstar 只在 Jersey。Landgren——Paint It Blue 帶紅色長號與生年，Fonk 用「由瑞典長號手 Nils Landgren 領軍」。Foat——Girl and Robot 帶樂器清單（「英國鋼琴家 Greg Foat 樂團的第二張」），Dark Is the Sun 帶 Jazzman 與 2009 組團（「英國爵士鋼琴家」）。第二句句型配表：是／生於／這是／由／他是／名字直接／親屬／樂器清單／年份領句等逐張配死，全批 39 張第二句中文 4-gram 0 條（初稿撞「國鋼琴手」×3、「這是瑞典」×2，已改開）。
- **41854** 「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：Serenity 問、Arawe 生、Reach Out! 錄、Road to Saint Ives 發、Your Turn ，、Family First 在、Night Cap 於、MYT 由、Paint It Blue 推；其餘 15 張只寫到年或月（Play Bach 生日、Westering 再版日、Girl and Robot／Dark Is the Sun 錄音日段一律不派）。與 d–e 11 種無重複。hook 間中文 4-gram：全批 39 張 0 條（初稿 Melt Zonk／Night Cap 撞「貝斯與鼓」，Night Cap 改「節奏組」）。開頭四字另與既有 hooks 檔比對，非專名開頭的「盤名借自」「低音提琴」「單簧管、」三處已改；Brec／Cann／e.s.／Bowi 為專名開頭，保留。hook 與自己的 note 無逐字重複句。
- **41855** 研究層裁定照辦：Arawe 年份 1987、D'Rivera／Puente 等單源名單不派；Siberian Express 寫第二張、美國團，R&R 名次與移居德國不派；Play Bach 不派 600 萬張；Road to Saint Ives 寫「鍵盤」不寫合成器；Rootless 不派〈Rate〉（研究稿 b5 的「52 秒〈Rate〉」與 Jersey 的鼓獨奏同名同長，疑為串稿，主線複核）；Family First 廠牌寫 Beat Music Productions；Melt Zonk 寫第二張、Tzadik；Night Cap 不稱首作；MYT 寫柏林、德國榜與爵士獎單源不派；Juniper 不寫成三重奏專輯；Dark Is the Sun 不引第 6 首曲名。媒體名、星等與媒體榜單名次全部未進 note，樂評只寫「樂評說／形容」。腳本：`node chk-hook-crossgroup.mjs add-20261030-sf09`（a–e 39 張）✓ 全部通過；`node qa-batch.mjs hooks add-20261030-sf09` 全部通過 ✓（0 標記）。

## 主線（條號 41871–41880）
- 41871：研究 b 組 Rootless Cosmopolitans 有一條 fact 寫「52 秒的〈Rate〉」，主線拿 MB 曲目表核對，〈Rate〉其實是 Mark Guiliana《Jersey》的曲子，同組研究稿串稿。這條 fact 整條刪掉，剩 7 條。鉤子層原本就沒派進 note。重跑 `merge-writer-input`。
- 41872：研究層推翻策展層後，卡單跟著改：Family First 的廠牌改 Beat Music Productions；Spiral Deluxe 改 Axis Records；Melt Zonk Rewire 改 Tzadik；Juniper 改 Edition Records；Night Cap 改 Disques Debs；Yttling Jazz 改原版 Headspin Recordings。McDole、Samos、金字塔、Three Little Words 四張補上廠牌（研究 d 組查到）。David Becker Tribune 的國別改 us。Moses Yoofee Trio《MYT》MB 已經建檔（683dbd89），從 §1 人工身分改成 pinned，國別改 de。
