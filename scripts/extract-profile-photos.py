"""
Take the photographs out of Kiran Adate's profile (the PDF he wrote, "Kiran Adate_ Profile.pdf")
as named JPEG files, so scripts/client-images.json can use them like any other photograph.

    python3 -I scripts/extract-profile-photos.py "/home/brijesh/Documents/Kiran Adate/Kiran Adate_ Profile.pdf"

The PDF's photographs are larger than the copies of the same works in the "Kiran Adate" folder.
They are written to client-sources/profile-pdf/ (not in git; the PDF stays the source). pdfimages
does not carry the PDF's colour profiles over, so colours can differ slightly from the PDF on
screen. The PDF is only read, never changed.
Needs pdfimages (poppler-utils).
"""
import os
import subprocess
import sys
import tempfile

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, 'client-sources', 'profile-pdf')

# The PDF's images in page order: the name each is saved under, and a quarter-turn where the PDF
# stores a photograph on its side and turns it only when showing the page. None = not needed
# (image 4 is the same photograph as one in the folder).
PHOTOS = [
    ('kiran-adate-portrait', 0),
    ('beyond-boundaries', 270),
    ('eternal-orbit', 0),
    ('extraction-of-negative-energy', 0),
    None,
    ('kinetic-equilibrium', 0),
    ('freedom', 0),
    ('couple', 0),
    ('hugging', 0),
    ('spectator', 0),
]


def main(pdf):
    os.makedirs(OUT_DIR, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['pdfimages', '-png', pdf, os.path.join(tmp, 'p')], check=True)
        found = sorted(f for f in os.listdir(tmp) if f.endswith('.png'))
        if len(found) != len(PHOTOS):
            sys.exit(f'Expected {len(PHOTOS)} images in the PDF, found {len(found)}: update PHOTOS.')
        for f, spec in zip(found, PHOTOS):
            if spec is None:
                continue
            name, turn = spec
            im = Image.open(os.path.join(tmp, f))
            icc = im.info.get('icc_profile')
            im = im.convert('RGB')
            if turn:
                im = im.rotate(turn, expand=True)
            out = os.path.join(OUT_DIR, name + '.jpg')
            im.save(out, 'JPEG', quality=95, icc_profile=icc)
            print(f'  {name + ".jpg":40} {im.width}x{im.height}')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit('usage: extract-profile-photos.py <profile PDF>')
    main(sys.argv[1])
