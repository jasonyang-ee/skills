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

# HANDOFF 2026-07-26

branch main | last commit aa54154 | tests pass 5/5 (`node --test tests/skill-contract.test.mjs`)
uncommitted: none after baton commit

## done this session

F1.T1 + F1.T2: adaptive routing + portable prompt contracts researched → 92b7ea4
F2.T1 + F2.T2: `encode-agent` + adaptive direct/delegated `cater` shipped → bc1ddce
F3.T1 + F3.T2: public + bootstrap docs aligned; provenance/changelog verified → aa54154

## in progress (exact stop point)

F4.T1: ready — run full automated/manual contract suite & classify relevant spec rows
mid-edit files: none

## next

F4.T1 | preconditions: F3 accepted; inspect full cycle diff from dc55c2b

## deviations & decisions

plan said `NOTICE.md` touched in F3 → unchanged ∵ `encode-agent` original, not vendored; §V10 + `AGENTS.md` vendor rule HOLD (PLAN.md updated: y)
user decided: `cater` MAY execute non-parallel work directly by loading `cook`; dispatch output ! include model + effort; sub-agent prompt quality supplied by new compact `encode-agent`

## watchouts

F4 full suite on PowerShell → use `npm.cmd test` if `npm.ps1` policy blocks `npm test`
final table ! classify §I7-8/§I12 + §V1-8/§V10-11/§V15/§V22/§V28-30

## final verification

item|status|evidence|decision
|---|---|---|---|
