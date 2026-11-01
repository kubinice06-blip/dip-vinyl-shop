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

## 鉤子層（d、e）（47156–47160）
- **47156** 交件：`desc-tools/batches/hooks/add-20261101-eb2-hooks-d.json`（8）、`-hooks-e.json`（8）。預算公式照 hook-base 第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。逐筆（預算／hook 原始字元／hook 加權）：Nonet 215／25／25；Motus 222／23／23；Pietoso 227／28／25；Jazz Cellula 222／23／23；5 ran do čepice 221／29／26；Výlety 203／30／26.5；Pohádka pro Beritku 216／30／24.5；Dialogy（thin）162／27／24；Okno 220／27／23；V Holomóci Městě… 205／26／22.5；Ozvěny 208／28／24；Energit 219／29／26；Polymelomodus 221／29／23.5；Fermáta（thin）158／25／21.5；Impresie（thin）160／23／20.5；Eva Olmerová 224／26／24。full 203–227（上限 230）、thin 158–162（上限 170）。初稿 13 張超標，一律整格捨去（Velebný 車禍、SHQ 團員曲目分配、Pietoso 節奏組名單、Výlety 混音與作曲署名、Okno 封面畫原名與 Vampisoul 樂評、Brom 作曲者與銅管描述、Ozvěny 樂手名、Holomóc 第二個曲名例等），壓完後逐張回核 hook 依賴格：Pietoso「首張」、Nonet「九人」、Impresie「封面自拍」、Olmerová「顫音琴」原本不在 note，已補進 g1／g2；Jazz Cellula 風格格、Pohádka 編制格前移到 g2。
- **47157** 骨架分配（16 張 16 條，各張 note 只寫自己的歸屬句；全批不走「鐵幕下的爵士」「國營廠」）：Nonet＝木偶劇院起家的團擴編赴西德；Motus＝雙低音提琴的編制取捨；Pietoso＝斯洛伐克小號手進電台一週錄首作；Jazz Cellula＝三管前線轉放克拉丁（雙語曲名為次格）；5 ran do čepice＝電影攝影系出身轉行組團；Výlety＝一人吹遍古今管樂；Pohádka pro Beritku＝海外俱樂部駐場歸來；Dialogy＝每首換一位對手；Okno＝留學同窗跨洋同錄；V Holomóci Městě…＝方言地名寫家鄉；Ozvěny＝盤面註明的那台琴；Energit＝效果器改裝管樂（八度分頻器）；Polymelomodus＝美國搖滾歌換本地曲名；Fermáta＝古典作曲家掛名開場曲；Impresie＝樂手自拍封面；Eva Olmerová＝一盤兩面兩支伴奏樂團。地點分流：Mozarteum 只在 Ozvěny、MPS／Villingen 只在 Nonet、唱片俱樂部版只在 Olmerová（Pohádka 只寫「單聲道會員版」一詞）；SHQ 團史只在 Nonet，其餘樂手生平不帶「加入 SHQ」。hook 四型：場景（Nonet、Jazz Cellula、Výlety、Energit、Olmerová）／斷言（Motus、V Holomóci、Polymelomodus、Fermáta）／人物定調（Pietoso、5 ran、Pohádka、Dialogy）／懸疑（Okno、Ozvěny、Impresie）。
- **47158** 同藝人分軸與「他／她」引入法：Velebný——Nonet 帶團史（1961、木偶劇院），第二句「領團的 Karel Velebný 打顫音琴」（身分＋樂器）；Motus 帶編制，第二句「Karel Velebný & SHQ 這個掛名裡⋯」（掛名欄）。Déczi——Pietoso 帶生平（首張、移居、Clifford Brown 一句），第二句「1962 年，他從布拉提斯拉瓦搬到布拉格」（年份＋遷居）；Jazz Cellula 帶編制與曲名，第二句「作曲欄裡有三首出自 Laco Déczi」（作曲欄）。Stivín——5 ran 帶生平（電影攝影、倫敦），第二句「Co. Jazz System 是他從倫敦回國後組的」（團名）；Výlety 帶樂器，第二句「鼓手 Pierre Favre 坐在他對面」（同台者）。Dašek——Pohádka 帶生平（柏林駐場），第二句「布拉格出生的 Rudolf Dašek」（出生地）；Dialogy 帶對手名單，第二句「對手名單印在曲目欄」（曲目欄）。Viklický——V Holomóci 帶生平（1948 奧洛穆茨、數學系、1974 獎一句），第二句生年與出生地；Okno 帶錄音（Berklee 同學、三天），第二句「鍵盤後面坐的是捷克鋼琴手 Emil Viklický」（位置）。其餘：Ozvěny「彈琴的 Karel Růžička⋯學鼓也學鋼琴」（樂器＋學歷）、Energit「Energit 是吉他手 Luboš Andršt 1973 年在布拉格組的爵士搖滾團」（身分）、Polymelomodus「Gustav Brom 的大樂團 1940 年就已登台」（團史年份）、Fermáta「布拉提斯拉瓦的爵士搖滾團 Fermáta，由吉他手 František Griglák 領頭」（地點）、Impresie「1948 年生的 Gabriel Jonáš 是斯洛伐克人」（生年＋國籍）、Olmerová「常被比作 Bessie Smith 的 Eva Olmerová⋯」（外人之口）。第二句句型已對 eb1 已寫 hook 檔排除（避開「這位⋯手叫」「唱片掛的是」「⋯的是 X」三形）。跨組同名：Energit《Piknik》（b）與 Fermáta《Huascaran》（a）——本組 Energit 走首張的編制與 A 面長曲、不帶 1973 原始陣容瓦解與移居；Fermáta 走 Enescu 開場曲、不帶地震與合成器。
- **47159** 日期「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：Nonet 日於、Pietoso 日至、Pohádka 日到、Okno 日起、Polymelomodus 日進；其餘 11 張只寫到月、季或年。事實自驗：Okno 研究層提醒「還沒成名的 Frisell」無來源，hook 不用；Fermáta 只寫「掛名 Enescu」、不斷言改編段落；Impresie 寫「致 Corea」、年份只寫「1978 年春錄成」；Olmerová 盤名以《Eva Olmerová》為準，入獄一事標「一句，語氣克制」，1979 禁演與 1993 辭世屬與作品無關的後續，不指派；Energit 的 Mahavishnu 與 Brom 的 Soulstrut 評語不進 note（媒體名不進正文）；5 ran 錄音日單源，只寫 1972 年發行。
- **47160** n-gram 自查：hook×hook（a、d、e 三檔現有 21 張）0 條；hook×他張 note 只剩樂器名（低音提琴、薩克斯風）與地名（斯洛伐克）。初掃抓到並已改：Pietoso hook「在布拉格」、Okno hook「布拉格錄音室」「到布拉格」、Polymelomodus hook「捷克文曲名」對 Pietoso note、Impresie hook「是鋼琴手」對 Dialogy note、5 ran hook「自由爵士」對 Szabados note。hook 與自己 note 無逐字重複句（Ozvěny note 改寫成「用的是一台 Petrof 平台鋼琴」）。`qa-batch hooks`：d、e 0 標記（僅報 b、c 缺檔與 a 未完稿漏卡）；`chk-hook-crossgroup`：全部通過，只報不擋一筆為 Motus「名單沒有鋼琴」，屬內容（hook 依賴格），保留。
