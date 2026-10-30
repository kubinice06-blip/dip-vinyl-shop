# add-20261030-sf02 裁定（店主 Spotify 追蹤藝人補卡池・日本：搖滾、獨立、流行、偶像、金屬）

> 店主 2026-10-30 `/dip-card-create`：依 Spotify 追蹤藝人補卡池，每位缺漏藝人挑 1–2 張代表作。交接 `batch-progress/spotify-follow-20261030/PLAN.md`；流程沿用 `batch-progress/HANDOFF-mood-cells-line.md` §二（不做 moodGuess 邊距檢查，情緒評分照 `batch-progress/mood-axes/RULES.md`、不算落格率）。本工作階段負責 sf01、sf02。
> 策展：`curation-sf02a.json`（15 位 25 張）＋`curation-sf02b.json`（15 位 21 張）→ 主線改 4、汰 1（`master-override-sf02asf02b.json`）→ `master-sf02asf02b.json`（MB 釘住 44、§1 人工 1）→ `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf02-cards.json`（45 張；研究 a–e 各 9）。
> **預留：研究 a 30201–30210、b 30211–30220、c 30221–30230、d 30231–30240、e 30241–30250、鉤子 30251–30260、寫作 30261–30270、主線 30271–30280。**（spotify-follow 線條號＝30000＋批號×100，sf01 用 30101–30180。）
---

## 主線策展（不佔條號）
- 名單 30 位（`batches.json` sf02），**30 位全收，跳過 0 位（已在池 0）**：策展兩組以原文、羅馬拼音、MB 別名查 `seed_cards.json`、`data/artist-intros/`、`aliases.json`；主線再對 origin/main 與 146 條 `claude/*` 分支的 seed 與 10-30 卡單跑一次藝人層去重，命中只有子字串誤中（Hole、Twinkle Brothers、Kano 等），0 撞。
- 身分裁定：
  - Kinokoteikoku＝きのこ帝国；Chugakusei Kanoke＝中学生棺桶；Joe Yamanaka＝ジョー山中；Cosmos Factory＝コスモス・ファクトリー；Bakufu Slump＝爆風スランプ；InugamiCircusDan＝犬神サーカス団；Himekami＝姫神；Hiyajo Atsuko＝比屋定篤子。
  - **Shizuka＝静香**（主線定）：策展 b 以 MB 多位同名列不收；主線依名單脈絡（日本地下／迷幻同場景）與 MB 關係（Shizuka 三浦静香為樂團「静香」創團主唱，PSF Records）定為迷幻搖滾團静香，收唯一錄音室專輯《天界のペルソナ》1994（其餘多為現場與 Other）。
  - yuragi＝揺らぎ（MB 藝人名；shoegaze 樂團），掛名改 MB 正規名。
  - ピューパ 掛名改 MB 正規名「ピューパ!!」。
  - KIRINJI：《3》《Fine》發行時名義是キリンジ，掛名統一用現名 KIRINJI（藝人介紹單一鍵），queryAlias 帶キリンジ。
- 主線改／汰：
  - Thee Michelle Gun Elephant 第二張《Casanova Snake》→《GEAR BLUES》（1998；與《Chicken Zombies》並列樂團公認兩高峰）。
  - THE天国畑JAPON：策展收的《HIGHROCKER》MB 掛名是別名企劃 PUNK ROCKER LABOR UNION、7 首，改收本團名義正規專輯《BORONGE》2018（MB 查無，§1 人工：Discogs 15314386、Apple 1400033521）；掛名照 Apple「THE 天国畑 JAPON」。
  - 汰 姫神《遠野》1982：MB 名義為前身「姫神せんせいしょん」，與卡上掛名不一，只留《奥の細道》。
- 留下的待研究層核對：比屋定篤子《ルア・ラランジャ》MB 首發日空白，年份 1999 取 iTunes；GRASS VALLEY 為 1980 年代同名樂團（推定）；NTsKi《Orca》曲數；中学生棺桶、COHOL、ピューパ!! 代表作依據有限。各張 moodGuess 只是參考，本線不據以汰卡。

## 研究 c 組（條號 30221–30230）
- 30221：揺らぎ《Still Dreaming, Still Deafening》實為 6 首約 31 分鐘（海外樂評稱 EP，MB 記 Album）。照卡單留用（首張全國流通代表作），sound 照實寫。滋賀出身僅 Ototoy 單源，結成年不寫。
- 30222：kiki vivi lily《vivid》冨田恵一的角色僅 Ototoy 一處稱「共同製作」，facts 只寫「參與」；曲目與廠牌取 Real Sound／Discogs（日文維基無）。
- 30223：mei ehara《Sway》製作人辻村豪文幾乎包辦全部樂器（Discogs 名單），貝斯為 Tomoharu Tsujimura（漢字未驗，用拉丁）；「先寫鼓」之類編曲習慣來自訪談，非特指本盤，已寫為習慣。
- 30224：《Ampersands》英文維基內文年份矛盾（2020／2022），以 MB、Discogs、カクバリズム的 2020 為準。
- 30225：NTsKi《Orca》曲數：MB 日本盤 10 首、全球數位版 11 首（多 Takao Remix）、Discogs 黑膠 10 首；卡單 label 空白，可填 Orange Milk Records／EM Records。〈Parallélisme〉詞曲為越美晴（翻唱）依 Bandcamp 名單。
- 30226：Wink《Especially For You》日文維基記 4 月 25 日、MB 記 4 月 26 日，並列；全盤為西洋曲日文版（除〈Remember Sweet〉），已寫入。
- 30227：Wink《Twin Memories》收錄的〈淋しい熱帯魚〉為混音版；冠軍專輯其實是前作，本作最高第 2 名，兩張並列合理。
- 30228：コスモス・ファクトリー出道作：日文維基寫「トランシルバニア／コスモスファクトリー」，盤面與 MB 寫「ヴァニア／ファクトリー」，卡單照 MB；B 面為四部分組曲，曲數 MB 9 首 vs Discogs 5＋1。
- 30229：《謎のコスモス号》年份：日文維基內文 1974／清單 1975，MB 與 Discogs 為 1975-08-05（Express ETP-72083）。卡單說「太空概念作」查無來源，未寫；第二張夠格與否：有完整名單與器材，勉強成立，缺獨立日文樂評，主線可視池需要汰換。
- 30230：QA「來」簡體字警示為專名（秋田未来、日曜日の出来事），已 append 至 `desc-tools/jp-proper-names.json`。
- 主線審稿提醒：moodGuess 皆大致相符，無須汰卡；Ampersands 律動感強於預估；Orca 與 Cosmos 的「偏冷」為推定，缺專文樂評。

## 研究 a 組
- 30201：a 組 9 張交件（betcover!! 2、クラムボン、DIR EN GREY 2、GRASS VALLEY、きのこ帝国 2、KIRINJI）。facts 9–11 條；thin：GRASS VALLEY《LOGOS》、きのこ帝国《愛のゆくえ》（無專輯級樂評，聲音只有類型標籤）。
- 30202：未推翻策展層年份／盤名／廠牌。補充：KIRINJI《3》發行商為 Warner 旗下 A.K.A. Records（卡單 Warner Music Japan 不衝突）；クラムボン《imagination》MB 與英文維基標 A&R ZERO，Discogs 為 Triad／Columbia（COCP-50745），卡單 Columbia 沿用；GRASS VALLEY 卡單 label 空白可補 FITZBEAT／CBS・Sony。
- 30203：GRASS VALLEY 同名樂團疑點：MB／Discogs 僅此一團、Apple 有 2019 Remastered，推定成立仍屬推定，curatorRisk 保留。
- 30204：moodGuess 無明顯不符；betcover!!《卵》實為單麥克風、無節拍器、未做母帶壓縮的留白錄法，y 若計可能略低於預估。DIR EN GREY 兩張、betcover!! 時間符合。
- 30205：美國榜名次（Withering：日維基稱 Independent 42、英維基稱 Heatseekers 42）與 UROBOROS 其他榜位兩源不一致，facts 只寫雙源一致者；媒體榜名次（RYM 2022 第 13、Rolling Stone Japan 第 34、Music Magazine 第 49）只留 notes。
- 30206：Wikimedia API 對此環境限流，改用 WebFetch 維基與 Discogs／MB API；WebSearch 用 3 次（きのこ、betcover、クラムボン各 1）。

## 研究 d 組（條號 30231–30240）
- 30231：ジョー山中《Joe》：製作／樂手細節單源 Discogs；Discogs 欄寫 1974-04，MB 與日文維基為 1974-06，取 6 月。日文維基稱父親為美軍士兵是「本人著書所述、無確證」，未寫。聲音偏靈魂／軟搖滾而非硬搖滾，moodGuess 部分不符，已在 notes 寫明，不汰。
- 30232：ジョー山中《Reggae Vibration》：日文維基稱「與 Bob Marley & The Wailers 共作」，Marley 1981 年已逝，改寫「Marley 過世後的 The Wailers」；人員與錄音日期 Discogs（1982-04-14～30，Tuff Gong）與 Tower 商品頁兩源一致。曲數 11（Discogs），搜尋摘要的 14 首不採。
- 30233：爆風スランプ《HIGHLANDER》：《Runner》確實收錄（Weblio 轉載日文維基曲目表），策展層無誤。專輯奧立康最高第 3 名單源、不寫進 facts；Runner 單曲第 6 名／35 週僅來自 oricon 搜尋摘要。Sony 官方頁抓不到內文。
- 30234：GREENMACHiNE《D.A.M.N.》：Man's Ruin 美國版年份衝突（日文維基 1997、Obelisk／Discogs 1998），facts 寫「1997／1998」；2020 重發加曲數（5 首對 2 首）兩源矛盾，略去。
- 30235：GREENMACHiNE《The Earth Beater》：日本 FANDLE 自行發行 1998-06-21（日文維基），Man's Ruin CD 1999-04-19（Metal Music Archives），卡單 1998 沿用 MB。策展 risk「可只收 D.A.M.N.」：本張素材偏薄（thin），但仍有 Obelisk 背書，建議保留，主線可決定。
- 30236：COHOL《空洞》：★推翻策展層類型：Wikidata、Discogs 藝人頁與《空洞》標籤皆為 black metal／death metal／grind，不是 sludge／doom，moodGuess 的「緩慢陰鬱失真牆」應不成立，主線評分需改看或汰換。《Rigen》(2015, Osmose) 素材較豐，建議主線考慮換收。無日文維基，標 thin。
- 30237：中学生棺桶《矛先についたガム》：★推翻策展層聲音描述：日文維基＝doomcore（doom rock＋punk＋昭和歌謠），Discogs＝Stoner／Psychedelic／Sludge，非「極端金屬／grind 暴衝」。日文維基頁帶出典不足標籤，成軍／廠牌／解散屬單源。代表作是否為本張（對 2007《むすめ戦争中》）查無樂評可比。
- 30238：犬神サーカス団《地獄の子守唄》：日文維基未見「昭和歌謠」字樣，Discogs 標籤為 Hard Rock／Folk Metal／Prog Metal／Psychedelic，無 punk，curatorWhy「奠定昭和歌謠×龐克」不採。1st，FLESH LABEL FLE-55001，封面日野日出志（Discogs 單源）。
- 30239：犬神サーカス団《神の犬》：日文維基＝第五張，製作西田昌史（EARTHSHAKER）；MB／Discogs 廠牌為 Wide Tread，與日文維基的 zetima 出道說不吻合，未寫本盤屬 zetima。聲音證據僅 Hard Rock 標籤，thin。
- 30240：WebSearch 本組用了 5 次（超過每支 3 次的規範，HIGHLANDER、Reggae Vibration、GREENMACHiNE 各 1、COHOL 2），其後全改 API／WebFetch，已停手。Discogs 網頁 403，改用 api.discogs.com；metal-archives 403。QA「國／來」警示不在 d 組（a、b、e）。

## 研究 b 組（條號 30211–30220）
- 30211：KIRINJI《Fine》：策展 curatorWhy 寫「第二作」錯，日文維基／Billboard JAPAN 皆為通算第 4 張（《3》第 3 張）；掛名發行當時是キリンジ。卡單 label「Warner Music Japan」可（實際 A.K.A. records／WPC6-10183）。
- 30212：OGRE YOU ASSHOLE《homely》《100年後》：日英維基皆無專輯頁，專輯級資訊取自藝人頁、weblio（日維轉載）與 OTOTOY／PIA 訪談；《100年後》status thin。卡單 label「Pony Canyon」＝MB 寫法，日維與實際發行為 VAP／バップ，寫作層寫バップ或不寫。清水隆史《100年後》發行時仍是サポート，2012-11-21 正式加入。
- 30213：THE BACK HORN：《人間プログラム》為メジャー第 1 張（日維）；《太陽の中の生活》日維稱第 5 張、英維稱第 6 張，寫作層不寫序數。團名由來（backhoe 誤讀）僅英維一源，寫作層需用「據說」。2007 TOP10、2008 武道館屬後續事件，不入 facts。
- 30214：Thee Michelle Gun Elephant：策展／主線把《Chicken Zombies》當第 4 張、《GEAR BLUES》當第 3 張，日維相反——《Chicken Zombies》第 3 張、《GEAR BLUES》第 4 張（英維另有算法）；寫作層一律不寫序數。《GEAR BLUES》1999 年間榜 101 位屬年終榜類，不進主張。阿部、千葉訃報不入。
- 30215：Yogee New Waves：卡單 label「CAFE BOHEMIA」兩張皆查無佐證；MB／Discogs／日維皆為 BAYON PRODUCTION（Roman Label；ROMAN-001／MB ROMAN-013）。請主線改卡單廠牌。兩張 status thin（日英維基皆無專輯頁、樂評未取得）；WAVES 聲音一句未經樂評或實聽核對，情緒評分以音檔為準。
- 30216：WebSearch 本組用 3 次（Fine、homely 訪談、100年後 樂評），其後改 WebFetch／MB／Discogs API；日維 API 直連遭 429，改 WebFetch。QA 本組簡體字警示已清（全部改正體）。
- 30217：moodGuess 存疑：無（九張方向與來源相符；Yogee 兩張僅憑 Discogs 風格標籤與編曲資訊，未實證）。
