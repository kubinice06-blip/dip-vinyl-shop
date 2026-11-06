# add-20261106-ml70 裁定（情緒薄格策展線・恍惚 Bandcamp downtempo 候選第一輪 C：離邊界遠的那批）

> 店主 2026-11-06：協調端從 Bandcamp downtempo 等標籤抓 1,901 張、依 Last.fm 收聽排序、便宜模型粗估落格；店主選「先做最遠的」→ 289 張分六批、三個工作階段並行（本工作階段 ml70＋md39；另兩個做 ml68＋ml69、md40＋md41）。來源與粗估見 `batch-progress/bandcamp-dt-20261105/README.md`；卡單 `pick-ml70.json`（49 張）。**卡單即策展結果**，不派策展代理；主線組 `curation-ml70.json` → `build-master.mjs ml70` → `master-ml70.json`。評分照 10-23 店主「體感標準」。目標格：**恍惚＝靜＋重＋暖**，邊距 x≤2.7、y≥0.8、z≥0.3。
> 本批卡單：`desc-tools/batches/cards/add-20261106-ml70-cards.json`（36 張；研究 a–d 各 8、e 4）。身分：MB 釘住 36。
> **預留：研究 a 23641–23650、b 23651–23660、c 23661–23670、d 23671–23680、e 23681–23690、鉤子 23691–23700、寫作 23701–23710、主線 23711–23720。**
---

## 主線策展（不佔條號；2026-11-06）
- 卡單 49 張：去重（seed、所有 manifest、`data/pool-removed.json`、所有 curation）0 撞池；撞到舊提名 2 張（見下）。卡單 moodGuess 全在邊距內，但只看標籤、把握多半 low／mid，**聲音交研究層再判**。
- MB＋Bandcamp 頁逐張回查（`ld+json` 盤名、日期、廠牌、曲數）。名稱照 MB 正規名（`L'Orange`、`Lipphead《In the Nude》`、`Kuba《Relative to the Sun》`、`Macroblank` 等）；年份照 MB first-release-date（Macroblank 2021、Chewing 2018）。
- **主線汰 13**：
  - 合輯：Chillhop Music《Chillhop Essentials Winter 2022》《Fall 2023》（廠牌季度合輯，MB Compilation）、Sounds From the Ground《Thru the Ages》（MB Album＋Compilation）、Banco de Gaia《Songs From the Silk Road》（MB Album＋Compilation）、Bluetech《Elementary Particles + Prima Materia》（兩張舊作合編，MB Compilation）、SmokedBeat《The Jazz Jousters Sessions #1》（MB 查無、系列編號的合作 session）。
  - 原聲帶：Funk Fiction《Epitasis》（MB Album＋Soundtrack，Bandcamp 標 ost／video game）。
  - EP：SwuM.《Runway》（MB EP）。
  - 自我同名（ALBUM_ONBOARDING 去重第四道）：a.s.o.《a.s.o.》、Black Chamber《Black Chamber》、Mo Kolours《Mo Kolours》。
  - 先例已汰：SwuM.《スモーク》（ml42 研究：trap 化、開大聲衝擊）、sleepy fish《Like the Sky, or Something Else》（ml42 研究：melancholic and energized、上揚節拍）。
- AndyFellaz《BeatBop Street》MB release-group 沒標 primary type（唯一 release 為 14 軌 CD、45 分鐘），視同 Album 釘 rgMbid。
- 同藝人：The Orb 兩張（池中已 8 張）、Bluetech 兩張、Hello Meteor 兩張；其餘一人一張。

## 研究 c 組（8 張；條號區間 23661–23670）
- 23661：c 組以 Bandcamp 專輯頁（ld+json 簡介、credits、曲目長度）＋MB release-group＋可得樂評交叉；WebSearch 用 3 次（Hello Meteor、Bluetech、Daily Bread）。MB 與 Wikipedia 連線偶發被重置，MB 只取到 4 張的 release 資訊，廠牌欄一律查無，不寫。
- 23662：moodGuess 存疑強（建議汰換）：Fieh《III》（官方稱放克、輕快、更硬）、The Orb《Prism》（樂評明指 drum & bass、硬科技、銳舞）。存疑輕（傾向判輕或把握低）：Bluetech（有節拍的 psychill，曲名 Funk／Mambo）、Dj CUTMAN（短曲、chiptune／遊戲音樂標籤）、Hello Meteor（ambient／new age，無鼓證據）、Daily Bread（曲風跨度大）。貼目標格：Poldoore《Soft Focus》（暖、塵封、磁帶延遲）、Dr. Dundiff《The Distance》（暖鬆，但鼓清脆）。
- 23663：未推翻年份、盤名、身分；Bluetech Bandcamp 6/15 與 MB 6/4 差異，年份不變。

## 研究 b 組（23651–23660）

- **23651**：Bandcamp 簡介是本組聲音事實的主要來源（MB 與維基對聲音幾乎沒寫）；WebSearch 3 次用盡（L'Orange、Bilinda Butchers、HashFinger），只找到訪談與店家文案，無樂評。聲音欄誠實標明「簡介自述」，鼓力度、低頻厚度、冷暖大多未驗證，8 張中 5 張 status thin。
- **23652**：Bilinda Butchers《Night and Blur》moodGuess 存疑（簡介直言 house／drum and bass／trip hop，拍子是主軸）。The Orb《Buddhist Hipsters》強存疑（reggae skank、D&B、hip hop、deep house，只有末兩首靜）。Banco de Gaia《Apollo》強存疑（relentless rhythm、舞池，低頻厚、暖成立）。City Girl 強存疑（乾淨吉他、貝斯、鍵盤，偏輕）。Blockhead、HashFinger 中度存疑（beat tape／boom-bap，鼓是骨架）。Martin Brugger 弱存疑（偏輕盈）。L'Orange 大致可信。
- **23653**：Blockhead《Quar and Peace》Wikipedia 列 compilation，MB／Bandcamp 皆為專輯，維持專輯（Bandcamp 簡介稱 beats 專輯）；發行日 Bandcamp 7-17、MB 7-19，年份 2020 無誤。
- **23654**：L'Orange《Old Soul》Bandcamp 頁轉址循環讀不到，曲目與 2011 原廠牌缺（keyTracks 空）；Mello Music Group 是後來簽的，勿當原廠牌。
- **23655**：Banco de Gaia《Apollo》廠牌 Disco Gecko Recordings 依維基（單一來源）；Orb 的 Wikipedia 時長 77:45 與 Bandcamp 加總 77:37 差 8 秒，寫約 77 分鐘。
- **23656**：卡單 label 欄皆空；Bandcamp 顯示 Bilinda Butchers、Blockhead、City Girl、The Orb（Cooking Vinyl 依維基）為自行發行／標示，HashFinger 為 Headcount Records HC042，Brugger 為 Squama。

## 研究 e 組
- **23681**：Hello Meteor《Cordial Bizarre》找不到任何樂評，status thin；聲音只有 Bandcamp 標籤與頻譜粗估（低頻厚、高頻少、起伏大），有無鼓與冷暖未能確認，簡介寫冬天意象與卡單暖 z 相反。moodGuess 存疑，需實聽。
- **23682**：Shinji《In Colour》moodGuess 存疑：取樣鼓 break＋放克貝斯的 beat tape，有拍子推進，x 不宜 ≤2.7；建議主線汰換或備取。
- **23683**：Bluetech《Spacehop Chronicles 2》大致符合恍惚：慢半拍 downtempo、多首近無鼓、厚合成器低頻、悲傷冥想主題；暖度邊界偏弱。
- **23684**：Kuba《Relative to the Sun》dub 雷鬼鼓與貝斯在走（非氛圍）、低頻厚殘響多、音色暖；x 在邊界，需實聽確認。MB 10 首，Bandcamp 11 首（多一條專輯預告），廠牌以版權行 Liquid Sound Design 為準。
- **23685**：四張的節奏／頻譜判斷來自 128kbps 串流的自動量測，非人耳；速度估計有倍半誤差，只寫在 notes，不進 facts。

## 研究 a 組
- 23641：聲音證據法——Bandcamp 官方說明加 Apple 30 秒試聽片段粗略頻譜（150Hz 以下占比、4kHz 以上占比、響度、動態、自相關估速）寫在各卡 notes，不進 facts（非可引來源）；僅作輔助判斷，非實聽。
- 23642：moodGuess 強烈存疑建議汰換——crushed《no scope》（breakbeat／drum'n'bass／big beat，壓縮響亮）、Lipphead《In the Nude》（driving electro funk，玩鬧律動）。
- 23643：存疑但可留——Degiheugi《Bagatelle》（陽光取樣、ragga／饒舌客座，偏亮偏動，建議降級）、Eivør《Enn》（重暖成立、靜偏弱）、Brock Berrigan／Sweeps／Mounika.（boom-bap 有鼓持續推進，暗暖厚符合，靜偏弱）。Desert Dwellers 大致成立。
- 23644：Brock Berrigan、Sweeps 僅 Bandcamp 單頁，status thin。MB 抓取多次連線被重置，身分以卡單 mbNote 已核對的 rgMbid 為準。
