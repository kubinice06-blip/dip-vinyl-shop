# 情緒薄格策展線・場景佇列（2026-10-22 擴大版）

店主 2026-10-22：「新增的專輯數太少了 與雀躍嚴重不平衡」→ 三格**各補到約 2,000**、一批 45 張、**6 個工作階段並行**。
起點（md1–md4 上線後）：頹靡 1,119、冷冽 874、恍惚 784；雀躍 5,962。md1–md4 落格率 91–98%（moodGuess 留邊距篩得很準），所以**每批淨增約 40 張**。
缺口：頹靡 +881（約 22 批）、冷冽 +1,126（約 30 批）、恍惚 +1,216（約 30 批）——合計約 80 批。

**怎麼用這張表**：主線（調度的工作階段）每輪開 6 個子工作階段、每個指派 2 個批號；子工作階段只做被指派的批，不自己往下拿。
**一個場景候選不夠 45 張**（md4 先例），就收到夠格為止、照實上架（不湊數），在 rulings 寫明，剩下的名額留給後面的批。
**條號**：每批 80 條，照表；同批內：研究 a–e 各 10、鉤子 10、寫作 10、主線 10。
**評分目錄**：`batch-progress/mood-axes/score-<批>/`（如 `score-mc3/`），`build-priors.mjs` 會自動讀所有 `score*/scored-*.json`，不用改它。

## 第 2 輪起的調整（2026-10-22 店主選「收窄到大場景、降低並行」）

**第 1 輪實測**：冷冽 mc1–mc4 只上架 22／15／19／19（落格 17／8／16／9），恍惚 ml3／ml4 上架 27／11——**小眾場景挖不到 45 張**，而每個子工作階段約花 40–55 美元額度，且本週額度已出現接近上限的警告。頹靡 md 線產量正常（每批 43–45、落格九成以上）。
**新規矩**：
1. **並行降到 3 個**（每個 2 批）；本週額度重置後再視情況加。
2. **只派下面的優先序**；其他列（小眾場景）暫停，不派。
3. **一批可以合併相鄰的大場景湊滿 45 張**：指派時寫「主場景＋可擴寫場景」，策展代理先挖主場景，不夠再往擴寫場景補，仍要過 moodGuess 邊距。
4. 冷冽線教訓（2026-10-23 改依體感標準）：**旋律清楚的 synth-pop／new wave／techno-pop 落雀躍**（mc9、mc5 落格偏低的原因）；**緊繃、尖細、旋律不明的**自由爵士小編制、無調現代古典、glitch 才是冷冽大宗——安靜但緊繃也算躁，不必有鼓。厚、密、低沉的仍落亢奮。

**優先序**（2026-10-23 依店主「體感標準」改排 21–31，再補 32–35 恍惚大池（恍惚每批只挖到 11–17 張，最薄）；冷冽改走自由爵士／現代古典／glitch 等「緊繃、尖細、旋律不明」的大池，拿掉旋律清楚的 synth-pop；由上往下派；頹靡已穩定，冷冽與恍惚往大池子集中）：

| 順位 | 批 | 主場景＋可擴寫場景 | 狀態 |
|---:|---|---|---|
| 1 | md9 | 冷的 trip-hop／Bristol 二線 ＋ md17 暗 R&B | ✅ 上線 23／落格 23 |
| 2 | mc9 | 80s synth-pop 二線 ＋ mc10 new wave 冷盤 ＋ mc20 港台日 80s synth-pop | ✅ 上線 12／落格 9 |
| 3 | ml5 | neo-soul 二線 ＋ ml8 alt R&B 2010s–20s | ✅ 上線 38／落格 35 |
| 4 | mc6 | Detroit techno／electro 二線 ＋ mc12 electroclash ＋ mc29 electro-funk 機械那半 | ✅ 上線 44／落格 43 |
| 5 | ml6 | quiet storm／slow jam ＋ ml7 70s 慢板靈魂弦樂盤 | ✅ 上線 40／落格 38 |
| 6 | md10 | 冷的 shoegaze／drone pop ＋ md25 冷的 ambient／art pop 慢盤 | ✅ 上線 40／落格 39 |
| 7 | mc5 | 日本 techno-pop ＋ mc17 日本 techno ＋ mc25 J-pop／K-pop 冷系 | ✅ 上線 16／落格 11 |
| 8 | ml9 | 暖 dub／roots dub 二線 ＋ ml25 80s 慢板 reggae 歌 | ✅ 上線 33／落格 33 |
| 9 | mc7 | minimal techno 快而薄 ＋ mc8 IDM 快而乾 | ✅ 上線 31／落格 25 |
| 10 | ml15 | 暖 trip-hop／downtempo ＋ ml23 ambient dub／ambient house 暖盤 | ✅ 上線 28／落格 28 |
| 11 | md16 | cloud rap／sad rap 冷盤 ＋ md24 嘻哈 instrumental 冷盤 | ✅ 上線 38／落格 37 |
| 12 | ml16 | jazz-rap／boom bap 暖盤 ＋ ml17 G-funk 慢盤 ＋ ml18 chopped & screwed | ✅ 上線 27／落格 25 |
| 13 | mc11 | krautrock motorik 快盤 ＋ mc16 Italo／space disco 冷盤 ＋ mc27 70s 前衛電子快作 | ✅ 上線 16／落格 14 |
| 14 | ml11 | chillwave／hypnagogic ＋ ml12 bedroom／dream pop 濕的那一路 | ✅ 上線 26／落格 23 |
| 15 | md14 | 暗色電影／遊戲配樂 ＋ md13 現代古典暗黑音塊 | ✅ 上線 42／落格 19 |
| 16 | ml19 | city pop／AOR 濕的慢歌 ＋ ml28 70s soft rock 慢而濕 | ✅ 上線 10／落格 8 |
| 17 | mc26 | synthwave 冷而薄 ＋ mc19 東歐／蘇聯 synth | ✅ 上線 14／落格 14 |
| 18 | md11 | 工業 old-school 慢盤／ritual ＋ md12 neoclassical darkwave | ✅ 上線 40／落格 37 |
| 19 | ml10 | psychedelic soul／cosmic soul ＋ ml14 spiritual jazz 慢而厚 | ✅ 上線 19／落格 16 |
| 20 | mc15 | 法比冷浪潮／new beat、EBM 輕的那半 ＋ mc24 drum & bass 冷而薄 ＋ mc18 footwork／juke 冷盤 | ✅ 上線 19／落格 18 |
| 21 | ml20 | 台灣／華語 R&B 與 neo-soul ＋ ml21 韓國 R&B／indie 恍惚 ＋ ml29 華語／日本 dream pop 二線 | ✅ 上線 17／落格 17 |
| 22 | mc31 | AACM／loft jazz／美國自由爵士小編制二線 ＋ mc14 前衛 hard bop 尖而無調的那半 | ✅ 上線 33／落格 33 |
| 23 | ml24 | 暖的 dream folk／slowcore ＋ ml30 暖 ambient／new age 厚墊（旋律要清楚） | ✅ 上線 11／落格 11 |
| 24 | md21 | goth rock／coldwave 慢盤二線 ＋ md15 witch house／hauntology | ✅ 上線 34／落格 33 |
| 25 | mc32 | 無調現代古典／序列主義／新複雜主義（室內樂、獨奏，尖細的） ＋ mc4 續集 | ✅ 上線 31／落格 29 |
| 26 | ml13 | 暖而慢的迷幻搖滾（不兇的 desert／stoner 慢盤） ＋ ml26 非洲與巴西的慢而厚 | ✅ 上線 12／落格 11 |
| 27 | md18 | 日本暗色 drone／ambient／暗色獨立 ＋ md20 北歐暗色電子與配樂 ＋ md19 華語／韓國暗色獨立 || 派→情緒薄格 ml31、md18（第 6 輪） |
| 28 | mc28 | 歐陸自由即興（ICP、Globe Unity、Misha Mengelberg、Irène Schweizer） ＋ mc34 日本前衛即興 || 派→情緒薄格 ml32、mc28（第 6 輪） |
| 29 | mc33 | glitch／microsound／尖細實驗電子 ＋ mc35 RIO／前衛搖滾尖細那半 || 派→情緒薄格 ml34、mc33（第 6 輪） |
| 30 | md22 | 無鼓 drone metal／post-metal ambient 二線 ＋ md23 暗黑 lo-fi／tape loops |  |
| 31 | mc22 | 當代前衛爵士（Tim Berne、Steve Lehman、Mary Halvorson、Craig Taborn、Tyshawn Sorey） ＋ mc31 剩餘 |  |
| 32 | ml31 | 爵士弦樂抒情盤／慢板 ballad ＋ ml33 福音慢板／靈魂聖詩 | 派→情緒薄格 ml31、md18（第 6 輪） |
| 33 | ml32 | 拉丁 bolero／慢板浪漫 ＋ ml25 80s 慢板 reggae 歌 | 派→情緒薄格 ml32、mc28（第 6 輪） |
| 34 | ml34 | 華語／日語／韓語抒情 ballad 厚編曲 ＋ ml36 Balearic／ambient pop 暖盤 | 派→情緒薄格 ml34、mc33（第 6 輪） |
| 35 | ml35 | alt-country／Americana 濕而慢 ＋ ml33 剩餘 |  |

**暫停**：mc13 math rock、mc21 post-punk revival、mc30 minimalism（旋律清楚＝暖）、mc9／mc10／mc20／mc25／mc26 系的 synth-pop／new wave／K-pop／synthwave 續集（2026-10-23 體感標準：旋律清楚往暖，落雀躍）、mc23 art pop、ml4 系東亞續集、ml14 spiritual jazz（體感標準判冷，不是恍惚）、ml22、ml27。**重開**（體感標準下會落冷冽）：mc4、mc14、mc22、mc28。

狀態欄：空白＝待派；`派→<工作階段標題>`；`✅ 上線 N／落格 M`。

## 頹靡 md（靜＋重＋冷；門檻 x ≤ 2.7、y ≥ +0.8、z ≤ −0.3）

| 批 | 條號 | 場景（方向，不是名單；逐一查池、查同一人） | 狀態 |
|---|---|---|---|
| md1 | 10681 | dark ambient／isolationist／drone／工業 drone | ✅ 45／43 |
| md2 | 10761 | slowcore／sadcore 二線＋dark jazz | ✅ 45／41 |
| md3 | 10841 | darkwave／goth 慢盤＋無鼓 drone metal／funeral doom | ✅ 45／44 |
| md4 | 10921 | 暗色嘻哈／cloud rap／暗 R&B＋dub techno＋亞洲 | ✅ 43／39 |
| md5 | 17001 | dark ambient 二線：Cryo Chamber、Cold Meat Industry、Malignant、Glacial Movements、Ant-Zen 系 | ✅ 上線 45／落格 45 |
| md6 | 17081 | drone／電子極簡：Kranky、Touch、12k、Room40、Type、Miasmah 系（要有低頻與顆粒） | ✅ 上線 45／落格 43 |
| md7 | 17161 | 冷調 post-rock／慢而冷、鼓少的器樂（Constellation、Kranky、Temporary Residence 系的慢盤） | ✅ 上線 41／落格 35 |
| md8 | 17241 | dub techno／ambient techno 三線：Echocord、Chain Reaction、Silent Season、Prologue、Styrax、Astral Industries | ✅ 上線 41／落格 40 |
| md9 | 17321 | 冷的 trip-hop 與 Bristol 二線（陰、慢、低頻厚；溫暖的 lounge 系落恍惚，不收） | ✅ 上線 23／落格 23（併 md17 暗 R&B；候補見底） |
| md10 | 17401 | 冷的 shoegaze／drone pop（霧＋冷：Jesu ambient 盤、Grouper、Flying Saucer Attack 系、Windy & Carl 系） | ✅ 上線 40／落格 39（併 md25；研究汰 7、補 2） |
| md11 | 17481 | 工業 old-school 慢盤／ritual／tape music（SPK 慢盤、Organum、Current 93 drone 期、Zoviet France 系） | ✅ 上線 40／落格 37（併 md12；策展 54、主線汰 9、研究汰 5；體感標準下 Organum 早期兩張與 Menche 噪牆判躁） |
| md12 | 17561 | neoclassical darkwave／ethereal 慢盤（Arcana、Ataraxia、Dead Can Dance 系、Projekt 廠牌） | 併入 md11（Elend、DVKE、sToa、Dargaard、Arcana 已收；明亮中世紀判輕，不再單獨派） |
| md13 | 17641 | 現代古典的暗黑音塊／drone 古典（Scelsi、Penderecki 慢作、Hildur Guðnadóttir、Jóhannsson 暗盤；純淨極簡落平靜不收） | 部分併入 md14（Thorvaldsdottir ×4、Scelsi 落頹靡；Sólaris 判輕；Ligeti Atmosphères 已在池）。體感標準下只收催眠式音塊，張力型落冷冽／暴躁 |
| md14 | 17721 | 暗色電影／遊戲配樂（Silent Hill、《Annihilation》、《Under the Skin》、《Sicario》、Badalamenti 系、恐怖片原聲） | ✅ 上線 42／落格 19（併 md13 6 張；體感標準下恐怖驚嚇型 22 張落暴躁；下一批只收 dark ambient／drone 型配樂） |
| md15 | 17801 | witch house／hauntology／暗電子（Salem 系、Raime、Ghost Box 冷盤、Demdike 系二線） | 併入 md21（2026-10-23） |
| md16 | 17881 | cloud rap／sad rap／慢 drill 的冷盤（不兇的；兇＋拍落亢奮） | ✅ 上線 38／落格 37（併 md24；策展 53、主線汰 3、研究汰 12；慢 drill 0） |
| md17 | 17961 | 暗 R&B／PBR&B 二線（冷而霧；溫的落恍惚） | 併入 md9（池中核心已收，剩下多偏暖） |
| md18 | 18041 | 日本暗色：drone／noise 靜盤／暗 ambient／暗色獨立（灰野敬二 drone 期、畠山地平冷盤、downy 系） | |
| md19 | 18121 | 華語／韓國暗色獨立與實驗（落差草原系、Mong Tong 系、韓國 post-rock 冷盤） | |
| md20 | 18201 | 北歐暗色電子與配樂（Biosphere 冷盤、Deathprod 系、Rune Grammofon 慢盤） | |
| md21 | 18281 | goth rock／coldwave 慢盤二線（會跳舞的快歌落冷冽或亢奮，不收） | ✅ 上線 34／落格 33（2026-10-23，併 md15） |
| md22 | 18361 | 無鼓 drone metal／post-metal ambient 二線 | |
| md23 | 18441 | 暗黑 lo-fi／tape loops／Basinski 系 | |
| md24 | 18521 | 嘻哈 instrumental 冷盤（暗色 beat tape、冷的 abstract hip-hop） | 併入 md16（Sixtoo、Odd Nosdam、BSBD、Req、DJ Krush 已收；不再單獨派） |
| md25 | 18601 | 冷的 ambient pop／art pop 慢盤（Julia Holter 冷盤、Jenny Hval 慢盤、Kate Bush 以外的暗 art pop） | 併入 md10（池中冷 art pop 多判輕，只收到 6 張） |

## 冷冽 mc（躁＋輕＋冷；門檻 x ≥ 3.3、y ≤ +0.2、z ≤ −0.3）

聲音：**快或密、但製作乾淨薄透、沒有人味的冷**。厚重 techno、失真牆、會「兇」的落亢奮；溫暖律動（funk、disco、多數 bop）落雀躍——z 要真的冷（金屬、機械、都市夜、疏離）。

| 批 | 條號 | 場景 | 狀態 |
|---|---|---|---|
| mc1 | 11001 | minimal synth／coldwave／minimal wave | ✅ 上線 22／落格 17（策展 47、研究後汰 17；中速 x 偏低、帶吉他判重） |
| mc2 | 11081 | post-punk／no wave／funk-punk（乾、尖、不厚） | ✅ 上線 15／落格 8（53%：7 張判重落亢奮；吉他樂團場景產出低，mc21 建議改場景） |
| mc3 | 11161 | 冷爵士：Tristano 派、60s 前衛 Blue Note 二線、歐陸自由即興裡快而乾的 | ✅ 上線 19／落格 16（場景挖不到 45；鋼琴主導無強鼓的落平靜） |
| mc4 | 11241 | 當代古典快而冷（Ligeti、Xenakis、Varèse、Boulez、Stockhausen、Lutosławski 的快作） | ✅ 上線 19／落格 9（47%：無拍點的點描／複節奏作品照新能量規則落平靜；只收機械脈動或打擊推進的） |
| mc5 | 11321 | 日本 techno-pop／synth-pop（YMO 系、P-Model、Hikashu、capsule、Perfume 系、tofubeats 冷盤） | ✅ 上線 16／落格 11（併 mc17、mc25；策展 65、主線汰 30、研究汰 19：二線多是樂團編制或暖；glitch 判靜 4） |
| mc6 | 11401 | Detroit techno／electro 二線（Drexciya 系、Aux 88、DJ Stingray、Model 500、Dopplereffekt） | ✅ 上線 44／落格 43 |
| mc7 | 11481 | minimal techno 快而薄（Robert Hood、Jeff Mills 的 minimal、Monolake 快盤；厚的落亢奮） | ✅ 上線 31／落格 25（併 mc8；策展 49、主線汰 4、研究汰 14；柔和 minimal house 判靜 3、硬派／glitch 判重 3） |
| mc8 | 11561 | IDM 快而乾（早期 Autechre、Plaid、Funkstörung、Arovane、Phoenecia） | 併入 mc7（池中 Plaid 判暖、Arovane 判靜、Autechre 判重；Phoenecia 研究判 dub 化汰；不再單獨派） |
| mc9 | 11641 | 80s synth-pop 二線（OMD、Visage、Ultravox、Heaven 17、Yazoo、Telex、Blancmange、Thomas Dolby） | ✅ 上線 12／落格 9（併 mc10、mc20；二線多是樂團編制，研究汰 13） |
| mc10 | 11721 | new wave 冷盤（Gary Numan、Japan、Simple Minds 早期、Magazine、Wire、The Associates） | 併入 mc9（吉他樂團判重，不再單獨派） |
| mc11 | 11801 | krautrock motorik／kosmische 快盤（Neu! 以外的 La Düsseldorf、Harmonia、Kraftwerk 系二線） | ✅ 上線 16／落格 14（併 mc16、mc27；策展 61、主線汰 26、研究汰 19：krautrock 判暖／靜、Italo 單曲多、法義電子多真鼓樂團） |
| mc12 | 11881 | electroclash／2000s electro（Miss Kittin、Ladytron、Fischerspooner、Adult.、Chicks on Speed、Client） | |
| mc13 | 11961 | math rock／器樂後硬核的冷盤（Don Caballero、早期 Battles、Hella、乾淨的那一路） | |
| mc14 | 12041 | 60s 前衛 hard bop／post-bop 快而冷（Andrew Hill、Eric Dolphy、Booker Little、Jackie McLean 前衛期） | 併入 mc31（頭牌已在池，收 1） |
| mc15 | 12121 | 法比冷浪潮與 new beat、EBM 輕的那半（Front 242 早期以外的冷而不重） | ✅ 上線 19／落格 18（併 mc24、mc18；策展 28、主線汰 1、研究汰 8；dnb／footwork 0，改收冷快電子 Lázár／Fell） |
| mc16 | 12201 | Italo／space disco 冷盤（Moroder 柏林期、Kano、Klein & MBO、Doctor's Cat；溫的 disco 落雀躍） | 併入 mc11（Laserdance、Proxyon、Hipnosis 已收；人聲 Italo 判暖，不再單獨派） |
| mc17 | 12281 | 日本 techno（Ken Ishii、Fumiya Tanaka、Susumu Yokota 快盤、電気グルーヴ 冷盤） | 併入 mc5（田中フミヤ、石野卓球、Flare 已收；不再單獨派） |
| mc18 | 12361 | footwork／juke／冷的快節奏電子（RP Boo、Jlin、Traxman 冷盤） | 併入 mc15（footwork 池中判重或判暖 0 張；冷快電子 Lázár 系已收；不再單獨派） |
| mc19 | 12441 | 東歐／蘇聯 synth 與冷電子（Zodiac、Edward Artemiev 快作、Space Bulgaria 系） | 部分併入 mc26（Технология、Bonanza Banzai 已收；Zodiac 系判暖、樂團編制多，剩餘留給 mc23 擴寫） |
| mc20 | 12521 | 港台日 80s synth-pop／new wave 冷盤（達明一派、高橋幸宏、立花ハジメ、Plastics） | 併入 mc9（P-Model、ヒカシュー 研究判樂團編制汰；不再單獨派） |
| mc21 | 12601 | post-punk revival 薄而冷（Ought、Protomartyr 薄盤、Yard Act、Bodega、English Teacher 系；厚牆落亢奮） | |
| mc22 | 12681 | 當代爵士冷而快（Polar Bear、Phronesis 快盤、Kit Downes、Craig Taborn、Steve Lehman、Tyshawn Sorey 快盤） | |
| mc23 | 12761 | 前衛 art pop／冷的實驗流行（Laurie Anderson、Holger Czukay、坂本龍一 techno 期、Art of Noise） | |
| mc24 | 12841 | drum & bass 冷而薄（Photek、Source Direct 薄盤、minimal dnb；techstep 厚落亢奮） | 併入 mc15（池中 dnb 幾乎全判重，0 張；不再單獨派） |
| mc25 | 12921 | K-pop／J-pop 冷系（aespa、f(x)、相対性理論、水曜日のカンパネラ 冷盤） | 併入 mc5（甜／可愛人聲判暖，挖不到；不再單獨派） |
| mc26 | 13001 | synthwave 冷而薄（不是 darksynth 厚牆） | ✅ 上線 14／落格 14（併 mc19；策展 36、研究汰 20；dreamwave 判暖、darksynth 判重） |
| mc27 | 13081 | 70s 前衛電子快作（Tangerine Dream 編曲快盤、Jean-Michel Jarre 冷盤、Isao Tomita 快作） | 併入 mc11（TD 兩張評分出格、Schulze 研究判靜；不再單獨派） |
| mc28 | 13161 | 歐陸自由即興快而乾（ICP Orchestra、Globe Unity、Misha Mengelberg、Irène Schweizer） | |
| mc29 | 13241 | 冷的 new jack／electro-funk 機械那半（Mantronix、Cybotron、Hashim 系） | |
| mc30 | 13321 | minimalism 快作（Glass 早期、Reich 冷的那幾張、Michael Nyman 快盤、Terry Riley 電子快盤；暖的落雀躍） | |
| mc31 | 13401 | AACM／loft jazz／美國自由爵士小編制二線（Art Ensemble of Chicago、Anthony Braxton、Roscoe Mitchell、Henry Threadgill、Julius Hemphill、Oliver Lake） | ✅ 上線 33／落格 33（併 mc14） |
| mc32 | 13481 | 無調現代古典／序列主義／新複雜主義（Boulez、Berio、Stockhausen、Carter、Ferneyhough、Xenakis 室內樂；尖細的，厚重音塊落亢奮） | ✅ 上線 31／落格 29 |
| mc33 | 13561 | glitch／microsound／尖細實驗電子（Oval、Ryoji Ikeda、Alva Noto、Mille Plateaux、raster-noton 薄盤） | |
| mc34 | 13641 | 日本前衛／即興（高柳昌行、阿部薫、大友良英、Sachiko M、ONJO） | |
| mc35 | 13721 | RIO／前衛搖滾尖細那半（Henry Cow、Art Bears、Etron Fou Leloublan、Thinking Plague、Univers Zero 薄盤） | |

## 恍惚 ml（靜＋重＋暖；門檻 x ≤ 2.7、y ≥ +0.8、z ≥ +0.3）

2026-10-22 質地尺改判後：**暖慢的包覆感算重**（dream pop 殘響霧、夢幻吉他與合成器墊、慢板靈魂厚低頻與弦樂、chillwave 糊濾波），落恍惚的範圍比以前大很多。乾淨、有空氣的仍落放鬆，不收。

| 批 | 條號 | 場景 | 狀態 |
|---|---|---|---|
| ml1 | 14001 | lovers rock＋80s rub-a-dub＋roots 二線 | ✅ 上線 35／落格 34 |
| ml2 | 14081 | 暖 shoegaze／dream pop／新迷幻 | ✅ 上線 39／落格 33 |
| ml3 | 14161 | beats／lo-fi hip-hop／dusty 地下饒舌 | ✅ 上線 27／落格 26（場景挖不到 45） |
| ml4 | 14241 | 東亞恍惚：台日韓 dream pop／shoegaze／lo-fi R&B | ✅ 上線 11／落格 11（核心已在池、色溫多貼邊，挖不到 45） |
| ml5 | 14321 | neo-soul 二線（Soulquarians 周邊、UK neo-soul：Omar、Lewis Taylor 一類） | ✅ 上線 38／落格 35 |
| ml6 | 14401 | quiet storm／slow jam 80s–90s 二線 | ✅ 上線 40／落格 38（併 ml7；研究汰 5） |
| ml7 | 14481 | 70s 慢板靈魂：Philly／Chicago／Memphis 弦樂慢盤二線 | 併入 ml6（Barry White 系、Philly 二線已收） |
| ml8 | 14561 | alt R&B 2010s–20s（霧而暖） | |
| ml9 | 14641 | 暖 dub／roots dub 二線（dt1 之外） | ✅ 上線 33／落格 33（併 ml25；策展 71、主線汰 20、研究汰 18） |
| ml10 | 14721 | psychedelic soul／cosmic soul（Shuggie Otis、Terry Callier 一類） | ✅ 上線 19／落格 16（併 ml14；策展 32、主線汰 3、研究汰 10；古典 psych soul 與 spiritual jazz 池中判輕，主力改當代 cosmic soul） |
| ml11 | 14801 | chillwave／hypnagogic pop（Toro y Moi、Washed Out、Neon Indian、Small Black） | ✅ 上線 26／落格 23（併 ml12；策展 54、主線汰 16、研究汰 11、EP 汰 1；出格 3 張色溫判冷） |
| ml12 | 14881 | bedroom pop／dream pop 2010s–20s 濕的那一路 | 併入 ml11（Papercuts、Vansire、Men I Trust 早期已收；多判躁或輕，不再單獨派） |
| ml13 | 14961 | 暖而慢的迷幻搖滾（Kikagaku Moyo 系、不兇的 desert／stoner 慢盤） | ✅ 上線 12／落格 11（ml26 併入；暖慢迷幻見底，不再派） |
| ml14 | 15041 | spiritual jazz 慢而厚（Pharoah 慢盤、Alice Coltrane、Lonnie Liston Smith） | 併入 ml10（池中 spiritual jazz 多判輕；10-23 新色溫規則下旋律不明往冷，收的 2 張落頹靡；恍惚線不再派） |
| ml15 | 15121 | 暖 trip-hop／downtempo（Morcheeba、Thievery Corporation、Nightmares on Wax 的厚盤） | ✅ 上線 28／落格 28（併 ml23；策展 38、主線汰 3、研究汰 7；核心已在池、lounge 判輕） |
| ml16 | 15201 | jazz-rap／boom bap 暖盤（Pete Rock、Digable Planets 系） | ✅ 上線 27／落格 25（併 ml17、ml18；策展 38、研究汰 11；G-funk 0） |
| ml17 | 15281 | G-funk／西岸慢盤（低頻厚、慢、暖） | 併入 ml16（池中 G-funk 判躁或判輕，挖不到；不再單獨派） |
| ml18 | 15361 | Houston chopped & screwed／南方慢饒舌（DJ Screw、UGK 慢盤） | 併入 ml16（Big Moe、E.S.G.、MJG、Devin 已收；screwed 版 MB 屬 Remix 不收） |
| ml19 | 15441 | city pop／AOR 濕的慢歌（新尺下會判重的那些） | ✅ 上線 10／落格 8（併 ml28；策展 20、研究汰 9、審稿汰 1；經典 city pop／AOR 全判輕，場景見底） |
| ml20 | 15521 | 台灣／華語 R&B 與 neo-soul | ✅ 上線 17／落格 17（併 ml21、ml29） |
| ml21 | 15601 | 韓國 R&B／indie 恍惚（Colde、Zion.T、offonoff 一類） | 併入 ml20 |
| ml22 | 15681 | 日本 neo-soul／R&B（Mabanua、Ovall、SIRUP、Kan Sano、iri） | |
| ml23 | 15761 | ambient dub／ambient house 暖盤（The Orb、Global Communication、Higher Intelligence Agency） | 併入 ml15（指名藝人池中判輕或判冷，改收暖 world／psy-dub；不再單獨派） |
| ml24 | 15841 | 暖的 dream folk／slowcore（殘響厚、溫） | ✅ 上線 11／落格 11（2026-10-23，併 ml30；場景見底，不再派） |
| ml25 | 15921 | 80s 慢板 dancehall／reggae 歌（lovers 之外） | 併入 ml9（Junjo／Channel One 類比濕混音人聲盤；不再單獨派） |
| ml26 | 16001 | 非洲與巴西的慢而厚（MPB 濕的盤、desert blues 慢盤、afro-soul 慢盤） | 併入 ml13（desert blues／MPB 池中判輕，挖不到；不再派） |
| ml27 | 16081 | 暖的 vaporwave 之外的 sample-based ambient pop | |
| ml28 | 16161 | 70s soft rock／yacht 慢而濕的（新尺下會判重的） | 併入 ml19（池中 70s soft rock 全判輕，只收得到復興盤；不再單獨派） |
| ml29 | 16241 | 華語／日本 dream pop 二線 | 併入 ml20 |
| ml30 | 16321 | 暖 ambient／new age 厚墊（溫而霧，不是空氣感的極簡） | 併入 ml24（2026-10-23；有旋律的 new age 池中全判輕，不再派） |
| ml31 | 16401 | 爵士弦樂抒情盤／慢板 ballad（with strings 系：Clifford Brown with Strings、Ben Webster、Johnny Hartman、Chet Baker 弦樂盤） | |
| ml32 | 16481 | 拉丁 bolero／慢板浪漫（Los Panchos、Luis Miguel《Romance》、Omara Portuondo 慢盤、bossa 以外的厚弦樂盤） | |
| ml33 | 16561 | 福音慢板／靈魂聖詩（厚合唱、溫、慢；快板 shout 落雀躍） | |
| ml34 | 16641 | 華語／日語／韓語抒情 ballad 厚編曲（90s 弦樂、殘響厚、旋律清楚的慢歌盤） | |
| ml35 | 16721 | alt-country／Americana 濕而慢（Cowboy Junkies、Lambchop、Mazzy Star 系） | |
| ml36 | 16801 | Balearic／ambient pop 暖盤（溫而霧、旋律清楚） | |
