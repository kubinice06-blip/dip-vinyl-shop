# add-20261030-sf12 裁定（Spotify 追蹤藝人補卡池・嘻哈、R&B、靈魂、流行、以色列）

> 店主 2026-10-30 `/dip-card-create`：依 Spotify 追蹤藝人補卡池，每位缺漏藝人挑 1–2 張代表作（交接 `batch-progress/spotify-follow-20261030/PLAN.md`）。本工作階段負責 sf11、sf12。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-sf12a.json`（25）＋`curation-sf12b.json`（16）→ 主線汰 5、去重 1（Omar Apollo 兩組都做了，保留 sf12a）→ `master-sf12asf12b.json`（35 張，全部 MB 釘住）→ `pick.json`（35）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf12-cards.json`（35 張；研究 a–e 各 7）。
> **預留：研究 a 49901–49910、b 49911–49920、c 49921–49930、d 49931–49940、e 49941–49950、鉤子 49951–49960、寫作 49961–49970、主線 49971–49980。**
---

## 主線策展（不佔條號）
- **清單 32 位 → 收 30 位、35 張；跳過已在池 0 位；不收 2 位。** 池中近似名逐位排除（Destin Conrad≠Onra、Olivia Dean≠DEAN、Michael Franti & Spearhead≠Antis、My Skin Against Your Skin≠GAI）；Def Squad 是 Erick Sermon、Redman、Keith Murray 的團名，與三人個人卡分開；對 origin/main 與所有 `claude/*` 分支 seed 去重 0 撞。
- **Spotify 藝人頁回查（主線全批 32 位）**：熱門曲發回策展核對。Way Out West＝英國 progressive house 雙人組（〈Tuesday Maybe〉〈Killa〉）；Noblemen 不是以色列，是英國 hip-hop 樂團（MB f822535b），熱門曲〈Chord Stricken〉對上同名盤；My Skin Against Your Skin＝台灣樂團激膚；Onry Ozzborn＝西雅圖 Oldominion／Grayskul 饒舌手。
- **不收**：The Flexibles（MB 與 Discogs 釘不住身分）、KbN（與 Yenmeng Wang 合作的氛圍音樂，身分與封面都釘不住）。
- **一位只收一張（主線汰第二張）**：JMSN 汰《Velvet》留《It Is.》；Mr Twin Sister 汰 Twin Sister 時期的《In Heaven》留 2014 同名盤（改名後首作，掛名與 Spotify 一致）；Onry Ozzborn 三張候選（《The Grey Area》《Nervous Hvnd》《Hold On for Dear Life》）都沒有評論共識，留 2003《The Grey Area》；Dudu Tassa 汰《לולה》留《הגולה》（Kuwaitis 名義另在 sf11）。
- **留兩張的**：KMD（《Mr. Hood》1991＋《Black Bastards》，後者 1994 錄成遭 Elektra 擱置、2001 正式發行，取 2001）、Michael Franti & Spearhead（《Home》1994＋《Stay Human》2001）、Olivia Dean（《Messy》2023＋《The Art of Loving》2025）、Omar Apollo（《Ivory》2022＋《God Said No》2024）、Way Out West（1997 同名＋《Intensify》2001）。
- **Maddie Ashman《Her Side》**：MB 標 EP，8 首、作為主要作品發行，照 CUR-DISPATCH 長 EP 例外收，寫 `releaseException`。
- 交研究層把關：多張廠牌欄空白或待核（Stay Human、Sad Night Dynamite、Beneficiaries、UMC's、J. Valentine、Dudu Tassa、Fortisakharof、激膚）；Destin Conrad《Love on Digital》年份；JMSN《It Is.》正式寫法；激膚《問號》與《安卓雅》何者為代表作；S.C.A.B. 2025 盤 vs 2022 同名盤；The Beneficiaries 國別廠牌；Blubell、Noblemen 封面要從 Apple／Bandcamp 取；Fortisakharof《1900?》盤名寫法與年份。
