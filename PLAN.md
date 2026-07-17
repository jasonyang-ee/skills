# PLAN

goal: `/workonplan` no arg → execute all remaining PLAN.md phases in order

## ground rules
- research first; durable facts → SPEC.md via spec
- default `/workonplan` runs all remaining phases in PLAN.md order
- explicit `/workonplan F<n>` may target one phase
- skills = markdown; verify `npm test`; final phase = drift check

## existing assets
- `skills/workonplan/SKILL.md` now distinguishes no-arg all-phase execution from explicit targeted execution
- `README.md`, `skills/prep/SKILL.md`, and `AGENTS.md` carry execution-entry guidance
- `tests/repo-hygiene.test.mjs` owns skill contract checks
- `SPEC.md` has monotonic §V/§T rows through V70/T70

## phase order
id|goal|depends|exit
F1|research execution-entry contracts|-|all stale one-phase claims mapped; §R/§T updated
F2|update workonplan + related docs/tests|F1|target tests green; default all-phases contract explicit
F3|final verify code vs spec/plan|F2|full suite green; drift resolved

## F1 research
task: T68
goal: confirm default-vs-explicit phase semantics across shipped guidance
inputs: `skills/workonplan/SKILL.md`, `README.md`, `skills/prep/SKILL.md`, `AGENTS.md`, tests
steps:
1. inspect phase picker, stop conditions, and default command examples
2. map stale one-phase wording and preserve explicit phase override
3. record invariant + tighten F2/F3
verify: every touched surface and test oracle named
exit: research complete; F2 scoped
next: F2

## F2 implement
task: T69
goal: make no-arg `/workonplan` execute all remaining phases sequentially
inputs: F1 findings; workonplan skill; README/prep guidance; contract tests
steps:
1. rewrite workonplan description, phase selection, loop, and stop condition
2. update README, prep template, and AGENTS command contract
3. add regression coverage for default all-phase behavior and explicit override
4. add Unreleased changelog entry
verify: `npm test -- --test-name-pattern=workonplan` green
exit: default all-phase contract documented and tested
next: F3

## F3 final verify
task: T70
goal: verify execution-entry change against durable contract
inputs: `SPEC.md`, this plan, all touched skills/docs/tests
steps:
1. re-read mapped V/I/T items and touched diff
2. run `npm test`
3. classify mapped items in `HANDOFF.md`; resolve drift
verify: full suite green; all mapped items HOLD
exit: change complete
next: -
