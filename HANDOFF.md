# HANDOFF 2026-07-19

branch main | last commit e27f5c1 release: v0.4.1 | tests green
baseline green (187 pass, 0 fail) | oracle `npm test`
uncommitted: none — SPEC.md (§R29 + V77/V78 amended + V79/V80 + T77-T79 rescoped) + PLAN.md (rewritten) + this file land in the closing commit of this session

## done this session
cook: redirected in-flight plan → commit expansion moves into `caveman-commit`; SPEC §R29/V77-V80/T77-T79 updated

## in progress (exact stop point)
cook complete → PLAN.md + HANDOFF.md written; ⊥ implementation started
mid-edit files: none

## next
F1 per PLAN.md recommended sequence | preconditions: none
F1 = confirmation pass ∵ §R29 already sourced this session

## deviations & decisions
user ruled 2026-07-19: commit expansion ! live in `caveman-commit`, ⊥ `workonplan`/`handoff` templates; commit msg ⊥ caveman symbols, ⊥ plan ids (`F1`,`R123`,`V77`) ∵ "No one would understand F1, F2" → ∀ ref expand to single summary detail, human-targeted
∴ prior V77 (`feat(F2):` phase scope + named `§V` body) & V78 (`docs(handoff): <phase> complete → next <F<n>>`) mandated the OPPOSITE → both AMENDED, ⊥ appended (PLAN.md rewritten: y)
plan said V77/V78 = MANUAL oracle → now automatable ∵ §C test scope admits `skills/**` prose asserts (≠ doc prose); [MANUAL] tag dropped, F2 step 7 adds real cases
`caveman-commit` = vendored MIT `Modified: No` → user ask forces fork ∴ `NOTICE.md:56` row ! flip `Yes` (V80). ⊥ asked user ∵ instruction explicit; surfaced instead

## watchouts
- `caveman-commit` = VENDORED. AGENTS.md: "⊥ restyle. Keep upstream voice. Diff = only what `NOTICE.md` records." ∴ add rules only, ⊥ rewrite existing prose
- ban scope = GENERATED commit output ⊥ SKILL.md own prose. Its description ∋ `≤50 chars` (a symbol) & is legit ∴ ⊥ write a test grepping the whole file for symbols — V79 would false-fail
- V79 test ! assert rule PRESENCE (ban text + expansion section + example), ⊥ absence of symbols in file
- `tests/attribution.test.mjs:12-20` asserts NOTICE row EXISTS only; Modified column unasserted ∴ V80 needs a NEW case, ⊥ covered by V17
- F3 step 9 dogfoods the new rules — the closing commit itself ! be symbol-free & id-free
- ⊥ automated coverage for "is the expanded prose actually readable" — human judgement @ F3

## final verification
item|status|evidence|decision
-|-|-|-
