# 卡池封面配對稽核報告

掃描日期：2026-08-02
資料來源：`seed_cards.json` + `apex_pool.json` 全卡池，經 worker `/spotify-search` 配對後，
以 Spotify `/v1/albums/{id}` 取回「Spotify 那一端的真實專輯」再比對。

## 規模

| 分類 | 張數 |
| --- | --- |
| 已掃描卡片 | 8180 |
| 查無此碟（無封面，非配錯） | 558 |
| Cover Art Archive 補救層接手 | 5448 |
| 有圖但無 Spotify 連結 | 1 |
| 缺 Spotify 中繼資料（未抓完） | 0 |
| **實際完成比對** | **2173** |
| 　├ 判定通過 | 1981 |
| 　├ A 高度可疑 | 116 |
| 　├ B 中度可疑 | 21 |
| 　└ C 參考 | 55 |

A＋B 佔已比對卡片的 6.30%。

## A 級：高度可疑（116 張）

| 藝人 | 卡池專輯 | 卡年 | Spotify 實際專輯 | 型別／發行 | 判定 |
| --- | --- | --- | --- | --- | --- |
| 大象體操 Elephant Gym | 夢境 | 2022 | 《大象體操：比夢境更真實》 紀錄片原聲帶 | null null | 長名包短名 +16字 ×9.00 |
| 李宗盛 | 生命中的精靈 | 1986 | 李宗盛作品精選1生命中的精靈 | null null | 長名包短名 +8字 ×2.33 |
| 康士坦的變化球 Constant & Change | 更迭 | 2020 | 更迭 | null null | 藝人不符：KST |
| 陳建年 | 海洋 | 1999 | 海洋音樂創作專輯 | null null | 長名包短名 +6字 ×4.00 |
| 董事長樂團 The Chairman | 眾神護台灣 |  | 眾神護台灣 (黑膠版) | null null | 長名包短名 +3字 ×1.60 |
| 蘇打綠 sodagreen | 冬 未了 | 2015 | 冬 未了（蘇打綠版） | null null | 長名包短名 +4字 ×2.33 |
| Anthony Braxton | In the Tradition | 1974 | In The Tradition Vol. 1 | null null | 長名包短名 +4字 ×1.29；續作編號不同（多出「vol1」） |
| Art Pepper | Art Pepper + Eleven | 1959 | Art Pepper + Eleven: Modern Jazz Classics | null null | 長名包短名 +18字 ×2.20 |
| Ash Ra Tempel | Ash Ra Tempel | 1971 | Ash Ra Tempel (Mixed Tracks) | album 1971-07-01 | 長名包短名 +11字 ×2.00 |
| Average White Band | AWB | 1974 | AWB R&B | null null | 長名包短名 +5字 ×2.67 |
| Beyond | 秘密警察 | 1988 | 秘密警察 (正東 10 x 10 我至愛唱片) | null null | 長名包短名 +12字 ×4.00 |
| BIGBANG | BIGBANG2 | 2011 | THE BEST OF BIGBANG 2006-2014 | null null | 長名包短名 +16字 ×3.00；Spotify 名帶精選輯標記 |
| BMX Bandits | C86 | 1989 | C86 / Star Wars | null null | 長名包短名 +8字 ×3.67；疑似兩張併一片的合體盤（名稱含 /） |
| Britney Spears | Glory | 2016 | Glory : Japan Tour Edition | null null | 長名包短名 +16字 ×4.20 |
| Chapterhouse | Whirlpool | 1991 | Whirlpool, Before and After | null null | 長名包短名 +14字 ×2.56 |
| Charles Lloyd | Forest Flower | 1967 | Forest Flower: Charles Lloyd At Monterey (Live) | null null | 長名包短名 +22字 ×2.83 |
| Chet Baker | Chet | 1959 | My Funny Valentine: The Best Of Chet Baker | null null | 長名包短名 +30字 ×8.50；Spotify 名帶精選輯標記 |
| Chris Connor | Sings Lullabys of Birdland | 1956 | Four Classic Albums Plus (Sings Lullabys of Birdland / Chris / This Is Chris / Chris Connor) [Remastered] | null null | 長名包短名 +48字 ×3.09；疑似兩張併一片的合體盤（名稱含 /） |
| Clifford Brown & Max Roach | Clifford Brown & Max Roach | 1954 | Clifford Brown & Max Roach Quintet with Harold Land. Complete Studio Recordings | null null | 長名包短名 +45字 ×2.88 |
| Coil | Love's Secret Domain | 1991 | Love's Secret Domain (30th Anniversary 2021 Remaster) [Bonati] | null null | 長名包短名 +33字 ×2.94 |
| Current 93 | All the Pretty Little Horses | 1996 | All the Pretty Little Horses (The Inmost Light) | null null | 長名包短名 +14字 ×1.58 |
| Darius | Darius | 1969 | Darius Lim: Songs of Dreams | null null | 長名包短名 +16字 ×3.67 |
| Das Ding | H.S.T.A. | 2009 | H.S.T.A. LP | null null | 長名包短名 +2字 ×1.50 |
| Dead Kennedys | Plastic Surgery Disasters | 1982 | Plastic Surgery Disasters/In God We Trust, Inc. | null null | 長名包短名 +15字 ×1.65；疑似兩張併一片的合體盤（名稱含 /） |
| Dexter Gordon | Go | 1962 | Dexter Gordon-Live At Carnegie Hall | null null | 長名包短名 +10字 ×6.00 |
| Dion | Born to Be with You | 1975 | Born to Be With You / Streetheart | album 1976-01-01 | 長名包短名 +11字 ×1.73；疑似兩張併一片的合體盤（名稱含 /） |
| Duke Ellington | Ellington at Newport | 1956 | Ellington at Newport 1956 (Complete) | null null | 長名包短名 +12字 ×1.67 |
| Duke Ellington | At Newport | 1956 | Ellington At Newport: The Original Album | null null | 長名包短名 +25字 ×3.78 |
| Essential Logic | Beat Rhythm News | 1979 | Beat Rhythm News (Waddle Ya Play?) | null null | 長名包短名 +12字 ×1.86 |
| Frank Sinatra | Songs by Sinatra | 1947 | Christmas Songs by Sinatra | null null | 長名包短名 +9字 ×1.64 |
| Freddie King | Getting Ready... | 1971 | Getting Ready... (World) | album 1971 | 長名包短名 +5字 ×1.42 |
| Fugazi | Repeater | 1990 | Repeater + 3 Songs | null null | 長名包短名 +6字 ×1.75 |
| Garbage | Garbage | 1995 | Garbage Garden | null null | 長名包短名 +6字 ×1.86 |
| Glenn Branca | The Ascension | 1981 | The Ascension: The Sequel | null null | 長名包短名 +9字 ×1.75 |
| Gong | You | 2021 | Your little flaws that attract me | single 2026-03-15 | 長名包短名 +25字 ×9.33；藝人不符：GAFANIO GONGKIE |
| Grateful Dead | Workingman's Dead | 1970 | Workingman’s Dead (2023 Mickey Hart Mix) | null null | 長名包短名 +17字 ×2.13 |
| Guy Clark | Old No. 1 | 1975 | Old No.1/Texas Cookin' | compilation 1998-06-15 | 長名包短名 +11字 ×2.83；疑似兩張併一片的合體盤（名稱含 /）；合輯且年份差 23 年 |
| Hailu Mergia | Hailu Mergia & His Classical Instrument | 2013 | Hailu Mergia & His Classical Instrument: Shemonmuanaye | null null | 長名包短名 +13字 ×1.36 |
| Henry Cow | Legend | 1973 | Cowell: 3 Irish Legends, HC 354: No. 1, The Tides of Manaunaun | null null | 長名包短名 +40字 ×7.67；藝人不符：Henry Cowell |
| Interior | Interior | 1982 | Contemporary Jazz Interiors - Modern Jazz for Refined Spaces 2026 | null null | 長名包短名 +47字 ×6.88；藝人不符：Modern Jazz Interiors Collective |
| Interpol | This Mirror Weighs a Ton | 2026 | This Mirror Weighs a Ton/See Out Loud | null null | 長名包短名 +10字 ×1.50；疑似兩張併一片的合體盤（名稱含 /） |
| INXS | INXS | 1980 | INXS Remastered | null null | 長名包短名 +10字 ×3.50 |
| Jacques Dutronc | Jacques Dutronc | 1966 | Best Of Jacques Dutronc | compilation 2009-02-23 | 長名包短名 +6字 ×1.43；Spotify 名帶精選輯標記；合輯且年份差 43 年 |
| Jeff Mills | Metropolis | 2000 | Metropolis Metropolis | null null | 長名包短名 +10字 ×2.00 |
| Jesu | Jesu | 2004 | Jesus Fashion | null null | 長名包短名 +8字 ×3.00；藝人不符：Jesus Fashion Family |
| Joe Henderson | Power to the People | 1969 | Power To The People [Keepnews Collection] (Remastered) | null null | 長名包短名 +18字 ×2.13；Spotify 名帶精選輯標記 |
| Joe Pass | Virtuoso | 1974 | Virtuoso #2 | null null | 長名包短名 +1字 ×1.13；續作編號不同（多出「2」） |
| Johnny Hodges | Back to Back | 1959 | Back To Back (Duke Ellington And Johnny Hodges Play The Blues) | album 1963-01-01 | 長名包短名 +40字 ×5.00 |
| Journey | Escape | 1981 | Live In Houston 1981: The Escape Tour (2022 Remaster) | album 2005-11-15 | 長名包短名 +24字 ×5.00 |
| Junei | Let's Ride | 2014 | Let's Ride (Mission to Mars) [Extended Version] - Single | null null | 長名包短名 +34字 ×5.25 |
| Khatia Buniatishvili | Piano Concertos nos. 20 & 23 | 2024 | Mozart: Piano Concertos Nos. 20 & 23 | null null | 長名包短名 +6字 ×1.25；藝人不符：Wolfgang Amadeus Mozart |
| King Crimson | Larks' Tongues in Aspic | 1973 | LARKS' TONGUES IN ASPIC (2023 Elemental Mixes) | album 2023 | 長名包短名 +18字 ×1.95 |
| Koenjihyakkei | Angherr Shisspa | 2005 | Angherr Shisspa Revisited | null null | 長名包短名 +9字 ×1.64 |
| Led Zeppelin | Led Zeppelin II | 1969 | Led Zeppelin III (Remaster) | null null | 長名包短名 +1字 ×1.08；續作編號不同（多出「i」） |
| Lennie Tristano | Lennie Tristano | 1956 | Lennie Tristano / The New Tristano | null null | 長名包短名 +14字 ×2.00；疑似兩張併一片的合體盤（名稱含 /） |
| Limbus 4 | Mandalas | 1970 | Mandalas | null null | 藝人不符：Odysseus Artner |
| Ludwig van Beethoven | Symphony no. 7 | 1950 | Beethoven - Symphony No. 7 And Symphony No. 8 | null null | 長名包短名 +23字 ×3.09 |
| Ludwig van Beethoven | Complete Music for Piano and Violoncello | 2004 | Beethoven: Complete Music for Piano and Violoncello | null null | 長名包短名 +9字 ×1.26 |
| Luis Alberto Spinetta | Artaud | 1973 | Presentación ARTAUD - 1973 - Teatro Astral (En Vivo) | null null | 長名包短名 +33字 ×6.50 |
| Manuel Göttsching | E2-E4 | 1984 | E2-E4 (Mixed) | album 1981-12-12 | 長名包短名 +5字 ×2.25 |
| Marvin Gaye | What's Going On | 1971 | What’s Going On: Then, Now, Always | null null | 長名包短名 +13字 ×2.08 |
| Max Roach | We Insist! | 1960 | We Insist! Max Roach's Freedom Now Suite (Remastered) | null null | 長名包短名 +24字 ×4.00 |
| MC HotDog 熱狗 | 貧民百萬歌星 | 2012 | 貧民百萬歌星 2009-2012 Best Singles Collection | null null | 長名包短名 +29字 ×5.83；雙語標題（英譯「20092012bestsinglescollection」）；Spotify 名帶精選輯標記 |
| MF DOOM | Operation: Doomsday | 1999 | Operation: Doomsday (Complete) | album 1999-10-19 | 長名包短名 +8字 ×1.47 |
| Miles Davis | Dark Magus | 1977 | Dark Magus: Live At Carnegie Hall | album 1977-01-01 | 長名包短名 +18字 ×3.00 |
| Ministry | Psalm 69 | 1992 | KE*A*H** (Psalm 69) | null null | 長名包短名 +4字 ×1.57 |
| Moby Grape | Moby Grape | 1967 | Crosstalk: The Best Of Moby Grape | compilation 2004 | 長名包短名 +18字 ×3.00；Spotify 名帶精選輯標記；合輯且年份差 37 年 |
| Morrissey | Your Arsenal | 1992 | Your Arsenal (Definitive Master) | null null | 長名包短名 +16字 ×2.45 |
| Mustafa Özkent | Gençlik İle Elele | 1973 | Mustafa Özkent Ve Orkestrası Gençlik İle El Ele | null null | 長名包短名 +23字 ×2.64 |
| Neil Diamond | Hot August Night | 1972 | Hot August Night III | album 2018-08-17 | 長名包短名 +3字 ×1.21；續作編號不同（多出「iii」） |
| Nino Rota | The Godfather | 1972 | The Godfather Part II (Original Soundtrack Recording) | compilation 1974-01-01 | 長名包短名 +6字 ×1.50 |
| No Trend | Too Many Humans | 1983 | Too Many Humans/Teen Love | album 2020-05-29 | 長名包短名 +8字 ×1.62；疑似兩張併一片的合體盤（名稱含 /） |
| NUMBER GIRL | NUM-HEAVYMETALLIC | 2002 | NUM－HEAVYMETALLIC 15th Anniversary Edition | null null | 長名包短名 +22字 ×2.38 |
| Ornette Coleman | Science Fiction | 1972 | The Complete Science Fiction Sessions | compilation 2000-05-02 | 長名包短名 +19字 ×2.36；合輯且年份差 28 年 |
| Osibisa | Osibisa | 1971 | Osibisa Selected Hits | compilation 2006-06-12 | 長名包短名 +12字 ×2.71；Spotify 名帶精選輯標記；合輯且年份差 35 年 |
| Parquet Courts | MILANO | 2017 | Milano | null null | 藝人不符：Daniele Luppi |
| Patrick Cowley | Menergy | 1981 | Menergy - The Fusion Album | null null | 長名包短名 +14字 ×3.00 |
| Peggy Lee | Black Coffee | 1953 | Black Coffee With Peggy Lee | null null | 長名包短名 +12字 ×2.09 |
| Pierre Henry | Variations pour une porte et un soupir | 1967 | Mix Pierre Henry 03.1-Variations Pour Une Porte Et Un Soupir | null null | 長名包短名 +17字 ×1.53 |
| Red Velvet | Chill Kill | 2023 | Chill Kill - The 3rd Album | null null | 長名包短名 +11字 ×2.22 |
| Ricky Nelson | Ricky | 1957 | Ricky Sings Again (Expanded Edition / Remastered) | album 1959-01-01 | 長名包短名 +10字 ×3.00；疑似兩張併一片的合體盤（名稱含 /） |
| Rihanna | Good Girl Gone Bad | 2007 | Good Girl Gone Bad: Reloaded | null null | 長名包短名 +8字 ×1.53 |
| Riz Ortolani | Sound of Christmas | 1968 | The Sound of Christmas | null null | 長名包短名 +3字 ×1.19；藝人不符：Al Caiola |
| Roberta Flack | Born to Love | 1983 | Born To Love | null null | 藝人不符：Peabo Bryson |
| Roberto Cacciapaglia | Sonanze | 1975 | Sonances / Sonanze & Otherworks | null null | 長名包短名 +21字 ×4.00；疑似兩張併一片的合體盤（名稱含 /） |
| Santana | Santana | 1969 | Santana's Greatest Hits | compilation 1994-07-01 | 長名包短名 +13字 ×2.86；Spotify 名帶精選輯標記；合輯且年份差 25 年 |
| Shiho Yabuki | The Body Is a Message of the Universe | 1987 | The Body Is a Message of the Universe - からだは宇宙のメッセージ | null null | 長名包短名 +12字 ×1.40 |
| Sonic Youth | Confusion Is Sex | 1983 | Confusion Is Sex (Plus Kill Yr. Idols) | null null | 長名包短名 +17字 ×2.21 |
| Spandau Ballet | True | 1983 | True (2022 Remix) | null null | 長名包短名 +9字 ×3.25 |
| Sugar Ray | 14:59 | 1999 | 14:59 25th Anniversary EP | null null | 長名包短名 +17字 ×5.25 |
| Swans | Cop | 1984 | Cop / Young God | null null | 長名包短名 +8字 ×3.67；疑似兩張併一片的合體盤（名稱含 /） |
| The Alarm | Declaration | 1984 | Declaration 1984-1985 | null null | 長名包短名 +8字 ×1.73 |
| The Band | The Band | 1969 | As The Music Plays the Band | null null | 長名包短名 +15字 ×3.14 |
| The Birthday Party | Junkyard | 1982 | 醜奴兒 | album 2016-02-19 | 跨語言配對（需人工確認）；藝人不符：No Party For Cao Dong |
| The Dramatics | Dramatically Yours | 1974 | Dramatically Yours | null null | 藝人不符：Ron Banks |
| The La's | The La's | 1990 | Beyond The Last Star | null null | 長名包短名 +11字 ×2.83；藝人不符：Beyond The Last Star |
| The Residents | Eskimo | 1979 | Eskimo: pREServed Edition | null null | 長名包短名 +16字 ×3.67 |
| The Rolling Stones | Exile on Main St. | 1972 | Exile On Main Street (2010 Re-Mastered) | null null | 長名包短名 +18字 ×2.38 |
| The Staple Singers | Swing Low | 1961 | Swing Low Sweet Chariot | null null | 長名包短名 +12字 ×2.50 |
| The Velvet Underground | The Velvet Underground & Nico | 1967 | The Velvet Underground & Nico 45th Anniversary | null null | 長名包短名 +15字 ×1.56 |
| The Velvet Underground | The Velvet Underground | 1969 | The Velvet Underground & Nico 45th Anniversary | null null | 長名包短名 +22字 ×2.10 |
| The Wake | Harmony | 1982 | Harmony + Singles | null null | 長名包短名 +7字 ×2.00 |
| The Waterboys | Fisherman's Blues | 1988 | Fisherman's Box: The Complete Fisherman's Blues Sessions (1986-1988) | null null | 長名包短名 +40字 ×3.67 |
| The Wedding Present | George Best | 1987 | George Best Plus | null null | 長名包短名 +4字 ×1.40 |
| The Who | Who's Next | 1971 | Who’s Next : Life House | null null | 長名包短名 +9字 ×2.13 |
| Throbbing Gristle | D.o.A: The Third and Final Report | 1978 | D.O.A. the Third and Final Report of Throbbing Gristle (Remastered) | null null | 長名包短名 +18字 ×1.72 |
| Throbbing Gristle | D.o.A. The Third and Final Report | 1978 | D.O.A. the Third and Final Report of Throbbing Gristle (Remastered) | null null | 長名包短名 +18字 ×1.72 |
| Tuxedomoon | Half-Mute | 1980 | Half Mute / Scream With a View | null null | 長名包短名 +15字 ×2.88；疑似兩張併一片的合體盤（名稱含 /） |
| White Zombie | Astro-Creep: 2000 | 1995 | Astro Creep: 2000 Songs Of Love, Destruction And Other Synthetic Delusions Of The Electric Head | null null | 長名包短名 +65字 ×5.64 |
| William Bell | Wow... | 1971 | Wow.../Bound To Happen (Reissue) | null null | 長名包短名 +13字 ×5.33；疑似兩張併一片的合體盤（名稱含 /） |
| Wings | Band on the Run | 1973 | Band On The Run | null null | 藝人不符：Paul McCartney |
| Yellow Magic Orchestra | Naughty Boys | 1983 | Naughty Boys & Instrumental | null null | 長名包短名 +15字 ×2.36 |
| Yutaka Hirose | Nova | 1986 | Nova + 4 (Extended Version) | null null | 長名包短名 +1字 ×1.25；續作編號不同（多出「4」） |
| Zounds | The Curse of Zounds | 1982 | The Curse of Zounds Discography (Remastered) | album 2007-01-01 | 長名包短名 +11字 ×1.69；Spotify 名帶精選輯標記 |
| キングギドラ | 空からの力 | 1995 | 空からの力 | null null | 藝人不符：KING GHIDORAH |
| キングギドラ | 最終兵器 | 2002 | 最終兵器 | null null | 藝人不符：KING GHIDORAH |

## B 級：中度可疑（21 張）

| 藝人 | 卡池專輯 | 卡年 | Spotify 實際專輯 | 型別／發行 | 判定 |
| --- | --- | --- | --- | --- | --- |
| Ayalew Mesfin | Hasabe (My Worries) | 2018 | Hasabe | null null | 卡池名被截短 -9字 |
| Bobby Womack | Across 110th Street | 1972 | Across 110th Street - Single | single 1972 | 長名包短名 +6字 ×1.35 |
| Don Cherry | “Mu” First Part / “Mu” Second Part / Orient | 2013 | Mu First Part | null null | 卡池名被截短 -18字 |
| Fishmans | Uchu Nippon Setagaya | 1997 | 宇宙 日本 世田谷 | null null | 跨語言配對（需人工確認） |
| Fishmans | 98.12.28 Otokotachi no Wakare | 1999 | 98.12.28 男達の別れ (Live) | null null | 跨語言配對（需人工確認） |
| Forest | Full Circle | 1970 | The Full Circle | null null | 長名包短名 +3字 ×1.30 |
| Guru | Jazzmatazz, Vol. 1 | 1993 | Guru's Jazzmatazz, Vol. 1 (Deluxe Edition) | compilation 1993-05-18 | 長名包短名 +5字 ×1.36 |
| James Brown | Live at the Apollo | 1963 | 'Live' At The Apollo (Vol. II) | null null | 長名包短名 +5字 ×1.33 |
| John Lennon | John Lennon/Plastic Ono Band | 1970 | Plastic Ono Band | null null | 卡池名被截短 -10字 |
| Meat Puppets | Meat Puppets II | 1984 | II | null null | 卡池名被截短 -11字 |
| Pretty Lights | Filling Up the City Skies | 2008 | Filling up the City Skies (Disc 1) | null null | 長名包短名 +5字 ×1.24 |
| Sheena Ringo | Kalk Samen Kuri no Hana | 2003 | 加爾基 精液 栗ノ花 | null null | 跨語言配對（需人工確認） |
| The Adverts | Crossing the Red Sea with The Adverts | 1978 | Crossing the Red Sea | null null | 卡池名被截短 -14字 |
| The Beatles | The Beatles (White Album) | 2000 | The Beatles | null null | 卡池名被截短 -10字 |
| The Olivia Tremor Control | Black Foliage: Animation Music Volume One | 1999 | Black Foliage: Animation Music | null null | 卡池名被截短 -9字 |
| The Pastels | Up for a Bit with The Pastels | 1987 | Up for a Bit With… | null null | 卡池名被截短 -10字 |
| The Velvet Underground | Loaded | 1970 | Loaded: Re-Loaded 45th Anniversary Edition | null null | 長名包短名 +2字 ×1.33 |
| Tim Hecker | Haunt Me, Haunt Me Do It Again | 2001 | Haunt Me | null null | 卡池名被截短 -16字 |
| Tito Puente | The King and I / El Rey y yo | 1967 | The King | null null | 卡池名被截短 -12字 |
| Toshifumi Hinata | Reality in Love | 1986 | ひとつぶの海 | null null | 跨語言配對（需人工確認） |
| Weezer | Weezer (Blue Album) | 1994 | Weezer | null null | 卡池名被截短 -9字 |

## C 級：參考（55 張）

名稱吻合但年份或型別對不上，多半是重發盤的中繼資料差異，封面通常仍正確。

| 藝人 | 卡池專輯 | 卡年 | Spotify 實際專輯 | 型別／發行 | 判定 |
| --- | --- | --- | --- | --- | --- |
| Alice Coltrane | Ptah, the El Daoud | 1970 | Ptah The El Daoud | album 1996-01-01 | 年份差 26 年 |
| Antisect | In Darkness, There Is No Choice | 1983 | In Darkness There Is No Choice | album 2024-10-04 | 年份差 41 年 |
| Bert Jansch | Bert Jansch | 1965 | Bert Jansch | album 2015-04-13 | 年份差 50 年 |
| Bill Evans & Jim Hall | Undercurrent | 1962 | Undercurrent | album 2018-04-18 | 年份差 56 年 |
| Buddy Holly | The "Chirping" Crickets | 1962 | The "Chirping" Crickets | album 1957-11-27 | 年份差 5 年 |
| Cal Tjader | Soul Sauce | 1965 | Soul Sauce | compilation 1995-01-01 | 合輯且年份差 30 年 |
| Can | Monster Movie | 1969 | Monster Movie | album 2020-01-01 | 年份差 51 年 |
| Cannibal Ox | The Cold Vein | 2001 | The Cold Vein (Deluxe Edition) | album 2013-12-03 | 年份差 12 年 |
| Carmen McRae | The Great American Songbook | 1972 | The Great American Songbook | album 2004-09-14 | 年份差 32 年 |
| Cecil McBee | Mutima | 1974 | Mutima | album 2025-04-25 | 年份差 51 年 |
| Cecil Taylor | Conquistador! | 1967 | Conquistador! | album 2004-01-01 | 年份差 37 年 |
| Dinah Washington | What a Diff'rence a Day Makes! | 1959 | What a Diff'rence a Day Makes | album 2018-05-17 | 年份差 59 年 |
| Dr. Feelgood | Down by the Jetty | 1975 | Down By The Jetty | album 2006-06-23 | 年份差 31 年 |
| Ennio Morricone | The Good, the Bad and the Ugly | 2004 | The Good, The Bad and The Ugly (Original Motion Picture Soundtrack) [Remastered Edition] | album 1966 | 年份差 38 年 |
| Grachan Moncur III | Evolution | 1963 | Evolution (Remastered) | album 2008-01-01 | 年份差 45 年 |
| Harmonia | Musik von Harmonia | 1974 | Musik von Harmonia | album 2015-06-26 | 年份差 41 年 |
| Jacques Brel | Ces gens-là | 1965 | Ces gens-là | compilation 2010-01-01 | 合輯且年份差 45 年 |
| John Barry | Goldfinger | 1964 | Goldfinger | compilation 2019-10-11 | 合輯且年份差 55 年 |
| John Cale | Paris 1919 | 1973 | Paris 1919 (Deluxe Edition) | album 2024-11-15 | 年份差 51 年 |
| Karen Dalton | In My Own Time | 1971 | In My Own Time | album 2006-11-14 | 年份差 35 年 |
| Kenny Burrell | Midnight Blue | 1963 | Midnight Blue | album 2001-09-20 | 年份差 38 年 |
| Kiss | Alive! | 1975 | Alive! (50th Anniversary Super Deluxe) | album 2025-11-21 | 年份差 50 年 |
| Kraftwerk | Autobahn | 1974 | Autobahn | single 2019-03-22 | 年份差 45 年 |
| Lalo Schifrin | Bullitt | 1968 | Bullitt | album 1999 | 年份差 31 年 |
| Lightnin' Hopkins | Lightnin' Hopkins | 1959 | Lightnin' Hopkins | album 1969-09-03 | 年份差 10 年 |
| Loretta Lynn | Coal Miner's Daughter | 1970 | Coal Miner's Daughter (Live On The Ed Sullivan Show, May 30, 1971) | single 2020-11-28 | 年份差 50 年 |
| Merle Haggard | Mama Tried | 1968 | Mama Tried | compilation 2009-10-19 | 合輯且年份差 41 年 |
| Miles Davis | Sketches of Spain | 1960 | Sketches of Spain | album 2011-12-01 | 年份差 51 年 |
| Mississippi John Hurt | Today! | 1966 | Today! (Remastered 2025) | album 2025-03-14 | 年份差 59 年 |
| Ornette Coleman | Dancing in Your Head | 1977 | Dancing in Your Head | album 2021-08-18 | 年份差 44 年 |
| Pharoah Sanders | Black Unity | 1972 | Black Unity | album 1997-01-01 | 年份差 25 年 |
| Pharoah Sanders | Tauhid | 1967 | Tauhid | album 1993-01-01 | 年份差 26 年 |
| Poison Girls | Chappaquiddick Bridge | 1980 | Chappaquiddick Bridge | album 2004 | 年份差 24 年 |
| Queen | Queen II | 1974 | Queen II | album 2026-03-27 | 年份差 52 年 |
| Red Garland | Groovy | 1957 | Groovy (Original Jazz Classics Series / Remastered 2024) | album 2024-04-26 | 年份差 67 年 |
| Robert Johnson | King of the Delta Blues Singers | 1961 | King Of The Delta Blues Singers | album 1937 | 年份差 24 年 |
| Rory Gallagher | Irish Tour '74 | 1974 | Irish Tour '74 (Live / 40th Anniversary Edition) | compilation 2014-10-20 | 合輯且年份差 40 年 |
| Sagittarius | Present Tense | 1968 | Present Tense (Expanded Edition) | album 1997-11-21 | 年份差 29 年 |
| Sarah Vaughan | Sarah Vaughan with Clifford Brown | 1990 | Sarah Vaughan-With Clifford Brown | album 2019-09-06 | 年份差 29 年 |
| Skip James | Today! | 1966 | Today! (Remastered 2024) | album 2024-06-07 | 年份差 58 年 |
| Slade | Slade Alive! | 1972 | Slade Alive! (Live) (2009 Remaster) | album 2009-09-28 | 年份差 37 年 |
| Steeleye Span | Please to See the King | 1971 | Please to See the King | compilation 2012-01-30 | 合輯且年份差 41 年 |
| Sun Ra | Space Is the Place | 1973 | Space is the Place | album 1998-01-01 | 年份差 25 年 |
| Sun Ra Arkestra | Sleeping Beauty | 1979 | Sleeping Beauty | album 2025-07-18 | 年份差 46 年 |
| Syd Barrett | The Madcap Laughs | 1970 | The Madcap Laughs | album 2016-05-13 | 年份差 46 年 |
| The 13th Floor Elevators | The Psychedelic Sounds of the 13th Floor Elevators | 1966 | The Psychedelic Sounds of the 13th Floor Elevators - 2008 Remaster | album 2010 | 年份差 44 年 |
| The 13th Floor Elevators | Easter Everywhere | 1967 | Easter Everywhere | album 2010 | 年份差 43 年 |
| The Free Design | Kites Are Fun | 1967 | Kites Are Fun | album 2003 | 年份差 36 年 |
| The Guess Who | American Woman | 1970 | American Woman | album 2012-03-06 | 年份差 42 年 |
| The Lightmen | Energy Control Center | 1973 | Energy Control Center | album 2018-04-19 | 年份差 45 年 |
| The Mob | Let the Tribe Increase | 1983 | Let The Tribe Increase | compilation 2009-04-06 | 合輯且年份差 26 年 |
| The Monkees | Headquarters | 1967 | Headquarters | album 2019-10-04 | 年份差 52 年 |
| The Small Faces | Ogdens' Nut Gone Flake | 1968 | Ogdens' Nut Gone Flake - 50th Anniversary Edition (2018 Remaster) | album 2018-10-19 | 年份差 50 年 |
| Themselves | The No Music | 2002 | The No Music | album 2019-11-22 | 年份差 17 年 |
| Van der Graaf Generator | Pawn Hearts | 1971 | Pawn Hearts | compilation 2005-01-01 | 合輯且年份差 34 年 |
