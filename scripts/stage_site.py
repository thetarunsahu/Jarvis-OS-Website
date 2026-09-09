"""Stage the existing static source; no secrets or repository metadata are published."""
from pathlib import Path
import shutil
ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "dist"
DEST.mkdir(exist_ok=True)
for source in ROOT.iterdir():
    if source.is_file() and (source.suffix in {".html", ".css", ".js", ".webmanifest"} or source.name in {"robots.txt", ".nojekyll"}):
        shutil.copy2(source, DEST / source.name)
shutil.copytree(ROOT / "assets", DEST / "assets", dirs_exist_ok=True)
assert (DEST / "index.html").is_file()
assert (DEST / "lab.html").is_file()
print("Static site staged:", len(list(DEST.rglob("*"))), "entries")

