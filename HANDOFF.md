<!-- HANDOFF FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Session baton. Overwritten in full ∀ session. Records STATE, ⊥ intent (intent → PLAN.md, truth → SPEC.md).
Sections: header | done this session | in progress (exact stop point) | next | deviations & decisions | watchouts | final verification. Empty section → `-`, ⊥ deleted.
Header ! carry: branch | last commit | tests | baseline + oracle command | uncommitted files + why
Pointers = F<n>.T<n> (phase.task → PLAN.md), ⊥ bare step numbers. "in progress" & "next" ! use them.
"in progress" ! name the NEXT TASK precisely: action, file, function. mid-edit files ! listed | `none`.
Red tests ! named exactly (file + test name), ⊥ "some failing".
final verification table ! filled only by the final verify phase; else header row alone.
Encoding: same symbol set as SPEC.md.
Full rules: /encode-docs skill.
-->

# HANDOFF 2026-07-22

branch main | last commit 48c6399 refactor: slim encode-commit | tests green (`node --test` 7/7)
baseline RED@cycle-start (`tests/repo-hygiene.test.mjs` 7 fail + `tests/attribution.test.mjs` 1 fail — both purged by F2) | oracle `node --test`
uncommitted: none (this baton commits next)

## done this session
F1: currency-check §R6/§R7 vs live Claude Code docs; fixed drift plugin `source:"."`→`"./"` in §R7 → 3d6fc89
F2: purged brittle suites (repo-hygiene+attribution), re-pointed §V comments, narrowed §C+AGENTS test-scope → fbeeee7
F3: encode-docs = sole mutator ∀3 docs; handoff reframed content-gatherer; HANDOFF format redesigned lean `F<n>.T<n>` → 78471c3
F5: encode-commit slimmed 94→45 lines (LF-normalized) → 48c6399

## in progress (exact stop point)
none ~: wave 1 (F2∥F3∥F5) dispatched via cater sub-agents, all accepted + committed | NEXT TASK: dispatch F4 sole-mutator consumer sweep — route direct PLAN/HANDOFF write verbs through encode-docs in `skills/{prep,cook,cater,garnish,review-plan,setup}/SKILL.md` + `AGENTS.md` §AI-File-Purpose (offenders: prep:149, cook:39,95, cater:29,93, garnish:68, review-plan:98,99,150)
mid-edit files: none

## next
F4.T4 | preconditions: F3+F2 done (met). Then F6.T6 (plugin manifests + install docs; waits F2+F4 AGENTS/SPEC) → F7.T7 (review-gate unify; waits F4+F6) → F8.T8 (final verify)

## deviations & decisions
plan said §R7 `source:"."` → did `source:"./"` ∵ live doc: relative source ! start `./`, marketplace-root = `"./"`, single entry → default `skills/` full scan (PLAN.md updated: y, SPEC §R7)
user decided: F6 names marketplace `jasonyang-ee` + plugin `skills` → `/plugin install skills@jasonyang-ee`; F6 confirmed wanted
user decided: commit per phase + PUSH all at end of round (overrides default ⊥ push)
cater model: sub-agents edit-only in shared tree (⊥ commit, ⊥ full-suite, ⊥ touch PLAN/HANDOFF); dispatcher runs authoritative `node --test`, reviews diff, commits per phase, flips §T

## watchouts
- AGENTS.md touched by F4 (§AI-File-Purpose) + F6 (install paths) — sequential, ⊥ same wave. F2 already edited its §Layout tests note (separate section).
- SPEC.md touched by F6 (§I install rows) + F7 (§V review anchor) — both via encode-docs, sequential. `next: R8 V26` in SPEC header.
- `skills/review-plan/SKILL.md` touched by F4 (sole-mutator) then F7 (taxonomy) — run F4 first.
- F6 live install (`/plugin marketplace add .`) = manual user smoke; ⊥ CI-verifiable.
- encode-commit derived-MIT → keep `NOTICE.md` row; ⊥ attribution block in body (held).
- `SPEC-OBSELETE.md` + `REFACTOR.md` = cruft, out of scope, leave.

## final verification
item|status|evidence|decision
-|-|-|-
