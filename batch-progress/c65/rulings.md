# c-65 策展層裁定（2026-09-02，深掘：電子與實驗的冷門硬蕊）

依 2026-09-02 店主的裁定權下放，以下策展／身分／管線判斷由策展層自行決定，不上呈。
判準沿用三條：有先例、可逆、卡住整條線。

## 1. 第 27 條第五次應驗：私壓 new age 與日本 kankyō ongaku 在池中已相當完整

實掃 `seed_cards.json` 全 13,418 列後，原始候選名單有 **18 位已在池中**：
Iasos《Inter-Dimensional Music》、Ernest Hood《Neighborhoods》、Joanna Brouk《Hearing Music》、
Pauline Anna Strom《Trans-Millenia Consort》、Don Slepian《Sea of Bliss》、Inoyama Land、
Yutaka Hirose、Mort Garson、K. Leimer、Steven Halpern、Constance Demby、Robert Rich、
Steve Roach（3 張、已達上限）、Michael Stearns（2）、**Suzanne Ciani（9 張）**、
非常階段（2）、Gigi Masin《Wind》、Laurie Spiegel《The Expanding Universe》。

industrial 的正典那一端同樣已滿：Throbbing Gristle 4、Cabaret Voltaire 5、Coil 13、
Current 93 8、Nurse With Wound 5、Einstürzende Neubauten 9、Laibach 5、Whitehouse 3、
Merzbow 3、SPK 2、Psychic TV 2。**a 組因此整組避開正典，只收其外圈**（自營廠牌、
自資黑膠、磁帶交換網絡），這與第 47 條「深掘線問的是非正典那一端」一致。

## 2. 第 49 條第四種應驗：兩張日本卡以漢字掛名在池中，羅馬拼音候選完全看不見

**吉村弘《Music for Nine Post Cards》(1982)** 與 **芦川聡《Still Way (Wave Notation 2)》(1982)**
早已在池中，且以**漢字掛名**登錄。我原本以 `Hiroshi Yoshimura`／`Satoshi Ashikawa` 提案，
`chk-prop` 的掛名｜盤名主鍵**兩張都判不出撞卡**——因為盤名相同、掛名一個漢字一個羅馬拼音。

**兩張都剔除。** 抓到的方式正是第 71 條要求的做法：以**盤名**為主鍵掃一次池。
（池中 `吉村弘` 另有《Green》，`芦川聡` 那張的盤名還帶括號副標，字串比對更不可能中。）

## 3. Nino Nardini／Roger Roger 的盤名取《Jungle Obsession》，不取原盤的《Jungle Obssession》

1971 年 Neuilly MC 8009 原盤、2009 Vadim Music 與 Crea Sound 盤在 Discogs 上都作
**《Jungle Obssession》（雙 s）**；MB 與 2000 年以後所有授權再發（Dare-Dare DD014、
Farfalla FR06LP）都作 **《Jungle Obsession》**。

**裁定：採《Jungle Obsession》。** 第 50 條管的是「同一個拼法的變體」（標點、重音、大小寫），
那類差異在外部服務的搜尋裡會被正規化掉、命中率不受影響；**這裡是原盤上的拼寫錯誤被再發修正**，
差一個字母不會被任何正規化吸收，照原盤收會造出一個只有本店在用的鍵——那正是第 26／31 條
反覆禁止的東西。原盤寫法已寫進 `risk` 供下游去重與查詢。可逆：改 `album` 欄即可。

## 4. 三個掛名的取捨

- **Beverly Glenn-Copeland**：MB 藝人實體名用 U+2010 連字號（`Beverly Glenn‐Copeland`），
  本卡採官方與 Discogs 的 ASCII 連字號。盤名 MB 用單字元省略號（U+2026），本卡採三個 ASCII 句點
  《...Keyboard Fantasies...》——與第 68 條 Trúbrot《....Lifun》保留前置句點同一個做法。
- **Zoviet France**：MB credit `:zoviet*france:`、Discogs 實體 `:zoviet-france:`、樂團與串流用
  不帶標點的 zoviet france。**三種寫法沒有一個適合當鍵**，依第 11／52 條採「這個對象的通行名」
  `Zoviet France`，另兩種寫進 `risk`，`queryAlias` 填 `zoviet france`（外部服務認得的那一個）。
- **Maurizio Bianchi**：原盤與 MB credit 都是縮寫 `M.B.`，本卡採全名（他現行的發行掛名）。
  `queryAlias` **刻意留空**——依第 25 條的判準，把「M.B.」填進去只會讓封面／試聽去打一個
  兩字母的字串，命中率是變低不是變高。
- **Konstruktivists**：原盤印成少一個 s 的 `Konstruktivits`、MB 實體名又是單數的 `Konstruktivist`。
  用現行團名查 release-group 零命中，必須走藝人 MBID browse（第 10 條）。

## 5. 三筆因 MB／標題結構而剔除，不是因為資料不足

- **The London Studio Group《Abstractions of the Industrial North》(1966, Music De Wolfe)**：
  想收的 De Wolfe 代表作，但 MB 的 release-group **primary-type 為 null**，不符 §1 的
  「只收 primary-type=Album」。改收 **Nick Ingman《Big Beat》**（同為 De Wolfe，MB 標 Album）。
- **The Hafler Trio《"BANG" – An Open Letter》(1984)**：MB 標題含 U+2013，正踩 `chk-prop`
  的非 ASCII 連字號反模式（第 6 條又禁止為了下游方便改盤名），無解，剔除。
- **Various Artists《Columbia-Princeton Electronic Music Center 1961–1973》(1998)**：同上，
  標題的年份區間用 U+2013。這是本批唯一想收而收不到的「大學電腦音樂中心」正面代表。

## 6. 兩筆走第 82 條（完全沒有授權再發，靠機構與文獻舉證）

- **Charles Dodge《Earth's Magnetic Field》(1970, Nonesuch H-71250)**：零第三方再發，
  分量來自哥倫比亞—普林斯頓電子音樂中心的機構脈絡與 Nonesuch 自家的多次重壓。
- **İlhan Mimaroğlu《Wings of the Delirious Demon and Other Electronic Works》(1972)**：
  Discogs 上的兩筆復刻**全部標 Unofficial**（Sanity Muffin、Dolor Del Estamago），依第 43 條
  不得採為背書；分量來自 Finnadar 由 Atlantic 出資配銷、1973 年 Atlantic 澳洲授權壓片，
  以及作品在哥倫比亞—普林斯頓中心完成這件事。

**對照剔除的一筆**：**Pietro Grossi《Computer Music》(1972, Two Nuns)** —— 想收的義大利
電腦音樂第一張，但 Discogs 3 個版本裡兩筆再發**都是 Creel Pone**（專出未授權學院電子音樂
復刻的廠牌），且我在雲端查不到可引用的文獻條目，依第 43 條剔除。

## 7. 合輯的四筆處理，三種結果

| 卡 | MB | Discogs | 本卡 |
|---|---|---|---|
| BBC Radiophonic Workshop《BBC Radiophonic Music》 | Album＋secondary Compilation | 1968 原盤作 LP, Album | **Album**（§5.6 明文：primary Album 帶 Compilation secondary 照一般 Album 寫） |
| Various Artists《Music for Dancefloors: The Cream of the Chappell Music Library Sessions》 | Album＋Compilation | Compilation | **Compilation**＋§5.6（且為 VA，第 72 條強制） |
| Lejaren Hiller《Computer Music Retrospective》 | Album、無 secondary | LP, Compilation | **Compilation**＋§5.6 |
| Michele Mercure《Beside Herself》 | Album、無 secondary | Compilation | **Compilation**＋§5.6 |

**判準**：以 **Discogs 版本頁的實際格式描述**為準，不以 MB 的 type 欄為準——MB 的
primary/secondary 反映的是建檔者為那個 RG 選的命名版本（第 91 條），Discogs 的格式描述
記的是那張實體盤本身。三張 Compilation 卡的年份都依第 84 條記該編輯版本首度問世年
（2001／1986／2018），不是 MB 的 first-release-date。

## 8. 兩張年份與 MB 脫鉤、四張年份兩說，全部依第 18／46 條處理

- **Lejaren Hiller《Computer Music Retrospective》**：Discogs 原盤 LP 1986／MB 記 1989
  （那是 WER 60128-50 重製版）。取 **1986**。
- **Various Artists（Chappell）**：MB 的 first-release-date **空白**、轄下唯一 release 也無日期，
  年份 **2001** 取自 Discogs 的 Strut STRUTCD 010／STRUTLP 010 三筆版本。
- 兩說並存、卡單值維持、行文不得斷言發行年的四張：
  **Nocturnal Emissions《Tissue of Lies》**（MB 1980／Discogs 原盤 1981，取 1981）、
  **Craig Leon《Nommos》**（MB 與 Discogs 皆 1981，坊間常寫 1980）、
  **Bernard Xolotl《Last Wave》**（MB 1982／Discogs master 1985，取 1982）、
  **Cecil Leuter《Pop Electronique》**（Discogs 原盤**完全沒有年份**，1969 只有 MB 一個來源）。

## 9. 第 65 條在本批中三例，兩例出自同一個冒名實體

- **Doris Norton《Personal Computer》**：兩筆 2010 年歐洲盤標 Unofficial，冒用的廠牌實體是
  **「Durium (2)」**（原廠是 Durium），且**直接沿用原編號 DAI 30413**。
- **Nino Nardini《Jungle Obsession》**（3 筆）與 **Cecil Leuter《Pop Electronique》**（2 筆）：
  未授權盤**全部出自同一個德國實體「Fifth Dimension (2)」**，兩張碟被同一批人盜印。
  這是第 57 條「判定單位是這一次再發」的反面樣本——同一個冒名實體橫跨兩張碟，
  但仍要逐筆看版本頁，不能因為「這家又是它」就整批推定。

授權狀態逐筆實查的結果：47 張裡 **38 張的 Discogs 版本頁零筆 Unofficial**；
8 張各有 1–3 筆未授權盤（Craig Leon、M.B.、The New Blockaders、Nocturnal Emissions、
Doris Norton、Cecil Leuter、Nino Nardini、Ruth White，都已在 `risk` 或 `why` 指名）；
1 張（Mimaroğlu）**全部再發皆未授權**、改走第 82 條。

## 10. 兩個工具面的提醒（給本機與下一批）

- **`artist/<MBID>?inc=release-groups` 這條 browse 路徑預設只回 25 筆**，
  Maurizio Bianchi 名下有 305 個 release-group，用 inc 版本會漏掉《Symphony for a Genocide》
  並得出「MB 沒有」的假結論。**要用 `release-group?artist=<MBID>&limit=100&offset=N` 分頁。**
  這是第 28 條那個「假查無」的第三種形狀：不是 503，是**分頁上限**。
- **Discogs 的 `versions` 端點不回授權欄位**，`Unofficial Release` 只出現在 `format` 字串裡；
  `status` 欄回的是 Discogs 的建檔品質（Accepted），與授權無關。用 `status` 判授權會全部誤放。
