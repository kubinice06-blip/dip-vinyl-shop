# 一般卡 rewrite 級重新判定（desc-retriage-20261118）

## 為什麼

2026-11-17 第 0 步（`batch-progress/desc-severe-20261117/triage.json`）把一般卡判成 severe 2963／rewrite 13711／keep 4849。
當時規則還是「開頭不用鉤子」，所以**只因開頭是冷知識或懸念就判 rewrite 的有 2133 張**（codes 只有 [1]），另有大批 [1,3]、[1,4] 也帶著第 1 條。
之後店主恢復鉤子（「一樣要開頭給 hook 的方式」），取自故事、概念、聲音、地位的鉤子不再算毛病。

店主 2026-11-18 看了 5 張 rewrite 樣本：「重新評一次」；對菊地雅章《East Wind》（廠牌開頭、品番、曲長）：「這種需要重寫，以專輯為主，不是廠牌」。
規則已寫進 `desc-tools/prompts/general-desc-base.md` 第一節（第 1 條的新讀法、「以專輯為主」）與第三節。

## 範圍

`triage.json` 裡 grade=rewrite 的 13711 張（一般卡，無 tier）。severe 已全部重寫完，keep 不在本輪。
**只讀現行簡介、不上網、不改稿、不寫 KV。**

## 四級判準（取代第 0 步的三級）

| 級 | 意思 | 之後怎麼處理 |
|---|---|---|
| **severe** | 同第 0 步：主體是細節雜項，讀完不知道這是什麼唱片，沒有故事或概念，幾乎沒有聲音 | 照 severe 線流程（研究＋寫作） |
| **rewrite** | 缺專輯層級的內容，要重查：沒有聲音描述或只有形容詞；主體在講廠牌、品番、單一首歌、人員異動、銷量榜位而不是這張專輯；拿雜項當鉤子；沒出處的封號；事實可疑 | 研究＋寫作（同 severe 線） |
| **polish** | 這是什麼、故事或概念、聲音**都有**，只有形式問題：做作修辭、設問加「不只…而是…」、超過 240 字、一兩句可刪的雜項（發行日到日、錄音室名、銷量數字）、第二句沒講這是什麼唱片 | 不上網，直接改稿（寫作層＋主線審） |
| **keep** | 講得出這是什麼、誰做的、故事或概念、聽起來怎樣（具體樂器或手法），語氣平實；開頭鉤子取自故事、概念、聲音或地位也算 keep | 不動 |

拿不準 rewrite 還是 polish：問「不上網、只刪改現有句子，能不能寫出講得到聲音的好稿」；不能 → rewrite。拿不準 polish 還是 keep → polish。

### 店主看過的 5 張（判例）

- The Gaslight Anthem《The '59 Sound》：Springsteen 上台合唱的鉤子可以；發行日到日、聲音只一句「厚重車庫感的吉他」、「老派血脈被認領」修辭 → **rewrite**（聲音太薄，要重查）。
- Beyond《猶豫》：鉤子好，但大半篇只講〈Amani〉，整張聽起來怎樣沒寫 → **rewrite**。
- LCD Soundsystem《LCD Soundsystem》：設問開頭＋「不只…而是…」做作、279 字超長；聲音有（碟鼓、牛鈴、半唸半吼）、故事有 → **polish**。
- Bad Religion《No Control》：錄音室、日期、銷量佔大半，聲音只有「更快、更偏硬蕊」→ **rewrite**。
- 菊地雅章《East Wind》：廠牌開頭、品番、曲長，主體是廠牌不是專輯 → **rewrite**（店主指名要重寫）。

## 流程

1. 讀現行簡介：`node batch-progress/desc-audit-20261117/dump-descs.mjs batch-progress/desc-retriage-20261118`（需 `kv-token-check` exit 0；中斷重跑會接續；不要用 `/album-desc` 大量讀）。
2. 只取 13711 張 rewrite 的 key，切每份 300 張 → `in/in-NNN.json`。工具照 `batch-progress/desc-severe-20261117/tools/tri.mjs` 複製一份到本目錄 `tools/tri.mjs`，路徑改本目錄、grade 加 `polish`。
3. Sonnet 子代理每支一份，派工詞照 `batch-progress/desc-severe-20261117/prompt-triage.md` 改寫：判準換成本檔四級＋上面 5 張判例；先讀 `general-desc-base.md` 第一節。每 50 張 add 一次；輸出檔已有內容就接續。同時最多 8 支在飛。
4. 主線抽查：rewrite、polish、keep 各抽至少 30 張，偏鬆偏嚴就調派工詞重判那幾份；改了什麼寫進本目錄 `rulings.md`。
5. 合併成 `retriage.json`（`{k, artist, album, year, classic, grade, codes, why}`），統計四級張數，另出 `summary.md`：四級張數、CJK／經典度≥4 分布、每級 5 張代表例（附現行簡介全文），給協調端回報店主。
6. 收工：`PROJECT_MEMORY.md` 最上方追加一筆；逐一 git add；merge origin/main；開 PR、自己合併。不訂閱 PR、不排 check-in。
