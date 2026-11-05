# 薄細項策展線 ts6（其他薄節點）策展派工（2026-10-20）

共同規則、去重指令、身分兩條路（MB 釘住／§1 人工身分）、名稱、證據、輸出格式與續跑，**全部照 `batch-progress/thin-sub-20261020/CUR-DISPATCH.md`**，只有下面幾點不同：

- **收該樂種的正典專輯**。`genres` 第一個**必須**是下表指定的主類型（類型樹只把主類型相符的卡掛進該節點）。
- `country` 用 ISO 兩碼小寫。
- **WebSearch 每組最多 6 次**，多用 MB API 與 WebFetch 維基／Discogs。
- 池中現況：Neofolk／Dark Folk 12、Psy／Goa 14、50 年代搖滾 14、50s R&B／Doo-wop 15。**先用去重指令查每位藝人在池中已有幾張**，已有 2 張以上的不要再提。
- 50 年代原盤：很多藝人當年以單曲為主，第一張 LP 常是單曲合輯——**當年原版發行的 LP**（例如 Chuck Berry《After School Session》、Buddy Holly《The "Chirping" Crickets》）照 Album 收；後世整理的精選（Chess、Rhino、Ace、Bear Family 盒裝）只有在該藝人**沒有當年 LP** 時才收，標 `releaseException: "archival-compilation"`、`why` 寫明收錄年代。

## 分組
| 組 | 範圍 | 主類型 | 張數 |
|---|---|---|---:|
| j | **Neofolk／dark folk**（Death in June、Current 93、Sol Invictus、Ordo Rosarius Equilibrio、Forseti、Sonne Hagal、Of the Wand & the Moon、Rome、Changes、Fire + Ice、Darkwood、Tenhi、Wardruna、Hexvessel、Spiritual Front；池中已有者避開） | `folk` | 12 |
| j | **Psy／Goa trance**（Infected Mushroom、Astral Projection、Juno Reactor、Hallucinogen、Shpongle、Man With No Name、Eat Static、Hux Flux、Cosmosis、X-Dream、Etnica、Ott、Talamasca、GMS、Vibrasphere） | `electronic` | 12 |
| k | **50 年代搖滾原盤**（Chuck Berry、Little Richard、Buddy Holly、Jerry Lee Lewis、Gene Vincent、Eddie Cochran、Carl Perkins、Bo Diddley、Bill Haley、Fats Domino、Wanda Jackson、Ricky Nelson、The Everly Brothers、Johnny Burnette Trio；池中已有者避開） | `rock` | 11 |
| k | **Doo-wop／50s R&B 原盤**（The Platters、The Drifters、The Coasters、The Moonglows、The Flamingos、Frankie Lymon & the Teenagers、The Penguins、The Five Satins、Dion and the Belmonts、The Del-Vikings、The Clovers、The Cadillacs、Clyde McPhatter、Ruth Brown、LaVern Baker） | `soul` | 10 |

輸出檔：`batch-progress/thin-sub-20261020/curation-<組>.json`（j 或 k）。
**每做完 5 張就把目前結果寫進輸出檔**；若輸出檔已有部分內容就接續補完，不要從頭重寫。輔助腳本放 `/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/ts-<組>/` 子目錄。
