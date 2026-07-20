---
name: prep
description: |
  Turn a user request into a caveman-encoded execution package: refine the
  goal just enough, research the unknowns first, hand durable requirements to
  the spec skill, draft a phased PLAN.md, and trigger handoff so a cold
  session can resume with cook. The generated plan always starts with
  research, ends with final verification, and holds a production-quality,
  verification-driven, evidence-based implementation contract across all six
  workflow steps. Triggers when the user says "prep this", "draft PLAN.md",
  "prepare a handoff", "turn this into a multi-session plan", or asks for
  production-quality planning, evidence-based planning, principal-engineer
  planning, or grill/research/check-style planning in one pass.
license: MIT
---

# prep — request → PLAN.md + HANDOFF.md + spec handoff

`prep` is the planning front door for work that is too fuzzy, too large, or too
session-spanning for `cook` or `spec` alone. It replaces the old split between idea
grilling, research setup, and a final drift-check pass by packaging them into
one short planning run.

## Quality contract

Use these operational cues in the generated plan and handoff. “Principal
engineer” is a quality signal, not a substitute for an observable contract.
Each cue also lives in the description of the skill that owns its step; this
contract mirrors them, it is not their sole carrier.

1. **Plan:** make the goal, constraints, interfaces, risks, unknowns, and
   acceptance evidence explicit; preserve the smallest coherent scope.
2. **Encode:** keep `PLAN.md` and `HANDOFF.md` compact, lossless, and
   caveman-encoded so a cold agent can resume without hidden context.
3. **Review the plan:** research unknowns, challenge assumptions and phase
   dependencies, and require an explicit GO/NO-GO before high-blast-radius work.
4. **Implement:** make the smallest codebase-consistent change, verify-first;
   name exact tests and oracles, then self-review the complete diff.
5. **Close:** leave evidence in `SPEC.md`, `CHANGELOG.md`, and `HANDOFF.md`;
   never claim completion from a green command alone when manual invariants
   remain unverified.
6. **Review the implementation:** inspect correctness, complexity, reuse,
   coherence, and drift from the release baseline; turn accepted findings into
   the next `prep` cycle.

The quality contract is complete only when each applicable cue has evidence.
Do not use “best effort”, “looks good”, or “principal engineer” as completion
criteria.

## When to use

Use `prep` when any of these are true:

- The user gives a desire, idea, expected behaviour, or fully defined feature
  and wants the agent to turn it into executable work.
- The work will likely span multiple files, phases, or sessions.
- The plan needs a deliberate research phase before coding starts.
- A cold follow-up session should be able to start with `/cook` and no
  extra explanation.

Skip it for a tiny, already-clear change with no need for `PLAN.md` or
`HANDOFF.md`; that work can go straight to `spec`.

## Hard outputs

Every `prep` run must produce all of these:

1. `PLAN.md` at repo root, in caveman encoding.
2. `HANDOFF.md` at repo root, in caveman encoding, written via the `handoff`
   skill after the plan exists.
3. A handoff block for the `spec` skill so durable goal / constraint / research /
   invariant / task changes land in `SPEC.md`; every PLAN phase gets one matching
   `§T` row.

`PLAN.md` and `HANDOFF.md` are short-lived execution state. `SPEC.md` is the
durable memory.

## Load

1. Read the user request carefully.
2. Read existing `SPEC.md`, `PLAN.md`, and `HANDOFF.md` if they exist.
   If `PLAN.md` already has incomplete phases (any mapped `§T` row not `x`),
   default to **expanding** it — append new phases and update `§T` — rather
   than replacing. Replace only when the user explicitly asks for a fresh
   start or every mapped `§T` row is already `x`.
3. Load `encode-docs`; both `PLAN.md` and `HANDOFF.md` use that encoding.
4. Read just enough repo context to plan real work: existing tests, entrypoints,
   configs, public interfaces, and nearby conventions.
5. If the request has a blocking ambiguity, ask one question at a time in the
   style `grill` used: recommend an answer, wait, then continue. Do not quiz the
   user once the plan is unambiguous.

## Workflow

### 1. Distill the request

Extract:

- the goal the code must accomplish;
- non-negotiable constraints;
- public interfaces or files the outside world touches;
- unknowns that need proof rather than guesses.

Unknowns stay explicit as `?` items. Never silently invent a product decision.

### 2. Force research first

The first plan phase is always research, even if short. If there is no external
question, use the phase to confirm local code patterns, APIs, and tests that the
later phases must honor. Research is allowed to refine the rest of the plan;
when it changes reality, update the later phases instead of pretending the first
draft was right. External findings require a source; unresolved items stay `?`.
Write sourced findings into `§R` through `spec` before handing off to
`cook`.

### 3. Hand durable facts to `spec`

`spec` remains the sole mutator of `SPEC.md`. `prep` prepares the material and
invokes `spec` with the sections that need durable updates:

- `§G` goal
- `§C` constraints
- `§I` interfaces
- `§R` sourced research rows
- `§V` proposed invariants
- `§T` ordered implementation tasks
- one `§T` row per PLAN phase, referenced by phase `task:` field

Do not write `SPEC.md` directly from `prep`.

High blast radius after the spec update? Recommend `/review-plan` before the first
implementation phase starts.

### 4. Write `PLAN.md`

Write or replace `PLAN.md` at repo root. Keep it short, agent-facing, and
caveman-encoded. It must contain, in this order:

1. a one-line goal;
2. ground rules / process contract for the run, including the applicable
   quality-contract cues and evidence required for each phase;
3. existing assets or evidence already present;
4. a phase-order table;
5. the full section for each phase.

Use phase ids `F1`, `F2`, `F3`, ... and keep them monotonic.

### 5. Make the phase skeleton predictable

The recommended minimum shape is:

- `F1` — research: confirm unknowns, collect sources, refine `SPEC.md`, tighten
  the later phases.
- `F2..Fn-1` — implementation phases: code, tests, migrations, docs, or rollout
  work, split only when a real boundary exists.
- `Fn` — final verification: a check-style pass that compares code against
  `SPEC.md`, `PLAN.md`, and touched tests before the work is declared done.

The first phase must be research. The last phase must be final verification.
Do not put coding ahead of research or after the final verification phase.

### 6. Make every phase executable

Each phase section must name:

- objective;
- inputs or prerequisites;
- files / modules / surfaces likely touched;
- numbered steps;
- verification contract;
- exit criteria;
- next phase pointer.
- one existing `§T` task id via `task: T<n>`; no duplicate phase/task mapping.

A cold agent should be able to start `F1` or resume later phases with
`/cook` and no extra chat context.

### 7. Trigger `handoff`

After `PLAN.md` is written, invoke the `handoff` skill so `HANDOFF.md` points at
the next phase. A fresh plan with no baton is a broken plan. If no code has
shipped yet, the handoff still records the exact next step: start `F1`.

## `PLAN.md` template

Use this shape and adapt the details to the repo:

```md
# PLAN

goal: <one line>

## ground rules
- <caveman bullets>

## existing assets
- <repo facts, tests, docs, constraints>

## phase order
id|goal|depends|exit
F1|research unknowns & refine plan|-|facts logged, later phases updated
F2|implement approved work|F1|target tests green
F3|final verify code vs spec & plan|F2|full suite green, drift resolved

## F1 research
task: T<n>
goal: <one line>
inputs: <paths, questions, sources>
steps:
1. <...>
2. <...>
verify: <what proves this phase done>
exit: <state>
next: F2

## F2 implement
task: T<n>
...

## F3 final verify
task: T<n>
...
```

Keep the file compact. `PLAN.md` is a working document, not an RFC.

## Final verification phase rules

The last phase replaces the old `check` rhythm. It must, at minimum:

- re-read the relevant `SPEC.md` sections and touched `PLAN.md` phases;
- run the agreed verification commands;
- classify every relevant `§V`, `§I`, and `§T` item as `HOLD`, `VIOLATE`, or
  `UNVERIFIABLE`, with file/test evidence;
- sweep touched implementation for logic correctness, unnecessary complexity,
  missed reuse, and codebase incoherence; cite each finding;
- name any drift explicitly and decide whether code or spec changes;
- record the result table in `HANDOFF.md` before closing the phase.

If the final phase cannot prove the work, the plan is not finished.

## Boundaries

- Do not write code from `prep`.
- Do not skip `PLAN.md`.
- Do not skip `HANDOFF.md`.
- Do not skip the research-first phase.
- Do not skip the final verification phase.
- Do not make `PLAN.md` or `HANDOFF.md` the long-term source of truth; that is
  `SPEC.md`.
