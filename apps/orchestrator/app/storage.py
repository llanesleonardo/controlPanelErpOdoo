from __future__ import annotations

import os
from pathlib import Path


def storage_root() -> Path:
    return Path(os.environ.get("STORAGE_ROOT", "./resources/storage/local")).resolve()


def ensure_storage() -> Path:
    root = storage_root()
    (root / "evidence").mkdir(parents=True, exist_ok=True)
    (root / "backups").mkdir(parents=True, exist_ok=True)
    return root


def safe_join(root: Path, *parts: str) -> Path:
    candidate = (root.joinpath(*parts)).resolve()
    try:
        candidate.relative_to(root)
    except ValueError as exc:
        raise ValueError("Path escapes STORAGE_ROOT") from exc
    return candidate


def write_evidence_json(correlation_id: str, filename: str, data: dict) -> str:
    root = ensure_storage()
    safe_id = "".join(c if c.isalnum() or c in "._-" else "_" for c in correlation_id)
    safe_name = "".join(c if c.isalnum() or c in "._-" else "_" for c in filename)
    dir_path = safe_join(root, "evidence", safe_id)
    dir_path.mkdir(parents=True, exist_ok=True)
    file_path = safe_join(root, "evidence", safe_id, safe_name)
    file_path.write_text(__import__("json").dumps(data, indent=2) + "\n", encoding="utf-8")
    return str(file_path)


def storage_writable() -> bool:
    try:
        root = ensure_storage()
        probe = root / ".write_probe"
        probe.write_text("ok", encoding="utf-8")
        probe.unlink(missing_ok=True)
        return True
    except OSError:
        return False
