## Commands

- `/caveman-commit` — single commit summary.
- `/caveman-compress` — compress this `AGENTS.md` or `CLAUDE.md`.
- `/spec` — sync `SPEC.md` with code + future SDD.

## AI File Purpose

- `SPEC.md` = single system truth. read before backend/frontend work. update as code changes.
- `FORMAT.md` = SPEC.md section + caveman encoding rules.


## Codebase Summary

Custom Skills competable with `npx skills add` installation method.

## End of Chat Checklist

- Update `CHANGELOG.md` `## [Unreleased]` for every feature/fix.
- Update `SPEC.md` with any code changes or new features (§U for UI changes).
- Commit directly (single summary commit, no Claude co-author trailer). Never push or tag without explicit ask.
- Ensure all lint and tests pass.