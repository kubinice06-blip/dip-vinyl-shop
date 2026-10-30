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
