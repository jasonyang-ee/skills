---
name: prep
description: |
  Bootstrap repository guidance for the six-step workflow. Creates or safely
  completes AGENTS.md with user-editable commands, caveman symbols, and an end
  checklist; creates CLAUDE.md containing @AGENTS.md when absent; and asks spec
  to create minimal CHANGELOG.md and SPEC.md files when absent. Never overwrites
  existing user guidance or durable project state. Triggers for prep, bootstrap
  agent instructions, or preparing a repository for cook.
license: MIT
---

# prep — bootstrap repository guidance

Use `prep` once at the start of a repository, or later to audit missing workflow
sections. It prepares the cold-session files needed by `cook`, `review-plan`,
`workonplan`, `garnish`, and `review-implementation`.

## Six workflow commands

The generated or completed `AGENTS.md` must list these commands in this order:

1. `/prep` — bootstrap guidance and minimal durable files.
2. `/cook` — turn an idea, bug, feature, or expected behavior into iterative
   `PLAN.md` + `HANDOFF.md` and durable `SPEC.md` material.
3. `/review-plan` — research and refute the plan until GO; reduce research
   phases as unknowns resolve.
4. `/workonplan` — execute one phase, verify it, commit it, and refresh the
   handoff before continuing.
5. `/garnish` — send final decisions through `spec`, then purge short-term plan
   files when the cycle is complete.
6. `/review-implementation` — sweep implementation quality from the release
   baseline and trigger the next `cook` cycle for accepted fixes.

`spec`, `handoff`, and `caveman-encode` remain supporting skills invoked by the
workflow; do not add them as extra lifecycle steps.

## Preflight

1. Read existing `AGENTS.md`, `CLAUDE.md`, `CHANGELOG.md`, and `SPEC.md` in
   full when present.
2. If `AGENTS.md` is absent, create it from the template below. If present,
   preserve all user content and add only missing sections or clearly marked
   placeholders. Never replace project-specific instructions silently.
3. If `CLAUDE.md` is absent, create it with exactly:

   ```md
   @AGENTS.md
   ```

   If it exists, preserve it; report if it does not import `@AGENTS.md` instead
   of overwriting it.
4. If `CHANGELOG.md` is absent, create the minimal structure below.
5. If `SPEC.md` is absent, invoke `spec` in NEW mode to create its baked-header
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
6. `/review-implementation` → baseline code sweep → cook

support: `/spec` sole SPEC.md mutator | `/handoff` baton | `/caveman-encode` file encoding

## Caveman symbols
<user fills symbols or keeps repository legend>

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

- `AGENTS.md` has all six commands in order, Caveman symbols, and checklist;
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
