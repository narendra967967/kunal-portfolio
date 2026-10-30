#!/usr/bin/env bash
# Runs ON the VPS as the `portfolio` user (piped in by the GitHub Actions deploy):
#   ssh portfolio@<vps> "bash -s -- <git-sha>" < deploy/vps/publish.sh
# Expects the built site at /srv/portfolio/incoming/<sha>.tgz.
# Unpacks it into releases/<sha>, switches the `current` symlink atomically
# (Nginx serves /srv/portfolio/current), and keeps the newest 3 releases.
# Roll back by re-pointing `current` at an older release:
#   ln -sfn /srv/portfolio/releases/<old-sha> /srv/portfolio/current
set -euo pipefail

SHA="${1:?usage: publish.sh <git-sha>}"
ROOT=/srv/portfolio
KEEP=3
TARBALL="$ROOT/incoming/$SHA.tgz"
REL="$ROOT/releases/$SHA"

[ -f "$TARBALL" ] || { echo "Missing $TARBALL" >&2; exit 1; }
rm -rf "$REL.tmp" && mkdir -p "$REL.tmp"
tar -xzf "$TARBALL" -C "$REL.tmp"
[ -f "$REL.tmp/index.html" ] || { echo "Build has no index.html; refusing to publish" >&2; rm -rf "$REL.tmp"; exit 1; }
chmod -R u=rwX,go=rX "$REL.tmp"
rm -rf "$REL" && mv "$REL.tmp" "$REL"
# tar restores the build's own mtime on the folder; stamp it "now" so pruning
# below orders releases by publish time.
touch "$REL"

ln -sfn "$REL" "$ROOT/current.tmp" && mv -T "$ROOT/current.tmp" "$ROOT/current"
rm -f "$TARBALL"

# Prune old releases: keep the newest $KEEP, and never the one that's live.
LIVE="$(readlink -f "$ROOT/current")"
ls -1dt "$ROOT"/releases/*/ | tail -n +$((KEEP + 1)) | while read -r dir; do
  [ "$(readlink -f "$dir")" = "$LIVE" ] || rm -rf "$dir"
done

# Nginx answers for the site (a 301 to HTTPS also counts as up).
curl -fsS -o /dev/null -H 'Host: narendragupta.in' http://127.0.0.1/ && echo "Live: $SHA"
