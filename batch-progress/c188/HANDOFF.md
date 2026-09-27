# c-188 交接（2026-09-27）：**日本爵士獨立廠牌線 jp-2 第六批**，1981–1983，23 張

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端依 `REMOTE_RUNBOOK.md`
**不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、38 張提案收 24 退 14，⚠ **研究層收件後主線撤 1 張，最終 23 張（61%）**

**a 組 19 收 12 退 7**（演奏主體／乙過半 4、⑤ 款 3、`Marlene` 四項 2/4 兩張、撞池 1、原壓美國 Arista 1）；
**b 組 19 收 12 退 7**（撞池 2——含池中 **apex:pearl**《Watarase》的和文等價形、原壓 `Better Days` 的合輯 1、曲風／演奏主體 4）。

⚠ ⚠ **撤掉的那一張是 `小林泉美《夏・Nuts・夏》`**（主線第 1998-B 條）：**卡單的「3/9 有詞」只建立在 MB 對部分軌建的 work 上**，
**ja 維基與 Tower 2021 年版逐軌 credits 兩個獨立來源一致給出五軌有詞 → 乙 5/9 > 一半 → 第 5701 條第三肢不成立。**
**同一位的《Coconuts High》4/8 維持收**（同一把尺、數字不同）。卡單、`prop-b.json`、研究稿都已同步移除。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **23/23 全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶；**本批 apex 0 張** |
| 固定簡介（desc） | **22 張 full（211–236）＋ 1 張 thin（178，`South Wind Section`）** |
| 封面 | **21/23**（缺 `Carnival`／`Esprit`） |
| 固定試聽／無來源狀態 | **15/23**，**8 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 例外欄全空 |
| published gate | 本機端 |

⚠ ⚠ **無來源 8 張裡有 2 張是主線從「誤命中」降級來的**：
**`日野皓正《Pyramid》` → Apple 的 `PYRAMID《Pyramid》2026`**（第 1997-B 條：藝人名剛好等於我們的盤名）、
**`池田芳夫 & 高瀬アキ《Esprit》` → 高瀬アキ 1978 King《AKI》**（第 1998-B 條：同一位的另一張、年份接近——任何年份門檻都擋不到）。
**ready 15 張裡 1 張是人工回撈救回的**（`辛島文雄トリオ《Elegant Evening》`，Apple 把五軌 LP 標成 `- EP`）。

## 三、⚠ 本機審稿要盯的八件事

1. ⚠ ⚠ **`NANIWA EXPRESS` 的掛名是主線統一的**（第 1992-B／1993-B 條）：本批兩張的策展層原本都立 `浪花エキスプレス`，**MB 實體 `Naniwa Express`、同團四張卡的盤面與 Apple 都是全大寫形 → 統一成 `NANIWA EXPRESS`**，和文形進 `queryAlias`。
2. ⚠ ⚠ **`板橋文夫《渡良瀬》` 撞的是池中 apex:pearl《Watarase》**——已退，並已登記 `known-pool-collisions.json`；**撞池比對現在會讀 `titleCheck.titlesSeen`**。
3. ⚠ **`菊地雅章《One-Way Traveller》` 與池中 seed《Susto》是同一批錄音拆成的兩張 LP、曲目零重疊**——**seed《Susto》那張的正文要補一句指回這張（本機做）。**
4. ⚠ **`Casiopea《4×4》` 的〈Galactic Funk〉是 c-187《Cross Point》同名曲的重錄**；**《Photographs》〈Out Drive〉作曲者（Discogs 寫 Sadao Watanabe）只剩 JASRAC 一個動作可查——正文整格不寫。**
5. ⚠ **`渡辺香津美《Ganaesia》` 掛名是人名**（c-178 b 先例）、jp-1 當年以四大廠硬門退過；**DOMO 在本線十五家內。**
6. ⚠ **`The Players《Space Travel》` 與池中 `The Players Featuring 鈴木宏昌` 並存**；`松風鉱一` 與池中 `Koichi Matsukaze Trio` 並存（第 964／196／197 條）。
7. ⚠ **`NANIWA EXPRESS《大宇宙無限力神》` 的正文寫了羅馬字盤名 `Daiuchuhmugenryokushin`**——**那是 hook 的主軸（「羅馬字盤名連成一串」），是「正文不提自己的盤名」的唯一例外，照准**（主線第 2001-B 條）；漢字盤名全文零次。
8. ⚠ **`South Wind Section` 是 thin（十條 facts 全出自盤面，樂團背景查不到）**。

## 四、雲端已做完的驗證（我自己重跑的，不是照抄代理報告）

- `chk-prop a b` 標記 0、**全池 `dedup-crossbatch`（154 批）四道 0**。
- `qa-batch research/hooks/out c188` 三階段全過；`chk-hook-crossgroup c188` 全過。
- `qa-check-research` 兩組標記 0；`fix-spacing` 兩檔待補 0。
- **鉤子預算 205–229（23/23 ≤230）與 desc 字數都是我自己逐筆重算的**；**首句照抄 hook 23/23、`key` 逐字同序。**
- **跨兩組 23 張 ＋ 已上架 c-187 的 4-gram 我自己重掃**：**本批內 ≥3 張 0 條；連 c-187 一起算只有 3 條，全是專名與樂器名**（`高中正義`／`久米大作`／`薩克斯風`）；片假名 0 條。

## 五、裁定條號

`batch-progress/c188/rulings.md`：策展 6406–6435（a）／6436–6465（b）、研究 6776–6792（a）／6806–6816（b）、
鉤子 6966–6985（一人做完兩組）、寫作 7006–7015（a）／7021–7029（b）。**預留未用的號（6793–6805 等）不再配出。**
