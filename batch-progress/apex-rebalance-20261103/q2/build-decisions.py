# Q2：合併代理判定＋主線裁定 → decisions-q2.json
import json,collections
D='batch-progress/apex-rebalance-20261103/'; Q=D+'q2/'
seed=json.load(open('seed_cards.json')); S={r[0]+'|'+r[1]:r for r in seed}
pc={x['key']:x for x in json.load(open(D+'pearl-candidates.json'))}
hc={x['key']:x for x in json.load(open(D+'heresy-candidates.json'))}
L=lambda x:x['listeners'] if x.get('listeners') is not None else x.get('listenersKV')
ex=json.load(open(Q+'extra-evidence.json'))
def lis(k):
    if k in pc: return L(pc[k])
    if k in hc: return hc[k]['listeners']
    return None
out=[]; log=[]
# ---- 異端 ----
DROP_H={ # 主線裁定：代理 yes/maybe 但不收
 'Keiji Haino|Watashi Dake?':'同一人（灰野敬二）已取不失者，同場景不重複',
 "Les Rallizes Dénudés|'77 Live":'代理自評歌曲律動清楚、入門首選：聽得下去，不收',
 'The Shaggs|Philosophy of the World':'outsider 崩離但聽感可愛，非極端難入耳，不收',
 'Pierre Schaeffer|Musique concrète':'盤名疑為合輯、身分未確，不收',
 'Reinbert de Leeuw|Ustvolskaya: Trio / Piano Sonata no. 5 / Duet':'同作曲家已取 Malov《Dies Irae》',
 '高柳昌行ニュー・ディレクション・ユニット|Live at Moers Festival':'高柳系已有現有異端雙人盤＋本批《Eclipse》流亡，不再擠',
 '高柳昌行|Eclipse/侵蝕':'同一張改判流亡（原壓 100 張，稀有性比極端性更獨一）',
 'David Tudor|Microphone':None,
}
for s in ['HS1','HS2']:
    for v in json.load(open(Q+f'verdicts/{s}.json')):
        k=v['key']
        if not k or v['verdict']=='no': continue
        if DROP_H.get(k): log.append(('heresy-drop',k,DROP_H[k])); continue
        out.append({'key':k,'from':None,'to':'heresy','why':v['why'],'evidence':v['evidence'],'listeners':lis(k),'score':v['score'],'src':s})
EXTRA_H=[ # 新規則（同級內一藝人一張）放寬後，其他級已有頂點的藝人
 ('Incapacitants|Quietus','日本 harsh noise 雙人組代表作，全程高密度回授尖嘯噪音牆，日本噪音第二波核心；該團頂點原只在流亡',['https://en.wikipedia.org/wiki/Incapacitants'],8),
 ('Maurizio Bianchi|Symphony for a Genocide','義大利 power electronics 奠基作，以集中營為題的工業噪音長篇，被視為最陰森的早期工業噪音之一',['https://en.wikipedia.org/wiki/Maurizio_Bianchi'],7),
 ('Mazen Kerbaj|Solo Trumpet Vol. 2.1: No Cuts, No Overdubs, No Use of Electronics','純原聲小號延伸技法做出近似電子噪音的嘶鳴、氣爆與尖嘯，標題即宣示無剪接無電子',['https://en.wikipedia.org/wiki/Mazen_Kerbaj'],6),
 ('John Lennon|Unfinished Music No. 1: Two Virgins','磁帶拼貼、尖叫與雜音的前衛實驗，被普遍視為最難聽的大牌搖滾明星唱片之一',['https://en.wikipedia.org/wiki/Unfinished_Music_No._1:_Two_Virgins'],6),
]
for k,why,ev,sc in EXTRA_H:
    assert k in S, k
    out.append({'key':k,'from':None,'to':'heresy','why':why+'（主線補）','evidence':ev+ex[k],'listeners':None,'score':sc,'src':'main'})
# ---- 流亡 ----
SCORE4={'İlhan Mimaroğlu|Wings of the Delirious Demon and Other Electronic Works':'電子/極簡/音響','Francis Monkman|Energism':'電子/極簡/音響','Zoviet France|Norsch':'電子/極簡/音響','Philemon Arthur and the Dung|Philemon Arthur and the Dung':'民謠/私民謠','Barney Wilen|Zodiac':'靈性/自由爵士','Svein Finnerud Trio|Plastic Sun':'迷幻/車庫','The Ric Colbeck Quartet|The Sun Is Coming Up':'靈性/自由爵士','The Piano Choir|Handscapes':'靈性/自由爵士','Muriel Winston|A Fresh Viewpoint':'靈性/自由爵士','Rien Djamain|Api Asmara':'雷鬼/非洲/世界','Evan Parker & Barry Guy|Incision':'自由即興','Transs|Hotel San Vicente':'其他','Angkanang Kunchai With Ubon-Pattana Band|Isan Lam Plearn':'雷鬼/非洲/世界','Tyrone Evans|Sings Bullwackie Style':'雷鬼/非洲/世界'}
EXTRA_EV={'Philemon Arthur and the Dung|Philemon Arthur and the Dung':['https://sv.wikipedia.org/wiki/Philemon_Arthur_and_the_Dung'],'Barney Wilen|Zodiac':['https://en.wikipedia.org/wiki/Barney_Wilen'],'Francis Monkman|Energism':['https://en.wikipedia.org/wiki/Francis_Monkman'],'Evan Parker & Barry Guy|Incision':['https://en.wikipedia.org/wiki/Barry_Guy'],'Angkanang Kunchai With Ubon-Pattana Band|Isan Lam Plearn':['https://www.forcedexposure.com/Catalog/EM.1126CD.html']}
pv={}
for s in ['PS1','PS2','PS3','PS4']:
    for v in json.load(open(Q+f'verdicts/{s}.json')):
        v['src']=s; pv[v['artist']]=v
for a,v in pv.items():
    k=v['key']
    if v['verdict']=='no' or not k:
        continue
    out.append({'key':k,'from':None,'to':'pearl','why':v['why'],'evidence':v['evidence'],'listeners':lis(k),'score':v['score'],'scene':v.get('scene'),'src':v['src']})
for k,sc in SCORE4.items():
    v=pv[k.split('|')[0]]
    out.append({'key':k,'from':None,'to':'pearl','why':v['why']+'（主線補收：代理判 no 是因缺聖杯口碑，但過硬條件：listeners 有效 1–299、非錯配、冷門度 5）','evidence':ex[k]+EXTRA_EV.get(k,[]),'listeners':lis(k),'score':4,'scene':sc,'src':'main'})
# ---- 網址驗證後修補（主線 curl 驗：404／逾時拿掉，補 MusicBrainz／Last.fm）----
BAD={'https://allnightflightrecords.com/products/alvin-curran-canti-e-vedute-del-giardino-magnetico','https://b2b.forcedexposure.com/onesheets/WRWTFWW087C-LP_ST.pdf','https://ubu.punctumbooks.com/sound/wiese.html','https://luvnhaight.kudosrecords.co.uk/release/lhlp036/harry-whittaker-black-renaissance-red-vinyl-edition'}
ADD={'Alvin Curran|Canti e vedute del giardino magnetico':['https://musicbrainz.org/release-group/769995b2-29f4-3e4b-a457-2232bce5ad85'],
 '尾島由郎|Club':['https://www.last.fm/music/%E5%B0%BE%E5%B3%B6%E7%94%B1%E9%83%8E/Club'],
 'John Wiese|Soft Punk':['https://musicbrainz.org/release-group/05b71a7b-e828-323a-b0c8-e80888e8f0fb']}
for d in out:
    d['evidence']=[u for u in d['evidence'] if u not in BAD]+[u for u in ADD.get(d['key'],[]) if u not in d['evidence']]
# ---- 檢查 ----
for d in out:
    r=S[d['key']]; assert not (len(r)>8 and r[8]), d['key']
    if d['to']=='heresy': assert r[4]>=5,(d['key'],r[2:5])
    else:
        assert r[3]>=5 and isinstance(d['listeners'],int) and 1<=d['listeners']<=299,(d['key'],d['listeners'])
    assert len(set(d['evidence']))>=2,(d['key'],d['evidence'])
keys=[d['key'] for d in out]; assert len(keys)==len(set(keys))
for t in ['heresy','pearl']:
    c=collections.Counter(d['key'].split('|')[0] for d in out if d['to']==t); assert max(c.values())==1,[a for a in c if c[a]>1]
    ex_art={r[0] for r in seed if len(r)>8 and r[8]==t}; assert not (set(c)&ex_art), set(c)&ex_art
json.dump(out,open(D+'decisions-q2.json','w'),ensure_ascii=False,indent=1)
print(collections.Counter(d['to'] for d in out)); print(collections.Counter(d.get('scene') for d in out if d['to']=='pearl'))
for x in log: print(*x)
