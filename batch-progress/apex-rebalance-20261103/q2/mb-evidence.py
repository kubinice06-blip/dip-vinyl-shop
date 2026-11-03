# 為缺依據的選入卡查 MusicBrainz release-group 與 Last.fm 專輯頁（皆可開、可驗證）。
import json,sys,time,urllib.parse,urllib.request
keys=json.load(open(sys.argv[1])); out={}
UA={'User-Agent':'dip-vinyl-apex-audit/1.0 ( https://github.com/kubinice06-blip/dip-vinyl-shop )'}
def get(u):
    try:
        r=urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=20); return r.status,r.read()
    except urllib.error.HTTPError as e: return e.code,b''
    except Exception as e: return 0,b''
for k in keys:
    a,al=k.split('|',1); ev=[]
    q=f'releasegroup:"{al}" AND artist:"{a}"'
    st,b=get('https://musicbrainz.org/ws/2/release-group/?fmt=json&limit=3&query='+urllib.parse.quote(q))
    if st==200:
        rg=json.loads(b).get('release-groups',[])
        if rg and rg[0].get('score',0)>=90: ev.append('https://musicbrainz.org/release-group/'+rg[0]['id'])
    time.sleep(1.1)
    lf='https://www.last.fm/music/'+urllib.parse.quote(a.replace(' ','+'),safe='+')+'/'+urllib.parse.quote(al.replace(' ','+'),safe='+')
    st,_=get(lf)
    if st==200: ev.append(lf)
    out[k]=ev; print(k,ev,flush=True)
json.dump(out,open(sys.argv[2],'w'),ensure_ascii=False,indent=1)
