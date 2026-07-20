<!-- HANDOFF FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Session baton. Overwritten in full ∀ session. Records STATE, ⊥ intent (intent → PLAN.md, truth → SPEC.md).
Sections: header line | done this session | in progress (exact stop point) | next | deviations & decisions | watchouts | final verification
Header ! carry: branch | last commit | tests | baseline + oracle command | uncommitted files + why
"in progress" ! name the NEXT STEP precisely: action, file, function. mid-edit files ! listed | `none`.
Red tests ! named exactly (file + test name), ⊥ "some failing".
final verification table ! filled only by the final verify phase; else header row alone.
Encoding: same symbol set as SPEC.md.
Full rules: /encode-docs skill.
-->

# HANDOFF 2026-07-19

branch main | last commit 8bd2d68 feat(encode-docs): fold the spec skill into the document encoder | tests green
green (182 pass, 0 fail) | oracle `npm test` | was 189 pre-merge
uncommitted: none

## done this session
prev cycle closed via `/garnish` (T77-T82 `x`, PLAN+HANDOFF purged, §C line-endings + §B.6 landed)
prep/cook: distilled 8-phase PLAN.md for merge + lean bodies + garnish prune + test cut; 3 user rulings captured; ⊥ implementation started
plan EXPANDED (⊥ replaced) w/ user ruling (e): V94 + F1 license gate + F5 attribution strip folded into existing phases
F1 (T83 `x`) research: §R33 merge OVERLAP/UNIQUE map, §R34 line budget ~351 < 500, §R35 oracle-loss map (28 §V @ risk), §R36 install-payload proof
F2 (T84 `x`) merge landed: `skills/spec/` deleted → 11 dirs; `encode-docs` = 426 lines w/ §SPEC SECTIONS + §PLAN SECTIONS + §HANDOFF SECTIONS + §BAKED HEADERS ×3; ∀ 21 §R33 UNIQUE items verified present; V86+V87 guards proven red-when-broken

## in progress (exact stop point)
F3 (T85 `~`) partially pre-done @ F2: ∀ 3 baked-header TEMPLATES already written into `encode-docs`. REMAINS: apply them to THIS repo 3 files + real `next:` values. mid-edit files: none

## next
F3 per PLAN.md | preconditions: none
NEXT STEP: prepend PLAN + HANDOFF baked headers to this repo `PLAN.md` + `HANDOFF.md`; swap `SPEC.md` header → new template (`baked by /encode-docs`, `ids:` line, `next:` line); compute real `next:` = V95 T91 B7; add parity guard ∀ 3 headers (∃ 1 ∀ SPEC only)

## deviations & decisions
user ruled 2026-07-19 (c): merged skill KEEPS name `encode-docs`. `/spec` ⊥ resolves after merge. ∴ `encode-docs` description ! carry BOTH skills' trigger keywords else `/spec` muscle-memory lands nowhere
user ruled 2026-07-19 (d): stale §V/§T → HARD-DELETE row, ⊥ `RETIRED` tombstone, ids ⊥ EVER reused. ∴ max-id scan ⊥ valid as id source → baked header gains `next: V<n> T<n> B<n>` counter (V89). Existing V18+V57 tombstones become prune candidates @ F6
V90 prune is EVIDENCE-GATED by design: user goal = context cut, ⊥ spec cull. Uncertain row → keep & report
emoji ban is retroactive & self-inflicted: ❌/✅ ∈ `encode-commit` were added by T78 LAST cycle ∴ F5 undoes own work
user ruled 2026-07-19 (e): skill BODY ⊥ carry attribution/provenance prose → `NOTICE.md` only (V94). Measured scope = 3 lines, 1 file (`encode-docs`) ∴ consistency fix ⊥ systemic: `encode-commit`, `encode-pr`, `spec`, `review-plan`, `prep` ALREADY lean. F1 step 8 GATES it on §R36 (does `npx skills add` copy `NOTICE.md`?) ∵ if ⊥, installed copy carries ⊥ notice at all — MIT §R.15. Exposure PRE-EXISTS this change (5 of 6 already bare) ∴ gate = discover the real state, ⊥ block the user ask
user ruled 2026-07-19 (f) w/ EVIDENCE: §R36 gate ⊥ cleared — `npx skills add` proven to copy `SKILL.md`+lockfile ONLY, ⊥ `NOTICE.md`, ⊥ `LICENSE`. User shown 3 options (1-line credit | strip entirely | keep blockquote) & chose STRIP ENTIRELY, accepting MIT §R.15 exposure. Decision informed, ⊥ silent. `NOTICE.md` stays complete in-repo (V15-V17 unchanged). Mitigation kept: frontmatter `license: MIT` DOES travel ∴ F5 adds it to `encode-commit`+`encode-pr` (both lack it) — spec-native field, ⊥ prose ∴ ⊥ conflict w/ V94
DEVIATION (F2): 3 test sites + 2 skill refs re-pointed off deleted `spec` path @ F2, ⊥ F4 — deleting the skill ⊥ leave suite green otherwise. F4 RETAINS: `NOTICE.md` dual-credit + `skills/spec/` row removal, README/AGENTS roster 12→11, `SPEC.md` §G/§C/§I + V45/V54 sweep, `attribution.test.mjs` VENDORED entry, `setup` support line `/spec`
DEVIATION (F2): all 3 baked-header templates written @ F2 ⊥ F3 ∵ F2 rewrote the file wholesale; writing 1 then adding 2 later = churn. F3 scope now = apply to this repo 3 docs + real `next:` values + parity guard
DEVIATION (F2): V94 attribution blockquote never re-added during the wholesale rewrite ∴ `encode-docs` already satisfies V94. F5 retains emoji purge + `license:` frontmatter ∀ `encode-commit`/`encode-pr` + the ⊥-attribution guard
NOTE: §R34 estimated merged file ~351 lines; ACTUAL 426 (cap 500). Per-doc rationale cost more than modelled. Headroom 74 ∴ ⊥ blocking, but F3 header work adds ⊥ lines to this file (templates already in)

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
- §R35: 28 §V ride on a single prose case each. F7 ! decide per row (aggregate case | MANUAL | hard-delete per V90) — ⊥ bulk-delete, ⊥ bulk-keep
- §R34 headroom = ~150 lines. If SPEC SECTIONS overruns @ F2, cut from §EXAMPLES (dupe-heavy) ⊥ from procedures
- blast radius large (∀ skill + ∀ root doc + ∀ test file) → `/review-plan` before F2 = reasonable

## final verification
item|status|evidence|decision
-|-|-|-
