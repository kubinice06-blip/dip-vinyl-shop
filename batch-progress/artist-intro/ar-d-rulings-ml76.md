# ar-d-809（ml76）／ar-d-810（ml77）主線審稿（2026-11-06，cloud-main）

- 切批：`batch-progress/mood-cells-20261022/cut-artist-intros-ml76.mjs`，只收研究汰換後留下的卡的藝人；已有介紹或已在其他批排隊的不重切。名冊 `roster-ml76-ar-d-809.json`（30 位）、`roster-ml77-ar-d-810.json`（22 位）。批號照派工 ar-d-809／810，progress.json 與 cut/ 查無撞號。
- 補洞：809 三組、810 三組（Sonnet），特注 WebSearch 整組 ≤15 次；qa-artist gap 皆 0 處。同名排除：Moonchild（Crowley 小說）、FLOX（燃燒製程）、Govinda（印度演員等）、Tusks、GUMI、Nightflyer、Shinji、Era（字義頁）、LAL（姓名消歧）。
- 寫作：各兩組（Opus）。

## ar-d-809 審稿
- 寫 28 位，**不寫 Travelling Day**（只有國籍，無聲音事實）、**Erik Jackson**（只有本人 Bandcamp 一源，且與 MB／Discogs 同名者是否同人未能兩源確認）。
- 改 `smidley`：刪「Foxing 被稱為中西部 emo 場景過去十年最大的樂團之一，2025 年底無限期休團後，Murphy 把 Smidley 轉為全職，並為 Lucy Dacus 的巡演開場。」——評價句單源，休團與巡演只有 2026 年 9 月的報導（超過模型知識截止日，未以第二源核實）；刪「與 Foxing 相去甚遠」壓字數；首句補「美國聖路易樂團」（Stereogum、Bandcamp、MB 一致）；字數降到 156 改標 thin。
- 改 `moonchild`：刪「首張專輯獲 Stevie Wonder 等人讚賞，他還邀三人在年度慈善演出開場」（補洞稿標 single，只有英文維基）。
- 改 `degiheugi`：刪「他平日是大公司的傳播主管……」（單一訪談、私人職業）。
- 改 `govinda`：「EP《Resonance》」→「專輯《Resonance》」（MB 登記 Album，卡池以專輯上架）。
- 專輯稿交叉：Smidley 專輯簡介的「黑色拉不拉多」命名同樣無法覆核，已在 add-20261106-ml76 主線審稿刪除（24591）。

## ar-d-810 審稿
- 寫 21 位，**不寫 Dr. Toast**（只有 Last.fm 本人編輯的一源，qa 擋）。
- 改 `robot koch`：刪「翌年，他獲頒德國音樂作者獎的最佳電子音樂作曲人。」（在世者獎項不寫）。
- 改 `anthony naples`：刪「兩人被形容為紐約舞曲圈的代表人物。」（評價句）。
- 改 `pan amsterdam`：「說他的作品「一點一點」把自己擊倒」→「聽到他的作品後深受吸引」（原句是英文引語的生硬改寫，語意不清）。
- Zero Cult 國籍照補洞稿寫以色列（Discogs、MB）；卡單 country gr 是廠牌所在地，manifest 不改（只影響地區標示，可逆）。

## 合併 main（2026-11-06）
- 並行工作階段先上線了同一批藝人：Degiheugi（ar-d-814）、Potatohead People（ar-d-813）、Zero Cult（ar-d-814）、Ochre（ar-d-815）、Era（ar-d-816）。照先例讓給已上線版本，從 ar-d-809／810 的 output 與 progress keys 移除。**最終上線 ar-d-809 27 位、ar-d-810 17 位，共 44 位。**
