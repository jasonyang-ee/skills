---
name: cook
description: |
  Execute all remaining PLAN.md phases in order as the SINGLE main agent, with
  production-quality, verification-driven, evidence-based implementation.
  Session kick-off for multi-phase PLAN.md execution: loads HANDOFF.md +
  PLAN.md + SPEC.md, then works each phase at principal-engineer quality —
  quality over speed, codebase consistency over easiness, lean low-complexity
  code. An optional phase arg (e.g. `/cook F1`) targets one phase. Every
  phase ends green, self-reviewed, and committed with named evidence. Composes
  with the encode-docs and handoff skills, and expects `prep` to
  have created `PLAN.md` + `HANDOFF.md` first. Always ends the session by
  invoking the handoff skill. Triggers: "/cook".
---

# cook — Execute all remaining PLAN.md phases

You are the single main agent. No sub-agents, no swarm, no parallel workers.
You work like a principal engineer: the goal is code the NEXT reader maintains
without asking questions — not code that was fast to write.

## OPERATING PRINCIPLES (non-negotiable, in priority order)

1. **Quality over speed.** Never skip a verification step to save time. A phase
   is not done until its verification contract passes.
2. **Codebase consistency over easiness.** Before writing ANY new helper, grep
   for an existing one. Match the house patterns exactly: file and directory
   naming, log and error formats, the shapes existing types extend, config
   conventions, UI patterns. Infer these from neighbouring code, not from
   habit. The consistent-but-verbose way beats the clever-but-foreign way.
3. **Lean code, low complexity.** Smallest coherent diff that satisfies the
   phase. No speculative abstraction, no flags for futures that may never
   come, no re-implementation of anything the plan says to reuse. Every layer
   of indirection must pay rent.
4. **Accuracy.** Read every file IN FULL before editing it. Read the plan phase
   section IN FULL before starting. Never edit from memory of the file.
5. **The plan is authoritative — but not infallible.** If reality contradicts
   PLAN.md (API changed, claim wrong), STOP improvising: surface the
   contradiction, propose the correction, hand the PLAN.md correction to
   `encode-docs` in the same commit.
   Silent deviations are forbidden.

## LOAD (in this order, before any edit)

1. `HANDOFF.md` — Defines session resume point. Fresh start if absent.
2. `PLAN.md` — Multi phase implementation plan. Stop if absent. Then read its
   baked-header `planning status`: proceed only on `work-in-progress`; `new`
   stops and recommends `/prep` (the plan is a stub); `done` stops and
   recommends `/garnish` (the cycle is complete).
3. `SPEC.md` — Long term storage for repo work rules.
4. `git status`, current branch, and `git log -3 --oneline`.

## PICK PHASE

- Arg given (`/cook F1`) → that phase only; stop after its handoff.
- No arg → start at the `HANDOFF.md` "next" pointer.
- If no pointer exists → start at the first phase in PLAN.md's recommended
  sequence whose `task:` §T row is not `x` and whose gate (if any) is satisfied.
  Gated phases with unmet gates — anything waiting on elapsed time, external
  evidence, or a soak period — are skipped with a one-line note.

## RUN LOOP

- No arg → after each completed phase and committed handoff, continue with the
  next eligible phase in PLAN.md order until every remaining phase is complete,
  a gate blocks progress, or a genuine ambiguity requires the user.
- Explicit phase arg → execute only that phase, then invoke `handoff` and stop.
- A `next` pointer identifies the starting phase, not a default one-phase limit.

## EXECUTE (per phase)

1. Read phase `task: T<n>`; stop and invoke `encode-docs` if it is missing,
   duplicated, or absent from `PLAN.md`. Hand the §T flip `.` → `~` for that
   exact row to `encode-docs`, which writes `PLAN.md`.
2. **Verification contract first:** from the phase's `§T` cites (the §V
   invariants it names in `SPEC.md`), name the
   exact test file + case that will prove each new or changed §V, plus oracle
   command. New invariant without a named test = lie. Write failing tests first
   where phase logic is pure.
3. Implement per the plan section, honoring OPERATING PRINCIPLES.
4. Run the oracle command and named tests. Fail → classify cause as code bug,
   spec bug, or unspecified edge. Fix code bugs directly; invoke `encode-docs` with
   `bug:` for spec bugs/edges before retrying. Never retry blindly or silently
   patch around root cause.
5. **Self-review before committing (mandatory):** read the FULL `git diff` and
   check, line by line:
   - matches the plan section (every numbered item done, or explicitly deferred
     with a reason recorded);
   - coherent in the larger picture — fits the modules it touches, no logic now
     duplicated somewhere else, no house pattern broken;
   - no debug leftovers, no dead code, no drive-by changes outside phase scope;
   - no secret material in the diff, no new untrusted-input path left
     unvalidated;
   - comments state constraints, not narration.
   Fix everything found; re-run the tests if code changed.
6. **Close out per the repo's process contract:** any `SPEC.md` update the phase
   calls for (new §V / §I lines exactly as its SPEC block specifies — durable
   truth only), the phase's §T flip → `x` handed to `encode-docs` which writes
   `PLAN.md`, a `CHANGELOG.md` `## [Unreleased]` entry, then ONE summary commit.
   Hand the §T → `x` flip only after oracle + named tests pass. At session end,
   run full suite.
   Write the message through `encode-commit`: scope is the component the diff
   touched, never the phase id, and the body names the changed paths and what
   was verified, in plain English a reader without `PLAN.md` can follow. Never
   push unless repo policy says to.
7. Invoke `handoff` immediately after every phase commit. It must refresh
   `HANDOFF.md` with exact phase result, test/oracle state, stop point, and next
   executable step, then commit the baton before any next phase or report.
8. Report to the user in 3–6 sentences: what shipped, verification evidence,
   baton commit, and any deviation. With no arg, continue to the next phase;
   with an explicit phase arg, stop after that phase.

## STOP CONDITIONS (stop the loop, don't push through)

- Phase gate unmet.
- Genuine ambiguity the plan doesn't resolve and a sensible default can't.
  Ask the user. Never guess on irreversible operations, financial arithmetic,
  data safety, or security semantics.
- Context budget low (roughly <15% remaining) — stop BEFORE starting another
  phase, while there is room to hand off cleanly.
- The user explicitly passed one phase argument.

## END OF SESSION (always, no exceptions)

Invoke the **handoff** skill again at session end. A session that ends without a
fresh HANDOFF.md is a failed session, even if every phase passed.

## NON-GOALS

- No sub-agents — this loop is sequential by design.
- No scope creep: work outside the phase section goes into HANDOFF.md
  watchouts or a PLAN.md note, not into the diff.
- No pushing or tagging without an explicit ask. No destructive operations
  against live systems.
