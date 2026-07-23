# AGENTS.md

## Codebase Summary

Public repo. Spec driven design skill collection.

12 skills: `handoff`, `cook`, `cater`, `review-code`, `review-plan`, `garnish`, `setup`, `prep`, `encode-commit`, `encode-pr`, `encode-docs`, and `encode-header`. Derived work of symbols and spec structure from vendored MIT (cavekit, caveman → see `NOTICE.md`). Skills = markdown only. ⊥ runtime code shipped to user.

## AI File Purpose

- `AGENTS.md` = repo work rules.
- `SPEC.md` = single system truth, durable & mutable. Read before any change. only for durable change. ⊥ one-time fixes; high bar to add.
- `PLAN.md` + `HANDOFF.md` = short-lived cycle files. `PLAN.md` = next phase plan & owns task tracking (§T). `HANDOFF.md` = session progress tracking.
- `BACKLOG.md` = optional, free style pending prep inputs and notes. only ingested by `/prep`.

## Skills

Workflow (spec-driven, in order):

1. `/setup` → bootstrap guidance + minimal durable files.
2. `/prep` → iterative PLAN.md + HANDOFF.md + SPEC.md handoff.
3. `/review-plan` → research/refute plan → GO/NO-GO.
4. `/cook` → execute phase → verify → commit → handoff. Single main agent.
5. `/cater` → parallel execute phases via sub-agents, parallel when file sets ⊥ intersect. 4 | 5 exclusive per phase, ⊥ both.
6. `/garnish` → spec cleanup → blank PLAN.md + HANDOFF.md to template.
7. `/review-code` → baseline code sweep → prep.

support: `/handoff` session baton | `/encode-docs` sole mutator of `SPEC.md`, `PLAN.md`, and `HANDOFF.md` | `encode-header` header template | `/encode-commit` commit summary | `/encode-pr` PR review comments

## SYMBOLS

Symbols = short exact operators. Preserve paths, code, IDs, URLs, numbers, regex, errors verbatim.

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

Tables use `|`; escape literal `\|`. SPEC `§C`/`§I`/`§R`/`§V` tables carry a GFM delimiter row (`|---|---|`, one cell per column) under the header. `§T` status: `x` done, `~` wip, `.` todo.

## Project Scripts:

- `./release.sh` → release new version + tag + push.

## Layout

- `skills/<name>/SKILL.md` = products. Scanned by skills CLI.
- `tests/` = `node:test`. Scope = Agent Skills contract (§V1-4) + real CLI discovery (§V5) only; license/release/hygiene = manual review, ⊥ test-backed.
  ⊥ assert doc prose | skill-body wording.
- `.github/` = `workflows/`, `dependabot.yml`, `CONTRIBUTING.md`.
- `NOTICE.md` = upstream MIT notices + per-skill provenance.

## Rules

- ∀ `SKILL.md` ! Agent Skills spec compliant → https://agentskills.io/specification.md
  `name` == parent dir name, ≤64 chars, `[a-z0-9-]`. `description` ≤1024 chars. Body ≤500 lines.
- ⊥ project-specific refs in `skills/**` (∵ repo public & skills ∀ codebases).
- ⊥ Python. ⊥ `scripts/` in any skill. ⊥ vendor skills needing hooks | subagents.
- `skills/**` bodies = unwrapped prose (1 line/paragraph); rely on editor soft-wrap, ⊥ manual line-wrap. Preserve verbatim: code fences, tables, baked-header comments, frontmatter, list structure.
- `prep` ! emit `PLAN.md` + `HANDOFF.md` pair. `PLAN.md` ! research-first & verify-last. Durable truth ! land in `SPEC.md` via `encode-docs`.
- Vendor new MIT skill → ! `NOTICE.md` row + copyright + permission notice.
- ⊥ npm publish. Install path = GitHub direct (§R.3). `package.json` `private: true` guards.
- ∀ `.github/workflows/*.yml` ! top-level `permissions:`.
- Release = `./release.sh` (⊥ hand-bump). Tag `v<x.y.z>` → ! matching `## [x.y.z]` in `CHANGELOG.md` & `package.json` version match, else CI blocks.
- `release.sh` test gate ! stay & ! show output on red. ⊥ add skip flag (∵ red tag ≫ painful to walk back).

## End of Chat Checklist

- `npm test` pass.
- Update `CHANGELOG.md` `## [Unreleased]` for every feature/fix using plain English.
- Commit directly (single summary commit, no Claude co-author trailer). ⊥ push | tag without explicit ask.