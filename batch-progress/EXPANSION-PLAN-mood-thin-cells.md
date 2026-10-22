# 情緒三格補充計畫：恍惚／頹靡／冷冽（2026-10-16 雲端草擬；2026-10-22 重掃更新）

## 2026-10-22 v2 定案（店主：「可以開始補缺少的頻率了 再策一次計畫」）——開跑

**現況**（質地尺改判＋ts5／ts6 上線後）：恍惚 **779**、冷冽 **874**、頹靡 **952**；平靜 1,328、沸騰 2,004、亢奮 2,664、放鬆 4,985、雀躍 5,962。

**三條線、12 批、每批 45 張，順序 頹靡 md → 冷冽 mc → 恍惚 ml**。頹靡先跑是因為命中率最高（dub techno 59%、slowcore 57%、dark ambient 51%、drone 50%）；恍惚放最後是因為質地尺剛改、先看新卡評分怎麼落再定場景（dream pop 已從 33% 升到 40%、neo-soul 42%）。

| 線 | 批 | 場景 | 落格率預估 |
|---|---|---|---:|
| md | md1 | dark ambient／isolationist／drone／工業 drone | ~55% |
| | md2 | slowcore／sadcore 二線＋dark jazz | ~50% |
| | md3 | darkwave／goth 慢盤＋**無鼓** drone metal／funeral doom（#114 後有鼓的 doom 判躁，不收） | ~45% |
| | md4 | 暗色嘻哈／cloud rap／暗 R&B＋dub techno 二線＋亞洲 | ~45% |
| mc | mc1–mc4 | 照 §2.3（minimal synth／coldwave、post-punk／no wave、冷爵士、當代古典＋亞洲 synth-pop） | 30–40% |
| ml | ml1–ml4 | 照 §2.2，但 ml2（暖 shoegaze／dream pop）與 ml4（東亞 dream pop／lo-fi R&B）命中率已因新尺上升，可排前面 | 40–50% |

**跟薄細項線不同的四件事**（已寫進 `batch-progress/mood-cells-20261022/CUR-DISPATCH.md`、`RES-DISPATCH.md`、`HANDOFF-mood-cells-line.md`）：
1. 策展層每張填 `moodGuess`，三軸都要過門檻**且留邊距**（頹靡 x ≤ 2.7、y ≥ +0.8、z ≤ −0.3），貼邊不提；`build-cards` 把它帶進卡單。
2. 研究層 facts 必含 2–3 條聲音事實（鼓、速度、失真、殘響、冷暖），發現與 moodGuess 不符就標「存疑」，主線直接汰換。
3. 上線當天評分（照 BRIEF 含 10-22 兩條新規則），**落格率寫進 rulings 與交接表**：<40% 換場景、<30% 停線回報。
4. 藝人介紹只切批不寫（店主：用別的對話做）。

**規模**：每批淨增目標格約 20–25 張；12 批跑完預估 頹靡 ~1,050、冷冽 ~950、恍惚 ~880。要再往上就是第二輪，或再動尺。
**執行**：每個工作階段 2 批；md1–md2、md3–md4 各開一個子工作階段並行（各自用 `master-override-<組>.json`，避免撞檔）。條號 md1 從 10681 起，每批 80。

---

## 2026-10-22 重掃（店主：「掃描頻率 把專輯分佈較少的頻率補齊……先掃描給我計畫」）

**現況**（`build-card-moods` 輸出，全池 19,458 張皆有座標，已含 ts1–ts11 與 #114 能量軸改判）：

| 格 | 10-16 | 10-22 | 占比 | 對比 |
|---|---:|---:|---:|---|
| 雀躍 | 5,867 | 5,943 | 30.5% | |
| 放鬆 | 5,102 | 5,155 | 26.5% | |
| 亢奮 | 2,506 | 2,648 | 13.6% | |
| 沸騰 | 1,900 | 1,987 | 10.2% | |
| 平靜 | 1,309 | 1,333 | 6.9% | |
| **頹靡** | 970 | **926** | 4.8% | #114 把有鼓的 doom／sludge 60 張移到躁，**變更薄** |
| **冷冽** | 873 | **874** | 4.5% | ts 新卡幾乎沒進來（新卡 342 張只落 1 張） |
| **恍惚** | 589 | **592** | 3.0% | 最薄，雀躍的 1/10 |

**10-16 計畫的候選幾乎都還沒進池**（抽查 103 位：頹靡線 38 位只 4 位在池、恍惚線 32 位 8 位、冷冽線 33 位 5 位），計畫本體（下方 §1–§5）仍然有效。

**#114 帶來的修正**（能量＝「兇不兇」優先於快慢：要攻擊性**且**有打擊才算躁）：
- **md3 的 doom／sludge 那半拿掉**——Windhand、Bell Witch、YOB、Pallbearer、Thou 有鼓又兇，現在會判躁、落亢奮／沸騰。改收**沒有鼓或鼓極稀**的：drone metal（Sunn O))) 系，店主已裁定算頹靡）、funeral doom 裡近乎無拍的、暗黑 ambient、工業 drone、現代古典音塊。
- 頹靡最穩的來源因此是：**dub techno 59%、dark ambient 46–51%、drone 46–50%、bass/dub 44%、slowcore 43%、post-rock 41%**（各標籤落頹靡的比例）。
- 冷冽最穩：**new wave 42%、Detroit techno 40%、electro 30%、synthpop 26%**；爵士只有 21–22%，但量大。
- 恍惚最穩：**dub 47%、roots reggae 44%、lovers rock 36%、jazz-rap 35%、dream pop 33%、beats 32%**。

**規模要說清楚**：每批 45 張、落格率 40–55%，**一批只淨增約 20 張**。照原計畫 12 批（540 張）三格合計約 +250：恍惚 592→~670、頹靡 926→~1,020、冷冽 874→~960。要讓三格都到 1,000 以上，恍惚要跑約 20 批——**單靠補卡補不平**。

**建議（給店主選）**：
1. **先跑頹靡線 md1、md2、md4＋改過的 md3**（命中最高、#114 後最需要）→ 再冷冽 mc1–mc4 → 最後恍惚 ml1–ml4。每批上線當天評分、驗收落格率（低於 40% 換場景）。
2. **恍惚要真的長大，得動規則**（§5 第 1 題，仍未裁定）：評分說明書目前把暖色慢板靈魂樂（Al Green、Anita Baker、落日飛車、Lamp）的低頻判「輕」而落放鬆；若店主認定它們「就是恍惚」，改質地的尺再重評放鬆格裡的慢板 soul／R&B／city pop，一次就能搬進幾百張，不必新增卡。
3. 抽卡層另有平均機制（MOOD_SCALE_PLAN §2），薄格不會抽不到；補卡是為了**同一格裡的多樣性**。

---


店主 2026-10-16：「慵懶 頹靡 冷冽 種類太少了 幫我策劃補充計畫」。
只是規劃，未動卡池、未開任何策展代理；店主點哪一段，雲端就從那一段開跑。
數字以同日另一工作階段評完全池後的 `data/mood/card-moods-v0.json`（19,116 張全部模型評分）＋`seed_cards.json`＋`card-subgenres.json` 算出；腳本在 scratchpad（`yield.mjs`、`landing.mjs`、`trans.mjs`、`names*.mjs`）。

## 0. 結論（五句話）

1. 全池評完後八格：放鬆 5,102、平靜 1,309、**恍惚 589**、**頹靡 970**、雀躍 5,867、**冷冽 873**、沸騰 1,900、亢奮 2,506。三格各 3–5%，恍惚最薄，而且是評完之後**變薄的**（先驗 765 → 589）。
2. 三格薄的主因不是沒收，是**評分怎麼判輕重**：店主心裡的「恍惚」（Marvin Gaye、Al Green、Anita Baker、落日飛車、老王樂隊、9m88、Lamp、Zero 7）在規則裡幾乎全被判「輕」而落放鬆——恍惚的定義是靜**重**暖，只有 dub、dusty 嘻哈、殘響厚的 dream pop 才會被判重。冷冽同理：techno 多半被判重落亢奮，math rock 被判暖落雀躍，真正落冷冽的是快板原聲爵士、synth‑pop／new wave、後龐克。
3. 所以補卡不能照「場景」補，要照「**規則會判進這格的聲音**」補：每張候選由研究層先預判三軸、留邊距，貼邊的不收；上線後立刻評分，驗收看落格率。
4. 三條策展線各 4 批 × 45 張（頹靡線信心最高：典型藝人六成落格；恍惚線最難：典型藝人只有三成）。預估淨增各 +80～110。
5. 另一個便宜的槓桿是**質地（y）的判法**：如果店主覺得 Al Green、落日飛車「就是恍惚」，那要改的是評分說明書對「輕重」的尺，不是補卡——這是裁定題，寫在 §5 給店主決定，本計畫不預設。

## 1. 現況（2026-10-16，全池 19,116 張皆模型評分）

| 格 | 張數 | 子曲風前幾名 | 年代重心 | 2020s |
|---|---:|---|---|---:|
| 恍惚（靜重暖） | 589 | reggae 110、downtempo 59、hiphop underground 48、conscious 45、ambient 36、south 32、dream-post 33 | 70s、90s–10s | 56 |
| 頹靡（靜重冷） | 970 | ambient 177、dream-post 68、idm 67、punk-wave 57、psych-prog 57、underground 56、techno 55、metal 54、downtempo 53、bass 52、industrial 48 | 90s–10s | 91 |
| 冷冽（躁輕冷） | 873 | bop 133、free jazz 107、techno 84、punk-wave 80、synth 73、fusion 57、contemporary jazz 57、post-punk 50、new-wave 46 | 60s–80s（80s 248） | 36 |

**子曲風命中率**（該標籤的卡落進本格的比例，只列 ≥25%）：
- 恍惚：reggae 38%、dream-pop 31%、shoegaze 27%。conscious 22%、neo-soul 18%、underground 18%。
- 頹靡：post-rock 44%、slowcore 43%、doom 41%、dream-post 34%、shoegaze 34%、industrial 29%、noise 29%、krautrock 28%、space-rock 26%、dream-pop 26%、goth 25%。
- 冷冽：synth 22%、new-wave 20%；其餘都低於 18%。爵士各標籤命中率都低，但因為池裡爵士多，bop＋free＋fusion＋contemporary 合計 354 張、占冷冽四成。

**典型藝人實際落哪裡**（我列的「照理該在這格」的藝人，在池全部卡）：
- 恍惚 338 張 → 恍惚 109、**放鬆 125**、雀躍 55、沸騰 30。一張都沒落恍惚的：Marvin Gaye、Al Green、Teddy Pendergrass、Anita Baker、Luther Vandross、Jill Scott、Bill Withers、Zero 7、Mac DeMarco、Men I Trust、落日飛車、老王樂隊、9m88、Lamp、Suchmos、Zion.T、Crush、DEAN（全落放鬆或雀躍）；Mulatu Astatke、Hailu Mergia、Jorge Ben、Roy Ayers → 雀躍；Tame Impala、傷心欲絕、iri → 沸騰。
- 頹靡 258 張 → **頹靡 154**、平靜 41、亢奮 29。沒落的：Talk Talk、Max Richter、Pärt、Feldman、Red House Painters、Mono → 平靜（判輕）；Whitehouse、Prurient、Pharmakon → 亢奮（判躁）。
- 冷冽 341 張 → 冷冽 113、**亢奮 86**、雀躍 70、平靜 37。沒落的：Plastikman、Surgeon、Underground Resistance、Pan Sonic、Cabaret Voltaire、Interpol、Battles、Squarepusher、LFO → 亢奮（判重）；toe、大象體操、Steve Reich、電気グルーヴ → 雀躍（判暖）；Neu!、Jimmy Giuffre、e.s.t.、Dry Cleaning → 平靜（判靜）。

先驗→模型的流向也印證：先驗判恍惚的 460 張，評分後只有 106 張留下，其餘散到沸騰 85、頹靡 69、放鬆 67、亢奮 63、雀躍 60；冷冽、頹靡則是從亢奮、雀躍、平靜流入（亢奮→頹靡 142、雀躍→冷冽 118、亢奮→冷冽 106）。

## 2. 三條策展線（各 4 批 × 45 張）

批名前綴暫定 **ml**（恍惚 languid）、**md**（頹靡 decay）、**mc**（冷冽 crisp），例：`add-2026MMDD-md1`。
「✗」＝池中沒有，「n」＝池中只有 n 張；名單是方向，**研究層要逐一核對在不在池、是不是同一人**（東亞掛名用原文，羅馬拼音會查漏，見 `EXPANSION-PLAN-c52plus.md`）。
每批的「預期命中」是規則下會落本格的比例，已把預判篩選算進去。

### 2.1 頹靡線 md1–md4（先跑：典型藝人六成落格，缺的場景也最多）

| 批 | 場景 | 預期命中 | 候選與挑法 |
|---|---|---:|---|
| md1 | dark ambient／isolationist／drone（**要有低頻與顆粒，純淨的極簡古典會落平靜**） | ~60% | ✗ Lustmord、Deathprod、Thomas Köner、Raison d'être、Lull、Final、Kreng、Svarte Greiner、Deaf Center、Emptyset、Demdike Stare、Vatican Shadow、Puce Mary、Pan Daijing、Loscil、Pan American、Rafael Anton Irisarri、Bersarin Quartett、Death in June、Sol Invictus；薄 Zoviet France 2、Hafler Trio 1、Ben Frost 1、Roly Porter 1、Haxan Cloak 1、Labradford 1、Windy & Carl 1、Eluvium 1 |
| md2 | slowcore／sadcore 二線＋dark jazz（**挑低頻厚、殘響長的；乾淨木吉他那種會落平靜**，Red House Painters 的前例） | ~45% | ✗ Idaho、Arab Strap、Tindersticks、Spain、Jason Molina／Magnolia Electric Co.、Lisa Germano、Mojave 3、Acetone、The New Year、Carissa's Wierd、Crescent、Early Day Miners、Karate、Nina Nastasia、Have a Nice Life、Giles Corey、Planning for Burial；dark jazz ✗ Bohren & der Club of Gore、The Kilimanjaro Darkjazz Ensemble、Dale Cooper Quartet；薄 Bedhead 1、Movietone 1、Flying Saucer Attack 1、Third Eye Foundation 1、Piano Magic 1、Mount Eerie 1 |
| md3 | darkwave／goth 二線＋doom／drone metal（**挑慢的；會跳舞的 EBM 與快速 power electronics 落亢奮**） | ~50% | ✗ Clan of Xymox、Xmal Deutschland、Sad Lovers & Giants、And Also the Trees、Gene Loves Jezebel、Red Lorry Yellow Lorry、Skeletal Family、Virgin Prunes、Play Dead、The Danse Society、Cindytalk、In the Nursery、Kirlian Camera、Lycia、Lebanon Hanover、She Past Away、Molchat Doma、Drab Majesty、Cold Cave、The Soft Moon、Zola Jesus、Chelsea Wolfe、Emma Ruth Rundle、King Dude；doom ✗ Windhand、Nadja、Sumac、Amenra（再查 Khanate、Bell Witch、Thou、Pallbearer、YOB、Corrupted、Boris）；薄 Chameleons 1、Christian Death 1、Fields of the Nephilim 1、The Mission 1、Sisters of Mercy 2、Cult of Luna 2 |
| md4 | 暗色嘻哈／暗 R&B／dub techno 二線＋亞洲 | ~50% | 嘻哈（冷的歸這批、暖鬆的歸 ml3）：查 Armand Hammer、Ka、Mach-Hommy、Navy Blue、Earl Sweatshirt、King Krule、dvsn、PARTYNEXTDOOR、The Weeknd《Trilogy》；暗 R&B ✗ Tirzah、Klein、Space Afrika、Yves Tumor、Mica Levi，薄 Dean Blunt 1；dub techno ✗ Deepchord／Rod Modell、Echospace、Fluxion（查 Vladislav Delay）；台 甜梅號 4、落差草原 2、雷光夏 2、瓢蟲 1、✗ Mong Tong、王榆鈞；港 達明一派 3、my little airport 2；韓 Parannoul 3、Jambinai 1、Silica Gel 1、✗ Asian Glow、Brokenteeth、쏜애플；日 ✗ きのこ帝国、downy，薄 冥丁 1 |

### 2.2 恍惚線 ml1–ml4（最難：只有「重」的暖慢才算；靈魂樂、city pop、乾淨的 bedroom pop 都會落放鬆）

| 批 | 場景 | 預期命中 | 候選與挑法 |
|---|---|---:|---|
| ml1 | lovers rock＋80s 慢板 rub‑a‑dub＋roots 二線（reggae 是三格裡命中最高的標籤；dt1 做過 dub 45 張，這批是「歌」） | ~45% | ✗ Louisa Mark、Brown Sugar、15 16 17、Sandra Cross、Maxi Priest、Cocoa Tea、Deborahe Glasgow、Hugh Mundell、Michael Prophet、Johnny Osbourne、Mighty Diamonds、Twinkle Brothers、Jacob Miller、Linval Thompson；薄 Janet Kay 1、Carroll Thompson 1、Beres Hammond 1、Freddie McGregor 1、Sugar Minott 2 |
| ml2 | 暖的 shoegaze／dream pop／新迷幻（**殘響與低頻厚才會判重**；Slowdive、MBV、Beach House、Kikagaku Moyo 是落恍惚的先例） | ~40% | ✗ Pale Saints 以外的 Creation／4AD 二線（Chapterhouse、Swervedriver、Moose、Adorable、The Telescopes、Kitchens of Distinction）、Hum、Nothing、Whirr、Ringo Deathstarr、Flyying Colours、Cigarettes After Sex 同路（Still Corners、Lowly、Hatchie）、新迷幻（Mild High Club 1、Crumb 1、Drugdealer、Jacco Gardner、Morgan Delt、Night Beats、The Black Angels、Dead Meadow、Wooden Shjips／Moon Duo）；日 ✗ きのこ帝国（與 md4 分配）、Luminous Orange、Coaltar of the Deepers |
| ml3 | beats／lo‑fi hip‑hop／dusty 地下饒舌 2010s–20s（**拍子鬆、取樣 dusty**；MIKE、Curren$y、Knxwledge 是先例） | ~40% | ✗ 9th Wonder、Oddisee、Blu & Exile、Yesterdays New Quintet、Shing02、Idealism、Eevee、bsd.u、Mabanua、Ovall、Shingo Suzuki、Kenichiro Nishihara、DJ Okawari、Larry June、Pink Siifu、Navy Blue（與 md4 分配）、Medhane、Mavi、Standing on the Corner；薄 Knxwledge 1、Mndsgn 2、Uyama Hiroto 1、jinsang 1、Tomppabeats 1、Nujabes 4 |
| ml4 | 東亞恍惚：**台日韓的 dream pop／shoegaze／lo‑fi R&B**（不是 city pop；落日飛車、老王、Lamp、Suchmos、Crush、DEAN 全落放鬆，別再往這邊補） | ~35% | 台：溫蒂漫步 2（補齊）、deca joins 4、甜約翰 3（挑殘響厚的）、✗ 漂流出口、Mandark、DSPS、雷擎、莫宰羊、國蛋；日：✗ 羊文学、yonawo、Homecomings、For Tracy Hyde、Tokyo Shoegazer、Cruyff in the Bedroom、The Pillows 以外的 90s 日系 shoegaze，薄 Tempalay 1、君島大空 1；韓：✗ Colde、offonoff、Hoody、OurR、Adoy、The Volunteers、Xin Seha、Yaeji，薄 백예린（Yerin Baek 1）、Sumin 1、Heize 1、Say Sue Me 1。**亞洲卡評分把握度低（score‑rest low 43%），主線審稿要盯評分** |

### 2.3 冷冽線 mc1–mc4（快＋輕＋冷：techno 多半太重、math rock 多半太暖；真正的大宗是快板原聲爵士與 synth‑pop）

| 批 | 場景 | 預期命中 | 候選與挑法 |
|---|---|---:|---|
| mc1 | minimal synth／coldwave／synth‑pop／electro（**製作薄、乾、無人味；厚重的 techno 落亢奮，不收**） | ~40% | ✗ Martin Dupont、Linea Aspera、Crash Course in Science、Minimal Compact、Absolute Body Control、Snowy Red、Solid Space、Ike Yard、Liaisons Dangereuses、Der Plan、Pyrolator、Asmus Tietchens、Charanjit Singh、DJ Stingray、Gesloten Cirkel、Boris Divider、Metronomy、Client、Miss Kittin、Adult.、The Normal／Robert Rental、Silicon Teens、Thomas Dolby、Blancmange、The Associates；薄 Dopplereffekt 1、Legowelt 1、Helena Hauff 1、Oppenheimer Analysis 1、Telex 1、Grauzone 1、I‑F 2、Aux 88 2、Ladytron 1、John Foxx 1 |
| mc2 | post‑punk／no wave／funk‑punk／新一代冷快搖滾（**乾、尖、不厚**；Magazine、Talk Talk 早期、English Teacher 是先例；Interpol 那種厚牆落亢奮） | ~35% | ✗ The Pop Group、Rip Rig + Panic、Pigbag、Medium Medium、Liquid Liquid、Konk、Bush Tetras、James Chance & the Contortions、DNA、Mars、Teenage Jesus and the Jerks、Lydia Lunch、Delta 5、Au Pairs、Essential Logic、Fire Engines、Section 25、Crispy Ambulance、Yard Act、Bodega、Uranium Club；薄 Chrome 1、Tuxedomoon 1、ESG 1、A Certain Ratio 1、Josef K 1、Orange Juice 1、Young Marble Giants 1、The Raincoats 1、The Slits 1、Women 1、Omni 2 |
| mc3 | 冷爵士：Tristano 派／60s 前衛 Blue Note 二線／歐陸自由即興／北歐與英國當代的**躁**那一半（這是冷冽最大的來源，但北歐 ECM 式多半落平靜，要挑快而乾的） | ~40% | ✗ Globe Unity Orchestra、ICP Orchestra、Han Bennink、Peter Kowald、Django Bates、Acoustic Ladyland、Zoh Amba、Anna Webber、Ingrid Laubrock、Arve Henriksen、Supersilent、Eivind Aarset、Mathias Eick、Christian Wallumrød、Trygve Seim；薄 Warne Marsh 1、Misha Mengelberg 1、Irène Schweizer 1、Phronesis 1、Kit Downes 1、Polar Bear 1、Craig Taborn 1、Tim Berne 1、Kris Davis 1、Steve Lehman 2、Tyshawn Sorey 2、Grachan Moncur III 4 |
| mc4 | 當代古典／電影配樂＋亞洲冷快流行與電子（**亞洲的 synth‑pop、techno‑pop；不要 J‑rock**） | ~30% | 古典（查在不在池）Ligeti、Xenakis、Penderecki、Varèse、Boulez、Stockhausen、Nono、Lutosławski、Berio；電影 Morricone giallo、Goblin、John Carpenter、Cliff Martinez、Reznor & Ross、Mica Levi；亞洲 ✗ capsule、中田ヤスタカ、相対性理論、Buffalo Daughter、Polysics、パソコン音楽クラブ、tofubeats、Seiho、石野卓球、砂原良徳、Kyoka、水曜日のカンパネラ、LOONA、Dreamcatcher；薄 P‑MODEL 1、ヒカシュー 1、サカナクション 1、Takkyu Ishino 1、aespa 2、f(x) 4、Perfume 8、達明一派 3、黃耀明 1、高橋幸宏 3 |

## 3. 跟過去策展線不一樣的三件事

1. **研究層預判三軸、留邊距。** 每張候選照 `batch-progress/mood-axes/score500/BRIEF.md` 的尺先估 (x, y, z)，研究稿多一欄 `moodGuess`，只留落在格內且離門檻有距離的：
   冷冽 x ≥ 3.3、y ≤ +0.2、z ≤ −0.3；頹靡 x ≤ 2.7、y ≥ +0.8、z ≤ −0.3；恍惚 x ≤ 2.7、y ≥ +0.8、z ≥ +0.3。
   貼邊的（x 2.9／3.1）不收——門檻是硬切，貼邊卡評分後一半掉到隔壁格。研究層派工時附 §1 的「典型藝人落哪裡」當反例。
2. **上線後立刻評分。** 每批上線當天切 50 張工單照 BRIEF 評分（檔名帶批名），併進 `build-priors.mjs` 來源層、重跑 `build-scale.mjs v0`。
3. **驗收看落格率。** 每批評分後算「落本格張數／45」，寫進該批 `rulings.md`。低於 40% 的場景，下一批換場景；低於 30% 的線停下來回報。

## 4. 流程與成本

- 每批照 `HANDOFF-downtempo-line.md` 第二節：研究 5 支 Sonnet（每支 WebSearch ≤3 次）→ 鉤子 2 支 Opus → 寫作 2 支 Opus → 主線審稿、試聽、封面 → 寫入 → 子曲風 `--pull` → 評分 → 藝人介紹（`ALBUM_ONBOARDING.md` §11，同 PR 或緊接的 PR）。
- 藝人介紹：三線新藝人估 250–300 位，ar‑d 批約 6–8 批，是本計畫最花時間的一段。
- 併行照 CLAUDE.md：同時最多兩批在飛；一條線一個工作階段跑到底（dt 線先例，店主 10‑12 裁定）。
- 時程估：每條線 1.5–2 天（含藝人介紹）；三線全跑約一週。
- KV 已可寫（今天 `kv-token-check` 通過）；雲端邊界照 `REMOTE_RUNBOOK.md`（推分支、開 PR、店主合併）。

## 5. 要店主決定

1. **恍惚的定義要不要動。** 規則下恍惚＝靜重暖，所以 Al Green、Anita Baker、落日飛車、老王樂隊、Lamp 全在放鬆。兩條路：(a) 不動規則，只補 dub／dusty 嘻哈／厚殘響 dream pop 這類「重」的（本計畫 ml1–ml4）；(b) 改評分說明書對「質地」的尺（例如暖色慢板靈魂樂的厚低頻算 +0.5），全池重評 y 軸——那是另一個計畫，會把放鬆的一部分搬過來。**建議先 (a)，看落格率再說。**
2. 三條線的**順序**與要不要全跑。建議 **頹靡 → 冷冽 → 恍惚**（信心由高到低）。
3. 批名前綴 **ml／md／mc** 可以嗎。
