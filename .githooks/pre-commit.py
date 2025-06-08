import sys
import subprocess
from git import get_changed_files

changed_files = get_changed_files("ACMR")
allowed_exts = (".js", ".jsx", ".ts", ".tsx")
js_ts_files = [file for file in changed_files if file.endswith(allowed_exts)]

if not js_ts_files:
    sys.exit(0)

try:
    files_str = " ".join([f"'{file}'" for file in js_ts_files])

    subprocess.run(f"npx biome check {files_str} --apply", shell=True, check=True)
    subprocess.run(f"git add {' '.join(js_ts_files)}", shell=True, check=True)

except subprocess.CalledProcessError as e:
    print(f"An error occurred: {e}")
    sys.exit(1)
