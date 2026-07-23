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

branch main | last commit 8a5f0d9 add plan status gate and blank-not-delete cleanup | tests green (`node --test` 7/7)
baseline green | oracle `npm test`
uncommitted: `BACKLOG.md` (untracked; prep-owned deferred requests — ⊥ read/act this cycle); `HANDOFF.md` (this baton).

## done this session
F2.T1-T8 (all `x`): planning-status gate + garnish blank-not-delete cascade + multi-task-per-phase propagation + setup 5-step, across `SPEC.md` + 9 skills + `AGENTS.md`. Committed with held foundation (SPEC refresh) + F1 `SWEEP.md` as one coherent unit → 8a5f0d9. Verified: oracle 7/7 green + grep clean (no residual delete/purge or single-task wording).

## in progress (exact stop point)
-
mid-edit files: none

## next
F3.T1 | preconditions: none. Add 1 line atop each `## Report output` / `## REPORT OUTPUT` section in `skills/review-plan/SKILL.md` + `skills/review-code/SKILL.md` declaring the block a 2nd verbatim mirror (like FINDING TAXONOMY & GATE, §V26/§V28). Cut list = empty per `SWEEP.md`. Confirm REPORT OUTPUT + FINDING TAXONOMY blocks byte-identical across both skills after edit.

## deviations & decisions
- Prior session left all F2 edits applied to the working tree but never verified, flipped §T, committed, or handed off. This session verified the full F2 diff line-by-line vs `PLAN.md`, ran oracle (7/7) + verification greps (clean), flipped §T `~`→`x`, then committed.
- `BACKLOG.md` discovered in tree: holds NEW user feedback (HANDOFF-format changes, a BACKLOG read-gate for cook/cater/review-*/garnish, setup AI-file note) deferred per §V27. Out of scope for this cook cycle → left untouched for a future `/prep`. Cook did NOT act on its contents.
- Commit strategy: foundation + F1 + F2 committed as one coherent unit (8a5f0d9) per the prior recorded decision.

## watchouts
- `BACKLOG.md` ! NOT be pruned/blanked/committed this cycle; it awaits `/prep` ingestion (user instruction inside the file).
- F3 near-empty: cut list empty, only the mirror declaration lands. Token win = F4.
- F4 = unwrap + lean ∀ 11 skill files; SURFACE diff to user for accuracy sign-off (F4.T2).
- `SWEEP.md` fate decided at F5 (persist loading table → AGENTS.md | drop at `/garnish`).
- §V28 self-sufficiency + §V26 protected mirror bind F3.

## final verification
item|status|evidence|decision
-|-|-|-
