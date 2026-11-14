# 主站封面版本清查（edition-20261114）交接

店主 2026-11-13／14：「有些封面用成了 CD 版或其他特別版……我只要正常版就好」→「全面清查」。
判定規則見同目錄 `RULES.md`（五種問題＋2026-08-30 取捨 0–3）。

## 已完成（2026-11-14 雲端工作階段）

- **共換回 863 張**（b1 31、b2 258、b3 204、b4 165、b5 205）。明細見 `scripts/cover-audit/data/edition-fix-20261114.json`（每筆 from／to／來源／兩票審查理由，batch b1–b5）。
  Firestore `card_catalog.coverUrl` 寫入前回讀現值、寫入後再回讀；KV `cover6:*` 有鍵的同步 imageUrl；
  Discogs 來源登記在 `data/discogs-cover-registry.json`（batch `edition-20261114`）。
- 流程：MB/CAA 補掃（RG 12,996＋release 1,228）→ 分桶 → Apple／Spotify 6,888 張看圖初判 → 參考圖對照（Discogs／CAA 主圖 vs 現用圖）→ 挑原版 → 找圖 → 兩個角度對抗驗證（設計＋品質，**兩票都過才換**）→ 被否決的再找一輪（附審查意見）→ 最後一輪 → 套用。
- CAA 一律寫 `/front-1200`（或指定圖的 `-1200.jpg`），原圖常常十幾 MB。

## 還沒做完的（下一個工作階段接手）

1. **Discogs 參考圖對照沒跑完**（約 2,855 張）。Discogs 未登入每分鐘 25 次，背景 worker 有 2 小時上限，這次跑到上限被停。
   - `state/pair-keys-caa.json`：CAA 晚期／重發 RG 組 1,364 張未對照。其中 1,217 筆原本被記成 `kind:none`，是**假查無**（Discogs 被擠爆時回 200＋空結果；抽 3 筆直接查都查得到）。匯出的 `state/dg-cache.json.gz` **已經把這 1,217 筆刪掉**，任務還在 `dg-tasks.jsonl`，worker 會重查。**重查時不要同時跑找圖代理**（它們也打 Discogs）。
   - `state/pair-keys-all.json`：Apple／Spotify 組 1,491 張未對照（1,138 有 MB RG 但 CAA 沒圖、353 沒 RG），都在等 Discogs 參考圖。
   - 跑法：`node dg-worker.mjs`（背景，任務檔 dg-tasks.jsonl）→ `python3 -I pair-items.py <keys> <prefix>` → wf-pair.js → `pair-collect.py` → 抓到的進 prep → build-decide → wf-decide → verify-build → wf-verify → ledger.py → apply。
2. **573 張 Apple／Spotify 封面完全沒有參考圖**（Discogs 與 MB 都查無），只做了看圖初判（keep）。
3. **最後一輪仍沒解決的**：`state/unresolved.json`（每張附最後一次的否決理由與代理建議的備選圖）。多半是「原版只有實拍／小圖」或「現用圖其實就是通行版」。
4. **卡片身分疑點**（封面以外的問題，沒動）：見 `state/identity-notes.json`。

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
