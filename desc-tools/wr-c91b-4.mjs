import fs from 'fs';
const OUT='/home/user/dip-vinyl-shop/desc-tools/batches/research/c91-b.json';
const A=JSON.parse(fs.readFileSync(OUT,'utf8'));
const W=(o)=>A.push(o);
W({
 key:"desc4:淺堤 Shallow Levée|婚禮之途", artist:"淺堤 Shallow Levée", album:"婚禮之途",
 facts:[
  {f:"MusicBrainz release-group 555b1421 的欄位：title《婚禮之途》、artist-credit「淺堤」、first-release-date 2021-12-01、primary-type Album、secondary-types 空、轄下 TW 與 XW 兩個 Official release，皆 10 軌、廠牌欄皆空白。",src:"https://musicbrainz.org/release-group/555b1421-40da-4286-adf5-9e47f6f00556"},
  {f:"十軌的曲序：〈下南州〉〈禮物〉〈水母漂〉〈恬恬一下仔〉〈刺激 2021〉〈恆春花絮〉〈呱呱墜地以後〉〈西邊〉〈夜晚的牠知道〉〈又一個漫長的下午〉；其中〈下南州〉與〈呱呱墜地以後〉都只有 0:38。",src:"https://musicbrainz.org/release/c742c8d2-95a9-4486-a673-8c36cca41c12"},
  {f:"中文維基〈淺堤〉記樂團 2015 年 3 月由依玲、紅茶、大冠三人以「蔡依玲樂隊」之名組成，2016 年 2 月方博加入、同年 4 月更名為淺堤，2019 年 2 月鼓手堂軒加入；現任編制為依玲（主唱兼吉他）、紅茶（吉他）、方博（貝斯）、堂軒（鼓）。",src:"https://zh.wikipedia.org/zh-tw/%E6%B7%BA%E5%A0%A4"},
  {f:"同條目記樂團 2016 年以手工 demo《Demo. 1》裡的〈怪手〉入圍第七屆金音創作獎最佳搖滾單曲獎，該曲用台語寫紅毛港遷村案；2020 年首張專輯《不完整的村莊》入圍第十一屆金音創作獎最佳搖滾專輯獎。",src:"https://zh.wikipedia.org/zh-tw/%E6%B7%BA%E5%A0%A4"},
  {f:"同條目記樂團 2022 年 2 月至 3 月完成《婚禮之途》發片千人巡迴，三場分別在高雄 LIVE WAREHOUSE、臺中 Legacy 與新北 Zepp New Taipei；2022 年 2 月 22 日另發行《Live On 臺華輪》Live EP。",src:"https://zh.wikipedia.org/zh-tw/%E6%B7%BA%E5%A0%A4"},
  {f:"同條目記樂團 2022 年 5 月 10 日發行首支跨國單曲〈夜晚的牠知道 feat. Joh Ung〉，與韓國樂團 Goonam 主唱 Joh Ung（趙雄）共同編寫——〈夜晚的牠知道〉本身是《婚禮之途》的第 9 軌。",src:"https://zh.wikipedia.org/zh-tw/%E6%B7%BA%E5%A0%A4"},
  {f:"十軌的曲長從 0:38 到〈夜晚的牠知道〉的 5:10。",src:"https://musicbrainz.org/release/c742c8d2-95a9-4486-a673-8c36cca41c12"},
  {f:"Apple Music 台灣店面的條目（collectionId 1594841072）：標題《婚禮之途》、掛名淺堤、10 軌、releaseDate 2021-12-01、notExplicit。",src:"https://music.apple.com/tw/album/1594841072"}
 ],
 hookCandidates:["十軌裡有兩軌只有三十八秒，一首在開頭、一首在正中間偏後","碟上的第九軌，半年後跟一位韓國主唱重寫成跨國單曲"],
 sound:"十軌的曲長從 0:38 到 5:10，兩段三十八秒的短軌把整張碟切成幾塊；台語與華語混用，最長的兩首排在第二軌與第九軌。（本欄由 MB release 的曲目表與逐軌曲長歸納，構成它的原始值都在 facts 裡。）",
 keyTracks:["夜晚的牠知道","禮物","西邊"],
 status:"full",
 notes:"⚠ **來源品質要標記**：中文維基〈淺堤〉條目頂上掛著 `{{Autobiography}}`（疑似當事人自撰）與 `{{Refimprove}}` 兩個維護模板，**它的沿革敘述沒有行內引註**。本卡的樂團沿革與巡迴細節全部只有這一個來源，**行文請用「條目記」這種具名寫法**（第 128／160 條），不得寫成無出處的斷言。\n**本張查無任何金曲獎或金音創作獎紀錄**：第 33 屆金曲獎與第 13 屆金音創作獎的完整名單都沒有淺堤。**行文不得暗示它得過或入圍過什麼**；樂團的兩筆入圍（〈怪手〉第七屆金音最佳搖滾單曲、《不完整的村莊》第十一屆金音最佳搖滾專輯）都是**入圍未得獎**，而且屬於別的作品。\n**MB 兩筆 release 的廠牌欄都空白**，`label` 留空是對的，**行文不得斷言發行方**。「湯與海音樂有限公司」只出現在 2026 年那張的 release 上。\n**試聽**：`previews.json` 標 ready、`tw:1→1`、collectionId 1594841072、10 軌，逐軌與 MB 相符（第 1 軌兩邊都是〈下南州〉，0:38）。**注意固定試聽若取第 1 軌會取到一段 38 秒的短軌**，本機端可考慮改取第 2 軌（第 157 條的下游關切）。\n**互斥分派——本張獨占「兩段三十八秒短軌」「跨國單曲改寫」「樂團更名沿革」三條線。** 同批《沈默的鉅作》不得重述更名沿革。",
});
W({
 key:"desc4:淺堤 Shallow Levée|沈默的鉅作", artist:"淺堤 Shallow Levée", album:"沈默的鉅作",
 facts:[
  {f:"MusicBrainz release-group 410cec7a 的欄位：title《沈默的鉅作》、artist-credit「淺堤」、first-release-date 2026-06-30、primary-type Album、secondary-types 空、轄下 1 個 XW／Official release，10 軌，廠牌欄填湯與海音樂有限公司。",src:"https://musicbrainz.org/release-group/410cec7a-6e8b-483e-901e-aeb33f692411"},
  {f:"十軌的曲序：〈若是講袂出一句話〉〈沈默的鉅作 (Woah)〉〈在空檔寫詩〉〈3+4=5〉〈Sabrina〉〈愛情氣象台〉〈我咧等〉〈昨日の約束〉〈偷偷去愛〉〈觸碰〉。",src:"https://musicbrainz.org/release/bb51f9f3-7c60-448e-8928-08bb730578f2"},
  {f:"日本廠牌 BIG ROMANTIC RECORDS 的發行公告把本張稱作淺堤的第三張完整專輯，英文盤名《Speak in Silence》，並列出每一軌的中英對照：〈若是講袂出一句話 Speechless〉〈沈默的鉅作（Woah）Speak in Silence (Woah)〉〈在空檔寫詩 A Poem in Between〉〈3+4=5〉〈Sabrina〉〈愛情氣象台 Weather Report〉〈我咧等 I'll Wait〉〈昨日の約束 Promise of Yesterday〉〈偷偷去愛 Dare to Love〉〈觸碰 Out of Reach〉。",src:"https://www.bigromanticrecords.com/single-post/shallow-levee-speak-in-silence-japan-tour-2026"},
  {f:"同一份公告記本張有兩位客座：日本音樂人奇妙礼太郎參與〈昨日の約束〉，韓國薩克斯風演奏家 Kim Oki 參與〈愛情氣象台〉；日本版黑膠由 BIG ROMANTIC RECORDS 於 2026 年 9 月 16 日發行、為灰色彩膠，曲目分 A、B 兩面各五軌。",src:"https://www.bigromanticrecords.com/single-post/shallow-levee-speak-in-silence-japan-tour-2026"},
  {f:"十軌的曲長從〈愛情氣象台〉的 3:03 到〈觸碰〉的 5:17。",src:"https://musicbrainz.org/release/bb51f9f3-7c60-448e-8928-08bb730578f2"},
  {f:"Apple Music 台灣店面的條目（collectionId 6768954827）：標題《沈默的鉅作》、掛名淺堤、10 軌、releaseDate 2026-06-30、notExplicit。",src:"https://music.apple.com/tw/album/6768954827"},
  {f:"中文維基〈淺堤〉的專輯表把本張列為《不完整的村莊》（2020）、《婚禮之途》（2021）之後的第三張，樂團 2015 年成軍於高雄。",src:"https://zh.wikipedia.org/zh-tw/%E6%B7%BA%E5%A0%A4"}
 ],
 hookCandidates:["十軌的中文歌名旁邊，第八首用的是日文","一張碟上同時請來一位日本歌手和一位韓國薩克斯風手"],
 sound:"十軌的曲長從 3:03 到 5:17，最長的一首收尾；黑膠版分成 A、B 兩面各五軌。第六軌有薩克斯風客座，第八軌的歌名與演唱都帶日文。（本欄由 MB release 的逐軌曲長與 BIG ROMANTIC RECORDS 的發行公告歸納，構成它的原始值都在 facts 裡。）",
 keyTracks:["沈默的鉅作 (Woah)","昨日の約束","愛情氣象台"],
 status:"full",
 notes:"**⚠ 冷門軸必須本機人工評分**：本張 2026-06-30 才問世，Last.fm 的 listeners 還沒長起來，絕對分級會把它評成極冷門，而它是正常流通的當代發行、還在同年 9 月出日本黑膠並排了七城巡迴。依 §0.8 錨點制與 `audits/obscurity-recalibration.md`，**本張三軸一律走人工錨點制**（`ratings.source` 記 `manual:depth-rubric`），機器值只作對照、**不得直接採用**。\n**日文曲名要照原文保留**：〈昨日の約束〉的「昨日」與「約束」是日文原題的一部分，**不得改寫成中文**；客座 奇妙礼太郎 是日本音樂人的漢字本名，**照原文抄，不羅馬化**（字元條 2026-08-11 裁定）。Kim Oki 是韓國樂手、來源給的就是拉丁拼寫，維持拉丁。\n**兩個日期不要混**：數位／原盤 2026-06-30（MB 與 Apple 一致），日本黑膠 2026-09-16（BIG ROMANTIC RECORDS）。**卡片年份取 2026**，行文提黑膠時要標明那是日本版。\n**「第三張」有兩個來源**（BIG ROMANTIC 公告與中文維基專輯表），可寫。\n**試聽**：`previews.json` 標 ready、`tw:1→1`、collectionId 6768954827、10 軌，逐軌與 MB 相符（第 1 軌兩邊都是〈若是講袂出一句話〉）。**無異議**。\n**互斥分派——本張獨占「兩位外國客座」「日本黑膠與 A／B 面」「日文曲名」三條線。**\n**本張禁用**：樂團更名沿革、〈怪手〉與紅毛港、《不完整的村莊》的金音入圍（分派給《婚禮之途》）。",
});
fs.writeFileSync(OUT, JSON.stringify(A,null,1));
console.log('now',A.length);
