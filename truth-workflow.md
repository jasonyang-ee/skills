# The truth workflow

The canonical sequence these skills implement. One `SPEC.md` holds the durable
truth; `PLAN.md` and `HANDOFF.md` are short-lived working files that exist only
while a cycle is running.

`/prep` bootstraps a repository for this sequence. It is not one of the six
steps.

## 1. Cook

An idea, bug, feature, or expected behavior goes in; `cook` creates `PLAN.md`
and `HANDOFF.md`, and hands durable decisions to `SPEC.md` through `spec`.

`cook` is iterative. A new idea, bug, or feature expands the current plan,
handoff, and spec rather than starting a fresh set of files.

## 2. Encode

`PLAN.md` and `HANDOFF.md` are written in `caveman-encode` so a cold session
reads a compact, standard symbol language. Every skill that writes either file
loads the encoding automatically — this is a writing discipline the skills
apply, not a command anyone invokes.

## 3. Review the plan

In a cold session, `review-plan` checks the plan is good. If it is not, the
plan, handoff, and spec are updated and refined.

Research is allowed here, driven by the research phase at the start of the
plan. Each round of resolved research reduces the number of research phases the
plan still needs, so repeating this step eventually drives the remaining
research to none.

## 4. Work on the plan

In another cold session, `workonplan` executes one phase at a time, verifies
it, and commits it.

Every phase must end with an updated `HANDOFF.md`. This matters because a
session can be cut off at any time, and an up-to-date handoff is what lets a
new cold session resume the implementation.

## 5. Garnish

Once every planned phase is done, `garnish` routes durable cleanup through
`spec`, then removes the short-lived `PLAN.md` and `HANDOFF.md`, leaving a
clean spec-driven design behind.

## 6. Review the implementation

`review-code` closes the cycle. It sweeps the completed implementation from its
release baseline and can trigger a new `cook` to further refine and fix code
with a fresh round of plan and handoff.

This too is iterative.

## Order

The order and its safety gates are mandatory. Steps 3 and 6 iterate
internally; neither may be skipped to reach the next step faster.
