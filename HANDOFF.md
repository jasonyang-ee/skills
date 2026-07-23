<!-- HANDOFF FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Session baton. Overwritten in full ∀ session. Records STATE, ⊥ intent (intent → PLAN.md, truth → SPEC.md).
Sections: header | done this session | in progress (exact stop point) | next | deviations & decisions | watchouts | final verification. Empty section → `-`, ⊥ deleted.
Header ! carry: branch | last commit | tests | baseline + oracle command | uncommitted files + why
Pointers = F<n>.T<n> (phase.task → PLAN.md), ⊥ bare step numbers. "in progress" & "next" ! use them.
"in progress" ! name current working task precisely: action, file, function. mid-edit files ! listed | `none`.
Red tests ! named exactly (file + test name), ⊥ "some failing".
final verification table ! filled only by the final verify phase; else header row alone.
Encoding: same symbol set as SPEC.md.
Full rules: /encode-docs skill.
-->

# HANDOFF 2026-07-23

branch main | last commit bec4fbe fix: minor update to spec of this repo | tests green (`npm test` 7/7, run this session)
baseline green | oracle `npm test`
uncommitted: `PLAN.md` (rewritten F1-F7, status `new`) + `BACKLOG.md` (blanked — request ingested → F2) + `HANDOFF.md` (this baton). Held for user review / `/review-plan`; ⊥ auto-commit. `SPEC.md` ⊥ touched this run.

## done this session
prep (rewrite): ingested the `BACKLOG.md` pipe-table request and rewrote `PLAN.md` as F1-F7 — Theme G (SPEC table delimiter rows, new) + Theme D (state machine) + Theme A (HANDOFF header) + Theme B+C (BACKLOG gate) + Theme E (`encode-header` extraction). Dropped Theme F (portability) ∵ already landed. Blanked `BACKLOG.md` after `PLAN.md` was written. ⊥ commit yet.

## in progress (exact stop point)
-
mid-edit files: none

## next
F1.T1 (`/cook F1`, or `/review-plan` first) — read `skills/encode-docs/SKILL.md` `### Section skeleton` + `## BAKED HEADERS` SPEC block, capture the 4 SPEC table headers verbatim, and derive each `|---|---|` delimiter row by column count. preconditions: `npm install` has been run (see watchouts).

## deviations & decisions
user rulings this run: (1) all four pending themes stay in one cycle — pipe-table delimiter + `encode-header` + state machine + HANDOFF header/BACKLOG gate; (2) delimiter rows land in the SPEC `§C`/`§I`/`§R`/`§V` tables ONLY — PLAN phase-order and HANDOFF final-verification templates stay plain; (3) canonical delimiter form = `|---|---|`, ⊥ the terser `-|-|-|-` that the previous `HANDOFF.md` used.
prior plan reconciled to the tree, ⊥ re-issued blind: Theme F (portability) is DONE (`git grep "§[VCIRGT][0-9]" -- skills/` → ⊥ match) → dropped. The AI-File-Purpose `BACKLOG.md` line already landed in `skills/setup/SKILL.md`:37 + `AGENTS.md`:14 → F5 no longer re-edits them. Themes D, A, B+C confirmed still unlanded by grep.
⊥ SPEC change this run (default-to-no-spec-change held). §V27/§V29/§C4 were corrected in a prior cycle and are committed; the only planned durable edit is §V16/§V20 in F6.T3, deferred there ∵ it depends on the extraction design F1.T4 confirms.
this baton uses the OLD two-line header (baseline + oracle) ∵ F4 has ⊥ landed. `planning status: new` follows `SPEC.md` §V29, ⊥ the `handoff` skill body, which still says "else `work-in-progress`" — that stale sentence is exactly what F3.T4 fixes.

## watchouts
- `node_modules/` was ABSENT at session start → `npm test` failed with `ERR_MODULE_NOT_FOUND: js-yaml` from `tests/helpers.mjs`. Env setup, ⊥ a repo defect. Run `npm install` before trusting the oracle; 7/7 green after.
- live drift F6 closes: `README.md`:90 links `skills/encode-header/SKILL.md`, `AGENTS.md`:7 says "12 skills", `SPEC.md` §G Helpers and `skills/setup/SKILL.md`:48 all name `encode-header` — but `skills/encode-header/` does ⊥ exist. Until F6 lands the README link is dead.
- `skills/encode-docs/SKILL.md` is touched by F2, F3, F4, F6 and `skills/prep/SKILL.md` by F3, F5 → serialize. F6 ! run after F2+F3+F4 ∵ it moves the very header bytes those phases rewrite; a `/cater` run ! ⊥ parallelize them.
- state machine is self-referential: F3 rewrites the PLAN baked header that governs `cook`/`cater`. This file's PLAN header already carries the corrected wording — F3 syncs the `encode-docs` template TO it, ⊥ invents a third phrasing.
- `new` ambiguity = empty stub (post-`garnish`, ⊥ phase sections) vs ready plan (prep-written, has phase sections). `cook`/`cater` ! disambiguate on phase presence, ⊥ task status (F3.T2).
- portability: F2-F6 ! ⊥ introduce numbered `§<S><n>` citations into skill BODIES; numbered ids belong in `PLAN.md` tasks only. Baseline inventory = ⊥ match; F7.T2 re-greps.
- `garnish`:18 + :33 say "the recorded oracle and full-suite command" — after F4 drops the labeled `oracle <cmd>` field this must still resolve to the `(<cmd>)` inside the new tests line. F7.T2 checks; ⊥ pre-emptive edit.
- `BACKLOG.md` is blank again → any `/cook`|`/cater`|`/review-*`|`/garnish` run before F5 lands ! still ⊥ read it (`SPEC.md` §V27).
- line numbers drift as phases land → re-find every edit site by the quoted strings in `PLAN.md` existing-assets.

## final verification
item|status|evidence|decision
-|-|-|-
