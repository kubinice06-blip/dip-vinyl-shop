# 用法：python3 mk-cur-hoyi.py <批> <組> <輸出> [ORD]
import sys,io,json,re,os
B,G,OUT=sys.argv[1:4]; ORD=sys.argv[4] if len(sys.argv)>4 else '一'
HERE=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(HERE,'..','..'))
t=io.open(f'{HERE}/cur-hoyi-template.md',encoding='utf-8').read()
s=json.load(open(f'{ROOT}/batch-progress/{B}/slice.json'))
mine=[r for r in s if r['g']==G]
y=[r['year'] for r in s if r.get('year')]
hdr=io.open(f'{ROOT}/batch-progress/{B}/rulings.md',encoding='utf-8').read()
m=re.search(r'a 組編號區間 (\d+)–(\d+)、b 組 (\d+)–(\d+)',hdr); ra,rb=f'{m[1]}–{m[2]}',f'{m[3]}–{m[4]}'
R1,R2=(ra,rb) if G=='a' else (rb,ra)
ps=lambda r: json.dumps(r.get('poolRecheck',''),ensure_ascii=False)
nm=lambda r: f"`{r['artist']}《{r['album']}》`"
NAME={1:'第 1 堆：§1（資料庫查不到、要人工補身分）',2:'第 2 堆：兩條線之間漏掉的（原壓在四大廠）',3:'第 3 堆：日本藝人的美國原盤',4:'第 4 堆：外國藝人的日本原盤'}
RULE={1:'**MB 完全查無 RG 的走 §1 人工身分**（`identitySource: "manual"`、`rgMbid` 留空、`mbAbsenceProof`／`manualEvidenceUrls`／`manualRuling`／`coverSourceHint`，全套照 `CURATION-BRIEF-c67plus.md` 附錄）；**MB 有 RG 的照一般路線釘 `rgMbid`**；`hint` 欄的廠牌與年份多半標著「請覆核」——**先查實；查實後不在四大廠也不在十五家就退。**',
 2:'**判準照 jp-1**：原壓廠牌在四大廠就收；**`東芝音工` 算東芝、`Interface` 是日本コロムビア 的字標**（主線第 2007-B 條）。舊退件理由（「不在十五家」）在本線不成立。',
 3:'**卡的身分是美國原盤**（`label` 欄寫美國那一版）；**第 4106 條四項門檻這一堆不適用**；曲風與第 5701 條照舊。',
 4:'⚠ ⚠ **第 4106 條四項門檻取消，但「日本是原盤」是硬門檻**：全世界最早那一版必須是日本廠牌的（或只在日本發行）；**授權壓片一律退**。**`source` 欄的「甲／不明」只是 MB 初篩，自己查 Discogs 最早那一版的 `labels` 欄與 `versions` 全表**；**其餘判準（曲風、演奏主體、乙過半、合輯、撞池）全部照舊。**'}
parts=[]
for p in [1,2,3,4]:
    rs=[r for r in mine if r['pile']==p]
    if not rs: continue
    lines='\n'.join(f"   - {nm(r)}{' '+str(r['year']) if r.get('year') else ''}｜{r.get('house','')}｜{r.get('source','')}{'｜'+r['hint'] if r.get('hint') else ''}" for r in rs)
    parts.append(f"### {NAME[p]}——本組 {len(rs)} 張\n{RULE[p]}\n{lines}")
S1=('⚠ ⚠ `batch-progress/CURATION-BRIEF-c67plus.md` 的**附錄（§1 人工身分路線的舉證要件）**——**本組有第 1 堆，全套逐字照辦**；`batch-progress/c64/` 有現成的 `apple-art.mjs`（封面走精確 `collectionId`）。'
    if any(r['pile']==1 for r in mine) else '`batch-progress/CURATION-BRIEF-c67plus.md` 附錄（§1 人工身分路線）——**本組沒有第 1 堆，但遇到 MB 查無的碟照那一份辦。**')
maxb=re.findall(r'^## 第 (\d{4}-B) 條',io.open(f'{ROOT}/batch-progress/c163/rulings-mainline.md',encoding='utf-8').read(),re.M)[-1]
rep=dict(BD=f'c-{B[1:]}',ORD=ORD,SPAN=f'{min(y)}–{max(y)}',G=G,N=str(len(mine)),B=B,MAXB=maxb,READ_S1=S1,PILES='\n\n'.join(parts),
  SURE=str(sum('確定撞池' in ps(r) or '已裁定撞池' in ps(r) for r in mine)),MAN=str(sum('人工比' in ps(r) for r in mine)),
  NONE=str(sum('查無' in ps(r) for r in mine)),ROMA=str(sum('羅馬字' in ps(r) for r in mine)),
  TNOTE=str(sum(1 for r in mine if (r.get('titleCheck') or {}).get('note'))),PRIOR=str(sum(1 for r in mine if r.get('priorRulingHits'))),R1=R1,R2=R2)
for k,v in rep.items(): t=t.replace('{{'+k+'}}',v)
assert not re.findall(r'\{\{\w+\}\}',t), re.findall(r'\{\{\w+\}\}',t)
io.open(OUT,'w',encoding='utf-8').write(t); print(OUT,'ok',G,len(mine),R1)
