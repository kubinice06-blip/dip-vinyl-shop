## 2026-09-02｜dip-vinyl-shop｜c-61 研究層 a 組（義大利與法國地下 prog，27 張）

**改動摘要**：完成 c-61 a 組 27 張的事實研究，產出 `desc-tools/batches/research/c61-a.json`
（27 筆，全數 `full`，facts 共 221 條、平均 8.19 條／張，每條均帶可開啟的 HTTPS `src`；
44 個非 Discogs 來源逐一實測皆回 200）。主要來源：Discogs 公開 API（原盤內頁、
壓片編號、參與者、`masters/<id>/versions` 的授權狀態）、義大利文／法文維基、
italianprog.com、Souffle Continu 的唱片說明頁。

**主要檔案**：`desc-tools/batches/research/c61-a.json`（新增）。

**驗證結果**：`node qa-batch.mjs research c61` → 全部通過 ✓、標記 0
（a 組 27 筆、b 組 24 筆，key 與卡單完全一致）。

**推翻策展層四處**（已寫進各卡 `notes`，第 35／55／59 條的形狀第五次出現）：
1. **Murple**「羅馬三人團」→ 原盤 credit 與義大利文維基成員表都是**四個人**。
2. **Corte dei Miracoli**「熱那亞樂團」→ italianprog.com 與義大利文維基都寫**薩沃納（Savona）**；
   熱那亞是錄音室 Studio G 的所在地，不是樂團出身地。
3. **Besombes-Rizet**「Pôle 廠牌由 Rizet 創辦」（策展層標為待查）→ **不成立**。
   Discogs 廠牌條目記廠牌由 Paul Putti 與妻子 Evelyne Henri 經營，
   Besombes 本人還說封面上的 Pôle 字樣未經他與 Rizet 同意。
4. **Campo di Marte** 原盤編號 `30 UAS 29497` → 那是同期**卡帶**編號，黑膠原盤是 `UAS 29497`。

**兩處策展層標為「未查證、不得寫入」的禁令已解除**：
- **Horrific Child**：原盤唱片標籤本身就印著「Musique et Effets Sonores Jean-Pierre Massiera」，
  法文維基亦明載，Massiera 的關聯可寫。
- **Cervello 與 Osanna**：原盤 credit 的「製作統籌」是 Osanna 的 Danilo Rustici 與 Elio D'Anna，
  但演奏名單上沒有他們——可寫牽線與統籌，不得寫成參與演奏。

**兩張標明「不得指名分工／樂器」**：Shylock（Discogs 與法文維基對誰彈吉他、誰彈鍵盤的記載互相顛倒）、
Emmanuelle Parrenin（法文維基提到的樂器該句標 réf. nécessaire，其餘來源無樂器表）。

**一張年份有爭議**：Shylock《Gialorgues》，Discogs 自資原盤與 MB 記 1976、
法文維基寫「1977 年 1 月以 1000 張在 CBS 發行」。依裁定第 18／46 條維持卡單 1976、
行文不得斷言發行年。

**授權狀態逐筆實查（裁定第 43／57／65／66 條）**：27 張中 13 張的 Discogs 版本表零筆未授權；
其餘 14 張的未授權筆數已逐張寫進 fact 並指名國別與 Discogs 廠牌實體的括號序號——
確認冒名者包括 Trident (7)（TRI 1005）、Vedette Records (3)（VPA 8162）、Ricordi (2)（SMRL 6113）、
Mellow Records (4)（MMP 181）、AMS (4)（AMS 138CD）、Seven Seas (3)（KICP 2003）、
Crime (6)、Belle Antique (2)。Komintern 2014 年澳洲 Great Barrier 盤 MB 標 Official／Discogs 標
Unofficial，依第 66 條採 Discogs、不採為背書。
