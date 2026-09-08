# 05-ids-v1.0.0

First result: All 5/5 frozen acceptance groups passed.

| Evidence | Observed value |
|---|---|
| Variant | v1.0.0 |
| Executor | cook |
| Skill revision | 3e61bb66b5015ed7b732c423b6f1a2f5df4da279 |
| Seed commit | c49e3d28fb87b375643466e6d676ad0f4c31d077 |
| First HEAD | d5510ab908bee396a67bbff94278016f3df187d6 |
| Source snapshot SHA-256 | b6f6540c861cf79f8d7c72fa19bb37dd6ab7cd396d1c848ea84095a2c1cf081f |
| Independent acceptance | 5/5 groups; exit 0 |
| Subject tests rerun by evaluator | 7/7 tests; exit 0 |
| First tree | clean |
| Closure HEAD | c529cd24284c70996c238076dfcfd5619dc41c33 |
| Closure tree | clean |
| Production unchanged through garnish | true |
| Initial dispatch-to-recorded-return seconds | 329 |
| Closure dispatch-to-recorded-return seconds | 86 |
| Phases at checkpoint | F1 deliver repair; F2 final verification |
| Commits before / during closure | 2 / 1 |
| Source files / lines | 1 / 14 |
| Markdown files / bytes at checkpoint | 5 / 13014 |

Times are upper bounds from evaluator dispatch/receipt-record timestamps, including scheduling, dispatch, and recording delay; evaluator checkpoint wait is excluded. They are not model execution timings. Tool counts, token use, actual model/effort identifiers, and complete tool traces are unavailable. Counts of subject checks and clarification questions are not inferred from missing traces.

**Code:** An array guard and per-element string guard enforce the input contract; Set accumulation retains encounter order, empty IDs, and case distinctions. Only local state is written. Export preserved, no abstraction or source file added. Assertions test actual output, exceptions, and mutation behavior.

**Research:** Recorded seed paths, revision, baseline result, sorting defect, and missing validation accurately support the repair. Completed local research was reused before implementation and remained valid for final verification. Exact read traces/order are unavailable.

**Verification:** Independent acceptance and all seven submitted tests pass, consistent with completion. Historical red-test execution and repaired formatting failures are subject-reported; current executable and diff evidence holds.

**Closure:** Independent closure inspection: {"PLAN":true,"HANDOFF":true} exact frozen template matches; changed paths HANDOFF.md, PLAN.md. Production, tests, SPEC, and changelog remained unchanged; clean tree. Prerequisites were supported by the committed first-result evidence and independent checks.

**Workflow:** Two phases start with delivery and end with verification; no confirmation phase. Retained plan/handoff record prep and explicit review-plan GO, single-agent cook, then findings-only review at the exact seed. No repair coaching supplied.

**Limits:** One shared-host observation with procedural isolation. Complete tool traces, model/effort settings, tokens, and reliable speed attribution are unavailable.

<details>
<summary>Exact initial request</summary>

````text
Work only in C:/Users/sami/AppData/Local/Temp/skills-benchmark-20260907-304dcdb/runs/05-ids-v1.0.0/repo. Use the skills under C:/Users/sami/AppData/Local/Temp/skills-benchmark-20260907-304dcdb/bundles/v1.0.0/skills for this run; load the relevant SKILL.md files there by exact path. Do not use host-installed alternatives, sibling results, evaluator files, or parent cycle state.

Task: Fix uniqueIds(ids) to return each string ID's first occurrence in input order, case-sensitive, without mutating the input. Empty strings are valid IDs. Reject non-arrays and any non-string element with TypeError. Preserve the export.

Run prep, then review-plan, then cook for all remaining phases, then findings-only review-code against the explicit release baseline c49e3d28fb87b375643466e6d676ad0f4c31d077. Follow each supplied skill's behavior within this requested sequence. The explicit findings-only request overrides any automatic prep follow-up in review-code. Do not start a new remediation cycle or invoke review-vibe. For cater, direct execution is legitimate when delegation offers no material benefit; do not invent parallel tasks.

Local fixture edits and commits are authorized. Test command: npm test (npm.cmd test in Windows PowerShell). No network, installations, dependencies, global configuration changes, tags, remotes, or pushes.

Return after review-code, before garnish, with the review result, verification evidence, repository path, HEAD SHA, and dirty-tree state. Preserve cycle evidence for an independent checkpoint. Do not run garnish until this same session receives the evaluator's continuation. This is a benchmark checkpoint, not a request for user approval.

Run control: maximum ten minutes of subject workflow time, including closure continuation but excluding evaluator checkpoint wait. If the time budget prevents completion, preserve evidence and return the exact stopping point. Do not retry the workflow.
````

</details>
<details>
<summary>Subject first return</summary>

````text
GO — findings-only review found no actionable defects against baseline c49e3d28fb87b375643466e6d676ad0f4c31d077.
Completed prep, explicit review-plan, and both cook phases.
Verification: original implementation failed six regression cases; repaired suite passed all seven. Full diff review and git diff --check passed.
F1.T1 and F2.T1 are complete; retained handoff evidence covers the goal and SPEC constraints, export, and tests.
Branch: main
HEAD: d5510ab908bee396a67bbff94278016f3df187d6
Dirty tree: clean.
Repository: C:/Users/sami/AppData/Local/Temp/skills-benchmark-20260907-304dcdb/runs/05-ids-v1.0.0/repo
Stopped after review-code, before garnish. PLAN.md and HANDOFF.md remain populated for the evaluator checkpoint. No remediation cycle or review-vibe invoked.
Verification limit: local fixture tests and source inspection; Git's unreadable global-ignore warning did not prevent checks or commits.
````

</details>
<details>
<summary>Independent acceptance output</summary>

````text
TAP version 13
# Subtest: ids: first occurrences keep input order
ok 1 - ids: first occurrences keep input order
  ---
  duration_ms: 0.7704
  type: 'test'
  ...
# Subtest: ids: empty, case-sensitive, and property-like IDs
ok 2 - ids: empty, case-sensitive, and property-like IDs
  ---
  duration_ms: 0.0801
  type: 'test'
  ...
# Subtest: ids: reject non-array containers
ok 3 - ids: reject non-array containers
  ---
  duration_ms: 0.2442
  type: 'test'
  ...
# Subtest: ids: reject every non-string element
ok 4 - ids: reject every non-string element
  ---
  duration_ms: 0.1256
  type: 'test'
  ...
# Subtest: ids: input remains unchanged
ok 5 - ids: input remains unchanged
  ---
  duration_ms: 0.6704
  type: 'test'
  ...
1..5
# tests 5
# suites 0
# pass 5
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 56.3299
````

</details>
<details>
<summary>Subject test suite independently rerun</summary>

````text
TAP version 13
# Subtest: empty and repeated ordinary IDs
ok 1 - empty and repeated ordinary IDs
  ---
  duration_ms: 0.7734
  type: 'test'
  ...
# Subtest: retains first occurrences in input order
ok 2 - retains first occurrences in input order
  ---
  duration_ms: 0.0829
  type: 'test'
  ...
# Subtest: IDs are case-sensitive and empty strings are valid
ok 3 - IDs are case-sensitive and empty strings are valid
  ---
  duration_ms: 0.0556
  type: 'test'
  ...
# Subtest: does not mutate or reuse mutable and frozen input arrays
ok 4 - does not mutate or reuse mutable and frozen input arrays
  ---
  duration_ms: 0.1084
  type: 'test'
  ...
# Subtest: rejects non-array inputs with TypeError
ok 5 - rejects non-array inputs with TypeError
  ---
  duration_ms: 0.3345
  type: 'test'
  ...
# Subtest: rejects every non-string element with TypeError
ok 6 - rejects every non-string element with TypeError
  ---
  duration_ms: 0.1579
  type: 'test'
  ...
# Subtest: rejects sparse arrays with TypeError
ok 7 - rejects sparse arrays with TypeError
  ---
  duration_ms: 0.0751
  type: 'test'
  ...
1..7
# tests 7
# suites 0
# pass 7
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 59.6347
````

</details>
<details>
<summary>First diff from the published seed</summary>

````diff
diff --git a/CHANGELOG.md b/CHANGELOG.md
index 81fd2f1..f700232 100644
--- a/CHANGELOG.md
+++ b/CHANGELOG.md
@@ -4,0 +5,2 @@
+- Keep unique string IDs in their original order without changing the input, and reject invalid input types.
+
diff --git a/HANDOFF.md b/HANDOFF.md
new file mode 100644
index 0000000..562d911
--- /dev/null
+++ b/HANDOFF.md
@@ -0,0 +1,45 @@
+<!-- HANDOFF FORMAT (baked by /encode-docs — keep; makes this file self-describing)
+Current baton. Replace with current state; preserve valid evidence. Intent → PLAN.md, durable truth → SPEC.md.
+Sections: header | done this session | in progress (exact stop point) | next | deviations & decisions | watchouts | final verification. Empty section = -.
+Header: branch | HEAD before baton write | check commands/methods + exact results or not-run reasons | uncommitted files + ownership/reasons.
+Current/next pointers: F<n>.T<n>, or none + reason. Name precise action, file, function/section; list mid-edit files or none.
+Name failing file/case and unavailable checks exactly. Never invent test counts or future commit ids.
+Only final verification creates result rows; preserve valid rows on refresh. Stale evidence → UNVERIFIABLE until rechecked.
+Final table: item|status|evidence|decision, with delimiter row. Status: HOLD | VIOLATE | UNVERIFIABLE. Empty table ≠ completion.
+Symbols: → leads to | ∴ therefore | ∀ every | ∃ exists | ! required | ? unknown/optional | ⊥ forbidden/absent | ≠ differs | ∈ member | ∉ not member | ≤ at most | ≥ at least | & and | § section.
+Preserve literals, conditions, negation, uncertainty, quantities, and requirement strength.
+Full rules: /encode-docs.
+-->
+# HANDOFF 2026-09-07
+
+branch main | last commit f33d02d3b0354af9eb6983708f53ce2f0bf2ec18
+checks: final npm.cmd test: 7 passed, 0 failed; git diff --check passed; complete baseline-to-worktree source/test/changelog diff and cycle pointers inspected. Original regressions: 1 passed, 6 failed; failures reproduced ordering and missing validation.
+uncommitted: PLAN.md, HANDOFF.md — owned final verification and closure evidence, included in next commit; implementation/tests/changelog committed in f33d02d3b0354af9eb6983708f53ce2f0bf2ec18. No pre-existing changes.
+
+## done this session
+F1.T1: Stable case-sensitive string deduplication with empty IDs, array/string validation and fresh output; seven passing tests cover input preservation and boundary cases. Plain-English Unreleased fix entry committed.
+F2.T1: Final suite and full diff review passed; goal, relevant SPEC.md requirements, both tasks and verification evidence checked below. Prior research remains valid for verified planned changes. Prep and explicit review-plan were GO with no open findings.
+
+## in progress (exact stop point)
+none — cook cycle complete; preparing final evidence commit before findings-only review-code.
+mid-edit files: none.
+
+## next
+none — cycle complete; perform findings-only review-code against c49e3d28fb87b375643466e6d676ad0f4c31d077, then stop at evaluator checkpoint before garnish.
+
+## deviations & decisions
+No durable SPEC.md amendment needed. Original frozen-input regression failed on output order, not mutation. Owned BOM/line-ending diff failures were corrected and checks rerun. No new remediation cycle or review-vibe is authorized.
+
+## watchouts
+Retain PLAN.md and HANDOFF.md until same-session evaluator continuation authorizes garnish. No delegated assignments. Git warns global ignore is unreadable; fixture status/diff/commits succeed and global configuration is unchanged. Baton SHA intentionally names HEAD before this write.
+
+## final verification
+item|status|evidence|decision
+|---|---|---|---|
+Goal: first occurrence order, case-sensitive strings and empty IDs|HOLD|visible.test.mjs tests ordinary repeats, unsorted z/a/m sequence, b/empty/B distinction; all passed; ids.mjs inserts into Set without sorting|Delivered|
+Goal: reject non-arrays and every non-string element with TypeError|HOLD|Array.isArray guard and per-element typeof guard inspected; non-array, non-string and sparse-array tests passed|Delivered|
+Goal: preserve input and fresh output|HOLD|Mutable snapshot, output mutation isolation, frozen input and fresh empty array assertions passed; source writes only local Set|Delivered|
+SPEC.md §I.1|HOLD|Named uniqueIds export retained; test module imports it successfully|Preserved|
+SPEC.md §C.1|HOLD|package.json unchanged; ids.mjs uses built-in Array and Set; no dependencies or services added|Preserved|
+SPEC.md §V.1 and F1.T1|HOLD|npm.cmd test ran 7 cases, all passed; full assertions and source diff reviewed; Unreleased entry inspected|Verified|
+F2.T1 and cycle coherence|HOLD|Required suite and git diff --check passed; task ids, dependencies and next pointers inspected; no missed helper/caller or unrelated source changes|Complete; retain evidence for review checkpoint|
diff --git a/PLAN.md b/PLAN.md
new file mode 100644
index 0000000..70d07d2
--- /dev/null
+++ b/PLAN.md
@@ -0,0 +1,75 @@
+<!-- PLAN FORMAT (baked by /encode-docs — keep; makes this file self-describing)
+One cycle. Update in place during execution; replace wholesale only for an authorized new/superseding cycle. Durable truth → SPEC.md.
+Order: goal | ground rules | existing assets (prior research) | phase order | phase sections.
+Prior research: scope/questions | findings/decisions | local paths + relevant revisions/dirty inputs | external URLs/check dates when applicable | unknowns + gate.
+Phase ids F1..Fn; numbered research optional when current evidence covers scope. Research precedes dependent coding; final verification last. Failed verification reopens affected work before recheck.
+Each phase: goal | inputs | files | dependencies/gates | §T tasks (≥1) | verify | exit | next.
+Tasks: T<n> unique/monotonic within phase. Status: . todo | ~ in progress | x verified done. Preserve ids and valid F<n>.T<n> pointers within cycle.
+Remove redundant research only when unstarted with no execution/assignment evidence; retain other ids (gaps valid), history, and statuses; repair all references. Planning never marks execution tasks done.
+Execution state: prep writes new; cook/cater validate relevant research before new→work-in-progress, direct work, or dispatch. Missing/stale evidence → main-agent review-plan first; consequential unknowns block dependent coding.
+Recheck affected assumptions; refresh research only when findings/decisions no longer support selected work. Unrelated changes and verified planned edits preserving that support do not stale research.
+handoff requests done only when all tasks x and nonempty final evidence covers goal/contracts with HOLD.
+Reopened work → work-in-progress. garnish resets header-only new. Empty new → /prep; done → /garnish. prep queues requests during active execution unless user supersedes cycle.
+Symbols: → leads to | ∴ therefore | ∀ every | ∃ exists | ! required | ? unknown/optional | ⊥ forbidden/absent | ≠ differs | ∈ member | ∉ not member | ≤ at most | ≥ at least | & and | § section.
+Preserve literals, conditions, negation, uncertainty, quantities, and requirement strength. Tables need delimiter rows.
+Executable without chat history. Full rules: /encode-docs.
+planning status: done
+-->
+# PLAN
+
+goal: Return each string ID's first occurrence in input order, case-sensitive; accept empty strings; reject non-arrays and every non-string element with TypeError; preserve input and named export.
+
+## ground rules
+- Scope: ids.mjs, visible.test.mjs, CHANGELOG.md, PLAN.md, HANDOFF.md. No dependency, network, global configuration, tag, remote, or push changes.
+- Run prep → review-plan → cook → findings-only review-code against c49e3d28fb87b375643466e6d676ad0f4c31d077. Preserve cycle evidence until evaluator continuation; no garnish before then.
+- Local edits and commits authorized. Verify with npm.cmd test. No durable SPEC.md change needed for this repair.
+
+## existing assets
+- ids.mjs exports uniqueIds; visible.test.mjs has one node:test case; package.json runs node --test without dependencies.
+prior research: Inspected implementation, complete tests, package.json, AGENTS.md, SPEC.md and git baseline. Sorting breaks first-occurrence order; missing validation accepts non-arrays and non-string values. An insertion-ordered Set preserves case-sensitive string identity and empty strings; a for-of validation loop also rejects sparse slots as undefined. Return a new result without writing input.
+local evidence: ids.mjs, visible.test.mjs, package.json, AGENTS.md, SPEC.md at c49e3d28fb87b375643466e6d676ad0f4c31d077; initial tree clean. Baseline npm.cmd test: 1 passed, 0 failed. No other callers/helpers in fixture.
+external evidence: not applicable; dependency-free local JavaScript behavior, no external API or version decision.
+unknowns & gate: none; implementation allowed after review-plan GO. Relevant source and requirements must continue to support this record before execution.
+review: prep review-plan GO; explicit post-prep review-plan GO. Coverage, ordering, references, verification, gates, risk and feasibility checked against full fixture source and contract. Open findings: 0; unknowns: none. At review, execution tasks were todo and source matched inspected baseline. F1 verified edits preserve these research findings and decisions; F2 gate remains satisfied.
+
+## phase order
+id|goal|depends|exit
+|---|---|---|---|
+F1|Repair utility and cover input contract|Current prior research and review-plan GO|Regression suite passes; reviewed implementation and changelog|
+F2|Final verification|F1|Goal, relevant spec and all tasks hold with recorded evidence|
+
+## F1 deliver repair
+goal: Implement requested uniqueIds behavior with useful regression coverage.
+inputs: User contract; prior research; SPEC.md §C.1, §I.1, §V.1.
+files: ids.mjs, visible.test.mjs, CHANGELOG.md, PLAN.md, HANDOFF.md.
+depends: Current prior research and review-plan GO; no consequential unknowns.
+
+### §T tasks
+id|status|description|cites
+|---|---|---|---|
+T1|x|Add behavioral regressions, repair validation and stable deduplication, and document fix|§I.1, §V.1|
+
+task: T1
+touch: ids.mjs, visible.test.mjs, CHANGELOG.md, PLAN.md, HANDOFF.md.
+details: Test unsorted repeats, case differences, empty IDs, fresh empty result, nonmutation with frozen and mutable inputs, non-arrays, representative non-string values including holes. Preserve named export. Demonstrate failures on original implementation before repair. Add plain-English Unreleased entry.
+verify: npm.cmd test; inspect case assertions and full diff for contract, absence of input writes/dependencies, preserved export and scope.
+exit: All regression cases pass and reviewed repair matches each input/output rule.
+next: F2.T1.
+
+## F2 final verification
+goal: Verify delivered behavior and retain checkpoint evidence.
+inputs: F1 result, complete diff, goal, SPEC.md §C.1, §I.1, §V.1.
+files: PLAN.md, HANDOFF.md; read changed implementation, tests and changelog.
+depends: F1.T1 verified done; planned source changes preserve research decisions.
+
+### §T tasks
+id|status|description|cites
+|---|---|---|---|
+T1|x|Run required suite and inspect goal, contracts, task completion, and owned diff|§C.1, §I.1, §V.1|
+
+task: T1
+touch: PLAN.md, HANDOFF.md.
+details: Inspect full repair and assertions; run npm.cmd test and git diff --check; record nonempty final verification table for goal, relevant spec and F1/F2 tasks. Reopen any failed work. Commit evidence and finish cook, then perform findings-only review-code at explicit baseline; retain plan and baton for evaluator.
+verify: npm.cmd test passes all cases; git diff --check passes; specific source and test inspection confirms each goal rule, preserved export and no dependencies.
+exit: Every task x and final evidence HOLD; review checkpoint remains available with HEAD and dirty-tree state.
+next: none — cycle complete; findings-only review-code, then evaluator checkpoint before garnish.
diff --git a/ids.mjs b/ids.mjs
index 213d973..eb31f32 100644
--- a/ids.mjs
+++ b/ids.mjs
@@ -2 +2,12 @@ export function uniqueIds(ids) {
-  return [...new Set(ids)].sort();
+  if (!Array.isArray(ids)) {
+    throw new TypeError('ids must be an array');
+  }
+
+  const unique = new Set();
+  for (const id of ids) {
+    if (typeof id !== 'string') {
+      throw new TypeError('every ID must be a string');
+    }
+    unique.add(id);
+  }
+  return [...unique];
diff --git a/visible.test.mjs b/visible.test.mjs
index 21f403c..33b4aeb 100644
--- a/visible.test.mjs
+++ b/visible.test.mjs
@@ -8,0 +9,41 @@ test('empty and repeated ordinary IDs', () => {
+
+test('retains first occurrences in input order', () => {
+  assert.deepEqual(uniqueIds(['z', 'a', 'z', 'm', 'a']), ['z', 'a', 'm']);
+});
+
+test('IDs are case-sensitive and empty strings are valid', () => {
+  assert.deepEqual(uniqueIds(['b', '', 'B', 'b', '', 'B']), ['b', '', 'B']);
+});
+
+test('does not mutate or reuse mutable and frozen input arrays', () => {
+  const ids = ['z', 'a', 'z'];
+  const before = ids.slice();
+  const result = uniqueIds(ids);
+  assert.deepEqual(ids, before);
+  assert.notStrictEqual(result, ids);
+  result.push('new');
+  assert.deepEqual(ids, before);
+  assert.deepEqual(uniqueIds(Object.freeze(ids.slice())), ['z', 'a']);
+  const empty = [];
+  assert.notStrictEqual(uniqueIds(empty), empty);
+});
+
+test('rejects non-array inputs with TypeError', () => {
+  for (const value of [undefined, null, 'ab', '', 1, true, {}, new Set(['a']), { 0: 'a', length: 1 }, () => {}]) {
+    assert.throws(() => uniqueIds(value), TypeError);
+  }
+});
+
+test('rejects every non-string element with TypeError', () => {
+  for (const value of [undefined, null, 0, false, {}, [], Symbol('id'), 1n, () => {}, new String('a')]) {
+    const ids = ['valid', value, 'valid'];
+    const before = ids.slice();
+    assert.throws(() => uniqueIds(ids), TypeError);
+    assert.deepEqual(ids, before);
+  }
+});
+
+test('rejects sparse arrays with TypeError', () => {
+  assert.throws(() => uniqueIds(new Array(1)), TypeError);
+  assert.throws(() => uniqueIds(['a', , 'b']), TypeError);
+});
````

</details>
<details>
<summary>Commits before garnish</summary>

````text
d5510ab docs: record utility verification evidence
f33d02d fix(ids): preserve order and validate input
````

</details>
<details>
<summary>Garnish continuation and response</summary>

````text
Independent checkpoint for your first submission at d5510ab908bee396a67bbff94278016f3df187d6 / source snapshot b6f6540c861cf79f8d7c72fa19bb37dd6ab7cd396d1c848ea84095a2c1cf081f: 5/5 frozen acceptance groups passed; independently rerun subject suite 7/7 passed. Main inspected the submitted code and cycle evidence. No independent implementation blocker found.

Now apply garnish from the same supplied frozen bundle only if its closure prerequisites hold on the observed state. Independent failures invalidate affected completion evidence; preserve any blocker and report unmet prerequisites. Do not repair the implementation, start another planning cycle, or erase incomplete evidence. Local closure commits are authorized. Return the closure result, HEAD SHA, and dirty-tree state.

Garnish completed; all closure prerequisites passed.
Reset only PLAN.md and HANDOFF.md to baked headers.
Kept all spec requirements; none were superseded.
Preserved completion evidence in d5510ab908bee396a67bbff94278016f3df187d6.
Verification remains current: 5/5 independent acceptance groups, 7/7 tests; cleanup diff check passed.
HEAD: c529cd24284c70996c238076dfcfd5619dc41c33
Dirty tree: clean.
No new planning cycle started. The requested findings-only review was already GO.
````

</details>
<details>
<summary>Garnish diff</summary>

````diff
diff --git a/HANDOFF.md b/HANDOFF.md
index 562d911..b063162 100644
--- a/HANDOFF.md
+++ b/HANDOFF.md
@@ -13,33 +12,0 @@ Full rules: /encode-docs.
-# HANDOFF 2026-09-07
-
-branch main | last commit f33d02d3b0354af9eb6983708f53ce2f0bf2ec18
-checks: final npm.cmd test: 7 passed, 0 failed; git diff --check passed; complete baseline-to-worktree source/test/changelog diff and cycle pointers inspected. Original regressions: 1 passed, 6 failed; failures reproduced ordering and missing validation.
-uncommitted: PLAN.md, HANDOFF.md — owned final verification and closure evidence, included in next commit; implementation/tests/changelog committed in f33d02d3b0354af9eb6983708f53ce2f0bf2ec18. No pre-existing changes.
-
-## done this session
-F1.T1: Stable case-sensitive string deduplication with empty IDs, array/string validation and fresh output; seven passing tests cover input preservation and boundary cases. Plain-English Unreleased fix entry committed.
-F2.T1: Final suite and full diff review passed; goal, relevant SPEC.md requirements, both tasks and verification evidence checked below. Prior research remains valid for verified planned changes. Prep and explicit review-plan were GO with no open findings.
-
-## in progress (exact stop point)
-none — cook cycle complete; preparing final evidence commit before findings-only review-code.
-mid-edit files: none.
-
-## next
-none — cycle complete; perform findings-only review-code against c49e3d28fb87b375643466e6d676ad0f4c31d077, then stop at evaluator checkpoint before garnish.
-
-## deviations & decisions
-No durable SPEC.md amendment needed. Original frozen-input regression failed on output order, not mutation. Owned BOM/line-ending diff failures were corrected and checks rerun. No new remediation cycle or review-vibe is authorized.
-
-## watchouts
-Retain PLAN.md and HANDOFF.md until same-session evaluator continuation authorizes garnish. No delegated assignments. Git warns global ignore is unreadable; fixture status/diff/commits succeed and global configuration is unchanged. Baton SHA intentionally names HEAD before this write.
-
-## final verification
-item|status|evidence|decision
-|---|---|---|---|
-Goal: first occurrence order, case-sensitive strings and empty IDs|HOLD|visible.test.mjs tests ordinary repeats, unsorted z/a/m sequence, b/empty/B distinction; all passed; ids.mjs inserts into Set without sorting|Delivered|
-Goal: reject non-arrays and every non-string element with TypeError|HOLD|Array.isArray guard and per-element typeof guard inspected; non-array, non-string and sparse-array tests passed|Delivered|
-Goal: preserve input and fresh output|HOLD|Mutable snapshot, output mutation isolation, frozen input and fresh empty array assertions passed; source writes only local Set|Delivered|
-SPEC.md §I.1|HOLD|Named uniqueIds export retained; test module imports it successfully|Preserved|
-SPEC.md §C.1|HOLD|package.json unchanged; ids.mjs uses built-in Array and Set; no dependencies or services added|Preserved|
-SPEC.md §V.1 and F1.T1|HOLD|npm.cmd test ran 7 cases, all passed; full assertions and source diff reviewed; Unreleased entry inspected|Verified|
-F2.T1 and cycle coherence|HOLD|Required suite and git diff --check passed; task ids, dependencies and next pointers inspected; no missed helper/caller or unrelated source changes|Complete; retain evidence for review checkpoint|
diff --git a/PLAN.md b/PLAN.md
index 70d07d2..b78384c 100644
--- a/PLAN.md
+++ b/PLAN.md
@@ -16 +16 @@ Executable without chat history. Full rules: /encode-docs.
-planning status: done
+planning status: new
@@ -18,58 +17,0 @@ planning status: done
-# PLAN
-
-goal: Return each string ID's first occurrence in input order, case-sensitive; accept empty strings; reject non-arrays and every non-string element with TypeError; preserve input and named export.
-
-## ground rules
-- Scope: ids.mjs, visible.test.mjs, CHANGELOG.md, PLAN.md, HANDOFF.md. No dependency, network, global configuration, tag, remote, or push changes.
-- Run prep → review-plan → cook → findings-only review-code against c49e3d28fb87b375643466e6d676ad0f4c31d077. Preserve cycle evidence until evaluator continuation; no garnish before then.
-- Local edits and commits authorized. Verify with npm.cmd test. No durable SPEC.md change needed for this repair.
-
-## existing assets
-- ids.mjs exports uniqueIds; visible.test.mjs has one node:test case; package.json runs node --test without dependencies.
-prior research: Inspected implementation, complete tests, package.json, AGENTS.md, SPEC.md and git baseline. Sorting breaks first-occurrence order; missing validation accepts non-arrays and non-string values. An insertion-ordered Set preserves case-sensitive string identity and empty strings; a for-of validation loop also rejects sparse slots as undefined. Return a new result without writing input.
-local evidence: ids.mjs, visible.test.mjs, package.json, AGENTS.md, SPEC.md at c49e3d28fb87b375643466e6d676ad0f4c31d077; initial tree clean. Baseline npm.cmd test: 1 passed, 0 failed. No other callers/helpers in fixture.
-external evidence: not applicable; dependency-free local JavaScript behavior, no external API or version decision.
-unknowns & gate: none; implementation allowed after review-plan GO. Relevant source and requirements must continue to support this record before execution.
-review: prep review-plan GO; explicit post-prep review-plan GO. Coverage, ordering, references, verification, gates, risk and feasibility checked against full fixture source and contract. Open findings: 0; unknowns: none. At review, execution tasks were todo and source matched inspected baseline. F1 verified edits preserve these research findings and decisions; F2 gate remains satisfied.
-
-## phase order
-id|goal|depends|exit
-|---|---|---|---|
-F1|Repair utility and cover input contract|Current prior research and review-plan GO|Regression suite passes; reviewed implementation and changelog|
-F2|Final verification|F1|Goal, relevant spec and all tasks hold with recorded evidence|
-
-## F1 deliver repair
-goal: Implement requested uniqueIds behavior with useful regression coverage.
-inputs: User contract; prior research; SPEC.md §C.1, §I.1, §V.1.
-files: ids.mjs, visible.test.mjs, CHANGELOG.md, PLAN.md, HANDOFF.md.
-depends: Current prior research and review-plan GO; no consequential unknowns.
-
-### §T tasks
-id|status|description|cites
-|---|---|---|---|
-T1|x|Add behavioral regressions, repair validation and stable deduplication, and document fix|§I.1, §V.1|
-
-task: T1
-touch: ids.mjs, visible.test.mjs, CHANGELOG.md, PLAN.md, HANDOFF.md.
-details: Test unsorted repeats, case differences, empty IDs, fresh empty result, nonmutation with frozen and mutable inputs, non-arrays, representative non-string values including holes. Preserve named export. Demonstrate failures on original implementation before repair. Add plain-English Unreleased entry.
-verify: npm.cmd test; inspect case assertions and full diff for contract, absence of input writes/dependencies, preserved export and scope.
-exit: All regression cases pass and reviewed repair matches each input/output rule.
-next: F2.T1.
-
-## F2 final verification
-goal: Verify delivered behavior and retain checkpoint evidence.
-inputs: F1 result, complete diff, goal, SPEC.md §C.1, §I.1, §V.1.
-files: PLAN.md, HANDOFF.md; read changed implementation, tests and changelog.
-depends: F1.T1 verified done; planned source changes preserve research decisions.
-
-### §T tasks
-id|status|description|cites
-|---|---|---|---|
-T1|x|Run required suite and inspect goal, contracts, task completion, and owned diff|§C.1, §I.1, §V.1|
-
-task: T1
-touch: PLAN.md, HANDOFF.md.
-details: Inspect full repair and assertions; run npm.cmd test and git diff --check; record nonempty final verification table for goal, relevant spec and F1/F2 tasks. Reopen any failed work. Commit evidence and finish cook, then perform findings-only review-code at explicit baseline; retain plan and baton for evaluator.
-verify: npm.cmd test passes all cases; git diff --check passes; specific source and test inspection confirms each goal rule, preserved export and no dependencies.
-exit: Every task x and final evidence HOLD; review checkpoint remains available with HEAD and dirty-tree state.
-next: none — cycle complete; findings-only review-code, then evaluator checkpoint before garnish.
````

</details>
