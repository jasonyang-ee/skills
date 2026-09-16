<!-- PLAN FORMAT (baked by /encode-docs — keep; makes this file self-describing)
One cycle. Update in place during execution; replace wholesale only for an authorized new/superseding cycle. Durable truth → SPEC.md.
Order: goal | ground rules | existing assets (prior research) | phase order | phase sections.
Prior research: scope/questions | findings/decisions | local paths + relevant revisions/dirty inputs | external URLs/check dates when applicable | unknowns + gate.
Phase ids F1..Fn; numbered research optional when current evidence covers scope. Research precedes dependent coding; final verification last. Failed verification reopens affected work before recheck.
Each phase: goal | inputs | files | dependencies/gates | §T tasks (≥1) | verify | exit | next.
Tasks: T<n> unique/monotonic within phase. Status: . todo | ~ in progress | x verified done. Preserve ids and valid F<n>.T<n> pointers within cycle.
Remove redundant research only when unstarted with no execution/assignment evidence; retain other ids (gaps valid), history, and statuses; repair all references. Planning never marks execution tasks done.
Execution state: prep writes new; cook/cater validate relevant research before new→work-in-progress, direct work, or dispatch. Missing/stale evidence → main-agent review-plan first; consequential unknowns block dependent coding.
Recheck affected assumptions; refresh research only when findings/decisions no longer support selected work. Unrelated changes and verified planned edits preserving that support do not stale research.
handoff requests done only when all tasks x and nonempty final evidence covers goal/contracts with HOLD.
Reopened work → work-in-progress. garnish resets header-only new. Empty new → /prep; done → /garnish. prep queues requests during active execution unless user supersedes cycle.
Symbols: → leads to | ∴ therefore | ∀ every | ∃ exists | ! required | ? unknown/optional | ⊥ forbidden/absent | ≠ differs | ∈ member | ∉ not member | ≤ at most | ≥ at least | & and | § section.
Preserve literals, conditions, negation, uncertainty, quantities, and requirement strength. Tables need delimiter rows.
Executable without chat history. Full rules: /encode-docs.
planning status: done
-->

# PLAN

goal: Let an authorized review → garnish → prep remediation chain proceed without redundant supersession approval when findings invalidate the retained cycle; preserve evidence and unfinished obligations.

## ground rules

- Portable workflow fix, not the private application defects quoted in backlog. Plain review stays review-only; explicit completion-only conditions remain binding.
- A direct request to move review findings through garnish into a new remediation cycle authorizes supersession. Never label superseded work successfully completed or fabricate HOLD evidence.
- Preserve findings, baseline/HEAD/dirty scope, verification limits, invalidated tasks and unfinished obligations outside reset documents. Revalidate prior-session findings against current evidence.
- Keep ordinary closure checks; separate supersession gate requires recoverable old documents, no outstanding workers or unrelated dirty work, then immediate prep. Only prep ingests backlog.
- Amend existing durable rows, no new ids. No Python, prose tests, delegation, push or tag. Single summary commit after final verification; generic unwrapped prose.

## existing assets

prior research (2026-09-15): review-code Follow-up unconditionally blocks failed closure despite direct garnish/prep authorization; garnish requires successful completion; prep active branch always queues. encode-docs/header already permit authorized supersession, but encoder reset wording needs alignment. README retained-cycle guidance and SPEC §V.23/25/27/29 need matching corrections. Review taxonomy/report mirrors stay unchanged.
local evidence: clean main at 9c2baca8e950569f32755ab07e77ab766bf3a3fd; inspected AGENTS.md, SPEC.md, completed PLAN.md/HANDOFF.md, BACKLOG.md, skills/{review-code,garnish,prep,encode-docs,encode-header}/SKILL.md, README.md, CHANGELOG.md, package.json, tests/*.mjs. Prior completed cycle recoverable at this SHA. Backlog application findings illustrate workflow failure; they are not verified defects in this repository.
external evidence: not applicable; local workflow change, no external API/version claims.
unknowns & gate: None consequential; local evidence covers F1. Missing/stale affected evidence requires main-agent review-plan before execution. No separate research phase.
review-plan (2026-09-15): GO after main-agent coverage, dependency, evidence, authority, preservation, task-pointer and verification review. Open BLOCK/DIVERGENCE/blocking UNKNOWN: 0. Correction: distinguish completion-only requests from direct remediation authorization, and preserve uncommitted evidence before reset. At review time tasks remained todo; no unresolved decisions.

## phase order

id|goal|depends|exit
|---|---|---|---|
F1|Implement evidence-preserving remediation transition|research + review GO|scenario inspection passes; docs agree
F2|Final verification|F1|required checks and contracts HOLD

## F1 implement remediation transition

goal: Honor remediation authorization without losing failed-cycle evidence.
inputs: goal, ground rules, local research.
files: skills/review-code/SKILL.md, skills/garnish/SKILL.md, skills/prep/SKILL.md, skills/encode-docs/SKILL.md, README.md, SPEC.md, CHANGELOG.md.
depends: current evidence and review GO.

### §T tasks

id|status|description|cites
|---|---|---|---|
T1|x|Align review, supersession, planning and public contracts|§V.7, §V.15–21, §V.23–29

task: T1
touch: phase files; PLAN.md/HANDOFF.md through encode-docs.
details: Add prior-review validation and authorization routing; compose garnish then prep immediately when authorized. Preserve a persistent review record and recoverable old cycle before reset. Give garnish a distinct supersession gate retaining failed verdicts without requiring successful implementation checks. Align prep carryover, encoder reset semantics, README, existing SPEC rows and Unreleased entry. Preserve shared review blocks.
verify: Manually trace: supplied NO-GO + direct garnish/prep; plain review; explicitly completion-conditioned cleanup; active cycle with/without supersession; completed cycle + independent improvement; absent/header-only cycle and no actionable findings; stale/unverifiable prior findings; uncommitted evidence, unrelated dirt, outstanding workers and interruption after reset. Require evidence survival, only authorized routing, fresh todo remediation tasks, and unfinished obligations carried or explicitly dispositioned. Inspect generic unwrapped prose and unchanged mirrors.
exit: All cases coherent; no redundant permission; docs agree and evidence survives reset.
next: F2.T1

## F2 final verification

goal: Verify goal, repository contracts and completion.
inputs: F1 diff and scenario evidence; SPEC.
files: touched files read-only; PLAN.md/HANDOFF.md evidence.
depends: F1.T1 verified.

### §T tasks

id|status|description|cites
|---|---|---|---|
T1|x|Run checks, review full diff and record final evidence|§V.1–5, §V.7–8, §V.11, §V.16–29

task: T1
touch: PLAN.md/HANDOFF.md through encode-docs; reopen F1.T1 for failures.
details: Run npm test and git diff --check; confirm assertions and real CLI discovery ran. Review all touched surfaces for correctness, coherence, complexity, reuse, portability and state consistency. Compare intentional review mirrors byte-for-byte as a manual check, not a repository test. Record goal/tasks/contracts as HOLD/VIOLATE/UNVERIFIABLE; close only all HOLD. Commit once via encode-commit.
verify: npm test passes without skipped CLI checks; diff check clean; scenario and full-diff review pass.
exit: Every task x; nonempty final evidence all HOLD; reviewed summary commit.
next: none — cycle complete.
