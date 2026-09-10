## 2026-09-08 — dip-vinyl-shop — c-124 走完雲端段（伊朗：巴列維末期與革命之後，45 張）

- **改動摘要**：店主 2026-09-08「找出獨裁體制下的音樂……任何世界上的國家都可以」
  這條線的第三批，`lineType: 廣度`。**45 張、36 位掛名**
  （a 巴列維末期流行與 funk 24 張／17 位，b 革命後流亡、地下與古典 21 張／21 位），
  年份 1971–2013。**零 §1、零跨批撞卡、45/45 釘住 release-group MBID。**
  伊朗在這條線裡形狀最特別：**體制在中途換了一次，而且換的方向相反**——
  同一批藝人有人留下、有人流亡，錄音的載體與通路整個換過一輪。
- **主要檔案**：`batch-progress/c124/`（prop-{a,b}、chk-prop.mjs、caa.json、HANDOFF.md）、
  `desc-tools/batches/research/c124-{a,b}.json`、`hooks/c124-hooks-{a,b}.json`、
  `input/c124-writer-{1,2}.json`、`output/c124-out-{1,2}.json`、
  `batch-progress/probe/previews.json`（**補 13 筆**）、
  `batch-progress/label-lines.mjs` 與 `probe/probe-previews.mjs`（登錄 c123–c125）。
- **驗證結果**：`qa-batch out c124` 45 張與卡單相符、`chk-hook-crossgroup c124` 45 張全過
  （hook 加權 16–32、note 261–349）、`fix-spacing --write` 兩檔待補 0、`chk-prop` 標記 0。
  out-1 24 張 139–218、out-2 21 張 133–212，**45 張全部落在所屬字數帶**（full 42／partial 3）。
  主線一次性複驗：**45 張 `desc` 開頭與 `hook` 逐字相符**、四位中文數字年 0 筆、
  資料庫與商店名 0 筆、45 張開頭四字互不重複（跨組也不重複）。
  **封面 39/45；試聽 19 → 32/45。**
- **⚠ 這批最有價值的一項：裁定 259 就是在這批抓到的**——
  `release-group` 端點**本來就不回** `label-info`／`media.format`／country／status，
  **「查無」與「沒問」在回傳裡長得一模一樣**。策展層 45 張裡 25 張寫著「MB 未填 label-info」，
  改打 `release` 端點後大量補回，**並抓到三張是廠牌寫錯不是沒填**：
  Raks Raks Raks 是 **Raks Discos RAKS-DISCOS 001**（回傳零處出現 Pharaway）、
  Marjan 是 **Taraneh 193 CD**、Pari Zanganeh 是 **Ocora OCR 57**。
  **這條後來回頭套到 c-122 與 c-125（裁定 262）**：c-122 的 11 筆本來就問對了端點，
  c-125 七筆複驗六筆站得住、錯的是 José Cid 那張（8 筆 release，1978 那張是 Orfeu FPAT 6001）。
- **研究層擋下策展層 45 張卡、222 處**（a 128／b 94），六大類：廠牌三張寫錯、
  **20 張拿不到可靠原盤年**（Dariush 那批的 1991-03-08 端上同日五筆、店面同日十六筆，
  **兩邊都是批次形狀、不算互相印證**）、序數三連環（Namjoo《Toranj》排第三、
  《Gol-e Yakh》名下排第九早、《Sol-e 1》前面還有四張單曲）、版本與載體四處
  （Sattar《Ask》那兩條 29 分鐘的軌是**卡帶的兩面**）、人名從嚴、轉寫不統一。
  **⚠ 最險的一筆是《Persian Music Hits 8》**——十軌是十個不同掛名、卡單那位只唱第 7 軌，
  **照策展稿行文一定會寫成「他的十首歌」。**
- **§5.6 八張本輪重補了四張的舉證（裁定 263）**：原本掛的兩個非資料庫網址
  **都是「廠牌總覽頁」這種通用類別條目**（兩個 403、兩個 200 但逐字搜過整頁沒提到本輯），
  而**這個形狀還掩護了兩個廠牌欄錯誤**。已改成 release-group ＋ release 兩個資料庫網址
  （先例是 c-123 的 Grünberg），`exceptionReason` 同步重寫。
  **另外：`musicbrainz.org` 的網頁版現在擋機器抓取（任何 UA 都回 1396 bytes 的 JS 挑戰頁），
  覆核 MB 舉證要打 `ws/2` API。**
- **寫作層抓到兩處研究層的自我矛盾（裁定 264）**：
  Leila Forouhar 那張 `facts` 寫「其餘**五**軌」、`sound` 寫**六**軌，**而 hook 沿用了錯的五**
  （hook 是 desc 第一句，錯的數字已進正文開頭）；
  Raks Raks Raks 那張 `facts` 先寫「四個曲名是英語」隨即自結「共六個」，**兩個數字都不對**。
  四層檔案已同步修正。**三道自動檢查全過也擋不住——沒有一道會把 `facts` 裡的兩個數字放在一起比。**
- **缺的**：封面 6 張（全是伊朗國內或流亡社群原壓，封面藝廊零版本，只能人工掃圖）、
  試聽 13 張無來源。
- **下一批最現成的**：伊朗古典（radif／dastgāh）自成一線，Ocora／Nimbus／Kereshmeh
  三家的伊朗目錄在池中幾乎全空；**Kayhan Kalhor 的六張已在池中但掛在別的藝人名下**，
  藝人名折疊掃不到，本機併寫掛名時要一起處理。
  同一條體制線下一輪：波蘭 17/20 零、柬埔寨與緬甸 18/20（**先查 c-64**）、
  匈牙利與羅馬尼亞 15/20、衣索比亞 15/20、捷克斯洛伐克 14/20。
