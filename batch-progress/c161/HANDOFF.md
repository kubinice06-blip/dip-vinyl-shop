# c-161 交接（2026-09-19）：Blue Note 2008–2010，37 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

切片 45 張，**收 37 退 8**（a 19、b 18）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **37/37 全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶；**本批 apex 0 張** |
| 固定簡介（desc） | **37 張全 full**，**210–239**，⚠ **兩端都沒撞到**（下限 180、上限 240） |
| 封面 | **30/37**（缺 7） |
| 固定試聽／無來源狀態 | **33/37 有來源**，**4 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 本批無合輯，例外欄全空 |
| published gate | 本機端 |

**缺封面 7 張**：Kenny Burrell《75th Birthday Bash Live!》、Eric Darius《Goin' All Out》、
Horace Silver《Live at Newport '58》、Fabrizio Bosso & Javier Girotto《Sol》、
Joe Lovano Us Five《Folk Art》、quasimode《mode of blue》、Sabrina Starke《Bags & Suitcases》。

**4 張走固定無來源狀態**：Ron Carter《Jazz & Bossa》、China Moses《This One's for Dinah》、
quasimode《daybreak》、Sabrina Starke《Bags & Suitcases》。

## 三、⚠ 本批新發現的第四種「無串流」形狀：**幽靈條目**

前三種形狀記在 c-160 交接裡（只在部分市場上架／UPC 全零但 `search` 找得到／廠牌層版權缺口）。
**c-161 撞到第四種**：條目**存在**於 be／lu 目錄，但 **0 首歌、沒有 `collectionPrice`**。
**封面可用，串流不可用。** 本機若看到這種條目不要當成可上架的串流來源。

## 四、⚠ 一筆經裁定的人工回收，本機不可改動

**Erik Truffaz《Paris》→ Apple `1841638049` 的 disc 1。**
那是三碟裝《Rendez-vous (Paris - Benares - Mexico)》，**disc 1 正是本碟完整九軌**。
`previewUrl` 已強制指向 disc 1 第一軌〈Mr Wyatt〉。
⚠ ⚠ **同一套的 Benares 與 Mexico 兩張，日後上架時絕對不可重用這個 `collectionId`**（第 1433 條）。

## 五、⚠ 事實硬錯誤：研究層推翻策展層多處，寫作層已照修正後寫

包含（但不限於）：Clarence Williams／Fleecie Moore 的作者欄、Hendrix〈Angel〉與「九軌自寫」、
Strayhorn、Bryan Ferry 的〈Don't Stop〉作曲欄、Porter 10 軌／Barber 3 軌、Darius 八軌、
Loueke 十軌裡七軌、Lovano 六軌、Dianne Reeves 弦樂六人。
**本機不要拿策展層的 `curatorWhy` 當事實，一律以 `desc-tools/batches/research/c161-{a,b}.json` 為準。**

## 六、⚠ 三處需要本機知道的規則落點

1. **`Wynton Marsalis` 那張寫了「掛自己單名在 Blue Note 的第五張」**——
   `bluenote.com` 作品表與 Billboard 逐字 `his fifth Blue Note album` 兩層都有 src，依第 1714 條放行。
2. **`Willie Nelson` 那張少寫了一條有 src 的身分敘述**（Billboard 逐字 `His solo debut album for Blue Note`）——
   派工信一刀切禁序數造成的遺漏，見主線第 1729 條。**量級小，本機不必補；記著別再犯。**
3. **`Joe Lovano《Symphonica》` 的「在 Blue Note 的第 21 張」刻意不寫**——
   維基說第 20 張、官網說 2011 年才慶祝 20-year association，**兩層對不上**（第 1620-N 條）。

## 七、QA 結果

- `chk-prop a b`：標記 0。
- `qa-batch research/hooks/out c161`：**全清**。
- `chk-hook-crossgroup c161`：37 張跨組全過（hook 加權 16–31.5、note 原始字元 316–349）。
- `qa-check-research`：兩檔各一次，**標記 0**；**hook 原封開頭 37/37**。
- `fix-spacing`：兩檔各跑一次，**待補 0**。
