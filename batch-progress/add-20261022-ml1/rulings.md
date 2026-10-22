# add-20261022-ml1 裁定（情緒薄格策展線・恍惚：lovers rock＋80s rub-a-dub＋roots 二線）

> 店主 2026-10-22「新增的專輯數太少了 與雀躍嚴重不平衡」→ 三格各補到約 2,000；場景佇列 `batch-progress/mood-cells-20261022/SCENES.md`，交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**恍惚＝靜（x<3.0）＋重（y≥+0.5）＋暖（z≥0）**；策展邊距 x ≤ 2.7、y ≥ +0.8、z ≥ +0.3。恍惚線第一次跑（與 ml2 同一工作階段）。
> 策展：`curation-ml1.json`（54 張＋主線回饋後補 11 張＝65：lovers rock、rub-a-dub、roots、濕混音人聲盤）→ `master-ml1.json`（MB 回查 65/65 釘住、人工 0；flags 10 全是「卡單填原盤年、MB 首發日是再版」）→ `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261022-ml1-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 14001–14010、b 14011–14020、c 14021–14030、d 14031–14040、e 14041–14050、鉤子 14051–14060、寫作 14061–14070、主線 14071–14080。**
---

## 主線策展（不佔條號）
- 54 張全過 moodGuess 邊距（x 2.1–2.5、y 1.0–1.5、z 0.7–1.7）。**主線對照池中同藝人已評分的三軸**：本場景最大風險是**質地 y**——池中 lovers rock／rocksteady 普遍被評輕（John Holt −0.8～−0.7、Ken Boothe −0.8、Marcia Griffiths −0.5、Beres Hammond −0.1、Dennis Brown 多數 0.2–0.4、Gregory Isaacs《The Lonely Lover》0.2、Culture 0.3–0.4、Gladiators 0.3–0.5、Israel Vibration 0.2–0.4、Freddie McGregor 0.6）；過線的是 dub 味重的（Aswad《A New Chapter of Dub》1.5、Burning Spear 0.8–1.6、Horace Andy《Dance Hall Style》1.3、Wailing Souls 0.7–0.9）。另 Burning Spear 池中 z 0–0.6，色溫也有風險。策展層 y 估 1.0–1.1 明顯偏樂觀。
  - **第一輪汰 12 張**（池中同藝人 y 普遍 <0.5，或乾淨 rocksteady）：John Holt《Time Is the Master》、Ken Boothe《Who Gets Your Love》、Marcia Griffiths《Steppin'》、Beres Hammond《Soul Reggae》、Pat Kelly《Lonely Man》、Carlton and the Shoes《Love Me Forever》、The Gladiators《Naturality》、Culture《Cumbolo》、Israel Vibration《Why You So Craven》、Eek-A-Mouse《Skidip!》（池中 x 2.9、輕快）、Dennis Brown《Yesterday, Today and Tomorrow》《Love Has Found Its Way》。
  - 回頭叫策展代理補 11 張（條件收緊：混音本身濕、霧、低頻淹——Black Ark、Wackie's、Ariwa、Junjo＋Scientist、On-U），全收進 master。
  - **第二輪汰 8 張湊到 45**（同藝人過多、偏乾淨或色溫偏冷的先汰）：Burning Spear《Social Living》《Hail H.I.M.》、Dennis Brown《Spellbound》《Just Dennis》、Gregory Isaacs《Extra Classic》《More Gregory》、Freddie McGregor《Come On Over》《Love at First Sight》。
- **年份**：策展層填原盤年、MB first-release-date 是再版的 10 張（Joseph's Coat 1979／MB 1980、Good Thing Going 1981／1988、Big Ship 1982／1988、To Be a Lover 1977／1978、Black... With Sugar 1989／2008、Inchpinchers 1983／1996、Sings the Wailers 1980／1990、Across the Red Sea 1982／1998、Country Life 1985／1996 等）——研究層逐張交叉核對原盤年，推翻就寫進報告，主線改卡單。
- **留下的邊緣張**（研究層要特別寫聲音事實）：乾淨 lovers rock 那半——Maxi Priest and Caution、Rita Marley、Deborahe Glasgow、Jimmy Riley、Sugar Minott《Good Thing Going》、Freddie McGregor《Big Ship》、Dennis Brown《Joseph's Coat》（y 可能 <0.5）；Burning Spear《Dry & Heavy》（z 可能近 0）；Keith Hudson（情緒沉，z 風險）；Jah Lion（DJ 念唱）。
- `genres` 一律 `world`（池中 reggae 慣例）。
- 研究層每支 WebSearch ≤3；facts 必含 2–3 條聲音事實（混音濕度、低頻、殘響、弦樂／鍵盤墊、溫度）；與 moodGuess 不符的標「moodGuess 存疑」——**特別是製作乾淨、明亮、輕快的**。


## 研究 a 組
- **14001**（Cool Ruler）：伴奏與製作班底推翻策展層——Discogs／維基皆為 The Revolutionaries、Channel One 錄混、Gregory Isaacs 自製，Soul Syndicate 不在盤中。moodGuess 存疑（慢、厚貝斯、濕混音皆無來源）。年份 1978 無落差。
- **14002**（Mr. Isaacs）：來源是 militant roots、伴奏「high-stepping」，非慢拍 dub 殘響；強烈建議汰換或重評。年份 MB／Discogs 1978、維基與 uDiscover 1977，分歧未定，寫作層不寫確切年。
- **14003**（Joseph's Coat）：原盤年 1979 成立（MB 1980 是葡萄牙 WEA 版）；製作人是 Dennis Brown 自己，非 Joe Gibbs；roots 專輯而非情歌盤，moodGuess 存疑，建議重評。
- **14004**（Ghetto-ology）：1979 Trojan TRLS 173 無落差；King Tubby's 混音僅 Discogs 單源；「重做 Studio One 節奏」查無來源；Discogs 製作人欄與一般說法不符，facts 不寫製作人。
- **14005**（Good Thing Going）：原盤年 1981 成立（MB 1988 是 Heartbeat 美版）；完全查不到聲音描述，status thin；英國 RCA 靈魂翻唱 lovers 盤，疑偏乾淨明亮，建議汰換。
- **14006**（Big Ship）：原盤年 1982 成立（MB 1988 為 CD）；Roots Radics＋Linval Thompson，維基寫 Scientist 混音、Discogs JA 版寫 Soldgie／Oswald Palmer，不一致；牙買加九首與英國十首曲目不同，寫作層只用共有曲名。與預估相符，未存疑。
- **14007**（Hurt So Good）：Trojan LP 原名《Susan Cadogan》（TRLS 122），年份 1975（MB）或 1976（Discogs／維基）；無來源說在 Black Ark 錄；moodGuess 存疑（靈魂翻唱、嗓音輕柔，濕度無據）。
- **14008**（To Be a Lover）：Discogs 明載 Black Ark 錄音、Perry 製作；年份 1977（Discogs）或 1978（MB／維基）分歧，寫作層寫「1970 年代後期」。與預估大致相符，濕度為推論。
- **14009**（Point of View）：年份 1979-10-12 無落差；製作人是 Errol Thompson 與 Matumbi 自己，非 Bovell；樂評形容節奏俐落、帶 swing 與銅管、polished——moodGuess 存疑（強），建議汰換。Jo-Ann Greene 評論取自轉載頁。

**主線需決定**：14002、14005、14009 建議汰換；14003、14007 建議重評。

## 研究 c 組
- **14021**（Don Carlos《Day to Day Living》）：1982 Greensleeves GREL 45 無落差。Junjo 製作、Roots Radics、Scientist 混音（Discogs）；Greensleeves 頁與 unitedreggae 描述：〈Street Life〉稀疏鼓貝斯、〈Hey Mr. Babylon〉有管風琴與號角、較明亮；y、z 可能略低於預估，邊緣。
- **14022**（Linval Thompson《Baby Father》）：1983 GREL 51 一致。聲音事實薄（status thin）：無樂評，Discogs 無混音署名，moodGuess 的「Scientist 混音」未證實，存疑。
- **14023**（Johnny Osbourne《Folly Ranking》）：年份 1980 一致，但卡單廠牌「Jah Guidance」未證實（Discogs 主版 Positive Sounds JAM1000，roots-archives 列 Jammys JAM 1000），主線核對；Roots Radics 伴奏、厚貝斯殘響皆無來源，thin，moodGuess 存疑。
- **14024**（Wailing Souls《Inchpinchers》）：原盤 1983（Discogs GREL 47，標籤版權 1982、封面 1983；英文維基寫 1982；MB 1996 為再版），維持 1983。混音署名 Errol Thompson 與 Oswald Palmer，非 Scientist，y 可能偏樂觀，存疑（弱）。
- **14025**（The Mighty Diamonds《Changes》）：1981 無落差。Gussie Clarke 製作、Sly & Robbie、Willie Lindo 編曲、雙鍵盤，〈Pass the Kouchie〉的原版；曲目中速偏乾淨輕快，moodGuess 存疑（強），建議汰換或重評。
- **14026**（Bunny Wailer《Sings the Wailers》）：推翻策展層——英文維基寫 Harry J 錄音室、Sly & Robbie 伴奏，非 Channel One。原盤 1980（MB 1990 為再版；Discogs master 被綁到 Dancing Shoes 單曲 1981，不可引）。維基稱 dancehall／rockers 影響最明顯，moodGuess 存疑；thin。
- **14027**（Burning Spear《Dry & Heavy》）：1977 一致。自製（Rodney 製作）、雙貝斯雙鍵盤雙吉他加四人號角，Sylvan Morris 錄音；題名「Dry」與「殘響深」不合，z 風險，moodGuess 存疑。
- **14028**（Hugh Mundell《Time and Place》）：推翻策展層——Discogs 製作人是 Hugh Mundell 本人（Mun Rock），Pablo 是編曲、旋律口琴、弦樂與木琴；Pablo 製作的是 Mundell 首張《Africa Must Be Free by 1983》。工程師 King Tubby、Scientist 等五位，與預估（霧、暖）大致相符，濕度為推論。1980 一致。1983 遇害晚於發行，寫作層從簡。
- **14029**（Junior Delgado《Taste of the Young Heart》）：推翻策展層——Discogs 與維基指向 Dennis Brown（DEB 廠牌）製作，非 Pablo（Pablo 合作在 1983 年出獄後）。錄音地 Joe Gibbs、Channel One、Harry J，Errol Thompson 與 Sylvan Morris remix；年份 1979（Discogs；維基文字 1978）。聲音可能偏飽滿明亮，「霧狀低頻」存疑。
- **14030**：保留未用。

## 研究 b 組
- **14011**（Rita Marley《Who Feels It Knows It》）：推翻策展層廠牌——Shanachie 是美國 1981 年起的發行商，原盤 1980 Tuff Gong（牙買加；英國 Trident TLP 001、德國 Strand 同年）。年份 1980 對。維基把它記成 1981 Shanachie 並另列 1980 自題專輯 Trident，實為同一張（Discogs 1980 Trident 版標題即此盤）。名單無 Marcia Griffiths／Judy Mowatt，寫作層不得寫 I Threes 和聲。moodGuess 輕度存疑（曲速與濕度未證）。
- **14012**（Maxi Priest and Caution《You're Safe》）：推翻策展層廠牌——LP 實為 10 Records（Virgin）DIX 11，版面註明 produced for Level Vibes Ltd；建議卡單廠牌改 10 Records。年份 1985 對。Discogs 風格標 Reggae-Pop，y 偏輕風險高，moodGuess 存疑。
- **14013**（Kofi《Black... With Sugar》）：年份 1989 Ariwa（MB 2008 日版是再版，不必改）；curatorRisk 解除。**moodGuess 中度存疑**——來源只證實鼓機、合成器與稀疏貝斯的數位製作（〈Didn't I〉），「dub 回聲墊」查無來源。
- **14014**（Deborahe Glasgow《Deborahe Glasgow》）：1989 Greensleeves 對。Music Works 錄混、Steely 與 Clevie 伴奏、Gussie Clarke 製作；維基明言〈Champion Lover〉聲音硬朗往 dancehall 靠，**moodGuess 中度存疑**（偏明晰數位，非濕霧）。
- **14015**（Jimmy Riley《Rydim Driven》）：1981 Taxi 對（Apple 1982 是再版）。Channel One 錄混，Sly 加 Syndrums、鋼琴與銅管、十首六首翻唱美式靈魂；慢拍與厚貝斯無來源，**moodGuess 中度存疑**（偏緊湊明亮）。
- **14016**（Gregory Isaacs《Out Deh》）：1983 Island 對（正名帶驚嘆號）。維基明載合成器與疊錄在倫敦後補、樂評稱「金屬感合成器」、〈Love Me with Feeling〉帶 disco 元素，混音 Godwin Logie 與 Groucho Smykle；**moodGuess 中度存疑**（Island 打磨過的明亮）。
- **14017**（John Holt《Police in Helicopter》）：1983 Greensleeves GREL 58 對。Greensleeves 官方稱 Rub-A-Dub 與早期 dancehall 的沉重聲音，方向相符；風險在池中同藝人 y 偏輕與銅管、〈I Got Caught〉近 rocksteady，輕度存疑。Rough Trade 頁 429 開不了，引文只來自搜尋摘要。
- **14018**（Wayne Jarrett《Bubble Up》）：**推翻策展層盤名層面**——原盤 1982 US Wackie's WACK 191 正名《Showcase Vol. 1》，《Bubble Up》是英國版改名（Discogs 英國版 1984，WR 191 為 1998 重發）。年份 1982 為原盤年，卡單可保留；寫作層須寫明原名與改名。LargeUp 證實彈簧殘響、煙霧、重貝斯，是 b 組混音最濕的一張，不存疑（但該評是針對單曲〈Bubble Up〉）。
- **14019**（Aswad《Not Satisfied》）：1982 CBS 對。製作 Aswad 與 Reuben Campbell（非 Mad Professor）、附贈 dub 10 吋；策展層「銅管墊」無來源，寫作層不得寫銅管。混音濕度無文字證據，輕度存疑。
- **14020**：保留未用。
- **b 組總結**：推翻策展層 3 處（Rita 廠牌、Maxi 廠牌、Jarrett 盤名）；moodGuess 存疑 8 張（Wayne Jarrett 除外；其中中度存疑 4 張：Kofi、Deborahe、Jimmy Riley、Gregory Isaacs），共同現象是 1981–1989 年的英國與牙買加 lovers rock 多為數位／合成器／鼓機製作，偏乾淨明亮。
