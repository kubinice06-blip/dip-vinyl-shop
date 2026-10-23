# add-20261023-ml56 裁定（情緒薄格策展線・恍惚：暖 trip-hop 女聲二線＋暖 downtempo／dub-downtempo 擴寫）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 13 輪，本工作階段負責 ml56、mc42（評分照 10-23 體感標準；店主同日「恍惚可以多增加一點 downtempo 與 dub 這類的」）。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml56 列；主線定可擴寫：暖 downtempo／trip-hop 慢盤廣義、dub 化 downtempo、psy-dub／world-dub、池中已落恍惚的 downtempo／dub 藝人其他正規專輯），交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**恍惚＝靜（x<3.0）＋重（y≥0.5）＋暖（z≥0）**；策展邊距 x ≤ 2.7、y ≥ 0.8、z ≥ 0.3。
> 策展：`curation-ml56.json`（兩輪 64）→ 主線汰 19（`master-override-ml56.json`）→ `master-ml56.json`（MB 回查 45/45 釘住、人工 0）→ `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml56-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 21241–21250、b 21251–21260、c 21261–21270、d 21271–21280、e 21281–21290、鉤子 21291–21300、寫作 21301–21310、主線 21311–21320。**
---

## 主線策展（不佔條號）
- 策展第一輪 38（暖 trip-hop 女聲 15、Pork／Mo' Wax 式 downtempo 11、世界 downtempo 7、soul 系 downtempo 5）。主場景多已在池或別批已收（Hooverphonic、Morcheeba、Lamb、Olive、Laika；md9、ml15、ml40、ml53）。
- 主線汰 18（照池中同人三軸與聲音判斷）：
  - 判輕／乾淨（池中 Morcheeba《Big Calm》y 0.3、Lamb《Lamb III》y −0.8、Hooverphonic《Blue Wonder Power Milk》y 0.4、Natacha Atlas《Gedida》y 0.4 先例）：Sia ×2、Morcheeba《Fragments of Freedom》《Dive Deep》、Lamb《Between Darkness and Wonder》（原聲傾向）、Hooverphonic《The Magnificent Tree》（管弦 pop）、Nitin Sawhney ×2（乾淨吉他與 drum'n'bass 混雜）、Susheela Raman《Love Trap》。
  - 判躁（拍子推進；池中 Soul II Soul《Club Classics》x 2.9、Natacha Atlas《Diaspora》x 3.0 先例）：Soul II Soul《Vol. II》、Neneh Cherry《Homebrew》《Man》、Natacha Atlas《Halim》、Quantic《Mishaps Happening》、Alice Russell《Pot of Gold》、Lamb《Fear of Fours》（drum'n'bass 段）。
  - 判冷（池中 Beth Gibbons《Lives Outgrown》z −1.0 先例；實驗 trip-hop 陰）：Beth Gibbons & Rustin Man《Out of Season》、Rickie Lee Jones《Ghostyhead》。
- 策展第二輪 26（池中已落恍惚的 downtempo／dub 藝人其他正規專輯：Mad Professor ×5、Prince Fatty ×2、Gaudi ×2、Dub Colossus ×2、Blundetto、Peaking Lights ×2、Chancha Vía Circuito ×2、Kaya Project ×2、Sounds from the Ground ×3、Halftribe ×2、Heights of Abraham、Aim、Boozoo Bajou）。主線汰 1：Boozoo Bajou《Juke Joint》（MB Album+Compilation，DJ mix 選輯）。
- 定案 45：Fila Brazillia ×6、Money Mark ×3、Rustin Man《Drift Code》、Lamb《What Sound》《5》、Skye、Alice Russell ×3、Quantic《Apricot Morning》、Susheela Raman《Salt Rain》、Loop Guru ×2，及第二輪 25。去重：seed、其他 curation-*.json、desc-tools 卡單、origin 95 個 `claude/*` 分支 seed 全 0 撞。
- 風險：y 估 0.8–0.9 貼邊的多（Fila 後期、Kaya、Halftribe、Heights、Aim、Chancha、Skye）；x 貼 2.6–2.7（Fila、Loop Guru、Gaudi、Chancha《Rodante》、Peaking Lights《E S C A P E》）。Mad Professor 5 張同質；Dub Colossus《Dub Me Tender》為自家舊作 dub 重製（MB 標 Album）。研究層請特別查：breaks／drum'n'bass／house 拍、乾淨 lounge、陰冷字眼、人聲客串過多的歌曲型盤。

## 研究 c 組
- 21261：Loop Guru《Amrita》《The Third Chamber》廠牌改 North South Records（MB 與 Discogs 皆為 GURU 200／GURU 100；美版 World Domination），策展層寫的 Nation 是《Duniya》的發行廠，seed label 欄請改。
- 21262：Prince Fatty《In the Viper's Shadow》廠牌改 Evergreen Recordings（EVER 106，2019-10-04；維基同），非 Mr Bongo。
- 21263：Mad Professor《Ambient Adventures in Dub》Discogs 標 Compilation、僅日本 Canyon International PCCY-01516 單一版本，19 首含與《Black Liberation Dub Chapter One》重名的曲，判定非原創專輯，status thin，建議主線汰換。
- 21264：Prince Fatty Meets The Mutant HiFi《Return of Gringo!》所有來源皆為 surf／ska／spaghetti western 配樂，12 首每首 2–4 分鐘，moodGuess（dub、慢拍）不成立，建議汰換。
- 21265：《The Third Chamber》全為 ambient（Eno／Hassell 比較、drones／甘美朗），無 dub 低頻證據，y 0.9 存疑，留主線聽感再判。
- 21266：《Part 11》年份採 MB／Discogs 的 1991（維基 Ariwa 條寫 1992）；Ransom Note 訪談引句無法開啟（503），不進 facts。
- 21267：moodGuess 存疑彙整：Prince Fatty《Viper's Shadow》為客串歌手多的歌曲型盤，樂評用 upbeat groove 與 melancholic chords；Mad Professor 各盤 Discogs 皆有多名 DJ／人聲客串。AllMusic 403、Wayback 不可抓，無 warm／hazy 樂評原句。

## 研究 e 組
- 21281：Gaudi《No Prisoners》moodGuess 強烈存疑：Gaudi 自家 Bandcamp 明寫「離開一貫的 down-tempo、明顯更 up-tempo」，主力為 breakbeat 疊粗低音，客串多（Franti、Bunny Wailer、Elisa 等）；廠牌實為 Six Degrees（卡單 Gaudi 錯）。建議汰換。
- 21282：Gaudi《Earthbound》廠牌實為 Antenna／Bustin' Loose（卡單錯）；年份 MB／Discogs 1999，Bandcamp 自相矛盾（1997／1998），採 1999。Discogs 風格含 jungle／drum n bass、曲目有 General Levy，整盤節奏型態無樂評佐證，moodGuess 中度存疑。
- 21283：Dub Colossus《Dub Me Tender》是自家兩張舊作的 dub 重混（加四首未發表），Dubblog 稱演奏輕、像現場、豐富多變，非極簡厚 dub；策展層引的 PopMatters／Metro 原文取不到，不進 facts。輕度存疑。
- 21284：Dub Colossus《Dub Will Tear Us Apart》實為 2010-12 Society of Sound Music 下載版（Discogs），非 Real World 實體（卡單廠牌錯）；曲目大量與 2011《Addis Through the Looking Glass》重疊，樂評稱同名曲是 dub 最淡的幾首。中到強存疑；若池中已有《Addis…》建議查重。
- 21285：Halftribe《Luxia》廠牌實為 Archives；僅有標籤（ambient／deep／electronica；Discogs Ambient／IDM／Dub），無鼓點與低頻描述，moodGuess 缺佐證。
- 21286：Halftribe《Backwater Revisited》廠牌實為 Dronarivm；文案「Melancholia laid bare」、聽眾稱 desolate and disturbing，標籤 ambient／modern classical，非 dub-downtempo。強烈存疑，建議汰換（可能落輕或冷）。
- 21287：Heights of Abraham《Two Thousand and Six》廠牌實為 Twentythree（卡單錯）；Discogs 風格標 Deep House／Downtempo，可能有四拍推進，無樂評，中到強存疑。年份 MB／Discogs 2005，Wikipedia 寫 2006。
- 21288：Blundetto《World of Dub》是自家《World Of》（2015）的 dub 重製，Heavenly Sweetness HS135VL，限量 1000，九首共約 33 分鐘；無樂評，原版含 funk／Kabyle／搖滾／reggae 拼貼，輕度存疑（funk 律動）。
- 21289：Aim《Flight 602》廠牌實為 ATIC Records（自家新廠牌首發），Aim 2005 年初已離開 Grand Central（卡單錯）；Discogs 風格 Trip Hop／Downtempo／Breaks，Niko 人聲約半數曲目、單曲導向，歌曲型成分中等，中到強存疑。ATIC 成立年各條目互相矛盾（2005／2006），facts 不寫。
- 21290：e 組彙整：九張中廠牌被我推翻 7 張（Gaudi ×2、Dub Colossus《Will Tear》、Halftribe ×2、Heights、Aim）；建議汰換優先序：Backwater Revisited、No Prisoners；其次 Heights、Dub Will Tear Us Apart、Flight 602。Penny Black 全文與 AllMusic 取不到，No Prisoners 樂評句取自搜尋摘要。本組 WebSearch 用 3 次。

## 研究 a 組
- 21241：廠牌推翻 5 處（卡單標錯）：Fila《A Touch of Cloth》1999 原版是自家 Tritone（T001，後因法律問題改名 Twentythree），《Jump Leads》是 Twentythree（TT010LP），Money Mark《Change Is Coming》是 Emperor Norton（EMN 7045）、《Father Demo Square》是日本 Rush! Production（ACCR-10039），Mo' Wax 當時已近尾聲（2002 結束）。Wikipedia《A Touch of Cloth》專輯頁誤寫 Pork，以 Discogs／MB 為準。
- 21242：Money Mark《Change Is Coming》moodGuess 強烈存疑：Wikipedia 稱「tropical yet danceable disco and funk」，Houston Press 用 drunk with funk／blasts into life／jazz-funk／墨西哥聲響，客席多（Sean Lennon、Los Lobos 五人）。建議汰換。
- 21243：Money Mark《Push the Button》moodGuess 強烈存疑：有主唱的歌曲型盤（維基 guitar pop，Discogs 含 Pop Rock／Indie Rock／Synth-pop／Hip Hop），客席樂手眾多（Sean Lennon、Jim Keltner、Russell Simins 等），單曲上英國榜。建議汰換。
- 21244：Money Mark《Father Demo Square》聲音證據為零（日本限量發行、無樂評），標 thin，moodGuess 無從證實；曲名偏歌曲型。建議汰換或上架後聽感再判。
- 21245：Fila《A Touch of Cloth》Exclaim! 評：far mellower than Power Clown、類 Moog 鍵盤、爵士銅管、拉丁節奏、dub-style bass lines、1970s disco／funk 暖旋律——偏暖但有 funk／disco 律動，x 恐 2.7–3.0。唯一確切 dub 低頻原句來源。
- 21246：Fila《Power Clown》唯一聲音證據是 Exclaim! 的對照語（比後作更硬、更偏 funk 與吉他）；曲名單曲偏 funk（Bovine Funk、Throwing Down a Shape），moodGuess 存疑，y 邊距薄的可能性高。
- 21247：Fila《Old Codes New Chaos》Wikipedia 標 breakbeat，Discogs 風格含 House，〈Mermaids〉有 house 拍、〈Fila Funk〉18 分鐘上揚；ghostdeep 有 echoing dubby textures 與貝斯為重心，但非全程慢拍。存疑中等。
- 21248：Fila《Mess》《Luck Be a Weirdo Tonight》《Jump Leads》僅有 Discogs 風格標籤（Downtempo；Luck 另含 Leftfield、Breaks），查無樂評；全數標 thin。Luck 的 Breaks 標籤是有 breaks 拍的風險。三者 dub／warm／hazy 原句皆無。
- 21249：全組無任何樂評用 dark／cold／eerie／melancholic 等陰冷字眼；Jack Hawkins 電影對白採樣之外無人聲客串（Fila 全組）。Luck 唯一客席是 Bernard Moss（薩克斯風、長笛）。
- 21250：日期不一致已取保守：Luck（MB 1997-05-05／維基 6 月 23 日／Discogs 6 月）、Push the Button（MB 1998-05-19／維基 5 月 4 日）、Jump Leads（MB 2002-02 美／2002-03-05 英）；facts 只寫年或標英版。Exclaim!、Houston Press、衛報全文 WebFetch 取不到，僅用摘要與維基收錄短語。WebSearch 用 3 次。建議汰換優先序：Push the Button、Change Is Coming、Father Demo Square；其次 Power Clown、Luck。

## 研究 d 組
- 21271：廠牌推翻（卡單 seed label 欄請改）：Peaking Lights《Clearvoiant》2008 原版是 Night People 錄音帶 NP041（限量 50 份，先前自行發行 CD-R），非 Not Not Fun；Chancha《Bienaventuranza》為 Wonderwheel Recordings（WONDERLP29），非 ZZK（ZZK 是《Rodante》）；Kaya《Desert Phase》為 Interchill Records（ICHILLCD038），《Up From the Dust》CD 為 Tribal Shift Records（TRIBE CD 23），皆非「Kaya Project」。
- 21272：Sounds From the Ground《Footprints》是 2001 年德國 Black Flame／BMG 的選輯（Discogs 註明取自《Kin》《Terra Firma》並加幾首不同曲目），非原創專輯、官網專輯清單未收，廠牌亦非 Waveform；status thin，建議主線汰換（或改上《Kin》《Terra Firma》原專輯）。
- 21273：Sounds From the Ground《Natural Selection》原始首發 2002（英國 Nettwerk），卡單 2003 是美國 Nū-tone 版；廠牌非 Waveform；年份請主線定（建議 2002）。策展層引的 Waveform 文案「dubby／dreamy／laid back」三處皆未在官網與 Bandcamp 核到，未寫入 facts。
- 21274：moodGuess 存疑彙整（恍惚格風險）：Peaking Lights《E S C A P E》樂評明寫相對快的拍子、house-heavy dub、techno 味快節奏、upbeat and playful、重度失真，且為 Dunis 主唱的歌曲型盤，Bandcamp 用 melancholic；Chancha《Bienaventuranza》六位客座歌手領唱（約半數曲目屬歌曲型），評論稱 dancefloor friendly drum beats、house、dancehall，用了 haunting／eerie；Kaya《Up From the Dust》多達七位歌手，聽眾稱 lots of groove；Kaya《Desert Phase》有 Shahin Badar 等客座人聲、Bandcamp 用 haunting 形容沙漠氣質；Chancha《Rodante》無任何聲音層級來源，標籤含 Dancehall、Bass Music，策展層預估無法驗證。
- 21275：支持恍惚的原句：Sounds From the Ground 官網自稱「Warm, deep and Funky Electronic Music」、dub 根源與「lovingly produced basslines」，Bandcamp 稱「bass-heavy downtempo」（皆樂團自述，非第三方樂評；funky、driving rhythms 偏動需主線聽感再判）；《High Rising》僅〈Beautiful Feeling〉有 Taz Alexander 客座人聲，Gaudi 只貢獻合成器（策展層寫「Taz、Gaudi 客演」更正），三張中最符合預估。
- 21276：Peaking Lights《E S C A P E》Bandcamp 稱 Dekmantel 首發，XLR8R 轉述廠牌稿稱第二次（前有 2018 EP《Sea of Sand》）、第八張專輯（Arcana 稱第六張），facts 採 XLR8R 版並歸屬到來源。Exclaim!「sultry western soundtrack」、NPR 頁面本次抓取失敗（Exclaim! 只回導覽、NPR 503），前者未寫入，後者描述引自搜尋摘要僅作輔證。WebSearch 3 次已用完。

## 研究 b 組
- 21251：Rustin Man《Drift Code》是民謠／art rock／psych 歌曲型專輯（MB 標籤 art rock、folk、indie folk；AllMusic 評語 folk／jazz／vocal pop／psych／prog），非 downtempo；Lee Harris 鼓為寬鬆節奏，無 breaks／DnB／house，無 deep bass／dubby 原句。暖有 Bandcamp 引述樂評（warm, wise kind of euphoria、time trapped in amber）；陰冷字眼僅 Exclaim! 的 moody。moodGuess 存疑：木質乾淨、可能判輕。
- 21252：Lamb《What Sound》moodGuess 存疑（建議降低把握）：PopMatters 明寫標題曲 stuttering jungle rhythm、jarring hard beats、整體 drum 'n' bass and jazz；維基列 house、drum and bass；NdegéOcello 的 Sweet 有 wickedly funky bass line；客席 4 組的歌曲型。無 warm／dubby 原句。Discogs 另有宣傳單 What Sound／Scratch Bass 標 Progressive House、Breaks。維基專輯 11 首、Discogs 歐洲版 10 首，版本差異。
- 21253：Lamb《5》廠牌以 Strata 為準（卡單寫 Lamb Records，Lamb 僅為版權標示）；Telegraph 明說工業電子拍被削減，對靜有利，但低頻是 Jon Thorne 低音提琴（原聲），無 deep bass／dubby／warm 原句；forlorn、existential angst、intense 偏沉，z 邊距薄成立。
- 21254：Skye《Back to Now》廠牌實為 [PIAS] Recordings（卡單寫 Skye）；Charts in France 明寫『速度更明快、節奏更帶勁』，與策展『慢拍』相反，Discogs 風格含 House，建議降級／汰換。英文專業樂評全數抓不到，status thin。
- 21255：Alice Russell《Under the Munka Moon》性質是彙編（維基：an amalgamation of various singles, remixes and collaborations；Tru Thoughts 稱她的第一張發行），多位製作人（TM Juke、Quantic、Kushti／Plaid、Dave Noble、Julian Bendall）；判有定位，不列建議移除。Discogs／MB 風格含 House、Acid Jazz；Rhodes 在信用中查無；moodGuess 把握低。日期 Discogs 英國版 2004-05-10、MB 2004-07-12，年份 2004 一致。
- 21256：Alice Russell《My Favourite Letters》是本組對恍惚最有證據的一張：XLR8R 稱 subtly booming 的節拍、warped Afro basslines、neo-psych-soul；實際鼓手僅兩首，其餘為 Alex Cowan 編寫節拍。XLR8R 引文來自 fetch 摘要，成稿前建議主線覆核。
- 21257：Alice Russell《To Dust》moodGuess 存疑（建議汰換候選）：現場樂團靈魂，PopMatters 稱 deep drum backbeat、tight groove、〈Hard and Strong〉danceable；NZ Herald 稱 warm, classic palette of Motown, funk, and soul＋electro-pop＋snappy youthful beat＋hip-hop approach——偏 funk 律動且有推進。MB 廠牌標 Differ-ent、Discogs 另一 master 標 Differ-ant，Tru Thoughts 版為主。
- 21258：Quantic《Apricot Morning》moodGuess 存疑：Discogs／MB 標 Breaks，曲名 Brand New Watusi／Primate Boogaloo，KFJC 稱適合跳舞，屬 funk／拉丁律動；Rhodes 在信用中查無（只有 Rusty Boy 風琴、Dave Woodhouse 鍵盤）。KFJC 樂評人稱 Holland 的姊妹是 Jill 與 Lucy，Discogs 為 Lucy（薩克斯風）與 Beth（低音提琴），facts 採 Discogs。
- 21259：Susheela Raman《Salt Rain》聲音證據僅有 Discogs 信用與 MB／Discogs 標籤，專業樂評全抓不到，status thin；無 deep bass／dubby 證據，打擊為手鼓類原聲；2001 年水星獎入圍（同屆 Radiohead、PJ Harvey）；發行日期 MB 2001-08-05、維基 2001-05-08，年份 2001 一致。
- 21260：本組 WebSearch 用 3 次（Lamb《What Sound》、Quantic／Alice Russell、Skye／Susheela）；Guardian、BBC、AllMusic、Pitchfork、web.archive.org 在 fetch 中被封鎖，已用 PopMatters、XLR8R、NZ Herald、KFJC、Charts in France、Bandcamp、Discogs API、MB 替代。

## 主線：研究後汰換（不佔條號）
- 研究五組 45 張，汰 29（卡單、研究稿、`pick.json` 同步移除；a 6、b 8、c 4、d 5、e 6）：
  - breaks／house／drum'n'bass／funk 推進（判躁）：Fila Brazillia《Old Codes New Chaos》（breakbeat、house 拍、18 分鐘〈Fila Funk〉）、《Luck Be a Weirdo Tonight》（Breaks 標籤）、《Power Clown》（較硬的 funk 吉他）、Money Mark《Change Is Coming》（disco／funk）、Lamb《What Sound》（jungle／drum'n'bass）、Alice Russell《To Dust》（backbeat 現場靈魂）、《Under the Munka Moon》（多製作人拼盤、house／acid jazz）、Skye《Back to Now》（更明快、house）、Quantic《Apricot Morning》（Breaks、boogaloo）、Peaking Lights《E S C A P E》（house-heavy、快）、Chancha《Bienaventuranza》（dancefloor 鼓、歌曲型）、《Rodante》（dancehall／bass music、零聲音來源）、Gaudi《No Prisoners》（官方自稱更快、breakbeat）、《Earthbound》（jungle／dnb 標籤）、Heights of Abraham《Two Thousand and Six》（deep house 標籤、零樂評）、Aim《Flight 602》（breaks、半數人聲）。
  - 歌曲型／客串多（判輕或判躁）：Money Mark《Push the Button》（guitar pop）、Prince Fatty《In the Viper's Shadow》（upbeat、客串歌手）、《Return of Gringo!》（surf／ska）、Kaya Project《Up From the Dust》（七位歌手、groove）。
  - 原聲稀疏／無低頻證據（判輕）：Rustin Man《Drift Code》（民謠 art rock）、Lamb《5》（低音提琴、工業節拍削減、forlorn）、Susheela Raman《Salt Rain》（手鼓原聲）、Loop Guru《The Third Chamber》（甘美朗 ambient、無 dub 低頻）、Halftribe《Backwater Revisited》（modern classical、「Melancholia laid bare」判冷）。
  - 非原創／身分：Mad Professor《Ambient Adventures in Dub》（Discogs Compilation、日本獨有）、Sounds From the Ground《Footprints》（德國選輯）、Dub Colossus《Dub Will Tear Us Apart》（下載版，曲目與池中《Addis Through the Looking Glass》大量重疊）、Money Mark《Father Demo Square》（日本限定、聲音零來源）。
- 研究推翻照改卡單：label——A Touch of Cloth→Tritone、Jump Leads→Twentythree、Amrita→North South、Clearvoiant→Night People（限量 50 卷錄音帶，正規全長）、Desert Phase→Interchill Records、Natural Selection→Nettwerk（year 2003→2002 英國首發）、Luxia→Archives。
- 留下但存疑、交評分裁定：Fila《Mess》《Jump Leads》（只有 Discogs 標籤）、《A Touch of Cloth》（dub-style bass，但有 70s disco／funk 取向）、Dub Colossus《Dub Me Tender》（演奏輕）、Blundetto《World of Dub》（原版含 funk）、Halftribe《Luxia》（只有標籤）、Kaya《Desert Phase》（haunting 字眼）、Loop Guru《Amrita》（Western dance beats）。
- 策展第三輪補 7（器樂類比 dub，池中同系列 Part 1–3 全落恍惚）：Mad Professor《Dub Me Crazy》Part 4／5／6／12、《Black Liberation Dub, Chapter 4》、Sounds From the Ground《Luminal》《Brightwhitelight》。分入 b 組 5、e 組 2，另派一支補研究 append 進 b、e 研究稿。Part 7–9、BLD Chapter 2 無任何封面來源，不收。

## 補研究（b、e 組補位）
- 21258：Mad Professor《Dub Me Crazy》Part 4／5／6／12 與《Black Liberation Dub, Chapter 4》五張全是 Ariwa 的 Discogs／MB 登錄，身分與年份無推翻（Part 12 的 RG 首發 1992 美國版、英國 MB 日期 1993-03-30，年份維持 1992）。聲音證據只有系列層級（Ransom Note「sparse rhythms and depth charge bass」、First Avenue 稱幫助 dub 進入數位時代、1980 年代後半實驗性高峰、1990 年代初 creative burnout），**五張都查不到專屬樂評**，無 warm／dubby 專屬原句，status 其實是靠 Discogs 信用撐起的 full。
- 21259：Mad Professor 五張 moodGuess 存疑分級：Part 6（只有和聲、無主唱）與 BLD4（信用只有 Mad Professor）人聲風險最低；Part 4 掛名 Ranking Ann、Sandra Cross 等五位人聲、曲名有〈DJ Choice〉；Part 5 的 Voice 欄八人；Part 12 精簡到 Black Steel／Denis Nolan／Kate Holmes 三位樂手但掛 Carroll Thompson、Susan Cadogan、Alan King Pin 等六位人聲，曲名〈Acid Meets Dub〉〈Rusty Computor〉暗示數位化，風險最高，建議若要汰先汰 Part 12，其次 BLD4（〈Internet Spy〉〈Robotronic〉，1995 年起走電子化）。各張區分特徵（錄音年、目錄號、樂手、曲名）已寫進各自 facts。Part 5 的 The Orb〈Blue Room〉取樣為 Discogs 單一備註。
- 21260：本補研究 WebSearch 用 2 次（Dub Me Crazy 系列、Sounds From the Ground），WebFetch 補 Ransom Note、維基 Mad Professor、First Avenue、Waveform Bandcamp；維基 Sounds From the Ground 與 waveformrecords.com/sfg 為 404。
- 21289：Sounds From the Ground《Luminal》moodGuess 存疑（中到強）：卡單「器樂 dubby」不符——九首中四首有客席人聲（Calladine〈Stampede〉、Tanya Tagaq Gillis〈As The Day Goes By〉、Dillinger 的 DJ 客串〈Ten Tons Of Dope〉、Taz〈Move On〉），廠牌自述「spacious and sometimes gritty」「less lounge and more fat and dirty」，無 warm／deep bass 原句。版本：Discogs 主版為英國 Amboworld AMBOCD02（2004，曲序封面不同），卡單 Waveform 對應美國版 04102-2，年份一致不改。卡單引用的「sometimes dubby, sometimes dreamy, chill-out music」在本次抓到的 Waveform 頁面核不到，未寫入 facts。
- 21290：Sounds From the Ground《Brightwhitelight》無客席／人聲信用，是兩張中較支持器樂的一張，但只有廠牌自述（reflective、mesmerizing、shimmering；shimmering 可能偏輕），無第三方樂評、無鼓與速度描述，status thin；卡單引的「dubby, dreamy」在頁面核不到。

## 主線：補位後汰換（不佔條號）
- 補研究 7 張汰 3：Mad Professor《Dub Me Crazy, Part 12》（六位人聲、數位化曲名，池中數位盤《A Caribbean Taste of Technology》z −0.1 落頹靡先例）、《Black Liberation Dub, Chapter 4》（1995 起電子化，〈Internet Spy〉〈Robotronic〉，同一先例）、Sounds From the Ground《Luminal》（九首四首人聲、廠牌自述「fat and dirty」）。留 Part 4／5／6、《Brightwhitelight》。
- **定案 20 張**（a 3、b 4、c 5、d 4、e 4），不湊數。主場景（暖 trip-hop 女聲二線）見底：研究層一查，女聲 trip-hop 二線多是歌曲型、jungle／house 拍或原聲化，只剩 Alice Russell《My Favourite Letters》；產量主要靠池中已落恍惚的 downtempo／dub 藝人目錄。

## 鉤子層（a、b、c）
- **21291** 交件：`desc-tools/batches/hooks/add-20261023-ml56-hooks-a.json`（3）、`-b.json`（4）、`-c.json`（5），key 逐字照研究稿、順序不變。預算公式照 hook-base 第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 每個 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。逐筆（預算／上限｜hook 加權）：Mess 167/170（thin）｜18；A Touch of Cloth 228/230｜18；Jump Leads 169/170（thin）｜21.5；My Favourite Letters 215｜18.5；DMC Part 4 219｜17.5；Part 5 213｜18；Part 6 223｜14；Amrita 228｜20.5；Part 10 221｜12；Part 11 207｜18；BLD Ch.1 198｜17；BLD Ch.3 226｜19。hook 原始字元 12–30。初稿 12 張全超（英文曲名與樂手名吃掉預算），整格捨去：Mess〈Soft Music Under Stars〉；Touch 的〈Ridden Pony〉名與「編號照舊」；Jump Leads 的 EP 兩首、Geoff Pesche、合作盤名；MFL 的 12A Studios、Rhodes 與嗓音評語；Part 4 曲長與 Peckham 錄混；Part 5 小提琴、長笛（避開池中《A Caribbean Taste of Technology》hook 的 steel pan＋小提琴＋長笛）；Amrita 的 bayan、North South、11 首、The Shrine；Part 11 的 Jungle Fresh 配對。壓完回核：12 張 hook 依賴格全在 g1／g2，hook 與 note 無逐字重複句。
- **21292** 骨架歸屬（12 張 12 條）：Mess＝首尾同名曲呼應；A Touch of Cloth＝自創廠牌被迫改名；Jump Leads＝同年旁支合作盤；My Favourite Letters＝器樂人聲分處錄、製作人一手包辦；Part 4＝鼓手名單（Horsemouth）；Part 5＝曲序從廣播到監視；Part 6＝無主唱、只剩和聲；Amrita＝傳統樂器接電子取樣；Part 10＝曲名致敬時事人物（曼德拉）＋Dub Me Crazy 系列沿革；Part 11＝牙買加錄、倫敦混；BLD Ch.1＝新系列開篇（五章 1994–1999）；BLD Ch.3＝名人掛名（Horace Andy、Lee Perry）。Part 6 的 Medusa 首尾曲（〈Medusa's Head〉…〈Medusa's Tail〉）與 Mess 同構，不指派。d 組 High Rising「只有一首請歌手」與 Part 6「沒有主唱」題材相近、句形不同，留主線知悉。
- **21293** Mad Professor 七張分軸與「他」引入法配表（避開池中已用的本名、出生城市、錄音室、藝名由來、廠牌＋人名、「倫敦 dub 製作人」六種）：Part 4＝樂器（自己彈貝斯、打擊）；Part 5＝掛名欄（Voice 欄也列著他）；Part 6＝編曲欄（三欄都掛他）；Part 10＝身分（身為英國 dub 製作人）；Part 11＝器物（Ariwa 混音台）；BLD Ch.1＝年齡（13 歲從圭亞那移居倫敦，生平只歸這張）；BLD Ch.3＝前作（前一年的《No Protection》）。Dub Me Crazy 系列沿革（1982–1993、12 集）只歸 Part 10；Black Liberation Dub 五章沿革只歸 Ch.1；John Peel、「稀疏節奏配深水炸彈低音」系列評語池中已用，本批 7 張都不指派。Ch.3 的 Farrakhan 列名不指派，Lee Perry 只寫列名。Fila Brazillia 三張：Mess 帶赫爾成軍、Touch 帶兩人名字與廠牌、Jump Leads 帶混音履歷。
- **21294** 第二句句型配表：Mess「年份＋地點＋成軍的」；Touch「X 是 Y」；Jump Leads「替…做過混音的」；MFL「以…著稱的」；Part 4「…的是」；Part 5「…之外，也列著」；Part 6「三欄，都掛著」；Amrita「由…組成的」；Part 10「身為…，」；Part 11「把…帶回」；BLD Ch.1「N 歲從…移居」；BLD Ch.3「主詞＋前一年」。媒體名一律寫「樂評」（Exclaim!、XLR8R、Scaruffi 皆不具名、分數不指派）。日期「日」後一字：Touch 面、Jump Leads 在、MFL 由、Amrita 發（原「上」與 e 組 Luxia 撞，改）；其餘八張只寫年或月。與 d、e 合掃 20 張「日」後字互異。
- **21295** 自查：hook 開頭前四字 12 張互異，與 d、e 亦不同；hook 之間中文 4-gram 跨五組 0 條。`node qa-batch.mjs hooks add-20261023-ml56` 全部通過；`node chk-hook-crossgroup.mjs add-20261023-ml56` 只報 1 項：e 組 Halftribe《Luxia》hook 含「你」（禁語，屬 e 組，未改動）。
