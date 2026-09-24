#!/usr/bin/env bash
# Backup control-plane Postgres + STORAGE_ROOT.
# Does NOT include .env / secret files.
# Windows: run via Git Bash, WSL, or equivalent.
set -euo pipefail

# resources/scripts → repo root
ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
STORAGE_ROOT="${STORAGE_ROOT:-$ROOT_DIR/resources/storage/local}"
BACKUP_DIR="$STORAGE_ROOT/backups"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
OUT="$BACKUP_DIR/$STAMP"
mkdir -p "$OUT"

DB_URL="${DATABASE_URL:-}"
if [[ -z "$DB_URL" ]]; then
  echo "DATABASE_URL is required" >&2
  exit 1
fi

echo "Dumping Postgres..."
pg_dump --no-owner --format=custom --file="$OUT/controlplane.dump" "$DB_URL"

echo "Archiving STORAGE_ROOT (excluding backups and env files)..."
tar -C "$STORAGE_ROOT" \
  --exclude='backups' \
  --exclude='.env' \
  --exclude='.env.*' \
  -czf "$OUT/storage.tgz" .

# Never copy env into the bundle
if [[ -f "$OUT/.env" ]]; then rm -f "$OUT/.env"; fi

echo "Backup written to $OUT"
echo "  - controlplane.dump"
echo "  - storage.tgz"
