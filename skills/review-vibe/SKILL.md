---
name: review-vibe
description: |
  Review the current codebase and directly fix evidenced defects and unnecessary complexity. Use only for direct user requests: "/review-vibe" or matching natural-language requests for codebase health or security review with fixes, test cleanup, service/provider consistency, file organization, or spec coherence. No baseline or planning cycle required; never invoked by another skill.
---

# review-vibe — review and improve the current codebase

Carry the requested review through investigation, authorized fixes, and verification. Work from concrete failure modes and repository evidence; prioritize correctness, security, and data loss before maintainability. A review can reveal more work than its scope permits: disclose coverage limits and deferred findings.

This is a standalone skill for direct user requests, including matching natural language. No other skill may invoke or load it as a phase, hook, or helper. Its own use of encoding helpers below remains valid.

## Establish scope

Read repository guidance and any existing SPEC.md before editing. Inspect branch, HEAD, and dirty work; preserve unrelated edits and establish ownership before touching shared work. Read populated PLAN.md and HANDOFF.md for active tasks and verification context when present. Neither a baseline nor these documents is required; do not create missing workflow documents just to run this review. Never ingest BACKLOG.md.

Map the requested scope's entrypoints, modules, data flows, external services, tests, and documented checks. Identify applicable review surfaces and prioritize the paths with the greatest impact. Briefly mark inapplicable topics, such as accessibility without a UI; record unexamined areas. Consult current primary sources when a finding depends on external API behavior, dependency support, or security advisories. Separate verified facts from assumptions.

## Track coverage and resume

For a small identifiable scope, `REVIEW.md` may be omitted when its applicable surfaces, relevant callers, fixes, and required verification finish in the same session/context. This can include a whole tiny codebase; judge by the work and available context, not repository line counts or the word "broad" in a request. The final report must still state coverage, results, and limits. Reviews exceeding this bounded case, including broad or multi-round work, require a root `REVIEW.md` even if one round suffices.

If a small review expands, leaves unresolved coverage, encounters blockers, or cannot finish in the current session/context, create or update the ledger before stopping; preserve gathered evidence, partial fixes/checks, and the exact next action. Keep it lightweight and preserve unrelated existing content. Explicit user scope and output preferences override this default. This ledger records review evidence and continuation; it does not replace PLAN.md task tracking or require a planning cycle, encoded header, or another skill.

Partition the scoped inventory into identifiable sections tied to paths and applicable review surfaces, including callers and data flows across section boundaries. Order sections by impact; split large reviews into bounded rounds when size or available context warrants it. Account for every scoped area, with reasons for exclusions and inapplicable surfaces.

When using a ledger, keep enough for a new session to resume without prior chat: scope and exclusions; branch, revision, and relevant dirty-state context; current round; each section's paths, surfaces, and state (pending, in progress, reviewed, or blocked); inspection evidence and checks with results or unavailable-check reasons; findings and their fix/verification disposition; and one exact next section/action with prerequisites. Examined coverage, unresolved findings, and unverified fixes are separate facts. Mark a section reviewed only when its applicable surfaces have inspection evidence; passing tests alone does not establish coverage.

Before resuming, read the existing ledger and reconcile its scope, recorded revision, and dirty-state evidence with current files. Include new paths and changes to shared dependencies, callers, and affected flows. Preserve still-valid coverage and findings; reopen affected sections and stale checks. If earlier coverage or its revision cannot be established, mark it uncertain and recheck it instead of trusting a claimed completed round. Resume the next eligible section without requiring the user to repeat the original review instructions.

When using a ledger, refresh it at section boundaries and before stopping, recording exact partial work, check results, finding disposition, and the next action. Continue successive sections and rounds while authorized work is feasible; a section or round boundary alone is not a stopping point. If one area is blocked, record the prerequisite and continue independent areas. At a real context/session limit or when no feasible work remains, save a precise resume point and report remaining coverage and prerequisites.

Finish scoped examination only when every in-scope section has current evidence and exclusions are explicit. Distinguish round completion, completed examination, and completed fixes/verification; unresolved findings or unavailable required checks must remain visible and prevent a clean verified completion claim.

## Review surfaces

- **Correctness and boundaries:** trace inputs through effects, state transitions, and outputs. Check public API compatibility, validation, configuration/default consistency, and edge cases against callers and requirements.
- **Security:** trace authentication and authorization at relevant trust boundaries, including object and operation access. Follow untrusted input to queries, commands, rendering, and other sensitive effects. Check secrets, sensitive-data storage and log exposure, and dependency/supply-chain risks. Establish the trigger and impact of a vulnerability; distinguish demonstrated defects from optional hardening.
- **Recovery and concurrency:** inspect error propagation, partial failure, resource cleanup, cancellation, races, retry limits, and idempotency. Trace concurrent or repeated requests for duplicate effects and leaked resources, including failed and cancelled attempts.
- **Data integrity:** check persistence, transactions, migrations, compatibility with existing data, and recovery from interrupted writes. Verify integrity and compatibility whenever a fix changes stored data or its lifecycle.
- **Tests:** assess assertions and distinct behavior covered, including boundaries, failures, and regressions. Similar-looking tests may protect different contracts. Consolidate only when evidence shows redundancy and preserved coverage; do not delete tests merely to reduce their count. Avoid tests that only repeat implementation or document wording.
- **Complexity and reuse:** inspect nesting, duplication, ownership, and existing helpers before changing structure. Simplify demonstrated complexity with the smallest coherent change. Avoid speculative abstractions and wholesale framework replacement.
- **Services and providers:** compare interchangeable adapters at their shared caller contract: results, errors, lifecycle, defaults, and side effects. Reuse common behavior where justified; preserve meaningful capability differences explicitly. Verify switching providers for supported common operations and predictable handling of unsupported capabilities.
- **Organization and dependencies:** assess names, paths, module boundaries, and dependency necessity against actual consumers. For a rename or move, update and verify imports, callers, configuration, tests, and documentation references. Verify maintenance or security claims with current evidence before replacing a dependency.
- **Performance and diagnosis:** investigate suspected bottlenecks and resource use with measurements before optimizing. Check whether logging and metrics explain failures without exposing sensitive data; avoid instrumentation without a demonstrated need.
- **User experience:** when a UI exists, inspect accessibility and loading, empty, error, and success states on relevant flows. Verify changed interactions with appropriate UI checks.

## Spec coherence

If SPEC.md exists, compare relevant obligations with implementation and user intent. Identify contradictions and redundant or superseded requirements with evidence. A violated requirement does not justify deleting it: fix the implementation unless evidence establishes a durable requirement change. Load encode-docs for supported spec corrections; preserve valid obligations, stable ids, and counters. Leave material unresolved choices explicit rather than inventing a requirement. Do not create a spec for one-time findings.

## Fix and verify

1. For each actionable finding, establish location, trigger, impact, and the intended observable result. Inspect full affected code and relevant callers before editing. Use a failing behavioral regression test when it demonstrates a defect; select focused inspection or existing checks for changes that do not warrant a new test.
2. Complete fixes within the user's authority and review scope. Ask only for a material unresolved decision outside existing authority; continue independent authorized work. Preserve active task ownership and unrelated edits rather than silently taking over another task.
3. Run focused checks and required repository checks. Investigate failures before retrying; distinguish introduced defects, pre-existing failures, and environment limitations. Recheck affected behavior after corrections, retaining meaningful coverage when consolidating tests. When using a ledger, reopen coverage and checks invalidated by fixes, including affected sections already examined in this review, and refresh their evidence after rechecking.
4. Read the full owned diff and surrounding context for unintended behavior, interface changes, missed references, unnecessary complexity, and security regressions. Resolve in-scope defects before closing.
5. If fixes invalidate cycle task or final-verification evidence, load encode-docs to reconcile affected statuses and HANDOFF.md with current evidence; reopen affected completed work as work-in-progress and mark stale results UNVERIFIABLE until rechecked. Preserve unfinished work and exact next actions. Do not silently declare a cycle complete, reset it, or invoke prep to replace it.
6. Update the changelog and commit reviewed owned work according to user/repository policy; load encode-commit when preparing a commit message. Do not push, tag, publish, or perform destructive live-system actions without explicit authority. A blocker on one fix does not stop independent authorized fixes.

## Report

Lead with completed fixes and their practical effect. Give locations, triggers, impact, and fix direction for remaining issues, distinguishing demonstrated defects from optional improvements and unresolved questions. State checks and results, commits if any, deferred work and its reason, and examined/inapplicable/unexamined surfaces. When using a ledger, reference `REVIEW.md`, distinguish the current round from full scoped completion, and state the next action or the evidence supporting completion. Do not claim exhaustive coverage or treat passing tests as proof of unexamined behavior.

Explicit user instructions override skill guidance within higher-priority instructions and permissions. If a rule prevents authorized progress, identify its file and wording and the exact remaining prerequisite.
