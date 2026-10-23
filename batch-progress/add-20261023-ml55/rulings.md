# add-20261023-ml55 裁定（情緒薄格策展線・恍惚：90s–00s 女聲 R&B ballad＋女聲 quiet storm、女聲慢板 neo-soul、女聲 downtempo）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 12 輪，本工作階段負責 ml55、mc41（評分照 10-23 體感標準；店主 10-23「恍惚可以多增加一點 downtempo 與 dub」）。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml55 列；可擴寫：女聲 quiet storm 成人抒情、女聲慢板 neo-soul／暖 R&B 2000s–20s、女聲 downtempo／lovers dub），交接 `batch-progress/HANDOFF-mood-cells-line.md`。
> 策展：`curation-ml55.json`（39）→ 主線汰 2（`master-override-ml55.json`）→ `master-ml55.json`（MB 回查 37/37 釘住、人工 0；flag 2 見下）→ `pick.json`（全收 37）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml55-cards.json`（37 張；研究 a–d 各 8、e 5）。身分：MB 釘住 37、§1 人工 0。
> **預留：研究 a 20921–20930、b 20931–20940、c 20941–20950、d 20951–20960、e 20961–20970、鉤子 20971–20980、寫作 20981–20990、主線 20991–21000。**
---

## 主線策展（不佔條號）
- 策展 39（90s–00s 女聲 R&B 二線慢盤 6、女聲 quiet storm 13、女聲慢板 neo-soul 17、女聲 downtempo 3）；moodGuess 全過邊距（x 2.0–2.6、y 0.8–1.2、z 0.6–1.5），y 多數正好 0.8。主場景見底：池中 Toni Braxton、SWV、Brandy、Monica、Tamia、Faith Evans 後期、Aaliyah、MJB 多數判輕（y ≤ 0.4），頭牌不提。
- 主線汰 2：Hollie Cook《Happy Hour》（ml50 先例：自稱 happiest、研究汰過）；Syd《Broken Hearts Club》（池中前作《Fin》偏冷、z 0.7 貼邊，且藝人名「Syd」與池中 Syd Barrett 子字串撞名）。
- 池中同人錨點（pool-axes）：Kelly Price、Miki Howard、Phyllis Hyman 後期、Chanté Moore、Lalah Hathaway、Marsha Ambrosius、Goapele、Raveena、Sabrina Claudio、Syleena Johnson 全落恍惚（y 0.6–1.0）。
- **MB flag**：Syleena Johnson《Chapter 1》MB 首發 2002-03-18 為他國版，美國原版 2001；Aisha《High Priestess》MB 1988 為德版，Discogs master 1987（UK Ariwa）——研究層核對。Quadron 年份 2009／2010 研究層核。藝人名 Aisha（池中 Maisha）、Celeste（池中 Celeste Legaspi）子字串撞名，seed 去重 0，介紹鍵上線前再查。
- 去重：seed、所有 curation-*.json、origin 各 `claude/*` 分支 seed＋卡單 0 撞。

## 研究 c 組
- 20941：Chanté Moore《Exposed》moodGuess 存疑——Jermaine Dupri 執行製作的 R&B／嘻哈混合、〈Take Care of Me〉為 Da Brat 客串單曲、〈Straight Up〉快歌主打；建議主線汰換。廠牌首發 Silas／MCA（MB 標 Geffen 為後世目錄），卡單 MCA 不改。
- 20942：Chanté Moore《Moore Is More》存疑——AllMusic 稱有喧鬧舞曲〈On and On〉（Da Brat 客串）、Moore 自稱「aggressive, happy, bubbly」；僅簡約慢歌（〈Cry Me a River〉翻唱）合恍惚。
- 20943：Lalah Hathaway《Honestly》存疑——28 分鐘 9 首、trap 式鼓點與 16 位元合成器、SoulTracks 稱暗沉；暖在人聲，製作偏乾淨數位。維基獨立榜日期（2015）矛盾，不採。
- 20944：Mica Paris《Whisper a Prayer》部分存疑——維基／BBC 轉述為九〇年代鼓機與合成器編曲，弦樂墊無來源；速度分布未能查。
- 20945：Marsha Ambrosius《Nyla》存疑——前半有 trap 鼓點與銅管快歌，慢板集中後半，慢歌約半數。
- 20946：Marsha Ambrosius《Casablanco》部分存疑——27 人管弦樂團與電影感有證，但含 Dre 嘻哈鼓與取樣，非純慢歌；MB／維基日期 6-28 為準。
- 20947：Leela James《Loving You More…》部分存疑——樂評只講現代重編，管弦厚無來源；曲目含中速／放克的 Etta 名曲。
- 20948：Leela James《Fall for You》存疑——九〇年代式節奏曲＋鋼琴抒情，部分製作過度光滑；風琴／厚貝斯無來源。
- 無推翻年份、廠牌、盤名；各卡 WebSearch 共用 3 次（Casablanco／Nyla／Honestly 樂評），其餘走 MB API 與維基。AllMusic、SoulTracks、BBC、Discogs 403 或不可開，內容經維基轉述處已於 notes 註明。

## 研究 e 組
- 20961：Andra Day《Cheers to the Fall》——聲音基本合恍惚（福音式慢抒情，弦樂、管風琴、鋼琴厚）；逐首速度與是否有快歌樂評皆未逐首描述，不給存疑。年份 2015（MB 05-28、維基／iTunes 08-28，同年不改）。
- 20962：YEBBA《Dawn》moodGuess 存疑——有 A$AP Rocky、Smino 兩段饒舌客串，〈Love Came Down〉重鼓點偏流行，電鋼琴與合成器有證但「厚弦樂」查無；色溫暖、悲傷轉希望，無陰冷字眼。
- 20963：Quadron《Quadron》moodGuess 存疑——Exclaim! 摘要稱配器「數位而冷」，且有 Motown 式快拍、funk 感；年份兩層：Discogs 丹麥自發 2009、MB 美版 Plug Research 2010-02-23，卡單 2010／Plug Research 吻合美版，不推翻。
- 20964：Shara Nelson《What Silence Knows》moodGuess 強存疑——Mike Peden 製作的英式 soul／pop-soul，主打〈Down That Road〉為 dance-pop（Perfecto 混音、歐洲舞曲電台榜 No.1），〈Uptight〉為 Motown 式放克快歌，僅〈Inside Out〉極簡慢歌；非 trip-hop 慢拍整張。建議主線汰換。年份 1993 無誤。
- 20965：Aisha《High Priestess》年份 uncertain——Discogs LP 版（含試壓）與 master 1987、MB／維基／Discogs 歌手頁 1988、日本 2017 重發註記 1986；目錄號鄰居（028／030 為 1986、031／033 為 1987、032 為 1988）指向 1986–1987。建議取 1987（現存最早實體紀錄），facts 不寫年份；status thin（無第三方樂評）。聲音：輕度存疑（roots 訓誡歌名，製作冷暖與 dub 比例無佐證）。
- 推翻策展層：Shara Nelson 聲音設定（見上）；無推翻年份、廠牌、盤名。WebSearch 共用 3 次（Shara、Quadron、Aisha），AllMusic、Discogs 網頁、Guardian 不可開，改用 Discogs／MB API 與維基。

## 研究 a 組
- 20921：Vesta《Relationships》廠牌推翻策展層——不是 Ichiban，是 PolyGram／Verve／i.e. Music（Lee Ritenour 的 IE 廠牌），目錄號 314 557 615-2（MB、Discogs 盤面版權、SoulTracks 一致）；年份 1998 不變。moodGuess 中度存疑：Ritenour 製作三首、Albright／Jerry Hey／Harvey Mason／Russell Ferrante 參與，質地偏 smooth jazz，非弦樂墊 quiet storm。
- 20922：Vesta《Everything -n- More》moodGuess 強存疑（建議汰換）——Discogs 風格 New Jack Swing＋Hip Hop，Daddy-O 掛額外製作三首（〈Outstanding〉〈Stop Frontin'〉〈4 The Love of U〉），SoulTracks 稱離開成人靈魂路線改走當代聲音。樂評來源僅 SoulTracks，維基無專頁。
- 20923：Kelly Price《Kelly》moodGuess 強存疑（建議汰換）——SoulTracks 述有 house 取樣舞曲〈And You Don't Stop〉（War〈Galaxy〉）、80 年代溜冰 funk〈Speechless〉、復古快歌〈Vexed〉，慢歌不是主體。
- 20924：Kelly Price《This Is Who I Am》moodGuess 高度存疑（建議汰換或改放福音場景）——Discogs 與維基皆為 Gospel，2005-10-28 Freeport Zion Cathedral COGIC 現場錄音，含讚美快歌；聲音樂評查無，status 標 thin。
- 20925：Vesta《Special》moodGuess 中度存疑——Discogs 風格含 New Jack Swing，〈Don't Trip〉有 Mr. Lee 饒舌；慢歌占比無法由來源統計。專輯銷量不及《Vesta 4 U》（維基），與 SoulTracks「biggest charters」互斥，facts 取維基版本且只寫單曲名次。Michigan Citizen 1991／1993 評論頁 403，未採用。
- 20926：Kelly Price《Mirror Mirror》moodGuess 中度存疑——Method Man 客串〈Like You Do〉、全明星重混〈Love Sets You Free〉、R. Kelly 製作，Vibe 稱製作平庸；福音式大嗓與弦樂（〈The Lullaby〉Aaron Zigman、〈Mirror, Mirror〉Eddie Horst）仍暖。
- 20927：Kelly Price《Priceless》輕度存疑——Keith Murray 客串＋Stevie J 兩首嘻哈拍；WaPo 稱老派、適合晚餐後啜飲葡萄酒，整體仍暖。「第三張」改記：維基列第四張（含 2001 聖誕專輯）。
- 20928：Syleena Johnson《Chapter 1》基本相符，無推翻。年份取美國原版 2001（維基 2001-05-15；MB 2002-03-18 他國版；Discogs master 2000 為原訂發行年）。NME 用 doom／darkly emotive 描述情緒，屬悲苦熱烈、不判陰冷。Rhodes、厚貝斯策展說法查無來源未寫。
- 推翻策展層：Relationships 廠牌（Ichiban 不成立）；Kelly Price《Priceless》序數（第三張→維基第四張）。WebSearch 共用 6 次（Vesta 三、Syleena、Mirror Mirror、Kelly 各一，Vesta 每張僅一次）。MB 暫忙後可用，Discogs API 可用，AllMusic、Michigan Citizen、soulinstereo、Slant 不可開。

## 研究 d 組
- 20951：Goapele《Change It All》基本相符無推翻（MB 2005-12-27、Skyblaze/Columbia、維基「第三張」把 2001 自發行《Closer》算入）。moodGuess 輕—中度存疑——〈Different〉有 Clyde Carson 饒舌客串、〈Intro〉有轉盤與小號、Sa-Ra 與 Bhasker 的電子實驗被 ALARM 評為「有成有敗」，不是整張慢歌（ALARM：慢歌最自在、快歌較不適合她）；厚暖度無一手證據。AllMusic 403、Rolling Stone 存檔打不開，只用 ALARM、維基、Billboard。
- 20952：Goapele《Break of Dawn》年份廠牌無誤（MB 10-24／維基 10-25）。curatorRisk「質地偏乾淨」成立：合成器耳語、Auto-Tune、Drumma Boy／Dan Electric 製作，〈Tears On My Pillow〉被形容陰沉帶打擊感，〈Money〉仿 Prince、〈Play〉跨曲風——moodGuess 存疑（z 0.9 缺證據、非整張慢板）。專輯原名《Milk & Honey》，錄音 2007–2011。
- 20953：Raveena《Asha's Awakening》moodGuess 存疑（curatorRisk 成立）——Pitchfork：「舞曲友善的 R&B＋撫慰抒情」，〈Kismet〉〈Secret〉〈Rush〉〈Magic〉為中板律動，維基列 disco／rock；15 首含口白、13 分半冥想與過場，真正慢歌約一半。暖與霧成立、無陰冷字眼。Coachella「首位印度裔女性」單一來源未寫。
- 20954：Sabrina Claudio《No Rain, No Flowers》基本相符：8 首 28:48，Rolling Stone 稱「接下來 28 分鐘都停在慵懶」，無舞曲無饒舌客串；質地極簡、偏乾淨，暖主要靠氣音人聲。英文維基無此專輯條目（同名條目是 Black Keys 2025），資料取自藝人條目、RS、Hofstra Chronicle、MB。2018-04 歧視性推特言論風波寫成一條 fact（早於發行、與宣傳直接相關），寫作層宜保守，主線決定寫不寫。
- 20955：Sabrina Claudio《Based on a Feeling》status thin：查無正式樂評（Pitchfork／RS／AllMusic 無），聲音只有 Interview、V Magazine、BroadwayWorld 的「感官的器樂、現場弦樂」與製作人名單。11 首全在 4 分鐘內、未見舞曲與饒舌；moodGuess 無法驗證。Grammy 提名是〈Plastic Off the Sofa〉詞作者身分（Beyoncé 專輯），已標明避免被寫成她自己得獎。
- 20956：Alina Baraz《It Was Divine》相符無推翻（首張錄音室專輯，MB 2020-04-24，Mom+Pop，16 首約 52 分）。The Floor／LOBF：全盤同一個慢—中板律動、單一取向略嫌單調，NME 批評平淡；Nas、Smino、6lack、Khalid 客串皆輕量，不改變整體慢度。暖字眼（warm、romantic chill），無陰冷字眼。
- 20957：Alina Baraz《The Color of You》**性質存疑**：維基、NME、聖地牙哥校報稱 EP（9 首約 31 分），FADER 稱 nine-track project，MB／LOBF 當專輯。建議主線裁定是否收 EP；不收則汰換（同藝人 It Was Divine 已在本批）。status thin（無正式樂評與製作人名單，僅 FADER 預告式描述），moodGuess 無聲音樂評可驗。年份 2018-04-06、Mom+Pop 無誤。
- 20958：Celeste《Not Your Muse》moodGuess 存疑（curatorRisk 成立）——〈Love Is Back〉銅管中快板、〈Stop This Flame〉鋼琴 vamp「floor-filling」、〈Tonight Tonight〉流行耳蟲，LOBF 稱有 glitter-funk／rollicking neo soul；12 首約四首非慢歌。厚暖（弦樂、銅管、煙嗓）成立，無陰冷字眼。藝人名與池中 Celeste Legaspi 撞名（維基條目為 Celeste (singer)）。Mercury 2021 與 Brit 2021 皆只入圍，已逐項標明。
- 推翻策展層：無年份／廠牌／盤名推翻；性質存疑 1（Color of You EP）。WebSearch 共用 6 次（Goapele 1、Sabrina 2、Alina 2、Celeste 1），另用 Wikipedia raw、MB API、樂評頁直連。

## 研究 b 組
- 20931：Vesta Williams《Distant Lover》moodGuess 存疑：10 首翻唱含 Withers〈Use Me〉、Babyface〈Whip Appeal〉、Sly Stone〈If You Want Me To Stay〉等有律動的中板，非整張慢歌；來源（SoulTracks Rizik）只稱製作「低調、不機械」，無弦樂墊或厚低頻佐證，z 1.5 恐偏高。年份廠牌相符（MB 2007-01-30、Shanachie SH 5764）。
- 20932：Oleta Adams《Circle of One》curatorRisk 回覆：真樂手（Palladino 貝斯、Cushon 鼓、Hammond、銅管）＋Real World 錄音室，質地不算英式數位乾淨；但開場〈Rhythm of Life〉與標題曲有 Orzabal 的 Fairlight 編程、〈I've Got a Right〉有銅管與 sax solo，非整張慢歌（moodGuess 輕度存疑）。歐洲版 1990-05-14／美國 1990-06-19 兩日都寫進 facts；1991 登頂英國榜為重發版，已標明。
- 20933：Oleta Adams《Evolution》moodGuess 存疑：Stewart Levine 製作的洛杉磯棚內名手路線（Sanborn／Tom Scott 薩克斯風、Landau 吉他），Wikipedia 標 jazz／soul，近 smooth jazz 邊緣；弦樂墊是 Zigman 的合成器編程而非真弦樂；4、7、11、12 號含 drum programming。偏暖成立、厚度與陰冷無證據。日期只寫「1993 年夏」（Wikipedia 07-26 與 MB 08-15 不一致）。
- 20934：Oleta Adams《Moving On》moodGuess 輕度存疑：來源明講轉向「更直接的 R&B」，Benford 兩首（Never Knew Love、Once in a Lifetime）以 drum programming 為主，非全慢；無饒舌客串、無取樣記載。盤名以 MB「Moving On」為準（Apple「Movin' On」）。葛萊美為入圍未得（第 39 屆最佳 R&B 專輯）。
- 20935：Oleta Adams《All the Love》status thin：無獨立百科頁、AllMusic 403，聲音僅 Wikipedia 一句「回到 R&B／成人當代」加 Discogs 製作人與錄音地點（Ricky Peterson 7 首、Peter Wolf 3 首、Oleta 2 首；Simi Valley／Minneapolis／Lenexa）。弦樂、殘響、低頻查無來源，卡單「鋼琴弦樂，暖」未獲支持也未被推翻。年份 2001（荷蘭 BMG）／2002（美國 Pioneer），卡單 2001 成立。曲目含 Lee Ann Womack 的〈I Hope You Dance〉與基督教詞曲圈歌曲。
- 20936：Lisa Fischer《So Intense》**moodGuess 重大存疑，建議汰換或降級**：〈Save Me〉登美國舞曲榜第 2 名（Albumism：primal、heat turned up）、〈So Intense〉被稱 pop-framed、〈Some Girls〉與〈So Tender〉含饒舌段落（Albumism 與搜尋摘要一致）、Walden 三首是明亮流行 R&B、Marcus Miller／Vandross 的〈Get Back to Love〉偏 funk；只有〈How Can I Ease the Pain〉、〈Send the Message of Love〉、〈Last Goodbye〉等少數慢板。弦樂僅 Arif Mardin 那首可能有。符合「舞曲單曲＋饒舌客串」的剔除條件。
- 20937：Miki Howard《Love Confessions》curatorRisk 回覆：確為 80s 數位 R&B（Marc Gordon drum programming、鐘聲、合成器），但〈You've Changed〉為單簧管＋弦樂爵士編制，Rolling Stone Album Guide 稱爵士面最佳、The Gazette 稱「深夜靈魂」，偏暖成立（輕度存疑，慢歌占比無曲速資料）。Wikipedia 內部矛盾：〈That's What Love Is〉名次兩頁不一致，facts 只寫一致的〈Baby, Be Mine〉R&B 第 5 名。發行日 10-26／11 月不一致，只寫「1987 年秋」。
- 20938：Phyllis Hyman《Forever With You》moodGuess 輕度存疑：身後遺作集，Wikipedia 明講含 smooth jazz 取向與 uptempo 曲目，多位製作人（Wansel、Martinelli、Eastmond、Hawes、Sigler、Gamble & Huff），鍵盤與 drum programming 質地與真弦樂（Jack Faith 編弦）並存；非整張慢歌。身後專輯事實已依「作品直接綁定」寫，辭世細節克制不寫。
- 20939（空）、20940（空）。
- 推翻策展層：無年份／廠牌／盤名推翻；So Intense 推翻「大抒情慢歌」整體判斷（建議汰換）；Vesta、Evolution、All the Love 為輕度至中度存疑。身分釘住 8/8 一致。WebSearch 共用 3 次（Vesta、Fischer、Oleta CoO），另用 Wikipedia raw、MB API、Discogs API、SoulTracks／Albumism 抓取。

## 主線：研究後汰換（不佔條號）
- 研究五組 37 張，照 ml49／ml52 結論（中板照樣落格，只擋舞曲、饒舌客串／hip-hop 硬拍、smooth jazz、乾淨翻唱、陰冷）汰 18（卡單、研究稿、`pick.json` 同步移除）：
  - 舞曲單曲／new jack／饒舌客串／hip-hop 鼓與取樣（判躁）：Vesta《Special》（New Jack Swing、Mr. Lee 饒舌）、《Everything -n- More》（New Jack Swing／Hip Hop、Daddy-O 製作）、Kelly Price《Kelly》（house 取樣舞曲、溜冰 funk）、Lisa Fischer《So Intense》（〈Save Me〉舞曲榜第 2、兩首饒舌段）、Chanté Moore《Exposed》（Jermaine Dupri 執行製作、Da Brat 客串、快歌主打）、《Moore Is More》（自述 aggressive, happy, bubbly）、Marsha《Nyla》（trap 鼓、銅管快歌）、《Casablanco》（Dr. Dre 嘻哈鼓與取樣）、YEBBA《Dawn》（A$AP Rocky、Smino 客串）、Goapele《Break of Dawn》（Auto-Tune、Drumma Boy 電子、brooding）。
  - smooth jazz／名手爵士電台路線（判輕）：Vesta《Relationships》（Lee Ritenour 製作）、Oleta《Evolution》（Sanborn、Tom Scott、合成器弦樂）。
  - 乾淨翻唱集（Lattimore《Timeless》先例判輕）：Vesta《Distant Lover》。
  - 冷／數位：Lalah《Honestly》（trap 鼓、16 位元合成器、樂評稱暗沉）、Quadron（樂評「數位而冷」、Motown 快拍）。
  - 場景不符：Shara Nelson《What Silence Knows》（pop-soul，主打 dance-pop）。
  - 類型：Kelly Price《This Is Who I Am》（教會現場福音盤）、Alina Baraz《The Color of You》（多數來源稱 EP，9 首 31 分）。
- 留下但存疑、交評分裁定：Kelly Price《Mirror Mirror》（Method Man 客串一首、R. Kelly 製作）、《Priceless》（Stevie J 兩首嘻哈拍，整體老派暖）、Goapele《Change It All》（一首饒舌客串）、Celeste《Not Your Muse》（慢歌約六成）、Raveena《Asha's Awakening》（慢歌約一半）、Leela James 兩張（慢歌占比未證）、Oleta《Circle of One》《Moving On》《All the Love》、Miki Howard《Love Confessions》、Phyllis Hyman《Forever With You》（遺作集，MB Album）。
- 研究推翻照研究稿：Vesta《Relationships》廠牌 Ichiban→i.e. Music（隨汰換結案）；Syleena 年份 2001 維持；Aisha 年份 1987 維持（來源 1986–1988 不一，facts 不寫年份）；Quadron 隨汰換結案。
- 剩 19，叫回策展代理補第二輪候補（避開上列汰換型態）。
- 第二輪策展補 5（Love Unlimited《From a Girl's Point of View》、Jah9《New Name》《9》、Alex Isley & Jack Dine《Marigold》、Alice Smith《She》）；跨分支去重撞 ml53 卡單 3 張（Marigold 讓 ml53；Lalah《Honestly》、YEBBA《Dawn》本批已汰）→ 補 4，卡單 23（a 4、b 5、c 4、d 6、e 4），派一支補研究 append 進 a／c／e。
