import os
import subprocess
import sys
from git import get_zero_hash, get_current_user, get_modified_files_by_user
from config import check_quality_before_push, check_type_before_push

ZERO = get_zero_hash()
CURRENT_PATH = os.path.dirname(__file__)
BASE_PATH = os.path.dirname(CURRENT_PATH)
current_user = get_current_user()


def lint_files(modified_files):
    allowed_extensions = [".js", ".jsx", ".ts", ".tsx"]
    files = [
        file
        for file in modified_files
        if os.path.splitext(file)[-1].lower() in allowed_extensions
    ]

    if not files:
        print("Biome 대상으로 처리할 파일이 없습니다.")
        return

    try:
        for file in files:
            print(f"Biome 적용 중: {file}")
            subprocess.run(f"npx biome check --apply '{file}'", shell=True, check=True)

        files_str = " ".join(f"'{file}'" for file in files)
        subprocess.run(f"git add {files_str}", shell=True, check=True)

        print("모든 파일에 대해 Biome 포맷 및 린트 검사가 완료되었습니다.")
    except subprocess.CalledProcessError as e:
        print(f"Biome 실행 중 오류 발생: {e}")
        sys.exit(e.returncode)


def type_check():
    try:
        print("타입 검사 실행 중...")
        result = subprocess.run("pnpm run typecheck", shell=True, cwd=BASE_PATH)
        return result.returncode
    except subprocess.CalledProcessError as e:
        print(e)
        return e.returncode


if __name__ == "__main__":
    for line in sys.stdin.readlines():
        local_ref, local_sha1, remote_ref, remote_sha1 = line.strip().split()

        if local_sha1 == ZERO:
            print("삭제된 브랜치 생략:", local_ref)
            continue

        if remote_sha1 == ZERO:
            print(f"새 브랜치 처리 중: {local_ref}")
            compare_range = f"master...{local_sha1}"
        else:
            print(f"기존 브랜치 처리 중: {local_ref}")
            compare_range = f"{remote_sha1}...{local_sha1}"

        modified_files = get_modified_files_by_user(compare_range, author=current_user)
        print("변경된 파일 목록:", modified_files)

        # 코드 퀄리티 검사
        if check_quality_before_push:
            lint_files(modified_files)

        # 타입 검사
        if check_type_before_push:
            type_result = type_check()
            if type_result != 0:
                print("타입 체크 실패")
                sys.exit(1)
