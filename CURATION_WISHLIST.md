# 店主點名清單（滾動累積）

> 2026-08-23 起：店主會零星提專輯、藝人或方向，每次傳送就往這裡加一筆。
> 這份清單是策展來源之一，優先於自動掃描的候選——店主親自點名的東西，
> 排批次時先排。做掉的項目標 ✅ 並註明批次編號，不要刪除（保留紀錄）。

## 待辦

### 2026-08-23（第一批）｜台灣重要獨立樂團　**研究已完成，見下方進度**

方向：**台灣獨立／地下樂團**，1990s 濁水溪公社世代起算到 2000s 的獨立廠牌世代。
店主明確點名：

| 藝人／專輯 | 狀態 | 備註 |
|---|---|---|
| 骨肉皮 | 待做 | 1990s 台灣龐克／地下核心 |
| 濁水溪公社 | **部分已做** | 《臺客的復仇》(1999) 已在 c-41；其餘目錄待補 |
| 賽璐璐 | 待做 | |
| 刺客 | 待做 | |
| 8mm sky | 待做 | |
| 1976 | 待做 | |
| 董事長樂團 — 第一張專輯 | 待做 | 需確認正確盤名與年份 |
| 盪在空中 | 待做 | 待確認是團名或專輯名 |
| 「諸如此類的台灣重要獨立樂團」 | 待做 | 店主授權延伸：同世代、同場景的其他重要團一併列入研究 |

**執行備註**：這批的 MusicBrainz 建檔率預期很低（台灣獨立廠牌盤），
應比照 c-49 華語高風險批的做法——人工身分路線 ＋ 金曲獎／金音獎名單、
廠牌官網、樂團官方社群、可靠媒體報導作為 `manualEvidenceUrls`。
封面多半要走 Apple 台灣商店官方圖或店主本機上傳。

## 待辦：香港／台灣電影配樂（2026-08-23 店主裁示「這批先跳過」）

c-46 配樂線的策展 agent 在這一格交了白卷。《倩女幽魂》《戀戀風塵》《悲情城市》
《重慶森林》在 MusicBrainz 與英文維基上都查不到能確認掛名與發行年的條目，
依「不確定就不猜」沒有硬塞。目前華語配樂全池只有譚盾《臥虎藏龍》
（奧斯卡＋葛萊美，資料乾淨）。

**店主裁示：c-46 照原定五條線走完，華語配樂留到 c-49 華語高風險批一起處理**
——那批本來就是人工身分路線，可以共用金馬獎名單、唱片公司官網、中文樂評資料庫
這些來源，比在 c-46 裡硬擠一格划算。

## 待店主本機處理：卡池有 6 組掛名分裂造成的重複卡（2026-08-23）

同一張碟因為掛名寫法不同被收成兩張。詳見 `audits/pool-artist-name-splits.md`。
最要緊的兩組是**普卡與王牌重複**：The Velvet Underground 首作、Lauryn Hill
《The Miseducation》——規則明定已在王牌池的不得再以普卡上架，組裝器也有
`already-apex` 檢查，但它比對字串鍵，掛名寫法不同就擋不下來。
屬線上資料（`seed_cards.json`／`apex_pool.json`），依規則本環境未修改。

## 待店主本機處理：線上 273 張嘻哈卡的試聽是淨化版（2026-08-23）

跑 c-45 時發現 Apple 上同一張碟常有**同名、同曲數、曲序也一致**的雙胞胎條目，
一筆 `explicit`、一筆 `cleaned`（消音淨化版），只看名稱與曲數分不出來，
管線從來沒讀過 `collectionExplicitness` 這個欄位。

掃線上 1,062 張嘻哈卡：**273 張（25.7%）配到淨化版**，含 JAY-Z《The Blueprint》、
Kendrick《DAMN.》、Drake《Take Care》、OutKast《Speakerboxxx/The Love Below》、
DMX《It's Dark and Hell Is Hot》、Common《Like Water for Chocolate》等正典。

**而且淨化版不只是消音，還會整首抽掉曲目**（Pop Smoke 的淨化盤少了〈For The Night〉，
那是該專輯最紅的一首），所以連曲數／曲序資料也一起錯。

- 完整清單：`audits/cleaned-previews-hiphop.md`（表格）與 `.json`（原始資料）
- 另有 4 張 collectionId 已失效需重抓：PARTYNEXTDOOR《P3》、Open Mike Eagle
  《Hella Personal Film Festival》、Pete Rock《PeteStrumentals 2》、Apollo Brown《Clouds》
- 規格與管線都已修好（`ALBUM_ONBOARDING.md` §6、`pipe-preview.mjs`），**新批次不會再中**；
  這 273 張屬線上資料（KV／Firestore／靜態地圖），依規則本環境未寫入，要你本機處理。
- 對照組：c-44 搖滾 217 筆掃出 0 筆，確認是嘻哈與部分 R&B 特有，不需全類型重掃。

## c-46 卡住的 12 張：只差封面掃圖（2026-08-28）

研究都做完了（身分、三軸、簡介、頂點評估全備），**只卡在封面拿不到**。
上傳掃圖就能補上，不用重跑。

**戰前爵士 7 張**：Eddie Lang & Joe Venuti《Stringing the Blues》、
Bix Beiderbecke《Singin' the Blues》、Bennie Moten《Basie Beginnings》、
Benny Carter《Symphony in Riffs》、Jack Teagarden《That's a Serious Thing》、
Earl Hines《Piano Man》、Ethel Waters《An Introduction to Ethel Waters》

**福音 3 張**：The Dixie Hummingbirds《We Love You Like a Rock》、
Various Artists《Negro Religious Songs and Services》、
The Pilgrim Travelers《The Best of the Pilgrim Travelers》

**雷鬼 2 張**：Mute Beat《No. 0 Virgin Dub》、
Delroy Wilson《Better Must Come》（← 這張有圖但**左上壓著後貼的黃底促銷貼紙**
「MAGNIFICENT 7 FOR '71 FROM DYNAMICS」，蓋住下方印刷字，依判準退件）

**為什麼救不回來**：CAA 逐 release 全試過（不只 release-group 層），Apple 跨
us/gb/fr/de 多店與各種掛名變體也試過。有四筆是**刻意不硬塞**——Apple 找得到同名結集
但軌數與廠牌對不上，屬另一個 release group（Bix：Apple 20 軌 vs MB 14 軌；
Lang & Venuti：18/20 軌 vs 32 軌；Pilgrim Travelers：29 軌重編盤 vs 12 軌原 LP）。
**配錯結集比沒有封面更糟。** Deezer 在本環境被 egress allowlist 擋掉，不能當備援。

## 卡住待店主本機處理（封面在本環境取不到）

這些卡的文字、身分、三軸都做好了，卡在**封面在本環境完全找不到可用來源**
（CAA 無圖、Apple 各商店查無、Bandcamp 與台灣站台被 egress proxy 擋死）。
店主本機自備掃圖上傳即可補上；研究成果都在批次目錄，不用重做。

| 藝人／專輯 | 批次 | 卡住的原因 |
|---|---|---|
| 濁水溪公社《臺客的復仇》(1999) | c-41 | CAA 該 RG 與底下唯一 release 皆 404；Apple 七國查無此藝人 |
| 王宏恩《走風的人》(2004) | c-41 | MB 未建檔（人工身分），Apple 七國查無 |
| 黃連煜《BANANA》(2007) | c-41 | 同上 |
| 羅思容《每日》(2008) | c-41 | 同上；obscurity 已到 5，疑似 pearl |
| 張雨生《天天想你》(1988) | c-41 | CAA 僅有膠盒商品照；Apple 官方數位版美術根本不是原盤（後製藍天窗景插畫） |
| Johnny Hammond《Wild Horses Rock Steady》(1972) | c-39 | CAA 僅有紅色紙盒商品照，無其他來源 |
| Hashim《Al-Naafiysh (The Soul)》(1983) | c-40 | 所有來源都是 remix 版封套，查無 Cutting CR-200 原盤美術 |
| 石川さゆり《暖流 - ベスト14》(1977) | c-42 | CAA 唯一那張帶紅底側標帯；Apple 全目錄 78 筆最早只到 2000 年代 |
| 八代亜紀《舟唄》(1979) | c-42 | CAA 兩層無圖；Apple 全目錄 122 筆無 1979 Teichiku 原盤 |

## 已收但用了折衷封面（待換原盤掃圖）

| 藝人／專輯 | 批次 | 折衷內容 |
|---|---|---|
| 崔健《解决》(1991) | c-41 | 僅存 2005 京文再版圖，角落有黃色廠標 |
| 林生祥《臨暗》(2004) | c-41 | 僅存 2022 重新混音版美術，畫面印有「重新混音版」與 Getting Dark 圓印 |
| Charles Earland《Black Drops》(1970) | c-39 | 所有來源都帶 Original Jazz Classics 系列方標 |
| Incognito《Jazz Funk》(1981) | c-39 | 所有來源都是 1995 再版版面，帶宣傳字樣 |

---

## c-TW 台灣獨立樂團批：進度與待本機處理（2026-08-23）

**已上架 52 張**（`onboarding-manifest-ctw-taiwan-indie-20260823.json`，0 error）。
候選 84 張、身分裁定 61 釘上／22 人工／1 drop，最後卡在封面的有 26 張。

### 一、缺封面，只差你上傳掃圖就能上架（研究都做完了，不用重跑）

**店主親自點名的**：骨肉皮《壹玖玖伍 台灣地下音樂檔案〈肆〉骨肉皮》、
濁水溪公社《肛門樂慾期作品輯》《台客的復仇》《裝潢》、賽璐璐《春天的天氣》、
刺客《I Don't Care》、1976《1976-1》、盪在空中《一大片風景》。

**其他**：亂彈《希望》、農村武裝青年《幹！政府》《還我土地》、妮波寺《詹姆仕的秋天》、
好客樂隊《好客戲》、金門王與李炳輝《流浪到淡水》、觀子音樂坑《過庄尋聊》、
何欣穗《Miss Perfect》、潑猴《革命》、表兒《熱血男兒硬起來》、草莓救星《太陽系》、
廢物樂隊《跳火圈》、無政府《Anarchy in Taiwan》、貓打架《最後演出全程錄音專輯》、
停看聽《Stop Look Listen》、阿飛西雅《提去買藥仔》、
Various Artists《來自台灣底層的聲音》《1994 台灣地下音樂檔案 I》《歡迎來到地下社會現場合輯》。

**為什麼救不回來**：Cover Art Archive 對台灣獨立盤的覆蓋率是零（44 個端點逐一試過全 404），
Apple 台灣是唯一可用圖源，而它對 1990 年代地下盤幾乎沒有目錄——
連用最有辨識度的曲名（〈矽利康槍子〉〈臭豆腐狂想曲〉〈嘎啷啷之戀〉〈蚵仔寮〉）
反查單曲搜尋都是零命中，代表這些錄音根本不在 Apple 上，不是搜尋寫法的問題。
Bandcamp、Discogs 圖床、台灣各站台都被本環境的 egress proxy 擋死。

### 二、店主裁定結果（2026-08-23，已執行）

1. **EP 那兩張改走專輯線** —— 店主指出「瓢蟲、西卡達都有專輯不是嗎」。
   確實：卡在 §5.5 白名單的是 EP 形態，但兩位藝人都有正規專輯。
   **不動白名單**，改研究這兩位的專輯目錄另立候選（見下方 c-TW2）。
2. **趙一豪《把我自己掏出來》升 hall** —— 店主本人查閱過查禁的原始文件，
   直接裁定進殿堂。已改 `apexAssessment.eligible = true / tier = hall`，
   `reason` 註明研究階段保守判 false 的理由（soundtraces.tw 在本環境讀不到）
   與店主的第一手查證。
3. **《把我自己收回來》不收** —— 店主裁定，不另立卡。此案結案，
   `TW_INDIE_NAMING_RULINGS.md` 第三章的「日後要收必須另立裁定」條款維持有效但不啟用。

### 2026-08-23（第二批）｜三位藝人的專輯目錄（c-TW2）　**已完成，13 張上架**

店主點名 **何欣穗**，並指出瓢蟲與 Cicada 有正規專輯。研究範圍：

| 藝人 | 狀態 |
|---|---|
| 瓢蟲 Ladybug | 查正規專輯目錄（《讓太空人跳舞》是 EP，未上架） |
| Cicada 西卡達 | 查正規專輯目錄（《Over the Sea / Under the Water》是 EP，未上架） |
| 何欣穗 Ciacia | 查完整目錄；《Miss Perfect》(1999) 已研究但封面在雲端找不到 |

### 三、生祥與瓦窯坑3《臨暗》與 c-41 重複
c-41 已收 林生祥《臨暗》（用 2022 重新混音版封面），本批的 生祥與瓦窯坑3《臨暗》是同一張碟
（MB credit 作「生祥與瓦窯坑 3」）。本批那張因封面問題未上架，不構成重複，
但你本機若要改 c-41 那張的 artist 掛名，正名裁定表裡有兩種寫法的紀錄。

**c-TW2 結果**：13 張全部上架（`onboarding-manifest-ctw2-taiwan-artists-20260823.json`，0 error，
試聽 ready 11／13）。瓢蟲《Ladybug》(1997) ＋ Cicada 十張 ＋ 何欣穗兩張。
Cicada《Ocean》drop（早期作品輯，與《Farewell》重疊且無封面來源）。

**店主裁定（2026-08-23）**：
- 何欣穗 2013 那張正名採 **《She & Me》**（&號），與兩個實體投稿標題及 Apple 一致；
  封面手寫的 `she and me` 降為別名。
- **「西卡達」是台灣樂迷對 Cicada 的通稱**，不是查無此名——研究階段用「維基零命中」
  推論該寫法不存在是錯的。卡片正名維持 Cicada，但十張卡的 aliasReview 已全部補上
  西卡達並更正措辭。通則寫進 `TW_INDIE_NAMING_RULINGS.md` 補訂三：
  **查不到書面來源 ≠ 該寫法不存在**。

