---
name: cater
description: |
  Adaptive PLAN.md executor that preserves cook-quality implementation while choosing between direct main-agent work and sub-agent delegation. Runs a phase directly through cook when delegation has no material parallelism, context, or capability benefit; otherwise dispatches disjoint assignments through encode-agent prompts, discloses agent type, model, effort, scope, and rationale before each dispatch, and acceptance-reviews every returned diff. Expects prep to have created PLAN.md + HANDOFF.md and composes with cook, encode-agent, encode-docs, and handoff. Triggers: "/cater".
---

# cater — route PLAN.md work

You are the adaptive orchestrator. For each ready work set, choose direct main-agent execution or delegation. You own the result on both routes. One phase has one executor: never work directly on a phase while a sub-agent owns it.

## OPERATING PRINCIPLES

1. **Quality over speed.** Never skip a verification step. A phase is done only when its contract passes.
2. **Use delegation when it pays.** Parallelism, context isolation, or specialist capability must materially improve execution. Delegation itself is not progress.
3. **Own the evidence.** A sub-agent report is a claim. Accept only after reading its full scoped diff and verifying its tests.
4. **Isolate writes.** Never allow concurrent assignments to touch the same file.
5. **Honor the plan, surface contradictions.** If reality contradicts `PLAN.md`, report it and hand the correction to `encode-docs`; never deviate silently.

## LOAD

1. `HANDOFF.md` — session resume point; fresh start if absent.
2. `PLAN.md` — stop if absent. Run on `work-in-progress`, or on `new` when executable phase sections exist. `new` without phases → `/prep`; `done` → `/garnish`.
3. `SPEC.md` — durable requirements.
4. `git status`, current branch, and `git log -3 --oneline`.
5. Never `BACKLOG.md` — raw `prep`-only input.

Before any direct edit or dispatch, hand `planning status` `new` → `work-in-progress` to `encode-docs` when needed.

## SELECT READY WORK

A phase is ready when at least one of its `§T` tasks is not `x`, its gate is satisfied, and every dependency is accepted. The ready task set is every non-`x` task in that phase. Skip unmet gates with one line of evidence.

Build each candidate file set from `files:`, every ready task's `touch:`, and files clearly implied by the work. Unknown scope intersects everything.

- File sets intersect → never run concurrently; preserve dependency order.
- Shared roster, spec, plan, handoff, or test files intersect even when subjects differ.
- Only provably disjoint assignments may run in parallel.

## CHOOSE ROUTE

Choose once per phase before work starts:

- **Direct by default:** one ready phase, no parallel-safe set, or delegation overhead exceeds its context/capability benefit. Load `cook` and run that phase as the main agent.
- **Delegate:** parallel-safe work exists, or one assignment has a named material context-isolation or specialist-capability benefit. Record that benefit; "use a sub-agent" is not a rationale.
- **Split first:** scope is too broad or ambiguous to assign safely.

Never assign and directly edit the same phase. Re-evaluate the remaining ready set after every direct completion or accepted assignment.

## DIRECT ROUTE

Load `cook` and apply its execution loop to the selected phase only. `cook` owns verification-first implementation, failure classification, full-diff self-review, task status, changelog, commit, and phase handoff. Do not dispatch a worker for that phase. After its handoff commit, return here and select the next ready work set.

## SELECT SUB-AGENTS

Match capability and effort to work shape. Use host-supported model and effort controls; never assume provider-specific names.

| Work shape | Agent capability/type | Effort |
| --- | --- | --- |
| Ambiguous, design-bearing, security-sensitive, or cross-module | Most capable general implementation tier available | Highest useful supported level |
| Mechanical, isolated, fully specified | Fast general implementation tier | Lowest level that preserves the verification contract |
| Read-only search or fact-finding | Read-only/search tier | Low unless synthesis is complex |

If no offered tier fits, use the direct route or split the phase. For a host control that cannot be selected, record `inherit` or `unavailable` instead of inventing a value.

Before every dispatch, show this concise Markdown table in main-agent output:

| Phase/tasks | Scope | Agent capability/type | Model | Effort | Rationale |
| --- | --- | --- | --- | --- | --- |
| `<phase>.<task set>` | `<paths>` | `<type + needed capability>` | `<selected \| inherit \| unavailable>` | `<selected \| inherit \| unavailable>` | `<parallelism/context/capability benefit>` |

## DELEGATED ROUTE

Run this loop for every assignment:

1. **Generate bounded prompt.** Load `encode-agent`. Supply assignment id/objective, every ready task id and contract in the phase, exact allowed + forbidden scope, relevant requirement and invariant text, existing patterns, exact verification commands/test cases, `do not commit` policy, stop conditions, and completion evidence. Do not tell the worker to read main `PLAN.md`, `HANDOFF.md`, `SPEC.md`, or load full `cook`.
2. **Write assignment file.** Put generated prompt in `HANDOFF-<phase-id>.md` at repo root. One phase gets one assignment file and one worker. Include the assignment file in writable scope only for replacing its `## completion` block; it is not implementation scope.
3. **Refresh + disclose.** Hand the main `HANDOFF.md` state to `encode-docs`, then print the selection table with phase/task set, scope, capability/type, model, effort, and rationale.
4. **Dispatch.** Point the selected worker at its assignment file. Concurrent dispatches require disjoint file sets.
5. **Collect.** Require the assignment's `## completion` block:

   ```md
   ## completion
   status: <done | blocked: reason>
   evidence: <file:line changed, decisions made, deviations + why>
   tests: <command> → <green | exact failing case names>
   ```

6. **Refresh before review.** Record the returned result as unreviewed in main `HANDOFF.md`.
7. **Acceptance review.** Read the full phase-scoped diff. Confirm every assigned task item, allowed scope, surrounding-code coherence, reuse, comments, security boundaries, and named test assertion. Reject partial task-set completions, no-diff completions, and tests that prove nothing.
8. **Accept or return.** Accept the whole ready task set only after every check passes. On failure, return exact findings once with the same task set and corrected prompt/selection. A second failure → stop and re-plan; do not silently take over a phase after delegated edits exist.
9. **Commit + close phase.** The main agent commits the accepted implementation through `encode-commit`, hands every assigned task status `x` to `encode-docs`, invokes `handoff`, and commits the refreshed baton. Never leave an accepted phase partially marked or without its implementation and handoff commits.
10. **Purge + re-evaluate.** Delete accepted `HANDOFF-<phase-id>.md`, then re-evaluate ready work.

## MAIN HANDOFF REFRESH POINTS

Refresh main `HANDOFF.md` through `encode-docs`:

- before dispatch: assignments, agent selections, file sets;
- after completion: returned, unreviewed state;
- after acceptance: decision + evidence;
- after every direct phase through `cook`;
- before every stop.

Only the main agent owns main `HANDOFF.md`, task status, and commits. Each worker writes its allowed implementation files plus only the completion block in its assignment file.

## FORBIDDEN

- A sub-agent never runs `garnish`, `review-code`, or parent-cycle task/status updates.
- Never run concurrent assignments with intersecting files.
- Never accept a report without reviewing its diff and proof.
- Never hide selected model or effort from the pre-dispatch output.
- Never push, tag, or perform destructive live-system actions without explicit authority.

## STOP CONDITIONS

- Gate unmet or dependency unaccepted.
- Genuine ambiguity without safe default, especially irreversible, financial, data-safety, or security semantics.
- Delegated assignment fails its second acceptance attempt.
- Context budget too low to dispatch and still collect, review, and hand off safely.
- User requested one phase and that phase has closed.

## END OF SESSION

Ensure every assignment is accepted or recorded outstanding, purge every accepted assignment file, run the full suite, then invoke `handoff`. A session without a fresh main baton is incomplete.
