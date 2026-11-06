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

## 鉤子層（d、e；24496–24500）
- **24496** 交件：`desc-tools/batches/hooks/add-20261106-ml75-hooks-d.json`（5）、`-hooks-e.json`（7），key 與順序照主線汰換後的研究稿（Sephira、Delerium 已汰）。公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin（Astronaut Ape、Breezewax、Zoungla）上限 170，其餘 230。逐筆預算／hook 加權（原始字元）：Astronaut Ape 162／20（20）、Hidden Rivers 227／24（24）、Breezewax 161／27（27）、Mindex 212／21（21）、Space Ghost 221／20.5（29）、Alpha 214／18（18）、Helios 230／19（19）、Hibernation 229／25.5（30）、Argaman 215／20（20）、Zoungla 162／24（30）、Badlands 229／26（28）、Eivind Aarset 228／25.5（29）。初稿 12 張有 10 張超標，整格捨去：Astronaut Ape 曲序與一人包辦；Hidden Rivers〈Night Hammer〉午夜廣播與曲長細目；Breezewax 客座具名；Mindex 封面顯微攝影；Space Ghost〈VGM〉與玩過的遊戲；Alpha Don't Touch 廠牌與〈A Little Poison〉；Hibernation 小提琴／單簧管客座、Foxglove 錄音室、71 分 DJ mix；Argaman 自家錄音室名與開場長曲；Zoungla Devin Townsend；Badlands 愛情主題、低音提琴；Aarset 樂評評語、自製、DD-5。壓完回核 hook 依賴格全在 g1（Aarset hook 由「Eventide＋效果器」改成「Khmer 樂團練出的處理器手法」，避免把 Khmer 時期器材說成本盤器材）。
- **24497** 骨架歸屬（12 張 12 條）：Astronaut Ape＝曲序即下潛路線的海洋概念盤；Hidden Rivers＝想像中的平行科技史；Breezewax＝製作人自述配方（取樣＋現場＋音景）；Mindex＝現場開場曲移植為專輯開場；Space Ghost＝虛構遊戲機畫面配樂；Alpha＝創團者錄音中途離團；Helios＝替居家空間寫的 Eno 式背景音樂；Hibernation＝廠牌出題、新名號應答；Argaman＝一人包辦所有樂器；Zoungla＝前衛搖滾樂迷轉向迷幻；Badlands＝客座演奏當取樣剪接；Aarset＝在別人樂團練出的手法帶進個人首張。⚠ 與 b 組可能相鄰：Eat Static（Hinton 離團）若走成員離團骨架會撞 Alpha，b 組 hook 現走 BPM，未撞。hook 四型：懸疑（Hidden Rivers、Alpha）／斷言（Space Ghost、Hibernation、Breezewax）／場景（Astronaut Ape、Mindex、Helios、Badlands）／人物定調（Argaman、Zoungla、Aarset）。
- **24498** 同藝人舊卡避開（掃 `output/`、`hooks/`）：Alpha 池中《Come From Heaven》（Plath 朗讀＋第二句 Melankolic 首作）、《The Impossible Thrill》（三位歌手＋第二句「Corin Dingley 與 Andy Jenks 的 Alpha」）→本張不帶 Melankolic、不用兩人並列領句，第二句「布里斯托的 post-trip hop 團 Alpha，只剩 Corin Dingley 一位創團者」。Helios《Eingya》（Goldmund／Helios 分工＋「兩個名字底下都是 Keith Kenniff」）→本張不提 Goldmund，走居家環境音樂，第二句「美國西北部作曲家 Keith Kenniff 以 Helios 為名」。Hibernation、Argaman、Zoungla、Badlands、Aarset 在 output 無舊簡介。
- **24499** 第二句句型配表：Astronaut Ape「本名 X 的 Y 做…」；Hidden Rivers「Y 背後是威爾斯製作人 X」；Breezewax「Y 是 X 的名號」；Mindex「來自德州奧斯汀的 Y，…都自己包辦」；Space Ghost「Y 在自己的廠牌推出」；Alpha「布里斯托的…團 Y，只剩 X 一位創團者」；Helios「美國西北部作曲家 X 以 Y 為名」；Hibernation「做過 Kaya Project 的英國音樂人 X，換上 Y 這個新名號」；Argaman「以色列製作人 X 做 psytrance 與 ambient，15 歲…」；Zoungla「Y 由 X 主導」；Badlands「Y 這個名義底下，只有瑞典製作人 X 一人」；Aarset「挪威吉他手 X 1961 年生於 Kolbotn」。「他／她」引入：Hibernation、Argaman、Aarset 的 hook 用「他」、Badlands 用「她」→第二句具名＋身分；其餘 hook 帶地名或樂種、第二句具名。「日」後一字：Astronaut Ape 日公、Hidden Rivers 日歸、Breezewax 日交、Mindex 日釋、Space Ghost 日起、Alpha 日率、Helios 日正、Hibernation 日先、Argaman 日由、Zoungla 日首、Badlands 日從、Aarset 日在；已避 a 組（經上問面，）、b 組（發於推透）、c 組（深出亮登開貼收）。
- **24500** n-gram 自查：hook 間中文 4-gram（本檔 12 張＋a、b 組 hook／note＋ml68–73、md39–43 已交 158 條 hook）0；途中拆掉 `七首曲子`（Astronaut Ape 對 ml 舊 hook）、`場演出的`（Mindex 對 b 組 Computerjockeys note）。開頭前四字 12 張互異，也與上列全部不同。hook 與 note 無逐字重複句。正面表述：Mindex「而非音響強度」被 crossgroup 標校對痕跡→改「看重的是音樂性、玩心與律動感」；Helios「沒有起承轉合」改「每首平鋪著走」。媒體名不進 note（Aarset 樂評格已捨）。腳本：`node qa-batch.mjs hooks add-20261106-ml75` 全部通過（c 組交件前曾報缺檔）；`node chk-hook-crossgroup.mjs add-20261106-ml75` 只剩 a 組 Vanessa Daou「而非」1 項待人工，d、e 組 0。

## 鉤子層（a、b、c；24491–24495）
- **24491** 交件：`desc-tools/batches/hooks/add-20261106-ml75-hooks-a.json`（6）、`-hooks-b.json`（6）、`-hooks-c.json`（7），key 與順序照主線汰換後的研究稿（edapollo、Catching Flies 已汰）。公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin 卡（Acopia、Computerjockeys、parkbreezy、Lee Scott）上限 170，其餘 230。逐筆預算／hook 加權（原始字元）：Acopia 152／23（23）、Lucky Daye 221／20（20）、Teen Daze 226／22（22）、Vanessa Daou 226／17（17）、Robot Koch 216／23（28）、Erik Jackson 228／23（23）、Free the Robots 221／23（23）、Eat Static 227／20.5（30）、Computerjockeys 167／24（26）、Ash Walker 222／23（30）、saib. 214／23（23）、Hector Plimmer 213／18（18）、Błoto 229／21（21）、Culprate 226／19（26）、Desert Dwellers 222／22.5（30）、Pan Amsterdam 217／24（24）、David Starfire 212／18（18）、parkbreezy 159／15.5（17）、Lee Scott 168／22（22）。初稿 14 張超標，整格捨去：Lucky 的 Bruno Mars 與 D'Mile vocoder、Vanessa 的 Matt Hong、Koch 的 Bpitch Control 盤名與 Boxcutter 合作曲、Eat Static 的 Interchill 七張合輯單曲與 Ed Wynne／Hillage、Computerjockeys 的女聲名單外的開場曲名與 2026 重新上架、Ash 的舊金山／洛杉磯 dub 與 Amp Fiddler 粉絲一句、Culprate 的開場 9 分 06 秒、Desert 的客座名單、Pan 的「該廠牌第一張」、parkbreezy 的 Serge 與 MROSE、Lee Scott 的 High Focus「奶油般圓滑」、Acopia 的曲名。壓完回核：19 張 hook 依賴格全在 g1；補回兩處踩空（Koch「第二張長篇」補進第二句指派、Computerjockeys「科隆」補進第二句）。
- **24492** 骨架歸屬（19 張 19 條，各張 note 只寫自己的歸屬句）：Acopia＝三人心事匯成共同告白；Lucky Daye＝專輯提名落空、單曲得獎（獎項分流）；Teen Daze＝巡演後的倦怠濾成樂觀；Vanessa Daou＝廠牌定位「臥房對照舞池」；Robot Koch＝忙碌之年裡交出長篇；Erik Jackson＝整理舊作翻出舊檔而回望；Free the Robots＝疫情困在異地島嶼、極簡設備；Eat Static＝速度降檔（BPM 少過 110）；Computerjockeys＝自認 PC 現場演出先驅；Ash Walker＝DJ／收藏家身分（與 The Specials 放黑膠）；saib.＝酒廊 exotica 的度假意象；Hector Plimmer＝五年打磨＋首次自發大規模作品；Błoto＝巡演空檔一天湊團、一夜即興錄完；Culprate＝曲名全以顏色命名；Desert Dwellers＝出自 Moontribe 聚會圈的雙人；Pan Amsterdam＝對爵士圈失望、換名重生；David Starfire＝義賣專輯（收益捐緬甸難民教育）；parkbreezy＝短曲構成；Lee Scott＝自我標榜的「外太空新市鎮饒舌」。與 d／e 組 12 條（24497）無重疊；Eat Static 第二句刻意不寫「Joie Hinton 離團」，避開 e 組 Alpha「創團者離開」骨架。hook 四型：懸疑（Lucky、Erik、Błoto）／斷言（Acopia、Vanessa、Eat Static、Plimmer、Culprate、Starfire、parkbreezy）／場景（Teen Daze、Free the Robots、Ash、saib.）／人物定調（Koch、Computerjockeys、Desert、Pan、Lee Scott）。
- **24493** 同藝人舊卡避開（掃 `output/`、`hooks/`）：Acopia《Acopia》（ml69）hook「墨爾本三人組…Ewan Pearson 混」＋第二句成員名單領句→本張不以「墨爾本三人組」開頭、不寫混音與成員名單，第二句改「這是墨爾本三人組 Acopia 的首張專輯」。Teen Daze 三張舊卡（未來學者／科幻片曲名／最內省）第二句用「來自卑詩省」「卑詩省 Abbotsford 的 Jamison Isaak 用 Teen Daze 之名」「加拿大電子音樂人 Teen Daze」→本張走巡演倦怠，第二句「Jamison Isaak 替 Teen Daze 這個名號做到第五張長篇」、地名用「不列顛哥倫比亞」。Free the Robots《The Balance》（副業起家＋第二句「洛杉磯地下 hip-hop 製作人」）→本張走錫亞高島，第二句改名號由來（1950 年代科幻片）。Desert Dwellers《Anahata Yoga Dub》（ml70，瑜珈系列最末輯＋第二句「X 與 Y 組成的 yoga dub 二人組」）→本張不寫 Downtemple Dub 系列序號，走 Moontribe 出身，第二句「Bandcamp 把 Desert Dwellers 標在 Boulder」。Lucky Daye、Robot Koch、Eat Static 等其餘 15 張 output／hooks 查無舊卡。開頭四字也避開 ml68–73、md39–43 已交 hook 的「墨爾本三」「一台 MPC」「花了兩年」「疫情隔離」「封城時，」「沙漠邊的」「鋼琴、弦」。
- **24494** 第二句句型配表（含 d／e 共 31 張逐張相異）：Acopia「這是…的首張專輯」；Lucky「X 唱的是 R&B，本名…」；Teen「X 替 Y 這個名號做到第 N 張」；Vanessa「廠牌 A 與 B 共同發行了她的第五張」；Koch「John Peel 曾說…做的是…」（外人之口）；Erik「X 是…的製作人」；FtR「看…時，X 想到 Y 這個名字」；Eat Static「Y 這張由 X 一人完成」；Computerjockeys「X 與 Y 在科隆搭檔」；Ash「X 在倫敦當 DJ、也收唱片」；saib.「Cold Busted 的簡介說…」；Plimmer「倫敦製作人 X 稱…」；Błoto「可以把 X 看成…的副線」；Culprate「以…為據點的 X 化名 Y」；Desert「Bandcamp 把 X 標在…」（器物）；Pan「身兼…的 Leron Thomas」；Starfire「X 的招牌聲音自稱…」；parkbreezy「人在丹佛的 X」；Lee Scott「…出身的 X」。「他／她」引入：Teen、Koch、Erik、FtR、Ash、Plimmer、Pan、Lee Scott 的 hook 只用「他」或身分→第二句具名；Vanessa 用「她」；Acopia、Computerjockeys、Błoto、Desert 為多人團，正文用團名或「三人／兩人／四個人」。避開 d／e 已用的「本名 X 的」「X 背後是」「X 是 Y 的名號」「以 Y 為名」。
- **24495** 「日」後一字（19 張＋d／e 逐張相異）：Acopia 日經、Lucky 日上、Teen 日問、Koch 日，、Erik 日面、FtR 日發、Ash 日於、saib. 日推、Plimmer 日透、Błoto 日深、Culprate 日出、Desert 日歸、Pan 日改、Starfire 日以、parkbreezy 日貼、Lee Scott 日掛；Vanessa（年份歧義，寫 2000 年）、Eat Static（三說並存，寫 2008 年）、Computerjockeys（只寫 2001 年）只到年。初稿 Desert 亮／Lee 收／Starfire 開／Pan 登與 d／e 撞，已改。n-gram 自查：本組 19 張 hook 間中文 4-gram 0；對 ml68–73、md39–43 已交 158 條＋d／e 12 條 hook 掃到「年他交出」（Koch 初稿對 ml72 Solar Fields），已改寫，複掃 0；開頭四字 31 張互異、也與前批不同。hook 與 note 無逐字重複句。crossgroup 報 Vanessa「而非」校對痕跡風險，改成「說它屬於臥房，拿來對照的是舞池」。研究稿「鼓型」行、moodGuess、uncertain 格未進 note；Vanessa 的 Slant 句寫成樂評觀察不加引號；Pan 父親過世標語氣克制；Lucky 葛萊美、Culprate 2019 眾籌續作標時序。腳本：`node qa-batch.mjs hooks add-20261106-ml75` 全部通過；`node chk-hook-crossgroup.mjs add-20261106-ml75` 全部通過（5 組 31 張，hook 加權 15.5–27）。
