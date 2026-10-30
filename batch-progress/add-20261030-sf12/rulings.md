# add-20261030-sf12 裁定（Spotify 追蹤藝人補卡池・嘻哈、R&B、靈魂、流行、以色列）

> 店主 2026-10-30 `/dip-card-create`：依 Spotify 追蹤藝人補卡池，每位缺漏藝人挑 1–2 張代表作（交接 `batch-progress/spotify-follow-20261030/PLAN.md`）。本工作階段負責 sf11、sf12。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-sf12a.json`（25）＋`curation-sf12b.json`（16）→ 主線汰 5、去重 1（Omar Apollo 兩組都做了，保留 sf12a）→ `master-sf12asf12b.json`（35 張，全部 MB 釘住）→ `pick.json`（35）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf12-cards.json`（35 張；研究 a–e 各 7）。
> **預留：研究 a 49901–49910、b 49911–49920、c 49921–49930、d 49931–49940、e 49941–49950、鉤子 49951–49960、寫作 49961–49970、主線 49971–49980。**
---

## 主線策展（不佔條號）
- **清單 32 位 → 收 30 位、35 張；跳過已在池 0 位；不收 2 位。** 池中近似名逐位排除（Destin Conrad≠Onra、Olivia Dean≠DEAN、Michael Franti & Spearhead≠Antis、My Skin Against Your Skin≠GAI）；Def Squad 是 Erick Sermon、Redman、Keith Murray 的團名，與三人個人卡分開；對 origin/main 與所有 `claude/*` 分支 seed 去重 0 撞。
- **Spotify 藝人頁回查（主線全批 32 位）**：熱門曲發回策展核對。Way Out West＝英國 progressive house 雙人組（〈Tuesday Maybe〉〈Killa〉）；Noblemen 不是以色列，是英國 hip-hop 樂團（MB f822535b），熱門曲〈Chord Stricken〉對上同名盤；My Skin Against Your Skin＝台灣樂團激膚；Onry Ozzborn＝西雅圖 Oldominion／Grayskul 饒舌手。
- **不收**：The Flexibles（MB 與 Discogs 釘不住身分）、KbN（與 Yenmeng Wang 合作的氛圍音樂，身分與封面都釘不住）。
- **一位只收一張（主線汰第二張）**：JMSN 汰《Velvet》留《It Is.》；Mr Twin Sister 汰 Twin Sister 時期的《In Heaven》留 2014 同名盤（改名後首作，掛名與 Spotify 一致）；Onry Ozzborn 三張候選（《The Grey Area》《Nervous Hvnd》《Hold On for Dear Life》）都沒有評論共識，留 2003《The Grey Area》；Dudu Tassa 汰《לולה》留《הגולה》（Kuwaitis 名義另在 sf11）。
- **留兩張的**：KMD（《Mr. Hood》1991＋《Black Bastards》，後者 1994 錄成遭 Elektra 擱置、2001 正式發行，取 2001）、Michael Franti & Spearhead（《Home》1994＋《Stay Human》2001）、Olivia Dean（《Messy》2023＋《The Art of Loving》2025）、Omar Apollo（《Ivory》2022＋《God Said No》2024）、Way Out West（1997 同名＋《Intensify》2001）。
- **Maddie Ashman《Her Side》**：MB 標 EP，8 首、作為主要作品發行，照 CUR-DISPATCH 長 EP 例外收，寫 `releaseException`。
- 交研究層把關：多張廠牌欄空白或待核（Stay Human、Sad Night Dynamite、Beneficiaries、UMC's、J. Valentine、Dudu Tassa、Fortisakharof、激膚）；Destin Conrad《Love on Digital》年份；JMSN《It Is.》正式寫法；激膚《問號》與《安卓雅》何者為代表作；S.C.A.B. 2025 盤 vs 2022 同名盤；The Beneficiaries 國別廠牌；Blubell、Noblemen 封面要從 Apple／Bandcamp 取；Fortisakharof《1900?》盤名寫法與年份。

## 研究 c 組
- **49921**　Home 的 label 由「Boo Boo Wax / Capitol」改為「Capitol」：1994 首版只有 Capitol（MB、維基一致），Boo Boo Wax 是離開 Capitol 之後才成立。首版掛名為 Spearhead，改名「Michael Franti & Spearhead」是因 Capitol 擁有 Spearhead 名稱；正文宜寫明。moodGuess 存疑：reggae 成分在 1997 年才明顯，Home 是 funk／soul／偏爵士的現場樂團聲。
- **49922**　Stay Human 補 label：美國 Six Degrees、澳洲 Boo Boo Wax、另有 Parlophone／EMI 版；建議「Boo Boo Wax / Six Degrees」。主題是死刑與司法不公（另有媒體壟斷、監獄產業），非「反戰」；樂評主列 soul／funk／hip-hop，reggae 不是主軸。moodGuess 存疑（非「陽光 reggae 吉他」，題材沉重）。年份 2001-05-15（維基內文曾誤寫 2000）。
- **49923**　Mr Twin Sister 自題盤 label 由「Domino」改「Twin Group」（MB TWIN0001；Stereogum 寫 Twin Group／Infinite Best）。Domino 只在更早的《Color Your Life》英國版。改名緣由（Twin Sisters 樂團的法律威脅）僅維基單一來源。moodGuess 部分存疑：樂評是半夢半醒的夢幻流行，節拍不算冷艷舞曲。
- **49924**　Olivia Dean《Messy》label 由「Polydor」改「EMI」；Mercury 為 2023 年入圍決選（shortlisted），非得獎，按入圍寫。《The Art of Loving》label Capitol／Polydor 核對無誤；Grammy 最佳新人（2026 年 2 月）、Brit 年度專輯、MOBO 年度專輯為得獎，Mercury 為入圍；Dean 發行後的訴訟與後續成績不進正文。
- **49925**　Omar Apollo《Ivory》label 由「Warner / Stones Throw」改「Warner Records」（MB 與維基皆無 Stones Throw）；《God Said No》Warner 無誤，首發 2024-06-28（MB 6/24 為早期登錄）。《Ivory》曲風跨度大（龐克流行、拉丁 trap、corrido），評分勿只看單曲；《God Said No》樂評是 lo-fi、氛圍、失戀殘骸，moodGuess 部分存疑偏暗。
- **49926**　c 組 7 張 facts 條數 9／9／10／10／10／10／10，status 全 full；未推翻年份與盤名。〈Hole in the Bucket〉Clio 獎說法兩個維基頁互相矛盾，未寫入。

## 研究 d 組
- **49931**　The Beneficiaries《The Crystal City Is Alive》**不是嘻哈**：Jeff Mills（Axis Records）＋Eddie Fowlkes＋詩人 Jessica Care Moore 的底特律 techno＋口語詩專輯（6 首，三首超過 11 分鐘；Axis 官網、RA、Crack）。與 Black Constellation 無關。建議 genre 改 electronic、country us（底特律）、label 補 Axis Records；三軸 moodGuess 依 techno 長篇重估，或主線決定汰換。MB 目錄號 AXCD055 與 Axis 官網 AX087 並列。
- **49932**　The UMC's：策展寫「布朗克斯」，實為史泰登島（維基）。label Wild Pitch（EMI 發行）對；發行日 MB 1991-10-14、維基 10-15，年份不變。卡面名稱建議 The UMC's（MB 為彎引號）。
- **49933**　Saya Gray《SAYA》：策展寫「首張正式專輯」，實為第二張（首張 2022《19 Masters》）；日裔加拿大籍。Polaris 短名單、Juno 提名僅維基單一來源，寫作層用「入圍／提名」。moodGuess 輕度存疑（folk／country 吉他加 808 與搖滾爆發，非純拼貼）。
- **49934**　Sad Night Dynamite《Welcome the Night》：label 空白補 Pigeon Teeth（AWAL 授權；僅 Apple 單一來源）。官方文案稱「未來流行」，moodGuess「躁動失真」輕度存疑，依聽感評分。
- **49935**　S.C.A.B.：維持 2025《Somebody in New York Loves You!》（第三張，Grind Select，MB 釘住），同名 2022 盤評論面證據不足，不翻案；皇后區 Ridgewood 樂團、非同名 scab 朋克，已查清。
- **49936**　Onry Ozzborn《The Grey Area》：label 補 One Drop Records（MB cat 003-02）；XLR8R 等評價正面，「口碑共識薄弱」不成立，保留。Aesop Rock 合作不在本盤。
- **49937**　Puma Blue《In Praise of Shadows》：label Blue Flowers Music（MB 另列 [PIAS]），14 首；無推翻。樂評全文（Pitchfork、AllMusic、Bandcamp）被擋，樂評面 thin，聲音事實來自 The Forty-Five 與維基。
- **49938**　d 組 7 張 facts 條數 10／11／9／10／9／9／8，https 全過，無千分位逗號；status 全 full。Wikipedia 與 MB 為主要來源，AllMusic／Discogs／WhoSampled 403。

## 研究 b 組
- **49911**　KMD《Black Bastards》：策展層 label「Rhymesayers」錯，MB／維基皆無。首次正式發行是 2000-05-15 ReadyRock Records（RR2001，MB 另掛 Metal Face），2001 為 Sub Verse Music 再版（SVM 15，加混音與〈Q3-113〉）。建議卡片 year 2000、label ReadyRock Records；若堅持 2001 則 label 為 Sub Verse Music。MB RG 首發 1994 是 Elektra 試聽版。
- **49912**　KMD《Mr. Hood》：1991 Elektra（60977-2）核實，無推翻；MB 標 K.M.D. 與 UK techno 同名團無涉。
- **49913**　JMSN：正式寫法定案「It Is.」（帶句點、Is 大寫；MB RG 標題小寫 'It is.'，Hypebeast／維基用 'It Is.'）。聲音證據僅 Exclaim! 摘要＋Qobuz 流派（Pitchfork／AllMusic 擋抓），status thin；moodGuess 輕度存疑（證據偏爵士吉他＋福音味靈魂，非策展層的迷幻低音合成器），不汰。
- **49914**　Lausse The Cat：MB／Qobuz 核得 8 首 21:51（策展層『6 與 8 首並存』只核得 8 首）；廠牌 Velvet Blues 單源（Apple 版權行為藝人本人）；曲風來源只標 Hip-Hop／Alternative Rap，策展層 genres 的 soul 無證據，建議拿掉（可逆）。moodGuess 輕度存疑（來源偏憂鬱＋厚重 808，非溫潤），不汰。
- **49915**　Maddie Ashman《Her Side》：EP 標準版 7 首約 30 分鐘（Line of Best Fit／NME），MB 另有 8 首版（多〈So Sick〉）；卡單 releaseType 標 Compilation 疑為誤標，實為 EP，長 EP 例外成立。聲音證據僅敘述性評語，status thin，評分前需實聽。
- **49916**　Marian Hill《Act One》：Atwood 評論有詳細聲音描述（彈指／啪聲／beat drop／即興薩克斯風 Steve Davit）。〈Down〉Hot 100 第 21 名與雙白金為維基單源（自標 citation needed）。不寫「沒有鼓」（未證）。
- **49917**　Kris Kross《Totally Krossed Out》：無推翻；4 白金、逾 400 萬張為維基無出處段落，用語保守；維基 Jump 條未提 Jackson 5 取樣，不寫。
- **49918**　b 組 7 張 facts 條數 10／10／10／10／10／10／10，https 全過，無千分位逗號、無簡體；status thin／full／full／full／full／thin／full。推翻策展層 1 處（KMD《Black Bastards》廠牌與年份）。

## 研究 a 組
- **49901**　Attica Blues《Attica Blues》：MB／Discogs master 69413 核實，1997 Mo' Wax（MW080LP，A&M 共有版權）；無推翻。團名取自 Archie Shepp 1972 同名專輯，與 Shepp 卡區分。聲音證據僅 Discogs 風格 Downtempo＋製作名單，無樂評原文（AllMusic 403、MusicRadar 內文被截斷）；moodGuess 與風格一致。
- **49902**　Biig Piig《11:11》：核實 2025-02-07，RCA／Sony。策展層稱「當代 R&B」不成立：Discogs 風格 Indie Pop／House／Nu-Disco，BPM 稱 electronic pop，聲音與評分別套 R&B。Zach Nahome 製作人署名僅 Discogs 單源。moodGuess 大致吻合，不存疑。
- **49903**　Blubell《Confissões de Camarim》：廠牌空白屬實，為自行發行（Apple ℗ Blubell、MB [no label]），非待核。2016-08-19、11 首核實；RS 巴西版稱第五張專輯、第四張原創。Zeca Baleiro 合作曲推論為〈A Tardinha〉（單源間接）。moodGuess 存疑：「明亮巴西流行搖滾」查無聲音證據，只知單曲被稱 relaxante、樂手為吉他／鍵盤／鼓／貝斯；聲音薄，status thin。
- **49904**　Def Squad《El Niño》：1998-06-30 Def Jam（維基另列 Def Squad Records、Jive）核實，Billboard 200 第 2、金唱片。moodGuess 存疑（輕度）：funk 取樣查無證據（維基只列外部作者署名，是否取樣未證實）；聲音薄，status thin。
- **49905**　Destin Conrad《Love on Digital》：年份 2025-04-25 核實，無 2022 首發版（2022 是 EP《Satin》）。廠牌 Above Ground Ent／Empire。第 68 屆葛萊美最佳前衛 R&B 專輯入圍（未得）。moodGuess 存疑：藝人自述想做輕快、可跳舞的 2000–2008 數位 R&B，慢拍僅〈Make It Up〉等少數；「慢拍、厚暖合成器」不成立，評分以明快為底。
- **49906**　Dinner Party《Dinner Party》：推翻策展層「唯一正規專輯」——另有《Enigmatic Society》（2023）、《Whatchu Bringing?》（2026）。2020-07-10 Sounds of Crenshaw／Empire 核實；維基視為 EP（7 首約 23 分），MB 為 Album，照收。第 64 屆葛萊美最佳前衛 R&B 專輯入圍。Phoelix 四首（DownBeat 寫五首，採 Discogs／Okayplayer）。
- **49907**　Jason Derulo《Jason Derülo》：年份 2010 無誤，確切日期各地不同（2/24、2/26、3/2），入文只寫年份。廠牌 Beluga Heights／Warner Bros. 核實，盤名保留 Derülo。無存疑。
- **49908**　a 組 7 張 facts 條數 10／11／10／9／10／10／9，https 全過，無千分位逗號、無簡體；status full／full／thin／thin／full／full／full。推翻策展層 2 處（Biig Piig R&B 定性、Dinner Party「唯一」）；moodGuess 存疑 3 張（Blubell、Destin Conrad、Def Squad 輕度）。Wikipedia API 被限流，改用 WebFetch／Discogs API／MB；Billboard、Essence、AllMusic 未能開啟。

## 研究 e 組
- **49941**　Dudu Tassa《הגולה》：MB 12940b65 釘住，2016-07-26（主打歌 5 月 8 日先上線）核實。廠牌 MB／Discogs 皆無、WebSearch 無具名，維持空白、標 uncertain（維基英文頁稱其廠牌 Hed Artzi，但未證實是本盤）。生涯高點之一（Walla! 稱其最佳原創專輯，希伯來維基單一頁），代表作保留；Kuwaitis 名義不在此卡。樂評與 ACUM 年度歌曲獎為希伯來維基單一來源，寫作層降權。moodGuess 輕度存疑（電子化搖滾編制、歌詞苦悶，暖度不確定）。facts 10 條，full。
- **49942**　Fortisakharof《1900?》：推翻策展層「二人組首作」——兩人 1988 後已合作《סיפורים מהקופסא》（署名 Rami Fortis）與 Foreign Affair《East On Fire》（1989），本盤是**第一張以共同名義出版**。廠牌補 Nana Disc（Discogs LP 35391-1；MB 另記 Hed Arzi）。1990-05 核實（Discogs 5/25）。盤名 1900?（半形問號）。原版 LP 9 首、CD 版 12 首。聲音（new wave、合成器、鼓機）僅依 Discogs 風格標籤與維基歸類，無獨立樂評，sound 為推定。moodGuess 輕度存疑（new wave 合成器路線，吉他非必然主角）。facts 11 條，full。
- **49943**　激膚《問號》：MB 54c7ae44 釘住；Apple 頁（id 1598067724）盤名、10 首、℗ 2017 對上。年份取 2017（MB 2017-12，Apple 上架 2018-01-30，℗ 2017）。廠牌：自家 ℗，Apple 標 StreetVoice 街聲屬數位發行平台，建議 label 留空或寫自行發行，不當廠牌。代表作：MB 僅問號（2017）、安卓雅（2019）兩張正規專輯，中文維基無條目、WebSearch 無評論，無法判定何者為代表，維持問號（首張且含 Spotify 熱門曲〈是灰〉），安卓雅另算。聲音僅有 2012 年 EP 英文評論（The Dead Weather、PJ Harvey 類比）可推，本盤實況未證實，評分以實聽為準。moodGuess 中度存疑。facts 8 條，thin。
- **49944**　Noblemen《Chord Stricken》：MB d9ac5cb0／Bandcamp 日期 2024-11-20、12 首完全吻合；倫敦七人現場班底（MC、合成器、吉他、貝斯、鼓、打擊、鋼琴）加六位客座人聲，Bandcamp 標籤 alternative hip hop／rock／electronic。**推翻策展層 moodGuess「beat／lo-fi 取向」**：這是有真實樂器的嘻哈樂團，不是 lo-fi beat 製作，情緒評分以實聽為準，不沿用暖軟預設，但不是汰卡主因（聲音事實照寫）。廠牌無（自行發行 CC BY-NC-ND）。封面：CAA 無、iTunes 搜不到，需自 Bandcamp 專輯頁圖床取（直連 403）。完全無樂評，成員只有名字。facts 7 條，thin。
- **49945**　Way Out West《Intensify》：MB 9f913e03，2001-08-20、Distinct'ive Records（Discogs 標 Distinct'ive Breaks，雙 LP DISNLP76）核實，卡單 Distinctive 屬簡寫。BBC 評論明言以四四拍直拍為主、breakbeat 退居次要，故 moodGuess「progressive house／breakbeat」輕度存疑（調性是暗沉電影感）。專輯榜第 61、Stealth 單曲榜第 67 為維基單一來源。封面為舊金山南部日出照（Blue Source）。facts 12 條，full。
- **49946**　Way Out West《Way Out West》：MB df6b7bac，1997-09-01 Deconstruction（歐洲 CD 74321 501952）核實，卡單「廠牌待核」解除。專輯榜第 42、〈The Gift〉單曲榜第 15、〈Ajare〉1997 重發第 36 為維基資料。〈King of the Funk〉署名含 Van Halen 成員（維基人員表單一來源），facts 只寫到署名，寫作層可略。首作，非選輯，無推翻。facts 12 條，full。
- **49947**　J. Valentine《The Testimony》：MB 36004e29，2011-02-15 CityBoyz Muzik（MB、Apple ℗、Discogs 皆同，卡單廠牌補上）。**版本分歧**：Discogs 限量 CDr 16 首（有 LeToya Luckett、Twista、Gucci Mane、Nicki Minaj、Keri Hilson 等客座），Apple／MB 數位版 12 首無這些署名；維基的客座名單屬 CDr 版，寫作層只寫數位版曲目、客座要註明限量 CDr。維基「銷量 1.7 萬、iTunes 前十」citation needed，不採。本盤是他唯一正規專輯，《Love & Other Drugs》（2012）與《Hide Ya Breezy》皆為 mixtape，代表作保留。聲音僅有 Discogs 風格標籤。facts 9 條，thin。
- **49948**　e 組 7 張 facts 條數 10／11／8／7／12／12／9，https 全過，無千分位逗號、無簡體；status full／full／thin／thin／full／full／thin（QA 全過）。推翻策展層 3 處：Fortisakharof「首作」→首張共同署名、Noblemen moodGuess（lo-fi beat→真實樂器班底）、激膚廠牌（StreetVoice 非廠牌）；無汰卡建議。WebSearch 用 3 次（Dudu 廠牌、激膚×2），中文維基激膚無條目。

## 主線（研究交件後改卡單，條號 49971 起）
- 49971：照研究層推翻改卡單（`desc-tools/batches/cards/add-20261030-sf12-cards.json`）：Home label Capitol、Stay Human label Boo Boo Wax / Six Degrees、Mr Twin Sister label Twin Group、Messy label EMI、Ivory label Warner Records（研究 c 49921–49925）；The Beneficiaries 改 electronic、label Axis Records（研究 d 49931：Jeff Mills 的 Axis 發行的底特律 techno＋口語詩，熱門曲對得上，照收）；Sad Night Dynamite label Pigeon Teeth、Onry Ozzborn label One Drop Records（研究 d）；KMD《Black Bastards》年份 2001→2000、label ReadyRock Records（研究 b 49911：2000-05-15 首發，2001 是 Sub Verse 再版）；Lausse The Cat genres 去 soul；Maddie Ashman releaseType EP（研究 b）；Biig Piig 改 pop/electronic（研究 a）；Fortisakharof label Nana Disc（研究 e 49942）；Way Out West 兩張 label Deconstruction（1997）、Distinct'ive（2001，研究 e）。
