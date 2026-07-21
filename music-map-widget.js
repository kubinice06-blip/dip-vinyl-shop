(() => {
  const GENRES = [
    ['jazz', 'Jazz'], ['rock', 'Rock'], ['electronic', 'Electronic'], ['soul', 'Soul & Funk'],
    ['hiphop', 'Hip-hop / R&B'], ['folk', 'Folk'], ['classical', 'Classical'], ['world', 'World Music'],
    ['pop', 'Pop'], ['blues', 'Blues']
  ];
  const GENRE_ZH = { jazz: '爵士', rock: '搖滾', electronic: '電子', soul: '靈魂', hiphop: '嘻哈', folk: '民謠', classical: '古典', world: '世界', pop: '流行', blues: '藍調' };
  const MARKS = [1, 3, 7, 15, 30, 60, 120, 250, 500, 1000];
  const ids = GENRES.map(([id]) => id);

  function normalise(data = {}) {
    const credits = Object.fromEntries(ids.map(id => [id, Math.max(0, Number(data.credits?.[id]) || 0)]));
    return { albums: Math.max(0, Number(data.albums) || 0), untagged: Math.max(0, Number(data.untagged) || 0), credits };
  }
  function total(data) { return ids.reduce((n, id) => n + data.credits[id], 0); }
  function at(i, r, cx, cy) { const a = -Math.PI / 2 + i * Math.PI * 2 / GENRES.length; return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }; }
  function levelRatio(value) {
    const completed = MARKS.filter(mark => mark <= value).length;
    if (completed >= MARKS.length) return 1;
    const previous = completed ? MARKS[completed - 1] : 0;
    const next = MARKS[completed];
    const fraction = Math.max(0, Math.min(1, (value - previous) / (next - previous)));
    return (completed + fraction) / MARKS.length;
  }
  function milestone(value) { const next = MARKS.find(n => value < n); return next ? `下一節點 ${next}` : '已滿級'; }
  function ranking(data) {
    const state = normalise(data);
    return GENRES.slice().sort((a, b) => state.credits[b[0]] - state.credits[a[0]])
      .map(([id, name]) => ({ id, name, zh: GENRE_ZH[id] || id, value: state.credits[id] }));
  }
  function summary(data) {
    const state = normalise(data);
    return { albums: state.albums, untagged: state.untagged, points: total(state), top: ranking(state).filter(g => g.value > 0).slice(0, 2) };
  }
  function thumb(data) {
    const state = normalise(data), cx = 110, cy = 110, radar = 95;
    const polygon = r => GENRES.map((_, i) => { const p = at(i, r, cx, cy); return `${p.x},${p.y}`; }).join(' ');
    const path = GENRES.map(([id], i) => { const p = at(i, radar * levelRatio(state.credits[id]), cx, cy); return `${i ? 'L' : 'M'} ${p.x} ${p.y}`; }).join(' ') + ' Z';
    return `<svg class="music-map-thumb" viewBox="0 0 220 220" role="img" aria-label="聆聽品味縮圖"><polygon class="grid" points="${polygon(radar)}"/><polygon class="grid" points="${polygon(radar / 2)}"/><path class="shape" d="${path}"/></svg>`;
  }
  function titleFor(id, value) { const genre = GENRE_ZH[id] || id; return value >= 500 ? `${genre}藏家傳奇` : value >= 60 ? `${genre}行家` : value >= 7 ? `${genre}探索者` : ''; }

  function addStyle() {
    if (document.getElementById('musicMapWidgetStyle')) return;
    const style = document.createElement('style'); style.id = 'musicMapWidgetStyle';
    style.textContent = `
      .music-map{border-top:1px solid var(--line,#ddd);border-bottom:1px solid var(--line,#ddd);padding:20px 0;margin:18px 0;color:var(--black,#111)}
      .music-map-head{display:flex;justify-content:space-between;gap:12px;align-items:baseline;margin-bottom:8px}.music-map-kicker{font-size:9px;color:var(--gray,#888);letter-spacing:.12em}.music-map-title{font-size:14px;font-weight:700;letter-spacing:.08em}.music-map-total{font-size:10px;color:var(--gray,#888);white-space:nowrap}
      .music-map-layout{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(180px,.75fr);gap:16px;align-items:center}.music-map-svg{width:100%;max-width:500px;margin:0 auto;display:block}.music-map-svg .grid{fill:none;stroke:var(--line,#ddd);stroke-width:1}.music-map-svg .axis{stroke:var(--line,#ddd);stroke-width:1}.music-map-svg .axis.selected{stroke:var(--black,#111);stroke-width:2}.music-map-svg .axis-hit{stroke:transparent;stroke-width:24;pointer-events:stroke;cursor:pointer}.music-map-svg .rail{stroke:var(--line,#ddd);stroke-width:2}.music-map-svg .shape{fill:rgba(17,17,17,.12);stroke:var(--black,#111);stroke-width:2;will-change:d}.music-map-svg .dot{fill:var(--black,#111)}.music-map-svg .node{fill:#fff;stroke:var(--line,#ddd);stroke-width:1.5;transform-box:fill-box;transform-origin:center}.music-map-svg .node.on{fill:var(--black,#111);stroke:var(--black,#111)}.music-map-svg .node.just-lit{animation:mapNodePulse .75s ease-out}.music-map-svg text{fill:var(--black,#111);font-family:var(--mono,monospace);font-size:18px;letter-spacing:.02em}.music-map-svg .val{fill:var(--gray,#888);font-size:14px}.music-map-svg .mobile-label{font-size:24px}.music-map-svg .mobile-value{font-size:18px}@keyframes mapNodePulse{35%{transform:scale(2);opacity:.45}100%{transform:scale(1);opacity:1}}
      .music-map-paths{display:grid;gap:7px}.music-map-path{display:grid;grid-template-columns:1fr auto;gap:10px;font-size:10px;border-bottom:1px solid var(--line,#ddd);padding-bottom:6px}.music-map-path-name{min-width:0}.music-map-path-title{display:block;margin-top:2px;font-size:8px;color:var(--gray,#888);font-weight:700;letter-spacing:.06em}.music-map-path-button{width:100%;font:inherit;color:inherit;background:none;border:0;border-bottom:1px solid var(--line,#ddd);text-align:left;cursor:pointer}.music-map-path-button.selected{background:var(--black,#111);color:#fff;padding:6px}.music-map-path span:last-child{color:var(--gray,#888);text-align:right}.music-map-path-button.selected span:last-child,.music-map-path-button.selected .music-map-path-title{color:#ddd}.music-map-path-button:focus-visible,.music-map-svg .axis-hit:focus-visible{outline:2px solid var(--black,#111);outline-offset:2px}.music-map-untagged{font-size:10px;color:var(--gray,#888);padding-top:2px}.music-map-note{margin-top:10px;font-size:10px;line-height:1.7;color:var(--gray,#888)}
      .music-map-thumb{display:block;width:100%;height:100%}.music-map-thumb .grid{fill:none;stroke:var(--line,#ddd);stroke-width:3}.music-map-thumb .shape{fill:rgba(17,17,17,.14);stroke:var(--black,#111);stroke-width:5;stroke-linejoin:round}
      .music-map.compact{padding:16px 0;margin:0 0 12px}.music-map.compact .music-map-layout{grid-template-columns:minmax(0,1fr) 135px;gap:10px}.music-map.compact .music-map-svg{max-width:260px}.music-map.compact .music-map-paths{gap:4px}.music-map.compact .music-map-path{font-size:9px;padding-bottom:4px}.music-map.compact .music-map-note{display:none}.music-map.compact .music-map-title{font-size:12px}
      @media(max-width:520px){.music-map-layout,.music-map.compact .music-map-layout{grid-template-columns:1fr}.music-map:not(.compact) .music-map-svg{max-width:350px}.music-map.compact .music-map-svg{max-width:310px}.music-map.compact .music-map-paths{grid-template-columns:1fr 1fr;gap:5px}.music-map.compact .music-map-path{font-size:8px}.music-map-head{align-items:flex-start;flex-direction:column;gap:3px}}
    `;
    document.head.appendChild(style);
  }

  function chart(data, compact, interactive, selected) {
    const mobileFull = !compact && window.matchMedia && window.matchMedia('(max-width: 520px)').matches;
    const cx = 250, cy = 240, radar = 110, nodes = MARKS.map((_, i) => 128 + i * 9.5), label = compact ? 226 : 244, all = total(data) || 1;
    const polygon = r => GENRES.map((_, i) => { const p = at(i, r, cx, cy); return `${p.x},${p.y}`; }).join(' ');
    const grid = [.25, .5, .75, 1].map(x => `<polygon class="grid" points="${polygon(radar * x)}"/>`).join('');
    const axes = GENRES.map(([id], i) => { const p = at(i, radar, cx, cy); return `<line class="axis ${selected === id ? 'selected' : ''}" x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}"/>`; }).join('');
    const rails = GENRES.map((_, i) => { const a = at(i, radar + 8, cx, cy), b = at(i, nodes.at(-1), cx, cy); return `<line class="rail" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`; }).join('');
    const path = GENRES.map(([id], i) => { const p = at(i, radar * levelRatio(data.credits[id]), cx, cy); return `${i ? 'L' : 'M'} ${p.x} ${p.y}`; }).join(' ') + ' Z';
    const points = GENRES.map(([id], i) => { const p = at(i, radar * levelRatio(data.credits[id]), cx, cy); return `<circle class="dot" cx="${p.x}" cy="${p.y}" r="3"/>`; }).join('');
    const mapNodes = GENRES.map(([id], i) => MARKS.map((m, j) => { const p = at(i, nodes[j], cx, cy); return `<circle class="node ${data.credits[id] >= m ? 'on' : ''}" data-map-node="${id}-${m}" cx="${p.x}" cy="${p.y}" r="4"/>`; }).join('')).join('');
    const axisHits = interactive ? GENRES.map(([id, name], i) => { const p = at(i, nodes.at(-1), cx, cy); return `<line class="axis-hit" data-map-genre="${id}" role="button" tabindex="0" aria-label="查看 ${name} 收藏" x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}"/>`; }).join('') : '';
    const mobileLabels = [
      [250,-18,'middle'], [455,45,'end'], [478,155,'end'], [478,330,'end'], [455,440,'end'],
      [250,492,'middle'], [45,440,'start'], [22,330,'start'], [22,155,'start'], [45,45,'start']
    ];
    const labels = GENRES.map(([id, name], i) => {
      const p = mobileFull ? { x:mobileLabels[i][0], y:mobileLabels[i][1] } : at(i, label, cx, cy);
      const anchor = mobileFull ? mobileLabels[i][2] : (p.x < 210 ? 'end' : p.x > 290 ? 'start' : 'middle');
      const value = data.credits[id];
      return `<text class="${mobileFull ? 'mobile-label' : ''}" x="${p.x}" y="${p.y}" text-anchor="${anchor}">${compact ? name.split(' ')[0] : name}</text><text class="val ${mobileFull ? 'mobile-value' : ''}" x="${p.x}" y="${p.y + (mobileFull ? 24 : 12)}" text-anchor="${anchor}">${value} 點</text>`;
    }).join('');
    return `<svg class="music-map-svg" viewBox="${mobileFull ? '0 -50 500 600' : '-115 -30 730 570'}" role="${interactive ? 'group' : 'img'}" aria-label="聆聽品味分布圖">${grid}${axes}${rails}<path class="shape" d="${path}"/>${points}${mapNodes}${axisHits}${labels}</svg>`;
  }

  function render(target, source, compact, message = '', interactive = false, selected = '') {
    const state = normalise(source), all = total(state);
    const ranked = GENRES.slice().sort((a, b) => state.credits[b[0]] - state.credits[a[0]]);
    const paths = (compact ? ranked.slice(0, 4) : GENRES).map(([id, name]) => {
      const title = titleFor(id, state.credits[id]), label = `<span class="music-map-path-name">${name}${title ? `<small class="music-map-path-title">${title}</small>` : ''}</span>`;
      return interactive
        ? `<button type="button" class="music-map-path music-map-path-button ${selected === id ? 'selected' : ''}" data-map-genre="${id}">${label}<span>${state.credits[id]} 點 · ${Math.round(state.credits[id] / (all || 1) * 100)}% · ${milestone(state.credits[id])}</span></button>`
        : `<div class="music-map-path">${label}<span>${state.credits[id]} 點 · ${Math.round(state.credits[id] / (all || 1) * 100)}% · ${milestone(state.credits[id])}</span></div>`;
    }).join('');
    target.className = `music-map${compact ? ' compact' : ''}`;
    target.innerHTML = `<div class="music-map-head"><div><div class="music-map-kicker">MY COLLECTION · PERMANENT DATA</div><div class="music-map-title">我的聆聽品味地圖</div></div><div class="music-map-total">收藏 ${state.albums} 張<br>曲風點數 ${all}</div></div><div class="music-map-layout"><div>${chart(state, compact, interactive, selected)}</div><div class="music-map-paths">${paths}${compact ? '' : `<div class="music-map-untagged">未分類 ${state.untagged} 張</div>`}</div></div><div class="music-map-note">中央十角圖顯示各路徑的里程碑等級；外側十顆節點代表 1 到 1000 張收藏。跨界專輯會同時點亮兩條路徑。</div>${message ? `<div class="music-map-note">${message}</div>` : ''}`;
  }

  function animateUpdate(target, previous, next) {
    if (!target.querySelector || !window.requestAnimationFrame || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const shape = target.querySelector('.shape'), dots = [...target.querySelectorAll('.dot')];
    if (!shape || dots.length !== GENRES.length) return;
    const cx = 250, cy = 240, radar = 110;
    const from = GENRES.map(([id], i) => at(i, radar * levelRatio(previous.credits[id]), cx, cy));
    const to = GENRES.map(([id], i) => at(i, radar * levelRatio(next.credits[id]), cx, cy));
    const started = performance.now(), duration = 650;
    const frame = now => {
      const progress = Math.min(1, (now - started) / duration), eased = 1 - Math.pow(1 - progress, 3);
      const points = from.map((point, i) => ({ x: point.x + (to[i].x - point.x) * eased, y: point.y + (to[i].y - point.y) * eased }));
      shape.setAttribute('d', points.map((point, i) => `${i ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ') + ' Z');
      dots.forEach((dot, i) => { dot.setAttribute('cx', points[i].x); dot.setAttribute('cy', points[i].y); });
      if (progress < 1) window.requestAnimationFrame(frame);
    };
    window.requestAnimationFrame(frame);
    GENRES.forEach(([id]) => MARKS.forEach(mark => { if (previous.credits[id] < mark && next.credits[id] >= mark) target.querySelector(`[data-map-node="${id}-${mark}"]`)?.classList.add('just-lit'); }));
  }

  window.DipMusicMap = { marks: [...MARKS], levelRatio, empty: () => normalise(), normalise, titleFor, ranking, summary, thumb, mount(target, opts = {}) { addStyle(); let data = normalise(opts.data), message = opts.message || '', selected = ''; const interactive = typeof opts.onGenreSelect === 'function'; const select = id => { if (!ids.includes(id)) return; selected = id; render(target, data, !!opts.compact, message, interactive, selected); opts.onGenreSelect?.(id); }; if (interactive) { target.addEventListener('click', event => { const hit = event.target.closest?.('[data-map-genre]'); if (hit) select(hit.dataset.mapGenre); }); target.addEventListener('keydown', event => { if (event.key !== 'Enter' && event.key !== ' ') return; const hit = event.target.closest?.('.axis-hit'); if (!hit) return; event.preventDefault(); select(hit.dataset.mapGenre); }); } render(target, data, !!opts.compact, message, interactive, selected); return { update(next, nextMessage = '') { const previous = data; data = normalise(next); message = nextMessage; render(target, data, !!opts.compact, message, interactive, selected); animateUpdate(target, previous, data); }, select }; } };
})();
