# HANDOFF 2026-07-16

branch <current> | last commit `1e93f5c` `feat(prep): template complete agent guidance` | tests green (`npm.cmd test`) | oracle `npm.cmd test`
uncommitted: `AGENTS.md` (pre-existing user change, unrelated)

## done this session
F1 x: local prep/template/test research complete → `1e93f5c`
F2 x: template + contract test + changelog complete → `1e93f5c`
F3 x: full verification complete → `1e93f5c`

## in progress (exact stop point)
done: steps 1,2,3 | NEXT STEP: none; resume with `/garnish` when cycle cleanup is requested
mid-edit files: none

## next
done | preconditions: `npm.cmd test` green

## deviations & decisions
plan said generic placeholders → target golden new-user sections because user supplied exact content (PLAN.md updated: y)
user decided: prep must construct golden `AGENTS.md` content for new users

## watchouts
- preserve existing guidance; project scripts remain user-filled placeholders

## final verification
item|status|evidence|decision
V69|HOLD|`skills/prep/SKILL.md`; prep contract test|code
T65|HOLD|`SPEC.md` research/task record|SPEC
T66|HOLD|`tests/repo-hygiene.test.mjs`; `npm.cmd test`|code
T67|HOLD|181 tests passed|-
