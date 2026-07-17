---
name: dispatchplan
description: |
  Parallel alternative to workonplan for multi-phase PLAN.md execution, holding
  the same production-quality, verification-driven, evidence-based
  implementation bar per phase. You act as dispatcher, not author: each phase
  is assigned to a sub-agent through its own HANDOFF-<phase-id>.md file at
  repo root, sized to the phase's complexity,
  and never dispatched alongside another assignment touching the same files.
  Each sub-agent reports back with a completion block; the dispatcher runs a
  phase-scoped acceptance review of its diff before accepting, then purges the
  assignment file. Expects `cook` to have created PLAN.md + HANDOFF.md first,
  and composes with the spec, caveman-encode, and handoff skills. Triggers:
  "/dispatchplan", "dispatch the plan", "run phases in parallel", "parallelize
  the plan", "assign phases to sub-agents", "fan out the plan".
license: MIT
---

# dispatchplan — execute PLAN.md phases in parallel, via sub-agents

You are the dispatcher. You do not write the phase's code yourself: you decide
what gets assigned, to whom, in what order, and you decide what comes back is
good enough to keep. Use `workonplan` instead when phases must run one at a
time; that skill is the single-agent path and is the safer default.

Parallelism is the only thing this skill adds. It buys nothing if it costs
correctness, so every rule below exists to stop concurrent work from
corrupting the plan, the baton, or each other's files.

## OPERATING PRINCIPLES (non-negotiable, in priority order)

1. **Quality over throughput.** Running phases in parallel never lowers the
   bar for any one of them. Each assignment ends green, reviewed, and
   committed, exactly as it would under `workonplan`.
2. **You own the outcome.** A sub-agent's report is a claim, not evidence.
   Nothing is accepted until you have read its diff yourself.
3. **Isolation before speed.** Two assignments that can touch the same file are
   not parallel work — they are a race. Serialize them.
4. **The dispatcher does not implement.** If you find yourself editing phase
   code, either the phase should not have been dispatched, or you should be
   running `workonplan`. Fixing a sub-agent's diff yourself hides the fact
   that the assignment was wrong.
5. **The plan is authoritative — but not infallible.** If reality contradicts
   `PLAN.md`, surface the contradiction, propose the correction, and update
   `PLAN.md` in the same commit. Silent deviations are forbidden, including
   deviations a sub-agent made and reported.

## LOAD (in this order, before any dispatch)

1. `HANDOFF.md` at repo root — the main baton. It defines the resume point and
   outstanding watchouts. If absent, this is a fresh start.
2. `PLAN.md` — header, ground rules, existing-assets inventory, phase order
   table, and the FULL section of every phase you intend to dispatch. If
   absent, invoke `cook` first. Stop.
3. `SPEC.md` — §C, every §V the phases cite, and their §T rows. Its baked
   header carries the format. Read §R when present; do not re-derive or
   contradict sourced facts.
4. `git status`, current branch, and `git log -3 --oneline`.
5. Run the project's test command once BEFORE the first dispatch, to establish
   a baseline. Find it in `package.json` scripts, `Makefile`, `justfile`, CI
   config, or contributor docs — do not invent one. If red at baseline, log it
   with `spec` using `bug:` before dispatching anything. Never dispatch onto a
   red base: every sub-agent will inherit the failure and report it as yours.

## SELECT PHASES TO DISPATCH

A phase is dispatchable when its `task:` §T row is not `x`, its gate is
satisfied, and its dependencies are already accepted. Gated phases with unmet
gates are skipped with a one-line note.

### Shared-file safety (check this before capability)

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

Match the assignment to the capability the phase actually needs. Describe the
tier you need in capability terms and pick whatever the host offers that meets
it. Never hardcode a specific agent's name: the agent roster belongs to the
harness, not to this repository, and a named agent that does not exist on
another host makes this skill a silent no-op there.

| Phase shape | Capability needed |
| --- | --- |
| High-complexity, ambiguous, or design-bearing; touches shared modules; the plan leaves judgment to the executor | The most capable general tier available. Do not economize here — a wrong call costs more than the tokens saved. |
| Mechanical and fully specified; isolated files; the plan names every step and leaves no judgment | A cheaper, faster general tier. |
| Read-only investigation, search, or fan-out fact-finding with no edits | A search-oriented or read-only tier, if the host offers one. |

If no tier meets what the phase needs, do not dispatch it: run it yourself
under `workonplan`, or split it until the parts fit.

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

- **A sub-agent must never run `garnish`.** It is the cycle-close skill, not a
  completion signal. It requires every mapped §T row to be `x`, which is false
  mid-plan, and it deletes the root `PLAN.md` and `HANDOFF.md` — destroying the
  main baton and the plan the other agents are still executing. Completion is
  signalled by the `## completion` block, and nothing else.
- **Never invoke `/review-code` mid-dispatch**, per sub-agent or per phase. It
  is step 6 of the core workflow: it sweeps the whole release baseline to
  `HEAD` on every run, and it must end by handing findings to `cook` — which
  rewrites the very `PLAN.md` you are executing. The per-phase check is the
  acceptance review in this skill. `/review-code` stays where the workflow puts
  it: after `garnish`, once the cycle is closed.
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

- Not a replacement for `workonplan`. Sequential phases, or a plan whose file
  sets all intersect, belong there.
- No scope creep: work outside a phase section goes into `HANDOFF.md`
  watchouts or a `PLAN.md` note, not into an assignment.
- No pushing or tagging without an explicit ask. No destructive operations
  against live systems.
