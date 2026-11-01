# add-20261101-eb2 裁定（鐵幕爵士＋MPS 策展線・匈牙利＋捷克斯洛伐克）

> 店主 2026-11-01：「Yancy Körössy* - Identification 收錄 並且擴展相關專輯」→「擴張到 200 張」（交接 `batch-progress/eastbloc-jazz-20261101/PLAN.md`）。本工作階段負責 eb1、eb2。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-eb2a.json`（24：匈牙利）＋`curation-eb2b.json`（24：捷克斯洛伐克）→ 主線汰 8（`master-override-eb2aeb2b.json`）→ `master-eb2aeb2b.json`（40 張：MB 釘住 21、§1 人工 19）→ `pick.json`（40）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261101-eb2-cards.json`（40 張；研究 a–e 各 8）。
> **預留：研究 a 47101–47110、b 47111–47120、c 47121–47130、d 47131–47140、e 47141–47150、鉤子 47151–47160、寫作 47161–47170、主線 47171–47180。**（eb 線條號：ebN → 47001＋(N−1)×100 起，每批 80 條。）
---

## 主線策展（不佔條號）
- **策展 48 張 → 收 40 張（匈牙利 22、捷克斯洛伐克 18）；對 seed 與 origin 163 條 main／claude/* 分支 seed 去重 0 撞。**
- **匈牙利人名照卡池慣例用西式「名 姓」**（池中 Gabor Szabo、Gábor Lázár、Ernő Dohnányi、Dezső Ránki 皆然）；團名照封面。同一人統一掛名以便藝人介紹歸戶：Szabados Quartet《Az Esküvő》→「György Szabados」；《A Szarvassá Vált Fiak》→「György Szabados & MAKUZ」；Pege Trio《Bass On Top》→「Aladár Pege Trio」。原寫法放 queryAlias。
- Walter Norris & Aladár Pege《Synchronicity》（Enja，西德錄）國別改 hu：派系屬匈牙利，Pege 為主角之一。
- **主線汰 8**：Mária Toldy《Viaszbaba》（爵士化流行／bossa，爵士歸屬邊緣）、Károly Binder《Kontinentspiel》（Binder 另收 1983 與 Tchicai 合作盤）、Velebný & SHQ《Jazzové nebajky》（SHQ 已收《Nonet》《Motus》）、Jazz Q《Symbiosis》（Jazz Q 留《Coniunctio》《Pozorovatelna》）、Stivín《Zvěrokruh》（Stivín 留《5 ran do čepice》《Výlety》）、Energit《Piknik》（Energit 留首作）、Brom & Maynard Ferguson《Maynard + Gustav》（策展自己存疑是否錄音室盤）、Fermáta《Huascaran》（Fermáta 留首作；年份三源不一）。
- MB release-group 首發日為重發年的照釘：Csaba Deseő《Ultraviola》（MB 2009 重發，原盤 1977 Pepita）；Jazz Q《Pozorovatelna》MB 掛名 Jazz Q Praha，同一團。

## 研究 b 組（47111–47120）
- **47111**　Aladár Pege Trio《Bass On Top》：Discogs release 8157958／master 1591988 是 1966 Supraphon SUK 35627 的 **7 吋 45 轉單聲道 EP（兩曲）**，不是完整 LP。標 thin，建議主線決定是否保留（規模存疑）。
- **47112**　György Vukán《Derby》：實為兩幕舞劇組曲（管弦樂＋銅管＋Super Trio 列名），非爵士鋼琴專輯；moodGuess 存疑（偏重、戲劇性，非輕）。年份 Discogs 1989、影片說明 1988，採 1989。
- **47113**　Szakcsi Lakatos《Sham》：錄音 1989-12，Hungaroton 影片的 1989-07-04 牴觸，發行年採 1990；〈Crying For Temesvár〉與羅馬尼亞起義只寫「曲名指向」。
- **47114**　Gonda Sextet《Sámánének》：hu 維基記 1975，Discogs／MB／℗ 皆 1976，採 1976。
- **47115**　Ultraviola：廠牌採 Pepita（SLPX 17504），hu 維基記 Hungaroton；年份 1977 保留（影片 1976-04-28）。
- **47116**　Super Trio《Birthday Party》：Discogs 1987、影片 1986-10-19，保 1987；無獨立樂評故 thin。
- 其餘（Synchronicity、Tomsits）無推翻。全組 8 張，facts 8–9 條，Discogs API 以 WebFetch 讀取（直連 curl 被權限擋）。

## 主線（條號 47171–47180）
- 47171：照研究 b 組推翻策展層換 2 張。**Aladár Pege Trio《Bass On Top》**：Discogs master 1591988 只有兩個版本，皆 1966 Supraphon 7 吋 45 轉（〈Salute To Ray Brown〉〈Dalia〉兩首），是單曲不是專輯，汰。**György Vukán《Derby》**：兩幕舞劇組曲，管弦樂團＋Budapest Brass Ensemble＋人聲，Vukán 掛作曲指揮，不是爵士盤，汰。補回主線先前汰換區的 **Károly Binder《Kontinentspiel》**（1989 Krém，MB 釘住）與 **Energit《Piknik》**（1978 Panton，MB 釘住），同置 group b 原位，由研究 b 組補研究。匈牙利 21、捷克斯洛伐克 19。

## 研究 a 組
- **47101**：Pege《Pege》（Pepita 1980）Discogs 標 Compilation，三首為 1976–78 爵士節現場錄音，客座 Art Farmer／Leo Wright／Benny Bailey／ORF Big Band。BMC 列為其個人專輯，但依 PLAN「只收正規錄音室專輯」→ 列移除候選，交主線裁量；facts 照實寫選輯性質。《Bass on Top》已另收。
- **47102**：Dresch《...Folyondár...》為現場專輯（1995-05-12 Közgáz Jazz Club，MB 亦標 Live）；現場例外條件（最重要作品即現場盤）Dresch 不成立，交主線裁量；Dresch 另已收《Mozdulatlan Utazás》。
- **47103**：Szabados & MAKUZ《A Szarvassá Vált Fiak》為 1985 年 Győr 芭蕾舞劇音樂（器樂大樂團，無合唱）。moodGuess「合唱加樂團」前提不成立，列 moodGuess 存疑；英文維基「1956 革命」靈感說與 Retkes／Discogs 的 1985 舞劇委託不同，facts 採後者。
- **47104**：Szabados《Adyton》年份 Discogs／Retkes／維基 1983，BMC 1982；採 1983。BMC 稱「自行發行」與封面 Krém 不符，不採。
- **47105**：Binder Quintet 年份英文維基 1982，其餘 1983，採 1983；Discogs 全曲作曲記 Dresch，單一來源，用「記為」。
- **47106**：Mozdulatlan Utazás 即 BMC／classical-music 的《Riding the Wind》（Fonó FA-084-2 同 November Music NVR 2003-2）；已在 facts 兩個號都寫。
- **47107**：Grencsó《1988-89》資料極薄（只有 Discogs＋維基目錄），status thin；Adyton 001／1990 為 Discogs 單一來源；moodGuess「冷」無聲音證據，列存疑。
- **47108**：主線採我的建議汰 Pege《Pege》與 Dresch《...Folyondár...》，原位換入 Fermáta《Huascaran》與 Jazz Q《Symbiosis》（MB 釘住）；兩筆舊研究已自 a 檔移除。
- **47109**：Fermáta《Huascaran》年份：錄音 1977 年 6 月、封面與 ℗ 皆 1977、斯洛伐克維基／MB／Apple 1977；Discogs master 與英文維基 1978 源自最早的 Gramofónový klub 會員版壓於 1978。裁定卡片年份保留 1977，實際上市日查不到。〈80 000〉地震死亡人數說法僅 Jazz Music Archives 單一來源，只寫『曲名取自地震』。
- **47110**：Jazz Q《Symbiosis》1973 年 3–10 月錄、1974 Supraphon；moodGuess 的「冷、重」無聲音證據（鍵盤＋英語女聲＋大鍵琴／管風琴，旋律性強），列存疑。全組現為 8 張：full 7、thin 1（Grencsó）。
- 本組 8 張：full 7、thin 1；facts 7→8 至 9 條皆 https；推翻策展層：Pege 非單一錄音室盤、MAKUZ 盤無合唱、Dresch Folyondár 為現場盤。
- **47117**　（換卡）Bass On Top／Derby 經主線汰除，研究稿改為 Károly Binder《Kontinentspiel》與 Energit《Piknik》。
- **47118**　Binder《Kontinentspiel》：Discogs 1989（Krém SLPX 37210），影片說明 1986，保 1989。實為單人多樂器（鋼琴、豎琴、打擊樂、人聲）加踢踏舞者的長篇自由即興，curatorWhy「鋼琴／樂團」不準；moodGuess 存疑（躁、輕與無鼓長篇不符，應偏靜）。thin。
- **47119**　Energit《Piknik》：推翻策展層「第二張」（cs 維基年表為第四張）；「被樂迷肯定／近年重發」查無來源未寫。thin。

## 研究 d 組（47131–47140）
- **47131**：8 張全走 Discogs master／release API 取 credits、notes、錄音日期；Discogs 全部對上卡單盤名、年份、廠牌。維基（cs／en）只補人物生平。Wikimedia 直連 raw 被擋，改 WebFetch。
- **47132**：Velebný《Nonet》SABA SB 15 160 ST，1968-02-20 錄於 Villingen SABA-Tonstudio（MPS 所在地）；標籤印《Nonet》，英文維基寫《Karel Velebný Nonet, SHQ & Woodwinds》。九人編制由 Discogs 名單數出。1968 秋天車禍僅捷克維基單一來源，標出處、不寫傷勢。
- **47133**：Velebný《Motus》Discogs ℗1972、錄音 1971-02-09～03-17；英文維基列 1971。取 1972。
- **47134**：Déczi《Pietoso》錄音 1968-11-07～13；MB 同名 RG f49624ee 本層未能確認，不動人工身分。Clifford Brown／Miles 影響僅捷克維基。
- **47135**：Déczi《Jazz Cellula》版權年 1978、錄音 1977-06（Pezinok Opus 錄音室）；Apple 標 1977 即錄音年，卡單 1978 不動。
- **47136**：Stivín《5 ran do čepice》錄音日期 1972-02-25～27 僅 kultowenagrania.pl 單一來源，另有 1974 說法，卡單 1972 不動。
- **47137**：推翻策展層：Stivín & Favre《Výlety》實為 24 首（A9、B7、C3、D5），非策展層寫的 28 軌。
- **47138**：Dašek《Pohádka pro Beritku》為單聲道會員版；曲目自寫 5＋標準曲 4。「首張個人專輯」無來源，不寫。
- **47139**：Dašek《Dialogy》資料最薄（無樂評、無廠牌文案），status thin；每首對手樂手來自 Discogs 曲目 credits。
- **47140**：moodGuess 存疑（不汰）：《5 ran do čepice》「尖銳」、《Výlety》「稀疏尖銳」（實為柔和木管與小打擊樂）、《Dialogy》「無調」皆無聲音來源可證；其餘與 Discogs 風格標籤相符。
- 本組 8 張：full 7、thin 1；facts 8 至 9 條皆 https；推翻策展層 1 處（Výlety 軌數）。
- 47172：照研究 a 組再換 2 張。**Aladár Pege《Pege》**（1980 Pepita）：Discogs 標 Compilation，三首是 1976–78 爵士節現場（客座 Art Farmer、Leo Wright、Benny Bailey、ORF Big Band），不是正規錄音室專輯，汰；Pege 只留《Synchronicity》。**Mihály Dresch Quartet《...Folyondár...》**：1995-05-12 Közgáz Jazz Club 現場，MB 標 Live，Dresch 最重要作品不是現場盤，不開例外，汰；Dresch 留《Mozdulatlan Utazás》。補回汰換區 **Jazz Q《Symbiosis》**（1974 Supraphon）、**Fermáta《Huascaran》**（1977 Opus），皆 MB 釘住，置 group a 原位。匈牙利 19、捷克斯洛伐克 21。《A Szarvassá Vált Fiak》是 MAKUZ 為 Győr 芭蕾舞團寫的器樂大樂團舞劇音樂（非合唱），屬 Szabados 自由爵士樂團正作，照收。

## 研究 c 組
- **47121**　Csík《Csík Gusztáv És Együttese》：匈牙利維基稱 1977 首張大碟是波蘭 Polskie Nagrania《Jazz Jamboree 77 Vol.1》，與 Pepita SLPX 17506 並存、關係不明；facts 只寫 Discogs 可核的 Pepita 版，不寫『第一張大碟』。thin。
- **47122**　Bergendy《Jazz》：確認全盤四首器樂長曲、爵士搖滾；匈牙利維基證實樂團 1958 年起家是大學爵士團，不推翻策展層。thin。
- **47123**　Dimenzió：János Másik／Janos Masik 視為同一人，不查其他身分；『唯一專輯』不寫。thin。
- **47124**　Syrius《Széttört Álmok》：1976 為換血後陣容，不可套 1970–73 傳奇陣容；『匈牙利爵士館藏第一』未核實，不寫。thin。
- **47125**　Berki：Shabu-Shabu 成員 Discogs 未標，只寫全員陣容；Fogarasi／Jávori 即 Csík 三重奏班底。thin。
- **47126**　Harcsa《Red Baggage》：Discogs 2008 vs 維基 2009，卡單 2008 不推翻，寫作層不寫月份；2009 Fonogram 獎屬前作，不寫。thin。
- **47127**　Jazz Q《Coniunctio》：Discogs 版本為 Gramofonový klub 版；B 面曲長兩源不一致，只寫 A 面 19:15。full。
- **47128**　Jazz Q《Pozorovatelna》：1973-01-29 錄音日僅 Discogs 單源，建議寫『1973 年初』；〈Pori 72〉不寫成芬蘭 Pori 爵士節。full。
- **47129**　全組 moodGuess 存疑（聲音無樂評佐證，僅 credits／風格標籤）：Csík、Bergendy、Dimenzió、Syrius、Berki、Harcsa 的『躁／靜』軸；Coniunctio、Pozorovatelna 與 moodGuess 吻合。無須汰換。

## 研究 e 組（47141–47150）
- **47141**　Viklický《Okno》：年份 Discogs／MB 1981，盤面 ℗ 1980，cdmusic.cz 與英維基 1980；寫『1979 年錄成、1980–81 年發行』。錄音日 Discogs 11–13 日、cdmusic 11–14 日，採 Discogs。Vinnie／Vinton Johnson 同人。full。
- **47142**　Viklický《V Holomóci Městě…》：Holomóc＝哈納方言的奧洛穆茨（cs 維基 Olomouc 條）；曲名取景奧洛穆茨一帶屬字面推論。「摩拉維亞民謠」是英維基對他整體風格的敘述，非本盤樂評。維基 discography 漏列此盤，以 Discogs 為準。full。
- **47143**　Růžička《Ozvěny》：盤面 1980／錄音 1979-03（cs 維基寫 1979）。Petr Král 次中音、四重奏；Petrof 平台鋼琴出自盤面備註。full。
- **47144**　Energit《Energit》：curatorWhy 的 Mahavishnu 影響有英維基支持（指樂團整體、非本盤樂評），捷克維基無；寫作層請標明出處。Black Point 擴充版頁 404，只據搜尋摘要。full。
- **47145**　Brom《Polymelomodus》：原盤走 §1 人工（Discogs 1805998，ČSSR 1977，錄於 1976 年底廣播電台一號錄音室）；B4 即 Steely Dan〈Do It Again〉；Soulstrut 為使用者貼文，慎引。full。
- **47146**　Fermáta《Fermáta》：thin。無樂評、無錄音日；曲長 Discogs master 與斯維基差數秒，採 master 並寫『約』；Jupiter Records 1976 版僅單源；Perpetuum 長曲留給即興為推論。
- **47147**　Jonáš《Impresie》：thin。sk／cs／en 維基皆無條目，僅 Discogs 簡介與 Apple；年份盤面 1978／錄音 1978-04，Discogs 登 1979，寫『1978 年春錄成』；〈Pozdrav Ch. Coreovi〉不斷言 Chick Corea；〈Akela〉作者歸屬不確定。與 Růžička《Ozvěny》共用 Kořínek／Vejvoda／Král 三位與 Mozarteum。
- **47148**　Olmerová《Eva Olmerová》：盤名確認為 Gramofonový Klub 版（0/1 15 0495，1968），同批錄音一般版為 1969《Jazz-Feeling》；cs 維基稱《Jazz Feelin'》（1968）指一般版，寫作層以卡單盤名為準。Apple 同名為 2001 合輯、1974 同名為 Traditional Jazz Studio，皆非本卡。Mahalia Jackson 取自單源（cs 維基），曲目 Discogs 皆標 Traditional。full。
- **47149**　moodGuess 全組未推翻、亦無聽感樂評佐證；Energit、Brom、Olmerová 吻合電氣長套曲／大編制放克／福音暖嗓。Jonáš、Fermáta 的『空氣感／旋律性』無來源，僅 credits。無須汰換。
- **47150**　WebSearch 用了 3 次（Okno、Energit、Brom）；維基 curl 429 後改 WebFetch，其餘走 Discogs API。年份分歧：Okno、Ozvěny、Impresie 皆盤面年與卡單年差 0–1 年，已逐張寫入 notes。
- 47173：封面。人工身分 17 張＋CAA 缺圖者取 Discogs master／release 主圖（`covers.json`，逐張 HTTP 200 image），其餘 CAA release-group front 200。主線 2026-11-01 縮圖表 40 張逐張目視與盤名相符。Jazz Q《Coniunctio》封面印「Blue Effect & Jazz Q Praha」，MB 掛名 Jazz Q，照 MB 掛 Jazz Q（池中 Blue Effect 只有《Nová syntéza》，不撞）；寫作層可寫兩團合錄。
