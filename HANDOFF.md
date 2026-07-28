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

branch main | last commit 72b5147 | tests pass 7/7 (`npm.cmd test`)
uncommitted: `SPEC.md`, `PLAN.md`, `HANDOFF.md` — prep package

## done this session

-

## in progress (exact stop point)

F1.T1: ready — confirm `.claude-plugin/plugin.json` version authority + equality with `package.json`
mid-edit files: none

## next

F1.T1 | preconditions: review-plan GO; package + plugin version = `0.6.0`; official version rule captured in §R9

## deviations & decisions

backlog said marketplace version → target `.claude-plugin/plugin.json` ∵ Claude resolves it before marketplace-entry version; ⊥ duplicate version in `.claude-plugin/marketplace.json` (PLAN.md + SPEC.md updated: y)
review-plan: research phases remaining 1; BLOCK 0; DIVERGENCE 0; UNKNOWN 0; HARDEN 0; NOTE 0; gate GO
user decided: sync Claude plugin release version with package release

## watchouts

`release.sh` executes commit/tag/push outside dry-run → implementation verification ! use syntax/help/dry-run + static mutation-path audit; ⊥ run real release
Windows PowerShell blocks `npm.ps1` in current environment → use `npm.cmd test` or Bash `npm test`

## final verification

item|status|evidence|decision
