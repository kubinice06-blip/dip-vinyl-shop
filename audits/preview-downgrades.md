# 試聽誤命中降級清單（給本機上傳前核對）

**`batch-progress/probe/previews.json` 裡帶 `downgradedBy` 的條目**——探測層判 `ready`、事後由研究層或主線回測證明是別張碟。
⚠ ⚠ **已經上過 KV 的批次（例如 c-131）要由本機把那一張改回固定無來源狀態**；還沒上傳的批次照 `previews.json` 現況上傳即可。

⚠ **三種誤命中的形狀**（主線第 1980-B／1997-B／1998-B／2002-B 條）：
1. **alias 衍生題＋漂移 ≥20**（已有擋板）；
2. **藝人名剛好等於我們的盤名、或掛名是靠 `queryAlias` 裡盤名的某個形鬆比對過的**（部分已有擋板：「盤名＝掛名同名條目＋漂移 ≥10」；`Sunny`→サニーデイ・サービス、`Oblique`→`Oblique E.P.` 這兩筆擋板擋不到）；
3. **同一位藝人的另一張、年份接近**（任何年份門檻都擋不到，只有研究層逐軌比對會發現）。

| 批 | 卡 | Apple 誤配到 | 降級依據 |
|---|---|---|---|
| c131 | `Bobby Hutcherson《Oblique》` | Oblique《Oblique E.P.》2008 | mainline-2002-B |
| c185 | `山屋清とコンテンポラリー・サウント・オーケストラ《Kyo》` | Kyo《Kyo》2000 | mainline-1997-B |
| c186 | `カリオカ《Sunny Place Carnival》` | Samba《Carioca》2025 | mainline-1980-B |
| c186 | `The Players Featuring 鈴木宏昌《Galaxy》` | C-Money and the Players Inc《Players》2006 | mainline-1980-B |
| c187 | `カリオカ《Little Train》` | Samba《Carioca》2025 | mainline-2002-B |
| c188 | `日野皓正《Pyramid》` | PYRAMID《Pyramid》2026 | mainline-1997-B |
| c188 | `池田芳夫 & 高瀬アキ《Esprit》` | 高瀬アキトリオ《AKI》1978 | mainline-1998-B |
| c189 | `日野皓正《New York Times》` | New York Times《New York Times》2007 | mainline-1997-B |
| c191 | `安田南 with 山本剛トリオ《Sunny》` | サニーデイ・サービス《Sunny》2014 | mainline-2002-B |
