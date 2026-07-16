# AGENTS.md

## Codebase Summary

Public repo. Personal central skill collection → installable via `npx skills add jasonyang-ee/skills`.
11 skills: own (`handoff`, `workonplan`), derived `cook`, + vendored MIT (cavekit, caveman → see `NOTICE.md`).
Skills = markdown only. ⊥ runtime code shipped to user.

## Layout

- `skills/<name>/SKILL.md` = the products. Scanned by skills CLI.
- `SPEC.md` = single system truth. Read before any change. Baked format header @ top. §V invariants, §T tasks, §R sourced research.
- `NOTICE.md` = upstream MIT notices + per-skill provenance. ! update ∀ new vendor.
- `tests/` = `node:test`. Contract (spec compliance) + hygiene + attribution + real-CLI discovery.
- ⊥ `FORMAT.md`. Format → embedded `skills/spec/SKILL.md` §FORMAT + baked header.

## Commands

- `npm test` — full suite. ! green before commit.
- `/cook` — draft `PLAN.md` + `HANDOFF.md` + spec handoff.
- `/spec` — sole mutator of `SPEC.md`.
- `/caveman-commit` — single commit summary.

## Rules

- ∀ SKILL.md ! Agent Skills spec compliant → https://agentskills.io/specification.md
  `name` == parent dir name, ≤64 chars, `[a-z0-9-]`. `description` ≤1024 chars. Body ≤500 lines.
- ⊥ project-specific refs in `skills/**` (∵ repo public & skills ∀ codebases).
  Denylist enforced → `tests/repo-hygiene.test.mjs`.
- ⊥ Python. ⊥ `scripts/` in any skill. ⊥ vendor skills needing hooks | subagents (→ silent no-op).
- `cook` ! emit `PLAN.md` + `HANDOFF.md` pair. `PLAN.md` ! research-first & verify-last. Durable truth ! land in `SPEC.md` via `spec`.
- Vendor new MIT skill → ! `NOTICE.md` row + copyright + permission notice. README credit alone ⊥ compliant. `tests/attribution.test.mjs` enforces.
- `caveman` (chat) ≠ `caveman-encode` (SPEC.md). Contradict on symbols. ! keep descriptions cross-pointing (§V.18).
- ⊥ npm publish. Install path = GitHub direct (§R.3). `package.json` `private: true` guards.
- ∀ `.github/workflows/*.yml` ! top-level `permissions:`.
- Release = tag `v<x.y.z>` → ! matching `## [x.y.z]` in `CHANGELOG.md` & `package.json` version match, else CI blocks.

## Encoding

- `SPEC.md`, this file → caveman.
- `README.md`, `CONTRIBUTING.md`, `NOTICE.md`, SKILL.md bodies, commit messages → normal English.
- Vendored SKILL.md → ⊥ restyle. Keep upstream voice. Diff = only what `NOTICE.md` records.

## Caveman symbols

Use symbols below as short, exact operators. Preserve paths, code, IDs, URLs,
numbers, regex, errors verbatim.

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
- `npm test` green.
- Commit directly (single summary commit, no Claude co-author trailer). ⊥ push | tag without explicit ask.
