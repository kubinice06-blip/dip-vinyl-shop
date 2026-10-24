# add-20261024-miles 裁定（店主指定：Miles Davis《Miles: The New Miles Davis Quintet》）

> 店主 2026-10-24「The New Miles Davis Quintet 補上就好」（問 Miles Davis 為何在卡池這麼少之後；卡池已有 50 張，缺第一代五重奏首張）。
> 本批卡單：`desc-tools/batches/cards/add-20261024-miles-cards.json`（1 張；研究 a 1）。身分：MB 釘住 1、§1 人工 0。
> **預留：研究 a 29001–29010、鉤子 29011–29020、寫作 29021–29030、主線 29031–29040。**
---

## 主線策展（不佔條號）
- 身分：MB release-group `0c0ccda7-eacf-35cd-acab-464df24bc5f8`（title「Miles」、Album、1956-04、credit「Miles Davis Quintet」）。盤名取「Miles: The New Miles Davis Quintet」（MB 1993／2009 再版與 Prestige 後來的封面標題；單一個「Miles」太難搜），`queryAlias` 收「Miles」「The New Miles Davis Quintet」。Apple 版掛「New Miles Davis Quintet《Miles》」（id 1443120095）。
- 掛名「Miles Davis」，照池內《Cookin'／Relaxin'／Workin'／Steamin'》先例（藝人頁與介紹不分裂）。
- 其他缺的 Miles（Plugged Nickel、Blackhawk、Carnegie Hall、Quiet Nights、Water Babies）店主未要，不收。
- 店主同時提的 Fishmans 三部曲（《空中キャンプ》《LONG SEASON》《宇宙 日本 世田谷》）早已在池，不重做。

## 研究 a 組
- **29001**（推翻卡單）：curatorWhy 的「第一張 12 吋 LP」不成立。jazzdisco 列出 Prestige 更早的 12 吋 Miles 領銜 LP（PRLP 7007《The Musings of Miles》、7012《Dig》、7013《Conception》）。成立的版本是「第一代五重奏的第一張專輯／首次錄音」。寫作層寫「五重奏的第一張」，不寫「第一張 12 吋」。
- **29002**：錄音日 1955-11-16、Van Gelder Hackensack、PRLP 7014、1956-04 首發，jazzdisco／Wikipedia／Discogs／MB 四方一致，卡單 year 1956 正確。Hackensack 時期的錄音室是 Van Gelder 父母家客廳（Englewood Cliffs 是 1959-07 之後），寫作層勿混。
- **29003**：Coltrane 缺席〈There Is No Greater Love〉（jazzdisco #1-3,5,6、Wikipedia 同），該曲為四重奏；B 面排序與錄音順序不同（Stablemates 錄音第一首、唱片 B 面第三）。
- **29004**：五重奏成軍時間三個來源略有出入（9 月底定／9 月招募／10 月起），facts 取最保守的「9 月陣容底定、秋天起用」。Rollins 為先前次中音（Wikipedia 單一來源）不寫；「Philly Joe 推薦 Coltrane」單一來源不寫；udiscovermusic 的 Miles 早年對 Coltrane 印象、Stablemates 由 Coltrane 帶入、Garland 拳擊手背景皆單一來源不寫。
- **29005**：「欠 Prestige 五張」單一來源（udiscovermusic），但與 Wikipedia 的「1956 兩場錄音湊四張還清」＋本張共五張算術一致，採用。1951-01 合約起點為 Wikipedia 引 Cook 單一來源，可寫「1951 年起」。1956 兩場為 5-11 與 10-26（jazzdisco）。
- **29006**：Garland「塊狀和弦」查無來源，不寫；聲音改寫為可查的弱音小號、鋼琴前奏、Philly Joe 克制、速度相對描述（不寫 BPM）。評分、星等、Billboard 名次不入 facts。

## 寫作層（writer-1）
- **29021** 交件：`desc-tools/batches/output/add-20261024-miles-out-1.json` 1 張（full）238 字。`qa-batch out` 通過、`qa-check-research` 標記 0、`fix-spacing` 待補 0；轉述引導詞／「也就是」／「不是／並非」grep 0。初稿 358 字，一律整格捨去壓回（見 29022）。
- **29022** 整格捨去：note 的「Coltrane 缺〈There Is No Greater Love〉」整格捨去（曲名 26 字元，壓不進 240）；Coltrane 改以「John Coltrane 等五人」留在錄音句，不寫他的樂器。另捨「四重奏」說明、「Rudy」名、Prestige 名（第二次出現改寫「廠牌不付排練費」）。可逆：若主線要留缺席一曲，可拿掉聲音句（14 字）＋「John Coltrane 等」換回。
- **29023** 研究層推翻照辦：寫「新五重奏的第一張」，不寫「第一張 12 吋」；錄音地寫「Van Gelder 父母家客廳的錄音室」，不寫 Englewood Cliffs、也未寫 Hackensack（note 未列）。
- **29024** 第二句「還債的頭一張，是爵士小號手 Miles Davis 新五重奏的第一張」：替 hook 的「Miles」具全名並補樂器／樂種，承接 hook 的「五張」而不複述 Columbia 禁發。單張批，無跨張同構可撞；本張內 4-gram 無重複。
- **29025** 〈The Theme〉寫「成了 Miles 現場的收尾曲」（facts「之後成為他現場固定的收尾曲」），加「現場」避免讀成本碟收尾（本碟 B 面第二首）。收尾句「同年兩場錄音湊出《Cookin'》等四張才還清」只點一個盤名，不列其餘三張與發行年。

## 主線審稿
- **29031**（主線改 1 處，寫進 `desc-override.json`）：第二句「還債的頭一張，是爵士小號手 Miles Davis 新五重奏的第一張」主語模糊、讀起來像同義反覆，改「這批還債唱片的頭一張，也是爵士小號手 Miles Davis 新五重奏的第一張」；為守 240 字帶，刪「唱片」「很」「曲目」三處虛字。成稿 237 字。其餘事實逐句對 facts：Columbia 禁發、欠五張、1955-11-16、Van Gelder 父母家客廳、一天六首、排練不付錢挑熟曲、〈The Theme〉成現場收尾曲、弱音小號與克制的鼓、1956-04 上市、1956 兩場湊出《Cookin'》等四張還清，全部有據。
- **29032**：三軸 3/3/2（`ratings-override.json`，Last.fm 1,506 是再版盤名拼法，比照同期 Prestige 四張）；稀有度依公式；頂點不評（未達殿堂／遺珠／異端門檻）。試聽 Apple us 1443120095 第 1 軌，6/6 對上原盤；封面 CAA release-group front，主線目視為 Prestige 原版綠色樹林封面。
