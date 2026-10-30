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
