# c-50 MBID 獨立覆核結果（2026-08-30）

`node batch-progress/c50/verify-mbid.mjs` —— 拿每張的 `rgMbid` 直接向 MusicBrainz
取 release-group，比對版本類型、secondary type、標題與首發日期。

```
覆核 127 張｜查詢失敗 0｜與卡片不符 0
primary-type：Album 127（全數）
secondary-type：Live 1、Soundtrack 1（皆為具名放行）
有首發日期：127 / 127
```

## 為什麼要跑這一支

`mb-raw.json` 是**搜尋結果的快取**，收斂器是在那份快取上挑。快取會過期、搜尋可能
根本沒回傳正解、挑選邏輯本身也可能有錯——這輪就因為欄位命名錯配讓十張卡釘到
單曲、合輯、現場盤與宣傳盤。用 ID 直接取才是獨立的第二來源：它問的是
「這個 ID 現在到底是什麼」，不是「當初搜尋回了什麼」。

覆核結果與研究層獨立打 API 的查證互相印證：研究層在 c50a 抓到的七張錯釘，
本支覆核時全部已是正解。

## 兩張具名放行

`accept-secondary.json` 列名的兩張確實帶著非空的 secondary type，符合預期：

| 卡 | 型別 | 為什麼放行 |
|---|---|---|
| Jackson Browne《Running on Empty》 | Album + Live | 本作就是巡演途中在舞台、旅館房間與巴士上錄成的，Live 是作品形式本身 |
| Henry Mancini《Charade》 | Album + Soundtrack | Mancini 的正典輸出就是電影配樂；本張是 1963 年原始配樂盤，非後製精選 |

## 過程中的 503

首輪 12 張、次輪 2 張回 503（MusicBrainz 服務忙碌，非查無）。腳本把 HTTP 錯誤
一律記進 `errors` 並以非零狀態碼結束、**不當成通過也不當成查無**，結果落檔可續跑，
隔一段時間重跑即補齊。這是 c-49 收斂器踩過兩次的同一類坑：把逾時當查無，
會讓 §1 的 MBID 硬規則靜默作廢。
