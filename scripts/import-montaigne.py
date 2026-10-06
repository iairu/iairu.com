#!/usr/bin/env python3
"""One-off import of the old personal portfolio at https://iairu.montaigne.io/ (needs Pillow).

Reads its RSS feed plus the About page, downloads every picture and writes
  public/img/montaigne/<section>/<n>.jpg (+ <n>_t.jpg thumbnails)
  src/data/montaigne.json  (galleries and the text of travel / recipe / research posts, as raw HTML)
The site texts themselves were then edited by hand into src/content/docs and src/data/projects.js.
"""
import html, io, json, os, re, sys, urllib.request
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..')
BASE = 'https://iairu.montaigne.io'
OUT = os.path.join(ROOT, 'public/img/montaigne')
UA = {'User-Agent': 'iairu-com-import'}


def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40).read()


def save(url, section, name):
    d = os.path.join(OUT, section); os.makedirs(d, exist_ok=True)
    full, thumb = f'{name}.jpg', f'{name}_t.jpg'
    if not os.path.exists(os.path.join(d, full)):
        im = Image.open(io.BytesIO(get(url)))
        im = im.convert('RGBA'); bg = Image.new('RGBA', im.size, (255, 255, 255, 255)); im = Image.alpha_composite(bg, im).convert('RGB')
        big = im.copy(); big.thumbnail((1400, 1400), Image.LANCZOS); big.save(os.path.join(d, full), quality=78, optimize=True, progressive=True)
        t = im.copy(); t.thumbnail((560, 560), Image.LANCZOS); t.save(os.path.join(d, thumb), quality=74, optimize=True, progressive=True)
        w, h = big.size
    else:
        w, h = Image.open(os.path.join(d, full)).size
    return {'src': f'/img/montaigne/{section}/{full}', 'thumb': f'/img/montaigne/{section}/{thumb}', 'w': w, 'h': h}


feed = get(BASE + '/feed.xml').decode('utf8')
posts = []
for it in re.findall(r'<item>.*?</item>', feed, re.S):
    g = lambda t: (re.search(rf'<{t}[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?</{t}>', it, re.S) or [None, ''])[1]
    link = g('link')
    posts.append({'title': html.unescape(g('title')), 'path': link.replace(BASE + '/', ''), 'date': g('pubDate')[5:16], 'body': g('content:encoded') or g('description')})

data = {'galleries': {}, 'posts': {}}
for sec in ('illustration', 'sketches', 'comics', 'paintings', 'animation', 'travel', 'recipes'):
    items = [p for p in posts if p['path'].startswith(sec + '/')]
    if sec in ('travel', 'recipes'):
        for p in items:
            slug = p['path'].split('/')[1]
            imgs = re.findall(r'<img[^>]+src="(https://imagedelivery[^"]+)"', p['body'])
            p['images'] = [save(u, f'{sec}/{slug}', str(i + 1)) for i, u in enumerate(imgs)]
            data['posts'][p['path']] = {'title': p['title'], 'date': p['date'], 'body': p['body'], 'images': p['images']}
        continue
    gal = []
    for i, p in enumerate(sorted(items, key=lambda p: p['path'])):
        for j, u in enumerate(re.findall(r'<img[^>]+src="(https://imagedelivery[^"]+)"', p['body'])):
            r = save(u, sec, f"{p['path'].split('/')[1]}" + (f'-{j+1}' if j else ''))
            r['alt'] = re.sub(r'^[^\w]+', '', p['title']).strip() or p['path']
            gal.append(r)
    data['galleries'][sec] = gal
about = get(BASE + '/about').decode('utf8')
data['galleries']['about'] = [save(u, 'about', str(i + 1)) for i, u in enumerate(dict.fromkeys(re.findall(r'<img[^>]+src="(https://imagedelivery[^"]+)"', about)))]
for p in posts:
    if p['path'].split('/')[0] in ('research', 'animation', 'graphics', 'software') and p['path'] not in data['posts']:
        data['posts'][p['path']] = {'title': p['title'], 'date': p['date'], 'body': p['body']}
json.dump(data, open(os.path.join(ROOT, 'src/data/montaigne.json'), 'w'), ensure_ascii=False, indent=1)
print({k: len(v) for k, v in data['galleries'].items()}, len(data['posts']), 'posts')
