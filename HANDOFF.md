# HANDOFF 2026-07-16

branch main | last commit 23879f2 docs: complete prep support roster, anchor cook contract (T58) | tests 170/170 green
baseline green @ 7d57653 (160/160) | oracle `npm test` (Bash; `npm.cmd test` only when PowerShell wrapper policy blocks)
uncommitted: SPEC.md (T59 `~`), HANDOFF.md — land in F4 commit

## done this session
F1 research (T56): ∀ 10 §V targets + 1 BLOCK confirmed; R16-R18 already ∃ ∴ record-only → 7d3c158
F2 doc fixes (T57): README BLOCK + 5 drift fixes + `truth-workflow.md` rewrite + 8 named tests → 46af784
F3 skill/test fixes (T58): prep support line + V53/V54 tests → 23879f2
F4 final verify (T59): §V51-V60 ∀ HOLD; 160→170 tests, ⊥ regression → this commit

## in progress (exact stop point)
⊥ phase ~ | NEXT STEP: F5 step 1 — `git mv skills/review-implementation skills/review-code`
mid-edit files: none

## next
F5 rename (T60) | preconditions: F4 `x` — met
then F6 (T61, depends F5 — 5 shared files ∴ ⊥ parallel) → F7 (T62)

## deviations & decisions
F1 = record-only ∵ research resolved @ review-plan #1; ⊥ CHANGELOG entry (research ≠ feature|fix)
F4 ⊥ CHANGELOG entry ∵ verification-only, ⊥ behavior change; F2/F3 entries cover cycle
V60 test = anti-regression anchor, ⊥ bites pre-fix ∵ `SPEC.md §I:62` already corrected by cook/spec (F1 finding). Other 7 F2 tests verified failing vs pre-fix docs (stash oracle); V53 verified failing vs pre-fix prep
`CONTRIBUTING.md` ⊥ ∋ token `FORMAT.md` at all (⊥ merely unlinked) → V56 testable as clean absence
user 2026-07-16: run F1 + ∀ remaining phases iteratively this session

## watchouts
- V9 denylist ∋ `V52` literal (`tests/repo-hygiene.test.mjs:21`) — ⊥ that token in `skills/**` body text
- `tests/repo-hygiene.test.mjs` `WORKFLOW_STEPS` const shared by README + truth-workflow cases — edit once, binds both
- V58 case derives roster ← `loadSkills()` ∴ F5 rename & F6 add ! update README tree | case fails (by design)
- `skills/prep/SKILL.md:82` template step 6 still `/review-implementation` → F5 step 4 covers
- F5 rename: CHANGELOG historical entries keep `review-implementation`; only live refs update
- F5 rename: `tests/repo-hygiene.test.mjs` commandOrder[5], readFileSync path, garnish assert; add `review-implementation` → `RETIRED_SKILLS`; ⊥ trust old line numbers — F2/F3 shifted file (+~100 lines)
- F5 rename: V42/V47 already updated by cook #2 — ⊥ re-apply
- F5/F6: README Layout tree + `NOTICE.md:94` are live refs (V58/V39) — ⊥ skip
- F5: README step name "Review the implementation" (`:73`) + `truth-workflow.md` `## 6.` heading ! stay (V51 case asserts both)
- F6: description ∋ "sub-agent"+"dispatch"+"parallel" (V62); body ≤500 lines (V14)
- F6: V67 — ⊥ name harness agents; capability terms only (§R.21)
- F6: `NOTICE.md:94` own-work roster ⊥ test-anchored (§R.22) → silent miss
- F6: assignment file = literal `HANDOFF-<phase-id>.md` (V63); purge ∀ after acceptance (V68)
- F7 ! re-verify V58/V50/V51/V39 as regression ∵ F5/F6 mutate F4-verified files

## final verification
item|status|evidence|decision
V51 truth-workflow 6 steps|HOLD|`truth-workflow.md` 6 `## n. <name>` headings match README; case `names all six workflow steps in truth-workflow.md`|-
V52 README step 2 discipline|HOLD|`README.md:64-67` ∋ "load the encoding automatically", "not a command you invoke"; case `describes Encode as an automatic discipline, not a command`|-
V53 prep support line|HOLD|`skills/prep/SKILL.md:84` ∋ `/caveman-commit`; case `lists every support skill in the generated support line` (fails vs pre-fix prep)|-
V54 cook incomplete-phase anchor|HOLD|`skills/cook/SKILL.md:53`; case `expands an in-flight plan rather than replacing it`|-
V55 README small-task path|HOLD|`README.md:126-129` `/spec` → `/cook` → `/workonplan`; `rg '`/spec` → `/workonplan`'` → 0; case `routes the small-task path through cook before workonplan`|-
V56 CONTRIBUTING embedded format|HOLD|`rg 'FORMAT.md' CONTRIBUTING.md` → 0; points at `skills/spec/SKILL.md` `## FORMAT`; case `points encoding guidance at the embedded spec format`|-
V57 README caveman modes|HOLD|`README.md:86` "Two levels: full (default) and ultra"; ⊥ lite\|wenyan; case `lists the caveman modes the skill actually ships`|-
V58 README layout roster|HOLD|tree = 12 dirs ×1 each, ⊥ strays; case `lists every shipped skill exactly once in the layout tree` (roster ← `loadSkills()`)|-
V59 README encoder loaders|HOLD|`README.md:87` ∋ `/review-plan`; case `credits every caveman-encode loader`|-
V60 §I oracle wording|HOLD|`SPEC.md §I:62` "exit 0 ⟺ automated §V tests pass; release/manual checks (e.g. V13) separate"; case `separates the automated oracle from release-only checks`|-
oracle|HOLD|`npm test` → 170/170 pass, 30 suites, 0 fail @ 23879f2 (baseline 160 + 10 new)|-
drift|resolved|10 F2/F3 tests anchor ∀ fixed line; 8 of 10 verified failing vs pre-fix content|-
§V61-V68|-|pending F5/F6/F7|-
