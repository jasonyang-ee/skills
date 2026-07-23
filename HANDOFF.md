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

branch main | last commit 0b7a60f unwrap skill bodies to soft-wrap prose and tighten wording | tests green (`node --test` 7/7)
baseline green | oracle `npm test`
uncommitted: `BACKLOG.md` (untracked; prep-owned deferred requests — ⊥ read/act this cycle); `HANDOFF.md` (this baton).

## done this session
F2.T1-T8 (all `x`): planning-status gate + garnish blank-not-delete cascade + multi-task-per-phase propagation + setup 5-step, across `SPEC.md` + 9 skills + `AGENTS.md` → 8a5f0d9 (with held foundation + F1 `SWEEP.md`).
F3.T1 (`x`): declared `## REPORT OUTPUT` a 2nd verbatim mirror in `review-plan` + `review-code`, reconciled both copies byte-identical → 1581657.
F4.T1 (`x`): unwrapped ∀ 11 skill bodies to one-line-per-paragraph prose (−321 lines: 1667→1346), added `AGENTS.md` unwrapped-prose rule → 0b7a60f.
F4.T2 (`~`): leaning + typo fixes (`Enhanced`, `deviating`/`Deviation`) applied + committed in 0b7a60f. Verified: tests 7/7, mirrors byte-identical, fences balanced, ∀ bodies ≤500 lines. HELD at accuracy sign-off (see next).

## in progress (exact stop point)
F4.T2: leaning applied + committed (0b7a60f); PAUSED for user accuracy sign-off before F5 + push (user ruling: "full F4, pause before push").
mid-edit files: none

## next
F4.T2 accuracy sign-off (user) → flip F4.T2 `~`→`x` → F5.T1 final verify → push. preconditions: USER SIGN-OFF on the F4 diff. Do NOT run F5 or push until given.

## deviations & decisions
- User ruling (this session): F4 = full unwrap + lean, then PAUSE before F5 + push for accuracy sign-off.
- Prior session left all F2 edits applied to the working tree but never verified, flipped §T, committed, or handed off. This session verified the full F2 diff line-by-line vs `PLAN.md`, ran oracle (7/7) + verification greps (clean), flipped §T `~`→`x`, then committed.
- F3.T1: plan framed F3 as "add 1 mirror note", but the two `## REPORT OUTPUT` blocks were NOT byte-identical (heading case + review-plan missing the security carve-out sentence). §V26 + F3.T1 verify demand byte-identical → reconciled both (kept richer security text + all-caps heading) beyond just the note.
- `BACKLOG.md` discovered in tree: holds NEW user feedback (HANDOFF-format changes, a BACKLOG read-gate for cook/cater/review-*/garnish, setup AI-file note) deferred per §V27. Out of scope for this cook cycle → left untouched for a future `/prep`. Cook did NOT act on its contents.
- Commit strategy: foundation + F1 + F2 committed as one coherent unit (8a5f0d9) per the prior recorded decision.

## watchouts
- Do NOT run F5 or push until the user signs off on F4 accuracy.
- `BACKLOG.md` ! NOT be pruned/blanked/committed this cycle; it awaits `/prep` ingestion (user instruction inside the file).
- `SWEEP.md` fate decided at F5 (persist loading table → AGENTS.md | drop at `/garnish`).
- §V28 self-sufficiency held through F4 (each skill still stands alone after lean).

## final verification
item|status|evidence|decision
-|-|-|-
