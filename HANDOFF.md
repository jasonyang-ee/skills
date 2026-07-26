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

branch main | last commit 25bdcd2 | tests pass 7/7 (`npm.cmd test`); targeted pass 5/5 + 2/2
uncommitted: none after baton commit

## done this session

F1.T1 + F1.T2: adaptive routing + portable prompt contracts researched → 92b7ea4
F2.T1 + F2.T2: `encode-agent` + adaptive direct/delegated `cater` shipped → bc1ddce
F3.T1 + F3.T2: public + bootstrap docs aligned; provenance/changelog verified → aa54154

## in progress (exact stop point)

F4.T2: done — full cycle diff self-reviewed; final table HOLD
mid-edit files: none

## next

`/garnish` | preconditions: final verification commit + baton commit

## deviations & decisions

plan said `npm test` → `npm.cmd test` ∵ PowerShell execution policy blocks `npm.ps1`; Node suite unchanged (PLAN.md updated: n)
user decided: `cater` MAY execute non-parallel work directly by loading `cook`; dispatch output ! include model + effort; sub-agent prompt quality supplied by new compact `encode-agent`

## watchouts

`NOTICE.md` unchanged ∵ `encode-agent` original; vendor-only provenance rule HOLD
skill-creator scaffold extras skipped ∵ §C2-3 markdown-only flat skill layout

## final verification

item|status|evidence|decision
|---|---|---|---|
§I7|HOLD|`skills/encode-agent/SKILL.md`; contract 5/5|-
§I8|HOLD|`npm.cmd test` pass 7/7|-
§I12|HOLD|`skills/encode-agent/SKILL.md:9-81`|-
§V1-4|HOLD|`tests/skill-contract.test.mjs` pass 5/5|-
§V5|HOLD|`tests/cli-discovery.test.mjs` pass 2/2; `encode-agent` listed|-
§V6|HOLD|`skills/encode-agent/` contains `SKILL.md` only|-
§V7-8|HOLD|manual full read of touched `skills/**`; ⊥ project refs/emoji|-
§V10|HOLD|`NOTICE.md`; `AGENTS.md` vendor-only row rule; helper original|-
§V11|HOLD|`CHANGELOG.md:8-16`|-
§V15|HOLD|`skills/cater/SKILL.md:9-51`; `AGENTS.md:21-28`|-
§V22|HOLD|`skills/cater/SKILL.md:32-51`, `:73-93`|-
§V28|HOLD|`skills/encode-agent/SKILL.md:9-81`; ⊥ external skill-body dependency|-
§V29|HOLD|`PLAN.md` planning status `done`; ∀ task `x`|-
§V30|HOLD|`skills/cater/SKILL.md:55-77`; `skills/encode-agent/SKILL.md:11-81`|-
§T F1.T1-F4.T2|HOLD|`PLAN.md` ∀ 8 tasks `x`; named phase evidence above|-
