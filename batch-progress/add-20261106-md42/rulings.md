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
