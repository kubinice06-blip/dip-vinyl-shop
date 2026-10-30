# Spotify 追蹤藝人補卡池：策展派工（身分、去重、挑代表作）

你負責某一批的一半藝人。派工訊息會告訴你**組別**（例 `sf02a`）和**藝人範圍**：`batch-progress/spotify-follow-20261030/batches.json` 中 `batches.<批>` 的前半或後半。sf01 的範圍則是 `batch-progress/spotify-follow-gap-2026-10-29/gap.json` 的 `favoriteAlbums` 前 19 或後 19 張。

## 每位藝人／每張指定盤要做的事

1. **身分**：清單是 Spotify 的寫法，可能是羅馬拼音、英文名或錯字。
   - 先確定是誰：國籍、年代、類型，有同名者要分清楚。
   - 找出卡池可能用的寫法：原文名、中文本名、MB 正規名、「英文 原文」雙寫（池中慣例如 `Joe Hisaishi 久石讓`、`Ryuichi Sakamoto 坂本龍一`）。
   - 例：Jo-Yu Chen＝陳珊妮、Layton Wu＝吳卓源、LaLa Hsu＝徐佳瑩、Cyndi Wang＝王心凌、Kinokoteikoku＝きのこ帝国、Chugakusei Kanoke＝中学生棺桶。
2. **去重**：用所有寫法查池，**池中已有這位藝人就整位跳過**（任務是補「卡池沒有的藝人」）。跳過的寫進 `notes`，格式 `跳過：<Spotify 名> → 池中寫法 <…>（N 張）`。
   - 查同名藝人：`node -e 'const s=require("./seed_cards.json");const n=x=>x.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]+/gu,"");const q=process.argv.slice(1).map(n);console.log(s.filter(r=>q.some(a=>n(r[0]).includes(a)||a.includes(n(r[0])))).map(r=>r[0]+"|"+r[1]).slice(0,20))' "寫法1" "寫法2"`
   - 注意互為子字串的誤中，例如 `dip` 會中一大堆，要人工看。
   - 也要查 `data/artist-intros/*.json` 的鍵與 `desc-tools/batches/artist/aliases.json`。
   - 再 `grep` 其他組的 `batch-progress/mood-cells-20261022/curation-sf*.json`，有提過的就不要重複。
3. **挑代表作**：每位 **1–2 張**。
   - 選生涯最受肯定、最具代表性的錄音室專輯，依據是評論共識、銷量與影響、樂迷公認。
   - 只有一張夠代表就只收一張；第二張要確實是另一個高峰才收。
   - 不收單曲、EP、精選、現場、混音。
   - 藝人只有 EP 或單曲、沒有正規專輯的：有一張 6 首以上、作為主要作品發行的長 EP 可以收，寫進 `releaseException`；不然就整位不收，寫進 notes。
   - **sf01 指定盤就是那張**，不換。Spotify 盤名要對回正式發行名：
     - 古典盤的藝人用**演奏者**（池中慣例：`Maurizio Pollini｜Chopin: Études opp. 10 & 25`），要查出 Spotify 那張是誰彈的哪個錄音。
     - 原聲帶合輯的藝人用 `Various Artists`。
     - 「蕭亞軒--」「陳奕迅2011 "?" 國語專輯」這類盤名，要還原成正式盤名（例《？》）。
4. **身分證據**：二選一。
   - MB 釘得住：填 `mbRgMbid`。查詢用 `https://musicbrainz.org/ws/2/release-group?query=artist:"…" AND releasegroup:"…"&fmt=json`，header 加 `User-Agent: dip-vinyl-shop/1.0 (kubinice06@gmail.com)`，每秒最多 1 次，503 等 2 秒重試。
   - MB 查無就走人工身分：`mbRgMbid` 留空，填 `mbAbsenceProof` 與 `manualEvidenceUrls`，至少兩個 https。可用 Discogs、廠牌頁、Bandcamp、維基、StreetVoice、KKBOX、博客來。
5. **封面來源**：Apple Music／iTunes、CAA、Discogs、Bandcamp 任一，網址寫進 `evidence`。找不到封面就不收，寫進 notes。
6. **名稱**：
   - 藝人與盤名照官方正規寫法。日文、中文、韓文藝人用原文。
   - 池中慣例若是雙寫，照池中同類寫法。
   - 連字號用 ASCII `-`。
   - 年份填原盤首發年。
7. **曲風** `genres`：第一個必須是類型樹第一層的大類，例 `rock` `pop` `jazz` `electronic` `hiphop` `soul` `folk` `classical` `world` `blues`。第二個可選。
8. **`moodGuess` 照填但只是參考**：`{"x":…, "y":…, "z":…, "why":"≤30 字講聲音"}`，尺照 `batch-progress/mood-axes/RULES.md`。這條線不拿它汰卡。

## 輸出

寫到 `batch-progress/mood-cells-20261022/curation-<組別>.json`（例 `curation-sf02a.json`），格式與情緒薄格線相同：

```json
{"group":"sf02a","factions":[{"id":"jp-rock","zh":"日本搖滾","count":0,"why":""}],
 "albums":[{"artist":"","album":"","year":0,"label":"","country":"jp","faction":"jp-rock","genres":["rock"],
   "why":"一句：為什麼是這位藝人的代表作","moodGuess":{"x":0,"y":0,"z":0,"why":""},
   "evidence":["https://...","https://..."],"spotifyName":"清單上的寫法",
   "mbRgMbid":"","mbAbsenceProof":null,"manualEvidenceUrls":[],"releaseException":"","queryAlias":"","uncertain":""}],
 "notes":["跳過：…","不收：…（理由）"]}
```

- `faction`：照場景自訂幾類即可。
- `country`：填 ISO 兩碼小寫。
- 清單上**每一位藝人**都要有交代：要嘛有卡，要嘛在 notes 寫「跳過／不收」與理由。

## 規矩

- **WebSearch 每組最多 15 次**。多用 MB API、Discogs API（`https://api.discogs.com/…`，UA 同上）、iTunes Search API（`https://itunes.apple.com/search?…&country=TW|JP|US`）、WebFetch 維基（`index.php?action=raw`）。
- **每做完 5 位就把目前結果寫進輸出檔**；輸出檔已有內容就接續補完，不要重寫。
- 輔助腳本放 `/tmp/claude-0/-home-user-dip-vinyl-shop/<你的工作階段 scratchpad>/cur-<組別>/`。
- 不要 git add／commit，不要改其他任何檔案。
- 完成後回報（10 行內）：藝人數、收幾張、跳過幾位（已在池）、不收幾位、MB 釘住和人工身分各幾張、疑點。
