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

## 研究 d 組（8 張；條號區間 23671–23680）
- 23671：聲音證據法——Bandcamp 官方說明加 Bandcamp 試聽片段（mp3-128）每張 3 首的粗略頻譜／自相關分析（150Hz 以下占比、4kHz 以上占比、質心、拍點 BPM），結果只寫 notes，不進 facts。UA 一律 `dip-vinyl-shop/1.0 (+https://dipvinyl.tw)`。
- 23672：AndyFellaz《BeatBop Street》moodGuess 強烈存疑建議汰換——廠牌文案 funky swing／acid jazz／cosmic salsa／Latin montunos，打擊樂是主角、拍子推進、高頻較亮，偏躁輕而非恍惚。
- 23673：Chasms《Glimpse of Heaven》、Chewing《Pacific Ocean Blue》z 存疑——樂評與自述偏冷暗（goth gloom、darker and ambient），非暖；x、y 成立可留。Horizon Fire（synthwave 偏冷）、Purrple Cat（y 厚度）、Oblique Occasions（z）亦列存疑，詳各卡 notes。最符合恍惚格：Macroblank《Tales of the Cypher》（低頻占比全批最高）、Krusseldorf《Cloud Songs》。
- 23674：年份——Chewing 取 MB 首發 2018（黑膠 Turntable Kitchen；Bandcamp 數位版 2020-02-24 是同 RG 另一 release）；Macroblank 依主線取 2021（MB 2021-12-12，Bandcamp 2022-01-07）；AndyFellaz Bandcamp 03-24 對 MB 04-17，皆 2017。Chewing 是對 Dennis Wilson 原作的整張翻唱，寫作層須寫清楚。
- 23675：廠牌可補——Chasms＝Felte、AndyFellaz＝Cold Busted（MB release）；Krusseldorf／Purrple Cat／Horizon Fire 自行發行維持空白或自發；Oblique Occasions 另有 Aloe City Wrld 2023-11-02 release，首發自行發行。
- 23676：status——Oblique Occasions、Horizon Fire、Purrple Cat、Macroblank 為 thin（Bandcamp 無說明或署名，WebSearch 僅用 3 次：Chasms 有效、Oblique Occasions 無結果、Chewing 有效）。Cold Busted 維基頁 404 未採。未推翻策展層的盤名／年份／掛名。

## 主線研究汰換（不佔條號；2026-11-06）
研究層交件後照各組「moodGuess 存疑」汰 20 → 剩 16；被汰卡移到 `dropped-cards.json`／`dropped-research.json`。不補位（卡單即策展結果）。
- 能量（拍子推進、舞池）11：crushed《no scope》（breakbeat／dnb／big beat、壓縮重）、Lipphead《In the Nude》（driving electro funk）、Degiheugi《Bagatelle》（陽光取樣、ragga 客座、偏亮偏動）、Eivør《Enn》（真鼓、交響編制、低吼人聲）、The Orb《Prism》（drum & bass、硬科技舞曲）、The Orb《Buddhist Hipsters》（reggae skank、dnb、deep house 段）、Banco de Gaia《Apollo》（relentless rhythm、dancefloor rousing）、Fieh《III》（八人放克編制、輕快）、AndyFellaz《BeatBop Street》（funky swing、Latin montunos）、Shinji《In Colour》（取樣鼓 break＋放克貝斯）、The Bilinda Butchers《Night and Blur》（house／dnb 節奏主軸）。
- 判輕 6：City Girl（乾淨 Strat／P-bass、明亮 lo-fi）、Dj CUTMAN《Free to Stream》（chiptune、2.5 分鐘短曲、零樂評）、Hello Meteor 兩張（ambient／new age focus、冬天意象、無重的證據）、Horizon Fire《Earthlight》（retrowave、質心偏高）、Daily Bread《On The Daily》（glitch／藍調電子／Moog 獨奏雜燴，不是慢糊）。
- 判冷 2：Chasms《Glimpse of Heaven》（goth gloom、post-punk）、Chewing《Pacific Ocean Blue》（整張翻唱 Dennis Wilson、自述 darker）。
- 混音混入 1：Bluetech《Rainforest Reverberation》（13 軌含 4 首他人混音、edm／psychill）。
- 留下但聲音待評分驗證：Brock Berrigan、Sweeps、Blockhead、HashFinger（boom-bap 鼓骨架，ml16 jazz-rap 先例落恍惚）、Mounika.（鼓機明確）、Martin Brugger（「(upbeat) Downbeat」）、Purrple Cat（短 beat tape，池中同人 8 張皆落恍惚）、Kuba（dub 鼓貝斯，x 貼邊）、Oblique Occasions（資料極薄）。
- 照研究補卡單 label：HashFinger＝Headcount Records、Martin Brugger＝Squama、Dr. Dundiff＝Cold Busted、Kuba＝Liquid Sound Design。

## 鉤子層（a–e）（23691–23700）
- **23691** 交件：`desc-tools/batches/hooks/add-20261106-ml70-hooks-{a,b,c,d,e}.json`（4／4／2／4／2＝16），key 逐字照主線汰換後研究稿、順序不變、欄位只有 key／hook／note。一人做全五組。公式照派工寫死版：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin 8 張（Brock Berrigan、Sweeps、Blockhead、HashFinger、L'Orange、Oblique Occasions、Purrple Cat、Macroblank）上限 170，其餘 full 230。逐筆（hook 原始／加權／預算）：a：Desert Dwellers 20／20／221；Brock Berrigan 22／22／147；Mounika. 27／24／210；Sweeps 22／22／165。b：Blockhead 25／20.5／168；HashFinger 19／19／161；L'Orange 24／22／168；Martin Brugger 21／21／228。c：Dr. Dundiff 23／23／227；Poldoore 22／22／209。d：Krusseldorf 27／24.5／221；Oblique Occasions 29／20.5／154；Purrple Cat 24／20.5／158；Macroblank 20／20／163。e：Bluetech 25／25／224；Kuba 30／22.5／222。
- **23692** 初稿 15 張超標（最高 Kuba 343），整格捨去：Desert Dwellers 的 Craig Kohland 共同製作、1998 Moontribe 相識與快速舞曲前史、多數 5–9 分鐘；Brock 的最長曲；Sweeps 的 28 秒短曲；Blockhead 的曲長；HashFinger 的 HC042；L'Orange 的 MPC／黑膠與 2023 再版；Brugger 的 Dave Smith 全名、九首曲長、180 克黑膠附件；Dundiff 的 Pink Siifu、15 軌、MPC 與 40 個企劃；Poldoore 的兩位補奏樂手、曲數；Krusseldorf 的 Atrium Carceri、一人包辦、曲數；Oblique 的曲長；Purrple Cat 的標籤與曲長；Macroblank 的 HAB105 與總長；Bluetech 的五首單曲、Lisa Bella Donna、本名 Kudryavka；Kuba 的 Michele Adamson、曲長。媒體（Echoes 選片、Scratched Vinyl 評分）與研究稿 notes 的自量頻譜／BPM 0 進 note。壓完回核：hook 依賴的事實都在 g1／g2 或只在 hook 本身（Brock 的沙漠露營／爬峽谷、Purrple Cat 的〈Undertow〉3 分 24 秒、Oblique 的 I keep it oblique 只在 hook，皆研究稿有 src）。
- **23693** 骨架歸屬（16 張 16 條，只在擁有者 note 寫歸屬句）：Desert Dwellers＝功能配樂系列的最末輯；Brock Berrigan＝十個月漫遊找靈感；Mounika.＝取樣派轉向自己作曲錄音（播放清單／日記）；Sweeps＝簡介虛構的世界觀（水下文明檔案）；Blockhead＝隔離期直播現做；HashFinger＝巡演沿途蒐集採樣；L'Orange＝與前作 EP 一體兩面；Martin Brugger＝空白原聲帶、他人回寄聯想成封面曲名；Dr. Dundiff＝盤名題旨自述；Poldoore＝家庭類比錄音室一年；Krusseldorf＝暗氛圍廠牌主理人的另一名號＋12 年舊錄音統整；Oblique Occasions＝匿名一句話＋首發後廠牌再發；Purrple Cat＝海與風暴主題的短曲 beat tape；Macroblank＝卡帶小廠牌＋日文失戀曲名；Bluetech＝續集改寫成哀悼（萊卡）；Kuba＝跨傳統客座陣容（卡瓦力世家＋Youth／Gaudi）。「自行發行」只留 Krusseldorf 一處，其餘改「以本名自發」「放上 Bandcamp」「以自己的頁面發行」「自家發行」。
- **23694** hook 四型：懸疑（Sweeps、Martin Brugger、Oblique Occasions）／斷言（Desert Dwellers、Mounika.、L'Orange、Dr. Dundiff、Purrple Cat）／場景（Brock Berrigan、Blockhead、HashFinger、Poldoore、Macroblank）／人物定調（Krusseldorf、Bluetech、Kuba）。開頭兩句交代身分或樂種：16 張第二句全部指派身分＋樂種或居地。
- **23695** 第二句句型配表（16 種）＝「他／她」引入法配表（本批無同藝人跨卡）：Desert Dwellers＝組成者＋樂種「…組成的 yoga dub 二人組」；Brock＝名字＋「住在紐約，做器樂 beat」；Mounika.＝地名＋身分＋名「法國圖爾的製作人」；Sweeps＝樂種領句「做 boom-bap beat tape 的 Sweeps，據點在洛杉磯」；Blockhead＝本名領句＋製作關係（Aesop Rock）；HashFinger＝「來自英格蘭的布拉福」；L'Orange＝「在北卡羅來納州做嘻哈，本名…」；Brugger＝「是慕尼黑製作人，也是 Squama 共同創辦人」；Dundiff＝廠牌之口「Cold Busted 在…替…發行」；Poldoore＝序數「這是…的第五張錄音室專輯」；Krusseldorf＝生年與出生地；Oblique＝「這個計畫做的是…」；Purrple Cat＝日期領句（避開池中 8 張舊卡已用的匿名／玩笑話／國別／作品量／標籤／命名習慣／標語／封面自製）；Macroblank＝器物（封面自己設計）；Bluetech＝「Evan Bartholomew 用 Bluetech 這個名字做 downtempo」（避開 ml50 舊卡的西雅圖基地）；Kuba＝「出身英國劍橋，本名…」。
- **23696** 日期「日」後一字逐張配死（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：Mounika. 日發、Sweeps 日以、L'Orange 日全、Brugger 日推、Dundiff 日替、Poldoore 日上、Krusseldorf 日自、Oblique 日首、Purrple Cat 日，、Bluetech 日交、Kuba 日在；Desert Dwellers、Blockhead、HashFinger 只到月，Brock 只到年，Macroblank 只到年（研究稿：MB 與 Bandcamp 差三週，避開月日）。分數 0、榜位 0、媒體名 0。
- **23697** 自查：hook 開頭前四字 16 張互異，對全 hooks 目錄亦互異（初稿「簡介只有」撞 sf06、「巴爾的摩」撞 ml2，已改）。本批 hook 之間中文 4-gram 0；hook 對全批 note 0；hook 對自己 note 6 字以上逐字只剩人名 Youth。對他批 hook 的高頻殘片已改字：「的錄音室」×37、「進同一張」×6、「只有一句」×9、「的小廠牌」×3、「了最後一」×2、「類比器材」×2；剩「巴爾的摩」×2（地名）。note 間 3 張以上 4-gram 0。Oblique hook 引句原有半形句點，改全形。腳本：`node qa-batch.mjs hooks add-20261106-ml70` 全部通過 ✓；`node chk-hook-crossgroup.mjs add-20261106-ml70` 全部通過 ✓（5 組 16 張，hook 加權 19–25，note 151–234）。輔助腳本：scratchpad `hook-ml70/ml70h-draft.mjs`、`ml70h-measure.mjs`。
