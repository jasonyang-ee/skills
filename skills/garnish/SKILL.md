---
name: garnish
description: |
  Close a completed workonplan cycle. Verifies every PLAN task is done, final
  verification is complete, tests are green, and no unrelated work is dirty,
  then removes short-lived PLAN.md and HANDOFF.md while preserving SPEC.md and
  repository history. Triggers when the user says garnish, clean up the plan,
  close the plan cycle, or all workonplan phases are complete.
license: MIT
---

# garnish — close PLAN cycle

`garnish` is a destructive cleanup gate for short-term execution files. It
does not erase durable specification, source code, tests, changelog entries, or
git history. It prepares the repository for a new `/cook` round.

## Preconditions

Stop and report the blocker if any condition fails:

1. `PLAN.md` and `HANDOFF.md` both exist at repository root.
2. Every PLAN phase has a `task: T<n>` mapping and every mapped `§T` row is
   `x`.
3. The final verification table in `HANDOFF.md` has no `VIOLATE` or
   `UNVERIFIABLE` result; all checked items are `HOLD` with evidence.
4. The recorded oracle and full-suite command pass now. Record exact command
   and result before cleanup.
5. `git status` contains no unrelated changes. Only `PLAN.md` and
   `HANDOFF.md` may be candidates for removal; never delete or reset anything
   else.

## Procedure

1. Read `SPEC.md` and confirm durable goal, invariants, and task statuses are
   complete. If a task is not complete, return to `workonplan`.
2. Read the entire final verification table and handoff next pointer. If it
   points to unfinished work, stop.
3. Run the recorded oracle and full suite; if either fails, classify via
   `spec bug:` or return to `workonplan` before cleanup.
4. Recheck `git status --short`; confirm only `PLAN.md` and `HANDOFF.md` are
   removable.
5. Remove exactly `PLAN.md` and `HANDOFF.md` from repository root. Preserve
   `SPEC.md`, source, tests, `CHANGELOG.md`, and all other files.
6. Verify both short-term files are absent, `SPEC.md` remains, and the cleanup
   diff contains only their deletion.

## Output

```md
## garnish
plan: <removed | blocked: reason>
handoff: <removed | blocked: reason>
tests: <command> → <green | exact failures>
durable state: SPEC.md preserved
next: `/cook` for a new work cycle
```

## Boundaries

- Never purge `SPEC.md`.
- Never delete files when unrelated changes are present.
- Never mark a phase complete or alter `§T` status.
- Never invoke `cook` automatically; the repository is clean and ready for the
  user’s next request.
