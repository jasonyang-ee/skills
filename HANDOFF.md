<!-- HANDOFF FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Session baton. Overwritten in full ∀ session. Records STATE, ⊥ intent (intent → PLAN.md, truth → SPEC.md).
Sections: header | done this session | in progress (exact stop point) | next | deviations & decisions | watchouts | final verification. Empty section → `-`, ⊥ deleted.
Header ! carry: branch | last commit sha (⊥ subject) | tests pass N/N \| FAIL: file+case + command | uncommitted files + why
Pointers = F<n>.T<n> (phase.task → PLAN.md), ⊥ bare step numbers. "in progress" & "next" ! use them.
"in progress" ! name current working task precisely: action, file, function. mid-edit files ! listed | `none`.
Failing tests ! named exactly (file + case), ⊥ "some failing".
final verification table ! filled only by the final verify phase; else header row alone.
Encoding: same symbol set as SPEC.md.
Full rules: /encode-docs skill.
-->

# HANDOFF 2026-07-23

branch main | last commit b4f44ce | tests pass 7/7 (`npm test`)
uncommitted: none (∀ phase lands its edits + §T flips + this baton in ONE commit)

## done this session
F1.T1: locked the 4 SPEC table header/delimiter pairs in `skills/encode-docs/SKILL.md` `### Section skeleton`; confirmed PLAN phase-order + HANDOFF final-verify templates are out of scope; confirmed live `SPEC.md` body tables already carry delimiter rows.
F1.T2: captured ∀ Theme-D + Theme-A anchors verbatim; locked the replacement HANDOFF header line and the §V29 clause-by-clause semantics.
F1.T3: captured the 5 BACKLOG insertion points with each file's local numbering; confirmed the `prep` mode gate = §V29 status.
F1.T4: confirmed the 3 templates to move, the supplier/writer split, the §V16/§V20 draft wording, and the `NOTICE.md` decision; confirmed tests + marketplace need ⊥ change.
F1.T5: oracle 7/7 green; portability grep ⊥ match; ∀ skill body far under the 500-line cap.
F2.T1-T4 (Theme G): 4 delimiter rows added inside `encode-docs` `### Section skeleton` (`skills/encode-docs/SKILL.md`:132,139,148,155) + lead prose now STATES the rule; SPEC baked-header table line rewritten in BOTH the template (`encode-docs`:295) and live `SPEC.md`:8, byte-identical; `AGENTS.md`:45 + `skills/setup/SKILL.md`:65 carry the same delimiter sentence; `CHANGELOG.md` `## [Unreleased]` entry added. `npm test` 7/7 green. `SPEC.md` `next: C13 I12 R8 V30` untouched, ⊥ row diff.
F3.T1-T5 (Theme D): `encode-docs` `## PLAN.md File` status paragraph rewritten execution-keyed + baked PLAN `Tracked:` line synced verbatim to the live `PLAN.md` header wording; `cook`:22 + `cater`:24 LOAD gate now runs on `wip`|`new`-with-phases and stops only on the empty stub; the `new`→`wip` flip added as an explicit step at `cook` `## PICK PHASE`:28 + `cater` `## SELECT PHASES TO DISPATCH`:30; `prep`:94 writes `new` + carries the expand-⟺-≠wip gate; `handoff`:30 is done-else-LEAVE; `CHANGELOG.md` entry added. `git grep "proceed only on" -- skills/` → ⊥ match; `npm test` 7/7 green.
F4.T1-T3 (Theme A): `encode-docs` `## HANDOFF.md File` template collapsed to `branch <name> | last commit <sha> | tests <pass N/N | FAIL: file+case> (<cmd>)`; Rule 2 reworded, old Rule 3 (baseline≠oracle) DELETED, rules renumbered 1-6; baked HANDOFF `Header ! carry:` + failing-tests lines rewritten; `handoff` GATHER bullet + `## RULES` 1-5 aligned byte-for-byte with the owner. This live `HANDOFF.md` moved onto the new header too. `git grep -i "oracle\|baseline\|<subject>" -- skills/encode-docs/SKILL.md skills/handoff/SKILL.md` → ⊥ match; `npm test` 7/7 green.

## in progress (exact stop point)
-
mid-edit files: none

## next
F5.T1 — in `skills/prep/SKILL.md`, rewrite Load step 3 ("Read `BACKLOG.md` if it exists, and treat it as part of the user request.") so it applies in ingest/expand mode only, rewrite Hard-outputs item 4 to state BOTH the defer and the ingest branch with the blank-only-after-`PLAN.md`-is-written ordering, and add the matching `## Boundaries` line. preconditions: F3 landed (the status gate F5 keys off) — done @ b4f44ce.

## deviations & decisions
`cook` started on `planning status: new` and flipped it → `work-in-progress` per `SPEC.md` §V29 (plan carries executable phases F1-F7 ∴ ⊥ an empty stub). The `cook` skill body still reads "proceed only on `work-in-progress`" — that stale clause is exactly what F3.T2 fixes; SPEC ≫ skill body.
F1 found ⊥ contradiction between `PLAN.md` and the tree → F2-F6 stand as written, ⊥ plan correction issued.
F1.T4 decisions recorded: (1) `NOTICE.md` GETS an `encode-header` row mirroring the `encode-docs` provenance (the moved SPEC header descends from `caveman`+`spec`); alternative "treat as original, ⊥ row" rejected ∵ §V10 wants ∀ shipped skill accounted and the bytes are derived. (2) each moved template keeps its trailing `Full rules: /encode-docs skill.` line ∵ the full document format lives in `encode-docs`; `encode-header` supplies header bytes only. (3) tests assert `skills.length > 0` + iterate discovered dirs ∴ a new skill dir is auto-covered, ⊥ count to bump.
F4 also rewrote the baked header + header line of THIS live `HANDOFF.md` (⊥ in the phase `files:` list). ⊥ scope creep: `cook` rewrites the baton ∀ phase, and once the format lands the baton ! be written by the current rules, else F7 flags it as drift.

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
