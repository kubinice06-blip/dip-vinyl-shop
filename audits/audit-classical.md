# 古典音樂卡池缺口稽核（audit-classical）

- 日期：2026-08-22
- 依據：`pool-data/classical-tagged.txt`（由 seed_cards.json + data/remaining-cards.json + data/short-artist-cards.json 中 `classical` 標籤卡片抽出，共 **1,051 張**），輔以 `pool-all-keys.txt` 交叉確認。
- 卡片格式確認：主流為「演奏者 | 作曲家: 作品 | 錄音年」；另有少量「作曲家本人為 artist」的卡（年份用創作年，如 Pérotin 1200、Tallis 1569）——**時代斷層報告中「1200s-1600s 只有 3 張」是被年份欄位誤導**：早期音樂實際以錄音年入池約 20 張，斷層沒有想像中嚴重，但仍有結構性缺口（見軸線 2）。
- 總評：c-01 古典線的基本盤**遠比預期扎實**——三 B、馬勒、二十世紀、當代、華人／台灣作曲家都在資料庫水準。真正的缺口集中在：**芭蕾音樂（近乎全空）、歌劇第二圈、文藝復興複音核心作曲家、室內樂正典名作、幾個作曲家的招牌單曲**。

**總缺口估計：約 125–140 張**（必補 90 上下、強烈建議 35–50）。

---

## 軸線 1：作曲家覆蓋

### 1a. 核心圈現況
| 作曲家 | 池內張數 | 評價 |
|---|---|---|
| Bach | ~45（演奏卡） | 極佳：Gould×2、Richter 受難曲/彌撒、鈴木雅明、Gardiner、無伴奏 4 版、大提琴組曲 4 版 |
| Beethoven | ~48 | 極佳：交響曲 10+ 版（含 Kleiber、Furtwängler 1943/1951）、奏鳴曲 Schnabel/Kempff/Annie Fischer |
| Mozart | ~33 | 佳：歌劇三大齊、協奏曲厚 |
| Haydn | 11 | 中等：交響曲夠、其餘薄 |
| Schubert | 18 | 佳但缺三首正典（見 1c） |
| Brahms | 18 | 協奏曲/交響曲夠，**室內樂大洞** |
| Chopin | 16 | 佳，缺華爾滋（Lipatti）與波蘭舞曲 |
| Liszt | 8 | 中等，缺 B 小調奏鳴曲專卡 |
| Tchaikovsky | 9 | **芭蕾與歌劇全缺**（見 1c、軸線 3） |
| Mahler | 18 | 極佳（1-9 全有代表版） |
| Bruckner | 6 | 中等：4/7/8/9 有，缺 5、Te Deum |
| Sibelius | 8 | 佳（小提琴協奏曲 3 版、全集 2 套） |
| Debussy | 11 | 佳但 **Pelléas 全缺**、弦樂四重奏缺 |
| Ravel | 13 | 佳，弦樂四重奏缺 |
| Stravinsky | 5 | **偏薄**：春之祭 2 版之外幾乎沒有 |
| Shostakovich | 15 | 極佳 |
| Prokofiev | 7 | 中等：**交響曲全缺**（1「古典」、5 都沒有）|

### 1b. 第二圈現況
Mendelssohn 4／Schumann 8／Dvořák 5／Grieg 4／**Fauré 1**／Franck 6／Janáček 3／Bartók 14（極佳）／**Hindemith 1**／**Poulenc 1**。
→ Fauré、Hindemith、Poulenc 是第二圈三大災區；Janáček 缺四重奏與彌撒；Dvořák 缺室內樂與 Rusalka。

### 1c. 必補清單（作曲家正典缺口，約 45 張）

**貝多芬／舒伯特／布拉姆斯／舒曼（12）**
- Otto Klemperer | Beethoven: Fidelio | EMI 1962（池內只有 1814 作曲家卡）
- Karajan/Oistrakh/Rostropovich/Richter | Beethoven: Triple Concerto | EMI 1969
- Dietrich Fischer-Dieskau & Gerald Moore | Schubert: Schwanengesang | DG 1972
- Cortot–Thibaud–Casals | Schubert: Piano Trio no. 1 op. 99 | EMI 1926（同時補 Casals/Cortot 傳奇線）
- Sviatoslav Richter | Schubert: Wanderer Fantasy | EMI 1963
- Karl Leister & Amadeus Quartet | Brahms: Clarinet Quintet | DG 1968
- Maurizio Pollini & Quartetto Italiano | Brahms: Piano Quintet | DG 1980（兼補 Pollini）
- Josef Suk & Julius Katchen | Brahms: Violin Sonatas | Decca 1967
- Bruno Walter | Brahms: Symphony no. 2 | CBS 1960
- Kathleen Ferrier | Brahms: Alto Rhapsody | Decca 1947
- Fritz Wunderlich | Schumann: Dichterliebe | DG 1965
- Clifford Curzon & Budapest SQ | Schumann: Piano Quintet | Decca 1952

**蕭邦／李斯特／孟德爾頌（6）**
- Dinu Lipatti | Chopin: Waltzes | EMI 1950
- Arthur Rubinstein | Chopin: Polonaises | RCA 1964
- Martha Argerich | Liszt: Piano Sonata in B minor | DG 1972
- ASMF Chamber Ensemble | Mendelssohn: Octet | Philips 1978
- Otto Klemperer | Mendelssohn: A Midsummer Night's Dream | EMI 1960
- Daniel Barenboim | Mendelssohn: Songs Without Words | DG 1974

**德弗札克／柴可夫斯基（7）**
- Panocha Quartet | Dvořák: String Quartet "American" | Supraphon 1982
- George Szell | Dvořák: Slavonic Dances | CBS 1965
- Charles Mackerras & Renée Fleming | Dvořák: Rusalka | Decca 1998（兼補 Fleming 缺席）
- Ernest Ansermet | Tchaikovsky: The Nutcracker | Decca 1959
- Georg Solti | Tchaikovsky: Eugene Onegin | Decca 1974
- Herbert von Karajan | Tchaikovsky: Serenade for Strings | DG 1980
- David Oistrakh | Tchaikovsky: Violin Concerto (Ormandy) | CBS 1959（獨立卡，現只有 Heifetz 合輯與諏訪內）

**佛瑞／法朗克／聖桑（5）**
- André Cluytens / de los Ángeles / Fischer-Dieskau | Fauré: Requiem | EMI 1962（**第一優先級**，一卡補三線）
- Domus | Fauré: Piano Quartet no. 1 | Hyperion 1985
- Jean-Philippe Collard | Fauré: Nocturnes | EMI 1973
- Sviatoslav Richter & Borodin Quartet | Franck: Piano Quintet | Philips 1985
- Martha Argerich et al. | Saint-Saëns: Le Carnaval des animaux | Philips 1986

**海頓／莫札特補強（8）**
- Jacqueline du Pré & Barbirolli | Haydn: Cello Concertos | EMI 1967（兼補 du Pré 只有 1 張）
- Karl Böhm | Haydn: Die Jahreszeiten | DG 1967
- Trevor Pinnock | Haydn: Nelson Mass | Archiv 1986
- Jordi Savall / Le Concert des Nations | Haydn: The Seven Last Words | Alia Vox 2007
- Karl Leister & Amadeus Quartet | Mozart: Clarinet Quintet | DG 1968（可與 Brahms 併卡池不同卡）
- Grumiaux Ensemble | Mozart: String Quintets K. 515 & 516 | Philips 1973
- Igor Oistrakh & David Oistrakh | Mozart: Sinfonia Concertante K. 364 | Decca 1963
- Neville Marriner | Mozart: Gran Partita K. 361 | Philips 1984

**布魯克納／楊納捷克／辛德密特／浦朗克（7）**
- Eugen Jochum | Bruckner: Symphony no. 5 | DG 1958
- Eugen Jochum | Bruckner: Te Deum | DG 1965
- Pavel Haas Quartet | Janáček: String Quartets 1 & 2 | Supraphon 2007
- Charles Mackerras | Janáček: Glagolitic Mass | Supraphon 1984
- Rudolf Firkušný | Janáček: Piano Works (On an Overgrown Path) | DG 1971
- Herbert Blomstedt | Hindemith: Mathis der Maler / Symphonic Metamorphosis | Decca 1987
- Pierre Dervaux | Poulenc: Dialogues des Carmélites | EMI 1958

**預估張數：45**

---

## 軸線 2：時代斷層（中世紀／文藝復興／巴洛克深度）

### 現況
- 中世紀/文藝復興實有約 20 張（Pérotin×2、Machaut×2、Hildegard、Josquin、Tallis×2、Allegri、Gesualdo、Monteverdi×5、Dowland、Victoria Requiem、Silos Chant、Carmina Burana 原典）。**比「3 張」的印象好很多**，但呈點狀：
- **全缺的支柱作曲家：Palestrina（0）、William Byrd 作曲家身分（0，池內 16 筆 byrd 全是 The Byrds/Donald Byrd）、Lassus（0）、Ockeghem（0）、Dufay（0）**。
- 巴洛克深度意外地好：Bach 清唱劇 3 套、法國巴洛克（Lully Atys、Rameau×4、Charpentier Médée）、Biber 玫瑰經、Zelenka×2、Scarlatti×2 都在。缺口在**韓德爾歌劇/神劇縱深與 Purcell 半歌劇、Gluck**。

### 缺口等級：中世紀/文藝復興 **重大**（支柱級空缺）；巴洛克 **輕微偏中**

### 必補清單（約 17 張）
**文藝復興複音（10）**
- The Tallis Scholars | Palestrina: Missa Papae Marcelli | Gimell 1980
- The Tallis Scholars | Byrd: The Three Masses | Gimell 1984
- The Tallis Scholars | Victoria: Tenebrae Responsories | Gimell 1990
- The Tallis Scholars | Josquin: Missa L'homme armé | Gimell 1989
- Philippe Herreweghe | Lassus: Lagrime di San Pietro | Harmonia Mundi 1993
- The Hilliard Ensemble | Ockeghem: Requiem | EMI Reflexe 1984
- Gothic Voices | A Feather on the Breath of God (Hildegard) | Hyperion 1982
- Diabolus in Musica 或 Binchois Consort | Dufay: Missa Se la face ay pale | Alpha 2005 / Hyperion 1997
- Emma Kirkby & Anthony Rooley | Dowland: Lute Songs | L'Oiseau-Lyre 1981（歌曲面，補 O'Dette 器樂面）
- Ensemble Organum | Chant de l'Église de Rome | Harmonia Mundi 1998（葛利果/古羅馬聖歌，補 Silos 之外的學術系）

**巴洛克縱深（7）**
- William Christie | Handel: Alcina | Erato 1999（韓德爾歌劇第二部）
- John Eliot Gardiner | Handel: Solomon | Philips 1984（神劇補 Messiah 之外）
- John Eliot Gardiner | Purcell: The Fairy Queen | Erato 1982
- John Eliot Gardiner | Gluck: Orfeo ed Euridice | Philips 1991（池內只有 Ferrier 1947 詠嘆調）
- Il Giardino Armonico | Vivaldi: L'estro armonico | Teldec 1993
- Musica Antiqua Köln | Bach: Musical Offering | Archiv 1979
- Rinaldo Alessandrini | Monteverdi: Selva morale e spirituale（選） | Naïve 2010（牧歌/晚禱之外的第三面）

**預估張數：17**

---

## 軸線 3：歌劇

### 現況
比預期好：Verdi 7 套（Requiem×2 + Otello×2、Aida、Traviata 里斯本現場、Rigoletto、Don Carlo）、Puccini 8（四大歌劇全有名盤）、Wagner 5（Solti 指環、Böhm Tristan、Knappertsbusch Parsifal、Furtwängler Tristan+RAI 指環）、莫札特三大＋魔笛×3、R. Strauss 歌劇 4、美聲三家各有代表、Berg Wozzeck/Lulu 都在、Janáček 2 部。
**但整體歌劇約 55 張，第二圈全是洞**：

### 缺口等級：**中等偏重大**（缺的都是正典級）

### 必補清單（約 15 張）
- Zubin Mehta / Price / Domingo | Verdi: Il trovatore | RCA 1969
- Herbert von Karajan / Schwarzkopf / Gobbi | Verdi: Falstaff | EMI 1956
- Antonino Votto / Callas | Verdi: Un ballo in maschera | EMI 1956
- Claudio Abbado / Berganza | Rossini: Il barbiere di Siviglia | DG 1971（**羅西尼理髮師竟為 0**）
- Antonino Votto / Callas | Bellini: La sonnambula | EMI 1957
- Herbert von Karajan | Mascagni: Cavalleria rusticana / Leoncavallo: Pagliacci | DG 1965（寫實主義雙聯全空）
- Richard Bonynge / Sutherland / Domingo | Offenbach: Les Contes d'Hoffmann | Decca 1972
- André Cluytens 已有 Gounod: Faust 1958 ✓（免補）；改補 Georges Prêtre / de los Ángeles | Massenet: Werther | EMI 1969
- Rafael Kubelík | Wagner: Die Meistersinger | Arts/Myto 1967
- Otto Klemperer | Wagner: Der fliegende Holländer | EMI 1968
- Herbert von Karajan / Ghiaurov | Mussorgsky: Boris Godunov（全曲） | Decca 1970（池內只有 Chaliapin 1928 選段）
- Roger Désormière | Debussy: Pelléas et Mélisande | EMI 1941（**德布西歌劇全缺**）
- Herbert von Karajan / Schwarzkopf | R. Strauss: Ariadne auf Naxos | EMI 1954
- John Eliot Gardiner | Mozart: Idomeneo | Archiv 1990
- Georg Solti | Tchaikovsky: Eugene Onegin | Decca 1974（已列軸線 1，勿重複計數）

**芭蕾附掛（歌劇院劇目、近乎全空，5 張）**
- Ernest Ansermet | Tchaikovsky: The Nutcracker | Decca 1959（已列軸線 1）
- André Previn | Tchaikovsky: The Sleeping Beauty | EMI 1974
- Herbert von Karajan | Adam: Giselle | Decca 1961
- Antal Doráti | Stravinsky: The Firebird（全曲） | Mercury 1959
- André Previn | Prokofiev: Cinderella | EMI 1983

**預估張數：18（扣除跨軸重複後）**

---

## 軸線 4：20 世紀與當代

### 現況
**全池最強的一塊，資料庫水準**：第二維也納樂派 9 張（含 Moses und Aron、Lulu）、Messiaen 4、Ligeti 6（含 Le Grand Macabre）、Xenakis 2、Stockhausen 3、Cage 3、Feldman 3、Berio 2（含 Berberian Sequenza）、Nono、Penderecki 2、Lutosławski、Takemitsu 2、Schnittke 3、Gubaidulina；極簡 17 張（Glass 6、Reich 4、Riley 3、Adams 3、La Monte Young）；神聖極簡 9（Pärt 5、Górecki 3、Tavener）；當代 30+（Saariaho 2、Adès、Golijov、Caroline Shaw 2 含 Partita for 8 Voices、Unsuk Chin、Max Richter 7、Jóhannsson 6、Bang on a Can 三人組、Mazzoli、Norman、Montgomery、Rihm）。

### 缺口等級：**輕微**（只剩點狀補強）

### 必補清單（約 10 張）
- Fritz Reiner | Bartók: Concerto for Orchestra | RCA 1955（**20 世紀最有名的管弦錄音之一，竟缺**）
- Antal Doráti | Stravinsky: The Firebird | Mercury 1959（已列芭蕾）
- Igor Stravinsky | Symphony of Psalms（自指） | CBS 1963
- Claudio Abbado | Stravinsky: Pulcinella | DG 1978
- Herbert von Karajan | Prokofiev: Symphony no. 5 | DG 1969
- Orpheus Chamber Orchestra | Prokofiev: Symphony no. 1 "Classical" | DG 1988
- Fritz Reiner | Prokofiev: Alexander Nevsky | RCA 1959
- Herbert von Karajan | Shostakovich: Symphony no. 10 | DG 1966
- Mstislav Rostropovich | Dutilleux: Tout un monde lointain | EMI 1975（**Dutilleux 全缺**，兼補 Rostropovich）
- Riccardo Chailly | Schoenberg: Gurre-Lieder | Decca 1985
- Maurizio Pollini | Schoenberg: Piano Works | DG 1974（兼補 Pollini）
- Hans Abrahamsen / Barbara Hannigan | let me tell you | Winter & Winter 2016（2010s 正典新作）

**預估張數：11（扣重複）**

---

## 軸線 5：演奏家傳奇錄音

### 現況
指揮與鋼琴整體極佳：Furtwängler 7、Karajan 14、Kleiber 4（貝五七、布四、舒三八都在！）、Bernstein 5、Sviatoslav Richter 5、Horowitz 6（Moscow 1986、1965 Return 都在）、Gould 6、Argerich 8、Heifetz 4、Callas 4、Fischer-Dieskau 3。
**單卡級薄弱**：Michelangeli 1、du Pré 1、Celibidache 1、Casals 2、Pollini 2、Lipatti 2、Grumiaux 3（但都是 Bach/Mozart 名盤，質可）。

### 缺口等級：**中等**（人都在，深度不足）

### 必補清單（約 8 張，多數已掛在前面軸線）
- Arturo Benedetti Michelangeli | Ravel: Piano Concerto in G / Rachmaninoff: PC 4（Gracis） | EMI 1957（**必補**）
- Arturo Benedetti Michelangeli | Beethoven–Galuppi–Scarlatti Recital | Decca 1965（次優先）
- Jacqueline du Pré & Barenboim | Brahms: Cello Sonatas | EMI 1968（或以軸線 1 的 Haydn 協奏曲擇一）
- Jascha Heifetz | Korngold: Violin Concerto | RCA 1953（Korngold 協奏曲＋Heifetz 一卡雙補）
- Jascha Heifetz | Bruch: Scottish Fantasy | RCA 1961
- Sergiu Celibidache | Bruckner: Symphony no. 4（Munich） | EMI 1988（Celibidache 只 1 張，宜補第二張）
- Luciano Pavarotti / Bonynge | Donizetti: L'elisir d'amore | Decca 1970（Pavarotti 現只有精選輯，無完整歌劇）
- Dietrich Fischer-Dieskau & Moore | Schubert: Schwanengesang | DG 1972（已列軸線 1）

**預估張數：7（扣重複）**

---

## 軸線 6：華人古典

### 現況
**驚喜地完整**：江文也×2（台灣舞曲＋日本時期鋼琴）、蕭泰然鋼琴協奏曲、馬水龍×2（梆笛協奏曲＋鋼琴全集）、郭芝苑、錢南章（呂紹嘉／樂典 08）、周文中、陳其鋼 Iris dévoilée、譚盾 Ghost Opera、盛宗亮 H'un、梁祝（俞麗拿 1993）；演奏家線：傅聰、陳必先、林昭亮、胡乃元、曾宇謙、陳銳、馬友友 4 張、王羽佳 2、郎朗 2、李雲迪。

### 缺口等級：**輕微**

### 必補清單（約 5 張）
- 黃自 | 長恨歌（清唱劇）＋思鄉/玫瑰三願 藝術歌曲選 | 上海之春/Marco Polo 系年代版（**黃自為 0，中國近代音樂史起點**）
- Tan Dun 譚盾 | Crouching Tiger, Hidden Dragon (馬友友) | Sony 2000（一卡補譚盾電影線＋馬友友）
- Tan Dun 譚盾 | Water Passion after St. Matthew | Sony 2002（受難曲當代脈絡，接 Golijov Pasión）
- Lang Lang 郎朗 | Goldberg Variations | DG 2020（郎朗現只有跨界/李斯特精選，缺硬曲目代表作）
- Fou Ts'ong 傅聰 | Debussy: Préludes 或 Chopin Nocturnes | Sony/Westminster（傅聰僅 1 張）

**預估張數：5**

---

## 總表

| 軸線 | 缺口等級 | 必補張數 |
|---|---|---|
| 1 作曲家正典 | 重大（室內樂／芭蕾／單曲點缺） | 45 |
| 2 時代斷層 | 文藝復興重大／巴洛克輕微 | 17 |
| 3 歌劇＋芭蕾 | 中等偏重大 | 18 |
| 4 20 世紀當代 | 輕微 | 11 |
| 5 演奏家傳奇 | 中等 | 7 |
| 6 華人古典 | 輕微 | 5 |
| **合計（必補）** | | **~103** |
| 次優先（各軸線「optional」與加深） | | ~25–35 |
| **總缺口估計** | | **~125–140 張** |

## 古典特有風險提醒（上卡前必讀）
1. **同作品多版本的身分釘定**：池內 Bach 大提琴組曲已有 4 版（Casals/Starker/Gendron/Ma）、無伴奏 3 版、Goldberg 5 版。新增版本時 album 欄必須帶區辨資訊（年份或樂團括註，如既有慣例 `Bach: The Goldberg Variations (1955)`、`Beethoven: Symphony no. 9 (Bayreuth 1951)`），否則 `artist|album` key 撞不出重複但玩家端會混淆；**同演奏者同曲目不同年份務必括年**。
2. **作曲家本人卡 vs 演奏卡並存**：池內有「Ludwig van Beethoven | Symphony no. 7 | 1813」這類作曲家卡，也有演奏版卡。補卡時先 grep 兩種形態，避免把作曲家卡誤判為「已有錄音版」；也不要再新增作曲家卡形態（年份欄會汙染年代統計，1200s-1600s 誤判就是這樣來的）。
3. **拼字變體**：Rachmaninoff/Rachmaninov、Schoenberg/Schönberg、Dvořák 帶符號（池內查 dvorak 是 0、dvořák 才有 5）——查重與建卡都要用帶變音符號的既有慣例，grep 時兩種都掃。
4. **合輯卡跨作曲家**（如 `Lionel Tertis | Bax / Brahms / Bach / Delius`、`Franck / Debussy: Violin Sonatas`）：判斷「某作品是否已有」時不能只 grep 作曲家冒號開頭，副作品藏在合輯卡裡。
5. **pearl listeners 特例等既有規則照舊**：三軸、頂點資格、固定簡介、published gate 依 `ALBUM_ONBOARDING.md`，一律走 `dip-card-create`，不得先上 `seed_cards.json` 再補資料。
6. **歌劇全集卡的年份**以錄音年為準（如 Solti 指環 1965 慣例），現場錄音括註場地年份（Bayreuth 1966 慣例已存在，照用）。
