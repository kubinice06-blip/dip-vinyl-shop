# 新頂點盤策展派工（異端／流亡）

派工訊息會告訴你**組別**（例 `ax1a`）和**負責的方向**。批號＝組別去掉最後的字母，例如 `ax1`。場景與標準看 `batch-progress/apex-new-20261104/PLAN.md` 的分批表和「標準」段。

**每組提名 24 張**（一批 40 張分兩組，各 20 張，多出兩成給主線汰換）。流亡批一批 30 張分兩組，各提 18 張。池子不夠就照實交，不要湊數，在 notes 寫明。

## 挑什麼

- **異端組**：該場景公認**最極端**的錄音。依據要可信，例如 The Wire、樂評書目、Discogs／RYM 的類型前段、學術或專書評價，並寫進 `why`。每位藝人一張，挑他最極端的代表作。
  - 不收：聽得下去的前衛作品、能量型自由爵士、一般碾核。
- **流亡組**：私壓或極小廠的地下名作，例如收藏圈聖杯、考古廠重發過、有口碑的盤。
  - **硬條件**：Last.fm 累積 listeners 是有效值，且 1–299。查法：`curl -s "https://dip-vinyl-worker.kubinice06.workers.dev/album-rating?artist=…&album=…"` 取 `_listeners`；或看 Last.fm 專輯頁。
  - 冷門度 5：沒有串流授權再發。有串流考古重發的冷門度最多 4，不收。
  - 每位藝人一張；場景要分散。
- **兩組都一樣**：
  - 只收正規專輯，不收合輯、精選、單曲、EP。例外是那位藝人最重要的作品本來就是現場盤，要寫進 `releaseException`。
  - 藝人不能已經在同一級出現：去重時查 seed 第 9 欄同 tier 的藝人。

## 每張要做的事

1. **去重**：查一次，結果必須是 0 才能提。藝人名互為子字串也算撞。
   ```
   node -e 'const s=require("./seed_cards.json");const n=x=>x.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^\p{L}\p{N}]+/gu,"");const [a,b]=process.argv.slice(1);console.log(s.filter(r=>n(r[1])===n(b)&&(n(r[0]).includes(n(a))||n(a).includes(n(r[0])))).length)' "藝人" "專輯"
   ```
   再 `grep` 其他組的 `batch-progress/mood-cells-20261022/curation-ax*.json`，不要和別組重複提名。
2. **身分**：MB 查得到就填 `mbRgMbid`；查不到填 `mbAbsenceProof`＋`manualEvidenceUrls`（至少兩個 https，例如 Discogs master／release＋第二來源）。MB 請求帶 `User-Agent: dip-vinyl-shop/1.0`，每秒最多 1 次，遇 503 等 2 秒重試。
3. **封面來源**：Apple／iTunes、CAA、Discogs、Bandcamp 擇一，寫進 `evidence`。找不到封面就不提。
4. **名稱**：照原文正規寫法，保留變音符號；連字號用 ASCII `-`；年份取原盤首發年。
5. **`genres`**：照卡池既有曲風 id 填，例如 `noise`、`experimental`、`psychedelic`、`folk`、`jazz`、`soul`、`electronic`。
6. **`apexTier`**：填 `heresy` 或 `pearl`。**`apexWhy`**：一句話寫依據。流亡另外填 `listeners`（數字）。
7. `moodGuess` 照填，尺標照 `batch-progress/mood-axes/RULES.md`。只供參考，不拿來汰卡。
8. 每張至少 2 個 https 證據網址。

## 輸出

寫到 `batch-progress/mood-cells-20261022/curation-<組別>.json`，格式同 `CUR-DISPATCH-EB.md`，另加 `apexTier`、`apexWhy`、`listeners` 三個欄位：

```json
{"group":"ax1a","factions":[{"id":"jp-noise","zh":"日本噪音","count":0,"why":""}],
 "albums":[{"artist":"","album":"","year":0,"label":"","country":"","faction":"","genres":["noise"],
   "apexTier":"heresy","apexWhy":"","listeners":null,
   "why":"","moodGuess":{"x":0,"y":0,"z":0,"why":""},"evidence":["https://...","https://..."],
   "mbRgMbid":"","mbAbsenceProof":null,"manualEvidenceUrls":[],"releaseException":"","queryAlias":"","uncertain":""}],
 "notes":[]}
```

## 規矩

- **WebSearch 每組最多 12 次**。多用 MB API、Discogs API（`https://api.discogs.com/…`）、iTunes Search API、worker `/album-rating`、維基（`index.php?action=raw`）。
- **每做完 5 張就寫進輸出檔**。輸出檔已有內容就接續補完，不要重寫。
- 輔助腳本放在你自己 scratchpad 的 `cur-<組別>/` 底下。
- 不要 git add／commit，也不要改其他檔案。
- 完成後回報，10 行內：張數、各派系張數、MB 和人工身分各幾張、流亡 listeners 的分布、疑點。
