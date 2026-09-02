### 2026-09-02 — dip-vinyl-shop — c-61 研究層 b 組（北歐 progg 與荷比澳紐 24 張）

- 產出 `desc-tools/batches/research/c61-b.json`：24 筆，key 與順序與卡單 b 組完全一致，
  **24 張全部 `status: full`**，facts 216 條（每張 9 條），非 HTTPS src 0。
- `node qa-batch.mjs research c61` 標記 1：「key 集合與卡單不一致」，
  原因是 a 組研究稿尚未產出（27 個 a 組 key 未涵蓋），與 b 組無關；
  字元三掃描、src 檢查、hookCandidates 上限全數通過。
- **推翻策展層三處**（詳見各卡 notes）：Hoola Bandoola《Vem kan man lita på?》的詞曲欄
  沒有 Björn Afzelius；Wigwam《Fairyport》的封面美術是 Jorma Auersalo 不是 Gustavson；
  Haikara 原盤的 Performer 欄是五個未標樂器的名字、不是「四位管樂客席」。
  另擋掉 Turid 卡「民謠復振最早的女聲個人作品」這個查無來源的最高級說法。
- **裁定第 43／57／65 條的新材料**：Discogs 的 Shadoks Music 廠牌條目自承該廠牌
  「正當性可疑」（部分發行未經藝人授權）。Burnin Red Ivanhoe《M 144》與
  Young Flowers《Blomsterpistolen》的 Shadoks 復刻雖未被標 Unofficial，
  已在兩卡 notes 明令**不得單獨當背書**，改用 Sonet 2019 RSD 與 Turn It Over 2021／2023。
- 主要來源：Discogs 公開 API（原盤內頁、master versions 授權狀態、廠牌條目）、
  瑞典／丹麥／挪威／芬蘭／冰島／荷蘭／法文／英文維基、
  《The Reykjavík Grapevine》冰島搖滾史連載、AudioCulture（紐西蘭）。
- 未動 `seed_cards.json`、`apex_pool.json`、`PROJECT_MEMORY.md`；未 git add、未 commit。
