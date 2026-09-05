## 2026-09-05 — dip-vinyl-shop — c-101 策展提案（遊戲原聲正典）

- **改動摘要**：新增 `batch-progress/c101/prop-a.json`（26 張）與 `batch-progress/c101/prop-b.json`（19 張），
  合計 **45 張、26 位藝人**，`lineType: 廣度`。
  - **a 組＝遊戲原聲正典：日本廠牌世代（26 張、13 位）**：
    植松伸夫 4（ファイナルファンタジー IV OSV 1991／VI OSV 1994／VII OST 1997／IX OST 2000）、
    近藤浩治 3（スーパーマリオ64 1996／時のオカリナ 1998／ムジュラの仮面 2000）、
    下村陽子 3（LIVE A LIVE 1994／聖剣伝説 Legend of Mana 1999／Kingdom Hearts 2002）、
    光田康典 3（クロノ・トリガー 1995／Xenogears 1998／Chrono Cross 1999）、
    崎元仁 3（FF Tactics 1997〔與岩田匡治共掛〕／VAGRANTSTORY 2000／FF XII 2006）、
    古代祐三 2（Actraiser 1991／Bare Knuckle 1991）、岡部啓一 2（NieR Gestalt & Replicant 2010／NieR:Automata 2017）、
    目黒将司 2（ペルソナ3 2006／ペルソナ5 2017）、菊田裕樹 1（聖剣伝説2 1993）、
    山根ミチル 1（悪魔城ドラキュラX 月下の夜想曲 1997）、Akira Yamaoka 1（SILENT HILL 2 2001）、
    伊藤賢治 / 植松伸夫 1（Romancing Sa・Ga 1992）。
  - **b 組＝獨立遊戲與西方大作（19 張、13 位）**：
    Toby Fox 2（UNDERTALE 2015／DELTARUNE Chapter 1 2018）、C418 2（Minecraft Volume Alpha 2011／Beta 2013）、
    Austin Wintory 2（Journey 2012／ABZÛ 2016）、Mick Gordon 2（DOOM 2016／DOOM Eternal 2020）、
    Darren Korb 3（Bastion 2011／Transistor 2014／Hades 2020）、Lena Raine 1（Celeste 2018）、
    Jesper Kyd 1（Assassin's Creed II 2009）、Disasterpeace 1（FEZ 2012）、Grant Kirkhope 1（Banjo-Kazooie 1998）、
    David Wise 1（Donkey Kong Country 2 1995）、Christopher Larkin 1（Hollow Knight 2017）、
    Gareth Coker 1（Ori and the Blind Forest 2015）、Christopher Tin 1（Calling All Dawns 2009）。
  - **合輯 0 張**：45 張的 `primary-type` 全部是 Album，44 張 `secondary-types` 為 [Soundtrack]、
    1 張為空（Christopher Tin），**`primary-type=Compilation` 0 筆**，全批依 §5.6 明文與
    c-90 裁定第 3 條、c-95 裁定第 1 條走一般 Album 寫法、例外欄位留空。
- **主要檔案**：`batch-progress/c101/prop-a.json`、`batch-progress/c101/prop-b.json`、
  `batch-progress/c101/rulings.md`（10 條策展裁定）、`batch-progress/memory-entries/c101-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c101/chk-prop.mjs a b` → 45 張、26 位、**標記 0**；
  跨批去重掃到 53 批（其中 3 批讀 prop）、2,470 張卡，**跨批撞卡 0**。
  45 張全部釘住 release-group MBID 並**逐一回問 `release-group/<id>?fmt=json&inc=artist-credits+releases`**
  確認 primary-type、secondary-types、artist-credit、first-release-date 與轄下 release 的國別／status；
  另在 `mbNote` 逐張寫出 **167 個「刻意不釘」對照組 MBID**（分佈在 43 張卡上，依裁定第 162 條的固定格式）。
  撞卡檢查以**日文與羅馬拼音兩種寫法**實掃 `seed_cards.json` 全 14,424 列，26 個作曲家名字**全部 0 命中**。
  封面：45 張 CAA release-group 端點**逐張實測 200**。
  試聽：Apple `jp` 與 `us` 兩店面**逐張都試過**（GAME 店面序），33 張有可用條目、12 張兩邊皆無。

### 這批的裁定（策展層自決，依 2026-09-02 店主下放；全文見 `batch-progress/c101/rulings.md`）

1. **派工信說「Christopher Larkin 池中已 3 張」是錯的——實掃是 0。** 抽測的 26 個名字全部 0 命中，
   池中唯一沾邊的兩筆都不是遊戲（Disasterpeace《It Follows》是電影、すぎやまこういち《イデオン》是動畫）。
2. **全批 45 張 `releaseType: "Album"`、例外欄位留空**，§5.6 一次都沒用到——遊戲原聲在 MB 上
   一律建成 `Album + [Soundtrack]`。這條要往後傳給 c-102。
3. **掛名取 MB 藝人實體的寫法，即使該張的 artist-credit 是另一種文字**（第 6／70／120 條）：
   《Xenogears》的 credit 是 `Yasunori Mitsuda` 但掛 `光田康典`、《Bare Knuckle》的 credit 是
   `Yuzo Koshiro` 但掛 `古代祐三`；反過來，山岡晃的 **MB 實體名就是拉丁 `Akira Yamaoka`**，所以那張掛拉丁。
4. **兩張改掉 MB 的連字號**（C418 兩張的 en dash、Banjo-Kazooie 的 U+2010 → ASCII，依第 117 條），
   **一張改掉 MB 的 credit 順序**（FF Tactics 取 `崎元仁 / 岩田匡治`，依 c-95 裁定第 3 條與第 16 條）。
5. **Street Fighter II 不收**：MB 三個候選分別只有 GB/Promotion 一筆、JP/Bootleg 一筆、
   2015 年 Laced 的後世整編；日本原盤《G.S.M. CAPCOM 4》查無，`COMPLETE FILE` 掛的是
   「カプコンサウンドチーム」不是作曲家。依第 73 條釘不住就不收，記入 §1 候選。
6. **骨幹名單外自行補進 5 位**（菊田裕樹、山根ミチル、Akira Yamaoka、Gareth Coker、Christopher Tin）；
   **沒補桜庭統、Olivier Deriviere、Jessica Curry、すぎやまこういち**，理由逐條記在 rulings。
7. **Christopher Tin《Calling All Dawns》收，但在 `risk` 明寫它不是原聲盤**——它是含〈Baba Yetu〉
   （Civilization IV 主題曲）的聯篇歌集，是「遊戲音樂第一次拿葛萊美」那個節點。
8. **167 個「刻意不釘」分四類**：編曲盤（Piano Collections／Orchestral／JAZZ／Remix）、
   後世重製盤（PIXEL REMASTER／REVIVAL DISC／HD／-2024-）、黑膠選輯與盒裝、同名近名假陽性。
   特別點名兩組給下游：光田康典《クロノ・トリガー》（卡片日文盤名 vs 兩筆英文標題的重製 RG，
   標題分會反過來）、Darren Korb《Hades: Singles》vs《Hades: Original Soundtrack》。
9. **店面**：33 張有可用 Apple 條目、2 張 jp 與 us 是不同 `collectionId`、
   12 張兩店面皆無（任天堂、Atlus、Disney、Konami 舊作、Bethesda 數位獨佔——版權方沒上串流，
   不是比對擋掉）。
10. **封面 45/45 CAA 200**，包括 Apple 完全查無的那 12 張。
