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
