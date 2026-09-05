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
planning status: new
-->

# PLAN

goal: reconcile `skills/prep/SKILL.md` ambiguity handling with shipped autonomy guidance and align support docs without widening scope

## ground rules
- F1 research first; F3 final verify last; ⊥ code edits outside that span
- input = accepted review finding from `v0.6.2..8cb7e27`: `skills/prep/SKILL.md` still says ask until request unambiguous, while current quality contract and `SPEC.md` §R10 favor focused questions only when missing info materially affects outcome
- stale baton/state finding from prior `review-code` pass resolved by `garnish` blanking; ⊥ reopen it unless fresh evidence appears
- keep scope smallest coherent set: `skills/prep/SKILL.md` required; `CHANGELOG.md` required if wording lands; `SPEC.md` only if research shows `§R10` or durable guarantees must change; `README.md` only if public summary becomes false
- preserve planning-only role: `prep` may increase follow-through and better assumption handling, but ⊥ authorize implementation work or weaken `BACKLOG.md` / `planning status` gates (§V21, §V27, §V29)
- verification matched to doc-skill scope: full-file reread for touched docs + `npm test`; broaden only if new contradiction or failing check appears

## existing assets
- `SPEC.md` `§R10` already records the intended portable guidance: carry authorized work through completion; ask focused questions only when missing info materially changes outcome; explicit user instructions override conflicting skill guidance
- `skills/prep/SKILL.md` quality contract now carries that newer guidance, but the older workflow line still says ask until request unambiguous
- `CHANGELOG.md` already records the shipped collaboration-guidance pass; next change should either refine that note or add a follow-up unreleased line if wording changes land
- `PLAN.md`/`HANDOFF.md` were blanked by `garnish`; new cycle starts clean
- `npm test` passed after garnish cleanup; skill-body limits and discovery remain green

## phase order
id|goal|depends|exit
|---|---|---|---|
F1|research exact contradiction, target wording, durable blast radius|-|fix target clear; later phases narrowed; no open ambiguity on scope
F2|update `prep` wording and required support docs|F1|`prep` contradiction removed or narrowed; support docs aligned
F3|final verify logic, doc alignment, and repo checks|F2|touched docs reread; `npm test` green; residual uncertainty recorded

## F1 research
goal: confirm smallest fix that aligns `prep` with the shipped autonomy intent and decide whether any durable or public docs must move with it
inputs: accepted review finding; `skills/prep/SKILL.md`; `SPEC.md` §R10 §V21 §V27 §V29; `CHANGELOG.md`; `AGENTS.md`; tests
files: `skills/prep/SKILL.md` `CHANGELOG.md` `SPEC.md` `README.md`

§T TASKS:
T1|.|pinpoint contradiction and intended fix path
touch: `skills/prep/SKILL.md` `SPEC.md`
details: compare `skills/prep/SKILL.md` quality contract vs workflow request-distillation rule. Confirm whether the right fix is to narrow or replace the older “ask until request is unambiguous” line so it matches `SPEC.md` `§R10`, while preserving one-question-at-a-time discipline and `prep`’s planning-only boundary (§V21, §V29).
verify: contradiction, target text, and preserved boundaries named explicitly; no unresolved choice between changing skill text vs changing `SPEC.md`
exit: implementation can edit one local rule without reopening broader workflow design
next: F1.T2

T2|.|decide support-doc blast radius
touch: `CHANGELOG.md` `README.md` `SPEC.md`
details: determine whether the fix needs only `CHANGELOG.md`, or whether `README.md` or `SPEC.md` also become inaccurate. Preserve `SPEC.md` high bar (§V17); if live behavior is meant to match `§R10`, default `SPEC.md` unchanged.
verify: F2 names every additional file that must change, or states why each file stays untouched
exit: implementation scope fixed to exact files
next: F2.T1

verify: reread findings against `SPEC.md` + repo guidance; later phases reflect confirmed scope and constraints only
exit: no open research unknown blocks implementation
next: F2.T1

## F2 implementation
goal: remove the `prep` contradiction and align support docs with the resulting behavior
inputs: F1 findings; `skills/prep/SKILL.md`; `CHANGELOG.md`; optional `SPEC.md` / `README.md` if F1 says required
files: `skills/prep/SKILL.md` `CHANGELOG.md` `SPEC.md` `README.md`

§T TASKS:
T1|.|fix `prep` ambiguity-handling rule
touch: `skills/prep/SKILL.md`
details: update the workflow/distillation rule so `prep` asks one focused question at a time only when missing information materially affects correctness, scope, durable-truth judgment, or authorization; otherwise continue authorized planning work. Keep the planning-only boundary, smallest-coherent-scope requirement, and one-question discipline. Check `§R10`, `§V21`, `§V27`, `§V29`.
verify: full-file reread proves `skills/prep/SKILL.md` no longer contradicts itself and does not authorize implementation work
exit: `prep` guidance consistent across quality contract and workflow sections
next: F2.T2

T2|.|align support docs with landed fix
touch: `CHANGELOG.md` `SPEC.md` `README.md`
details: add or refine `CHANGELOG.md` `## [Unreleased]` plain-English note for this fix. Amend `SPEC.md` only if F1 proves `§R10` or a durable invariant is wrong after the skill-text change. Touch `README.md` only if its public summary becomes false.
verify: `CHANGELOG.md` note present when wording changes land; untouched docs have an explicit reason
exit: supporting docs match live behavior
next: F3.T1

verify: reread final `prep` text and touched docs; ensure the local fix stays local
exit: implementation phase complete with no unresolved contradiction
next: F3.T1

## F3 final verify
goal: prove the contradiction is resolved, the docs align, and the repo checks stay green
inputs: touched docs; `SPEC.md`; `PLAN.md`; tests
files: `skills/prep/SKILL.md` `CHANGELOG.md` `SPEC.md` `README.md` `tests/skill-contract.test.mjs` `tests/cli-discovery.test.mjs`

§T TASKS:
T1|.|re-read touched docs against the finding
touch: `skills/prep/SKILL.md` `CHANGELOG.md` `SPEC.md` `README.md`
details: classify whether the original review finding now resolves as HOLD or still violates expectations. Check that `prep`’s question behavior, instruction priority, and planning boundary are coherent with `§R10`, `§V21`, `§V27`, and `§V29`. Name any remaining drift explicitly.
verify: final verification notes can cite file evidence for every conclusion
exit: no unresolved logic contradiction remains
next: F3.T2

T2|.|run repo verification matched to change scope
touch: `tests/skill-contract.test.mjs` `tests/cli-discovery.test.mjs`
details: run `npm test`. Use exact oracle cases from the existing repo contract/discovery suite. Broaden checks only if a failure or new contradiction appears.
verify: `npm test` green, or exact failing case names + cause recorded
exit: executable validation complete
next: F3.T3

T3|.|close with explicit residuals
touch: `PLAN.md` `HANDOFF.md`
details: update `HANDOFF.md` with what changed, what was verified, and any remaining uncertainty. If all relevant checks hold, route next step to `/review-plan` or `/cook` as appropriate for the small wording fix.
verify: cold next session can continue or close without chat history
exit: cycle complete or remaining decision routed explicitly
next: -

verify: reread final phase against user request; ensure this cycle addresses the accepted review finding and nothing broader
exit: finished cycle ready for review or execution
next: -
