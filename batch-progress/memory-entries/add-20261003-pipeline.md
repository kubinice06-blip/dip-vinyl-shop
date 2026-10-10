### 2026-10-03｜dip-vinyl-shop｜add-20261003：店主指定新增 何欣穗《完美小姐》（1999）——雲端段完成

**改動摘要**：店主「新增專輯：何欣穗 完美小姐」。池中無此盤（同藝人已有《她的。發光搖擺》《She & Me》）；ctw3 曾因封面留置。
身分 MB RG b4703bbb（Album、1999）＝Discogs 11294123（同條碼 4719260990124）；盤名照台灣盤規則取中文；封面走 §4 Discogs 來源（已登錄、目視 ok）；
研究 12 條 facts（full）、主線自寫 hook（預算 225）、寫作 232 字；三軸錨點 4／4／2（uncommon）、非頂點；試聽預估 unavailable（Apple 四店無）。

**主要檔案**：`batch-progress/add-20261003/{prop-a,rulings,onboarding-manifest,handoff}.json|md`、`desc-tools/batches/{cards,research,hooks,input,output}/add-20261003-*.json`、
`data/discogs-cover-registry.json`、`data/DISCOGS-COVERS.md`、`batch-progress/label-lines.mjs`。

**驗證結果**：`qa-batch research/hooks/out` 全過、`chk-hook-crossgroup` 全過、`qa-check-research` 0、`fix-spacing` 0、prepare gate 0 error／0 warning；全池 `dedup-crossbatch` 撞卡 0。

**值得記住的**：研究層查出金曲獎「最佳專輯製作人」入圍者是製作人 李欣芸，不是 何欣穗——池中《她的。發光搖擺》上架簡介首句因此有歧義，交本機改。

**追加（2026-10-10，店主核可）**：《她的。發光搖擺》簡介首句改為「何欣穗 1999 年以《完美小姐》出道，入圍金曲獎最佳新人，製作人李欣芸也入圍最佳專輯製作人；…」（全文 269 字）——
雲端改 `onboarding-manifest-ctw2-taiwan-artists-20260823.json`，KV 重傳交本機（`batch-progress/add-20261003/desc-fix-her-sheen-sway.json`）。

**追加（2026-10-10，雲端寫入）**：kv-token-check 通過後，雲端以 wrangler v4 寫入《她的。發光搖擺》修正版固定簡介 `desc2:`／`desc4:` 兩鍵，`verify-wave-kv` 逐字一致 2／2；《完美小姐》本機已於 main 19b73511 上架，雲端重跑 published gate 0 error。
⚠ runbook 的 `npx wrangler kv bulk put … --remote` 要 **wrangler v4**（v3 沒有 `--remote`、會直接報錯）；雲端沒預裝 wrangler，用 `npx -y wrangler@4`，並設 `CLOUDFLARE_ACCOUNT_ID`。
