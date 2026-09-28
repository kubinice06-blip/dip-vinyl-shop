# c-194 交接（2026-09-28）：**日本爵士補遺線 hoyi 第三批**，第 4 堆（外國藝人的日本原盤）1972–1981，24 張

**這批可以接本機上傳了**（三筆試聽降級排程中）。雲端能做的全部做完，剩下的是雲端依 `REMOTE_RUNBOOK.md` **不能做**的。

## 一、35 張提案收 24 退 11（69%）

**a 組 18 收 12**（含撈回 `Salena Jones《Stairway to the Stars》`，主線第 2009-B 條；退件五筆是美國 Abattoir／Concord Jazz／Galaxy／India Navigation、德國 Atlantic 的授權壓片）；
**b 組 17 收 12 退 5**（兩張 Salena Jones 流行翻唱、24th Street Band、Marlene、美國 Muse 授權版）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分 | **24/24 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶；本批 apex 0 張 |
| 固定簡介（desc） | **24/24 全 full**，字數 **216–240** |
| 封面 | **CAA 18/24**（缺 `Friendship`／`Meditations`／`Very R.A.R.E.`／`1 + 3`／`Heart to Heart`／`Moreover`） |
| 固定試聽／無來源狀態 | **現況 15 ready → 排程降級 3 筆（`As Time Goes By`→《AKI》、`Piano Play House`→同名合輯、`Mistral`→Nati Mistral）後 12/24** |
| §5.5／§5.6 例外欄位 | 例外欄全空 |
| published gate | 本機端 |

## 三、⚠ 本機審稿要盯的五件事

1. ⚠ ⚠ **`Salena Jones《Stairway to the Stars》` 盤面零樂手 credit——正文零個伴奏者名、零編制**；她的另一張《Melodies of Love》生平零字（分軸在鉤子第 8046 條）。
2. ⚠ ⚠ **`Mal Waldron《Meditations (Mal Waldron Live At Dug)》` 年份 1972、`live: true`**（MB 只建了再發，年份錯六年）。
3. ⚠ **人名**：打擊 `白石健二`（不是金子健二，`_entity_mislinks`）、監製 `Shoo Kaneko`、解說 `野口久光`；`Aki Takase` 正文照卡單羅馬字（寫作層第 8078 條，可逆）。
4. ⚠ **寫作層可逆的兩處**：b8 的 `heart to heart` 照 note 寫成主持人的說法（第 8095 條）；a 組《The Piano》的「一星期前」（派工信初版把兩張寫反，寫作層照 note 走，第 8079 條）。
5. ⚠ **`John Lewis & Hank Jones《Piano Play House》` 版本數 2**（Apple 那兩筆是同名 11 軌合輯）；`Aki Takase` 編制三重奏 7／二重奏 1／獨奏 6（研究推翻）。

## 四、雲端已做完的驗證（我自己重跑的）

- `chk-prop a b` 標記 0；`qa-batch research/hooks/out c194` 三階段全過；`chk-hook-crossgroup c194` 全過。
- **鉤子預算 209–230（24/24 ≤230）與 desc 216–240 自己重算**；**首句照抄 hook 24/24、`key` 逐字同序。**
- 寫作兩組各自回報 `qa-check-research` 0、`fix-spacing` 0；兩組合掃與跨批（c-188…c-193、c-195）4-gram 只剩專名與樂器名。

## 五、裁定條號

`batch-progress/c194/rulings.md`：策展 7356–7385（a）／7386–7415（b）、研究 7786–7793（a）／7816–7823（b）、鉤子 8036–8055、寫作 8076–8084（a）／8091–8102（b）。**預留未用的號不再配出。**
