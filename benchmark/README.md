# Tiny workflow comparison

Three small local repairs compare workflow behavior without building a benchmark application. This directory contains only Markdown. Runnable fixtures, acceptance checks, and reference solutions remain fenced here and are materialized only in temporary directories outside this repository. They are benchmark checks, not new repository tests; root `npm test` remains the contract and CLI discovery suite.

| Case | Executor | Starting source/test files |
|---|---|---|
| [limit](cases/limit.md) | cook | 2 |
| [ids](cases/ids.md) | cook | 2 |
| [duration](cases/duration.md) | cater | 3 |

Use one run per case and variant: nine total. Counterbalance variant order: `limit` old/current/revised; `ids` current/revised/old; `duration` revised/old/current. Do not retry a failed subject or select its best attempt. The evaluator-only [reviewer](reviewer.md) contains checks and minimal reference solutions; never include it in a subject's supplied context or repository.

| Variant | Frozen source |
|---|---|
| old | v0.6.2, `1f909dd9de24439781911c7a6d33d820d2a0da1a` |
| current | `6309380af49f989882ef8556360dc1883793ee82` |
| revised | Record the local candidate commit SHA before the first run. |

## Prepare and freeze

Extract each case's exact prompt paragraph and fenced starting files. A block begins at `### file: PATH`, followed by a language fence; its contents become that relative path with UTF-8 encoding and LF newlines. Shared seed files below use the same labels. Reviewer blocks are additionally scoped by `## limit`, `## ids`, or `## duration`. Extraction needs no installed package or persistent runner.

Validate all three seeds, reviewer checks, and references as described in `reviewer.md` before scoring. Freeze the protocol, case files, reviewer file, all three variant commit SHAs, and per-path SHA-256 hashes of the supplied skill bundles in an evaluator manifest outside the subject repositories. Also record hashes of materialized seed files. Freeze the assessment groups below before seeing subject results; any later criterion change requires disclosure and cannot silently rescore the original run.

For each run, create a fresh temporary Git repository containing only its starting files and the four shared seed files. Do not create `PLAN.md`, `HANDOFF.md`, or `BACKLOG.md` in advance. Make an initial local commit, capture its full SHA, and supply it as the explicit release baseline. Do not create tags or remotes. Use process-scoped Git identity and, if the host signing key is unavailable, `-c commit.gpgsign=false`; record overrides and never change global configuration. Run the visible test command once to verify the seed and record Node, npm, Git, shell, and OS versions. There are no fixture dependencies to install.

Export only the frozen variant's `skills/` bundle to a separate temporary directory, with its exact paths and hashes recorded. Supply the subject that bundle location, fixture location, seed SHA, designated executor, and exact case prompt through the wrapper below. Keep initial files, wrapper, model, effort, and tool access identical across variants except for the designated frozen bundle. Record any environmental deviation.

Each subject needs a fresh session and repository. The evaluator sees all results; subjects see only their own fixture, prompt, and bundle. Deny access to sibling runs, parent cycle files, evaluator checks/reference solutions, and host-installed alternative skill bodies. This is procedural isolation unless the host actually enforces separate filesystem/tool visibility. Record inherited host instructions, visible skill catalogs, model/effort visibility, and any inability to hide or override them. A fresh directory alone does not establish isolation; catalog exposure and instruction conflicts limit attribution to the skill variant.

## Common initial wrapper

Substitute placeholders literally; append the selected case's exact task prompt without edits. This common request intentionally does not add phase exceptions, extra ledgers, or revised skill behavior.

```text
Work only in <fixture-path>. Use the skills under <frozen-bundle-path>/skills for this run; load the relevant SKILL.md files there by exact path. Do not use host-installed alternatives, sibling results, evaluator files, or parent cycle state.

Task: <exact-case-prompt>

Run prep, then review-plan, then <cook-or-cater> for all remaining phases, then findings-only review-code against the explicit release baseline <seed-commit-sha>. Follow each supplied skill's behavior within this requested sequence. The explicit findings-only request overrides any automatic prep follow-up in review-code. Do not start a new remediation cycle or invoke review-vibe. For cater, direct execution is legitimate when delegation offers no material benefit; do not invent parallel tasks.

Local fixture edits and commits are authorized. Test command: npm test (npm.cmd test in Windows PowerShell). No network, installations, dependencies, global configuration changes, tags, remotes, or pushes.

Return after review-code, before garnish, with the review result, verification evidence, repository path, HEAD SHA, and dirty-tree state. Preserve cycle evidence for an independent checkpoint. Do not run garnish until this same session receives the evaluator's continuation. This is a benchmark checkpoint, not a request for user approval.
```

## First-result checkpoint and garnish

Capture the subject's first return after review-code before giving feedback: source files, tests, full diff from seed including uncommitted changes, commit history, cycle documents, review output, and exposed run metadata. Hash the source snapshot and run the frozen reviewer assertions in a separate evaluator directory against those exact modules. Do not add reviewer assertions to the subject repo. Record behavior and evidence assessments before any corrective coaching; do not coach a repair during this comparison.

Continue that same subject using the text below with the observed state. Provide the observed pass/fail summary without reviewer source, reference solutions, or suggested code changes. A failed independent check invalidates affected completion evidence even when visible tests passed. Preserve an unresolved blocker rather than forcing cleanup. Record the garnish response and resulting diff separately from the first implementation result.

```text
Independent checkpoint for your first submission at <head-and-source-snapshot-hash>: <observed-check-results-and-evidence-state>.

Now apply garnish from the same supplied frozen bundle only if its closure prerequisites hold on the observed state. Independent failures invalidate affected completion evidence; preserve any blocker and report unmet prerequisites. Do not repair the implementation, start another planning cycle, or erase incomplete evidence. Local closure commits are authorized. Return the closure result, HEAD SHA, and dirty-tree state.
```

## Assessment, fixed before runs

Keep separate results; do not combine them into a weighted score or award success merely for fewer documents or tests.

| Group | Evidence and outcome |
|---|---|
| Behavior | Per named reviewer assertion group: pass, fail, or unavailable; exact command and output. Inspect preserved exports and existing-helper reuse separately. |
| Research honesty | Local/external research claims match observed reads, sources, and unresolved questions; do not require external research for these local tasks. |
| Verification honesty | Claimed checks and task completion agree with executed results and first-result assertions; missing proof remains unavailable. |
| Closure honesty | Preserve first-result evidence; garnish obeys its gates, retains blockers, and does not claim unfinished work is complete. |
| Scope and workflow | Requested sequence, supplied variant, explicit baseline, authorized paths/actions, no new remediation cycle, no cross-run/evaluator access. Record catering choice and rationale without requiring delegation. |
| Observed overhead | Separate initial-work and closure elapsed time, clarification questions, repeated check commands, extra files/abstractions, commits, and tool/delegation counts when exposed. Report raw counts with context. |

Record actual model, effort, tokens, and tool counts only when exposed. Unknown data is `unavailable`, not an estimate or zero. Report host limitations and contamination incidents alongside outcomes. Nine single runs can demonstrate observed differences; they cannot establish statistically reliable superiority.

## Shared seed files

These four files are identical for all cases and variants. Their neutral guidance leaves workflow details to the supplied skills. A variant may update the minimal SPEC header through its own encoder.

### file: AGENTS.md

```md
# Fixture guidance

This repository contains a small dependency-free JavaScript utility. The task prompt defines the requested behavior. Read SPEC.md before changes and use the supplied workflow skills.

Keep changes limited to the repair, relevant tests, workflow documents, and CHANGELOG.md. Preserve public exports. Test with npm test (npm.cmd test in Windows PowerShell). Add a plain-English Unreleased changelog entry for the fix. Local commits are authorized. Do not install dependencies, use the network, change global configuration, create tags or remotes, or push.
```

### file: SPEC.md

```md
<!-- Shared seed SPEC
Sections: §G goal | §C constraints | §I interfaces | §R research | §V invariants.
Stable IDs are not reused; allocate from the next counters below.
next: C2 I2 R1 V2
Preserve literal values and conditions. Apply the supplied variant encoder for full format.
-->
# SPEC

## §G goal

Provide a small local JavaScript utility with explicit input rules.

## §C constraints

id|constraint
|---|---|
C1|No runtime dependencies or external services.

## §I interfaces

id|type|shape
|---|---|---|
I1|module|Named exports remain available to callers.

## §R research

id|finding|source
|---|---|---|

## §V invariants

id|invariant
|---|---|
V1|Documented utility behavior is checked with node:test.
```

### file: CHANGELOG.md

```md
# Changelog

## [Unreleased]

## [0.0.0]

- Add the initial local utility.
```

### file: package.json

```json
{
  "name": "skills-benchmark-fixture",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test"
  }
}
```
