## 2026-09-02 — dip-vinyl-shop：c-64 柬越補挖策展（b 組）

**改動摘要**：a 組結論「MB 對 1960–75 原盤覆蓋不足、只做得出 14 張」成立，但**成立的範圍比 a 組寫的窄**。
店主授權往下挖後，b 組交 18 張（4 個掛名，Various Artists 14 張），其中 **8 張走 §1 人工身分路線**、
10 張釘得住 release-group。合計 c-64 為 32 張。

**主要檔案**：`batch-progress/c64/prop-b.json`（新增）。未動 `seed_cards.json`、`apex_pool.json`、
`PROJECT_MEMORY.md`（第 74 條）。

**驗證結果**：
- `node batch-progress/c64/chk-prop.mjs a b` → 32 張、10 位、**標記 0**。
- §1 `checkManualIdentity` 的五項（rgMbid 留空、mbAbsenceProof 的 queries≥2 且含藝人與作品兩方向、
  checkedAt 為 ISO、conclusion≥10 字、manualEvidenceUrls≥2 個 HTTPS、manualRuling≥10 字、
  coverSourceHint≠caa）以複製驗證器邏輯的腳本逐張複驗，**8 張全過、標記 0**。
- `seed_cards.json` 全 13,418 列實掃（第 27 條）：嚴格＋鬆散去重 0 撞卡；
  另依第 49／71 條**以盤名去聲調轉寫為主鍵**再掃一次全池，0 撞卡。
- 藝人上限：ស៊ីន ស៊ីសាមុត 2、Thanh Thúy 2、Sơn Ca 1，皆在 3 張以內；Various Artists 不計（第 72 條）。
- 所有 MB 查詢走 1 req/s＋UA＋503 退避重試（第 28 條），**探測錯誤 0**；十張釘得住的卡逐一回問
  `release-group/<id>` 端點確認實體類型與標題（第 41 條）。

**內容**：
- 柬埔寨 5 張：Death Is Not The End 的《Wounds of Love: Khmer Oldies》Vol. 1／2（2021，迷幻時期之前的
  金邊 45 轉）、Dust-to-Digital《Longing for the Past: The 78 RPM Era in Southeast Asia》(2013)、
  Lion Productions 的《Groove Club Vol 4／Vol. 5》（Sinn 家族獨家授權，人工身分）。
- 越南 13 張：Sơn Ca 第 1／2／3／8 捲、Trường Sơn 第 2／4 捲、Thanh Thúy 第 22 捲（以上釘得住 RG）、
  Thanh Thúy 第 06／12 捲與 Băng Nhạc Shotguns 四捲（人工身分）。

**修正 a 組兩處**：(1) CBC Band 在 MB **有**實體（`CBC`，c01c3a43…，VN，Vietnamese rock band），
a 組查「CBC Band」落空是查詢字串問題，不是查無（名下仍 RG=0）；
(2) a 組說 nhạc vàng 的原盤在 MB 上沒有可釘的——**Sơn Ca 與 Trường Sơn 兩條錄音帶系列其實都建了檔**，
只是掛在 Various Artists 名下、用盤名才查得到，藝人 browse 抓不到。
