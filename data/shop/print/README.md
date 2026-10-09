# 店內紙本介紹卡（A6）

- 尺寸：A6 直式 105×148mm（預設）或 A7 直式 74×105mm（`--size a7`），無邊界，一張一頁。A6 內文 10.2pt、A7 內文 9pt（行距 1.5；10pt 會有 57 張塞不下）、專輯名 10.5pt。
- 內容：店名、頂點標示（殿堂／流亡／異端色塊徽章，無外框）、曲風（中文＋英文）、藝人、專輯名、三軸星等（讀 seed_cards.json；頂點卡對應軸滿 7 顆，與前台相同）、門市版介紹（`data/shop/descs.json`）、壓片年／品相（Notion 有填才顯示）、售價。不放封面。
- 產生：`node scripts/build-shop-print.mjs`（全部在售，依曲風排序）或 `--ids <Notion 頁面 id,…> --out <檔名>`。
- 轉 PDF：用 Chrome 開 HTML → 列印 → 紙張選 A6、邊界「無」、勾「背景圖形」；或用 Playwright `page.pdf({ width: '105mm', height: '148mm', printBackground: true })`。
- 後台改過的門市版文字存在 Firestore，不在 descs.json；要印改過的版本，先把改動同步回 descs.json。
- Illustrator 可編輯版：`shop-a7.jsx`／`shop-a6.jsx`（`node scripts/build-shop-print-ai.mjs --size a7|a6` 從對應 HTML 量版面產生）。Illustrator → 檔案 → 指令碼 → 其他指令碼… 選 .jsx，會開新文件、一張卡一個工作區域（CMYK），介紹是一個可直接改字、自動換行的區域文字框，其餘是點文字、線條、色塊。先裝字型（Google Fonts 免費）：Noto Serif TC、Noto Sans TC、IBM Plex Mono；沒裝會改用思源宋體／黑體 TC，再沒有就用預設字並在結束時列出缺哪些。介紹文字若改到框內放不下，結束訊息會列出是哪幾張。
- A4 拼版（A7 八張一頁）：`shop-a7-a4.html`／`shop-a7-a4.pdf`（`node scripts/build-shop-print.mjs --size a7 --sheet a4`），A4 橫式 297×210mm，4 欄 × 2 列，左右各留 0.5mm，卡緣淺灰虛線為裁切線；印表機選 A4 橫向、實際大小（不要縮放）。Illustrator 版 `shop-a7-a4.jsx`（`node scripts/build-shop-print-ai.mjs --size a7 --sheet a4`），一頁一個 A4 工作區域，裁切線是名為 cut 的虛線框。
