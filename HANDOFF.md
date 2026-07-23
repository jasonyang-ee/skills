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

branch main | last commit c76083c statemachine readme | tests green (`npm test` 7/7, not re-run — prep = planning only, ⊥ code change)
baseline green | oracle `npm test`
uncommitted: `SPEC.md` (§V29/§V27/§C4 edits) + `PLAN.md` (expanded F1-F7, status `new`) + `HANDOFF.md` (this baton) + `BACKLOG.md` (blanked, ingested → PLAN) + `skills/encode-docs/SKILL.md` (USER's uncommitted edit: removed `(§V16)` @ line 10 + reflowed `description:`). ALL held pending user review / `/review-plan`.

## done this session
prep (expand): corrected `SPEC.md` §V29 (planning status = execution-keyed; prep writes `new`, cook/cater ALONE flip →wip), §V27 (ingest/expand vs defer), §C4 (skill bodies ⊥ numbered SPEC-id citations). Expanded `PLAN.md` F1-F7 folding: Theme A HANDOFF header + Theme B+C BACKLOG gate (prior) + Theme D state-machine fix (this prompt) + Theme E encode-header extraction + Theme F portability (from BACKLOG). Blanked `BACKLOG.md`. ⊥ commit yet.

## in progress (exact stop point)
-
mid-edit files: none

## next
F1.T1 (`/cook F1`, or `/review-plan` first) — confirm state-machine edit sites in `prep`/`cook`/`cater`/`handoff`/`encode-docs` & lock corrected semantics. preconditions: none.

## deviations & decisions
user ruling (this prompt): planning status was a logical bug — prep must NOT write `work-in-progress`; a just-written plan with all `.` tasks is `new`; only cook/cater flip →wip at execution start. ∴ prev "defer" of the encode-header request was wrong; this run EXPANDED the plan instead (status was mis-set wip → now `new`).
scope: user asked to fold the deferred BACKLOG (encode-header + portability) AND this state-machine request into ONE plan → 7-phase `PLAN.md`.
SPEC-now vs planned: §V29/§V27/§C4 corrected now (durable, user-specified). §V16/§V20 encode-header reconciliation deferred to F5 (depends on extraction design, F1.T3 confirms). skill-body implementations of all themes = F2-F6.
plan choice: prep outputs left uncommitted for user review / `/review-plan`; ⊥ auto-commit. `encode-docs` §V16-removal edit is uncommitted in the same file F2/F3/F5 touch → commit separately or let an encode-docs phase sweep it.

## watchouts
- F2 & F3 & F5 all touch `encode-docs`; F5 depends on F3 (moves the ALREADY-simplified BAKED HEADERS). serialize; ⊥ cater-parallel across these.
- state machine self-referential: F2 rewrites the very PLAN baked-header + gate that governs cook/cater. the live `PLAN.md` header already carries the CORRECTED wording (hand-written this run); F2 syncs the `encode-docs` template + cook/cater bodies to match.
- `new` ambiguity = empty-stub (post-garnish, ⊥ phases) vs ready plan (prep-written, has phases); cook/cater ! disambiguate by phase presence (F2.T2).
- portability (§C4): impl phases F2-F5 ! ⊥ add numbered `§<S><n>` citations to skill BODIES (cite §V only in PLAN tasks); F6 sweeps. current inventory = only `handoff`:11 `(§V16)`.
- HANDOFF header (F3) still uses OLD baseline/oracle format in THIS baton; next handoff after F3 lands ! use the new one-line format.
- coherence (F7.T2): garnish "recorded oracle" resolves to the tests-line `(<cmd>)` after F3; confirm ⊥ skill hard-depends on a labeled oracle/baseline field.
- roster count: `AGENTS.md`/CHANGELOG say "11 skills"; F5 adds encode-header → 12 (AGENTS + SPEC §G + setup support list; ⊥ rewrite CHANGELOG history).
- `BACKLOG.md` blank again → any `/cook`|`/cater`|`/review-*`|`/garnish` before F4 lands ! still ⊥ read it (§V27).
- line numbers drift → re-find by quoted string (PLAN existing-assets cites anchors).

## final verification
item|status|evidence|decision
-|-|-|-
