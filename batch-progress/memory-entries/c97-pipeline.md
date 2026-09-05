## 2026-09-05 — dip-vinyl-shop — c-97 走完雲端段（電子目錄深度，44 張）

- **改動摘要**：店主「接力做完十批」的一批，`lineType: 廣度`。
  **44 張、23 位掛名**（a house／techno／12 吋 19／b 氛圍、具象音樂與 downtempo 25），年份 1967–2022。
  Sasha & John Digweed／Throbbing Gristle／Merzbow／The Art of Noise／Enya／Harold Budd 各 3，
  Rhythim Is Rhythim／Basic Channel／Rhythm & Sound／Richie Hawtin／Frankie Knuckles／
  Burial／Coldcut／Pierre Henry／Bernard Parmegiani 各 2。
  **零 §1 人工身分、零跨批撞卡、44/44 釘住 release-group。**
  型態 Album 36／EP 6／Single 2（後八張是 §5.5 白名單，逐張理由在 rulings 第 2 條）；
  另十四張是 `primary-type=Album` ＋ `secondary-types` 含 Compilation／DJ-mix，依第 3 條不填例外欄位。
  **一人多掛名五組、十四個 MB 實體**（Derrick May＝Rhythim Is Rhythim＝Mayday、
  Basic Channel＝Rhythm & Sound、Richie Hawtin＝F.U.S.E.、Global Communication＝Reload 等），
  每個實體單獨掃過線上池。
- **主要檔案**：`batch-progress/c97/`（prop-{a,b}、caa.json、chk-prop.mjs、**rulings.md 12 條**、HANDOFF.md）、
  `desc-tools/batches/research/c97-{a,b}.json`、`hooks/c97-hooks-{a,b}.json`、
  `input/c97-writer-{1,2}.json`、`output/c97-out-{1,2}.json`。
- **驗證結果**：`qa-batch research/hooks/out c97` 全過、`chk-hook-crossgroup c97` 44 張
  （hook 加權 19–33.5、note 288–350）、`fix-spacing` 兩檔待補 0、`chk-prop.mjs` 標記 0。
  主線另跑一次性複驗：**44 張的 `desc` 開頭與 `hook` 逐字相符**、full 218–235、thin 147–178、
  **未具名出處 0 盞**。**封面 44/44、試聽 27/44（gb 23／fr 2／jp 1／us 1）。**
- **這批的裁定與教訓**：
  1. **第 10 條——「缺一段」與「換了內容」是兩回事。** Pierre Henry《Messe de Liverpool》
     的 Apple 條目缺〈Credo〉一段，是**同一部作品的子集**，採用（該筆的軌數與曲目在簡介裡一律略去）；
     Bernard Parmegiani《Dedans dehors》配到的是**不同內容**，不採用。
     **軌數對不上本身判不出是哪一種**——要看少掉的是不是同一部作品的段落。這是通則。
  2. **第 11 條——gb 有條目不等於 gb 拿得到試聽。** Burial《Antidawn》研究層正確指出
     gb 的 `0→0` 是 search 漏碟、gb 條目 1598131152 確實存在；但**那個條目一列曲目都沒攤開**。
     改回 jp 1598321360（5 軌皆有 previewUrl）。
     **「條目存在」與「曲目列攤得開」是兩個獨立的檢查**，第 166 條的藝人頁補救只解決前者。
  3. **試聽 61% 是這條線的真實天花板。** 十七張無試聽逐店面覆核過，
     **其中七張是 DJ mix 盤**（Mix-Up、DE9 兩張、Northern Exposure 兩張、Communicate、
     Fabric 17、Fabric 26）——曲目分屬數十家版權方，授權天生過不了。
     本批八張混音盤裡七張無試聽。**往後電子線再排混音盤要先預期這件事，不要當成漏做。**
  4. **七筆「同一張碟、池中用另一種字串」**（Coldcut《Let Us Play!》vs《Let Us Play》、
     Burial《Tunes 2011 to 2019》vs《Tunes 2011-2019》、Global Communication 的
     `Blood Music: ` 前綴、Parmegiani 兩張的大小寫、Pierre Henry 的 ` et musiques concrètes` 後綴、
     Throbbing Gristle 的句號 vs 冒號、Richie Hawtin 的 `DE9: ` 前綴）——
     **是策展層人眼擋下的，工具一筆都不會報**。正規化處理得掉大小寫與標點，
     **處理不掉前後綴的有無**。**這是現行去重管線的第二個結構性缺口**
     （第一個是第 49 條的盤名羅馬拼音無處可放）。本批不改工具，記在 rulings 的「附」節。
  5. **hook 層攔下七處 hookCandidate 與 facts 衝突**——都是算術與統計推論
     （曲長加總、年差、客座組數、「至少三軌」）與評論分數，以及一句時序推論
     （「Ninja Tune 還沒開張」）。寫作層兩組交件複驗，**沒有一項被撿回去**。
