# 封面是數位再發的模板圖、不是原盤書衣的卡（2026-09-03）

上架時逐張看過非 CAA 來源的 33 張新封面，其中三張是**正確的碟、但不是原盤書衣**：
串流上這張碟目前的發行方用的是「照片＋字」的模板圖。

依 §4，封面要核對的是「藝人、專輯與版本」——這三張都對得上，
發行的確是那個數位版本，所以**不退回**，照常上架。記在這裡是因為
店主日後若掃到原盤書衣，這三張換圖的效益最高。

| 批 | 卡 | 現用封面 | 原盤 |
|---|---|---|---|
| c-55 | Idir《Ay Arrac Nneɣ...》 | MLP music 的模板圖（Idir 的照片＋字） | 1979 年法國原盤書衣，CAA 的 release 與 release-group 都是 404 |
| c-61 | Mahogany Brain《With (Junk-Saucepan) When (Spoon-Trigger)》 | Futura Marge 的團名圖（只有「MB」與團名，看不出是哪張碟） | 1972 年 Futura 原盤，CAA 404 |
| c-63 | Big Joe Williams《Piney Woods Blues》 | 紅色調風景照＋字的模板圖 | 原盤書衣，CAA 這個 release-group 沒有 release 條目 |

同一輪逐張核對另外**退回了 11 張配錯的封面**（那些是真的配到別張碟或別的藝人，已列在
各批 `covers.json` 的 `coverRejected` 欄，卡片留置）：
c-53 三張（選輯輯次、音樂劇片段、collectionName 只回一個字母）、
c-52 兩張（《Pop Melayu Volume 4》、《Chav Bangers Volume 1》）、
c-55 兩張（二合一再發）、c-57 一張（1 軌單曲）、c-63 三張（續集輯、後期選輯、另一張現場碟）。

## 2026-09-04｜c-65 至 c-76 ＋ c-87 逐張核對後退回的封面（4 張）

四層補救之後 84 張是非 CAA 來源，逐張看圖核對，退回四張。**規律與 09-03 那次一致：
`apple-verified-collection`（試聽探測已釘 collectionId）零誤配，錯的全出在模糊搜尋那兩層。**

| 卡 | 來源 | 實際配到的東西 |
|---|---|---|
| Company《Company 1》 | spotify | Maranatha! Kids' Praise Company《10,000 Reasons》——團名裡的「Company」撞名 |
| Stan Tracey Quartet《Captain Adventure》 | spotify | 續作《**The Return Of** Captain Adventure》的 Tentoten 再發盤 |
| Hope of Glory《Under the Spout Where the Glory Comes Out》 | spotify | Spotify 專輯名回「向祢」，是一張華語敬拜碟 |
| Social Tension《Macbethia》 | spotify | 封面印的是《It Reminds Me of Macbethia》；該團同批另有《It Reminds Me of Those Days》，二合一形態無法判給哪一張 |

**續集／前作型的誤配已經是第二次**（09-03 是《The Return Of...》冒充《The Stuff That Dreams...》）。
Spotify／Bandcamp 命中一律要看圖或查 embed 的 `__NEXT_DATA__` 實際作品名，不能只看搜尋分數。
