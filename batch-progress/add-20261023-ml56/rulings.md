# add-20261023-ml56 裁定（情緒薄格策展線・恍惚：暖 trip-hop 女聲二線＋暖 downtempo／dub-downtempo 擴寫）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 13 輪，本工作階段負責 ml56、mc42（評分照 10-23 體感標準；店主同日「恍惚可以多增加一點 downtempo 與 dub 這類的」）。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml56 列；主線定可擴寫：暖 downtempo／trip-hop 慢盤廣義、dub 化 downtempo、psy-dub／world-dub、池中已落恍惚的 downtempo／dub 藝人其他正規專輯），交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**恍惚＝靜（x<3.0）＋重（y≥0.5）＋暖（z≥0）**；策展邊距 x ≤ 2.7、y ≥ 0.8、z ≥ 0.3。
> 策展：`curation-ml56.json`（兩輪 64）→ 主線汰 19（`master-override-ml56.json`）→ `master-ml56.json`（MB 回查 45/45 釘住、人工 0）→ `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml56-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 21241–21250、b 21251–21260、c 21261–21270、d 21271–21280、e 21281–21290、鉤子 21291–21300、寫作 21301–21310、主線 21311–21320。**
---

## 主線策展（不佔條號）
- 策展第一輪 38（暖 trip-hop 女聲 15、Pork／Mo' Wax 式 downtempo 11、世界 downtempo 7、soul 系 downtempo 5）。主場景多已在池或別批已收（Hooverphonic、Morcheeba、Lamb、Olive、Laika；md9、ml15、ml40、ml53）。
- 主線汰 18（照池中同人三軸與聲音判斷）：
  - 判輕／乾淨（池中 Morcheeba《Big Calm》y 0.3、Lamb《Lamb III》y −0.8、Hooverphonic《Blue Wonder Power Milk》y 0.4、Natacha Atlas《Gedida》y 0.4 先例）：Sia ×2、Morcheeba《Fragments of Freedom》《Dive Deep》、Lamb《Between Darkness and Wonder》（原聲傾向）、Hooverphonic《The Magnificent Tree》（管弦 pop）、Nitin Sawhney ×2（乾淨吉他與 drum'n'bass 混雜）、Susheela Raman《Love Trap》。
  - 判躁（拍子推進；池中 Soul II Soul《Club Classics》x 2.9、Natacha Atlas《Diaspora》x 3.0 先例）：Soul II Soul《Vol. II》、Neneh Cherry《Homebrew》《Man》、Natacha Atlas《Halim》、Quantic《Mishaps Happening》、Alice Russell《Pot of Gold》、Lamb《Fear of Fours》（drum'n'bass 段）。
  - 判冷（池中 Beth Gibbons《Lives Outgrown》z −1.0 先例；實驗 trip-hop 陰）：Beth Gibbons & Rustin Man《Out of Season》、Rickie Lee Jones《Ghostyhead》。
- 策展第二輪 26（池中已落恍惚的 downtempo／dub 藝人其他正規專輯：Mad Professor ×5、Prince Fatty ×2、Gaudi ×2、Dub Colossus ×2、Blundetto、Peaking Lights ×2、Chancha Vía Circuito ×2、Kaya Project ×2、Sounds from the Ground ×3、Halftribe ×2、Heights of Abraham、Aim、Boozoo Bajou）。主線汰 1：Boozoo Bajou《Juke Joint》（MB Album+Compilation，DJ mix 選輯）。
- 定案 45：Fila Brazillia ×6、Money Mark ×3、Rustin Man《Drift Code》、Lamb《What Sound》《5》、Skye、Alice Russell ×3、Quantic《Apricot Morning》、Susheela Raman《Salt Rain》、Loop Guru ×2，及第二輪 25。去重：seed、其他 curation-*.json、desc-tools 卡單、origin 95 個 `claude/*` 分支 seed 全 0 撞。
- 風險：y 估 0.8–0.9 貼邊的多（Fila 後期、Kaya、Halftribe、Heights、Aim、Chancha、Skye）；x 貼 2.6–2.7（Fila、Loop Guru、Gaudi、Chancha《Rodante》、Peaking Lights《E S C A P E》）。Mad Professor 5 張同質；Dub Colossus《Dub Me Tender》為自家舊作 dub 重製（MB 標 Album）。研究層請特別查：breaks／drum'n'bass／house 拍、乾淨 lounge、陰冷字眼、人聲客串過多的歌曲型盤。

## 研究 c 組
- 21261：Loop Guru《Amrita》《The Third Chamber》廠牌改 North South Records（MB 與 Discogs 皆為 GURU 200／GURU 100；美版 World Domination），策展層寫的 Nation 是《Duniya》的發行廠，seed label 欄請改。
- 21262：Prince Fatty《In the Viper's Shadow》廠牌改 Evergreen Recordings（EVER 106，2019-10-04；維基同），非 Mr Bongo。
- 21263：Mad Professor《Ambient Adventures in Dub》Discogs 標 Compilation、僅日本 Canyon International PCCY-01516 單一版本，19 首含與《Black Liberation Dub Chapter One》重名的曲，判定非原創專輯，status thin，建議主線汰換。
- 21264：Prince Fatty Meets The Mutant HiFi《Return of Gringo!》所有來源皆為 surf／ska／spaghetti western 配樂，12 首每首 2–4 分鐘，moodGuess（dub、慢拍）不成立，建議汰換。
- 21265：《The Third Chamber》全為 ambient（Eno／Hassell 比較、drones／甘美朗），無 dub 低頻證據，y 0.9 存疑，留主線聽感再判。
- 21266：《Part 11》年份採 MB／Discogs 的 1991（維基 Ariwa 條寫 1992）；Ransom Note 訪談引句無法開啟（503），不進 facts。
- 21267：moodGuess 存疑彙整：Prince Fatty《Viper's Shadow》為客串歌手多的歌曲型盤，樂評用 upbeat groove 與 melancholic chords；Mad Professor 各盤 Discogs 皆有多名 DJ／人聲客串。AllMusic 403、Wayback 不可抓，無 warm／hazy 樂評原句。

## 研究 e 組
- 21281：Gaudi《No Prisoners》moodGuess 強烈存疑：Gaudi 自家 Bandcamp 明寫「離開一貫的 down-tempo、明顯更 up-tempo」，主力為 breakbeat 疊粗低音，客串多（Franti、Bunny Wailer、Elisa 等）；廠牌實為 Six Degrees（卡單 Gaudi 錯）。建議汰換。
- 21282：Gaudi《Earthbound》廠牌實為 Antenna／Bustin' Loose（卡單錯）；年份 MB／Discogs 1999，Bandcamp 自相矛盾（1997／1998），採 1999。Discogs 風格含 jungle／drum n bass、曲目有 General Levy，整盤節奏型態無樂評佐證，moodGuess 中度存疑。
- 21283：Dub Colossus《Dub Me Tender》是自家兩張舊作的 dub 重混（加四首未發表），Dubblog 稱演奏輕、像現場、豐富多變，非極簡厚 dub；策展層引的 PopMatters／Metro 原文取不到，不進 facts。輕度存疑。
- 21284：Dub Colossus《Dub Will Tear Us Apart》實為 2010-12 Society of Sound Music 下載版（Discogs），非 Real World 實體（卡單廠牌錯）；曲目大量與 2011《Addis Through the Looking Glass》重疊，樂評稱同名曲是 dub 最淡的幾首。中到強存疑；若池中已有《Addis…》建議查重。
- 21285：Halftribe《Luxia》廠牌實為 Archives；僅有標籤（ambient／deep／electronica；Discogs Ambient／IDM／Dub），無鼓點與低頻描述，moodGuess 缺佐證。
- 21286：Halftribe《Backwater Revisited》廠牌實為 Dronarivm；文案「Melancholia laid bare」、聽眾稱 desolate and disturbing，標籤 ambient／modern classical，非 dub-downtempo。強烈存疑，建議汰換（可能落輕或冷）。
- 21287：Heights of Abraham《Two Thousand and Six》廠牌實為 Twentythree（卡單錯）；Discogs 風格標 Deep House／Downtempo，可能有四拍推進，無樂評，中到強存疑。年份 MB／Discogs 2005，Wikipedia 寫 2006。
- 21288：Blundetto《World of Dub》是自家《World Of》（2015）的 dub 重製，Heavenly Sweetness HS135VL，限量 1000，九首共約 33 分鐘；無樂評，原版含 funk／Kabyle／搖滾／reggae 拼貼，輕度存疑（funk 律動）。
- 21289：Aim《Flight 602》廠牌實為 ATIC Records（自家新廠牌首發），Aim 2005 年初已離開 Grand Central（卡單錯）；Discogs 風格 Trip Hop／Downtempo／Breaks，Niko 人聲約半數曲目、單曲導向，歌曲型成分中等，中到強存疑。ATIC 成立年各條目互相矛盾（2005／2006），facts 不寫。
- 21290：e 組彙整：九張中廠牌被我推翻 7 張（Gaudi ×2、Dub Colossus《Will Tear》、Halftribe ×2、Heights、Aim）；建議汰換優先序：Backwater Revisited、No Prisoners；其次 Heights、Dub Will Tear Us Apart、Flight 602。Penny Black 全文與 AllMusic 取不到，No Prisoners 樂評句取自搜尋摘要。本組 WebSearch 用 3 次。
