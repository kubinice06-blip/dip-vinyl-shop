# add-20261106-ml74 裁定（情緒薄格策展線・恍惚 Bandcamp 有鼓名單第三輪）

> 店主 2026-11-06「有些要死不活的音樂也會有鼓推進」「全都上架吧」：前兩輪因「有拍推進」被汰或被標籤先篩掉的 473 張（`batch-progress/bandcamp-dt-20261105/beat-candidates.json`）切十批、五個工作階段並行；本工作階段做 ml74＋ml75。卡單 `pick-ml74.json`（48 張）即策展結果，主線組 `curation-ml74.json` → `build-master.mjs ml74` → 卡單。**照 CUR-DISPATCH「有鼓不等於躁」**：慢、拖、無力的鼓仍算靜；只有 (1) 鼓＋攻擊性、(2) 舞池推進（四拍底鼓、house／techno／breakbeat 跳舞律動、明顯中快速）才汰。**判輕、判冷不汰**（店主「全都上架」，落到其他格照實記）。目標格仍是恍惚（x≤2.7、y≥0.8、z≥0.3）。
> 本批卡單：`desc-tools/batches/cards/add-20261106-ml74-cards.json`（31 張；研究 a 6、b 6、c 6、d 4、e 9；e 組＝「研究判有鼓」沿用原批研究稿、只補不足）。身分：MB 釘住 29、§1 人工 2（Glenn Astro《Homespun》、MantisMash《Time Seeds》）。
> **預留：研究 a 24361–24370、b 24371–24380、c 24381–24390、d 24391–24400、e 24401–24410、鉤子 24411–24420、寫作 24421–24430、主線 24431–24440。**
---

## 主線策展（不佔條號；2026-11-06）
- 去重（`dupchk.mjs`：seed、所有 manifest、`data/pool-removed.json`、所有 curation）撞池 0；「DUP curation-…」者皆為前兩輪被汰的同一張（本輪重審對象）或 ml11／ml47 的情緒風險汰換（非身分問題，照「全都上架」收）。
- 同藝人：與並行 ml76–81、md44–45 卡單及池中一起看；池中已 ≥9 張（Purrple Cat、Sounds From the Ground）或並行另有 ≥3 張者不收或只收一張；同一位藝人在 ml74／ml75 合計最多一張（Entheogenic 收 ml74《Dialogue of the Speakers》）。
- MB 逐張回查（release-group search → releases 的曲數、日期、廠牌）；名稱照 MB 正規名（MB 的 U+2019 撇號改 ASCII）。MB 查無的走 §1 人工身分（Discogs master／Apple collection＋Bandcamp）。
- 研究判有鼓的卡（e 組）：原批研究稿已寫鼓型的，照新規則重判——慢拍、半速、dub、trip-hop 留；文案直述 danceable、house、big beat、95 BPM 以上 uplifting、輕快放克者照「舞池推進」汰。
- **主線汰 17**：
  - Thievery Corporation《The Cosmic Game》：同人超量：池中 3 張、並行 ml77／ml78 各 1
  - Chillhop Music《Chillhop Essentials Winter 2019》：合輯：MB Album＋Compilation（廠牌季度合輯）
  - Nym《Lilac Chaser》：同人：本線收 Nym《Convex》一張（並行 ml78 另有一張）
  - Carbon Based Lifeforms《Seeker》：MB 只有單曲＋同人：本線收《Interloper》
  - Bugge Wesseltoft《Somewhere In Between》：合輯：MB Album＋Compilation（20 首 123 分）
  - Jogging House《holds》：同人超量：池中 1、並行 ml76／77／81／md45 另 7 張
  - Spoonbill《CANOPY》：舞池推進：ml72 研究稿自述 eminently danceable downbeat、銅管切分律動
  - Khotin《Peace Portal》：非正規專輯：MB EP（6 首 29 分）；同人並行另 3 張
  - Purrple Cat《City Nights》：同人超量：池中已 10 張、並行另 5 張
  - parkbreezy《Aquarius》：身分：MB 未定 primary type、9 首 29 分近 EP；同人改收 ml75《Better Days》
  - POiSON GiRL FRiEND《reprises》：非正規專輯：MB EP
  - Fieh《III》：中快速推進：ml70 研究稿八人放克編制、輕快（讓人想動）
  - Pitch Black《The Light Within》：非正規專輯：MB Album＋Remix
  - Fennec《Let Your Heart Break》：舞池推進：ml68 研究 RYM minimal techno、Sputnik house；ml73 研究證實取樣 house 製作人、樂評 strong grooves／dancefloor
  - Chillhop Music《Chillhop Essentials Winter 2025》：合輯：廠牌季度合輯（MB 查無）
  - LAB'S CLOUD《Underwater Galaxy》：中快速推進：ml71 研究稿每首 95–115 BPM、uplifting grooves；並行 ml79／ml80 另 2 張
  - Arms and Sleepers《SENTIMENTALISMS》：同人超量：池中 1、並行 ml78／md44／md45 另 5 張；Bandcamp 標 mixtape

## 研究 e 組
- 沿用前輪研究稿，只補不足：Jazz Playaz 5→9 條（逐首署名、短曲 beat tape 形式、後續 LP、聲音定位；補 Bandcamp 簡介全文＋1 次 WebSearch，查無獨立樂評）、Liléa Narrative 7→9 條（Last.fm 簡介：electro hip hop、音樂節紀錄）。其餘 7 張已 ≥8 條。key／artist／album 與卡單 group e 九張逐字一致。
- 每張 notes 首行加「鼓型：」。1＝Nym；判不出偏1＝Carbon Based Lifeforms、Saafi Brothers、Jazz Playaz、Shwamp、Liléa Narrative；判不出（偏3風險、建議主線抽聽）＝Lapa；判不出＝Emancipator（x 偏高、y 偏輕，建議降序）、Master Minded。無屬 2。無建議汰（鼓型理由）；Shwamp 沿用前輪「建議汰」但理由是質地偏輕而非鼓。
- Jazz Playaz、Liléa Narrative、Master Minded、Nym 仍 thin，聲音證據僅標籤與文案。

## 研究 b 組
- 24371：Suduaya《Venus》年份廠牌照 MB／Discogs（2016、Altar Records CD）；Bandcamp 頁標 2021、Arcelya Records 視為數位重發頁，不推翻卡單。鼓型判不出（偏 3），建議汰（弱）。
- 24372：Fallgrapp《Rieka》鼓型 1（trip-hop 細節拍、弦樂墊底）；DJ Frane 鼓型 1（副題 beats to blaze to，無 BPM）；Tara Putra 鼓型 1（laid-back dub）。
- 24373：Glenn Astro《Homespun》鼓型判不出（混合：dubby 冥想曲＋J Dilla 式鼓＋一首 jungle＋electro 放克）；建議汰：弱，交主線抽聽。
- 24374：Kareem Ali《Sound in Motion》鼓型判不出，聲音證據只有標籤；廠牌 CosmoFlux 未在 Bandcamp 頁直接寫明，寫作層保守。Bandcamp 位置標 New York 與 MB 鳳凰城不同，不寫所在地。DJ Frane、Kareem Ali 標 thin。
- **研究 c 組（24381）**：6 張，鼓型全判一次：Sumiruna《Conexion》＝3 舞池推進（Discogs Psy-Trance／Progressive Trance、Beatport 約 140 BPM、每首 7–9 分鐘），建議汰；My Sister's Fugazi Shirt＝1；Maple《Pull》、Noya Rao《Icaros》、Lavarr the Starr《Illusions Ago》＝判不出偏1；Revolution Void《The Politics of Desire》＝判不出（專案早期 big beat、此盤僅標籤 breakbeat／nu-jazz），請抽聽。Sumiruna 與 Maple 因聲音證據僅標籤，status thin。
- **（24382）** Revolution Void 發行日三來源互異（MB 2008-09-25、Bandcamp 2009-06-21、維基 2008-06-24），沿用卡單 2008；label 空白＝自行發行。Lavarr Bandcamp 地點標拉哥斯但說明寫生於美國，地點不入正文。

## 研究 d 組
- 24391 鼓型逐張標在 notes 首行：Skinshape＝1（真人鼓＋鼓機、trip hop，無推進／攻擊字眼）；Kalpataru Tree＝判不出偏1（dub 低音線、長曲、無強拍描述）；Govinda＝判不出（downtempo 但簡介稱鼓「abrasive」、首曲「upbeat」，不硬判）；MantisMash＝判不出偏3（文案 groovy／upbeat mid-tempo、標籤 psybreaks／glitch hop，建議主線抽聽，確認是舞池律動則汰）。四張皆無音檔實聽，證據僅 Bandcamp 文案與標籤。
- 24392 MantisMash §1 人工身分核對通過：Bandcamp＋Discogs release 18859117，盤名、2020-10-29、Merkaba Music、9 首一致；卡單 label／country 空白，建議補 Merkaba Music／Australia。WebSearch 摘要稱藝人為以色列 Natan Lenski，與 Bandcamp 澳洲標示不符且未開頁，不採。
- 24393 Skinshape 曲數：MB／Bandcamp 11 首，商店黑膠文案 16 首，以 MB／Bandcamp 為準；鼓手名 Bandcamp 作 Tom Blunt、預告報導作 Tom Blind，以 Bandcamp 為準。
- 24394 moodGuess 存疑：MantisMash（upbeat，x 恐 >2.7）、Skinshape（x 2.8 超標、y 0.6 輕）、Govinda（x 2.8、y 0.7 貼邊且氣氛有 dark／haunting）；Kalpataru Tree 無矛盾。依店主「全都上架」主線不汰，落格照實記。

## 研究 a 組
- 24361 鼓型：Odd Nosdam《Sisters》＝1（Cyclic Defrost slow lumbering breaks、HHV 鼓守 90 BPM、無攻擊／舞池）；Little People＝1（Magnetic Magazine downtempo、subtle drums，後半打擊較重但仍慢中速）；Kognitif＝1（依據偏弱，僅作者自標 trip hop／downtempo）；Entheogenic、40 Winks、Yndling＝判不出（皆無來源直述鼓型或 BPM），不硬判、不建議汰。本組無 2／3 型確證，無「建議汰」。
- 24362 moodGuess 存疑：Yndling（x 2.8 貼上限、y 0.6 輕，bedroom pop 恐落平靜／雀躍）；40 Winks（y 0.5 輕、z 0.3 貼邊）；Little People（y 0.6 偏輕，樂評描述放克吉他、弦樂）；Kognitif（z 0 中性、x 2.7 貼邊）；Odd Nosdam（z 0 中性，暖冷並存）；Entheogenic 無證據可推翻。依店主「判輕、判冷不汰」，僅記錄。
- 24363 40 Winks 唯一偏動感線索是 Project: Mooncircle 官網寫 breakbeat 與 downtempo 元素，Bandcamp 標籤含 Techno；無 BPM。研究層不判 3，建議評分時看速度；若實聽 120 以上密集 break 再依 24361 汰。
- 24364 Entheogenic：Wikipedia 稱 French project，與 Bandcamp 地點 United Kingdom、成員 Oak-Rhind 生於英國衝突，facts 不寫國籍；首發日 MB 2005-03-23（Universal Symbiosis）vs Bandcamp 2005-05-23，寫作層只寫 2005 年；德國版 Chillcode CHILLCD003（2005-07）。
- 24365 Kognitif 以 2014 年 14 軌版為準（MB 另有 2020 Edition 黑膠 12 軌）；成員與所在地 Bandcamp 未載，YouTube 帳號名推測的人名不採。
- 24366 WebSearch 用 4 次（Entheogenic、Little People、Odd Nosdam、Yndling）；Discogs、AllMusic、psyreviews.net 皆取不到（403／網域未開放）。

## 主線研究汰換（不佔條號；2026-11-06）
研究層交件後只照「舞池推進／鼓＋攻擊性」汰，判輕、判冷、鼓型判不出的一律留給評分（店主「全都上架」）。**汰 1 → 剩 30**（被汰卡移到 `dropped-cards.json`／`dropped-research.json`）：
- Sumiruna《Conexion》：舞池推進（研究 c：Discogs Psy-Trance／Progressive Trance、Beatport 約 140 BPM，8 首各 7–9 分鐘）。
- 留下的偏 3 疑慮卡（研究層只寫「判不出」或弱建議）：Suduaya《Venus》（driving basslines、psyprogressive 標籤，無 BPM）、Glenn Astro《Homespun》（dubby 冥想曲與 Dilla 式鼓並存、一首 jungle）、MantisMash《Time Seeds》（upbeat mid-tempo、psybreaks）、Lapa、40 Winks、Revolution Void——證據只有標籤或單句文案，不足以認定舞池推進，交評分層判 x。鼓型 2（攻擊性）全批 0。
