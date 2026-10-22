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

## 研究 e 組
- **14041**（Across the Red Sea）：原盤 1982 成立（MB 1998 是德國 CD 再版）。與 moodGuess 大致相符；Berry Street 與 Channel One／Harry J 兩地錄混，Sherwood＋Jarrett Tomlinson 署名。濕度為推論。
- **14042**（Showcase）：1982 W-1382 無落差。curatorRisk 的「每首接 dub 段」查無來源（只有六首、無 dub 曲名）。聲音僅 Wackie's 通論（lo-fi），status thin。
- **14043**（Wicked Ago Feel It）：1984 無落差。樂手有 Mittoo 鋼琴與兩支薩克斯風、兩支長號，可能偏明亮，moodGuess「糊厚低頻」存疑（弱）。曲名〈Good Thing Going〉與另一卡同名，勿混。
- **14044**（Fally Lover）：1980 無落差。推翻 moodGuess.why 的「Scientist 混音」：Discogs 混音署 Barnabas，Channel One 錄混，Junjo 製作、Roots Radics 伴奏。聲音為班底通論推論，thin。
- **14045**（Look How Me Sexy）：1982 無落差。推翻「Scientist」：專輯製作人 Linval 自己、混音署 Soldgie；Junjo 只在同名單曲。聲音無樂評，thin。
- **14046**（Suffering）：1981 無落差。推翻「Roots Radics／Channel One」：Discogs 署製作 Flako Palmer、Lloyd Parks／Horsemouth／Junior Marvin、混音 Errol Brown；結構是每首人聲接 dub，支持濕與低頻但無樂評。thin。
- **14047**（Country Life）：年份 1985（Discogs）或 1986（Newtone）未定，建議卡單維持 1985、寫作層不寫確切年。**moodGuess 存疑（強）**：唯一聲音描述是「light, urban-elegant, mellow, clean」，建議重評或汰換。
- **14048**（Shaolin Temple）：1979 無落差。Junjo／Roots Radics／Scientist 僅 Discogs 單源，維基未點名此盤。Levy 當時十五歲、嗓音高亢，慢拍重低頻無證據，moodGuess 存疑（中）。
- **14049**（Playing It Cool & Playing It Right）：1981 無落差。人聲＋dub 交錯、重度疊錄有兩源；z 色溫查無證據，不背書也不推翻。Lloyd Barnes（執行製作）與 Wackie's 的是否同人未證實。
- **14050**：保留未用。

**主線需決定**：14047 建議重評或汰換；14043、14048 弱存疑；14044、14045、14046 班底與策展層敘述不符，鉤子層別寫 Scientist／Roots Radics 於後兩張。

## 研究 d 組
- **14031**（Pure Ranking）：年份 1979 成立（MB／Discogs／Apple 1979，維基 1978）；Discogs 備註 Bullwackie's／King Tubby's 署名；聲音只有 Apple 編輯文字（cavernous congas、嗓音輕飄），thin。moodGuess 存疑（輕度，y 無證）。
- **14032**（Natty Dread a Weh She Want）：原盤廠牌是 Stars（Tappa Zukie 自家），卡單填 New Star 可能是後版，建議主線核對；年份 1978（MB／Discogs），維基寫 1980，寫作層不寫月份。班底含銅管與管風琴，無樂評，thin；moodGuess 輕度存疑。
- **14033**（I Love Marijuana）：年份 1978 無落差；Thompson 自製，Bunny Lee 無署名，卡單 curatorWhy 該句不成立；聲音僅署名推論，thin。
- **14034**（Hulet）：年份 MB／Discogs／Apple 版權 1979、維基與 Apple 發行日 1978，分歧未定，寫作層寫「1970 年代末」；貝斯手身分 Discogs 與維基對不上不寫；thin。moodGuess 輕度存疑。
- **14035**（Miracle）：1996 無落差；孟買弦樂團＋tabla＋On-U 製作；Discogs 標 Dub／Ambient；moodGuess 存疑（中，y 可能不夠重），建議實聽後定；thin。
- **14036**（Jordan）：1976 無落差；製作人是 Pete Weston、非 Perry，多錄音室單曲拼成；moodGuess 輕度存疑；thin。
- **14037**（Tuff Selection）：推翻策展層——無 Roots Radics、非 rub-a-dub；實為 Island／Grove 英國版、King Sounds 製作、Aswad 成員伴奏、帶薩克斯風小號與女聲和聲；卡單 label 填 Taxi、國家 jm 皆與 Discogs 不符。**moodGuess 存疑（強），強烈建議汰換**。
- **14038**（Colombia Colly）：1976 無落差；Black Ark、Perry 製作、念唱盤；Frere-Jones 文的器材描述針對《Arkology》選輯、不專指本盤；status full，濕度為推論，無推翻。
- **14039**（Mundell）：1982 無落差；推翻 curatorWhy「遺作級」——此後還有錄音（維基稱過世時已錄五張），寫作層不寫遺作；Greensleeves 頁「22 歲」與生年對不上，不寫年齡；與 moodGuess 相符，本組最有把握。
- **WebSearch 用量**：3/3（Pure Ranking、Mundell、Colombia Colly 各 1）。其餘靠 Discogs／MB／維基／Apple／Greensleeves 頁。
- **主線需決定**：14037 建議汰換；14035 建議實聽；14031／14032／14034／14036 輕度存疑；14032 卡單 label 改 Stars。

## 主線裁定（研究層交件後）
- **14071**：照研究層的聲音事實汰 10 張（研究稿已從 a–e 檔移除，卡單移到 `dropped-cards.json`）。共同原因：**80 年代 lovers rock 多是合成器、鼓機的數位製作，乾淨明亮**，與池中同類被評輕（y<0.5）一致：
  - Gregory Isaacs《Mr. Isaacs》（a：militant roots、伴奏 high-stepping 不停歇）、《Out Deh》（b：倫敦後補合成器與疊錄、「金屬感合成器」）；Sugar Minott《Good Thing Going》（a：英國 RCA 靈魂翻唱盤、無濕混音跡象）；Matumbi《Point of View》（a：EMI 英倫製作、crisp、polished、帶 swing 與銅管）；Maxi Priest and Caution《You're Safe》（b：Reggae-Pop）；Kofi《Black... With Sugar》（b：鼓機、合成器、稀疏貝斯，Ariwa 回聲墊查無來源）；Deborahe Glasgow（b：硬朗、往 dancehall 靠）；The Mighty Diamonds《Changes》（c：Music Works 中速偏乾淨輕快）；Sandra Cross《Country Life》（e：唯一聲音描述 light、urban-elegant、clean；年份亦未定）；Tony Tuff《Tuff Selection》（d：不是 Roots Radics／rub-a-dub，Island／Grove 英國版、Aswad 成員伴奏＋銅管；卡單廠牌國別亦錯）。
- **14072**：留下但標存疑的（評分照聲音打）：Gregory Isaacs《Cool Ruler》（Channel One rockers、十首短曲）、Dennis Brown《Joseph's Coat》（roots 盤非情歌盤）、Susan Cadogan《Hurt So Good》（靈魂翻唱、嗓音輕柔；Black Ark 錄音無來源）、Sugar Minott《Ghetto-ology》《Wicked Ago Feel It》（後者銅管多）、Rita Marley、Jimmy Riley、John Holt、Aswad 兩張、Burning Spear《Dry & Heavy》（z 風險）、Bunny Wailer（rockers 影響）、Linval Thompson 三張、Johnny Osbourne 兩張、Wailing Souls、Junior Delgado、Bim Sherman《Miracle》、Horace Andy 兩張、Junior Byles、Barrington Levy、Keith Hudson（z 查無）。研究層普遍查不到混音濕度的樂評，存疑多是「無來源」而非「被推翻」，不全汰。最有把握：Wayne Jarrett（彈簧殘響、煙霧、重貝斯）、Hugh Mundell《Mundell》（Scientist 在 King Tubby's 混音）、George Faith（Black Ark）、Jah Lion（Black Ark）。
- **14073**：照研究層改卡單：Rita Marley 廠牌 Shanachie → Tuff Gong（1980 牙買加原盤；Shanachie 是 1981 美國版）；Horace Andy《Natty Dread a Weh She Want》廠牌 New Star → Stars（Tappa Zukie 自家原盤廠牌）；Johnny Osbourne《Folly Ranking》廠牌 Jah Guidance → Positive Sounds（Discogs 主版 JAM1000）。Wayne Jarrett《Bubble Up》原盤 1982 Wackie's《Showcase Vol. 1》、英國版改名——卡面照 MB 盤名，正文交代原名。Bunny Wailer《Sings the Wailers》在 Harry J、Sly & Robbie 伴奏；Hugh Mundell《Time and Place》Mundell 自製、Pablo 編曲；Junior Delgado《Taste of the Young Heart》Dennis Brown 製作；Junior Byles《Jordan》Pete Weston 製作；Linval Thompson《I Love Marijuana》自製；《Fally Lover》混音 Barnabas、《Look How Me Sexy》混音 Soldgie（皆非 Scientist）；Hugh Mundell《Mundell》不寫「遺作」。日期各源不一致的（Mr. Isaacs 已汰、To Be a Lover、Hurt So Good、Pure Ranking、Natty Dread、Hulet）正文只寫年代或不寫年。
- **14074**：本批 **35 張**（不足 45：場景裡 80 年代 lovers rock 那半大多是乾淨數位製作，濕混音人聲盤再往下挖多半找不到封面——Wayne Wade 兩張、Michael Prophet《Righteous Are the Conqueror》——寧缺）。

## 鉤子層（d、e）（14056–14060）
- **14056** 交件：`desc-tools/batches/hooks/add-20261022-ml1-hooks-d.json`（8）、`-hooks-e.json`（8），key 逐字照研究稿、順序不變。預算公式照第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；**thin 卡上限 170、full 卡 230**（hook-base 第 2001-B 條；本批 d、e 的 full 只有 Colombia Colly、Mundell、Across the Red Sea、Keith Hudson 四張）。逐筆（預算／hook 加權／hook 原始字元）：
  - d：Pure Ranking 169／18／25；Natty Dread 158／17.5／25；I Love Marijuana 160／22／30；Hulet 166／23／23；Miracle 163／21／24；Jordan 169／21.5／28；Colombia Colly（full）217／20／25；Mundell（full）229／21／29。
  - e：Across the Red Sea（full）223／15／15；Showcase 165／19／19；Wicked Ago Feel It 161／14／21；Fally Lover 163／21／29；Look How Me Sexy 167／20.5／27；Suffering 165／18／18；Shaolin Temple 169／20／28；Keith Hudson（full）230／24／29。
  - 初稿 thin 卡全數超標（英文專名逐字計，170 很緊），一律整格捨去：Pure Ranking 的 Skylarking 年份、Natty Dread 的 Sly／Robbie 全名與 Zukie 榜首、I Love Marijuana 的皇后區細節與兩位鍵盤、Hulet 的成軍年與 Reuben Campbell（讓給 b 組 Not Satisfied）、Miracle 的弦樂編寫者與混音版專輯、Jordan 的〈Ain't Too Proud To Beg〉、Fally Lover 的樂手名、Suffering 的南非辛巴威版、Shaolin 的 Roots Radics 成軍年、Wicked 的 Owen Stewart。壓完回核：Jordan 的 hook 原靠第四格（健康轉壞），已前移到 g1；Wicked 的 hook 原寫「在布朗克斯」錄音，研究稿未載錄音地，改成只寫 Mittoo 彈鋼琴；Across 的 hook 原寫「倫敦 Berry Street」，facts 未載城市，改用「絲滑嗓音疊在十條硬節奏上」（樂評部落格），錄混分地放進 g3。
- **14057** 骨架歸屬（16 張 16 條，只在擁有的卡寫「這條骨架全批只走本張」）：Pure Ranking＝預示下一個樂種（dancehall）；Natty Dread＝念唱 DJ 自立廠牌當製作人；I Love Marijuana＝歌手第一次替自己製作；Hulet＝地方場景（倫敦 Ladbroke Grove、黑人青年處境）；Miracle＝遠赴他國與當地傳統樂團重錄舊作；Jordan＝出版那年歌手病倒淡出；Colombia Colly＝歌手轉行念唱；Mundell＝換班底後聲音轉向（rockers→sparse rub-a-dub）；Across the Red Sea＝移居海外延續（倫敦 On-U）；Showcase＝歌手兼任工程師＋克難 lo-fi 小廠；Wicked Ago Feel It＝同年單曲成新樂種雛形；Fally Lover＝日後的代表曲早收在此；Look How Me Sexy＝單曲與專輯不同製作人；Suffering＝人聲接 dub 連成一段；Shaolin Temple＝少年歌手的早期盤；Keith Hudson＝逆潮流回頭用舊節奏。**提請主線留意**：「自己製作」本批共四張（a Joseph's Coat、c Dry & Heavy、c Time and Place、d I Love Marijuana）；I Love Marijuana 的面向是「製作人生涯的起點」，其餘三張各有別的主故事，寫作層注意句型別撞。Shaolin（十幾歲）與 a Big Ship（7 歲進 Studio One）同屬「年少」，面向不同（錄音年齡 vs 入行年齡）。
- **14058** 跨組同藝人分軸（讀過 a、b、c 已交的 hooks 檔後配）：Linval Thompson——d I Love Marijuana 帶少年經歷與自製起點、e Look How Me Sexy 帶布魯克林首支單曲與 7 吋／專輯製作人之別、c Baby Father 帶「歌手兼製作人」與 Scientist 底本；Johnny Osbourne——c 帶多倫多生平、e Fally Lover 只用綽號 Dancehall Godfather 與錄混署名；Sugar Minott——a 帶 Black Roots／Youth Promotion、e 只用 Wackie's 樂手與〈Rub a Dub Sound Style〉；Horace Andy——兩張都在 d：Pure Ranking 帶定位（Studio One、預示 dancehall）、Natty Dread 帶班底與製作人 Zukie；Aswad——b 帶三人時期、CBS、Reuben Campbell、10 吋，d Hulet 帶 Ladbroke Grove、Forde 詞曲、黑人青年處境、合成器；Hugh Mundell——c 帶律師獨子、自製、跑者，d 帶 Pablo 首張與 Greensleeves 轉向；Don Carlos——c 帶 Black Uhuru 與 Scientist，e Suffering 只用人聲接 dub 結構與 Flako Palmer 班底；Bim Sherman——e Across 帶出身與移居倫敦，d Miracle 只用孟買錄音。共用敘事的歸屬：Black Ark 器材歸 a George Faith（Jah Lion 只寫後院地點與 Stockhausen 比較）；Perry 替人取藝名歸 a（Jah Lion 不寫改名）；Wackie's 創立與 lo-fi 歸 e Showcase；Roots Radics 1979 年以 Channel One Stars 替 Levy 打底歸 e Shaolin。**逝世**：Hugh Mundell 1983 遇害、Keith Hudson 1984 病逝、Bim Sherman 2000 病逝，皆非遺作、與作品無直接綁定，依反向禁令兩分法 d、e 的 note 都不指派（c 組 Time and Place 也未寫 Mundell 遇害，兩邊一致）；Junior Byles 的健康轉壞與 1976 淡出直接綁定本作出版那年，寫進 Jordan 並標克制。
- **14059** 「他／她」引入法與第二句句型配表（也比對了 a–c 已交的 19 張與已上架的 Aswad《A New Chapter of Dub》、Hugh Mundell《Blackman's Foundation》開頭，避開「X 1975 年成軍於倫敦」「Pablo 在 Joe Gibbs 初遇」兩形）：Pure Ranking＝樂種＋前歷（「X 唱 roots，早在…」）；Natty Dread＝名字直接領句（「唱的人是 X」）；I Love Marijuana＝少年經歷前置；Hulet＝地方＋詞曲欄（「這是倫敦…樂團 X 的歌」）；Miracle＝器物回指（「這些舊歌出自…」）；Jordan＝團體出身（「他組過…三重唱」）；Colombia Colly＝別名（「也叫 Jah Lloyd 的 X」）；Mundell＝首張製作人（「X 的首張由 Pablo 製作」）；Across＝出生地（「X 出身…」）；Showcase＝圈子（「他在紐約 Wackie's 的圈子」）；Wicked＝廠牌關係（「reggae 歌手 X 替…錄音」）；Fally Lover＝綽號（「人稱…的 X」）；Look How Me Sexy＝首支單曲（「X 早年在布魯克林…」）；Suffering＝作曲編曲欄（「曲子由 X 自己…」）；Shaolin＝生年＋樂種（「他 1964 年生於…」）；Keith Hudson＝職業（「當牙醫學徒時…」）。16 種句頭前四字互異，也不與 a–c 的 19 種相同。
- **14060** 自查與腳本：hook 開頭前四字 16 張互異、也不同於 a–c；hook 間中文 4-gram 掃描 d、e 0 條（初稿撞 c 組「自己當製」「自己製作」各一、a 組「後來成了」「與貝斯手」各一，已改 d I Love Marijuana、e Fally Lover、e Showcase 的 hook；剩下兩條「後來成了」「成了他一」在 a 與 c 之間，不屬本組）；d、e 的 hook 對全批 note 的 4-gram 0 條（專名除外）；hook 與自己 note 無逐字重複句；「日」後一字：d、e 的 note 皆無日期，不需配；媒體名與榜單名次不進 note（Apple Music 編輯文字、Sasha Frere-Jones 一律寫成「樂評」或只取描述）；hook 無否定句。`node qa-batch.mjs hooks add-20261022-ml1`：總標記 1——d Pure Ranking「年份?1970」是「發行年寫 1970 年代末」的年代寫法（照主線 14073 只寫年代），屬誤報；`node chk-hook-crossgroup.mjs add-20261022-ml1`：5 組 35 張全部通過。
