## 2026-09-15 — dip-vinyl-shop — c-131 走完雲端段（爵士深掘第一批，45 張）

- **改動摘要**：店主 2026-09-15「廣度應該足了 研究深度 再深挖爵士 還有好多都沒有建檔 秋吉敏子竟然都沒有」。
  **從這批起是深掘線**（`lineType: 深掘`）：問的不是「這個場景池中有沒有」，是「這位名家的目錄補齊了沒」。
  **45 張、27 位掛名**（a 秋吉敏子 13 ＋ 日本第一世代 10；b 池中爵士名家目錄深度 22），年份 1954–1994。
  **零 §1、零跨批撞卡、45/45 釘住 MBID、全部純 Album。**
  **秋吉敏子實掃前自己名下零張**（池中唯一一筆是 1973 年後大樂團的英文字串）；
  第一世代十位（本田竹広、白木秀雄、宮沢昭、ジョージ大塚、鈴木宏昌、高橋達也、石川晶、猪俣猛、原信夫、稲垣次郎）池中原本全零。
- **主要檔案**：`batch-progress/c131/`（prop-{a,b}、chk-prop.mjs、caa.json、rulings.md、HANDOFF.md、
  apple-candidates.md）、`desc-tools/batches/research/c131-{a,b}.json`、`hooks/c131-hooks-{a,b}.json`、
  `input/c131-writer-{1,2}.json`、`output/c131-out-{1,2}.json`、
  `batch-progress/probe/previews.json`（**補 17 筆**）、`label-lines.mjs` 與 `probe/probe-previews.mjs`（登錄 c131）。
- **驗證結果**：`qa-batch out c131` 45 張與卡單相符、全部通過；`chk-hook-crossgroup` 全過
  （hook 加權 24–35.5、note 241–350）；`fix-spacing --field desc` 兩檔待補 0；`chk-prop` 標記 0。
  desc 176–238（44 full／1 partial）。主線複驗：desc 開頭與 hook 逐字相符 45/45、
  四位中文數字年 0、資料庫與商店名 0、**簡體 0**、跨組開頭四字零重複、
  **被擋下的五句「第一／唯一」逐句 grep 零命中**。**封面 44/45；試聽 21 → 38/45。**
- **⚠ 裁定 366／367：年份改五張**——Ahmad Jamal《at the Blackhawk》1961→1962、
  Hank Mobley《Another Workout》1986→1985、Don Cherry《Symphony for Improvisers》1966→1967、
  Chet Baker & Art Pepper《Playboys》1956→1958、《Meditation》catno VC-7513→**VC-6001**（7513 是 1976 再發編號）。
  **《Playboys》那張是主線自己加查 MB release 列表查出來的**：所謂 1956 那筆登記「World Pacific **PJ-1234**」，
  **廠名與 catno 前綴互相矛盾**（World Pacific 1958 才存在），1956 是錄音年。
- **⚠ 裁定 370：`writer-base` 的榜單條款連續兩批贏過 hook 層的 note**——
  《Got The Spirit》的「讀者票選最佳大樂團連續九年」整條不寫（與 c-129 第 346 條同形）。
  **hook 層派工詞往後要明寫「facts 裡的樂評榜單不得搬進 note」。**
- **⚠ 裁定 371：CJK 專名上限與「主鏈全員點名」衝突時整格捨去側人**，事實不損失只是不點名。
  **初稿單向低估是常態**：第一輪 12 張有 8 張落在 241–274，全靠整格捨去壓回、沒有逐字削。
- **⚠ 研究層擋下策展層五句無來源的「第一／唯一」**（Toshiko's Piano「日本樂手在美廠第一張」、
  Candid「唯一日本樂手領銜作」、Strayhorn「唯一單一作曲家專輯」、TBM「第一張」、Sound Ltd.「系列頭號」），
  另擋下《Dedications》受獻者不是八位鋼琴手、Inner City IC 6046 是第二集的美版不是第一集、
  《Salaam Salaam》是鋼琴三重奏、高橋達也 1964 入團 1966 接任、George Wein 那張錄音地是紐約。
- **⚠ 本批第 356 條 F 的 CAA 門檻在下一批被推翻**：用 `CAA 404` 當排除理由擋掉了 15 張
  （松本英彦整位 0 張、宮沢昭《山女魚》、ジョージ大塚 2、原信夫 5、白木秀雄 3），
  但 `ALBUM_ONBOARDING.md` §4 在 2026-09-10 已核定「釘住 MBID 的卡也適用 apple-verified-collection」。
  **那 15 張 rgMbid 全在，已排進 c-133／c-134 回頭補**（c-132 第 382 條）。
  新形狀：**同一張碟的兩個 RG，CAA 狀態常常相反**——補圖前先查有沒有重複 RG。
- **缺的**：封面 1 張（Jamal《at the Blackhawk》，Discogs 與 Apple 都有圖可走）；
  試聽 7 張無來源（**DAN／Discomate／EASTWORLD／TBM 的目錄在店面整批是空的**，第 359 條）。
  《ウガンダ》試聽附條件（官方版 7 軌、前三首各拆 I/II，秒數合計與卡單 4 軌相符），正文按曲名配不寫軌數。
- **留給本機的既有卡錯誤（第 362 條）**：Spiritual Unity 重複卡、Waltz for Debby 年份、
  Heliocentric Vol.1 年份 1992（應 1965）、Extensions 年份、Shepp 的 `&`／`and` 掛名分裂。
- **下一批**：c-132／c-133／c-134 已排（日本第一世代各補到 7–8 張）；
  b 組 25 位名家的實掃表在第 360 條，還能再開好幾批。
