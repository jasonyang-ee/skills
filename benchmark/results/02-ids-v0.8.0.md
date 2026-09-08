# 02-ids-v0.8.0

First result: All 5/5 frozen acceptance groups passed.

| Evidence | Observed value |
|---|---|
| Variant | v0.8.0 |
| Executor | cook |
| Skill revision | 6309380af49f989882ef8556360dc1883793ee82 |
| Seed commit | c49e3d28fb87b375643466e6d676ad0f4c31d077 |
| First HEAD | 2016d0eda98aac9a344bb7a7d1d438ff19598601 |
| Source snapshot SHA-256 | 61c1d5f0ea628c55764342a3bb504071386ab1753c940e9644fb3205572300f0 |
| Independent acceptance | 5/5 groups; exit 0 |
| Subject tests rerun by evaluator | 7/7 tests; exit 0 |
| First tree | clean |
| Closure HEAD | 24256ca755a72da1948a2e31789ca185e774476c |
| Closure tree | clean |
| Production unchanged through garnish | true |
| Initial dispatch-to-recorded-return seconds | 405 |
| Closure dispatch-to-recorded-return seconds | 132 |
| Phases at checkpoint | F1 research; F2 implementation; F3 final verification |
| Commits before / during closure | 3 / 1 |
| Source files / lines | 1 / 14 |
| Markdown files / bytes at checkpoint | 5 / 12739 |

Times are upper bounds from evaluator dispatch/receipt-record timestamps, including scheduling, dispatch, and recording delay; evaluator checkpoint wait is excluded. They are not model execution timings. Tool counts, token use, actual model/effort identifiers, and complete tool traces are unavailable. Counts of subject checks and clarification questions are not inferred from missing traces.

**Code:** Array and element type guards enforce the requested errors; Set accumulation preserves first encounter order without sorting or mutation. The named export remains and no abstraction was added. Assertions directly exercise order, case, empty strings, invalid inputs, and frozen arrays.

**Research:** Recorded local findings correctly identify sorting and permissive iterable handling in the seed. No external research was needed. Complete tool traces and exact read order are unavailable; recorded research is supported by source facts but not independently trace-verified.

**Verification:** Independent acceptance and the submitted seven-test suite both pass. Completion claims match the current executable result; historical red-test execution remains subject-reported.

**Closure:** Independent closure inspection: {"PLAN":true,"HANDOFF":true} exact frozen template matches; changed paths HANDOFF.md, PLAN.md. Production, tests, SPEC, and changelog remained unchanged; clean tree. Prerequisites were supported by the committed first-result evidence and independent checks.

**Workflow:** The retained plan, handoff, commits, and first return support the requested sequence and exact seed baseline. Three phases include a separate research confirmation. Three pre-garnish commits. No repair coaching supplied.

**Limits:** One shared-host observation with procedural isolation; model, effort, tokens, and complete tool traces unavailable. Passing groups cover published checks, not every possible input.

<details>
<summary>Exact initial request</summary>

````text
Work only in C:/Users/sami/AppData/Local/Temp/skills-benchmark-20260907-304dcdb/runs/02-ids-v0.8.0/repo. Use the skills under C:/Users/sami/AppData/Local/Temp/skills-benchmark-20260907-304dcdb/bundles/v0.8.0/skills for this run; load the relevant SKILL.md files there by exact path. Do not use host-installed alternatives, sibling results, evaluator files, or parent cycle state.

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
Completed prep → explicit review-plan → cook → review-code.
uniqueIds preserves first occurrence order, case sensitivity, empty strings, input contents, and the named export. Invalid inputs raise TypeError.
Verification: baseline 1/1 passed; regressions reproduced five failures; repaired and final suites passed 7/7. Baseline-to-HEAD whitespace check passed.
Reviewed utility, tests, changelog, and cycle evidence. F1.T1–F3.T1 are verified; all ten final evidence rows are HOLD. No external or evaluator checks were used.
Branch: main
HEAD: 2016d0eda98aac9a344bb7a7d1d438ff19598601
Dirty tree: clean.
Repository: C:/Users/sami/AppData/Local/Temp/skills-benchmark-20260907-304dcdb/runs/02-ids-v0.8.0/repo
Populated PLAN.md and HANDOFF.md remain committed. Stopped after review-code, before garnish; no remediation cycle started. Approximately 5 minutes 10 seconds of the ten-minute workflow budget used.
````

</details>
<details>
<summary>Independent acceptance output</summary>

````text
TAP version 13
# Subtest: ids: first occurrences keep input order
ok 1 - ids: first occurrences keep input order
  ---
  duration_ms: 0.7766
  type: 'test'
  ...
# Subtest: ids: empty, case-sensitive, and property-like IDs
ok 2 - ids: empty, case-sensitive, and property-like IDs
  ---
  duration_ms: 0.09
  type: 'test'
  ...
# Subtest: ids: reject non-array containers
ok 3 - ids: reject non-array containers
  ---
  duration_ms: 0.2384
  type: 'test'
  ...
# Subtest: ids: reject every non-string element
ok 4 - ids: reject every non-string element
  ---
  duration_ms: 0.1245
  type: 'test'
  ...
# Subtest: ids: input remains unchanged
ok 5 - ids: input remains unchanged
  ---
  duration_ms: 0.5084
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
# duration_ms 53.2403
````

</details>
<details>
<summary>Subject test suite independently rerun</summary>

````text
TAP version 13
# Subtest: empty and repeated ordinary IDs
ok 1 - empty and repeated ordinary IDs
  ---
  duration_ms: 0.7703
  type: 'test'
  ...
# Subtest: keeps each first occurrence in input order
ok 2 - keeps each first occurrence in input order
  ---
  duration_ms: 0.0831
  type: 'test'
  ...
# Subtest: empty strings are valid and IDs are case-sensitive
ok 3 - empty strings are valid and IDs are case-sensitive
  ---
  duration_ms: 0.0581
  type: 'test'
  ...
# Subtest: preserves input and returns a separate array
ok 4 - preserves input and returns a separate array
  ---
  duration_ms: 0.0931
  type: 'test'
  ...
# Subtest: rejects non-arrays with TypeError
ok 5 - rejects non-arrays with TypeError
  ---
  duration_ms: 0.6993
  type: 'test'
  ...
# Subtest: rejects every non-string element with TypeError
ok 6 - rejects every non-string element with TypeError
  ---
  duration_ms: 0.1598
  type: 'test'
  ...
# Subtest: rejects sparse array holes with TypeError
ok 7 - rejects sparse array holes with TypeError
  ---
  duration_ms: 0.0678
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
# duration_ms 58.1173
````

</details>
<details>
<summary>First diff from the published seed</summary>

````diff
diff --git a/CHANGELOG.md b/CHANGELOG.md
index 81fd2f1..ba5e96c 100644
--- a/CHANGELOG.md
+++ b/CHANGELOG.md
@@ -4,0 +5,2 @@
+- Preserve the first occurrence order of string IDs, including empty strings, and reject invalid inputs with TypeError without changing the input array.
+
diff --git a/HANDOFF.md b/HANDOFF.md
new file mode 100644
index 0000000..3462417
--- /dev/null
+++ b/HANDOFF.md
@@ -0,0 +1,56 @@
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
+branch main | last commit d483cbd8c3bd63fffe1dd31a44a5acc090b6b563
+checks: baseline npm.cmd test PASS 1/1; regression RED 2 passed / 5 failed; repaired and final npm.cmd test PASS 7/7; git diff c49e3d28fb87b375643466e6d676ad0f4c31d077 --check PASS; full owned diff and surrounding files reviewed.
+uncommitted: PLAN.md, HANDOFF.md — owned final status/evidence, included in closure commit; repair/tests/changelog already committed; no pre-existing changes.
+
+## done this session
+- prep and requested review-plan: GO, no open findings or unknowns; scope and regression matrix in PLAN.md.
+- F1.T1: full utility and only test caller inspected; baseline 1/1 passed; no reusable helper or dependency needed.
+- F2.T1: array/string validation, insertion-order Set output, input preservation, named export, meaningful regression tests, and Unreleased entry complete in d483cbd8c3bd63fffe1dd31a44a5acc090b6b563.
+- Regression failures before repair: keeps each first occurrence in input order; empty strings are valid and IDs are case-sensitive; rejects non-arrays with TypeError; rejects every non-string element with TypeError; rejects sparse array holes with TypeError. All seven pass after repair.
+- F3.T1: final suite 7/7 pass; baseline-to-current diff, scope, export, validation, complexity/reuse, security boundaries, changelog, and plan/baton consistency checked.
+
+## in progress (exact stop point)
+none — all cook tasks verified.
+mid-edit files: none
+
+## next
+none — cycle complete; findings-only review-code against c49e3d28fb87b375643466e6d676ad0f4c31d077, then evaluator checkpoint before garnish.
+
+## deviations & decisions
+- SPEC.md unchanged: no durable amendment needed for this repair.
+- Sparse holes count as undefined and reject.
+- Initial baton mixed newline normalized; final baseline diff whitespace check passes.
+- No delegation: supplied cook requires single-agent execution; this tiny utility needs no parallel assignment.
+
+## watchouts
+- Preserve populated PLAN.md and HANDOFF.md until evaluator continuation authorizes garnish.
+- Git warns global ignore is unreadable, but required git checks and commits succeed; global configuration unchanged.
+- HEAD above precedes this baton write and its containing commit.
+
+## final verification
+item|status|evidence|decision
+|---|---|---|---|
+Goal: first occurrence order and deduplication|HOLD|visible.test.mjs first-occurrence case plus original empty/repeated case; final suite 7/7|Set preserves input encounter order; no sorting
+Goal: case-sensitive IDs and empty strings|HOLD|visible.test.mjs case-sensitive/empty-string regression passes|No filtering or case normalization
+Goal: input preservation|HOLD|Frozen input succeeds; output distinct and independently mutable; invalid frozen inputs unchanged|No input writes
+Goal: invalid inputs raise TypeError|HOLD|Non-array, non-string-element, boxed-string, and sparse-hole regressions pass|Array guard and string guard cover required boundaries
+SPEC §C.1|HOLD|package.json unchanged; ids.mjs uses built-in Set only|No dependencies or external services
+SPEC §I.1|HOLD|Named uniqueIds export retained; test import resolves|Public interface preserved
+SPEC §V.1|HOLD|npm.cmd test runs node --test; final 7/7 pass|Requested behavior checked
+F1.T1|HOLD|Local source, only caller, baseline 1/1 and research matrix recorded|Research complete before implementation
+F2.T1|HOLD|Five regression failures observed then repaired; commit d483cbd8c3bd63fffe1dd31a44a5acc090b6b563 includes implementation, tests, changelog|Repair verified
+F3.T1|HOLD|Final npm.cmd test 7/7; baseline diff whitespace check and full owned review pass; pointers and task evidence consistent|Final verification complete
diff --git a/PLAN.md b/PLAN.md
new file mode 100644
index 0000000..310ec8c
--- /dev/null
+++ b/PLAN.md
@@ -0,0 +1,90 @@
+<!-- PLAN FORMAT (baked by /encode-docs — keep; makes this file self-describing)
+One cycle. Update in place during execution; replace wholesale only for an authorized new/superseding cycle. Durable truth → SPEC.md.
+Order: goal | ground rules | existing assets | phase order | phase sections.
+Phase ids F1..Fn; first research/confirmation, last final verification. Implementation between them; failed verification reopens affected work before recheck.
+Each phase: goal | inputs | files | dependencies/gates | §T tasks (≥1) | verify | exit | next.
+Tasks: T<n> unique/monotonic within phase. Status: . todo | ~ in progress | x verified done. Preserve ids and valid F<n>.T<n> pointers within cycle.
+Execution state: prep writes new; cook/cater request new→work-in-progress; handoff requests done only when all tasks x and nonempty final evidence covers goal/contracts with HOLD.
+Reopened work → work-in-progress. garnish resets header-only new. Empty new → /prep; done → /garnish. prep queues requests during active execution unless user supersedes cycle.
+Symbols: → leads to | ∴ therefore | ∀ every | ∃ exists | ! required | ? unknown/optional | ⊥ forbidden/absent | ≠ differs | ∈ member | ∉ not member | ≤ at most | ≥ at least | & and | § section.
+Preserve literals, conditions, negation, uncertainty, quantities, and requirement strength. Tables need delimiter rows.
+Executable without chat history. Full rules: /encode-docs.
+planning status: done
+-->
+# PLAN
+
+goal: Repair uniqueIds(ids): return each string ID's first occurrence in input order, case-sensitive; empty strings valid; preserve input and named export; TypeError for non-arrays and non-string elements.
+
+## ground rules
+- Scope: ids.mjs, relevant node:test cases, CHANGELOG.md, PLAN.md, HANDOFF.md. SPEC.md already supplies applicable constraints; no durable amendment needed for this repair.
+- Use supplied v0.8.0 bundle only. No network, installations, dependencies, configuration changes, tags, remotes, or pushes.
+- Execute prep → review-plan → cook → findings-only review-code against c49e3d28fb87b375643466e6d676ad0f4c31d077.
+- Preserve completed cycle evidence after review; no garnish until evaluator continuation. Local commits authorized.
+
+## existing assets
+- ids.mjs: named uniqueIds export currently uses Set then sort; lexical sorting loses input order and iterable acceptance bypasses input validation.
+- visible.test.mjs: existing ordinary repetition/empty-array case passes; no invalid-input or order coverage.
+- package.json: dependency-free ESM; npm.cmd test runs node --test.
+- Research evidence: inspected AGENTS.md, SPEC.md, ids.mjs, visible.test.mjs, package.json, CHANGELOG.md; baseline suite 1/1 pass.
+- review-plan gate: GO after prep review and requested explicit review; 0 open findings. Coverage, phase ordering, task pointers, verification, ownership, boundaries, feasibility, and SPEC coherence checked against the local files above. No corrections or unresolved research. Sparse array holes yield non-string undefined and must reject.
+
+## phase order
+id|goal|depends|exit
+|---|---|---|---|
+F1|confirm research and acceptance|-|scope and tests established
+F2|repair uniqueIds|F1 & review-plan GO|regressions pass
+F3|final verification|F2|goal/contracts and all tasks verified
+
+## F1 research
+goal: Confirm observed implementation and test gaps before coding.
+inputs: user contract; local evidence above; SPEC.md §C.1, §I.1, §V.1
+files: ids.mjs, visible.test.mjs, package.json, AGENTS.md, SPEC.md
+depends: review-plan GO
+
+### §T tasks
+id|status|description|cites
+|---|---|---|---|
+T1|x|Confirm repair scope and executable regression matrix|§V.1
+
+task: T1
+touch: PLAN.md, HANDOFF.md
+details: Confirm sorted output and permissive input are actual defects. Cover reverse/nonlexical order, separated duplicates, case variants, empty strings, frozen input, non-arrays, non-string elements, and sparse arrays. No external research needed for this local dependency-free repair.
+verify: Inspect complete implementation/tests and npm.cmd test baseline; confirm no callers/helpers to update.
+exit: Evidence fresh; no consequential unknowns; regression expectations explicit.
+next: F2.T1
+
+## F2 implementation
+goal: Preserve first occurrence order while enforcing string-array inputs.
+inputs: F1 evidence and accepted regression matrix
+files: ids.mjs, visible.test.mjs, CHANGELOG.md
+depends: F1.T1 verified
+
+### §T tasks
+id|status|description|cites
+|---|---|---|---|
+T1|x|Add regressions, repair validation/order, document fix|§I.1, §V.1
+
+task: T1
+touch: ids.mjs, visible.test.mjs, CHANGELOG.md, PLAN.md, HANDOFF.md
+details: Add meaningful contract tests and observe failures before repair. Keep named uniqueIds export, validate Array.isArray and every iterated element's string type, preserve insertion order without mutating input, and retain empty strings. Add plain-English Unreleased entry.
+verify: npm.cmd test fails on added regressions before repair and passes afterward; inspect complete diff for scope, errors, and accidental mutation.
+exit: All regression cases pass; unchanged public export; no dependency additions; changelog updated.
+next: F3.T1
+
+## F3 final verification
+goal: Verify the whole delivered contract and cycle.
+inputs: implemented F2; SPEC.md; all cycle tasks; current diff
+files: ids.mjs, visible.test.mjs, CHANGELOG.md, PLAN.md, HANDOFF.md
+depends: F2.T1 verified
+
+### §T tasks
+id|status|description|cites
+|---|---|---|---|
+T1|x|Run final suite and record contract evidence|§C.1, §I.1, §V.1
+
+task: T1
+touch: PLAN.md, HANDOFF.md
+details: Run required suite, review full owned diff and surrounding files for correctness, reuse, errors, public export, dependencies, and input preservation. Record each goal/spec/task item as HOLD, VIOLATE, or UNVERIFIABLE; all HOLD required for done.
+verify: npm.cmd test passes; git diff --check passes; final evidence table nonempty and complete; all task pointers/statuses agree.
+exit: All tasks verified, cycle done, reviewed local changes committed; ready for findings-only review at requested baseline.
+next: none; findings-only review-code then evaluator checkpoint
diff --git a/ids.mjs b/ids.mjs
index 213d973..010f394 100644
--- a/ids.mjs
+++ b/ids.mjs
@@ -2 +2,12 @@ export function uniqueIds(ids) {
-  return [...new Set(ids)].sort();
+  if (!Array.isArray(ids)) {
+    throw new TypeError('ids must be an array');
+  }
+
+  const seen = new Set();
+  for (const id of ids) {
+    if (typeof id !== 'string') {
+      throw new TypeError('each ID must be a string');
+    }
+    seen.add(id);
+  }
+  return [...seen];
diff --git a/visible.test.mjs b/visible.test.mjs
index 21f403c..2090a13 100644
--- a/visible.test.mjs
+++ b/visible.test.mjs
@@ -8,0 +9,35 @@ test('empty and repeated ordinary IDs', () => {
+
+test('keeps each first occurrence in input order', () => {
+  assert.deepEqual(uniqueIds(['z', 'b', 'z', 'a', 'b']), ['z', 'b', 'a']);
+});
+
+test('empty strings are valid and IDs are case-sensitive', () => {
+  assert.deepEqual(uniqueIds(['b', '', 'B', '', 'b']), ['b', '', 'B']);
+});
+
+test('preserves input and returns a separate array', () => {
+  const ids = Object.freeze(['b', 'a', 'b']);
+  const result = uniqueIds(ids);
+  assert.deepEqual(ids, ['b', 'a', 'b']);
+  assert.notStrictEqual(result, ids);
+  result.push('c');
+  assert.deepEqual(ids, ['b', 'a', 'b']);
+});
+
+test('rejects non-arrays with TypeError', () => {
+  for (const value of [undefined, null, 'ab', '', 1, true, {}, new Set(['a']), { 0: 'a', length: 1 }]) {
+    assert.throws(() => uniqueIds(value), TypeError);
+  }
+});
+
+test('rejects every non-string element with TypeError', () => {
+  for (const value of [undefined, null, 1, false, {}, [], new String('a'), Symbol('a'), 1n, () => 'a']) {
+    const ids = Object.freeze(['valid', value]);
+    assert.throws(() => uniqueIds(ids), TypeError);
+    assert.strictEqual(ids[1], value);
+  }
+});
+
+test('rejects sparse array holes with TypeError', () => {
+  assert.throws(() => uniqueIds(new Array(1)), TypeError);
+});
````

</details>
<details>
<summary>Commits before garnish</summary>

````text
2016d0e docs: record verified ID repair
d483cbd fix: preserve and validate ordered string IDs
ff627c3 docs: plan ordered ID validation repair
````

</details>
<details>
<summary>Garnish continuation and response</summary>

````text
Independent checkpoint for your first submission at 2016d0eda98aac9a344bb7a7d1d438ff19598601 / source snapshot 61c1d5f0ea628c55764342a3bb504071386ab1753c940e9644fb3205572300f0: 5/5 frozen acceptance groups passed; independently rerun subject suite 7/7 passed. Main inspected the submitted code and cycle evidence. No independent implementation blocker found.

Now apply garnish from the same supplied frozen bundle only if its closure prerequisites hold on the observed state. Independent failures invalidate affected completion evidence; preserve any blocker and report unmet prerequisites. Do not repair the implementation, start another planning cycle, or erase incomplete evidence. Local closure commits are authorized. Return the closure result, HEAD SHA, and dirty-tree state.

Garnish completed; all closure prerequisites held.
PLAN.md and HANDOFF.md now contain only the supplied baked headers; planning status is new.
Completion evidence remains in commit 2016d0eda98aac9a344bb7a7d1d438ff19598601.
SPEC C1, I1, and V1 remain applicable and unchanged; no requirements were pruned.
Implementation, tests, and changelog were preserved.
Closure verification: npm.cmd test passed 7/7; template comparison and diff checks passed.
HEAD: 24256ca755a72da1948a2e31789ca185e774476c
Dirty tree: clean.
No implementation repair or new planning cycle was started. A further post-cycle audit would use review-code.
````

</details>
<details>
<summary>Garnish diff</summary>

````diff
diff --git a/HANDOFF.md b/HANDOFF.md
index 3462417..b063162 100644
--- a/HANDOFF.md
+++ b/HANDOFF.md
@@ -13,44 +12,0 @@ Full rules: /encode-docs.
-# HANDOFF 2026-09-07
-
-branch main | last commit d483cbd8c3bd63fffe1dd31a44a5acc090b6b563
-checks: baseline npm.cmd test PASS 1/1; regression RED 2 passed / 5 failed; repaired and final npm.cmd test PASS 7/7; git diff c49e3d28fb87b375643466e6d676ad0f4c31d077 --check PASS; full owned diff and surrounding files reviewed.
-uncommitted: PLAN.md, HANDOFF.md — owned final status/evidence, included in closure commit; repair/tests/changelog already committed; no pre-existing changes.
-
-## done this session
-- prep and requested review-plan: GO, no open findings or unknowns; scope and regression matrix in PLAN.md.
-- F1.T1: full utility and only test caller inspected; baseline 1/1 passed; no reusable helper or dependency needed.
-- F2.T1: array/string validation, insertion-order Set output, input preservation, named export, meaningful regression tests, and Unreleased entry complete in d483cbd8c3bd63fffe1dd31a44a5acc090b6b563.
-- Regression failures before repair: keeps each first occurrence in input order; empty strings are valid and IDs are case-sensitive; rejects non-arrays with TypeError; rejects every non-string element with TypeError; rejects sparse array holes with TypeError. All seven pass after repair.
-- F3.T1: final suite 7/7 pass; baseline-to-current diff, scope, export, validation, complexity/reuse, security boundaries, changelog, and plan/baton consistency checked.
-
-## in progress (exact stop point)
-none — all cook tasks verified.
-mid-edit files: none
-
-## next
-none — cycle complete; findings-only review-code against c49e3d28fb87b375643466e6d676ad0f4c31d077, then evaluator checkpoint before garnish.
-
-## deviations & decisions
-- SPEC.md unchanged: no durable amendment needed for this repair.
-- Sparse holes count as undefined and reject.
-- Initial baton mixed newline normalized; final baseline diff whitespace check passes.
-- No delegation: supplied cook requires single-agent execution; this tiny utility needs no parallel assignment.
-
-## watchouts
-- Preserve populated PLAN.md and HANDOFF.md until evaluator continuation authorizes garnish.
-- Git warns global ignore is unreadable, but required git checks and commits succeed; global configuration unchanged.
-- HEAD above precedes this baton write and its containing commit.
-
-## final verification
-item|status|evidence|decision
-|---|---|---|---|
-Goal: first occurrence order and deduplication|HOLD|visible.test.mjs first-occurrence case plus original empty/repeated case; final suite 7/7|Set preserves input encounter order; no sorting
-Goal: case-sensitive IDs and empty strings|HOLD|visible.test.mjs case-sensitive/empty-string regression passes|No filtering or case normalization
-Goal: input preservation|HOLD|Frozen input succeeds; output distinct and independently mutable; invalid frozen inputs unchanged|No input writes
-Goal: invalid inputs raise TypeError|HOLD|Non-array, non-string-element, boxed-string, and sparse-hole regressions pass|Array guard and string guard cover required boundaries
-SPEC §C.1|HOLD|package.json unchanged; ids.mjs uses built-in Set only|No dependencies or external services
-SPEC §I.1|HOLD|Named uniqueIds export retained; test import resolves|Public interface preserved
-SPEC §V.1|HOLD|npm.cmd test runs node --test; final 7/7 pass|Requested behavior checked
-F1.T1|HOLD|Local source, only caller, baseline 1/1 and research matrix recorded|Research complete before implementation
-F2.T1|HOLD|Five regression failures observed then repaired; commit d483cbd8c3bd63fffe1dd31a44a5acc090b6b563 includes implementation, tests, changelog|Repair verified
-F3.T1|HOLD|Final npm.cmd test 7/7; baseline diff whitespace check and full owned review pass; pointers and task evidence consistent|Final verification complete
diff --git a/PLAN.md b/PLAN.md
index 310ec8c..ffc6e89 100644
--- a/PLAN.md
+++ b/PLAN.md
@@ -12 +12 @@ Executable without chat history. Full rules: /encode-docs.
-planning status: done
+planning status: new
@@ -14,77 +13,0 @@ planning status: done
-# PLAN
-
-goal: Repair uniqueIds(ids): return each string ID's first occurrence in input order, case-sensitive; empty strings valid; preserve input and named export; TypeError for non-arrays and non-string elements.
-
-## ground rules
-- Scope: ids.mjs, relevant node:test cases, CHANGELOG.md, PLAN.md, HANDOFF.md. SPEC.md already supplies applicable constraints; no durable amendment needed for this repair.
-- Use supplied v0.8.0 bundle only. No network, installations, dependencies, configuration changes, tags, remotes, or pushes.
-- Execute prep → review-plan → cook → findings-only review-code against c49e3d28fb87b375643466e6d676ad0f4c31d077.
-- Preserve completed cycle evidence after review; no garnish until evaluator continuation. Local commits authorized.
-
-## existing assets
-- ids.mjs: named uniqueIds export currently uses Set then sort; lexical sorting loses input order and iterable acceptance bypasses input validation.
-- visible.test.mjs: existing ordinary repetition/empty-array case passes; no invalid-input or order coverage.
-- package.json: dependency-free ESM; npm.cmd test runs node --test.
-- Research evidence: inspected AGENTS.md, SPEC.md, ids.mjs, visible.test.mjs, package.json, CHANGELOG.md; baseline suite 1/1 pass.
-- review-plan gate: GO after prep review and requested explicit review; 0 open findings. Coverage, phase ordering, task pointers, verification, ownership, boundaries, feasibility, and SPEC coherence checked against the local files above. No corrections or unresolved research. Sparse array holes yield non-string undefined and must reject.
-
-## phase order
-id|goal|depends|exit
-|---|---|---|---|
-F1|confirm research and acceptance|-|scope and tests established
-F2|repair uniqueIds|F1 & review-plan GO|regressions pass
-F3|final verification|F2|goal/contracts and all tasks verified
-
-## F1 research
-goal: Confirm observed implementation and test gaps before coding.
-inputs: user contract; local evidence above; SPEC.md §C.1, §I.1, §V.1
-files: ids.mjs, visible.test.mjs, package.json, AGENTS.md, SPEC.md
-depends: review-plan GO
-
-### §T tasks
-id|status|description|cites
-|---|---|---|---|
-T1|x|Confirm repair scope and executable regression matrix|§V.1
-
-task: T1
-touch: PLAN.md, HANDOFF.md
-details: Confirm sorted output and permissive input are actual defects. Cover reverse/nonlexical order, separated duplicates, case variants, empty strings, frozen input, non-arrays, non-string elements, and sparse arrays. No external research needed for this local dependency-free repair.
-verify: Inspect complete implementation/tests and npm.cmd test baseline; confirm no callers/helpers to update.
-exit: Evidence fresh; no consequential unknowns; regression expectations explicit.
-next: F2.T1
-
-## F2 implementation
-goal: Preserve first occurrence order while enforcing string-array inputs.
-inputs: F1 evidence and accepted regression matrix
-files: ids.mjs, visible.test.mjs, CHANGELOG.md
-depends: F1.T1 verified
-
-### §T tasks
-id|status|description|cites
-|---|---|---|---|
-T1|x|Add regressions, repair validation/order, document fix|§I.1, §V.1
-
-task: T1
-touch: ids.mjs, visible.test.mjs, CHANGELOG.md, PLAN.md, HANDOFF.md
-details: Add meaningful contract tests and observe failures before repair. Keep named uniqueIds export, validate Array.isArray and every iterated element's string type, preserve insertion order without mutating input, and retain empty strings. Add plain-English Unreleased entry.
-verify: npm.cmd test fails on added regressions before repair and passes afterward; inspect complete diff for scope, errors, and accidental mutation.
-exit: All regression cases pass; unchanged public export; no dependency additions; changelog updated.
-next: F3.T1
-
-## F3 final verification
-goal: Verify the whole delivered contract and cycle.
-inputs: implemented F2; SPEC.md; all cycle tasks; current diff
-files: ids.mjs, visible.test.mjs, CHANGELOG.md, PLAN.md, HANDOFF.md
-depends: F2.T1 verified
-
-### §T tasks
-id|status|description|cites
-|---|---|---|---|
-T1|x|Run final suite and record contract evidence|§C.1, §I.1, §V.1
-
-task: T1
-touch: PLAN.md, HANDOFF.md
-details: Run required suite, review full owned diff and surrounding files for correctness, reuse, errors, public export, dependencies, and input preservation. Record each goal/spec/task item as HOLD, VIOLATE, or UNVERIFIABLE; all HOLD required for done.
-verify: npm.cmd test passes; git diff --check passes; final evidence table nonempty and complete; all task pointers/statuses agree.
-exit: All tasks verified, cycle done, reviewed local changes committed; ready for findings-only review at requested baseline.
-next: none; findings-only review-code then evaluator checkpoint
````

</details>
