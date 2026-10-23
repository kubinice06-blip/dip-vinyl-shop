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
