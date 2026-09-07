---
name: review-code
description: |
  Review implementation changes against an explicit branch/ref or the latest reachable release tag. Trace correctness, security, complexity, reuse, and requirement drift; report evidenced findings and GO or NO-GO. Use retained cycle context and compose guarded garnish then prep when authorized. Use for "/review-code".
---

# review-code — review implementation changes

Inspect the change and its surrounding system. Produce actionable findings without editing implementation. A review request alone does not authorize creating a new planning cycle.

## Baseline and scope

Use the user's explicit baseline first, including a branch such as `main`; resolve it to a commit and record both ref and SHA. Otherwise use the latest reachable release tag matching `v<major>.<minor>.<patch>`. If none exists, inspect repository release documentation for a recorded baseline. Ask only if the intended comparison still cannot be established; never substitute an arbitrary commit.

Record baseline ref/SHA, HEAD, branch, and dirty-tree state. Review baseline-to-HEAD changes by default. Include uncommitted work when requested or clearly within the user's scope, and distinguish it from committed changes.

Read repository guidance, relevant `SPEC.md` sections, and `PLAN.md`/`HANDOFF.md` if present. Map delivered changes to populated plan tasks and baton verification, noting missing or stale evidence; task ticks are not proof. These files provide context; an incomplete plan does not prohibit reviewing existing work. Absent or header-only cycle documents require no fabricated task mapping or closure. Never ingest `BACKLOG.md`.

## Review procedure

1. Inventory changed surfaces and separate behavior changes from mechanical edits. Read affected files and enough callers, dependencies, and tests to understand consequences.
2. Trace entrypoints, persistence, state transitions, error paths, and boundary cases. Check that interfaces, ownership, naming, and failure handling remain coherent.
3. Search for existing helpers before proposing reuse or new abstractions. Recommend simplification only when it removes demonstrated complexity without obscuring requirements.
4. Check relevant security boundaries: credentials, untrusted input, injection, authorization, sensitive data, and dependency changes. Distinguish demonstrated defects from optional hardening.
5. Run documented checks applicable to the scope and focused checks for suspected defects. Reuse current results; broaden testing only for changed code, failures, or unresolved concerns. Distinguish failures introduced by the change, pre-existing failures, and environment limits.
6. Cite each finding by file/line, test, commit, or primary source. Explain the trigger, impact, and fix direction. Tests passing do not excuse missing coverage or flawed assertions.
7. Classify findings and report the gate. Resolve routine review choices from context; ask only when baseline, intent, scope, or authority materially changes the review.

## FINDING TAXONOMY & GATE

Keep this section identical in `review-plan` and `review-code`. Assign each finding one category:

- **BLOCK** — an evidenced correctness, safety, or release defect, including a demonstrated security vulnerability. Fix before proceeding.
- **DIVERGENCE** — work conflicts with a stated `SPEC.md` requirement. Resolve against user intent: fix the work or amend a superseded requirement through `encode-docs`. Existing behavior alone does not justify weakening a requirement.
- **UNKNOWN** (`?`) — a question requiring repository evidence, current primary sources, or a user decision. State whether it blocks and why. An unresolved question affecting correctness, safety, scope, or required verification remains blocking.
- **HARDEN** — an optional, evidenced improvement to resilience, tests, complexity, or reuse. Speculative security advice is not a demonstrated vulnerability.
- **NOTE** — context with no required action. Label unsupported observations `[unverified]`; investigate consequential uncertainty as UNKNOWN.

**NO-GO** if any open BLOCK, DIVERGENCE, or blocking UNKNOWN remains. **GO** otherwise. HARDEN and NOTE do not block. Report resolved findings separately from open counts. GO applies only to the reviewed scope; it does not authorize deployment, merging, or additional work.

## Follow-up

For DIVERGENCE, use explicit user intent and existing decisions to determine whether the work or spec should change. Ask when that choice remains unresolved; never amend a requirement merely to excuse a defect.

Finish the review and report its gate before cleanup or planning. Preserve a self-contained follow-up record outside the documents that cleanup resets: accepted findings with locations, triggers, impact and fix direction; evidence and verification limits; baseline ref/SHA, HEAD and dirty scope; gate; task/verification mapping; and user decisions. Include this record in the review output and carry it as explicit input to composed skills so cleanup cannot erase the only copy.

Plain review authorizes neither cleanup nor planning. When the user already authorized review followed by `garnish` and `prep`, load those skills in that order in the main agent without asking again. Apply these branches:

- **Populated completed cycle:** load `garnish` with the review record. It owns all closure checks, including current evidence, committed completion, and dirty-work restrictions. Findings that invalidate old completion evidence block cleanup; never relabel stale or failed evidence HOLD to enable a new cycle. An independent accepted improvement may proceed to a new plan only while old completion remains valid.
- **Failed closure:** preserve the old cycle documents and report the exact failed prerequisite and review evidence. Do not call `prep` in ingest mode to replace a blocked cycle, even if its status says done. Resolve completion defects through authorized cycle work before retrying cleanup.
- **Active execution:** reviewing is allowed, cleanup is not. If follow-up planning is authorized, pass accepted actionable findings to `prep` for queueing; it owns BACKLOG.md access and preserves the active plan/baton. Do not ingest the backlog yourself. Other unfinished retained plans also stay intact; authorized `prep` must preserve their unfinished work rather than treat them as completed.
- **Successful cleanup:** if actionable work is accepted and planning authorized, load `prep` with the preserved record to create the new plan/baton pair. The remediation plan starts with research/confirmation before fixes. With no accepted actionable work, authorized cleanup may still finish, but do not create an empty cycle.
- **Absent or header-only cycle:** perform normal review and pass accepted actionable work to `prep` when planning is authorized; no completed-cycle evidence or cleanup needs inventing.

When only follow-up planning is authorized, load `prep` for accepted actionable work within its mode and preservation rules. A populated done cycle must first pass authorized `garnish`; planning authority alone does not authorize clearing retained evidence. Report that prerequisite if cleanup was not authorized. Keep the review record available whenever a transition cannot proceed.

## REPORT OUTPUT

Keep this section identical in `review-plan` and `review-code`. Lead with the verdict and scope. For each finding, give location/evidence, problem, concrete impact, and fix direction. Preserve exact paths, identifiers, errors, and uncertainty.

Use concise plain language. Omit empty categories and repeated evidence. Prefer a full sentence when compression would obscure causality, security impact, or an order-sensitive fix. State verification limits; never imply that green checks prove unexamined behavior.

## Boundaries

Explicit user instructions override skill guidance within higher-priority instructions and permissions. Explain a rule-caused pause with its file and wording. The review itself does not edit implementation, tests, or cycle documents, commit changes, post comments, or approve a PR. Authorized composed `garnish` and `prep` own their document changes and commits under repository policy; load `encode-docs` through them for encoded writes. Other actions require authorization unless already supplied by the user.
