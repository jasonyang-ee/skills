<!-- PLAN FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Short-lived: one cycle. Replaced wholesale, ⊥ amended. Durable facts → SPEC.md.
Order: goal | ground rules | existing assets | phase order table | one section per phase.
Phase ids F1..Fn monotonic. F1 ! research. Fn ! final verify. ⊥ coding outside that span.
∀ phase names: goal | inputs | files | §T tasks (≥1) | verify | exit | next
§T tasks defined & tracked in each phase. Status: x done | ~ wip | . todo.
Tracked: planning status ∈ {new, work-in-progress, done}. cook/cater run ⟺ work-in-progress; new → stop (/prep); done → stop (/garnish).
Encoding: same symbol set as SPEC.md. Preserve code/paths/ids verbatim.
Executable cold: a phase ⊥ readable without chat history is ⊥ finished.
Full rules: /encode-docs skill.
planning status: work-in-progress
-->

# PLAN

goal: simplify `HANDOFF.md` header (pass/fail words, ⊥ oracle keyword, commit sha only) + gate `BACKLOG.md` to `prep`-only reader with blank-after-write & defer-append lifecycle.

## ground rules
- production quality, verify-driven, evidence-based. skills = markdown only (§C2); ⊥ scripts, ⊥ Python.
- `skills/**` bodies = unwrapped prose (1 line/paragraph), rely on editor soft-wrap; preserve verbatim code fences, tables, baked-header comments, frontmatter, list structure (AGENTS rule).
- ∀ SPEC/PLAN/HANDOFF write routes through `encode-docs` (§V16). durable change only → `SPEC.md` (high bar, §C12).
- ∀ touched `SKILL.md` ! stay ≤500 lines (§V4) & valid frontmatter (§V1-3). tests ⊥ assert prose (§C8) ∴ oracle stays green on doc-only edits.
- ∀ phase: cite the §V it honors, name exact grep/test evidence, self-review before commit, refresh `HANDOFF.md` + commit baton (§V22).
- oracle command = `npm test` → `node --test`; current 7/7 pass. re-find line numbers by quoted string (they drift).
- scope decisions (user, this cycle): HANDOFF header = ONE tests line, ⊥ separate baseline line, ⊥ commit subject; wording cleanup = HANDOFF-only (⊥ harmonize garnish/review-code/cater output blocks); word `oracle` meaning canonical full-suite command stays in cook/garnish/review-code, removed ONLY from HANDOFF header.

## existing assets
- `SPEC.md` §V27 already rewritten this cycle → full `BACKLOG.md` lifecycle (prep-sole-reader, non-prep ⊥ read, garnish ⊥ touch, ingest blank-after-write, defer append-⊥-prune). F2/F3 implement to it; F4 classifies HOLD.
- HANDOFF touch-points confirmed: `encode-docs` template @ lines ~244-245 (`last commit <sha> <subject>` + `tests <green|RED>` + `baseline <green|RED> | oracle <cmd>`), baked HANDOFF header @ ~325 (`branch | last commit | tests | baseline + oracle command | ...`), Rules 2-3 @ ~272-274; `handoff` gather-list @ lines 25-26, Rule 3 @ 39, Rule 2 @ 38.
- BACKLOG touch-points confirmed: `prep` Load#3 @ 50 + Hard-outputs#4 @ 41; gated-skill LOAD sections — `cook` @ 28-33, `cater` @ 29-34, `review-plan` @ 25-31, `review-code` @ 29-34; `garnish` procedure @ 26-41 + Boundaries @ 57-64; `setup` AGENTS template AI-File-Purpose @ 53-57; repo `AGENTS.md` AI File Purpose (dogfood, no BACKLOG line yet).
- ⊥ §V references `oracle`/`baseline` → Theme A = skill-body/format edit only, ⊥ SPEC change.
- coherence note (F4 must verify, ⊥ fix ∵ user scoped HANDOFF-only): garnish precond#4/#5 say "recorded oracle" — after header change the command still lives on the tests line `(<cmd>)`, so "recorded oracle" resolves there; confirm no skill hard-depends on a labeled `oracle`/`baseline` HANDOFF field.

## phase order
id|goal|depends|exit
F1|research: confirm touch-points, blessed header bytes, ingest/defer gate, test impact|-|edit register locked, later phases reconciled to reality
F2|Theme A: simplify HANDOFF header in encode-docs + handoff|F1|grep HANDOFF region ⊥ oracle/baseline/subject/green; 2 skills agree on new line; ≤500 lines; oracle green
F3|Theme B+C: BACKLOG read-gate + prep lifecycle + setup/AGENTS doc|F1|gated skills ⊥-read line present; garnish ⊥-touch; prep blank-after-write+defer rules; V27 HOLD; oracle green
F4|final verify code vs SPEC & PLAN|F2,F3|full suite green, ∀ relevant §V HOLD, result table in HANDOFF

## F1 research
goal: confirm every exact edit site, the blessed new HANDOFF header bytes, the ingest/defer trigger, and that doc-only edits keep tests green — then reconcile F2/F3 to reality.
inputs: this PLAN existing-assets; user scope decisions (one tests line, HANDOFF-only); `SPEC.md` §V16/§V20/§V22/§V23/§V27/§V29; skills `encode-docs`, `handoff`, `prep`, `cook`, `cater`, `review-plan`, `review-code`, `garnish`, `setup`; repo `AGENTS.md`.
files: read-only across the above.

§T  TASKS:
T1|.|confirm HANDOFF-header edit sites & lock blessed bytes
touch: read `skills/encode-docs/SKILL.md`, `skills/handoff/SKILL.md`
details: verify exact strings for the HANDOFF template block, baked HANDOFF header line, and Rules 2-3 in both skills. lock target: line1 `branch <name> | last commit <sha> | tests <pass N/N | FAIL: file+case> (<cmd>)`, line2 `uncommitted: <none | files + why>` — ⊥ baseline line, ⊥ commit `<subject>`. baked-header carry-line → `branch | last commit sha (⊥ subject) | tests pass N/N \| FAIL: file+case + command | uncommitted files + why`. Rule "Red tests named" → "Failing tests named (file + case)"; delete baseline≠oracle rule + renumber. cites §V16, §V20.
verify: quoted current strings captured for each Edit; ⊥ §V mentions oracle/baseline (grep SPEC).
exit: F2 edit list exact & line-independent (keyed by quoted string).
next: F1.T2

T2|.|confirm BACKLOG gate sites & ingest/defer trigger
touch: read `skills/prep`, `skills/cook`, `skills/cater`, `skills/review-plan`, `skills/review-code`, `skills/garnish`, `skills/setup`, `AGENTS.md`
details: confirm LOAD sections of the 5 non-prep skills, garnish procedure+Boundaries, prep Load#3 + Hard-outputs#4, setup AGENTS AI-File-Purpose block, repo AGENTS.md AI File Purpose. confirm ingest/defer trigger = `PLAN.md` baked-header `planning status` (§V29): work-in-progress → defer (append, ⊥ prune); new|done|absent → ingest (read, write PLAN, blank). cites §V27, §V29.
verify: exact quoted anchor strings captured for each Edit; trigger mapping matches §V27 wording.
exit: F3 edit list exact & keyed by quoted string.
next: F1.T3

T3|.|confirm test/lint impact & oracle baseline
touch: read `package.json` scripts, `tests/`; run `npm test`
details: confirm oracle = `npm test` → `node --test`, record N/N (expect 7/7). confirm tests scope = §V1-5 (frontmatter/name/desc/body-lines/CLI discovery), ⊥ prose (§C8) ∴ F2/F3 doc edits ⊥ turn oracle red. confirm every touched `SKILL.md` stays ≤500 lines post-edit (§V4).
verify: `npm test` green N/N recorded; line-count headroom noted per touched skill.
exit: F4 has a known-green baseline to compare against.
next: F2.T1

## F2 implement — Theme A: HANDOFF header simplification
goal: collapse the HANDOFF header to one tests line with pass/fail words, sha-only commit, ⊥ oracle keyword — in the format owner (`encode-docs`) and the gatherer (`handoff`), byte-consistent.
inputs: F1.T1 register; user scope (one tests line, HANDOFF-only); §V16 (encode-docs sole owner), §V20 (baked header verbatim).
files: `skills/encode-docs/SKILL.md`, `skills/handoff/SKILL.md`, `CHANGELOG.md`.

§T  TASKS:
T1|.|encode-docs: rewrite HANDOFF template + baked header + rules
touch: `skills/encode-docs/SKILL.md`
details: in the `## HANDOFF.md File` template block, replace the two lines `branch <name> | last commit <sha> <subject> | tests <green | RED: named>` + `baseline <green | RED: file+test> | oracle <cmd>` with the single line `branch <name> | last commit <sha> | tests <pass N/N | FAIL: file+case> (<cmd>)`. In Rules: change "Red tests named exactly" → "Failing tests named exactly (file + case)"; DELETE the `Baseline ≠ current oracle; each carries its exact command.` rule and renumber the remaining rules. In the BAKED HEADERS `HANDOFF.md` block, replace `Header ! carry: branch | last commit | tests | baseline + oracle command | uncommitted files + why` with `Header ! carry: branch | last commit sha (⊥ subject) | tests pass N/N \| FAIL: file+case + command | uncommitted files + why`. Preserve every other line, table, and symbol verbatim.
verify: grep `skills/encode-docs/SKILL.md` for `oracle`, `baseline`, `<subject>`, `green` in the HANDOFF sections → ⊥ match; body ≤500 lines. cites §V16, §V20.
exit: encode-docs emits the new single-line HANDOFF header.
next: F2.T2

T2|.|handoff: align gather-list + rules to new header
touch: `skills/handoff/SKILL.md`
details: in `## GATHER`, replace `- branch | last commit `<sha>` `<subject>` | tests `<green | RED: named>`` + `- baseline `<green | RED: file+test>` | oracle `<cmd>`` with one bullet `- branch | last commit `<sha>` | tests `<pass N/N | FAIL: file+case>` (`<cmd>`)`. In RULES: change "Red tests named exactly" → "Failing tests named exactly (file + case)"; DELETE rule "Test state distinguishes baseline from current oracle — each with its exact command and named failures." and renumber. Keep the rest verbatim.
verify: grep `skills/handoff/SKILL.md` for `oracle`, `baseline`, `<subject>` → ⊥ match; the gather-list line matches encode-docs template shape; body ≤500 lines. cites §V16, §V20.
exit: gatherer & owner agree on the header shape.
next: F2.T3

T3|.|changelog entry
touch: `CHANGELOG.md`
details: add plain-English `## [Unreleased]` bullet: HANDOFF header simplified — single tests line with pass/fail, commit hash only, dropped the oracle/baseline line.
verify: `## [Unreleased]` present & carries the entry (§V11).
exit: Theme A recorded.
next: F3.T1

## F3 implement — Theme B+C: BACKLOG read-gate + prep lifecycle
goal: make `BACKLOG.md` a `prep`-only raw input — gate the 5 non-prep skills from reading it, forbid garnish from touching it, give prep blank-after-write (ingest) + append-⊥-prune (defer) behavior, and document it in setup's template + the live AGENTS.md.
inputs: F1.T2 register; `SPEC.md` §V27 (already rewritten), §V23 (garnish scope), §V29 (planning-status gate).
files: `SPEC.md` (V27 via encode-docs — already landed, F3 confirms), `skills/prep/SKILL.md`, `skills/cook/SKILL.md`, `skills/cater/SKILL.md`, `skills/review-plan/SKILL.md`, `skills/review-code/SKILL.md`, `skills/garnish/SKILL.md`, `skills/setup/SKILL.md`, `AGENTS.md`, `CHANGELOG.md`.

§T  TASKS:
T1|.|confirm SPEC §V27 rewrite landed
touch: `SPEC.md` (read; write only if drift)
details: verify §V27 reads the full BACKLOG lifecycle (prep-sole-reader; non-prep ⊥ read; garnish ⊥ touch; ingest blank-after-write; defer append-⊥-prune). ⊥ new id consumed; `next:` unchanged. if any edit needed, route through `encode-docs`. cites §V16, §C12.
verify: §V27 present & complete; `next: C13 I12 R8 V30` unchanged.
exit: durable contract in place for T2-T6 to satisfy.
next: F3.T2

T2|.|prep: ingest/defer lifecycle + blank-after-write
touch: `skills/prep/SKILL.md`
details: Load#3 → read `BACKLOG.md` as request input ONLY in ingest mode (`PLAN.md` planning status ≠ work-in-progress); in defer mode ⊥ read as new plan input. Hard-outputs#4 → keep defer behavior, add: defer = append user request to `BACKLOG.md`, ⊥ prune. Add an explicit step (after `PLAN.md` written & before/with handoff): ingest mode blanks `BACKLOG.md` — blank ONLY after `PLAN.md` written (session-limit safety); defer mode ⊥ blank. Boundaries → add "⊥ blank `BACKLOG.md` before `PLAN.md` is written". cites §V27, §V29.
verify: grep `skills/prep/SKILL.md` shows blank-after-write + defer-append + ingest/defer gate keyed to planning status; body ≤500 lines.
exit: prep owns the full BACKLOG lifecycle.
next: F3.T3

T3|.|cook + cater + review-plan + review-code: LOAD gate
touch: `skills/cook/SKILL.md`, `skills/cater/SKILL.md`, `skills/review-plan/SKILL.md`, `skills/review-code/SKILL.md`
details: in each skill's LOAD/Load section add one line: ⊥ read `BACKLOG.md` — raw un-ingested `prep`-only input; a cold agent auto-reading it would act on unsummarized request text. keep encoding + numbering consistent with each file's existing LOAD style. cites §V27.
verify: grep each of the 4 skills for `BACKLOG` in LOAD → the ⊥-read line present; bodies ≤500 lines.
exit: no non-prep executor reads raw BACKLOG.
next: F3.T4

T4|.|garnish: ⊥ read & ⊥ touch BACKLOG
touch: `skills/garnish/SKILL.md`
details: add a LOAD/procedure guard: garnish ⊥ read `BACKLOG.md`; and a Boundaries line: garnish ⊥ blank/prune/delete/touch `BACKLOG.md` (only `prep` manages it, §V27) — garnish blanks ONLY `PLAN.md` + `HANDOFF.md`. cites §V23, §V27.
verify: grep `skills/garnish/SKILL.md` shows both the ⊥-read guard and the ⊥-touch Boundaries line; body ≤500 lines.
exit: garnish provably cannot erase a pending backlog.
next: F3.T5

T5|.|setup: document BACKLOG in AGENTS template
touch: `skills/setup/SKILL.md`
details: in the AGENTS.md `## AI File Purpose` template block add a line: `BACKLOG.md` = `prep`-sole-reader freeform request queue (⊥ encoded); ∀ non-`prep` skill ⊥ read, `garnish` ⊥ touch. keep encoded style consistent with sibling lines. cites §V27.
verify: grep `skills/setup/SKILL.md` AI-File-Purpose block shows the BACKLOG line; body ≤500 lines.
exit: bootstrapped repos learn the BACKLOG rule.
next: F3.T6

T6|.|repo AGENTS.md: dogfood the BACKLOG line
touch: `AGENTS.md`
details: add the same `BACKLOG.md` AI-File line to the repo `## AI File Purpose` section, encoded, consistent with existing lines. (repo dogfoods its own guidance.)
verify: `AGENTS.md` AI File Purpose carries the BACKLOG line.
exit: live guidance matches the template.
next: F3.T7

T7|.|changelog entry
touch: `CHANGELOG.md`
details: add plain-English `## [Unreleased]` bullet: BACKLOG.md gated to prep-only — other skills no longer read it, garnish never touches it, prep blanks it after writing PLAN.md (ingest) or appends without pruning mid-cycle (defer).
verify: `## [Unreleased]` carries the entry (§V11).
exit: Theme B+C recorded.
next: F4.T1

## F4 final verify
goal: prove code matches SPEC & PLAN — tests green, every relevant §V classified HOLD with evidence, drift named & resolved.
inputs: `SPEC.md` §V4/§V11/§V16/§V20/§V22/§V23/§V27/§V29; F2 + F3 diffs; oracle `npm test`.
files: read-only sweep across all touched files; write result table to `HANDOFF.md` via encode-docs.

§T  TASKS:
T1|.|invariant classification + oracle
touch: read `SPEC.md`, `skills/**`, `AGENTS.md`; run `npm test`
details: run `node --test`, expect 7/7 pass (doc-only cycle). classify §V4 (≤500 lines ∀ touched skill), §V11 (Unreleased), §V16/§V20 (encode-docs owns new header), §V27 (BACKLOG lifecycle across prep + 5 gated skills + garnish), §V29 (ingest/defer keyed to planning status) as HOLD | VIOLATE | UNVERIFIABLE with file/grep evidence.
verify: table rows each cite file:line or test.
exit: all relevant §V = HOLD or drift named.
next: F4.T2

T2|.|coherence + leftover sweep
touch: read `skills/encode-docs`, `skills/handoff`, `skills/garnish`, `skills/cook`
details: grep HANDOFF regions for leftover `oracle`/`baseline`/`<subject>`/`green` → expect ⊥ in header context. confirm garnish "recorded oracle" (precond#4/#5) still resolves to the tests-line `(<cmd>)` — no skill hard-depends on a labeled oracle/baseline HANDOFF field (user scoped HANDOFF-only; note, ⊥ fix unless a real break). confirm ingest/defer gate unambiguous & matches §V27; confirm blank-after-write ordering explicit (session-limit safety); confirm no skill body reimplements another's rule (§V28 self-sufficiency).
verify: each check cites evidence; any residual inconsistency named with a fix-or-accept decision.
exit: no silent drift; coherence confirmed.
next: F4.T3

T3|.|record result table
touch: `HANDOFF.md` (via encode-docs)
details: write the final verification table (item | status | evidence | decision) into `HANDOFF.md`; flip §T rows to `x`; set `planning status: done` when all HOLD.
verify: table complete; planning status `done`.
exit: cycle ready for `/garnish`.
next: `/garnish`
