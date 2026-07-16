---
name: workonplan
description: |
  Session kick-off for multi-phase PLAN.md execution. Loads HANDOFF.md +
  PLAN.md + SPEC.md, picks the next phase (or the one passed as an arg, e.g.
  `/workonplan F1`), and executes phases end-to-end as the SINGLE main agent
  at principal-engineer quality: quality over speed, codebase consistency over
  easiness, lean low-complexity code. Every phase ends green, self-reviewed,
  and committed. Composes with the build, spec, caveman-encode, and handoff
  skills, and expects `cook` to have created `PLAN.md` + `HANDOFF.md` first.
  Always ends the session by invoking the handoff skill. Triggers:
  "/workonplan", "work on the plan", "continue the plan", "next phase",
  "kick off".
license: MIT
---

# workonplan — execute PLAN.md phases, one at a time, at full quality

You are the single main agent. No sub-agents, no swarm, no parallel workers.
You work like a principal engineer: the goal is code the NEXT reader maintains
without asking questions — not code that was fast to write.

## OPERATING PRINCIPLES (non-negotiable, in priority order)

1. **Quality over speed.** Never skip a verification step to save time. A phase
   is not done until its verification contract passes — "looks done" ⊥ done.
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
   contradiction, propose the correction, update PLAN.md in the same commit.
   Silent deviations are forbidden.

## LOAD (in this order, before any edit)

1. `HANDOFF.md` at repo root — the previous session's baton. If present, it
   defines the resume point and outstanding watchouts. If absent, this is a
   fresh start.
2. `PLAN.md` — header, ground rules, process contract, existing-assets
   inventory, phase order table, and the FULL section of the target phase. If
   absent, invoke `cook` first. Stop.
3. `SPEC.md` — §C, every §V the phase cites, and the phase's §T row. Its baked
   header carries the format; no `FORMAT.md` is needed.
4. `git status`, current branch, and `git log -3 --oneline`.
5. Run the project's test command once per session BEFORE the first edit, to
   establish a baseline. Find it in `package.json` scripts, `Makefile`,
   `justfile`, CI config, or CONTRIBUTING — do not invent one. If red at
   baseline, log it with `spec` using `bug:` before changing code — never build
   on a red base.

## PICK PHASE

- Arg given (`/workonplan F1`) → that phase.
- Else the `HANDOFF.md` "next" pointer.
- Else the first phase in PLAN.md's recommended sequence whose `task:` §T row is
  not `x` and whose gate (if any) is satisfied. Gated phases with unmet gates —
  anything waiting on elapsed time, external evidence, or a soak period — are
  skipped with a one-line note.

## EXECUTE (per phase)

1. Read phase `task: T<n>`; stop and invoke `spec` if it is missing, duplicated,
   or absent from SPEC.md. Flip that exact §T row `.` → `~` in SPEC.md.
2. **Verification contract first:** from the phase's `§T` cites and SPEC
   section, name the
   exact tests that will prove each new or changed §V — which test file, which
   case. New invariant without a named test = lie. Write failing tests first
   where the phase logic is pure.
3. Implement per the plan section, honoring OPERATING PRINCIPLES.
4. Run the tests — the external oracle. Fail → inspect the cause. If it exposes
   wrong or missing spec memory, invoke `spec` with `bug:` before retrying.
   Never retry blindly, never silently patch around a root cause.
5. **Self-review before committing (mandatory):** read the FULL `git diff` and
   check, line by line:
   - matches the plan section (every numbered item done, or explicitly deferred
     with a reason recorded);
   - coherent in the larger picture — fits the modules it touches, no logic now
     duplicated somewhere else, no house pattern broken;
   - no debug leftovers, no dead code, no drive-by changes outside phase scope;
   - comments state constraints, not narration.
   Fix everything found; re-run the tests if code changed.
6. **Close out per the repo's process contract:** SPEC.md updates (new §V / §I
   lines exactly as the phase's SPEC block specifies; flip §T → `x`), a
   `CHANGELOG.md` `## [Unreleased]` entry, then ONE summary commit. Follow the
   repo's commit conventions. Never push unless repo policy says to.
7. Report to the user in 3–6 sentences: what shipped, verification evidence,
   any deviation. Then continue to the next phase.

## STOP CONDITIONS (stop the loop, don't push through)

- Phase gate unmet.
- Genuine ambiguity the plan doesn't resolve and a sensible default can't.
  Ask the user. Never guess on irreversible operations, financial arithmetic,
  data safety, or security semantics.
- Context budget low (roughly <15% remaining) — stop BEFORE starting another
  phase, while there is room to hand off cleanly.
- The user asked for a single phase.

## END OF SESSION (always, no exceptions)

Invoke the **handoff** skill. A session that ends without a fresh HANDOFF.md is
a failed session, even if every phase passed.

## NON-GOALS

- No sub-agents — this loop is sequential by design.
- No scope creep: work outside the phase section goes into HANDOFF.md
  watchouts or a PLAN.md note, not into the diff.
- No pushing or tagging without an explicit ask. No destructive operations
  against live systems.
