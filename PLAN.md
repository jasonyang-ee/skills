<!-- PLAN FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Short-lived: one cycle. Replaced wholesale, ⊥ amended. Durable facts → SPEC.md.
Order: goal | ground rules | existing assets | phase order table | one section per phase.
Phase ids F1..Fn monotonic. F1 ! research. Fn ! final verify. ⊥ coding outside that span.
∀ phase names: goal | inputs | files | §T tasks (≥1) | verify | exit | next
§T tasks defined & tracked in each phase. Status: x done | ~ wip | . todo.
Tracked: planning status ∈ {new, work-in-progress, done} — keyed to EXECUTION, ⊥ authorship. prep writes/expands as `new`; cook/cater ALONE flip new→work-in-progress at start & run on new(has phases)|wip; handoff→done on ∀ §T x + verify HOLD; garnish resets new. `new`+⊥phases (empty stub) → /prep; `done` → /garnish. prep expands ⟺ status ≠ work-in-progress.
Encoding: same symbol set as SPEC.md. Preserve code/paths/ids verbatim.
Executable cold: a phase ⊥ readable without chat history is ⊥ finished.
Full rules: /encode-docs skill.
planning status: new
-->

# PLAN

goal: correct the planning-status state machine (execution-keyed, cook/cater own the wip flip) + simplify the HANDOFF header + gate `BACKLOG.md` to prep-only + extract `## BAKED HEADERS` into a new `encode-header` skill + strip repo-specific SPEC-id citations from skill bodies.

## ground rules
- production quality, verify-driven, evidence-based. skills = markdown only (§C2); ⊥ scripts, ⊥ Python.
- `skills/**` bodies = unwrapped prose (1 line/paragraph), editor soft-wrap; preserve verbatim code fences, tables, baked-header comments, frontmatter, list structure.
- ∀ SPEC/PLAN/HANDOFF write routes through `encode-docs` (sole mutator). durable change only → `SPEC.md` (high bar).
- portability (§C4 corrected this cycle): skill bodies ⊥ add specific numbered SPEC-row citations (`§V<n>`/`§C<n>`/`§I<n>`/`§R<n>`); cite the generic `§V`-mechanism only. Numbered §V citations belong in PLAN.md tasks (repo-internal), ⊥ in skill prose. ∴ impl phases ⊥ introduce new numbered citations into skill bodies; F6 sweeps.
- ∀ touched `SKILL.md` ! stay ≤500 lines (§V4) & valid frontmatter (§V1-3). tests ⊥ assert prose (§C8) ∴ oracle stays green on doc-only edits; a NEW skill dir is auto-picked by contract tests (§V5, `skills.length > 0` — no hard count).
- ∀ phase: name exact grep/test evidence, self-review before commit, refresh `HANDOFF.md` + commit baton.
- oracle = `npm test` → `node --test`; current 7/7 pass. re-find edit sites by quoted string (line numbers drift).
- cook-oriented plan: heavy file overlap (encode-docs/prep/cook/cater/handoff touched by ≥2 phases) → limited cater parallelism. If catering, serialize; F5 ! after F3, F6 ! after F2-F5.
- SPEC already corrected this cycle (prep): §V29 (execution-keyed gate), §V27 (ingest/expand vs defer), §C4 (portability). F2/F4/F6 implement skills to match; §V16/§V20 encode-header reconciliation deferred to F5.
- scope decisions locked (prior turns): HANDOFF header = ONE tests line (⊥ baseline line, ⊥ commit subject); HANDOFF-wording cleanup = HANDOFF-only (⊥ harmonize garnish/review-code/cater output blocks); word `oracle` = canonical full-suite command stays in cook/garnish/review-code, removed ONLY from HANDOFF header.

## existing assets
- SPEC §V27/§V29/§C4 rewritten this cycle → F2/F4/F6 targets; `next: C13 I12 R8 V30` unchanged (all edits in-place).
- Theme D (state machine) sites: `prep`:95 "Set the baked-header `planning status` to `work-in-progress`; that is the gate cook and cater read"; `cook`:22 & `cater`:24 "proceed only on `work-in-progress`; `new` stops and recommends `/prep` (the plan is a stub); `done` stops..."; `encode-docs` PLAN.md-File para "`prep` writes `work-in-progress` when the plan is ready to run, `handoff` sets `done`... cook and cater run only while it reads `work-in-progress`"; `encode-docs` baked PLAN header line "cook/cater run ⟺ work-in-progress; new → stop (/prep)..."; `handoff`:30 "planning status: `done` when every §T row is `x`... else `work-in-progress`".
- Theme A (HANDOFF header) sites: `encode-docs` `## HANDOFF.md File` template lines `branch <name> | last commit <sha> <subject> | tests <green | RED: named>` + `baseline <green | RED: file+test> | oracle <cmd>`; its Rules "Red tests named exactly" + "Baseline ≠ current oracle..."; baked HANDOFF header carry-line "branch | last commit | tests | baseline + oracle command | ..."; `handoff` GATHER bullets (branch/tests + baseline/oracle) + Rules "Red tests..." + "Test state distinguishes baseline from current oracle".
- Theme B+C (BACKLOG) sites: `prep` Load#3 + Hard-outputs#4; LOAD sections of `cook`/`cater`/`review-plan`/`review-code`; `garnish` Procedure + Boundaries; `setup` AGENTS template `## AI File Purpose`; repo `AGENTS.md` `## AI File Purpose` (no BACKLOG line yet).
- Theme E (encode-header) sites: `encode-docs` `## BAKED HEADERS` (3 verbatim templates) + Dispatch; new `skills/encode-header/SKILL.md`; roster: SPEC §G Helpers list, `AGENTS.md` "11 skills" line + `## Skills` support list, `setup` AGENTS template support line, `NOTICE.md` (encode-header = original), `.claude-plugin/marketplace.json` (root auto-scan → confirm no edit).
- Theme F (portability) sites: `handoff`:11 "sole mutator (§V16)" = the ONLY remaining numbered citation across `skills/**`; user already removed `(§V16)` from `encode-docs`:10 (uncommitted working-tree edit + a `description:` reflow — same file F2/F3/F5 touch; commit separately or let an encode-docs phase sweep it).

## phase order
id|goal|depends|exit
F1|research: confirm all edit sites, state-machine semantics, encode-header extraction design, portability grep|-|edit register locked, later phases reconciled
F2|Theme D: correct planning-status state machine (execution-keyed; cook/cater flip)|F1|prep writes new, cook/cater flip new→wip & run on new|wip, encode-docs+handoff aligned; oracle green
F3|Theme A: simplify HANDOFF header (one tests line, sha only, ⊥ oracle/baseline)|F1|grep HANDOFF region ⊥ oracle/baseline/subject/green; owner+gatherer agree; oracle green
F4|Theme B+C: BACKLOG read-gate + prep ingest/defer/blank lifecycle|F1,F2|gated skills ⊥-read line; garnish ⊥-touch; prep lifecycle keyed to §V29 status; oracle green
F5|Theme E: extract `## BAKED HEADERS` → new `encode-header` skill|F1,F3|encode-header skill contract-valid; encode-docs one-line hint; §V16/§V20 reconciled; roster consistent; oracle green
F6|Theme F: strip repo-specific SPEC-id citations from skill bodies|F1,F2,F3,F4,F5|⊥ numbered `§<S><n>` citation in any skills/** body; oracle green
F7|final verify code vs SPEC & PLAN|F2..F6|full suite green, ∀ relevant §V HOLD, result table in HANDOFF

## F1 research
goal: confirm every exact edit site, lock the corrected state-machine semantics + blessed HANDOFF header bytes + encode-header extraction design, and grep the portability surface — then reconcile F2-F6 to reality.
inputs: this PLAN existing-assets; `SPEC.md` §C4/§V4/§V5/§V16/§V20/§V22/§V23/§V27/§V29; user prompts (state-machine bug; encode-header extraction; portability); skills `encode-docs`,`handoff`,`prep`,`cook`,`cater`,`review-plan`,`review-code`,`garnish`,`setup`; `AGENTS.md`,`SPEC.md`,`NOTICE.md`,`.claude-plugin/marketplace.json`,`tests/`.
files: read-only.

§T  TASKS:
T1|.|confirm state-machine sites & semantics
touch: read `prep`,`cook`,`cater`,`handoff`,`encode-docs`
details: capture exact quoted strings at the Theme-D sites. lock corrected semantics per §V29: prep writes/expands `new`; cook/cater ALONE flip `new`→`work-in-progress` at execution start; cook/cater run on `new`(has phases)|`work-in-progress`; `new`+⊥phases (empty stub) → stop/prep; `done` → stop/garnish; handoff sets `done` on completion else leaves as-is. resolve the `new`-ambiguity (empty stub vs ready plan) = presence of phase sections.
verify: quoted anchors captured for each Edit; corrected semantics mapped to §V29 wording.
exit: F2 edit list exact.
next: F1.T2

T2|.|confirm HANDOFF-header + BACKLOG-gate sites
touch: read `encode-docs`,`handoff`,`prep`,`cook`,`cater`,`review-plan`,`review-code`,`garnish`,`setup`,`AGENTS.md`
details: verify Theme-A template/rules/baked-header strings; Theme-B+C LOAD sections, garnish Procedure+Boundaries, prep Load#3/Hard-outputs#4, setup+AGENTS AI-File-Purpose. confirm ingest/defer trigger = §V29 status (wip → defer append-⊥-prune; ≠wip → ingest/expand read+write+blank).
verify: quoted anchors captured; trigger mapping matches §V27/§V29.
exit: F3+F4 edit lists exact.
next: F1.T3

T3|.|confirm encode-header extraction design + reconciliation
touch: read `encode-docs` (`## BAKED HEADERS`+Dispatch+§V16/§V20-touching prose), `NOTICE.md`, `.claude-plugin/marketplace.json`, `tests/skill-contract.test.mjs`, roster sites
details: confirm the 3 baked-header templates to move; design encode-header as content-supplier (encode-docs still sole writer — emits header VIA encode-header). draft §V16 wording (encode-docs sole WRITER; encode-header supplies header format) + §V20 wording (headers emitted verbatim VIA encode-header). confirm marketplace root auto-scan needs ⊥ edit; confirm contract tests auto-cover a new skill dir. list roster touch-points (SPEC §G, AGENTS "11 skills"+support, setup support, NOTICE original-row).
verify: extraction move-list + reconciled §V16/§V20 draft + roster list recorded.
exit: F5 executable cold.
next: F1.T4

T4|.|portability grep + oracle baseline
touch: read `skills/**`; run `npm test`
details: grep `skills/**` for `§[VCIR][0-9]` (numbered citations) → expect only `handoff`:11 now (+ watch for any F2-F5 additions). confirm `encode-docs`:10 §V16 already removed (working tree). run `node --test`, record N/N (expect 7/7).
verify: citation inventory = {handoff:11}; oracle green N/N recorded; ≤500-line headroom noted per touched skill (incl. encode-docs after F5 removes ~50 header lines).
exit: F6 scope pinned; F7 has green baseline.
next: F2.T1

## F2 implement — Theme D: planning-status state machine
goal: make `planning status` track EXECUTION, ⊥ authorship — prep writes `new`, cook/cater alone flip `new`→`work-in-progress` and run on `new`|`work-in-progress`, empty-stub `new` still routes to /prep.
inputs: F1.T1 register; §V29 (already corrected); §V27.
files: `skills/encode-docs/SKILL.md`, `skills/cook/SKILL.md`, `skills/cater/SKILL.md`, `skills/prep/SKILL.md`, `skills/handoff/SKILL.md`, `CHANGELOG.md`.

§T  TASKS:
T1|.|encode-docs: PLAN.md-File para + baked PLAN header
touch: `skills/encode-docs/SKILL.md`
details: rewrite the PLAN.md-File `planning status` paragraph: prep writes/expands `new` (⊥ wip); cook/cater alone flip `new`→`work-in-progress` at execution start; handoff sets `done` on ∀ §T `x`+verify HOLD; garnish resets `new`; cook/cater run on `new`(has phases→flip→wip & start)|`work-in-progress`(resume); `new`+⊥phases → /prep; `done` → /garnish. Rewrite the baked PLAN header `Tracked:` line to match (concise). Preserve everything else.
verify: grep shows the corrected sentences; ⊥ residual "prep writes work-in-progress"; body ≤500 lines.
exit: format owner describes execution-keyed gate.
next: F2.T2

T2|.|cook + cater: LOAD gate + new→wip flip
touch: `skills/cook/SKILL.md`, `skills/cater/SKILL.md`
details: replace LOAD line "proceed only on `work-in-progress`; `new` stops and recommends `/prep`..." with: proceed on `work-in-progress` (resume) OR `new` with executable phases (flip `new`→`work-in-progress` via encode-docs BEFORE first phase, then start); `new` empty stub (⊥ phases) → stop, recommend `/prep`; `done` → stop, recommend `/garnish`. Add the flip step to the execution kickoff (before RUN LOOP / SELECT PHASES). keep numbering/style per each file.
verify: grep both show the flip step + run-on-new|wip gate; ⊥ "proceed only on work-in-progress"; bodies ≤500 lines.
exit: only cook/cater flip to wip.
next: F2.T3

T3|.|prep: write `new`, expand ⟺ ≠wip
touch: `skills/prep/SKILL.md`
details: rewrite prep:95 — set `planning status` to `new` on write/expand (⊥ `work-in-progress`); note cook/cater own the flip to wip. State prep may expand/rewrite ⟺ status ≠ `work-in-progress` (the expand-vs-defer gate; defer detail lands in F4).
verify: grep prep shows "new" write + expand-gate; ⊥ "Set the baked-header planning status to work-in-progress"; body ≤500 lines.
exit: prep no longer prematurely flips wip.
next: F2.T4

T4|.|handoff: done-else-leave
touch: `skills/handoff/SKILL.md`
details: reword handoff:30 — set `done` on ∀ §T `x` + final-verify HOLD; else LEAVE status as-is (cook/cater own the `new`→wip flip); ⊥ "else work-in-progress".
verify: grep handoff shows done-else-leave; ⊥ "else `work-in-progress`"; body ≤500 lines.
exit: handoff ⊥ asserts wip authorship.
next: F2.T5

T5|.|changelog
touch: `CHANGELOG.md`
details: `## [Unreleased]` bullet: planning status now tracks execution — prep writes `new`, only cook/cater flip to work-in-progress; fixes prep wrongly deferring an un-started plan.
verify: entry present.
exit: Theme D recorded.
next: F3.T1

## F3 implement — Theme A: HANDOFF header simplification
goal: collapse the HANDOFF header to one tests line, pass/fail words, sha-only commit, ⊥ oracle keyword — owner + gatherer byte-consistent.
inputs: F1.T2 register; locked scope (one tests line, HANDOFF-only).
files: `skills/encode-docs/SKILL.md`, `skills/handoff/SKILL.md`, `CHANGELOG.md`.

§T  TASKS:
T1|.|encode-docs: HANDOFF template + baked header + rules
touch: `skills/encode-docs/SKILL.md`
details: in `## HANDOFF.md File` template, replace `branch <name> | last commit <sha> <subject> | tests <green | RED: named>` + `baseline <green | RED: file+test> | oracle <cmd>` with single line `branch <name> | last commit <sha> | tests <pass N/N | FAIL: file+case> (<cmd>)`. Rules: "Red tests named exactly" → "Failing tests named exactly (file + case)"; DELETE "Baseline ≠ current oracle..." rule + renumber. Baked HANDOFF header carry-line → `branch | last commit sha (⊥ subject) | tests pass N/N \| FAIL: file+case + command | uncommitted files + why`.
verify: grep the HANDOFF sections ⊥ `oracle`/`baseline`/`<subject>`/`green`; body ≤500 lines.
exit: owner emits one-line HANDOFF header.
next: F3.T2

T2|.|handoff: align gather-list + rules
touch: `skills/handoff/SKILL.md`
details: in `## GATHER`, replace the branch/tests + baseline/oracle bullets with one bullet `- branch | last commit `<sha>` | tests `<pass N/N | FAIL: file+case>` (`<cmd>`)`. Rules: "Red tests named exactly" → "Failing tests named exactly (file + case)"; DELETE "Test state distinguishes baseline from current oracle..." + renumber.
verify: grep handoff ⊥ `oracle`/`baseline`/`<subject>`; gather-line matches encode-docs shape; body ≤500 lines.
exit: gatherer + owner agree.
next: F3.T3

T3|.|changelog
touch: `CHANGELOG.md`
details: `## [Unreleased]` bullet: HANDOFF header simplified — single tests line with pass/fail, commit hash only, dropped baseline/oracle line.
verify: entry present.
exit: Theme A recorded.
next: F4.T1

## F4 implement — Theme B+C: BACKLOG read-gate + prep lifecycle
goal: `BACKLOG.md` = prep-only raw input — gate the 5 non-prep skills, forbid garnish from touching it, give prep ingest/defer/blank keyed to §V29 status, document in setup + live AGENTS.md.
inputs: F1.T2 register; §V27 (corrected), §V29, §V23.
files: `skills/prep/SKILL.md`, `skills/cook`, `skills/cater`, `skills/review-plan`, `skills/review-code`, `skills/garnish/SKILL.md`, `skills/setup/SKILL.md`, `AGENTS.md`, `CHANGELOG.md`.

§T  TASKS:
T1|.|prep: ingest/defer/blank lifecycle
touch: `skills/prep/SKILL.md`
details: Load#3 → read `BACKLOG.md` as input in ingest/expand mode (status ≠ work-in-progress); ⊥ read as new-plan input in defer mode. Hard-outputs#4 → defer (status = work-in-progress) = append user request to `BACKLOG.md`, ⊥ prune, ⊥ clobber plan. Add step: ingest/expand mode blanks `BACKLOG.md` ONLY after `PLAN.md` written (session-limit safety); defer mode ⊥ blank. Boundaries → ⊥ blank `BACKLOG.md` before `PLAN.md` written.
verify: grep prep shows ingest/defer/blank keyed to status; body ≤500 lines.
exit: prep owns full BACKLOG lifecycle.
next: F4.T2

T2|.|cook + cater + review-plan + review-code: LOAD ⊥-read gate
touch: `skills/cook`, `skills/cater`, `skills/review-plan`, `skills/review-code`
details: each LOAD/Load section → one line: ⊥ read `BACKLOG.md` (raw un-ingested prep-only input). keep per-file style/numbering.
verify: grep each of the 4 shows the ⊥-read line; bodies ≤500 lines.
exit: no non-prep executor reads raw BACKLOG.
next: F4.T3

T3|.|garnish: ⊥ read & ⊥ touch BACKLOG
touch: `skills/garnish/SKILL.md`
details: Procedure/LOAD guard: garnish ⊥ read `BACKLOG.md`; Boundaries line: garnish ⊥ blank/prune/delete/touch `BACKLOG.md` (only prep manages it) — garnish blanks ONLY `PLAN.md`+`HANDOFF.md`.
verify: grep garnish shows both guards; body ≤500 lines.
exit: garnish cannot erase a pending backlog.
next: F4.T4

T4|.|setup + AGENTS.md: document BACKLOG
touch: `skills/setup/SKILL.md`, `AGENTS.md`
details: add to setup AGENTS `## AI File Purpose` template AND repo `AGENTS.md` `## AI File Purpose`: `BACKLOG.md` = prep-sole-reader freeform request queue (⊥ encoded); ∀ non-prep skill ⊥ read, garnish ⊥ touch. encoded style consistent with siblings.
verify: grep both AI-File-Purpose blocks show the BACKLOG line.
exit: bootstrapped + live guidance carry the rule.
next: F4.T5

T5|.|changelog
touch: `CHANGELOG.md`
details: `## [Unreleased]` bullet: BACKLOG.md gated to prep-only — others don't read it, garnish never touches it, prep blanks after writing PLAN (ingest) or appends without pruning mid-cycle (defer).
verify: entry present.
exit: Theme B+C recorded.
next: F5.T1

## F5 implement — Theme E: extract `## BAKED HEADERS` → `encode-header`
goal: move the three baked-header templates out of almost-always-loaded `encode-docs` into a new one-time-use support skill `encode-header`; leave a one-line trigger hint; keep encode-docs sole writer.
inputs: F1.T3 design; §V16/§V20 reconciliation draft.
files: NEW `skills/encode-header/SKILL.md`, `skills/encode-docs/SKILL.md`, `SPEC.md` (§V16/§V20/§G via encode-docs), `AGENTS.md`, `skills/setup/SKILL.md`, `NOTICE.md`, `CHANGELOG.md`.

§T  TASKS:
T1|.|create encode-header skill
touch: `skills/encode-header/SKILL.md`
details: new skill, frontmatter `name: encode-header` (== dir), `description` states what+when (emit/refresh baked header for SPEC/PLAN/HANDOFF when a header is missing or a format update is requested — auto-invocation driver). body = the 3 verbatim baked-header templates (moved from encode-docs, already-simplified HANDOFF header from F3) + guidance that encode-docs emits them verbatim; encode-header supplies, encode-docs writes. ⊥ specific numbered citations (§C4).
verify: `npm test` picks it up green (§V1-5); body ≤500 lines; name==dir.
exit: header templates own their skill.
next: F5.T2

T2|.|encode-docs: remove BAKED HEADERS, leave one-line hint + reconcile Dispatch
touch: `skills/encode-docs/SKILL.md`
details: delete the `## BAKED HEADERS` section body; leave ONE line: when a doc's baked header is missing or a header/format update is requested → trigger `encode-header` to emit it verbatim. update Dispatch/NEW-mode steps that said "emit the baked header verbatim" to route via `encode-header`. keep encode-docs the sole writer.
verify: grep encode-docs ⊥ the 3 template bodies; the one-line hint present; body materially shorter, ≤500 lines.
exit: hot-path skill slimmed.
next: F5.T3

T3|.|SPEC §V16/§V20/§G reconcile (via encode-docs)
touch: `SPEC.md`
details: hand encode-docs the edits: §V16 → encode-docs = sole WRITER/mutator of the 3 docs; `encode-header` supplies baked-header format (content-supplier, like prep/handoff). §V20 → 3 docs open with baked header emitted verbatim VIA `encode-header`. §G Helpers list → add `encode-header`. edit-in-place (no new id).
verify: §V16/§V20/§G updated; `next:` unchanged.
exit: durable truth matches the extraction.
next: F5.T4

T4|.|roster updates
touch: `AGENTS.md`, `skills/setup/SKILL.md`, `NOTICE.md`
details: `AGENTS.md` "11 skills" → 12, add `encode-header` to own-list + `## Skills` support line. `setup` AGENTS template support line → add `encode-header`. `NOTICE.md` → original-skill provenance row for `encode-header` if the file records originals. confirm `.claude-plugin/marketplace.json` needs ⊥ edit (root auto-scan).
verify: rosters name `encode-header`; count consistent; marketplace unchanged (evidence).
exit: roster coherent.
next: F5.T5

T5|.|changelog
touch: `CHANGELOG.md`
details: `## [Unreleased]` bullet: baked headers extracted into new `encode-header` skill to slim encode-docs hot-path; encode-docs triggers it when a header is missing or a format update is requested.
verify: entry present.
exit: Theme E recorded.
next: F6.T1

## F6 implement — Theme F: portability audit
goal: no skill body cites a repo-specific numbered SPEC row; skills stay portable (§C4 corrected).
inputs: F1.T4 inventory ({handoff:11} + any F2-F5 additions).
files: `skills/handoff/SKILL.md`, any skill a re-grep flags, `CHANGELOG.md`.

§T  TASKS:
T1|.|strip numbered citations
touch: `skills/handoff/SKILL.md` (+ any flagged)
details: reword handoff:11 "the sole mutator (§V16): it owns the format" → drop `(§V16)`, keep the self-contained statement ("`encode-docs` is the sole mutator: it owns the format and performs the write"). re-grep `skills/**` for `§[VCIR][0-9]`; strip/reword every hit; keep generic `§V`-mechanism references.
verify: grep `skills/**` for `§[VCIR][0-9]` → ⊥ match; each edited statement still self-contained; bodies ≤500 lines.
exit: skills portable.
next: F6.T2

T2|.|changelog
touch: `CHANGELOG.md`
details: `## [Unreleased]` bullet: skill bodies no longer cite repo-specific SPEC ids (portability).
verify: entry present.
exit: Theme F recorded.
next: F7.T1

## F7 final verify
goal: prove code matches SPEC & PLAN — tests green, every relevant §V classified HOLD with evidence, drift named & resolved.
inputs: `SPEC.md` §C4/§V4/§V5/§V11/§V16/§V20/§V22/§V23/§V27/§V29; F2-F6 diffs; oracle `npm test`.
files: read-only sweep; write result table to `HANDOFF.md` via encode-docs.

§T  TASKS:
T1|.|invariant classification + oracle
touch: read `SPEC.md`, `skills/**`, `AGENTS.md`, `NOTICE.md`; run `npm test`
details: run `node --test`, expect 8/8-ish green (new skill adds coverage, ⊥ failures). classify §C4 (⊥ numbered citation in skills), §V4 (≤500 lines), §V5 (encode-header discoverable), §V11 (Unreleased), §V16/§V20 (encode-header supplies, encode-docs writes), §V27/§V29 (BACKLOG + state machine), as HOLD | VIOLATE | UNVERIFIABLE with file/grep/test evidence.
verify: each row cites file:line or test.
exit: all relevant §V = HOLD or drift named.
next: F7.T2

T2|.|coherence + leftover sweep
touch: read `encode-docs`,`handoff`,`cook`,`cater`,`prep`,`garnish`,`encode-header`
details: confirm ⊥ residual "prep writes work-in-progress" / "proceed only on work-in-progress" / HANDOFF-header `oracle`/`baseline`/`<subject>`/`green` / `§<S><n>` citation. confirm cook/cater flip logic unambiguous & matches §V29 (incl. empty-stub → /prep). confirm garnish "recorded oracle" (precond) still resolves to the tests-line command (no dropped-field dependency; note, ⊥ fix unless real break). confirm encode-docs→encode-header trigger hint present & §V16/§V20 coherent. confirm no skill body reimplements another's rule (self-sufficiency).
verify: each check cites evidence; residual inconsistency named with fix-or-accept.
exit: no silent drift.
next: F7.T3

T3|.|record result table
touch: `HANDOFF.md` (via encode-docs)
details: write final verification table (item|status|evidence|decision); flip §T rows to `x`; set `planning status: done` when all HOLD.
verify: table complete; planning status `done`.
exit: cycle ready for `/garnish`.
next: `/garnish`
