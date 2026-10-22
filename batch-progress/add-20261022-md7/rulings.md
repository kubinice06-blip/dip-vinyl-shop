# add-20261022-md7 裁定（情緒薄格策展線・頹靡：冷調 post-rock／慢而冷、鼓少的器樂）

> 店主 2026-10-22「新增的專輯數太少了 與雀躍嚴重不平衡」→ 三格各補到約 2,000；場景與條號見 `batch-progress/mood-cells-20261022/SCENES.md` md7 列，交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**頹靡＝靜（x<3.0）＋重（y≥+0.5）＋冷（z<0）**；策展邊距 x ≤ 2.7、y ≥ +0.8、z ≤ −0.3。
> 策展：`curation-md7.json`（53 張：Kranky 慢盤 12、冷配樂 8、Constellation 5、Temporary Residence 5、冷 post-rock 5、Supersilent／drone 5、英國室內慢盤 3、候補無鼓吉他 drone 10）→ `master-md7.json`（MB 回查 53/53 釘住、人工 0）→ `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261022-md7-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 17161–17170、b 17171–17180、c 17181–17190、d 17191–17200、e 17201–17210、鉤子 17211–17220、寫作 17221–17230、主線 17231–17240。**
---

## 主線策展（不佔條號）
- 策展首輪 43 張（場景挖不到 54，不湊數）；主線再要候補 10 張（無鼓吉他 drone：Roy Montgomery 3、Thisquietarmy 3、Aidan Baker 3、Windy & Carl 1）。53 張全過 moodGuess 邊距檢查（x 1.2–2.4、y 0.9–1.9、z −1.4～−0.5）。汰 8 張：
  - **兇＋拍 2 張**：Nadja《Radiance of Shadows》《Touched》（鼓機＋失真牆，2026-10-22 能量軸新規則有判躁之虞）。
  - **質地貼邊（y 0.9）4 張**：Trent Reznor & Atticus Ross《The Social Network》（含乾淨鋼琴曲與推進的電子曲）、Calla《Televise》（中速鼓、x 2.4）、Mogwai《Atomic》、Low《Ones and Sixes》（稀鼓＋電子拍）。
  - **色溫貼邊 2 張**：Gregor Samsa《Rest》（z −0.5、人聲柔）、This Will Destroy You《This Will Destroy You》（z −0.5、鼓有漸強、x 2.4）。
- **原聲帶 7 張收**（Reznor/Ross《The Girl With the Dragon Tattoo》、Jóhannsson《Mandy》《Prisoners》《Arrival: Complete Score》、Salisbury & Barrow《Annihilation》、Cliff Martinez《Only God Forgives》、Mogwai《Les Revenants》）：MB primary Album＋secondary Soundtrack，照 c101／md4 Akira Yamaoka 先例走一般 Album、不標 §5.6。暗色配樂本是 md14 的場景，但 SCENES 規則「跨組以先出現的批為準」，md7 先收；md14 查池時自然略過。
- **候補與 md10 場景重疊**（Windy & Carl、Roy Montgomery 是 md10「冷的 shoegaze／drone pop」的方向）：同上規則 md7 先收。Pan American、Labradford 偏電子、與 md6（Kranky）可能撞——上線前 grep `curation-md6.json`，撞了以先合併者為準。
- 同一藝人沒有張數上限：Labradford 4、Roy Montgomery 6、Supersilent 3、Tarentel 3、Jóhannsson 3、Thisquietarmy 3、Aidan Baker 3。
- 研究層每支 WebSearch ≤3；facts 必含 2–3 條聲音事實（有沒有鼓、漸強爆發、失真、殘響、低頻、冷暖）；與 moodGuess 不符的標「存疑」。post-rock 特別看：漸強到鼓爆發兇不兇（判躁）、乾淨段落多不多（判輕）、溫暖漸強（判暖）。

## 研究 b 組
- **17171**（Evpatoria Report《Golevka》推翻策展層）：團為瑞士 Yverdon-les-Bains 後搖團（MB、Discogs 一致，2002-01 成軍），非俄國、與 Constellation 無關；團名取自克里米亞 Evpatoria 的 RT-70 天線。Shayo（SHAYO 004）與 2005 年成立。status 標 thin（無樂評原頁、團名由來僅 Discogs 簡介單源、聲音事實無來源）。
- **17172**（moodGuess 存疑：Evpatoria《Golevka》）：Discogs 團介編制含鼓與全套樂團、風格 shoegaze／post rock、自述「寧靜、力量與強度」，無「鼓少」依據。建議主線聽軌後決定汰換。
- **17173**（moodGuess 存疑：GY!BE《Asunder, Sweet and Other Distress》）：外側兩首（約 24 分、占六成）有明顯鼓拍、失真吉他與軍樂式鼓點高潮，開場直接起鼓；僅中間兩首是 drone。「鼓少」不符，x、躁分有風險。
- **17174**（moodGuess 存疑：Barn Owl《Lost in the Glare》）：Discogs 與維基都列 Jacob Felix Heule 打鼓（Jurek：slow, plodding, brooding drums），另有 Farfisa、Juno 60、單簧管、銅鑼、tambura；Jurek 稱「最有動態、最多樣」「最明顯後迷幻」。「無鼓」不符，z 恐偏暖（curatorRisk 成立）。
- **17175**（moodGuess 存疑：Tarentel《The Order of Things》）：Bandcamp 自述不靠失真吉他、編制為弦樂、豎琴、管風琴、號、人聲、鼓組，偏室內樂／電影感；與「回授吉他層疊」不符，z 可能偏暖、y 可能偏輕。廠牌實為 Neurot（NR010），非 Temporary Residence。
- **17176**（GY!BE《G_d's Pee》x 邊距）：雙鼓手、三吉他二貝斯的核心編制，組曲含漸強，Fire at Static Valley 有大鼓；躁分風險不低，主線聽軌決定。
- **17177**（Set Fire to Flames 兩張廠牌）：《Telegraphs》加拿大原廠 Alien8（ALIENCD39，2003-04-08），英國 130701（cd13-03，2003-04-07）；策展層標 130701 只對英國版成立，寫作層避免單押。《Sings Reign Rebuilder》加拿大 Alien8 ALIEN30CD，英國 130701 CD 13-01。
- **17178**（Aarktica《No Solace in Sleep》）：聲音事實（吉他加效果器、無鼓）與失聰起源皆僅 Chain D.L.K. 單一評者加 Discogs 內頁；Penny Black 樂評頁 403 未採。facts 已標為評者說法，寫作層宜保守。
- **17179**（Pan American《Quiet City》）：Textura 評論提到的 Smallholding、Christo en Pilsen 不在本盤曲目表，疑為他張，整篇不採；鼓只在 Inside Elevation、Skylight（Mulvenna）、Het Volk（Hess）三首出現，其餘為電子織體，moodGuess 大致成立。
- **17180**（來源與分數）：Pitchfork、AllMusic、BBC 頁工具抓不到或僅由維基轉述；分數、星等、Metacritic、榜次一律不入 facts。WebSearch 用 3 次（Pan American、Aarktica、Evpatoria）。Barn Owl 封面攝影師 David Muench 不寫「沙漠」（無來源）。九張皆為原創專輯，無選輯、無重複卡、無未發行。
