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
4. 冷冽線教訓：**帶吉他的樂團、中速 synth 常判重落亢奮；無拍點的古典判靜落平靜**——只收「快、薄、乾、有機械脈動或明確節拍」的。

**優先序**（由上往下派；頹靡已穩定，冷冽與恍惚往大池子集中）：

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
| 9 | mc7 | minimal techno 快而薄 ＋ mc8 IDM 快而乾 || 派→情緒薄格 mc7、ml15（第 3 輪） |
| 10 | ml15 | 暖 trip-hop／downtempo ＋ ml23 ambient dub／ambient house 暖盤 || 派→情緒薄格 mc7、ml15（第 3 輪） |
| 11 | md16 | cloud rap／sad rap 冷盤 ＋ md24 嘻哈 instrumental 冷盤 || 派→情緒薄格 md16、ml16（第 3 輪） |
| 12 | ml16 | jazz-rap／boom bap 暖盤 ＋ ml17 G-funk 慢盤 ＋ ml18 chopped & screwed || 派→情緒薄格 md16、ml16（第 3 輪） |
| 13 | mc11 | krautrock motorik 快盤 ＋ mc16 Italo／space disco 冷盤 ＋ mc27 70s 前衛電子快作 || 派→情緒薄格 mc11、ml11（第 3 輪） |
| 14 | ml11 | chillwave／hypnagogic ＋ ml12 bedroom／dream pop 濕的那一路 || 派→情緒薄格 mc11、ml11（第 3 輪） |
| 15 | md14 | 暗色電影／遊戲配樂 ＋ md13 現代古典暗黑音塊 |  |
| 16 | ml19 | city pop／AOR 濕的慢歌 ＋ ml28 70s soft rock 慢而濕 |  |
| 17 | mc26 | synthwave 冷而薄 ＋ mc19 東歐／蘇聯 synth |  |
| 18 | md11 | 工業 old-school 慢盤／ritual ＋ md12 neoclassical darkwave |  |

**暫停**（第 1 輪證實產量低，或池子太小）：mc13 math rock、mc14 前衛 hard bop、mc21 post-punk revival、mc22 當代爵士、mc28 歐陸自由即興、mc30 minimalism、mc4 系古典快作續集、ml4 系東亞續集、ml13、ml22、ml26、ml27。

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
| md11 | 17481 | 工業 old-school 慢盤／ritual／tape music（SPK 慢盤、Organum、Current 93 drone 期、Zoviet France 系） | |
| md12 | 17561 | neoclassical darkwave／ethereal 慢盤（Arcana、Ataraxia、Dead Can Dance 系、Projekt 廠牌） | |
| md13 | 17641 | 現代古典的暗黑音塊／drone 古典（Scelsi、Penderecki 慢作、Hildur Guðnadóttir、Jóhannsson 暗盤；純淨極簡落平靜不收） | |
| md14 | 17721 | 暗色電影／遊戲配樂（Silent Hill、《Annihilation》、《Under the Skin》、《Sicario》、Badalamenti 系、恐怖片原聲） | |
| md15 | 17801 | witch house／hauntology／暗電子（Salem 系、Raime、Ghost Box 冷盤、Demdike 系二線） | |
| md16 | 17881 | cloud rap／sad rap／慢 drill 的冷盤（不兇的；兇＋拍落亢奮） | |
| md17 | 17961 | 暗 R&B／PBR&B 二線（冷而霧；溫的落恍惚） | 併入 md9（池中核心已收，剩下多偏暖） |
| md18 | 18041 | 日本暗色：drone／noise 靜盤／暗 ambient／暗色獨立（灰野敬二 drone 期、畠山地平冷盤、downy 系） | |
| md19 | 18121 | 華語／韓國暗色獨立與實驗（落差草原系、Mong Tong 系、韓國 post-rock 冷盤） | |
| md20 | 18201 | 北歐暗色電子與配樂（Biosphere 冷盤、Deathprod 系、Rune Grammofon 慢盤） | |
| md21 | 18281 | goth rock／coldwave 慢盤二線（會跳舞的快歌落冷冽或亢奮，不收） | |
| md22 | 18361 | 無鼓 drone metal／post-metal ambient 二線 | |
| md23 | 18441 | 暗黑 lo-fi／tape loops／Basinski 系 | |
| md24 | 18521 | 嘻哈 instrumental 冷盤（暗色 beat tape、冷的 abstract hip-hop） | |
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
| mc7 | 11481 | minimal techno 快而薄（Robert Hood、Jeff Mills 的 minimal、Monolake 快盤；厚的落亢奮） | |
| mc8 | 11561 | IDM 快而乾（早期 Autechre、Plaid、Funkstörung、Arovane、Phoenecia） | |
| mc9 | 11641 | 80s synth-pop 二線（OMD、Visage、Ultravox、Heaven 17、Yazoo、Telex、Blancmange、Thomas Dolby） | ✅ 上線 12／落格 9（併 mc10、mc20；二線多是樂團編制，研究汰 13） |
| mc10 | 11721 | new wave 冷盤（Gary Numan、Japan、Simple Minds 早期、Magazine、Wire、The Associates） | 併入 mc9（吉他樂團判重，不再單獨派） |
| mc11 | 11801 | krautrock motorik／kosmische 快盤（Neu! 以外的 La Düsseldorf、Harmonia、Kraftwerk 系二線） | |
| mc12 | 11881 | electroclash／2000s electro（Miss Kittin、Ladytron、Fischerspooner、Adult.、Chicks on Speed、Client） | |
| mc13 | 11961 | math rock／器樂後硬核的冷盤（Don Caballero、早期 Battles、Hella、乾淨的那一路） | |
| mc14 | 12041 | 60s 前衛 hard bop／post-bop 快而冷（Andrew Hill、Eric Dolphy、Booker Little、Jackie McLean 前衛期） | |
| mc15 | 12121 | 法比冷浪潮與 new beat、EBM 輕的那半（Front 242 早期以外的冷而不重） | |
| mc16 | 12201 | Italo／space disco 冷盤（Moroder 柏林期、Kano、Klein & MBO、Doctor's Cat；溫的 disco 落雀躍） | |
| mc17 | 12281 | 日本 techno（Ken Ishii、Fumiya Tanaka、Susumu Yokota 快盤、電気グルーヴ 冷盤） | 併入 mc5（田中フミヤ、石野卓球、Flare 已收；不再單獨派） |
| mc18 | 12361 | footwork／juke／冷的快節奏電子（RP Boo、Jlin、Traxman 冷盤） | |
| mc19 | 12441 | 東歐／蘇聯 synth 與冷電子（Zodiac、Edward Artemiev 快作、Space Bulgaria 系） | |
| mc20 | 12521 | 港台日 80s synth-pop／new wave 冷盤（達明一派、高橋幸宏、立花ハジメ、Plastics） | 併入 mc9（P-Model、ヒカシュー 研究判樂團編制汰；不再單獨派） |
| mc21 | 12601 | post-punk revival 薄而冷（Ought、Protomartyr 薄盤、Yard Act、Bodega、English Teacher 系；厚牆落亢奮） | |
| mc22 | 12681 | 當代爵士冷而快（Polar Bear、Phronesis 快盤、Kit Downes、Craig Taborn、Steve Lehman、Tyshawn Sorey 快盤） | |
| mc23 | 12761 | 前衛 art pop／冷的實驗流行（Laurie Anderson、Holger Czukay、坂本龍一 techno 期、Art of Noise） | |
| mc24 | 12841 | drum & bass 冷而薄（Photek、Source Direct 薄盤、minimal dnb；techstep 厚落亢奮） | |
| mc25 | 12921 | K-pop／J-pop 冷系（aespa、f(x)、相対性理論、水曜日のカンパネラ 冷盤） | 併入 mc5（甜／可愛人聲判暖，挖不到；不再單獨派） |
| mc26 | 13001 | synthwave 冷而薄（不是 darksynth 厚牆） | |
| mc27 | 13081 | 70s 前衛電子快作（Tangerine Dream 編曲快盤、Jean-Michel Jarre 冷盤、Isao Tomita 快作） | |
| mc28 | 13161 | 歐陸自由即興快而乾（ICP Orchestra、Globe Unity、Misha Mengelberg、Irène Schweizer） | |
| mc29 | 13241 | 冷的 new jack／electro-funk 機械那半（Mantronix、Cybotron、Hashim 系） | |
| mc30 | 13321 | minimalism 快作（Glass 早期、Reich 冷的那幾張、Michael Nyman 快盤、Terry Riley 電子快盤；暖的落雀躍） | |

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
| ml10 | 14721 | psychedelic soul／cosmic soul（Shuggie Otis、Terry Callier 一類） | |
| ml11 | 14801 | chillwave／hypnagogic pop（Toro y Moi、Washed Out、Neon Indian、Small Black） | |
| ml12 | 14881 | bedroom pop／dream pop 2010s–20s 濕的那一路 | |
| ml13 | 14961 | 暖而慢的迷幻搖滾（Kikagaku Moyo 系、不兇的 desert／stoner 慢盤） | |
| ml14 | 15041 | spiritual jazz 慢而厚（Pharoah 慢盤、Alice Coltrane、Lonnie Liston Smith） | |
| ml15 | 15121 | 暖 trip-hop／downtempo（Morcheeba、Thievery Corporation、Nightmares on Wax 的厚盤） | |
| ml16 | 15201 | jazz-rap／boom bap 暖盤（Pete Rock、Digable Planets 系） | |
| ml17 | 15281 | G-funk／西岸慢盤（低頻厚、慢、暖） | |
| ml18 | 15361 | Houston chopped & screwed／南方慢饒舌（DJ Screw、UGK 慢盤） | |
| ml19 | 15441 | city pop／AOR 濕的慢歌（新尺下會判重的那些） | |
| ml20 | 15521 | 台灣／華語 R&B 與 neo-soul | |
| ml21 | 15601 | 韓國 R&B／indie 恍惚（Colde、Zion.T、offonoff 一類） | |
| ml22 | 15681 | 日本 neo-soul／R&B（Mabanua、Ovall、SIRUP、Kan Sano、iri） | |
| ml23 | 15761 | ambient dub／ambient house 暖盤（The Orb、Global Communication、Higher Intelligence Agency） | |
| ml24 | 15841 | 暖的 dream folk／slowcore（殘響厚、溫） | |
| ml25 | 15921 | 80s 慢板 dancehall／reggae 歌（lovers 之外） | 併入 ml9（Junjo／Channel One 類比濕混音人聲盤；不再單獨派） |
| ml26 | 16001 | 非洲與巴西的慢而厚（MPB 濕的盤、desert blues 慢盤、afro-soul 慢盤） | |
| ml27 | 16081 | 暖的 vaporwave 之外的 sample-based ambient pop | |
| ml28 | 16161 | 70s soft rock／yacht 慢而濕的（新尺下會判重的） | |
| ml29 | 16241 | 華語／日本 dream pop 二線 | |
| ml30 | 16321 | 暖 ambient／new age 厚墊（溫而霧，不是空氣感的極簡） | |
