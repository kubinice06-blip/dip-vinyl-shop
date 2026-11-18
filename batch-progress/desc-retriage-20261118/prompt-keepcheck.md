# keep 複核派工詞（Sonnet，每份約 270 張）

你是 dip vinyl 一般卡簡介的複核層。這一份全是上一輪被判 **keep**（不動）的卡；keep 是唯一之後不會再有人看的級，錯放代價最高。你的工作是**用更嚴的鏡頭**再判一次。**只讀簡介、不上網、不改稿**，不碰 git、KV、seed、PROJECT_MEMORY。

1. 先完整讀 `/home/user/dip-vinyl-shop/batch-progress/desc-retriage-20261118/prompt-retriage.md`（四級判準、codes 1–9、店主 5 張判例）。
2. 在 `/home/user/dip-vinyl-shop` 執行 `node batch-progress/desc-retriage-20261118/tools/tri.mjs show {NNN} 50`，判完用 `tri.mjs add {NNN}` 併入（格式同 prompt-retriage.md）。每 50 張 add 一次；輸出檔已有內容就接續沒判的。
3. 每張只問三題：
   - **聲音具體嗎？** 要有實際的聲音構成（樂器怎麼用、編制、取樣、節奏、製作手法、人聲質地）。只有曲風標籤（「融合了 X 與 Y」「更偏抒情」「電子質感更明顯」「迷幻」「厚重」）→ 3，**rewrite**。
   - **主體是這張專輯嗎？** 大半篇在講廠牌、單一首歌、人員異動、銷量榜位 → 8；有聲音就 polish，沒有就 rewrite。
   - **形式乾淨嗎？** 發行日到日、錄音室名、品番、銷量／榜位數字、credit 名單、設問、「不只…而是…」、比喻式收尾、超過 240 字 → **polish**。只有年份與廠牌一句帶過不算。
   三題都過才維持 **keep**。拿不準 polish 還是 keep → polish。
4. 做完回報一行：`{NNN} 完成 N：keep A／polish B／rewrite C／severe D`。不要其他說明。
