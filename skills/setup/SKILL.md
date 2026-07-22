---
name: setup
description: |
  Bootstrap repository guidance for the spec-driven workflow. Creates or safely
  completes AGENTS.md with lifecycle commands, pre-filled encoding symbols, and
  an end checklist; creates CLAUDE.md containing @AGENTS.md when absent; and
  asks encode-docs to create minimal CHANGELOG.md and SPEC.md files when absent.
  Never overwrites existing user guidance or durable file. Triggers: "/setup".
---

# setup — bootstrap repository guidance

Use `setup` once at the start of a repository, or later to audit missing workflow
sections. It prepares the cold-session files needed by `prep`, `review-plan`,
`cook`, `garnish`, and `review-code`.

## Bootstrap command list

The generated or completed `AGENTS.md` must list these commands in this order:

This is the seven-command bootstrap list, including `/setup`. It is separate from
the six core workflow steps: those steps begin
with `/prep`, and step 2 is the `encode-docs` writing discipline. `encode-docs`
and `handoff` remain supporting skills invoked by the core workflow; do not add
them as extra command entries.

`/cook` and `/cater` are two ways to run the same execution step,
so the core workflow counts them once. The bootstrap list gives each its own
entry: a reader who never sees `/cater` named never reaches for it.

1. `/setup` — bootstrap guidance and minimal durable files.
2. `/prep` — turn an idea, bug, feature, or expected behavior into iterative
   `PLAN.md` + `HANDOFF.md` and durable `SPEC.md` material.
3. `/review-plan` — research and refute the plan until GO; reduce research
   phases as unknowns resolve.
4. `/cook` — execute all remaining phases in order, verifying, committing,
   and refreshing the handoff after each phase. One main agent, start to finish.
   An optional phase argument targets one phase only.
5. `/cater` — execute the same phases through sub-agents, in parallel
   only where their file sets do not intersect. Choose this or `/cook`
   for a given phase, never both.
6. `/garnish` — send final decisions through `encode-docs`, then purge short-term plan
   files when the cycle is complete.
7. `/review-code` — sweep implementation quality from the release baseline and
   trigger the next `prep` cycle for accepted fixes.

## Preflight

1. Load `encode-docs` before reading or writing `AGENTS.md` — `AGENTS.md`
   is encoded with the symbol set.
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
6. If `SPEC.md` is absent, invoke `encode-docs` in NEW mode to create its baked-header
   minimal structure. `setup` never writes `SPEC.md` directly.

## AGENTS.md required sections

When creating or completing `AGENTS.md`, keep it encoded and include:

```md
# AGENTS.md

## AI File Purpose
- `encode-docs` = sole mutator & format owner of the 3 docs (`SPEC.md`/`PLAN.md`/`HANDOFF.md`); ∀ write to them routes through it. Other skills hand it content, ⊥ write directly.
- `AGENTS.md` = repo work rules.
- `SPEC.md` = single system truth, durable & mutable. Read before any change. Baked format header @ top. §G goal, §C constraints, §I interfaces, §R sourced research, §V invariants. ⊥ one-time fixes; high bar to add.
- `PLAN.md` + `HANDOFF.md` = short-lived cycle files. `PLAN.md` = next phase plan & owns task tracking (§T). `HANDOFF.md` = phase handoff summary. ∀ change → hand `PLAN.md` + `HANDOFF.md` updates to `encode-docs`; `SPEC.md` only for durable change.

## Codebase Summary
<user fills project purpose, stack, and repository boundary>

## Layout
<user fills important paths>

## Skills
1. `/setup` → bootstrap guidance + minimal durable files
2. `/prep` → iterative PLAN.md + HANDOFF.md + SPEC.md handoff
3. `/review-plan` → research/refute plan → GO/NO-GO
4. `/cook` → execute all remaining phases in order → verify → commit →
   handoff after each phase. Optional phase arg → target one phase. Single main
   agent.
5. `/cater` → same phases via sub-agents, parallel when file sets ⊥ intersect.
   4 | 5 exclusive per phase, ⊥ both.
6. `/garnish` → SPEC.md cleanup → purge PLAN.md + HANDOFF.md
7. `/review-code` → baseline code sweep → prep

support: `/encode-docs` sole mutator of the 3 docs + document formats | `/handoff` baton | `/encode-commit` commit summary | `/encode-pr` PR review comments

## Encoding Symbols

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
`encode-docs` requires the symbols for `SPEC.md`,
`PLAN.md`, and `HANDOFF.md`.

## Rules
<user fills project constraints and safety rules>

## End of Chat Checklist
- Ensure repo tests pass.
- Update `CHANGELOG.md` `## [Unreleased]` ∀ feature/fix.
- Update `SPEC.md` only for durable change (add `§V`, high bar); flip `§T` in `PLAN.md`.
- Refresh `HANDOFF.md` when phase/session ends.
- Commit directly (single summary commit, no AI co-author trailer). ⊥ push | tag without explicit ask.
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

- `AGENTS.md` has all seven bootstrap commands in order, Encoding symbols, and checklist;
- a new `AGENTS.md` template includes AI-file purpose, workflow skills, project-script placeholders, and the full end-of-chat checklist;
- `CLAUDE.md` is exactly `@AGENTS.md` when setup created it;
- `CHANGELOG.md` has `## [Unreleased]`;
- `SPEC.md` exists with the baked header and fixed sections;
- existing files were not overwritten.

## Boundaries

- Never overwrite existing `AGENTS.md`, `CLAUDE.md`, `CHANGELOG.md`, or
  `SPEC.md` without explicit user direction.
- Never write `SPEC.md` directly; invoke `encode-docs`.
- Never add project-specific facts as guesses.
- Never write code or create runtime dependencies.
