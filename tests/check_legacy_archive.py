"""Verify archive provenance, preservation, and internal asset/link paths."""
from pathlib import Path
from html.parser import HTMLParser
import re
import subprocess
from urllib.parse import unquote, urlsplit

SOURCE = '371e770fa7a5fa41cc9315b6eaf338368078abbb'
ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / 'archive/legacy-site'
files = subprocess.check_output(['git', 'ls-tree', '-r', '--name-only', SOURCE], cwd=ROOT, text=True).splitlines()
assert not (ARCHIVE / 'CNAME').exists()
assert (ROOT / 'CNAME').read_bytes() == subprocess.check_output(['git', 'show', f'{SOURCE}:CNAME'], cwd=ROOT)
expected = set(files) - {'CNAME'}
assert {str(p.relative_to(ARCHIVE)) for p in ARCHIVE.rglob('*') if p.is_file()} == expected
for name in expected:
    original = subprocess.check_output(['git', 'show', f'{SOURCE}:{name}'], cwd=ROOT)
    if name == 'index.html':
        original = original.replace(b'href="/images/icon.png"', b'href="images/icon.png"')
    assert (ARCHIVE / name).read_bytes() == original, name

class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        for attr in ('href', 'src'):
            if attrs.get(attr):
                self.links.append(attrs[attr])

def check_link(parent, raw):
    link = urlsplit(raw)
    if link.scheme or link.netloc or not link.path:
        return
    assert not link.path.startswith('/'), (parent, raw)
    target = (parent.parent / unquote(link.path)).resolve()
    assert target.is_relative_to(ARCHIVE), (parent, raw)
    assert target.exists(), (parent, raw)
    if link.fragment and target.suffix == '.html':
        parser = References()
        parser.feed(target.read_text())
        assert unquote(link.fragment) in parser.ids, (parent, raw)

for page in ARCHIVE.glob('*.html'):
    parser = References()
    parser.feed(page.read_text())
    for link in parser.links:
        check_link(page, link)
for css in ARCHIVE.rglob('*.css'):
    for link in re.findall(r'url\([\'\"]?([^\)\'\"]+)', css.read_text()):
        check_link(css, link)
print(f'Archive checks passed: {len(expected)} source files preserved, CNAME omitted, and local HTML/CSS destinations resolve.')
