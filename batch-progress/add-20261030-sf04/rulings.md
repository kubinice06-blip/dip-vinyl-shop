# add-20261030-sf04 裁定（店主 Spotify 追蹤藝人補卡池・日本：電子、ambient、嘻哈、lo-fi、YMO 周邊）

> 店主 2026-10-30 `/dip-card-create`：依 Spotify 追蹤藝人補卡池，每位缺漏藝人挑 1–2 張代表作（交接 `batch-progress/spotify-follow-20261030/PLAN.md`）。本工作階段負責 sf03、sf04。流程沿用 `batch-progress/HANDOFF-mood-cells-line.md` §二，**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-sf04a.json`（14 位 16 張）＋`curation-sf04b.json`（14 位 12 張）＋主線補 `curation-sf04c.json`（1 張）→ 主線汰 1（`master-override-sf04asf04bsf04c.json`）→ `master-sf04asf04bsf04c.json`（28 張：MB 釘住 24、§1 人工 4）→ `pick.json`（28）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf04-cards.json`（28 張；研究 a–d 各 6、e 4）。
> **預留：研究 a 41301–41310、b 41311–41320、c 41321–41330、d 41331–41340、e 41341–41350、鉤子 41351–41360、寫作 41361–41370、主線 41371–41380。**
---

## 主線策展（不佔條號）
- **清單 28 位 → 收 26 位、28 張；跳過已在池 0 位；不收 2 位。** 主線對 origin/main 與全部 `claude/*` 分支 seed（22,168 列）跑藝人層與盤名層去重，命中全是誤中（Lily Chou-Chou、Miles Davis《Tutu》、Migos《Culture》、MFSB《Summertime》、Big Dipper／Diplo 之於 dip），0 撞。
- **U.TA屋塔（策展 b 判「已在 curation-ml4」跳過，主線推翻、補收）**：ml4 研究層以聲音偏冷汰掉（rulings 14311），從未上線，池中沒有這位。照 PLAN「池中已有才跳過」收《緩飆公路 Highway Cruising》（2015，Hove，§1 人工，ml4 研究 14273 已核 Discogs 33801504）。台灣樂團分在日本批，照 PLAN「分錯場景照收，不搬批」。
- **不收**：
  - ILL BONE——1985 年日本硬核／噪音團（策展核對 Apple 同頁有《死者》2015 重發）。唯一錄音室作品《死者》MB 記 EP、1985 原版 4 曲（12 曲是 2015 年加錄重發），不到長 EP 例外的 6 首；2024《日本》MB 記 Album＋Compilation＋Live，不是錄音室專輯。整位不收。
  - Buddhablessyou——MB／Discogs／iTunes 查無此名；iTunes 只有 Buddha Bless 的《BUDDHA BLESS YOU》（2009），掛名不同、對不上。身分不明不收。
- 身分：Hajime Tachibana＝立花ハジメ；Miharu Koshi＝越美晴；Hideko Okiyama＝沖山秀子；Ayako Shinozaki＝篠崎史子（豎琴演奏者；MB 掛名含武満徹等作曲者，卡上照古典慣例用演奏者）；Yasushi Ide＝井出靖；sibitt＝志人（降神）；Ironomi＝いろのみ；Chouchou＝日本電子雙人組（MB a18d9ff7），非 Lily Chou-Chou。
- **Tokimeki Records 收**：MB 與 Discogs 皆為原創 city pop／lo-fi 計畫兼廠牌名，不是翻唱或合輯帳號；收《透明なガール》（2022）。
- **SOFT**：京都器樂迷幻團，《Passing Tone》（2024，Discogs LP Album，結成 30 週年第 11 張）。只有 5 首長曲，但發行型別是正規專輯，不是 EP，不適用例外條款；§1 人工。
- 留兩張的：越美晴（《Tutu》《パラレリズム》）、SHAKKAZOMBIE（《HERO THE S.Z.》《JOURNEY OF FORESIGHT》）。
- 非日本藝人照收（分錯場景）：Emapea（波蘭）、Magamura（匈牙利，依廠牌推定）、concrete concrete（美國，研究層核國籍）、Chestnut Bakery（中國）、AKA lisa（瑞典）、U.TA屋塔（台灣）。
- 交研究層把關：Yasushi Ide 高峰在 Lonesome Echo Strings 名義，本卡收其個人名義《Cosmic Suite 2》，代表性要查；YPY、KUSO GVKI、Hoshina Anniversary、DOOPEES、kinoue64、Emapea、Ironomi、dip、in the blue shirt 代表作缺評論共識；Chouchou 盤名 MB 為「theme02 Night and Wanderer」；沖山秀子封面取 2006 再版；篠崎史子封面取 Apple。§1 人工 4 張（沖山秀子、Magamura、SOFT、U.TA屋塔），沖山秀子的 `mbAbsenceProof` 是字串，上線前轉物件。

## 研究 a 組
- 41301 Doopees《Doopee Time》：推翻策展層 genre／moodGuess。來源（en／ja 維基 ヤン富田、MB 標籤）指向 shibuya-kei／plunderphonics／space age pop，Doopees 是ヤン富田製作的虛構少女二人組，非嘻哈；moodGuess 存疑，建議主線改 genre 並重評三軸或汰換。
- 41302 Chouchou：身分確認為日本 Chouchou（MB a18d9ff7）；聲音只有 MB 標籤與官方簡介，無樂評，status thin；發行日 MB／Bandcamp 8/11 與官網 8/12 不一，採 MB。
- 41303 越美晴《パラレリズム》：status thin（無可引用樂評，聲音靠 Discogs／MB 標籤）；curatorWhy「exotica 融合」查無來源，不入 facts。
- 41304 立花ハジメ《H》：moodGuess 部分存疑（樂手以薩克斯風、貝斯、馬林巴、鋼琴為主，偏爵士新浪潮，非純合成器）。

## 研究 c 組
- 41321：Tokimeki Records 推翻主線「原創計畫、非翻唱帳號」的說法——2019 年以翻唱起家（Real Sound、NME），《透明なガール》是首張原創全長；收卡不變，寫作層須交代翻唱出身，不寫 lo-fi（Discogs 風格 Funk／City Pop／Disco／Boogie）。
- 41322：kinoue64 moodGuess 存疑——Bandcamp、MB、Discogs 一致為 shoegaze／indie rock，非輕盈電子；genre 應改 rock。curatorWhy「首張全長」不成立（2020《あの子は幻》更早）；BSDJ／Reasonable 是 2023 卡帶再發，原版 Bandcamp 自發。
- 41323：SHAKKAZOMBIE 成員以維基為準：OSUMI（Big-O）、Ignition Man、Tsutchie；卡單 curatorWhy 的「Ikkyu」未見來源。Journey of Foresight 的 Discogs Producer 欄為團名。
- 41324：Hoshina Anniversary 本名保科芳信（HHV）；Jomon 有 Mixmag Asia／Truants／HHV 佐證，非全無評論。Bandcamp 描述含鋸齒過飽和段落，moodGuess 可能偏躁偏冷（僅標記）。
- 41325：Emapea 聲音描述僅有 Bandcamp 自述，無第三方樂評；status 標 partial。

## 研究 d 組（41331–41340）
- 41331：Magamura《Supernaturals》廠牌更正為 Kebko Music（東京廠牌；Discogs label 823477、Apple ℗ 2017 Kebko Music），卡單「Si Kebko Music」疑誤植；匈牙利有 Discogs 註記與 The Ransom Note 兩個獨立來源，country hu 成立。moodGuess「律動電子」存疑（來源只見 industrial／現代古典／ambient 實驗即興，無節拍依據），status thin。
- 41332：AKA lisa《Laminar Flow》moodGuess「輕柔 indie pop」存疑（簡介稱實驗氛圍、動態劇烈、電影感）；廠牌 Time & Pitch Machine 與創辦人資料各只有單一來源，status thin，不寫評價。
- 41333：志人《Zymolytic Human》廠牌 MB 記 P-VINE RECORDS、Discogs 記 Granma Music（同目錄號 GME010），facts 並陳，卡上維持 P-VINE RECORDS；身分 Sibitt＝志人已核（Discogs 345683）。
- 41334：Ironomi《虹》代表性有據（官方簡介點名第 7 張並列合作者；Discogs 日本版為 3 CD 12 首，每首一位來賓）；Discogs 記磯部優為吉他，官方為十七絃箏，卡單「吉他殘響」說法存疑，其餘相符。
- 41335：concrete concrete《Drifter》國籍解疑為 us（Bandcamp 紐約、錄音於紐約）；器樂但含大型弦樂與少量人聲，moodGuess 僅輕度提示。
- 41336：Chestnut Bakery《Diaries》身分無誤；成立地珠海（MB／Discogs）、廠牌在深圳（Bandcamp）；無推翻。

## 研究 e 組（條號 41341–41350；4 張）
- 41341：SOFT《Passing Tone》身分疑慮解除：Discogs 30921996、樂團廠牌頁 softribe.jp、Oye Records、Qetic、Club Metro 一致，京都樂團，Softribe STJP-0012，2024-04-01，5 首約 33 分鐘，型別為正規專輯。結成年 1993（Qetic）、2023 滿 30 週年。moodGuess 輕度存疑（廠牌稱「躍動」「現場感」，無速度或失真來源），不據以汰卡；聲音只有廠牌與經銷商文案，status partial。
- 41342：dip《TIME ACID NO CRY AIR》代表性成立（HMV：許多人視為最高傑作；《love to sleep》為 Pia 名盤榜入選作，兩張都夠格），不推翻 curatorRisk。MB 與 Discogs 對得上 1997-09-26／Eastworld。moodGuess 存疑（中）：CDJournal 寫轟音吉他已退後、HMV 稱冷靜抑制、樂迷稱比前作清晰流行，預估 x 3.4 可能偏高。1997 年編制查無，不寫。status partial。
- 41343：in the blue shirt《Recollect the Feeling》身分無誤；bounce 與本人筆記稱第二張專輯（首張 2016《sensation of blueness》），MB 另列 2015《Cyanotype》為 Album，疑為早期自編集，寫作時寫「第二張專輯」依 bounce、不展開。聲音事實充足（慢、溫和、原聲吉他、真樂器一曲），moodGuess 吻合，status full。
- 41344：U.TA屋塔《緩飆公路》沿用 ml4 14273 並再核：Discogs、樂團簡介、Noise Artists 三方一致（Hove UTA001，2015-12，首張專輯）。ml4 的「推翻唯一全長」在此改為保守：Noise Artists 標 2009、2014 為 EP，簡介稱 2009 為出道單曲，故寫「首張專輯」即可，不寫「唯一全長」。成立年 2006／2013 並存。moodGuess 存疑（中，色溫），簡介支持「迷幻呢喃、吉他音牆、低頻碰撞」；依本線規則不汰卡。status thin。Bandcamp 本次被擋，內容改以樂團簡介鏡像與 Noise Artists 交叉。
- 41345：WebSearch 本組用了 4 次（dip、in the blue shirt、U.TA、SOFT 各 1），超出 3 次上限 1 次；回報主線。

## 研究 b 組
- 41311：沖山秀子《Summertime》——Discogs master 259188／release 4111724（Trio PAP-25011，1981-10-25）與日文維基吻合；策展稱「1960–70 年代女伶」不採，她是演員兼歌手，爵士專輯僅此一張。聲音只有樂手名單與「Billie Holiday 式」評語，status full。
- 41312：篠崎史子《ハープの個展》——發行年 Discogs／MB 為 1973、Wewantsounds／HHV 標 1974；卡單沿 MB 1973，facts 只寫錄音（1973-06-25／26），寫作層勿斷言發行年。
- 41313：Yasushi Ide《Cosmic Suite 2》——個人名義代表作成立（Mixmag 2022 年榜），生涯高峰仍在 Lonesome Echo Strings；moodGuess 存疑：Discogs 風格為 Dub／Downtempo／Free Jazz／Ambient，不是純暖調弦樂。
- 41314：YPY《Zurhyrethm》——日野浩志郎（Goat、Bonanzas）獨奏計畫；Bandcamp 日期 2018-04-27 疑為數位版，卡單沿 2016。moodGuess 存疑：廠方文案是打擊導向、卡帶質地，未提 dub。無樂評共識確認。
- 41315：KUSO GVKI《Culture》——**推翻策展層國籍**：德國 beatmaker（Discogs：Düsseldorf、日本血統；Bandcamp：柏林），非日本藝人，卡單 country 應改 de。moodGuess 存疑：18 分鐘八首短曲、Instrumental／future beats，非暗調 lo-fi 可證。
- 41316：ECD《ホームシック》——身分吻合（Cutting Edge CTCR-14002，1995-03-01），但聲音完全未查到（WebSearch 用盡），status thin；「第二作」「公認經典」無來源不寫。moodGuess 無證據亦無推翻。

## 主線（條號 41371–41380）
- 41371：研究層推翻策展層，卡單已改：Doopees genre 由 hiphop 改 pop／electronic（ヤン富田製作的虛構少女二人組，space age pop）；kinoue64 genre 改 rock（三方標籤皆 shoegaze／indie rock），label 清空（2022 原版 Bandcamp 自行發行，BSDJ／Reasonable 是 2023 卡帶再發）；Magamura label 改 Kebko Music（Si Kebko 為誤植）；KUSO GVKI country 改 de（德國 beatmaker，日本血統）。研究 c、e 的 status「partial」依 research-base 只認 full／thin，主線改為 full（SHAKKAZOMBIE ×2、Tokimeki、SOFT、dip）或 thin（Hoshina、kinoue64、Emapea），coverage 同值。research-c 一處半形逗號改全形。
- 41372：寫作層注意：Tokimeki Records 以翻唱 80–90 年代曲起家、《透明なガール》是首張原創全長（主線策展「非翻唱帳號」的說法以研究層為準修正）；kinoue64 不寫「首張」（2020《あの子は幻》在前）；SHAKKAZOMBIE 成員照研究稿（OSUMI、Ignition Man、Tsutchie），不寫 Ikkyu；ECD 不寫「第二作／公認經典」；篠崎史子只寫 1973 年 6 月錄音、不斷言發行年；U.TA屋塔寫「首張專輯」，不寫「唯一全長」。

## 鉤子層（d、e）
- **41356** 交件：`desc-tools/batches/hooks/add-20261030-sf04-hooks-d.json`（6）、`-hooks-e.json`（4），key 逐字照研究稿、順序不變。公式照第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin 上限 170（thin 依主線 41371：Magamura、AKA lisa、U.TA屋塔）。逐筆預算（hook 加權／原始字元）：d1 志人 215（26／26）、d2 Ironomi 224（25／30）、d3 Magamura thin 170（25.5／30）、d4 concrete concrete 229（24／24）、d5 Chestnut Bakery 229（24／24）、d6 AKA lisa thin 170（24／26）、e1 SOFT 228（24／30）、e2 dip 219（22／24）、e3 in the blue shirt 219（22／22）、e4 U.TA屋塔 thin 168（25／27）。初稿 10 張全超標，整格捨去：志人 的 Scott Da Ros／bleubird／Snailhouse 名單與多首 6 分鐘；Ironomi 的中島ノブユキ、Rie Nemoto 與曲名舉例；Magamura 的雙黑膠、最長曲與兩人身分頭銜；concrete concrete 的 Bunker Studio 與東京兩間錄音室名；Chestnut Bakery 的「愛吃蛋糕」、曲數總長與〈Moon Palace〉；AKA lisa 的 Albin Tjernberg 與兩首先行曲名；SOFT 的前衛／硬核／噪音早期、第 11 張、《Tokinami》與 KND 包辦錄混；dip 的 DIP THE FLAG、歪斜與第 7／8 首近同名曲；in the blue shirt 的生年、廠牌履歷與〈Riverbed〉；U.TA屋塔 的 John Lu 名、曲數與標題曲收尾。壓完回核 hook 依賴：concrete concrete 的「混音送東京」原在 g3，已併進 g2；SOFT 的 30 週年與自家錄音室併在 g2；其餘依賴格在 g1／g2。hook 自驗改兩處：AKA lisa 原稿「11 首陸續放出」不實（多數曲隨整張發行），改成「先一首首放出單曲⋯才收成 11 首的整張」；Magamura 改「手工包裝的卡帶」避開與 note 逐字重複。
- **41357** 骨架歸屬（10 張 10 條，只在擁有卡寫歸屬句）：志人＝到海外城市找當地樂圈做個人作；Ironomi＝一曲一位來賓的多碟盤；Magamura＝組合唯一錄音、先出手工卡帶；concrete concrete＝三城分段製作（紐約錄樂團、波士頓錄弦樂、東京混音母帶）；Chestnut Bakery＝畢業之際錄成、成員星散；AKA lisa＝單曲先行一年多、最後收成整張；SOFT＝結成週年紀念作、最接近現場的自家錄音；dip＝轉型期作品＋多年後依曲序完整重演；in the blue shirt＝「為專輯寫曲」的主題作、自家新廠牌首作；U.TA屋塔＝不插電雙人組長成四人樂團的首張。a–c 鉤子檔交件時未在磁碟上，跨組骨架與開頭請主線在 a–c 交件後重跑 `chk-hook-crossgroup` 核一次。hook 四型：場景（志人、concrete concrete）／斷言（Ironomi、SOFT、dip）／懸疑（AKA lisa，note g2 收尾）／人物定調（Magamura、Chestnut Bakery、in the blue shirt、U.TA屋塔）。
- **41358** 引入法與第二句句型配表（本組無同藝人跨張，不需「他／她」分軸）：志人＝身分「降神成員」；Ironomi＝樂器「鋼琴與十七絃箏」；Magamura＝國籍；concrete concrete＝編制「紐約四人器樂樂團」；Chestnut Bakery＝成立年與城市（g1 領句，hook 已帶珠海）；AKA lisa＝城市；SOFT＝「京都器樂樂團」；dip＝樂種「日本迷幻搖滾」；in the blue shirt＝本名有村崚；U.TA屋塔＝樂種 dream pop。「日」後一字：志人 日面、Ironomi 日由、Magamura 日先、concrete concrete 日自、Chestnut Bakery 日交、AKA lisa 日整、SOFT 日從、dip 日經、in the blue shirt 日成；U.TA屋塔 只寫到月（12／4 與 12／1 兩說並存）。dip 的 2014 重演只寫到月。
- **41359** 研究層「不寫」與店主加註照辦：媒體名與媒體榜單名次不進 note（dip 的 HMV／CDJournal／Pia 名盤榜與獨立榜第 1 名、Magamura 的 The Ransom Note 與 Shackleton 同台、in the blue shirt 的 bounce、SOFT 的 Qetic／Oye、U.TA屋塔 的 Noise Artists 全部不具名，聲音以平敘寫）。志人 不寫廠牌（MB／Discogs 兩說，卡上維持 P-VINE RECORDS），只寫日期；Ironomi 寫十七絃箏、不寫吉他殘響，不寫評論共識；Magamura 廠牌寫 Kebko Music；concrete concrete、Chestnut Bakery 不寫評價；Chestnut Bakery 的簡體曲名〈最后〉與「中國最 90 年代」文案不派；AKA lisa 不寫評價；dip 不寫 1997 年編制、不寫 Pavement 貼紙與「最高傑作」；in the blue shirt 寫「第二張專輯」、不展開《Cyanotype》；U.TA屋塔 寫「首張專輯」、不寫唯一全長、成立年不寫、廠牌 Hove 不派。thin 三張的聲音只派有來源的格子：Magamura 只寫曲數總長與風格標籤、AKA lisa 只寫曲數總長與活動簡介的樂種／動態描述、U.TA屋塔 只寫樂團自述的「迷幻呢喃、吉他音牆、低頻碰撞」。
- **41360** 自查：hook 之間中文 4-gram 本組 0 條；hook 對他張 note 0 條；hook 與自己 note 0 條 4-gram、無逐字重複句（初稿撞 7 張：志人「當地樂手」、Magamura「唯一的錄音作品／手工絹印」、concrete「鼓與吉他」、Chestnut「珠海的大學新生／烤栗子攤」、SOFT「錄音室錄」、in the blue shirt「高分子化學」、U.TA「的不插電」，已逐條改開）。開頭前四字本組互異，並與 `desc-tools/batches/hooks/` 全部舊檔 0 撞。`node qa-batch.mjs hooks add-20261030-sf04`：d／e 0 標記（只報 a、b、c 缺檔）；`node chk-hook-crossgroup.mjs add-20261030-sf04`（d、e 10 張）✓ 全部通過，hook 加權 22–26、note 166–232。

## 鉤子層（a、b、c）
- **41351** 交件：`desc-tools/batches/hooks/add-20261030-sf04-hooks-a.json`（6）、`-hooks-b.json`（6）、`-hooks-c.json`（6），key 逐字照研究稿、順序不變。公式照第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin 上限 170（thin＝研究稿 status thin 與主線 41371 改 thin 的：パラレリズム、Chouchou、ECD、Hoshina、kinoue64、Emapea）。逐筆預算（hook 加權／原始字元）：a1 H 220（24.5／29）、a2 Tutu 216（26／26）、a3 パラレリズム thin 164（23／23）、a4 audio sponge 210（20／20）、a5 Doopee Time 226（20／24）、a6 Chouchou thin 156（21／26）、b1 Summertime 195（23／23）、b2 ハープの個展 221（22／22）、b3 Cosmic Suite 2 225（23.5／29）、b4 Zurhyrethm 189（19／19）、b5 Culture 189（22／27）、b6 ホームシック thin 158（20.5／25）、c1 HERO THE S.Z. 219（19.5／30）、c2 JOURNEY OF FORESIGHT 229（20／20）、c3 Jomon thin 170（24.5／29）、c4 透明なガール 226（23／29）、c5 kinoue64 thin 168（20／29）、c6 Zoning Out thin 165（16／16）。初稿 18 張全數超標，整格捨去：H 曲長、Tutu 松武秀樹與小金井、パラレリズム 風格標籤與曲名、audio sponge 的 WIRE02 與標籤、Doopees 製作分工與蕭邦改編、Chouchou 曲名與 10 週年、Summertime 的 Billie Holiday 形容、Cosmic Suite 的 Part 分段與風格標籤、YPY 的 Bonanzas、KUSO GVKI 首張與主題、ECD 首張專輯與生年、SZ 首張的 Tsuboi 錄音與曲長、JOURNEY 的開場與間奏曲名、Tokimeki 古町ミナ、kinoue64 曲名、Emapea 首張。壓完回核 hook 依賴：H 的「洛杉磯」、Chouchou 的數位發行、Summertime 的「十首」、ECD 的「1995 年十首」、Jomon 的 Watechno 一度踩空或在 g3，已補回／前移到 g1／g2；hook 與自己 note 無逐字重複句（Chouchou 初稿「只供數位下載」重複，hook 改「只賣數位檔」）。
- **41352** 骨架歸屬（18 張 18 條，只在擁有卡寫歸屬句）：H＝巡迴途中買的樂器改了本行；Tutu＝示範帶被大製作人聽中、偶像轉電子流行；パラレリズム＝歐洲巡演＋海外廠牌發行；audio sponge＝團名撞時事、名字留給專輯；Doopee Time＝製作人虛構樂團並親自扮演；Chouchou＝自主發行、只賣數位；Summertime＝演員三天錄完標準曲；ハープの個展＝演奏者年度獨奏會系列命名；Cosmic Suite 2＝改編他人作品長成的組曲續篇；Zurhyrethm＝器材故障成標題曲＋卡帶錄製；Culture＝海外日裔、藝名取日文俗語；ホームシック＝場景主辦人自己的唱片；HERO THE S.Z.＝客串名單帶出整個圈子；JOURNEY＝靜默後的隱藏曲；Jomon＝自創曲風名（Watechno）；透明なガール＝翻唱計畫轉原創；kinoue64＝免費授權 Bandcamp 後再出實體；Zoning Out＝放空用的短節拍集。與 d／e（41357）比對：Chouchou 初稿「活動十週年」撞 SOFT「結成週年紀念作」，改走自主數位發行；Tokimeki 的先行單曲只放 g2、骨架是翻唱轉原創，與 AKA lisa「單曲先行收成整張」分開。hook 四型：人物定調（H、Tutu、Summertime、Culture、ECD）／斷言（audio sponge、Doopees、Cosmic Suite、Jomon、透明なガール）／場景（パラレリズム、Chouchou、ハープの個展、HERO、kinoue64、Zoning Out）／懸疑（Zurhyrethm、JOURNEY，note g2 收尾）。
- **41353** 同藝人分軸與第二句句型：越美晴——Tutu 帶生平（父母職業領句、RCA 出道、示範帶、Telex 翻唱與布魯塞爾錄音），パラレリズム 帶歐洲巡演與 Pick Up Records（「自幼學古典的 synth-pop 歌手」領句），パラレリズム 不寫 Telex。SHAKKAZOMBIE——HERO 帶成軍與成員、客串圈（三人分工領句、「饒舌三人團」），JOURNEY 帶結構與錄音細節（「第二張全長」發行序領句），JOURNEY 不帶客串 MC。YMO 圈三位跨 H／Tutu／パラレリズム／audio sponge：Yen 面向分開——H 只寫 Yen 發行、Tutu 寫轉入 Yen、パラレリズム 寫 Yen 第二張、audio sponge 不寫 Yen。其餘第二句：H 平面設計師／audio sponge 兩人名字／Doopees 製作人ヤン富田／Chouchou 兩人分工／Summertime 生年／ハープ 茱莉亞學琴經歷／Cosmic Suite 舊名義／YPY 也領導 Goat／KUSO 藝名由來／ECD 活動主辦人身分／Jomon 廠牌關係／Tokimeki 製作人／kinoue64 廣島與 shoegaze 標籤／Emapea 節拍製作人身分；避開 d／e 的國籍、城市、本名、成立年與城市、樂種。
- **41354** 「日」後一字：H 日於、Tutu 日發、パラレリズム 日推、audio sponge 日上、Doopees 日透、Summertime 日在、Culture 日以、ECD 日登、HERO 日問、kinoue64 日放；其餘 8 張只寫到月或年。與 d／e（面、由、先、自、交、整、從、經、成）零衝突（初稿 H 日由、Doopees 日經、ECD 日交 撞 d／e，已改）。hook 之間中文 4-gram：全批 28 張 0 條；hook 對他卡 note 只剩人名「細野晴臣」與樂器「薩克斯風」（專名、樂器不算；初稿 audio sponge／H 的「個人專輯」撞 d1 hook、KUSO 的「人聲切片」撞 e3 hook、篠崎的「錄音室錄」撞 e1 hook、パラレリズム 的「電子流行」撞 Tutu hook，均已改）。開頭前四字全批 28 張互異，並對 repo 內全部舊 hooks 檔開頭掃過（初稿 Tutu「常被當成」、パラレリズム「1984」、ECD「1989」、JOURNEY「最後一軌」撞 c176／c65／c132／cseab，已改開）。`node qa-batch.mjs hooks add-20261030-sf04` 全部通過 ✓；`node chk-hook-crossgroup.mjs add-20261030-sf04`（a–e 28 張）✓ 全部通過，hook 加權 16–26、note 156–235。
- **41355** 研究層裁定與店主加註照辦：媒體名與媒體榜單名次不進 note（Cosmic Suite 2 的 Mixmag 年度榜、Jomon 的 Mixmag Asia／HHV／Truants 名、Tokimeki 的 Real Sound／NME、ハープ 的 HHV 樂評、audio sponge 的維基引述樂評全部不派）。研究層「不寫」整格捨去：H 不寫純合成器；Tutu 不寫「首張全新錄音」；パラレリズム 不寫 exotica、Telex；Doopees 不寫嘻哈、不寫「唯一全長」；Summertime 不寫「1960–70 年代女伶」、沙啞慵懶、私生活、黑膠再版年、逝世（與作品無關）；ハープ 只寫 1973 年 6 月錄音、不寫發行年；YPY 不寫「首作」、不寫 dub、不寫 2018；KUSO 不寫知名度、不寫 lo-fi；ECD 不寫「第二作／公認經典」、不寫聲音與 Sanpin Camp、逝世不派；SHAKKAZOMBIE 不寫 Ikkyu、不寫 OSUMI 辭世、不派《星際牛仔》（研究稿集數留 XX，視同未證實）、不派研究稿綜合推得的 boom bap 聲音格；JOURNEY 不寫 Stevie Wonder、不斷言 Tsutchie 主製；Tokimeki 交代翻唱出身、不寫 lo-fi、不寫廠牌沿革、製作人寫「計畫的製作人」；kinoue64 不寫「首張」、原版不掛 BSDJ／Reasonable（只寫 2023 再發卡帶）；Chouchou 只寫到月。thin 六張聲音只派有來源的格子：パラレリズム 只寫曲目配置；Chouchou 只寫兩人分工；ECD 只寫製作署名；Jomon 只寫古代日本樂器混電子鍵盤（本人說法）；kinoue64 只寫 shoegaze／indie rock 標籤（聽眾留言不派）；Emapea 只寫官方說明的放空用途與〈Check It Out〉配器。

## 寫作層（writer-1）
- **41361** 交件：`desc-tools/batches/output/add-20261030-sf04-out-1.json` 14 張，key 逐字同序。full 11 張 188–237（H 218、Tutu 218、audio sponge 229、Doopees 233、Summertime 200、ハープ 212、Cosmic Suite 2 237、YPY 198、KUSO 188、HERO 237、JOURNEY 226）；thin 3 張 159–174（パラレリズム 174、Chouchou 159、ECD 165）。初稿 HERO 249、JOURNEY 255 超標，整格捨去：HERO 把「兩位 MC 負責饒舌」縮成分工短句、合唱欄句併進日期句；JOURNEY 把盤名從第二句拿掉、隱藏曲兩句併一句。
- **41362** 第二句領句全照鉤子層配表（41353）；「日」後一字全照 41354（H 於、Tutu 發、パラレリズム 推、audio sponge 上、Doopees 透、Summertime 在、KUSO 以、ECD 登、HERO 問；Chouchou、ハープ、Cosmic、YPY、JOURNEY 只寫到月）。日期前一字逐張相異（風、牌、手、題、子、樂、年、會、在、與、林、京、團、手——JOURNEY 為「之手」、パラレリズム 為「歌手」，掃描器下 4-gram 不同）。ハープ 只寫 1973 年 6 月錄音、不寫發行年；ECD 不寫第二作／公認經典；SHAKKAZOMBIE 成員照研究稿、不寫 Ikkyu（41372）。
- **41363** 店主加註照辦：正文無媒體名、無媒體榜單名次（Cosmic Suite 2 的年度榜整句不寫）、無「據說／據傳」；audio sponge 的「兩人都唱、彈傳統樂器」照 note 平敘、不帶出處。Tutu 的「Telex 全員參與」寫成「參與了錄音」，不擴寫成進錄音室。
- **41364** 跨兩檔合掃（out-2 當時 14 張已在磁碟）han() 4-gram：3 張以上只剩專名「細野晴臣」與樂器「薩克斯風」。本組拆掉的殘片：「生在東京」（Tutu／ECD）、「的標題曲」（撞 YPY hook，改 パラレリズム）、「電子音樂」／「做電子樂」（撞 out-2 in the blue shirt，Chouchou 改「以電子編制為底」、YPY 改「電子樂創作者」）、「錄音室錄」（撞 SOFT hook，ハープ 改「進⋯第二錄音室灌錄」）、「首張專輯」（撞 U.TA屋塔，audio sponge 改「出道盤」）、「年月由發行」「節拍製作人」「首加起來」（撞 out-2，Cosmic 改「發行落在⋯廠牌是」、KUSO 改「國籍是德國」「總長約」）。2 張殘片現只剩專名（高橋幸宏、坂本龍一）。
- **41365** 腳本：`node qa-batch.mjs out add-20261030-sf04` out-1 0 標記（全批唯一標記是 out-2 的 Magamura thin 182）；`qa-check-research` out-1 標記 0；`fix-spacing` 0 處。KUSO 第二句「藝名由來」寫成「這個藝名用的是日文發音」，不重述 hook 的「臭小鬼」；ECD 以「CHECK YOUR MIKE 的主辦人」具名 hook 的「饒舌活動」。

## 寫作層（writer-2）
- **41366** 交件：`desc-tools/batches/output/add-20261030-sf04-out-2.json` 14 張（full 8：207–238；thin 6：137–180）。初稿 2 張出界，整格捨去：Chestnut Bakery 250 → 砍「常去攤子的是 Rye」一句；Magamura 185 → 第二句拿掉重複的團名。kinoue64 初稿自補「誰都能拿去聽」（note 外推論）已刪。
- **41367** 第二句領句全照鉤子層 note／41358：Jomon 廠牌關係、Tokimeki 製作人、kinoue64 廣島＋標籤、Emapea 節拍身分（改寫成「專門做節拍」避開與 writer-1 Culture 的「節拍製作人」4-gram）、志人 降神成員、Ironomi 鋼琴與十七絃箏、Magamura 國籍、concrete 紐約四人器樂樂團、Chestnut 成立年（珠海已在 hook）、AKA lisa 城市、SOFT 京都器樂團、dip 日本迷幻搖滾、in the blue shirt 本名、U.TA屋塔 dream pop。「日」後一字全照 41354／41358（放、面、由、先、自、交、整、從、經、成；Jomon／Tokimeki／Emapea／U.TA 只寫到月）。
- **41368** 41372 照辦：Tokimeki 交代翻唱出身、不寫 lo-fi；kinoue64 不寫首張；U.TA屋塔 寫「首張專輯」。店主加註：正文 0 媒體名、0 媒體榜單名次（dip 的冷靜張力、in the blue shirt 的抒情、Magamura 風格均平敘）；「據說／據傳」0。否定字只出現在 hook 原文（Emapea「不到」、U.TA「不插電」）。
- **41369** 自掃 han() 4-gram：本檔內 0；與 out-1 合掃 3 張以上只剩專名／樂器（細野晴臣、薩克斯風）。途中拆掉「首約分鐘」×5（數字被剝後的曲數時長樣板）、「首張專輯」×4、「與年月日」×2、「器樂樂團」、「發行約分」、「電子音樂」×3（與 out-1 合）、「年月由發行」「錄下這張」「首加起來」（與 out-1 各 2）。剩 2 張的「錄音室錄」是本檔 SOFT 的 hook 原文對 out-1 ハープ，寫作層改不了 hook。
- **41370** 腳本：`qa-batch out` 0 標記、`qa-check-research` 14 張 0 標記。`fix-spacing` 只報 U.TA屋塔 要在「U.TA」與「屋塔」間補空格——hook 原文與卡單藝人欄都寫連字的 `U.TA屋塔`，照本卡藝人名逐字規則不套用、未 `--write`，請主線審稿確認。

## 主線審稿（2026-10-30，雲端主線，28 張）
- 41373：`qa-batch out` 28/28、`qa-check-research` 兩檔 0、`fix-spacing` 只報 U.TA屋塔「U.TA」與「屋塔」間補空格——那是藝人官方連寫的名稱，不補。逐張讀全文、對回研究稿，改一處（只動措辭，hooks／input／out 三層同步）：
  - `desc4:越美晴 Miharu Koshi|パラレリズム` hook：「荷蘭廠牌也發起她的唱片」→「荷蘭的廠牌也開始替她發片」（「發起唱片」不通）。
- 其餘 27 張逐張審過未改字：Sketch Show 改名躲狂牛症、Doopees 虛構成員扮演者、沖山秀子《電車狂》皆有研究 a／b 來源；Magamura thin 180 字在上限內。媒體名、媒體榜單名次、「據說／據傳」grep 0。
- 41374：**頂點逐張判定 0 張**。28 張 classic 皆 3，無殿堂資格；obscurity 5 的兩張（YPY《Zurhyrethm》、U.TA屋塔《緩飆公路》，皆串流未上架）都沒有遺珠級舉證，不列 pearl。
- 41375：寫入（2026-10-30）：寫入前對 origin/main 與全部 `claude/*` 分支 seed 盤層去重 0 撞。card_catalog 28／28、KV 40 鍵（kv-add-20261030-sf04-202610300545，回讀逐字一致 40）、靜態試聽 ready 24／unavailable 4（YPY、ECD、志人、U.TA屋塔：Apple 未上架或只有另版）、seed +28；published gate 0 error。封面 CAA 22、Apple 5、Discogs 1（U.TA屋塔，入 registry，主線目視相符）。
- 41376：子曲風：`warm-batch` 標籤 20／空 8；13 張未落位，寫進 `genre-l3-artist-map.json`（立花ハジメ→electronic/synth/new-wave；越美晴→pop/synth/synthpop；Sketch Show、YPY、in the blue shirt→electronic/jp-electronic；沖山秀子→jazz/vocal；篠崎史子→classical/contemporary；井出靖→jazz/contemporary/nu-jazz；KUSO GVKI、Emapea→hiphop/underground/instrumental；AKA lisa→pop/art-pop/modern；dip→rock/psych-prog/psych），重跑後 28/28 落位。亞洲搖滾國別：自動 Chestnut Bakery→cn、U.TA屋塔→tw，人工補 jp 3（kinoue64、SOFT、dip）。

## 本批新藝人（無介紹）
- 26 位全部沒有介紹、也不在排隊批次或別名鍵。名冊 `batch-progress/artist-intro/roster-sf04.json`（tier D、addedBy add-20261030-sf04），progress.json 追加 **ar-d-204**（state cut，26 位），`desc-tools/batches/artist/cut/ar-d-204.txt`。補洞寫作由調度另派。
- 立花ハジメ Hajime Tachibana、越美晴 Miharu Koshi、Sketch Show、Doopees、Chouchou、沖山秀子 Hideko Okiyama、篠崎史子 Ayako Shinozaki、Yasushi Ide 井出靖、YPY、KUSO GVKI、ECD、SHAKKAZOMBIE、Hoshina Anniversary、Tokimeki Records、kinoue64、Emapea、志人、Ironomi、Magamura、concrete concrete、Chestnut Bakery、AKA lisa、SOFT、dip、in the blue shirt、U.TA屋塔。

## 情緒評分（score-sf0304）
- 41377：Opus 1 支照 `RULES.md`＋BRIEF 打 28 張，主線逐張看過 why 與研究稿，未改值。八格：恍惚 6、頹靡 6、雀躍 5、放鬆 4、暴躁 3、冷冽 2、平靜 1、沸騰 1；conf mid 12／low 16。與 sf03 共用 `batch-progress/mood-axes/score-sf0304/`；錨點 104/104 同格，座標 22,173/22,173。不算落格率。
