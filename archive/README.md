# Original website archive

`legacy-site/` contains the original version of Arohi Nair’s personal website, preserved before the October 2026 redesign. It was copied directly from commit `371e770fa7a5fa41cc9315b6eaf338368078abbb` (September 12, 2026), also identified by the `pre-redesign` Git tag.

## View locally

From the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000/archive/legacy-site/ for the original site, or http://localhost:8000/ for the redesign. If a server is already running on that port, use it.

To serve only the archive independently:

```sh
python3 -m http.server 8001 --bind 127.0.0.1 --directory archive/legacy-site
```

Open http://localhost:8001/. The HTML files can also be opened directly, though HTTP preview is recommended.

## Preservation details

All original tracked HTML, styles, JavaScript, images, fonts, Sass sources, license, and README files are included. The original design and markup are retained. The only HTML change makes the favicon path relative (`images/icon.png`) so it works from this subdirectory or when served independently.

The original `CNAME` is intentionally omitted here. The root `CNAME` remains unchanged and applies to the redesigned site. No deployment configuration was changed. Existing external report/contact destinations are preserved; their availability remains controlled by those external services. The legacy Google Fonts request still needs an internet connection.

The tag preserves the exact original Git tree, including its original `CNAME`; the directory provides a browsable archival copy. Run `python3 tests/check_legacy_archive.py` to compare every archived file against the tagged source, allowing only the documented favicon adjustment and CNAME omission.
