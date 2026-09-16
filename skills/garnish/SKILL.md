---
name: garnish
description: |
  Close a completed cook or cater cycle, or preserve and supersede a retained cycle for an authorized remediation plan. Prune superseded SPEC.md requirements only on evidence, then reset PLAN.md and HANDOFF.md to baked-header templates. Use for "/garnish"; preserve other files and pending backlog.
---

# garnish — close or supersede a cycle

Reset short-lived cycle documents after preserving useful evidence and durable decisions. Load `encode-docs` for all mutations of `SPEC.md`, `PLAN.md`, and `HANDOFF.md`.

## Select mode

Use ordinary closure unless the user authorized replacing the retained cycle with a remediation cycle. A direct request for review findings → garnish → prep supplies that authority even when findings invalidate completion; do not request it again. An explicit condition requiring successful completion still applies. Supersession preserves failure evidence and unfinished work; it does not certify completion.

## Supersession gate

Read repository guidance, cycle documents, git state, and the supplied review record. Never ingest or modify `BACKLOG.md`. Before any reset:

1. Confirm accepted actionable findings and existing authority for replacement. Preserve the review gate, baseline/HEAD/dirty scope, finding evidence and limits, invalidated task mappings, all unfinished obligations, and explicit dispositions. Missing evidence remains unknown; do not invent successful checks.
2. Save this record in a persistent repository document outside `PLAN.md`/`HANDOFF.md`, using an existing review record when suitable or a clearly named review archive. Preserve unrelated contents. Include the authorization and exact next action: `prep` with this record. Verify it is readable before resetting anything.
3. Preserve the exact old plan/baton: cite a verified git commit containing their current contents, or copy their current contents into that archive when uncommitted changes would otherwise be lost. Do not commit unfinished implementation merely to archive documents. Historical completion claims stay historical; record which evidence is invalidated.
4. Require no outstanding delegated assignments and no unrelated dirty work. Identify conflicting owners/paths; preserve them and stop reset until resolved. Owned review/archive changes are expected. Never reset source files or discard work to pass this gate.

These checks replace the ordinary completion gate only for authorized supersession. Failed implementation checks and unfinished tasks are remediation inputs, not reasons to demand successful closure first. Preserve `SPEC.md` in this mode; violations alone do not retire requirements. After preservation succeeds, use `encode-docs` to reset both cycle files to baked headers with `planning status: new`, verify the archive and templates, and follow repository commit policy. Report “superseded for remediation,” never “completed.” When prep is authorized, immediately load it with the preserved record and archive location; interruption after reset must be recoverable from that record.

## Ordinary closure gate

Read repository guidance, the three cycle documents, and git state. Never ingest or modify `BACKLOG.md`.

Require:

1. A populated `PLAN.md` with `planning status: done` and every task `x`.
2. A nonempty final verification table in `HANDOFF.md` covering the goal and relevant spec/task items, all `HOLD` with evidence.
3. No unresolved next task, stale verification, or outstanding delegated assignment.
4. Required repository checks passing on the current state. Reuse results only when their relevant inputs and environment are unchanged; otherwise rerun.
5. Cycle completion evidence preserved in git before blanking. Follow existing commit authority; never erase the only record of uncommitted results.
6. No unrelated dirty work under this cleanup contract. Report conflicting paths; never reset or delete them to satisfy the gate.

If files are already header-only templates, report that cleanup is complete without manufacturing another cycle. Otherwise stop cleanup when a condition fails and identify the exact prerequisite; do not mark unfinished work complete.

## Review durable truth

Inspect requirements affected by the completed cycle. Default to no spec change. Hand `encode-docs` only durable corrections or removals with evidence; tasks and bug history stay out of the spec.

Prune a row only when evidence shows its requirement was retired or superseded. Missing implementation may be a violation of a still-valid requirement, not permission to delete it. Keep uncertain rows and report the unresolved question.

Delete retired rows without renumbering remaining rows, reusing ids, or reducing `next:` counters. Review the resulting spec diff before resetting cycle state. Recheck affected verification if spec corrections change what must hold.

## Reset and verify

1. Preserve accepted final evidence and spec decisions according to repository commit policy.
2. Ask `encode-docs` to replace `PLAN.md` and `HANDOFF.md` with their baked headers only, using `planning status: new`.
3. Preserve `BACKLOG.md` even if it's blank.
4. Verify the two templates, retained `SPEC.md`, and full owned diff. Preserve source, tests, changelog, backlog, and history.
5. Commit owned cleanup only when authorized by the user or repository policy; use `encode-commit` for the message.

Report whether cleanup completed, checks and evidence, each pruned/kept candidate with its reason, and the next step (`/review-code` for a post-cycle audit). Do not start another planning cycle without existing authorization; after authorized supersession, continue directly to prep as specified above.
