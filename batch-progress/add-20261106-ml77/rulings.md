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
- **24656** 交件：`desc-tools/batches/hooks/add-20261106-ml77-hooks-d.json`（6）、`-hooks-e.json`（5），key 逐字照主線汰換後研究稿、順序不變、欄位只有 key／hook／note。公式照派工寫死版：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。thin 3 張上限 170（Klangstein、High Tides、LAL），full 8 張上限 230。逐筆（hook 原始／加權／預算）：d：Blackfish 29／24.5／222；Emapea 28／25／230；Brock Berrigan 25／19／202；Klangstein 26／22.5／165；Deceptikon 23／23／222；Glen Porter 29／23／228。e：Romare 25／22.5／216；Degiheugi 30／24／229；Ochre 28／20.5／228；High Tides 22／22／169；LAL 26／20.5／169。初稿 8 張超標（最高 Blackfish 317、Degiheugi 283），整格捨去：Blackfish 的〈Sea Traffic〉長曲、低音厚與廠牌重複指派句；Emapea 的母帶／封面署名、16 首；Brock 的 laid-back 形容與刮碟曲名；Klangstein 的另兩張合輯名與 Nosie Katzmann；Glen Porter 的 Lucas Drake 編制；Romare 的曲數長度、錄音史取樣一格與權力結構；Degiheugi 的 DJ Shadow／J Dilla 影響與法葡曲名；Ochre 的洪水路網；High Tides 的〈Washed Ashore〉〈Swaying Palms〉；LAL 的曲數與憂鬱人聲。壓完回核：11 張 hook 依賴的事實都在 g1／g2（Blackfish 的法蘭克福少年節拍、Emapea 的開場重鼓＋鋼琴銅管、Brock 的 16 首／31 分／〈Prologue〉、Deceptikon 的對拍序列並置、Glen Porter 的 250 張與衝浪搖滾 breaks〔g2／g3，壓預算時已定不再砍〕、Ochre 的封面纜車巨塔、High Tides 的酸性電子計畫分支、Degiheugi 的 De La Soul＋2021–2025 錄音、LAL 的 1998 HMV）。hook 自驗改兩處：Deceptikon「鼓機」改「電子序列」（facts 是電子序列對鬆散時間感）；Brock「最短的開場」改不指位置（facts 未載〈Prologue〉軌序）。
- **24657** 骨架歸屬（11 張 11 條，只在擁有者 note 寫歸屬句）：Blackfish＝節拍少年繞過 trip-hop／drum'n'bass 才交出的首張；Emapea＝樂評把取樣集聽成完整專輯；Brock Berrigan＝半小時塞滿短篇的 beat tape；Klangstein＝合輯常客的整張；Deceptikon＝對拍序列與鬆散真樂器並置；Glen Porter＝限量 250 張的衝浪搖滾 breaks；Romare＝一張裡鼓型逐曲切換（4/4 朗讀、boom-bap、acid house、搖籃曲）；Degiheugi＝少年入門饒舌、一張錄五個年頭；Ochre＝科幻小說章節當視覺概念；High Tides＝從酸性電子合作計畫分岔的二人組；LAL＝唱片行同事成團。避開 a–c 研究稿可能的骨架：Emapea 的器材清單不指派（研究 b Random Rab《Formless Edge》也列器材）；Deceptikon 的 Project: Mooncircle 不指派（研究 a Robot Koch、b Long Arm 同廠）；Blackfish 的 Voyage Léger 合輯不指派（讓 Klangstein 獨走合輯）；16 首只留 Brock（Emapea、Degiheugi 也是 16 首，皆不寫曲數）；Degiheugi 的客座 Miscellaneous 不指派（研究 c Jean du Voyage 也有）。a–c hooks 交件後對骨架：High Tides 原「曲名全是海岸意象」撞 c 組 Błoto「九首曲名全是蘑菇」、Degiheugi 原「管樂手層疊在節拍上」近 b 組 Random Rab「樂器全疊在鼓機上」，兩張改骨架、hook 重寫。媒體名 0（Emapea 寫「樂評說」、LAL 不帶 NOW／Exclaim!／CBC）；「據說／據傳」0；研究稿 notes 的鼓型與預估座標 0 進 hook／note。Blackfish 廠牌寫 Konvex | Konkav（研究 d 24634），不寫 blackfish productions。
- **24658** 同人分軸與引入法：本組 11 位各只一張，無「他／她」跨張配表需要。Degiheugi 跨批：本張（ml77）帶生平（De La Soul 入門、約 2005 啟動）＋管樂手層＋2021–2025 自家錄音；《Bagatelle》（ml76）留給戀愛主題、取樣與客座人聲、Mr Gib／Dulk 署名、背風群島所在地——本張這幾格全部不指派。第二句句型配表（11 種）：Blackfish＝「德國製作人＋全名」；Emapea＝名字直接領句＋國籍；Brock＝「地域＋身分＋名字」（美東的 beat maker）；Klangstein＝「名字＋是＋國籍製作人」（g1 即領句）；Deceptikon＝「城市＋本名」；Glen Porter＝藝名＋本名（生卒年括號）；Romare＝國籍製作人＋本名；Degiheugi＝「法國 beatmaker＋名字」；Ochre＝計畫屬性＋本名＋據點城市；High Tides＝城市＋編制（合成器二人組）＋成員名；LAL＝城市團體＋成員名。hook 四型：懸疑 Romare、Deceptikon／斷言 Brock／場景 Emapea、Glen Porter、Ochre／人物定調 Blackfish、Klangstein、Degiheugi、High Tides、LAL。High Tides 第二句改為「城市＋編制＋成員名」接在只帶來歷的 hook 後。
- **24659** 「日」後一字：Emapea 推、Brock 自、Deceptikon 問、Glen Porter 由、Romare 發、Degiheugi 面；Blackfish、Klangstein、Ochre、High Tides、LAL 只寫到年或月。尺 `/[年月]\s*\d{1,2}\s*日(.)/`。自查：hook 開頭前四字 11 張互異，對全 hooks 目錄亦互異（原稿「31 分」「16 首」「十首曲名」「1998」撞他批，已改）；本組 hook 之間中文 4-gram 0；hook 對本組 note 0；hook 子句逐字進 note 0（Blackfish 原稿 8 字逐字，已改寫）；對全目錄 hook 3 次以上的通用串只剩專名「法蘭克福」（原稿「最短的一」×34、「其中一首」×25、「十首曲名」×4、「唱片行的」×5、「了這個團」×6、「在自家錄」×3、「前後錄了」×4 已改字）。hook 無否定句。a–c 組 hooks 交件後合掃：全批 31 張 hook 之間中文 4-gram 0、d／e hook 對全批 note 0。
- **24660** 腳本：`node chk-hook-crossgroup.mjs add-20261106-ml77` ✓ 全部通過（5 組 31 張，hook 加權 17–25，note 148–235；一般否定句只報 a 組兩筆）；`node qa-batch.mjs hooks add-20261106-ml77` 全部通過 ✓。輔助腳本：scratchpad `hook-ml77-de/ml77de-chk.mjs`。

## 鉤子層（a、b、c）
- **24651** 交件：`desc-tools/batches/hooks/add-20261106-ml77-hooks-a.json`（7）、`-b`（7）、`-c`（6），key 與順序照研究稿（c 組 GILA 已被主線汰，6 張）。公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin（Move 78、Long Arm、Dr. Toast、Random Rab《Awoke》、Astronaut Ape、Jean du Voyage、Zero Cult、Evil Needle）上限 170，其餘 230。逐筆預算／hook 加權（原始字元）：Era 226／20（22）、Potatohead 206／21.5（24）、Robot Koch 222／20（20）、MACROCOSM 223／24.5（26）、Cause & Effect 226／18（18）、Moderator 228／21（21）、Naples 226／22.5（26）、Star Parks 219／17（22）、New Law 227／18（18）、Move 78 166／20（20）、Long Arm 168／20（20）、Formless Edge 219／19（19）、Dr. Toast 166／23（26）、Pan Amsterdam 222／22（27）、Awoke 169／22（27）、Astronaut Ape 143／20（20）、Jean du Voyage 157／17（17）、Błoto 223／17（17）、Zero Cult 163／17（17）、Evil Needle 160／17（17）。初稿 20 張全超標，整格捨去：Era 影響來源與 Lévi 包辦、Potatohead 的 T3／Illa J／Kendra Dias 客座與 Phife Dawg、Robot Koch 的 Nielson、MACROCOSM 曲名三語、Moderator〈Zombie Girl〉、Naples 第二則樂評、Star Parks 法愛巡演與製作人、New Law 曲名與〈Into the Clouds〉、Formless Edge 豎琴、Pan Amsterdam 兩位客座、Awoke 打擊與封面、Błoto 出道三張與等三年、Jean du Voyage 其他客座。壓完回核：Star Parks 的「奧斯汀」、Błoto 的「九首」曾踩空，已補回 note；其餘 hook 依賴格都在 g1／g2。
- **24652** 骨架歸屬（20 張 20 條）：Era＝虛構語言歌詞；Potatohead＝先請歌手再圍人聲做 beat；Robot Koch＝客座一首變五首（不找大牌）；MACROCOSM＝家族鄉間屋錄首張（錄音地點）；Cause & Effect＝盤名典故（赫密士公理）；Moderator＝收音機轉台式影響拼貼；Naples＝house 出身放慢成 shoegaze；Star Parks＝自稱預算版 Bacharach、個人計畫擴成迷你管弦；New Law＝章節式續篇（荒原→出海）；Move 78＝同批錄音交演算法重處理；Long Arm＝描寫靈魂狀態的概念；Formless Edge＝世界樂器疊在鼓機上；Dr. Toast＝地下派對筆電現場出身；Pan Amsterdam＝替 Iggy Pop 領樂隊的小號手化名饒舌；Awoke＝拒絕被叫 downtempo；Astronaut Ape＝機長廣播式航程概念；Jean du Voyage＝同一位客座占五首；Błoto＝曲名全是蘑菇（菌絲體）；Zero Cult＝舞池只留給末曲；Evil Needle＝兩年空白後回歸。同藝人分軸：BALTHVS《MACROCOSM》帶組團與錄音地點、《Cause & Effect》帶盤名與風格擴張；Random Rab《Formless Edge》帶器材與客座樂器（錄音細節）、《Awoke》帶宣傳稿的自我定位與曲長；The New Law 避 ml76《High Noon》研究稿的西雅圖與西部片（ml76 鉤子檔尚未交）；Long Arm 避 ml76 的聖彼得堡與首張 Mooncircle；Moderator 避 md39《Silent Cinema》已上的「雅典城市領句＋13 軌包辦後製」。Robot Koch 與 Long Arm 同廠 Project Mooncircle：前者寫「廠牌稱最個人的一張」，後者寫「廠牌歸為電影感 downtempo 與爵士器樂」。Błoto「與 EABS 巡迴休息日組團」研究稿標傳聞，整格捨去。
- **24653** 第二句句型與「他／他們」引入：Era 樂種＋作曲家領句；Potatohead 名字＋起家年地；Robot Koch 生年出生地；MACROCOSM「BALTHVS 是…三人組」；Cause & Effect 序數領句（第二張專輯裡）；Moderator 樂種領句；Naples 廠牌關係（經營 Incienso）；Star Parks「起初是…個人計畫」；New Law「由…組成」；Move 78 城市＋團名；Long Arm 廠牌關係（交給 Project: Mooncircle）；Formless Edge 外人之口身分（被稱為代表人物）；Dr. Toast 本名；Pan Amsterdam 化名；Awoke 名字＋日期＋Bandcamp；Astronaut Ape 掛名欄；Jean du Voyage 國籍＋日期；Błoto「是波蘭爵士團」＋團名字義；Zero Cult 外人之口（廠牌稱）；Evil Needle 地區＋樂種。hook 只用「他」的四張（Moderator、Dr. Toast、Awoke、Evil Needle）第二句都具名；Pan Amsterdam hook 只有身分，第二句具名本名。
- **24654** 「日」後一字（`/[年月]\s*\d{1,2}\s*日(.)/`）：Potatohead 於、Robot Koch 交、MACROCOSM 完、Cause & Effect 上、Naples 在、Star Parks 登、New Law 開、Move 78 經、Long Arm 正、Formless Edge 釋、Dr. Toast 出、Pan Amsterdam 亮、Awoke 放、Astronaut Ape 首、Jean du Voyage 公、Błoto 透、Zero Cult ，、Evil Needle 以；Era、Moderator 只到年／月，Błoto 錄音只到月。初稿與 d／e 撞「問推由發面」五字，改我方。媒體名一律不進 hook／note（寫「樂評」「文案」「廠牌」），無「據說／據傳」，研究稿鼓型與預估座標未進 note。
- **24655** n-gram 自查：全批 31 張 hook 間中文 4-gram 0；對 ml／md 已交 hook 掃，a–c 0 條（唯一命中「法蘭克福」屬 d 組 Blackfish，地名）。開頭前四字 31 張互異。hook／note 逐字重複：Robot Koch「最後唱了五首」初稿重複，note 改「最後變成五首」。腳本：`node qa-batch.mjs hooks add-20261106-ml77` 全部通過；`node chk-hook-crossgroup.mjs add-20261106-ml77` 全部通過（只報不擋的否定句兩筆：Era「沒有確切意義」、Naples「有沒有鼓都成立」，皆為內容）。

## 寫作層（writer-1）（24661–24665）
- **24661** 交件：`desc-tools/batches/output/add-20261106-ml77-out-1.json` 16 張（key 逐字同序）。full 11 張 219–236（Era 235、Potatohead 236、Robot Koch 223、MACROCOSM 223、Cause & Effect 235、Moderator 225、Naples 222、Star Parks 229、New Law 223、Formless Edge 219、Pan Amsterdam 233）；thin 5 張 152–177（Move 78 177、Long Arm 163、Dr. Toast 155、Awoke 174、Astronaut Ape 152）。初稿只有 Potatohead 超標（262），整格捨去「再繞著對方的嗓音把曲子蓋起來」一句並縮「做法」，降到 236。首句全照抄 hook；第二句全照 note 指派的領句。
- **24662** 「日」後一字全照鉤子層 24654（於交完上在登開經正釋出亮放首；Era、Moderator 只寫到年／月）。Moderator 日期句改以廠牌領句（Melting Records 在 2018 年 4 月把它推出），避開「專輯年月」。
- **24663** 跨張 4-gram 自掃（本檔＋全批 hook＋已存在的 out-2 合掃，han() 剝非漢字）：拆掉 `是他們第`／`第三張全`（Potatohead 改「屬全長第三作」）、`第二張專` ×3（Star Parks 改日期領句、Pan Amsterdam 改「化名下的第二張」）、`其中一首` ×3、`唱片年月` ×3、`首約分鐘` ×6（Awoke 改「加總約」）、`合計約分`、`長約分鐘`、`分鐘上下`、`律動年月`、`發行收首`、`完成年月`、`子年月日`、`張年月日`、`在年月日`、`與合成器`。剩 2 張的只有：BALTHVS 兩張的「哥倫比亞」「迷幻放克」（兩張 note 指派的領句、同一團的樂種名）與 New Law 對 out-2 High Tides 的 `由與組成`（New Law 是 note 指派句型「由…組成的」，留著；主線收件合掃若要拆，改 out-2 那邊或把本張改成「Adam Straney 與 Justin Neff 這兩人的 The New Law」）。3 張以上 0 條。
- **24664** 照派工補充：note 裡的媒體名一律不寫（New Law、Naples、Star Parks 只寫「樂評」）；媒體榜單名次 0；「據說／據傳」0；研究稿鼓型與預估座標 0。note 只列「Posdnuos」，facts 的 De La Soul 未補；MACROCOSM 只寫「團員 Balthazar Aguirre」（吉他手身分在 facts、不在 note）。Era 的「刻意沒有確切意義」改正面寫成「字義卻刻意留空」。
- **24665** 腳本：`node qa-batch.mjs out add-20261106-ml77` 全部通過 ✓（out-1 16 張 152–236、out-2 15 張，thin 11 張全 ≤180）；`node qa-check-research.mjs batches/input/add-20261106-ml77-writer-1.json batches/output/add-20261106-ml77-out-1.json` 標記 0（只給批名會報用法錯誤，要給兩個路徑）；`node fix-spacing.mjs batches/output/add-20261106-ml77-out-1.json` 待補 0（只給批名會 ENOENT），未加 `--write`。輔助腳本：scratchpad `wr-ml77-1/ml77w1-drafts.mjs`、`ml77w1-build.mjs`。

## 寫作層（writer-2）（24666–24670）
- **24666** 交件：`desc-tools/batches/output/add-20261106-ml77-out-2.json` 15 張（full 9：182–237；thin 6：159–180）。逐張：Jean du Voyage 172、Błoto 227、Zero Cult 178、Evil Needle 159、Blackfish 227、Emapea 228、Brock Berrigan 182、Klangstein 180、Deceptikon 199、Glen Porter 220、Romare 237、Degiheugi 215、Ochre 236、High Tides 174、LAL 177。超標處理（整格捨去）：Błoto 初稿 246 砍「曲名從〈Shiitake〉排下去」（hook 已說曲名是蘑菇）；Klangstein 初稿 185 砍「德國廠牌」修飾；High Tides 初稿 186 砍 41 分鐘那格。Błoto 的「9 首」與 Glen Porter 的「250 張」不重寫（hook 已說，避免複述）。
- **24667** 第二句全照鉤子層指派（24653／24658），兩處微調以避同構：Romare「英國製作人」→「英籍製作人」、Klangstein「是德國製作人」→「這位製作人來自德國」（原與 Jean du Voyage、Blackfish 撞「國製作人」×4，且「的製作人」命中 a 組 Anthony Naples hook）。剩「國製作人」×2（Jean du Voyage、Blackfish），兩張皆為 note 引號指定領句，未動。「日」後一字全照 24654／24659（公、透、，、以、推、自、問、由、發、面；其餘五張只寫到年月）。
- **24668** 自掃（han() 4-gram，本檔＋out-1 合掃）：3 次以上 0；2 次只剩樂器名「薩克斯風」與上條「國製作人」。途中拆掉：「首約分鐘」×5、「長約分鐘」×3、「唱片年月日」、「年月日推出」、「製作人年」、「做電子音樂」、「年代中期」、「器與鼓機」、「吉他貝斯與」、「年月發行」；與 out-1 New Law 撞「由與組成」，High Tides 改「成員是」。hook 對本檔正文 4-gram 0。
- **24669** 內容處理：媒體名 0（Emapea 寫「樂評」、LAL 不帶任何媒體）；「據說／據傳」0；平台名 0；研究稿鼓型判定與預估座標 0（Romare 骨架「鼓型逐曲切換」正文寫成「鼓的打法逐曲切換」）。否定句：Emapea「算不上只是 beat tape」改正面「份量超出一份 beat tape」。Evil Needle、Brock Berrigan 的 hook 代稱第二句具名；Zero Cult 第二句以「廠牌稱」外人之口領句（照 note），末曲以「被點名的是〈Hit and Run〉」具名、不重說「最後一首」。
- **24670** 腳本：`qa-batch out add-20261106-ml77` 全部通過 ✓（31 張與卡單相符、thin 11 張 ≤180）；`qa-check-research`（writer-2 input／out-2）標記 0；`fix-spacing` 待補 0（只報未寫）。輔助腳本：scratchpad `wr-ml77-2/ml77-2-draft.mjs`、`ml77-2-scan.mjs`。

## 主線審稿（24671；2026-11-06）
- **24671** 逐張審 31 張（全文印出，逐句對研究稿 a–e；抽核 BALTHVS 波哥大郊外鄉間屋與 Cubensis Records（Riff Magazine）、Dr. Toast 為 False Profit 長期成員（Last.fm wiki；ml73 研究稿當時查無的是「False Profit Records 廠牌」，與本句不同）、Robot Koch 1977 年生於卡塞爾（維基）、Evil Needle 的 HW&W Recordings（Bandcamp）、Blackfish 生平（Discogs），皆有出處）。改 1 張 1 處（`desc-override.json`），只動語序，研究／hooks／input 不需同步：
  - `Blackfish|Pole Navigation`：「1999 年成立 Blackfish 這個名號。之後他轉向 trip-hop，到了 90 年代中段又把 drum'n'bass 混了進來。」→「後來轉向 trip-hop，90 年代中段又把 drum'n'bass 混了進來，1999 年才成立 Blackfish 這個名號。」（原句時序倒置：1999 之後不可能再回到 90 年代中段）。
- 媒體名、榜單名次、「據說／據傳」全批 0。Era「賣出超過 600 萬張」是整個計畫的銷量（研究稿出自維基），照留。

## 主線試聽／封面／三軸（不佔條號；2026-11-06）
- 試聽：自動配對＋override 8（Apple 搜尋落空改走藝人頁 lookup 6；LAL §1 人工身分取 Apple ca 1365618209；Era 的 1996 原版不在 Apple，取 2002 Mercury 版《Era I》的〈Ameno〉，us 商店 lookup 回空改 fr）→ ready 31；`popular-preview manifest` 換成最紅那首 25 張。
- 封面：CAA release-group front 28；Dr. Toast（CAA 404）用 Apple 452858981 官方封面（apple-verified-collection），Blackfish（CAA 404）與 LAL（§1）用 Bandcamp og:image。全批 HTTP 200，主線縮圖表目視與盤名相符。
- 三軸：機器基線；Era《Era》為計畫首張與〈Ameno〉所在，經典度上調 4（`ratings-override.json`）。頂點 0。

## 上線（2026-11-06，主線）（條號 24672）
- **24672**：上線 31 張：card_catalog 31／31、KV 31 鍵回讀逐字一致（stamp 20261106ml77）、seed +31、prepare／published gate 0 error。藝人介紹 ar-d-810（寫 21、不寫 Dr. Toast）同 PR 上線。

## 評分與落格（2026-11-06，主線）（條號 24673）
- **24673**：Opus 1 支打 31 張（`batch-progress/mood-axes/score-ml77/`），主線看過未改值；priors／scale／card-moods、類型樹、抽卡封面同 ml76 重建；`warm-batch` 31/31 有標籤。
- **落恍惚 20/31（65%）**；其他格 11：沸騰 4（Era、BALTHVS《Cause & Effect》、Glen Porter、Romare，皆 x 3.0 貼線——中速歌曲律動或局部 4/4）、頹靡 5（Robot Koch、Anthony Naples、Move 78、Błoto、LAL 判冷）、雀躍 1（Star Parks 判輕）、平靜 1（Ochre）。
