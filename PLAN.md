# PLAN

goal: merge `spec` → `encode-docs` as 3 doc-specific section sets w/ 3 baked headers; lean skill bodies (⊥ emoji, ⊥ attribution block); teach `garnish` to prune stale §V/§T; cut tests < 50

## ground rules
- quality > speed. ⊥ skip a verification step. smallest coherent diff per phase
- ! rename by MEANING ⊥ by string. `spec` appears as skill name, `/spec` command, `spec bug:` flow, AND `SPEC.md` filename — last is ⊥ a rename target
- ⚠ MSYS `sed`/`grep` STRIP CR ON READ (§B.6). `skills/encode-commit/` + `skills/encode-pr/` = CRLF. ⊥ `sed -i` on those 2 — use Edit tool. Detect w/ `tr -dc '\r' | wc -c`, ⊥ `grep`
- V14 caps SKILL.md @ 500 lines. merged file budget = 128 + 250 raw ∴ ! dedupe encoding grammar (∃ in both) else overflow
- vendored edit → `NOTICE.md` Modified row ! record it (AGENTS vendor rule). `encode-docs` row ! credit BOTH upstream `caveman` + `spec` post-merge
- skill BODY = instructions only. Attribution/provenance/license prose → `NOTICE.md` ∵ body loads ∀ session, `NOTICE.md` ⊥ (V94). frontmatter `license:` = the 1 permitted exception
- ∀ phase: named test/oracle before edit; new guard ! proven red-when-broken, ⊥ assumed
- §V losing its automated oracle @ F7 ! be marked MANUAL | hard-deleted per V90 — ⊥ silently unguarded
- `encode-docs` = sole `SPEC.md` mutator post-merge. ⊥ push ⊥ tag without explicit ask

## existing assets
- `skills/encode-docs/SKILL.md` 128 lines: §GRAMMAR §SYMBOLS §PRESERVE VERBATIM §SHAPES §EXAMPLES §BOUNDARIES §WHEN UNSURE
- `skills/spec/SKILL.md` 250 lines: §DISPATCH §INPUTS §NEW §DISTILL §BUG §AMEND §FORMAT(§SECTIONS §ADDRESSING §ENCODING §ONE FILE RULE §WRITES) §BAKED HEADER §OUTPUT RULES §NON-GOALS
- OVERLAP → dedupe source: spec §ENCODING ≈ encode-docs §GRAMMAR+§SYMBOLS
- `PLAN.md` template ∃ @ `skills/prep/SKILL.md`; `HANDOFF.md` template ∃ @ `skills/handoff/SKILL.md` — both move|point to `encode-docs` (format), skills keep PROCESS
- ref counts (`git grep -c -w spec`): `prep` 14, `setup` 8, `garnish` 7, `review-plan` 6, `cook` 5, `cater` 3, README 18, AGENTS 4, NOTICE 5
- tests 189 = `skill-contract` 86 (7 it × 12 skills + 2) + `repo-hygiene` ~90 + `attribution` 11 + `cli-discovery` 2
- emoji ∈ `skills/encode-commit/` (❌✅, added @ T78 — self-inflicted), `skills/encode-pr/` (❌✅🔴🟡🔵 severity = FUNCTIONAL ∴ ! text replacement ⊥ deletion), `tests/repo-hygiene.test.mjs`
- V20 names `skills/spec/SKILL.md` ∴ ! re-point @ F4. V21 (⊥ FORMAT.md) survives unchanged
- oracle `npm test`; baseline 189 pass 0 fail

## phase order
id|goal|depends|exit
F1|research: merge surface, line budget, oracle-loss map, header design, license gate|-|§R33-R36 logged, ⊥ open `?`
F2|merge `spec` → `encode-docs`, 3 tailored sections, rm `skills/spec/`|F1|11 dirs, V86+V87 hold
F3|3 baked headers + SPEC `next:` id counter|F2|V88+V89 hold
F4|re-point ∀ `spec` ref, roster 12→11, NOTICE dual-credit|F3|⊥ stale ref, V17 holds
F5|lean skill bodies: emoji purge + strip vendor attribution|F4|V91+V92+V94 hold
F6|`garnish` evidence-gated §V/§T prune|F5|V90 holds
F7|cut tests < 50|F6|V93 holds, suite green
F8|final verify|F7|∀ §V86-V94 HOLD

## F1 research
task: T83
goal: resolve ∀ unknown before first edit; ⊥ guess the merged shape
inputs: both SKILL.md full, `tests/*.mjs`, `NOTICE.md:13-21`, upstream cavekit provenance
steps:
1. full-read both skills; build OVERLAP map (dupe rules) + UNIQUE map (⊥ lose a rule in the merge)
2. line budget: sum unique content, confirm < 500 (V14). If ⊥ fits → decide what compresses, record
3. design the 3 section sets. ! justify per doc WHY its rules differ — SPEC = durable/append-mostly/id-stable; PLAN = phase contract/short-lived/replaced wholesale; HANDOFF = baton/overwritten ∀ session/state-only. ⊥ one generic ruleset
4. design 3 baked headers. SPEC header gains `next: V<n> T<n> B<n>`. PLAN + HANDOFF headers NEW ∴ ! state what a cold agent needs on first read of THAT file
5. oracle-loss map: ∀ §V whose ONLY oracle is a test F7 will cut → mark MANUAL | delete per V90. ! enumerate before cutting, ⊥ discover after
6. emoji inventory: ∀ occurrence + whether decorative (delete) | functional (text replace)
7. confirm `NOTICE.md` dual-credit wording ∵ merged skill derives from 2 upstream cavekit skills
8. LICENSE GATE ∀ V94: does `npx skills add <repo>` copy `NOTICE.md` into the installed skill dir, | only `SKILL.md`? Test empirically — install this repo into a temp dir & list what landed. ⊥ assume. → §R36
   - NOTICE travels → stripping in-file attribution = safe, V94 proceeds
   - NOTICE ⊥ travels → installed copy carries ⊥ notice ∴ MIT §R.15 exposure. ! REPORT to user w/ the evidence before F5 strips anything; ? compact 1-line alternative (frontmatter `license:` + 1 credit line)
   - NOTE: 5 of 6 vendored skills ALREADY ship w/ ⊥ attribution ∴ exposure (if real) pre-exists this change, ⊥ created by it
9. §T T83 → `~`; findings → §R33 (merge map), §R34 (section rationale), §R35 (oracle-loss), §R36 (install payload) via `spec`
verify: §R33-R36 sourced; ⊥ open `?`; line budget proven < 500; oracle-loss list complete; V94 gate decided w/ empirical evidence
exit: merged shape decided w/ evidence
next: F2

## F2 merge
task: T84
goal: 1 skill owning all 3 doc formats; `skills/spec/` gone; ⊥ rule lost
inputs: F1 OVERLAP+UNIQUE maps; V86, V87
files: `skills/encode-docs/SKILL.md`, `skills/spec/` (delete)
steps:
1. flip T83 → `x`; T84 → `~`
2. rewrite `skills/encode-docs/SKILL.md`: shared §GRAMMAR + §SYMBOLS + §PRESERVE VERBATIM once, THEN `## SPEC SECTIONS`, `## PLAN SECTIONS`, `## HANDOFF SECTIONS`
3. `## SPEC SECTIONS` absorbs spec's §DISPATCH/§NEW/§DISTILL/§BUG/§AMEND/§SECTIONS/§ADDRESSING/§ONE FILE RULE/§WRITES + sole-mutator rule
4. `## PLAN SECTIONS` ← canonical `PLAN.md` structure (phase table, `task:` mapping, research-first, verify-last)
5. `## HANDOFF SECTIONS` ← canonical `HANDOFF.md` structure (branch/test/commit state, stop point, next pointer, watchouts, final-verification table)
6. `git rm -r skills/spec/`
7. frontmatter `description` ! state the merged job & keep trigger keywords ∀ BOTH old skills (∵ discoverability — `/spec` users ! still land here)
8. re-read merged file IN FULL vs F1 UNIQUE map — confirm ⊥ rule dropped
9. `npm test`
verify: `npm test` exit 0; 11 dirs; ⊥ rule ∈ UNIQUE map missing; body ≤ 500 lines
exit: single skill owns 3 formats
next: F3

## F3 baked headers
task: T85
goal: ∀ 3 docs self-describing on first read; id counter replaces max-id scan
inputs: F1 header design; V88, V89
files: `skills/encode-docs/SKILL.md`, `SPEC.md` (own header), `PLAN.md`, `HANDOFF.md`
steps:
1. flip T84 → `x`; T85 → `~`
2. 3 header templates ∈ `encode-docs`, each emitted verbatim as first bytes of its doc
3. SPEC header + `next: V<n> T<n> B<n>` line; state ids ⊥ reused ∀ time
4. update THIS repo's `SPEC.md` header → add `next:` w/ correct current values; `PLAN.md` + `HANDOFF.md` gain their headers (dogfood)
5. header ! ⊥ contradict the section rules (single source; header = the compact restatement)
verify: `npm test` exit 0; 3 headers ∃ ∈ skill; this repo's 3 docs carry them; `next:` values == real max+1
exit: 3 docs self-describing
next: F4

## F4 re-point refs
task: T86
goal: ⊥ live ref to `spec` skill | `/spec` command; roster 11; NOTICE license-correct
inputs: F1 ref counts; V86, V17, V81
files: `skills/**`, `SPEC.md` §G/§C/§I/§V, `README.md`, `AGENTS.md`, `NOTICE.md`, `.github/CONTRIBUTING.md`, `tests/*.mjs`
steps:
1. flip T85 → `x`; T86 → `~`
2. ! distinguish 3 senses before editing: skill name `spec` → `encode-docs`; command `/spec` → `/encode-docs`; FILENAME `SPEC.md` → UNCHANGED. `spec bug:` flow → `encode-docs bug:`
3. sweep `skills/**` word-boundary; re-read ∀ touched file (§B.6 CR trap — Edit tool ∀ CRLF files)
4. `SPEC.md` §G/§C/§I + V20 + V45 + V54 + any §V naming `skills/spec/` → `encode-docs`
5. `README.md` roster table + layout tree + six-step narrative + credits; `12`→`11` ×2 (README + AGENTS)
6. `AGENTS.md` skill list, support line, sole-mutator rule
7. `NOTICE.md` BY HAND: `skills/encode-docs/` row ! credit upstream `caveman` + `spec` BOTH; drop `skills/spec/` row; Original-work roster unchanged
8. tests: VENDORED list, LIVE_REF_FILES, roster case 12→11, stale-name guard += `spec`-as-skill (⊥ `SPEC.md`)
verify: `npm test` exit 0; `git grep -w` ⊥ hit ∀ `skills/spec/` outside CHANGELOG + §T/§B/§R history; roster case green @ 11
exit: surface coherent
next: F5

## F5 lean skill bodies
task: T87
goal: ⊥ emoji ∈ `skills/**` | `tests/**`; examples read `good`/`bad`; ⊥ vendor attribution block ∈ any skill body
inputs: F1 emoji inventory + §R36 license gate; V91, V92, V94
files: `skills/encode-commit/SKILL.md` (CRLF), `skills/encode-pr/SKILL.md` (CRLF), `tests/repo-hygiene.test.mjs`, `skills/encode-docs/SKILL.md`
steps:
1. flip T86 → `x`; T87 → `~`
2. ❌/✅ → literal words `bad` / `good` as example labels
3. `encode-pr` severity 🔴🟡🔵 = FUNCTIONAL ∴ → text labels (`bug` / `risk` / `nit`), ⊥ silent deletion — the severity signal ! survive
4. Edit tool ONLY on the 2 CRLF files (§B.6); verify CR count unchanged after
5. `NOTICE.md` Modified rows ∀ both vendored files record the emoji removal
6. strip vendor attribution block @ `skills/encode-docs/SKILL.md` (the `> Vendored from...` blockquote, 3 lines) — ONLY if §R36 cleared the gate @ F1. Gate ⊥ cleared → STOP, report, ⊥ strip
7. frontmatter `license: MIT` STAYS (1 line, spec-native field, ⊥ prose)
8. add guard: ⊥ emoji ∈ `skills/**` + `tests/**` (codepoint-range match, ⊥ enumerated list — else next emoji slips through) + ⊥ attribution blockquote ∈ any skill body
verify: `npm test` exit 0; both guards proven red when violated; CR counts byte-identical vs pre-edit; §R36 gate recorded
exit: skill bodies lean
next: F6

## F6 garnish prune
task: T88
goal: `garnish` prunes stale §V/§T so cold sessions load less
inputs: V90, V89
files: `skills/garnish/SKILL.md`, `skills/encode-docs/SKILL.md`
steps:
1. flip T87 → `x`; T88 → `~`
2. `garnish` gains a prune step BEFORE the purge: identify §V/§T rows ⊥ relevant to current code
3. ! EVIDENCE-GATED — prune only when the code|test the row described is provably gone. ⊥ prune "looks stale". Uncertain → keep & report
4. hard-delete the row; ⊥ leave `RETIRED` tombstone; bump baked-header `next:`; id ⊥ reused
5. ! preserve rows still describing live behavior — this is a context cut, ⊥ a spec cull. Over-pruning silently drops a guarantee
6. route through `encode-docs` (sole mutator); `garnish` ⊥ write `SPEC.md` directly
verify: `npm test` exit 0; garnish contract case asserts evidence gate + hard-delete + `next:` bump + ⊥-reuse
exit: prune rule live
next: F7

## F7 test cut
task: T89
goal: total < 50, coverage honest
inputs: F1 oracle-loss map; V93
files: `tests/*.mjs`
steps:
1. flip T88 → `x`; T89 → `~`
2. `skill-contract`: collapse 7-it × 12-skill loop → aggregate cases looping internally, reporting ∀ offender in one assert (86 → ~6)
3. `attribution`: collapse VENDORED loop → 1 aggregate (11 → ~4)
4. `repo-hygiene`: drop brittle single-skill prose asserts; keep roster, cross-ref, no-scripts, no-emoji, workflow-order, license/release guards
5. ∀ §V from F1 oracle-loss map → mark MANUAL ∈ `SPEC.md` | hard-delete per V90. ⊥ leave a §V claiming automation it lost
6. count: `npm test` total < 50
verify: `npm test` exit 0 & total < 50; ∀ oracle-loss §V annotated | deleted; ⊥ §V silently unguarded
exit: suite lean & honest
next: F8

## F8 final verify
task: T90
goal: §V86-V94 HOLD; ⊥ drift
inputs: F2-F7 diffs; SPEC §V86-V94; §R33-R36
steps:
1. flip T89 → `x`; T90 → `~`
2. classify V86-V94 each HOLD|VIOLATE|UNVERIFIABLE + cite test/file
3. regression sweep: V4,V5,V7,V8,V14,V17,V19,V21,V47,V81,V82,V84,V85 ⊥ broken by merge
4. manual doc §V oracle: V50,V52,V55,V56,V58,V59,V60 (§C — `npm test` ⊥ proves these)
5. re-read `NOTICE.md` by hand — dual-credit correct, ⊥ vendored/original swap, emoji + attribution-strip edits recorded. `NOTICE.md` = now the SOLE attribution record ∴ ! complete
6. cold-read test: open merged `encode-docs` as if new session — can it construct all 3 docs from the file alone?
7. `npm test` full — record output verbatim; confirm < 50
8. commit via `encode-commit` (⊥ symbols, ⊥ plan ids); flip T90 → `x`
verify: `npm test` exit 0 & < 50; ∀ §V86-V94 HOLD; result table → `HANDOFF.md`
exit: committed, green, drift resolved
next: - (→ `/garnish`)
