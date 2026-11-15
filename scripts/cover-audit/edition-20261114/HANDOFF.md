# 主站封面版本清查（edition-20261114）交接

店主 2026-11-13／14：「有些封面用成了 CD 版或其他特別版……我只要正常版就好」→「全面清查」。
判定規則見同目錄 `RULES.md`（五種問題＋2026-08-30 取捨 0–3）。

## 已完成

- **共換回 1,141 張**：第一階段（2026-11-14）b1 31、b2 258、b3 204、b4 165、b5 205；第二階段（2026-11-15）b6 167、b7 111。
  明細見 `scripts/cover-audit/data/edition-fix-20261114.json`（每筆 from／to／來源／兩票審查理由，batch b1–b7；b6／b7 另有 `stage`＝流程前綴）。
  Firestore `card_catalog.coverUrl` 寫入前回讀現值、寫入後再回讀；KV `cover6:*` 有鍵的同步 imageUrl 並回讀；
  Discogs 來源登記在 `data/discogs-cover-registry.json`（batch `edition-20261114`）。
- 流程：MB/CAA 補掃 → 分桶 → Apple／Spotify 看圖初判 → 參考圖對照（Discogs／CAA 主圖 vs 現用圖，`pair-items`＋`wf-pair`）→ 挑原版（`build-decide`＋`wf-decide`）→ 兩個角度對抗驗證（`verify-build`＋`wf-verify`，設計＋品質**兩票都過才換**）→ 被否決的附審查意見再找一輪（`wf-source`）→ 套用。
- CAA 一律寫 `/front-1200`（或指定圖的 `-1200.jpg`），原圖常常十幾 MB。

## 第二階段（2026-11-15）做了什麼、發現什麼

- **上一輪「假查無」的真正原因**：Discogs 未登入的 `/database/search` 結果，`thumb`／`cover_image` 現在一律是空字串。舊 `dg-worker` 用「有圖」過濾，把所有結果濾光、記成 `kind:none`（第一階段 dg-cache 只有 70 筆 master 拿到圖）。
  已改：先依盤名／藝人挑 master／release，再打 `/masters/<id>`、`/releases/<id>` 拿主圖（每張多 1 次請求，約每分鐘 10 張）；
  `artist=` 只比對主名，藝人在該張用別名（ANV，例如 `Richie Beirach*`）或日文名時回 0 筆，補了全文 `q=` 退路；仍 0 筆才等 10 秒重查（防擠爆）。新增結果種類 `noimg`＝有搜尋結果但盤名對不上或都沒圖。
- **CAA 組 1,364 張**：有 Discogs 參考圖 871（master 722、release 149），對照 877；`noimg` 395、`none` 98（抽查多是古典曲目命名、合輯名對不上，不是擠爆）。
- **Apple／Spotify 組 1,491 張**：有參考圖 1,299，對照 1,304；`noimg` 127、`none` 65。
- 可疑 460 張 → 換 278（b6＋b7）、查證後保留 98、仍未解決 84（`state/unresolved-2.json`，附最後一次否決理由）。
- 新增腳本：`make-flagged.py`（pair-flags → build-decide 清單，等 Discogs 版本與 MB browse 都抓好）、`dec-collect.py`（wf-decide 結果 → decisions）、`defer-ca.py`（pair-items 後撤回「還沒查 Discogs、只有 CA 參考圖」的卡，等兩種參考圖都到再對）、`thumbs-sheet.py`（套用前 舊｜新 縮圖）。

## 還沒做完的（下一個工作階段接手）

1. **第一階段已「對照過」的 Apple／Spotify 卡約 1,948 張，其實只比了 CAA 參考圖**：它們的 Discogs 搜尋是在上述 bug 期間跑的，全記成 `none`，對照時沒有 Discogs 參考圖。
   這次抽 78 張重查，67 張拿到 Discogs master 主圖、重新對照全部 same；比例上全部重查約可補到 1,600 張參考圖，預期再抓出的問題卡比 CAA 組少（它們已經和 CAA 主圖比過）。
   做法：從 dg-cache 刪掉這些 `search:<key>`（kind none）、排回 dg-tasks（約 3.5 小時 Discogs）→ 從 pair-done 拿掉 → `pair-items`＋`defer-ca` → 同流程。
2. **沒有任何 Discogs 參考圖的卡**：CAA 組 493（`noimg` 395＋`none` 98）、Apple／Spotify 組 187；第一階段另有 573 張完全沒有參考圖。`noimg` 多半是盤名格式不同（古典作品名、合輯、副標），要人工或改寫比對規則。
3. **第二階段仍沒解決的 84 張**：`state/unresolved-2.json`。多半是原版只有實拍／帶側標／小圖，或封面分岔看不出哪套通行；第一階段的 92 張在 `state/unresolved.json`。
4. **卡片身分疑點**：`state/identity-notes.json`（第一階段 4 張＋這次 9 張），換封面等於換錄音或換專輯的都沒動。

## 需要店主決定的（這次沒自動換）

- John Lennon & Yoko Ono《Two Virgins》：現用牛皮紙袋版；原版是全裸照封面，沒有自動換。
- Joni Mitchell《Don Juan's Reckless Daughter》：已換回原版，原版封面有她扮黑人（blackface）的造型，店主可決定要不要改回。
- 少數封面本來就分岔（同一張有兩套通行封面），照取捨 0 保留現用的那套。

## 怎麼接手

```
mkdir -p <work> && cp scripts/cover-audit/edition-20261114/*.{py,mjs,js,md} <work>/
cd <work> && for f in <repo>/scripts/cover-audit/edition-20261114/state/*.json.gz; do gunzip -c "$f" > "$(basename "${f%.gz}")"; done
node fetch-catalog.mjs              # 重抓 card_catalog → catalog.json（可續跑）
python3 -I make-seedmap.py <repo>/seed_cards.json   # → seedmap.json
```
- `ledger.py` 讀 workflow journal 的路徑寫死在檔頭 `WF=`，換工作階段要改。`registry-merge.py` 的 repo 路徑也是寫死的。
- wf-*.js 是 Workflow 工具的腳本（scriptPath 指過去、args 給 dir／prefix）。
- 已套用清單在 `state/applied.json`，apply-build 會跳過；總帳 `state/ledger.json`。
- `ledger.py`、`pair-collect.py`、`src2dec.py`、`dec-collect.py`、`merge-classify.py` 檔頭的 `WF=` 都要改成新工作階段的 workflow 目錄。
- Discogs worker 一次背景最多 2 小時，被停就照原樣再開（可續跑）；**跑 worker 時不要同時開 `wf-source` 找圖代理**（它們也打 Discogs）。MB worker 同樣 2 小時會被停，流程需要時重開。
