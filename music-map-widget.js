(() => {
  const GENRES = [
    ['jazz', 'Jazz'], ['rock', 'Rock'], ['electronic', 'Electronic'], ['soul', 'Soul & Funk'],
    ['hiphop', 'Hip-hop / R&B'], ['folk', 'Folk'], ['classical', 'Classical'], ['world', 'World Music']
  ];
  const MARKS = [1, 3, 7, 15, 30, 60];
  const ids = GENRES.map(([id]) => id);

  function normalise(data = {}) {
    const credits = Object.fromEntries(ids.map(id => [id, Math.max(0, Number(data.credits?.[id]) || 0)]));
    return { albums: Math.max(0, Number(data.albums) || 0), credits };
  }
  function total(data) { return ids.reduce((n, id) => n + data.credits[id], 0); }
  function at(i, r, cx, cy) { const a = -Math.PI / 2 + i * Math.PI * 2 / GENRES.length; return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }; }
  function milestone(value) { const next = MARKS.find(n => value < n); return next ? `下一節點 ${next}` : '下一節點 120'; }

  function addStyle() {
    if (document.getElementById('musicMapWidgetStyle')) return;
    const style = document.createElement('style'); style.id = 'musicMapWidgetStyle';
    style.textContent = `
      .music-map{border-top:1px solid var(--line,#ddd);border-bottom:1px solid var(--line,#ddd);padding:20px 0;margin:18px 0;color:var(--black,#111)}
      .music-map-head{display:flex;justify-content:space-between;gap:12px;align-items:baseline;margin-bottom:8px}.music-map-kicker{font-size:9px;color:var(--gray,#888);letter-spacing:.12em}.music-map-title{font-size:14px;font-weight:700;letter-spacing:.08em}.music-map-total{font-size:10px;color:var(--gray,#888);white-space:nowrap}
      .music-map-layout{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(180px,.75fr);gap:16px;align-items:center}.music-map-svg{width:100%;max-width:500px;margin:0 auto;display:block}.music-map-svg .grid{fill:none;stroke:var(--line,#ddd);stroke-width:1}.music-map-svg .axis{stroke:var(--line,#ddd);stroke-width:1}.music-map-svg .rail{stroke:var(--line,#ddd);stroke-width:2}.music-map-svg .shape{fill:rgba(17,17,17,.12);stroke:var(--black,#111);stroke-width:2}.music-map-svg .dot{fill:var(--black,#111)}.music-map-svg .node{fill:#fff;stroke:var(--line,#ddd);stroke-width:1.5}.music-map-svg .node.on{fill:var(--black,#111);stroke:var(--black,#111)}.music-map-svg text{fill:var(--black,#111);font-family:var(--mono,monospace);font-size:18px;letter-spacing:.02em}.music-map-svg .val{fill:var(--gray,#888);font-size:14px}.music-map-svg .mobile-label{font-size:24px}.music-map-svg .mobile-value{font-size:18px}
      .music-map-paths{display:grid;gap:7px}.music-map-path{display:grid;grid-template-columns:1fr auto;gap:10px;font-size:10px;border-bottom:1px solid var(--line,#ddd);padding-bottom:6px}.music-map-path span:last-child{color:var(--gray,#888);text-align:right}.music-map-note{margin-top:10px;font-size:10px;line-height:1.7;color:var(--gray,#888)}
      .music-map.compact{padding:16px 0;margin:0 0 12px}.music-map.compact .music-map-layout{grid-template-columns:minmax(0,1fr) 135px;gap:10px}.music-map.compact .music-map-svg{max-width:260px}.music-map.compact .music-map-paths{gap:4px}.music-map.compact .music-map-path{font-size:9px;padding-bottom:4px}.music-map.compact .music-map-note{display:none}.music-map.compact .music-map-title{font-size:12px}
      @media(max-width:520px){.music-map-layout,.music-map.compact .music-map-layout{grid-template-columns:1fr}.music-map:not(.compact) .music-map-svg{max-width:350px}.music-map.compact .music-map-svg{max-width:310px}.music-map.compact .music-map-paths{grid-template-columns:1fr 1fr;gap:5px}.music-map.compact .music-map-path{font-size:8px}.music-map-head{align-items:flex-start;flex-direction:column;gap:3px}}
    `;
    document.head.appendChild(style);
  }

  function chart(data, compact) {
    const mobileFull = !compact && window.matchMedia && window.matchMedia('(max-width: 520px)').matches;
    const cx = 250, cy = 240, radar = 110, nodes = [130, 145, 160, 175, 190, 205], label = compact ? 226 : 244, all = total(data) || 1;
    const polygon = r => GENRES.map((_, i) => { const p = at(i, r, cx, cy); return `${p.x},${p.y}`; }).join(' ');
    const grid = [.25, .5, .75, 1].map(x => `<polygon class="grid" points="${polygon(radar * x)}"/>`).join('');
    const axes = GENRES.map((_, i) => { const p = at(i, radar, cx, cy); return `<line class="axis" x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}"/>`; }).join('');
    const rails = GENRES.map((_, i) => { const a = at(i, radar + 8, cx, cy), b = at(i, nodes.at(-1), cx, cy); return `<line class="rail" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`; }).join('');
    const path = GENRES.map(([id], i) => { const p = at(i, radar * data.credits[id] / all, cx, cy); return `${i ? 'L' : 'M'} ${p.x} ${p.y}`; }).join(' ') + ' Z';
    const points = GENRES.map(([id], i) => { const p = at(i, radar * data.credits[id] / all, cx, cy); return `<circle class="dot" cx="${p.x}" cy="${p.y}" r="3"/>`; }).join('');
    const mapNodes = GENRES.map(([id], i) => MARKS.map((m, j) => { const p = at(i, nodes[j], cx, cy); return `<circle class="node ${data.credits[id] >= m ? 'on' : ''}" cx="${p.x}" cy="${p.y}" r="4.5"/>`; }).join('')).join('');
    const mobileLabels = [
      [250,-18,'middle'], [460,62,'end'], [478,193,'end'], [460,428,'end'],
      [250,492,'middle'], [40,428,'start'], [22,193,'start'], [40,62,'start']
    ];
    const labels = GENRES.map(([id, name], i) => {
      const p = mobileFull ? { x:mobileLabels[i][0], y:mobileLabels[i][1] } : at(i, label, cx, cy);
      const anchor = mobileFull ? mobileLabels[i][2] : (p.x < 210 ? 'end' : p.x > 290 ? 'start' : 'middle');
      const value = data.credits[id];
      return `<text class="${mobileFull ? 'mobile-label' : ''}" x="${p.x}" y="${p.y}" text-anchor="${anchor}">${compact ? name.split(' ')[0] : name}</text><text class="val ${mobileFull ? 'mobile-value' : ''}" x="${p.x}" y="${p.y + (mobileFull ? 24 : 12)}" text-anchor="${anchor}">${value} 點 · ${Math.round(value / all * 100)}%</text>`;
    }).join('');
    return `<svg class="music-map-svg" viewBox="${mobileFull ? '0 -50 500 600' : '-115 -30 730 570'}" role="img" aria-label="聆聽品味分布圖">${grid}${axes}${rails}<path class="shape" d="${path}"/>${points}${mapNodes}${labels}</svg>`;
  }

  function render(target, source, compact, message = '') {
    const state = normalise(source), all = total(state);
    const ranked = GENRES.slice().sort((a, b) => state.credits[b[0]] - state.credits[a[0]]);
    const paths = (compact ? ranked.slice(0, 4) : GENRES).map(([id, name]) => `<div class="music-map-path"><span>${name}</span><span>${state.credits[id]} 點 · ${milestone(state.credits[id])}</span></div>`).join('');
    target.className = `music-map${compact ? ' compact' : ''}`;
    target.innerHTML = `<div class="music-map-head"><div><div class="music-map-kicker">MY COLLECTION · PERMANENT DATA</div><div class="music-map-title">我的聆聽品味地圖</div></div><div class="music-map-total">收藏 ${state.albums} 張<br>曲風點數 ${all}</div></div><div class="music-map-layout"><div>${chart(state, compact)}</div><div class="music-map-paths">${paths}</div></div><div class="music-map-note">中央八角圖是各曲風在你的收藏中所占比例；外側節點是固定的收藏里程碑。跨界專輯會同時點亮兩條路徑。</div>${message ? `<div class="music-map-note">${message}</div>` : ''}`;
  }

  window.DipMusicMap = { empty: () => normalise(), normalise, mount(target, opts = {}) { addStyle(); let data = normalise(opts.data), message = opts.message || ''; render(target, data, !!opts.compact, message); return { update(next, nextMessage = '') { data = normalise(next); message = nextMessage; render(target, data, !!opts.compact, message); } }; } };
})();
