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

branch main | last commit e67e339 (pre-plan baseline) | tests pass 7/7 (`npm.cmd test`)
uncommitted: none after planning-package commit

## done this session

-

## in progress (exact stop point)

F1.T1: ready — inventory dispatcher-only lines & map each to direct/delegated contract
mid-edit files: none

## next

F1.T1 | preconditions: review-plan gate GO; read named F1 files in full before status flip

## deviations & decisions

plan said baseline `npm test` → PowerShell blocked `npm.ps1`; equivalent `npm.cmd test` passed 7/7 (PLAN.md updated: n)
user decided: `cater` MAY execute non-parallel work directly by loading `cook`; dispatch output ! include model + effort; sub-agent prompt quality supplied by new compact `encode-agent`

## watchouts

review-plan: research phases remaining 1; BLOCK 0; DIVERGENCE 0; UNKNOWN 0; HARDEN 0; NOTE 1 (routing prose/provenance require manual evidence under §C8); gate GO
F1 ! preserve host portability: model/effort values come from available harness; record `inherit` | `unavailable` when control absent
`BACKLOG.md` intentionally blank; request fully encoded in `SPEC.md` + `PLAN.md`

## final verification

item|status|evidence|decision
|---|---|---|---|
