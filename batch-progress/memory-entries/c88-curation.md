## 2026-09-04 — dip-vinyl-shop — c-88 策展提案（覆蓋補遺：電影原聲的正典與影展經典）

- **改動摘要**：新增 `batch-progress/c88/prop-a.json`（22 張）與 `batch-progress/c88/prop-b.json`（23 張），
  合計 **45 張、33 位藝人**，年份 1963–2021。
  **這批的形狀與 c-67～c-87 相反**：那二十一批是「深掘」（挖沒人談的碟），
  這批依店主 2026-09-04 指示做**覆蓋補遺**——「確保熱門電影專輯都要有，影展電影的專輯也要有」。
  `CURATION-BRIEF-c67plus.md` 裡「挖冷門／避開代表作」的指引本批不適用，其餘全部照舊。
  - **a 組＝主流熱門（22 張）**：Woodstock、Rocky Horror、回到未來、鐵達尼號、洛基、刺激、
    第三人、午夜牛郎、樂來越愛你、艾蜜莉的異想世界、鬥陣俱樂部、阿甘正傳、駭客任務、
    霸道橫行、謀殺綠腳趾、O Brother、星際異攻隊、侏羅紀公園、獅子王、蝙蝠俠、神鬼戰士、與狼共舞。
  - **b 組＝影展／作者電影經典（23 張）**：塔可夫斯基（Артемьев）、黑澤明（早坂文雄）、
    武満徹、高達（Delerue、Duhamel）、奇士勞斯基（Preisner ×2）、Greenaway（Nyman ×2）、
    貝托魯奇（Gato Barbieri）、塔爾貝拉（Mihály Víg）、王家衛（Michael Galasso）、
    陳凱歌與張藝謀（趙季平 ×2）、Jodorowsky、安東尼奧尼（Zabriskie Point、Giovanni Fusco）、
    林區（Eraserhead、Mulholland Drive）、法斯賓達（Peer Raben）、文溫德斯（Wings of Desire）、
    捷克新浪潮（Zdeněk Liška）、梅爾維爾（François de Roubaix）。
  - **`Various Artists` 10 張**（a 組 7、b 組 3），全部走 §5.6：`releaseType: "Compilation"`、
    `exceptionReason` ≥12 字、≥2 個 HTTPS `exceptionEvidenceUrls`（MusicBrainz release-group ＋ Discogs master／release）。
- **主要檔案**：`batch-progress/c88/prop-a.json`、`batch-progress/c88/prop-b.json`、
  `batch-progress/c88/chk-prop.mjs`（既有）、`batch-progress/memory-entries/c88-curation.md`（本檔）。
- **驗證結果**：
  - `node batch-progress/c88/chk-prop.mjs` → a 組 22 張／15 位、b 組 23 張／19 位，**標記 0**。
  - 串跑 `dedup-crossbatch.mjs` → **37 批（其中 4 批讀 prop）、1,797 張、跨批撞卡 0**；c88 以 prop 來源被納入。
  - 45 張全部釘住 release-group MBID 並逐個回問
    `release-group/<id>?inc=artist-credits+releases` 確認 **primary-type=Album**、
    artist-credit、first-release-date 與轄下 release 的 status／國別（第 41 條）；探測錯誤 0。
    **`mbNote` 逐張列出「刻意不釘」的對照組**（EP／Single 雙胞胎、擴充版、二合一套裝、
    同名別碟、Bootleg-only 的 release-group），共列出 60 餘個對照 MBID（第 99／126 條）。
  - **實掃 `seed_cards.json` 全檔 14,424 列**，以「掛名｜盤名」與**盤名為主鍵**兩種方式各掃一次
    （掃描器加 `length>=4` 守衛，c-79 教訓），並做**去重音（NFKD）比對**。
  - **封面實測**：CAA release-group front **44/45（98%）**，無圖 1（Mihály Víg《Sátántangó》404）、探測錯誤 0。
  - **試聽實測**：Apple `search`（`us`／`gb`／`fr`／`jp`／`de` 五個 storefront，藝人＋盤名嚴格比對）
    **26/45（58%）**；未命中的 19 張再以盤名單獨查一次，其中 **侏羅紀公園、O Brother、El Topo、
    Querelle 4 張確認有對得上的版本**（掛名或盤名寫法不同），其餘 15 張回的多是同名別碟
    （`Big Strick`《Reservoir Dogs》、`Hemi Hemingway`《Wings of Desire》、樂團 `Satantango`……），
    **不得採信**。合理預估 **30/45（67%）**，其餘需走 §4 的 `apple-verified-collection`
    人工 collectionId 反查。**跨文字系統的三張（Артемьев、早坂文雄、趙季平 ×2）嚴格比對全部落空**，
    `queryAlias` 已填羅馬拼音。
- **本批自下的裁定**（依 2026-09-02 店主下放；判準：有先例／可逆／卡住整條線）：
  1. **年份取「這份錄音第一次以唱片形態問世的年份」，不取電影上映年**（依第 1 條，並與池中
     `Krzysztof Komeda`《Knife in the Water》1962 片／2016 盤、《Cul-De-Sac》1966 片／2002 盤、
     `Bernard Herrmann`《Psycho》1960 片／1975 盤等既有卡一致）。
     **本批有 9 張兩個年份不同**，落差最大的是 `François de Roubaix`《Le Samouraï》（1967 片／2018 盤，51 年）、
     `Anton Karas`《The Third Man》（1949 片／1999 盤，50 年）、`Zdenek Liska`《Marketa Lazarová》（1967／1996，29 年）、
     `Mihály Víg`《Sátántangó》（1994／2021，27 年）、`Giovanni Fusco`《L'Avventura》（1960／2016，56 年）。
     **例外一張**：`Georges Delerue`《Le Mépris》year 記 **1963**（原始的 Disques Vogue 45 轉 EP），
     而釘住的 release-group first-release-date 是 1991（同一份錄音第一次以專輯形態出版）——
     **有同期原始發行時取原始發行年，只有後世才首度問世時才取唱片年**；依第 91／95 條，
     rgMbid 是身分鍵不是年份來源。兩個年份都寫進 `risk`。
  2. **`Эдуард Артемьев` 改釘 1990 年的三合一《Solaris / The Mirror / Stalker》**（d0cc69d5），
     不釘 1995 年的《Andrey Tarkovsky, Volume 4: Zerkalo / Stalker》（4d76e85b）——
     **後者轄下唯一的 release 標 Bootleg**，依第 43／57／65 條不算背書。
     店主點名的《Сталкер》與《Зеркало》因此以這一張補上；掛名沿用池中既有的西里爾寫法
     `Эдуард Артемьев`（避免製造分裂鍵，第 49／120 條），`queryAlias` 填 release-group 實際的
     artist-credit 拉丁寫法 `Edward Artemiev`。
  3. **黑澤明線改釘 1978 年的原盤 LP《七人の侍 / 羅生門》**（c5461038，1978 JP Official），
     不釘 2001 年單片的《七人の侍》（945f4af7）——一張卡同時補上兩部片，且釘的是原盤。
     **池中原本就有 `武満徹`《Ran》(1985)**，所以「黑澤明線零張」的說法要修正為「只有一張」。
  4. **`The Sting` 的掛名採 `Marvin Hamlisch` 單名**，不照抄 MB 的 artist-credit
     「Scott Joplin, music conducted and adapted by Marvin Hamlisch」——依第 25 條
     （掛名要讓外部服務查得到）；`queryAlias` 填 Scott Joplin。池中既有 `Scott Joplin`《Treemonisha》，
     是另一張碟。
  5. **彎引號一律改 ASCII**：`Richard O'Brien`（MB 為 U+2019）、`L'Avventura`（MB 為 L’Avventura）、
     `Le Fabuleux Destin d'Amélie Poulain`（MB 為 d’Amélie）——c-79 的同形異碼形狀（第 50／52 條）；
     `queryAlias` 保留 MB 原寫法供比對。
  6. **`Zdenek Liska` 採 MB 的 artist-credit（去重音）而非藝人實體名 `Zdeněk Liška`**——
     依第 10／20 條（artist-credit 是外界實際使用的掛名），`queryAlias` 填帶重音的寫法。
  7. **`Various Artists` 全部走 §5.6**。2026-09-04 店主澄清「並沒有一個人只限三張這種限制」後，
     第 72 條的「VA 不計入藝人上限」失去適用對象，但**§5.6 的門檻本身仍然成立**，
     10 張 VA 卡逐張過門檻。
- **未收清單（一）：釘不住 MB**
  1. **武満徹《砂の女》(1964，勅使河原宏)**——**店主點名的那張，MB 上真的沒有**：
     `release:"砂の女" AND artist:"武満徹"` count=0、`release:"Woman in the Dunes"` 只回
     `Steven Severin`《The Woman in the Dunes》(2000)、release 層級搜尋亦無。
     含此片的 JVC CD《武満徹映画音楽 4: 勅使河原宏 監督作品篇》(VICG-5127, 1991,
     Discogs release 1141673) **也沒有 MB release-group**（MB 只建了 Volume 1）。
     本批改收同系列的 Volume 1（dab1a527, 1990 JP Official）。**《砂の女》可進 §1 補遺批**。
  2. **武満徹《怪談》(1964，小林正樹)**——同上，MB 查無。可進 §1 補遺批。
  3. **佐藤勝《用心棒》(1961，黑澤明)**——MB 查無（只回 `斉藤恒芳`《旋風の用心棒》，無關）。
  4. **Ravi Shankar《Pather Panchali》(1955，薩雅吉雷)**——`release:"Pather Panchali"` **count=0**。
  5. **Carmine Coppola & Francis Coppola《Apocalypse Now》(1979 原盤)**——MB 只有
     e009c530《Apocalypse Now: Redux》(2001) 這個**擴充版** release-group，1979 年 Elektra 雙 LP 查無；
     依第 140／141 條不以擴充版頂替原盤。
  6. **Georges Delerue／Giovanni Fusco《Hiroshima mon amour》(1959，雷奈)**——MB 只有 2021 年的
     多片選輯 c60d5734，且該選輯與池中既有的 `Georges Delerue`《Jules et Jim》重疊。
  7. **VA《The Exorcist》(1973)**——MB 無該片原聲帶的 release-group（只回《The Exorcist III》與同名樂團碟）。
  8. **趙季平《紅高粱》(1987，張藝謀)**——`release:"紅高粱" AND artist:"趙季平"` count=0。
  9. **楊德昌《一一》(2000)**——查不到可釘的 release-group。
  10. **Gustavo Santaolalla《Brokeback Mountain》(2005)**——MB 只有 b94335bb 的混音單曲，無專輯 RG。
- **未收清單（二）：與池中撞卡**
  1. **`Alain Goraguer`《La Planète sauvage》(1973)——池中已有完全相同的一張**，
     這是本批唯一一筆真撞卡（去重音比對才抓到：`planetesauvage` vs `planètesauvage`）。
     已改收 `Antoine Duhamel`《Pierrot le Fou / Week-End》。
  2. **主線交接清單裡列為「缺」但實掃證明池中已有**（誤判，記在這裡免得日後重查）：
     《Once Upon a Time in the West》＝`Ennio Morricone`《C'era una volta il West》(1970)、
     《A Fistful of Dollars》＝《Per un pugno di dollari》(1967)、
     《發條橘子》＝`Wendy Carlos`《Walter Carlos' Clockwork Orange》(1972)、
     《伍茲塔克》以外的《Pulp Fiction》《Trainspotting》《Saturday Night Fever》《Easy Rider》
     （皆 `Various Artists`，池中都有）。
     **主線那份「主流側缺」清單的模糊比對誤判率約三分之一，不能直接照抄。**
  3. 其他已在池中、不再重收：`Popol Vuh`《Aguirre》、`Ry Cooder`《Paris, Texas》、
     `Vangelis`《Blade Runner》《Chariots of Fire》、`Prince`《Purple Rain》、
     `Curtis Mayfield`《Superfly》、`Jimmy Cliff`《The Harder They Come》、
     `Harold Arlen`《The Wizard of Oz》、`Leonard Bernstein & Stephen Sondheim`《West Side Story》、
     `Nino Rota` 六張（含《The Godfather》《8½》《La dolce vita》《Amarcord》）、
     `Krzysztof Komeda` 六張、`Bernard Herrmann` 四張、`Miles Davis`《Ascenseur pour l'échafaud》、
     `武満徹`《Ran》、`Tan Dun 譚盾`《Crouching Tiger, Hidden Dragon》。
- **未收清單（三）：額滿（45 張上限），MB 釘得住、池中沒有，下一批可直接收**
  `The Band`《The Last Waltz》、`Various Artists`《Ghostbusters: Original Soundtrack Album》(1984)、
  `Various Artists`《2001: A Space Odyssey》(1968)、`Various Artists`《8 Mile》(2002)、
  `Various Artists`《41 Original Hits From the Sound Track of "American Graffiti"》(1973)、
  `The Blues Brothers`《The Blues Brothers》(1980，**自我同名，收之前要先確認 Apple 查得到**)、
  `Simon & Garfunkel / Dave Grusin`《The Graduate》、`Эдуард Артемьев`《Siberiade》(1979) 與
  《Soleil Trompeur》(1994)、`Zbigniew Preisner`《Trois couleurs : Blanc》(1994)、
  `武満徹`《天平の甍 オリジナル・サウンドトラック》(1980 JP Official)。
- **「掃完之後池中的電影原聲還缺哪一塊」**：**主流側已經接近飽和**——本批 22 張補完後，
  1970–2000 年代的賣座原聲帶只剩《大法師》《現代啟示錄》《畢業生》《最後華爾滋》幾張，
  而前兩張是 MB 釘不住、後兩張是額滿。**還很空的是三塊**：
  (a) **1950 年代以前**（池中最早的原聲卡是 1965 年的《The Sound of Music》，本批的
  《The Third Man》錄音是 1949 但唱片是 1999）；
  (b) **日本電影**（本批補了黑澤明與武満徹各一張，但小津、溝口、成瀨、大島渚、今村昌平全空，
  且日本原聲在 MB 上的 release-group 覆蓋率明顯低於歐美——這是資料面的限制，不是策展的取捨）；
  (c) **華語電影**（本批補了陳凱歌與張藝謀各一張、王家衛一張，池中現在共 8 張，
  但侯孝賢只有 1989 與 1993 兩張、楊德昌與蔡明亮仍是零，而《一一》《紅高粱》都釘不住 MB）。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制、`manual:depth-rubric`）、
  頂點資格評估、封面實際落檔、簡介、固定試聽寫入、Firestore／KV／`seed_cards.json` 寫入。
