# 薄細項策展線 ts7–ts10 補充輪（同藝人不設上限）策展派工（2026-10-21）

**更正**：前一輪派工（`CUR-DISPATCH.md`、`CUR-DISPATCH-ts7.md`）誤寫「同一藝人最多 3 張」。這條規則**2026-09-04 店主已明確作廢**（「並沒有一個人只限三張這種限制」，`batch-progress/c53/rulings.md` 第 150 條），卻在 2026-10-11 downtempo 線派工被誤抄回來，再被這條線沿用。
後果是前一輪策展把夠格的同團其他專輯擋掉了，四國的缺口有一部分是這條假規則造成的。這一輪就是把它補回來。

其餘規則照 `CUR-DISPATCH-ts7.md`（品質門檻「每張都要讚、寧缺勿濫」不變；`genres` 第一個 `rock`；身分兩條路；證據 ≥2 個 https）。
**先讀前一輪的輸出檔**（`curation-p.json`～`curation-u.json`）與池中現有清單，不要重提已收的；前一輪 notes 裡標「已達上限／因上限未收」的，現在都可以提（仍要夠格）。

## 重點
- **同一藝人沒有張數上限**：場景的核心樂團，每張夠格的錄音室專輯都可以收（例如蒙古 Haranga、Hurd、Altan Urag、The HU、Nisvanis、The Lemons 的其他專輯；越南 Ngọt、Microwave、Bức Tường、Ngũ Cung、Chillies 的其他專輯；新加坡 The Observatory、Wormrot、Subsonic Eye、Sweet Charity 的其他專輯）。
- 「夠格」對同團的第 N 張一樣要具體證據：獎項／提名、樂評、榜單、場景裡公認的代表作。只是「同團的另一張」不收。
- **WebSearch 每組最多 3 次**；身分走 MB API、資料走 WebFetch 維基（`index.php?action=raw`）與 Discogs API。
- 輸出檔：`batch-progress/thin-sub-20261020/curation-<組>.json`，格式同前；**每做完 5 張就寫檔**，若已有部分內容就接續。

## 分組
| 組 | 範圍 | 目標（夠格才收） |
|---|---|---:|
| v | **越南**：前一輪 notes 因上限未收的 Ngọt《Ng'bthg》；以及池中／前一輪已收藝人的其他夠格專輯 | 越南現況 29（池 15＋新 14），能補多少補多少 |
| w | **新加坡**：前一輪因上限未收的 Subsonic Eye《Singapore Dreaming》、Wormrot《Abuse》、The Observatory《Dark Folke》、Sweet Charity《Sejuta Wajah》；以及核心樂團其他夠格專輯。**另附泰國 4 張**（前一輪因上限撤掉、策展層已判夠格）：bodyslam《Save My Life》、Moderndog《ทิงนองนอย》、Silly Fools《The One》、Big Ass《THE LION》——補齊身分與證據即可 | 新加坡現況 41（池 11＋新 30） |
| x | **蒙古**：Haranga、Hurd、Altan Urag、The HU、Nisvanis、The Lemons、Соёл Эрдэнэ 等已收樂團的其他夠格專輯，以及前一輪看過但只因「同團已有」而沒收的 | 蒙古現況 15（池 5＋新 10） |

輔助腳本放 `/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/ts-<組>/`。不要做 git 操作，不要動卡單、seed、PROJECT_MEMORY。
