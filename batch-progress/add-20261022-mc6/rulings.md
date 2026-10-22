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
