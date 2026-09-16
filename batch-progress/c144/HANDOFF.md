# c-144 交接（2026-09-16）：Blue Note BN-LA 期 1974–79，43 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

Blue Note 目錄補齊線的第十批。**George Butler 主導的 BN-LA 系列尾聲**：
fusion／disco／crossover（Donald Byrd、Bobbi Humphrey、Ronnie Laws、Earl Klugh、Noel Pointer），
**1979 年後 Blue Note 進入休眠期**。

**43 張、26 位掛名、零 §1 人工身分、43/43 釘住 release-group MBID、全部 Album。**

| 組 | 內容 | 張 |
|---|---|---:|
| a | 1974–76：Horace Silver、Moacir Santos、Bobby Hutcherson、Elvin Jones、Jimmy Witherspoon、Andrew Hill、McCoy Tyner、Jackie McLean…… | 21 |
| b | 1976–79：Earl Klugh、Ronnie Laws、Noel Pointer、Willie Bobo、Gene Harris、Robby Krieger、Art Blakey…… | 22 |

**原 slice 45 張，退 2**（Andrew Hill《One for One》的重複 RG、Betty Carter《Finally》依第 313 條退）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **43/43，全部 pinned，零 §1 人工** |
| 固定簡介（desc） | **43/43 全 full**，out-1 224–239／out-2 226–240 |
| 封面 | **34/43**（缺 9，替代圖全部查好） |
| 固定試聽／無來源狀態 | **36/43 有來源，7 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | **不適用**——43 張全是純 Album |
| published gate | 本機端 |

**驗證**：`qa-batch out c144` 43 張與卡單相符、全部通過；hooks 兩支 QA 全過（hook 加權 21–36.5、note 289–350）；
`fix-spacing` 待補 0；research 兩組全 full。**鉤子層發行年逐筆比對 43/43 相符。**

## 三、⚠ 年份：策展層與研究層都改判 0，但六張的疑議是用紙本壓下來的

**43 張的 `year` 全部維持 enum 值**——**這是查過的結果，不是沒查**。六張有疑議、全部以紙本定案：
《Silver 'n Percussion》（**維基與 Apple 標 1977 是錯年**，Discogs 原壓 ©℗1978＋Cash Box 1978-03-11 評介 → **1978**）、
《Still Can't Say Enough》（**1976-10 上市卻 1977-02 才進榜**）、《Tone Tantrum》（年不變、月取 8 月）、
《The Jackie McLean Quintet》（jazzdisco 日本頁 1976 vs 三邊 1977 → **1977**）、
《The View From the Inside》（**兩刊 310 期零紙本**，且那份 OCR 的關鍵字集本來就含 BN-LA710 與盤名）、
《Hipnosis》（GXF 3022 實測 **1978**）。**這六張的正文不寫具體上市月。**

⚠ **一張是「enum／MB 對、jazzdisco 錯」**：McCoy Tyner《Cosmos》BN-LA460-H2，jazzdisco 記 1975、**實際 1976-07**。
⚠ **進榜月不等於上市月**——這一段尤其明顯。

## 四、⚠ 這批立的三條判準（後批都在用）

1. **第 752／782 條**：**1975 年起的「Blue Note Re-Issue Series」`-H2` 不能一律退進 §5.6**
   ——同一波九套裡一半是庫存首發。**判準：只讀逐張文案，不讀標題、不看尾碼、不看 Discogs 的 format 欄。**
   （那篇報導的標題就叫「UA Reissues Blue Note Masters」，內容物五套全是 previously unreleased；
   **Discogs 也把《Hipnosis》的 format 標成 Compilation，是錯的**。）
2. **第 753 條**：**BN-LA 的號一次配一批、上市可能分兩年**——**以檔期定年，不以號段定年**。
3. **第 791／802 條**：**1977 年起主戰場是 R&B 榜**——**查榜一律 Soul 先、Jazz 次、主榜也要看**。
   ⚠ 但這是**趨勢不是規律**：**《Fever》其實爵士榜第 3**（在榜 14 週以上），
   **乾淨的例子是《Tone Tantrum》——只進 Cash Box R&B 榜、最高 47，兩刊爵士榜與主榜全零**；
   **《The Man Incognito》擺明做舞曲卻只進爵士榜**。**每一張都要自己查三榜。**

## 五、⚠ 研究層訂正前層七處

- **第 752 條寫「BB 1976-07-24 沒有評到《The Prime Element》」是錯的**——那則評介的「前五張」就含 Elvin Jones，
  原文「**have never before been released** although all were recorded in 1969 and 1973」，**那句話本身就是庫存首發的第三方背書**。
- **第 757 條把《Waters》算進「9 張進過爵士榜」是算錯的**——**1975 全年逐週掃過，一次都沒進榜**。
- **《Cheshire Cat》的 George Benson 製作了整張碟**（Discogs 原壓 credit「Producer, Backing Vocals」）。
- **《Cirrus》的〈Even Later〉是 Hutcherson 寫的**，〈Rosewood〉才是 Woody Shaw。
- **《I Am Music》的製作人只有 Roger Kellaway 一個**。
- ⚠ **第 800 條推翻 c-143 第 710 條**：**1974–76 段的美術班底是 Bob Cato（12 張以上）**，
  **Mike Salisbury 在本組 43 張的 credit 裡一次都沒出現**；Lloyd Ziff 只在 1975 年那四張。
- 另 Billboard 把《Fever》的號印成 `BN-LA628-H`（**正確是 -G**）。

## 六、⚠ 抓取端與索引的四個坑（後批要知道）

1. **紙本檔名在 1976／1977 之間換過一次邊**：**Cash Box 1976 是 `Cash-Box-YYYY-MM-DD.pdf`（`CB-` 全 404），
   1977–79 反過來只有 `CB-`**；Billboard 1976–79 一律 `Billboard%20`。
2. **第 797 條：5 期只有備援形狀能開**（`Billboard-1975-10-18.pdf`、`Cash-Box-1972-09-23` 等）
   ——**序列重試過，是真 404 不是限流**。
3. **jazzdisco 的 BN-LA 頁有切塊陷阱**：**目錄號印在每段開頭**，照「號碼結尾」切會**整頁位移一格**。
4. **OCR 裡的目錄號會被拆開**：**`LT-991` 在 OCR 裡是 `LT -991`／`LT991`**，直查回 0 筆
   ——要改查「Back to Blue Note」「Cuscuna」。

## 七、缺的

**封面缺 9 張，替代圖全部查好**（Discogs 原壓 `images[0].uri`）：
Silver 'n Brass `1002632`／Carnival of the Spirits `904801`／Spoonful `607906`／The Prime Element `1398414`；
b 組五張另在各卡 notes，⚠ **《Tomorrow Is Here》只有 336×338、《Hipnosis》只有 500×499**，各附備援條目。

**試聽 36/43，7 張走固定無來源狀態**（都跑滿三種查法、明寫查無）：
One for One／Mango Sunrise／Still Can't Say Enough／Robby Krieger & Friends／The Jackie McLean Quintet／
Live Messengers／Hipnosis。

⚠ **《Jacknife》的試聽是 2002 年單片 CD、只有 1965 那場的 5 軌（原盤 10 軌）**
——**正文與軌序一律以原盤十軌為準**。
⚠ **兩張合訂／加值版**（Earl Klugh `716200862`、Living Inside Your Love `715548856`）
**加值軌來自 1976-06-28 Roxy 那場，曲目只寫原盤**。
⚠ **兩張 Jackie McLean 在 1978 年被美國併成同一張 2LP BN-LA483-J2**
（**Discogs 把該張 format 標成 Compilation 是錯的**）。

## 八、下一批

- **c-135～c-144 ＋ c-146 ＋ c-147 已走完雲端段**；**c-145（1979–81，44 張）鉤子層在跑**。
- ⚠ **Blue Note 1985-02 才重啟，後批請由 BT 85101 接下去；1985 後的爵士段 873 張還沒切批。**
- 紙本涵蓋表在 `batch-progress/enum/SOURCES-billboard-cashbox.md`——**兩刊已覆蓋 1955→1985 中無缺口**。
