---
name: review-plan
description: |
  Review PLAN.md phases before any implementation starts. Opens with a
  research gate — if open unknowns remain, runs targeted research, records
  sourced findings in §R via spec, and tightens later phases. Then refutes
  phase ordering, verification contracts, §T mappings, and phase
  dependencies. Updates PLAN.md and HANDOFF.md with findings, hands §V
  changes to spec, and ends with an explicit GO / NO-GO gate. Iterative:
  each round can reduce the number of needed research phases until none
  remain. Triggers when the user says "review the plan", "check the plan",
  "is the plan ready", or invokes /review-plan.
license: MIT
---

# review-plan — validate PLAN.md before workonplan

A cold session that reads the plan and the spec together, resolves any
remaining unknowns through research, and decides whether the work is safe
to hand to `workonplan`. Every finding is corrected before the gate closes.

## WHEN

Before the first `/workonplan`, or after a previous `/review-plan` returns
NO-GO.

Skip when there are no `?` items, all phase contracts are named, and the
previous `/review-plan` already returned GO.

## LOAD

1. Load `caveman-encode` — PLAN.md and HANDOFF.md use that encoding.
2. Read `PLAN.md` in full: goal, ground rules, phase order table, and every
   phase section.
3. Read `SPEC.md`: §G, §C, §I, §R, §V, §T. Note which `§T` rows map to
   which phases.
4. Read `HANDOFF.md` if present: current next pointer and watchouts.
5. Count open research phases: phases with unresolved `?` items or an
   explicit research goal. Record as "research phases remaining: N".

## RESEARCH GATE

Before reviewing plan structure, resolve open unknowns.

For each open research phase in order:

1. List every `?` item in the phase.
2. Research them: read codebase modules, existing tests, public docs, or
   live sources. Every finding must cite a source (file:line or URL).
   Items that cannot be resolved stay `?` with a note on why.
3. Record sourced findings in `§R` by invoking `spec`.
4. Rewrite the affected phase steps with confirmed facts; remove guesses.
5. If all `?` items in this phase are resolved with no new unknowns, mark
   it as a removal candidate. Note it in the gate output so the user can
   confirm removal on the next `/cook` cycle.

Skip this gate entirely when no `?` items remain in any phase.

## REFUTE THE PLAN

Attack the plan on these axes. Every finding cites evidence or is tagged
`[unverified]` and down-ranked to NOTE.

- **Phase ordering** — does each phase depend on its predecessor's output?
- **Verification contracts** — does every phase name the exact test file
  and case that proves each touched `§V`? "add tests" without a file name
  is a BLOCK.
- **§T mapping** — does every phase carry exactly one `task: T<n>` that
  exists in `SPEC.md §T` and is not already `x`? Duplicate or missing
  mappings are a BLOCK.
- **Phase gates** — are all preconditions achievable? Does any gate depend
  on elapsed time, external approval, or a soak period?
- **Blast radius** — does any phase touch shared modules, auth, data
  migrations, or public `§I` surfaces? Does any step handle secrets,
  untrusted input, or injection-prone surfaces? Flag for an extra safety
  step in that phase's verification contract.
- **Altitude** — are steps concrete enough to finish in one session?
  Unverifiable steps are a BLOCK.

## CLASSIFY

Each finding: evidence → claim → severity.

- **BLOCK** — cannot enter `workonplan` with this finding. Fix before GO.
- **HARDEN** — sharpen a contract, add a `§V`, or split a vague step.
- **NOTE** — observation, no required action.

No evidence → down-rank to NOTE, tag `[unverified]`.

## UPDATE

1. Hand new `§R` rows and proposed `§V` additions to `spec`.
2. Rewrite affected `PLAN.md` phases with resolved facts and sharper
   contracts. Replace `PLAN.md` at repo root.
3. Update `HANDOFF.md` next pointer and watchouts. If a research phase
   resolved cleanly, add a watchout: "on next `/cook`, remove F<n> —
   all unknowns resolved."

## GATE

```
## review-plan verdict
research phases remaining: <n>
BLOCK: <count>
- <phase>: <finding> — <fix required>
HARDEN: <count>
- <phase>: <finding> — <improvement>
NOTE: <count>
- <evidence> — <observation>
gate: <GO | NO-GO>
next: /workonplan | /review-plan after fixes
```

GO or NO-GO, never a shrug. A plan with open BLOCKs does not get GO.

## BOUNDARIES

- Do not write code.
- Do not mark `§T` rows done or alter `§T` status.
- Do not skip the research gate when `?` items exist.
- Do not replace `PLAN.md` without updating `HANDOFF.md` to match.
- `spec` is the sole mutator of `SPEC.md`; hand findings, do not write directly.
