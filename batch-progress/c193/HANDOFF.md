# c-193 交接（2026-09-28）：**日本爵士補遺線 hoyi 第二批**，第 4 堆（外國藝人的日本原盤）1970–1978，22 張

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端依 `REMOTE_RUNBOOK.md` **不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`）。

## 一、35 張提案收 22 退 13（63%）

**a 組 18 收 11 退 7／b 組 17 收 11 退 6**，全是第 4 堆。退件主因是「日本不是原盤」（MPS／Freedom／GMP 只建了日本版、「不明」4/4 是授權壓片）與曲目／演奏主體。
撈回兩張 jp-1／jp-2 以四項門檻退過的：`The Pentagon`、`Steve Lacy Sextet《The Wire》`（主線第 2007-B／2008-B 條）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **22/22 全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶；本批 apex 0 張 |
| 固定簡介（desc） | **22/22 全 full**，字數 **209–239** |
| 封面 | **15/22**（缺 `Purple`／`Circle 2: Gathering`／`Journey Without End`／`Methuselah`／`Love for Sale`／`Like Old Times`／`Naima`） |
| 固定試聽／無來源狀態 | **10/22 ready**（含人工回撈 2：`Sonny Rollins in Japan` 改指 jp 1000595580、`Circle 2` us 1444190276），**12 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 例外欄全空 |
| published gate | 本機端 |

## 三、⚠ 本機審稿要盯的五件事

1. ⚠ ⚠ **`McCoy Tyner《Echoes of a Friend》` 是邊界收件**：1972 日本首發早美國兩年，但 Apple 寫 `℗ 1972 Fantasy`——正文刻意不寫「日本原盤」四字（c-193 a 第 7315 條，反轉條件在該條）。
2. ⚠ ⚠ **三組跨張同掛名已分軸**（鉤子第 7667 條）：`The Great Jazz Trio` 三張（團的來歷只在《Love for Sale》、零序數）、`Mal Waldron` 三張、`Steve Lacy` 三張。
3. ⚠ **人名**：`上野勉`、`間章`（c-185 第 5909 條寫錯，`pairs` 已加）；`Stalks` 錄音師 `飯田馨`。
4. ⚠ **寫作層兩處自行裁定（可改回）**：a6 note 的「換封面再出」拿掉（封面零字）、b11 A 面寫「標題曲」不寫〈Naima〉（與盤名同字，照 c-187 第 6502 條）。
5. ⚠ **`Anthony Braxton《Four Compositions (1973)》`：MB 把一筆 Delmark 他碟數位版誤掛進本 RG**——版本數與正文都沒算它。

## 四、雲端已做完的驗證（我自己重跑的，不是照抄代理報告）

- `chk-prop a b` 標記 0；`qa-batch research/hooks/out c193` 三階段全過；`chk-hook-crossgroup c193` 全過。
- **鉤子預算 206–230（22/22 ≤230）與 desc 209–239 都是我自己逐筆重算的**；**首句照抄 hook 22/22、`key` 逐字同序。**
- 寫作兩組各自回報：`qa-check-research` 0、`fix-spacing` 0；跨批 4-gram（c-184…c-192）≥3 張只剩專名與 hook 原文。
- ⚠ **c-193 鉤子層交件時 c-192 的鉤子稿還沒落地**（順序反了）——c-192 鉤子層已被要求把 c-193 算進跨批比對，撞了改 c-192。

## 五、裁定條號

`batch-progress/c193/rulings.md`：策展 7296–7325（a）／7326–7355（b）、研究 7476–7485（a）／7506–7516（b）、
鉤子 7656–7675（一人做完兩組）、寫作 7696–7705（a）／7711–7720（b）。**預留未用的號不再配出。**
