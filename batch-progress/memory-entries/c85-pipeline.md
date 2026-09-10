## 2026-09-04 — dip-vinyl-shop — c-85 走完雲端段（英國 lovers rock／UK roots 與 1990s dub 小廠，45 張）

- **改動摘要**：深掘線 **45 張、43 位藝人**（a：英國 lovers rock 與 UK roots 小廠 22 張、1975–88；
  b：英國 1990s dub 小廠 23 張、1990–98）。廠牌 Burning Sounds 5、Conscious Sounds 4、Dubhead 4、
  Cha Cha 3、Third World 3、Third Eye Music 3、Universal Egg 3、Ariwa 2、On-U Sound 2、
  Jah Shaka Music 2 等共 21 家。零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group、
  `releaseType` 全部 Album、**零合輯（無 §5.6 案例）、零例外條款**。
  策展層事前填了 **32 張 `queryAlias`、21 張 `reissuedBy`**——這條線的盤名與廠牌歸屬普遍不穩。
- **主要檔案**：`batch-progress/c85/`（prop-{a,b}、caa、previews、fix-rgmbid.log、HANDOFF.md）、
  `desc-tools/batches/research/c85-{a,b}.json`、`hooks/c85-hooks-{a,b}.json`、
  `input/c85-writer-{1,2}.json`、`output/c85-out-{1,2}.json`、
  `batch-progress/c53/rulings.md`（第 157 條在本批立）。
- **驗證結果**：`qa-batch hooks c85` 全部通過；`chk-hook-crossgroup c85` 45 張全過
  （a 組 hook 加權 18–48.5／note 248–346，b 組 19.5–49.5／301–350，跨組開頭無一撞線）；
  `qa-batch out c85` out-1 22 張 217–239、out-2 23 張 221–239、合計 45 張相符、`>260` 為 0、
  **全部通過 ✓**；`qa-check-research` 兩檔各 0 標記；`fix-spacing` 待補 0；
  `fix-rgmbid` **修正 0**（原本就對 45）。**封面 32/45（來源全部 CAA）、試聽 23/45。**
  **「未具名出處」四層都是零。**
- **這批的裁定與教訓**：
  1. **命中的 23 個試聽全部落在 `gb`，零次落在別的店面。** 這是純英國線，
     `probe-previews.mjs` 的 `UKB` 順序把 gb 排在 us 之前。
     **線的地域與 storefront 順序對上，命中率就是這樣來的**——這條反過來也就是第 158 條。
  2. **這條線「Apple 上找到了」幾乎都不是這張碟。** 探測層判 ready 的 23 張，
     研究層回查後**推翻或加限定的就有 11 張**，比例是本線之最。形狀分五類：
     二合一 3 張（**全部沒有任何標記**，其中 Al Campbell 那張策展層已在 `risk` 預判、探測層漏標）、
     別人的同名碟或後世合輯 2 張、曲序錯位 2 張、標題自稱原版其實是重製版 1 張、
     ready 但整份曲目被後世改寫過 2 張。
  3. **立第 157 條：曲名全對、曲長全對、曲序全錯。**
     The Disciples《Infinite Density of Dub》的 Apple 15 軌**曲名一一對應、曲長逐軌相符**，
     只有第 2、14 軌在原位、其餘十三軌全部錯位。
     **碟是對的、試聽可用，但固定試聽取 Apple 第 1 軌會取到錯的開場**
     （Apple 是〈Absolute Motion〉，原盤是〈Higher Dimensions〉）——**要按曲名取。**
  4. **第 152 條最典型的一張在這批**：Winston Edwards & Blackbeard 那張，
     探測層八個 storefront 全判 unavailable，**其實 Apple 上就有**——
     成因是**盤名的兩截被倒置、而且把掛名也塞進了括號裡**。
     主線直查 collectionId 576239322 覆核：10 軌、曲名與曲序與原盤完全相同。
     另外它第 1 軌回 299547 毫秒，**`Math.round` 換算會溢位成不合法的「4:60」**。
  5. **一張碟有幾首歌可以沒有唯一答案**：Zion Train《Passage to Indica》
     **三份紀錄三個軌數**（1993 黑膠 8／1993 CD 5，每軌是串成的一段／2005 雙黑膠 8+6）。
     依第 141 條禁止給總數，寫作 b 組全批因此一句軌數總數都沒寫，
     差異一律寫成結構（「黑膠曲目表停在〈Super Nova〉」這種）。
  6. **hook 層一處刻意不做減法**：註記原文是「10 首、每面 5 首、B 面圓標少 2 首」，
     **照抄三個數字、不寫成「圓標只印八首」**（第 64／112 條）。
  7. **寫作層又攔到一處研究稿的錯**：卡 11 的 note 寫「貝斯、鼓、吉他、風琴、鋼琴、
     打擊各兩到三人」，回 facts 數過**主奏吉他只有一人**（Earl "Chinna" Smith）。
     改寫成可驗證的單一事實。**寫作 b 組另外自己退掉兩處**：
     「盤名兩說」實為三說、「簡介欄只有四個字」該計數不可靠。
  8. **主線自己的操作教訓**：中途為了保命把寫作 a 的 17 張快照提交進了 HEAD，
     而該代理交件時**回頭改掉了其中四張**——**完稿不必然是快照的追加超集**。
     落檔快照只能當容器重啟的備援，**驗收與提交一律以代理最後交出的完整檔為準**。
- **下一步**：本機端上傳（三軸、頂點資格、四處寫入與回讀、13 張封面掃圖、
  跑 `build-genre-tree.mjs --write`，**要排在 seed 上架之後**、
  清掉 23 支暫存腳本，清單在 HANDOFF 第八節）。
  **上架前逐張讀 `previews.json` 的 `note`**——第三、四節那 11 張都有限定語。
