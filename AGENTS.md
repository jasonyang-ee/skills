# AGENTS.md

## Codebase Summary

Public repo. Publishes agent skills → installable via `npx skills add jasonyang-ee/skills`.
Skills = markdown only. ⊥ runtime code shipped to user.

## Layout

- `skills/<name>/SKILL.md` = the products. Scanned by skills CLI.
- `SPEC.md` = single system truth. Read before any change. §V invariants, §T tasks, §R sourced research.
- `FORMAT.md` = SPEC.md sections + caveman encoding rules.
- `tests/` = `node:test`. Contract (spec compliance) + hygiene + real-CLI discovery.

## Commands

- `npm test` — full suite. ! green before commit.
- `/spec` — sole mutator of `SPEC.md`.
- `/caveman-commit` — single commit summary.
- `/caveman-compress` — compress `AGENTS.md`.

## Rules

- ∀ SKILL.md ! Agent Skills spec compliant → https://agentskills.io/specification.md
  `name` == parent dir name, ≤64 chars, `[a-z0-9-]`. `description` ≤1024 chars. Body ≤500 lines.
- ⊥ project-specific refs in `skills/**` (∵ repo public & skills ∀ codebases).
  Denylist enforced → `tests/repo-hygiene.test.mjs`.
- ⊥ npm publish. Install path = GitHub direct (§R.3). `package.json` `private: true` guards.
- ∀ `.github/workflows/*.yml` ! top-level `permissions:`.
- Release = tag `v<x.y.z>` → ! matching `## [x.y.z]` in `CHANGELOG.md` & `package.json` version match, else CI blocks.

## Encoding

- `SPEC.md`, `FORMAT.md`, this file → caveman.
- `README.md`, `CONTRIBUTING.md`, SKILL.md bodies, commit messages → normal English.

## End of Chat Checklist

- Update `CHANGELOG.md` `## [Unreleased]` for every feature/fix.
- Update `SPEC.md` for any behavior change (flip §T, add §V).
- `npm test` green.
- Commit directly (single summary commit, no Claude co-author trailer). ⊥ push | tag without explicit ask.
