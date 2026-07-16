#!/usr/bin/env bash

# =============================================================================
# release.sh — cut a release in one command
# =============================================================================
# Bumps the version, moves the Unreleased changelog notes under it, commits,
# tags, and pushes. Publishing is NOT done here: pushing the tag triggers
# .github/workflows/release.yml, which re-runs the tests, verifies the tag
# matches package.json, extracts the changelog section, and creates the GitHub
# Release. Creating a release here too would make that workflow fail on a
# duplicate.
#
#   ./release.sh              # auto-detect the bump, ask before doing anything
#   ./release.sh --minor      # force a minor bump
#   ./release.sh --patch -y   # patch bump, no prompts
#   ./release.sh --dry-run    # print the plan, touch nothing
# =============================================================================

set -euo pipefail

RED=$'\033[0;31m'; GREEN=$'\033[0;32m'; YELLOW=$'\033[1;33m'
BLUE=$'\033[0;34m'; CYAN=$'\033[0;36m'; BOLD=$'\033[1m'; NC=$'\033[0m'

die() { echo "${RED}Error: $*${NC}" >&2; exit 1; }
step() { echo "${BLUE}$*${NC}"; }

FORCE_TYPE=""
SKIP_CONFIRM=false
DRY_RUN=false

for arg in "$@"; do
    case $arg in
        --major|--minor|--patch) FORCE_TYPE="${arg#--}" ;;
        --yes|-y) SKIP_CONFIRM=true ;;
        --dry-run|-n) DRY_RUN=true ;;
        --help|-h)
            echo "${BOLD}release.sh${NC} — cut a release in one command"
            echo ""
            echo "Usage: $0 [--major|--minor|--patch] [--yes] [--dry-run]"
            echo ""
            echo "  --major/--minor/--patch  Force the bump instead of detecting it"
            echo "  --yes, -y                Skip confirmation prompts"
            echo "  --dry-run, -n            Show the plan without changing anything"
            echo ""
            echo "Detection reads commits since the last tag: a 'BREAKING CHANGE:'"
            echo "footer (or a '!' after the type) means major, feat: means minor,"
            echo "otherwise patch."
            echo ""
            echo "The tag push triggers release.yml, which publishes the GitHub"
            echo "Release. This script never publishes one itself."
            exit 0
            ;;
        *) die "unknown option: $arg (try --help)" ;;
    esac
done

# -----------------------------------------------------------------------------
# Preflight
# -----------------------------------------------------------------------------

[ -f package.json ] && [ -f CHANGELOG.md ] || die "run this from the repo root"
command -v node >/dev/null || die "node is not installed"

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "${YELLOW}Warning: on branch '$CURRENT_BRANCH', not 'main'.${NC}"
    if [ "$SKIP_CONFIRM" != true ] && [ "$DRY_RUN" != true ]; then
        read -r -p "Continue anyway? (y/n) " reply
        [ "$reply" = "y" ] || die "canceled"
    fi
fi

# A release must be reproducible from what is committed. Stray edits would be
# tagged without being in the tag.
if ! git diff-index --quiet HEAD -- && [ "$DRY_RUN" != true ]; then
    git status --short
    die "uncommitted changes — commit or stash them first"
fi

# -----------------------------------------------------------------------------
# Work out the new version
# -----------------------------------------------------------------------------

VERSION="$(node -p "require('./package.json').version")"
echo "${BLUE}Current version: ${BOLD}${VERSION}${NC}"

LATEST_TAG="$(git describe --tags --abbrev=0 2>/dev/null || echo "")"

if [ -n "$FORCE_TYPE" ]; then
    RELEASE_TYPE="$FORCE_TYPE"
    echo "${CYAN}Release type (forced): ${BOLD}${RELEASE_TYPE}${NC}"
elif [ -z "$LATEST_TAG" ]; then
    RELEASE_TYPE="patch"
    echo "${YELLOW}No tags found. Defaulting to patch.${NC}"
else
    echo "${BLUE}Latest tag: ${BOLD}${LATEST_TAG}${NC}"
    # Full bodies, not --oneline: the breaking-change footer lives in the commit
    # body and a subject-only scan silently misses every major release.
    RANGE_BODIES="$(git log "${LATEST_TAG}..HEAD" --format=%B)"
    RANGE_SUBJECTS="$(git log "${LATEST_TAG}..HEAD" --format=%s)"

    if [ -z "$(echo "$RANGE_SUBJECTS" | tr -d '[:space:]')" ]; then
        echo "${YELLOW}No commits since ${LATEST_TAG}. Nothing to release.${NC}"
        exit 0
    fi

    # Anchored footer, per Conventional Commits: a commit that merely discusses
    # breaking changes in prose is not itself one.
    if echo "$RANGE_BODIES" | grep -qE '^BREAKING[ -]CHANGE: ' \
        || echo "$RANGE_SUBJECTS" | grep -qE '^[a-z]+(\([^)]*\))?!:'; then
        RELEASE_TYPE="major"
    elif echo "$RANGE_SUBJECTS" | grep -qE '^feat(\([^)]*\))?:'; then
        RELEASE_TYPE="minor"
    else
        RELEASE_TYPE="patch"
    fi
    echo "${CYAN}Release type (detected): ${BOLD}${RELEASE_TYPE}${NC}"
fi

IFS='.' read -r -a parts <<< "$VERSION"
case "$RELEASE_TYPE" in
    major) parts[0]=$((parts[0] + 1)); parts[1]=0; parts[2]=0 ;;
    minor) parts[1]=$((parts[1] + 1)); parts[2]=0 ;;
    patch) parts[2]=$((parts[2] + 1)) ;;
esac
NEW_VERSION="${parts[0]}.${parts[1]}.${parts[2]}"
TAG="v${NEW_VERSION}"

if git rev-parse -q --verify "refs/tags/${TAG}" >/dev/null; then
    die "tag ${TAG} already exists"
fi

# release.yml refuses a tag whose changelog section is empty, so catch it here
# rather than after the tag is already pushed.
UNRELEASED_BODY="$(awk '
    /^## \[Unreleased\]/ { found = 1; next }
    found && index($0, "## [") == 1 { exit }
    found { print }
' CHANGELOG.md | grep -v '^[[:space:]]*$' || true)"
[ -n "$UNRELEASED_BODY" ] || die "CHANGELOG.md has an empty [Unreleased] section — nothing to release"

echo "${GREEN}New version: ${BOLD}${NEW_VERSION}${NC}  ${BLUE}(tag ${TAG})${NC}"
echo ""
echo "${BOLD}Release notes:${NC}"
echo "$UNRELEASED_BODY"
echo ""

if [ "$DRY_RUN" = true ]; then
    echo "${CYAN}Dry run — nothing changed.${NC}"
    echo "Would: test → bump to ${NEW_VERSION} → changelog → commit → tag ${TAG} → push"
    exit 0
fi

if [ "$SKIP_CONFIRM" != true ]; then
    read -r -p "Release ${TAG}? (y/n) " reply
    [ "$reply" = "y" ] || die "canceled"
fi

# -----------------------------------------------------------------------------
# Release
# -----------------------------------------------------------------------------

# The workflow runs these too, but failing here costs nothing and a red tag is
# painful to walk back.
step "Running tests..."
npm test >/dev/null 2>&1 || die "tests are red — not releasing"

step "Bumping package.json..."
npm version "$NEW_VERSION" --no-git-tag-version >/dev/null

step "Updating CHANGELOG.md..."
DATE_TODAY="$(date +%Y-%m-%d)"
REMOTE_URL="$(git remote get-url origin)"
REPO_URL="${REMOTE_URL%.git}"
REPO_URL="${REPO_URL/git@github.com:/https://github.com/}"

# Leave [Unreleased] empty and move its notes under the new heading.
awk -v version="$NEW_VERSION" -v date="$DATE_TODAY" '
    /^## \[Unreleased\]/ && !seen {
        print $0; print ""; print "## [" version "] - " date
        seen = 1; next
    }
    { print }
' CHANGELOG.md > CHANGELOG.tmp && mv CHANGELOG.tmp CHANGELOG.md

# Keep the link definitions honest: Unreleased compares against the new tag,
# and the new version gets its own release link.
awk -v version="$NEW_VERSION" -v repo="$REPO_URL" '
    /^\[Unreleased\]:/ {
        print "[Unreleased]: " repo "/compare/v" version "...HEAD"
        print "[" version "]: " repo "/releases/tag/v" version
        next
    }
    { print }
' CHANGELOG.md > CHANGELOG.tmp && mv CHANGELOG.tmp CHANGELOG.md

# Mirror the workflow's own gates before creating the tag.
grep -q "^## \[${NEW_VERSION}\]" CHANGELOG.md || die "changelog section for ${NEW_VERSION} missing"
[ "$(node -p "require('./package.json').version")" = "$NEW_VERSION" ] || die "package.json bump failed"

step "Committing and tagging..."
git add package.json package-lock.json CHANGELOG.md
git commit -q -m "release: ${TAG}"
git tag "$TAG"

step "Pushing..."
git push -q origin "$CURRENT_BRANCH"
git push -q origin "$TAG"

echo ""
echo "${GREEN}${BOLD}✓ ${TAG} pushed.${NC}"
echo "release.yml is publishing the GitHub Release now."
if command -v gh >/dev/null && gh auth status >/dev/null 2>&1; then
    echo "Watch it:  ${BOLD}gh run watch${NC}      See it:  ${BOLD}gh release view ${TAG} --web${NC}"
fi
