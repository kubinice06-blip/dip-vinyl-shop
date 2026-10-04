# c-164 交接（2026-09-19）：Blue Note 2016–2020，41 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

切片 45 張，**收 41 退 4**（a 22、b 19）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **41/41 全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶；**本批 apex 0 張** |
| 固定簡介（desc） | **41 張全 full**，**193–239**，兩端都沒撞到 |
| 封面 | **40/41**（缺 1） |
| 固定試聽／無來源狀態 | ⚠ ⚠ **41/41 全部有來源、零張走無來源狀態**（其中 **3 張是人工回收**）——**本線第二批滿分** |
| §5.5／§5.6 例外欄位 | 本批無合輯，例外欄全空 |
| published gate | 本機端 |

**缺封面 1 張**：`Louis Hayes《Serenade for Horace》`。研究層給了兩條實測 200 的網址，**建議取 Discogs 那條**
（目錄號 `B002674702`／年份 2017／廠牌 Blue Note 三項都對得上，`discogs-cover-registry.json` 登錄得了）：
`https://i.discogs.com/ZtcE6FdwPos_RC3vhxz_aOyJ7CFsaVGtL4Ho_0YsmLw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExNDI2/ODk5LTE1NTgyMTU3/MjktMjI2MS5qcGVn.jpeg`
備援 Apple `1442907864`。⚠ **CAA 對 release-group `970db458` 實測 404。**

## 三、⚠ 一筆年份改判與三筆人工回收

**年份改判**：**`Rick Margitza《Hope》` 2020 → 1991。** MB 只建了 2020 數位那一筆、`frd` 被整個拉晚；
Discogs 有五筆 1991 實體（US CD `CDP7948582`、JP `TOCJ-5285` 等），Apple ℗ 逐字 `℗ 1991 Capitol Records`。
⚠ **紙本把它釘死了**：`1991-02-02` 期新片欄逐字 `RICK MARGITZA Hope CD Blue Note B2-94858 CA B4-94858`；
同期樂評欄逐字稱它是 `second solo album`；**Top Contemporary Jazz Albums 榜六期**（03-02 新進 #22 → 04-27 最高 **#11**、在榜第 9 週 → 05-11 #15）。

**人工回收三筆**（皆經第 1433 條核對）：

| 卡 | collectionId | 為什麼探測層找不到 |
|---|---|---|
| `Terence Blanchard featuring The E-Collective《Live》` | `1358522378` | 店面 `artistName` 逐字只有 `Terence Blanchard` |
| `Gregory Porter《One Night Only…》` | `1437630474` | ⚠ **決定性的是逐軌比對，不是軌數**——另兩個候選一個樂曲只有 18 首（末項是 22 分鐘訪談）、一個 us 查不到 |
| `Ambrose Akinmusire《Origami Harvest》` | `1434927808` | ⚠ ⚠ **碟在店面裡、`lookup` 十五個市場全回同一筆，但搜尋索引整個撈不到它**——**推翻策展層「極可能走 unavailable」的結論** |

## 四、⚠ 研究層推翻策展層多處

**本機不要拿策展層的 `curatorWhy` 當事實，一律以 `desc-tools/batches/research/c164-{a,b}.json` 為準。** 最重要的幾條：
- **`Ben l'Oncle Soul《Under My Skin》` 不是 big-band**——逐軌 credit 只有吉他／貝斯一人、鍵盤與程式一人、管樂一人，外加一軌低音提琴。
- **`Kyoto Jazz Sextet《Unity》` 不是致敬 Larry Young《Unity》**——三處來源都沒有指名。
- **`Thomas Dutronc《Live Is Love》` 是現場拼盤不是錄音室碟**（Apple fr 十六個軌名逐字全帶 `Live in <城鎮> / 2018`）；
  同碟〈Rocking Chair〉**不是 Hoagy Carmichael**（作曲欄逐字 `Gaby Concato` 與 `Norman Langolff`）。
- **`Tomorrow Comes The Harvest` 的黑膠與數位不是包含關係**——〈Altitudes〉只在黑膠、〈The Night Watcher〉只在數位，共有的只有三首。
- **`GoGo Penguin《Live from Studio 2》` 的曲目出處**：〈Totem〉〈Atomised〉〈F Maj Pixie〉〈Kora〉在 2020 年同名專輯、
  **〈Bardo〉在 2018 年《A Humdrum Star》**、〈Protest〉在 2016 年《Man Made Object》。
  ⚠ **〈Petit_a〉不指定出處**（掃遍全部專輯只出現在本張與 2021 年《GGP/RMX》）。
- ⚠ **`山中千尋《Utopia》` 第 7、10 兩軌的 Discogs 作曲欄是空的，全線刻意不指認作曲者**
  （研究層理由逐字：「很容易被下游填成 Bach 與武滿徹」）。**本機也不要填。**

## 五、⚠ 三筆「不做連結」的自制，本機請延續

- `Rick Margitza`：Discogs 小提琴欄的 `Richard Margitza` 與官網「父親是底特律交響樂團小提琴手」**沒有連成「他父親」**（無出處）。
- `Derrick Hodge`：第 3 軌人聲欄的三個同姓 `Hodge` **沒有寫成家人**。
- 發片稿把 `Emeli Sandé` 拼錯 → **只引名單中拼法無誤的兩位**。
**「同姓不等於親屬」「欄位空白不是邀請推測」是本線的通用自制。**

## 六、⚠ 兩件本機上架時要注意的

1. **`Ron Carter & Danny Simmons《The Brown Beatnik Tomes》` 店面沒有未消音版**——
   兩種查法掃過十五個市場，只有 `1458903206` 一個 id，`collectionExplicitness` 一律 `cleaned`。
   ⚠ **軌層逐字：第 2、6、8 軌 `cleaned`，其餘六軌 `notExplicit`——固定試聽避開那三軌。**
2. **`Art Blakey《Just Coolin'》` 的敘述已寫死區隔**：1959-03-08 Van Gelder 錄音室、當年未發，
   與 seed《At the Jazz Corner of the World》(1959-04-15 Birdland 現場) 的四首同曲**是兩次不同演出**。
   ⚠ **全批一個字都沒引那張現場盤的盤名**（逐字就是池中的卡名，不引就不撞）。

## 七、⚠ 兩處研究稿自身的問題，寫作層已處理，本機知悉即可

1. **`Charles Lloyd《8: Kindred Spirits》` 的 note 內部打架**：既寫「地點是**他家鄉的** Lobero Theatre」，
   又寫 Booker T. Jones「**同樣出身 Memphis**」。**寫作層捨去「家鄉」這個修飾**，保留「與他同樣出身 Memphis 的 Booker T. Jones」。
   **可逆，若要改回只改一個形容詞。**
2. **`Götz Alsmann《L.I.E.B.E.》` 的 note 說「十六首的作詞作曲欄全是德語流行歌的名字」，但同一條就舉出兩個反例**
   （標題曲作詞欄是 `Milt Gabler`、第 2 軌是一對巴西兄弟）。**這條概括與它自己的例子相衝突，本機若要用請先複核。**

## 八、QA 結果

- `chk-prop a b`：標記 0。
- `qa-batch research/hooks/out c164`：**三層全清**（out **零 `互指?`、零 `未具名出處?`**）。
- `chk-hook-crossgroup c164`：**41 張跨組全過**，開頭四字 41 張互異。
- `qa-check-research`：兩檔各一次，**標記 0**；**hook 原封開頭 41/41**。
- `fix-spacing`：兩檔 dry-run **待補 0**，未加 `--write`。
- ⚠ **兩支寫作代理各自做了「假料校驗」**（塞假年份與假專名確認檢查器會印、再還原），**確認零標記是真的零。**
