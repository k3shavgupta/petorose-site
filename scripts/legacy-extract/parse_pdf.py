"""Parse each product page of the catalogue PDF (pages 4-42) into structured fields."""
import json, re
import pdfplumber

BADGES = {  # read visually from badges-montage.png (✓ = True, ✗ = False, absent = None); key = catalogue S.No.
    1: (False, False, False), 2: (True, True, False), 3: (False, False, False), 4: (False, False, False),
    5: (True, True, False), 6: (True, False, False), 7: (True, False, False), 8: (True, False, False),
    9: (False, False, False), 10: (False, False, False), 11: (False, None, False), 12: (False, False, False),
    13: (False, False, False), 14: (True, True, False), 15: (None, None, False), 16: (True, True, False),
    17: (False, True, False), 18: (True, True, False), 19: (None, None, False), 20: (True, None, False),
    21: (True, True, False), 22: (False, False, False), 23: (True, True, False), 24: (False, True, False),
    25: (False, False, False), 26: (False, False, False), 27: (True, True, False), 28: (None, None, False),
    29: (None, None, False), 30: (False, False, False), 31: (True, True, False), 32: (True, True, False),
    33: (None, None, False), 34: (False, False, False), 35: (False, False, False), 36: (False, False, False),
    37: (True, True, False), 38: (None, None, False), 39: (None, None, False),
}

def clean(s):
    return re.sub(r'\s+', ' ', s.replace('\ufb01', 'fi').replace('\ufb02', 'fl').replace('\ufb00', 'ff')).strip()

import subprocess

def crop_text(n, x, y, w, h):
    r = subprocess.run(['pdftotext', '-f', str(n), '-l', str(n), '-x', str(x), '-y', str(y), '-W', str(w), '-H', str(h), 'catalogue.pdf', '-'],
                       capture_output=True, text=True)
    return r.stdout.replace('\f', '')

out = []
with pdfplumber.open('catalogue.pdf') as pdf:
    toc = subprocess.run(['pdftotext', '-layout', '-f', '2', '-l', '2', 'catalogue.pdf', '-'], capture_output=True, text=True).stdout
    for n in range(4, 43):
        left = crop_text(n, 0, 0, 225, 400)
        ten_block = crop_text(n, 0, 400, 150, 90)
        lines = [l for l in left.split('\n') if l.strip()]
        m_ten = re.search(r'(.*?(?:HOURS|DAYS|Hours|Days))', ten_block)
        chem = re.search(r'Chemical Name:\s*(.*?)\s*Physico', left, re.S)
        formula = re.search(r'Formula\s*-\s*(.*)', left)
        cas = re.search(r'CAS(?: no\.)?\s*[-:.]*\s*[-:]?\s*(.*)', left)
        fema = re.search(r'FEMA\s*[-:]\s*(.*)', left)
        idx_chem = next((i for i, l in enumerate(lines) if l.startswith('Chemical Name')), len(lines))
        # Split the column into runs of same font size/colour: title (large pink), alias (purple), body (white).
        pl = pdf.pages[n - 1].dedupe_chars().crop((0, 0, 225, 400))
        words = pl.extract_words(extra_attrs=['size', 'non_stroking_color'], keep_blank_chars=False)
        segs = []
        for w in words:
            key = (round(w['size'], 1), str(w['non_stroking_color']))
            if segs and segs[-1]['key'] == key:
                segs[-1]['text'] += ' ' + w['text']
            else:
                segs.append({'key': key, 'text': w['text']})
        segments = [{'size': s['key'][0], 'color': s['key'][1], 'text': clean(s['text'])} for s in segs]
        sno = n - 3
        fg, k, gmo = BADGES[sno]
        out.append({
            'catalogueSNo': sno,
            'pdfPage': n,
            'printedPage': n - 2,
            'headerLines': lines[:3],
            'leftColumnText': left,
            'chemicalName': clean(chem.group(1)) if chem else None,
            'formula': clean(formula.group(1)) if formula else None,
            'cas': clean(cas.group(1)) if cas else None,
            'fema': clean(fema.group(1)) if fema else None,
            'tenacity': clean(m_ten.group(1)) if m_ten else None,
            'badges': {'foodGrade': fg, 'kosher': k, 'gmo': gmo},
            'bodyBeforeChemicalName': [l for l in lines[:idx_chem]],
            'segments': segments,
        })
json.dump({'toc': toc, 'products': out}, open('pdf-products.json', 'w'), indent=2, ensure_ascii=False)
for p in out:
    print(p['catalogueSNo'], '|', ' / '.join(p['headerLines'][:2]), '|', p['formula'], '|', p['cas'], '|', p['fema'], '|', p['tenacity'])
