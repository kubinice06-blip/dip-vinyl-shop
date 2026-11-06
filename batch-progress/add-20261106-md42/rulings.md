# add-20261106-md42 裁定（情緒薄格策展線・頹靡 Bandcamp downtempo 候選第二輪）

> 店主 2026-11-06「繼續」：第一輪（ml68–70、md39–41）後，剩下靠近邊界的 612 張先照第一輪教訓過濾掉舞池節拍標籤等 → 232 張，切成 ml71／ml72／ml73、md42／md43，三個工作階段並行（本工作階段 ml73＋md42；另兩個做 ml71＋ml72、md43）。來源見 `batch-progress/bandcamp-dt-20261105/README.md`；卡單 `pick-md42.json`（39 張）。**卡單即策展結果**，不派策展代理；主線組 `curation-md42.json` → `build-master.mjs md42` → `master-md42.json` → 卡單。評分照 10-23 店主「體感標準」。目標格：**頹靡＝靜＋重＋冷，邊距 x≤2.7、y≥0.8、z≤−0.3**。
> 本批卡單：`desc-tools/batches/cards/add-20261106-md42-cards.json`（23 張；研究 a 5、b 5、c 5、d 5、e 3）。身分：MB 釘住 23、§1 人工 0。
> **預留：研究 a 24201–24210、b 24211–24220、c 24221–24230、d 24231–24240、e 24241–24250、鉤子 24251–24260、寫作 24261–24270、主線 24271–24280。**
---

## 主線策展（不佔條號；2026-11-06）
- 卡單 39 張：去重（`dupchk.mjs`：seed、所有 manifest、`data/pool-removed.json`、所有 curation）撞池 0；撞到舊提名 0。卡單 moodGuess 是只看 Bandcamp 標籤的粗估、多半 low／mid 把握、而且本輪靠近邊界，**聲音交研究層判**。
- 同藝人上限：並行三個工作階段的卡單（ml71／ml72／md43）與第一輪卡單一起查同藝人，凡池中已 ≥2 張或並行卡單另有 ≥2 張者，本線最多收一張；同一位藝人在 ml73 與 md42 兩批也合計不超過兩張。
- MB 逐張回查（search → release-group → releases 的曲數、日期、廠牌）＋ Bandcamp 頁 `ld+json`（Bandcamp 自訂網域的 9 張頁面被網路政策擋，交研究層用 WebFetch 補）。名稱照 MB 正規名（christ.；blue shift emissions→Christ.《Blue Shift Emissions》、AES DANA→AES Dana《Perimeters》、CONNECT.OHM→Connect.Ohm《9980》、MIKTEK→Miktek《Elsewhere》、Electronique Noire→Eivind Aarset《Électronique noire》、CELL→Cell《Onwards System》、STRANGE ATTRACTOR→Strange Attractor《Everything Is Closer》）；池中已有的藝人照池中寫法。年份照 MB first-release-date（Connect.Ohm《9980》2012、Eivind Aarset《Électronique noire》1998）。
- **主線汰 16**：
  - Frakkur《2000 - 2004》：年份合集（24 軌 109 分，2000–2004 作品整理）
  - emptyself《Emptyself》：自我同名（ALBUM_ONBOARDING 去重第四道）
  - The Secret Meeting《Ultrashiver》：粗估 x 2.8 出邊距、工業 trip-hop 重拍
  - ACT NOIR《Automatisme Psychique》：粗估 x 2.8 出邊距、冷鼓推進
  - Filmmaker《Grim Encoders》：粗估 x 2.8 出邊距、機械拍
  - AES DANA《(a) period.》：同人超量：AES DANA 本工作階段收《Leylines》《Perimeters》兩張
  - Ascendant《Source Transmission》：同人超量：池中 1，本線收《Æthereal Code》《Particle Horizon》兩張
  - Ascendant《Meridian [EX]》：池中《Meridian》的擴充版，重複
  - christ.《distance lends enchantment to the view》：同人超量：池中 1，本線收《blue shift emissions》一張
  - Nym《Edge City》：同人超量：本工作階段收 ml73《Lilac Chaser》，並行三批另有 5 張
  - State Azure《Outlines》：同人超量：池中 2、並行 4，本線只收《Stellar Descent》
  - Kaya Project《Defiance》：同人超量＋先例：池中 3 張全判暖落恍惚
  - All India Radio《Tranquil Motion》：同人超量：並行 md43 3 張、第一輪 md39／md40 7 張；144 分鐘長度可疑
  - 36《Threewave》：30 軌 104 分鐘，Threewave 系列合編，非單張專輯
  - Era《Era 2》：Era 是 Gregorian 合唱＋搖滾鼓與舞曲拍的史詩 new age 流行，旋律明確（判暖判躁），不合頹靡
  - MIKTEK《Hereafter》：同人超量：Miktek 本線只收《Elsewhere》
