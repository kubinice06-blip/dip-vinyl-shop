## 2026-09-05 — dip-vinyl-shop — c-95 走完雲端段（爵士與藍調目錄深度，44 張）

- **改動摘要**：`lineType: 廣度`。**44 張、41 位藝人——藝人數是十批裡最高的，幾乎一人一張**
  （a 戰前藍調與芝加哥電藍調 23／b 爵士正典搖擺到自由 21），年份 1953–1994。
  **零 §1 人工身分、零跨批撞卡、44/44 釘住 release-group、合輯 0 張。**
- **主要檔案**：`batch-progress/c95/`（prop-{a,b}、caa.json、chk-prop.mjs、**rulings.md 12 條**、HANDOFF.md）、
  `desc-tools/batches/research/c95-{a,b}.json`、`hooks/c95-hooks-{a,b}.json`、
  `input/c95-writer-{1,2}.json`、`output/c95-out-{1,2}.json`。
- **驗證結果**：四項機器檢查全過——`qa-batch research/hooks/out c95`、
  `chk-hook-crossgroup c95` 44 張（hook 加權 19–46.5、note 313–350）、
  `qa-check-research` 兩檔各 0 標記、`fix-spacing` 待補 0、`chk-prop.mjs` 44 張 41 位標記 0。
  out-1 23 張 176–235、out-2 21 張 218–235、thin 1 張 ≤180、
  **未具名出處 0 盞（兩組都未做規避改寫，是動筆時就避開的）**。
  **封面 43/44、試聽 37/44（us 34／gb 3）。**
- **這批的裁定與教訓**：
  1. **錄音年 ≠ 出版年：44 張裡有 30 張兩者不同，另有七張的錄音年查無來源**
     （Victoria Spivey、Lonnie Johnson、Willie Dixon、Kid Ory、Jelly Roll Morton《The Pearls》、
     Sidney Bechet、Django）——**那七張的正文一個數字都沒填**。
     ⚠ **先前一版派工單把前三張列進「錄音＝出版同年」是錯的，hook 層 a 組回頭更正的。**
  2. **七張試聽要換綁或改判**，每一張的成因都不同：
     Robert Johnson《Vol. II》被配到 **1961 年的第一輯**（第 168 條的卷號形狀，修法前探測的）；
     Earl Hooker《Sweet Black Angel》配到 ℗2017 同名整編、**11 軌沒一軌對得上** → 改判 unavailable 並列黑名單；
     Jelly Roll Morton《The Pearls》被 gb 的 ℗2012 盤命中，**而策展層的 `risk` 本來就指名 us 那一筆**
     ——「先命中的店面贏」贏在錯的一邊；Victoria Spivey 從 2009 Remastered 換成素面的 us 1962 盤；
     **Albert Ayler 的 explicit 雙胞胎在 gb 不在 us**——第 166 條的變形，
     **往後找雙胞胎不能只在同一個店面找**。
  3. **一張鎖軌**：Roy Eldridge & Dizzy Gillespie《Roy & Diz》的 Apple 條目是
     **Vol.1＋Vol.2 合併的 9 軌 CD，預設第 1 軌是 Vol. 2 的曲子**——
     試聽已鎖第 6 軌〈I've Found a New Baby〉（原盤 A1），記 `lockedTrack: 6`。
  4. **一張禁寫曲目**：Fletcher Henderson《Tidal Wave》的 **MB 與 Apple 曲目表打架**
     （兩邊都 21 軌但只有中段重疊，MB 那筆 release 的廠牌登記可疑）。
     **只當試聽來源，本張禁寫任何曲目與軌數**——正文做到零曲目、零軌數、零曲序。
  5. **Sidney Bechet《The Fabulous Sidney Bechet》的 rgMbid 沒有釘錯**：
     RG 的 `first-release-date` 是 2001-01-09、轄下只有 2001 Blue Note CD，**MB 缺了 1958 的 BLP 1207**；
     MB 上以這盤名為題的 RG 只有兩個，另一個是 1952 年的別張碟。
     **第 91／95 條：rgMbid 是身分鍵不是年份來源。** 年份維持 1958，正文不得引 2001，
     **本機拿到實體應覆核**（1958 目前只有 Apple 一個外部背書）。
  6. **時序與序數類幾乎全軍覆沒**：研究層兩組擋下十四處，**兩處與來源相反**——
     Roscoe Mitchell《Old / Quartet》**不是 1975 年的重聚錄音**（維基三個錄音日全在 1967，
     連帶「雙 LP」也不成立）；Albert Ayler《My Name Is Albert Ayler》**不是首張錄音室專輯**
     （維基引 Schwartz 明講前一張是《Something Different!!!!!》）。
     **四處事實就地更正**：Blind Lemon 那兩筆 Apple 的版權欄是 Milestone 與 Black Swan
     不是策展層說的 Riverside；《Spirits Rejoice》維基定性是 **live album**；
     Zodiac Suite 的「市政廳＋管弦」是把 Town Hall 與卡內基**混成一場**；
     Teddy Wilson 的 Goodman 三重奏是 **1935** 年且主詞是 Wilson 本人。
  7. **hook 層兩組合計攔下 34 處，十七處是年差或數量換算。**
     另兩處是**逐項核對推翻的數字**：Sippie Wallace 的候選「1923 年在 Okeh 錄的歌，
     1966 年才第一次變成一張專輯」**與 `yearVerified` 直接衝突**（本盤錄音＝發行皆 1966）；
     Kid Ory 的「六首曲名帶 Blues」**逐名核對七軌其實七首都含**——裁定一律不寫數字。
  8. **CAA 首輪一筆 HTTP 500 已補回**（Art Tatum《God Is in the House》，第 28 條）。
     **仍缺封面的只有 James P. Johnson《Carolina Shout》一張。**
- **下一步**：本機端上傳（掃 1 張封面、三軸與頂點資格、四處寫入與回讀、
  覆核 Bechet 的 1958、跑 `build-genre-tree.mjs --write`）。
  **上架前逐張讀 `previews.json` 的 `note`**——37 張 ready 裡 12 張帶換綁說明、鎖軌指示或引用限制。
  **這批 44 張裡 30 張是後世整編輯，`obscurity` 要看藝人不是看這一版的流通量。**
- **策展層對這條線的判斷**：**爵士美國正典的主線已經很飽**（Miles 41、Coltrane 34、Monk 20、
  Bill Evans 23），**真正空的是它的兩端**——1920–30 年代紐奧良與 stride、
  以及戰前 classic blues 女歌手與 jug band，本批補的就是這兩端。
  **補完後仍明顯偏薄的是戰後 jump blues／R&B 與 boogie-woogie 鋼琴。**
