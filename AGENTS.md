# AGENTS.md

## Codebase Summary

Public repo. Personal central skill collection → installable via `npx skills add jasonyang-ee/skills`.
13 skills: own (`handoff`, `workonplan`, `dispatchplan`, `review-code`, `garnish`, `prep`), derived `cook`, + vendored MIT (cavekit, caveman → see `NOTICE.md`).
Skills = markdown only. ⊥ runtime code shipped to user.

## Layout

- `skills/<name>/SKILL.md` = products. Scanned by skills CLI.
- `SPEC.md` = single system truth. Read before any change. Baked format header @ top. §V invariants, §T tasks, §R sourced research.
- `NOTICE.md` = upstream MIT notices + per-skill provenance. ! update ∀ new vendor.
- `tests/` = `node:test`. Scope = `skills/**` + license/release guards only.
  ⊥ assert doc prose (`README.md`, `.github/CONTRIBUTING.md`) ∵ brittle @ ⊥ value.
- `.github/` = `workflows/`, `dependabot.yml`, `CONTRIBUTING.md`.
- `release.sh` = one-command release. Bump → changelog → commit → tag → push.
  ⊥ publish. Tag push → `release.yml` → GitHub Release.

## Commands

1. `/prep` → bootstrap guidance + minimal durable files
2. `/cook` → iterative `PLAN.md` + `HANDOFF.md` + `SPEC.md` handoff.
3. `/review-plan` → research/refute plan → GO/NO-GO
4. `/workonplan [phase]` → execute all remaining phases in order → verify → commit → handoff. Optional phase arg targets one phase. Single main agent.
5. `/dispatchplan` → execute phase → verify → commit → handoff. Multi sub-agents, parallel when file sets ⊥ intersect.
   4 | 5 exclusive per phase, ⊥ both.
6. `/garnish` → spec cleanup → purge PLAN.md + HANDOFF.md
7. `/review-code` → baseline code sweep → cook

support: `/spec` sole SPEC.md mutator | `/handoff` baton | `/caveman-encode` file encoding | `/caveman` chat brevity | `/caveman-commit` commit summary | `/caveman-pr` PR review comments

## Project Scripts:

- `./release.sh` → release new Docker image + tag + push to GitLab registry

## Rules

- ∀ `SKILL.md` ! Agent Skills spec compliant → https://agentskills.io/specification.md
  `name` == parent dir name, ≤64 chars, `[a-z0-9-]`. `description` ≤1024 chars. Body ≤500 lines.
- ⊥ project-specific refs in `skills/**` (∵ repo public & skills ∀ codebases).
- ⊥ Python. ⊥ `scripts/` in any skill. ⊥ vendor skills needing hooks | subagents.
- `cook` ! emit `PLAN.md` + `HANDOFF.md` pair. `PLAN.md` ! research-first & verify-last. Durable truth ! land in `SPEC.md` via `spec`.
- Vendor new MIT skill → ! `NOTICE.md` row + copyright + permission notice.
- `caveman` (chat) ≠ `caveman-encode` (SPEC.md). Contradict on symbols. ! keep descriptions cross-pointing (§V.18).
- ⊥ npm publish. Install path = GitHub direct (§R.3). `package.json` `private: true` guards.
- ∀ `.github/workflows/*.yml` ! top-level `permissions:`.
- Release = `./release.sh` (⊥ hand-bump). Tag `v<x.y.z>` → ! matching `## [x.y.z]` in `CHANGELOG.md` & `package.json` version match, else CI blocks.
- `release.sh` test gate ! stay & ! show output on red. ⊥ add skip flag (∵ red tag ≫ painful to walk back).

## Encoding

- `SPEC.md`, this file → caveman.
- `README.md`, `.github/CONTRIBUTING.md`, `NOTICE.md`, SKILL.md bodies, commit messages → normal English.
- Vendored SKILL.md → ⊥ restyle. Keep upstream voice. Diff = only what `NOTICE.md` records.

## Caveman symbols

Use symbols as short, exact operators. Preserve paths, code, IDs, URLs, numbers,
regex, errors verbatim.

- `→` leads to | becomes | triggers
- `∴` therefore | consequence
- `∀` every | for all
- `∃` some | exists
- `!` must | required
- `?` unknown | optional
- `⊥` never | forbidden | absent
- `≠` differs | `∈` member of | `∉` not member of
- `≤` at most | `≥` at least | `&` and | `|` or
- `§` section reference, e.g. `§V.3`

Tables use `|`; escape literal `|` as `\|`. `§T` status: `x` done, `~` wip,
`.` todo. `caveman` prose drops symbols; `caveman-encode` requires them for
`SPEC.md`, `PLAN.md`, and `HANDOFF.md`.

## End of Chat Checklist

- Update `CHANGELOG.md` `## [Unreleased]` for every feature/fix.
- Update `SPEC.md` for any behavior change (flip §T, add §V).
- `npm test` green. ⊥ read exit 0 as ∀ §V proven — doc §V (V50,V52,V55-V60) = manual oracle.
- Touch `README.md` | `.github/CONTRIBUTING.md` → ! re-read those §V by hand (⊥ test catches drift).
- Refresh `HANDOFF.md` when phase/session ends.
- Commit directly (single summary commit, no Claude co-author trailer). ⊥ push | tag without explicit ask.
