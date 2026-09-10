## 2026-09-05 — dip-vinyl-shop — c-90 策展提案（骨肉皮時代的台北地下 1988–2003）

- **改動摘要**：新增 `batch-progress/c90/prop-a.json`（5 張）與 `batch-progress/c90/prop-b.json`（27 張），
  合計 **32 張、19 位藝人**，`lineType: 深掘`。
  - a 組＝台北地下・水晶世代 1988–95：零與聲音解放組織首張、陳世興（水晶 CP 系列）兩張、
    友善的狗「台灣地下音樂檔案 III」與 Dr. Martens「赤聲搖滾第一集：SCUM」兩張場景合輯。
  - b 組＝角頭與 TCM 世代 1996–2003 及其後續目錄：四分衛 4、1976 3、阿飛西雅 2、草莓救星 2、
    熊寶貝樂團 2、Tizzy Bac 2、亂彈／妮波寺／潑猴／薄荷葉／橙草/八十八顆芭樂籽／糯米糰／
    回聲樂團／壞女兒／黃小楨 各 1，加水晶／Fredmosa 的《藏金閣第壹卷》與《反中國併吞》兩張場景合輯。
  - 合輯共 4 張，全部 MB `primary-type=Album`，依 §5.6 照一般 Album 寫法（不填例外欄位），未達每批 5 張上限。
- **主要檔案**：`batch-progress/c90/prop-a.json`、`batch-progress/c90/prop-b.json`、
  `batch-progress/c90/rulings.md`（10 條裁定，含九處年份分歧的逐張判定）、
  `batch-progress/memory-entries/c90-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c90/chk-prop.mjs` → 32 張、19 位、**標記 0**（跨批撞卡 0，43 批、卡數 2030）。
  32 張全部釘住 release-group MBID 並逐個回問 `release-group/<id>` 確認 `primary-type` 與標題（第 41 條），
  對照組 MBID 一律在 `mbNote` 明寫「刻意不釘」（第 99／126／153 條）。
  `seed_cards.json` 全 14,424 列實掃，繁體／簡體／羅馬拼音／英文四種寫法都查過，零撞卡。
- **本批抓到的三件事**：
  1. **濁水溪公社《1995 台灣地下音樂檔案》＝ c-TW3 留置卡《肛門樂慾期作品輯》**，同一張碟三個名字，
     字串去重看不見——派工單把它列成兩筆，本批不收（rulings 第 1 條）。
  2. **《1995 台灣地下音樂檔案 III》在 MB 上有建檔**（`f2e99629`，友善的狗 KD-0013），
     派工單記「II／III 都查無、走 §1」有誤，只有 II 查無（rulings 第 7 條）。
  3. **Double X《白痴的謊言》沒有釘錯**：c-TW manifest 的 `rgMbid` 是空字串，走的是 §1 人工身分，
     沒有釘到德國 techno 二人組（rulings 第 9 條）。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制、`manual:depth-rubric`）、
  頂點資格評估、封面、簡介、固定試聽、Firestore／KV／`seed_cards.json`／`apex_pool.json` 寫入。
