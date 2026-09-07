<!-- PLAN FORMAT (baked by /encode-docs — keep; makes this file self-describing)
One cycle. Update in place during execution; replace wholesale only for an authorized new/superseding cycle. Durable truth → SPEC.md.
Order: goal | ground rules | existing assets | phase order | phase sections.
Phase ids F1..Fn; research evidence before implementation, dedicated research phase optional when prep/review-plan already completed it; last phase final verification. Failed verification reopens affected work before recheck.
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

goal: Improve current coding prompts with evidence-backed research gates, concrete implementation checks, and standalone review-vibe proportional tracking; compare old/current/revised on three tiny coding tasks.

## ground rules

- Planning request only in this session. Implement and run simulations during the subsequent cook/cater cycle; keep every execution task todo until its exit criteria hold.
- User decisions: review-vibe is never invoked by another skill; it may remain detailed. Simple short fixes in small codebases may omit REVIEW.md. Research must occur before coding; completed prep/review-plan research needs no repeated numbered phase. Recover useful old checklists without restoring blanket stops, invented tests, or no-diff rejection.
- User's research relaxation overrides the currently installed mandatory-F1 wording, including this plan's baked header. F1.T1 updates its owning templates and repository guidance. Research below is already completed; F1 begins implementation.
- Preserve unrelated work, stable ids, substantive gates, final verification, and meaningful checks. Product prompts stay portable and unwrapped; no project-specific benchmark references in skills/.
- Repository tests remain contract/discovery only. No skill-prose assertions, Python, dependencies, scripts directory, benchmark framework, web app, external service, automatic benchmark CI, release/version changes, pushes, or tags.
- Main owns shared cycle documents, final integration, and benchmark evaluation. F1 and F2 have disjoint product/artifact writes and may run independently; shared changelog integration stays with main.
- F3 explicitly requires subject agents to simulate coding. This user-authorized benchmark orchestration is permitted even if the parent uses cook; each subject's simulated cook stays single-agent. Never delegate the main evaluator's acceptance decision or allow subjects to edit this repository.
- Follow repository commit policy; use encode-docs for encoded documents and encode-commit for messages. Skill changes and benchmark artifacts remain outside this planning commit.

## existing assets

- Frozen current: 6309380af49f989882ef8556360dc1883793ee82 (main before this cycle).
- Frozen old: v0.6.2 = 1f909dd9de24439781911c7a6d33d820d2a0da1a. Revised: committed F1 skill tree, record exact revision and file hashes before F3; never silently change a compared bundle.
- Existing tests: tests/skill-contract.test.mjs (five contract checks), tests/cli-discovery.test.mjs (two real CLI checks), tests/helpers.mjs.
- npm.cmd test passed 7/7, 0 skipped on Node v25.9.0 during prep (2026-09-07). PowerShell npm.ps1 is blocked by execution policy; npm.cmd invokes the existing npm test script without policy changes.
- PLAN.md/HANDOFF.md were header-only new; BACKLOG.md empty; starting worktree clean.

### research evidence

scope: all requested prompt changes, affected callers/templates, benchmark size, isolation, workflow compatibility, and verification.
performed by: main prep plus two bounded read-only research agents; checked 2026-09-07 against frozen current and old.
unresolved research: none affecting phase design. Runtime capabilities/model identifiers are recorded during benchmark preflight; unavailable controls are disclosed, not invented.

topic|finding/decision|source
|---|---|---|
Research duplication|Mandatory F1 appears in producers, reviewer, encoder/header, and remediation follow-up; change them together and guard both executors|skills/prep/SKILL.md:39; skills/review-plan/SKILL.md:21; skills/encode-docs/SKILL.md:87; skills/encode-header/SKILL.md:35; skills/review-code/SKILL.md:52; skills/cook/SKILL.md:23; skills/cater/SKILL.md:15
Standalone boundary|No other skill currently invokes review-vibe; setup contains a user-facing standalone mention only|skills/setup/SKILL.md:50; skills/review-vibe/SKILL.md:19
Useful old checks|Recover explicit helper search, diff hygiene, secrets/untrusted-input checks, and assertions proving behavior; current already handles baseline failures and documentary/no-diff work|old skills/encode-agent/SKILL.md:28-37; old skills/cook/SKILL.md:14-16,43-51; current skills/encode-agent/SKILL.md:21-27; current skills/cook/SKILL.md:31-35
Fixture isolation|Root npm test uses bare node --test; keep benchmark fixtures/assertions as fenced Markdown and materialize executable files outside the repository|package.json; tests/skill-contract.test.mjs; tests/cli-discovery.test.mjs; [Node test runner](https://nodejs.org/docs/latest-v25.x/api/test.html), checked 2026-09-07
Old workflow compatibility|With no tags, old accepts an explicitly supplied release commit. Use fixture seed SHA and expressly requested review-before-garnish, findings-only review; no new remediation cycle|old skills/review-code/SKILL.md:19-21,100-125; user requested sequence
Product format|Retain valid name/description and body-size limits; detailed standalone guidance remains allowed within repository constraints|tests/skill-contract.test.mjs; [Agent Skills specification](https://agentskills.io/specification), checked 2026-09-07
Durable changes|Amend existing research and standalone contracts; describe separate benchmark interface without making scenario details permanent invariants|SPEC.md §C.8, §I.13, §I.14, §V.19, §V.21, §V.24; user decisions this session

Research currency: recheck only affected sources/decisions if requirements, relevant implementation, or verification inputs change; unrelated commits alone do not invalidate it. A title or bare completed claim is not evidence.

## phase order

id|goal|depends|exit
|---|---|---|---|
F1|Improve prompts and matching guidance|prior research above|three task contracts pass inspection/scenario walkthroughs and repository checks
F2|Define tiny benchmark cases and evaluation protocol|prior research above|frozen, runnable case definitions with checked assertions
F3|Run and independently evaluate the comparison|F1,F2|nine workflow observations preserved and independently reviewed
F4|Final verification|F1,F2,F3|goal/contracts checked with current evidence and exact limitations

## F1 prompt improvements

goal: Keep research and implementation discipline while removing redundant phases and unnecessary small-review tracking.
inputs: research above; requested durable SPEC changes; current prompts; old checklist evidence.
files: skills/{prep,review-plan,cook,cater,encode-docs,encode-header,encode-agent,review-code,review-vibe,setup}/SKILL.md; AGENTS.md; README.md; CHANGELOG.md; encoded cycle documents through main.
depends: prior research complete; recheck affected evidence if scope changes.

### §T tasks

id|status|description|cites
|---|---|---|---|
T1|.|Make dedicated research phases optional while gating execution on research evidence|§V.19,§V.21,§V.24,§V.28,§V.29
T2|.|Restore concrete implementation and acceptance checks|§V.22,§V.28,§V.30
T3|.|Keep review-vibe standalone and make tracking proportional|§I.13,§V.7,§V.28

task: T1
touch: skills/{prep,review-plan,cook,cater,encode-docs,encode-header,review-code,setup}/SKILL.md; AGENTS.md; README.md; PLAN.md header through encode-docs
details: Replace forced F1/confirmation with a short prior-research record in existing PLAN content: covered scope/questions, findings/decisions, local paths and relevant revision/dirty inputs, external sources/check dates when needed, remaining unknowns and gate. prep/review-plan must actually inspect/research before coding. Both executors validate evidence before execution-state transition, direct work, or dispatch; missing/stale evidence loads review-plan in main first, and unresolved consequential unknowns block dependent coding. Omit redundant research in new cycles; remove only unstarted redundant research without execution/assignment evidence from retained plans, preserving remaining ids (gaps allowed), completed work, and repairing all references. Do not tick execution tasks done during planning. Update templates/examples and remediation wording consistently; final verification remains last.
verify: Main manually traces completed/missing/stale/blocking research through both executors; unrelated change retains valid evidence; relevant change reopens it; implementation-first new plan works; removal preserves pointers; started history survives. Inspect all research/F1 references for conflicts, including generated setup guidance. No prose tests.
exit: No research-free path to coding or mandatory repeat of completed research; cold reader has evidence and valid next task.
next: F1.T2

task: T2
touch: skills/cook/SKILL.md; skills/encode-agent/SKILL.md; skills/cater/SKILL.md; skills/review-code/SKILL.md only where a concrete gap remains
details: Preserve existing helper/dead-code checks and add missing specificity: search helpers/callers and follow naming/error conventions before adding abstractions; inspect owned diff for dead/debug code, unrelated edits, secret material, and new untrusted-input paths lacking needed validation; verify actual cases/assertions exercise changed behavior rather than trusting exit zero. Carry applicable checks into implementation assignments and main acceptance. Keep expected failing regression tests, research/no-diff results, and pre-existing/environment failure classification valid. Do not copy long identical lists into every skill or add whole-file-reading absolutes.
verify: Compare final checklists with old source and current surrounding rules; walk a behavioral fix with a new red regression and a read-only research assignment. Review full owned diff for conflicting stop conditions and pointless duplication.
exit: Main and workers receive concrete checks without blanket test, scope, or ceremony regressions.
next: F1.T3

task: T3
touch: skills/review-vibe/SKILL.md; skills/setup/SKILL.md; README.md; AGENTS.md
details: Make review-vibe a direct user-requested standalone skill, including matching natural-language requests; no other skill may invoke/load it as a phase, hook, or helper. Its own encoding-helper composition remains valid. Keep review surfaces explicit/self-contained. Allow no REVIEW.md for a small identifiable scope whose callers, fixes, and required verification finish in the same session/context; final report still carries coverage/results/limits. Do not use arbitrary repo line-count thresholds. Broad/multi-round work retains the ledger; expansion, unresolved coverage, blockers, or inability to finish triggers ledger creation/update before stopping, preserving gathered evidence and unrelated existing content. Explicit user output preferences still govern.
verify: Inspect composition references; manually walk a tiny completed fix, broader review, small review that expands, interrupted/blocked work, and an existing unrelated ledger. No workflow calls review-vibe. These are manual policy walkthroughs; review-vibe is excluded from the core workflow benchmark.
exit: Small verified fixes can omit the ledger; larger/unfinished work remains resumable; docs and product agree.
next: F2.T1 if unfinished, otherwise F3.T1

phase verify: npm.cmd test (npm test on hosts without the PowerShell shim restriction); full owned diff; manual task walkthrough evidence; skill format/portability and shared review taxonomy/report sections preserved.
phase exit: all three tasks verified; changelog describes shipped prompt changes; record committed revised skill revision for benchmark.
phase next: F2.T1 if unfinished, otherwise F3.T1

## F2 small benchmark definitions

goal: Make a lightweight, repeatable comparison from tiny local tasks rather than build a benchmark application.
inputs: user request; frozen refs; case contracts below; existing repository test scope.
files: benchmark/README.md; benchmark/cases/{limit,ids,duration}.md; benchmark/reviewer.md; CHANGELOG.md integration by main.
depends: none beyond completed planning research; may proceed independently of F1 with disjoint writes.

### §T tasks

id|status|description|cites
|---|---|---|---|
T1|.|Write and validate three tiny fixtures, prompts, checks, and run protocol|§I.14,§C.8,§V.6

task: T1
touch: benchmark/README.md; benchmark/cases/{limit,ids,duration}.md; benchmark/reviewer.md
details: Store exact prompts and starting source/visible tests as fenced Markdown; at most three code files per fixture, no dependencies/network/UI/database. Write reviewer-only acceptance assertions separately, derived solely from visible requirements. Materialize outside this repository in fresh temporary Git repos. Confirm visible baseline tests pass, reviewer checks expose the seeded defect, and an evaluator-only minimal reference solution satisfies them; freeze corpus/assertion hashes before any scored run. Label all these as new benchmark checks, not repository test additions.

case|executor|exact task prompt|independent checks
|---|---|---|---|
limit|cook|Fix parseLimit(text): undefined or a blank string returns 20. Otherwise accept only trimmed strings of decimal digits representing 1 through 100; throw RangeError for everything else. Preserve the export.|defaults, bounds, whitespace, leading zeros, partial numerics/decimals, invalid types; one module + visible test
ids|cook|Fix uniqueIds(ids) to return each string ID's first occurrence in input order, case-sensitive, without mutating the input. Empty strings are valid IDs. Reject non-arrays and any non-string element with TypeError. Preserve the export.|order, duplicates, empty/case-distinct/property-like strings, invalid inputs, unchanged input; one module + visible test
duration|cater|Fix totalDuration(seconds) to accept an array of finite non-negative second values, round each value to the nearest millisecond, and sum them. Empty input returns 0; invalid containers or elements throw RangeError. Preserve both exports and make direct toMilliseconds calls follow the same element rules. Reuse the existing helper. Do not mutate the input.|fractions, round-before-sum, zero/empty, invalid elements/containers, direct helper contract, no mutation; two modules + visible test

protocol: One fresh subject session/repo per case/variant; identical initial fixture, minimal neutral guidance/SPEC/changelog, explicit test command, host model/effort, and task prompt. Use only that frozen variant's supplied bundle, never host-installed alternatives, sibling solutions, evaluator assertions, or parent cycle state. Read/dispatch access is procedural unless enforced isolation is actually available; disclose inherited host instructions/catalog visibility and contamination limits. No global installations or config changes.
workflow wrapper: Explicitly request prep → review-plan → designated cook/cater → findings-only review-code → gated garnish. Local fixture edits/commits authorized; supplied seed SHA is the explicit release baseline; no tags/remotes/pushes/network/installs. No automatic new remediation cycle or review-vibe invocation. Do not insert revised-only research/ledger/checklist rules into the common wrapper: each variant must supply its own behavior. Record that requested sequence overrides old's automatic prep follow-up. Cater may correctly choose direct execution; do not force artificial delegation.
checkpoint: Every subject returns to main after review-code, before garnish. Main captures the source/diff and cycle evidence, runs the frozen assertions, records the first-result assessment, then explicitly continues that same subject to garnish with the observed verification state. A failed independent check invalidates affected completion evidence; preserve the blocker rather than coaching a repair or forcing cleanup. This is an internal benchmark checkpoint, not another user-approval request.
measurement: Main freezes criteria before runs and evaluates first submitted result independently before corrective coaching. Separate behavior pass/fail groups, research/verification/closure honesty, scope/workflow compliance, and observed overhead (time, questions, repeated checks, extra files/abstractions, tool/delegation counts only if exposed). No weighted score; unavailable tokens/model/tool data = unavailable. Do not award success just for fewer documents/tests.
verify: Inspect corpus, materialized fixture checks, and isolation protocol; npm.cmd test still discovers only existing contract/CLI suite. Baselines and frozen assertions are executable; no production runtime code/dependency added.
exit: Three short prompts/fixtures and reproducible evaluation are ready; no scored runs yet.
next: F3.T1 once F1 passes

phase verify: Three fixtures/assertions checked in temporary repositories; protocol inspection; unchanged root test discovery.
phase exit: Corpus and evaluation contract frozen and reproducible; no scored runs performed.
phase next: F3.T1 once F1 passes

## F3 benchmark runs and main-agent evaluation

goal: Obtain a small empirical comparison without changing tasks or skill bundles to favor the revised set.
inputs: accepted F1 revised revision; frozen F2 corpus; current/old SHAs; available subject-agent controls.
files: benchmark/results/<run-id>.md; benchmark/RESULTS.md; temporary repositories outside workspace; main owns reports.
depends: F1,F2 accepted; corpus, selected skill bundle hashes, Node version, and actual/inherited model/effort recorded.

### §T tasks

id|status|description|cites
|---|---|---|---|
T1|.|Run nine tiny workflow simulations|§I.13,§I.14,§C.8
T2|.|Independently evaluate code, evidence, and practical overhead|§I.14,§V.23,§V.25

task: T1
touch: benchmark/results/<run-id>.md; isolated temporary fixture repositories only; main integrates results
details: Run once per case/set: limit old→current→revised; ids current→revised→old; duration revised→old→current. Maximum ten minutes per workflow run, no automatic repeats or harder replacement cases. Record complete, failed, blocked, timed out, invalid/contaminated, or not run with reason; a recorded failure is a valid observation, not a reason to erase/retry it. Before fixture garnish, main captures review output, seed/final SHA, final source/diff, actual test results, and complete plan/handoff/assignment evidence outside cleanup targets. Then run cleanup or preserve its evidenced blocker. No tag is created.
verify: Confirm identical inputs and selected bundle paths/hashes; respect task deadlines without interrupting evidence capture; retain failures, missing observations, and any access/model limitations. Subject reports alone do not establish correctness.
exit: All nine run slots have evidence-backed dispositions; planned available runs were attempted, unavailable controls recorded precisely. Do not claim a benchmark executed if only prompts were written.
next: F3.T2

task: T2
touch: benchmark/RESULTS.md; benchmark/results/<run-id>.md
details: Main inspects every final code diff and reconciles its independent frozen acceptance checks from each run's checkpoint with worker reports and pre-cleanup evidence; rerun only when changed outputs or unresolved concerns invalidate those checks. Review helper reuse, dead/debug leftovers, unnecessary abstractions, assertion quality, required research before implementation edits, verification failures, and cleanup honesty using concrete evidence. Score first submissions before repairs. Report per-case/set outcomes and descriptive overhead; distinguish requirement failures from environment/time limits and policy differences. Small sample and shared host instructions prevent claims of statistical superiority; timeouts are incomplete observations. Identify recommendations with evidence; retain original candidate results if subsequent fixes are proposed.
verify: Each result row links to reproducible source/diff/check evidence; denominator includes all scheduled slots; unavailable metrics explicit. No changing frozen criteria/bundles or dropping unfavorable runs after seeing outcomes.
exit: Main-authored comparison identifies actual strengths/regressions/limits and remaining work; review-vibe has manual policy evidence only and is not presented as empirically measured by this workflow benchmark.
next: F4.T1

phase verify: Main independently checks every available solution and reconciles all nine scheduled dispositions with preserved evidence.
phase exit: Reproducible comparison delivered with observed failures and limitations; unavailable required evaluation remains unfinished.
phase next: F4.T1

## F4 final verification

goal: Verify the delivered prompt behavior, benchmark artifacts, and full cycle outcome.
inputs: all task evidence; current code/doc diff; benchmark report and recorded limitations.
files: all owned changes; PLAN.md/HANDOFF.md through encode-docs; CHANGELOG.md.
depends: F1,F2,F3 accepted; benchmark failures need not be successes, but missing required evaluation remains unfinished.

### §T tasks

id|status|description|cites
|---|---|---|---|
T1|.|Check goal/contracts, repository suite, and all task evidence|§V.1,§V.2,§V.3,§V.4,§V.5,§V.7,§V.11,§V.19,§V.21,§V.24,§V.28,§I.13,§I.14

task: T1
touch: PLAN.md; HANDOFF.md; CHANGELOG.md; corrections only in previously owned scope
details: Run npm.cmd test; inspect complete owned diff, prompt composition and prior-research gates, header/template consistency, standalone tracking decisions, frozen benchmark inputs/results, and changelog accuracy. Verify no fixture code entered automatic tests or installing-user runtime and no global installed skills changed. Record a nonempty HOLD/VIOLATE/UNVERIFIABLE table against goal and relevant task/spec items; distinguish benchmark subject failures from defects in the revised deliverables. Fix in-scope deliverable regressions and repeat affected proof; mark any post-benchmark prompt revision unevaluated unless a clearly labeled follow-up check supports it.
verify: Required suite passes without skipped discovery; every task exit has current evidence; all requested scenarios examined; all scheduled benchmark observations accounted for; no unsupported performance claim.
exit: All tasks x only on their observed exit criteria; handoff sets done only after final verification holds.
next: none — cycle complete

phase verify: Required suite, full owned diff, task/spec evidence, and benchmark accounting.
phase exit: All task exits hold and final verification is nonempty and current; handoff may mark done.
phase next: none — cycle complete

## plan review

verdict: GO after main-agent review of scope, dependencies, research, authority, references, and verification; implementation not started.
open BLOCK: 0; open DIVERGENCE: 0 within this change scope; blocking UNKNOWN: 0.
resolved: enforced-F1 conflicts replaced by explicit user decision and planned owner updates; old explicit baseline works without tags; benchmark code isolated from root test discovery; same wrapper does not grant revised-only research behavior to old/current; main owns evaluation.
limits: execution/model/tool visibility checked at runtime; procedural isolation may retain host influence; nine single-run workflow observations cannot establish general performance. Current repository security-taxonomy wording drift is outside this requested change and is not used to weaken prompt evidence requirements.
next: /cook or /cater; F1.T1 first, F2.T1 independently eligible. Retain this research; repeat only affected investigation if inputs change.
