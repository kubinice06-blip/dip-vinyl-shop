## 2026-09-06 — dip-vinyl-shop — c-111 走完雲端段（2024–2025 正典，41 張）

- **改動摘要**：店主 2026-09-06「接著跑完 16 批」的一批，`lineType: 廣度`。
  **41 張、41 位掛名（無一位重複）**（a 英美 22→26／b 日韓與華語 15），年份 2024–2025。
  **零 §1 人工身分、零跨批撞卡、41/41 釘住 release-group、§5.6 合輯 0 張。**
  依店主同日「2010 之後的中文圈只收獨立音樂」裁定，拿掉蔡依林《Pleasure》、
  張震嶽《跟著感覺走》、林家謙《隱形色》三張。
- **主要檔案**：`batch-progress/c111/`（prop-{a,b}、caa.json、chk-prop.mjs、HANDOFF.md）、
  `desc-tools/batches/research/c111-{a,b}.json`、`hooks/c111-hooks-{a,b}.json`、
  `input/c111-writer-{1,2}.json`、`output/c111-out-{1,2}.json`、
  `batch-progress/probe/previews.json`（**8 筆人工改指**）、
  新工具 `batch-progress/probe/recover-unavailable.mjs`。
- **驗證結果**：`qa-batch research/hooks/out c111` 全過、`chk-hook-crossgroup c111` 41 張
  （hook 加權 21–33、note 282–350）、`fix-spacing` 兩檔待補 0。
  主線一次性複驗：**41 張 `desc` 開頭與 `hook` 逐字相符**、out-1 219–240、out-2 200–239、
  未具名出處 0 盞、禁令掃描 14 盞逐條看過全是誤報。
  **封面 41/41、試聽 41/41（us 38／tw 2／jp 1）——兩項都是滿的，十六批以來第一次。**
- **這批的裁定與教訓**：
  1. **探測層的 8 張 unavailable 全部是假的（100%）**，成因是 `probe-previews`
     只走 Apple 的 `search` 端點，而**盤名不是拉丁字母時 search 索引查不到**。
     五種失手形狀：英譯盤名、策展層自創的 alias、全大寫轉寫、重音字母、
     **`tw` 店面對純漢字盤名回 0（第 176 條沒涵蓋的新形狀）**。立為**第 185 條**，
     並據此寫了 `recover-unavailable.mjs`：用藝人名找 artistId → lookup 整份目錄 → 年份 ±1 篩選，
     產候選清單給研究層覆核（刻意不自動改 `previews.json`，因為軌數與年份都可能對不上）。
  2. **寫作層退回我的派工指示，判斷正確**：我把 hook 的「ASCII 算 0.5」加權口徑誤套到 desc 上。
     `writer-base.md` 與 `qa-batch.mjs` 的硬規格是 **full 180–240、`Array.from` 計、半形不折算**。
     代理實測若照折算口徑寫，拉丁專名密度會把 raw 推到 260–290、撞破既有上限。立為**第 191 條**。
  3. **策展層的時序／序數主張被攻破第九次：12 處，硬錯 6 處。**
     最嚴重的是米津玄師《LOST CORNER》被安上《呪術廻戦》（日文維基該詞出現 0 次），
     以及 이찬혁《EROS》的得獎曲張冠李戴、且碟上根本沒有同名曲。
  4. **序數不可斷言 6 張**（MB 與維基差一張）。**新譜線的序數比老碟更不可信**——
     日本藝人的 MB Album 排序含現場盤與 Demo，維基只算正規盤。
  5. **同一張碟在 Apple 上有多個 collectionId**（折坂悠太、青葉市子各三個）。
     **「拿 A 店的 id 打 B 店回空」不等於 B 店沒有**——這是第 173 條在店面維度上的推論。
  6. **淨化版不是嘻哈盤特有的病**（同期 c-112 的 Olivia Rodrigo 中招）；
     反過來三張嘻哈卡逐張查過全是 explicit 原版。
