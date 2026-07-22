---
name: handoff
description: |
  Write/refresh HANDOFF.md at repo root — the session-to-session baton for
  multi-phase PLAN.md execution. Captures branch/test/commit state, exact
  stopping point, deviations and decisions, the next phase pointer, and
  watchouts, in the spec encoding. The cook skill invokes this at the
  end of every session; also triggers on "/handoff".
---

# handoff — session baton

The next session starts cold. HANDOFF.md is everything it must know that
PLAN.md, SPEC.md, and git history do NOT already record. Never duplicate
what those files say — point at them.

## WHEN

- End of every working session (cook calls this automatically).
- Context budget running low mid-phase.
- Before any risky long-running operation.
- User asks.

## WRITE `HANDOFF.md` (repo root, overwrite the whole file — git keeps history)

Encoded (load the `encode-docs` skill if not loaded). Target ≤60
lines; agent-facing, not prose. Template:

```
# HANDOFF <YYYY-MM-DD>

branch <name> | last commit <sha> <subject> | tests <green | RED: named failures>
baseline <green | RED: file + test name> | oracle <command>
uncommitted: <none | exact files + why>

## done this session
<phase>: <one line> → <sha>

## in progress (exact stop point)
<phase> ~: steps done <n1,n2> | NEXT STEP: <precise action, file, function>
mid-edit files: <paths | none>

## next
<phase per PLAN.md recommended sequence> | preconditions: <gates/none>

## deviations & decisions
plan said <X> → did <Y> because <Z> (PLAN.md updated: y|n)
user decided: <anything the user ruled this session>

## watchouts
<traps discovered: flaky test, env quirk, live-server state, half-truths in docs>

## final verification
item|status|evidence|decision
<§V/§I/§T item>|<HOLD | VIOLATE | UNVERIFIABLE>|<file/test>|<code | SPEC | - >
```

## RULES

1. **Uncommitted work is a first-class fact.** If anything is uncommitted,
   name every file and why it was left so. Prefer committing (even `~` wip
   per the §T flip) over leaving a dirty tree.
2. **Red tests must be named exactly** — file + test name — never "some
   tests failing".
3. **Test state must distinguish baseline from current oracle.** Record exact
   command and named failures for each red state.
4. **Deviations must already live in PLAN.md/SPEC.md** when material; the
   handoff RECORDS that they were reflected, it is not their only home.
5. **"NEXT STEP" must be executable verbatim** by a cold agent: file,
   function, what to do — not "continue the phase".
6. Empty sections get `-`, never deleted (the shape is the checklist).
7. Final verification phase must fill `final verification` table; non-final
   handoffs may use `-`.
8. Commit HANDOFF.md — either inside the session's final phase commit or as
   its own commit, per the repo's commit conventions. Write a standalone baton
   commit through `encode-commit`: say which phase closed, what the next step
   is, and the test state, in plain English. No phase ids, no encoding symbols,
   and never a bare `docs: handoff` — that tells a later reader nothing.

## NON-GOALS

- Not a status dashboard (PLAN §T is), not a changelog (CHANGELOG.md is),
  not a diary. State that helps the NEXT session act — nothing else.
