#!/usr/bin/env bash
# Creates lauriszeltins132-rgb/boonbuyfinds (requires gh logged in as YOU, not the Cursor bot)
set -euo pipefail

REPO="lauriszeltins132-rgb/boonbuyfinds"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT"

if gh repo view "$REPO" >/dev/null 2>&1; then
  echo "Repo exists: https://github.com/$REPO"
else
  echo "Creating https://github.com/$REPO ..."
  gh repo create "$REPO" \
    --public \
    --description "BoonBuy Finds — curated fashion & sneaker finds for BoonBuy agent"
fi

git remote set-url origin "https://github.com/$REPO.git"
git branch -M main
git push -u origin main

echo ""
echo "Done: https://github.com/$REPO"
