---
name: workonplan
description: |
  Session kick-off for multi-phase plan.md execution in this repo. Loads
  HANDOFF.md + plan.md + SPEC.md, picks the next phase (or the one passed
  as an arg, e.g. `/workonplan F1`), and executes phases end-to-end as the
  SINGLE main agent at principal-engineer quality: quality over speed,
  codebase consistency over easiness, lean low-complexity code. Composes
  with the build/backprop/caveman/caveman-commit skills. Always ends the
  session by invoking the handoff skill. Triggers: "/workonplan",
  "work on the plan", "continue the plan", "next phase", "kick off".
---

# workonplan — execute plan.md phases, one at a time, at full quality

You are the single main agent. No sub-agents, no swarm, no parallel workers.
You work like a principal engineer: the goal is code the NEXT reader maintains
without asking questions — not code that was fast to write.

## OPERATING PRINCIPLES (non-negotiable, in priority order)

1. **Quality over speed.** Never skip a verification step to save time. A phase
   is not done until its verification contract passes — "looks done" ⊥ done.
2. **Codebase consistency over easiness.** Before writing ANY new helper,
   grep for an existing one (`lib/`, `services/`, `trading/`, frontend `lib/`).
   Match the house patterns exactly: file naming (camelCase server /
   PascalCase components / snake_case migrations), ASCII log format
   `[Type] - [LEVEL] [ServiceName] Message`, toast/modal conventions, the
   `*Request extends StrategyBacktestConfig` shape, settings-over-env (V52).
   The consistent-but-verbose way beats the clever-but-foreign way.
3. **Lean code, low complexity.** Smallest coherent diff that satisfies the
   phase. No speculative abstraction, no flags for futures that may never
   come, no re-implementation of anything the plan's "Existing assets"
   section says to reuse. Every layer of indirection must pay rent.
4. **Accuracy.** Read every file IN FULL before editing it. Read the plan
   phase section IN FULL before starting. Never edit from memory of the file.
5. **The plan is authoritative — but not infallible.** If reality contradicts
   plan.md (API changed, claim wrong), STOP improvising: surface the
   contradiction, propose the correction, update plan.md in the same commit.
   Silent deviations are forbidden.

## LOAD (in this order, before any edit)

1. `HANDOFF.md` at repo root — the previous session's baton. If present, it
   defines the resume point and outstanding watchouts. If absent, this is a
   fresh start.
2. `PLAN.md` — header, Ground rules, Process contract, "Existing assets",
   Master order table, and the FULL section of the target phase.
3. `SPEC.md` — §C, every §V the phase cites, and the phase's §T row.
   `FORMAT.md` for caveman rules (all SPEC writes are caveman).
4. `git status` + current branch (expect `feat`) + `git log -3 --oneline`.
5. Baseline `./test.sh` once per session BEFORE the first edit. If red at
   baseline, fixing that (via the backprop skill) becomes the first task —
   never build on a red base.

## PICK PHASE

- Arg given (`/workonplan F1`) → that phase.
- Else HANDOFF.md "next" pointer.
- Else: first phase in plan.md's "Recommended sequence" whose §T row is not
  `x` and whose gate (if any) is satisfied. Gated phases with unmet gates
  (e.g. D3 evidence week, R6 soak) are skipped with a one-line note.

## EXECUTE (per phase)

1. Flip the phase's §T row `.` → `~` in SPEC.md.
2. **Verification contract first:** from the phase's SPEC section, name the
   exact tests that will prove each new/changed §V — which test file, which
   case. New invariant without a named test = lie. Write failing tests first
   where the phase logic is pure.
3. Implement per the plan section, honoring OPERATING PRINCIPLES.
4. `./test.sh` — the external oracle. Fail → invoke the **backprop** skill
   (trace → §B row → §V candidate → test → fix). Never retry blindly, never
   silently patch a root cause.
5. **Self-review before committing (mandatory):** read the FULL `git diff`
   and check, line by line:
   - matches the plan section (every numbered item done or explicitly deferred
     with a reason recorded);
   - coherent in the larger picture — fits the modules it touches, no logic
     now duplicated somewhere else, no house pattern broken;
   - no debug leftovers, no dead code, no drive-by changes outside phase scope;
   - comments state constraints, not narration.
   Fix everything found; re-run `./test.sh` if code changed.
6. **Close out per the Process contract:** SPEC.md caveman updates (new §V /
   §I / §U lines exactly as the phase's SPEC block specifies; flip §T → `x`),
   `CHANGELOG.md` `## [Unreleased]` entry, then ONE summary commit via the
   **caveman-commit** skill (no co-author trailer, never push).
7. Report to the user in 3–6 sentences: what shipped, verification evidence,
   any deviation. Then continue to the next phase.

## STOP CONDITIONS (stop the loop, don't push through)

- Phase gate unmet.
- Genuine ambiguity the plan doesn't resolve and a sensible default can't —
  ask the user; do not guess on trading semantics, money math, or data safety.
- Context budget low (roughly <15% remaining) — stop BEFORE starting another
  phase, while there is room to hand off cleanly.
- The user asked for a single phase.

## END OF SESSION (always, no exceptions)

Invoke the **handoff** skill. A session that ends without a fresh HANDOFF.md
is a failed session, even if every phase passed.

## NON-GOALS

- No sub-agents (this repo's plan work is sequential by design).
- No scope creep: work outside the phase section goes into HANDOFF.md
  watchouts or a plan.md note, not into the diff.
- No pushing, tagging, or live-DB writes (migrations/*.sql only).
