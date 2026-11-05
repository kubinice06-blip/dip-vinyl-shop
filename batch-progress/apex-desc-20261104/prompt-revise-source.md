# 改稿派工詞：拿掉簡介裡的出處（apex-desc，2026-11-04 店主新規）

店主今天補了一條規則（`desc-tools/prompts/apex-desc-base.md`「語氣」節）：
**「要有明確出處沒錯，但介紹裡不用寫出處。」** 不寫「Pitchfork 評為」「AllMusic 稱」「某樂評人認為」「Lester Bangs 說」
「《紐約時報》稱」「據內頁文字」這類引述，直接把查到的評價與事實寫成敘述；評價用「常被列為／被視為」帶出。
葛萊美、Billboard／Oricon 排行、Mercury Prize、日本唱片大賞、美國國會圖書館國家錄音登記表、葛萊美名人堂、金氏世界紀錄這類**獎項、官方排行與官方登錄本身就是事實，照寫**。

你只寫自己的輸出檔；不上網、不碰 git、KV、seed。

1. 先讀 `/home/user/dip-vinyl-shop/desc-tools/prompts/apex-desc-base.md` 全文（範本讀兩遍：馬世芳的評價寫成「常被列為台灣有史以來最重要的唱片之一」，沒點名）。
2. 輸入（已上線的稿）：`/home/user/dip-vinyl-shop/desc-tools/batches/output/{BATCH}-out-1.json` 與 `-out-2.json`，共 30 張。
   研究稿 `/home/user/dip-vinyl-shop/desc-tools/batches/research/{BATCH}-{a,b,c}.json` 可查回原始事實。
3. 逐張改：
   - **媒體榜單與樂評引述**（Pitchfork／Rolling Stone 500 大／NME／Mojo／AllMusic／Les Inrocks／Ben Ratliff 的書／Penguin Guide／DownBeat 星等／某報稱……）→ 去掉媒體與人名，改成有所本的敘述：
     「常被列進 1970 年代最佳專輯的榜單」「常被列為法語流行樂史上最好的專輯」「常被視為調式爵士的代表作」「被視為 trip-hop 的高峰」。
     多份榜單都排前面的，可寫「常被列為……最重要的專輯之一」；只有單一來源的，用較保守的說法（「被視為」「評價很高」），**不要升級成更響亮的封號**。
   - **樂手、製作人、作家的話**（「Keith Richards 說」「Flea 說它改變了……」「團員說」「傳記作者形容」）→ 能寫成事實就寫成事實（「影響了 Flea 等貝斯手的彈法」「鳥叫是窗戶開著時意外錄進去的」），寫不成事實的評語就刪。
   - 葛萊美、Billboard、Oricon、Mercury、國家錄音登記表、葛萊美名人堂等照留。
   - 其他句子**不要動**（事實、聲音段、錄音經過都已審過）；只有刪掉出處後句子不通順、或字數掉到 200 以下，才補研究稿裡已有的事實。
   - 字數維持 **200–280**（`Array.from(desc).length`），格式紀律照舊（全形標點、中英間空格、《》〈〉）。
4. 輸出：覆寫同名檔 `{BATCH}-out-1.json`、`{BATCH}-out-2.json`（格式不變 `{key,artist,album,desc}`，順序不變）。
   原稿已備份為 `.v1.json`，不要動備份。
5. **每改完 5 張就寫回輸出檔**。**若輸出檔裡已有改過的張（對照 .v1.json 已不同），從尚未改的接續，不要從頭重來。**
6. 另寫一份 `/home/user/dip-vinyl-shop/batch-progress/apex-desc-20261104/revise-{BATCH}.json`：
   `[{"key","removed":["拿掉的出處片段"],"now":"改成的說法"}]`，沒動的卡也列 `removed: []`。
7. 做完自己量字數，回報：改了幾張、字數範圍。簡短。
