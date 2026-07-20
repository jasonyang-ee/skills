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

branch main | last commit a946cd3 docs: verify the merge cycle and close the plan | tests green
green (49 pass, 0 fail) | oracle `npm test` | was 189 at cycle start | CLI lists 11
uncommitted: none

## done this session
prev cycle closed via `/garnish` (T77-T82 `x`, PLAN+HANDOFF purged, §C line-endings + §B.6 landed)
prep/cook: distilled 8-phase PLAN.md for merge + lean bodies + garnish prune + test cut; 3 user rulings captured; ⊥ implementation started
plan EXPANDED (⊥ replaced) w/ user ruling (e): V94 + F1 license gate + F5 attribution strip folded into existing phases
F1 (T83 `x`) research: §R33 merge OVERLAP/UNIQUE map, §R34 line budget ~351 < 500, §R35 oracle-loss map (28 §V @ risk), §R36 install-payload proof
F2 (T84 `x`) merge landed: `skills/spec/` deleted → 11 dirs; `encode-docs` = 426 lines w/ §SPEC SECTIONS + §PLAN SECTIONS + §HANDOFF SECTIONS + §BAKED HEADERS ×3; ∀ 21 §R33 UNIQUE items verified present; V86+V87 guards proven red-when-broken
F3 (T85 `x`) 3 baked headers live on this repo 3 docs; `SPEC.md` header → `next: V95 T91 B7` (§R excluded ∵ ⊥ rule prunes it ∴ max-scan still valid); 2 guards proven red-when-broken; fixed lost `${ours}` interpolation @ parity assert
F4 (T86 `x`) ∀ refs re-pointed by SENSE: skill+cmd → `encode-docs`; `SPEC.md` filename + "spec-driven"/"spec bug"/"Agent Skills spec" prose UNCHANGED. roster 12→11 (README, AGENTS, §I ×2, V81). `NOTICE.md` by hand: `encode-docs` row credits `caveman`+`spec` both, `skills/spec/` row dropped. Stale-name guard gains NARROW `spec` rule (`skills/spec/` + `` `/spec` `` only) — proven fires on cmd, quiet on filename+prose
F5 (T87 `x`) emoji purged ∀ `skills/**` + `tests/**`: ❌/✅ → words `bad`/`good`; `encode-pr` severity 🔴🟡🔵❓ → `bug:`/`risk:`/`nit:`/`q:` (labels already carried signal ∴ ⊥ loss); attribution block dropped (V94 satisfied); `license: MIT` added to both vendored files; `NOTICE.md` Modified rows record it; CR counts 100→101 & 54→55 = the added license line, ⊥ damage; 2 guards proven red-when-broken
F6 (T88 `x`) `garnish` step 4 = evidence-gated prune (steps renumbered 4-8); `pruned:`+`kept:` output fields; 3 new BOUNDARIES; V90 guard asserts ∀ 4 properties, each proven red independently
F7 (T89 `x`) suite 185 → 49 (V93 < 50 holds). Per-skill loops → aggregate cases reporting ∀ offender at once. ⊥ assertion deleted — §R35 predicted 28 §V at risk, ACTUAL 0 lost oracle ∵ collapsing sufficed ∴ ⊥ §V marked MANUAL, ⊥ §V pruned. §V annotation coverage 42 → 56 distinct. 5 merged cases probed red-when-broken
F8 (T90 `x`) final verify: ∀ V86-V94 HOLD + regression sweep + manual doc oracle + NOTICE hand-read + cold-read. ⊥ drift

## in progress (exact stop point)
F3 (T85 `~`) partially pre-done @ F2: ∀ 3 baked-header TEMPLATES already written into `encode-docs`. REMAINS: apply them to THIS repo 3 files + real `next:` values. mid-edit files: none

## next
PLAN complete — ∀ §T T83-T90 == `x`, ∀ §V86-V94 HOLD, suite green @ 49
NEXT STEP: `/garnish` to close the cycle. NOTE: garnish now prunes stale §V/§T (V90) ∴ this close is the FIRST dogfood of that step — V18+V57 tombstones + any §V made stale by the merge = prune candidates, evidence-gated

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
NOTE (F3): `next:` counter covers V/T/B only, ⊥ R. Deliberate: V90 prunes §V+§T, one-file rule compacts §B ∴ those 3 need it; ⊥ rule prunes §R ∴ max-scan stays valid there. Matches V89 text exactly

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
- F7 is the phase where honesty is easiest to lose: deleting a case is invisible in a green run. Work FROM §R35 list, decide EACH row explicitly, record the decision. A §V left claiming automation it lost = the exact drift this workflow exists to prevent
- §R34 headroom = ~150 lines. If SPEC SECTIONS overruns @ F2, cut from §EXAMPLES (dupe-heavy) ⊥ from procedures
- blast radius large (∀ skill + ∀ root doc + ∀ test file) → `/review-plan` before F2 = reasonable

## final verification
item|status|evidence|decision
-|-|-|-
V86|HOLD|`skills/spec/` absent; roster 11; `encode-docs` claims sole mutator; guard `is the only skill claiming the SPEC.md mutator role` proven red|-
V87|HOLD|3/3 sections present; guard `encode-docs embeds a section set and a baked header per document` proven red on renamed section|-
V88|HOLD|3/3 templates ∈ skill; 3/3 docs open w/ their header; parity guard proven red on drifted line|-
V89|HOLD|`next: V95 T91 B7` ahead of max V94/T90/B6; guard proven red @ `next: V90`|-
V90|HOLD|`garnish` carries evidence-gate + keep-when-unsure + hard-delete + ⊥-reuse + routes via `encode-docs`; each proven red independently|-
V91|HOLD|0 emoji files ∈ `skills/**`; codepoint-RANGE guard proven red on injected ✅|-
V92|HOLD|0 emoji files ∈ `tests/**`, same guard|-
V93|HOLD|`npm test` = 49 < 50; ⊥ assertion deleted (§R35 predicted 28 §V at risk, ACTUAL 0 lost oracle)|-
V94|HOLD|0 attribution blocks ∈ skill bodies; guard proven red on injected block. GATE §R36 ⊥ cleared, user accepted w/ evidence|-
V4,V5,V7|HOLD|∀ 11 `name` == parent dir, legal, unique|-
V8|HOLD|`npx skills add . --list` → exactly 11, ⊥ `spec`|-
V14|HOLD|max body 426 lines (`encode-docs`) < 500|-
V17|HOLD|∀ 5 vendored skills have `NOTICE.md` row|-
V19,V21|HOLD|⊥ `scripts/` ∀ skill; ⊥ `FORMAT.md` @ root & ⊥ skill demands it|-
V47|HOLD|README six-step order intact: prep → encode → review-plan → cook → garnish → review-code|-
V50,V52,V55,V56,V58,V59,V60|HOLD|MANUAL oracle (§C): README explains /setup separation + 6 steps; step 2 reads "automatically/⊥ a command you invoke"; small-task path routes /encode-docs → /prep → /cook; CONTRIBUTING → `skills/encode-docs/SKILL.md`; layout tree == disk exactly once ×11; loader list ∋ review-plan; §I npm-test row distinguishes automated vs manual|-
V81,V82|HOLD|roster 11 == docs claim; ⊥ live ref to `skills/spec/` | `/spec`|-
V84,V85|HOLD|`skills/caveman/` absent; discipline + carve-out ∈ both reviewers only|-
NOTICE|HOLD|hand-read: cavekit = encode-docs/prep/review-plan; caveman = encode-commit/encode-pr; original = handoff/cook/cater/review-code/garnish/setup. 11 accounted, ⊥ provenance swap. review-plan+review-code listed twice BY DESIGN (own row + caveman-derivation note)|-
cold-read|HOLD|`encode-docs` read as a new session: ∀ 3 sections state purpose + structure + rules + template + header, ⊥ depending on each other|-
DRIFT|NONE|⊥ contradiction found between code, `SPEC.md`, `PLAN.md`|-
