# add-20261106-md45 裁定（情緒薄格線・頹靡：Bandcamp downtempo「有鼓」名單第三輪 md45）

> 背景、判準同 `batch-progress/add-20261106-md44/rulings.md` 檔頭（店主 11-06「全都上架吧」；只汰攻擊性鼓與舞池推進，判暖判輕不汰）。卡單 `batch-progress/bandcamp-dt-20261105/pick-md45.json`（47 張）即策展結果。
> 流程：卡單 47 → 主線初篩 → `curation-md45.json`（28）→ `master-md45.json`（MB 釘住 28）→ `build-cards.mjs` → 研究 a 10、b 9（新查）、c 9（沿用前兩輪研究稿，補鼓型）。
> **預留：研究 a 25081–25090、b 25091–25100、c 25101–25110、鉤子 25111–25120、寫作 25121–25130、主線 25131–25140。**
---

## 主線初篩（不佔條號；2026-11-06）
- 身分：Bandcamp ld+json＋MB release-group 逐張比對，28 張 MB 全釘住。Cemento Atlantico《Dromomania》的 MB release-group 未標類型，Bandcamp 文案自稱 new album（8 首 39 分），照 Album 收、寫進 curatorRisk。
- 去重：`dedup-md37.mjs --file curation-md45.json` 撞 9，全是前兩輪被汰的同一張；seed／manifest／pool-removed 0 撞。
- 名稱與年份照 MB：H.U.V.A. NETWORK → **H.U.V.A. Network**、Tara Lily《Speak in the Dark》、Sneaker Pimps《Squaring the Circle》、bergsonist → **Bergsonist**、tripswitch → **Tripswitch**、Lb Honne → **lb honne**；All India Radio《A Low High》**2009**（MB 2009-05-06；卡單 2010 是 Bandcamp 日期）、Scann-Tec《Facial Memories》**2010**（Bandcamp 是 2018 重新母帶版）。
- **主線初篩汰 19**（卡單 47 → 28）：
  - 資格：Catching Flies《The Long Journey Home》（MB EP、文案自稱 EP，29 分含三個 remix／live）、Phaeleh《The Space Between Us》（MB EP）、Halou《Coco》（MB EP；文案為 2024 EP 的重混改編）、Arms and Sleepers《OF UTOPIAS AND CATASTROPHES》（文案自述四張 EP 合集）、Milieu《Butcher Block Andromeda》（十年回顧 50 軌精選）、New Composers《Astra》（1996 原盤的 2017 擴充新版，19 軌含未發表曲）、fingerspit《Many Nights a Whisper》（MB Album＋Soundtrack，遊戲原聲）、Somatoast《Creation is Creation》（10 軌中 4 首 remix；md43 Fort Road 先例）、Natural Wonder Beauty Concept（自我同名；DJ Python 與 Ana Roxanne 的俱樂部取向計畫）。
  - 舞池推進（文案或研究直述）：Lusine ICL《Iron City》（文案「dance floor rhythms」）、K-LONE《Swells》（文案「looks to deep house」）、seb wildblood《separation anxiety》（文案「structured within the realms of traditional dance music」）、Khotin《Hello World》（文案「club-friendly grooves… breezy house rhythms」）、Polygonia《Dream Horizons》（Dekmantel 文案「a full house of kinetic rhythms」「deep techno」）、Toki Fuko《Human Design》（md39 研究：RA 寫底鼓強勁、Lowless techno 廠）。
  - 同人（本線每位一張）：Puma Blue《Croak Dream》（md44 留《Holy Waters》）、Ochre《National Ignition》（md44 留《Beyond the Outer Loop》）、Jogging House《Danger》（留《Kiosk》；並行 ml74／76／77／81 另六張）、Odd Nosdam《Mirrors》（md44 留《LIF》）。
- **保留但標風險的**：Andy Leech《The Path So Far》（20 軌 92 分、盤名像回顧，研究層查是不是合輯）、lb honne（Deep House 標籤）、Plant43（作者本行 Tresor 舞池 electro）、Bergsonist（Optimo、曲名〈La Rave〉）、Filmmaker（darkwave／EBM 攻擊性）、DIM（trance 標籤、dungeon synth 廠）。逐張寫在卡單 `curatorRisk`。

## 研究 c 組（沿用稿補件）

- 25101 Antimatter《The Judas Table》：已有樂隊鼓組 fact；重判暗色搖滾、含較重電吉他段但非嘶吼，不建議汰。
- 25102 1000 Eyes《Duality》：補鼓型不明 fact（trip hop／ambient 標籤、15 首短曲）；不建議汰。
- 25103 All India Radio《A Low High》：已有緩拍 fact；舊「建議降權或汰換」作廢（判暖不汰）；MB 首發 2009-05-06，寫作以 2009 為準。
- 25104 worriedaboutsatan《Blank Tape》：補鼓型 fact（DiS 導讀：現場／V-drum 電子鼓；Aural Aggravation：比前作少拍少低頻）；目前不建議汰，風險：樂團自述含 metal，主線若聽到失真牆則汰（攻擊性）。
- 25105 Scandinavian Star《SOLAS》：補鼓型 fact（踉蹌節奏，四拍底鼓僅部分曲目、文案稱「低語」）；非舞池推進，不建議汰。
- 25106 Phaeleh《Dark Sky》：補鼓型 fact（鬆拍 downtempo、極簡、短曲多）；不建議汰。
- 25107 Black Boboi《Sepia》：已有 trip-hop／techno 電子節拍 fact；速度不明偏慢，不建議汰。
- 25108 Pontiac Streator《Triz Motion》：已有 Discogs BPM 80–120 fact；不建議汰。
- 25109 Echo Season《Periphery》：補鼓型不明偏中速 fact（「energetic beats」，psybient／space music 標籤）；不建議汰。
- 25110 本批 9 張 notes 開頭皆加【第三輪重判】；無新增建議汰，Ness 與 worriedaboutsatan 為待聽確認的風險卡。

## 研究 a 組
- 25081　Era《The Mass》：Bandcamp 12 軌末兩首為 remix，以 MB 2003 原盤（Album）為準，維持收件。鼓型不明（搖滾流行編制、合唱大殘響），不汰。
- 25082　H.U.V.A. Network《Distances》：Bandcamp 12 軌最後一首是 1 小時 18 分 Full Mix 連播，正規 11 首；MB 2004 Album。樂迷留言有 groove／psytrance vibe，但無 BPM 與四拍底鼓證據，標籤 downtempo／psybient，不汰；鼓型寫細碎 psybient 脈動、BPM 查無來源。
- 25083　Forhill《Figments》：末兩首為 Demo，正規 10 首；MB Album。來源薄（無樂評），status thin；鼓型不明偏柔，不汰。moodGuess 偏亮偏暖的疑慮寫在 notes。
- 25084　Tara Lily《Speak in the Dark》：整體慢鼓／哀傷抒情，單曲〈Double Time〉為 drum and bass，不構成整張舞池推進，不汰。
- 25085　Sneaker Pimps《Squaring the Circle》：16 首電子流行／trip hop，標籤有 techno 但無舞池證據，不汰；label 更正為 UNFALL。
- 25086　Zane Alexander《A Time Like This》：身分年份對上，status thin；鼓型不明偏柔，不汰。moodGuess「微冷」存疑（synthwave 懷舊偏暖）。
- 25087　Leif《Loom Dream》：文案 warm chordscapes／loose live percussion 屬實，聲音偏暖偏輕；RA 評節奏漂移而非行進、長段無鼓，非舞池，不汰（判暖不是汰換理由）。moodGuess 存疑：預估冷、實際暖。
- 25088　Andy Leech《The Path So Far》：**建議汰：資格**。Bandcamp 聽眾留言稱 best-of／collection、涵蓋 2016 年起作品，曲目含 Single Mix、Bonus Track，且部分曲目另有單曲發行；推定為合輯。證據為聽眾留言加曲目標示，非作者自述，主線可再裁。
- 25089　Scann-Tec《Facial Memories》：Bandcamp 是 2018 重新母帶版（Monokanal MK001），MB 原盤 2010，年份用 2010；同一專輯重新母帶，維持收件，不汰。moodGuess「暗」存疑（文案 fresh、colorful）。
- 25090　Bergsonist《Middle Ouest》：Optimo 廠牌、〈La Rave〉與 uptempo 標籤有舞池可能，但作者自述非 techno 藝術家、標籤亦有 downtempo／midtempo，無逐曲速度證據，不汰；評分聽到四拍底鼓主導再議。

## 研究 b 組（9 張；2026-11-06）
- 25091：Cemento Atlantico《Dromomania》label 更正為 Bronson Recordings（Bandcamp 文案）；MB 未標類型，文案自稱 new album，照專輯收。鼓型碎拍 future garage／post-dubstep 加 house 成分，作者說「低音線壓過一切」是低頻與主題描述，非失真牆，不汰。
- 25092：Filmmaker《Eidetic》鼓型不明（頁面無談鼓／速度／人聲）；標籤 electro、synthpunk，同作者作品史偏 EBM／synth，但查無本張攻擊性或舞池直述，依規則不建議汰，標 thin；上線後評分若偏躁再汰。EP《Code Breakers》的文案不可套用。
- 25093：DIM《Parachrism》鼓型不明，策展層「有鼓」前提無來源；dungeon synth／psybient 路線，無攻擊性證據；數位版自行發行、卡帶 Dungeons Deep。thin。
- 25094：Markus Guentner《Theia》無鼓 ambient-drone（Textura）；label 更正為 A Strangely Isolated Place（ASIPV004），非 Kompakt；ASIP 頁為搜尋摘要確認，單源。
- 25095：Plant43《The Unfading Spark》文案：極簡切分打擊、electro 聲音設計、「post-club」，14 首 1–5 分鐘，非四拍舞池；不汰。moodGuess「無鼓」存疑。
- 25096：lb honne《present future / here there》Yoyaku：大半 downtempo、deep house 傾向、整張 112–131 BPM，無逐曲鼓型；判不出來不汰，但為本組最近舞池者，上線後以評分確認。
- 25097：Jogging House《Kiosk》label 更正為 Seil Records；Digitakt II＋磁帶循環的 lo-fi 小節奏，單軌直錄 1/4 吋磁帶；無攻擊性／舞池證據，不汰。
- 25098：El Jazzy Chavo《Aspects of Dystopia》boom bap 取樣鼓，文案「hard knocking drums」為嘻哈慣用語，非攻擊性鼓牆；label Funkypseli Cave 確認；不汰。
- 25099：Tripswitch《Memento Mori》label 查無第三方，寫 self-released；文案主軸 downtempo jazzbeat／電影感，moodGuess「deep house 四拍」存疑，不汰。
- 25100：9 張身分皆與 Bandcamp ld+json、MB 一致，年份無推翻；WebSearch 用 3 次（Guentner、Plant43、lb honne 各 1；Filmmaker 另用 1 次，共 4，超 1 次，下次需補扣）。

## 主線研究後汰換（不佔條號；2026-11-06）
- 判準照檔頭：只汰攻擊性鼓、舞池推進、資格；判暖判輕不汰。
- **汰 2 張**（存 `dropped-cards.json`／`dropped-research.json`）：
  - 資格：Andy Leech《The Path So Far》（研究 a：Bandcamp 聽眾稱 best-of／collection、涵蓋 2016 年起作品，曲目含 Single Mix 與 Bonus Track、部分曲目另有單曲發行；盤名本身就是回顧。證據非作者自述，但三項同向，照合輯先例汰）。
  - 舞池推進：lb honne《present future / here there》（研究 b：廠方資料整張 112–131 BPM、deep house 傾向，屬 house 中快速四拍）。
- **留下的邊界卡**（交評分）：Bergsonist（〈La Rave〉、uptempo 標籤，無 BPM 證據）、H.U.V.A. Network（樂迷稱 psytrance vibe，無四拍證據）、Tara Lily（只〈Double Time〉一首 drum and bass）、Filmmaker、DIM（鼓型不明）、Plant43（文案 post-club 極簡切分打擊）、worriedaboutsatan（V-drum，比前作少拍）、Scandinavian Star（部分曲目四拍、文案稱低語）。
- **label 更正已改進卡單**：Sneaker Pimps → UNFALL、Cemento Atlantico → Bronson Recordings、Jogging House → Seil Records、Markus Guentner → A Strangely Isolated Place（單源，寫作層不寫廠牌名）。年份：Scann-Tec 2010、All India Radio 2009 維持。
- 研究 b 組 WebSearch 用 4 次（超出單支上限 1 次），計入工作階段額度。
- 不補位。定案 **26 張**（a 9、b 8、c 9）。

## 鉤子層（c）
- **25116** 交件 `desc-tools/batches/hooks/add-20261106-md45-hooks-c.json`（9 張，key／順序照研究稿）。預算公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。逐筆（預算／hook 加權）：Antimatter 228／24、1000 Eyes 169／23（thin）、All India Radio 229／21.5、worriedaboutsatan 216／24、Scandinavian Star 216／21.5、Phaeleh 223／22.5、Black Boboi 224／26、Pontiac Streator 165／20.5（thin）、Echo Season 155／20.5（thin）。full 216–229（≤230）、thin 155–169（≤170）；hook 原始 24–29 字。初稿全數超標，整格捨去：Antimatter 貝斯前置與藍調吉他、AIR 的 Wired 定位／Kuepper／Anderson／Richards／〈Lucky〉、wbs 的 Cavanagh 客座與成員名、SOLAS 的 MARPOL／SOLAS 公約與目錄號 214、Phaeleh 曲長與 Tycho、Black Boboi 器樂曲名與《Silk》、Pontiac 客座與「stuck in a cave」引言、Echo Season 曲名與標籤。壓完逐張回核：hook 依賴格全在 g1／g2。
- **25117** 骨架歸屬（c 9 張，與 a、b 不撞）：Antimatter＝在合作多年廠牌的最後一張；1000 Eyes＝遊戲配樂作曲者的個人作；All India Radio＝前輩樂團成員客席（Triffids 的 pedal steel）；worriedaboutsatan＝曲子被紀錄片採用；Scandinavian Star＝以真實海難為名；Phaeleh＝同年對照作（舊曲 2025 才發，標時序）；Black Boboi＝沒寫成的書信小說化為專輯；Pontiac Streator＝逐曲速度表；Echo Season＝廠牌出道作＋長曲。背叛題材（Antimatter）只佔一格，不與 Tripswitch 低谷、Tara Lily 診斷撞骨架。
- **25118** 跨批同人避撞：All India Radio 已上架《Afterworld》《The Unified Field》（塔斯馬尼亞創立者句型）→ 本張第二句改「這是 X 的第六張器樂專輯」、不寫塔斯馬尼亞；worriedaboutsatan 已上架《Crystalline》（Deus 團名）《Glass Infinites》（Gavin Miller 生病）→ 本張不帶團名由來與成員生平；Phaeleh 已上架《Tides》（客座）《Somnus》（無鼓、MiniDisc）→ 本張走極簡與舊曲。hook 四型：懸疑（SOLAS、Sepia）／斷言（Duality、Blank Tape、Triz）／場景（A Low High、Periphery）／人物定調（Judas Table、Dark Sky）。第二句句型：「X 是…的主腦」「那款遊戲是《…》」「這是 X 的第六張器樂專輯」「出自…的雙人組 X」「計畫背後是…」「X 就是 Y」「這三人在…以 X 為名」「洛杉磯的…」「X 在…出道」，與 a、b 十七種不重。代稱：1000 Eyes、Echo Season 性別無來源，note 指派「代稱用 X」；無跨三張同人，不需他／她配表。
- **25119** 「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：Antimatter 問、1000 Eyes 放、AIR 先、wbs 釋、SOLAS 凌／數、Phaeleh 才、Black Boboi 公、Pontiac 於、Echo Season 上；與 a、b 已用（面 由 登 正 透 亮 經 替 發 交 在 出 推 作）全不重——初稿 wbs 面、Echo 登、SOLAS 經、Antimatter 在、Boboi 推 撞 a、b，依「a、b 先」改掉。
- **25120** 自查與腳本：hook 與 hook（全批 26 張）中文 4-gram 0 條；c 的 hook 對全批 note、全批 hook 對 c 的 note 4-gram 0 條；hook 與 note 無逐字重複句；開頭前四字 26 張互異。事實面：Pontiac 的 BPM 寫成「Discogs 替黑膠版逐曲列出」（唱片本身不印）；SOLAS 曲名對船史照研究層寫「可對上」；AIR 年份 2009（MB 首發）；Phaeleh 寫作年 2015–2019 與發行年分開；1000 Eyes 不寫廠牌、不寫國別；Echo Season 不寫 Peter Brefini。`node qa-batch.mjs hooks add-20261106-md45` 全部通過；`node chk-hook-crossgroup.mjs add-20261106-md45` 3 組 26 張全部通過。未上網。

## 鉤子層（a、b）
- **25111** 交件 `desc-tools/batches/hooks/add-20261106-md45-hooks-a.json`（9）、`-hooks-b.json`（8），key／順序照研究稿（Andy Leech、lb honne 已不在）。預算公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin（Forhill、Zane Alexander、Filmmaker、DIM）上限 170，其餘 230。逐筆（預算／hook 原始／加權）：Era 212／29／22；H.U.V.A. Network 223／25／25；Forhill 161／24／20；Tara Lily 216／24／19.5；Sneaker Pimps 227／26／20.5；Zane Alexander 154／21／21；Leif 229／25／25；Scann-Tec 229／29／24.5；Bergsonist 229／28／28；Tripswitch 230／30／24.5；Cemento Atlantico 229／29／26；Jogging House 226／28／22.5；Filmmaker 164／27／22；DIM 169／27／17.5；El Jazzy Chavo 226／25／20.5；Markus Guentner 227／19／19；Plant43 224／27／23。初稿 14 張超標，整格捨去：Era 的 Guy Protheroe、Bandcamp 兩首混音；H.U.V.A. 的 Ultimae 交融說、錄音室名、Huby Sea 母帶；Forhill 的曲數曲長、卡帶版 Stratford Ct.；Tara Lily 的亞洲旅行尋根、King Krule、〈Untold〉倒放暗碼；Sneaker Pimps 的《Bloodsport》、Pioneertown／The Tower、Simonne Jones、16 首；Leif 的 Pleass／McCullough、〈Myrtus〉馬林巴；Scann-Tec 的 Monokanal MK001、封面、文案「清新多彩」；Bergsonist 的「自由的聲音旅人」；Tripswitch 的 Nick Warren 合寫；Cemento 的首張《Rotte Interrotte》、「更暗」、8 首 39 分；Jogging House 的器材清單、〈Noodles〉；Filmmaker 的 Envigado、科幻曲名、發行日；DIM 的致謝名單其餘人、錄音時段（2016／2022–23）、發行年；El Jazzy Chavo 的黑膠卡帶；Guentner 的 Kompakt 等廠牌關係、〈Redshift〉；Plant43 的 Paul Cinske 致謝、Bandcamp ambient 榜首、實體 digipack。壓完回核：hook 依賴格全在 g1／g2（Leif 把植物＋網站格前移到 g2）；DIM 的 hook（致謝名單並列 Murcof 與 Current 93）自足，note 不重列。
- **25112** 骨架歸屬（17 張 17 條，與 c 組 25117 九條不撞）：Era＝虛構仿拉丁語唱合唱；H.U.V.A.＝兩地錄音室遠距合寫、盤名即距離；Forhill＝自寫自製到母帶、僅兩首客席合寫；Tara Lily＝少年 ADHD 診斷與退學寫成首張（語氣克制）；Sneaker Pimps＝擱置 demo 流出後轉正、近二十年才出第四張；Zane Alexander＝為夜路開車而排的連續曲序；Leif＝曲名全是植物＋互動網站；Scann-Tec＝首作八年後由他人重做母帶重發（標時序）；Bergsonist＝自傳式頌歌、回應被歸類；Tripswitch＝兩三年人生的陰影與光；Cemento Atlantico＝田野錄音起步＋泰國政變等歷史座標；Jogging House＝別人寄來的磁帶循環當素材（器物）；Filmmaker＝哥倫比亞人在阿姆斯特丹錄；DIM＝自稱 luminous black metal＋致謝名單即影響地圖；El Jazzy Chavo＝貧民窟廠牌與城市底層；Markus Guentner＝撞出月球的天體當盤名（懸疑，收在「仍在怒吼」）；Plant43＝夜店駐場依演出時間線寫成的 post-club。「一人包辦」「塵封」「沒有鼓」三個掃描器骨架詞全不用（Forhill、Tripswitch、El Jazzy Chavo 都是一人製作，只 Forhill 拿來當骨架；Tripswitch 捨 Nick Warren 合寫避撞）。hook 四型：斷言（Forhill、Sneaker Pimps、Leif、DIM）／場景（H.U.V.A.、Zane Alexander、Cemento、Jogging House、Filmmaker、El Jazzy Chavo、Plant43）／人物定調（Era、Tara Lily、Scann-Tec、Bergsonist、Tripswitch）／懸疑（Guentner）。
- **25113** 跨批同人避撞：Sneaker Pimps 已上架《Splinter》（Corner 接主唱、Kelli Ali）→ 本張走 SP5 demo 與二十年空白，第二句「…年在 Hartlepool 成軍的…」，不寫「英國電子樂團 X 的第 N 張」；Jogging House 已上架《Weight》（法蘭克福、聲音設計師兼 Seil 策展人、一次錄上盤帶）→ 本張第二句用「自稱 ambient 音樂人、也替 Discord 社群搭台」，骨架改磁帶循環；H.U.V.A. 兩人各有已上架卡（Solar Fields《Movements》寫 Mirror's Edge）→ 本張不帶遊戲配樂。第二句句型配表：Era「Era 是…作曲家 X…起經營的計畫」；H.U.V.A.「A（X）與 B（Y）合組」；Forhill「X 在…做…」；Tara「…的…音樂人 X，…發行首張專輯」；Sneaker「…年在…成軍的…，隔了…才…」；Zane「X 來自…，玩…」；Leif「X 是…的常客」；Scann-Tec「X 是 Y 的名號，替…寫過音樂」；Bergsonist「藝名 X 底下是…」；Tripswitch「本名…，在…做…」；Cemento「X 是…的電子計畫」；Jogging「自稱…的 X」；Filmmaker「X 是…的 Y 的名義」；DIM「X 在…，由…構思製作」；El Jazzy「…廠牌…替製作人 X 出第六張…」；Guentner「X 是…的作曲家，樂評視他為…」；Plant43「X 是 Y，…的駐場」。代稱：無同人兩張以上，不配他／她表；Tara Lily、Bergsonist 用「她」，Forhill、Filmmaker、DIM 指派全文不用代名詞，其餘男性。
- **25114** 「日」後一字逐張配死（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：Era 面、H.U.V.A. 由、Forhill 登、Tara Lily 正、Sneaker Pimps 透、Zane 亮、Leif 經、Bergsonist 替、Tripswitch 發、Cemento 交、Jogging House 在、El Jazzy Chavo 出、Guentner 推、Plant43 作；Scann-Tec 只寫到年（原盤）與月（重發），Filmmaker、DIM 只寫年或不寫。事實面：Sneaker Pimps 初稿 hook「2006 年流出」與 facts（2006 年的 demo、後來流出）不符，改「流出的 2006 年 demo」；Markus Guentner 不寫廠牌（單源，照主線）；Leif 照卡單寫 Whities；Scann-Tec 年份 2010、重發標時序；self-released 的 Tripswitch、Filmmaker、DIM 不寫廠牌；El Jazzy Chavo 的「hard knocking drums」只寫成 boom bap 取樣鼓。研究稿 notes 的 moodGuess／汰換評語未進 note。
- **25115** 自查與腳本：a、b 17 個 hook 互掃中文 4-gram 0；a、b hook 對全批 26 張 note 與 c 組 hook 0（田野錄音對 Leif note 一條屬樂種術語，後 hook 改「實地收音」歸零）；hook 與自己 note 只剩專名／器物（哥倫比亞、磁帶循環）。對 `add-202611*` 既有 hooks／out 掃出 3 張以上的 hook 殘片全改：國作曲家／法國作曲（Era 改以 Era 領名）、只有兩首（Forhill 改「僅兩首」）、曲名全是／首曲名全（Leif 改「以植物命名」）、做了十二、住在紐約／在紐約創、與未來的、重做母帶、演出的時間；剩 ≤2 張的「間錄音室」「每首歌都」與地名阿姆斯特丹。開頭前四字 26 張互異（Tara 原「15 歲」撞既有開頭，改「她 15」）。`node qa-batch.mjs hooks add-20261106-md45` 全部通過；`node chk-hook-crossgroup.mjs add-20261106-md45` 3 組 26 張全部通過（hook 加權 17.5–28、note 157–235）。未上網。
