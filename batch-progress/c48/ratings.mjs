// c-48 古典三軸：依 ALBUM_ONBOARDING.md §0.7 錨點制人工評分（classical-rubric），不走 /album-rating。
// 三軸定義在「錄音層」：經典＝這份錄音的樂史地位；冷門＝玩家撞見這份錄音的機率；
// 硬蕊＝入耳難度（1950 前歷史錄音音質 +1、單張超過兩小時 +1，上限 5）。
// listeners 一律 null（REMOTE_RUNBOOK：Last.fm 本機才查得到；古典另有 §0.7 pearl 特例）。
import fs from 'node:fs';

// [classic, obscurity, accessibility, 評分依據]
const R = {
 'Otto Klemperer|Beethoven: Fidelio': [5,3,3,'EMI 世紀原音系列收錄；Fidelio 錄音史的長期首選之一。歌劇全曲、德語對白'],
 'Oistrakh / Rostropovich / Richter / Karajan|Beethoven: Triple Concerto': [5,2,2,'三位蘇聯巨匠＋卡拉揚的一次性組合，本曲最著名錄音。曲目本身親和'],
 'Dietrich Fischer-Dieskau & Gerald Moore|Schubert: Schwanengesang': [5,3,3,'DFD 與 Moore 的舒伯特全套是藝術歌曲錄音的參考點。Lieder 屬專門領域'],
 'Cortot / Thibaud / Casals|Schubert: Piano Trio no. 1 (1926)': [5,4,4,'室內樂史上的傳奇三重奏，1926 年電氣錄音初期。歷史錄音音質修正 +1'],
 'Sviatoslav Richter|Schubert: Wanderer Fantasy': [4,3,3,'李希特代表性舒伯特之一；主流曲目的專門版本'],
 'Karl Leister & Amadeus Quartet|Brahms: Clarinet Quintet': [4,3,3,'DG 布拉姆斯單簧管五重奏的主要版本之一'],
 'Maurizio Pollini & Quartetto Italiano|Brahms: Piano Quintet': [4,3,3,'波里尼與義大利四重奏的組合，本曲主要版本之一'],
 'Josef Suk & Julius Katchen|Brahms: Violin Sonatas': [4,3,3,'Decca 布拉姆斯小提琴奏鳴曲全集的參考版'],
 'Bruno Walter|Brahms: Symphony no. 2': [4,2,2,'華爾特晚年哥倫比亞立體聲系列，布拉姆斯二號的溫暖典型'],
 'Kathleen Ferrier|Brahms: Alto Rhapsody': [5,4,4,'費莉亞的聲音本身即錄音史事件，早逝使錄音稀少。1950 前歷史錄音 +1'],
 'Fritz Wunderlich|Schumann: Dichterliebe': [5,3,3,'溫德利希早逝前的德語藝術歌曲代表作'],
 'Clifford Curzon & Budapest String Quartet|Schumann: Piano Quintet': [4,4,3,'1952 年單聲道，柯爾榮與布達佩斯四重奏；歷史錄音領域'],
 'Dinu Lipatti|Chopin: Waltzes': [5,3,3,'李帕第逝世前錄音，蕭邦圓舞曲的長期標竿。歷史錄音音質修正 +1'],
 'Arthur Rubinstein|Chopin: Polonaises': [5,2,2,'魯賓斯坦 RCA 蕭邦全集的核心，波蘭舞曲的預設版本'],
 'Martha Argerich|Liszt: Piano Sonata in B minor': [5,3,3,'阿格麗希 1972 年 DG 錄音，B 小調奏鳴曲的代表版之一'],
 "Academy of St Martin in the Fields Chamber Ensemble|Mendelssohn: Octet": [4,3,2,'ASMF 室內樂團的孟德爾頌八重奏，本曲主要版本；曲目親和'],
 "Otto Klemperer|Mendelssohn: A Midsummer Night's Dream": [4,2,2,'克倫培勒 EMI 仲夏夜之夢，曲目為入門常客'],
 'Daniel Barenboim|Mendelssohn: Songs Without Words': [4,3,2,'巴倫波因 DG 無言歌全集，本曲目的完整版首選之一'],
 'Panocha Quartet|Dvořák: String Quartet "American"': [4,3,2,'捷克本土四重奏的德弗札克，Supraphon 目錄核心'],
 'George Szell|Dvořák: Slavonic Dances': [5,2,2,'塞爾與克里夫蘭的斯拉夫舞曲是本曲目的長期參考錄音'],
 'Charles Mackerras|Dvořák: Rusalka': [5,3,3,'馬克拉斯的捷克歌劇權威地位；Rusalka 全曲錄音的首選之一'],
 'Ernest Ansermet|Tchaikovsky: The Nutcracker': [4,1,1,'Decca 安塞美的胡桃鉗全曲，曲目為入門合輯常客'],
 'Georg Solti|Tchaikovsky: Eugene Onegin': [5,3,3,'蕭堤 Decca 尤金奧涅金，西方錄音的長期首選'],
 'Herbert von Karajan|Tchaikovsky: Serenade for Strings': [4,2,2,'卡拉揚柏林愛樂弦樂小夜曲，曲目親和'],
 'David Oistrakh|Tchaikovsky: Violin Concerto (Ormandy)': [4,2,2,'歐伊斯特拉夫與奧曼第的柴可夫斯基協奏曲'],
 'André Cluytens|Fauré: Requiem': [5,3,3,'克呂當／de los Ángeles／DFD 的佛瑞安魂曲，本曲長期首選；宗教曲'],
 'Domus|Fauré: Piano Quartet no. 1': [4,4,3,'Hyperion 的 Domus，佛瑞室內樂的愛樂者領域首選'],
 'Jean-Philippe Collard|Fauré: Nocturnes': [4,4,3,'柯拉德 EMI 佛瑞鋼琴全集，法國鋼琴學派專門領域'],
 'Sviatoslav Richter & Borodin Quartet|Franck: Piano Quintet': [4,4,3,'李希特與鮑羅定四重奏，法朗克五重奏的專門版本'],
 'Martha Argerich|Saint-Saëns: Le Carnaval des animaux': [4,1,1,'動物狂歡節為入門曲目，阿格麗希等群星版'],
 'Jacqueline du Pré|Haydn: Cello Concertos': [5,2,2,'杜普蕾與巴比羅利的海頓，杜普蕾錄音本身即收藏標的'],
 'Karl Böhm|Haydn: Die Jahreszeiten': [4,4,3,'貝姆 DG 四季神劇，大部頭聲樂作品'],
 'Trevor Pinnock|Haydn: Nelson Mass': [4,4,3,'品諾克 Archiv 古樂版，宗教曲、古樂專門廠牌'],
 'Karl Leister & Amadeus Quartet|Mozart: Clarinet Quintet': [4,2,2,'DG 莫札特單簧管五重奏，曲目親和'],
 'Grumiaux Ensemble|Mozart: String Quintets K. 515 & 516': [5,3,3,'格魯米歐三重奏 Philips 莫札特弦樂五重奏全集，本曲目長期參考版'],
 'David Oistrakh & Igor Oistrakh|Mozart: Sinfonia Concertante K. 364': [4,3,2,'父子檔的莫札特協奏交響曲'],
 'Neville Marriner|Mozart: Gran Partita K. 361': [4,3,2,'馬利納 Philips 大組曲，管樂室內樂主要版本'],
 'Eugen Jochum|Bruckner: Symphony no. 5': [4,4,4,'約夫姆 DG 布魯克納全集；五號屬愛樂者領域，晚期浪漫大編制'],
 'Eugen Jochum|Bruckner: Te Deum': [4,4,3,'約夫姆的布魯克納感恩讚，宗教曲'],
 'Pavel Haas Quartet|Janáček: String Quartets 1 & 2': [4,4,4,'Supraphon 捷克新生代四重奏；楊納捷克四重奏語法不協和'],
 'Charles Mackerras|Janáček: Glagolitic Mass': [4,4,4,'馬克拉斯的楊納捷克權威；格拉高利彌撒編制龐大'],
 'Rudolf Firkušný|Janáček: On an Overgrown Path': [4,4,3,'費庫斯尼師承楊納捷克，鋼琴曲集的權威版'],
 'Herbert Blomstedt|Hindemith: Mathis der Maler / Symphonic Metamorphosis': [4,4,4,'布隆斯泰特 Decca 辛德密特；20 世紀管弦、池內辛德密特僅 1 張'],
 'Pierre Dervaux|Poulenc: Dialogues des Carmélites': [5,4,4,'1958 年首演卡司錄音，浦朗克歌劇的原始文獻'],

 'The Tallis Scholars|Palestrina: Missa Papae Marcelli': [5,3,3,'Gimell 創業作，文藝復興複音錄音的分水嶺；宗教複音'],
 'The Tallis Scholars|Byrd: The Three Masses': [5,4,3,'拜爾德三首彌撒的參考錄音；池內 Byrd 作曲家身分為 0'],
 'The Tallis Scholars|Victoria: Tenebrae Responsories': [4,4,3,'維多利亞聖週應答曲的主要版本'],
 'The Tallis Scholars|Josquin: Missa Sine nomine / Missa Ad fugam': [4,4,3,'塔利斯學者的若斯坎系列；池內若斯坎僅《Missa Pange lingua》1 張'],
 'Philippe Herreweghe|Lassus: Lagrime di San Pietro': [4,4,4,'拉素斯晚期複音巨作，池內 Lassus 為 0；文本與結構艱深'],
 'The Hilliard Ensemble|Ockeghem: Requiem': [4,5,4,'現存最早的複音安魂曲；池內 Ockeghem 為 0，屬學術／收藏家領域'],
 'Gothic Voices|Hildegard von Bingen: A Feather on the Breath of God': [5,3,3,'Hyperion 的希德嘉錄音是中世紀音樂進入大眾視野的關鍵'],
 'The Binchois Consort|Dufay: Missa Se la face ay pale': [4,5,4,'杜飛定旋律彌撒代表作；池內 Dufay 為 0，學術領域'],
 'Emma Kirkby & Anthony Rooley|Dowland: Lute Songs': [4,4,2,'柯克比的道蘭德歌曲，補池內僅有的器樂面；曲調本身親和'],
 "Ensemble Organum|Chant de l'Église de Rome": [4,5,4,'古羅馬聖歌的學術重建，Marcel Pérès 的研究成果'],
 'William Christie|Handel: Alcina': [4,3,3,'克里斯蒂 Les Arts Florissants 的韓德爾歌劇，補 Messiah 之外'],
 'John Eliot Gardiner|Handel: Solomon': [4,3,3,'加德納 Philips 所羅門，韓德爾神劇縱深'],
 'John Eliot Gardiner|Purcell: The Fairy Queen': [4,4,3,'普賽爾半歌劇的主要錄音；英國巴洛克專門領域'],
 'John Eliot Gardiner|Gluck: Orfeo ed Euridice (1991)': [4,3,3,'古樂版葛路克，補池內僅有的 Ferrier 1947 詠嘆調'],
 'Musica Antiqua Köln|Bach: Musical Offering': [4,4,4,'古樂團體的音樂的奉獻；曲式思辨性強'],
 'Rinaldo Alessandrini|Monteverdi: Selva morale e spirituale': [4,4,3,'蒙台威爾第晚年宗教曲集，補牧歌與晚禱之外的第三面'],

 'Zubin Mehta|Verdi: Il trovatore': [4,3,3,'RCA 梅塔／Price／Domingo 的遊唱詩人'],
 'Herbert von Karajan|Verdi: Falstaff (1956)': [5,3,3,'卡拉揚／Gobbi／Schwarzkopf，法斯塔夫錄音史的標竿'],
 'Maria Callas|Verdi: Un ballo in maschera': [5,3,3,'卡拉絲 EMI 假面舞會，威爾第第二圈正典'],
 'Claudio Abbado|Rossini: Il barbiere di Siviglia': [5,2,2,'阿巴多／Berganza 的塞維利亞理髮師；池內羅西尼理髮師為 0'],
 'Maria Callas|Bellini: La sonnambula': [5,4,3,'卡拉絲的貝里尼美聲代表；夢遊女屬專門劇目'],
 'Herbert von Karajan|Mascagni: Cavalleria rusticana / Leoncavallo: Pagliacci': [5,2,2,'寫實主義雙聯的標準錄音；池內此雙聯為 0'],
 "Richard Bonynge|Offenbach: Les Contes d'Hoffmann": [4,3,3,'邦寧吉／蘇莎蘭／多明哥的霍夫曼故事'],
 'Georges Prêtre|Massenet: Werther': [4,4,3,'普烈特／de los Ángeles 的維特，法語歌劇第二圈'],
 'Rafael Kubelík|Wagner: Die Meistersinger von Nürnberg': [4,4,5,'庫貝利克的紐倫堡名歌手；四小時以上大部頭，時長修正 +1'],
 'Otto Klemperer|Wagner: Der fliegende Holländer': [4,3,3,'克倫培勒 EMI 漂泊的荷蘭人'],
 'Herbert von Karajan|Mussorgsky: Boris Godunov': [4,4,4,'卡拉揚／Ghiaurov 的鮑里斯全曲；池內僅有 Chaliapin 1928 選段'],
 'Roger Désormière|Debussy: Pelléas et Mélisande (1941)': [5,4,5,'德布西歌劇的原始參考錄音，戰時巴黎製作；歷史錄音音質 +1'],
 'Herbert von Karajan|R. Strauss: Ariadne auf Naxos': [5,4,4,'卡拉揚／Schwarzkopf 1954 年單聲道，本劇長期首選'],
 'John Eliot Gardiner|Mozart: Idomeneo': [4,4,3,'加德納古樂版依多美尼奧，莫札特正歌劇'],
 'André Previn|Tchaikovsky: The Sleeping Beauty': [4,2,3,'普列文 EMI 睡美人全曲；三小時以上，時長修正 +1'],
 'Herbert von Karajan|Adam: Giselle': [4,3,2,'Decca 吉賽爾，浪漫芭蕾正典；池內芭蕾近乎全空'],
 'Antal Doráti|Stravinsky: The Firebird': [5,2,3,'Mercury Living Presence 發燒天碟正典，火鳥全曲'],
 'André Previn|Prokofiev: Cinderella': [4,3,3,'普列文 EMI 灰姑娘全曲，補芭蕾線'],

 'Fritz Reiner|Bartók: Concerto for Orchestra': [5,2,3,'RCA Living Stereo 發燒正典，20 世紀最著名的管弦錄音之一'],
 'Igor Stravinsky|Stravinsky: Symphony of Psalms (自指)': [5,3,4,'作曲家自指，詮釋的第一手文獻；宗教曲、節奏語法生硬'],
 'Claudio Abbado|Stravinsky: Pulcinella': [4,3,3,'阿巴多 DG 普欽奈拉全曲，新古典時期代表'],
 'Herbert von Karajan|Prokofiev: Symphony no. 5': [4,2,3,'卡拉揚 DG 普羅高菲夫五號；池內普羅高菲夫交響曲全缺'],
 'Orpheus Chamber Orchestra|Prokofiev: Symphony no. 1 "Classical"': [4,2,2,'無指揮室內樂團的古典交響曲，曲目親和'],
 'Fritz Reiner|Prokofiev: Alexander Nevsky': [4,3,3,'萊納 RCA 亞歷山大涅夫斯基，電影配樂改編清唱劇'],
 'Herbert von Karajan|Shostakovich: Symphony no. 10': [5,3,4,'卡拉揚少數的蕭斯塔科維契，本曲西方錄音標竿'],
 'Mstislav Rostropovich|Dutilleux: Tout un monde lointain': [4,5,4,'杜提尤為羅斯托波維奇所寫的大提琴協奏曲；池內杜提尤全缺'],
 'Riccardo Chailly|Schoenberg: Gurre-Lieder': [4,4,5,'夏伊 Decca 古勒之歌；超大編制、逾兩小時，時長修正 +1'],
 'Maurizio Pollini|Schoenberg: Piano Works': [5,4,5,'波里尼的荀白克鋼琴全集是十二音鋼琴演奏的標竿；語法極端'],
 'Barbara Hannigan|Abrahamsen: let me tell you': [4,4,4,'2010 年代當代聲樂正典，漢尼根委創首演'],

 'Arturo Benedetti Michelangeli|Ravel: Piano Concerto in G / Rachmaninoff: Piano Concerto no. 4': [5,3,2,'米開蘭傑利與 Gracis，拉威爾 G 大調協奏曲的長期首選；池內米開蘭傑利僅 1 張'],
 'Arturo Benedetti Michelangeli|Beethoven / Galuppi / Scarlatti Recital': [4,4,3,'米開蘭傑利 Decca 獨奏會，曲目冷僻'],
 'Jacqueline du Pré & Daniel Barenboim|Brahms: Cello Sonatas': [4,3,3,'杜普蕾與巴倫波因的布拉姆斯大提琴奏鳴曲'],
 'Jascha Heifetz|Korngold: Violin Concerto': [5,3,2,'海飛茲首演並灌錄，康果爾德協奏曲的定義版本'],
 'Jascha Heifetz|Bruch: Scottish Fantasy': [5,3,2,'海飛茲 RCA 蘇格蘭幻想曲，本曲參考錄音'],
 'Sergiu Celibidache|Bruckner: Symphony no. 4 (Munich)': [4,4,4,'傑利畢達克慕尼黑時期的極慢速布魯克納；池內傑利畢達克僅 1 張'],
 "Luciano Pavarotti|Donizetti: L'elisir d'amore": [4,2,2,'帕華洛帝與蘇莎蘭的愛情靈藥；池內帕華洛帝無完整歌劇'],

 '黃自|長恨歌': [4,5,3,'中國近代藝術音樂起點，第一部中文清唱劇；池內黃自為 0，屬學術領域'],
 'Tan Dun 譚盾|Water Passion after St. Matthew': [4,4,4,'譚盾受難曲，接續 Golijov 的當代受難曲脈絡'],
 'Lang Lang 郎朗|Bach: Goldberg Variations (2020)': [3,2,3,'郎朗的硬曲目代表作，補其跨界形象之外的一面；池內郎朗僅跨界與李斯特精選'],
 "Fou Ts'ong 傅聰|Chopin: Nocturnes": [4,4,2,'傅聰的蕭邦夜曲；池內傅聰僅《Chopin: Mazurkas》1 張'],
};

const rarityOf = (c, o, a) => {
  const s = c + a + (o >= 5 ? 1 : 0);
  return s >= 10 ? 'legendary' : s >= 8 ? 'epic' : s >= 6 ? 'uncommon' : s >= 4 ? 'rare' : 'common';
};

const out = {};
for (const [k, [c, o, a, why]] of Object.entries(R)) {
  out[k] = { classic: c, obscurity: o, accessibility: a, listeners: null,
    source: 'manual:classical-rubric', rubricNote: why, rarity: rarityOf(c, o, a),
    listenersNote: 'local（Last.fm 雲端不查；古典另適用 §0.7 pearl 特例）' };
}
fs.writeFileSync(new URL('./ratings.json', import.meta.url), JSON.stringify(out, null, 1));
const dist = {};
for (const v of Object.values(out)) dist[v.rarity] = (dist[v.rarity] || 0) + 1;
console.log(`三軸完成 ${Object.keys(out).length} 張｜稀有度分布：`, dist);
