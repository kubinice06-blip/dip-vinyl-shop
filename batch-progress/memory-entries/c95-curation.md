## 2026-09-05 — dip-vinyl-shop — c-95 策展提案（爵士與藍調目錄深度）

- **改動摘要**：新增 `batch-progress/c95/prop-a.json`（23 張）與 `batch-progress/c95/prop-b.json`（21 張），
  合計 **44 張、41 位藝人**，`lineType: 廣度`。
  - **a 組＝戰前藍調與芝加哥電藍調目錄深度（23 張、22 位）**：
    戰前／classic blues 16 張——Robert Johnson 2（King of the Delta Blues Singers, Vol. II 1970／The Complete Recordings 1990）、
    Son House 1（Father of the Delta Blues: The Complete 1965 Sessions 1992）、Bessie Smith 1（The Complete Recordings, Volume 1 1991）、
    Ma Rainey 1（Ma Rainey's Black Bottom 1990）、Blind Lemon Jefferson 1（Blind Lemon Jefferson 1974，自我同名）、
    Blind Willie McTell 1（Atlanta Twelve String 1972）、Big Bill Broonzy 1（Sings Folk Songs 1962）、
    Tampa Red 1（Don't Tampa With the Blues 1961）、Victoria Spivey 1（Woman Blues! 1962）、
    Sippie Wallace 1（Women Be Wise 1966）、Ida Cox 1（Blues for Rampart Street 1961）、
    Gus Cannon 1（Walk Right In 1962）、Barbecue Bob 1（Chocolate to the Bone 1992）、
    Washboard Sam 1（Rockin' My Blues Away 1992）、Lonnie Johnson 1（Blues & Ballads 1960）；
    芝加哥電藍調 7 張——Little Walter（Hate to See You Go 1969）、J.B. Lenoir（Alabama Blues 1966）、
    Jimmy Rogers（Chicago Bound 1970）、Elmore James（Whose Muddy Shoes 1968）、
    Earl Hooker（Sweet Black Angel 1969）、Magic Sam（Give Me Time 1991）、Willie Dixon（Catalyst 1973）。
  - **b 組＝爵士正典目錄深度：搖擺到自由（21 張、19 位）**：
    Roscoe Mitchell（Old / Quartet 1975）、Albert Ayler 2（My Name Is Albert Ayler 1964／Spirits Rejoice 1965）、
    Benny Carter（Jazz Giant 1958）、Bix Beiderbecke（Singin' the Blues 1990）、
    Mary Lou Williams 2（Zodiac Suite 1975／Zoning 1974）、Helen Merrill（Helen Merrill 1955，自我同名）、
    Jimmy Rushing（The Jazz Odyssey of James Rushing Esq. 1957）、Roy Eldridge & Dizzy Gillespie（Roy & Diz 1955）、
    Bunk Johnson（…and His Superior Jazz Band 1962）、Kid Ory（Kid Ory Plays W.C. Handy 1959）、
    James P. Johnson（Carolina Shout 1988）、Art Tatum（God Is in the House 1973）、
    Jelly Roll Morton（The Pearls 1988）、King Oliver（The New York Sessions (1929-1930) 1989）、
    Fletcher Henderson（Tidal Wave 1994）、Machito（Afro-Cuban Jazz: The Music of Chico O'Farrill 1956）、
    Sidney Bechet（The Fabulous Sidney Bechet 1958）、Django Reinhardt（The Great Artistry of Django Reinhardt 1953）、
    Teddy Wilson（With Billie in Mind 1972）。
  - **§5.6 合輯 0 張**——這批最大的意外。派工信預期「§5.6 舉證會用得很兇」，
    實掃 34 位藍調藝人名下 1,676 個 release-group 後發現 **MB 的 `primary-type=Compilation` 筆數是 0**，
    戰前整編一律建成 `primary-type=Album` ＋ `secondary-types=[Compilation]`（969 筆），
    依 §5.6 明文照一般 Album 寫、不填例外欄位。44 張裡 18 張屬這一型，已逐張在 `mbNote` 寫明理由。
    詳見 `batch-progress/c95/rulings.md` 第 1 條。
- **主要檔案**：`batch-progress/c95/prop-a.json`、`batch-progress/c95/prop-b.json`、
  `batch-progress/c95/rulings.md`（9 條裁定）、`batch-progress/memory-entries/c95-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c95/chk-prop.mjs a b` → 44 張、41 位、**標記 0**；
  跨批去重掃到 47 批（其中 3 批讀 prop）、2,207 張卡，**跨批撞卡 0**
  （第一次跑抓到 Roscoe Mitchell《Nonaah》與 c-86 撞卡，依第 119 條先到先得改收《Old / Quartet》）。
  44 張全部釘住 release-group MBID 並**逐一回問 `release-group/<id>?fmt=json&inc=artist-credits+releases`**
  確認 title、artist-credit、first-release-date、primary-type、secondary-types 與轄下 release 的國別／status（第 41 條）：
  **合計 119 個 release，status 全數 `Official`**（第 43／57／65／78 條的授權判定）。
  藝人目錄一律用 `release-group?artist=<MBID>&limit=100&offset=` 分頁（第 116 條）——
  本批這條踩得最兇：Django Reinhardt 466 筆、Sidney Bechet 209、Art Tatum 180、Big Bill Broonzy 143、
  Bessie Smith 127、Teddy Wilson 116、Elmore James 114、Tampa Red 113、Benny Carter 107，
  九位藝人的 RG 數都在百筆以上，用 browse 預設的 25 筆會得出大量「假查無」。
  撞卡檢查在 `seed_cards.json` 全 14,424 列上做（正規化用 `\p{L}\p{N}`，第 119 條），
  另對 44 張做「同藝人 ×盤名子字串」的模糊比對，真撞卡 0。
  封面預先探測：對 35 個候選 release-group 打 CAA release-group 端點（5 筆 404，其中 3 筆換釘）；
  最終 44 張再全數重打一次，**43 筆 200、1 筆 404**。

### 這批的裁定（策展層自決，依 2026-09-02 店主下放）

全文見 `batch-progress/c95/rulings.md`，九條摘要：

1. **§5.6 一張都不用開**——MB 沒把戰前整編記成 `primary-type=Compilation`（實測 0 筆）。
   **這條要往後傳給 c-98 與 c-100**：先掃型別分佈再決定要不要開 §5.6。
2. **第 43／57／65／78 條的授權判定**：44 張 119 個 release 全數 Official，不需 Discogs version 頁補充舉證；
   但這是對「這 44 次再發」的判定，不是廠牌白名單。
3. **Roy Eldridge《Roy & Diz》掛名取「Roy Eldridge & Dizzy Gillespie」**，不照 MB 的字母序 artist-credit
   （否則會變成第 8 張 Dizzy 卡而 Eldridge 仍是 0 張）。
4. **四張因為封面／試聽落空而換釘**（Eldridge、Blind Lemon Jefferson、Sidney Bechet、Art Tatum）。
   通則：戰前與 1950 年代的碟，策展層應在定案前先打一次 CAA release-group 端點。
5. **三張的 `year` 不取 MB 的 `first-release-date`**（Ida Cox 1961、Sidney Bechet 1958），依第 91 條。
   全批 21 張的出版年與錄音年落差 ≥10 年，`why` 交代錄音年、`risk` 寫明落差。
6. **Bix Beiderbecke 盤名取《Singin' the Blues》**，不取 MB 的「Volume 1: Singin' the Blues」（第 91／95 條）；
   同型處理 Kid Ory（MB 少一個句點）與 Tampa Red（MB 用彎引號 U+2019）。
7. **五張合掛盤取領銜者當卡片掛名**（Spivey／Ida Cox／Lonnie Johnson／Jimmy Rogers／Elmore James），
   第二掛名寫進 `risk`。
8. **Roscoe Mitchell 改收《Old / Quartet》**——《Nonaah》已在 c-86（第 119 條先到先得）。
9. 兩張 MB 查無、列 §1 補遺候選（見下表）。

### §1 補遺候選（MB 釘不住，未收）

| 藝人 | 專輯 | 年 | 情況 |
|---|---|---|---|
| Benny Carter | Further Definitions | 1961 | 他最重要的一張。藝人 MBID `25cf5731` 名下 107 個 RG **分頁全列後查無獨立條目**，只有《Additions to Further Definitions》(1966, `efbcd221`) 與《Further Definitions + Jazz Giant》(2012 合併重發, `f43f8d8d`)。**Apple 有確切條目 collectionId 1584387773**（Benny Carter and His Orchestra、1962-03-01、8 軌），走 §1 人工身分＋apple-verified-collection 即可成立。本批改收《Jazz Giant》(1958)。 |
| Roscoe Mitchell | Sound | 1966 | AACM 的第一張唱片（Delmark DS-408）。MB 掛在 **Roscoe Mitchell Sextet** 名下，本人實體 `56f33083` 分頁全列 57 筆查無；以「Sound」查只會命中《Sound Songs》(1997) 與《Before There Was Sound》(2011) 兩個假陽性。Apple 亦查無。 |

### 撞卡未收清單

| 藝人 | 專輯 | 撞到 |
|---|---|---|
| Roscoe Mitchell | Nonaah (1977, Nessa) | **c-86 `prop-b.json`**（跨批，第 119 條先到先得）→ 改收《Old / Quartet》(1975) |
| Robert Johnson | King of the Delta Blues Singers (1961) | 池中已有（本批改收 Vol. II 與 The Complete Recordings） |
| Son House | Father of Folk Blues (1965) | 池中已有（本批改收 1992 年的完整 1965 場次） |
| Charley Patton | Founder of the Delta Blues／Screamin' and Hollerin' the Blues | 池中已有 2 張，本批不收（優先補 0–1 張的藝人） |
| Blind Blake | Ragtime Guitar's Foremost Fingerpicker | 池中已有（MB `a2cd59e0` 就是同一張，僅年份記法不同） |
| Skip James／Blind Willie Johnson／Bill Evans | — | 池中分別已有 3／2／23 張，本批不收 |

**其餘因池中已飽和而主動不收的骨幹名單成員**：Bill Evans（池中 23 張，含 Bill Evans Trio 掛名 1 張）、
Erroll Garner（3）、Jimmy Reed（3，已補 Willie Dixon 與 Magic Sam 代表芝加哥線）、Skip James（3）。
**Albert Ayler 的池中 6 筆實為 5 張**——《Spiritual Unity》分別掛在「Albert Ayler」與「Albert Ayler Trio」兩種寫法下，
是既有的掛名分裂，**本機待辦：那兩筆該併成一張**。

### 封面與試聽預估

- **封面**：對全部 44 個釘住的 release-group 打了 CAA release-group 端點，**43 筆 200、1 筆 404**
  （James P. Johnson《Carolina Shout》`573ca4f6`，改走 Apple collectionId 203053431 的 apple-verified-collection 路徑）。
  **44 張全部有封面來源，預估命中率 100%。**
- **試聽**：查到精確 Apple `collectionId` 的 **37 張**（店面：us 35、gb 2——Earl Hooker《Sweet Black Angel》1283483865 與
  Jimmy Rushing《The Jazz Odyssey…》306321094 只在 gb 命中；us／gb 以外未試，本批無非英語系發行）。
  **預估 unavailable 7 張**：Ma Rainey《Ma Rainey's Black Bottom》、Washboard Sam《Rockin' My Blues Away》、
  Blind Lemon Jefferson《Blind Lemon Jefferson》、Roscoe Mitchell《Old / Quartet》、
  King Oliver《The New York Sessions (1929-1930)》、Machito《Afro-Cuban Jazz: The Music of Chico O'Farrill》、
  Kid Ory《Kid Ory Plays W.C. Handy》（僅命中一筆法語 EP，不得採用）——七張的封面都有 CAA，只有試聽缺。
- **⚠ 兩個必須在上架前處理的陷阱**（已寫進各卡 `risk`）：
  1. **Albert Ayler《My Name Is Albert Ayler》的 Apple 條目 152606352 標 `collectionExplicitness=cleaned`**，
     依 §6 淨化版屬不同版本，要先找 explicit 條目。
  2. **Ma Rainey《Ma Rainey's Black Bottom》搜 Apple 首位命中的是 Branford Marsalis 的 Netflix 電影原聲**
     （1539206051）與一支 remix 單曲（1549874259），兩者都不是本盤，封面與試聽層一律不得採用。
  另有 6 張存在 Apple 同名雙胞胎（Benny Carter《Jazz Giant》、Willie Dixon《Catalyst》、
  Jimmy Rogers《Chicago Bound》、Fletcher Henderson《Tidal Wave》、Django《The Great Artistry…》、
  Helen Merrill 自我同名），已在 `risk` 寫明要鎖哪一個 collectionId。

### 場景飽和度

**爵士的美國正典主線（Miles 41／Coltrane 34／Monk 20／Bill Evans 23／Sun Ra 14／Ellington 15）已經很飽，
真正空的是它的兩端**——1920–30 年代的紐奧良與 stride（Bix、Kid Ory、Bunk Johnson、Teddy Wilson、Benny Carter、
Jimmy Rushing 全部 0 張，本批各補 1 張），以及戰前藍調裡的 classic blues 女歌手與 jug band
（Victoria Spivey、Sippie Wallace、Ida Cox、Barbecue Bob、Washboard Sam、Gus Cannon 個人卡全部 0 張，本批各補 1 張）；
芝加哥電藍調的主角（Muddy 12／Wolf 8／Buddy Guy 7／Otis Rush 6）也已飽和，缺的是側翼
（J.B. Lenoir、Jimmy Rogers 0 張，本批各補 1 張）。**這批補完後仍明顯偏薄的：戰後 jump blues 與 R&B
（Louis Jordan、Wynonie Harris、Roy Brown、Big Maybelle 全部 0 張，MB 側多為廉價重複包裝、須另立判準）、
以及 boogie-woogie 鋼琴（Jimmy Yancey、Pinetop Smith、Meade Lux Lewis 幾乎全空）。**
