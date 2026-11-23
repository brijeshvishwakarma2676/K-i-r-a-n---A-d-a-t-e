"""
Import the client's photographs into the site.

    python3 -I scripts/import-client-images.py ~/Documents/"Kiran Stone"   (or the drive)
    python3 -I scripts/import-client-images.py            (without the drive: see below)

Reads scripts/client-images.json. An entry's `src` is a file name in the folder given above, a
full path to a file anywhere (e.g. the "Kiran Adate" folder in Documents), or client-sources/…
for photographs taken out of Kiran Adate's profile PDF (scripts/extract-profile-photos.py). For each entry it uses
the enhanced version when there is one: the entry's `fix` (a full path), or else `fix-<src>` next
to the original, saved as .jpg, .png or .webp (made from the prompts in CLIENT-IMAGES.md, and
checked by eye first: see CLIENT-IMAGES.md), otherwise the
original `<src>` when the entry's status is "ready". Entries with status "fix" and no fix- file
yet are skipped. Originals are only read, never changed. When a source cannot be found (the drive
is not plugged in) but the photo was imported before, its earlier files are kept as they are.
Colours are converted to standard sRGB, so iPhone (Display P3) photos keep their colour.

For each image it writes responsive WebP files to public/img/kiran/<name>-<width>.<hash>.webp
(EXIF orientation applied, metadata such as GPS dropped) and regenerates src/data/clientImages.js,
which src/data/images.js merges into the photo manifest. Run it again whenever fix- files arrive,
then run `sh scripts/make-avif.sh` to make the AVIF copies of the new files.
"""
import hashlib
import io
import json
import os
import re
import sys

from PIL import Image, ImageCms, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG = os.path.join(ROOT, 'scripts', 'client-images.json')
OUT_DIR = os.path.join(ROOT, 'public', 'img', 'kiran')
MANIFEST = os.path.join(ROOT, 'src', 'data', 'clientImages.js')
WIDTHS = [480, 960, 1600, 2400]


def widths_for(w):
    ws = [x for x in WIDTHS if x <= w]
    if not ws:
        return [w]
    if w > ws[-1] and ws[-1] != WIDTHS[-1] and w - ws[-1] > 100:
        ws.append(w)  # keep the full size of a mid-sized original (e.g. 1536)
    return ws


def previous_manifest():
    """The entries written last time, so photos whose source is not at hand can be kept."""
    if not os.path.exists(MANIFEST):
        return {}
    found = {}
    for line in open(MANIFEST, encoding='utf-8'):
        m = re.match(r'\s*("[^"]+"): (\{.*\}),?$', line)
        if m:
            found[json.loads(m.group(1))] = json.loads(m.group(2))
    return found


def to_srgb(im):
    """Convert a photo with an embedded colour profile (Display P3, Adobe RGB) to sRGB."""
    icc = im.info.get('icc_profile')
    im = im.convert('RGB')
    if not icc:
        return im
    try:
        source = ImageCms.ImageCmsProfile(io.BytesIO(icc))
        return ImageCms.profileToProfile(im, source, ImageCms.createProfile('sRGB'), outputMode='RGB')
    except (ImageCms.PyCMSError, OSError):
        return im


def find_fix(original):
    """fix-<name> next to the original, in any image format (an editor may save a .png)."""
    if not original:
        return None
    folder, base = os.path.split(original)
    stem = os.path.splitext(base)[0]
    for name in ['fix-' + base] + [f'fix-{stem}{ext}' for ext in ('.png', '.jpg', '.jpeg', '.JPG', '.PNG', '.webp')]:
        if os.path.exists(os.path.join(folder, name)):
            return os.path.join(folder, name)
    return None


def main(src_dir):
    config = json.load(open(CONFIG, encoding='utf-8'))
    os.makedirs(OUT_DIR, exist_ok=True)
    before = previous_manifest()
    manifest, report = {}, []
    for entry in config['images']:
        src, image_id, status = entry['src'], entry['id'], entry['status']
        if os.path.isabs(src):
            original = src
        elif src.startswith('client-sources/'):
            original = os.path.join(ROOT, src)  # made by scripts/extract-profile-photos.py
        else:
            original = os.path.join(src_dir, src) if src_dir else None
        fixed = entry.get('fix') or find_fix(original)
        if fixed and os.path.exists(fixed):
            path, used = fixed, os.path.basename(fixed)
        elif status == 'ready' and original and os.path.exists(original):
            path, used = original, os.path.basename(src)
        elif image_id in before and all(os.path.exists(os.path.join(ROOT, 'public', f.lstrip('/'))) for f in before[image_id]['files'].values()):
            manifest[image_id] = before[image_id]
            report.append(f'  kept     {os.path.basename(src)[:28]:28} -> {image_id} (source not at hand; earlier files kept)')
            continue
        else:
            base = os.path.basename(src)
            report.append(f'  waiting  {base[:28]:28} -> {image_id} (needs fix-{base})' if status == 'fix' else f'  MISSING  {src}')
            continue

        data = open(path, 'rb').read()
        digest = hashlib.md5(data).hexdigest()[:8]
        name = image_id.split('/', 1)[1]
        # Only this photo's own earlier files (<name>-<width>.<hash>.webp/.avif): a plain prefix
        # would also catch other photos whose names start the same way (freedom, freedom-of-press-…).
        own = re.compile(re.escape(name) + r'-\d+\.[0-9a-f]{8}\.(webp|avif)$')
        for old in os.listdir(OUT_DIR):
            if own.match(old):
                os.remove(os.path.join(OUT_DIR, old))

        im = to_srgb(ImageOps.exif_transpose(Image.open(path)))
        w, h = im.size
        files = {}
        for tw in widths_for(w):
            th = round(h * tw / w)
            out = im if tw == w else im.resize((tw, th), Image.LANCZOS)
            fname = f'{name}-{tw}.{digest}.webp'
            out.save(os.path.join(OUT_DIR, fname), 'WEBP', quality=80, method=4)
            files[str(tw)] = f'/img/kiran/{fname}'
        r, g, b = im.resize((1, 1), Image.BOX).getpixel((0, 0))
        manifest[image_id] = {'w': w, 'h': h, 'color': f'#{r:02x}{g:02x}{b:02x}', 'source': used, 'files': files}
        report.append(f'  ok       {used:28} -> {image_id} {w}x{h} {list(files)}')

    lines = ',\n  '.join(f'{json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k, v in manifest.items())
    open(MANIFEST, 'w', encoding='utf-8').write(
        '// Generated by scripts/import-client-images.py from the client\'s "Kiran Stone" photographs.\n'
        '// Do not edit by hand: change scripts/client-images.json and run the script again.\n'
        '// `source` is the file each entry was made from (fix- when an enhanced version was used).\n'
        f'export const clientImages = {{\n  {lines},\n}}\n'
    )
    print('\n'.join(report))
    print(f'{len(manifest)} images written to public/img/kiran and src/data/clientImages.js')


if __name__ == '__main__':
    if len(sys.argv) > 2:
        sys.exit('usage: import-client-images.py [folder with the client photographs]')
    main(sys.argv[1] if len(sys.argv) == 2 else None)
