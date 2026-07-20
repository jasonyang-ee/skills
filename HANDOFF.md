# HANDOFF 2026-07-19

branch main | last commit 7ea04ee plan: make generated commit messages human-readable | tests green
baseline green (187 pass, 0 fail) | oracle `npm test`
uncommitted: none — SPEC.md (§R30-R32, V18+V57 retired, V77-V80 amended, V81-V85 added, T77-T79 amended, T80-T82 added) + PLAN.md (rewritten) + this file land in the closing commit of this session

## done this session
prep/cook: distilled 7-skill rename + `caveman` removal → 6-phase PLAN.md; SPEC updated; 2 user rulings captured

## in progress (exact stop point)
planning complete → PLAN.md + HANDOFF.md written; ⊥ implementation started
mid-edit files: none

## next
F1 per PLAN.md | preconditions: none
F1 = confirmation pass ∵ §R30-R32 already sourced this session. NEXT STEP: flip T77 `.`→`~` in SPEC.md, re-confirm §R30 chain order + §R31 semantic map, then start F2 `git mv skills/prep skills/setup`

## deviations & decisions
user ruled 2026-07-19 (a): encoding STYLE vocabulary renames too, ⊥ skills only. Baked SPEC header "Encoding caveman:" → "Encoding:", `AGENTS.md` `## Caveman symbols` → `## Encoding symbols`, "caveman-encoded" → neutral. ~137 refs beyond skill names. NOTE: baked header is stamped into CONSUMER repo SPEC.md files ∴ their headers drift until they re-run `/spec`
user ruled 2026-07-19 (b): rename lands BEFORE the pending commit-expansion work ∴ T78 re-pointed `caveman-commit`→`encode-commit`, executes @ F5 ⊥ F2
PLAN.md replaced ⊥ appended ∵ appending rename phases after F3-final-verify would break the verify-last contract. ⊥ task lost: T77/T78/T79 preserved & amended, now map to F1/F5/F6 (PLAN.md = short-lived state, SPEC §T = durable)
§T ids ⊥ in execution order: F1=T77, F2=T80, F3=T81, F4=T82, F5=T78, F6=T79 (ids monotonic by creation per §FORMAT, never renumbered)
V18 + V57 RETIRED ∵ both existed only to police the deleted `caveman` skill

## watchouts
- RENAME REUSES NAMES ACROSS DIFFERENT SKILLS. ⊥ sed blindly. `cook` today == planning → becomes `prep`; `workonplan` == execution → becomes `cook`. ∀ touched file ! re-read after sweep (§R31)
- order ! hold: `prep`→`setup`, THEN `cook`→`prep`, THEN `workonplan`→`cook`. Wrong order → double-shift, silent
- word boundaries ! : `prepare`/`prepares` ×10 ∈ repo would be corrupted by naive `prep` match; `-` = word boundary in grep ∴ bare `caveman` ALSO matches inside `caveman-encode`
- `NOTICE.md` = license-relevant & the single highest-risk file: cavekit-derived planning skill `cook`→`prep` while original-work `workonplan`→`cook` ∴ blind sed swaps vendored ↔ original provenance. HAND EDIT, verify @ F6 step 5
- `setup` token already ∃ @ `.github/workflows/*.yml` (`actions/setup-node`) + `.github/CONTRIBUTING.md` heading ∴ ⊥ write a test asserting zero `setup` occurrences
- V85 carve-out is the point of the bake, ⊥ decoration: terse review output ! still spell out Security findings, irreversible-action warnings, ∀ BLOCK item, `file:line` evidence, quoted errors (§R32)
- V79 test ! assert rule PRESENCE ⊥ absence of symbols in file — `encode-commit` description legitimately ∋ `≤50 chars`
- `tests/helpers.mjs` `loadSkills()` reads roster from disk ∴ most asserts auto-adapt; only `attribution.test.mjs:12-20` VENDORED + `LIVE_REF_FILES` are hardcoded
- SPEC internally inconsistent until F4 (§V rows still name old skills) — expected mid-plan, ⊥ a bug
- blast radius large (∀ skill dir + ∀ root doc + tests) → `/review-plan` before F2 = reasonable

## final verification
item|status|evidence|decision
-|-|-|-
