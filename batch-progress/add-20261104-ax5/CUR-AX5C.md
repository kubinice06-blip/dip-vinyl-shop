# ax5c 策展＋研究合併（5 張，美國自由爵士異端候選）

一支代理做完兩件事：先照 `batch-progress/add-20261104-ax5/CUR-AX5.md` 的策展規則做身分／封面／去重，再照 `batch-progress/add-20261104-ax5/RES-AX5.md` 做研究與異端判定。

候選（卡池都有這位藝人的別張卡，這幾張本身不在卡池——去重指令必須 0；藝人不能已在 seed 異端）：
1. Sun Ra — Strange Strings（Saturn, 1967）
2. Steve Lacy — The Forest and the Zoo（ESP-Disk, 1967）
3. Archie Shepp — Live at the Donaueschingen Festival（MPS/SABA, 1967）
4. Sunny Murray — Big Chief（Pathé, 1969）
5. Sonny Sharrock — Guitar（Enemy, 1986）

輸出兩個檔：
- 策展：`batch-progress/mood-cells-20261022/curation-ax5c.json`（格式照 CUR-DISPATCH-AX.md，group "ax5c"）。
- 研究：`desc-tools/batches/research/add-20261104-ax5-d.json`（格式照 RES-AX5.md；key 用 `desc2:<artist>|<album>`，artist／album 與策展檔逐字一致；加 status、label、year 欄）。
WebSearch 總共最多 12 次。每做完 2 張就把兩個檔都寫一次；已有內容就接續。不碰 git。回報 10 行內：各張 heresy／none、汰換理由、WebSearch 次數。
