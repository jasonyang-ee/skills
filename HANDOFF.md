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
uncommitted: `SPEC.md` (§V27 rewrite → full BACKLOG lifecycle) + `PLAN.md` (fresh cycle F1-F4) + `HANDOFF.md` (this baton) + `BACKLOG.md` (blanked, ingested → PLAN). ALL held pending user review / `/review-plan`.

## done this session
prep: ingested `BACKLOG.md` (3 themes) → `PLAN.md` F1-F4; rewrote `SPEC.md` §V27 (BACKLOG lifecycle); blanked `BACKLOG.md` (ingest-mode, after PLAN written). ⊥ commit yet.

## in progress (exact stop point)
-
mid-edit files: none

## next
F1.T1 (`/cook F1` or `/review-plan` first) — confirm HANDOFF-header edit sites in `skills/encode-docs/SKILL.md` + `skills/handoff/SKILL.md` & lock blessed header bytes. preconditions: none.

## deviations & decisions
user decided (this cycle): HANDOFF header = ONE tests line (⊥ separate baseline line, ⊥ commit subject); wording cleanup = HANDOFF-only (⊥ harmonize garnish/review-code/cater); `oracle` word stays where it names the canonical full-suite command (cook/garnish/review-code), removed only from HANDOFF header.
dogfood: this run applied §V27 ingest blank-after-write (not yet implemented in `prep` skill — that lands in F3.T2). `BACKLOG.md` content fully captured in PLAN F1-F4 before blanking, so nothing lost.
plan choice: prep outputs left uncommitted for user review / `/review-plan` before `/cook`; ⊥ auto-commit.

## watchouts
- HANDOFF header change (F2) is self-referential: F2 rewrites the very template `encode-docs` uses to write THIS file. The NEXT handoff after F2 lands ! use the new one-line format; this baton still uses the current format.
- coherence (F4.T2): garnish precond#4/#5 say "recorded oracle" — after F2, command lives on the tests line `(<cmd>)`, ⊥ a labeled oracle field. Confirm no skill hard-depends on the dropped field; user scoped HANDOFF-only ∴ note, ⊥ fix unless real break.
- ingest/defer trigger = `PLAN.md` `planning status` (§V29): work-in-progress → defer (append, ⊥ prune); new|done|absent → ingest (read, write PLAN, blank). F3.T2 ! key on this exactly.
- line numbers drift → re-find by quoted string (PLAN cites exact anchors).
- `BACKLOG.md` now blank → any `/cook`|`/cater`|`/review-*`|`/garnish` before F3 lands ! still ⊥ read it (§V27), even though F3 not yet implemented.

## final verification
item|status|evidence|decision
-|-|-|-
