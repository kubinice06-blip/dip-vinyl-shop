# add-20261022-mc6 裁定（情緒薄格策展線・冷冽：Detroit techno／electro 二線＋electroclash）

> 店主 2026-10-22「新增的專輯數太少了 與雀躍嚴重不平衡」→ 三格各補到約 2,000；第 2 輪起收窄到大場景、3 個工作階段並行（本工作階段 ml5／mc6）。場景佇列 `batch-progress/mood-cells-20261022/SCENES.md`，交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**冷冽＝躁（x≥3.0）＋輕（y<+0.5）＋冷（z<0）**；策展邊距 x ≥ 3.3（實測建議 3.6）、y ≤ +0.2、z ≤ −0.3。主場景 mc6 Detroit techno／electro 二線，可擴寫 mc12 electroclash、mc29 electro-funk 機械那半。
> 策展：`curation-mc6.json`（54 張：主場景 50、mc12 4、mc29 0；drexciya-sys 8、detroit-electro 8、detroit-techno 6、euro-electro 28、electroclash 4）→ `master-mc6.json`（MB 回查 54/54 釘住、人工 0、flags 0）→ `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261022-mc6-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 11401–11410、b 11411–11420、c 11421–11430、d 11431–11440、e 11441–11450、鉤子 11451–11460、寫作 11461–11470、主線 11471–11480。**
---

## 主線策展（不佔條號）
- moodGuess x 3.6–4.1、y 0.0–0.3、z −1.6～−0.9；52 張過邊距。mc29 electro-funk 0 張：池中 Mantronix、Newcleus、World Class Wreckin' Cru、Egyptian Lover 都判暖落雀躍，策展層不提（照實）。Detroit 本地二線正規專輯少（多為 EP），歐陸承 Drexciya 路線的 electro（Rother、Silicon Scally、Boris Divider、Lowfish、dynArec、Cygnus、Gosub）補到 28 張——判為主場景的延伸，收。
- **主線汰 9 張湊 45**：y 估 0.3 出邊距 2（The Hacker《Rêves mécaniques》、ADULT.《Anxiety Always》）；x 估 3.6 且中速曲多 3（The Exaltics《Das Heise Experiment》《II Worlds》、Crossover《Fantasmo》）；Terrence Dixon 4 張只留 x 估 3.7 的 2 張（汰《12,000 Miles Of Twilight LP》《Reporting From Detroit》，池中《From the Far Future》x 3.6 貼線）；Japanese Telecom 同名首張（單張 12 吋 8 曲，迷你專輯疑慮）；Anthony Rother 8 張汰《My Name Is Beuys von Telekraft》（附混音 CD）。
- 跨工作階段去重：對 origin 所有 `claude/mood*` 分支 seed 去重 0。
- 研究層要特別寫聲音事實：速度（BPM 是否夠快）、低頻與失真（厚的會判重落亢奮）、人聲比重與色溫。邊緣張：Ectomorph《Stalker》（偏陰暗，y 風險）、Der Zyklus、Arpanet 2（x 3.6）、Exos 2（minimal techno）、Rother《Popkiller》（人聲多）、The Hacker《Mélodies en Sous-Sol》。Cygnus《Vox Alia》證據最薄（MB＋Bandcamp＋CAA）。

## 研究 a 組
- 11401：Lab Rat XL《Mice or Cyborg》推翻策展層「James Stinson 生前最後化名專輯」：Discogs 發行說明寫 Drexciya「第七場也是最後一場風暴 R.I.P. James Stinson」，2003-10-27 發行晚於 Stinson 2002-09-03 過世，是身後發行。
- 11402：Der Zyklus《Biometry》推翻「唯一專輯」：Bandcamp 另列 Truth Matrix 等作品、Discogs 成員名單多人，facts 不寫「唯一」。署名 Heinrich Mueller（Gerald Donald 化名之一）。
- 11403：序數宣稱（Japanese Telecom 第二張、Arpanet 第三張、AUX 88 第三張）查無來源或與 Wikipedia 作品列衝突，facts 一律不採序數。
- 11404：Elecktroids 成員身分：Discogs 稱陣容不明、Warp 2008 文案點名 Stinson；facts 寫成不確定版本，不寫「Drexciya 成員化名」為定論。
- 11405：moodGuess 存疑清單（主線請決定汰換）。強：Arpanet《Quantum Transposition》（廠牌文字稱更偏氛圍／實驗、Discogs 標 Ambient、前六首不到 3 分半）、Black Tokyo（有日本歌手人聲、Club Mix、RA 稱 bass-heavy）。中至中強：Der Zyklus《Biometry》（Abstract／Ambient 標籤、最長 9:16）、Elecktroids《Elektroworld》（Kraftwerk 致敬式旋律電子，曲長 4–6:40）、AUX 88 同名與《Mad Scientist》（RA 稱 bass-heavy 會判重落亢奮）、Lab Rat XL（5–8 分鐘長曲）。輕：Arpanet《Inertial Frame》（Experimental 標籤）、Japanese Telecom《Virtual Geisha》（無聲音來源，未驗）。
- 11406：整組聲音證據偏薄：此組在 WebSearch 3 次額度內未找到逐張樂評；status 有 6 張標 thin（聲音細節為主因，身分與故事 facts 皆足 9–11 條）。Quantum Transposition 的 Clone 商品文字只從搜尋摘要看到，頁面事後 404，主線可酌情刪該條。
