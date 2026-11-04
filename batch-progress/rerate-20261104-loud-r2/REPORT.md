# 硬蕊度音量下限第二輪套用報告（rerate-20261104-loud-r2，2026-11-04）

**規則**：沿用第一輪店主定案（硬蕊度＝入耳難度，音量、失真、速度、嘶吼都算門檻），延伸到 grunge、一般另類搖滾、emo、post-punk、噪音型 indie rock：整張以失真吉他、大音量、嘶吼為主的至少 3，極端的 4／5；乾淨吉他、新浪潮味、抒情、流行化的維持原分。只往上調。

- 送判 845 張（A 帶 alt-rock／emo／indie-rock／post-punk 標籤 835／D 只帶 art-exp 10），6 片、3 支代理。
- **改 104 張**：全部到 3（2→3 88、1→3 16），到 4／到 5 為 0。頂點卡 7 張（tier 不動，稀有度依慣例存公式值）。
- 經典度、冷門度一律不動。seed 第 5 欄 104 列；manifest 3 檔 7 筆；card_catalog accessibility／rarity 104 筆 PATCH 成功（updateMask＋exists），抽 30 張讀回 30／30 一致。

## 一、改動
改 104：到3 104／到4 0／到5 0；類別 {'A': 104}；頂點卡 7
跳幅 {(2, 3): 88, (1, 3): 16}

| 子曲風 | 張數 | 改 | 舊 1/2/3/4/5 | 新 1/2/3/4/5 |
|---|---:|---:|---|---|
| `rock/indie-alt/alt-rock` | 483 | 84 | 164/245/69/4/1 | 149/176/153/4/1 |
| `rock/indie-alt/emo` | 98 | 29 | 28/37/22/11/0 | 20/16/51/11/0 |
| `rock/indie-alt/indie-rock` | 516 | 40 | 167/271/68/10/0 | 162/236/108/10/0 |
| `rock/punk-wave/post-punk` | 373 | 2 | 16/143/166/44/4 | 16/141/168/44/4 |
| `rock/indie-alt/art-exp` | 161 | 16 | 17/75/53/15/1 | 16/60/69/15/1 |
| `rock/indie-alt` | 1035 | 102 | 337/521/145/31/1 | 321/435/247/31/1 |

本批一般卡稀有度（頂點卡依 tier，不計）：
| | 普通 | 稀有 | 獨特 | 史詩 | 傳奇 |
|---|---:|---:|---:|---:|---:|
| 舊 | 48 | 39 | 10 | 0 | 0 |
| 新 | 6 | 33 | 46 | 12 | 0 |
流向：rare→uncommon 37、common→rare 33、uncommon→epic 10、common→uncommon 9、rare→epic 2

全池（頂點依 tier）：
| | 殿堂 | 流亡 | 異端 | 傳奇 | 史詩 | 獨特 | 稀有 | 普通 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 套用前 | 303 | 296 | 178 | 452 | 1,734 | 4,134 | 6,752 | 8,833 |
| 套用後 | 303 | 296 | 178 | 452 | 1,746 | 4,170 | 6,746 | 8,791 |
| 差 | +0 | +0 | +0 | +0 | +12 | +36 | -6 | -42 |
全池硬蕊 1-5：5085/9783/5205/2190/419 → 5069/9695/5309/2190/419

## 二、主線審稿
6 片全數過目（升分逐張、keep 逐藝人掃）。補升 13、推翻 1，見 `rulings.md` 第 3 條與 `overrides.json`。

## 三、升上來的代表例
Nirvana《Nevermind》、Pearl Jam《Ten》《Vs.》《Vitalogy》、Soundgarden《Badmotorfinger》《Louder Than Love》《Superunknown》、Alice in Chains《Dirt》《Facelift》、Smashing Pumpkins《Gish》《Siamese Dream》《Mellon Collie》、Screaming Trees、Mudhoney《Every Good Boy Deserves Fudge》、Hole《Live Through This》、L7、Dinosaur Jr. 後期四張、Pixies《Doolittle》《Trompe le Monde》、Foo Fighters 四張、Queens of the Stone Age《Rated R》《Songs for the Deaf》、Sunny Day Real Estate 三張、Mineral、Braid、The Get Up Kids、Weezer《藍》《Pinkerton》、The White Stripes 五張、Yeah Yeah Yeahs《Fever to Tell》、Hüsker Dü《Candy Apple Grey》、Japandroids、My Chemical Romance、Paramore。

## 四、維持原分代表例
The Smiths、Morrissey、The Cure、合成器／新浪潮路線的 post-punk（New Order、Echo & the Bunnymen、Interpol）、Death Cab for Cutie、American Football、Dashboard Confessional、Coldplay、Radiohead（除《Pablo Honey》）、R.E.M.（除《Monster》）、Oasis、Blur、Suede、Pavement、Modest Mouse、Arctic Monkeys、The Strokes、Nirvana《MTV Unplugged》、Alice in Chains《Jar of Flies》、亞洲／東歐獨立樂團多數。不認得的 5 張維持原分。

## 工具
`build-worklist.py` → `shards/` → `verdicts/` → `overrides.json` → `apply.mjs [--write] [--catalog]` → `push-catalog.mjs [--verify N]`；`pool-dist.py`、`report.py`。
