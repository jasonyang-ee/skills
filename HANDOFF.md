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

branch main | last commit bc1ddce | tests pass 7/7 (`node --test tests/skill-contract.test.mjs`; `node --test tests/cli-discovery.test.mjs`)
uncommitted: none after baton commit

## done this session

F1.T1 + F1.T2: adaptive routing + portable prompt contracts researched → 92b7ea4
F2.T1 + F2.T2: `encode-agent` + adaptive direct/delegated `cater` shipped → bc1ddce

## in progress (exact stop point)

F3.T1: ready — align `README.md`, `AGENTS.md`, & `skills/setup/SKILL.md` roster/workflow prose
mid-edit files: none

## next

F3.T1 | preconditions: F2 accepted; preserve generic setup template

## deviations & decisions

plan said changelog authored in F3 → moved to F2 ∵ behavior shipped there; F3 now verifies entry (PLAN.md updated: y)
user decided: `cater` MAY execute non-parallel work directly by loading `cook`; dispatch output ! include model + effort; sub-agent prompt quality supplied by new compact `encode-agent`

## watchouts

F3 provenance decision: original `encode-agent` → ⊥ `NOTICE.md` row; vendor-only rule in `AGENTS.md`
skill-creator scaffold metadata/resources skipped ∵ repo §C2-3 requires markdown-only flat `skills/<name>/SKILL.md`

## final verification

item|status|evidence|decision
|---|---|---|---|
