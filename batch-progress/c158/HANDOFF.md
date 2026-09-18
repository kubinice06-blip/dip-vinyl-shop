# c-158 交接（2026-09-18）：Blue Note 2001–2004，37 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

切片 45 張，**收 37 退 8**（退貨率 17.8%）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **37/37 全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶；**本批 apex 0 張** |
| 固定簡介（desc） | **37/37 全 full**，out-1 218–239／out-2 211–238 |
| 封面 | **29/37**（缺 8，替代來源 8/8 全部查實且目視核過版式） |
| 固定試聽／無來源狀態 | **32/37 有來源**，**5 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 本批無合輯，例外欄全空 |
| published gate | 本機端 |

**5 張走固定無來源狀態**：Ron Carter《The Golden Striker》／Flavio Boltro《40°》／
Martial Solal《NY-1, Live At The Village Vanguard》／Dianne Reeves《A Little Moonlight》／
Renee Rosnes and the Danish Radio Big Band 同名盤。**五張都是逐市場實查後的確定結論**
（Golden Striker 跑了 90 次查詢、Reeves 那張在 22 個市場形狀一致）。

## 三、⚠ 這一批最重要的一條（第 1560-Y／AB 條）：殘留跑進 `facts` 欄了

前一批（c-157）抓到的欄位殘留都在 `sound`／`keyTracks`／`hookCandidates`。
**這一批有兩處直接殘留在 `facts`，而且都帶著合法的 `src`**：

- **Stefon Harris `facts[5]`**：末句逐字「**本碟替他拿下**林肯中心 Martin E. Segal 獎」
  ——該獎制度上頒給藝術家不是唱片，且只有單一來源。**已就地改寫成「他在這段時期拿下」＋標 uncertain。**
- **Paul Jackson, Jr. `facts[4]`**：整條帶著 Michael Jackson／Whitney Houston 等錄音室資歷名單。
  **已就地加註第 1560-E 條的邊界**（名單只供本機查核）。

⚠⚠ **一條帶 `src` 的 `facts` 裡，前半是真的、末句是錯的。**
**下游代理照規矩「只寫 facts 裡有 src 的東西」，照樣會寫出錯的獎項。**
**`src` 保證的是「這句話有出處」，不保證「每個子句都成立」，更不保證出處本身沒錯。**

**另一種形狀同樣沒有任何檢查擋得住**（第 1560-AB／AK 條，本批兩例）：
**`facts` 的一條裡，標題的數字與它自己列出的清單對不上**
（Rosnes「八軌裡六首是她自己寫的」實際列五首；Blanchard「四首出自團員之手」實際列三首）。
**→ 本機審稿時請對 `c158-b.json` 的所有數字再掃一遍**（兩例都出自同一位研究代理，不是隨機錯誤）。

## 四、⚠ 獎項：策展層 37 張一張都沒查，研究層逐項分清（第 1560-Q 條）

**一項得獎、五項入圍未得**，其中**最乾淨的一組對照在同一批裡**：
**Dianne Reeves《A Little Moonlight》是第 46 屆葛萊美最佳爵士人聲專輯得獎作，
而 Kurt Elling《Man in the Air》同屆同獎入圍未得——打敗他的就是同組的 Reeves。**
另四項入圍未得：Pat Martino 兩項、Van Morrison、Bill Charlap Trio。
⚠ **Reeves《Christmas Time Is Here》沒有入圍也沒得獎**，note 已明寫獎項歸《A Little Moonlight》，防止順手加獎。

## 五、⚠ 載體：策展層漏了四筆同期黑膠（黑膠店的卡）

**Cassandra Wilson《Glamoured》2003 年歐版雙 LP**（`7243 5 81860 1 7`，**原盤黑膠其實存在**，
策展層只提了 2019 Tone Poet）／**Erik Truffaz 2003 年歐版雙 LP**／
**Marc Moulin 2004 年英歐版與美版雙 LP 各一**／**Nicola Conte 2004-11-01 的 Schema 雙 LP `SCLP 386`**
（⚠ **不同廠牌，正文已寫明**）。**其餘 14 張確實只有 CD。**

## 六、本機接手時要注意的

1. **通論帳本讀不到**（`desc-restyle/progress.json` 不在版控內）——跨批次的通論重複請在逐張審稿時把關。
2. **`collectionId` 全卡池唯一性檢查**（c-156 第 1433 條的建議，本批同樣適用）。
3. **封面兩處要注意**：**Ron Carter《The Golden Striker》的 CAA 圖是俄版 Gala Records 壓片**
   （左下角西里爾字母貼紙、右下角 `Copy Controlled`）——**已改用 Discogs 美版 2106943**；
   **Boltro《40°》取法國宣傳盤 8203794 的第一張 secondary 並裁切**（零售盤那張貼著義大利雜誌黃貼紙）。
   ⚠ **兩張 Greg Osby 的封面是完全不同的圖，不可互套**；**《Public》的圖用 `2659012`、編制要用 `22033726`**（同一張碟兩筆）。
4. **本檔自己有三處紙本頁碼已訂正**（第 1560-O 條）：Osby《Public》的評介在 `BB-2004-06-12` p33、
   Miles《Birdland 1951》的在 `BB-2004-01-31` p32。
5. ⚠ **`BB-2004-05-22.pdf` 是兩期合訂**——**低頁碼（p31）屬 5/22，p115 以後屬 2004-10-23，分界約在 p73。**

## 七、產物清單

```
desc-tools/batches/cards/c158-cards.json          37 張卡單
desc-tools/batches/research/c158-{a,b}.json       研究層（主線已就地標註過 facts 邊界）
desc-tools/batches/hooks/c158-hooks-{a,b}.json    鉤子層
desc-tools/batches/input/c158-writer-{1,2}.json   merge 產物（19／18）
desc-tools/batches/output/c158-out-{1,2}.json     寫作層（19／18）
batch-progress/c158/{prop-a,prop-b,slice,caa,apple-candidates}.json/md
batch-progress/c158/rulings.md                    第 1538–1560-AL 條
batch-progress/memory-entries/c158-pipeline.md    備忘錄條目
```
