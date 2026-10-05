# 用法：python3 mk-cur.py <批 例 c189> <組 a|b> <輸出檔>
import sys,io,json,re,collections
B,G,OUT=sys.argv[1],sys.argv[2],sys.argv[3]
LAST=int(sys.argv[4]) if len(sys.argv)>4 else None  # 策展已收線的最後一批
SP='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad'
import os
HERE=os.path.dirname(os.path.abspath(__file__))
ROOT=os.path.abspath(os.path.join(HERE,'..','..'))
t=io.open(f'{HERE}/cur-template.md',encoding='utf-8').read()
n=int(B[1:]); LAST=LAST or n-1; bd=f'c-{n}'; prev=f'c{LAST}'; prevd=f'c-{LAST}'
ORD=os.environ.get('ORD') or {183:'一',184:'二',185:'三',186:'四',187:'五',188:'六',189:'七',190:'八',191:'九'}.get(n,str(n))
NPREV={187:'五',188:'六',189:'七',190:'八'}[LAST]
def _cur(x):
    # 策展區間從該批骨架檔頭讀（「a 組編號區間 A–B、b 組 C–D」），不再手寫對照表
    h=io.open(f'{ROOT}/batch-progress/c{x}/rulings.md',encoding='utf-8').read()
    m=re.search(r'a 組編號區間 (\d+)–(\d+)、b 組 (\d+)–(\d+)',h)
    return (int(m[1]),int(m[4])) if m else ({185:(5876,5935),186:(5936,5995),187:(6026,6085)}.get(x) or (0,0))
class _C(dict):
    def __missing__(self,k): v=_cur(k); self[k]=v; return v
CUR=_C()
# 本批條號
hdr=io.open(f'{ROOT}/batch-progress/{B}/rulings.md',encoding='utf-8').read()
m=re.search(r'a 組編號區間 (\d+)–(\d+)、b 組 (\d+)–(\d+)',hdr)
ra=f'{m[1]}–{m[2]}'; rb=f'{m[3]}–{m[4]}'
R1,R2=(ra,rb) if G=='a' else (rb,ra)
s=json.load(open(f'{ROOT}/batch-progress/{B}/slice.json'))
mine=[r for r in s if r['g']==G]; oth=[r for r in s if r['g']!=G]; O='b' if G=='a' else 'a'
def span(rows):
    y=[r['year'] for r in rows if r.get('year')]; return f'{min(y)}–{max(y)}'
def hc(rows): return collections.Counter(r['house'] for r in rows)
def ps(r): return json.dumps(r.get('poolRecheck',''),ensure_ascii=False)
def nm(r): return f"`{r['artist']}《{r['album']}》`"
sure=[r for r in mine if '確定撞池' in ps(r)]
roma=[r for r in mine if re.search('全是羅馬字|全羅馬字',ps(r))]
romaO=[r for r in oth if re.search('全是羅馬字|全羅馬字',ps(r))]
man=sum('人工比' in ps(r) for r in mine); none=sum('查無' in ps(r) for r in mine)
born=[r for r in mine if (r.get('domesticRecheck') or {}).get('bornOutside')]
nond=[r for r in mine if r.get('domesticRecheck') and not r['domesticRecheck'].get('domestic')]
nondO=[r for r in oth if r.get('domesticRecheck') and not r['domesticRecheck'].get('domestic')]
live=[r for r in mine if r.get('live')]
tnote=sum(1 for r in mine if (r.get('titleCheck') or {}).get('note'))
h=hc(mine); ho=hc(oth)
fmt=lambda c:'、'.join(f'{k} {v}' for k,v in c.most_common())
READ={}
lst=[x for x in (LAST-2,LAST-1,LAST) if x>=185]
parts='、'.join(f'`c{x}/rulings.md`（策展 {CUR[x][0]}–{CUR[x][1]}）' for x in lst)
READLIST=(f"{parts} —— **最近三批的策展兩段都要讀**；\n   更早的 `c183`／`c184` 策展段（5656–5715／5716–5775）至少讀總表與退件條。")
top=h.most_common(1)[0]
HEAVY=f"⚠ ⚠ ⚠ **本組最吃重的是 `{top[0]}` {top[1]} 張**" + ("——**`SONP-`／`SOPM-` 號段混著美國 Columbia 授權壓片；`28AH`／`25AP` 一系的前兩位是定價碼（主線第 1986-B 條）。**" if top[0]=='CBS/Sony' else "。")
ALFA=(f"**本組 `Alfa` {h['Alfa']} 張**（已在 Alfa 自己的年代裡，仍逐筆看 `labels` 欄）。" if h.get('Alfa') else "**本組沒有 `Alfa`。**")
dn=h.get('Denon',0); dno=ho.get('Denon',0)
DENON=("⚠ ⚠ **`Denon` 的原壓字標可能是 `Better Days`／`Takt`／`Columbia`，那三家是 jp-1 的門內**"
       f"（c-187 b 第 6060 條是本線第一次跨線）——**本組 {dn} 張、另一組 {dno} 張，一律逐筆打 `labels/<id>`。**")
if sure:
    COLL=("⚠ **本組有 "+str(len(sure))+" 筆「確定撞池」**："+ '、'.join(nm(r) for r in sure) +"——**直接退、不要補別張。**\n⚠ ⚠ **而機器報出來的絕不代表只有這些**：")
else:
    COLL="⚠ **本組的「確定撞池」0 筆**——⚠ ⚠ **但那絕不代表沒有撞**："
ROMAJI4=(f"**本組有 {len(roma)} 筆**：" + '、'.join(nm(r) for r in roma) + f"（另一組 {len(romaO)} 筆）。") if roma else f"**本組 0 筆**（另一組 {len(romaO)} 筆）。"
ROMAJI3=(f"**本組 {len(roma)} 筆逐字標「變體全是羅馬字，等於沒查過」**：" + '、'.join(nm(r) for r in roma) + "。") if roma else f"**本組 0 筆標「變體全是羅馬字」**（另一組 {len(romaO)} 筆）。"
if born:
    BORN=f"**本組的 `bornOutside` {len(born)} 筆**：" + '、'.join(nm(r)+f"（{r['domesticRecheck']['bornOutside'].split('（')[0].replace('出身地 ','出身地 ')}）" for r in born) + "。"
else:
    BORN="**本組的 `bornOutside` 0 筆。**"
if nond:
    NONDOM=(f"⚠ ⚠ **第三格：`domesticRecheck` 判非本土的，本組 {len(nond)} 筆**：" + '、'.join(nm(r) for r in nond) +
            "——**這一欄的依據多半只是「無 country、別名全羅馬字」、不是結論**（主線第 1967-B 條）；"
            "**兩個方向都會錯**（c-188 b 的 `Fumio Karashima Trio` ＝ 辛島文雄、c-187 b 的秋吉敏子 都是誤判成非本土的日本人），**逐筆自己查。**")
else:
    NONDOM=f"⚠ **本組 `domesticRecheck` 判非本土的 0 筆**（另一組 {len(nondO)} 筆）——**這一欄兩個方向都會錯。**"
if live:
    LIVE=f"⚠ ⚠ **本組 slice 標 live 的 {len(live)} 筆**：" + '、'.join(nm(r) for r in live) + "——**逐筆核三肢；反向漏標仍是大宗，其餘各張也要掃，見第二節 (5)**"
else:
    LIVE="⚠ ⚠ **本組 slice 標 live 的 0 筆**——**而 c-184 三張、c-185 兩張、c-187 b 兩張都是反向漏標，0 筆最可能就是漏標，見第二節 (5)**"
ma=[r for r in s if r['g']=='a']; mb=[r for r in s if r['g']=='b']
DIST=(f"**a 組{'（你這一組）' if G=='a' else ''}**：{fmt(hc(ma))}。\n**b 組{'（你這一組）' if G=='b' else ''}**：{fmt(hc(mb))}。\n"
      f"⚠ ⚠ **本組 {len(h)} 家、`{top[0]}` 占 {top[1]} 張**——**這一關的工時主要在那幾張上。**")
HOUSEHIST='' if LAST<188 else f'、**c-188…c-{LAST} 見各自 rulings.md 策展總表**'
maxb=re.findall(r'^## 第 (\d{4}-B) 條',io.open(f'{ROOT}/batch-progress/c163/rulings-mainline.md',encoding='utf-8').read(),re.M)[-1]
rep=dict(BD=bd,ORD=ORD,SPAN=span(s),G=G,N=str(len(mine)),NPREV=NPREV,PREVD=prevd,PREV=prev,B=B,MAXB=maxb,
  READLIST=READLIST,HOUSEHIST=HOUSEHIST,ALFA=ALFA,HEAVY=HEAVY,DENON=DENON,COLL=COLL,ROMAJI4=ROMAJI4,ROMAJI3=ROMAJI3,
  BORN=BORN,NONDOM=NONDOM,SPANS=f'a 組 {span(ma)}、b 組 {span(mb)}',DIST=DIST,MAN=str(man),NONE=str(none),SURE=str(len(sure)),
  TNOTE=str(tnote),LIVE=LIVE,R1=R1,R2=R2)
for k,v in rep.items(): t=t.replace('{{'+k+'}}',v)
t=t.replace('**那一批 37 張只收 13 張，收退分界全寫在裡面**','**c-183 那一批 37 張只收 13 張，收退分界全寫在它的策展段裡**')
t=t.replace('四項判。****','四項判。** **')
t=t.replace('c-188 b 的 `Fumio Karashima Trio` ＝ 辛島文雄','c-188 b slice 裡的 `Fumio Karashima Trio` ＝ 辛島文雄')
if LAST < n-1:
    run='、'.join(f'c-{x}' for x in range(LAST+1,n))
    t=t.replace('## 二、', f'## 一之二、⚠ ⚠ 並行：{run} 的策展層此刻也在跑\n\n'
      f'**兩批的 slice 以 RG 切開、不重疊，但「同一張碟兩個沒折疊的 RG」可能分到兩批**'
      f'（c-178 b 的《Smile》／《スマイル》就是這一種）。**你看不到對方的 prop，那一關由主線交件後跑 `dedup-crossbatch` 收。**\n'
      f'**遇到「這張碟好像在前一年段也有一筆」時，把 RG 與逐軌時長寫進 `risk`，主線會比。**\n\n## 二、',1)
prior=[r for r in mine if r.get('priorRulingHits')]
note=('\n4. ⚠ ⚠ **`priorRulingHits`：這個 RG 在更早批次的裁定標題裡出現過**（主線第 1991-B 條；c-189 b 抓到 `石川晶《Lupin III》` 在 c-180 已退過又被切進來）。'
      + (f'**本組 {len(prior)} 筆**：' + '、'.join(nm(r) for r in prior) + '。' if prior else '**本組 0 筆。**')
      + '\n   ⚠ **只標不剔**：那一條的退件理由可能只適用於那一條線（jp-1 以「原壓不在四大廠」退掉的 DOMO 盤，在 jp-2 反而在十五家內）'
      + '——**讀那一條，判斷理由在本線還成不成立，並在裁定裡寫明。**\n')
t=t.replace('\n## 四、⚠ 再發版本數', note+'\n## 四、⚠ 再發版本數',1)
if not any('Marlene' in r['artist'] for r in mine):
    import re as _re
    t=_re.sub(r"⚠ ⚠ \*\*`Marlene` 在本線是「乙族」的典型\*\*.*?那是逐張判的、不是整族退。\*\*\n","",t,flags=_re.S)
left=re.findall(r'\{\{\w+\}\}',t)
assert not left, left
io.open(OUT,'w',encoding='utf-8').write(t)
print(OUT, 'ok', f'{G} {len(mine)} 張｜{R1}')
