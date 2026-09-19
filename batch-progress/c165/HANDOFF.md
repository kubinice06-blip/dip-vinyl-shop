# c-165 交接（2026-09-19）：Blue Note 2020–2021，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

切片 45 張，**收 45 退 0**（a 23／b 22）。策展層兩組零退件。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **45/45 全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶；**本批 apex 0 張** |
| 固定簡介（desc） | **45/45 全 full**，字數 **181–234**（base 區間 180–240，兩端都沒撞到） |
| 封面 | **44/45**（全部走 CAA release-group 層；缺 1） |
| 固定試聽／無來源狀態 | ⚠ **45/45 全部有來源——本線第三個滿批，而且是零回撈達成的** |
| §5.5／§5.6 例外欄位 | 本批無合輯、無現場盤，例外欄全空 |
| published gate | 本機端 |

**缺封面的 1 張**：`Trijntje Oosterhuis《Wonderful Christmastime》`（CAA release-group 層 404）。

## 三、⚠ 本機審稿要盯的三件事

1. **`Ronnie Foster《Reboot》` 的廠牌線素材是「被鉤子層整格捨去」的，不是漏寫。**
   它與 a 組 `Joe Chambers《Samba de Maracatu》` **形狀逐格相同**
   （在該廠牌當側手 → 被 Francis Wolff 注意到 → 自己的領班作 → 長期空白 → 回來）
   ——**是真同構，不是題材相近**。正文改走取樣那條。**本機若要補回，等於把同構放回去。**
2. **三張帶「辭世」素材的卡寫成三種不同句型**（`Norah Jones《…'Til We Meet Again》` 場地時序／
   `Tony Allen《There Is No End》` 身後之作／`Lonnie Smith《Breathe》` 黑膠載體時序），
   **b 組另有五張帶逝者素材，四張整格捨去、`Passage` 改寫成正面的題獻父親**
   ——⚠ **其中 `Reboot` 捨掉是因為 Dr. Lonnie Smith 正是 a 組《Breathe》的主角**，寫進去會製造真正的跨組互指。
3. **`Nduduzo Makhathini《In the Spirit of Ntu》` 拿的是「新（副）廠牌的開張作」這條骨架**
   ——全批只有它走廠牌敘事的「開張」面向，`Joe Chambers` 走「回歸」面向，**分界是「主詞是誰」**
   （回歸的主詞是樂手、開張的主詞是廠牌）。**掃完全批有十一張帶廠牌素材，其餘九張一句不寫。**

## 四、⚠ 寫作層依 base 檔駁回派工信的四處（值得本機知道）

**writer-1 逐條核對後駁回了主線派工信的三處**，`writer-base.md` 原文勝出：

1. **「字元預算 209–230」是鉤子層對 `note` 的預算，不是 `desc` 的區間。**
   **desc 以 base 第 205 行的 180–240 為準**，成品 189–219。
2. **「你不需要為了字數刪掉 `note` 要求的東西」與 base 第 159 行「不得重述 hook 已說過的話」在四張卡上直接衝突**
   （第 11／14／15／18 張的 `note` 各有一句與 hook 同構）——**依 base 刪除**（裁定 2072–2075）。
3. **base 的「爵士批次專名壓到 3 個以內」與 `note` 的指名清單衝突**（第 16 張五位、第 7 張三位作曲者）
   ——**依 base 第 161 行「`note` 逐條照辦」照寫**，實測 189／212 都在區間內（裁定 2078）。

**writer-2 另有一處破例**：**`Greg Tardy《Four》` 補寫了「沒有貝斯手」**
（研究稿指出該盤名與四張 seed 卡折鍵同鍵、機器不會報，需要辨識點；來源在 `facts`，但不在 `note` 列項內）。
**本機若要嚴守 `note`，刪掉「而且沒有貝斯手——」七字即可，字數仍落 185**（裁定 2108）。

## 五、⚠ 兩件流程事故（都已修復，但本機要知道）

1. **`batch-progress/c165/rulings.md` 一度被覆寫清空。**
   派工信寫「裁定 append 進 `batch-progress/c165/rulings.md`」**沒說相對哪個目錄**，
   而寫作層的工作目錄是 `desc-tools`：**writer-2 照字面寫到了 `desc-tools/batch-progress/` 底下**（已由主線併回並移除該目錄），
   **writer-1 寫對了檔案但用了覆寫而非追加，一度把 1704 行清掉**——已用 `git show` 取回並重新 append。
   **現況：1900–2114 條連續、完整。** ⚠ **檢查點提交 `13543c5` 收走的是殘缺版本（只有 124 行），不可當底本；`5eba01b` 之後才是對的。**
   → **派工模板已改：路徑一律寫成 repo 根相對，並明說「append，不要覆寫」。**
2. **「筆數對了」不等於「定稿了」**（第 1803-B 條，本線第三次）：
   `c165-hooks-b.json` 的檢查點版本已經是 22 筆、肉眼像完成品，**但之後 11 張還有異動**，
   七處事實更正在那個版本裡都還是錯的。

## 六、產物清單

```
desc-tools/batches/cards/c165-cards.json          45 張卡單
desc-tools/batches/research/c165-{a,b}.json       研究層
desc-tools/batches/hooks/c165-hooks-{a,b}.json    鉤子層（23／22）
desc-tools/batches/input/c165-writer-{1,2}.json   merge 產物
desc-tools/batches/output/c165-out-{1,2}.json     寫作層（23／22）
batch-progress/c165/{prop-a,prop-b,slice,caa,apple-candidates,chk-prop}
batch-progress/c165/rulings.md                    第 1900–2114 條（策展／研究／鉤子／寫作四層）
batch-progress/memory-entries/c165-pipeline.md    備忘錄條目
batch-progress/probe/previews.json                串流 45/45
```
