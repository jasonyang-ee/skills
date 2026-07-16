# HANDOFF 2026-07-16

branch main | last commit 1e6c322 release: v0.2.0 | tests 160/160 green
baseline `v0.2.0` = `HEAD` green | oracle `npm.cmd test` (`npm test` wrapper blocked by PowerShell policy)
uncommitted: AGENTS.md (pre-existing), SPEC.md, PLAN.md, HANDOFF.md (cook output; not committed)

## done this session
review-implementation: v0.2.0 current-state sweep; baseline-to-HEAD diff empty → gate NO-GO (1 BLOCK)
cook #1: 1 BLOCK + 9 HARDEN accepted → plan expanded; SPEC.md updated w/ V51-V60 + T56-T59
cook #2: rename review-implementation→review-code + new dispatchplan skill → plan expanded w/ F5-F7; SPEC.md updated w/ V61-V66 + T60-T62

## in progress (exact stop point)
F1 not started | NEXT STEP: run /workonplan F1 (or /dispatchplan F1) in cold session

## next
F1 research (T56) | preconditions: none — PLAN.md + HANDOFF.md ∃
F1-F4: doc/test fixes (V51-V60) | F5: rename (T60) | F6: dispatchplan skill (T61) | F7: final verify (T62)

## deviations & decisions
latest tag `v0.2.0` points at `HEAD`; prior v0.1.0→v0.2.0 review context superseded by this baseline.
README `/spec` → `/workonplan` path violates `workonplan` PLAN precondition → F2 remediation required.
F5 depends on F4 (clean baseline); F6 depends on F4; F5 & F6 independent of each other (parallel-safe).

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
- F6 dispatchplan: ⊥ vendor — own skill; NOTICE.md needs no new row
- F6 dispatchplan: sub-agents referenced (sonnet-implementer, Explore) exist in consumer AGENTS.md — reference by name only, ⊥ hardcode paths

## final verification
item|status|evidence|decision
-|-|-|-
