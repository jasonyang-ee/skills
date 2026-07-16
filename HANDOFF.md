# HANDOFF 2026-07-16

branch main | last commit c1b35f2 docs: gpt reviewed plan | tests 160/160 green @ 2026-07-16
baseline `v0.2.0` = `1e6c322` ≠ `HEAD`; `v0.2.0..HEAD` = 3 docs-only commits (5fef766, b619997, c1b35f2) — ⊥ code drift
oracle `npm test` (green under Bash; `npm.cmd test` only when PowerShell wrapper policy blocks)
uncommitted: none @ review-plan #2 close (SPEC.md, PLAN.md, HANDOFF.md committed)

## done this session
review-implementation: v0.2.0 current-state sweep; baseline-to-HEAD diff empty → gate NO-GO (1 BLOCK)
cook #1: 1 BLOCK + 9 HARDEN accepted → plan expanded; SPEC.md updated w/ V51-V60 + T56-T59
cook #2: rename review-implementation→review-code + new dispatchplan skill → plan expanded w/ F5-F7; SPEC.md updated w/ V61-V66 + T60-T62
review-plan #1: local research resolved; SPEC.md R16-R18 added; F5/F6 contracts hardened; plan gate GO
review-plan #2: refuted F5/F6 → 5 BLOCK + 7 HARDEN; SPEC.md R19-R23 added, V63/V64/V65 rewritten, V67/V68 added, §I dispatchplan line fixed, T60/T61/T62 cites widened; PLAN F5/F6/F7 rewritten; gate GO

## in progress (exact stop point)
F1 not started | research resolved in review; NEXT STEP: run /workonplan F1 (or /dispatchplan F1) to record R16-R18, then F2

## next
F1 research (T56) | preconditions: none — PLAN.md + HANDOFF.md ∃
F1-F4: doc/test fixes (V51-V60) | F5: rename (T60) | F6: dispatchplan skill (T61, depends F5) | F7: final verify (T62, §V61-V68 + V58/V50/V51/V39 regression)

## deviations & decisions
latest tag `v0.2.0` = `1e6c322`; 3 docs-only commits sit between it and `HEAD` ∴ `review-code` baseline diff ⊥ empty but ⊥ code.
README `/spec` → `/workonplan` path violates `workonplan` PLAN precondition → F2 remediation required.
F5 depends on F4 (clean baseline); F6 depends on F5 — ⊥ parallel-safe: both mutate SPEC.md, README.md, AGENTS.md, tests/repo-hygiene.test.mjs, CHANGELOG.md. Run F5 → F6 sequentially.
user ruling 2026-07-16 (review-plan #2): sub-agent flags completion via `## completion` block in assigned handoff, ⊥ `garnish` (§R.19 — garnish needs ∀ §T `x` & deletes root baton). Main agent reviews each sub-agent via phase-scoped acceptance review reusing `workonplan` self-review contract (§R.23), ⊥ `/review-code` (§R.20, V47 — step 6, mandatory cook handoff rewrites executing PLAN.md).

## watchouts
- truth-workflow.md single informal line; upgrade = new content not edit of existing logic
- README step 2 "Encode" is writing discipline, not user-triggered `/encode`; `review-plan` also writes PLAN/HANDOFF
- README small-task path must include `cook` before `workonplan`
- prep template support line must remain within the backtick template block (line 84 of prep SKILL.md)
- `CONTRIBUTING.md` must point at embedded spec format; root `FORMAT.md` absent by design
- V9 private-ref denylist ∋ `V52` literal string — ⊥ use that exact token in skill body text
- F5 rename: CHANGELOG.md historical entries keep `review-implementation` (historical fact); only live refs update
- F5 rename: prep commandOrder test (repo-hygiene.test.mjs line 70) must change `/review-implementation` → `/review-code`
- F5 rename: V42 and V47 already updated in SPEC.md by cook #2 — do NOT re-apply in F5
- F6 dispatchplan: description must ∋ "sub-agent", "dispatch", "parallel" (V62 oracle); body ≤500 lines (V14)
- F6 dispatchplan: ⊥ vendor row in NOTICE.md — BUT ! add `skills/dispatchplan/` to NOTICE.md:94 "Original work" roster (V39; §R.22 ⊥ test-anchored → silent miss)
- F6 dispatchplan: CORRECTED — AGENTS.md ⊥ ∋ any sub-agent roster; `sonnet-implementer`/`Explore` = this harness only (§R.21). V67: ⊥ name them in skill body; express selection in capability/complexity terms (∵ `skills add` installs ⊥ agents → silent no-op elsewhere)
- review-plan F5: historical `§T` rows may retain `review-implementation`; live operational/docs refs must use `review-code`
- review-plan F5: README Layout tree (`README.md:153`) + NOTICE.md:94 are live refs — V58/V39. F5 step 6/7 covers; ⊥ skip
- review-plan F5: add `review-implementation` to `RETIRED_SKILLS` (repo-hygiene.test.mjs:23) — house pattern, precedent `review` (T42)
- review-plan F6: assignment file = literal `HANDOFF-<phase-id>.md` (V63; §I aligned) — ⊥ agent-id suffix. Main baton refreshes before dispatch, after completion, after acceptance review, before stop (V66)
- review-plan F6: purge every `HANDOFF-<phase-id>.md` after acceptance (V68) — else garnish blocks on unrelated dirty files | litters root (§R.19)
- review-plan F6: exact named tests required for V62-V68; one aggregate substring assertion insufficient
- review-plan F6/F7: F5+F6 mutate files F4 already verified → F7 ! re-verify V58, V50, V51, V39 as regression

## final verification
item|status|evidence|decision
research gate|HOLD|SPEC.md R16-R23; roster, preconditions, skill contracts, test patterns, target refs confirmed|-
baseline oracle|HOLD|`npm test` → 160/160 pass @ 2026-07-16 (Bash; `npm.cmd` only needed under PowerShell)|-
F5 contract|HOLD|PLAN.md F5 + V61/V58: live refs incl. README tree + NOTICE; historical `§T` labels allowed; RETIRED_SKILLS pattern reused|PLAN
F6 contract|HOLD|PLAN.md F6 + V63-V68: literal handoff name, capability-only selection, completion block, acceptance review, purge, NOTICE/tree/truth-workflow roster|PLAN
F7 regression|HOLD|PLAN.md F7 step 11 re-verifies V58/V50/V51/V39 after F5/F6 mutate F4-verified files|PLAN
research phases remaining|0|F1 resolved in review #1; R16-R23 landed|next `/cook` may remove F1

## review-plan verdict
research phases remaining: 0 (F1 resolved; removal candidate)
BLOCK: 5 — all fixed this round
- F6: sub-agent `garnish` unimplementable & destructive (§R.19 `skills/garnish/SKILL.md:22-31,48-49`) — V65 rewritten → `## completion` block; garnish stays cycle-close
- F6: `/review-code` per sub-agent inverts V47 order + mandatory cook handoff rewrites executing PLAN.md (§R.20 `skills/review-implementation/SKILL.md:21,29,105-118`) — V65 rewritten → dispatcher phase-scoped acceptance review (§R.23)
- F6: omitted NOTICE.md though T61 cites V39; own-skill roster ⊥ test-anchored (§R.22) — F6 step 4 + test added
- F5/F6: omitted README Layout tree (V58) and F7 never re-verified it — F5 step 6, F6 step 2, F7 step 11 added
- F6: inputs claimed AGENTS.md lists `sonnet-implementer`/`Explore` — false (§R.21); harness-only names → silent no-op elsewhere — V67 + test added
HARDEN: 7
- F6 depended F4 and HANDOFF called F5/F6 "parallel-safe" — false; 5 shared files → F6 depends F5
- V63 vs §I filename contradiction (`-<agent-id>` suffix) — settled on literal `HANDOFF-<phase-id>.md`
- assignment handoffs never purged → garnish blocks | litters root — V68 added
- F6 "flip §T T61 via spec" — removed; `workonplan:73,95` owns §T flips
- F6 "retain CLI discovery assertion for 13 skills" — no count assertion exists (§R.18); reworded
- F6 omitted truth-workflow.md + README six-step step 4 though §I/V47 name `workonplan`|`dispatchplan` — steps added
- F6 "add row to skill table" ambiguous across 3 README tables — named Session continuity
NOTE: §I:42-43 claims 13 skills while 12 exist; resolves at F6, no count oracle. F1 removal candidate on next `/cook`.
gate: GO
next: `/workonplan F1`; F5 → F6 sequential (⊥ parallel). Rerun `/review-plan` only if plan changes or implementation reveals contradiction
