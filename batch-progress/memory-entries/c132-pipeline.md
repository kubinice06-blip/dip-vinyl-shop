## 2026-09-15 — dip-vinyl-shop — c-132 走完雲端段（日本爵士第一世代第一批，45 張）

- **改動摘要**：店主 2026-09-15「日本第一代不只秋吉 其他人也要齊全一點 其實都只要收錄重點專輯5-10張就好」。
  c-131 把第一世代一人一張建起來，c-132／c-133／c-134 三批**把每一位補到 7–8 張**，`lineType: 深掘`。
  本批 **45 張、14 位掛名**（a 渡辺貞夫 6／日野皓正 5／菊地雅章 4／佐藤允彦 5／峰厚介 3；
  b 本田竹広 6／松本英彦 3／宮沢昭 7／白木秀雄 6），年份 1959–2019。
  **零 §1、零跨批撞卡、45/45 釘住 MBID、全部純 Album。**
- **主要檔案**：`batch-progress/c132/`（prop-{a,b}、chk-prop.mjs、caa.json、rulings.md、HANDOFF.md、
  apple-candidates.md）、`desc-tools/batches/research/c132-{a,b}.json`、`hooks/c132-hooks-{a,b}.json`、
  `input/c132-writer-{1,2}.json`、`output/c132-out-{1,2}.json`、`batch-progress/probe/previews.json`（**補 23 筆**）、
  `batch-progress/CURATION-BRIEF-c132-c134.md`（新增）、`label-lines.mjs` 與 `probe/probe-previews.mjs`（登錄 c132–c134）、
  **`batch-progress/dedup-crossbatch.mjs`（加 rgMbid 掃描）**、**84 份 `chk-prop.mjs`（U+30FC 檢查）**。
- **驗證結果**：`qa-batch out c132` 45 張與卡單相符；`chk-hook-crossgroup` 全過（hook 加權 22.5–43.5、note 206–347）；
  `fix-spacing --field desc` 兩檔待補 0；`chk-prop` 標記 0。desc 188–239，**45 張全 full**。
  **封面 36/45；試聽 9 → 30/45（研究層第三種查法找回 21 張）。**
  ⚠ `qa-batch` 的「簡體字 会」是誤報（`トリオ株式会社`）。
- **⚠ 年份改六張**：《Palladium》1969、《Holography》1970、《Transformation '69/'71》1971（資料庫端只有 2000 年代復刻 CD）、
  **《Four Wings》1994→1980**（黑膠原盤 Trio／Full House PAP-9197）、**《Love For Sale》1978→1967**（原盤在 Takt，原題《Now's The Time》）、
  **《Sea Horse》1989→2002**（資料庫端那筆 1989 沒有國別也沒有廠牌）。
  另四張由策展層改判、研究層背書（白木秀雄 1959／プレイズ・ボッサ・ノバ 1963／祭りの幻想 1961／ファンキー!登場 1960，
  **且原盤廠牌更正為ビクター**）。
- **⚠ 裁定 394：`first-release-date` 失真的第四種形狀**——**MB 有一筆「沒有國別、沒有廠牌」的 release**。
  那是登錄者抄來的年份，不是一張碟。**判年份前先看那筆 release 有沒有 country 與 label-info。**
- **⚠ 裁定 397：`secondary-types` 是提示不是真相，兩個方向都會漏**——三張現場盤資料庫沒標 Live
  （c-133 第 424 條是反方向：大野雄二有 16 張原聲帶資料庫沒標）。**`releaseType` 維持資料庫值，事實寫進正文。**
- **⚠ 裁定 399：店面缺席的粒度是「廠牌×時期×權利人」不是廠牌大小**——
  Victor 把日野皓正 1977–90 整批數位化、1971 年那張柏林現場卻不在；佐藤允彦的 コロムビア／DENON 幾乎全有、Sony 系一張都沒有。
- **⚠ 裁定 400a：第三種查法漏查的三種成因**（盤名多後綴／盤名是片假名或羅馬字轉寫／掛在別的 artistId），
  **同一個實體在店面兩個端點還會回不同顯示名**。**藝人目錄那一步要把每個 artistId 的目錄整份 dump。**
- **⚠ 裁定 392：`dedup-crossbatch.mjs` 加一道 rgMbid 掃描**——策展層查到池中
  `菊地雅章《End for the Beginning》` 與 `Masabumi Kikuchi Quintet《End For The Beginning》` **是同一張碟**，
  掛名不同所以鍵比對永遠抓不到。工具改動只報不擋；**全部 95 批 3,951 張卡掃出 0 筆**，
  所以那張重複是**線上池裡的既有卡**，`seed_cards.json` 沒有 MBID 欄、**雲端掃不出來**，留本機。
- **⚠ 裁定 395：日文專有名詞不得當簡體字「改正」**（`稲葉国光` 的「国」是本名用字）。
- **⚠ 裁定 398：擋的是沒有出處的「第一／唯一」，不是這個句型本身**——
  《East Wind》的「イースト・ウィンド廠牌第一回作品」官方頁逐字有，保留。
- **⚠ 裁定 396：第 303 條同形第四次**——研究 b 組在收工回報時被內容過濾砍掉，**檔案 22/22 完整**。
- **缺的**：封面 9 張（五張的補圖路徑研究層已逐張覆核通過，含兩張靠**同碟的重複 RG**拿圖）；
  試聽 15 張無來源。
- **留給本機**：池中那張重複卡；`Masabumi Kikuchi Quintet` 與 `Hidehiko Matsumoto` 兩個英文字串待統一；
  既有卡 `日野皓正《Alone, Alone and Alone》` 年份可能要改（資料庫 1970 vs 店面 ℗1967）。
