# 用法：python3 mk-hook.py <批> <輸出> <risks檔> <參考批 例 c187>
import sys,io,json,re,collections
B,OUT,RF,REF=sys.argv[1:5]
SP='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad'
import os
HERE=os.path.dirname(os.path.abspath(__file__))
ROOT=os.path.abspath(os.path.join(HERE,'..','..'))
t=io.open(f'{HERE}/hook-template.md',encoding='utf-8').read()
n=int(B[1:]); ORD=os.environ.get('ORD') or {183:'一',184:'二',185:'三',186:'四',187:'五',188:'六',189:'七',190:'八',191:'九'}.get(n,str(n))
def rows(p):
    j=json.load(open(p)); return j if isinstance(j,list) else list(j.values())
ra=rows(f'{ROOT}/desc-tools/batches/research/{B}-a.json'); rb=rows(f'{ROOT}/desc-tools/batches/research/{B}-b.json')
cards=rows(f'{ROOT}/desc-tools/batches/cards/{B}-cards.json')
y=[c['year'] for c in cards if c.get('year')]
hdr=io.open(f'{ROOT}/batch-progress/{B}/rulings.md',encoding='utf-8').read()
m=re.search(r'a 組編號區間 (\d+)–(\d+)、b 組 (\d+)–(\d+)',hdr); CURR=f'{m[1]}–{m[2]}（a）／{m[3]}–{m[4]}（b）'
r=re.search(r'研究 a (\d+)–(\d+)、b (\d+)–(\d+)',hdr); RESR=f'{r[1]}–{r[2]}（a）／{r[3]}–{r[4]}（b）'
h=re.search(r'預留[^：]*：鉤子 (\d+)–(\d+)',hdr); RH=f'{h[1]}–{h[2]}'
def budget(x):
    hk,nt=x.get('hook',''),x.get('note','')
    v=len(hk)+len(nt)-nt.count('主故事：')*4-nt.count('→')-nt.count('正文只寫上列各項。')*9-nt.count('這條骨架全批只走本張。')*11
    return v
bm=[]
for g in 'ab':
    hr=rows(f'{ROOT}/desc-tools/batches/hooks/{REF}-hooks-{g}.json')
    bm.append(f'`{REF}-hooks-{g}.json` {len(hr)} 筆＝**'+'／'.join(str(budget(x)) for x in hr)+'**；')
# 上一次收線的鉤子層條號
rh=io.open(f'{ROOT}/batch-progress/{REF}/rulings.md',encoding='utf-8').read()
mm=re.search(r'鉤子層[^\n]*?（(\d{4})–(\d{4})）',rh)
PREVHOOK=f'`batch-progress/{REF}/rulings.md` 的 **第 {mm[1]}–{mm[2]} 條**（{REF[0]}-{REF[1:]} 鉤子層）。' if mm else f'`batch-progress/{REF}/rulings.md` 的鉤子層那一段。'
PREVHOOK=PREVHOOK.replace(f'（{REF[0]}-{REF[1:]}',f'（c-{REF[1:]}')
# 分軸：本批同掛名 ≥2 張
cnt=collections.Counter(c['artist'] for c in cards)
num={2:'兩',3:'三',4:'四',5:'五',6:'六'}
multi=[(a,k) for a,k in cnt.most_common() if k>=2]
AXES=('／'.join(f'{num.get(k,k)}張 {a}' for a,k in multi)+' 怎麼分軸') if multi else '同掛名跨張：本批零組'
maxb=re.findall(r'^## 第 (\d{4}-B) 條',io.open(f'{ROOT}/batch-progress/c163/rulings-mainline.md',encoding='utf-8').read(),re.M)[-1]
rep=dict(BD=f'c-{n}',ORD=ORD,SPAN=f'{min(y)}–{max(y)}',N=str(len(ra)+len(rb)),NA=str(len(ra)),NB=str(len(rb)),B=B,CURR=CURR,RESR=RESR,
  PREVHOOK=PREVHOOK,MAXB=maxb,REFD=f'c-{REF[1:]}',BACKMEASURE='\n'.join(bm),RISKS=io.open(RF,encoding='utf-8').read().strip(),RH=RH,AXES=AXES)
for k,v in rep.items(): t=t.replace('{{'+k+'}}',v)
if os.environ.get('LINE'): t=t.replace('日本爵士獨立廠牌線 jp-2',os.environ['LINE']).replace('jp-2 線',os.environ['LINE'])
assert not re.findall(r'\{\{\w+\}\}',t), re.findall(r'\{\{\w+\}\}',t)
io.open(OUT,'w',encoding='utf-8').write(t); print(OUT,'ok',len(ra),len(rb),RH,'|',AXES)
