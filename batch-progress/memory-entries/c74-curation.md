## 2026-09-03 — dip-vinyl-shop — c-74 策展提案（深掘：英國 1980s indie pop 微廠）

- **改動摘要**：新增 `batch-progress/c74/prop-a.json`（22 張）與 `batch-progress/c74/prop-b.json`（23 張），
  合計 **45 張、40 位藝人**，`lineType: 深掘`。
  - **a 組＝Sarah／Subway／53rd & 3rd／Bristol 圈**（22 張）：Sarah Records 15 張
    （The Orchids 2、The Field Mice 2、Heavenly 2、Blueboy 2、Secret Shine、Brighter、
    Even as We Speak、The Sweetest Ache、Harvey Williams、The Wake、St. Christopher、The Sea Urchins）、
    Subway Organization 3（The Flatmates、The Chesterfields、The Groove Farm）、
    53rd & 3rd 1（The Pooh Sticks《Orgasm》）、Vinyl Japan 1（Northern Picture Library）、
    Thunderball 1（14 Iced Bears）。
  - **b 組＝él／Creation 早期／Whaam!／Cherry Red／Ron Johnson 一系**（23 張）：
    él Records 7（Momus、Louis Philippe、The King of Luxembourg、Anthony Adverse、
    Marden Hill、Would-Be-Goods、Bad Dream Fancy Dress）、
    Creation 早期 CRELP 個位與二十幾號 5（Biff Bang Pow! CRE LP4、The Membranes CRELP 006、
    The Jasmine Minks CRELP 025、Razorcuts CRELP 026、Momus CRELP 036）、
    Whaam!／Artpop! 3（The Times、Television Personalities、Marine Girls）、
    Cherry Red 2（Tracey Thorn、The Monochrome Set）、
    Ron Johnson／Shelfish／In Tape／Midnight Music／Pop Aural 6
    （A Witness、Bogshed、Yeah Yeah Noh、McCarthy、The Wolfhounds、Fire Engines）。
  - **合輯 2 張**（走 §5.6，均帶 ≥12 字 `exceptionReason` 與 2 個 HTTPS 證據網址）：
    The Sea Urchins《Stardust》(Sarah 609；MB 自身標 Album/Compilation)、
    The Flatmates《Love and Death》(SUBORG 14；MB 未標 Compilation、Discogs 標 Compilation，從嚴走 §5.6)。
  - **自我同名卡 1 張**：14 Iced Bears《14 Iced Bears》(1988)，已實查 Apple 英國區有條目
    （collectionId 437494009，releaseDate 1988-09-19），依簡報第二節可收。
  - **年份與 MB 脫鉤 1 張**：Biff Bang Pow!《Pass the Paintbrush, Honey》採 Discogs 原盤直記的 **1985**
    （MB 記 1984，兩筆 Discogs 原始壓片皆記 1985，依裁定第 127 條）。
  - **盤名與 release-group 標題不相等 3 張**（第 50／91／95 條）：
    The Groove Farm《Alvin Is King!》(MB 無驚嘆號)、The Times《Pop Goes Art!》(MB 無驚嘆號)、
    Biff Bang Pow!《Pass the Paintbrush, Honey》(Discogs 原盤帶尾點)。
  - **掛名採原盤寫法、與 MB artist-credit 不同 3 位**：
    Would-Be-Goods（MB 用 en dash「Would–Be–Goods」）、Bogshed（MB 作「Bog-Shed」）、
    The Chesterfields（Discogs 作「The Chesterf!elds」）。三者的變體皆已填 `queryAlias` 或寫進 `risk`。
- **主要檔案**：`batch-progress/c74/prop-a.json`、`batch-progress/c74/prop-b.json`、
  `batch-progress/memory-entries/c74-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c74/chk-prop.mjs a b` → 45 張、40 位、**標記 0**
  （跨批去重 25 批、1304 張、撞卡 0）。45 張全部釘住 release-group MBID，並逐個回問
  `release-group/<id>` 確認 primary-type=Album 與標題（第 41 條）；對照組（EP、單曲、合輯、
  二合一與三合一套裝、同名雙胞胎）皆在 `mbNote` 明寫「刻意不釘」（第 99／126／129 條）。
  40 位藝人在 `seed_cards.json` 全 13,913 列實掃下皆未達 3 張上限。

### 未收清單一：**只有單曲／EP，MB 上查無 primary-type=Album**（這條線的常態，逐項記清免得重查）

| 藝人 | MB 上有什麼 |
|---|---|
| The Springfields（美國，Sarah） | 4 張單曲 ＋ 2019《Singles 1986-1991》(Compilation) |
| Gentle Despite | 1990《The Darkest Blue EP》＋ 1991 單曲〈Torment to Me〉，共 2 筆 |
| Action Painting! | 3 張單曲；1995《Our Heads Are Round…》primary-type **空**、2018《Trial Cuts》Compilation 且重複建檔兩筆 |
| The Poppyheads | 1987《Postcard For Flossy EP》＋ 1988 單曲，共 2 筆 |
| The Rosehips | 單曲與 EP；Album 條目全是 Compilation 或 Live |
| The Golden Dawn（蘇格蘭那個） | 2 張單曲 ＋ 2008 EP，共 3 筆 |
| The Beat Poets（99c8d005…） | 藝人實體 **零 release-group** |
| bIG fLAME | 2 張 EP ＋ 2 張單曲；唯一 Album 是 1996《Rigour 1983 - 1986》(Compilation) |
| The Loft | 1985《Up the Hill & Down the Slope》EP；Album 條目全是 Compilation（2025／2026 的新作不屬本批年代） |
| The Sugargliders | 10 張單曲；Album 條目全是 Compilation |
| The Sea Urchins | 同上——本批以 §5.6 收《Stardust》，這支團確實沒有正規專輯 |
| Tramway | 2 張單曲 ＋ 1994《A Brand Of Lovin'》（名額割捨，非查無） |

### 未收清單二：**與池中撞卡**

- `chk-prop` 實抓 1 筆：**McCarthy《I Am a Wallet》已在線上池** → 改收同團的
  《The Enraged Will Inherit the Earth》(1989, Midnight Music CHIME 00.47 S)。
- 開工實掃即避開的：The Field Mice《Snowball》、Another Sunny Day《London Weekend》、
  Heavenly《Le Jardin de Heavenly》、The Wake《Harmony》、The Pastels《Up for a Bit with The Pastels》、
  BMX Bandits《C86》、The Shop Assistants《Shop Assistants》、The Vaselines《Dum-Dum》、
  Talulah Gosh《Backwash》、Television Personalities《And Don't the Kids Just Love It》、
  The Monochrome Set《Strange Boutique》、The Wolfhounds《Unseen Ripples from a Pebble》、
  The June Brides《There Are Eight Million Stories...》、Close Lobsters《Foxheads Stalk This Land》、
  Aztec Camera《High Land, Hard Rain》、Orange Juice《You Can't Hide Your Love Forever》、
  Josef K《The Only Fun in Town》、Felt ×2、The House of Love、The Wedding Present ×2、
  The Jesus and Mary Chain ×4、Primal Scream ×3、The Smiths ×5、Everything but the Girl ×2、
  Stereolab ×3、Denim。
- **Another Sunny Day 與 The Shop Assistants 補不了深度**：兩支團唯一的 Album 分別是已在池的
  《London Weekend》與已在池的自我同名，其餘皆為單曲或 Compilation。
- **Talulah Gosh《They've Scoffed the Lot》(1991, Sarah 607) 不收**：MB 標 Album 且 secondary 為空，
  但內容是單曲與 session 的整理，與池中已有的《Backwash》曲目重疊，屬同一批錄音的第二種包裝（§5.6 禁項）。

### 未收清單三：**舉不出授權背書（第 43／57／65／78 條）**

- **The Shrubs《Take Me Aside for a Midnight Harangue》**(Ron Johnson Z RON 23, 1987)：
  Discogs 上只有原盤一筆條目、零復刻，也找不到可署名的樂評或參考書條目。
- **The Great Leap Forward《Don't Be Afraid of Change...》**(Communications Unique C*U LP - 001, 1988)：
  Discogs master 502386 只有原盤與一張白標 test pressing，同上。
- **The Servants《Disinterest》**(Paperhouse PAPCD 05／PAPLP 005, 1990)：Discogs 只有 1990 年三筆，無復刻。

### 未收清單四：**大廠或範圍外**

Stump《Quirk Out》（原盤 Stuff Records STUF/U2 1986，但 1987 年起改由 Chrysalis 在法／歐／澳發行）、
The Weather Prophets《Mayflower》(Elevation ELV1，WEA 出資的 Creation 子牌)、
Win《Uh! Tears Baby》(Swamplands／London)、The Bodines《Played》(Magnet)、
Boyracer《More Songs About Frustration and Self Hate》(美國 Slumberland ＋ 德國 A Turntable Friend，
不在英國微廠線上)。

### 未收清單五：資料齊全、純因 45 張名額割捨（要擴編可直接補，不必重查）

The Orchids《Striving for the Lazy Perfection》(Sarah 617)、St. Christopher《Man, I Could Scream》(Vinyl Japan ASKCD 6)、
The Hit Parade《More Pop Songs》(Vinyl Japan ASKCD 5)、The Chesterfields《Crocodile Tears》(Household HOLD 4LP)、
14 Iced Bears《Wonder》(Borderline BORD 002)、The Pastels《Sittin' Pretty》(Chapter 22 CHAP LP 43)、
BMX Bandits《Star Wars》(Vinyl Japan ASK CD7)、Momus《The Poison Boyfriend》(Creation)、
Louis Philippe《Ivory Tower》(él ACME 15)、The Jasmine Minks《The Jasmine Minks》(Creation CRELP 007，自我同名)、
The Times《This Is London》(Artpop! ART 19)、Marine Girls《Lazy Ways》(Cherry Red BRED 44)、
Bogshed《Step on It》(Shelfish 2)、The Weather Prophets《Judges, Juries & Horsemen》(Creation CRELP 033)、
Television Personalities《They Could Have Been Bigger Than the Beatles》(Whaam! 5)、
The Sugargliders《A Nest With a View 1990-1994》(Matinée，走 §5.6 才收得到)。

### Postcard 這條線交白卷（記下來不要重查）

Postcard Records（Glasgow, 1980–81）一生只出過**一張 LP**——Josef K《The Only Fun in Town》，
**已在池**。Orange Juice 與 Aztec Camera 在 Postcard 時期只有 7 吋，兩人的專輯（《You Can't Hide
Your Love Forever》《High Land, Hard Rain》）也已在池。b 組改以同城同期的 Fire Engines
《Lubricate Your Living Room》(Pop Aural ACC 001) 代表愛丁堡那一塊。

### 封面與試聽預估

- **封面**：45 張全部在 Discogs 有 master 或 release 條目與封面圖，CAA 以 MBID 為鍵、
  Sarah／Cherry Red／Creation／Fire 幾家的 MB 建檔完整度高，預估可得率高。
  唯一的自我同名卡（14 Iced Bears）已確認 Apple 有條目。
- **試聽**：Cherry Red 與 Fire Records 一系最齊（Tracey Thorn、The Monochrome Set、
  Television Personalities、McCarthy、Razorcuts、Marine Girls、The Times）；
  Sarah 一系近年由 Skep Wax、A Colourful Storm、Emotional Response、Saint Marie、1972、
  Daydream 重製後也有數位版。**預估最弱的六張**（已在各卡 `risk` 標明）：
  Brighter《Laurel》、St. Christopher《Bacharach》、Harvey Williams《Rebellion》、
  The Groove Farm《Alvin Is King!》、A Witness《I Am John's Pancreas》、
  Fire Engines《Lubricate Your Living Room》。

### 場景飽和度

**這條線在池中幾乎整片為零，45 張收完仍然很空**——Sarah 的 100 張目錄本批只碰到 15 張、
él 的 ACME 三十幾號只碰到 7 張、Subway 與 53rd & 3rd 各只有 3 張與 1 張，
Ron Johnson、In Tape、Vinyl Drip、Dreamworld、Medium Cool、Pink Label、Bring On Bull 幾家
不是各只收到一張就是完全沒動；再開一批 40 張仍然挖得到。

- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制、`manual:depth-rubric`）、
  頂點資格評估、封面、簡介、固定試聽、Firestore／KV／`seed_cards.json` 寫入。
