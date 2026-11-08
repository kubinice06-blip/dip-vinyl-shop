import json, re, sys, time, urllib.request, html as H
out_path = sys.argv[1]
UA = 'dip-vinyl-shop/1.0 (+https://dipvinyl.tw)'
items = {}
total = 0
while True:
    body = json.dumps({"path":"/store/downtempo/","page":"","total":total,"pp":30,"dbl":0,"products":0,"mode":"view-more","active":"sort-list","showmode":"","pagesrc":""}).encode()
    req = urllib.request.Request('https://www.newtone-records.com/include/grid_list.php', data=body, headers={'User-Agent':UA,'Content-Type':'application/json'})
    for attempt in range(4):
        try:
            d = json.load(urllib.request.urlopen(req, timeout=40)); break
        except Exception as e:
            time.sleep(5)
    else:
        print('fail at', total); break
    c = d.get('content','')
    arts = re.split(r'<article class="list-single" id="', c)[1:]
    if not arts: print('no more at', total); break
    for a in arts:
        pid = a[:12].split('hr')[0]
        m = re.search(r'<h1 class="item_title[^"]*">(.*?)</h1>', a, re.S)
        h1 = m.group(1) if m else ''
        artist = H.unescape(re.sub('<[^>]+>','', (re.search(r'<strong>(.*?)</strong>', h1, re.S) or [None,''])[1])).strip()
        links = re.findall(r'<a href="/product/[^"]*"[^>]*>(.*?)</a>', h1, re.S)
        title = H.unescape(re.sub('<[^>]+>','', links[-1])).strip() if links else ''
        fmts = re.findall(r'<li class="wav[^"]*" tab="([^"]*)"', a)
        label = H.unescape((re.search(r'class="btn-label[^"]*"[^>]*>([^<]*)<', a) or [None,''])[1]).strip()
        catno = (re.search(r'Cat No\.: ([^<]*)<', a) or [None,''])[1].strip()
        tags = re.findall(r'href="/category/([^"]+)" class="btn-tag', a)
        com = H.unescape(re.sub('<[^>]+>','', (re.search(r'<h2 class="d-title">(.*?)</h2>', a, re.S) or [None,''])[1])).strip()[:300]
        ntr = len(set(re.findall(r'id="'+re.escape(pid)+r'ts(\d+)"', a)))
        img = (re.search(r'<img src="([^"]+)"', a) or [None,''])[1]
        items[pid] = dict(id=pid, artist=artist, title=title, formats=fmts, label=label, catno=catno, tags=[t.replace('+',' ') for t in tags], comment=com, tracks=ntr, img=img)
    total += len(arts)
    if total % 300 < 30: print(total, len(items), flush=True); json.dump(list(items.values()), open(out_path,'w'), ensure_ascii=False)
    if d.get('load') == 'false': print('load false at', total); break
    time.sleep(1.2)
json.dump(list(items.values()), open(out_path,'w'), ensure_ascii=False)
print('done', len(items))
