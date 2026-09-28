# 用法：python3 mk-writer.py <批> <1|2> <輸出> <second檔> <risks檔> <參考批>
import sys,io,json,re
B,W,OUT,SF,RF,REF=sys.argv[1:7]
SP='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad'
import os
HERE=os.path.dirname(os.path.abspath(__file__))
ROOT=os.path.abspath(os.path.join(HERE,'..','..'))
t=io.open(f'{HERE}/writer-template.md',encoding='utf-8').read()
n=int(B[1:]); ORD=os.environ.get('ORD') or {183:'一',184:'二',185:'三',186:'四',187:'五',188:'六',189:'七',190:'八',191:'九'}.get(n,str(n))
def rows(p):
    j=json.load(open(p)); return j if isinstance(j,list) else list(j.values())
WO='2' if W=='1' else '1'; G='a' if W=='1' else 'b'
mine=rows(f'{ROOT}/desc-tools/batches/input/{B}-writer-{W}.json'); oth=rows(f'{ROOT}/desc-tools/batches/input/{B}-writer-{WO}.json')
cards=rows(f'{ROOT}/desc-tools/batches/cards/{B}-cards.json'); y=[c['year'] for c in cards if c.get('year')]
thin=sum(1 for r in mine if r.get('status')=='thin')
THIN=(f"本組 **{thin} 張 thin**，其餘 full" if thin else f"本組**沒有** thin 卡，{len(mine)} 張 `status` 全部是 `full`，但規格要讀對")
hdr=io.open(f'{ROOT}/batch-progress/{B}/rulings.md',encoding='utf-8').read()
h=re.search(r'預留[^：]*：鉤子 (\d+)–(\d+)',hdr); RH=f'{h[1]}–{h[2]}'
w=re.search(r'預留[^：]*：寫作 a (\d+)–(\d+)、b (\d+)–(\d+)',hdr); r1,r2=f'{w[1]}–{w[2]}',f'{w[3]}–{w[4]}'
R1,R2=(r1,r2) if W=='1' else (r2,r1)
bm=[]
for k in '12':
    o=rows(f'{ROOT}/desc-tools/batches/output/{REF}-out-{k}.json')
    bm.append(f'`{REF}-out-{k}.json` {len(o)} 張＝**'+'／'.join(str(len(x.get('desc',''))) for x in o)+'**；')
rep=dict(BD=f'c-{n}',ORD=ORD,SPAN=f'{min(y)}–{max(y)}',W=W,WO=WO,G=G,N=str(len(mine)),NO=str(len(oth)),THIN=THIN,B=B,RH=RH,
  SECOND=io.open(SF,encoding='utf-8').read().strip(),REFD=f'c-{REF[1:]}',BACKMEASURE='\n'.join(bm),RISKS=io.open(RF,encoding='utf-8').read().strip(),R1=R1,R2=R2)
for k,v in rep.items(): t=t.replace('{{'+k+'}}',v)
if os.environ.get('LINE'): t=t.replace('日本爵士獨立廠牌線 jp-2',os.environ['LINE']).replace('jp-2 線',os.environ['LINE'])
assert not re.findall(r'\{\{\w+\}\}',t), re.findall(r'\{\{\w+\}\}',t)
io.open(OUT,'w',encoding='utf-8').write(t); print(OUT,'ok',W,len(mine),R1)
