# add-20261106-md45 裁定（情緒薄格線・頹靡：Bandcamp downtempo「有鼓」名單第三輪 md45）

> 背景、判準同 `batch-progress/add-20261106-md44/rulings.md` 檔頭（店主 11-06「全都上架吧」；只汰攻擊性鼓與舞池推進，判暖判輕不汰）。卡單 `batch-progress/bandcamp-dt-20261105/pick-md45.json`（47 張）即策展結果。
> 流程：卡單 47 → 主線初篩 → `curation-md45.json`（28）→ `master-md45.json`（MB 釘住 28）→ `build-cards.mjs` → 研究 a 10、b 9（新查）、c 9（沿用前兩輪研究稿，補鼓型）。
> **預留：研究 a 25081–25090、b 25091–25100、c 25101–25110、鉤子 25111–25120、寫作 25121–25130、主線 25131–25140。**
---

## 主線初篩（不佔條號；2026-11-06）
- 身分：Bandcamp ld+json＋MB release-group 逐張比對，28 張 MB 全釘住。Cemento Atlantico《Dromomania》的 MB release-group 未標類型，Bandcamp 文案自稱 new album（8 首 39 分），照 Album 收、寫進 curatorRisk。
- 去重：`dedup-md37.mjs --file curation-md45.json` 撞 9，全是前兩輪被汰的同一張；seed／manifest／pool-removed 0 撞。
- 名稱與年份照 MB：H.U.V.A. NETWORK → **H.U.V.A. Network**、Tara Lily《Speak in the Dark》、Sneaker Pimps《Squaring the Circle》、bergsonist → **Bergsonist**、tripswitch → **Tripswitch**、Lb Honne → **lb honne**；All India Radio《A Low High》**2009**（MB 2009-05-06；卡單 2010 是 Bandcamp 日期）、Scann-Tec《Facial Memories》**2010**（Bandcamp 是 2018 重新母帶版）。
- **主線初篩汰 19**（卡單 47 → 28）：
  - 資格：Catching Flies《The Long Journey Home》（MB EP、文案自稱 EP，29 分含三個 remix／live）、Phaeleh《The Space Between Us》（MB EP）、Halou《Coco》（MB EP；文案為 2024 EP 的重混改編）、Arms and Sleepers《OF UTOPIAS AND CATASTROPHES》（文案自述四張 EP 合集）、Milieu《Butcher Block Andromeda》（十年回顧 50 軌精選）、New Composers《Astra》（1996 原盤的 2017 擴充新版，19 軌含未發表曲）、fingerspit《Many Nights a Whisper》（MB Album＋Soundtrack，遊戲原聲）、Somatoast《Creation is Creation》（10 軌中 4 首 remix；md43 Fort Road 先例）、Natural Wonder Beauty Concept（自我同名；DJ Python 與 Ana Roxanne 的俱樂部取向計畫）。
  - 舞池推進（文案或研究直述）：Lusine ICL《Iron City》（文案「dance floor rhythms」）、K-LONE《Swells》（文案「looks to deep house」）、seb wildblood《separation anxiety》（文案「structured within the realms of traditional dance music」）、Khotin《Hello World》（文案「club-friendly grooves… breezy house rhythms」）、Polygonia《Dream Horizons》（Dekmantel 文案「a full house of kinetic rhythms」「deep techno」）、Toki Fuko《Human Design》（md39 研究：RA 寫底鼓強勁、Lowless techno 廠）。
  - 同人（本線每位一張）：Puma Blue《Croak Dream》（md44 留《Holy Waters》）、Ochre《National Ignition》（md44 留《Beyond the Outer Loop》）、Jogging House《Danger》（留《Kiosk》；並行 ml74／76／77／81 另六張）、Odd Nosdam《Mirrors》（md44 留《LIF》）。
- **保留但標風險的**：Andy Leech《The Path So Far》（20 軌 92 分、盤名像回顧，研究層查是不是合輯）、lb honne（Deep House 標籤）、Plant43（作者本行 Tresor 舞池 electro）、Bergsonist（Optimo、曲名〈La Rave〉）、Filmmaker（darkwave／EBM 攻擊性）、DIM（trance 標籤、dungeon synth 廠）。逐張寫在卡單 `curatorRisk`。
