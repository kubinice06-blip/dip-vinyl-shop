# 已上線內容修正包（2026-09-30 雲端定案，交本機套用）

店主指示「需要我決定的都直接做」。以下全部已定案；本機只需照檔寫入，不需再判斷。
雲端無 KV 權限、依 REMOTE_RUNBOOK 不改 seed_cards.json，所以停在「可直接套用」這一步。

## 1. 專輯簡介（寫 KV）— `APPLY-desc.json`（274 則）

每筆 `{artist, album, oldDesc, newDesc, why[], chars}`。套用：以 artist＋album 找到 KV 的簡介鍵，
先比對 KV 現值 === oldDesc（不一致就跳過並記錄，代表本機已改過），一致就寫入 newDesc，再跑 verify-kv 逐字驗證。

- 更正 133 則補洞層查到的錯誤（`pub-fixes-1/2.json` 是逐條決定與依據；keep 的不在 APPLY 裡）。
- 去出處 163 則：正文裡「維基記…」「MB 記…」「Discogs 記…」與樂評媒體背書全部改寫為不具名敘述（`wiki-fixes-final.json`）。
- 整段重寫 2 則：Lou Rawls《Lou Rawls Live!》（原文是退件說明；依 1966 Capitol 版重寫，`lou-rawls-1966.json`）、Bukka White《Big Daddy》（原文混入管線文字）。
- 兩者重疊的 5 則已由主線合併（Amar Prem、South London Boroughs、The Celts、Unworthy、trash）。
- `need-local.json`：Grant Green《Here 'Tis》、Nino Rota《Casanova》兩則雲端沒有全文，附建議改法。

## 2. 卡片（改 seed_cards.json）— `card-fixes.json`／`CARD-FIXES.md`

- 拆卡 16 張：改藝人欄為「英文原名 (國家或身分)」。改名後同步藝人介紹分片鍵、genre-artist-map、query-aliases。
- 年份 11 張＋Lou Rawls《Lou Rawls Live!》改綁 1966 Capitol release-group（年份 1966、換封面）。
- keep 8 件附理由（新寶島康樂隊《腳開開》專輯名正確、Tangerine Dream《Sorcerer》PPG 不用改等）。

## 3. 其他

- 秋吉敏子《Her Trio Her Quartet》：補改「整張沒有她自己的作品」（她寫了〈Salute to Shorty〉〈Pea, Bee and Lee〉），已含在 APPLY-desc。
- 補洞代理兩次在 MusicBrainz 查詢的 User-Agent 帶了店主 email（各一次），已停止；日後派工明令禁止。
