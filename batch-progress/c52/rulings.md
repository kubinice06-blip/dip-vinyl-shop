# c-52 主線裁定（2026-09-01）

這批是 c-SEA 的收尾：策展層當初提了 124 張，管線只收了有 rgMbid 的 99 張，
剩下 26 張因為「MusicBrainz 查無 release-group」被擱置。本批把它們撿回來，
並替 9/1 上架時因缺封面而留置的 11 張補跑封面線。

---

## 1. 策展層 `mbNote` 記的 MBID 不能照抄——裡面混了藝人 MBID

`prop-*.json` 的 `mbNote` 欄記了不少 MBID，看起來像是現成的身分。但逐個回問
MusicBrainz 之後發現**混了兩種實體**：Panbers、Barong's Band、Angkanang Kunchai、
Dao Bandon、Cinderella 那五筆記的是**藝人 MBID**，不是 release-group MBID
（Barong's Band 那筆的 mbNote 自己就寫明「有藝人條目但底下沒有任何 release-group」）。

§1 要的是 release-group MBID。照抄會釘出一個「指向藝人而非碟」的假身分，
而且格式合法、驗證器擋不下來。

**裁定：所有 mbNote 來的 MBID 一律回問 MB 判定實體類型後才採用**
（`verify-noted.mjs`）。結果：12 張釘得住 release-group、14 張走 §1 的
`identitySource: "manual"` 人工身分路線。

## 2. 用 1972 拼寫改革的變體重查，沒有額外收穫，但值得記錄

上一批發現印尼／馬來語有 1972 年的拼寫改革（oe→u、dj→j、tj→c、nj→ny、sj→sy），
猜想當初的「查無」有一部分是拼法不對造成的。這批用雙向變體重查了一輪
（`requery.mjs`），**結論是沒有**：26 張裡只多找到 1 張（Hoàng Oanh 那筆，
而且是越南文不是印尼文）。

**裁定：拼寫變體不是這批查無的主因**，真正的原因是這些 1970 年代印尼原盤
根本沒進 MusicBrainz。這條線以後不必再試，除非遇到明確以舊拼法印在封面上的碟。

## 3. 封面：worker 的搜尋回的是「最像的東西」，不是「同一張碟」

c-SEA 當初只跑了 CAA，這批補跑 §4 規定的 Bandcamp → Spotify。37 個目標
（26 張新卡 ＋ 11 張留置卡）拿到 12 個「命中」，但照 §4 逐一核對藝人／專輯／版本後，
**其中 5 個是錯的**：

| 卡 | 配到什麼 | 判定 |
|---|---|---|
| Gombloh《Kebyar Kebyar》 | 1985 年的**一軌單曲** | **否決** |
| Elvy Sukaesih《Menghitung Bintang》 | 1980 年的**一軌單曲** | **否決** |
| Koes Plus《Volume 4》 | 《Pop Melayu Volume 4》(1976)，**另一個編號系列** | **否決** |
| Panbers《Volume 1》 | 英國廠牌的《Tom Shorterz - Chav Bangers Volume 1》 | **否決** |
| Zainal Abidin《Zainal Abidin》 | 43 軌的 2013 年合集 | **否決** |

前兩筆與 2026-08-31 在 Apple 試聽探測抓到的是**同一個病**（單曲條目與專輯同名，
只比對標題與掛名分不出來）。來源換了，病沒換。

**裁定：封面一律要把來源端的作品名、掛名、年份、軌數抓回來核對**，
不接受「worker 回了圖就算數」。`probe-covers.mjs` 抓 og 中繼資料、
`adjudicate-covers.mjs` 做判定。

### 3b. 但「軌數少」不能當否決理由——這是我自己先寫錯的規則

第一版的判定把「≤2 軌」列為硬否決。拿線上卡池 2,173 張有 Spotify 中繼資料的卡
回頭驗證，11 張 ≤2 軌的裡面**有 6 張是正確配對**：Klaus Schulze《Timewind》
《Moondawn》、Miles Davis《In a Silent Way》《A Tribute to Jack Johnson》《Pangaea》、
Pharoah Sanders《Black Unity》——這些本來就是整面一首的碟。

**裁定：可靠的訊號是 Spotify 自己標的 `albumType === 'single'` 或標題帶
「- Single」，不是軌數。** 軌數少降為軟旗標。規則已修，並把線上真正錯配的
5 張寫進 `audits/spotify-single-covers.md` 留給本機。

## 4. 改走 CAA 拿版本釘得住的封面，解掉三個裁決案

12 張釘住 rgMbid 的卡改用 CAA 重解（CAA 以 release-group MBID 為鍵，版本釘得住），
**8 張有圖**。其中三張直接解掉上面的年份爭議：

- **Chrisye《Badai Pasti Berlalu》**：Spotify 給的是 1999 年再發，CAA 給的是
  釘在 1977 release-group 上的圖。**採 CAA。**
- **Gombloh《Kebyar Kebyar》**：Spotify 給的是 1985 單曲，CAA 給的是
  1979 release-group 的圖。**採 CAA**，單曲那筆否決。
- **Rhoma Irama《Santai》**：CAA 有圖，Spotify 那筆「Soneta Group: Santai, Vol. 7」
  的長度旗標因此不必再判。**採 CAA。**

## 5. Rhoma Irama《Darah Muda》：卡片年份是對的，但封面是再發版

Spotify 標 1976、卡片記 1975，看起來像卡片錯。但 MusicBrainz 的 release-group
`first-release-date` 是 **1975**，與卡片一致——所以是 **Spotify 那筆為再發**。

CAA 在這張沒有圖，於是唯一拿得到的封面就是那張再發版的。依 §4「封面必須核對
版本」與 2026-08-29 的「封面改釘版本」裁示，再發版的圖不該無聲當成原盤的圖。

**裁定：這張標記為「有候選封面但版本存疑」，交本機決定**——本機有掃圖能力，
也看得到圖本身，比雲端適合做這個判斷。卡片年份維持 1975。

## 6. Karimata《Pasti》：兩個獨立來源都說 1985，卡片記 1986

Spotify 記 1985，Apple 印尼 storefront 也記 1985，MusicBrainz 查無。
兩個獨立來源一致指向 1985。

**裁定：待研究層裁決**（已寫進 b 組的懸案清單）。若研究層也找不到 1986 的來源，
卡片年份應改為 1985。這是本批唯一「卡片年份可能有錯」的一筆。

## 7. 試聽：26 張只有 2 張 ready，是這批的常態不是異常

多國 storefront（id／ph／th／vn／my／sg／us／gb／jp）全試過，只有
Karimata《Pasti》與《Music of Indonesia, Vol. 20》命中。c-SEA 正編是 25/99（25%），
這批是 2/26（8%）——更低是合理的，因為這 26 張正是當初「連 MusicBrainz 都沒有」
的那一批，數位發行的機率本來就更低。

**裁定：不因試聽率低而縮減本批。** §6 的固定試聽是「查得到就釘、查不到記
unavailable」，不是上架門檻。但**自我同名卡例外**——Barong's Band《Barong's Band》
與 Zainal Abidin《Zainal Abidin》兩張若最後既無試聽又無封面，依 §1
「自我同名屬高風險」應由本機決定是否留置（c-SEA 已有 14 張同類留置的先例）。

---

## 8. Duo Kribo《Duo Kribo》(1978)：與線上池撞卡，剔除

研究層查出池中已有 `["Duo Kribo", "Duo Kribo (Original Soundtrack)", …, 1978]`，
**就是同一張碟**。我當初的去重（`build-cand.mjs`）用 `artist|album` 完全字串比對，
尾綴不同就漏了——這正是 §1 明文警告的那類：「除了 artist+album 完全相同，
必須人工檢查：不同 artist-credit、團名尾綴、`Vol.`／`Volume`、重音符號、
特殊符號、譯名」。

**裁定：剔除，本批 26 → 25 張。** 並補寫 `dedup-loose.mjs` 做鬆散去重
（剝括號內容、soundtrack／remaster 等尾綴、Vol./Volume 正規化後再比對），
全批重跑只有這一筆命中，其餘 25 張乾淨。

**沒有順手換成別張。** 研究層指出 Duo Kribo 的自我同名首作其實是 **1977 年
Irama Tara** 那張（8 軌，〈Neraka Jahanam〉排 Rolling Stone Indonesia 歌曲榜第 18），
並給了可用的身分來源。但那是一張**沒有走過策展層檢查**的新卡，臨時塞進來
等於繞過流程。記在這裡當未來批次的候選，本批不收。

## 9. Koes Plus《Volume 4》：年份 1971 → 1972

策展層記 1971。研究層查到：印尼文維基（引 Asriat Ginting《Musisiku》p.59）
與 Discogs 的原盤條目都記 **1972**，而 1971 只出現在 Rolling Stone Indonesia 150
的表列與無來源的 Wikidata，且 **1971 是錄音年不是發行年**。

**裁定：改 1972。** 這張走人工身分路線、沒有釘 MBID，改年份不會與 MusicBrainz
產生內部矛盾（對比下面第 10 條）。

順帶解除策展層留的「廠牌待確認」：正編《Volume 4: Bunga Ditepi Djalan》的廠牌是
**Mesra，編號 LP 50**。研究層另確認「Volume」與「Pop Melayu」確實是兩條獨立的
編號線，曲目零重疊——第 3 條裡否決那張《Pop Melayu Volume 4》(1976) 的判斷成立。

## 10. Rhoma Irama《Darah Muda》與 Indra Lesmana《No Standing》：維持卡單年份

兩張都有「MusicBrainz 與實體盤各執一詞」的年份爭議：

- **《Darah Muda》**：MB 與 Wikidata 記 1975，印尼文維基與 Discogs 原盤
  （Yukawi IMR-90056）記 1976。
- **《No Standing》**：卡單、MB release-group 與 Discogs 的三個實體版本
  （Zebra ZEB-5711／ZRC-5005、Jackson Record JR-068404）全部記 1984，
  但 Australia Awards 的專訪與英文維基作品年表記 1982，說 Zebra 那版是
  「1984 年在美國發行」。研究層查不到 1982 年澳洲盤的實體條目。

**裁定：兩張都維持卡單年份（1975／1984），行文把另一說寫成有據的異說。**
理由與 c-SEA 裁定 #2（越南卡年份維持卡單值、行文寫成區間）一致，
再加一層：這兩張的 `rgMbid` 都釘在 MB 那個年份的 release-group 上，
只改年份而不動 MBID 會讓卡片自己內部矛盾——這正是 Joey Ayala 那筆的教訓。

## 11. Karimata《Pasti》：四組來源三個答案，維持 1986

- **1985**：WartaJazz 專文、英文維基 discography、Apple 與 Spotify 的數位版 metadata
- **1986**：Rolling Stone Indonesia 150 的年份欄（也是策展來源，即卡單值）
- **1987**：印尼文維基 infobox（但同條目的分類掛「Album tahun 1985」，自相矛盾）
  與 Discogs master 底下最早的實體版本

沒有任何一方握有能推翻其他兩方的物證。Discogs 的 1987 只證明「現存最早被建檔的
實體是 1987 年版」；Irama Nusantara 查無此片，無法用實體掃描裁決。

**裁定：維持 1986，行文照 facts 的區間寫，不在簡介裡單寫某一年。**
理由不是「1986 落在爭議區間正中」（那不是理由，那是折衷），而是**沒有來源
足以推翻策展來源**，而串流平台的 metadata 常記的是再發年，單憑它改年份太弱。

研究層建議「若主線要收斂到單一年，改採 1985」——記在這裡，但本批不採用。

## 12. 三個策展理由查無來源，已從卡片移除或標記不得入稿

研究層對三筆的 `curatorWhy` 提出反證或查無：

| 卡 | 策展理由說了什麼 | 查證結果 |
|---|---|---|
| Barong's Band | 與巴里島 barong 面具舞的關聯 | **查無任何來源**。可證實的是樂團在**德國科隆**組成（前身 Kopfjaeger）、本作編曲取材 J.S. Bach（唱片背面明載）。`curatorWhy` 已直接改寫 |
| Indra Lesmana《No Standing》 | 「印尼爵士第一次以本地樂手身分打進國際發行的錄音」 | 最高級宣稱，查無來源支撐，未寫入 facts。可寫的是 Zebra 在美國發行與上 Billboard 爵士榜 |
| Karimata《Pasti》 | 節奏設計與 Erwin Gutawa 的低音線是「教科書級的參照」 | 評價性說法，查無來源，未寫入 facts。可寫的是他在本作擔任貝斯手與主要作曲者之一 |

**裁定：三筆都照研究層的處理。** Barong's Band 那筆之所以要直接改 `curatorWhy`
（而不只是記在 notes），是因為 `curatorWhy` 會餵給 hook 層——留著錯的說法，
下游就會照著寫錯。

另外兩個事實更正：Panbers《Volume 1》的廠牌是 **Mesra Records** 不是 Dimita
（樂團條目誤寫）；Gombloh《Kebyar Kebyar》**確定是專輯**（13 軌、65:52，
1979 Golden Hand），MB 的 primary-type 留空只是建檔未填，第 4 條採 CAA 封面的判斷成立。

---

## 13. 我把 note 的「提示線」當成「硬線」，多退了一輪　（2026-09-01 更正）

hook 層交件時 25 筆 note 是 365–585 字，我以「上限 350 是硬性的」為由整批退回重壓，
最後壓到 276–300。**但 350 不是硬線。**

規格的實際規定在 `desc-tools/qa-batch.mjs` 第 145 行的註解：

> note 長度是成本控制項（過長會複製進寫手輸入被讀第二次）：**>350 提示、>450 才算標記**

`chk-hook-crossgroup.mjs` 在 350 也會列出來，但它的結語是「共 N 項**待人工判斷**」，
同樣不是錯誤。

**這次退回本身沒有錯**——a 組最長 533、b 組 585、c 組 458，三組都越過 450 的真正硬線，
確實該退。**錯的是我把目標訂在 350**，逼代理壓到 276–300，比需要的嚴得多：
多花一輪往返，也可能擠掉施工單裡的細節。正確的做法是要求壓到 450 以下、
並以 350 為理想值，而不是把 350 當成不可越過的線。

**同一類錯誤還有一個**：我告訴寫作層「簡介硬上限 260」，但
`.claude/skills/dip-desc-restyle/SKILL.md` 第 305 行寫的是
**full 卡 180–240、硬上限 280、下限 140；thin 卡 120–180**，
而 `qa-batch.mjs` 只統計 >260 的張數、不計入標記。260 比規格嚴 20 字。

這個沒有中途更正——目標區間本來就是 180–240，260 落在目標與真正上限之間，
是安全的工作線；跟正在寫的代理說「其實可以到 280」只會鼓勵寫更長，反而偏離目標。

**給下一批的教訓：下指令前先讀規格裡的數字，不要憑記憶。**
提示線與硬線混為一談，代價是整批多跑一輪。

---

## 14. 寫作層三個判斷，全部支持

寫作代理 1 主動回報三處落差，三處的處理都對：

**一、《Jurang Pemisah》拒絕跨卡取事實。** hook 層的 note 要求寫「比同一批人的
另一張早半年」，但這張卡的 `facts` 只有 1977 年 4 月 17 日這一個日期，
《Badai Pasti Berlalu》1977 年底的日期在**另一張卡**的 facts 裡。寫手判斷
硬寫等於跨卡取事實，於是略過。

**裁定：正確。** 「facts 是唯一的事實來源」的邊界就是這張卡的 facts，
不是整批的 facts。這與上一批那位拒絕寫 Marshall Sehorn 共同製作人的寫手是同一種判斷。
**該檢討的是 hook 層**：note 不該要求寫一件本卡 facts 裡沒有的事。

**二、《Badai Pasti Berlalu》的來源鏈壓掉最外層。** facts 原文是「印尼文維基引
Kompas 的報導稱，依 ASIRI 資料……」，寫手在字數限制下寫成「Kompas 引 ASIRI 稱
它賣了 9 百萬份」，保留 Kompas→ASIRI 這條核心鏈，省掉「印尼文維基引」。

**裁定：接受。** 維基是我們查到那條資訊的**管道**，不是那個數字的**出處**；
出處是 ASIRI（印尼唱片業協會），Kompas 是報導者。簡介寫的是出處鏈，不是查證路徑。
`qa-batch` 的「未具名出處?」掃描也沒有對這句報警。

**三、曲目點名比 note 的清單少。** 寫手把 note 的「曲目只點 X、Y」理解為上限而非
硬性全列，在 180–240 的限制下砍掉部分曲名。

**裁定：接受，而且這個理解是對的。** note 的曲目清單是**白名單**（只能點這些），
不是**必填清單**。這批西文專名密度極高——一句「Rolling Stone Indonesia 的
150 大專輯排第 N 名」就吃掉 35–40 字——初稿普遍落在 260–360，砍曲名是正確的取捨順序。

## 15. 我把三條禁令寫給了錯的寫手，但分層設計擋住了

simakDialog《Baur》不得提 kendang、Indra Lesmana《No Standing》不得推斷錄音地點、
Karimata《Pasti》年份須寫區間——這三條我寫進了 **writer-1** 的指令，
但那三張卡在 **writer-2**（`merge-writer-input --split=2` 的切法與我的假設不同）。
writer-2 的指令裡沒有這三條。

**結果三條全部被遵守**，因為 hook 層把禁令寫進了**每張卡的 `note`**，
而 `note` 是跟著卡片走的，不是跟著我的指令走。Karimata 那張明確寫成
「首發年各來源不一，落在 1985 至 1987 年之間」。

**教訓：禁令要寫在資料裡，不要只寫在提示裡。** 提示會因為分批、換人、
重跑而錯位；寫進 `note` 的東西會跟著卡片走到底。這次僥倖沒出事是因為
hook 層已經照做了——下次分派寫手前，應該先確認每條禁令對應的卡實際落在哪一份輸入檔。
