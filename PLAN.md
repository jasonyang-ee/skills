<!-- PLAN FORMAT (baked by /encode-docs — keep; makes this file self-describing)
One cycle. Update in place during execution; replace wholesale only for an authorized new/superseding cycle. Durable truth → SPEC.md.
Order: goal | ground rules | existing assets | phase order | phase sections.
Phase ids F1..Fn; first research/confirmation, last final verification. Implementation between them; failed verification reopens affected work before recheck.
Each phase: goal | inputs | files | dependencies/gates | §T tasks (≥1) | verify | exit | next.
Tasks: T<n> unique/monotonic within phase. Status: . todo | ~ in progress | x verified done. Preserve ids and valid F<n>.T<n> pointers within cycle.
Execution state: prep writes new; cook/cater request new→work-in-progress; handoff requests done only when all tasks x and nonempty final evidence covers goal/contracts with HOLD.
Reopened work → work-in-progress. garnish resets header-only new. Empty new → /prep; done → /garnish. prep queues requests during active execution unless user supersedes cycle.
Symbols: → leads to | ∴ therefore | ∀ every | ∃ exists | ! required | ? unknown/optional | ⊥ forbidden/absent | ≠ differs | ∈ member | ∉ not member | ≤ at most | ≥ at least | & and | § section.
Preserve literals, conditions, negation, uncertainty, quantities, and requirement strength. Tables need delimiter rows.
Executable without chat history. Full rules: /encode-docs.
planning status: new
-->

# PLAN

goal: Make `/review-vibe` carry broad codebase reviews across sections and rounds using root `REVIEW.md`, so users need not repeat instructions to track coverage or continue the remaining codebase.

## ground rules

- Source: user-authorized ingestion of the sole `BACKLOG.md` entry on 2026-09-07. Requested behavior: split large reviews into sections; persist coverage in root `REVIEW.md`; continue across context windows and later rounds until the entire requested codebase is covered. The quoted “round 1 is completed” is an example continuation prompt, not evidence that this repository has been reviewed.
- Scope: `skills/review-vibe/SKILL.md`, its README description, and `CHANGELOG.md`; `SPEC.md §I.13` now records the durable requirement. This cycle changes the skill; it does not perform a broad review or create this repository's `REVIEW.md`.
- Default broad review → create/update root `REVIEW.md` even if one round suffices; split only when size/context warrants it. Explicit narrower user scope or output preferences prevail. Continue available authorized work without an artificial stop after each section; preserve a precise resume point at real session/context limits or blockers.
- `REVIEW.md` = review coverage and resume evidence, not encoded cycle task tracking. No new baked header, `§T`, dependency on another skill, mandatory planning cycle, sub-agent requirement, or BACKLOG ingestion. Preserve active work and existing unrelated `REVIEW.md` content.
- Preserve all existing review surfaces, direct evidenced fixes, verification, spec/cycle reconciliation, commit rules, and honest coverage reporting. Keep skill paragraphs unwrapped, generic, self-contained, and within contract limits (§C.2/§C.4/§C.8; §V.1–§V.8/§V.28).
- Verify instruction behavior with manual scenario walkthroughs; ⊥ prose-assertion tests. Run existing `npm test` (Windows equivalent `npm.cmd test`) with real CLI discovery and no skipped checks. No runtime, dependency, release, or license changes are needed.
- All encoded-document writes use `encode-docs`; tasks remain todo during preparation. Commit owned reviewed work under repository policy; ⊥ push/tag. Implementation adds the feature changelog entry; planning alone does not claim the feature is shipped.

## existing assets

- `skills/review-vibe/SKILL.md` (inspected 2026-09-07): “Establish scope” already maps entrypoints/modules/data flows and records unexamined areas; “Review surfaces” defines ten dimensions; “Fix and verify” preserves active cycles and owned edits; “Report” forbids exhaustive claims without evidence. Missing: persistent coverage artifact, rounds, and cold-session resume protocol. Extend these mechanisms rather than introduce another workflow.
- `README.md`: skill table and “Standalone review and fixes” explain broad review and coverage limits; both should advertise persistence and continuation concisely.
- `SPEC.md §I.13` owns the review-vibe interface; §V.15 keeps it standalone, §V.16–§V.21 own encoded cycle files, §V.27 restricts backlog ingestion, and §V.28 requires a self-contained skill. Review coverage without `§T` preserves the plan's task-tracking ownership (§V.18).
- `tests/skill-contract.test.mjs` covers YAML/name/description/body limits; `tests/cli-discovery.test.mjs` executes installed `skills` CLI to list every skill; `tests/helpers.mjs` supplies parsing/discovery helpers. `package.json` maps `npm test` to `node --test`. Baseline `npm.cmd test`: exit 0, 7 passed, 0 failed, 0 skipped on 2026-09-07. Plain `npm test` was blocked by PowerShell's `npm.ps1` execution policy; use the `.cmd` launcher on this host.
- [Agent Skills specification](https://agentskills.io/specification) checked 2026-09-07: Markdown body instructions are flexible; name/description and length constraints remain compatible with an inline review ledger protocol. The `.md` URL could not be opened; the canonical page supplied the evidence. No external API behavior or host-specific capability is needed for the proposed change.
- Existing `PLAN.md`/`HANDOFF.md` were header-only, with planning status `new`; no unfinished cycle to preserve. The only initial dirty file was the user's backlog request; clear that entry only after the matching output pair is checked.

## phase order

id|goal|depends|exit
|---|---|---|---|
F1|Confirm gathered evidence and acceptance scope|-|Current surfaces and protocol boundaries confirmed
F2|Implement persistent review coverage and document usage|F1|Skill and public guidance satisfy scenario checks
F3|Verify complete delivery and close cycle|F2|All tasks verified and final evidence HOLD

## F1 research confirmation

goal: Confirm the prepared evidence still matches the checkout before implementation.

inputs: Existing assets above; `SPEC.md §I.13`; current repository guidance and dirty state.

files: `skills/review-vibe/SKILL.md`, `README.md`, `SPEC.md`, `tests/skill-contract.test.mjs`, `tests/cli-discovery.test.mjs`, `package.json`; cycle files for progress only.

depends: none; gate: resolve material drift before F2, without reopening already-settled research unnecessarily.

### §T tasks

id|status|description|cites
|---|---|---|---|
T1|.|Confirm coverage/resume gap, scope, and verification methods|§V.18/§V.21/§V.27/§V.28

task: T1

touch: `PLAN.md`, `HANDOFF.md` through `encode-docs` for evidence/status only.

details: Re-read the current skill's scope/fix/report sections and relevant README sections. Confirm the planned inline protocol fits existing behavior and repository constraints. Establish current branch, HEAD, and ownership; use this plan's ingested request, not raw BACKLOG.md. No additional external research unless new material behavior questions arise.

verify: Compare the named surfaces to existing assets and the F2 acceptance criteria; record confirmed facts or exact drift and its resolution in the baton.

exit: Scope, files, dependencies, and observable checks remain feasible; no blocking unknown.

next: F2.T1.

## F2 persistent coverage and continuation

goal: Make review-vibe self-sufficient for broad reviews that span rounds and contexts.

inputs: Confirmed F1 evidence; `SPEC.md §I.13`; current scope, review surfaces, fix/verify, and report contracts.

files: `skills/review-vibe/SKILL.md`, `README.md`, `CHANGELOG.md`; cycle files for evidence/status only.

depends: F1; gate: F1.T1 verified, preserve unrelated ownership.

### §T tasks

id|status|description|cites
|---|---|---|---|
T1|.|Add the root review ledger and round/resume protocol|§V.1–§V.8/§V.15/§V.16/§V.18/§V.27/§V.28
T2|.|Document persistent review usage and the delivered change|§V.11/§V.15

task: T1

touch: `skills/review-vibe/SKILL.md`.

details: For broad reviews, inventory the requested codebase and partition it into bounded, identifiable sections tied to paths and relevant review surfaces, including cross-section callers/data flows. Create or reuse root `REVIEW.md` without requiring another user prompt. Keep a lean readable record of scope/exclusions, branch/revision and dirty-state context, round, per-section state (pending/in progress/reviewed/blocked or equivalent), evidence and checks, findings/fix disposition, and exact next section/action. Separate examined coverage from unresolved findings and unverified fixes. Record justified exclusions and inapplicable surfaces; never silently drop areas.

details: Read an existing ledger before resuming, preserve valid coverage and unrelated content, reconcile changed/new paths and dependent flows against recorded evidence, and reopen stale areas. If prior revision/coverage cannot be established, mark it uncertain and recheck rather than trust a claimed completed round. Refresh the ledger at section boundaries and before stopping; keep one current resume point. Continue successive sections while work is feasible; at a real stop report remaining coverage and prerequisites. Completion requires evidence for all in-scope sections, transparent exclusions, and accurate unresolved-finding/check disclosure; completing one round or passing tests alone does not establish whole-codebase coverage. Respect explicit user scope/output overrides and keep all existing fix/ownership/cycle rules.

verify: Manually walk through scenarios A–F below against the resulting skill, recording the expected next action and exact supporting section. Inspect the full skill for contradictions, hidden dependencies, unnecessary ceremony, project-specific references, and lost review/fix safeguards.

exit: Each scenario has an unambiguous supported outcome; protocol works from the skill and ledger without prior chat history.

next: F2.T2.

task: T2

touch: `README.md`, `CHANGELOG.md`.

details: Update the review-vibe table row and standalone guidance to explain automatic root `REVIEW.md` coverage tracking and continuation across rounds. Add a plain-English feature entry under `## [Unreleased]`. Avoid claiming a review of this repository has occurred or expanding other skills.

verify: Compare README and changelog claims to the finished skill and §I.13; verify links/paths, preserved standalone workflow, and absence of implementation claims beyond delivered behavior.

exit: User-facing guidance matches the skill and the changelog describes the delivered feature.

next: F3.T1.

### scenario checks

id|setup|required observable instruction outcome
|---|---|---|
A|Large broad review, no ledger|Creates root `REVIEW.md`, maps all scoped areas, chooses bounded sections by impact, and records progress/next action without an extra tracking prompt
B|New session after round 1, valid existing ledger|Preserves evidenced completed coverage and findings; resumes next pending section without restarting or requiring the original explanatory prompt
C|Changes since previous round, including a new module or shared dependency|Reconciles inventory and affected callers/flows; stale or unverifiable coverage reopens; unaffected valid evidence remains
D|Context/session limit or a blocked section|Saves exact stop/check/finding state; continues independent feasible work; reports remaining sections and precise resume prerequisites without declaring the full review done
E|All sections examined but unresolved finding or unavailable check remains|Distinguishes completed examination from fixes/verification; reports outstanding issues and never presents incomplete evidence as a clean verified result
F|Small broad review, explicit narrow/output override, or unrelated existing REVIEW.md content|Keeps the default ledger lightweight for a single round; respects explicit user scope/output choices and preserves unrelated file content and active cycle ownership

## F3 final verification

goal: Establish current evidence that the delivered skill meets the goal and all cycle contracts.

inputs: Completed F1/F2 tasks, owned diff, scenarios A–F, relevant spec rows, repository end-of-chat requirements.

files: All touched files; `tests/skill-contract.test.mjs`, `tests/cli-discovery.test.mjs`; `PLAN.md`, `HANDOFF.md` for final evidence/status.

depends: F2; gate: F2.T1/T2 exit criteria satisfied.

### §T tasks

id|status|description|cites
|---|---|---|---|
T1|.|Verify goal, scenarios, contracts, and full owned diff; record closure evidence|§V.1–§V.8/§V.11/§V.15–§V.22/§V.27–§V.29

task: T1

touch: `PLAN.md`, `HANDOFF.md` through `encode-docs`; failures return to the affected F2 task before fixes.

details: Run `npm test` (on this Windows host `npm.cmd test`), require successful contract and real CLI discovery checks with no skips, and run `git diff --check`. Inspect all changed instructions and surrounding context for correctness, coherence, unnecessary complexity, reused mechanisms, and generic unwrapped prose. Reconcile §I.13, every task's exit, and scenarios A–F against the actual diff. Record each checked item as HOLD/VIOLATE/UNVERIFIABLE with concrete evidence and drift resolution in HANDOFF.md; failed verification reopens affected work and requires affected rechecks. Manual walkthroughs verify instruction completeness, not empirical guarantees about future agent execution.

verify: Nonempty final table covers the goal/§I.13, F1.T1/F2.T1/F2.T2/F3.T1, scenarios A–F, automated §V.1–§V.5 checks, manual §V.6–§V.8/§V.11/§V.15–§V.22/§V.27–§V.29 obligations relevant to touched surfaces, and owned diff review. Record command exit/results without invented counts or future commit ids.

exit: All task rows x and required final evidence HOLD; handoff permits status done only then. Commit reviewed owned work and current baton per workflow/repository policy; no push/tag.

next: none after verified closure; `/garnish` is the next workflow operation.

## planning review

2026-09-07: GO after one composed `review-plan` pass against the ingested request, local evidence, §I.13, and relevant invariants. Open findings: 0 BLOCK, 0 DIVERGENCE, 0 blocking UNKNOWN. Clarified in draft: root ledger is coverage evidence rather than PLAN §T; stale revisions reopen affected coverage; round completion differs from full review/fix completion; sectioning does not force an early stop; tests remain contract/discovery-only. No remaining user decisions. Execution remains unstarted; next `/cook` at F1.T1.
