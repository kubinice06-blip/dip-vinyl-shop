# c-141 交接（2026-09-16）：Blue Note／Liberty 期 1967–69，39 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

Blue Note 目錄補齊線的第七批，**1967–84 這一段的第一批**（`lineType: 深掘`）。
**Alfred Lion 1967 年離開、Liberty 接手**，之後由 **Francis Wolff／Duke Pearson** 監製的兩三年；
另有幾張 Lion 時代錄、拖到 1980／1998 才出土的 vault 盤。

**39 張、25 位掛名、零 §1 人工身分、39/39 釘住 release-group MBID、全部 Album。**

| 組 | 內容 | 張 |
|---|---|---:|
| a | 1967–68：Bobby Hutcherson、Jackie McLean、Hank Mobley、Blue Mitchell、Donald Byrd、Lee Morgan、Jack Wilson、Eddie Gale…… | 20 |
| b | 1968–69：Horace Silver、Duke Pearson、McCoy Tyner、Stanley Turrentine、Tyrone Washington、Andrew Hill、The Three Sounds、Jimmy Smith、Kenny Cox…… | 19 |

**原 slice 45 張，退 6**（理由逐筆在 `rulings.md`）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **39/39，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **39/39 全 full**，out-1 224–239／out-2 222–238 |
| 封面 | **37/39**（缺 2，替代來源見第六節） |
| 固定試聽／無來源狀態 | **39/39，無來源 0 張** |
| §5.5／§5.6 例外欄位 | **不適用**——39 張全是純 Album |
| published gate | 本機端 |

**驗證**：`qa-batch out c141` 39 張與卡單相符、全部通過；`qa-batch hooks c141`＋`chk-hook-crossgroup c141` 全過
（hook 加權 22–37、note 307–350）；`fix-spacing --field desc` 兩檔待補 0；research 兩組全 full。
**鉤子層發行年逐筆比對 39/39 相符**（1967×7、1968×24、1969×5、1980×1、1998×1）。

## 三、⚠ 年份：這批的重點是「怎麼判」，不是改了幾張

**改判 2 張**（Grass Roots 1968→**1969**、Elegant Soul 1968→**1969**），
**但撤掉了兩張先前「最弱改判」的 risk**（New and Old Gospel、Blackjack 都補到同期紙本）。

⚠ **這批立下的兩條判準，後批都在用**：
1. **Billboard 的「Best-Selling Jazz LP's」榜印「在榜第幾週」——有進榜的碟，榜位比評論欄、比新片欄都硬**
   （一張碟不可能上市隔年才以第 1 週進榜；《Blackjack》就是這樣把 Discogs 的 1967 推翻的）。
2. **目錄號↔評介週對照表 ＋ Cash Box 每年 12 月的年度唱片目錄**，可以把一張沒有自己評介的碟**夾進一個區間**
   （84299＝1969-03-08、84300＝1969-04-12、84302＝1969-05-31；1968-12-07 的年度目錄列到 BST 84292 為止）。
   ⚠ 但那是**夾擠推定不是直接證據**——**《Grass Roots》《Elegant Soul》《Ghetto Music》三張的正文都不寫上市月。**
   另：**單曲評論不能當專輯上市證據**（《Elegant Soul》唯一指向 1968 的紙本是單曲 Blue Note 1924）。

## 四、⚠ 這一段的時代實線（正文已用，本機端可核）

- **封面設計者換人**：**Reid Miles 只剩兩張**（《Andrew!!!》《Open House》，**都是 Lion 時代的庫存錄音**）；
  **Forlenza Venosa Associates 接手 9 張**；Fred Marcellino（《Time for Tyner》）、Gabor Halmos（《Lighthouse '68》）、
  Frank Gauna 美術指導（《Common Touch》）。**《!Caramba!》查不到封面 credit，正文沒寫。**
- **監製**：Alfred Lion 2（皆 vault 盤）／Francis Wolff 8／Duke Pearson 3／Richard Bock 1／Monk Higgins＋Dee Ervin 1。
  **《Heads Up!》與《'Bout Soul》監製不明，正文沒指名。**
- Cash Box 1968-11-09：Duke Pearson 當選 NARAS 紐約分會理事、接替 Bob Thiele。
  1969-09-27 的 Blue Note 三十週年報導列出當時編制（Wolff A&R、Pearson arranger and artist）。
- ⚠ **《Introducing Kenny Cox》的維基 producer 欄寫 Michael Cuscuna 是錯的**，原盤是 Duke Pearson。

## 五、⚠ 同場拆兩張（第 596 條）

**Jimmy Smith《Open House》↔《Plain Talk》（BST 84296，排在 c-142）是同一場錄音拆兩張、晚三個月上市**
（Cash Box 1969-03-22 的評介班底與《Open House》一字不差）。
**本批只收《Open House》，正文提了「另一半晚三個月才出、是另一張碟」，陣容沒有互抄。**
《The Phantom》要避開的是與同批《Introducing Duke Pearson's Big Band》**同掛名**的互撞——已分開寫。

## 六、缺的

- **封面缺 2 張**，替代來源已查好（本機上傳時用）：
  Jimmy Smith《Open House》→ Discogs 原壓 `r13057784`（4 圖，**Reid Miles 設計＋Francis Wolff 攝影**），
  或 1991 日本 BN 4269（`r5967344`）。⚠ **本張是本批唯一店面掛零、疑似從未上串流的碟。**
  Duke Pearson《Introducing Duke Pearson's Big Band》→ Discogs 原壓 `r22807073`（7 圖，gatefold），
  或 Apple `1443550883` 的封面圖。
- 試聽 **39/39，無來源 0 張**。
- ⚠ **《Easterly Winds》的 Jack Wilson 是美國爵士鋼琴家（1936–2007）**，**不是英國樂團領班 Jack Wilson（1907–2006）**
  ——正文沒寫生平，本機端若要補生平務必走 `Jack Wilson (jazz pianist)`。
- ⚠ **紙本誤植目錄號在這一段極密集**（第 591 條）：Billboard 把《Blackjack》印成 84250、
  《New and Old Gospel》印成 BLP 4252 且掛名寫「Various Artists」、《Look of Love》配成 84268；
  Blue Note 自家廣告把《Contrasts》的 84266 安給《The Gigolo》，**同一則錯誤同週登在兩刊**。
  **正文一律用卡單的號。**

## 七、下一批

- **c-135～c-141 已走完雲端段（共 267 張）**；c-142（1968–70）策展 b 在跑、c-143（1970–74）策展 a／b 在跑。
- 紙本涵蓋表在 `batch-progress/enum/SOURCES-billboard-cashbox.md`：
  **Cash Box 與 Billboard 已覆蓋到 1970 年底，1971 年起還沒有人掃。**
- ⚠ **第 312 條：1939–66 六批已跑完，該開 §5.6 子批把資料庫標 Compilation 的正典撈回來**
  ——c-142 a 又新增兩張候補（Horace Silver《The Best of Horace Silver》BST 84325、
  Edmond Hall《Celestial Express》B-6505）。
