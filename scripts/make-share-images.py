"""
Makes the pictures shown when a page of the site is shared (WhatsApp, LinkedIn, Facebook…):
1200x630 JPEG crops in public/share/, one per work (named after its slug) and kiran-adate.jpg for
every other page. Link previews show JPEG reliably, unlike WebP. Run after adding a work or
changing a cover:

    python3 -I scripts/make-share-images.py

The build (scripts/prerender.mjs) stops with a message if a work has no share picture yet.
"""
import json
import os
import subprocess

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'share')

items = json.loads(subprocess.check_output(['node', os.path.join(ROOT, 'scripts', 'share-list.mjs')], cwd=ROOT))
os.makedirs(OUT, exist_ok=True)
keep = set()
for it in items:
    src = os.path.join(ROOT, 'public', it['file'].lstrip('/'))
    im = Image.open(src).convert('RGB')
    out = ImageOps.fit(im, (1200, 630), Image.LANCZOS, centering=(0.5, it['focus']))
    name = it['name'] + '.jpg'
    out.save(os.path.join(OUT, name), 'JPEG', quality=82, optimize=True, progressive=True)
    keep.add(name)
for old in os.listdir(OUT):
    if old.endswith('.jpg') and old not in keep:
        os.remove(os.path.join(OUT, old))
print(f'{len(keep)} share pictures in public/share')
