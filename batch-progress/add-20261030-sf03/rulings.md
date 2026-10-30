# add-20261030-sf03 裁定（店主 Spotify 追蹤藝人補卡池・日本：地下、迷幻、即興、和樂器）

> 店主 2026-10-30 `/dip-card-create`：依 Spotify 追蹤藝人補卡池，每位缺漏藝人挑 1–2 張代表作（交接 `batch-progress/spotify-follow-20261030/PLAN.md`）。本工作階段負責 sf03、sf04。流程沿用 `batch-progress/HANDOFF-mood-cells-line.md` §二，**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-sf03a.json`（10 位 14 張）＋`curation-sf03b.json`（10 位 13 張）→ 主線汰 4、改 1（`master-override-sf03asf03b.json`）→ `master-sf03asf03b.json`（23 張：MB 釘住 19、§1 人工 4）→ `pick.json`（23）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf03-cards.json`（23 張；研究 a–d 各 5、e 3）。
> **預留：研究 a 41201–41210、b 41211–41220、c 41221–41230、d 41231–41240、e 41241–41250、鉤子 41251–41260、寫作 41261–41270、主線 41271–41280。**（sf 線條號：sfNN → 41001＋(NN−1)×100 起，與 sf09／sf10 同制；30000＋批號×100 制的 303xx 已被舊 c 批佔用，不用。）
---

## 主線策展（不佔條號）
- **清單 20 位 → 20 位全收、23 張；跳過已在池 0 位；不收 0 位。** 策展兩組以原文、羅馬拼音、MB 別名查 `seed_cards.json`、`data/artist-intros/`、`aliases.json`；主線再對 origin/main 與全部 `claude/*` 分支的 seed（合併 22,168 列）跑藝人層與盤名層去重，命中全是誤中（John Zorn 的其他盤、Sam Gendel《Satin Doll》、Sa-Ra、Ta-ku、Buzzcocks、Peaking Lights／SHINee 同名《Lucifer》、Petrucciani《Playground》），0 撞。
- 身分：Seiichi Yamamoto＝山本精一；Taku Sugimoto＝杉本拓；Suzuki Junzo＝スズキジュンゾ；Miminokoto＝みみのこと；Shinki Chen＝陳信輝；ファーラウト＝Far Out（1973《日本人》，Far East Family Band 前身）；Toho Sara＝東方沙羅；Kifu Mitsuhashi＝三橋貴風；SHIGEO SEKITO＝関藤繁生；Mitsuru Tabata＝田畑満；Shin Sasakubo＝笹久保伸；Kenji Kariu＝狩生健志；BUZZ＝バズ（1970 年代日本民謠搖滾團，韓國 버즈、Da Buzz、Buzzcocks 非本人）。
- **Yamantaka Eye《Nani Nani》**：MB 掛名「Dekoboko Hajime & Yamataka Eye」，Dekoboko Hajime 是 John Zorn 的化名；Apple 掛「Yamataka Eye & John Zorn」。卡上掛名用後者（讀者認得），MB 掛名進 queryAlias。池中 BOREDOMS 是團名卡，不是 Eye 個人名義，不算已在池。
- **Shin Sasakubo**：收與 Sam Gendel 的合作盤《Sam Gendel & Shin Sasakubo》（2021，Leaving Records，§1 人工）。合作名義有先例（sf10 Danger Mouse 兩個合作名義）；Spotify 上笹久保最廣為人知的正是這張。研究層核廠牌。
- **主線汰第二張（策展給太寬，「第二張要確實是另一個高峰才收」）**：関藤繁生 Vol.1《華麗なるエレクトーン》（留 Vol.2，被取樣而聞名的那張）、Sinsuke Fujieda Group《FUKUSHIMA》（2025，評價證據薄）、バズ《Gentle Mind From Buzz》（只有類型標籤）、みみのこと《緑の住処》（留國際廠牌 Important 的《Hitoyogiri》）。
- **留兩張的**：world's end girlfriend（《Hurtbreak Wonderland》《Seven Idiots》）、山本精一（《NOA》《PLAYGROUND》，Alchemy 與 P-Vine 兩期）、割礼（《Paradaise・K》《ネイルフラン》）。
- §1 人工 4 張：スズキジュンゾ《Ode to a Blue Ghost》、笹久保合作盤、狩生健志《Sekai》、バズ《Buzz》；`mbAbsenceProof` 策展給的是字串，上線前轉成物件（sf05／sf07 坑）。
- 交研究層把關：Musica Transonic、穂高亜希子、田畑満《Lucifer》代表作依據薄；三橋貴風盤 MB 掛名含山屋清、廠牌待核；関藤 Vol.2、Fujieda《Informel》廠牌待核（Apple 標 2026 再發、MB 2021）；狩生《Sekai》2020／2021 兩說；Far Out 年份 Apple 1971 vs MB 1973；LSD March、割礼《ネイルフラン》CAA 無封面（Discogs）。BUZZ 身分（Spotify 的 BUZZ 是否這組）iTunes 未能核對，研究層再查。

## 研究 e 組
- 41241　笹久保合作盤：廠牌推翻策展層的 Leaving Records，Discogs 原版與黑膠為 Carnet Records（carnet-001，2021-11-17 數位首發）；Leaving 是 Gendel 自家廠牌。卡單 label 建議改 Carnet Records。status thin（聲音細節僅零售商文案）。
- 41242　狩生健志《Sekai》：年份以 2020 為準（黑膠 2020-12-07，Apple ℗ 2020，數位上架 2021-01-15），Bruit Direct Disques Br-d 36 確認。卡單 year 建議改 2020。聲音只證實電子／流行質地，樂器與有無鼓未證實，寫作層勿斷言合成器。
- 41243　バズ《Buzz》：Discogs 與 MB 均為同一組日本團，廠牌 London Records（SKD(L)-1013，1973-04-10），2012 King 再發 KICS 91808。Spotify 頁無法直接核對（iTunes 403），判斷多半是這組（串流版應為 King 再發），未證實；主線以 Spotify 專輯頁曲目核對。日文維基只算小出博志、東郷昌和二人為成員，高橋幸宏僅為錄音鼓手（Discogs 樂手欄），不寫成成員。專輯收錄版〈ケンとメリー〉是否同單曲版未證實。
