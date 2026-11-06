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
