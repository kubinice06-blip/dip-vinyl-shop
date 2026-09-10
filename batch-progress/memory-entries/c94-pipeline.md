## 2026-09-05 — dip-vinyl-shop — c-94 走完雲端段（搖滾正典目錄深度 II：金屬／龐克／另類，43 張）

- **改動摘要**：`lineType: 廣度`。**43 張、34 位藝人**（a 金屬與硬蕊 23／
  b 龐克、emo、60–70s 美國另類與日本另類 20），年份 1967–2019。
  各 2 張的九位：Voivod、Accept、Deafheaven、Eyehategod、Deathspell Omega、At the Drive-In、
  The Microphones、Gene Clark、Flower Travellin' Band；其餘 25 位各 1。
  **零 §1 人工身分、零跨批撞卡、43/43 釘住 release-group、合輯 0 張。**
  策展層實掃後主動不收三處（**はっぴいえんど 三張正規盤池中全在、本批零收**、
  Bikini Kill 兩張在池中、Big Brother《Cheap Thrills》在池中）。
- **主要檔案**：`batch-progress/c94/`（prop-{a,b}、caa.json、chk-prop.mjs、rulings.md、HANDOFF.md）、
  `desc-tools/batches/research/c94-{a,b}.json`、`hooks/c94-hooks-{a,b}.json`、
  `input/c94-writer-{1,2}.json`、`output/c94-out-{1,2}.json`、
  `batch-progress/probe/probe-previews.mjs`（**本批催生「素面版本優先」的排序改動**）。
- **驗證結果**：四項機器檢查全過——`qa-batch research/hooks/out c94`、
  `chk-hook-crossgroup c94` 43 張（hook 加權 21–37.5、note 273–350）、
  `qa-check-research` 兩檔各 0 標記、`fix-spacing` 待補 0、`chk-prop.mjs` 43 張 34 位標記 0。
  out-1 23 張 225–235、out-2 20 張 177–235、thin 1 張 ≤180、**未具名出處 0 盞**。
  **封面 43/43、試聽 41/43（us 37／jp 3／gb 1）。**
- **這批的裁定與教訓**：
  1. **「`ready` 不等於配對正確」是這批第一次現形。** a 組 23 張探測**全判 ready**，
     逐張回 lookup 卻抓到四筆配錯版本：Voivod《War and Pain》配到 **31 軌 Box Set**（原盤 9 軌）、
     Killswitch Engage 配到 **Bonus Track Version**（18／12）、Isis《Celestial》配到
     **曲名全帶尾綴的 Remastered**、Cult of Luna《Vertikal》配對正確但 Apple 日期欄錯
     （2012-01-01 vs MB 的 2013-01-25）。前三張已換綁。
     **直接催生探測層排序的改動**：`DECO` 本來只拿來判「年份不計」，
     現在進第一排序鍵——**同樣配得上的候選，素面的那個先**。
  2. **三張標 `expandedReissue`**（Apple 上沒有原盤軌數的條目）：
     King Diamond《"Them"》12／**11**、Neurosis《Souls at Zero》13／**10**、
     Uriah Heep《Look at Yourself》24／**7**。依第 140 條與 c-88《Dances With Wolves》先例採用，
     **多出來的那幾軌不得當原盤曲目**。b 組另有六張的 Apple 條目是加曲版，**行文提軌數必須指明版本**。
  3. **一張因授權換綁**：**Flower Travellin' Band《Make Up》** 原綁 415948199 的逐軌曲長
     與 MB 上那筆 **Bootleg**（2010 GB Phoenix ASH2CD3033）相差不到一秒、與 1973 原盤每軌都差更多，
     ℗ 行寫「2011 Start Entertainments Limited」。依第 43／57／65／78 條，
     **Bootleg 血統的數位版不得當固定試聽來源**，改綁 jp 290811124（℗ 1998 WARNER MUSIC JAPAN）。
  4. **第 49 條在這批有四種不同的形狀**（研究層 b 組逐一實測）：
     **ゆらゆら帝国是同一個 collectionId 在 jp 渲染成日文、在 us 渲染成羅馬拼音**，
     軌數曲序曲長逐項相同——**不是兩張碟**；ザ・スターリン 的羅馬拼音「Mushi」
     **只出現在 Pseudo-Release 標題上**；RCサクセション 最分裂（RG 與四筆 Official 是片假名、
     1976 兩筆是羅馬拼音、Apple 混用）；**Flower Travellin' Band 與 FRICTION 在 MB 與 Apple 上
     都沒有假名實體**（FRICTION 的 MB artist-credit 甚至是「2nd Friction」）。
  5. **封面 43/43 的其中一筆是補回來的**：King Diamond《"Them"》首輪 CAA 回 HTTP 500 且
     `probed:false`——**第 28 條，查詢失敗不是查無**，重打一次即回 200。
  6. **題材界線**：Burzum 那張的來源含 Vikernes 1993 年殺人與縱火判刑，
     **研究層、hook 層、寫作層三層一致避開**，正文只寫錄音、發行、限量 950 張、封面繪者。
  7. **hook 層的新形狀：候選本身踩到下游的純字串檢查。** Voivod 與 Killswitch 的候選都寫了
     「二百大第 N 名」「葛萊美入圍」，「百大」「獎」正是 `qa-batch out` 的裸字串樣式，
     全部下放 note。寫作層最後**事前改寫成「《告示牌》二百大榜最高第 114 名」**，
     避開裸字串同時保留具名主體與名次——**未具名出處 0 盞是這樣換來的，不是刪事實**。
     b 組另有**五處攔截不是事實錯、而是與 a 組的切入型態撞型**（製作預算、姊妹作同批錄音、
     封套物理設計、曲目體量三張），全部換角度、原素材下放 note。
  8. **寫作層的一次自我更正**：FTB《Make Up》〈Hiroshima〉的曲長兩源相衝
     （MB 日本原盤 1489 秒 vs 英文維基 23:56≈1436 秒），hook 的 note 轉述成「二十三分多」。
     初稿照 note 寫了「二十三分五十六秒」，**複核時自己改回 1489 秒**——
     同卡其他曲長全取日本原盤，**混用兩套數字會自相矛盾**。
  9. **交本機**：三組重複卡與一組大小寫分裂——`Happy End《Kazemachi Roman》`＝
     `はっぴいえんど《風街ろまん》`、`Happy End《Happy End》`＝`はっぴいえんど《HAPPY END》`、
     `Big Brother & The Holding Company／and the Holding Company《Cheap Thrills》`
     （**兩筆都掛 hall，合併時要決定留哪一筆的頂點資格**）、`BOREDOMS`／`Boredoms`。
- **下一步**：本機端上傳（三軸與頂點資格、合併第 9 點的重複卡、
  兩張要非 Apple 的試聽來源（FTB《Anywhere》、Bikini Kill / Huggy Bear split）、
  四處寫入與回讀、跑 `build-genre-tree.mjs --write`）。**封面滿版，沒有掃圖工作。**
- **策展層對這條線的判斷**：**金屬正典其實已滿**（Sabbath 10、Priest 9、Maiden 9…），
  本批補的是歐陸傳統重金屬第二線與 2000 年後極端金屬。
  **真正空著的是紐約硬蕊與 90s straight edge——池中全部 0 張，那是覆蓋缺口不是深度缺口，要另開一批。**
