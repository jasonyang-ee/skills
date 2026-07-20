# PLAN

goal: move commit-message expansion into `caveman-commit` → human-readable commits, ⊥ caveman symbols, ⊥ plan ids

## ground rules
- quality > speed; ⊥ skip verification step
- commit msg = human-facing artifact. git reader ⊥ has `PLAN.md`/`SPEC.md`/`HANDOFF.md` ∴ ∀ id ! expand to self-contained detail
- ban scope = GENERATED commit output ⊥ SKILL.md own prose (∵ `caveman-commit` description ∋ `≤50 chars` — legit)
- `caveman-commit` = vendored MIT, presently `Modified: No` → editing forks it ∴ `NOTICE.md` row ! flip `Yes` (AGENTS.md vendor rule)
- ⊥ restyle rest of `caveman-commit`; keep upstream voice. Diff = only what `NOTICE.md` records
- expansion rules live in `caveman-commit` ONCE; `workonplan`+`handoff` delegate ⊥ duplicate template
- smallest coherent diff: 3 skill files + `NOTICE.md` + tests + `CHANGELOG.md`
- load `caveman-encode` ∀ `PLAN.md`+`HANDOFF.md` writes; `spec` = sole SPEC.md mutator
- ⊥ push ⊥ tag without explicit user ask

## existing assets
- `skills/caveman-commit/SKILL.md` — Conventional Commits type+scope+subject+body codified; `## Rules`, `## Examples`, `## Auto-Clarity`, `## Boundaries`; ⊥ symbol ban, ⊥ id-expansion rule (§R29)
- `skills/workonplan/SKILL.md:104-108` EXECUTE step 6 — "then ONE summary commit… Follow repo commit conventions."
- `skills/handoff/SKILL.md:78-79` rule 8 — bare `docs: handoff` guidance
- `skills/caveman-encode/SKILL.md` BOUNDARIES — "Commit message → normal English" ∴ new rules reinforce, ⊥ contradict (§R29)
- `NOTICE.md:56` — `\| skills/caveman-commit/ \| caveman-commit \| No \|`
- `tests/attribution.test.mjs:12-20` VENDORED list; asserts row EXISTS ⊥ Modified column
- `tests/repo-hygiene.test.mjs` — `assert.match` on skill prose = house pattern; `skills/**` ∈ §C test scope ∴ V77-V80 automatable
- `npm test` oracle; `CHANGELOG.md` `## [Unreleased]` empty
- §R28 (prior text targets), §R29 (fork + boundary + scope findings)

## phase order
id|goal|depends|exit
F1|research: fork constraint, encode boundary, present gap, test eligibility|-|§R29 logged, targets confirmed
F2|implement: expansion rules in `caveman-commit`, delegate from `workonplan`+`handoff`, flip NOTICE, add tests|F1|npm test green, diff reviewed
F3|final verify: §V77-V80 HOLD, full suite green, CHANGELOG|F2|∀ §V HOLD, committed

## F1 research
task: T77
goal: confirm vendored-fork obligation + exact edit targets; ⊥ unknowns before edit
inputs: `skills/caveman-commit/SKILL.md`, `skills/caveman-encode/SKILL.md`, `NOTICE.md`, `tests/attribution.test.mjs`, `AGENTS.md`
steps:
1. read `skills/caveman-commit/SKILL.md` full — confirm ⊥ existing symbol ban & ⊥ id-expansion rule; locate insertion point (after `## Rules`, before `## Examples`)
2. read `skills/caveman-encode/SKILL.md` BOUNDARIES — confirm "Commit message → normal English" ∴ new rules align
3. read `NOTICE.md:56` — confirm Modified == `No` ∴ flip required
4. read `tests/attribution.test.mjs` — confirm Modified column ⊥ asserted ∴ V80 needs new case
5. confirm §C test scope admits `skills/**` prose asserts ∴ V77-V80 ⊥ MANUAL
6. §T T77 → `~`; findings → §R29 via `spec`
verify: §R29 rows sourced; ∀ target located verbatim; ⊥ open `?`
exit: fork obligation + edit targets confirmed
next: F2

## F2 implement
task: T78
goal: expansion rules land in `caveman-commit`; `workonplan`+`handoff` delegate; NOTICE honest; tests anchor
inputs: F1 findings; V77, V78, V79, V80; §R29
files: `skills/caveman-commit/SKILL.md`, `skills/workonplan/SKILL.md`, `skills/handoff/SKILL.md`, `NOTICE.md`, `tests/repo-hygiene.test.mjs`, `tests/attribution.test.mjs`
steps:
1. flip §T T77 → `x`; T78 → `~`
2. `skills/caveman-commit/SKILL.md` — add rules to `## What NEVER goes in`:
   - ⊥ encoding symbols (`→ ∴ ∀ ⊥ ∃ §`) — write English word
   - ⊥ plan/spec ids (`F1`, `T77`, `V77`, `R28`, `B5`, `§V.3`) as carrier of meaning
3. same file — add short `## Expanding plan references` section: git reader ⊥ has plan files ∴ ∀ id → what it stands for, ≥1 before/after example pair (bad: `feat(F2): impl T78 per V77` → good: `docs(workonplan): delegate commit wording to caveman-commit`); keep upstream terse voice
4. `skills/workonplan/SKILL.md` step 6 — replace "then ONE summary commit… Follow repo commit conventions." → invoke `caveman-commit`; scope = touched component ⊥ phase id; body names changed paths + verification in plain English
5. `skills/handoff/SKILL.md` rule 8 — replace bare `docs: handoff` → invoke `caveman-commit`; body = phase closed + next step + test state, plain English, ⊥ phase ids
6. `NOTICE.md:56` — Modified `No` → `Yes — <expansion rules: no encoding symbols, no plan/spec identifiers, expand references into plain English>`
7. `tests/repo-hygiene.test.mjs` — add cases: V79 (caveman-commit prose ∋ symbol ban + id ban + expansion section + example), V77 (`workonplan` step 6 ∋ `caveman-commit`), V78 (`handoff` rule 8 ∋ `caveman-commit`)
8. `tests/attribution.test.mjs` — add V80 case: `skills/caveman-commit/` row Modified == `Yes`
9. run `npm test` — ! green
10. read FULL `git diff` — ∀ changed line matches plan; ⊥ drive-by; ⊥ dead prose; ⊥ private refs; ⊥ vendored restyle beyond recorded change; body line counts ≤500 (V14)
verify: `npm test` exit 0; new cases fail against pre-edit prose (write-test-first where practical); diff = exactly 6 files
exit: rules land once, delegation wired, NOTICE honest, tests green
next: F3

## F3 final verify
task: T79
goal: §V77-V80 HOLD; full suite green; CHANGELOG updated; committed
inputs: F2 diff; SPEC §V77, V78, V79, V80; §R29
steps:
1. flip T78 → `x`; T79 → `~`
2. re-read `skills/caveman-commit/SKILL.md` — classify V79: HOLD|VIOLATE|UNVERIFIABLE + cite test case
3. re-read `skills/workonplan/SKILL.md` step 6 — classify V77
4. re-read `skills/handoff/SKILL.md` rule 8 — classify V78
5. re-read `NOTICE.md` row — classify V80
6. regression sweep: V6 (description ≤1024), V14 (body ≤500 lines), V17 (NOTICE row ∃), V18, V53 — ⊥ broken by edit
7. run `npm test` — record output verbatim
8. `CHANGELOG.md` `## [Unreleased]` entry — human-facing commit expansion
9. commit via `caveman-commit` (dogfood the new rules: ⊥ symbols, ⊥ ids in the message)
10. flip T79 → `x`; commit SPEC.md
verify: `npm test` exit 0; V77=V78=V79=V80=HOLD; result table → `HANDOFF.md`
exit: committed, tests green, drift resolved
next: -
