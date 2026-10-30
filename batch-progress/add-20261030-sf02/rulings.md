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

## 研究 e 組（條號 30241–30250）
- 30241：姫神《奥の細道》：卡單 1993 / 掛名「姫神」取自 MB 1993-11-03 Pony Canyon CD 再版（PCCR-00091）；原版為 1981-08-07 Canyon（C28R0080），原署名「姫神せんせいしょん」，出道作（Discogs master 735838、日維星吉昭條）。與汰掉《遠野》同形。建議卡年改 1981、掛名維持「姫神」，簡介寫明 1993 為再版；請主線裁定。
- 30242：比屋定篤子《ささやかれた夢の話》：卡單 2015 為 Sony Music Direct 數位再版（MB 首發日）；原版 1999-02-20（AICT 1042，日維／Discogs 13292603）。建議卡年改 1999。第二張原創專輯，首張為《のすたるじあ》1997。
- 30243：比屋定篤子《ルア・ラランジャ》：策展「首張全長」不成立；1999-10-01（AICT 1132）、Sony 時期第二張專輯，全作品序為第三張。卡單年 1999 無誤。製作人與樂手資料查不到，thin。
- 30244：POiSON GiRL FRiEND《Shyness》：策展「首張、關口紀子個人計畫」不成立；1993 年第三張（前有 1991、1992），Momus 在倫敦製作；「關口紀子」查無來源，不寫，主唱署名 nOrikO。key 前綴為 desc2:（卡單原樣）。
- 30245：ないあがらせっと《POP CITY》：策展「唯一正規全長」不成立（Apple 另列 2022 同名專輯、2025《Sound Of Garden》）。無日文樂評與成員資料，thin；聲音僅有 Apple 相近藝人（サニーデイ・サービス、くるり、Fishmans 等）可佐證。
- 30246：ヨシンバ《042》：1999-04-21 Baidis（Teichiku）TECN-28548，Discogs 風格 Soft Rock／J-pop。策展「首張全長」無來源證實，不寫序數。成員、結成經緯查不到，thin。
- 30247：ピューパ!!《えそらことば》：日維發行日 2019-12-05（第二張專輯），MB 首發日 2020-01-25（卡單 2020）；請主線定年份。事務所與作曲者查不到，thin。
- 30248：THE 天国畑 JAPON《BORONGE》：§1 人工身分核對無誤（Discogs 15314386、2018-03-28、TTJCD-0001、Apple 1400033521）；序數「第三張」查無依據，不寫。Bandcamp 頁無此專輯條目，不影響身分。thin。
- 30249：静香《天界のペルソナ》：發行日三說（MB 9-22、Discogs 9-25、英維 11-22），簡介只寫 1994 年。英維稱「唯一錄音室專輯」為單一來源，寫作層寫「PSF 時期首張」較穩。吉他手三浦マキ與鼓手小杉淳為不失者出身，不是静香成員。
- 30250：moodGuess 存疑：ヨシンバ（Soft Rock，非強失真）、THE 天国畑 JAPON（迷幻／Stoner 加西塔琴，非派對硬搖滾）、ピューパ!!（含龐克與後搖滾成分，偏躁）、静香（有失真爆發，可能比 z=-0.5 更躁）；ないあがらせっと聲音事實查不到，無法判定。WebSearch 本組用 9 次（多數無果），日維 API 直連遭 429，改 WebFetch／MB／Discogs／iTunes lookup；QA 簡體字警示「来」為歌名「春が来たから…」與人名「鶴来正基」，屬專名，保留。

## 主線研究裁定（不佔條號；2026-10-30）
研究層 45 張全收，不汰換（本線不以 moodGuess 汰卡；研究稿指出的聲音不符只影響寫作與評分）。照研究層改卡單：
- 年份：姫神《奥の細道》1993→**1981**（原版 1981-08-07 Canyon，原署名姫神せんせいしょん；1993 是 Pony Canyon CD 再版、MB 掛姫神。掛名維持「姫神」：同一人星吉昭的同一計畫，卡上用通行名）；比屋定篤子《ささやかれた夢の話》2015→**1999**（原版 1999-02-20，2015 為數位再版）。ピューパ!!《えそらことば》維持 MB 2020（日文維基 2019-12-05 為會場先行，寫作層只寫年份 2020）。
- 廠牌：Yogee New Waves 兩張 CAFE BOHEMIA→Bayon Production；OGRE YOU ASSHOLE 兩張 Pony Canyon→VAP。
- 序數與「首張」類主張以研究稿為準（KIRINJI《Fine》第 4 張、TMGE《Chicken Zombies》第 3／《GEAR BLUES》第 4、比屋定篤子《ルア・ラランジャ》第 3 張、POiSON GiRL FRiEND《Shyness》第 3 張、ないあがらせっと非唯一全長、THE BACK HORN《太陽の中の生活》不寫序數、ヨシンバ／BORONGE 不寫序數）。
- 單一來源（THE BACK HORN 團名由來、静香「唯一錄音室專輯」）寫作層不寫；「據說」照派工禁用。
- COHOL《空洞》聲音實為 black／death／grind（非策展的 sludge／doom）、中学生棺桶為 doomcore、ジョー山中《Joe》偏靈魂軟搖滾：照研究稿寫，卡照收。
- `qa-batch research`：45 張 key 一致；標記 2（「国」「来」皆專名）。

## 鉤子層（a、b、c；條號 30251–30255）
- **30251** 交件：`desc-tools/batches/hooks/add-20261030-sf02-hooks-a.json`、`-b.json`、`-c.json` 各 9 張，key 與順序照研究稿。公式照 HOOK-DISPATCH：`Array.from(hook)+Array.from(note) − 主故事： − 每個 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin 上限 170（thin＝GRASS VALLEY、きのこ帝国《愛のゆくえ》、OGRE《100年後》、Yogee 兩張）。逐筆（預算／hook 加權／hook 原始字元）：
  - a：時間 223／21／24；卵 207／18／18；imagination 224／22.5／29；UROBOROS 204／21／21；Withering 223／19／19；LOGOS 158／18／18（thin）；フェイク 212／22／25；愛のゆくえ 164／25／25（thin）；3 223／23／23。
  - b：Fine 200／23.5／28；homely 221／14／14；100年後 154／20.5／23（thin）；人間プログラム 230／19／19；太陽の中の生活 209／18／18；Chicken Zombies 202／16／16；GEAR BLUES 218／15／15；PARAISO 164／15／15（thin）；WAVES 165／19／27（thin）。
  - c：揺らぎ 217／21／21；vivid 222／20／20；Sway 184／21／21；Ampersands 208／19／19；Orca 210／25／25；Especially For You 222／24／24；Twin Memories 220／20／20；トランシルヴァニア 208／16／17；謎のコスモス号 217／20／20。
  - 初稿 14 張超標，一律整格捨去（Fader／Noise Artists 等媒體與其描述的影響名單、Kylie＆Jason 二重唱出處、Twin Memories 翻唱清單、Cosmos 的 Fender Rhodes 與水谷效果器、Withering 團員名單等）；壓完逐張回核 hook 依賴格，全部在 g1／g2（KIRINJI《3》的翻唱回評在 g4，為主故事本體、未捨）。
- **30252** 骨架歸屬（27 張 27 條，只有擁有者寫歸屬句）：時間＝離開大公司後自費獨立發行；卵＝極簡錄音條件（兩天／單支麥克風／無節拍器）；imagination＝課堂作業組團的學院三人組；UROBOROS＝非常規樂器入金屬＋首進美國榜；Withering＝海外首次正式發行（芬蘭榜）；LOGOS＝實驗轉流行；フェイク＝舊曲以新技術重編（〈東京〉加印為 hook）；愛のゆくえ＝電影主題曲；3＝遲來的重評；Fine＝暫定標題（Orthodox）；homely＝工程師推翻錄音方式；100年後＝三部曲中段（主唱自錄 demo）；人間プログラム＝出道前團員出缺、主唱代彈；太陽の中の生活＝主唱兼奏多樂器、全員分寫詞；Chicken Zombies＝吉他手的裸音＋首進前十；GEAR BLUES＝巡演密度極高的現場樂團；PARAISO＝童年玩伴組團；WAVES＝陣容重組後排名躍升、主流前夕；揺らぎ＝盤名即聲音說明；vivid＝改名重新出發；Sway＝製作人一手演奏；Ampersands＝自我製作與管樂入團；Orca＝跨國雙廠牌首張；Especially＝翻唱撐起原創專輯的首冠；Twin Memories＝demo 開頭沿用成招牌前奏；トランシルヴァニア＝B 面長篇組曲；謎のコスモス号＝器材清單（吸塵器）。
  - 給 d／e 與主線的撞點提醒：「貝斯手離團」在本批至少四處（人間プログラム、WAVES、homely 研究稿、爆風スランプ《HIGHLANDER》）——a–c 這邊人間プログラム只寫「主唱代彈」、WAVES 只寫陣容重組一格、homely 不寫平出離團，「送別離團貝斯手」留給 HIGHLANDER。「單曲與專輯兩地錄音」：GEAR BLUES 的〈G.W.D〉倫敦／東京只佔一格、不作骨架，骨架留給姫神。「未做母帶」：卵保留一格（柳瀬談壓縮），但骨架與 hook 都在兩天／單支麥克風，若 The Earth Beater 以母帶為骨架，請避開「沒做母帶處理」這個字串。
- **30253** 同藝人分軸與代稱：betcover!! 時間＝生平與出資（第二句「1999 年生於東京調布、包辦詞曲編曲的主腦」）、卵＝錄音法（第二句「東京獨立樂團＋柳瀬二郎」），代稱一律「柳瀬」；DIR EN GREY UROBOROS＝結成（1997 大阪、京主唱）＋錄音、Withering＝海外發行＋樂種，代稱「他們」；きのこ帝国 フェイク＝結成與團名、愛のゆくえ＝主流期，代稱「他們」，佐藤千亜妃具名；KIRINJI 3＝兄弟結成＋〈エイリアンズ〉、Fine＝編制與標題，代稱「兄弟倆」；OGRE homely＝結成與轉向、100年後＝三部曲與出戸学，代稱「他們」；THE BACK HORN 人間＝結成與出道、太陽＝演奏署名，代稱「他們」；TMGE Chicken＝結成與アベ、GEAR＝現場與重錄，代稱「他們」；Yogee PARAISO＝結成、WAVES＝陣容與排名，代稱「他們」；mei ehara Sway＝生平＋製作人、Ampersands＝樂團與編曲習慣，代稱「她」；Wink Especially＝出道與首冠、Twin＝〈淋しい熱帯魚〉，代稱「兩人」；コスモス 古城＝成軍與組曲、謎＝器材，代稱「他們」。
- **30254** 第二句句型（逐張配死）：樂種領句＝人間プログラム、Chicken Zombies、PARAISO、トランシルヴァニア、Withering（身分＋作詞者）；生年出身領句＝時間、Sway、vivid、揺らぎ（滋賀三人編制）、Orca（電子音樂創作者）；組合身分領句＝Especially（二人偶像）、Twin（兩人具名）、3（兄弟＋現名 KIRINJI）、Fine（兄弟分寫詞曲）、imagination（三人組）；主唱領句＝100年後、WAVES、GEAR BLUES、愛のゆくえ；團體名領句＝卵、太陽の中の生活、homely（結成年＋長野）、UROBOROS（結成年＋大阪）、フェイク、LOGOS（出道年＋新浪潮）、謎（名古屋四人團）、Ampersands。日期「日」後一字：發 時間／推 卵／由 imagination／起 UROBOROS／，Withering／上 LOGOS／問 フェイク／從 Fine／面 homely／交 人間／登 太陽／經 Chicken／接 GEAR／透 PARAISO／首 揺らぎ／亮 vivid／以 Sway／在 Ampersands／同 Orca／緊 Twin，其餘 7 張只寫到年或月（d／e 請避開以上 20 字）。媒體名與媒體榜名次全數不進 note（Music Magazine 滿分、美術手帖、RYM 等皆未指派）。
- **30255** 自查：hook 間中文 4-gram 0 條；hook 對他張 note 只剩人名（柳瀬二郎、山田将司，同藝人）；hook 與自身 note 無逐字重複句（卵、GEAR BLUES、100年後、Orca、謎、3、太陽 初稿有近似句，已改寫 note）。開頭前四字 27 張互異。`qa-batch hooks`：a–c 無標記（總標記 2＝d、e 缺檔）；初跑的「国」已把 きのこ帝国、ゆらゆら帝国 append 進 `jp-proper-names.json`，Withering／太陽 的跨卡年份與 Telecaster／Arena 專名已改用本卡 facts 或原文（横浜アリーナ）。`chk-hook-crossgroup`（3 組 27 張）：全部通過，hook 加權 14–25、note 157–238。

## 鉤子層（d、e；條號 30256–30260）
- **30256** 交件：`desc-tools/batches/hooks/add-20261030-sf02-hooks-d.json`、`-e.json` 各 9 張，key 與順序照研究稿。公式同 30251（只扣 主故事：／→／正文只寫上列各項。／這條骨架全批只走本張。）；full 上限 230、thin 上限 170（thin＝The Earth Beater、COHOL、中学生棺桶、神の犬、POP CITY、042、えそらことば、ルア・ラランジャ、BORONGE）。逐筆（預算／hook 加權／hook 原始字元）：
  - d：Joe 211／22／22；Reggae Vibration 222／21.5／29；HIGHLANDER 228／20／23；D.A.M.N. 226／18／18；The Earth Beater 166／23／23（thin）；空洞 158／18／21（thin）；矛先についたガム 164／19.5／22（thin）；地獄の子守唄 218／20／20；神の犬 157／20／26（thin）。
  - e：POP CITY 152／29／29（thin）；042 169／20.5／23（thin）；えそらことば 156／23.5／30（thin）；ささやかれた夢の話 224／20.5／22；ルア・ラランジャ 169／21／21（thin）；奥の細道 215／22／22；Shyness 225／18.5／20；BORONGE 168／18／18（thin）；天界のペルソナ 193／18／18。
  - 初稿 10 張超標，整格捨去：Joe 的〈人間の証明のテーマ〉、Reggae 的 Minimoog 與 Junior Marvin、HIGHLANDER 標題曲歌詞、D.A.M.N. 美國版加曲、COHOL 序曲與雙主唱姓名、中学生棺桶 前衛搖滾一格、042 的 soft rock 格（移入第二句）、比屋定兩張互指排除句、ルア「同年第二張」。壓完回核 hook 依賴格，18 張全在 g1／g2（042 把黑膠格前移到 g2）。
  - 媒體名與媒體評語全數不進 note：The Obelisk、Dead Rhetoric、Tower 商品頁說法、英文維基轉引的 PSF 評論者原話皆未指派；Discogs 標籤改寫成樂種敘述、不掛名。主線研究裁定照辦：奥の細道「發行年寫 1981 年」＋1993 再版標時序；ささやかれた「發行年寫 1999 年」；えそらことば「年份只寫 2020」；静香「年份只寫 1994」、不寫「唯一錄音室專輯」與辭世；神の犬 不寫 zetima；COHOL 不寫「首張全長」；中学生棺桶 寫「解散前的正式專輯之一」；ヨシンバ／BORONGE 不寫序數；POP CITY 不寫「唯一」。
- **30257** 骨架歸屬（18 張 18 條，與 30252 的 27 條不重疊）：Joe＝運動員轉行（拳擊手→主唱）的首張個人作；Reggae Vibration＝遠赴海外錄音室與傳奇伴奏班底；HIGHLANDER＝送別離團貝斯手（照 30252 提醒接下）；D.A.M.N.＝暖場被廠牌主發掘；The Earth Beater＝跳過母帶的自家發售（字串用「未經母帶後製／跳過母帶這一關」，避開卵的「沒做母帶處理」）；空洞＝團名是整句英文縮寫；矛先についたガム＝樂種自成一格（doomcore＋昭和歌謠）；地獄の子守唄＝漫畫誌筆友欄徵團員；神の犬＝金屬前輩坐鎮製作；POP CITY＝曲單即線索（夏日曲名）；042＝黑膠版另排曲序；えそらことば＝偶像團接另類樂種；ささやかれた夢の話＝單一作曲搭檔包辦全曲；ルア・ラランジャ＝同曲兩版本收錄；奥の細道＝單曲與專輯兩地錄音、速度不同（照 30252 接下）；Shyness＝錄好的弦樂挪給別張；BORONGE＝自家廠牌＋自家錄音室；天界のペルソナ＝主唱本業是人偶師。hook 四型：懸疑（空洞、HIGHLANDER、Shyness）／斷言（矛先、ささやかれた、The Earth Beater、えそら）／場景（Reggae、D.A.M.N.、地獄、POP CITY、042、奥の細道、BORONGE、ルア）／人物定調（Joe、神の犬、天界）。
- **30258** 同藝人分軸與代稱：ジョー山中 Joe＝生平（橫濱混血、拳擊、FTB 主唱）＋大野雄二，代稱「山中」，第二句「迷幻搖滾樂團主唱身分」；Reggae＝錄音地、The Wailers 班底、製作，hook 用「他」、第二句以「前迷幻搖滾主唱山中」具名。GREENMACHiNE D.A.M.N.＝成軍、團名、暖場、Kozik，第二句樂種領句；The Earth Beater＝FANDLE 自發、母帶、Ver 0.5，第二句「金澤的三人重型樂團」，貝斯更迭一格不指派（避開人間プログラム／WAVES 的離團骨架），代稱「他們」。犬神サーカス団 地獄＝結成與團名、封面、口上開場，第二句樂種領句；神の犬＝製作人、〈決死隊〉兩段、分工，第二句「主唱凶子與鼓手明」具名，代稱「他們」。比屋定篤子 ささやかれた＝生平（第二句：1971 年生於那霸、美大拉美研究會）＋小林治郎＋編制；ルア＝曲目結構與先行單曲，第二句「沖縄出身、偏爵士與巴薩的歌手」，代稱「她」。
- **30259** 第二句句型：樂種領句＝D.A.M.N.、地獄、空洞（神奈川黑金屬＋grindcore）；身分領句＝Joe（樂團主唱）、Reggae（轉唱雷鬼前的主唱具名）、えそら（女子偶像團）、ささやかれた（生年出身）、ルア（出身＋樂風）、奥の細道（宮城出身的星吉昭）、Shyness（nOrikO 一人的涉谷系計畫）；團體領句＝HIGHLANDER（1984 出道、噴滅火器的四人團）、The Earth Beater（金澤三人）、矛先（狩野葉蔵領軍的東京地下團）、神の犬（兩位核心具名）、POP CITY（日本獨立流行團體）、042（soft rock 取向團體）、BORONGE（東京三人搖滾團）、天界（1992 東京地下迷幻團）。日期「日」後一字：到 Reggae／收 HIGHLANDER／正 D.A.M.N.／自 Earth Beater／於 空洞／釋 矛先／送 地獄／出 神の犬／掛 POP CITY／把 042／換 ささやかれた／再 ルア／的 奥の細道／開 Shyness／歸 BORONGE；Joe、えそら、天界只寫到年或月。全批 45 張「日」後字 0 重複（含 a–c 20 字）。
- **30260** 自查：hook 間中文 4-gram（45 張全掃）0 條；d／e hook 對他張 note 0 條（初掃 The Earth Beater「自行發行」撞 Sway note，改「自家發售」）；hook 與自身 note 只剩專名（西田昌史、小林治郎、蛹系偶像、昭和歌謠），地獄「筆友欄徵團員」與 BORONGE「自家廠牌」初稿重複，已改寫 note。開頭前四字 45 張互異，並對 add-202610 2x 與 sf01 已有 2768 條 hook 開頭掃過，BORONGE 初稿「自家廠牌」撞舊卡已改。Shyness 初稿 hook「迷你專輯」被 chk 判禁語「你」，改「之後的 EP」。`qa-batch hooks add-20261030-sf02`：全部通過（互指 20 處皆為同藝人排除句）；`chk-hook-crossgroup`（5 組 45 張）：全部通過，hook 加權 14–29、note 149–238。jp-proper-names.json 未動。

## 寫作層（writer-2；條號 30266–30270）
- **30266** 交件：`desc-tools/batches/output/add-20261030-sf02-out-2.json` 22 張，key 與順序照 `-writer-2.json`。full 13 張 202–239（Especially 237、Twin 202、トランシルヴァニア 210、謎 205、Joe 204、Reggae 210、HIGHLANDER 225、D.A.M.N. 239、地獄 213、ささやかれた 208、奥の細道 196、Shyness 239、天界 184）；thin 9 張 127–173（Earth Beater 168、空洞 162、矛先 147、神の犬 127、POP CITY 162、042 160、えそら 143、ルア 171、BORONGE 173）。初稿 3 張出界，整格捨去：Especially 砍三處「她們」與「賣出」（243→235）、D.A.M.N. 砍「親手繪製」與「他們」（248→239）、BORONGE 砍目錄號 TTJCD-0001（191→175）。`qa-batch out` 本檔 0 標記（總標記 1＝out-1 的 Yogee 兩張 thin 超 180）；`qa-check-research` 0；`fix-spacing` 0；「據」0。
- **30267** 第二句領句全照 30254／30259 指派；日期「日」後一字照指派（緊 Twin／到 Reggae／收 HIGHLANDER／正 D.A.M.N.／自 Earth Beater／於 空洞／釋 矛先／送 地獄／出 神の犬／掛 POP CITY／把 042／換 ささやかれた／再 ルア／的 奥の細道／開 Shyness／歸 BORONGE；Especially、トランシルヴァニア、Joe、えそら、天界 只寫到年或月）。**謎のコスモス号**：30254 把它列在「只寫到年或月」的 7 張，但 note 帶了 8 月 5 日，寫作層保留日期、後一字用「轉」（全批 45 張未用過），可逆。ルア 第二句改成「比屋定篤子是沖縄出身…的歌手」名字領句，避開與 ささやかれた「…的歌手比屋定篤子，1999 年」同形；Reggae 第二句改「曾在迷幻樂團當主唱的ジョー山中」，壓低「迷幻搖滾」出現次數。
- **30268** 自掃（han() 中文 4-gram，跨 out-1＋out-2 共 45 張）：涉本檔的 3 張以上只剩兩條——「迷幻搖滾」×4（トランシルヴァニア、謎、Joe、天界；皆 note 指派的樂種名，比照樂器名不算）；「樂團自己」×3＝本檔 BORONGE 的 **hook 原文**「都掛著樂團自己的名字」對上 out-1 的 Chicken Zombies「樂團自己製作」與 GEAR BLUES「製作仍是樂團自己」，寫作層無權改 hook，**需由 out-1 改正文或主線收件時處理**。途中拆掉的本檔殘片：樂團在年、由發行首、在年月日、張專輯收、最高第名、專輯收首、搖滾樂團／滾樂團的、的第二張、發行收首、首張專輯、第三張專、的第五張、推出的第、單曲發行、曲年月日、共首製作（後 11 條是對 out-1 合掃才出現）。
- **30269** ⚠ **hook 事實錯誤待主線改**：COHOL《空洞》hook 寫「COHOL 這四個字母」，但 COHOL 是 5 個字母（Consume／Obsessed／Hatred／On／Liturgy 五個首字母）。寫作層無權改 hook，正文第二句照 note 寫出全稱、未提字母數；建議主線把 hook 改成「COHOL 這五個字母」或「COHOL 這個團名」。
- **30270** 其他判斷：Shyness 第二句 note 寫「涉谷系」，正文用台灣通行的「澀谷系」；POP CITY 照 note 寫「串流平台的相近藝人欄」（未點名平台）；コスモス 兩張的「hook 已講的事」（吸塵器、B 面組曲長度、Earth Beater 未做母帶、奥の細道 速度、Shyness 弦樂挪用）正文不再複述，第二句改成具名或補身分；静香性別依 facts「她的人偶師父」寫「她」。

## 寫作層（writer-1；條號 30261–30265）
- **30261** 交件：`desc-tools/batches/output/add-20261030-sf02-out-1.json` 23 張，key 與順序照 `-writer-1.json`。full 17 張 182–238（時間 230、卵 195、imagination 232、UROBOROS 219、Withering 231、フェイク 227、3 219、Fine 210、homely 236、人間 238、太陽 205、Chicken 218、GEAR 236、揺らぎ 237、vivid 237、Sway 182、Ampersands 203、Orca 213）；thin 6 張 152–176（LOGOS 166、愛のゆくえ 152、100年後 169、PARAISO 176、WAVES 176）。初稿超標 4 張（人間 245、PARAISO 185、WAVES 186、homely 241），整格捨去或縮子句（人間砍團員職稱、Yogee 兩張砍主唱兼吉他與「到了年底」）；Sway 初稿 176 低於下限，補「收尾的三首」一格的寫法。`qa-batch out`、`qa-check-research`、`fix-spacing` 皆 0 標記；「據」「也就是」grep 0。
- **30262** 第二句領句全照 30254 指派；日期「日」後一字照 30254（發 時間／推 卵／由 imagination／起 UROBOROS／，Withering／上 LOGOS／問 フェイク／從 Fine／面 homely／交 人間／登 太陽／經 Chicken／接 GEAR／透 PARAISO／首 揺らぎ／亮 vivid／以 Sway／在 Ampersands／同 Orca），3、愛のゆくえ、100年後、WAVES 只寫到月。
- **30263** 自掃（han() 4-gram，跨 out-1＋out-2 45 張）：初掃最大一族是榜位樣板「最高第名」×12（含 Twin）、「專輯收首」×8、「搖滾樂團」×6、「在年月日」×5，逐張把名次句與曲數句拆成不同動詞（衝到／排到／停在／登上／攀上／打進／拿下／最佳名次／最高位／名次來到）並把「專輯，收 N 首」改成共／內含／收錄／N 首歌等互異寫法；寫作區間先交件的規則照辦，2 張命中的通用殘片也一併拆。定稿 3 張以上只剩「冨田恵一」（專名）與 out-2 的「迷幻搖滾」（樂種）；2 張剩同藝人專名（柳瀬二郎、佐藤千亜妃、中村宗一郎、山田将司、菅波栄純、松田晋二、角舘健悟、矢澤直紀）與「獨立搖滾」「一張完整」。
- **30264** 寫法判斷：日本藝人與盤名照原文；成員名全假名者（ミト、アベフトシ、チバユウスケ）不改羅馬字，與 hook 已用的アベフトシ一致、也照派工「照原文」；〈水槽〉暫名照原文以「」引。媒體名與媒體榜名次全數未寫（Fader、Noise Artists、Music Magazine 滿分、Mike Portnoy 評語、CD ショップ大賞入圍皆不在 note）。Withering 的 hook「第一組上榜」由第二句「DIR EN GREY 正是那一組」具名；homely hook 的「工程師」在第二句以中村宗一郎具名；Sway hook 的「製作人」留到第四句才具名辻村豪文（第二句照指派走生年出身）。
- **30265** WAVES：hook 的「第 152 名」在正文以「前一個名次來自他們的首作」交代屬首張，不複述數字。100年後：三部曲只寫「與前後兩張並稱」，不點名另兩張。KIRINJI《3》第二句以現名 KIRINJI 領句、補「當時寫作片假名キリンジ」，Fine 寫「當時的名義還是片假名キリンジ」——兩張同藝人同一事實各一句，措辭已錯開。

## 主線審稿（2026-10-30，cloud-main）
- 逐張審 45 張，抽核關鍵事實回研究稿（DIR EN GREY 芬蘭榜第 31 名與「首位在該國上榜的非歐美藝人」、中学生棺桶 2011 解散前最後一張、姫神星吉昭生於宮城、KIRINJI《Fine》第 4 張、TMGE 序數、比屋定篤子 1999 年份）皆一致。
- 改 2 處（存 `desc-override.json`）：
  - `desc4:COHOL|空洞`：「COHOL 這四個字母」→「COHOL 這五個字母」——事實錯（C-O-H-O-L 五字母，全稱 Consume／Obsessed／Hatred／On／Liturgy 五個字首；寫作層 writer-2 報告已指出）。**已同步改 hooks-d 與 writer-2 input**；研究稿本無字母數，不需改。
  - `desc4:ないあがらせっと|POP CITY`：刪「串流平台的相近藝人欄裡，列著サニーデイ・サービス、くるり、Fishmans 與小沢健二。」——資料平台的推薦欄不是這張盤的事實，且正文不點名資料平台；162→118 字（thin，資料稀薄寧短）。
- 其餘 43 張逐張審過，未改字。
