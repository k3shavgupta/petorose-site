"""Crop the Food Grade / Kosher / GMO badge block from every product page of the catalogue into one labelled montage."""
import subprocess, glob, os
from PIL import Image, ImageDraw

os.makedirs('badges', exist_ok=True)
for page in range(4, 43):
    subprocess.run(['pdftoppm', '-r', '100', '-f', str(page), '-l', str(page), '-x', '10', '-y', '735', '-W', '140', '-H', '105',
                    '-png', 'catalogue.pdf', f'badges/b{page:02d}'], check=True, stderr=subprocess.DEVNULL)
files = sorted(glob.glob('badges/b*.png'))
cols = 8
w, h = 140, 125
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * w, rows * h), 'white')
d = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    page = int(os.path.basename(f)[1:3])
    im = Image.open(f)
    x, y = (i % cols) * w, (i // cols) * h
    sheet.paste(im, (x, y + 20))
    d.text((x + 4, y + 4), f'p{page} #{page - 3}', fill='red')
sheet.save('badges-montage.png')
print(len(files))
