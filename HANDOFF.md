# HANDOFF 2026-07-19

branch main | last commit 09f231c chore: close the rename and commit-message cycle | tests green
green (189 pass, 0 fail) | oracle `npm test`
uncommitted: `SPEC.md` (§V86-V93, §T83-T90) + `PLAN.md` + this file — land in the closing commit of this planning session

## done this session
prev cycle closed via `/garnish` (T77-T82 `x`, PLAN+HANDOFF purged, §C line-endings + §B.6 landed)
prep/cook: distilled 8-phase PLAN.md for merge + emoji purge + garnish prune + test cut; 2 user rulings captured; ⊥ implementation started

## in progress (exact stop point)
planning complete → PLAN.md + HANDOFF.md written. mid-edit files: none

## next
F1 per PLAN.md | preconditions: none
NEXT STEP: flip T83 `.`→`~`, full-read BOTH `skills/encode-docs/SKILL.md` (128L) + `skills/spec/SKILL.md` (250L), build OVERLAP/UNIQUE maps, prove merged body < 500 lines (V14)

## deviations & decisions
user ruled 2026-07-19 (c): merged skill KEEPS name `encode-docs`. `/spec` ⊥ resolves after merge. ∴ `encode-docs` description ! carry BOTH skills' trigger keywords else `/spec` muscle-memory lands nowhere
user ruled 2026-07-19 (d): stale §V/§T → HARD-DELETE row, ⊥ `RETIRED` tombstone, ids ⊥ EVER reused. ∴ max-id scan ⊥ valid as id source → baked header gains `next: V<n> T<n> B<n>` counter (V89). Existing V18+V57 tombstones become prune candidates @ F6
V90 prune is EVIDENCE-GATED by design: user goal = context cut, ⊥ spec cull. Uncertain row → keep & report
emoji ban is retroactive & self-inflicted: ❌/✅ ∈ `encode-commit` were added by T78 LAST cycle ∴ F5 undoes own work

## watchouts
- ⚠ MSYS `sed`/`grep` STRIP CR ON READ (§B.6). `skills/encode-commit/` + `skills/encode-pr/` = CRLF, ∀ other = LF. ⊥ `sed -i` on those 2 — Edit tool only. Detect w/ `tr -dc '\r' | wc -c`, ⊥ `grep -q $'\r'` (CR-blind here)
- `spec` has 3 SENSES ∈ repo & only 2 rename: skill name → `encode-docs`; `/spec` command → `/encode-docs`; FILENAME `SPEC.md` → UNCHANGED. Blind `\bspec\b` sweep corrupts `SPEC.md` refs & the word "spec" in prose ("spec-driven", "Agent Skills spec") — those stay
- V14 500-line cap vs 128+250 raw merge ∴ dedupe (spec §ENCODING ≈ encode-docs §GRAMMAR+§SYMBOLS) is REQUIRED ⊥ optional. Confirm budget @ F1 step 2 BEFORE writing F2
- `NOTICE.md` = license-relevant: merged `encode-docs` derives from 2 cavekit skills (`caveman` + `spec`) ∴ row ! credit BOTH. HAND EDIT, verify @ F8 step 5
- `encode-pr` severity 🔴🟡🔵 = FUNCTIONAL signal ⊥ decoration → text labels (`bug`/`risk`/`nit`), ⊥ deletion
- emoji guard ! match codepoint RANGE ⊥ enumerated list (else the next new emoji slips through)
- F7 cut ! not silently unguard a §V. F1 step 5 builds the oracle-loss map FIRST; ∀ affected §V → MANUAL | hard-deleted per V90
- SPEC §G/§C/§I + V20/V45/V54 still name `spec` skill until F4 — expected mid-plan, ⊥ a bug
- test count 189: `skill-contract` 86 is the single biggest block (7 it × 12 skills). Collapsing that loop alone gets most of the way to < 50
- blast radius large (∀ skill + ∀ root doc + ∀ test file) → `/review-plan` before F2 = reasonable

## final verification
item|status|evidence|decision
-|-|-|-
