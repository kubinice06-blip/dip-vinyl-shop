# add-20261023-md18 裁定（情緒薄格策展線・頹靡：日本暗色 drone／ambient／暗色獨立＋md20 北歐暗色電子與配樂＋md19 華語／韓國暗色獨立）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 6 輪，本工作階段負責 ml31、md18。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（md18 列，可擴寫 md20、md19），交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**頹靡＝靜（x<3.0）＋重（y≥+0.5）＋冷（z<0）**；策展邊距 x≤2.7、y≥0.8、z≤−0.3。評分照 10-23 店主「體感標準」（能量＝體感、色溫＝聲響溫度＋旋律清楚度）。
> 策展：`curation-md18.json`（54 張）→ `master-md18.json`（MB 回查 54/54 釘住；flags 1：Boris《Absolutego》MB 標 Single）→ 主線汰 9 → `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-md18-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 18041–18050、b 18051–18060、c 18061–18070、d 18071–18080、e 18081–18090、鉤子 18091–18100、寫作 18101–18110、主線 18111–18120。**
---

## 主線策展（不佔條號）
- 策展 54 張：日本 24（drone doom 12、暗色 post-rock 5、ambient drone 7）、北歐 30（Deathprod 系 11、dark ambient 15、電子 4）、華語／韓國 0。WebSearch 由策展層自報。
- **md19 0 張**：落差草原 MB 兩張全長都已在池；夢東 md4 已提過、MB 無其他全長；惘聞池中 x 2.8–3.0、Jambinai x 3.4（爆發）、林強多判輕。
- 池中錨點：Boris《Altar》[1.3,1.8,−1.3]、《Flood》z −0.2、《Rainbow》z +0.4；MONO 池中 z −0.3～−1.2、x 2.2–2.6；raison d'être／Kammarheit／Atrium Carceri／Svartsinn 全落頹靡（x 1.0–1.6、y 1.3–1.7、z −1.0～−1.8）；Supersilent《6》[1.9,1.0,−1.2]；Jim O'Rourke《Eureka》《Bad Timing》y −1.0；灰野獨奏稀疏乾盤 x 3.1、y ≤0.1。
- **主線汰 9**：Boris《Absolutego》（MB primary-type Single；EP／單曲不開例外，md21 Demdike 先例）；Jim O'Rourke《Sleep Like It's Winter》（池中同人 y −1.0）；Boris with Merzbow《Sun Baked Snow Cave》（後段噪音堆疊，x 貼邊）；Yoshi Wada《Lament…》（風笛高頻亮，y／x 貼邊）；畠山地平《Minima Moralia》（z 貼邊，md1 註記畠山偏暖）；Stian Westerhus《Pitch Black Star Spangled》（刺耳回授＝緊繃）；MONO《Pilgrimage of the Soul》（推進段多，x 貼邊）；MONO & world's end girlfriend《Palmless Prayer》（鋼琴旋律清楚，z 貼邊）；Biosphere／Deathprod《Stator》（Biosphere 成分池中判輕）。
- 上線前跨分支去重：origin 各 `claude/*` 分支卡單與本地 `desc-tools/batches/cards/` 0 撞。
- 研究層重點查：Corrupted／Funeral Moth／Skepticism 嘶吼是否讓人繃緊（參照 Khanate 判靜）；不失者《すでに用意されていた想い》有無爆裂段；MONO 三張漸強爆發占比；畠山三張色溫；Ø 兩張與 Biosphere／Deathprod《Nordheim Transformed》質地是否夠厚；Klara Lewis 有無反覆節拍；Supersilent《8》鼓擊段。

## 研究 c 組
- 18061　Supersilent《8》moodGuess 存疑：整張是該團最有鼓、最「搖滾」的一張（Aquarius 稱 most rock sounding）：前三首鼓擊明顯、〈8.3〉通鼓響亮、〈8.6〉有節拍與刺耳假聲、〈8.7〉噪音搖滾，只有〈8.4〉〈8.5〉〈8.8〉偏靜。按體感標準 x 預估 2.8–3.5，建議主線汰換或交評分決定。
- 18062　Supersilent《9》《12》moodGuess 不存疑：皆無鼓、無爆發（9 為三台 Hammond 風琴 drone；12 為合成器＋小號暗黑氛圍），符合頹靡。《9》廠牌頁（Henie Onstad 錄音）與維基（現場音樂會）說法不同，facts 以廠牌頁為主並並列。
- 18063　Stian Westerhus《Matriarch》：三篇樂評皆未描述刺耳回授；有失真嗡鳴（第 5 首）、弓拉狂亂（第 4 首）、尖叫般弦音（第 7 首）三處緊繃段，整體冷而偏靜。x 建議 2.3 左右（卡單 1.9 微樂觀），仍在邊距內，不汰換。
- 18064　Biosphere／Deathprod《Nordheim Transformed》：無來源直談質地厚度；從分工（Deathprod 四段、Biosphere 三段）與素材推論整體 y 約 0.8–1.1，為邊界卡，交評分定奪；無鼓、無噪音爆發。
- 18065　Deathprod 三張：《Occulting Disk》有 mxdwn 樂評（無鼓，合成器低頻＋靜電噪音層）；卡單「失真小提琴」查無來源未採用。《Sow Your Gold》為 Harry Partch 樂器的音響配樂，Partch 樂器偏敲擊撥弦，是否有清楚敲擊無評論，thin；《Let Me Be Forever Animal》是孟克美術館委託的四聲道作品之立體聲版，限量 300 張黑膠、無數位版，卡單「Tired Light／Fugue」查無來源未採用，thin，且試聽可能取得困難。
- 18066　raison d'être：原標題拼寫「Lonelienes」依 MB；有評者說這是最「明亮」的一張，z 可能比池中同人略暖。
- 推翻策展層：2 處（《Let Me Be Forever Animal》曲名、《Occulting Disk》小提琴）；moodGuess 存疑：1 張強（Supersilent《8》）、2 張輕（Westerhus、raison d'être）。

## 研究 d 組
- 18071　d 組九張（raison d'être 四、Svartsinn 三、Northaunt 二）專輯層級的聲音來源幾乎只有廠牌 Bandcamp 文案與標籤，無職業樂評；Stains／Daemonum／Svartsinn 兩張／Ominous Silence 標 thin，其餘 full。WebSearch 兩組合計 4 次已用盡（e 組用）。
- 18072　Svartsinn《Of Darkness and Re-Creation》發行日 Bandcamp 標 2003-12-01、MB 2003-05，取年份 2003；卡單「第二張」無來源，寫作勿寫序數。
- 18073　moodGuess 存疑（d 組）：Northaunt《The Ominous Silence》Discogs 明載 Ketil Søraker 全部吉他、聽眾稱「旋律性」，z 可能比 −1.5 暖；Svartsinn《Mørkets Variabler》有大提琴（Amund Ulvestad），色溫可能偏暖；《Elegies for the End》廠牌稱「較旋律化」且第二碟為他人混音。三張建議 z 往 −1.0 看。
- 18074　其餘 d 組（Stains、Mise en abyme、Alchymeia、Daemonum、Horizons）與無拍、冷的預估不衝突；Alchymeia 文案稱 drone「有時輕如羽毛」。推翻策展層 0 處。

## 研究 e 組
- 18081　Skepticism《Lead and Aether》：查無專輯層級樂評談嘶吼與鼓；Alloy 樂評（同團另一張）提到死亡／厄運式低吼與柔軟鼓棒，不寫進 facts。只憑 funeral doom 類型常態推斷極慢，無證據顯示繃緊，標 thin，建議留。
- 18082　Ø《Oleva》：Headphone Commute 明說「pounding minimal beats」「tight rhythmic components」，RA 稱「stripped-down beats」。與卡單「幾乎無拍」衝突，moodGuess 存疑（強），建議汰換或重評為偏躁。
- 18083　Ø《Konstellaatio》：RA 評語「sorrowful and hypnotic」、氛圍為主，較無節拍，y 厚度無來源，thin；維持，邊界卡交評分。Vainio 辭世屬發行後事件未入 facts。
- 18084　Klara Lewis《Ett》：廠牌文案列「repetition」，Forced Exposure 稱早期作品有 pulsing core，文案強調人性溫度與玩心、「譫妄到溫柔」；卡單「磁帶糊與低頻霧」查無。moodGuess 存疑（強），建議重評或汰換。《Too》：廠牌稱「blurred／jittered rhythms」「dour and aggressive elements」「pop like structures」，與卡單「無鼓、厚殘響」不符，moodGuess 存疑（強），優先汰換。
- 18085　Kammarheit《Thronal》：聽眾評「鐵與石、infra-bass、不落入 loop」，卡單「低頻循環」不確定，視為無拍重 drone。Atrium Carceri & Kammarheit《Colossus》：文案有 throbbing pulses／pulsating subs，無鼓組，但脈動是否繃緊不明，取邊緣值。
- 18086　Northaunt《Istid I–II》full；Northaunt & Svartsinn《The Borrowed World》thin（僅標籤與靈感來自《The Road》）。推翻策展層 0 處。
- moodGuess 存疑小結（e 組）：強 3 張（Ø《Oleva》、Klara Lewis《Ett》《Too》）；輕 1 張（Colossus 脈衝）。d 組輕 3 張（見 18073）。

## 研究 b 組
- 18051　不失者《すでに用意されていた想い》：MB／Discogs 一致（1998-06-24、單一曲目約 75 分、1998 年 2–4 月東京錄、不疊錄）；廠牌 J-Factory（Discogs 另列 Tokuma Japan Communications 為發行公司）。「有無爆裂段」查不到逐段評論（WebSearch 3 次僅得團級描述：英維「有時走向 Japanoise、多半幽魂沉思」），thin；moodGuess 存疑：x 2.4 有被爆音段推高風險，建議實聽。
- 18052　MONO《Walking Cloud…》：Albini 錄、Human Highway（日）／TRL（美）／Rykodisc（歐）；58:25 共 8 首，3 首 8 分鐘以上。樂評（Pitchfork／AllMusic／ProgArchives）皆擋，鼓推進感與旋律清楚度查無，thin；moodGuess 存疑：弱。
- 18053　MONO《Requiem for Hell》full：5 首約 46 分，標題曲 17:49；Drowned in Sound 稱吉他與弦樂「漂浮雲海」、高潮像 Mogwai。moodGuess 存疑：弱（旋律清楚往暖，z −1.0 可能偏冷，建議 −0.3～−0.7；x 2.5 貼邊）。
- 18054　MONO《Nowhere Now Here》full：Echoes and Dust 明寫標題曲「雷鳴般打擊與推進吉他」、鼓乾而近、有噪音；另有 Breathe 人聲、銅管、合成器。moodGuess 存疑：中（x 恐 2.6–2.9、z 恐偏暖 −0.3～−0.5），邊界卡，交評分。
- 18055　Yoshi Wada《Earth Horns…》：1974-02-24 Everson Museum 現場錄、2009 EM Records 三張 LP；四人吹管號角＋電子。維基稱 Wada 持續音「以大音量演奏」；音高／明暗無來源。thin；moodGuess 存疑：弱（高音壓可能是壓迫而非催眠；冷與低頻是推斷）。
- 18056　畠山地平《Requiem for Black Night and Earth Spiders》：單一電吉他音檔做成的三首（65 分），土蜘蛛典故；Bandcamp 標籤含 dream pop。色溫無樂評，thin；moodGuess 存疑：弱（md1 註記畠山偏暖）。
- 18057　畠山地平《Black Swallow》：數位專輯，8 首約 39 分，Warm Rain in June 三段占約 21%；頁面無描述，樂器未知。thin；moodGuess 存疑：中（z −0.9 傾向 −0.3～−0.6）。
- 18058　畠山地平 & Dirk Serries《Black Frost》full：廠牌文案「荒涼又美麗」北歐冷景、dark ambient 標籤；三張畠山中冷色證據最強，維持。
- 18059　Deathprod《Imaginary Songs…》：1996 dBUT 限量 500 編號；四短曲加 30:38 長曲；聲音只有英維 Audio Virus／磁帶延遲／特雷門等工具描述，低頻嗡鳴無來源，thin。
- 18060　小結：推翻策展層 0 處（年份、廠牌皆對）。moodGuess 存疑：不失者（爆裂）、MONO 三張（Nowhere 中、Requiem／WaCRS 弱）、Wada（弱）、畠山 Requiem／Black Swallow（z 偏暖）。WebSearch 用 3 次。

## 研究 a 組（條號 18041–18050）
- 18041：Funeral Moth《Funeral Moth》（2008）Discogs 登記為 EP、兩首共約 27 分鐘，樂團訪談稱 2014《Dense Fog》為首張專輯；推翻卡單「首作」。卡單身分仍成立（MB Album、WT009），建議鉤子與簡介寫成「兩首的小型出版」，不寫全長首作。
- 18042：Funeral Moth《Dense Fog》卡單「第二張」不成立（依訪談是首張專輯），文案避開序數。
- 18043：Corrupted《Garten der Unbewusstheit》curatorWhy「鋼琴」查無來源，署名只有原音／古典吉他，facts 改寫為原音與古典吉他。聲音層 thin。
- 18044：Corrupted《Pray for the Hollow Sun》查無任何樂評，聲音依樂團一貫路線推估；Discogs 大類含 Electronic。標 thin，moodGuess 存疑。
- 18045：Corrupted《Llenandose de gusanos》曲目結構維基（兩片各一首）與 MB／Spirit of Metal（第一片兩首＋第二片〈VIII - El Mundo〉73:54）衝突，採後者。第二片為氛圍、無鼓。
- 18046：Boris 兩張 moodGuess「無鼓」不精確：Dronevil 的 Evil 碟、fade 序章後段都有 Atsuo 的鼓，但稀疏且全器樂／大半器樂，仍判靜。fade 評者用「warming nostalgic」，z 建議略放暖（約 -0.8）。
- 18047：Corrupted／Funeral Moth 嘶吼：Corrupted Hevi 招牌為野獸般低吼（bestial roar），《El Mundo Frio》末段改沙啞低語；Funeral Moth 為粗啞低吼＋低語，Transience 評者提到短暫『驚恐尖叫』。皆低沉壓迫、非尖銳，照 Khanate 先例判靜；Transience 略有起伏。
- 18048：Sputnik Music、Concrete Web、Pitchfork 本次抓取失敗（503／521／被擋），相關評語改由搜尋摘要與維基轉引，已於各卡 notes 註明。

## 主線研究後汰換（不佔條號；2026-10-23）
- **汰 9 張**：Supersilent《8》（研究 c：全團最有鼓、最搖滾的一張，前三首鼓擊明顯、〈8.7〉噪音搖滾，x 恐 2.8–3.5）；Ø《Oleva》（研究 e：樂評寫 pounding minimal beats、tight rhythmic components）；Klara Lewis《Ett》《Too》（研究 e：兩張都有反覆／抖動節拍，《Too》廠牌自述 aggressive、pop 結構）；MONO《Nowhere Now Here》（研究 b：雷鳴打擊、推進吉他、刺耳噪音，旋律清楚往暖）；MONO《Requiem for Hell》（研究 b：漸強長曲、吉他弦樂旋律清楚，z 恐 −0.3～−0.7、x 貼邊）；畠山地平《Black Swallow》（研究 b：無聲音描述，三段〈Warm Rain in June〉，z 恐 −0.3～−0.6）；Funeral Moth《Funeral Moth》（研究 a：Discogs 登記 EP、兩首約 27 分鐘，樂團自述《Dense Fog》才是首張專輯——EP 不開例外）；Corrupted《Pray for the Hollow Sun》（研究 a：2024 自行數位發行的單曲、無任何聲音資料，Discogs 大類標 Electronic）。
- 留：Boris《fade》（評者寫溫暖懷舊，z 估 −0.8 仍過邊距）、Westerhus《The Matriarch》（x 估 2.3）、Biosphere／Deathprod《Nordheim Transformed》（y 邊界交評分）、Ø《Konstellaatio》（氛圍為主、少節拍）、Skepticism（funeral doom 極慢，Khanate 先例）、Yoshi Wada《Earth Horns》（大音量持續音＝壓人，Sunn O))) 先例判靜）。
- 研究層推翻策展層照研究稿：Funeral Moth《Dense Fog》不寫序數；Corrupted《Garten》無鋼琴；Svartsinn《Of Darkness》不寫「第二張」。
- **定案 36 張**（a 7、b 6、c 8、d 9、e 6）。研究稿同步移除，`qa-batch research` 通過。md19 0 張、md20 撐起一半以上；md18 主場景日本暗色已挖到底（灰野獨奏、downy 系都不合格），不再派。
