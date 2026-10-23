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

## 研究補位（a／c／e 組）
- 20929：Love Unlimited《From a Girl's Point of View We Give to You》（a）——聲音合恍惚：AllMusic 稱「最溫暖的製作環境之一」「鼓被馴成中速慢爬」，Barry White 製作、Gene Page 編曲；9 首 36 分 18 秒，無舞曲單曲或饒舌客串（單曲〈Walkin' in the Rain〉為中板電話對白）。不給存疑。年份 1972、廠牌 Uni 與卡單相符；Apple 查無，證據用 MB＋維基。8 條 facts，full。
- 20930：a 組補位小結——無推翻年份、廠牌、盤名；逐首速度無來源（〈Together〉3:10、〈Another Chance〉2:51 較短），不影響判定。AllMusic、Q 內容經維基轉述。
- 20949：Jah9《New Name》（c）——Rory Gilligan（Stone Love 選曲人）製作，真樂手 riddim＋銅管，M&G 稱「厚重低音、包覆感的節奏」，色溫暖；Protoje 為 singjay 非饒舌，Cedric Myton 客串〈Taken〉。逐首速度未證、無弦樂，故 dub 回音只部分有證，不給存疑。廠牌 Rorystonelove（MB）吻合卡單，維基 Jah9 條寫 VP Records，不採。9 條 facts，full。
- 20950：c 組補位小結——年份 2013 無誤；Reggaeville、AllMusic 403，改用 Rebelbase、Jamaica Observer、Mail & Guardian。
- 20966：Jah9《9》（e）moodGuess 部分存疑——「bass-driven」只見於搜尋摘要轉述的宣傳稿，VP 官方稿與 United Reggae 皆未提低音或速度；United Reggae 的「challenging」可能偏冷峻。長曲結構（七首逾 5 分鐘、一首 9 分）支持靜重。Vaughn Benjamin（Akae Beka）為唯一客串。年份 2016、廠牌 VP 吻合。8 條 facts，thin（無獨立樂評談聲音）。
- 20967：Alice Smith《She》（e）moodGuess 存疑——Compulsive Reader 逐首：快或重拍者〈Cabaret〉〈Another Love〉〈Shot〉〈Fool for You〉，標題曲激烈；慢板抒情僅〈Ocean〉〈The One〉〈Loyalty〉〈With You〉〈Be Easy〉約四成五。y 0.9 偏靜，建議評分時降 y 或汰換。色溫偏暖：「haunting」僅 SoulTracks 一處且只形容中板，其餘為 sweet and bright、warm strings、soothing，不陰冷。8 條 facts，full。
- 20968：推翻策展層——Alice Smith 卡單 label「Self-released」不精確：Fader 為 Rainwater／Thirty Tigers，MB 為 RainWater Recordings Inc.；建議卡單改 RainWater Recordings。「被唱片公司退件」未在可開來源找到，facts 與 hook 不依賴，寫作層勿寫成退件。
- 20969：Jah9 兩張 facts 中的 Vaughn Benjamin＝Akae Beka 依 United Reggae；「Midnite 主唱」一語查無第二來源，未寫。
- 20970：來源限制——WebSearch 用 3 次（Alice Smith、New Name、9）；英文維基 API 被限流（429），改用 WebFetch／MB API；SoulTracks、Reggaeville 403，SoulTracks 引句取自搜尋摘要。qa-batch research 全通過。
- 補研究後汰 1：Alice Smith《She》（逐首四首快板／重拍、標題曲激烈，慢歌約四成五）。Love Unlimited、Jah9 ×2 留下（Jah9《9》thin，交評分）。**定案 22 張**（a 4、b 5、c 4、d 6、e 3），候補用罄、不湊數。

## 鉤子層（d、e）
- **20976** 交件：`desc-tools/batches/hooks/add-20261023-ml55-hooks-d.json`（6）、`-hooks-e.json`（3），key 逐字照研究稿、順序不變。公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin 上限 170（d4 Based on a Feeling、e2 High Priestess、e3 9）。逐筆（預算／hook 加權／hook 原始字元）：d1 Change It All 229／24／29、d2 Asha's Awakening 229／23／26、d3 No Rain, No Flowers 222／16／16、d4 Based on a Feeling 167／17／17（thin）、d5 It Was Divine 229／23.5／26、d6 Not Your Muse 218／21／21、e1 Cheers to the Fall 210／22.5／30、e2 High Priestess 169／20／27（thin）、e3 9 167／20／27（thin）。初稿 8 張超標，整格捨去：Goapele 的 Sa-Ra／Mumia 訪談、〈Closer〉隱藏曲、Columbia 體系第一張；Raveena 的一夜寫成、受訓上千年、進大廠第一張；Sabrina 的壓軸曲長；Alina 的 19 歲搬洛杉磯、16 首 52 分、客串名單、Galimatias 的國籍（hook 已帶「丹麥製作人」）、美國專輯總榜第 43 名、2016 簽約；Celeste 的首週銷量、原訂日期、錄音城市、Mercury 入圍；Andra 的 Buskin／YouTube、Moog、〈Rise Up〉白金；Aisha 的 8 首 33 分、Macka Dub、曲名；Jah9 的合作者名單、VP、九分鐘心靈旅程。壓完回核：hook 依賴全在 g1／g2（Goapele 的《Soul Train》放 g1、標時序；Andra 的商場一事放 g1；Aisha 的 sound system 只在 hook，note 第二句以雙親領句承接）。hook 自驗改兩處：Raveena 原稿「旁遮普公主」——facts 是「來自 1600 年代旁遮普、後來成為外星球的公主」，改「主角來自 1600 年代的旁遮普」；Alina 原稿「出道的起點」無來源，改成只寫〈Drift〉是替丹麥製作人的器樂曲填詞。Andra hook 補「當時的」（facts 原文）。
- **20977** 骨架歸屬（9 張 9 條；只有擁有者寫歸屬句）：d1＝上電視宣傳碰上節目終點；d2＝虛構角色的概念專輯；d3＝前後兩半結構的敘事盤；d4＝沉寂兩年後以一句話命名回歸；d5＝網路遠距合作出道、多年後才首張全長；d6＝首作登頂打破多年空窗；e1＝被前輩名人家眷發掘；e2＝sound system 家庭出身；e3＝數字概念（9）。媒體名與媒體榜單名次不進 note（樂評一律「樂評說／樂評聽見」；BBC Sound of 2020、媒體星等皆未指派）；排行只寫英國專輯榜（Celeste）。Sabrina Claudio 2018 年推特言論那條這一格不寫（兩張 note 皆未指派）。hook 四型：懸疑 d2、d4／斷言 d3、d5、d6、e3／場景 d1、e1、e2。
- **20978** 同人分軸與「她」引入法：Sabrina Claudio ×2——d3 帶製作細節（一個半月、SadMoneyMusic、28 分 48 秒、鍵盤貝斯與〈Naked〉節拍），第二句以年齡領句（14 歲上傳 YouTube）；d4 帶生平（與舊團隊不合、兩年沒進錄音室、盤名由來），第二句以師承領句（外公教吉他與和聲）。兩張都避開已上架 About Time 的「古巴與波多黎各裔的邁阿密歌手」、Truth Is 的「另類 R&B 歌手」「11 首都短於 4 分鐘」。Jah9 ×2 跨組——e3《9》帶錄音結構（數字 9、自任製作、長曲、唯一客串），第二句以瑜伽老師身分領句、補京斯敦與 jazz on dub；生平（蒙特哥灣出生、牧師之家、詩人出身）與 Rory Gilligan／Stone Love 留給 c 組《New Name》。Goapele 避開已上架 Even Closer 的「南非流亡者社群」「Closer 賣 5000 張」，改以名字含意領句；Raveena 避開 Lucid 的「旁遮普錫克教移民」。Celeste、Aisha 依派工：第二句交代哪裡人、什麼樂種（Celeste：生於加州、三歲移居布萊頓附近、爵士與復古靈魂；Aisha：雙親來自牙買加、生於伍爾弗漢普頓、roots reggae）。Aisha 發行年 note 寫「這一格不寫」（研究層 1986–1988 未定）。
- **20979** 第二句句型配表：d1 名字含意、d2 專輯序數、d3 年齡、d4 師承（外公）、d5 偶像（聽 Amy Winehouse 長大）、d6 遷居（生於加州、三歲移居英國）、e1 教會出身、e2 雙親、e3 身分（瑜伽老師）——對 a–c 交件後重配一輪：原 e1 本名撞 c Leela 本名、d4 親屬撞 c Jah9 親屬、d5 生年／d6 出生地撞 c Mica「生年與出生地」，皆已改。「日」後一字：d1 經、d2 掛、d3 見、d4 重、d5 總、d6 便、e1 登、e3「。」（hook 句末）；e2 不寫日期。原 d1 交撞 a Syleena、e1 面撞 a Priceless、d6 上撞 c Fall for You，已改；與 a 由／面／交、b 問、c 推／在／上／亮互異。開頭前四字對全 hooks 目錄互異（初稿「出道那首」撞 c79-a，已改）。
- **20980** 自查與腳本：hook 之間中文 4-gram 對全批 22 張 0 條；本組 hook 對全批 note 0 條（初稿 Jah9「在年月日」對 a Syleena、Sabrina「一首接一首」對 Alina note，已改）；本組 note 之間扣掉固定指派句後 0 條（初稿「樂評說她」「錄音室專輯」「領句寫在」已改）。對其他批 hook 的泛用殘片「進錄音室」×37、「首接一首」×5、「歲那年她」×3、「首張專輯」×12 已全部改字避開。hook 與 note 無逐字重複句（Goapele、Raveena、Andra 的 g1 改寫成不重述 hook）。note 無否定校對痕跡、無媒體名與媒體榜單名次、無星等。`node qa-batch.mjs hooks add-20261023-ml55`：全部通過 ✓（5 組 22 張）；`node chk-hook-crossgroup.mjs add-20261023-ml55`：全部通過 ✓（hook 加權 16–24、note 165–232）。輔助腳本：scratchpad `hook-ml55-de/ml55de-chk.mjs`、`build.mjs`。

## 鉤子層（a–c）（20971–20975）
- **20971** 交件：`desc-tools/batches/hooks/add-20261023-ml55-hooks-a.json`（4）、`-b.json`（5）、`-c.json`（4），key 逐字、順序同研究稿（定案 22 張中的 13 張）。公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin（All the Love）上限 170，其餘 230。逐筆（預算／hook 加權／hook 原始字元）：Mirror Mirror 216／22／25｜Priceless 200／21／30｜Chapter 1 230／22.5／29｜From a Girl's Point of View 228／21／27｜Circle of One 230／20／24｜Moving On 230／23.5／26｜All the Love（thin）161／18／18｜Love Confessions 214／20／27｜Forever With You 222／21／29｜Whisper a Prayer 196／17／17｜Loving You More 223／17.5／23｜Fall for You 213／20／29｜New Name 230／24／30。初稿 13 張全超標（最高 297），整格捨去：Kelly《Mirror》的 T-Neck 訴訟（派工：爭議事件這一格不寫，轉廠改用 Island／Def Jam 合併）、製作人陣容、Method Man、〈As We Lay〉葛萊美（入圍骨架歸 Moving On）；《Priceless》的兩度延期、Faith Evans、18 首 71 分、總榜第 10 名；Syleena 的 Syl Johnson 之女（ml52《Chapter 2》已用作 hook 與骨架）、R. Kelly 慈善場與主打、原訂 2000 年；Love Unlimited 的 Larry Nunes、金唱片、Glodean 嫁 White；Circle 的堪薩斯城酒吧被發掘（讓給 e1 被名人家眷發掘骨架，只留客席當第二句）、Palladino；Moving On 的〈Rhythm of Life〉重錄、《Two Rooms》；All the Love 的製作人分配、三地錄音、〈I Hope You Dance〉；Miki 的多棚拼接（ml52 八間錄音室骨架）、Levert 對唱、深夜沙發評語；Phyllis 的製作人名單、Gamble 內頁、2014 重發、辭世日期；Mica 的 Tamia 翻唱、單曲名次；Loving 的曲數曲長；Fall 的年終榜、總榜第 69 名、10 首 37 分；New Name 的樂手名單、法國 iTunes 名次、發表會、樂評年度前三預測、「jazz on dub」稱號（e3《9》第二句已用）。壓完回核 hook 依賴全在 g1／g2；hook 事實自驗：Priceless「木吉他」＝facts 原音吉他、Fall「打頭陣」＝〈Say That〉2013 年早於專輯、Mica「約兩年」＝facts「兩年左右」、Love Unlimited「快一年」＝「將近一年」。
- **20972** 骨架歸屬（13 張 13 條，只在擁有者 note 寫歸屬句）：Mirror＝母公司合併改掛子廠牌、首度打進總榜前十；Priceless＝搖滾名家客串一段吉他＋廠牌末張；Chapter 1＝單曲連上公益熱線（家暴題材標「語氣平實」）；Love Unlimited＝製作人把素人排練成團；Circle＝戰時家屬把歌當主題曲、重發後登頂（標時序）；Moving On＝換製作人轉向直接 R&B、短暫上榜卻入圍葛萊美；All the Love＝異國改名重發（標時序）；Love Confessions＝R&B 盤裡的單簧管爵士老歌；Forever With You＝身後對唱（人聲重錄一半；池中《I Refuse to Be Lonely》已用「遺作上架」，本張不走遺作本身，辭世只寫年份、語氣克制）；Whisper a Prayer＝懷孕延宕錄音；Loving You More＝第二度整張致敬前輩；Fall for You＝對唱單曲先行；New Name＝音響系統選曲人製作首張（與 e2 sound system 家庭出身分開）。hook 四型：懸疑（All the Love、Forever With You、Fall for You）／斷言（Mirror、Moving On、Whisper a Prayer、Loving You More）／場景（Chapter 1、Circle、Love Confessions）／人物定調（Priceless、Love Unlimited、New Name）。媒體名與媒體榜單名次不進 note（樂評一律「樂評說／樂評認為／被比作」）；排行只寫英美專輯榜、美國單曲榜、R&B 單曲榜、R&B 專輯榜，Billboard 字樣不寫；星等分數 0。
- **20973** 同人分軸與「她」引入法：**Oleta Adams ×3**——Circle 帶生涯走紅（Real World 製作、第 49 名到重發登頂、〈Get Here〉），hook 以歌名起、第二句「客席」（替 Tears for Fears〈Woman in Chains〉獻聲）；Moving On 帶製作轉向（Benford、Powell、drum programming、Paul Riser 弦樂），hook 用「它」、第二句「作曲欄」（寫六首、首度製作兩首）；All the Love 帶版本流傳（2004 年 Wavemusic 改名），第二句「樂器」（以鋼琴為主要樂器的靈魂女中音）。**Kelly Price ×2**——Mirror 帶生涯與成績（合併轉廠、第 5 名、白金、Zigman 弦樂），hook「她」、第二句「前作成績」；Priceless 帶錄音細節（Clapton、Clark Sisters、老派樂句），hook 無代稱、第二句「廠牌關係」（Def Soul 最後一張）。兩張避開已上架《Soul of a Woman》的「1973 年生於皇后區」「Mariah Carey 和聲」。**Leela James ×2**——Loving 第二句「出道經歷」（2000 年與 The Roots 合唱）、Fall 第二句「掛名欄」（兼任執行製作）。**Jah9 ×2 跨組**——New Name 帶生平與製作人（詩作經歷、Rastafari、Rory Gilligan），第二句「詩作經歷」；《9》（e3）帶數字結構，第二句瑜伽老師（d／e 側已配），兩張互不點名。其餘第二句：Syleena「樂評比擬」（避 ml52 親屬／出生地）、Love Unlimited「編制」（避池中 San Pedro、「替 White 唱和聲」）、Miki「巡演經歷」（避池中 1960 芝加哥、福音父母、Side Effect、Holiday）、Phyllis「成長地」（匹茲堡；避池中女低音＋費城出生、東尼獎）、Mica「生年」。13 種與 d／e 的名字含意／序數／年齡／師承／偶像／遷居／教會出身／雙親／瑜伽老師互異。
- **20974** 「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：Mirror 由、Priceless 面、Chapter 1 把、Forever With You 問、Whisper a Prayer 推、Loving You More 在、Fall for You 出、New Name 亮；其餘五張只寫到年或季（Circle、Moving On、All the Love、Love Confessions、Love Unlimited）。與 d／e 的經／掛／見／重／總／便／登互異（d／e 交件後本側把 Chapter 1 交→把、Fall 上→出，Priceless 維持面）。
- **20975** 自查與腳本：開頭前四字對全 hooks 目錄互異（初稿 Priceless「Eric」撞 c50b 已改）；hook 之間中文 4-gram 本組 0、對 d／e 0、對全批 note 0（初稿 Circle「替她製作」對 New Name 已改）；對他批 hook 只剩專名／術語「專輯總榜」×1、「波灣戰爭」×1、「音響系統」×3（初稿「一首談家暴」撞 ml49 Intro、「她第一次」×3、「將近一年」×2、「旅館酒吧」、「了葛萊美」×2、「換了名字」×3、「同樣十二」×2、「單簧管與」、「第三張的」×2 已改）；hook 與自卡 note 無逐字重複句。note 之間（扣固定指派句）剩榜名殘片與「首約分鐘」×2，交寫作層；「靈魂歌手」×4、「的第二張」×3、「最後一張」×2、「她與製作」、「牙買加歌手」對 e3 已改。`node qa-batch.mjs hooks add-20261023-ml55`：全部通過 ✓；`node chk-hook-crossgroup.mjs add-20261023-ml55`：全部通過 ✓（5 組 22 張，hook 加權 16–24、note 167–232；只報不擋：Love Unlimited 的「沒有職業演唱經驗」是內容，不是校對痕跡）。輔助腳本：scratchpad `hook-ml55-abc/ml55-abc-measure.mjs`。

## 寫作層（writer-2）（20986–20990）
- **20986** 交件：`desc-tools/batches/output/add-20261023-ml55-out-2.json`（11 張，key 逐字同序）。字數：Fall for You 213｜New Name 234｜Change It All 237｜Asha's Awakening 237｜No Rain, No Flowers 212｜Based on a Feeling 166（thin）｜It Was Divine 237｜Not Your Muse 221｜Cheers to the Fall 217｜High Priestess 157（thin）｜9 176（thin）。初稿 Asha's Awakening 242，整格縮短概念圖一句（「再交給合作者發想聲音」）壓回。
- **20987** 第二句照鉤子層配表（20979／20973）：掛名欄（Leela）、詩作經歷（Jah9 New Name）、名字含意（Goapele）、專輯序數（Raveena）、年齡（Sabrina 14 歲上傳）、師承外公（Sabrina 第二張）、偶像 Amy Winehouse（Alina）、遷居（Celeste）、教會出身（Andra）、雙親（Aisha）、瑜伽老師（Jah9《9》）。hook 代稱具名：〈Say That〉、Rory Gilligan、Asha、Galimatias、Kai Millard（Andra 那張）。
- **20988** 依派工：媒體名與媒體榜單名次整句不寫（樂評一律「樂評說／樂評聽見」）、無「據說／據傳」；Sabrina Claudio 2018 推特言論、Kelly 類訴訟不涉本組，一律未寫；Aisha 發行年不寫；直接引語（Andra「以靈魂樂寫成的自傳」、Sabrina 盤名由來）轉間接敘述；Goapele 上《Soul Train》標時序（離出片約半年）。
- **20989** 日期配表（前一字／後一字）：Fall 在隔年…出、New Name 名／亮、Goapele 張／經、Raveena 品／掛、No Rain 盤／見、Based on a Feeling 寫／重、Alina 長／總、Celeste 到／便、Andra 人／登；Aisha 不寫日期、《9》日期只在 hook。
- **20990** 自掃：本組 + out-1 已交 5 張合掃，中文 4-gram 2 張以上只剩 `替她製作`（New Name hook 原文 × out-1 Circle of One），寫作層無權改 hook，交 writer-1／主線改 Circle 正文。初稿殘片已拆：`在京斯敦`、`首張專輯`、`是她的第`、`的第二張`、`張錄音室作品`；對他批 ml／mc out 的泛用樣板 `在年月日`×29、`輯年月日`×22、`首張專輯`×31、`長達分秒`×17、`超過分鐘`×13、`唱片年月`×19 已改字避開。`qa-batch out`：out-2 11 張 157–237、>260 0、thin ≤180 ✓（總張數 16 vs 22 為 out-1 未完）；`qa-check-research` 標記 0；`fix-spacing` 待補 0。輔助腳本：scratchpad `wr-ml55-2/ml55w2-descs.py`、`ml55w2-emit.py`。

## 寫作層（writer-1）（20981–20985）
- **20981** 交件：`desc-tools/batches/output/add-20261023-ml55-out-1.json` 11 張（full 10：193–234；thin 1：All the Love 158）。逐張：Mirror Mirror 227｜Priceless 211｜Chapter 1 205｜Love Unlimited 231｜Circle of One 224｜Moving On 234｜All the Love 158（thin）｜Love Confessions 201｜Forever With You 221｜Whisper a Prayer 193｜Loving You More 223。先列預算再動筆，初稿 0 張出界、無回頭刪節。`qa-batch out`：全部通過；`qa-check-research`：標記 0；`fix-spacing`：待補 0。
- **20982** 第二句全照鉤子層 20973 配表（前作成績／廠牌關係／樂評比擬／編制／客席／作曲欄／樂器／巡演經歷／成長地／生年／出道經歷）。「日」後一字照 20974：Mirror 日由、Priceless 日面、Chapter 1 日把（日期改以句首領句、前一句尾字「手」，避開 note 原文的「在年月日」）、Forever 日問、Whisper 日推（前一句尾字改「己」，避開 writer-base 已列的「場年月日」）、Loving 日在。
- **20983** 只寫 note：派工加註的兩條照辦——媒體名與媒體榜單名次整句不寫（樂評只留「樂評說／樂評認為／樂評稱讚」，不具名）；爭議事件（Kelly Price 對 T-Neck 的訴訟）不寫。Priceless note 只有四項、hook 已講完 Clapton，初稿「搖滾吉他名家只在這一段現身」「福音姊妹團」兩處 note 外推論，自查時拿掉，改以 note 內的 Clapton 收尾句與壓軸翻唱撐到 211。Circle of One 不寫「翻唱」二字（note 未列），只寫〈Get Here〉英美名次；Mirror Mirror 的「最高第 5 名」靠 hook 的「專輯總榜」交代是哪個榜。
- **20984** 自掃（han() 中文 4-gram）：本檔 11 張之間 0 條；對 writer-2 hooks＋notes 先行合掃改掉「替她製作」（撞 New Name hook，Circle 改「操刀」）、「的第二張」「第二張專」（撞 Raveena）、「張專輯年」「片年月日」（日期前一字）、「登上英國」「英國專輯榜」（撞 Celeste／本組 Moving On↔Whisper，改「英國第 59 名」「專輯在英國最高第 20 名」「衝上英國榜首」）、「單曲榜第」（Love Unlimited↔Love Confessions，後者改「單曲排行」）、「這是她第」（Mirror↔Loving）、「作年月日」（Whisper↔No Rain 的 note）。writer-2 交件後對 out-1＋out-2 兩檔 22 張合掃：0 條 2 張以上的共用 4-gram。
- **20985** 轉述引導詞、「也就是」、平台名、媒體名 grep 0。Love Unlimited 的「原本沒有職業演唱經驗」照 note 寫（20975 已判為內容、非校對痕跡）。輔助腳本：scratchpad `wr-ml55-1/ml55w1-len.mjs`（字數＋hook 首句＋跨檔 4-gram）、`draft.py`。

## 主線審稿（2026-10-23，雲端主線，22 張逐張讀過、對回研究稿）
- **20991** `desc2:Miki Howard|Love Confessions`：刪「，樂評也認為她偏爵士的那一面最好」（單源評價句）。
- **20992** `desc2:Leela James|Loving You More... In the Spirit of Etta James`：「樂評稱讚她把 Etta 的歌重新編排過一遍。」→「她把 Etta 的歌重新編排過一遍。」（拿掉單源讚語，留兩源互證的「重新編排」事實）。
- **20993** `desc2:Sabrina Claudio|Based on a Feeling`：「2022 年 5 月 6 日重新發片。」→「2022 年 5 月 6 日發行。」（「重新發片」易誤讀為重發）。
- 其餘 19 張逐張審過，未改字；抽核：Mirror Mirror 前作破百萬、Oleta《Moving On》英美各停一週與第 39 屆葛萊美入圍、Celeste 為 Jess Glynne 以來首位、Miki Howard 替 Cameo 開場——與研究稿一致。Kelly Price 控告 T-Neck、Sabrina Claudio 推特言論皆未進正文。只改正文，hooks／input 不受影響。qa-batch out、qa-check-research（標記 0）、fix-spacing（0）重跑全過。
