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

# HANDOFF 2026-07-28

branch main | last commit 8083fdc | tests pass 7/7 (`npm.cmd test`)
uncommitted: `HANDOFF.md` — completed-cycle baton

## done this session

F1.T1: plugin version authority + equality confirmed → f880653
F1.T2: release mutation/gate/staging seams mapped → f880653
F2.T1: plugin manifest preflight + version mutation added → 43320aa
F2.T2: equality gate + release staging + changelog added → 43320aa
F3.T1: release path audited vs spec + plan → 8083fdc
F3.T2: final oracles + HOLD classification complete → 8083fdc

## in progress (exact stop point)

F3.T2: done — final oracles green + result table complete
mid-edit files: none

## next

F3.T2 | preconditions: cycle complete → `/garnish`

## deviations & decisions

backlog said marketplace version → target `.claude-plugin/plugin.json` ∵ Claude resolves it before marketplace-entry version; ⊥ duplicate version in `.claude-plugin/marketplace.json` (PLAN.md + SPEC.md updated: y)
user decided: sync Claude plugin release version with package release

## watchouts

real release intentionally ⊥ run; dry-run + isolated mutation prove bounded path without commit/tag/push
Windows PowerShell blocks `npm.ps1` in current environment → use `npm.cmd test` or Bash `npm test`

## final verification

item|status|evidence|decision
§I5|HOLD|`.claude-plugin/plugin.json:7`; `.claude-plugin/marketplace.json` ⊥ version; equality oracle|-
§I9|HOLD|`release.sh:62,169,176-220`; syntax/help/dry-run exit 0|-
§V14|HOLD|package + plugin = `0.6.0`; `release.sh:213-220` gates + stages next version|-
§T F1.T1|HOLD|official Claude docs checked 2026-07-28 + equality oracle|-
§T F1.T2|HOLD|`release.sh:62,149-152,169-226` seam audit|-
§T F2.T1|HOLD|isolated mutation → `9.8.7`; valid JSON + trailing newline|-
§T F2.T2|HOLD|dry-run `0.6.1`; `CHANGELOG.md:20`; `release.sh:216-220`|-
§T F3.T1|HOLD|`git show 43320aa`; full logic/complexity/reuse/security review|-
§T F3.T2|HOLD|`bash -n`; help; dry-run; equality; `npm.cmd test` 7/7; diff checks|-
