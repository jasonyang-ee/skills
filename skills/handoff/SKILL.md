---
name: handoff
description: |
  Gather the session-to-session baton for HANDOFF.md at repo root and hand it to
  encode-docs, which writes it — the baton for multi-phase PLAN.md execution.
  Captures branch/test/commit state, exact stopping point, deviations and
  decisions, the next phase.task pointer, and watchouts, in the spec encoding.
  The cook skill invokes this at the end of every session; also triggers on
  "/handoff".
---

# handoff — session baton

The next session starts cold. HANDOFF.md is everything it must know that
PLAN.md, SPEC.md, and git history do NOT already record. Never duplicate
what those files say — point at them.

`handoff` GATHERS the baton content; it does NOT write `HANDOFF.md` directly.
`encode-docs` is the sole mutator (§V16): it owns the format and performs the
write. This skill collects the state below, then hands it to `encode-docs`,
which emits the baked header + lean `F<n>.T<n>` template and overwrites the file.

## WHEN

- End of every working session (cook calls this automatically).
- Context budget running low mid-phase.
- Before any risky long-running operation.
- User asks.

## GATHER → hand to encode-docs

Collect the facts below and pass them to `encode-docs`. It writes `HANDOFF.md`
(repo root, overwritten in full — git keeps history) with its own lean template;
do NOT reproduce that template here — encode-docs owns the shape.

- branch | last commit `<sha>` `<subject>` | tests `<green | RED: named>`
- baseline `<green | RED: file+test>` | oracle `<cmd>`
- uncommitted: `<none | files + why>`
- done this session: `<F<n>>: <one line> → <sha>`
- in progress: `<F<n>> ~: task done <T…>` | NEXT TASK: `<action + file + function>`; mid-edit files
- next: `<F<n>.T<n>>` + preconditions
- deviations & decisions; watchouts
- final verification table — final-verify phase only

## RULES

1. **Uncommitted work is a first-class fact.** Name every uncommitted file and
   why it was left so. Prefer committing (even a `~` wip §T flip) over a dirty
   tree.
2. **Red tests named exactly** — file + test name — never "some failing".
3. **Test state distinguishes baseline from current oracle** — each with its
   exact command and named failures.
4. **Material deviations already live in PLAN.md/SPEC.md**; the baton records
   that they landed, it is not their only home.
5. **NEXT TASK is executable verbatim** by a cold agent: file, function, action
   — never "continue the phase". Reference done tasks and next as `F<n>.T<n>`.
6. **Empty section → `-`**, never deleted (the shape is the checklist).
7. **Only the final-verify phase fills the final verification table**; others
   leave the header row.
8. **Commit HANDOFF.md** — inside the session's final phase commit or its own,
   per repo conventions. A standalone baton commit goes through `encode-commit`:
   which phase closed, the next task, and the test state, in plain English. No
   phase ids, no encoding symbols, never a bare `docs: handoff`.

## NON-GOALS

- Not a status dashboard (PLAN §T is), not a changelog (CHANGELOG.md is),
  not a diary. State that helps the NEXT session act — nothing else.
