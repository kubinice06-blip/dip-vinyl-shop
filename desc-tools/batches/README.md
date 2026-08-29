# desc-tools/batches — 雲端段簡介產物

layout 與本機 `desc-restyle/batches/` 完全一致，本機接手時整包複製回去即可：

```
cards/<批名>-cards.json          卡單（key＝desc2:artist|album，CJK 鍵用 desc4:）
research/<批名>-{a..e}.json      研究層五組
hooks/<批名>-hooks-{a..e}.json   hook 層（2 個代理各負責 a–c 與 d–e）
input/<批名>-writer-{1..5}.json  merge-writer-input.mjs 產出，與 a–e 對齊
output/<批名>-out-{1..5}.json    寫作層
```

跑腳本時 **cwd 必須是 `desc-tools/`**（腳本用相對路徑 `batches/...`）。

## 本批的批名

| 批名 | 內容 |
|---|---|
| `c48a` / `c48b` | c-48 古典補完 |
| `c49a` / `c49b` | c-49 華語高風險 |

## ⚠ 雲端段的已知缺口：通論帳本讀不到

`dip-desc-restyle` skill 要求開工前讀 `desc-restyle/progress.json` 的
`notes` 與最近五筆 batches 紀錄——那是**通論帳本**，記著每批把哪些「通論」
（廠牌沿革、場景、流派、生平）釘在哪張卡上，新批次不得重述已用掉的通論。

**那個檔不在版控內，雲端 clone 看不到。** 因此本批的雲端段只能做到「批內不重複」
（靠 `chk-hook-crossgroup.mjs` 擋跨組撞頭），**跨批次的通論重複必須由本機在逐張審稿時把關**。
本機接手時請先對照 progress.json 的通論帳本再審稿。
