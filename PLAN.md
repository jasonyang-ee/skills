# PLAN

goal: rename 7 skills to the culinary/encode vocabulary, delete `caveman` (bake its discipline into the 2 review skills), then land human-readable commit rules in `encode-commit`

## rename map
old|new|meaning
`prep`|`setup`|bootstrap repo guidance
`cook`|`prep`|planning (PLAN.md + HANDOFF.md)
`workonplan`|`cook`|sequential execution
`dispatchplan`|`cater`|parallel execution
`caveman-encode`|`encode-docs`|SPEC/PLAN/HANDOFF encoding
`caveman-commit`|`encode-commit`|commit messages
`caveman-pr`|`encode-pr`|PR review comments
`caveman`|DELETED|→ `review-plan` + `review-code` report discipline

## ground rules
- ! rename by MEANING ⊥ by string (§R31). Names are REUSED across different skills ∴ ∀ existing ref ! be re-pointed to what it MEANT, then verified by re-reading
- sequential order ! hold (§R30): `prep`→`setup`, THEN `cook`→`prep`, THEN `workonplan`→`cook`. ∀ target vacated before filled
- ! word-boundary match. `prepare`/`prepares` ×10 ∈ repo & `-` = word boundary ∴ bare `caveman` matches `caveman-encode` substring
- `git mv` ∀ dir rename (preserve history as rename ⊥ delete+add)
- `NOTICE.md` = license-relevant ∴ edit BY HAND, ⊥ sed. Provenance swaps sides: cavekit-derived planning skill `cook`→`prep`, while original-work `workonplan`→`cook` (§R31)
- user ruled: encoding STYLE vocabulary renames too (baked SPEC header, `## Caveman symbols`, "caveman-encoded")
- quality > speed; ⊥ skip verification step; `spec` = sole SPEC.md mutator
- ⊥ push ⊥ tag without explicit user ask

## existing assets
- 13 skill dirs; `tests/helpers.mjs` `loadSkills()` derives roster from disk ∴ most asserts auto-adapt (§R30)
- hardcoded lists ! hand-edit: `tests/attribution.test.mjs:12-20` VENDORED, `tests/repo-hygiene.test.mjs:41` LIVE_REF_FILES
- `tests/repo-hygiene.test.mjs:186-195` `review-implementation` stale-name guard = reusable pattern ∀ V82
- 25 §V rows name renamed skill paths; roster claim `13` @ `README.md:16`, `AGENTS.md:6`, §I ×2
- `skills/caveman/SKILL.md:20-35` §Rules + §Persistence = bake source; `:52-61` §Auto-Clarity = carve-out (§R32)
- §R29 (commit-expansion findings, already sourced), §R30 (rename mechanics), §R31 (semantic trap), §R32 (bake targets)
- `npm test` oracle, 187 pass @ baseline; `CHANGELOG.md` `## [Unreleased]` empty

## phase order
id|goal|depends|exit
F1|research: rename safety, semantic map, bake targets|-|§R30-R32 logged
F2|rename 7 dirs + frontmatter + intra-skill refs|F1|12 dirs correct, npm test green
F3|delete caveman, bake discipline into 2 review skills|F2|V84 V85 hold
F4|sweep repo surface: SPEC, docs, NOTICE, tests|F3|⊥ stale name, roster 12
F5|commit rules → encode-commit|F4|V77-V80 hold
F6|final verify|F5|∀ §V HOLD, suite green

## F1 research
task: T77
goal: confirm rename is mechanically safe & semantically re-pointable; ⊥ unknowns before first `git mv`
inputs: `git grep -o -w` counts, `tests/helpers.mjs`, `tests/attribution.test.mjs`, `NOTICE.md`, `skills/caveman/SKILL.md`
steps:
1. confirm chain order vacates each target before filling (§R30)
2. enumerate substring hazards: `prepare*`, bare `caveman` matching `caveman-*`, pre-existing `setup` tokens
3. build semantic re-point map: ∀ ref to `cook` == planning → `prep`; ∀ ref to `workonplan` == execution → `cook` (§R31)
4. confirm `NOTICE.md` provenance swap risk & mark hand-edit only
5. extract `caveman` §Rules + §Persistence + §Auto-Clarity carve-out (§R32)
6. §T T77 → `~`; findings → §R30, R31, R32 via `spec`
verify: §R30-R32 sourced; ⊥ open `?`; rename map covers ∀ 7 + deletion
exit: mechanics + meaning map confirmed
next: F2

## F2 rename
task: T80
goal: 7 dirs renamed, frontmatter matches parent dir, intra-skill cross-refs re-pointed by meaning
inputs: F1 map; V4, V81, V82, V83
files: `skills/**` (all 13 dirs)
steps:
1. flip T77 → `x`; T80 → `~`
2. `git mv` in exact order: `prep`→`setup`, `cook`→`prep`, `workonplan`→`cook`, `dispatchplan`→`cater`, `caveman-encode`→`encode-docs`, `caveman-commit`→`encode-commit`, `caveman-pr`→`encode-pr`
3. update `name:` frontmatter in each renamed SKILL.md → == parent dir (V4)
4. sweep intra-skill cross-refs & slash commands (`/cook`, `/workonplan`, `/prep`, `/dispatchplan`) word-boundary, in §R30 order
5. re-read EVERY touched SKILL.md — confirm meaning preserved, esp. `review-code` "invokes cook" → `prep` (planning) & `review-plan` "hand to workonplan" → `cook` (execution) & `garnish` predecessor ref
6. run `npm test` — V4/V5/V7 + CLI discovery (V8) prove dir/name coherence
verify: `npm test` exit 0; `skills/` == 13 dirs (caveman still present until F3); ⊥ old name ∈ `skills/**`
exit: rename landed, roster coherent
next: F3

## F3 delete caveman + bake discipline
task: T81
goal: `skills/caveman/` gone; its Rules+Persistence live as report-output discipline in `review-plan` + `review-code` ONLY
inputs: §R32; V84, V85
files: `skills/caveman/` (delete), `skills/review-plan/SKILL.md`, `skills/review-code/SKILL.md`
steps:
1. flip T80 → `x`; T81 → `~`
2. `git rm -r skills/caveman/`
3. add report-output discipline section to BOTH review skills: always-on ∀ report; drop articles/filler/pleasantries/hedging; ⊥ tool-call narration; ⊥ decorative tables/emoji; ⊥ invented abbreviations (`cfg`/`impl`/`req` — tokenizer splits same as full word ∴ zero saving); ⊥ causal arrows in report prose; ⊥ restate evidence already in the gate block
4. ! carve-out (§R32): Security findings, irreversible-action warnings, & ∀ BLOCK item stay explicit uncompressed prose. Terse style ⊥ apply to `file:line` evidence, quoted errors, code
5. keep each skill's existing gate block shape intact — discipline governs surrounding prose ⊥ the contract
6. confirm ⊥ other skill gained the discipline (V84)
verify: `npm test` exit 0; 12 dirs; V84+V85 asserted by new test cases
exit: caveman retired, discipline lives in exactly 2 skills
next: F4

## F4 repo surface sweep
task: T82
goal: ⊥ stale skill name anywhere live; roster claims say 12; NOTICE provenance correct
inputs: V81, V82, V83; §R30, §R31
files: `SPEC.md`, `README.md`, `AGENTS.md`, `NOTICE.md`, `.github/CONTRIBUTING.md`, `tests/*.mjs`, `CHANGELOG.md`
steps:
1. flip T81 → `x`; T82 → `~`
2. SPEC via `spec`: sweep §G, §C, §I, §V skill paths (25 rows) + encoding-style vocabulary (baked header "Encoding caveman:" → "Encoding:"); retire V18 + V57; §I roster line + command graph → new names; `13`→`12` ×2
3. `README.md`: roster table, layout tree, six-step narrative, credits, `13`→`12`; drop caveman row
4. `AGENTS.md`: skill list, `## Caveman symbols` → `## Encoding symbols`, command list, support line, `13`→`12`
5. `NOTICE.md` BY HAND (§R31): vendored rows → `encode-docs`/`encode-commit`/`encode-pr`/`prep`; remove `skills/caveman/` row (⊥ shipped ∴ ⊥ notice obligation); Original work roster → `cook`, `cater`, `setup`, `handoff`, `review-code`, `garnish`
6. `.github/CONTRIBUTING.md` refs
7. tests: `attribution.test.mjs` VENDORED list (drop `caveman`, rename 4); add V81 roster case, V82 stale-name guard (mirror `review-implementation` pattern @ `:186-195`), V84 + V85 cases
8. `setup` skill's own generated AGENTS.md template → new 7 command names
9. `CHANGELOG.md` `## [Unreleased]` — rename + removal, human-facing
verify: `npm test` exit 0; V82 guard red before fix, green after; ⊥ `git grep -w` hit for any old name outside `CHANGELOG.md` + historical §T/§B/§R
exit: surface coherent, roster 12
next: F5

## F5 commit rules → encode-commit
task: T78
goal: human-readable commit rules land in `encode-commit`; `cook` + `handoff` delegate
inputs: §R29; V77, V78, V79, V80
files: `skills/encode-commit/SKILL.md`, `skills/cook/SKILL.md`, `skills/handoff/SKILL.md`, `NOTICE.md`, `tests/*.mjs`
steps:
1. flip T82 → `x`; T78 → `~`
2. `encode-commit` `## What NEVER goes in` — add: ⊥ encoding symbols (`→ ∴ ∀ ⊥ ∃ §`), write the English word; ⊥ plan/spec ids (`F1`, `T77`, `V77`, `R28`, `B5`) as carrier of meaning
3. `encode-commit` — add `## Expanding plan references`: git reader ⊥ has plan files ∴ ∀ id → what it stands for; ≥1 before/after example; keep upstream terse voice
4. `skills/cook/SKILL.md` step 6 — invoke `encode-commit`; scope = touched component ⊥ phase id; body names changed paths + verification, plain English
5. `skills/handoff/SKILL.md` rule 8 — invoke `encode-commit`; body = phase closed + next step + test state, ⊥ phase ids
6. `NOTICE.md` `skills/encode-commit/` Modified → `Yes — renamed from caveman-commit; added rules barring encoding symbols and plan identifiers from generated messages`
7. tests: V79 (rule PRESENCE ⊥ symbol absence), V77, V78, V80
8. read FULL `git diff`; run `npm test`
verify: `npm test` exit 0; V77-V80 asserted
exit: commit rules land once, delegation wired
next: F6

## F6 final verify
task: T79
goal: §V77-V85 HOLD; suite green; ⊥ drift
inputs: F2-F5 diffs; SPEC §V77-V85; §R29-R32
steps:
1. flip T78 → `x`; T79 → `~`
2. classify V77, V78, V79, V80, V81, V82, V83, V84, V85 each HOLD|VIOLATE|UNVERIFIABLE + cite test/file
3. regression sweep: V4, V5, V6, V7, V8, V9, V14, V17, V24-V27, V30, V36-V38, V42, V47, V61-V70, V72-V75 — ⊥ broken by rename
4. manual doc §V oracle: V50, V52, V55, V56, V58, V59, V60 (§C — `npm test` ⊥ proves these)
5. re-read `NOTICE.md` by hand — provenance correct per §R31, ⊥ vendored/original swap
6. `npm test` full — record output verbatim
7. commit via `encode-commit` (dogfood: ⊥ symbols, ⊥ plan ids in message)
8. flip T79 → `x`; commit SPEC.md
verify: `npm test` exit 0; ∀ §V77-V85 HOLD; result table → `HANDOFF.md`
exit: committed, green, drift resolved
next: - (→ `/garnish`)
