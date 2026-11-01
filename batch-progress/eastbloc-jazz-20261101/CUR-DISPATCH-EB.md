# 鐵幕爵士＋MPS 策展派工

派工訊息會告訴你**組別**（例 `eb1a`）和**負責哪幾個派系**。批號是組別去掉最後的字母，例 `eb1`；場景在 `batch-progress/eastbloc-jazz-20261101/PLAN.md` 分批表那一列。

**提名 24 張**：一批 40 張分給 2 組，各提 20 張，另多 20% 給主線汰換。池子不夠就照實交，不湊數，並在 notes 寫明。

## 挑什麼

- 該國或該廠牌爵士史上**公認重要的正規錄音室專輯**。依據是評論共識、後來的重發與再評價（Jazzman、Jazzanova、Astigmatic、GAD、Polskie Nagrania 重發系列等）、樂迷公認。
- 要有代表性。不收單曲、EP、合輯、精選。現場盤只收「那位藝人最重要的作品本來就是現場」的情況，寫進 `releaseException`。
- 每位藝人 1–3 張。第二、三張必須確實是另一個高峰。
- 同時看派系配置：每個國家或子派系都要有幾張。主流 bop／modal、fusion、free、民謠融合、人聲各類都要照顧到，不要全擠在同一種。
- eb1 一定要收 **Yancy Körössy《Identification》（MPS，1969／1970）**。Kőrössy 的 Electrecord 正規作再挑 1–2 張。

## 每張要做的事

1. **去重**：每張都要查，結果必須是 0 才能提。藝人名互為子字串也算撞。
   ```
   node -e 'const s=require("./seed_cards.json");const n=x=>x.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^\p{L}\p{N}]+/gu,"");const [a,b]=process.argv.slice(1);console.log(s.filter(r=>n(r[1])===n(b)&&(n(r[0]).includes(n(a))||n(a).includes(n(r[0])))).length)' "藝人" "專輯"
   ```
   - 先看該藝人在池中已有幾張，查的時候去掉變音符號（ő／ł／č 等）。
   - 再 `grep` 其他組的 `batch-progress/mood-cells-20261022/curation-eb*.json`，有提過的不要重複提。
2. **身分**（二選一）：
   - **MB 查得到**：填 `mbRgMbid`。查詢 `https://musicbrainz.org/ws/2/release-group?query=artist:"…" AND releasegroup:"…"&fmt=json`，header 帶 `User-Agent: dip-vinyl-shop/1.0 (kubinice06@gmail.com)`，每秒最多 1 次，遇 503 等 2 秒重試。
   - **MB 查無 → 人工身分**（國營廠盤常見）：`mbRgMbid` 留空，填 `mbAbsenceProof` 和 `manualEvidenceUrls`。後者至少兩個 https，例如 Discogs master／release、廠牌或重發廠頁、維基、Bandcamp。
3. **封面來源**：Apple Music／iTunes、CAA、Discogs、Bandcamp 任一，網址寫進 `evidence`。找不到封面就不提。
4. **名稱**：
   - 藝人名、盤名照原文正規寫法，保留變音符號（Răducanu、Kőszegi、Wróblewski）。
   - 匈牙利人名照卡池慣例：國際發行用的寫法，或「姓 名」原序，擇一並在 notes 註明。
   - 連字號用 ASCII `-`。
   - 年份填原盤首發年。
5. **曲風** `genres`：第一個填 `jazz`。民謠融合可加第二個 `world`。
6. **`moodGuess`** 照填，尺照 `batch-progress/mood-axes/RULES.md`。只是參考，不拿來汰卡。
7. 每張至少 2 個 https 證據網址。`why` 用一句話寫：為什麼是這個國家／廠牌爵士的代表作。

## 輸出

寫到 `batch-progress/mood-cells-20261022/curation-<組別>.json`：

```json
{"group":"eb1a","factions":[{"id":"ro-electrecord","zh":"羅馬尼亞 Electrecord","count":0,"why":""}],
 "albums":[{"artist":"","album":"","year":0,"label":"","country":"ro","faction":"ro-electrecord","genres":["jazz"],
   "why":"","moodGuess":{"x":0,"y":0,"z":0,"why":""},"evidence":["https://...","https://..."],
   "mbRgMbid":"","mbAbsenceProof":null,"manualEvidenceUrls":[],"releaseException":"","queryAlias":"","uncertain":""}],
 "notes":[]}
```

`country` 填 ISO 兩碼小寫：ro、hu、cs（捷克斯洛伐克時代的盤）、pl、su、dd、yu、bg、de。

## 規矩

- **WebSearch 每組最多 12 次**。多用 MB API、Discogs API（`https://api.discogs.com/…`，UA 同上）、iTunes Search API（`country=US|DE|PL|HU|RO`）、WebFetch 維基（`index.php?action=raw`）。
- **每做完 5 張就把目前結果寫進輸出檔**。輸出檔已有內容就接續補完，不要重寫。
- 輔助腳本放你自己 scratchpad 的 `cur-<組別>/` 子資料夾。
- 不要 git add／commit，不要改其他檔案。
- 完成後回報，10 行內：張數、各派系張數、MB 查得到和人工身分各幾張、疑點。
