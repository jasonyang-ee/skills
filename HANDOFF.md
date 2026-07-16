# HANDOFF 2026-07-16

branch main | last commit 7d3c158 docs: close F1 research phase (T56) | tests 160/160 green
baseline green @ 7d57653 | oracle `npm test` (Bash; `npm.cmd test` only when PowerShell wrapper policy blocks)
uncommitted: none

## done this session
F1 research (T56): ∀ 10 §V targets + 1 BLOCK confirmed vs working tree; R16-R18 already ∃ ∴ record-only → 7d3c158

## in progress (exact stop point)
⊥ phase ~ | NEXT STEP: F2 step 1 — rewrite `truth-workflow.md` → 6-step structured doc (step names = Cook/Encode/Review the plan/Work on the plan/Garnish/Review the implementation)
mid-edit files: none

## next
F2 doc fixes (T57) | preconditions: F1 `x` — met
then F3 (T58) → F4 (T59) → F5 (T60) → F6 (T61, depends F5) → F7 (T62)

## deviations & decisions
F1 = record-only ∵ research resolved @ review-plan #1; ⊥ CHANGELOG entry (research ≠ feature|fix) — PLAN.md F1 note already predicted removal-candidate status
user 2026-07-16: run F1 + ∀ remaining phases iteratively this session

## F1 confirmed targets (⊥ re-derive)
V51|`truth-workflow.md` = 1 line prose, ⊥ structure; ends w/ `review-implementation`
V52|`README.md:64-66` step 2 "write every `PLAN.md` and `HANDOFF.md` update with `caveman-encode`" → implies user action
V53|`skills/prep/SKILL.md:84` `support: /spec … | /handoff … | /caveman-encode …` — ⊥ `/caveman-commit`
V54|`skills/cook/SKILL.md:53` ∋ "incomplete phases" — assert target ∃
V55|`README.md:125-126` "go straight to `/spec` → `/workonplan`" = BLOCK
V56|`CONTRIBUTING.md:63` "`SPEC.md` and `FORMAT.md` use [caveman encoding](FORMAT.md)"
V57|`README.md:85` claims `lite`+`wenyan`; `skills/caveman/SKILL.md:5-6,41-42` = `full`+`ultra` only
V58|`README.md:150-151` `caveman-encode/` ×2; 12 real dirs vs 13 tree entries
V59|`README.md:86` loaders = `/spec`,`/cook`,`/handoff`,`/workonplan` — ⊥ `review-plan` (which loads encode @ `skills/review-plan/SKILL.md:32` & writes both files)
V60|`SPEC.md §I:62` ALREADY corrected ("release/manual checks (e.g. V13) separate") → F2 step 6 = preserve + test only

## watchouts
- V9 denylist ∋ `V52` literal (`tests/repo-hygiene.test.mjs:21`) — ⊥ that token in `skills/**` body text
- truth-workflow.md upgrade = new content, ⊥ edit of existing logic
- README step 2 "Encode" = writing discipline, ⊥ user-triggered `/encode`
- prep support line ! stay inside backtick template block (`skills/prep/SKILL.md:84`)
- `CONTRIBUTING.md` ! point at embedded spec format; root `FORMAT.md` absent by design
- F5 rename: CHANGELOG historical entries keep `review-implementation`; only live refs update
- F5 rename: `tests/repo-hygiene.test.mjs` commandOrder[5] (`:70`), readFileSync (`:215`), garnish assert (`:249`); add `review-implementation` → `RETIRED_SKILLS` (`:23`)
- F5 rename: V42/V47 already updated by cook #2 — ⊥ re-apply
- F5/F6: README Layout tree (`:153`) + `NOTICE.md:94` are live refs (V58/V39) — ⊥ skip
- F6: description ∋ "sub-agent"+"dispatch"+"parallel" (V62); body ≤500 lines (V14)
- F6: V67 — ⊥ name harness agents; capability terms only (§R.21)
- F6: `NOTICE.md:94` own-work roster ⊥ test-anchored (§R.22) → silent miss
- F6: assignment file = literal `HANDOFF-<phase-id>.md` (V63); purge ∀ after acceptance (V68)
- F5 → F6 sequential; 5 shared files ∴ ⊥ parallel
- F7 ! re-verify V58/V50/V51/V39 as regression ∵ F5/F6 mutate F4-verified files

## final verification
item|status|evidence|decision
F1 targets|HOLD|this file §F1 confirmed targets; ∀ 10 §V + BLOCK located|-
baseline oracle|HOLD|`npm test` → 160/160 pass @ 7d57653|-
research phases remaining|0|R16-R23 ∃ in SPEC.md; F1 introduced ⊥ new unknowns|-
F2-F7 §V|-|pending|-
