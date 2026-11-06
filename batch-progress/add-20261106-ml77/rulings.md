# add-20261106-ml77 裁定（情緒薄格策展線・恍惚 Bandcamp downtempo 第三輪「有鼓」名單）

> 店主 2026-11-06：「有些要死不活的音樂也會有鼓推進」「全都上架吧」→ 前兩輪因「有拍推進」被研究層汰、或在第二輪前被舞池標籤篩掉的 473 張切十批（ml74–81、md44–45），五個工作階段並行；本工作階段做 ml76＋ml77。來源 `batch-progress/bandcamp-dt-20261105/README.md`；卡單 `pick-ml77.json`（47 張）。**卡單即策展結果**，不派策展代理；主線組 `curation-ml77.json` → `build-master.mjs ml77` → `master-ml77.json` → 卡單。評分照 10-23 店主「體感標準」與 CUR-DISPATCH「有鼓不等於躁」。目標格：**恍惚＝靜＋重＋暖，邊距 x≤2.7、y≥0.8、z≥0.3**。
> 本批卡單：`desc-tools/batches/cards/add-20261106-ml77-cards.json`（34 張；研究 a 7、b 7、c 7、d 7、e 6）。身分：MB 釘住 33、§1 人工 1（LAL《Find Safety》）。
> **預留：研究 a 24601–24610、b 24611–24620、c 24621–24630、d 24631–24640、e 24641–24650、鉤子 24651–24660、寫作 24661–24670、主線 24671–24680。**
---

## 主線策展（不佔條號；2026-11-06）
- **本輪汰除原則（店主 11-06）**：不准只因有鼓就汰。慢、拖、無力的鼓照 BRIEF 仍算靜；只有 (1) 鼓＋攻擊性（失真牆、嘶吼、音壓貼臉）、(2) 舞池推進（四拍底鼓、house／techno／breakbeat 跳舞律動、明顯中快速）兩種才汰。**判輕、判冷不汰**——店主要「全都上架」，落不到恍惚的照實落其他格、在收工時計數。身分（EP／合輯／現場／remix／翻唱）、去重、同人超量照舊汰。
- 去重：`dupchk.mjs`（seed、所有 manifest、`data/pool-removed.json`、所有 curation）撞池 0；撞到的只有前兩輪本來就提過、被汰的同一張（本輪重提，本來就是這份名單的來源）。
- 同人上限：並行卡單（ml74／75／78–81、md44／45）與池中一起看。池中 ≥5 張或並行卡單另有多張的，本工作階段兩批合計最多一張；池中 0 且並行少的，兩批合計兩張以內。
- MB 逐張 search；名稱照 MB 正規名（THE NEW LAW→The New Law、dan le sac→Dan le Sac、FLOX→Flox、Gumi→GUMI、DEGIHEUGI→Degiheugi、盤名大小寫照 MB）；年份照 MB first-release-date（A Positive Life《Synaesthetic》1994、Neutron 9000《Lady Burning Sky》1994（Bandcamp 2021 為 Turbo 重發）、Era《Era》1996（選 1996 原版 RG，不取 2002 版）、Suduaya《Unity》2013）。AndyFellaz、GUMI、Dday One 的 MB release-group 無 primary type，曲數／長度（14 軌 45 分、9 軌 56 分、10 軌 30 分）屬正規專輯，照收。Flox《The Words》MB 只有「The Words (Bonus Version)」一個 RG，照用、queryAlias 帶原名。
- **沿用研究稿**：5 張是前一輪研究判有鼓而汰的，原研究稿從 `add-20261106-<原批>/dropped-research.json` 搬進本批研究檔（key 不變），研究層只補鼓的種類與缺口。
- **主線汰 13**：
  - Thievery Corporation《Babylon Rewound》：非正規專輯：MB Album＋Remix，《The Richest Man in Babylon》的八首重混
  - Chillhop Music《Chillhop daydreams 2》：合輯：Chillhop 廠牌系列精選（MB Album＋Compilation）
  - The Orb《Okie Dokie It´s The Orb On Kompakt》：舞池推進＋先例：Kompakt 四拍 ambient house，ml61 已因四拍汰；池中 The Orb 已 8 張
  - Chillhop Music《Chillhop Essentials Winter 2024》：合輯：Chillhop 廠牌季度精選 28 首 2xLP
  - Blockhead《It's Only A Midlife Crisis If Your Life Is Mid》：EP：MB primary type EP，Bandcamp 文案自稱 new EP（6 首 35 分）
  - The Orb《Prism》：舞池推進：ml70 研究稿寫 drum & bass 與硬科技舞曲段落；池中 The Orb 已 8 張
  - Quanta《Elements》：remix 過半：6 首裡 3 首是別人的重混（LubDub、AkAshA Experience ×2）
  - Zero Cult《Eclectica》：同人超量：並行 ml79／81 另 2 張；本工作階段只收《Closer Than Ever》
  - Jogging House《Fiber》：同人超量：池中 1、並行 ml74／81／md45 另 7 張；本工作階段只收《Rendezvous》
  - Purrple Cat《Cypress Manor》：同人超量：池中已 10 張
  - Billy Valentine《Billy Valentine & The Universal Truth》：翻唱專輯：全盤翻唱 Gil Scott-Heron、Marvin Gaye、Curtis Mayfield 等人的歌
  - My Neighbour Is《Moon's Reflection On A Quiet Lake》：舞池推進：Cold Busted 文案直述 funky dance floor nuggets、punchy rolling rhythms
  - Banco de Gaia《30 Times Around the Sun》：合輯：三十年回顧選集（MB Album＋Compilation，30 首 211 分）

## 研究 b 組
- 24611：b 組 7 張鼓型判定——慢拖：The New Law《The Fifty Year Storm》（trip-hop／hip-hop breakbeat、電影感）、Pan Amsterdam《HA Chu》（爵士取樣 hip-hop，中慢速）；不明：Star Parks（樂團鼓＋拍手，偏輕）、Move 78、Long Arm、Random Rab、Dr. Toast（鼓型無這張的來源）。**無任何一張有攻擊性或舞池證據，無建議汰**；Random Rab（標籤 edm／dance）與 Dr. Toast（藝人層 thumping breaks 基底）舞池風險中等，標在 notes。
- 24612：Dr. Toast 沿用 ml72 研究稿不重查，只補鼓型行；原稿『建議主線汰』改為不達門檻（只有藝人層描述，無這張鼓型證據）。
- 24613：Pan Amsterdam 廠牌名（Def Pressé）只有 Bandcamp 文案暗示，facts 不寫確切廠牌；Norman Records 評論頁 403，內容引自搜尋摘要，單一來源。
- 24614：Star Parks、The New Law、Random Rab、Long Arm、Pan Amsterdam 的 label 卡單為空或未驗證，facts 不寫廠牌。

## 研究 a 組
- 24601：Era《Era》沿用 ml71 研究稿不重查；原稿「建議汰」撤回：鼓型為流行搖滾式持續鼓貝斯，非攻擊性、非舞池，依本輪標準判輕不汰；notes 補鼓型行（不明）。
- 24602：Potatohead People《Mellow Fantasy》沿用 ml68 稿；鼓型判慢拖（Dilla 式鬆散拍為主，個別曲 house／boogie 快段），不建議汰。
- 24603：BALTHVS 兩張地點矛盾（Bandcamp 標 San Diego、Riff Magazine 稱波哥大）：facts 並列註明；廠牌 Cubensis Records 單一來源。
- 24604：BALTHVS《Cause & Effect》鼓型標「不明」：文案列 deep house／disco 但無逐曲或 BPM 來源，證據不足不寫建議汰；主線知悉為本組最大舞池風險。
- 24605：Robot Koch、Moderator、Anthony Naples 鼓型判慢拖（半速重拍／boom bap 懶拍／鼓可有可無的 trip-hop 慢鼓），不建議汰；Naples 的 house／techno 標籤是出身風格非這張律動。

## 研究 d 組
- 24631：d 組七張鼓型判讀——Blackfish 慢拖（Bandcamp downbeat／groove，無 BPM）、Emapea 慢拖（boom bap 重鼓，x 貼邊 2.9）、Deceptikon 慢拖（鬆散不量化鼓機）、Brock Berrigan／Klangstein／Invisible Allies／Glen Porter 不明；七張皆無攻擊性或舞池推進的直接證據，無建議汰。
- 24632：Invisible Allies《Hyperdimensional Animals》Discogs 曲目 10 首中後 5 首為他人重混（MB 仍是 Album）；移交主線裁定是否比照 Quanta 先例以 remix 過半處理。
- 24633：Glen Porter 原稿「建議汰」是風格不符（吉他迷幻／衝浪搖滾）而非鼓型，依本輪規則改為不建議汰、鼓型不明，風格存疑留給主線。
- 24634：Blackfish 卡單 label 寫 blackfish productions，但 2001 原版是 Konvex | Konkav KK012；Klangstein 查不到樂評，status thin。

## 研究 c 組
- 24621：c 組 7 張鼓型判定——攻擊性：GILA《Energy Demonstration》（FACT「razor-sharp percussion、destructive art-trap」、Boomkat「bags of killer drums」、Bandcamp 自述 hard-edged bangers，標籤 techno／trap；**建議汰**，預估 x≈3.6）；慢拖：Random Rab《Awoke》（把握低，僅標籤與上一張宣傳稿）、Zero Cult《Closer Than Ever》（末曲〈Hit and Run〉廠牌文案特指舞池，前九首不是）、Evil Needle《Abyssal》（僅標籤 jazzy／lounge／neo-soul）；不明：Astronaut Ape（文案 progressive grooves、dub-like basslines，標籤含 Progressive Trance）、Jean du Voyage、Błoto（真人鼓加 TR-8／SPD-SX，商店文案 jazz／house／techno pulses）。其餘六張無攻擊性或舞池證據，不建議汰。
- 24622：Astronaut Ape（Progressive Trance）與 Błoto（house／techno pulses）舞池風險中等，但無 BPM、無樂評證據，依「判不出來的留」不汰，交評分。
- 24623：x 貼邊提醒（≤2.7 門檻）：Astronaut Ape 2.8、Jean du Voyage 2.8、Błoto 2.8；Zero Cult 卡單 1.8 我改估 2.2。
- 24624：Jean du Voyage、Evil Needle、Astronaut Ape、Zero Cult 查不到樂評，facts 只用 Bandcamp 頁面與廠牌文案，status 標 thin；WebSearch 用了 3 次（GILA、Błoto、Random Rab）。
- 24625：Free Jazz Blog 把 Błoto《Grzybnia》標 2025 年、團員名單與 Bandcamp 署名不同；採 Bandcamp／MB（2024-10-11，Cancer G 打鼓）。

## 研究 e 組

- **24641**：Romare《Oblivion》鼓型判「不明（混合）」不建議汰。依據：零售商導讀點名 4/4 脈動（Machines）、acid house（Change）、boom-bap（Take Us），但同時有 trip-hop 慢搖籃曲與爵士酒吧式滑步，主體不是舞池；動能偏中、質地偏輕，評分多半落隔壁格而非恍惚。無獨立樂評。
- **24642**：Degiheugi《Endless Smile 2》鼓型「不明」（boom bap／MPC，無速度來源），不汰。卡單 label 空白合理（自家 Endless Smile Records）。
- **24643**：Ochre《Oversail》鼓型「不明」（IDM 骨架式鼓機；techno 僅標籤），不汰；評分時留意是否有四拍曲。
- **24644**：Banco de Gaia《Trauma》鼓型「舞池（部分）」，**建議汰**。依據：德語樂評稱整體振奮甚至帶怒氣、不是沉思，〈War〉明確舞池；標籤含 dance、balearic、worldbeat；卡單 x 2.4 偏低。可逆：主線若認為氛圍曲佔多數可留，廠牌補 Disco Gecko Recordings。
- **24645**：High Tides《Paradise Daze》鼓型無來源，不汰，status thin（僅 Bandcamp 標籤）。
- **24646**：LAL《Find Safety》§1 人工身分核對通過：Bandcamp／Apple 2016-04-29，Discogs master 1123849（2016，Coax OAX011，LP），盤名、年份 2016、廠牌 Coax 皆未推翻；僅 Discogs 第 3 軌曲名 Were 與 Bandcamp Where 不同，以 Bandcamp 為準。鼓型無來源，不汰；Deep House 標籤有舞池風險留評分判。

## 主線研究汰換（不佔條號；2026-11-06）
研究層交件後汰 3 → 剩 31；被汰卡移到 `dropped-cards.json`／`dropped-research.json`。不補位。判輕、判冷、鼓型不明的照本輪原則一律留給評分。
- GILA《Energy Demonstration》：鼓＋攻擊性：樂評「razor-sharp percussion、destructive art-trap」「bags of killer drums」，自述 hard-edged bangers（研究 c）
- Banco de Gaia《Trauma》：舞池推進：德語樂評稱整體振奮帶怒氣、〈War〉明言適合舞池，標籤 dance／balearic，x 估 3.2（研究 e）
- Invisible Allies《Hyperdimensional Animals》：remix 過半：Discogs 10 首後 5 首是別人的重混（比照本批 Quanta《Elements》主線汰）（研究 d）
- 留下但貼邊交評分層：Romare《Oblivion》（零售導讀點名 4/4、acid house 各一曲，主體 trip-hop／boom-bap）、BALTHVS《Cause & Effect》（文案列 deep house／disco，無逐曲）、Astronaut Ape、Błoto（真鼓＋TR-8）、LAL（Deep House 標籤）、Glen Porter（衝浪搖滾能量，非攻擊性非四拍）、Era（流行搖滾式持續鼓貝斯）、Potatohead People（Dilla 式鬆拍，個別 house 段）。

## 鉤子層（d–e）（24656–24660）
- **24656** 交件：`desc-tools/batches/hooks/add-20261106-ml77-hooks-d.json`（6）、`-hooks-e.json`（5），key 逐字照主線汰換後研究稿、順序不變、欄位只有 key／hook／note。公式照派工寫死版：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。thin 3 張上限 170（Klangstein、High Tides、LAL），full 8 張上限 230。逐筆（hook 原始／加權／預算）：d：Blackfish 29／24.5／222；Emapea 28／25／230；Brock Berrigan 25／19／202；Klangstein 26／22.5／165；Deceptikon 23／23／222；Glen Porter 29／23／228。e：Romare 25／22.5／216；Degiheugi 29／23／213；Ochre 28／20.5／228；High Tides 22／22／170；LAL 26／20.5／169。初稿 8 張超標（最高 Blackfish 317、Degiheugi 283），整格捨去：Blackfish 的〈Sea Traffic〉長曲、低音厚與廠牌重複指派句；Emapea 的母帶／封面署名、16 首；Brock 的 laid-back 形容與刮碟曲名；Klangstein 的另兩張合輯名與 Nosie Katzmann；Glen Porter 的 Lucas Drake 編制；Romare 的曲數長度、錄音史取樣一格與權力結構；Degiheugi 的 DJ Shadow／J Dilla 影響與法葡曲名；Ochre 的洪水路網；LAL 的曲數與憂鬱人聲。壓完回核：11 張 hook 依賴的事實都在 g1／g2（Blackfish 的法蘭克福少年節拍、Emapea 的開場重鼓＋鋼琴銅管、Brock 的 16 首／31 分／〈Prologue〉、Deceptikon 的對拍序列並置、Glen Porter 的 250 張與衝浪搖滾 breaks〔g2／g3，壓預算時已定不再砍〕、Ochre 的封面纜車巨塔、High Tides 的〈Washed Ashore〉〈Midnight Cove〉、LAL 的 1998 HMV）。hook 自驗改兩處：Deceptikon「鼓機」改「電子序列」（facts 是電子序列對鬆散時間感）；Brock「最短的開場」改不指位置（facts 未載〈Prologue〉軌序）。
- **24657** 骨架歸屬（11 張 11 條，只在擁有者 note 寫歸屬句）：Blackfish＝節拍少年繞過 trip-hop／drum'n'bass 才交出的首張；Emapea＝樂評把取樣集聽成完整專輯；Brock Berrigan＝半小時塞滿短篇的 beat tape；Klangstein＝合輯常客的整張；Deceptikon＝對拍序列與鬆散真樂器並置；Glen Porter＝限量 250 張的衝浪搖滾 breaks；Romare＝一張裡鼓型逐曲切換（4/4 朗讀、boom-bap、acid house、搖籃曲）；Degiheugi＝取樣機節拍外加管樂手層；Ochre＝科幻小說章節當視覺概念；High Tides＝曲名全是海岸意象；LAL＝唱片行同事成團。避開 a–c 研究稿可能的骨架：Emapea 的器材清單不指派（研究 b Random Rab《Formless Edge》也列器材）；Deceptikon 的 Project: Mooncircle 不指派（研究 a Robot Koch、b Long Arm 同廠）；Blackfish 的 Voyage Léger 合輯不指派（讓 Klangstein 獨走合輯）；16 首只留 Brock（Emapea、Degiheugi 也是 16 首，皆不寫曲數）；Degiheugi 的客座 Miscellaneous 不指派（研究 c Jean du Voyage 也有）。媒體名 0（Emapea 寫「樂評說」、LAL 不帶 NOW／Exclaim!／CBC）；「據說／據傳」0；研究稿 notes 的鼓型與預估座標 0 進 hook／note。Blackfish 廠牌寫 Konvex | Konkav（研究 d 24634），不寫 blackfish productions。
- **24658** 同人分軸與引入法：本組 11 位各只一張，無「他／她」跨張配表需要。Degiheugi 跨批：本張（ml77）帶生平（De La Soul 入門、約 2005 啟動）＋管樂手層＋2021–2025 自家錄音；《Bagatelle》（ml76）留給戀愛主題、取樣與客座人聲、Mr Gib／Dulk 署名、背風群島所在地——本張這幾格全部不指派。第二句句型配表（11 種）：Blackfish＝「德國製作人＋全名」；Emapea＝名字直接領句＋國籍；Brock＝「地域＋身分＋名字」（美東的 beat maker）；Klangstein＝「名字＋是＋國籍製作人」（g1 即領句）；Deceptikon＝「城市＋本名」；Glen Porter＝藝名＋本名（生卒年括號）；Romare＝國籍製作人＋本名；Degiheugi＝國籍＋beatmaker；Ochre＝計畫屬性＋本名＋據點城市；High Tides＝城市＋編制（合成器二人組）＋成員名；LAL＝城市團體＋成員名。hook 四型：懸疑 Romare、Deceptikon／斷言 Brock、High Tides／場景 Emapea、Glen Porter、Ochre／人物定調 Blackfish、Klangstein、Degiheugi、LAL。
- **24659** 「日」後一字：Emapea 推、Brock 自、Deceptikon 問、Glen Porter 由、Romare 發、Degiheugi 面；Blackfish、Klangstein、Ochre、High Tides、LAL 只寫到年或月。尺 `/[年月]\s*\d{1,2}\s*日(.)/`。自查：hook 開頭前四字 11 張互異，對全 hooks 目錄亦互異（原稿「31 分」「16 首」「十首曲名」「1998」撞他批，已改）；本組 hook 之間中文 4-gram 0；hook 對本組 note 0；hook 子句逐字進 note 0（Blackfish 原稿 8 字逐字，已改寫）；對全目錄 hook 3 次以上的通用串只剩專名「法蘭克福」（原稿「最短的一」×34、「其中一首」×25、「十首曲名」×4、「唱片行的」×5、「了這個團」×6 已改字）。hook 無否定句。a–c 組 hooks 檔交件時尚未存在，hook 跨組 4-gram 待主線合掃。
- **24660** 腳本：`node chk-hook-crossgroup.mjs add-20261106-ml77` ✓ 全部通過（d、e 兩組 11 張，hook 加權 19–25，note 165–229）；`node qa-batch.mjs hooks add-20261106-ml77` 只報 a、b、c 缺 hook 檔（另一位未交），d、e 無標記。輔助腳本：scratchpad `hook-ml77-de/ml77de-chk.mjs`。

## 鉤子層（a、b、c）
- **24651** 交件：`desc-tools/batches/hooks/add-20261106-ml77-hooks-a.json`（7）、`-b`（7）、`-c`（6），key 與順序照研究稿（c 組 GILA 已被主線汰，6 張）。公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin（Move 78、Long Arm、Dr. Toast、Random Rab《Awoke》、Astronaut Ape、Jean du Voyage、Zero Cult、Evil Needle）上限 170，其餘 230。逐筆預算／hook 加權（原始字元）：Era 226／20（22）、Potatohead 206／21.5（24）、Robot Koch 222／20（20）、MACROCOSM 223／24.5（26）、Cause & Effect 226／18（18）、Moderator 228／21（21）、Naples 226／22.5（26）、Star Parks 219／17（22）、New Law 227／18（18）、Move 78 166／20（20）、Long Arm 168／20（20）、Formless Edge 219／19（19）、Dr. Toast 166／23（26）、Pan Amsterdam 222／22（27）、Awoke 169／22（27）、Astronaut Ape 143／20（20）、Jean du Voyage 157／17（17）、Błoto 223／17（17）、Zero Cult 163／17（17）、Evil Needle 160／17（17）。初稿 20 張全超標，整格捨去：Era 影響來源與 Lévi 包辦、Potatohead 的 T3／Illa J／Kendra Dias 客座與 Phife Dawg、Robot Koch 的 Nielson、MACROCOSM 曲名三語、Moderator〈Zombie Girl〉、Naples 第二則樂評、Star Parks 法愛巡演與製作人、New Law 曲名與〈Into the Clouds〉、Formless Edge 豎琴、Pan Amsterdam 兩位客座、Awoke 打擊與封面、Błoto 出道三張與等三年、Jean du Voyage 其他客座。壓完回核：Star Parks 的「奧斯汀」、Błoto 的「九首」曾踩空，已補回 note；其餘 hook 依賴格都在 g1／g2。
- **24652** 骨架歸屬（20 張 20 條）：Era＝虛構語言歌詞；Potatohead＝先請歌手再圍人聲做 beat；Robot Koch＝客座一首變五首（不找大牌）；MACROCOSM＝家族鄉間屋錄首張（錄音地點）；Cause & Effect＝盤名典故（赫密士公理）；Moderator＝收音機轉台式影響拼貼；Naples＝house 出身放慢成 shoegaze；Star Parks＝自稱預算版 Bacharach、個人計畫擴成迷你管弦；New Law＝章節式續篇（荒原→出海）；Move 78＝同批錄音交演算法重處理；Long Arm＝描寫靈魂狀態的概念；Formless Edge＝世界樂器疊在鼓機上；Dr. Toast＝地下派對筆電現場出身；Pan Amsterdam＝替 Iggy Pop 領樂隊的小號手化名饒舌；Awoke＝拒絕被叫 downtempo；Astronaut Ape＝機長廣播式航程概念；Jean du Voyage＝同一位客座占五首；Błoto＝曲名全是蘑菇（菌絲體）；Zero Cult＝舞池只留給末曲；Evil Needle＝兩年空白後回歸。同藝人分軸：BALTHVS《MACROCOSM》帶組團與錄音地點、《Cause & Effect》帶盤名與風格擴張；Random Rab《Formless Edge》帶器材與客座樂器（錄音細節）、《Awoke》帶宣傳稿的自我定位與曲長；The New Law 避 ml76《High Noon》研究稿的西雅圖與西部片（ml76 鉤子檔尚未交）；Long Arm 避 ml76 的聖彼得堡與首張 Mooncircle；Moderator 避 md39《Silent Cinema》已上的「雅典城市領句＋13 軌包辦後製」。Robot Koch 與 Long Arm 同廠 Project Mooncircle：前者寫「廠牌稱最個人的一張」，後者寫「廠牌歸為電影感 downtempo 與爵士器樂」。Błoto「與 EABS 巡迴休息日組團」研究稿標傳聞，整格捨去。
- **24653** 第二句句型與「他／他們」引入：Era 樂種＋作曲家領句；Potatohead 名字＋起家年地；Robot Koch 生年出生地；MACROCOSM「BALTHVS 是…三人組」；Cause & Effect 序數領句（第二張專輯裡）；Moderator 樂種領句；Naples 廠牌關係（經營 Incienso）；Star Parks「起初是…個人計畫」；New Law「由…組成」；Move 78 城市＋團名；Long Arm 廠牌關係（交給 Project: Mooncircle）；Formless Edge 外人之口身分（被稱為代表人物）；Dr. Toast 本名；Pan Amsterdam 化名；Awoke 名字＋日期＋Bandcamp；Astronaut Ape 掛名欄；Jean du Voyage 國籍＋日期；Błoto「是波蘭爵士團」＋團名字義；Zero Cult 外人之口（廠牌稱）；Evil Needle 地區＋樂種。hook 只用「他」的四張（Moderator、Dr. Toast、Awoke、Evil Needle）第二句都具名；Pan Amsterdam hook 只有身分，第二句具名本名。
- **24654** 「日」後一字（`/[年月]\s*\d{1,2}\s*日(.)/`）：Potatohead 於、Robot Koch 交、MACROCOSM 完、Cause & Effect 上、Naples 在、Star Parks 登、New Law 開、Move 78 經、Long Arm 正、Formless Edge 釋、Dr. Toast 出、Pan Amsterdam 亮、Awoke 放、Astronaut Ape 首、Jean du Voyage 公、Błoto 透、Zero Cult ，、Evil Needle 以；Era、Moderator 只到年／月，Błoto 錄音只到月。初稿與 d／e 撞「問推由發面」五字，改我方。媒體名一律不進 hook／note（寫「樂評」「文案」「廠牌」），無「據說／據傳」，研究稿鼓型與預估座標未進 note。
- **24655** n-gram 自查：全批 31 張 hook 間中文 4-gram 0；對 ml／md 已交 hook 掃，a–c 0 條（唯一命中「法蘭克福」屬 d 組 Blackfish，地名）。開頭前四字 31 張互異。hook／note 逐字重複：Robot Koch「最後唱了五首」初稿重複，note 改「最後變成五首」。腳本：`node qa-batch.mjs hooks add-20261106-ml77` 全部通過；`node chk-hook-crossgroup.mjs add-20261106-ml77` 全部通過（只報不擋的否定句兩筆：Era「沒有確切意義」、Naples「有沒有鼓都成立」，皆為內容）。
