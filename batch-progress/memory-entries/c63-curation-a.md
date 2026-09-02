# c-63 a 組（深掘：民謠的非正典那一端）策展完成

- 日期：2026-09-02
- repo：dip-vinyl-shop
- 改動摘要：新增 `batch-progress/c63/prop-a.json`，28 張、28 位藝人（含 1 張
  `Various Artists` 合輯，走 §5.6 例外）。年份 1960–1982，`lineType: 深掘`。
  組成：英國民謠復振二三線（Topic／Trailer／Village Thing／Transatlantic）8 張、
  英國私壓與 acid folk 6 張、美國 loner folk 與私壓 4 張、
  美國 old-time 與田野錄音 4 張、愛爾蘭與蘇格蘭 3 張（Ray Fisher 計入英國那組時為 2）、
  伊比利（葡萄牙 canção de intervenção、巴斯克）2 張、
  拉丁美洲 nueva canción 二三線 2 張。
- 主要檔案：`batch-progress/c63/prop-a.json`
- 驗證結果：`node batch-progress/c63/chk-prop.mjs a` → 28 張／28 位／標記 0。
  去重實掃 `seed_cards.json` 全 13,418 列（藝人鍵與盤名鍵各掃一次），
  28 位藝人在池中皆為 0 張；另逐一比對 `c60/prop-{a,b}.json` 與
  `c61/prop-{a,b}.json` 共 100 張，零重疊。
- 身分：28 張全部釘住 release-group MBID 並回問 `release-group/<id>?inc=releases`
  確認實體類型、標題與轄下 release；MB 探測全程 1 req/s、帶 User-Agent、
  503 退避重試，探測錯誤 0。
- 授權狀態逐筆查 Discogs `masters/<id>/versions`：28 張裡有 2 張版本清單含
  Unofficial（Simon Finn 2 筆、Mark Fry 1 筆），已寫進該卡 `risk`；
  其餘 26 張零筆未授權。Simon Finn 那筆是**冒用原廠名與原編號**的
  「Mushroom (5)」100 MR 2（原盤是「Mushroom (2)」），即裁定第 65 條的形狀。
- 三張自我同名卡：Mr. Fox、The Fuzzy Mountain String Band、Skara Brae，
  身分皆以廠牌編號與 MBID 鎖定。
- 未動 `seed_cards.json`、`apex_pool.json`、`PROJECT_MEMORY.md`（REMOTE_RUNBOOK 第 68 行）。
