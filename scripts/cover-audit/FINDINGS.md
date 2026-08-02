# 卡池封面「最近似匹配」錯配稽核 — 結論

稽核日期：2026-08-02　　範圍：`seed_cards.json`（7,547）＋ `apex_pool.json`（633）＝ 8,180 張（兩池零重疊）

## 一、規模結論

**Spotify 模糊比對的錯配率約 3.5%，全池換算約 260 張。** 這已經遠超過「逐張改 KV」的量級，
應該改程式；但**不是**改 `albumOK` 的長度門檻，理由見第三節。

| 分層 | 張數 | 說明 |
| --- | --- | --- |
| Spotify 供圖（本次可稽核） | 2,173 | 名稱／藝人逐張比對過 |
| Cover Art Archive 供圖 | 5,448 | 稽核期間 Spotify 被限流，補救層接手（見第四節） |
| 查無此碟、無封面 | 558 | 不是配錯，另案 |
| 其他 | 1 | 有圖但無 Spotify 連結 |

可稽核的 2,173 張中，工具標記 A 級 116 張（5.34%）、B 級 21 張、C 級 55 張。
**A 級經逐張人工覆核，約 65% 是真的配錯（約 75 張）**，其餘是全名／官方副標／
藝人前綴等本來就該放行的情形。以 3.5% 套回全池 7,621 張有封面的卡，約 **260 張**。

## 二、錯配的實際樣態

真陽性集中在六種：

| 型態 | 實例 |
| --- | --- |
| 配到續作 | Led Zeppelin《Led Zeppelin II》→《Led Zeppelin III》；Nino Rota《The Godfather》→《Part II》；Neil Diamond《Hot August Night》→《III》 |
| 配到精選輯 | Santana《Santana》→《Santana's Greatest Hits》；Chet Baker《Chet》→《The Best Of》；BIGBANG《BIGBANG2》→《THE BEST OF BIGBANG》 |
| 配到兩張併一片的重發盤 | Dead Kennedys、Dion、Swans《Cop》→《Cop / Young God》、Tuxedomoon、Guy Clark |
| 配到現場盤或別的錄音 | Journey《Escape》→《Live In Houston 1981》；Dexter Gordon《Go》→《Live At Carnegie Hall》 |
| 配到完全無關的作品 | The Birthday Party《Junkyard》→ 草東沒有派對《醜奴兒》；Henry Cow《Legend》→ Cowell 的愛爾蘭傳說；Jesu《Jesu》→《Jesus Fashion》 |
| 配到同名的別人 | Gong《You》→ GAFANIO GONGKIE《Your little flaws that attract me》 |

## 三、根因不只一處——`albumOK` 之外還有兩個破口

任務描述指出的 `albumOK` 只是其一。稽核過程另外實證兩個：

1. **`artistMatches` 有同型的裸字串包含問題。**
   `normalize('Gong')` = `gong`，正好是 `gafaniogongkie` 的子字串，於是「藝人必須對得上」
   這道本來要擋短名誤配的護欄自己先失守。**只加專輯名長度護欄擋不住這一類。**

2. **跨語言補救層會誤放行。** The Birthday Party《Junkyard》配到《醜奴兒》就是走這條路徑。
   它要求「藝人查詢裡有正規化同名者」且「專輯藝人 id 在那批結果裡」，但第一個條件同樣
   用裸字串包含，`birthdayparty` 與 `nopartyforcaodong` 之間靠 `party` 就能牽上線。

**若要加護欄，建議用「詞集合互為子集」取代裸字串包含**——稽核腳本改用這個判準後，
`Gong` vs `GAFANIO GONGKIE` 擋掉了，而 `Buddy Holly` vs `Buddy Holly & The Crickets`、
`Sun Ra Arkestra` vs `Sun Ra`、`The Lightmen` vs `Bubbha Thomas & The Lightmen`
這些真的同一人全部照樣通過。裸長度比護欄會誤殺這批，實測過。

## 四、更關鍵的發現：Cover Art Archive 補救層準確度遠高於 Spotify 模糊比對

稽核期間 Spotify 被限流（見第五節），5,448 張卡的封面由補救層供應。
**抽驗 150 張反查 MusicBrainz release-group：148 張標題完全吻合、0 張名稱不符**，
唯二的偏差是 Justice《Cross》配到現場盤《A Cross the Universe》、
以及 Cecil Taylor《Nefertiti》對到完整全名。錯誤率約 **0.7%**，
對比 Spotify 模糊比對的 **3.5%**，準確度高五倍。

**因此建議的修法不是調 `albumOK` 門檻，而是把補救層從「Spotify 查不到才跑」
改成「Spotify 只有模糊命中時就跑，並以 MB 的結果覆核」：**

- `exactHit`（藝人與專輯都完全吻合）→ 照舊直接採用，不動。
- 只有 fuzzy 命中 → 呼叫既有的 MB／CAA 鏈；MB 若給出 score ≥ 90、primary-type Album
  且標題與卡池名完全吻合的 release-group，就用 CAA 的封面，並在名稱不相容時把
  `spotifyUrl` 設為 null（不留指向錯專輯的連結）。
- 兩邊都沒有把握 → 維持現狀回 Spotify 的 fuzzy 結果，不會比今天更差。

這個作法的好處是**不必猜門檻**：長度比例護欄無論訂多少都會在「續作編號只差 3 個字」
（Hot August Night → III）與「官方全名多 30 個字」（The Mack → Original Motion Picture
Soundtrack）之間顧此失彼，而覆核機制是用第二個資料源直接判對錯。

## 五、稽核期間造成的副作用（需要店主裁示）

**Spotify 在補齊掃描途中限流了。** 補齊跑到約第 600 張時 `/v1/search` 開始回 429，
之後 5,446 張卡的封面全部由 CAA 補救層供應並**永久寫進 KV**（`cover6:`，無 TTL），
`spotifyUrl` 為 `null`。稽核結束時實測 `Retry-After`：`/v1/albums/{id}` 約 21 小時、
`/v1/search` 約 5 小時。

損害評估：

- **封面本身沒有變差，反而更準**（第四節：0.7% vs 3.5%）。
- **沒有污染負面快取**：worker 既有的「任何一步失敗就不寫入」護欄有生效，
  429 期間的空結果沒有被存成 7 天快取。
- **唯一實質損失是 `spotifyUrl`**。前台三頁（`battle.html:1593`、`roguelike.html:2960`、
  `index.html`）的 Spotify 按鈕預設 href 就是 `open.spotify.com/search/…`，
  取不到直連時會退回搜尋頁，**不會壞掉，只是少了直達連結**。

三個選項，建議第二個：

1. 刪掉這 5,446 個 `cover6:` 鍵，讓它們限流解除後重新走 Spotify —— 會把封面準確度
   從 0.7% 錯降回 3.5% 錯，不划算。
2. **保留封面，之後單獨補 `spotifyUrl`**：限流解除後跑一支只查連結、不動 `imageUrl`
   的腳本回填。鍵清單已存 `data/caa-written-keys.json`。
3. 什麼都不做：封面是對的，按鈕退回搜尋頁也能用。

## 六、產出物

| 檔案 | 內容 |
| --- | --- |
| `1-collect-cards.mjs` | 彙整全卡池卡單＋KV bulk get 讀既有 `cover6:` |
| `2-fill-uncached.mjs` | 節流、可續跑地補齊未快取的卡 |
| `3-fetch-spotify-meta.mjs` | 官方 API 取專輯中繼資料（含年份與型別） |
| `3b-fetch-embed-meta.mjs` | 限流時的備援：從 embed 頁取名稱與藝人 |
| `4-score.mjs` | 判準與分級 |
| `5-report.mjs` | 產生 `REPORT.md` |
| `6-audit-caa.mjs` | 反查 MusicBrainz，稽核補救層準確度 |
| `data/suspects.json` / `.csv` | 192 筆可疑清單（A 116／B 21／C 55） |
| `data/caa-audit.json` | 補救層抽驗 150 張的結果 |
| `data/caa-written-keys.json` | 本次由補救層寫入 KV 的 5,446 個鍵 |
| `REPORT.md` | 完整可疑清單（含三級表格） |

## 七、方法上的兩個坑（下次別再試）

1. **`open.spotify.com` 的 `og:title`／`og:description` 已經抓不到**——現在的 web player
   對一般 fetch 只吐 `og:site_name`。改用 `open.spotify.com/embed/album/{id}` 頁面裡的
   `__NEXT_DATA__`，有 `name` 與 `subtitle`（藝人），且不吃 API 額度。
2. **`/v1/albums?ids=`（一次 20 張）對本 app 的 client-credentials token 回 403**，
   單張 `/v1/albums/{id}` 才是 200。省請求數的批次路線走不通，只能單張加節流。
