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

branch main | last commit a94b61a close plan cycle after final verification | tests green (`node --test` 7/7)
baseline green | oracle `npm test`
uncommitted: `BACKLOG.md` (untracked; prep-owned deferred requests — ⊥ read/act/prune this cycle); `HANDOFF.md` (this baton).

## done this session
F2.T1-T8 (`x`): planning-status gate + garnish blank-not-delete cascade + multi-task propagation + setup 5-step → 8a5f0d9 (with held foundation + F1 `SWEEP.md`).
F3.T1 (`x`): `## REPORT OUTPUT` declared 2nd verbatim mirror; both copies reconciled byte-identical → 1581657.
F4.T1+T2 (`x`): unwrapped ∀ 11 skill bodies (−321 lines), tightened wording, fixed typos, added AGENTS unwrapped-prose rule; user signed off accuracy → 0b7a60f.
F5.T1 (`x`): final verify — cycle proven; `PLAN.md` `planning status` → `done` → a94b61a.

## in progress (exact stop point)
-
mid-edit files: none

## next
`/garnish` (blanks `PLAN.md` + `HANDOFF.md` to template, resets `planning status: new`, prunes stale `§V` on evidence), then `/review-code`. preconditions: none — `planning status: done`, ∀ §T `x`, ∀ verify `HOLD`. See watchouts for `SWEEP.md` + `BACKLOG.md` handling before/at garnish.

## deviations & decisions
- All F2 edits were pre-applied by a prior stalled session (tree dirty, §T unset, no commit/baton). This session verified the full diff line-by-line, ran oracle + greps, then finalized (flip §T, commit).
- F3.T1: the two `## REPORT OUTPUT` blocks were not byte-identical (heading case + a missing security sentence); reconciled both beyond just adding the mirror note, per §V26.
- F4: full unwrap + lean; PAUSED before F5 for user accuracy sign-off (user ruling), signed off, then resumed.
- `BACKLOG.md` holds NEW user feedback (HANDOFF-format changes, a BACKLOG read-gate, setup AI-file note) deferred per §V27 → untouched this cycle; awaits a future `/prep`.

## watchouts
- `/garnish` preconditions are now met. garnish will blank `PLAN.md` + `HANDOFF.md` and may prune stale `§V` — none identified stale this cycle (V22/V23/V26/V28/V29 all live).
- `SWEEP.md` fate (F5 item 9): recommend DROP at `/garnish` (short-lived F1 artifact). If the skill-loading state machine is wanted long-term, persist it into `AGENTS.md` as a "Skill Loading Model" section BEFORE `/garnish` — user call.
- `BACKLOG.md` ! left untouched by `/garnish` too (prep-owned, §V27); garnish must not blank or prune it. Awaits `/prep`.
- Body ≤500 lines holds (max `encode-docs` 347) but post-unwrap line count is a weak metric; token budget (§R1 ≤5000 rec) is truer — flagged, test unchanged.

## final verification
item|status|evidence|decision
§V22 cook/cater active-plan gate|HOLD|cook:31 + cater:32 read `planning status`, run ⟺ `work-in-progress`|code
§V23 garnish blank-not-delete|HOLD|garnish blanks to template + requires `done`; greps find no delete/purge-framing of PLAN/HANDOFF|code
§V26 two verbatim mirrors|HOLD|extract+diff: FINDING TAXONOMY & GATE + REPORT OUTPUT byte-identical review-plan↔review-code|code
§V28 skill self-sufficiency|HOLD|each skill loads standalone; shared statements only where co-loaded; mirrors declared|code
§V29 planning-status gate|HOLD|prep→WIP (prep:95), handoff→done (handoff:31), garnish→new (garnish:21/40), cook/cater gate (cook:31, cater:32)|code
§V4 body ≤500 lines|HOLD|`node --test` + `wc -l`: all ≤500 (max `encode-docs` 347)|code
§V15 5-step workflow|HOLD|setup:22 names five core steps; grep "six core"/"step 2 encode-docs" clean|code
