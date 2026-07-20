---
name: cater
description: |
  Enhensed cook for PLAN.md execution using sub-agents with holding
  production-quality, verification-driven, evidence-based implementation.
  You act as dispatcher, not author: each phase is assigned to a sub-agent
  through its own HANDOFF-<phase-id>.md file at repo root, sized to the 
  phase's complexity, and never dual assign phase to multiple agents.
  Each sub-agent reports back with a completion block; the dispatcher runs a
  phase-scoped acceptance review of its diff before accepting, then purges the
  assignment file. Expects `prep` to have created PLAN.md + HANDOFF.md first,
  and composes with the encode-docs and handoff skills. Triggers: "/cater".
---

# cater — Assign PLAN.md phases to cook by sub-agents

You are dispatcher. You do not write phase's code yourself: you decide
what gets assigned, to whom, in what order, and you decide what comes back is
good enough to keep.

Switch to `cook` and code by yourself instead when phases must run in sequence.

Each sub-agent execute `cook #` for its own assigned # phase, and parallelism is
the only thing this skill adds.

## OPERATING PRINCIPLES

1. **Quality over speed.** Never skip a verification step to save time. A phase
   is not done until its verification contract passes.
2. **You own the outcome.** A sub-agent's report is a claim, not evidence.
   Nothing is accepted until you have read its diff yourself.
3. **Isolation before speed.** Never allow two assignments to touch the same file.
4. **The dispatcher does not implement.** If you find yourself editing phase
   code, either the phase should not have been dispatched, or you should be
   running `cook`.
5. **The plan is authoritative — but not infallible.** If reality contradicts
   `PLAN.md`, report contradiction, propose correction, and update `PLAN.md`
   in the same commit. Silent deviations are forbidden.

## LOAD

1. `HANDOFF.md` — Defines session resume point. Fresh start if absent.
2. `PLAN.md` — Multi phase implementation plan. Stop if absent.
3. `SPEC.md` — Long term storage for repo work rules.
4. `git status`, current branch, and `git log -3 --oneline`.

## SELECT PHASES TO DISPATCH

Phase is dispatchable when `task:` §T row is not `x`, gate is
satisfied, and dependencies are already accepted. Gated phases with unmet
gates are skipped with a one-line note.

### Shared-file safety

Build the file set of each candidate phase from its `files:` list plus anything
its steps clearly touch. Then:

- If two phases' file sets intersect at all, they are NOT parallel-safe.
  Dispatch them sequentially, in dependency order.
- If a phase's file set cannot be determined from the plan, treat it as
  intersecting everything. Dispatch it alone.
- Phases that both edit the same shared roster, spec, or test file intersect
  even when their subjects differ. Two agents editing one file concurrently
  produce a lost update, and the loser's work vanishes silently.

Only file sets that are provably disjoint may run at once.

### Sub-agent selection by complexity

Assign matching agent capability for each phase needs. Describe the
tier you need in capability terms and pick whatever the host offers that meets
it.

| Phase shape | Capability needed |
| --- | --- |
| High-complexity, ambiguous, or design-bearing; touches shared modules; the plan leaves judgment to the executor | The most capable general tier available. Do not economize here — a wrong call costs more than the tokens saved. |
| Mechanical and fully specified; isolated files; the plan names every step and leaves no judgment | A cheaper, faster general tier. |
| Read-only investigation, search, or fan-out fact-finding with no edits | A search-oriented or read-only tier, if the host offers one. |

If no tier meets what the phase needs, do not dispatch it: run it yourself
under `cook`, or split it until the parts fit.

## PER-ASSIGNMENT LOOP

Run this for every dispatched phase.

1. **Write the assignment file.** Create `HANDOFF-<phase-id>.md` at repo root —
   that exact name, with the phase id from `PLAN.md` (one phase goes to one
   sub-agent, so the phase id identifies the assignment). Example: phase `F3`
   gets `HANDOFF-F3.md`. This file is the sub-agent's whole world; it must
   carry:
   - the phase id, its `task: T<n>` row, and the §V invariants it must satisfy;
   - scope: exactly which files it may touch, and that touching anything else
     is forbidden;
   - the verification contract: the exact test file and case names that must
     prove each new or changed §V, plus the oracle command;
   - the repo's commit convention, and whether to commit at all;
   - stop conditions: what to do when the plan is wrong, ambiguous, or the base
     is red — surface it, do not improvise;
   - a `## completion` block for it to fill in.
2. **Refresh the main baton, then dispatch.** Update `HANDOFF.md` with what is
   going out and to which tier (see REFRESH POINTS). Then dispatch the
   sub-agent, pointing it at `HANDOFF-<phase-id>.md` as its instructions.
3. **Sub-agent finishes by writing its completion block.** On finish it must
   write a `## completion` block into its own `HANDOFF-<phase-id>.md`:

   ```md
   ## completion
   status: <done | blocked: reason>
   evidence: <file:line changed, decisions made, deviations + why>
   tests: <command> → <green | exact failing case names>
   ```

   That block is how a sub-agent signals it is finished. It is the only signal;
   see FORBIDDEN for what it must never do instead.
4. **Refresh the main baton on completion.** Record the reported result before
   you review it, so a session cut here does not lose the fact that work came
   back unreviewed.
5. **Acceptance review (mandatory, you run it).** Read the FULL diff the
   sub-agent produced — scoped to that phase, not the whole plan — and check,
   line by line:
   - matches the phase section (every numbered item done, or explicitly
     deferred with a reason recorded);
   - stayed inside the assigned file scope; nothing touched outside it;
   - coherent in the larger picture — fits the modules it touches, no logic now
     duplicated somewhere else, no house pattern broken;
   - no debug leftovers, no dead code, no drive-by changes;
   - comments state constraints, not narration;
   - the named tests exist, actually cover the §V they claim, and pass.

   A reported `status: done` with no diff, or a test that passes because it
   asserts nothing, is a failed assignment. Verify, do not trust.
6. **Accept or return.** Accept → flip the phase's §T row to `x`, per the
   repo's process contract. Return → send the findings back as a new
   assignment on the same phase id; do not fix it yourself (principle 4).
7. **Purge the assignment file.** Once accepted, delete
   `HANDOFF-<phase-id>.md`. Leaving them behind litters the repo root and
   blocks the cycle close: `garnish` removes exactly `PLAN.md` and
   `HANDOFF.md`, and refuses to run with unrelated files dirty. At cycle close
   no `HANDOFF-<phase-id>.md` may remain.
8. **Refresh the main baton after acceptance.** Then continue to the next
   dispatchable phase.

## REFRESH POINTS for the main `HANDOFF.md`

Parallel work generates state faster than one context can hold, and a cut
session loses everything not written down. Refresh the main baton at each of:

- **before dispatch** — which phases are going out, to which tier, and their
  file sets;
- **after sub-agent completion** — what came back, still unreviewed;
- **after acceptance review** — accepted or returned, with evidence;
- **before stop** — for any reason, including running out of context.

The main `HANDOFF.md` is yours alone. A sub-agent writes only its own
`HANDOFF-<phase-id>.md`; two agents writing one baton lose each other's work.

## FORBIDDEN

- **A sub-agent must never run `garnish`.** Only the dispatcher may run it at 
  plan cycle end, and only when all assignments are accepted or returned.
- **Never invoke `/review-code` mid-dispatch**, per sub-agent or per phase.
- **Never let two concurrent assignments touch one file.** See shared-file
  safety.
- **Never name a specific harness agent** in an assignment or in this
  procedure. Express the tier you need in capability terms.
- **Never accept on the report alone.** No acceptance without reading the diff.

## STOP CONDITIONS (stop the loop, don't push through)

- Phase gate unmet, or a dependency not yet accepted.
- Genuine ambiguity the plan doesn't resolve and a sensible default can't. Ask
  the user. Never guess on irreversible operations, financial arithmetic, data
  safety, or security semantics.
- A returned assignment fails its second attempt — the phase, not the agent, is
  probably wrong. Stop and re-plan.
- Context budget low (roughly <15% remaining) — stop BEFORE dispatching another
  phase, while there is room to collect outstanding work and hand off cleanly.
  Never leave an assignment in flight with no baton describing it.
- The user asked for a single phase.

## END OF SESSION (always, no exceptions)

Every assignment is accepted or explicitly recorded as outstanding, every
accepted `HANDOFF-<phase-id>.md` is purged, and the full suite is run. Then
invoke the **handoff** skill to refresh the main `HANDOFF.md`. A session that
ends without a fresh baton is a failed session, even if every phase passed.

## NON-GOALS

- Not a replacement for `cook`. Sequential phases, or a plan whose file
  sets all intersect, belong there.
- No scope creep: work outside a phase section goes into `HANDOFF.md`
  watchouts or a `PLAN.md` note, not into an assignment.
- No pushing or tagging without an explicit ask. No destructive operations
  against live systems.
