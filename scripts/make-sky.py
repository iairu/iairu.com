#!/usr/bin/env python3
"""Generates the star-field backdrops in public/img/sky/ (needs numpy and Pillow).

Each picture is synthetic deep-sky "astrophotography": a tilted Milky-Way-like band of nebulosity
(pink noise with domain warping), dust lanes, a power-law star field with Gaussian PSFs and
diffraction spikes on the brightest stars, photon/sensor noise and a vignette. Two colourings of
the same scene keep to the site palette strictly:
  dark-N.jpg  azure on the dark page colour (#0a0f14)
  light-N.jpg sepia "negative print" on the light page colour (#f4f2ea)
Usage: python3 scripts/make-sky.py [count]
"""
import os, sys
import numpy as np
from PIL import Image

W, H = 1440, 640
COUNT = int(sys.argv[1]) if len(sys.argv) > 1 else 6
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'img', 'sky')
os.makedirs(OUT, exist_ok=True)

# colour ramps: intensity 0..1 -> RGB. 0 is exactly the page colour so the picture melts into it.
DARK = [(0, (10, 15, 20)), (.18, (11, 33, 52)), (.42, (16, 78, 118)), (.68, (52, 150, 205)), (.88, (150, 212, 244)), (1, (232, 246, 255))]
LIGHT = [(0, (244, 242, 234)), (.2, (226, 213, 190)), (.45, (190, 163, 124)), (.72, (128, 94, 60)), (1, (52, 34, 20))]


def pink(rng, beta):
    f = np.fft.fftfreq(H)[:, None] ** 2 + np.fft.fftfreq(W)[None, :] ** 2
    f[0, 0] = 1
    n = np.fft.ifft2(np.fft.fft2(rng.standard_normal((H, W))) * f ** (-beta / 4)).real
    lo, hi = np.percentile(n, [1, 99])
    return np.clip((n - lo) / (hi - lo), 0, 1)


def smooth(a, e0, e1):
    t = np.clip((a - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def warp(a, rng, amp):
    dy = ((pink(rng, 3.2) - .5) * amp).astype(int)
    dx = ((pink(rng, 3.2) - .5) * amp).astype(int)
    yy, xx = np.mgrid[0:H, 0:W]
    return a[(yy + dy) % H, (xx + dx) % W]


def scene(seed):
    rng = np.random.default_rng(seed)
    yy, xx = np.mgrid[0:H, 0:W]
    th = rng.uniform(-.5, .5)
    off = rng.uniform(-.25, .1)
    d = ((yy / H - .22 - off) * np.cos(th) - (xx / W - .5) * np.sin(th))
    band = np.exp(-(d / rng.uniform(.14, .26)) ** 2)
    base = warp(pink(rng, 3.4), rng, 140)
    detail = warp(pink(rng, 2.3), rng, 60)
    dust = warp(pink(rng, 2.7), rng, 90)
    neb = smooth(base * .66 + detail * .34, .34, .86) * (.28 + .72 * band)
    neb *= 1 - .7 * smooth(dust, .5, .8) * (.4 + .6 * band)
    neb *= .9
    img = neb.copy()
    # stars: power-law brightness, denser inside the band
    n = 2600
    px, py, b = [], [], []
    while len(px) < n:
        x, y = rng.uniform(0, W), rng.uniform(0, H)
        if rng.random() < .35 + .65 * band[int(y), int(x)]:
            px.append(x); py.append(y); b.append(.1 + .9 * rng.random() ** 7)
    for x, y, v in zip(px, py, b):
        s = .6 + 2.4 * v
        r = int(np.ceil(s * 3.2))
        x0, y0 = int(x), int(y)
        ys, xs = np.mgrid[max(0, y0 - r):min(H, y0 + r + 1), max(0, x0 - r):min(W, x0 + r + 1)]
        img[ys, xs] += v * np.exp(-((xs - x) ** 2 + (ys - y) ** 2) / (2 * s * s))
        if v > .82:
            L = int(30 + 70 * (v - .8))
            for k in range(1, L):
                a = v * (1 - k / L) ** 2 * .5
                for ddx, ddy in ((k, 0), (-k, 0), (0, k), (0, -k)):
                    xx2, yy2 = x0 + ddx, y0 + ddy
                    if 0 <= xx2 < W and 0 <= yy2 < H:
                        img[yy2, xx2] += a
    vig = 1 - .35 * (((xx / W - .5) * 1.5) ** 2)
    img = np.clip(img * vig, 0, 1)
    # photon + sensor noise: stronger in the faint nebulosity, plus a little chroma noise
    lum = img + rng.normal(0, 1, img.shape) * (.012 + .05 * np.sqrt(img)) * .55
    return np.clip(lum, 0, 1), rng


def colour(lum, ramp, rng):
    xs = [s for s, _ in ramp]
    out = np.stack([np.interp(lum, xs, [c[i] for _, c in ramp]) for i in range(3)], -1)
    out += rng.normal(0, 1.6, out.shape) * (lum[..., None] > .02)  # chroma grain, stays inside the palette's hue
    return Image.fromarray(np.clip(out, 0, 255).astype('uint8'))


for i in range(1, COUNT + 1):
    lum, rng = scene(1000 + i * 77)
    colour(lum, DARK, rng).save(os.path.join(OUT, f'dark-{i}.jpg'), quality=72, optimize=True, progressive=True)
    colour(lum, LIGHT, rng).save(os.path.join(OUT, f'light-{i}.jpg'), quality=72, optimize=True, progressive=True)
    print('sky', i)
