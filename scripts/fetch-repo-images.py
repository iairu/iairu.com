#!/usr/bin/env python3
"""Downloads the project pictures listed in src/data/repo-images.json from the owner's GitHub
repositories and normalises them to 960x540 JPEGs in public/img/repos/ (needs Pillow).
Pictures are scaled to fit and padded with their own edge colour, so nothing is cropped
unless the mapping gives an explicit crop."""
import io, json, os, urllib.request
from PIL import Image

root = os.path.join(os.path.dirname(__file__), '..')
mapping = json.load(open(os.path.join(root, 'src/data/repo-images.json')))
out = os.path.join(root, 'public/img/repos')
os.makedirs(out, exist_ok=True)
for pid, m in mapping.items():
    if pid.startswith('_'):
        continue
    url = f"https://raw.githubusercontent.com/iairu/{m['repo']}/HEAD/{urllib.request.quote(m['path'])}"
    im = Image.open(io.BytesIO(urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'iairu-com'}), timeout=30).read()))
    im = im.convert('RGBA')
    bg = Image.new('RGBA', im.size, (255, 255, 255, 255))
    im = Image.alpha_composite(bg, im).convert('RGB')
    if 'crop' in m:
        im = im.crop(tuple(m['crop']))
    w, h = im.size
    edge = [im.getpixel(p) for p in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (w // 2, h - 1))]
    fill = tuple(sorted(c[i] for c in edge)[len(edge) // 2] for i in range(3))
    s = min(960 / w, 540 / h)
    im = im.resize((max(1, round(w * s)), max(1, round(h * s))), Image.LANCZOS)
    canvas = Image.new('RGB', (960, 540), fill)
    canvas.paste(im, ((960 - im.width) // 2, (540 - im.height) // 2))
    canvas.save(os.path.join(out, f'{pid}.jpg'), quality=86, optimize=True, progressive=True)
    print('repo image', pid, f'{w}x{h}')
