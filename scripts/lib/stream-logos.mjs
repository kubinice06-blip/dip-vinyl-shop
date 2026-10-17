// 串流平台的簡化 logo（放在印刷卡 QR 中央），座標在 0–100 的方框內。黑白單色（店主 2026-10-17）：底色同 QR 黑，鏤空處白色（卡片底色）。
// 同一組圖元同時給 HTML（toSvg）與 Illustrator 指令碼（build-shop-print-ai.mjs 逐一畫成原生路徑）用。
//   circle {cx, cy, r, fill}｜rrect {x, y, w, h, r, fill}｜poly {pts, fill}｜line {pts, stroke, w}（圓頭粗線）
const quad = (a, c, b, n = 12) => Array.from({ length: n + 1 }, (_, i) => {
  const t = i / n, u = 1 - t;
  return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]].map(v => Math.round(v * 10) / 10);
});
const W = '#ffffff', K = '#1c1b19';
export const LOGOS = {
  spotify: [
    { t: 'circle', cx: 50, cy: 50, r: 50, fill: K },
    { t: 'line', pts: quad([21, 37], [52, 25], [79, 41]), stroke: W, w: 9 },
    { t: 'line', pts: quad([25, 54], [51, 44], [74, 57]), stroke: W, w: 7.5 },
    { t: 'line', pts: quad([29, 69], [50, 61], [69, 71]), stroke: W, w: 6 },
  ],
  apple: [
    { t: 'rrect', x: 0, y: 0, w: 100, h: 100, r: 23, fill: K },
    { t: 'poly', pts: [[44, 33], [78, 24], [78, 33], [44, 42]], fill: W },
    { t: 'rrect', x: 43, y: 33, w: 5, h: 40, r: 0, fill: W },
    { t: 'rrect', x: 73, y: 24, w: 5, h: 41, r: 0, fill: W },
    { t: 'circle', cx: 38, cy: 73, r: 9.5, fill: W },
    { t: 'circle', cx: 68, cy: 65, r: 9.5, fill: W },
  ],
  ytmusic: [
    { t: 'circle', cx: 50, cy: 50, r: 50, fill: K },
    { t: 'circle', cx: 50, cy: 50, r: 31, fill: W },
    { t: 'circle', cx: 50, cy: 50, r: 26, fill: K },
    { t: 'poly', pts: [[42, 37], [42, 63], [64, 50]], fill: W },
  ],
  youtube: [
    { t: 'rrect', x: 0, y: 17, w: 100, h: 66, r: 17, fill: K },
    { t: 'poly', pts: [[40, 33], [40, 67], [69, 50]], fill: W },
  ],
  bandcamp: [
    { t: 'rrect', x: 0, y: 0, w: 100, h: 100, r: 18, fill: K },
    { t: 'poly', pts: [[20, 68], [43, 32], [80, 32], [57, 68]], fill: W },
  ],
};

// 連結 → logo 名（YouTube 影片與 YT Music 專輯頁分開）
export const logoOf = (platform, url) => platform === 'yt' ? (/music\.youtube\.com/.test(url) ? 'ytmusic' : 'youtube') : platform;

const pts = p => p.map(([x, y]) => `${x},${y}`).join(' ');
export const toSvg = prims => prims.map(p =>
  p.t === 'circle' ? `<circle cx="${p.cx}" cy="${p.cy}" r="${p.r}" fill="${p.fill}"/>`
  : p.t === 'rrect' ? `<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="${p.r}" fill="${p.fill}"/>`
  : p.t === 'poly' ? `<polygon points="${pts(p.pts)}" fill="${p.fill}"/>`
  : `<polyline points="${pts(p.pts)}" fill="none" stroke="${p.stroke}" stroke-width="${p.w}" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
