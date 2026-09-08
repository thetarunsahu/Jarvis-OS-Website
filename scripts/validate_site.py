from __future__ import annotations

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
IGNORE_PREFIXES = ("http://", "https://", "//", "data:", "mailto:", "tel:", "#")
REFERENCE_PATTERNS = [
    re.compile(r'''(?:src|href)\s*=\s*["']([^"']+)["']''', re.I),
    re.compile(r'''(?:src|href)\s*=\s*[`"']([^`"']+)[`"']''', re.I),
    re.compile(r'''\.src\s*=\s*[`"']([^`"']+)[`"']'''),
    re.compile(r'''\.href\s*=\s*[`"']([^`"']+)[`"']'''),
]

required = [
    "index.html", "styles.css", "script.js", "intro-core.js", "inside-jarvis.js",
    "concept-lab.js", "product-suite.js", "orchestration-lab.js", "tech-atlas.js",
    "assets/jarvis-sigil.svg", "assets/jarvis-social-card.svg", "site.webmanifest",
]

errors: list[str] = []
for rel in required:
    if not (ROOT / rel).exists():
        errors.append(f"missing required file: {rel}")

files = list(ROOT.glob("*.html")) + list(ROOT.glob("*.js")) + list(ROOT.glob("*.css"))
for path in files:
    text = path.read_text(encoding="utf-8")
    for pattern in REFERENCE_PATTERNS:
        for raw in pattern.findall(text):
            ref = raw.strip()
            if not ref or ref.startswith(IGNORE_PREFIXES) or "${" in ref or "{{" in ref:
                continue
            ref = ref.split("?")[0].split("#")[0]
            if not ref or ref.startswith(("javascript:", "blob:")):
                continue
            target = (ROOT / ref).resolve()
            try:
                target.relative_to(ROOT.resolve())
            except ValueError:
                errors.append(f"{path.name}: reference escapes repository: {raw}")
                continue
            if not target.exists():
                errors.append(f"{path.name}: missing local reference: {raw}")

# Guard the product-truth rule for the largest simulated / concept experiences.
truth_terms = {
    "orchestration-lab.js": ("SIMULATED", "not a claim"),
    "inside-jarvis.js": ("CONCEPTUAL",),
    "product-suite.js": ("CONCEPT", "not claims"),
    "concept-lab.js": ("simplified visual models",),
}
for filename, terms in truth_terms.items():
    path = ROOT / filename
    if not path.exists():
        continue
    lower = path.read_text(encoding="utf-8").lower()
    if not all(term.lower() in lower for term in terms):
        errors.append(f"{filename}: product-truth label/statement missing")

# Keep static assets reasonably light for a cinematic site.
for asset in (ROOT / "assets").glob("**/*") if (ROOT / "assets").exists() else []:
    if asset.is_file() and asset.stat().st_size > 1_500_000:
        errors.append(f"asset too large (>1.5MB): {asset.relative_to(ROOT)}")

if errors:
    print("Jarvis site validation FAILED:")
    for error in sorted(set(errors)):
        print(f" - {error}")
    sys.exit(1)

print(f"Jarvis site validation passed: {len(files)} top-level HTML/JS/CSS files checked.")
