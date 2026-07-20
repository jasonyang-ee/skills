---
name: garnish
description: |
  Close a completed cook cycle with evidence-gated closure: verifies
  every PLAN task is done, final verification is complete, tests are green,
  and no unrelated work is dirty, then removes short-lived PLAN.md and
  HANDOFF.md while preserving SPEC.md and repository history. Triggers when
  the user says garnish, clean up the plan, close the plan cycle, or all
  cook phases are complete.
license: MIT
---

# garnish — close PLAN cycle

`garnish` is a destructive cleanup gate for short-term execution files. It
does not erase durable specification, source code, tests, changelog entries, or
git history. It prepares the repository for a new `/prep` round.

## Preconditions

Stop and report the blocker if any condition fails:

1. `PLAN.md` and `HANDOFF.md` both exist at repository root.
2. Every PLAN phase has a `task: T<n>` mapping and every mapped `§T` row is
   `x`.
3. The final verification table in `HANDOFF.md` has no `VIOLATE` or
   `UNVERIFIABLE` result; all checked items are `HOLD` with evidence.
4. The recorded oracle and full-suite command pass now. Record exact command
   and result before cleanup.
5. Before the `encode-docs` handoff, `git status` contains no unrelated changes. After
   it, only the expected `SPEC.md` update plus `PLAN.md`/`HANDOFF.md` removal
   may remain; never delete or reset anything else.

## Procedure

1. Read `SPEC.md` and confirm durable goal, invariants, and task statuses are
   complete. If a task is not complete, return to `cook`.
2. Read the entire final verification table and handoff next pointer. If it
   points to unfinished work, stop.
3. Prepare a durable cleanup handoff for `encode-docs`: accepted final decisions,
   resolved research, new bugs/invariants, interface changes, and completed
   task state. Invoke `encode-docs` to update only durable `SPEC.md` sections; never
   write `SPEC.md` directly from `garnish`. Review/accept the spec diff before
   cleanup.
4. Run the recorded oracle and full suite; if either fails, classify via
   `encode-docs bug:` or return to `cook` before cleanup.
5. Recheck `git status --short`; confirm only expected `SPEC.md` changes plus
   `PLAN.md` and `HANDOFF.md` removal remain.
6. Remove exactly `PLAN.md` and `HANDOFF.md` from repository root. Preserve
   `SPEC.md`, source, tests, `CHANGELOG.md`, and all other files.
7. Verify both short-term files are absent, `SPEC.md` remains, and the cleanup
   diff contains no unrelated deletion. Recommend `/review-code` as the final
   post-cycle review.

## Output

```md
## garnish
plan: <removed | blocked: reason>
handoff: <removed | blocked: reason>
tests: <command> → <green | exact failures>
durable state: SPEC.md preserved
SPEC.md: <updated | no durable changes>
next: `/review-code`
```

## Boundaries

- Never purge `SPEC.md`.
- Never delete files when unrelated changes are present.
- Never mark a phase complete or mutate `SPEC.md` directly; route durable
  changes through `encode-docs`.
- Never invoke `prep` automatically; review implementation first, then let it
  trigger the next prep cycle.
