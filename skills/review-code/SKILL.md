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
5. Run documented checks applicable to the scope and focused checks for suspected defects. For behavioral checks, inspect the actual cases/assertions and confirm they ran and exercise changed behavior; exit zero alone is not proof. Reuse current results; broaden testing only for changed code, failures, or unresolved concerns. Distinguish failures introduced by the change, pre-existing failures, and environment limits.
6. Cite each finding by file/line, test, commit, or primary source. Explain the trigger, impact, and fix direction. Tests passing do not excuse missing coverage or flawed assertions.
7. When continuing a prior review, verify supplied findings against current files, revisions, and relevant checks before accepting them. Retain supported findings; report resolved findings separately and turn consequential unverifiable claims into blocking UNKNOWNs with concrete research needs. Do not present an old reproduction as a fresh run.
8. Classify findings and report the gate. Resolve routine review choices from context; ask only when baseline, intent, scope, or authority materially changes the review.

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

Finish the review and report its gate before cleanup or planning. Preserve a self-contained follow-up record outside the documents that cleanup resets: accepted findings with locations, triggers, impact and fix direction; evidence and verification limits; baseline ref/SHA, HEAD and dirty scope; gate; invalidated task/verification mapping; unfinished obligations and user decisions. Include the record in the review output and pass it as explicit input to composed skills.

Plain review authorizes neither cleanup nor planning. A request to take review findings directly through `garnish` and `prep` into a new remediation cycle already authorizes superseding an invalidated retained cycle; do not ask for that permission again or require the word “supersede.” Honor narrower conditions such as “only if completion checks pass.” Review NO-GO blocks acceptance of the implementation, not authorized planning to fix it.

When the chain is authorized, load `garnish` then `prep` in the main agent and continue in the same run. With no accepted actionable work, do not supersede a retained cycle or create an empty remediation plan; authorized ordinary cleanup may still finish. Choose the route from current evidence:

- **Valid completed cycle:** use ordinary `garnish` closure. Carry accepted actionable work into `prep` after successful cleanup.
- **Invalidated or unfinished cycle with remediation supersession authorized:** pass the record and existing authorization to `garnish` in supersession mode. It preserves recoverable old documents and a persistent review record before resetting them; failed findings remain failed, not HOLD. On success, immediately invoke `prep` with that record and its location. Carry every unfinished obligation into the new plan or record its explicit disposition; create fresh remediation tasks and verification, not inherited completion ticks.
- **No supersession authority or completion-only condition:** preserve the retained cycle when closure fails. Name the failed prerequisite. During active execution, authorized follow-up `prep` queues findings; other unfinished plans retain their work. Do not ingest the backlog yourself or replace a failed done cycle through ordinary prep.
- **Absent or header-only cycle:** pass accepted actionable work directly to authorized `prep`; do not invent closure evidence. With no accepted actionable work, do not create an empty remediation cycle; authorized ordinary cleanup may still finish.

When only follow-up planning is authorized, use `prep` within its preservation rules. Explicit replacement of a retained cycle uses the evidence-preserving supersession route; ordinary planning alone does not authorize clearing it. If preservation, worker ownership, or unrelated dirty work prevents transition, keep the old documents and review record, report the concrete blocker, and do not repeat an already-settled authorization question. A successful reset is not the stopping point when prep is authorized: the deliverable is the new plan/baton pair and its review gate. Reuse current research; unresolved consequential findings become research gates before dependent fixes.

## REPORT OUTPUT

Keep this section identical in `review-plan` and `review-code`. Lead with the verdict and scope. For each finding, give location/evidence, problem, concrete impact, and fix direction. Preserve exact paths, identifiers, errors, and uncertainty.

Use concise plain language. Omit empty categories and repeated evidence. Prefer a full sentence when compression would obscure causality, security impact, or an order-sensitive fix. State verification limits; never imply that green checks prove unexamined behavior.

## Boundaries

Explicit user instructions override skill guidance within higher-priority instructions and permissions. Explain a rule-caused pause with its file and wording. The review itself does not edit implementation, tests, or cycle documents, commit changes, post comments, or approve a PR. Authorized composed `garnish` and `prep` own their document changes and commits under repository policy; load `encode-docs` through them for encoded writes. Other actions require authorization unless already supplied by the user.
