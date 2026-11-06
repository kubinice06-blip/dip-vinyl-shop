# add-20261106-ml75 裁定（情緒薄格策展線・恍惚 Bandcamp 有鼓名單第三輪）

> 店主 2026-11-06「有些要死不活的音樂也會有鼓推進」「全都上架吧」：前兩輪因「有拍推進」被汰或被標籤先篩掉的 473 張（`batch-progress/bandcamp-dt-20261105/beat-candidates.json`）切十批、五個工作階段並行；本工作階段做 ml74＋ml75。卡單 `pick-ml75.json`（48 張）即策展結果，主線組 `curation-ml75.json` → `build-master.mjs ml75` → 卡單。**照 CUR-DISPATCH「有鼓不等於躁」**：慢、拖、無力的鼓仍算靜；只有 (1) 鼓＋攻擊性、(2) 舞池推進（四拍底鼓、house／techno／breakbeat 跳舞律動、明顯中快速）才汰。**判輕、判冷不汰**（店主「全都上架」，落到其他格照實記）。目標格仍是恍惚（x≤2.7、y≥0.8、z≥0.3）。
> 本批卡單：`desc-tools/batches/cards/add-20261106-ml75-cards.json`（35 張；研究 a 7、b 7、c 7、d 6、e 8；e 組＝「研究判有鼓」沿用原批研究稿、只補不足）。身分：MB 釘住 35、§1 人工 0。
> **預留：研究 a 24441–24450、b 24451–24460、c 24461–24470、d 24471–24480、e 24481–24490、鉤子 24491–24500、寫作 24501–24510、主線 24511–24520。**
---

## 主線策展（不佔條號；2026-11-06）
- 去重（`dupchk.mjs`：seed、所有 manifest、`data/pool-removed.json`、所有 curation）撞池 0；「DUP curation-…」者皆為前兩輪被汰的同一張（本輪重審對象）或 ml11／ml47 的情緒風險汰換（非身分問題，照「全都上架」收）。
- 同藝人：與並行 ml76–81、md44–45 卡單及池中一起看；池中已 ≥9 張（Purrple Cat、Sounds From the Ground）或並行另有 ≥3 張者不收或只收一張；同一位藝人在 ml74／ml75 合計最多一張（Entheogenic 收 ml74《Dialogue of the Speakers》）。
- MB 逐張回查（release-group search → releases 的曲數、日期、廠牌）；名稱照 MB 正規名（MB 的 U+2019 撇號改 ASCII）。MB 查無的走 §1 人工身分（Discogs master／Apple collection＋Bandcamp）。
- 研究判有鼓的卡（e 組）：原批研究稿已寫鼓型的，照新規則重判——慢拍、半速、dub、trip-hop 留；文案直述 danceable、house、big beat、95 BPM 以上 uplifting、輕快放克者照「舞池推進」汰。
- **主線汰 13**：
  - Boards of Canada《Hi Scores》：非正規專輯：MB EP（6 首 33 分）
  - Purrple Cat《Distant Worlds》：同人超量：池中已 10 張
  - Entheogenic《Flight Of The Urubus》：同人超量：本工作階段收 ml74《Dialogue of the Speakers》，並行 ml78–80 另 8 張
  - Sounds From the Ground《Terra Firma》：同人超量：池中已 9 張
  - Entheogenic《Kykeon》：同上
  - Pandrezz《Sunset on Clouds》：非正規專輯：MB EP
  - Chillhop Music《Chillhop Essentials Spring 2025》：合輯：廠牌季度合輯
  - Chillhop Music《Chillhop Daydreams 3》：合輯：廠牌合輯系列
  - Lipphead《The Long Way》：舞池推進：ml69 研究稿廠牌文案 upbeat electronic funk、Discogs Electro
  - Ochre《An Eye to Windward》：同人超量：並行 ml77／ml79／md44／md45 另 5 張
  - Purrple Cat《Dino Land》：同人超量：池中已 10 張
  - Tim Love Lee《Confessions Of A Selector》：舞池推進：ml72 研究稿 Discogs 風格 Breaks／Big Beat
  - Odd Nosdam《FLIPPIES BEST TAPE》：合輯：MB Album＋Compilation（66 首 beat tape 選集）

## 研究 b 組（條號 24451–24460）
- 24451：Catching Flies《Beats & Pieces II》鼓型 3：Bandcamp 官方簡介直述 dancefloor-focused、uptempo sister，標籤 melodic house，Solomun 等 DJ 播放；建議汰：舞池推進，moodGuess 存疑（強，偏躁偏暖）。
- 24452：Free the Robots《Kaduwa》鼓型判不出（混合 1／3）：Passion of the Weiss 分出太空爵士曲與 Welcome to Los Angeles／Outta Sight 的機械舞池律動；建議汰：弱，主線自斷；卡單無廠牌，facts 不寫廠牌。
- 24453：Eat Static《Back to Earth》鼓型 1（個別曲偏 3）：評論稱 BPM 少超過 110、Interchill 稱首張純 downtempo，僅 Pearl Of Wisdom 偏 house 律動；不汰；Bandcamp 的 goa／psy trance 標籤與實際速度不合；發行日 6/22、6/24、7/11 三說並存，只寫 2008。
- 24454：Computerjockeys《Plankton》鼓型判不出：全無鼓的描述，僅有標籤（downtempo、ambient、glitch、dream pop）；不汰；status thin（聲音 facts 只有 Bandcamp 標籤與簡介）。
- 24455：Ash Walker《Astronaut》鼓型判不出偏 1（dub／trip hop 標籤，簡介含放克、雷鬼）；不汰；簡介為宣傳文案，寫作層勿直引形容詞。
- 24456：saib.《Sailing》鼓型 1（tempered boom bap、lounge）；不汰；moodGuess y 0.7 偏輕，存疑。
- 24457：Hector Plimmer《Infinity Mirrors》鼓型混合（多數 1，後段一首 footwork／D&B 與 deep house 壓軸為 3，評論未標曲名）；建議汰：弱，主線自斷；moodGuess 存疑（y 偏輕）。
- 24458：本組推翻策展層 0 處（年份、廠牌、盤名皆與 MB 一致）；全 7 張皆原創專輯，無合輯或 EP。
- 24459：WebSearch 4 次用盡（Eat Static、Free the Robots、Plimmer、saib 各一）；其餘用 Bandcamp／MB API／WebFetch。MB release-group 查詢有 3 次回空（限流），改以 release 查詢取得。

## 研究 e 組
- 沿用前輪研究稿，八張 facts 皆已 ≥8 條（9／9／9／9／10／8／10／11），未新增；key／artist／album 與卡單 group e 逐字一致。
- 每張 notes 首行加「鼓型：」。3＋建議汰＝Delerium（登 Hot Dance Club Play 第 1、第 4）；1＝Alpha（慢拍 trip-hop）；無鼓＝Helios；判不出偏2／3風險、建議抽聽＝Badlands（rave／techno 自述 vs 評論「節拍低調」衝突）、Argaman（兩首 psytrance 式律動）；判不出偏3邊緣＝Eivind Aarset（7/9 真鼓，nu-jazz 張力非四拍）；判不出＝Hibernation、Zoungla。
- Zoungla 仍 thin（Bandcamp 單源）。本次 WebSearch 共用 2 次，皆在 ml74（Liléa、Jazz Playaz）。

## 研究 d 組
- 24471　鼓型一律在 notes 以「鼓型：1／2／3／無鼓／判不出＋依據」標出；來源沒有 BPM 或四拍字眼者寫判不出（偏某型），不硬判，建議汰一欄只在有依據時寫條件式。結果：Hidden Rivers、Breezewax、Mindex 偏 1；Sephira 偏 3（藝人自述 4/4 beat，速度未查）；Astronaut Ape、Space Ghost 判不出。
- 24472　Mindex 卡單廠牌 Time Resonance Music 查無來源，facts 不寫廠牌，寫作層勿寫。
- 24473　Space Ghost 的 Peace World 創立年只見搜尋摘要，未入 facts。
- 24474　WebSearch 用 4 次（Hidden Rivers、Breezewax、Mindex、Space Ghost）；Breezewax 搜尋撞同名團，無採用。

## 研究 c 組（條號 24461–24470）
- 24461：Błoto《Erozje》鼓型判不出（真鼓即興＋broken beat，評論稱出神／跳舞）；moodGuess 存疑（x 恐偏高）；留給評分。
- 24462：Culprate《Colours》鼓型判不出（trip-hop／downtempo 與 dubstep／IDM 標籤並存，無樂評）；不汰。
- 24463：Desert Dwellers《Breath》鼓型 3 偏弱（文案 slow house grooves、ecstatic dance，但同時冥想／dub）；弱建議汰，速度無資料，主線可留給評分。
- 24464：Pan Amsterdam《Confines》鼓機斷拍，混 1 與少數偏 2 的曲；整體不屬 2／3，不汰；moodGuess 存疑（有冷調合成器、玩笑感、搖滾曲）。
- 24465：David Starfire《Karuna》鼓型判不出偏 3（glitch hop／house／festival bass 取向，但 downtempo 曲也在）；弱建議汰，留給評分。
- 24466：parkbreezy《Better Days》僅有 Bandcamp 標籤與製作名單，status thin，鼓型判不出，不汰。
- 24467：Lee Scott《Butter Fly》鼓型判不出偏 1；status thin；不汰。
- 24468：本組所有鼓型判斷依據皆為 Bandcamp 文案／標籤與少量樂評；WebSearch 4 次用盡（Błoto、Culprate、Lee Scott 搜尋無有效結果），故 Culprate、Lee Scott、parkbreezy 無樂評佐證。

## 研究 a 組（條號 24441–24450）
- 24441：Acopia《Chances》鼓型判不出偏 1（Bandcamp／MB 標籤 trip hop、downtempo、ambient、shoegaze；Stereofox 稱 dark pop），無任何來源談鼓；status thin，不汰；moodGuess 輕微存疑（可能偏冷）。
- 24442：Lucky Daye《Algorithm》鼓型判不出（R&B／soul／funk／rock 混合 14 首，無鼓或 BPM 描述）；不汰，但 moodGuess 存疑（強）：偏放克／流行，x 可能高於 2.6。葛萊美項目逐項分開寫（專輯入圍兩項未得，單曲〈That's You〉得獎）。
- 24443：Teen Daze《Themes for Dying Earth》鼓型判不出偏 1（現場真鼓、ambient pop／downtempo；balearic 與 synth pop 標籤暗示部分中速）；不汰；年份 2017 無誤（MB 日本版 2017-01-25 先於 2017-02-10）。
- 24444：Vanessa Daou《Make You Love》鼓型 1（廠牌文案明講臥房而非舞池；同名曲有搖擺 drum n' bass 為局部）；不汰。年份歧義：Bandcamp 頁 2001-07-03、版權 ℗ 2000、MB／維基 2000，維持 2000。Slant 頁 WebFetch 403，其句取自 WebSearch 摘要，已在 notes 標明。
- 24445：Robot Koch《Songs for Trees and Cyborgs》鼓型判不出偏 1（dubstep／wonky／hip-hop 拖拍），局部可能 3（Boxcutter／Ital Tek 碎拍曲）；不汰；曲數 Bandcamp 15 與廠牌頁 16 並寫。
- 24446：edapollo《Blue Spring》鼓型 3（傾向）：自稱 melodic downtempo house、Plastic Magazine 稱 strong drum grooves／euphoric；整張未逐曲驗證，建議汰：舞池推進（弱到中）；status thin，moodGuess 存疑（強）。
- 24447：Erik Jackson《Night Street》鼓型 1（MPC 取樣、lofi／jdilla／trip hop；jazzy dnb 標籤為局部不確定）；不汰；卡單廠牌 Nuages Records 於 Bandcamp 頁未見，facts 未寫廠牌。
- 24448：本組推翻策展層 0 處（年份、廠牌、盤名皆與 MB 一致）；全 7 張皆原創專輯、無合輯或 EP。
- 24449：WebSearch 4 次用盡（Acopia、edapollo、Lucky Daye、Vanessa Daou 各一）；其餘用 WebFetch／Bandcamp／MB／Discogs API；Wikipedia API 多次限流，改 WebFetch。

## 主線研究汰換（不佔條號；2026-11-06）
研究層交件後只照「舞池推進／鼓＋攻擊性」汰，判輕、判冷、鼓型判不出的一律留給評分（店主「全都上架」）。**汰 4 → 剩 31**：
- Delerium《Nuages Du Monde》：舞池推進（研究 e：〈Angelicus〉〈Lost and Found〉登美國 Hot Dance Club Play 第 1、第 4 名，鼓型 3）。
- edapollo《Blue Spring》：舞池推進（研究 a：自稱 melodic downtempo house、樂評 strong drum grooves／euphoric energy）。
- Catching Flies《Beats & Pieces II》：舞池推進（研究 b：官方簡介直述 dancefloor-focused、uptempo sister）。
- Sephira《Monkey Tales》：四拍底鼓（研究 d：藝人簡介自稱「4/4 beat of the psybient realm」、Bandcamp 標 psytrance）。
- 留下的偏 3 疑慮卡：Desert Dwellers《Breath》（slow house grooves 與冥想 dub 並存）、David Starfire《Karuna》、Free the Robots《Kaduwa》（兩首機械律動）、Hector Plimmer《Infinity Mirrors》（壓軸一首 deep house）、Astronaut Ape《Deep》、Argaman、Badlands、Błoto、Eivind Aarset——舞池成分只在個別曲或證據單薄，交評分層判 x。鼓型 2 全批 0。
