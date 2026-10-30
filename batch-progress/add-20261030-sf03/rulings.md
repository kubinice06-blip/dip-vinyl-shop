# add-20261030-sf03 裁定（店主 Spotify 追蹤藝人補卡池・日本：地下、迷幻、即興、和樂器）

> 店主 2026-10-30 `/dip-card-create`：依 Spotify 追蹤藝人補卡池，每位缺漏藝人挑 1–2 張代表作（交接 `batch-progress/spotify-follow-20261030/PLAN.md`）。本工作階段負責 sf03、sf04。流程沿用 `batch-progress/HANDOFF-mood-cells-line.md` §二，**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-sf03a.json`（10 位 14 張）＋`curation-sf03b.json`（10 位 13 張）→ 主線汰 4、改 1（`master-override-sf03asf03b.json`）→ `master-sf03asf03b.json`（23 張：MB 釘住 19、§1 人工 4）→ `pick.json`（23）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf03-cards.json`（23 張；研究 a–d 各 5、e 3）。
> **預留：研究 a 41201–41210、b 41211–41220、c 41221–41230、d 41231–41240、e 41241–41250、鉤子 41251–41260、寫作 41261–41270、主線 41271–41280。**（sf 線條號：sfNN → 41001＋(NN−1)×100 起，與 sf09／sf10 同制；30000＋批號×100 制的 303xx 已被舊 c 批佔用，不用。）
---

## 主線策展（不佔條號）
- **清單 20 位 → 20 位全收、23 張；跳過已在池 0 位；不收 0 位。** 策展兩組以原文、羅馬拼音、MB 別名查 `seed_cards.json`、`data/artist-intros/`、`aliases.json`；主線再對 origin/main 與全部 `claude/*` 分支的 seed（合併 22,168 列）跑藝人層與盤名層去重，命中全是誤中（John Zorn 的其他盤、Sam Gendel《Satin Doll》、Sa-Ra、Ta-ku、Buzzcocks、Peaking Lights／SHINee 同名《Lucifer》、Petrucciani《Playground》），0 撞。
- 身分：Seiichi Yamamoto＝山本精一；Taku Sugimoto＝杉本拓；Suzuki Junzo＝スズキジュンゾ；Miminokoto＝みみのこと；Shinki Chen＝陳信輝；ファーラウト＝Far Out（1973《日本人》，Far East Family Band 前身）；Toho Sara＝東方沙羅；Kifu Mitsuhashi＝三橋貴風；SHIGEO SEKITO＝関藤繁生；Mitsuru Tabata＝田畑満；Shin Sasakubo＝笹久保伸；Kenji Kariu＝狩生健志；BUZZ＝バズ（1970 年代日本民謠搖滾團，韓國 버즈、Da Buzz、Buzzcocks 非本人）。
- **Yamantaka Eye《Nani Nani》**：MB 掛名「Dekoboko Hajime & Yamataka Eye」，Dekoboko Hajime 是 John Zorn 的化名；Apple 掛「Yamataka Eye & John Zorn」。卡上掛名用後者（讀者認得），MB 掛名進 queryAlias。池中 BOREDOMS 是團名卡，不是 Eye 個人名義，不算已在池。
- **Shin Sasakubo**：收與 Sam Gendel 的合作盤《Sam Gendel & Shin Sasakubo》（2021，Leaving Records，§1 人工）。合作名義有先例（sf10 Danger Mouse 兩個合作名義）；Spotify 上笹久保最廣為人知的正是這張。研究層核廠牌。
- **主線汰第二張（策展給太寬，「第二張要確實是另一個高峰才收」）**：関藤繁生 Vol.1《華麗なるエレクトーン》（留 Vol.2，被取樣而聞名的那張）、Sinsuke Fujieda Group《FUKUSHIMA》（2025，評價證據薄）、バズ《Gentle Mind From Buzz》（只有類型標籤）、みみのこと《緑の住処》（留國際廠牌 Important 的《Hitoyogiri》）。
- **留兩張的**：world's end girlfriend（《Hurtbreak Wonderland》《Seven Idiots》）、山本精一（《NOA》《PLAYGROUND》，Alchemy 與 P-Vine 兩期）、割礼（《Paradaise・K》《ネイルフラン》）。
- §1 人工 4 張：スズキジュンゾ《Ode to a Blue Ghost》、笹久保合作盤、狩生健志《Sekai》、バズ《Buzz》；`mbAbsenceProof` 策展給的是字串，上線前轉成物件（sf05／sf07 坑）。
- 交研究層把關：Musica Transonic、穂高亜希子、田畑満《Lucifer》代表作依據薄；三橋貴風盤 MB 掛名含山屋清、廠牌待核；関藤 Vol.2、Fujieda《Informel》廠牌待核（Apple 標 2026 再發、MB 2021）；狩生《Sekai》2020／2021 兩說；Far Out 年份 Apple 1971 vs MB 1973；LSD March、割礼《ネイルフラン》CAA 無封面（Discogs）。BUZZ 身分（Spotify 的 BUZZ 是否這組）iTunes 未能核對，研究層再查。

## 研究 e 組
- 41241　笹久保合作盤：廠牌推翻策展層的 Leaving Records，Discogs 原版與黑膠為 Carnet Records（carnet-001，2021-11-17 數位首發）；Leaving 是 Gendel 自家廠牌。卡單 label 建議改 Carnet Records。status thin（聲音細節僅零售商文案）。
- 41242　狩生健志《Sekai》：年份以 2020 為準（黑膠 2020-12-07，Apple ℗ 2020，數位上架 2021-01-15），Bruit Direct Disques Br-d 36 確認。卡單 year 建議改 2020。聲音只證實電子／流行質地，樂器與有無鼓未證實，寫作層勿斷言合成器。
- 41243　バズ《Buzz》：Discogs 與 MB 均為同一組日本團，廠牌 London Records（SKD(L)-1013，1973-04-10），2012 King 再發 KICS 91808。Spotify 頁無法直接核對（iTunes 403），判斷多半是這組（串流版應為 King 再發），未證實；主線以 Spotify 專輯頁曲目核對。日文維基只算小出博志、東郷昌和二人為成員，高橋幸宏僅為錄音鼓手（Discogs 樂手欄），不寫成成員。專輯收錄版〈ケンとメリー〉是否同單曲版未證實。

## 研究 d 組
- 41231　三橋貴風 & 山屋清《Komuso World In Shakuhachi》：廠牌核出 Denon（WX-7506，1977，Discogs＋MB），卡單 label 空白應補。山屋清是作曲編曲指揮、率 Contemporary Sound Orchestra 伴奏，不是三橋獨奏碟；facts 以此為準。查無樂評，status thin。
- 41232　関藤繁生 Vol.2：廠牌核出 Columbia（日本コロムビア，GS-7012，1975-01-25）；2019-05 為日本再發。Mac DeMarco 只證「啟發」，未證取樣，facts 只寫啟發。
- 41233　Fujieda《Informel》：廠牌 SoFa Records（SOFA1014），2021-04-21 原發，2020-10-22 於 Jirokichi 現場錄音；Apple 的 2026 為 2026-10-07 數位再發，卡片年份用 2021。「日本民謠節奏」查無來源，不寫。
- 41234　田畑満《Lucifer》：身分（2010 Compare Notes CN-0025）屬實，但無任何樂評，僅 Bandcamp 標籤與 Discogs credits，thin；代表性未證實，建議主線視為可收但薄。
- 41235　moodGuess 存疑（僅 notes 標記，不汰卡）：田畑《Lucifer》噪音／躁（x3 y1.5）無證據，僅迷幻長篇可證；三橋盤是否全無鼓未能證實；Fujieda x2 可能偏高。東方沙羅、関藤與預估相符。Sinsuke／Shinsuke Fujieda 為同人。

## 研究 c 組
- 41221：陳信輝盤廠牌，卡單 Philips 推翻為 Polydor（Discogs release 3891006 與 MB 皆 Polydor MR 5003）；主線改卡單 label。
- 41222：穂高亜希子《ひかるゆめ》卡單稱「首張個人專輯」不成立（Discogs 有 2005、2008 更早發行），寫作層不得寫「首張」；代表作依據薄，status thin，年份廠牌無誤。
- 41223：Far Out《日本人》年份採 1973（MB、Discogs、日文維基脈絡），Apple 1971 不採；廠牌 Denon 無誤。
- 41224：割礼《ネイルフラン》、みみのこと《Hitoyogiri》找不到談速度與音色的樂評，moodGuess 只有風格標籤與編制佐證，notes 已標存疑；みみのこと卡單「民謠」無來源，寫作層勿寫。

## 研究 a 組
- 41201 Hurtbreak Wonderland：卡單 label=Virgin Babylon 有誤；2007 原版為 Human Highway（HHR42），Virgin Babylon 是 2010／2013 再版。建議卡上 label 改 Human Highway（可逆，manifest 欄位）。年份 2007 無誤。
- 41202 Seven Idiots：身分無誤（Virgin Babylon VBR-001，2010-09-14）。聲音面來源薄（僅評論引言與樂手署名），標 thin；moodGuess 無反證，不存疑。
- 41203 Nani Nani：掛名 Yamataka Eye & John Zorn 可用（Discogs 中 Dekoboko Hajime 與 Zorn 樂器欄相同）。錄音日期 Discogs booklet 3/17–18 對英維 4/17–18，facts 採 booklet；寫作層避談月份。
- 41204 NOA：moodGuess 存疑（卡單說「歌與吉他、低吟」，但曲目與 MB 標籤 noise／experimental 看不出有歌，傾向器樂吉他）；年份 1997（Discogs ©℗1997、MB）對英維／日維 1998，推翻後者。聲音事實薄，status thin。
- 41205 PLAYGROUND：身分無誤，聲音事實充分（人聲、吉他、貝斯、單一鼓手）。「迷幻」一詞無來源，不影響收卡。

## 研究 b 組

- **41211**：LSD March 推翻策展「長篇迷幻搖滾」：本盤七首、Dusted 與 Scaruffi 皆指向克制 lo-fi 的慢編排，偶爾爆發；moodGuess 存疑（x 可能偏低），不汰卡。Dusted 引文為 WebSearch 摘要間接引述，原頁 404，寫作層不放全文引句。重發年採 2004（Discogs／MB），Scaruffi 寫 2005。
- **41212**：割礼《Paradaise・K》實為迷你專輯（LP 六首、CD 七首、2010 P-Vine 版十一首）；找不到任何聲音樂評，sound 只依 Discogs 風格標籤與曲長；moodGuess（低吟、扭曲、緩慢、陰鬱）全無證據，存疑不汰卡。Touch Label 重發不寫國別。
- **41213**：スズキジュンゾ《Ode to a Blue Ghost》：原版 2009 Plunk's Plan CD-R 三首現場錄音，Apple 流通的是 2012 Utech 四首版；Bandcamp 無此盤；人聲有無查不到，moodGuess「低吟」存疑，不汰卡。年份維持 2009。
- **41214**：Musica Transonic 首作代表作依據：Burning Ambulance 評論加 2020 Black Editions 18 首雙 LP 重發，足以支持，不推翻；廠牌 P.S.F.、年份 1995 屬實。曲名全為希臘字母拼寫，keyTracks 留空。
- **41215**：杉本拓《Opposite》廠牌 hatNOIR、1998 屬實；找不到針對本盤的樂評，status thin，聲音只依 Wikipedia 風格描述與曲長；單吉他，琴種未查到不寫。
- **41216**：主線換盤後核對《Buried Sky, Spider Torn To Pieces》：MB／Discogs 一致，2010-08-11、Plunk's Plan ppcd 003、日本 CD 正規專輯、九首約 57 分鐘；人聲存在已證，但「失真、低吟、緩慢」無來源，moodGuess 存疑不汰卡；無樂評，status thin，聲音措辭保守。

## 主線（條號 41271–41280）
- 41271：研究層推翻策展層，卡單已改：world's end girlfriend《Hurtbreak Wonderland》廠牌改 Human Highway（2007 原版 HHR42，Virgin Babylon 是 2010／2013 再版）；陳信輝改 Polydor（MR 5003）；三橋貴風 & 山屋清補 Denon（WX-7506）；関藤繁生 Vol.2 補 Columbia（GS-7012）；Sinsuke Fujieda Group 補 SoFa Records（SOFA1014，年份留 2021，Apple 2026 是數位再發）；Sam Gendel & Shin Sasakubo 改 Carnet Records（carnet-001；Leaving 是 Gendel 自己的廠牌）；狩生健志《Sekai》年份改 2020（黑膠 2020-12-07）；バズ《Buzz》補 London Records（SKD(L)-1013）。
- 41272：**スズキジュンゾ換盤**：研究 b 核出《Ode to a Blue Ghost》原版是 2009 年三首現場錄音 CD-R（策展說 MB 查無也不對，MB 有藝人 289c9c9f 與 19 個 release-group）。改收《Buried Sky, Spider Torn To Pieces》（2010-08-11，Plunk's Plan ppcd 003，9 曲 CD 正規專輯，MB 1aea8f3e 釘住，CAA 有圖）；早期的《Cosmic Blues Experience》《Eight-Sided Infinity》都只有 3 曲、CAA 無圖，不選。研究 b 41216 重查。人工身分從 4 張降為 3 張。
- 41273：割礼《Paradaise・K》研究 b 核出是迷你專輯（LP 6 首、CD 7 首），MB 記 Album；6 首以上、作為主要作品發行，符合長 EP 例外，照留。穂高亜希子《ひかるゆめ》不是首張（Discogs 有 2005、2008 更早發行），正文不寫「首張」。LSD March 不是長篇堆疊（7 首、偏克制 lo-fi），以研究稿為準。BUZZ 身分：MB 30645ba2／Discogs 皆指 1972 年成立的日本團（〈ケンとメリー〉出道），Spotify 頁未能直接核對，照判斷收；高橋幸宏只是錄音鼓手，不寫成成員。

## 鉤子層（d、e）
- **41256** 交件：`desc-tools/batches/hooks/add-20261030-sf03-hooks-d.json`（5）、`-hooks-e.json`（3），key 逐字照研究稿、順序不變。公式照第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。逐筆預算（hook 加權）：d1 東方沙羅 223（27）、d2 三橋 thin 159（21）、d3 関藤 229（23）、d4 Fujieda 229（20.5）、d5 田畑 thin 156（23）、e1 Gendel＆笹久保 thin 161（20.5）、e2 狩生 209（19）、e3 バズ thin 164（19）。hook 原始字元 19–30。初稿 6 張超標，整格捨去：東方沙羅「儀式戲劇」釋義與南條製作欄、関藤日文盤名／《Salad Days》盤名／〈This Masquerade〉、Fujieda 作曲欄與效果器低鳴、田畑 Zeni Geva 與原聲吉他、Gendel 的《Chichibu》前作與 B 面曲名與總長、バズ 正式成員二人與單曲全名。壓完回核 hook 依賴：Fujieda「2CD 加 DVD」與田畑「川端稔製作並彈西塔琴」兩處一度踩空，已補回 g2；関藤的 Mac DeMarco 移到 g2、Gendel 的 A／B 面移到 g1、バズ 的 Skyline 與 33 萬張併進 g2、東方沙羅 神樂／薩滿進 g1。
- **41257** 骨架歸屬（8 張 8 條，各張只寫自己的歸屬句）：東方沙羅＝電聲樂手改奏原聲儀式樂；三橋＝修行獨奏曲改編成樂團合奏；関藤＝被後輩音樂人引為靈感；Fujieda＝一場現場整場收成套組；田畑＝同儕操刀製作的個人盤；Gendel＆笹久保＝一人一面的雙名義盤；狩生＝疫情中一人完成、交海外廠牌；バズ＝廣告歌出道。東方沙羅與 Musica Transonic 同屬 P.S.F.／成員重疊，東方沙羅不帶「三團成員湊成一團」的寫法（第二句只以南條麻人領句）、Black Editions 2020 再版整格捨去，留給 Musica Transonic。hook 四型：場景（東方沙羅、Fujieda）／斷言（三橋、Gendel、狩生）／懸疑（関藤、バズ）／人物定調（田畑）。
- **41258** 引入法與第二句句型配表（避開 a 組已用的本名／廠牌關係／廠牌／出生地／年份）：東方沙羅＝成員名南條麻人＋「也是 High Rise 成員」；三橋＝「尺八演奏者」身分；関藤＝樂器電子琴；Fujieda＝六人編制；田畑＝地下搖滾身分；Gendel＝城市洛杉磯；狩生＝樂團 OWKMJ（樂種寫臥室流行）；バズ＝製作人高橋信之。川端稔跨東方沙羅（只列成員名）與田畑（製作＋樂器）分軸。「日」後一字：東方沙羅 日由、Fujieda 日於、Gendel 日先、狩生 日黑、バズ 日以；三橋、関藤、田畑只寫到年或月（a 組已用 日在、日推）。
- **41259** 研究層「不寫」與店主加註照辦：関藤〈The Word〉出自披頭四、「被取樣」不寫（只寫啟發）；Fujieda 民謠節奏、盤名由來、22 分鐘不寫；三橋虛無僧定義（未開頁）、管弦編制推論、有無鼓不寫；田畑噪音／失真、「Ruins 的吉田達也」不寫；Gendel 兩地錄音（單一零售商文案）與「沒有鼓」不派；狩生不斷言合成器；バズ 高橋幸宏寫成錄音鼓手、〈ケンとメリー〉不說與單曲同版、不寫「首張」。媒體名與榜單名次不進 note（バズ 的 Oricon 名次改用 33 萬張；関藤的新加坡報紙一格捨去；零售商名不寫）。thin 四張的聲音只派有來源的格子（三橋只寫尺八＋樂團、田畑只寫掛名樂器、Gendel 只寫 A／B 面配置、バズ 只寫弦樂編曲與鼓手）。
- **41260** 自查：hook 之間中文 4-gram 本組 0 條（全批只有 a 組人名「山本精一」）；hook 與他張 note 0 條；hook 與自己 note 無逐字重複句；開頭前四字 13 張互異。`qa-batch hooks` 0 標記（只報 b、c 缺檔）；`chk-hook-crossgroup` a／d／e 13 張全部通過（加權 19–27）。

## 鉤子層（a、b、c）
- **41251** 交件：`desc-tools/batches/hooks/add-20261030-sf03-hooks-a.json`（5）、`-hooks-b.json`（5）、`-hooks-c.json`（5），key 逐字照研究稿、順序不變。公式照第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin 上限 170。逐筆預算（hook 加權／原始字元）：a1 Hurtbreak 219（24／24）、a2 Seven Idiots thin 169（24／24）、a3 Nani Nani 219（20／25）、a4 NOA thin 166（21.5／25）、a5 PLAYGROUND 189（22／22）、b1 Musica Transonic 226（21／21）、b2 LSD March 225（23.5／26）、b3 Opposite thin 166（24／24）、b4 Buried Sky thin 167（24／24）、b5 Paradaise・K thin 167（22／22）、c1 ネイルフラン thin 160（22／22）、c2 ひかるゆめ thin 147（22／22）、c3 Hitoyogiri thin 167（21／21）、c4 陳信輝 230（23.5／30）、c5 Far Out 227（18／20）。初稿 10 張超標，整格捨去：Hurtbreak 的 Chikada 名、上低音號與長笛；Seven Idiots 的「樂手有」引導；Nani Nani 的 Naked City；NOA 的自製欄與英文曲名；Musica Transonic 的「第一次錄就成」；LSD March 的道下慎介與貝斯手；Opposite 的生年；Buried Sky 的 Horner／錄音室名與最長曲；Hitoyogiri 的誤壓版配色與 Peace Music；陳信輝的目錄號與 Yanagida；Far Out 的 Ishikawa。壓完回核 hook 依賴：ひかるゆめ 的樂器格、Far Out 的曲長格原在 g3／g4，已前移到 g2；其餘 13 張依賴格本在 g1／g2 或 hook 自身。hook 與自己 note 無逐字重複句。
- **41252** 骨架歸屬（15 張 15 條，只在擁有卡寫歸屬句）：Hurtbreak＝一人名義背後的大編制；Seven Idiots＝自創廠牌第一號；Nani Nani＝兩天錄混完的雙人合作；NOA＝場地店長兼吉他手的個人 CD；PLAYGROUND＝前團鼓手車禍、樂團解散後重新唱歌（逝者語氣克制）；Musica Transonic＝三團各出一人＋刻意混到過響；LSD March＝限量三色封套初版；Opposite＝畫廊咖啡館錄音、銀行贊助海外出版；Buried Sky＝遠地錄音跨三年；Paradaise・K＝冗長原團名＋同年兩版本的迷你專輯；ネイルフラン＝大廠出道、三人加電大提琴；ひかるゆめ＝民族與古樂器小編制；Hitoyogiri＝初版誤壓；陳信輝＝稱號＋一人兼多樂器；Far Out＝名團前身、兩首長曲。與 d／e 比對：Far Out 原 hook「一面一首」與 e 組 Gendel「A 面歸／B 面歸」同形，改成總長、note 拿掉 A／B 面字樣；Musica Transonic 不帶 Black Editions 2020 再版（d 組 41257 也讓出，本卡同樣捨去，兩邊都不寫）。hook 四型：人物定調（Hurtbreak、NOA、PLAYGROUND、陳信輝）／斷言（Seven Idiots、Musica Transonic、Paradaise・K、Far Out）／場景（Nani Nani、LSD March、Opposite、Buried Sky、ネイルフラン、ひかるゆめ）／懸疑（Hitoyogiri，note g2 收尾）。
- **41253** 同藝人分軸與「他／她」引入法：world's end girlfriend——Hurtbreak 帶生平（1975 生於五島列島、本名前田勝彦領句），Seven Idiots 帶廠牌（「他創辦的 Virgin Babylon」廠牌關係領句），Hurtbreak note 不寫 Virgin Babylon 再版。山本精一——NOA 帶生平（尼崎出身、Boredoms、Bears 店長，出生地領句），PLAYGROUND 帶羅針盤與錄音編制（「2005 年」事件領句）。割礼——Paradaise・K 帶成立年地與原團名（成立年與城市領句），ネイルフラン 帶三人陣容與電大提琴（發行日期領句）。Suzuki Junzo——Buried Sky 用器物（Gibson 半空心電吉他）領句、帶生平；Hitoyogiri 只在成員欄出現，第二句以「日本迷幻搖滾三人團」樂種領句；兩張都寫羅馬字 Suzuki Junzo（藝人欄スズキジュンゾ全片假名，照規則羅馬化；研究 c 的「鈴木ジュンゾ」不用）。Ikuro Takahashi 跨 LSD March（帶 Fushitsusha）與 Buried Sky（只列鼓手），Buried Sky 不提 LSD March 盤名。第二句句型 15 張逐張配死：本名／廠牌關係／Boredoms 主腦／出生地／2005 年／三人原屬樂團／團名由來／即興樂種／那把電吉他／成立年與城市／發行日期／自彈自唱／日本迷幻搖滾三人團／前一個三人團／前身關係；避開 d／e 已用的成員名、尺八身分、電子琴、六人編制、地下搖滾身分、洛杉磯、OWKMJ、高橋信之。
- **41254** 「日」後一字：Hurtbreak 日在、PLAYGROUND 日推、ネイルフラン 日發、Hitoyogiri 日錄；其餘 11 張只寫到年或月（Nani Nani 照研究 a 不寫月份）。與 d／e 的由、於、先、黑、以零衝突。hook 間中文 4-gram：全批 23 張只剩人名「山本精一」（NOA／PLAYGROUND，專名不算）；hook 對他卡 note 只有人名「前田勝彦」「山本精一」（同藝人另一張）。開頭前四字全批 23 張互異；初稿 ネイルフラン「開場那首」、ひかるゆめ「十四首日」、Far Out「整張只有／一面一首／兩首長曲／只有兩首」撞舊批 c79／c134／c189／c87／c141／c175 hook 開頭，均已改開。`node qa-batch.mjs hooks add-20261030-sf03` 全部通過 ✓（互指 1 處：Hitoyogiri 的 Suzuki Junzo，屬成員欄必要專名，照留）；`node chk-hook-crossgroup.mjs add-20261030-sf03`（a–e 23 張）✓ 全部通過，hook 加權 18–27、note 152–234。
- **41255** 研究層裁定與店主加註照辦：媒體名與媒體榜單名次不進 note（Seven Idiots 的 Oricon 名次與兩則樂評、Nani Nani 與 Hurtbreak 的樂評、LSD March 的兩家評論名、陳信輝的串流平台評介與零售商、Opposite 的 Bruce Russell 引語全部不指派；聲音只以平敘寫）。thin 八張的聲音只派有來源的格子：Seven Idiots 只寫 liner notes 樂手、NOA 只寫曲長與曲名（不寫有無歌聲）、Opposite 只寫單吉他與曲長、Buried Sky 只寫編制與風格標籤、Paradaise・K 只寫風格標籤與曲數、ネイルフラン 只寫陣容與曲長、ひかるゆめ 只寫編制、Hitoyogiri 只寫陣容。其餘：Hurtbreak 廠牌寫 Human Highway；NOA 年份 1997、不寫「第一張」；PLAYGROUND 不寫「迷幻」、不寫確切停唱年數；LSD March 寫克制 lo-fi、不放引句、Last Visible Dog 重發不派；Paradaise・K 寫迷你專輯、Touch Label 不派；ひかるゆめ 不寫「首張」；Hitoyogiri 不寫民謠；陳信輝寫 Polydor、不寫「唯一」與 Golden Cups；Far Out 年份 1973、Kitaro 不寫、「For Out」誤印不派（避開 Hitoyogiri 誤壓骨架）。**請主線複核**：研究 b 把 Musica Transonic 吉他手寫成「川端誠」、研究 d 寫「川端稔」，兩者互相矛盾（一般寫法為「河端一」，但研究稿無來源），本組 note 一律用羅馬字 Makoto Kawabata；d 組東方沙羅、田畑兩張 note 用了「川端稔」，建議主線統一。
- 41274：Makoto Kawabata（Acid Mothers Temple 主腦）的漢字統一為「河端一」：研究 b 寫「川端誠」、研究 d 與鉤子 d 寫「川端稔」皆誤，研究稿與鉤子稿全數改正。

## 寫作層（writer-1）
- **41261** 交件：`desc-tools/batches/output/add-20261030-sf03-out-1.json` 12 張（full 4：200–238；thin 8：149–169）。逐張：Hurtbreak 210、Seven Idiots 169、Nani Nani 208、NOA 168、PLAYGROUND 200、Musica Transonic 216、LSD March 238、Opposite 166、Buried Sky 159、Paradaise・K 169、ネイルフラン 169、ひかるゆめ 149。初稿只 LSD March 超標（244），整格捨去「迷幻搖滾團」重述（hook 已有「迷幻團」）並縮「同時也是」「衝出來」。`qa-batch out` 標記 0、`qa-check-research` 0、`fix-spacing` 0；轉述引導詞與否定句 grep 0。
- **41262** 第二句領句全照鉤子層 41253 指派（本名／廠牌關係／Boredoms 主腦／出生地／2005 年／三人原屬樂團／團名由來／即興樂種／那把電吉他／成立年與城市／發行日期／自彈自唱）。Hurtbreak 第二句只補生年與「個人名義」，不重述 hook 的五島；NOA 以「難波這處演出場地」帶 Bears，避開 hook 的「店長」；Buried Sky 不重述札幌，只寫 2008 到 2010 年。「日」後一字照 41254：Hurtbreak 日在、PLAYGROUND 日推、ネイルフラン 日發；其餘只寫到年或月（Nani Nani 不寫月份）。
- **41263** 跨兩檔合掃（out-2 當時 11 張已在檔）：拆掉「首約分鐘」×3、「幻搖滾團」×3、「最長的分秒」、「鐘最長的」、「作目錄號」、「這張目錄號」、「吉他加上」、「彈吉他與」、「年月推出」、「風格歸在迷幻」（對 Far Out）、「長約分鐘」×3、「鼓與打擊」（對 Fujieda）、「約分鐘的」（對関藤）、「彈電吉他」（對田畑）、「年月發行」（對バズ）、「來約分鐘」（對 Far Out 的 hook，改己方）、「的是日本」（對バズ）。定稿 3 張以上只剩「薩克斯風」「迷幻搖滾」（樂器／樂種名）；2 張只剩人名（前田勝彦、山本精一、南條麻人）與樂器列舉。out-2 若再動，請主線收件時再合掃一次。
- **41264** 店主加註照辦：Musica Transonic 吉他手寫「河端一」；媒體名與媒體榜單名次整句不寫（Seven Idiots 的 Oricon 名次、各卡樂評、Dusted／Scaruffi 皆未進正文）；不用「據說／據傳」。スズキジュンゾ 照 41253 寫羅馬字 Suzuki Junzo；Nani Nani 照 hook 寫山塚アイ。Musica Transonic 不寫「首作」（note 未列）。
- **41265** PLAYGROUND 的羅針盤鼓手車禍一句只寫「巡演途中車禍過世，樂團隨之解散」，不加形容（逝者克制）；ひかるゆめ 不寫「首張」；Paradaise・K 寫迷你專輯；NOA 年份 1997。

## 寫作層（writer-2）
- **41266** 交件：`desc-tools/batches/output/add-20261030-sf03-out-2.json` 11 張（full 6：202–239；thin 5：142–163）。逐張：Hitoyogiri 162、陳信輝 238、Far Out 237、東方沙羅 216、三橋 155、関藤 239、Fujieda 239、田畑 163、Gendel & 笹久保 142、狩生 202、バズ 158。初稿超標 3 張（陳信輝 251、関藤 247、Fujieda 261），整格捨去：陳信輝「除了吉他」引導與 fuzz 質地的重述、関藤「靈感來源」的時序修飾、Fujieda 場地全名「Live Music」與「這一套」。`qa-batch out` 全部通過（互指 1：Hitoyogiri 的 Suzuki Junzo，成員欄必要專名，同 41254）、`qa-check-research` 標記 0、`fix-spacing` 待補 0；轉述引導詞 grep 0。
- **41267** 第二句領句全照 41253／41258：日本迷幻搖滾三人團／前一個三人團／前身關係／南條麻人＋High Rise／尺八演奏者／樂器電子琴／六人編制／地下搖滾圈／洛杉磯／OWKMJ（臥室流行）／高橋信之。「日」後一字照表：Hitoyogiri 日錄、東方沙羅 日由、Fujieda 日於、Gendel 日先、狩生 日黑、バズ 日以；陳信輝、Far Out、三橋、関藤、田畑只寫到年或月。目錄號引入法逐張不同：括號（東方沙羅）、目錄號（三橋）、盤號（関藤）、編號（Fujieda）、目錄編號（田畑）、列為（狩生）；其餘不寫號碼。
- **41268** 不複述 hook：Gendel 初稿第三句重講 A／B 面掛名，改成「笹久保那一面是他的獨奏曲」；陳信輝不重述貝斯與鼓，只補鋼琴；三橋不重述編曲指揮，改具名樂團並補作曲；Fujieda 不重述 2CD 加 DVD。
- **41269** 跨兩檔合掃（out-1 定稿版）：途中拆掉「個人專輯」（陳信輝／狩生，狩生改「個人作品」）、「這個日本」（東方沙羅／バズ）、「與合成器」「電吉他與」「彈電吉他」「負責電吉他」（田畑）、「貝斯鼓與打擊」（Fujieda 改「打擊與鼓」）、「約分鐘的」（関藤）、「的是日本」「年月發行」「替他們出了這張」「在年月替」（バズ 改「隔年 4 月由⋯上市」）。定稿 3 張以上只剩「薩克斯風」（樂器）與「迷幻搖滾」×4（樂種名；Hitoyogiri 為 note 指定領句）；2 張只剩人名（前田勝彦、山本精一、南條麻人）與樂器列舉。
- **41270** 店主加註照辦：東方沙羅、田畑寫「河端一」；媒體名與媒體榜單名次整句不寫（バズ 的 Oricon 名次、関藤的報紙、各卡零售商與樂評說法皆未進正文）；不用「據說／據傳」。Hitoyogiri 不寫民謠、Suzuki Junzo 照 41253 寫羅馬字；狩生不斷言合成器；バズ 高橋幸宏寫成錄音鼓手；関藤只寫「啟發」不寫取樣；田畑「番號」改「目錄編號」（台灣語感）。Fujieda 的〈Gentle Erosion〉照 note 用〈〉，facts 寫《》，請主線審稿看一眼。

## 主線審稿（2026-10-30，雲端主線，23 張）
- 41275：`qa-batch out` 23/23、`qa-check-research` 兩檔 0、`fix-spacing` 0。逐張讀全文、對回研究稿，改兩處（只動措辭）：
  - `desc2:Sinsuke Fujieda Group|Informel`：演出名「〈Gentle Erosion〉」→「「Gentle Erosion」」（那是一場演出的名稱，不是曲名）。
  - `desc4:バズ|Buzz`：「高橋信之在 1972 年 6 月製作成軍了日本民謠組合バズ」→「1972 年 6 月，製作人高橋信之讓日本民謠組合バズ成軍」（原句生硬）。
- 其餘 21 張逐張審過未改字：羅針盤「1988 年前後」組成照研究 a（日維）；陳信輝「日本的 Jimi Hendrix」是 Discogs 簡介與英維兩源的稱號、非樂評評分，照留；スズキジュンゾ正文用羅馬字 Suzuki Junzo 照鉤子 41253（他在海外發行的掛名），卡面掛名留片假名。媒體名、媒體榜單名次、「據說／據傳」grep 0。
- 41276：**頂點逐張判定 0 張**。23 張 classic 皆 ≤4（僅 world's end girlfriend《Hurtbreak Wonderland》為 4），無殿堂資格；obscurity 5 的三張（NOA、Buried Sky、Hitoyogiri，皆串流未上架）都沒有「被埋沒的傑作」級舉證，不列 pearl。
- 41277：寫入（2026-10-30）：寫入前對 origin/main 與全部 `claude/*` 分支 seed 盤層去重 0 撞。card_catalog 23／23、KV 40 鍵（kv-add-20261030-sf03-202610300538，回讀逐字一致 40）、靜態試聽 ready 19／unavailable 4（NOA、Hitoyogiri、Buzz、Buried Sky：Apple 未上架）、seed +23；published gate 0 error。封面 CAA 17、Apple 5、Discogs 1（バズ，入 `data/discogs-cover-registry.json`，主線目視相符）。
- 41278：子曲風：`warm-batch` 標籤 16／空 7；8 位寫進 `genre-l3-artist-map.json`（東方沙羅、三橋貴風 & 山屋清→world/asia；Sam Gendel & Shin Sasakubo→folk/indie-folk/contemporary；狩生健志→pop/indie-pop/bedroom；穂高亜希子、バズ→folk/songwriter/japan；山本精一、スズキジュンゾ→rock/psych-prog/psych），重跑後 23/23 落位。亞洲搖滾國別：自動 3（スズキジュンゾ、割礼、みみのこと），人工補 jp 6（山本精一、Musica Transonic、LSD March、陳信輝、Far Out、田畑満）。

## 本批新藝人（無介紹）
- 20 位全部沒有介紹、也不在排隊批次或別名鍵。名冊 `batch-progress/artist-intro/roster-sf03.json`（tier D、addedBy add-20261030-sf03），progress.json 追加 **ar-d-203**（state cut，20 位，未超過 45 不開溢出號），`desc-tools/batches/artist/cut/ar-d-203.txt`。補洞寫作由調度另派。
- world's end girlfriend、Yamataka Eye & John Zorn、Seiichi Yamamoto 山本精一、Musica Transonic、LSD March、Taku Sugimoto 杉本拓、スズキジュンゾ、割礼、穂高亜希子、みみのこと、陳信輝、Far Out、東方沙羅、三橋貴風 & 山屋清、関藤繁生、Sinsuke Fujieda Group、田畑満、Sam Gendel & Shin Sasakubo、狩生健志、バズ。
