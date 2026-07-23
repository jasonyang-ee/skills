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

goal: sweep skills for inconsistency + loading state machine + overlap map → fix inconsistencies (garnish blank-not-delete + `task: T<n>` singular) + add `planning status` gate + safe de-dup + lint/lean-wording pass (unwrap hard line-breaks, tighten prose), ∀ skill self-sufficient loaded alone, ⊥ accuracy loss.

## ground rules

- docs-only cycle. ⊥ runtime code. edits = markdown in `skills/**`, `SPEC.md`, `AGENTS.md`, `CHANGELOG.md`.
- `encode-docs` = sole writer of `SPEC.md` (§V16); route ∀ §V edits through it.
- SELF-SUFFICIENCY (de-dup boundary): `skills/**` = products installed independently into arbitrary repos (§C4). ⊥ cut a statement a skill needs loaded ALONE. Safe de-dup only where owner guaranteed co-loaded: (a) skill INVOKED on compose, (b) baked header of a doc it READS (travels). ⊥ rely on this repo's `AGENTS.md`/`SPEC.md`.
- SKILL BODIES = readable English prose (products), ⊥ the §-symbol encoding (that's for SPEC/PLAN/HANDOFF only). Lean = tighten English, ⊥ cryptify. Preserve verbatim: code, paths, ids, URLs, numbers, error strings.
- PROTECTED: `review-plan`+`review-code` taxonomy + GO/NO-GO verbatim mirror (§V26) → ⊥ de-dup.
- REVIEW GATE: F1 ends by surfacing overlap map + proposed cuts; user approves cut list before F3. Fixes + planning-status feature (F2) + lint/lean (F4) = no hard gate; user eyeballs F4 diff for accuracy.
- LOCKED decisions (user 2026-07-22): garnish BLANKS PLAN.md+HANDOFF.md to template (⊥ delete); MERGE all steers into one cycle; planning-status `new`=stub→/prep, `work-in-progress`=run, `done`→/garnish; lint removes manual ~80col hard-wrap (personal repo, VS Code soft-wraps — terminal readers ⊥ a concern).
- evidence per phase: F1 → `SWEEP.md`; F2 → each fix/feature + cited §V; F3 → cuts + self-sufficiency; F4 → unwrapped + leaner + accuracy intact; F5 → `npm test` green + skills stand alone + gate works + grep clean.
- ⊥ renumber §V ids. V23 = rewrite in place. new §V from `next:` (V28 self-suff, V29 planning-status). no-hard-wrap convention → AGENTS.md rule, ⊥ §V (keep §V lean).

## existing assets

- baseline tree DIRTY (foundation): `SPEC.md`+`CHANGELOG.md` uncommitted @ HEAD `5ace8b9`; `PLAN.md`+`HANDOFF.md` = prep output. Tests green (`node --test` 7/7).
- `SPEC.md` header `next: C13 I12 R8 V28`; last written row V27.
- LINT state (measured 2026-07-22): NO lint/format/editorconfig/prettier/markdownlint config in repo → wrap = pure manual convention, ⊥ tooling to change. Mixed: `cook`(max 83) + `garnish`(max 86) uniformly ~80col-wrapped; others have wrapped PROSE + long structural lines (tables/baked headers); `prep`(max 484) already unwrapped = target style.
- inconsistency inventory (grep-confirmed; ~lines drift → F1 re-finds by quoted string):
  | site | current | ✗ fix |
  | --- | --- | --- |
  | `skills/garnish/SKILL.md` ~l.7 desc | "then removes short-lived PLAN.md and HANDOFF.md" | → "blanks ... to their baked-header template" |
  | `skills/garnish/SKILL.md` ~l.71 step 8 | "Verify both short-term files are absent" | → "hold only their baked-header template"; "unrelated deletion"→"unrelated change" |
  | `skills/garnish/SKILL.md` ~l.95 boundary | "Never delete files when unrelated changes are present." | → "Never blank the short-term files when unrelated changes are present." |
  | `skills/garnish/SKILL.md` ~l.14 intro | "destructive cleanup gate" | → "cleanup gate that blanks short-term execution files to their template" |
  | `skills/cater/SKILL.md` ~l.133 | "`garnish` removes exactly `PLAN.md` and `HANDOFF.md`" | → "blanks ... to their baked-header template" |
  | `skills/setup/SKILL.md` ~l.42, ~l.96 | "purge short-term plan files" / "→ purge PLAN.md + HANDOFF.md" | → "blank ... to template" |
  | `AGENTS.md` ~l.24 | "→ purge PLAN.md + HANDOFF.md." | → "→ blank PLAN.md + HANDOFF.md to template." |
  | `skills/encode-commit/SKILL.md` ~l.27 | "SPEC.md/PLAN.md are purged each cycle" | → "PLAN.md is blanked each cycle and SPEC.md rows get pruned" (SPEC.md ⊥ purged) |
  | `skills/encode-docs/SKILL.md` ~l.335 | `Tables (§R): pipe-delimited` | → `Tables (§C/§I/§R/§V): pipe-delimited, id-keyed` |
  | `skills/encode-docs/SKILL.md` ~l.337 | `next: R<n> V<n>` | → `next: C<n> I<n> R<n> V<n>` |
  | `skills/encode-docs/SKILL.md` ~l.350 | PLAN baked header `... numbered steps ... task: T<n>` singular | → multi-task-per-phase wording (STEER) |
- OVERLAP categories (owner → restaters; F1 quantifies, F3 cuts safe): O1 symbol table (baked doc headers + encode-docs → handoff/review-plan/encode-commit/encode-pr/setup/prep); O2 grammar (encode-docs → AGENTS/setup); O3 preserve-verbatim (encode-docs → baked headers); O4 baked-header/format rules (encode-docs → garnish/cook/cater/setup; handoff already defers = model); O5 §T legend (encode-docs+baked PLAN header → setup/cook/cater/review-plan); O6 file roles (AGENTS+SPEC §G, ⊥ travel → keep 1 lean line); O7 sole-mutator (SPEC §V16, ⊥ travel); O8 quality contract (prep, self-declared mirror → cook/cater/review-code, CONSERVATIVE); PROTECTED taxonomy mirror ⊥ cut.
- composition edges: prep→{encode-docs,handoff}; cook→{encode-docs,handoff}; cater→{encode-docs,handoff}; garnish→encode-docs; review-plan→encode-docs; review-code→prep; handoff→encode-docs; setup→encode-docs. encode-commit, encode-pr = standalone.
- **F1 DONE → `SWEEP.md`** (register X1-X22 + loading state machine + overlap map). Refinements F1 hands to later phases:
  - F2 add — multi-task decision only half-propagated (X12 done in T2): X13 encode-docs:221 "numbered steps" prose; X14 review-plan:70 "exactly one task: T<n> ... BLOCK" (would fail valid multi-task plan); X15 garnish:23 single-mapping precondition; X16 prep:21 "numbered steps"; X18 handoff:43-53 RULES renumber (4,6 deleted). review-plan now in F2 scope.
  - F4 add — typos X19 review-plan:81, X20 review-code:63-64 ("diviating"→"deviating"), X21 cater:4 ("Enhensed"→"Enhanced").
  - **DECIDE (gate) X17** — workflow step count: SPEC §G/§V15 = 5 core + encode-docs support; setup:21-22 = "six core ... step 2 encode-docs". Reconcile. rec: keep SPEC 5-step, fix setup.
  - **FINDING** — F3 de-dup near-empty: skills already defer to encode-docs where co-loaded; symbol/format dup lives only in necessary emitters (setup) or travelling doc headers; REPORT OUTPUT block (review-plan≈review-code) standalone → ⊥ safely cut (decide: 2nd mirror | accept). Real token win = F4 lean, ⊥ F3.

## phase order

id|goal|depends|exit
F1|sweep: register + loading state machine + overlap map|-|`SWEEP.md` written; user approves cut list
F2|fix inconsistencies + planning-status gate|F1|∀ fixes/feature applied + cited §V
F3|declare REPORT OUTPUT 2nd mirror + (near-empty) cuts|F1,F2|mirror declared; ∀ skill self-sufficient; mirrors byte-identical
F4|lint (unwrap hard line-breaks) + lean wording|F3|∀ skill unwrapped + leaner; accuracy intact
F5|final verify code vs spec & plan|F4|`npm test` green, gate works, grep clean, drift resolved

## F1 sweep
goal: exhaustive cross-skill sweep → 3 artifacts → `SWEEP.md`; end at review gate.
inputs: all 11 skills + `AGENTS.md` + `SPEC.md`; inventory + overlap + composition above; SELF-SUFFICIENCY; PROTECTED mirror; planning-status model.
files: read-only sweep; write `SWEEP.md` (root, short-lived).

§T  TASKS:
T1|x|inconsistency register
touch: read-only; write `SWEEP.md`
details: verify + extend inventory (garnish-blank + encode-commit SPEC-purged + `task: T<n>` singular + any new). Re-find anchors by quoted string. Row = file · quote · ✗why · fix.
verify: every grep hit `remove|delete|purge|absent`, `next: R`, `Tables (§R)`, `task: T<n>` mapped | excluded
exit: register complete
next: F1.T2

T2|x|skill-loading state machine + planning-status lifecycle
touch: append `SWEEP.md`
details: table per skill {trigger | reads-at-load | invokes (→) | guaranteed co-loaded}; confirm composition edges; mark owners that TRAVEL (baked doc headers) vs ⊥ (AGENTS/SPEC). Add PLAN `planning status` lifecycle (transitions attributed to skills).
verify: ∀ 11 skills row; every "→" cited to a body line; status transitions attributed
exit: loading + status model proven
next: F1.T3

T3|x|overlap + de-dup map → proposal
touch: append `SWEEP.md`
details: per O1..O8 — restating locations, owner, safe-to-cut? (gate: co-loaded per T2), est. token save, replacement reference. Mark PROTECTED ⊥ cut. Ordered CUT LIST for F3 + KEEP LIST.
verify: each cut names a co-loaded owner; no cut touches standalone-only need or mirror
exit: cut list ready; SURFACE `SWEEP.md` → user approval gate
next: F2.T1 (fixes proceed); F3 blocked on approved cut list

## F2 fix + planning-status gate
goal: land §V + garnish blank-not-delete cascade + baked-header fixes (incl. l.350 multi-task) + `planning status` gate across cook/cater/prep/handoff/garnish.
inputs: F1 register (`SWEEP.md`); §V16/§V22/§V23/§V26/§V28/§V29; inventory; planning-status model; gate decisions (X17→5-step fix setup; REPORT OUTPUT→2nd mirror).
files: `SPEC.md`, `skills/{encode-docs,garnish,cater,setup,encode-commit,cook,prep,handoff,review-plan,review-code}/SKILL.md`, `AGENTS.md`.

§T  TASKS:
T1|x|solid §V via `encode-docs`
touch: `SPEC.md`
details: (a) V23 → `...blank PLAN.md + HANDOFF.md to baked-header template (⊥ delete — absent only via fresh repo \| manual user delete)...`. (b) V28 → `∀ skills/**/SKILL.md self-sufficient loaded alone → ⊥ depend on another skill's body; canonical statement referenced only where owner guaranteed co-loaded (invoked skill on compose \| baked header of a doc it reads); review-plan+review-code taxonomy = intentional verbatim mirror (§V26), ⊥ de-dup`. (c) V29 → `PLAN.md header planning status: new \| work-in-progress \| done = cycle gate. prep writes work-in-progress; final-verify/handoff → done on ∀ §T x + verify HOLD; garnish blank resets new. cook\|cater execute ⟺ work-in-progress; new → stop (/prep); done → stop (/garnish)`. (d) V22 → append `(active plan gate §V29)`. (e) extend V26 → add REPORT OUTPUT block as 2nd intentional verbatim mirror (review-plan ⟷ review-code, mirror-check byte-identical) [gate decision]. bump `next:` → V30. cites §V16.
verify: V23 blank≠delete; V28+V29 present; V22 links V29; V26 names both mirrors; `next: ... V30`
exit: durable rules solid
next: F2.T2

T2|x|encode-docs sweep fixes — baked-header template + addressing
touch: `skills/encode-docs/SKILL.md`
details: ~l.335 → `Tables (§C/§I/§R/§V): pipe-delimited, id-keyed...`; ~l.337 → `next: C<n> I<n> R<n> V<n>`; ~l.190 Addressing note `next:` = one counter per id-keyed section; ~l.350 → `∀ phase names: goal | inputs | files | §T tasks (≥1: id|status|desc, touch, details+§V, verify, exit, next)` (X12); ~l.221 prose "goal, tasks, inputs, files touched, numbered steps" → multi-task shape (X13). Match `SPEC.md` header. cites §V17,§V19,§V20.
verify: grep `next: R<n> V<n>`→0, `Tables (§R)`→0, `numbered steps`+singular `task: T<n>`→0; template ↔ SPEC header consistent
exit: format owner ↔ live spec consistent
next: F2.T3

T3|x|encode-docs — define `planning status` field
touch: `skills/encode-docs/SKILL.md`
details: PLAN baked-header template += tracked line `planning status: new | work-in-progress | done` + 1 doc line (semantics+gate, precedent SPEC `next:`); PLAN.md File section document field (placement, values, transitions prep→WIP/handoff→done/garnish→new, gate cook/cater run ⟺ WIP). cites §V19,§V20,§V29.
verify: PLAN template carries field; File section documents values+transitions+gate; matches this file's header
exit: field defined by format owner
next: F2.T4

T4|x|garnish — blank-not-delete self-consistency + status reset + precondition
touch: `skills/garnish/SKILL.md`
details: apply inventory garnish rows (l.7, l.71, l.95, l.14); keep step 7. Blank resets `planning status: new`. Precondition: garnish runs on `planning status: done`. ~l.23 precondition "Every PLAN phase has a `task: T<n>` mapping and every mapped §T row ... x" → "every §T row across all phases is x" (X15, multi-task). cites §V23,§V29.
verify: grep garnish `absent|removes|delete` → only legit prune/dirty-tree; requires done + resets new; ⊥ single-task assumption
exit: garnish self-consistent
next: F2.T5

T5|x|cascade blank wording — cater/setup/encode-commit/AGENTS
touch: `skills/cater/SKILL.md`, `skills/setup/SKILL.md`, `skills/encode-commit/SKILL.md`, `AGENTS.md`
details: apply inventory rows (cater l.133; setup l.42+l.96; AGENTS l.24; encode-commit l.27 — fix purge framing + false SPEC.md-purged claim). cites §V23.
verify: grep `purge|removes` across 4 → 0 re: garnish/PLAN/HANDOFF; encode-commit ⊥ claims SPEC.md purged
exit: cascade complete
next: F2.T6

T6|x|planning-status gate + transitions — cook/cater/prep/handoff
touch: `skills/cook/SKILL.md`, `skills/cater/SKILL.md`, `skills/prep/SKILL.md`, `skills/handoff/SKILL.md`
details: cook ~l.46 + cater ~l.36 guard: read `planning status` → `new`→STOP(/prep), `done`→STOP(/garnish), `work-in-progress`→proceed (replaces "Stop if absent"; absent still stops). prep: writes plan `work-in-progress`. handoff: ∀ §T x + final-verify HOLD → set `done`. cites §V29,§V22.
verify: cook/cater run only on WIP; prep emits WIP; handoff sets done
exit: gate wired end-to-end
next: F2.T7

T7|x|multi-task-per-phase propagation (finish the half-applied decision)
touch: `skills/review-plan/SKILL.md`, `skills/prep/SKILL.md`, `skills/handoff/SKILL.md`
details: review-plan ~l.70 "§T mapping — does every phase carry **exactly one** `task: T<n>` ... Duplicate ... BLOCK" (X14) → "does every phase carry ≥1 `task: T<n>`, ids monotonic within phase, each existing in §T & ⊥ `x`? Missing/duplicate-across-phases mapping is a BLOCK" (would otherwise fail a valid multi-task plan); prep ~l.21 "task table with numbered steps" (X16) → "task table (≥1 task per phase)"; handoff ~l.43-53 RULES renumber 1,2,3,5,7,8 → 1-6 (X18, items 4&6 deleted d2a87e5). cites §V21.
verify: grep `exactly one .task`+`numbered steps`→0 in these; handoff RULES contiguous 1-6
exit: multi-task decision fully propagated
next: F2.T8

T8|x|X17 workflow step-count — align setup to SPEC 5-step
touch: `skills/setup/SKILL.md`
details: ~l.21-22 "seven-command bootstrap list ... separate from the **six** core workflow steps: those steps begin with /prep, and step 2 is the encode-docs writing discipline" → "... separate from the **five** core workflow steps (prep, review-plan, cook|cater, garnish, review-code); encode-docs + handoff = supporting skills, ⊥ counted". Keep "seven-command bootstrap" (7 slash-commands incl setup ≠ 5 core steps) + "cook/cater counted once". cites §V15.
verify: setup ⊥ says "six core"/"step 2 encode-docs"; 5-step matches SPEC §G/§V15; 7 bootstrap commands intact
exit: step-count consistent SPEC↔setup
next: F3.T1

## F3 de-dup + declare 2nd mirror
goal: apply the (near-empty) cut list; declare REPORT OUTPUT block a 2nd intentional mirror per gate decision; preserve self-sufficiency.
inputs: `SWEEP.md` finding (F3 near-empty); gate decision (REPORT OUTPUT → 2nd mirror); §V4/§V26/§V28.
files: `skills/review-plan/SKILL.md`, `skills/review-code/SKILL.md` (+ any approved cut file).

§T  TASKS:
T1|x|declare REPORT OUTPUT 2nd mirror + apply cut list (empty)
touch: `skills/review-plan/SKILL.md`, `skills/review-code/SKILL.md`
details: add 1 line atop each "## Report output"/"## REPORT OUTPUT" section: "Shared verbatim with the paired review skill (mirror-check byte-identical), like FINDING TAXONOMY & GATE." (§V26 extension done F2.T1). CUT LIST = empty per `SWEEP.md` (skills already well-factored; token win = F4). ⊥ touch protected taxonomy mirror. Confirm both blocks byte-identical after edit.
verify: both skills carry the mirror note; REPORT OUTPUT + taxonomy blocks byte-identical review-plan↔review-code; each skill self-sufficient
exit: mirror declared; token-reduction expectation shifted to F4
next: F4.T1

## F4 lint + lean
goal: normalize wrap (remove manual ~80col hard-breaks) + tighten prose across ∀ skill files; ⊥ accuracy loss, ⊥ cryptify.
inputs: §V4/§V28; §R1 (body ≤5000 tokens recommended); LINT state above; user decision (no terminal-reader wrap).
files: ∀ `skills/*/SKILL.md`; `AGENTS.md` (add authoring rule).

§T  TASKS:
T1|.|unwrap — join hard-wrapped prose paragraphs to one line each
touch: ∀ `skills/*/SKILL.md`
details: paragraph-aware reflow: join consecutive non-blank prose lines within a paragraph into a single line; keep blank-line paragraph separators. PRESERVE untouched: frontmatter, headings, list-item structure (a wrapped bullet continuation joins its bullet), table rows, code fences + contents, blockquotes, HTML-comment baked headers, horizontal rules, links/paths/ids verbatim. `cook`+`garnish` = full reflow; others = reflow the still-wrapped prose only. Target style = `prep` (long-line paragraphs). Add `AGENTS.md` Rules line: skill bodies = unwrapped prose (one line/paragraph), rely on editor soft-wrap, ⊥ manual line-wrap.
verify: no broken table/list/code/frontmatter (eyeball render); each paragraph = 1 line; `AGENTS.md` rule present
exit: wrap normalized
next: F4.T2

T2|.|lean wording — tighten prose, preserve accuracy
touch: ∀ `skills/*/SKILL.md`
details: drop filler/redundancy/throat-clearing, prefer short words, cut repetition WITHIN each skill — keep complete, natural, accurate English (products, ⊥ symbol/fragment encoding). ⊥ drop any instruction, nuance, boundary, or verbatim token. Fix typos: X19 review-plan:81 + X20 review-code:63-64 "diviating/Diviation"→"deviating/Deviation"; X21 cater:4 "Enhensed"→"Enhanced", "with holding"→"holding". Each skill still self-sufficient (§V28) + accurate + spec-compliant (name==dir, description ≤1024, body ≤500 lines §V4). SURFACE F4 diff summary to user for accuracy sign-off.
verify: skills read leaner but lossless (cold spot-read vs pre-F4); §V4 line count ≤500; description unchanged in intent
exit: prose leaner, accuracy intact
next: F5.T1

## F5 final verify
goal: prove cycle — tests green, skills self-sufficient + accurate, gate works, no inconsistency, wrap normalized.
inputs: F2-F4 diffs; §V4/§V16/§V17/§V19/§V20/§V22/§V23/§V26/§V28/§V29; `CHANGELOG.md`; `SWEEP.md`.
files: whole repo (read) + `CHANGELOG.md`, `HANDOFF.md` (write); decide `SWEEP.md` fate.

§T  TASKS:
T1|.|verify + classify + changelog + result table
touch: `CHANGELOG.md`, `HANDOFF.md`
details: 1) `node --test` → green (7/7). 2) grep `remove|delete|purge|absent`, `next: R`, `Tables (§R)`, `task: T<n>` → 0 residual contradiction. 3) each 11 skills readable standalone + accurate (spot-check de-dup'd + lean'd); render check no broken markdown; body ≤500 lines (§V4) — NOTE post-unwrap line count is weak, token (§R1) is truer metric (flag only, ⊥ change test). 4) planning-status GATE trace: cook/cater stop on `new`+`done`, run on WIP; this PLAN.md carries WIP. 5) `SPEC.md` header ↔ encode-docs SPEC+PLAN templates consistent; V28+V29 present; mirror byte-identical (§V26). 6) classify §V22,§V23,§V26,§V28,§V29 = HOLD w/ evidence. 7) `CHANGELOG.md` [Unreleased] plain English. 8) result table → `HANDOFF.md`. 9) `SWEEP.md` fate: persist loading table as AGENTS.md "Skill Loading Model" (user call) | drop at `/garnish`.
verify: `npm test` green; grep clean; gate traced; §V ∀ HOLD; skills self-sufficient + accurate; wrap normalized
exit: cycle proven; ready `/garnish`
next: `/garnish` (then `/review-code`)
