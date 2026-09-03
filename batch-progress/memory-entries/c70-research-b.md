## 2026-09-03｜dip-vinyl-shop｜c-70 研究層 b 組（日本 1984–90 indie 廠牌，19 張）

**改動摘要**：續跑並補完 `desc-tools/batches/research/c70-b.json`。上一支代理撞 API 額度中止時
已完成 7 張（The Willard／吉野大作／パパイヤ・パラノイア／Lip Cream／遠藤ミチロウ／メトロファルス／
JUN SKY WALKER(S)），本次從第 8 張接續補完 12 張：人生、木魚、黒百合姉妹、Madame Edwarda、
G-Schmitt、YBO²、Asylum、Z.O.A、カーネーション、FRICTION、少年ナイフ、After Dinner。
既有 7 張的內容未改寫，只把兩條 `src` 從 `http://` 改成 `https://`
（lionmerry.com、junskywalkers.jp，兩者實測 https 皆回 200）。

**主要檔案**：`desc-tools/batches/research/c70-b.json`（19 筆，全數 `full`，facts 共 165 條、
每張 7–10 條、每條都帶可開啟的 HTTPS `src`）。

**主要來源**：Discogs 公開 API（原盤內頁、逐軌 credit、`masters/<id>/versions` 的授權狀態、
`labels/<id>` 的廠牌 profile 與目錄）、MusicBrainz release-group、CDJournal、音楽ナタリー系媒體
Rooftop、徳間ジャパン 官方特設頁 `wax2016`、Disk Union／Tower／TICRO 的商品文案、
DOMMUNE 的解散節目介紹、vk.gy、Haco 的 Bandcamp，以及**有行內引註的**日文維基段落。

**驗證結果**：`node qa-batch.mjs research c70` → b 組 19 筆全 `full`、
「key 與卡單完全一致 ✓」、總標記 1。**該標記是已查核的誤報**（第 32 條的形狀）：
`⚠ research-b 簡體字: 会`，三處全部落在既有 7 張裡的日文專名與日文引語——
パパイヤ・パラノイア 的「ヤマハ音楽振興会」（版權欄，fact 與 notes 各一次）與
遠藤ミチロウ 那段日文引語裡的「都会」。**「会」是現代日文的正規字形，不是簡體污染**，
改掉等於竄改日本法人名與引語，因此不修規則、不改內容，記為誤報。

**推翻／更正策展層三處**（已寫進各卡 `notes`，第 35／55／59 條的形狀又一次）：
1. **黒百合姉妹**：`curatorWhy` 寫「佐藤幸雄的 SSE Communications」→ **錯**。
   日文維基（全篇引《宝島》No.223 1991-05-09 的 JURI 專訪）與原盤 credit 都指向
   **北村昌士**：SSE COMMUNICATIONS 是他設立的，本碟的製作與 tape 也掛他。已禁用「佐藤幸雄」。
2. **G-Schmitt**：`curatorWhy` 寫「Auto-Mod 的 Genet 主持的 Wechselbalg Syndicate」→ **不完整**。
   Discogs 廠牌 profile 明寫廠牌是 **Tomohiko Miyabe 與 Genet 兩人**在 1984 年創辦，
   而且**本碟的製作人是宮部智彦，不是 Genet**。已禁用「Genet 製作」「Genet 的廠牌」。
3. **カーネーション**：`curatorWhy` 寫「第三張專輯」，但 Disk Union 的文案寫「第二張專輯」，
   兩說並存且只有一邊有可引來源 → 依第 18／46 條**行文一律不寫序數**，
   要寫先後只能用 Discogs 藝人目錄的順序。另 Disk Union 那句「1988 年由メトロトロン・レコード
   發表」與原盤條目的廠牌（Wax／徳間）對不上，已禁用「由 Metrotron 發行」。

**互斥條款分派**（第 58 條；同批四家廠牌 ＋ 一條跨組線）：
- **ナゴムレコード**：廠牌位置線（ケラ 運營、有頂天以外第一支出 LP 的樂團）→ **木魚**；
  ケラ 在前座現場攔下他們那個招攬故事 → **人生**；
  「這支團在ナゴム 的那張單曲是廠牌史上倒數第二賣不掉的唱片」→ **カーネーション**。三張互不重述。
- **Transrecords／SSE**：廠牌史（北村昌士、《FOOL'S MATE》、TRANS 07、後改名 SSE、2015 復刻第一彈）
  → **YBO²**；**Asylum** 只拿 Gazelle 監修＋SICK BOYS 音源那一端；
  **Z.O.A** 與 **黒百合姉妹** 只能寫廠牌名，黒百合姉妹 另分到「《FOOL'S MATE》刊出後才受注目」
  與「北村掛本碟製作」這條與本團直接相關的因果。
- **Wechselbalg／City Rocker**：廠牌創立（宮部智彦＋Genet，1984）→ **G-Schmitt**；
  **Madame Edwarda** 只拿「Genet 共同製作了本碟」與 CLUB WALPURGIS。
  **Telegraph 與 Auto-Mod 的來歷全部留給 a 組**，兩張都禁止展開。
- **Wax Records**：廠牌性質與 2016 年二十二張復刻企劃（徳間官方頁把 FRICTION 點名為
  WAX「新錄音」那一線的代表）→ **FRICTION**；**カーネーション** 只寫廠牌名與那一張的規格。
- **キャプテンレコード**：既有 7 張已把「目錄第一號／兩萬張」判給 The Willard、
  「收益創立 Captain」判給遠藤ミチロウ；人生與 Z.O.A 各有一句提到 Captain 發行了他們的別張作品，
  已明令不得帶出廠牌史。
- **跨組（a 組已用掉、b 組禁用）**：Zero Records 廠牌線與平川晋、「8 吋唱片」這個賣點、
  Calvin Johnson／Cobain 那條線全部判給 a 組的少年ナイフ《Burning Farm》——
  b 組的《Pretty Little Baka Guy》改以「同年美國 Subversive 12 吋、封套並印京都與佛州兩個地址、
  五間錄音室、7×7 吋日英雙語歌詞單」切入，**After Dinner** 只能寫「Zero Records」廠牌名。

**年份**：19 張全部維持卡單值，四張標了分歧並在 `notes` 明令行文不得正面斷言發行年
（第 18／46／86 條）——Madame Edwarda（Discogs 1984-02 vs MB 1984-06-25）、
FRICTION（Discogs／版權標記／徳間官方頁皆 1988，MB 記 1989，依第 95 條 rgMbid 不是年份來源）、
木魚（月份只有 Apple 中繼資料與無引註的維基表，禁寫月份）、
カーネーション（序數兩說，改用目錄順序）。

**授權狀態逐張實查**（第 43／57／65 條）：18 張的 Discogs master 零筆 Unofficial；
唯一一筆未授權是 **After Dinner** 的 2017 年美國 Abducted Tapes 卡帶，已在 fact 標明並明令不採為背書。
**G-Schmitt** 至今零再發（master 只有 1986 年的亮面／壓紋兩種封套版本），依第 82 條以廠牌史與樂評舉證。
