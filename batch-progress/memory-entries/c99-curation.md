## 2026-09-05 — dip-vinyl-shop — c-99 策展提案（世界音樂目錄深度）

- **改動摘要**：新增 `batch-progress/c99/prop-a.json`（22 張）與 `batch-progress/c99/prop-b.json`（23 張），
  合計 **45 張、26 位藝人**，`lineType: 廣度`。
  - **a 組＝非洲與加勒比目錄深度（22 張、16 位）**：
    Franco & le TPOK Jazz 2（Mario 2 1985／20ème Anniversaire… Volume 2 1989）、
    Tabu Ley Rochereau 2（Muzina 1994／Africa Worldwide: 35th Anniversary Album 1996）、
    Toumani Diabaté 1（Djelika 1995）、Ali Farka Touré & Toumani Diabaté 1（Ali and Toumani 2010）、
    Orchestra Baobab 2（Tribute to Ndiouga Dieng 2017／Mouhamadou Bamba 1980）、
    E.T. Mensah & the Tempos 1（King of Highlife Anthology 2015）；
    牙買加段 13 張：King Tubby 2（The Roots of Dub／Shalom Dub 1975）、U-Roy 2（Rasta Ambassador 1977／
    Jah Son of Africa 1978）、Big Youth 2（Hit the Road Jack 1976／Isaiah First Prophet of Old 1978）、
    Yellowman 1（King Yellowman 1984）、The Mighty Diamonds 1（Stand Up to Your Judgment 1978）、
    Yabby You 1（Beware Dub 1978）、Max Romeo 1（Reconstruction 1978）、
    Junior Murvin 1（Bad Man Possee 1982）、Dr Alimantado 1（Sons of Thunder 1981）、
    Prince Far I 1（Psalms for I 1976）。
  - **b 組＝中東、南亞與拉丁目錄深度（23 張、10 位）**：
    Umm Kulthum 5（Amal Hayaty 1965／Fakarouni 1966／Lesa Faker 1960／Ya Msaharny 1972／Hazehi Laylaty 1968）、
    R.D. Burman 4（Amar Prem 1971／Yaadon Ki Baaraat 1973／Kati Patang 1970／1942: A Love Story 1994）、
    A.R. Rahman 3（Dil Se.. 1998／Taal 1999／Slumdog Millionaire 2008）、
    Ali Akbar Khan 1（Shree Rag 1969）、Shankar＝L. Shankar 2（Who's to Know 1981／Vision 1984）、
    Fania All-Stars 2（Our Latin Thing (Nuestra cosa) 1972／Latin-Soul-Rock 1974）、
    Celia Cruz 2（與 Johnny Pacheco 的 Tremendo caché 1975／與 Ray Barretto 的 Ritmo en el corazón 1988）、
    Juan Luis Guerra y 440 2（Areíto 1992／Fogaraté! 1994）、
    Juan Gabriel 2（El alma joven 1971／Siempre en mi mente 1977）。
  - **`releaseType: Compilation` 0 張**——本批沒有一張走 §5.6。
    三種形狀是 MB `primary-type=Album` 而 `secondary-types` 帶 Compilation／Soundtrack／Live
    （E.T. Mensah 選輯、印度電影配樂 7 張、Fania 2 張），依 §5.6 明文與 c-90 裁定第 3 條
    **照一般 Album 寫、例外欄位全部留空**。
- **主要檔案**：`batch-progress/c99/prop-a.json`、`batch-progress/c99/prop-b.json`、
  `batch-progress/c99/rulings.md`、`batch-progress/memory-entries/c99-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c99/chk-prop.mjs a b` → 45 張、26 位、**標記 0**；
  跨批去重掃到 50 批（其中 4 批讀 prop）、2,340 張卡，**跨批撞卡 0**。
  45 張全部釘住 release-group MBID 並**逐一回問 `release-group/<id>?fmt=json&inc=artist-credits+releases`**
  確認 primary-type、標題、artist-credit、轄下 release 的國別與 status（第 41 條）；
  另以 `release?release-group=<id>&inc=labels` 取得每張的廠牌與目錄號。
  **藝人目錄一律用 `release-group?artist=<MBID>&limit=100&offset=` 分頁**（第 116 條）——
  本批有六位超過 100 筆：A.R. Rahman 417、R.D. Burman 339、Celia Cruz 222、King Tubby 154、
  Umm Kulthum 136、Juan Gabriel 100。
  撞卡檢查在 `seed_cards.json` 全 14,424 列上做，並額外跑鬆散比對（NFKD、去 remaster／expanded 尾綴、
  以及同一藝人內的**字母重排比對**，用來抓《The Roots of Dub》vs《Dub from the Roots》這種倒裝）——真撞卡 0。
- **封面與試聽預估**：45 張全部在 Apple 命中 `collectionId`，各卡 `risk` 都寫明店面與 id。
  命中店面：`us` 40 張、`gb` 4 張（U-Roy ×2、Junior Murvin）、`za` 1 張（Prince Far I）。
  **`cu` 在 45 張的每一次查詢都回 HTTP 400——Apple 沒有古巴店面**（見 rulings 第 1 條）。
  其中 3 張命中的是不同版本（Umm Kulthum《Amal Hayaty》配到雙曲併盤、Fania《Our Latin Thing》配到四十週年版、
  Juan Gabriel《El alma joven》配到 1996 美國版），已在 `risk` 標明，下游要在 manifest 記版本差異。

### 這批的裁定

全部十一條寫在 `batch-progress/c99/rulings.md`。重點四條：

1. **Apple 沒有 `cu` 店面**，WLD 序該格一律 HTTP 400，不是「查無」——與第 163 條同族。
2. **掛名一律沿用池中寫法**，不因 MB 主名不同而製造第八組分裂；九組寫法對照表在 rulings 第 2 條。
   其中 **U-Roy 的 MB 主名用 U+2010 連字號**，與池中的 ASCII `-` 在 `===` 下不相等（第 49 條的同系統內變形）。
3. **Umm Kulthum 年份取歌曲首演年**，照池中既有三張的先例，MB 的 `first-release-date` 是 1990 年代 CD 編目年；
   五張都有 Apple `releaseDate` 獨立佐證。
4. **「Shankar」在池中是四個人**：本批兩張釘的是小提琴家 L. Shankar（MB 64c98753，名下 18 RG），
   與 Ravi Shankar（池中 10 張）、Ananda Shankar（2 張）、Shankar Jaikishan（3 張）分開。

### 未收清單（＝§1 候選，可進 c-113～c-115）

| 藝人 | 專輯 | 年 | 情況 |
|---|---|---|---|
| Tabu Ley Rochereau | The Voice of Lightness, Volume 2 | 2010 | MB `f1344adc` 釘得住（Stern's Africa STCD3056-57），**Apple 十六店面全 0 筆** |
| Orchestra Baobab | Ken Dou Werente | 1983 | MB `bcd3ba55` 釘得住（MCA MCA 307），**Apple 十六店面全 0 筆** |
| Yabby You | Jah Jah Way | 1980 | MB `32a27203` 釘得住（Island ILPS 9615），**Apple 十六店面全 0 筆** |
| Ali Akbar Khan | The Forty Minute Raga: Raga Marwa | 1968 | MB **兩筆重複建檔**（`bcb21028` US／`94e6a2e1` FR），Apple 查無 |

**資料本身有問題、非查無**（供本機參考）：
Max Romeo《Let the Power Fall》MB 兩筆重複建檔且年份差一年（`b262d399` 1971／`decc932f` 1972）；
Junior Murvin《Muggers in the Street》MB `19bc34e5` 的首發日期記 2007-11-13、實際原盤 1984。
兩張都改收同一位藝人的別張（《Reconstruction》1978／《Bad Man Possee》1982）。

### 撞卡未收清單

**0 張。** 骨幹名單上的每一位都先實掃過池中現況再選碟，
`chk-prop` 的線上池比對、批內跨組比對與 `dedup-crossbatch.mjs` 跨批比對三道全部 0。
唯一一筆鬆散比對的疑似命中是 **Shankar《Vision》↔ 池中 DOUBLE《Vision》——不同藝人，不算撞卡**，
但已在該卡 `risk` 標明上架時只能靠 `rgMbid` 分辨。

### 場景飽和度

**牙買加已經接近飽和、非洲與拉丁還很空。**
實掃顯示雷鬼／dub 這條線池中人幾乎到齊（Burning Spear 3、Lee Perry 系 7、Augustus Pablo 3、
Scientist 3、Gregory Isaacs 3、Culture 3、Horace Andy 3、Dennis Brown 3、Black Uhuru 4、
Barrington Levy 3、Toots 4、Desmond Dekker 3、Steel Pulse 3、The Congos 3…），
本批補的是名單裡剩下 1–2 張的那十位；再往下就要挖非正典了。
非洲則相反：Fela 15、Tinariwen 8、Ali Farka Touré 6、Mulatu 7 這幾根柱子很深，
但**剛果倫巴（Franco、Tabu Ley、Papa Wemba 1、Le Grand Kallé 0）、迦納 highlife（E.T. Mensah 1）、
幾內亞 Syliphone（Bembeya Jazz 1）整條線幾乎只有代表作**，而且 MB 與 Apple 的覆蓋率都低（本批三張未收全在這裡）。
拉丁的 salsa 已很深（Willie Colón／Lavoe／Blades 17、Palmieri／Puente／Barretto 17），
**古巴本土（Beny Moré 0、Arsenio Rodríguez 0、Irakere 0、Sonora Matancera 0）與墨西哥
（Vicente Fernández 1、Chavela Vargas 1、José Alfredo Jiménez 0）才是真正的洞**——這兩塊值得單開一批。
