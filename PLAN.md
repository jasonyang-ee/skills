# PLAN

goal: remediate README workflow BLOCK + expand 9 HARDEN items: truth-workflow.md, README.md, CONTRIBUTING.md, prep template, cook contract, §I oracle

## ground rules
- ∀ edits = docs + tests only; ⊥ product/runtime code
- `spec` sole mutator of `SPEC.md`; updated (§V51-V60, §T56-T59)
- ∀ `PLAN.md`/`HANDOFF.md` writes use caveman-encode
- review gate NO-GO until README invalid path fixed
- ⊥ push/tag without explicit ask

## existing assets
- baseline: latest reachable tag `v0.2.0` = `HEAD` `1e6c322`; committed diff empty
- tree dirty by existing `AGENTS.md`, `SPEC.md`, `PLAN.md`, `HANDOFF.md`; preserve all
- current oracle: `npm.cmd test` → 160/160 green; PowerShell `npm test` wrapper blocked by execution policy
- review gate: NO-GO (README documents `/spec` → `/workonplan` without required `cook` output)
- 4 existing HARDEN items + 5 new HARDEN items accepted
- truth-workflow.md: 1 line informal prose, no structure
- README step 2: `write every PLAN.md and HANDOFF.md update with caveman-encode` → implies user action
- README small-task path `README.md:125-126` skips required `PLAN.md` from `cook`
- CONTRIBUTING.md:63 links deleted `FORMAT.md`
- README.md:85 claims removed `lite` + `wenyan` caveman modes
- README.md:150-151 duplicates `caveman-encode/` in layout tree
- README.md:86 omits `review-plan` from PLAN/HANDOFF writer list
- SPEC §I currently claims `npm test` proves ∀ §V despite V13 release/manual check
- prep template line 84: `support: /spec … | /handoff … | /caveman-encode …` (missing /caveman-commit)
- cook.SKILL.md already ∋ `incomplete phases` text → need test to anchor it
- repo-hygiene.test.mjs test suites: clear pattern w/ assert.match(skill, /pattern/)

## phase order
id|goal|depends|exit
F1|research — confirm all target lines, preconditions, and test patterns|-|all targets confirmed, patterns noted
F2|remediate workflow/docs BLOCK + V51,V52,V55-V60 tests|F1|README/docs contracts + tests pass
F3|skill/test fixes: prep template + V53/V54 tests|F1|V53 V54 tests pass
F4|final verify: npm test green; §V51-V60 HOLD|F2,F3|160/160+ pass, drift resolved

## F1 research
task: T56
goal: confirm exact file/line targets, workflow preconditions, and test patterns
inputs: `truth-workflow.md`; `README.md` lines 55-129, 146-155; `CONTRIBUTING.md` lines 57-65; `skills/prep/SKILL.md` line 84; `skills/caveman/SKILL.md` frontmatter; `skills/review-plan/SKILL.md` line 32; `skills/workonplan/SKILL.md` lines 48-52; SPEC §I/§V51-V60; repo-hygiene tests
steps:
1. read `truth-workflow.md` full — confirm single-line prose, note existing phrases to preserve
2. read README six-step section + small-task path + compression/layout sections — confirm step 2, invalid `/spec` → `/workonplan`, stale modes, duplicate tree, missing loader
3. trace `workonplan` PLAN precondition and `spec` output — prove `/spec` alone cannot satisfy `/workonplan`
4. read `CONTRIBUTING.md` encoding guidance — confirm deleted `FORMAT.md` reference
5. read `SPEC.md` §I + V13 — confirm automated-oracle overclaim
6. read `skills/prep/SKILL.md` line 84 — confirm exact support line text
7. read `tests/repo-hygiene.test.mjs` existing README/cook suites — note pattern for new tests
8. confirm `skills/cook/SKILL.md` ∋ "incomplete phases" text (assert target exists)
9. draft V51-V60 test assertions; verify against existing describe/it patterns
verify: all 10 invariant targets + 1 BLOCK confirmed; no ambiguity about fix direction
exit: file paths, preconditions, evidence, and test patterns documented
next: F2

## F2 doc fixes
task: T57
goal: fix workflow/docs BLOCK + drift; add V51,V52,V55-V60 tests
inputs: F1 findings; `truth-workflow.md`; `README.md`; `CONTRIBUTING.md`; `SPEC.md`; `tests/repo-hygiene.test.mjs`
files: `truth-workflow.md`, `README.md`, `CONTRIBUTING.md`, `tests/repo-hygiene.test.mjs`
steps:
1. rewrite `truth-workflow.md` → structured 6-step doc, step names = Cook/Encode/Review the plan/Work on the plan/Garnish/Review the implementation; keep factual content from current prose
2. edit README step 2 → describe automatic `caveman-encode` discipline; list `review-plan` among PLAN/HANDOFF writers; ⊥ imply `/encode` command
3. fix README small-task path → `/spec` → `/cook` → `/workonplan`; keep `/review-plan` conditional on blast radius
4. fix README caveman modes → `full` + `ultra`; repair layout tree so each skill dir appears once
5. fix CONTRIBUTING.md encoding line → point at embedded `skills/spec/SKILL.md`/`§FORMAT`; remove `FORMAT.md` link
6. preserve corrected §I oracle wording from cook/spec handoff → automated test result ≠ proof of release/manual invariants
7. add V51,V52,V55,V56,V57,V58,V59,V60 assertions in repo-hygiene tests
8. run `npm test` → confirm new tests pass w/ 0 regressions
verify: `npm test` green; README/docs contracts + V51,V52,V55-V60 tests exist and pass
exit: workflow/docs BLOCK fixed; all F2 tests green
next: F3

## F3 skill/test fixes
task: T58
goal: fix prep template support line; add V53 V54 tests
inputs: F1 findings; `skills/prep/SKILL.md`; `tests/repo-hygiene.test.mjs`
files: `skills/prep/SKILL.md`, `tests/repo-hygiene.test.mjs`
steps:
1. edit `skills/prep/SKILL.md` line 84 → add `| /caveman-commit commit summary` to support line
2. add V53 test in "prep bootstraps the six-step workflow safely" suite: assert prep ∋ `/caveman-commit`
3. add V54 test in "cook stays the planning front door" suite: assert cook ∋ "incomplete phases"
4. run `npm test` → confirm new tests + no regressions
verify: `npm test` green; V53 V54 tests exist and pass
exit: 1 skill edit + 2 tests committed
next: F4

## F4 final verify
task: T59
goal: confirm full suite green; §V51-V60 all HOLD
inputs: completed F2 F3; SPEC.md §I/§V51-V60; PLAN.md; HANDOFF.md; package.json/test suite
files: SPEC.md, PLAN.md, HANDOFF.md, CHANGELOG.md, tests/**
steps:
1. load caveman-encode; re-read §V51-V60 definitions + corrected §I oracle
2. run `npm test` — record exact command + result; use `npm.cmd test` only when PowerShell wrapper policy blocks it
3. verify V51: truth-workflow.md ∋ all 6 step names
4. verify V52: README step 2 ∋ "automatically" or "loaded by"
5. verify V53: prep template ∋ /caveman-commit
6. verify V54: repo-hygiene test ∋ "incomplete phases" assertion
7. verify V55: README small path ∋ `/spec` → `/cook` before `/workonplan`
8. verify V56: CONTRIBUTING.md ⊥ `FORMAT.md` link/reference
9. verify V57: README caveman row ∋ `full` + `ultra`; ⊥ `lite`/`wenyan`
10. verify V58: README layout tree lists each skill dir once
11. verify V59: README encoder loader list ∋ `review-plan`
12. verify V60: §I distinguishes automated tests from release/manual checks
13. sweep touched docs/tests for logic, complexity, reuse, and coherence; cite findings
14. classify each §V as HOLD/VIOLATE/UNVERIFIABLE with evidence
15. record final verification table in HANDOFF.md
16. update CHANGELOG.md ## [Unreleased]
17. single summary commit
verify: `npm test` → 160+ pass; all §V51-V60 HOLD
exit: final verification table filled; cycle complete
next: /garnish
