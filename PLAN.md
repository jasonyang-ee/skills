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
planning status: done
-->

# PLAN

goal: deliver standalone `review-vibe` for broad codebase review with direct fixes; extend `review-code` to review against an explicit branch with retained cycle context, then perform authorized `garnish` → `prep` without losing evidence or unfinished work.

## ground rules
- Execution authorized by /cook; one summary commit after all phases per repository policy. Chosen name = `review-vibe`; generalize the backlog's broker example to interchangeable providers/adapters, preserving meaningful provider differences.
- Direct fixes belong to `review-vibe`; `review-code` remains an inspection workflow whose explicitly authorized composed skills own cleanup/planning. No additional permission for already-authorized steps.
- No automatic cycle creation for direct review. Respect active task ownership; preserve unrelated edits and reconcile evidence invalidated by a fix through `encode-docs` without claiming completion or consuming backlog.
- Preserve `garnish` completion/evidence gates. A review finding that invalidates old final evidence prevents cleanup; do not rewrite failed evidence as HOLD to enable a new plan.
- Skills remain portable Markdown with unwrapped prose; no project-specific broker names, runtime code, new dependencies, or prose-assertion tests. Existing contract/discovery tests cover the added directory dynamically.
- Scope: new skill, review follow-up instructions, documentation/provenance integration. No release/version changes, push, or tag. Follow repository commit policy; update changelog when features are implemented.

## existing assets
- Input: both user-authored `BACKLOG.md` ideas ingested 2026-09-07. First: direct fixes, meaningful tests/over-testing, shared code, efficient service architecture, consistent provider-switch behavior, nesting, sensible paths/names, and evidence-based spec consolidation. User follow-up authorizes additional review topics where useful for a thorough review. Second: review against `main` using retained plan, then cleanup and remediation planning.
- `skills/review-code/SKILL.md`: explicit baseline already takes precedence; reads plan/baton as context; no implementation edits; accepted authorized findings go to prep. Missing: explicit retained-cycle transition and evidence preservation around garnish.
- `skills/garnish/SKILL.md` closure gate: all tasks done, current nonempty HOLD evidence, checks green, completion committed, no conflicting dirty work. `skills/prep/SKILL.md`: active cycle queues; otherwise produces pair before clearing backlog. These contracts remain intact.
- `skills/review-plan/SKILL.md` + `skills/review-code/SKILL.md`: two intentional verbatim mirrors (FINDING TAXONOMY & GATE; REPORT OUTPUT). Preserve byte identity; no third mirror required for the standalone skill.
- `README.md`, `AGENTS.md`, `skills/setup/SKILL.md` expose workflow/roster; README currently calls ordering mandatory. Update for explicit retained-cycle variant and standalone review. `NOTICE.md` accounts for provenance; record new skill's actual origin without guessing derivation.
- `tests/skill-contract.test.mjs`, `tests/cli-discovery.test.mjs`, `tests/helpers.mjs`: enumerate directories dynamically; no hardcoded skill count. `package.json` invokes `node --test`; baseline `npm.cmd test` = 7/7 pass, 0 skipped (2026-09-07). PowerShell blocks `npm.ps1`; use `npm.cmd test` here.
- External format confirmed 2026-09-07: [Agent Skills specification](https://agentskills.io/specification): required name/description, directory-name match, 64/1024 character limits; recommends body under 500 lines. Repository retains its stricter existing contract; no external runtime API research needed.
- Durable intent recorded through `encode-docs`: SPEC §I.13 standalone review; §V.15 default order + explicit variant; §V.25 branch baseline/context/guarded transition. Existing implementation catches up in F2–F3; no unrelated spec cleanup.
- Embedded review-plan pass: GO for this package; 0 open BLOCK, DIVERGENCE, or blocking UNKNOWN. Corrected ordering conflict via scoped durable amendment; distinguished evidence-invalidating findings from independent follow-up work; made no-findings and failed-closure paths explicit. No user decisions outstanding.

## phase order
id|goal|depends|exit
|---|---|---|---|
F1|confirm gathered contracts|-|scope and evidence confirmed
F2|write direct review skill|F1|standalone review cases pass inspection
F3|extend retained-cycle review|F1|transition cases preserve evidence
F4|integrate public guidance/provenance|F2, F3|all exposed guidance agrees
F5|final verification|F4|goal/contracts/tasks HOLD

## F1 research confirmation

goal: confirm inputs and durable decisions before editing products.
inputs: existing assets; SPEC §I.13, §V.15, §V.25; repository guidance.
files: `SPEC.md`, `skills/review-code/SKILL.md`, `skills/garnish/SKILL.md`, `skills/prep/SKILL.md`, tests.
depends: none; unexpected material conflict → resolve before F2/F3.

### §T tasks
id|status|description|cites
|---|---|---|---|
T1|x|Confirm local contracts and acceptance scenarios|§V.16, §V.21, §V.23, §V.25–29

task: T1
touch: `PLAN.md`, `HANDOFF.md` through encode-docs for evidence/status only.
details: Reconfirm gathered evidence against current tree; reuse dated source unless changed requirements need another lookup. Verify the two review modes, provider abstraction scope, closure failure handling, and automatic test discovery. No backlog read or extra exploratory phase.
verify: inspect cited files and compare against F2/F3 scenarios; record any new conflict with resolution and GO/NO-GO before product edits.
exit: no unresolved scope/authority/contract blocker.
next: F2.T1 (F3.T1 also depends only on F1).

## F2 standalone direct review

goal: ship a clear, self-sufficient `review-vibe` skill.
inputs: backlog intent captured above; SPEC §I.13; existing review quality and encode-docs contracts.
files: `skills/review-vibe/SKILL.md`.
depends: F1.

### §T tasks
id|status|description|cites
|---|---|---|---|
T1|x|Author and inspect direct review/fix workflow|§V.1–8, §V.16–18, §V.27–28

task: T1
touch: `skills/review-vibe/SKILL.md`.
details: Frontmatter states what/when and direct-fix intent, explicitly including the keyword phrase `security review`. Review current codebase without requiring baseline or plan: map architecture, trace correctness/security, inspect test value and redundancy, simplify evidenced nesting/duplication, assess common service/provider contracts and capability differences, and fix sensible naming/path organization with callers/imports/docs updated. Security review covers relevant authentication/authorization boundaries, secrets and sensitive-data exposure, untrusted input and injection, and dependency/supply-chain risks; distinguish evidenced vulnerabilities from optional hardening. Extend the review where relevant: error propagation/recovery and resource cleanup; async/concurrency hazards, cancellation, retries and idempotency; data integrity, persistence and migration behavior; public API compatibility and boundary validation; configuration/default consistency; dependency necessity and evidenced maintenance/security risks; performance bottlenecks and resource use; logging/metrics and diagnosability. Include accessibility and user-facing states when a UI exists. Prioritize correctness, security and data loss before maintainability; identify applicable surfaces, mark inapplicable topics briefly, and disclose unexamined areas rather than claiming exhaustive coverage. Consult current primary sources when external behavior or dependency claims need verification. Use focused behavioral verification; retain meaningful distinct cases and do not delete tests merely for count. Avoid speculative abstractions or wholesale framework replacement. Review SPEC for contradictions/redundancy; load encode-docs for supported durable corrections, preserving valid obligations and ids. Follow through on authorized fixes, self-review, required checks and commit policy; report fixed/deferred issues, evidence, and coverage limits. Do not require prep, ingest backlog, or silently finish/reset an active cycle. Ask only for a material unresolved decision outside existing authority.
verify: manually trace cases: no plan/spec exists (review still works, no invented spec); duplicated tests with distinct boundaries (retain coverage); redundant tests (justify consolidation); two providers with different capabilities (shared contract where justified, explicit differences); file move (references verified); active cycle/unrelated edits (preserved, stale evidence reconciled); spec conflict (evidenced correction or unresolved decision, never excuse a bug); concurrent retry (inspect duplicate effects and cleanup); persistence change (integrity/compatibility checked); slow path (measure before optimizing); security-sensitive entrypoint (trace authorization and untrusted input to effects, check secrets/log exposure, distinguish demonstrated defect from speculative hardening); dependency concern (verify current evidence); UI absent (accessibility inapplicable, no invented work). Record specific sections and gaps in baton.
exit: all review dimensions covered with observable fixes/checks and truthful limits; skill works loaded alone, composing encode-docs when needed.
next: F3.T1.

## F3 retained-cycle review transition

goal: support review → guarded cleanup → new remediation plan when requested.
inputs: SPEC §V.25; existing garnish/prep contracts; user's explicit `main` baseline example.
files: `skills/review-code/SKILL.md`; read-only `skills/review-plan/SKILL.md`, `skills/garnish/SKILL.md`, `skills/prep/SKILL.md`.
depends: F1.

### §T tasks
id|status|description|cites
|---|---|---|---|
T1|x|Define review context, preserved findings, and conditional composition|§V.15–19, §V.23, §V.25–29

task: T1
touch: `skills/review-code/SKILL.md`.
details: Keep explicit branch/ref baseline resolution and record ref/SHA, HEAD, dirty scope. Use populated plan/baton to map delivered work to tasks/verification, without treating task ticks as proof or making incomplete plans a review blocker. Finish the review first; carry accepted findings, locations, impact/fix direction, baseline, gate, task mapping and decisions across cleanup into prep. When user already authorizes the chain, load garnish then prep in main agent with no redundant confirmation. Garnish owns closure checks; if findings invalidate completion or another gate fails, preserve documents, report exact prerequisite, and never call prep in a way that replaces the blocked old cycle. Active execution may pass accepted findings to prep for queueing; only prep reads backlog. After successful cleanup, prep creates a new pair for accepted actionable work; no actionable work → no empty plan. Plain review alone does not authorize cleanup/planning. Keep both mirrored sections unchanged and preserve review-only implementation boundary while allowing authorized composed actions.
verify: manually trace explicit main baseline + completed retained plan + authorized chain (evidence survives, garnish then prep); plain review with plan (context only); work-in-progress (review allowed, no cleanup, authorized prep queues); done but stale/missing final evidence (preserve and report prerequisite); review reveals old invariant violation (closure blocked); independent accepted improvement with valid completion (new plan allowed); no findings (authorized cleanup may occur, no empty cycle); absent/header-only plan (normal review/follow-up, no fabricated closure). Compare both mirror sections byte-for-byte against review-plan.
exit: every branch has an explicit owner/outcome; no lost findings or erased incomplete cycle; existing baseline review remains usable.
next: F4.T1.

## F4 integration

goal: expose both modes consistently and account for the new skill.
inputs: F2/F3 output; SPEC durable contract.
files: `README.md`, `AGENTS.md`, `skills/setup/SKILL.md`, `NOTICE.md`, `CHANGELOG.md`.
depends: F2 and F3.

### §T tasks
id|status|description|cites
|---|---|---|---|
T1|x|Update roster, workflow examples, provenance, and release notes|§V.7, §V.10–11, §V.15, §V.25

task: T1
touch: `README.md`, `AGENTS.md`, `skills/setup/SKILL.md`, `NOTICE.md`, `CHANGELOG.md`.
details: Add review-vibe and change current roster to 14. Explain standalone direct review versus baseline review and show generic retained-plan review → authorized garnish/prep example. Amend mandatory-order language narrowly for the supported variant; keep core execution/closure gates. Update setup defaults without project-specific details. Record actual new skill provenance (original user concept unless implementation reuses derived material); retain existing MIT notices. Add plain-English Unreleased entries for both delivered features, without version bump. Inspect other current roster surfaces and change only stale references caused by this addition; preserve historical changelog counts.
verify: inspect links/paths and current roster against skills directories; compare README/AGENTS/setup with F2/F3 and SPEC; manually inspect attribution and unwrapped prose. No prose or license tests added.
exit: public entrypoints agree on authority, outcomes, ordering and skill count; provenance and feature notes present.
next: F5.T1.

## F5 final verification

goal: prove delivered scope and relevant contracts; close only on evidence.
inputs: full owned diff; F1–F4 evidence; SPEC §I.13 and relevant invariants.
files: all touched files, existing tests, `PLAN.md`, `HANDOFF.md`.
depends: F4.

### §T tasks
id|status|description|cites
|---|---|---|---|
T1|x|Verify goal, scenarios, contracts, and full diff|§V.1–8, §V.10–11, §V.15–21, §V.25–29

task: T1
touch: `PLAN.md`, `HANDOFF.md` via encode-docs; failures return to owning task.
details: Run `npm test` (`npm.cmd test` on this PowerShell host) and `git diff --check`. Confirm CLI output includes review-vibe and all 14 directories. Re-run F2/F3 scenario inspection against final integrated text; compare intentional mirrors exactly. Self-review full diff for correctness, scope, ambiguity, missed reuse, prose wrapping, generic examples, provenance and spec drift. Record goal, §I.13, relevant invariants and every cycle task in final verification table as HOLD/VIOLATE/UNVERIFIABLE with concrete evidence/resolution. Automated tests prove format/discovery only; scenario walkthroughs are document inspection, not live agent behavioral proof. Failed check → reopen affected task, fix, repeat affected verification. Follow commit policy and refresh baton; set done only with all tasks x and all final rows HOLD.
verify: 7/7 existing tests pass, 0 skipped; 14 skills discovered; diff check clean; each manual scenario and applicable contract has current evidence and no unresolved defect.
exit: all tasks verified done and nonempty final verification all HOLD; no uncommitted owned changes after authorized commit.
next: none → cycle complete; /garnish eligible.
