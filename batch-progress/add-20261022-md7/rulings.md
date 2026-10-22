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

## 研究 e 組
- **17201**（Thisquietarmy《Hex Mountains》moodGuess 嚴重存疑，建議汰換）：預估「失真吉他 drone、無鼓」，但 Discogs 與 Bandcamp credits 皆有 Scotty Rooney 打鼓，廠方文案寫 uplifting rhythms、vocal screams、heaviest and darkest，兩首為現場錄音，另有 Monarch 兩位成員人聲與銅管；能量軸多半不是靜，易判躁。
- **17202**（Thisquietarmy《Vessels》《Aftermath》moodGuess 存疑）：《Vessels》文案明寫 epic percussion、industrial in percussive force，Discogs 列鼓機程式；《Aftermath》Discogs 列 Drum Programming，文案稱 light and heavy。兩張都不是無鼓，是否偏躁無樂評可證，建議主線試聽再定；《Hex Mountains》優先汰換。
- **17203**（Aidan Baker《Green & Cold》moodGuess 存疑）：Bandcamp 與 Discogs 皆列 drums、vocals、bass、flute，Bandcamp 稱 ambient/shoegazer/post-rock「songs」，非無鼓 drone；Bandcamp 曲長與 MB CD-R 版不同，facts 不寫曲長。《Ice Against My Skin》（電吉他、voice、tape loops，無鼓）與《Field of Drones》（單吉他、2003 Om Festival 三小時演出節錄）與預估相符。
- **17204**（Windy & Carl《Consciousness》z 色溫存疑）：無鼓三處一致（維基、Discogs 簡介、Prog Archives），但 Tape Op 寫 warm thawing guitar、廠商轉引 Boomkat 稱 bright airy，整體偏暖或中性，與預估 z −0.6 的冷有落差；可能更近恍惚（ml）。Roy Montgomery 兩張：《Allegory》credits 僅吉他與管風琴、四軌錄音，無鼓為推測；《Camera Melancholia》聲音來源只有藝人層級描述，status thin。
- **17205**（來源限制）：Wikipedia 429、AllMusic 403、Grapefruit／Midheaven 頁 404／429；WebSearch 用 3 次（Allegory、Camera Melancholia、Consciousness）。《Camera Melancholia》零售商「雙專輯、愛與失去的冥想」文案來源頁已失效，不入 facts；獻詞僅寫日期。Roy Montgomery 生地維基（倫敦）與 Discogs（基督城）不一致，採維基並只寫遷居。評分、星等不入 facts（AllMusic 4.5 僅維基轉述）。

## 研究 a 組
- **17161**（moodGuess 存疑：Labradford《fixed::context》）：Pitchfork 明說吉他音色「溫暖」、早期 60 年代納許維爾味，z 預估 −1.0 恐偏冷、可能落微暖；〈Up to Pizmo〉另有貫穿的低音重擊（非鼓）。無鼓成立（Discogs 人員表僅三人）。
- **17162**（年份：fixed::context）：卡單 2000＝英國 Blast First 首發（Discogs 版本表），美國 Kranky 版與維基百科為 2001（Pitchfork 樂評 2001-02-20）。維持 2000 或改 2001 由主線定；錄音者為 Steve Albini、2000-07 錄於芝加哥 Electrical Audio（Discogs 註記與 credits，單源）。
- **17163**（moodGuess 輕微存疑：Labradford《E luxo so》）：原聲鋼琴、弦樂四人、洋琴使質地偏乾淨，y 可能偏輕；第三首被 Pitchfork 稱「福音色彩」，色溫或微暖。
- **17164**（moodGuess 存疑：Roy Montgomery《Temple IV》）：〈Departing the Body〉後半與〈Jaguar Meets Snake〉（約 8 分鐘）被 Pitchfork 形容為龍捲風般靜電與「白指節」回授噪音，能量軸有判躁風險；其餘曲目偏柔，色溫非單一冷。無鼓成立（吉他、四軌、部分 Moog）。年份 1996（Kranky 首發）對，錄於 1995-01。
- **17165**（moodGuess 存疑：Pan American《The River Made No Sound》）：Exclaim! 稱 Nelson 為「rhythmic ambient」分身、goout.net 稱專輯以「脈動極簡節奏」為特色，Nelson 自述「更多演奏、更少編程」並加入鋼琴音色；並非無鼓／鼓稀，x 預估 2.0 恐偏低，建議主線聽軌後決定汰換。
- **17166**（Roy Montgomery《Silver Wheel of Prayer》thin）：樂評正文取不到（Bandcamp／Discogs 頁／Wikipedia 受阻，WebSearch 一次無果）；僅有 MB 曲目、Discogs 錄音註記與人員表（1998-10 Lyttelton 四軌、2000-01 Nightshift 混音、Rickenbacker 十二弦、Teisco、E-Bow、Farfisa）。無鼓由人員表歸納，聽感無佐證；status 標 thin。
- **17167**（Windy & Carl《Antarctica》）：維基二人組條稱 maxi-EP，專輯條與 Discogs／MB 為 Album（三首 41 分、第三張專輯），卡單 Album 成立。z（冷）僅有「冰川」比喻佐證，為推論。Scaruffi 認為鍵盤居前景、吉他退後（單一異見，未採）。Pitchfork 評分與 2016 榜次只寫 notes。
- **17168**（Roy Montgomery 三張卡掛 country us）：藝人為紐西蘭人（基督城）；卡單 country 欄只影響商店分區，非本層職責，供主線知悉。《Scenes From the South Island》的「簡樸、電氣干擾」描述出自 Pitchfork 對同公寓同期《Temple IV》的文章，facts 已明寫。
- **17169**（Labradford 四張）：A Stable Reference 發行日 MB 5/26、維基 5/23，facts 只寫年份；英國版 Discogs 列 Flying Nun。Labradford 自題專輯與 A Stable Reference 的「無鼓」由 Discogs／維基人員表歸納（只列 Brown、Donne、Nelson）。AllMusic、Kranky 官網（403）、Bandcamp 抓不到，Raggett 句引自維基轉述。
- **17170**（來源與用量）：WebSearch 用 3 次（Labradford 自題、Roy Montgomery Silver Wheel〔無果〕、Pan American River）。九張皆為原創專輯，無選輯、無重複卡、無未發行；年份、廠牌僅 fixed::context 年份一處待定，無推翻廠牌。分數、星等、榜次一律不入 facts。

## 研究 c 組
- **17181**（Supersilent《1–3》moodGuess 嚴重存疑，建議汰換）：策展預估「電子低鳴、打擊稀、陰冷」，但 Scaruffi 與 Wikipedia 均描述為暴力嘈雜的爵士搖滾，有噪音牆、痙攣式鼓聲，鼓手 Vespestad 為正式成員；188 分鐘大半判躁，僅 2.1、3.3 前段安靜。
- **17182**（Supersilent《4》moodGuess 存疑，建議汰換或降級）：Scaruffi 寫 4.2 堆成部落式狂歡、4.3 強調打擊、4.6 歡快如拉丁海灘，非陰冷；比首張克制但鼓仍是主成分。
- **17183**（Supersilent 年份與「廠牌第一張」）：《1–3》Wikipedia 寫 1997，MB／Discogs 首發 1998-01-12（版權標 1997），卡單 1998 不推翻。團條稱 1–3 為 Rune Grammofon 首發，廠牌條卻寫 1998 年成立，依規退成只寫目錄號 RCD 2001。《4》Wikipedia 內文日期誤植，取 Discogs／MB 的 1998-11-23。
- **17184**（Calla《Scavengers》廠牌推翻）：卡單 Quatermass 只是比利時 2001 再版（QS 106 lp，換掉第 9、10 首）；原版與 MB 首發為 Young God Records（YG15，2001-01-16）。建議卡面改 Young God；Discogs 主發行年 2000 與 MB 2001 不一致，以 MB 為準。聲音來源僅 Wire 現場評，facts 已註明。
- **17185**（Piano Magic《Writers Without Homes》廠牌推翻）：卡單「Labels」是歐陸 Virgin 系壓片；原版為 4AD（CAD 2209 CD，2002-06-10）。建議卡面改 4AD，年份不變。
- **17186**（Piano Magic《Part Monster》多廠牌並存，未推翻）：MB 首發義大利 Homesleep（05-14），Wikipedia／Bandcamp 為 Important Records（05-29），Discogs 主版為西班牙 Green UFOs（05-21），皆真實；卡面取哪個由主線定。「輕、弦樂」小幅存疑：實際為完整樂隊加小號、低音大提琴。
- **17187**（Tarentel 兩張 moodGuess 小幅存疑）：《From Bone to Satellite》有鼓手（trap kit），Scaruffi 點出〈For Carl Sagan〉鼓聲強勁；《We Move Through Weather》Discogs 風格為 Experimental／Ambient，編制含鼓與小提琴，長曲後半被評為嘈雜。皆建議主線聽過再定。《FBTS》發行量 Discogs 4500 對 Wikipedia 1000，未寫進 facts。
- **17188**（This Will Destroy You《Tunnel Blanket》）：暗、drone、厚成立；「慢鼓」小幅存疑（〈Black Dunes〉長漸強後有強烈高潮，僅聽眾評論佐證）。Monotreme 為 MB 首發，卡單成立。訪談取 Punknews（Brian Shultz），成員自述需標明。
- **17189**（Mogwai《Les Revenants》）：鼓少、不爆發成立，但 Observer 評語提到「一些溫暖」，z 預估可能偏冷。配樂走一般 Album，不標 §5.6。評論全轉述自 Wikipedia，Pitchfork／AllMusic 此環境抓不到。
- **17190**（來源與用量）：WebSearch 用 3 次（Tarentel FBTS、Supersilent 1–3、Calla Scavengers）。Pitchfork、AllMusic、Guardian、BBC、web.archive.org 皆抓不到；Wikipedia raw 與 MB 偶發限流已重試。九張皆為原創專輯（Mogwai 為原聲帶），無選輯、無重複卡，各 11–12 條 facts。

## 研究 d 組
- **17191**（Arrival: Complete Score 身分存疑，建議汰換或改掛官方原聲帶）：MB RG 0ae66bb6 底下唯一 release「Arrival: Complete Motion Picture Score」（2017-07-08、XW 數位、22 軌約 60 分 13 秒）status＝Bootleg、無廠牌、無 url 關聯；找不到 Deutsche Grammophon 發行「Complete Score」的來源（WebSearch、iTunes、Discogs 皆無，Discogs 網頁 403）。Wikipedia 只有 DG 2016-11-11 的 20 軌官方原聲帶。卡單「2017／Deutsche Grammophon」無來源支持，推翻策展層；facts 寫官方原聲帶與配樂本身，status thin。可逆（改 manifest 欄位或汰換，先例：策展層出格即汰）→ 交主線決定，若保留建議改掛官方 2016 原聲帶重取 mbid。
- **17192**（Supersilent《6》）：錄音 2001-12-03 到 07、Athletic Sound（Wikipedia 寫 Halden、Discogs 只寫錄音室，合併採用）；未推翻。Alarmprisen 傳聞無來源，不寫。moodGuess 存疑：Ink19「冰冷卻帶輓歌式暖意」、Tiny Mix Tapes 有「溫暖空氣」，且有鼓手在場，z −1.2 與「鼓偶現」偏樂觀。
- **17193**（Ghosts I–IV）：36 軌、dark ambient 成立；打擊為現成物件、稀少；但曲長混雜、Cortini 合成器段落未必冷，冷度為樂評推論。獎項兩項葛萊美皆為提名未得獎（51 屆）。
- **17194**（Dragon Tattoo 葛萊美屆次更正）：Wikipedia 該頁表格寫 2013 年 2 月、導言寫 2012；查第 54 屆（2012-02）該類得主是《The King's Speech》，故本片得獎在第 55 屆（2013）。金球、BAFTA 為入圍；無奧斯卡提名。〈Immigrant Song〉是唯一明顯躁段，moodGuess 大致成立。
- **17195**（Mandy moodGuess 中度存疑）：樂評明說「突然爆出的打擊」「doom 金屬 riff」「工業金屬式」，另有附加曲〈Chainsaw Fight〉；能量軸可能高於預估，主線評估是否判躁。辭世、遺作已標年份（作品直接綁定）。
- **17196**（Prisoners）：Wikipedia 與 MB 差一天（09-16／09-17），寫「2013 年 9 月」。來源未提鼓，facts 不寫「無鼓」，只寫打擊由 Jóhannsson 本人演奏；聖樂取向與「美、脆弱」措辭使色溫可能偏溫，仍偏冷但無直接來源。
- **17197**（Annihilation moodGuess 中度存疑）：原聲吉他被樂評稱「撫慰」「民謠式」，z −0.9 貼邊且可能偏暖；〈The Alien〉合唱與 Shimmer 失真合成器較躁。鼓的有無無來源。Barrow 2019 年 Lil Pump 取樣爭議屬無關後續，不寫。
- **17198**（Only God Forgives）：MB 首發為 2013-05-20 法國版 Wild Bunch AG／Gaumont，卡單 label 相符；Milan 美版同日。有〈Wanna Fight〉、club mix（豪華版）與泰式卡拉 OK 人聲歌，並非全程靜，x 2.2 貼邊、冷度無色溫來源，moodGuess 存疑。
- **17199**（Roy Montgomery）：身分相符（1998-04-13、Drunken Fish DFR-41、Nightshift Studios 基督城）。「通常不放鼓」出自 Scaruffi 轉載的 Blow Up 訪談且未指名本張，facts 標「自述」；專輯樂評僅得 WebSearch 摘要（Broward Palm Beach 403），以「樂評說」帶過，冷度無來源證實。
- **17200**（來源與用量）：WebSearch 用 2 次（Supersilent 6、Arrival Complete Score）加 1 次（Montgomery）共 3 次；其餘為 MB API、Discogs API、Wikipedia（WebFetch）、Ink19、Tiny Mix Tapes、Scaruffi。Wikipedia 的 API 直連被限流（429），改走 WebFetch。QA：facts 9–10 條、全 https、`qa-batch.mjs research add-20261022-md7` 全通過。

## 主線裁定（研究層交件後）
- **17231**：照研究層的聲音事實汰 7 張（卡單與研究檔已移除，原卡存 `batch-progress/add-20261022-md7/dropped-cards.json`）：
  - **有鼓又兇／打擊推進 4 張**：Supersilent《1–3》（暴力嘈雜爵士搖滾、噪音牆＋痙攣式鼓，188 分鐘大半判躁）、Supersilent《4》（部落式狂歡、強調打擊，4.6 像拉丁海灘——也不冷）、Thisquietarmy《Hex Mountains》（真鼓手 Scotty Rooney、嘶吼、「heaviest and darkest」、兩首現場）、Thisquietarmy《Vessels》（epic percussion、鼓機程式）。
  - **編制與預估不符 1 張**：Aidan Baker《Green & Cold》（有鼓、人聲、貝斯、長笛，Bandcamp 自稱 songs，非無鼓 drone）。
  - **偏暖 1 張**：Windy & Carl《Consciousness》（樂評 warm thawing guitar、bright airy，落恍惚風險）。
  - **身分不成立 1 張**：Jóhann Jóhannsson《Arrival: Complete Score》（MB 唯一 release 是 Bootleg、無廠牌無網址；DG 只發過 2016 年 20 軌官方原聲帶。不改掛 2016 版：《Arrival》官方盤含 Max Richter〈On the Nature of Daylight〉首尾，且池中 Jóhannsson 已收兩張同期配樂，不硬補）。
- **17232**：汰 7 後回補 5 張主線先前只因「邊距較小」汰掉、但都在策展邊距內的（x ≤ 2.7、y ≥ 0.8、z ≤ −0.3）：Mogwai《Atomic》、Low《Ones and Sixes》、Calla《Televise》、This Will Destroy You《This Will Destroy You》、Trent Reznor & Atticus Ross《The Social Network》；同位置替入 c 2、d 1、e 2，派一支補研究 append。Nadja 兩張（兇＋拍）、Gregor Samsa《Rest》（柔人聲偏暖）仍不收。全批 43 張（場景挖不到 45，不湊數）。
- **17233**：留下但標存疑（評分照聲音打）：Pan American《The River Made No Sound》（「脈動極簡節奏」，無攻擊性照規則判靜）、Roy Montgomery《Temple IV》（〈Jaguar Meets Snake〉回授噪音，但無鼓照規則判靜）、Labradford《fixed::context》（Pitchfork「溫暖」吉他）、《E luxo so》（原聲鋼琴弦樂偏乾淨）、GY!BE 兩張（外側長曲有鼓拍高潮、雙鼓手）、Evpatoria Report（全樂團編制）、Barn Owl（慢而拖沓的鼓、Farfisa）、Tarentel 三張、TWDY《Tunnel Blanket》、Jóhannsson《Mandy》（doom riff 爆發段）、《Annihilation》（原聲吉他段偏撫慰）、《Only God Forgives》（泰式卡拉 OK 人聲曲）、Supersilent《6》、Mogwai《Les Revenants》（「一些溫暖」）、Thisquietarmy《Aftermath》（鼓機程式）。
- **17234**：照研究層改卡單：Calla《Scavengers》廠牌 Quatermass → Young God Records（YG15；Quatermass 是比利時再版）、Piano Magic《Writers Without Homes》Labels → 4AD（CAD 2209）、Set Fire to Flames《Telegraphs…》130701 → Alien8 Recordings（加拿大原廠）、Labradford《fixed::context》Kranky → Blast First（2000 英國首發；Kranky 美版 2001，卡面年份取 2000）、Roy Montgomery 國別 us → nz、The Evpatoria Report 是瑞士團（Yverdon-les-Bains），與 Constellation 無關、Tarentel《The Order of Things》廠牌 Neurot。《The Girl With the Dragon Tattoo》葛萊美屆次以第 55 屆（2013）為準（維基頁內矛盾）。Piano Magic《Part Monster》多廠牌並存，照 MB 首發 Homesleep。Supersilent《6》照 MB 年份。

## 研究 候補 5 張
- **17235**（moodGuess 存疑，回補五張的聲音事實）：Low《Ones and Sixes》Clash 明寫失真的鼓持續行軍、副歌厚牆、〈Landslide〉猛烈吉他，Northern Transmissions 提到電子打擊，「稀鼓」不符，易判躁風險高於策展層估計；Calla《Televise》鼓手兼程式 Magruder 全程有拍、〈Strangler〉有失真 riff、壓軸〈Televised〉為有律動的 rave-up，且 Ink 19「warm, jazzy guitar」顯示色溫未必全冷，x 2.4 貼邊疑慮成立；TWDY 自題專輯 Andrew Miller 在場、動態對比大（維基稱團特色，Rock Sound「末日配樂」），各曲漸強強度與色溫無逐曲來源；Reznor/Ross《The Social Network》電子為基底、質地「有機」、含鋼琴版（官網串流版標「No Piano」）、Ebert「headlong momentum」、〈Mountain King〉有律動，鼓與低頻無來源，y 貼邊；Mogwai《Atomic》僅有 PopMatters「能量壓在輕聲低語」與銅管、弦樂曲目，鼓、低頻、色溫皆無來源，銅管與弦樂曲目是否偏暖不能證實。建議主線聽軌決定；Low 與 Calla 最值得先複查。
- **17236**（廠牌與身分）：TWDY 卡單 Dark Operative 是團自己的廠牌，MB 顯示 2018 年重發（OPS010）才掛該牌，2008 原版為 Magic Bullet（MBL100），建議卡面改 Magic Bullet Records（可逆）。Reznor/Ross 的 MB first-release-date 2010-09-17 是五首 sampler（Promotion），正式專輯 09-27／28，年份 2010 不變。其餘四張年份、廠牌、原創專輯皆相符，無選輯、無重複卡；配樂兩張（Atomic、Social Network）走一般 Album 不標 §5.6。WebSearch 用 3 次（Low、Calla、TWDY），Pitchfork／AllMusic／Drowned in Sound 皆取不到，評分一律不入 facts。QA：`qa-batch.mjs research add-20261022-md7` 全通過；c、d 組各 9 筆，e 組 7 筆（e 組卡單本批 7 張）。
- **17237**（主線，補研究交件後）：再汰 2 張——Low《Ones and Sixes》（失真的鼓持續行軍、副歌厚牆、電子打擊，兇＋拍判躁之虞）、Calla《Televise》（鼓手全程有拍、開場失真 riff、壓軸 rave-up，吉他「warm, jazzy」）。留 Mogwai《Atomic》、TWDY 自題、《The Social Network》標存疑。改卡單：TWDY 自題廠牌 Dark Operative → Magic Bullet Records（MBL100；Dark Operative 是 2018 重發）。**全批 41 張**（場景挖不到 45，不湊數）。
