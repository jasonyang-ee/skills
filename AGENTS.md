# AGENTS.md

## Codebase Summary

Public repo. Personal central skill collection → installable via `npx skills add jasonyang-ee/skills`.
11 skills: own (`handoff`, `cook`, `cater`, `review-code`, `garnish`, `setup`), derived `prep`, + vendored MIT (cavekit, caveman → see `NOTICE.md`).
Skills = markdown only. ⊥ runtime code shipped to user.

## AI File Purpose

- `encode-docs` = sole mutator & format owner of the 3 docs (`SPEC.md`/`PLAN.md`/`HANDOFF.md`); ∀ write to them routes through it (§V16, §V19). Other skills hand it content, ⊥ write directly.
- `AGENTS.md` = repo work rules.
- `SPEC.md` = single system truth, durable & mutable. Read before any change. Baked format header @ top. §G goal, §C constraints, §I interfaces, §R sourced research, §V invariants. ⊥ §T tasks, ⊥ §B bugs; high bar to add, prune freely on evidence.
- `PLAN.md` + `HANDOFF.md` = short-lived cycle files. `PLAN.md` = next phase plan & owns task tracking (§T). `HANDOFF.md` = phase handoff summary. ∀ change → hand `PLAN.md` + `HANDOFF.md` updates to `encode-docs`; `SPEC.md` only for durable change.

## Skills

Workflow (spec-driven, in order):

1. `/setup` → bootstrap guidance + minimal durable files.
2. `/prep` → iterative PLAN.md + HANDOFF.md + SPEC.md handoff.
3. `/review-plan` → research/refute plan → GO/NO-GO.
4. `/cook` → execute phase → verify → commit → handoff. Single main agent.
5. `/cater` → parallel execute phases via sub-agents, parallel when file sets ⊥ intersect. 4 | 5 exclusive per phase, ⊥ both.
6. `/garnish` → spec cleanup → purge PLAN.md + HANDOFF.md.
7. `/review-code` → baseline code sweep → cook.

Support:  `/handoff` baton | `/encode-docs` AI Files mutator | `/encode-commit` commit summary | `/encode-pr` PR review comments.

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

Tables use `|`; escape literal `\|`. `§T` status: `x` done, `~` wip, `.` todo. `/encode-docs` requires them for `SPEC.md`, `PLAN.md`, `HANDOFF.md`.

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
- `prep` ! emit `PLAN.md` + `HANDOFF.md` pair. `PLAN.md` ! research-first & verify-last. Durable truth ! land in `SPEC.md` via `encode-docs`.
- Vendor new MIT skill → ! `NOTICE.md` row + copyright + permission notice.
- ⊥ npm publish. Install path = GitHub direct (§R.3). `package.json` `private: true` guards.
- ∀ `.github/workflows/*.yml` ! top-level `permissions:`.
- Release = `./release.sh` (⊥ hand-bump). Tag `v<x.y.z>` → ! matching `## [x.y.z]` in `CHANGELOG.md` & `package.json` version match, else CI blocks.
- `release.sh` test gate ! stay & ! show output on red. ⊥ add skip flag (∵ red tag ≫ painful to walk back).

## End of Chat Checklist

- `npm test` pass.
- Update `CHANGELOG.md` `## [Unreleased]` for every feature/fix using plain English.
- Update `SPEC.md` only for durable change (add §V, high bar); flip §T in `PLAN.md`.
- Refresh `HANDOFF.md` when phase/session ends.
- Commit directly (single summary commit, no Claude co-author trailer). ⊥ push | tag without explicit ask.