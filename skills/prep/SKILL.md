---
name: prep
description: |
  Bootstrap repository guidance for the spec-driven workflow. Creates or safely
  completes AGENTS.md with lifecycle commands, pre-filled caveman symbols, and
  an end checklist; creates CLAUDE.md containing @AGENTS.md when absent; and
  asks spec to create minimal CHANGELOG.md and SPEC.md files when absent.
  Never overwrites existing user guidance or durable project state. Triggers
  on /prep, "bootstrap this repo", "set up workflow files", "prepare a new project for cook",
  or "initialize agent guidance".
license: MIT
---

# prep — bootstrap repository guidance

Use `prep` once at the start of a repository, or later to audit missing workflow
sections. It prepares the cold-session files needed by `cook`, `review-plan`,
`workonplan`, `garnish`, and `review-code`.

## Bootstrap command list

The generated or completed `AGENTS.md` must list these commands in this order:

This is the six-command bootstrap list, including `/prep`. It is separate from
the six core workflow steps: those steps begin
with `/cook`, and step 2 is the `caveman-encode` writing discipline. `spec`,
`handoff`, and `caveman-encode` remain supporting skills invoked by the core
workflow; do not add them as extra command entries.

1. `/prep` — bootstrap guidance and minimal durable files.
2. `/cook` — turn an idea, bug, feature, or expected behavior into iterative
   `PLAN.md` + `HANDOFF.md` and durable `SPEC.md` material.
3. `/review-plan` — research and refute the plan until GO; reduce research
   phases as unknowns resolve.
4. `/workonplan` — execute one phase, verify it, commit it, and refresh the
   handoff before continuing.
5. `/garnish` — send final decisions through `spec`, then purge short-term plan
   files when the cycle is complete.
6. `/review-code` — sweep implementation quality from the release baseline and
   trigger the next `cook` cycle for accepted fixes.

## Preflight

1. Load `caveman-encode` before reading or writing `AGENTS.md` — `AGENTS.md`
   is caveman-encoded with the symbol set.
2. Read existing `AGENTS.md`, `CLAUDE.md`, `CHANGELOG.md`, and `SPEC.md` in
   full when present.
3. If `AGENTS.md` is absent, create it from the template below. If present,
   preserve all user content and add only missing sections or clearly marked
   placeholders. Never replace project-specific instructions silently.
4. If `CLAUDE.md` is absent, create it with exactly:

   ```md
   @AGENTS.md
   ```

   If it exists, preserve it; report if it does not import `@AGENTS.md` instead
   of overwriting it.
5. If `CHANGELOG.md` is absent, create the minimal structure below.
6. If `SPEC.md` is absent, invoke `spec` in NEW mode to create its baked-header
   minimal structure. `prep` never writes `SPEC.md` directly.

## AGENTS.md required sections

When creating or completing `AGENTS.md`, keep it caveman-encoded and include:

```md
# AGENTS.md

## Codebase Summary
<user fills project purpose, stack, and repository boundary>

## Layout
<user fills important paths>

## Commands
1. `/prep` → bootstrap guidance + minimal durable files
2. `/cook` → iterative PLAN.md + HANDOFF.md + SPEC.md handoff
3. `/review-plan` → research/refute plan → GO/NO-GO
4. `/workonplan` → execute phase → verify → commit → handoff
5. `/garnish` → spec cleanup → purge PLAN.md + HANDOFF.md
6. `/review-code` → baseline code sweep → cook

support: `/spec` sole SPEC.md mutator | `/handoff` baton | `/caveman-encode` file encoding | `/caveman-commit` commit summary

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

Tables use `|`; escape literal `\|`. `§T` status: `x` done, `~` wip, `.` todo.
`caveman` prose drops symbols; `caveman-encode` requires them for `SPEC.md`,
`PLAN.md`, and `HANDOFF.md`.

## Rules
<user fills project constraints and safety rules>

## End of Chat Checklist
- update CHANGELOG.md
- update SPEC.md for behavior changes
- run verification command
- refresh HANDOFF.md when phase/session ends
- commit; ⊥ push/tag without explicit ask
```

Do not invent project commands, paths, or constraints. Mark unknowns `?` until
the user or research resolves them.

## Minimal CHANGELOG.md

If absent, create only:

```md
# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
```

## Verify

Report each action and preservation decision. Confirm:

- `AGENTS.md` has all six bootstrap commands in order, Caveman symbols, and checklist;
- `CLAUDE.md` is exactly `@AGENTS.md` when prep created it;
- `CHANGELOG.md` has `## [Unreleased]`;
- `SPEC.md` exists with the baked header and fixed sections;
- existing files were not overwritten.

## Boundaries

- Never overwrite existing `AGENTS.md`, `CLAUDE.md`, `CHANGELOG.md`, or
  `SPEC.md` without explicit user direction.
- Never write `SPEC.md` directly; invoke `spec`.
- Never add project-specific facts as guesses.
- Never write code or create runtime dependencies.
