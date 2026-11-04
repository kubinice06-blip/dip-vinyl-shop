# ax5 新卡策展（美國自由爵士，異端候選）

先完整讀 `/home/user/dip-vinyl-shop/batch-progress/apex-new-20261104/CUR-DISPATCH-AX.md`，照它的「每張要做的事」「輸出」「規矩」做。組別 **ax5a**，輸出 `batch-progress/mood-cells-20261022/curation-ax5a.json`。

**與 CUR-DISPATCH-AX 不同的地方（店主 2026-11-04 更新）**：「不收能量型自由爵士」**已撤銷**。這組專收**美國自由爵士**裡高強度、無調、噪音化、對一般聽眾難入耳的代表作——尖叫式吹奏、無節拍、集體噪音、超長篇、循環換氣之類有具體特徵的。聽得下去的 spiritual／modal 作品不收。

## 主線點名（逐張核實；藝人對、但那張不是他最極端或查不到身分／封面的，可換成同一藝人更極端的正規專輯，在 `uncertain` 寫明換了什麼、為什麼）

1. Patty Waters — Patty Waters Sings（ESP-Disk, 1966）
2. Alan Silva (and His Celestial Communication Orchestra) — Luna Surface（BYG Actuel, 1969）
3. Giuseppe Logan — The Giuseppe Logan Quartet（ESP, 1965）或 More（ESP, 1966），挑較激烈的一張
4. Charles Tyler — Charles Tyler Ensemble（ESP, 1966）或 Eastern Man Alone（ESP, 1967）
5. Burton Greene — Burton Greene Quartet（ESP, 1966）
6. Marzette Watts — Marzette Watts and Company（ESP, 1968）
7. Arthur Jones — Scorpio（BYG Actuel, 1969）
8. Joseph Jarman — Song For（Delmark, 1967）
9. Milford Graves — Bäbi（IPS, 1977）（卡池已有他的《Grand Unification》，這張是新卡，可以）
10. Paul Flaherty & Chris Corsano — The Hated Music（2000）
11. The Flying Luttenbachers — Destroy All Music（1995）或該團更極端的一張
12. Black Unity Trio — Al-Fatihah（1969）
13. Eugene Chadbourne — Solo Acoustic Guitar Volume 1（Parachute, 1976/77）（卡池有 Eugene Chadbourne & John Zorn《School》，藝人鍵不同，可以）
14. William Hooker — 挑他 1970s–90s 最激烈的一張正規專輯
15. Davey Williams & LaDonna Smith — 挑他們 Trans Museq 時期最激烈的一張
16. Test（Daniel Carter／Sabir Mateen／Matthew Heyner／Tom Bruno）— Test（AUM Fidelity, 1998）
17. Rudolph Grey — Mask of Light（1991）
18. The Jazz Composer's Orchestra — The Jazz Composer's Orchestra（JCOA, 1968）
19. Little Women — Throat（2010）
20. Gato Barbieri — In Search of the Mystery（ESP, 1967）（卡池已有 Gato Barbieri 的其他卡，這張新卡可以）

池子不夠就照實交，不要湊數。若你知道還有同等級、資料充分的美國自由爵士極端作（且藝人不在 seed 異端、這張不在卡池），可以補到最多 24 張，寫明依據。

## 去重要注意
- 跑 CUR-DISPATCH-AX 的去重指令，這張盤必須 0。
- 藝人不能已在 seed 第 9 欄 `heresy`（含互為子字串）。
- `grep` 一下 `batch-progress/mood-cells-20261022/curation-ax6*.json`（另一工作階段 ax6 的非美國自由爵士），不要重複。
- `apexTier` 一律 `heresy`；`genres` 用 `["jazz"]`（Luttenbachers、Little Women、Rudolph Grey 可加 `rock`）。

## 額度
WebSearch 最多 12 次。多用 MB API、Discogs API、iTunes Search API、維基 raw。
