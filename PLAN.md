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
planning status: done
-->

# PLAN

goal: assess latest-model guide fit; adopt portable autonomy/instruction/style/verification cues into `prep`/`cook`/`cater`/`review-code` without breaking role boundaries

## ground rules
- F1 research first; F5 final verify last; ⊥ skill-body edits outside that span
- source priority: user request + fetched latest-model guide (2026-09-05) + current skill text + `SPEC.md`; model-specific API/migration details ∉ scope unless they change portable wording
- exact `SKILL.md` oracle for §V1-§V5 = `tests/skill-contract.test.mjs` cases `ships at least one skill with parseable frontmatter`, `declares name and description as non-empty strings`, `names every skill legally, uniquely, and after its directory`, `keeps every description within the spec limit`, `keeps every body under the recommended length`; `tests/cli-discovery.test.mjs` case `lists every skill in skills/`. prose fit still needs full-file reread
- keep scope smallest coherent set: `skills/prep/SKILL.md`, `skills/cook/SKILL.md`, `skills/cater/SKILL.md`, `skills/review-code/SKILL.md`; touch `skills/review-plan/SKILL.md`, `README.md`, `SPEC.md` only if evidence says required; `CHANGELOG.md` ! update if skill wording lands (`AGENTS.md`)
- map shared guidance by role, ⊥ copy/paste blindly: `prep` stops at plan+self-review+handoff, `cook`/`cater` carry authorized implementation through relevant verification, `review-code` stays read-only and carries review through `prep` handoff
- default `SPEC.md` unchanged (§V17, §V18, §V21, §V22, §V25, §V26, §V29, §V30 already cover much of flow); add/amend durable row only if later wording becomes standing repo guarantee
- preserve existing mirrors: if `review-code` change reaches shared FINDING TAXONOMY & GATE or REPORT OUTPUT, mirror byte-identical change in `skills/review-plan/SKILL.md` (§V26)
- verification matched to doc-skill scope: reread touched skill files in full, confirm role/approval/verification logic coherent, run `npm test`; broaden only if concrete drift or failure appears

## existing assets
- current `prep` already owns research-first planning, plan review, baton handoff, and `SPEC.md` high-bar gating (§V21, §V29)
- current `cook` already owns execution-through-verification and approval stop conditions; current `cater` already owns delegation thresholds, model/effort disclosure, and acceptance review (§V22, §V30)
- current `review-code` already owns read-only audit, gate taxonomy, and `prep` handoff; paired mirror with `review-plan` constrains edits (§V25, §V26)
- fetched source guide portable set now recorded in `SPEC.md` §R10: initiative/follow-through, explicit instruction precedence, concise plain output, explicit delegation tuning, verification calibrated to scope
- fetched source guide also contains model/API-specific content (`GPT-6 Astra`, Responses API, reasoning controls) that should stay out of generic public skills unless turned into portable wording
- `AGENTS.md` requires `npm test` and `CHANGELOG.md` `## [Unreleased]` update for every landed feature/fix; this cycle should treat skill-guidance edits as in-scope changelog work
- tests assert skill contract/discovery, ⊥ prose semantics; doc/skill edits still use `npm test` as repo check
- `BACKLOG.md` empty; `PLAN.md` header status `new`; branch `main`; `HEAD` `331df1d`

## phase order
id|goal|depends|exit
|---|---|---|---|
F1|research guide-to-skill fit; decide portable vs model-specific adoption|-|mapping complete; later phases tightened; shared-file blast radius known
F2|update `prep` quality contract for planning-role autonomy + reporting|F1|`prep` wording drafted; boundaries preserved
F3|update `cook` + `cater` contracts for execution/delegation autonomy + calibrated verification|F1,F2|executor wording drafted; routing + approval logic coherent
F4|update `review-code` reviewer contract; add required changelog; touch README/SPEC only if required|F1,F2|review wording drafted; mirror-sensitive edits resolved; changelog rule satisfied
F5|final verify fit, mirrors, limits, tests|F2,F3,F4|touched docs reread; `npm test` green; residual uncertainty recorded

## F1 research
goal: decide which latest-model cues belong in these skills, how each cue changes by role, and whether any shared-doc/spec follow-up is warranted
inputs: user request; pasted condensed guide; `SPEC.md` §R10 + §V21-§V30; `AGENTS.md`; current skill files; `README.md`; `CHANGELOG.md`; tests
files: `skills/prep/SKILL.md` `skills/cook/SKILL.md` `skills/cater/SKILL.md` `skills/review-code/SKILL.md` `skills/review-plan/SKILL.md` `README.md` `CHANGELOG.md` `SPEC.md`

§T TASKS:
T1|x|map guide bullets to repo roles
touch: `skills/prep/SKILL.md` `skills/cook/SKILL.md` `skills/cater/SKILL.md` `skills/review-code/SKILL.md`
details: use resolved portable set from `SPEC.md` §R10: carry authorized work through completion; ask focused questions only when missing info materially changes outcome; explicit user instructions override conflicting skill guidance; tune delegation; keep output plain + concise; match verification to change scope. Reject model/API-specific migration text. Map each kept cue to `prep` | `cook` | `cater` | `review-code`, with role-adjusted wording where `prep` and `review-code` do not implement.
verify: mapping matches `SPEC.md` §R10 + §V21/§V22/§V25/§V29/§V30; every kept cue has target file or explicit reject reason
exit: no guide bullet left unmapped or uncategorized
next: F1.T2

T2|x|decide durable blast radius
touch: `SPEC.md` `README.md` `skills/review-plan/SKILL.md`
details: use resolved repo facts: `CHANGELOG.md` update ! required when landed skill wording changes; `README.md` stays evidence-gated; `SPEC.md` stays high-bar/durable-only; `skills/review-plan/SKILL.md` touched only if `review-code` edits reach shared mirror blocks. Preserve §V17 high bar and §V26 mirror rule.
verify: later phases explicitly include required `CHANGELOG.md` work and state why `README.md`, `SPEC.md`, or `skills/review-plan/SKILL.md` stay untouched when no evidence appears
exit: implementation phases narrowed to exact files and shared constraints
next: F2.T1

verify: reread `SPEC.md` §R10 + local invariants + repo guidance; later phases reflect resolved facts, ⊥ open guesses
exit: portable adoption set approved for implementation work
next: F2.T1

## F2 `prep` contract
goal: fold portable autonomy/instruction/style/verification cues into `prep` without weakening its planning-only boundary
inputs: F1 mapping; current `skills/prep/SKILL.md`; `SPEC.md` §V21, §V29
files: `skills/prep/SKILL.md`

§T TASKS:
T1|x|add planning-role autonomy + authority wording
touch: `skills/prep/SKILL.md`
details: make explicit that `prep` carries authorized work through request distillation, repo-context research, plan drafting, plan self-review, and baton handoff. Ask only when missing info materially changes correctness, scope, or authorization. Preserve boundary "Do not write code from `prep`" and existing research-first / handoff duties (§V21, §V29).
verify: role-boundary reread now; final oracle = ground-rules `SKILL.md` cases + `tests/cli-discovery.test.mjs` `lists every skill in skills/`; wording ⊥ authorize implementation or plan clobber
exit: autonomy/approval language clear and role-correct
next: F2.T2

T2|x|tighten instruction-conflict + reporting guidance
touch: `skills/prep/SKILL.md`
details: add explicit user-instruction precedence over conflicting skill guidance; if a skill rule causes pause/deviation, require naming the file + rule and whether it is explicit or interpretive. Add concise result-first report guidance: summarize plan, what changed, evidence, remaining uncertainty, and whether another `review-plan` pass is worth it.
verify: role-boundary reread now; final oracle = ground-rules `SKILL.md` cases + `tests/cli-discovery.test.mjs` `lists every skill in skills/`; no contradiction with `BACKLOG.md` gate or `SPEC.md` high-bar rules
exit: `prep` file ready for final validation
next: F3.T1

verify: read full updated `skills/prep/SKILL.md`; confirm cold executor can tell what `prep` must finish and where it must stop
exit: `prep` contract covers adopted planning-role cues only
next: F3.T1

## F3 executor contracts
goal: align `cook` and `cater` with portable autonomy, approval, delegation, output, and calibrated verification guidance
inputs: F1 mapping; F2 wording choices; current `skills/cook/SKILL.md`; current `skills/cater/SKILL.md`; `SPEC.md` §V22, §V29, §V30
files: `skills/cook/SKILL.md` `skills/cater/SKILL.md`

§T TASKS:
T1|x|update `cook` follow-through + approval rules
touch: `skills/cook/SKILL.md`
details: state that implementation/fix requests continue through relevant verification when authorized; routine reversible decisions proceed without repeated approval asks; before requesting approval for destructive/irreversible/unauthorized actions, finish already-authorized preparation and present a concrete reviewable result. Keep existing stop conditions for genuine ambiguity and safety-sensitive cases (§V22).
verify: executor reread now; final oracle = ground-rules `SKILL.md` cases + `tests/cli-discovery.test.mjs` `lists every skill in skills/`; wording fits single-main-agent run loop, self-review, handoff, and repo safety gates
exit: `cook` autonomy/approval block drafted
next: F3.T2

T2|x|update `cater` delegation + instruction-precedence rules
touch: `skills/cater/SKILL.md`
details: preserve direct-vs-delegate decision rule while making explicit that user instructions override conflicting skill guidance, unaffected authorized work continues when one path is blocked, and delegation remains evidence-driven rather than reflexive. Keep disclosure + bounded-prompt requirements (§V22, §V30).
verify: executor reread now; final oracle = ground-rules `SKILL.md` cases + `tests/cli-discovery.test.mjs` `lists every skill in skills/`; routing logic still prevents mixed ownership, intersecting writes, and hidden model/effort choices
exit: `cater` autonomy/delegation block drafted
next: F3.T3

T3|x|calibrate executor output + verification scope
touch: `skills/cook/SKILL.md` `skills/cater/SKILL.md`
details: add concise plain-language reporting guidance and testing-scope rule: complete required checks; broaden/repeat tests only when new changes, failures, or concrete unresolved concerns justify it. Replace hypothetical-risk boilerplate with concrete blocker/risk reporting.
verify: executor reread now; final oracle = ground-rules `SKILL.md` cases + `tests/cli-discovery.test.mjs` `lists every skill in skills/`; updated guidance stays consistent with mandatory per-phase verification and full-suite end rules
exit: executor files ready for final validation
next: F4.T1

verify: reread both files in full; confirm direct and delegated routes still terminate with concrete evidence + baton state
exit: executor contract reflects adopted guide cues without widening scope
next: F4.T1

## F4 reviewer contract
goal: align `review-code` with role-appropriate follow-through and concise reporting while preserving shared mirrors and read-only scope; add required changelog
inputs: F1 mapping; current `skills/review-code/SKILL.md`; current `skills/review-plan/SKILL.md`; F1 blast-radius decision; `SPEC.md` §V25, §V26, §V28
files: `skills/review-code/SKILL.md` `skills/review-plan/SKILL.md` `README.md` `CHANGELOG.md` `SPEC.md`

§T TASKS:
T1|x|add reviewer-role autonomy + conflict wording
touch: `skills/review-code/SKILL.md`
details: adapt follow-through to read-only review scope: carry authorized review through baseline selection, evidence gathering, gate decision, and `prep` handoff; ask only when missing baseline or intent blocks correctness; user instructions override conflicting skill guidance; if a skill causes pause/deviation, cite file + rule. Preserve read-only boundary and baseline rules (§V25).
verify: reviewer reread now; final oracle = ground-rules `SKILL.md` cases + `tests/cli-discovery.test.mjs` `lists every skill in skills/`; wording stays compatible with audit flow and `prep` handoff requirement
exit: `review-code` autonomy/authority text drafted
next: F4.T2

T2|x|protect mirror-sensitive review sections
touch: `skills/review-code/SKILL.md` `skills/review-plan/SKILL.md`
details: if any change reaches shared FINDING TAXONOMY & GATE or REPORT OUTPUT, mirror exact bytes in both files per §V26. Prefer placing new style/autonomy text outside shared blocks when possible to avoid needless coupled edits.
verify: reviewer reread now; final oracle = ground-rules `SKILL.md` cases + `tests/cli-discovery.test.mjs` `lists every skill in skills/`; shared blocks unchanged or byte-identical across both files
exit: no accidental `review-plan` drift
next: F4.T3

T3|x|touch shared repo docs only if evidence says required
touch: `README.md` `CHANGELOG.md` `SPEC.md`
details: add `CHANGELOG.md` `## [Unreleased]` entry in plain English for landed skill-guidance edits. Update `README.md` only if public skill summaries or workflow promises materially change. Amend `SPEC.md` only if adopted wording becomes durable standing guarantee that future review should enforce (§V17, §V18).
verify: `CHANGELOG.md` entry present when skill wording changes; every extra shared-doc edit clears its bar; untouched `README.md` or `SPEC.md` has explicit reason in session notes / final report
exit: supporting-doc decision resolved; required changelog work landed
next: F5.T1

verify: read final `review-code` text against request + mirror constraints; confirm read-only reviewer role still clear
exit: reviewer contract ready for final verification
next: F5.T1

## F5 final verify
goal: prove adopted wording is coherent, mirror-safe, within skill limits, and validated by repo checks
inputs: touched skill files; any shared-doc edits; `SPEC.md`; `PLAN.md`; tests
files: `skills/prep/SKILL.md` `skills/cook/SKILL.md` `skills/cater/SKILL.md` `skills/review-code/SKILL.md` `skills/review-plan/SKILL.md` `README.md` `CHANGELOG.md` `SPEC.md` `tests/skill-contract.test.mjs` `tests/cli-discovery.test.mjs`

§T TASKS:
T1|x|re-read touched docs against guide + workflow rules
touch: `skills/prep/SKILL.md` `skills/cook/SKILL.md` `skills/cater/SKILL.md` `skills/review-code/SKILL.md` `skills/review-plan/SKILL.md` `CHANGELOG.md` `README.md` `SPEC.md`
details: classify each relevant contract area as HOLD | VIOLATE | UNVERIFIABLE with file evidence: planning-only boundary for `prep`, execution-through-verification for `cook`/`cater`, read-only audit for `review-code`, mirror safety for `review-plan`, changelog rule from `AGENTS.md`, durable-truth bar for `SPEC.md`. Name drift explicitly.
verify: final verification notes can populate `HANDOFF.md` result table with concrete evidence
exit: no unresolved wording contradiction remains
next: F5.T2

T2|x|run repo verification matched to change scope
touch: `tests/skill-contract.test.mjs` `tests/cli-discovery.test.mjs`
details: run `npm test`. Exact oracle cases = `tests/skill-contract.test.mjs`: `ships at least one skill with parseable frontmatter`, `declares name and description as non-empty strings`, `names every skill legally, uniquely, and after its directory`, `keeps every description within the spec limit`, `keeps every body under the recommended length`; `tests/cli-discovery.test.mjs`: `lists every skill in skills/`. If failures appear, classify them as existing env issue, size/contract regression, or accidental coupled drift before further edits. Add extra checks only when failure or unresolved concern justifies them.
verify: `npm test` green with named oracle cases above, or exact failing cases + cause recorded
exit: executable validation complete
next: F5.T3

T3|x|close cycle with explicit residuals
touch: `PLAN.md` `HANDOFF.md`
details: update baton final-verification table, state what changed, what was verified, and remaining uncertainty. If all HOLD + tests green, route to `/garnish`; else route to next required fix or spec decision.
verify: cold next session can decide close vs continue without chat history
exit: cycle complete or residual work explicitly routed
next: -

verify: reread final phase against user request; ensure outcome distinguishes proposal adoption from model-specific guide text
exit: finished cycle proves proposed update coherent and verifiable
next: -
