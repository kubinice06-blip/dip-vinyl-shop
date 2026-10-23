# add-20261023-md28 裁定（情緒薄格策展線・頹靡：dark ambient 第三波）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 11 輪，本工作階段負責 ml51、md28。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（md28 列），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**頹靡＝靜（x<3.0）＋重（y≥0.5）＋冷（z<0）**；策展邊距 x≤2.7、y≥0.8、z≤−0.3。
> 策展：`curation-md28.json`（54 張）→ `master-md28.json`（MB 回查 54/54 釘住、0 flag）→ 主線汰 8 → `pick.json`（46）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-md28-cards.json`（46 張；研究 a–d 各 10、e 6）。身分：MB 釘住 46、§1 人工 0。
> **預留：研究 a 20601–20610、b 20611–20620、c 20621–20630、d 20631–20640、e 20641–20650、鉤子 20651–20660、寫作 20661–20670、主線 20671–20680。**
---

## 主線策展（不佔條號）
- 策展 54 張全數 MB 釘住（Album）：cryo-chamber 36（洛夫克拉夫特合寫系列 4、Dronny Darko 系 6、Alphaxone 系 5、Ugasanie 系 4、Atrium Carceri《Codex》《Metropolis》等）、cyclic-law 8（New Risen Throne ×2、Visions、Funerary Call、Psychomanteum、Gustaf Hildebrand、NERATERRÆ、Moljebka Pvlse）、glacial 1（Netherworld《Vanishing Lands》）、malignant-loki 3（Inade、S.E.T.I.、Hall of Mirrors）、cold-meat-orbit 4（Necrophorus ×2、Atomine Elektrine、Ab Intra）、lustmord-orbit 2（Arecibo、Sleep Research Facility《Deep Frieze》）。moodGuess x 1.1–1.5、y 1.3–1.8、z −1.8～−1.2，全過邊距。主場景大名已在池或前幾批已收，二線集中在 Cryo Chamber。策展對 seed、origin 82 個 `claude/*` 分支 seed、全部 curation／汰除／卡單去重 0 撞。
- 策展層先擋約 25 張（部落鼓／打擊：Vacuum Aeterna、Phurpa、Herbst9、Phelios、Arktau Eos、Halo Manash 等；脈動：Council Estate Electronics、Netherworld《Zastrugi》；偏亮暖輕：Strom Noir《Glaciology》、Aidan Baker《Aneira》、Paul Schütze 等；現代古典避 md27；Lustmord《Alter》《Metavoid》）。
- 聲音證據普遍偏薄：Cryo Chamber 盤多只有 Discogs 風格與廠牌通例，研究層要逐張找「無鼓、低頻 drone」的文字證據。
- **主線汰 8**：
  - 策展自標疑點：Hall of Mirrors《Altered Nights》（md5 研究層提過民族儀式元素、無鼓未證實）、Atomine Elektrine《The Antikythera Mechanism》（名義早期有電子節拍、本張無樂評）。
  - 色溫／質地風險：Northumbria《Markland》（吉他 drone 二重奏，z −1.2 全批最暖，吉他泛音有轉暖風險）。
  - 同人／同系列勻量：protoU《Lost Here》（同人留《Khmaoch》＋合作盤）、Alphaxone《Living in the Grayland》（同人留兩張＋兩張合作）、Dronny Darko《Abduction》（同人留兩張＋三張合作）、A Cryo Chamber Collaboration《Yog-Sothoth》（同系列留三張）、Sabled Sun《2149》（同系列留《2148》）。

## 研究 e 組
- 20641：Necrophorus《Drifting in Motion》身分採 2000 年 Crowd Control Activities 首版（六首）；策展寫的 Beksiński 獻詞曲是 2008 年 Old Europa Cafe 重錄版 bonus（作於 2006），首版沒有，寫作層不得寫成本盤獻詞。Discogs master 掛重錄版，不以其九首曲目為準。
- 20642：Deep Frieze 的專輯序數（維基第四／Sonic Immersion 第三）對不上，facts 不寫序數；Track 2 座標採 CD 版 72°S 49°E。
- 20643：S.E.T.I.《Baikal》、Necrophorus《Elinrós》、Ab Intra《Aura Imaginalis》三張聲音證據偏薄（無獨立樂評），status 標 thin，notes 寫 moodGuess 存疑；Baikal 另有 Bandcamp 標籤 glitch／techno 與「晶瑩」字眼，疑偏亮偏電子。
- 20644：Arecibo 的 Brainwashed 樂評只取得搜尋摘要（頁面 404），不進 facts，只寫 notes；Lustmord 整體手法（洞穴／地穴錄音）僅作通例，不得當本盤聲音。
- 20645：補位研究——Yog-Sothoth、Sabled Sun《2149》、Dronny Darko《Abduction》三張追加進 e 組，皆 full；身分與 MB／Bandcamp 一致，未推翻年份、廠牌、盤名。聲音證據來自廠牌文案、Textura、Igloo Magazine、Chain D.L.K.、This Is Darkness。
- 20646：Yog-Sothoth moodGuess 存疑（輕～中）：Textura 描述甘美朗色彩段落、受控吉他哀鳴、明亮 ambient 段落、類小提琴旋律與模糊合唱，多人接力使質地不均；無鼓、無刺耳噪音。長度約 1 小時 58 分。
- 20647：Sabled Sun《2149》moodGuess 存疑（中）：Igloo 稱廠牌最旋律化、最哀歌式的專輯之一，稀疏鋼琴線與合成器湧浪，另有『pulsating grooves』；序數 Bandcamp 稱第五張、Side-Line 摘要稱第三張，facts 採 Bandcamp。
- 20648：Dronny Darko《Abduction》moodGuess 存疑（輕～中）：Chain D.L.K. 與 This Is Darkness 皆稱少 drone、以小聲響與田野錄音為主（近 lowercase），較稀疏而非持續低頻；有一段 noisy interlude，不構成刺耳噪音專輯。無鼓。
- 20649：Dronny Darko 為 Oleg Puzan（基輔，Black Room 工作室）；This Is Darkness 頁為標籤彙整頁、摘要截斷，只取讀到的兩句。
- 20650：WebSearch 用 3 次；Bandcamp、Igloo、Chain D.L.K.、Textura 皆走 WebFetch，MB 走 API。

## 研究 a 組（條號 20601–20610）
- 20601：本批 Bandcamp 一律用 WebFetch 取廠牌文案（curl 被擋）；Discogs master／MB API 補曲目、曲長與風格；每張聲音事實 2–3 條，來源分廠牌文案、樂評、樂迷留言三級，樂迷留言只當輔助。
- 20602：Cthulhu 參與人數文案寫 12、署名列 13，Azathoth 文案「不下 20」、署名 22，Nyarlathotep 文案 25、署名 26；facts 照頁面寫，notes 提醒寫作層一律寫「十多位／二十多位」，不寫確切數字。
- 20603：Enmarta《Sea of Black》moodGuess 存疑：現場中提琴、手工笛、鐘琴、喉音歌唱與新古典手法（Bandcamp、Side-Line、訪談三源一致），旋律性偏高；無鼓，邊緣。
- 20604：Halgrath《Out of Time》moodGuess 存疑：聲音主角是歌劇女聲的儀式吟誦，Bandcamp 標籤另有 industrial、industrial ambient；無獨立樂評，無鼓證據為「未提及」。
- 20605：protoU《Khmaoch》moodGuess 存疑：長笛（Ivan Ioanov）是主要旋律元素，文案強調「黑暗與光的對比」，判輕或暖有風險。
- 20606：Dronny Darko & protoU《Earth Songs》moodGuess 存疑：文案自稱「soothing, dreamy」，樂迷稱「peaceful」，與預估陰冷有落差。
- 20607：Ugasanie《Border of Worlds》主題為薩滿出神，但文案與 Discogs 皆無鼓、人聲描述，status thin；無鼓為未提及，非明文否定。Ice Breath 曲數 Bandcamp 摘要八首、Discogs 九首，採 Discogs。
- 20608：Nyarlathotep 一則樂迷留言提到「distant humming beats」，判為 drone 脈動、不當鼓證據，notes 標輕微存疑。
- 20609：Black Hive 的 Side-Line 評論（p=14769）有「oppressive sound blasts」，Chain D.L.K. 有〈Numinous〉高頻 drone 漸強驟停，皆為質地描述，不構成 harsh noise；notes 標輕微風險。
- 20610：a 組無推翻年份、廠牌、盤名；10 張身分全數與 MB／Discogs／Bandcamp 對得上。

## 研究 b 組（條號 20611–20620）
- 20611：Spira igneus moodGuess 存疑：Side-Line（p=9594）明寫「industrial noises and metal percussion」且部分段落朝儀式風格，Bandcamp 另有「unholy chants」；無穩定節拍證據。主線斟酌。
- 20612：God Body Disconnect《Sleeper's Fate》moodGuess 存疑（強）：This Is Darkness 明寫〈Flesh of a Ghost〉有 pronounced drum beat 與後搖滾段落；文案列 ethereal guitar、post-rock、旁白人聲；兩家樂評稱情感濃。建議汰換。卡單「Cryo Chamber 首張全長」與樂評所稱前作《Dredge Portals》衝突，寫作層不寫首張。
- 20613：Alphaxone《Edge of Solitude》moodGuess 存疑（強）：I Die: You Die 稱「並不真的那麼黑暗」「brighter colours」「joy」，樂迷「warm」，文案「lush synths」；建議汰換或排最後。樂評曲名〈Solar Pulses〉與 Discogs〈Solar Halos〉不一致，以 Discogs 為準。
- 20614：Alphaxone《Echoes From Outer Silence》moodGuess 存疑（中）：文案「warm and analogue」、樂迷「anything but a cold experience」，Chain D.L.K. 指〈Altered Xone〉有平穩拍點、〈Departure〉節拍改變。
- 20615：Kolhoosi 13《Monuments of Power》moodGuess 存疑（輕）：文案「raspy upbeat vinyl recordings」、機槍與行軍意象、industrial 取向；樂評無鼓無 industrial 描述。曲長以 Discogs 43 分 24 秒為準（Bandcamp 摘要 53 分有誤）。
- 20616：Council of Nine《Exit Earth》、Aegri Somnia《Endtime Psalms》、Cities Last Broadcast《The Humming Tapes》無獨立樂評，聲音證據僅廠牌文案與樂迷留言，status thin；Humming Tapes 文案「careful and nurturing」、樂迷「comfortably spooky」暗示偏暖，標輕微存疑；Exit Earth 有被拉高音調的人聲取樣。
- 20617：Sabled Sun《2148》moodGuess 存疑（輕）：文案列遠處鋼琴、蒙塵弦樂與搏動低音，無鼓；脈動是否成推進未證實。
- 20618：Ugasanie & Dronny Darko《Arctic Gates》曲長以 Discogs 53 分 56 秒為準；聲音證據成立（This Is Darkness、文案）。
- 20619：Side-Line 與 Ghost Cult 數頁抓取失敗或網址無法對應；Ghost Cult（403）與 Dripping 一事（Side-Line p=11513）取自搜尋摘要，Sleeper's Fate 的 notes 已提醒寫作層弱化。WebSearch 兩組合計用 6 次。
- 20620：b 組無推翻年份、廠牌、盤名；Endtime Psalms 的 MB RG 回應沒有發行日，年份以 Bandcamp、Discogs 為準。

## 研究 c 組（條號 20621–20630）
- 20621：Forsaken 無推翻；Bandcamp 寫 6-panel digipak、Discogs 寫 3-folder digipak，facts 只寫限量 500 張。聲音證據只有廠牌說明（smooth pads、deep bass、long form drone），無獨立樂評。
- 20622：Eschate Thule 確認屬正規全長專輯（Discogs 僅數位版）；Bandcamp 聽友留言提到 subtle percussions 與管弦式質地，輕度存疑 moodGuess。
- 20623：Sanctum 說明寫 Ancient Gothic choirs，Discogs 簡介為 massive choir works，合唱為主體，列輕度存疑（儀式吟唱）。
- 20624：Stone Speak 廠牌說明自稱 warm, dark and subtle，z（冷）輕度存疑；Kave 在 Discogs 為 Co-producer、Bandcamp 為 Clandestine 音源提供者，facts 並列。
- 20625：Echo 說明提到 distant piano 與 angelic choirs，輕度存疑；主體仍是隆隆 drone。
- 20626：Abysmal 無推翻；Discogs 查無 master，身分以 MB 與 Bandcamp 為準；曲長相加約 60 分鐘。
- 20627：Aftermath 說明含 pulsating shimmers，輕度存疑（脈動）。
- 20628：Exoplanetary 推薦給 spoken word 聽眾、Rennie 掛名 Vocals、說明有 melodic inferences，存疑（旁白與旋律性）。
- 20629：Codex 廠牌說明寫 industrial beats 與 brooding choirs，曲長偏短，強烈存疑，建議主線優先汰換。
- 20630：Metropolis 說明寫 industrial、distorted，無節拍的正面證據，中度存疑，與 Codex 一併裁定。c 組未推翻年份、廠牌、盤名。WebSearch 用 2 次，另 Bandcamp 以 WebFetch、Discogs 與 MB 走 API。

## 研究 d 組（條號 20631–20640）
- 20631：Whispers 無推翻；Bandcamp 的 2007-01-01 為佔位日，facts 寫 2007 年；聲音證據只有廠牌說明。
- 20632：Crossing the Withered Regions 找不到任何聲音文字（Bandcamp 皆 404），status 標 thin；Discogs 風格含 Industrial 且 Stielh 掛名 Programmed By，存疑有編程節拍，建議實聽或汰換。
- 20633：Lapse 無推翻；MB 以 Frédéric Arbour project 消歧，不寫其與 Cyclic Law 的創辦關係（來源未證實）。
- 20634：The Mirror Reversed, Part 1：Bandcamp 標題無 Part 1，MB 有，單軌 47:34；Discogs 查無，身分以 MB 與 Bandcamp 為準；藝人簡介提到 ritual implements，輕度存疑（打擊質地）。
- 20635：Oneironaut 日期 Bandcamp 2011-02-15 與 MB／Discogs 2011-04-15 不一致，facts 並列；說明有 melodic drones、processed guitars and keyboards，輕度存疑（旋律與偏暖）。
- 20636：Primordial Resonance 說明有 distant shrieks of surreal machinery，輕度存疑（刮擦質地，但為遠景）。
- 20637：NERATERRÆ 客串名單含 Phurpa 的 Alexey Tegin，曲名有 Pulse，中度存疑（吟唱／打擊），建議實聽第 2、4 首。
- 20638：Komoku 用 kangling 與頌缽等原聲樂器、沙漠田野錄音，輕度存疑（色溫）。
- 20639：Vanishing Lands 說明稱 most complex and dramatic，輕度存疑（起伏）；無鼓證據只是未提及。
- 20640：Inade 找不到廠牌文案與樂評，status 標 thin；MB 標籤含 industrial、noise，中度存疑，建議優先實聽或汰換。d 組未推翻年份、廠牌、盤名。

## 主線研究後汰換（不佔條號；2026-10-23）
- 研究層多數只有廠牌文案；照「有反證才汰」，體感標準下凡文案／樂評提到**鼓、打擊、拍點、溫暖／明亮、旋律樂器或人聲領奏**的一律汰（md1、md18、md22 先例）。
- **汰 12 張**（存 `dropped-cards.json`／`dropped-research.json`）：
  - 有鼓／拍點／打擊（x 風險）：God Body Disconnect《Sleeper’s Fate》（鼓點＋後搖滾段）、Atrium Carceri《Codex》（廠牌自寫 industrial beats）、Dronny Darko《Spira igneus》（metal percussion）、NERATERRÆ《The Substance of Perception》（Phurpa 喉音客座、Wicked Pulse）、Inade《The Nine Colours of the Threshold》（industrial／noise、thin）、S.E.T.I.《Baikal》（glitch／techno 標籤）。
  - 色溫暖／明亮（z 風險）：Alphaxone《Edge of Solitude》（brighter colours、joy）、《Echoes From Outer Silence》（warm and analogue＋拍點）、Apocryphos《Stone Speak》（warm, dark and subtle）。
  - 旋律／人聲領奏：Enmarta《Sea of Black》（中提琴、笛、鐘琴、喉音）、Halgrath《Out of Time》（歌劇女聲吟誦）、Ruptured World《Exoplanetary》（旁白人聲、melodic）。
- **補 3 張**（主線先汰的勻量卡，無聲音疑點）：A Cryo Chamber Collaboration《Yog-Sothoth》、Sabled Sun《2149》、Dronny Darko《Abduction》，進 e 組補研究。
- 定案 **37 張**（a 8、b 6、c 7、d 8、e 8）。
- 卡單更正：Necrophorus《Drifting in Motion》維持 2000 年首版（六首）；獻給 Beksiński 的〈Untitled〉屬 2008 Old Europa Cafe 重錄版，寫作層不得寫進本卡。
- **補研究後再汰 3**：補位三張研究一查都有反證——Sabled Sun《2149》（最旋律化、哀歌式、鋼琴線）、Dronny Darko《Abduction》（少 drone、lowercase 田野錄音，判輕風險）、A Cryo Chamber Collaboration《Yog-Sothoth》（甘美朗、明亮段、類小提琴旋律）。候補已無乾淨卡，照實上架，**定案 34 張**（a 8、b 6、c 7、d 8、e 5）。

## 鉤子層（d–e）
- **20656** 交件：`desc-tools/batches/hooks/add-20261023-md28-hooks-d.json`（8）、`-hooks-e.json`（5），key 逐字照研究稿（汰換後定案）、順序不變、欄位只有 key／hook／note。預算公式照 hook-base 第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin（研究稿 status thin）上限 170、其餘 230。逐筆（預算／上限｜hook 加權｜hook 原始字元）：Whispers 203/230｜20｜20；Crossing the Withered Regions 166/170（thin）｜18.5｜28；Lapse 228/230｜20.5｜30；The Mirror Reversed 220/230｜26｜26；Oneironaut 220/230｜17｜17；Primordial Resonance 209/230｜20｜20；Komoku 222/230｜27｜27；Vanishing Lands 225/230｜23.5｜27；Elinrós 169/170（thin）｜23.5｜29；Drifting in Motion 217/230｜24｜30；Aura Imaginalis 167/170（thin）｜25.5｜30；Trans Plutonian Transmissions 225/230｜25｜30；Deep Frieze 226/230｜25｜25。初稿 10 張超標，整格捨去：Crossing 的曲長與 2008 寫成（版權頁）；Oneironaut 的限量 1000 張；Primordial 的曲名格（讓給 Metropolis）；Komoku 的 EMS 錄音室名；Vanishing Lands 的「最複雜、最戲劇化」（研究層標輕度存疑）與〈Last Sunset〉曲長；Elinrós 的合輯《The Last Bleak Days》與曲長；Drifting 的首張盤名、終曲曲長與封面設計；Ab Intra 的「聽者自由詮釋」；Arecibo 的素材清單與 Scientific Electric；Deep Frieze 的「避免突然大聲響」與結霜紋理。壓完回核 hook 依賴：Lapse（錄音期 g1）、Funerary（載具 g1）、Oneironaut（通道 g2）、Primordial（機械尖嘯 g1）、Komoku（沙漠與尼泊爾樂器 g1／g2）、Netherworld（疫情 g1；「離深淵一步」為 hook 本身）、Elinrós（原型年份即 hook 本身，g1 補其餘錄於 2004）、Drifting（冰曲名 g2）、Arecibo（三地望遠鏡 g1）、Deep Frieze（紀錄片 g2）、Crossing（瑞典老牌 g2）、Whispers（三章 g1）、Ab Intra（字義即 hook，腦中圖像 g1）。
- **20657** 骨架歸屬（13 張 13 條，只有擁有者寫歸屬句）：Whispers＝三章「徵兆」結構；Crossing＝轉投瑞典老牌廠牌（藝人換廠牌，與 Forsaken 的廠牌遷址不同形）；Lapse＝半年錄音期；The Mirror Reversed＝作品自稱潛入陰影的載具（單曲長卷歸 Cthulhu，本張只帶曲長細節、不寫「全盤只有一首」）；Oneironaut＝成員在名單上掛「通道」＋夢旅人概念；Primordial＝遠方機械尖嘯的聲音意象（曲名骨架讓 Metropolis）；Komoku＝沙漠旅途田野錄音＋異地帶回的原聲樂器；Vanishing Lands＝疫情中寫成；Elinrós＝一首曲子原型早三年；Drifting＝出道四年後的第二張（冰曲名只當細節，曲名編年歸 Earth Songs）；Aura Imaginalis＝藝名字義＋靜默入樂；Arecibo＝太空網路電波資料當素材（與池中 Lustmord《Dark Matter》的「頻率移入可聽範圍」分開：本張只走三地望遠鏡與 JPL 取用）；Deep Frieze＝為入睡而做的計畫＋紀錄片構想。a–c 已交件，配表時逐張讀過，無重疊。
- **20658** 同藝人分軸與「他／他們」引入法、第二句句型（一張一種）：**New Risen Throne 2**——Whispers 修飾語＋成員（「義大利 dark ambient 計畫 New Risen Throne 的成員是 Stielh」，概念軸）；Crossing 由字句（「這張由 Stielh 掛名取樣與編程」，廠牌軸），兩張 note 互不提對方盤名（Crossing 只寫「此前在 Cyclic Law 發片」）。**Necrophorus 2（Peter Andersson）**——Elinrós 是字句帶生平（1973 生於瑞典、另以 raison d'être 知名）；Drifting「這是」句帶序數（第二張），錄音／曲名軸；raison d'être 只進 Elinrós。Drifting 只寫 2000 年首版（「版本寫 2000 年首版」），重錄版、Beksiński 獻曲、2008 樂評一律不進 note。其餘：Lapse 編排欄（「編排全盤的 Frédéric Arbour 來自加拿大」）、Funerary「幕後是」、Psychomanteum 成軍年、Primordial 錄音地（「在瑞典 Eskilstuna 錄成這張的」）、Komoku「立足」、Netherworld「就是」（廠牌創辦人）、Ab Intra 國籍名詞組、Arecibo「另取…為名」、Deep Frieze 名字直接領句。Kozletsky 後來的 Apocryphos 不指派（會與 Echo 互指）。
- **20659** 日期「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：Funerary 日以、Primordial 日成、Komoku 日推、Netherworld 日正、Ab Intra 日交、Arecibo 日於、Deep Frieze 日才；其餘六張只寫到月或年（Oneironaut 日期兩源不一，只寫 2011 年）。a–c 全只寫到月，無撞。媒體名與媒體分數不進 note（Musique Machine、Sonic Immersion、The Wire 附贈碟、Spirit of Metal 分數、Steve Roach 評語全不指派）；Bandcamp／Discogs 一律改「廠方／廠牌頁／版權頁／內頁」，note 無「據說明」類引導詞。研究層禁區照辦：Arecibo 不寫 Lustmord 洞穴錄音通例；Ab Intra 不寫《Supremus》與華沙；Elinrós 不寫冰島語字義；Crossing 不寫 Peter Andersson 母帶身分與 CMI 停擺；Visions 不寫 Arbour 創辦 Cyclic Law。
- **20660** 自查：hook 之間中文 4-gram（本批 a–e 34 張，並對 `batches/hooks/` 全部既有 hook 檔掃描），初稿撞的「六首曲子」「首曲子分」「壓軸曲的」「三年後重」「隔了四年」「第二張把」「脈衝星與」（md22 Lustmord）「五首曲名」「曲名都是」「首曲名都」「收尾那首」「裡有一首」「給自己的」「兩位成員」「來自一部」都已改寫，定稿 0 條、開頭前四字 0 撞；hook 與自家 note 無 5 字以上逐字重複。hook 四型：懸疑（The Mirror Reversed、Arecibo、Elinrós）／斷言（Whispers、Crossing、Netherworld、Ab Intra）／場景（Lapse、Primordial、Komoku、Drifting）／人物定調（Oneironaut、Deep Frieze）。`node qa-batch.mjs hooks add-20261023-md28` 全部通過；`node chk-hook-crossgroup.mjs add-20261023-md28` 5 組 34 張，d／e 無開頭撞、無同構關鍵詞；只報 a–c 的「沒有鼓」×12、「一人包辦」×2 與 Ab Intra「沒有歌詞也沒有歌曲結構」（事實內容，非校對痕跡）。

## 鉤子層（a–c）
- **20651** 交件：`desc-tools/batches/hooks/add-20261023-md28-hooks-a.json`（8）、`-hooks-b.json`（6）、`-hooks-c.json`（7），key 逐字、順序同研究稿（汰除卡不在）。預算公式照 HOOK-DISPATCH §二：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin（Border of Worlds、Exit Earth、Endtime Psalms、Humming Tapes）上限 170。逐筆預算／hook 加權／hook 原始字元：a — Cthulhu 227/24/26、Azathoth 224/24/24、Nyarlathotep 207/20.5/25、Khmaoch 220/23/23、Earth Songs 214/20/20、Ice Breath 223/18/18、Border of Worlds 170(thin)/22/22、Black Hive 225/21/21；b — Monuments of Power 221/20/20、Exit Earth 170(thin)/19/22、2148 222/15.5/18、Endtime Psalms 170(thin)/13/13、Arctic Gates 217/21/24、Humming Tapes 169(thin)/22/24；c — Forsaken 218/28/28、Eschate Thule 229/21.5/25、Sanctum 216/20/20、Echo 216/24/26、Abysmal 201/21/21、Aftermath 209/24/24、Metropolis 222/20/20。初稿 17 張超標，整格捨去：Cthulhu 的《Rhan-Tegoth》延續與精確曲長、Azathoth 名單兩人與精確曲長、Earth Songs 兩人本名與〈Primate〉〈Singularity〉、Black Hive 曲數與曲長、Kolhoosi 13 最長曲〈Uprising of the Spirit〉、Exit Earth 彗星／曲數／Rancho Santa Fe、2148 的 Atrium Carceri 括注與一人包辦、Endtime Psalms 張次與 DNA 操弄、Humming Tapes 張次／曲數／現代混音、Forsaken 目錄號與最長曲、Eschate Thule 的 1980 年代末與曲名例、Sanctum 最長曲、Echo 的 Kammarheit 廢棄工廠起源（一句）與瑞典寒冬工作室、Aftermath 目錄號與儀器嗶聲、Metropolis 兩個曲名與「被幻象拒於門外」。壓完逐張回核 hook 依賴格：Ice Breath「奇異的平靜」、Border「穿梭各界」、Black Hive「時間是被吞噬的燃料」、Humming Tapes「20 世紀初」、Sanctum「受時間侵蝕的教堂」、Metropolis〈The Machine〉、Earth Songs〈Explosion〉原已被砍或未進 note，已補回 g1／g2。hook 事實自驗改四處：Earth Songs「從物種大滅絕寫起」→「從宇宙大爆炸寫起」（首曲是〈Explosion〉）；Khmaoch note「自家高樓」→「基輔的公寓」（研究稿無「自家」）；Metropolis「全寫進曲名」→「各佔一個曲名」（11 首只三首）；Sanctum 改「向來描繪」（大教堂說出自 Discogs 對計畫整體的簡介，不是本盤文案）。
- **20652** 骨架歸屬（21 張 21 條，只擁有者寫歸屬句）：Cthulhu＝洛夫克拉夫特題材＋系列起點；Azathoth＝廠牌合寫（「合作不是合輯」、各家錄音室同步一年）；Nyarlathotep＝長度極端（三 CD 約 190 分鐘）＋素材清單；Khmaoch＝特殊錄音地點（基輔公寓）；Earth Songs＝時間編年概念盤；Ice Breath＝計畫起念的冬天＋「窒息卻平靜」的反差；Border of Worlds＝北方民族信仰取材（薩滿故事）；Black Hive＝三部曲收尾；Monuments of Power＝擬音軍事劇場；Exit Earth＝真實事件題材（天堂之門，筆調克制）；2148＝系列化的未來年份敘事（冬眠醒來）；Endtime Psalms＝曲序漸空（生命聲響遞減）；Arctic Gates＝白俄羅斯／烏克蘭出身（本批此骨架唯一一張）；Humming Tapes＝舊器材＋降靈會；Forsaken＝廠牌沿革（瑞典創立、遷奧勒岡）；Eschate Thule＝樂手轉行（長號／techno → ambient）；Sanctum＝合唱當主體；Echo＝三組人馬接前作再合作；Abysmal＝深海虛構事故；Aftermath＝伊朗實驗場景先行者；Metropolis＝工業城市曲名意象。冰原／太空題材本組不擁有（e2 冰的移動、e5 南極座標、e4 太空訊號）：Ice Breath、Arctic Gates、Eschate Thule、Abysmal、Aftermath 的極地／深海／外星只當場景，骨架落在別處。與 d／e 已交 13 條比對無撞（曲名排列歸 e2／e5，Earth Songs hook 因此不以「曲名」起句；廠牌創辦人歸 d8，2148 改走系列敘事、Forsaken 走沿革；拉丁名意歸 e3，Metropolis 不寫團名拉丁意）。hook 四型：懸疑（Abysmal、2148、Endtime Psalms）／斷言（Cthulhu、Nyarlathotep、Black Hive、Exit Earth、Metropolis、Sanctum）／場景（Azathoth、Khmaoch、Ice Breath、Monuments、Humming Tapes、Forsaken）／人物定調（Border、Earth Songs、Arctic Gates、Eschate Thule、Echo、Aftermath）。開頭前四字 34 張互異，也與既有 add-* hooks 開頭不撞。洛夫克拉夫特合寫三張人數照研究稿 notes 寫「十多位／二十多位」；媒體名與榜單名次不進 hook／note（樂評、Avant 引文一律直述聲音）。
- **20653** 同藝人分軸與「他／她」引入法：**Dronny Darko（他，Oleg Puzan）4 張**——Earth Songs＝國別並列（「烏克蘭的 Dronny Darko 與基輔的 protoU」）、Black Hive＝本名直述＋掛名欄（一人寫作製作演奏）、Arctic Gates＝文案對舉（寒冷 drone × 精密音效）、Forsaken＝只掛名義（國別在 hook）。**Ugasanie（他，Pavel Malyshkin）4 張**——Ice Breath＝生地維捷布斯克＋起念的 2010 年 11 月（起念時節只在本張）、Border＝本名＋一人寫作、Arctic Gates＝國別對舉、Abysmal＝國別並列（不帶起念時節）。**protoU（她，Sasha Cats）2 張**——Khmaoch 帶本名、第二張、錄音地；Earth Songs 只用「基輔的 protoU」。**Simon Heath（他）3 張**——2148＝廠牌主人的另一個名義；Echo＝三人之一；Metropolis＝Atrium Carceri 一人完成；廠牌沿革（2011 瑞典、遷奧勒岡）只在 Forsaken。**Xerxes The Dark（他）2 張**——Abysmal 只具名義與伊朗（Govahi 留第二句）；Aftermath 帶 Morego、2005、先行者。**Alphaxone 2 張**——Forsaken 名義＋伊朗；Aftermath 只作合作者。**Pär Boström（他）2 張**——Humming Tapes 帶 Umeå 與副計畫；Echo 只掛 Kammarheit 名義。
- **20654** 第二句句型配死（note 末「第二句以…領句」）：廠牌名與十多位作者／「合作不是合輯」這句／音樂人的人數／本名 Sasha Cats／兩人聯手／計畫起念的那個冬天／Malyshkin 一人包辦／掛名欄／兩位成員／Olivier／Simon Heath 的分身／Santek／Malyshkin 與 Puzan 的合寫／副計畫／Alphaxone 與 Dronny Darko 合寫／Thomas Park／Scorpio V 一人詞曲／三人各自的計畫名／伊朗作曲家 Govahi／伊朗的兩位作者／單人計畫；避開 d／e 已用的修飾、由字、編排欄、幕後、成軍年、錄音地、立足、創辦人、生年、序數、國籍、化名、據點。hook 只帶代稱或無主詞者（Cthulhu、Azathoth、Nyarlathotep、Khmaoch、Earth Songs、Ice Breath、Border、Black Hive、Monuments、Exit Earth、2148、Endtime、Humming Tapes、Eschate Thule、Sanctum、Echo、Abysmal、Aftermath、Metropolis）note g1 皆先交代國別／身分與 dark ambient 樂種。日期：21 張 note 只寫到年或月，「日」後一字 0 處。「沒有鼓」初稿 12 張同句，只留 Cthulhu，Black Hive 改「全程無拍」、Sanctum「不靠節拍」、Abysmal「全程無鼓」，其餘整格捨去；thin 卡（Border）不寫無鼓（研究稿為未提及）。Exit Earth 屬「與作品直接綁定」的真實死亡事件，note 指派「事件筆調克制」。
- **20655** 自查與腳本：hook×hook 中文 4-gram（34 張）0 條；hook 對既有 add-* hooks 掃出 7 條（最後一張×4 批、高樓公寓、最後走進、寫進了曲名、的那一年、再度聚首）全改字後 0；hook×別張 note 只剩地名（白俄羅斯、烏克蘭的）與規定用語「二十多位」（Azathoth hook × Nyarlathotep note）；hook×自卡 note 只剩專名（洛夫克拉夫特、天堂之門），無逐字重複句（Khmaoch「基輔一棟高樓公寓」、Ice Breath「奇異地平靜」、Abysmal 潛水鐘句、Aftermath「伊朗實驗音樂」、Sanctum「龐大的合唱」、Black Hive「黑暗三部曲」已改 note 措辭）；note×3 只剩術語「田野錄音」與地名。`node qa-batch.mjs hooks add-20261023-md28` 全部通過 ✓；`node chk-hook-crossgroup.mjs add-20261023-md28`（5 組 34 張）✓ 全部通過（只報不擋：一般否定句 5 筆屬內容）。輔助腳本在 scratchpad `hook-md28-ac/`（md28ac-check.mjs）。

## 寫作層（writer-2）
- **20666** 交件：`desc-tools/batches/output/add-20261023-md28-out-2.json`（17 張，key 逐字同序）。字數（Array.from）：Echo 240、Abysmal 202、Aftermath 203、Metropolis 238、Whispers 209、Crossing 147（thin）、Lapse 211、The Mirror Reversed 217、Oneironaut 216、Primordial 213、Komoku 232、Vanishing Lands 218、Elinrós 156（thin）、Drifting 214、Aura Imaginalis 144（thin）、Arecibo 224、Deep Frieze 234。full 202–240、thin 144–156，無超標、無掉下限；初稿只 Echo 246 一張超標，整格捨去「背後依序站著／則從更高處落下」改短句壓回 239；Funerary 刪掉自加的「往陰影面下潛」（複述 hook）。status partial 的 Drifting、Arecibo 照 full 帶寫。
- **20667** 第二句一律照鉤子層 20654／20658 指派的引入法（三人計畫名／Govahi／伊朗兩位作者／單人計畫／修飾＋成員／由字／編排欄／幕後／成軍年／錄音地／立足／創辦人／是字句帶生年／這是句帶序數／國籍名詞組／另取為名／名字領句），17 種互不重複。日期配死：在年月把這張送上架（Echo）、年月經（Abysmal）、年月由（Aftermath）、年月逗號領句（Metropolis）、在年把它（Whispers）、年月改由（Crossing）、在年由（Lapse）、這件作品年月日以（Funerary）、年發行（Oneironaut）、唱片年月日成為（Primordial）、這份日誌年月日推出（Komoku）、年月日正式上架（Netherworld）、隔年由（Elinrós，不寫數字）、年由發行首版（Drifting）、年月日交（Ab Intra）、月日在（Arecibo）、拖到年月日才（Deep Frieze）。
- **20668** 派工補充照辦：媒體名、媒體分數、榜單名次整句不寫（Spirit of Metal 評分、Musique Machine、Sonic Immersion、Steve Roach 評語、The Wire 附贈碟皆未用）；全檔無「據說／據傳／據…」。Drifting 只寫 2000 年 Crowd Control Activities 首版六首，重錄版、Beksiński 獻曲、2008 樂評一字未寫；曲名「都緊扣」改「緊扣」（六首中只有三首是冰）。無鼓類描述只留 Abysmal（note 指派「全程無鼓」，寫成「從頭到尾不見鼓」）與 Deep Frieze（計畫本身「不帶節拍」）；「低頻」正文 0 次；drone 字樣分散在 Echo、Oneironaut、Komoku、Ab Intra 四種不同句子，Abysmal／Oneironaut 的額外 drone 改寫成「長音」。
- **20669** 自掃（scratchpad `wr-md28-2/md28w2-scan.mjs`，han() 剝非漢字後 4-gram，合掃 out-1 已交的 10 張＋out-2 17 張，含 hook）：初稿「首約分鐘」×7、「約分鐘最」×3、「廠牌發行」×3、「六首約分」×3、「田野錄音」×3 等，曲長句逐張改不同說法（約一小時／近一小時／52 分鐘出頭／合計 60 分鐘／45 分鐘有餘／將近 59 分鐘／44 分鐘左右／56 分鐘的唱片），並主動拆掉與 out-1 撞的 2 張殘片（分鐘上下、沉的嗡鳴、的田野錄、的第二張、個人計畫）。定稿 3 張以上只剩「田野錄音」（術語，Komoku 主故事，其餘 4 張在 out-1）與地名「白俄羅斯」。**out-1 交件時仍是 10 張，主線收件時請兩檔定稿後再合掃一次。**
- **20670** 腳本：`node qa-batch.mjs out add-20261023-md28` out-2 17 張 147–239、>260 0、thin 全 ≤180（只報總張數 27 vs 34，因 out-1 尚未寫完）；`node qa-check-research.mjs …writer-2.json …out-2.json` 17 張標記 0；`node fix-spacing.mjs …out-2.json` 待補 0。
- **20670-B** out-1 交齊後重跑合掃（34 張）：撞出「年月推出」（2148、Sanctum、Echo）與「首約分鐘」（Arctic Gates、Eschate Thule、Drifting），改本組的 Echo（送上架）與 Drifting（合起來近 58 分鐘）；定稿 3 張以上只剩術語「田野錄音」×9 與地名「白俄羅斯」×4。qa-batch 34 張與卡單相符、out-2 144–240；qa-check-research 標記 0。

## 寫作層（writer-1）
- **20661** 交件：`desc-tools/batches/output/add-20261023-md28-out-1.json`（17 張，key 逐字同序）。字數（Array.from）：Cthulhu 207、Azathoth 219、Nyarlathotep 222、Khmaoch 217、Earth Songs 231、Ice Breath 228、Border of Worlds 154（thin）、Black Hive 226、Monuments 217、Exit Earth 178（thin）、2148 223、Endtime Psalms 170（thin）、Arctic Gates 225、Humming Tapes 166（thin）、Forsaken 188、Eschate Thule 223、Sanctum 201。full 188–231、thin 154–178，初稿即無超標、無掉下限。
- **20662** 第二句全照 20654 指派領句（廠牌名＋十多位作者／「合作不是合輯」／二十多位音樂人／本名 Sasha Cats／兩人聯手／2010 年 11 月那個冬天／Malyshkin 一人包辦／掛名欄／兩位成員／Olivier／Simon Heath 的分身／Jurica Santek／Malyshkin 與 Puzan 的合寫／副計畫／Alphaxone 與 Dronny Darko 合寫／Thomas Park／Scorpio V 一人詞曲）。日期＋動詞＋前字逐張不同：問世、登場、上市、交給、經…印行、於…上架、年把…交給、經…發行（Black Hive）、由…出版（Monuments）、逗號後「專輯收進目錄」、面世、年這張由…出版、由…印行、逗號後「讓它上市」、面市、逗號後「把…交給…發行」、「發行的《Sanctum》」。曲長句逐張換說法（46 分鐘上下／合計約／長度約／總長約／走完約／全盤約／總時間約／加總約／共約）。
- **20663** hook 代稱與複述：Humming Tapes 的開盤機、走音、降靈會已在 hook，正文只補「題目出自他對舊式降靈會與那個年代的興趣」；Border 的「穿梭各界」與 hook 同義，改寫成「出神之後重生，回來替族人治病」；Forsaken 的瑞典→奧勒岡已在 hook，正文改補廠牌名、Simon Heath 2011 創辦與合作重心；Ice Breath 的「紛亂中安靜」與 hook 同義，整格不寫。Border、Black Hive、Arctic Gates、Monuments 的 note 無樂種字，開頭兩句以 hook 的 drone／音景與國別帶出身分，未從 facts 撈 dark ambient。Sanctum 的 Scorpio V 性別未載，全文不用代名詞。
- **20664** 派工補充照辦：媒體名、樂評、分數、榜單整句不寫；全檔「據」字 0。無鼓類只留 Cthulhu「整首沒有鼓」（note 指派）、Azathoth「找不到任何拍點」、Black Hive「全程無拍」、Sanctum「不靠節拍推進」四種不同句；「低頻」只在 Cthulhu、Forsaken、Eschate Thule，drone／嗡聲／持續音／長音／音墊輪用，避免逐張同句。來源平台名不進正文（Bandcamp 頁一律寫「文案」）。Nyarlathotep「瘋狂而非毀滅」照 note 的對照語，非更正式否定。
- **20665** 自掃（scratchpad `wr-md28-1/chk-md28-1.mjs`，han() 4-gram，合掃 out-1＋out-2 34 張含 hook）：初稿撞「首約分鐘」×9、「年月推出」×3、「長約分鐘」×3、「以之名做／個人計畫」、「年月出版」、「他另一個身分是」、「沉的嗡鳴」等，逐條整名詞改掉；定稿 3 張以上只剩術語「田野錄音」與地名「白俄羅斯」，2 張殘片只剩規定用語「二十多位」（Azathoth hook × Nyarlathotep 正文）、地名「烏克蘭的／俄羅斯的」（其一在 hook）。`node qa-batch.mjs out add-20261023-md28` 34 張與卡單相符、全部通過；`qa-check-research` 17 張標記 0；`fix-spacing` 待補 0。
