import sys, re
src = open('main.js', encoding='utf8').read()
w = int(sys.argv[1])
for pat in sys.argv[2:]:
    print('###', pat)
    idxs = [m.start() for m in re.finditer(re.escape(pat), src)][:3]
    for i in idxs:
        print('  ...', src[max(0, i - w):i + w].replace('\n', ' '))
    print('  count', len(re.findall(re.escape(pat), src)))
