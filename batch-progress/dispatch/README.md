# 派工信模板與產生器（主線第 2007-B 條收進 repo）

**為什麼在這裡**：jp-2 剩下四批（c-188…c-191）的 20 封派工信全部由這幾支產生，**張數、名單、條號、倒量參考一律由檔案算出**（第 1937-B 條）。
原本放在 scratchpad，**2026-09-28 容器重啟整個清空**，是從對話紀錄逐步重放重建的——**從此放 repo。**

| 層 | 模板 | 產生器 | 用法 |
|---|---|---|---|
| 策展 | `cur-template.md` | `mk-cur.py` | `python3 mk-cur.py <批> <a\|b> <輸出> [已收線的最後一批]` |
| 研究 | `res-template.md` | `mk-res.py` | `python3 mk-res.py <批> <a\|b> <輸出> <versions檔> <risks檔>` |
| 鉤子 | `hook-template.md` | `mk-hook.py` | `python3 mk-hook.py <批> <輸出> <risks檔> <倒量參考批>` |
| 寫作 | `writer-template.md` | `mk-writer.py` | `python3 mk-writer.py <批> <1\|2> <輸出> <second檔> <risks檔> <倒量參考批>` |
| 收線 | — | `batch-stats.mjs` | `node batch-progress/dispatch/batch-stats.mjs <批>`（工作目錄 repo 根） |

- **每封產完一律跑 `node batch-progress/chk-dispatch.mjs <信> <批> <組>`**；剩下的標記逐條看，模板的通用舉例（`Marlene`／`country`／`Hi‐Fi Set`）撞到對方那組是已知假警報。
- **條號先預留再產信**：`node batch-progress/new-rulings.mjs --reserve <批> 研究 30 30`（鉤子 40、寫作 15 15）——產生器從骨架檔頭讀區間。
- **`{{RISKS}}`／`{{SECOND}}`／`{{VERSIONS}}` 是每批手寫的**（讀完上一層的裁定與代理報告後寫），其餘全部由檔案算出。
- **非 jp-2 的批次**（例如補遺線）：用環境變數 `ORD=十` 之類覆寫「第幾批」，其餘照舊。
