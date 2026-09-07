#!/usr/bin/env python3
"""把牆上要掛的專輯封面從 MusicBrainz ＋ Cover Art Archive 抓回本機快取。

為什麼要快取進 repo：`build-shop-art.py` 要能離線重跑（Cloudflare 建置環境、
沒網路的機器）都產出同一張圖，不然每次重跑封面就換一批，diff 沒有意義。
抓回來一律縮到 168px（牆上只用到 111px），檔案小、版權風險也低。

    python3 scripts/fetch-shop-covers.py            # 只補缺的
    python3 scripts/fetch-shop-covers.py --force    # 全部重抓

輸出：art/covers/<slug>.jpg
"""
import io, json, os, re, sys, time, urllib.parse, urllib.request
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'art', 'covers')
os.makedirs(OUT, exist_ok=True)
UA = {'User-Agent': 'dip-vinyl-shop-stage-art/1.0 (https://github.com/kubinice06-blip/dip-vinyl-shop)'}
SIZE = 168



def load_picks():
    """清單只有一份，就放在 build-shop-art.py 裡（檔名有連字號沒法 import，用讀的）。"""
    src = open(os.path.join(ROOT, 'scripts', 'build-shop-art.py'), encoding='utf-8').read()
    ns = {}
    body = src[src.index('PICKS = ['):]
    exec(body[:body.index('\n]') + 2], ns)
    return ns['PICKS']


def slug(a, t):
    s = f'{a}-{t}'.lower()
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', s)).strip('-')[:60]


def get(url, raw=False, tries=3):
    for k in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as f:
                b = f.read()
            return b if raw else json.loads(b)
        except Exception as e:
            if k == tries - 1:
                raise
            time.sleep(1.5 * (k + 1))


# 標準查詢查不到的，用這裡的備援查詢（2026-09-07 實測：這兩張要換寫法才找得到）
ALT = {
    ('Kraftwerk', 'Trans-Europe Express'): [
        'artist:Kraftwerk AND releasegroup:"Trans Europe Express"',
        'artist:Kraftwerk AND releasegroup:"Trans-Europa Express"'],
    ('Anri', 'Timely!!'): [
        'artist:杏里 AND releasegroup:"Timely!!"',
        'releasegroup:"Timely!!" AND artist:ANRI'],
}


def find_cover(artist, title):
    """先問 MusicBrainz 拿 release-group MBID，再跟 Cover Art Archive 要正面。"""
    queries = [f'artist:"{artist}" AND releasegroup:"{title}"'] + ALT.get((artist, title), [])
    for q in queries:
        u = ('https://musicbrainz.org/ws/2/release-group/?query='
             + urllib.parse.quote(q) + '&fmt=json&limit=5')
        try:
            d = get(u)
        except Exception:
            continue
        time.sleep(1.1)                               # MusicBrainz 要求 1 req/sec
        for rg in d.get('release-groups', []):
            for sz in ('front-500', 'front-250', 'front'):
                try:
                    raw = get(f"https://coverartarchive.org/release-group/{rg['id']}/{sz}",
                              raw=True)
                    return Image.open(io.BytesIO(raw)).convert('RGB'), rg['id']
                except Exception:
                    continue
    return None, None


def main(picks, force=False):
    ok = miss = skip = 0
    for artist, title in picks:
        p = os.path.join(OUT, slug(artist, title) + '.jpg')
        if os.path.exists(p) and not force:
            skip += 1; continue
        try:
            im, mbid = find_cover(artist, title)
        except Exception as e:
            im, mbid = None, None
            print(f'  !! {artist} / {title}: {e}')
        if im is None:
            print(f'  -- {artist} / {title}  找不到封面（改用程式生成的版型）')
            miss += 1; continue
        w, h = im.size                                # 有些掃描不是正方形，置中裁切
        s = min(w, h)
        im = im.crop(((w - s) // 2, (h - s) // 2, (w - s) // 2 + s, (h - s) // 2 + s))
        im.resize((SIZE, SIZE), Image.LANCZOS).save(p, quality=86, optimize=True)
        print(f'  ok {artist} / {title}  →  {os.path.basename(p)}  ({mbid})')
        ok += 1
    print(f'\n抓到 {ok}、已有 {skip}、找不到 {miss}')


if __name__ == '__main__':
    main(load_picks(), '--force' in sys.argv)
