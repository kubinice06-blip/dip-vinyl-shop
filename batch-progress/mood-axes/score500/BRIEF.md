# 情緒三軸評分工單（score500，2026-10-15）

你要替一份 50 張專輯的卡單打**情緒三軸**分數。這是 dip vinyl 唱片行的抽卡遊戲資料，分數會決定專輯落在立體星圖的哪裡、屬於八格裡的哪一格。

## 輸入與輸出

- 輸入：`batch-progress/mood-axes/score500/chunk-NN.json`（陣列，每筆 `id, artist, album, year, genres, sub`）。
- 輸出：`batch-progress/mood-axes/score500/out/chunk-NN.json`，**JSON 陣列**，每筆：
  ```json
  {"id":"<照抄輸入的 id>","x":3.4,"y":-0.6,"z":1.2,"why":"≤40 字，說聽起來的依據","conf":"high"}
  ```
  - `x` 1.0–5.0、`y` −2.0–+2.0、`z` −2.0–+2.0，**一位小數**。
  - `conf`：`high`（聽過、有把握）／`mid`（知道風格但不熟這張）／`low`（只能憑藝人與曲風推）。**不知道就標 low，不要裝懂**。
  - `why` 用台灣繁體中文，講聲音（速度、密度、低頻、失真、殘響、音色、氛圍），不講地位、銷量、歌詞故事。
- **每做完 5 張就把目前結果整份寫回輸出檔**（容器會不定時重啟）。
- **若輸出檔已有部分內容，讀進來、跳過已有的 id 接著做，不要從頭重寫。**
- 完成時輸出檔要剛好 50 筆、id 與輸入一一對應。最後回報：筆數、conf 分布、你最沒把握的 3 張。

## 規則

- **只憑你對這張專輯聲音的知識判斷**，不要上網搜尋（整個工作階段共用搜尋額度）。
- 合輯、精選、原聲帶：以收錄曲的**中位數**判，不取最快或最慢的一首。
- 古典：看演出的整體聽感（安魂曲多半靜而冷、交響快板偏躁）。
- 三軸**彼此獨立**：快的不一定重、重的不一定冷。逐軸分開想。
- **不要把經典度、名氣、難不難入耳混進來**：經典不等於暖，難聽不等於冷或重。
- 分數要拉得開：用滿整個範圍，不要全擠在 3／0／0 附近。下方 104 張校正表就是尺。

## 評分說明書（每一級附例）

每軸 1–5 一位小數（Y、Z 用 −2–+2，等價），**只憑聲音**，不看歌詞、不看地位、不看稀有。

**X 能量（靜 1 ↔ 躁 5）**：「放出來身體會不會想動、心跳會不會跟著快」
| 分 | 聽起來 | 例 |
|---|---|---|
| 1 | 幾乎沒拍子、慢、大片留白 | Yutaka Hirose《Nova》、Eno《Discreet Music》、Pärt《Alina》 |
| 2 | 有拍子但鬆、慢速、低密度 | Nick Drake《Pink Moon》、Pole、Slowdive、Nujabes |
| 3 | 中速、一般密度、流行曲速 | Abbey Road、《葉惠美》、《Kind of Blue》偏 2.6 |
| 4 | 快、密、會讓人想跳或甩頭 | 山下達郎、Chic、The Clash、techno |
| 5 | 極快極密極大音壓、不給喘息 | Slayer、Merzbow、Coltrane《Interstellar Space》、Melt-Banana |
硬規則：合輯以收錄曲**中位數**判；一張盤有快有慢取整體印象，不取最快的一首；慢但極大聲（Sunn O)))）是 1–1.5，音壓不等於能量。
**2026-10-22 店主改標準——「兇不兇」優先於「快不快」**：躁（≥3.0）要同時有 (A) 攻擊性：失真 riff 牆、嘶吼／咆哮、刺耳噪音、音壓貼臉；(B) 有打擊在推：鼓或拍子在敲，再慢也算。兩樣都有就是躁，速度只決定高低：慢而兇（doom、sludge、慢速黑金屬、工業碾壓）3.1–3.4，中速 3.5–3.9，快 4 以上。只有一樣不算躁：**有拍沒攻擊性**（dub、dub techno、trip-hop、dubstep、slowcore、shoegaze 柔牆、cloud rap）照原表 2–2.9；**有攻擊沒拍**（Sunn O)))、Earth 2、Khanate、drone doom、噪音牆、暗黑 ambient、現代古典音塊、工業 drone）照原表 1–2，Sunn O))) 仍是 1–1.5。先例：Celtic Frost《Monotheist》2.6→3.4、Electric Wizard《Dopethrone》1.8→3.1、Godflesh《Streetcleaner》2.6→3.4；Sunn O)))、Khanate、Ben Frost、Penderecki 不動。

**Y 質地（輕 −2 ↔ 重 +2）**：「聲音是乾淨輕盈、還是厚重糊爛」
| 分 | 聽起來 | 例 |
|---|---|---|
| −2 | 空氣感、原聲、乾淨、低頻少 | bossa、木吉他、Satie、Bill Evans |
| −1 | 乾淨製作、低頻正常、不失真 | city pop、Motown、cool jazz |
| 0 | 一般搖滾／流行的厚度 | Abbey Road、Thriller、Daft Punk |
| +1 | 低頻厚、有失真或殘響、dusty | hip-hop 取樣、dub、indie rock、post-punk |
| +2 | 失真牆、噪、低頻淹沒、糊到分不出樂器 | Pole、MBV、Sunn O)))、Merzbow、龐克 |
硬規則：看低頻、失真、殘響、壓縮，**不看「重不重要」也不看硬蕊度**；2000 年後母帶音壓高是年代效應，不算重；
流行取樣 hip-hop（De La Soul）是 0，不因為是 hip-hop 就 +1。
**2026-10-22 店主改標準——暖慢的「包覆感」算重**（店主：「落日飛車確實是恍惚（dream pop 大部分也都是恍惚）」）：
質地不只看失真與髒，也看**聲音是不是一層把人包住的霧**。下列四種，就算沒有失真也給 **+0.6～+1.3**：
(1) **dream pop／shoegaze** 的殘響霧與柔牆（Beach House、Cocteau Twins、Mazzy Star、Slowdive 一類，大部分都算）；
(2) **chorus／reverb 夢幻吉他＋厚合成器墊的軟搖滾、AOR、city pop 慢歌**（落日飛車、Men I Trust、Mac DeMarco 偏濕的那幾張）；
(3) **慢板靈魂樂／quiet storm／neo-soul** 的厚低頻、弦樂墊、溫熱混響（Marvin Gaye《Let's Get It On》、Al Green、Anita Baker、Sade、D'Angelo）；
(4) **chillwave／lo-fi R&B** 的糊濾波與磁帶飽和。
仍然算**輕**的：乾淨、空氣感、聲部分明——bossa、原聲民謠、Motown 與 disco 的快歌、乾淨明亮的 city pop 快歌（山下達郎《For You》維持 −1）、cool jazz。
判準一句話：**閉上眼是「被裹住、霧濛濛」→ 重；是「看得清每件樂器、有空氣」→ 輕。** 能量與色溫不因此改。

**Z 色溫（冷 −2 ↔ 暖 +2）**：「這張盤的世界是暖的還是冷的」
| 分 | 聽起來 | 例 |
|---|---|---|
| −2 | 陰、疏離、金屬、沒有人味 | Nico《Marble Index》、Darkthrone、Joy Division |
| −1 | 偏冷、克制、都市夜、電子感 | Kraftwerk、Portishead、minimal techno、Radiohead |
| 0 | 中性、說不上冷暖 | 多數器樂、電子、爵士標準曲 |
| +1 | 溫、有人味、放鬆的笑 | 細野晴臣、Nujabes、Beatles |
| +2 | 甜、熱、擁抱、陽光 | Motown、Stevie Wonder、Getz/Gilberto、山下達郎 |
硬規則：看整體氛圍不看單曲；**不得因經典度高往暖偏、硬蕊度高往冷偏**；器樂與電子預設 0，除非音色明顯偏；
大調≠暖、小調≠冷（Joy Division 有大調歌仍是 −2）。
**2026-10-23 店主改標準——「酸」＝冷＋硬**（店主：「自由爵士類的、或是現代音樂類的（比如 Ligeti）都很酸冷難聽又硬蕊，絕對不會是輕鬆」）：不和諧、無調性、自由即興、噪音質地、刺耳張力的音樂，不管樂器原聲或電子、混音溫不溫潤，色溫一律 ≤ −1.2；**安靜但有寒氣的也算酸**（陰森、駭人、無調、疏離）。能量照 10-22 標準：有鼓／律動在推才算躁（≥ 3.1）；音塊、drone、長段留白後的驟然爆裂都**不算推力**——Ligeti《Atmosphères》、Penderecki《Threnody》、Scott Walker《The Drift》（店主 10-23：「The Drift 頹靡沒錯」）、Sunn O))) 都留靜。自由爵士（Ayler、Cecil Taylor、Brötzmann、AACM、歐洲自由即興）、無調現代音樂（Ligeti、Penderecki、Xenakis、Stockhausen）、noise／power electronics、musique concrète、no wave、嘶吼的 fire music 都是酸。**不是酸**：溫暖的靈性／調式爵士（A Love Supreme、Journey in Satchidananda）、後咆勃、ECM 抒情、cool jazz、極簡（Reich、Glass、Pärt）、新古典與配樂、印象派與浪漫派。同一張有酸有暖（Pharoah《Karma》）酸優先。先例：Marion Brown《Geechee Recollections》放鬆→冷冽。



## 八格（供你對照，不必輸出）

能量 x ≥ 3.0 為「躁」否則「靜」；質地 y ≥ 0.5 為「重」否則「輕」；色溫 z ≥ 0 為「暖」否則「冷」。
放鬆＝靜輕暖、平靜＝靜輕冷、恍惚＝靜重暖、頹靡＝靜重冷、雀躍＝躁輕暖、冷冽＝躁輕冷、沸騰＝躁重暖、亢奮＝躁重冷。
**格子是結果，不是目標**：照聲音打分，不要為了湊進某一格調數字。

## 校正表：104 張人工錨點（店主審過，這就是尺）

| 專輯 | x 能量 | y 質地 | z 色溫 | 格 |
|---|---|---|---|---|
| Yutaka Hirose《Nova》 | 1.0 | -1.8 | +0.3 | 放鬆 |
| 吉村弘《Music for Nine Post Cards》 | 1.2 | -1.8 | +0.8 | 放鬆 |
| Aldo Ciccolini《Satie: Gymnopédies / Gnossiennes》 | 1.3 | -1.6 | 0.0 | 放鬆 |
| Arvo Pärt《Alina》 | 1.1 | -1.7 | -0.5 | 平靜 |
| Brian Eno《Discreet Music》 | 1.0 | -1.3 | 0.0 | 放鬆 |
| Bill Evans《Waltz for Debby》 | 2.2 | -1.5 | +1.0 | 放鬆 |
| Chet Baker《Chet Baker Sings》 | 2.2 | -1.4 | +1.2 | 放鬆 |
| Stan Getz《Getz/Gilberto》 | 2.4 | -1.6 | +1.5 | 放鬆 |
| João Gilberto《Chega de Saudade》 | 2.5 | -1.7 | +1.4 | 放鬆 |
| Nick Drake《Pink Moon》 | 1.8 | -1.5 | -0.3 | 平靜 |
| Joni Mitchell《Blue》 | 2.2 | -1.3 | +0.8 | 放鬆 |
| Bon Iver《For Emma, Forever Ago》 | 2.0 | -0.8 | +0.3 | 放鬆 |
| 陳綺貞 Cheer Chen《讓我想一想》 | 2.4 | -1.4 | +0.8 | 放鬆 |
| 鄧麗君 Teresa Teng《淡淡幽情》 | 2.0 | -1.3 | +1.0 | 放鬆 |
| Miles Davis《In a Silent Way》 | 1.8 | -0.6 | -0.3 | 平靜 |
| Elliott Smith《Either/Or》 | 2.3 | -1.0 | -0.6 | 平靜 |
| Pole《2》 | 1.6 | +1.8 | -1.2 | 頹靡 |
| Pole《1》 | 1.5 | +1.9 | -1.4 | 頹靡 |
| Basic Channel《BCD》 | 2.6 | +1.6 | -1.3 | 頹靡 |
| Burial《Untrue》 | 2.8 | +1.5 | -1.0 | 頹靡 |
| Portishead《Dummy》 | 2.2 | +1.4 | -0.9 | 頹靡 |
| Massive Attack《Mezzanine》 | 2.6 | +1.8 | -1.3 | 頹靡 |
| Nujabes《Modal Soul》 | 2.3 | +1.0 | +1.6 | 恍惚 |
| J Dilla《Donuts》 | 2.8 | +1.2 | +1.2 | 恍惚 |
| Madvillain《Madvillainy》 | 2.9 | +1.3 | +0.6 | 恍惚 |
| Nightmares on Wax《Smokers Delight》 | 2.5 | +1.0 | +1.4 | 恍惚 |
| D'Angelo《Voodoo》 | 2.4 | +1.3 | +1.5 | 恍惚 |
| Sade《Love Deluxe》 | 2.0 | +0.8 | +1.4 | 恍惚 |
| King Tubby《King Tubby Meets the Upsetter at the Grass Roots of Dub》 | 2.3 | +1.8 | +0.4 | 恍惚 |
| Slowdive《Souvlaki》 | 2.0 | +1.4 | +0.2 | 恍惚 |
| My Bloody Valentine《Loveless》 | 2.7 | +2.0 | +0.3 | 恍惚 |
| Mazzy Star《So Tonight That I Might See》 | 1.7 | +1.0 | -0.2 | 頹靡 |
| Codeine《Frigid Stars LP》 | 1.4 | +1.5 | -1.5 | 頹靡 |
| Nico《The Marble Index》 | 1.2 | +1.7 | -2.0 | 頹靡 |
| Sunn O)))《Black One》 | 1.2 | +2.0 | -2.0 | 頹靡 |
| The Cure《Disintegration》 | 2.4 | +1.5 | -1.2 | 頹靡 |
| Boards of Canada《Music Has the Right to Children》 | 2.3 | +1.0 | 0.0 | 恍惚 |
| deca joins《Go Slow》 | 2.0 | +0.9 | -0.3 | 頹靡 |
| Fishmans《Long Season》 | 2.3 | +1.0 | +0.8 | 恍惚 |
| The Beatles《Abbey Road》 | 3.1 | 0.0 | +1.0 | 雀躍 |
| Stevie Wonder《Songs in the Key of Life》 | 3.3 | +0.2 | +1.8 | 雀躍 |
| Marvin Gaye《Let's Get It On》 | 2.8 | +0.8 | +1.8 | 恍惚 |
| Simon & Garfunkel《Bridge over Troubled Water》 | 2.7 | -0.8 | +1.0 | 放鬆 |
| The Beach Boys《Pet Sounds》 | 2.9 | -0.4 | +1.0 | 放鬆 |
| Miles Davis《Kind of Blue》 | 2.6 | -0.9 | -0.2 | 平靜 |
| Kraftwerk《The Man-Machine》 | 3.4 | -0.3 | -1.3 | 冷冽 |
| A Tribe Called Quest《The Low End Theory》 | 3.1 | +1.0 | +1.1 | 沸騰 |
| De La Soul《3 Feet High and Rising》 | 3.4 | 0.0 | +1.8 | 雀躍 |
| 周杰倫《葉惠美》 | 3.2 | +0.2 | +0.6 | 雀躍 |
| 羅大佑《之乎者也》 | 3.0 | -0.2 | 0.0 | 雀躍 |
| 落日飛車 Sunset Rollercoaster《Jinji Kikko》 | 2.8 | +0.8 | +1.6 | 恍惚 |
| 細野晴臣《Hosono House》 | 2.6 | -0.8 | +1.3 | 放鬆 |
| はっぴいえんど《風街ろまん》 | 3.0 | -0.5 | +0.6 | 雀躍 |
| Radiohead《OK Computer》 | 3.0 | +0.9 | -1.4 | 亢奮 |
| Curtis Mayfield《Superfly》 | 3.6 | +0.6 | +0.9 | 沸騰 |
| Herbie Hancock《Head Hunters》 | 3.6 | +0.9 | +1.2 | 沸騰 |
| Talking Heads《Remain in Light》 | 3.9 | +0.6 | +0.3 | 沸騰 |
| 山下達郎《For You》 | 3.8 | -0.8 | +1.9 | 雀躍 |
| 大貫妙子《Sunshower》 | 3.1 | -0.6 | +1.4 | 雀躍 |
| 竹内まりや《Variety》 | 3.5 | -0.7 | +1.7 | 雀躍 |
| Chic《C'est Chic》 | 4.0 | -0.4 | +1.8 | 雀躍 |
| Donna Summer《Bad Girls》 | 4.1 | -0.3 | +1.6 | 雀躍 |
| Earth, Wind & Fire《That's the Way of the World》 | 3.8 | -0.1 | +1.9 | 雀躍 |
| The Jackson 5《ABC》 | 4.0 | -0.9 | +2.0 | 雀躍 |
| Daft Punk《Discovery》 | 4.3 | +0.2 | +1.8 | 雀躍 |
| Michael Jackson《Thriller》 | 4.0 | -0.1 | +1.4 | 雀躍 |
| Yellow Magic Orchestra《Solid State Survivor》 | 4.0 | -0.8 | -0.4 | 冷冽 |
| Perfume《Game》 | 4.4 | -0.6 | +0.4 | 雀躍 |
| NewJeans《New Jeans》 | 3.7 | -0.9 | +1.0 | 雀躍 |
| Prince《1999》 | 4.1 | +0.3 | +1.2 | 雀躍 |
| Beastie Boys《Paul's Boutique》 | 3.9 | +0.6 | +1.5 | 沸騰 |
| Fela Kuti《Zombie》 | 4.2 | +0.6 | +1.0 | 沸騰 |
| James Brown《Say It Loud: I’m Black and I’m Proud》 | 4.3 | +0.3 | +1.5 | 雀躍 |
| Ramones《Ramones》 | 4.6 | +1.6 | +0.2 | 沸騰 |
| Sex Pistols《Never Mind the Bollocks, Here's the Sex Pistols》 | 4.4 | +1.8 | -0.6 | 亢奮 |
| Dead Kennedys《Fresh Fruit for Rotting Vegetables》 | 4.7 | +1.5 | -0.5 | 亢奮 |
| Black Flag《My War》 | 4.0 | +2.0 | -1.6 | 亢奮 |
| Jeff Mills《Waveform Transmission Vol. 1》 | 4.7 | +1.4 | -1.6 | 亢奮 |
| 戸川純《玉姫様》 | 4.1 | +1.0 | -0.5 | 亢奮 |
| ヤプーズ《Dadada-ism》 | 4.5 | +1.5 | -0.4 | 亢奮 |
| Joy Division《Unknown Pleasures》 | 3.5 | +1.6 | -1.9 | 亢奮 |
| The Velvet Underground《White Light/White Heat》 | 4.2 | +2.0 | -1.0 | 亢奮 |
| The Clash《London Calling》 | 4.2 | +1.0 | +0.5 | 沸騰 |
| Nirvana《Nevermind》 | 4.2 | +1.7 | -0.3 | 亢奮 |
| The Prodigy《The Fat of the Land》 | 4.7 | +1.7 | -0.8 | 亢奮 |
| Black Sabbath《Paranoid》 | 3.9 | +2.0 | -1.0 | 亢奮 |
| 草東沒有派對 No Party For Cao Dong《醜奴兒》 | 4.0 | +1.5 | -1.2 | 亢奮 |
| NUMBER GIRL《School Girl Distortional Addict》 | 4.6 | +1.7 | -0.3 | 亢奮 |
| 伍佰 & China Blue《樹枝孤鳥》 | 3.8 | +1.3 | +0.2 | 沸騰 |
| Can《Tago Mago》 | 3.6 | +1.3 | -0.6 | 亢奮 |
| 椎名林檎《勝訴ストリップ》 | 4.2 | +1.5 | -0.3 | 亢奮 |
| Swans《The Seer》 | 3.3 | +2.0 | -1.8 | 亢奮 |
| Merzbow《Pulse Demon》 | 5.0 | +2.0 | -1.5 | 亢奮 |
| John Coltrane《Interstellar Space》 | 5.0 | +0.8 | -0.4 | 亢奮 |
| John Coltrane《Ascension》 | 4.9 | +1.6 | -0.2 | 亢奮 |
| Slayer《Reign in Blood》 | 5.0 | +2.0 | -1.4 | 亢奮 |
| Darkthrone《Transilvanian Hunger》 | 4.9 | +2.0 | -2.0 | 亢奮 |
| Melt-Banana《Scratch or Stitch》 | 5.0 | +1.8 | 0.0 | 沸騰 |
| BOREDOMS《Vision Creation Newsun》 | 4.8 | +1.6 | +0.8 | 沸騰 |
| 閃靈 CHTHONIC《賽德克巴萊》 | 4.8 | +2.0 | -1.4 | 亢奮 |
| 溫蒂漫步 Wendy Wander《Spring Spring》 | 2.4 | +1.0 | +1.0 | 恍惚 |
| 溫蒂漫步 Wendy Wander《Midnight Blue》 | 3.2 | +0.4 | +0.6 | 雀躍 |
| Cigarettes After Sex《Cry》 | 1.6 | +1.2 | +0.2 | 恍惚 |
| Cigarettes After Sex《X's》 | 2.0 | +1.2 | 0.0 | 恍惚 |
