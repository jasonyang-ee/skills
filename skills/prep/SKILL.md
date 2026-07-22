---
name: prep
description: |
  Turn a user request into an encoded execution package: refine the
  goal just enough, research the unknowns first, hand durable requirements to
  the encode-docs skill, draft a phased PLAN.md, and trigger handoff so a cold
  session can resume with cook. The generated plan always starts with
  research, ends with final verification, and holds a production-quality,
  verification-driven, evidence-based implementation contract across all six
  workflow steps. Triggers: "/prep".
---

# prep — request → PLAN.md + HANDOFF.md + encode-docs handoff

`prep` is the planning front door for work that is too fuzzy, too large, or too
session-spanning for `cook` or `encode-docs` alone. It analysis and summarize between
new idea, research setup, and a final drift-check pass by packaging them into
one short planning run.

## Quality contract

Use these operational cues in the generated plan and handoff. “Principal
engineer” is a quality signal, not a substitute for an observable contract.
Each cue also lives in the description of the skill that owns its step; this
contract mirrors them, it is not their sole carrier.

1. **Plan:** make the goal, constraints, interfaces, risks, unknowns, and
   acceptance evidence explicit; preserve the smallest coherent scope.
2. **Encode:** keep `PLAN.md` and `HANDOFF.md` compact, lossless, and
   encoded so a cold agent can resume without hidden context.
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
`HANDOFF.md`; that work can go straight to `encode-docs`.

## Hard outputs

Every `prep` run must produce all of these:

1. `PLAN.md` at repo root, in the spec encoding, carrying the phase task table
   (`§T`). Tasks live here — never in `SPEC.md`. Every phase maps to exactly
   one `§T` row.
2. `HANDOFF.md` at repo root, in the spec encoding, written via the `handoff`
   skill after the plan exists.
3. A handoff block for the `encode-docs` skill **only when** the cycle changes
   durable truth — goal, constraint, interface, sourced research, or a standing
   invariant. Many cycles need no new `SPEC.md` rows at all. Tasks and one-time
   fixes are not durable truth and never land in `SPEC.md`.

`PLAN.md` and `HANDOFF.md` are short-lived execution state. `SPEC.md` is the
durable memory, and it stays lean.

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
Write sourced findings into `§R` through `encode-docs` before handing off to
`cook`.

### 3. Guard the spec, then hand durable facts to `encode-docs`

`encode-docs` remains the sole mutator of `SPEC.md`, and `SPEC.md` holds durable
truth only. Adding to it is a high-priority, high-bar decision, not a routine
byproduct of planning. Before proposing any spec change, apply the bar:

- **Default to no spec change.** Most cycles touch behaviour that the skill
  files, `PLAN.md`, and `CHANGELOG.md` already record. A new spec row is the
  exception, not the norm.
- A new `§V`/`§C`/`§I` row must be a **standing guarantee** a future reviewer
  keeps checking — never a one-time fix, a task, a bug record, or a note that
  only matters this cycle.
- Prefer **editing or deleting** an existing row over adding one. If the cycle
  makes a row false, hand `encode-docs` the removal, not a second row beside it.
- When unsure whether a fact is durable, leave it out. An over-full spec drifts,
  and every session pays to read it.

Then invoke `encode-docs` with only the sections that genuinely need a durable
update:

- `§G` goal — only if the mission changed
- `§C` constraints — only a new non-negotiable boundary
- `§I` interfaces — only a changed external surface
- `§R` sourced research rows — findings that carry a citation
- `§V` proposed invariants — durable standing guarantees only

Tasks (`§T`) are authored directly in `PLAN.md` and are never handed to
`encode-docs` for `SPEC.md`. Do not write `SPEC.md` directly from `prep`.

High blast radius after any spec update? Recommend `/review-plan` before the
first implementation phase starts.

### 4. Write `PLAN.md`

Write or replace `PLAN.md` at repo root. Keep it short, agent-facing, and
encoded. It must contain, in this order:

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
- one `§T` task id via `task: T<n>`, defined in this `PLAN.md`; no duplicate
  phase/task mapping.

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
- <encoded bullets>

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
- Do not put tasks, one-time fixes, or bug records in `SPEC.md`; those belong in
  `PLAN.md`, `CHANGELOG.md`, and git.
- Do not add a `§V`/`§C`/`§I` row that is not a durable standing guarantee. When
  unsure, leave it out.
