<!-- PLAN FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Short-lived: one cycle. Replaced wholesale, ⊥ amended. Durable facts → SPEC.md.
Order: goal | ground rules | existing assets | phase order table | one section per phase.
Phase ids F1..Fn monotonic. F1 ! research. Fn ! final verify. ⊥ coding outside that span.
∀ phase names: goal | inputs | files | §T tasks (≥1) | verify | exit | next
§T tasks defined & tracked in each phase. Status: x done | ~ wip | . todo.
Tracked: planning status ∈ {new, work-in-progress, done} — keyed to EXECUTION, ⊥ authorship. prep writes/expands as `new`; cook/cater ALONE flip new→work-in-progress at start & run on new(has phases)|wip; handoff→done on ∀ §T x + verify HOLD; garnish resets new. `new`+⊥phases (empty stub) → /prep; `done` → /garnish. prep expands ⟺ status ≠ work-in-progress.
Encoding: same symbol set as SPEC.md. Preserve code, paths, ids verbatim.
Executable cold: a phase ⊥ readable without chat history is ⊥ finished.
Full rules: /encode-docs skill.
planning status: work-in-progress
-->

# PLAN

goal: close `review-code` NO-GO by making delegated `cater` phases multi-task-safe, commit-complete, assignment-scope coherent, & restoring review taxonomy mirror

## ground rules

- user selected fix-to-match-`SPEC.md`; preserve §V21/§V22/§V26/§V30, ⊥ amend durable truth
- research first; implementation after F1 evidence confirms exact edit boundaries; final verification last
- smallest coherent markdown-only diff; unwrapped `skills/**` prose; ⊥ project-specific refs, Python, skill `scripts/`, runtime deps
- `encode-docs` sole mutator of `PLAN.md`/`HANDOFF.md`; `SPEC.md` unchanged unless F1 proves existing durable truth internally contradictory
- ∀ phase: read touched files in full, preserve user changes, verify named evidence, self-review full scoped diff, update `CHANGELOG.md` `## [Unreleased]` for shipped fixes
- automated tests cover Agent Skills contract + real CLI discovery only; behavior/mirror/commit contracts use explicit manual byte and text checks under §C8
- no push/tag; implementation commit through `encode-commit`; `handoff` refreshed + committed after every phase

## existing assets

- `review-code` baseline `v0.6.0` → HEAD `2b5ccf1`; `npm.cmd test` pass 7/7; targeted contract 5/5; CLI discovery 2/2; `git diff --check` clean
- BLOCK: `skills/cater/SKILL.md:31,90` models one `§T` task despite §V21 multi-task phases
- DIVERGENCE: `skills/cater/SKILL.md:75,90-91` lacks mandatory accepted delegated phase commit + committed baton required by §V22
- DIVERGENCE: `skills/review-plan/SKILL.md:54` ≠ wrapped `skills/review-code/SKILL.md:56-58`, violating §V26 byte mirror
- HARDEN: `skills/cater/SKILL.md:75-79` requires worker completion write without explicitly allowing `HANDOFF-<phase-id>.md` in assignment scope
- `skills/encode-agent/SKILL.md` already carries bounded prompt quality, commit-policy, stop, & completion fields; prefer tightening caller contract over new abstraction
- no unresolved external API/version question; F1 local contract research only

## phase order

id|goal|depends|exit
|---|---|---|---|
F1|confirm task ownership, commit closure, writable scope, & mirror bytes|-|exact edit map + verification commands recorded; no unresolved `?`
F2|fix delegated `cater` lifecycle + assignment contract|F1|all remaining phase tasks accepted atomically; main commit/baton ownership explicit
F3|restore review taxonomy mirror + release note|F2|taxonomy block byte-identical; changelog covers user-visible fixes
F4|final verify implementation vs spec + plan|F3|suite green; relevant §I/§V/§T HOLD; drift resolved

## F1 research

goal: prove smallest contract-preserving edits before implementation
inputs: accepted review report; §C2-4/§C8/§C11-12; §I12; §V15-16/§V21-22/§V26/§V28-30; current `cater`/`cook`/`encode-agent`/review skill bodies
files: `SPEC.md`, `skills/cater/SKILL.md`, `skills/cook/SKILL.md`, `skills/encode-agent/SKILL.md`, `skills/review-code/SKILL.md`, `skills/review-plan/SKILL.md`, `CHANGELOG.md`, `tests/*.mjs`

§T TASKS

T1|x|map multi-task delegated phase ownership + closure (§V21, §V22, §V30)
touch: `PLAN.md`, `HANDOFF.md`
details: trace ready selection, assignment id/scope, acceptance, status flips, implementation commit, assignment purge, phase baton commit, retry path; settle one worker owns all remaining tasks in one phase; ∀ remaining task ids + contracts included in assignment; acceptance flips all assigned task rows only after full phase verification; main agent owns accepted implementation commit + committed phase handoff; worker default = do not commit
verify: `rg -n "phase|task|commit|handoff|HANDOFF-<phase-id>|completion" skills/cater/SKILL.md skills/cook/SKILL.md skills/encode-agent/SKILL.md SPEC.md`; evidence maps every §V21/§V22/§V30 clause to F2 edit or preserved line
exit: delegated lifecycle order unambiguous; no partial phase-close state; retry + failure preserve ownership
next: F1.T2

T2|x|confirm assignment writable scope + exact mirror boundary (§V26, §V28, §V30)
touch: `PLAN.md`, `HANDOFF.md`
details: confirm `HANDOFF-<phase-id>.md` must be included in worker writable scope solely for completion block; implementation scope stays disjoint; extract FINDING TAXONOMY & GATE from heading through GO rule in both review skills and identify canonical `review-plan` bytes; keep REPORT OUTPUT mirror unchanged
verify: PowerShell byte/string comparison returns taxonomy mismatch before F3 and REPORT OUTPUT equality; `rg -n "writable scope|completion|HANDOFF-<phase-id>" skills/cater/SKILL.md skills/encode-agent/SKILL.md`
exit: F2/F3 exact replacement boundaries + post-edit equality oracle recorded; no external research needed
next: F2.T1

## F2 delegated lifecycle fix

goal: make `cater` close multi-task delegated phases atomically with explicit assignment scope and main-owned commits
inputs: F1 lifecycle map; review BLOCK/DIVERGENCE/HARDEN; §V15/§V21-22/§V28-30; `cook` phase closure contract
files: `skills/cater/SKILL.md`, `skills/encode-agent/SKILL.md`

§T TASKS

T1|x|fix phase readiness, assignment contents, & acceptance status (§V21, §V30)
touch: `skills/cater/SKILL.md`
details: define ready phase by ≥1 non-`x` task; one delegated assignment owns all remaining task ids in that phase; disclose phase + task set; prompt includes every remaining task, invariant, touch path, verification case; acceptance reviews all assigned tasks and flips all their rows together only after phase contract passes; keep direct/delegated exclusivity and retry policy
verify: `rg -n "task|tasks|phase/task|Accept or return" skills/cater/SKILL.md`; manual line-by-line classification against §V21/§V30; `node --test tests/skill-contract.test.mjs` exact 5 cases green
exit: no singular task rule can partially close a multi-task phase
next: F2.T2

T2|x|enforce writable assignment file + main-owned commit/handoff closure (§V22, §V28, §V30)
touch: `skills/cater/SKILL.md`, `skills/encode-agent/SKILL.md`
details: include `HANDOFF-<phase-id>.md` in worker writable scope only for completion update; require worker do-not-commit policy unless explicit repository contract demands otherwise; after acceptance main agent commits scoped implementation via `encode-commit`, flips all assigned task rows through `encode-docs`, invokes `handoff`, commits baton, then purges assignment file + re-evaluates; order must preserve recoverable state if interrupted; align `encode-agent` required writable-scope wording without coupling it to cycle docs
verify: `rg -n "HANDOFF-<phase-id>|writable|do not commit|encode-commit|handoff|purge" skills/cater/SKILL.md skills/encode-agent/SKILL.md`; manual lifecycle trace proves §V22 after direct + delegated routes; targeted contract 5/5 green
exit: accepted delegated phase always has implementation commit + committed main baton; completion write never violates prompt scope
next: F3.T1

## F3 mirror + release note

goal: restore §V26 byte equality and record fixes
inputs: accepted F2 diff; review DIVERGENCE; canonical `review-plan` taxonomy block; §V11/§V26
files: `skills/review-code/SKILL.md`, `skills/review-plan/SKILL.md`, `CHANGELOG.md`

§T TASKS

T1|x|restore FINDING TAXONOMY & GATE byte mirror (§V26)
touch: `skills/review-code/SKILL.md`
details: replace only mismatched wrapped intro with canonical `skills/review-plan/SKILL.md` bytes; verify full block from heading through GO rule byte-identical; preserve each skill's surrounding review axes; confirm REPORT OUTPUT remains byte-identical
verify: PowerShell extraction/comparison returns `taxonomy_equal=True` + `report_equal=True`; `git diff --check`; targeted contract 5/5 green
exit: both intentional mirrors byte-identical; no unrelated review prose changed
next: F3.T2

T2|x|update `## [Unreleased]` with review fixes (§V11)
touch: `CHANGELOG.md`
details: add plain-English Fixed entry for multi-task delegated closure, main-owned commits/handoffs, writable completion scope, & taxonomy mirror; avoid plan ids/symbols
verify: `rg -n "^## \[Unreleased\]|^### Fixed|multi-task|handoff|taxonomy" CHANGELOG.md`; manual changelog scope check
exit: every shipped fix named once under Unreleased
next: F4.T1

## F4 final verification

goal: prove remediation closes review gate without spec drift or regressions
inputs: full F1-F3 diff; review report; relevant SPEC §C/§I/§V; all task contracts
files: `SPEC.md`, `PLAN.md`, `HANDOFF.md`, `skills/cater/SKILL.md`, `skills/encode-agent/SKILL.md`, `skills/review-code/SKILL.md`, `skills/review-plan/SKILL.md`, `CHANGELOG.md`

§T TASKS

T1|x|run automated + manual contract suite (§I7-8/§I12, §V1-8/§V11/§V15-16/§V21-22/§V26/§V28-30)
touch: `HANDOFF.md`
details: run full + targeted tests; repeat taxonomy/report byte mirrors; trace multi-task assignment through acceptance, implementation commit, all-task status flip, handoff commit, purge; verify assignment completion file explicitly writable; classify every relevant §I/§V and all §T HOLD/VIOLATE/UNVERIFIABLE with file/test evidence
verify: `npm.cmd test`; `node --test tests/skill-contract.test.mjs`; `node --test tests/cli-discovery.test.mjs`; mirror script True/True; exact failures named if red
exit: 7/7 + 5/5 + 2/2 green; no VIOLATE; every UNVERIFIABLE has reason + decision
next: F4.T2

T2|x|self-review cycle diff + close baton (§V16, §V19, §V21-22, §V29)
touch: `PLAN.md`, `HANDOFF.md`
details: review full diff for partial-close states, commit-order data loss, assignment scope contradiction, retry ambiguity, unnecessary duplication, wrapped skill prose, security issues, unrelated dirty work; resolve drift in skill or spec; update all task/status state only after evidence; commit through `encode-commit`; ⊥ push/tag
verify: `git diff --check`; `git status --short`; final table cites review BLOCK/DIVERGENCE/HARDEN closure + each relevant §I/§V/§T
exit: original review findings closed; full suite green; plan `done`; clean committed handoff
next: `/garnish`
