---
name: setup
description: |
  Bootstrap repository guidance for the spec-driven workflow. Creates or safely completes AGENTS.md with lifecycle commands, pre-filled encoding symbols, and an end checklist; creates CLAUDE.md containing @AGENTS.md when absent; and asks encode-docs to create minimal CHANGELOG.md and SPEC.md files when absent. Never overwrites existing user guidance or durable file. Triggers: "/setup".
---

# setup — bootstrap repository guidance

Use `setup` once at the start of a repository, or later to audit missing workflow sections. It prepares the  files needed by spec-driven workflow skills.

## Preflight

1. Load `encode-docs` before reading or writing `AGENTS.md`.
2. Read existing `AGENTS.md`, `CLAUDE.md`, `CHANGELOG.md`, and `SPEC.md` in full when present.
3. If `AGENTS.md` is absent, create it from the template below. Preserve all existing content and add only missing sections by the structure below. Only mutate content if user specifically asked.
4. If `CLAUDE.md` is absent, create it with exactly:

   ```md
   @AGENTS.md
   ```

   If it exists, preserve it; report if it does not import `@AGENTS.md` instead of overwriting it.
5. If `CHANGELOG.md` is absent, create the minimal structure below.
6. If `SPEC.md` is absent, invoke `encode-docs` in NEW mode to create its baked-header minimal structure. `setup` never writes `SPEC.md` directly.

## AGENTS.md required sections

When creating or completing `AGENTS.md`, append the following sections if they are missing. Preserve all user content, and never overwrite project-specific instructions.

```md
# AGENTS.md

## AI File Purpose
- `AGENTS.md` = repo work rules.
- `SPEC.md` = single system truth, durable & mutable. Read before any change. only for durable change. ⊥ one-time fixes; high bar to add.
- `PLAN.md` + `HANDOFF.md` = short-lived cycle files. `PLAN.md` = next phase plan & owns task tracking (§T). `HANDOFF.md` = session progress tracking.
- `BACKLOG.md` = optional, free style pending prep inputs and notes. only ingested by `/prep`.

## Skills
1. `/setup` → bootstrap guidance + minimal durable files
2. `/prep` → iterative PLAN.md + HANDOFF.md + SPEC.md handoff
3. `/review-plan` → research/refute plan → GO/NO-GO
4. `/cook` → execute all remaining phases in order → verify → commit → handoff after each phase. Optional phase arg → target one phase. Single main agent.
5. `/cater` → same phases via sub-agents, parallel when file sets ⊥ intersect. 4 | 5 exclusive per phase, ⊥ both.
6. `/garnish` → SPEC.md cleanup → blank PLAN.md + HANDOFF.md to template
7. `/review-code` → baseline code sweep → prep

support: `/handoff` session baton | `/encode-docs` sole mutator of `SPEC.md`, `PLAN.md`, and `HANDOFF.md` | `encode-header` header template | `/encode-commit` commit summary | `/encode-pr` PR review comments

## Encoding Symbols

Use symbols below as short, exact operators. Preserve paths, code, IDs, URLs, numbers, regex, errors verbatim.

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

## End of Chat Checklist
- Ensure repo tests pass.
- Update `CHANGELOG.md` `## [Unreleased]` ∀ feature/fix.
- Commit directly (single summary commit, no AI co-author trailer). ⊥ push | tag without explicit ask.
```

Do not invent project commands, paths, or constraints. Mark unknowns `?` until the user or research resolves them.

## CHANGELOG.md minimal Sections

If absent, create only:

```md
# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
```

## Verify

Report each action and preservation decision. Confirm:

- `AGENTS.md` has all seven bootstrap commands in order, Encoding symbols, and checklist;
- a new `AGENTS.md` template includes AI-file purpose, workflow skills, project-script placeholders, and the full end-of-chat checklist;
- `CLAUDE.md` is exactly `@AGENTS.md` when setup created it;
- `CHANGELOG.md` has `## [Unreleased]`;
- `SPEC.md` exists with the baked header and fixed sections;
- existing files were not overwritten.

## Boundaries

- Never overwrite existing `AGENTS.md`, `CLAUDE.md`, `CHANGELOG.md`, or `SPEC.md` without explicit user direction.
- Never write `SPEC.md` directly; invoke `encode-docs`.
- Never add project-specific facts as guesses.
- Never write code or create runtime dependencies.
