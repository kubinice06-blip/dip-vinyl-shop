# 第 0 步判定派工詞（一般卡，每份 300 張，Sonnet）

你是 dip vinyl 一般卡簡介的檢查層。**只讀簡介、不上網、不改稿**；只透過下面的工具寫你那一份的輸出檔，不碰 git、KV、seed、PROJECT_MEMORY。

1. 先讀 `/home/user/dip-vinyl-shop/desc-tools/prompts/general-desc-base.md` 的「為什麼改」「一、檢查層」，
   再讀 `/home/user/dip-vinyl-shop/desc-tools/prompts/apex-desc-base.md` 的「一、檢查層」（七條 codes 的編號照這一節：1 冷知識或懸念開頭、2 讀完不知道是什麼／為什麼值得聽、3 沒有聲音描述或只有形容詞、4 細節雜項過半、5 做作、6 沒出處的封號、7 事實可疑）。
   第 2 條在一般卡改讀成「讀完要知道這是什麼唱片、誰做的、故事或概念、為什麼值得聽」。
2. 在 `/home/user/dip-vinyl-shop` 執行：
   - `node batch-progress/desc-severe-20261117/tools/tri.mjs show {NNN} 50` 印出這一份**還沒判**的 50 張（已判的會自動略過，所以中斷後重跑會接續）。
   - 判完這 50 張，用 heredoc 併入：
     ```
     node batch-progress/desc-severe-20261117/tools/tri.mjs add {NNN} <<'J'
     [{"i":0,"g":"severe","c":[1,3,4],"w":"只講軌長盤號，無聲音無故事"}, …]
     J
     ```
     `i` 是方括號裡的編號、`g` 為 severe／rewrite／keep、`c` 是命中的 codes（keep 給 []）、`w` 理由 ≤25 字（繁體中文）。
   - 重複「show 50 → 判 → add」直到 show 印出 0 張。**每 50 張就 add 一次，不要攢著。**
3. 判準（三級）：
   - **severe**：主體是細節雜項——軌序、曲長、盤號、目錄號、場次日期、封面印刷、曲名體例、版本差異、credit 名單、榜位認證堆疊——讀完**不知道這是什麼樣的唱片**，沒有故事或概念，**也幾乎沒有聲音描述**。三者都缺才是 severe；只要有一句像樣的聲音描述或一個清楚的概念／故事，通常落在 rewrite。
   - **rewrite**：有講出一部分（身分、故事或聲音其中之一），但命中任一條 codes（冷知識開頭、沒聲音、雜項過半、做作、封號、可疑）。
   - **keep**：講得出這是什麼、誰做的、故事或概念、聽起來怎樣（具體樂器／手法，不只形容詞），語氣平實。
   - `（無簡介）` 一律 severe，c 給 [2,3]，w 寫「無簡介」。
   - 拿不準 severe 還是 rewrite：問自己「店主讀完會不會說『這跟沒介紹一樣』」；會 → severe。拿不準 rewrite 還是 keep → rewrite。
4. 下面是主線 400 張抽查的判例（判準以此為準；這輪整體大約 severe 15–20%、rewrite 45–50%、keep 35%，但**照每張實際內容判，不要湊比例**）：

- **severe** [1,2,3,4]（通篇場次、曲長、曲單，無聲音與故事）
  > Art Blakey and the Jazz Messengers《Meet You at the Jazz Corner of the World, Volume 1》：盤名就是 Birdland 的招牌語，那一晚的第三、四個 set 被錄了下來。1960 年 9 月 14 日的俱樂部現場，那家店自稱世界的爵士角落。五重奏是 Lee Morgan 的小號、Wayne Shorter 的次中音、Bobby Timmons 的鋼琴，加 Jymie Merritt 與 Art Blakey。四首各九到十分半，末尾接一分四十秒的〈The Theme〉。曲單以標準曲為主，另有三首出自前一任團員 Hank Mobley，他不在台上。
- **severe** [1,3,4]（款號、軌長、壽辰，無聲音無概念）
  > Mal Waldron & 山下洋輔《Piano Duo Live at Pit Inn》：兩架鋼琴、一個晚上，第二段即興彈了整整二十八分鐘。對坐的兩人，Mal Waldron 這晚剛滿 60 歲，山下洋輔 43 歲。1985 年 9 月 17 日晚上，新宿 Pit Inn 做了這場數位實況錄音，隔年只出 CD，款號 32DH 360。三軌約 64 分鐘，兩段即興由兩人合掛作曲，末軌是標準曲〈My Old Flame〉。Waldron 1970 年首度來日，八〇年代初他說每年替日本留兩個月；山下洋輔 則在 1973 年就與 佐藤允彦 合錄過一張雙鋼琴盤。
- **severe** [2,3,4]（卡帶包裝與語言，完全沒有聲音）
  > Zoviet France《Loh Land》：帶子在 1985 年 4 月錄好，兩年後才在荷蘭出版。阿姆斯特丹的 Staalplaat 簽下了 Zoviet France，一支成員從不露面的英國樂團。1987 年經手的是旗下卡帶系列 Staaltape，帶子裝在 PVC 套裡，副標是一長串荷蘭語。曲目分成 Side 0 與 Side 1。1992 年，Staalplaat 再出了 CD 版。
- **severe** [1,2,3,4]（全是軌長比較，毫無內容）
  > Leila Forouhar《Makhmal-e-Naz》：七軌裡有六軌擠在一分十三秒的帶子裡，第三軌跳出去兩分鐘。跳出去的是〈Derakhte Gol〉7:49，比第二長的末軌〈Bahar〉5:43 還多出兩分零六秒；第四軌〈Saghi〉4:45 最短，與第三軌之間落差三分零四秒。七軌那一版合計 38:16——另一版只有六軌、少掉末軌，而那一軌在同一份目錄裡自己另外站成一條單軌條目。廠牌記 Pars Video，包裝欄記 Clamshell Case。
- **severe** [2,3,4]（只有卡帶發行與解散，無聲音內容）
  > Absolute Body Control《Figures》：比利時一卷九首歌的卡帶，團名靠海外的卡帶交換傳開。Absolute Body Control 是 Dirk Ivens 領軍的比利時 minimal synth 團。Body Records 在 1983 年把《Figures》出成卡帶。1984 年解散前，樂團只留下幾卷自製卡帶與一張單曲。這份錄音要到 2013 年起才有數位重發。
- **severe** [1,2,3,4]（只比較曲長與目錄號）
  > Pērkons《Dziesmu izlase #1 (1981-1982)》：二十軌裡最長的一首與樂團同名，排在正中間的第十二軌。〈Pērkons〉5:51 就是那一軌，全張只有兩首超過五分鐘；最短的第十六軌〈Iedzer, brāli!〉2:22 後面還緊接著另一首勸酒歌。出版年是 1994，廠牌 Mikrofona ieraksti、編號 MRCD 006、CD 二十軌，副標括號裡的 1981-1982 只是盤名標的年份區間。同系列三集各對應一段區間，這一集是最早的那一段。
- **rewrite** [3,4]（身分有講，但聲音只剩曲長與合寫統計）
  > David Porter《…Into a Real Thing》：Isaac Hayes 的寫歌搭檔，這張換他當主角。David Porter 原本與 Hayes 一起寫詞曲，1969 年之後兩人才分工。他把錄音搬到 Alabama 的 Muscle Shoals Sound，節奏組用的是 Roger Hawkins 等當地班底，唱片則由 Enterprise 發行。開場的〈Hang On Sloopy〉被重新編成 11 分 11 秒的靈魂長篇。全張六首歌，有四首出自他與 Ronnie Williams 的合寫。
- **rewrite** [3,4]（榜單認證堆疊，聲音一句帶過）
  > War《All Day Music》：一支多族裔樂團把拉丁、雷鬼與放克攪進同一鍋，〈Slippin' into Darkness〉就這樣賣破雙白金。1971 年 United Artists Records 發行的第四張專輯，樂團編制包括口琴手 Lee Oskar、吉他手 Howard Scott 與貝斯手 B.B. Dickerson。該曲與同名曲皆 1972 年獲 RIAA 金唱片認證，前者後續更達雙白金，專輯登上 Billboard 200 第 16 名並獲白金認證。
- **rewrite** [1,3,4]（建團順序與榜位，沒有聲音）
  > Bon Jovi《Bon Jovi》：〈Runaway〉錄好的時候，這支樂團還沒有成立。1982 年 Jon Bon Jovi 在紐約 The Power Station 找來一批臨時樂手錄下這首歌。demo 投給電台 WAPP-FM 後被選進電台合輯播出，促成他與 Mercury Records 簽約，正式的樂團要到 1983 年 3 月才組成——先有電台試播，後有建團。首張專輯 1984 年 1 月發行，Billboard 200 第 43 名，〈Runaway〉在 Hot 100 拿到第 39 名。
- **rewrite** [3]（故事有，缺這張的聲音）
  > Leo王《無病呻吟有情抒情》：龐克樂團主唱轉去饒舌，第三張專輯替他拿下金曲獎最佳國語男歌手。那支樂團叫「巨大的轟鳴」，本名王之佑的他從 2013 年起在台前累積人氣，日後招牌的幽默詞作與市井題材，就是在那段時期成形的。轉往嘻哈之後，他與饒舌歌手春艷組成雙人組合「夜貓組」，再走到 2018 年 12 月 31 日這張 12 首歌的個人第三張專輯：自嘲口吻的市井敘事、夾雜台語演唱的曲目，底下墊著樂團出身留下的粗糲質地，同名曲〈無病呻吟〉還邀了蛋堡合唱。那座獎是 2019 年第 30 屆頒的。
- **rewrite** [3]（背景與銷量清楚，缺聲音）
  > 陳淑樺《跟你說 聽你說》：李宗盛與黃建昌製作、李正帆編曲，滾石替陳淑樺定下的方向是「現代都會女子的心情及愛情觀」。開場〈夢醒時分〉入圍第二屆金曲獎年度歌曲，〈你走你的路〉與〈傲慢與偏見〉接著鋪成同一種語氣；〈無言的表示〉詞曲出自羅大佑，〈依然想你〉出自李宗盛，末軌〈快樂女郎〉是純演奏曲。文案由蔡康永執筆。這是台灣第一張銷量破百萬的華語唱片，累計一百零二萬張，台灣百佳專輯排名第二十二。
- **rewrite** [1,3,4]（外號與曲目雜項，缺聲音）
  > Лембит Саарсалу, Леонид Винцкевич《Джаз вдвоем》：愛沙尼亞的薩克斯風，對上庫爾斯克的鋼琴。吹奏的 Лембит Саарсалу（Lembit Saarsalu）有「薩克斯風之王」的外號；鋼琴手 Леонид Винцкевич 生於庫爾斯克，是他合作最久的國際搭檔。曲目有兩首 Cole Porter，約 8 分的〈Эстонский диалог〉由 Saarsalu 改編自民謠，1986 年出版。
- **keep** []（講清楚人物、首作與地位，語氣平實）
  > 岡林信康《わたしを断罪せよ》：父親是牧師的岡林信康，1968年以描寫山谷日雇工的〈山谷ブルース〉出道，隨即被叫做「フォークの神様」。1969年這張URC首作編號URL-1007，一面收自作的〈手紙〉〈友よ〉〈それで自由になったのかい〉，一面唱Tom Paxton與Dylan〈戦争の親玉〉的日語版。〈手紙〉觸及被差別部落題材，長年遭電台自主規制，日本抗議民謠的起點多從這裡算起。
- **keep** []（風格、客座、取樣都有說明）
  > Deee-Lite《World Clique》：紐約三人組 Deee-Lite 的首作，1990 年由 Elektra 發行。house 的四四拍底下鋪的是實打實的放克人手：Bootsy Collins 的貝斯、Fred Wesley 與 Maceo Parker 的銅管，Q-Tip 在〈Groove Is in the Heart〉客串饒舌；該曲打進美國告示牌百大單曲榜與英國榜前五，並登上美國舞曲榜冠軍，〈Power of Love〉與〈Good Beat〉隨後也進舞曲榜前十。〈E.S.P.〉取樣 1934 年電影《黑貓》裡 Bela Lugosi 的說話聲。
- **keep** []（概念、製作方式與合成器聲音皆交代）
  > Jan Hammer《The First Seven Days》：封套上特別註明：這張唱片裡沒有吉他。1968 年 8 月華沙公約國入侵時，Jan Hammer 還在布拉格音樂學院，後來拿 Berklee 獎學金赴美。那句註明有它的理由：他用合成器彎音，做出近似電吉他的獨奏。Nemperor 在 1975 年出版這張以《創世紀》七天為題的概念專輯，七首照天數命名。錄音就在他於紐約州 Kent 農舍搭的 Red Gate Studio，自製自錄，鋼琴、Moog、Mellotron 到鼓幾乎都自己來。
- **keep** []（素材概念與曲風交代清楚）
  > David Holmes《Let's Get Killed》：貝爾法斯特 DJ David Holmes 的第二張，1997 年 9 月由 Go! Beat 發行。素材來自他十七歲帶著 DAT 錄音機走進紐約——南布朗克斯、華盛頓廣場、中央公園的路人對話錄了下來，擱置十年後才成為本作骨幹；專輯名出自他們在南布朗克斯被八個人追著搶器材的那次。人聲片段被切碎鋪在曲目之間與內部，底下輪流是 techno、breakbeat 與 trip hop。〈Don't Die Just Yet〉改寫 Serge Gainsbourg 的舊作，〈Radio 7〉重做 James Bond 主題。

5. 做完回報一行：`{NNN} 完成 300：severe X／rewrite Y／keep Z`。不要其他說明。
