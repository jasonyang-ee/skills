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

goal: Make a minor, portable change to `cater` that explicitly encourages lower worker effort for fully specified mechanical work while preserving its orchestration and acceptance architecture.

## ground rules

- Planning scope now; implementation follows via `/cook`. Keep the product change in `skills/cater/SKILL.md`, primarily its executor-selection paragraph, with a short retry clarification only where needed.
- Prefer the lowest sufficient host-supported worker effort: `low` for mechanical work with exact scope/acceptance and no unresolved design choice; `medium` for ordinary bounded implementation; higher effort for unresolved reasoning the worker must perform. Parent effort or task importance alone does not justify high effort.
- Explicitly allow choosing lower worker effort independently of the parent. Prefer an explicit effort selection when supported; preserve truthful `inherit`/`unavailable` reporting when controls are absent or constrained. Never claim a prompt changes an unexposed runtime setting; preserve user overrides and host restrictions.
- Keep model choice separate from effort choice. No fixed model names, model migration, host configuration edits, forced delegation, new scheduling taxonomy, phase decomposition redesign, or broad skill rewrite.
- Preserve direct/delegate/split choices, phase ownership, disjoint writes, bounded `encode-agent` prompts, no worker commits, disclosure, independent main-agent acceptance, and final verification. No companion-skill or SPEC change is needed for this scoped preference; existing §V.30 permits host-supported selection.
- Keep skill prose unwrapped and generic. No tests asserting prose; use scenario inspection plus existing `npm test`. Add the delivered change to `CHANGELOG.md` `[Unreleased]` during implementation. One reviewed summary commit per user repository instruction; no push/tag.

## existing assets

prior research (2026-09-13): Inspected current selection, dispatch, retry, acceptance, and assignment contracts. `cater` has one permissive model/effort paragraph under `Choose once per ready phase`; the disclosure table already has Effort and Rationale columns. `Delegate and accept` step 5 already diagnoses repeated failures. Strengthen those existing locations without adding a new architecture. `encode-agent` already supplies bounded context, quality checks, stop conditions, and completion evidence; no edit needed.

local evidence: clean initial tree on `main` at `951b9969e27d77757b28e24b4109617befc4379f`; `AGENTS.md`, `SPEC.md` (§C.4, §C.8, §V.15, §V.22, §V.28–30), `skills/cater/SKILL.md`, `skills/encode-agent/SKILL.md`, `tests/skill-contract.test.mjs`, `tests/cli-discovery.test.mjs`, `package.json`, `CHANGELOG.md`. PLAN/HANDOFF were header-only; no backlog entries to ingest. Only this planning pair changes during prep.

external evidence (checked 2026-09-13): https://developers.openai.com/api/docs/guides/latest-model — prompting can tune subagent delegation; supports a concise instruction change, not an efficiency guarantee. https://learn.chatgpt.com/docs/agent-configuration/subagents — unconfigured workers can inherit parent model/effort; supported overrides exist; low suits straightforward work and medium is a balanced default. This session's spawn tool exposes `reasoning_effort`, but full-history forks cannot override it; host capabilities must be checked at execution, not hard-coded in this portable skill.

verification baseline: `npm.cmd test` → 7 passed, 0 failed, 0 skipped, including real CLI discovery. Bare `npm test` hit PowerShell's disabled-script policy for `C:\nvm4w\nodejs\npm.ps1`; the `.cmd` entry point runs the same package script successfully.

unknowns & gate: No consequential unknowns for the wording change. Runtime adoption and token/latency savings are unmeasured and are not acceptance claims. Prior research covers F1; reuse while selected assumptions remain valid, otherwise run main-agent `review-plan` before execution. No redundant research phase.

review-plan (2026-09-13): GO for F1–F2. One main-agent pass checked user scope, SPEC compatibility, local/source evidence, task pointers, dependencies, host fallback, and observable verification. Open BLOCK/DIVERGENCE/blocking UNKNOWN: 0; no unresolved decisions. Architecture redesign and runtime-efficiency benchmarking remain outside scope. Tasks stay todo; final verification remains last.

## phase order

id|goal|depends|exit
|---|---|---|---|
F1|Clarify worker-effort selection|current prior research; review GO|small coherent guidance change and changelog entry pass scenario review
F2|Final verification|F1|goal, task contracts, and applicable invariants have current HOLD evidence

## F1 clarify worker-effort selection

goal: Lower effort for bounded routine workers through a concise selection preference.
inputs: goal, ground rules, prior research; existing `cater` selection and retry paragraphs.
files: `skills/cater/SKILL.md`, `CHANGELOG.md`; shared progress through `encode-docs`.
depends: reviewed research remains valid; no blocking findings.

### §T tasks

id|status|description|cites
|---|---|---|---|
T1|x|Clarify selection and evidence-based escalation; document the change|§V.7, §V.15, §V.22, §V.28, §V.30

task: T1
touch: `skills/cater/SKILL.md`, `CHANGELOG.md`; `PLAN.md`/`HANDOFF.md` through `encode-docs` for progress.
details: Replace the permissive selection guidance with the lowest-sufficient-effort preference in ground rules. Include a couple of mechanical examples such as exact fixture updates or known verification commands. Keep model inheritance allowed independently of an explicit lower effort. Use the existing disclosure rationale to explain the chosen effort, especially higher effort's unresolved reasoning burden. Briefly clarify the existing retry rule: diagnose contract/context/environment failures before escalation; raise effort only when additional reasoning is needed. Preserve existing acceptance rigor. Add a plain-English `[Unreleased]` changelog entry.
verify: Inspect the diff and walk through five cases: exact fixture/known-command work → prefer low; bounded normal implementation → prefer medium; unresolved cross-component reasoning → justified higher effort; absent/constrained effort control → truthful fallback; missing context or environment failure → correct the cause rather than automatic high retry. Confirm an important but fully specified task is not assigned high solely for importance. Compare surrounding architecture and acceptance text against the baseline; require no unrelated changes or wording tests.
exit: All scenario outcomes follow from concise guidance; supported lower effort is explicitly allowed independently of parent effort; boundaries and acceptance remain intact; changelog describes delivered behavior.
next: F2.T1

## F2 final verification

goal: Verify the delivered scope and preserve completion evidence.
inputs: F1 diff, scenario results, goal/ground rules, applicable SPEC requirements.
files: touched product/changelog read-only; `PLAN.md`, `HANDOFF.md` through `encode-docs`.
depends: F1.T1 accepted.

### §T tasks

id|status|description|cites
|---|---|---|---|
T1|x|Verify goal, contracts, and repository checks; close the cycle|§V.1–5, §V.7, §V.11, §V.15–22, §V.28–30

task: T1
touch: `PLAN.md`, `HANDOFF.md` through `encode-docs`; failures reopen F1.T1 before product corrections.
details: Review every touched surface for correctness, coherence, unnecessary complexity, and missed reuse. Check F1 scenarios, preserved orchestration/acceptance, portability, unwrapped prose, changelog, and plan/baton consistency. Record goal, task, and relevant spec checks in HANDOFF final verification as HOLD, VIOLATE, or UNVERIFIABLE with evidence and resolutions. Do not claim observed worker settings or efficiency gains without a run. Close only after every required task and check passes; follow the single-summary-commit instruction.
verify: `npm.cmd test` (same package script as `npm test`) → all 7 existing tests pass with no skips, including CLI discovery; `git diff --check` → no whitespace errors; scoped manual review → all ground rules and scenario criteria satisfied. Repeat affected checks after any correction.
exit: All required tasks verified; nonempty final evidence covers goal/contracts with HOLD; cycle marked done only then.
next: none — cycle complete; `/garnish` eligible after closure.
