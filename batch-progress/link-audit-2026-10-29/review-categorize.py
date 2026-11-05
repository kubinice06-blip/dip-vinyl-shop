import json,re,sys,unicodedata
d=json.load(open(sys.argv[1]))['issues']
def script(s):
  s=s or ''
  if re.search(r'[가-힯]',s): return 'ko'
  if re.search(r'[぀-ヿ]',s): return 'ja'
  if re.search(r'[㐀-鿿]',s): return 'zh'
  if re.search(r'[Ѐ-ӿ]',s): return 'cy'
  if re.search(r'[a-zA-Z]',s): return 'la'
  return 'other'
def toks(s):
  s=unicodedata.normalize('NFKD',s or '').lower()
  s=re.sub(r'[̀-ͯ]','',s)
  s=re.sub(r'\((?:[^)]*(remaster|edition|deluxe|version|anniversary|expanded)[^)]*)\)','',s)
  w=[x for x in re.split(r'[^a-z0-9]+',s) if x and x not in ('the','a','of','and','in','vol','volume','no','op','nos','live','at')]
  return set(w)
out={'xscript':[],'latin_low':[],'latin_mid':[],'other':[]}
for i in d:
  if 'album-mismatch' not in i['flags']: continue
  ap=(i['apple'] or {}).get('collectionName') or (i.get('otherStoreNames') or ['— '])[0].split(' — ',1)[-1]
  sa,sb=script(i['album']),script(ap)
  if sa!=sb: out['xscript'].append(i); continue
  if sa=='la':
    a,b=toks(i['album']),toks(ap); j=len(a&b)/max(1,len(a|b))
    i['_j']=round(j,2)
    (out['latin_low'] if j<0.34 else out['latin_mid']).append(i)
  else: out['other'].append(i)
print({k:len(v) for k,v in out.items()})
mode=sys.argv[2] if len(sys.argv)>2 else ''
for i in out.get(mode,[]): print(i.get('_j'),i['artistMatch'],'|',i['artist'],'|',i['album'],'=>',(i['apple'] or {}).get('collectionName'),'|',(i['apple'] or {}).get('artistName'))
