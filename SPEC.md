<!-- SPEC FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Sections, fixed order: §G goal | §C constraints | §I interfaces | §R research? | §V invariants
Symbols: → leads to | ∴ therefore | ∀ every | ∃ some | ! must | ? may/unknown | ⊥ never | ≠ | ∈ | ∉ | ≤ | ≥ | & and | § section
Durable truth only. Mutable: add sparingly (high bar), prune freely on evidence. Tasks (§T) → PLAN.md, ⊥ here. ⊥ §B bugs (→ CHANGELOG + git).
Address §<S>.<n> — §V.2 = invariants item 2. Commits/PRs cite by §.
Encoding: drop articles/filler/aux verbs. Fragments fine. Short synonyms (fix > implement).
Preserve verbatim: code, paths, identifiers, URLs, numbers, error strings, SQL, regex.
Tables (§R): pipe-delimited. Escape literal \| . Empty cell = -
ids: monotonic, never reused — take the next from `next:` below, ⊥ from the highest row (rows get pruned)
next: R8 V27
One file rule: >1000 lines → prune stale §V, ⊥ split into more files.
Full rules: /encode-docs skill. Cutting a word that loses a fact ⊥ allowed.
-->

# SPEC

## §G GOAL

Public repo `jasonyang-ee/skills` → personal central skill collection, installable via `npx skills add jasonyang-ee/skills`.

Core = 5-step spec-driven workflow (order contract → §V15):
1. `prep` → iterative idea/bug/feature/expected-behavior → `PLAN.md` + `HANDOFF.md` + durable `SPEC.md`
2. `review-plan` → iterative research/refute until plan ready → GO/NO-GO
3. `cook`|`cater` → execute `PLAN.md` phases with handoff closure (`cook` = single agent, `cater` = parallel sub-agents; exclusive per phase)
4. `garnish` → purge short-lived files, preserve + prune durable `SPEC.md`
5. `review-code` → post-implementation sweep; may trigger next `prep`

Core AI files:
- `SPEC.md` → durable truth, mutable when scope changes; holds durable facts only
- `PLAN.md` → phase plan for `cook`|`cater`; research-first, verify-last; owns task tracking (§T)
- `HANDOFF.md` → session baton for cold resume

Helpers: `setup` (bootstrap repo guidance), `encode-docs` (sole AI files mutator and owner), `encode-commit` (commit messages), `encode-pr` (PR review comments).

## §C CONSTRAINTS

- Comply Agent Skills spec (§R1). Installable: `npx skills add` (https://www.skills.sh/docs) → serves Claude Code (https://code.claude.com/docs/en/skills) + Codex (https://www.skills.sh/agent/codex) + more via `-a <agent>` from flat `skills/` layout (§R6); Claude Code also CLI-free via plugin marketplace (§R7).
- Skills = markdown only. ⊥ runtime deps for installing user. ⊥ Python. ⊥ `scripts/`. ⊥ vendor skills needing hooks | subagents.
- Layout `skills/<name>/SKILL.md`; `name` == dir. Agent Skills spec + skills CLI flat discovery (§R1, §R4).
- ⊥ project-specific | private refs in `skills/**` (∵ repo public & skills ∀ codebases).
- License MIT (`LICENSE` @ root). Vendored MIT → `NOTICE.md` reproduce upstream copyright + permission notice. Attribution ⊥ skill body → `NOTICE.md` sole record; frontmatter `license:` MAY stay (∵ `npx skills add` copies `SKILL.md` only, §R3).
- Publish = GitHub Release only (tag `v*` → `release.yml`). ⊥ npm publish (§R2). `package.json` `private: true`.
- Release = `./release.sh` (⊥ hand-bump). Test gate ! stay & ! surface output on red; ⊥ skip flag.
- Node ≥ 20 LTS. Tests = `node:test`; scope = Agent Skills contract (§V1-4) + real CLI discovery (§V5) only; license/release/hygiene = manual review, ⊥ test-backed; ⊥ assert doc prose | skill-body wording.
- CI ! least-priv top-level `permissions:`; ⊥ secrets beyond `GITHUB_TOKEN`.
- `.github/dependabot.yml` → ∀ `updates[]` `open-pull-requests-limit: 0` (∵ public repo, PR noise); dependabot security updates + alerts stay on.
- `encode-docs` almost always loaded → keep skill instructions lean.
- SPEC mutation = high bar to add (durable standing guarantee only), prune freely on evidence; ⊥ one-time items, ⊥ tasks, ⊥ bugs in `SPEC.md`.

## §I INTERFACES

- cmd: `npx skills add jasonyang-ee/skills` → installs ∀ skills → detected agents
- cmd: `npx skills add jasonyang-ee/skills --list` → lists ∀ skills
- cmd: `npx skills add jasonyang-ee/skills -s prep -s cook -s encode-docs -a claude-code -g -y` → 3 skills, 1 agent, global, non-interactive
- cmd: `npx skills add jasonyang-ee/skills -a <claude-code|codex>` → install ∀ skills into one named agent (§R6)
- file: `.claude-plugin/marketplace.json` = `{name:"jasonyang-ee", owner{name}, plugins[{name:"skills", source:"./", description}]}` + `.claude-plugin/plugin.json` = `{name:"skills", description}` → Claude Code plugin marketplace @ repo root; root plugin auto-scans `skills/` (§R7)
- cmd: `/plugin marketplace add jasonyang-ee/skills` → `/plugin install skills@jasonyang-ee` → Claude Code CLI-free install (§R7)
- file: `skills/<name>/SKILL.md` → frontmatter `{name == <name>, description}`
- cmd: `npm test` → `node --test` → exit 0 ⟺ automated checks pass (release/manual checks separate)
- cmd: `./release.sh [--major|--minor|--patch] [-y] [-n]` → preflight (branch, clean tree, tag ⊥ ∃, `[Unreleased]` ⊥ empty) → `npm test` gate → bump → changelog move → commit → tag `v<x.y.z>` → push
- ci: push | PR → `.github/workflows/ci.yml` → matrix Node 20, 22, 24
- ci: tag `v*.*.*` → `.github/workflows/release.yml` → GitHub Release, body ← `CHANGELOG.md` section

## §R RESEARCH

id|claim|source
R1|Agent Skills spec: `name` 1-64 chars `[a-z0-9-]`, ⊥ lead/trail `-`, ! == parent dir; `description` 1-1024 chars non-empty; body ≤ 500 lines & ≤ 5000 tokens recommended; `name`+`description` = sole startup-loaded metadata, body loads on activation|https://agentskills.io/specification.md
R2|`skills add owner/repo` → git clone GitHub direct; npm registry ∉ install path ∴ npm publish ⊥ needed|skills CLI README §Source Formats
R3|`npx skills add <repo>` copies `SKILL.md` + `skills-lock.json` only — ⊥ `NOTICE.md`, ⊥ `LICENSE` ∴ in-body attribution = only notice that would travel; user accepted `NOTICE.md`-only + frontmatter `license:` (MIT exposure accepted, leanness chosen)|empirical: `npx skills add` → temp dir → `find`
R4|skills CLI walks `skills/` 1 deep; `parseSkillMd` → null unless `name` & `description` present as strings ∴ malformed skill invisible to CLI|skills CLI dist
R5|Claude Code: ∀ frontmatter optional, `name` ← dir default; `description` always in context & drives auto-invocation ∴ state what + when-to-use|https://code.claude.com/docs/en/skills
R6|`skills` CLI (npm `skills`; github vercel-labs/skills) installs flat `skills/<name>/SKILL.md` into ∀ detected agent via `npx skills add <repo> -a <claude-code\|codex\|cursor>`; auto-detects installed agents; Codex + Claude Code served from same layout ∴ ⊥ per-agent repo files needed (old `codex.skills.sh/docs` = 404)|https://www.skills.sh/agent/codex + /agent/claude-code (2026-07-22)
R7|Claude Code CLI-free native install = plugin marketplace: `.claude-plugin/marketplace.json` = `{name, owner{name}, plugins[{name, source, description}]}` @ repo root; plugin `source` = relative path ! start `./` → marketplace-root plugin = `source:"./"`; single root entry (⊥ explicit `skills` path) → default `skills/` full scan = ∀ skills load; `.claude-plugin/plugin.json` optional, `name` = only required field if present; user runs `/plugin marketplace add jasonyang-ee/skills` then `/plugin install <name>@<marketplace>`|https://code.claude.com/docs/en/plugin-marketplaces + /plugins-reference (2026-07-22)

## §V INVARIANTS

V1: ∀ `skills/*/SKILL.md` → frontmatter parses as valid YAML; `name` & `description` = non-empty strings
V2: ∀ skill → `name` == parent dir name; `name` ∈ `/^[a-z0-9]+(-[a-z0-9]+)*$/` & len ≤ 64; unique across repo
V3: ∀ skill → `description` len ≤ 1024
V4: ∀ skill → SKILL.md body ≤ 500 lines (§R1)
V5: `skills add . --list` → lists ∀ dirs ∈ `skills/` (real CLI oracle, ⊥ mock)
V6: skills = markdown only → ⊥ `scripts/` dir, ⊥ Python, ⊥ runtime deps for installing user
V7: ∀ `skills/**/SKILL.md` → ⊥ project-specific | private-codebase refs
V8: ∀ `skills/**/SKILL.md` & `tests/**` → ⊥ emoji; behavior examples labelled `good`/`bad` as words
V9: `LICENSE` ! ∃ @ root & ∋ `MIT`
V10: vendored/derived skills → `NOTICE.md` row + upstream copyright + permission notice; ∀ shipped skill accounted (vendored | original); attribution block ⊥ in skill body (`NOTICE.md` sole record); frontmatter `license:` MAY stay
V11: `CHANGELOG.md` ! ∋ `## [Unreleased]`
V12: ∀ `.github/workflows/*.yml` → ! top-level `permissions:` block
V13: `.github/dependabot.yml` → ∀ `updates[]` `open-pull-requests-limit: 0`; security updates + alerts stay on
V14: release tag `v<x.y.z>` → `CHANGELOG.md` ! ∋ `## [<x.y.z>]` & `package.json` version == `<x.y.z>`; release via `./release.sh` only
V15: core workflow order: `prep` → `review-plan` → `cook`|`cater` → `garnish` → `review-code` → (next `prep`); `cook`|`cater` exclusive per phase; `setup` = bootstrap ⊥ core step; `encode-docs`/`handoff`/`encode-commit`/`encode-pr` = support
V16: `encode-docs` = sole mutator and owner of `SPEC.md`/`PLAN.md`/`HANDOFF.md` formats
V17: `SPEC.md` = durable truth, mutable; sections §G/§C/§I/§R/§V only; add durable rows only (high bar), prune stale on evidence
V18: task tracking (§T) lives in `PLAN.md` only; one-time fixes & bugs → `CHANGELOG.md` + git, ⊥ `SPEC.md`
V19: `PLAN.md` (phase plan; F1 research, Fn final verify; owns §T) + `HANDOFF.md` (session baton) = short-lived cycle files; ∀ their writes load `encode-docs`
V20: ∀ 3 docs open with own baked header emitted verbatim by `encode-docs`; SPEC header carries `next:` counter; ids monotonic, never reused
V21: `prep` → durable facts → `SPEC.md` via `encode-docs` (high bar); §T tasks authored in `PLAN.md`; ∀ PLAN phase = one `task: T<n>`; research-first phase & final-verify phase
V22: `cook`|`cater` ! `PLAN.md` ∃; verify-first, self-review before commit, `HANDOFF.md` refreshed + committed ∀ phase; `cook` = single agent, `cater` = parallel sub-agents on disjoint file sets via `HANDOFF-<phase-id>.md`
V23: `garnish` → evidence-gated prune of stale `SPEC.md` §V; purge `PLAN.md`/`HANDOFF.md`; ! completed cycle (∀ PLAN §T `x`, final verify `HOLD`)
V24: `review-plan` → research gate on dated current primary sources (⊥ model memory); explicit GO/NO-GO
V25: `review-code` → baseline = latest release tag | explicit release commit; ! carry security dimension; cite evidence; end → `prep`
V26: `review-code` & `review-plan` share ONE finding taxonomy {BLOCK, DIVERGENCE, UNKNOWN(`?`), HARDEN, NOTE} + ONE exhaustive GO/NO-GO rule, stated verbatim in both (mirror-check: block byte-identical); NO-GO iff ≥1 open BLOCK | open DIVERGENCE | open blocking `?`; else GO; HARDEN & NOTE ⊥ block; security → always BLOCK; DIVERGENCE resolves via fix-to-match-SPEC | amend-SPEC-via-`encode-docs`
