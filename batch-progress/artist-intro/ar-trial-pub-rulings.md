# ar-trial-pub 第三輪試做紀錄（2026-09-29）

店主核可「只帶上線簡介、完全不帶研究稿事實」再試一輪（`artist-extract.mjs --published-only`），
量單價能否再降、抓錯能力是否不變。寫作規格照最初版不變。

## 名單

| 藝人 | 分級 | 主類型 | 上線簡介篇數 |
|---|---|---|---:|
| 林強 | A | electronic | 8 |
| Public Enemy | A | hiphop | 1（卡池 6 張） |
| 108 | B | rock | 4 |
| Ali Akbar Khan | B | world | 4 |
| Brother Joe May | C | soul | 2 |
| くるり | C | rock（日文名） | 2 |
| Adriano Correia de Oliveira | D | folk | 1 |
| Academy of St Martin in the Fields Chamber Ensemble | D | classical | 1 |
| 델리스파이스 | B | rock（諺文名） | 3 |
| Willie Dixon | B | blues | 4 |

原本挑到的嘻哈 A 級是 Ray Charles——他有三張卡主類型錯標成 hiphop（見 ar-trial-mix-rulings.md 附錄），改挑 Public Enemy。

## 結果

- 十位成品：九位 full（216–246 字）、一位 thin（Academy of St Martin in the Fields Chamber Ensemble 143 字）。機器 QA 0 處。
- **主線審稿修兩處**：
  1. **林強**「第 38 屆得獎…第 55 屆再度得獎」：兩座金馬都是與人共同得獎（黃凱宇、許志遠），原句讀起來像獨得。改「兩度與人共同得獎」。
  2. **108**「1993 年起由 Rob Fish 擔任主唱」：年份只有 MusicBrainz 單一來源，屬成員異動年份。拿掉年份。
- 研究稿裡另有一條親屬關係錯誤：Ali Akbar Khan 的 facts 寫「Ravi Shankar 推薦身為姊夫的 Khan」，
  實際是 Shankar 娶了 Khan 的妹妹 Annapurna Devi。寫作層發現後沒寫進正文。

## 三輪比較

| | 第一輪 jazz（整包事實庫） | 第二輪 mix（`--lean`） | 第三輪 pub（`--published-only`） |
|---|---:|---:|---:|
| 補洞兩組 token | 約 34.9 萬 | **約 23.9 萬** | 約 26.5 萬 |
| 寫作 token | 約 11.5 萬 | 約 11.1 萬 | 約 10.8 萬 |
| **每位合計** | 約 4.6 萬 | **約 3.5 萬** | 約 3.7 萬 |
| 搜尋次數 | 36 | **33** | 54 |
| 搜尋超過每位上限 4 次 | 0 位 | 1 位 | 5 位 |
| 抓到已上線簡介的問題 | 3 | 3 | 約 13 |
| 主線審稿修正 | 2 | 2 | 2 |

**結論：量產採第二輪的 `--lean`。**

- 研究稿事實整份拿掉，搜尋多了六成、補洞 token 反而多一成：生卒年、成軍年這類要兩個來源的事實，
  研究稿裡常已有一個，拿掉就得從零湊兩個。
- 抓錯能力沒變差（第三輪抓到最多，主因是這批藝人的上線簡介本來就問題多），
  而且 `--lean` 同樣帶著全部上線簡介，抓錯能力不會輸。

## 已上線簡介的問題（第三輪新增，交本機）

| 卡 | 上線簡介寫法 | 問題 |
|---|---|---|
| Ali Akbar Khan《Music of India: Morning and Evening Ragas》 | 「史上第一張印度古典音樂 LP」 | 英文維基藝人條只寫「在西方發行的第一張」，應收斂 |
| 108《Curse of Instinct》 | 「名下兩張 EP」 | 維基列三張、MusicBrainz 兩張，口徑不一，建議不寫張數 |
| Brother Joe May《The Master's On Our Side》 | A5、A6「他最擅長的敘事型唱段」 | 找不到來源 |
| 林強《春風少年兄》 | 發行 Pony Canyon Taiwan | 中文維基寫波麗佳音，未能判定是否同一公司 |
| Academy of St Martin in the Fields Chamber Ensemble《Mendelssohn: Octet…》 | 「當初成立就是為了演這一首八重奏」 | 只有搜尋摘要單一來源 |
| 同上 | 「母團 1958 年由 Neville Marriner 創立」 | 英文維基記 1959 年、與 John Churchill 共同創立，兩源不一 |
| 同上 | 母團「不設指揮、由第一小提琴帶領」 | Marriner 1970 年秋天起已改站指揮台，只能算早期做法 |
| Willie Dixon《Hidden Charms》 | 「唯一一座葛萊美」 | 未能證實 |
| Willie Dixon《Hidden Charms》vs《Catalyst》 | 「1948 年起長駐 Chess」vs「1951 年起專職員工」 | 兩張互相矛盾，英文維基為 1948 簽約、1951 年已是專職員工 |
| Willie Dixon《I Am the Blues》 | 「1986 年入選藍調名人堂」 | 1986 年入選的是這張專輯，他本人是 1980 年首屆；主詞有歧義 |
| Willie Dixon《Willie's Blues》 | 「首張個人專輯」 | 單一來源 |
| くるり《儚くも美しき12の変奏》 | 「現行編制兩人」 | 2023 年森信行回歸錄音，已過時 |

三輪累計約 19 筆，全部待本機改 KV。

## 店主裁定：寫作方向改定（2026-09-29）

店主看過預覽：「現在的介紹都在講他幾年在那幹嘛，很無聊。應該更著重在他的身世、音樂貢獻等等，
不然看完介紹看不出鄧麗君是台灣最有影響力的歌手。」

- **鄧麗君改寫**（248 字，主線直接讀中英文維基原文查證）：外省軍人家庭與眷村、父母的京劇與黃梅調 →
  11 歲黃梅調比賽冠軍、14 歲休學走唱、軍中情人 → 民謠小調的婉轉唱進國語流行歌、日本走紅 →
  翻錄卡帶流進中國大陸、靡靡之音、「白天聽老鄧，晚上聽小鄧」→ 覆蓋國旗、葬禮僅次於蔣中正、王菲與周杰倫受其影響、
  「華語世界最具文化份量的人物之一」（英文維基首段 most culturally significant figures）。
- **規格改定**：`artist-writer-base.md`「寫什麼」重寫；`artist-gap-base.md` 三格改 `origin`／`sound`／`legacy`；
  `qa-artist.mjs out` 加反流水帳檢查（年份 >4 個、連兩句以某年開頭），`gap` 新舊格式都認。
- **其餘 29 篇試做稿是舊方向**，新檢查掃出 26 處流水帳，不上線；要用就照新規格重跑（補洞層要補查 legacy 格）。

## 店主裁定：用語與字數（2026-09-29）

- **稱中國一律寫「中國」**，不寫「中國大陸」、不以「大陸」代稱中國；**蔣中正一律寫蔣介石**。
  寫進兩條產線共用的 `prompts/writer-base.md`「文字」節；`qa-artist.mjs out` 與 `qa-batch.mjs out` 都會擋。
  既有上線專輯簡介掃出 15 處，其中 2 處是地理用法或團名不必改，13 處待本機改 KV，清單在 `audits/USAGE-CHINA-CHIANG-20260929.md`。
- **藝人介紹字數可放寬到 280**，只給份量素材真的多的藝人用；251–280 會被 QA 標出，審稿時確認是否必要。
- **鄧麗君再修**：「中國大陸」→「中國」、「蔣中正」→「蔣介石」、補上蘆洲眷村與蘆洲國小、捷運蘆洲站銅像（中英文維基兩源）。
  遷入蘆洲的年份兩源不一（1957／1959），不寫。279 字。

## 新方向改寫全部 30 篇（2026-09-29）

- 閃靈、Lee Morgan、植松伸夫、Willie Dixon、林強（ar-trial-v2）＋其餘 24 位（ar-trial-v3），加上鄧麗君，30 篇全部照「身世、音樂貢獻、影響與地位」重寫。
- v3 用量產節奏演練：補洞 4 組 × 6 位並行（約 71 萬 token，每位約 3 萬）、寫作 2 組 × 12 位（約 32 萬）；寫作第 2 組在補洞第 1 組還沒交件時先派（接力）。
- 主線審稿修 v3 兩處：Σωτηρία Μπέλλου「Tsitsanis 一聽就愛上她的嗓音」查無出處，改回「與他錄下第一批 78 轉唱片」；大支「親台」直譯改「台灣意識鮮明」。
  另判：《時代》雜誌屬新聞雜誌、講選舉中的社會角色，可具名；델리스파이스 名盤 100 第 18 名有中英兩維基，namu.wiki 的第 9 名可能是另一份榜單，照 18 名寫。
- `build-artist-intros.mjs` 改收分組成品檔（-out-1／-out-2），先前只認 -out.json 會漏掉。
