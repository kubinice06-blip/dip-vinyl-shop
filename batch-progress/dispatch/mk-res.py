# 用法：python3 mk-res.py <批> <組> <輸出> <versions檔> <risks檔>
import sys,io,json,re
B,G,OUT,VF,RF=sys.argv[1:6]
SP='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad'
import os
HERE=os.path.dirname(os.path.abspath(__file__))
ROOT=os.path.abspath(os.path.join(HERE,'..','..'))
t=io.open(f'{HERE}/res-template.md',encoding='utf-8').read()
n=int(B[1:]); ORD=os.environ.get('ORD') or {183:'一',184:'二',185:'三',186:'四',187:'五',188:'六',189:'七',190:'八',191:'九'}.get(n,str(n))
cards=json.load(open(f'{ROOT}/desc-tools/batches/cards/{B}-cards.json'))
cards=cards if isinstance(cards,list) else list(cards.values())
mine=[c for c in cards if c.get('group')==G]
y=[c['year'] for c in cards if c.get('year')]
hdr=io.open(f'{ROOT}/batch-progress/{B}/rulings.md',encoding='utf-8').read()
m=re.search(r'a 組編號區間 (\d+)–(\d+)、b 組 (\d+)–(\d+)',hdr)
CURR=f'{m[1]}–{m[2]}（a）與 {m[3]}–{m[4]}（b）'
r=re.search(r'預留[^：]*：研究 a (\d+)–(\d+)、b (\d+)–(\d+)',hdr)
ra,rb=f'{r[1]}–{r[2]}',f'{r[3]}–{r[4]}'
R1,R2=(ra,rb) if G=='a' else (rb,ra)
maxb=re.findall(r'^## 第 (\d{4}-B) 條',io.open(f'{ROOT}/batch-progress/c163/rulings-mainline.md',encoding='utf-8').read(),re.M)[-1]
rep=dict(BD=f'c-{n}',ORD=ORD,SPAN=f'{min(y)}–{max(y)}',G=G,N=str(len(mine)),B=B,MAXB=maxb,CURR=CURR,
  VERSIONS=io.open(VF,encoding='utf-8').read().strip(),RISKS=io.open(RF,encoding='utf-8').read().strip(),R1=R1,R2=R2)
for k,v in rep.items(): t=t.replace('{{'+k+'}}',v)
assert not re.findall(r'\{\{\w+\}\}',t)
io.open(OUT,'w',encoding='utf-8').write(t); print(OUT,'ok',G,len(mine),R1)
