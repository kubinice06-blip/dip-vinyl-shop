# 線上卡池：5 張封面配到「單曲」條目而非專輯（2026-09-01）

## 怎麼發現的

跑 c-52 的封面線時（c-SEA 當初只跑 CAA，這批補跑 §4 的 Bandcamp → Spotify），
worker 的 `/spotify-search` 回了兩筆**一軌的單曲**冒充專輯：Gombloh《Kebyar Kebyar》
配到 1985 年的單曲、Elvy Sukaesih《Menghitung Bintang》配到 1980 年的單曲。

這與 2026-08-31 在 Apple 試聽探測抓到的是**同一個病**（Apple 那邊是「某某 - Single」
「某某 - EP」的後綴摺疊後只多 6–7 個字元，落在長度差容忍範圍內）。來源換了，病沒換：
單曲條目的標題與專輯同名，比對函式若只看標題與掛名就分不出來。

既然新批次會中，線上卡池應該也中過，所以拿 `scripts/cover-audit/data/` 既有的
2,169 筆 Spotify 中繼資料回頭掃。

## 掃描結果：11 張命中，其中 6 張是誤報

**軌數少不能當否決理由**——長篇作品本來就一到兩軌。這 6 張是**正確配對**，不要動：

| 卡 | Spotify 條目 | 軌數 |
|---|---|---|
| Klaus Schulze《Timewind》(1975) | Timewind | 2（兩面各一首） |
| Klaus Schulze《Moondawn》(1976) | Moondawn | 2 |
| Miles Davis《In a Silent Way》(1969) | In A Silent Way | 2 |
| Miles Davis《A Tribute to Jack Johnson》(1971) | A Tribute To Jack Johnson | 2 |
| Miles Davis《Pangaea》(1975) | Pangaea | 2 |
| Pharoah Sanders《Black Unity》(1972) | Black Unity | 1（37 分鐘單曲式） |

可靠的訊號是 Spotify 自己標的 `albumType === 'single'` 或標題帶「- Single」，**不是軌數**。
（c-52 的裁決器已照這個結論修過：軌數少改成軟旗標，只有 albumType 才硬否決。）

## 真正錯配的 5 張：屬線上資料，留給本機

| 卡 | 配到的 Spotify 條目 | 問題 |
|---|---|---|
| Loretta Lynn《Coal Miner's Daughter》(1970) | Coal Miner's Daughter (Live On The Ed Sullivan Show, May 30, 1971) | 電視現場單曲，不是 1970 年的專輯 |
| Kraftwerk《Autobahn》(1974) | Autobahn［single, 1 軌］ | 單曲版，封面與專輯的高速公路畫作不同 |
| Bobby Womack《Across 110th Street》(1972) | Across 110th Street - Single［3 軌］ | 單曲，不是原聲帶專輯 |
| Thelonious Monk《Thelonious Monk with John Coltrane》(1961) | Thelonious Monk With John Coltrane［single, 1 軌］ | 單曲條目 |
| Gong《You》(2021) | Your little flaws that attract me［single, 1 軌］ | **配到完全不同的藝人**——這筆是 worker 稽核的定點測試案例之一（短名 Gong 被含在別人名字裡），修正邏輯已寫進 worker，但這張卡的既有封面沒有回頭重解 |

**建議處理**：前四張重解封面（CAA 或 Apple 官方圖皆可，四張都是西方正典、命中率高）；
Gong 那張是既有錯誤資料的殘留，worker 的判定邏輯已修，重跑一次解析就會換掉。

## 這批不是全池掃描

只掃了 `cover-audit/data/` 裡**已有 Spotify 中繼資料**的 2,173 張（多為 2026-08-29／08-30
封面稽核當時取樣的範圍），不是全池 13,418 張。若要確認全池，需要替其餘卡片補抓
`albumType`／`totalTracks` 再跑同一支判定。以 11／2,173 的命中率推估，全池大約還有
二十餘張同類，其中依這次的比例約半數會是長篇作品的誤報。
