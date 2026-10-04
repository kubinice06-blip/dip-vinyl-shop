# c-153 交接（2026-09-18）：Blue Note 1995–98（另含一張 1985 他廠首發），34 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

切片 45 張，**收 34 退 11**（a 組收 19 退 4、b 組收 15 退 7）。**退貨率 24%，是這一段最高的一批**
——1995–97 正是 Blue Note 中價選輯（`Jazz Profile`、`Love Songs`、`Complete… Recordings`）與
東芝 EMI 復刻線的高峰。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **34/34，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **34/34 全 full**，out-1 223–240／out-2 219–239 |
| 封面 | **24/34**（缺 10，**替代來源 10/10 全部查實且都確認 `images[0]` 是 `primary`**） |
| 固定試聽／無來源狀態 | **29/34 有來源**（探測 + 研究層撈回 2），**5 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 本批無合輯，例外欄全空 |
| published gate | 本機端 |

## 三、⚠ 收退判準在這一批被寫成可操作的四句（第 1202＋1233 條）

**錄音年在 1985 前的，先查「先前是否商業發行過」：**
- **(甲) 沒發行過 → 收**（庫存首發。**紙本把它歸在「VITAL REISSUES」欄不是判準**）。
- **(乙) 發行過、母體號段屬 Blue Note／Liberty／UA／Solid State → 退**，母體寫進缺口表。
- **(丙) 發行過、母體在真正的他廠（Concord、Owl、Palo Alto、Roost）→ 收，`year` 取他廠首發年。**
- **(丁) 母體在他廠但只是「部分／不同形狀」的 → 收，`year` 取本次完整發行年。**

**《Diz 'n Bird at Carnegie Hall》是 (丁) 的樣板**：1947 錄音／**1959 只有 A 面以 Roost LP 2234 發過
（而且那張自己就是 Compilation）**／1997 這次才完整發行。
⚠ **c-153 b 實測：列舉檔 `note` 猜的「他廠」會錯**——Jimmy McGriff《Tribute to Basie》
的母體其實是 **Solid State SS 18001**。**母體號段一律自己查。**

## 四、⚠ 研究層擋下策展層 17 處正文錯，其中一組是「兩張卡的班底被對調」

| 卡 | 策展層寫的 | 實際 |
|---|---|---|
| **Mr. Bow-Tie** | Benny Golson／Steve Turre／Herbie Hancock | **三人全不在這張碟上**（Golson 只是〈Stablemates〉的作曲者） |
| **Groove Elation!** | Eddie Harris 次中音 | **Billy Drewes**；**而 Steve Turre 其實在這張** |
| Snide Remarks | Larry Goldings 管風琴 | **Bill Carrothers 鋼琴＋Larry Grenadier 貝斯** |
| The Grand Encounter | 九位全明星是一支樂隊 | **Bobby Watson 只有〈Cherokee〉、Toots Thielemans 只有〈Besame Mucho〉** |
| **Max Roach…** | Roach 的作品 | **〈Festival Journey〉作曲 Frederick Tillis、指揮 David Epstein，Roach 只是獨奏者** |
| Marcus Printup | 沒有評介、〈Amazing Grace〉無伴奏 | **Billboard 1996-08-24 p108 有整則**；那軌是 **trumpet/piano 二重奏** |
| Further Ado | 九軌全是他與團員的曲子 | **7 首 Osby 一人、團員 0 首、另 2 首是 Ellington 與 Billie Holiday**；**九人原音編制** |
| Charlie Hunter Quartet | — | **沒有貝斯手**（八弦吉他兼低音） |
| Eyes... in the Back of Your Head | — | **沒有貝斯也沒有鼓**；Ornette Coleman 只在 2 軌 |

⚠ **前兩張的錯是「對調」的——Steve Turre 與 Eddie Harris 各自被放到對方的碟上。**
**這是「策展層不只會多寫人，還會把兩張卡的班底互換」的第一例。**
另補回兩處漏人，其中**《Ancestors》的鼓手 Al Foster 被 Discogs 兩筆條目同時漏掉**
——**「盤面來源反而漏人」的第一例。**

## 五、⚠ 紙本：「零命中」在這一批被推翻兩次

- **Denise Jannah**：策展層**只查目錄號 `33390`**判零命中；**改查人名就有 Billboard 1995-01-21 p8＋p74
  的整篇簽約報導**——Lundvall 1995-01-04 在荷蘭簽下、「late February in New York」開錄、
  **Benelux 先發、美加 8–9 月才發**。
- **Scofield**：漏查的原因是 **OCR 把目錄號打成 `28012`**。
- **Geri Allen**：第 1234 條說它「紙本完全空白」，**真正原因是查錯年份——1997 年有兩則**，
  **年份因此改判 1996→1997**（五層證據對上 MB frd 一項）。

⚠ **第 1245 條定死：查紙本一律「目錄號 ＋ 人名 ＋ 盤名」三種字串都掃，任何一種零命中都不算數。**

## 六、⚠ 載體：這一段「CD 為主」在本批有六個例外

| 卡 | 例外 |
|---|---|
| Live at Club Mozambique | **同期就有雙片黑膠**（Billboard 1995-04-08 p67 廣告逐字 `(TWO LPs)`） |
| New Moon Daughter | **黑膠是 Blue Note 外包給發燒廠 Classic Records** |
| Memphis To New York Spirit | **CD 8 軌／黑膠 5 軌，而且來自兩場不同 session**（兩場都沒有貝斯手） |
| I Don't Care Who Knows It | **黑膠 6 軌、CD 才完整**（CD 內頁那句「Tracks 8-11 only」漏了〈Horn In〉） |
| Live at the "It Club" | **黑膠 5 軌**（CD 內頁逐字「Tracks 3, 7 and 8 appear on CD only」） |
| Live at the Village Vanguard | **1985 原盤本身就是雙片黑膠**（Owl／`GW-3006`） |

## 七、撞陳列

- ⚠ **《Live at the "It Club"》**：**《Volume 2》（2000，Blue Note 7243 5 23997 2 7）是同一晚（1970-03-06）
  的另外九軌，與本卡 0 重疊**——**「同一場錄音被拆成兩張」在本線的第一例；日後若收 Vol. 2 兩卡必須互指。**
- **Duke Pearson 三張同場不同曲**（1970-02-13 場 ↔ c-143、1969-05-05 場 ↔ c-142），逐軌 0 重疊。
- ⚠ **盤名撞名最險的一格**：**seed 有 `Dizzy Gillespie —《Bird and Diz》(1952, Verve)`，
  與本組《Diz 'n Bird at Carnegie Hall》只差詞序。**
- ⚠ **Petrucciani《Live at the Village Vanguard》的盤名在池中有四張一字不差的同名卡**
  （`chk-prop` 折鍵不報）——**上架必須帶掛名。**
- **第 1181／1192 條第六種盲區本批命中 31 處**，逐筆確認**全是「曲名＝別張碟的卡名」、無內容重複**。

## 八、本機端待辦

1. **上傳 34 張。**
2. **封面缺 10 張**，替代來源已逐張寫在研究層 `notes`（含 release 號、圖數與 primary 尺寸）：
   ⚠ **Snide Remarks 與 Go Round 的 Discogs primary 只有 500×500，建議改用 Apple 的 `600x600bb`**
   （`1479740592`／`1479617944`，實測可用）；
   ⚠ **Acoustic Boogie 必須用美版 `12097026`（600×592），日版 `10852227` 三圖全是 secondary**；
   Different Colours `2150285`（600×583）／Max Roach `12468371`（600×594，⚠ **原壓 1110614 的 primary 只有 200×195**）／
   Duke Pearson `4398252`（600×600）／**Paul Jackson `17897173` 日版**（600×540，美版原壓 primary 只有 300×300）／
   Geri Allen `9369455`（600×600）／Norby `2568098`（507×500）／Jimmy Smith `8860234`（600×524）。
3. **試聽無來源 5 張**：Mr. Bow-Tie／Acoustic Boogie／Never Alone - Duets／
   Eyes... in the Back of Your Head／Diz 'n Bird——都跑滿第 254 條三種查法、明寫查無。
4. ⚠ **`apple-candidates.md` 在本批完全不可用**：Geri Allen 的 3 個候選與《Diz 'n Bird》的 8 個候選
   **沒有一個軌數對得上，全是錯碟**。
5. ⚠ **首發地**：**Further Ado 首發在日本**（`TOCJ-6061`，1996-07-31，比美版街頭日早六天）；
   **My Corner of the Sky 首發在丹麥／歐洲**；**Lonesome Road 只有日版、沒有美歐版。**
