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

branch main | last commit 92b7ea4 | tests pass 7/7 (`npm.cmd test`, baseline unchanged)
uncommitted: none after baton commit

## done this session

F1.T1 + F1.T2: adaptive routing + portable prompt contracts researched → 92b7ea4

## in progress (exact stop point)

F2.T1: ready — create `skills/encode-agent/SKILL.md` from F1 bounded prompt contract
mid-edit files: none

## next

F2.T1 | preconditions: F1 accepted; read F2 inputs + neighbouring skills in full

## deviations & decisions

plan said original `encode-agent` provenance decision in F3 → F1 proved ⊥ `NOTICE.md` row ∵ repo requires rows only for vendored MIT skills (PLAN.md updated: y)
user decided: `cater` MAY execute non-parallel work directly by loading `cook`; dispatch output ! include model + effort; sub-agent prompt quality supplied by new compact `encode-agent`

## watchouts

F2 ! preserve host portability: model/effort values come from available harness; record `inherit` | `unavailable` when control absent
skill-creator scaffolder skipped ∵ repo §C2-3 requires markdown-only flat `skills/<name>/SKILL.md`

## final verification

item|status|evidence|decision
|---|---|---|---|
