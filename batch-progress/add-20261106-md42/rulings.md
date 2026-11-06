# add-20261106-md42 裁定（情緒薄格策展線・頹靡 Bandcamp downtempo 候選第二輪）

> 店主 2026-11-06「繼續」：第一輪（ml68–70、md39–41）後，剩下靠近邊界的 612 張先照第一輪教訓過濾掉舞池節拍標籤等 → 232 張，切成 ml71／ml72／ml73、md42／md43，三個工作階段並行（本工作階段 ml73＋md42；另兩個做 ml71＋ml72、md43）。來源見 `batch-progress/bandcamp-dt-20261105/README.md`；卡單 `pick-md42.json`（39 張）。**卡單即策展結果**，不派策展代理；主線組 `curation-md42.json` → `build-master.mjs md42` → `master-md42.json` → 卡單。評分照 10-23 店主「體感標準」。目標格：**頹靡＝靜＋重＋冷，邊距 x≤2.7、y≥0.8、z≤−0.3**。
> 本批卡單：`desc-tools/batches/cards/add-20261106-md42-cards.json`（23 張；研究 a 5、b 5、c 5、d 5、e 3）。身分：MB 釘住 23、§1 人工 0。
> **預留：研究 a 24201–24210、b 24211–24220、c 24221–24230、d 24231–24240、e 24241–24250、鉤子 24251–24260、寫作 24261–24270、主線 24271–24280。**
---

## 主線策展（不佔條號；2026-11-06）
- 卡單 39 張：去重（`dupchk.mjs`：seed、所有 manifest、`data/pool-removed.json`、所有 curation）撞池 0；撞到舊提名 0。卡單 moodGuess 是只看 Bandcamp 標籤的粗估、多半 low／mid 把握、而且本輪靠近邊界，**聲音交研究層判**。
- 同藝人上限：並行三個工作階段的卡單（ml71／ml72／md43）與第一輪卡單一起查同藝人，凡池中已 ≥2 張或並行卡單另有 ≥2 張者，本線最多收一張；同一位藝人在 ml73 與 md42 兩批也合計不超過兩張。
- MB 逐張回查（search → release-group → releases 的曲數、日期、廠牌）＋ Bandcamp 頁 `ld+json`（Bandcamp 自訂網域的 9 張頁面被網路政策擋，交研究層用 WebFetch 補）。名稱照 MB 正規名（christ.；blue shift emissions→Christ.《Blue Shift Emissions》、AES DANA→AES Dana《Perimeters》、CONNECT.OHM→Connect.Ohm《9980》、MIKTEK→Miktek《Elsewhere》、Electronique Noire→Eivind Aarset《Électronique noire》、CELL→Cell《Onwards System》、STRANGE ATTRACTOR→Strange Attractor《Everything Is Closer》）；池中已有的藝人照池中寫法。年份照 MB first-release-date（Connect.Ohm《9980》2012、Eivind Aarset《Électronique noire》1998）。
- **主線汰 16**：
  - Frakkur《2000 - 2004》：年份合集（24 軌 109 分，2000–2004 作品整理）
  - emptyself《Emptyself》：自我同名（ALBUM_ONBOARDING 去重第四道）
  - The Secret Meeting《Ultrashiver》：粗估 x 2.8 出邊距、工業 trip-hop 重拍
  - ACT NOIR《Automatisme Psychique》：粗估 x 2.8 出邊距、冷鼓推進
  - Filmmaker《Grim Encoders》：粗估 x 2.8 出邊距、機械拍
  - AES DANA《(a) period.》：同人超量：AES DANA 本工作階段收《Leylines》《Perimeters》兩張
  - Ascendant《Source Transmission》：同人超量：池中 1，本線收《Æthereal Code》《Particle Horizon》兩張
  - Ascendant《Meridian [EX]》：池中《Meridian》的擴充版，重複
  - christ.《distance lends enchantment to the view》：同人超量：池中 1，本線收《blue shift emissions》一張
  - Nym《Edge City》：同人超量：本工作階段收 ml73《Lilac Chaser》，並行三批另有 5 張
  - State Azure《Outlines》：同人超量：池中 2、並行 4，本線只收《Stellar Descent》
  - Kaya Project《Defiance》：同人超量＋先例：池中 3 張全判暖落恍惚
  - All India Radio《Tranquil Motion》：同人超量：並行 md43 3 張、第一輪 md39／md40 7 張；144 分鐘長度可疑
  - 36《Threewave》：30 軌 104 分鐘，Threewave 系列合編，非單張專輯
  - Era《Era 2》：Era 是 Gregorian 合唱＋搖滾鼓與舞曲拍的史詩 new age 流行，旋律明確（判暖判躁），不合頹靡
  - MIKTEK《Hereafter》：同人超量：Miktek 本線只收《Elsewhere》

## 研究 e 組
- 24241：Nadia Struiwigh《Lenticular》moodGuess 存疑（高）。RA 樂評：溫暖輕盈、旋律為核心、有鼓的 techno（末曲硬派 techno），方向偏暖偏輕偏躁，不合頹靡，建議汰換。status thin（Bandcamp 頁被擋，曲長未取得）。
- 24242：State Azure《Stellar Descent》聲音未能實聽；長篇太空氛圍、同作者長篇描述為冷而憂、無鼓；〈Heliopulse〉等曲名與 downtempo 標籤暗示可能有柔和脈動，存疑（中低）。105 分、16 軌與卡單一致。藝人本名單一來源未寫入。status thin。
- 24243：Strange Attractor《Everything Is Closer》為合輯（兩張 LP《Rorschach》2004＋《Rorschach II》2005 合編，Bandcamp 說明為證），年份 2006 是合編年。moodGuess 存疑（高）：broken beat／New Jazz、有人聲與 Rhodes／單簧管，偏躁偏暖爵士，頹靡把握低。主線請裁定去留。

## 研究 d 組
- 24231：ASKII《Isverden: Spirits》身分 MB cdd8976f＋Bandcamp 吻合；32:21 的 Full Audio 長曲與分曲重複。聲音無音檔、只憑標籤與簡介，判靜、無鼓；moodGuess 存疑：z 恐不足 −0.3（冷是意象，音色偏電影式溫順）。
- 24232：Phaeleh《Dark Sky》曲子錄於 2015–2019、2025 才發；Bandcamp 不標廠牌，Undertow 來自維基。聽眾比對 Bukem／Tycho，有節拍與清楚旋律；moodGuess 存疑：z 偏暖、x 可能 >2.7（方向＝恍惚或中間格）。
- 24233：James Murray《Weeds》無鼓生成式氛圍，Igloo 評論稱帶暖意、happy-sad；Bandcamp 日期 09-11 與 MB 09-27 不同，寫作只寫 2024 年 9 月。moodGuess 存疑：z 偏中性略暖、y 或偏低（方向＝靜但落恍惚／中間）。
- 24234：Ascendant《Particle Horizon》SYN10，十首 73:40 全在 6–8.6 分；modular／dark ambient 冷色，大致符合 moodGuess；唯一疑慮是 Berlin School 式音序脈動可能推高 x，無音檔未能驗證。
- 24235：Zane Alexander《Midrealm》證據薄（status thin）；acoustic＋synth＋trip-hop／dreampunk，是否有拍子不明；moodGuess 存疑：x 可能到 2.6–3、z 或不夠冷，建議主線優先考慮汰換。
- 推翻策展層 0 處。

## 研究 b 組（24211–24215）
- 24211 Antimatter《The Judas Table》：身分無誤（MB 2015-10-09、Prophecy）。聲音是有鼓組的暗色搖滾（Liam Edwards），含較重金屬式吉他；moodGuess 存疑（x 偏高、z 偏暖），建議汰換候補。status full。
- 24212 Connect.Ohm《9980》：首發 2012，Bandcamp 2018 為重製版（曲目為重製版九首）。聲音含蓄 downtempo＋drone，靜成立；冷暖偏中性略暖，z 邊界。Koizumi 國籍未驗不寫。status full。
- 24213 Miktek《Elsewhere》：Bandcamp 12 首＋73 分鐘連續混音（148 分即此）。cold wave 根、慢、深低頻，大致符合；有精緻節奏。status full。
- 24214 Ascendant《Æthereal Code》：Synphaera SYN01，Source Trilogy 第二張。dark ambient／Berlin school，但聽眾稱溫暖、有輕拍；moodGuess 存疑（z 可能偏中性）。創辦人人名單一來源，不寫。status full。
- 24215 1000 Eyes《Duality》：卡單廠牌 Rabbithole Club 無法證實（Bandcamp publisher 為本人）；聲音資料極薄，短曲 trip hop 拼貼，y 恐偏高；moodGuess 存疑，建議聽過再定或汰換。status thin。

## 研究 c 組
- 24221：Eivind Aarset《Électronique noire》身分 OK（MB 1998-05-10）；Bandcamp 2017 為再上架且曲序／曲名與維基不同，廠牌 Bandcamp 簡介稱 Jazzland、維基列 EmArcy，不寫死廠牌。9 首裡 7 首有真鼓（Ofstad／Engen）；moodGuess 存疑：x 1.9 偏低，有鼓與貝斯推進，可能 2.5–3.0 擦邊距（方向：偏躁）。
- 24222：Hong Kong Express《This》AS032、2015-08-18；無樂評、Discogs 403，聲音僅憑標籤與聽眾留言（status thin，把握 low）。moodGuess 存疑：vaporwave／dream music 慣用糊濾波，聽眾稱「天堂、平靜」，方向偏暖（可能落恍惚）。
- 24223：Scandinavian Star《SOLAS》Posh Isolation 214，題材為 1990 年渡輪大火；曲名對船史是我的推對應（非來源明說）。moodGuess 存疑：簡介明說部分曲目四拍底鼓＋踉蹌節奏、拼貼曲短（偏躁），情感偏「心碎、優雅」（偏暖）。建議主線備汰。
- 24224：Locust《Spectral+》2026-09-11、TODO Records；curatorRisk 的「舊作《Spectral》擴充」查無，+ 是正式盤名。moodGuess 存疑（強）：歌曲取向、客座人聲、backbeat 與心跳脈動、shoegaze 流行（方向：偏躁、偏暖），建議汰換。
- 24225：Cell《Onwards System》Ultimae inre107，身分 OK；克制慢拍＋深沉底鼓＋冷色墊層，大致符合 moodGuess；y 存疑：樂評強調「酥脆、清晰」質地而非霧與低頻淹沒（方向：偏輕、可能 y<0.8）。
- 推翻策展層 0 處（Locust 的「舊作擴充」疑點查無，為澄清非推翻）；卡單 label 空的 Locust 可補 TODO Records。

## 研究 a 組（5 張：Funki Porcini《Fast Asleep》、Melanie De Biasio《Lilies》、Christ.《Blue Shift Emissions》、AES Dana《Perimeters》、Hysterical Love Project《Lashes》）
- **24201**：全 5 張 MB 釘住，身分、年份、廠牌皆未推翻。Funki Porcini 年份兩源皆 2002（MB 7/29、Bandcamp 10/07），寫年不寫日。
- **24202**：AES Dana《Perimeters》curatorRisk 的 153 分鐘已查明＝11 首單曲約 79 分＋一條 74 分 08 秒〈Perimeters (Full Mix)〉；寫作層寫「11 首約 79 分（另附連續混音）」，不寫全長 153 分。
- **24203**：moodGuess 存疑五張都記在 notes：AES Dana x 偏低（trance／prog-psy 脈動，偏躁）；Christ. x 偏低且 z 可能偏暖（破碎節拍、BoC 系旋律）；Hysterical Love Project z 偏暖（dream pop 殘響，易落恍惚）；Funki Porcini y／z 在邊界（B3 放克小品偏輕偏暖）；Melanie De Biasio y 靠邊（偏輕）。
- **24204**：Christ.《Blue Shift Emissions》與 Hysterical Love Project《Lashes》標 thin（缺專業樂評，聲音描述來自廠牌與買家留言，facts 已標「非專業樂評」）；寫作層勿猜團員背景。

## 主線研究汰換（不佔條號；2026-11-06）
研究層交件後照各組「moodGuess 存疑」汰 15 → 剩 8；被汰卡移到 `dropped-cards.json`／`dropped-research.json`。**不補位**（卡單即策展結果）。分類：有拍推進 7、身分／版本 1、判暖 4、無聲音來源 2、判輕 1（一張多項時歸第一項）。
- Nadia Struiwigh《Lenticular》：有拍推進＋判暖判輕：RA 樂評溫暖輕盈、旋律核心、有鼓 techno（末曲硬派 techno）
- Strange Attractor《Everything Is Closer》：合輯（《Rorschach》2004＋《Rorschach II》2005 合編）＋broken beat／人聲／Rhodes 偏躁偏暖
- Phaeleh《Dark Sky》：判暖＋有拍：鬆拍、旋律清楚，聽眾比對 L.T.J. Bukem／Tycho（研究 d）
- James Murray《Weeds》：判暖：Igloo 評論稱帶暖意、happy-sad，z 中性略暖（研究 d）
- Zane Alexander《Midrealm》：資料最薄＋x 2.6–3、z 不夠冷（trip-hop 標籤，拍子不明）（研究 d）
- Antimatter《The Judas Table》：有拍推進＋判暖：完整鼓組暗色搖滾、金屬式吉他段（研究 b）
- 1000 Eyes《Duality》：資料極薄＋有鼓判輕：15 首短曲、trip hop／hip-hop 標籤，廠牌無法證實（研究 b）
- Connect.Ohm《9980》：z 貼邊偏暖：含蓄 downtempo＋drone，冷暖中性略暖（研究 b）
- Eivind Aarset《Électronique noire》：有拍推進：9 首 7 首真鼓＋貝斯，「強勁陰鬱的電子律動」（研究 c）
- Hong Kong Express《This》：判暖：vaporwave／dream music，聽眾稱天堂、平靜（研究 c）
- Scandinavian Star《SOLAS》：有拍推進＋判暖：部分曲目四拍底鼓、踉蹌節奏，心碎優雅（研究 c）
- Locust《Spectral+》：有拍推進＋判暖：歌曲取向、客座人聲含 rap、backbeat、shoegaze 流行（研究 c）
- AES Dana《Perimeters》：有拍推進：兩家評論稱 trance／prog-psy 明快脈動，x 2.6–3.2（研究 a）
- Christ.《Blue Shift Emissions》：有拍推進＋判暖：破碎節拍、「帶刺的鼓」，BoC 系旋律偏暖（研究 a）
- Hysterical Love Project《Lashes》：判暖：Rubadub 稱 spaced out dream pop／hazy reverb（研究 a）
- 留下（8）：Funki Porcini《Fast Asleep》、Melanie De Biasio《Lilies》、Miktek《Elsewhere》、Ascendant《Æthereal Code》、Cell《Onwards System》、ASKII《Isverden: Spirits》、Ascendant《Particle Horizon》、State Azure《Stellar Descent》。其中聲音仍貼邊、交評分層判的：Melanie De Biasio（y 靠邊）、Funki Porcini（y／z 邊界）、Cell（y 可能偏輕）、ASKII（z）、Ascendant 兩張（Berlin School 音序可能推 x、z 中性）、State Azure（thin）。

## 鉤子層（a–e，24251–24257）
- **24251** 交件：`desc-tools/batches/hooks/add-20261106-md42-hooks-{a,b,c,d,e}.json`（2／2／1／2／1＝8 張，key 與順序照主線汰換後研究稿）。預算公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`（「第二句句型…」指派句計入）。逐筆：Funki Porcini 223、Melanie De Biasio 227、Miktek 221、Æthereal Code 221、Cell 212、ASKII 224、Particle Horizon 228、State Azure 169（thin，上限 170）。hook 原始 20–29 字、加權 17.5–24.5。初稿 6 張超標，整格捨去：Miktek 早年廠牌、Æthereal 聽眾「溫暖上拍」、Cell 的 Atmospheric Studio／Villuis 母帶、ASKII 曲目首尾與「背景音／3D 影像」、Particle 的 Chris Bryant／廠牌所在地／最長曲、State Azure 的 CC 全名與〈The Roche Limit〉。壓完回核 hook 依賴：Funki 的「冬日、睏意」原落在被砍的樂評格，補回 g2；其餘皆在 g1／g2。
- **24252** 骨架歸屬（8 張 8 條）：Funki＝昏睡與放克兩頭擺（冷開場→B3 小品、B 級片取樣）；Melanie＝暗室克難自錄（約 100 歐元 SM-58）；Miktek＝cold wave／gothic 根轉慢速電子＋廠牌首張完整專輯；Æthereal Code＝自家廠牌開張作 SYN01＋三部曲中段；Cell＝隔十三年回歸個人專輯；ASKII＝系列續作、一條全長版＋八段分曲並陳；Particle Horizon＝器材調色盤（wavetable／模組／外掛）＋十首長曲；State Azure＝CC 授權自由取用＋多產。Ultimae 兩張分廠牌面向：Miktek 帶「在 Ultimae 的第一張完整專輯」，Cell 帶「在 Ultimae 待了多年」。授權只歸 State Azure（ASKII 的直播署名授權那格不指派）。
- **24253** 同藝人分軸（派工加注）：Ascendant《Æthereal Code》帶人與廠牌（Synphaera 由他們自創、SYN01、Source Trilogy 第二張；創辦人姓名照研究 b 不寫）；《Particle Horizon》帶錄音與聲音（Don Tyler 母帶、wavetable／模組合成器／外掛、曲長）。**三部曲只在 Æthereal Code 交代**，Particle 的 note 不提系列與光子概念。
- **24254** 池中舊卡避開（查 `output/` 與 `hooks/`）：Funki《Hed Phone Sex》＝漂泊生平→Ninja Tune→自宅錄音室、第二句「化名」——本張不帶生平、Italy、Uterus Goldmine，第二句改以廠牌＋年份領句。ASKII《Obscura》＝文案地城路線、第二句「是…的計畫，從 2017 年起轉做」——本張 hook 走曲目結構、不寫 2017、第二句「…出身的 ASKII 住在…」。Ascendant《Meridian》＝文案科幻設定、第二句「…名下的計畫」。State Azure《Phantoms》（「由一人」）／《Pale Light》（「以…為題」、連續混音）——本張走 CC 授權、第二句「Bandcamp 上的發行已超過 90 個」領句。日期：ASKII 原「日放」撞《Phantoms》寫作稿「日放到網上」，改「日登」。
- **24255** 第二句句型配表：Funki「Ninja Tune 在 2002 年發行」／Melanie「這是…第三張…」／Miktek「寫它的是…」／Æthereal「…由 Ascendant 自己創立」／Cell「…用 Cell 這個名字…」／ASKII「…出身的 ASKII 住在…」／Particle「…是 Ascendant 兩人之一」／State Azure「Bandcamp 上的發行已超過 90 個」。引入法：Melanie＝她（第三張錄音室專輯）；Ascendant＝他們（Æthereal 廠牌關係、Particle 身分＝母帶工程師）；Funki＝廠牌；Miktek＝生地＋本名；Cell＝本名＋化名；ASKII＝出身；State Azure＝稱「這個計畫」。hook 四型：懸疑 Melanie（note 交代收尾）；斷言 Æthereal、Cell；場景 Funki、ASKII、Particle；人物定調 Miktek、State Azure。
- **24256** 「日」後一字：Melanie 日由、Miktek 日問、Æthereal 日在、Cell 日數、ASKII 日登、Particle 日推、State Azure 日自；Funki 只寫年（兩源日期不同）。媒體名一律不進 hook／note（樂評、聽者泛稱）。Melanie note 的「沒有光、沒有暖氣」是事實內容，非校對痕跡。
- **24257** 自查：hook 間中文 4-gram 0；hook 對他張 note 0；hook 對自身 note 只剩專名／樂器殘片（悶音小號、模組合成、冰封山谷、個人專輯）；開頭前四字與 md39–41、md43、ml7x 已有 hook 不撞。`qa-batch hooks` 全部通過；`chk-hook-crossgroup` 全部通過（只報不擋 1：Melanie「沒有」，屬內容）。
