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
- **30256** 交件：`-hooks-d.json`、`-hooks-e.json` 各 9 張（前一工作階段代理寫完檔後被額度中斷，未寫本段；主線 10-30 接手驗收、補記）。逐筆（預算／hook 加權／hook 原始字元）：
  - d：Joe 211／22／22；Reggae Vibration 222／21.5／29；HIGHLANDER 228／20／23；D.A.M.N. 226／18／18；The Earth Beater 166／23／23（thin）；空洞 158／18／21（thin）；矛先についたガム 164／19.5／22（thin）；地獄の子守唄 218／20／20；神の犬 157／20／26（thin）。
  - e：POP CITY 129／29／29（thin）；042 169／20.5／23（thin）；えそらことば 156／23.5／30（thin）；ささやかれた夢の話 224／20.5／22；ルア・ラランジャ 169／21／21（thin）；奥の細道 215／22／22；Shyness 225／18.5／20；BORONGE 168／18／18（thin）；天界のペルソナ 193／18／18。
- **30257** 骨架歸屬（d、e 18 條）：Joe＝拳擊手轉樂團主唱後單飛；Reggae Vibration＝赴金斯敦與 The Wailers 錄音；HIGHLANDER＝送別離團貝斯手（照 a–c 讓出）；D.A.M.N.＝暖場被廠牌看中＋美國版；The Earth Beater＝未做母帶（a–c 卵只寫壓縮一格，字串不撞）；空洞＝團名縮寫；矛先＝樂種混血（doom×龐克×昭和歌謠）；地獄の子守唄＝漫畫誌筆友欄徵團員；神の犬＝金屬前輩坐鎮製作；POP CITY＝曲單本身；042＝黑膠版曲序另排；えそらことば＝偶像自稱口號＋樂種拼接；ささやかれた＝作曲者與作詞者分工；ルア・ラランジャ＝同曲兩版首尾呼應；奥の細道＝單曲與專輯兩地錄音（照 a–c 讓出）；Shyness＝倫敦錄音與外國製作人；BORONGE＝自家錄音室＋自家廠牌；天界のペルソナ＝主唱本業人偶師。
- **30258** 同藝人分軸：ジョー山中 Joe＝生平、Reggae＝錄音地；GREENMACHiNE D.A.M.N.＝成軍與團名、Earth Beater＝發行條件；犬神サーカス団 地獄＝結成與封面、神の犬＝製作人；比屋定篤子 ささやかれた＝生平與合作者、ルア＝曲序。
- **30259** 主線改 1：POP CITY 原 note 第三格「串流平台的相近藝人欄列著⋯」是資料平台推薦欄、不是聲音事實，整格刪（預算 152→129）。
- **30260** 自查（主線）：`qa-batch hooks add-20261030-sf02` 全部通過（互指 20 處逐條看過，皆為刻意讓給同藝人另一張或 Oricon 專名）；`chk-hook-crossgroup`（5 組 45 張）全部通過，hook 加權 14–29、note 149–238。
