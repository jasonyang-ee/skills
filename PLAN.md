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

goal: make SPEC pipe tables render as real markdown (delimiter row), correct the planning-status state machine (execution-keyed; cook/cater own the wip flip), simplify the HANDOFF header, gate `BACKLOG.md` to prep-only, and create the advertised-but-missing `encode-header` skill by extracting `## BAKED HEADERS` out of `encode-docs`.

## ground rules
- production quality, verify-driven, evidence-based. skills = markdown only; ⊥ scripts, ⊥ Python, ⊥ runtime deps.
- `skills/**` bodies = unwrapped prose (1 line/paragraph), editor soft-wrap; preserve verbatim code fences, tables, baked-header comments, frontmatter, list structure.
- ∀ `SPEC.md`/`PLAN.md`/`HANDOFF.md` write routes through `encode-docs` (sole mutator). durable row change → high bar; this cycle's ONLY planned SPEC row edit = §V16/§V20 in F6.
- portability: skill BODIES ⊥ cite numbered SPEC rows (`§V<n>`/`§C<n>`/`§I<n>`/`§R<n>`) — cite the generic `§V` mechanism only. Numbered ids appear in PLAN tasks (repo-internal) ⊥ in skill prose. Current inventory = ⊥ hits; F7 re-greps to keep it that way.
- ∀ touched `SKILL.md` ! stay ≤500 lines & keep valid frontmatter (`name` == dir, non-empty `description`). tests ⊥ assert doc prose ∴ oracle stays green on doc-only edits; a NEW skill dir is auto-covered by the contract tests (no hard skill count asserted).
- ∀ phase: name exact grep/test evidence, self-review before commit, refresh `HANDOFF.md` + commit the baton.
- oracle = `npm test` → `node --test`; baseline 7/7 pass (requires `npm install` first — `node_modules` was absent this session; that is env setup, ⊥ a repo defect).
- re-find every edit site by quoted string, ⊥ by line number (numbers drift as phases land).
- cook-oriented plan: `skills/encode-docs/SKILL.md` is touched by F2, F3, F4, F6 and `skills/prep/SKILL.md` by F3, F5 → serialize. If catering, F6 ! run after F2+F3+F4 (it moves the headers those phases rewrite).
- scope locked with user this run: delimiter rows land in the **SPEC tables only** (§C/§I/§R/§V) — PLAN phase-order and HANDOFF final-verification templates stay as-is; canonical form = `|---|---|` (one cell per column).
- scope locked earlier: HANDOFF header = ONE tests line (⊥ baseline line, ⊥ commit subject); the word `oracle` stays as the canonical full-suite-command term in `cook`/`cater`/`garnish`/`review-code`, removed ONLY from the HANDOFF header + `handoff`/`encode-docs` HANDOFF rules.

## existing assets
- oracle green 7/7 after `npm install` (`js-yaml` missing before). tree clean @ `bec4fbe`.
- SPEC §V27 (BACKLOG lifecycle), §V29 (execution-keyed status), §C4 (portability) ALREADY corrected + committed → F3/F5 implement the skills to match; ⊥ SPEC edit needed for those themes. `next: C13 I12 R8 V30`.
- Theme F (portability) from the prior plan is ALREADY DONE: `git grep -n "§[VCIRGT][0-9]" -- skills/` → ⊥ match. Dropped from this plan; F7 only re-verifies.
- **live drift**: `skills/encode-header/` does ⊥ exist, but `README.md`:90 links `skills/encode-header/SKILL.md` (dead link), `AGENTS.md`:7 says "12 skills" + :28 support list, `SPEC.md` §G Helpers, and `skills/setup/SKILL.md`:48 all name it. `## BAKED HEADERS` is still in `encode-docs`:277-330. F6 closes this.
- Theme G (delimiter) sites: `encode-docs` `### Section skeleton` prose ("Pipe table using `|`, Fixed order, fixed headers, addressable, escape a literal `|` as `\|`.") + its 4 fenced table headers `id|description` / `id|type|shape → output,purpose,condition` / `id|claim|source` / `id|invariant definition`; SPEC baked-header line "Tables (§C/§I/§R/§V): pipe-delimited, id-keyed. Escape literal \| . Empty cell = -"; live `SPEC.md` header line 8 (same string); `setup` AGENTS template + repo `AGENTS.md` line "Tables use `|`; escape literal `\|`.". Live `SPEC.md` BODY tables already carry delimiter rows (user hand-edit @ `ab9ae1a`) ∴ ⊥ body edit needed.
- Theme D (state machine) sites: `prep`:94 "Set the baked-header `planning status` to `work-in-progress`; that is the gate `cook` and `cater` read before executing a phase."; `cook`:22 & `cater`:24 (identical clause) "read its baked-header `planning status`: proceed only on `work-in-progress`; `new` stops and recommends `/prep` (the plan is a stub); `done` stops and recommends `/garnish` (the cycle is complete)."; `encode-docs`:188 PLAN.md-File para "`prep` writes `work-in-progress` when the plan is ready to run ... `cook` and `cater` run only while it reads `work-in-progress`"; `encode-docs`:308 baked PLAN header "Tracked: planning status ∈ {new, work-in-progress, done}. cook/cater run ⟺ work-in-progress; new → stop (/prep); done → stop (/garnish)."; `handoff`:30 "planning status: `done` ... else `work-in-progress`". THIS file's baked header already carries the corrected wording → F3 syncs `encode-docs` to it.
- Theme A (HANDOFF header) sites: `encode-docs`:241-242 template lines `branch <name> | last commit <sha> <subject> | tests <green | RED: named>` + `baseline <green | RED: file+test> | oracle <cmd>`; `encode-docs`:270 rule 2 "Red tests named exactly", :271 rule 3 "Baseline ≠ current oracle; each carries its exact command."; `encode-docs`:322 baked HANDOFF carry-line; `handoff`:24-25 GATHER bullets, :38 rule 3 "Test state distinguishes baseline from current oracle".
- Theme B+C (BACKLOG) sites: `prep`:41 Hard-outputs#4 + :49 Load#3; LOAD sections — `cook`:19, `cater`:21, `review-plan`:17, `review-code`:25; `garnish` `## Procedure`:21 + `## Boundaries`:52. `setup`:37 and `AGENTS.md`:14 ALREADY carry the AI-File-Purpose BACKLOG line → ⊥ re-edit.
- Theme E (encode-header) sites: `encode-docs`:277-330 `## BAKED HEADERS` (3 verbatim templates) + `### NEW` step 1 "Emit the SPEC baked header verbatim as the first bytes of the file." + `### Dispatch` "Every mode that writes `SPEC.md` must leave the baked header present."; `NOTICE.md` `## Modifications:` table (lists vendored/derived only — originals like `cook`/`garnish` have ⊥ row); `.claude-plugin/marketplace.json` root auto-scan (expected ⊥ edit).
- body line counts (headroom to 500): `encode-docs` 344, `prep` 151, `review-code` 126, `cater` 125, `review-plan` 118, `setup` 103, `cook` 70, `garnish` 59, `handoff` 45.
- `garnish`:18 + :33 say "the recorded oracle and full-suite command" — after F4 drops the labeled `oracle <cmd>` field this must still resolve to the `(<cmd>)` inside the tests line. F7 checks, ⊥ pre-emptive edit.

## phase order
id|goal|depends|exit
|---|---|---|---|
F1|research: confirm every edit site verbatim, lock delimiter bytes, state-machine semantics, encode-header extraction design + §V16/§V20 wording|-|edit register locked, F2-F6 reconciled to reality
F2|Theme G: SPEC pipe tables get a GFM delimiter row|F1|encode-docs §C/§I/§R/§V skeletons + SPEC baked header + setup/AGENTS guidance all state the delimiter row; oracle green
F3|Theme D: planning status keyed to EXECUTION (cook/cater own the new→wip flip)|F1|prep writes `new`, cook/cater flip + run on new\|wip, encode-docs + handoff aligned; oracle green
F4|Theme A: HANDOFF header → one tests line|F1|HANDOFF template/rules/baked header ⊥ `oracle`/`baseline`/`<subject>`/`green`; owner + gatherer agree; oracle green
F5|Theme B+C: BACKLOG read-gate + prep ingest/defer/blank lifecycle|F1,F3|4 executors + garnish carry the ⊥-read gate, garnish ⊥-touch, prep lifecycle keyed to status; oracle green
F6|Theme E: create `encode-header`, extract `## BAKED HEADERS` out of `encode-docs`|F1,F2,F3,F4|skill exists + contract-valid, README link live, §V16/§V20 reconciled, encode-docs slimmed; oracle green
F7|final verify code vs SPEC & PLAN|F2..F6|full suite green, ∀ relevant §V HOLD with evidence, result table in HANDOFF

## F1 research
goal: confirm every exact edit site by quoted string, lock the delimiter bytes + corrected state-machine semantics + simplified HANDOFF header + `encode-header` extraction design, then reconcile F2-F6 to what is actually in the tree.
inputs: this PLAN existing-assets; `SPEC.md` §C4/§V4/§V5/§V10/§V16/§V20/§V22/§V23/§V27/§V28/§V29; user rulings this run (delimiter = SPEC tables only, form `|---|---|`; all four themes in scope); skills `encode-docs`,`handoff`,`prep`,`cook`,`cater`,`review-plan`,`review-code`,`garnish`,`setup`; `AGENTS.md`,`README.md`,`SPEC.md`,`NOTICE.md`,`.claude-plugin/marketplace.json`,`tests/`.
files: read-only.

§T  TASKS:
T1|.|lock delimiter bytes + Theme G sites
touch: read `skills/encode-docs/SKILL.md` (`### Section skeleton`, `## BAKED HEADERS` SPEC block), `SPEC.md`, `skills/setup/SKILL.md`, `AGENTS.md`
details: capture the 4 fenced SPEC table headers verbatim and derive each delimiter row by column count — `id|description` → `|---|---|`; `id|type|shape → output,purpose,condition` → `|---|---|---|`; `id|claim|source` → `|---|---|---|`; `id|invariant definition` → `|---|---|`. Confirm GFM validity: header row cell count == delimiter row cell count (leading/trailing pipes optional and may differ between the two rows). Confirm the PLAN phase-order and HANDOFF final-verification templates are OUT of scope per the user ruling. Confirm live `SPEC.md` body tables already carry delimiter rows ∴ only the header line + templates change.
verify: 4 header/delimiter pairs recorded verbatim; out-of-scope tables named; live-SPEC-body-already-done confirmed by read.
exit: F2 edit list exact.
next: F1.T2

T2|.|confirm state-machine + HANDOFF-header sites & semantics
touch: read `skills/prep/SKILL.md`, `skills/cook/SKILL.md`, `skills/cater/SKILL.md`, `skills/handoff/SKILL.md`, `skills/encode-docs/SKILL.md`
details: capture the Theme-D and Theme-A quoted anchors listed in existing assets. Lock corrected semantics against §V29: prep writes/expands `new`; `cook`|`cater` ALONE flip `new`→`work-in-progress` at execution start; they run on `new` WITH executable phases (flip then start) or `work-in-progress` (resume); `new` with ⊥ phases (empty stub) → stop, recommend `/prep`; `done` → stop, recommend `/garnish`; `handoff` sets `done` on ∀ §T `x` + final-verify HOLD, else leaves the value untouched. Resolve the `new` ambiguity explicitly: the discriminator is presence of phase sections, ⊥ task status. For Theme A lock the replacement line bytes: `branch <name> | last commit <sha> | tests <pass N/N | FAIL: file+case> (<cmd>)`.
verify: every Theme-D/Theme-A anchor captured verbatim; semantics mapped clause-by-clause to §V29; replacement header line recorded.
exit: F3 + F4 edit lists exact.
next: F1.T3

T3|.|confirm BACKLOG gate sites + prep lifecycle trigger
touch: read `skills/prep/SKILL.md`, `skills/cook/SKILL.md`, `skills/cater/SKILL.md`, `skills/review-plan/SKILL.md`, `skills/review-code/SKILL.md`, `skills/garnish/SKILL.md`, `skills/setup/SKILL.md`, `AGENTS.md`
details: capture each LOAD/Load section shape (numbering + style differ per file) so the ⊥-read line matches local convention. Capture `garnish` `## Procedure` + `## Boundaries` insertion points. Confirm against §V27 that the prep mode gate is the §V29 status: status ≠ `work-in-progress` → ingest/expand (read `BACKLOG.md` as input, write `PLAN.md`, THEN blank `BACKLOG.md`); status == `work-in-progress` → defer (append the request to `BACKLOG.md`, ⊥ prune, ⊥ clobber the in-flight plan). Confirm `setup`:37 + `AGENTS.md`:14 already carry the AI-File-Purpose line ∴ ⊥ re-edit.
verify: 5 insertion points recorded with local numbering; prep mode gate mapped to §V27+§V29; already-done sites confirmed.
exit: F5 executable cold.
next: F1.T4

T4|.|confirm encode-header extraction design + reconciliation + licence accounting
touch: read `skills/encode-docs/SKILL.md` (`## BAKED HEADERS`, `### Dispatch`, `### NEW`), `NOTICE.md`, `README.md`, `.claude-plugin/marketplace.json`, `tests/`
details: confirm the 3 templates to move and that moving them leaves `encode-docs` coherent (`### NEW` step 1 and `### Dispatch` must route via `encode-header` instead of holding the bytes). Fix the ownership split: `encode-header` SUPPLIES the header format, `encode-docs` remains the sole WRITER — this keeps §V16 true and satisfies §V28 (a skill may reference another only when that other is guaranteed co-loaded; `encode-docs` invokes `encode-header` on compose). Draft the exact §V16 and §V20 replacement wording. Decide whether the baked headers' trailing `Full rules: /encode-docs skill.` line stays pointing at `encode-docs` (doc format lives there) — expected yes, record the reasoning. Decide the §V10 accounting for `encode-header`: `NOTICE.md` lists vendored/derived skills only (`cook`/`cater`/`garnish`/`setup`/`handoff`/`review-code` have ⊥ row), but the moved SPEC-header content descends from the `caveman`+`spec` derivation already recorded for `encode-docs` → default DECISION = add a `NOTICE.md` row for `skills/encode-header/` mirroring the `encode-docs` provenance; record the alternative (treat as original, ⊥ row) and why it was rejected. Confirm the contract tests auto-cover a new skill dir (no hard skill count) and that `.claude-plugin/marketplace.json` root auto-scan needs ⊥ edit.
verify: move-list + reconciled §V16/§V20 draft + NOTICE decision + test/marketplace evidence all recorded.
exit: F6 executable cold.
next: F1.T5

T5|.|oracle baseline + portability inventory
touch: run `npm install` then `npm test`; `git grep -n "§[VCIRGT][0-9]" -- skills/`
details: record the pass count (expect 7/7). Record the numbered-citation inventory (expect ⊥ match) as the F7 regression baseline — F2-F6 ! ⊥ introduce new numbered citations into skill bodies. Note the ≤500-line headroom for every skill F2-F6 touches, including `encode-docs` after F6 removes ~54 header lines.
verify: `N/N` pass recorded; grep output recorded; headroom table recorded.
exit: F7 has a green baseline and a citation baseline.
next: F2.T1

## F2 implement — Theme G: SPEC pipe tables get a delimiter row
goal: every SPEC table template emits a GFM delimiter row under its header so generated `SPEC.md` files render as real tables on GitHub — and a fresh repo bootstrapped by `setup` gets the same shape.
inputs: F1.T1 register; user ruling (SPEC tables only; form `|---|---|`); §V16 (encode-docs owns the format), §V17 (SPEC sections fixed), §V20 (baked headers verbatim), §V4 (≤500 lines).
files: `skills/encode-docs/SKILL.md`, `SPEC.md` (baked-header refresh via `encode-docs`), `skills/setup/SKILL.md`, `AGENTS.md`, `CHANGELOG.md`.

§T  TASKS:
T1|.|encode-docs: Section skeleton delimiter rows + prose
touch: `skills/encode-docs/SKILL.md`
details: in `### Section skeleton`, insert the delimiter row directly under each of the 4 table headers inside the fenced block — `|---|---|` under `id|description`, `|---|---|---|` under `id|type|shape → output,purpose,condition`, `|---|---|---|` under `id|claim|source`, `|---|---|` under `id|invariant definition`. Extend the section's lead prose so the rule is stated, ⊥ only demonstrated: the header row is ! followed by a GFM delimiter row with one cell per column. Leave the PLAN phase-order and HANDOFF final-verification templates untouched (out of scope). ⊥ numbered SPEC-row citations.
verify: `grep -n "|---|" skills/encode-docs/SKILL.md` → 4 hits, all inside `### Section skeleton`; prose states the rule; PLAN/HANDOFF templates unchanged in the diff; body ≤500 lines.
exit: the SPEC skeleton emits valid markdown tables.
next: F2.T2

T2|.|SPEC baked header line (template + live file)
touch: `skills/encode-docs/SKILL.md` (`## BAKED HEADERS` SPEC block), `SPEC.md` (via `encode-docs`)
details: rewrite the line `Tables (§C/§I/§R/§V): pipe-delimited, id-keyed. Escape literal \| . Empty cell = -` to also require the delimiter row, e.g. `Tables (§C/§I/§R/§V): pipe-delimited, id-keyed; header row + GFM delimiter row (|---|---|), one cell per column. Escape literal \| . Empty cell = -`. Apply the SAME bytes to the live `SPEC.md` baked header (header refresh only — ⊥ row add, ⊥ row prune, `next:` untouched). Keep it a single line inside the HTML comment.
verify: template line and live `SPEC.md` line 8 byte-identical; `SPEC.md` `next: C13 I12 R8 V30` unchanged; ⊥ §G/§C/§I/§R/§V row diff.
exit: the self-describing header teaches the delimiter rule to a cold agent.
next: F2.T3

T3|.|setup + AGENTS.md table guidance
touch: `skills/setup/SKILL.md`, `AGENTS.md`
details: in the `setup` AGENTS template `## Encoding Symbols` block AND the repo `AGENTS.md` `## SYMBOLS` block, extend the line `Tables use `|`; escape literal `\|`.` to state that SPEC `§C`/`§I`/`§R`/`§V` tables carry a GFM delimiter row (`|---|---|`) under the header. Keep both wordings consistent with each other and encoded in the sibling style. `setup` still never writes `SPEC.md` directly — `encode-docs` NEW mode does, and F2.T1+T2 already fixed that path.
verify: `grep -n "|---|" skills/setup/SKILL.md AGENTS.md` → 1 hit each; the two sentences agree; `skills/setup/SKILL.md` body ≤500 lines.
exit: a repo bootstrapped by `setup` inherits the rule.
next: F2.T4

T4|.|changelog
touch: `CHANGELOG.md`
details: add a `## [Unreleased]` bullet in plain English: SPEC tables now include the markdown delimiter row under the header, so generated `SPEC.md` files render as real tables on GitHub instead of a wall of pipes; `setup` and the baked header teach the same rule.
verify: entry present under `## [Unreleased]`.
exit: Theme G recorded.
next: F3.T1

## F3 implement — Theme D: planning-status state machine
goal: make `planning status` track EXECUTION, ⊥ authorship — `prep` writes `new`, `cook`|`cater` ALONE flip `new`→`work-in-progress` and run on `new`|`work-in-progress`, an empty-stub `new` still routes to `/prep`.
inputs: F1.T2 register; §V29 (already correct in `SPEC.md`); §V27; this file's baked header (already carries the corrected wording).
files: `skills/encode-docs/SKILL.md`, `skills/cook/SKILL.md`, `skills/cater/SKILL.md`, `skills/prep/SKILL.md`, `skills/handoff/SKILL.md`, `CHANGELOG.md`.

§T  TASKS:
T1|.|encode-docs: PLAN.md-File paragraph + baked PLAN header
touch: `skills/encode-docs/SKILL.md`
details: rewrite the `## PLAN.md File` `planning status` paragraph to the corrected machine — `prep` writes/expands `new` (never `work-in-progress`); `cook`|`cater` alone flip `new`→`work-in-progress` at execution start; `handoff` sets `done` once every `§T` row is `x` and final verification holds; `garnish` resets to `new` when it blanks the file; `cook`|`cater` run on `new` that has executable phases (flip, then start) or `work-in-progress` (resume); `new` with no phases is an empty stub → `/prep`; `done` → `/garnish`. Rewrite the baked PLAN header `Tracked:` line to the same machine, compressed — the live `PLAN.md` header in this repo already carries acceptable wording; sync the template TO it rather than inventing a third phrasing.
verify: `grep -n "prep writes .work-in-progress" skills/encode-docs/SKILL.md` → ⊥ match; the paragraph and the baked `Tracked:` line describe the same machine; template `Tracked:` line matches this file's header semantics; body ≤500 lines.
exit: the format owner describes an execution-keyed gate.
next: F3.T2

T2|.|cook + cater: LOAD gate + the new→wip flip
touch: `skills/cook/SKILL.md`, `skills/cater/SKILL.md`
details: replace the identical clause "proceed only on `work-in-progress`; `new` stops and recommends `/prep` (the plan is a stub); `done` stops and recommends `/garnish` (the cycle is complete)" in each LOAD section with: proceed on `work-in-progress` (resume) OR on `new` that carries executable phase sections — in the `new` case flip `new`→`work-in-progress` through `encode-docs` BEFORE starting the first phase; `new` with no phase sections is an empty stub → stop and recommend `/prep`; `done` → stop and recommend `/garnish`. Add the flip as an explicit step in each file's execution kickoff (`cook` `## PICK PHASE`/`## RUN LOOP`, `cater` `## SELECT PHASES TO DISPATCH`) so the gate and the mutation are ⊥ separated. Match each file's own numbering and prose style; keep both statements self-sufficient (⊥ "see cook").
verify: `grep -n "proceed only on" skills/cook/SKILL.md skills/cater/SKILL.md` → ⊥ match; each file shows both the run-on-`new`|`wip` gate and the flip step; the empty-stub discriminator is phase presence; bodies ≤500 lines.
exit: only `cook`|`cater` write `work-in-progress`.
next: F3.T3

T3|.|prep: write `new`, expand ⟺ status ≠ wip
touch: `skills/prep/SKILL.md`
details: rewrite the `### 4. Draft `PLAN.md`` sentence "Set the baked-header `planning status` to `work-in-progress`; that is the gate `cook` and `cater` read before executing a phase." → set it to `new` on write or expand, and note that `cook`|`cater` own the flip to `work-in-progress` at execution start. State the authorship gate: `prep` may expand or rewrite a plan ⟺ its status is ≠ `work-in-progress` (the defer branch itself lands in F5.T1).
verify: `grep -n "planning status" skills/prep/SKILL.md` shows the `new` write + the expand gate; ⊥ "Set the baked-header `planning status` to `work-in-progress`"; body ≤500 lines.
exit: `prep` ⊥ prematurely marks an unstarted plan as running.
next: F3.T4

T4|.|handoff: done-else-leave
touch: `skills/handoff/SKILL.md`
details: reword "planning status: `done` when every `§T` row is `x` and the final-verify table holds; else `work-in-progress`." → `done` under the same condition, otherwise LEAVE the value as-is, because `cook`|`cater` own the `new`→`work-in-progress` flip. Keep the "hand the flip to `encode-docs` with the baton" clause.
verify: `grep -n "work-in-progress" skills/handoff/SKILL.md` shows ⊥ "else `work-in-progress`"; the done-else-leave rule is explicit; body ≤500 lines.
exit: `handoff` ⊥ claims wip authorship.
next: F3.T5

T5|.|changelog
touch: `CHANGELOG.md`
details: add a `## [Unreleased]` bullet in plain English: the planning status now tracks execution rather than authorship — `prep` leaves a freshly written plan as `new` and only `cook`/`cater` mark it work-in-progress when they actually start, which fixes `prep` refusing to expand a plan nobody had begun.
verify: entry present.
exit: Theme D recorded.
next: F4.T1

## F4 implement — Theme A: HANDOFF header simplification
goal: collapse the HANDOFF header to one tests line with pass/fail wording, a commit hash without its subject, and ⊥ separate baseline/oracle line — with the format owner (`encode-docs`) and the gatherer (`handoff`) byte-consistent.
inputs: F1.T2 register; locked scope (one tests line; HANDOFF-only — ⊥ harmonize the `garnish`/`review-code`/`cater` output blocks); §V19 (HANDOFF = session baton, writes route through `encode-docs`), §V20 (baked header verbatim), §V16, §V4.
files: `skills/encode-docs/SKILL.md`, `skills/handoff/SKILL.md`, `CHANGELOG.md`.

§T  TASKS:
T1|.|encode-docs: HANDOFF template + rules + baked header
touch: `skills/encode-docs/SKILL.md`
details: in the `## HANDOFF.md File` fenced template, replace the two lines `branch <name> | last commit <sha> <subject> | tests <green | RED: named>` and `baseline <green | RED: file+test> | oracle <cmd>` with the single line `branch <name> | last commit <sha> | tests <pass N/N | FAIL: file+case> (<cmd>)`. In the Rules list, reword "Red tests named exactly — file + test name — ⊥ \"some failing\"." to "Failing tests named exactly — file + case — ⊥ \"some failing\"." and DELETE "Baseline ≠ current oracle; each carries its exact command.", renumbering the remaining rules. Rewrite the baked HANDOFF header carry-line to `Header ! carry: branch | last commit sha (⊥ subject) | tests pass N/N \| FAIL: file+case + command | uncommitted files + why` and align the header's "Red tests ! named exactly" line with the reworded rule.
verify: `grep -n -i "oracle\|baseline" skills/encode-docs/SKILL.md` → ⊥ hit inside `## HANDOFF.md File` or the HANDOFF baked header; ⊥ `<subject>`; rules renumbered contiguously; body ≤500 lines.
exit: the owner emits a one-line HANDOFF header.
next: F4.T2

T2|.|handoff: align GATHER list + rules
touch: `skills/handoff/SKILL.md`
details: in `## GATHER → hand to encode-docs`, replace the branch/tests bullet and the `baseline ... | oracle ...` bullet with one bullet matching the F4.T1 shape: branch, last commit sha, and one tests field carrying `pass N/N` or `FAIL: file+case` plus the command in parentheses. In `## RULES`, apply the same "Failing tests named exactly (file + case)" wording and DELETE "Test state distinguishes baseline from current oracle — each with its exact command and named failures.", renumbering.
verify: `grep -n -i "oracle\|baseline" skills/handoff/SKILL.md` → ⊥ match; the gather bullet and the `encode-docs` template describe the same fields in the same order; body ≤500 lines.
exit: gatherer and owner agree on the header bytes.
next: F4.T3

T3|.|changelog
touch: `CHANGELOG.md`
details: add a `## [Unreleased]` bullet in plain English: the handoff header is now one line for test state — pass count or the exact failing file and case plus the command — and records only the commit hash, dropping the separate baseline/oracle line that repeated the same fact.
verify: entry present.
exit: Theme A recorded.
next: F5.T1

## F5 implement — Theme B+C: BACKLOG read-gate + prep lifecycle
goal: `BACKLOG.md` becomes raw prep-only input — the four executors and `garnish` never read it, `garnish` never touches it, and `prep` owns a full ingest/defer/blank lifecycle keyed to the plan's status.
inputs: F1.T3 register; §V27, §V29, §V23.
files: `skills/prep/SKILL.md`, `skills/cook/SKILL.md`, `skills/cater/SKILL.md`, `skills/review-plan/SKILL.md`, `skills/review-code/SKILL.md`, `skills/garnish/SKILL.md`, `CHANGELOG.md`.

§T  TASKS:
T1|.|prep: ingest / defer / blank lifecycle
touch: `skills/prep/SKILL.md`
details: rewrite Load step 3 ("Read `BACKLOG.md` if it exists, and treat it as part of the user request.") so it applies in ingest/expand mode only — that is, when `PLAN.md` status is ≠ `work-in-progress`. Rewrite Hard-outputs item 4 so it states BOTH branches: defer mode (status == `work-in-progress`) appends the distilled request to `BACKLOG.md` without pruning it and without clobbering the in-flight plan; ingest/expand mode reads it as input and blanks it ONLY after `PLAN.md` has been written — blanking earlier risks losing the request if the session dies. Add the matching Boundaries line: never blank `BACKLOG.md` before `PLAN.md` is written. Keep `BACKLOG.md` freeform and un-encoded.
verify: `grep -n "BACKLOG" skills/prep/SKILL.md` shows both modes, the status gate, and the blank-after-write ordering; body ≤500 lines.
exit: `prep` owns the whole BACKLOG lifecycle.
next: F5.T2

T2|.|cook + cater + review-plan + review-code: LOAD ⊥-read gate
touch: `skills/cook/SKILL.md`, `skills/cater/SKILL.md`, `skills/review-plan/SKILL.md`, `skills/review-code/SKILL.md`
details: add one line to each LOAD/Load section: do ⊥ read `BACKLOG.md` — it is raw, un-ingested `prep`-only input, and acting on it would execute work the plan never approved. Match each file's own numbering and prose style; keep each statement self-sufficient.
verify: `grep -n "BACKLOG" skills/cook/SKILL.md skills/cater/SKILL.md skills/review-plan/SKILL.md skills/review-code/SKILL.md` → ≥1 hit per file, each in the LOAD section; bodies ≤500 lines.
exit: no non-`prep` executor reads raw backlog.
next: F5.T3

T3|.|garnish: ⊥ read & ⊥ touch BACKLOG
touch: `skills/garnish/SKILL.md`
details: add a `## Procedure` guard that `garnish` does ⊥ read `BACKLOG.md`, and a `## Boundaries` line that it ⊥ blanks, prunes, deletes, or otherwise touches `BACKLOG.md` — only `prep` manages that file; `garnish` blanks `PLAN.md` and `HANDOFF.md` only. This closes the failure mode where closing a cycle silently erases a pending request.
verify: `grep -n "BACKLOG" skills/garnish/SKILL.md` → both guards present, one in `## Procedure` and one in `## Boundaries`; body ≤500 lines.
exit: `garnish` cannot erase a pending backlog.
next: F5.T4

T4|.|changelog
touch: `CHANGELOG.md`
details: add a `## [Unreleased]` bullet in plain English: `BACKLOG.md` is now strictly `prep`'s input — the execution and review skills leave it alone, `garnish` never clears it, and `prep` either folds it into a new plan (clearing it only after the plan is written) or appends to it when a plan is already running.
verify: entry present.
exit: Theme B+C recorded.
next: F6.T1

## F6 implement — Theme E: create `encode-header`, extract `## BAKED HEADERS`
goal: ship the skill the repo already advertises — move the three baked-header templates out of the almost-always-loaded `encode-docs` into a one-time-use support skill, leave a trigger hint behind, keep `encode-docs` the sole writer, and fix the dead `README.md` link.
inputs: F1.T4 design + §V16/§V20 draft + NOTICE decision; the ALREADY-updated headers from F2.T2 (SPEC), F3.T1 (PLAN), F4.T1 (HANDOFF) — this phase moves the final bytes, ⊥ an earlier revision.
files: NEW `skills/encode-header/SKILL.md`, `skills/encode-docs/SKILL.md`, `SPEC.md` (via `encode-docs`), `NOTICE.md`, `CHANGELOG.md`; verify-only: `README.md`, `AGENTS.md`, `skills/setup/SKILL.md`, `.claude-plugin/marketplace.json`.

§T  TASKS:
T1|.|create the `encode-header` skill
touch: `skills/encode-header/SKILL.md`
details: new skill with frontmatter `name: encode-header` (== the directory name) and a `description` stating what it does AND when to use it, since the description drives auto-invocation: supplies the baked header for `SPEC.md`, `PLAN.md`, and `HANDOFF.md`, triggered when a document's header is missing or a header/format update is requested. Body = the three templates moved verbatim from `encode-docs` (post-F2/F3/F4 bytes) plus the ownership rule: this skill SUPPLIES the header text, `encode-docs` performs every write. Unwrapped prose; ⊥ numbered SPEC-row citations; ⊥ `scripts/`; keep it self-sufficient when loaded alone.
verify: `npm test` green and the new skill appears in `skills add . --list`; `name` == dir; `description` ≤1024 chars; body ≤500 lines; the three templates byte-match what `encode-docs` held after F2/F3/F4.
exit: the header templates own their skill.
next: F6.T2

T2|.|encode-docs: remove `## BAKED HEADERS`, leave a trigger hint, reconcile Dispatch + NEW
touch: `skills/encode-docs/SKILL.md`
details: delete the `## BAKED HEADERS` section body (the 3 fenced templates) and leave ONE line in its place: when a document's baked header is missing, or a header/format update is requested, trigger `encode-header` to supply it and emit it verbatim. Update `### Dispatch` ("Every mode that writes `SPEC.md` must leave the baked header present. Absent from a legacy file → prepend it in the same write.") and `### NEW` step 1 ("Emit the SPEC baked header verbatim as the first bytes of the file.") to route through `encode-header` while keeping `encode-docs` the writer. Confirm the `Full rules: /encode-docs skill.` line inside each moved template still points at `encode-docs` per the F1.T4 decision.
verify: `grep -n "BAKED HEADER" skills/encode-docs/SKILL.md` → the hint only, ⊥ the templates; `grep -c "" skills/encode-docs/SKILL.md` materially lower than the pre-phase count (≈54 lines removed) and ≤500; `### Dispatch` and `### NEW` both name `encode-header`.
exit: the hot-path skill is slimmer and still coherent.
next: F6.T3

T3|.|SPEC §V16 + §V20 reconcile (via `encode-docs`)
touch: `SPEC.md`
details: hand `encode-docs` two in-place row rewrites — §V16 → `encode-docs` is the sole WRITER/mutator of the three documents, while `encode-header` supplies the baked-header format (a content supplier, like `prep` and `handoff`); §V20 → the three encoded documents each open with their own baked header, supplied by `encode-header` and emitted verbatim by `encode-docs`, with the SPEC header carrying the `next:` counter and ids monotonic and never reused. Edit in place: ⊥ new ids, `next:` untouched. `SPEC.md` §G already lists `encode-header` ∴ ⊥ §G edit.
verify: §V16 and §V20 read as above; `next: C13 I12 R8 V30` unchanged; ⊥ new row added; §G unchanged.
exit: durable truth matches the extraction.
next: F6.T4

T4|.|roster + provenance accounting
touch: `NOTICE.md`; verify-only `README.md`, `AGENTS.md`, `skills/setup/SKILL.md`, `.claude-plugin/marketplace.json`
details: apply the F1.T4 NOTICE decision — default is a `## Modifications:` row for `skills/encode-header/` mirroring the `encode-docs` provenance (the baked headers descend from the `caveman` + `spec` derivation), so every shipped skill stays accounted for. Then VERIFY, ⊥ re-edit, the roster claims that already exist: `README.md`:90 link now resolves to a real file, `AGENTS.md` "12 skills" + support list, `skills/setup/SKILL.md` support line, `SPEC.md` §G Helpers. Confirm `.claude-plugin/marketplace.json` needs ⊥ change because the root plugin auto-scans `skills/`.
verify: `ls skills/encode-header/SKILL.md` resolves the README link; every roster site names `encode-header` and the count reads 12; `NOTICE.md` accounts for every shipped skill; marketplace file unchanged in the diff.
exit: roster, licence accounting, and shipped files agree.
next: F6.T5

T5|.|changelog
touch: `CHANGELOG.md`
details: add a `## [Unreleased]` bullet in plain English: the baked document headers now live in a new `encode-header` skill instead of `encode-docs`, so the almost-always-loaded encoder stays lean and the header templates load only when a header is actually being written; `encode-docs` still performs every write. Note that this also fixes the README link to a skill that did not exist.
verify: entry present.
exit: Theme E recorded.
next: F7.T1

## F7 final verify
goal: prove the work against `SPEC.md` and this plan — suite green, every relevant invariant classified with evidence, drift named and resolved.
inputs: `SPEC.md` §C2/§C4/§C8/§V1-5/§V10/§V11/§V16/§V20/§V22/§V23/§V27/§V28/§V29; the F2-F6 diffs; oracle `npm test`.
files: read-only sweep; the result table goes to `HANDOFF.md` via `encode-docs`.

§T  TASKS:
T1|.|invariant classification + oracle
touch: read `SPEC.md`, `skills/**`, `AGENTS.md`, `README.md`, `NOTICE.md`; run `npm test`
details: run the full suite (expect green; the new skill adds coverage rows, ⊥ failures). Classify each of §V1-5 (contract + CLI discovery, incl. `encode-header`), §V4 (≤500 lines for every touched body), §V10 (NOTICE accounting), §V11 (`## [Unreleased]` populated), §V16 + §V20 (supplier/writer split), §V22 (cook/cater gate), §V23 (garnish scope), §V27 + §V29 (BACKLOG lifecycle + state machine), §V28 (self-sufficiency), §C4 (⊥ numbered citations in skill bodies) as HOLD, VIOLATE, or UNVERIFIABLE with file/grep/test evidence.
verify: every row cites a file:line, grep output, or test name; ⊥ row left unclassified.
exit: all relevant invariants HOLD, or the drift is named.
next: F7.T2

T2|.|coherence + leftover sweep
touch: read `skills/encode-docs/SKILL.md`, `skills/handoff/SKILL.md`, `skills/cook/SKILL.md`, `skills/cater/SKILL.md`, `skills/prep/SKILL.md`, `skills/garnish/SKILL.md`, `skills/encode-header/SKILL.md`, `skills/setup/SKILL.md`
details: confirm ⊥ residual "prep writes `work-in-progress`", ⊥ "proceed only on `work-in-progress`", ⊥ `oracle`/`baseline`/`<subject>` inside any HANDOFF header surface, ⊥ `§[VCIRGT][0-9]` anywhere under `skills/`. Confirm the `cook`/`cater` flip logic is unambiguous and matches §V29 including the empty-stub branch. Confirm `garnish`'s "the recorded oracle and full-suite command" still resolves to the command carried in the new tests line — name the resolution or flag it as a real break. Confirm the `encode-docs` → `encode-header` trigger hint exists and that ⊥ skill body reimplements another skill's rule (§V28). Confirm the delimiter rule is stated (⊥ merely demonstrated) and did ⊥ leak into the PLAN/HANDOFF templates.
verify: each check cites its evidence; any residual inconsistency is named with an explicit fix-or-accept decision.
exit: no silent drift.
next: F7.T3

T3|.|record the result table
touch: `HANDOFF.md` (via `encode-docs`), `PLAN.md` (via `encode-docs`)
details: write the final verification table (item | status | evidence | decision) into `HANDOFF.md`, flip every `§T` row in this plan to `x`, and set `planning status: done` once every classified item is HOLD.
verify: table complete with evidence per row; `planning status: done`; ∀ `§T` rows `x`.
exit: cycle ready for `/garnish`.
next: `/garnish`
