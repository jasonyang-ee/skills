# PLAN

goal: prep template → construct complete new-user AGENTS.md guidance

## ground rules
- research first; durable facts → SPEC.md via spec
- preserve existing AGENTS.md content; template only governs absent/new sections
- skills = markdown; verify `npm test`; final phase = drift check

## existing assets
- `skills/prep/SKILL.md` has lifecycle, symbol, and checklist template
- `tests/repo-hygiene.test.mjs` tests prep contract
- user golden target adds AI-file purpose, project scripts, and detailed checklist

## phase order
id|goal|depends|exit
F1|research local prep/template/test contracts|-|targets + invariant logged
F2|update prep template + contract test + changelog|F1|target tests green
F3|final verify code vs spec/plan|F2|full suite green, drift resolved

## F1 research
task: T65
goal: confirm prep output surfaces and safe-preservation rules
inputs: `skills/prep/SKILL.md`, `tests/repo-hygiene.test.mjs`, user golden `AGENTS.md`
steps:
1. compare current template with golden sections
2. identify exact new-user content that can be generated without project guesses
3. record invariant + tighten F2/F3
verify: target sections and non-overwrite boundary explicit
exit: research complete; F2 scoped
next: F2

## F2 implement
task: T66
goal: make prep construct golden AGENTS.md shape for new users
inputs: F1 findings; `skills/prep/SKILL.md`; prep contract tests
steps:
1. add AI-file purpose section and PLAN/HANDOFF lifecycle contract
2. add project-scripts placeholder section; retain no-guess rule
3. expand generated end-of-chat checklist with user-required gates
4. test required generated sections and changelog entry
verify: `npm test -- --test-name-pattern=prep` green
exit: prep contract documents all target sections
next: F3

## F3 final verify
task: T67
goal: verify prep change against durable contract
inputs: `SPEC.md`, this plan, `skills/prep/SKILL.md`, tests
steps:
1. re-read mapped V/I/T items and touched diff
2. run `npm test`
3. classify mapped items in `HANDOFF.md`; resolve drift
verify: full suite green; all mapped items HOLD
exit: change complete
next: -
