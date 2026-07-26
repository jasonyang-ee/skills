<!-- HANDOFF FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Session baton. Overwritten in full ∀ session. Records STATE, ⊥ intent (intent → PLAN.md, truth → SPEC.md).
Sections: header | done this session | in progress (exact stop point) | next | deviations & decisions | watchouts | final verification. Empty section → -, ⊥ deleted.
Header ! carry: branch | last commit sha (⊥ subject) | tests pass N/N | FAIL: file+case + command | uncommitted files + why
Pointers = F<n>.T<n> (phase.task → PLAN.md), ⊥ bare step numbers. "in progress" & "next" ! use them.
"in progress" ! name current working task precisely: action, file, function. mid-edit files ! listed | `none`.
Failing tests ! named exactly (file + case), ⊥ "some failing".
final verification table ! filled only by final verify phase; else header row alone.
Encoding: same symbol set as SPEC.md.
Full rules: /encode-docs skill.
-->

# HANDOFF 2026-07-26

branch main | last commit f0bb1d2 | tests pass 7/7 (`npm.cmd test`); targeted pass 5/5 + 2/2; mirrors True/True
uncommitted: none after prep commit

## done this session

`review-code` @ baseline `v0.6.0` → NO-GO: 1 BLOCK, 2 DIVERGENCE, 1 HARDEN
`prep` → fix-to-match-SPEC plan; §V unchanged
embedded `review-plan` → GO; research phases remaining: 1; no open `?`
F1.T1 + F1.T2: delegated lifecycle, writable scope, & mirror boundaries confirmed → 2149a3f
F2.T1 + F2.T2: atomic multi-task acceptance + main-owned commit closure shipped; contract 5/5 → 66f8485
F3.T1 + F3.T2: review mirrors restored + Unreleased fix recorded; mirrors True/True; contract 5/5 → f0bb1d2

## in progress (exact stop point)

F4.T1: ready — run full + targeted suites, mirror oracle, manual lifecycle trace
mid-edit files: none

## next

F4.T1 | preconditions: F3 accepted

## deviations & decisions

user decided: fix skills to match §V21/§V22/§V26; ⊥ amend SPEC
prep decision: worker owns all remaining tasks in delegated phase; main owns accepted implementation + baton commits

## watchouts

`BACKLOG.md` ingested; blank only after `PLAN.md` write
PowerShell execution policy blocks `npm.ps1` → use `npm.cmd test`
taxonomy mirror mismatch limited to wrapped intro: `skills/review-code/SKILL.md:56-58` vs `skills/review-plan/SKILL.md:54`

## final verification

item|status|evidence|decision
|---|---|---|---|
