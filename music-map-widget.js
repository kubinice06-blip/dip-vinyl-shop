(() => {
  const GENRES = [
    ['jazz', 'Jazz 爵士'], ['rock', 'Rock 搖滾'], ['electronic', 'Electronic 電子'], ['soul', 'Soul & Funk'],
    ['hiphop', 'Hip-hop / R&B'], ['folk', 'Folk 民謠'], ['classical', 'Classical 古典'], ['world', 'World Music']
  ];
  const MARKS = [1, 3, 7, 15, 30, 60];
  const SAMPLE = { albums: 31, credits: { jazz: 8, rock: 5, electronic: 3, soul: 2, hiphop: 6, folk: 1, classical: 4, world: 2 } };

  function addStyle(){
    if(document.getElementById('musicMapWidgetStyle')) return;
    const style=document.createElement('style'); style.id='musicMapWidgetStyle';
    style.textContent=`
      .music-map{border-top:1px solid var(--line,#ddd);border-bottom:1px solid var(--line,#ddd);padding:20px 0;margin:18px 0;color:var(--black,#111)}
      .music-map-head{display:flex;justify-content:space-between;gap:12px;align-items:baseline;margin-bottom:8px}.music-map-kicker{font-size:9px;color:var(--gray,#888);letter-spacing:.12em}.music-map-title{font-size:14px;font-weight:700;letter-spacing:.08em}.music-map-total{font-size:10px;color:var(--gray,#888);white-space:nowrap}
      .music-map-layout{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(180px,.75fr);gap:16px;align-items:center}.music-map-svg{width:100%;max-width:500px;margin:0 auto;display:block}.music-map-svg .grid{fill:none;stroke:var(--line,#ddd);stroke-width:1}.music-map-svg .axis{stroke:var(--line,#ddd);stroke-width:1}.music-map-svg .rail{stroke:var(--line,#ddd);stroke-width:2}.music-map-svg .shape{fill:rgba(17,17,17,.12);stroke:var(--black,#111);stroke-width:2}.music-map-svg .dot{fill:var(--black,#111)}.music-map-svg .node{fill:#fff;stroke:var(--line,#ddd);stroke-width:1.5}.music-map-svg .node.on{fill:var(--black,#111);stroke:var(--black,#111)}.music-map-svg text{fill:var(--black,#111);font-family:var(--mono,monospace);font-size:10px;letter-spacing:.02em}.music-map-svg .val{fill:var(--gray,#888);font-size:9px}
      .music-map-paths{display:grid;gap:7px}.music-map-path{display:grid;grid-template-columns:1fr auto;gap:10px;font-size:10px;border-bottom:1px solid var(--line,#ddd);padding-bottom:6px}.music-map-path span:last-child{color:var(--gray,#888);text-align:right}.music-map-note{margin-top:10px;font-size:10px;line-height:1.7;color:var(--gray,#888)}
      .music-map-preview-controls{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}.music-map-preview-controls button{font:inherit;font-size:10px;letter-spacing:.04em;border:1px solid var(--line,#ddd);background:#fff;color:var(--black,#111);padding:6px 8px;cursor:pointer}.music-map-preview-controls button:hover{background:var(--black,#111);color:#fff;border-color:var(--black,#111)}
      .music-map.compact{padding:16px 0;margin:0 0 12px}.music-map.compact .music-map-layout{grid-template-columns:minmax(0,1fr) 135px;gap:10px}.music-map.compact .music-map-svg{max-width:260px}.music-map.compact .music-map-paths{gap:4px}.music-map.compact .music-map-path{font-size:9px;padding-bottom:4px}.music-map.compact .music-map-note{display:none}.music-map.compact .music-map-title{font-size:12px}.music-map.compact .music-map-preview-controls{display:none}
      @media(max-width:520px){.music-map-layout{grid-template-columns:1fr}.music-map.compact .music-map-layout{grid-template-columns:1fr}.music-map.compact .music-map-svg{max-width:310px}.music-map.compact .music-map-paths{grid-template-columns:1fr 1fr;gap:5px}.music-map.compact .music-map-path{font-size:8px}.music-map-head{align-items:flex-start;flex-direction:column;gap:3px}}
    `;
    document.head.appendChild(style);
  }

  function copySample(){ return { albums:SAMPLE.albums, credits:{...SAMPLE.credits} }; }
  function total(data){ return GENRES.reduce((n,[id])=>n+(data.credits[id]||0),0); }
  function at(i,r,cx,cy){ const a=-Math.PI/2+i*Math.PI*2/GENRES.length; return {x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r}; }
  function nodeText(n){ const lit=MARKS.filter(m=>n>=m); const next=MARKS.find(m=>n<m); return `${lit.length?`已亮 ${lit.join('、')}`:'尚未點亮'}${next?` · 下一站 ${next}`:' · 下一章 120'}`; }

  function chart(data, compact){
    const cx=250, cy=240, radar=110, nodes=[130,145,160,175,190,205], label=compact?226:244, all=total(data)||1;
    const poly=r=>GENRES.map((_,i)=>{const p=at(i,r,cx,cy);return `${p.x},${p.y}`}).join(' ');
    const grid=[.25,.5,.75,1].map(x=>`<polygon class="grid" points="${poly(radar*x)}"/>`).join('');
    const axes=GENRES.map((_,i)=>{const p=at(i,radar,cx,cy);return `<line class="axis" x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}"/>`}).join('');
    const rails=GENRES.map((_,i)=>{const a=at(i,radar+8,cx,cy),b=at(i,nodes.at(-1),cx,cy);return `<line class="rail" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`}).join('');
    const path=GENRES.map(([id],i)=>{const p=at(i,radar*(data.credits[id]||0)/all,cx,cy);return `${i?'L':'M'} ${p.x} ${p.y}`}).join(' ')+' Z';
    const points=GENRES.map(([id],i)=>{const p=at(i,radar*(data.credits[id]||0)/all,cx,cy);return `<circle class="dot" cx="${p.x}" cy="${p.y}" r="3"/>`}).join('');
    const mapNodes=GENRES.map(([id],i)=>MARKS.map((m,j)=>{const p=at(i,nodes[j],cx,cy);return `<circle class="node ${(data.credits[id]||0)>=m?'on':''}" cx="${p.x}" cy="${p.y}" r="4.5"/>`}).join('')).join('');
    const labels=GENRES.map(([id,name],i)=>{const p=at(i,label,cx,cy),anchor=p.x<210?'end':p.x>290?'start':'middle',value=data.credits[id]||0;return `<text x="${p.x}" y="${p.y}" text-anchor="${anchor}">${compact?name.split(' ')[0]:name}</text><text class="val" x="${p.x}" y="${p.y+12}" text-anchor="${anchor}">${value} 點 · ${Math.round(value/all*100)}%</text>`}).join('');
    return `<svg class="music-map-svg" viewBox="0 0 500 480" role="img" aria-label="八大曲風的聆聽喜好分布與永久探索節點">${grid}${axes}${rails}<path class="shape" d="${path}"/>${points}${mapNodes}${labels}</svg>`;
  }

  function render(target, state, compact){
    const ranked=GENRES.slice().sort((a,b)=>(state.credits[b[0]]||0)-(state.credits[a[0]]||0));
    const paths=(compact?ranked.slice(0,4):GENRES).map(([id,name])=>`<div class="music-map-path"><span>${name}</span><span>${state.credits[id]||0} 點 · ${nodeText(state.credits[id]||0)}</span></div>`).join('');
    target.className=`music-map${compact?' compact':''}`;
    target.innerHTML=`
      <div class="music-map-head"><div><div class="music-map-kicker">${compact?'PREVIEW · 永久卡冊':'PREVIEW · 音樂探索地圖'}</div><div class="music-map-title">${compact?'你的聆聽地圖':'八大曲風 · 聆聽喜好與探索路徑'}</div></div><div class="music-map-total">永久收藏 ${state.albums} 張<br>曲風計點 ${total(state)}</div></div>
      <div class="music-map-layout"><div>${chart(state,compact)}</div><div class="music-map-paths">${paths}</div></div>
      <div class="music-map-note">中央八角圖是各曲風的喜好比例；外側圓點是永久節點（1、3、7、15、30、60）。跨界專輯只算 1 張收藏，但可讓兩條路徑各 +1。</div>
      ${compact?'':`<div class="music-map-preview-controls"><button type="button" data-map-add="jazz">模擬收進 Jazz</button><button type="button" data-map-add="hiphop">模擬收進 Hip-hop</button><button type="button" data-map-pair="jazz,hiphop">模擬 Jazz × Hip-hop</button><button type="button" data-map-reset>重設示例</button></div>`}
    `;
    if(!compact){
      target.querySelector('[data-map-add="jazz"]')?.addEventListener('click',()=>{state.albums++;state.credits.jazz++;render(target,state,false);});
      target.querySelector('[data-map-add="hiphop"]')?.addEventListener('click',()=>{state.albums++;state.credits.hiphop++;render(target,state,false);});
      target.querySelector('[data-map-pair]')?.addEventListener('click',()=>{state.albums++;state.credits.jazz++;state.credits.hiphop++;render(target,state,false);});
      target.querySelector('[data-map-reset]')?.addEventListener('click',()=>render(target,copySample(),false));
    }
  }

  window.DipMusicMap={ mount(target,opts={}){ addStyle(); const state=opts.data?{albums:opts.data.albums,credits:{...opts.data.credits}}:copySample(); render(target,state,!!opts.compact); } };
})();
