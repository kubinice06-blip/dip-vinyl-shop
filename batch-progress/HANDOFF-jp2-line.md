# jp-2 線交接（2026-09-27）：**日本爵士獨立廠牌線，c-183…c-191，九批全部走完五層**

**十五家獨立廠牌（Trio／Whynot、East Wind、Frasco、Alfa、Union、Kitty、CBS/Sony、Denon、Polydor JP、Nippon Crown、DOMO、ALM、discomate、URC、KENWOOD）的日本爵士，1969–1989。**
**雲端能做的全部做完**；上傳（KV／Firestore／`seed_cards.json`／`album_overrides`）依 `REMOTE_RUNBOOK.md` 由本機做。

## 一、九批結算

| 批 | 年段 | 提案 | 定案 | 收件率 | 串流 | 封面 | 交接 |
|---|---|---:|---:|---:|---:|---:|---|
| c-183 | 1969–1973 | 37 | 13 | 35% | — | — | `c183/HANDOFF.md` |
| c-184 | 1972–1975 | 38 | 24 | 63% | 15 | — | `c184/HANDOFF.md` |
| c-185 | 1975–1978 | 38 | 29 | 76% | **19**（`Kyo` 降級後） | — | `c185/HANDOFF.md` |
| c-186 | 1978–1979 | 38 | 24 | 63% | 17 | 18 | `c186/HANDOFF.md` |
| c-187 | 1979–1981 | 38 | 28 | 74% | **20**（`Little Train` 降級後） | 24 | `c187/HANDOFF.md` |
| c-188 | 1981–1983 | 38 | 23 | 61% | 15 | 21 | `c188/HANDOFF.md` |
| c-189 | 1983–1985 | 37 | 20 | 54% | 13 | 18 | `c189/HANDOFF.md` |
| c-190 | 1985–1986 | 37 | 21 | 57% | 13 | 17 | `c190/HANDOFF.md` |
| c-191 | 1986–1989 | 37 | 22 | 59% | 11 | 18 | `c191/HANDOFF.md` |
| **合計** | **1969–1989** | **338** | **204** | **60%** | | | |

**九批全部 100% pinned、零 §1 人工、apex 0、例外欄全空；簡介 204/204 走完鉤子＋寫作兩層。**
**收件率從 c-183 的 35% 爬到 60–76% 的成因是列舉層 `domestic` 那一欄修好了**（第 1953-B／1959-B 條），不是尺放寬。
⚠ **串流與封面以各批 `HANDOFF.md` 的數字為準**；c-183／c-184 的交接寫法不同（當時的格式），以該檔為準。

## 二、⚠ 本機上傳前要做的五件

1. ⚠ ⚠ **`audits/preview-downgrades.md` 的九筆試聽誤命中**——**已上過 KV 的批次（c-131）要改回固定無來源狀態**；其餘照 `previews.json` 現況上傳。
2. ⚠ ⚠ **池中 seed 要補的指回句**：`菊地雅章《Susto》` 指回 c-188《One-Way Traveller》（同一批錄音的兩張 LP）；
   **池中 `本田竹広《Jōdo》`／《Another Departure》** 的正文要核有沒有寫成唯一錄音（c-189《Gumbo》重錄了其中兩首）。
3. ⚠ **沿用 `HANDOFF-jp1-line.md` 的三項重複檢查**（自重剪／同場次／等價題）、`Steve Lacy` 池字串拆分、池卡 `山下洋輔トリオ《Chiasma》1976` 的 `live` 欄。
4. ⚠ **`Casiopea《Photographs》`〈Out Drive〉作曲者**（Discogs 寫 Sadao Watanabe）只剩 JASRAC 一個動作；正文沒寫。
5. **兩份補遺候選清單**：`audits/between-the-lines-candidates.md`（MB 旗標錯的 jp-1 門內碟、日本藝人的美國原盤）與 `audits/foreign-artist-japan-productions.md`（`Marlene` 七張等乙族）——**要不要開補遺線未定。**

## 三、這條線留下的工具（往後的線直接用）

- `batch-progress/slice-jp2.mjs`、`jp2-fix-domestic.mjs`（MB 區域階層解出身國碼）、`jp1-pool-refresh.mjs`（六道撞池＋`titlesSeen`）、`mark-prior-rulings.mjs`
- `batch-progress/probe/{match-lib,probe-previews,manual-recover}.mjs`（異體字摺疊、中點變體、三道誤命中擋板）
- `batch-progress/new-rulings.mjs`（`--max` 連預留一起算、`--reserve`）、`chk-dispatch.mjs`（九道派工信自檢）、`fix-names.mjs` ＋ `enum/name-corrections.json`
- `batch-progress/enum/known-pool-collisions.json`（13 筆）
- ⚠ **派工信模板與產生器在 scratchpad（不在 repo）**：`mk-cur.py`／`mk-res.py`／`mk-hook.py`／`mk-writer.py`——**數字、名單、條號、倒量參考全部由檔案算出**（第 1937-B 條的完整落實）；下一條線要用的話先把它們收進 repo。
