# HANDOFF 2026-07-16

branch main | last commit 3f55f51 feat: add dispatchplan for parallel phase execution (T61) | tests 191/191 green
baseline green @ 7d57653 (160/160) → now 191/191 (+31, ⊥ regression) | oracle `npm test` (Bash; `npm.cmd test` only when PowerShell wrapper policy blocks)
uncommitted: SPEC.md (T62 `x`), HANDOFF.md — land in F7 commit

## done this session
∀ 7 phases complete. T56-T62 ∀ `x`.
F1 research (T56): ∀ 10 §V targets + BLOCK confirmed; record-only → 7d3c158
F2 doc fixes (T57): README BLOCK + 5 drift fixes + `truth-workflow.md` rewrite + 8 tests → 46af784
F3 skill/test fixes (T58): prep support line + V53/V54 tests → 23879f2
F4 final verify (T59): §V51-V60 ∀ HOLD; 170/170 → a03a170
F5 rename (T60): `review-implementation` → `review-code`; ∀ live refs; +3 cases; 174/174 → d9dc4fb
F6 dispatchplan (T61): new skill (222 lines) + roster 13 + 7 cases + NOTICE own-work case; 191/191 → 3f55f51
F7 final verify (T62): §V61-V68 ∀ HOLD; V58/V50/V51/V39 regression HOLD → this commit

## in progress (exact stop point)
⊥ phase ~ | ⊥ phase remaining. NEXT STEP: `/garnish` — ∀ mapped §T `x` & final verification HOLD & ⊥ unrelated dirty files ∴ preconditions met. Will purge `PLAN.md` + `HANDOFF.md`, then `/review-code`

## next
`/garnish` (workflow step 5) | preconditions: met — user-triggered, ⊥ auto-run ∵ deletes durable-cycle working files

## deviations & decisions
F1 & F4 & F7 ⊥ CHANGELOG entry ∵ research|verification, ⊥ behavior change; F2/F3/F5/F6 entries cover cycle
V60 test = anti-regression anchor, ⊥ bites pre-fix ∵ §I already corrected (F1 finding). Other 7 F2 tests + V53 verified failing vs pre-fix content (stash oracle)
F5 CORRECTION 1: PLAN said "⊥ change body" but H1 = live self-ref → V61 binds → H1 → `# review-code`. Precedent `skills/review-plan/SKILL.md:16` (T42). PLAN.md F5 step 2 updated
F5 CORRECTION 2: PLAN step list omitted `SPEC.md §R.20` dead source path → repointed → `skills/review-code/SKILL.md` + pre-rename provenance note (V34 fidelity). PLAN.md step 10b added
F6: `§I:42-43` "13 skills" claim ⊥ stale now — 13 dirs ship ∴ review-plan NOTE resolved
user 2026-07-16: run F1 + ∀ remaining phases iteratively this session

## watchouts
- V9 denylist ∋ `V52` literal (`tests/repo-hygiene.test.mjs:21`) — ⊥ that token in `skills/**` body text
- V58 case + NOTICE own-work case + V61 live-ref case ∀ derive roster ← disk ∴ ∀ new/renamed skill ! update README tree + NOTICE `## Original work` | cases fail (by design, ⊥ silent)
- `tests/repo-hygiene.test.mjs` `WORKFLOW_STEPS` + `LIVE_REF_FILES` consts shared across cases — edit once, binds many
- README step name "Review the implementation" + `truth-workflow.md` `## 6.` heading = step names, ≠ skill name → ! stay despite F5 rename (V51)
- `review-implementation` legitimately remains: CHANGELOG ×3 (released entries), SPEC ×5 (V61 text, R20 provenance, T43/T47/T60 rows), tests ×6 (RETIRED_SKILLS + V61 assertions) — ⊥ "fix"
- NOTE (⊥ action this cycle): `skills/workonplan/SKILL.md` NON-GOALS "No sub-agents" ⊥ cross-point → `dispatchplan`. README/AGENTS/truth-workflow name both ∴ ⊥ discovery gap. Candidate for next `cook` if cross-pointing wanted (cf. V18 caveman↔caveman-encode precedent)
- `/garnish` next → purges `PLAN.md` + `HANDOFF.md`; ⊥ run before user asks

## final verification
item|status|evidence|decision
V51 truth-workflow 6 steps|HOLD|6 `## n. <name>` headings; ∀ 6 present in README + truth-workflow (F7 regression sweep); case `names all six workflow steps in truth-workflow.md`|-
V52 README step 2 discipline|HOLD|`README.md` step 2 ∋ "load the encoding automatically", "not a command you invoke"; case `describes Encode as an automatic discipline, not a command`|-
V53 prep support line|HOLD|`skills/prep/SKILL.md:84` ∋ `/caveman-commit`; case `lists every support skill in the generated support line` (verified failing pre-fix)|-
V54 cook incomplete-phase anchor|HOLD|`skills/cook/SKILL.md:53`; case `expands an in-flight plan rather than replacing it`|-
V55 README small-task path|HOLD|`/spec` → `/cook` → `/workonplan`; `rg '`/spec` → `/workonplan`'` → 0; case `routes the small-task path through cook before workonplan`|-
V56 CONTRIBUTING embedded format|HOLD|`rg 'FORMAT.md' CONTRIBUTING.md` → 0; points `skills/spec/SKILL.md` `## FORMAT`; case `points encoding guidance at the embedded spec format`|-
V57 README caveman modes|HOLD|row = "Two levels: full (default) and ultra"; ⊥ lite\|wenyan; case `lists the caveman modes the skill actually ships`|-
V58 README layout roster|HOLD|F7 regression: tree 13 entries == 13 disk dirs, ⊥ dup, ⊥ stray (post-F5 rename + post-F6 add); case `lists every shipped skill exactly once in the layout tree`|-
V59 README encoder loaders|HOLD|row ∋ `/review-plan`; case `credits every caveman-encode loader`|-
V60 §I oracle wording|HOLD|`§I` "exit 0 ⟺ automated §V tests pass; release/manual checks (e.g. V13) separate"; case `separates the automated oracle from release-only checks`|-
V61 review-code rename|HOLD|`skills/review-code/` ∃ (`name: review-code` + `# review-code` H1); `skills/review-implementation/` ⊥ ∃; ∀ live refs moved; cases `leaves no live reference to review-implementation`, `names itself review-code in frontmatter and title`, `preserves the old name where it is a historical record`|-
V62 dispatchplan front door|HOLD|`name: dispatchplan`; description ∋ sub-agent(3) dispatch(4) parallel(1); real CLI `skills add . --list` lists it; case `declares itself the parallel dispatch front door`|-
V63 dedicated handoff|HOLD|literal `HANDOFF-<phase-id>.md` ×8 @ repo root; case `gives every assignment its own dedicated handoff file`|-
V64 complexity selection + shared-file safety|HOLD|capability-tier table + `### Shared-file safety` (disjoint-only rule, lost-update rationale); case `selects sub-agents by complexity and never overlaps file sets`|-
V65 completion → acceptance review|HOLD|`## completion` block (status\|evidence\|tests) + dispatcher acceptance review per §R.23; ⊥ sub-agent `garnish` (§R.19), ⊥ `/review-code` mid-dispatch (§R.20); case `takes a completion block, then runs its own acceptance review`|-
V66 main baton refresh ×4|HOLD|before dispatch \| after sub-agent completion \| after acceptance review \| before stop; case `refreshes the main baton at all four points`|-
V67 ⊥ harness agent names|HOLD|`rg 'sonnet-implementer\|\bExplore\b' skills/dispatchplan/SKILL.md` → 0; selection in capability terms; case `names no harness-specific agent`|-
V68 purge assignment files|HOLD|purge-after-acceptance step + cycle-close rule; root `ls HANDOFF-*.md` → none; case `purges each assignment file once accepted`|-
V50 README six-step (F5/F6 regression)|HOLD|`## The six core workflow steps` + prep separation + order/gates mandatory intact after step-4 edit; case `separates prep bootstrap from the six core steps`|-
V39 NOTICE roster (F5/F6 regression)|HOLD|`## Original work` ∋ `skills/dispatchplan/` + `skills/review-code/`; NEW case `NOTICE.md names every non-vendored skill as original work` closes §R.22 silent-miss gap|-
V14 dispatchplan body|HOLD|222 lines ≤ 500|-
oracle|HOLD|`npm test` → 191/191 pass, 34 suites, 0 fail @ 3f55f51 (baseline 160 → +31, ⊥ regression)|-
drift|resolved|∀ T56-T62 `x`; F5/F6 corrections landed in PLAN.md same-commit; ⊥ silent deviation|-
sweep F5/F6 (logic/complexity/reuse/coherence)|HOLD|dispatchplan mirrors `workonplan` section shape (house pattern); ⊥ speculative abstraction; 3 roster cases derive ← disk ⊥ hardcoded list; NOTICE case reuses existing `VENDORED` const as complement; 1 NOTE recorded (workonplan ⊥ cross-points dispatchplan) — ⊥ defect, next-cook candidate|-
