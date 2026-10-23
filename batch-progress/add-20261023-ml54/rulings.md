# add-20261023-ml54 裁定（情緒薄格策展線・恍惚：lo-fi／chillhop 第四波＋暖 dub 化 downtempo／jazzy instrumental hip-hop）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 12 輪，本工作階段負責 ml54、md29；店主同日「恍惚可以多增加一點 downtempo 與 dub 這類的」。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml54 列），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**恍惚＝靜（x<3.0）＋重（y≥0.5）＋暖（z≥0）**；策展邊距 x≤2.7、y≥0.8、z≥0.3。
> 策展：`curation-ml54.json`（54 張）→ `master-ml54.json`（MB 回查 54/54 釘住、0 flag）→ 主線汰 19 → `pick.json`（35）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml54-cards.json`（35 張；研究 a–e 各 7）。身分：MB 釘住 35、§1 人工 0。
> **預留：研究 a 20841–20850、b 20851–20860、c 20861–20870、d 20871–20880、e 20881–20890、鉤子 20891–20900、寫作 20901–20910、主線 20911–20920。**
---

## 主線策展（不佔條號）
- 策展 54 張全數 MB 釘住（Album、無 secondary type）：lofi-chillhop 21、korean-lofi 3（NOGYMX）、warm-downtempo 7、jazzy-ihh 8、dub-downtempo 11、warm-reverb-guitar 4。moodGuess x 1.8–2.7、y 0.8–1.4、z 0.5–1.0。策展對 seed 與全部 curation 去重 0 撞；主線另對 origin 所有 `claude/*` 分支 seed 與 10-22 起卡單去重 0 撞（同盤名不同人 5 筆，非撞）。
- 主場景見底：Sleepy Fish 五張全在 ml42、其餘 EP；Idealism《amaranthine》MB 為 EP、《nobody else》16 分；eevee beat tape 01–13 皆 <25 分且 Apple 未上架，只收《TIME.》；韓國 lo-fi 二線幾乎全 EP 長度，只收 NOGYMX 三張。不足處往擴寫場景補（dub 化 downtempo：Pachyman、Dubmatix、Skinshape；暖 beat：Teebs、Natureboy Flako、Sweatson Klank；jazzy ihh：Freddie Joachim、Tall Black Guy、DJ OKAWARI）。
- 池中同人錨點：只有 Teebs《Ardour》2.0/0.6/1.0（y 貼格線，《Collections 01》留給研究層確認質地），其餘全新藝人。
- **主線汰 19**：
  - y 貼 0.8（乾淨鋼琴／可愛型 chillhop 判輕風險）：Jazzinuf《dazzle》、Yasumu 三張、DJ OKAWARI 三張（爵士鋼琴取向，照 ml41 日本 jazzhop 乾淨鋼琴型判輕先例）。
  - x 貼邊＋人聲客串：Dubmatix《System Shakedown》《Atomic Subsonic》、Tall Black Guy《Let's Take a Trip》（Apple 標 East Coast Rap）、Sweatson Klank《Fine Lines》（Apple 分類 Dance）。
  - z 風險：Zmeyev《Urban Melancholy》（都市憂鬱題材）、Wizard of Loneliness《The Beautiful World》（z 0.5 中性）。
  - 原聲吉他判輕：Hermanos Gutiérrez 四張（乾淨雙吉他＋殘響，照 ml2／ml24「原聲吉他為主」反例）。
  - 勻量：Skinshape《Life & Love》《Filoxiny》（Apple 標 Indie Rock／Alternative，x 邊距小；同人留兩張）。

## 研究 a 組
- 20841：Jazzinuf 三張與 eevee《TIME.》Bandcamp／樂評皆無聲音描述（Etymology 兩張、《TIME.》不在藝人 Bandcamp 目錄），聲音只能憑標籤、曲名、時長；status 誠實標 thin，不編造鋼琴取樣、黑膠沙沙、磁帶糊。
- 20842：Bcalm《Elements》《Close to Home》、Mondo Loops《Forest Tales》廠牌卡單空白，查得 Lofi Records（Lofi Girl 旗下，Bandcamp 頁面為 lofigirl.bandcamp.com）；Elements、Forest Tales 官方文案有聲音描述，標 full；《Close to Home》頁面無描述，標 thin。
- 20843：曲名『ft.』的合作者（Bcalm 兩張的 Banks、Hendy、Purrple Cat 等）視為 lo-fi 製作人，不等於人聲；未能逐一證實，於 notes 標存疑，由主線決定要不要聽。
- 20844：moodGuess 存疑清單（Audio Bartending 中、Close to Home 中、Elements 輕～中，其餘輕）見研究稿 notes；無一張達到建議汰換的明確反證（無人聲／饒舌主體、無 trap／house、總長皆 >28 分）。

## 研究 c 組
- 20861：Freddie Joachim《Dust》身分分歧：MB RG 792d335c（2010-02-25）是 5 首、約 10 分鐘的 Bandcamp 免費下載小品；卡單／Apple 1663972502 的 20 首 43 分鐘是 2015-07-15 Vinyl Digital《Dust (Extended Edition)》。研究稿兩個版本都寫並標明；年份 2010／2015 由主線裁定（建議簡介不要把 20 首寫成 2010）。
- 20862：Freddie Joachim《Study Guide》實為 Question（QSTN）與 Freddie Joachim 雙人器樂專輯（Discogs 明載 instrumental，Question 是共同製作人與 Mellow Orange 夥伴，非饒舌者）；廠牌是日本 Milk Dipper（DJ Tonk），不是空白。卡單掛名只有 Joachim，不改但 notes 標明。查無樂評描述聲音，status thin、moodGuess 存疑。
- 20863：Tall Black Guy《Airplane Mode》5 首客串（Bobby Rox、Mr. Tanqueray、Keya Maeesha、Kyotey Grey 是否人聲未證實；Kenny Keys 在信用欄是 Additional Keys＝鍵盤），Bandcamp 有 house progressive 標籤；moodGuess 存疑（人聲、x 貼邊），未建議汰換。
- 20864：Laffey 三張：《Forever Changing》26.2 分、《The Moon and the Mind》25.8 分皆 <28 分，moodGuess 存疑（長度）；兩張僅官方文案與 MB 標籤可作聲音依據，無獨立樂評，status thin。三張 MB 標籤皆含 boom bap，彈跳風險無法排除。《A Day at a Time》Bandcamp 文案偏乾淨鋼琴／吉他 chillhop，y 貼邊。
- 20865：Beyond the Sea of Trees 為本組唯一有獨立樂評（Scratched Vinyl、Cool Hunting、The Find）的盤，聲音證據充足，moodGuess 不存疑；〈Backyards〉有銅管與極少人聲，僅單曲層級。
- 20866：facts 不寫評分；Discogs 在雲端直連可用（API），Jakarta 官網 404、soundsoftheuniverse 403 未採。WebSearch 用 3 次。

## 研究 b 組
- 20851：Mondo Loops《Golden Age》Bandcamp 主頁抓不到內容、專輯無任何文案／樂評，聲音證據只有藝人在 Stereofox 的描述（吉他旋律、溫暖偏憂鬱 lo-fi），status thin。Apple ℗ Lofi Records、Deezer 廠牌 Lofi Girl，卡單 label 空白可補 Lofi Records。moodGuess 存疑：吉他主導（y 風險）、奇幻史詩曲名（z 中性風險）、三位客串（Kanisan／Banks／Grisp）人聲未排除。
- 20852：Aviino《Cocoon》有廠牌官方逐曲說明（合成器 Moog Matriarch／Strega／Volca Modular、Nagra 帶噪、〈Everything's Gonna B Ok〉混入語音留言），status full。策展層「柔軟鋼琴 beat tape」的鋼琴說法官方未提；Chillhop 官網稱 EP、MB 為 Album，不影響入池。Aviino 國籍與居住地查無可靠來源，不寫。
- 20853：Sweatson Klank《Postcards》（Friends of Friends，50 張手工明信片外套黑膠）與《Good Days》共用 Qobuz 傳記（Thomas Wilson、Take One、Sketchbook）；《Good Days》無文案，Apple 誤分 Rock，Bandcamp 標 funk、r&b hip hop soul，moodGuess 存疑（可能偏雀躍）。Qobuz「sunny」說法只在搜尋摘要見過、WebFetch 未重現，不進 facts。
- 20854：NOGYMX 三張共同發現：他是愛爾蘭人 Jimmy Dunne、住首爾，並非韓國人，「韓國 lo-fi」場景標籤不準；Apple ℗ 為 Chillain（2018、2019 盤皆標 2022，疑為重新上架，發行年仍依 Bandcamp／MB／Deezer 2018／2019）。推翻策展層：《NO EMPERORS》Bandcamp 頁面存在。
- 20855：《Eien's Fable》客串 Daniele Raciti、Matchbox Youth（Apple 掛名）、Elizabeth Gaylord（Bandcamp 鋼琴）皆為器樂合作，未見主唱；Raciti、Matchbox Youth 身分查不到，寫作層不介紹其人。NO EMPERORS 與 Locus 無文案，只依 Bandcamp 標籤，status thin。WebSearch 本組用 10 次（超過每支 3 次上限，須如實回報）。
