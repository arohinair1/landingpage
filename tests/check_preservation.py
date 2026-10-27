"""Validate lossless original-site recovery without publishing a second website."""
from pathlib import Path
from io import BytesIO
import subprocess
import tarfile

ROOT = Path(__file__).resolve().parents[1]
def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT)
expected = '371e770fa7a5fa41cc9315b6eaf338368078abbb'
assert git('rev-parse', 'pre-redesign^{}').decode().strip() == expected
original = git('ls-tree', '-r', '--name-only', expected).decode().splitlines()
with tarfile.open(fileobj=BytesIO(git('archive', 'pre-redesign'))) as archive:
    recovered = {m.name: archive.extractfile(m).read() for m in archive.getmembers() if m.isfile()}
assert set(recovered) == set(original)
for name, data in recovered.items():
    assert data == git('show', f'{expected}:{name}'), name
assert (ROOT/'CNAME').read_bytes() == recovered['CNAME']
assert not (ROOT/'archive/legacy-site').exists()
assert {p.name for p in ROOT.glob('*.html')} == {'index.html'}
assert not list(ROOT.rglob('*.pdf'))
assert all(name in recovered for name in ['index.html','generic.html','elements.html','assets/css/main.css','assets/js/main.js','images/banner.jpg'])
print(f'Preservation passed: all {len(recovered)} original files recover exactly; tag and CNAME intact; no hosted legacy copy.')
