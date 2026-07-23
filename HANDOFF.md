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

branch main | last commit 8e08993 | tests pass 7/7 (`npm test`)
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
F5.T1-T4 (Theme B+C): `prep` Load step 3 gated to ingest mode, Hard-outputs item 4 now states BOTH defer + ingest with the blank-after-write ordering, `## Boundaries` carries the ⊥-blank-before-write line; ⊥-read gate added as `cook`:25, `cater`:27, `review-plan`:24, `review-code`:31 (each matching its own LOAD numbering); `garnish` Procedure:23 ⊥-read guard + Boundaries:58 ⊥-touch guard; `CHANGELOG.md` entry added. `git grep BACKLOG -- skills/` → gate present in ∀ 5 executors; `npm test` 7/7 green.
F6.T1-T5 (Theme E): NEW `skills/encode-header/SKILL.md` carries the 3 templates verbatim in post-F2/F3/F4 form + the supplier/writer rule + Boundaries; `encode-docs` `## BAKED HEADERS` reduced to a 1-line trigger hint (:281) and `### Dispatch`:84 + `### NEW`:98 now route through `encode-header`, body 345→295 lines; `SPEC.md` §V16 + §V20 rewritten IN PLACE for the supplier/writer split (⊥ new id, `next:` untouched); `NOTICE.md` gained an `skills/encode-header/` provenance row; `CHANGELOG.md` entry added. `npx skills add . --list` lists `encode-header`; `npm test` 7/7 green. Roster verified ⊥ re-edit: 12 skill dirs == `AGENTS.md`:7 count, `README.md`:90 link resolves, `marketplace.json` unchanged in the diff.
F7.T1-T3 (final verify): full suite 7/7; ∀ classified item HOLD after fixing 2 SPEC drifts this cycle caused (§V22 tail, §V15 support list) — see the result table. `planning status: done`, ∀ §T `x`. Cycle ready for `/garnish`.

## in progress (exact stop point)
-
mid-edit files: none

## next
`/garnish` — ∀ F1-F7 §T rows are `x`, `planning status: done`, the final-verification table below is ∀ HOLD, and `npm test` passes 7/7. `garnish` prunes stale `SPEC.md` rows on evidence, then blanks `PLAN.md` + `HANDOFF.md` to their baked-header template. preconditions: clean tree (`⊥ HANDOFF-<phase-id>.md` exist — this was a `cook` run, ⊥ `cater`).

## deviations & decisions
`cook` started on `planning status: new` and flipped it → `work-in-progress` per `SPEC.md` §V29 (plan carries executable phases F1-F7 ∴ ⊥ an empty stub). The `cook` skill body still reads "proceed only on `work-in-progress`" — that stale clause is exactly what F3.T2 fixes; SPEC ≫ skill body.
F1 found ⊥ contradiction between `PLAN.md` and the tree → F2-F6 stand as written, ⊥ plan correction issued.
F7 found 2 SPEC rows this cycle made false and fixed both in place (⊥ new ids, `next:` untouched): §V22's tail restated the old `⟺ work-in-progress` gate that F3 replaced → now `active plan gate → §V29` (one owner for the rule); §V15's support list omitted the newly shipped `encode-header`. Skills were right, the spec rows were stale ∴ SPEC changed, ⊥ code.
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
|---|---|---|---|
§V1-3|HOLD|`npm test` → `tests/skill-contract.test.mjs` "declares name and description as non-empty strings" + "names every skill legally, uniquely, and after its directory" + "keeps every description within the spec limit" pass; `encode-header` included|-
§V4|HOLD|`tests/skill-contract.test.mjs` "keeps every body under the recommended length" passes; largest body `encode-docs` 295 lines (was 345)|-
§V5|HOLD|`npx skills add . --list` lists `encode-header`; `tests/cli-discovery.test.mjs` "lists every skill in skills/" passes over 12 dirs|-
§V6|HOLD|new skill = 1 `SKILL.md`, ⊥ `scripts/`, ⊥ deps|-
§V8|HOLD|`git grep -P "[emoji ranges]" -- skills/ tests/` → ⊥ match|-
§V10|HOLD|`NOTICE.md` `## Modifications:` gained a `skills/encode-header/` row; derived-skill rows = 6, originals unrowed per existing practice|-
§V11|HOLD|`CHANGELOG.md` `## [Unreleased]` carries 5 new plain-English entries (one per theme)|-
§V16|HOLD|rewritten in place → `encode-docs` sole WRITER, `encode-header` supplies format; `skills/encode-header/SKILL.md` `## Boundaries` states it never writes|SPEC
§V20|HOLD|rewritten in place → header supplied by `encode-header`, emitted verbatim by `encode-docs`; `SPEC.md` `next: C13 I12 R8 V30` unchanged, ⊥ new id|SPEC
§V22|VIOLATE→fixed|tail read "run ⟺ `planning status: work-in-progress`", contradicting the §V29 machine F3 landed. Row is stale, skills are correct ∴ SPEC fixed: tail now "active plan gate → §V29", ⊥ restating the rule twice|SPEC
§V15|VIOLATE→fixed|support list omitted the newly shipped `encode-header`|SPEC
§V23|HOLD|`skills/garnish/SKILL.md`:58 ⊥-touch-BACKLOG boundary added; blank-to-template scope otherwise unchanged|-
§V27|HOLD|`git grep BACKLOG -- skills/` → ⊥-read gate @ `cook`:25, `cater`:27, `review-plan`:24, `review-code`:31, `garnish`:23; `garnish`:58 ⊥-touch; `prep`:41 both modes + `:49` ingest gate + `:152` blank-after-write boundary|-
§V28|HOLD|`encode-docs`:281 references `encode-header` and invokes it on compose ∴ co-loaded; `skills/encode-header/SKILL.md` is self-sufficient loaded alone; the 3 templates now exist in exactly ONE body, ⊥ duplicated|-
§V29|HOLD|`encode-docs`:192 paragraph + baked `Tracked:` line, `cook`:22+:28, `cater`:24+:30, `prep`:94, `handoff`:30 all describe the same execution-keyed machine incl. the empty-stub branch; `git grep "proceed only on" -- skills/` → ⊥ match|-
§C4|HOLD|`git grep "§[VCIRGT][0-9]" -- skills/` → ⊥ match (exit 1)|-
oracle|HOLD|`npm test` → pass 7/7, fail 0|-
garnish oracle wording|HOLD|`garnish`:18+:33 "the recorded oracle and full-suite command" still resolves — the command now lives in the `(<cmd>)` of the single tests line instead of a labeled `oracle` field. ⊥ break, ⊥ edit (the word `oracle` stays canonical outside the HANDOFF header per locked scope)|-
delimiter scope|HOLD|4 delimiter rows sit inside `encode-docs` `### Section skeleton` only; PLAN phase-order + HANDOFF final-verify templates unchanged in the F2 diff; rule STATED in the section's lead prose, ⊥ merely demonstrated|-
