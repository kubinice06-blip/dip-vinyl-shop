# add-20261030-sf11 裁定（Spotify 追蹤藝人補卡池・冷門與身分待查：電子、lo-fi、小廠牌）

> 店主 2026-10-30 `/dip-card-create`：依 Spotify 追蹤藝人補卡池，每位缺漏藝人挑 1–2 張代表作（交接 `batch-progress/spotify-follow-20261030/PLAN.md`）。本工作階段負責 sf11、sf12。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-sf11a.json`（16）＋`curation-sf11b.json`（14）→ 主線汰 5、改 2（`master-override-sf11asf11b.json`）→ `master-sf11asf11b.json`（25 張；MB 21、人工 4）→ `pick.json`（25）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf11-cards.json`（25 張；研究 a–e 各 5）。
> **預留：研究 a 49801–49810、b 49811–49820、c 49821–49830、d 49831–49840、e 49841–49850、鉤子 49851–49860、寫作 49861–49870、主線 49871–49880。**（418xx／419xx 之後的 420xx–423xx 可能被並行的 sf03／04／06／08 取用，本批改用 498xx 避撞。）
---

## 主線策展（不佔條號）
- **清單 35 位 → 收 24 位、25 張；跳過已在池 1 位；不收 10 位。**
- **Spotify 藝人頁回查（主線全批 35 位）**：`open.spotify.com/embed/artist/<id>` 熱門曲逐位抓下（`scratchpad/spcheck/top.txt`）發回策展層核對。第一輪 sf11a 沒有熱門曲資料而把 9 位判不收，主線用熱門曲線索要求重查後補回 caldera（〈Sky Islands〉feat. Dianne Reeves＝洛杉磯拉丁爵士融合樂團 Caldera）、DJ Toner（與 Raynald Colom、Jorge Pardo、Erik Truffaz 合作的西班牙製作人）、Doctor Butcher（〈The Altar〉〈Season of the Witch〉＝1994 同名專輯的美國金屬樂團）、ERISTHEPLANET。Nicknack 熱門曲對應《Dearly Departed》（2010），策展改收該盤。
- **跳過（已在池）**：Scattered Purgatory → 池中寫法 破地獄（1 張）。
- **不收**：
  - Agosta——熱門曲全是 remix，查無正規專輯。
  - Declan McDermott——house 單曲與 remix。
  - North Downs——單曲與 EP（與 Maribou State 合作曲）。
  - Four Pens（四枝筆）——zh 維基與 MB 只有 EP、日本集結盤《One Day》與單曲，無正規錄音室專輯。
  - sloje（單曲與 4 首 EP）、ZipZap（單曲／EP，MB 那張無法確認是同一人）。
  - Whyte——只找到一張專輯，缺第二個身分來源。
  - Nice Face——熱門曲對不上任何可釘住的專輯。
  - Alexandra Atnif——策展提《Rhythmic Brutalism Vol.1》，但 Spotify 熱門曲（〈Side 2〉〈Undeciphered Distress Signal〉）對不上該盤或同年其他盤，國籍不明，身分無法與 Spotify 追蹤對象連起來，主線汰。
- **一位只收一張（主線汰第二張）**：Moin 汰《You Never End》留《Moot!》（AD 93 首作，評論集中）；Caldera 汰 1976 同名首作留《Sky Islands》（熱門曲標題曲）；特撮汰《ヌイグルマー》留出道作《爆誕》（MB 763d5913，2000-02-23）；ULTRA SUNN 汰新作《The Beast in You》留《US》。
- **改**：The Offset: Spectacles 國別 hk → us（Chicago Trouble In Mind 發行的美國一人計畫，研究層核實）。
- 交研究層把關：Posh Inverse 的中文團名「優雅逆轉」與 The Sign Of Human 的「記號士」是策展填的雙寫，研究層要找到官方來源，找不到就只用英文名；The Sign Of Human 台／港國別；skip skip ben ben 熱門曲（交雜隕石、無限大、海嘯列車）是否出自較新的專輯（MB 只到 2015《鏡中鏡》）；ERISTHEPLANET 盤名（策展寫《IT REALLY DO BE THAT DAMN PHONE》，MB 寫《IT BE THAT DAMN PHONE》）照封面與 Spotify 定；Sonia Calico 國別（熱門曲含中文）；The Luvmenauts 國別；pololu 熱門曲掛 Flow State Records（PLAN 列為廠牌、不收的那個帳號；pololu 本人是藝人，照收）；Mad Keys、Nicknack、PUZZLEMAN 無評論共識，代表作依完整度推定。

## 研究 a 組（49801–49810）
- **49801**（Moin《Moot!》）身分核實：MB 5f26ed11、AD 93、2021-07-09 皆對；真人鼓手（Magaletti）非鼓機，moodGuess 的 why 小修但方向不變（冷／躁）；留。
- **49802**（NUUAMM《w/ave》）推翻策展層：label 卡單寫 Kilikilivilla，MB／Billboard JAPAN／Discogs 皆為十三月（JSGM-019）；卡單 label 改十三月。年份 2017-06-28 成立（Last.fm 的 9 月不採）。聲音零可靠來源（僅廠方文案：迷幻、夢與現實之間），moodGuess 無法核實；status thin，寫作保守。
- **49803**（Mindchatter《DREAM SOUP》）身分、廠牌、年份皆對；第二張成立。moodGuess 輕度存疑：來源強調 indie pop 歌曲創作＋電子並重，非純律動舞曲；不為汰卡主因。
- **49804**（NoSo《Stay Proud of Me》）身分、廠牌、年份皆對；首作成立；Baek Hwong 為非二元，行文避性別代名詞。
- **49805**（Natural Magic《II》）身分、廠牌、年份皆對（LP 實體可能 3 月）；moodGuess 中度存疑：實為真人鼓＋貝斯的克勞特／太空搖滾即興，非『新世紀感舞曲』；『首作限量百卷卡帶』『JD Twitch 最後參與』查無頁面來源，不寫進 facts。
- 無建議汰卡；全組五張皆通過身分核實。

## 研究 b 組
- **49811**（Parks, Squares and Alleys《Against Illusions and Reality》）身分成立（MB RG 與 Bandcamp 皆 2015-05-29，自發行）。國別存疑：MB 藝人頁 RU（莫斯科／哈巴羅夫斯克），Bandcamp 所在地寫第比利斯；country 暫維持 ru，文案不寫國名。無樂評，status thin。
- **49812**（The Offset: Spectacles）**推翻主線國別改 us**：這是香港成員的三人團（Tom Ng、Vince Li、Ou Jian），曾在北京活動，並非 Chicago 的一人計畫；Trouble In Mind 只是 2021 十週年重發廠牌。建議 country 回 hk。專輯 2011-11-11 首發，原創專輯、無鼓，moodGuess 證實。
- **49813**（Nicknack《Dearly Departed》）身分成立：奧斯汀 DJ／製作人 Nick Malkiewicz，2010-06-15，自家廠牌 Crowd Control Records（卡單 label 可補）。無針對本盤評論，Spotify 追蹤對象是否同一人僅靠熱門曲比對；建議可汰（策展層已列風險）。
- **49814**（Mad Keys《Balance》）身分成立（聖路易、自發行、2020-01-09）；有真人貝斯鼓現場錄製。不寫「首張專輯」（2015 有《LoveWaves》），只寫他自稱 debut。「破百萬串流」單一自述來源。
- **49815**（Caldera《Sky Islands》）身分成立（Capitol，1977-04-28，原創專輯）。Dianne Reeves 客唱第 1、2 首僅 Wikipedia 專輯條目一源，行文保守；城市來源不一（LA vs NYC），文案只寫美國；「樂迷公認巔峰」無來源不採。
- 無必須汰卡者；Nicknack 與 Mad Keys 為弱案（只有一手資料），主線可擇汰。
