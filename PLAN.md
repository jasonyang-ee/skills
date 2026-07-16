# PLAN

goal: remediate README workflow BLOCK + expand 9 HARDEN items: truth-workflow.md, README.md, CONTRIBUTING.md, prep template, cook contract, §I oracle

## ground rules
- ∀ edits = docs + tests only; ⊥ product/runtime code
- `spec` sole mutator of `SPEC.md`; updated (§V51-V60, §T56-T59)
- ∀ `PLAN.md`/`HANDOFF.md` writes use caveman-encode
- review gate NO-GO until README invalid path fixed
- ⊥ push/tag without explicit ask

## existing assets
- baseline: latest reachable tag `v0.2.0` = `1e6c322` ≠ `HEAD` `c1b35f2`; `v0.2.0..HEAD` = 3 docs-only commits, ⊥ code drift
- current oracle: `npm test` → 160/160 green @ 2026-07-16 (Bash); `npm.cmd test` only when PowerShell wrapper policy blocks
- review gate: NO-GO (README documents `/spec` → `/workonplan` without required `cook` output)
- review-plan round 2026-07-16: local research resolved; F1 remains removal candidate after findings land in `§R`
- review-plan round 2 2026-07-16: 5 BLOCK found in F5/F6 → fixed; `§R` R19-R23 added; V63/V64/V65 rewritten; V67/V68 added
- user ruling 2026-07-16: sub-agent completion = `## completion` block (⊥ `garnish` per sub-agent); per-sub-agent review = dispatcher phase-scoped acceptance review (⊥ `/review-code` mid-dispatch)
- `garnish` ! ∀ mapped §T `x` + ⊥ unrelated dirty files; removes exactly root `PLAN.md`+`HANDOFF.md` (§R.19) ∴ ⊥ scoped per-agent use
- `review-code` baseline = release tag & cook handoff mandatory (§R.20) ∴ ⊥ mid-dispatch use
- `AGENTS.md` ⊥ ∋ sub-agent roster; `sonnet-implementer`/`Explore` = harness-only (§R.21) ∴ ⊥ ∈ skill body
- `NOTICE.md:92-96` "Original work" own-skill roster ⊥ test-anchored (§R.22)
- F5 & F6 share SPEC.md, README.md, AGENTS.md, tests/repo-hygiene.test.mjs, CHANGELOG.md ∴ ⊥ parallel-safe → F6 depends F5
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
F5|rename review-implementation → review-code; update ∀ live refs|F4|review-code ∃; live refs updated; historical `§T` labels preserved; tests green
F6|add dispatchplan skill + roster updates|F5|dispatchplan ∃; roster aligned; seven dispatch contracts + CLI discovery green
F7|final verify F5/F6: §V61-V68 HOLD + V58/V50 regression|F5,F6|tests green; drift resolved

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
verify: all 10 invariant targets + 1 BLOCK confirmed; no ambiguity about fix direction; findings recorded in `§R` R16-R18
exit: file paths, preconditions, evidence, and test patterns documented
next: F2

review-plan note: F1 research resolved in this review; removal candidate on next `/cook` cycle. If retained for traceability, F1 only records R16-R18 and does not introduce new unknowns.

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
verify: `npm test` green; exact cases `truth-workflow names`, `README Encode discipline`, `README small-task path`, `CONTRIBUTING embedded format`, `README caveman modes`, `README layout roster`, `README encoder loaders`, and `SPEC oracle wording` pass
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
verify: `npm test` green; exact cases `prep support roster` and `cook incomplete-phase contract` pass
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

## F5 rename
task: T60
goal: rename skill `review-implementation` → `review-code`; update ∀ live refs; preserve historical `§T` labels
inputs: SPEC.md §V61; skills/review-implementation/SKILL.md; AGENTS.md; README.md; skills/garnish/SKILL.md; skills/prep/SKILL.md; NOTICE.md; truth-workflow.md; tests/repo-hygiene.test.mjs
files: skills/review-implementation/ → skills/review-code/, SPEC.md, skills/garnish/SKILL.md, skills/prep/SKILL.md, AGENTS.md, README.md, NOTICE.md, truth-workflow.md, tests/repo-hygiene.test.mjs, CHANGELOG.md
steps:
1. `git mv skills/review-implementation skills/review-code`
2. edit `skills/review-code/SKILL.md` frontmatter `name:` → `review-code`; ⊥ change body procedure
   — CORRECTED @ F5 exec: body H1 `# review-implementation — …` = live self-ref ∴ V61 binds → H1 → `# review-code — …`. Precedent `skills/review-plan/SKILL.md:16` (T42 rename) carries new name in H1. Prose/steps untouched
3. update `skills/garnish/SKILL.md`: 2 occurrences `/review-implementation` → `/review-code`
4. update `skills/prep/SKILL.md`: 3 occurrences `review-implementation` → `review-code`
5. update `AGENTS.md`: 2 occurrences `review-implementation` → `review-code`
6. update `README.md`: table link + row (`README.md:42`), cmd refs (`:125`, `:128`), roster line (`:211`), AND Layout tree entry (`:153` — V58); ⊥ change step name "Review the implementation" (`:73` — V51 test asserts it)
7. update `NOTICE.md:94` original-work roster line: `review-implementation` → `review-code`
8. update `truth-workflow.md`: `review-implementation` → `review-code`; ⊥ touch step name "Review the implementation"
9. update `tests/repo-hygiene.test.mjs`: commandOrder[5] (`:70`) → `/review-code`; readFileSync path (`:215`) → `review-code`; garnish assertion (`:249`) → `/review-code`; add `review-implementation` to `RETIRED_SKILLS` (`:23`) — reuses existing absence pattern, precedent `review` → `review-plan` (T42); add named case for live-reference allowlist (historical `§T` labels permitted)
10. amend `§V61`/`§T T60` via spec to define live-reference scope; preserve historical `§T` labels
10b. ADDED @ F5 exec: `SPEC.md §R.20` claim + source path named `skills/review-implementation/SKILL.md` → dead path & ⊥ ∈ V61 historical-`§T` allowance ∴ F5 verify (`rg` → only CHANGELOG + `§T`) ⊥ satisfiable without it → repoint → `skills/review-code/SKILL.md`, retain pre-rename provenance note (⊥ contradict sourced fact, §R fidelity V34)
11. update CHANGELOG.md `## [Unreleased]`
12. run `npm test`; record result
verify: `npm test` green; exact cases `review-code rename and live refs` + `does not ship skills/review-implementation/` pass; `skills/review-implementation/` ⊥ ∃; `rg 'review-implementation'` → only `CHANGELOG.md` + `SPEC.md §T` historical rows; V58 layout tree still lists each `skills/` child once
exit: rename committed
next: F6

## F6 dispatchplan
task: T61
goal: create `skills/dispatchplan/SKILL.md`; update README/AGENTS/NOTICE/truth-workflow roster 12→13; define safe sub-agent handoff/acceptance lifecycle
inputs: SPEC.md §V62-V68, §R.19-R.23; skills/workonplan/SKILL.md (structure + self-review contract `:84-92`); skills/garnish/SKILL.md (`:22-31,48-49` — why ⊥ per-sub-agent); tests/repo-hygiene.test.mjs (test pattern)
files: skills/dispatchplan/SKILL.md (new), SPEC.md, README.md, AGENTS.md, NOTICE.md, truth-workflow.md, tests/repo-hygiene.test.mjs, CHANGELOG.md
steps:
1. create `skills/dispatchplan/SKILL.md`: frontmatter name=dispatchplan, description ≤1024 chars (∋ "sub-agent", "dispatch", "parallel"), license: MIT; body ≤500 lines covering:
   - dispatcher vs sole-agent role; ⊥ dispatcher writes phase code itself
   - load section (main `HANDOFF.md` → `PLAN.md` → `SPEC.md` → baseline test)
   - selection matrix by phase complexity in CAPABILITY terms only (V67: ⊥ name `sonnet-implementer`/`Explore` | any harness agent — high-complexity/ambiguous/shared-module phase → most capable tier; mechanical/isolated phase → cheaper tier; read-only fan-out → search-class agent)
   - shared-file safety: ⊥ concurrent assignments touching same file (V64); serialize when file sets intersect
   - per-assignment loop: create `HANDOFF-<phase-id>.md` @ root (V63, exact literal) → write scope/files/named tests/stop conditions → dispatch selected sub-agent → sub-agent writes `## completion` block (status\|evidence\|tests) into assigned file (V65) → main agent phase-scoped acceptance review of sub-agent diff per `workonplan` self-review contract (§R.23) → accept | return with findings → purge `HANDOFF-<phase-id>.md` after acceptance (V68)
   - explicit ⊥ list: sub-agent ⊥ run `garnish` (∵ §R.19 — precondition ∀ §T `x` fails mid-plan; procedure deletes root baton); `/review-code` ⊥ mid-dispatch (∵ §R.20, V47 — step 6, mandatory cook handoff rewrites executing `PLAN.md`)
   - main `HANDOFF.md` refresh @ before dispatch, after completion, after acceptance, before stop (V66)
   - stop conditions; end-of-session baton
2. update `README.md`: add `dispatchplan` row to **Session continuity** table (`:47`, beside workonplan) as parallel alternative; add `dispatchplan/` to Layout tree (`:148-155` — V58); update six-step narrative step 4 (`:69`) → `workonplan` | `dispatchplan` (V47, V50)
3. update `AGENTS.md`: count 12→13 (`:6`); add `dispatchplan` to own-skills list (`:6`); note as alternative under Commands item 4 (`:21`) — ⊥ add 7th numbered command (∵ V42 six-command order)
4. update `NOTICE.md:94` "Original work" roster → add `skills/dispatchplan/` (V39; ∵ §R.22 ⊥ test-anchored → miss is silent). ⊥ vendor row (own skill)
5. update `truth-workflow.md` step 4 → `workonplan` | `dispatchplan` (∵ §I canonical narrative); ⊥ change 6 step names (V51)
6. add seven named tests in `tests/repo-hygiene.test.mjs`: `dispatchplan front door` (V62), `dispatchplan dedicated handoff` (V63 literal `HANDOFF-<phase-id>.md`), `dispatchplan complexity selection` (V64 incl. shared-file safety), `dispatchplan completion then acceptance review` (V65), `dispatchplan main baton refresh` (V66), `dispatchplan names no harness agent` (V67 — assert.doesNotMatch ∀ `sonnet-implementer`, `Explore`), `dispatchplan purges assignment handoffs` (V68); add NOTICE original-work assertion for own skills (§R.22)
7. update CHANGELOG.md `## [Unreleased]`
8. run `npm test`; confirm cli-discovery lists `dispatchplan` (roster derived ← `loadSkills()`, §R.18 — ⊥ count assertion to update)
verify: `npm test` green; exact seven dispatch cases + CLI discovery pass; §V62-V68 satisfied; V58 layout tree lists each `skills/` child once
exit: dispatchplan committed; roster 13 skills
next: F7

## F7 final verify
task: T62
goal: §V61-V68 all HOLD; V58/V50 regression clear; full suite green; drift resolved
inputs: SPEC.md §V61-V68 + §R.19-R.23; skills/review-code/SKILL.md; skills/dispatchplan/SKILL.md; tests/**; PLAN.md; HANDOFF.md
files: SPEC.md, PLAN.md, HANDOFF.md, CHANGELOG.md
steps:
1. load caveman-encode; re-read §V61-V68 + V58 + V50
2. run `npm test` — record exact result
3. verify V61: `skills/review-code/` ∃; `skills/review-implementation/` ⊥ ∃; `rg 'review-implementation'` → only `CHANGELOG.md` + `SPEC.md §T` historical rows
4. verify V62: case `dispatchplan front door` + skill contract + CLI discovery
5. verify V63: case `dispatchplan dedicated handoff` → literal `HANDOFF-<phase-id>.md`
6. verify V64: case `dispatchplan complexity selection` → selection matrix + shared-file safety
7. verify V65: case `dispatchplan completion then acceptance review` → `## completion` block + dispatcher acceptance review; assert body ⊥ tell sub-agent to run `garnish` & ⊥ call `/review-code` mid-dispatch
8. verify V66: case `dispatchplan main baton refresh` → 4 refresh points
9. verify V67: case `dispatchplan names no harness agent` → ⊥ `sonnet-implementer`/`Explore`
10. verify V68: case `dispatchplan purges assignment handoffs` → root ⊥ ∃ `HANDOFF-*.md` @ close
11. **regression**: verify V58 (layout tree ∋ each `skills/` child once, ∋ `dispatchplan/`, ⊥ `review-implementation/`), V50, V51, V39 (NOTICE original-work ∋ `skills/dispatchplan/` + `skills/review-code/`) — ∵ F5/F6 mutate files F4 already verified
12. sweep F5/F6 for logic, complexity, reuse, coherence; cite findings
13. classify each §V61-V68 + V58/V50/V51/V39 HOLD/VIOLATE/UNVERIFIABLE with evidence
14. record final verification table in HANDOFF.md
15. update CHANGELOG.md `## [Unreleased]`
16. single summary commit
verify: `npm test` green; §V61-V68 HOLD; V58/V50/V51/V39 regression HOLD
exit: final verification table filled
next: /garnish (after F1-F4 also complete)
