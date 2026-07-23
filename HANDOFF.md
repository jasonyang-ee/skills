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

branch main | last commit a2d9a89 docs: plan table delimiters and encode-header | tests green (`npm test` 7/7, run this session)
baseline green | oracle `npm test`
uncommitted: none (F1 lands `PLAN.md` §T flips + this baton in one commit)

## done this session
F1.T1: locked the 4 SPEC table header/delimiter pairs in `skills/encode-docs/SKILL.md` `### Section skeleton`; confirmed PLAN phase-order + HANDOFF final-verify templates are out of scope; confirmed live `SPEC.md` body tables already carry delimiter rows.
F1.T2: captured ∀ Theme-D + Theme-A anchors verbatim; locked the replacement HANDOFF header line and the §V29 clause-by-clause semantics.
F1.T3: captured the 5 BACKLOG insertion points with each file's local numbering; confirmed the `prep` mode gate = §V29 status.
F1.T4: confirmed the 3 templates to move, the supplier/writer split, the §V16/§V20 draft wording, and the `NOTICE.md` decision; confirmed tests + marketplace need ⊥ change.
F1.T5: oracle 7/7 green; portability grep ⊥ match; ∀ skill body far under the 500-line cap.

## in progress (exact stop point)
-
mid-edit files: none

## next
F2.T1 — in `skills/encode-docs/SKILL.md` `### Section skeleton`, insert `|---|---|` under `id|description`, `|---|---|---|` under `id|type|shape → output,purpose,condition`, `|---|---|---|` under `id|claim|source`, `|---|---|` under `id|invariant definition`, and extend the lead prose (line "Pipe table using `|`, Fixed order, fixed headers, ...") to STATE the delimiter-row rule. preconditions: none.

## deviations & decisions
`cook` started on `planning status: new` and flipped it → `work-in-progress` per `SPEC.md` §V29 (plan carries executable phases F1-F7 ∴ ⊥ an empty stub). The `cook` skill body still reads "proceed only on `work-in-progress`" — that stale clause is exactly what F3.T2 fixes; SPEC ≫ skill body.
F1 found ⊥ contradiction between `PLAN.md` and the tree → F2-F6 stand as written, ⊥ plan correction issued.
F1.T4 decisions recorded: (1) `NOTICE.md` GETS an `encode-header` row mirroring the `encode-docs` provenance (the moved SPEC header descends from `caveman`+`spec`); alternative "treat as original, ⊥ row" rejected ∵ §V10 wants ∀ shipped skill accounted and the bytes are derived. (2) each moved template keeps its trailing `Full rules: /encode-docs skill.` line ∵ the full document format lives in `encode-docs`; `encode-header` supplies header bytes only. (3) tests assert `skills.length > 0` + iterate discovered dirs ∴ a new skill dir is auto-covered, ⊥ count to bump.
this baton still uses the OLD two-line header ∵ F4 has ⊥ landed.

## watchouts
- `npm install` ! run before trusting the oracle (`node_modules` was absent last session; env setup, ⊥ a repo defect). Already installed this session.
- `skills/encode-docs/SKILL.md` is touched by F2, F3, F4, F6 and `skills/prep/SKILL.md` by F3, F5 → serialize. F6 ! run after F2+F3+F4 ∵ it moves the very header bytes those phases rewrite.
- `garnish`:18 + :33 say "the recorded oracle and full-suite command" — after F4 drops the labeled `oracle <cmd>` field this must still resolve to the `(<cmd>)` inside the new tests line. F7.T2 checks; ⊥ pre-emptive edit.
- F2-F6 ! ⊥ introduce numbered `§<S><n>` citations into skill BODIES; baseline = ⊥ match, F7.T2 re-greps.
- `BACKLOG.md` is blank → any run before F5 lands ! still ⊥ read it (`SPEC.md` §V27).
- line numbers drift as phases land → re-find every edit site by the quoted strings in `PLAN.md` existing-assets.

## final verification
item|status|evidence|decision
-|-|-|-
