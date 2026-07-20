# HANDOFF 2026-07-19

branch main | last commit b1b6552 feat(review): retire the caveman skill into the two review skills | tests green
green (179 pass, 0 fail) | oracle `npm test` | baseline was 187 pre-rename
uncommitted: none

## done this session
F1 (T77 `x`) confirmation pass: §R30-R32 re-verified against live repo. Chain order safe, `cater`/`encode-*` vacant outside plan docs, `prepare*` ×16 & `setup` ×4 hazards confirmed, NOTICE provenance swap confirmed, bake source extracted
F2 (T80 `x`) rename landed: 7 `git mv` in §R30 order, frontmatter `name:` == parent dir ∀ 12, intra-skill cross-refs re-pointed by meaning, tests + NOTICE.md path renames folded in
F3 (T81 `x`) `skills/caveman/` deleted, 12 dirs; discipline baked into `review-plan` §REPORT OUTPUT + `review-code` §Report output (heading case per each file's house style); 4 new cases, both guards proven red-when-broken

## in progress (exact stop point)
F4 (T82 `~`) ⊥ started. mid-edit files: none

## next
F4 per PLAN.md | preconditions: none
NEXT STEP: SPEC sweep via `spec` — §G/§C/§I/§V skill paths (25 rows) + baked header "Encoding caveman:" → "Encoding:", roster `13`→`12` ×2. THEN `README.md`, `AGENTS.md`, `NOTICE.md` (by hand), `.github/CONTRIBUTING.md`, `setup` AGENTS template

## deviations & decisions
DEVIATION (F2): PLAN.md assigns ∀ test edits to F4 step 7, but F2 exit contract = `npm test` green. Mechanical rename of hardcoded skill paths ∈ `tests/*.mjs` + `NOTICE.md` folded into F2 ∵ rename ⊥ leave suite green without them
DEVIATION (F3): same boundary. VENDORED-list `caveman` removal + V18 collision-case removal + V84/V85 cases landed @ F3 ∵ deleting the skill ⊥ leave suite green otherwise. F4 RETAINS: V81 roster case, V82 stale-name guard, roster `13`→`12`, NOTICE caveman-row removal, SPEC/README/AGENTS/CONTRIBUTING sweep. `encode-commit` Modified flip stays @ F5
`skills/caveman/SKILL.md` + `skills/encode-pr/SKILL.md` + `skills/encode-commit/SKILL.md` = CRLF ∈ repo (vendored caveman-repo). ∀ other file = LF. Verified byte-exact vs HEAD post-commit

## watchouts
- ⚠ MSYS `sed` STRIPS CR ON READ ∴ `sed -i` on a CRLF file silently rewrites whole file → 2592-line phantom diff. ⊥ use `sed -i` on `skills/caveman/`, `skills/encode-pr/`, `skills/encode-commit/`. Use Edit tool. `grep -q $'\r'` ALSO CR-blind here ∴ ⊥ trust it to detect line endings — use `tr -dc '\r' | wc -c`
- frontmatter `name:` ! be set AFTER the cross-ref sweep, ⊥ before: pass 2 (`cook`→`prep`) double-shifted `name: cook` → `name: prep` @ `skills/cook/SKILL.md`. Caught & repaired, but same trap ∀ future rename
- `tests/repo-hygiene.test.mjs` V48 trigger string now reads `prepare a new project for prep` — mechanically correct per V83 (the `cook` there meant planning) but awkward English. V48 § still names `skills/prep/SKILL.md` + old trigger ∴ F4 ! reconcile. ? consider rewording trigger → needs spec amend, ⊥ silent
- `git diff --stat` shows `cook`/`prep`/`setup`/`workonplan` as huge same-path content swaps — inherent to rename chain reusing paths, ⊥ damage. Tree state verified correct
- `NOTICE.md` = license-relevant. F2 landed path renames only. F4 ! remove `skills/caveman/` row (⊥ shipped ∴ ⊥ notice obligation) + flip `skills/encode-commit/` Modified → `Yes` @ F5
- SPEC internally inconsistent until F4 (§V rows still name old skills) — expected mid-plan, ⊥ a bug
- V85 carve-out is the point of the bake, ⊥ decoration: terse review output ! still spell out Security findings, irreversible-action warnings, ∀ BLOCK item, `file:line` evidence, quoted errors (§R32)
- V79 test ! assert rule PRESENCE ⊥ absence of symbols in file — `encode-commit` description legitimately ∋ `≤50 chars`

## final verification
item|status|evidence|decision
-|-|-|-
