# Original website preservation

The original website from before the October 2026 redesign is preserved in Git history by the `pre-redesign` tag, pointing to commit `371e770fa7a5fa41cc9315b6eaf338368078abbb`. The tag exists on GitHub. It contains the complete original HTML, CSS, JavaScript, images, fonts, Sass sources, and original domain file.

The original site is intentionally not hosted. There is no `archive/legacy-site/` directory in the current website.

To recover the original files into a separate local directory without changing the current checkout:

```sh
git fetch origin tag pre-redesign
mkdir -p ../landingpage-original
git archive pre-redesign | tar -x -C ../landingpage-original
```

To view the recovered copy locally:

```sh
python3 -m http.server 8001 --bind 127.0.0.1 --directory ../landingpage-original
```

Open http://localhost:8001/. Do not publish the recovered copy or copy its CNAME into another hosted archive. No history was rewritten, and the preservation tag must not be deleted or moved.

Run `python3 tests/check_preservation.py` to verify the tag and recoverability, confirm root CNAME is unchanged, and ensure no legacy HTML remains in the current site.
