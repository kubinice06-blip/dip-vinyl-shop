# 已上線內容修正包（2026-09-30 雲端定案，交本機套用）

店主指示「需要我決定的都直接做」。以下全部已定案；本機只需照檔寫入，不需再判斷。
雲端無 KV 權限、依 REMOTE_RUNBOOK 不改 seed_cards.json，所以停在「可直接套用」這一步。

## 1. 專輯簡介（寫 KV）— `APPLY-desc.json`（274 則）

每筆 `{artist, album, oldDesc, newDesc, why[], chars}`。套用：以 artist＋album 找到 KV 的簡介鍵，
先比對 KV 現值 === oldDesc（不一致就跳過並記錄，代表本機已改過），一致就寫入 newDesc，再跑 verify-kv 逐字驗證。

- 更正 133 則補洞層查到的錯誤（`pub-fixes-1/2.json` 是逐條決定與依據；keep 的不在 APPLY 裡）。
- 去出處 163 則：正文裡「維基記…」「MB 記…」「Discogs 記…」與樂評媒體背書全部改寫為不具名敘述（`wiki-fixes-final.json`）。
- 整段重寫 2 則：Lou Rawls《Lou Rawls Live!》（原文是退件說明；依 1966 Capitol 版重寫，`lou-rawls-1966.json`）、Bukka White《Big Daddy》（原文混入管線文字）。
- 兩者重疊的 5 則已由主線合併（Amar Prem、South London Boroughs、The Celts、Unworthy、trash）。
- `need-local.json`：Grant Green《Here 'Tis》、Nino Rota《Casanova》兩則雲端沒有全文，附建議改法。

## 2. 卡片（改 seed_cards.json）— `card-fixes.json`／`CARD-FIXES.md`

- 拆卡 16 張：改藝人欄為「英文原名 (國家或身分)」。改名後同步藝人介紹分片鍵、genre-artist-map、query-aliases。
- 年份 11 張＋Lou Rawls《Lou Rawls Live!》改綁 1966 Capitol release-group（年份 1966、換封面）。
- keep 8 件附理由（新寶島康樂隊《腳開開》專輯名正確、Tangerine Dream《Sorcerer》PPG 不用改等）。

## 3. 其他

- 秋吉敏子《Her Trio Her Quartet》：補改「整張沒有她自己的作品」（她寫了〈Salute to Shorty〉〈Pea, Bee and Lee〉），已含在 APPLY-desc。
- 補洞代理兩次在 MusicBrainz 查詢的 User-Agent 帶了店主 email（各一次），已停止；日後派工明令禁止。

---

## 套用紀錄（2026-10-04 本機）

第 1、2 節**已全部套用**，前後對照在 `APPLIED-20261004.json`（要還原某一則：把 `oldDesc` 包成 `{"desc":…}` 寫回該鍵）。

- **簡介 1,074 個鍵**：`APPLY-desc.json` 274 則全數命中 oldDesc、零跳過；`need-local.json` 2 則照建議做最小改動
  （《Here 'Tis》的卡掛在 Lou Donaldson 名下，Casanova 的卡名是《Il Casanova di Federico Fellini》，腳本是 `need-local-apply.mjs`）；
  另把中文行文裡的半形標點改全形 824 則（`scripts/apply-pub-fix-desc.mjs`，《》〈〉內的原文標題不動）。
- **卡片 28 張**：年份 12 張（含 Lou Rawls《Lou Rawls Live!》1978→1966）、拆卡 16 張（`scripts/apply-pub-fix-cards.mjs`）。
  Lou Rawls 那張的 release-group 與封面早在 08-28 就已改綁 1966 版，這次只差年份與簡介。
  Supershy《Happy Music》曲風照建議由 jazz 改 electronic。
- **拆卡後還缺三樣**（都不是雲端能做的）：
  1. `album_overrides` 是管理員寫入保護，**三張的固定試聽要店主在後台重貼**（網址在 `APPLIED-20261004.json` 的 `albumOverridesToReset`）。
  2. 九個新藝人名（Steve Lacy (The Internet)、Placebo (Belgium)、Caravan (Thailand)、Ghost (Sweden)、Wings (Malaysia)、
     Air (US jazz trio)、John Williams (guitarist)、Mother Earth (Tracy Nelson)、Supershy）**還沒有藝人介紹**，請排進藝人介紹線。
  3. `rock-subgenre-map.json`／`genre-artist-map.json` 沒有新名字的條目；`card-subgenres.json` 這次是直接換鍵，
     下次跑 `build-genre-tree.mjs --write` 時這 16 張會退回標籤後備重新歸類。

## 第二輪待修（已排入）— `ROUND2-QUEUE.md`／`.json`

`scripts/build-pub-fix-queue.mjs` 產生，對的是第一輪套用**之後**的 KV 現值。優先序：

1. ~~**B1 退件說明 2 則**~~ **已於 2026-10-04 本機處理完**（`round2-b1.json`／`round2-b1-apply.mjs`）：Coleman Hawkins《Body and Soul》、Odyssey《Odyssey》。
   兩張的 release-group 與封面其實 08-23 就重配正確了，沒跟上的是簡介、三軸、年份、曲風與 UPC——
   那些欄位當時是對「配錯的那張碟」寫的佔位值。**同形狀的卡（重配過身分、其他欄位沒重做）可能還有**，
   線索是 manifest 的 `ratings.note` 或 `exceptionReason` 裡寫著「佔位」「退回」。
   **候選 19 張已逐張核對（`round2-rebind-check.md`）：沒有第三張同形狀的卡。** 但對出兩個資料錯誤
   （蔡琴《蔡琴老歌》固定試聽配到另一張選輯、Ana Moura《Desfado》把 fado 標成 jazz）、Queen《Greatest Hits》的殘留欄位，
   以及三種簡介寫法問題：c-129 有 11 則以「這張沒有試聽來源。」收尾、正文夾諺文 72 則、資料庫口吻 93 則。
   **資料錯誤、Queen、c-129 那一句、徐太志那一則都已於同日修掉**（`round2-smallfix-apply.mjs`）；其餘見下面第 5 點。
2. **C 人工補記 6 則**：Ofra Haza、Khaled、Souad Massi 兩張、齊豫《橄欖樹》（只有 desc4，建議直接寫一則 desc2）、Fabrizio De André。
3. **A 事實更正 268 條／234 張卡**：補洞層記下、第一輪還沒定案的。其中 55 條的原句在線上已經找不到，派工前先看「原句還在」欄。
4. **B1b「本卡」版本說明 7 則**、**B2 正文點名出處候選 786 則**（Discogs 263、AllMusic 240、維基 226、MusicBrainz 115）——
   B2 是候選不是定案，「樂評人當故事角色可具名」那條規則之下有些是合法的，逐則判斷。
5. **B3 資料庫口吻候選 176 則**（2026-10-04 店主裁示排入改寫）、**B4 正文夾諺文 71 則**。
   B3 是把 MusicBrainz／Discogs 的條目結構講給客人聽的寫法——「這個條目底下的三張碟」「另外兩筆連日期都沒有」
   「資料庫端以 Laos 為題的盤裡，這張建檔年代最早」。集中在 c-9x 之後資料稀薄的卡：查得到的只有資料庫欄位，於是把欄位本身寫成了內容。
   **改寫方向**：同樣的事實換成唱片的口吻（「這張出過三種版本，曲目幾乎不重疊」），查不到的就不寫，不要交代「哪一欄是空的」。
   176 是字樣命中的候選（「兩筆成績」這種正常句子也會中），核心約 90 則。
   B4 把機構名、人名譯成中文即可（書名號內的原文曲名不動）；韓國藝人常見寫法是「原文（羅馬字）」，照 `hook-base` 的規則正文不留諺文。

照第一輪的格式交件即可（`{artist, album, oldDesc, newDesc, why[]}`），本機用 `scripts/apply-pub-fix-desc.mjs` 同一套比對方式套用。
**新稿請用全形標點**——第一輪的 274 則新稿裡有 26 則帶半形逗號，是本機套用時才補正的。
