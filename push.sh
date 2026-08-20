#!/bin/bash
set -e
cd /home/ramsescb/Projects/wekeend_Carta_Web/src/Weeknd_HY
echo "=== Staging changes ==="
git add .
echo "=== Committing changes ==="
git commit -m "feat: organize digital menu into Hexagonal Architecture (domain, application, infrastructure, presentation)" || echo "No changes to commit"
echo "=== Pushing to GitHub ==="
git push origin main
echo "=== Done ==="
