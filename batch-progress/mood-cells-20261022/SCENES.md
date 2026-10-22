# 情緒薄格策展線・場景佇列（2026-10-22 擴大版）

店主 2026-10-22：「新增的專輯數太少了 與雀躍嚴重不平衡」→ 三格**各補到約 2,000**、一批 45 張、**6 個工作階段並行**。
起點（md1–md4 上線後）：頹靡 1,119、冷冽 874、恍惚 784；雀躍 5,962。md1–md4 落格率 91–98%（moodGuess 留邊距篩得很準），所以**每批淨增約 40 張**。
缺口：頹靡 +881（約 22 批）、冷冽 +1,126（約 30 批）、恍惚 +1,216（約 30 批）——合計約 80 批。

**怎麼用這張表**：主線（調度的工作階段）每輪開 6 個子工作階段、每個指派 2 個批號；子工作階段只做被指派的批，不自己往下拿。
**一個場景候選不夠 45 張**（md4 先例），就收到夠格為止、照實上架（不湊數），在 rulings 寫明，剩下的名額留給後面的批。
**條號**：每批 80 條，照表；同批內：研究 a–e 各 10、鉤子 10、寫作 10、主線 10。
**評分目錄**：`batch-progress/mood-axes/score-<批>/`（如 `score-mc3/`），`build-priors.mjs` 會自動讀所有 `score*/scored-*.json`，不用改它。

狀態欄：空白＝待派；`派→<工作階段標題>`；`✅ 上線 N／落格 M`。

## 頹靡 md（靜＋重＋冷；門檻 x ≤ 2.7、y ≥ +0.8、z ≤ −0.3）

| 批 | 條號 | 場景（方向，不是名單；逐一查池、查同一人） | 狀態 |
|---|---|---|---|
| md1 | 10681 | dark ambient／isolationist／drone／工業 drone | ✅ 45／43 |
| md2 | 10761 | slowcore／sadcore 二線＋dark jazz | ✅ 45／41 |
| md3 | 10841 | darkwave／goth 慢盤＋無鼓 drone metal／funeral doom | ✅ 45／44 |
| md4 | 10921 | 暗色嘻哈／cloud rap／暗 R&B＋dub techno＋亞洲 | ✅ 43／39 |
| md5 | 17001 | dark ambient 二線：Cryo Chamber、Cold Meat Industry、Malignant、Glacial Movements、Ant-Zen 系 |  派→情緒薄格 md5、md6（第 1 輪） |
| md6 | 17081 | drone／電子極簡：Kranky、Touch、12k、Room40、Type、Miasmah 系（要有低頻與顆粒） |  派→情緒薄格 md5、md6（第 1 輪） |
| md7 | 17161 | 冷調 post-rock／慢而冷、鼓少的器樂（Constellation、Kranky、Temporary Residence 系的慢盤） |  派→情緒薄格 md7、md8（第 1 輪） |
| md8 | 17241 | dub techno／ambient techno 三線：Echocord、Chain Reaction、Silent Season、Prologue、Styrax、Astral Industries |  派→情緒薄格 md7、md8（第 1 輪） |
| md9 | 17321 | 冷的 trip-hop 與 Bristol 二線（陰、慢、低頻厚；溫暖的 lounge 系落恍惚，不收） | |
| md10 | 17401 | 冷的 shoegaze／drone pop（霧＋冷：Jesu ambient 盤、Grouper、Flying Saucer Attack 系、Windy & Carl 系） | |
| md11 | 17481 | 工業 old-school 慢盤／ritual／tape music（SPK 慢盤、Organum、Current 93 drone 期、Zoviet France 系） | |
| md12 | 17561 | neoclassical darkwave／ethereal 慢盤（Arcana、Ataraxia、Dead Can Dance 系、Projekt 廠牌） | |
| md13 | 17641 | 現代古典的暗黑音塊／drone 古典（Scelsi、Penderecki 慢作、Hildur Guðnadóttir、Jóhannsson 暗盤；純淨極簡落平靜不收） | |
| md14 | 17721 | 暗色電影／遊戲配樂（Silent Hill、《Annihilation》、《Under the Skin》、《Sicario》、Badalamenti 系、恐怖片原聲） | |
| md15 | 17801 | witch house／hauntology／暗電子（Salem 系、Raime、Ghost Box 冷盤、Demdike 系二線） | |
| md16 | 17881 | cloud rap／sad rap／慢 drill 的冷盤（不兇的；兇＋拍落亢奮） | |
| md17 | 17961 | 暗 R&B／PBR&B 二線（冷而霧；溫的落恍惚） | |
| md18 | 18041 | 日本暗色：drone／noise 靜盤／暗 ambient／暗色獨立（灰野敬二 drone 期、畠山地平冷盤、downy 系） | |
| md19 | 18121 | 華語／韓國暗色獨立與實驗（落差草原系、Mong Tong 系、韓國 post-rock 冷盤） | |
| md20 | 18201 | 北歐暗色電子與配樂（Biosphere 冷盤、Deathprod 系、Rune Grammofon 慢盤） | |
| md21 | 18281 | goth rock／coldwave 慢盤二線（會跳舞的快歌落冷冽或亢奮，不收） | |
| md22 | 18361 | 無鼓 drone metal／post-metal ambient 二線 | |
| md23 | 18441 | 暗黑 lo-fi／tape loops／Basinski 系 | |
| md24 | 18521 | 嘻哈 instrumental 冷盤（暗色 beat tape、冷的 abstract hip-hop） | |
| md25 | 18601 | 冷的 ambient pop／art pop 慢盤（Julia Holter 冷盤、Jenny Hval 慢盤、Kate Bush 以外的暗 art pop） | |

## 冷冽 mc（躁＋輕＋冷；門檻 x ≥ 3.3、y ≤ +0.2、z ≤ −0.3）

聲音：**快或密、但製作乾淨薄透、沒有人味的冷**。厚重 techno、失真牆、會「兇」的落亢奮；溫暖律動（funk、disco、多數 bop）落雀躍——z 要真的冷（金屬、機械、都市夜、疏離）。

| 批 | 條號 | 場景 | 狀態 |
|---|---|---|---|
| mc1 | 11001 | minimal synth／coldwave／minimal wave |  派→情緒薄格 mc1、mc2（第 1 輪） |
| mc2 | 11081 | post-punk／no wave／funk-punk（乾、尖、不厚） |  派→情緒薄格 mc1、mc2（第 1 輪） |
| mc3 | 11161 | 冷爵士：Tristano 派、60s 前衛 Blue Note 二線、歐陸自由即興裡快而乾的 | ✅ 上線 19／落格 16（場景挖不到 45；鋼琴主導無強鼓的落平靜） |
| mc4 | 11241 | 當代古典快而冷（Ligeti、Xenakis、Varèse、Boulez、Stockhausen、Lutosławski 的快作） | ✅ 上線 19／落格 9（47%：無拍點的點描／複節奏作品照新能量規則落平靜；只收機械脈動或打擊推進的） |
| mc5 | 11321 | 日本 techno-pop／synth-pop（YMO 系、P-Model、Hikashu、capsule、Perfume 系、tofubeats 冷盤） | |
| mc6 | 11401 | Detroit techno／electro 二線（Drexciya 系、Aux 88、DJ Stingray、Model 500、Dopplereffekt） | |
| mc7 | 11481 | minimal techno 快而薄（Robert Hood、Jeff Mills 的 minimal、Monolake 快盤；厚的落亢奮） | |
| mc8 | 11561 | IDM 快而乾（早期 Autechre、Plaid、Funkstörung、Arovane、Phoenecia） | |
| mc9 | 11641 | 80s synth-pop 二線（OMD、Visage、Ultravox、Heaven 17、Yazoo、Telex、Blancmange、Thomas Dolby） | |
| mc10 | 11721 | new wave 冷盤（Gary Numan、Japan、Simple Minds 早期、Magazine、Wire、The Associates） | |
| mc11 | 11801 | krautrock motorik／kosmische 快盤（Neu! 以外的 La Düsseldorf、Harmonia、Kraftwerk 系二線） | |
| mc12 | 11881 | electroclash／2000s electro（Miss Kittin、Ladytron、Fischerspooner、Adult.、Chicks on Speed、Client） | |
| mc13 | 11961 | math rock／器樂後硬核的冷盤（Don Caballero、早期 Battles、Hella、乾淨的那一路） | |
| mc14 | 12041 | 60s 前衛 hard bop／post-bop 快而冷（Andrew Hill、Eric Dolphy、Booker Little、Jackie McLean 前衛期） | |
| mc15 | 12121 | 法比冷浪潮與 new beat、EBM 輕的那半（Front 242 早期以外的冷而不重） | |
| mc16 | 12201 | Italo／space disco 冷盤（Moroder 柏林期、Kano、Klein & MBO、Doctor's Cat；溫的 disco 落雀躍） | |
| mc17 | 12281 | 日本 techno（Ken Ishii、Fumiya Tanaka、Susumu Yokota 快盤、電気グルーヴ 冷盤） | |
| mc18 | 12361 | footwork／juke／冷的快節奏電子（RP Boo、Jlin、Traxman 冷盤） | |
| mc19 | 12441 | 東歐／蘇聯 synth 與冷電子（Zodiac、Edward Artemiev 快作、Space Bulgaria 系） | |
| mc20 | 12521 | 港台日 80s synth-pop／new wave 冷盤（達明一派、高橋幸宏、立花ハジメ、Plastics） | |
| mc21 | 12601 | post-punk revival 薄而冷（Ought、Protomartyr 薄盤、Yard Act、Bodega、English Teacher 系；厚牆落亢奮） | |
| mc22 | 12681 | 當代爵士冷而快（Polar Bear、Phronesis 快盤、Kit Downes、Craig Taborn、Steve Lehman、Tyshawn Sorey 快盤） | |
| mc23 | 12761 | 前衛 art pop／冷的實驗流行（Laurie Anderson、Holger Czukay、坂本龍一 techno 期、Art of Noise） | |
| mc24 | 12841 | drum & bass 冷而薄（Photek、Source Direct 薄盤、minimal dnb；techstep 厚落亢奮） | |
| mc25 | 12921 | K-pop／J-pop 冷系（aespa、f(x)、相対性理論、水曜日のカンパネラ 冷盤） | |
| mc26 | 13001 | synthwave 冷而薄（不是 darksynth 厚牆） | |
| mc27 | 13081 | 70s 前衛電子快作（Tangerine Dream 編曲快盤、Jean-Michel Jarre 冷盤、Isao Tomita 快作） | |
| mc28 | 13161 | 歐陸自由即興快而乾（ICP Orchestra、Globe Unity、Misha Mengelberg、Irène Schweizer） | |
| mc29 | 13241 | 冷的 new jack／electro-funk 機械那半（Mantronix、Cybotron、Hashim 系） | |
| mc30 | 13321 | minimalism 快作（Glass 早期、Reich 冷的那幾張、Michael Nyman 快盤、Terry Riley 電子快盤；暖的落雀躍） | |

## 恍惚 ml（靜＋重＋暖；門檻 x ≤ 2.7、y ≥ +0.8、z ≥ +0.3）

2026-10-22 質地尺改判後：**暖慢的包覆感算重**（dream pop 殘響霧、夢幻吉他與合成器墊、慢板靈魂厚低頻與弦樂、chillwave 糊濾波），落恍惚的範圍比以前大很多。乾淨、有空氣的仍落放鬆，不收。

| 批 | 條號 | 場景 | 狀態 |
|---|---|---|---|
| ml1 | 14001 | lovers rock＋80s rub-a-dub＋roots 二線 |  派→情緒薄格 ml1、ml2（第 1 輪） |
| ml2 | 14081 | 暖 shoegaze／dream pop／新迷幻 |  派→情緒薄格 ml1、ml2（第 1 輪） |
| ml3 | 14161 | beats／lo-fi hip-hop／dusty 地下饒舌 | ✅ 上線 27／落格 26（場景挖不到 45） |
| ml4 | 14241 | 東亞恍惚：台日韓 dream pop／shoegaze／lo-fi R&B | ✅ 上線 11／落格 11（核心已在池、色溫多貼邊，挖不到 45） |
| ml5 | 14321 | neo-soul 二線（Soulquarians 周邊、UK neo-soul：Omar、Lewis Taylor 一類） | |
| ml6 | 14401 | quiet storm／slow jam 80s–90s 二線 | |
| ml7 | 14481 | 70s 慢板靈魂：Philly／Chicago／Memphis 弦樂慢盤二線 | |
| ml8 | 14561 | alt R&B 2010s–20s（霧而暖） | |
| ml9 | 14641 | 暖 dub／roots dub 二線（dt1 之外） | |
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
| ml25 | 15921 | 80s 慢板 dancehall／reggae 歌（lovers 之外） | |
| ml26 | 16001 | 非洲與巴西的慢而厚（MPB 濕的盤、desert blues 慢盤、afro-soul 慢盤） | |
| ml27 | 16081 | 暖的 vaporwave 之外的 sample-based ambient pop | |
| ml28 | 16161 | 70s soft rock／yacht 慢而濕的（新尺下會判重的） | |
| ml29 | 16241 | 華語／日本 dream pop 二線 | |
| ml30 | 16321 | 暖 ambient／new age 厚墊（溫而霧，不是空氣感的極簡） | |
