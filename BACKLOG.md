once prep ingested BACKLOG.md, we will simply blank it to avoid confusion and ensure that all relevant information is captured in the appropriate documentation files. guard is if we accidently prep but got cut off from session limit, so we will only blank after PLAN.md is written to capture all backlog information. This ensures that no important details are lost and that the documentation remains clear and organized.

This is a live HANDOFF.md file, I want you to give me good opnion on the current format. Is it good for the purpose of tracking progress and ensuring that all relevant information is captured? Are there any areas that could be improved or clarified? I feel the baseline should not use green|red|color to track, we should use explicit pass|fail|etc to indicate the status. There should be no need for `oracle` used as keyword here. It usually just the same full repo unit test script. Please let me know if oralcle really helps you to determine the handoff contition? Last commit may just need commit hash? let's skip including commit message in the handoff. Once all those are addressed, please update the handoff and encode-docs skill to reflect the changes.
```
# HANDOFF 2026-07-22

branch main | last commit 5ace8b9 refine encoding and template | tests green (`node --test` 7/7, not re-run — F1 = docs-only research)
baseline green | oracle `npm test`
uncommitted: `SPEC.md`+`CHANGELOG.md` (prior spec-refresh foundation); `PLAN.md`+`HANDOFF.md` (plan+baton); `SWEEP.md` (F1 artifact). ALL commits HELD pending review gate.

## done this session
F1.T1/T2/T3 (all `x`): swept 11 skills + AGENTS + SPEC → `SWEEP.md` = inconsistency register (X1-X22) + skill-loading state machine + overlap/de-dup map. PLAN existing-assets updated with F1 findings.

## in progress (exact stop point)
-
mid-edit files: none

## next
REVIEW GATE (user) → then F2.T1. User reviews `SWEEP.md` and decides: (a) X17 workflow step-count (setup 6 vs SPEC 5), (b) confirm F2 expansion for multi-task propagation (X13-X16, X18) + review-plan into scope, (c) F3 cut list (near-empty) incl. REPORT OUTPUT block (2nd mirror | accept). Then cook resumes F2.

## deviations & decisions
plan choice: F1 held its commit — SWEEP.md is a review-gate artifact that may change on user input; commit F1 + foundation together once gate resolves scope, so history stays coherent.
F1 refined later phases (per cook/prep doctrine): added multi-task-propagation + typo + X17 findings to PLAN existing-assets rather than rewriting F2/F4 before the gate decides scope.

## watchouts
- MULTI-TASK half-propagated: decision landed only at encode-docs:350. Still singular at encode-docs:221, **review-plan:70 (a BLOCK trigger — would fail a valid multi-task plan)**, garnish:23, prep:21. F2 must cover all; review-plan not yet in F2 file list.
- X17 workflow count is a genuine SPEC↔setup contradiction → needs user ruling before fixing.
- F3 de-dup near-empty (skills already well-factored; dup is in necessary emitters / travelling headers / protected mirror). Set token-reduction expectation on F4, not F3.
- SELF-SUFFICIENCY (§V28) + PROTECTED taxonomy mirror (§V26) still bind F3.
- planning-status gate spans 5 skills + encode-docs def (F2.T3/T6) — wire all.
- line numbers drift → re-find by quoted string (SWEEP.md quotes each).
- `SWEEP.md` short-lived → F5 decides persist-as-AGENTS-section | drop at /garnish.

## final verification
item|status|evidence|decision
-|-|-|-
```

It seems a cold agent session will auto read BACKLOG.md. Please add a cook or cater or review-* or garnish gate to prevent reading BACKLOG.md since is is raw file and is not properly ingested and summarized by prep yet. Please don't read BACKLOG.md until prep has ingested it. This can be in the LOAD secion. Garnish is especially prohibited from touching BACKLOG.md. Maybe also update setup to make the agents.md file to have AI file to make it clear of BACKLOG.md is explicit for prep only. The edge case is that if prep on a work-in-progress session with BACKLOG.md file existed, we will only take user input and put into the BACKLOG.md file, and be sure to not prune BACKLOG.md in this case.
