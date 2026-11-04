# Beyond《再見理想》升傳奇＋設流亡（2026-11-04）

- 店主：「再見理想升級到傳奇呢」→ 三軸 4/4/3 → 5/5/3（PR #355）。
- 店主：「好，直接上流亡，經典度維持」→ tier `pearl`。硬條件：Last.fm listeners 206（worker `/album-rating`）、冷門度 5、非錯配；Beyond 在流亡原本 0 張。
- 寫入：seed 第 9 欄 `pearl`；Firestore `card_catalog/beyond|再見理想` tier=pearl、apex=true（PATCH 200、讀回一致）；album_overrides 待本機「依卡池同步頂點旗標」。
- 簡介照 `apex-desc-base.md` 流亡寫法重寫（249 字），KV `desc2:`／`desc4:beyond|再見理想` 都寫（PUT 200、逐字回讀一致、前台 X-Cache KV-HIT-RESTYLED）。舊值存 `kv-before.json`。
- 出處（只記這裡）：自資租錄音室、寄賣、包辦包裝到配唱、因此簽陳健添 ← 新浪／羊城晚報回顧 https://ent.sina.cn/music/ygangtai/2013-06-07/detail-icesifvx3722480.d.html 、ourchinastory https://www.ourchinastory.com/zh/12101 ；1986 年 3 月、劉志遠、曲目長度、混音、〈舊日的足跡〉現場版、日後重編 ← 舊簡介研究稿（沿用）。
