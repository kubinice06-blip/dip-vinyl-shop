# add-20261101-eb4 裁定（鐵幕爵士＋MPS 策展線・蘇聯 Melodiya 爵士＋東德 Amiga 爵士）

> 店主 2026-11-01：「Yancy Körössy* - Identification 收錄 並且擴展相關專輯」→「擴張到 200 張」（交接 `batch-progress/eastbloc-jazz-20261101/PLAN.md`）。本工作階段負責 eb3、eb4。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-eb4a.json`（蘇聯，24 → 主線退回改名與汰 5 → 19）＋`curation-eb4b.json`（東德 24）→ `master-eb4aeb4b.json`（43：MB 25、§1 人工 18）→ 主線汰 3 → `pick.json`（40）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261101-eb4-cards.json`（40 張；研究 a–e 各 8）。
> **預留：研究 a 51401–51410、b 51411–51420、c 51421–51430、d 51431–51440、e 51441–51450、鉤子 51451–51460、寫作 51461–51470、主線 51471–51480。**
---

## 主線策展（不佔條號）
- **池中蘇聯卡用西里爾原文掛名**（Леонид Чижик、Каданс、Аллегро、Вагиф Мустафазаде、Владимир Чекасин、Архангельск、Сергей Курёхин、Арсенал…）。eb4a 初稿用英譯名，自報有 9 張其實已在池（拉丁轉寫去重抓不到）並已換補；主線退回把 artist／album 改成原盤原文（俄語盤西里爾、愛沙尼亞／立陶宛盤用原盤主標題語言），英譯名進 `queryAlias`。改名後同一藝人掛名與池中一致。
- **eb4a 主線汰 5**：Каданс《The Way to Olympus》（池中已有《Какая снежная весна》，本批留《Иванушка-дурачок》）、Мустафазаде《Tofig Guliyev 主題爵士曲》（池中已有 1979《Джазовые Композиции》＋本批《Севиль》）、Вайнштейн 1968《Where Is the Love》（1978 盤重錄同曲目）、Vyšniauskas《Jazz Compositions》（同人第二張）、Rosner 1964 estrada 樂團盤（偏流行）。
- **eb4b 主線汰 3**：Modern Jazz Big Band 65 同名盤（同團留 Manfred Krug 合作盤）、Uschi Brüning 1982 個人盤（她已有與 Günther Fischer-Quintett、與 Petrowsky 兩張）、Pascal von Wroblewsky《Swinging Pool》（1986 swing 人聲，分量弱）。
- **待研究層核對**：Günter Sommer《Hörmusik》MB 標 Album＋Live——若確為現場錄音，照「最重要作品本來就是現場」開 `releaseException`（Sommer 東德鼓獨奏代表作）；Rolf Kühn Quintett《Solarius》領銜是 Rolf，收為 Joachim Kühn 東德期錄音（1965 Amiga）；Bergisch-Brandenburgisches Quartett 年份 1982／1984。
- 對 seed 與 origin 全部 `claude/*` 分支 seed／eb 卡單去重 40/40 為 0。

